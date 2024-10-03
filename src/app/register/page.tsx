"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema } from "@/lib/types/formSchema"
import type { RegisterForm } from "@/lib/types/types"
import { CustomFormField } from "@/components/CustomFormField";
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import Link from "next/link"

export default function Register() {
    const form = useForm<RegisterForm>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })

    const handleSubmit = (values: RegisterForm) => {
        console.log(values)
    }

    return (
        <div className="w-full h-screen bg-gradient-to-b from-blue-600 to-transparent flex flex-col gap-y-2 items-center justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-[400px] space-y-5 w-11/12 bg-background rounded-xl py-5">
                    <legend className="text-2xl font-bold text-center font-poppins" >Register</legend>

                    <hr className="border border-transparent w-full rounded-lg" />

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

                        <Button type="submit" className="w-full text-lg font-bold" >Register</Button>

                    </div>
                </form>
            </Form>

            <div className="text-lg text-muted-foreground">Already have an account? <Link href="/" className="text-amber-600">Login</Link></div>
        </div>
    )

}
