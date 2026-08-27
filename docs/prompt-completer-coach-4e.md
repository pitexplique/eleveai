# Prompt — compléter le coach de 4ᵉ contre le BO

> Réécrit le 27/08/2026 après avoir recopié le programme officiel EN ENTIER.
> **Autonome.** (`docs/*` est ignoré par git : ajouter avec `git add -f`.)
>
> ⚠️ Une première version de ce prompt annonçait « 75 % » et quatre trous. La
> lecture fidèle du BO en a fait apparaître **cinq de plus**. Les chiffres
> ci-dessous sont les bons.

```
Tu travailles sur eleveai (C:\Users\FRED\Documents\eleveai).
Tu es la session MATHS 4e. D'autres sessions travaillent dans le même dossier.

⭐ COMMENCER PAR, DANS CET ORDRE :
   1. git pull
   2. LIRE docs/bo-maths-cycle4-recopie.md — le programme officiel RECOPIÉ,
      les cinq thèmes, avec le détail de ce qui manque au coach.
   3. LIRE docs/passation-maths-4e.md — toutes les règles de dessin, de mesure
      et de dépôt. Ce prompt ne les redit pas.

════ OÙ ON EN EST ═══════════════════════════════════════════════════
maths 4e   20 notions · 136 micros · 20 fiches · 20 PDF   ·   tout est poussé

Les 20 notions ont toutes leur fiche, et les six vérificateurs du coach passent
(validité ✅, générateurs ✅, variété ✅ médiane 310 minimum 11, devinabilité ✅,
canvas ✅, couverture 136/136).

⛔ MAIS LE PROGRAMME N'EST PAS COUVERT, et c'est mesuré objectif par objectif
contre les DOUZE attendus de fin de cycle du BO :

    3 attendus couverts        calcul littéral · données · probabilités
    1 attendu couvert          programme (algorithmique)
    6 attendus PARTIELS        nombres · proportionnalité · grandeurs
                               mesurables · transformations · représenter
                               l'espace · géométrie plane pour démontrer
    2 attendus ABSENTS         divisibilité et nombres premiers · fonction

    4 complets + 6 partiels comptés pour moitié = 7 sur 12, soit ~60 %.

⚠️ LE POURCENTAGE VAUT MOINS QUE LA LISTE. Le voici, vérifié dans
`microSkills.ts` — zéro occurrence pour chacun :

    ce qui manque                                        attendu concerné
    ─────────────────────────────────────────────────────────────────────
    puissances, notation scientifique, nano→giga         nombres
    racine carrée, carrés parfaits de 1 à 144            nombres
    multiples, diviseurs, premiers, fraction irréductible divisibilité (ABSENT)
    notion de fonction (dépendance de deux grandeurs)    fonction (ABSENT)
    notion de ratio (notation 2 : 3)                     proportionnalité
    grandeur produit, grandeur quotient                  grandeurs mesurables
    agrandissement / réduction, échelle                  transformations
    abscisse, ordonnée, altitude ; latitude, longitude   représenter l'espace
    cas d'égalité des triangles                          géométrie plane

⭐ AUCUN VÉRIFICATEUR NE VOIT CES TROUS, et c'est le point aveugle du dépôt : les
six comptent les items d'une micro EXISTANTE. Un trou n'a rien à compter, donc il
ne déclenche rien. C'est ce que `scripts/verifier-bo.ts` ferme — pour la 6ᵉ et le
CM2 seulement. ⛔ La 4ᵉ n'a PAS de `bo-objectifs.ts`. C'est pour ça que personne
ne l'avait vu.

════ LE PROGRAMME EST DÉJÀ RECOPIÉ — NE PAS LE REFAIRE ══════════════
`docs/bo-maths-cycle4-recopie.md` contient les CINQ THÈMES, intitulés recopiés
mot pour mot depuis des captures d'écran lisibles, avec les pages.

Source : « Programme du cycle des approfondissements (cycle 4) », mathématiques
aux pages 126-137, pied de page officiel **« BOEN n° 31 du 30 juillet 2020 »**.
C'est le programme APPLICABLE à la 4ᵉ en 2026-2027.

⛔ NE PAS EXTRAIRE CE PDF AUTOMATIQUEMENT. Testé, et c'est un piège : les
extracteurs perdent les fragments à apostrophe SANS RIEN SIGNALER.
« Nombres décimaux (positifs et négatifs), notion d'opposé » devenait
« Nombres . » — et une puce entière du thème D, « cas d'égalité des triangles »,
disparaissait des DEUX PDF testés. C'est une capture d'écran qui l'a révélée.
👉 Pour tout complément : capture d'écran, jamais extraction.

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

👉 CONSÉQUENCE : PUISSANCES et RACINE CARRÉE sont les deux valeurs sûres — elles
restent en 4ᵉ dans les deux programmes. L'arithmétique ne servira la 4ᵉ qu'un an,
puis la 3ᵉ en héritera. Commencer par les valeurs sûres.

⭐ Et une confirmation déjà acquise : « La pensée informatique — Quatrième » du
nouveau programme énonce MOT POUR MOT les cinq micros de `algo_programmation`.
La fiche du 27/08 est déjà alignée sur 2027.

════ ⭐⭐ LA BONNE NOUVELLE : LA 3ᵉ A DÉJÀ TOUT ══════════════════════
On ne part PAS de zéro. Le coach de 3ᵉ possède ces notions avec leurs micros ET
leurs banques, et sa validité passe (140 micros, 721 items fixes) :

    notion 3ᵉ                micros   banque                items
    entier_puissance            6      puissances.bank.ts     59
    entier_racine_carree        5      racine_carree.bank.ts  47
    entier_arithmetique         6      arithmetique.bank.ts   10  ⚠️
    fonction_generalite         …      fonctions.bank.ts      61

⭐ LE TRAVAIL EST DONC DE **DESCENDRE**, PAS D'INVENTER : reprendre la structure
de micros de la 3ᵉ, garder ce que le BO place en 4ᵉ, écarter ce qu'il garde pour
la 3ᵉ, réécrire les énoncés au niveau. Ça garantit en prime la continuité
verticale 4ᵉ → 3ᵉ, objectif affiché de `knowledge/maths/4e/bo.ts`.

⚠️ CE QUI RESTE EN 3ᵉ, ET NE DOIT PAS DESCENDRE :
  · les propriétés algébriques des racines (√a × √b, √(a/b)) ;
  · les formules générales sur les puissances (produits et quotients de même
    base) — le BO dit qu'elles « résultent de l'application de la définition
    plutôt que de celle d'une formule » ;
  · la notation f(x) et x ↦ f(x), les fonctions linéaires et affines.
    ⭐ Les repères annuels sont formels, et c'est la SEULE phrase du document à
    nommer une année : « La notation et le vocabulaire fonctionnels NE SONT PAS
    FORMALISÉS EN 4e. » En 4ᵉ : dépendance de deux grandeurs par tableau,
    formule et graphique, lecture d'images et d'antécédents. Rien de plus.

⚠️ `arithmetique.bank.ts` de la 3ᵉ ne compte que DIX items : la plus maigre des
quatre, et justement la notion entièrement absente en 4ᵉ. Ne pas la recopier
telle quelle, elle ne passerait pas le seuil de variété.

════ ⛔ BANQUE D'ABORD, FICHE ENSUITE ═══════════════════════════════
Frédéric : « une fiche sans banque ne s'allume pas dans le coach ».
Corollaire appris sur la 6ᵉ : une fiche ne répare pas un coach qui se répète —
elle lui donne une belle façade.

POUR CHAQUE NOTION :
 1. Lire son entrée dans `docs/bo-maths-cycle4-recopie.md`, puis les micros de la
    notion sœur en 3ᵉ.
 2. Écrire les MICROS dans knowledge/maths/4e/microSkills.ts et la NOTION dans
    notions.ts. ⚠️ Médiane de sept micros — Frédéric : « une notion ne doit pas
    avoir 12 micro-compétences ».
 3. Écrire la BANQUE dans questionBank/4e/maths/<notion>.bank.ts, la brancher
    dans index.ts.
 4. FAIRE PASSER LES SIX VÉRIFICATEURS — pas cinq.
 5. Seulement ensuite : fiche, page, registre, PDF (voir la passation).

⚠️ Les `.mjs` de banque se lancent avec **tsx**, et leur ordre d'arguments est
**<classe> <matière>** — l'INVERSE de `verifier-micros.mjs` :

    node scripts/verifier-banque.mjs 4e maths
    node scripts/verifier-generateurs.mjs 4e maths
    npx --yes tsx@4 scripts/verifier-variete.mjs 4e maths
    npx --yes tsx@4 scripts/verifier-devinabilite.mjs 4e maths
    npx --yes tsx@4 scripts/verifier-canvas.mjs 4e maths
    node scripts/verifier-micros.mjs maths 4e        # ⚠️ ordre INVERSE

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

════ ⭐ ET ÉCRIRE bo-objectifs.ts POUR LA 4ᵉ ════════════════════════
C'est le fichier qui aurait signalé ces neuf trous tout seul.
Modèle : knowledge/maths/6e/bo-objectifs.ts (format `ObjectifBO` : id, domaine,
chapitre, objectif RECOPIÉ, page, micros[]).
Vérificateur : `npx --yes tsx@4 scripts/verifier-bo.ts 4e`.

⭐ LA MATIÈRE PREMIÈRE EST DÉJÀ LÀ : `docs/bo-maths-cycle4-recopie.md`. Il suffit
de la transposer au format, en citant les pages 126-137.

⛔ SA RÈGLE, ET ELLE EST DURE : « les intitulés sont RECOPIÉS, jamais reformulés
— le jour où le programme bouge, on compare deux textes, pas deux souvenirs. »
Et : « `micros: []` n'est pas un oubli, c'est un CONSTAT. Ne jamais y mettre une
micro qui s'en rapproche pour faire passer le vérificateur au vert — ce serait
remettre le mensonge dans le fichier censé l'empêcher. »

════ PAR OÙ COMMENCER ═══════════════════════════════════════════════
Ordre proposé, du plus sûr au plus incertain :

 1. `bo-objectifs.ts` — une heure, zéro risque, et il rend tout le reste
    mesurable. Le prochain trou deviendra impossible à rater.
 2. PUISSANCES puis RACINE CARRÉE — valeurs sûres dans les deux programmes,
    banques de 3ᵉ solides (59 et 47 items) à descendre.
 3. FONCTIONS — absent, et gros attendu. ⚠️ Calibrer sur les repères : pas de
    f(x) en 4ᵉ.
 4. Les petits trous qui se greffent sur des notions EXISTANTES, donc sans
    créer de notion : le RATIO dans `prop_proportionnalite`, les GRANDEURS
    PRODUIT/QUOTIENT dans `aire_*`/`volume_solide`, l'AGRANDISSEMENT-RÉDUCTION
    dans `sym_transformation`, le REPÉRAGE (abscisse, ordonnée, altitude) dans
    `volume_solide`, les CAS D'ÉGALITÉ dans `quadrilatere_parallelogramme` ou
    une notion « triangle » à créer. ⭐ Ceux-là sont les moins chers : quelques
    micros et des énoncés, pas une fiche entière.
 5. ARITHMÉTIQUE (divisibilité, premiers) — en dernier : elle ne sert la 4ᵉ
    qu'un an avant de passer en 3ᵉ, et la banque de 3ᵉ est trop maigre pour
    servir de modèle.

════ CE QU'IL NE FAUT PAS FAIRE ═════════════════════════════════════
⛔ Écrire une fiche avant que la banque de sa notion soit verte.
⛔ Extraire le PDF du BO automatiquement (voir plus haut : ça ment en silence).
⛔ Faire descendre de la 3ᵉ ce que le BO y garde.
⛔ Reformuler un intitulé du BO.
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
    ~60 % → 100 %   des douze attendus de fin de cycle
    20 notions → 23-24
    et un bo-objectifs.ts qui rende le prochain trou IMPOSSIBLE à rater.
```
