import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

// Tipos
type Report = {
  _id: string;
  user: { name: string; email: string };
  driver: { name: string; email: string };
  description: string;
  createdAt: string;
};

type Tutorial = {
  _id: string;
  title: string;
  content: string;
};

type Driver = {
  _id: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
};

// Mock de serviços (troque por API real)
const fetchReports = async (): Promise<Report[]> => [
  {
    _id: "1",
    user: { name: "Cliente 1", email: "cli1@email.com" },
    driver: { name: "Motorista 1", email: "mot1@email.com" },
    description: "Dirigiu perigosamente.",
    createdAt: new Date().toISOString(),
  },
];
const fetchTutorials = async (): Promise<Tutorial[]> => [
  { _id: "1", title: "Como usar o app", content: "Baixe, registre-se e peça sua corrida!" },
];
const fetchDrivers = async (): Promise<Driver[]> => [
  { _id: "1", name: "Motorista 1", email: "mot1@email.com", status: "pending" },
];

export const AdminTransportadoraPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [newTutorial, setNewTutorial] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchReports().then(setReports);
    fetchTutorials().then(setTutorials);
    fetchDrivers().then(setDrivers);
  }, []);

  // Handlers
  const handleDeleteReport = (id: string) => setReports((r) => r.filter((rep) => rep._id !== id));
  const handleDeleteTutorial = (id: string) => setTutorials((t) => t.filter((tt) => tt._id !== id));
  const handleCreateTutorial = () => {
    if (!newTutorial.title || !newTutorial.content) return;
    setTutorials((t) => [
      ...t,
      { _id: Date.now().toString(), ...newTutorial },
    ]);
    setNewTutorial({ title: "", content: "" });
  };
  const handleDriverStatus = (id: string, status: Driver["status"]) =>
    setDrivers((d) =>
      d.map((drv) => (drv._id === id ? { ...drv, status } : drv))
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 p-6 font-mono">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-white text-center mb-10"
      >
        Painel Admin - Transportadora
      </motion.h1>

      {/* Denúncias */}
      <motion.section
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold text-blue-100 mb-4">Denúncias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((rep) => (
            <motion.div
              key={rep._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2"
            >
              <div>
                <span className="font-bold text-blue-900">Cliente:</span> {rep.user.name} <br />
                <span className="font-bold text-blue-900">Motorista:</span> {rep.driver.name}
              </div>
              <div className="text-blue-800">{rep.description}</div>
              <div className="text-xs text-gray-400">{new Date(rep.createdAt).toLocaleString()}</div>
              <Button
                className="w-fit bg-red-600 hover:bg-red-700 text-white mt-2"
                onClick={() => handleDeleteReport(rep._id)}
              >
                Apagar
              </Button>
            </motion.div>
          ))}
          {reports.length === 0 && (
            <div className="text-blue-100">Nenhuma denúncia encontrada.</div>
          )}
        </div>
      </motion.section>

      {/* Tutoriais */}
      <motion.section
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold text-blue-100 mb-4">Tutoriais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {tutorials.map((tt) => (
            <motion.div
              key={tt._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2"
            >
              <div className="font-bold text-blue-900">{tt.title}</div>
              <div className="text-blue-800">{tt.content}</div>
              <Button
                className="w-fit bg-red-600 hover:bg-red-700 text-white mt-2"
                onClick={() => handleDeleteTutorial(tt._id)}
              >
                Apagar
              </Button>
            </motion.div>
          ))}
          {tutorials.length === 0 && (
            <div className="text-blue-100">Nenhum tutorial cadastrado.</div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2 max-w-md">
          <input
            className="border border-blue-300 rounded px-2 py-1 mb-2"
            placeholder="Título do tutorial"
            value={newTutorial.title}
            onChange={(e) => setNewTutorial((t) => ({ ...t, title: e.target.value }))}
          />
          <textarea
            className="border border-blue-300 rounded px-2 py-1 mb-2"
            placeholder="Conteúdo"
            value={newTutorial.content}
            onChange={(e) => setNewTutorial((t) => ({ ...t, content: e.target.value }))}
          />
          <Button
            className="w-fit bg-blue-900 hover:bg-blue-800 text-white"
            onClick={handleCreateTutorial}
          >
            Criar Tutorial
          </Button>
        </div>
      </motion.section>

      {/* Motoristas */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-blue-100 mb-4">Análise de Motoristas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {drivers.map((drv) => (
            <motion.div
              key={drv._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2"
            >
              <div>
                <span className="font-bold text-blue-900">Nome:</span> {drv.name} <br />
                <span className="font-bold text-blue-900">Email:</span> {drv.email}
              </div>
              <div className="text-blue-800">
                Status:{" "}
                <span className={
                  drv.status === "approved"
                    ? "text-green-600"
                    : drv.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }>
                  {drv.status === "pending" ? "Pendente" : drv.status === "approved" ? "Aprovado" : "Rejeitado"}
                </span>
              </div>
              {drv.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    className="bg-green-700 hover:bg-green-800 text-white"
                    onClick={() => handleDriverStatus(drv._id, "approved")}
                  >
                    Aprovar
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleDriverStatus(drv._id, "rejected")}
                  >
                    Reprovar
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
          {drivers.length === 0 && (
            <div className="text-blue-100">Nenhum motorista para análise.</div>
          )}
        </div>
      </motion.section>
    </div>
  );
}


