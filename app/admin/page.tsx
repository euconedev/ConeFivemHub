import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getSupabaseServerClient() {
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
            // Ignora em Server Components — sessão será atualizada via middleware
          }
        },
      },
    }
  );
}

/**
 * GET /api/products
 * Retorna a lista de produtos com nomes de campos ajustados para o frontend.
 */
export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data: products, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("[GET /products] Erro Supabase:", error.message);
      return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }

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
  } catch (err: any) {
    console.error("[GET /products] Erro inesperado:", err);
    return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

/**
 * POST /api/products
 * Cria um novo produto no banco de dados.
 */
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

    const supabase = getSupabaseServerClient();

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

    if (error) {
      console.error("[POST /products] Erro Supabase:", error.message);
      return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new NextResponse(JSON.stringify(data), { status: 201 });
  } catch (err: any) {
    console.error("[POST /products] Erro inesperado:", err);
    return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

/**
 * Métodos não permitidos (por segurança)
 */
export async function PUT() {
  return new NextResponse(JSON.stringify({ error: "Método PUT não permitido" }), { status: 405 });
}

export async function DELETE() {
  return new NextResponse(JSON.stringify({ error: "Método DELETE não permitido" }), { status: 405 });
}
