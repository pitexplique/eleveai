// Énigmes à projeter — STMG (1re), notion évolutions successives et réciproque
// (l'abonnement au club de judo, le téléviseur, le prix du gaz, le parc
// d'attractions, piège du manteau, défi de la récolte de canne, 974). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, fleche } from "../dessins-ecole";

/** Des cases reliées par des flèches, chaque flèche avec son évolution au-dessus. */
const chaine = (titre: string, cases: string[], evos: string[], bas: string) => {
  const n = cases.length, w = n === 3 ? 120 : 90, pas = n === 3 ? 160 : 120, x0 = n === 3 ? 20 : 15;
  let s = t(240, 80, titre, C.jaune, 26);
  cases.forEach((c, i) => {
    s += r(x0 + i * pas, 170, w, 70, C.bleu, 0.15, 3, 10) + t(x0 + i * pas + w / 2, 214, c, C.craie, 24);
  });
  evos.forEach((e, i) => {
    const xa = x0 + i * pas + w + 5, xb = x0 + (i + 1) * pas - 5;
    s += fleche(xa, 205, xb, 205, C.rose, 3) + t((xa + xb) / 2, 150, e, C.rose, 22);
  });
  return s + t(240, 340, bas, C.rose, 28);
};

const judo = svg("L'abonnement au club de judo : plus 10 % en 2025, plus 10 % en 2026",
  chaine("l'abonnement au club de judo", ["2024", "2025", "2026"], ["+ 10 %", "+ 10 %"], `de 2024 à 2026 :${NB}?`));

const televiseur = svg("Le téléviseur : moins 20 %, puis encore moins 10 %",
  chaine("le téléviseur", ["prix", "soldes", "fin"], ["− 20 %", "− 10 %"], `baisse totale :${NB}?`));

const gaz = svg("Le prix du gaz : plus 25 % de janvier à juin, puis quelle baisse pour revenir au prix de janvier ?",
  chaine("le prix du gaz", ["janvier", "juin", "janvier"], ["+ 25 %", "?"], `quelle baisse${NB}?`));

const parc = svg("Le parc d'attractions : visiteurs plus 50 % en 2025, puis moins 20 % en 2026",
  chaine("les visiteurs du parc", ["2024", "2025", "2026"], ["+ 50 %", "− 20 %"], `de 2024 à 2026 :${NB}?`));

const manteau = svg("Le manteau à 100 € : moins 10 %, puis plus 10 %",
  chaine("le manteau", ["100 €", "?", "?"], ["− 10 %", "+ 10 %"], `prix final :${NB}?`));

const canne = svg("La récolte de canne à sucre : moins 10 % trois années de suite, de 2022 à 2025",
  chaine("la récolte de canne à sucre", ["2022", "2023", "2024", "2025"], ["− 10 %", "− 10 %", "− 10 %"], `baisse totale :${NB}?`));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_evo_enchainees",
  titre: "Énigmes d'évolutions successives",
  description: "L'abonnement au club de judo, le téléviseur, le prix du gaz, le parc d'attractions, le piège du manteau, le défi de la récolte de canne : enchaîner des coefficients, taux global, taux réciproque, une baisse puis une hausse.",
  problemes: [
    {
      tag: "Énigme 1 · Le club de judo",
      titre: "Deux hausses",
      question: `L'abonnement au club de judo augmente de 10 % en 2025, puis encore de 10 % en 2026.<br><br><b>De combien a-t-il augmenté</b> en tout, de 2024 à 2026 ?`,
      reponse: `On enchaîne les coefficients : 1,1 × 1,1 = 1,21.<br>Hausse totale : <span class="big">+ 21 %</span>, pas 20 % : la 2e hausse s'applique à un prix déjà augmenté.`,
      consigne: "Deux hausses de 10 % de suite. Quelle est la hausse totale ?",
      verification: { type: "qcm", choix: ["+ 21 %", "+ 20 %", "+ 11 %"], bonne: 0 },
      dessin: judo,
    },
    {
      tag: "Énigme 2 · Le téléviseur",
      titre: "Deux baisses",
      question: `Un téléviseur est soldé à − 20 %. En fin de soldes, son prix baisse encore de 10 %.<br><br><b>Quelle est la baisse totale</b>, en pourcentage ?`,
      reponse: `0,8 × 0,9 = 0,72.<br>Le prix final vaut 72 % du prix de départ : <span class="big">− 28 %</span>, et non − 30 %.`,
      consigne: "Une baisse de 20 % puis une baisse de 10 %. Quelle est la baisse totale en % ?",
      verification: { type: "courte", attendus: ["-28", "−28", "28", "-28%", "−28%"], unite: "%" },
      dessin: televiseur,
    },
    {
      tag: "Énigme 3 · Le prix du gaz",
      titre: "Revenir au départ",
      question: `De janvier à juin, le prix du gaz a augmenté de 25 %.<br><br><b>De quel pourcentage doit-il baisser</b> pour revenir au prix de janvier ?`,
      reponse: `Il faut un coefficient k avec 1,25 × k = 1.<br>k = 1 ÷ 1,25 = 0,8, soit <span class="big">− 20 %</span>.<br>Exemple : 100 € → 125 € → 125 × 0,8 = 100 €.`,
      consigne: "Après une hausse de 25 %, quelle baisse ramène au prix de départ ?",
      verification: { type: "qcm", choix: ["− 25 %", "− 20 %", "− 75 %"], bonne: 1 },
      dessin: gaz,
    },
    {
      tag: "Énigme 4 · Le parc d'attractions",
      titre: "Une hausse, puis une baisse",
      question: `En 2025, le nombre de visiteurs d'un parc d'attractions a augmenté de 50 %. En 2026, il a baissé de 20 %.<br><br><b>Quelle est l'évolution totale</b> de 2024 à 2026, en pourcentage ?`,
      reponse: `1,5 × 0,8 = 1,2.<br>Évolution totale : <span class="big">+ 20 %</span>.<br>Ce n'est pas 50 − 20 = 30 % : on multiplie les coefficients.`,
      consigne: "+ 50 % puis − 20 %. Quelle est l'évolution totale en % ?",
      verification: { type: "courte", attendus: ["20", "+20", "20%", "+20%"], unite: "%" },
      dessin: parc,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le manteau",
      sorte: "piege",
      question: `Un manteau coûte 100 €. Son prix baisse de 10 %, puis remonte de 10 %.<br>Sami : « On revient à 100 €, c'est évident. »<br><br><b>Quel est le prix final</b> ?`,
      reponse: `100 × 0,9 = 90 €, puis 90 × 1,1 = <span class="big">99 €</span>.<br>La hausse de 10 % porte sur 90 €, plus petit que 100 € : elle rapporte seulement 9 €.`,
      consigne: "100 €, puis − 10 %, puis + 10 %. Quel est le prix final ?",
      verification: { type: "qcm", choix: ["100 €", "101 €", "99 €"], bonne: 2 },
      dessin: manteau,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La récolte de canne",
      sorte: "defi",
      question: `À La Réunion, un planteur voit sa récolte de canne à sucre baisser de 10 % trois années de suite, de 2022 à 2025.<br><br><b>Quelle est la baisse totale</b>, en pourcentage ?`,
      reponse: `0,9 × 0,9 × 0,9 = 0,729.<br>La récolte vaut 72,9 % de celle de 2022 : <span class="big">− 27,1 %</span>, et non − 30 %.`,
      consigne: "Trois baisses de 10 % de suite. Quelle est la baisse totale en % ?",
      verification: { type: "courte", attendus: ["-27,1", "−27,1", "27,1", "-27.1", "27.1"], unite: "%" },
      dessin: canne,
    },
  ],
};

export default problemes;
