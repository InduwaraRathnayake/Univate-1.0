import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Univate 1.0",
  description: "Web application that serves as an interactive platform to assist CSE undergraduates in selecting their streams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-l from-[#3D52A0] via-[#7091E6] to-[#EDE8F5] bg-[length:200%_200%]`}
      >
        {children}
      </body>
    </html>
  );
}
