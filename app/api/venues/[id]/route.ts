import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-server";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || null;
    const latitude = parseFloat(formData.get("latitude") as string);
    const longitude = parseFloat(formData.get("longitude") as string);
    const category_id = (formData.get("category_id") as string) || null;
    const hidden = formData.get("hidden") === "true";
    const imageFile = formData.get("image") as File | null;
    const existingImagePath = (formData.get("existing_image_path") as string) || null;
    const removeImage = formData.get("remove_image") === "true";

    if (!title || isNaN(latitude) || isNaN(longitude)) {
        return NextResponse.json(
            { error: "title, latitude, and longitude are required" },
            { status: 400 }
        );
    }

    let image_path: string | null = existingImagePath;

    // If user explicitly removed the image (without uploading a new one)
    if (removeImage && !imageFile) {
        if (existingImagePath) {
            await supabase.storage
                .from("mekan_resimleri")
                .remove([existingImagePath]);
        }
        image_path = null;
    }

    // If a new image is uploaded, replace the old one
    if (imageFile && imageFile.size > 0) {
        // Delete old image if exists
        if (existingImagePath) {
            await supabase.storage
                .from("mekan_resimleri")
                .remove([existingImagePath]);
        }

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
        .update({ title, description, latitude, longitude, category_id, hidden, image_path })
        .eq("id", id)
        .select(`*, category (*)`)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // First get the venue to find image_path
    const { data: venue } = await supabase
        .from("venues")
        .select("image_path")
        .eq("id", id)
        .single();

    // Delete image from storage if exists
    if (venue?.image_path) {
        await supabase.storage
            .from("mekan_resimleri")
            .remove([venue.image_path]);
    }

    const { error } = await supabase
        .from("venues")
        .delete()
        .eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
