import type { Metadata } from "next";
import CartesClient from "./CartesClient";

export const metadata: Metadata = {
  title: "Cartes de connexion",
  robots: { index: false, follow: false },
};

export default function CartesPage() {
  return <CartesClient />;
}
