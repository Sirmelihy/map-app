"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const TURKEY_CENTER: L.LatLngExpression = [39.0, 35.2]

interface MapPickerProps {
    latitude: number | null
    longitude: number | null
    onChange: (lat: number, lng: number) => void
}

export function MapPicker({ latitude, longitude, onChange }: MapPickerProps) {
    const mapRef = useRef<L.Map | null>(null)
    const markerRef = useRef<L.Marker | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return

        const map = L.map(containerRef.current, {
            center: latitude && longitude ? [latitude, longitude] : TURKEY_CENTER,
            zoom: latitude && longitude ? 13 : 6,
            minZoom: 5,
            maxZoom: 18,
            zoomControl: true,
        })

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map)

        // Place initial marker if coordinates exist
        if (latitude && longitude) {
            markerRef.current = L.marker([latitude, longitude], {
                icon: createPickerIcon(),
            }).addTo(map)
        }

        map.on("click", (e: L.LeafletMouseEvent) => {
            const { lat, lng } = e.latlng

            if (markerRef.current) {
                markerRef.current.setLatLng([lat, lng])
            } else {
                markerRef.current = L.marker([lat, lng], {
                    icon: createPickerIcon(),
                }).addTo(map)
            }

            onChange(lat, lng)
        })

        mapRef.current = map

        return () => {
            map.remove()
            mapRef.current = null
            markerRef.current = null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Update marker when coordinates change externally
    useEffect(() => {
        if (!mapRef.current) return
        if (latitude && longitude && markerRef.current) {
            markerRef.current.setLatLng([latitude, longitude])
        }
    }, [latitude, longitude])

    return (
        <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
                Haritaya tıklayarak konum seçin
            </p>
            <div
                ref={containerRef}
                className="h-[280px] w-full rounded-md border border-border overflow-hidden"
            />
        </div>
    )
}

function createPickerIcon(): L.DivIcon {
    return L.divIcon({
        className: "custom-marker",
        html: `
            <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 0C6.268 0 0 6.268 0 14c0 9.942 12.12 24.41 12.64 25.015a1.776 1.776 0 0 0 2.72 0C15.88 38.41 28 23.942 28 14 28 6.268 21.732 0 14 0z" fill="#EF4444"/>
                <circle cx="14" cy="14" r="5.5" fill="white" opacity="0.95"/>
            </svg>
        `,
        iconSize: [28, 40],
        iconAnchor: [14, 40],
    })
}
