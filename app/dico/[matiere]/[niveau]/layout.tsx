// Les métadonnées du dico interactif, /dico/<matiere>/<niveau>.
//
// ⚠️ POURQUOI CE FICHIER EXISTE (29/08/2026). `page.tsx` est un composant
// client — il lit ses paramètres avec `useParams` — et un composant client ne
// peut pas exporter de métadonnées. Sans ce layout, les deux adresses
// déclarées au sitemap (`/dico/maths/6e` et `/dico/francais/6e`) servaient le
// titre ET la description de l'accueil, sans canonique : deux doublons
// annoncés à l'indexation, incapables de se classer sur leurs propres mots.
//
// ⭐ ET LES MÉTADONNÉES SE GÉNÈRENT, elles ne s'écrivent pas : `getDico()`
// porte déjà le titre (« Dico Maths 6e ») et le sous-titre de chaque dico. Un
// dico ajouté au registre arrive donc avec son titre, sans que personne y
// repense — même principe que le sitemap et les fiches.
//
// ⛔ PAS DE MÉTADONNÉES POUR UN DICO QUI N'EXISTE PAS. `getDico` rend `null`,
// et on rend alors un objet vide : mieux vaut hériter du layout racine que
// d'annoncer « Dico undefined ».

import type { Metadata } from "next";
import { getDico } from "@/lib/dico";

type Params = Promise<{ matiere: string; niveau: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { matiere, niveau } = await params;
  const dico = getDico(matiere, niveau);
  if (!dico) return {};

  const url = `/dico/${matiere}/${niveau}`;
  const titre = `${dico.titre} : ${dico.mots.length} mots à réviser`;
  const description = `${dico.sousTitre} — ${dico.mots.length} mots de ${dico.matiereLabel.toLowerCase()} à revoir un par un, avec correction immédiate. Gratuit, sans compte.`;

  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: titre,
      description,
      url,
      type: "website",
      siteName: "EleveAI",
      locale: "fr_FR",
    },
  };
}

export default function DicoNiveauLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
