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
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[1100]">
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
                        className="w-11 h-11 rounded-full bg-card/85 backdrop-blur-xl border border-border text-foreground shadow-lg hover:bg-accent hover:scale-105 cursor-pointer"
                        aria-label="Ara"
                    >
                        <Search className="text-muted-foreground" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    align="end"
                    sideOffset={8}
                    className="z-[1200] w-64 sm:w-80 p-0"
                    onOpenAutoFocus={(e) => {
                        e.preventDefault();
                        setTimeout(() => inputRef.current?.focus(), 50);
                    }}
                >
                    {/* Input */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                        <Search className="size-4 shrink-0 text-muted-foreground" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Mekan ara..."
                            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
                        />
                        <Button
                            variant="ghost"
                            size="icon-xs"
                            className="rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
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
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer transition-colors duration-150 hover:bg-accent border-b border-border last:border-b-0"
                                    >
                                        <span
                                            className="w-2.5 h-2.5 rounded-full shrink-0"
                                            style={{ backgroundColor: venue.category.hex_color }}
                                        />
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <span className="text-sm font-medium text-foreground truncate">
                                                {venue.title}
                                            </span>
                                            <span className="text-[0.68rem] text-muted-foreground">
                                                {venue.category.name}
                                            </span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-6 text-center text-sm text-muted-foreground">
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
