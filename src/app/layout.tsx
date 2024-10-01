import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar"
import { geistSans, geistMono, poppinsRegular, poppinsBold, poppinsBlack } from "./fonts/fonts"
import { ThemeProvider } from "@/components/context/ThemeProvider";


export const metadata: Metadata = {
    title: "WWC",
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
                className={`${geistSans.variable} ${poppinsRegular.variable} ${poppinsBold.variable} ${poppinsBlack.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider attribute="class">
                    <Navbar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
