import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  driver: "Motorista",
  customer: "Passageiro",
  user: "Usuário",
};

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(true);

  // Pega o usuário logado
  const session = localStorage.getItem("session");
  const user = session ? JSON.parse(session) : null;
  const role = user?.role || "visitante";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, 2200); // 2.2 segundos
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="text-white text-4xl font-extrabold tracking-widest mb-4"
          >
            BYTES-GO
          </motion.div>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-blue-100 text-xl font-semibold"
          >
            {roleLabels[role] || "Visitante"}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}