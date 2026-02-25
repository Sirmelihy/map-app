"use client";

import { useVenues } from "@/hooks/useVenues";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Leaflet
const TurkeyMap = dynamic(() => import("@/components/TurkeyMap"), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-[#0a0a1a] via-[#111827] to-[#0f172a] text-white gap-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-sm font-medium tracking-wide text-white/80">Harita Yükleniyor...</p>
        </div>
    ),
});


export default function MapPage() {
    const { data: venuesData } = useVenues();
    const router = useRouter();

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <header className="absolute top-0 left-0 right-0 z-[1000] pl-3 sm:pl-6 pr-14 sm:pr-20 py-3 sm:py-4 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
                <div className="flex items-center gap-2 sm:gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="pointer-events-auto rounded-full bg-card/85 backdrop-blur-xl border border-border text-foreground shadow-lg hover:bg-accent hover:scale-105 cursor-pointer shrink-0"
                        onClick={() => router.push("/")}
                        aria-label="Anasayfa"
                    >
                        <Home className="size-4 text-muted-foreground" />
                    </Button>
                    <div className="min-w-0">
                        <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-white drop-shadow-lg">Türk Müziği Kültürel Bellek ve Mekân Haritası</h1>
                        <p className="hidden sm:block text-sm text-white/85 drop-shadow-md">Kültürel mekanları keşfetmek için işaretçilere tıklayın</p>
                    </div>
                </div>
            </header>
            <TurkeyMap venues={venuesData || []} />
        </div>
    );
}
