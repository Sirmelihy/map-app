"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ColorPicker } from "@/components/admin/ColorPicker"
import { useCreateCategory, useUpdateCategory, type Category, type CategoryInput } from "@/hooks/useCategories"

interface CategoryFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    category?: Category | null
}

export function CategoryForm({ open, onOpenChange, category }: CategoryFormProps) {
    const [name, setName] = useState("")
    const [hexColor, setHexColor] = useState("#000000")

    const isEditing = !!category

    const createMutation = useCreateCategory()
    const updateMutation = useUpdateCategory()

    const isPending = createMutation.isPending || updateMutation.isPending

    useEffect(() => {
        if (category) {
            setName(category.name)
            setHexColor(category.hex_color)
        } else {
            setName("")
            setHexColor("#000000")
        }
    }, [category, open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const input: CategoryInput = { name, hex_color: hexColor }

        try {
            if (isEditing && category) {
                await updateMutation.mutateAsync({ id: category.id, ...input })
            } else {
                await createMutation.mutateAsync(input)
            }
            onOpenChange(false)
        } catch {
            // Error is handled by mutation state
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEditing ? "Kategori Düzenle" : "Yeni Kategori Ekle"}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditing
                                ? "Kategori bilgilerini güncelleyin."
                                : "Yeni bir kategori oluşturun."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="category-name">Kategori Adı</Label>
                            <Input
                                id="category-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Kategori adı giriniz"
                                required
                            />
                        </div>

                        <ColorPicker
                            id="category-color"
                            value={hexColor}
                            onChange={setHexColor}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isPending}
                        >
                            İptal
                        </Button>
                        <Button type="submit" disabled={isPending || !name || !hexColor}>
                            {isPending
                                ? "Kaydediliyor..."
                                : isEditing
                                    ? "Güncelle"
                                    : "Ekle"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
