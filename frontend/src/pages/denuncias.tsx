import { useState } from "react"


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
    <Dialog>
      <DialogTrigger className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Denunciar
      </DialogTrigger>
      <DialogContent className="bg-blue-50 border-blue-400 text-blue-900">
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
            className="w-full p-3 border border-blue-200 rounded bg-white text-blue-900"
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
