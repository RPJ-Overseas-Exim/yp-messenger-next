import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono, poppinsRegular, poppinsBold, poppinsBlack } from "./fonts/fonts"
import { ThemeProvider } from "@/components/context/ThemeProvider";
import { Toaster } from "@/components/ui/sonner"
import { JotaiProvider } from "@/components/context/JotaiProvider";
import { Provider } from "jotai"

export const metadata: Metadata = {
    title: "WWC - messenger",
    description: "World Wide Clothing messenger for WWC customers to place orders best prices in the market.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${poppinsRegular.variable} ${poppinsBold.variable} ${poppinsBlack.variable} ${geistMono.variable} antialiased h-dvh`}
            >
                <ThemeProvider attribute="class">
                    <Provider>
                        <JotaiProvider>
                            {children}
                        </JotaiProvider>
                    </Provider>
                </ThemeProvider>
                <Toaster richColors closeButton />
            </body>
        </html>
    );
}
