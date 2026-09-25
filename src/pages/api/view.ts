import { getSupabaseAdmin } from "../../lib/supabaseAdmin";

// Local in-memory counter to act as a graceful fallback during development sandbox
let sandboxMemoryCounter = 0; // Default seed count starts at 000

/**
 * API route handler to fetch and increment Byteprowler portfolio view count.
 * Employs reliable database queries with dynamic recovery strategies (upsert/memory fallback)
 * to guarantee the applet never crashes or shows broken elements.
 */
export default async function handler(req: any, res: any) {
  const method = req.method;
  const viewKey = process.env.BYTEPROWLER_VIEW_KEY || "byteprowler:portfolio:views";
  const supabase = getSupabaseAdmin();

  // If Supabase credentials are missing, operate in secure sandbox memory mode
  if (!supabase) {
    if (method === "POST") {
      sandboxMemoryCounter += 1;
    }
    return res.status(200).json({
      count: sandboxMemoryCounter,
      _sandbox: true,
      message: "Supabase credentials not configured. Operating in high-contrast sandbox memory mode."
    });
  }

  try {
    if (method === "GET") {
      const { data, error } = await supabase
        .from("portfolio_views")
        .select("count")
        .eq("id", viewKey)
        .single();

      if (error) {
        // PGRST116 indicates the row was not found; automatically seed it
        if (error.code === "PGRST116") {
          const { data: insertData, error: insertError } = await supabase
            .from("portfolio_views")
            .insert([{ id: viewKey, count: 0 }])
            .select("count")
            .single();

          if (insertError) {
            console.error("Failed to seed initial view counter row:", insertError);
            return res.status(200).json({ count: 0 });
          }
          return res.status(200).json({ count: Number(insertData?.count ?? 0) });
        }
        throw error;
      }

      return res.status(200).json({ count: Number(data?.count ?? 0) });

    } else if (method === "POST") {
      // 1. Attempt to increment using database RPC function
      const { data, error: rpcError } = await supabase
        .rpc("increment_portfolio_view", { view_id: viewKey });

      if (rpcError) {
        console.warn("RPC counter function unavailable, cascading to direct update fallback:", rpcError.message);

        // 2. Direct manual Upsert Fallback
        const { data: currentRecord } = await supabase
          .from("portfolio_views")
          .select("count")
          .eq("id", viewKey)
          .single();

        const currentCount = Number(currentRecord?.count ?? 0);
        const newCount = currentCount + 1;

        const { error: upsertError } = await supabase
          .from("portfolio_views")
          .upsert({ id: viewKey, count: newCount, updated_at: new Date().toISOString() });

        if (upsertError) {
          throw upsertError;
        }

        return res.status(200).json({ count: newCount });
      }

      // If the RPC call was successful and returned a count, output it
      if (typeof data === "number") {
        return res.status(200).json({ count: data });
      }

      // Otherwise fetch the updated count explicitly
      const { data: updatedRecord } = await supabase
        .from("portfolio_views")
        .select("count")
        .eq("id", viewKey)
        .single();

      return res.status(200).json({ count: Number(updatedRecord?.count ?? 0) });

    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error: any) {
    console.error("Supabase counter route error:", error);
    // Return standard fallback instead of throwing error response to ensure user is safe
    return res.status(200).json({
      count: sandboxMemoryCounter,
      _fallback: true,
      error: error?.message || "Internal database error"
    });
  }
}
