import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Cpu,
  ExternalLink,
  Eye,
  Heart,
  MessageCircle,
  Radio,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Tv,
} from "lucide-react";
import {
  fetchAniListActivity,
  fetchFavoriteAnime,
  fallbackActivityList,
  fallbackAnimeList,
  type AniListActivityItem,
  type AniListAnime,
} from "../../lib/anilist";
import AnimeCard from "../ui/AnimeCard";
import { siteSettings } from "../../lib/content/siteSettings";

type AnimeFeedView = "activity" | "favorites";

function formatActivityDate(createdAt: number) {
  if (!createdAt) return "RECENT";
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(createdAt * 1000));
  } catch {
    return "RECENT";
  }
}

function getActivityBadge(activity: AniListActivityItem) {
  const isManga = activity.mediaType === "MANGA";
  const kind = activity.kind || "watching";

  switch (kind) {
    case "completed":
      return {
        label: "COMPLETED",
        icon: CheckCircle,
        className: "border-neon-green/30 bg-neon-green/10 text-neon-green",
      };
    case "reading":
      return {
        label: activity.progress ? `READING: ${activity.progress}` : "READING",
        icon: BookOpen,
        className: "border-neon-blue/30 bg-neon-blue/10 text-neon-blue",
      };
    case "watching":
      return {
        label: activity.progress ? `WATCHING: ${activity.progress}` : "WATCHING",
        icon: Eye,
        className: "border-neon-purple/30 bg-neon-purple/10 text-neon-purple",
      };
    case "planning":
      return {
        label: isManga ? "PLAN TO READ" : "PLAN TO WATCH",
        icon: Clock,
        className: "border-gray-500/30 bg-gray-500/10 text-gray-300",
      };
    default:
      return {
        label: activity.action.toUpperCase(),
        icon: Tv,
        className: "border-neon-lime/30 bg-neon-lime/10 text-neon-lime",
      };
  }
}

export default function AnimeFeed() {
  const [activeView, setActiveView] = useState<AnimeFeedView>("activity");
  const username = siteSettings.anilistUsername || process.env.NEXT_PUBLIC_ANILIST_USERNAME || "byteprowler";
  const hasUsername = Boolean(username.trim());

  // Task 5 & 6: 30-60 min staleTime and refetchInterval, limit to 4 items on homepage
  const {
    data: activityData,
    isLoading: isActivityLoading,
    isFetching: isActivityFetching,
    error: activityError,
    refetch: refetchActivity,
    dataUpdatedAt: activityUpdatedAt,
  } = useQuery({
    queryKey: ["anilistActivityFeed", username],
    queryFn: () => fetchAniListActivity(username, 4),
    enabled: hasUsername,
    staleTime: 1000 * 60 * 30, // 30 minutes cache
    refetchInterval: 1000 * 60 * 30, // background refresh every 30 minutes
    refetchOnWindowFocus: false,
  });

  const {
    data: favoritesData,
    isLoading: isFavoritesLoading,
    isFetching: isFavoritesFetching,
    error: favoritesError,
    refetch: refetchFavorites,
  } = useQuery({
    queryKey: ["anilistFavorites", username],
    queryFn: () => fetchFavoriteAnime(username),
    enabled: hasUsername && activeView === "favorites",
    staleTime: 1000 * 60 * 60, // 60 minutes
    refetchInterval: 1000 * 60 * 60,
  });

  const handleSyncActivity = () => {
    if (activeView === "activity") {
      void refetchActivity();
    } else {
      void refetchFavorites();
    }
  };

  const isSyncing = isActivityFetching || isFavoritesFetching;
  const activities: AniListActivityItem[] =
    activityError || !hasUsername ? fallbackActivityList.slice(0, 4) : (activityData?.length ? activityData.slice(0, 4) : fallbackActivityList.slice(0, 4));
  const favorites: AniListAnime[] =
    favoritesError || !hasUsername ? fallbackAnimeList.slice(0, 4) : (favoritesData?.length ? favoritesData.slice(0, 4) : fallbackAnimeList.slice(0, 4));

  return (
    <section id="anime" className="py-12 md:py-24 border-t border-neon-lime/5 scroll-mt-20">
      {/* Section Indicator HUD Header */}
      <div className="flex items-center gap-2 mb-8 font-mono text-xs text-gray-400">
        <span className="text-neon-lime font-mono">[05]</span>
        <span className="tracking-widest font-semibold uppercase">ANILIST_FEED // RECENT_MEDIA_SIGNAL</span>
        <div className="flex-grow h-px bg-neon-lime/10" />
        <span className="text-[10px] text-neon-lime/40 uppercase">30M_CACHE_SYNC</span>
      </div>

      <div className="flex flex-col gap-6">
        {/* Section Header with View Toggles and Manual Sync */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase font-sans tracking-tight">
              Media Signal Stream
            </h3>
            <p className="text-sm font-mono text-gray-400 uppercase">
              {"// Realtime AniList sync: recent manga chapters, anime episodes, and completions."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Selector Tabs */}
            <div role="tablist" aria-label="Anime feed view mode" className="flex rounded-xs border border-white/10 bg-black/60 p-1 font-mono text-xs">
              <button
                type="button"
                role="tab"
                aria-selected={activeView === "activity"}
                onClick={() => setActiveView("activity")}
                className={`px-3 py-1.5 rounded-2xs font-bold uppercase tracking-wider transition ${
                  activeView === "activity"
                    ? "bg-neon-purple text-black font-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                RECENT_ACTIVITY
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeView === "favorites"}
                onClick={() => setActiveView("favorites")}
                className={`px-3 py-1.5 rounded-2xs font-bold uppercase tracking-wider transition ${
                  activeView === "favorites"
                    ? "bg-neon-lime text-black font-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                TOP_FAVORITES
              </button>
            </div>

            {/* Manual Sync Button (Task 6) */}
            <button
              type="button"
              onClick={handleSyncActivity}
              disabled={isSyncing}
              aria-label="Force refresh AniList activity cache"
              className="inline-flex min-h-10 items-center gap-2 rounded-xs border border-neon-purple/40 bg-black/80 px-3 py-2 font-mono text-[11px] font-black uppercase tracking-wider text-neon-purple transition hover:border-neon-purple hover:bg-neon-purple/10 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} aria-hidden="true" />
              <span>{isSyncing ? "SYNCING..." : "[SYNC ACTIVITY]"}</span>
            </button>
          </div>
        </div>

        {/* Content Display: Activity Mode (Task 8: 3-5 items on homepage) */}
        {activeView === "activity" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activities.map((activity) => {
              const badge = getActivityBadge(activity);
              const BadgeIcon = badge.icon;
              const isManga = activity.mediaType === "MANGA";

              return (
                <a
                  key={activity.id}
                  href={activity.url || "https://anilist.co/"}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between rounded-xs border border-white/10 bg-[#08090d]/90 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-neon-purple/50 hover:bg-[#0c0d14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian select-none"
                  aria-label={`Open AniList record for ${activity.title}`}
                >
                  <div>
                    {/* Media Image & Status Top Bar */}
                    <div className="relative h-36 w-full overflow-hidden rounded-xs border border-white/10 bg-black/60 mb-3">
                      {activity.coverImage ? (
                        <Image
                          src={activity.coverImage}
                          alt={activity.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-mono text-xs font-bold text-gray-600">
                          MEDIA_COVER
                        </div>
                      )}

                      {/* Type Badge (ANIME vs MANGA) */}
                      <span className={`absolute top-2 left-2 rounded-2xs border px-1.5 py-0.5 font-mono text-[9.5px] font-black uppercase backdrop-blur-md ${
                        isManga ? "border-neon-blue/40 bg-black/80 text-neon-blue" : "border-neon-purple/40 bg-black/80 text-neon-purple"
                      }`}>
                        {isManga ? "MANGA" : "ANIME"}
                      </span>

                      {/* Date */}
                      <span className="absolute top-2 right-2 rounded-2xs bg-black/85 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gray-300 backdrop-blur-sm">
                        {formatActivityDate(activity.createdAt)}
                      </span>
                    </div>

                    {/* Progress / Action Badge */}
                    <div className="mb-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-2xs border px-2 py-0.5 font-mono text-[10px] font-black uppercase ${badge.className}`}>
                        <BadgeIcon className="h-3 w-3" aria-hidden="true" />
                        <span className="truncate">{badge.label}</span>
                      </span>
                    </div>

                    {/* Media Title */}
                    <h4 className="font-sans text-sm font-black uppercase text-white leading-snug line-clamp-2 transition-colors group-hover:text-neon-purple">
                      {activity.title}
                    </h4>
                  </div>

                  {/* Card Footer: Engagement & External Link */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-gray-400">
                    <span className="flex items-center gap-1 text-neon-lime">
                      <Heart className="h-3 w-3" aria-hidden="true" />
                      {activity.likes}
                    </span>
                    <span className="inline-flex items-center gap-1 text-gray-400 group-hover:text-neon-purple transition-colors">
                      ANILIST_LOG
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Content Display: Favorites Mode */}
        {activeView === "favorites" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favorites.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}

        {/* Caching Status Bar */}
        <div className="border border-white/5 bg-black/35 p-3 rounded-xs flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <Radio className="h-3.5 w-3.5 text-neon-purple animate-pulse" aria-hidden="true" />
            <span>
              STATUS: {hasUsername ? `SYNCED TO ${username.toUpperCase()}` : "LOCAL_MEDIA_CACHE"} · CACHE TTL: 30 MINUTES
            </span>
          </div>

          <a
            href={`https://anilist.co/user/${username}`}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-neon-purple hover:underline font-bold text-xs"
          >
            <span>FULL ANILIST PROFILE & LOGS</span>
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
