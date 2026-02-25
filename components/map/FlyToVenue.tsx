"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Venue } from "@/hooks/useVenues";

/** Smoothly flies the map to the selected venue's coordinates. */
export default function FlyToVenue({ venue }: { venue: Venue | null }) {
    const map = useMap();

    useEffect(() => {
        if (venue) {
            map.flyTo([venue.latitude, venue.longitude], 15, { duration: 1.5 });
        }
    }, [venue, map]);

    return null;
}
