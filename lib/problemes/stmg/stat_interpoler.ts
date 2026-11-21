// Énigmes à projeter — STMG (1re), notion interpoler et extrapoler
// (la cueillette de goyaviers de la Plaine-des-Palmistes, l'école de danse,
// le paveur, la fourrière, piège du pédiatre, défi du producteur de pleurotes). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, l, r, svg, t } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";

const R1 = repereXY(0, 10, 0, 160, { py: 10, ey: 20 });
const goyaviers = svg("Cueillette de goyaviers : nuage et droite y égale 15 x plus 10 ; on lit y pour 4 cueilleurs",
  R1.fond + ([[2, 38], [3, 57], [5, 84], [7, 116], [8, 128]] as const).map(([x, y]) => R1.point(x, y, C.craie, 7)).join("") +
    R1.courbe((x) => 15 * x + 10, 0, 10, C.bleu, 4) +
    l(R1.X(4), R1.Y(0), R1.X(4), R1.Y(70), C.rose, 3, "8 6") + l(R1.X(4), R1.Y(70), R1.X(0), R1.Y(70), C.rose, 3, "8 6") +
    t(R1.X(0) + 8, 22, "kg", C.pale, 17, "start") + t(R1.X(10), R1.Y(0) + 46, "cueilleurs", C.pale, 17, "end") +
    t(300, 405, `4 cueilleurs${NB}: combien de kg${NB}?`, C.rose, 24));

const danse = svg("L'école de danse : relevés de 2018 à 2025 ; estimation demandée pour 2028",
  l(40, 200, 450, 200, C.craie, 3) + r(60, 175, 230, 50, C.bleu, 0.25, 3, 8) +
    ([2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028] as const).map((_, k) => l(60 + k * 33, 192, 60 + k * 33, 208, C.craie, 2)).join("") +
    t(60, 250, "2018", C.pale, 18) + t(291, 250, "2025", C.pale, 18) + t(390, 250, "2028", C.rose, 20) +
    `<circle cx="390" cy="200" r="10" fill="${C.rose}"/>` +
    t(175, 155, "les relevés", C.bleu, 22) + t(390, 155, "?", C.rose, 30) +
    t(240, 350, `interpoler ou extrapoler${NB}?`, C.rose, 26));

const paveur = svg("Le paveur : y égale 12 x plus 30 ; relevés de 1 à 6 jours ; chantier de 10 jours",
  r(50, 80, 380, 100, C.bleu, 0.15, 3, 10) + t(240, 145, "y = 12x + 30", C.craie, 36) +
    t(240, 235, "x = jours de chantier (relevés : 1 à 6)", C.pale, 21) + t(240, 268, "y = m² de pavés posés", C.pale, 21) +
    t(240, 350, `x = 10${NB}: y${NB}=${NB}?`, C.rose, 30));

const R4 = repereXY(2018, 2026, 0, 300, { gx: 100, gl: 330, ex: 2, py: 50, ey: 100 });
const fourriere = svg("La fourrière : voitures enlevées de 2019 à 2025, entre 180 et 240 par an, nuage qui monte doucement",
  R4.fond.replace(/2[^0-9<]0([0-9][0-9])</g, "20$1<") + ([[2019, 182], [2020, 190], [2021, 201], [2022, 209], [2023, 222], [2024, 228], [2025, 239]] as const).map(([x, y]) => R4.point(x, y, C.bleu, 7)).join("") +
    t(R4.X(2018) - 10, R4.Y(0) + 6, "0", C.pale, 17, "end") + t(R4.X(2018) + 8, 22, "voitures", C.pale, 17, "start") + t(R4.X(2026), R4.Y(0) + 46, "année", C.pale, 17, "end") +
    t(260, 405, `quelle prévision est sérieuse${NB}?`, C.rose, 24));

const R5 = repereXY(0, 6, 0, 140, { px: 1, py: 10, ey: 20 });
const pediatre = svg("Taille d'un enfant de 1 à 5 ans : 82, 89, 96, 103, 110 centimètres, droite y égale 7 x plus 75",
  R5.fond + R5.courbe((x) => 7 * x + 75, 0, 6, C.bleu, 3) +
    ([[1, 82], [2, 89], [3, 96], [4, 103], [5, 110]] as const).map(([x, y]) => R5.point(x, y, C.craie, 7)).join("") +
    t(R5.X(0) + 8, 22, "taille (cm)", C.pale, 17, "start") + t(R5.X(6), R5.Y(0) + 46, "âge (ans)", C.pale, 17, "end") +
    t(280, 405, `à 40 ans${NB}: 3,55${NB}m${NB}?`, C.rose, 24));

const pleurotes = svg("Pleurotes : semaines 1 à 6, récoltes 48, 56, 64, 72, 80, 88 kilos ; ajustement y égale 8 x plus 40 ; quand 120 kilos ?",
  tableau(25, 60, [110, 54, 54, 54, 54, 54, 54], 50, [["semaine", 1, 2, 3, 4, 5, 6], ["kg", 48, 56, 64, 72, 80, 88]], (i, j) => (j === 0 ? C.pale : C.craie), 20) +
    r(90, 200, 300, 70, C.bleu, 0.15, 3, 10) + t(240, 245, "y = 8x + 40", C.craie, 30) +
    t(240, 365, `120${NB}kg${NB}: quelle semaine${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "stat_interpoler",
  titre: "Énigmes : interpoler et extrapoler",
  description: "La cueillette de goyaviers de la Plaine-des-Palmistes, l'école de danse, le paveur, la fourrière, le piège du pédiatre, le défi du producteur de pleurotes : estimer une valeur dans le nuage ou au-delà, et savoir quand une prévision n'a plus de sens.",
  problemes: [
    {
      tag: "Énigme 1 · Les goyaviers",
      titre: "Lire sur la droite",
      question: `À la Plaine-des-Palmistes, une ferme organise la cueillette de goyaviers.<br>Le nuage donne les kilos cueillis selon le nombre de cueilleurs.<br>Personne n'a essayé avec 4 cueilleurs.<br><br><b>Combien de kilos</b> la droite prévoit-elle ?`,
      reponse: `On part de 4 en bas, on monte jusqu'à la droite, on lit à gauche.<br>Ou : 15 × 4 + 10 = <span class="big">70 kg</span>.<br>4 est entre 3 et 5 : c'est une interpolation.`,
      consigne: "4 cueilleurs : combien de kilos ?",
      verification: { type: "courte", attendus: ["70"], unite: "kg" },
      dessin: goyaviers,
    },
    {
      tag: "Énigme 2 · L'école de danse",
      titre: "Dedans ou dehors ?",
      question: `Une école de danse a noté ses inscriptions de 2018 à 2025.<br>Elle veut estimer les inscriptions de 2028.<br><br><b>Est-ce interpoler ou extrapoler</b> ?`,
      reponse: `2028 est après le dernier relevé, en dehors des données.<br><span class="big">C'est extrapoler</span>.<br>Interpoler, c'est estimer entre deux relevés.`,
      consigne: "Estimer 2028 : interpoler ou extrapoler ?",
      verification: { type: "qcm", choix: ["extrapoler", "interpoler", "ni l'un ni l'autre"], bonne: 0 },
      dessin: danse,
    },
    {
      tag: "Énigme 3 · Le paveur",
      titre: "Extrapoler",
      question: `Un paveur a relevé ses 6 premiers jours de chantier.<br>Son ajustement : y = 12x + 30.<br>x : les jours. y : les m² de pavés posés.<br><br><b>Combien de m²</b> au bout de 10 jours ?`,
      reponse: `y = 12 × 10 + 30 = 120 + 30 = <span class="big">150 m²</span>.<br>10 jours, c'est après les relevés : on extrapole.`,
      consigne: "Au bout de 10 jours : combien de m² ?",
      verification: { type: "courte", attendus: ["150"], unite: "m²" },
      dessin: paveur,
    },
    {
      tag: "Énigme 4 · La fourrière",
      titre: "Jusqu'où prévoir ?",
      question: `Une fourrière compte les voitures enlevées de 2019 à 2025.<br>Le nuage monte doucement.<br><br><b>Quelle prévision</b> est la plus sérieuse ?`,
      reponse: `Plus on s'éloigne des données, moins la prévision est fiable.<br>Les règles et la ville peuvent changer d'ici là.<br><span class="big">La prévision pour 2026</span>.`,
      consigne: "Quelle prévision est la plus sérieuse ?",
      verification: { type: "qcm", choix: ["pour 2060", "pour 2100", "pour 2026"], bonne: 2 },
      dessin: fourriere,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le pédiatre",
      sorte: "piege",
      question: `Un pédiatre note la taille d'un enfant de 1 à 5 ans.<br>Ajustement : y = 7x + 75 (x en années, y en cm).<br>Lou calcule pour 40 ans : 7 × 40 + 75 = 355 cm.<br><br><b>L'enfant mesurera-t-il 3,55 m</b> ?`,
      reponse: `Un enfant ne grandit pas toute sa vie : la croissance s'arrête.<br>La droite ne vaut que près des données.<br><span class="big">Non : on ne peut pas extrapoler si loin</span>.`,
      consigne: "L'enfant mesurera-t-il 3,55 m à 40 ans ?",
      verification: { type: "qcm", choix: ["oui, 3,55 m", "non : on ne peut pas extrapoler si loin", "oui, la droite le prouve"], bonne: 1 },
      dessin: pediatre,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le producteur de pleurotes",
      sorte: "defi",
      question: `Un producteur de pleurotes récolte un peu plus chaque semaine.<br>Ajustement : y = 8x + 40 (x : la semaine, y : les kg).<br><br>Un restaurant veut 120 kg d'un coup.<br><b>Quelle semaine</b> pourra-t-il les fournir ?`,
      reponse: `On cherche x tel que 8x + 40 = 120.<br>8x = 80, donc x = 10 : <span class="big">la semaine 10</span>.`,
      consigne: "120 kg : quelle semaine ?",
      verification: { type: "courte", attendus: ["10", "semaine 10", "la semaine 10"] },
      dessin: pleurotes,
    },
  ],
};

export default problemes;
