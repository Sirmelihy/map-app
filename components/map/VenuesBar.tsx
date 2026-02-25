"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Filter } from "lucide-react";
import Image from "next/image";
import { Venue, Category } from "@/hooks/useVenues";
import { getVenueImageUrl } from "./constants";
import { Button } from "@/components/ui/button";
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
    venues.forEach((v) => map.set(v.category.name, v.category));
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

// --- Sub-components ---

function VenueThumb({ venue }: { venue: Venue }) {
    return (
        <div className="relative w-full h-20 overflow-hidden rounded-t-xl bg-slate-800">
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

    const itemClass = (active: boolean) =>
        `w-full flex items-center gap-2 px-3.5 py-2.5 text-xs transition-colors duration-100 cursor-pointer ${active ? "bg-white/10 text-white font-semibold" : "text-slate-300 hover:bg-white/6"
        }`;

    const choose = (name: string) => {
        onSelect(name);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1.5 rounded-lg text-xs font-medium cursor-pointer ${isFiltered
                        ? "bg-blue-500/20 text-blue-300 border border-blue-400/25"
                        : "bg-white/6 text-slate-400 border border-white/8 hover:bg-white/10 hover:text-slate-300"
                        }`}
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
                className="z-[1200] w-52 max-h-64 overflow-y-auto p-0 bg-slate-800/95 backdrop-blur-2xl border-white/12 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            >
                <button onClick={() => choose("all")} className={itemClass(selected === "all")}>
                    Tümü
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        onClick={() => choose(cat.name)}
                        className={itemClass(selected === cat.name)}
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
        () => (selectedCategory === "all" ? shuffled : shuffled.filter((v) => v.category.name === selectedCategory)),
        [shuffled, selectedCategory],
    );

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div
                className={`absolute bottom-0 left-0 right-0 z-[1100] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-y-0" : "translate-y-[calc(100%-44px)]"
                    }`}
            >
                {/* Toggle Handle */}
                <CollapsibleTrigger asChild>
                    <div
                        className="flex items-center justify-between px-5 h-[44px] bg-slate-900/90 backdrop-blur-2xl border-t border-x border-white/10 rounded-t-2xl cursor-pointer select-none hover:bg-slate-800/90 transition-colors duration-200"
                    >
                        <div className="flex items-center gap-2">
                            {isOpen ? (
                                <ChevronDown size={18} className="text-slate-400" />
                            ) : (
                                <ChevronUp size={18} className="text-slate-400" />
                            )}
                            <span className="text-sm font-medium text-slate-300">Mekanlar</span>
                            <span className="text-[0.65rem] text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">
                                {filtered.length}
                            </span>
                        </div>
                    </div>
                </CollapsibleTrigger>

                {/* Panel Body */}
                <CollapsibleContent>
                    <div className="bg-slate-900/[0.94] backdrop-blur-2xl border-x border-white/10 pb-4">
                        {/* Filter Row */}
                        <div className="flex items-center justify-end px-5 py-2.5 border-b border-white/6">
                            <CategoryDropdown
                                categories={categories}
                                selected={selectedCategory}
                                onSelect={setSelectedCategory}
                            />
                        </div>

                        {/* Horizontal Venue List */}
                        <div className="flex gap-3 px-5 pt-3 overflow-x-auto venues-scroll pb-1">
                            {filtered.length > 0 ? (
                                filtered.map((venue) => (
                                    <button
                                        key={venue.id}
                                        onClick={() => onSelectVenue(venue)}
                                        className="shrink-0 w-40 bg-white/[0.04] border border-white/8 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:bg-white/[0.08] hover:border-white/15 hover:scale-[1.03] hover:shadow-lg group text-left"
                                    >
                                        <VenueThumb venue={venue} />
                                        <div className="p-2.5">
                                            <p className="text-[0.72rem] font-semibold text-slate-200 leading-snug truncate group-hover:text-white transition-colors">
                                                {venue.title}
                                            </p>
                                            <span
                                                className="inline-block mt-1 text-[0.6rem] px-1.5 py-0.5 rounded-md font-medium text-white/80"
                                                style={{
                                                    backgroundColor: venue.category.hex_color + "33",
                                                    color: venue.category.hex_color,
                                                }}
                                            >
                                                {venue.category.name}
                                            </span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="flex-1 text-center py-6 text-sm text-slate-500">
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
