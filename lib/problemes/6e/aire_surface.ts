// Énigmes à projeter — 6e, notion aire_surface (aire du rectangle, du carré,
// comparer deux aires, décomposer une figure, le piège des côtés doublés,
// le défi de la tablette de chocolat). 20/11/2026.
// Phrases courtes (les 6e lisent difficilement). Pas de triangle ni de disque :
// la fiche 6e (lib/fiches/maths-6e-aires.tsx) n'en parle pas.
// Tous les dessins sont au bon rapport (échelle notée dans chaque fonction).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

// Le tapis de judo : 8 m sur 5 m, échelle 40 px pour 1 m.
const judo = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un tapis de judo rectangulaire de 8 mètres sur 5 mètres">
  <text x="240" y="60" font-size="44" text-anchor="middle">🥋</text>
  <rect x="80" y="110" width="320" height="200" fill="${C.jaune}" fill-opacity=".25" stroke="${C.craie}" stroke-width="4"/>
  <text x="240" y="100" fill="${C.bleu}" font-size="26" text-anchor="middle">8 m</text>
  <text x="62" y="218" fill="${C.bleu}" font-size="26" text-anchor="end">5 m</text>
  <text x="240" y="370" fill="${C.rose}" font-size="24" text-anchor="middle">Quelle est l'aire du tapis${NB}?</text>
  </svg>`;

// L'enclos des poules : un carré de 7 m, échelle 35 px pour 1 m.
const poulailler = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un enclos carré de 7 mètres de côté avec une poule">
  <rect x="118" y="60" width="245" height="245" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4"/>
  <text x="240" y="200" font-size="60" text-anchor="middle">🐔</text>
  <text x="240" y="340" fill="${C.bleu}" font-size="26" text-anchor="middle">7 m</text>
  <text x="378" y="192" fill="${C.bleu}" font-size="26">7 m</text>
  <text x="240" y="395" fill="${C.rose}" font-size="24" text-anchor="middle">L'aire de l'enclos${NB}?</text>
  </svg>`;

// Deux tentes vues de dessus : 6 m sur 2 m, et 4 m sur 4 m. Échelle 30 px pour 1 m.
const tentes = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le sol de deux tentes vu de dessus : un rectangle de 6 mètres sur 2 mètres et un carré de 4 mètres de côté">
  <text x="240" y="45" fill="${C.pale}" font-size="22" text-anchor="middle">vu de dessus ⛺</text>
  <text x="130" y="120" fill="${C.craie}" font-size="24" text-anchor="middle">Léo</text>
  <rect x="40" y="150" width="180" height="60" fill="${C.jaune}" fill-opacity=".3" stroke="${C.craie}" stroke-width="4"/>
  <text x="130" y="245" fill="${C.bleu}" font-size="24" text-anchor="middle">6 m</text>
  <text x="232" y="188" fill="${C.bleu}" font-size="24">2 m</text>
  <text x="350" y="100" fill="${C.craie}" font-size="24" text-anchor="middle">Maé</text>
  <rect x="290" y="120" width="120" height="120" fill="${C.rose}" fill-opacity=".2" stroke="${C.craie}" stroke-width="4"/>
  <text x="350" y="275" fill="${C.bleu}" font-size="24" text-anchor="middle">4 m</text>
  <text x="420" y="188" fill="${C.bleu}" font-size="24">4 m</text>
  <text x="240" y="370" fill="${C.rose}" font-size="24" text-anchor="middle">Quel sol est le plus grand${NB}?</text>
  </svg>`;

// Le jardin : un rectangle de 9 m sur 6 m auquel il manque un coin de 4 m sur 3 m.
// Échelle 40 px pour 1 m : 9 m = 360 px, 6 m = 240 px, 5 m = 200 px, 3 m = 120 px.
const jardin = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un jardin en forme de L : 9 mètres en bas, 6 mètres à gauche, 5 mètres en haut, 3 mètres à droite">
  <path d="M60 80 L260 80 L260 200 L420 200 L420 320 L60 320 Z" fill="${C.jaune}" fill-opacity=".25" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <text x="160" y="215" font-size="44" text-anchor="middle">🌻</text>
  <text x="240" y="355" fill="${C.bleu}" font-size="26" text-anchor="middle">9 m</text>
  <text x="48" y="210" fill="${C.bleu}" font-size="26" text-anchor="end">6 m</text>
  <text x="160" y="68" fill="${C.bleu}" font-size="26" text-anchor="middle">5 m</text>
  <text x="430" y="268" fill="${C.bleu}" font-size="26">3 m</text>
  <text x="240" y="405" fill="${C.rose}" font-size="24" text-anchor="middle">L'aire du jardin${NB}?</text>
  </svg>`;

// Les panneaux solaires : 2 m sur 1 m, puis 4 m sur 2 m. Échelle 50 px pour 1 m.
const panneaux = () => {
  const grille = (x: number, y: number, w: number, h: number) => {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.bleu}" fill-opacity=".25" stroke="${C.craie}" stroke-width="3"/>`;
    return s;
  };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un petit panneau solaire de 2 mètres sur 1 mètre et un grand de 4 mètres sur 2 mètres">
  <text x="240" y="60" font-size="44" text-anchor="middle">☀️</text>
  ${grille(50, 175, 100, 50)}
  <text x="100" y="260" fill="${C.bleu}" font-size="24" text-anchor="middle">2 m</text>
  <text x="100" y="165" fill="${C.bleu}" font-size="22" text-anchor="middle">1 m de large</text>
  ${grille(230, 150, 200, 100)}
  <text x="330" y="285" fill="${C.bleu}" font-size="24" text-anchor="middle">4 m</text>
  <text x="440" y="208" fill="${C.bleu}" font-size="24">2 m</text>
  <text x="240" y="340" fill="${C.craie}" font-size="22" text-anchor="middle">Noé${NB}: «${NB}L'aire double aussi.${NB}»</text>
  <text x="240" y="390" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-il raison${NB}?</text>
  </svg>`;
};

// La tablette de chocolat : 36 carrés de 1 cm, rangés en 9 sur 4 (30 px pour 1 cm).
const chocolat = () => {
  let s = "";
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 4; j++)
      s += `<rect x="${105 + 30 * i}" y="${140 + 30 * j}" width="30" height="30" fill="${C.jaune}" fill-opacity=".35" stroke="${C.craie}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une tablette de chocolat de 36 carrés rangés en 9 colonnes et 4 lignes">
  <text x="240" y="60" fill="${C.craie}" font-size="26" text-anchor="middle">🍫 36 carrés de 1 cm sur 1 cm</text>
  <text x="240" y="105" fill="${C.pale}" font-size="22" text-anchor="middle">une forme possible${NB}: 9 sur 4</text>
  ${s}
  <rect x="105" y="140" width="270" height="120" fill="none" stroke="${C.bleu}" stroke-width="4"/>
  <text x="240" y="320" fill="${C.craie}" font-size="24" text-anchor="middle">Le tour le plus court${NB}?</text>
  <text x="240" y="370" fill="${C.rose}" font-size="24" text-anchor="middle">Toujours un rectangle de 36 carrés.</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "aire_surface",
  titre: "Énigmes sur les aires",
  description: "Le tapis de judo, l'enclos des poules, les deux tentes du camping, le jardin en L, le piège des panneaux solaires agrandis, le défi de la tablette de chocolat.",
  problemes: [
    {
      tag: "Énigme 1 · Au judo",
      titre: "Le tapis du club",
      question: `Le club de judo pose un tapis rectangulaire.<br>Il mesure <b>8 m</b> de long.<br>Il mesure <b>5 m</b> de large.<br><br>Quelle est l'<b>aire</b> du tapis ?`,
      reponse: `Aire du rectangle = longueur × largeur.<br>8 × 5 = 40.<br>Une aire se dit en mètres <b>carrés</b> : m², pas m.<br>Le tapis a une aire de <span class="big">40 m²</span>.`,
      consigne: "Quelle est l'aire d'un rectangle de 8 m sur 5 m ?",
      verification: { type: "courte", attendus: ["40"], unite: "m²" },
      dessin: judo(),
    },
    {
      tag: "Énigme 2 · Au poulailler",
      titre: "L'enclos des poules",
      question: `Jade construit un enclos pour ses poules.<br>L'enclos est un <b>carré</b>.<br>Son côté mesure <b>7 m</b>.<br><br>Quelle est l'<b>aire</b> de l'enclos ?`,
      reponse: `Aire du carré = côté × côté.<br>7 × 7 = 49.<br>Attention : 28 m, c'est le tour (le périmètre), pas l'aire.<br>L'enclos a une aire de <span class="big">49 m²</span>.`,
      consigne: "Quelle est l'aire d'un carré de 7 m de côté ?",
      verification: { type: "qcm", choix: ["28 m²", "14 m²", "49 m²"], bonne: 2 },
      dessin: poulailler(),
    },
    {
      tag: "Énigme 3 · Au camping",
      titre: "Les deux tentes",
      question: `Léo a une tente de <b>6 m</b> sur <b>2 m</b>.<br>Maé a une tente carrée de <b>4 m</b> de côté.<br>Léo dit : « Même tour, donc même place. »<br><br>Quelle tente a le <b>plus grand sol</b> ?`,
      reponse: `Le tour est bien le même : 6 + 2 + 6 + 2 = 16 m et 4 × 4 = 16 m.<br>Mais on compare les <b>aires</b>.<br>Léo : 6 × 2 = 12 m². Maé : 4 × 4 = 16 m².<br>Même périmètre ne veut pas dire même aire.<br>Le plus grand sol : <span class="big">la tente de Maé</span>.`,
      consigne: "Quelle tente a la plus grande aire : 6 m sur 2 m, ou un carré de 4 m ?",
      verification: { type: "qcm", choix: ["La tente de Léo", "La tente de Maé", "Elles ont la même aire"], bonne: 1 },
      dessin: tentes(),
    },
    {
      tag: "Énigme 4 · Au jardin",
      titre: "Le jardin en L",
      question: `Le jardin de Samir a une forme de L.<br>Regarde ses mesures sur le dessin.<br>Découpe-le en <b>deux rectangles</b>.<br><br>Quelle est l'<b>aire</b> du jardin ?`,
      reponse: `On coupe le jardin par un trait horizontal.<br>En bas : un rectangle de 9 m sur 3 m. 9 × 3 = 27 m².<br>En haut : un rectangle de 5 m sur 3 m (6 − 3 = 3). 5 × 3 = 15 m².<br>On ajoute : 27 + 15 = 42.<br>Autre façon : 9 × 6 = 54, moins le coin vide 4 × 3 = 12. 54 − 12 = 42.<br>Le jardin a une aire de <span class="big">42 m²</span>.`,
      consigne: "Quelle est l'aire du jardin en L ?",
      verification: { type: "courte", attendus: ["42"], unite: "m²" },
      dessin: jardin(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les panneaux solaires",
      sorte: "piege",
      question: `Un panneau solaire mesure <b>2 m</b> sur <b>1 m</b>.<br>Noé en veut un plus grand : <b>4 m</b> sur <b>2 m</b>.<br>Il a doublé la longueur et la largeur.<br>Noé dit : « L'aire double aussi. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! On calcule les deux aires.<br>Petit : 2 × 1 = 2 m².<br>Grand : 4 × 2 = 8 m².<br>8 ÷ 2 = 4 : le grand panneau, c'est 4 petits panneaux.<br>Doubler les deux côtés, c'est multiplier l'aire par 2 × 2.<br>L'aire est <span class="big">4 fois plus grande</span>.`,
      consigne: "On double la longueur et la largeur d'un rectangle. Son aire est multipliée par combien ?",
      verification: { type: "qcm", choix: ["4 fois", "2 fois", "8 fois"], bonne: 0 },
      dessin: panneaux(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La tablette de chocolat",
      sorte: "defi",
      question: `Un chocolatier range <b>36 carrés</b> de 1 cm sur 1 cm.<br>Il forme un rectangle, sans trou.<br>Il veut le <b>tour le plus court</b> possible.<br><br>Quel est ce plus petit <b>périmètre</b> ?`,
      reponse: `L'aire reste toujours 36 cm². On essaie les rectangles :<br>1 sur 36 : tour 74 cm. 2 sur 18 : 40 cm. 3 sur 12 : 30 cm.<br>4 sur 9 : 26 cm. 6 sur 6 : 24 cm.<br>Le plus court : le carré de 6 cm sur 6 cm.<br>Le plus petit périmètre est <span class="big">24 cm</span>.`,
      consigne: "36 carrés de 1 cm en rectangle : quel est le plus petit périmètre possible ?",
      verification: { type: "courte", attendus: ["24"], unite: "cm" },
      dessin: chocolat(),
    },
  ],
};

export default problemes;
