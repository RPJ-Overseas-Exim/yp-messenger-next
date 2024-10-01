import type { Metadata } from "next";
import "./globals.css";
import {Navbar} from "@/components/Navbar"
import {geistSans, geistMono, poppinsRegular, poppinsBold, poppinsBlack } from "./fonts/fonts"


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
      <Navbar/>
        {children}
      </body>
    </html>
  );
}
