// Énigmes à projeter — STMG (Tle), moyenne arithmétique et géométrique (la
// société de nettoyage, la boutique de vélos de course, la distillerie, le
// vérificateur d'extincteurs, piège du sauna, défi de l'agence de mannequins).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

/** Trois cases (dates en haut, valeurs dedans, « ? » au milieu), une règle et la question. */
const frise = (aria: string, dates: [string, string, string], a: string, b: string, regle: string, question: string, taille = 26) =>
  svg(aria,
    [40, 180, 320].map((x, k) => t(x + 60, 70, dates[k], C.pale, 22) +
      r(x, 90, 120, 80, k === 1 ? C.rose : C.bleu, 0.12, 3)).join("") +
    t(100, 142, a, C.bleu, taille) + t(240, 145, "?", C.rose, 34) + t(380, 142, b, C.bleu, taille) +
    l(160, 130, 180, 130, C.craie, 3) + l(300, 130, 320, 130, C.craie, 3) +
    r(40, 215, 400, 60, C.jaune, 0.12, 3) + t(240, 254, regle, C.craie, 23) +
    t(240, 370, question, C.rose, 27));

const nettoyage = frise("Société de nettoyage : 40 000 euros en 2024, 50 000 euros en 2026, suite arithmétique ; 2025 ?",
  ["2024", "2025", "2026"], `40${NB}000`, `50${NB}000`, "même somme ajoutée chaque année", `en 2025${NB}?`, 24);

const velos = frise("Vélos de course : 400 en janvier, 900 en mars, suite géométrique ; février ?",
  ["janvier", "février", "mars"], "400", "900", "même pourcentage chaque mois", `en février${NB}?`);

const distillerie = frise("Distillerie : 1 000 bouteilles en 2023, 1 210 en 2025, même pourcentage chaque année ; 2024 ?",
  ["2023", "2024", "2025"], `1${NB}000`, `1${NB}210`, "même pourcentage chaque année", `en 2024${NB}?`);

const extincteurs = frise("Extincteurs : 7 en mars, 15 en mai, même nombre en plus chaque mois ; avril ?",
  ["mars", "avril", "mai"], "7", "15", "même nombre en plus chaque mois", `en avril${NB}?`);

const sauna = frise("Sauna : 10 000 euros en 2024, 40 000 euros en 2026, même pourcentage chaque année ; 2025 ?",
  ["2024", "2025", "2026"], `10${NB}000`, `40${NB}000`, "même pourcentage chaque année", `en 2025${NB}?`, 24);

const mannequins = svg("Agence de mannequins : 2 000 abonnés en 2021, 162 000 en 2025, même pourcentage chaque année ; 2023 ?",
  [30, 114, 198, 282, 366].map((x, k) => t(x + 42, 70, String(2021 + k), C.pale, 20) +
    r(x, 90, 84, 70, k === 2 ? C.rose : C.bleu, 0.12, 3)).join("") +
    t(72, 133, `2${NB}000`, C.bleu, 19) + t(156, 133, "…", C.pale, 24) + t(240, 136, "?", C.rose, 32) +
    t(324, 133, "…", C.pale, 24) + t(408, 133, `162${NB}000`, C.bleu, 19) +
    r(40, 215, 400, 60, C.jaune, 0.12, 3) + t(240, 254, "même pourcentage chaque année", C.craie, 23) +
    t(240, 370, `en 2023${NB}?`, C.rose, 27));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "suite_moyennes",
  titre: "Énigmes des moyennes arithmétique et géométrique",
  description: "La société de nettoyage, la boutique de vélos de course, la distillerie, le vérificateur d'extincteurs, le piège du sauna, le défi de l'agence de mannequins : trouver le terme du milieu avec la moyenne arithmétique (suite arithmétique) ou la moyenne géométrique (suite géométrique).",
  problemes: [
    {
      tag: "Énigme 1 · La société de nettoyage",
      titre: "La moyenne arithmétique",
      question: `Une société de nettoyage fait 40 000 € de chiffre d'affaires en 2024 et 50 000 € en 2026.<br>Chaque année, elle gagne la même somme en plus.<br><br><b>Quel est son chiffre d'affaires</b> en 2025 ?`,
      reponse: `Suite arithmétique : le terme du milieu est la moyenne arithmétique.<br>(40 000 + 50 000) ÷ 2 = <span class="big">45 000 €</span>.`,
      consigne: "Quel est le chiffre d'affaires en 2025, en euros ?",
      verification: { type: "courte", attendus: ["45000", "45 000", "45000 €", "45 000 €"] },
      dessin: nettoyage,
    },
    {
      tag: "Énigme 2 · Les vélos de course",
      titre: "La moyenne géométrique",
      question: `Une boutique vend 400 vélos de course en janvier et 900 en mars.<br>Chaque mois, les ventes augmentent du même pourcentage.<br><br><b>Combien de vélos</b> en février ?`,
      reponse: `Suite géométrique : le terme du milieu est la moyenne géométrique.<br>√(400 × 900) = √360 000 = <span class="big">600</span> vélos.<br>Vérification : 400 × 1,5 = 600 et 600 × 1,5 = 900.`,
      consigne: "Combien de vélos en février ?",
      verification: { type: "qcm", choix: ["650", "600", "500"], bonne: 1 },
      dessin: velos,
    },
    {
      tag: "Énigme 3 · La distillerie",
      titre: "Intercaler un terme",
      question: `Une distillerie vend 1 000 bouteilles en 2023 et 1 210 en 2025.<br>Chaque année, les ventes augmentent du même pourcentage.<br><br><b>Combien de bouteilles</b> en 2024 ?`,
      reponse: `√(1 000 × 1 210) = √1 210 000 = <span class="big">1 100</span> bouteilles.<br>Vérification : 1 000 × 1,1 = 1 100 et 1 100 × 1,1 = 1 210 (+ 10 % par an).`,
      consigne: "Combien de bouteilles en 2024 ?",
      verification: { type: "qcm", choix: ["1 105", "1 200", "1 100"], bonne: 2 },
      dessin: distillerie,
    },
    {
      tag: "Énigme 4 · Le vérificateur d'extincteurs",
      titre: "Le terme du milieu",
      question: `Un vérificateur contrôle 7 extincteurs par jour en mars et 15 par jour en mai.<br>Chaque mois, il en contrôle le même nombre en plus.<br><br><b>Combien par jour</b> en avril ?`,
      reponse: `Même nombre en plus : suite arithmétique.<br>(7 + 15) ÷ 2 = <span class="big">11</span> extincteurs par jour.`,
      consigne: "Combien d'extincteurs par jour en avril ?",
      verification: { type: "qcm", choix: ["11", "10", "8"], bonne: 0 },
      dessin: extincteurs,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le sauna",
      sorte: "piege",
      question: `Un sauna fait 10 000 € de chiffre d'affaires en 2024 et 40 000 € en 2026.<br>Chaque année, il augmente du même pourcentage.<br>Le gérant dit : « en 2025, j'ai fait 25 000 € ».<br><br><b>Quel est le bon montant</b> en 2025 ?`,
      reponse: `25 000, c'est la moyenne arithmétique : elle sert pour une suite arithmétique.<br>Même pourcentage : on prend la moyenne géométrique.<br>√(10 000 × 40 000) = √400 000 000 = <span class="big">20 000 €</span>.<br>Vérification : × 2 chaque année.`,
      consigne: "Quel est le chiffre d'affaires en 2025, en euros ?",
      verification: { type: "courte", attendus: ["20000", "20 000", "20000 €", "20 000 €"] },
      dessin: sauna,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'agence de mannequins",
      sorte: "defi",
      question: `Une agence de mannequins a 2 000 abonnés sur son réseau en 2021 et 162 000 en 2025.<br>Chaque année, le nombre d'abonnés augmente du même pourcentage.<br><br><b>Combien d'abonnés</b> en 2023 ?`,
      reponse: `2023 est au milieu de 2021 et 2025 : on prend la moyenne géométrique.<br>√(2 000 × 162 000) = √324 000 000 = <span class="big">18 000</span> abonnés.<br>Vérification : × 3 chaque année : 2 000, 6 000, 18 000, 54 000, 162 000.`,
      consigne: "Combien d'abonnés en 2023 ?",
      verification: { type: "courte", attendus: ["18000", "18 000"] },
      dessin: mannequins,
    },
  ],
};

export default problemes;
