// Énigmes à projeter — STMG (1re), notion logique : et, ou, non (l'hippodrome,
// la société de gardiennage, l'agence de casting, le relais routier, piège du
// centre aquatique, défi du don du sang). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, ell } from "../dessins-ecole";

/** Une règle encadrée (jaune), des faits (bleu) et la question (rose). */
const carte = (aria: string, regle: string[], faits: string[], question: string) =>
  svg(aria,
    r(30, 30, 420, 50 + 40 * (regle.length - 1), C.jaune, 0.12, 3) +
      regle.map((s, k) => t(240, 64 + 40 * k, s, C.craie, 24)).join("") +
      faits.map((s, k) => t(240, 150 + 40 * (regle.length - 1) + 44 * k, s, C.bleu, 23)).join("") +
      t(240, 380, question, C.rose, 27));

const hippodrome = carte("Hippodrome : tarif réduit si moins de 26 ans ET étudiant ; Léa a 24 ans et n'est pas étudiante",
  ["tarif réduit si :", "moins de 26 ans ET étudiant"], ["Léa : 24 ans", "Léa n'est pas étudiante"], `tarif réduit${NB}?`);

const gardiennage = carte("Gardiennage : prime si on travaille la nuit OU le week-end ; Karim travaille le samedi, de jour",
  ["prime si on travaille :", "la nuit OU le week-end"], ["Karim : samedi", "de 8 h à 16 h"], `Karim a-t-il la prime${NB}?`);

const casting = carte("Casting : tous les candidats ont plus de 18 ans ; quelle est la négation ?",
  ["« Tous les candidats", "ont plus de 18 ans. »"], ["le contraire de cette phrase ?"], `négation${NB}?`);

const relais = carte("Relais routier : menu fromage ou dessert ; le chauffeur prend fromage et dessert ; la phrase il a pris du fromage ou un dessert est-elle vraie ?",
  ["menu : fromage OU dessert"], ["Le chauffeur prend les deux.", "« Il a pris du fromage", "ou un dessert. »"], `vraie ou fausse${NB}?`);

const aquatique = carte("Centre aquatique : ouvert le samedi et le dimanche est faux ; Tom dit qu'il est fermé le samedi et le dimanche",
  ["« Ouvert le samedi", "ET le dimanche » : FAUX"], ["Tom : « donc fermé le samedi", "et fermé le dimanche »"], `Tom a-t-il raison${NB}?`);

const sang = svg("Don du sang : 40 donneurs ; 25 du groupe O ; 18 de plus de 50 ans ; 10 sont les deux ; combien sont du groupe O OU de plus de 50 ans ?",
  ell(185, 190, 120, 85, C.bleu, 0.12, 3) + ell(295, 190, 120, 85, C.jaune, 0.12, 3) +
    t(185, 80, "groupe O : 25", C.bleu, 23) + t(295, 320, "plus de 50 ans : 18", C.jaune, 23) +
    t(240, 200, "10", C.craie, 30) +
    t(240, 32, "40 donneurs", C.pale, 22) +
    t(240, 385, `O OU plus de 50 ans${NB}?`, C.rose, 27));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "logique_connecteurs",
  titre: "Énigmes de la logique : et, ou, non",
  description: "L'hippodrome, la société de gardiennage, l'agence de casting, le relais routier, le piège du centre aquatique, le défi du don du sang : utiliser « et » et « ou », écrire une négation, distinguer le « ou » des maths du « ou » de la vie courante.",
  problemes: [
    {
      tag: "Énigme 1 · L'hippodrome",
      titre: "Le connecteur ET",
      question: `Un hippodrome fait un tarif réduit aux moins de 26 ans qui sont étudiants.<br>Léa a 24 ans. Elle travaille, elle n'est pas étudiante.<br><br><b>A-t-elle le tarif réduit</b> ?`,
      reponse: `Avec ET, il faut les deux conditions.<br>Léa a moins de 26 ans, mais elle n'est pas étudiante.<br>Réponse : <span class="big">non</span>.`,
      consigne: "Léa a-t-elle le tarif réduit ?",
      verification: { type: "qcm", choix: ["Non", "Oui", "On ne peut pas savoir"], bonne: 0 },
      dessin: hippodrome,
    },
    {
      tag: "Énigme 2 · La société de gardiennage",
      titre: "Le connecteur OU",
      question: `Une société de gardiennage donne une prime à qui travaille la nuit ou le week-end.<br>Karim surveille un entrepôt le samedi, de jour.<br><br><b>Karim a-t-il la prime</b> ?`,
      reponse: `Avec OU, une seule condition suffit.<br>Le samedi est dans le week-end.<br>Réponse : <span class="big">oui</span>.`,
      consigne: "Karim a-t-il la prime (oui ou non) ?",
      verification: { type: "courte", attendus: ["oui"] },
      dessin: gardiennage,
    },
    {
      tag: "Énigme 3 · L'agence de casting",
      titre: "Écrire une négation",
      question: `Une agence de casting affirme :<br>« Tous les candidats ont plus de 18 ans. »<br><br><b>Quel est le contraire</b> de cette phrase ?`,
      reponse: `Pour que la phrase soit fausse, un seul candidat suffit.<br>Négation : <span class="big">au moins un candidat a 18 ans ou moins</span>.`,
      consigne: "Quelle est la négation de la phrase ?",
      verification: { type: "qcm", choix: ["Aucun candidat n'a plus de 18 ans", "Au moins un candidat a 18 ans ou moins", "Tous les candidats ont moins de 18 ans"], bonne: 1 },
      dessin: casting,
    },
    {
      tag: "Énigme 4 · Le relais routier",
      titre: "Le OU des maths",
      question: `Au relais routier, le menu dit « fromage ou dessert ».<br>Un chauffeur prend les deux.<br><br>En maths, la phrase « il a pris du fromage ou un dessert » est-elle <b>vraie ou fausse</b> ?`,
      reponse: `Au restaurant, « ou » veut dire « l'un ou l'autre, pas les deux ».<br>En maths, « A ou B » est vrai dès que l'un des deux est vrai, et aussi si les deux le sont.<br>La phrase est <span class="big">vraie</span>.`,
      consigne: "La phrase est-elle vraie ou fausse ?",
      verification: { type: "courte", attendus: ["vraie", "vrai"] },
      dessin: relais,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le centre aquatique",
      sorte: "piege",
      question: `Un centre aquatique affiche : « ouvert samedi ET dimanche ».<br>Cette phrase est fausse.<br>Tom en déduit : « il est fermé le samedi et fermé le dimanche ».<br><br><b>Tom a-t-il raison</b> ?`,
      reponse: `Le contraire de « A ET B » est « non A OU non B ».<br>Le centre est fermé le samedi OU le dimanche : peut-être un seul jour.<br>Par exemple, ouvert le samedi et fermé le dimanche.<br>Réponse : <span class="big">non</span>.`,
      consigne: "Tom a-t-il raison (oui ou non) ?",
      verification: { type: "courte", attendus: ["non"] },
      dessin: aquatique,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le don du sang",
      sorte: "defi",
      question: `Une collecte de don du sang reçoit 40 donneurs.<br>25 sont du groupe O. 18 ont plus de 50 ans.<br>10 sont les deux à la fois.<br><br><b>Combien</b> sont du groupe O ou ont plus de 50 ans ?`,
      reponse: `25 + 18 = 43 compte deux fois les 10 donneurs du milieu.<br>43 − 10 = <span class="big">33</span> donneurs.`,
      consigne: "Combien de donneurs sont du groupe O ou ont plus de 50 ans ?",
      verification: { type: "qcm", choix: ["43", "23", "33"], bonne: 2 },
      dessin: sang,
    },
  ],
};

export default problemes;
