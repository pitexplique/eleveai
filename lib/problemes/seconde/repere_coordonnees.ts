// Énigmes à projeter — seconde, notion repere_coordonnees (le rendez-vous au
// milieu, la carte au trésor, le reflet du lampadaire, le 4e coin du
// jardin, piège de l'axe, défi de la borne de recharge). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l } from "../dessins-ecole";
import { repere } from "../dessins-2de";

const lettre = (x: number, y: number, s: string, c: string = C.craie, ancre: "start" | "end" | "middle" = "start") => t(x, y, s, c, 22, ancre);

const rdv = (() => {
  const R = repere(0, 9, 0, 8, { gl: 360, gh: 320, gy: 30, gx: 70 });
  return svg("Deux maisons A de coordonnées 2 et 7 et B de coordonnées 8 et 3, et leur milieu",
    R.fond + l(R.X(2), R.Y(7), R.X(8), R.Y(3), C.pale, 3, "8 6") + R.point(2, 7, C.bleu, 10) + R.point(8, 3, C.jaune, 10) +
      lettre(R.X(2) + 14, R.Y(7) - 12, "A") + lettre(R.X(8) + 14, R.Y(3) - 12, "B") + t(R.X(5) + 30, R.Y(5) - 14, `milieu${NB}?`, C.rose, 22));
})();

const tresor = (() => {
  const R = repere(0, 6, 0, 7, { gl: 300, gh: 350, gy: 25, gx: 90 });
  return svg("Une carte au trésor : le départ en A de coordonnées 1 et 2, le trésor en B de coordonnées 4 et 6",
    R.fond + l(R.X(1), R.Y(2), R.X(4), R.Y(6), C.rose, 4, "10 8") + R.point(1, 2, C.bleu, 10) + t(R.X(4), R.Y(6) + 10, "✕", C.jaune, 34) +
      lettre(R.X(1) + 14, R.Y(2) + 22, "A") + lettre(R.X(4) + 18, R.Y(6) + 4, "B") + t(400, 200, "1 carreau", C.pale, 16, "start") + t(400, 220, "= 1 m", C.pale, 16, "start"));
})();

const reflet = (() => {
  const R = repere(0, 8, 0, 4, { gl: 380, gh: 190, gy: 60, gx: 50 });
  return svg("Le point A de coordonnées 1 et 3, le centre I de coordonnées 4 et 2, et le symétrique B à trouver",
    R.fond + l(R.X(1), R.Y(3), R.X(7), R.Y(1), C.pale, 3, "8 6") + R.point(1, 3, C.bleu, 10) + R.point(4, 2, C.craie, 8) +
      lettre(R.X(1) + 10, R.Y(3) - 14, "A") + lettre(R.X(4) + 6, R.Y(2) - 16, "I") + t(R.X(7), R.Y(1) - 18, `B${NB}?`, C.rose, 24) + t(240, 380, "I est le milieu de [AB]", C.craie, 22));
})();

const jardin = (() => {
  const R = repere(-1, 6, -1, 5, { gl: 350, gh: 300, gy: 30, gx: 65 });
  return svg("Trois coins d'un jardin en parallélogramme : A à l'origine, B de coordonnées 4 et 1, C de coordonnées 5 et 4",
    R.fond + l(R.X(0), R.Y(0), R.X(4), R.Y(1), C.bleu, 4) + l(R.X(4), R.Y(1), R.X(5), R.Y(4), C.bleu, 4) +
      R.point(0, 0, C.bleu, 9) + R.point(4, 1, C.bleu, 9) + R.point(5, 4, C.bleu, 9) +
      lettre(R.X(0) - 12, R.Y(0) - 12, "A", C.craie, "end") + lettre(R.X(4) + 12, R.Y(1) + 6, "B") + lettre(R.X(5) + 12, R.Y(4) - 6, "C") + t(150, 395, `D${NB}?`, C.rose, 28));
})();

const piege = (() => {
  const R = repere(-1, 5, -1, 4, { gl: 360, gh: 260, gy: 40, gx: 60 });
  return svg("Un repère et le point de coordonnées 3 et 0",
    R.fond + R.point(3, 0, C.rose, 11) + t(R.X(3), R.Y(0) - 22, "(3 ; 0)", C.rose, 24) + t(240, 395, `sur quel axe${NB}?`, C.craie, 26));
})();

const borne = (() => {
  const R = repere(0, 7, 0, 5, { gl: 380, gh: 270, gy: 40, gx: 50 });
  return svg("Deux maisons A de coordonnées 0 et 4 et B de coordonnées 6 et 2, une route sur l'axe des abscisses",
    R.fond + l(R.X(0), R.Y(0), R.X(7), R.Y(0), C.jaune, 8) + R.point(0, 4, C.bleu, 11) + R.point(6, 2, C.bleu, 11) +
      lettre(R.X(0) + 14, R.Y(4) - 12, "A") + lettre(R.X(6) + 14, R.Y(2) - 12, "B") + t(240, 395, `la borne P sur la route${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "repere_coordonnees",
  titre: "Énigmes du repère",
  description: "Le rendez-vous au milieu, la carte au trésor, le point symétrique, le quatrième coin du jardin, le piège de l'axe, le défi de la borne de recharge : milieu, distance et coordonnées dans un repère.",
  problemes: [
    {
      tag: "Énigme 1 · Le rendez-vous",
      titre: "À mi-chemin",
      question: `Sur une carte graduée en km, Léa habite en <b>A(2 ; 7)</b> et Hugo en <b>B(8 ; 3)</b>. Ils se donnent rendez-vous au milieu.<br><br><b>Quelles sont les coordonnées</b> du milieu ?`,
      reponse: `On fait la moyenne des abscisses et des ordonnées : ((2 + 8) ÷ 2 ; (7 + 3) ÷ 2).<br>Le milieu est <span class="big">(5 ; 5)</span>.`,
      consigne: "Coordonnées du milieu de A(2 ; 7) et B(8 ; 3) ?",
      verification: { type: "courte", attendus: ["(5;5)", "5;5"] },
      dessin: rdv,
    },
    {
      tag: "Énigme 2 · La carte au trésor",
      titre: "À vol d'oiseau",
      question: `Sur une carte au trésor, 1 carreau = 1 m. Le départ est en <b>A(1 ; 2)</b>, le trésor en <b>B(4 ; 6)</b>.<br><br><b>À combien de mètres</b> est le trésor, en ligne droite ?`,
      reponse: `AB = √((4 − 1)² + (6 − 2)²) = √(9 + 16) = √25 = <span class="big">5 m</span>.<br>C'est Pythagore dans le triangle 3, 4, 5.`,
      consigne: "Quelle est la distance AB en mètres ?",
      verification: { type: "courte", attendus: ["5"], unite: "m" },
      dessin: tresor,
    },
    {
      tag: "Énigme 3 · Le symétrique",
      titre: "Le point B",
      question: `B est le symétrique de <b>A(1 ; 3)</b> par rapport à <b>I(4 ; 2)</b>.<br><br><b>Quelles sont les coordonnées</b> de B ?`,
      reponse: `I est le milieu de [AB] : de A à I, on fait +3 en x et −1 en y. On refait pareil depuis I.<br>B = (4 + 3 ; 2 − 1) = <span class="big">(7 ; 1)</span>.`,
      consigne: "Coordonnées du symétrique de A(1 ; 3) par rapport à I(4 ; 2) ?",
      verification: { type: "qcm", choix: ["(7 ; 1)", "(5 ; 5)", "(2,5 ; 2,5)"], bonne: 0 },
      dessin: reflet,
    },
    {
      tag: "Énigme 4 · Le jardin",
      titre: "Le quatrième coin",
      question: `Un jardin a la forme d'un parallélogramme ABCD avec <b>A(0 ; 0)</b>, <b>B(4 ; 1)</b> et <b>C(5 ; 4)</b>.<br><br><b>Où est le coin D</b> ?`,
      reponse: `Dans ABCD, on va de B à C comme de A à D : +1 en x, +3 en y.<br>D = (0 + 1 ; 0 + 3) = <span class="big">(1 ; 3)</span>.<br>Vérif : les milieux de [AC] et [BD] sont tous deux (2,5 ; 2).`,
      consigne: "ABCD parallélogramme, A(0 ; 0), B(4 ; 1), C(5 ; 4) : coordonnées de D ?",
      verification: { type: "qcm", choix: ["(9 ; 5)", "(1 ; 3)", "(−1 ; −3)"], bonne: 1 },
      dessin: jardin,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Sur quel axe ?",
      sorte: "piege",
      question: `Le point <b>(3 ; 0)</b> est sur un axe du repère.<br><br><b>Lequel</b> ?`,
      reponse: `Son ordonnée vaut 0 : il est à la hauteur 0, donc sur l'axe horizontal.<br>C'est <span class="big">l'axe des abscisses</span>.<br>Les points de l'axe des ordonnées s'écrivent (0 ; y).`,
      consigne: "Sur quel axe est le point (3 ; 0) ?",
      verification: { type: "qcm", choix: ["l'axe des ordonnées", "aucun des deux", "l'axe des abscisses"], bonne: 2 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La borne de recharge",
      sorte: "defi",
      question: `Une route suit l'axe des abscisses. Deux maisons sont en <b>A(0 ; 4)</b> et <b>B(6 ; 2)</b>. On pose une borne P(x ; 0) sur la route, <b>à la même distance</b> des deux maisons.<br><br><b>Combien vaut x</b> ?`,
      reponse: `PA² = x² + 16 et PB² = (x − 6)² + 4 = x² − 12x + 40.<br>x² + 16 = x² − 12x + 40, donc 12x = 24 et <span class="big">x = 2</span>.<br>Vérif : PA² = 4 + 16 = 20 et PB² = 16 + 4 = 20.`,
      consigne: "Quelle abscisse pour la borne à égale distance de A(0 ; 4) et B(6 ; 2) ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: borne,
    },
  ],
};

export default problemes;
