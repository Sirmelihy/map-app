"use client";

import { useVenues } from "@/hooks/useVenues";
import { useRouter } from "next/navigation";
import { Map, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import HomeSearchBar from "@/components/home/HomeSearchBar";
import HomeVenuesBar from "@/components/home/HomeVenuesBar";

export default function HomePage() {
    const { data: venues, isLoading } = useVenues();
    const router = useRouter();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-[#0a0a1a] via-[#111827] to-[#0f172a] text-white gap-4">
                <div className="w-12 h-12 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-sm font-medium tracking-wide text-white/80">
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
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
                {/* Title Section */}
                <div className="text-center mb-10 animate-slideIn">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-full mb-6">
                        <Music className="size-4 text-blue-400" />
                        <span className="text-xs font-medium text-slate-300 tracking-wide">
                            Kültürel Bellek Haritası
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
                        Türk Müziği
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Mekân Haritası
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-400 max-w-md mx-auto leading-relaxed">
                        Kültürel mekanları keşfedin, müziğin izlerini takip edin
                    </p>
                </div>

                {/* Search Bar */}
                <div className="w-full max-w-xl mb-8">
                    <HomeSearchBar venues={venueList} />
                </div>

                {/* Map Button */}
                <Button
                    onClick={() => router.push("/map")}
                    className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl h-12 px-8 font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.03] cursor-pointer"
                >
                    <Map className="size-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    Haritayı Keşfet
                </Button>
            </div>

            {/* Collapsible Venues Bar */}
            <HomeVenuesBar venues={venueList} />
        </div>
    );
}
