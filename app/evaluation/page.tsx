import { permanentRedirect } from "next/navigation";

// ⛔ 26/10/2026 : l'ancien concours « Disponible le 1er juin » n'existe plus ;
// /evaluation mène à « Faire le point » du coach (/parcours), la porte de l'accueil.
// L'ancienne page reste dans EvaluationClient.tsx si on la rouvre un jour.
export default function EvaluationPage() {
  permanentRedirect("/parcours");
}
