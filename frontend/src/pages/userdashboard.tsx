import { useEffect, useState } from "react";
import { getOrders, submitOrder } from "../services/orders";
import { submitReport as submitReportService } from "../services/reports";
import type { OrderProps } from "../types/order";
import { GeolocationPage } from "../components/geolocation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { simulateTaxiOrder } from "../services/orders";

const drivers = [
  { _id: "driverid1", name: "João Motorista" },
  { _id: "driverid2", name: "Maria Motorista" },
];

const fetchFaqs = async () => [
  {
    question: "Como criar uma viagem?",
    answer: "Preencha os campos de origem e destino e clique em 'Criar Viagem'.",
  },
  {
    question: "Como acompanho minhas viagens?",
    answer: "Suas viagens aparecem logo abaixo deste painel.",
  },
];

export function ReportForm({ onSuccess }: { onSuccess?: () => void }) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [reportedDriverId, setReportedDriverId] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitReportService({ reason, description, reportedDriverId });
      setSuccess(true);
      setReason("");
      setDescription("");
      setReportedDriverId("");
      onSuccess && onSuccess();
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white rounded-xl p-4 shadow-lg max-w-md mx-auto">
      <label className="font-bold text-blue-900">Motorista</label>
      <select
        className="border border-blue-300 rounded px-2 py-1"
        value={reportedDriverId}
        onChange={e => setReportedDriverId(e.target.value)}
        required
      >
        <option value="">Selecione o motorista</option>
        {drivers.map(d => (
          <option key={d._id} value={d._id}>{d.name}</option>
        ))}
      </select>

      <label className="font-bold text-blue-900">Motivo</label>
      <input
        className="border border-blue-300 rounded px-2 py-1"
        placeholder="Motivo da denúncia"
        value={reason}
        onChange={e => setReason(e.target.value)}
        required
      />

      <label className="font-bold text-blue-900">Descrição (opcional)</label>
      <textarea
        className="border border-blue-300 rounded px-2 py-1"
        placeholder="Descreva o ocorrido"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={3}
      />

      <button
        type="submit"
        className="bg-blue-900 text-white rounded px-4 py-2 font-bold"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar Denúncia"}
      </button>
      {success && <div className="text-green-600 text-center">Denúncia enviada com sucesso!</div>}
    </form>
  );
}

export const UserDashboard = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [creating, setCreating] = useState(false);
  const [simulatedPrice, setSimulatedPrice] = useState<number | null>(null);
  const [simulating, setSimulating] = useState(false);

  const [reportOpen, setReportOpen] = useState(false);
  const navigate = useNavigate();

  const session = localStorage.getItem("session");
  const user = session ? JSON.parse(session) : null;

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
    fetchFaqs().then(setFaqs);
  }, []);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !destination) return;
    setCreating(true);
    try {
      await submitOrder({
        items: [],
        user: "me",
        pickupLocation: { lat: -25.9655, lng: 32.5832 },
        destination: { lat: -25.9650, lng: 32.6000 },
      });
      getOrders().then(setOrders);
      setPickup("");
      setDestination("");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 p-4 font-mono">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-white text-center mb-8"
      >
        Bem-vindo{user ? `, ${user.name}` : ""}!
      </motion.h1>

      <motion.section
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 max-w-3xl mx-auto"
      >
        <h2 className="text-xl font-semibold text-blue-100 mb-2">Sua Localização Atual</h2>
        <div className="rounded-xl overflow-hidden shadow-lg bg-white/80 p-4">
          <GeolocationPage />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 max-w-3xl mx-auto"
      >
        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle className="text-blue-900">Criar Nova Viagem</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateOrder} className="flex flex-col gap-4">
              <input
                className="border border-blue-300 rounded px-2 py-1"
                placeholder="Local de origem"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
              />
              <input
                className="border border-blue-300 rounded px-2 py-1"
                placeholder="Destino"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="bg-blue-700 text-white"
                  disabled={simulating || !pickup || !destination}
                  onClick={async () => {
                    setSimulating(true);
                    try {
                      // Use coordenadas reais se tiver, aqui é exemplo fixo
                      const result = await simulateTaxiOrder({
                        driverLocation: { lat: -25.9655, lng: 32.5832 },
                        pickupLocation: { lat: -25.9655, lng: 32.5832 },
                        destination: { lat: -25.9650, lng: 32.6000 },
                      });
                      setSimulatedPrice(result.total_price);
                    } catch {
                      setSimulatedPrice(null);
                    } finally {
                      setSimulating(false);
                    }
                  }}
                >
                  {simulating ? "Simulando..." : "Simular Preço"}
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-900 text-white"
                  disabled={creating}
                >
                  {creating ? "Criando..." : "Criar Viagem"}
                </Button>
              </div>
              {simulatedPrice !== null && (
                <div className="text-blue-900 font-bold">
                  Preço estimado: MZN {simulatedPrice}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-3xl mx-auto mb-10"
      >
        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center justify-between">
              Denúncia
              <Button
                className="bg-blue-700 text-white px-4 py-1 rounded-full"
                onClick={() => setReportOpen((v) => !v)}
                type="button"
              >
                {reportOpen ? "Fechar" : "Nova Denúncia"}
              </Button>
            </CardTitle>
          </CardHeader>
          {reportOpen && (
            <CardContent>
              <ReportForm onSuccess={() => setReportOpen(false)} />
            </CardContent>
          )}
        </Card>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-5xl mx-auto mb-12"
      >
        <h2 className="text-xl font-semibold text-blue-100 mb-4">Suas Viagens</h2>
        {loading ? (
          <div className="text-white text-center">Carregando viagens...</div>
        ) : orders.length === 0 ? (
          <div className="text-blue-100 text-center">Nenhuma viagem encontrada.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2"
              >
                <div>
                  <span className="font-bold text-blue-900">Status:</span>{" "}
                  <span className="font-semibold">{order.status}</span>
                </div>
                <div className="text-blue-800">
                  Total: <span className="font-semibold">MZN {order.total?.toFixed(2)}</span>
                </div>
                <div className="text-blue-800">
                  Origem: <span className="font-semibold">
                    {order.pickupLocation
                      ? `${order.pickupLocation.lat}, ${order.pickupLocation.lng}`
                      : "-"}
                  </span>
                </div>
                <div className="text-blue-800">
                  Destino: <span className="font-semibold">
                    {typeof order.destination === "string"
                      ? order.destination
                      : order.destination
                        ? `${order.destination.lat}, ${order.destination.lng}`
                        : "-"}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  {order.createdAt && new Date(order.createdAt).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Perguntas Frequentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="bg-white/90 border-blue-100 shadow-lg hover:scale-105 transition">
                <CardHeader>
                  <CardTitle className="text-blue-900 text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800">{faq.answer}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/denuncias")}
        >
          Denunciar
        </button>
      </div>

      <div className="fixed bottom-20 right-4">
        
      </div>
    </div>
  );
}

