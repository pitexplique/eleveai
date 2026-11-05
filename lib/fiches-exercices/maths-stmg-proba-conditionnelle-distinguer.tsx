// ─── Fiche d'exercices : ne pas confondre les probabilités conditionnelles (STMG) — 20 exercices ─
//
// Notion proba_conditionnelle_distinguer du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/probabilites-conditionnelles.bank.ts`).
// ⛔ Programme de PREMIÈRE : tout se lit sur un tableau croisé, sans arbre. Le coach
// demande : distinguer $P(A \cap B)$, $P_A(B)$ et $P_B(A)$, l'évènement contraire
// dans la condition ($P_A(\overline{B})$), traduire par une phrase, et le vocabulaire
// des tests que le BO nomme : faux positifs, faux négatifs, sensibilité, spécificité.
//
// Aucune donnée réelle : tests, maladie, contrôles et enquêtes sont des modèles
// ou des situations visiblement fictives.
//
// Domaines et métiers : cinéma (projectionniste), piscine (maître-nageuse),
// parc éolien (technicien), fleuriste, commerce (vendeuse), association (trésorier),
// alarme incendie (pompier), antivirus (informaticienne) ; logement étudiant
// (assistante sociale), livraison (coursier), cyclisme (mécanicien), santé
// (biologiste), messagerie (ingénieur), assurance (assureuse), batteries (qualiticien),
// ornithologie (ornithologue) ; dépistage (épidémiologiste), faux billets (caissier),
// égalité professionnelle (journaliste), aéroport (agente de sûreté).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-probabilites.mjs`.
//
// Micro-compétences : probaC_distinguer (1, 2, 3, 4, 9, 10, 11, 14, 16, 19),
// probaC_interpreter_phrase (5, 6, 10, 14, 16, 19), probaC_test_diagnostique
// (7, 8, 12, 13, 15, 17, 18, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { croise } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesProbaConditionnelleDistinguerStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "proba-conditionnelle-distinguer",
  titre: "Ne pas confondre les probabilités conditionnelles",
  accroche:
    "Vingt exercices pour ne plus mélanger trois nombres qui se ressemblent : $P(A \\cap B)$, $P_A(B)$ et $P_B(A)$. Les traduire par une phrase, et comprendre pourquoi un test fiable peut se tromper souvent : faux positifs, faux négatifs, sensibilité, spécificité. Une alarme incendie, un filtre anti-spam, un scanner d'aéroport, un détecteur de faux billets. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : choisir le bon dénominateur, traduire une phrase, lire une case du tableau.",
      rappel: [
        "Même numérateur, la case A et B. Trois dénominateurs : le total général pour $P(A \\cap B)$, le total de A pour $P_A(B)$, le total de B pour $P_B(A)$.",
        "À condition fixée, les deux issues se partagent tout : $P_A(\\overline{B}) = 1 - P_A(B)$. ($\\overline{B}$ se lit « non B ».)",
        "« Parmi les A, x % sont B » se traduit par $P_A(B)$. Pas de « parmi » : c'est une intersection.",
        "Faux positif : signalé à tort. Faux négatif : pas signalé, alors qu'il aurait dû l'être.",
      ],
      exercices: [
        {
          enonce:
            "Un projectionniste choisit un spectateur au hasard. On note $A$ : « il a moins de 25 ans » et $B$ : « il voit un film français ». Calcule $P(A \\cap B)$.",
          figure: croise(["Spectateur", "Film français", "Film étranger", "Total"], [
            ["Moins de 25 ans", 30, 20, 50],
            ["25 ans ou plus", 30, 120, 150],
            ["Total", 60, 140, 200],
          ]),
          reponses: [{ attendu: "0,15" }],
          correction:
            "$A \\cap B$ se calcule sur tout le monde : le dénominateur est le total général, 200.\nLa case qui croise A et B : 30.\n$\\dfrac{30}{200} = 0{,}15$.\n⛔ Le piège : diviser par 50, le total de la ligne. Ce serait $P_A(B)$.\nRéponse : 0,15.",
          micros: ["probaC_distinguer"],
        },
        {
          enonce:
            "Une maître-nageuse choisit un nageur au hasard. On note $A$ : « c'est un enfant » et $B$ : « il suit un cours collectif ». Calcule $P_A(B)$.",
          figure: croise(["Nageur", "Cours collectif", "Nage libre", "Total"], [
            ["Enfant", 40, 10, 50],
            ["Adulte", 60, 90, 150],
            ["Total", 100, 100, 200],
          ]),
          reponses: [{ attendu: "0,8" }],
          correction:
            "L'indice $A$ dit : parmi les 50 enfants.\nLa case A et B : 40.\n$\\dfrac{40}{50} = 0{,}8$.\n⛔ Le piège : diviser par 100, le total de la colonne. Cela donne 0,4, qui est $P_B(A)$.\nRéponse : 0,8.",
          micros: ["probaC_distinguer"],
        },
        {
          enonce:
            "Un technicien choisit au hasard une éolienne de son parc. On note $A$ : « l'éolienne est terrestre » et $B$ : « elle est en maintenance ». Calcule $P_B(A)$.",
          figure: croise(["Éolienne", "Maintenance", "En service", "Total"], [
            ["Terrestre", 24, 96, 120],
            ["En mer", 8, 72, 80],
            ["Total", 32, 168, 200],
          ]),
          reponses: [{ attendu: "0,75" }],
          correction:
            "L'indice $B$ dit : parmi les 32 éoliennes en maintenance.\nLa case A et B : 24.\n$\\dfrac{24}{32} = 0{,}75$.\n⛔ Le piège : diviser par 120. Cela donne 0,2, qui est $P_A(B)$ : l'autre sens.\nRéponse : 0,75.",
          micros: ["probaC_distinguer"],
        },
        {
          enonce:
            "Un fleuriste choisit un client au hasard. Il a calculé $P_A(B) = 0{,}35$, où $A$ est « le client a commandé en ligne » et $B$ est « il a choisi la livraison ». Que vaut $P_A(\\overline{B})$ ?",
          reponses: [{ attendu: "0,65" }],
          correction:
            "La condition ne change pas : on reste parmi les clients qui ont commandé en ligne.\nDans ce groupe, soit on choisit la livraison, soit non : les deux font 1.\n$1 - 0{,}35 = 0{,}65$.\n⛔ Le piège : confondre avec $P_{\\overline{A}}(B)$. Là, c'est la condition qui change, et aucune soustraction ne donne ce nombre.\nRéponse : 0,65.",
          micros: ["probaC_distinguer"],
        },
        {
          enonce:
            "Une vendeuse choisit un client au hasard. Elle note $A$ : « le client a une carte de fidélité » et $B$ : « le client a acheté ». Elle écrit : « Parmi les clients qui ont acheté, 40 % ont une carte de fidélité. » Quelle probabilité vaut 0,4 ? Écris $P_A(B)$ ou $P_B(A)$. Au clavier, tape PA(B) ou PB(A).",
          reponses: [{ attendu: ["P_B(A)", "PB(A)"], exact: true }],
          correction:
            "« Parmi les clients qui ont acheté » : la condition est $B$. Elle va en indice.\nOn cherche la part de ceux qui ont une carte, c'est $A$.\nDonc $P_B(A) = 0{,}4$.\n⛔ Le piège : lire les lettres dans l'ordre de leur définition. La phrase commence par la condition.\nRéponse : $P_B(A)$, soit PB(A) au clavier.",
          micros: ["probaC_interpreter_phrase"],
        },
        {
          enonce:
            "Le trésorier d'une association choisit un adhérent au hasard et note $A$ : « l'adhérent est bénévole » et $B$ : « il est à jour de sa cotisation ». Il écrit : « 20 % des adhérents sont à la fois bénévoles et à jour. » Cette phrase parle-t-elle d'une conditionnelle ou d'une intersection ? Écris « conditionnelle » ou « intersection ».",
          reponses: [{ attendu: ["intersection", "une intersection"] }],
          correction:
            "La phrase parle de « 20 % des adhérents », donc de tout l'ensemble.\n« À la fois » : c'est $P(A \\cap B) = 0{,}2$, une intersection.\n⛔ Le piège : voir deux caractères et conclure à une conditionnelle. Il manque le mot « parmi » devant un groupe.\nRéponse : intersection.",
          micros: ["probaC_interpreter_phrase"],
        },
        {
          enonce:
            "Un pompier teste une alarme incendie sur 1 000 situations (modèle). Combien y a-t-il de faux positifs ?",
          figure: croise(["Situation", "Alarme", "Pas d'alarme", "Total"], [
            ["Vrai feu", 18, 2, 20],
            ["Pas de feu", 30, 950, 980],
            ["Total", 48, 952, 1000],
          ]),
          reponses: [{ attendu: "30" }],
          correction:
            "Un faux positif est signalé à tort : l'alarme sonne alors qu'il n'y a pas de feu.\nOn lit la case « Pas de feu » et « Alarme » : 30.\n⛔ Le piège : prendre 2. Ce sont les feux sans alarme : les faux négatifs.\nRéponse : 30.",
          micros: ["probaC_test_diagnostique"],
        },
        {
          enonce:
            "Une informaticienne teste un antivirus sur 1 000 fichiers (modèle). Combien y a-t-il de faux négatifs ?",
          figure: croise(["Fichier", "Bloqué", "Accepté", "Total"], [
            ["Avec virus", 95, 5, 100],
            ["Sain", 20, 880, 900],
            ["Total", 115, 885, 1000],
          ]),
          reponses: [{ attendu: "5" }],
          correction:
            "Un faux négatif n'est pas signalé alors qu'il aurait dû l'être : le fichier a un virus, mais il est accepté.\nOn lit la case « Avec virus » et « Accepté » : 5.\n⛔ Le piège : prendre 20. Ce sont les fichiers sains bloqués : les faux positifs.\nRéponse : 5.",
          micros: ["probaC_test_diagnostique"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Un tableau, plusieurs nombres qui se ressemblent : à chaque question, on nomme d'abord la population.",
      rappel: [
        "Pour un test, on note M : « réellement à signaler » et S : « signalé par le test ».",
        "La sensibilité est $P_M(S)$ : parmi ceux à signaler, la part que le test signale.",
        "La spécificité est $P_{\\overline{M}}(\\overline{S})$ : parmi ceux qui sont sains, la part que le test laisse passer.",
        "$P_S(M)$ n'est ni l'une ni l'autre : parmi les signalés, la part de ceux qui le méritent vraiment.",
      ],
      exercices: [
        {
          enonce:
            "Une assistante sociale étudie 400 étudiants (modèle). On en choisit un au hasard. On note $A$ : « il est boursier » et $B$ : « il loge à la résidence universitaire ».\na) Calcule $P(A \\cap B)$.\nb) Calcule $P_A(B)$.\nc) Calcule $P_B(A)$.",
          figure: croise(["Étudiant", "Résidence", "Autre logement", "Total"], [
            ["Boursier", 60, 90, 150],
            ["Non boursier", 40, 210, 250],
            ["Total", 100, 300, 400],
          ]),
          reponses: [
            { question: "a)", attendu: "0,15" },
            { question: "b)", attendu: "0,4" },
            { question: "c)", attendu: "0,6" },
          ],
          correction:
            "Le numérateur est toujours 60, seul le dénominateur change.\na) Sur tout le monde : $\\dfrac{60}{400} = 0{,}15$.\nb) Parmi les boursiers : $\\dfrac{60}{150} = 0{,}4$.\nc) Parmi les résidents : $\\dfrac{60}{100} = 0{,}6$.\n⛔ Le piège : croire que ces trois nombres sont égaux parce qu'ils parlent des mêmes 60 étudiants.\nRéponse : a) 0,15 ; b) 0,4 ; c) 0,6.",
          micros: ["probaC_distinguer"],
        },
        {
          enonce:
            "Un coursier livre 500 colis (modèle). On note $A$ : « le colis est livré à vélo » et $B$ : « il arrive en retard ». On choisit un colis au hasard. Voici quatre descriptions.\n1. La part des colis en retard parmi les colis livrés à vélo.\n2. La part des colis livrés à vélo parmi les colis en retard.\n3. La part des colis livrés à vélo et en retard parmi tous les colis.\n4. La part des colis en retard parmi tous les colis.\na) Calcule $P_A(B)$.\nb) Quelle description traduit ce résultat ? Écris son numéro.\nc) Calcule $P_B(A)$.\nd) Calcule $P(A \\cap B)$.",
          figure: croise(["Colis", "En retard", "À l'heure", "Total"], [
            ["À vélo", 20, 180, 200],
            ["En camion", 60, 240, 300],
            ["Total", 80, 420, 500],
          ]),
          reponses: [
            { question: "a)", attendu: "0,1" },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: "0,25" },
            { question: "d)", attendu: "0,04" },
          ],
          correction:
            "a) Parmi les 200 colis à vélo : $\\dfrac{20}{200} = 0{,}1$.\nb) La description 1 : elle nomme le bon groupe, « parmi les colis livrés à vélo ».\nc) Parmi les 80 colis en retard : $\\dfrac{20}{80} = 0{,}25$.\nd) Sur tous les colis : $\\dfrac{20}{500} = 0{,}04$.\n⛔ Le piège au b) : choisir la description 2. Elle inverse la condition et l'évènement : elle vaut 25 %, le résultat du c).\nRéponse : a) 0,1 ; b) 1 ; c) 0,25 ; d) 0,04.",
          micros: ["probaC_distinguer", "probaC_interpreter_phrase"],
        },
        {
          enonce:
            "Un mécanicien de vélos relève le port du casque (modèle). On choisit un cycliste au hasard. On note $A$ : « le cycliste roule sur route » et $B$ : « il porte un casque ».\na) Calcule $P_A(B)$.\nb) Calcule $P_A(\\overline{B})$.\nc) Calcule $P_{\\overline{A}}(B)$.",
          figure: croise(["Cycliste", "Casque", "Sans casque", "Total"], [
            ["Route", 140, 60, 200],
            ["VTT", 135, 15, 150],
            ["Total", 275, 75, 350],
          ]),
          reponses: [
            { question: "a)", attendu: "0,7" },
            { question: "b)", attendu: "0,3" },
            { question: "c)", attendu: "0,9" },
          ],
          correction:
            "a) Parmi les 200 cyclistes sur route : $\\dfrac{140}{200} = 0{,}7$.\nb) La condition reste « route », l'évènement est retourné : $1 - 0{,}7 = 0{,}3$.\nc) Ici c'est la CONDITION qui change : on passe aux 150 cyclistes en VTT. $\\dfrac{135}{150} = 0{,}9$.\n⛔ Le piège au c) : écrire encore $1 - 0{,}7$. Aucune soustraction ne relie $P_A(B)$ et $P_{\\overline{A}}(B)$ : on change de population.\nRéponse : a) 0,7 ; b) 0,3 ; c) 0,9.",
          micros: ["probaC_distinguer"],
        },
        {
          enonce:
            "Une biologiste évalue un test sur 1 000 personnes (modèle).\na) Calcule la sensibilité du test.\nb) Calcule sa spécificité.\nc) Combien y a-t-il de faux positifs ?",
          figure: croise(["Personne", "Test positif", "Test négatif", "Total"], [
            ["Malade", 45, 5, 50],
            ["Non malade", 95, 855, 950],
            ["Total", 140, 860, 1000],
          ]),
          reponses: [
            { question: "a)", attendu: "0,9" },
            { question: "b)", attendu: "0,9" },
            { question: "c)", attendu: "95" },
          ],
          correction:
            "a) Sensibilité : parmi les 50 malades, la part de tests positifs. $\\dfrac{45}{50} = 0{,}9$.\nb) Spécificité : parmi les 950 non-malades, la part de tests négatifs. $\\dfrac{855}{950} = 0{,}9$.\nc) Positifs alors que non malades : la case vaut 95.\n⛔ Le piège au a) : diviser par 140, le total des positifs. Ce serait la part de malades parmi les positifs, un autre nombre.\nRéponse : a) 0,9 ; b) 0,9 ; c) 95.",
          micros: ["probaC_test_diagnostique"],
        },
        {
          enonce:
            "Un ingénieur teste un filtre anti-spam sur 10 000 courriels (modèle).\na) Calcule la sensibilité du filtre.\nb) Calcule sa spécificité.\nc) Parmi les courriels classés en spam, quelle est la part de vrais spams ? Arrondis au centième.",
          figure: croise(["Courriel", "Classé spam", "Boîte normale", "Total"], [
            ["Vrai spam", 1900, 100, 2000],
            ["Normal", 400, 7600, 8000],
            ["Total", 2300, 7700, 10000],
          ]),
          reponses: [
            { question: "a)", attendu: "0,95" },
            { question: "b)", attendu: "0,95" },
            { question: "c)", attendu: "0,83", tolerance: 0.005 },
          ],
          correction:
            "a) Parmi les 2 000 vrais spams : $\\dfrac{1\\,900}{2\\,000} = 0{,}95$.\nb) Parmi les 8 000 courriels normaux : $\\dfrac{7\\,600}{8\\,000} = 0{,}95$.\nc) Parmi les 2 300 classés spam : $\\dfrac{1\\,900}{2\\,300} \\approx 0{,}83$.\n⛔ Le piège au c) : répondre 0,95. La sensibilité se lit sur la ligne, la question c) se lit sur la colonne.\nRéponse : a) 0,95 ; b) 0,95 ; c) 0,83.",
          micros: ["probaC_test_diagnostique"],
        },
        {
          enonce:
            "Une assureuse étudie 1 800 conducteurs (modèle). On en choisit un au hasard. On note $J$ : « le conducteur est jeune » et $S$ : « il a eu un sinistre ».\na) Calcule $P_J(S)$.\nb) Calcule $P_S(J)$.\nc) « Plus d'un jeune conducteur sur quatre a eu un sinistre. » Réponds vrai ou faux.\nd) « Parmi les conducteurs qui ont eu un sinistre, plus d'un sur quatre est jeune. » Réponds vrai ou faux.",
          figure: croise(["Conducteur", "Sinistre", "Sans sinistre", "Total"], [
            ["Jeune", 60, 240, 300],
            ["Expérimenté", 90, 1410, 1500],
            ["Total", 150, 1650, 1800],
          ]),
          reponses: [
            { question: "a)", attendu: "0,2" },
            { question: "b)", attendu: "0,4" },
            { question: "c)", attendu: "faux" },
            { question: "d)", attendu: "vrai" },
          ],
          correction:
            "a) Parmi les 300 jeunes : $\\dfrac{60}{300} = 0{,}2$.\nb) Parmi les 150 sinistres : $\\dfrac{60}{150} = 0{,}4$.\nc) Faux : « parmi les jeunes », c'est $P_J(S) = 0{,}2$. Un sur quatre ferait 0,25 : on est en dessous.\nd) Vrai : « parmi les sinistres », c'est $P_S(J) = 0{,}4$, au-dessus de 0,25.\n⛔ Le piège : croire que les deux phrases disent la même chose. Échanger la condition et l'évènement change le nombre.\nRéponse : a) 0,2 ; b) 0,4 ; c) faux ; d) vrai.",
          micros: ["probaC_distinguer", "probaC_interpreter_phrase"],
        },
        {
          enonce:
            "Un qualiticien contrôle 2 000 batteries (modèle) : 100 sont défectueuses. Le contrôle en signale 80, et signale aussi à tort 5 % des batteries saines.\na) Combien de batteries saines sont signalées à tort ?\nb) Combien de batteries sont des faux négatifs ?\nc) Combien de batteries sont signalées en tout ?\nd) Parmi les batteries signalées, quelle est la part de batteries vraiment défectueuses ? Arrondis au centième.",
          reponses: [
            { question: "a)", attendu: "95" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "175" },
            { question: "d)", attendu: "0,46", tolerance: 0.005 },
          ],
          correction:
            "a) Saines : $2\\,000 - 100 = 1\\,900$. Puis $1\\,900 \\times 0{,}05 = 95$.\nb) Défectueuses non signalées : $100 - 80 = 20$.\nc) $80 + 95 = 175$ batteries signalées.\nd) $\\dfrac{80}{175} \\approx 0{,}46$.\n⛔ Le piège au d) : répondre 0,8. Ce nombre est la sensibilité, $\\dfrac{80}{100}$ : il se lit dans l'autre sens.\nRéponse : a) 95 ; b) 20 ; c) 175 ; d) 0,46.",
          schema: croise(["Batterie", "Signalée", "Non signalée", "Total"], [
            ["Défectueuse", 80, 20, 100],
            ["Saine", 95, 1805, 1900],
            ["Total", 175, 1825, 2000],
          ]),
          micros: ["probaC_test_diagnostique"],
        },
        {
          enonce:
            "Un ornithologue bague des oiseaux (modèle). On en choisit un au hasard. On note $M$ : « l'oiseau est un mâle » et $B$ : « il est bagué ».\na) « Parmi les oiseaux bagués, quelle part de mâles ? » Quelle probabilité est-ce ? Écris $P_M(B)$ ou $P_B(M)$ (au clavier : PM(B) ou PB(M)).\nb) Donne cette probabilité en pourcentage.\nc) Calcule $P(M \\cap B)$.",
          figure: croise(["Oiseau", "Bagué", "Non bagué", "Total"], [
            ["Mâle", 30, 90, 120],
            ["Femelle", 50, 30, 80],
            ["Total", 80, 120, 200],
          ]),
          reponses: [
            { question: "a)", attendu: ["P_B(M)", "PB(M)"], exact: true },
            { question: "b)", attendu: "37,5 %" },
            { question: "c)", attendu: "0,15" },
          ],
          correction:
            "a) « Parmi les bagués » : la condition est $B$. On écrit $P_B(M)$.\nb) $\\dfrac{30}{80} = 0{,}375$, soit 37,5 %.\nc) Sur tous les oiseaux : $\\dfrac{30}{200} = 0{,}15$.\n⛔ Le piège au b) : diviser 30 par 120, ce qui donne $P_M(B) = 0{,}25$. La phrase commence par « parmi les oiseaux bagués ».\nRéponse : a) PB(M) ; b) 37,5 % ; c) 0,15.",
          micros: ["probaC_distinguer", "probaC_interpreter_phrase"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "On construit le tableau à partir de l'énoncé, puis on répond dans le bon sens.",
      rappel: [
        "On construit le tableau : d'abord les totaux, puis les cases, par multiplication et par soustraction.",
        "Quand les sains sont très nombreux, une petite part de fausses alertes pèse lourd : $P_S(M)$ peut être faible même si le test est bon.",
        "Avant de croire une phrase avec un pourcentage, on cherche : parmi qui ?",
      ],
      exercices: [
        {
          titre: "La maladie rare",
          enonce:
            "Une épidémiologiste étudie une maladie fictive sur 10 000 personnes : 1 % sont malades. Le test est positif pour 90 % des malades, et pour 5 % des non-malades.\na) Combien de malades ont un test positif ?\nb) Combien de faux positifs y a-t-il ?\nc) Combien de tests sont positifs en tout ?\nd) On choisit au hasard une personne dont le test est positif. Quelle est la probabilité qu'elle soit malade ? Arrondis au centième.",
          reponses: [
            { question: "a)", attendu: "90" },
            { question: "b)", attendu: "495" },
            { question: "c)", attendu: "585" },
            { question: "d)", attendu: "0,15", tolerance: 0.005 },
          ],
          correction:
            "Malades : $10\\,000 \\times 0{,}01 = 100$. Non-malades : $10\\,000 - 100 = 9\\,900$.\na) $100 \\times 0{,}9 = 90$.\nb) $9\\,900 \\times 0{,}05 = 495$.\nc) $90 + 495 = 585$.\nd) Parmi les 585 positifs : $\\dfrac{90}{585} \\approx 0{,}15$.\n⛔ Le piège au d) : répondre 90 %. Ce nombre est la sensibilité. Comme les non-malades sont très nombreux, la plupart des positifs ne sont pas malades.\nRéponse : a) 90 ; b) 495 ; c) 585 ; d) 0,15.",
          schema: croise(["Personne", "Positif", "Négatif", "Total"], [
            ["Malade", 90, 10, 100],
            ["Non malade", 495, 9405, 9900],
            ["Total", 585, 9415, 10000],
          ]),
          micros: ["probaC_test_diagnostique"],
        },
        {
          titre: "Le détecteur de faux billets",
          enonce:
            "Un caissier teste un détecteur sur 5 000 billets (modèle) : 2 % sont faux. Le détecteur refuse 95 % des faux billets et, à tort, 2 % des vrais.\na) Combien y a-t-il de faux négatifs ?\nb) Quelle est la sensibilité du détecteur ?\nc) Quelle est sa spécificité ?\nd) On choisit au hasard un billet refusé. Quelle est la probabilité qu'il soit faux ? Arrondis au centième.",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "0,95" },
            { question: "c)", attendu: "0,98" },
            { question: "d)", attendu: "0,49", tolerance: 0.005 },
          ],
          correction:
            "Faux billets : $5\\,000 \\times 0{,}02 = 100$. Vrais : $4\\,900$. Faux refusés : $100 \\times 0{,}95 = 95$. Vrais refusés : $4\\,900 \\times 0{,}02 = 98$.\na) Faux billets acceptés : $100 - 95 = 5$.\nb) $\\dfrac{95}{100} = 0{,}95$.\nc) Vrais billets acceptés : $4\\,900 - 98 = 4\\,802$. $\\dfrac{4\\,802}{4\\,900} = 0{,}98$.\nd) Refusés : $95 + 98 = 193$. $\\dfrac{95}{193} \\approx 0{,}49$.\n⛔ Le piège au d) : répondre 0,95. Un billet refusé sur deux environ est en réalité un vrai billet.\nRéponse : a) 5 ; b) 0,95 ; c) 0,98 ; d) 0,49.",
          schema: croise(["Billet", "Refusé", "Accepté", "Total"], [
            ["Faux", 95, 5, 100],
            ["Vrai", 98, 4802, 4900],
            ["Total", 193, 4807, 5000],
          ]),
          micros: ["probaC_test_diagnostique"],
        },
        {
          titre: "La phrase du journal",
          enonce:
            "Une entreprise compte 500 salariés (modèle), et on en choisit un au hasard. Une journaliste écrit : « 60 % des femmes de cette entreprise sont cadres ». On note $F$ : « le salarié est une femme » et $C$ : « il est cadre ».\na) Calcule $P_C(F)$.\nb) Calcule $P_F(C)$.\nc) La phrase de la journaliste est-elle vraie ? Réponds vrai ou faux.\nd) Calcule $P(F \\cap C)$.",
          figure: croise(["Salarié", "Cadre", "Non cadre", "Total"], [
            ["Femme", 30, 220, 250],
            ["Homme", 20, 230, 250],
            ["Total", 50, 450, 500],
          ]),
          reponses: [
            { question: "a)", attendu: "0,6" },
            { question: "b)", attendu: "0,12" },
            { question: "c)", attendu: "faux" },
            { question: "d)", attendu: "0,06" },
          ],
          correction:
            "a) Parmi les 50 cadres : $\\dfrac{30}{50} = 0{,}6$.\nb) Parmi les 250 femmes : $\\dfrac{30}{250} = 0{,}12$.\nc) Faux : 60 % est la part de femmes PARMI LES CADRES. Parmi les femmes, seules 12 % sont cadres.\nd) Sur tous les salariés : $\\dfrac{30}{500} = 0{,}06$.\n⛔ Le piège : inverser la phrase. « 60 % des cadres sont des femmes » est juste, « 60 % des femmes sont cadres » est faux.\nRéponse : a) 0,6 ; b) 0,12 ; c) faux ; d) 0,06.",
          micros: ["probaC_distinguer", "probaC_interpreter_phrase"],
        },
        {
          titre: "Le scanner de l'aéroport",
          enonce:
            "Une agente de sûreté étudie 20 000 bagages (modèle) : 40 contiennent un objet interdit. Le scanner en fait fouiller 38. Il fait aussi fouiller, à tort, 5 % des bagages sans objet interdit.\na) Combien y a-t-il de faux négatifs ?\nb) Combien y a-t-il de faux positifs ?\nc) Quelle est la sensibilité du scanner ?\nd) On choisit au hasard un bagage fouillé. Quelle est la probabilité qu'il contienne un objet interdit ? Arrondis au centième.",
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "998" },
            { question: "c)", attendu: "0,95" },
            { question: "d)", attendu: "0,04", tolerance: 0.005 },
          ],
          correction:
            "a) Bagages interdits non fouillés : $40 - 38 = 2$.\nb) Sans objet interdit : $20\\,000 - 40 = 19\\,960$. Puis $19\\,960 \\times 0{,}05 = 998$.\nc) $\\dfrac{38}{40} = 0{,}95$.\nd) Fouillés : $38 + 998 = 1\\,036$. $\\dfrac{38}{1\\,036} \\approx 0{,}04$.\n⛔ Le piège au d) : répondre 0,95. Un scanner très sensible peut faire ouvrir beaucoup de bagages sans rien d'interdit, car ils sont bien plus nombreux.\nRéponse : a) 2 ; b) 998 ; c) 0,95 ; d) 0,04.",
          schema: croise(["Bagage", "Fouillé", "Non fouillé", "Total"], [
            ["Objet interdit", 38, 2, 40],
            ["Rien d'interdit", 998, 18962, 19960],
            ["Total", 1036, 18964, 20000],
          ]),
          micros: ["probaC_test_diagnostique"],
        },
      ],
    },
  ],
};
