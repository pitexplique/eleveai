import type { Metadata } from "next";
import CahierParents from "@/components/cahier/CahierParents";
import type { CahierParentsConfig } from "@/components/cahier/parents-types";
import { jours, semaines } from "./data";

const config: CahierParentsConfig = {
  slug: "aider-mon-enfant",
  titre: "Aider mon enfant",
  sousTitre:
    "Le cahier des parents : (re)découvrir l'école d'aujourd'hui pour mieux accompagner son enfant, sans faire à sa place.",
  mission: "15 jours pour accompagner sereinement",
};

export const metadata: Metadata = {
  title: "Aider mon enfant aux devoirs : le cahier des parents (PDF gratuit)",
  description:
    "Cahier de vacances pour les parents : (re)découvrez les méthodes de l'école d'aujourd'hui (division posée, fractions, soustraction par cassage, accords, conjugaison, Pythagore…) pour aider votre enfant aux devoirs sans faire à sa place. 15 jours, une page par jour à imprimer, avec « le mot d'école », le geste numérique et le piège à éviter. Gratuit, par EleveAI.",
  keywords: [
    "aider son enfant aux devoirs",
    "méthodes école primaire parents",
    "comment poser une division aujourd'hui",
    "soustraction avec retenue méthode",
    "aider mon enfant en maths",
    "aider mon enfant en français",
    "cahier de vacances parents",
    "accompagnement scolaire à la maison",
    "ENT Pronote parents",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/aider-mon-enfant" },
  openGraph: {
    title: "Aider mon enfant aux devoirs — le cahier des parents (PDF gratuit) — EleveAI",
    description:
      "(Re)découvrez les méthodes de l'école d'aujourd'hui pour aider votre enfant sans faire à sa place. 15 jours à imprimer : maths, français, méthode et numérique scolaire.",
    url: "/cahier-vacances/aider-mon-enfant",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierAiderMonEnfantPage() {
  return <CahierParents data={{ jours, semaines }} config={config} />;
}
