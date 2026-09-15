// ─── Le mode classe d'une fiche d'exercices ────────────────────────────────────
//
// ⭐ 15/09/2026, Frédéric : « c'est un mode classe comme dans les fiches de
// cours » — et « cela ne concerne pas ma fille » : la feuille est celle de
// l'élève, le diaporama est celui du professeur qui la fait en classe. J'avais
// écrit « pas de mode classe ici, voulu » : c'était une mauvaise lecture.
//
// Même principe que `slidesDepuisFiche` : les diapositives se FABRIQUENT depuis
// la donnée, elles ne s'écrivent pas à la main. Une diapo d'objectif, puis pour
// chaque niveau son rappel de cours (une diapo) et ses exercices, la correction
// cachée derrière « Révéler ».
//
// ⭐ UN PROBLÈME SE PROJETTE QUESTION PAR QUESTION. Un exercice à quatre
// sous-questions a), b), c), d) et huit étapes de corrigé ne tient pas dans un
// écran — mesuré : jusqu'à 961 px de débordement à 1280 × 800. On fait donc une
// diapo par sous-question : le contexte du problème, la question, et les
// étapes de SA correction. C'est aussi le rythme d'une classe : on ne révèle
// pas d) avant d'avoir cherché a).
//
// ⚠️ Les étapes d'un corrigé sont séparées par des `\n` dans la donnée : chaque
// ligne devient une ligne de la section « corrige » de ModeClasse, qui les
// numérote et règle sa taille sur le nombre de signes.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { ExerciceCorrige, FicheExercicesData, NiveauExercice } from "@/lib/fiches-exercices/types";
import { compterExercices } from "@/lib/fiches-exercices/types";

const ETOILES: Record<NiveauExercice, string> = { 1: "★", 2: "★★", 3: "★★★" };

const lignesDe = (texte: string) => texte.split("\n").map((l) => l.trim()).filter(Boolean);

/** « a) … », « b) … » : la lettre d'une sous-question, ou null. */
const lettreDe = (ligne: string) => ligne.match(/^([a-h])\)\s/)?.[1] ?? null;

/**
 * Découpe un texte en préambule (les lignes avant la première sous-question)
 * et en parties, une par lettre. Un texte sans lettre n'a qu'un préambule.
 */
function decouper(texte: string): { preambule: string[]; parties: { lettre: string; lignes: string[] }[] } {
  const preambule: string[] = [];
  const parties: { lettre: string; lignes: string[] }[] = [];
  for (const ligne of lignesDe(texte)) {
    const lettre = lettreDe(ligne);
    if (lettre) parties.push({ lettre, lignes: [ligne] });
    else if (parties.length) parties[parties.length - 1].lignes.push(ligne);
    else preambule.push(ligne);
  }
  return { preambule, parties };
}

/** Les diapos d'UN exercice : une seule, ou une par sous-question. */
function slidesDunExercice(
  ex: ExerciceCorrige,
  numero: number,
  nb: number,
  badge: string,
): ClasseSlide[] {
  const enonce = decouper(ex.enonce);
  const correction = decouper(ex.correction);
  const titre = ex.titre ? `${numero}. ${ex.titre}` : `Exercice ${numero}`;

  // Les lettres de l'énoncé et du corrigé doivent se répondre une à une ;
  // sinon, on ne découpe pas — une diapo, tout dedans.
  const memesLettres =
    enonce.parties.length >= 2 &&
    enonce.parties.length === correction.parties.length &&
    enonce.parties.every((p, i) => p.lettre === correction.parties[i].lettre);

  if (!memesLettres) {
    return [
      {
        titre,
        badge,
        teinte: "exercice",
        section: { type: "corrige", enonce: ex.enonce, lignes: lignesDe(ex.correction), revelable: true },
      },
    ];
  }

  // ⚠️ Le titre reste COURT : « 20. Combien de solutions, selon m ? — a) »
  // passait sur deux lignes à `text-6xl` et coûtait à lui seul les 90 px qui
  // faisaient déborder la diapo (mesuré à 1280 × 800). Un titre de problème
  // n'est gardé que s'il tient sur la ligne avec son numéro et sa lettre.
  // ⛔ Pas dans le badge : il est rendu en texte brut et en capitales, un
  // « $e^{x} > 0$ » y sortirait en clair (mesuré : 2 dollars par diapo).
  const titreCourt = ex.titre && ex.titre.replace(/\$/g, "").length <= 20 ? `${numero}. ${ex.titre}` : `Exercice ${numero}`;
  return enonce.parties.map((partie, i) => ({
    titre: `${titreCourt} — ${partie.lettre})`,
    badge: `${badge} · question ${partie.lettre}) sur ${enonce.parties.length}`,
    teinte: "exercice",
    section: {
      type: "corrige",
      // Le contexte du problème reste sur chaque diapo : on ne le fait pas
      // remonter trois questions plus haut pour relire l'énoncé.
      enonce: [...enonce.preambule, ...partie.lignes].join("\n"),
      // Les lignes de préambule du corrigé (rares) vont avec la première question.
      lignes: [...(i === 0 ? correction.preambule : []), ...correction.parties[i].lignes],
      revelable: true,
    },
  }));
}

export function slidesDepuisExercices(fiche: FicheExercicesData): ClasseSlide[] {
  const nb = compterExercices(fiche);
  const slides: ClasseSlide[] = [
    {
      titre: "Objectif",
      badge: `${fiche.titre} : ${nb} exercices`,
      teinte: "objectif",
      section: {
        type: "objectif",
        phrase: `${nb} exercices, du geste seul au problème de contrôle.`,
        sousPhrase:
          "Trois niveaux. Avant chaque niveau, un rappel de cours. On cherche d'abord, la correction vient après.",
      },
    },
  ];

  let numero = 0;
  for (const serie of fiche.series) {
    const etoiles = ETOILES[serie.niveau];
    slides.push({
      titre: `${etoiles} ${serie.titre} : le rappel`,
      badge: `Niveau ${serie.niveau} · ${serie.consigne}`,
      teinte: "propriete",
      section: { type: "corrige", lignes: serie.rappel },
    });
    for (const ex of serie.exercices) {
      numero += 1;
      slides.push(...slidesDunExercice(ex, numero, nb, `${etoiles} ${serie.titre} · exercice ${numero} sur ${nb}`));
    }
  }
  return slides;
}
