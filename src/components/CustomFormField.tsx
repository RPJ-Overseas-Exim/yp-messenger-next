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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { Button } from "./ui/button";

export function CustomFormField<T extends FieldValues>({ form, type, title, name, description, placeholder }: {
    form: UseFormReturn<T>;
    title: string;
    name: Path<T>;
    type: string;
    description?: string;
    placeholder?: string;
}) {
    const [isSecure, setIsSecure] = useState(true)

    return <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>
                    {title}
                </FormLabel>

                <FormControl>
                    {name === "password" || name === "cpassword"
                        ? (
                            <div className="w-full relative flex items-center text-foreground">
                                <Input placeholder={placeholder} {...field} type={isSecure ? type : "text"} />
                                <Button
                                    type="button"
                                    onClick={() => setIsSecure(!isSecure)}
                                    className="absolute right-0 bg-transparent hover:bg-transparent active:bg-transparent text-muted-foreground">
                                    {
                                        isSecure
                                            ? <Eye size={24} />
                                            : <EyeOff size={24} />
                                    }
                                </Button>
                            </div>
                        ) : (
                            <Input placeholder={placeholder} {...field} type={type} />
                        )
                    }
                </FormControl>

                <FormDescription>
                    {description}
                </FormDescription>

                <FormMessage />
            </FormItem>
        )}
    />
}

