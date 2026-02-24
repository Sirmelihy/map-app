import QueryProvider from "@/providers/QueryProvider";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    )
}