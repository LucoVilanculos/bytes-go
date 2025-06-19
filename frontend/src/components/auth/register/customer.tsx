import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

import { createUser } from "../../../services/users";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form";

const CustomerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password confirmation is required"),
  phone: z.string().min(1, "Phone is required"),
  bairro: z.string().min(1, "Bairro is required"),
  genero: z.string().min(1, "Gênero is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const RegisterCustomerForm = () => {
  const form = useForm<z.infer<typeof CustomerSchema>>({
    resolver: zodResolver(CustomerSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof CustomerSchema>) {
    try {
      await createUser({ data: { ...data, role: "customer" } });
      toast.success("Profile created successfully");
      window.location.href = "/login";
    } catch (error) {
      toast.error("Error registering user. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 dark:from-[#181f3a] dark:via-[#22305a] dark:to-[#2b4170] p-2">
      <div className="flex flex-col md:flex-row-reverse w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden bg-white/90 dark:bg-[#232c47] dark:text-white">
        {/* Imagem e mensagem à direita */}
        <div className="flex flex-col justify-between items-center md:w-1/2 w-full p-8 relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 dark:from-[#181f3a] dark:via-[#22305a] dark:to-[#2b4170]">
          <div className="w-full">
            <h1 className="text-4xl font-bold text-white text-center drop-shadow mb-2">BYTES-GO</h1>
            <p className="text-blue-100 text-center text-lg font-light mb-8">
              Junte-se à Bytes-Go! Cadastre-se e aproveite a mobilidade urbana de forma rápida, segura e inteligente.
            </p>
          </div>
          <img
            src="https://cdn.discordapp.com/attachments/1363901798192120038/1384926762198237388/ChatGPT_Image_18_06_2025_20_33_17.png?ex=6854350e&is=6852e38e&hm=2cb022c8af06b283a4738d38dfafad363571e6229dd30e983fc48ec08dbf05e2&"
            alt="GMC Taxi"
            className="w-full max-w-xs mx-auto drop-shadow-xl"
            draggable={false}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col justify-center p-8"
        >
          <button
            className="mb-4 flex items-center text-blue-900 dark:text-blue-100 hover:text-blue-700 dark:hover:text-blue-300 transition w-fit"
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Voltar
          </button>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-blue-900 dark:text-blue-100">Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome completo"
                      {...field}
                      className="bg-white dark:bg-[#28335a] dark:text-white border border-blue-300 dark:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-blue-900 dark:text-blue-100">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="bg-white dark:bg-[#28335a] dark:text-white border border-blue-300 dark:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-blue-900 dark:text-blue-100">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Senha"
                      {...field}
                      className="bg-white dark:bg-[#28335a] dark:text-white border border-blue-300 dark:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-blue-900 dark:text-blue-100">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirme a senha"
                      {...field}
                      className="bg-white dark:bg-[#28335a] dark:text-white border border-blue-300 dark:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-blue-900 dark:text-blue-100">Telefone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Telefone"
                      {...field}
                      className="bg-white dark:bg-[#28335a] dark:text-white border border-blue-300 dark:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="bairro" render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-blue-900 dark:text-blue-100">Bairro</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bairro"
                      {...field}
                      className="bg-white dark:bg-[#28335a] dark:text-white border border-blue-300 dark:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="genero" render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-blue-900 dark:text-blue-100">Gênero</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Gênero"
                      {...field}
                      className="bg-white dark:bg-[#28335a] dark:text-white border border-blue-300 dark:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Toaster />
              <Button type="submit" className="w-full bg-blue-900 dark:bg-blue-700 text-white">
                Criar Conta
              </Button>
            </form>
            <div className='text-center mt-2'>
              <p>
                Já tem conta?
                <Link className='text-center hover:underline pl-1' to="/login">Login Here</Link>
              </p>
            </div>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};