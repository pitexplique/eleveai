// Énigmes à projeter — STMG (Tle), loi binomiale : reconnaître (les bonbons
// piment de Saint-Pierre, la fabrique de seringues, le conseiller en
// énergie, le contrôleur aérien, piège de l'auditrice, défi de la jeune
// diplômée). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

/** Une carte : trois lignes (la première en grand) et la question. */
const carte = (aria: string, lignes: string[], question: string, coul: string = C.bleu) =>
  svg(aria,
    r(50, 40, 380, 240, coul, 0.1, 3, 14) +
    lignes.map((s, k) => t(240, 105 + k * 70, s, k ? C.pale : C.craie, k ? 24 : 32)).join("") +
    t(240, 365, question, C.rose, 28));

const piment = carte("Les bonbons piment : 10 clients, chacun achète avec une probabilité de 0,4",
  ["10 clients", "chacun achète : 40 %", "bonbons piment (974)"], `p${NB}=${NB}?`);

const seringues = carte("La fabrique de seringues : 50 seringues, 2 % défectueuses",
  ["50 seringues", "2 % défectueuses", "X = nombre de défectueuses"], `X suit B(n${NB};${NB}p)${NB}?`, C.jaune);

const energie = carte("Le conseiller en énergie : 3 rendez-vous, X égale 2 ventes",
  ["3 rendez-vous", "chaque fois : S ou E", "X = 2 ventes"], `combien de chemins${NB}?`);

const aerien = carte("Le contrôleur aérien : un vol est à l'heure avec une probabilité de 0,85",
  ["succès : à l'heure", "p = 0,85", "contrôleur aérien"], `échec${NB}:${NB}?`, C.jaune);

const audit = carte("L'auditrice : 2 dossiers tirés sans remise parmi 10, dont 3 en erreur",
  ["10 dossiers, 2 tirés", "3 en erreur · SANS remise", "X = nombre d'erreurs"], `binomiale${NB}?`);

const diplomee = carte("La jeune diplômée : 5 candidatures, succès ou échec",
  ["5 candidatures", "chaque fois : S ou E", "arbre complet"], `combien de chemins${NB}?`, C.jaune);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "va_binomiale_reconnaitre",
  titre: "Énigmes pour reconnaître une loi binomiale",
  description: "Les bonbons piment de Saint-Pierre, la fabrique de seringues, le conseiller en énergie, le contrôleur aérien, le piège de l'auditrice, le défi de la jeune diplômée : n épreuves identiques et indépendantes à deux issues, les paramètres (n ; p), les chemins de l'arbre, et le tirage sans remise qui n'est pas binomial.",
  problemes: [
    {
      tag: "Énigme 1 · Les bonbons piment",
      titre: "La probabilité du succès",
      question: `Au marché de Saint-Pierre, une vendeuse propose des bonbons piment.<br>10 clients passent, sans se connaître.<br>Chacun achète avec une probabilité de 40 %.<br>X = nombre d'acheteurs suit une loi binomiale.<br><br><b>Combien vaut p</b> ?`,
      reponse: `Le succès est « le client achète ».<br>Sa probabilité est <span class="big">p = 0,4</span>.<br>Et n = 10 clients.`,
      consigne: "Combien vaut p ?",
      verification: { type: "courte", attendus: ["0,4", "0.4", "40 %", "40%"] },
      dessin: piment,
    },
    {
      tag: "Énigme 2 · La fabrique de seringues",
      titre: "Les paramètres (n ; p)",
      question: `Une fabrique de seringues en contrôle 50 au hasard.<br>Le stock est très grand : on assimile à un tirage avec remise.<br>2 % des seringues sont défectueuses.<br>X = nombre de seringues défectueuses.<br><br><b>Quelle loi suit X</b> ?`,
      reponse: `n = 50 épreuves, succès = « défectueuse », p = 0,02.<br>X suit la loi <span class="big">B(50 ; 0,02)</span>.`,
      consigne: "Quelle loi suit X ?",
      verification: { type: "qcm", choix: ["B(50 ; 0,02)", "B(0,02 ; 50)", "B(50 ; 0,98)"], bonne: 0 },
      dessin: seringues,
    },
    {
      tag: "Énigme 3 · Le conseiller en énergie",
      titre: "L'évènement X = 2 sur l'arbre",
      question: `Un conseiller en énergie a 3 rendez-vous.<br>Chaque fois : vente (S) ou pas de vente (E).<br>X = nombre de ventes.<br><br><b>Combien de chemins de l'arbre donnent X = 2</b> ?`,
      reponse: `Deux S et un E : SSE, SES, ESS.<br>Il y a <span class="big">3</span> chemins.`,
      consigne: "Combien de chemins donnent X = 2 ?",
      verification: { type: "qcm", choix: ["2", "3", "6"], bonne: 1 },
      dessin: energie,
    },
    {
      tag: "Énigme 4 · Le contrôleur aérien",
      titre: "La probabilité de l'échec",
      question: `Un contrôleur aérien suit 20 vols.<br>Le succès est « le vol est à l'heure ».<br>Sa probabilité est p = 0,85.<br><br><b>Quelle est la probabilité d'un échec</b> ?`,
      reponse: `Échec = « le vol est en retard ».<br>Sa probabilité est 1 − 0,85 = <span class="big">0,15</span>.`,
      consigne: "Quelle est la probabilité d'un échec ?",
      verification: { type: "courte", attendus: ["0,15", "0.15", "15 %", "15%"] },
      dessin: aerien,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'auditrice",
      sorte: "piege",
      question: `Une auditrice a 10 dossiers. 3 contiennent une erreur.<br>Elle en tire 2, <b>sans remise</b>.<br>X = nombre de dossiers en erreur.<br>Un collègue dit : « X suit B(2 ; 0,3). »<br><br><b>X suit-il une loi binomiale</b> ?`,
      reponse: `Sans remise, la 2e probabilité change : 3 ÷ 10, puis 2 ÷ 9 ou 3 ÷ 9.<br>Les épreuves ne sont pas identiques et indépendantes.<br><span class="big">Non</span> : ce n'est pas une loi binomiale.`,
      consigne: "X suit-il une loi binomiale ?",
      verification: { type: "qcm", choix: ["oui, B(2 ; 0,3)", "oui, B(3 ; 0,2)", "non : sans remise"], bonne: 2 },
      dessin: audit,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La jeune diplômée",
      sorte: "defi",
      question: `Une jeune diplômée envoie 5 candidatures.<br>Chaque fois : entretien (S) ou refus (E).<br>On dessine l'arbre complet.<br><br><b>Combien de chemins a l'arbre</b> ?`,
      reponse: `Chaque niveau double le nombre de chemins.<br>2 × 2 × 2 × 2 × 2 = 2⁵ = <span class="big">32</span> chemins.`,
      consigne: "Combien de chemins a l'arbre ?",
      verification: { type: "courte", attendus: ["32"] },
      dessin: diplomee,
    },
  ],
};

export default problemes;
