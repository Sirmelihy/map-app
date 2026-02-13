"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
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

// Istanbul bounds - restrict navigation to Istanbul area
const istanbulBounds: L.LatLngBoundsExpression = [
    [40.8, 28.5], // Southwest corner
    [41.3, 29.4], // Northeast corner
];

// Istanbul center coordinates
const istanbulCenter: L.LatLngExpression = [41.0082, 28.9784];

function MapBoundsController() {
    const map = useMap();

    useEffect(() => {
        map.setMaxBounds(istanbulBounds);
        map.on("drag", () => {
            map.panInsideBounds(istanbulBounds, { animate: false });
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

function MarkerEvents({ venue, onSelect }: { venue: Venue; onSelect: (v: Venue) => void }) {
    return null;
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
                center={istanbulCenter}
                zoom={12}
                minZoom={10}
                maxZoom={18}
                maxBounds={istanbulBounds}
                maxBoundsViscosity={1.0}
                style={{ height: "100%", width: "100%" }}
                className="istanbul-map"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                <TileLayer
                    attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                    opacity={0.7}
                />
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
