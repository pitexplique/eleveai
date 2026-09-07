// Dérivation automatique « coach → kit de survie » : checklists et tests
// puisés dans la source de vérité du coach (knowledge + banques de questions).
// Partagé par tous les kits (première, seconde, …) — un kit n'écrit à la main
// QUE ses condensés (essentiel/formules/réflexes/pièges/reel).

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";
import type { TutorBankItemFixedV4, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { libelleTexte } from "@/lib/tutor-v4/libelleMath";
import type { KitExo } from "./types";

// ⛔ CES KITS S'IMPRIMENT. C'est le seul endroit du dépôt qui lit les libellés
// SANS passer par `catalog.ts` : sans `libelleTexte`, une checklist de survie
// sortirait « Utiliser $\sqrt{a^2} = |a|$ » sur une photocopie, sans que rien
// ne le signale. Voir l'en-tête de `lib/tutor-v4/libelleMath.ts`.
export function kitHelpers(microSkills: MicroSkillSource[]) {
  const microLabel = new Map(microSkills.map((m) => [m.id, libelleTexte(m.label)]));

  /** Libellés des micro-compétences d'une notion (checklist « je sais… »). */
  function microsDe(notionId: string): string[] {
    return microSkills
      .filter((m) => m.notionId === notionId)
      .map((m) => libelleTexte(m.label));
  }

  /**
   * « Test de survie » : items imprimables de la banque du coach.
   * On garde les items fixes SANS figure ni audio, on couvre des
   * micro-compétences différentes, par difficulté croissante. Déterministe.
   */
  function testDeSurvie(bank: TutorBankItemV4[], take = 3): KitExo[] {
    const imprimables = bank.filter(
      (i): i is TutorBankItemFixedV4 => i.kind === "fixed" && !i.canvas && !i.audioSrc
    );
    const parDifficulte = [...imprimables].sort((a, b) => a.difficulty - b.difficulty);

    const choisis: TutorBankItemFixedV4[] = [];
    const microsVus = new Set<string>();
    for (const item of parDifficulte) {
      if (choisis.length >= take) break;
      if (microsVus.has(item.microId)) continue;
      choisis.push(item);
      microsVus.add(item.microId);
    }
    // Complément si la banque a moins de micros distinctes que `take`.
    for (const item of parDifficulte) {
      if (choisis.length >= take) break;
      if (!choisis.includes(item)) choisis.push(item);
    }

    return choisis.map((item) => ({
      id: item.id,
      micro: microLabel.get(item.microId) ?? item.microId,
      enonce: item.text,
      choices: item.format === "qcm" ? item.choices : undefined,
      reponse: item.expected[0] ?? "",
      corrige: item.explanation,
      difficulty: item.difficulty,
    }));
  }

  return { microsDe, testDeSurvie };
}
