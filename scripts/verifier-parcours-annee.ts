// LE PARCOURS SERT-IL LA BONNE ANNÉE ?
//
// POURQUOI (21/08/2026). La classe `stmg` couvre les DEUX années du cycle
// terminal technologique — une seule classe, décision du 15/08, parce que les
// suites commencent en première et se terminent en terminale. Le coach a reçu
// ses trois pastilles le 18/08 ; le parcours, lui, a continué à tirer ses défis
// dans les 86 notions d'un bloc. Un élève de première pouvait recevoir une loi
// binomiale ou un logarithme — et, contrairement au coach, il n'avait rien
// choisi : la question lui tombait dessus.
//
// Ce script fait le geste de l'élève : il rejoue `startParcours()` — la même
// liste filtrée, le même tirage — et regarde ce qui sort. Une pastille qui
// filtre l'AFFICHAGE sans filtrer le TIRAGE passerait inaperçue à la lecture du
// code ; ici elle se voit, parce qu'on compte les questions reçues.
//
// ⚠️ Le mode fait partie de la mesure (voir `verifier-demarrage.ts`) : le
// parcours tire dans les difficultés 1→3 en « révision » et 3→5 en « défi ».
// Les deux sont mesurés, et annoncés séparément.
//
// Usage :
//   npx --yes tsx@4 scripts/verifier-parcours-annee.ts
//   npx --yes tsx@4 scripts/verifier-parcours-annee.ts 500   (nombre de tirages)

import { getClasseNotions } from "@/lib/parcours/getClasseNotions";
import {
  getDefiQuestionForNotion,
  type ParcoursDifficulteMode,
} from "@/lib/parcours/getDefiQuestionForNotion";
import { getAnneesNotions, sansMarqueurAnnee } from "@/lib/tutor-v4/catalog";
// ⭐ Le filtre vient de la PAGE (`lib/parcours/annee.ts`), pas d'une copie
// écrite ici : une copie dirait toujours oui, quoi que fasse le parcours.
import {
  filtrerNotionsParAnnee,
  marqueurAnneeUtile,
  type ParcoursAnnee,
} from "@/lib/parcours/annee";

const CLASSE = "stmg" as const;
const TIRAGES = Number(process.argv[2] ?? 200);
const QUESTIONS_PAR_PARCOURS = 20; // le « Grand parcours », le plus exposé

const CHIPS: { id: ParcoursAnnee; label: string }[] = [
  { id: "premiere", label: "1re" },
  { id: "terminale", label: "Tle" },
  { id: "cycle", label: "Les deux" },
];

const annees = getAnneesNotions(CLASSE, "maths");
if (!annees) {
  console.error(`✗ ${CLASSE} n'a pas de carte d'années — rien à vérifier.`);
  process.exit(1);
}

const toutes = getClasseNotions(CLASSE);

/** La liste que la page construit — le filtre de la page, pas un sosie. */
function notionsDe(annee: ParcoursAnnee) {
  return filtrerNotionsParAnnee(toutes, annees, annee);
}

/** `startParcours()`, sans le React : tirer, nettoyer le libellé, mélanger, couper. */
function tirerUnParcours(annee: ParcoursAnnee, mode: ParcoursDifficulteMode) {
  const nettoie = marqueurAnneeUtile(annees, annee);

  const disponibles = notionsDe(annee)
    .map((n) => getDefiQuestionForNotion({ classe: CLASSE, notionId: n.id, mode }))
    .filter((q) => q !== null)
    .map((q) =>
      nettoie ? { ...q, notionLabel: sansMarqueurAnnee(q.notionLabel) } : q
    );

  const copie = [...disponibles];
  for (let i = copie.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }

  return copie.slice(0, Math.min(QUESTIONS_PAR_PARCOURS, copie.length));
}

let echec = false;

console.log(`PARCOURS ${CLASSE.toUpperCase()} · le filtre d'année`);
console.log(
  `${toutes.length} notions dans la classe · ${TIRAGES} parcours de ${QUESTIONS_PAR_PARCOURS} questions par pastille et par mode\n`
);

for (const mode of ["revision", "defi"] as ParcoursDifficulteMode[]) {
  console.log(`── mode ${mode === "revision" ? "RÉVISION (1→3)" : "DÉFI (3→5)"}`);

  for (const chip of CHIPS) {
    const listees = notionsDe(chip.id);

    // Ce qui ouvre vraiment : une notion listée dont la banque rend une question.
    const servies = listees.filter(
      (n) => getDefiQuestionForNotion({ classe: CLASSE, notionId: n.id, mode }) !== null
    );

    // LA MESURE QUI PROUVE LA COUPURE : sur des milliers de questions reçues,
    // combien viennent de l'autre année ?
    let recues = 0;
    let horsAnnee = 0;
    let marqueurs = 0; // « (Tle) » restant dans un libellé, année choisie

    for (let t = 0; t < TIRAGES; t += 1) {
      for (const q of tirerUnParcours(chip.id, mode)) {
        recues += 1;
        const a = annees[q.notionId];
        if (chip.id !== "cycle" && a !== undefined && a !== chip.id) {
          horsAnnee += 1;
          if (horsAnnee <= 3) {
            console.log(`   ✗ ${chip.label} a reçu « ${q.notionLabel} » (${q.notionId} · ${a})`);
          }
        }
        if (chip.id !== "cycle" && q.notionLabel.includes("(Tle)")) marqueurs += 1;
      }
    }

    const manquantes = listees.length - servies.length;
    const verdict = horsAnnee === 0 ? "✓" : "✗";
    if (horsAnnee > 0 || servies.length === 0) echec = true;

    console.log(
      `   ${verdict} ${chip.label.padEnd(8)} ${String(listees.length).padStart(3)} notions listées · ` +
        `${String(servies.length).padStart(3)} qui rendent une question` +
        (manquantes > 0 ? ` (${manquantes} muette${manquantes > 1 ? "s" : ""})` : "") +
        ` · ${recues} questions reçues, ${horsAnnee} hors année`
    );

    // Une notion muette n'est pas une fuite d'année : c'est une notion sans
    // item dans la tranche de difficulté du mode. On la NOMME quand même —
    // sinon elle disparaît derrière un compte.
    if (manquantes > 0) {
      const ids = new Set(servies.map((n) => n.id));
      console.log(
        `      muettes : ${listees.filter((n) => !ids.has(n.id)).map((n) => n.id).join(", ")}`
      );
    }

    if (marqueurs > 0) {
      echec = true;
      console.log(
        `   ✗ ${chip.label} : ${marqueurs} libellé(s) portent encore « (Tle) » alors que l'année est choisie`
      );
    }
  }

  console.log("");
}

// Le compte doit se refermer : les deux pastilles font le tout, sans recouvrement.
const p = notionsDe("premiere").length;
const t = notionsDe("terminale").length;
if (p + t !== toutes.length) {
  echec = true;
  console.log(`✗ ${p} + ${t} ≠ ${toutes.length} : une notion est dans les deux listes, ou dans aucune.`);
} else {
  console.log(`✓ ${p} + ${t} = ${toutes.length} : les deux pastilles font la classe entière, sans recouvrement.`);
}

console.log(
  echec
    ? "\n✗ Le parcours sert encore des questions de l'autre année."
    : "\n✓ Un parcours de première ne contient aucune question de terminale."
);

process.exit(echec ? 1 : 0);
