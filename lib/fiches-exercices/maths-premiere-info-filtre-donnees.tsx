// ─── Fiche d'exercices : filtrer des données, ET, OU, NON (1re, sans spé) ────
//                              20 exercices corrigés
//
// Chapitre « Analyse de l'information chiffrée » (BOP1IC), 28/09/2026 : une
// feuille par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/information-chiffree.bank.ts`
// (items `info_filtre_*`).
//
// ⭐ TROIS DESSINS POUR UN MÊME GESTE : le FICHIER (une feuille de calcul, une
// ligne par individu, les lignes gardées surlignées), le TABLEAU CROISÉ (ET =
// une case, OU = une ligne et une colonne, NON = le reste) et le DIAGRAMME DE
// VENN (`venn` de figures.tsx : A seul, commun, B seul, dehors). Le même filtre
// se lit sur les trois ; le piège du OU — compter deux fois l'intersection —
// se VOIT sur le Venn.
//
// ⭐ Frédéric, 28/09 : du visuel, et des contextes d'économie, d'écologie, de
// sport, de nature, de physique et d'histoire-géo. Les effectifs sont des
// MODÈLES inventés, jamais des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-info-filtre-donnees.mjs` —
// il APPLIQUE chaque filtre aux fichiers relus dans le source.
//
// Micro-compétences : info_filtre_sous_ensemble (1, 10, 15, 16, 17),
// info_filtre_et (2, 5, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19),
// info_filtre_ou (3, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20),
// info_filtre_non (4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20),
// info_filtre_effectif (5, 6, 7, 8, 9, 11, 12, 13, 14, 17, 18, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableauProba, venn } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

type Cellule = string | number;
const affiche = (v: Cellule) => (typeof v === "number" ? String(v).replace(".", ",").replace("-", "−") : v);

/**
 * Un FICHIER DE DONNÉES vu dans le tableur : colonnes A, B, C…, lignes
 * numérotées, la ligne 1 porte les titres. `surligne` : des lignes entières
 * (« 3 ») ou des cellules (« B3 ») — les individus que le filtre GARDE.
 * ⛔ Texte NU (HTML, pas KaTeX) ; défilement horizontal sur téléphone.
 */
const feuille = (lignes: Cellule[][], opts: { surligne?: string[] } = {}) => {
  const nbCol = Math.max(...lignes.map((l) => l.length));
  const lettres = Array.from({ length: nbCol }, (_, j) => String.fromCharCode(65 + j));
  const surligne = opts.surligne ?? [];
  return (
    <div className="mx-auto w-full max-w-[24rem] overflow-x-auto print:max-w-[16rem] print:overflow-visible">
      <table className="w-full border-collapse text-center font-mono text-[13px] print:text-[9px]">
        <thead>
          <tr>
            <th className="w-7 border border-slate-300 bg-slate-100" />
            {lettres.map((l) => (
              <th key={l} className="border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-semibold text-slate-600">
                {l}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lignes.map((ligne, i) => (
            <tr key={i}>
              <th className="border border-slate-300 bg-slate-100 px-1 py-0.5 font-semibold text-slate-600">{i + 1}</th>
              {lettres.map((col, j) => {
                const on = surligne.includes(`${col}${i + 1}`) || surligne.includes(String(i + 1));
                return (
                  <td
                    key={j}
                    className={`whitespace-nowrap border border-slate-300 px-1.5 py-0.5 text-slate-800 ${i === 0 ? "font-semibold" : ""} ${on ? "bg-amber-100 font-bold" : ""}`}
                  >
                    {affiche(ligne[j] ?? "")}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const exercicesInfoFiltreDonneesPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "info-filtre-donnees",
  titre: "Filtrer des données : ET, OU, NON",
  accroche:
    "Vingt exercices pour filtrer un fichier de données : garder les individus qui vérifient un critère, combiner deux critères avec ET, OU, NON, et retrouver l'effectif dans un tableau croisé ou un diagramme de Venn. Randonnées, refuge animalier, voitures, club d'escalade, niveau sonore, élections, station de ski : un rappel de cours avant chaque niveau, et une correction étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un filtre par exercice : on garde les bonnes lignes, on les compte.",
      rappel: [
        "Filtrer un fichier, c'est ne garder que les individus (les lignes) qui vérifient un critère.",
        "A ET B : les deux à la fois. A OU B : au moins l'un des deux, les deux compris. NON A : tous ceux qui ne vérifient pas A.",
        "Dans un tableau croisé : ET, c'est UNE case ; OU, c'est une ligne plus une colonne, moins leur case commune (sinon elle compte deux fois) ; NON, c'est le total moins la ligne ou la colonne.",
        "Les bornes : « au moins $10$ » veut dire $\\geqslant 10$ ; « moins de $10$ » veut dire $< 10$.",
      ],
      exercices: [
        {
          enonce:
            "Un office de tourisme range ses sentiers de randonnée dans un fichier. On filtre les sentiers d'au moins $10$ km. Lesquels garde-t-on ? Combien sont-ils ?",
          figure: feuille([
            ["Sentier", "Distance (km)", "Dénivelé (m)", "Chiens admis"],
            ["Lac", 8, 400, "oui"],
            ["Col", 14, 900, "non"],
            ["Cascade", 6, 250, "non"],
            ["Crête", 12, 1100, "non"],
            ["Forêt", 10, 300, "oui"],
            ["Pic", 16, 1300, "oui"],
            ["Vallon", 5, 150, "oui"],
            ["Refuge", 11, 700, "non"],
          ]),
          correction:
            "On parcourt la colonne B et on garde chaque ligne où la distance vaut $10$ km ou plus.\nOn garde : Col ($14$), Crête ($12$), Forêt ($10$), Pic ($16$) et Refuge ($11$).\nLe filtre renvoie $5$ sentiers.\n⚠️ « Au moins $10$ » COMPREND $10$ : la Forêt, à $10$ km pile, est gardée.",
          schema: ecranSeulement(
            feuille(
              [
                ["Sentier", "Distance (km)", "Dénivelé (m)", "Chiens admis"],
                ["Lac", 8, 400, "oui"],
                ["Col", 14, 900, "non"],
                ["Cascade", 6, 250, "non"],
                ["Crête", 12, 1100, "non"],
                ["Forêt", 10, 300, "oui"],
                ["Pic", 16, 1300, "oui"],
                ["Vallon", 5, 150, "oui"],
                ["Refuge", 11, 700, "non"],
              ],
              { surligne: ["3", "5", "6", "7", "9"] },
            ),
          ),
          micros: ["info_filtre_sous_ensemble"],
        },
        {
          enonce:
            "Même fichier qu'à l'exercice 1. On filtre les sentiers d'au moins $10$ km ET où les chiens sont admis. Combien en reste-t-il ?",
          correction:
            "ET : il faut les deux conditions à la fois.\nParmi les $5$ sentiers d'au moins $10$ km (Col, Crête, Forêt, Pic, Refuge), on ne garde que ceux où les chiens sont admis : Forêt et Pic.\nLe filtre renvoie $2$ sentiers.\n⭐ Un filtre ET se fait en deux passes : le premier critère, puis le second sur ce qui reste. Il ne peut que RÉDUIRE.",
          schema: ecranSeulement(
            feuille(
              [
                ["Sentier", "Distance (km)", "Dénivelé (m)", "Chiens admis"],
                ["Lac", 8, 400, "oui"],
                ["Col", 14, 900, "non"],
                ["Cascade", 6, 250, "non"],
                ["Crête", 12, 1100, "non"],
                ["Forêt", 10, 300, "oui"],
                ["Pic", 16, 1300, "oui"],
                ["Vallon", 5, 150, "oui"],
                ["Refuge", 11, 700, "non"],
              ],
              { surligne: ["6", "7"] },
            ),
          ),
          micros: ["info_filtre_et"],
        },
        {
          enonce:
            "Même fichier qu'à l'exercice 1. On filtre les sentiers de moins de $500$ m de dénivelé OU où les chiens sont admis. Combien en garde-t-on ?",
          correction:
            "Moins de $500$ m de dénivelé : Lac, Cascade, Forêt, Vallon, soit $4$ sentiers.\nChiens admis : Lac, Forêt, Pic, Vallon, soit $4$ sentiers.\nLac, Forêt et Vallon sont dans les DEUX listes : on ne les compte qu'une fois.\nLe filtre renvoie $4 + 4 - 3 = 5$ sentiers : Lac, Cascade, Forêt, Vallon, Pic.\n⚠️ $4 + 4 = 8$ est faux : on aurait compté trois sentiers deux fois. Sur le diagramme, la zone du milieu appartient aux deux cercles.",
          schema: venn(
            { aSeul: ["Cascade"], commun: ["Lac", "Forêt", "Vallon"], bSeul: ["Pic"], dehors: ["Col, Crête, Refuge"] },
            { a: "D < 500 m", b: "chiens", e: "8 sentiers" },
            "union",
          ),
          micros: ["info_filtre_ou"],
        },
        {
          enonce: "Même fichier qu'à l'exercice 1. On filtre les sentiers où les chiens ne sont PAS admis. Combien en garde-t-on ?",
          correction:
            "NON : on garde tous les autres.\nLes chiens sont admis sur $4$ sentiers (Lac, Forêt, Pic, Vallon). Le fichier en compte $8$.\nLe filtre renvoie $8 - 4 = 4$ sentiers : Col, Cascade, Crête, Refuge.\n⭐ Un filtre et son contraire se partagent TOUT le fichier : $4 + 4 = 8$.\nSur le fichier, les lignes gardées sont surlignées.",
          schema: ecranSeulement(
            feuille(
              [
                ["Sentier", "Distance (km)", "Dénivelé (m)", "Chiens admis"],
                ["Lac", 8, 400, "oui"],
                ["Col", 14, 900, "non"],
                ["Cascade", 6, 250, "non"],
                ["Crête", 12, 1100, "non"],
                ["Forêt", 10, 300, "oui"],
                ["Pic", 16, 1300, "oui"],
                ["Vallon", 5, 150, "oui"],
                ["Refuge", 11, 700, "non"],
              ],
              { surligne: ["3", "4", "5", "9"] },
            ),
          ),
          micros: ["info_filtre_non"],
        },
        {
          enonce:
            "Un refuge animalier a accueilli $140$ animaux cette année. Combien sont des chats ET ont été adoptés ?",
          figure: tableauProba(["", "Adopté", "En attente", "Total"], [["Chien", "42", "18", "60"], ["Chat", "55", "25", "80"], ["Total", "97", "43", "140"]]),
          correction:
            "ET : les deux conditions à la fois, c'est UNE seule case du tableau.\nLigne « Chat », colonne « Adopté » : $55$.\n$55$ chats ont été adoptés.\n⚠️ Ni $80$ (tous les chats), ni $97$ (tous les adoptés) : le ET est au croisement.",
          schema: ecranSeulement(tableauProba(["", "Adopté", "En attente", "Total"], [["Chien", "42", "18", "60"], ["Chat", "55", "25", "80"], ["Total", "97", "43", "140"]], [[1, 1]])),
          micros: ["info_filtre_et", "info_filtre_effectif"],
        },
        {
          enonce: "Même tableau qu'à l'exercice 5. Combien d'animaux sont des chats OU ont été adoptés ?",
          correction:
            "OU : au moins l'une des deux conditions.\nLes chats : $80$. Les adoptés : $97$. Les chats adoptés, $55$, sont dans les deux groupes.\n$80 + 97 - 55 = 122$ animaux.\n✔️ Autre chemin : les seuls animaux qui ne sont ni chats ni adoptés sont les chiens en attente, $18$. Et $140 - 18 = 122$.",
          schema: ecranSeulement(tableauProba(["", "Adopté", "En attente", "Total"], [["Chien", "42", "18", "60"], ["Chat", "55", "25", "80"], ["Total", "97", "43", "140"]], [[0, 1], [1, 1], [1, 2]])),
          micros: ["info_filtre_ou", "info_filtre_effectif"],
        },
        {
          enonce: "Même tableau qu'à l'exercice 5. Combien d'animaux n'ont PAS encore été adoptés ?",
          correction:
            "NON adopté : c'est le total, moins les adoptés.\n$140 - 97 = 43$ animaux.\nOn le lit aussi directement : c'est le total de la colonne « En attente », $18 + 25 = 43$.\nDans le tableau, les deux cases surlignées forment la colonne « En attente ».",
          schema: ecranSeulement(tableauProba(["", "Adopté", "En attente", "Total"], [["Chien", "42", "18", "60"], ["Chat", "55", "25", "80"], ["Total", "97", "43", "140"]], [[0, 2], [1, 2]])),
          micros: ["info_filtre_non", "info_filtre_effectif"],
        },
        {
          enonce: "Même tableau qu'à l'exercice 5. Combien d'animaux ne sont NI des chiens NI adoptés ?",
          correction:
            "« Ni chien ni adopté », c'est « NON chien ET NON adopté » : des chats, en attente.\nLigne « Chat », colonne « En attente » : $25$ animaux.\n⚠️ « Ni A ni B » est un ET de deux NON, pas un OU. C'est aussi le contraire de « A OU B » : $140 - (60 + 97 - 42) = 140 - 115 = 25$.\nSur le diagramme, les $25$ chats en attente sont DEHORS : ni dans le cercle « chien », ni dans le cercle « adopté ».",
          schema: ecranSeulement(venn({ aSeul: ["18"], commun: ["42"], bSeul: ["55"], dehors: ["25"] }, { a: "chien", b: "adopté", e: "140 animaux" }, "dehors")),
          micros: ["info_filtre_non", "info_filtre_et", "info_filtre_effectif"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Traduire la phrase en filtre, compter, vérifier par un autre chemin.",
      rappel: [
        "On traduit la phrase : « et », « à la fois », « aussi » donnent ET ; « ou », « au moins l'un des deux » donnent OU ; « ne… pas », « sauf » donnent NON.",
        "Pour un OU, on additionne les deux groupes, puis on RETIRE ceux qui sont dans les deux.",
        "« Ni A ni B » = NON A ET NON B : c'est le contraire de « A OU B ».",
        "Un filtre ET renvoie toujours moins (ou autant) que chaque critère seul ; un filtre OU, toujours plus (ou autant).",
      ],
      exercices: [
        {
          titre: "Le parking du lycée",
          enonce:
            "Un lycée recense les $250$ voitures garées sur son parking : électrique ou thermique, récente (moins de trois ans) ou ancienne.\na) Combien de voitures sont électriques ET récentes ?\nb) Combien sont électriques OU récentes ?\nc) Combien ne sont PAS électriques ?\nd) Combien sont thermiques ET anciennes ? Retrouver ce nombre à partir de b).",
          figure: tableauProba(["", "Électrique", "Thermique", "Total"], [["Récente", "36", "84", "120"], ["Ancienne", "14", "116", "130"], ["Total", "50", "200", "250"]]),
          correction:
            "a) Une case : ligne « Récente », colonne « Électrique » : $36$ voitures.\nb) Les électriques, $50$, plus les récentes, $120$, moins les $36$ comptées deux fois : $50 + 120 - 36 = 134$ voitures.\nc) Le total moins les électriques : $250 - 50 = 200$. C'est le total de la colonne « Thermique ».\nd) Une case : $116$ voitures.\nThermique ET ancienne, c'est « ni électrique ni récente », le contraire de b) : $250 - 134 = 116$.\n⭐ Sur le diagramme, les $134$ voitures sont dans les cercles ; les $116$ autres, dehors.",
          schema: ecranSeulement(venn({ aSeul: ["14"], commun: ["36"], bSeul: ["84"], dehors: ["116"] }, { a: "électrique", b: "récente", e: "250 voitures" }, "union")),
          micros: ["info_filtre_et", "info_filtre_ou", "info_filtre_non", "info_filtre_effectif"],
        },
        {
          titre: "Le club d'escalade",
          enonce:
            "Voici le fichier des inscrits d'un club d'escalade.\na) Qui est confirmé ET fait de la compétition ?\nb) Combien d'inscrits ont moins de $16$ ans ($A$) OU font de la compétition ($B$) ?\nc) Combien ne font PAS de compétition ?",
          figure: feuille([
            ["Prénom", "Âge", "Niveau", "Compétition"],
            ["Inès", 15, "confirmé", "oui"],
            ["Hugo", 17, "débutant", "non"],
            ["Maya", 14, "débutant", "non"],
            ["Noah", 16, "confirmé", "non"],
            ["Léa", 18, "confirmé", "oui"],
            ["Sami", 13, "débutant", "oui"],
            ["Zoé", 16, "débutant", "non"],
            ["Tom", 15, "confirmé", "oui"],
          ]),
          correction:
            "a) Les confirmés : Inès, Noah, Léa, Tom. Parmi eux, en compétition : Inès, Léa, Tom. Soit $3$ inscrits.\nb) Moins de $16$ ans : Inès, Maya, Sami, Tom ($4$). En compétition : Inès, Léa, Sami, Tom ($4$). Dans les deux : Inès, Sami, Tom ($3$).\n$4 + 4 - 3 = 5$ inscrits : Inès, Maya, Sami, Tom, Léa.\nc) $8 - 4 = 4$ inscrits : Hugo, Maya, Noah, Zoé.\n⚠️ « Moins de $16$ ans » exclut $16$ : Noah et Zoé, qui ont $16$ ans, ne sont pas gardés.",
          schema: ecranSeulement(venn({ aSeul: ["Maya"], commun: ["Inès", "Sami", "Tom"], bSeul: ["Léa"], dehors: ["Hugo, Noah, Zoé"] }, { a: "A", b: "B", e: "8 inscrits" }, "union")),
          micros: ["info_filtre_sous_ensemble", "info_filtre_et", "info_filtre_ou", "info_filtre_non"],
        },
        {
          titre: "À vélo ou en bus",
          enonce:
            "Dans une classe de $30$ élèves, on demande qui vient au lycée à vélo, et qui a un abonnement de bus. Le diagramme donne les effectifs de chaque zone.\na) Combien viennent à vélo ? Combien ont un abonnement de bus ?\nb) Combien font les deux ?\nc) Combien viennent à vélo OU ont un abonnement ?\nd) Combien n'utilisent NI le vélo NI le bus ?\ne) Combien ne viennent PAS à vélo ?",
          figure: venn({ aSeul: ["9"], commun: ["3"], bSeul: ["5"], dehors: ["13"] }, { a: "vélo", b: "bus", e: "30 élèves" }),
          correction:
            "a) Le cercle « vélo » entier : $9 + 3 = 12$ élèves. Le cercle « bus » entier : $3 + 5 = 8$ élèves.\nb) La zone commune : $3$ élèves.\nc) Tout ce qui est dans au moins un cercle : $9 + 3 + 5 = 17$ élèves. Par la formule : $12 + 8 - 3 = 17$.\nd) Ceux qui sont hors des deux cercles : $13$ élèves. Vérification : $30 - 17 = 13$.\ne) Tous sauf le cercle « vélo » : $30 - 12 = 18$ élèves, soit $5 + 13$.\n⚠️ « $9$ » n'est pas le nombre de cyclistes : c'est le nombre de cyclistes SANS abonnement. Le cercle entier compte aussi les $3$ du milieu.",
          micros: ["info_filtre_et", "info_filtre_ou", "info_filtre_non", "info_filtre_effectif"],
        },
        {
          titre: "La nuit au refuge",
          enonce:
            "Un été, $200$ randonneurs passent par un refuge de montagne. $120$ y ont dormi, $90$ sont montés au sommet, et $50$ ont fait les deux.\na) Construire le tableau croisé « a dormi / n'a pas dormi » et « sommet / pas de sommet ».\nb) Combien ont dormi au refuge OU sont montés au sommet ?\nc) Combien ne sont PAS montés au sommet ?\nd) Combien n'ont NI dormi NI fait le sommet ?",
          correction:
            "a) On place d'abord le ET : $50$ ont dormi ET fait le sommet. Puis on complète par différence :\nont dormi sans le sommet : $120 - 50 = 70$ ; ont fait le sommet sans dormir : $90 - 50 = 40$.\nIl reste $200 - 50 - 70 - 40 = 40$ randonneurs qui n'ont fait ni l'un ni l'autre.\nb) $120 + 90 - 50 = 160$ randonneurs.\nc) $200 - 90 = 110$ randonneurs.\nd) La case « Pas dormi », « Pas de sommet » : $40$. Vérification : $200 - 160 = 40$.\n⭐ Dans un tableau croisé, on commence toujours par la case du ET : tout le reste s'en déduit.",
          schema: tableauProba(["", "Sommet", "Pas de sommet", "Total"], [["Dormi", "50", "70", "120"], ["Pas dormi", "40", "40", "80"], ["Total", "90", "110", "200"]], [[0, 1]]),
          micros: ["info_filtre_ou", "info_filtre_non", "info_filtre_effectif"],
        },
        {
          titre: "Télétravail et trajets",
          enonce:
            "Une entreprise de $200$ salariés croise deux informations : la distance domicile-travail, et le télétravail.\na) Combien de salariés habitent à plus de $30$ km ET viennent tous les jours sur site ?\nb) Combien télétravaillent OU habitent à plus de $30$ km ?\nc) Combien ne télétravaillent PAS ?\nd) Combien ne télétravaillent pas ET habitent à $30$ km ou moins ? Vérifier avec b).",
          figure: tableauProba(["", "Télétravail", "Sur site", "Total"], [["Plus de 30 km", "45", "15", "60"], ["30 km ou moins", "35", "105", "140"], ["Total", "80", "120", "200"]]),
          correction:
            "a) Une case : ligne « Plus de $30$ km », colonne « Sur site » : $15$ salariés. Ce sont eux qui font chaque jour le plus long trajet.\nb) $80 + 60 - 45 = 95$ salariés.\nc) $200 - 80 = 120$ salariés : c'est le total de la colonne « Sur site ».\nd) Une case : $105$ salariés.\nC'est « ni télétravail ni plus de $30$ km », le contraire de b) : $200 - 95 = 105$.\n⭐ Pour réduire les trajets en voiture, et donc le CO₂, l'entreprise regardera d'abord la case a).",
          schema: ecranSeulement(tableauProba(["", "Télétravail", "Sur site", "Total"], [["Plus de 30 km", "45", "15", "60"], ["30 km ou moins", "35", "105", "140"], ["Total", "80", "120", "200"]], [[0, 1], [0, 2], [1, 1]])),
          micros: ["info_filtre_et", "info_filtre_ou", "info_filtre_non", "info_filtre_effectif"],
        },
        {
          titre: "Les plantes du jardin botanique",
          enonce:
            "Un jardin botanique présente $60$ espèces de plantes. $18$ sont menacées ($A$), $24$ sont médicinales ($B$), et $6$ sont les deux à la fois.\na) Sans calculer, ranger du plus petit au plus grand les effectifs de « $A$ ET $B$ », « $A$ » et « $A$ OU $B$ ».\nb) Calculer ces trois effectifs.\nc) Combien d'espèces ne sont NI menacées NI médicinales ?",
          correction:
            "a) « $A$ ET $B$ » est une partie de $A$, et $A$ est une partie de « $A$ OU $B$ » : effectif de « $A$ ET $B$ » $\\leqslant$ effectif de $A$ $\\leqslant$ effectif de « $A$ OU $B$ ».\nb) « $A$ ET $B$ » : $6$ espèces. « $A$ » : $18$. « $A$ OU $B$ » : $18 + 24 - 6 = 36$. On a bien $6 \\leqslant 18 \\leqslant 36$.\nc) $60 - 36 = 24$ espèces.\n⭐ Ajouter un « et » RESTREINT, ajouter un « ou » ÉLARGIT : c'est vrai pour n'importe quel fichier.",
          schema: ecranSeulement(venn({ aSeul: ["12"], commun: ["6"], bSeul: ["18"], dehors: ["24"] }, { a: "A", b: "B", e: "60 espèces" }, "commun")),
          micros: ["info_filtre_et", "info_filtre_ou", "info_filtre_non", "info_filtre_effectif"],
        },
        {
          titre: "L'épicerie",
          enonce:
            "Voici le fichier des fruits et légumes d'une épicerie.\na) Combien de produits coûtent entre $2$ et $4$ € le kilo, bornes comprises ?\nb) Lesquels viennent de France ET sont bio ?\nc) Combien ne viennent PAS de France ?\nd) Combien sont bio OU coûtent moins de $2$ € le kilo ? Que remarque-t-on ?",
          figure: feuille([
            ["Produit", "Prix (€/kg)", "France", "Bio"],
            ["Pommes", 2.5, "oui", "oui"],
            ["Bananes", 1.8, "non", "oui"],
            ["Tomates", 3.2, "oui", "non"],
            ["Avocats", 5, "non", "non"],
            ["Carottes", 1.5, "oui", "oui"],
            ["Kiwis", 4, "oui", "non"],
            ["Mangues", 6, "non", "oui"],
            ["Poireaux", 2, "oui", "non"],
          ]),
          correction:
            "a) « Entre $2$ et $4$ » est un ET sur la même colonne : prix $\\geqslant 2$ ET prix $\\leqslant 4$.\nOn garde Pommes ($2{,}5$), Tomates ($3{,}2$), Kiwis ($4$), Poireaux ($2$) : $4$ produits.\nb) Pommes et Carottes.\nc) Bananes, Avocats, Mangues : $3$ produits.\nd) Bio : Pommes, Bananes, Carottes, Mangues. Moins de $2$ € : Bananes, Carottes, qui sont DÉJÀ bio.\nLe filtre renvoie $4 + 2 - 2 = 4$ produits : exactement les produits bio.\n⭐ Quand un groupe est inclus dans l'autre, le OU ne rajoute personne.\n⚠️ Bornes comprises : les Poireaux ($2$ €) et les Kiwis ($4$ €) sont gardés.",
          micros: ["info_filtre_sous_ensemble", "info_filtre_et", "info_filtre_ou", "info_filtre_non"],
        },
        {
          titre: "Le niveau sonore",
          enonce:
            "En physique, une classe mesure le niveau sonore de huit lieux, en décibels (dB).\na) Quels lieux sont calmes (moins de $60$ dB) ET à l'intérieur ?\nb) Combien de lieux ne sont PAS « calmes et à l'intérieur » ? Le retrouver avec un OU.\nc) Combien de lieux atteignent au moins $80$ dB ?",
          figure: feuille([
            ["Lieu", "Niveau (dB)", "Intérieur"],
            ["Bibliothèque", 35, "oui"],
            ["Cantine", 80, "oui"],
            ["Cour", 75, "non"],
            ["Classe", 55, "oui"],
            ["Gymnase", 85, "oui"],
            ["Rue", 70, "non"],
            ["Parc", 45, "non"],
            ["Concert", 100, "oui"],
          ]),
          correction:
            "a) Moins de $60$ dB : Bibliothèque, Classe, Parc. Parmi eux, à l'intérieur : Bibliothèque et Classe. Soit $2$ lieux.\nb) Le contraire de a) : $8 - 2 = 6$ lieux.\nAvec un OU : NON (calme ET intérieur) = NON calme OU NON intérieur.\nPas calmes : Cantine, Cour, Gymnase, Rue, Concert ($5$). Pas à l'intérieur : Cour, Rue, Parc ($3$). Dans les deux : Cour, Rue ($2$).\n$5 + 3 - 2 = 6$ lieux : on retrouve le même nombre.\nc) Au moins $80$ dB : Cantine ($80$), Gymnase ($85$), Concert ($100$). Soit $3$ lieux.\n⚠️ Le contraire d'un ET est un OU : « pas (calme et dedans) », c'est « bruyant, ou dehors ».",
          micros: ["info_filtre_sous_ensemble", "info_filtre_et", "info_filtre_ou", "info_filtre_non"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Traduire chaque demande en filtre, compter, puis croiser les résultats.",
      rappel: [
        "Une phrase, un filtre : on écrit d'abord les critères (A ET B, A OU B, NON A), puis on compte.",
        "Pour vérifier un OU, on passe par son contraire : « A OU B » = total − « ni A ni B ».",
      ],
      exercices: [
        {
          titre: "Les sentiers du parc naturel",
          enonce:
            "Un parc naturel décrit ses dix sentiers : longueur, dénivelé, accès en poussette, ouverture l'hiver.\na) Une famille avec une poussette vient en hiver. Quels sentiers lui conviennent ?\nb) Un sportif cherche un sentier d'au moins $500$ m de dénivelé OU d'au moins $10$ km. Combien en trouve-t-il ?\nc) Combien de sentiers ne sont PAS accessibles en poussette ?\nd) Construire le tableau croisé « poussette oui / non » et « hiver oui / non ».",
          figure: feuille([
            ["Sentier", "Longueur (km)", "Dénivelé (m)", "Poussette", "Hiver"],
            ["Étang", 4, 50, "oui", "oui"],
            ["Belvédère", 7, 350, "non", "oui"],
            ["Gorges", 12, 600, "non", "non"],
            ["Prairie", 5, 80, "oui", "non"],
            ["Sommet", 15, 1100, "non", "non"],
            ["Rivière", 6, 120, "oui", "oui"],
            ["Crêtes", 18, 900, "non", "non"],
            ["Forêt", 9, 200, "oui", "oui"],
            ["Lac", 10, 450, "non", "oui"],
            ["Tour", 3, 30, "oui", "non"],
          ]),
          correction:
            "a) Poussette ET hiver : Étang, Rivière, Forêt. Soit $3$ sentiers.\nb) Au moins $500$ m : Gorges, Sommet, Crêtes ($3$). Au moins $10$ km : Gorges, Sommet, Crêtes, Lac ($4$). Dans les deux : $3$.\n$3 + 4 - 3 = 4$ sentiers : Gorges, Sommet, Crêtes, Lac.\nc) Accessibles en poussette : Étang, Prairie, Rivière, Forêt, Tour ($5$). Donc $10 - 5 = 5$ sentiers ne le sont pas.\nd) Poussette ET hiver : $3$ (question a). Poussette sans hiver : Prairie, Tour, $2$. Hiver sans poussette : Belvédère, Lac, $2$. Ni l'un ni l'autre : Gorges, Sommet, Crêtes, $3$.\n✔️ $3 + 2 + 2 + 3 = 10$ sentiers.\n⭐ Le tableau croisé RÉSUME le fichier : on y lit d'un coup les quatre filtres possibles.",
          schema: tableauProba(["", "Hiver", "Pas l'hiver", "Total"], [["Poussette", "3", "2", "5"], ["Sans poussette", "2", "3", "5"], ["Total", "5", "5", "10"]], [[0, 1]]),
          micros: ["info_filtre_sous_ensemble", "info_filtre_et", "info_filtre_ou", "info_filtre_non", "info_filtre_effectif"],
        },
        {
          titre: "Les deux tours d'une élection",
          enonce:
            "Dans une commune imaginaire, $1\\,200$ électeurs sont inscrits. On a relevé qui a voté au premier tour (T1) et au second tour (T2) d'une élection municipale.\na) Combien d'inscrits ont voté aux DEUX tours ?\nb) Combien ont voté à AU MOINS un des deux tours ?\nc) Combien ne se sont déplacés à aucun des deux tours ?\nd) Combien ont voté à un seul des deux tours ?",
          figure: tableauProba(["", "Vote T2", "Abst. T2", "Total"], [["Vote T1", "660", "120", "780"], ["Abst. T1", "90", "330", "420"], ["Total", "750", "450", "1200"]]),
          correction:
            "a) T1 ET T2 : une case, $660$ électeurs.\nb) T1 OU T2 : $780 + 750 - 660 = 870$ électeurs.\nc) NI T1 NI T2 : la case « Abst. T1 », « Abst. T2 », $330$ électeurs. Vérification : $1\\,200 - 870 = 330$.\nd) Un seul tour : ceux du OU, moins ceux du ET : $870 - 660 = 210$. Ce sont les deux cases $120$ et $90$ : $120 + 90 = 210$.\n⭐ « Au moins un » (le OU) et « un seul » ne sont pas la même question : le premier compte ceux qui ont voté deux fois, le second non.\n⚠️ L'abstention d'un scrutin se lit dans une colonne, celle d'un électeur sur les deux tours dans une seule case.",
          schema: ecranSeulement(venn({ aSeul: ["120"], commun: ["660"], bSeul: ["90"], dehors: ["330"] }, { a: "tour 1", b: "tour 2", e: "1200 inscrits" }, "union")),
          micros: ["info_filtre_et", "info_filtre_ou", "info_filtre_non", "info_filtre_effectif"],
        },
        {
          titre: "Les offres d'emploi",
          enonce:
            "Une agence publie huit offres d'emploi (salaires mensuels d'un modèle).\na) Combien d'offres sont en CDI ET à au moins $2\\,000$ € ?\nb) Combien sont en CDI OU permettent le télétravail ?\nc) Combien ne sont NI en CDI NI en télétravail ? Lesquelles ?\nd) Quel est le salaire moyen des offres en CDI ?",
          figure: feuille([
            ["Poste", "Salaire (€)", "CDI", "Télétravail"],
            ["Comptable", 2300, "oui", "oui"],
            ["Vendeur", 1800, "non", "non"],
            ["Technicien", 2100, "oui", "non"],
            ["Graphiste", 1900, "non", "oui"],
            ["Infirmier", 2400, "oui", "non"],
            ["Développeur", 2800, "oui", "oui"],
            ["Serveur", 1750, "non", "non"],
            ["Assistant", 2000, "non", "oui"],
          ]),
          correction:
            "a) Les CDI : Comptable, Technicien, Infirmier, Développeur. Tous gagnent au moins $2\\,000$ € : $4$ offres.\nb) CDI : $4$ offres. Télétravail : Comptable, Graphiste, Développeur, Assistant, $4$ offres. Les deux : Comptable, Développeur.\n$4 + 4 - 2 = 6$ offres.\nc) $8 - 6 = 2$ offres : Vendeur et Serveur.\nd) On filtre les CDI, puis on fait la moyenne de leurs salaires : $\\dfrac{2\\,300 + 2\\,100 + 2\\,400 + 2\\,800}{4} = \\dfrac{9\\,600}{4} = 2\\,400$ €.\n⚠️ L'Assistant gagne exactement $2\\,000$ € mais n'est pas en CDI : il ne passe pas le filtre a).\n⭐ Dans un tableur, on filtre d'abord, on calcule ensuite : la moyenne ne porte que sur les lignes gardées.",
          micros: ["info_filtre_et", "info_filtre_ou", "info_filtre_non"],
        },
        {
          titre: "La station de ski",
          enonce:
            "Un samedi, une station de ski accueille $400$ skieurs. $250$ ont acheté un forfait à la journée, $180$ louent leur matériel sur place, et $100$ font les deux.\na) Combien de skieurs ont un forfait journée OU louent leur matériel ?\nb) Combien n'ont NI forfait journée NI location ?\nc) Combien n'ont PAS de forfait journée ?\nd) Un journaliste écrit : « $430$ skieurs ont un forfait ou louent leur matériel. » D'où vient son erreur ?",
          correction:
            "a) $250 + 180 - 100 = 330$ skieurs.\nb) $400 - 330 = 70$ skieurs : ils ont peut-être un forfait à la semaine, et leur propre matériel.\nc) $400 - 250 = 150$ skieurs.\nd) Le journaliste a additionné $250 + 180 = 430$ sans retirer les $100$ skieurs qui font les deux : il les a comptés deux fois.\nSon résultat dépasse même le nombre de skieurs, $400$ : un signal d'alarme immédiat.\nSur le diagramme : forfait seul $250 - 100 = 150$, location seule $180 - 100 = 80$, les deux $100$, aucun des deux $70$. Et $150 + 100 + 80 + 70 = 400$.",
          schema: ecranSeulement(venn({ aSeul: ["150"], commun: ["100"], bSeul: ["80"], dehors: ["70"] }, { a: "forfait", b: "location", e: "400 skieurs" }, "union")),
          micros: ["info_filtre_ou", "info_filtre_non", "info_filtre_effectif"],
        },
      ],
    },
  ],
};
