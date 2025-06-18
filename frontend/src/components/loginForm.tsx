import { Button } from '../components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import toast, { Toaster } from 'react-hot-toast'

import { login } from '../services/auth'


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
  })

  async function onSubmit(user: z.infer<typeof FormSchema>) {
    try {
      const response = await login({
        data: { email: user.email, password: user.password },
      })
      if (response.status === 200) {
        //console.log("conseguiu fazer login")
        toast.success('Login successful!',{id:"1"})
        window.location.href = '/'
      } else {
       // console.log("não conseguiu fazer login")
        toast.error("Incorrect Email or Password. Please check your credentials.",{id:"1"})
      }
    } catch (error) {
      console.error(error)
      toast.error('Error logging in. Please try again later.', {
        id: '1',
      })
    }
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <Card className="w-full max-w-sm m-auto font-mono">
          <CardHeader>
            <CardTitle className='font-light text-2xl text-center'>LOGIN</CardTitle>
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex-col gap-2 text-center">
                  <Toaster />
                  <Button type="submit">Sign In</Button>
                </div>
              </form>
            </Form>
            <CardAction className="w-full text-center pt-1">
              <p className="text-sm">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-black hover:underline pl-1 "
                >
                  Click here to regist
                </Link>
              </p>
            </CardAction>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
