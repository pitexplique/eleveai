// Énigmes à projeter — 4e, notion prop_proportionnalite (le bambou de la serre :
// régulier n'est pas proportionnel, la course de Sofia : passage à l'unité,
// la fromagerie : lire un graphique de proportionnalité, l'orage : trouver la
// relation d = 340 × t, piège du linge qui sèche « 5 fois plus de serviettes,
// 5 fois plus de temps », défi des roues dentées : coefficient 36 ÷ 15 = 2,4).
// Figures au bon rapport : piste à 0,24 px par mètre ; graphique à 9 px par
// litre et 70 px par kilo, droite de (0 ; 0) à (40 ; 4) ; rayons des roues
// proportionnels aux dents (120 px et 50 px, rapport 2,4). Pas de prix, pas de
// La Réunion ici. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

// Un tableau à deux lignes : colonne d'en-tête de 130 px, colonnes de 80 px.
const tableau = (y: number, entetes: [string, string], haut: string[], bas: string[], coulBas: string = C.craie) => {
  const x0 = 50;
  const w0 = 130;
  const w = 80;
  const h = 56;
  const larg = w0 + w * haut.length;
  let s = `<rect x="${x0}" y="${y}" width="${larg}" height="${2 * h}" fill="none" stroke="${C.craie}" stroke-width="3"/>`;
  s += `<path d="M${x0} ${y + h} L${x0 + larg} ${y + h} M${x0 + w0} ${y} L${x0 + w0} ${y + 2 * h}" stroke="${C.craie}" stroke-width="3" fill="none"/>`;
  for (let k = 1; k < haut.length; k++) {
    s += `<path d="M${x0 + w0 + k * w} ${y} L${x0 + w0 + k * w} ${y + 2 * h}" stroke="${C.craie}" stroke-width="2" fill="none"/>`;
  }
  s += txt(x0 + w0 / 2, y + 36, entetes[0], C.pale, 22);
  s += txt(x0 + w0 / 2, y + h + 36, entetes[1], C.pale, 22);
  haut.forEach((v, k) => {
    s += txt(x0 + w0 + k * w + w / 2, y + 36, v, C.craie, 24);
    s += txt(x0 + w0 + k * w + w / 2, y + h + 36, bas[k], coulBas, 24);
  });
  return s;
};

// Le bambou : jour 2 → 50 cm, jour 4 → 70 cm, jour 6 → 90 cm.
const bambou = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau : au jour 2, le bambou mesure 50 cm ; au jour 4, 70 cm ; au jour 6, 90 cm">
  <text x="240" y="90" font-size="56" text-anchor="middle">🎋</text>
  ${txt(240, 150, "le bambou de Mia", C.craie, 24)}
  ${tableau(190, ["jour", "cm"], ["2", "4", "6"], ["50", "70", "90"], C.bleu)}
  ${txt(240, 370, `proportionnel${NB}?`, C.rose, 26)}
  </svg>`;

// La piste : 0,24 px par mètre. 400 m → 96 px ; 1 500 m → 360 px.
const piste = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux bandes à la même échelle : 400 mètres courus en 80 secondes, puis 1 500 mètres en un temps inconnu">
  <text x="240" y="80" font-size="52" text-anchor="middle">🏃</text>
  ${txt(60, 150, "400 m", C.craie, 24, "start")}
  <rect x="60" y="165" width="96" height="40" fill="${C.bleu}" fill-opacity=".4" stroke="${C.bleu}" stroke-width="3"/>
  ${txt(172, 194, "80 s", C.bleu, 24, "start")}
  ${txt(60, 270, `1${NB}500 m`, C.craie, 24, "start")}
  <rect x="60" y="285" width="360" height="40" fill="${C.jaune}" fill-opacity=".4" stroke="${C.jaune}" stroke-width="3"/>
  ${txt(240, 370, `? secondes`, C.rose, 26)}
  ${txt(240, 405, "allure régulière", C.pale, 22)}
  </svg>`;

// La fromagerie : origine (70 ; 360), 9 px par litre, 70 px par kilo.
// (10 ; 1) → (160 ; 290), (20 ; 2) → (250 ; 220), (40 ; 4) → (430 ; 80).
// 3,5 kg → y = 360 − 245 = 115.
const fromagerie = () => {
  const X = (l: number) => 70 + 9 * l;
  const Y = (kg: number) => 360 - 70 * kg;
  let grille = "";
  let nombres = "";
  for (const l of [10, 20, 30, 40]) {
    grille += `M${X(l)} ${Y(0)} L${X(l)} ${Y(4)} `;
    nombres += txt(X(l), 388, String(l), C.pale, 20);
  }
  for (const kg of [1, 2, 3, 4]) {
    grille += `M${X(0)} ${Y(kg)} L${X(40)} ${Y(kg)} `;
    nombres += txt(60, Y(kg) + 7, String(kg), C.pale, 20, "end");
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Graphique : la masse de fromage en kilos selon le lait en litres ; une droite passe par l'origine, par le point 10 litres et 1 kilo, et par le point 20 litres et 2 kilos">
  <path d="${grille}" stroke="${C.pale}" stroke-width="1" stroke-opacity=".5" stroke-dasharray="5 5" fill="none"/>
  <path d="M70 360 L440 360 M70 360 L70 60" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${txt(60, 384, "0", C.pale, 20, "end")}
  ${nombres}
  <path d="M${X(0)} ${Y(0)} L${X(40)} ${Y(4)}" stroke="${C.bleu}" stroke-width="4" fill="none"/>
  <circle cx="${X(10)}" cy="${Y(1)}" r="7" fill="${C.jaune}"/>
  <circle cx="${X(20)}" cy="${Y(2)}" r="7" fill="${C.jaune}"/>
  <path d="M${X(0)} ${Y(3.5)} L${X(6)} ${Y(3.5)}" stroke="${C.rose}" stroke-width="3" stroke-dasharray="8 6" fill="none"/>
  ${txt(82, Y(3.5) - 10, "3,5 kg", C.rose, 22, "start")}
  ${txt(80, 42, "fromage (kg) 🧀", C.craie, 22, "start")}
  ${txt(440, 348, "lait (L)", C.craie, 22, "end")}
  </svg>`;
};

// L'orage : tableau temps → distance.
const orage = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau : 3 secondes pour 1 020 mètres, 5 secondes pour 1 700 mètres, 8 secondes pour 2 720 mètres">
  <text x="240" y="90" font-size="56" text-anchor="middle">⚡</text>
  ${txt(240, 150, "éclair, puis tonnerre", C.craie, 24)}
  ${tableau(190, ["t (s)", "d (m)"], ["3", "5", "8"], [`1${NB}020`, `1${NB}700`, `2${NB}720`], C.jaune)}
  ${txt(240, 370, `d = ?`, C.rose, 28)}
  </svg>`;

// Le linge : 5 serviettes sur un fil, un soleil.
const linge = () => {
  let s = "";
  for (let k = 0; k < 5; k++) {
    const x = 62 + 76 * k;
    s += `<rect x="${x}" y="150" width="56" height="90" rx="4" fill="${k % 2 ? C.bleu : C.rose}" fill-opacity=".35" stroke="${k % 2 ? C.bleu : C.rose}" stroke-width="3"/>`;
    s += `<rect x="${x + 22}" y="140" width="12" height="18" fill="${C.pale}"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Cinq serviettes étendues côte à côte sur un fil, au soleil ; Ana dit : 5 fois plus de serviettes, donc 10 heures">
  <text x="420" y="80" font-size="52" text-anchor="middle">☀️</text>
  <path d="M30 148 L450 148" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${s}
  ${txt(240, 285, "1 serviette sèche en 2 h", C.craie, 22)}
  <rect x="40" y="320" width="400" height="58" rx="16" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 357, `Ana${NB}: «${NB}5 × 2 = 10 h${NB}»`, C.rose, 24)}
  </svg>`;
};

// Les roues dentées : rayon proportionnel au nombre de dents.
// Grande : 36 dents, r = 120, centre (150 ; 215). Petite : 15 dents, r = 50,
// centre (320 ; 215) (150 + 120 + 50 = 320 : elles se touchent).
// Dents : traits de r à r + 8 ; la grande va de x = 22 à 278, la petite jusqu'à 378.
const roues = () => {
  const dents = (cx: number, cy: number, r: number, n: number, decal: number) => {
    let d = "";
    for (let k = 0; k < n; k++) {
      const a = (2 * Math.PI * k) / n + decal;
      d += `M${r1(cx + r * Math.cos(a))} ${r1(cy + r * Math.sin(a))} L${r1(cx + (r + 8) * Math.cos(a))} ${r1(cy + (r + 8) * Math.sin(a))} `;
    }
    return `<path d="${d}" stroke="${C.craie}" stroke-width="5" fill="none"/>`;
  };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Deux roues dentées qui s'engrènent : la grande a 36 dents et fait 25 tours, la petite a 15 dents">
  <circle cx="150" cy="215" r="120" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="3"/>
  ${dents(150, 215, 120, 36, 0.05)}
  <circle cx="150" cy="215" r="8" fill="${C.craie}"/>
  <circle cx="320" cy="215" r="50" fill="${C.jaune}" fill-opacity=".2" stroke="${C.jaune}" stroke-width="3"/>
  ${dents(320, 215, 50, 15, 0.2)}
  <circle cx="320" cy="215" r="6" fill="${C.craie}"/>
  ${txt(150, 50, "36 dents · 25 tours", C.bleu, 22)}
  ${txt(320, 310, "15 dents", C.jaune, 22)}
  ${txt(400, 360, `? tours`, C.rose, 26)}
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "prop_proportionnalite",
  titre: "Énigmes sur la proportionnalité",
  description: "Le bambou de la serre, la course de Sofia, le graphique de la fromagerie, la relation de l'orage, le piège du linge qui sèche, le défi des roues dentées : reconnaître la proportionnalité, passer par l'unité, lire un graphique, écrire y = k × x.",
  problemes: [
    {
      tag: "Énigme 1 · Dans la serre",
      titre: "Le bambou de Mia",
      question: `Mia mesure un bambou planté dans la serre.<br>Au jour 2, il mesure 50 cm. Au jour 4, 70 cm. Au jour 6, 90 cm.<br><br>La hauteur du bambou est-elle proportionnelle au nombre de jours ?`,
      reponse: `On divise chaque hauteur par son nombre de jours.<br>50 ÷ 2 = 25 ; 70 ÷ 4 = 17,5 ; 90 ÷ 6 = 15.<br>Les quotients ne sont pas égaux.<br>Autre façon : du jour 2 au jour 4, les jours doublent, mais 70 n'est pas le double de 50.<br>Le bambou grandit de 20 cm tous les 2 jours : c'est régulier, mais <span class="big">ce n'est pas proportionnel</span>.`,
      consigne: "La hauteur du bambou est-elle proportionnelle au nombre de jours ?",
      verification: { type: "qcm", choix: ["Oui : il grandit toujours de 20 cm", "Non : 50 ÷ 2 = 25, mais 70 ÷ 4 = 17,5", "Oui : le coefficient est 25"], bonne: 1 },
      dessin: bambou(),
    },
    {
      tag: "Énigme 2 · En athlétisme",
      titre: "La course de Sofia",
      question: `Sofia court à allure régulière.<br>Elle parcourt 400 m en 80 secondes.<br><br>À la même allure, combien de secondes lui faut-il pour 1 500 m ?`,
      reponse: `Je passe par l'unité : en 1 seconde, Sofia parcourt 400 ÷ 80 = 5 m.<br>Pour 1 500 m : 1 500 ÷ 5 = 300 secondes.<br>Contrôle : 1 500 ÷ 400 = 3,75, et 80 × 3,75 = 300.<br>Il lui faut <span class="big">300 secondes</span>, soit 5 minutes.`,
      consigne: "Combien de secondes faut-il à Sofia pour 1 500 m ?",
      verification: { type: "courte", attendus: ["300"], unite: "s" },
      dessin: piste(),
    },
    {
      tag: "Énigme 3 · À la fromagerie",
      titre: "Le lait et le fromage",
      question: `À la fromagerie, le graphique donne la masse de fromage selon le volume de lait.<br>La droite passe par l'origine et par le point (10 ; 1).<br><br>Combien de litres de lait faut-il pour fabriquer 3,5 kg de fromage ?`,
      reponse: `La droite passe par l'origine : la masse de fromage est proportionnelle au lait.<br>Le point (10 ; 1) dit : 10 L de lait donnent 1 kg de fromage.<br>Pour 3,5 kg : 3,5 × 10 = 35 L.<br>Contrôle sur le graphique : à 3,5 kg, la droite est au milieu entre 30 L et 40 L.<br>Il faut <span class="big">35 L de lait</span>.`,
      consigne: "Combien de litres de lait faut-il pour 3,5 kg de fromage ?",
      verification: { type: "courte", attendus: ["35"], unite: "L" },
      dessin: fromagerie(),
    },
    {
      tag: "Énigme 4 · L'orage",
      titre: "La distance de l'éclair",
      question: `Pendant l'orage, Yanis compte les secondes entre l'éclair et le tonnerre.<br>Le tableau donne la distance d de l'éclair selon le temps t.<br>Pour 3 s : 1 020 m. Pour 5 s : 1 700 m. Pour 8 s : 2 720 m.<br><br>Quelle relation relie d et t ?`,
      reponse: `Je divise chaque distance par son temps.<br>1 020 ÷ 3 = 340 ; 1 700 ÷ 5 = 340 ; 2 720 ÷ 8 = 340.<br>Le même quotient partout : c'est le coefficient, 340 m par seconde.<br>La relation est <span class="big">d = 340 × t</span>.<br>Contrôle : 340 × 5 = 1 700. Mais « d = t + 1 017 » ne marche que pour 3 s : 5 + 1 017 = 1 022, pas 1 700.`,
      consigne: "Quelle relation relie la distance d et le temps t ?",
      verification: { type: "qcm", choix: ["d = t + 1 017", "d = 1 020 × t", "d = 340 × t"], bonne: 2 },
      dessin: orage(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le linge qui sèche",
      sorte: "piege",
      question: `Au soleil, une serviette sèche en 2 heures.<br>Ana étend 5 serviettes en même temps, côte à côte.<br>Elle dit : « 5 fois plus de serviettes, donc 5 fois plus de temps : 10 h. »<br><br><b>Combien de temps faut-il vraiment ?</b>`,
      reponse: `Ana s'est trompée ! Elle a cru que c'était proportionnel.<br>Les 5 serviettes sèchent toutes en même temps, chacune de son côté.<br>Le temps ne dépend pas du nombre de serviettes.<br>Il faut toujours <span class="big">2 heures</span>.<br>Avant de multiplier, on vérifie que la situation est vraiment proportionnelle.`,
      consigne: "Combien de temps faut-il pour sécher les 5 serviettes ?",
      verification: { type: "qcm", choix: ["2 h", "10 h", "2 h 30 min"], bonne: 0 },
      dessin: linge(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les roues dentées",
      sorte: "defi",
      question: `Deux roues dentées s'engrènent : chaque dent de la grande pousse une dent de la petite.<br>La grande roue a 36 dents. La petite en a 15.<br>La grande roue fait 25 tours.<br><br>Combien de tours fait la petite roue ?`,
      reponse: `En 25 tours, la grande roue fait passer 25 × 36 = 900 dents.<br>La petite roue a 15 dents : 900 ÷ 15 = 60 tours.<br>Autre méthode : un tour de la grande fait 36 ÷ 15 = 2,4 tours de la petite.<br>Les tours sont proportionnels : 25 × 2,4 = 60.<br>La petite roue fait <span class="big">60 tours</span>.`,
      consigne: "Combien de tours fait la petite roue ?",
      verification: { type: "courte", attendus: ["60"], unite: "tours" },
      dessin: roues(),
    },
  ],
};

export default problemes;
