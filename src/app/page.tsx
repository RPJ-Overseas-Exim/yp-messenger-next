"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { CustomFormField } from "@/components/CustomFormField"
import { LoginFormSchema } from "@/lib/formSchema"
import type { LoginForm } from "@/lib/types"
import Link from "next/link"
import { Login } from "@/lib/server-actions/Login"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function Home() {
    const router = useRouter()

    const form = useForm<LoginForm>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const handleSubmit = async (values: LoginForm) => {
        try {
            const { email, password } = values
            const login = await Login({ email, password })

            if (login !== false && login?.success) {
                toast.success("Login success")
                return router.push("/messenger")
            } else {
                toast.error("Failed to login")
            }

        } catch (err) {
            toast.error("Something went wrong. Try again later")
        }
    }

    return (
        <div className="w-full h-screen bg-gradient-to-b from-blue-600 to-transparent flex flex-col gap-y-2 items-center justify-center">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-[400px] space-y-5 w-11/12 bg-background rounded-xl py-5">
                    <legend className="text-2xl font-bold text-center font-poppins" >Login</legend>

                    <hr className="border border-border w-full rounded-lg" />

                    <div className="space-y-5 px-5">
                        <CustomFormField<LoginForm>
                            form={form}
                            type={"email"}
                            title={"Email"}
                            name={"email"}
                            placeholder={"Enter your email"}
                        />

                        <CustomFormField<LoginForm>
                            form={form}
                            type={"password"}
                            title={"Password"}
                            name={"password"}
                            placeholder={"Enter your password"}
                        />

                        <Button type="submit" className="w-full text-lg font-bold">Login</Button>
                    </div>
                </form>
            </Form>

            <div className="text-lg text-muted-foreground">Dont have an account? <Link href="/register" className="text-amber-600">Register</Link></div>
        </div>
    );
}
