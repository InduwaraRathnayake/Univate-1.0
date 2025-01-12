import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/app/Provider";

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
  icons: [ { url: "logoBadge.png", rel: "icon" } ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-900 bg-[length:200%_200%]`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}