"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function SideBarButton({ name, link, children }: { name: string; link: string; children: React.ReactNode; }) {
    const path = usePathname()

    return (
        <Link href={link} className="w-full h-full flex items-center justify-center" >
            <div className={`flex flex-col items-center gap-y-2 ${path === link && "text-amber-500"}`}>
                <div>
                    {children}
                </div>
                <div className="text-xs">
                    {name}
                </div>
            </div>
        </Link>
    )
}
