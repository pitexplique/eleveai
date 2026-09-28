// ─── Fiche d'exercices : le tableur (1re, sans spécialité) ────────────────────
//                              20 exercices corrigés
//
// Chapitre « Analyse de l'information chiffrée » (BOP1IC), 28/09/2026 : une
// feuille par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/information-chiffree.bank.ts`
// (items `info_tableur_*`).
//
// ⭐ LE DESSIN, C'EST LA FEUILLE DE CALCUL : `feuille()` ci-dessous, une grille
// comme à l'écran — colonnes A, B, C…, lignes numérotées, et la barre de
// formule au-dessus (« B3 fx =B2*1,05 »). Les formules s'écrivent EXACTEMENT
// comme dans un tableur français : virgule décimale, `*` pour « fois », `/`
// pour « divisé par », SOMME et MOYENNE. ⛔ Pas de référence absolue ($B$1) :
// le `$` est le délimiteur des formules de la feuille.
//
// ⭐ Le script de recalcul RELIT chaque feuille, recalcule chaque formule de la
// barre sur les cellules voisines, refait chaque colonne (évolutions, arrondis)
// et chaque seuil.
//
// ⭐ Frédéric, 28/09 : du visuel, et des contextes d'économie, d'écologie, de
// sport, de nature, de physique et d'histoire-géo. Les chiffres sont des
// MODÈLES arrondis, jamais des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-info-tableur.mjs`.
//
// Micro-compétences : info_tableur_lire (1, 2, 7, 9, 12, 20),
// info_tableur_comprendre_formule (2, 3, 9, 12, 13, 14, 19, 20),
// info_tableur_ecrire_formule (4, 5, 6, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19,
// 20), info_tableur_exploiter_colonne (7, 10, 11, 16, 17, 18, 20),
// info_tableur_diagramme (8, 15, 17, 18, 19, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, ORANGE, repere } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

type Cellule = string | number;
const affiche = (v: Cellule) => (typeof v === "number" ? String(v).replace(".", ",").replace("-", "−") : v);

/**
 * Une FEUILLE DE CALCUL : colonnes A, B, C…, lignes numérotées à partir de 1.
 * Une case qui commence par « = » est une formule (écrite en bleu).
 * `surligne` : des cellules (« B3 ») ou des lignes entières (« 3 »).
 * `barre` : la barre de formule, [cellule, formule].
 * ⛔ Texte NU (HTML, pas KaTeX), 13 px à l'écran, et un défilement horizontal
 * sur téléphone pour les feuilles larges ; 9 px sur papier.
 */
const feuille = (lignes: Cellule[][], opts: { surligne?: string[]; barre?: [string, string] } = {}) => {
  const nbCol = Math.max(...lignes.map((l) => l.length));
  const lettres = Array.from({ length: nbCol }, (_, j) => String.fromCharCode(65 + j));
  const surligne = opts.surligne ?? [];
  return (
    <div className="mx-auto w-full max-w-[24rem] print:max-w-[16rem]">
      {opts.barre ? (
        <div className="mb-1 flex items-center gap-2 rounded border border-slate-300 bg-white px-2 py-0.5 font-mono text-[13px] print:text-[9px]">
          <span className="font-bold text-slate-500">{opts.barre[0]}</span>
          <span className="italic text-slate-400">fx</span>
          <span className="font-semibold text-blue-700">{opts.barre[1]}</span>
        </div>
      ) : null}
      <div className="overflow-x-auto print:overflow-visible">
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
                  const val = ligne[j] ?? "";
                  const on = surligne.includes(`${col}${i + 1}`) || surligne.includes(String(i + 1));
                  const formule = typeof val === "string" && val.startsWith("=");
                  return (
                    <td
                      key={j}
                      className={`whitespace-nowrap border border-slate-300 px-1.5 py-0.5 ${formule ? "text-blue-700" : "text-slate-800"} ${i === 0 ? "font-semibold" : ""} ${on ? "bg-amber-100 font-bold" : ""}`}
                    >
                      {affiche(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const exercicesInfoTableurPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "info-tableur",
  titre: "Le tableur",
  accroche:
    "Vingt exercices sur la feuille de calcul : lire une cellule, comprendre une formule comme =B2*1,05, écrire celle qu'on recopie vers le bas, trouver un seuil dans une colonne, choisir le bon diagramme. Épargne, forêt, entraînement, électricité, ville industrielle, tournoi : un rappel de cours avant chaque niveau, et une correction étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Lire la feuille, comprendre ou écrire une formule.",
      rappel: [
        "Une cellule se nomme par sa COLONNE (une lettre), puis sa LIGNE (un numéro) : B3 est dans la colonne B, à la ligne 3.",
        "Une formule commence par « = ». Le signe * veut dire « fois », le signe / « divisé par » : « =B2*1,05 » multiplie le contenu de B2 par $1{,}05$.",
        "Recopiée vers le BAS, une formule change de numéro de ligne : « =B2*1,05 » écrite en B3 devient « =B3*1,05 » en B4. Recopiée vers la DROITE, elle change de lettre.",
        "« =SOMME(B2:B6) » additionne les cellules de B2 à B6 ; « =MOYENNE(B2:B6) » calcule leur moyenne.",
      ],
      exercices: [
        {
          enonce:
            "Un club de randonnée note ses sorties dans une feuille de calcul.\na) Que contiennent les cellules B4 et C2 ?\nb) Dans quelle cellule lit-on le dénivelé du jour $3$ ?",
          figure: feuille([
            ["Jour", "Distance (km)", "Dénivelé (m)"],
            [1, 12, 450],
            [2, 18, 800],
            [3, 15, 1200],
            [4, 9, 300],
          ]),
          correction:
            "a) B4 : colonne B (les distances), ligne 4. On y lit $15$ : le jour $3$, le club a marché $15$ km.\nC2 : colonne C (les dénivelés), ligne 2. On y lit $450$ : le jour $1$, il a monté $450$ m.\nb) Le dénivelé est dans la colonne C ; le jour $3$ est à la ligne 4. C'est la cellule C4, qui contient $1\\,200$.\n⚠️ La ligne 1 contient les TITRES : le jour $3$ n'est pas à la ligne 3, mais à la ligne 4.",
          micros: ["info_tableur_lire"],
        },
        {
          enonce:
            "Dans cette feuille, la cellule B3 contient la formule affichée dans la barre.\na) Que calcule-t-elle ?\nb) On la recopie vers le bas. Quelle formule contient alors B4, et quelle valeur affiche-t-elle ?",
          figure: feuille(
            [
              ["Année", "Prix (€)"],
              [2024, 200],
              [2025, 210],
              [2026, 220.5],
            ],
            { surligne: ["B3"], barre: ["B3", "=B2*1,05"] },
          ),
          correction:
            "a) « =B2*1,05 » multiplie le prix de B2 par $1{,}05 = 1 + \\dfrac{5}{100}$ : c'est une HAUSSE de $5$ %. $200 \\times 1{,}05 = 210$.\nb) Recopiée d'une ligne vers le bas, la formule descend d'une ligne : B4 contient « =B3*1,05 ».\nElle affiche $210 \\times 1{,}05 = 220{,}5$, soit $220{,}50$ €.\n⚠️ $1{,}05$ ne veut pas dire « $+1{,}05$ % », ni « $+1{,}05$ € » : c'est un coefficient multiplicateur.",
          micros: ["info_tableur_comprendre_formule", "info_tableur_lire"],
        },
        {
          enonce:
            "La colonne B contient des prix. Laquelle de ces formules, écrite en C2, calcule le prix après une BAISSE de $20$ % ?\n« =B2*0,8 » ; « =B2*0,2 » ; « =B2-20 » ; « =B2*1,2 ».",
          correction:
            "Baisser de $20$ %, c'est garder $80$ % du prix : on multiplie par $1 - \\dfrac{20}{100} = 0{,}8$.\nLa bonne formule est « =B2*0,8 ».\n« =B2*0,2 » donne la REMISE ($20$ % du prix), pas le prix remisé.\n« =B2-20 » enlève $20$ €, pas $20$ %.\n« =B2*1,2 » est une HAUSSE de $20$ %.\n✔️ Pour un prix de $50$ € : $50 \\times 0{,}8 = 40$ €.\nSur la feuille : la formule de C2, et son résultat pour un sac à $50$ €.",
          schema: ecranSeulement(
            feuille(
              [
                ["Article", "Prix (€)", "Remisé (€)"],
                ["Sac", 50, 40],
              ],
              { surligne: ["C2"], barre: ["C2", "=B2*0,8"] },
            ),
          ),
          micros: ["info_tableur_comprendre_formule"],
        },
        {
          enonce:
            "Un loyer de $600$ € (en B2, pour $2025$) augmente de $2$ % chaque année. Quelle formule écrire en B3 pour pouvoir la recopier vers le bas ? Quelle valeur affiche-t-elle ?",
          correction:
            "Chaque année, on multiplie le loyer PRÉCÉDENT par $1 + \\dfrac{2}{100} = 1{,}02$.\nEn B3, on écrit « =B2*1,02 ». Recopiée, elle deviendra « =B3*1,02 » en B4, et ainsi de suite.\nB3 affiche $600 \\times 1{,}02 = 612$ € : le loyer de $2026$.\n⚠️ Écrire « =600*1,02 » donne bien $612$ en B3, mais recopiée vers le bas, la formule recalculerait toujours $612$.",
          schema: ecranSeulement(
            feuille(
              [
                ["Année", "Loyer (€)"],
                [2025, 600],
                [2026, 612],
                [2027, 624.24],
              ],
              { surligne: ["B3"], barre: ["B3", "=B2*1,02"] },
            ),
          ),
          micros: ["info_tableur_ecrire_formule"],
        },
        {
          enonce:
            "Les dépenses de courses d'une semaine, du lundi au vendredi, sont dans les cellules B2 à B6 : $32$, $18$, $45$, $12$ et $23$ €. Quelle formule écrire en B7 pour obtenir le total ? Quelle valeur affiche-t-elle ?",
          correction:
            "On veut additionner les cellules de B2 à B6 : on écrit « =SOMME(B2:B6) ».\nOn peut aussi écrire « =B2+B3+B4+B5+B6 » : c'est plus long, et c'est pareil.\nB7 affiche $32 + 18 + 45 + 12 + 23 = 130$ €.\n⚠️ « =SOMME(B2;B6) », avec un point-virgule, n'additionne que B2 et B6. Les deux-points veulent dire « de … à ».",
          schema: ecranSeulement(
            feuille(
              [
                ["Jour", "Dépense (€)"],
                ["lundi", 32],
                ["mardi", 18],
                ["mercredi", 45],
                ["jeudi", 12],
                ["vendredi", 23],
                ["Total", 130],
              ],
              { surligne: ["B7"], barre: ["B7", "=SOMME(B2:B6)"] },
            ),
          ),
          micros: ["info_tableur_ecrire_formule"],
        },
        {
          enonce:
            "La cellule C2 contient la formule « =B2+10 ».\na) Que devient-elle, recopiée en D2, puis en E2 ?\nb) Que devient-elle, recopiée en C3 ?",
          correction:
            "a) Vers la DROITE, la formule garde son numéro de ligne et avance d'une lettre : en D2, « =C2+10 » ; en E2, « =D2+10 ».\nChaque cellule ajoute $10$ à sa voisine de GAUCHE.\nb) Vers le BAS, elle garde sa lettre et avance d'une ligne : en C3, « =B3+10 ».\n⭐ Une formule se souvient d'une POSITION (« la case juste à gauche »), pas d'un nom de cellule fixe.\nSur la feuille, affichée en mode « formules » : chaque formule regarde la case juste à sa gauche.",
          schema: ecranSeulement(
            feuille(
              [
                ["Essai", "Départ", "Ajout 1", "Ajout 2", "Ajout 3"],
                ["ligne 2", 5, "=B2+10", "=C2+10", "=D2+10"],
                ["ligne 3", 7, "=B3+10", "", ""],
              ],
              { surligne: ["C2", "D2", "E2", "C3"] },
            ),
          ),
          micros: ["info_tableur_ecrire_formule"],
        },
        {
          enonce:
            "Une chaîne de vidéos gagne $25$ % d'abonnés chaque semaine. La colonne B est arrondie à l'unité. À partir de quelle semaine dépasse-t-elle $1\\,500$ abonnés ?",
          figure: feuille([
            ["Semaine", "Abonnés"],
            [0, 800],
            [1, 1000],
            [2, 1250],
            [3, 1563],
            [4, 1953],
            [5, 2441],
          ]),
          correction:
            "On descend la colonne B jusqu'à la PREMIÈRE valeur qui dépasse $1\\,500$.\nSemaine $2$ : $1\\,250$, pas encore. Semaine $3$ : $1\\,563$, c'est dépassé.\nLa chaîne dépasse $1\\,500$ abonnés à partir de la semaine $3$.\n✔️ $1\\,250 \\times 1{,}25 = 1\\,562{,}5$, arrondi à $1\\,563$.\n⚠️ On répond par la SEMAINE (colonne A), pas par la ligne 5 du tableur, ni par le nombre d'abonnés.",
          micros: ["info_tableur_exploiter_colonne", "info_tableur_lire"],
        },
        {
          enonce:
            "Une feuille de calcul donne la masse des déchets d'un foyer sur un an, par type : verre, papier, plastique, ordures. Quel diagramme choisir pour montrer la RÉPARTITION de ces déchets ?",
          correction:
            "On veut montrer comment un TOUT (tous les déchets de l'année) se partage entre des catégories.\nC'est le rôle du diagramme circulaire : chaque secteur est la part d'un type de déchet.\n⚠️ Une courbe n'a pas de sens ici : les types de déchets ne se suivent pas dans le temps.\nSur l'exemple (modèle, en %), on voit d'un coup d'œil que les ordures restent la plus grosse part.",
          schema: ecranSeulement(
            diagramme("camembert", [
              { label: "Verre", value: 20 },
              { label: "Papier", value: 25 },
              { label: "Plastique", value: 15 },
              { label: "Ordures", value: 40 },
            ]),
          ),
          micros: ["info_tableur_diagramme"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Écrire la formule, la recopier, exploiter la colonne, puis conclure par une phrase.",
      rappel: [
        "Une évolution de $t$ % : on multiplie par $1 + \\dfrac{t}{100}$ (hausse) ou par $1 - \\dfrac{t}{100}$ (baisse). Dans le tableur : « =B2*1,03 » pour $+3$ %, « =B2*0,97 » pour $-3$ %.",
        "Une formule à recopier désigne la cellule VOISINE (B2), jamais un nombre recopié à la main : sinon, elle ne « suit » plus.",
        "Problème de seuil : on descend la colonne jusqu'à la PREMIÈRE valeur qui dépasse, puis on lit la ligne.",
        "Le diagramme dépend de la question : une évolution dans le temps, une courbe ; une répartition, un diagramme circulaire ; des catégories à comparer, des barres ; deux grandeurs mesurées ensemble, un nuage de points.",
      ],
      exercices: [
        {
          titre: "Le livret d'épargne",
          enonce:
            "Léa place $2\\,000$ € sur un livret à $3$ % par an. La colonne B donne le capital, la colonne C les intérêts de l'année.\na) Quelle formule a-t-on écrite en B3, puis recopiée vers le bas ?\nb) Que calcule la formule de C3, affichée dans la barre ?\nc) Combien d'intérêts Léa a-t-elle gagnés en trois ans ?\nd) Pourquoi les intérêts augmentent-ils chaque année ?",
          figure: feuille(
            [
              ["Année", "Capital (€)", "Intérêts (€)"],
              [2024, 2000, ""],
              [2025, 2060, 60],
              [2026, 2121.8, 61.8],
              [2027, 2185.45, 63.65],
            ],
            { surligne: ["C3"], barre: ["C3", "=B3-B2"] },
          ),
          correction:
            "a) $+3$ % par an : on multiplie par $1{,}03$. En B3 : « =B2*1,03 ». $2\\,000 \\times 1{,}03 = 2\\,060$.\nb) « =B3-B2 » calcule la DIFFÉRENCE entre deux années : ce que le capital a gagné, les intérêts. $2\\,060 - 2\\,000 = 60$ €.\nc) On additionne la colonne C : $60 + 61{,}8 + 63{,}65 = 185{,}45$ €. On le retrouve aussi par $2\\,185{,}45 - 2\\,000 = 185{,}45$ €.\nd) Chaque année, les $3$ % portent sur un capital plus GRAND, qui contient les intérêts des années d'avant. Ce sont les intérêts composés.\n⚠️ Trois fois $60$ €, soit $180$ €, serait faux : les intérêts ne sont pas les mêmes chaque année.",
          micros: ["info_tableur_ecrire_formule", "info_tableur_comprendre_formule", "info_tableur_lire"],
        },
        {
          titre: "Une forêt qui recule",
          enonce:
            "Dans un modèle, une forêt de $5\\,000$ hectares perd $4$ % de sa surface chaque année. La colonne B est arrondie à l'hectare.\na) Quelle formule écrire en B3, pour la recopier vers le bas ?\nb) À partir de quelle année la surface passe-t-elle sous $4\\,000$ ha ?\nc) Un élève dit : « $4$ % de $5\\,000$, c'est $200$ ha par an, donc on passe à $4\\,000$ ha au bout de $5$ ans. » Pourquoi se trompe-t-il ?",
          figure: feuille([
            ["Année", "Surface (ha)"],
            [0, 5000],
            [1, 4800],
            [2, 4608],
            [3, 4424],
            [4, 4247],
            [5, 4077],
            [6, 3914],
            [7, 3757],
          ]),
          correction:
            "a) Une baisse de $4$ % : on multiplie par $1 - \\dfrac{4}{100} = 0{,}96$. En B3 : « =B2*0,96 ».\nb) On descend la colonne : année $5$, $4\\,077$ ha, encore au-dessus ; année $6$, $3\\,914$ ha, c'est en dessous.\nLa surface passe sous $4\\,000$ ha à partir de l'année $6$.\nc) Les $4$ % portent chaque année sur la surface QUI RESTE, de plus en plus petite. La perte diminue : $200$ ha la première année, $192$ la deuxième ($4\\,800 \\times 0{,}04$), et ainsi de suite.\nIl faut donc un peu plus de $5$ ans.\n⚠️ Enlever $4$ % chaque année, ce n'est pas enlever toujours le même nombre d'hectares.",
          micros: ["info_tableur_ecrire_formule", "info_tableur_exploiter_colonne"],
        },
        {
          titre: "Le plan d'entraînement",
          enonce:
            "Pour préparer un semi-marathon, Hugo court $20$ km la première semaine, puis augmente sa distance de $10$ % chaque semaine. La colonne B est arrondie au centième.\na) Quelle formule écrire en B3 ?\nb) À partir de quelle semaine court-il plus de $30$ km ?\nc) Quelle formule écrire en B8 pour la distance totale des six semaines ? Que vaut-elle ?",
          figure: feuille([
            ["Semaine", "Distance (km)"],
            [1, 20],
            [2, 22],
            [3, 24.2],
            [4, 26.62],
            [5, 29.28],
            [6, 32.21],
          ]),
          correction:
            "a) $+10$ % : on multiplie par $1{,}1$. En B3 : « =B2*1,1 ». $20 \\times 1{,}1 = 22$.\nb) Semaine $5$ : $29{,}28$ km, pas encore. Semaine $6$ : $32{,}21$ km. C'est à partir de la semaine $6$.\nc) En B8 : « =SOMME(B2:B7) ».\nElle vaut $20 + 22 + 24{,}2 + 26{,}62 + 29{,}28 + 32{,}21 = 154{,}31$ km.\n⚠️ La SOMME va de B2 à B7 : B1 contient le titre, et B8 est la cellule du total elle-même.",
          micros: ["info_tableur_ecrire_formule", "info_tableur_exploiter_colonne"],
        },
        {
          titre: "L'énergie d'une journée",
          enonce:
            "En physique, l'énergie consommée par un appareil, en wattheures (Wh), vaut sa puissance en watts multipliée par sa durée d'utilisation en heures. Une famille note sa journée dans une feuille de calcul.\na) Que calcule la formule de D2, affichée dans la barre ? Vérifier la valeur affichée.\nb) On recopie D2 jusqu'en D5. Quelles valeurs apparaissent ?\nc) Quelle formule écrire en D6 pour le total ? Le convertir en kWh.\nd) Au prix de $0{,}25$ € le kWh (prix d'un modèle), combien coûte cette journée ?",
          figure: feuille(
            [
              ["Appareil", "Puissance (W)", "Durée (h)", "Énergie (Wh)"],
              ["Four", 2000, 0.5, 1000],
              ["Lave-linge", 1000, 1.5, ""],
              ["Ordinateur", 50, 6, ""],
              ["Box internet", 10, 24, ""],
              ["Total", "", "", ""],
            ],
            { surligne: ["D2"], barre: ["D2", "=B2*C2"] },
          ),
          correction:
            "a) « =B2*C2 » multiplie la puissance par la durée : c'est l'énergie, $E = P \\times t$. Pour le four : $2\\,000 \\times 0{,}5 = 1\\,000$ Wh.\nb) Recopiée vers le bas, la formule devient « =B3*C3 », « =B4*C4 », « =B5*C5 ».\nLave-linge : $1\\,000 \\times 1{,}5 = 1\\,500$ Wh. Ordinateur : $50 \\times 6 = 300$ Wh. Box : $10 \\times 24 = 240$ Wh.\nc) En D6 : « =SOMME(D2:D5) ». Total : $1\\,000 + 1\\,500 + 300 + 240 = 3\\,040$ Wh, soit $3{,}04$ kWh.\nd) $3{,}04 \\times 0{,}25 = 0{,}76$ € pour la journée.\n⭐ La petite box, allumée $24$ h sur $24$, consomme presque autant que l'ordinateur : la durée compte autant que la puissance.",
          micros: ["info_tableur_comprendre_formule", "info_tableur_ecrire_formule", "info_tableur_lire"],
        },
        {
          titre: "Hors taxes, toutes taxes",
          enonce:
            "Un commerçant tape ses prix hors taxes (HT) dans la colonne B. En C2, il écrit « =B2*1,2 », et en D2, « =C2-B2 ».\na) Que calculent C2 et D2 ? Donner leurs valeurs pour un prix HT de $45$ €.\nb) Un client ne connaît que le prix TTC, écrit en C3 : $54$ €. Quelle formule écrire en B3 pour retrouver le prix HT ?",
          correction:
            "a) « =B2*1,2 » ajoute $20$ % au prix HT : c'est le prix toutes taxes comprises (TTC), avec une TVA à $20$ %. $45 \\times 1{,}2 = 54$ €.\n« =C2-B2 » est la différence TTC moins HT : le montant de la TVA. $54 - 45 = 9$ €.\nb) Pour revenir en arrière, on DIVISE par le même coefficient : en B3, « =C3/1,2 ». $\\dfrac{54}{1{,}2} = 45$ €.\n⚠️ « =C3*0,8 » donnerait $43{,}20$ € : enlever $20$ % n'annule pas une hausse de $20$ %.",
          schema: ecranSeulement(
            feuille(
              [
                ["Article", "HT (€)", "TTC (€)", "TVA (€)"],
                ["Lampe", 45, 54, 9],
              ],
              { surligne: ["C2"], barre: ["C2", "=B2*1,2"] },
            ),
          ),
          micros: ["info_tableur_comprendre_formule", "info_tableur_ecrire_formule"],
        },
        {
          titre: "La formule qui ne suit pas",
          enonce:
            "Un abonnement coûte $1\\,000$ € en $2024$ et augmente de $3$ % par an. En B3, Tom a écrit « =1000*1,03 », puis il a recopié la formule vers le bas.\na) Pourquoi la colonne affiche-t-elle toujours $1\\,030$ ?\nb) Quelle formule aurait-il dû écrire en B3 ? Quels prix aurait-il obtenus, au centime près ?",
          figure: feuille(
            [
              ["Année", "Prix (€)"],
              [2024, 1000],
              [2025, 1030],
              [2026, 1030],
              [2027, 1030],
            ],
            { surligne: ["B5"], barre: ["B5", "=1000*1,03"] },
          ),
          correction:
            "a) La formule ne contient aucune référence de cellule : juste deux NOMBRES. Recopiée, elle reste « =1000*1,03 » partout, et affiche partout $1\\,030$.\nLa barre de formule le montre : en B5, on lit encore « =1000*1,03 ».\nb) Il fallait écrire « =B2*1,03 » : recopiée, elle devient « =B3*1,03 », « =B4*1,03 », et chaque année part de la précédente.\nPrix obtenus : $1\\,030$ € en $2025$, $1\\,060{,}90$ € en $2026$, $1\\,092{,}73$ € en $2027$.\n⭐ Une formule de tableur doit dire « la cellule du DESSUS », pas « le nombre que j'ai lu dedans ».",
          micros: ["info_tableur_comprendre_formule", "info_tableur_ecrire_formule"],
        },
        {
          titre: "Le bon diagramme",
          enonce:
            "Quatre feuilles de calcul, quatre questions. Pour chacune, choisir le diagramme adapté.\na) La vitesse d'un cycliste relevée toutes les minutes pendant une course : comment évolue-t-elle ?\nb) Les voix obtenues par quatre listes à une élection municipale : qui arrive en tête ?\nc) La part de chaque source dans l'électricité produite par un pays : comment se répartit-elle ?\nd) Pour trente basketteurs, la taille et l'envergure : sont-elles liées ?",
          correction:
            "a) Une grandeur qui évolue dans le TEMPS : une courbe (le temps en abscisse, la vitesse en ordonnée).\nb) Des catégories à COMPARER : un diagramme en barres. La barre la plus haute désigne la liste en tête.\nc) Un tout qui se PARTAGE : un diagramme circulaire.\nd) Deux grandeurs mesurées sur les mêmes individus : un nuage de points (la taille en abscisse, l'envergure en ordonnée).\n⭐ La question choisit le diagramme, pas les données : le même tableau d'élection pourrait donner un camembert si l'on voulait voir les PARTS des voix.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "Liste A", value: 1250 },
              { label: "Liste B", value: 980 },
              { label: "Liste C", value: 640 },
              { label: "Liste D", value: 310 },
            ]),
          ),
          micros: ["info_tableur_diagramme"],
        },
        {
          titre: "Deux formules de salle de sport",
          enonce:
            "Forfait A : $30$ € par mois. Forfait B : $100$ € d'inscription, puis $20$ € par mois. La colonne A donne le nombre de mois, B et C le coût total de chaque forfait.\na) Quelles formules a-t-on écrites en B2 et en C2 ?\nb) À partir de combien de mois le forfait B est-il le moins cher ?",
          figure: feuille([
            ["Mois", "Forfait A (€)", "Forfait B (€)"],
            [7, 210, 240],
            [8, 240, 260],
            [9, 270, 280],
            [10, 300, 300],
            [11, 330, 320],
            [12, 360, 340],
          ]),
          correction:
            "a) Forfait A : $30$ € fois le nombre de mois, écrit en A2. En B2 : « =30*A2 ». Pour $7$ mois : $30 \\times 7 = 210$ €.\nForfait B : $100$ €, plus $20$ € par mois. En C2 : « =100+20*A2 ». Pour $7$ mois : $100 + 20 \\times 7 = 240$ €.\nb) On compare les deux colonnes ligne par ligne. À $10$ mois, les deux coûtent $300$ € : égalité.\nÀ partir de $11$ mois, B est moins cher ($320$ € contre $330$ €).\n⚠️ À $10$ mois, B n'est pas MOINS cher : il coûte AUTANT. La réponse est $11$ mois.\n⭐ Les $100$ € d'inscription se « remboursent » à raison de $10$ € par mois : il faut $10$ mois pour les rattraper.",
          micros: ["info_tableur_ecrire_formule", "info_tableur_exploiter_colonne"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Construire la feuille, l'exploiter, la représenter.",
      rappel: [
        "On écrit UNE formule, en haut de la colonne, puis on la recopie. On vérifie la première valeur à la main.",
        "Pour répondre, on cite la cellule lue et on conclut par une phrase qui donne l'unité : « à partir de l'année $7$ », « $320$ € ».",
      ],
      exercices: [
        {
          titre: "Diviser ses émissions par deux",
          enonce:
            "Une entreprise émet $800$ tonnes de CO₂ par an. Elle décide de les réduire de $10$ % chaque année. La colonne B est arrondie à la tonne.\na) Quelle formule écrire en B3 ?\nb) À partir de quelle année émet-elle moins de la moitié de ses émissions de départ ?\nc) Une autre entreprise, partie aussi de $800$ t, baisse de $80$ tonnes par an. Quelle formule écrirait-elle en C3 ? Quand atteint-elle la moitié ?\nd) Quel diagramme choisir pour comparer les deux évolutions ?",
          figure: feuille([
            ["Année", "CO₂ (t)"],
            [0, 800],
            [1, 720],
            [2, 648],
            [3, 583],
            [4, 525],
            [5, 472],
            [6, 425],
            [7, 383],
            [8, 344],
          ]),
          correction:
            "a) $-10$ % par an : on multiplie par $0{,}9$. En B3 : « =B2*0,9 ». $800 \\times 0{,}9 = 720$.\nb) La moitié de $800$, c'est $400$. Année $6$ : $425$ t, encore au-dessus. Année $7$ : $383$ t. C'est à partir de l'année $7$.\nc) Baisser de $80$ t, c'est SOUSTRAIRE : en C3, « =C2-80 ». Au bout de $n$ ans, il reste $800 - 80n$ tonnes.\n$800 - 80n = 400$ donne $n = 5$ : la moitié est atteinte à l'année $5$, deux ans plus tôt.\nd) Deux évolutions dans le temps : deux courbes sur le même graphique (les années en abscisse).\nSur le dessin, en centaines de tonnes : la baisse de $10$ % (bleu) ralentit, la baisse de $80$ t (orange) est une droite.\n⭐ $-10$ % enlève $80$ t la première année, puis de moins en moins : la même promesse au départ, deux chemins très différents.",
          schema: repere(
            [-1, 9, -1, 9],
            [
              { pts: [[0, 8], [1, 7.2], [2, 6.48], [3, 5.83], [4, 5.25], [5, 4.72], [6, 4.25], [7, 3.83], [8, 3.44]] },
              { pts: [[0, 8], [5, 4], [8, 1.6]], couleur: ORANGE },
            ],
            [],
            4,
          ),
          micros: ["info_tableur_ecrire_formule", "info_tableur_exploiter_colonne", "info_tableur_diagramme"],
        },
        {
          titre: "Une ville de la révolution industrielle",
          enonce:
            "Dans un modèle, une ville industrielle compte $20\\,000$ habitants en $1820$, et sa population augmente de $20$ % à chaque décennie : les usines attirent les habitants des campagnes. La colonne B est arrondie à l'unité.\na) Quelle formule a-t-on écrite en A3, puis en B3, avant de les recopier vers le bas ?\nb) En quelle année la population a-t-elle doublé pour la première fois ?\nc) Quelle est la hausse, en nombre d'habitants, entre $1860$ et $1870$ ? Comparer à celle entre $1820$ et $1830$.\nd) Quel diagramme choisir pour montrer cette croissance ?",
          figure: feuille([
            ["Année", "Habitants"],
            [1820, 20000],
            [1830, 24000],
            [1840, 28800],
            [1850, 34560],
            [1860, 41472],
            [1870, 49766],
          ]),
          correction:
            "a) Les années avancent de $10$ en $10$ : en A3, « =A2+10 ». La population est multipliée par $1{,}2$ : en B3, « =B2*1,2 ».\nb) Doubler, c'est dépasser $40\\,000$. En $1850$ : $34\\,560$, pas encore. En $1860$ : $41\\,472$. La population a doublé en $1860$, en $40$ ans.\nc) Entre $1860$ et $1870$ : $49\\,766 - 41\\,472 = 8\\,294$ habitants de plus. Entre $1820$ et $1830$ : $24\\,000 - 20\\,000 = 4\\,000$.\nLe même $+20$ % ajoute deux fois plus d'habitants, parce qu'il s'applique à une ville deux fois plus grande.\nd) Une évolution dans le temps : une courbe, avec les années en abscisse.\n⭐ C'est l'exode rural de la révolution industrielle : les villes-usines grossissent de plus en plus vite.\n⚠️ Deux formules, deux gestes : on AJOUTE $10$ aux années, on MULTIPLIE la population par $1{,}2$.",
          micros: ["info_tableur_ecrire_formule", "info_tableur_exploiter_colonne", "info_tableur_diagramme"],
        },
        {
          titre: "Le classement du tournoi",
          enonce:
            "Dans un tournoi de football, une victoire (V) rapporte $3$ points, un nul (N) $1$ point, une défaite (D) aucun. Chaque équipe a joué $9$ matchs.\na) Que calcule la formule de E2 ? La recopier pour les autres équipes.\nb) Quelle équipe a le plus de victoires ? Laquelle a le plus de points ?\nc) Quel diagramme choisir pour comparer les points des quatre équipes ?",
          figure: feuille(
            [
              ["Équipe", "V", "N", "D", "Points"],
              ["Lions", 5, 2, 2, ""],
              ["Aigles", 5, 4, 0, ""],
              ["Loups", 6, 0, 3, ""],
              ["Ours", 3, 3, 3, ""],
            ],
            { surligne: ["E2"], barre: ["E2", "=3*B2+C2"] },
          ),
          correction:
            "a) « =3*B2+C2 » : $3$ points par victoire, plus $1$ point par nul. Les défaites ne rapportent rien : la colonne D n'y est pas.\nRecopiée vers le bas : « =3*B3+C3 », et ainsi de suite.\nLions : $3 \\times 5 + 2 = 17$. Aigles : $3 \\times 5 + 4 = 19$. Loups : $3 \\times 6 + 0 = 18$. Ours : $3 \\times 3 + 3 = 12$.\nb) Les Loups ont le plus de victoires ($6$), mais ce sont les Aigles qui ont le plus de points ($19$) : leurs $4$ nuls valent plus que la victoire d'écart.\nc) Quatre équipes à comparer : un diagramme en barres.\n✔️ Chaque ligne fait bien $9$ matchs : $5 + 2 + 2 = 9$, $5 + 4 + 0 = 9$, $6 + 0 + 3 = 9$, $3 + 3 + 3 = 9$.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "Lions", value: 17 },
              { label: "Aigles", value: 19 },
              { label: "Loups", value: 18 },
              { label: "Ours", value: 12 },
            ], 1),
          ),
          micros: ["info_tableur_comprendre_formule", "info_tableur_ecrire_formule", "info_tableur_diagramme"],
        },
        {
          titre: "Le compteur d'eau",
          enonce:
            "Une famille relève le compteur d'eau de sa maison le $1^{er}$ de chaque mois. La colonne B donne l'index du compteur, en m³ ; la colonne C, la consommation du mois écoulé.\na) Que calcule la formule de C3 ? La recopier jusqu'en C8.\nb) Quel mois a-t-on le plus consommé ? Pourquoi, à votre avis ?\nc) Quelle est la consommation totale ? Donner deux formules possibles.\nd) L'eau coûte $4$ € le m³ (prix d'un modèle). Quelle formule écrire en D3 pour le coût du mois ? Quel est le coût total ?\ne) Quel diagramme choisir pour comparer les mois ?",
          figure: feuille(
            [
              ["Relevé", "Index (m³)", "Conso (m³)"],
              ["1er janv.", 1200, ""],
              ["1er févr.", 1210, 10],
              ["1er mars", 1219, 9],
              ["1er avril", 1231, 12],
              ["1er mai", 1245, 14],
              ["1er juin", 1262, 17],
              ["1er juil.", 1280, 18],
            ],
            { surligne: ["C3"], barre: ["C3", "=B3-B2"] },
          ),
          correction:
            "a) « =B3-B2 » : l'index d'un relevé moins celui du relevé précédent, c'est ce qu'on a consommé entre les deux. Recopiée : « =B4-B3 », … jusqu'à « =B8-B7 ».\nb) Le plus grand nombre de la colonne C est $18$ m³, entre le $1^{er}$ juin et le $1^{er}$ juillet : c'est le mois de juin. On arrose le jardin, on se douche plus souvent.\nc) « =SOMME(C3:C8) », ou « =B8-B2 » : $1\\,280 - 1\\,200 = 80$ m³. Les deux donnent $10 + 9 + 12 + 14 + 17 + 18 = 80$.\nd) En D3 : « =C3*4 ». Coût total : $80 \\times 4 = 320$ €.\ne) Six mois à comparer : un diagramme en barres.\n⚠️ Le compteur CUMULE : l'index ne dit pas ce qu'on a consommé dans le mois. C'est la DIFFÉRENCE de deux index qui le dit.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "janv.", value: 10 },
              { label: "févr.", value: 9 },
              { label: "mars", value: 12 },
              { label: "avril", value: 14 },
              { label: "mai", value: 17 },
              { label: "juin", value: 18 },
            ], 5),
          ),
          micros: ["info_tableur_lire", "info_tableur_comprendre_formule", "info_tableur_ecrire_formule", "info_tableur_exploiter_colonne", "info_tableur_diagramme"],
        },
      ],
    },
  ],
};
