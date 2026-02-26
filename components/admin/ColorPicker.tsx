"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ColorPickerProps {
    value: string
    onChange: (value: string) => void
    id?: string
}

export function ColorPicker({ value, onChange, id }: ColorPickerProps) {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = e.target.value
        if (!v.startsWith("#")) {
            v = "#" + v
        }
        // Allow partial typing — only update if valid hex partial
        if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) {
            onChange(v)
        }
    }

    return (
        <div className="space-y-2">
            {id && <Label htmlFor={id}>Renk</Label>}
            <div className="flex items-center gap-3">
                <div className="relative">
                    <input
                        type="color"
                        value={value || "#000000"}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                        className="w-10 h-10 rounded-md border border-border shadow-sm cursor-pointer transition-transform hover:scale-105"
                        style={{ backgroundColor: value || "#000000" }}
                    />
                </div>
                <Input
                    value={value}
                    onChange={handleTextChange}
                    placeholder="#FF5733"
                    className="font-mono uppercase w-28"
                    maxLength={7}
                />
            </div>
        </div>
    )
}
