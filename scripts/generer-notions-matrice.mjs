// Génère la liste des notions RÉELLEMENT au programme, classe par classe,
// pour que la matrice d'entrée cesse de la deviner.
//
// Pourquoi : la correspondance était écrite à la main dans coach.ts, et elle
// couvrait 6 notions sur les 22 de Seconde. Un élève qui tapait « vecteurs »
// ou « racine carrée » ne trouvait rien, alors que le coach a la notion.
// Écrire 431 notions à la main, c'est en oublier — et ne jamais les mettre à
// jour quand le programme bouge.
//
// ⛔ DÉFAUT CORRIGÉ LE 12/08/2026 — LE COLLÈGE ÉTAIT ABSENT, SANS UN MOT.
//
// La première version lisait le SOURCE des notions.ts et y cherchait des
// `id: "…"` / `label: "…"` littéraux. Or les notions du collège ne sont pas
// écrites à la main : `francais/{6e,5e,4e,3e}/notions.ts` ne contient qu'un
//
//     export const notions = buildCollegeFrancaisNotions("5e");
//
// Le motif ne trouvait rien, `if (!notions.length) continue;` sautait la
// classe, et le fichier généré annonçait « 442 notions » sans une seule notion
// de 6e, 5e, 4e ou 3e en français. La ligne manquait dans la sortie console —
// personne ne lit une ligne absente.
//
// Méthode désormais : on CHARGE le module, avec le hook qui résout l'alias `@/`
// (scripts/lib/alias-loader.mjs, écrit le 11/08 pour la même raison dans
// verifier-generateurs.mjs). La lecture du source ne sert plus que de repli, et
// elle le DIT. Toute classe qui ressort à zéro est signalée en fin de rapport.
//
// Usage : node --experimental-strip-types scripts/generer-notions-matrice.mjs
// À relancer quand une notion entre au programme ou en sort.

import fs from "node:fs";
import path from "node:path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("./lib/alias-loader.mjs", import.meta.url);

const RACINE = path.resolve("lib/tutor-v4/knowledge");
const SORTIE = path.resolve("lib/matrice/notions.generated.ts");

/** Les matières qu'on expose dans la matrice d'entrée. */
const MATIERES = ["maths", "francais", "english", "espagnol", "ia"];

/** Le nom de matière côté matrice (english → anglais). */
const NOM_MATIERE = { english: "anglais" };

/** Charge les notions en EXÉCUTANT le module. C'est la seule façon de voir
 *  celles qui sortent d'une fabrique. Renvoie `null` si le module ne se charge
 *  pas — l'appelant se rabat alors sur le source, et le signale. */
async function chargerNotions(fichier) {
  try {
    const mod = await import(pathToFileURL(fichier).href);
    const notions =
      mod.notions ?? Object.values(mod).find((v) => Array.isArray(v) && v.some((x) => x?.id));
    if (!Array.isArray(notions)) return null;
    return notions.map((n) => ({
      id: n.id,
      label: n.label,
      prerequis: Array.isArray(n.prerequis) ? [...n.prerequis] : [],
    }));
  } catch {
    return null;
  }
}

function lireNotions(fichier) {
  const src = fs.readFileSync(fichier, "utf8");
  // Les notions se déclarent { id: "...", label: "...", ... } — on apparie
  // chaque id au premier label qui le suit, dans l'ordre du fichier.
  const blocs = [...src.matchAll(/id:\s*"([a-z0-9_]+)"[\s\S]{0,400}?label:\s*"([^"]+)"/g)];

  return blocs.map((b) => {
    // ⭐ LES PRÉREQUIS AUSSI (07/08). « Préparer une progression », côté
    // professeur, ne peut pas se contenter d'une liste de notions : ce qu'un
    // enseignant construit, c'est un ORDRE, et l'ordre vient des prérequis.
    // Ils sont déjà écrits dans le knowledge (`prerequis: [...]`) — les
    // recopier à la main dans un troisième fichier, c'est garantir qu'ils
    // divergeront.
    //
    // ⚠️ ON S'ARRÊTE AU `id:` SUIVANT, et c'est tout le soin à prendre : sans
    // cette borne, une notion sans prérequis hériterait de ceux de la notion
    // d'après. Chercher « le prochain prerequis » dans le fichier, ça marche
    // 90 % du temps — c'est-à-dire que ça produit dix pour cent de liens faux,
    // impossibles à repérer à l'œil dans 431 notions.
    //
    // (Première version, ratée : je supposais que le champ suivait le label
    // ligne à ligne. Il y a une virgule juste après le label, et le motif ne
    // rattrapait plus rien — 431 notions, zéro prérequis, sans une erreur.)
    const suite = src.slice(b.index + b[0].length);
    const finBloc = suite.search(/\bid:\s*"/);
    const bloc = finBloc >= 0 ? suite.slice(0, finBloc) : suite;
    const m = bloc.match(/prerequis:\s*\[([^\]]*)\]/);
    const prerequis = m ? [...m[1].matchAll(/"([a-z0-9_]+)"/g)].map((x) => x[1]) : [];
    return { id: b[1], label: b[2], prerequis };
  });
}

const paquets = [];
const vides = [];
let total = 0;

for (const matiere of MATIERES) {
  const base = path.join(RACINE, matiere);
  if (!fs.existsSync(base)) continue;

  for (const classe of fs.readdirSync(base)) {
    const fichier = path.join(base, classe, "notions.ts");
    if (!fs.existsSync(fichier)) continue;

    // On exécute d'abord ; on ne relit le source que si le module résiste.
    let notions = await chargerNotions(fichier);
    let repli = false;
    if (!notions || !notions.length) {
      notions = lireNotions(fichier);
      repli = true;
    }

    if (!notions.length) {
      // ⛔ Une classe à zéro ne se saute plus en silence : c'est exactement
      // comme cela que tout le collège avait disparu de la matrice.
      vides.push(`${matiere}/${classe}`);
      continue;
    }

    paquets.push({ matiere: NOM_MATIERE[matiere] ?? matiere, classe, notions });
    total += notions.length;
    console.log(
      `${(matiere + "/" + classe).padEnd(22)} ${String(notions.length).padStart(3)}${repli ? "   ⚠️ lu dans le source" : ""}`,
    );
  }
}

if (vides.length) {
  console.log(`\n⛔ ${vides.length} classe(s) SANS AUCUNE NOTION — à regarder :`);
  for (const v of vides) console.log(`   ${v}`);
}

const entete = `// ⚠️ FICHIER GÉNÉRÉ — NE PAS MODIFIER À LA MAIN.
// Source : lib/tutor-v4/knowledge/<matiere>/<classe>/notions.ts
// Régénérer : node scripts/generer-notions-matrice.mjs
//
// Ce que c'est : les notions RÉELLEMENT au programme de chaque classe, avec
// leur libellé. La matrice d'entrée s'en sert pour deux choses — souffler des
// exemples qui existent vraiment à ce niveau (un élève de Seconde ne doit pas
// lire « les dérivées »), et reconnaître une notion écrite en toutes lettres
// (« vecteurs », « racine carrée ») sans qu'on ait à l'inscrire au lexique.
//
// Elles portent aussi leurs PRÉREQUIS : c'est ce qui permet à « Préparer une
// progression » (côté professeur) de proposer un ORDRE, et pas seulement une
// liste. Un tableau vide veut dire « rien à savoir avant » — donc une notion
// par où l'année peut commencer.
//
// ${total} notions, ${paquets.length} paquets.

export type NotionCoach = { id: string; label: string; prerequis: string[] };

/** matière → classe → notions au programme. */
export const NOTIONS_COACH: Record<string, Record<string, NotionCoach[]>> = ${JSON.stringify(
  paquets.reduce((acc, p) => {
    acc[p.matiere] ??= {};
    acc[p.matiere][p.classe] = p.notions;
    return acc;
  }, {}),
  null,
  2,
)};
`;

fs.writeFileSync(SORTIE, entete);
console.log(`\n${total} notions écrites dans ${path.relative(process.cwd(), SORTIE)}`);
