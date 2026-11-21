// Énigmes à projeter — CE2, notion monnaie et écriture à virgule (le porte-
// monnaie, l'étiquette du livre, la glace, la BD et le ballon, le piège des
// petites pièces, le défi des façons de payer 1 €). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o } from "../dessins-ecole";

const piece = (x: number, y: number, v: string, ray = 34, c: string = C.jaune) => o(x, y, ray, c, 0.35, 4) + t(x, y + 9, v, C.craie, ray * 0.7);
const billet = (x: number, y: number, v: string) => r(x, y, 150, 80, C.bleu, 0.25, 4, 6) + t(x + 75, y + 52, v, C.craie, 32);

const portemonnaie = svg(
  "Un billet de 5 €, deux pièces de 2 € et une pièce de 50 centimes",
  billet(40, 100, "5 €") + piece(260, 140, "2 €") + piece(340, 140, "2 €") + piece(420, 140, "50 c", 28, C.pale) +
    t(240, 290, "Combien d'argent", C.rose, 30) + t(240, 335, `en tout${NB}?`, C.rose, 30)
);

const etiquette = svg(
  "Une étiquette de prix : 12 euros et 50 centimes",
  `<path d="M120 120 L360 120 L420 200 L360 280 L120 280 Z" fill="${C.jaune}" fill-opacity="0.2" stroke="${C.jaune}" stroke-width="5"/>` + o(375, 200, 10, C.jaune, 0, 3) +
    t(230, 190, "12 euros", C.craie, 34) + t(230, 240, "et 50 centimes", C.craie, 26) + t(240, 360, `Comment l'écrire${NB}?`, C.rose, 30)
);

const glace = svg(
  "Une glace à 3 € ; on paie avec un billet de 5 €",
  t(120, 220, "🍦", C.craie, 110) + t(120, 300, "3 €", C.craie, 34) + billet(250, 150, "5 €") +
    t(240, 380, `On me rend${NB}?`, C.rose, 30)
);

const boutique = svg(
  "Lina a 10 € ; une BD coûte 6 €, un ballon 4 €, un crayon 3 €",
  [["📘", "6 €"], ["⚽", "4 €"], ["✏️", "3 €"]].map(([e, p], i) => t(100 + i * 140, 160, e, C.craie, 60) + t(100 + i * 140, 220, p, C.craie, 30)).join("") +
    billet(165, 260, "10 €") + t(240, 395, `La BD et le ballon${NB}?`, C.rose, 28)
);

const pieces = svg(
  "Léo a 6 pièces de 20 centimes ; Ana a 1 pièce de 2 €",
  t(130, 90, "Léo", C.bleu, 30) + Array.from({ length: 6 }, (_, k) => piece(80 + (k % 3) * 50, 150 + Math.floor(k / 3) * 60, "20 c", 22, C.pale)).join("") +
    t(360, 90, "Ana", C.rose, 30) + piece(360, 180, "2 €", 42) + t(240, 360, `Qui a le plus d'argent${NB}?`, C.rose, 28)
);

const payer = svg(
  "Des pièces de 20 centimes et de 50 centimes ; payer exactement 1 €",
  [0, 1, 2, 3, 4].map((k) => piece(70 + k * 60, 130, "20 c", 24, C.pale)).join("") + [0, 1].map((k) => piece(160 + k * 80, 230, "50 c", 32, C.jaune)).join("") +
    t(240, 330, "payer exactement 1 €", C.craie, 28) + t(240, 380, `Combien de façons${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "monnaie",
  titre: "Énigmes sur la monnaie",
  description: "Compter le porte-monnaie, écrire 12 € 50 avec une virgule, la monnaie de la glace, la BD et le ballon, le piège des petites pièces, le défi des façons de payer 1 €.",
  problemes: [
    {
      tag: "Énigme 1 · Le porte-monnaie",
      titre: "Compter son argent",
      question: `Dans le porte-monnaie :<br>un billet de <b>5 €</b>, deux pièces de <b>2 €</b>, une pièce de <b>50 c</b>.<br><br>Combien d'argent en tout ?`,
      reponse: `5 + 2 + 2 = 9 €. Plus 50 centimes.<br>9 € et 50 c s'écrit <span class="big">9,50 €</span>.`,
      consigne: "Combien d'argent dans le porte-monnaie ? (écris 9,50 par exemple)",
      verification: { type: "courte", attendus: ["9,50", "9,5"], unite: "€" },
      dessin: portemonnaie,
    },
    {
      tag: "Énigme 2 · La librairie",
      titre: "L'étiquette",
      question: `Le livre coûte <b>12 euros et 50 centimes</b>.<br><br>Comment l'écrire avec une virgule ?`,
      reponse: `Avant la virgule, les euros : 12.<br>Après la virgule, les centimes : 50.<br><span class="big">12,50 €</span>.`,
      consigne: "Comment écrire 12 euros et 50 centimes ?",
      verification: { type: "qcm", choix: ["1 250 €", "12,05 €", "12,50 €"], bonne: 2 },
      dessin: etiquette,
    },
    {
      tag: "Énigme 3 · Le glacier",
      titre: "La monnaie de la glace",
      question: `La glace coûte <b>3 €</b>.<br>Tom paie avec un billet de <b>5 €</b>.<br><br>Combien lui rend-on ?`,
      reponse: `De 3 pour aller à 5 : 3 + 2 = 5.<br>On lui rend <span class="big">2 €</span>.`,
      consigne: "Combien d'euros rend-on à Tom ?",
      verification: { type: "courte", attendus: ["2"], unite: "€" },
      dessin: glace,
    },
    {
      tag: "Énigme 4 · La boutique",
      titre: "La BD et le ballon",
      question: `Lina a <b>10 €</b>.<br>Elle veut la BD (<b>6 €</b>) et le ballon (<b>4 €</b>).<br><br>A-t-elle assez d'argent ?`,
      reponse: `6 + 4 = 10 €. Lina a 10 €.<br><span class="big">Oui, il ne lui reste rien</span>.`,
      consigne: "Lina peut-elle acheter la BD et le ballon ?",
      verification: { type: "qcm", choix: ["Non, il manque 1 €", "Oui, il ne reste rien", "Oui, il reste 4 €"], bonne: 1 },
      dessin: boutique,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les petites pièces",
      sorte: "piege",
      question: `Léo a <b>6 pièces de 20 c</b>.<br>Ana a <b>1 pièce de 2 €</b>.<br><br>Qui a le plus d'argent ?`,
      reponse: `Le piège : compter les pièces.<br>Léo : 20 + 20 + 20 + 20 + 20 + 20 = 120 c = 1,20 €.<br>Ana : 2 €. C'est <span class="big">Ana</span>.`,
      consigne: "Qui a le plus d'argent ?",
      verification: { type: "qcm", choix: ["Ana", "Léo, il a plus de pièces", "Ils ont pareil"], bonne: 0 },
      dessin: pieces,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Payer 1 €",
      sorte: "defi",
      question: `Tu as beaucoup de pièces de <b>20 c</b> et de <b>50 c</b>.<br>Tu dois payer <b>exactement 1 €</b>.<br><br>De combien de façons ?`,
      reponse: `1 € = 100 c.<br>5 pièces de 20 c : 100 c. 2 pièces de 50 c : 100 c.<br>Avec une seule 50 c, il reste 50 c : impossible en 20 c.<br><span class="big">2 façons</span>.`,
      consigne: "De combien de façons peut-on payer 1 € ?",
      verification: { type: "courte", attendus: ["2"], unite: "façons" },
      dessin: payer,
    },
  ],
};

export default problemes;
