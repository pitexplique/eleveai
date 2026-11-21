// Énigmes à projeter — première spé maths, notion produit_scalaire
// (le char à voile, la tondeuse poussée, le passage à niveau, les deux bateaux
// de la Pointe des Galets (974), piège des voiliers de la régate, défi des
// chevaux de trait). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, o, p, fleche } from "../dessins-ecole";
import { vec, vecS } from "../dessins-tle";

const charVoile = svg("Le char à voile : le vent pousse avec la force F de coordonnées (30 ; 40) en newtons, et le char se déplace de A vers B, AB = (6 ; 2) en mètres",
  l(30, 280, 450, 280, C.pale, 3) +
    p("M90 250 L210 250 L200 268 L100 268 Z", C.craie, 3, 0.2) + o(100, 272, 9, C.craie, 0, 3) + o(200, 272, 9, C.craie, 0, 3) +
    l(150, 250, 150, 110, C.craie, 4) + p("M154 115 L154 240 L225 240 Z", C.bleu, 3, 0.3) +
    fleche(250, 200, 310, 120, C.jaune, 5) + vecS(338, 150, "F", C.jaune, 26) + t(338, 182, "(30 ; 40)", C.jaune, 20) +
    fleche(150, 310, 390, 290, C.rose, 4) + t(150, 338, "A", C.rose, 22) + t(392, 278, "B", C.rose, 22) + t(270, 336, "(6 ; 2)", C.rose, 20) +
    t(240, 400, `travail W =${NB}? J`, C.craie, 26));

const tondeuse = svg("La tondeuse : on pousse le guidon avec une force de 40 newtons qui fait un angle de 60 degrés avec le sol, sur 5 mètres",
  l(30, 270, 450, 270, C.pale, 3) +
    p("M120 230 L250 230 L250 262 L120 262 Z", C.bleu, 3, 0.3) + o(140, 262, 12, C.craie, 0, 3) + o(232, 262, 12, C.craie, 0, 3) +
    l(130, 232, 70, 128, C.craie, 5) + l(56, 128, 84, 128, C.craie, 5) +
    fleche(40, 76, 112, 200, C.jaune, 5) + t(30, 70, "40 N", C.jaune, 22, "start") +
    p("M150 230 A 34 34 0 0 0 147 212", C.rose, 3) + t(96, 222, "60°", C.rose, 20, "end") +
    fleche(270, 300, 430, 300, C.rose, 4) + t(350, 330, "5 m", C.rose, 22) +
    t(240, 395, `travail de la force${NB}?`, C.craie, 26));

const passage = svg("Le plan du passage à niveau : la route suit le vecteur u (2 ; m) et la voie ferrée le vecteur v (3 ; −6)",
  l(60, 260, 420, 80, C.pale, 14) + [0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
    const x = 80 + 46 * k, y = 250 - 23 * k;
    return l(x - 9, y - 18, x + 9, y + 18, C.craie, 3);
  }).join("") + l(150, 40, 250, 240, C.jaune, 22) +
    vecS(300, 290, "u", C.jaune, 26) + t(330, 290, "(2 ; m)", C.jaune, 22, "start") +
    vecS(300, 330, "v", C.craie, 26) + t(330, 330, "(3 ; −6)", C.craie, 22, "start") +
    t(240, 395, `perpendiculaires : m =${NB}?`, C.rose, 26));

const bateaux = svg("Deux bateaux quittent le port de la Pointe des Galets : l'un fait 5 km, l'autre 8 km, avec un angle de 60 degrés entre leurs routes",
  p("M40 300 L120 300 L120 330 L40 330", C.craie, 4) +
    l(80, 300, 220, 58, C.bleu, 4) + l(80, 300, 400, 300, C.jaune, 4) + l(220, 58, 400, 300, C.rose, 3, "8 6") +
    o(220, 58, 9, C.bleu, 1, 2) + o(400, 300, 9, C.jaune, 1, 2) + o(80, 300, 8, C.craie, 1, 2) +
    p("M130 300 A 50 50 0 0 0 105 257", C.craie, 3) + t(140, 280, "60°", C.craie, 20, "start") +
    t(130, 170, "5 km", C.bleu, 22, "end") + t(260, 330, "8 km", C.jaune, 22) +
    t(330, 170, `?`, C.rose, 30, "start") +
    t(240, 395, `distance entre les bateaux${NB}?`, C.rose, 24));

const regate = svg("La régate : le vent u vaut (1 ; 0) ; deux voiliers suivent v (2 ; 3) et w (2 ; −5)",
  fleche(60, 200, 160, 200, C.pale, 5) + vecS(110, 180, "u", C.pale, 24) +
    fleche(240, 200, 320, 80, C.bleu, 5) + fleche(240, 200, 320, 400 - 70, C.jaune, 5) + o(240, 200, 7, C.craie, 1, 2) +
    vecS(345, 100, "v", C.bleu, 24) + t(366, 100, "(2 ; 3)", C.bleu, 20, "start") +
    vecS(345, 330, "w", C.jaune, 24) + t(370, 330, "(2 ; −5)", C.jaune, 20, "start") +
    t(240, 395, `u · v = u · w  ⟹  v = w${NB}?`, C.rose, 24));

const chevaux = svg("Deux chevaux de trait tirent un tronc : les forces u et v valent 3 et 4 kilonewtons, leur somme vaut 6 kilonewtons",
  p("M60 210 L170 210 L170 240 L60 240 Z", C.jaune, 3, 0.35) + o(60, 225, 15, C.jaune, 0.2, 3) +
    fleche(170, 225, 330, 120, C.bleu, 5) + fleche(170, 225, 360, 290, C.bleu, 5) + fleche(170, 225, 420, 190, C.rose, 5) +
    vecS(200, 180, "u", C.bleu, 24) + t(268, 140, "3 kN", C.bleu, 20, "end") +
    vecS(260, 300, "v", C.bleu, 24) + t(300, 312, "4 kN", C.bleu, 20, "start") +
    t(424, 222, "6 kN", C.rose, 20, "end") +
    t(240, 395, `u · v =${NB}?`, C.craie, 28));

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "produit_scalaire",
  titre: "Énigmes du produit scalaire",
  description: "Le char à voile, la tondeuse, le passage à niveau, les bateaux de la Pointe des Galets, le piège des voiliers de la régate, le défi des chevaux de trait : produit scalaire en coordonnées, avec l'angle, orthogonalité, formule d'Al-Kashi, identités de polarisation.",
  problemes: [
    {
      tag: "Énigme 1 · Le char à voile",
      titre: "Le produit scalaire en coordonnées",
      question: `Sur la plage, le vent pousse un char à voile avec la force ${vec("F")}(30 ; 40), en newtons. Le char va de A à B, avec ${vec("AB")}(6 ; 2), en mètres.<br><br><b>Quel est le travail</b> W = ${vec("F")} · ${vec("AB")}, en joules ?`,
      reponse: `En coordonnées : xx′ + yy′.<br>W = 30 × 6 + 40 × 2 = 180 + 80 : <span class="big">W = 260 J</span>.`,
      consigne: "F(30 ; 40) et AB(6 ; 2). Combien vaut F · AB, en joules ?",
      verification: { type: "courte", attendus: ["260"], unite: "J" },
      dessin: charVoile,
    },
    {
      tag: "Énigme 2 · La tondeuse",
      titre: "Le produit scalaire avec l'angle",
      question: `On pousse une tondeuse sur 5 m. La force vaut 40 N et fait un angle de 60° avec le sol.<br><br><b>Quel est le travail</b> de cette force ?`,
      reponse: `W = ‖${vec("F")}‖ × ‖${vec("AB")}‖ × cos 60° = 40 × 5 × 0,5.<br><span class="big">W = 100 J</span>. Seule la partie de la force parallèle au sol fait avancer la tondeuse.`,
      consigne: "Force de 40 N à 60° du sol, sur 5 m. Quel est le travail ?",
      verification: { type: "qcm", choix: ["100 J", "200 J", "100√3 J"], bonne: 0 },
      dessin: tondeuse,
    },
    {
      tag: "Énigme 3 · Le passage à niveau",
      titre: "Deux vecteurs orthogonaux",
      question: `Sur un plan, la route suit le vecteur ${vec("u")}(2 ; m) et la voie ferrée le vecteur ${vec("v")}(3 ; −6). Au passage à niveau, elles doivent se croiser à angle droit.<br><br><b>Quelle valeur de m</b> faut-il ?`,
      reponse: `Orthogonaux ⟺ ${vec("u")} · ${vec("v")} = 0 : 2 × 3 + m × (−6) = 0, soit 6 − 6m = 0.<br><span class="big">m = 1</span>.`,
      consigne: "u(2 ; m) et v(3 ; −6) orthogonaux. Combien vaut m ?",
      verification: { type: "courte", attendus: ["1"] },
      dessin: passage,
    },
    {
      tag: "Énigme 4 · La Pointe des Galets",
      titre: "La formule d'Al-Kashi",
      question: `Deux bateaux quittent le port de la Pointe des Galets, à La Réunion. L'un est à 5 km du port, l'autre à 8 km. Leurs routes font un angle de 60°.<br><br><b>Quelle distance sépare les deux bateaux</b> ?`,
      reponse: `Al-Kashi : d² = 5² + 8² − 2 × 5 × 8 × cos 60° = 25 + 64 − 40 = 49.<br><span class="big">d = 7 km</span>.`,
      consigne: "5 km, 8 km et 60° entre les routes. Quelle distance entre les bateaux ?",
      verification: { type: "qcm", choix: ["√89 km", "7 km", "13 km"], bonne: 1 },
      dessin: bateaux,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les voiliers de la régate",
      sorte: "piege",
      question: `Le vent suit ${vec("u")}(1 ; 0). Deux voiliers suivent ${vec("v")}(2 ; 3) et ${vec("w")}(2 ; −5).<br>Zoé : « ${vec("u")} · ${vec("v")} = ${vec("u")} · ${vec("w")}, donc ${vec("v")} = ${vec("w")}. »<br><br><b>Zoé a-t-elle raison</b> ?`,
      reponse: `${vec("u")} · ${vec("v")} = 2 et ${vec("u")} · ${vec("w")} = 2 : égaux. Pourtant ${vec("v")} ≠ ${vec("w")}.<br><span class="big">Non</span> : on ne peut pas « simplifier » par ${vec("u")}. On sait seulement que ${vec("u")} · (${vec("v")} − ${vec("w")}) = 0.`,
      consigne: "u · v = u · w : peut-on en déduire v = w ?",
      verification: { type: "qcm", choix: ["oui, toujours", "oui, si u n'est pas nul", "non, contre-exemple ici"], bonne: 2 },
      dessin: regate,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les chevaux de trait",
      sorte: "defi",
      question: `Deux chevaux de trait tirent un tronc. Leurs forces ${vec("u")} et ${vec("v")} valent 3 kN et 4 kN. Leur somme ${vec("u")} + ${vec("v")} vaut 6 kN.<br><br><b>Combien vaut ${vec("u")} · ${vec("v")}</b> ?`,
      reponse: `‖${vec("u")} + ${vec("v")}‖² = ‖${vec("u")}‖² + 2 ${vec("u")} · ${vec("v")} + ‖${vec("v")}‖² : 36 = 9 + 2 ${vec("u")} · ${vec("v")} + 16.<br><span class="big">${vec("u")} · ${vec("v")} = 5,5</span> (en kN²).`,
      consigne: "‖u‖ = 3, ‖v‖ = 4 et ‖u + v‖ = 6. Combien vaut u · v ?",
      verification: { type: "courte", attendus: ["5,5", "11/2"] },
      dessin: chevaux,
    },
  ],
};

export default problemes;
