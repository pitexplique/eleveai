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
    notions.ts. ⚠️ Médiane de sept micros — Frédéric : « une notion ne doit pas
    avoir 12 micro-compétences ».
 3. Écrire la BANQUE dans questionBank/4e/maths/<notion>.bank.ts, la brancher
    dans index.ts.
 4. ⭐ ACCROCHER les nouvelles micros aux objectifs dans `bo-objectifs.ts` —
    sinon `verifier-bo.ts` les déclare hors programme, et il a raison.
 5. FAIRE PASSER LES SEPT VÉRIFICATEURS — pas six.
 6. Seulement ensuite : fiche, page, registre, PDF (voir la passation).

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

════ PAR OÙ COMMENCER ═══════════════════════════════════════════════
✅ FAIT LE 27/08 — `bo-objectifs.ts` est écrit, et `verifier-bo.ts` a gagné la
4ᵉ. Le prochain trou est désormais impossible à rater.

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
• git commit -F message.txt -- <fichiers>  ⭐ TOUJOURS par chemin.
  ⚠️ RELIRE LE DIFF d'un fichier partagé JUSTE AVANT de committer : il a bougé
  trois fois sur trois câblages le 27/08.
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
