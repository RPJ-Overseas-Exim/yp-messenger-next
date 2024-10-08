"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { CustomFormField } from "@/components/CustomFormField"
import { LoginFormSchema, type LoginForm } from "@/lib/types/formSchema"
import Link from "next/link"
import { Login } from "@/lib/server-actions/Login"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useSetAtom } from "jotai"
import { roleAtom } from "@/lib/jotai/atoms"

export default function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const setRole = useSetAtom(roleAtom)
    const router = useRouter()

    const form = useForm<LoginForm>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const handleSubmit = async (values: LoginForm) => {
        setIsLoading(true)
        try {
            const { email, password } = values
            const login = await Login({ email, password })

            if (login?.success) {
                toast.success(login?.message || "Login success", { position: "top-center" })
                setRole(login?.role)
                setIsLoading(false)
                return router.push("/messenger")
            } else {
                toast.error(login?.message || "Failed to login", { position: "top-center" })
            }
        } catch (err) {
            console.log(err)
            toast.error("Something went wrong. Try again later", { position: "top-center" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full h-screen bg-gradient-to-b from-blue-600 to-black flex flex-col gap-y-2 items-center justify-center">
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

                        <div className="w-full flex flex-col">
                            <CustomFormField<LoginForm>
                                form={form}
                                type={"password"}
                                title={"Password"}
                                name={"password"}
                                placeholder={"Enter your password"}
                            />

                            <Link
                                href="/forgot"
                                className="text-xs text-muted-foreground hover:text-foreground self-end"
                            >
                                Forgot Password
                            </Link>
                        </div>

                        <Button type="submit" className="w-full text-lg font-bold" disabled={isLoading}>
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                            Login
                        </Button>
                    </div>
                </form>
            </Form>

            <div className="text-lg text-muted-foreground">
                Dont have an account?
                <Link href="/register" className="text-amber-600">Register</Link>
            </div>
        </div>
    );
}
