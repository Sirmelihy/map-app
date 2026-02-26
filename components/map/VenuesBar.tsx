"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Filter } from "lucide-react";
import Image from "next/image";
import { Venue, Category } from "@/hooks/useVenues";
import { getVenueImageUrl } from "./constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

// --- Helpers ---

function shuffleArray<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function getUniqueCategories(venues: Venue[]): Category[] {
    const map = new Map<string, Category>();
    venues.forEach((v) => { if (v.category) map.set(v.category.name, v.category); });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

// --- Sub-components ---

function VenueThumb({ venue }: { venue: Venue }) {
    return (
        <div className="relative w-full h-20 overflow-hidden rounded-t-lg bg-muted">
            <Image
                src={getVenueImageUrl(venue.image_path)}
                alt={venue.title}
                className="w-full h-full object-cover"
                width={160}
                height={80}
                loading="lazy"
            />
        </div>
    );
}

function CategoryDropdown({
    categories,
    selected,
    onSelect,
}: {
    categories: Category[];
    selected: string;
    onSelect: (name: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const isFiltered = selected !== "all";

    const choose = (name: string) => {
        onSelect(name);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={isFiltered ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-1.5 text-xs cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Filter size={13} />
                    {isFiltered ? selected : "Kategori"}
                </Button>
            </PopoverTrigger>

            <PopoverContent
                side="top"
                align="end"
                sideOffset={4}
                className="z-[1200] w-52 max-h-64 overflow-y-auto p-1"
            >
                <button
                    onClick={() => choose("all")}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-md cursor-pointer transition-colors ${selected === "all"
                        ? "bg-accent text-accent-foreground font-semibold"
                        : "text-popover-foreground hover:bg-accent"
                        }`}
                >
                    Tümü
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        onClick={() => choose(cat.name)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-md cursor-pointer transition-colors ${selected === cat.name
                            ? "bg-accent text-accent-foreground font-semibold"
                            : "text-popover-foreground hover:bg-accent"
                            }`}
                    >
                        <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: cat.hex_color }}
                        />
                        {cat.name}
                    </button>
                ))}
            </PopoverContent>
        </Popover>
    );
}

// --- Main Component ---

type Props = {
    venues: Venue[];
    onSelectVenue: (venue: Venue) => void;
};

/** Collapsible bottom bar listing venues with category filter. */
export default function VenuesBar({ venues, onSelectVenue }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = useMemo(() => getUniqueCategories(venues), [venues]);
    const shuffled = useMemo(() => shuffleArray(venues), [venues]);

    const filtered = useMemo(
        () => (selectedCategory === "all" ? shuffled : shuffled.filter((v) => v.category?.name === selectedCategory)),
        [shuffled, selectedCategory],
    );

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div
                className={`absolute bottom-0 left-0 right-0 z-[1000] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pb-[var(--safe-bottom)] ${isOpen ? "translate-y-0" : "translate-y-[calc(100%-44px-var(--safe-bottom))]"
                    }`}
            >
                {/* Toggle Handle */}
                <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between px-3 sm:px-5 h-[44px] bg-card border-t border-x border-border rounded-t-xl cursor-pointer select-none hover:bg-accent transition-colors">
                        <div className="flex items-center gap-2">
                            {isOpen ? (
                                <ChevronDown size={18} className="text-muted-foreground" />
                            ) : (
                                <ChevronUp size={18} className="text-muted-foreground" />
                            )}
                            <span className="text-sm font-medium text-foreground">Mekanlar</span>
                            <Badge variant="secondary" className="text-[0.65rem] px-2 py-0.5">
                                {filtered.length}
                            </Badge>
                        </div>
                    </div>
                </CollapsibleTrigger>

                {/* Panel Body */}
                <CollapsibleContent>
                    <div className="bg-card border-x border-border pb-4">
                        {/* Filter Row */}
                        <div className="flex items-center justify-end px-3 sm:px-5 py-2.5 border-b border-border">
                            <CategoryDropdown
                                categories={categories}
                                selected={selectedCategory}
                                onSelect={setSelectedCategory}
                            />
                        </div>

                        {/* Horizontal Venue List */}
                        <div className="flex gap-2 sm:gap-3 px-3 sm:px-5 pt-3 overflow-x-auto venues-scroll pb-1">
                            {filtered.length > 0 ? (
                                filtered.map((venue) => (
                                    <Card
                                        key={venue.id}
                                        onClick={() => onSelectVenue(venue)}
                                        className="shrink-0 w-32 sm:w-40 p-0 gap-0 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] group"
                                    >
                                        <VenueThumb venue={venue} />
                                        <div className="p-2 sm:p-2.5">
                                            <p className="text-xs font-semibold text-card-foreground leading-snug truncate">
                                                {venue.title}
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className="mt-1 text-[0.6rem] px-1.5 py-0.5"
                                                style={{
                                                    backgroundColor: (venue.category?.hex_color || "#888") + "1A",
                                                    color: venue.category?.hex_color || "#888",
                                                    borderColor: (venue.category?.hex_color || "#888") + "40",
                                                }}
                                            >
                                                {venue.category?.name || "—"}
                                            </Badge>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="flex-1 text-center py-6 text-sm text-muted-foreground">
                                    Bu kategoride mekan bulunamadı
                                </div>
                            )}
                        </div>
                    </div>
                </CollapsibleContent>
            </div>
        </Collapsible>
    );
}
