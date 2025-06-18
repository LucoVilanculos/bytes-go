"use client"

import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Trash, Pencil, FolderOpen, FileText } from "lucide-react"

interface Category {
  _id: string
  name: string
  description?: string
}

interface CategoryListProps {
  categories: Category[]
  onEdit?: (category: Category) => void
  onDelete: (id: string) => void
}

export default function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <FolderOpen size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2 text-lg">Nenhuma categoria encontrada</p>
          <p className="text-sm text-gray-500">Comece criando uma nova categoria</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Categorias ({categories.length})</h2>
          <Badge variant="secondary" className="flex items-center gap-1">
            <FolderOpen size={12} />
            {categories.length} {categories.length === 1 ? "categoria" : "categorias"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid gap-3">
          {categories.map((category) => (
            <div
              key={category._id}
              className="border rounded-lg p-4 bg-card hover:bg-muted/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <FolderOpen size={18} className="text-primary" />
                    <h3 className="font-semibold text-lg text-foreground">{category.name}</h3>
                  </div>

                  <div className="flex items-start gap-2">
                    <FileText size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.description || <span className="italic text-muted-foreground/70">Sem descrição</span>}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {onEdit && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(category)}
                      title="Editar categoria"
                      className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-200"
                    >
                      <Pencil size={14} />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(category._id)}
                    title="Eliminar categoria"
                    className="h-8 w-8 p-0"
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
