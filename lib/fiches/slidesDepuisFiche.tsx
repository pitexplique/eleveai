// ─── Le mode classe, engendré par la fiche ─────────────────────────────────────
//
// ⛔ POURQUOI CE FICHIER EXISTE (20/08/2026). Frédéric, en projetant une fiche
// qu'il venait de valider : « toutes les sections n'apparaissent pas dans le
// slide, quel est le problème ? ». Le problème n'était pas l'affichage : les
// slides étaient un SECOND contenu, écrit à la main dans chaque fiche, à côté de
// la donnée. Figées en juillet, elles ne suivaient plus rien — huit slides de
// texte pendant que la fiche gagnait quatre propriétés illustrées et douze
// dessins. Aucune n'a jamais montré le bloc « Propriétés ».
//
// Les 16 fiches IA n'avaient pas ce défaut : `FicheCoursIa` fabrique ses slides
// depuis la donnée. Les fiches de maths, elles, avaient deux sources pour un
// même cours. Ce fichier met fin à la divergence : **une fiche = un diaporama,
// engendré, jamais recopié.**
//
// ⭐ « Le mode classe est vraiment essentiel pour les profs » — donc il montre
// TOUT : chaque propriété, chaque réflexe, chaque usage, chaque exemple, chaque
// exercice a sa slide, avec son dessin quand il en a un.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

/** Le diaporama complet d'une fiche, dans l'ordre du cours. */
export function slidesDepuisFiche(fiche: FicheCoursData): ClasseSlide[] {
  const slides: ClasseSlide[] = [];
  const sousTitre = `${fiche.titre} — ${fiche.classe}`;

  // 1. L'objectif : le titre, l'accroche, et la ligne « Le secret » de l'identité.
  const secret = fiche.identite?.find((i) => /secret/i.test(i.label));
  slides.push({
    titre: "Objectif du cours",
    badge: sousTitre,
    section: {
      type: "objectif",
      phrase: fiche.titre,
      sousPhrase: fiche.accroche,
      ...(secret ? { encadre: { titre: secret.label, texte: secret.valeur } } : {}),
    },
  });

  /* 2. La définition, avec sa figure projetée à côté.
     ⛔⛔ CORRIGÉ LE 30/08/2026. Frédéric, en projetant la fiche de CM1 :
     « le deuxième écran de la fiche en mode classe, illisible ». Le champ
     `phrase` d'une diapo `objectif` est rendu en TRÈS GROS — il est fait pour
     une phrase, et l'on y déversait `fiche.definition.texte` en entier. Une
     définition de cent mots donnait trois mots par ligne et défilait sans fin.
     ⭐ Depuis que les définitions peuvent porter des sauts de ligne (voir
     `whitespace-pre-line` dans `FicheCoursClient`, même jour), on projette UN
     PARAGRAPHE PAR DIAPO au lieu de tout empiler. La figure et sa légende
     restent sur la première, qui porte le titre ; les suivantes ne sont
     numérotées que s'il y en a plusieurs.
     ⚠️ Une définition sans saut de ligne retombe exactement sur l'ancien
     comportement : une seule diapo, inchangée. */
  const paragraphes = fiche.definition.texte
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  (paragraphes.length ? paragraphes : [fiche.definition.texte]).forEach((p, i, tous) => {
    slides.push({
      titre: "La définition",
      badge:
        tous.length > 1 ? `À écrire dans le cahier · ${i + 1} / ${tous.length}` : "À écrire dans le cahier",
      ...(i === 0 && fiche.figure?.schema ? { schema: fiche.figure.schema } : {}),
      section: {
        type: "objectif",
        phrase: p,
        ...(i === 0 && fiche.figure?.legende ? { sousPhrase: fiche.figure.legende } : {}),
      },
    });
  });

  // 3. UNE SLIDE PAR PROPRIÉTÉ — le bloc qui manquait entièrement.
  fiche.proprietes.forEach((p, i) => {
    slides.push({
      titre: p.titre,
      badge: `Propriété ${i + 1} / ${fiche.proprietes.length}`,
      schema: p.schema,
      section: { type: "objectif", phrase: p.texte },
    });
  });

  // 4. Le réel et l'histoire : les deux blocs par lesquels Frédéric commence
  //    ses cours.
  /* ⛔ SCINDÉE LE 30/08/2026. Cette diapo empilait `reel` ET `historique` : 820
     signes sur un seul écran, et elle débordait de 176 px à 1280×800 — le pire
     cas de toute la fiche. Deux textes longs côte à côte ne tiennent pas, et
     rien n'obligeait à les projeter ensemble. Une idée par écran.
     ⚠️ Chacune ne parait que si son texte existe : les garde-fous ajoutés le
     même jour dans `FicheCoursClient` permettent à une fiche de laisser un de
     ces blocs vide, et le mode classe doit suivre. */
  if (fiche.reel.texte.trim()) {
    slides.push({
      titre: "À quoi ça sert ?",
      badge: "Au quotidien",
      section: { type: "objectif", phrase: fiche.reel.texte },
    });
  }
  if (fiche.historique.texte.trim()) {
    slides.push({
      titre: "Le savais-tu ?",
      badge: "Un peu d'histoire",
      section: { type: "objectif", phrase: fiche.historique.texte },
    });
  }

  // 5. La formule, quand la notion en a une.
  if (fiche.formule) {
    slides.push({
      titre: fiche.formule.contexte,
      badge: "La formule",
      schema: fiche.formule.schema,
      section: {
        type: "objectif",
        phrase: fiche.formule.expression,
        sousPhrase: fiche.formule.legende,
      },
    });
  }

  // 6. Les réflexes : la vue d'ensemble, puis un par un avec leur dessin (ceux
  //    qui en ont un — sans figure, la carte récapitulative suffit).
  if (fiche.methode.length) {
    slides.push({
      titre: "Les réflexes",
      badge: "Méthode",
      section: {
        type: "cartes",
        cartes: fiche.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
      },
    });
    fiche.methode.forEach((m, i) => {
      if (!m.schema) return;
      slides.push({
        titre: m.titre,
        badge: `Réflexe ${i + 1} / ${fiche.methode.length}`,
        schema: m.schema,
        section: { type: "objectif", phrase: m.texte },
      });
    });
  }

  // 7. Les usages : vue d'ensemble, puis chacun illustré.
  if (fiche.usages.length) {
    slides.push({
      titre: "Selon ce que l'on cherche",
      badge: "Usages",
      section: {
        type: "cartes",
        cartes: fiche.usages.map((u) => ({ titre: u.titre, texte: u.detail })),
      },
    });
    fiche.usages.forEach((u, i) => {
      if (!u.schema) return;
      slides.push({
        titre: u.titre,
        badge: `Usage ${i + 1} / ${fiche.usages.length}`,
        schema: u.schema,
        section: { type: "objectif", phrase: u.detail },
      });
    });
  }

  // 8. UN EXEMPLE PAR SLIDE, correction révélable — c'est le cœur de l'heure de
  //    cours : on montre l'énoncé, la classe cherche, on révèle.
  fiche.exemples.forEach((e, i) => {
    slides.push({
      titre: e.titre,
      badge: `Exemple ${i + 1} / ${fiche.exemples.length}`,
      schema: e.schema,
      section: {
        type: "exemple",
        enonce: e.donnees,
        question: e.question,
        correction: e.solution,
      },
    });
  });

  /* ⛔ SCINDÉE LE 30/08/2026, pour la même raison que « à quoi ça sert » : cinq
     pièges ET cinq lignes d'à-retenir sur un écran font 678 signes, et la diapo
     débordait de 158 px. Chaque liste a maintenant le sien. */
  if (fiche.pieges.length) {
    slides.push({
      titre: "Pièges à éviter",
      badge: "Vigilance",
      section: { type: "etapes", etapes: fiche.pieges },
    });
  }
  if (fiche.aRetenir.length) {
    slides.push({
      titre: "À retenir",
      badge: "L'essentiel",
      section: { type: "etapes", etapes: fiche.aRetenir },
    });
  }

  // 10. Les exercices, un par slide : de quoi finir l'heure au tableau.
  fiche.entrainement.forEach((ex, i) => {
    slides.push({
      titre: "À toi de jouer",
      badge: `Exercice ${i + 1} / ${fiche.entrainement.length}`,
      section: {
        type: "exercice",
        enonce: ex.question,
        correction: ex.correction,
      },
    });
  });

  return slides;
}
