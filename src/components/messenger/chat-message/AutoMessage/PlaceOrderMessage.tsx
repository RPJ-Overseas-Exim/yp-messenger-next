import React from "react"
import { OrderForm, OrderFormSchema } from "@/lib/types/formSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { products } from "@/public/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function PlaceOrderMessage({
    handleSubmit,
    handleCancel,
    formLabel,
    formDescription,
    disabled
}: {
    handleSubmit: (data: OrderForm) => void;
    handleCancel: () => void;
    formLabel: string;
    formDescription?: string;
    disabled: boolean;
}) {
    const orderForm = useForm<OrderForm>({
        resolver: zodResolver(OrderFormSchema),
        defaultValues: {
            products: []
        }
    })

    return <Form {...orderForm}>
        <form onSubmit={orderForm.handleSubmit(handleSubmit)} className="flex flex-col gap-y-2 mb-3">
            <FormField
                control={orderForm.control}
                name="products"
                render={() => (
                    <FormItem>
                        <div>
                            <FormLabel>{formLabel}</FormLabel>
                            <FormDescription>{formDescription}</FormDescription>
                        </div>
                        {products.map((product) => (
                            <FormField
                                key={product.id}
                                control={orderForm.control}
                                name="products"
                                render={({ field }) => {
                                    return (
                                        <FormItem
                                            key={product.id}
                                            className="flex flex-row products-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(product.id)}
                                                    disabled={disabled}
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...field.value, product.id])
                                                            : field.onChange(
                                                                field.value?.filter(
                                                                    (value) => value !== product.id
                                                                )
                                                            )
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {product.label}
                                            </FormLabel>
                                        </FormItem>
                                    )
                                }}
                            />
                        ))}
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="flex flex-row gap-x-2">
                <Button
                    disabled={disabled}
                    className="text-sm font-semibold h-auto py-1"
                    type="submit"
                >
                    Submit
                </Button>
                <Button
                    disabled={disabled}
                    className="text-sm font-semibold h-auto py-1"
                    type="button"
                    onClick={handleCancel}
                >
                    Cancel Order
                </Button>
            </div>

        </form>
    </Form>
}
