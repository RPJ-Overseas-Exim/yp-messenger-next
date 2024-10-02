import { z } from "zod"
import { LoginFormSchema, RegisterFormSchema } from "./formSchema"

export type LoginForm = z.infer<typeof LoginFormSchema>
export type RegisterForm = z.infer<typeof RegisterFormSchema>
