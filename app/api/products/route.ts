// app/api/products/route.ts (ou .js)
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getSupabaseClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              (cookieStore as any).set?.(name, value, options)
            );
          } catch {
            // Ignora erro ao rodar em ambiente Server Component
          }
        },
      },
    }
  );
}

// ✅ CREATE
export async function POST(request: Request) {
  try {
    const {
      name,
      description,
      price,
      category,
      imageUrl,
      image,
      version,
      features,
      tags,
      isNew,
      isFeatured,
    } = await request.json();

    const supabase = getSupabaseClient();

    const image_url = imageUrl ?? image ?? null;

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          description,
          price,
          category,
          image_url,
          version,
          features,
          tags,
          is_new: isNew,
          is_featured: isFeatured,
        },
      ])
      .select();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected error creating product" },
      { status: 500 }
    );
  }
}

// ✅ READ ALL
export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data: products, error } = await supabase
      .from("products")
      .select("*");

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    const mapped = (products || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      image: p.image_url || "",
      features: p.features || [],
      version: p.version || "",
      downloads: p.downloads ?? 0,
      rating: p.rating ?? 0,
      isNew: p.is_new ?? false,
      isFeatured: p.is_featured ?? false,
      tags: p.tags || [],
    }));

    return NextResponse.json(mapped, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected error fetching products" },
      { status: 500 }
    );
  }
}

// ✅ DELETE (corrige o erro 405)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected error deleting product" },
      { status: 500 }
    );
  }
}
