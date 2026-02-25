"use client";

import Image from "next/image";
import { Venue } from "@/hooks/useVenues";
import { getVenueImageUrl } from "./constants";

type Props = {
    venue: Venue;
    onClose: () => void;
};

/** Floating card that shows details of the selected venue. */
export default function VenueCard({ venue, onClose }: Props) {
    const imageUrl = getVenueImageUrl(venue.image_path);

    return (
        <div className="absolute top-20 left-4 z-[1100] w-80 bg-slate-900/[0.92] backdrop-blur-2xl border border-white/12 rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)] animate-slideIn">
            {/* Close */}
            <button
                className="absolute top-2.5 right-2.5 z-10 w-8 h-8 border-none rounded-full bg-black/55 text-white text-sm cursor-pointer flex items-center justify-center transition-colors duration-200 hover:bg-black/80"
                onClick={onClose}
                aria-label="Kapat"
            >
                ✕
            </button>

            {/* Image */}
            <div className="relative w-full h-44 overflow-hidden group">
                <Image
                    src={imageUrl}
                    alt={venue.title || "Mekan Resmi"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    width={200}
                    height={200}
                />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2.5 p-4">
                <span
                    className="self-start inline-flex items-center px-3 py-1 rounded-full text-[0.68rem] font-semibold uppercase tracking-wide text-white shadow-lg"
                    style={{
                        background: `linear-gradient(135deg, ${venue.category.hex_color}, ${venue.category.hex_color}cc)`,
                    }}
                >
                    {venue.category.name}
                </span>

                <h3 className="text-lg font-bold text-slate-100 leading-snug">
                    {venue.title}
                </h3>

                {venue.description && (
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                        {venue.description}
                    </p>
                )}
            </div>
        </div>
    );
}
