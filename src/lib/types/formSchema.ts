import { z } from "zod"

export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(16),
})

export type LoginForm = z.infer<typeof LoginFormSchema>

export const RegisterFormSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(3).max(16),
    cpassword: z.string().min(3).max(16)
})

export type RegisterForm = z.infer<typeof RegisterFormSchema>

export const ResetFormSchema = z.object({
    password: z.string().min(3).max(16),
    cpassword: z.string().min(3).max(16)
})

export type ResetForm = z.infer<typeof ResetFormSchema>
