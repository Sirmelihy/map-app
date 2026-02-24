import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BUCKET_NAME = "mekan_resimleri";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json(
            { error: "id parameter is required" },
            { status: 400 }
        );
    }

    // List files in the bucket that match the venue ID prefix
    const { data: files, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list("", {
            search: id,
        });

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    // Find a file that starts with the venue ID (e.g., {id}.jpg, {id}.png, etc.)
    const matchedFile = files?.find((file) =>
        file.name.startsWith(id)
    );

    if (!matchedFile) {
        return NextResponse.json({ imageUrl: null });
    }

    // Get the public URL for the matched file
    const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(matchedFile.name);

    return NextResponse.json({ imageUrl: urlData.publicUrl });
}
