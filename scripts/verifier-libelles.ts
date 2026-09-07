// LES LIBELLÉS QUE L'ÉLÈVE LIT DANS LE COACH — accents, formules, traduction.
//
// POURQUOI (07/09/2026). Frédéric, capture à l'appui : la liste de seconde
// affichait « Utiliser (a+b)^2 = a^2 + 2ab + b^2 » et « Developper », « identite »,
// « adaptee ». Deux défauts sur la même ligne, et personne pour les voir : aucun
// contrôle du dépôt ne regardait les libellés — `verifier-latex.ts` mesure les
// ÉNONCÉS des banques, pas les intitulés de la matrice.
//
// CE QU'IL VÉRIFIE, en trois questions :
//
//   1. ACCENTS. Un mot écrit nu (« developper ») alors que le dépôt l'écrit
//      accentué ailleurs (« développer ») est signalé.
//      ⭐ LE LEXIQUE N'EST PAS ÉCRIT À LA MAIN, il est DÉRIVÉ du dépôt : tout mot
//      accentué d'un libellé devient la référence de sa forme nue. Une liste à la
//      main aurait vieilli ; celle-ci suit les données.
//      ⛔ Deux garde-fous, sans lesquels il criait sur du texte correct :
//        · les rectifications de 1990 sont la graphie du dépôt — `reconnaitre`,
//          `connaitre`, `chaine`, `cout`… ne sont PAS des fautes (voir la mémoire
//          « orthographe-de-ce-que-l-eleve-lit ») ;
//        · un mot n'est suspect que si les fichiers QUI ÉCRIVENT LES ACCENTS ne
//          l'écrivent jamais nu. Sans cette règle, « la fonction inverse » était
//          corrigée en « inversé », et « les codes de l'écrit » en « codés » —
//          7 faux positifs sur 7 en STMG.
//        · l'anglais est hors sujet : « Recognize operation EN → FR » est juste.
//
//   2. FORMULES. Chaque segment `$…$` doit être du LaTeX que KaTeX sait rendre,
//      et les dollars doivent être appariés.
//
//   3. TRADUCTION. `libelleTexte()` est ce que lisent les kits IMPRIMABLES, les
//      URL de recherche YouTube et les `aria-label` — tout ce qui n'affiche pas.
//      Après elle, il ne doit rester ni `$`, ni antislash, ni accolade. Une macro
//      inconnue se trahit ici, avant d'atteindre une photocopie.
//
// Usage — tsx n'est pas une dépendance du projet, npx le récupère au vol :
//   npx --yes tsx@4 scripts/verifier-libelles.ts
//   npx --yes tsx@4 scripts/verifier-libelles.ts --detail

import katex from "katex";
import {
  getMicroLabelMathMap,
  getNotionLabelMathMap,
  type Classe,
  type Matiere,
} from "@/lib/tutor-v4/catalog";
import { libelleTexte } from "@/lib/tutor-v4/libelleMath";

// Les couples réellement proposés par `app/coach-ia/[matiere]/page.tsx`. Un
// couple absent d'ici n'est pas testé — c'est le même piège que la liste des
// classes de français : le catalogue REPLIE en silence sur une autre classe.
const COUPLES: [Matiere, Classe[]][] = [
  ["maths", ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "premiere-spe", "terminale-spe", "stmg", "adulte"]],
  ["francais", ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde"]],
  ["english-maths", ["a1", "a2", "b1", "b2"]],
  ["espagnol", ["a1", "a2", "b1", "b2"]],
  ["ia", ["pix-college", "pix-lycee", "a1", "a2", "b1", "b2", "c1"]],
  ["economie", ["eco-college"]],
];

// Les matières dont les libellés ne sont pas du français.
const HORS_FRANCAIS: Matiere[] = ["english-maths", "espagnol"];

const RECTIFIES_1990 = new Set([
  "reconnaitre", "reconnait", "reconnais", "connaitre", "connait", "connais",
  "chaine", "chaines", "parait", "paraitre", "apparait", "apparaitre",
  "cout", "couts", "gout", "gouts", "entrainer", "entraine", "entrainement",
  "diner", "abime", "maitre", "maitresse", "maitriser", "maitrise", "naitre",
  "ile", "iles", "boite", "boites", "aout", "bruler", "flute", "cle", "cles",
]);

const nu = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const A_ACCENT = /[àâäéèêëîïôöùûüÿçœæ]/i;
const mots = (s: string) => s.split(/[^A-Za-zÀ-ÿ'’-]+/).filter((m) => m.length >= 3);

type Libelle = { matiere: Matiere; classe: Classe; genre: "notion" | "micro"; id: string; label: string };

const corpus: Libelle[] = [];
for (const [matiere, classes] of COUPLES) {
  for (const classe of classes) {
    for (const [id, label] of Object.entries(getNotionLabelMathMap(classe, matiere))) {
      corpus.push({ matiere, classe, genre: "notion", id, label });
    }
    for (const [id, label] of Object.entries(getMicroLabelMathMap(classe, matiere))) {
      corpus.push({ matiere, classe, genre: "micro", id, label });
    }
  }
}

// ── Le lexique, et les formes nues légitimes ─────────────────────────────────
const lexique = new Map<string, Map<string, number>>();
const nuesLegitimes = new Set<string>();
{
  const parFichier = new Map<string, Libelle[]>();
  for (const l of corpus) {
    if (HORS_FRANCAIS.includes(l.matiere)) continue;
    const cle = `${l.matiere}/${l.classe}/${l.genre}`;
    if (!parFichier.has(cle)) parFichier.set(cle, []);
    parFichier.get(cle)!.push(l);
  }
  for (const [, items] of parFichier) {
    const part = items.filter((i) => A_ACCENT.test(i.label)).length / items.length;
    if (part < 0.2) continue; // fichier écrit sans accents : il ne fait pas référence
    for (const { label } of items) {
      for (const mot of mots(label)) {
        const bas = mot.toLowerCase();
        if (A_ACCENT.test(bas)) {
          const cle = nu(bas);
          if (!lexique.has(cle)) lexique.set(cle, new Map());
          const m = lexique.get(cle)!;
          m.set(bas, (m.get(bas) ?? 0) + 1);
        } else {
          nuesLegitimes.add(bas);
        }
      }
    }
  }
}

type Anomalie = { l: Libelle; genre: string; detail: string };
const anomalies: Anomalie[] = [];

for (const l of corpus) {
  // 1. Accents
  if (!HORS_FRANCAIS.includes(l.matiere)) {
    const suspects: string[] = [];
    for (const mot of mots(l.label)) {
      const bas = mot.toLowerCase();
      if (A_ACCENT.test(bas) || RECTIFIES_1990.has(bas) || nuesLegitimes.has(bas)) continue;
      const cand = lexique.get(bas);
      if (!cand) continue;
      const meilleur = [...cand.entries()].sort((a, b) => b[1] - a[1])[0];
      suspects.push(`${mot} → ${meilleur[0]}`);
    }
    if (suspects.length) anomalies.push({ l, genre: "accent", detail: suspects.join(" · ") });
  }

  // 2. Formules
  const dollars = (l.label.match(/\$/g) ?? []).length;
  if (dollars % 2 !== 0) {
    anomalies.push({ l, genre: "dollar orphelin", detail: l.label });
  } else if (dollars > 0) {
    for (const m of l.label.matchAll(/\$([^$]*)\$/g)) {
      try {
        katex.renderToString(m[1], { throwOnError: true, displayMode: false, output: "html" });
      } catch (e) {
        anomalies.push({ l, genre: "KaTeX", detail: `${m[1]} — ${(e as Error).message}` });
      }
    }
  }

  // 3. Traduction en texte
  // ⛔ SEULEMENT SUR LES LIBELLÉS QUI PORTENT UNE FORMULE. Une accolade hors
  // `$…$` est une notation d'ensemble parfaitement légitime — « Interpréter les
  // écritures {X = a} et {X ≤ a} » (STMG). Sans cette garde, le contrôle
  // condamnait trois libellés justes le jour de son écriture.
  if (dollars >= 2) {
    const texte = libelleTexte(l.label);
    if (/[$\\{}]/.test(texte)) {
      anomalies.push({ l, genre: "macro non traduite", detail: `« ${texte} »` });
    }
  }
}

// ── Rapport ──────────────────────────────────────────────────────────────────
const detail = process.argv.includes("--detail");
const parGenre = new Map<string, Anomalie[]>();
for (const a of anomalies) {
  if (!parGenre.has(a.genre)) parGenre.set(a.genre, []);
  parGenre.get(a.genre)!.push(a);
}

console.log(`\n${corpus.length} libellés lus (notions + micros, toutes matières).`);
if (anomalies.length === 0) {
  console.log("✅ Aucune anomalie : accents posés, formules valides, traduction propre.\n");
  process.exit(0);
}
for (const [genre, items] of parGenre) {
  console.log(`\n### ${genre} — ${items.length}`);
  const montrer = detail ? items : items.slice(0, 10);
  for (const a of montrer) {
    console.log(`  ${a.l.matiere}/${a.l.classe} ${a.l.genre} ${a.l.id}`);
    console.log(`    « ${a.l.label} »`);
    console.log(`    ${a.detail}`);
  }
  if (!detail && items.length > montrer.length) {
    console.log(`  … et ${items.length - montrer.length} autres (--detail)`);
  }
}
console.log(`\n${anomalies.length} anomalies.\n`);
process.exit(1);
