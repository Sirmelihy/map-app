"use client";

import { useState, useRef, useCallback } from "react";
import { Search, X } from "lucide-react";
import { Venue } from "@/hooks/useVenues";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

type Props = {
    venues: Venue[];
    onSelectVenue: (venue: Venue) => void;
};

/** Search overlay for venues using Popover. */
export default function SearchOverlay({ venues, onSelectVenue }: Props) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const results = query.trim()
        ? venues.filter((v) => v.title.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6)
        : [];

    const handleSelect = useCallback(
        (venue: Venue) => {
            onSelectVenue(venue);
            setOpen(false);
            setQuery("");
        },
        [onSelectVenue],
    );

    return (
        <div className="absolute top-4 right-4 z-[1100]">
            <Popover
                open={open}
                onOpenChange={(v) => {
                    setOpen(v);
                    if (!v) setQuery("");
                }}
            >
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-11 h-11 rounded-full bg-slate-900/85 backdrop-blur-xl border border-white/12 text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:bg-slate-800/90 hover:scale-105 hover:shadow-[0_6px_28px_rgba(0,0,0,0.5)]"
                        aria-label="Ara"
                    >
                        <Search className="text-slate-400" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    align="end"
                    sideOffset={8}
                    className="z-[1200] w-80 p-0 bg-slate-900/[0.92] backdrop-blur-2xl border-white/12 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
                    onOpenAutoFocus={(e) => {
                        e.preventDefault();
                        setTimeout(() => inputRef.current?.focus(), 50);
                    }}
                >
                    {/* Input */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
                        <Search className="size-4 shrink-0 text-slate-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Mekan ara..."
                            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-100 placeholder:text-slate-500"
                        />
                        <Button
                            variant="ghost"
                            size="icon-xs"
                            className="rounded-full bg-white/8 text-slate-400 hover:bg-white/15 hover:text-white"
                            onClick={() => setOpen(false)}
                            aria-label="Kapat"
                        >
                            <X />
                        </Button>
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
                </PopoverContent>
            </Popover>
        </div>
    );
}
