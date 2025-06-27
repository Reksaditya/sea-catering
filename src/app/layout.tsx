import type { Metadata } from "next";
import { Monda, Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast"
import "./globals.css";

const monda = Monda({
  variable: "--font-monda",
  subsets: ["latin"],
})

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SEA Catering: Your Personalized Healthy Meal Service!",
  description: "Get your food delivered fresh across Indonesia!",
  icons: {
    icon: {
      media: "all",
      type: "image/x-icon",
      url: "/headlogo.png"
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${monda.variable} antialiased`}
      >
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
