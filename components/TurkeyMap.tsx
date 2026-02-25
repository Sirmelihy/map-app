"use client";

import { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Venue } from "@/hooks/useVenues";

import {
    TURKEY_BOUNDS,
    TURKEY_CENTER,
    createMarkerIcon,
    MapBoundsController,
    FlyToVenue,
    SearchOverlay,
    VenueCard,
    VenuesBar,
} from "./map";

type TurkeyMapProps = {
    venues: Venue[];
};

export default function TurkeyMap({ venues }: TurkeyMapProps) {
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

    const handleSelectVenue = useCallback((venue: Venue) => {
        setSelectedVenue(venue);
    }, []);

    const handleClose = useCallback(() => {
        setSelectedVenue(null);
    }, []);

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={TURKEY_CENTER}
                zoom={7}
                minZoom={5}
                maxZoom={18}
                maxBounds={TURKEY_BOUNDS}
                maxBoundsViscosity={1.0}
                zoomControl={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />
                <MapBoundsController />
                <FlyToVenue venue={selectedVenue} />

                {venues.map((venue) => (
                    <Marker
                        key={venue.id}
                        position={[venue.latitude, venue.longitude]}
                        icon={createMarkerIcon(venue.category.hex_color)}
                        eventHandlers={{ click: () => handleSelectVenue(venue) }}
                    />
                ))}
            </MapContainer>

            <SearchOverlay venues={venues} onSelectVenue={handleSelectVenue} />
            <VenuesBar venues={venues} onSelectVenue={handleSelectVenue} />

            {selectedVenue && <VenueCard venue={selectedVenue} onClose={handleClose} />}
        </div>
    );
}
