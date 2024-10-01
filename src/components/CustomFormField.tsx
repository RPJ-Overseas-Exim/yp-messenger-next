"use client"
import {
    FormField,
    FormLabel,
    FormItem,
    FormControl,
    FormDescription,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"

export function CustomFormField<T extends FieldValues>({ form, type, title, name, description, placeholder }: {
    form: UseFormReturn<T, any, undefined>;
    title: string;
    name: Path<T>;
    type: string;
    description?: string;
    placeholder?: string;
}) {
    return <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>
                    {title}
                </FormLabel>

                <FormControl>
                    <Input placeholder={placeholder} {...field} type={type} />
                </FormControl>

                <FormDescription>
                    {description}
                </FormDescription>

                <FormMessage />
            </FormItem>
        )}
    />
}
