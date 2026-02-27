"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Map, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function UsageConditionsPage() {
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
                    Kullanım Koşulları
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
                            Kullanım Koşulları
                        </h1>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Türk Müziği Kültürel Bellek ve Mekân Haritası platformuna hoş geldiniz. Bu platformu kullanarak aşağıda belirtilen şartları okumuş ve kabul etmiş sayılırsınız.
                        </p>

                        <Separator className="my-8" />

                        <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
                            1. Hizmetin Kullanımı
                        </h2>
                        <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                            Platformda yer alan içerikler, harita verileri, fotoğraflar ve metinler akademik, kültürel ve bilgilendirme amaçlıdır. Verilerin projenin amacı dışında kullanılması veya izinsiz ticari amaçlarla kopyalanması yasaktır.
                        </p>

                        <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
                            2. Fikri Mülkiyet Hakları
                        </h2>
                        <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                            Sitede sergilenen tüm metinlerin, görsel işitsel materyallerin ve harita verilerinin telif hakları projemize ve/veya ilgili eser sahiplerine aittir. Alıntı yapılacak durumlarda "Türk Müziği Kültürel Bellek ve Mekân Haritası" kaynak gösterilmelidir.
                        </p>

                        <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
                            3. Sorumluluk Reddi
                        </h2>
                        <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                            Platformda yer alan bazı tarihi veya güncel mekân bilgileri sürekli olarak güncellenmektedir. Bu veriler kesin birer kanıt niteliği taşımamakla beraber oluşabilecek eksikliklerden platform ekibi sorumlu tutulamaz.
                        </p>

                        <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
                            4. Değişiklik Hakları
                        </h2>
                        <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                            Platform ekibimiz, bu kullanım koşullarını herhangi bir ön bildirimde bulunmaksızın değiştirme hakkını saklı tutar. Değişiklikler siteye eklendiği andan itibaren geçerlilik kazanır.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <Button size="lg" onClick={() => router.push("/map")} className="w-full sm:w-auto cursor-pointer">
                                Haritaya Git
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => router.push("/")} className="w-full sm:w-auto cursor-pointer">
                                Ana Sayfaya Dön
                            </Button>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Full Image (Fixed without overflow) */}
                <div className="relative w-full lg:w-1/2 relative min-h-[400px] lg:min-h-0 lg:h-full shrink-0 hidden lg:block border-l border-border/50">
                    <Image
                        src="/dolmabahce.jpg"
                        alt="Türk Müziği Kültürel Bellek ve Mekân Haritası"
                        fill
                        priority
                        className="object-cover opacity-80"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute bottom-2 left-2 flex justify-center px-4">
                        <div className="bg-black/60 backdrop-blur-sm rounded-full px-6 py-2 text-center">
                            <h2 className="text-md sm:text-md font-light tracking-tight text-foreground italic">
                                Türk Müziği Kültürel Bellek ve Mekân Haritası
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
