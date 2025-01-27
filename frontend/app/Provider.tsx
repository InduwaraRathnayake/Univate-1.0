"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/NavBar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/Chatbot";

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hiddenPaths = ["/login", "/signup"];
  const show = !hiddenPaths.includes(pathname);

  return (
    <>
      {show && <Navbar />}
      {children}
      {show && <ChatBot />}
      {show && <Footer />}
    </>
  );
}