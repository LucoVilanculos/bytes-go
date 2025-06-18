"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../components/ui/select"
import {
  ShoppingCart,
  Calendar,
  DollarSign,
  Package,
  Filter,
  Loader2,
  Save,
  Clock,
  Truck,
  CheckCircle,
} from "lucide-react"

interface Product {
  _id: string
  name: string
  price: number
  stock: number
  description?: string
  colors: string[]
  sizes: string[]
}

interface Order {
  _id: string
  user: {
    _id: string
    name: string
    email: string
    role: string
  }
  userId: string
  items: Product[]
  status: string
  total: number
  createdAt: string
}

interface OrderListProps {
  orders: Order[]
  onUpdateStatus: (id: string, status: string) => Promise<void>
}

const FILTER_ALL_VALUE = "all"
const STATUS_OPTIONS = ["pendent", "shipped", "delivered"]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pendent":
      return <Clock size={14} />
    case "shipped":
      return <Truck size={14} />
    case "delivered":
      return <CheckCircle size={14} />
    default:
      return <Package size={14} />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pendent":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "shipped":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function OrderList({ orders, onUpdateStatus }: OrderListProps) {
  const [filterStatus, setFilterStatus] = useState<string>("")
  const [editableStatuses, setEditableStatuses] = useState<Record<string, string>>({})
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set())

  const filteredOrders =
    filterStatus === FILTER_ALL_VALUE || filterStatus === ""
      ? orders
      : orders.filter((order) => order.status === filterStatus)

  const handleStatusChange = (id: string, newStatus: string) => {
    setEditableStatuses((prev) => ({ ...prev, [id]: newStatus }))
  }

  const handleSave = async (id: string) => {
    const newStatus = editableStatuses[id]
    if (!newStatus) return

    setLoadingIds((prev) => new Set(prev).add(id))
    try {
      await onUpdateStatus(id, newStatus)
      // Remove from editable statuses after successful update
      setEditableStatuses((prev) => {
        const newStatuses = { ...prev }
        delete newStatuses[id]
        return newStatuses
      })
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error)
    } finally {
      setLoadingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <ShoppingCart size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2 text-lg">Nenhum pedido encontrado</p>
          <p className="text-sm text-gray-500">Os pedidos aparecerão aqui quando forem criados</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Requests ({filteredOrders.length})</h2>
          <Badge variant="secondary" className="flex items-center gap-1">
            <ShoppingCart size={12} />
            {filteredOrders.length} {filteredOrders.length === 1 ? "pedido" : "pedidos"}
          </Badge>
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2 mt-4">
          <Filter size={16} className="text-muted-foreground" />
          <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={FILTER_ALL_VALUE}>Status</SelectItem>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhum pedido encontrado para este filtro</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const currentStatus = editableStatuses[order._id] ?? order.status
              const isLoading = loadingIds.has(order._id)
              const hasChanges = currentStatus !== order.status

              return (
                <div
                  key={order._id}
                  className="border rounded-lg p-4 bg-card hover:bg-muted/50 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-3">
                      {/* Header with Order ID and Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShoppingCart size={18} className="text-primary" />
                          <h3 className="font-semibold text-lg">Pedido #{order._id.slice(-8)}</h3>
                        </div>
                        <Badge className={`flex items-center gap-1 ${getStatusColor(order.status)}`} variant="outline">
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>

                      {/* Order Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <div className="text-muted-foreground" />
                            <span className="font-medium">Client:</span>
                            <span className="text-muted-foreground">
                              {order.user ? order.user.name : "Usuário desconhecido"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-muted-foreground" />
                          <span className="font-medium">Date:</span>
                          <span className="text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString("pt-PT")}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <DollarSign size={14} className="text-muted-foreground" />
                          <span className="font-medium">Total:</span>
                          <span className="text-muted-foreground font-semibold">
                            {order.total.toLocaleString("pt-PT")} MZN
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Package size={14} className="text-muted-foreground" />
                          <span className="font-medium">Itens:</span>
                          <span className="text-muted-foreground">
                            {order.items?.length || 0} {order.items?.length === 1 ? "item" : "itens"}
                          </span>
                        </div>
                      </div>

                      {/* Items List */}
                      {order.items && order.items.length > 0 && (
                        <div className="bg-muted/30 p-3 rounded-md">
                          <p className="text-xs font-medium text-muted-foreground mb-2">PRODUTOS:</p>
                          <div className="flex flex-wrap gap-1">
                            {order.items.map((item: Product, index: number) => (
                              <Badge key={item._id || index} variant="outline" className="text-xs">
                                {item.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status Update Controls */}
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <Select
                        value={currentStatus}
                        onValueChange={(value) => handleStatusChange(order._id, value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status} value={status}>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(status)}
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        onClick={() => handleSave(order._id)}
                        disabled={isLoading || !hasChanges}
                        size="sm"
                        className="w-full"
                        variant={hasChanges ? "default" : "outline"}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={14} className="mr-2 animate-spin" />
                            Salvando...
                          </>
                        ) : (
                          <>
                            <Save size={14} className="mr-2" />
                            {hasChanges ? "Salvar" : "Salvo"}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
