// Énigmes à projeter — 6e, notion fraction_nombre (lire, représenter, fraction
// quotient, fraction et décimal, comparer, écriture mixte). 19/11/2026.
// Phrases courtes (les 6e lisent difficilement) ; fractions en étage.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac, svgFrac } from "../outils";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;

// Un potager de 4 × 2 parcelles de 90 : 3 parcelles de tomates.
const jardin = () => {
  let s = "";
  const tomates = ["0,0", "1,0", "0,1"];
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 2; r++) {
      const x = 60 + c * 90, y = 110 + r * 90;
      const t = tomates.includes(`${c},${r}`);
      s += `<rect x="${x}" y="${y}" width="90" height="90" fill="${t ? C.rose : C.jaune}" fill-opacity="${t ? ".3" : ".1"}" stroke="${C.craie}" stroke-width="3"/>`;
      if (t) s += `<text x="${x + 45}" y="${y + 58}" font-size="36" text-anchor="middle">🍅</text>`;
    }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un potager en 8 parcelles égales, dont 3 de tomates">
  ${s}
  <text x="240" y="80" fill="${C.pale}" font-size="24" text-anchor="middle">8 parcelles égales</text>
  <text x="240" y="350" fill="${C.rose}" font-size="30" text-anchor="middle">les tomates : ? du potager</text>
  </svg>`;
};

// Deux tablettes identiques de 4 × 3 carrés de 34.
const chocolat = () => {
  const tablette = (x0: number, pris: (c: number, r: number) => boolean, couleur: string) => {
    let s = "";
    for (let c = 0; c < 4; c++)
      for (let r = 0; r < 3; r++)
        s += `<rect x="${x0 + c * 34}" y="${140 + r * 34}" width="34" height="34" fill="${couleur}" fill-opacity="${pris(c, r) ? ".45" : ".08"}" stroke="${C.craie}" stroke-width="2"/>`;
    return s;
  };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Deux tablettes de 12 carrés : Léo en mange la moitié, Zoé 6 carrés sur 12">
  ${tablette(52, (c) => c < 2, C.jaune)}
  ${tablette(292, (c, r) => r === 0 || (r === 1 && c < 2), C.bleu)}
  <text x="120" y="115" fill="${C.jaune}" font-size="32" text-anchor="middle">Léo</text>
  <text x="360" y="115" fill="${C.bleu}" font-size="32" text-anchor="middle">Zoé</text>
  <text x="120" y="290" fill="${C.craie}" font-size="26" text-anchor="middle">la moitié</text>
  ${svgFrac(360, 290, 6, 12, C.craie, 28)}
  <text x="240" y="390" fill="${C.rose}" font-size="30" text-anchor="middle">Qui en mange le plus ?</text>
  </svg>`;
};

// 3 crêpes de rayon 60, chacune coupée en 4.
const crepes = () => {
  let s = "";
  for (const cx of [90, 240, 390]) {
    s += `<circle cx="${cx}" cy="170" r="60" fill="${C.jaune}" fill-opacity=".22" stroke="${C.jaune}" stroke-width="4"/>`;
    s += `<path d="M${cx - 60} 170 L${cx + 60} 170 M${cx} 110 L${cx} 230" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 6"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="3 crêpes à partager entre 4 amis">
  ${s}
  <text x="240" y="75" fill="${C.craie}" font-size="28" text-anchor="middle">3 crêpes</text>
  <text x="240" y="300" font-size="40" text-anchor="middle">👧 🧒 👦 👧</text>
  <text x="240" y="345" fill="${C.craie}" font-size="26" text-anchor="middle">4 amis, parts égales</text>
  <text x="240" y="395" fill="${C.rose}" font-size="30" text-anchor="middle">? de crêpe chacun</text>
  </svg>`;
};

// Une gourde de 1 L : corps de 240 de haut, 4 graduations de 60, eau sur 180.
const gourde = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une gourde de 1 litre remplie aux trois quarts">
  <rect x="215" y="74" width="50" height="36" rx="6" ${S} stroke-width="3"/>
  <rect x="192" y="170" width="96" height="178" rx="14" fill="${C.bleu}" fill-opacity=".3"/>
  <rect x="190" y="110" width="100" height="240" rx="18" ${S}/>
  <path d="M190 170 L215 170 M190 230 L215 230 M190 290 L215 290" stroke="${C.craie}" stroke-width="3"/>
  <path d="M300 110 L330 110" stroke="${C.pale}" stroke-width="2" stroke-dasharray="4 4"/>
  <text x="338" y="120" fill="${C.craie}" font-size="26">1 L</text>
  <text x="338" y="180" fill="${C.pale}" font-size="20">4 parts égales</text>
  <text x="120" y="270" fill="${C.rose}" font-size="34" text-anchor="middle">? L</text>
  </svg>`;

// Le piège : ce que dit Tom.
const tom = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Tom écrit : un huitième est plus grand qu'un quart">
  ${svgFrac(140, 180, 1, 8, C.jaune, 64)}
  <text x="240" y="200" fill="${C.craie}" font-size="64" text-anchor="middle">&gt;</text>
  ${svgFrac(340, 180, 1, 4, C.bleu, 64)}
  <text x="240" y="320" fill="${C.pale}" font-size="26" text-anchor="middle">Tom : « car 8 est plus grand que 4 »</text>
  <text x="240" y="385" fill="${C.rose}" font-size="40" text-anchor="middle">Vrai ou faux ?</text>
  </svg>`;

// Une piste ronde de rayon 130, marquée en 4 quarts.
const piste = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une piste ronde coupée en 4 quarts de tour">
  <circle cx="240" cy="210" r="130" fill="none" stroke="${C.rose}" stroke-width="24" stroke-opacity=".3"/>
  <circle cx="240" cy="210" r="130" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <path d="M240 66 L240 94 M240 326 L240 354 M96 210 L124 210 M356 210 L384 210" stroke="${C.craie}" stroke-width="4"/>
  <circle cx="240" cy="340" r="11" fill="${C.jaune}"/>
  <text x="240" y="395" fill="${C.jaune}" font-size="22" text-anchor="middle">départ</text>
  <text x="240" y="190" fill="${C.craie}" font-size="28" text-anchor="middle">7 quarts de tour</text>
  <text x="240" y="240" fill="${C.rose}" font-size="30" text-anchor="middle">= ? tours</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "fraction_nombre",
  titre: "Énigmes sur les fractions",
  description: "Le potager, le chocolat, les crêpes, la gourde, le piège de Tom, les tours de piste.",
  problemes: [
    {
      tag: "Énigme 1 · Au jardin",
      titre: "Le potager",
      question: `Le potager est partagé en <b>8 parcelles égales</b>.<br>Il y a des tomates dans <b>3 parcelles</b>.<br><br>Quelle <b>fraction</b> du potager a des tomates ?`,
      reponse: `Le potager entier, ce sont 8 parts. On en prend 3.<br>Les tomates occupent <span class="big">${frac(3, 8)} du potager</span>.`,
      consigne: "Quelle fraction du potager a des tomates ? (écris-la comme 3/8)",
      verification: { type: "courte", attendus: ["3/8"] },
      dessin: jardin(),
    },
    {
      tag: "Énigme 2 · Au goûter",
      titre: "Le chocolat",
      question: `Léo et Zoé ont la <b>même tablette</b> de 12 carrés.<br>Léo mange <b>la moitié</b> de la sienne.<br>Zoé mange ${frac(6, 12)} de la sienne.<br><br><b>Qui mange le plus ?</b>`,
      reponse: `La moitié de 12 carrés : 12 ÷ 2 = 6 carrés.<br>${frac(6, 12)}, c'est aussi 6 carrés. <span class="big">Ils mangent autant !</span><br>${frac(6, 12)} = ${frac(1, 2)} : deux écritures, la même part.`,
      consigne: "Qui mange le plus de chocolat ?",
      verification: { type: "qcm", choix: ["Léo", "Zoé", "Autant tous les deux"], bonne: 2 },
      dessin: chocolat(),
    },
    {
      tag: "Énigme 3 · À la crêperie",
      titre: "Le partage des crêpes",
      question: `<b>4 amis</b> partagent <b>3 crêpes</b>.<br>Chacun doit avoir la même part.<br><br>Quelle part de crêpe a <b>chaque ami</b> ?`,
      reponse: `On coupe chaque crêpe en 4 quarts : 3 × 4 = 12 quarts.<br>12 ÷ 4 = 3 quarts pour chacun.<br>Chacun a <span class="big">${frac(3, 4)} de crêpe</span> : 3 ÷ 4 = ${frac(3, 4)}.`,
      consigne: "Quelle part de crêpe a chaque ami ?",
      verification: { type: "qcm", choix: ["4/3 de crêpe", "3/4 de crêpe", "1/4 de crêpe"], bonne: 1 },
      dessin: crepes(),
    },
    {
      tag: "Énigme 4 · En randonnée",
      titre: "La gourde",
      question: `Une gourde contient <b>1 litre</b> quand elle est pleine.<br>Elle est remplie aux ${frac(3, 4)}.<br><br><b>Combien de litres</b> d'eau contient-elle ?`,
      reponse: `${frac(3, 4)} = 3 ÷ 4 = 0,75.<br>La gourde contient <span class="big">0,75 L</span>, soit 75 cL.`,
      consigne: "Combien de litres d'eau contient la gourde ?",
      verification: { type: "courte", attendus: ["0,75", "0.75", ",75"], unite: "L" },
      dessin: gourde(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le calcul de Tom",
      sorte: "piege",
      question: `Tom dit : « ${frac(1, 8)} est plus grand que ${frac(1, 4)}, car 8 est plus grand que 4. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Coupe un ruban en 4 : chaque part est grande.<br>Coupe le même ruban en 8 : chaque part est plus petite.<br>${frac(1, 4)} est plus grand que ${frac(1, 8)} : <span class="big">Tom se trompe.</span><br>Plus on partage, plus les parts sont petites.`,
      consigne: "Tom dit que 1/8 est plus grand que 1/4. A-t-il raison ?",
      verification: { type: "qcm", choix: ["Non : 1/4 est plus grand", "Oui, Tom a raison", "Les deux sont égaux"], bonne: 0 },
      dessin: tom(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les tours de piste",
      sorte: "defi",
      question: `Inès court sur une piste ronde.<br>Elle court <b>7 quarts de tour</b>.<br><br>Combien de <b>tours entiers</b> fait-elle ? Et combien de quarts en plus ?`,
      reponse: `Un tour entier, c'est 4 quarts. 7 = 4 + 3.<br>Elle fait <span class="big">1 tour et 3 quarts</span>.<br>${frac(7, 4)} = 1 + ${frac(3, 4)} : une fraction peut être plus grande que 1 !`,
      consigne: "Inès court 7 quarts de tour. Combien cela fait-il ?",
      verification: { type: "qcm", choix: ["2 tours et 3 quarts", "2 tours et 1 quart", "1 tour et 3 quarts"], bonne: 2 },
      dessin: piste(),
    },
  ],
};

export default problemes;
