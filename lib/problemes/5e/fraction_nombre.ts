// Énigmes à projeter — 5e, notion fraction_nombre (fractions égales,
// simplifier, placer, comparer, quotient). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac, svgFrac } from "../outils";

// Un disque coupé en n parts égales, les k premières colorées.
const disque = (cx: number, cy: number, r: number, n: number, k: number, c: string) => {
  let s = "";
  for (let i = 0; i < n; i++) {
    const a0 = -Math.PI / 2 + (2 * Math.PI * i) / n, a1 = -Math.PI / 2 + (2 * Math.PI * (i + 1)) / n;
    const p = (a: number) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
    s += `<path d="M${cx} ${cy} L${p(a0)} A${r} ${r} 0 0 1 ${p(a1)} Z" fill="${i < k ? c : "none"}" fill-opacity=".45" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>`;
  }
  return s;
};

// Une barre de 360 px coupée en n parts, k colorées.
const barre = (x: number, y: number, n: number, k: number, c: string, l = 360) => {
  let s = `<rect x="${x}" y="${y}" width="${(l * k) / n}" height="50" fill="${c}" fill-opacity=".4"/>`;
  for (let i = 1; i < n; i++) s += `<path d="M${x + (l * i) / n} ${y} L${x + (l * i) / n} ${y + 50}" stroke="${C.craie}" stroke-width="2"/>`;
  return s + `<rect x="${x}" y="${y}" width="${l}" height="50" fill="none" stroke="${C.craie}" stroke-width="3"/>`;
};

const pizzas = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux pizzas identiques : l'une en 4 parts dont 3 mangées, l'autre en 8 parts dont 6 mangées">
  ${disque(130, 200, 95, 4, 3, C.jaune)}
  ${disque(350, 200, 95, 8, 6, C.rose)}
  <text x="130" y="340" fill="${C.jaune}" font-size="26" text-anchor="middle">Léa</text>
  <text x="350" y="340" fill="${C.rose}" font-size="26" text-anchor="middle">Sam</text>
  </svg>`;

const devoirs = () => {
  let s = "";
  for (let i = 0; i < 24; i++) {
    const x = 90 + 50 * (i % 6), y = 70 + 55 * Math.floor(i / 6);
    s += `<rect x="${x}" y="${y}" width="40" height="45" rx="4" fill="${i < 18 ? C.bleu : "none"}" fill-opacity=".35" stroke="${C.craie}" stroke-width="2"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="24 copies, dont 18 rendues en bleu">
  ${s}
  <text x="240" y="340" fill="${C.bleu}" font-size="24" text-anchor="middle">18 copies rendues sur 24</text>
  <text x="240" y="385" fill="${C.rose}" font-size="26" text-anchor="middle">en plus simple : ?</text>
  </svg>`;
};

// Droite de 0 à 2 : x = 60 + 180t, un trait tous les tiers (60 px). 5/3 en 360.
const droite = () => {
  let s = `<path d="M40 220 L440 220" stroke="${C.craie}" stroke-width="3"/>`;
  for (let k = 0; k <= 6; k++) {
    const x = 60 + 60 * k, entier = k % 3 === 0;
    s += `<path d="M${x} ${220 - (entier ? 16 : 9)} L${x} ${220 + (entier ? 16 : 9)}" stroke="${C.craie}" stroke-width="${entier ? 3 : 2}"/>`;
    if (entier) s += `<text x="${x}" y="266" fill="${C.craie}" font-size="24" text-anchor="middle">${k / 3}</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une droite graduée de 0 à 2, chaque unité coupée en 3 ; le point M est au deuxième trait après 1">
  ${s}
  <circle cx="360" cy="220" r="9" fill="${C.rose}"/>
  <text x="360" y="180" fill="${C.rose}" font-size="32" text-anchor="middle">M</text>
  <text x="240" y="350" fill="${C.pale}" font-size="22" text-anchor="middle">chaque unité est coupée en 3</text>
  </svg>`;
};

const clubs = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux barres de même longueur : deux tiers et cinq huitièmes">
  <text x="60" y="100" fill="${C.bleu}" font-size="24">club A</text>
  ${barre(60, 115, 3, 2, C.bleu)}
  ${svgFrac(450, 140, 2, 3, C.bleu, 26)}
  <text x="60" y="250" fill="${C.jaune}" font-size="24">club B</text>
  ${barre(60, 265, 8, 5, C.jaune)}
  ${svgFrac(450, 290, 5, 8, C.jaune, 26)}
  </svg>`;

const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux barres de même longueur : deux cinquièmes et deux septièmes">
  <text x="240" y="70" fill="${C.rose}" font-size="26" text-anchor="middle">« 7 &gt; 5, donc 2/7 est plus grand »</text>
  ${barre(50, 130, 5, 2, C.bleu, 350)}
  ${svgFrac(445, 155, 2, 5, C.bleu, 26)}
  ${barre(50, 260, 7, 2, C.jaune, 350)}
  ${svgFrac(445, 285, 2, 7, C.jaune, 26)}
  </svg>`;

const tablettes = () => {
  let s = "";
  for (let i = 0; i < 7; i++) s += `<rect x="${40 + 58 * i}" y="120" width="48" height="80" rx="4" fill="${C.jaune}" fill-opacity=".45" stroke="${C.craie}" stroke-width="3"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="7 tablettes de chocolat partagées entre 3 amis">
  <text x="240" y="80" fill="${C.craie}" font-size="26" text-anchor="middle">7 tablettes</text>
  ${s}
  <circle cx="140" cy="290" r="26" fill="none" stroke="${C.bleu}" stroke-width="4"/>
  <circle cx="240" cy="290" r="26" fill="none" stroke="${C.bleu}" stroke-width="4"/>
  <circle cx="340" cy="290" r="26" fill="none" stroke="${C.bleu}" stroke-width="4"/>
  <text x="240" y="370" fill="${C.rose}" font-size="28" text-anchor="middle">la part de chacun : ?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "fraction_nombre",
  titre: "Énigmes sur les fractions",
  description: "Fractions en 5e : pizzas et fractions égales, simplifier une fraction, placer une fraction sur la droite, comparer deux clubs, piège du 2/7, la fraction comme un partage. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · La pizza",
      titre: "Qui a mangé le plus ?",
      question: `Deux pizzas sont pareilles.<br>Léa mange les ${frac(3, 4)} de la sienne. Sam mange les ${frac(6, 8)} de la sienne.<br><br><b>Qui a mangé le plus ?</b>`,
      reponse: `${frac(6, 8)} = ${frac("6 ÷ 2", "8 ÷ 2")} = ${frac(3, 4)}.<br>Les deux fractions sont égales : <span class="big">autant tous les deux</span>.`,
      consigne: "Qui a mangé le plus de pizza ?",
      verification: { type: "qcm", choix: ["Léa", "Sam", "Autant tous les deux"], bonne: 2 },
      dessin: pizzas(),
    },
    {
      tag: "Énigme 2 · Les devoirs",
      titre: "En plus simple",
      question: `<b>18</b> élèves sur <b>24</b> ont rendu leur devoir.<br>La fraction des élèves qui l'ont rendu est ${frac(18, 24)}.<br><br><b>Simplifie cette fraction</b> le plus possible.`,
      reponse: `18 et 24 sont dans la table de 6 : ${frac(18, 24)} = ${frac("18 ÷ 6", "24 ÷ 6")} = <span class="big">${frac(3, 4)}</span>.`,
      consigne: "Écris 18/24 sous forme simplifiée (ex. 2/5).",
      verification: { type: "courte", attendus: ["3/4"] },
      dessin: devoirs(),
    },
    {
      tag: "Énigme 3 · Sur la droite",
      titre: "Le point M",
      question: `Sur la droite, chaque unité est coupée en <b>3</b>.<br><br><b>Quelle fraction</b> est l'abscisse du point M ?`,
      reponse: `Un petit trait vaut ${frac(1, 3)}. De 0 à M, on compte 5 petits traits.<br>L'abscisse de M est <span class="big">${frac(5, 3)}</span>.`,
      consigne: "Quelle est l'abscisse de M ? (écris-la comme a/b)",
      verification: { type: "courte", attendus: ["5/3"] },
      dessin: droite(),
    },
    {
      tag: "Énigme 4 · Au club de sport",
      titre: "Deux clubs",
      question: `Dans le club A, ${frac(2, 3)} des membres viennent à vélo.<br>Dans le club B, c'est ${frac(5, 8)}.<br><br><b>Dans quel club la part est-elle la plus grande ?</b>`,
      reponse: `Même dénominateur 24 : ${frac(2, 3)} = ${frac(16, 24)} et ${frac(5, 8)} = ${frac(15, 24)}.<br>16 &gt; 15 : c'est le <span class="big">club A</span>.`,
      consigne: "Dans quel club la part qui vient à vélo est-elle la plus grande ?",
      verification: { type: "qcm", choix: ["Club A", "Club B", "C'est pareil"], bonne: 0 },
      dessin: clubs(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le grand dénominateur",
      sorte: "piege",
      question: `Inès dit : « 7 est plus grand que 5, donc ${frac(2, 7)} est plus grand que ${frac(2, 5)}. »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! Couper en 7, ça fait des parts plus petites qu'en 5.<br>2 petites parts &lt; 2 grandes parts : <span class="big">${frac(2, 5)} est plus grand</span>.`,
      consigne: "Laquelle est la plus grande ?",
      verification: { type: "qcm", choix: ["2/7", "2/5", "Elles sont égales"], bonne: 1 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le partage du chocolat",
      sorte: "defi",
      question: `On partage <b>7 tablettes</b> de chocolat entre <b>3 amis</b>, à parts égales.<br><br><b>Quelle fraction</b> de tablette reçoit chacun ?`,
      reponse: `Chacun reçoit 7 ÷ 3 tablettes, et 7 ÷ 3 s'écrit ${frac(7, 3)}.<br>Chacun a <span class="big">${frac(7, 3)}</span> de tablette : 2 tablettes et ${frac(1, 3)}. Vérification : 3 × ${frac(7, 3)} = 7.`,
      consigne: "Quelle fraction de tablette reçoit chacun ? (écris-la comme a/b)",
      verification: { type: "courte", attendus: ["7/3"] },
      dessin: tablettes(),
    },
  ],
};

export default problemes;
