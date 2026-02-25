"use client";

import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { createMarkerIcon } from "@/components/map/constants";

type Props = {
    latitude: number;
    longitude: number;
    color: string;
    title: string;
};

/** Small static map showing a single venue marker. */
export default function VenueLocationMap({ latitude, longitude, color, title }: Props) {
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={15}
            minZoom={5}
            maxZoom={18}
            zoomControl={false}
            scrollWheelZoom={true}
            dragging={true}
            style={{ height: "100%", width: "100%" }}
            className="rounded-2xl"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomright" />
            <Marker
                position={[latitude, longitude]}
                icon={createMarkerIcon(color)}
            />
        </MapContainer>
    );
}
