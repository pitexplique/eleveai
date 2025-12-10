"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // On masque le header/footer UNIQUEMENT sur /auth/*
  const hideChrome = pathname.startsWith("/auth");

  return (
    <>
      {!hideChrome && <Header />}
      {children}
      {!hideChrome && <Footer />}
    </>
  );
}


