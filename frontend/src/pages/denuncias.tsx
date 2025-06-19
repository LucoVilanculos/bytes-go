import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllReports } from "../services/reports"; // Implemente este serviço se ainda não existir


import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from "../components/ui/dialog"


function MotivoCheckbox({ id, label, checked, onChange }: any) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        className="accent-blue-600"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

 export function Denuncia() {
  const [selecionados, setSelecionados] = useState<string[]>([])
  const [reports, setReports] = useState<any[]>([])

  // Buscar denúncias existentes ao carregar a página
  useEffect(() => {
    getAllReports()
      .then(setReports)
      .catch(() => setReports([]))
  }, [])

  const opcoes = [
    { id: "ligacoes", label: "Ligações indesejadas" },
    { id: "cobrancas", label: "Cobranças ilícitas" },
    { id: "cancelamento", label: "Cancelamento de viagem sem explicações" },
  ]
   const toggleMotivo = (id: string) => {
    setSelecionados((prev) =>
      prev.includes(id)
        ? prev.filter((motivo) => motivo !== id)
        : prev.length < 2
        ? [...prev, id]
        : prev
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-white text-center mb-10"
      >
        Denúncias
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold text-blue-100 mb-6 text-center"
      >
        Últimas denúncias
      </motion.h2>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {reports.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-blue-100 text-center col-span-2"
            >
              Nenhuma denúncia encontrada.
            </motion.div>
          ) : (
            reports.map((report, idx) => (
              <motion.div
                key={report._id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white dark:bg-[#232c47] rounded-xl shadow-lg p-4 flex flex-col gap-2 border-l-4 border-blue-700 dark:border-blue-400 dark:text-white"
              >
                <div className="font-bold text-blue-900">Motivo(s): {report.reason}</div>
                <div className="text-blue-800">{report.description}</div>
                <div className="text-xs text-gray-400">
                  {report.createdAt && new Date(report.createdAt).toLocaleString()}
                </div>
                <div className="text-xs text-blue-700 font-semibold">
                  Status: {report.status || "pendente"}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <Dialog>
        <DialogTrigger className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Denunciar
        </DialogTrigger>
        <DialogContent className="bg-blue-50 dark:bg-[#28335a] border-blue-400 text-blue-900 dark:text-white">
          <DialogHeader>
            <DialogTitle>Denunciar conteúdo</DialogTitle>
            <DialogDescription>Selecione o motivo:</DialogDescription>
          </DialogHeader>

          <form className="space-y-4 mt-4">
            {opcoes.map((opcao) => (
              <MotivoCheckbox
                key={opcao.id}
                id={opcao.id}
                label={opcao.label}
                checked={selecionados.includes(opcao.id)}
                onChange={() => toggleMotivo(opcao.id)}
              />
            ))}
            <textarea
              placeholder="Outros detalhes (opcional)"
              className="w-full p-3 border border-blue-200 dark:border-blue-500 rounded bg-white dark:bg-[#232c47] text-blue-900 dark:text-white"
              rows={4}
            />

            <DialogFooter>
              <DialogClose className="bg-gray-300 text-gray-800 px-3 py-2 rounded hover:bg-gray-400">
                Cancelar
              </DialogClose>
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-60"
                disabled={selecionados.length === 0}
              >
                Enviar denúncia
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
}
