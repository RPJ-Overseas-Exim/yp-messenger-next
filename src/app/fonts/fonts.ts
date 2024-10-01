import localFont from "next/font/local";

export const geistSans = localFont({
  src: "./GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
export const geistMono = localFont({
  src: "./GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const poppinsRegular = localFont({
    src:"./Poppins-Regular.ttf",
    variable: "--font-poppins-reg",
    weight:"400"
})
export const poppinsBold = localFont({
    src:"./Poppins-Bold.ttf",
    variable: "--font-poppins-bold",
    weight:"400"
})
export const poppinsBlack = localFont({
    src:"./Poppins-Bold.ttf",
    variable: "--font-poppins-black",
    weight:"400"
})
