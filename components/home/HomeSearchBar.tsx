"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Venue } from "@/hooks/useVenues";
import { getVenueImageUrl } from "@/lib/venue-utils";
import { Input } from "@/components/ui/input";

type Props = {
    venues: Venue[];
};

/** Prominent search bar for the homepage. Shows venue results with images. */
export default function HomeSearchBar({ venues }: Props) {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const results = query.trim()
        ? venues
            .filter((v) =>
                v.title.toLowerCase().includes(query.trim().toLowerCase())
            )
            .slice(0, 6)
        : [];

    const showResults = isFocused && query.trim().length > 0;

    const handleSelect = useCallback(
        (venue: Venue) => {
            router.push(`/venue/${venue.id}`);
            setQuery("");
            setIsFocused(false);
        },
        [router]
    );

    // Close results on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
            {/* Search input */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-3 bg-white/[0.07] backdrop-blur-2xl border border-white/[0.12] rounded-2xl px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 group-focus-within:bg-white/[0.10] group-focus-within:border-white/[0.2] group-focus-within:shadow-[0_12px_48px_rgba(0,0,0,0.4)]">
                    <Search className="size-5 text-slate-400 shrink-0" />
                    <Input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        placeholder="Mekan ara... (ör: Maksim Gazinosu)"
                        className="flex-1 bg-transparent border-none shadow-none outline-none text-base text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 p-0 h-auto"
                    />
                    {query && (
                        <button
                            onClick={() => {
                                setQuery("");
                                inputRef.current?.focus();
                            }}
                            className="p-1 rounded-full bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
                        >
                            <X className="size-3.5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Results dropdown */}
            {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/[0.95] backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden z-50 animate-slideIn">
                    {results.length > 0 ? (
                        <div className="max-h-[360px] overflow-y-auto venues-scroll">
                            {results.map((venue) => (
                                <button
                                    key={venue.id}
                                    onClick={() => handleSelect(venue)}
                                    className="w-full flex items-center gap-4 px-4 py-3 text-left cursor-pointer transition-all duration-150 hover:bg-white/[0.06] border-b border-white/[0.05] last:border-b-0 group"
                                >
                                    {/* Venue image */}
                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-800 ring-1 ring-white/10">
                                        <Image
                                            src={getVenueImageUrl(
                                                venue.image_path
                                            )}
                                            alt={venue.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            sizes="56px"
                                        />
                                    </div>

                                    {/* Venue info */}
                                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                        <span className="text-sm font-semibold text-slate-200 truncate group-hover:text-white transition-colors">
                                            {venue.title}
                                        </span>
                                        <span
                                            className="text-xs font-medium px-2 py-0.5 rounded-md self-start"
                                            style={{
                                                backgroundColor:
                                                    venue.category.hex_color +
                                                    "22",
                                                color: venue.category.hex_color,
                                            }}
                                        >
                                            {venue.category.name}
                                        </span>
                                    </div>

                                    {/* Arrow */}
                                    <svg
                                        className="size-4 text-slate-600 group-hover:text-slate-400 transition-colors shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-8 text-center text-sm text-slate-500">
                            Sonuç bulunamadı
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
