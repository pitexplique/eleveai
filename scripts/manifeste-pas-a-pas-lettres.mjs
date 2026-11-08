// Les 20 paysages « Les lettres, pas à pas » dans le manifeste YouTube.
//
//   node scripts/manifeste-pas-a-pas-lettres.mjs <dossier des journaux de rendu> [lettres]
//
// Lit les instants « TEMPS <clip> <s> » imprimés par la scène
// (manim/scripts/cp/pas_a_pas_lettres.py) dans rendu-hq-<x>.log, et pose ou
// remplace les entrées « cp-pas-a-pas-lettre-<x> ». Les voix sont relues dans
// manim/voix/cp-pas-a-pas-lettre-<x>.json (questions = ce qui est dit).
// ⛔ Le manifeste porte des modifications NON commitées d'autres sessions :
// on le LIT d'abord, on n'y touche qu'à nos entrées, on l'écrit au même format.
// ⛔ Pas de `url` ici : la publication YouTube attend l'ordre de Frédéric.
import fs from "node:fs";
import path from "node:path";

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")), "..");
const MANIFESTE = path.join(RACINE, "manim", "manifeste-youtube.json");
const journaux = process.argv[2];
if (!journaux) throw new Error("dossier des journaux de rendu manquant");
const LETTRES = (process.argv[3] ?? "acdefghiklmnopqrstuy").split("");
const DANS = new Set(["e", "u", "y"]);
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function temps(x) {
  const log = fs.readFileSync(path.join(journaux, `rendu-hq-${x}.log`), "utf8");
  const t = {};
  for (const m of log.matchAll(/TEMPS (\S+) ([\d.]+)/g)) t[m[1]] ??= Number(m[2]);
  return t;
}

// « Question ! Quel mot commence par la lettre m ? Moto, ou sac ? » → ["moto", "sac"]
function choixQ3(phrase) {
  const fin = phrase.split("?").slice(-2, -1)[0].trim();
  return fin.split(", ou ").map((s) => s.trim().toLowerCase());
}

const texte = fs.readFileSync(MANIFESTE, "utf8");
const manifeste = JSON.parse(texte);
const avant = manifeste.videos.length;

for (const x of LETTRES) {
  const t = temps(x);
  const v = JSON.parse(fs.readFileSync(path.join(RACINE, "manim", "voix", `cp-pas-a-pas-lettre-${x}.json`), "utf8"));
  const dossier = `cp/francais/paysage/fr/pas-a-pas/lettre-${x}`;
  const droite2 = v["17-q2-rep"].includes("droite");
  const choix3 = choixQ3(v["20-q3"]);
  const bon3 = v["21-q3-rep"].split(" !")[0].toLowerCase();
  const q3 = DANS.has(x)
    ? `Dans quel mot il y a la lettre ${x} ?`
    : x === "q" ? "Quel mot commence par qu ?" : `Quel mot commence par ${x} ?`;
  const entree = {
    id: `cp-pas-a-pas-lettre-${x}`,
    classe: "cp",
    ceinture: "blanche",
    serie: "La belle écriture",
    type: "longue",
    fichier: `${dossier}/eleveai-francais-cp-pas-a-pas-lettre-${x}.mp4`,
    titre: `Écrire la lettre ${x} en cursive, pas à pas, tout doucement — La belle écriture`,
    accroche:
      `On apprend à écrire la lettre ${x} en écriture cursive, lentement, morceau par morceau. ` +
      "D'abord la méthode : je pose mon crayon sur le point vert, je suis la flèche, et je colorie mon étoile. " +
      "Puis on trace avec le doigt en l'air, on répond à trois petites questions, et on prend sa fiche.\n\n" +
      "Pour les élèves qui apprennent à écrire : CP, ULIS, ou plus tard, avec leur AESH.\n" +
      "🖨️ Le cahier d'écriture à imprimer : https://www.eleveai.fr/fiches-ecriture/mon-cahier\n\n" +
      "Fait à La Réunion 🌋 — Frédéric Lacoste",
    chapitres: [
      ["00:00", `La lettre ${x}`],
      [mmss(t["02-methode"]), "Ma méthode"],
      [mmss(t["06-q1"]), "Question : le point vert"],
      [mmss(t["08-regarde"]), "Le tracé, morceau par morceau"],
      [mmss(t["13-doigt"]), "À toi, avec le doigt"],
      [mmss(t["16-q2"]), `Question : laquelle est le ${x} ?`],
      [mmss(t["18-cherchons"]), DANS.has(x) ? `${x} comme dans…` : x === "q" ? "qu comme…" : `${x} comme…`],
      [mmss(t["20-q3"]), "Question : quel mot ?"],
      [mmss(t["22-fiche"]), "À ta fiche !"],
    ],
    tags: ["écriture", `lettre ${x}`, "cursive", "écriture cursive", "apprendre à écrire", "CP", "ULIS", "belle écriture", "EleveAI"],
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
        question: `Laquelle est la lettre ${x} ?`,
        choix: ["celle de gauche", "celle de droite"],
        reponse: droite2 ? 1 : 0,
        explication: `Le ${x} s'écrit comme on vient de le tracer.`,
      },
      {
        t: mmss(t["20-q3"]),
        question: q3,
        choix: choix3,
        reponse: choix3.indexOf(bon3),
        explication: DANS.has(x) ? `On trouve le ${x} dans « ${bon3} ».` : `« ${bon3} » commence par ${x === "q" ? "qu" : x}.`,
      },
    ],
  };
  if (entree.questions[2].reponse < 0) throw new Error(`${x} : réponse 3 introuvable (${bon3} dans ${choix3})`);
  const miniature = `${dossier}/eleveai-francais-cp-pas-a-pas-lettre-${x}.png`;
  if (fs.existsSync(path.join(RACINE, "manim", "sorties", ...miniature.split("/")))) entree.miniature = miniature;
  const i = manifeste.videos.findIndex((e) => e.id === entree.id);
  // Une entrée déjà publiée garde ce que la publication y a posé (url…).
  if (i >= 0) manifeste.videos[i] = { ...manifeste.videos[i], ...entree };
  else manifeste.videos.push(entree);
}

// Écriture AU MÊME FORMAT : indentation 2, CRLF si le fichier en a.
let sortie = JSON.stringify(manifeste, null, 2) + (texte.endsWith("\n") ? "\n" : "");
if (texte.includes("\r\n")) sortie = sortie.replace(/\n/g, "\r\n");
fs.writeFileSync(MANIFESTE, sortie);
console.log(`manifeste : ${avant} → ${manifeste.videos.length} vidéos`);
