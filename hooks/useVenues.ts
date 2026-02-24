import { useQuery } from "@tanstack/react-query";

export interface Category {
    id: string;
    hex_color: string;
    name: string;
}

export interface Venue {
    id: string;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    hidden: boolean;
    category_id: string;
    category: Category;
}

export function useVenues() {

    return useQuery({
        queryKey: ["venues"],
        queryFn: async () => {
            const res = await fetch("/api/venues")
            const data = await res.json() as Venue[]
            return data
        }
    })
}