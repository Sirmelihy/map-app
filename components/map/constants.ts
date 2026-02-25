import L from "leaflet";

// --- Map Boundaries & Center ---

export const TURKEY_BOUNDS: L.LatLngBoundsExpression = [
    [33.5, 22.5],
    [45.5, 48.0],
];

export const TURKEY_CENTER: L.LatLngExpression = [39.0, 35.2];

// --- Supabase Storage ---

const STORAGE_BUCKET = "mekan_resimleri";
export const FALLBACK_IMAGE = "/no-image.jpg";

export function getVenueImageUrl(imagePath: string | null): string {
    if (!imagePath) return FALLBACK_IMAGE;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${imagePath}`;
}

// --- Custom Marker Icon ---

export function createMarkerIcon(color: string): L.DivIcon {
    const hex = color || "#EF4444";
    const id = hex.replace("#", "");

    return L.divIcon({
        className: "custom-marker",
        html: `
      <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <filter id="shadow-${id}" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#000" flood-opacity="0.3"/>
        </filter>
        <path d="M14 0C6.268 0 0 6.268 0 14c0 9.942 12.12 24.41 12.64 25.015a1.776 1.776 0 0 0 2.72 0C15.88 38.41 28 23.942 28 14 28 6.268 21.732 0 14 0z" fill="${hex}" filter="url(#shadow-${id})"/>
        <circle cx="14" cy="14" r="5.5" fill="white" opacity="0.95"/>
      </svg>
    `,
        iconSize: [28, 40],
        iconAnchor: [14, 40],
        popupAnchor: [0, -40],
    });
}
