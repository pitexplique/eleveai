// ─── Fiche d'exercices : logique, et, ou, non (STMG) — 20 exercices ─────────────
//
// Notion logique_connecteurs du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/algorithmique.bank.ts`). Le coach demande :
// ET et OU dans un filtre (and, or en Python), le OU qui retient toujours au moins
// autant que le ET, la négation d'une inégalité (le cas d'égalité), la négation de
// « tous » et d'« au moins un », et le « ou » courant (exclusif) face au « ou »
// mathématique (inclusif). Pas de table de vérité formelle ni de lois de De Morgan :
// le coach ne les demande pas.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : nombres nus et phrases courtes (ex. 1 à 8) ; magasin
// (conseillère clientèle), athlétisme (entraîneur), cinéma (exploitante), hôpital
// (cadre de santé), site de vente (responsable e-commerce), bourses d'études
// (assistante sociale), aéronautique (technicien qualité), droit de la consommation
// (conseiller), audition (directrice de casting), voile (commissaire de course),
// musée (agent d'accueil), médiathèque (responsable).
//
// ⭐ Recalcul : `scripts/verifier-exercices-stmg-algo-tableur-logique.mjs`.
//
// Micro-compétences : logique_et (1, 9, 10, 11, 14, 17, 18), logique_ou (2, 3, 9,
// 10, 11, 12, 13, 17, 19, 20), logique_non (4, 5, 6, 7, 14, 15, 18, 19, 20),
// logique_ou_courant (3, 8, 13, 16, 19). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { programme } from "@/lib/fiches-exercices/figures";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

// « Réponds vrai ou faux » : l'élève accorde parfois avec « la proposition ».
const VRAI = ["vrai", "vraie"];
const FAUX = ["faux", "fausse"];
const EXCLUSIF = ["exclusif", "ou exclusif"];
const INCLUSIF = ["inclusif", "ou inclusif"];

export const exercicesLogiqueConnecteursStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "logique-connecteurs",
  titre: "Logique : et, ou, non",
  accroche:
    "Vingt exercices pour ne plus confondre et, ou, non : le « et » qui exige les deux, le « ou » qui accepte les deux, la négation de « tous » qui n'est pas « aucun », et le « ou » du menu au restaurant. Un cinéma, un hôpital, une régate, un musée, une médiathèque : un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Tester une proposition, ou écrire sa négation.",
      rappel: [
        "« A et B » n'est vrai que si les DEUX sont vraies. En Python : and.",
        "« A ou B » est vrai dès qu'UNE est vraie, et aussi si les deux le sont. En maths, le « ou » est inclusif. En Python : or.",
        "La négation de x > a est x ≤ a : on pense au cas d'égalité. La négation de « tous… » est « au moins un… ne… pas ». La négation de « au moins un… » est « aucun… ».",
        "Dans la vie courante, « ou » veut parfois dire « l'un ou l'autre, pas les deux » : il est exclusif. « Pile ou face » en est l'exemple.",
      ],
      exercices: [
        {
          enonce: "On considère la proposition « x > 5 et x < 10 ». Est-elle vraie ou fausse ? Réponds vrai ou faux.\na) pour x = 7\nb) pour x = 12",
          reponses: [
            { question: "a)", attendu: VRAI },
            { question: "b)", attendu: FAUX },
          ],
          correction:
            "a) 7 > 5 est vrai, et 7 < 10 est vrai : les deux sont vraies, donc c'est vrai.\nb) 12 > 5 est vrai, mais 12 < 10 est faux : une seule ne suffit pas, donc c'est faux.\n⛔ Le piège au b) : s'arrêter à la première condition. Avec « et », il faut tester les deux.\nRéponse : a) vrai ; b) faux.",
          micros: ["logique_et"],
        },
        {
          enonce: "On considère la proposition « x < 3 ou x > 10 ». Est-elle vraie ou fausse ? Réponds vrai ou faux.\na) pour x = 12\nb) pour x = 5",
          reponses: [
            { question: "a)", attendu: VRAI },
            { question: "b)", attendu: FAUX },
          ],
          correction:
            "a) 12 < 3 est faux, mais 12 > 10 est vrai : une seule suffit, donc c'est vrai.\nb) 5 < 3 est faux, et 5 > 10 est faux : aucune n'est vraie, donc c'est faux.\n⛔ Le piège au a) : exiger les deux. Avec « ou », une seule condition vraie suffit.\nRéponse : a) vrai ; b) faux.",
          micros: ["logique_ou"],
        },
        {
          enonce: "Pour n = 14, la proposition « n est pair ou n > 10 » est-elle vraie ou fausse ? Réponds vrai ou faux.",
          reponses: [{ attendu: VRAI }],
          correction:
            "14 est pair : c'est vrai. 14 > 10 : c'est vrai aussi.\nLes deux sont vraies en même temps, et le « ou » mathématique l'accepte.\n⛔ Le piège : répondre faux parce que « ou » voudrait dire « pas les deux ». En maths, le « ou » est inclusif.\nRéponse : vrai.",
          micros: ["logique_ou", "logique_ou_courant"],
        },
        {
          enonce: "Quelle est la négation de « le montant est supérieur à 500 » (montant > 500) ? Réponds par la lettre.\nA : montant < 500\nB : montant ≤ 500\nC : montant = 500",
          reponses: [{ attendu: "B" }],
          correction:
            "Si le montant ne dépasse pas 500, il peut être plus petit ou égal à 500.\nLa négation est donc montant ≤ 500.\n⛔ Le piège : choisir A. Le cas montant = 500 ne serait dans aucune des deux propositions.\nRéponse : B.",
          micros: ["logique_non"],
        },
        {
          enonce: "Quelle est la négation de x < 8 ? Réponds par la lettre.\nA : x > 8\nB : x ≥ 8\nC : x ≤ 8",
          reponses: [{ attendu: "B" }],
          correction:
            "Le contraire de « strictement plus petit que 8 », c'est « 8 ou plus ».\nLa négation est x ≥ 8 : le cas x = 8 en fait partie.\n⛔ Le piège : choisir A, qui oublie x = 8. Ni x < 8 ni x > 8 ne contient ce cas.\nRéponse : B.",
          micros: ["logique_non"],
        },
        {
          enonce: "Quelle est la négation de « tous les colis sont arrivés » ? Réponds par la lettre.\nA : aucun colis n'est arrivé.\nB : au moins un colis n'est pas arrivé.\nC : la moitié des colis sont arrivés.",
          reponses: [{ attendu: "B" }],
          correction:
            "Pour que « tous sont arrivés » soit faux, il suffit d'un seul colis manquant.\nLa négation est « au moins un colis n'est pas arrivé ».\n⛔ Le piège : choisir A. « Aucun » va bien plus loin que la négation : c'est une autre proposition.\nRéponse : B.",
          micros: ["logique_non"],
        },
        {
          enonce: "Quelle est la négation de « au moins une machine est en panne » ? Réponds par la lettre.\nA : aucune machine n'est en panne.\nB : toutes les machines sont en panne.\nC : au moins une machine n'est pas en panne.",
          reponses: [{ attendu: "A" }],
          correction:
            "Pour que la proposition soit fausse, il ne doit y avoir aucune panne.\nLa négation est « aucune machine n'est en panne ».\n⛔ Le piège : choisir C. Une machine en panne et une autre en marche rendraient les deux phrases vraies : ce n'est donc pas la négation.\nRéponse : A.",
          micros: ["logique_non"],
        },
        {
          enonce: "Un menu propose « fromage ou dessert ». Ce « ou » est-il exclusif ou inclusif ? Écris le mot.",
          reponses: [{ attendu: EXCLUSIF }],
          correction:
            "Au restaurant, on prend l'un ou l'autre, et le menu ne donne pas droit aux deux.\nCe « ou » est exclusif.\n⛔ Le piège : répondre inclusif parce que c'est le sens mathématique. Ici, on lit une phrase de la vie courante.\nRéponse : exclusif.",
          micros: ["logique_ou_courant"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Un fichier, un filtre : on teste chaque ligne, sur chaque condition.",
      rappel: [
        "Dans un filtre, ET restreint la sélection, OU l'élargit. Le OU retient toujours au moins autant de lignes que le ET.",
        "Pour chaque ligne, on teste les deux conditions, puis on regarde le connecteur.",
        "Le signe > exclut l'égalité, le signe ≥ la garde.",
      ],
      exercices: [
        {
          enonce:
            "Une conseillère clientèle d'un magasin décrit chaque client par son chiffre d'affaires et son ancienneté en années (modèle).\na) Qu'affiche le programme ?\nb) On remplace and par or. Qu'affiche-t-il alors ?",
          figure: programme(["L = [(400, 6), (250, 3),", "     (700, 2), (550, 8),", "     (320, 7), (900, 4)]", "c = 0", "for ca, anc in L:", "    if ca > 300 and anc > 5:", "        c = c + 1", "print(c)"]),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "5" },
          ],
          correction:
            "a) Les deux à la fois : (400, 6), (550, 8) et (320, 7). Cela fait 3 clients.\nb) Au moins une des deux : seul (250, 3) échoue aux deux tests. Cela fait 5 clients.\n⛔ Le piège au a) : compter (700, 2). Son chiffre d'affaires est élevé, mais son ancienneté ne dépasse pas 5.\nRéponse : a) 3 ; b) 5.",
          micros: ["logique_et", "logique_ou"],
        },
        {
          enonce:
            "Un entraîneur d'athlétisme filtre ses athlètes. Quel mot de Python faut-il mettre entre les deux conditions ? Écris and ou or.\na) Il garde ceux qui ont moins de 20 ans et, en même temps, plus de 15 points.\nb) Il garde ceux qui remplissent au moins une des deux conditions.",
          reponses: [
            { question: "a)", attendu: "and" },
            { question: "b)", attendu: "or" },
          ],
          correction:
            "a) « En même temps » : les deux doivent être vraies. C'est and.\nb) « Au moins une » : une seule suffit. C'est or.\n⛔ Le piège : croire que deux conditions, c'est forcément and. C'est le sens de la phrase qui décide.\nRéponse : a) and ; b) or.",
          micros: ["logique_et", "logique_ou"],
        },
        {
          enonce:
            "Une exploitante de cinéma filtre six films (modèle).\na) Combien de films vérifient « durée > 120 et note > 7 » ?\nb) Combien vérifient « durée > 120 ou note > 7 » ?\nc) Combien ne vérifient aucune des deux conditions ?",
          figure: grille(["Film", "Durée (min)", "Note"], [
            ["A", 130, 8],
            ["B", 95, 9],
            ["C", 140, 6],
            ["D", 110, 5],
            ["E", 125, 7],
            ["F", 150, 9],
          ]),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "5" },
            { question: "c)", attendu: "1" },
          ],
          correction:
            "a) Les deux à la fois : A et F. Le film E a une note de 7 : elle ne dépasse pas 7. Cela fait 2 films.\nb) Au moins une : A, B, C, E, F. Cela fait 5 films.\nc) Il reste le film D : 1 film. Vérification : $5 + 1 = 6$.\n⛔ Le piège au a) : compter le film E. Le signe > exclut l'égalité.\nRéponse : a) 2 ; b) 5 ; c) 1.",
          micros: ["logique_et", "logique_ou"],
        },
        {
          enonce:
            "Un cadre de santé filtre un fichier de 50 patients (modèle) avec deux conditions. Le filtre ET retient 12 patients, le filtre OU en retient 30.\na) Ce résultat est-il cohérent ? Réponds oui ou non.\nb) Combien de patients ne vérifient aucune des deux conditions ?\nc) Combien de patients vérifient exactement une des deux conditions ?",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "18" },
          ],
          correction:
            "a) Oui : tout patient retenu par ET l'est aussi par OU, et $12 \\leqslant 30$.\nb) Le OU retient tous ceux qui vérifient au moins une condition : $50 - 30 = 20$.\nc) Dans les 30, on enlève ceux qui vérifient les deux : $30 - 12 = 18$.\n⛔ Le piège au a) : croire que deux conditions retiennent plus de lignes qu'une. Plus on exige, moins on retient.\nRéponse : a) oui ; b) 20 ; c) 18.",
          micros: ["logique_ou"],
        },
        {
          enonce:
            "Une responsable e-commerce affiche : « livraison offerte si le panier dépasse 50 € ou si le client est fidèle ». La livraison est-elle offerte ? Réponds oui ou non.\na) Panier de 30 €, client fidèle.\nb) Panier de 60 €, client non fidèle.\nc) Panier de 30 €, client non fidèle.\nd) Panier de 60 €, client fidèle.",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "non" },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) Le client est fidèle : une condition suffit, oui.\nb) Le panier dépasse 50 € : oui.\nc) Aucune des deux : non.\nd) Les deux à la fois : oui, ce « ou » est inclusif.\n⛔ Le piège au d) : répondre non. Ce n'est pas « fromage ou dessert » : rien n'interdit d'avoir les deux.\nRéponse : a) oui ; b) oui ; c) non ; d) oui.",
          micros: ["logique_ou", "logique_ou_courant"],
        },
        {
          enonce:
            "Une assistante sociale étudie une aide (modèle) : il faut « moyenne ≥ 14 et revenu familial < 20 000 € ».\nAna : moyenne 15, revenu 18 000 €.\nBilal : moyenne 13, revenu 15 000 €.\nChloé : moyenne 16, revenu 25 000 €.\nDavy : moyenne 14, revenu 19 000 €.\na) Combien de ces élèves obtiennent l'aide ?\nb) Quelle est la négation de « moyenne ≥ 14 » ? Réponds par la lettre.\nA : moyenne ≤ 14. B : moyenne < 14. C : moyenne > 14.",
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "B" },
          ],
          correction:
            "a) Ana remplit les deux conditions. Bilal échoue sur la moyenne. Chloé échoue sur le revenu. Davy remplit les deux, car 14 ≥ 14. Cela fait 2 élèves.\nb) Le contraire de « 14 ou plus », c'est « strictement moins de 14 ».\n⛔ Le piège au b) : choisir A. Le cas moyenne = 14 serait à la fois dans la proposition et dans sa négation.\nRéponse : a) 2 ; b) B.",
          micros: ["logique_et", "logique_non"],
        },
        {
          enonce:
            "Un technicien qualité en aéronautique contrôle un lot de 200 pièces (modèle). Il en trouve une seule non conforme.\na) La phrase « toutes les pièces sont conformes » est-elle vraie ou fausse ? Réponds vrai ou faux.\nb) La phrase « aucune pièce n'est conforme » est-elle vraie ou fausse ? Réponds vrai ou faux.\nc) La phrase « au moins une pièce n'est pas conforme » est-elle vraie ou fausse ? Réponds vrai ou faux.",
          reponses: [
            { question: "a)", attendu: FAUX },
            { question: "b)", attendu: FAUX },
            { question: "c)", attendu: VRAI },
          ],
          correction:
            "a) Une pièce non conforme suffit à rendre la phrase fausse.\nb) 199 pièces sont conformes : la phrase est fausse.\nc) Il y en a bien une : la phrase est vraie. C'est la négation de la phrase du a).\n⛔ Le piège au b) : prendre « aucune » pour le contraire de « toutes ». Les phrases a) et b) sont fausses en même temps.\nRéponse : a) faux ; b) faux ; c) vrai.",
          micros: ["logique_non"],
        },
        {
          enonce:
            "Un conseiller en consommation lit des phrases. Pour chacune, écris exclusif ou inclusif.\na) « Le paiement se fait en une fois ou en trois mensualités. »\nb) « On sélectionne les étudiants boursiers ou logés en résidence. »\nc) « Thé ou café avec le petit-déjeuner, au choix. »",
          reponses: [
            { question: "a)", attendu: EXCLUSIF },
            { question: "b)", attendu: INCLUSIF },
            { question: "c)", attendu: EXCLUSIF },
          ],
          correction:
            "On se demande si les deux peuvent arriver en même temps.\na) On ne paie pas des deux façons à la fois : exclusif.\nb) Un étudiant peut être boursier et logé en résidence : inclusif.\nc) « Au choix » : l'un ou l'autre, exclusif.\n⛔ Le piège au b) : y voir un choix à faire. Rien n'empêche un étudiant de vérifier les deux critères.\nRéponse : a) exclusif ; b) inclusif ; c) exclusif.",
          micros: ["logique_ou_courant"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs conditions, plusieurs questions : on teste chaque cas, puis on compte.",
      rappel: [
        "Un tableau aide : une ligne par cas, une colonne par condition, puis le résultat.",
        "Compter « A ou B » : on additionne ceux de A et ceux de B, puis on enlève ceux qui sont comptés deux fois (A et B).",
        "Ceux qui ne vérifient aucune condition : le total moins ceux de « A ou B ».",
      ],
      exercices: [
        {
          titre: "Le casting",
          enonce:
            "Une directrice de casting décrit chaque candidat par son âge et sa note de chant (modèle).\na) Qu'affiche le programme ?\nb) Avec or à la place de and, qu'afficherait-il ?\nc) Combien de candidats ne vérifient aucune des deux conditions ?\nd) Quel pourcentage des candidats le filtre du programme retient-il ?",
          figure: programme(["L = [(22, 16), (27, 18),", "     (19, 12), (24, 15),", "     (30, 10)]", "c = 0", "for a, n in L:", "    if a < 25 and n >= 15:", "        c = c + 1", "print(c)"]),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "1" },
            { question: "d)", attendu: "40 %" },
          ],
          correction:
            "a) Les deux à la fois : (22, 16) et (24, 15). Le programme affiche 2.\nb) Au moins une : tous sauf (30, 10). Il afficherait 4.\nc) Il reste (30, 10) : 1 candidat.\nd) 2 candidats sur 5 : $2 \\div 5 = 0{,}4$, soit 40 %.\n⛔ Le piège au a) : refuser (24, 15). Le signe >= garde la note de 15.\nRéponse : a) 2 ; b) 4 ; c) 1 ; d) 40 %.",
          micros: ["logique_et", "logique_ou"],
        },
        {
          titre: "Le départ de la régate",
          enonce:
            "Une commissaire de course donne le départ d'une régate si « vent ≥ 10 et vent ≤ 25 » (en nœuds, modèle). Le départ est-il donné ? Réponds oui ou non.\na) Vent de 8 nœuds.\nb) Vent de 18 nœuds.\nc) Vent de 25 nœuds.\nd) Quelle est la négation de « vent ≥ 10 » ? Réponds par la lettre.\nA : vent ≤ 10. B : vent < 10. C : vent > 10.",
          reponses: [
            { question: "a)", attendu: "non" },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "B" },
          ],
          correction:
            "a) 8 ≥ 10 est faux : avec « et », c'est fini, non.\nb) 18 ≥ 10 et 18 ≤ 25 : les deux sont vraies, oui.\nc) 25 ≥ 10 et 25 ≤ 25 : les deux sont vraies, oui.\nd) Le contraire de « 10 ou plus » est « moins de 10 » : vent < 10.\n⛔ Le piège au c) : répondre non. Le signe ≤ garde l'égalité.\nRéponse : a) non ; b) oui ; c) oui ; d) B.",
          micros: ["logique_et", "logique_non"],
        },
        {
          titre: "Le tarif du musée",
          enonce:
            "Un agent d'accueil de musée encaisse cinq visiteurs (modèle) : tarif réduit pour les moins de 18 ans ou les plus de 65 ans. Les tarifs du programme sont en euros.\na) Quel tarif paie un visiteur de 65 ans ?\nb) Qu'affiche le programme ?\nc) Quelle est la négation de « âge < 18 » ? Réponds par la lettre.\nA : âge > 18. B : âge ≥ 18. C : âge ≤ 18.\nd) Un visiteur peut-il avoir à la fois moins de 18 ans et plus de 65 ans ? Réponds oui ou non.",
          figure: programme(["L = [12, 30, 70, 65, 17]", "total = 0", "for a in L:", "    if a < 18 or a > 65:", "        total = total + 5", "    else:", "        total = total + 9", "print(total)"]),
          reponses: [
            { question: "a)", attendu: "9 €" },
            { question: "b)", attendu: "33" },
            { question: "c)", attendu: "B" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) 65 < 18 est faux, et 65 > 65 est faux : c'est le plein tarif, 9 €.\nb) 12 ans : 5. 30 ans : 9. 70 ans : 5. 65 ans : 9. 17 ans : 5. $5 + 9 + 5 + 9 + 5 = 33$.\nc) Le contraire de « moins de 18 » est « 18 ou plus ».\nd) Non : ici, les deux cas ne peuvent pas arriver ensemble. Le connecteur reste or : il accepterait les deux, mais ce cas n'existe pas.\n⛔ Le piège au a) : donner le tarif réduit. Le signe > exclut 65.\nRéponse : a) 9 € ; b) 33 ; c) B ; d) non.",
          micros: ["logique_ou", "logique_non", "logique_ou_courant"],
        },
        {
          titre: "Les abonnés de la médiathèque",
          enonce:
            "La responsable d'une médiathèque étudie 200 abonnés (modèle) : 120 empruntent des livres, 70 empruntent des films, et 40 font les deux.\na) Combien vérifient « livres et films » ?\nb) Combien vérifient « livres ou films » ?\nc) Combien n'empruntent ni livres ni films ?\nd) La phrase « tous les abonnés empruntent des livres » est fausse. Sa négation est-elle vraie ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b)", attendu: "150" },
            { question: "c)", attendu: "50" },
            { question: "d)", attendu: "oui" },
          ],
          correction:
            "a) L'énoncé le donne : 40 font les deux.\nb) $120 + 70 = 190$, mais les 40 sont comptés deux fois : $190 - 40 = 150$.\nc) $200 - 150 = 50$.\nd) Oui : la négation, « au moins un abonné n'emprunte pas de livres », est vraie, car $200 - 120 = 80$ abonnés n'en empruntent pas.\n⛔ Le piège au b) : répondre 190. Le « ou » est inclusif, et ceux qui font les deux ne se comptent qu'une fois.\nRéponse : a) 40 ; b) 150 ; c) 50 ; d) oui.",
          micros: ["logique_ou", "logique_non"],
        },
      ],
    },
  ],
};
