import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-server";

export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("category")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
