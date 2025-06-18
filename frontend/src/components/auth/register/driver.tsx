import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUser } from "../../../services/users";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CarSchema = z.object({
  brand: z.string().min(1, "Marca obrigatória"),
  carModel: z.string().min(1, "Modelo obrigatório"),
  year: z.coerce.number().min(1900, "Ano inválido"),
  color: z.string().min(1, "Cor obrigatória"),
  plateNumber: z.string().min(1, "Matrícula obrigatória"),
  imageUrl: z.string().optional(),
});

const DriverSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password confirmation is required"),
  phone: z.string().min(1, "Phone is required"),
  bairro: z.string().min(1, "Bairro is required"),
  genero: z.string().min(1, "Gênero is required"),
  car: CarSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const RegisterDriverForm = () => {
  const form = useForm<z.infer<typeof DriverSchema>>({
    resolver: zodResolver(DriverSchema),
  });

  async function onSubmit(data: z.infer<typeof DriverSchema>) {
    try {
      await createUser({ data: { ...data, role: "driver" } });
      toast.success("Profile created successfully");
      window.location.href = "/login";
    } catch (error) {
      toast.error("Error registering user. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center   p-2">
      <div className="flex flex-col md:flex-row-reverse w-full max-w-4xl bg-white/90 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col justify-between items-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 md:w-1/2 w-full p-8 relative">
          <div className="w-full">
            <h1 className="text-4xl font-bold text-white text-center drop-shadow mb-2">BYTES-GO</h1>
            <p className="text-blue-100 text-center text-lg font-light mb-8">
              Cadastre-se como motorista e faça parte da revolução da mobilidade urbana com a Bytes-Go!
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=400&q=80"
            alt="GMC Taxi"
            className="w-full max-w-xs drop-shadow-xl"
            draggable={false}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col justify-center p-8"
        >
          
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Nome</FormLabel>
                    <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="Email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input type="password" placeholder="Senha" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl><Input type="password" placeholder="Confirme a senha" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Telefone</FormLabel>
                    <FormControl><Input placeholder="Telefone" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="bairro" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Bairro</FormLabel>
                    <FormControl><Input placeholder="Bairro" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="genero" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Gênero</FormLabel>
                    <FormControl><Input placeholder="Gênero" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                {/* Campos do carro */}
                <div className="text-blue-900 font-semibold mb-2 mt-4">Dados do Carro</div>
                <FormField control={form.control} name="car.brand" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Marca</FormLabel>
                    <FormControl><Input placeholder="Marca do carro" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="car.carModel" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Modelo</FormLabel>
                    <FormControl><Input placeholder="Modelo do carro" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="car.year" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Ano</FormLabel>
                    <FormControl><Input type="number" placeholder="Ano do carro" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="car.color" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Cor</FormLabel>
                    <FormControl><Input placeholder="Cor do carro" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="car.plateNumber" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Matrícula</FormLabel>
                    <FormControl><Input placeholder="Matrícula do carro" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="car.imageUrl" render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Imagem (opcional)</FormLabel>
                    <FormControl><Input placeholder="URL da imagem do carro" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Toaster />
                <Button type="submit" className="w-full">Criar Conta</Button>
              </form>
              <div className='text-center mt-2'>
                <p>Já tem conta?
                  <Link className='text-center hover:underline pl-1' to="/login">Login Here</Link>
                </p>
              </div>
            </Form>
          
        </motion.div>
      </div>
    </div>
  );
};