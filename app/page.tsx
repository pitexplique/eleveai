// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // La page d'entrée du site est la page de connexion
  redirect("/accueil");
}

