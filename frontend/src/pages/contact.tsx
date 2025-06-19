import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { motion } from "framer-motion";

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  alert('Successfully submitted');
};

export function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 ">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl p-4"
      >
        {/* Texto de contato */}
        <section className="flex-1 max-w-md text-white">
          <h1 className="text-3xl font-bold mb-6">Contacte-nos</h1>
          <article className="text-base mt-6 text-blue-100">
         <div>
          A BytesGo valoriza cada contacto. Se tiver dúvidas, sugestões ou qualquer questão, preencha o formulário, a nossa equipa analisará a sua mensagem com atenção e responderá o mais breve possível. Estamos aqui para garantir que a sua experiência com a BytesGo seja sempre segura, prática e satisfatória.


         </div>
          </article>
        </section>

        {/* Formulário */}
        <Card className="w-full max-w-md shadow-2xl border-none bg-white/90 dark:bg-[#232c47] dark:text-white">
          <CardContent>
            <form onSubmit={handleSubmit} className="py-4">
              <div className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    <span className="font-bold">Nome</span> <span className="text-gray-500">(Obrigatório)</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    className="rounded-md border border-blue-700 focus:ring-2 focus:ring-blue-400 bg-white dark:bg-[#28335a] dark:text-white dark:border-blue-400"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    <span className="font-bold">E-mail</span> <span className="text-gray-500">(Obrigatório)</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="rounded-md border border-blue-700 focus:ring-2 focus:ring-blue-400 bg-white dark:bg-[#28335a] dark:text-white dark:border-blue-400"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phoneNumber">
                    <span className="font-bold">Contacto</span> <span className="text-gray-500">(Opcional)</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    className="rounded-md border border-blue-700 focus:ring-2 focus:ring-blue-400 bg-white dark:bg-[#28335a] dark:text-white dark:border-blue-400"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">
                    <span className="font-bold">Morada</span> <span className="text-gray-500">(Opcional)</span>
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    className="rounded-md border border-blue-700 focus:ring-2 focus:ring-blue-400 bg-white dark:bg-[#28335a] dark:text-white dark:border-blue-400"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">
                    <span className="font-bold">Assunto</span> <span className="text-gray-500">(Obrigatório)</span>
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    className="rounded-md border border-blue-700 focus:ring-2 focus:ring-blue-400 bg-white dark:bg-[#28335a] dark:text-white dark:border-blue-400"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">
                    <span className="font-bold">Descrição</span> <span className="text-gray-500">(Obrigatório)</span>
                  </Label> 
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    className="rounded-md border border-blue-700 focus:ring-2 focus:ring-blue-400 bg-white py-2 px-4"
                  />
                </div>
              </div>
              <CardFooter className="flex-col gap-2 px-0">
                <Button
                  type="submit"
                  className="w-full mt-6 rounded-full bg-blue-900 text-white font-semibold hover:scale-105 hover:bg-blue-800 transition"
                >
                  Submeter
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
