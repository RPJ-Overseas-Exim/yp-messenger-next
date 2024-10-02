import React from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export function MessageBox(){
    return (
            <div className="border-t border-border">
                <section className="flex gap-2 w-11/12 mx-auto py-4 ">
                    <Input maxLength={1000} />
                    <Button size={"icon"}>
                        <Send size={"20"} />
                    </Button>
                </section>
            </div>
    )
}
