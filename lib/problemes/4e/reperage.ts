// Énigmes à projeter — 4e, notion reperage (la ligne de métro lue avec un pas
// de 0,5, le ruban de couture et l'abscisse en fraction, la bataille navale
// dans un repère du plan, l'araignée au coin de la chambre (pavé droit),
// piège du plongeon « distance avec un nombre négatif », défi des antipodes de
// La Réunion en latitude et longitude).
// Droites et repère au bon rapport : les points sont posés à leurs
// coordonnées exactes. Chambre en perspective cavalière (45°, coefficient
// 0,5), 60 px par m. Falaise au bon rapport : 8 px par m. Le globe n'est
// qu'un schéma. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";
import { frac } from "../outils";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

// La ligne de métro : de −4 à 4, 50 px par unité, une graduation tous les
// 0,5 (25 px). Origine en x = 240. Station S à −2,5 (x = 115), station T à 1,5 (x = 315).
const metro = () => {
  const X = (a: number) => 240 + 50 * a;
  let traits = "";
  for (let k = -8; k <= 8; k++) traits += `M${X(k / 2)} 195 L${X(k / 2)} 225 `;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une ligne de métro droite, graduée ; seules les graduations 0 et 1 sont écrites ; deux stations S et T sont placées dessus">
  <text x="240" y="100" font-size="56" text-anchor="middle">🚇</text>
  <path d="M30 210 L455 210 M443 200 L455 210 L443 220" stroke="${C.craie}" stroke-width="3" fill="none"/>
  <path d="${traits}" stroke="${C.craie}" stroke-width="2" fill="none"/>
  ${txt(X(0), 260, "0", C.craie, 22)}
  ${txt(X(1), 260, "1", C.craie, 22)}
  <circle cx="${X(-2.5)}" cy="210" r="10" fill="${C.rose}"/>
  ${txt(X(-2.5), 180, "S", C.rose, 26)}
  <circle cx="${X(1.5)}" cy="210" r="10" fill="${C.bleu}"/>
  ${txt(X(1.5), 180, "T", C.bleu, 26)}
  ${txt(240, 330, "station Soleil (S)", C.rose, 22)}
  ${txt(240, 365, `abscisse${NB}?`, C.rose, 24)}
  </svg>`;
};

// Le ruban : de 0 à 3, 120 px par unité, chaque unité en 3 parts (40 px).
// Origine x = 60. Le bouton B est à 8/3 : x = 60 + 320 = 380.
const ruban = () => {
  const X = (a: number) => 60 + 120 * a;
  let petits = "";
  for (let k = 0; k <= 9; k++) petits += `M${r1(X(k / 3))} 200 L${r1(X(k / 3))} 220 `;
  let grands = "";
  for (let u = 0; u <= 3; u++) grands += `M${X(u)} 190 L${X(u)} 230 `;
  let nombres = "";
  for (let u = 0; u <= 3; u++) nombres += txt(X(u), 262, String(u), C.craie, 22);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un ruban gradué de 0 à 3 mètres ; chaque mètre est partagé en 3 parts égales ; un bouton B est cousu sur le ruban">
  <text x="240" y="100" font-size="52" text-anchor="middle">🧵</text>
  <rect x="50" y="198" width="390" height="24" fill="${C.jaune}" fill-opacity=".25"/>
  <path d="M40 210 L455 210" stroke="${C.craie}" stroke-width="3" fill="none"/>
  <path d="${petits}" stroke="${C.craie}" stroke-width="2" fill="none"/>
  <path d="${grands}" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${nombres}
  <circle cx="${r1(X(8 / 3))}" cy="210" r="11" fill="${C.rose}"/>
  ${txt(r1(X(8 / 3)), 178, "B", C.rose, 26)}
  ${txt(240, 330, "1 m = 3 parts égales", C.pale, 22)}
  ${txt(240, 365, `abscisse de B en fraction${NB}?`, C.rose, 24)}
  </svg>`;
};

// La bataille navale : x de −5 à 5, y de −4 à 4, 40 px par unité,
// origine (240 ; 200). C (−3 ; 2) → (120 ; 120), A (2 ; −3) → (320 ; 320),
// B (3 ; −2) → (360 ; 280).
const bataille = () => {
  const X = (a: number) => 240 + 40 * a;
  const Y = (b: number) => 200 - 40 * b;
  let grille = "";
  for (let a = -5; a <= 5; a++) grille += `M${X(a)} ${Y(4)} L${X(a)} ${Y(-4)} `;
  for (let b = -4; b <= 4; b++) grille += `M${X(-5)} ${Y(b)} L${X(5)} ${Y(b)} `;
  let nombres = "";
  for (let a = -5; a <= 5; a++) if (a !== 0) nombres += txt(X(a), Y(0) + 22, a < 0 ? `−${-a}` : String(a), C.craie, 20);
  for (let b = -4; b <= 4; b++) if (b !== 0) nombres += txt(X(0) - 6, Y(b) + 7, b < 0 ? `−${-b}` : String(b), C.craie, 20, "end");
  const bateau = (a: number, b: number, l: string) =>
    `<circle cx="${X(a)}" cy="${Y(b)}" r="11" fill="${C.bleu}"/>` + txt(X(a) + 16, Y(b) - 10, l, C.bleu, 24, "start");
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un repère quadrillé, abscisses de moins 5 à 5, ordonnées de moins 4 à 4 ; trois bateaux A, B et C sont placés">
  <path d="${grille}" stroke="${C.pale}" stroke-width="1" stroke-opacity=".5" fill="none"/>
  <path d="M${X(-5) - 10} ${Y(0)} L${X(5) + 18} ${Y(0)} M${X(0)} ${Y(-4) + 10} L${X(0)} ${Y(4) - 18}" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${nombres}
  ${txt(X(0) - 6, Y(0) + 22, "0", C.craie, 20, "end")}
  ${bateau(-3, 2, "C")}
  ${bateau(2, -3, "A")}
  ${bateau(3, -2, "B")}
  ${txt(240, 400, `torpille en (−3${NB}; 2)`, C.rose, 22)}
  </svg>`;
};

// La chambre : pavé 4 m × 3 m × 2,5 m, 60 px par m. Origine O en bas à
// gauche devant (100 ; 340). Longueur 240 px, hauteur 150 px, profondeur
// 3 m → 90 px à 45°, soit 63,6 px en x et en y.
const chambre = () => {
  const d = r1((3 * 60 * 0.5) / Math.SQRT2);
  const x0 = 100, y0 = 340, L = 240, H = 150;
  const P = (a: number, p: number, z: number) => `${r1(x0 + a + p)} ${r1(y0 - z - p)}`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une chambre en forme de pavé droit, en perspective : 4 m de long, 3 m de profondeur, 2,5 m de haut ; l'origine O est un coin du sol, devant à gauche ; une araignée est au coin du plafond, au fond à droite">
  <path d="M${P(0, 0, H)} L${P(0, d, H)} L${P(L, d, H)} L${P(L, 0, H)} Z" fill="${C.jaune}" fill-opacity=".12" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M${P(L, 0, 0)} L${P(L, d, 0)} L${P(L, d, H)} L${P(L, 0, H)} Z" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="${x0}" y="${y0 - H}" width="${L}" height="${H}" fill="${C.jaune}" fill-opacity=".08" stroke="${C.craie}" stroke-width="3"/>
  <path d="M${P(0, 0, 0)} L${P(0, d, 0)} L${P(L, d, 0)} M${P(0, d, 0)} L${P(0, d, H)}" stroke="${C.pale}" stroke-width="2" stroke-dasharray="7 6" fill="none"/>
  <circle cx="${x0}" cy="${y0}" r="6" fill="${C.rose}"/>
  ${txt(x0 - 12, y0 + 24, "O", C.rose, 24, "end")}
  ${txt(x0 + L / 2, y0 + 32, "4 m", C.craie, 22)}
  ${txt(x0 - 12, y0 - H / 2 + 7, "2,5 m", C.craie, 22, "end")}
  ${txt(r1(x0 + L + d / 2 + 14), r1(y0 - d / 2 + 18), "3 m", C.craie, 22, "start")}
  <text x="${r1(x0 + L + d)}" y="${r1(y0 - H - d + 4)}" font-size="34" text-anchor="middle">🕷️</text>
  ${txt(240, 50, "(abscisse ; profondeur ; altitude)".replace(/ ;/g, `${NB};`), C.pale, 20)}
  </svg>`;
};

// La falaise : niveau de la mer en y = 250, 8 px par m. Sommet à +25 m
// (y = 50), plongeur à −8 m (y = 314).
const falaise = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une falaise de 25 m au-dessus de la mer et un plongeur 8 m sous la surface ; Tom pense qu'il y a 17 m entre eux">
  <path d="M60 50 L150 50 L170 250 L60 250 Z" fill="${C.pale}" fill-opacity=".35" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="60" y="250" width="400" height="80" fill="${C.bleu}" fill-opacity=".2"/>
  <path d="M60 250 L460 250" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  <path d="M300 50 L300 314" stroke="${C.craie}" stroke-width="2" stroke-dasharray="6 6" fill="none"/>
  <path d="M290 50 L310 50 M290 250 L310 250 M290 314 L310 314" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${txt(320, 57, "+25 m", C.craie, 22, "start")}
  ${txt(320, 244, "0 m (la mer)", C.craie, 22, "start")}
  ${txt(320, 321, "−8 m", C.craie, 22, "start")}
  <text x="105" y="42" font-size="30" text-anchor="middle">🧍</text>
  <text x="250" y="322" font-size="30" text-anchor="middle">🤿</text>
  <rect x="40" y="348" width="400" height="56" rx="16" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 384, `Tom${NB}: « 25 − 8 = 17 m${NB}»`, C.rose, 24)}
  </svg>`;

// Le globe : un schéma (pas une carte), l'équateur, un point R au sud et à
// l'est, le diamètre qui traverse la Terre jusqu'au point opposé.
const globe = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Schéma de la Terre : l'équateur, La Réunion marquée R à 21 degrés sud et 55 degrés est, et une ligne qui traverse la Terre par son centre jusqu'au point opposé, marqué d'un point d'interrogation">
  <circle cx="240" cy="210" r="150" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="3"/>
  <ellipse cx="240" cy="210" rx="150" ry="36" fill="none" stroke="${C.jaune}" stroke-width="3"/>
  ${txt(86, 216, "équateur", C.jaune, 20, "end")}
  <path d="M300 265 L180 155" stroke="${C.rose}" stroke-width="3" stroke-dasharray="8 6" fill="none"/>
  <circle cx="300" cy="265" r="9" fill="${C.rose}"/>
  <circle cx="180" cy="155" r="9" fill="none" stroke="${C.rose}" stroke-width="3"/>
  <circle cx="240" cy="210" r="5" fill="${C.craie}"/>
  ${txt(250, 296, `R (21° S${NB}; 55° E)`, C.rose, 20, "start")}
  ${txt(166, 140, "?", C.rose, 30, "end")}
  ${txt(240, 395, "pas à l'échelle", C.pale, 20)}
  ${txt(240, 40, "N", C.craie, 22)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "reperage",
  titre: "Énigmes sur le repérage",
  description: "La ligne de métro, le ruban de couture, la bataille navale, l'araignée de la chambre, le piège du plongeon, le défi des antipodes : lire une abscisse sur une droite graduée, repérer une fraction, lire des coordonnées dans un repère du plan, se repérer dans un pavé droit et sur la Terre avec la latitude et la longitude.",
  problemes: [
    {
      tag: "Énigme 1 · Le métro",
      titre: "La station Soleil",
      question: `Une ligne de métro est toute droite.<br>On la gradue comme une droite : la station Centre est à l'origine 0.<br>Seuls 0 et 1 sont écrits.<br><br>Quelle est l'abscisse de la station Soleil (S) ?`,
      reponse: `Entre 0 et 1, il y a 2 graduations : une graduation vaut 0,5.<br>S est à gauche de 0 : son abscisse est négative.<br>On compte 5 graduations de 0 jusqu'à S.<br>5 × 0,5 = 2,5.<br>L'abscisse de S est <span class="big">−2,5</span>.<br>Attention : « −5 » compte les graduations, pas les unités.`,
      consigne: "Quelle est l'abscisse de la station Soleil ?",
      verification: { type: "qcm", choix: ["−5", "−2,5", "2,5"], bonne: 1 },
      dessin: metro(),
    },
    {
      tag: "Énigme 2 · La couture",
      titre: "Le bouton sur le ruban",
      question: `Maëlle coud un bouton sur un ruban gradué en mètres.<br>Chaque mètre est partagé en 3 parts égales.<br><br>Quelle est l'abscisse du bouton B, écrite sous forme de fraction ?`,
      reponse: `Chaque unité est coupée en 3 : le dénominateur est 3.<br>On compte les parts depuis 0 : 3 jusqu'à 1, 6 jusqu'à 2, puis 2 de plus.<br>Cela fait 8 parts : le numérateur est 8.<br>L'abscisse de B est <span class="big">${frac(8, 3)}</span>.<br>Contrôle : 8 ÷ 3 = 2 reste 2, donc B est à 2 et ${frac(2, 3)}.`,
      consigne: "Quelle est l'abscisse du bouton B, en fraction ? (écris par exemple 5/4)",
      verification: { type: "courte", attendus: ["8/3"] },
      dessin: ruban(),
    },
    {
      tag: "Énigme 3 · La bataille navale",
      titre: "Où tombe la torpille ?",
      question: `Yanis et Chloé jouent à la bataille navale dans un repère.<br>Yanis envoie une torpille au point (−3 ; 2).<br><br>Quel bateau est touché ?`,
      reponse: `On lit toujours l'abscisse d'abord, puis l'ordonnée.<br>Abscisse −3 : on part de 0 et on va 3 carreaux à gauche.<br>Ordonnée 2 : on monte de 2 carreaux.<br>On tombe sur le bateau <span class="big">C</span>.<br>A est en (2 ; −3) : les deux nombres sont inversés.<br>B est en (3 ; −2) : les signes sont inversés.`,
      consigne: "Quel bateau est touché par la torpille en (−3 ; 2) ?",
      verification: { type: "qcm", choix: ["A", "B", "C"], bonne: 2 },
      dessin: bataille(),
    },
    {
      tag: "Énigme 4 · La chambre",
      titre: "L'araignée au plafond",
      question: `La chambre de Sacha est un pavé droit : 4 m de long, 3 m de profondeur, 2,5 m de haut.<br>Le point O, un coin du sol, est l'origine.<br>Un point se repère par (abscisse ; profondeur ; altitude).<br>Une araignée est au coin du plafond, au fond à droite.<br><br>Quelles sont ses coordonnées ?`,
      reponse: `L'araignée est tout à droite : abscisse 4.<br>Elle est tout au fond : profondeur 3.<br>Elle est au plafond : altitude 2,5.<br>On garde l'ordre (abscisse ; profondeur ; altitude).<br>Ses coordonnées sont <span class="big">(4 ; 3 ; 2,5)</span>.<br>Aucun zéro : elle n'est ni sur un axe, ni sur une face qui touche O.`,
      consigne: "Quelles sont les coordonnées de l'araignée ?",
      verification: { type: "qcm", choix: ["(4 ; 3 ; 2,5)", "(2,5 ; 3 ; 4)", "(4 ; 2,5 ; 3)"], bonne: 0 },
      dessin: chambre(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le plongeon",
      sorte: "piege",
      question: `On repère les altitudes sur un axe vertical : 0 est le niveau de la mer.<br>Le haut de la falaise est à l'altitude 25 m. Un plongeur est à −8 m.<br>Tom dit : « 25 − 8 = 17. Il y a 17 m entre eux. »<br><br><b>Quelle est la vraie distance entre le haut de la falaise et le plongeur ?</b>`,
      reponse: `Tom s'est trompé ! Il a oublié le signe de −8.<br>Pour une distance, on soustrait la plus petite altitude à la plus grande.<br>25 − (−8) = 25 + 8 = 33.<br>Autre façon : 25 m jusqu'à la mer, puis 8 m sous l'eau.<br>La distance est de <span class="big">33 m</span>.<br>Une distance est toujours positive.`,
      consigne: "Quelle est la distance entre le haut de la falaise et le plongeur ?",
      verification: { type: "courte", attendus: ["33"], unite: "m" },
      dessin: falaise(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "De l'autre côté de la Terre",
      sorte: "defi",
      question: `La Réunion est à 21° de latitude sud et 55° de longitude est.<br>On creuse un tunnel tout droit, qui passe par le centre de la Terre.<br><br>À quelle latitude et quelle longitude ressort-on ?`,
      reponse: `Le point opposé passe de l'autre côté de l'équateur, à la même distance.<br>Latitude : 21° sud devient 21° nord.<br>Il est aussi sur le méridien opposé, à 180° de longitude.<br>Longitude : 180 − 55 = 125, et on passe à l'ouest.<br>On ressort en <span class="big">21° N ; 125° O</span>, en plein océan Pacifique.<br>Contrôle : 55° est + 125° ouest = 180°.`,
      consigne: "À quelle latitude et quelle longitude ressort le tunnel ?",
      verification: { type: "qcm", choix: ["21° N ; 55° O", "21° N ; 125° O", "55° N ; 125° O"], bonne: 1 },
      dessin: globe(),
    },
  ],
};

export default problemes;
