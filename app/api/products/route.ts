import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
  const cookieStore = await cookies();
  const supabase = createServerClient(
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
          } catch (e) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  // Prefer imageUrl if provided, otherwise fallback to image
  const image_url = imageUrl ?? image ?? null

  const { data, error } = await supabase
    .from('products')
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

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new NextResponse(JSON.stringify(data), { status: 201 });
}

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
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
          } catch (e) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  const { data: products, error } = await supabase.from('products').select('*');

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }

  // Map snake_case from DB to camelCase expected by frontend Product type
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

  return new NextResponse(JSON.stringify(mapped), { status: 200 });
}
