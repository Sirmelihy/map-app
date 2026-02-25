"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MapPin, ArrowLeft, Map, Compass } from "lucide-react";
import { useVenues, Venue } from "@/hooks/useVenues";
import { getVenueImageUrl } from "@/lib/venue-utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const VenueLocationMap = dynamic(
    () => import("@/components/map/VenueLocationMap"),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center h-full w-full bg-slate-800/50 rounded-2xl">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-white/20 border-t-blue-500 rounded-full animate-spin" />
                    <p className="text-xs text-slate-500">Harita yükleniyor...</p>
                </div>
            </div>
        ),
    }
);

type PageProps = {
    params: Promise<{ id: string }>;
};

export default function VenueDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const { data: venues, isLoading } = useVenues();
    const router = useRouter();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a1a] text-white gap-4">
                <div className="w-12 h-12 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-sm font-medium text-white/80">Yükleniyor...</p>
            </div>
        );
    }

    const venue: Venue | undefined = venues?.find((v) => v.id === id);

    if (!venue) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a1a] text-white gap-4">
                <p className="text-lg font-semibold">Mekan bulunamadı</p>
                <Button
                    variant="ghost"
                    className="text-slate-400 hover:text-white cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    <ArrowLeft className="size-4 mr-2" />
                    Anasayfaya Dön
                </Button>
            </div>
        );
    }

    const imageUrl = getVenueImageUrl(venue.image_path);

    return (
        <div className="min-h-screen bg-[#0a0a1a] text-white">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 bg-[#0a0a1a]/80 backdrop-blur-2xl border-b border-white/[0.06]">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white gap-2 cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    <ArrowLeft className="size-4" />
                    <span className="hidden sm:inline">Anasayfa</span>
                </Button>

                <h2 className="text-sm font-semibold text-slate-300 truncate max-w-[50%]">
                    {venue.title}
                </h2>

                <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white gap-2 cursor-pointer"
                    onClick={() => router.push("/map")}
                >
                    <Map className="size-4" />
                    <span className="hidden sm:inline">Harita</span>
                </Button>
            </nav>

            {/* Main Content — split layout on large screens */}
            <div className="flex flex-col lg:flex-row h-[calc(100vh-56px)]">
                {/* LEFT SIDE */}
                <div className="flex flex-col lg:w-1/2 h-full overflow-y-auto">
                    {/* Top: Venue Image */}
                    <div className="relative w-full h-[35vh] lg:h-1/2 shrink-0 overflow-hidden group">
                        <Image
                            src={imageUrl}
                            alt={venue.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                            sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                        {/* Subtle gradient at bottom for smooth transition */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a1a] to-transparent" />

                        {/* Category badge on image */}
                        <div className="absolute top-4 left-4">
                            <Badge
                                className="uppercase tracking-wider text-[0.65rem] text-white shadow-lg border-0 px-3 py-1"
                                style={{
                                    background: `linear-gradient(135deg, ${venue.category.hex_color}, ${venue.category.hex_color}cc)`,
                                }}
                            >
                                {venue.category.name}
                            </Badge>
                        </div>
                    </div>

                    {/* Bottom: Venue Info */}
                    <div className="flex-1 px-6 lg:px-8 py-6 space-y-6 overflow-y-auto">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 leading-tight mb-2">
                                {venue.title}
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <MapPin className="size-3.5" />
                                <span>
                                    {venue.latitude.toFixed(4)}, {venue.longitude.toFixed(4)}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        {venue.description && (
                            <div className="space-y-2">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Hakkında
                                </h3>
                                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                                    <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                                        {venue.description}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Info Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-1">
                                <p className="text-[0.65rem] uppercase tracking-wider text-slate-600 font-semibold">
                                    Kategori
                                </p>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ backgroundColor: venue.category.hex_color }}
                                    />
                                    <span className="text-sm font-medium text-slate-300">
                                        {venue.category.name}
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-1">
                                <p className="text-[0.65rem] uppercase tracking-wider text-slate-600 font-semibold">
                                    Konum
                                </p>
                                <div className="flex items-center gap-2">
                                    <Compass className="size-3.5 text-blue-400" />
                                    <span className="text-sm font-medium text-slate-300">
                                        {venue.latitude.toFixed(2)}°N, {venue.longitude.toFixed(2)}°E
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Mobile-only: Map button */}
                        <div className="lg:hidden">
                            <Button
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl h-11 font-semibold shadow-lg shadow-blue-500/20 cursor-pointer"
                                onClick={() => router.push("/map")}
                            >
                                <Map className="size-4 mr-2" />
                                Haritada Gör
                            </Button>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE — Map (desktop: visible, mobile: hidden, handled by button above) */}
                <div className="hidden lg:block lg:w-1/2 h-full border-l border-white/[0.06] p-3">
                    <div className="h-full w-full rounded-2xl overflow-hidden ring-1 ring-white/[0.08]">
                        <VenueLocationMap
                            latitude={venue.latitude}
                            longitude={venue.longitude}
                            color={venue.category.hex_color}
                            title={venue.title}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
