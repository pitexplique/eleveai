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

  // 2. La définition, avec sa figure projetée à côté.
  slides.push({
    titre: "La définition",
    badge: "À écrire dans le cahier",
    schema: fiche.figure?.schema,
    section: {
      type: "objectif",
      phrase: fiche.definition.texte,
      ...(fiche.figure?.legende ? { sousPhrase: fiche.figure.legende } : {}),
    },
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
  slides.push({
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: { variante: "info", titre: "Au quotidien", contenu: fiche.reel.texte },
      droite: { variante: "histoire", titre: "Le savais-tu ?", contenu: fiche.historique.texte },
    },
  });

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

  // 9. Pièges et à-retenir, face à face.
  slides.push({
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="space-y-3">
            {fiche.pieges.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="space-y-3">
            {fiche.aRetenir.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        ),
      },
    },
  });

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
