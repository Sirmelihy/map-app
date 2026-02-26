import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Category {
    id: string;
    name: string;
    hex_color: string;
    created_at: string;
}

export type CategoryInput = Pick<Category, "name" | "hex_color">;

export function useCategories() {
    return useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await fetch("/api/categories");
            if (!res.ok) {
                throw new Error("Kategoriler yüklenirken hata oluştu");
            }
            return res.json();
        },
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (input: CategoryInput) => {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Kategori oluşturulamadı");
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...input }: CategoryInput & { id: string }) => {
            const res = await fetch(`/api/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Kategori güncellenemedi");
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/categories/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Kategori silinemedi");
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}
