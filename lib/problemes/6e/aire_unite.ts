// Énigmes à projeter — 6e, notion aire_unite (comprendre l'aire, compter les
// carreaux, convertir m², dm², cm²). 20/11/2026.
// Phrases courtes (les 6e lisent difficilement). 1 m² = 100 dm² = 10 000 cm².
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

// Avant : un rectangle de 3 × 2 carreaux de 50, coupé en deux bandes.
// Après : les deux bandes recollées en L (3 debout + 3 couchées).
const decoupage = () => {
  const carreaux = (x: number, y: number, nx: number, ny: number, couleur: string) => {
    let s = `<rect x="${x}" y="${y}" width="${nx * 50}" height="${ny * 50}" fill="${couleur}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3"/>`;
    for (let i = 1; i < nx; i++) s += `<path d="M${x + i * 50} ${y} L${x + i * 50} ${y + ny * 50}" stroke="${C.pale}" stroke-width="2" fill="none"/>`;
    for (let j = 1; j < ny; j++) s += `<path d="M${x} ${y + j * 50} L${x + nx * 50} ${y + j * 50}" stroke="${C.pale}" stroke-width="2" fill="none"/>`;
    return s;
  };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un rectangle de 6 carreaux coupé en deux bandes, recollées en forme de L">
  ${carreaux(40, 150, 3, 1, C.jaune)}
  ${carreaux(40, 200, 3, 1, C.bleu)}
  <path d="M30 200 L200 200" stroke="${C.rose}" stroke-width="3" stroke-dasharray="8 6" fill="none"/>
  <text x="115" y="125" fill="${C.craie}" font-size="26" text-anchor="middle">avant</text>
  <path d="M215 200 L260 200 M248 188 L260 200 L248 212" stroke="${C.craie}" stroke-width="4" stroke-linecap="round" fill="none"/>
  ${carreaux(290, 90, 1, 3, C.jaune)}
  ${carreaux(290, 240, 3, 1, C.bleu)}
  <text x="410" y="125" fill="${C.craie}" font-size="26" text-anchor="middle">après</text>
  <text x="240" y="350" fill="${C.pale}" font-size="22" text-anchor="middle">les mêmes morceaux, sans trou</text>
  <text x="240" y="395" fill="${C.rose}" font-size="28" text-anchor="middle">Et l'aire${NB}?</text>
  </svg>`;
};

// Un cœur en pixels : quadrillage 7 × 6 de carreaux de 40.
// Lignes : 4 + 7 + 7 + 5 + 3 + 1 = 27 carreaux coloriés.
const coeur = () => {
  const lignes = [".XX.XX.", "XXXXXXX", "XXXXXXX", ".XXXXX.", "..XXX..", "...X..."];
  let s = "";
  lignes.forEach((l, r) =>
    [...l].forEach((c, k) => {
      if (c === "X") s += `<rect x="${100 + k * 40}" y="${70 + r * 40}" width="40" height="40" fill="${C.rose}" fill-opacity=".45"/>`;
    })
  );
  for (let k = 0; k <= 7; k++) s += `<path d="M${100 + k * 40} 70 L${100 + k * 40} 310" stroke="${C.pale}" stroke-width="2" fill="none"/>`;
  for (let r = 0; r <= 6; r++) s += `<path d="M100 ${70 + r * 40} L380 ${70 + r * 40}" stroke="${C.pale}" stroke-width="2" fill="none"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un cœur dessiné en carreaux coloriés sur un quadrillage">
  ${s}
  <text x="240" y="350" fill="${C.craie}" font-size="24" text-anchor="middle">1 carreau = 1 cm²</text>
  <text x="240" y="395" fill="${C.rose}" font-size="28" text-anchor="middle">L'aire du cœur${NB}?</text>
  </svg>`;
};

// Un carré de 1 m de côté (240) découpé en 10 × 10 carreaux de 24 : une photo = 1 dm².
const photos = () => {
  let s = "";
  for (let k = 1; k < 10; k++)
    s += `<path d="M${30 + k * 24} 60 L${30 + k * 24} 300 M30 ${60 + k * 24} L270 ${60 + k * 24}" stroke="${C.pale}" stroke-width="1.5" fill="none"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un carré de 1 mètre de côté découpé en carrés de 1 décimètre, comme des photos">
  <rect x="30" y="60" width="24" height="24" fill="${C.jaune}" fill-opacity=".45"/>
  ${s}
  <rect x="30" y="60" width="240" height="240" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <text x="150" y="335" fill="${C.craie}" font-size="24" text-anchor="middle">1 m</text>
  <text x="290" y="110" fill="${C.jaune}" font-size="22">1 carreau</text>
  <text x="290" y="140" fill="${C.jaune}" font-size="22">= 1 photo</text>
  <text x="290" y="170" fill="${C.jaune}" font-size="22">= 1 dm²</text>
  <text x="290" y="240" fill="${C.craie}" font-size="22">le mur${NB}:</text>
  <text x="290" y="280" fill="${C.rose}" font-size="30">3 m²</text>
  <text x="240" y="390" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de photos${NB}?</text>
  </svg>`;
};

// Le plan d'une salle de classe (pas à l'échelle) et trois réponses.
const classe = () => {
  let tables = "";
  for (const x of [120, 215, 310])
    for (const y of [120, 170, 220]) tables += `<rect x="${x}" y="${y}" width="50" height="24" rx="3" fill="none" stroke="${C.pale}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le plan d'une salle de classe et trois mesures possibles pour son sol">
  <rect x="80" y="60" width="320" height="200" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="4"/>
  <path d="M180 74 L300 74" stroke="${C.craie}" stroke-width="6" stroke-linecap="round" fill="none"/>
  ${tables}
  <text x="240" y="290" fill="${C.pale}" font-size="20" text-anchor="middle">le sol de la classe (pas à l'échelle)</text>
  <text x="90" y="340" fill="${C.craie}" font-size="28" text-anchor="middle">60 cm²</text>
  <text x="240" y="340" fill="${C.craie}" font-size="28" text-anchor="middle">60 m</text>
  <text x="390" y="340" fill="${C.craie}" font-size="28" text-anchor="middle">60 m²</text>
  <text x="240" y="393" fill="${C.rose}" font-size="26" text-anchor="middle">Laquelle est possible${NB}?</text>
  </svg>`;
};

// Le piège : ce qu'écrit Léo.
const leo = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Léo écrit : 4 décimètres carrés égalent 40 centimètres carrés">
  <text x="240" y="150" fill="${C.craie}" font-size="50" text-anchor="middle">4 dm² = 40 cm²</text>
  <text x="240" y="240" fill="${C.pale}" font-size="24" text-anchor="middle">Léo${NB}: «${NB}1 dm = 10 cm,</text>
  <text x="240" y="275" fill="${C.pale}" font-size="24" text-anchor="middle">alors je fais × 10.${NB}»</text>
  <text x="240" y="370" fill="${C.rose}" font-size="40" text-anchor="middle">Vrai ou faux${NB}?</text>
  </svg>`;

// Le défi : un carré de 1 m (pas à l'échelle), ses petits carrés de 1 cm mis en file.
const file = () => {
  let coin = "";
  for (let k = 0; k < 4; k++) coin += `<rect x="${44 + k * 12}" y="64" width="12" height="12" fill="${C.jaune}" fill-opacity=".45" stroke="${C.craie}" stroke-width="1"/>`;
  let rang = "";
  for (let k = 0; k < 8; k++) rang += `<rect x="${40 + k * 24}" y="280" width="24" height="24" fill="${C.jaune}" fill-opacity=".35" stroke="${C.craie}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un carré de 1 mètre découpé en petits carrés de 1 centimètre, mis en file">
  <rect x="40" y="60" width="160" height="160" fill="none" stroke="${C.craie}" stroke-width="4"/>
  ${coin}
  <text x="120" y="250" fill="${C.craie}" font-size="24" text-anchor="middle">1 m</text>
  <text x="225" y="110" fill="${C.jaune}" font-size="22">petits carrés</text>
  <text x="225" y="140" fill="${C.jaune}" font-size="22">de 1 cm de côté</text>
  <text x="225" y="200" fill="${C.pale}" font-size="20">(pas à l'échelle)</text>
  ${rang}
  <text x="245" y="300" fill="${C.craie}" font-size="28">…</text>
  <path d="M290 292 L440 292 M428 280 L440 292 L428 304" stroke="${C.craie}" stroke-width="3" stroke-linecap="round" fill="none"/>
  <text x="240" y="390" fill="${C.rose}" font-size="26" text-anchor="middle">La file mesure combien${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "aire_unite",
  titre: "Énigmes sur l'aire et ses unités",
  description: "Le découpage de Nora, le cœur en pixels, le mur de photos, le sol de la classe, le piège de Léo et la file de 100 m : 6 énigmes à projeter sur l'aire, le cm², le dm² et le m².",
  problemes: [
    {
      tag: `Énigme 1 · En découpage`,
      titre: `Le découpage de Nora`,
      question: `Nora a un rectangle de papier.<br>Elle le coupe en <b>deux bandes</b>.<br>Elle recolle les bandes en forme de <b>L</b>.<br>Rien ne dépasse, il n'y a pas de trou.<br><br>L'<b>aire</b> du L est-elle plus grande, plus petite ou la même ?`,
      reponse: `Nora garde exactement les mêmes morceaux.<br>Elle n'en ajoute pas, elle n'en enlève pas.<br>La surface couverte est la même : <span class="big">la même aire</span>.<br>6 carreaux avant, 6 carreaux après.<br>Le tour, lui, a changé : 10 côtés de carreau avant, 14 après.`,
      consigne: `Le L a-t-il une aire plus grande, plus petite ou la même que le rectangle ?`,
      verification: { type: "qcm", choix: [`Plus grande que le rectangle`, `La même que le rectangle`, `Plus petite que le rectangle`], bonne: 1 },
      dessin: decoupage(),
    },
    {
      tag: `Énigme 2 · En pixel art`,
      titre: `Le cœur en pixels`,
      question: `Jules dessine un cœur en pixel art.<br>Il colorie des carreaux sur un quadrillage.<br>Chaque carreau mesure <b>1 cm²</b>.<br><br>Quelle est l'<b>aire</b> du cœur ?`,
      reponse: `Je compte rangée par rangée, de haut en bas :<br>4 + 7 + 7 + 5 + 3 + 1 = 27 carreaux.<br>Chaque carreau vaut 1 cm².<br>L'aire du cœur est <span class="big">27 cm²</span>.`,
      consigne: `Quelle est l'aire du cœur, en cm² ?`,
      verification: { type: "courte", attendus: ["27"], unite: "cm²" },
      dessin: coeur(),
    },
    {
      tag: `Énigme 3 · À l'expo photo`,
      titre: `Le mur de photos`,
      question: `Kenza couvre un mur de photos carrées.<br>Chaque photo a une aire de <b>1 dm²</b>.<br>Le mur a une aire de <b>3 m²</b>.<br><br><b>Combien de photos</b> faut-il pour tout couvrir ?`,
      reponse: `1 m = 10 dm.<br>Un carré de 1 m de côté contient 10 rangées de 10 photos.<br>10 × 10 = 100 : 1 m² = 100 dm².<br>3 m² = 3 × 100 = 300 dm².<br>Il faut <span class="big">300 photos</span>.`,
      consigne: `Combien de photos de 1 dm² faut-il pour couvrir 3 m² ?`,
      verification: { type: "courte", attendus: ["300"], unite: "photos" },
      dessin: photos(),
    },
    {
      tag: `Énigme 4 · Au collège`,
      titre: `Le sol de la classe`,
      question: `Mila veut connaître l'aire du sol de sa classe.<br>Elle hésite entre trois réponses :<br><b>60 cm²</b>, <b>60 m</b> ou <b>60 m²</b>.<br><br>Laquelle est <b>possible</b> ?`,
      reponse: `60 m est une longueur, pas une aire : il manque le petit ².<br>60 cm², c'est à peu près une carte à jouer : bien trop petit.<br>Une classe, c'est environ 8 m sur 7,5 m.<br>L'aire possible est <span class="big">60 m²</span>.`,
      consigne: `Quelle peut être l'aire du sol d'une classe ?`,
      verification: { type: "qcm", choix: [`60 cm²`, `60 m`, `60 m²`], bonne: 2 },
      dessin: classe(),
    },
    {
      tag: `Énigme 5 · Attention au piège`,
      titre: `Le calcul de Léo`,
      sorte: "piege",
      question: `Léo peint un panneau de <b>4 dm²</b>.<br>Il veut dire son aire en cm².<br>Il écrit : <b>4 dm² = 40 cm²</b>.<br>« 1 dm = 10 cm, alors je fais × 10. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! × 10, c'est pour les longueurs.<br>1 dm² est un carré de 10 cm sur 10 cm.<br>Il contient 10 × 10 = 100 carrés de 1 cm² : 1 dm² = 100 cm².<br>Donc 4 dm² = 4 × 100 = <span class="big">400 cm²</span>.`,
      consigne: `Léo écrit 4 dm² = 40 cm². A-t-il raison ?`,
      verification: { type: "qcm", choix: [`Non : 4 dm² = 400 cm²`, `Oui, Léo a raison`, `Non : 4 dm² = 4${NB}000 cm²`], bonne: 0 },
      dessin: leo(),
    },
    {
      tag: `Énigme 6 · Le défi des curieux`,
      titre: `La file de petits carrés`,
      sorte: "defi",
      question: `Anis a une grande feuille carrée de <b>1 m</b> de côté.<br>Il la découpe en petits carrés de <b>1 cm</b> de côté.<br>Il pose tous les petits carrés en une seule file.<br><br>Quelle est la <b>longueur</b> de la file ?`,
      reponse: `1 m = 100 cm.<br>La feuille a 100 rangées de 100 petits carrés.<br>100 × 100 = 10${NB}000 : 1 m² = 10${NB}000 cm².<br>En file : 10${NB}000 cm. Or 100 cm = 1 m.<br>10${NB}000 ÷ 100 = 100 : la file mesure <span class="big">100 m</span> !<br>Presque la longueur d'un terrain de football.`,
      consigne: `Quelle est la longueur de la file de petits carrés ?`,
      verification: { type: "qcm", choix: [`1 m`, `10 m`, `100 m`], bonne: 2 },
      dessin: file(),
    },
  ],
};

export default problemes;
