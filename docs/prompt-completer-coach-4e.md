# Prompt — compléter le coach de 4ᵉ contre le BO

> Réécrit le 27/08/2026 **après** avoir transposé le programme en donnée.
> **Autonome.** (`docs/*` est ignoré par git : ajouter avec `git add -f`.)
>
> ⚠️ Historique des chiffres, parce qu'il enseigne quelque chose : « 75 % »
> (lecture à vue), puis « ~60 % » (lecture fidèle du BO recopié), puis **53 %**
> (mesuré par le dépôt, au grain de la puce). Les trois ne mesuraient pas la
> même chose. ⛔ Ne plus jamais en estimer un à la main : `verifier-bo.ts` le
> rejoue en une commande.

```
Tu travailles sur eleveai (C:\Users\FRED\Documents\eleveai).
Tu es la session MATHS 4e. D'autres sessions travaillent dans le même dossier.

⭐ COMMENCER PAR, DANS CET ORDRE :
   1. git pull
   2. LANCER la mesure — elle dit tout, à jour, en trente secondes :
         npx --yes tsx@4 scripts/verifier-bo.ts 4e
   3. LIRE lib/tutor-v4/knowledge/maths/4e/bo-objectifs.ts — le programme
      officiel écrit comme une DONNÉE, une entrée par puce, avec la page.
   4. LIRE docs/bo-maths-cycle4-recopie.md — le texte source recopié.
   5. LIRE docs/passation-maths-4e.md — toutes les règles de dessin, de mesure
      et de dépôt. Ce prompt ne les redit pas.

════ OÙ ON EN EST ═══════════════════════════════════════════════════
maths 4e   20 notions · 136 micros · 20 fiches · 20 PDF   ·   tout est poussé

Les six vérificateurs de banque passent (validité ✅, générateurs ✅, variété ✅
médiane 310 minimum 11, devinabilité ✅, canvas ✅, couverture 136/136).

⭐ ET DEPUIS LE 27/08 IL Y EN A UN SEPTIÈME, celui qui regarde le PROGRAMME :

    npx --yes tsx@4 scripts/verifier-bo.ts 4e
    → 111 objectifs d'apprentissage · 136 micro-compétences
      59/111 objectifs couverts (53 %) — 52 trous
      0 micro citée mais inexistante · 0 micro hors programme

⭐ LE POINT AVEUGLE EST FERMÉ. Les six autres comptent les items d'une micro
EXISTANTE : un trou n'a rien à compter, donc il ne déclenchait rien. C'est ce
silence qui a laissé la 4e annoncer « 75 % » avec neuf chapitres absents.
Désormais chaque puce du BO a sa ligne, et `micros: []` allume le rouge.

⛔ AUCUNE MICRO N'EST HORS PROGRAMME EN 4e (0 dette), et aucune micro citée
n'est inexistante. La carte est donc exacte des deux côtés : ce qui reste, ce
sont de VRAIS trous.

════ ⚠️ DEUX ENTRÉES DE L'ANCIENNE LISTE ÉTAIENT FAUSSES ════════════
Vérifiées item par item dans les banques, pas par recherche de mot :

  · RACINE CARRÉE et CARRÉS PARFAITS de 1 à 144 → ⭐ DÉJÀ COUVERTS.
    `pythagore_carre_racine` a six items et un gabarit, et sa table
    `knownSquares` va de 2² à 15² — au-delà des 144 du BO.
    ⚠️ Mais la micro vit dans la notion `pythagore_theoreme` : les carrés ne s'y
    travaillent qu'au service du théorème. Ce n'est plus une création, c'est une
    CONSOLIDATION (sortir la micro, ou lui ajouter le hors-géométrie x² = a).

  · FRACTION IRRÉDUCTIBLE → ⭐ DÉJÀ COUVERTE par `fraction_simplifier`, qui
    définit l'irréductibilité et fait reconnaître une fraction déjà irréductible.
    C'est le seul point de tout l'attendu « divisibilité » qui existe.

👉 Ça change l'ordre d'attaque : les PUISSANCES restent seules en tête.

════ CE QUI MANQUE VRAIMENT ═════════════════════════════════════════
⛔ NE PAS RECOPIER CETTE LISTE DANS UN COMMIT : elle vieillit. La liste vivante
est la sortie de `verifier-bo.ts 4e`. Ce qui suit n'est qu'une carte de lecture.

Les DEUX attendus de fin de cycle entièrement absents :
    · divisibilité et nombres premiers   (11 puces sur 12 vides)
    · fonction                            (10 puces sur 10 vides)

Les gros blocs manquants, par thème :
  A · puissances, notation scientifique, préfixes nano→giga, ordres de grandeur
      vraisemblance d'un résultat ; annulation d'un produit, équations produits,
      équations du type x² = a
  B · notion de RATIO (notation 2 : 3) et partage selon un ratio
      recueillir et organiser des données ; histogramme
      lien FRÉQUENCE ↔ PROBABILITÉ (la 6e a la notion `proba_frequence` entière)
  C · grandeur produit, grandeur quotient ; cohérence des unités
      conversions de LONGUEURS et d'AIRES (seuls les volumes convertissent)
      agrandissement / réduction ; ÉCHELLE d'une carte (la 6e a `prop_echelle`)
      volume de la pyramide, du cône, de la boule
  D · abscisse, ordonnée, altitude ; latitude, longitude ; tout le REPÉRAGE
      reconnaître un solide ; patrons, perspective cavalière
      angles alternes internes et correspondants
      somme des angles du triangle en 4e ; hauteurs et médiatrices ;
      inégalité triangulaire ; CAS D'ÉGALITÉ DES TRIANGLES ; triangles semblables
      homothétie ; protocole de construction
  E · déclenchement d'une action par un événement (le reste est complet)

⭐ Quatre trous sont ASSUMÉS et doivent le rester — ils sont notés comme tels
dans `bo-objectifs.ts` : le tableur-grapheur et le logiciel de géométrie
dynamique (un geste de logiciel ne s'évalue pas en QCM), et les notations
f(x) / x ↦ f(x) ainsi que les fonctions linéaire et affine (repères annuels :
« La notation et le vocabulaire fonctionnels NE SONT PAS FORMALISÉS EN 4e »).

════ ⛔ UN BOGUE À CORRIGER AVANT D'OUVRIR LE REPÉRAGE ═══════════════
`4e_sym_translation_tpl_2_coordonnees` et `4e_sym_translation_tpl_4`
(`transformations.bank.ts`) comptent l'ordonnée VERS LE BAS — « ordonnée
écran ». Dans un repère, « vers le haut » AUGMENTE l'ordonnée.
👉 La réponse mathématiquement juste y est proposée comme LEURRE : l'élève qui a
raison est compté faux. Et c'est le SEUL endroit du coach de 4e où les mots
« abscisse » et « ordonnée » apparaissent — donc combler le trou du repérage
sans corriger d'abord reviendrait à bâtir par-dessus une erreur.
⚠️ Deux gabarits, deux inversions de signe. Demander à Frédéric avant de
toucher : la consigne debout est « le reste du coach 4eme on ne touche pas ».

════ LE PROGRAMME EST DÉJÀ RECOPIÉ — NE PAS LE REFAIRE ══════════════
`docs/bo-maths-cycle4-recopie.md` contient les CINQ THÈMES, intitulés recopiés
mot pour mot depuis des captures d'écran lisibles, avec les pages.
`lib/tutor-v4/knowledge/maths/4e/bo-objectifs.ts` en est la transposition en
donnée : 111 entrées, une par puce, connaissances ET compétences associées.

Source : « Programme du cycle des approfondissements (cycle 4) », mathématiques
aux pages 126-137, pied de page officiel **« BOEN n° 31 du 30 juillet 2020 »**.
C'est le programme APPLICABLE à la 4ᵉ en 2026-2027.

⛔ NE PAS EXTRAIRE CE PDF AUTOMATIQUEMENT. Testé, et c'est un piège : les
extracteurs perdent les fragments à apostrophe SANS RIEN SIGNALER.
« Nombres décimaux (positifs et négatifs), notion d'opposé » devenait
« Nombres . » — et une puce entière du thème D, « cas d'égalité des triangles »,
disparaissait des DEUX PDF testés. C'est une capture d'écran qui l'a révélée.
👉 Pour tout complément : capture d'écran, jamais extraction.

⛔ ET LA RÈGLE DE `bo-objectifs.ts`, ELLE EST DURE : « les intitulés sont
RECOPIÉS, jamais reformulés — le jour où le programme bouge, on compare deux
textes, pas deux souvenirs. » Et : « `micros: []` n'est pas un oubli, c'est un
CONSTAT. Ne jamais y mettre une micro qui s'en rapproche pour faire passer le
vérificateur au vert — ce serait remettre le mensonge dans le fichier censé
l'empêcher. »

⚠️ CE SONT DES OBJECTIFS DE **CYCLE**. Le programme 2020 est organisé par cycle :
il ne dit pas si une connaissance se travaille en 5ᵉ, en 4ᵉ ou en 3ᵉ. Un trou
signale donc que le COACH DE 4ᵉ ne le couvre pas, pas nécessairement qu'il
devrait. Là où l'arbitrage se joue sur les repères annuels, la `note` le dit et
s'arrête là : on n'invente pas une année qu'on n'a pas lue.

════ ⚠️ L'HORIZON 2027 ══════════════════════════════════════════════
Il existe DEUX programmes. Aucun ne porte de date dans son corps — on les
distingue par leur STRUCTURE :

  · organisé par CYCLE, cinq thèmes A→E, Thalès et trigonométrie ensemble
    → programme 2020, APPLICABLE à la 4ᵉ en 2026-2027. C'est LUI qui commande.
  · organisé PAR ANNÉE (Cinquième/Quatrième/Troisième), sections
    « Automatismes », orthographe rectifiée, VECTEURS en 3ᵉ
    → nouveau programme, 4ᵉ à partir de SEPTEMBRE 2027.

Ce que le nouveau déplace, et qui change l'ordre d'investissement :

    en 4ᵉ                     2026-2027       à partir de 2027
    puissances, racine carrée    ✅              ✅  (restent)
    fonctions                    ✅              ✅  (mais réduites au
                                                     programme de calcul)
    MULTIPLES ET DIVISEURS       ✅              ⚠️ PASSENT EN 3ᵉ
    Thalès, cosinus              ✅              ⛔ passent en 3ᵉ
    droite des milieux           —               ⭐ arrive en 4ᵉ
    volume pyramide et cône      —               ⭐ arrive en 4ᵉ

👉 CONSÉQUENCE : les PUISSANCES sont la valeur sûre — elles restent en 4ᵉ dans
les deux programmes. L'arithmétique ne servira la 4ᵉ qu'un an, puis la 3ᵉ en
héritera. Ne pas investir davantage dans Thalès ni le cosinus.

⭐ Et une confirmation déjà acquise : « La pensée informatique — Quatrième » du
nouveau programme énonce MOT POUR MOT les cinq micros de `algo_programmation`.
La fiche du 27/08 est déjà alignée sur 2027.

════ ⭐⭐ LA BONNE NOUVELLE : LA 3ᵉ ET LA 6ᵉ ONT DÉJÀ ═══════════════
On ne part PAS de zéro. Le coach de 3ᵉ possède ces notions avec leurs micros ET
leurs banques, et sa validité passe (140 micros, 721 items fixes) :

    notion 3ᵉ                micros   banque                items
    entier_puissance            6      puissances.bank.ts     59
    entier_racine_carree        5      racine_carree.bank.ts  47
    entier_arithmetique         6      arithmetique.bank.ts   10  ⚠️
    fonction_generalite         …      fonctions.bank.ts      61

⭐ ET LA 6ᵉ A CE QUI MANQUE EN GRANDEURS ET EN REPÉRAGE, à 100 % de couverture
BO (83/83) : `prop_echelle` (échelles), `abscisse_*` (droite graduée),
`proba_frequence` (fréquence ↔ probabilité), `vision_espace` (patrons, vues),
`aire_convertir` et `aire_longueur_convertir` (conversions).

⭐ LE TRAVAIL EST DONC DE **DESCENDRE** OU DE **REMONTER**, PAS D'INVENTER.
Ça garantit en prime la continuité verticale, objectif affiché de
`knowledge/maths/4e/bo.ts`.

⚠️ CE QUI RESTE EN 3ᵉ, ET NE DOIT PAS DESCENDRE :
  · les propriétés algébriques des racines (√a × √b, √(a/b)) ;
  · les formules générales sur les puissances (produits et quotients de même
    base) — le BO dit qu'elles « résultent de l'application de la définition
    plutôt que de celle d'une formule » ;
  · la notation f(x) et x ↦ f(x), les fonctions linéaires et affines.
    ⭐ « La notation et le vocabulaire fonctionnels NE SONT PAS FORMALISÉS EN 4e. »
    En 4ᵉ : dépendance de deux grandeurs par tableau, formule, graphique et
    PROGRAMME DE CALCUL, lecture d'images et d'antécédents. Rien de plus.

⚠️ `arithmetique.bank.ts` de la 3ᵉ ne compte que DIX items : la plus maigre des
quatre, et justement la notion entièrement absente en 4ᵉ. Ne pas la recopier
telle quelle, elle ne passerait pas le seuil de variété.

════ ⛔ BANQUE D'ABORD, FICHE ENSUITE ═══════════════════════════════
Frédéric : « une fiche sans banque ne s'allume pas dans le coach ».
Corollaire appris sur la 6ᵉ : une fiche ne répare pas un coach qui se répète —
elle lui donne une belle façade.

POUR CHAQUE NOTION :
 1. Lire ses entrées dans `bo-objectifs.ts` (elles citent la page du BO), puis
    les micros de la notion sœur en 3ᵉ ou en 6ᵉ.
 2. Écrire les MICROS dans knowledge/maths/4e/microSkills.ts et la NOTION dans
    notions.ts.
    ⛔⛔ IL N'Y A PAS DE NOMBRE DE MICROS À VISER. Frédéric, 27/08 : « on peut en
    avoir 7 ou 3, mais le but c'est d'être COHÉRENT. » Le nombre SUIT la notion,
    il ne la commande pas. Une notion = UN objet que l'élève clique, décomposé
    d'un seul grain. ⭐ Et le mode complet permet de RESTER SUR UNE MICRO : un
    découpage fin ne disperse donc pas, il précise.
    👉 Le test n'est pas « combien ? » mais « est-ce qu'une seule ligne de
    fracture traverse la liste ? ». Si oui, c'est deux notions — et elle se lit
    dans les PRÉREQUIS, comme pour `fraction_nombre` / `fraction_calcul` le
    26/08 et pour `stat_statistique` le 27/08.
 3. Écrire la BANQUE dans questionBank/4e/maths/<notion>.bank.ts, la brancher
    dans index.ts.
 4. ⭐ ACCROCHER les nouvelles micros aux objectifs dans `bo-objectifs.ts` —
    sinon `verifier-bo.ts` les déclare hors programme, et il a raison.
 5. ⭐⭐ LA MATRICE — l'étape la plus facile à oublier, et sans elle la notion
    existe dans le coach mais personne ne peut y arriver. DEUX fichiers, tous
    deux PARTAGÉS (donc `git diff -- <fichier>` avant de committer) :
      a. `lib/matrice/coach.ts` — le pont « thème tapé » → notion ouverte, par
         classe. ⛔ VÉRIFIÉ LE 27/08 : il n'existe AUCUN thème « puissances », et
         le thème `calcul` s'arrête à la 6ᵉ. Un élève de 4ᵉ — ET DE 3ᵉ — qui tape
         « puissances » n'ouvre rien, alors que la 3ᵉ a `entier_puissance` avec
         59 items. Ajouter le thème avec LES DEUX classes d'un coup.
         ⚠️ Ne jamais inventer un identifiant : les lire dans `notions.ts`.
         `normalizeClasse()` a une whitelist et retombe EN SILENCE sur la 6ᵉ.
      b. `node scripts/generer-notions-matrice.mjs` — régénère
         `lib/matrice/notions.generated.ts` depuis les `notions.ts`.
         ⛔ NE JAMAIS l'éditer à la main, l'en-tête le dit.
 6. FAIRE PASSER LES SEPT VÉRIFICATEURS — pas six.
 7. Seulement ensuite : fiche, page, registre, PDF (voir la passation).

⚠️ LES APERÇUS NE SONT PAS DE CETTE SESSION. `public/apercus/coach/maths/4e/`
est VIDE — zéro aperçu pour toute la 4ᵉ, alors qu'un élève sur deux quitte le
coach. C'est le chantier de la session ÉCRAN (`scripts/capturer-apercus-coach.ts`,
en cours sur la 5ᵉ le 27/08). ⛔ Ne pas y toucher : signaler la notion neuve et
la laisser faire.

⚠️ Les `.mjs` de banque se lancent avec **tsx**, et leur ordre d'arguments est
**<classe> <matière>** — l'INVERSE de `verifier-micros.mjs` :

    node scripts/verifier-banque.mjs 4e maths
    node scripts/verifier-generateurs.mjs 4e maths
    npx --yes tsx@4 scripts/verifier-variete.mjs 4e maths
    npx --yes tsx@4 scripts/verifier-devinabilite.mjs 4e maths
    npx --yes tsx@4 scripts/verifier-canvas.mjs 4e maths
    node scripts/verifier-micros.mjs maths 4e        # ⚠️ ordre INVERSE
    npx --yes tsx@4 scripts/verifier-bo.ts 4e        # ⭐ le septième

⭐ LE SEUIL QUI COMPTE EST LA VARIÉTÉ : dix énoncés distincts par micro, et il se
gagne avec des GÉNÉRATEURS, pas des `fixed`. Un `fixed` ne vaut qu'un énoncé.
Les quatre micros de 6ᵉ trouvées sous le seuil étaient toutes « presque
intégralement fixed ». Médiane du dépôt : 310.

⛔ DEUX PIÈGES DE BANQUE, PAYÉS EN VRAIES ERREURS :
  · `makeChoices` déduplique et coupe à trois distracteurs : un gabarit qui
    n'écrit que trois pièges tombe à trois choix.
  · Un QCM se gagne à la LONGUEUR quand la bonne réponse est la plus longue. On
    ALLONGE les leurres, on ne raccourcit pas la réponse. ⚠️ Et allonger un
    leurre le rapproche de la vérité : il peut devenir VRAI.

════ ⭐ LES CANVAS SONT DÉJÀ LÀ POUR LES TROUS ══════════════════════
Le moteur dessine 30 figures (`lib/tutor-v4/types_canvas.ts`). ⛔ NE PAS EN
ÉCRIRE UNE À LA MAIN avant d'avoir vérifié dans cette liste — plusieurs trous de
la 4ᵉ ont déjà leur dessin qui attend :

    trou du BO                        canvas qui l'attend
    ──────────────────────────────────────────────────────────────────
    fonctions (image, antécédent)     `fonction_tableau`, `fonctionGraphique`
    échelle d'une carte               `echelle` (3 variantes)
    repérage, abscisse/ordonnée       `reperage`, `repere3d`, `number_line`
    reconnaître un solide, patrons    `solide_3d` (7 solides), `section_solide`
    ratio, partage d'une quantité     `schema_barre`, `tableau_proportionnalite`
    fréquence ↔ probabilité           `probabilites`, `arbre_proba`
    triangle (angles, cas d'égalité)  `triangle`, `droites` (marques d'angles)
    agrandissement / homothétie       `transformation` (l'homothétie y est)

⚠️ ET LE PIÈGE QUI A COÛTÉ TROIS PASSES SUR LES FICHES DE 4ᵉ : beaucoup de
canvas dessinent sur des POINTS FIXES. Réduire leur `size` ne met pas à
l'échelle, ça ROGNE — et c'est invisible au typecheck. Resserrer les POINTS,
jamais le cadre. Concernés : `triangle`, `quadrilatere`, `thales`,
`transformation`, `solide_3d`, `fonctionGraphique`. L'étalon de helper :
`questionBank/seconde/maths/reels-intervalles.bank.ts`, un helper par canvas en
tête de fichier, `size` choisie et non subie.

════ ⭐ LA POSITION DE LA BONNE RÉPONSE : VÉRIFIÉE, ELLE EST JUSTE ══
Mesuré le 27/08 parce que la question s'est posée. ⛔ NE PAS LA REPOSER, et
surtout ne pas « corriger » l'ordre dans les fichiers source :

  · dans la SOURCE, 87 % des QCM figés ont la bonne réponse en 1ʳᵉ ligne ;
  · à l'AFFICHAGE, `shuffleChoices` (`questionPairBuilder.ts`) remélange chaque
    item — figé comme généré — avec une graine par question.

    npx --yes tsx@4 scripts/verifier-propositions-qcm.ts --matiere maths 4e
    → 24.5 % · 25.2 % · 25.0 % · 25.3 %   sur 23 580 tirages, max 1.9σ

⚠️ `verifier-devinabilite-runtime.ts` affiche, lui, un rang 4 à 21 % : c'est un
ARTEFACT connu, pas un défaut. Il ne peuple les rangs 3 et 4 qu'avec les tirages
à QUATRE lignes, et la banque mélange des QCM à 2, 3 et 4 lignes (83 · 5 · 393).
⭐ Deux, trois ou quatre propositions sont toutes légitimes — quatre est un
maximum, jamais une norme.

⛔ CE QUI RESTE VRAI À CORRIGER : 28 items de 4ᵉ dont la bonne réponse dépasse
le plus long leurre de 8 caractères ou plus (jusqu'à +17 sur
`proba_equiprobabilite_fixed_4`). On ALLONGE les leurres, on ne raccourcit pas
la réponse — et un leurre allongé peut devenir VRAI : relire l'en-tête du pool.

════ PAR OÙ COMMENCER ═══════════════════════════════════════════════
✅ FAIT LE 27/08 — `bo-objectifs.ts` est écrit, `verifier-bo.ts` a gagné la 4ᵉ,
et le 1 est entré dans les carrés parfaits. Le prochain trou est désormais
impossible à rater.

⭐⭐ NOTION 1 — « PUISSANCES ET NOTATION SCIENTIFIQUE », VALIDÉE PAR FRÉDÉRIC
LE 27/08. ⛔ Ne pas la rediscuter : les sept micros sont arrêtées, dans cet
ordre, et le découpage a sa raison.

    micro                             ce que l'élève fait
    ───────────────────────────────────────────────────────────────────────
    puissance_comprendre              lire 5⁴ = 5×5×5×5 ; a¹ = a ; a⁰ = 1
    puissance_calculer                exposant positif ⚠️ piège (−2)³ vs −2³
    puissance_exposant_negatif        10⁻³ = 1/10³
    puissance_dix                     10ⁿ et 10⁻ⁿ, multiplier et diviser par
    puissance_notation_scientifique   a × 10ⁿ avec 1 ⩽ a < 10
    puissance_comparer                comparer et ranger en écriture scientifique
    puissance_calcul                  calculs simples mêlant les deux
    puissance_defi                    le bloc de défis

⭐ POURQUOI SEPT ET NON LES SIX DE LA 3ᵉ — c'est l'argument de Frédéric, et il
vaut pour toutes les notions à venir : « en mode complet on peut RESTER SUR LA
MICRO ». Un découpage plus fin ne disperse donc pas l'élève, il lui donne un
grain de travail plus précis. Et le BO de 4ᵉ ajoute l'exposant négatif comme
connaissance à part entière (« exposants entiers, positifs OU NÉGATIFS »).

⛔ CE QUI RESTE DEHORS, ET NE DOIT PAS Y ENTRER :
  · les FORMULES a^m × a^n = a^(m+n) et les quotients de même base → 3ᵉ. Le BO :
    elles « résultent de l'application de la définition plutôt que de celle
    d'une formule ». En 4ᵉ on redescend à la définition, on n'apprend pas la règle.
  · les PRÉFIXES nano→giga et les ORDRES DE GRANDEUR → ce n'est pas le même
    objet. Une puissance est une ÉCRITURE, un ordre de grandeur est une MESURE.
    ⭐ Ils feront la NOTION 2, « Ordres de grandeur », 3 micros + défi : préfixes,
    associer un ordre de grandeur à un objet, vérifier la vraisemblance d'un
    résultat. Elle ferme à elle seule trois autres puces, dont 4e-A-calcul-5
    (« Vérifier la vraisemblance d'un résultat ») qui est un trou séparé.

Puces de `bo-objectifs.ts` que la notion 1 ferme : 4e-A-calcul-2, 4e-A-calcul-3,
4e-A-calcul-6, 4e-A-nombres-6, 4e-A-comparaisons-3.
Puces que la notion 2 fermera : 4e-A-nombres-5, 4e-A-comparaisons-5, 4e-A-calcul-5.

════ ⭐⭐ NOTION 3 — SCINDER `stat_statistique`, VALIDÉE LE 27/08 ════
⛔ Ne pas la rediscuter, et ⛔ NE PAS LA FAIRE PASSER DEVANT LES PUISSANCES :
à moitié faite, elle casse les vérificateurs (une micro sans item, une notion
sans fiche). C'est un chantier de notion entier, pas un renommage.

`stat_statistique` porte DIX micros et c'est DEUX objets. La coupure est dans
les prérequis — aucun micro d'indicateur n'est prérequis d'un micro de lecture,
donc elle est à SENS UNIQUE — et c'est celle du BO lui-même, qui énumère
séparément « effectifs, fréquences » et « indicateurs de position et de
dispersion ».

    notion                   micros                                    n
    ─────────────────────────────────────────────────────────────────────
    stat_statistique         moyenne · médiane · étendue ·             6
    (GARDE son id)           interpréter · problème · défi
    stat_donnees             lire_tableau · lire_graphique ·           5
    (NEUVE)                  effectif · fréquence · stat_donnees_defi

⛔ POURQUOI L'ID RESTE SUR LES INDICATEURS, et ce n'est pas négociable :
  · `lib/fiches/registre.ts` porte l'URL INDEXÉE `maths/4e/stat-statistique`
    — sans 301 on la perd, et le rendez-vous du 26/09 se joue là-dessus ;
  · `lib/matrice/coach.ts` (l. 121-122) associe `stat_statistique` à la 5ᵉ, à
    la 4ᵉ ET à la 3ᵉ : changer l'id casserait aussi les deux autres classes ;
  · `lib/eval-nationale/4e-maths.ts` le cite.
  ⭐ Et le mot tranche : « statistiques » nomme les INDICATEURS, pas la lecture
  d'un tableau. La 6ᵉ a déjà `stat_donnee` dans `coach.ts` — le vocabulaire
  existe une classe plus bas.

L'ORDRE DES OPÉRATIONS, et aucune étape ne se saute :
 1. `microSkills.ts` — basculer le `notionId` des QUATRE micros de lecture vers
    `stat_donnees`, et AJOUTER `stat_donnees_defi`. On passe à 137 micros.
 2. `notions.ts` — créer `stat_donnees` (boId `BO4D1`, `prerequis: []`), et
    donner à `stat_statistique` `prerequis: ["stat_donnees"]`. ⚠️ Sens unique :
    jamais l'inverse, sinon cycle.
 3. `statistiques.bank.ts` — basculer le `notionId` des items concernés, et
    ÉCRIRE les items de `stat_donnees_defi`. ⛔ Deux items distincts minimum
    (le mode complet oppose deux questions), et un GÉNÉRATEUR, pas du figé :
    dix énoncés distincts, seuil de `verifier-variete`.
 4. `bo-objectifs.ts` — accrocher `stat_donnees_defi`, sinon le vérificateur le
    déclare hors programme, et il a raison.
 5. Les SEPT vérificateurs.
 6. Seulement ensuite la FICHE de `stat_donnees` : fiche neuve, URL neuve, donc
    pas de 301 à poser — mais registre + page + PDF, et la parité 21/21.
    ⚠️ `verifier-micros` exige que les 137 micros aient un bloc : la fiche
    `stat-statistique` garde les siens, la neuve prend les cinq autres.

⚠️ LA 5ᵉ ET LA 3ᵉ ont 8 micros sur la même notion, avec la même ligne de
fracture. La continuité verticale voudra le même découpage — mais c'est une
décision par classe, et d'autres sessions y travaillent : ne pas la prendre ici.

Ordre proposé, du plus sûr au plus incertain :

 1. PUISSANCES et notation scientifique — la valeur sûre : elles restent en 4ᵉ
    dans les deux programmes, la banque de 3ᵉ est solide (59 items) et elles
    ferment d'un coup six puces du thème A (puissances, notation scientifique,
    préfixes nano→giga, ordres de grandeur, calculs avec puissances,
    comparaison en écriture scientifique).
 2. LES PETITS TROUS QUI SE GREFFENT SUR DES NOTIONS EXISTANTES — les moins
    chers du lot : quelques micros et des énoncés, pas une fiche entière.
      · le RATIO et le partage selon un ratio      → `prop_proportionnalite`
      · l'ÉCHELLE et l'agrandissement-réduction    → `prop_proportionnalite`
        (⭐ la 6ᵉ a `prop_echelle` en modèle)
      · GRANDEUR PRODUIT / QUOTIENT et cohérence
        des unités                                 → `aire_surface`, `volume_solide`
      · le lien FRÉQUENCE ↔ PROBABILITÉ            → `proba_experience`
        (⭐ la 6ᵉ a `proba_frequence` en modèle)
      · la RACINE CARRÉE hors géométrie (x² = a)   → `equation_resolution`
 3. FONCTIONS — attendu absent en entier, gros morceau. ⚠️ Calibrer sur les
    repères : pas de f(x), pas de linéaire ni d'affine. Dépendance de deux
    grandeurs par tableau, graphique et PROGRAMME DE CALCUL.
 4. GÉOMÉTRIE DU TRIANGLE — une notion `triangle` à créer, qui ferme cinq puces
    d'un coup : somme des angles, hauteurs et médiatrices, inégalité
    triangulaire, CAS D'ÉGALITÉ, triangles semblables. ⭐ Les angles alternes
    internes viennent avec, puisque le BO en fait l'outil de la démonstration.
 5. REPÉRAGE (abscisse, ordonnée, altitude ; latitude, longitude ; solides et
    patrons) — ⛔ corriger d'abord les deux gabarits de translation.
 6. ARITHMÉTIQUE (divisibilité, premiers) — en dernier : elle ne sert la 4ᵉ
    qu'un an avant de passer en 3ᵉ, et la banque de 3ᵉ est trop maigre pour
    servir de modèle.

════ CE QU'IL NE FAUT PAS FAIRE ═════════════════════════════════════
⛔ Écrire une fiche avant que la banque de sa notion soit verte.
⛔ Estimer le pourcentage de couverture à la main : lancer `verifier-bo.ts`.
⛔ Extraire le PDF du BO automatiquement (voir plus haut : ça ment en silence).
⛔ Faire descendre de la 3ᵉ ce que le BO y garde.
⛔ Reformuler un intitulé du BO.
⛔ Accrocher à un objectif une micro « qui s'en rapproche » pour éteindre le
   rouge : c'est remettre le mensonge dans le fichier censé l'empêcher.
⛔ Toucher au reste du coach de 4ᵉ : « le reste du coach 4eme on ne touche pas ».
⛔ Le français, l'écran d'accueil, les fiches de CM2 : d'autres s'en chargent.
⛔ Changer les URL des fiches existantes : sans 301 on perd l'indexation, et le
   rendez-vous du 26/09 se joue là-dessus.

════ LES RÈGLES DU DÉPÔT À PLUSIEURS SESSIONS ═══════════════════════
• ⛔⛔ TROIS SESSIONS TOURNENT EN MÊME TEMPS DANS CE DOSSIER (27/08) : maths,
  français, et les cartes de l'écran d'accueil.
• git commit -F message.txt -- <fichiers>  ⭐ TOUJOURS par chemin.
  ⛔ ET LA PARADE PAR CHEMIN A UN TROU : `git commit -- <fichier>` committe
  l'ÉTAT COMPLET du fichier, pas mes lignes. Sur un fichier partagé, je
  committe le travail en cours d'une autre session sous mon message. Constaté
  le 27/08 : `registre.ts` portait cinq lignes non committées du français
  (`francais/5e/lecture-apprecier`). Et `git add -p` n'est pas disponible.
  👉 AVANT de committer un fichier partagé : `git diff -- <fichier>`, et
  vérifier que TOUT ce qu'il contient est à moi. Sinon, ne pas le committer :
  laisser la ligne dans l'arbre et attendre que l'autre session pousse.
  LES FICHIERS CONCERNÉS : `lib/fiches/registre.ts`, `lib/matrice/coach.ts`,
  `lib/matrice/notions.generated.ts`, `lib/tutor-v4/apercus.generated.ts`,
  `app/tutor-v4/TutorSimpleView.tsx`, `scripts/capturer-apercus-coach.ts`.
  ⭐ `knowledge/maths/4e/*` et `questionBank/4e/maths/*` sont à moi seul.
• ⛔ Jamais --amend, reset --hard, checkout -- .
• Le SITEMAP est génératif : une ligne au registre suffit.
• Parité avant push :
      git show HEAD:lib/fiches/registre.ts | grep -c '"maths/4e/'
      git ls-files app/fiches-cours/maths/4e/ \
        | grep -v '^app/fiches-cours/maths/4e/page.tsx$' | grep -c '/page.tsx$'
  20 et 20 au 27/08.
• Serveur `eleveai-2`. ⚠️ Quand build:fiches-pdf expire, LIRE LES LOGS avant de
  relancer : une dégradation ordinaire se soigne par une relance, un cache
  `.next-2` corrompu (« Unexpected end of JSON input », page vide) exige
  `rm -rf .next-2`.
• Rendre compte en notions TERMINÉES ET VÉRIFIÉES, banque comprise.

════ LA CIBLE ═══════════════════════════════════════════════════════
    53 % → 100 %   des 111 objectifs, mesuré par verifier-bo.ts
    20 notions → 24-25
    et zéro trou non assumé : un `micros: []` qui reste doit porter une NOTE
    qui dit pourquoi il reste.
```
