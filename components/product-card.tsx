import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Download, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-primary/50 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <Link href={`/store/${product.id}`}>
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 flex gap-2">
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
      </Link>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <Link href={`/store/${product.id}`}>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{product.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>{product.downloads}</span>
          </div>
          <Badge variant="outline" className="ml-auto">
            v{product.version}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
        </div>
        <Button size="sm" className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          Comprar
        </Button>
      </CardFooter>
    </Card>
  )
}
