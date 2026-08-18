// CE QUE LE COACH ENSEIGNE ET QUE PIX NE DEMANDE PAS.
//
// POURQUOI CE FICHIER (17/08/2026, décision de Frédéric). « Il faut coach et
// parcours ensemble, et Pix à part — car après on pourra intégrer la gestion
// de projet, etc. »
//
// Jusqu'ici l'ossature du coach était CALCULÉE depuis `PIX_COMPETENCES` :
// seize compétences, pas une de plus. C'était juste tant qu'on rattrapait le
// référentiel, et bloquant dès qu'on veut aller au-delà. Un élève a besoin de
// choses que Pix ne mesure pas.
//
// LA SÉPARATION, ET CE QU'ELLE PROTÈGE :
//   - `/eval-pix-ia` reste calée sur le SEUL référentiel. Elle tire dans
//     `PIX_IA_QUESTIONS`, filtrées par savoir-faire Pix : rien d'ici ne peut y
//     entrer. C'est une épreuve blanche — elle doit ressembler à l'épreuve, pas
//     à ce qu'on aimerait enseigner en plus.
//   - le COACH et le PARCOURS, eux, servent tout : Pix ET la maison. Ils
//     puisent dans la même banque, c'est le principe.
// ⚠️ `scripts/verifier-fiches-pix.ts` contrôle cette étanchéité à chaque
// exécution. Sans lui, une notion maison finirait un jour dans l'éval blanche
// sans que personne ne s'en aperçoive — et l'épreuve cesserait de mesurer ce
// qu'elle prétend.
//
// CE QUI VIENDRA ICI. En comparant les 55 micro-compétences de l'ancienne
// échelle A1→C1 aux seize compétences Pix, trois sujets n'ont aucun
// équivalent au référentiel :
//   1. L'INTÉGRITÉ SCOLAIRE — où passe la limite entre aide autorisée, aide
//      limite, plagiat et triche, DANS MON DEVOIR. Pix a « respecter une
//      charte d'usage » (2.5.2), qui est le cadre d'un établissement, pas la
//      question que l'élève se pose devant sa copie. → écrit ci-dessous.
//   2. RÉVISER AVEC L'IA — se faire une fiche, un quiz, faire expliquer son
//      erreur. De la méthode de travail. Pix n'en dit rien.
//   3. MENER UN PROJET IA — formuler un besoin réel, poser des critères de
//      réussite, prototyper, présenter. Pix traite les enjeux, pas la conduite.
//
// ⚠️ RÈGLE DE NOMMAGE. Les notions Pix portent l'identifiant du référentiel
// (« 2.3 »). Les notions maison sont préfixées `m.` pour qu'on ne les confonde
// jamais, ni à l'œil ni dans un filtre.

import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";
import type {
  MicroSkillSource,
  NotionSource,
} from "@/lib/tutor-v4/knowledge/buildKnowledge";
import type { PixNiveauCoach } from "@/lib/tutor-v4/knowledge/ia/pix/socle";

/** Le groupe de tête des notions maison, à côté des trois domaines Pix. */
export const BO_MAISON: KnowledgeBoCompetence = {
  boId: "IA_MAISON",
  label: "Faire avec l'IA · au-delà du référentiel",
};

type NotionMaison = {
  id: string;
  label: string;
  /** À quels niveaux du coach cette notion s'adresse. */
  niveaux: PixNiveauCoach[];
  microSkills: { id: string; label: string }[];
};

const NOTIONS_MAISON: NotionMaison[] = [
  {
    id: "m.1",
    label: "m.1 · Travailler honnêtement avec l'IA",
    niveaux: ["college", "lycee"],
    microSkills: [
      { id: "m.1.1", label: "Distinguer aide autorisée, aide limite et triche" },
      { id: "m.1.2", label: "Dire ce que l'IA a fait dans mon travail" },
      { id: "m.1.3", label: "Reconnaître ce que je perds à déléguer" },
    ],
  },
];

/** Les notions maison servies à ce niveau. */
export function notionsMaison(niveau: PixNiveauCoach): NotionSource[] {
  const retenues = NOTIONS_MAISON.filter((n) => n.niveaux.includes(niveau));
  let precedent: string | null = null;

  return retenues.map((n) => {
    const prerequis = precedent ? [precedent] : [];
    precedent = n.id;
    return {
      id: n.id,
      label: n.label,
      boId: BO_MAISON.boId,
      prerequis,
      levels: [1, 2, 3, 4, 5],
    };
  });
}

/** Les savoir-faire maison servis à ce niveau. */
export function microSkillsMaison(niveau: PixNiveauCoach): MicroSkillSource[] {
  const retenues = NOTIONS_MAISON.filter((n) => n.niveaux.includes(niveau));
  const out: MicroSkillSource[] = [];

  for (const notion of retenues) {
    let precedent: string | null = null;
    for (const m of notion.microSkills) {
      out.push({
        id: m.id,
        label: m.label,
        notionId: notion.id,
        prerequis: precedent ? [precedent] : [],
      });
      precedent = m.id;
    }
  }

  return out;
}

/** Vrai si cet identifiant est une notion ou un savoir-faire maison. */
export function estMaison(id: string): boolean {
  return id.startsWith("m.");
}
