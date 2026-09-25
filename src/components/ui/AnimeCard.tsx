import React from "react";
import Image from "next/image";
import { Star, PlayCircle, ExternalLink } from "lucide-react";
import { AniListAnime } from "../../lib/anilist";

interface AnimeCardProps {
    anime: AniListAnime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
    const displayTitle = anime.title.english || anime.title.romaji;
    const statusLabels: Record<string, string> = {
        FINISHED: "COMPLETED",
        RELEASING: "AIRING",
        NOT_YET_RELEASED: "TBD",
        CANCELLED: "CANCELLED",
        HIATUS: "PAUSED",
    };

    return (
        <div className="border border-white/5 bg-black/50 rounded-sm overflow-hidden flex flex-col h-full hover:border-neon-purple/40 hover:bg-black/70 transition-all duration-300 group shadow-md hover:shadow-glow-purple/5 relative select-none">

            {/* Banner / Cover Top Segment */}
            <div className="relative h-44 overflow-hidden bg-black/80">
                {/* Subtle scanline overlay to match the retro screen vibe */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent z-10"></div>
                <Image
                    src={anime.coverImage.large || "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400"}
                    alt={displayTitle}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
                />

                {/* Dynamic score label trigger */}
                {anime.averageScore && (
                    <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md border border-neon-lime/30 text-neon-lime text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm flex items-center gap-1.5 z-20">
                        <Star className="w-3 h-3 fill-neon-lime text-neon-lime animate-pulse" />
                        <span>{anime.averageScore}%</span>
                    </div>
                )}

                {/* Status label trigger */}
                <div className="absolute bottom-2.5 left-2.5 z-20 flex gap-1.5 font-mono text-[10px]">
                    <span className="bg-black/95 backdrop-blur-md border border-white/10 text-gray-400 px-2 py-0.5 rounded-xs font-bold uppercase">
                        {statusLabels[anime.status] || anime.status}
                    </span>
                    {anime.episodes && (
                        <span className="bg-neon-purple/20 backdrop-blur-md border border-neon-purple/40 text-neon-purple px-1.5 py-0.5 rounded-xs font-bold flex items-center gap-1">
                            <PlayCircle className="w-3 h-3" />
                            <span>{anime.episodes} EPS</span>
                        </span>
                    )}
                </div>
            </div>

            {/* Body Metadata specifications */}
            <div className="p-4 flex flex-col justify-between grow gap-4">
                <div className="flex flex-col gap-2">
                    {/* Main heading */}
                    <h4 className="text-sm font-black text-white uppercase tracking-tight line-clamp-2 leading-snug group-hover:text-neon-purple transition-all duration-300 font-sans h-10">
                        {displayTitle}
                    </h4>

                    {/* Secondary title in romaji */}
                    {anime.title.english && anime.title.english !== anime.title.romaji && (
                        <span className="text-[10.5px] font-mono text-gray-400 truncate block">
                            {`// ${anime.title.romaji}`}
                        </span>
                    )}
                </div>

                {/* Info list tag badges */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-1">
                        {anime.genres.slice(0, 3).map((genre) => (
                            <span
                                key={genre}
                                className="text-[10px] font-mono text-gray-400 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded-xs uppercase tracking-wider"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>

                    {/* Card footer external trigger action */}
                    <div className="border-t border-white/5 pt-3.5 flex justify-between items-center bg-transparent mt-1">
                        <span className="text-[10px] font-mono text-gray-500">{`// ID: ${anime.id}`}</span>
                        <a
                            href={anime.siteUrl}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono font-bold text-neon-purple hover:text-white flex items-center gap-1 group/link transition-colors duration-200"
                        >
                            <span>ANILIST_LOG</span>
                            <ExternalLink className="w-3 h-3 text-neon-purple group-hover/link:text-white transition-colors duration-200" />
                        </a>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AnimeCard;
