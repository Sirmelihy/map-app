"use client";

import { useVenues } from "@/hooks/useVenues";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamic import to avoid SSR issues with Leaflet
const TurkeyMap = dynamic(() => import("@/components/TurkeyMap"), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white gap-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-sm font-medium tracking-wide text-white/80">Harita Yükleniyor...</p>
        </div>
    ),
});


export default function Home() {

    const { data: venuesData } = useVenues()

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <header className="absolute top-0 left-0 right-0 z-[1000] px-6 py-4 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">Türk Müziği Kültürel Bellek ve Mekân Haritası</h1>
                <p className="text-sm text-white/85 drop-shadow-md">Kültürel mekanları keşfetmek için işaretçilere tıklayın</p>
            </header>
            <TurkeyMap venues={venuesData || []} />
        </div>
    );
}
