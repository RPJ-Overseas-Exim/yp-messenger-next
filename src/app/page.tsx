"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { CustomFormField } from "@/components/CustomFormField"

export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(16),
})
type LoginForm = z.infer<typeof LoginFormSchema>

export default function Home() {
    const form = useForm<LoginForm>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const handleSubmit = (values: LoginForm) => {
        console.log(values)
    }

    return (
        <div className="w-full h-screen bg-muted flex items-center justify-center">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-[400px] space-y-5 w-3/4 bg-background rounded-xl py-5">
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

                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
