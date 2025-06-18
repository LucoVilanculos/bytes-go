import { Button } from '../components/ui/button'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'   
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { toast, Toaster } from 'react-hot-toast'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    } from '../components/ui/form'  
import { createUser } from '../services/users'


    const FormSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
    email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email'),
    password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters long')
        .max(20, 'Password must be at most 20 characters long'),
    confirmPassword: z
        .string({ required_error: 'Password confirmation is Required' })
        .min(6, 'Password confirmation must be at least 6 characters long')
        .max(20, 'Password confirmation must be at most 20 characters long')
        })
export const RegisterForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(user: z.infer<typeof FormSchema>) {
    if (user.password !== user.confirmPassword) {
            toast.error('Passwords do not match, please try again')
        }else {
    try {
        
            const response = await createUser({data: { name: user.name, email: user.email, password: user.password }})

        if (response.status===201){
           // console.log('Usuário registrado:', user)
            toast.success(`Profile created successfully`,{id:`1`})
            window.location.href = '/login'
        } 
        if (response.status===400){
          //  console.log(`Ja existe usuario cadastrado com esse email`)
            toast.error(`There is already a user registered with that email, try again`,{id:`1`})
        }
        }
 catch (error) {
      console.error(error)
    toast.error('Error registering user. Please try again later.', {
    id: '1',
    })
    }
  }
}

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md font-mono">
            <CardHeader>
            <CardTitle className='font-light text-2xl text-center'>CREATE ACCOUNT</CardTitle>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem className="mb-4">
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem className="mb-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem className="mb-4">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                    <FormItem className="mb-4">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                        <Input type="password" placeholder="Confirm your password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            

                <div className='text-center'>
                    <Toaster/>
                   <Button  type="submit">Create</Button> 
                </div>  
                </form>
            </Form>
            <div className='text-center'>
                <p>Already have an account?
                <Link className='text-center hover:underline pl-1'  to="/login">Login Here</Link></p>
            </div>
            </CardContent>
        </Card>
    </div>
    )
}