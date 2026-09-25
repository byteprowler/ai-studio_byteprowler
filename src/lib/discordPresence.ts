export type DiscordPresenceStatus = "online" | "idle" | "dnd" | "offline" | "unknown";

export interface DiscordPresence {
  status: DiscordPresenceStatus;
  activityName?: string;
  activityType?: string;
  details?: string;
  state?: string;
  avatarUrl?: string;
  username?: string;
  spotify?: {
    song?: string;
    artist?: string;
    albumArtUrl?: string;
  };
}

export interface DiscordPresenceResponse {
  configured: boolean;
  presence?: DiscordPresence;
  message?: "DISCORD_ID_MISSING" | "DISCORD_SIGNAL_OFFLINE" | "METHOD_NOT_ALLOWED";
}

interface LanyardActivity {
  name?: string;
  type?: number;
  details?: string;
  state?: string;
}

interface LanyardPayload {
  success?: boolean;
  data?: {
    discord_status?: DiscordPresenceStatus;
    activities?: LanyardActivity[];
    discord_user?: {
      id?: string;
      username?: string;
      avatar?: string | null;
      discriminator?: string;
    };
    spotify?: {
      song?: string;
      artist?: string;
      album_art_url?: string;
    } | null;
  };
}

const activityTypeLabels: Record<number, string> = {
  0: "PLAYING",
  1: "STREAMING",
  2: "LISTENING",
  3: "WATCHING",
  4: "CUSTOM_STATUS",
  5: "COMPETING",
};

function buildAvatarUrl(userId?: string, avatar?: string | null) {
  if (!userId || !avatar) return undefined;
  const extension = avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${extension}?size=128`;
}

export function normalizeDiscordPresence(payload: LanyardPayload): DiscordPresence | null {
  if (!payload.success || !payload.data) return null;

  const activity = payload.data.activities?.find((item) => item.name && item.name !== "Spotify");
  const user = payload.data.discord_user;

  return {
    status: payload.data.discord_status || "unknown",
    activityName: activity?.name,
    activityType: typeof activity?.type === "number" ? activityTypeLabels[activity.type] || "ACTIVITY" : undefined,
    details: activity?.details,
    state: activity?.state,
    avatarUrl: buildAvatarUrl(user?.id, user?.avatar),
    username: user?.username,
    spotify: payload.data.spotify
      ? {
          song: payload.data.spotify.song,
          artist: payload.data.spotify.artist,
          albumArtUrl: payload.data.spotify.album_art_url,
        }
      : undefined,
  };
}

export async function fetchDiscordPresenceFromLanyard(userId: string): Promise<DiscordPresence | null> {
  const response = await fetch(`https://api.lanyard.rest/v1/users/${encodeURIComponent(userId)}`);
  if (!response.ok) {
    throw new Error(`Lanyard responded with HTTP ${response.status}`);
  }

  return normalizeDiscordPresence((await response.json()) as LanyardPayload);
}

export async function fetchDiscordPresence(): Promise<DiscordPresenceResponse> {
  const response = await fetch("/api/discord/presence");
  if (!response.ok) {
    throw new Error("DISCORD_API_ROUTE_OFFLINE");
  }
  return (await response.json()) as DiscordPresenceResponse;
}
