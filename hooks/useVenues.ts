import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Category {
    id: string;
    hex_color: string;
    name: string;
}

export interface Venue {
    id: string;
    title: string;
    description: string | null;
    latitude: number;
    longitude: number;
    hidden: boolean;
    category_id: string | null;
    category: Category | null;
    image_path: string | null;
    created_at: string;
}

export interface VenueInput {
    title: string;
    description: string | null;
    latitude: number;
    longitude: number;
    category_id: string | null;
    hidden: boolean;
    image?: File | null;
    existing_image_path?: string | null;
    remove_image?: boolean;
}

function buildFormData(input: VenueInput): FormData {
    const fd = new FormData();
    fd.append("title", input.title);
    if (input.description) fd.append("description", input.description);
    fd.append("latitude", String(input.latitude));
    fd.append("longitude", String(input.longitude));
    if (input.category_id) fd.append("category_id", input.category_id);
    fd.append("hidden", String(input.hidden));
    if (input.image) fd.append("image", input.image);
    if (input.existing_image_path) fd.append("existing_image_path", input.existing_image_path);
    if (input.remove_image) fd.append("remove_image", "true");
    return fd;
}

export function useVenues() {
    return useQuery<Venue[]>({
        queryKey: ["venues"],
        queryFn: async () => {
            const res = await fetch("/api/venues");
            if (!res.ok) throw new Error("Mekanlar yüklenirken hata oluştu");
            return res.json();
        },
    });
}

export function useCreateVenue() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (input: VenueInput) => {
            const res = await fetch("/api/venues", {
                method: "POST",
                body: buildFormData(input),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Mekan oluşturulamadı");
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["venues"] });
        },
    });
}

export function useUpdateVenue() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...input }: VenueInput & { id: string }) => {
            const res = await fetch(`/api/venues/${id}`, {
                method: "PUT",
                body: buildFormData(input),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Mekan güncellenemedi");
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["venues"] });
        },
    });
}

export function useDeleteVenue() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/venues/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Mekan silinemedi");
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["venues"] });
        },
    });
}