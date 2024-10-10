import React from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { payments } from "@/public/payments"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentForm, PaymentFormSchema } from "@/lib/types/formSchema";
import { Button } from "@/components/ui/button";


export function ChoosePaymentMessage({
    handleSubmit,
    handleCancel,
    formLabel,
    formDescription,
    disabled
}: {
    handleSubmit: (data: PaymentForm) => void;
    handleCancel: () => void;
    formLabel: string;
    formDescription?: string;
    disabled: boolean;
}) {
    const paymentForm = useForm<PaymentForm>({
        resolver: zodResolver(PaymentFormSchema),
    })

    return (
        <Form {...paymentForm}>
            <form onSubmit={paymentForm.handleSubmit(handleSubmit)} className="mb-3 flex flex-col gap-y-2" >
                <FormField
                    control={paymentForm.control}
                    name="payment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{formLabel}</FormLabel>
                            <FormDescription>{formDescription}</FormDescription>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={disabled}
                                    className="flex flex-col space-y-1"
                                >
                                    {payments.map((payment) => (
                                        <FormItem key={payment.id} className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={payment.id} />
                                            </FormControl>
                                            <FormLabel>
                                                {payment.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-x-2">
                    <Button
                        className="text-sm font-semibold h-auto py-1"
                        disabled={disabled}
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button
                        className="text-sm font-semibold h-auto py-1"
                        disabled={disabled}
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    )
}
