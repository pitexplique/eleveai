// app/admin/page.tsx
import type { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Espace Direction – Accès réservé",
  description: "Espace confidentiel réservé à l’administrateur EleveAI.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
