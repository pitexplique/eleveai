// Énigmes à projeter — 4e, notion litteral_expression (écrire une expression
// à partir d'une figure, calculer pour une valeur, réduire, programme de calcul,
// piège 3x × 2x = 6x, défi du cadre photo). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
const NB = " ";

// Les allumettes : 4 carrés de 75 px en ligne (x de 90 à 390), 13 allumettes.
const allumette = (x1: number, y1: number, x2: number, y2: number) =>
  `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${C.jaune}" stroke-width="6" stroke-linecap="round"/>` +
  `<circle cx="${x1}" cy="${y1}" r="6" fill="${C.rose}"/>`;
const allumettes = () => {
  let s = "";
  for (let k = 0; k < 4; k++) {
    const x = 90 + 75 * k;
    s += allumette(x + 6, 150, x + 69, 150);
    s += allumette(x + 6, 225, x + 69, 225);
  }
  for (let k = 0; k <= 4; k++) s += allumette(90 + 75 * k, 156, 90 + 75 * k, 219);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une rangée de 4 carrés faits avec 13 allumettes">
  <text x="240" y="80" fill="${C.craie}" font-size="24" text-anchor="middle">1 carré${NB}: 4 allumettes</text>
  ${s}
  <text x="240" y="290" fill="${C.craie}" font-size="24" text-anchor="middle">4 carrés${NB}: 13 allumettes</text>
  <text x="240" y="360" fill="${C.rose}" font-size="28" text-anchor="middle">n carrés${NB}: ?</text>
  </svg>`;
};

// Le thermomètre et la formule.
const thermometre = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un thermomètre ; la température en degrés Fahrenheit vaut 1,8x + 32 quand il fait x degrés Celsius">
  <rect x="80" y="60" width="44" height="270" rx="22" ${S}/>
  <rect x="92" y="170" width="20" height="160" fill="${C.rose}" fill-opacity=".7"/>
  <circle cx="102" cy="345" r="32" fill="${C.rose}" fill-opacity=".7" stroke="${C.craie}" stroke-width="4"/>
  <text x="310" y="100" font-size="40" text-anchor="middle">✈️</text>
  <text x="310" y="170" fill="${C.pale}" font-size="22" text-anchor="middle">x degrés Celsius</text>
  <text x="310" y="235" fill="${C.bleu}" font-size="36" text-anchor="middle">1,8x + 32</text>
  <text x="310" y="275" fill="${C.pale}" font-size="22" text-anchor="middle">degrés Fahrenheit</text>
  <text x="310" y="350" fill="${C.jaune}" font-size="32" text-anchor="middle">x = 25</text>
  </svg>`;

// Les cartons du déménagement : chaque carton pèse x kg.
const carton = (x: number, y: number) =>
  `<rect x="${x}" y="${y}" width="60" height="60" rx="4" fill="${C.jaune}" fill-opacity=".3" stroke="${C.jaune}" stroke-width="3"/>` +
  `<text x="${x + 30}" y="${y + 40}" fill="${C.craie}" font-size="26" text-anchor="middle">x</text>`;
const sacKg = (x: number, y: number, t: string) =>
  `<rect x="${x}" y="${y}" width="80" height="60" rx="16" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="3"/>` +
  `<text x="${x + 40}" y="${y + 39}" fill="${C.bleu}" font-size="22" text-anchor="middle">${t}</text>`;
const cartons = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Camille porte 3 cartons et un sac de 5 kg ; Hugo porte 2 cartons et un sac de 7 kg">
  <text x="240" y="50" fill="${C.pale}" font-size="22" text-anchor="middle">chaque carton pèse x kg 📦</text>
  <text x="30" y="150" fill="${C.craie}" font-size="24">Camille</text>
  ${carton(140, 105)}${carton(210, 105)}${carton(280, 105)}${sacKg(360, 105, "5 kg")}
  <text x="30" y="280" fill="${C.craie}" font-size="24">Hugo</text>
  ${carton(140, 235)}${carton(210, 235)}${sacKg(290, 235, "7 kg")}
  <text x="240" y="375" fill="${C.rose}" font-size="26" text-anchor="middle">masse totale${NB}?</text>
  </svg>`;

// Le tour de magie : 4 étapes.
const magie = () => {
  const etapes = ["Choisis un nombre x", "Multiplie-le par 4", "Ajoute 6", "Enlève le nombre de départ"];
  let s = "";
  etapes.forEach((t, i) => {
    const y = 100 + 70 * i;
    s += `<rect x="30" y="${y}" width="420" height="54" rx="10" fill="${C.bleu}" fill-opacity=".1" stroke="${C.bleu}" stroke-width="3"/>`;
    s += `<text x="50" y="${y + 36}" fill="${C.craie}" font-size="24">${i + 1}. ${t}</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un tour de magie en 4 étapes : choisir x, multiplier par 4, ajouter 6, enlever le nombre de départ">
  <text x="240" y="70" font-size="44" text-anchor="middle">🎩</text>
  ${s}
  </svg>`;
};

// Le rectangle 3x sur 2x, au bon rapport : 300 px sur 200 px.
const rectangle = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un rectangle de longueur 3x et de largeur 2x ; Nina écrit aire = 6x">
  <rect x="110" y="90" width="300" height="200" fill="${C.bleu}" fill-opacity=".1" ${S}/>
  <text x="260" y="75" fill="${C.rose}" font-size="30" text-anchor="middle">3x</text>
  <text x="80" y="200" fill="${C.rose}" font-size="30" text-anchor="middle">2x</text>
  <text x="240" y="360" fill="${C.rose}" font-size="32" text-anchor="middle">aire = 3x × 2x = 6x${NB}?</text>
  </svg>`;

// Le cadre : photo carrée de côté x, bordure de 2 cm tout autour.
const cadre = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une photo carrée de côté x dans un cadre de 2 cm de large tout autour">
  <rect x="90" y="40" width="300" height="300" fill="${C.jaune}" fill-opacity=".3" stroke="${C.jaune}" stroke-width="4"/>
  <rect x="130" y="80" width="220" height="220" fill="${C.pale}" fill-opacity=".15" ${S}/>
  <text x="240" y="210" font-size="56" text-anchor="middle">🏞️</text>
  <text x="240" y="325" fill="${C.rose}" font-size="26" text-anchor="middle">x</text>
  <path d="M350 190 L390 190" stroke="${C.craie}" stroke-width="3"/>
  <text x="440" y="198" fill="${C.craie}" font-size="22" text-anchor="middle">2 cm</text>
  <text x="240" y="395" fill="${C.pale}" font-size="20" text-anchor="middle">pas à l'échelle</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "litteral_expression",
  titre: "Énigmes sur les expressions littérales",
  description: "Les carrés d'allumettes, la température en voyage, les cartons du déménagement, le tour de magie, le piège de Nina, le défi du cadre photo.",
  problemes: [
    {
      tag: "Énigme 1 · Le jeu d'allumettes",
      titre: "La rangée de carrés",
      question: `Sami aligne des carrés faits avec des allumettes.<br>Les carrés voisins partagent une allumette.<br>Pour 4 carrés, il lui faut <b>13 allumettes</b>.<br><br>Combien d'allumettes pour <b>n carrés</b> ?`,
      reponse: `Le premier carré : 1 allumette à gauche.<br>Puis chaque carré en ajoute 3 : en haut, en bas, à droite.<br>Pour n carrés : <span class="big">3n + 1</span> allumettes.<br>Vérification : 3 × 4 + 1 = 13. ✔`,
      consigne: "Combien d'allumettes faut-il pour n carrés ?",
      verification: { type: "qcm", choix: ["3n + 1", "4n", "n + 3"], bonne: 0 },
      dessin: allumettes(),
    },
    {
      tag: "Énigme 2 · En voyage",
      titre: "Il fait combien là-bas ?",
      question: `Aux États-Unis, la température se donne en degrés Fahrenheit.<br>Quand il fait x degrés Celsius, il fait <b>1,8x + 32</b> degrés Fahrenheit.<br>À New York, il fait <b>25 °C</b>.<br><br>Combien de <b>degrés Fahrenheit</b> ?`,
      reponse: `On remplace x par 25 : 1,8 × 25 + 32.<br>1,8 × 25 = 45, puis 45 + 32 = 77.<br>Il fait <span class="big">77 °F</span>.<br>Bonus : l'eau bout à 100 °C, soit 1,8 × 100 + 32 = 212 °F.`,
      consigne: "Combien de degrés Fahrenheit pour 25 °C ?",
      verification: { type: "courte", attendus: ["77"], unite: "°F" },
      dessin: thermometre(),
    },
    {
      tag: "Énigme 3 · Le déménagement",
      titre: "Les cartons",
      question: `Tous les cartons pèsent <b>x kg</b>.<br>Camille porte 3 cartons et un sac de 5 kg.<br>Hugo porte 2 cartons et un sac de 7 kg.<br><br>Quelle expression <b>réduite</b> donne la masse totale ?`,
      reponse: `Total : 3x + 5 + 2x + 7.<br>On regroupe les x : 3x + 2x = 5x. On regroupe les nombres : 5 + 7 = 12.<br>La masse totale est <span class="big">5x + 12</span> kg.<br>Bonus : si x = 8, cela fait 5 × 8 + 12 = 52 kg.`,
      consigne: "Quelle expression réduite donne la masse totale ?",
      verification: { type: "qcm", choix: ["17x", "5x² + 12", "5x + 12"], bonne: 2 },
      dessin: cartons(),
    },
    {
      tag: "Énigme 4 · Le magicien",
      titre: "Le tour de magie",
      question: `Le magicien Elio propose un programme de calcul.<br>On choisit un nombre x.<br>On le multiplie par 4, on ajoute 6.<br>Puis on enlève le nombre de départ.<br><br>Quelle expression <b>réduite</b> donne le résultat ?`,
      reponse: `Multiplier par 4 : 4x. Ajouter 6 : 4x + 6.<br>Enlever x : 4x + 6 − x.<br>On réduit : 4x − x = 3x. Le résultat est <span class="big">3x + 6</span>.<br>Vérification avec 10 : 40 + 6 − 10 = 36, et 3 × 10 + 6 = 36.`,
      consigne: "Quelle expression réduite donne le résultat du programme ?",
      verification: { type: "qcm", choix: ["3x + 6", "4x + 6", "5x + 6"], bonne: 0 },
      dessin: magie(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le carré oublié",
      sorte: "piege",
      question: `Un rectangle mesure <b>3x</b> sur <b>2x</b>.<br>Nina calcule son aire : 3x × 2x = 6x.<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! 3x × 2x = 3 × x × 2 × x.<br>On regroupe : 3 × 2 = 6 et x × x = x².<br>L'aire est <span class="big">6x²</span>.<br>Vérification avec x = 5 : 15 × 10 = 150, et 6 × 5² = 150. Avec 6x : 30, faux.`,
      consigne: "Quelle est l'aire d'un rectangle de 3x sur 2x ?",
      verification: { type: "qcm", choix: ["6x", "6x²", "5x²"], bonne: 1 },
      dessin: rectangle(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le cadre photo",
      sorte: "defi",
      question: `Une photo carrée a pour côté <b>x cm</b>.<br>On la met dans un cadre de <b>2 cm de large</b> tout autour.<br><br>De combien le <b>périmètre du cadre</b> dépasse-t-il celui de la photo ?<br>Est-ce pareil pour toutes les photos ?`,
      reponse: `Côté du cadre : x + 2 + 2 = x + 4.<br>Périmètre du cadre : 4 × (x + 4) = x + 4 + x + 4 + x + 4 + x + 4 = 4x + 16.<br>Périmètre de la photo : 4x.<br>Il dépasse toujours de <span class="big">16 cm</span>, quel que soit x !<br>Vérification avec x = 10 : 4 × 14 = 56 et 4 × 10 = 40 ; 56 − 40 = 16.`,
      consigne: "De combien de centimètres le périmètre du cadre dépasse-t-il celui de la photo ?",
      verification: { type: "courte", attendus: ["16"], unite: "cm" },
      dessin: cadre(),
    },
  ],
};

export default problemes;
