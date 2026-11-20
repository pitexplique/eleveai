// Énigmes à projeter — 4e, notion vision_espace (la boîte à toucher :
// reconnaître le cône par ses faces, l'entrepôt : vue de face d'un tas de
// caisses, le chocolatier : contour du patron d'une pyramide à base carrée,
// la scierie : section d'un cylindre par un plan qui contient l'axe, piège de
// la notice : on ne mesure pas une perspective cavalière, défi du cube peint
// 4 × 4 × 4 : les petits cubes sans peinture).
// Perspective cavalière : fuyantes à 45°, coefficient 0,5, arêtes cachées en
// pointillés (pavés, cylindre couché). Le tas de caisses est dessiné face
// par face, sans recouvrement (seules les faces vues sont tracées).
// Patron au bon rapport : 20 px/cm (carré 6 cm = 120 px, côtés 5 cm = 100 px,
// hauteur des triangles √(25 − 9) = 4 cm = 80 px). Cylindre couché : diamètre
// 1,2 m = 120 px, longueur 3 m = 300 px réduite à 150 px sur la fuyante.
// Pas de La Réunion. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;
const poly = (pts: [number, number][], coul: string, op: string) =>
  `<polygon points="${pts.map(([x, y]) => `${r1(x)},${r1(y)}`).join(" ")}" fill="${coul}" fill-opacity="${op}" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>`;

// La boîte à toucher : cylindre, cône, boule (moitiés arrière des bases en pointillés).
const toucher = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Trois solides : un cylindre, un cône et une boule">
  ${txt(240, 70, `Lequel est dans la boîte${NB}?`, C.rose, 24)}
  <ellipse cx="95" cy="170" rx="50" ry="14" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <path d="M45 170 L45 290 M145 170 L145 290 M45 290 A50 14 0 0 0 145 290" stroke="${C.craie}" stroke-width="3" fill="none"/>
  <path d="M45 290 A50 14 0 0 1 145 290" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 5" fill="none"/>
  <path d="M185 290 L240 150 L295 290 M185 290 A55 15 0 0 0 295 290" stroke="${C.craie}" stroke-width="3" fill="none" stroke-linejoin="round"/>
  <path d="M185 290 A55 15 0 0 1 295 290" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 5" fill="none"/>
  <circle cx="390" cy="230" r="58" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <path d="M332 230 A58 14 0 0 0 448 230" stroke="${C.craie}" stroke-width="2" fill="none"/>
  <path d="M332 230 A58 14 0 0 1 448 230" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 5" fill="none"/>
  ${txt(95, 345, "cylindre", C.bleu, 22)}
  ${txt(240, 345, "cône", C.bleu, 22)}
  ${txt(390, 345, "boule", C.bleu, 22)}
  </svg>`;

// Le tas de caisses : cubes de 50 px, fuyante u = 25 × cos 45° ≈ 17,7 px.
// Rangée avant : colonnes 1 et 3 (1 caisse). Rangée arrière : colonne 1 (2 caisses),
// colonnes 2 et 3 (1 caisse). Seules les faces vues sont tracées.
const U = 17.7;
const caisses = () => {
  const x0 = 150, y0 = 200; // coin avant gauche du bas, rangée avant
  const bx = x0 + U, by = y0 - U; // rangée arrière
  const faces = [
    // faces de devant
    poly([[bx, by - 50], [bx + 50, by - 50], [bx + 50, by - 100], [bx, by - 100]], C.jaune, ".35"), // arrière, col. 1, étage 2
    poly([[bx + 50, by - 50], [bx + 100, by - 50], [x0 + 100, y0 - 50], [x0 + 100, by], [bx + 50, by]], C.jaune, ".35"), // arrière, col. 2 (en partie cachée)
    poly([[x0, y0], [x0 + 50, y0], [x0 + 50, y0 - 50], [x0, y0 - 50]], C.jaune, ".35"), // avant, col. 1
    poly([[x0 + 100, y0], [x0 + 150, y0], [x0 + 150, y0 - 50], [x0 + 100, y0 - 50]], C.jaune, ".35"), // avant, col. 3
    // dessus
    poly([[bx, by - 100], [bx + U, by - 100 - U], [bx + 50 + U, by - 100 - U], [bx + 50, by - 100]], C.bleu, ".3"),
    poly([[bx + 50, by - 50], [bx + 50 + U, by - 50 - U], [bx + 100 + U, by - 50 - U], [bx + 100, by - 50]], C.bleu, ".3"),
    poly([[bx + 100, by - 50], [bx + 100 + U, by - 50 - U], [bx + 150 + U, by - 50 - U], [bx + 150, by - 50]], C.bleu, ".3"),
    poly([[x0, y0 - 50], [x0 + U, y0 - 50 - U], [x0 + 50 + U, y0 - 50 - U], [x0 + 50, y0 - 50]], C.bleu, ".3"),
    poly([[x0 + 100, y0 - 50], [x0 + 100 + U, y0 - 50 - U], [x0 + 150 + U, y0 - 50 - U], [x0 + 150, y0 - 50]], C.bleu, ".3"),
    // côtés droits
    poly([[bx + 50, by - 50], [bx + 50, by - 100], [bx + 50 + U, by - 100 - U], [bx + 50 + U, by - 50 - U]], C.pale, ".3"),
    poly([[bx + 150, by], [bx + 150, by - 50], [bx + 150 + U, by - 50 - U], [bx + 150 + U, by - U]], C.pale, ".3"),
    poly([[x0 + 50, y0], [x0 + 50, y0 - 50], [x0 + 50 + U, y0 - 50 - U], [x0 + 50 + U, y0 - U]], C.pale, ".3"),
    poly([[x0 + 150, y0], [x0 + 150, y0 - 50], [x0 + 150 + U, y0 - 50 - U], [x0 + 150 + U, y0 - U]], C.pale, ".3"),
  ].join("");
  // Les trois vues proposées : carrés de 30 px, sol à y = 330.
  const vue = (gx: number, hauteurs: number[]) =>
    hauteurs
      .map((h, i) => Array.from({ length: h }, (_, k) =>
        `<rect x="${gx + 30 * i}" y="${300 - 30 * k}" width="30" height="30" fill="${C.jaune}" fill-opacity=".35" stroke="${C.craie}" stroke-width="2.5"/>`).join(""))
      .join("") + `<path d="M${gx - 8} 330 L${gx + 98} 330" stroke="${C.pale}" stroke-width="2" fill="none"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un tas de six caisses cubiques en perspective, et trois vues proposées, A, B et C">
  ${txt(240, 36, `Quelle est la vue de face${NB}?`, C.rose, 22)}
  ${faces}
  <path d="M225 250 L225 212 M216 222 L225 210 L234 222" stroke="${C.rose}" stroke-width="3" fill="none"/>
  ${txt(240, 244, "de face", C.rose, 20, "start")}
  ${vue(45, [2, 1, 1])}
  ${vue(195, [1, 0, 1])}
  ${vue(345, [1, 1, 2])}
  ${txt(90, 368, "A", C.craie, 26)}
  ${txt(240, 368, "B", C.craie, 26)}
  ${txt(390, 368, "C", C.craie, 26)}
  </svg>`;
};

// Le patron de la pyramide, 20 px/cm : carré 120 px, côtés des triangles 100 px.
const patron = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le patron d'une pyramide à base carrée : un carré de 6 centimètres entouré de quatre triangles dont les côtés égaux mesurent 5 centimètres">
  <text x="60" y="70" font-size="40" text-anchor="middle">🍫</text>
  <polygon points="180,150 240,70 300,150 380,210 300,270 240,350 180,270 100,210" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M180 150 L300 150 L300 270 L180 270 Z" stroke="${C.pale}" stroke-width="2.5" stroke-dasharray="7 5" fill="none"/>
  ${txt(240, 218, "6 cm", C.craie, 22)}
  ${txt(196, 100, "5 cm", C.bleu, 22, "end")}
  ${txt(410, 90, "pointillés", C.pale, 20)}
  ${txt(410, 115, "= plis", C.pale, 20)}
  ${txt(240, 398, `contour =${NB}? cm`, C.rose, 24)}
  </svg>`;

// Le tronc couché, axe sur la fuyante : disque avant de rayon 60 px centré en
// (150 ; 280), disque arrière décalé de (106,1 ; −106,1). Génératrices de contour
// aux points à 45° et 225° ; demi-cercle arrière bas-gauche caché.
const tronc = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un tronc d'arbre couché en forme de cylindre, 3 mètres de long et 1,2 mètre de diamètre ; un trait de scie suit sa longueur en passant par l'axe">
  <path d="M192.4 322.4 L298.5 216.3 M107.6 237.6 L213.7 131.5" stroke="${C.craie}" stroke-width="3" fill="none"/>
  <path d="M213.7 131.5 A60 60 0 0 1 298.5 216.3" stroke="${C.craie}" stroke-width="3" fill="none"/>
  <path d="M298.5 216.3 A60 60 0 0 1 213.7 131.5" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 5" fill="none"/>
  <circle cx="150" cy="280" r="60" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>
  <circle cx="150" cy="280" r="18" fill="none" stroke="${C.jaune}" stroke-width="2"/>
  <circle cx="150" cy="280" r="36" fill="none" stroke="${C.jaune}" stroke-width="2"/>
  <path d="M150 220 L150 340 M150 220 L256.1 113.9" stroke="${C.rose}" stroke-width="4" stroke-dasharray="10 6" fill="none"/>
  ${txt(300, 98, "trait de scie", C.rose, 22, "start")}
  ${txt(80, 288, "1,2 m", C.bleu, 22, "end")}
  ${txt(262, 296, "3 m", C.bleu, 22, "start")}
  <text x="420" y="340" font-size="44" text-anchor="middle">🌲</text>
  ${txt(240, 395, `Forme de la coupe${NB}?`, C.rose, 24)}
  </svg>`;

// Le cube de la notice : face avant 150 px, fuyantes 75 px à 45° (53 ; −53).
// Sommet caché : arrière bas gauche (173 ; 267), ses trois arêtes en pointillés.
const notice = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une boîte dessinée en perspective cavalière ; sur le dessin, Lou mesure 6 centimètres, 6 centimètres et 3 centimètres">
  <text x="420" y="70" font-size="40" text-anchor="middle">📦</text>
  ${txt(40, 60, "dessin de la notice", C.pale, 20, "start")}
  <path d="M173 267 L173 117 M173 267 L323 267 M173 267 L120 320" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 5" fill="none"/>
  ${poly([[120, 170], [173, 117], [323, 117], [270, 170]], C.bleu, ".25")}
  ${poly([[270, 320], [270, 170], [323, 117], [323, 267]], C.bleu, ".12")}
  ${poly([[120, 320], [270, 320], [270, 170], [120, 170]], C.bleu, ".06")}
  ${txt(195, 345, "6 cm", C.craie, 22)}
  ${txt(108, 252, "6 cm", C.craie, 22, "end")}
  ${txt(312, 310, "3 cm", C.craie, 22, "start")}
  <rect x="40" y="362" width="400" height="42" rx="14" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 391, `Lou${NB}: «${NB}Ce n'est pas un cube${NB}!${NB}»`, C.rose, 22)}
  </svg>`;

// Le cube peint 4 × 4 × 4 : petits cubes de 40 px, fuyante d'un cube 14,14 px.
const cubePeint = () => {
  const u = 20 * Math.SQRT1_2; // 14,14
  const D = 4 * u; // 56,6
  let g = "";
  for (let i = 1; i < 4; i++) {
    g += `M${130 + 40 * i} 340 L${130 + 40 * i} 180 L${r1(130 + 40 * i + D)} ${r1(180 - D)} `; // devant + dessus
    g += `M130 ${180 + 40 * i} L290 ${180 + 40 * i} L${r1(290 + D)} ${r1(180 + 40 * i - D)} `; // devant + côté
    g += `M${r1(130 + u * i)} ${r1(180 - u * i)} L${r1(290 + u * i)} ${r1(180 - u * i)} L${r1(290 + u * i)} ${r1(340 - u * i)} `; // dessus + côté
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un grand cube fait de 64 petits cubes, 4 sur 4 sur 4, peint en bleu sur toute sa surface">
  ${txt(240, 60, "64 petits cubes", C.craie, 24)}
  <text x="420" y="70" font-size="40" text-anchor="middle">🎨</text>
  <path d="M${r1(130 + D)} ${r1(340 - D)} L${r1(130 + D)} ${r1(180 - D)} M${r1(130 + D)} ${r1(340 - D)} L${r1(290 + D)} ${r1(340 - D)} M${r1(130 + D)} ${r1(340 - D)} L130 340" stroke="${C.pale}" stroke-width="2" stroke-dasharray="6 5" fill="none"/>
  ${poly([[130, 340], [290, 340], [290, 180], [130, 180]], C.bleu, ".25")}
  ${poly([[130, 180], [290, 180], [290 + D, 180 - D], [130 + D, 180 - D]], C.bleu, ".4")}
  ${poly([[290, 340], [290, 180], [290 + D, 180 - D], [290 + D, 340 - D]], C.bleu, ".15")}
  <path d="${g}" stroke="${C.craie}" stroke-width="2" fill="none"/>
  ${txt(240, 392, `Aucune face peinte${NB}: ?`, C.rose, 24)}
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "vision_espace",
  titre: "Énigmes sur les solides et leurs représentations",
  description: "La boîte à toucher, le tas de caisses de l'entrepôt, la boîte de chocolats en pyramide, le tronc de la scierie, le piège de la notice, le défi du cube peint : reconnaître un solide, lire une vue de face, patron d'une pyramide, section plane et perspective cavalière.",
  problemes: [
    {
      tag: "Énigme 1 · La boîte à toucher",
      titre: "Le solide caché",
      question: `Les yeux bandés, Nina plonge la main dans une boîte.<br>Elle touche un solide et le décrit :<br>« Une seule face plate, et elle est ronde. Le reste est courbe. Et il y a une pointe ! »<br><br>Quel solide tient-elle ?`,
      reponse: `Le cylindre a deux faces plates : deux disques. Et pas de pointe.<br>La boule n'a aucune face plate.<br>Le cône a une seule face plate, un disque : sa base.<br>Sa surface latérale est courbe, et elle se termine par un sommet.<br>Nina tient <span class="big">un cône</span>.`,
      consigne: "Quel solide a une seule face plane, un disque, et un sommet ?",
      verification: { type: "qcm", choix: ["un cylindre", "un cône", "une boule"], bonne: 1 },
      dessin: toucher(),
    },
    {
      tag: "Énigme 2 · À l'entrepôt",
      titre: "Le tas de caisses",
      question: `À l'entrepôt, des caisses cubiques sont empilées sur deux rangées.<br>Le chef d'équipe se place devant le tas et le regarde <b>de face</b>.<br><br>Quelle vue voit-il : A, B ou C ?`,
      reponse: `De face, on voit chaque colonne, même les caisses du fond.<br>Colonne de gauche : 2 caisses de haut, au fond.<br>Colonne du milieu : 1 caisse, au fond, derrière le trou.<br>Colonne de droite : 1 caisse.<br>Les hauteurs sont 2, 1, 1 : c'est <span class="big">la vue A</span>.<br>⚠ La vue B oublie les caisses du fond.<br>⚠ La vue C est inversée : c'est la vue de derrière.`,
      consigne: "Quelle est la vue de face du tas de caisses ?",
      verification: { type: "qcm", choix: ["la vue A", "la vue B", "la vue C"], bonne: 0 },
      dessin: caisses(),
    },
    {
      tag: "Énigme 3 · Chez le chocolatier",
      titre: "La boîte en pyramide",
      question: `Clara fabrique une boîte de chocolats en forme de <b>pyramide</b>.<br>Sa base est un carré de <b>6 cm</b> de côté.<br>Les 4 faces latérales sont des triangles isocèles. Leurs côtés égaux mesurent <b>5 cm</b>.<br>Elle découpe le patron en suivant son contour.<br><br>Quelle est la longueur du contour ?`,
      reponse: `Le patron : le carré de base, avec un triangle collé sur chaque côté.<br>Les côtés du carré sont des plis : ils sont à l'intérieur du patron.<br>Chaque triangle donne au contour ses deux côtés de 5 cm.<br>4 triangles × 2 côtés = 8 segments de 5 cm.<br>8 × 5 = 40.<br>Le contour mesure <span class="big">40 cm</span>.<br>Au pliage, ces 8 segments se recollent deux à deux : ce sont les 4 arêtes latérales.<br>⚠ 64 cm compte en plus le carré : ses côtés ne sont pas sur le bord.`,
      consigne: "Quelle est la longueur du contour du patron, en cm ?",
      verification: { type: "courte", attendus: ["40"], unite: "cm" },
      dessin: patron(),
    },
    {
      tag: "Énigme 4 · À la scierie",
      titre: "Le tronc scié en long",
      question: `À la scierie, un tronc bien droit a la forme d'un <b>cylindre</b>.<br>Il mesure <b>3 m</b> de long et <b>1,2 m</b> de diamètre.<br>La scie le coupe dans sa longueur, en passant par son <b>axe</b>.<br><br>Quelle est la forme de la coupe ?`,
      reponse: `La coupe est parallèle à l'axe du cylindre : la section est un rectangle.<br>Sa longueur est celle du tronc : 3 m.<br>Elle passe par l'axe, donc sa largeur est le diamètre : 1,2 m.<br>La coupe est <span class="big">un rectangle de 3 m sur 1,2 m</span>.<br>⚠ 0,6 m, c'est le rayon : or la coupe traverse tout le tronc, d'un bord à l'autre.<br>⚠ Le disque, c'est la coupe d'une rondelle, perpendiculaire à l'axe.`,
      consigne: "Quelle est la forme de la coupe du tronc ?",
      verification: { type: "qcm", choix: ["un disque de 1,2 m de diamètre", "un rectangle de 3 m sur 0,6 m", "un rectangle de 3 m sur 1,2 m"], bonne: 2 },
      dessin: tronc(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le cube de la notice",
      sorte: "piege",
      question: `Une notice montre une boîte dessinée en <b>perspective cavalière</b>.<br>Lou mesure les arêtes sur le dessin : 6 cm, 6 cm et 3 cm.<br>Elle dit : « Ce n'est pas un cube ! »<br><br><b>A-t-elle raison de conclure ?</b>`,
      reponse: `Lou s'est trompée ! En perspective cavalière, seule la face avant est en vraie grandeur.<br>Les arêtes fuyantes, en biais, sont souvent raccourcies, ici de moitié.<br>Une fuyante de 3 cm peut donc représenter une arête de 6 cm.<br>La face du dessus devient un parallélogramme, même si c'est un carré.<br>Réponse : <span class="big">non, on ne peut pas conclure</span>.<br>On ne mesure pas une perspective : on lit les longueurs codées ou écrites.`,
      consigne: "Lou peut-elle conclure que la boîte n'est pas un cube ?",
      verification: { type: "qcm", choix: ["Oui, une arête mesure 3 cm", "Non, une fuyante est souvent raccourcie", "Oui, le dessus n'est pas un carré"], bonne: 1 },
      dessin: notice(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le cube peint",
      sorte: "defi",
      question: `Un artisan colle <b>64 petits cubes</b> en un grand cube de 4 sur 4 sur 4.<br>Il peint en bleu toute la surface du grand cube.<br>Puis il décolle les petits cubes.<br><br>Combien de petits cubes n'ont <b>aucune face peinte</b> ?`,
      reponse: `Un petit cube sans peinture ne touche aucune face du grand cube.<br>On retire la couche extérieure de chaque côté : 4 − 2 = 2.<br>Il reste au centre un cube de 2 sur 2 sur 2 : 2 × 2 × 2 = 8.<br><span class="big">8 petits cubes</span> n'ont aucune face peinte.<br>Contrôle en comptant tout : 8 coins (3 faces), 12 arêtes × 2 = 24 (2 faces).<br>6 faces × 4 = 24 (1 face), et 8 sans peinture.<br>8 + 24 + 24 + 8 = 64 : le compte est bon.`,
      consigne: "Combien de petits cubes n'ont aucune face peinte ?",
      verification: { type: "courte", attendus: ["8"] },
      dessin: cubePeint(),
    },
  ],
};

export default problemes;
