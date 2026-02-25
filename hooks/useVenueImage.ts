import { useQuery } from "@tanstack/react-query"

export function useVenueImage(id: string) {
    return useQuery({
        queryKey: ["venue-image", id],
        queryFn: async () => {
            const res = await fetch(`/api/venues/image?id=${id}`)
            const data = await res.json()
            return data.imageUrl
        }
    })
}