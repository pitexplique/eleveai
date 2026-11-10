// ─── Fiche d'exercices : les longueurs (CM2) — 20 exercices corrigés ──────────
//
// 10/11/2026 : feuille INTERACTIVE du CM2 (une réponse à taper par sous-question,
// vérifiée sans IA), sur la forme de `maths-cm2-tableau.tsx` et de la 6e
// `maths-6e-duree-temps.tsx` : 8 ★, 7 ★★, 5 ★★★, un rappel avant chaque niveau,
// corrigés à la première personne, étape par étape, avec le piège nommé.
//
// Alignée sur la fiche de cours `lib/fiches/maths-cm2-longueurs.tsx`, la banque
// `lib/tutor-v4/questionBank/cm2/maths/longueurs.bank.ts` et la carte mentale
// remplie `lib/cartes/remplies/cm2.json` (clé cm2/longueur) : comparer (même
// unité d'abord), convertir (km, hm, dam, m, dm, cm, mm ; le tableau de
// conversion), estimer (une longueur connue en tête), défis (tout dans la même
// unité avant de calculer).
// ⭐ Règle de Frédéric : ×10, ×100 expliqués par la VALEUR DES CHIFFRES (le
// tableau de conversion : le chiffre des unités dans la colonne de l'unité),
// le « × 100 » seulement en raccourci, après.
// ⛔ AUCUNE question ouverte (CM2) : des nombres, des unités, <, > ou =, vrai ou
// faux, oui ou non, des lettres A, B, C. Bonnes réponses des QCM : B, A, C, A
// (ex. 4), A, B (ex. 8), B (ex. 20).
// ⛔ Aucun exemple de la fiche de cours ni de la carte mentale n'est repris
// (2 km, 3 km + 1 500 m, 80 cm et 1 m, la règle de 30 cm, la piscine de 25 m,
// 2 km + 300 m, 1,5 m et 120 cm, 2,5 m, 45 mm, la trousse, le bus, la piste de
// 400 m, le ruban de 2 m).
//
// Les pièges nommés : 1 m = 10 cm (1), multiplier au lieu de diviser (2),
// comparer sans la même unité (3, 8, 11, 15), le bon nombre avec la mauvaise
// unité (4, 7, 12), oublier les millimètres (5), additionner des unités
// différentes (6, 14), 3,5 m = 305 cm (9), oublier le 0 des unités (10), lire
// seulement le bout de la règle (13), convertir une seule des deux longueurs
// (16, 17, 19, 20), 3,5 m = 35 cm (18).
//
// ⭐ LES MATHS SONT TRANSVERSALES : bricolage (1, 16), voyage (8), nature (11,
// tournesols ; 18, girafe), boulangerie (12), école (13), sport (14, 17),
// santé (15, la toise), métiers du bâtiment (19), jeux (20).
// Les métiers : jardinière (11), boulangère (12), infirmière scolaire (15),
// menuisière (16), soigneuse au zoo (18), carreleur (19).
// Aucun décor de La Réunion sur cette feuille.
//
// ⭐ FAITS RÉELS : la tour Eiffel mesure 330 m (ex. 12, site officiel de la
// tour Eiffel, depuis 2022) ; un marathon fait 42,195 km (ex. 7) ; une pièce de
// 1 euro fait 2,33 mm d'épaisseur (ex. 4, Banque centrale européenne). Tout le
// reste est un MODÈLE, à des ordres de grandeur vraisemblables.
//
// ⭐ LES DESSINS (aides locales, SVG de viewBox 300, police 14, sans `min-w`) :
//   · `tableau` — le TABLEAU DE CONVERSION, un chiffre par colonne, la virgule
//     en orange après la colonne de l'unité, la colonne lue surlignée ;
//   · `regle` — une règle graduée en cm et en mm, un objet posé dessus.
//
// Micro-compétences : longueur_comparer (3, 5, 8, 11, 13, 15), longueur_convertir
// (1, 2, 5, 6, 9, 10, 11, 13, 14, 16, 17, 18, 19, 20), longueur_estimer (4, 7,
// 12, 20), longueur_defi (14, 16, 17, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const NOIR = "#0f172a";
const GRIS = "#94a3b8";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

type LigneTableau = { label?: string; chiffres: Record<string, string>; virgule?: string };

/**
 * LE TABLEAU DE CONVERSION. Une colonne par unité ; une ligne par nombre, un
 * chiffre par case (`chiffres`, écrit EN CLAIR : { m: "3", dm: "5" }) ; la
 * virgule en orange après la colonne `virgule` ; les colonnes `cible` (l'unité
 * qu'on lit) surlignées.
 */
const tableau = (unites: string[], lignes: LigneTableau[], cible: string[] = []) => {
  const avecLabel = lignes.some((l) => l.label);
  const wL = avecLabel ? 30 : 0;
  const x0 = 4 + wL;
  const w = (296 - x0) / unites.length;
  const H = 28 + lignes.length * 30 + 4;
  const X = (u: string) => x0 + unites.indexOf(u) * w;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg
        viewBox={`0 0 300 ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Tableau de conversion, colonnes ${unites.join(", ")}.`}
      >
        {unites.map((u, i) => {
          const c = cible.includes(u);
          return (
            <g key={u}>
              <rect x={x0 + i * w} y={2} width={w} height={26} fill={c ? "#ffedd5" : "#f1f5f9"} stroke={c ? ORANGE : GRIS} strokeWidth={c ? 2 : 1} />
              <text x={x0 + i * w + w / 2} y={20} textAnchor="middle" fontSize={14} fontWeight={700} fill={c ? ORANGE : NOIR}>
                {u}
              </text>
            </g>
          );
        })}
        {lignes.map((l, j) => {
          const y = 28 + j * 30;
          return (
            <g key={j}>
              {l.label ? (
                <text x={4 + wL / 2} y={y + 20} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
                  {l.label}
                </text>
              ) : null}
              {unites.map((u, i) => (
                <g key={u}>
                  <rect x={x0 + i * w} y={y} width={w} height={30} fill="#fff" stroke={GRIS} strokeWidth={1} />
                  {l.chiffres[u] ? (
                    <text x={x0 + i * w + w / 2} y={y + 20} textAnchor="middle" fontSize={14} fontWeight={700} fill={BLEU}>
                      {l.chiffres[u]}
                    </text>
                  ) : null}
                </g>
              ))}
              {l.virgule ? (
                <text x={X(l.virgule) + w} y={y + 25} textAnchor="middle" fontSize={18} fontWeight={900} fill={ORANGE}>
                  ,
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * UNE RÈGLE graduée de 0 à `cm` centimètres, avec ses millimètres ; un objet
 * (`nom`) posé dessus de `debut` à `fin` (en cm). ⛔ L'étiquette d'accessibilité
 * ne donne pas les mesures : c'est la question.
 */
const regle = (cm: number, debut: number, fin: number, nom: string) => {
  const x0 = 14;
  const u = 272 / cm;
  const X = (v: number) => x0 + v * u;
  const traits = Array.from({ length: cm * 10 + 1 }, (_, k) => k);
  return (
    <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
      <svg viewBox="0 0 300 96" className="block h-auto w-full" role="img" aria-label={`Une règle graduée en centimètres et en millimètres, de 0 à ${cm}. Un objet, ${nom}, est posé dessus.`}>
        <rect x={X(debut)} y={6} width={X(fin) - X(debut)} height={24} rx={4} fill="#fed7aa" stroke={ORANGE} strokeWidth={2} />
        <text x={(X(debut) + X(fin)) / 2} y={23} textAnchor="middle" fontSize={14} fontWeight={700} fill="#9a3412">
          {nom}
        </text>
        <line x1={X(debut)} y1={30} x2={X(debut)} y2={40} stroke={ORANGE} strokeWidth={1.5} strokeDasharray="2 2" />
        <line x1={X(fin)} y1={30} x2={X(fin)} y2={40} stroke={ORANGE} strokeWidth={1.5} strokeDasharray="2 2" />
        <rect x={4} y={40} width={292} height={52} rx={3} fill="#fef9c3" stroke="#a16207" strokeWidth={1.5} />
        {traits.map((k) => (
          <line
            key={k}
            x1={X(k / 10)}
            y1={40}
            x2={X(k / 10)}
            y2={40 + (k % 10 === 0 ? 18 : k % 5 === 0 ? 12 : 7)}
            stroke={NOIR}
            strokeWidth={k % 10 === 0 ? 1.6 : 0.8}
          />
        ))}
        {Array.from({ length: cm + 1 }, (_, c) => c).map((c) => (
          <text key={`n${c}`} x={X(c)} y={78} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
            {c}
          </text>
        ))}
      </svg>
    </div>
  );
};

const UNITES = ["km", "hm", "dam", "m", "dm", "cm", "mm"];

export const exercicesLongueurCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "longueur",
  titre: "Les longueurs",
  accroche:
    "Vingt exercices, du geste seul au problème. Convertir des km, des m, des cm et des mm avec le tableau. Comparer deux longueurs. Lire une règle. Estimer la bonne longueur. Une étagère, des tournesols, une girafe, une piste cyclable, une pile de jetons. Un rappel avant chaque niveau. Cherche d'abord au brouillon, tape ta réponse, puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/longueur", titre: "Les longueurs" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde bien l'unité avant de répondre.",
      rappel: [
        "Les unités, de la plus grande à la plus petite : km, hm, dam, m, dm, cm, mm.",
        "Chaque unité vaut 10 fois la suivante : 1 m = 10 dm = 100 cm = 1 000 mm.",
        "1 km = 1 000 m et 1 cm = 10 mm.",
        "Pour comparer deux longueurs, je les écris d'abord dans la même unité.",
      ],
      exercices: [
        {
          enonce: "Complète.\na) 4 m = … cm\nb) 7 cm = … mm\nc) 5 km = … m\nd) 6 dm = … cm",
          reponses: [
            { question: "a)", attendu: "400", unite: "cm" },
            { question: "b)", attendu: "70", unite: "mm" },
            { question: "c)", attendu: "5000", unite: "m" },
            { question: "d)", attendu: "60", unite: "cm" },
          ],
          correction:
            "Je passe à une unité plus petite : il en faut plus, le nombre grandit.\na) Dans 4 m, le 4 est le chiffre des mètres. Je l'écris dans la colonne m du tableau.\nJe complète par des 0 jusqu'à la colonne cm : 4 0 0. Donc 4 m = 400 cm.\nb) 1 cm = 10 mm. Le 7 va dans la colonne cm, un 0 dans la colonne mm : 7 cm = 70 mm.\nc) 1 km = 1 000 m. Le 5 va en km, puis 0 en hm, en dam et en m : 5 km = 5 000 m.\nd) 1 dm = 10 cm. 6 dm = 60 cm.\n⭐ Le raccourci, après : vers une unité plus petite, je multiplie par 10, 100 ou 1 000.\n⛔ Le piège : écrire 4 m = 40 cm. Entre m et cm, il y a deux colonnes : 1 m = 100 cm.\nRéponse : a) 400 cm ; b) 70 mm ; c) 5 000 m ; d) 60 cm.",
          schema: ecranSeulement(
            tableau(UNITES, [
              { label: "a)", chiffres: { m: "4", dm: "0", cm: "0" } },
              { label: "c)", chiffres: { km: "5", hm: "0", dam: "0", m: "0" } },
            ], ["cm", "m"]),
          ),
          micros: ["longueur_convertir"],
        },
        {
          enonce: "Complète.\na) 300 cm = … m\nb) 8 000 m = … km\nc) 90 mm = … cm\nd) 250 cm = … dm",
          reponses: [
            { question: "a)", attendu: "3", unite: "m" },
            { question: "b)", attendu: "8", unite: "km" },
            { question: "c)", attendu: "9", unite: "cm" },
            { question: "d)", attendu: "25", unite: "dm" },
          ],
          correction:
            "Je passe à une unité plus grande : il en faut moins, le nombre devient plus petit.\na) 100 cm font 1 m. Dans 300, il y a 3 centaines : 3 paquets de 100 cm. 300 cm = 3 m.\nb) 1 000 m font 1 km. 8 000 m, ce sont 8 milliers de mètres : 8 km.\nc) 10 mm font 1 cm. 90 mm, ce sont 9 dizaines de mm : 9 cm.\nd) 10 cm font 1 dm. 250 cm, ce sont 25 dizaines de cm : 25 dm.\n⭐ Le raccourci, après : vers une unité plus grande, je divise par 10, 100 ou 1 000.\n⛔ Le piège : multiplier au lieu de diviser, et écrire 300 cm = 30 000 m. Une unité plus grande donne un nombre plus PETIT.\nRéponse : a) 3 m ; b) 8 km ; c) 9 cm ; d) 25 dm.",
          schema: ecranSeulement(
            tableau(UNITES, [
              { label: "a)", chiffres: { m: "3", dm: "0", cm: "0" } },
              { label: "d)", chiffres: { m: "2", dm: "5", cm: "0" } },
            ], ["m", "dm"]),
          ),
          micros: ["longueur_convertir"],
        },
        {
          enonce: "Écris <, > ou =.\na) 3 m … 250 cm\nb) 48 mm … 5 cm\nc) 2 km … 2 000 m\nd) 70 cm … 1 m",
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "<" },
            { question: "c)", attendu: "=" },
            { question: "d)", attendu: "<" },
          ],
          correction:
            "Je mets les deux longueurs dans la même unité, puis je compare les nombres.\na) 3 m = 300 cm. 300 > 250, donc 3 m > 250 cm.\nb) 5 cm = 50 mm. 48 < 50, donc 48 mm < 5 cm.\nc) 2 km = 2 000 m : les deux longueurs sont égales.\nd) 1 m = 100 cm. 70 < 100, donc 70 cm < 1 m.\n⛔ Le piège : comparer 70 et 1 sans regarder l'unité. 70 est plus grand que 1, mais 70 cm est plus court que 1 m.\nRéponse : a) > ; b) < ; c) = ; d) <.",
          micros: ["longueur_comparer"],
        },
        {
          enonce:
            "Choisis la bonne longueur. Réponds par A, B ou C.\na) La hauteur d'une table de classe : A) 70 m   B) 70 cm   C) 70 mm\nb) La longueur d'un crayon neuf : A) 17 cm   B) 17 m   C) 17 mm\nc) La distance entre deux villes voisines : A) 12 m   B) 12 cm   C) 12 km\nd) L'épaisseur d'une pièce de 1 euro : A) 2 mm   B) 2 cm   C) 2 m",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
            { question: "c)", attendu: "C" },
            { question: "d)", attendu: "A" },
          ],
          correction:
            "Je compare à des longueurs que je connais. 1 cm, c'est la largeur d'un doigt. 1 m, c'est un grand pas.\na) Une table arrive à la taille d'un élève : 70 cm. 70 m, c'est plus haut qu'un immeuble !\nb) Un crayon tient dans la main : 17 cm.\nc) Entre deux villes, on roule en voiture : 12 km.\nd) Une pièce est très fine : 2 mm.\n⛔ Le piège : garder le bon nombre avec la mauvaise unité. Les trois choix ont le même nombre : c'est l'unité qui décide.\nRéponse : a) B ; b) A ; c) C ; d) A.",
          micros: ["longueur_estimer"],
        },
        {
          enonce: "Lis la règle. Elle est graduée en cm et en mm.\na) Combien de millimètres mesure le clou ?\nb) Écris sa longueur en cm.\nc) Le clou est-il plus long que 6 cm ? Réponds oui ou non.",
          figure: regle(8, 0, 6.4, "clou"),
          reponses: [
            { question: "a)", attendu: "64", unite: "mm" },
            { question: "b)", attendu: "6,4", unite: "cm" },
            { question: "c)", attendu: "oui" },
          ],
          correction:
            "Le clou commence au 0 : je lis seulement sa fin.\nLa fin est après le 6, à 4 petits traits.\nUn petit trait, c'est 1 mm. Et 1 cm = 10 mm.\na) 6 cm = 60 mm, plus 4 mm : 64 mm.\nb) 6 cm et 4 mm, c'est 6,4 cm. Le 4 est le chiffre des mm : il se place juste après la virgule.\nc) 64 mm > 60 mm : oui, le clou dépasse 6 cm.\n⛔ Le piège : lire 6 cm et oublier les petits traits. Je compte les mm après le dernier nombre.\nRéponse : a) 64 mm ; b) 6,4 cm ; c) oui.",
          micros: ["longueur_comparer", "longueur_convertir"],
        },
        {
          enonce: "Pour bricoler, Hugo mesure des baguettes de bois. Complète.\na) 6 m 25 cm = … cm\nb) 3 km 200 m = … m\nc) 8 cm 3 mm = … mm",
          reponses: [
            { question: "a)", attendu: "625", unite: "cm" },
            { question: "b)", attendu: "3200", unite: "m" },
            { question: "c)", attendu: "83", unite: "mm" },
          ],
          correction:
            "Je convertis d'abord la grande unité, puis j'ajoute le reste.\na) 6 m = 600 cm. 600 + 25 = 625 cm.\nb) 3 km = 3 000 m. 3 000 + 200 = 3 200 m.\nc) 8 cm = 80 mm. 80 + 3 = 83 mm.\n⛔ Le piège : additionner 6 + 25 = 31. Les mètres et les centimètres ne s'additionnent pas : je convertis d'abord les mètres.\nRéponse : a) 625 cm ; b) 3 200 m ; c) 83 mm.",
          micros: ["longueur_convertir"],
        },
        {
          enonce: "Complète avec la bonne unité : mm, cm, m ou km.\na) Une fourmi mesure 5 …\nb) Un immeuble de 10 étages mesure 30 … de haut.\nc) Un marathon mesure 42 …\nd) Un lit mesure 2 … de long.",
          reponses: [
            { question: "a)", attendu: ["mm", "millimètre"] },
            { question: "b)", attendu: ["m", "mètre"] },
            { question: "c)", attendu: ["km", "kilomètre"] },
            { question: "d)", attendu: ["m", "mètre"] },
          ],
          correction:
            "Je pense à une longueur que je connais, et je cherche l'unité qui va avec.\na) Une fourmi est plus petite qu'un ongle : 5 mm.\nb) Un étage, c'est environ 3 m. 10 étages : 30 m.\nc) Un marathon se court pendant des heures : 42 km.\nd) Un lit est un peu plus long qu'un adulte : 2 m.\n⛔ Le piège : écrire 5 cm pour la fourmi. 5 cm, c'est la longueur d'un doigt : une fourmi géante !\nRéponse : a) mm ; b) m ; c) km ; d) m.",
          micros: ["longueur_estimer"],
        },
        {
          enonce:
            "Pour son voyage, Ana compare des longueurs. Réponds par A, B ou C.\na) Quelle longueur est la plus grande ? A) 1,3 m   B) 128 cm   C) 1 290 mm\nb) Quelle distance est la plus petite ? A) 4 km   B) 3 900 m   C) 4 050 m",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "B" },
          ],
          correction:
            "Je mets tout dans la même unité.\na) Tout en mm. 1,3 m = 1 300 mm ; 128 cm = 1 280 mm ; et 1 290 mm.\nLe plus grand est 1 300 mm : c'est 1,3 m.\nb) Tout en m. 4 km = 4 000 m. Je compare 4 000, 3 900 et 4 050.\nLe plus petit est 3 900 m.\n⛔ Le piège : choisir 1 290 mm parce que c'est le plus grand nombre écrit. Sans la même unité, les nombres ne se comparent pas.\nRéponse : a) A ; b) B.",
          micros: ["longueur_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "J'utilise le tableau de conversion, puis je calcule dans une seule unité.",
      rappel: [
        "Tableau : km | hm | dam | m | dm | cm | mm.",
        "Le chiffre des unités va dans la colonne de l'unité. La virgule se place juste après.",
        "Exemple : 1,7 m → 1 dans la colonne m, 7 dans la colonne dm. Donc 1,7 m = 17 dm = 170 cm.",
        "On n'additionne que des longueurs écrites dans la même unité.",
      ],
      exercices: [
        {
          enonce: "Complète.\na) 3,5 m = … cm\nb) 2,4 km = … m\nc) 7,5 cm = … mm\nd) 1,25 m = … cm",
          reponses: [
            { question: "a)", attendu: "350", unite: "cm" },
            { question: "b)", attendu: "2400", unite: "m" },
            { question: "c)", attendu: "75", unite: "mm" },
            { question: "d)", attendu: "125", unite: "cm" },
          ],
          correction:
            "J'écris le nombre dans le tableau. Le chiffre des unités va dans la colonne de l'unité.\na) 3,5 m : 3 dans la colonne m, 5 dans la colonne dm. Je complète par un 0 en cm : 3 5 0. Donc 3,5 m = 350 cm.\nb) 2,4 km : 2 en km, 4 en hm, puis 0 en dam et 0 en m : 2,4 km = 2 400 m.\nc) 7,5 cm : 7 en cm, 5 en mm : 7,5 cm = 75 mm.\nd) 1,25 m : 1 en m, 2 en dm, 5 en cm : 1,25 m = 125 cm.\n⭐ Le raccourci, après : des m aux cm, × 100. 3,5 × 100 = 350.\n⛔ Le piège : écrire 3,5 m = 305 cm. Le 5 est le chiffre des dm : il vaut 50 cm.\nRéponse : a) 350 cm ; b) 2 400 m ; c) 75 mm ; d) 125 cm.",
          schema: ecranSeulement(
            tableau(UNITES, [
              { label: "a)", chiffres: { m: "3", dm: "5", cm: "0" }, virgule: "m" },
              { label: "d)", chiffres: { m: "1", dm: "2", cm: "5" }, virgule: "m" },
            ], ["cm"]),
          ),
          micros: ["longueur_convertir"],
        },
        {
          enonce: "Complète.\na) 450 cm = … m\nb) 1 600 m = … km\nc) 38 mm = … cm\nd) 75 cm = … m",
          reponses: [
            { question: "a)", attendu: "4,5", unite: "m" },
            { question: "b)", attendu: "1,6", unite: "km" },
            { question: "c)", attendu: "3,8", unite: "cm" },
            { question: "d)", attendu: "0,75", unite: "m" },
          ],
          correction:
            "J'écris le nombre : son dernier chiffre va dans la colonne de son unité. Puis je mets la virgule juste après la colonne de la nouvelle unité.\na) 450 cm : 0 en cm, 5 en dm, 4 en m. Virgule après les m : 4,50 m, soit 4,5 m.\nb) 1 600 m : 0 en m, 0 en dam, 6 en hm, 1 en km. Virgule après les km : 1,6 km.\nc) 38 mm : 8 en mm, 3 en cm. Virgule après les cm : 3,8 cm.\nd) 75 cm : 5 en cm, 7 en dm, rien en m. J'écris un 0 en m : 0,75 m.\n⛔ Le piège : oublier le 0 et écrire « ,75 m » ou 75 m. Il n'y a pas de mètre entier : 0,75 m.\nRéponse : a) 4,5 m ; b) 1,6 km ; c) 3,8 cm ; d) 0,75 m.",
          schema: ecranSeulement(
            tableau(UNITES, [
              { label: "a)", chiffres: { m: "4", dm: "5", cm: "0" }, virgule: "m" },
              { label: "d)", chiffres: { m: "0", dm: "7", cm: "5" }, virgule: "m" },
            ], ["m"]),
          ),
          micros: ["longueur_convertir"],
        },
        {
          enonce:
            "La jardinière de l'école mesure quatre tournesols.\nA : 1,2 m. B : 95 cm. C : 1 050 mm. D : 1,15 m.\na) Écris les quatre hauteurs en cm, dans l'ordre A, B, C, D.\nb) Range les lettres du plus petit au plus grand tournesol.\nc) De combien de cm le plus grand dépasse-t-il le plus petit ?",
          reponses: [
            { question: "a)", attendu: "120 ; 95 ; 105 ; 115", ordre: true },
            { question: "b)", attendu: "B ; C ; D ; A", ordre: true },
            { question: "c)", attendu: "25" },
          ],
          correction:
            "Je choisis une seule unité : le cm.\na) A : 1,2 m = 120 cm. B : 95 cm.\nC : 1 050 mm. 10 mm font 1 cm, donc 1 050 mm = 105 cm.\nD : 1,15 m = 115 cm.\nb) Je range : 95 < 105 < 115 < 120. Donc B, C, D, A.\nc) 120 − 95 = 25 cm.\n⛔ Le piège : croire que C est le plus grand, parce que 1 050 est le plus grand nombre. C est en mm : il ne fait que 105 cm.\nRéponse : a) 120 ; 95 ; 105 ; 115 ; b) B, C, D, A ; c) 25 cm.",
          micros: ["longueur_comparer", "longueur_convertir"],
        },
        {
          enonce:
            "Vrai ou faux ?\na) La baguette de la boulangère mesure environ 60 cm.\nb) Un terrain de football mesure environ 100 km de long.\nc) La tour Eiffel mesure environ 330 m de haut.\nd) Un timbre mesure environ 3 m de large.",
          reponses: [
            { question: "a)", attendu: "vrai" },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "vrai" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "Je compare à des longueurs que je connais.\na) Une baguette, c'est un peu plus que la longueur d'un bras d'enfant : environ 60 cm. Vrai.\nb) Un terrain de football mesure environ 100 m, pas 100 km. 100 km, c'est plus d'une heure de voiture ! Faux.\nc) La tour Eiffel mesure 330 m. Vrai.\nd) Un timbre mesure environ 3 cm. 3 m, c'est plus large qu'une porte. Faux.\n⛔ Le piège : lire le nombre et pas l'unité. 100 m et 100 km, ce n'est pas du tout la même chose.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["longueur_estimer"],
        },
        {
          enonce: "Sur la règle, la gomme ne commence pas au 0.\na) Sur quelle graduation commence la gomme ? Donne-la en cm.\nb) Combien de mm mesure la gomme ?\nc) Léo dit : « La gomme mesure 7,5 cm. » A-t-il raison ? Réponds oui ou non.",
          figure: regle(10, 2, 7.5, "gomme"),
          reponses: [
            { question: "a)", attendu: "2", unite: "cm" },
            { question: "b)", attendu: "55" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "a) Le bord gauche de la gomme est sur le 2 : elle commence à 2 cm.\nb) Le bord droit est après le 7, à 5 petits traits : 7 cm et 5 mm, soit 75 mm.\nLe début, 2 cm, c'est 20 mm.\nLa gomme mesure 75 − 20 = 55 mm.\nc) Non. 7,5 cm, c'est la graduation de la fin, pas la longueur. La gomme mesure 55 mm, soit 5,5 cm.\n⛔ Le piège : lire seulement le bout de droite. Quand l'objet ne part pas du 0, j'enlève le début.\nRéponse : a) 2 cm ; b) 55 mm ; c) non.",
          micros: ["longueur_comparer", "longueur_convertir"],
        },
        {
          enonce:
            "Malik fait un tour à vélo. Il roule 2 km 500 m, puis 1 800 m, puis 1,2 km.\na) Écris les trois distances en m, dans l'ordre.\nb) Quelle distance a-t-il roulée en tout, en m ?\nc) Écris ce total en km.",
          reponses: [
            { question: "a)", attendu: "2500 ; 1800 ; 1200", ordre: true },
            { question: "b)", attendu: "5500", unite: "m" },
            { question: "c)", attendu: "5,5", unite: "km" },
          ],
          correction:
            "Je mets tout en mètres avant d'additionner.\na) 2 km 500 m = 2 000 + 500 = 2 500 m.\n1 800 m reste 1 800 m.\n1,2 km = 1 200 m.\nb) 2 500 + 1 800 + 1 200 = 5 500 m.\nc) 1 000 m font 1 km. 5 500 m, c'est 5 km et 500 m : 5,5 km.\n⛔ Le piège : additionner 2,5 + 1 800 + 1,2. Ces nombres ne sont pas dans la même unité.\nRéponse : a) 2 500 ; 1 800 ; 1 200 ; b) 5 500 m ; c) 5,5 km.",
          micros: ["longueur_convertir", "longueur_defi"],
        },
        {
          enonce:
            "L'infirmière scolaire mesure trois amis.\nMathis : 1,42 m. Zoé : 139 cm. Inès : 1 m 45 cm.\na) Qui est le plus grand ?\nb) Qui est le plus petit ?\nc) De combien de cm Inès dépasse-t-elle Zoé ?",
          reponses: [
            { question: "a)", attendu: "Inès" },
            { question: "b)", attendu: "Zoé" },
            { question: "c)", attendu: "6" },
          ],
          correction:
            "Je mets les trois tailles en cm.\nMathis : 1,42 m = 142 cm.\nZoé : 139 cm.\nInès : 1 m 45 cm = 100 + 45 = 145 cm.\na) 145 est le plus grand : Inès.\nb) 139 est le plus petit : Zoé.\nc) 145 − 139 = 6 cm.\n⛔ Le piège : croire que Zoé est la plus grande, parce que 139 est un grand nombre. Sa taille est en cm, celle de Mathis en m.\nRéponse : a) Inès ; b) Zoé ; c) 6 cm.",
          micros: ["longueur_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout l'énoncé. Je mets toutes les longueurs dans la même unité, puis je calcule.",
      rappel: [
        "Je souligne chaque longueur et son unité.",
        "Je choisis UNE unité, et j'y convertis tout.",
        "Je calcule, puis je vérifie que ma réponse est vraisemblable.",
      ],
      exercices: [
        {
          titre: "Les étagères",
          enonce:
            "Une menuisière a une planche de 2,4 m. Elle y coupe 4 étagères de 55 cm chacune.\na) Combien de cm mesure la planche ?\nb) Combien de cm a-t-elle coupés en tout ?\nc) Combien de cm de planche reste-t-il ?",
          reponses: [
            { question: "a)", attendu: "240" },
            { question: "b)", attendu: "220" },
            { question: "c)", attendu: "20" },
          ],
          correction:
            "a) 2,4 m : 2 dans la colonne m, 4 dans la colonne dm, 0 en cm. 2,4 m = 240 cm.\nb) 4 étagères de 55 cm : 4 × 55 = 220 cm.\nc) 240 − 220 = 20 cm.\n⭐ Je vérifie : 220 + 20 = 240.\n⛔ Le piège : calculer 2,4 − 220. Je convertis d'abord la planche en cm.\nRéponse : a) 240 cm ; b) 220 cm ; c) 20 cm.",
          micros: ["longueur_defi", "longueur_convertir"],
        },
        {
          titre: "La piste cyclable",
          enonce:
            "Une piste cyclable fait une boucle de 1 250 m. Lucas en fait 4 tours.\na) Combien de mètres a-t-il roulé ?\nb) Écris cette distance en km.\nc) Lucas voulait rouler 6 km. Combien de mètres lui manque-t-il ?",
          reponses: [
            { question: "a)", attendu: "5000", unite: "m" },
            { question: "b)", attendu: "5", unite: "km" },
            { question: "c)", attendu: "1000", unite: "m" },
          ],
          correction:
            "a) 4 tours de 1 250 m : 4 × 1 250 = 5 000 m.\nb) 1 000 m font 1 km. 5 000 m = 5 km.\nc) 6 km = 6 000 m. 6 000 − 5 000 = 1 000 m.\n⛔ Le piège : faire 6 − 5 000. Je mets d'abord les 6 km en mètres.\nRéponse : a) 5 000 m ; b) 5 km ; c) 1 000 m.",
          micros: ["longueur_defi", "longueur_convertir"],
        },
        {
          titre: "La girafe et son petit",
          enonce:
            "Au zoo, la soigneuse mesure une girafe adulte : 5,3 m. Son girafon mesure 1,8 m.\na) De combien de mètres l'adulte dépasse-t-elle le girafon ?\nb) Écris cet écart en cm.\nc) La soigneuse mesure 1,65 m. De combien de cm le girafon est-il plus grand qu'elle ?",
          reponses: [
            { question: "a)", attendu: "3,5", unite: "m" },
            { question: "b)", attendu: "350", unite: "cm" },
            { question: "c)", attendu: "15" },
          ],
          correction:
            "a) 5,3 − 1,8 = 3,5 m.\nb) 3,5 m : 3 dans la colonne m, 5 dans la colonne dm, 0 en cm. 3,5 m = 350 cm.\nc) Je mets tout en cm. 1,8 m = 180 cm. 1,65 m = 165 cm.\n180 − 165 = 15 cm.\n⛔ Le piège : écrire 3,5 m = 35 cm. Le 5 est le chiffre des dm : il vaut 50 cm.\nRéponse : a) 3,5 m ; b) 350 cm ; c) 15 cm.",
          micros: ["longueur_defi", "longueur_convertir"],
        },
        {
          titre: "La frise du mur",
          enonce:
            "Un carreleur pose une ligne de carreaux de 25 cm de long. Le mur mesure 3 m.\na) Combien de cm mesure le mur ?\nb) Combien de carreaux faut-il pour tout le mur ?\nc) Un autre mur mesure 4,5 m. Combien de carreaux faut-il ?",
          reponses: [
            { question: "a)", attendu: "300" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "18" },
          ],
          correction:
            "a) 3 m = 300 cm.\nb) Combien de fois 25 cm dans 300 cm ? 300 ÷ 25 = 12 carreaux.\n⭐ Je vérifie : 4 carreaux font 100 cm, donc 12 carreaux font 300 cm.\nc) 4,5 m = 450 cm. 450 ÷ 25 = 18 carreaux.\n⛔ Le piège : faire 3 ÷ 25. Les deux longueurs doivent être en cm.\nRéponse : a) 300 cm ; b) 12 carreaux ; c) 18 carreaux.",
          micros: ["longueur_defi", "longueur_convertir"],
        },
        {
          titre: "La pile de jetons",
          enonce:
            "Un jeton de jeu a une épaisseur de 4 mm. Nour fait une pile de 12 cm de haut.\na) Combien de mm mesure la pile ?\nb) Combien de jetons y a-t-il dans la pile ?\nc) Une pile de 50 jetons mesure : A) 2 m   B) 20 cm   C) 2 cm. Réponds par A, B ou C.",
          reponses: [
            { question: "a)", attendu: "120" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "a) 1 cm = 10 mm. 12 cm = 120 mm.\nb) Chaque jeton fait 4 mm : 120 ÷ 4 = 30 jetons.\nc) 50 × 4 = 200 mm. 10 mm font 1 cm, donc 200 mm = 20 cm.\n⭐ C'est vraisemblable : 20 cm, c'est la hauteur d'une bouteille. 2 m, ce serait plus haut qu'une porte !\n⛔ Le piège : diviser 12 par 4 sans convertir, et trouver 3 jetons.\nRéponse : a) 120 mm ; b) 30 jetons ; c) B.",
          micros: ["longueur_defi", "longueur_estimer", "longueur_convertir"],
        },
      ],
    },
  ],
};
