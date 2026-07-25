"use client";

// Le pont vers le coach au pied de TOUTES les fiches de cours (règle 24/07 :
// la fiche est une porte, le coach est la destination). Monté par le layout
// des fiches — une seule prise, toutes les fiches branchées. Le lien vise la
// classe de la fiche quand le coach la connaît. Caché à l'impression (les
// fiches s'impriment) — c'est PontCoach qui porte le print:hidden.

import { usePathname } from "next/navigation";
import PontCoach from "@/components/PontCoach";

const CLASSES_MATHS = new Set([
  "cm1",
  "cm2",
  "6e",
  "5e",
  "4e",
  "3e",
  "premiere-spe",
]);

export default function PontCoachFiches() {
  const pathname = usePathname() ?? "";
  // /fiches-cours/<matiere>/<niveau|famille>/<notion> → segments utiles.
  const seg = pathname.split("/").filter(Boolean);
  const matiere = seg[1];

  let href = "/coach-ia/maths?from=fiche";
  let label = "🧮 Entraîne-toi avec le Coach Maths →";
  if (matiere === "ia") {
    href = "/coach-ia/ia?from=fiche";
    label = "🤖 Entraîne-toi avec le Coach IA →";
  } else if (matiere === "maths" && seg[2] && CLASSES_MATHS.has(seg[2])) {
    href = `/coach-ia/maths?classe=${seg[2]}&from=fiche`;
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-10 print:hidden">
      <PontCoach href={href} label={label} />
    </div>
  );
}
