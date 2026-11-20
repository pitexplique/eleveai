// Énigmes à projeter — 4e, notion aire_surface (le carrelage de la salle de
// bains : aire du rectangle et du carré, la voile : aire du triangle, le
// manège du poney-club : du carré d'aire connue à son côté, la grange :
// figure composée et problème de peinture, piège du champ de lavande : le
// côté penché du parallélogramme au lieu de la hauteur, défi du pré des
// chèvres : le triangle garde la même aire où que soit son sommet).
// Figures au bon rapport : salle de bains 1 px/cm (320 × 240), voile
// 60 px/m, grange 40 px/m, champ 6 px/m (triangle 18-24-30), pré 11 px/m.
// Pas de La Réunion, pas de prix. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

// La salle de bains : 3,2 m × 2,4 m à 1 px/cm → 320 × 240 px.
// Trois carreaux de 40 cm (40 px) déjà posés dans le coin.
const salleDeBains = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le sol rectangulaire de la salle de bains, 3,2 mètres sur 2,4 mètres ; trois carreaux carrés de 40 centimètres sont posés dans un coin">
  ${txt(240, 50, "le sol de la salle de bains", C.pale, 22)}
  <rect x="80" y="100" width="320" height="240" fill="${C.bleu}" fill-opacity=".06" stroke="${C.craie}" stroke-width="3"/>
  <rect x="80" y="300" width="40" height="40" fill="${C.bleu}" fill-opacity=".35" stroke="${C.bleu}" stroke-width="2"/>
  <rect x="120" y="300" width="40" height="40" fill="${C.bleu}" fill-opacity=".35" stroke="${C.bleu}" stroke-width="2"/>
  <rect x="80" y="260" width="40" height="40" fill="${C.bleu}" fill-opacity=".35" stroke="${C.bleu}" stroke-width="2"/>
  ${txt(240, 88, "3,2 m", C.craie, 24)}
  ${txt(70, 228, "2,4 m", C.craie, 24, "end")}
  ${txt(100, 372, "40 cm", C.bleu, 22)}
  ${txt(255, 215, `combien de`, C.rose, 24)}
  ${txt(255, 245, `carreaux${NB}?`, C.rose, 24)}
  <text x="430" y="60" font-size="36" text-anchor="middle">🛁</text>
  </svg>`;

// La voile : triangle rectangle, 60 px/m. Mât 4 m → 240 px, bôme 2,5 m → 150 px.
const voile = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une planche à voile : la voile est un triangle rectangle, 4 mètres le long du mât, 2,5 mètres le long de la bôme">
  <path d="M150 70 L150 310 L300 310 Z" fill="${C.jaune}" fill-opacity=".35" stroke="${C.jaune}" stroke-width="3"/>
  <path d="M150 50 L150 330" stroke="${C.craie}" stroke-width="6" stroke-linecap="round" fill="none"/>
  <path d="M150 310 L310 310" stroke="${C.craie}" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M150 292 L168 292 L168 310" stroke="${C.craie}" stroke-width="2" fill="none"/>
  <ellipse cx="200" cy="352" rx="150" ry="14" fill="${C.bleu}" fill-opacity=".4" stroke="${C.bleu}" stroke-width="3"/>
  ${txt(135, 198, "4 m", C.craie, 24, "end")}
  ${txt(225, 296, "2,5 m", C.craie, 22)}
  ${txt(380, 150, "aire de", C.rose, 24)}
  ${txt(380, 182, `la voile${NB}?`, C.rose, 24)}
  <path d="M40 395 Q80 380 120 395 T200 395 T280 395 T360 395 T440 395" stroke="${C.bleu}" stroke-width="3" fill="none"/>
  </svg>`;

// Le manège : un carré (côtés égaux, donc au bon rapport), aire 400 m².
const manege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le manège carré du poney-club, d'aire 400 mètres carrés ; la longueur du côté est inconnue">
  <text x="240" y="75" font-size="44" text-anchor="middle">🐴</text>
  <rect x="140" y="110" width="200" height="200" fill="${C.bleu}" fill-opacity=".1" stroke="${C.craie}" stroke-width="4" stroke-dasharray="14 8"/>
  ${txt(240, 220, "400 m²", C.craie, 30)}
  ${txt(240, 345, "côté = ? m", C.rose, 24)}
  ${txt(240, 395, "la barrière fait tout le tour", C.pale, 22)}
  </svg>`;

// La grange, 40 px/m : mur 6 m × 3 m → 240 × 120 px, toit 2 m → 80 px,
// porte 2 m × 2,5 m → 80 × 100 px.
const grange = () => `<svg viewBox="0 0 480 420" role="img" aria-label="La façade d'une grange : un rectangle de 6 mètres sur 3 mètres surmonté d'un triangle de 2 mètres de haut ; une porte de 2 mètres sur 2,5 mètres">
  <path d="M100 240 L220 160 L340 240 L340 360 L100 360 Z" fill="${C.jaune}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>
  <path d="M100 240 L340 240" stroke="${C.craie}" stroke-width="2" stroke-dasharray="6 5" fill="none"/>
  <path d="M220 160 L220 240" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 5" fill="none"/>
  <rect x="180" y="260" width="80" height="100" fill="${C.pale}" fill-opacity=".4" stroke="${C.craie}" stroke-width="3"/>
  ${txt(232, 212, "2 m", C.craie, 20, "start")}
  ${txt(90, 307, "3 m", C.craie, 22, "end")}
  ${txt(220, 392, "6 m", C.craie, 22)}
  ${txt(410, 290, "porte", C.craie, 20)}
  ${txt(410, 318, `2 m × 2,5 m`, C.craie, 20)}
  ${txt(400, 70, `1 pot${NB}: 8 m²`, C.bleu, 22)}
  <text x="400" y="128" font-size="36" text-anchor="middle">🖌️</text>
  </svg>`;

// Le champ, 6 px/m : base 50 m → 300 px, hauteur 24 m → 144 px,
// décalage 18 m → 108 px (18² + 24² = 30², le côté penché fait bien 30 m).
const champ = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un champ en forme de parallélogramme : base 50 mètres, côté penché 30 mètres, hauteur 24 mètres ; Zoé calcule 50 fois 30">
  <path d="M40 320 L340 320 L448 176 L148 176 Z" fill="${C.bleu}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3"/>
  <path d="M148 176 L148 320" stroke="${C.bleu}" stroke-width="3" stroke-dasharray="8 6" fill="none"/>
  <path d="M148 304 L164 304 L164 320" stroke="${C.bleu}" stroke-width="2" fill="none"/>
  ${txt(190, 350, "50 m", C.craie, 22)}
  ${txt(82, 252, "30 m", C.craie, 22, "end")}
  ${txt(156, 254, "24 m", C.bleu, 22, "start")}
  <text x="300" y="120" font-size="36" text-anchor="middle">🌿</text>
  <rect x="60" y="364" width="360" height="46" rx="14" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 395, `Zoé${NB}: «${NB}50 × 30${NB}»`, C.rose, 24)}
  </svg>`;

// Le pré, 11 px/m : 30 m × 20 m → 330 × 220 px. A et B aux coins du bas.
// Piquet de Tom à 8 m du coin (88 px), piquet de Léa au milieu (165 px).
const pre = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un pré rectangulaire de 30 mètres sur 20 mètres ; deux enclos triangulaires ont la même base AB, l'un a son sommet à 8 mètres du coin, l'autre au milieu du bord du haut">
  <text x="440" y="62" font-size="36" text-anchor="middle">🐐</text>
  <rect x="75" y="120" width="330" height="220" fill="none" stroke="${C.pale}" stroke-width="3"/>
  <path d="M75 340 L163 120 L405 340 Z" fill="${C.jaune}" fill-opacity=".3" stroke="${C.jaune}" stroke-width="3"/>
  <path d="M75 340 L240 120 L405 340" stroke="${C.bleu}" stroke-width="3" stroke-dasharray="8 6" fill="none"/>
  <circle cx="75" cy="340" r="6" fill="${C.craie}"/>
  <circle cx="405" cy="340" r="6" fill="${C.craie}"/>
  <circle cx="163" cy="120" r="6" fill="${C.jaune}"/>
  <circle cx="240" cy="120" r="6" fill="${C.bleu}"/>
  ${txt(60, 360, "A", C.craie, 22)}
  ${txt(420, 360, "B", C.craie, 22)}
  ${txt(163, 104, "Tom", C.jaune, 22)}
  ${txt(240, 104, "Léa", C.bleu, 22)}
  ${txt(116, 104, "8 m", C.pale, 20)}
  ${txt(240, 374, "30 m", C.craie, 22)}
  ${txt(415, 237, "20 m", C.craie, 22, "start")}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "aire_surface",
  titre: "Énigmes sur les aires",
  description: "Le carrelage de la salle de bains, la voile, le manège du poney-club, la façade de la grange, le piège du champ de lavande, le défi du pré des chèvres : aires du rectangle, du carré, du triangle et du parallélogramme, figures découpées, problèmes concrets.",
  problemes: [
    {
      tag: "Énigme 1 · La salle de bains",
      titre: "Le carrelage d'Ana",
      question: `Ana carrelle le sol de sa salle de bains.<br>Le sol est un rectangle de <b>3,2 m</b> sur <b>2,4 m</b>.<br>Les carreaux sont des carrés de <b>40 cm</b> de côté.<br><br>Combien de carreaux faut-il, sans en couper ?`,
      reponse: `Aire du sol : 3,2 × 2,4 = 7,68 m².<br>Aire d'un carreau : 0,4 × 0,4 = 0,16 m².<br>Nombre de carreaux : 7,68 ÷ 0,16 = 48.<br>Il faut <span class="big">48 carreaux</span>.<br>Contrôle par les rangées : 320 ÷ 40 = 8 et 240 ÷ 40 = 6.<br>8 rangées de 6 carreaux : 8 × 6 = 48.`,
      consigne: "Combien de carreaux faut-il pour couvrir le sol ?",
      verification: { type: "courte", attendus: ["48"], unite: "carreaux" },
      dessin: salleDeBains(),
    },
    {
      tag: "Énigme 2 · La planche à voile",
      titre: "La voile de Malik",
      question: `La voile de Malik est un triangle rectangle.<br>Le long du mât, elle mesure <b>4 m</b>.<br>Le long de la bôme, elle mesure <b>2,5 m</b>.<br>Le mât et la bôme forment un angle droit.<br><br>Quelle est l'<b>aire</b> de la voile ?`,
      reponse: `Le triangle est la moitié d'un rectangle de 4 m sur 2,5 m.<br>Base 2,5 m, hauteur 4 m : le mât est perpendiculaire à la bôme.<br>Aire = (2,5 × 4) ÷ 2 = 10 ÷ 2 = 5.<br>La voile mesure <span class="big">5 m²</span>.<br>⚠ 10 m², c'est le rectangle entier : on a oublié le « ÷ 2 ».<br>⚠ 6,5 est une somme de longueurs, pas une aire.`,
      consigne: "Quelle est l'aire de la voile ?",
      verification: { type: "qcm", choix: ["10 m²", "6,5 m²", "5 m²"], bonne: 2 },
      dessin: voile(),
    },
    {
      tag: "Énigme 3 · Le poney-club",
      titre: "La barrière du manège",
      question: `Le manège du poney-club est un <b>carré</b>.<br>Son aire est de <b>400 m²</b>.<br>On pose une barrière tout autour.<br><br>Quelle longueur de barrière faut-il ?`,
      reponse: `On cherche d'abord le côté c, avec c × c = 400.<br>20 × 20 = 400 : le côté mesure 20 m.<br>La barrière fait le tour : c'est le périmètre.<br>4 × 20 = 80.<br>Il faut <span class="big">80 m</span> de barrière.<br>⚠ 400 ÷ 4 = 100 n'est pas le côté : 100 × 100 = 10 000 m².`,
      consigne: "Quelle longueur de barrière faut-il, en mètres ?",
      verification: { type: "courte", attendus: ["80"], unite: "m" },
      dessin: manege(),
    },
    {
      tag: "Énigme 4 · La grange",
      titre: "Repeindre la façade",
      question: `Gabin repeint la façade de sa grange, sauf la porte.<br>Regarde les mesures sur le dessin.<br>Un pot de peinture couvre <b>8 m²</b>.<br><br>Combien de pots lui faut-il ?`,
      reponse: `On découpe la façade en deux figures simples.<br>Rectangle : 6 × 3 = 18 m².<br>Triangle du toit : (6 × 2) ÷ 2 = 6 m².<br>Façade : 18 + 6 = 24 m². On enlève la porte : 2 × 2,5 = 5 m².<br>À peindre : 24 − 5 = 19 m².<br>2 pots couvrent 16 m² : pas assez. 3 pots couvrent 24 m².<br>Il lui faut <span class="big">3 pots</span>.`,
      consigne: "Combien de pots de peinture faut-il ?",
      verification: { type: "qcm", choix: ["3 pots", "2 pots", "4 pots"], bonne: 0 },
      dessin: grange(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le champ de lavande",
      sorte: "piege",
      question: `Le champ de lavande de Zoé est un <b>parallélogramme</b>.<br>Sa base mesure 50 m. Son côté penché mesure 30 m.<br>La hauteur, perpendiculaire à la base, mesure 24 m.<br>Zoé calcule : « 50 × 30 = 1 500 m². »<br><br><b>Quelle est la vraie aire du champ ?</b>`,
      reponse: `Zoé s'est trompée ! Elle a pris le côté penché.<br>Aire d'un parallélogramme = base × hauteur.<br>La hauteur est la distance perpendiculaire : 24 m.<br>50 × 24 = 1 200.<br>L'aire du champ est <span class="big">1 200 m²</span>.<br>Contrôle : on coupe le triangle de gauche et on le recolle à droite.<br>On obtient un rectangle de 50 m sur 24 m.`,
      consigne: "Quelle est l'aire du champ de lavande ?",
      verification: { type: "qcm", choix: ["1 500 m²", "1 200 m²", "600 m²"], bonne: 1 },
      dessin: champ(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le pré des chèvres",
      sorte: "defi",
      question: `Un pré rectangulaire mesure <b>30 m</b> sur <b>20 m</b>.<br>Deux piquets A et B sont aux coins du bas.<br>Tom plante un 3e piquet sur le bord du haut, à 8 m du coin.<br>Sa corde fait le tour : un enclos en triangle pour sa chèvre.<br>Léa, elle, plante son piquet au milieu du bord du haut.<br><br>Quelle chèvre a le plus d'herbe ? Quelle est l'aire de l'enclos de Tom ?`,
      reponse: `Les deux triangles ont la même base AB : 30 m.<br>Leur hauteur est la distance du piquet au bord du bas : 20 m, dans les deux cas.<br>Aire = (30 × 20) ÷ 2 = 300 m².<br>L'enclos de Tom mesure <span class="big">300 m²</span>, comme celui de Léa.<br>Contrôle : on coupe le triangle de Tom par la verticale du piquet.<br>(8 × 20) ÷ 2 = 80 et (22 × 20) ÷ 2 = 220. Total : 300 m².<br>Où que soit le piquet sur ce bord, l'enclos fait la moitié du pré.`,
      consigne: "Quelle est l'aire de l'enclos de Tom, en m² ?",
      verification: { type: "courte", attendus: ["300"], unite: "m²" },
      dessin: pre(),
    },
  ],
};

export default problemes;
