"use client"

import { useState } from "react"
import { PlusIcon, PencilIcon, TrashIcon, Loader2Icon } from "lucide-react"
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
import { Skeleton } from "@/components/ui/skeleton"
import { CategoryForm } from "@/components/admin/CategoryForm"
import { useCategories, useDeleteCategory, type Category } from "@/hooks/useCategories"

export default function KategoriEklePage() {
    const { data: categories, isLoading, isError, error } = useCategories()
    const deleteMutation = useDeleteCategory()

    const [formOpen, setFormOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)

    const handleAdd = () => {
        setEditingCategory(null)
        setFormOpen(true)
    }

    const handleEdit = (category: Category) => {
        setEditingCategory(category)
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
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Kategoriler</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Mekân kategorilerini yönetin.
                    </p>
                </div>
                <Button onClick={handleAdd}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Yeni Kategori
                </Button>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">Renk</TableHead>
                                <TableHead>Ad</TableHead>
                                <TableHead>Oluşturulma Tarihi</TableHead>
                                <TableHead className="w-24 text-right">İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-6 w-6 rounded-full" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Error State */}
            {isError && (
                <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                    {error?.message || "Kategoriler yüklenirken bir hata oluştu."}
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && categories?.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-12 text-center">
                    <p className="text-muted-foreground">Henüz kategori eklenmemiş.</p>
                    <Button variant="outline" className="mt-4" onClick={handleAdd}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        İlk Kategoriyi Ekle
                    </Button>
                </div>
            )}

            {/* Data Table */}
            {!isLoading && !isError && categories && categories.length > 0 && (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">Renk</TableHead>
                                <TableHead>Ad</TableHead>
                                <TableHead>Oluşturulma Tarihi</TableHead>
                                <TableHead className="w-24 text-right">İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((cat) => (
                                <TableRow key={cat.id}>
                                    <TableCell>
                                        <div
                                            className="h-6 w-6 rounded-full border border-border shadow-sm"
                                            style={{ backgroundColor: cat.hex_color }}
                                            title={cat.hex_color}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{cat.name}</TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {formatDate(cat.created_at)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(cat)}
                                                title="Düzenle"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setDeleteTarget(cat)}
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

            {/* Add/Edit Dialog */}
            <CategoryForm
                open={formOpen}
                onOpenChange={setFormOpen}
                category={editingCategory}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Kategoriyi Sil</DialogTitle>
                        <DialogDescription>
                            <strong>{deleteTarget?.name}</strong> kategorisini silmek istediğinize
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
