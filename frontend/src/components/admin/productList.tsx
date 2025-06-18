import { useState } from "react"
import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Trash, Pencil, Tag, Filter } from "lucide-react"

interface Category {
  _id: string
  name: string
  description?: string
}

interface Product {
  _id: string
  name: string
  price: number
  stock: number
  categoryId?: string
  imageUrl?: string
  description?: string
  colors: string[]
  sizes: string[]
}

interface ProductListProps {
  products: Product[]
  categories: Category[]
  onEdit?: (product: Product) => void
  onDelete: (id: string) => void
}

export default function ProductList({ products, categories, onEdit, onDelete }: ProductListProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all")

  const categoryMap = new Map(categories.map((cat) => [cat._id, cat.name]))

  // Filtrar produtos por categoria selecionada
  const filteredProducts =
    selectedCategoryId === "all" ? products : products.filter((product) => product.categoryId === selectedCategoryId)

  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground mb-2">No products found</p>
          <p className="text-sm text-gray-500">Try creating a new product</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Products ({filteredProducts.length})</h2>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-muted-foreground" />
            <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhum produto encontrado para esta categoria</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <div key={product._id} className="border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      {product.categoryId && categoryMap.get(product.categoryId) && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Tag size={12} />
                          {categoryMap.get(product.categoryId)}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">Preço:</span> {product.price} MZN
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Stock:</span> {product.stock}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Categoria:</span>{" "}
                        {categoryMap.get(product.categoryId || "") || "Sem categoria"}
                      </p>
                    </div>

                    {product.description && (
                      <p className="text-sm text-muted-foreground italic bg-muted/30 p-2 rounded">
                        {product.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3">
                      {product.colors.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground">Cores:</span>
                          <div className="flex gap-1">
                            {product.colors.map((color, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {color}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {product.sizes.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground">Tamanhos:</span>
                          <div className="flex gap-1">
                            {product.sizes.map((size, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {size}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {onEdit && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(product)}
                        title="Editar produto"
                        className="h-8 w-8 p-0"
                      >
                        <Pencil size={14} />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(product._id)}
                      title="Eliminar produto"
                      className="h-8 w-8 p-0"
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
