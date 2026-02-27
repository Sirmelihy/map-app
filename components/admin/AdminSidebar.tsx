"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FolderPlus, MapPinPlus, LayoutDashboard } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

const menuItems = [
    {
        title: "Kategori Ekle",
        url: "/admin/kategori-ekle",
        icon: FolderPlus,
    },
    {
        title: "Mekan Ekle",
        url: "/admin/mekan-ekle",
        icon: MapPinPlus,
    },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
                <h2 className="text-lg font-semibold tracking-tight text-sidebar-foreground">
                    Admin Panel
                </h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Yönetim</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
