"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { X, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Venue } from "@/hooks/useVenues";
import { getVenueImageUrl } from "@/lib/venue-utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Popover,
    PopoverAnchor,
    PopoverContent,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

type Props = {
    venues: Venue[];
};

/** Prominent search bar for the homepage. Shows venue results with images. */
export default function HomeSearchBar({ venues }: Props) {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const results = query.trim()
        ? venues
            .filter((v) =>
                v.title.toLowerCase().includes(query.trim().toLowerCase())
            )
            .slice(0, 6)
        : [];

    const showResults = open && query.trim().length > 0;

    const handleSelect = useCallback(
        (venue: Venue) => {
            router.push(`/venue/${venue.id}`);
            setQuery("");
            setOpen(false);
        },
        [router]
    );

    return (
        <Popover open={showResults} onOpenChange={setOpen}>
            <PopoverAnchor asChild>
                <div className="relative w-full max-w-xl mx-auto flex items-stretch group">
                    <div className="flex justify-center items-center px-3 bg-primary border border-r-0 rounded-l-md">
                        <Search className="h-4 w-4 text-white" />
                    </div>
                    <Input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (e.target.value.trim()) setOpen(true);
                        }}
                        onFocus={() => {
                            if (query.trim()) setOpen(true);
                        }}
                        placeholder="Mekan ara... (ör: Maksim Gazinosu)"
                    />
                    {query && (
                        <button
                            onClick={() => {
                                setQuery("");
                                setOpen(false);
                                inputRef.current?.focus();
                            }}
                            className="absolute right-2 p-1 rounded-full bg-muted text-muted-foreground cursor-pointer top-1/2 -translate-y-1/2"
                        >
                            <X className="size-3.5" />
                        </button>
                    )}
                </div>
            </PopoverAnchor>

            <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0"
                align="start"
                sideOffset={8}
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <Command shouldFilter={false}>
                    <CommandList>
                        {results.length > 0 ? (
                            <CommandGroup>
                                {results.map((venue) => (
                                    <CommandItem
                                        key={venue.id}
                                        value={venue.id}
                                        onSelect={() => handleSelect(venue)}
                                        className="flex items-center gap-3 px-3 py-2.5 cursor-pointer"
                                    >
                                        {/* Venue image */}
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-muted ring-1 ring-border">
                                            <Image
                                                src={getVenueImageUrl(
                                                    venue.image_path
                                                )}
                                                alt={venue.title}
                                                fill
                                                className="object-cover"
                                                sizes="48px"
                                            />
                                        </div>

                                        {/* Venue info */}
                                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                                            <span className="text-sm font-semibold truncate">
                                                {venue.title}
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="self-start text-xs"
                                                style={{
                                                    borderColor:
                                                        (venue.category
                                                            ?.hex_color || "#888") + "44",
                                                    color: venue.category
                                                        ?.hex_color || "#888",
                                                    backgroundColor:
                                                        (venue.category
                                                            ?.hex_color || "#888") + "15",
                                                }}
                                            >
                                                {venue.category?.name || "—"}
                                            </Badge>
                                        </div>

                                        {/* Arrow */}
                                        <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ) : (
                            <CommandEmpty>Sonuç bulunamadı</CommandEmpty>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
