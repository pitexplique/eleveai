// SIMULATION DE DIX PASSAGES SUR LES QUATRE ÉPREUVES BLANCHES.
//
// POURQUOI CE SCRIPT (01/08). Les tests à la main ne voient qu'un passage, et
// un passage se passe toujours bien. C'est en enchaînant dix fois, en gardant
// la mémoire des questions déjà vues — exactement ce que fait le navigateur
// dans `localStorage` —, qu'on a découvert les deux défauts de tirage du
// 01/08 : « déjà vu » portait sur l'identifiant de l'item, alors qu'un gabarit
// porte un seul id pour ses treize énoncés ; et la passe stricte jetait les
// items recalés au lieu de les rendre à la pile.
//
// CE QU'ON MESURE, épreuve par épreuve :
//   - le nombre de questions servies à chaque passage (une épreuve qui rend
//     19 questions sur 20 est un bug, pas une variation) ;
//   - les thèmes qui disparaissent (le thème oral s'efface quand ses
//     enregistrements sont épuisés — c'est voulu, mais il faut le VOIR) ;
//   - les répétitions, dans un même passage et d'un passage à l'autre ;
//   - les micro-compétences touchées au moins une fois sur dix passages.
//
// Usage — tsx n'est pas une dépendance du projet, npx le récupère au vol :
//   npx --yes tsx@4 scripts/simuler-epreuves-blanches.ts
//   npx --yes tsx@4 scripts/simuler-epreuves-blanches.ts 6e-francais

import { CONFIG_6E_MATHS } from "@/lib/eval-nationale/6e-maths";
import { CONFIG_6E_FRANCAIS } from "@/lib/eval-nationale/6e-francais";
import { CONFIG_4E_MATHS } from "@/lib/eval-nationale/4e-maths";
import { CONFIG_4E_FRANCAIS } from "@/lib/eval-nationale/4e-francais";
import { nbQuestions, tirerEpreuve, type ConfigEpreuve } from "@/lib/eval-nationale/moteur";

const CONFIGS: ConfigEpreuve[] = [
  CONFIG_6E_MATHS,
  CONFIG_6E_FRANCAIS,
  CONFIG_4E_MATHS,
  CONFIG_4E_FRANCAIS,
];

const NB_PASSAGES = 10;

function simuler(config: ConfigEpreuve) {
  const attendu = nbQuestions(config);
  const dureeMin = Math.round(config.dureeSecondes / 60);

  console.log(
    `\n══ ${config.slug.toUpperCase()} — ${attendu} questions attendues, ${dureeMin} min ` +
      `(${(config.dureeSecondes / attendu).toFixed(0)} s par question)`,
  );

  // La mémoire du navigateur : les clés des énoncés déjà tombés.
  const vus: string[] = [];
  const microsTouches = new Set<string>();
  let passagesPleins = 0;

  for (let p = 1; p <= NB_PASSAGES; p += 1) {
    const { questions } = tirerEpreuve(config, vus);

    // Deux fois le même énoncé DANS le passage : interdit.
    const textes = new Set(questions.map((q) => q.text));
    const doublonsInternes = questions.length - textes.size;

    // Un énoncé déjà servi lors d'un passage précédent : interdit aussi.
    const dejaVus = new Set(vus);
    const rejoues = questions.filter((q) => dejaVus.has(q.cle)).length;

    // ON DESCEND JUSQU'À LA TRANCHE quand le domaine en a (ajouté le 11/08,
    // avec les tests spécifiques de la 6ᵉ en maths). Savoir que « grandeurs et
    // mesures » rend 16 questions sur 18 ne dit pas quoi corriger ; savoir que
    // c'est sa tranche « résolution de problèmes » qui est à sec, si.
    const parTheme = config.themes.map((t) => {
      const n = questions.filter((q) => q.themeId === t.id).length;
      const tete = `${t.id} ${n}/${t.nbQuestions}`;
      if (!t.repartition || n === t.nbQuestions) return tete;
      const detail = t.repartition
        .map((r) => {
          const k = questions.filter(
            (q) => q.themeId === t.id && q.typeItem === r.type,
          ).length;
          return `${r.type} ${k}/${r.nbQuestions}`;
        })
        .join(", ");
      return `${tete} [${detail}]`;
    });

    if (questions.length === attendu) passagesPleins += 1;
    questions.forEach((q) => microsTouches.add(q.microId));
    vus.push(...questions.map((q) => q.cle));

    const alerte =
      doublonsInternes > 0
        ? ` ⛔ ${doublonsInternes} doublon(s) interne(s)`
        : rejoues > 0
          ? ` ⛔ ${rejoues} question(s) déjà vue(s)`
          : questions.length < attendu
            ? " ⚠️"
            : "";

    console.log(
      `  passage ${String(p).padStart(2)} · ${String(questions.length).padStart(2)}/${attendu} · ` +
        parTheme.join(" · ") +
        alerte,
    );
  }

  console.log(
    `  → ${passagesPleins}/${NB_PASSAGES} passages complets · ` +
      `${microsTouches.size} micro-compétences touchées · ` +
      `${vus.length} questions servies en tout`,
  );
}

const demandes = process.argv.slice(2);
const aFaire = demandes.length
  ? CONFIGS.filter((c) => demandes.includes(c.slug))
  : CONFIGS;

if (!aFaire.length) {
  console.log(`Aucune épreuve ne porte ce nom. Au choix : ${CONFIGS.map((c) => c.slug).join(", ")}`);
} else {
  aFaire.forEach(simuler);
  console.log("");
}
