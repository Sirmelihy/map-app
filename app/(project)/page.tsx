"use client";

import { usePublicVenues } from "@/hooks/useVenues";
import { useRouter } from "next/navigation";
import { Map, Music, LogIn, Hamburger, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import HomeSearchBar from "@/components/home/HomeSearchBar";
import HomeVenuesBar from "@/components/home/HomeVenuesBar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function HomePage() {
    const { data: venues, isLoading } = usePublicVenues();
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

            {/* Menu */}
            <div className="absolute top-4 right-4 z-50 cursor-pointer">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="rounded-full w-10 h-10 p-0 flex items-center justify-center cursor-pointer">
                            <Menu className="size-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => router.push("/login")}>Giriş Yap</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push("/hakkimizda")}>Hakkımızda</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push("/kullanim-kosullari")}>Kullanım Koşulları</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

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
                </div>
            </div>

            {/* Collapsible Venues Bar */}
            <HomeVenuesBar venues={venueList} />
        </div>
    );
}
