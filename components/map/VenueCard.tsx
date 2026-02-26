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
        <Card className="absolute top-16 sm:top-20 left-2 sm:left-4 z-[1100] w-[calc(100vw-1rem)] sm:w-80 gap-0 p-0 bg-card border-border overflow-hidden shadow-xl animate-slideIn">
            {/* Close */}
            <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-2.5 right-2.5 z-10 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                onClick={onClose}
                aria-label="Kapat"
            >
                <X className="size-4" />
            </Button>

            {/* Image */}
            <div className="relative w-full h-36 sm:h-44 overflow-hidden group">
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
            <CardContent className="flex flex-col gap-2.5 p-3 sm:p-4">
                <Badge
                    className="self-start uppercase tracking-wide text-[0.68rem] text-white shadow-lg border-0"
                    style={{
                        background: `linear-gradient(135deg, ${venue.category?.hex_color || "#888"}, ${venue.category?.hex_color || "#888"}cc)`,
                    }}
                >
                    {venue.category?.name || "—"}
                </Badge>

                <h3 className="text-base sm:text-lg font-bold text-card-foreground leading-snug">
                    {venue.title}
                </h3>

                {venue.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed max-h-24 sm:max-h-48 overflow-y-auto no-scrollbar">
                        {venue.description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
