import type { Metadata } from "next";
import { Monda } from "next/font/google";
import "./globals.css";

const monda = Monda({
  variable: "--font-monda",
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
        className={`${monda.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
