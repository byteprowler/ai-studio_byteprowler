import type { NextApiRequest, NextApiResponse } from "next";
import {
  fetchDiscordPresenceFromLanyard,
  type DiscordPresenceResponse,
} from "../../../lib/discordPresence";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DiscordPresenceResponse>,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ configured: false, message: "METHOD_NOT_ALLOWED" });
  }

  const userId = process.env.NEXT_PUBLIC_DISCORD_USER_ID;

  if (!userId) {
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({ configured: false, message: "DISCORD_ID_MISSING" });
  }

  try {
    const presence = await fetchDiscordPresenceFromLanyard(userId);
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=180");
    return res.status(200).json({
      configured: true,
      presence: presence ?? { status: "unknown" },
    });
  } catch (error) {
    console.error("DISCORD_SIGNAL_OFFLINE", error instanceof Error ? error.message : error);
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=120");
    return res.status(200).json({
      configured: true,
      message: "DISCORD_SIGNAL_OFFLINE",
    });
  }
}
