"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/NavBar";

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noNavbarRoutes = ["/login", "/signup"];
  const showNavbar = !noNavbarRoutes.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}