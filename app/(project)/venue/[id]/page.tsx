"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MapPin, ArrowLeft, Map, Compass, Home } from "lucide-react";
import { useVenues, Venue } from "@/hooks/useVenues";
import { getVenueImageUrl } from "@/lib/venue-utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const VenueLocationMap = dynamic(
    () => import("@/components/map/VenueLocationMap"),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center h-full w-full bg-muted rounded-xl">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-muted-foreground/20 border-t-primary rounded-full animate-spin" />
                    <p className="text-xs text-muted-foreground">Harita yükleniyor...</p>
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
            <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground gap-4">
                <div className="w-12 h-12 border-4 border-muted-foreground/20 border-t-primary rounded-full animate-spin" />
                <p className="text-sm font-medium text-muted-foreground">Yükleniyor...</p>
            </div>
        );
    }

    const venue: Venue | undefined = venues?.find((v) => v.id === id);

    if (!venue) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground gap-4">
                <p className="text-lg font-semibold">Mekan bulunamadı</p>
                <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
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
        <div className="min-h-screen bg-background text-foreground">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 bg-card/85 backdrop-blur-xl border-b border-border">
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
                    onClick={() => router.push("/")}
                    aria-label="Anasayfa"
                >
                    <Home className="size-4" />
                </Button>

                <h2 className="text-sm font-semibold text-foreground truncate max-w-[50%]">
                    {venue.title}
                </h2>

                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
                    onClick={() => router.push("/map")}
                    aria-label="Harita"
                >
                    <Map className="size-4" />
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
                        {/* Gradient overlay at bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

                        {/* Category badge on image */}
                        {venue.category && (
                            <div className="absolute top-4 left-4">
                                <Badge
                                    className="uppercase tracking-wider text-[0.65rem] shadow-lg border-0 px-3 py-1"
                                    style={{
                                        backgroundColor: venue.category.hex_color,
                                        color: "#fff",
                                    }}
                                >
                                    {venue.category.name}
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Bottom: Venue Info */}
                    <div className="flex-1 px-5 lg:px-7 py-5 space-y-5 overflow-y-auto">
                        {/* Title & Coordinates */}
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-card-foreground leading-tight mb-1.5">
                                {venue.title}
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="size-3.5" />
                                <span>
                                    {venue.latitude.toFixed(4)}, {venue.longitude.toFixed(4)}
                                </span>
                            </div>
                        </div>

                        <Separator />

                        {/* Description */}
                        {venue.description && (
                            <Card className="py-0 gap-0">
                                <CardContent className="px-4 py-4">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                        Hakkında
                                    </h3>
                                    <p className="text-sm text-card-foreground/80 leading-relaxed whitespace-pre-line">
                                        {venue.description}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Info Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            <Card className="py-0 gap-0">
                                <CardContent className="px-4 py-3.5 space-y-1.5">
                                    <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground font-semibold">
                                        Kategori
                                    </p>
                                    <div className="flex items-center gap-2">
                                        {venue.category ? (
                                            <>
                                                <span
                                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                                    style={{ backgroundColor: venue.category.hex_color }}
                                                />
                                                <span className="text-sm font-medium text-card-foreground">
                                                    {venue.category.name}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">—</span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="py-0 gap-0">
                                <CardContent className="px-4 py-3.5 space-y-1.5">
                                    <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground font-semibold">
                                        Konum
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Compass className="size-3.5 text-primary shrink-0" />
                                        <span className="text-sm font-medium text-card-foreground">
                                            {venue.latitude.toFixed(2)}°N, {venue.longitude.toFixed(2)}°E
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Mobile-only: Map button */}
                        <div className="lg:hidden">
                            <Button
                                className="w-full h-11 font-semibold cursor-pointer"
                                onClick={() => router.push("/map")}
                            >
                                <Map className="size-4 mr-2" />
                                Haritada Gör
                            </Button>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE — Map (desktop only) */}
                <div className="hidden lg:block lg:w-1/2 h-full border-l border-border p-3">
                    <div className="h-full w-full rounded-xl overflow-hidden ring-1 ring-border">
                        <VenueLocationMap
                            latitude={venue.latitude}
                            longitude={venue.longitude}
                            color={venue.category?.hex_color || "#EF4444"}
                            title={venue.title}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
