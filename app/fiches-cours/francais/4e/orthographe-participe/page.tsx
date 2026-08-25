// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).
//
// ⭐ Le mot « français » est dans la description, comme sur les fiches de 5e :
// la requête tapée est « participe passé 4e », et le mot de la matière doit se
// trouver sur la page, pas seulement dans l'URL.

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheParticipe4e,
  slidesParticipe4e,
} from "@/lib/fiches/francais-4e-orthographe-participe";

export const metadata: Metadata = {
  title: "L'accord du participe passé en 4e (2026-2027) : être, avoir, pronominaux",
  description:
    "Programme de français 4e 2026-2027 : accorder le participe passé avec être et avec avoir, repérer le COD et surtout sa place, reconnaitre les trois façons dont un COD passe devant le verbe, accorder le participe apposé sans auxiliaire, et trancher les verbes pronominaux selon que « se » est complément d'objet direct ou indirect. Chaque règle dessinée sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ParticipePasseQuatriemePage() {
  return (
    <FicheCoursClient fiche={ficheParticipe4e} slides={slidesParticipe4e} />
  );
}
