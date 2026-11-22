// Énigmes à projeter — STMG (1re), notion contre-exemple et réciproque (le
// tailleur de pierre, la carte grise, le garde-côte, la bibliothécaire, piège du
// fourgon, défi du contrôleur). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

/** Une règle encadrée (jaune), des faits (bleu) et la question (rose). */
const carte = (aria: string, regle: string[], faits: string[], question: string) =>
  svg(aria,
    r(30, 30, 420, 50 + 40 * (regle.length - 1), C.jaune, 0.12, 3) +
      regle.map((s, k) => t(240, 64 + 40 * k, s, C.craie, 24)).join("") +
      faits.map((s, k) => t(240, 150 + 40 * (regle.length - 1) + 44 * k, s, C.bleu, 23)).join("") +
      t(240, 380, question, C.rose, 27));

const pierre = carte("Tailleur de pierre : tout bloc de plus de 500 kg mesure plus de 1 m ; un bloc de 600 kg mesure 90 cm",
  ["« Tout bloc de plus de 500 kg", "mesure plus de 1 m. »"], ["un bloc : 600 kg", "longueur : 90 cm"], `ce bloc est…${NB}?`);

const grise = carte("Carte grise : si une voiture a moins de 4 ans, pas de contrôle technique ; quelle est la réciproque ?",
  ["SI moins de 4 ans", "ALORS pas de contrôle technique"], ["on échange le SI et le ALORS"], `réciproque${NB}?`);

const garde = carte("Garde-côte : s'il y a une alerte orange, les bateaux restent au port ; ce matin un bateau est sorti",
  ["SI alerte orange", "ALORS les bateaux restent au port"], ["Ce matin,", "un bateau est sorti en mer."], `alerte orange${NB}?`);

const biblio = carte("Bibliothèque : pour emprunter il faut une carte et aucun retard ; avoir une carte est une condition nécessaire ou suffisante ?",
  ["pour emprunter, il faut :", "une carte ET aucun retard"], ["« avoir une carte »", "pour emprunter, c'est…"], `nécessaire ou suffisante${NB}?`);

const fourgon = carte("Fourgon : si le fourgon dépasse 3,5 tonnes, il faut le permis C ; Yanis a le permis C",
  [`SI le fourgon dépasse 3,5${NB}t`, "ALORS il faut le permis C"], ["Yanis a le permis C."], `plus de 3,5${NB}t forcément${NB}?`);

const controleur = svg("Contrôleur : demi-tarif pour les moins de 12 ans et les plus de 65 ans ; deux phrases ; laquelle est fausse ?",
  r(30, 24, 420, 90, C.jaune, 0.12, 3) +
    t(240, 58, "demi-tarif :", C.craie, 24) + t(240, 96, "moins de 12 ans OU plus de 65 ans", C.craie, 23) +
    t(240, 165, "1) Si moins de 12 ans,", C.bleu, 23) + t(240, 199, "alors demi-tarif.", C.bleu, 23) +
    t(240, 255, "2) Si demi-tarif,", C.bleu, 23) + t(240, 289, "alors moins de 12 ans.", C.bleu, 23) +
    t(240, 375, `laquelle est fausse${NB}?`, C.rose, 27));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "logique_raisonnement",
  titre: "Énigmes du contre-exemple et de la réciproque",
  description: "Le tailleur de pierre, la carte grise, le garde-côte, la bibliothécaire, le piège du fourgon, le défi du contrôleur : trouver un contre-exemple, écrire une réciproque, utiliser la contraposée, distinguer condition nécessaire et condition suffisante.",
  problemes: [
    {
      tag: "Énigme 1 · Le tailleur de pierre",
      titre: "Un contre-exemple",
      question: `Un tailleur de pierre affirme :<br>« Tout bloc de plus de 500 kg mesure plus de 1 m. »<br>Dans sa cour, un bloc pèse 600 kg et mesure 90 cm.<br><br><b>Que représente ce bloc</b> pour la phrase ?`,
      reponse: `Le bloc pèse plus de 500 kg, mais il ne mesure pas plus de 1 m.<br>Un seul cas suffit pour montrer que la phrase est fausse.<br>C'est un <span class="big">contre-exemple</span>.`,
      consigne: "Que représente ce bloc ?",
      verification: { type: "qcm", choix: ["Un contre-exemple", "Un exemple qui prouve la phrase", "Rien du tout"], bonne: 0 },
      dessin: pierre,
    },
    {
      tag: "Énigme 2 · La carte grise",
      titre: "Écrire la réciproque",
      question: `Au guichet des cartes grises, une affiche dit :<br>« Si une voiture a moins de 4 ans, alors elle n'a pas besoin de contrôle technique. »<br><br><b>Quelle est la réciproque</b> de cette phrase ?`,
      reponse: `Pour la réciproque, on échange le « si » et le « alors ».<br>Réciproque : <span class="big">si une voiture n'a pas besoin de contrôle technique, alors elle a moins de 4 ans</span>.`,
      consigne: "Quelle est la réciproque ?",
      verification: { type: "qcm", choix: ["Si une voiture a plus de 4 ans, alors elle a besoin d'un contrôle technique", "Si une voiture n'a pas besoin de contrôle technique, alors elle a moins de 4 ans", "Si une voiture a moins de 4 ans, alors elle a besoin d'un contrôle technique"], bonne: 1 },
      dessin: grise,
    },
    {
      tag: "Énigme 3 · Le garde-côte",
      titre: "La contraposée",
      question: `Le garde-côte rappelle la règle :<br>« S'il y a une alerte orange, alors les bateaux restent au port. »<br>La règle est respectée. Ce matin, un bateau est sorti en mer.<br><br><b>Y avait-il une alerte orange</b> ?`,
      reponse: `La contraposée dit : si un bateau sort, alors il n'y a pas d'alerte orange.<br>Elle est vraie quand la règle est vraie.<br>Réponse : <span class="big">non</span>.`,
      consigne: "Y avait-il une alerte orange (oui ou non) ?",
      verification: { type: "courte", attendus: ["non"] },
      dessin: garde,
    },
    {
      tag: "Énigme 4 · La bibliothécaire",
      titre: "Nécessaire ou suffisante",
      question: `La bibliothécaire explique : pour emprunter un livre, il faut une carte et n'avoir aucun retard.<br><br>« Avoir une carte » est-il une condition <b>nécessaire</b> ou <b>suffisante</b> pour emprunter ?`,
      reponse: `Sans carte, on ne peut pas emprunter : la carte est indispensable.<br>Mais avec une carte et un retard, on ne peut pas emprunter non plus.<br>Condition <span class="big">nécessaire</span>, pas suffisante.`,
      consigne: "La condition est-elle nécessaire ou suffisante ?",
      verification: { type: "qcm", choix: ["Suffisante", "Nécessaire et suffisante", "Nécessaire"], bonne: 2 },
      dessin: biblio,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le fourgon",
      sorte: "piege",
      question: `Une entreprise de livraison affiche :<br>« Si un fourgon dépasse 3,5 tonnes, alors il faut le permis C. »<br>Yanis a le permis C.<br><br>Son fourgon dépasse-t-il <b>forcément</b> 3,5 tonnes ?`,
      reponse: `La phrase ne dit rien sur ceux qui ont le permis C.<br>« Si permis C, alors plus de 3,5 t » est la réciproque : elle est fausse.<br>Yanis peut conduire un petit fourgon.<br>Réponse : <span class="big">non</span>.`,
      consigne: "Son fourgon dépasse-t-il forcément 3,5 tonnes (oui ou non) ?",
      verification: { type: "courte", attendus: ["non"] },
      dessin: fourgon,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le contrôleur",
      sorte: "defi",
      question: `Dans le train, le demi-tarif est pour les moins de 12 ans et les plus de 65 ans.<br>Le contrôleur lit deux phrases :<br>① « Si un voyageur a moins de 12 ans, alors il paie demi-tarif. »<br>② « Si un voyageur paie demi-tarif, alors il a moins de 12 ans. »<br><br><b>Laquelle est fausse</b> : 1 ou 2 ?`,
      reponse: `La phrase ① est vraie : tous les moins de 12 ans paient demi-tarif.<br>Contre-exemple pour ② : une dame de 70 ans paie demi-tarif.<br>La phrase fausse est la <span class="big">2</span>.`,
      consigne: "Quelle phrase est fausse : 1 ou 2 ?",
      verification: { type: "courte", attendus: ["2", "②", "deux"] },
      dessin: controleur,
    },
  ],
};

export default problemes;
