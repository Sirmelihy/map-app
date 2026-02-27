"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/** Static slideshow images from /public (excluding no-image). */
const SLIDESHOW_IMAGES = [
    { src: "/dolmabahce.jpg", alt: "Dolmabahçe", description: "Dolmabahçe" },
    { src: "/galata_kulesi.jpg", alt: "Galata Kulesi", description: "Galata Kulesi" },
    { src: "/kapali_carsi.jpg", alt: "Kapalı Çarşı", description: "Kapalı Çarşı" },
    { src: "/kiz_kulesi.jpg", alt: "Kız Kulesi", description: "Kız Kulesi" },
    { src: "/sultanahmet_camii.jpg", alt: "Sultanahmet Camii", description: "Sultanahmet Camii" },
];

/** Full-screen background image picked randomly on load. */
export default function HeroSlideshow() {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    useEffect(() => {
        setCurrentIndex(Math.floor(Math.random() * SLIDESHOW_IMAGES.length));
    }, []);

    if (currentIndex === null) {
        return <div className="absolute inset-0 bg-[#0a0a1a] overflow-hidden" />;
    }

    const img = SLIDESHOW_IMAGES[currentIndex];

    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
            </div>

            {/* Overlays — slight opacity + dark gradient for readability */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a]/50 via-transparent to-transparent" />

            {/* Added overlay from usage conditions page */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            <div className="absolute bottom-16 left-2 flex justify-center px-4 sm:bottom-20 z-10">
                <div className="bg-black/60 backdrop-blur-sm rounded-full px-6 py-2 text-center">
                    <h2 className="text-md sm:text-md font-light tracking-tight text-foreground italic">
                        {img.description || img.alt}
                    </h2>
                </div>
            </div>
        </div>
    );
}
