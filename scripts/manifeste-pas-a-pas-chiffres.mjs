// Les 10 paysages « Les chiffres, pas à pas » dans le manifeste YouTube.
//
//   node scripts/manifeste-pas-a-pas-chiffres.mjs <dossier des journaux de rendu>
//
// Lit les instants « TEMPS <clip> <s> » imprimés par la scène
// (manim/scripts/cp/pas_a_pas_chiffres.py) dans rendu-hq-<n>.log, et pose ou
// remplace les entrées « cp-pas-a-pas-chiffre-<n> ».
// ⛔ Le manifeste porte des modifications NON commitées d'autres sessions :
// on le LIT d'abord, on n'y touche qu'à nos dix entrées, et on l'écrit ensuite.
import fs from "node:fs";
import path from "node:path";

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")), "..");
const MANIFESTE = path.join(RACINE, "manim", "manifeste-youtube.json");
const journaux = process.argv[2];
if (!journaux) throw new Error("dossier des journaux de rendu manquant");

const MOTS = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
const LEURRE = { 0: 4, 1: 8, 2: 0, 3: 1, 4: 0, 5: 1, 6: 4, 7: 3, 8: 1, 9: 2 };
const AUTRE = { 0: 2, 1: 4, 2: 5, 3: 6, 4: 1, 5: 2, 6: 3, 7: 4, 8: 5, 9: 6 };
const aDroite = (n, q) => (n + q) % 2 === 0;
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function temps(n) {
  const log = fs.readFileSync(path.join(journaux, `rendu-hq-${n}.log`), "utf8");
  const t = {};
  for (const m of log.matchAll(/TEMPS (\S+) ([\d.]+)/g)) t[m[1]] ??= Number(m[2]);
  return t;
}

const texte = fs.readFileSync(MANIFESTE, "utf8");
const manifeste = JSON.parse(texte);
const avant = manifeste.videos.length;

for (let n = 0; n <= 9; n++) {
  const t = temps(n);
  const mot = MOTS[n];
  const dossier = `cp/francais/paysage/fr/pas-a-pas/chiffre-${n}`;
  const choix2 = aDroite(n, 2) ? [String(LEURRE[n]), String(n)] : [String(n), String(LEURRE[n])];
  const choix3 = aDroite(n, 3) ? [String(AUTRE[n]), String(n)] : [String(n), String(AUTRE[n])];
  const entree = {
    id: `cp-pas-a-pas-chiffre-${n}`,
    classe: "cp",
    ceinture: "blanche",
    serie: "La belle écriture",
    type: "longue",
    fichier: `${dossier}/eleveai-francais-cp-pas-a-pas-chiffre-${n}.mp4`,
    titre: `Écrire le chiffre ${n} pas à pas, tout doucement — La belle écriture`,
    accroche:
      `On apprend à écrire le chiffre ${mot}, lentement, morceau par morceau. ` +
      "D'abord la méthode : je pose mon crayon sur le point vert, je suis la flèche, et je colorie mon étoile. " +
      "Puis on trace avec le doigt en l'air, on répond à trois petites questions, et on prend sa fiche.\n\n" +
      "Pour les élèves qui apprennent à écrire : CP, ULIS, ou plus tard, avec leur AESH.\n" +
      "🖨️ Le cahier d'écriture à imprimer : https://www.eleveai.fr/fiches-ecriture/mon-cahier\n\n" +
      "Fait à La Réunion 🌋 — Frédéric Lacoste",
    chapitres: [
      ["00:00", `Le chiffre ${mot}`],
      [mmss(t["02-methode"]), "Ma méthode"],
      [mmss(t["06-q1"]), "Question : le point vert"],
      [mmss(t["08-regarde"]), "Le tracé, morceau par morceau"],
      [mmss(t["13-doigt"]), "À toi, avec le doigt"],
      [mmss(t["16-q2"]), `Question : lequel est le ${mot} ?`],
      [mmss(t["18-combien"]), `${mot[0].toUpperCase()}${mot.slice(1)}, c'est combien ?`],
      [mmss(t["22-fiche"]), "À ta fiche !"],
    ],
    tags: ["écriture", "chiffre " + n, "cursive", "apprendre à écrire", "CP", "ULIS", "maternelle", "belle écriture", "EleveAI"],
    questions: [
      {
        t: mmss(t["06-q1"]),
        question: "Pour commencer, où je pose mon crayon ?",
        choix: ["sur le point vert", "sur le point rouge"],
        reponse: 0,
        explication: "On part toujours du point vert.",
      },
      {
        t: mmss(t["16-q2"]),
        question: `Lequel est le chiffre ${mot} ?`,
        choix: choix2,
        reponse: choix2.indexOf(String(n)),
        explication: `Le ${mot} s'écrit comme on vient de le tracer.`,
      },
      {
        t: mmss(t["20-q3"]),
        question: n === 0 ? "Combien de pommes dans l'assiette ?" : "Combien d'étoiles ?",
        choix: choix3,
        reponse: choix3.indexOf(String(n)),
        explication: n === 0 ? "L'assiette est vide : zéro." : `On compte : il y en a ${mot}.`,
      },
    ],
  };
  const i = manifeste.videos.findIndex((v) => v.id === entree.id);
  if (i >= 0) manifeste.videos[i] = entree;
  else manifeste.videos.push(entree);
}

// Écriture SÉPARÉE de la lecture, AU MÊME FORMAT : indentation 2, CRLF —
// vérifié le 03/11 : un aller-retour sans modification redonne le fichier à
// l'octet près (2 391 001 octets).
let sortie = JSON.stringify(manifeste, null, 2) + (texte.endsWith("\n") ? "\n" : "");
if (texte.includes("\r\n")) sortie = sortie.replace(/\n/g, "\r\n");
fs.writeFileSync(MANIFESTE, sortie);
console.log(`manifeste : ${avant} → ${manifeste.videos.length} vidéos`);
