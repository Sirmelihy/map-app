"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Venue } from "@/hooks/useVenues";
import { getVenueImageUrl } from "./constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
    venue: Venue;
    onClose: () => void;
};

/** Floating card that shows details of the selected venue. */
export default function VenueCard({ venue, onClose }: Props) {
    const imageUrl = getVenueImageUrl(venue.image_path);

    return (
        <Card className="absolute top-20 left-4 z-[1100] w-80 gap-0 p-0 bg-slate-900/[0.92] backdrop-blur-2xl border-white/12 overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.45)] animate-slideIn">
            {/* Close */}
            <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-2.5 right-2.5 z-10 rounded-full bg-black/55 text-white hover:bg-black/80"
                onClick={onClose}
                aria-label="Kapat"
            >
                <X className="size-4" />
            </Button>

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
            <CardContent className="flex flex-col gap-2.5 p-4">
                <Badge
                    className="self-start uppercase tracking-wide text-[0.68rem] text-white shadow-lg border-0"
                    style={{
                        background: `linear-gradient(135deg, ${venue.category.hex_color}, ${venue.category.hex_color}cc)`,
                    }}
                >
                    {venue.category.name}
                </Badge>

                <h3 className="text-lg font-bold text-slate-100 leading-snug">
                    {venue.title}
                </h3>

                {venue.description && (
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                        {venue.description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
