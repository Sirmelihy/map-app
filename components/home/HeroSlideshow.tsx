"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/** Static slideshow images from /public (excluding no-image). */
const SLIDESHOW_IMAGES = [
    { src: "/dolmabahce.jpg", alt: "Dolmabahçe" },
    { src: "/galata_kulesi.jpg", alt: "Galata Kulesi" },
    { src: "/kapali_carsi.jpg", alt: "Kapalı Çarşı" },
    { src: "/kiz_kulesi.jpg", alt: "Kız Kulesi" },
    { src: "/sultanahmet_camii.jpg", alt: "Sultanahmet Camii" },
];

/** Full-screen background slideshow with crossfade transitions. */
export default function HeroSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const advance = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(advance, 5500);
        return () => clearInterval(timer);
    }, [advance]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {SLIDESHOW_IMAGES.map((img, index) => (
                <div
                    key={index}
                    className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
                    style={{ opacity: index === currentIndex ? 1 : 0 }}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="100vw"
                    />
                </div>
            ))}

            {/* Overlays — slight opacity + dark gradient for readability */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a]/50 via-transparent to-transparent" />
        </div>
    );
}
