"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema, type RegisterForm } from "@/lib/types/formSchema"
import { CustomFormField } from "@/components/CustomFormField";
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { PostRequest } from "@/lib/server-actions/request-helpers/PostRequest";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const form = useForm<RegisterForm>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            cpassword: ""
        }
    })

    const handleSubmit = async (values: RegisterForm) => {
        if (!values.cpassword || !values.email || !values.password || !values.username) {
            return toast.warning("Please provide all the credentials")
        }

        if (values.cpassword !== values.password) {
            return toast.error("Confirm password and password is different", { position: "top-center" })
        }

        setIsLoading(true)
        try {
            const resp = await PostRequest("/register", values)

            if (resp?.success) {
                setIsLoading(false)
                toast.success(resp?.message || "Registered successfully", { position: "top-center" })
                return router.push("/")
            } else {
                toast.error(resp?.message || "Something went wrong", { position: "top-center" })
            }
        } catch (err) {
            console.log("Register error: ", err)
            if (err instanceof Error) {
                toast.error(err.message, { position: "top-center" })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full h-screen bg-gradient-to-b from-blue-600 to-black flex flex-col gap-y-2 items-center justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-[400px] space-y-5 w-11/12 bg-background rounded-xl py-5">
                    <legend className="text-2xl font-bold text-center font-poppins" >Register</legend>

                    <hr className="border border-border w-full rounded-lg" />

                    <div className="px-5 space-y-5">
                        <CustomFormField<RegisterForm>
                            title={"Username"}
                            name={"username"}
                            form={form}
                            type="text"
                            placeholder="Enter username"
                        />

                        <CustomFormField<RegisterForm>
                            title={"Email"}
                            name={"email"}
                            form={form}
                            type="email"
                            placeholder="Enter email"
                        />

                        <CustomFormField<RegisterForm>
                            title={"Password"}
                            name={"password"}
                            form={form}
                            type="password"
                            placeholder="Enter password"
                        />

                        <CustomFormField<RegisterForm>
                            title={"Confirm Password"}
                            name={"cpassword"}
                            form={form}
                            type="password"
                            placeholder="Enter confirm password"
                        />

                        <Button type="submit" className="w-full text-lg font-bold" disabled={isLoading} >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                            Register
                        </Button>

                    </div>
                </form>
            </Form>

            <div className="text-lg text-muted-foreground">
                Already have an account?
                <Link href="/" className="text-amber-600">Login</Link>
            </div>
        </div>
    )

}
