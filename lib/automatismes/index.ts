// lib/automatismes/index.ts
//
// Le registre des niveaux d'automatismes, le tirage d'une série et la
// correction. Ajouter un niveau = écrire lib/automatismes/<classe>.ts et
// l'inscrire dans NIVEAUX_AUTOMATISMES ; la page le propose aussitôt.

import { answersMatch } from "@/lib/answerMatch";
import { automatismes3e } from "./3e";
import { automatismes4e } from "./4e";
import { automatismes5e } from "./5e";
import { automatismes6e } from "./6e";
import { automatismesPremiere } from "./premiere";
import { automatismesSeconde } from "./seconde";
import { automatismesTerminaleSpe } from "./terminale-spe";
import type { AutoNiveau, AutoQuestionServie } from "./types";

export type { AutoNiveau, AutoQuestion, AutoQuestionServie, AutoTheme } from "./types";

/** Les niveaux ÉCRITS. Les autres s'affichent « bientôt » sur la page. */
export const NIVEAUX_AUTOMATISMES: AutoNiveau[] = [automatismes6e, automatismes5e, automatismes4e, automatismes3e, automatismesSeconde, automatismesPremiere, automatismesTerminaleSpe];

/** L'ordre d'affichage des classes sur la page, écrites ou non. */
export const CLASSES_AUTOMATISMES: { classe: string; label: string }[] = [
  { classe: "6e", label: "6e" },
  { classe: "5e", label: "5e" },
  { classe: "4e", label: "4e" },
  { classe: "3e", label: "3e" },
  { classe: "seconde", label: "Seconde" },
  { classe: "premiere", label: "Première" },
  { classe: "terminale-spe", label: "Terminale spé" },
];

export function getNiveauAutomatismes(classe: string): AutoNiveau | null {
  return NIVEAUX_AUTOMATISMES.find((n) => n.classe === classe) ?? null;
}

/**
 * Une question par thème, jamais deux fois le même — comme au sujet 0, où les
 * domaines se suivent sans se répéter. Quand le niveau compte plus de thèmes
 * que de questions, on en tire au hasard, en gardant ceux de `toujours` ; les
 * thèmes retenus restent dans l'ordre du programme.
 * Un générateur qui lève une erreur ne doit pas priver l'élève de toute la
 * série : on retente, puis on saute.
 */
export function tirerSerie(niveau: AutoNiveau, themeIds?: string[] | null): AutoQuestionServie[] {
  // Un ou PLUSIEURS thèmes choisis (Frédéric, 24/09 : « la totale, ou un, mais
  // aussi plusieurs ») : les questions tournent entre eux — Fractions,
  // Probabilités, Fractions, Probabilités… —, sans servir deux fois le même
  // énoncé. Aucun thème choisi = « la totale », plus bas.
  const choisis = niveau.themes.filter((t) => themeIds?.includes(t.id));
  if (choisis.length > 0) {
    const total = niveau.nbQuestions ?? 10;
    const vus = new Set<string>();
    const serie: AutoQuestionServie[] = [];
    for (let essai = 0; serie.length < total && essai < total * 20; essai++) {
      const theme = choisis[serie.length % choisis.length];
      try {
        const gen = theme.generateurs[Math.floor(Math.random() * theme.generateurs.length)];
        const q = gen();
        const cle = q.text + JSON.stringify(q.canvas ?? null);
        if (vus.has(cle)) continue;
        vus.add(cle);
        serie.push({ ...q, themeId: theme.id, themeLabel: theme.label });
      } catch (e) {
        console.error(`[automatismes] ${niveau.classe}/${theme.id}`, e);
      }
    }
    return serie;
  }

  // « La totale » imite l'épreuve : les thèmes hors épreuve n'y entrent pas.
  const themesEpreuve = niveau.themes.filter((t) => !t.horsEpreuve);
  const n = Math.min(niveau.nbQuestions ?? themesEpreuve.length, themesEpreuve.length);
  const toujours = new Set(niveau.toujours ?? []);
  const autres = themesEpreuve
    .filter((t) => !toujours.has(t.id))
    .map((t) => ({ t, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .slice(0, Math.max(0, n - toujours.size))
    .map((x) => x.t.id);
  const retenus = new Set([...autres, ...toujours]);

  const serie: AutoQuestionServie[] = [];
  for (const theme of niveau.themes.filter((t) => retenus.has(t.id))) {
    for (let essai = 0; essai < 5; essai++) {
      try {
        const gen = theme.generateurs[Math.floor(Math.random() * theme.generateurs.length)];
        serie.push({ ...gen(), themeId: theme.id, themeLabel: theme.label });
        break;
      } catch (e) {
        console.error(`[automatismes] ${niveau.classe}/${theme.id}`, e);
      }
    }
  }
  return serie;
}

/**
 * Le mode aperçu (`?apercu=1`) : un exemple de CHAQUE générateur, pour relire
 * toutes les figures d'un coup (Frédéric, 24/09 : « faut regarder tous les
 * canvas »).
 */
export function tirerApercu(niveau: AutoNiveau, parGenerateur = 3): AutoQuestionServie[] {
  // Trois exemples par générateur : la plupart tirent entre plusieurs CAS
  // (tableau de signes OU inéquation…), un seul exemple en cachait la moitié.
  return niveau.themes.flatMap((t) =>
    t.generateurs.flatMap((gen, i) =>
      Array.from({ length: parGenerateur }, (_, k) => ({
        ...gen(),
        themeId: t.id,
        themeLabel: `${t.label} · générateur ${i + 1} · exemple ${k + 1}`,
      })),
    ),
  );
}

/** Les signes que l'élève tape de mille façons : « − » et « - », « >= » et « ≥ ». */
function brut(s: string): string {
  return s
    .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/⩾|>=|=>/g, "≥")
    .replace(/⩽|<=|=</g, "≤")
    .replace(/\s+/g, "");
}

/** « {2 ; -3} », « x = 2 ou x = -3 », « -3 et 2 » → ["-3", "2"] */
function elements(s: string): string[] {
  return brut(s)
    .replace(/[{}]/g, "")
    .replace(/x=/g, "")
    .split(/;|et|ou|\|/)
    .filter(Boolean)
    .map((e) => e.replace(",", "."))
    .sort();
}

/** Réponse courte ou QCM. La rédaction se corrige par les critères cochés. */
export function estCorrect(q: AutoQuestionServie, reponse: string): boolean {
  if (q.format === "qcm") return reponse === q.expected[0];
  if (q.format === "redaction") return false;
  if (q.compare === "ensemble") {
    const r = elements(reponse).join("|");
    return q.expected.some((e) => elements(e).join("|") === r);
  }
  if (q.compare === "inegalite") {
    const r = brut(reponse).replace(",", ".");
    return q.expected.some((e) => brut(e).replace(",", ".") === r);
  }
  // « 12π » contre « 12 π » : answersMatch retire déjà les espaces.
  return q.expected.some((e) => answersMatch(reponse, e));
}
