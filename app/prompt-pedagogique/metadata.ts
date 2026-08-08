// app/prompt-pedagogique/metadata.ts
//
// ⛔ « EleveAI » NE S'ÉCRIT PAS DANS UN TITRE : le layout applique le gabarit
// « %s — EleveAI ». Le titre précédent — « Valeria — Optimiseur de prompt
// (V1) » — cumulait trois défauts : un nom de marque qui n'est plus le nôtre,
// un mot de métier que personne ne cherche, et un numéro de version que
// personne n'a demandé.
//
// ⭐ Le titre commence par un VERBE et dit le geste, pas la technique.

import type { Metadata } from "next";

export const metadata: Metadata = {
  // ⭐ LES DEUX NOMS DANS LE MÊME TITRE, et c'est voulu.
  // Frédéric, 08/08 : « mes élèves adoraient l'optimiseur ! ». Un nom que de
  // vrais utilisateurs ont adopté ne se remplace pas par un mot que personne
  // n'a jamais dit — il a d'ailleurs écarté « edu_prompt », qui est le nom d'un
  // concurrent (eduprompt.fr) et dont l'underscore colle les mots aux yeux de
  // Google là où le tiret les sépare.
  // Mais personne ne TAPE « optimiseur » pour trouver ça. Le nom qu'on
  // prononce et la phrase qu'on cherche ne sont pas le même métier : le
  // premier vit sur la page, la seconde dans le titre. Ici, les deux tiennent
  // en 54 signes une fois le gabarit appliqué.
  title: "L'optimiseur — écrire un prompt pédagogique",

  // Ce que fait vraiment l'outil, dans les mots de Frédéric (08/08) : « un prof
  // ou un élève tape un prompt et ça l'optimise pour qu'il soit parfaitement
  // pédagogique ». On nomme les DEUX publics : un élève qui demande quelque
  // chose à une IA gagne autant à savoir le formuler qu'un enseignant.
  description:
    "Écris ta demande telle qu'elle te vient : EleveAI la note, dit ce qui manque et la réécrit en un prompt pédagogique complet. Pour les enseignants comme pour les élèves.",

  openGraph: {
    title: "Écrire un prompt pédagogique — EleveAI",
    description:
      "Écris ta demande telle qu'elle te vient : EleveAI la note, dit ce qui manque et la réécrit en un prompt pédagogique complet.",
    url: "/prompt-pedagogique",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};
