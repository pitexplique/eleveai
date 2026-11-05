// ─── Fiche d'exercices : modéliser par une suite (STMG) — 20 exercices ─────────
//
// Notion suite_modeliser du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/suites-premiere.bank.ts`). Année de
// PREMIÈRE : le terme général en fonction de n est en terminale. On travaille
// donc avec u(0) et la relation entre u(n) et u(n+1), de proche en proche. Le
// coach demande : croissance linéaire ou exponentielle, premier terme et relation,
// le rang d'une année, le capital à intérêts composés (et simples), la phrase de
// conclusion. Une seule puissance (ex. 17) : elle est donnée dans l'énoncé, comme
// le fait le coach pour ses placements sur 15 à 25 ans.
//
// ⭐ Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : voile (club), glacier (glaciologue), biologie et vélo
// (laborantine, service voirie), deux calculs nus (ex. 4), médiathèque
// (bibliothécaire), éolien (technicien), banque (conseillère), musée (médiatrice),
// sport (gérant de salle), énergie solaire (élue), santé (pharmacien), banque
// (Noé), finance d'une coopérative, ornithologie (ornithologue), RH (responsable),
// agriculture bio (ingénieure), épargne (Lina), tramway (technicienne), coopérative
// agricole (trésorier), auto-école (gérante).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-suites-2.mjs`.
//
// Micro-compétences : suite_mod_reconnaitre (1, 2, 3, 11, 14, 17, 18),
// suite_mod_choisir (4, 5, 6, 9, 10, 11, 15, 16, 18, 20), suite_mod_capital (7, 12,
// 13, 17, 19), suite_mod_conclure (8, 9, 10, 15, 18, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

// Les écritures qu'un élève tape vraiment : le correcteur compare ces mots au texte.
const ARITH = ["arithmétique", "arithmétiques", "suite arithmétique", "la suite arithmétique", "une suite arithmétique", "l'arithmétique"];
const GEO = ["géométrique", "géométriques", "suite géométrique", "la suite géométrique", "une suite géométrique", "la géométrique"];
// La relation entière : le « + » de u(n+1) empêche d'enlever le membre de gauche, d'où les formes écrites.
const relationAjout = (r: string) => [`u(n) + ${r}`, `u(n+1) = u(n) + ${r}`, `u(n+1) = ${r} + u(n)`];
const relationCoef = (q: string) => [`${q} × u(n)`, `u(n+1) = ${q} × u(n)`, `u(n+1) = u(n) × ${q}`, `u(n+1) = ${q}u(n)`, `u(n+1) = ${q}*u(n)`, `u(n+1) = u(n)*${q}`];

export const exercicesSuiteModeliserStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "suite-modeliser",
  titre: "Modéliser par une suite",
  accroche:
    "Vingt exercices pour passer d'une situation à une suite : on ajoute ou on multiplie ? quel premier terme, quelle relation, quel rang pour telle année ? Un glacier, un tramway, une salle de sport, une voiture d'auto-école, un capital à intérêts composés, et la phrase de conclusion qui répond vraiment à la question. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : reconnaître le modèle, écrire le coefficient, trouver un rang, ou choisir la bonne conclusion.",
      rappel: [
        "On ajoute toujours la même quantité : croissance linéaire, le modèle est une suite arithmétique.",
        "On multiplie toujours par le même coefficient (un pourcentage, un doublement) : croissance exponentielle, le modèle est une suite géométrique.",
        "Modéliser, c'est donner $u(0)$ et la relation entre $u(n)$ et $u(n+1)$. Une hausse de 6 % donne le coefficient 1,06 ; une baisse de 6 % donne 0,94.",
        "Une conclusion dit quand, combien, et dans quelle unité.",
      ],
      exercices: [
        {
          enonce:
            "Un club de voile gagne 15 adhérents chaque année. Quel modèle convient ? Réponds arithmétique ou géométrique.",
          reponses: [{ attendu: ARITH }],
          correction:
            "L'énoncé donne une quantité fixe : 15 adhérents.\nOn ajoute toujours le même nombre, c'est une croissance linéaire.\nLe modèle est une suite arithmétique.\n⛔ Le piège : voir « chaque année » et penser géométrique. Ce mot dit le rythme, pas le type d'évolution.\nRéponse : arithmétique.",
          micros: ["suite_mod_reconnaitre"],
        },
        {
          enonce:
            "Selon un modèle, un petit glacier perd 4 % de son volume chaque année. Quel modèle convient ? Réponds arithmétique ou géométrique.",
          reponses: [{ attendu: GEO }],
          correction:
            "L'énoncé donne un pourcentage : 4 % du volume de l'année.\nPerdre 4 %, c'est multiplier chaque année par 0,96.\nOn multiplie toujours par le même coefficient : le modèle est une suite géométrique.\n⛔ Le piège : croire qu'on enlève la même quantité chaque année. 4 % d'un volume plus petit, c'est moins de glace.\nRéponse : géométrique.",
          micros: ["suite_mod_reconnaitre"],
        },
        {
          enonce:
            "Réponds arithmétique ou géométrique.\na) Dans un labo, le nombre de bactéries double toutes les heures.\nb) Le compteur d'une piste cyclable ajoute 300 passages par jour.",
          reponses: [
            { question: "a)", attendu: GEO },
            { question: "b)", attendu: ARITH },
          ],
          correction:
            "a) Doubler, c'est multiplier par 2 : toujours le même coefficient. Suite géométrique.\nb) On ajoute toujours 300 : suite arithmétique.\n⛔ Le piège au a) : chercher un pourcentage pour dire « géométrique ». « Double » suffit : c'est une multiplication.\nRéponse : a) géométrique ; b) arithmétique.",
          micros: ["suite_mod_reconnaitre"],
        },
        {
          enonce:
            "Écris le coefficient multiplicateur.\na) Une hausse de 8 %.\nb) Une baisse de 30 %.",
          reponses: [
            { question: "a)", attendu: "1,08" },
            { question: "b)", attendu: "0,7" },
          ],
          correction:
            "a) Hausse : $1 + 8 \\div 100 = 1{,}08$.\nb) Baisse : $1 - 30 \\div 100 = 0{,}7$.\n⛔ Le piège au b) : écrire 0,3. Multiplier par 0,3, c'est garder 30 %, donc perdre 70 %.\nRéponse : a) 1,08 ; b) 0,7.",
          micros: ["suite_mod_choisir"],
        },
        {
          enonce:
            "Une médiathèque prête 400 livres en 2024, puis 25 de plus chaque année. On note $u(n)$ le nombre de prêts pour l'année $2024 + n$.\na) Que vaut $u(0)$ ?\nb) Complète : $u(n+1) = \\dots$",
          reponses: [
            { question: "a)", attendu: "400" },
            { question: "b)", attendu: relationAjout("25") },
          ],
          correction:
            "a) $u(0)$ est la valeur de 2024 : $u(0) = 400$.\nb) Chaque année, on ajoute 25 : $u(n+1) = u(n) + 25$.\n⛔ Le piège au a) : écrire $u(1) = 400$. L'année de départ correspond au rang 0.\nRéponse : a) 400 ; b) $u(n) + 25$.",
          micros: ["suite_mod_choisir"],
        },
        {
          enonce:
            "On note $u(n)$ la production d'un parc éolien pour l'année $2022 + n$. Quel rang $n$ faut-il prendre pour l'année 2029 ?",
          reponses: [{ attendu: "7" }],
          correction:
            "Le rang compte les années écoulées depuis celle de $u(0)$, ici 2022.\n$2029 - 2022 = 7$.\n⛔ Le piège : compter 8, en disant « de 2022 à 2029 inclus, il y a 8 années ». 2022 est le départ, pas une première évolution.\nRéponse : $n = 7$.",
          micros: ["suite_mod_choisir"],
        },
        {
          enonce:
            "Une conseillère place 1 000 € à 5 % d'intérêts composés par an.\na) Par quel coefficient le capital est-il multiplié chaque année ?\nb) Que vaut le capital au bout d'un an ?",
          reponses: [
            { question: "a)", attendu: "1,05" },
            { question: "b)", attendu: "1 050 €" },
          ],
          correction:
            "a) Une hausse de 5 % donne le coefficient 1,05.\nb) $1\\,000 \\times 1{,}05 = 1\\,050$ €.\n⛔ Le piège au a) : prendre 0,05. Multiplier par 0,05 donne seulement les intérêts, sans le capital.\nRéponse : a) 1,05 ; b) 1 050 €.",
          micros: ["suite_mod_capital"],
        },
        {
          enonce:
            "Une médiatrice modélise la fréquentation d'un musée. Elle obtient $u(5) \\approx 3\\,120$ visiteurs, avec $u(0)$ pour l'année 2023. Quelle conclusion est correcte ? Réponds par la lettre.\nA : Au bout de 2028 ans, le musée accueillera environ 3 120 visiteurs.\nB : Au bout de 5 ans, soit en 2028, le musée accueillera environ 3 120 visiteurs.\nC : Le musée accueillera environ 3 120 visiteurs.",
          reponses: [{ attendu: "B" }],
          correction:
            "Le rang 5 correspond à l'année $2023 + 5 = 2028$.\nB dit quand (5 ans, 2028), combien (environ 3 120) et l'unité (visiteurs).\nA confond l'année et la durée. C oublie de dire quand.\n⛔ Le piège : choisir C parce que le nombre est juste. Une prévision sans date ne répond à rien.\nRéponse : B.",
          micros: ["suite_mod_conclure"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire, plusieurs questions : choisir le modèle, écrire la relation, calculer de proche en proche.",
      rappel: [
        "Arithmétique : $u(n+1) = u(n) + r$. Géométrique : $u(n+1) = q \\times u(n)$.",
        "Le rang d'une année : année cherchée moins année de $u(0)$. On calcule ensuite terme après terme.",
        "Intérêts simples : le pourcentage porte toujours sur le capital de départ, la même somme s'ajoute chaque année.",
        "Intérêts composés : le pourcentage porte sur le capital déjà augmenté, on multiplie chaque année par le même coefficient.",
      ],
      exercices: [
        {
          enonce:
            "Le gérant d'une salle de sport compte 850 abonnés en 2024 et en gagne 40 par an (modèle). On note $u(n)$ le nombre d'abonnés pour l'année $2024 + n$.\na) Quelle est la raison de cette suite arithmétique ?\nb) Complète : $u(n+1) = \\dots$\nc) Quel rang correspond à 2027 ?\nd) Combien d'abonnés le modèle prévoit-il en 2027 ?",
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b)", attendu: relationAjout("40") },
            { question: "c)", attendu: "3" },
            { question: "d)", attendu: "970" },
          ],
          correction:
            "a) On ajoute 40 chaque année : la raison est 40.\nb) $u(n+1) = u(n) + 40$.\nc) $2027 - 2024 = 3$.\nd) De proche en proche : $u(1) = 890$, $u(2) = 930$, $u(3) = 970$.\nConclusion : en 2027, la salle compterait environ 970 abonnés.\n⛔ Le piège au d) : s'arrêter à $u(2)$ en comptant 2025 comme rang 0.\nRéponse : a) 40 ; b) $u(n) + 40$ ; c) 3 ; d) 970 abonnés.",
          micros: ["suite_mod_choisir", "suite_mod_conclure"],
        },
        {
          enonce:
            "Une élue suit la production solaire de sa commune : 2 000 MWh en 2023, puis une hausse de 10 % par an (modèle). On note $u(n)$ la production pour l'année $2023 + n$.\na) Complète : $u(n+1) = \\dots$\nb) Calcule $u(1)$, $u(2)$ et $u(3)$, dans cet ordre, séparés par un point-virgule.\nc) Quelle année correspond à $u(3)$ ?",
          reponses: [
            { question: "a)", attendu: relationCoef("1,1") },
            { question: "b)", attendu: "2 200 ; 2 420 ; 2 662", ordre: true },
            { question: "c)", attendu: "2026" },
          ],
          correction:
            "a) Une hausse de 10 % donne le coefficient 1,1 : $u(n+1) = 1{,}1 \\times u(n)$.\nb) $2\\,000 \\times 1{,}1 = 2\\,200$ ; $2\\,200 \\times 1{,}1 = 2\\,420$ ; $2\\,420 \\times 1{,}1 = 2\\,662$.\nc) $2023 + 3 = 2026$.\nConclusion : en 2026, la commune produirait environ 2 662 MWh.\n⛔ Le piège au b) : ajouter 200 à chaque fois. 10 % se calcule sur la valeur de l'année, qui grandit.\nRéponse : a) $1{,}1 \\times u(n)$ ; b) 2 200 ; 2 420 ; 2 662 ; c) 2026.",
          micros: ["suite_mod_choisir", "suite_mod_conclure"],
        },
        {
          enonce:
            "Un pharmacien explique à un stagiaire le modèle suivant : la concentration d'un médicament vaut 80 mg/L à l'injection, puis baisse de 25 % par heure. On note $u(n)$ la concentration au bout de $n$ heures.\na) Ce modèle est-il arithmétique ou géométrique ?\nb) Complète : $u(n+1) = \\dots$\nc) Calcule $u(3)$.",
          reponses: [
            { question: "a)", attendu: GEO },
            { question: "b)", attendu: relationCoef("0,75") },
            { question: "c)", attendu: "33,75" },
          ],
          correction:
            "a) Un pourcentage : on multiplie toujours par le même coefficient. Suite géométrique.\nb) Une baisse de 25 % donne le coefficient 0,75 : $u(n+1) = 0{,}75 \\times u(n)$.\nc) $u(1) = 80 \\times 0{,}75 = 60$ ; $u(2) = 60 \\times 0{,}75 = 45$ ; $u(3) = 45 \\times 0{,}75 = 33{,}75$.\n⛔ Le piège au c) : enlever 20 mg/L à chaque heure, ce qui donne 20. Les 25 % portent sur la concentration de l'heure.\nRéponse : a) géométrique ; b) $0{,}75 \\times u(n)$ ; c) 33,75 mg/L.",
          micros: ["suite_mod_reconnaitre", "suite_mod_choisir"],
        },
        {
          enonce:
            "Noé place 2 000 € à 4 % d'intérêts composés par an. On note $u(n)$ le capital au bout de $n$ années.\na) Calcule $u(1)$.\nb) Calcule $u(2)$.\nc) Calcule $u(3)$, au centime près.",
          reponses: [
            { question: "a)", attendu: "2 080 €" },
            { question: "b)", attendu: "2 163,20 €" },
            { question: "c)", attendu: "2 249,73 €", tolerance: 0.005 },
          ],
          correction:
            "On multiplie chaque année par 1,04, sur le capital déjà augmenté.\na) $2\\,000 \\times 1{,}04 = 2\\,080$ €.\nb) $2\\,080 \\times 1{,}04 = 2\\,163{,}20$ €.\nc) $2\\,163{,}20 \\times 1{,}04 = 2\\,249{,}728$, soit $2\\,249{,}73$ € au centime près.\n⛔ Le piège : ajouter 80 € par an, ce qui donne 2 240 €. Ce sont des intérêts simples, pas composés.\nRéponse : a) 2 080 € ; b) 2 163,20 € ; c) 2 249,73 €.",
          micros: ["suite_mod_capital"],
        },
        {
          enonce:
            "Une coopérative place 5 000 € à 10 % par an pendant 3 ans.\na) Quel est le capital final à intérêts simples ?\nb) Quel est le capital final à intérêts composés ?\nc) De combien les intérêts composés rapportent-ils de plus ?",
          reponses: [
            { question: "a)", attendu: "6 500 €" },
            { question: "b)", attendu: "6 655 €" },
            { question: "c)", attendu: "155 €" },
          ],
          correction:
            "a) Intérêts simples : 10 % de 5 000 €, soit 500 € chaque année. $5\\,000 + 3 \\times 500 = 6\\,500$ €.\nb) Intérêts composés : $5\\,000 \\times 1{,}1 = 5\\,500$ ; $5\\,500 \\times 1{,}1 = 6\\,050$ ; $6\\,050 \\times 1{,}1 = 6\\,655$ €.\nc) $6\\,655 - 6\\,500 = 155$ €.\n⛔ Le piège : croire que les deux donnent le même montant. En composés, les intérêts rapportent à leur tour.\nRéponse : a) 6 500 € ; b) 6 655 € ; c) 155 €.",
          micros: ["suite_mod_capital"],
        },
        {
          enonce:
            "Un ornithologue compte les couples de cigognes sur deux sites, année après année (situation fictive).\na) Le site A suit-il un modèle arithmétique ou géométrique ?\nb) Quelle est sa raison ?\nc) Le site B suit-il un modèle arithmétique ou géométrique ?\nd) Quelle est sa raison ?",
          figure: grille(["Année", "Site A", "Site B"], [
            [0, 160, 160],
            [1, 190, 240],
            [2, 220, 360],
            [3, 250, 540],
          ]),
          reponses: [
            { question: "a)", attendu: ARITH },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: GEO },
            { question: "d)", attendu: "1,5" },
          ],
          correction:
            "a) et b) Site A : $190 - 160 = 30$, $220 - 190 = 30$, $250 - 220 = 30$. On ajoute toujours 30 : suite arithmétique de raison 30.\nc) et d) Site B : $240 \\div 160 = 1{,}5$, $360 \\div 240 = 1{,}5$, $540 \\div 360 = 1{,}5$. On multiplie toujours par 1,5 : suite géométrique de raison 1,5.\n⛔ Le piège : s'arrêter au premier écart. Il faut vérifier sur plusieurs années : le site B a un écart de 80, puis de 120.\nRéponse : a) arithmétique ; b) 30 ; c) géométrique ; d) 1,5.",
          micros: ["suite_mod_reconnaitre"],
        },
        {
          enonce:
            "Une responsable RH compte 120 salariés en 2024 et prévoit 15 embauches nettes par an (modèle). On note $u(n)$ l'effectif pour l'année $2024 + n$.\na) Quel rang correspond à 2030 ?\nb) Quel effectif le modèle prévoit-il en 2030 ?\nc) Quelle conclusion est correcte ? Les … sont tes résultats. Réponds par la lettre.\nA : Au bout de 2030 ans, l'effectif atteindra … salariés.\nB : L'effectif atteindra … .\nC : En 2030, soit au bout de … ans, l'entreprise compterait … salariés.",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "210" },
            { question: "c)", attendu: "C" },
          ],
          correction:
            "a) $2030 - 2024 = 6$.\nb) On ajoute 15 six fois : 135, 150, 165, 180, 195, 210.\nc) C dit quand, combien et dans quelle unité. A prend l'année pour une durée. B ne dit ni quand, ni de quoi on parle.\n⛔ Le piège au a) : prendre $n = 2030$. Le rang n'est pas une année, c'est un nombre de pas depuis 2024.\nRéponse : a) 6 ; b) 210 ; c) C.",
          micros: ["suite_mod_choisir", "suite_mod_conclure"],
        },
        {
          enonce:
            "Une ingénieure agronome suit les surfaces en bio d'un département : 1 500 hectares en 2022, puis une hausse de 20 % par an (modèle). On note $u(n)$ la surface pour l'année $2022 + n$.\na) Complète : $u(n+1) = \\dots$\nb) Quel rang correspond à 2025 ?\nc) Calcule $u(1)$, $u(2)$ et $u(3)$, dans cet ordre, séparés par un point-virgule.",
          reponses: [
            { question: "a)", attendu: relationCoef("1,2") },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "1 800 ; 2 160 ; 2 592", ordre: true },
          ],
          correction:
            "a) Une hausse de 20 % donne le coefficient 1,2 : $u(n+1) = 1{,}2 \\times u(n)$.\nb) $2025 - 2022 = 3$.\nc) $1\\,500 \\times 1{,}2 = 1\\,800$ ; $1\\,800 \\times 1{,}2 = 2\\,160$ ; $2\\,160 \\times 1{,}2 = 2\\,592$.\n⛔ Le piège au a) : écrire $u(n+1) = u(n) + 20$. Un pourcentage se traduit par un coefficient, pas par une addition.\nRéponse : a) $1{,}2 \\times u(n)$ ; b) 3 ; c) 1 800 ; 2 160 ; 2 592.",
          micros: ["suite_mod_choisir"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on choisit le modèle, on calcule, puis on répond à la question posée.",
      rappel: [
        "Un versement fixe fait une suite arithmétique ; un pourcentage fait une suite géométrique, dont l'ajout grandit chaque année.",
        "Le versement fixe peut partir devant et se faire rattraper : on compare à l'échéance, pas la première année.",
        "On termine par une phrase : quand, combien, quelle unité. Le mot « environ » y a sa place, un modèle estime.",
      ],
      exercices: [
        {
          titre: "Les deux placements de Lina",
          enonce:
            "Lina dispose de 2 000 €. Le placement F ajoute 120 € chaque année. Le placement P augmente de 5 % chaque année. À la calculatrice, multiplier 20 fois par 1,05 revient à multiplier par $1{,}05^{20} \\approx 2{,}6533$.\na) Combien chaque placement rapporte-t-il la première année ? Donne F puis P, séparés par un point-virgule.\nb) Que vaut le placement F au bout de 20 ans ?\nc) Que vaut le placement P au bout de 20 ans, à l'euro près ?\nd) Lequel a le plus rapporté au bout de 20 ans ? Écris F ou P.",
          reponses: [
            { question: "a)", attendu: "120 ; 100", ordre: true },
            { question: "b)", attendu: "4 400 €" },
            { question: "c)", attendu: "5 307 €", tolerance: 0.5 },
            { question: "d)", attendu: "P" },
          ],
          correction:
            "a) F rapporte 120 €. P rapporte 5 % de 2 000 €, soit $2\\,000 \\times 0{,}05 = 100$ €.\nb) Suite arithmétique : $2\\,000 + 20 \\times 120 = 4\\,400$ €.\nc) Suite géométrique : $2\\,000 \\times 2{,}6533 = 5\\,306{,}6$, soit environ $5\\,307$ €.\nd) 5 307 € est plus que 4 400 € : P a le plus rapporté.\n⛔ Le piège : juger sur la première année, où F est devant. Le pourcentage porte chaque année sur un montant plus gros.\nRéponse : a) 120 ; 100 ; b) 4 400 € ; c) 5 307 € ; d) P.",
          micros: ["suite_mod_reconnaitre", "suite_mod_capital"],
        },
        {
          titre: "Le tramway",
          enonce:
            "Une technicienne prépare deux scénarios pour un tramway de 12 000 voyageurs par jour en 2025 (modèles). Scénario A : 700 voyageurs de plus chaque année. Scénario B : 5 % de plus chaque année.\na) Le scénario A est-il arithmétique ou géométrique ?\nb) Quel est le coefficient du scénario B ?\nc) Quel rang correspond à 2028 ?\nd) Combien de voyageurs le scénario A prévoit-il en 2028 ?\ne) Combien de voyageurs le scénario B prévoit-il en 2028, à l'unité près ?\nf) Quel scénario prévoit le plus de voyageurs en 2028 ? Écris A ou B.",
          reponses: [
            { question: "a)", attendu: ARITH },
            { question: "b)", attendu: "1,05" },
            { question: "c)", attendu: "3" },
            { question: "d)", attendu: "14 100" },
            { question: "e)", attendu: "13 892", tolerance: 0.5 },
            { question: "f)", attendu: "A" },
          ],
          correction:
            "a) On ajoute 700 : suite arithmétique.\nb) Une hausse de 5 % donne le coefficient 1,05.\nc) $2028 - 2025 = 3$.\nd) $12\\,000 + 3 \\times 700 = 14\\,100$ voyageurs.\ne) $12\\,000 \\times 1{,}05 = 12\\,600$ ; $12\\,600 \\times 1{,}05 = 13\\,230$ ; $13\\,230 \\times 1{,}05 = 13\\,891{,}5$, soit environ $13\\,892$ voyageurs.\nf) En 2028, A prévoit plus que B.\n⛔ Le piège au f) : répondre B, parce qu'on a entendu qu'un pourcentage « gagne toujours ». Sur 3 ans, 5 % de 12 000, c'est 600 par an au départ : A reste devant.\nRéponse : a) arithmétique ; b) 1,05 ; c) 3 ; d) 14 100 ; e) 13 892 ; f) A.",
          micros: ["suite_mod_reconnaitre", "suite_mod_choisir", "suite_mod_conclure"],
        },
        {
          titre: "Le capital de la coopérative",
          enonce:
            "Le trésorier d'une coopérative agricole place 4 000 € à 10 % par an pendant 4 ans.\na) Quel serait le capital final à intérêts simples ?\nb) Calcule le capital à intérêts composés au bout de 1, 2, 3 et 4 ans, dans cet ordre, séparés par un point-virgule.\nc) Quel écart y a-t-il entre les deux capitaux finaux ?\nd) Quel mode de calcul donne une suite géométrique ? Écris simples ou composés.",
          reponses: [
            { question: "a)", attendu: "5 600 €" },
            { question: "b)", attendu: "4 400 ; 4 840 ; 5 324 ; 5 856,4", ordre: true },
            { question: "c)", attendu: "256,40 €" },
            { question: "d)", attendu: ["composés", "composé", "intérêts composés", "les composés", "les intérêts composés"] },
          ],
          correction:
            "a) Chaque année, 10 % de 4 000 €, soit 400 €. $4\\,000 + 4 \\times 400 = 5\\,600$ €.\nb) On multiplie par 1,1 : $4\\,000 \\times 1{,}1 = 4\\,400$ ; $4\\,400 \\times 1{,}1 = 4\\,840$ ; $4\\,840 \\times 1{,}1 = 5\\,324$ ; $5\\,324 \\times 1{,}1 = 5\\,856{,}4$.\nc) $5\\,856{,}40 - 5\\,600 = 256{,}40$ €.\nd) En composés, on multiplie toujours par 1,1 : suite géométrique. En simples, on ajoute toujours 400 : suite arithmétique.\n⛔ Le piège au c) : croire que l'écart vient d'une erreur de calcul. Il vient des intérêts qui rapportent à leur tour.\nRéponse : a) 5 600 € ; b) 4 400 ; 4 840 ; 5 324 ; 5 856,4 ; c) 256,40 € ; d) composés.",
          micros: ["suite_mod_capital"],
        },
        {
          titre: "La voiture de l'auto-école",
          enonce:
            "La gérante d'une auto-école achète une voiture 20 000 € en 2024. Sa valeur baisse de 18 % par an (modèle). On note $u(n)$ sa valeur pour l'année $2024 + n$.\na) Complète : $u(n+1) = \\dots$\nb) Calcule $u(1)$ et $u(2)$, dans cet ordre, séparés par un point-virgule.\nc) Calcule $u(3)$, à l'euro près.\nd) Quelle conclusion est correcte ? Les … sont tes résultats. Réponds par la lettre.\nA : Au bout de … ans, soit en 2027, la voiture vaudrait environ … €.\nB : Au bout de 2027 ans, la voiture vaudrait environ … €.\nC : En 2027, la voiture vaudrait environ … .",
          reponses: [
            { question: "a)", attendu: relationCoef("0,82") },
            { question: "b)", attendu: "16 400 ; 13 448", ordre: true },
            { question: "c)", attendu: "11 027 €", tolerance: 0.5 },
            { question: "d)", attendu: "A" },
          ],
          correction:
            "a) Une baisse de 18 % donne le coefficient $1 - 0{,}18 = 0{,}82$ : $u(n+1) = 0{,}82 \\times u(n)$.\nb) $20\\,000 \\times 0{,}82 = 16\\,400$ ; $16\\,400 \\times 0{,}82 = 13\\,448$.\nc) $13\\,448 \\times 0{,}82 = 11\\,027{,}36$, soit environ $11\\,027$ €.\nd) A dit quand, combien, et l'unité. B prend l'année pour une durée. C oublie l'unité.\n⛔ Le piège au a) : écrire 0,18. Multiplier par 0,18, c'est ne garder que 18 % de la valeur.\nRéponse : a) $0{,}82 \\times u(n)$ ; b) 16 400 ; 13 448 ; c) 11 027 € ; d) A.",
          micros: ["suite_mod_choisir", "suite_mod_conclure"],
        },
      ],
    },
  ],
};
