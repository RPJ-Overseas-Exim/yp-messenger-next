import React from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PillsForm, PillsFormSchema } from "@/lib/types/formSchema";
import { Button } from "@/components/ui/button";


export function PillsAmountMessage({
    handleSubmit,
    handleCancel,
    formLabel,
    formDescription,
    disabled
}: {
    handleSubmit: (data: PillsForm) => void;
    handleCancel: () => void;
    formLabel: string;
    formDescription?: string;
    disabled: boolean;
}) {
    const paymentForm = useForm<PillsForm>({
        resolver: zodResolver(PillsFormSchema),
    })

    const pills = [{ id: "90 pills", label: "90 Pills" }, { id: "180 pills", label: "180 Pills" }]

    return (
        <Form {...paymentForm}>
            <form onSubmit={paymentForm.handleSubmit(handleSubmit)} className="mb-3 flex flex-col gap-y-2" >
                <FormField
                    control={paymentForm.control}
                    name="pills"
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
                                    {pills.map((pill) => (
                                        <FormItem key={pill.id} className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={pill.id} />
                                            </FormControl>
                                            <FormLabel>
                                                {pill.label}
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
