// ─── Fiche d'exercices : trier et classer (CE1) — 20 exercices corrigés ───────
//
// 17/11/2026 : la feuille interactive de la notion `trier_classer` du coach
// CE1 (2 micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé.
// ⚠️ Notion HORS PROGRAMME FRANÇAIS (Suisse, Belgique, Sénégal, Côte
// d'Ivoire), masquée en France dans le coach (`lib/tutor-v4/micros-masquees.ts`),
// comme la feuille CM1 `maths-cm1-trier-classer.tsx`. Alignée sur la banque
// `lib/tutor-v4/questionBank/ce1/maths/trier-classer.bank.ts` : trier selon
// un critère, trouver l'intrus, le point commun d'un groupe, lire et
// compléter deux ensembles (qui se croisent ou non).
// ⛔ LIMITES DU CE1 : deux critères au plus, deux ensembles au plus, des
// nombres < 100. Phrases très courtes (16 mots au plus) : ces élèves lisent
// peu. ★1-★2 sans histoire, ★3 avec un métier (comme la banque).
// ⛔ Aucune question à rédiger : QCM par lettre, oui ou non, un nombre, un mot.
//
// Les pièges nommés : trier par la couleur au lieu de la sorte (1), compter
// les formes d'une seule couleur (2), l'intrus par la taille des chiffres
// (3), le canard « qui nage » (4), 100 « à deux chiffres » (5), l'intrus par la
// couleur (6), un point commun qui n'est vrai que pour un (7), le 10 oublié
// dans « 10 ou plus » (8), oublier la zone commune (9, 15, 17, LE piège des
// ensembles), compter les bleus de toutes les formes (10), placer un nombre
// dans un seul ensemble (11), une raison qui ne sépare rien (12), oublier le
// dehors (13), oublier le premier tri (14), « 35 va avec » (16), soustraire
// au mauvais tas (18), lire une seule case d'une colonne (19), additionner
// deux ensembles qui se croisent (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : fruits et légumes (1, 9, 19), formes (2, 6,
// 10), nombres (3, 5, 8, 11, 14, 16), animaux (4, 7, 12), transports (13),
// sport (15), livres (17), courrier (18), vacances (20). Métiers :
// bibliothécaire (17), facteur (18), marchand de fruits (19), animatrice
// (20). Aucun contexte réunionnais sur cette feuille.
//
// ⭐ FAITS RÉELS : aucun. Tous les nombres sont des MODÈLES.
//
// ⭐ LES DESSINS (locaux) : `venn` (deux ensembles qui se croisent, noms au-dessus),
// `formes` (locale : des ronds, des carrés, des triangles en couleurs) et
// `deuxBoites` (locale : deux ensembles séparés).
//
// Micro-compétences : ce1_tri_critere (1, 2, 3, 5, 6, 7, 8, 10, 12, 14, 16,
// 18), ce1_tri_ensembles (4, 9, 11, 13, 15, 17, 19, 20). 2/2.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/**
 * Deux ENSEMBLES QUI SE CROISENT (sur le modèle de `venn` de figures.tsx), le
 * nom de chaque ensemble AU-DESSUS de son cercle : dans `venn`, il tombait sur
 * le trait du cercle, illisible au vidéoprojecteur (vu au rendu le 17/11).
 * `dehors` : une seule étiquette, en bas à droite. Texte NU.
 */
const venn = (zones: { aSeul: string[]; commun: string[]; bSeul: string[]; dehors?: string[] }, noms: { a: string; b: string; e: string }) => {
  const cy = 108;
  const colonne = (els: string[], x: number) =>
    els.map((t, i) => (
      <text key={i} x={x} y={cy + 5 + (i - (els.length - 1) / 2) * 18} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">
        {t}
      </text>
    ));
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 200" className="block h-auto w-full" role="img" aria-label="Deux ensembles qui se croisent">
        <rect x="4" y="4" width="292" height="192" rx="12" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="118" cy={cy} r="66" fill="#2563eb" fillOpacity={0.12} stroke="#2563eb" strokeWidth="2.5" />
        <circle cx="182" cy={cy} r="66" fill="#ea580c" fillOpacity={0.12} stroke="#ea580c" strokeWidth="2.5" />
        <text x="96" y="30" textAnchor="middle" fontSize="15" fontWeight="900" fill="#2563eb">{noms.a}</text>
        <text x="204" y="30" textAnchor="middle" fontSize="15" fontWeight="900" fill="#ea580c">{noms.b}</text>
        {colonne(zones.aSeul, 88)}
        {colonne(zones.commun, 150)}
        {colonne(zones.bSeul, 212)}
        <text x="14" y="188" fontSize="13" fontWeight="900" fill="#475569">{noms.e}</text>
        {zones.dehors?.length ? (
          <text x="286" y="188" textAnchor="end" fontSize="13" fontWeight="700" fill="#475569">
            {zones.dehors.join(", ")}
          </text>
        ) : null}
      </svg>
    </div>
  );
};

const OUI = ["oui", "vrai"];
const NON = ["non", "faux"];

const COULEURS = { rouge: ["#fecaca", "#dc2626"], bleu: ["#bfdbfe", "#2563eb"], jaune: ["#fef08a", "#ca8a04"] } as const;
type Couleur = keyof typeof COULEURS;
type FormeTri = { f: "rond" | "carre" | "triangle"; c: Couleur; lettre?: string };

/** Des formes colorées, par rangées de 4 (8 au plus), une lettre dessous si besoin. */
const formes = (liste: FormeTri[]) => {
  const pas = 56;
  const parRangee = Math.min(4, liste.length);
  const rangees = Math.ceil(liste.length / parRangee);
  const W = parRangee * pas + 12;
  const avecLettres = liste.some((x) => x.lettre);
  const hRangee = avecLettres ? 80 : 58;
  const H = rangees * hRangee + 4;
  return (
    <div className="mx-auto w-full max-w-[15rem] print:max-w-[11rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Des formes en couleurs">
        {liste.map((x, k) => {
          const cx = 6 + pas / 2 + (k % parRangee) * pas;
          const cy = 30 + Math.floor(k / parRangee) * hRangee;
          const [fond, trait] = COULEURS[x.c];
          const props = { fill: fond, stroke: trait, strokeWidth: 2.5 };
          return (
            <g key={k}>
              {x.f === "rond" ? <circle cx={cx} cy={cy} r={19} {...props} /> : null}
              {x.f === "carre" ? <rect x={cx - 18} y={cy - 18} width={36} height={36} {...props} /> : null}
              {x.f === "triangle" ? <polygon points={`${cx},${cy - 21} ${cx + 21},${cy + 19} ${cx - 21},${cy + 19}`} {...props} strokeLinejoin="round" /> : null}
              {x.lettre ? (
                <text x={cx} y={cy + 44} textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
                  {x.lettre}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** Deux ENSEMBLES SÉPARÉS : deux cadres arrondis, leur nom, leurs éléments. */
const deuxBoites = (a: { nom: string; el: string[] }, b: { nom: string; el: string[] }) => {
  const boite = (x: number, e: { nom: string; el: string[] }, couleur: string, fond: string) => (
    <g>
      <rect x={x} y={8} width={138} height={150} rx={22} fill={fond} stroke={couleur} strokeWidth={2.5} />
      <text x={x + 69} y={30} textAnchor="middle" fontSize="14" fontWeight="900" fill={couleur}>
        {e.nom}
      </text>
      {e.el.map((t, i) => (
        <text key={t} x={x + 69} y={60 + i * 22} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">
          {t}
        </text>
      ))}
    </g>
  );
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 166" className="block h-auto w-full" role="img" aria-label="Deux ensembles séparés">
        {boite(6, a, "#2563eb", "#eff6ff")}
        {boite(156, b, "#ea580c", "#fff7ed")}
      </svg>
    </div>
  );
};

export const exercicesTrierClasserCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "trier-classer",
  titre: "Trier et classer",
  accroche:
    "Vingt exercices, du geste seul au problème. Trier selon une règle. Trouver l'intrus. Trouver le point commun d'un groupe. Lire deux ensembles, et la zone où ils se croisent. Une bibliothécaire, un facteur, un marchand de fruits et une animatrice. Un rappel avant chaque niveau. Cherche d'abord avec ton doigt. Puis ouvre la correction : étape par étape, avec le piège.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Pour chaque objet, je me demande : oui ou non ?",
      rappel: [
        "Trier, c'est ranger selon une règle : la couleur, la forme, la sorte.",
        "L'intrus est celui qui ne suit pas la règle des autres.",
        "Pour chaque objet, je pose la question : oui ou non ?",
      ],
      exercices: [
        {
          enonce: "Trouve l'intrus.\npomme, banane, carotte, poire",
          correction:
            "Je cherche ce que les autres ont en commun.\nLa pomme, la banane et la poire sont des fruits.\nLa carotte est un légume.\nL'intrus est la carotte.\n⛔ Le piège : chercher par la couleur. La banane est jaune, mais c'est bien un fruit.\nRéponse : carotte.",
          micros: ["ce1_tri_critere"],
          reponses: [{ attendu: ["carotte", "la carotte"] }],
        },
        {
          enonce: "Regarde les formes.\na) Combien de ronds ?\nb) Combien de formes bleues ?",
          figure: formes([
            { f: "rond", c: "rouge" },
            { f: "carre", c: "bleu" },
            { f: "rond", c: "bleu" },
            { f: "triangle", c: "rouge" },
            { f: "rond", c: "jaune" },
            { f: "carre", c: "rouge" },
            { f: "triangle", c: "bleu" },
            { f: "carre", c: "bleu" },
          ]),
          correction:
            "a) Je touche chaque rond, de toutes les couleurs : un rouge, un bleu, un jaune. 3 ronds.\nb) Je touche chaque forme bleue, de toutes les formes : un rond, un triangle, deux carrés. 4 formes bleues.\n⛔ Le piège : a) compter seulement les ronds rouges. La règle parle de la forme, pas de la couleur.\nRéponse : a) 3 ; b) 4.",
          micros: ["ce1_tri_critere"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Trois nombres sont plus grands que 50. Un seul est plus petit.\nTrouve l'intrus : 62, 75, 31, 90",
          correction:
            "Je compare chaque nombre à 50, avec le chiffre des dizaines.\n62 : 6 dizaines, plus que 5. 75 : 7 dizaines. 90 : 9 dizaines.\n31 : 3 dizaines, moins que 5. 31 est plus petit que 50.\nL'intrus est 31.\n⛔ Le piège : regarder le chiffre des unités. Je compare d'abord les dizaines.\nRéponse : 31.",
          micros: ["ce1_tri_critere"],
          reponses: [{ attendu: "31" }],
        },
        {
          enonce: "Les animaux sont rangés dans deux ensembles.\na) Combien d'animaux dans « vole » ?\nb) Le canard vole. Dans quel ensemble va-t-il ?",
          figure: deuxBoites({ nom: "vole", el: ["pigeon", "abeille", "aigle"] }, { nom: "ne vole pas", el: ["chat", "poisson"] }),
          correction:
            "a) Dans l'ensemble « vole », je compte : pigeon, abeille, aigle. 3 animaux.\nb) Le canard a des ailes et il vole. Il va dans l'ensemble « vole ».\n⛔ Le piège : b) le mettre avec le poisson parce qu'il nage. La règle des ensembles, c'est voler.\nRéponse : a) 3 ; b) vole.",
          micros: ["ce1_tri_ensembles"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["vole", "« vole »", "dans vole", "l'ensemble vole"] },
          ],
        },
        {
          enonce: "La règle : le nombre a deux chiffres.\nOui ou non ?\na) 7\nb) 45\nc) 100",
          correction:
            "Je compte les chiffres de chaque nombre.\na) 7 s'écrit avec un seul chiffre : non.\nb) 45 s'écrit avec 4 et 5 : deux chiffres, oui.\nc) 100 s'écrit avec 1, 0 et 0 : trois chiffres, non.\n⛔ Le piège : c) dire oui parce que 100 a l'air « petit ». Il a trois chiffres.\nRéponse : a) non ; b) oui ; c) non.",
          micros: ["ce1_tri_critere"],
          reponses: [
            { question: "a)", attendu: NON },
            { question: "b)", attendu: OUI },
            { question: "c)", attendu: NON },
          ],
        },
        {
          enonce: "Trouve l'intrus. Écris sa lettre.",
          figure: formes([
            { f: "triangle", c: "rouge", lettre: "A" },
            { f: "triangle", c: "bleu", lettre: "B" },
            { f: "carre", c: "rouge", lettre: "C" },
            { f: "triangle", c: "jaune", lettre: "D" },
          ]),
          correction:
            "Je cherche une règle qui marche pour trois formes, et pas pour la quatrième.\nLa couleur ? A et C sont rouges, B est bleu, D est jaune. Cela ne marche pas.\nLa forme ? A, B et D sont des triangles. C est un carré.\nL'intrus est C.\n⛔ Le piège : choisir B ou D pour leur couleur. Aucune couleur n'est partagée par trois formes.\nRéponse : C.",
          micros: ["ce1_tri_critere"],
          reponses: [{ attendu: ["C", "le carré", "carré"] }],
        },
        {
          enonce: "Quel est le point commun de ces animaux ?\nchat, chien, lapin, cheval\nA) ils ont 4 pattes   B) ils volent   C) ils vivent dans l'eau",
          correction:
            "Je vérifie chaque règle pour les 4 animaux.\nA) Le chat, le chien, le lapin et le cheval ont 4 pattes. Oui, pour tous.\nB) Aucun ne vole.\nC) Aucun ne vit dans l'eau.\n⛔ Le piège : choisir une règle vraie pour un seul animal. Le point commun doit marcher pour tous.\nRéponse : A.",
          micros: ["ce1_tri_critere"],
          reponses: [{ attendu: ["A", "A) ils ont 4 pattes", "ils ont 4 pattes", "4 pattes"] }],
        },
        {
          enonce: "Je range ces nombres dans deux boîtes : « moins de 10 » et « 10 ou plus ».\n3, 15, 8, 21, 10\nCombien de nombres vont dans « 10 ou plus » ?",
          correction:
            "Pour chaque nombre, je pose la question : est-ce 10 ou plus ?\n3 : non. 15 : oui. 8 : non. 21 : oui. 10 : oui, car 10 est dans « 10 ou plus ».\nJe compte les oui : 15, 21 et 10. Il y en a 3.\n⛔ Le piège : oublier le 10. « 10 ou plus » veut dire 10, et tous les nombres après.\nRéponse : 3.",
          micros: ["ce1_tri_critere"],
          reponses: [{ attendu: ["3", "trois"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux règles, ou deux ensembles. Je regarde aussi la zone du milieu.",
      rappel: [
        "Quand deux ensembles se croisent, la zone du milieu est dans les deux.",
        "Pour compter un ensemble, je prends sa zone seule ET la zone du milieu.",
        "Ce qui ne suit aucune règle va dehors.",
      ],
      exercices: [
        {
          enonce: "Les objets sont rangés dans deux ensembles.\na) Combien d'objets sont rouges ?\nb) Combien sont rouges ET ronds ?",
          figure: venn({ aSeul: ["fraise", "piment"], commun: ["cerise", "tomate"], bSeul: ["orange", "ballon"], dehors: ["banane"] }, { a: "rouge", b: "rond", e: "objets" }),
          correction:
            "a) Les objets rouges sont dans le cercle bleu « rouge ».\nIl y a la zone seule : fraise, piment. Et la zone du milieu : cerise, tomate.\n2 + 2 = 4 objets rouges.\nb) Rouges ET ronds : la zone du milieu, dans les deux cercles. Cerise et tomate : 2.\n⛔ Le piège : a) compter seulement fraise et piment. La cerise et la tomate sont rouges aussi.\nRéponse : a) 4 ; b) 2.",
          micros: ["ce1_tri_ensembles"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Regarde les formes.\na) Combien de carrés bleus ?\nb) Combien de ronds rouges ?",
          figure: formes([
            { f: "carre", c: "bleu" },
            { f: "carre", c: "rouge" },
            { f: "rond", c: "rouge" },
            { f: "carre", c: "bleu" },
            { f: "rond", c: "bleu" },
            { f: "rond", c: "rouge" },
            { f: "carre", c: "bleu" },
            { f: "triangle", c: "rouge" },
          ]),
          correction:
            "Deux règles à la fois : la forme ET la couleur.\na) Je cherche les carrés, puis je garde les bleus. Premier, quatrième, septième : 3 carrés bleus.\nb) Je cherche les ronds, puis je garde les rouges. Troisième et sixième : 2 ronds rouges.\n⛔ Le piège : a) compter toutes les formes bleues, 4. Le rond bleu n'est pas un carré.\nRéponse : a) 3 ; b) 2.",
          micros: ["ce1_tri_critere"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Ensemble A : plus que 50. Ensemble B : finit par 0.\nOù vas-tu placer chaque nombre ?\nA) dans A seulement   B) dans B seulement   C) dans les deux   D) dehors\na) 60\nb) 35\nc) 55\nd) 20",
          figure: venn({ aSeul: ["73"], commun: ["90"], bSeul: ["40"], dehors: ["12"] }, { a: "A", b: "B", e: "nombres" }),
          correction:
            "Pour chaque nombre, je pose deux questions : plus que 50 ? finit par 0 ?\na) 60 : plus que 50, oui. Finit par 0, oui. Dans les deux : C.\nb) 35 : plus que 50, non. Finit par 0, non. Dehors : D.\nc) 55 : plus que 50, oui. Finit par 0, non. A.\nd) 20 : plus que 50, non. Finit par 0, oui. B.\n⛔ Le piège : a) placer 60 dans un seul cercle. Il suit les deux règles : il va au milieu.\nRéponse : a) C ; b) D ; c) A ; d) B.",
          micros: ["ce1_tri_ensembles"],
          reponses: [
            { question: "a)", attendu: ["C", "dans les deux"] },
            { question: "b)", attendu: ["D", "dehors"] },
            { question: "c)", attendu: ["A"] },
            { question: "d)", attendu: ["B"] },
          ],
        },
        {
          enonce: "Trouve l'intrus : lion, tigre, chat, aigle.\na) Qui est l'intrus ?\nb) Pourquoi ? A) il a des plumes   B) il est grand   C) il mange de la viande",
          correction:
            "a) Le lion, le tigre et le chat ont des poils et 4 pattes. L'aigle a des plumes et 2 pattes. L'intrus est l'aigle.\nb) A : il a des plumes, les autres ont des poils.\nB ne sépare rien : le lion et le tigre sont grands aussi.\nC ne sépare rien : les quatre mangent de la viande.\n⛔ Le piège : b) choisir une raison vraie pour l'aigle, mais aussi pour les autres.\nRéponse : a) l'aigle ; b) A.",
          micros: ["ce1_tri_critere"],
          reponses: [
            { question: "a)", attendu: ["aigle", "l'aigle"] },
            { question: "b)", attendu: ["A", "A) il a des plumes", "il a des plumes", "plumes"] },
          ],
        },
        {
          enonce: "Regarde les deux ensembles.\na) Combien ont des roues ET volent ?\nb) Combien ont des roues ?\nc) Combien ne sont dans aucun ensemble ?",
          figure: venn({ aSeul: ["vélo", "voiture", "bus"], commun: ["avion"], bSeul: ["oiseau", "abeille"], dehors: ["bateau, cheval"] }, { a: "a des roues", b: "vole", e: "objets" }),
          correction:
            "a) Roues ET vole : la zone du milieu. Il n'y a que l'avion : 1.\nb) Roues : la zone seule (vélo, voiture, bus) et le milieu (avion). 3 + 1 = 4.\nc) Dehors, hors des deux cercles : bateau et cheval. 2.\n⛔ Le piège : c) répondre 0, en oubliant de regarder en bas du cadre.\nRéponse : a) 1 ; b) 4 ; c) 2.",
          micros: ["ce1_tri_ensembles"],
          reponses: [
            { question: "a)", attendu: ["1", "un"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Voici des nombres : 12, 25, 40, 7, 33, 18, 9.\na) Je garde ceux qui ont deux chiffres. Combien en reste-t-il ?\nb) Parmi eux, je garde ceux plus petits que 30. Combien en reste-t-il ?",
          correction:
            "a) Deux chiffres : 12, 25, 40, 33, 18. J'enlève 7 et 9. Il en reste 5.\nb) Je reprends ces 5 nombres. Plus petits que 30 : 12, 25, 18. J'enlève 40 et 33. Il en reste 3.\n⛔ Le piège : b) remettre 7 et 9, qui sont plus petits que 30. Ils sont déjà partis au premier tri.\nRéponse : a) 5 ; b) 3.",
          micros: ["ce1_tri_critere"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          enonce: "Voici les enfants qui font du foot et de la natation.\na) Combien d'enfants font du foot ?\nb) Combien d'enfants y a-t-il en tout ?",
          figure: venn({ aSeul: ["Léo", "Ana", "Tom", "Lou"], commun: ["Sam", "Mia", "Noé"], bSeul: ["Zoé", "Max", "Jade", "Eva", "Ali"] }, { a: "foot", b: "natation", e: "enfants" }),
          correction:
            "a) Foot : la zone seule (Léo, Ana, Tom, Lou) et le milieu (Sam, Mia, Noé). 4 + 3 = 7 enfants.\nb) Je compte chaque enfant une seule fois, zone par zone : 4 + 3 + 5 = 12.\n⛔ Le piège : a) répondre 4. Sam, Mia et Noé font du foot aussi, et de la natation en plus.\nRéponse : a) 7 ; b) 12.",
          micros: ["ce1_tri_ensembles"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: "12" },
          ],
        },
        {
          enonce: "Voici un groupe : 10, 20, 30.\nQui peut entrer dans le groupe ?\nA) 35   B) 40   C) 41",
          correction:
            "Je cherche le point commun du groupe : 10, 20 et 30 finissent tous par 0.\n35 finit par 5. 41 finit par 1. 40 finit par 0.\n40 peut entrer.\n⛔ Le piège : choisir 35, parce qu'il vient juste après 30. La règle, c'est de finir par 0.\nRéponse : B.",
          micros: ["ce1_tri_critere"],
          reponses: [{ attendu: ["B", "40", "B) 40"] }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je compte chaque zone une seule fois.",
      rappel: [
        "Un ensemble = sa zone seule + la zone du milieu.",
        "Le total = chaque zone, une seule fois.",
        "Pour un tri en deux fois, je repars de ce qui reste.",
      ],
      exercices: [
        {
          titre: "Les livres de la bibliothécaire",
          enonce: "Une bibliothécaire range des livres. Les nombres disent combien de livres il y a.\na) Combien de livres de contes ?\nb) Combien de livres sur les animaux ?\nc) Combien de livres en tout ?",
          figure: venn({ aSeul: ["5"], commun: ["3"], bSeul: ["4"], dehors: ["2"] }, { a: "contes", b: "animaux", e: "livres" }),
          correction:
            "a) Contes : la zone seule (5) et le milieu (3). 5 + 3 = 8.\nb) Animaux : la zone seule (4) et le milieu (3). 4 + 3 = 7.\nc) Chaque zone une seule fois, sans oublier le dehors : 5 + 3 + 4 + 2 = 14.\n⛔ Le piège : c) faire 8 + 7 = 15. Les 3 livres du milieu seraient comptés deux fois, et le dehors oublié.\nRéponse : a) 8 ; b) 7 ; c) 14.",
          micros: ["ce1_tri_ensembles"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["7", "sept"] },
            { question: "c)", attendu: "14" },
          ],
        },
        {
          titre: "Le tri du facteur",
          enonce: "Un facteur a 18 lettres. 10 sont pour la rue des Lilas.\nParmi ces 10 lettres, 4 sont grandes.\na) Combien de petites lettres pour la rue des Lilas ?\nb) Combien de lettres pour les autres rues ?",
          correction:
            "a) Je repars des 10 lettres de la rue des Lilas. J'enlève les 4 grandes : 10 − 4 = 6 petites.\nb) Je repars des 18 lettres. J'enlève les 10 de la rue des Lilas : 18 − 10 = 8.\n⛔ Le piège : a) faire 18 − 4 = 14. Le deuxième tri se fait seulement sur les lettres de la rue des Lilas.\nRéponse : a) 6 ; b) 8.",
          micros: ["ce1_tri_critere"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["8", "huit"] },
          ],
        },
        {
          titre: "Les pommes du marchand",
          enonce: "Un marchand trie ses pommes : grosses ou petites, rouges ou vertes.\na) Combien de grosses pommes rouges ?\nb) Combien de pommes vertes en tout ?\nc) Combien de pommes en tout ?",
          figure: (
            <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
              <table className="w-full border-collapse text-center text-[13px] print:text-[10px]">
                <thead>
                  <tr>
                    <th className="border border-slate-300 bg-sky-50 px-1.5 py-1 font-bold text-sky-900">Pommes</th>
                    <th className="border border-slate-300 bg-red-50 px-1.5 py-1 font-bold text-red-700">rouges</th>
                    <th className="border border-slate-300 bg-green-50 px-1.5 py-1 font-bold text-green-700">vertes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 bg-sky-50 px-1.5 py-0.5 font-bold text-sky-900">grosses</td>
                    <td className="border border-slate-300 px-1.5 py-0.5">6</td>
                    <td className="border border-slate-300 px-1.5 py-0.5">4</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 bg-sky-50 px-1.5 py-0.5 font-bold text-sky-900">petites</td>
                    <td className="border border-slate-300 px-1.5 py-0.5">3</td>
                    <td className="border border-slate-300 px-1.5 py-0.5">7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
          correction:
            "a) Ligne « grosses », colonne « rouges » : 6.\nb) Vertes : toute la colonne « vertes ». Les grosses (4) et les petites (7). 4 + 7 = 11.\nc) J'ajoute les 4 cases : 6 + 4 + 3 + 7 = 20.\n⛔ Le piège : b) lire une seule case, 4 ou 7. « Vertes en tout » demande les grosses ET les petites.\nRéponse : a) 6 ; b) 11 ; c) 20.",
          micros: ["ce1_tri_ensembles"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["11", "onze"] },
            { question: "c)", attendu: ["20", "vingt"] },
          ],
        },
        {
          titre: "La colonie de l'animatrice",
          enonce: "En colonie, 6 enfants font du vélo. 5 enfants nagent. 2 enfants font les deux.\na) Combien font seulement du vélo ?\nb) Combien nagent seulement ?\nc) Combien d'enfants en tout ?",
          figure: venn({ aSeul: ["?"], commun: ["2"], bSeul: ["?"] }, { a: "vélo", b: "nage", e: "enfants" }),
          correction:
            "Les 2 enfants qui font les deux sont au milieu.\na) Vélo : 6 en tout, dont 2 au milieu. 6 − 2 = 4 seulement à vélo.\nb) Nage : 5 en tout, dont 2 au milieu. 5 − 2 = 3 seulement à la nage.\nc) Chaque zone une fois : 4 + 2 + 3 = 9 enfants.\n⛔ Le piège : c) faire 6 + 5 = 11. Les 2 enfants du milieu seraient comptés deux fois.\nRéponse : a) 4 ; b) 3 ; c) 9.",
          micros: ["ce1_tri_ensembles"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: ["9", "neuf"] },
          ],
        },
      ],
    },
  ],
};
