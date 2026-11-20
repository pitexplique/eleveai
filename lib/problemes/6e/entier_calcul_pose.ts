// Énigmes à projeter — 6e, notion entier_calcul_pose (addition posée avec
// retenues, soustraction posée avec des zéros, multiplication posée, division
// euclidienne posée, le piège des chiffres mal alignés, le défi de l'addition
// à trous). 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-calcul-pose.tsx) : nombres à 3 ou
// 4 chiffres, multiplication par un nombre à 1 chiffre, division par 1 chiffre,
// le reste plus petit que le diviseur, vérifier par l'opération inverse.
// Phrases courtes (les 6e lisent difficilement). Chaque calcul vérifié avec node.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

// Une opération posée : un chiffre par colonne, colonnes de 44 px.
// `col0` = x de la colonne des unités ; les chiffres vont vers la gauche.
const U = 330; // colonne des unités
const PAS = 44;
const ligne = (chiffres: string, y: number, couleur: string = C.craie, decalage = 0) =>
  chiffres
    .split("")
    .reverse()
    .map(
      (ch, i) =>
        `<text x="${U - (i + decalage) * PAS}" y="${y}" fill="${couleur}" font-size="44" text-anchor="middle">${ch}</text>`
    )
    .join("");
// Une case vide (le chiffre à trouver) dans la colonne n (0 = unités).
const caseVide = (n: number, y: number, couleur: string = C.rose) =>
  `<rect x="${U - n * PAS - 18}" y="${y - 38}" width="36" height="46" rx="5" fill="${couleur}" fill-opacity=".12" stroke="${couleur}" stroke-width="3"/>`;
const barre = (x1: number, y: number) =>
  `<path d="M${x1} ${y} L${U + 30} ${y}" stroke="${C.craie}" stroke-width="4" stroke-linecap="round" fill="none"/>`;

// 1. L'addition posée 467 + 285, résultat en 3 cases vides.
const additionCantine = () => `<svg viewBox="0 0 480 420" role="img" aria-label="L'addition posée 467 plus 285, le résultat est à trouver">
  <text x="420" y="70" font-size="40" text-anchor="middle">🍽️</text>
  <text x="120" y="70" fill="${C.pale}" font-size="20" text-anchor="start">lundi et mardi</text>
  ${ligne("467", 150)}
  <text x="170" y="210" fill="${C.bleu}" font-size="44" text-anchor="middle">+</text>
  ${ligne("285", 210)}
  ${barre(150, 235)}
  ${caseVide(0, 290)}${caseVide(1, 290)}${caseVide(2, 290)}
  <text x="240" y="380" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de repas${NB}?</text>
  </svg>`;

// 2. La soustraction posée 1 000 − 637, résultat à trouver.
const soustractionFestival = () => `<svg viewBox="0 0 480 420" role="img" aria-label="La soustraction posée 1 000 moins 637, le résultat est à trouver">
  <text x="420" y="70" font-size="40" text-anchor="middle">🎪</text>
  ${ligne("1000", 150)}
  <text x="126" y="210" fill="${C.bleu}" font-size="44" text-anchor="middle">−</text>
  ${ligne("637", 210)}
  ${barre(150, 235)}
  ${caseVide(0, 290)}${caseVide(1, 290)}${caseVide(2, 290)}
  <text x="240" y="380" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de places libres${NB}?</text>
  </svg>`;

// 3. La multiplication posée 156 × 6, résultat à trouver.
const multiplicationFerme = () => `<svg viewBox="0 0 480 420" role="img" aria-label="La multiplication posée 156 fois 6, le résultat est à trouver">
  <text x="420" y="70" font-size="40" text-anchor="middle">🥚</text>
  ${ligne("156", 150)}
  <text x="214" y="210" fill="${C.bleu}" font-size="44" text-anchor="middle">×</text>
  ${ligne("6", 210)}
  ${barre(190, 235)}
  ${caseVide(0, 290)}${caseVide(1, 290)}${caseVide(2, 290)}
  <text x="240" y="380" fill="${C.rose}" font-size="26" text-anchor="middle">Combien d'œufs${NB}?</text>
  </svg>`;

// 4. La division posée 94 ÷ 6 (la potence), quotient et reste à trouver.
const divisionVerger = () => `<svg viewBox="0 0 480 420" role="img" aria-label="La division posée de 94 par 6 : le quotient et le reste sont à trouver">
  <text x="420" y="70" font-size="40" text-anchor="middle">🌳</text>
  <text x="160" y="150" fill="${C.craie}" font-size="44" text-anchor="middle">9</text>
  <text x="204" y="150" fill="${C.craie}" font-size="44" text-anchor="middle">4</text>
  <path d="M240 110 L240 300 M240 165 L360 165" stroke="${C.craie}" stroke-width="4" stroke-linecap="round" fill="none"/>
  <text x="300" y="150" fill="${C.bleu}" font-size="44" text-anchor="middle">6</text>
  <rect x="262" y="180" width="76" height="50" rx="5" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  <text x="300" y="268" fill="${C.pale}" font-size="20" text-anchor="middle">quotient</text>
  <rect x="160" y="255" width="50" height="50" rx="5" fill="${C.jaune}" fill-opacity=".15" stroke="${C.jaune}" stroke-width="3"/>
  <text x="120" y="290" fill="${C.pale}" font-size="20" text-anchor="end">reste</text>
  <text x="240" y="380" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de sachets pleins${NB}?</text>
  </svg>`;

// 5. Le piège : 438 + 52 posé avec le 52 décalé d'une colonne (sous le 43).
// 438 + 520 = 958 : c'est ce qu'a écrit Ethan.
const additionDecalee = () => `<svg viewBox="0 0 480 420" role="img" aria-label="L'addition d'Ethan : 438 plus 52, le 52 est écrit sous le 4 et le 3, et le résultat écrit est 958">
  <text x="420" y="70" font-size="40" text-anchor="middle">🏀</text>
  ${ligne("438", 150)}
  <text x="170" y="210" fill="${C.bleu}" font-size="44" text-anchor="middle">+</text>
  ${ligne("52", 210, C.craie, 1)}
  ${barre(150, 235)}
  ${ligne("958", 290, C.rose)}
  <text x="240" y="370" fill="${C.craie}" font-size="22" text-anchor="middle">Ethan${NB}: «${NB}438 + 52 = 958${NB}»</text>
  <text x="240" y="405" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-il raison${NB}?</text>
  </svg>`;

// 6. Le défi : 4 ■ 6 + ■ 7 ■ = 1 0 2 3 (une seule solution : 446 + 577).
const additionATrous = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une addition posée à trous : 4, case vide, 6, plus case vide, 7, case vide, égale 1 023">
  <text x="420" y="70" font-size="40" text-anchor="middle">🔒</text>
  <text x="${U - 2 * PAS}" y="150" fill="${C.craie}" font-size="44" text-anchor="middle">4</text>
  ${caseVide(1, 150, C.bleu)}
  <text x="${U}" y="150" fill="${C.craie}" font-size="44" text-anchor="middle">6</text>
  <text x="170" y="210" fill="${C.bleu}" font-size="44" text-anchor="middle">+</text>
  ${caseVide(2, 210)}
  <text x="${U - PAS}" y="210" fill="${C.craie}" font-size="44" text-anchor="middle">7</text>
  ${caseVide(0, 210)}
  ${barre(150, 235)}
  ${ligne("1023", 290)}
  <text x="240" y="360" fill="${C.pale}" font-size="20" text-anchor="middle">le code${NB}= le nombre du bas</text>
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">Quel est le code${NB}?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "entier_calcul_pose",
  titre: "Énigmes sur le calcul posé",
  description: "Les repas de la cantine, les places du festival, les œufs de la ferme, les letchis du verger, le piège des chiffres mal alignés, le défi du cadenas à trous.",
  problemes: [
    {
      tag: "Énigme 1 · À la cantine",
      titre: "Les repas de la cantine",
      question: `Lundi, la cantine sert <b>467 repas</b>.<br>Mardi, elle en sert <b>285</b>.<br>Le cuisinier pose l'addition.<br><br>Combien de repas en tout ?`,
      reponse: `Unités : 7 + 5 = 12. J'écris 2, je retiens 1.<br>Dizaines : 6 + 8 + 1 = 15. J'écris 5, je retiens 1.<br>Centaines : 4 + 2 + 1 = 7.<br>Vérification : 752 − 285 = 467.<br>La cantine sert <span class="big">752 repas</span>.`,
      consigne: "Pose et calcule : 467 + 285.",
      verification: { type: "courte", attendus: ["752"], unite: "repas" },
      dessin: additionCantine(),
    },
    {
      tag: "Énigme 2 · Au festival",
      titre: "Les places du festival",
      question: `Le festival a <b>1 000 places</b>.<br>On a déjà vendu <b>637 billets</b>.<br><br>Combien de places reste-t-il ?`,
      reponse: `On pose 1 000 − 637.<br>Unités : 0 − 7, impossible. 10 − 7 = 3.<br>Dizaines : 10 − (3 + 1) = 6.<br>Centaines : 10 − (6 + 1) = 3.<br>Vérification : 363 + 637 = 1 000.<br>Il reste <span class="big">363 places</span>.`,
      consigne: "Combien font 1 000 − 637 ?",
      verification: { type: "qcm", choix: ["363", "373", "437"], bonne: 0 },
      dessin: soustractionFestival(),
    },
    {
      tag: "Énigme 3 · À la ferme",
      titre: "Les boîtes d'œufs",
      question: `À la ferme, Lina range les œufs.<br>Elle remplit <b>156 boîtes</b>.<br>Chaque boîte contient <b>6 œufs</b>.<br><br>Combien d'œufs a-t-elle rangés ?`,
      reponse: `On pose 156 × 6.<br>6 × 6 = 36. J'écris 6, je retiens 3.<br>5 × 6 + 3 = 33. J'écris 3, je retiens 3.<br>1 × 6 + 3 = 9.<br>Ordre de grandeur : 150 × 6 = 900. C'est proche.<br>Lina a rangé <span class="big">936 œufs</span>.`,
      consigne: "Pose et calcule : 156 × 6.",
      verification: { type: "courte", attendus: ["936"], unite: "œufs" },
      dessin: multiplicationFerme(),
    },
    {
      tag: "Énigme 4 · Au verger",
      titre: "Les letchis en sachets",
      question: `À Saint-Paul, Zoé cueille <b>94 letchis</b>.<br>Elle fait des sachets de <b>6 letchis</b>.<br><br>Combien de sachets pleins ?<br>Combien de letchis restent ?`,
      reponse: `On pose la division 94 ÷ 6.<br>En 9 dizaines : 1 fois 6, il reste 3 dizaines.<br>On abaisse le 4 : 34. En 34 : 5 fois 6 = 30, reste 4.<br>Le reste 4 est plus petit que 6 : c'est fini.<br>Vérification : 6 × 15 + 4 = 90 + 4 = 94.<br><span class="big">15 sachets, reste 4</span>.`,
      consigne: "On partage 94 letchis en sachets de 6. Combien de sachets pleins, et combien de letchis restent ?",
      verification: { type: "qcm", choix: ["14 sachets, il reste 10", "16 sachets, il ne reste rien", "15 sachets, il reste 4"], bonne: 2 },
      dessin: divisionVerger(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les points du basket",
      sorte: "piege",
      question: `L'équipe d'Ethan a <b>438 points</b>.<br>Au dernier match, elle marque <b>52 points</b>.<br>Ethan pose l'addition. Il trouve <b>958</b>.<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Le 2 de 52 n'est pas sous le 8.<br>Ethan a mis 52 sous le 4 et le 3 : il a calculé 438 + 520.<br>On aligne les unités : le 2 sous le 8.<br>8 + 2 = 10. J'écris 0, je retiens 1. 3 + 5 + 1 = 9. Puis 4.<br>Ordre de grandeur : 440 + 50 = 490.<br>Le bon total est <span class="big">490 points</span>.`,
      consigne: "Pose correctement et calcule : 438 + 52.",
      verification: { type: "courte", attendus: ["490"], unite: "points" },
      dessin: additionDecalee(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le cadenas à trous",
      sorte: "defi",
      question: `Dans une salle d'énigmes, un cadenas attend un code.<br>Sur le mur, une addition posée a <b>3 chiffres effacés</b>.<br>Le code, c'est le <b>nombre du bas</b>.<br><br>Quel est le code ?`,
      reponse: `Unités : 6 + ? se termine par 3. C'est 6 + 7 = 13. Je retiens 1.<br>Dizaines : ? + 7 + 1 se termine par 2. C'est 4 + 7 + 1 = 12. Je retiens 1.<br>Centaines : 4 + ? + 1 = 10. C'est 4 + 5 + 1 = 10.<br>L'addition est 446 + 577 = 1 023.<br>Le code est <span class="big">577</span>.`,
      consigne: "Dans l'addition 4?6 + ?7? = 1 023, quel est le nombre du bas ?",
      verification: { type: "courte", attendus: ["577"] },
      dessin: additionATrous(),
    },
  ],
};

export default problemes;
