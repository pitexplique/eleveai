// MAQUETTE DU 18/10/2026 — L'ACCUEIL EN JOURNAL POUR LA JEUNESSE (et les grands).
//
// Frédéric : « refonder la page d'accueil comme un journal, avec vidéos, coach »,
// « comme un journal pour la jeunesse », « et les adultes », « avec une mise en
// page à choisir », et le but : « qu'un jeune, un prof se dise : je vais
// apprendre une chose utile, ou m'entraîner », « avoir une perspective d'avenir ».
// Contexte chiffré : 72 % de rebond sur le site.
//
// ✅ BASCULÉ LE 18/10/2026 : Frédéric a choisi le QUOTIDIEN, qui est désormais
// /accueil (app/accueil/page.tsx). Cette page reste la maquette AVEC le
// sélecteur des trois mises en page, pour comparer ou changer d'avis. noindex.
//
// ⭐ LE CONTENU TOURNE CHAQUE JOUR, et c'est le SERVEUR qui choisit : la page est
// régénérée toutes les heures (`revalidate`), soit 24 rendus par jour — pas un
// par visiteur. Le client ne recalcule rien : pas d'erreur d'hydratation.
// ⚠️ Chaque geste de la page MÈNE QUELQUE PART (vidéo, coach, rituel) : c'est ce
// qui fait baisser le rebond, une interaction qui reste sur la page n'y change
// rien.
import type { Metadata } from "next";
import JournalClient from "./JournalClient";
import { donneesDuJournal } from "./donnees";

// ⭐ 10/11/2026 : ce n'est plus une maquette, c'est LE Journal d'EleveAI
// (« comprendre le monde avec les maths »), lié depuis le bandeau en haut de
// la page d'accueil seulement (components/BandeauJournal.tsx, 11/11). Il s'indexe donc.
export const metadata: Metadata = {
  // ⭐ 14/11/2026, Frédéric : « journal scientifique éducatif interactif ».
  // La Réunion reste dans la description, pas dans le titre (site francophone).
  title: "Journal scientifique éducatif et interactif | EleveAI",
  description:
    "Le journal scientifique éducatif et interactif d'EleveAI, écrit depuis La Réunion : chaque semaine, une vidéo, un article à lire ou à écouter et un défi pour comprendre le monde avec les maths (planète, espace, santé, argent, sport, technologie), du CP aux adultes.",
  alternates: { canonical: "/accueil-journal" },
};

export const revalidate = 3600;

export default function JournalPage() {
  return <JournalClient {...donneesDuJournal()} />;
}
