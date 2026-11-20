// Énigmes à projeter — 6e, notion volume_solide (l'unité cm³, compter par
// couches, comparer sans juger à la hauteur, assembler deux solides, le piège
// des cubes cachés, le défi des dés de 2 cm). 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-volumes.tsx) : cubes unités,
// cm³ et m³, « une couche, puis je multiplie », pas de litres.
// Phrases courtes (les 6e lisent difficilement). Dessins en perspective
// cavalière : fuyantes à 45°, coefficient 0,5 (une profondeur de 1 cm vaut
// 0,354 × s en x et en y), calculées par `pave()`.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const K = 0.5 * Math.SQRT1_2; // 0,354 : la fuyante d'une unité de profondeur
const r = (v: number) => Math.round(v * 10) / 10;

/** Un pavé L × P × H en cavalière. (ox ; oy) = coin avant gauche du bas, s = px par unité.
 *  `grille` trace les cubes unités sur les trois faces vues. */
const pave = (ox: number, oy: number, L: number, P: number, H: number, s: number, couleur: string, grille = true) => {
  const dx = P * s * K, dy = -P * s * K;
  const x1 = ox + L * s, yh = oy - H * s;
  const pt = (x: number, y: number) => `${r(x)} ${r(y)}`;
  const face = (pts: [number, number][], op: string) =>
    `<path d="M${pts.map(([x, y]) => pt(x, y)).join(" L")} Z" fill="${couleur}" fill-opacity="${op}" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>`;
  let g = "";
  if (grille) {
    const u = s * K;
    for (let i = 1; i < L; i++) g += `M${pt(ox + i * s, oy)} L${pt(ox + i * s, yh)} L${pt(ox + i * s + dx, yh + dy)} `;
    for (let j = 1; j < H; j++) g += `M${pt(ox, oy - j * s)} L${pt(x1, oy - j * s)} L${pt(x1 + dx, oy - j * s + dy)} `;
    for (let k = 1; k < P; k++) g += `M${pt(ox + k * u, yh - k * u)} L${pt(x1 + k * u, yh - k * u)} L${pt(x1 + k * u, oy - k * u)} `;
  }
  return face([[ox, oy], [x1, oy], [x1, yh], [ox, yh]], ".3") +
    face([[ox, yh], [x1, yh], [x1 + dx, yh + dy], [ox + dx, yh + dy]], ".5") +
    face([[x1, oy], [x1 + dx, oy + dy], [x1 + dx, yh + dy], [x1, yh]], ".15") +
    (g ? `<path d="${g}" stroke="${C.craie}" stroke-width="2" fill="none"/>` : "");
};

// Le colis : un pavé de 200 × 120 px, profondeur 120 px (sans échelle annoncée).
const colis = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un colis en forme de pavé et trois unités : cm, cm² et cm³">
  ${pave(110, 290, 5, 3, 3, 40, C.jaune, false)}
  <text x="240" y="60" font-size="34" text-anchor="middle">📦</text>
  <text x="120" y="350" fill="${C.bleu}" font-size="30" text-anchor="middle">cm</text>
  <text x="240" y="350" fill="${C.bleu}" font-size="30" text-anchor="middle">cm²</text>
  <text x="360" y="350" fill="${C.bleu}" font-size="30" text-anchor="middle">cm³</text>
  <text x="240" y="400" fill="${C.rose}" font-size="26" text-anchor="middle">Quelle unité pour sa place${NB}?</text>
  </svg>`;

// Les cartons : 4 de long, 2 de profondeur, 3 de haut, cubes de 55 px.
// Largeur 220 + 38,9 ; hauteur 165 + 38,9.
const cartons = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Des cartons cubiques empilés : 4 en longueur, 2 en profondeur, 3 en hauteur">
  ${pave(110, 320, 4, 2, 3, 55, C.jaune)}
  <text x="410" y="80" font-size="40" text-anchor="middle">🚚</text>
  <text x="240" y="395" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de cartons${NB}?</text>
  </svg>`;

// La tour A (2 × 1 × 4) et le bloc B (3 × 2 × 2), cubes de 45 px, même sol y = 330.
const deuxSolides = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux solides en cubes : une tour A haute et étroite, un bloc B plus bas et plus large">
  ${pave(40, 330, 2, 1, 4, 45, C.bleu)}
  ${pave(220, 330, 3, 2, 2, 45, C.rose)}
  <text x="85" y="370" fill="${C.craie}" font-size="28" text-anchor="middle">A</text>
  <text x="287" y="370" fill="${C.craie}" font-size="28" text-anchor="middle">B</text>
  <text x="240" y="408" fill="${C.rose}" font-size="26" text-anchor="middle">Qui a le plus de cubes${NB}?</text>
  </svg>`;

// Les deux savons : B (5 × 5 × 1 cm) dessous, A (5 × 4 × 2 cm) dessus, 34 px pour 1 cm.
// A est posé sur B, à l'arrière (décalé d'une profondeur de 1 cm).
const savons = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux savons collés l'un sur l'autre : 40 centimètres cubes dessus, 25 centimètres cubes dessous">
  ${pave(100, 310, 5, 5, 1, 34, C.bleu, false)}
  ${pave(100 + 34 * K, 276 - 34 * K, 5, 4, 2, 34, C.jaune, false)}
  <text x="185" y="245" fill="${C.craie}" font-size="24" text-anchor="middle">40 cm³</text>
  <text x="185" y="301" fill="${C.craie}" font-size="22" text-anchor="middle">25 cm³</text>
  <text x="240" y="405" fill="${C.rose}" font-size="26" text-anchor="middle">Le volume du savon collé${NB}?</text>
  </svg>`;

// La boîte de sucres : un cube 3 × 3 × 3, sucres de 60 px.
const sucres = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un gros cube fait de petits sucres : 3 sucres de long, 3 de profondeur, 3 de haut">
  ${pave(110, 330, 3, 3, 3, 60, C.jaune)}
  <text x="410" y="70" font-size="36" text-anchor="middle">☕</text>
  <text x="240" y="372" fill="${C.craie}" font-size="22" text-anchor="middle">Léa${NB}: «${NB}J'en vois 19, il y en a 19.${NB}»</text>
  <text x="240" y="408" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-elle raison${NB}?</text>
  </svg>`;

// La boîte de 6 × 4 × 4 cm (30 px pour 1 cm) et un dé de 2 cm, à la même échelle.
const boite = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une boîte de 6 centimètres sur 4 sur 4, et un petit cube de 2 centimètres">
  ${pave(50, 300, 6, 4, 4, 30, C.jaune, false)}
  ${pave(340, 300, 2, 2, 2, 30, C.rose, false)}
  <text x="140" y="335" fill="${C.bleu}" font-size="24" text-anchor="middle">6 cm</text>
  <text x="40" y="245" fill="${C.bleu}" font-size="24" text-anchor="end">4 cm</text>
  <text x="62" y="148" fill="${C.bleu}" font-size="24" text-anchor="end">4 cm</text>
  <text x="370" y="335" fill="${C.bleu}" font-size="24" text-anchor="middle">2 cm</text>
  <text x="240" y="395" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de dés dans la boîte${NB}?</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "volume_solide",
  titre: "Énigmes sur les volumes",
  description: "Le colis de la poste, les cartons du déménagement, la tour et le bloc de la ludothèque, les savons collés, le piège des sucres cachés, le défi des chocolats.",
  problemes: [
    {
      tag: "Énigme 1 · À la poste",
      titre: "La place du colis",
      question: `Hugo envoie un colis.<br>Il veut savoir quelle <b>place</b> prend sa boîte.<br>Il cherche son <b>volume</b>.<br><br>Dans quelle unité l'écrit-il ?`,
      reponse: `Le cm mesure une longueur.<br>Le cm² mesure une aire, une surface.<br>Le volume compte des petits cubes de 1 cm de côté.<br>Le volume s'écrit en <span class="big">cm³</span>.`,
      consigne: "Dans quelle unité écrit-on le volume d'une boîte ?",
      verification: { type: "qcm", choix: ["cm", "cm²", "cm³"], bonne: 2 },
      dessin: colis(),
    },
    {
      tag: "Énigme 2 · Au déménagement",
      titre: "Les cartons empilés",
      question: `Sofia empile des cartons tous pareils, en forme de cube.<br>Une rangée a <b>4 cartons</b>.<br>Il y a <b>2 rangées</b>, l'une derrière l'autre.<br>Il y a <b>3 couches</b>.<br><br>Combien de cartons en tout ?`,
      reponse: `Je compte une couche : 2 rangées de 4.<br>4 × 2 = 8 cartons par couche.<br>Les 3 couches sont pareilles : je multiplie.<br>8 × 3 = 24. Il y a <span class="big">24 cartons</span>.`,
      consigne: "Une pile a 3 couches. Chaque couche a 2 rangées de 4 cubes. Combien de cubes en tout ?",
      verification: { type: "courte", attendus: ["24"], unite: "cartons" },
      dessin: cartons(),
    },
    {
      tag: "Énigme 3 · À la ludothèque",
      titre: "La tour et le bloc",
      question: `Nathan construit la tour A avec des cubes.<br>Clara construit le bloc B.<br>Nathan dit : « Ma tour est plus haute. Elle a plus de cubes. »<br><br>Qui a utilisé le <b>plus de cubes</b> ?`,
      reponse: `Tour A : une couche de 2 cubes, 4 couches.<br>2 × 4 = 8 cubes.<br>Bloc B : une couche de 3 × 2 = 6 cubes, 2 couches.<br>6 × 2 = 12 cubes.<br>12 est plus grand que 8 : c'est <span class="big">le bloc B</span>.`,
      consigne: "Tour A : 4 couches de 2 cubes. Bloc B : 2 couches de 6 cubes. Lequel a le plus de cubes ?",
      verification: { type: "qcm", choix: ["La tour A", "Le bloc B", "Les deux pareils"], bonne: 1 },
      dessin: deuxSolides(),
    },
    {
      tag: "Énigme 4 · À la savonnerie",
      titre: "Les savons collés",
      question: `Amina fabrique des savons.<br>Un savon a un volume de <b>40 cm³</b>.<br>Un autre a un volume de <b>25 cm³</b>.<br>Elle les colle l'un sur l'autre.<br><br>Quel est le volume du savon collé ?`,
      reponse: `On colle deux solides : aucun morceau ne disparaît.<br>On additionne leurs volumes.<br>40 + 25 = 65.<br>Le savon collé a un volume de <span class="big">65 cm³</span>.`,
      consigne: "On colle un solide de 40 cm³ et un solide de 25 cm³. Quel est le volume du solide obtenu ?",
      verification: { type: "courte", attendus: ["65"], unite: "cm³" },
      dessin: savons(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les sucres cachés",
      sorte: "piege",
      question: `Une boîte de sucres forme un gros cube.<br>Il a <b>3 sucres</b> de long, <b>3</b> de profondeur, <b>3</b> de haut.<br>Léa compte les sucres qu'elle voit : 19.<br>Elle dit : « Il y a 19 sucres. »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! Elle oublie les sucres cachés, derrière et en dessous.<br>Une couche : 3 × 3 = 9 sucres.<br>Il y a 3 couches pareilles : 9 × 3 = 27.<br>Il y a <span class="big">27 sucres</span>.<br>27 − 19 = 8 sucres sont cachés.`,
      consigne: "Un cube fait 3 sucres de long, 3 de profondeur, 3 de haut. Combien de sucres en tout ?",
      verification: { type: "qcm", choix: ["Non : il y a 27 sucres", "Oui : il y a 19 sucres", "Non : il y a 9 sucres"], bonne: 0 },
      dessin: sucres(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les chocolats en dés",
      sorte: "defi",
      question: `Un chocolatier remplit une boîte.<br>Elle mesure <b>6 cm</b> de long, <b>4 cm</b> de large et <b>4 cm</b> de haut.<br>Ses chocolats sont des cubes de <b>2 cm</b> de côté.<br><br>Combien de chocolats remplissent la boîte ?`,
      reponse: `En longueur : 6 ÷ 2 = 3 chocolats.<br>En largeur : 4 ÷ 2 = 2 chocolats.<br>Une couche : 3 × 2 = 6 chocolats.<br>En hauteur : 4 ÷ 2 = 2 couches.<br>6 × 2 = 12. Il faut <span class="big">12 chocolats</span>.`,
      consigne: "Une boîte de 6 cm sur 4 cm sur 4 cm est remplie de cubes de 2 cm de côté. Combien de cubes ?",
      verification: { type: "courte", attendus: ["12"], unite: "chocolats" },
      dessin: boite(),
    },
  ],
};

export default problemes;
