import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select"
import { Label } from "../ui/label"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface Category {
  _id: string
  name: string
}

interface ProductModalProps {
  categories: Category[]
  onSubmit: (product: {
    name: string
    price: number
    categoryId: string
    imageUrl: string
    description: string
    colors: string[]
    sizes: string[]
    stock: number
  }) => Promise<void>
  isOpen: boolean
  onClose: () => void
  productToEdit?: {
    name: string
    price: number
    categoryId: string
    imageUrl: string
    description: string
    colors: string[]
    sizes: string[]
    stock: number
  } | null
}

// Schema de validação com Zod
const productSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  price: z.number().positive("Preço deve ser maior que zero"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  imageUrl: z.string().url("URL inválida"),
  description: z.string().min(5, "Descrição muito curta"),
  colors: z.string(),
  sizes: z.string(),
  stock: z.number().min(0, "Estoque não pode ser negativo"),
})

type ProductFormValues = z.infer<typeof productSchema>

export const ProductModal = ({
  categories,
  onSubmit,
  isOpen,
  onClose,
  productToEdit,
}: ProductModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      categoryId: "",
      imageUrl: "",
      description: "",
      colors: "",
      sizes: "",
      stock: 0,
    },
  })

 
  useEffect(() => {
    if (productToEdit) {
      reset({
        ...productToEdit,
        colors: productToEdit.colors.join(", "),
        sizes: productToEdit.sizes.join(", "),
      })
    } else {
      reset()
    }
  }, [productToEdit, isOpen, reset])

  const onFormSubmit = async (data: ProductFormValues) => {
    await onSubmit({
      ...data,
      colors: data.colors.split(",").map((c) => c.trim()).filter(Boolean),
      sizes: data.sizes.split(",").map((s) => s.trim()).filter(Boolean),
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle>{productToEdit ? "Edit Product" : "New Product"}</DialogTitle>
        <DialogDescription>Fill all fields.</DialogDescription>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-3">
          <div>
            <Label>Name</Label>
            <Input {...register("name")} placeholder="Dress" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <Label>Price</Label>
            <Input type="number" {...register("price", { valueAsNumber: true })} placeholder="100" />
            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
          </div>

          <div>
            <Label>Category</Label>
            <Select
              onValueChange={(val) => setValue("categoryId", val)}
              value={undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId.message}</p>}
          </div>

          <div>
            <Label>Image URL</Label>
            <Input {...register("imageUrl")} placeholder="https://example.com/image.png" />
            {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl.message}</p>}
          </div>

          <div>
            <Label>Description</Label>
            <Input {...register("description")} placeholder="Description of the item" />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div>
            <Label>Colors</Label>
            <Input {...register("colors")} placeholder="red, blue, green" />
            {errors.colors && <p className="text-sm text-red-500">{errors.colors.message}</p>}
          </div>

          <div>
            <Label>Sizes</Label>
            <Input {...register("sizes")} placeholder="S, M, L, XL" />
            {errors.sizes && <p className="text-sm text-red-500">{errors.sizes.message}</p>}
          </div>

          <div>
            <Label>Stock</Label>
            <Input type="number" {...register("stock", { valueAsNumber: true })} placeholder="50" />
            {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
