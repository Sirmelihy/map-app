"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { TURKEY_BOUNDS } from "./constants";

/** Restricts map panning to Turkey's geographic bounds. */
export default function MapBoundsController() {
    const map = useMap();

    useEffect(() => {
        map.setMaxBounds(TURKEY_BOUNDS);
        map.on("drag", () => {
            map.panInsideBounds(TURKEY_BOUNDS, { animate: false });
        });
    }, [map]);

    return null;
}
