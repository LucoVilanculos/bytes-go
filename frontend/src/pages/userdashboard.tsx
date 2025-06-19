import { useEffect, useState } from "react";
import { getOrders, submitOrder } from "../services/orders";
import { submitReport as submitReportService } from "../services/reports";
import type { OrderProps } from "../types/order";
import { GeolocationPage } from "../components/geolocation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { simulateTaxiOrder } from "../services/orders";
import toast from "react-hot-toast";

// Função para geocodificar endereço usando Nominatim
async function geocode(address: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data && data[0]) {
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  }
  throw new Error("Endereço não encontrado");
}

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

export function ReportForm({
  onSuccess,
  drivers,
}: {
  onSuccess?: () => void;
  drivers: { _id: string; name: string }[];
}) {
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
      toast.success("Denúncia enviada! Obrigado pelo seu feedback.");
      onSuccess && onSuccess();
    } catch {
      toast.error("Erro ao enviar denúncia.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white dark:bg-[#232c47] rounded-xl p-4 shadow-lg max-w-md mx-auto dark:text-white"
    >
      <label className="font-bold text-blue-900 dark:text-blue-100">Motorista</label>
      <select
        className="border border-blue-300 dark:border-blue-500 rounded px-2 py-1 bg-white dark:bg-[#28335a] dark:text-white"
        value={reportedDriverId}
        onChange={e => setReportedDriverId(e.target.value)}
        required
      >
        <option value="">Selecione o motorista</option>
        {drivers.map(d => (
          <option key={d._id} value={d._id}>{d.name}</option>
        ))}
      </select>

      <label className="font-bold text-blue-900 dark:text-blue-100">Motivo</label>
      <input
        className="border border-blue-300 dark:border-blue-500 rounded px-2 py-1 bg-white dark:bg-[#28335a] dark:text-white"
        placeholder="Motivo da denúncia"
        value={reason}
        onChange={e => setReason(e.target.value)}
        required
      />

      <label className="font-bold text-blue-900 dark:text-blue-100">Descrição (opcional)</label>
      <textarea
        className="border border-blue-300 dark:border-blue-500 rounded px-2 py-1 bg-white dark:bg-[#28335a] dark:text-white"
        placeholder="Descreva o ocorrido"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={3}
      />

      <button
        type="submit"
        className="bg-blue-900 dark:bg-blue-700 text-white rounded px-4 py-2 font-bold"
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
  const [fakeTime, setFakeTime] = useState<{ [orderId: string]: number }>({});

  const session = localStorage.getItem("session");
  const user = session ? JSON.parse(session) : null;

  useEffect(() => {
    getOrders()
      .then((data) => {
        setOrders(data);
        // Gera tempo fake para cada order nova
        const times: { [orderId: string]: number } = {};
        data.forEach((order) => {
          if (!fakeTime[order._id]) {
            times[order._id] = Math.floor(Math.random() * 6) + 5; // 5-10 min
          }
        });
        setFakeTime((prev) => ({ ...prev, ...times }));
      })
      .finally(() => setLoading(false));
    fetchFaqs().then(setFaqs);
  }, []);

  const userDrivers: { _id: string; name: string }[] = []; // Nenhum motorista disponível

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !destination) return;
    setCreating(true);
    try {
      const pickupCoords = await geocode(pickup);
      const destCoords = await geocode(destination);
      await submitOrder({
        items: [],
        user: "me",
        pickupLocation: pickupCoords,
        destination: destCoords,
      });
      toast.success("Viagem criada com sucesso! Motorista chegando em ~5 min.");
      getOrders().then((data) => {
        setOrders(data);
        const last = data[data.length - 1];
        if (last) {
          setFakeTime((prev) => ({
            ...prev,
            [last._id]: Math.floor(Math.random() * 6) + 5,
          }));
        }
      });
      setPickup("");
      setDestination("");
      setSimulatedPrice(null);
    } catch {
      toast.error("Erro ao criar viagem. Verifique os endereços.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 dark:from-[#181f3a] dark:via-[#22305a] dark:to-[#2b4170] p-4 font-mono">
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
        <Card className="bg-white/90 dark:bg-[#232c47] dark:text-white">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">Criar Nova Viagem</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateOrder} className="flex flex-col gap-4">
              <input
                className="border border-blue-300 dark:border-blue-500 rounded px-2 py-1 bg-white dark:bg-[#28335a] dark:text-white"
                placeholder="Local de origem"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
              />
              <input
                className="border border-blue-300 dark:border-blue-500 rounded px-2 py-1 bg-white dark:bg-[#28335a] dark:text-white"
                placeholder="Destino"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="bg-blue-700 dark:bg-blue-800 text-white"
                  disabled={simulating || !pickup || !destination}
                  onClick={async () => {
                    setSimulating(true);
                    try {
                      const pickupCoords = await geocode(pickup);
                      const destCoords = await geocode(destination);
                      const result = await simulateTaxiOrder({
                        driverLocation: pickupCoords,
                        pickupLocation: pickupCoords,
                        destination: destCoords,
                      });
                      setSimulatedPrice(result.total_price);
                      toast.success("Preço simulado com sucesso!");
                    } catch {
                      setSimulatedPrice(null);
                      toast.error("Erro ao simular preço.");
                    } finally {
                      setSimulating(false);
                    }
                  }}
                >
                  {simulating ? "Simulando..." : "Simular Preço"}
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-900 dark:bg-blue-700 text-white"
                  disabled={creating}
                >
                  {creating ? "Criando..." : "Criar Viagem"}
                </Button>
              </div>
              {simulatedPrice !== null && (
                <div className="text-blue-900 dark:text-blue-100 font-bold">
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
        <Card className="bg-white/90 dark:bg-[#232c47] dark:text-white">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center justify-between">
              Denúncia
              <Button
                className="bg-blue-700 dark:bg-blue-800 text-white px-4 py-1 rounded-full"
                onClick={() => setReportOpen((v) => !v)}
                type="button"
              >
                {reportOpen ? "Fechar" : "Nova Denúncia"}
              </Button>
            </CardTitle>
          </CardHeader>
          {reportOpen && (
            <CardContent>
              <ReportForm
                drivers={userDrivers}
                onSuccess={() => setReportOpen(false)}
              />
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
                className="bg-white dark:bg-[#232c47] rounded-xl shadow-lg p-4 flex flex-col gap-2 dark:text-white"
              >
                <div>
                  <span className="font-bold text-blue-900 dark:text-blue-100">Status:</span>{" "}
                  <span className="font-semibold">{order.status}</span>
                </div>
                <div className="text-blue-800 dark:text-blue-200">
                  Total: <span className="font-semibold">MZN {order.total?.toFixed(2)}</span>
                </div>
                <div className="text-blue-800 dark:text-blue-200">
                  Origem: <span className="font-semibold">
                    {order.pickupLocation
                      ? `${order.pickupLocation.lat}, ${order.pickupLocation.lng}`
                      : "-"}
                  </span>
                </div>
                <div className="text-blue-800 dark:text-blue-200">
                  Destino: <span className="font-semibold">
                    {order.destination && typeof order.destination === "object"
                      ? `${order.destination.lat}, ${order.destination.lng}`
                      : typeof order.destination === "string"
                      ? order.destination
                      : "-"}
                  </span>
                </div>
                <div className="text-blue-800 dark:text-blue-200">
                  Motorista: <span className="font-semibold">-</span>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-300">
                  {order.createdAt && new Date(order.createdAt).toLocaleString()}
                </div>
                <div className="text-blue-700 dark:text-blue-300 font-semibold">
                  Motorista chega em: {fakeTime[order._id] || 5} min
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
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-6 text-center">Perguntas Frequentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="bg-white/90 dark:bg-[#232c47] border-blue-100 shadow-lg hover:scale-105 transition dark:text-white">
                <CardHeader>
                  <CardTitle className="text-blue-900 dark:text-blue-100 text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800 dark:text-blue-200">{faq.answer}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};