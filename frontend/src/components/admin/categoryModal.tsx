import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useEffect } from "react"
import { Label } from "../ui/label"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface CategoryModalProps {
  onSubmit: (category: { name: string; description?: string }) => Promise<void>
  isOpen: boolean
  onClose: () => void
  category: { name?: string; description?: string } | null
}

const categorySchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  description: z.string().max(255, "Descrição muito longa").optional(),
})

type CategoryFormValues = z.infer<typeof categorySchema>

export const CategoryModal = ({
  onSubmit,
  isOpen,
  onClose,
  category,
}: CategoryModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  useEffect(() => {
    if (category) {
      reset({
        name: category.name || "",
        description: category.description || "",
      })
    } else {
      reset({
        name: "",
        description: "",
      })
    }
  }, [category, isOpen, reset])

  const onFormSubmit = async (data: CategoryFormValues) => {
    await onSubmit(data)
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle>
          {category?.name ? "Edit Category" : "New Category"}
        </DialogTitle>
        <DialogDescription>
          {category?.name
            ? "Update the category details."
            : "Create a new category by filling out the fields below."}
        </DialogDescription>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-3">
          <div>
            <Label>Name</Label>
            <Input placeholder="Name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label>Description (optional)</Label>
            <Input placeholder="Description" {...register("description")} />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
