"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/NavBar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/Chatbot";
import TransitionPage from "@/components/Transition";
import { AnimatePresence } from "framer-motion";

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hiddenPaths = ["/login", "/signup"];
  const show = !hiddenPaths.includes(pathname);


  if (pathname === "/") {
    return (
      <>
        {show && <Navbar />}
        {children}
        {show && <ChatBot />}
        {show && <Footer />}
      </>
    );
  }


  return (
    <AnimatePresence mode="popLayout">
      <TransitionPage key={pathname}>
        {show && <Navbar />}
        {children}
        {show && <ChatBot />}
        {show && <Footer />}
      </TransitionPage>
    </AnimatePresence>
  );
}
