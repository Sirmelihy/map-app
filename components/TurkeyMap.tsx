"use client";

import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { Venue } from "@/hooks/useVenues";
import Image from "next/image";
import { useVenueImage } from "@/hooks/useVenueImage";
import { Search, X } from "lucide-react";

const createMarkerIcon = (color: string) => {
    const hex = color || "#EF4444";

    return L.divIcon({
        className: "custom-marker",
        html: `
      <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <filter id="shadow-${hex.replace('#', '')}" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#000" flood-opacity="0.3"/>
        </filter>
        <path d="M14 0C6.268 0 0 6.268 0 14c0 9.942 12.12 24.41 12.64 25.015a1.776 1.776 0 0 0 2.72 0C15.88 38.41 28 23.942 28 14 28 6.268 21.732 0 14 0z" fill="${hex}" filter="url(#shadow-${hex.replace('#', '')})"/>
        <circle cx="14" cy="14" r="5.5" fill="white" opacity="0.95"/>
      </svg>
    `,
        iconSize: [28, 40],
        iconAnchor: [14, 40],
        popupAnchor: [0, -40],
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

function FlyToVenue({ venue }: { venue: Venue | null }) {
    const map = useMap();

    useEffect(() => {
        if (venue) {
            map.flyTo([venue.latitude, venue.longitude], 15, {
                duration: 1.5,
            });
        }
    }, [venue, map]);

    return null;
}

function SearchOverlay({
    venues,
    onSelectVenue,
}: {
    venues: Venue[];
    onSelectVenue: (venue: Venue) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const results = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return venues
            .filter((v) => v.title.toLowerCase().includes(q))
            .slice(0, 6);
    }, [query, venues]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery("");
        }
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Close on ESC
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") setIsOpen(false);
        }
        if (isOpen) {
            document.addEventListener("keydown", handleKey);
        }
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen]);

    const handleSelect = (venue: Venue) => {
        onSelectVenue(venue);
        setIsOpen(false);
    };

    return (
        <div
            ref={containerRef}
            className="absolute top-4 right-4 z-[1100]"
        >
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-11 h-11 rounded-full bg-slate-900/85 backdrop-blur-xl border border-white/12 text-white flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-200 hover:bg-slate-800/90 hover:scale-105 hover:shadow-[0_6px_28px_rgba(0,0,0,0.5)]"
                    aria-label="Ara"
                >
                    <Search className="text-slate-400" />
                </button>
            ) : (
                <div className="w-80 bg-slate-900/[0.92] backdrop-blur-2xl border border-white/12 rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)] animate-fadeIn">
                    {/* Search Input */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
                        <Search className="text-slate-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Mekan ara..."
                            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-100 placeholder:text-slate-500"
                        />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-6 h-6 rounded-full bg-white/8 text-slate-400 text-xs flex items-center justify-center cursor-pointer hover:bg-white/15 hover:text-white transition-colors duration-150"
                            aria-label="Kapat"
                        >
                            <X className="text-slate-400" />
                        </button>
                    </div>

                    {/* Results */}
                    {query.trim() && (
                        <div className="max-h-72 overflow-y-auto">
                            {results.length > 0 ? (
                                results.map((venue) => (
                                    <button
                                        key={venue.id}
                                        onClick={() => handleSelect(venue)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer transition-colors duration-150 hover:bg-white/6 border-b border-white/5 last:border-b-0"
                                    >
                                        <span
                                            className="w-2.5 h-2.5 rounded-full shrink-0"
                                            style={{
                                                backgroundColor:
                                                    venue.category.hex_color,
                                            }}
                                        />
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <span className="text-sm font-medium text-slate-200 truncate">
                                                {venue.title}
                                            </span>
                                            <span className="text-[0.68rem] text-slate-500">
                                                {venue.category.name}
                                            </span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-6 text-center text-sm text-slate-500">
                                    Sonuç bulunamadı
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
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
                    <Image
                        src={'/no-image.jpg'}
                        alt={venue.title || "Mekan Resmi"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        width={200}
                        height={200}
                    />
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
                <FlyToVenue venue={selectedVenue} />
                {venues.map((venue) => (
                    <Marker
                        key={venue.id}
                        position={[venue.latitude, venue.longitude]}
                        icon={createMarkerIcon(venue.category.hex_color)}
                        eventHandlers={{
                            click: () => handleMarkerClick(venue),
                        }}
                    />
                ))}
            </MapContainer>

            <SearchOverlay
                venues={venues}
                onSelectVenue={handleMarkerClick}
            />

            {selectedVenue && (
                <VenueCard venue={selectedVenue} onClose={handleClose} />
            )}
        </div>
    );
}
