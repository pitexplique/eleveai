// scripts/verifier-automatismes.ts
//
// Tire des milliers de questions par générateur d'automatismes et vérifie :
// - aucun générateur ne lève d'erreur ;
// - aucun « NaN », « undefined », « Infinity » ni « [object » dans le texte ;
// - la première réponse attendue est bien jugée juste (QCM : elle figure
//   parmi les choix, qui ne se répètent pas) ;
// - chaque générateur produit assez de questions DIFFÉRENTES (seuil : 12) ;
//   la figure compte : un graphique neuf sous le même texte est une question neuve.
//
//   npx --yes tsx@4 scripts/verifier-automatismes.ts

import { NIVEAUX_AUTOMATISMES, estCorrect, tirerSerie } from "../lib/automatismes";

const TIRAGES = 2000;
let erreurs = 0;

for (const niveau of NIVEAUX_AUTOMATISMES) {
  console.log(`\n=== ${niveau.label} — ${niveau.themes.length} thèmes`);
  for (const theme of niveau.themes) {
    theme.generateurs.forEach((gen, gi) => {
      const enonces = new Set<string>();
      for (let i = 0; i < TIRAGES; i++) {
        let q;
        try {
          q = gen();
        } catch (e) {
          erreurs++;
          console.log(`  ✗ ${theme.id}#${gi} lève : ${(e as Error).message}`);
          return;
        }
        const tout = JSON.stringify(q);
        if (/NaN|undefined|Infinity|\[object/.test(tout)) {
          erreurs++;
          console.log(`  ✗ ${theme.id}#${gi} valeur cassée : ${q.text}`);
          return;
        }
        enonces.add(q.text + "|" + (q.choices ?? []).slice().sort().join("|") + "|" + JSON.stringify(q.canvas ?? null));
        const servie = { ...q, themeId: theme.id, themeLabel: theme.label };
        if (q.format === "qcm") {
          const c = q.choices ?? [];
          if (!c.includes(q.expected[0]) || new Set(c).size !== c.length || c.length < 2) {
            erreurs++;
            console.log(`  ✗ ${theme.id}#${gi} QCM défaillant : ${q.text} → ${c.join(" / ")}`);
            return;
          }
        } else if (q.format === "short") {
          // L'élève écrit les solutions dans l'autre ordre, avec « et » ; ou « >= ».
          const variante =
            q.compare === "ensemble"
              ? q.expected[0].split(";").reverse().join(" et ")
              : q.compare === "inegalite"
                ? q.expected[0].replace("≥", " >= ").replace("≤", " <= ")
                : q.expected[0];
          if (!q.expected.length || !estCorrect(servie, q.expected[0]) || !estCorrect(servie, variante)) {
            erreurs++;
            console.log(`  ✗ ${theme.id}#${gi} la réponse attendue est refusée : ${q.text} → ${q.expected.join(" | ")}`);
            return;
          }
        } else if (!q.modele || !(q.criteres ?? []).length) {
          erreurs++;
          console.log(`  ✗ ${theme.id}#${gi} rédaction sans modèle ni critères`);
          return;
        }
      }
      const drapeau = enonces.size < 12 ? "⚠️" : "  ";
      console.log(`${drapeau} ${theme.id}#${gi} : ${enonces.size} énoncés distincts`);
      if (enonces.size < 12) erreurs++;
    });
  }
  // ⭐ L'UNITÉ QUI COMPTE EST LE THÈME, pas le générateur (Frédéric, 24/09 :
  // « il est important qu'il y ait dans chaque automatisme des questions en
  // nombre suffisant »). Un élève coche « Fractions » et enchaîne des séries de
  // 10 : il faut au moins TROIS séries sans revoir une question.
  const SEUIL_THEME = 30;
  for (const theme of niveau.themes) {
    const vus = new Set<string>();
    for (let i = 0; i < 4000; i++) {
      const gen = theme.generateurs[i % theme.generateurs.length];
      const q = gen();
      vus.add(q.text + "|" + (q.choices ?? []).slice().sort().join("|") + "|" + JSON.stringify(q.canvas ?? null));
    }
    if (vus.size < SEUIL_THEME) {
      erreurs++;
      console.log(`⚠️ thème ${theme.id} : ${vus.size} questions distinctes (seuil ${SEUIL_THEME})`);
    }
  }

  // ⛔ Frédéric, 26/09 : « dans les QCM il faut mélanger l'ordre de la bonne
  // réponse ». On mesure sur les questions SERVIES (tirerSerie les mélange) :
  // la bonne réponse doit occuper plusieurs places, jamais plus de 60 % du
  // temps la même.
  for (const theme of niveau.themes) {
    const places = new Map<number, number>();
    let nb = 0;
    for (let i = 0; i < 60; i++) {
      for (const q of tirerSerie(niveau, [theme.id])) {
        if (q.format !== "qcm" || !q.choices) continue;
        nb++;
        const p = q.choices.indexOf(q.expected[0]);
        places.set(p, (places.get(p) ?? 0) + 1);
      }
    }
    if (nb < 20) continue;
    const part = Math.max(...places.values()) / nb;
    if (places.size < 2 || part > 0.6) {
      erreurs++;
      console.log(`⚠️ thème ${theme.id} : la bonne réponse des QCM est ${Math.round(part * 100)} % du temps à la même place`);
    }
  }

  const tailles = new Set(Array.from({ length: 200 }, () => tirerSerie(niveau).length));
  console.log(`  séries tirées : ${[...tailles].join(", ")} questions`);
}

console.log(erreurs ? `\n${erreurs} problème(s).` : "\nTout est vert.");
process.exit(erreurs ? 1 : 0);
