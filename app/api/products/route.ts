import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error("API Products POST: User not authenticated.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("API Products POST: Request body received:", body);

    const { name, description, price, category, imageUrl, version, features, tags, isNew, isFeatured } = body;

    const { data, error } = await supabase.from("products").insert({
      name,
      description,
      price,
      category,
      image_url: imageUrl, // Ensure this matches your DB schema
      version,
      features,
      tags,
      is_new: isNew,
      is_featured: isFeatured,
    }).select();

    if (error) {
      console.error("API Products POST: Error inserting product:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("API Products POST: Product inserted successfully:", data);
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("API Products POST: Unexpected error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error("API Products GET: User not authenticated.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("API Products GET: Error fetching products:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Convert snake_case to camelCase for consistency with frontend
    const products = data.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image_url, // Map image_url from DB to image for frontend
      version: product.version,
      features: product.features,
      tags: product.tags,
      isNew: product.is_new,
      isFeatured: product.is_featured,
      createdAt: product.created_at,
    }));

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("API Products GET: Unexpected error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
