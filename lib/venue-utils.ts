// Supabase storage helpers (no Leaflet dependency)

const STORAGE_BUCKET = "mekan_resimleri";
export const FALLBACK_IMAGE = "/no-image.jpg";

export function getVenueImageUrl(imagePath: string | null): string {
    if (!imagePath) return FALLBACK_IMAGE;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${imagePath}`;
}
