"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Map, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
    const router = useRouter();

    return (
        <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
            {/* Top Navigation Bar */}
            <nav className="shrink-0 sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 bg-card/85 backdrop-blur-xl border-b border-border">
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
                    Hakkımızda
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

            {/* Main Content — split layout */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* LEFT SIDE - Text Content (Scrollable) */}
                <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto px-8 sm:px-12 lg:px-16 xl:px-24">
                    <div className="max-w-xl mx-auto lg:mx-0 my-auto py-8">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
                            Hakkımızda
                        </h1>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Türk Müziği Kültürel Bellek ve Mekân Haritası, köklü müzik geçmişimizin izlerini fiziksel mekânlarla buluşturmayı amaçlayan yenilikçi bir dijital arşiv projesidir. Amacımız, Türkiye'deki müzik kültürüne ait önemli durakları görünür kılmaktır.
                        </p>
                        <Separator className="my-8" />
                        <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
                            Vizyonumuz
                        </h2>
                        <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                            Geçmişten günümüze uzanan müzikal mirasımızı teknolojiyle birleştirerek, araştırmacılara ve sanatseverlere interaktif bir deneyim sunmak. Konser salonlarından, tarihi enstrüman atölyelerine kadar geniş bir yelpazede mekânları kayıt altına alıyoruz.
                        </p>

                        {/* Örnek ekstra içerikler (Scroll'u test etmek için eklenebilir, veya mevcut içerik yeterince uzunsa scroll çıkacaktır) */}
                        <Separator className="my-8" />
                        <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
                            Misyonumuz
                        </h2>
                        <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                            Türkiye genelindeki müzik mirasımızı dijital ortamda koruma altına alıp, gelecek nesillere aktarmak amacıyla her bir mekânın hikayesini belgeler, fotoğraflar ve sözlü tarih çalışmaları ile destekleyerek zenginleştiriyoruz. Müzik ekosisteminde yer almış tüm değerli kişi ve mekanları haritamızda bir araya getiriyoruz.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <Button size="lg" onClick={() => router.push("/map")} className="w-full sm:w-auto cursor-pointer">
                                Haritayı Keşfet
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => router.push("/")} className="w-full sm:w-auto cursor-pointer">
                                Ana Sayfaya Dön
                            </Button>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Full Image (Fixed without overflow) */}
                <div className="relative w-full lg:w-1/2 relative min-h-[400px] lg:min-h-0 lg:h-full shrink-0 hidden lg:block">
                    <Image
                        src="/dolmabahce.jpg"
                        alt="Türk Müziği Kültürel Bellek ve Mekân Haritası"
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-2 left-2 flex justify-center px-4">
                        <div className="bg-black/60 backdrop-blur-sm rounded-full px-6 py-2 text-center">
                            <h2 className="text-md sm:text-md font-light tracking-tight text-foreground italic">
                                Dolmabahçe Müzik Salonu
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
