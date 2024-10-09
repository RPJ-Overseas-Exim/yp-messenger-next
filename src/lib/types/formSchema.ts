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

export const OrderFormSchema = z.object({
    products: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one product"
    })
})

export type OrderForm = z.infer<typeof OrderFormSchema>

export const PillsFormSchema = z.object({
    pills: z.enum(["90 pills", "180 pills"], {
        required_error: "You have to select a pill amount"
    })
})

export type PillsForm = z.infer<typeof PillsFormSchema>

export const PaymentFormSchema = z.object({
    payment: z.enum(["paypal", "credit card", "debit card", "cashapp", "venmo", "western union", "moneygram", "bitcoin"], {
        required_error: "You have to select a payment mode"
    })
})

export type PaymentForm = z.infer<typeof PaymentFormSchema>
