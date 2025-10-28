"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload, Loader2 } from "lucide-react"
import type { Product } from "@/lib/types"
import { sendProductPostNotification } from "@/lib/discord-webhook"

interface ProductFormProps {
  product?: Product
  onSave: (product: Partial<Product>) => void
  onCancel: () => void
}

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : "R$ 0,00",
    category: product?.category || "script",
    image: product?.image || "",
    version: product?.version || "1.0.0",
    features: product?.features || [],
    tags: product?.tags || [],
    isNew: product?.isNew || false,
    isFeatured: product?.isFeatured || false,
  })
  const [newTag, setNewTag] = useState("")
  const [newFeature, setNewFeature] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatCurrency = (value: string) => {
    // Remove tudo que não é número, mantendo apenas dígitos
    const onlyDigits = value.replace(/\D/g, '')
    
    // Se não há dígitos, retorna R$ 0,00
    if (!onlyDigits) return "R$ 0,00"
    
    // Converte para número e divide por 100 para obter os centavos
    const number = parseInt(onlyDigits, 10) / 100
    
    // Formata para o padrão brasileiro
    return `R$ ${number.toFixed(2).replace('.', ',')}`
  }

  const parseCurrency = (value: string) => {
    // Remove "R$" e espaços, depois substitui vírgula por ponto
    const numericValue = value.replace('R$', '').trim().replace(',', '.')
    return parseFloat(numericValue) || 0
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCurrency(e.target.value)
    setFormData({ ...formData, price: formattedValue })
  }

  const handlePriceFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Quando o campo recebe foco, remove o "R$" para facilitar a digitação
    if (formData.price === "R$ 0,00") {
      setFormData({ ...formData, price: "" })
    }
  }

  const handlePriceBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Quando o campo perde foco, formata o valor
    if (!formData.price || formData.price === "R$ 0,00") {
      setFormData({ ...formData, price: "R$ 0,00" })
    } else {
      const formattedValue = formatCurrency(formData.price)
      setFormData({ ...formData, price: formattedValue })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
  
    try {
      const priceToSend = parseCurrency(formData.price)
      const method = product ? "PUT" : "POST"
      const url = product ? `/api/products/${product.id}` : "/api/products"
  
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id: product?.id, // Include ID for update operations
          price: priceToSend,
          imageUrl: formData.image,
        }),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      // Send Discord notification only for new products
      if (!product) {
        await sendProductPostNotification({
          name: formData.name,
          price: formData.price,
          category: formData.category,
          tags: formData.tags,
        })
      }
  
      onSave(formData)
    } catch (error) {
      console.error("[v0] Error saving product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() !== "" && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] })
      setNewTag("")
    }
  }

  const removeTag = (index: number) => {
    const updatedTags = formData.tags.filter((_, i) => i !== index)
    setFormData({ ...formData, tags: updatedTags })
  }

  const addFeature = () => {
    if (newFeature.trim() !== "" && !formData.features.includes(newFeature.trim())) {
      setFormData({ ...formData, features: [...formData.features, newFeature.trim()] })
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({ ...formData, features: updatedFeatures })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>{product ? "Editar Produto" : "Novo Produto"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="version">Versão</Label>
              <Input
                id="version"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="text"
                value={formData.price}
                onChange={handlePriceChange}
                onFocus={handlePriceFocus}
                onBlur={handlePriceBlur}
                placeholder="R$ 0,00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value: any) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="script">Script</SelectItem>
                  <SelectItem value="asset">Asset</SelectItem>
                  <SelectItem value="mlo">MLO</SelectItem>
                  <SelectItem value="vehicle">Veículo</SelectItem>
                  <SelectItem value="weapon">Arma</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label htmlFor="image">URL da Imagem</Label>
            <div className="flex gap-2">
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            {formData.image && (
              <div className="mt-2 rounded-lg overflow-hidden border border-border/50 w-32 h-32">
                <img src={formData.image || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Adicionar tag..."
              />
              <Button type="button" onClick={addTag} variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {tag}
                  <button type="button" onClick={() => removeTag(index)} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label>Recursos</Label>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                placeholder="Adicionar recurso..."
              />
              <Button type="button" onClick={addFeature} variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg bg-background/50 border border-border/50"
                >
                  <span className="flex-1 text-sm">{feature}</span>
                  <Button
                    type="button"
                    onClick={() => removeFeature(index)}
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Flags */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                className="rounded border-border"
              />
              <span className="text-sm">Marcar como Novo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded border-border"
              />
              <span className="text-sm">Marcar como Destaque</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4 border-t border-border/50">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Produto"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
