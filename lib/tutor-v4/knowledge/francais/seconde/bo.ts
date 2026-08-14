import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

/* Programme de français de seconde générale et technologique.
   Arrêté du 17 janvier 2019, BOEN spécial n° 1 du 22 janvier 2019,
   MODIFIÉ par le JORF du 8 octobre 2020 — c'est ce texte de 2020 qui a
   réparti l'étude de la langue entre la seconde et la première.

   ⚠️ Ce bo.ts NE se décalque PAS du collège. En 3e il porte les six domaines
   du socle (BO3EFRL, BO3EFRC, BO3EFRE…) ; le programme de lycée n'est pas bâti
   comme ça. Il a une partie « L'étude de la langue au lycée » — commune à la
   seconde et à la première, avec trois entrées : grammaire, lexique,
   expression écrite et orale — puis QUATRE objets d'étude littéraires.

   ⛔ Seconde générale et technologique. La seconde professionnelle a son
   propre texte : ne jamais y ranger quoi que ce soit d'ici. */
export const bo: KnowledgeBoCompetence[] = [
  /* ---- L'étude de la langue au lycée (commune 2de / 1re) ---- */
  { boId: "BO2DEFRG", label: "Étude de la langue : grammaire" },
  { boId: "BO2DEFRV", label: "Étude de la langue : lexique" },
  { boId: "BO2DEFRE", label: "Expression écrite et orale" },

  /* ---- Les quatre objets d'étude, intitulés exacts du programme ---- */
  { boId: "BO2DEFRP", label: "La poésie du Moyen Âge au XVIIIe siècle" },
  {
    boId: "BO2DEFRI",
    label: "La littérature d'idées et la presse du XIXe siècle au XXIe siècle",
  },
  { boId: "BO2DEFRR", label: "Le roman et le récit du XVIIIe siècle au XXIe siècle" },
  { boId: "BO2DEFRT", label: "Le théâtre du XVIIe siècle au XXIe siècle" },
];
