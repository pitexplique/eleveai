// Génère la liste des notions RÉELLEMENT au programme, classe par classe,
// pour que la matrice d'entrée cesse de la deviner.
//
// Pourquoi : la correspondance était écrite à la main dans coach.ts, et elle
// couvrait 6 notions sur les 22 de Seconde. Un élève qui tapait « vecteurs »
// ou « racine carrée » ne trouvait rien, alors que le coach a la notion.
// Écrire 431 notions à la main, c'est en oublier — et ne jamais les mettre à
// jour quand le programme bouge.
//
// Méthode : on lit le SOURCE des notions.ts, pas le module. C'est la même que
// scripts/auditer-banque.mjs et valider-banques-concours.mjs — les banques sont
// du TypeScript avec des imports, les exécuter demanderait un runner qu'on n'a
// pas.
//
// Usage : node scripts/generer-notions-matrice.mjs
// À relancer quand une notion entre au programme ou en sort.

import fs from "node:fs";
import path from "node:path";

const RACINE = path.resolve("lib/tutor-v4/knowledge");
const SORTIE = path.resolve("lib/matrice/notions.generated.ts");

/** Les matières qu'on expose dans la matrice d'entrée. */
const MATIERES = ["maths", "francais", "english", "espagnol", "ia"];

/** Le nom de matière côté matrice (english → anglais). */
const NOM_MATIERE = { english: "anglais" };

function lireNotions(fichier) {
  const src = fs.readFileSync(fichier, "utf8");
  // Les notions se déclarent { id: "...", label: "...", ... } — on apparie
  // chaque id au premier label qui le suit, dans l'ordre du fichier.
  const blocs = [...src.matchAll(/id:\s*"([a-z0-9_]+)"[\s\S]{0,400}?label:\s*"([^"]+)"/g)];
  return blocs.map((b) => ({ id: b[1], label: b[2] }));
}

const paquets = [];
let total = 0;

for (const matiere of MATIERES) {
  const base = path.join(RACINE, matiere);
  if (!fs.existsSync(base)) continue;

  for (const classe of fs.readdirSync(base)) {
    const fichier = path.join(base, classe, "notions.ts");
    if (!fs.existsSync(fichier)) continue;

    const notions = lireNotions(fichier);
    if (!notions.length) continue;

    paquets.push({ matiere: NOM_MATIERE[matiere] ?? matiere, classe, notions });
    total += notions.length;
    console.log(`${(matiere + "/" + classe).padEnd(22)} ${String(notions.length).padStart(3)}`);
  }
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
// ${total} notions, ${paquets.length} paquets.

export type NotionCoach = { id: string; label: string };

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
