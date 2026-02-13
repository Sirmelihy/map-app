"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { venues, type Venue } from "@/lib/venues";
import { useEffect } from "react";

// Heatmap style glowing circle marker
const createHeatmapIcon = () => L.divIcon({
    className: "heatmap-marker",
    html: `<div class="heatmap-dot"><div class="heatmap-pulse"></div></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
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

function VenuePopup({ venue }: { venue: Venue }) {
    return (
        <div className="venue-popup">
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
    return (
        <MapContainer
            center={istanbulCenter}
            zoom={300}
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
                <Marker key={venue.id} position={venue.coordinates} icon={createHeatmapIcon()}>
                    <Popup maxWidth={320} minWidth={280} className="custom-popup">
                        <VenuePopup venue={venue} />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
