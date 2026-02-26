"use client";

import { useVenues } from "@/hooks/useVenues";
import { useRouter } from "next/navigation";
import { Map, Music, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import HomeSearchBar from "@/components/home/HomeSearchBar";
import HomeVenuesBar from "@/components/home/HomeVenuesBar";

export default function HomePage() {
    const { data: venues, isLoading } = useVenues();
    const router = useRouter();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen text-white gap-4">
                <div className="w-12 h-12 border-4 border-white/20 border-t-primary rounded-full animate-spin" />
                <p className="text-sm font-medium tracking-wide text-primary">
                    Yükleniyor...
                </p>
            </div>
        );
    }

    const venueList = venues || [];

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            {/* Background Slideshow */}
            <HeroSlideshow />

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pt-[var(--safe-top)] pb-[var(--safe-bottom)]">
                {/* Title Section */}
                <div className="text-center mb-10 animate-slideIn">

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
                        Türk Müziği Kültürel Bellek
                        <br />
                        <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-blue-400 bg-clip-text text-primary">
                            Mekân Haritası
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-foreground max-w-md mx-auto leading-relaxed">
                        Kültürel mekanları keşfedin, müziğin izlerini takip edin
                    </p>
                </div>

                {/* Search Bar */}
                <div className="w-full max-w-xl mb-8">
                    <HomeSearchBar venues={venueList} />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button
                        onClick={() => router.push("/map")}
                        className="px-4 py-4 cursor-pointer"
                    >
                        <Map className="size-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                        Haritayı Keşfet
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.push("/login")}
                        className="px-4 py-4 cursor-pointer"
                    >
                        <LogIn className="size-4 mr-2" />
                        Giriş Yap
                    </Button>
                </div>
            </div>

            {/* Collapsible Venues Bar */}
            <HomeVenuesBar venues={venueList} />
        </div>
    );
}
