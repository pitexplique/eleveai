// ─── Fiche d'exercices : loi de Bernoulli (STMG) — 20 exercices ─────────────────
//
// Notion va_bernoulli du coach STMG (banque
// `lib/tutor-v4/questionBank/stmg/maths/variables-aleatoires.bank.ts`). Le coach
// demande : reconnaître une épreuve à DEUX issues codées 1 et 0 (et rejeter ce
// qui compte plusieurs unités), E(X) = p (deux issues ne font pas une chance sur
// deux), la condition r < p d'une simulation, N × n tirages et N fréquences,
// lire un diagramme de fréquences observées. Pas de formule de l'intervalle de
// fluctuation : c'est la notion va_echantillonnage.
//
// AUCUNE donnée réelle : toutes les situations sont des modèles ou visiblement
// fictives.
//
// Domaines et métiers : musée (guichetière), commerce (vendeuse), pêche
// (pêcheuse), botanique (botaniste), hôtellerie (hôtelier), fléchettes (joueur),
// grande distribution (analyste), santé animale (technicienne), livraison
// (postier), confection (contrôleuse qualité), marketing (responsable), tennis
// (Nolan), loterie (Yasmine), sondages (sondeuse), biologie (biologiste),
// cosmétique (responsable satisfaction), usine d'ampoules (technicien),
// agronomie (agronome), ornithologie (ornithologue), musique en ligne
// (responsable fidélisation).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-variables-aleatoires.mjs`.
//
// Micro-compétences : va_bern_reconnaitre (1, 2, 4, 9, 19), va_bern_esperance
// (3, 5, 10, 11, 19), va_bern_simuler (6, 7, 12, 13, 14, 17, 18, 20),
// va_bern_representer (8, 15, 16, 18). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { barres } from "@/lib/fiches-exercices/figures-donnees";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesVaBernoulliStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "va-bernoulli",
  titre: "Loi de Bernoulli",
  accroche:
    "Vingt exercices sur l'épreuve à deux issues : la reconnaître, écrire son espérance, la simuler avec un nombre aléatoire, compter les tirages d'une simulation, lire le diagramme des fréquences observées. Un service au tennis, des oiseaux bagués, un sondage, des ampoules à tester, une appli de musique. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : reconnaître la loi, donner l'espérance, ou régler une simulation.",
      rappel: [
        "Une loi de Bernoulli : UNE seule épreuve, deux issues. $X = 1$ pour le succès, $X = 0$ pour l'échec. $p$ est la probabilité du succès, et $P(X = 0) = 1 - p$.",
        "Son espérance : $E(X) = 0 \\times (1 - p) + 1 \\times p = p$.",
        "Simuler : ALEA() donne un nombre $r$ entre $0$ et $1$. Le succès, c'est $r < p$. L'échec, c'est $r \\geqslant p$.",
        "$N$ échantillons de taille $n$ : $N \\times n$ tirages en tout. Un diagramme de fréquences compte les échantillons par tranche.",
      ],
      exercices: [
        {
          enonce:
            "Une guichetière de musée regarde un seul visiteur. On note $X = 1$ s'il paie le tarif réduit (probabilité $0{,}3$), $X = 0$ sinon. $X$ suit-elle une loi de Bernoulli ? Réponds oui ou non.",
          reponses: [{ attendu: "oui" }],
          correction:
            "Une seule observation et deux issues seulement, codées $1$ et $0$.\nC'est bien une loi de Bernoulli, de paramètre $p = 0{,}3$.\n⛔ Le piège : croire qu'il faut $p = 0{,}5$. Les deux issues n'ont pas besoin d'avoir la même probabilité.\nRéponse : oui.",
          micros: ["va_bern_reconnaitre"],
        },
        {
          enonce:
            "Une vendeuse observe $10$ clients et note $X$, le nombre de clients qui paient sans contact. $X$ suit-elle une loi de Bernoulli ? Réponds oui ou non.",
          reponses: [{ attendu: "non" }],
          correction:
            "$X$ compte des clients : il peut valoir $0$, $1$, $2$… jusqu'à $10$.\nUne loi de Bernoulli ne prend que deux valeurs, $0$ et $1$.\n⛔ Le piège : répondre oui parce que chaque client a deux issues. Chaque client, oui ; mais $X$ les compte tous.\nRéponse : non.",
          micros: ["va_bern_reconnaitre"],
        },
        {
          enonce:
            "Une pêcheuse sort un poisson. On note $X = 1$ s'il est trop petit, ce qui arrive avec la probabilité $0{,}3$, et $X = 0$ sinon. Que vaut $E(X)$ ?",
          reponses: [{ attendu: "0,3" }],
          correction:
            "Pour une loi de Bernoulli, l'espérance vaut $p$.\nOn le vérifie : $E(X) = 0 \\times 0{,}7 + 1 \\times 0{,}3 = 0{,}3$.\n⛔ Le piège : répondre $0{,}5$ « puisqu'il y a deux issues ». Deux issues ne font pas une chance sur deux.\nRéponse : 0,3.",
          micros: ["va_bern_esperance"],
        },
        {
          enonce:
            "Une botaniste observe une graine. On note $X = 1$ si elle germe, ce qui arrive avec la probabilité $0{,}85$, et $X = 0$ sinon.\na) Quel est le paramètre $p$ de cette loi ?\nb) Que vaut $P(X = 0)$ ?",
          reponses: [
            { question: "a)", attendu: "0,85" },
            { question: "b)", attendu: "0,15" },
          ],
          correction:
            "a) Le paramètre est la probabilité du succès : $p = 0{,}85$.\nb) L'échec est le contraire du succès : $P(X = 0) = 1 - 0{,}85 = 0{,}15$.\n⛔ Le piège au a) : prendre la probabilité de l'échec comme paramètre. $p$ est toujours celle de $X = 1$.\nRéponse : a) 0,85 ; b) 0,15.",
          micros: ["va_bern_reconnaitre"],
        },
        {
          enonce:
            "Un hôtelier regarde une réservation. $X = 1$ si le client annule, $X = 0$ sinon (modèle). Calcule $E(X)$.",
          figure: grille(["xᵢ", "0", "1"], [["P(X = xᵢ)", "0,65", "0,35"]]),
          reponses: [{ attendu: "0,35" }],
          correction:
            "$E(X) = 0 \\times 0{,}65 + 1 \\times 0{,}35 = 0{,}35$.\nOn retrouve bien la probabilité du succès.\n⛔ Le piège : répondre $0{,}65$. C'est la probabilité de $X = 0$, l'échec.\nRéponse : 0,35.",
          micros: ["va_bern_esperance"],
        },
        {
          enonce:
            "On simule au tableur une fléchette qui atteint le centre de la cible avec la probabilité $0{,}2$. ALEA() renvoie un nombre $r$ entre $0$ et $1$. Quelle condition code le succès ? Écris la lettre.\nA : $r < 0{,}2$\nB : $r \\geqslant 0{,}2$\nC : $r = 0{,}2$\nD : $r < 0{,}8$",
          reponses: [{ attendu: "A" }],
          correction:
            "La probabilité que $r$ tombe dans un intervalle est égale à sa longueur.\nL'intervalle du succès doit avoir la longueur $0{,}2$ : c'est de $0$ à $0{,}2$, soit $r < 0{,}2$.\n⛔ Le piège : choisir D. L'intervalle de longueur $0{,}8$ correspond à l'échec, pas au succès.\nRéponse : A.",
          micros: ["va_bern_simuler"],
        },
        {
          enonce:
            "Une analyste de grande surface simule $100$ échantillons de $20$ clients chacun. Combien de nombres aléatoires le programme tire-t-il au total ?",
          reponses: [{ attendu: "2 000" }],
          correction:
            "Chaque échantillon demande $20$ tirages, et il y a $100$ échantillons.\n$100 \\times 20 = 2\\,000$ tirages.\n⛔ Le piège : additionner et trouver $120$. Les deux répétitions s'emboîtent : on multiplie.\nRéponse : 2 000.",
          micros: ["va_bern_simuler"],
        },
        {
          enonce:
            "Dans un refuge pour animaux, une technicienne a simulé $400$ échantillons pour une proportion $p = 0{,}4$ d'animaux vaccinés. Le diagramme donne le nombre d'échantillons par tranche de fréquence observée. Combien d'échantillons ont une fréquence entre $0{,}3$ et $0{,}5$ ?",
          figure: barres([
            { label: "< 0,3", value: 40 },
            { label: "0,3-0,4", value: 150 },
            { label: "0,4-0,5", value: 170 },
            { label: "> 0,5", value: 40 },
          ], { unite: "échantillons" }),
          reponses: [{ attendu: "320" }],
          correction:
            "La tranche voulue est faite des deux barres du milieu : $0{,}3$ à $0{,}4$ et $0{,}4$ à $0{,}5$.\n$150 + 170 = 320$ échantillons.\n⛔ Le piège : ne lire qu'une barre et répondre $170$. Il y a deux tranches entre $0{,}3$ et $0{,}5$.\nRéponse : 320.",
          micros: ["va_bern_representer"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : qui est le succès, quelle est sa probabilité, que demande-t-on de compter ?",
      rappel: [
        "On compte les valeurs possibles de $X$ : deux seulement, c'est Bernoulli. $X$ qui compte plusieurs unités, ou qui attend un premier succès, ce n'est pas Bernoulli.",
        "$E(X) = p$ est une moyenne : sur $N$ répétitions, on attend environ $N \\times p$ succès.",
        "Fréquence observée d'un échantillon = nombre de succès ÷ taille de l'échantillon. $N$ échantillons donnent $N$ fréquences.",
        "Sur le diagramme, les fréquences se massent autour de $p$, mais très peu valent exactement $p$.",
      ],
      exercices: [
        {
          enonce:
            "Un postier étudie des colis (modèle). Laquelle de ces variables suit une loi de Bernoulli ? Écris la lettre.\nA : on suit $20$ colis et $X$ est le nombre de colis en retard.\nB : on suit un seul colis ; $X = 1$ s'il arrive en retard, $X = 0$ sinon.\nC : on suit des colis un par un et $X$ est le nombre de colis suivis avant le premier en retard.\nD : on suit deux colis et $X$ est le nombre de colis en retard parmi eux.",
          reponses: [{ attendu: "B" }],
          correction:
            "On compte les valeurs possibles de $X$.\nA : de $0$ à $20$. C : $0$, $1$, $2$… sans limite. D : $0$, $1$ ou $2$.\nSeule B ne connaît que deux valeurs, $1$ et $0$.\n⛔ Le piège : choisir D parce qu'il n'y a que deux colis. $X$ y prend trois valeurs, pas deux.\nRéponse : B.",
          micros: ["va_bern_reconnaitre"],
        },
        {
          enonce:
            "Une contrôleuse qualité examine un jean. $X = 1$ s'il a un défaut, ce qui arrive avec la probabilité $0{,}2$ (modèle), et $X = 0$ sinon. Un stagiaire affirme que $E(X) = 0{,}5$, « puisqu'il n'y a que deux issues ».\na) Que vaut $E(X)$ ?\nb) Le stagiaire a-t-il raison ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "0,2" },
            { question: "b)", attendu: "non" },
          ],
          correction:
            "a) $E(X) = 0 \\times 0{,}8 + 1 \\times 0{,}2 = 0{,}2$.\nb) La valeur $0{,}5$ ne sortirait que si $p$ valait $0{,}5$ : il se trompe.\n⛔ Le piège : confondre « deux issues » et « deux issues de même probabilité ». C'est seulement le cas d'une pièce équilibrée.\nRéponse : a) 0,2 ; b) non.",
          micros: ["va_bern_esperance"],
        },
        {
          enonce:
            "Un responsable marketing envoie un e-mail. $X = 1$ si l'e-mail est ouvert, ce qui arrive dans $15$ % des cas (modèle), $X = 0$ sinon.\na) Que vaut $E(X)$ ?\nb) Sur $400$ e-mails, combien d'ouvertures peut-il attendre, environ ?",
          reponses: [
            { question: "a)", attendu: "0,15" },
            { question: "b)", attendu: "60" },
          ],
          correction:
            "a) $15$ %, c'est $0{,}15$. Pour une loi de Bernoulli, $E(X) = p = 0{,}15$.\nb) $400 \\times 0{,}15 = 60$ ouvertures.\n⛔ Le piège au a) : écrire $15$. Une probabilité reste entre $0$ et $1$.\nRéponse : a) 0,15 ; b) environ 60.",
          micros: ["va_bern_esperance"],
        },
        {
          enonce:
            "Au tennis, la première balle de Nolan passe avec la probabilité $0{,}7$ (modèle). On simule un service avec un nombre aléatoire $r$ entre $0$ et $1$. Écris la lettre de la bonne condition.\nA : $r < 0{,}7$     B : $r \\geqslant 0{,}7$     C : $r < 0{,}3$     D : $r = 0{,}7$\na) Quelle condition code le succès, $X = 1$ ?\nb) Quelle condition code l'échec, $X = 0$ ?",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "B" },
          ],
          correction:
            "a) Le succès a la probabilité $0{,}7$ : il lui faut un intervalle de longueur $0{,}7$, soit $r < 0{,}7$.\nb) L'échec correspond au reste, de $0{,}7$ à $1$ : $r \\geqslant 0{,}7$, de longueur $0{,}3$.\n⛔ Le piège au b) : choisir C parce que l'échec a la probabilité $0{,}3$. C recouvrirait une partie du succès : les deux intervalles doivent se suivre sans se chevaucher.\nRéponse : a) A ; b) B.",
          micros: ["va_bern_simuler"],
        },
        {
          enonce:
            "Yasmine simule $5$ tickets de loterie (modèle), gagnants avec la probabilité $0{,}4$. Sa calculatrice donne $r$ = $0{,}12$ ; $0{,}87$ ; $0{,}45$ ; $0{,}63$ ; $0{,}05$. On note $X = 1$ si $r < 0{,}4$, $X = 0$ sinon.\na) Écris les cinq valeurs de $X$ dans l'ordre, séparées par « ; ».\nb) Quelle est la fréquence observée de tickets gagnants ?",
          reponses: [
            { question: "a)", attendu: "1 ; 0 ; 0 ; 0 ; 1", ordre: true },
            { question: "b)", attendu: "0,4" },
          ],
          correction:
            "a) On compare chaque nombre à $0{,}4$. $0{,}12$ est en dessous : $1$. $0{,}87$ est au-dessus : $0$. $0{,}45$ est au-dessus : $0$. $0{,}63$ est au-dessus : $0$. $0{,}05$ est en dessous : $1$.\nb) Deux succès sur cinq : $2 \\div 5 = 0{,}4$.\n⛔ Le piège au a) : coder $0{,}45$ par $1$ parce qu'il « ressemble » à $0{,}4$. $0{,}45$ est plus grand que $0{,}4$ : c'est un échec.\nRéponse : a) 1 ; 0 ; 0 ; 0 ; 1 ; b) 0,4.",
          micros: ["va_bern_simuler"],
        },
        {
          enonce:
            "Une sondeuse simule $500$ échantillons de $40$ personnes chacun (modèle).\na) Combien de nombres aléatoires la simulation tire-t-elle au total ?\nb) Combien de fréquences observées obtient-elle ?\nc) Dans un échantillon, $14$ personnes sur $40$ sont d'accord. Quelle est la fréquence observée ?",
          reponses: [
            { question: "a)", attendu: "20 000" },
            { question: "b)", attendu: "500" },
            { question: "c)", attendu: "0,35" },
          ],
          correction:
            "a) $500 \\times 40 = 20\\,000$ tirages.\nb) Chaque échantillon donne UNE fréquence : il y en a $500$.\nc) $14 \\div 40 = 0{,}35$.\n⛔ Le piège au b) : répondre $20\\,000$. Les tirages sont des nombres aléatoires, les fréquences se calculent par échantillon.\nRéponse : a) 20 000 ; b) 500 ; c) 0,35.",
          micros: ["va_bern_simuler"],
        },
        {
          enonce:
            "Une biologiste étudie un lac où la proportion de truites baguées vaut $p = 0{,}5$ (modèle). Elle a simulé $400$ échantillons de $25$ truites et représenté les fréquences observées.\na) Combien d'échantillons ont une fréquence à moins de $0{,}1$ de $p$ ?\nb) Combien s'en écartent de plus de $0{,}1$ ?\nc) Quel pourcentage des échantillons est à moins de $0{,}1$ de $p$ ?",
          figure: barres([
            { label: "< 0,4", value: 30 },
            { label: "0,4-0,5", value: 170 },
            { label: "0,5-0,6", value: 160 },
            { label: "> 0,6", value: 40 },
          ], { unite: "échantillons" }),
          reponses: [
            { question: "a)", attendu: "330" },
            { question: "b)", attendu: "70" },
            { question: "c)", attendu: "82,5 %" },
          ],
          correction:
            "a) Les deux barres qui entourent $0{,}5$ : $170 + 160 = 330$.\nb) Les deux barres extrêmes : $30 + 40 = 70$.\nc) $330 \\div 400 = 0{,}825$, soit $82{,}5$ %.\nVérification : $330 + 70 = 400$. ✔\n⛔ Le piège au b) : ne prendre qu'une barre extrême. On peut s'écarter de $p$ des deux côtés.\nRéponse : a) 330 ; b) 70 ; c) 82,5 %.",
          micros: ["va_bern_representer"],
        },
        {
          enonce:
            "Une responsable satisfaction d'une marque de cosmétiques simule des échantillons de $50$ clientes, pour une proportion $p = 0{,}6$ de clientes satisfaites (modèle). Que montre le diagramme ? Écris la lettre.\nA : toutes les fréquences observées valent $0{,}6$.\nB : les fréquences sont réparties au hasard, sans zone privilégiée.\nC : la plupart des fréquences sont proches de $0{,}6$, mais elles n'y sont pas toutes égales.\nD : la proportion de clientes satisfaites n'est pas $0{,}6$.",
          figure: barres([
            { label: "< 0,5", value: 25 },
            { label: "0,5-0,6", value: 180 },
            { label: "0,6-0,7", value: 170 },
            { label: "> 0,7", value: 25 },
          ], { unite: "échantillons" }),
          reponses: [{ attendu: "C" }],
          correction:
            "Les deux barres du milieu sont bien plus hautes : les fréquences se massent autour de $0{,}6$.\nIl reste tout de même $25 + 25 = 50$ échantillons sur les côtés : il y a de la fluctuation.\n⛔ Le piège : choisir D parce qu'une fréquence diffère de $0{,}6$. C'est normal : un échantillon ne redonne presque jamais $p$ exactement.\nRéponse : C.",
          micros: ["va_bern_representer"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : poser le succès, régler la simulation, compter, puis interpréter.",
      rappel: [
        "On écrit d'abord le succès et sa probabilité $p$ : c'est lui que code $X = 1$, et que traduit $r < p$.",
        "Un seul échantillon peut s'éloigner de $p$ : cela ne prouve pas que $p$ est faux.",
        "Pourcentage d'échantillons = nombre d'échantillons de la tranche ÷ nombre total d'échantillons.",
      ],
      exercices: [
        {
          titre: "Dix ampoules au tableur",
          enonce:
            "Un technicien d'usine simule $10$ ampoules, chacune défectueuse avec la probabilité $0{,}1$ (modèle). Son tableur donne $r$ = $0{,}03$ ; $0{,}57$ ; $0{,}92$ ; $0{,}08$ ; $0{,}41$ ; $0{,}66$ ; $0{,}15$ ; $0{,}74$ ; $0{,}29$ ; $0{,}88$.\na) Quelle condition sur $r$ code une ampoule défectueuse ? Écris la lettre. A : $r < 0{,}1$. B : $r \\geqslant 0{,}1$. C : $r < 0{,}9$.\nb) Combien d'ampoules défectueuses compte cette simulation ?\nc) Quelle est la fréquence observée ?\nd) Hugo conclut : « la fréquence n'est pas $0{,}1$, donc la probabilité est fausse ». A-t-il raison ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "0,2" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) Il faut un intervalle de longueur $0{,}1$ : $r < 0{,}1$.\nb) Seuls $0{,}03$ et $0{,}08$ sont sous $0{,}1$ : $2$ ampoules. Attention, $0{,}15$ est au-dessus.\nc) $2 \\div 10 = 0{,}2$.\nd) Sur un petit échantillon, la fréquence fluctue autour de $p$ : il a tort.\n⛔ Le piège au d) : attendre du hasard une régularité parfaite. Un échantillon ne redonne presque jamais $p$ exactement.\nRéponse : a) A ; b) 2 ; c) 0,2 ; d) non.",
          micros: ["va_bern_simuler"],
        },
        {
          titre: "Les pois de l'agronome",
          enonce:
            "Une agronome suit des pois. La proportion de pois à fleurs blanches vaut $p = 0{,}4$ (modèle). Elle simule $200$ échantillons de $50$ pois et représente les fréquences observées.\na) Combien de nombres aléatoires la simulation tire-t-elle ?\nb) Combien d'échantillons ont une fréquence à moins de $0{,}1$ de $p$ ?\nc) Quel pourcentage des échantillons cela fait-il ?\nd) Tous les échantillons donnent-ils exactement $0{,}4$ ? Réponds oui ou non.",
          figure: barres([
            { label: "< 0,3", value: 16 },
            { label: "0,3-0,4", value: 84 },
            { label: "0,4-0,5", value: 82 },
            { label: "> 0,5", value: 18 },
          ], { unite: "échantillons" }),
          reponses: [
            { question: "a)", attendu: "10 000" },
            { question: "b)", attendu: "166" },
            { question: "c)", attendu: "83 %" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) $200 \\times 50 = 10\\,000$ tirages.\nb) Les deux barres du milieu : $84 + 82 = 166$.\nc) $166 \\div 200 = 0{,}83$, soit $83$ %.\nd) Non : $16 + 18 = 34$ échantillons sont même à plus de $0{,}1$ de $p$.\n⛔ Le piège au c) : diviser par $10\\,000$. On compte ici des échantillons, et il y en a $200$.\nRéponse : a) 10 000 ; b) 166 ; c) 83 % ; d) non.",
          micros: ["va_bern_simuler", "va_bern_representer"],
        },
        {
          titre: "Les oiseaux bagués",
          enonce:
            "Un ornithologue suit un oiseau bagué. $X = 1$ si l'oiseau revient l'année suivante, ce qui arrive une fois sur quatre (modèle), $X = 0$ sinon.\na) $X$ suit-elle une loi de Bernoulli ? Réponds oui ou non.\nb) Que vaut le paramètre $p$ ?\nc) Que vaut $P(X = 0)$ ?\nd) Que vaut $E(X)$ ?\ne) Sur $400$ oiseaux suivis, combien de retours peut-il attendre, environ ?",
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "0,25" },
            { question: "c)", attendu: "0,75" },
            { question: "d)", attendu: "0,25" },
            { question: "e)", attendu: "100" },
          ],
          correction:
            "a) Un seul oiseau, deux issues codées $1$ et $0$ : oui.\nb) Une fois sur quatre : $1 \\div 4 = 0{,}25$.\nc) $1 - 0{,}25 = 0{,}75$.\nd) $E(X) = 0 \\times 0{,}75 + 1 \\times 0{,}25 = 0{,}25$.\ne) $400 \\times 0{,}25 = 100$ retours.\n⛔ Le piège au e) : croire que $100$ est une certitude. C'est une moyenne : le vrai nombre fluctuera autour.\nRéponse : a) oui ; b) 0,25 ; c) 0,75 ; d) 0,25 ; e) environ 100.",
          micros: ["va_bern_reconnaitre", "va_bern_esperance"],
        },
        {
          titre: "L'appli de musique",
          enonce:
            "Le responsable fidélisation d'une appli de musique sait qu'un abonné renouvelle avec la probabilité $0{,}8$ (modèle). Il simule $1\\,000$ échantillons de $25$ abonnés.\na) Quelle condition sur le nombre aléatoire $r$ code un renouvellement ? Écris la lettre. A : $r < 0{,}2$. B : $r < 0{,}8$. C : $r \\geqslant 0{,}8$.\nb) Combien de nombres aléatoires la simulation tire-t-elle ?\nc) Combien de fréquences observées obtient-il ?\nd) Un échantillon compte $18$ renouvellements. Quelle est sa fréquence observée ?",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "25 000" },
            { question: "c)", attendu: "1 000" },
            { question: "d)", attendu: "0,72" },
          ],
          correction:
            "a) Le renouvellement a la probabilité $0{,}8$ : il lui faut un intervalle de longueur $0{,}8$, soit $r < 0{,}8$.\nb) $1\\,000 \\times 25 = 25\\,000$ tirages.\nc) Une fréquence par échantillon : $1\\,000$.\nd) $18 \\div 25 = 0{,}72$.\n⛔ Le piège au d) : diviser par $1\\,000$. La fréquence d'un échantillon se calcule sur sa taille, $25$.\nRéponse : a) B ; b) 25 000 ; c) 1 000 ; d) 0,72.",
          micros: ["va_bern_simuler"],
        },
      ],
    },
  ],
};
