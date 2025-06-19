import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import api from "../services/faqs";
import { toast } from "react-hot-toast";

type Report = {
  _id: string;
  reason: string;
  description: string;
  status: string;
  createdAt: string;
  reportedDriverId: { name: string; email: string };
  passengerId: { name: string; email: string };
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

type Customer = {
  _id: string;
  name: string;
  email: string;
  status: string;
};

type Order = {
  _id: string;
  user: { name: string; email: string };
  driver: { name: string; email: string };
  status: string;
  total: number;
  createdAt: string;
};

type Quiz = {
  _id: string;
  title: string;
  questions: { question: string; options: string[]; answer: string }[];
};

type Faq = {
  _id: string;
  question: string;
  answer: string;
};

export const AdminPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [newTutorial, setNewTutorial] = useState({ title: "", content: "" });
  const [newQuiz, setNewQuiz] = useState({ title: "", questions: "" });
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [tab, setTab] = useState("Denúncias");

  const session = localStorage.getItem("session");
  const user = session ? JSON.parse(session) : null;

  useEffect(() => {
    api.get("/reports").then((res) => setReports(res.data)).catch(() => setReports([]));
    api.get("/tutorials").then((res) => setTutorials(res.data)).catch(() => setTutorials([]));
    api.get("/users?role=driver").then((res) => setDrivers(res.data)).catch(() => setDrivers([]));
    api.get("/users?role=customer").then((res) => setCustomers(res.data)).catch(() => setCustomers([]));
    api.get("/orders").then((res) => setOrders(res.data)).catch(() => setOrders([]));
    api.get("/quizzes").then((res) => setQuizzes(res.data)).catch(() => setQuizzes([]));
    api.get("/faqs").then((res) => setFaqs(res.data)).catch(() => setFaqs([]));
  }, []);

  // Denúncias
  const handleDeleteReport = async (id: string) => {
    try {
      await api.delete(`/reports/${id}`);
      setReports((r) => r.filter((rep) => rep._id !== id));
      toast.success("Denúncia apagada com sucesso!");
    } catch {
      toast.error("Erro ao apagar denúncia.");
    }
  };

  // Tutoriais
  const handleDeleteTutorial = async (id: string) => {
    try {
      await api.delete(`/tutorials/${id}`);
      setTutorials((t) => t.filter((tt) => tt._id !== id));
      toast.success("Tutorial apagado com sucesso!");
    } catch {
      toast.error("Erro ao apagar tutorial.");
    }
  };

  const handleCreateTutorial = async () => {
    if (!newTutorial.title || !newTutorial.content) {
      toast.error("Preencha todos os campos do tutorial!");
      return;
    }
    try {
      const tutorialData = {
        ...newTutorial,
        categoryId: "665f1e8e2b7e2e001e5d7b11",
        authorId: user?._id,
      };
      const res = await api.post("/tutorials", tutorialData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTutorials((t) => [...t, res.data]);
      setNewTutorial({ title: "", content: "" });
      toast.success("Tutorial criado com sucesso!");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
        "Erro ao criar tutorial. Verifique os campos e tente novamente."
      );
    }
  };

  // Motoristas
  const handleDriverStatus = async (id: string, status: Driver["status"]) => {
    try {
      await api.put(`/users/${id}`, { status });
      setDrivers((d) =>
        d.map((drv) => (drv._id === id ? { ...drv, status } : drv))
      );
      toast.success(
        status === "approved"
          ? "Motorista aprovado com sucesso!"
          : "Motorista reprovado!"
      );
    } catch {
      toast.error("Erro ao atualizar status do motorista.");
    }
  };

  // Clientes
  const handleDeleteCustomer = async (id: string) => {
    try {
      await api.delete(`/users/${id}`);
      setCustomers((c) => c.filter((cust) => cust._id !== id));
      toast.success("Cliente apagado com sucesso!");
    } catch {
      toast.error("Erro ao apagar cliente.");
    }
  };

  // Quizzes
  const handleDeleteQuiz = async (id: string) => {
    try {
      await api.delete(`/quizzes/${id}`);
      setQuizzes((q) => q.filter((quiz) => quiz._id !== id));
      toast.success("Quiz apagado com sucesso!");
    } catch {
      toast.error("Erro ao apagar quiz.");
    }
  };

  const handleCreateQuiz = async () => {
    if (!newQuiz.title || !newQuiz.questions) {
      toast.error("Preencha todos os campos do quiz!");
      return;
    }
    try {
      const quizData = {
        title: newQuiz.title,
        questions: JSON.parse(newQuiz.questions),
      };
      const res = await api.post("/quizzes", quizData);
      setQuizzes((q) => [...q, res.data]);
      setNewQuiz({ title: "", questions: "" });
      toast.success("Quiz criado com sucesso!");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
        "Erro ao criar quiz. Verifique os campos e tente novamente."
      );
    }
  };

  // FAQs
  const handleDeleteFaq = async (id: string) => {
    try {
      await api.delete(`/faqs/${id}`);
      setFaqs((f) => f.filter((faq) => faq._id !== id));
      toast.success("FAQ apagado com sucesso!");
    } catch {
      toast.error("Erro ao apagar FAQ.");
    }
  };

  const handleCreateFaq = async () => {
    if (!newFaq.question || !newFaq.answer) {
      toast.error("Preencha todos os campos da FAQ!");
      return;
    }
    try {
      const faqData = {
        ...newFaq,
      };
      const res = await api.post("/faqs", faqData);
      setFaqs((f) => [...f, res.data]);
      setNewFaq({ question: "", answer: "" });
      toast.success("FAQ criada com sucesso!");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
        "Erro ao criar FAQ. Verifique os campos e tente novamente."
      );
    }
  };

  // Tabs
  const TABS = [
    "Denúncias",
    "Tutoriais",
    "Motoristas",
    "Clientes",
    "Viagens",
    "Quizzes",
    "FAQs",
  ];

  const tabVariants = {
    active: { scale: 1.08, background: "#1e3a8a", color: "#fff" },
    inactive: { scale: 1, background: "#e0e7ff", color: "#1e3a8a" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 p-6 font-mono">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-white text-center mb-4"
      >
        Painel Completo do Administrador
      </motion.h1>
      <div className="text-white text-center mb-8">
        Bem-vindo{user ? `, ${user.name}` : ""} (Administrador)
      </div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {TABS.map((t) => (
          <motion.button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded font-bold shadow"
            variants={tabVariants}
            animate={tab === t ? "active" : "inactive"}
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {t}
          </motion.button>
        ))}
      </div>

      {/* Conteúdo das abas */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-[#232c47] rounded-xl shadow-lg p-6 dark:text-white"
      >
        {/* DENÚNCIAS */}
        {tab === "Denúncias" && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Denúncias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((rep) => (
                <motion.div
                  key={rep._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-blue-50 dark:bg-[#28335a] rounded-xl shadow-lg p-4 flex flex-col gap-2 dark:text-white"
                >
                  <div>
                    <span className="font-bold text-blue-900">Passageiro:</span> {rep.passengerId?.name} <br />
                    <span className="font-bold text-blue-900">Motorista:</span> {rep.reportedDriverId?.name}
                  </div>
                  <div className="text-blue-800">{rep.reason}</div>
                  <div className="text-blue-800">{rep.description}</div>
                  <div className="text-xs text-gray-400">{new Date(rep.createdAt).toLocaleString()}</div>
                  <div className="text-xs text-blue-700 font-semibold">
                    Status: {rep.status}
                  </div>
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
          </section>
        )}

        {/* TUTORIAIS */}
        {tab === "Tutoriais" && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Tutoriais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {tutorials.map((tt) => (
                <motion.div
                  key={tt._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-blue-50 dark:bg-[#28335a] rounded-xl shadow-lg p-4 flex flex-col gap-2 dark:text-white"
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
            <div className="bg-blue-50 rounded-xl shadow-lg p-4 flex flex-col gap-2 max-w-md">
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
          </section>
        )}

        {/* MOTORISTAS */}
        {tab === "Motoristas" && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Análise de Motoristas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {drivers.map((drv) => (
                <motion.div
                  key={drv._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-blue-50 dark:bg-[#28335a] rounded-xl shadow-lg p-4 flex flex-col gap-2 dark:text-white"
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
          </section>
        )}

        {/* CLIENTES */}
        {tab === "Clientes" && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Clientes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customers.map((cust) => (
                <motion.div
                  key={cust._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-blue-50 dark:bg-[#28335a] rounded-xl shadow-lg p-4 flex flex-col gap-2 dark:text-white"
                >
                  <div>
                    <span className="font-bold text-blue-900">Nome:</span> {cust.name} <br />
                    <span className="font-bold text-blue-900">Email:</span> {cust.email}
                  </div>
                  <div className="text-blue-800">Status: {cust.status}</div>
                  <Button
                    className="w-fit bg-red-600 hover:bg-red-700 text-white mt-2"
                    onClick={() => handleDeleteCustomer(cust._id)}
                  >
                    Apagar
                  </Button>
                </motion.div>
              ))}
              {customers.length === 0 && (
                <div className="text-blue-100">Nenhum cliente cadastrado.</div>
              )}
            </div>
          </section>
        )}

        {/* VIAGENS */}
        {tab === "Viagens" && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Viagens</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-blue-50 dark:bg-[#28335a] rounded-xl shadow-lg dark:text-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-blue-900">Passageiro</th>
                    <th className="px-4 py-2 text-blue-900">Motorista</th>
                    <th className="px-4 py-2 text-blue-900">Status</th>
                    <th className="px-4 py-2 text-blue-900">Total</th>
                    <th className="px-4 py-2 text-blue-900">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-blue-100">
                      <td className="px-4 py-2">{order.user?.name}</td>
                      <td className="px-4 py-2">{order.driver?.name}</td>
                      <td className="px-4 py-2">{order.status}</td>
                      <td className="px-4 py-2">Kz {order.total}</td>
                      <td className="px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-blue-100 text-center py-4">
                        Nenhuma viagem encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* QUIZZES */}
        {tab === "Quizzes" && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {quizzes.map((quiz) => (
                <motion.div
                  key={quiz._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-blue-50 dark:bg-[#28335a] rounded-xl shadow-lg p-4 flex flex-col gap-2 dark:text-white"
                >
                  <div className="font-bold text-blue-900">{quiz.title}</div>
                  <div className="text-blue-800">
                    {quiz.questions.length} perguntas
                  </div>
                  <Button
                    className="w-fit bg-red-600 hover:bg-red-700 text-white mt-2"
                    onClick={() => handleDeleteQuiz(quiz._id)}
                  >
                    Apagar
                  </Button>
                </motion.div>
              ))}
              {quizzes.length === 0 && (
                <div className="text-blue-100">Nenhum quiz cadastrado.</div>
              )}
            </div>
            <div className="bg-blue-50 rounded-xl shadow-lg p-4 flex flex-col gap-2 max-w-md">
              <input
                className="border border-blue-300 rounded px-2 py-1 mb-2"
                placeholder="Título do quiz"
                value={newQuiz.title}
                onChange={(e) => setNewQuiz((q) => ({ ...q, title: e.target.value }))}
              />
              <textarea
                className="border border-blue-300 rounded px-2 py-1 mb-2"
                placeholder='Perguntas (JSON: [{"question":"...","options":["a","b"],"answer":"a"}])'
                value={newQuiz.questions}
                onChange={(e) => setNewQuiz((q) => ({ ...q, questions: e.target.value }))}
              />
              <Button
                className="w-fit bg-blue-900 hover:bg-blue-800 text-white"
                onClick={handleCreateQuiz}
              >
                Criar Quiz
              </Button>
            </div>
          </section>
        )}

        {/* FAQS */}
        {tab === "FAQs" && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">FAQs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {faqs.map((faq) => (
                <motion.div
                  key={faq._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-blue-50 dark:bg-[#28335a] rounded-xl shadow-lg p-4 flex flex-col gap-2 dark:text-white"
                >
                  <div className="font-bold text-blue-900">{faq.question}</div>
                  <div className="text-blue-800">{faq.answer}</div>
                  <Button
                    className="w-fit bg-red-600 hover:bg-red-700 text-white mt-2"
                    onClick={() => handleDeleteFaq(faq._id)}
                  >
                    Apagar
                  </Button>
                </motion.div>
              ))}
              {faqs.length === 0 && (
                <div className="text-blue-100">Nenhuma FAQ cadastrada.</div>
              )}
            </div>
            <div className="bg-blue-50 rounded-xl shadow-lg p-4 flex flex-col gap-2 max-w-md">
              <input
                className="border border-blue-300 rounded px-2 py-1 mb-2"
                placeholder="Pergunta"
                value={newFaq.question}
                onChange={(e) => setNewFaq((f) => ({ ...f, question: e.target.value }))}
              />
              <textarea
                className="border border-blue-300 rounded px-2 py-1 mb-2"
                placeholder="Resposta"
                value={newFaq.answer}
                onChange={(e) => setNewFaq((f) => ({ ...f, answer: e.target.value }))}
              />
              <Button
                className="w-fit bg-blue-900 hover:bg-blue-800 text-white"
                onClick={handleCreateFaq}
              >
                Criar FAQ
              </Button>
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
};