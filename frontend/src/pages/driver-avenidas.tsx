import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";

const tutoriais = [
  {
    id: "av-julius-nyerere",
    titulo: "Avenida Julius Nyerere",
    descricao: "Conheça as regras e dicas para dirigir na Av. Julius Nyerere.",
    url: "/tutoriais/avenida-julius-nyerere",
  },
  {
    id: "av-eduardo-mondlane",
    titulo: "Avenida Eduardo Mondlane",
    descricao: "Tudo sobre a Av. Eduardo Mondlane em Maputo.",
    url: "/tutoriais/avenida-eduardo-mondlane",
  },
  {
    id: "av-marginal",
    titulo: "Avenida Marginal",
    descricao: "Dicas para circular na Av. Marginal, Maputo.",
    url: "/tutoriais/avenida-marginal",
  },
  {
    id: "av-samora-machel-matola",
    titulo: "Avenida Samora Machel (Matola)",
    descricao: "Como navegar pela Av. Samora Machel na Matola.",
    url: "/tutoriais/avenida-samora-machel-matola",
  },
];

const quiz = [
  {
    pergunta: "Qual avenida liga o centro de Maputo à zona da Costa do Sol?",
    opcoes: [
      "Avenida Julius Nyerere",
      "Avenida Marginal",
      "Avenida Eduardo Mondlane",
      "Avenida Samora Machel",
    ],
    resposta: "Avenida Marginal",
  },
  {
    pergunta: "Qual avenida é famosa pelo trânsito intenso na Matola?",
    opcoes: [
      "Avenida Samora Machel",
      "Avenida Julius Nyerere",
      "Avenida Marginal",
      "Avenida Eduardo Mondlane",
    ],
    resposta: "Avenida Samora Machel",
  },
  {
    pergunta: "Qual destas avenidas passa pelo bairro Polana?",
    opcoes: [
      "Avenida Julius Nyerere",
      "Avenida Marginal",
      "Avenida Samora Machel",
      "Avenida 25 de Setembro",
    ],
    resposta: "Avenida Julius Nyerere",
  },
];

export const DriverAvenidasPage = () => {
  const [quizStep, setQuizStep] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Pega o usuário logado
  const session = localStorage.getItem("session");
  const user = session ? JSON.parse(session) : null;
  const userId = user?._id;

  // Detecta se veio do registro (register)
  const isRegister = location.state?.fromRegister === true;

  // Checa se já completou o quiz (por user)
  useEffect(() => {
    if (userId) {
      const quizDone = localStorage.getItem(`quizAvenidasDone_${userId}`);
      if (quizDone === "true" && !isRegister) {
        navigate("/driver");
      }
    }
  }, [userId, isRegister, navigate]);

  function handlePular() {
    // Salva flag para não mostrar mais o quiz para esse user
    if (userId) {
      localStorage.setItem(`quizAvenidasDone_${userId}`, "true");
    }
    navigate("/driver");
  }

  function handleResponder(opcao: string) {
    setRespostaSelecionada(opcao);
    setTimeout(() => {
      if (opcao === quiz[quizStep].resposta) setAcertos((a) => a + 1);
      if (quizStep + 1 < quiz.length) {
        setQuizStep((s) => s + 1);
        setRespostaSelecionada(null);
      } else {
        setFinalizado(true);
        // Salva flag ao finalizar quiz
        if (userId) {
          localStorage.setItem(`quizAvenidasDone_${userId}`, "true");
        }
      }
    }, 700);
  }

  useEffect(() => {
    // Se quiz finalizado e não veio do register, pode acessar dashboard
    if (finalizado && !isRegister) {
      setTimeout(() => navigate("/driver"), 1500);
    }
  }, [finalizado, isRegister, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 dark:from-[#181f3a] dark:via-[#22305a] dark:to-[#2b4170] p-6 font-mono">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-white text-center mb-8"
      >
        Guia das Avenidas de Maputo e Matola
      </motion.h1>

      {/* Tutoriais */}
      <motion.section
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold text-blue-100 mb-4">Tutoriais das Avenidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutoriais.map((tut) => (
            <motion.a
              key={tut.id}
              href={tut.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="block bg-white dark:bg-[#232c47] rounded-xl shadow-lg p-4 border-l-4 border-blue-700 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-[#28335a] dark:text-white"
            >
              <div className="font-bold text-blue-900 dark:text-blue-100 text-lg">{tut.titulo}</div>
              <div className="text-blue-800 dark:text-blue-200">{tut.descricao}</div>
              <div className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                URL: <span className="underline">{window.location.origin + tut.url}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* Quiz */}
      <motion.section
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-xl mx-auto bg-white/90 dark:bg-[#232c47] rounded-xl shadow-lg p-6 dark:text-white"
      >
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4 text-center">Quiz das Avenidas</h2>
        {!finalizado ? (
          <>
            <div className="mb-4 text-blue-900 dark:text-blue-100 font-bold">
              Pergunta {quizStep + 1} de {quiz.length}
            </div>
            <div className="mb-6 text-blue-800 dark:text-blue-200 font-semibold">
              {quiz[quizStep].pergunta}
            </div>
            <div className="flex flex-col gap-3">
              {quiz[quizStep].opcoes.map((opcao) => (
                <motion.button
                  key={opcao}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.03 }}
                  className={`px-4 py-2 rounded border text-left transition font-bold ${
                    respostaSelecionada
                      ? opcao === quiz[quizStep].resposta
                        ? "bg-green-200 border-green-600 text-green-900 dark:bg-green-700 dark:border-green-400 dark:text-white"
                        : opcao === respostaSelecionada
                        ? "bg-red-200 border-red-600 text-red-900 dark:bg-red-700 dark:border-red-400 dark:text-white"
                        : "bg-gray-100 border-gray-300 text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                      : "bg-blue-100 border-blue-400 text-blue-900 hover:bg-blue-200 dark:bg-[#28335a] dark:border-blue-400 dark:text-blue-100 dark:hover:bg-[#2b4170]"
                  }`}
                  disabled={!!respostaSelecionada}
                  onClick={() => handleResponder(opcao)}
                >
                  {opcao}
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2">
              Quiz finalizado!
            </div>
            <div className="text-blue-800 dark:text-blue-200 mb-4">
              Você acertou {acertos} de {quiz.length} perguntas.
            </div>
            <Button
              className="bg-blue-900 dark:bg-blue-700 text-white px-6 py-2 rounded font-bold"
              onClick={() => navigate("/driver")}
            >
              Ir para o Dashboard
            </Button>
            {!isRegister && (
              <Button
                variant="ghost"
                className="ml-4"
                onClick={handlePular}
              >
                Pular
              </Button>
            )}
            {isRegister && (
              <div className="text-red-600 mt-2 text-sm font-semibold">
                Complete o quiz para acessar o dashboard!
              </div>
            )}
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};