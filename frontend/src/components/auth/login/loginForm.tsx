import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../ui/card'
import { Input } from '../../ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'
import toast, { Toaster } from 'react-hot-toast'
import { login } from '../../../services/auth'

const FormSchema = z.object({
   email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email'),
    password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters long')
        .max(20, 'Password must be at most 20 characters long'),
})

export const LoginForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const navigate = useNavigate();

  async function onSubmit(user: z.infer<typeof FormSchema>) {
    try {
      await login({ email: user.email, password: user.password });
      toast.success('Login successful!', { id: "1" });

      const session = localStorage.getItem("session");
      let role = "";
      if (session) {
        try {
          role = JSON.parse(session).role;
        } catch {}
      }

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "driver") {
        navigate("/driver-avenidas");
      } else {
        navigate("/user");
      }
    } catch (error) {
      toast.error("Incorrect Email or Password. Please check your credentials.", { id: "1" });
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 dark:from-[#181f3a] dark:via-[#22305a] dark:to-[#2b4170] p-2">
      <div className="flex flex-col md:flex-row-reverse w-full max-w-4xl bg-white/90 dark:bg-[#232c47] rounded-xl shadow-2xl overflow-hidden dark:text-white">
        <div className="flex flex-col justify-between items-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 dark:from-[#181f3a] dark:via-[#22305a] dark:to-[#2b4170] md:w-1/2 w-full p-8 relative">
          <div className="w-full">
            <h1 className="text-4xl font-bold text-white text-center drop-shadow mb-2">BYTES-GO</h1>
            <p className="text-blue-100 text-center text-lg font-light mb-8">
              Bem-vindo de volta! Faça login para acessar sua conta e aproveitar a melhor experiência de mobilidade urbana.
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
          <Card className="w-full font-mono shadow-none border-none bg-transparent dark:bg-transparent">
            <CardHeader>
              <CardTitle className='font-light text-2xl text-center text-blue-900 dark:text-blue-100'>LOGIN</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
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
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-900 dark:text-blue-100">Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                            className="bg-white dark:bg-[#28335a] dark:text-white border border-blue-300 dark:border-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex-col gap-2 text-center">
                    <Toaster />
                    <Button type="submit" className="w-full bg-blue-900 dark:bg-blue-700 text-white">
                      Sign In
                    </Button>
                  </div>
                </form>
              </Form>
              <CardAction className="w-full text-center pt-1">
                <p className="text-sm">
                  Não tem uma conta?
                  <Link
                    to="/register"
                    className="text-blue-900 dark:text-blue-100 hover:underline pl-1 "
                  >
                    Clique aqui para registrar
                  </Link>
                </p>
              </CardAction>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}