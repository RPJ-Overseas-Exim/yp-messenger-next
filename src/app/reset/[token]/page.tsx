"use client"
import React from "react"
import { ResetFormSchema, type ResetForm } from "@/lib/types/formSchema"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { CustomFormField } from "@/components/CustomFormField"
import { useParams } from "next/navigation"
import { PostRequest } from "@/lib/server-actions/request-helpers/PostRequest"

export default function ResetPassword() {
    const params = useParams()

    const form = useForm<ResetForm>({
        resolver: zodResolver(ResetFormSchema),
        defaultValues: {
            password: "",
            cpassword: ""
        }
    })

    const handleForgotPassword = async (values: ResetForm) => {
        console.log(values)
        console.log(params)
        if (values.cpassword !== values.password) return toast.warning("New password and confirm password is different", { position: "top-center" })
        try {
            const resp = await PostRequest(`/reset/${params?.token}`, values)
            if (resp?.success) {
                return toast.success(resp?.message || "Password reset successfully!", { position: "top-center" })
            }

            toast.error(resp?.message || "Something went wrong", { position: "top-center" })
        } catch (err) {
            console.log(err)
            if (err instanceof Error) {
                toast.error(err.message)
            }
        }
    }

    return (
        <div className="w-full h-screen bg-gradient-to-b from-blue-600 to-black flex items-center justify-center text-white">
            <div className="max-w-[400px] w-11/12 flex flex-col justify-center items-center gap-y-2">
                <Form {...form}>
                    <legend className="text-xl text-zinc-300 font-bold">
                        Reset Password
                    </legend>

                    <form
                        onSubmit={form.handleSubmit(handleForgotPassword)}
                        className="flex flex-col gap-y-3 w-full">

                        <CustomFormField<ResetForm>
                            form={form}
                            type="password"
                            title="New Password"
                            name="password"
                            placeholder="Enter new password"
                        />

                        <CustomFormField<ResetForm>
                            form={form}
                            type="password"
                            title="Confirm Password"
                            name="cpassword"
                            placeholder="Enter new password again"
                        />

                        <Button
                            type="submit"
                            className="py-1 text-lg font-bold">Reset Password</Button>
                    </form>
                </Form>
            </div>
        </div>
    )

}
