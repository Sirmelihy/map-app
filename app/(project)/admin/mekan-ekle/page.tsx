"use client"

import { useState } from "react"
import { PlusIcon, PencilIcon, TrashIcon, Loader2Icon, EyeOffIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { VenueForm } from "@/components/admin/VenueForm"
import { useVenues, useDeleteVenue, type Venue } from "@/hooks/useVenues"
import { getVenueImageUrl, FALLBACK_IMAGE } from "@/lib/venue-utils"

export default function MekanEklePage() {
    const { data: venues, isLoading, isError, error } = useVenues()
    const deleteMutation = useDeleteVenue()

    const [formOpen, setFormOpen] = useState(false)
    const [editingVenue, setEditingVenue] = useState<Venue | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<Venue | null>(null)

    const handleAdd = () => {
        setEditingVenue(null)
        setFormOpen(true)
    }

    const handleEdit = (venue: Venue) => {
        setEditingVenue(venue)
        setFormOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return
        try {
            await deleteMutation.mutateAsync(deleteTarget.id)
            setDeleteTarget(null)
        } catch {
            // Error handled by mutation state
        }
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Mekanlar</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Haritadaki mekanları yönetin.
                    </p>
                </div>
                <Button onClick={handleAdd}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Yeni Mekan
                </Button>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">Görsel</TableHead>
                                <TableHead>Başlık</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Koordinat</TableHead>
                                <TableHead>Tarih</TableHead>
                                <TableHead className="w-24 text-right">İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-10 w-10 rounded" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Error */}
            {isError && (
                <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                    {error?.message || "Mekanlar yüklenirken bir hata oluştu."}
                </div>
            )}

            {/* Empty */}
            {!isLoading && !isError && venues?.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-12 text-center">
                    <p className="text-muted-foreground">Henüz mekan eklenmemiş.</p>
                    <Button variant="outline" className="mt-4" onClick={handleAdd}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        İlk Mekanı Ekle
                    </Button>
                </div>
            )}

            {/* Data Table */}
            {!isLoading && !isError && venues && venues.length > 0 && (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">Görsel</TableHead>
                                <TableHead>Başlık</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Koordinat</TableHead>
                                <TableHead>Tarih</TableHead>
                                <TableHead className="w-24 text-right">İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {venues.map((venue) => (
                                <TableRow key={venue.id} className={venue.hidden ? "opacity-50" : ""}>
                                    <TableCell>
                                        <img
                                            src={venue.image_path ? getVenueImageUrl(venue.image_path) : FALLBACK_IMAGE}
                                            alt={venue.title}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{venue.title}</span>
                                            {venue.hidden && (
                                                <span title="Gizli"><EyeOffIcon className="h-3.5 w-3.5 text-muted-foreground" /></span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {venue.category ? (
                                            <Badge
                                                variant="outline"
                                                className="gap-1.5"
                                            >
                                                <span
                                                    className="inline-block h-2.5 w-2.5 rounded-full"
                                                    style={{ backgroundColor: venue.category.hex_color }}
                                                />
                                                {venue.category.name}
                                            </Badge>
                                        ) : (
                                            <span className="text-muted-foreground text-sm">—</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground font-mono">
                                        {Number(venue.latitude).toFixed(4)}, {Number(venue.longitude).toFixed(4)}
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {formatDate(venue.created_at)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(venue)}
                                                title="Düzenle"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setDeleteTarget(venue)}
                                                title="Sil"
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Add/Edit Sheet */}
            <VenueForm
                open={formOpen}
                onOpenChange={setFormOpen}
                venue={editingVenue}
            />

            {/* Delete Confirmation */}
            <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Mekanı Sil</DialogTitle>
                        <DialogDescription>
                            <strong>{deleteTarget?.title}</strong> mekanını silmek istediğinize
                            emin misiniz? Bu işlem geri alınamaz.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteTarget(null)}
                            disabled={deleteMutation.isPending}
                        >
                            İptal
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending && (
                                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sil
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
