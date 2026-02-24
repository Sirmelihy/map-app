"use client";

import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { venues, type Venue } from "@/lib/venues";
import { useEffect, useState, useCallback } from "react";

// Heatmap style glowing circle marker
const createHeatmapIcon = () => L.divIcon({
    className: "heatmap-marker",
    html: `<div class="heatmap-dot"><div class="heatmap-pulse"></div></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

// Turkey bounds - restrict navigation to Turkey area
const turkeyBounds: L.LatLngBoundsExpression = [
    [33.5, 22.5], // Southwest corner
    [45.5, 48.0], // Northeast corner
];

// Turkey center coordinates
const turkeyCenter: L.LatLngExpression = [39.0, 35.2];

function MapBoundsController() {
    const map = useMap();

    useEffect(() => {
        map.setMaxBounds(turkeyBounds);
        map.on("drag", () => {
            map.panInsideBounds(turkeyBounds, { animate: false });
        });
    }, [map]);

    return null;
}

function VenueCard({ venue, onClose }: { venue: Venue; onClose: () => void }) {
    return (
        <div className="venue-card">
            <button className="venue-card-close" onClick={onClose} aria-label="Kapat">
                ✕
            </button>
            <div className="venue-image-container">
                <img
                    src={venue.imageUrl}
                    alt={venue.name}
                    className="venue-image"
                    loading="lazy"
                />
            </div>
            <div className="venue-content">
                <span className="venue-category">{venue.category}</span>
                <h3 className="venue-name">{venue.name}</h3>
                <p className="venue-description">{venue.description}</p>
            </div>
        </div>
    );
}

export default function IstanbulMap() {
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

    const handleMarkerClick = useCallback((venue: Venue) => {
        setSelectedVenue(venue);
    }, []);

    const handleClose = useCallback(() => {
        setSelectedVenue(null);
    }, []);

    return (
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
            <MapContainer
                center={turkeyCenter}
                zoom={7}
                minZoom={5}
                maxZoom={18}
                maxBounds={turkeyBounds}
                maxBoundsViscosity={1.0}
                zoomControl={false}
                style={{ height: "100%", width: "100%" }}
                className="istanbul-map"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />
                <MapBoundsController />
                {venues.map((venue) => (
                    <Marker
                        key={venue.id}
                        position={venue.coordinates}
                        icon={createHeatmapIcon()}
                        eventHandlers={{
                            click: () => handleMarkerClick(venue),
                        }}
                    />
                ))}
            </MapContainer>

            {selectedVenue && (
                <VenueCard venue={selectedVenue} onClose={handleClose} />
            )}
        </div>
    );
}
