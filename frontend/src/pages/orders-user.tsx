import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getOrders } from "../services/orders";
import type { OrderProps } from "../types/order";
import { CardContent, CardTitle } from "../components/ui/card";

export const OrdersListPage = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState<{ [id: string]: boolean }>({});

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  const handleCheck = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 p-4 font-mono">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-white text-center mb-8"
      >
        Todas as Corridas
      </motion.h1>

      {loading ? (
        <div className="text-white text-center">Carregando...</div>
      ) : orders.length === 0 ? (
        <div className="text-blue-100 text-center">Nenhuma corrida encontrada.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!checked[order._id]}
                  onChange={() => handleCheck(order._id)}
                  className="accent-blue-900 w-5 h-5"
                />
                <CardTitle className="text-blue-900 text-lg">
                  {order.user?.name || "Cliente"}
                </CardTitle>
              </div>
              <CardContent className="pl-8">
                <div className="text-blue-800">
                  Status: <span className="font-semibold">{order.status}</span>
                </div>
                <div className="text-blue-800">
                  Total: <span className="font-semibold">MZN {order.total?.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {order.createdAt && new Date(order.createdAt).toLocaleString()}
                </div>
              </CardContent>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
