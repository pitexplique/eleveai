// app/optimiseur/page.tsx
import OptimiseurClient from "./OptimiseurClient";

export const metadata = {
  title: "Valeria — Optimiseur de prompt (V1)",
  description: "Scoring + optimisation itérative de prompts avec affichage en temps réel.",
};

export default function OptimiseurPage() {
  return <OptimiseurClient />;
}
