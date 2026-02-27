import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPinOff } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
            <div className="space-y-8 max-w-md w-full animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center">
                    <div className="relative flex items-center justify-center">
                        {/* Büyük 404 yazısı arkaplanda */}
                        <h1 className="text-[160px] md:text-[200px] font-black text-primary/5 select-none leading-none tracking-tighter">
                            404
                        </h1>

                        {/* Ortadaki İkon */}
                        <div className="absolute">
                            <div className="bg-background/80 p-6 rounded-full backdrop-blur-md border border-border/50 shadow-2xl relative">
                                <div className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
                                <MapPinOff className="w-16 h-16 text-primary relative z-10" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Rotadan Çıktınız
                    </h2>
                    <p className="text-muted-foreground text-lg px-4 md:px-0">
                        Aradığınız mekanı veya sayfayı bulamadık. Haritada kaybolmuş olabilirsiniz veya bu sayfa artık mevcut değil.
                    </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full text-base font-medium shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300">
                        <Link href="/">
                            Ana Sayfaya Dön
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
