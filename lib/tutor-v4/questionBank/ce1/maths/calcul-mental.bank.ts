// lib/tutor-v4/questionBank/ce1/maths/calcul-mental.bank.ts
//
// Le calcul mental du CE1, écrit à la main. C'est la partie du programme la
// plus détaillée : le texte nomme chaque procédure, une par une, et donne
// jusqu'à la trace écrite sur l'ardoise.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2). Trois
// familles :
//   MÉMORISER — tables d'addition et de multiplication dans les deux sens ;
//     faits multiplicatifs usuels : doubles jusqu'à 15, doubles de 20, 25, 30,
//     35, 40, 45, 50, doubles de 100 à 500, moitiés des nombres pairs jusqu'à
//     30, moitiés des dizaines et des centaines entières, multiples de 25.
//   NUMÉRATION — ajouter ou soustraire un nombre entier de dizaines ou de
//     centaines ; multiplier par 10 un nombre plus petit que 100.
//   PROCÉDURES — ajouter 9, 19 ou 29 ; soustraire 9 ; soustraire un nombre
//     plus petit que 9 ; déterminer la moitié d'un nombre pair ; calculer le
//     produit d'un nombre entre 11 et 19 par un nombre plus petit que 10, en
//     décomposant.
//
// ⚠️ CE QUI N'EST PAS DU CE1, et que la synthèse d'attendus laissait croire :
// multiplier par 4 ou par 8, multiplier par un nombre entier de dizaines,
// décomposer un facteur entre 11 et 99, ajouter 8, 18, 28, 38 ou 39. Tout cela
// est du CE2. On s'en tient au texte (le 39 de l'identifiant de micro reste,
// mais on n'ajoute que 9, 19 et 29).
//
// Le champ numérique reste sous 1 000 : nombres en jeu ET résultats.
//
// LE PIÈGE DES PROCÉDURES : ajouter 9, c'est ajouter 10 puis enlever 1. Les
// élèves enlèvent souvent 1 avant d'ajouter 10, ou oublient d'enlever. Même
// chose pour 19 et 29.
//
// ⛔ 10/11/2026 — LES SQUELETTES. Chaque micro servait un ou deux énoncés
// (« Combien font # + # ? ») : 17 à 19 répétitions sur 20. Chaque gabarit tire
// désormais une famille × une tournure (la troupe, l'ardoise, le furet, Pic…)
// × une situation d'enfant ; ★1-★2 restent des calculs nus, dits autrement.
// Les dessins (jetons, matériel de numération, un seul paquet) montrent ce
// qu'on SAIT, jamais le résultat. Outils : ./calcul-outils-ce1.ts.
// Mesure : scripts/mesurer-squelettes-coach.ts ce1 calcul_mental.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { DifficultyLevel, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  type Q,
  ri,
  rc,
  pile,
  maj,
  pl,
  exp,
  court,
  qcmTexte,
  nombreOuQcm,
  erreurs,
  enfant,
  deuxEnfants,
  le,
  direCalcul,
  direTrou,
  chose,
  choseDessinable,
  de,
  dessinObjets,
  dessinUnPaquet,
  dessinJetons,
  dessinQuantite,
  dessinNombre,
  dessinBarre,
  dessinArgent,
} from "./calcul-outils-ce1";

function gab(
  id: string,
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["ce1", "calcul_mental", ...tags, "template"],
    generate,
  };
}

/* =========================================================
   LES PAQUETS DES TABLES : un contenant, ce qu'il contient,
   et le dessin quand il existe.
========================================================= */
type Paquet = { un: string; des: string; quoi: string; objet?: Parameters<typeof dessinUnPaquet>[0] };
const PAQUETS: readonly Paquet[] = [
  { un: "sachet", des: "sachets", quoi: "billes" },
  { un: "filet", des: "filets", quoi: "ballons", objet: "ballon" },
  { un: "panier", des: "paniers", quoi: "pommes", objet: "pomme" },
  { un: "bocal", des: "bocaux", quoi: "poissons", objet: "poisson" },
  { un: "vase", des: "vases", quoi: "fleurs", objet: "fleur" },
  { un: "régime", des: "régimes", quoi: "bananes", objet: "banane" },
  { un: "pile", des: "piles", quoi: "livres", objet: "livre" },
  { un: "garage", des: "garages", quoi: "petites voitures", objet: "voiture" },
  { un: "branche", des: "branches", quoi: "oiseaux", objet: "oiseau" },
  { un: "boîte", des: "boîtes", quoi: "crayons" },
  { un: "assiette", des: "assiettes", quoi: "crêpes" },
  { un: "coffre de pirate", des: "coffres de pirate", quoi: "pièces d'or" },
  { un: "nid de dinosaure", des: "nids de dinosaure", quoi: "œufs" },
  { un: "wagon", des: "wagons", quoi: "enfants" },
  { un: "équipe", des: "équipes", quoi: "joueurs" },
  { un: "pochette", des: "pochettes", quoi: "images" },
  { un: "page", des: "pages", quoi: "étoiles dorées", objet: "etoile" },
  { un: "panier", des: "paniers", quoi: "chatons", objet: "chat" },
  { un: "tas", des: "tas", quoi: "feuilles d'automne", objet: "feuille" },
  { un: "boîte", des: "boîtes", quoi: "papillons en papier", objet: "papillon" },
  { un: "port", des: "ports", quoi: "petits bateaux", objet: "bateau" },
];
const paquet = () => rc(PAQUETS);

/** Le dessin d'UN paquet, s'il se dessine (5 objets au plus) ; les billes d'un
 *  sachet sont des jetons. */
const unPaquet = (p: Paquet, k: number) =>
  p.objet && k <= 5 ? dessinUnPaquet(p.objet, k, `1 ${p.un}`) : p.quoi === "billes" && k <= 10 ? dessinJetons(k) : undefined;

export const calculMentalBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_CALCUL_TABLES_ADDITION — dans les deux sens
     Le programme mesure la fluence : douze égalités à trou en
     une minute à la fin du CE1.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_tables_addition_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_tables_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre manque : 4 + … = 12 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Compte de 4 jusqu'à 12.",
    explanation: exp(
      "Connaître les tables d'addition dans les deux sens, c'est savoir retrouver n'importe lequel des trois nombres d'une égalité.",
      "On part du nombre connu et on avance jusqu'au total.",
      "De 4 à 12, il y a 8 : 4 + 8 = 12. On peut aussi dire 12 - 4 = 8.",
      "Il manque 8.",
    ),
    tags: ["ce1", "calcul_mental", "tables_addition"],
  },
  gab(
    "ce1_calcul_tables_addition_tpl_1",
    "ce1_calcul_tables_addition",
    2,
    "Cherche ce qu'il faut ajouter pour atteindre le total.",
    ["tables_addition"],
    () => {
      const a = ri(2, 9);
      const b = ri(2, 9);
      const t = a + b;
      const p = enfant();
      const famille = rc(["somme", "somme", "trou", "trou", "difference"] as const);
      if (famille === "somme") {
        const dessin = pile(0.6);
        const text = dessin
          ? rc([
              `${p.nom} pose ${a} jetons rouges, puis ${b} jetons bleus. Combien de jetons en tout ?`,
              `Voici les jetons de ${p.nom} : ${a} rouges et ${b} bleus. Combien y en a-t-il ?`,
              `Compte les jetons : ${a} + ${b}. Combien cela fait-il ?`,
              `${p.nom} remplit les cases : ${a} jetons rouges et ${b} bleus. Combien de jetons ?`,
            ])
          : direCalcul(`${a} + ${b}`);
        return nombreOuQcm(
          text,
          t,
          erreurs(t),
          exp(
            "Une table d'addition donne la somme de deux petits nombres.",
            a + b > 10 ? "On complète d'abord jusqu'à 10, puis on ajoute ce qui reste." : "On part du plus grand et on compte le reste.",
            a + b > 10 ? `${a} + ${10 - a} = 10, puis 10 + ${b - (10 - a)} = ${t}.` : `${a} + ${b} = ${t}.`,
            `${a} + ${b} = ${t}.`,
          ),
          dessin ? dessinJetons(a, b) : undefined,
        );
      }
      if (famille === "trou") {
        const dessin = pile(0.5);
        const premier = pile();
        const text = dessin
          ? rc([
              `${p.nom} a déjà ${a} jetons. ${maj(p.il)} en veut ${t}. Combien de jetons doit-${p.il} encore poser ?`,
              `Il y a ${a} jetons dans les cases. Combien faut-il en ajouter pour en avoir ${t} ?`,
              `${p.nom} veut ${t} jetons. ${maj(p.il)} en a posé ${a}. Combien lui en manque-t-il ?`,
            ])
          : direTrou(premier ? `… + ${b} = ${t}` : `${a} + … = ${t}`);
        const rep = dessin || !premier ? b : a;
        const connu = dessin || !premier ? a : b;
        const jetons = !dessin && pile(0.5) ? dessinJetons(connu) : undefined;
        return court(
          text,
          rep,
          exp(
            "Une table d'addition se lit dans les deux sens : on peut retrouver un des deux nombres.",
            "On part du nombre connu et on avance jusqu'au total.",
            `De ${connu} à ${t}, il y a ${rep} : ${connu} + ${rep} = ${t}.`,
            `Il manque ${rep}.`,
          ),
          dessin ? dessinJetons(a) : jetons,
        );
      }
      if (pile(0.5)) {
        return nombreOuQcm(
          rc([
            `${p.nom} a ces ${t} jetons. ${maj(p.il)} en enlève ${a}. Combien lui en reste-t-il ?`,
            `Voici ${t} jetons. ${p.nom} en retire ${a}. Combien en reste-t-il ?`,
          ]),
          b,
          erreurs(b, t + a),
          exp(
            "Une soustraction se calcule avec la table d'addition, lue à l'envers.",
            `On cherche ce qu'il faut ajouter à ${a} pour aller jusqu'à ${t}.`,
            `${a} + ${b} = ${t}, donc ${t} - ${a} = ${b}.`,
            `${t} - ${a} = ${b}.`,
          ),
          dessinJetons(t),
        );
      }
      return nombreOuQcm(
        direCalcul(`${t} - ${a}`),
        b,
        erreurs(b, t + a),
        exp(
          "Une soustraction se calcule avec la table d'addition, lue à l'envers.",
          `On cherche ce qu'il faut ajouter à ${a} pour aller jusqu'à ${t}.`,
          `${a} + ${b} = ${t}, donc ${t} - ${a} = ${b}.`,
          `${t} - ${a} = ${b}.`,
        ),
      );
    },
  ),

  /* =========================================================
     CE1_CALCUL_TABLES_MULTIPLICATION — tables de 2, 3, 4, 5, 10
  ========================================================= */
  gab(
    "ce1_calcul_tables_multiplication_tpl_1",
    "ce1_calcul_tables_multiplication",
    3,
    "Récite la table jusqu'au résultat.",
    ["tables_multiplication"],
    () => {
      const a = rc([2, 3, 4, 5, 10] as const);
      const b = ri(2, 10);
      const prod = a * b;
      const pq = paquet();
      const p = enfant();
      const situation = pile(0.6);
      const explication = exp(
        "Une table de multiplication se lit dans les deux sens : on peut retrouver un des deux nombres.",
        `On récite la table de ${a} jusqu'à tomber sur ${prod}.`,
        `${a} × ${b} = ${prod} : il faut ${b} fois ${a} pour arriver à ${prod}.`,
        `Il en faut ${b}.`,
      );
      if (!situation) return court(direTrou(`${a} × … = ${prod}`), b, explication, prod <= 40 && pile(0.5) ? dessinJetons(prod) : undefined);
      const text = rc([
        `${a} ${pq.quoi} par ${pq.un}. ${p.nom} en veut ${prod}. Combien de ${pq.des} ?`,
        `${p.nom} range ${prod} ${pq.quoi} par ${pq.des} de ${a}. Combien de ${pq.des} remplit-${p.il} ?`,
        `Un ${pq.un} contient ${a} ${pq.quoi}. Combien de ${pq.des} pour avoir ${prod} ${pq.quoi} ?`,
        `Pic compte ${prod} ${pq.quoi}, ${a} par ${pq.un}. Combien de ${pq.des} ?`,
      ]);
      return nombreOuQcm(text, b, erreurs(b, prod - a, a), explication, unPaquet(pq, a));
    },
  ),

  /* =========================================================
     CE1_CALCUL_FAITS_MULTIPLICATIFS — les faits à connaître
     Le programme en donne la liste : doubles, moitiés, et les
     multiples de 25.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_faits_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_faits_multiplicatifs",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 4 × 25 ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Quatre pièces de 25 centimes font un euro.",
    explanation: exp(
      "Les multiples de 25 sont des faits à connaître par cœur : 25, 50, 75, 100.",
      "On compte de 25 en 25, ou on pense aux pièces de monnaie.",
      "25, 50, 75, 100 : quatre fois vingt-cinq font cent. C'est aussi quatre pièces de 25 centimes, qui font un euro.",
      "4 × 25 = 100.",
    ),
    tags: ["ce1", "calcul_mental", "faits", "remarquable"],
  },
  gab(
    "ce1_calcul_faits_tpl_1",
    "ce1_calcul_faits_multiplicatifs",
    3,
    "Compte de 25 en 25 : 25, 50, 75, 100.",
    ["faits"],
    () => {
      const n = ri(1, 4);
      const prod = n * 25;
      const p = enfant();
      const explication = exp(
        "Les multiples de 25 se retiennent par cœur : 25, 50, 75, 100.",
        "On compte de 25 en 25 autant de fois qu'il le faut.",
        `${Array.from({ length: n }, (_, i) => (i + 1) * 25).join(", ")} : ${n} fois 25 font ${prod}.`,
        `${n} × 25 = ${prod}.`,
      );
      const famille = rc(["nu", "repete", "situation", "situation"] as const);
      if (famille === "nu") return nombreOuQcm(direCalcul(`${n} × 25`), prod, [prod + 25, prod - 25, n * 20, n + 25], explication, pile(0.5) ? dessinBarre({ total: "?", parts: Array.from({ length: n }, () => ({ label: "", value: "25" })) }) : undefined);
      if (famille === "repete") {
        return nombreOuQcm(
          direCalcul(Array.from({ length: Math.max(2, n) }, () => "25").join(" + ")),
          Math.max(2, n) * 25,
          [Math.max(2, n) * 25 + 25, Math.max(2, n) * 25 - 25, Math.max(2, n) * 20],
          exp(
            "Les multiples de 25 se retiennent par cœur : 25, 50, 75, 100.",
            "On compte de 25 en 25.",
            `${Array.from({ length: Math.max(2, n) }, (_, i) => (i + 1) * 25).join(", ")}.`,
            `Cela fait ${Math.max(2, n) * 25}.`,
          ),
        );
      }
      const s = rc([
        { avant: `${p.nom} remplit ${pl(n, "plateau", "plateaux")} de 25 croissants.`, q: "Combien de croissants ?" },
        { avant: `${p.nom} achète ${pl(n, "sachet", "sachets")} de 25 billes.`, q: "Combien de billes a-t-" + p.il + " ?" },
        { avant: `Au cirque, ${pl(n, "rangée", "rangées")} de 25 places sont pleines.`, q: "Combien de places prises ?" },
        { avant: `Le jardinier remplit ${pl(n, "bac", "bacs")} de 25 fleurs.`, q: "Combien de fleurs ?" },
        { avant: `La fusée a ${pl(n, "étage", "étages")} de 25 hublots.`, q: "Combien de hublots en tout ?" },
        { avant: `Pic mange 25 graines par jour, pendant ${pl(n, "jour", "jours")}.`, q: "Combien de graines en tout ?" },
        { avant: `${p.nom} colle 25 images par page, sur ${pl(n, "page", "pages")}.`, q: "Combien d'images en tout ?" },
      ]);
      const dessin = pile(0.6);
      return nombreOuQcm(
        `${s.avant} ${s.q}`,
        prod,
        [prod + 25, prod - 25, n * 20, n + 25],
        explication,
        dessin ? dessinBarre({ total: "?", parts: Array.from({ length: n }, () => ({ label: "", value: "25" })) }) : undefined,
      );
    },
  ),

  /* =========================================================
     CE1_CALCUL_DOUBLES_MOITIES — les doubles et les moitiés
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_doubles_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_doubles_moities",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le double de 35 ?",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "35 + 35.",
    explanation: exp(
      "Le double d'un nombre, c'est ce nombre pris deux fois.",
      "On additionne le nombre avec lui-même, en séparant les dizaines des unités.",
      "30 + 30 = 60, et 5 + 5 = 10. 60 + 10 = 70.",
      "Le double de 35 est 70.",
    ),
    tags: ["ce1", "calcul_mental", "doubles", "remarquable"],
  },
  gab(
    "ce1_calcul_doubles_tpl_1",
    "ce1_calcul_doubles_moities",
    3,
    "Sépare les dizaines et les unités avant de doubler.",
    ["doubles"],
    () => {
      const p = enfant();
      const [a, b] = deuxEnfants();
      if (pile()) {
        const n = rc([...Array.from({ length: 15 }, (_, i) => i + 1), 20, 25, 30, 35, 40, 45, 50, 100, 200, 300, 400, 500]);
        const d = n * 2;
        const explication = exp(
          "Le double d'un nombre, c'est ce nombre pris deux fois.",
          n > 10 && n % 10 ? "On double les dizaines, puis les unités, et on réunit." : "On additionne le nombre avec lui-même.",
          n > 10 && n % 10 ? `${n} = ${n - (n % 10)} + ${n % 10}. ${n - (n % 10)} + ${n - (n % 10)} = ${2 * (n - (n % 10))}, ${n % 10} + ${n % 10} = ${2 * (n % 10)}. En tout ${d}.` : `${n} + ${n} = ${d}.`,
          `Le double de ${n} est ${d}.`,
        );
        const c = choseDessinable();
        if (n <= 10 && pile(0.7)) {
          return nombreOuQcm(
            rc([
              `Voici les ${c.pl} de ${a.nom}. ${b.nom} en a autant. Combien à eux deux ?`,
              `${a.nom} a ces ${c.pl}. Pic en apporte encore autant. Combien de ${c.pl} en tout ?`,
              `${a.nom} veut le double de ces ${c.pl}. Combien de ${c.pl} cela fait-il ?`,
            ]),
            d,
            [d + 1, d - 1, n + 1, n],
            explication,
            dessinObjets(c.objet!, n),
          );
        }
        const text = rc([
          `${p.nom} cherche le double de ${n}. Que trouve-t-${p.il} ?`,
          pile() ? `Quel est le double de ${n} ?` : `Le double de ${n}, c'est combien ?`,
          direCalcul(`${n} + ${n}`),
          `${a.nom} a ${pl(n, c.sg, c.pl)}. ${b.nom} en a deux fois plus. Combien ${b.nom} en a-t-${b.il} ?`,
          `${p.nom} double le nombre ${n}. Quel nombre trouve-t-${p.il} ?`,
          `Pic le paille-en-queue dit « ${n} ». Ravi répond par son double. Que dit Ravi ?`,
        ]);
        return nombreOuQcm(text, d, [d + 10, d - 10, n + 2, d + 1], explication, n >= 11 && n <= 50 && pile(0.4) ? dessinNombre(n) : undefined);
      }
      const m = rc([...Array.from({ length: 15 }, (_, i) => i + 1), 20, 25, 30, 40, 50, 100, 150, 200, 250]);
      const n = m * 2;
      const explication = exp(
        "La moitié d'un nombre, c'est ce qu'on obtient en le partageant en deux parts égales.",
        "On cherche le nombre qui, ajouté à lui-même, redonne le nombre de départ.",
        `${m} + ${m} = ${n}. La moitié de ${n} est donc ${m}.`,
        `La moitié de ${n} est ${m}.`,
      );
      const c = chose();
      if (n <= 30 && pile(0.7)) {
        return nombreOuQcm(
          rc([
            `${a.nom} et ${b.nom} se partagent ces ${c.pl} en deux parts égales. Combien chacun ?`,
            `${a.nom} partage ces ${c.pl} en deux tas pareils. Combien dans chaque tas ?`,
            `${a.nom} donne la moitié de ses ${c.pl} à ${b.nom}. Combien en donne-t-${a.il} ?`,
          ]),
          m,
          [m + 1, m - 1, n, m + 2],
          explication,
          dessinQuantite(c, n),
        );
      }
      return nombreOuQcm(
        rc([
          pile() ? `Quelle est la moitié de ${n} ?` : `La moitié de ${n}, c'est combien ?`,
          `${p.nom} cherche la moitié de ${n}. Que trouve-t-${p.il} ?`,
          `${p.nom} partage ${n} en deux parts égales. Combien dans chaque part ?`,
          `${a.nom} et ${b.nom} se partagent ${n} ${c.pl} à parts égales. Combien chacun ?`,
          `Pic a ${n} graines. Il en mange la moitié. Combien en mange-t-il ?`,
        ]),
        m,
        [m + 10, m - 1, n, m + 5],
        explication,
      );
    },
  ),

  /* =========================================================
     CE1_CALCUL_COMPLEMENTS_100 — compléter à la dizaine
     ou à la centaine supérieure. C'est la procédure du CP,
     réinvestie toute l'année, et l'appui du rendu de monnaie.
  ========================================================= */
  gab(
    "ce1_calcul_complements_tpl_1",
    "ce1_calcul_complements_100",
    3,
    "Regarde le chiffre des unités et complète-le à 10.",
    ["complements"],
    () => {
      const d = ri(1, 9);
      const u = ri(1, 9);
      const n = d * 10 + u;
      const manque = 10 - u;
      const cible = (d + 1) * 10;
      const p = enfant();
      const c = chose();
      const explication = exp(
        "La dizaine supérieure est la dizaine juste après le nombre.",
        "On regarde le chiffre des unités et on cherche son complément à 10.",
        `${n}, c'est ${d} dizaines et ${u} unités. Il manque ${manque} unités pour faire une dizaine de plus : ${n} + ${manque} = ${cible}.`,
        `Il faut ajouter ${manque}.`,
      );
      const famille = rc(["dessin", "dessin", "trou", "phrase", "situation"] as const);
      if (famille === "dessin") {
        return nombreOuQcm(
          rc([
            `Voici ${n}. Combien de cubes ajouter pour faire une barre de plus ?`,
            `${p.nom} a construit ${n}. Combien de cubes pour arriver à ${cible} ?`,
            `Il y a ${n} cubes. Combien en faut-il encore pour avoir ${cible} cubes ?`,
          ]),
          manque,
          [u, manque + 1, manque - 1, cible],
          explication,
          dessinNombre(n),
        );
      }
      if (famille === "trou") return court(direTrou(`${n} + … = ${cible}`), manque, explication);
      if (famille === "phrase") {
        return nombreOuQcm(
          rc([
            `Combien faut-il ajouter à ${n} pour atteindre la dizaine supérieure ?`,
            `De ${n}, combien faut-il pour arriver à ${cible} ?`,
            `${p.nom} compte ${n}, puis s'arrête à ${cible}. Combien a-t-${p.il} ajouté ?`,
          ]),
          manque,
          [u, manque + 1, manque - 1],
          explication,
          pile(0.5) ? dessinNombre(n) : undefined,
        );
      }
      return nombreOuQcm(
        rc([
          `${p.nom} a ${n} ${c.pl}. ${maj(p.il)} en veut ${cible}. Combien lui en manque-t-il ?`,
          `Au jeu de l'oie, ${p.nom} est sur la case ${n}. Combien de cases jusqu'à ${cible} ?`,
          `La boîte est pleine avec ${cible} ${c.pl}. Il y en a ${n}. Combien en ajouter ?`,
        ]),
        manque,
        [u, manque + 1, manque - 1],
        explication,
      );
    },
  ),
  gab(
    "ce1_calcul_complements_tpl_2",
    "ce1_calcul_complements_100",
    4,
    "Combien manque-t-il pour arriver à la centaine juste après ?",
    ["complements"],
    () => {
      const c = ri(1, 8);
      const reste = ri(1, 9) * 10;
      const n = c * 100 + reste;
      const manque = 100 - reste;
      const cible = (c + 1) * 100;
      const p = enfant();
      const explication = exp(
        "La centaine supérieure est la centaine juste après le nombre.",
        "On regarde ce qui dépasse la centaine, puis on cherche son complément à 100.",
        `${n} dépasse ${c * 100} de ${reste}. Pour faire 100, il manque ${manque} : ${n} + ${manque} = ${cible}.`,
        `Il faut ajouter ${manque}.`,
      );
      const barre = () => dessinBarre({ total: String(cible), parts: [{ label: "", value: String(n) }, { label: "", unknown: true }] });
      const famille = rc(["dessin", "trou", "phrase", "situation", "situation"] as const);
      if (famille === "dessin") {
        return nombreOuQcm(
          rc([
            `Voici ${n}. Combien ajouter pour faire une plaque de plus ?`,
            `${p.nom} a posé ${n}. Combien lui manque-t-il pour arriver à ${cible} ?`,
          ]),
          manque,
          [reste, manque + 10, manque - 10, manque / 10],
          explication,
          dessinNombre(n),
        );
      }
      if (famille === "trou") return court(direTrou(`${n} + … = ${cible}`), manque, explication);
      if (famille === "phrase") {
        return nombreOuQcm(
          rc([
            `Combien ajouter à ${n} pour atteindre la centaine suivante ?`,
            `${p.nom} compte de ${n} à ${cible}. Combien a-t-${p.il} ajouté ?`,
          ]),
          manque,
          [reste, manque + 10, manque - 10],
          explication,
          pile(0.5) ? barre() : undefined,
        );
      }
      return nombreOuQcm(
        rc([
          `La boulangère a cuit ${n} pains. Il en faut ${cible}. Combien doit-elle encore en cuire ?`,
          `La fusée est à ${n} mètres. Elle doit monter à ${cible}. Combien de mètres reste-t-il ?`,
          `Le marchand a ${n} mangues. Il en veut ${cible}. Combien doit-il en apporter ?`,
          `${p.nom} a ${n} points au jeu. On gagne à ${cible} points. Combien de points lui manque-t-il ?`,
          `Le château de ${p.nom} a ${n} briques. Il en faut ${cible}. Combien de briques manque-t-il ?`,
        ]),
        manque,
        [reste, manque + 10, manque - 10],
        explication,
        pile(0.6) ? barre() : undefined,
      );
    },
  ),

  /* =========================================================
     CE1_CALCUL_DIZAINES_CENTAINES — ajouter des dizaines
     ou des centaines entières
  ========================================================= */
  gab(
    "ce1_calcul_dizaines_tpl_1",
    "ce1_calcul_dizaines_centaines",
    3,
    "On ne touche qu'aux dizaines, ou qu'aux centaines.",
    ["dizaines"],
    () => {
      const rang = rc([10, 100] as const);
      const n = ri(1, 5) * 100 + ri(1, 4) * 10 + ri(1, 9);
      const k = ri(1, 4);
      const ajout = k * rang;
      const total = n + ajout;
      const p = enfant();
      const explication = exp(
        rang === 10
          ? "Ajouter un nombre entier de dizaines, c'est ajouter des dizaines aux dizaines."
          : "Ajouter un nombre entier de centaines, c'est ajouter des centaines aux centaines.",
        "On s'appuie sur la numération : seul le rang concerné change.",
        `${ajout}, c'est ${k} ${rang === 10 ? (k > 1 ? "dizaines" : "dizaine") : k > 1 ? "centaines" : "centaine"}. ${n} + ${ajout} = ${total}. Les autres chiffres ne bougent pas.`,
        `Cela fait ${total}.`,
      );
      const objet = rang === 10 ? pl(k, "barre", "barres") : pl(k, "plaque", "plaques");
      const famille = rc(["dessin", "dessin", "nu", "situation"] as const);
      if (famille === "dessin") {
        return nombreOuQcm(
          rc([
            `Voici le nombre ${n}. On ajoute ${objet}. Quel nombre obtient-on ?`,
            `${p.nom} a construit ${n}. ${maj(p.il)} ajoute ${objet}. Quel nombre a-t-${p.il} maintenant ?`,
            `On ajoute ${objet} à ce matériel. Quel nombre obtient-on ?`,
          ]),
          total,
          [n + k, n + ajout * 10 > 999 ? n + 1 : n + ajout * 10, total + rang, total - rang].filter((x) => x <= 1000),
          explication,
          dessinNombre(n),
        );
      }
      if (famille === "nu") return nombreOuQcm(direCalcul(`${n} + ${ajout}`), total, [n + k, total + rang, total - rang], explication, pile(0.4) ? dessinNombre(n) : undefined);
      return nombreOuQcm(
        rc([
          `${p.nom} a ${n} perles. ${maj(p.il)} reçoit ${k} ${rang === 10 ? "boîtes de 10" : "sacs de 100"}. Combien de perles ?`,
          `La bibliothèque a ${n} livres. On en apporte ${ajout}. Combien de livres y a-t-il ?`,
          `Le train transporte ${n} voyageurs. ${ajout} voyageurs montent. Combien sont dans le train ?`,
          `Pic a ${n} graines. Il en trouve ${ajout} de plus. Combien en a-t-il ?`,
        ]),
        total,
        [n + k, total + rang, total - rang],
        explication,
      );
    },
  ),

  /* =========================================================
     CE1_CALCUL_MULTIPLIER_10 — multiplier par 10
     Le programme l'explique par la numération, pas par « on
     ajoute un zéro » : chaque unité devient une dizaine.
  ========================================================= */
  gab(
    "ce1_calcul_multiplier_10_tpl_1",
    "ce1_calcul_multiplier_10",
    3,
    "Chaque unité devient une dizaine, chaque dizaine une centaine.",
    ["multiplier_10"],
    () => {
      const n = pile(0.35) ? ri(2, 9) : ri(11, 99);
      const r = n * 10;
      const p = enfant();
      const d = Math.floor(n / 10);
      const u = n % 10;
      const explication = exp(
        "Multiplier par 10 donne à chaque chiffre une valeur dix fois plus grande.",
        "Les unités deviennent des dizaines, les dizaines deviennent des centaines.",
        d
          ? `Dans ${n}, les ${d} dizaines deviennent ${d} centaines et les ${u} unités deviennent ${u} dizaines : ${r}.`
          : `${n} unités deviennent ${n} dizaines : ${r}.`,
        `10 × ${n} = ${r}.`,
      );
      const faux = [n + 10, r + 1, n * 100 > 1000 ? r + 10 : n * 100, r - 10];
      const famille = rc(["nu", "dessin", "dessin", "situation", "dizaines"] as const);
      if (famille === "nu") return nombreOuQcm(direCalcul(rc([`10 × ${n}`, `${n} × 10`])), r, faux, explication);
      if (famille === "dessin") {
        return nombreOuQcm(
          rc([
            `Voici ${n}. Chaque cube devient une barre, chaque barre une plaque. Quel nombre obtient-on ?`,
            `${p.nom} a construit ${n}. ${maj(p.il)} fait la même chose 10 fois. Combien cela fait-il ?`,
            `Le matériel de ${p.nom} montre ${n}. Combien font 10 fois ce nombre ?`,
          ]),
          r,
          faux,
          explication,
          dessinNombre(n),
        );
      }
      if (famille === "dizaines") {
        return nombreOuQcm(
          rc([`${p.nom} a ${n} dizaines de billes. Combien de billes cela fait-il ?`, `Quel nombre fait ${n} dizaines ? Aide ${p.nom} !`, `${p.nom} a ${n} barres de dix cubes. Combien de cubes a-t-${p.il} ?`]),
          r,
          faux,
          explication,
        );
      }
      return nombreOuQcm(
        rc([
          `${p.nom} a ${n} paquets de 10 images. Combien d'images a-t-${p.il} ?`,
          `${p.nom} remplit ${n} boîtes de 10 œufs. Combien d'œufs ?`,
          `Au cirque, ${n} clowns ont chacun 10 ballons. Combien de ballons en tout ?`,
          `La maîtresse donne 10 craies à chacune des ${n} tables. Combien de craies ?`,
          `Pic mange 10 graines par jour, pendant ${n} jours. Combien de graines en tout ?`,
        ]),
        r,
        faux,
        explication,
        pile(0.6) ? { kind: "base_dix", dizaines: 1, consigne: "Un paquet de 10" } : undefined,
      );
    },
  ),

  /* =========================================================
     CE1_CALCUL_AJOUTER_9_19_29 — la procédure du programme
     LE piège : ajouter 10 puis enlever 1, dans cet ordre.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_ajouter_9_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_ajouter_9_19_29_39",
    difficulty: 3,
    theme: "neutral",
    text: "Pour ajouter 9 à un nombre, quelle est la façon la plus rapide ?",
    format: "qcm",
    choices: [
      "ajouter 10, puis enlever 1",
      "ajouter 10, puis ajouter 1",
      "enlever 10, puis ajouter 1",
      "ajouter 1 neuf fois de suite",
    ],
    expected: ["ajouter 10, puis enlever 1"],
    comparator: "mcq_exact",
    hint: "9, c'est 10 moins 1.",
    explanation: exp(
      "Ajouter 9, c'est ajouter une dizaine puis reprendre l'unité en trop.",
      "On ajoute d'abord 10, ce qui est facile, puis on enlève 1.",
      "Pour 37 + 9 : 37 + 10 = 47, puis 47 - 1 = 46. On a bien ajouté 9, car 10 - 1 = 9.",
      "On ajoute 10, puis on enlève 1.",
    ),
    tags: ["ce1", "calcul_mental", "ajouter_9", "methode", "qcm"],
  },
  gab(
    "ce1_calcul_ajouter_9_tpl_1",
    "ce1_calcul_ajouter_9_19_29_39",
    3,
    "Ajoute la dizaine ronde, puis enlève 1.",
    ["ajouter_9"],
    () => {
      const ajout = rc([9, 9, 19, 29] as const);
      const rond = ajout + 1;
      const dessin = pile(0.6);
      const n = dessin ? ri(23, 89) : ri(23, 400);
      const total = n + ajout;
      const p = enfant();
      const c = chose();
      const explication = exp(
        `Ajouter ${ajout}, c'est ajouter ${rond} puis enlever 1.`,
        "On ajoute d'abord le nombre rond, ce qui est facile, puis on reprend l'unité en trop.",
        `${n} + ${rond} = ${n + rond}, puis ${n + rond} - 1 = ${total}.`,
        `${n} + ${ajout} = ${total}.`,
      );
      const faux = [n + rond + 1, n + rond, total - 10, total + 2];
      if (dessin) {
        return nombreOuQcm(
          rc([
            `Voici le nombre ${n}. ${p.nom} lui ajoute ${ajout}. Quel nombre obtient-${p.il} ?`,
            `${p.nom} a construit ${n} avec ses cubes. ${maj(p.il)} en ajoute ${ajout}. Combien de cubes a-t-${p.il} ?`,
            `${p.nom} ajoute ${ajout} cubes à ce matériel. Combien de cubes maintenant ?`,
          ]),
          total,
          faux,
          explication,
          dessinNombre(n),
        );
      }
      return nombreOuQcm(
        rc([
          direCalcul(`${n} + ${ajout}`),
          direCalcul(`${n} + ${ajout}`),
          `${p.nom} a ${n} ${c.pl}. ${maj(p.il)} en gagne ${ajout}. Combien en a-t-${p.il} maintenant ?`,
          `Dans le train, il y a ${n} voyageurs. ${ajout} autres montent. Combien sont-ils ?`,
          `${p.il === "elle" ? "La" : "Le"} pirate ${p.nom} a ${n} pièces d'or. ${maj(p.il)} en trouve ${ajout}. Combien en a-t-${p.il} ?`,
          `${p.nom} est sur la case ${n}. ${maj(p.il)} avance de ${ajout} cases. Où arrive-t-${p.il} ?`,
        ]),
        total,
        faux,
        explication,
      );
    },
  ),

  /* =========================================================
     CE1_CALCUL_SOUSTRAIRE_9 — l'inverse de la procédure
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_soustraire_9_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_soustraire_9",
    difficulty: 3,
    theme: "neutral",
    text: "Pour soustraire 9 à un nombre, que peut-on faire ?",
    format: "qcm",
    choices: [
      "enlever 10, puis ajouter 1",
      "enlever 10, puis enlever 1",
      "ajouter 10, puis enlever 1",
      "enlever 1 neuf fois de suite",
    ],
    expected: ["enlever 10, puis ajouter 1"],
    comparator: "mcq_exact",
    hint: "On a enlevé une unité de trop : il faut la rendre.",
    explanation: exp(
      "Soustraire 9, c'est enlever une dizaine puis rendre l'unité enlevée en trop.",
      "On enlève d'abord 10, ce qui est facile, puis on ajoute 1.",
      "Pour 54 - 9 : 54 - 10 = 44, puis 44 + 1 = 45. On a bien enlevé 9, car 10 - 1 = 9.",
      "On enlève 10, puis on ajoute 1.",
    ),
    tags: ["ce1", "calcul_mental", "soustraire_9", "methode", "qcm"],
  },
  gab(
    "ce1_calcul_soustraire_9_tpl_1",
    "ce1_calcul_soustraire_9",
    3,
    "Enlève 10, puis rends 1.",
    ["soustraire_9"],
    () => {
      const dessin = pile(0.6);
      const n = dessin ? ri(21, 99) : ri(25, 500);
      const r = n - 9;
      const p = enfant();
      const c = chose();
      const explication = exp(
        "Soustraire 9, c'est enlever 10 puis rendre 1.",
        "On enlève d'abord la dizaine, ce qui est facile, puis on rend l'unité enlevée en trop.",
        `${n} - 10 = ${n - 10}, puis ${n - 10} + 1 = ${r}.`,
        `${n} - 9 = ${r}.`,
      );
      const faux = [n - 11, n - 10, r + 10, r - 2];
      if (dessin) {
        return nombreOuQcm(
          rc([
            `Voici le nombre ${n}. ${p.nom} enlève 9 cubes. Combien en reste-t-il ?`,
            `${p.nom} a construit ${n} avec ses cubes. ${maj(p.il)} en retire 9. Combien en reste-t-il ?`,
            `${p.nom} retire 9 à ce nombre. Quel nombre obtient-${p.il} ?`,
          ]),
          r,
          faux,
          explication,
          dessinNombre(n),
        );
      }
      return nombreOuQcm(
        rc([
          direCalcul(`${n} - 9`),
          direCalcul(`${n} - 9`),
          `${p.nom} a ${n} ${c.pl}. ${maj(p.il)} en donne 9. Combien lui en reste-t-il ?`,
          `À la piscine, ${n} enfants nagent. 9 sortent de l'eau. Combien restent dans l'eau ?`,
          `Le dragon garde ${n} pierres précieuses. ${p.nom} en prend 9. Combien en reste-t-il ?`,
          `${p.nom} est sur la case ${n}. ${maj(p.il)} recule de 9 cases. Où arrive-t-${p.il} ?`,
        ]),
        r,
        faux,
        explication,
      );
    },
  ),

  /* =========================================================
     CE1_CALCUL_SOUSTRAIRE_INFERIEUR_9 — passer par la dizaine
     Le programme détaille : pour 523 - 7, on descend d'abord à
     520, puis on enlève ce qui reste.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_soustraire_inf9_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_soustraire_inferieur_9",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer 523 - 7 de tête, quelle étape est la plus commode ?",
    format: "qcm",
    choices: [
      "descendre d'abord à 520, puis enlever ce qui reste",
      "enlever 7 aux centaines",
      "enlever 10 puis ajouter 3",
      "poser l'opération, on ne peut pas faire autrement",
    ],
    expected: ["descendre d'abord à 520, puis enlever ce qui reste"],
    comparator: "mcq_exact",
    hint: "On s'arrête d'abord sur la dizaine ronde la plus proche.",
    explanation: exp(
      "Quand il n'y a pas assez d'unités, on descend d'abord jusqu'à la dizaine ronde.",
      "On enlève juste ce qu'il faut pour atteindre la dizaine, puis le reste de la soustraction.",
      "523 - 3 = 520. Il reste à enlever 4, car 7 = 3 + 4 : 520 - 4 = 516.",
      "On descend d'abord à 520, puis on enlève ce qui reste.",
    ),
    tags: ["ce1", "calcul_mental", "soustraire", "methode", "qcm"],
  },
  gab(
    "ce1_calcul_soustraire_inf9_tpl_1",
    "ce1_calcul_soustraire_inferieur_9",
    4,
    "Descends d'abord à la dizaine ronde.",
    ["soustraire"],
    () => {
      // Le chiffre des unités est plus petit que ce qu'on retire : c'est là que
      // le passage par la dizaine sert.
      const u = ri(1, 5);
      const retire = ri(u + 1, 8);
      const dessin = pile(0.6);
      const n = (dessin ? ri(2, 9) : ri(11, 90)) * 10 + u;
      const reste = n - retire;
      const p = enfant();
      const c = chose();
      const explication = exp(
        "Quand il n'y a pas assez d'unités, on descend d'abord jusqu'à la dizaine ronde.",
        "On enlève ce qu'il faut pour atteindre la dizaine, puis le reste.",
        `${n} - ${u} = ${n - u}. Il reste à enlever ${retire - u}, car ${retire} = ${u} + ${retire - u} : ${n - u} - ${retire - u} = ${reste}.`,
        `${n} - ${retire} = ${reste}.`,
      );
      const faux = [reste + 10, n - u, reste + 2, reste - 1];
      const famille = rc(["nu", "etape", "situation", "dessin"] as const);
      if (dessin || famille === "dessin") {
        return nombreOuQcm(
          rc([
            `Voici ${n}. ${p.nom} enlève ${retire} cubes : il faut casser une barre. Combien en reste-t-il ?`,
            `${p.nom} a ${n} cubes. ${maj(p.il)} en donne ${retire}. Combien lui en reste-t-il ?`,
            `${p.nom} retire ${retire} à ce nombre. Quel nombre obtient-${p.il} ?`,
          ]),
          reste,
          faux,
          explication,
          dessinNombre(n, { echange: "unites" }),
        );
      }
      if (famille === "etape") {
        return court(
          rc([
            `Pour ${n} - ${retire}, ${p.nom} descend d'abord à ${n - u}. Combien reste-t-il à enlever ?`,
            `${p.nom} calcule ${n} - ${retire}. ${maj(p.il)} enlève d'abord ${u}. Combien doit-${p.il} encore enlever ?`,
          ]),
          retire - u,
          explication,
        );
      }
      if (famille === "nu") return nombreOuQcm(direCalcul(`${n} - ${retire}`), reste, faux, explication);
      return nombreOuQcm(
        rc([
          `${p.nom} a ${n} ${c.pl}. ${maj(p.il)} en perd ${retire}. Combien lui en reste-t-il ?`,
          `La boulangère a ${n} baguettes. Elle en vend ${retire} à ${p.nom}. Combien en reste-t-il ?`,
          `Le livre a ${n} pages. ${p.nom} est à ${retire} pages de la fin. Quelle page ?`,
        ]),
        reste,
        faux,
        explication,
      );
    },
  ),

  /* =========================================================
     CE1_CALCUL_MOITIE_NOMBRE_PAIR — la moitié d'un nombre pair
     Le programme décompose : moitié de 470 = moitié de 400 plus
     moitié de 70.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_moitie_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_moitie_nombre_pair",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la moitié de 46 ?",
    format: "short",
    expected: ["23"],
    comparator: "number_equal",
    hint: "Coupe 46 en 40 et 6, puis prends la moitié de chaque morceau.",
    explanation: exp(
      "Pour trouver la moitié d'un nombre pair, on peut le couper en morceaux dont on connaît les moitiés.",
      "On décompose en dizaines et unités, on prend la moitié de chaque, puis on additionne.",
      "46 = 40 + 6. La moitié de 40 est 20, celle de 6 est 3. 20 + 3 = 23.",
      "La moitié de 46 est 23.",
    ),
    tags: ["ce1", "calcul_mental", "moitie", "methode"],
  },
  gab(
    "ce1_calcul_moitie_tpl_1",
    "ce1_calcul_moitie_nombre_pair",
    4,
    "Décompose le nombre avant de le partager en deux.",
    ["moitie"],
    () => {
      const p = enfant();
      const [a, b] = deuxEnfants();
      const c = chose();
      let n: number;
      let decomposition: string;
      if (pile(0.75)) {
        const dizaines = ri(1, 4) * 2;
        const unites = ri(1, 4) * 2;
        n = dizaines * 10 + unites;
        decomposition = `${n} = ${dizaines * 10} + ${unites}. La moitié de ${dizaines * 10} est ${dizaines * 5}, celle de ${unites} est ${unites / 2}. ${dizaines * 5} + ${unites / 2} = ${n / 2}.`;
      } else {
        const cent = ri(1, 4) * 2;
        const diz = ri(1, 4) * 2;
        n = cent * 100 + diz * 10;
        decomposition = `${n} = ${cent * 100} + ${diz * 10}. La moitié de ${cent * 100} est ${cent * 50}, celle de ${diz * 10} est ${diz * 5}. ${cent * 50} + ${diz * 5} = ${n / 2}.`;
      }
      const m = n / 2;
      const explication = exp(
        "Pour trouver la moitié d'un nombre pair, on le coupe en morceaux dont on connaît les moitiés.",
        "On décompose le nombre, on prend la moitié de chaque morceau, puis on additionne.",
        decomposition,
        `La moitié de ${n} est ${m}.`,
      );
      const faux = [m + 10, m - 1, m + 5, n - 2];
      if (n <= 30 && pile(0.7)) {
        return nombreOuQcm(
          rc([
            `${a.nom} et ${b.nom} se partagent ces ${c.pl} en deux parts égales. Combien chacun ?`,
            `${a.nom} fait deux tas pareils avec ces ${c.pl}. Combien de ${c.pl} dans chaque tas ?`,
          ]),
          m,
          [m + 1, m - 1, n, m + 2],
          explication,
          dessinQuantite(c, n),
        );
      }
      if (n < 100 && pile(0.5)) {
        return nombreOuQcm(
          rc([
            `Voici le nombre ${n}. ${p.nom} le partage en deux parts égales. Combien dans chaque part ?`,
            `${p.nom} partage ces cubes en deux tas égaux. Combien de cubes dans chaque tas ?`,
            `Quelle est la moitié du nombre montré ?`,
          ]),
          m,
          faux,
          explication,
          dessinNombre(n),
        );
      }
      return nombreOuQcm(
        rc([
          pile() ? `Quelle est la moitié de ${n} ?` : `La moitié de ${n}, c'est combien ?`,
          `${p.nom} cherche la moitié de ${n}. Que trouve-t-${p.il} ?`,
          `${a.nom} et ${b.nom} se partagent ${n} ${c.pl} à parts égales. Combien chacun ?`,
          `La vétérinaire soigne ${n} animaux. ${p.nom} l'aide pour la moitié. Combien d'animaux ?`,
          `La cabane a ${n} planches, la moitié sont peintes. Combien de planches peintes ?`,
        ]),
        m,
        faux,
        explication,
      );
    },
  ),

  /* =========================================================
     CE1_CALCUL_DISTRIBUTIVITE — décomposer un facteur
     Le programme s'arrête à un facteur compris entre 11 et 19.
     « 13 fois 7, c'est 10 fois 7 plus 3 fois 7. »
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_distributivite_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_distributivite",
    difficulty: 4,
    theme: "neutral",
    text: "Comment calculer 13 × 7 de tête ?",
    format: "qcm",
    choices: [
      "10 × 7 puis 3 × 7, et on additionne",
      "13 + 7",
      "10 × 7 puis on ajoute 3",
      "on ne peut pas, il faut poser l'opération",
    ],
    expected: ["10 × 7 puis 3 × 7, et on additionne"],
    comparator: "mcq_exact",
    hint: "13, c'est 10 et 3.",
    explanation: exp(
      "On peut couper un facteur en deux morceaux plus faciles, puis additionner les deux produits.",
      "On décompose le plus grand facteur en dizaines et unités.",
      "13 × 7 = 10 × 7 + 3 × 7 = 70 + 21 = 91. Ajouter seulement 3 donnerait 73, ce qui oublie que chaque unité compte 7 fois.",
      "On fait 10 × 7 puis 3 × 7, et on additionne.",
    ),
    tags: ["ce1", "calcul_mental", "distributivite", "methode", "qcm"],
  },
  gab(
    "ce1_calcul_distributivite_tpl_1",
    "ce1_calcul_distributivite",
    5,
    "Coupe le grand facteur en 10 et le reste.",
    ["distributivite"],
    () => {
      const grand = ri(11, 19);
      const petit = ri(2, 9);
      const reste = grand - 10;
      const produit = grand * petit;
      const p = enfant();
      const explication = exp(
        "On peut couper un facteur en deux morceaux plus faciles, puis additionner les deux produits.",
        "On décompose le plus grand facteur en 10 et ce qui dépasse.",
        `${grand} = 10 + ${reste}. Donc ${grand} × ${petit} = 10 × ${petit} + ${reste} × ${petit} = ${10 * petit} + ${reste * petit} = ${produit}.`,
        `${grand} × ${petit} = ${produit}.`,
      );
      const faux = [10 * petit + reste, produit + petit, produit - petit, grand + petit];
      const dessin = pile(0.8) ? dessinBarre({ total: `${grand} × ${petit}`, parts: [{ label: `10 × ${petit}` }, { label: `${reste} × ${petit}` }] }) : undefined;
      const text = rc([
        direCalcul(`${grand} × ${petit}`),
        `${p.nom} a ${petit} boîtes de ${grand} crayons. Combien de crayons a-t-${p.il} ?`,
        `Le petit train a ${petit} wagons de ${grand} enfants. Combien d'enfants en tout ?`,
        `Le chef fait ${petit} plateaux de ${grand} crêpes. Combien de crêpes ?`,
        `${p.nom} range ${petit} étagères de ${grand} livres. Combien de livres ?`,
        `${p.nom} a ${petit} albums de ${grand} pages. Combien de pages en tout ?`,
        `${p.nom} fait ${petit} tours de ${grand} mètres. Combien de mètres court-${p.il} ?`,
        `${p.nom} achète ${petit} paquets de ${grand} billes. Combien de billes ?`,
        `${petit} équipes de ${grand} enfants. Combien d'enfants en tout ?`,
        `${p.nom} colle ${grand} images sur chacune de ses ${petit} pages. Combien d'images ?`,
        `Pic picore ${grand} graines par jour, pendant ${petit} jours. Combien en tout ?`,
        `${p.nom} lit ${grand} pages par jour, pendant ${petit} jours. Combien de pages ?`,
        `Calcule de tête : ${grand} × ${petit}.`,
      ]);
      return nombreOuQcm(text, produit, faux, explication, dessin);
    },
  ),

  /* =========================================================
     CE1_CALCUL_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_calcul_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce1_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Quel calcul est le plus rapide à faire de tête : 48 + 9 ou 48 + 10 - 1 ?",
    format: "qcm",
    choices: [
      "les deux donnent le même résultat, et le second est plus facile",
      "le premier, parce qu'il a moins d'étapes",
      "les deux donnent des résultats différents",
      "aucun des deux ne se fait de tête",
    ],
    expected: ["les deux donnent le même résultat, et le second est plus facile"],
    comparator: "mcq_exact",
    hint: "Ajouter 10 est plus simple qu'ajouter 9.",
    explanation: exp(
      "Une bonne procédure de calcul mental remplace un calcul difficile par deux calculs faciles.",
      "On compare les deux chemins et on garde celui où chaque étape est simple.",
      "48 + 10 = 58, puis 58 - 1 = 57. Et 48 + 9 = 57 aussi. Ajouter une dizaine ne demande aucun effort, enlever 1 non plus.",
      "Les deux donnent 57, et le second chemin est plus facile.",
    ),
    tags: ["ce1", "calcul_mental", "defi", "qcm"],
  },
  gab(
    "ce1_calcul_defi_tpl_1",
    "ce1_calcul_defi",
    5,
    "Deux étapes : chacune est facile.",
    ["defi"],
    () => {
      const p = enfant();
      const famille = rc(["chaine", "mystere_plus", "mystere_moins", "escalier"] as const);
      if (famille === "chaine") {
        const n = ri(30, 300);
        const diz = ri(2, 6) * 10;
        const a9 = rc([9, 19] as const);
        const total = n + diz + a9;
        const explication = exp(
          "On enchaîne deux procédures faciles au lieu d'un calcul difficile.",
          "On ajoute d'abord les dizaines entières, puis on ajoute le nombre rond et on enlève 1.",
          `${n} + ${diz} = ${n + diz}. Puis ${n + diz} + ${a9 + 1} = ${n + diz + a9 + 1}, et on enlève 1 : ${total}.`,
          `Cela fait ${total}.`,
        );
        return nombreOuQcm(
          rc([
            direCalcul(`${n} + ${diz} + ${a9}`),
            `${p.nom} a ${n} images. ${maj(p.il)} en gagne ${diz}, puis encore ${a9}. Combien en a-t-${p.il} ?`,
            `Le train part avec ${n} voyageurs. ${diz} montent, puis ${a9}. Combien sont-ils ?`,
            `${p.nom} a ${n} points. ${maj(p.il)} gagne ${diz} points, puis ${a9}. Combien de points a-t-${p.il} ?`,
          ]),
          total,
          [total + 2, total + 10, total - 10, n + diz + a9 + 1],
          explication,
          pile(0.6) ? dessinBarre({ total: "?", parts: [{ label: "", value: String(n) }, { label: "", value: String(diz) }, { label: "", value: String(a9) }] }) : undefined,
        );
      }
      if (famille === "mystere_plus" || famille === "mystere_moins") {
        const plus = famille === "mystere_plus";
        const k = rc([9, 19, 20, 30] as const);
        const x = ri(25, 300);
        const r = plus ? x + k : x - 9;
        const op = plus ? `j'ajoute ${k}` : "j'enlève 9";
        const explication = exp(
          "Pour retrouver un nombre mystère, on défait ce qui a été fait.",
          plus ? `On enlève ${k} au résultat.` : "On rajoute 9 au résultat : on ajoute 10, puis on enlève 1.",
          plus ? `${r} - ${k} = ${x}. On vérifie : ${x} + ${k} = ${r}.` : `${r} + 9 = ${x}. On vérifie : ${x} - 9 = ${r}.`,
          `Le nombre mystère est ${x}.`,
        );
        return nombreOuQcm(
          rc([
            `${p.nom} pense à un nombre. « Si ${op}, je trouve ${r}. » Quel est son nombre ?`,
            `Devinette : « ${maj(op)} et je trouve ${r}. » Quel est mon nombre ?`,
            `Ti Margo pense à un nombre : « ${maj(op)}, je trouve ${r}. » Lequel ?`,
          ]),
          x,
          plus ? [r + k, x + 1, x - 1, x + 10] : [r - 9, x + 1, x - 1, x - 10],
          explication,
          pile(0.6)
            ? plus
              ? dessinBarre({ total: String(r), parts: [{ label: "", unknown: true }, { label: "", value: String(k) }] })
              : dessinBarre({ total: "?", parts: [{ label: "", value: String(r) }, { label: "", value: "9" }] })
            : undefined,
        );
      }
      const depart = ri(20, 80);
      const pas = rc([10, 20] as const);
      const fin = depart + pas + pas - 1;
      const explication = exp(
        "On suit les étapes dans l'ordre, chacune est facile.",
        "On ajoute les dizaines, puis on enlève 1.",
        `${depart} + ${pas} = ${depart + pas}, puis + ${pas} = ${depart + 2 * pas}, puis - 1 = ${fin}.`,
        `${p.nom} arrive à ${fin}.`,
      );
      return nombreOuQcm(
        rc([
          `${p.nom} part de ${depart}. ${maj(p.il)} ajoute ${pas}, encore ${pas}, puis enlève 1. Où arrive-t-${p.il} ?`,
          `Le robot, à ${depart}, avance de ${pas}, encore ${pas}, puis recule de 1. Où est-il ?`,
        ]),
        fin,
        [fin + 2, fin + 10, depart + 2 * pas, fin - 10],
        explication,
        pile(0.8) ? dessinNombre(depart) : undefined,
      );
    },
  ),
  gab(
    "ce1_calcul_defi_tpl_2",
    "ce1_calcul_defi",
    5,
    "Double, puis double encore.",
    ["defi"],
    () => {
      const p = enfant();
      const famille = rc(["double_double", "moitie_moitie", "double_plus"] as const);
      if (famille === "double_double") {
        const n = ri(11, 60);
        const q = n * 4;
        return nombreOuQcm(
          rc([
            `${p.nom} cherche le double du double de ${n}. Que trouve-t-${p.il} ?`,
            `${p.nom} double ${n}, puis double encore. Que trouve-t-${p.il} ?`,
            `La plante mesure ${n} cm. Elle double, puis double encore. Combien mesure-t-elle ?`,
            `Le magicien double ses ${n} lapins, puis double encore. Combien de lapins ?`,
          ]),
          q,
          [n * 2, q + 2, q - 10, n * 3],
          exp(
            "Doubler deux fois de suite revient à multiplier par quatre.",
            "On calcule le premier double, puis on double le résultat.",
            `Le double de ${n} est ${n * 2}. Le double de ${n * 2} est ${q}.`,
            `Cela fait ${q}.`,
          ),
          pile(0.6) ? dessinBarre({ total: "?", parts: [0, 1, 2, 3].map(() => ({ label: "", value: String(n) })) }) : undefined,
        );
      }
      if (famille === "moitie_moitie") {
        const q = ri(3, 25);
        const n = q * 4;
        return nombreOuQcm(
          rc([
            `${p.nom} cherche la moitié de la moitié de ${n}. Que trouve-t-${p.il} ?`,
            `${p.nom} partage ${n} billes en deux, puis encore en deux. Combien par petit tas ?`,
            `Le gâteau a ${n} framboises. ${p.nom} en garde la moitié, puis la moitié du reste. Combien ?`,
          ]),
          q,
          [n / 2, q + 1, q * 3, q - 1],
          exp(
            "Prendre la moitié deux fois de suite, c'est partager en quatre.",
            "On cherche une première moitié, puis la moitié de ce résultat.",
            `La moitié de ${n} est ${n / 2}. La moitié de ${n / 2} est ${q}.`,
            `Cela fait ${q}.`,
          ),
          n <= 40 && pile(0.6) ? dessinJetons(n) : pile(0.6) ? dessinBarre({ total: String(n), parts: [0, 1, 2, 3].map(() => ({ label: "", unknown: true })) }) : undefined,
        );
      }
      const n = ri(12, 45);
      const k = rc([9, 10, 19] as const);
      const r = n * 2 + k;
      return nombreOuQcm(
        rc([
          `${p.nom} double ${n}, puis ajoute ${k}. Quel nombre trouve-t-${p.il} ?`,
          `Défi de ${p.nom} : double ${n}, puis ajoute ${k}. Quel est le résultat ?`,
          `Pic double ses ${n} graines, puis en trouve ${k}. Combien en a-t-il ?`,
        ]),
        r,
        [n + k, r + 1, r - 1, r + 10],
        exp(
          "On enchaîne deux calculs faciles, dans l'ordre.",
          k === 10 ? "On double, puis on ajoute la dizaine." : `On double, puis on ajoute ${k + 1} et on enlève 1.`,
          `Le double de ${n} est ${n * 2}. Puis ${n * 2} + ${k} = ${r}.`,
          `Cela fait ${r}.`,
        ),
        pile(0.5) ? dessinBarre({ total: "?", parts: [{ label: "", value: String(n) }, { label: "", value: String(n) }, { label: "", value: String(k) }] }) : undefined,
      );
    },
  ),

  /* =========================================================
     COMPLÉMENTS DU 09/08/2026, refaits le 10/11/2026 en familles.
  ========================================================= */
  gab(
    "ce1_calcul_tables_addition_tpl_2",
    "ce1_calcul_tables_addition",
    4,
    "Le signe = se lit dans les deux sens.",
    ["tables", "piege"],
    () => {
      const a = ri(2, 9);
      const b = ri(2, 9);
      const t = a + b;
      const p = enfant();
      const c = chose();
      const explication = exp(
        "Une table d'addition se connaît dans les deux sens : A + B = C, mais aussi C = A + B.",
        "On cherche ce qu'il faut ajouter au nombre connu pour retrouver le total.",
        `${a} et combien font ${t} ? Il faut ${b}, car ${a} + ${b} = ${t}.`,
        `Le nombre cherché est ${b}.`,
      );
      const famille = rc(["egalite", "gagner", "gagner", "dessin", "cachette"] as const);
      if (famille === "egalite") return court(direTrou(rc([`${t} = ${a} + …`, `${t} = … + ${a}`, `${t} - … = ${a}`])), b, explication);
      if (famille === "gagner") {
        return nombreOuQcm(
          rc([
            `${p.nom} a ${a} ${c.pl}. Après la récré, ${p.il} en a ${t}. Combien en a-t-${p.il} gagné ?`,
            `${a} enfants sont dans le bus. D'autres montent : ils sont ${t}. Combien sont montés ?`,
            `L'aquarium a ${a} poissons. On en ajoute : il y en a ${t}. Combien en a-t-on ajouté ?`,
            `${p.nom} avait ${t} ${c.pl}. Il lui en reste ${a}. Combien en a-t-${p.il} donné ?`,
            `${p.nom} avait ${a} points. ${maj(p.il)} en a ${t} maintenant. Combien en a-t-${p.il} gagné ?`,
          ]),
          b,
          [t, b + 1, b - 1, t + a],
          explication,
          pile(0.5) ? dessinJetons(a) : undefined,
        );
      }
      if (famille === "dessin") {
        return nombreOuQcm(
          rc([
            `${p.nom} a posé ces jetons. ${maj(p.il)} en veut ${t}. Combien doit-${p.il} encore en poser ?`,
            `${p.nom} doit avoir ${t} jetons. Voici les siens. Combien lui en manque-t-il ?`,
            `Pic a posé ces jetons. Il en faut ${t}. Combien en manque-t-il ?`,
          ]),
          b,
          [t, b + 1, b - 1, a],
          explication,
          dessinJetons(a),
        );
      }
      return nombreOuQcm(
        rc([
          `Pic cache ${t} graines à deux endroits. ${a} dans le premier. Combien dans l'autre ?`,
          `${p.nom} a ${t} ${c.pl} dans ses poches, ${a} à gauche. Combien à droite ?`,
          `Deux coffres : ${t} pièces d'or en tout, ${a} dans le premier. Combien dans l'autre ?`,
          `${p.nom} range ${t} ${c.pl} dans deux boîtes, ${a} dans la première. Et dans l'autre ?`,
          `${p.nom} et Pic ont ${t} ${c.pl} à eux deux. Pic en a ${a}. Et ${p.nom} ?`,
          `${t} enfants jouent, ${a} dans le sable. Combien sur le toboggan ?`,
        ]),
        b,
        [t, b + 1, b - 1, t + a],
        explication,
      );
    },
  ),
  gab(
    "ce1_calcul_tables_multiplication_tpl_2",
    "ce1_calcul_tables_multiplication",
    3,
    "Les tables du CE1 : 2, 3, 4, 5 et 10.",
    ["tables_multiplication"],
    () => {
      const t = rc([2, 3, 4, 5, 10] as const);
      const k = ri(2, 9);
      const r = t * k;
      const pq = paquet();
      const p = enfant();
      const explication = exp(
        "Les tables de 2, 3, 4, 5 et 10 se restituent de mémoire.",
        "Si le résultat ne vient pas, on compte de table en table.",
        t === 10
          ? `${k} paquets de 10, ce sont ${k} dizaines : ${r}.`
          : `On compte de ${t} en ${t}, ${k} fois : ${Array.from({ length: k }, (_, i) => (i + 1) * t).join(", ")}.`,
        `${k} × ${t} = ${r}.`,
      );
      const faux = [r + t, r - t, t + k, r + 1];
      const famille = rc(["nu", "repete", "situation", "situation", "situation"] as const);
      if (famille === "nu") return nombreOuQcm(direCalcul(rc([`${t} × ${k}`, `${k} × ${t}`])), r, faux, explication);
      if (famille === "repete") {
        const f = Math.min(k, 5);
        return nombreOuQcm(
          direCalcul(Array.from({ length: f }, () => String(t)).join(" + ")),
          t * f,
          [t * f + t, t * f - t, t + f],
          exp(
            "Ajouter plusieurs fois le même nombre, c'est le multiplier.",
            `On compte de ${t} en ${t}.`,
            `${Array.from({ length: f }, (_, i) => (i + 1) * t).join(", ")} : ${f} fois ${t}, c'est ${f} × ${t}.`,
            `Cela fait ${t * f}.`,
          ),
        );
      }
      const dessin = unPaquet(pq, t);
      const text = rc([
        `${p.nom} a ${k} ${pq.des} de ${t} ${pq.quoi}. Combien de ${pq.quoi} en tout ?`,
        `Il y a ${k} ${pq.des}, avec ${t} ${pq.quoi} dans chacun. Combien de ${pq.quoi} ?`,
        `${p.nom} prépare ${k} ${pq.des} de ${t} ${pq.quoi}. Combien en tout ?`,
        `${k} fois ${t} ${pq.quoi}, combien cela fait-il ?`,
      ]);
      return nombreOuQcm(text, r, faux, explication, dessin);
    },
  ),
  gab(
    "ce1_calcul_tables_multiplication_tpl_3",
    "ce1_calcul_tables_multiplication",
    4,
    "Cherche dans la table le nombre qui convient.",
    ["tables_multiplication"],
    () => {
      const t = rc([2, 3, 4, 5, 10] as const);
      const k = ri(2, 9);
      const r = t * k;
      const pq = paquet();
      const p = enfant();
      const explication = exp(
        "Connaître une table dans les deux sens, c'est aussi savoir retrouver un des deux nombres.",
        `On cherche quel nombre, pris ${k} fois, donne ${r}.`,
        `${k} × ${t} = ${r}.`,
        `Le nombre cherché est ${t}.`,
      );
      const famille = rc(["trou", "partage", "partage", "rangs"] as const);
      if (famille === "trou") return court(direTrou(rc([`… × ${k} = ${r}`, `${r} = ${k} × …`])), t, explication);
      if (famille === "rangs") {
        return nombreOuQcm(
          rc([
            `${r} chaises sont rangées en ${k} rangées pareilles. Combien par rangée ?`,
            `Le jardinier plante ${r} salades en ${k} rangs égaux. Combien de salades dans chaque rang ?`,
            `${r} enfants font ${k} équipes pareilles. Combien d'enfants par équipe ?`,
          ]),
          t,
          [k, t + 1, r - k, t - 1],
          explication,
          r <= 40 && pile(0.5) ? dessinJetons(r) : undefined,
        );
      }
      const dessin = pile(0.7) && r <= 40;
      return nombreOuQcm(
        rc([
          `${p.nom} range ${r} ${pq.quoi} dans ${k} ${pq.des}, autant dans chacun. Combien par ${pq.un} ?`,
          `On répartit ${r} ${pq.quoi} dans ${k} ${pq.des}. Combien dans chacun ?`,
          `${k} amis se partagent ${r} ${pq.quoi}, autant chacun. Combien en a chacun ?`,
        ]),
        t,
        [k, t + 1, r - k, t - 1],
        explication,
        dessin ? dessinJetons(r) : undefined,
      );
    },
  ),
  gab(
    "ce1_calcul_faits_tpl_2",
    "ce1_calcul_faits_multiplicatifs",
    4,
    "Quatre paquets de 25 font 100.",
    ["faits_multiplicatifs"],
    () => {
      const p = enfant();
      const famille = rc(["combien_de_fois", "argent", "argent", "suite"] as const);
      if (famille === "combien_de_fois") {
        const f = rc([
          { v: 25, cible: 100, k: 4 },
          { v: 50, cible: 100, k: 2 },
          { v: 20, cible: 100, k: 5 },
          { v: 10, cible: 100, k: 10 },
          { v: 25, cible: 50, k: 2 },
          { v: 25, cible: 75, k: 3 },
          { v: 50, cible: 200, k: 4 },
        ]);
        const explication = exp(
          "Certains produits se retiennent comme des faits, parce qu'ils reviennent tout le temps.",
          `On compte de ${f.v} en ${f.v} jusqu'à ${f.cible}.`,
          `${Array.from({ length: f.k }, (_, i) => (i + 1) * f.v).join(", ")} : ${f.k} fois.`,
          `Il en faut ${f.k}.`,
        );
        return nombreOuQcm(
          rc([
            `Combien de fois ${f.v} faut-il pour faire ${f.cible} ?`,
            `${p.nom} compte de ${f.v} en ${f.v} jusqu'à ${f.cible}. Combien de nombres dit-${p.il} ?`,
            `Pour faire ${f.cible}, combien de paquets de ${f.v} faut-il ?`,
            `La fermière range ${f.cible} œufs par plateaux de ${f.v}. Combien de plateaux remplit-elle ?`,
          ]),
          f.k,
          [f.k + 1, f.k - 1, f.k * 2, f.v],
          explication,
        );
      }
      if (famille === "argent") {
        const f = rc([
          { v: 20, code: "20e", k: ri(2, 5) },
          { v: 10, code: "10e", k: ri(3, 9) },
          { v: 50, code: "50e", k: 2 },
          { v: 5, code: "5e", k: ri(2, 6) },
          { v: 2, code: "2e", k: ri(3, 9) },
        ] as const);
        const s = f.v * f.k;
        return nombreOuQcm(
          rc([
            `Voici l'argent de ${p.nom}. Combien d'euros a-t-${p.il} ?`,
            `Voici la tirelire ${de(p.nom)}. Combien d'euros en tout ?`,
            `${p.nom} a ces billets et ces pièces. Combien d'euros ?`,
          ]),
          s,
          [s + f.v, s - f.v, f.k, s + 10].filter((x) => x > 0),
          exp(
            "Plusieurs billets pareils : on compte de leur valeur en leur valeur.",
            `On compte de ${f.v} en ${f.v}, autant de fois qu'il y a de ${f.v <= 2 ? "pièces" : "billets"}.`,
            `${f.k} × ${f.v} = ${s}.`,
            `Cela fait ${s} €.`,
          ),
          { kind: "monnaie", elements: [{ valeur: f.code, nombre: f.k }] },
          "€",
        );
      }
      const k = ri(1, 6);
      const r = (k + 1) * 25;
      return nombreOuQcm(
        rc([
          `On compte de 25 en 25 : ${Array.from({ length: k }, (_, i) => (i + 1) * 25).join(", ")}… Quel nombre vient ensuite ?`,
          `${p.nom} saute de 25 en 25 : ${Array.from({ length: k }, (_, i) => (i + 1) * 25).join(", ")}. Quel est le saut suivant ?`,
        ]),
        r,
        [r + 25, r - 5, k * 25 + 10, r + 5],
        exp(
          "Les multiples de 25 se retiennent : 25, 50, 75, 100, 125, 150…",
          "On ajoute 25 au dernier nombre.",
          `${k * 25} + 25 = ${r}.`,
          `Le nombre suivant est ${r}.`,
        ),
      );
    },
  ),
  gab(
    "ce1_calcul_doubles_tpl_2",
    "ce1_calcul_doubles_moities",
    4,
    "On te donne le double ou la moitié : cherche le nombre de départ.",
    ["doubles_moities"],
    () => {
      const p = enfant();
      const [a, b] = deuxEnfants();
      if (pile(0.6)) {
        const n = rc([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 40, 50]);
        const d = n * 2;
        const explication = exp(
          "Chercher le nombre dont on connaît le double, c'est chercher sa moitié.",
          "On cherche le nombre qui, ajouté à lui-même, donne le résultat.",
          `${n} + ${n} = ${d}. Le nombre cherché est donc ${n}.`,
          `C'est ${n}.`,
        );
        const c = chose();
        const dessin = d <= 30 && pile(0.5);
        return nombreOuQcm(
          rc([
            `Le double d'un nombre est ${d}. Quel est ce nombre ?`,
            `${p.nom} a doublé sa collection : ${d} ${c.pl}. Combien en avait-${p.il} ?`,
            `${a.nom} en a ${d}, deux fois plus que ${b.nom}. Combien ${b.nom} en a-t-${b.il} ?`,
            `Pic pense à un nombre. Son double est ${d}. Quel est ce nombre ?`,
          ]),
          n,
          [d, n + 1, n - 1, n + 2],
          explication,
          dessin ? dessinQuantite(c, d) : undefined,
        );
      }
      const m = rc([5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 50, 100]);
      const n = m * 2;
      return nombreOuQcm(
        rc([
          `La moitié d'un nombre est ${m}. Quel est ce nombre ?`,
          `${p.nom} a mangé la moitié de ses fraises : ${m}. Combien en avait-${p.il} ?`,
          `${a.nom} et ${b.nom} partagent des billes : ${m} chacun. Combien y en avait-il ?`,
        ]),
        n,
        [m, n + 1, n - 2, m + 10],
        exp(
          "Si on connaît la moitié, on retrouve le nombre en la doublant.",
          "On ajoute la moitié à elle-même.",
          `${m} + ${m} = ${n}.`,
          `Le nombre était ${n}.`,
        ),
        n <= 30 && pile(0.5) ? dessinJetons(m) : undefined,
      );
    },
  ),
  gab(
    "ce1_calcul_complements_tpl_3",
    "ce1_calcul_complements_100",
    4,
    "On complète d'abord les unités, puis les dizaines.",
    ["complements"],
    () => {
      const dizaines = ri(1, 8);
      const unites = ri(1, 9);
      const n = dizaines * 10 + unites;
      const manque = 100 - n;
      const versDizaine = 10 - unites;
      const p = enfant();
      const explication = exp(
        "Le complément à 100 se construit en deux temps.",
        "On complète d'abord les unités jusqu'à la dizaine ronde, puis les dizaines jusqu'à 100.",
        `De ${n}, il faut ${versDizaine} pour atteindre ${n + versDizaine}. Puis ${100 - n - versDizaine} pour atteindre 100. En tout : ${versDizaine} + ${100 - n - versDizaine} = ${manque}.`,
        `Il faut ajouter ${manque}.`,
      );
      const faux = [manque + 10, manque - 10, 100 - dizaines * 10, (10 - dizaines) * 10 + (10 - unites)];
      const famille = rc(["dessin", "dessin", "dessin", "trou", "situation", "situation"] as const);
      if (famille === "dessin") {
        return nombreOuQcm(
          rc([
            `Voici ${n}. Combien ajouter pour faire une plaque de 100 ?`,
            `${p.nom} a construit ${n}. Combien lui manque-t-il pour arriver à 100 ?`,
            `${p.nom} veut savoir combien il manque à ce nombre pour faire 100. Aide-${le(p)} !`,
          ]),
          manque,
          faux,
          explication,
          dessinNombre(n),
        );
      }
      if (famille === "trou") return court(direTrou(rc([`${n} + … = 100`, `100 = ${n} + …`])), manque, explication);
      return nombreOuQcm(
        rc([
          `Le jeu se gagne à 100 points. ${p.nom} a ${n} points. Combien de points lui manque-t-il ?`,
          `Le livre a 100 pages. ${p.nom} en a lu ${n}. Combien en reste-t-il ?`,
          `Le vélo coûte 100 €. ${p.nom} a ${n} €. Combien lui manque-t-il ?`,
          `L'aquarium tient 100 poissons. Il y en a ${n}. Combien en ajouter ?`,
          `La course fait 100 mètres. ${p.nom} a couru ${n} mètres. Combien reste-t-il ?`,
        ]),
        manque,
        faux,
        explication,
      );
    },
  ),
  gab(
    "ce1_calcul_dizaines_tpl_2",
    "ce1_calcul_dizaines_centaines",
    4,
    "Ajouter ou retirer 10 ne change que le chiffre des dizaines (sauf s'il passe 9).",
    ["dizaines_centaines", "piege"],
    () => {
      const centaines = ri(3, 9);
      const dizaines = ri(0, 9);
      const unites = ri(0, 9);
      const n = centaines * 100 + dizaines * 10 + unites;
      const pas = rc([10, 100] as const);
      const ajoute = n + pas <= 999 ? pile() : false;
      const r = ajoute ? n + pas : n - pas;
      const p = enfant();
      const explication = exp(
        `${ajoute ? "Ajouter" : "Retirer"} ${pas}, c'est ${ajoute ? "ajouter" : "retirer"} ${pas === 10 ? "une dizaine" : "une centaine"}.`,
        `On change le chiffre des ${pas === 10 ? "dizaines" : "centaines"} de un, sans toucher aux autres chiffres.`,
        pas === 10 && (ajoute ? dizaines === 9 : dizaines === 0)
          ? `Ici le chiffre des dizaines ${ajoute ? "était déjà à 9 : la dizaine de plus fait changer les centaines" : "était à 0 : il faut casser une centaine"}. On obtient ${r}.`
          : `${n} ${ajoute ? "+" : "-"} ${pas} = ${r} : seul le chiffre des ${pas === 10 ? "dizaines" : "centaines"} a bougé.`,
        `${n} ${ajoute ? "+" : "-"} ${pas} = ${r}.`,
      );
      const faux = [ajoute ? n + 1 : n - 1, ajoute ? r + pas : r - pas, ajoute ? n + (pas === 10 ? 100 : 10) : n - (pas === 10 ? 100 : 10)];
      const famille = rc(["nu", "apres", "dessin", "situation"] as const);
      if (famille === "nu") return nombreOuQcm(direCalcul(`${n} ${ajoute ? "+" : "-"} ${pas}`), r, faux, explication, pile(0.5) ? dessinNombre(n) : undefined);
      if (famille === "apres") {
        return nombreOuQcm(
          rc([
            `Quel nombre a ${pas} de ${ajoute ? "plus" : "moins"} que ${n} ?`,
            `${p.nom} part de ${n} et fait un bond de ${pas} ${ajoute ? "en avant" : "en arrière"}. Où arrive-t-${p.il} ?`,
            `Compte de ${pas} en ${pas} ${ajoute ? "en avançant" : "en reculant"} : ${n}, … Quel nombre vient ensuite ?`,
          ]),
          r,
          faux,
          explication,
          pile(0.4) ? dessinNombre(n) : undefined,
        );
      }
      if (famille === "dessin") {
        return nombreOuQcm(
          rc([
            `Voici ${n} en matériel. On ${ajoute ? "ajoute" : "enlève"} ${pas === 10 ? "une barre" : "une plaque"}. Quel nombre obtient-on ?`,
            `${p.nom} a construit ${n}. ${maj(p.il)} ${ajoute ? "ajoute" : "enlève"} ${pas === 10 ? "une barre" : "une plaque"}. Quel nombre obtient-${p.il} ?`,
          ]),
          r,
          faux,
          explication,
          dessinNombre(n),
        );
      }
      return nombreOuQcm(
        rc([
          `Le château de cartes a ${n} cartes. ${p.nom} ${ajoute ? "en ajoute" : "en retire"} ${pas}. Combien de cartes ?`,
          `${p.nom} a ${n} points. ${maj(p.il)} ${ajoute ? "gagne" : "perd"} ${pas} points. Combien de points a-t-${p.il} ?`,
          `La bibliothèque a ${n} livres. On ${ajoute ? "en achète" : "en donne"} ${pas}. Combien de livres ?`,
        ]),
        r,
        faux,
        explication,
        pile(0.5) ? dessinNombre(n) : undefined,
      );
    },
  ),
  gab(
    "ce1_calcul_dizaines_tpl_3",
    "ce1_calcul_dizaines_centaines",
    4,
    "Compte en dizaines : les unités ne bougent pas.",
    ["dizaines_centaines"],
    () => {
      const dizaines = ri(3, 9);
      const unites = ri(1, 9);
      const n = dizaines * 10 + unites;
      const k = ri(1, dizaines - 1);
      const pas = k * 10;
      const r = n - pas;
      const p = enfant();
      const c = chose();
      const explication = exp(
        "Retirer un nombre entier de dizaines ne touche pas au chiffre des unités.",
        "On compte en dizaines : on retire les dizaines aux dizaines.",
        `${pas}, c'est ${k} ${k > 1 ? "dizaines" : "dizaine"}. ${n} en a ${dizaines}. ${dizaines} - ${k} = ${dizaines - k}. Les ${unites} unités ne bougent pas : ${r}.`,
        `${n} - ${pas} = ${r}.`,
      );
      const faux = [n - k, r + 10, r - 10, r + 1];
      const famille = rc(["nu", "dessin", "dessin", "situation"] as const);
      if (famille === "nu") return nombreOuQcm(direCalcul(`${n} - ${pas}`), r, faux, explication);
      if (famille === "dessin") {
        return nombreOuQcm(
          rc([
            `Voici ${n} en barres et en cubes. On enlève ${pl(k, "barre", "barres")}. Quel nombre reste-t-il ?`,
            `${p.nom} a construit ${n}. ${maj(p.il)} retire ${pl(k, "barre", "barres")}. Quel nombre maintenant ?`,
          ]),
          r,
          faux,
          explication,
          dessinNombre(n),
        );
      }
      return nombreOuQcm(
        rc([
          `${p.nom} a ${n} ${c.pl}. ${maj(p.il)} en donne ${k} ${k > 1 ? "paquets" : "paquet"} de 10. Combien lui en reste-t-il ?`,
          `Le marchand a ${n} œufs. Il vend ${k} ${k > 1 ? "boîtes" : "boîte"} de 10. Combien d'œufs lui reste-t-il ?`,
          `${p.nom} compte ${n} enfants dans la cour. ${pas} rentrent en classe. Combien restent dans la cour ?`,
        ]),
        r,
        faux,
        explication,
      );
    },
  ),
  gab(
    "ce1_calcul_multiplier_10_tpl_2",
    "ce1_calcul_multiplier_10",
    5,
    "Chaque chiffre monte d'un rang : les unités deviennent des dizaines.",
    ["multiplier_10", "piege"],
    () => {
      const d = ri(1, 9);
      const u = ri(1, 9);
      const n = d * 10 + u;
      const r = n * 10;
      const p = enfant();
      const dessin = pile(0.45) ? dessinNombre(n) : undefined;
      const voici = dessin ? `Voici ${n} en matériel. ` : "";
      const famille = rc(["unites", "dizaines", "chiffre_unites", "chiffre_centaines"] as const);
      const explication = exp(
        "Multiplier par 10, ce n'est pas « ajouter un zéro » : c'est faire monter chaque chiffre d'un rang.",
        "On regarde où se retrouve chaque chiffre dans le résultat.",
        `${n} × 10 = ${r}. Les ${u} unités deviennent ${u} dizaines, et les ${d} dizaines deviennent ${d} centaines. Le zéro au bout dit qu'il n'y a plus d'unités.`,
        `${n} × 10 = ${r}.`,
      );
      if (famille === "unites" || famille === "dizaines") {
        const chiffre = famille === "unites" ? u : d;
        const bonne = famille === "unites" ? `${chiffre} dizaines` : `${chiffre} centaines`;
        return qcmTexte(
          rc([
            `${voici}${p.nom} multiplie ${n} par 10. Que deviennent les ${chiffre} ${famille === "unites" ? "unités" : "dizaines"} ?`,
            `${voici}Quand on multiplie ${n} par 10, les ${chiffre} ${famille === "unites" ? "unités" : "dizaines"} deviennent…`,
            `${voici}Pic fait ${n} × 10. Que deviennent les ${chiffre} ${famille === "unites" ? "unités" : "dizaines"} ?`,
          ]),
          bonne,
          famille === "unites"
            ? [`${chiffre} unités`, `${chiffre} centaines`, `${chiffre * 10} centaines`]
            : [`${chiffre} dizaines`, `${chiffre} unités`, `${chiffre * 10} dizaines`],
          explication,
          dessin,
        );
      }
      if (famille === "chiffre_unites") {
        return court(
          rc([
            `${voici}${p.nom} se demande : quel est le chiffre des unités de ${n} × 10 ?`,
            `${voici}${p.nom} calcule ${n} × 10. Quel chiffre écrit-${p.il} aux unités ?`,
          ]),
          0,
          explication,
          dessin,
        );
      }
      return nombreOuQcm(
        rc([
          `${voici}${p.nom} se demande : quel est le chiffre des centaines de ${n} × 10 ?`,
          `${voici}${p.nom} calcule ${n} × 10. Quel chiffre écrit-${p.il} aux centaines ?`,
        ]),
        d,
        [u, 0, d + 1, 1].filter((x) => x !== d),
        explication,
        dessin,
      );
    },
  ),
  gab(
    "ce1_calcul_multiplier_10_tpl_3",
    "ce1_calcul_multiplier_10",
    4,
    "Combien de dizaines y a-t-il dans ce nombre ?",
    ["multiplier_10"],
    () => {
      const n = ri(2, 99);
      const r = n * 10;
      const p = enfant();
      const explication = exp(
        "Un nombre multiplié par 10 compte des dizaines.",
        "On cherche combien de dizaines il y a dans le résultat.",
        `${r}, c'est ${n} dizaines. On vérifie : ${n} × 10 = ${r}.`,
        `Le nombre cherché est ${n}.`,
      );
      const faux = [n + 1, n * 10 > 100 ? Math.floor(n / 10) : n + 10, r, n - 1];
      const famille = rc(["trou", "paquets", "dizaines", "dessin", "dessin"] as const);
      if (famille === "trou") return court(direTrou(rc([`… × 10 = ${r}`, `10 × … = ${r}`, `${r} = … × 10`])), n, explication);
      if (famille === "dizaines") return nombreOuQcm(rc([`Combien de dizaines en tout dans ${r} ?`, `${p.nom} demande : « ${r}, c'est combien de dizaines ? »`, `${p.nom} fait ${r} avec des barres de dix. Combien de barres ?`]), n, faux, explication, pile(0.5) ? dessinNombre(r) : undefined);
      if (famille === "dessin") {
        return nombreOuQcm(
          rc([`Une plaque vaut 10 barres. Combien de barres de dix pour faire ce nombre ?`, `Voici les ${r} cubes de ${p.nom}. Combien de paquets de 10 ?`]),
          n,
          faux,
          explication,
          dessinNombre(r),
        );
      }
      return nombreOuQcm(
        rc([
          `${p.nom} range ${r} images par paquets de 10. Combien de paquets fait-${p.il} ?`,
          `${p.nom} range ${r} œufs par boîtes de 10. Combien de boîtes ?`,
          `${r} enfants remplissent des minibus de 10 places. Combien de minibus ?`,
          `Pic mange 10 graines par jour. Il en a ${r}. Pour combien de jours ?`,
        ]),
        n,
        faux,
        explication,
      );
    },
  ),
  gab(
    "ce1_calcul_ajouter_9_tpl_2",
    "ce1_calcul_ajouter_9_19_29_39",
    5,
    "On a ajouté un de trop : il faut le reprendre.",
    ["ajouter_9", "piege"],
    () => {
      const n = pile(0.5) ? ri(40, 399) : ri(400, 800);
      const a = rc([9, 19, 29] as const);
      const barre = () => dessinBarre({ total: "?", parts: [{ label: "", value: String(n) }, { label: "", value: String(a) }] });
      const rond = a + 1;
      const p = enfant();
      const explication = exp(
        `Ajouter ${a}, c'est ajouter ${rond} puis retirer 1.`,
        "On regarde ce qu'on a ajouté en trop.",
        `Il fallait ajouter ${a}. En ajoutant ${rond}, on ajoute 1 de trop : on le retire. ${n} + ${rond} = ${n + rond}, puis ${n + rond} - 1 = ${n + a}.`,
        `${n} + ${a} = ${n + a}.`,
      );
      const famille = rc(["ensuite", "meme", "erreur", "calcul"] as const);
      if (famille === "ensuite") {
        return qcmTexte(
          rc([
            `Pour calculer ${n} + ${a}, ${p.nom} commence par ${n} + ${rond} = ${n + rond}. Que doit-${p.il} faire ensuite ?`,
            `${p.nom} veut ajouter ${a} à ${n}. ${maj(p.il)} a déjà ajouté ${rond}. Que lui reste-t-il à faire ?`,
          ]),
          "retirer 1",
          ["ajouter 1", "retirer 10", "ajouter 10", "rien, c'est fini"],
          explication,
          n < 400 ? dessinNombre(n) : undefined,
        );
      }
      if (famille === "meme") {
        return qcmTexte(
          rc([`${p.nom} se demande quel calcul donne le même résultat que ${n} + ${a}. Lequel ?`, `${p.nom} cherche un calcul plus facile que ${n} + ${a}. Lequel donne le même résultat ?`]),
          `${n} + ${rond} - 1`,
          [`${n} + ${rond} + 1`, `${n} + ${rond} - 10`, `${n} - ${rond} + 1`],
          explication,
        );
      }
      if (famille === "erreur") {
        const faux = n + rond + 1;
        return court(
          rc([
            `${p.nom} fait ${n} + ${a} : + ${rond}, puis + 1. ${maj(p.il)} trouve ${faux}. Le bon résultat ?`,
            `Pic : ${n} + ${a} = ${faux}. Il a ajouté 1 au lieu de l'enlever. Le bon résultat ?`,
          ]),
          n + a,
          explication,
          pile(0.6) ? barre() : undefined,
        );
      }
      return nombreOuQcm(
        rc([
          direCalcul(`${n} + ${a}`),
          `Le compteur du train affiche ${n} km. Le train roule encore ${a} km. Et maintenant ?`,
          `${p.nom} a ${n} points au jeu. ${maj(p.il)} gagne ${a} points. Combien de points a-t-${p.il} ?`,
          `La collection de ${p.nom} a ${n} timbres. ${maj(p.il)} en reçoit ${a}. Combien en a-t-${p.il} ?`,
        ]),
        n + a,
        [n + rond + 1, n + rond, n + a - 10, n + a + 10],
        explication,
        pile(0.5) ? barre() : undefined,
      );
    },
  ),
  gab(
    "ce1_calcul_soustraire_9_tpl_2",
    "ce1_calcul_soustraire_9",
    5,
    "Retirer 9, c'est retirer 10 puis rendre 1.",
    ["soustraire_9"],
    () => {
      const n = pile(0.4) ? ri(1, 9) * 100 + ri(0, 8) : pile(0.5) ? ri(100, 399) : ri(400, 900);
      const r = n - 9;
      const p = enfant();
      const barre = () => dessinBarre({ total: String(n), parts: [{ label: "", unknown: true }, { label: "", value: "9" }] });
      const explication = exp(
        "Retirer 9, c'est retirer une dizaine puis rendre l'unité prise en trop.",
        "On retire 10, puis on ajoute 1.",
        `${n} - 10 = ${n - 10}, puis ${n - 10} + 1 = ${r}.`,
        `${n} - 9 = ${r}.`,
      );
      const famille = rc(["ensuite", "erreur", "calcul", "calcul"] as const);
      if (famille === "ensuite") {
        return qcmTexte(
          rc([
            `Pour calculer ${n} - 9, ${p.nom} fait d'abord ${n} - 10 = ${n - 10}. Que doit-${p.il} faire ensuite ?`,
            `${p.nom} veut enlever 9 à ${n}. ${maj(p.il)} a déjà enlevé 10. Que lui reste-t-il à faire ?`,
          ]),
          "ajouter 1",
          ["enlever 1", "enlever 10", "ajouter 10", "rien, c'est fini"],
          explication,
          n < 400 ? dessinNombre(n) : undefined,
        );
      }
      if (famille === "erreur") {
        return court(
          rc([
            `${p.nom} fait ${n} - 9 : - 10, puis - 1. ${maj(p.il)} trouve ${n - 11}. Le bon résultat ?`,
            `Pic : ${n} - 9 = ${n - 11}. Il a enlevé 1 au lieu de le rendre. Le bon résultat ?`,
          ]),
          r,
          explication,
          pile(0.6) ? barre() : undefined,
        );
      }
      return nombreOuQcm(
        rc([
          direCalcul(`${n} - 9`),
          `La bibliothèque a ${n} livres. On en emprunte 9. Combien en reste-t-il ?`,
          `Le dragon de ${p.nom} a ${n} écailles dorées. Il en perd 9. Combien lui en reste-t-il ?`,
          `${p.nom} a ${n} points au jeu. ${maj(p.il)} perd 9 points. Combien de points lui reste-t-il ?`,
          `${p.nom} est à la page ${n}. ${maj(p.il)} revient 9 pages en arrière. À quelle page est-${p.il} ?`,
        ]),
        r,
        [n - 11, n - 10, r + 10, r - 10],
        explication,
        pile(0.5) ? barre() : undefined,
      );
    },
  ),
  gab(
    "ce1_calcul_soustraire_inf9_tpl_2",
    "ce1_calcul_soustraire_inferieur_9",
    5,
    "Il faut casser une dizaine : les unités ne suffisent pas.",
    ["soustraire_inferieur_9", "piege"],
    () => {
      const centaines = pile(0.5) ? ri(1, 3) : ri(4, 9);
      const dizaines = ri(1, 9);
      const n = centaines * 100 + dizaines * 10;
      const b = ri(1, 9);
      const r = n - b;
      const p = enfant();
      const explication = exp(
        "Quand il n'y a pas assez d'unités pour retirer, on casse une dizaine.",
        "On transforme une dizaine en dix unités, puis on retire.",
        `${n} n'a aucune unité. On casse une dizaine : il reste ${dizaines - 1} ${dizaines - 1 > 1 ? "dizaines" : "dizaine"} et 10 unités. 10 - ${b} = ${10 - b}. On obtient ${r}.`,
        `${n} - ${b} = ${r}.`,
      );
      const faux = [n - 10 + b, r + 10, n - b * 10, r - 1].filter((x) => x !== r);
      const famille = rc(["calcul", "situation", "dessin"] as const);
      const barre = () => dessinBarre({ total: String(n), parts: [{ label: "", unknown: true }, { label: "", value: String(b) }] });
      if (famille === "dessin" && n < 400) {
        return nombreOuQcm(
          rc([`Voici ${n}. ${p.nom} enlève ${b} cubes : il faut casser une barre. Que reste-t-il ?`, `${p.nom} a construit ${n}. ${maj(p.il)} retire ${b} cubes. Quel nombre reste-t-il ?`]),
          r,
          faux,
          explication,
          dessinNombre(n, { echange: "unites" }),
        );
      }
      if (famille === "situation") {
        return nombreOuQcm(
          rc([
            `La boulangère a ${n} croissants. Elle en vend ${b} à ${p.nom}. Combien lui en reste-t-il ?`,
            `${p.nom} a ${n} € dans sa tirelire. ${maj(p.il)} dépense ${b} €. Combien lui reste-t-il ?`,
            `${p.nom} compte ${n} spectateurs au cirque. ${b} partent avant la fin. Combien restent ?`,
            `Le livre a ${n} pages. ${p.nom} est à ${b} pages de la fin. Quelle page ?`,
          ]),
          r,
          faux,
          explication,
          pile(0.5) ? barre() : undefined,
        );
      }
      return nombreOuQcm(direCalcul(`${n} - ${b}`), r, faux, explication, pile(0.5) ? barre() : undefined);
    },
  ),
  gab(
    "ce1_calcul_moitie_tpl_2",
    "ce1_calcul_moitie_nombre_pair",
    4,
    "Un nombre impair ne se partage pas en deux parts égales.",
    ["moitie", "piege"],
    () => {
      const pair = pile();
      const petit = pile(0.5);
      const n = petit ? (pair ? ri(3, 15) * 2 : ri(3, 14) * 2 + 1) : pair ? ri(16, 49) * 2 : ri(16, 49) * 2 + 1;
      const [a, b] = deuxEnfants();
      const c = chose();
      const explication = exp(
        "Seuls les nombres pairs se partagent en deux parts égales, sans reste.",
        "On regarde le chiffre des unités : 0, 2, 4, 6 ou 8 annonce un nombre pair.",
        pair
          ? `${n} se termine par ${n % 10} : il est pair. Sa moitié est ${n / 2}, car ${n / 2} + ${n / 2} = ${n}.`
          : `${n} se termine par ${n % 10} : il est impair. En deux tas, on aurait ${Math.floor(n / 2)} et ${Math.ceil(n / 2)} : il en reste toujours un.`,
        pair ? `Oui, chacun en aura ${n / 2}.` : "Non, il en restera un.",
      );
      const bonne = pair ? "oui" : "non";
      if (petit && pile(0.7)) {
        return qcmTexte(
          rc([
            `${a.nom} et ${b.nom} partagent ces billes sans reste. Est-ce possible ?`,
            `${a.nom} peut-${a.il} partager ces jetons en deux tas pareils ?`,
            `Pic veut faire deux tas pareils avec ces graines. Peut-il ?`,
            `${a.nom} range ces jetons deux par deux. Chacun aura-t-il un copain ?`,
          ]),
          bonne,
          [pair ? "non" : "oui"],
          explication,
          dessinJetons(n),
        );
      }
      return qcmTexte(
        rc([
          `${a.nom} et ${b.nom} partagent ${n} ${c.pl} sans reste. Est-ce possible ?`,
          `${a.nom} peut-${a.il} partager ${n} ${c.pl} en deux parts égales ?`,
          `${a.nom} demande : « ${n} est-il un nombre pair ? » Que réponds-tu ?`,
          `Pic a ${n} graines. Peut-il faire deux tas pareils ?`,
        ]),
        bonne,
        [pair ? "non" : "oui"],
        explication,
        n < 100 && pile(0.5) ? dessinNombre(n) : undefined,
      );
    },
  ),
  gab(
    "ce1_calcul_distributivite_tpl_2",
    "ce1_calcul_distributivite",
    5,
    "Le nombre est coupé en 10 et le reste : il y a deux morceaux à calculer.",
    ["distributivite"],
    () => {
      const unites = ri(1, 9);
      const n = 10 + unites;
      const k = ri(2, 9);
      const dix = 10 * k;
      const morceau = unites * k;
      const p = enfant();
      const explication = exp(
        "Multiplier une somme, c'est multiplier chaque morceau puis réunir.",
        "On calcule les deux morceaux, puis on les additionne.",
        `${n} = 10 + ${unites}. 10 × ${k} = ${dix} et ${unites} × ${k} = ${morceau}. On réunit : ${dix} + ${morceau} = ${dix + morceau}.`,
        `${n} × ${k} = ${dix + morceau}.`,
      );
      const famille = rc(["final", "morceau", "decoupage"] as const);
      if (famille === "final") {
        return nombreOuQcm(
          rc([
            `${n} × ${k} : on coupe ${n} en 10 + ${unites}. 10 × ${k} = ${dix}. Le résultat ?`,
            `${p.nom} calcule ${n} × ${k}. ${maj(p.il)} a déjà 10 × ${k} = ${dix}. Le résultat ?`,
            `Aide : 10 × ${k} = ${dix}. Combien fait ${n} × ${k} ?`,
            `Pic sait que 10 × ${k} = ${dix}. Combien fait ${n} × ${k} ?`,
            `${p.nom} coupe ${n} en 10 + ${unites}. Combien fait ${n} × ${k} ?`,
          ]),
          dix + morceau,
          [dix + unites, dix + morceau + k, dix + morceau - k, morceau],
          explication,
          pile(0.6) ? dessinBarre({ total: `${n} × ${k}`, parts: [{ label: `10 × ${k}`, value: String(dix) }, { label: `${unites} × ${k}`, unknown: true }] }) : undefined,
        );
      }
      if (famille === "morceau") {
        return court(
          rc([
            `${n} × ${k} en deux morceaux : 10 × ${k}, puis ${unites} × ${k}. Combien vaut le deuxième ?`,
            `${p.nom} écrit ${n} × ${k} = 10 × ${k} + ${unites} × ${k}. Combien vaut ${unites} × ${k} ?`,
            `Dans ${n} × ${k}, combien vaut le morceau ${unites} × ${k} ?`,
            `Pic coupe ${n} × ${k} en 10 × ${k} et ${unites} × ${k}. Combien vaut ${unites} × ${k} ?`,
          ]),
          morceau,
          explication,
          pile(0.5) ? dessinBarre({ total: `${n} × ${k}`, parts: [{ label: `10 × ${k}` }, { label: `${unites} × ${k}`, unknown: true }] }) : undefined,
        );
      }
      return qcmTexte(
        rc([`Quel découpage est juste pour calculer ${n} × ${k} ?`, `${p.nom} calcule ${n} × ${k} de tête. Quel découpage faire ?`, `Pic veut calculer ${n} × ${k}. Quel découpage est juste ?`, `Comment couper ${n} × ${k} pour le calculer de tête ?`]),
        `10 × ${k} + ${unites} × ${k}`,
        [`10 × ${k} + ${unites}`, `10 + ${unites} × ${k}`, `${n} + ${k}`],
        explication,
      );
    },
  ),
];
