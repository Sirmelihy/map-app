"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Venue } from "@/hooks/useVenues";

type Props = {
    venues: Venue[];
    onSelectVenue: (venue: Venue) => void;
};

/** Full-screen search overlay for venues. */
export default function SearchOverlay({ venues, onSelectVenue }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return venues.filter((v) => v.title.toLowerCase().includes(q)).slice(0, 6);
    }, [query, venues]);

    // Focus input on open, clear query on close
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery("");
        }
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [isOpen]);

    const handleSelect = (venue: Venue) => {
        onSelectVenue(venue);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="absolute top-4 right-4 z-[1100]">
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
                    {/* Input */}
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
                                            style={{ backgroundColor: venue.category.hex_color }}
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
