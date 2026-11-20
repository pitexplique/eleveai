// Énigmes à projeter — 6e, notion angle_mesure (angle droit, comparer,
// angle plat, estimer, lire le rapporteur, l'horloge). 20/11/2026.
// ⛔ Chaque angle est dessiné À SA MESURE : coordonnées calculées avec cos/sin.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

/** Le point à la distance r de (cx, cy), dans la direction `deg` (0° = vers la
 *  droite, sens inverse des aiguilles d'une montre, y vers le bas en SVG). */
const P = (cx: number, cy: number, r: number, deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [+(cx + r * Math.cos(a)).toFixed(1), +(cy - r * Math.sin(a)).toFixed(1)];
};
const xy = (p: [number, number]) => `${p[0]} ${p[1]}`;
/** Un arc de cercle de a1 à a2 (degrés, sens inverse des aiguilles). */
const arc = (cx: number, cy: number, r: number, a1: number, a2: number) =>
  `M${xy(P(cx, cy, r, a1))} A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${xy(P(cx, cy, r, a2))}`;

// Trois portes vues d'en haut : ouvertes à 40°, 130° et 90° (porte de 90 px).
const portes = () => {
  const liste: [number, number][] = [[30, 40], [250, 130], [370, 90]];
  let s = "";
  liste.forEach(([hx, a], i) => {
    const y = 280;
    const bout = P(hx, y, 90, a);
    s += `<path d="M${hx} ${y} L${hx + 90} ${y}" stroke="${C.pale}" stroke-width="3" stroke-dasharray="7 6"/>`;
    s += `<path d="M${hx} ${y} L${xy(bout)}" stroke="${C.bleu}" stroke-width="8" stroke-linecap="round"/>`;
    s += `<path d="${arc(hx, y, 32, 0, a)}" stroke="${C.rose}" stroke-width="3" fill="none"/>`;
    s += `<circle cx="${hx}" cy="${y}" r="6" fill="${C.craie}"/>`;
    s += `<text x="${hx + 45}" y="${y + 50}" fill="${C.craie}" font-size="30" text-anchor="middle">${i + 1}</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Trois portes vues d'en haut, ouvertes plus ou moins">
  <text x="240" y="80" fill="${C.pale}" font-size="24" text-anchor="middle">vu d'en haut</text>
  ${s}
  <text x="240" y="390" fill="${C.rose}" font-size="28" text-anchor="middle">Laquelle fait un angle droit ?</text>
  </svg>`;
};

// Deux arroseurs : Lina balaie 70° avec un long jet (rayon 170),
// Sami balaie 110° avec un jet court (rayon 100).
const arroseurs = () => {
  const secteur = (cx: number, cy: number, r: number, ouverture: number, couleur: string) => {
    const a1 = 90 - ouverture / 2, a2 = 90 + ouverture / 2;
    return `<path d="M${cx} ${cy} L${xy(P(cx, cy, r, a1))} A${r} ${r} 0 0 0 ${xy(P(cx, cy, r, a2))} Z" fill="${couleur}" fill-opacity=".25" stroke="${couleur}" stroke-width="4" stroke-linejoin="round"/>` +
      `<circle cx="${cx}" cy="${cy}" r="8" fill="${C.craie}"/>`;
  };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Deux arroseurs : l'un a un long jet, l'autre un jet court mais plus ouvert">
  ${secteur(130, 330, 170, 70, C.bleu)}
  ${secteur(360, 330, 100, 110, C.jaune)}
  <path d="M30 330 L450 330" stroke="${C.pale}" stroke-width="2"/>
  <text x="130" y="375" fill="${C.bleu}" font-size="28" text-anchor="middle">Lina</text>
  <text x="360" y="375" fill="${C.jaune}" font-size="28" text-anchor="middle">Sami</text>
  <text x="240" y="60" fill="${C.rose}" font-size="26" text-anchor="middle">Quel angle est le plus grand ?</text>
  </svg>`;
};

// L'aiguillage : une voie droite, une voie qui part à 35°.
const aiguillage = () => {
  const V: [number, number] = [240, 280];
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une voie ferrée droite et une voie qui part en biais, avec un angle de 35 degrés">
  <path d="M40 280 L440 280" stroke="${C.craie}" stroke-width="6" stroke-linecap="round"/>
  <path d="M${xy(V)} L${xy(P(240, 280, 200, 35))}" stroke="${C.craie}" stroke-width="6" stroke-linecap="round"/>
  <path d="${arc(240, 280, 70, 0, 35)}" stroke="${C.jaune}" stroke-width="4" fill="none"/>
  <path d="${arc(240, 280, 45, 35, 180)}" stroke="${C.rose}" stroke-width="4" fill="none"/>
  <text x="${P(240, 280, 105, 15)[0]}" y="${P(240, 280, 105, 15)[1] + 8}" fill="${C.jaune}" font-size="26" text-anchor="middle">35°</text>
  <text x="${P(240, 280, 75, 110)[0]}" y="${P(240, 280, 75, 110)[1] + 8}" fill="${C.rose}" font-size="30" text-anchor="middle">?</text>
  <text x="100" y="262" font-size="40" text-anchor="middle">🚂</text>
  <text x="240" y="345" fill="${C.pale}" font-size="22" text-anchor="middle">la voie du bas est bien droite</text>
  </svg>`;
};

// Le cerf-volant : la ficelle fait 60° avec le sol (longueur 300).
const cerfVolant = () => {
  const A: [number, number] = [70, 350];
  const K = P(70, 350, 300, 60); // (220, 90)
  const [kx, ky] = K;
  const q = P(70, 350, 88, 30);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un cerf-volant dont la ficelle tendue part du sol en biais">
  <path d="M40 350 L450 350" stroke="${C.pale}" stroke-width="3"/>
  <path d="M${xy(A)} L${kx} ${ky}" stroke="${C.craie}" stroke-width="3"/>
  <path d="M${kx} ${ky - 40} L${kx + 28} ${ky} L${kx} ${ky + 45} L${kx - 28} ${ky} Z" fill="${C.rose}" fill-opacity=".35" stroke="${C.rose}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M${kx} ${ky + 45} q 15 20 0 35 q -15 15 0 30" stroke="${C.jaune}" stroke-width="3" fill="none"/>
  <rect x="64" y="334" width="12" height="20" fill="${C.craie}"/>
  <path d="${arc(70, 350, 60, 0, 60)}" stroke="${C.bleu}" stroke-width="4" fill="none"/>
  <text x="${q[0]}" y="${q[1] + 8}" fill="${C.bleu}" font-size="30" text-anchor="middle">?</text>
  <text x="420" y="385" fill="${C.pale}" font-size="22" text-anchor="middle">le sol</text>
  </svg>`;
};

// Le piège : un angle de 50° sous un rapporteur à deux échelles.
// Échelle bleue (intérieure) : 0 à droite. Échelle noire (extérieure) : 0 à gauche.
const rapporteur = () => {
  const O: [number, number] = [240, 320];
  let t = "";
  for (let d = 0; d <= 180; d += 10) {
    const a = P(240, 320, 162, d), b = P(240, 320, 180, d);
    t += `<path d="M${xy(a)} L${xy(b)}" stroke="${C.craie}" stroke-width="2"/>`;
  }
  const lab = (r: number, d: number, txt: string, couleur: string) => {
    const p = P(240, 320, r, d);
    return `<text x="${p[0]}" y="${p[1] + 7}" fill="${couleur}" font-size="20" text-anchor="middle">${txt}</text>`;
  };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un angle sous un rapporteur à deux échelles de graduations">
  <path d="M60 320 A180 180 0 0 1 420 320 Z" fill="${C.jaune}" fill-opacity=".1" stroke="${C.craie}" stroke-width="3"/>
  ${t}
  ${lab(148, 174, "0", C.craie)}${lab(148, 6, "180", C.craie)}${lab(148, 62, "130", C.craie)}
  ${lab(118, 7, "0", C.bleu)}${lab(118, 173, "180", C.bleu)}${lab(118, 62, "50", C.bleu)}
  <path d="M${xy(O)} L455 320" stroke="${C.bleu}" stroke-width="5" stroke-linecap="round"/>
  <path d="M${xy(O)} L${xy(P(240, 320, 215, 50))}" stroke="${C.bleu}" stroke-width="5" stroke-linecap="round"/>
  <path d="${arc(240, 320, 45, 0, 50)}" stroke="${C.rose}" stroke-width="4" fill="none"/>
  <circle cx="240" cy="320" r="5" fill="${C.craie}"/>
  <text x="240" y="370" fill="${C.craie}" font-size="26" text-anchor="middle">Noé lit : 130°</text>
  <text x="240" y="406" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-il raison ?</text>
  </svg>`;
};

// Le défi : l'horloge à 2 h 30. Petite aiguille à 75° du 12 (entre 2 et 3),
// grande aiguille sur le 6.
const horloge = () => {
  const cx = 240, cy = 210;
  let s = "";
  for (let k = 1; k <= 12; k++) {
    const p = P(cx, cy, 122, 90 - 30 * k);
    s += `<text x="${p[0]}" y="${p[1] + 8}" fill="${C.craie}" font-size="22" text-anchor="middle">${k}</text>`;
    const a = P(cx, cy, 140, 90 - 30 * k), b = P(cx, cy, 150, 90 - 30 * k);
    s += `<path d="M${xy(a)} L${xy(b)}" stroke="${C.craie}" stroke-width="3"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une horloge qui indique 2 heures 30">
  <circle cx="${cx}" cy="${cy}" r="150" fill="${C.bleu}" fill-opacity=".08" stroke="${C.craie}" stroke-width="4"/>
  ${s}
  <path d="M${cx} ${cy} L${xy(P(cx, cy, 75, 15))}" stroke="${C.rose}" stroke-width="9" stroke-linecap="round"/>
  <path d="M${cx} ${cy} L${xy(P(cx, cy, 100, -90))}" stroke="${C.bleu}" stroke-width="6" stroke-linecap="round"/>
  <circle cx="${cx}" cy="${cy}" r="7" fill="${C.craie}"/>
  <text x="240" y="400" fill="${C.craie}" font-size="26" text-anchor="middle">2 h 30</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "angle_mesure",
  titre: "Énigmes sur les angles",
  description: "Les portes ouvertes, les arroseurs, l'aiguillage, le cerf-volant, le piège du rapporteur, l'horloge de 2 h 30.",
  problemes: [
    {
      tag: "Énigme 1 · À la maison",
      titre: "Les trois portes",
      question: `Trois portes sont ouvertes.<br>On les voit <b>d'en haut</b>.<br><br><b>Quelle porte</b> est ouverte à angle droit ?`,
      reponse: `Un angle droit mesure 90°. C'est le coin d'une équerre.<br>Porte 1 : moins ouverte, angle aigu.<br>Porte 2 : plus ouverte, angle obtus.<br><span class="big">La porte 3</span> fait un angle droit.`,
      consigne: "Quelle porte est ouverte à angle droit ?",
      verification: { type: "qcm", choix: ["La porte 1", "La porte 2", "La porte 3"], bonne: 2 },
      dessin: portes(),
    },
    {
      tag: "Énigme 2 · Au jardin",
      titre: "Les deux arroseurs",
      question: `Lina et Sami ont chacun un arroseur.<br>Le jet de Lina va <b>très loin</b>.<br>Le jet de Sami est <b>court</b>.<br><br>Quel arroseur tourne avec le <b>plus grand angle</b> ?`,
      reponse: `La longueur du jet ne compte pas.<br>On regarde seulement l'<b>ouverture</b> entre les deux côtés.<br>Lina : 70°. Sami : 110°.<br><span class="big">L'arroseur de Sami</span> a le plus grand angle.`,
      consigne: "Quel arroseur tourne avec le plus grand angle ?",
      verification: { type: "qcm", choix: ["L'arroseur de Lina", "L'arroseur de Sami", "Les deux, autant"], bonne: 1 },
      dessin: arroseurs(),
    },
    {
      tag: "Énigme 3 · En train",
      titre: "L'aiguillage",
      question: `Une voie ferrée est <b>bien droite</b>.<br>Une autre voie part en biais.<br>Elle fait un angle de <b>35°</b> avec la voie droite.<br><br>Combien mesure l'<b>autre angle</b>, marqué « ? » ?`,
      reponse: `La voie droite forme un angle plat : 180°.<br>Les deux angles ensemble font 180°.<br>180 − 35 = 145.<br>L'autre angle mesure <span class="big">145°</span>. Vérifie : 145 + 35 = 180.`,
      consigne: "Combien mesure l'angle marqué « ? » (en degrés) ?",
      verification: { type: "courte", attendus: ["145"], unite: "°" },
      dessin: aiguillage(),
    },
    {
      tag: "Énigme 4 · Sur la plage",
      titre: "Le cerf-volant",
      question: `Lucas fait voler son cerf-volant.<br>La ficelle est tendue. Elle est attachée à un piquet.<br><br><b>Environ</b> quel angle fait la ficelle avec le sol ?`,
      reponse: `L'angle est plus petit qu'un angle droit : il est aigu. Donc pas 150°.<br>Il est plus grand que la moitié d'un angle droit (45°).<br>C'est <span class="big">environ 60°</span>. Le rapporteur le confirme : 60°.`,
      consigne: "Environ quel angle fait la ficelle avec le sol ?",
      verification: { type: "qcm", choix: ["Environ 30°", "Environ 60°", "Environ 150°"], bonne: 1 },
      dessin: cerfVolant(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le rapporteur de Noé",
      sorte: "piege",
      question: `Noé mesure cet angle avec son rapporteur.<br>Il lit <b>130°</b>.<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Le rapporteur a <b>deux</b> échelles.<br>Un côté de l'angle passe par le <b>0 bleu</b>. On lit donc l'échelle bleue : 50.<br>Et l'angle est aigu : il est plus petit que 90°. 130° serait obtus.<br>L'angle mesure <span class="big">50°</span>.`,
      consigne: "Noé lit 130°. A-t-il raison ?",
      verification: { type: "qcm", choix: ["Non : l'angle mesure 50°", "Oui : l'angle mesure 130°", "Non : l'angle mesure 40°"], bonne: 0 },
      dessin: rapporteur(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'horloge de 2 h 30",
      sorte: "defi",
      question: `Il est <b>2 h 30</b>.<br>Quel angle font les deux aiguilles de l'horloge ?<br><br>Attention : la petite aiguille n'est <b>pas</b> sur le 2 !`,
      reponse: `Un tour complet : 360°. Il y a 12 heures : 360 ÷ 12 = 30° d'un chiffre au suivant.<br>La grande aiguille est sur le 6. La petite est au milieu, entre 2 et 3.<br>Du 3 au 6 : 3 × 30 = 90°. Du milieu au 3 : 30 ÷ 2 = 15°.<br>90 + 15 = <span class="big">105°</span>.`,
      consigne: "À 2 h 30, quel angle font les aiguilles (en degrés) ?",
      verification: { type: "courte", attendus: ["105"], unite: "°" },
      dessin: horloge(),
    },
  ],
};

export default problemes;
