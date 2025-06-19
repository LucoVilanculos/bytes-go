import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getOrders } from "../services/orders";
import type { OrderProps } from "../types/order";
import { GeolocationPage } from "../components/geolocation";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

export const Driver = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  const session = localStorage.getItem("session");
  const user = session ? JSON.parse(session) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 dark:from-[#181f3a] dark:via-[#22305a] dark:to-[#2b4170] p-4 font-mono">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-white text-center mb-8"
      >
        Bem-vindo{user ? `, ${user.name}` : ""} {user?.role === "admin" ? "(Administrador)" : user?.role === "driver" ? "(Motorista)" : ""}
      </motion.h1>

      <motion.section
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 max-w-3xl mx-auto"
      >
        <h2 className="text-xl font-semibold text-blue-100 mb-2">Sua Localização Atual</h2>
        <div className="rounded-xl overflow-hidden shadow-lg bg-white/80 dark:bg-[#232c47] p-4 dark:text-white">
          <GeolocationPage />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 max-w-3xl mx-auto"
      >
        <h2 className="text-xl font-semibold text-blue-100 mb-2">Seu Carro</h2>
        <Card className="bg-white/90 dark:bg-[#232c47] dark:text-white">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">GMC Taxi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <img
                src="https://images.unsplash.com/photo-1601919706273-88125e95ba71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R01DfGVufDB8fDB8fHww"
                alt="Seu carro"
                className="w-32 h-20 object-cover rounded shadow"
              />
              <div>
                <div className="text-blue-900 dark:text-blue-100 font-bold">Modelo: GMC</div>
                <div className="text-blue-800 dark:text-blue-200">Cor: Amarelo</div>
                <div className="text-blue-800 dark:text-blue-200">Placa: ABC-1234</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-xl font-semibold text-blue-100 mb-4">Suas Corridas</h2>
        {loading ? (
          <div className="text-white text-center">Carregando corridas...</div>
        ) : orders.length === 0 ? (
          <div className="text-blue-100 text-center">Nenhuma corrida encontrada.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-[#232c47] rounded-xl shadow-lg p-4 flex flex-col gap-2 dark:text-white"
              >
                <div>
                  <span className="font-bold text-blue-900 dark:text-blue-100">Cliente:</span> {order.user?.name}
                </div>
                <div className="text-blue-800 dark:text-blue-200">
                  Status: <span className="font-semibold">{order.status}</span>
                </div>
                <div className="text-blue-800 dark:text-blue-200">
                  Total: <span className="font-semibold">MZN {order.total?.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-300">
                  {order.createdAt && new Date(order.createdAt).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
};