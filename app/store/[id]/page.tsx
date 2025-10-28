import { notFound } from 'next/navigation';
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, Download, ShoppingCart, Check, Shield, RefreshCw } from "lucide-react";
import { getSupabaseProductById } from '@/lib/supabase-storage';
import { Product } from '@/lib/types';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  console.log("Product ID from params:", id); // Novo log para depuração do ID
  const product = await getSupabaseProductById(id);

  console.log("Fetched Product:", product); // Novo log para depuração

  if (!product) {
    notFound();
  }

  console.log("Product Image URL:", product.image_url); // Adicionado para depuração

  // Map snake_case to camelCase for consistency with Product type
  const formattedProduct: Product = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.image_url,
    features: product.features,
    version: product.version,
    downloads: product.downloads,
    rating: product.rating,
    isNew: product.is_new,
    isFeatured: product.is_featured,
    tags: product.tags,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border/50 bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {product.isNew && (
                    <Badge className="bg-primary text-primary-foreground shadow-lg shadow-primary/50">Novo</Badge>
                  )}
                  {product.isFeatured && (
                    <Badge variant="secondary" className="shadow-lg">
                      Destaque
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                <p className="text-lg text-muted-foreground">{product.description}</p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground">(128 avaliações)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-muted-foreground" />
                  <span>{product.downloads} downloads</span>
                </div>
                <Badge variant="outline">v{product.version}</Badge>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Recursos inclusos:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
                  <span className="text-muted-foreground">pagamento único</span>
                </div>

                <Link href={`/checkout/${product.id}`}>
                  <Button size="lg" className="w-full gap-2 text-lg h-14">
                    <ShoppingCart className="h-5 w-5" />
                    Comprar agora
                  </Button>
                </Link>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <Card className="border-border/50 bg-card/50">
                    <CardContent className="p-4 text-center">
                      <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-xs text-muted-foreground">Compra Segura</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50 bg-card/50">
                    <CardContent className="p-4 text-center">
                      <RefreshCw className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-xs text-muted-foreground">Atualizações Grátis</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50 bg-card/50">
                    <CardContent className="p-4 text-center">
                      <Download className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-xs text-muted-foreground">Download Imediato</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
