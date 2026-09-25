import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

/**
 * Lazily retrieves the Supabase Admin client using service role privileges.
 * Employs checks to ensure the application does not crash on startup
 * if environment keys are missing or not yet configured.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
    if (supabaseInstance) {
        return supabaseInstance;
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        // Return null instead of throwing to prevent applet crash during startup
        return null;
    }

    try {
        supabaseInstance = createClient(supabaseUrl, supabaseServiceKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        });
        return supabaseInstance;
    } catch (error) {
        console.error("Failed to initialize system-level Supabase client:", error);
        return null;
    }
}