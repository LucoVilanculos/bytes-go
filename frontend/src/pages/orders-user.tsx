import { useEffect, useState } from "react"

import type { OrderProps } from "../types/order"
import { getMyOrders } from "./../services/admin"

export const OrdersUser = () => {
  const [orders, setOrders] = useState<OrderProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    const fetchOrders = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await getMyOrders()

        if (!ignore) {
          if (typeof data === "string") {
            setError(data)
            setOrders([])
          } else if (Array.isArray(data)) {
            setOrders(data)
          } else if (data.orders && Array.isArray(data.orders)) {
            setOrders(data.orders)
          } else {
            console.warn("Invalid API response format:", data)
            setOrders([])
          }
        }
      } catch (err) {
        if (!ignore) {
          const errorMessage = err instanceof Error ? err.message : "Failed to fetch orders"
          console.error("Error fetching orders:", err)
          setError(errorMessage)
          setOrders([])
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchOrders()

    return () => {
      ignore = true
    }
  }, [])

  const handleRetry = async () => {
    setError(null)
    setLoading(true)

    try {
      const data = await getMyOrders()

      if (typeof data === "string") {
        setError(data)
        setOrders([])
      } else if (Array.isArray(data)) {
        setOrders(data)
      } else if (data.orders && Array.isArray(data.orders)) {
        setOrders(data.orders)
      } else {
        setOrders([])
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch orders"
      setError(errorMessage)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-blue-600 text-center mb-4">My Orders</h2>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-muted-foreground">Loading orders...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-blue-600 text-center mb-4">My Orders</h2>
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">
            <p className="font-semibold">Failed to load orders</p>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-blue-600 text-center mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No orders found.</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              {orders.length} order{orders.length !== 1 ? "s" : ""} found
            </p>
            <button onClick={handleRetry} className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
              Refresh
            </button>
          </div>

          <ul className="space-y-3">
            {orders.map((order) => (
              <li
                key={order.orderId}
                className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-gray-900">{order.customerName}</div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="text-lg font-semibold text-blue-600 mb-1">
                  {order.totalAmount.toLocaleString("en-US")} MZN
                </div>

                <div className="text-sm text-muted-foreground">
                  Order #{order.orderId} • {new Date(order.createdAt).toLocaleString("en-US")}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
