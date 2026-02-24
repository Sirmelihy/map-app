"use client";

import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useCallback } from "react";
import { Venue } from "@/hooks/useVenues";
import Image from "next/image";
import { useVenueImage } from "@/hooks/useVenueImage";

const hexToRgb = (hex?: string) => {
    if (!hex || typeof hex !== "string") {
        return { r: 255, g: 0, b: 0 }; // fallback
    }

    const cleaned = hex.replace("#", "");
    const bigint = parseInt(cleaned, 16);

    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
};

const createHeatmapIcon = (color: string) => {
    const { r, g, b } = hexToRgb(color);

    return L.divIcon({
        className: "heatmap-marker",
        html: `
      <div 
        class="heatmap-dot"
        style="--heat-r:${r}; --heat-g:${g}; --heat-b:${b};"
      >
        <div class="heatmap-pulse"></div>
      </div>
    `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });
};

// Turkey bounds - restrict navigation to Turkey area
const turkeyBounds: L.LatLngBoundsExpression = [
    [33.5, 22.5], // Southwest corner
    [45.5, 48.0], // Northeast corner
];

// Turkey center coordinates
const turkeyCenter: L.LatLngExpression = [39.0, 35.2];

function MapBoundsController() {
    const map = useMap();

    useEffect(() => {
        map.setMaxBounds(turkeyBounds);
        map.on("drag", () => {
            map.panInsideBounds(turkeyBounds, { animate: false });
        });
    }, [map]);

    return null;
}

function VenueCard({ venue, onClose }: { venue: Venue; onClose: () => void }) {
    const { data: imageUrl, isLoading: imageLoading } = useVenueImage(venue.id);

    return (
        <div className="absolute top-20 left-4 z-[1100] w-80 bg-slate-900/[0.92] backdrop-blur-2xl border border-white/12 rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)] animate-slideIn">
            {/* Close Button */}
            <button
                className="absolute top-2.5 right-2.5 z-10 w-8 h-8 border-none rounded-full bg-black/55 text-white text-sm cursor-pointer flex items-center justify-center transition-colors duration-200 hover:bg-black/80"
                onClick={onClose}
                aria-label="Kapat"
            >
                ✕
            </button>

            {/* Image Section */}
            <div className="relative w-full h-44 overflow-hidden group">
                {imageLoading ? (
                    <div className="w-full h-full animate-shimmer bg-[length:200%_100%]"
                        style={{
                            backgroundImage: "linear-gradient(110deg, rgba(30,41,59,0.8) 30%, rgba(51,65,85,0.6) 50%, rgba(30,41,59,0.8) 70%)"
                        }}
                    />
                ) : imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={venue.title || "Mekan Resmi"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        width={200}
                        height={200}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-800/70 text-slate-500">
                        <svg className="opacity-50" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span className="text-xs font-medium tracking-wide">Resim bulunamadı</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-2.5 p-4">
                {/* Category Badge */}
                <div className="self-start">
                    <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-[0.68rem] font-semibold uppercase tracking-wide text-white shadow-lg"
                        style={{
                            background: `linear-gradient(135deg, ${venue.category.hex_color}, ${venue.category.hex_color}cc)`,
                        }}
                    >
                        {venue.category.name}
                    </span>
                </div>

                {/* Venue Name */}
                <h3 className="text-lg font-bold text-slate-100 leading-snug">
                    {venue.title}
                </h3>

                {/* Description */}
                {venue.description && (
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                        {venue.description}
                    </p>
                )}
            </div>
        </div>
    );
}

type TurkeyMapProps = {
    venues: Venue[]
}

export default function IstanbulMap({ venues }: TurkeyMapProps) {
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

    const handleMarkerClick = useCallback((venue: Venue) => {
        setSelectedVenue(venue);
    }, []);

    const handleClose = useCallback(() => {
        setSelectedVenue(null);
    }, []);

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={turkeyCenter}
                zoom={7}
                minZoom={5}
                maxZoom={18}
                maxBounds={turkeyBounds}
                maxBoundsViscosity={1.0}
                zoomControl={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />
                <MapBoundsController />
                {venues.map((venue) => (
                    <Marker
                        key={venue.id}
                        position={[venue.latitude, venue.longitude]}
                        icon={createHeatmapIcon(venue.category.hex_color)}
                        eventHandlers={{
                            click: () => handleMarkerClick(venue),
                        }}
                    />
                ))}
            </MapContainer>

            {selectedVenue && (
                <VenueCard venue={selectedVenue} onClose={handleClose} />
            )}
        </div>
    );
}
