// ─── Fiche d'exercices : premiers pas en algèbre (CM1) — 20 exercices corrigés
//
// 10/11/2026 : feuille interactive de la notion `algebre` du coach CM1 (8
// micros). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par étape,
// avec le piège nommé. Chaque exercice a ses `reponses` (vérifiées sans IA).
//
// Alignée sur la carte mentale `cm1/algebre` (`lib/cartes/remplies/cm1.json`)
// et sur `algebre.bank.ts` : le signe = (les deux côtés ont la même valeur),
// compléter une égalité, le nombre inconnu (l'opération contraire), le schéma
// en barres, le motif qui grandit, la relation entre deux quantités, le
// programme de calcul, le défi « essayer, vérifier ».
// ⛔ LIMITES DU CM1 : pas de lettre pour l'inconnue (un « … » ou un « ? »),
// nombres entiers, pas de nombre négatif.
//
// Les pièges nommés : « = » lu comme « la réponse est » (1, 2, 9, 15), faire
// l'opération au lieu de la défaire (3, 4, 10), ajouter 1 au lieu de la règle
// (5, 11), ajouter au lieu de multiplier (6, 12), calculer dans le désordre
// (7, 13), ajouter le tout et la part (8, 14), compter les allumettes en double
// (11), 21 − 3 au lieu de 21 ÷ 3 (16), défaire dans le mauvais ordre
// (17), compter une rangée de trop (18), oublier ce qui est déjà économisé
// (19), partager en deux parts égales (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux de construction (5), vélo (6), jeux de
// billes (8), bricolage (11, allumettes), nature (12, araignées), escalade
// (14), fête foraine (16), informatique (17), jardin (18), économies (19),
// aviation (20).
// Les métiers des problèmes : informaticienne (17), paysagiste (18), pilote de
// ligne (20).
// ⭐ UN FAIT RÉEL : une araignée a 8 pattes (ex. 12 ; classification des
// arthropodes, les arachnides ont quatre paires de pattes). Tout le reste est
// un MODÈLE.
//
// Micro-compétences : algebre_egalite (1, 15), algebre_completer_egalite (2, 9,
// 15), algebre_nombre_inconnu (3, 4, 10), algebre_schema_barre (8, 14, 19, 20),
// algebre_motif (5, 11, 18), algebre_relation (6, 12, 16),
// algebre_programme_calcul (7, 13, 17), algebre_defi (17, 18, 19, 20). 8/8.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, tableau } from "@/lib/fiches-exercices/figures";
import { ecranSeulement } from "@/lib/fiches-exercices/dessins-fractions-cm2";

const NOIR = "#0f172a";

/** Un SCHÉMA EN BARRES (même aide que `maths-cm1-probleme.tsx`). ⛔ Texte NU. */
const schemaBarres = (lignes: { nom: string; morceaux: { n: number; texte: string }[] }[], total?: string) => {
  const [x0, L, h, pas] = [56, 190, 26, 36];
  const max = Math.max(...lignes.map((l) => l.morceaux.reduce((s, m) => s + m.n, 0)));
  const H = lignes.length * pas + 8;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Schéma en barres">
        {lignes.map((l, i) => {
          const y = 6 + i * pas;
          let x = x0;
          return (
            <g key={i}>
              <text x={x0 - 8} y={y + h / 2 + 5} textAnchor="end" fontSize="14" fontWeight="800" fill={NOIR}>
                {l.nom}
              </text>
              {l.morceaux.map((m, k) => {
                const w = (m.n * L) / max;
                const g = (
                  <g key={k}>
                    <rect x={x} y={y} width={w} height={h} fill={k % 2 === 0 ? BLEU : ORANGE} fillOpacity={0.25} stroke={NOIR} strokeWidth={1.4} />
                    <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={NOIR}>
                      {m.texte}
                    </text>
                  </g>
                );
                x += w;
                return g;
              })}
            </g>
          );
        })}
        {total ? (
          <g>
            <path d={`M ${x0 + L + 8} 6 Q ${x0 + L + 16} 6 ${x0 + L + 16} ${H / 2} Q ${x0 + L + 16} ${H - 2} ${x0 + L + 8} ${H - 2}`} fill="none" stroke={NOIR} strokeWidth={1.6} />
            <text x={x0 + L + 22} y={H / 2 + 5} fontSize="14" fontWeight="900" fill={NOIR}>
              {total}
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
};

/** Des TOURS DE CUBES, une par étape, numérotées dessous. */
const tours = (hauteurs: number[]) => {
  const c = 14;
  const H = Math.max(...hauteurs) * c + 30;
  const pas = 300 / (hauteurs.length + 1);
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Tours de cubes">
        {hauteurs.map((n, i) => (
          <g key={i}>
            {Array.from({ length: n }, (_, k) => (
              <rect key={k} x={pas * (i + 1) - c / 2} y={H - 22 - (k + 1) * c} width={c} height={c} fill={BLEU} fillOpacity={0.35} stroke={NOIR} strokeWidth={1.2} />
            ))}
            <text x={pas * (i + 1)} y={H - 6} textAnchor="middle" fontSize="13" fontWeight="800" fill={NOIR}>
              {`étape ${i + 1}`}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/** Des CARRÉS D'ALLUMETTES en ligne : 1, 2, 3… carrés côte à côte. */
const allumettes = (etapes: number[]) => {
  const c = 22;
  const largeurs = etapes.map((n) => n * c);
  const ecart = 26;
  const W = largeurs.reduce((s, w) => s + w, 0) + ecart * (etapes.length + 1);
  let x = ecart;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} 64`} className="block h-auto w-full" role="img" aria-label="Carrés d'allumettes">
        {etapes.map((n, i) => {
          const x0 = x;
          x += n * c + ecart;
          const traits: [number, number, number, number][] = [];
          for (let k = 0; k < n; k++) {
            traits.push([x0 + k * c, 8, x0 + (k + 1) * c, 8], [x0 + k * c, 8 + c, x0 + (k + 1) * c, 8 + c]);
          }
          for (let k = 0; k <= n; k++) traits.push([x0 + k * c, 8, x0 + k * c, 8 + c]);
          return (
            <g key={i}>
              {traits.map(([a, b, cc, d], k) => (
                <line key={k} x1={a} y1={b} x2={cc} y2={d} stroke={ORANGE} strokeWidth={3} strokeLinecap="round" />
              ))}
              <text x={x0 + (n * c) / 2} y={56} textAnchor="middle" fontSize="12" fontWeight="800" fill={NOIR}>
                {`${n} carré${n > 1 ? "s" : ""}`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesAlgebreCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "algebre",
  titre: "Premiers pas en algèbre",
  accroche:
    "Vingt exercices, du geste seul au problème. Comprendre le signe =. Compléter une égalité. Trouver le nombre qui manque. Poursuivre un motif qui grandit. Trouver la règle entre deux quantités. Suivre un programme de calcul. Lire un schéma en barres. Des tours de cubes, des vélos, des araignées, un manège, un jardin, des économies et un pilote de ligne. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je calcule chaque côté du signe =.",
      rappel: [
        "Le signe = veut dire : les deux côtés ont la même valeur.",
        "Pour trouver un nombre qui manque, je fais l'opération contraire : + se défait par −, × par ÷.",
        "Dans un motif, je cherche ce qui change d'une étape à la suivante.",
      ],
      exercices: [
        {
          enonce: "Vrai ou faux ?\na) 8 + 4 = 10 + 2\nb) 5 + 5 = 5 × 2\nc) 3 × 4 = 3 + 4\nd) 15 = 9 + 7",
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["faux", "non"] },
            { question: "d)", attendu: ["faux", "non"] },
          ],
          correction:
            "Je calcule chaque côté. L'égalité est vraie si les deux côtés valent pareil.\na) $8 + 4 = 12$ et $10 + 2 = 12$. Vrai.\nb) $5 + 5 = 10$ et $5 \\times 2 = 10$. Vrai.\nc) $3 \\times 4 = 12$ et $3 + 4 = 7$. Faux.\nd) $9 + 7 = 16$, pas 15. Faux.\n⛔ Le piège : croire qu'après = vient toujours « la réponse ». Il peut y avoir un calcul des deux côtés.\nRéponse : a) vrai ; b) vrai ; c) faux ; d) faux.",
          micros: ["algebre_egalite"],
        },
        {
          enonce: "Complète pour que l'égalité soit vraie.\na) 8 + 4 = … + 2\nb) 7 + 6 = 10 + …\nc) 5 × 4 = 10 × …\nd) 30 − 5 = … − 10",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "2" },
            { question: "d)", attendu: "35" },
          ],
          correction:
            "Je calcule le côté complet. Puis je cherche le nombre qui donne la même valeur de l'autre côté.\na) $8 + 4 = 12$. $10 + 2 = 12$ : il manque 10.\nb) $7 + 6 = 13$. $10 + 3 = 13$ : il manque 3.\nc) $5 \\times 4 = 20$. $10 \\times 2 = 20$ : il manque 2.\nd) $30 - 5 = 25$. $35 - 10 = 25$ : il manque 35.\n⛔ Le piège du a) : écrire 12. Alors $12 + 2 = 14$, ce n'est plus égal.\nRéponse : a) 10 ; b) 3 ; c) 2 ; d) 35.",
          micros: ["algebre_completer_egalite"],
        },
        {
          enonce: "Trouve le nombre qui manque.\na) 15 + … = 40\nb) … + 18 = 50\nc) 60 − … = 45\nd) … − 12 = 30",
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "32" },
            { question: "c)", attendu: "15" },
            { question: "d)", attendu: "42" },
          ],
          correction:
            "Je cherche ce qui manque, puis je vérifie dans l'égalité.\na) De 15 à 40 : $40 - 15 = 25$. Je vérifie : $15 + 25 = 40$.\nb) De 18 à 50 : $50 - 18 = 32$. Je vérifie : $32 + 18 = 50$.\nc) De 45 à 60 : $60 - 45 = 15$. Je vérifie : $60 - 15 = 45$.\nd) J'ai enlevé 12 et il reste 30 : au départ, $30 + 12 = 42$. Je vérifie : $42 - 12 = 30$.\n⛔ Le piège du a) : faire $15 + 40 = 55$. On cherche ce qui MANQUE pour aller à 40.\nRéponse : a) 25 ; b) 32 ; c) 15 ; d) 42.",
          micros: ["algebre_nombre_inconnu"],
        },
        {
          enonce: "Trouve le nombre caché par « ? ».\na) ? × 6 = 42\nb) 8 × ? = 64\nc) ? ÷ 5 = 9\nd) 36 ÷ ? = 4",
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "45" },
            { question: "d)", attendu: "9" },
          ],
          correction:
            "× se défait par ÷, et ÷ se défait par ×. Je m'aide des tables.\na) $42 \\div 6 = 7$. Je vérifie : $7 \\times 6 = 42$.\nb) $64 \\div 8 = 8$. Je vérifie : $8 \\times 8 = 64$.\nc) $9 \\times 5 = 45$. Je vérifie : $45 \\div 5 = 9$.\nd) Dans 36, combien de fois 4 ? $4 \\times 9 = 36$, donc ? = 9.\n⛔ Le piège du a) : faire $42 \\times 6 = 252$. On DÉFAIT la multiplication.\nRéponse : a) 7 ; b) 8 ; c) 45 ; d) 9.",
          micros: ["algebre_nombre_inconnu"],
        },
        {
          enonce:
            "Noé construit des tours de cubes : 3 cubes, puis 5, puis 7, puis 9.\na) Combien de cubes aura la tour de l'étape 5 ?\nb) Et celle de l'étape 6 ?\nc) Quelle est la règle ? A) on ajoute 1 cube  B) on double  C) on ajoute 2 cubes",
          figure: tours([3, 5, 7, 9]),
          reponses: [
            { question: "a)", attendu: "11" },
            { question: "b)", attendu: "13" },
            { question: "c)", attendu: ["C", "on ajoute 2 cubes"] },
          ],
          correction:
            "Je regarde ce qui change : de 3 à 5, de 5 à 7, de 7 à 9. À chaque étape, on ajoute 2 cubes.\na) Étape 5 : $9 + 2 = 11$ cubes.\nb) Étape 6 : $11 + 2 = 13$ cubes.\nc) La règle : on ajoute 2 cubes. C'est le C.\n⛔ Le piège : écrire 10 après 9. On n'ajoute pas 1, on ajoute 2.\nRéponse : a) 11 ; b) 13 ; c) C.",
          micros: ["algebre_motif"],
        },
        {
          enonce:
            "Un vélo a 2 roues. Complète le tableau.\na) Combien de roues pour 5 vélos ?\nb) Combien de roues pour 8 vélos ?\nc) Combien de vélos ont 24 roues en tout ?",
          figure: tableau(["Vélos", "1", "5", "8", "?"], ["Roues", 2, "?", "?", 24]),
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "16" },
            { question: "c)", attendu: "12" },
          ],
          correction:
            "La règle : chaque vélo a 2 roues. Roues = vélos × 2.\na) $5 \\times 2 = 10$ roues.\nb) $8 \\times 2 = 16$ roues.\nc) Je défais : vélos = roues ÷ 2. $24 \\div 2 = 12$ vélos.\n⛔ Le piège : faire $5 + 2 = 7$ roues. C'est 2 roues POUR CHAQUE vélo : on multiplie.\nRéponse : a) 10 ; b) 16 ; c) 12.",
          micros: ["algebre_relation"],
        },
        {
          enonce:
            "Voici un programme de calcul : « Choisis un nombre. Ajoute 4. Multiplie le résultat par 3. »\na) Je choisis 6. Quel nombre ai-je après « Ajoute 4 » ?\nb) Quel est le résultat final avec 6 ?\nc) Quel est le résultat final si je choisis 2 ?",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "18" },
          ],
          correction:
            "Je fais les étapes dans l'ordre, une par une.\na) $6 + 4 = 10$.\nb) Puis $10 \\times 3 = 30$.\nc) $2 + 4 = 6$, puis $6 \\times 3 = 18$.\n⛔ Le piège : calculer $6 + 4 \\times 3$ d'un coup, et trouver 18 au b). Le programme dit d'ajouter 4 D'ABORD.\nRéponse : a) 10 ; b) 30 ; c) 18.",
          micros: ["algebre_programme_calcul"],
        },
        {
          enonce:
            "Un sac contient 50 billes. 32 sont rouges, les autres sont bleues.\na) Quel calcul donne les billes bleues ? A) 50 + 32  B) 50 − 32  C) 50 × 32\nb) Combien y a-t-il de billes bleues ?",
          figure: schemaBarres([{ nom: "Sac", morceaux: [{ n: 32, texte: "32 rouges" }, { n: 18, texte: "?" }] }], "50"),
          reponses: [
            { question: "a)", attendu: ["B", "50 − 32", "50 - 32"], exact: true },
            { question: "b)", attendu: "18" },
          ],
          correction:
            "La grande barre, c'est le tout : 50 billes. Elle est faite de deux morceaux : les rouges et les bleues.\na) Pour trouver un morceau, j'enlève l'autre au tout : $50 - 32$. C'est le B.\nb) $50 - 32 = 18$ billes bleues.\n⭐ Je vérifie : $32 + 18 = 50$.\n⛔ Le piège : faire $50 + 32 = 82$. Le tout, c'est déjà 50.\nRéponse : a) B ; b) 18 billes.",
          micros: ["algebre_schema_barre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois gestes par exercice. Je vérifie chaque réponse dans l'égalité.",
      rappel: [
        "Je calcule d'abord le côté que je connais.",
        "Pour défaire un calcul, je fais l'opération contraire.",
        "Une règle se vérifie sur TOUTES les cases du tableau.",
      ],
      exercices: [
        {
          enonce: "Complète.\na) 25 + 17 = 20 + …\nb) 6 × 5 = 3 × …\nc) 100 − 35 = … + 15\nd) 48 ÷ 6 = 2 × …",
          reponses: [
            { question: "a)", attendu: "22" },
            { question: "b)", attendu: "10" },
            { question: "c)", attendu: "50" },
            { question: "d)", attendu: "4" },
          ],
          correction:
            "Je calcule le côté complet, puis je cherche le nombre qui manque.\na) $25 + 17 = 42$. $20 + 22 = 42$ : il manque 22.\nb) $6 \\times 5 = 30$. $3 \\times 10 = 30$ : il manque 10.\nc) $100 - 35 = 65$. $50 + 15 = 65$ : il manque 50.\nd) $48 \\div 6 = 8$. $2 \\times 4 = 8$ : il manque 4.\n⛔ Le piège du a) : écrire 42. Le côté droit vaudrait alors 62.\nRéponse : a) 22 ; b) 10 ; c) 50 ; d) 4.",
          micros: ["algebre_completer_egalite"],
        },
        {
          enonce:
            "Je pense à un nombre.\na) J'ajoute 27, j'obtiens 63. Quel est mon nombre ?\nb) Je le multiplie par 7, j'obtiens 84. Quel est mon nombre ?\nc) J'enlève 45, il reste 18. Quel est mon nombre ?",
          reponses: [
            { question: "a)", attendu: "36" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "63" },
          ],
          correction:
            "Je pars de la fin et je fais l'opération contraire.\na) + 27 se défait par − 27 : $63 - 27 = 36$. Je vérifie : $36 + 27 = 63$.\nb) × 7 se défait par ÷ 7 : $84 \\div 7 = 12$. Je vérifie : $12 \\times 7 = 84$.\nc) − 45 se défait par + 45 : $18 + 45 = 63$. Je vérifie : $63 - 45 = 18$.\n⛔ Le piège du c) : faire $45 - 18 = 27$. J'ai ENLEVÉ 45 : mon nombre est plus grand que 45.\nRéponse : a) 36 ; b) 12 ; c) 63.",
          micros: ["algebre_nombre_inconnu"],
        },
        {
          enonce:
            "Avec des allumettes, Léa fait des carrés en ligne. 1 carré : 4 allumettes. 2 carrés : 7 allumettes. 3 carrés : 10 allumettes.\na) Combien d'allumettes pour 4 carrés ?\nb) Combien d'allumettes pour 6 carrés ?\nc) Quelle est la règle ? A) on ajoute 3 allumettes par carré  B) on ajoute 4 allumettes par carré  C) on double",
          figure: allumettes([1, 2, 3]),
          reponses: [
            { question: "a)", attendu: "13" },
            { question: "b)", attendu: "19" },
            { question: "c)", attendu: ["A", "on ajoute 3 allumettes par carré"] },
          ],
          correction:
            "Je regarde ce qui change : de 4 à 7, puis de 7 à 10. On ajoute 3 allumettes à chaque carré.\nPourquoi 3 et pas 4 ? Le nouveau carré partage un côté avec le carré d'avant.\na) 4 carrés : $10 + 3 = 13$ allumettes.\nb) 5 carrés : $13 + 3 = 16$. 6 carrés : $16 + 3 = 19$ allumettes.\nc) La règle : on ajoute 3 allumettes. C'est le A.\n⛔ Le piège : compter 4 allumettes par carré, $6 \\times 4 = 24$. Les côtés communs seraient comptés deux fois.\nRéponse : a) 13 ; b) 19 ; c) A.",
          micros: ["algebre_motif"],
        },
        {
          enonce:
            "Au club de sciences, on observe des araignées. Une araignée a 8 pattes.\na) Combien de pattes pour 3 araignées ?\nb) Combien de pattes pour 5 araignées ?\nc) On compte 64 pattes. Combien y a-t-il d'araignées ?",
          figure: tableau(["Araignées", "1", "3", "5", "?"], ["Pattes", 8, "?", "?", 64]),
          reponses: [
            { question: "a)", attendu: "24" },
            { question: "b)", attendu: "40" },
            { question: "c)", attendu: "8" },
          ],
          correction:
            "La règle : pattes = araignées × 8.\na) $3 \\times 8 = 24$ pattes.\nb) $5 \\times 8 = 40$ pattes.\nc) Je défais : araignées = pattes ÷ 8. $64 \\div 8 = 8$ araignées.\n⛔ Le piège : faire $3 + 8 = 11$ pattes. Chaque araignée a 8 pattes : on multiplie.\nRéponse : a) 24 ; b) 40 ; c) 8.",
          micros: ["algebre_relation"],
        },
        {
          enonce:
            "Programme : « Choisis un nombre. Multiplie-le par 2. Ajoute 5. »\na) Quel est le résultat si je choisis 4 ?\nb) Quel est le résultat si je choisis 10 ?\nc) Le résultat est 17. Quel nombre ai-je choisi ?",
          reponses: [
            { question: "a)", attendu: "13" },
            { question: "b)", attendu: "25" },
            { question: "c)", attendu: "6" },
          ],
          correction:
            "a) $4 \\times 2 = 8$, puis $8 + 5 = 13$.\nb) $10 \\times 2 = 20$, puis $20 + 5 = 25$.\nc) Je remonte le programme à l'envers. J'enlève d'abord 5 : $17 - 5 = 12$. Puis je divise par 2 : $12 \\div 2 = 6$.\nJe vérifie : $6 \\times 2 = 12$, $12 + 5 = 17$.\n⛔ Le piège du c) : diviser 17 par 2 d'abord. À l'envers, on défait la DERNIÈRE étape en premier.\nRéponse : a) 13 ; b) 25 ; c) 6.",
          micros: ["algebre_programme_calcul"],
        },
        {
          enonce:
            "À la salle d'escalade, une corde de 75 m est coupée en deux morceaux. Le premier mesure 48 m.\na) Combien mesure le second morceau, en m ?\nb) Une autre corde de 75 m est coupée en 3 morceaux égaux. Combien mesure un morceau, en m ?",
          figure: schemaBarres(
            [
              { nom: "a)", morceaux: [{ n: 48, texte: "48 m" }, { n: 27, texte: "?" }] },
              { nom: "b)", morceaux: [{ n: 25, texte: "?" }, { n: 25, texte: "?" }, { n: 25, texte: "?" }] },
            ],
            "75 m",
          ),
          reponses: [
            { question: "a)", attendu: "27" },
            { question: "b)", attendu: "25" },
          ],
          correction:
            "Chaque barre, c'est toute la corde : 75 m.\na) J'enlève le morceau connu : $75 - 48 = 27$ m. Je vérifie : $48 + 27 = 75$.\nb) 3 morceaux égaux : je partage. $75 \\div 3 = 25$ m. Je vérifie : $3 \\times 25 = 75$.\n⛔ Le piège du a) : faire $75 + 48$. Les deux morceaux sont DANS la corde de 75 m.\nRéponse : a) 27 m ; b) 25 m.",
          micros: ["algebre_schema_barre"],
        },
        {
          enonce:
            "Choisis le nombre qui rend l'égalité vraie.\na) 9 + 7 = … + 8 : A) 16  B) 8  C) 24\nb) 40 − 15 = 30 − … : A) 5  B) 25  C) 10\nc) 3 × 8 = 6 × … : A) 2  B) 18  C) 4",
          reponses: [
            { question: "a)", attendu: ["B", "8"] },
            { question: "b)", attendu: ["A", "5"] },
            { question: "c)", attendu: ["C", "4"] },
          ],
          correction:
            "Je calcule le côté complet, puis j'essaie chaque choix.\na) $9 + 7 = 16$. $8 + 8 = 16$. C'est le B.\nb) $40 - 15 = 25$. $30 - 5 = 25$. C'est le A.\nc) $3 \\times 8 = 24$. $6 \\times 4 = 24$. C'est le C.\n⛔ Le piège du a) : choisir 16, le résultat de gauche. Alors $16 + 8 = 24$, ce n'est plus égal.\nRéponse : a) B ; b) A ; c) C.",
          micros: ["algebre_egalite", "algebre_completer_egalite"],
        },
        {
          enonce:
            "À la fête foraine, un ticket de manège coûte 3 €.\na) Combien coûtent 2 tickets, en € ?\nb) Combien coûtent 4 tickets, en € ?\nc) Combien coûtent 10 tickets, en € ?\nd) Avec 21 €, combien de tickets peut-on acheter ?",
          figure: tableau(["Tickets", "1", "2", "4", "10"], ["Prix (€)", 3, "?", "?", "?"]),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "30" },
            { question: "d)", attendu: "7" },
          ],
          correction:
            "La règle : prix = tickets × 3.\na) $2 \\times 3 = 6$ €.\nb) $4 \\times 3 = 12$ €.\nc) $10 \\times 3 = 30$ €.\nd) Je défais : tickets = prix ÷ 3. $21 \\div 3 = 7$ tickets.\n⛔ Le piège du d) : faire $21 - 3 = 18$ tickets. Je cherche combien de fois 3 € dans 21 €.\nRéponse : a) 6 € ; b) 12 € ; c) 30 € ; d) 7 tickets.",
          micros: ["algebre_relation"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je fais un schéma ou j'essaie un nombre, puis je vérifie.",
      rappel: [
        "Pour retrouver un nombre de départ, je remonte les étapes à l'envers.",
        "Un schéma en barres montre le tout et ses morceaux.",
        "Je vérifie toujours en refaisant le calcul dans l'ordre.",
      ],
      exercices: [
        {
          titre: "Les nombres mystère de l'informaticienne",
          enonce:
            "Maya est informaticienne. Son ordinateur cache des nombres.\na) « Je multiplie par 4, puis j'ajoute 3. J'obtiens 23. » Quel est le nombre caché ?\nb) « Je double, puis j'enlève 6. J'obtiens 30. » Quel est le nombre caché ?\nc) « J'enlève 7, puis je multiplie par 3. J'obtiens 24. » Quel est le nombre caché ?",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "18" },
            { question: "c)", attendu: "15" },
          ],
          correction:
            "Je remonte les étapes à l'envers, en commençant par la dernière.\na) J'enlève 3 : $23 - 3 = 20$. Je divise par 4 : $20 \\div 4 = 5$. Je vérifie : $5 \\times 4 + 3 = 23$.\nb) J'ajoute 6 : $30 + 6 = 36$. Je divise par 2 : $36 \\div 2 = 18$. Je vérifie : $18 \\times 2 = 36$, $36 - 6 = 30$.\nc) Je divise par 3 : $24 \\div 3 = 8$. J'ajoute 7 : $8 + 7 = 15$. Je vérifie : $15 - 7 = 8$, $8 \\times 3 = 24$.\n⛔ Le piège du a) : faire $23 \\div 4$ d'abord. On défait d'abord le « + 3 ».\nRéponse : a) 5 ; b) 18 ; c) 15.",
          micros: ["algebre_defi", "algebre_programme_calcul"],
        },
        {
          titre: "Le massif de la paysagiste",
          enonce:
            "Jade est paysagiste. Elle plante des fleurs en rangées. La rangée 1 a 5 fleurs. Chaque rangée a 4 fleurs de plus que la précédente.\na) Combien de fleurs a la rangée 2 ?\nb) Combien de fleurs a la rangée 5 ?\nc) Combien de fleurs y a-t-il en tout dans les 3 premières rangées ?",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "21" },
            { question: "c)", attendu: "27" },
          ],
          correction:
            "La règle : on ajoute 4 fleurs d'une rangée à la suivante.\na) Rangée 2 : $5 + 4 = 9$ fleurs.\nb) Rangée 3 : 13. Rangée 4 : 17. Rangée 5 : $17 + 4 = 21$ fleurs.\nc) $5 + 9 + 13 = 27$ fleurs.\n⛔ Le piège du b) : faire $5 \\times 4 = 20$. De la rangée 1 à la rangée 5, on ajoute 4 seulement 4 fois : $5 + 16 = 21$.\nRéponse : a) 9 ; b) 21 ; c) 27.",
          micros: ["algebre_defi", "algebre_motif"],
        },
        {
          titre: "Le vélo de Zoé",
          enonce:
            "Zoé veut un vélo à 240 €. Elle a déjà 96 €. Elle économise 12 € chaque semaine.\na) Combien d'euros lui manque-t-il ?\nb) Combien de semaines doit-elle économiser ?\nc) Combien d'euros aura-t-elle après 10 semaines ?",
          figure: schemaBarres([{ nom: "Vélo", morceaux: [{ n: 96, texte: "96 €" }, { n: 144, texte: "?" }] }], "240 €"),
          reponses: [
            { question: "a)", attendu: "144" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "216" },
          ],
          correction:
            "a) Le tout, c'est 240 €. Elle a déjà 96 € : $240 - 96 = 144$ €.\nb) Combien de fois 12 dans 144 ? $12 \\times 12 = 144$. Elle doit économiser 12 semaines.\nc) En 10 semaines : $10 \\times 12 = 120$ €. Avec ce qu'elle avait : $96 + 120 = 216$ €.\n⛔ Le piège du b) : faire $240 \\div 12 = 20$ semaines. Elle a DÉJÀ 96 €.\nRéponse : a) 144 € ; b) 12 semaines ; c) 216 €.",
          micros: ["algebre_defi", "algebre_schema_barre"],
        },
        {
          titre: "Le pilote et son fils",
          enonce:
            "Le père de Malik est pilote de ligne. Il a 30 ans de plus que Malik. À eux deux, ils ont 50 ans.\na) Quel âge a Malik ?\nb) Quel âge a son père ?\nc) Quel âge aura son père dans 5 ans ?",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "40" },
            { question: "c)", attendu: "45" },
          ],
          correction:
            "Je fais un schéma : le père a l'âge de Malik, plus 30 ans.\nJ'enlève les 30 ans en plus : $50 - 30 = 20$.\nIl reste deux parts égales : $20 \\div 2 = 10$.\na) Malik a 10 ans.\nb) Son père a $10 + 30 = 40$ ans. Je vérifie : $10 + 40 = 50$.\nc) Dans 5 ans : $40 + 5 = 45$ ans.\n⛔ Le piège : faire $50 \\div 2 = 25$ ans chacun. Ils n'ont pas le même âge.\nRéponse : a) 10 ans ; b) 40 ans ; c) 45 ans.",
          schema: ecranSeulement(
            schemaBarres(
              [
                { nom: "Malik", morceaux: [{ n: 10, texte: "10" }] },
                { nom: "Père", morceaux: [{ n: 10, texte: "10" }, { n: 30, texte: "30" }] },
              ],
              "50",
            ),
          ),
          micros: ["algebre_defi", "algebre_schema_barre"],
        },
      ],
    },
  ],
};
