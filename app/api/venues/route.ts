import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-server";

export async function GET() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
        .from("venues")
        .select(`*, category (*)`)
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || null;
    const latitude = parseFloat(formData.get("latitude") as string);
    const longitude = parseFloat(formData.get("longitude") as string);
    const category_id = (formData.get("category_id") as string) || null;
    const hidden = formData.get("hidden") === "true";
    const imageFile = formData.get("image") as File | null;

    if (!title || isNaN(latitude) || isNaN(longitude)) {
        return NextResponse.json(
            { error: "title, latitude, and longitude are required" },
            { status: 400 }
        );
    }

    let image_path: string | null = null;

    if (imageFile && imageFile.size > 0) {
        const ext = imageFile.name.split(".").pop() || "jpg";
        const fileName = `${crypto.randomUUID()}.${ext}`;
        const buffer = Buffer.from(await imageFile.arrayBuffer());

        const { error: uploadError } = await supabase.storage
            .from("mekan_resimleri")
            .upload(fileName, buffer, {
                contentType: imageFile.type,
                upsert: false,
            });

        if (uploadError) {
            return NextResponse.json(
                { error: `Image upload failed: ${uploadError.message}` },
                { status: 500 }
            );
        }

        image_path = fileName;
    }

    const { data, error } = await supabase
        .from("venues")
        .insert({ title, description, latitude, longitude, category_id, hidden, image_path })
        .select(`*, category (*)`)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}