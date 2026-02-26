"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { ImageIcon, XIcon } from "lucide-react"
import { useCategories } from "@/hooks/useCategories"
import { useCreateVenue, useUpdateVenue, type Venue, type VenueInput } from "@/hooks/useVenues"
import { getVenueImageUrl } from "@/lib/venue-utils"

const MapPicker = dynamic(
    () => import("@/components/admin/MapPicker").then(m => ({ default: m.MapPicker })),
    { ssr: false, loading: () => <div className="h-[280px] w-full rounded-md border border-border bg-muted animate-pulse" /> }
)

interface VenueFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    venue?: Venue | null
}

export function VenueForm({ open, onOpenChange, venue }: VenueFormProps) {
    const isEditing = !!venue

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [latitude, setLatitude] = useState<number | null>(null)
    const [longitude, setLongitude] = useState<number | null>(null)
    const [categoryId, setCategoryId] = useState<string>("")
    const [hidden, setHidden] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [imageRemoved, setImageRemoved] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { data: categories } = useCategories()
    const createMutation = useCreateVenue()
    const updateMutation = useUpdateVenue()
    const isPending = createMutation.isPending || updateMutation.isPending

    useEffect(() => {
        if (venue) {
            setTitle(venue.title)
            setDescription(venue.description || "")
            setLatitude(venue.latitude)
            setLongitude(venue.longitude)
            setCategoryId(venue.category_id || "")
            setHidden(venue.hidden)
            setImageFile(null)
            setImagePreview(venue.image_path ? getVenueImageUrl(venue.image_path) : null)
            setImageRemoved(false)
        } else {
            setTitle("")
            setDescription("")
            setLatitude(null)
            setLongitude(null)
            setCategoryId("")
            setHidden(false)
            setImageFile(null)
            setImagePreview(null)
            setImageRemoved(false)
        }
    }, [venue, open])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
            setImageRemoved(false)
        }
    }

    const handleRemoveImage = () => {
        setImageFile(null)
        setImagePreview(null)
        setImageRemoved(true)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleMapClick = (lat: number, lng: number) => {
        setLatitude(lat)
        setLongitude(lng)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!latitude || !longitude) return

        const input: VenueInput = {
            title,
            description: description || null,
            latitude,
            longitude,
            category_id: categoryId || null,
            hidden,
            image: imageFile,
            existing_image_path: venue?.image_path || null,
            remove_image: imageRemoved,
        }

        try {
            if (isEditing && venue) {
                await updateMutation.mutateAsync({ id: venue.id, ...input })
            } else {
                await createMutation.mutateAsync(input)
            }
            onOpenChange(false)
        } catch {
            // Error handled by mutation state
        }
    }

    const canSubmit = title && latitude !== null && longitude !== null && !isPending

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    <SheetHeader>
                        <SheetTitle>
                            {isEditing ? "Mekan Düzenle" : "Yeni Mekan Ekle"}
                        </SheetTitle>
                        <SheetDescription>
                            {isEditing
                                ? "Mekan bilgilerini güncelleyin."
                                : "Yeni bir mekan oluşturun. Haritaya tıklayarak konum seçin."}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 space-y-5 px-4 pb-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="venue-title">Başlık *</Label>
                            <Input
                                id="venue-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Mekan adı"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="venue-desc">Açıklama</Label>
                            <Textarea
                                id="venue-desc"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Mekan hakkında kısa açıklama"
                                rows={3}
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label>Kategori</Label>
                            <Select value={categoryId} onValueChange={setCategoryId}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Kategori seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories?.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            <span className="flex items-center gap-2">
                                                <span
                                                    className="inline-block h-3 w-3 rounded-full"
                                                    style={{ backgroundColor: cat.hex_color }}
                                                />
                                                {cat.name}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Map Picker */}
                        <div className="space-y-2">
                            <Label>Konum *</Label>
                            <MapPicker
                                latitude={latitude}
                                longitude={longitude}
                                onChange={handleMapClick}
                            />
                            {latitude !== null && longitude !== null && (
                                <div className="flex gap-3 mt-2">
                                    <div className="flex-1">
                                        <Label className="text-xs text-muted-foreground">Enlem</Label>
                                        <Input value={latitude.toFixed(6)} readOnly className="text-xs font-mono" />
                                    </div>
                                    <div className="flex-1">
                                        <Label className="text-xs text-muted-foreground">Boylam</Label>
                                        <Input value={longitude.toFixed(6)} readOnly className="text-xs font-mono" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label>Görüntü</Label>
                            {imagePreview ? (
                                <div className="relative rounded-md overflow-hidden border border-border">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-40 object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80 transition-colors"
                                    >
                                        <XIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border p-6 cursor-pointer hover:bg-accent/50 transition-colors"
                                >
                                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        Görüntü yüklemek için tıklayın
                                    </p>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        {/* Hidden Toggle */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="venue-hidden"
                                checked={hidden}
                                onChange={(e) => setHidden(e.target.checked)}
                                className="h-4 w-4 rounded border-border"
                            />
                            <Label htmlFor="venue-hidden" className="cursor-pointer">
                                Gizli (Haritada gösterilmesin)
                            </Label>
                        </div>
                    </div>

                    <SheetFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isPending}
                        >
                            İptal
                        </Button>
                        <Button type="submit" disabled={!canSubmit}>
                            {isPending
                                ? "Kaydediliyor..."
                                : isEditing
                                    ? "Güncelle"
                                    : "Ekle"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
