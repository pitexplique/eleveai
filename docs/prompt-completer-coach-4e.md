# Prompt — compléter le coach de 4ᵉ : les 25 % qui manquent

> Écrit le 27/08/2026 par la session qui a terminé les 20 fiches de 4ᵉ.
> **Autonome.** (`docs/*` est ignoré par git : ajouter avec `git add -f`.)

```
Tu travailles sur eleveai (C:\Users\FRED\Documents\eleveai).
Tu es la session MATHS 4e. D'autres sessions travaillent dans le même dossier.

⭐ COMMENCER PAR : git pull, puis LIRE docs/passation-maths-4e.md EN ENTIER.
   Elle contient toutes les règles de dessin, de mesure et de dépôt. Celle-ci ne
   les redit pas — elle ne parle que de ce qui MANQUE au coach.

════ OÙ ON EN EST, ET CE QUE VAUT LE « 75 % » ═══════════════════════
maths 4e   20 notions · 136 micros · 20 fiches · 20 PDF   ·   tout est poussé

Les 20 notions ont toutes leur fiche, et les six vérificateurs du coach passent
(validité ✅, générateurs ✅, variété ✅ médiane 310 minimum 11, devinabilité ✅,
canvas ✅, couverture 136/136).

⛔ MAIS LE PROGRAMME N'EST PAS COUVERT. Le BO du cycle 4 porte DOUZE attendus de
fin de cycle. Mesuré objectif par objectif contre les 20 notions du coach :

    8 attendus couverts       calcul littéral · données · probabilités ·
                              proportionnalité · grandeurs mesurables ·
                              transformations · géométrie plane · programme
    2 attendus PARTIELS       « Utiliser les nombres… » (manquent puissances,
                              notation scientifique et racine carrée)
                              « Représenter l'espace » (manque le repérage
                              abscisse / ordonnée / altitude)
    2 attendus ABSENTS        « Comprendre et utiliser les notions de
                              divisibilité et de nombres premiers »
                              « Comprendre et utiliser la notion de fonction »

    8 + 2×0,5 = 9 sur 12  →  75 %.

⚠️ AUCUN VÉRIFICATEUR NE VOIT CE TROU, et c'est le point aveugle du dépôt : les
six comptent les items d'une micro EXISTANTE. Un trou n'a rien à compter, donc
il ne déclenche rien. C'est exactement ce qui était arrivé à la 6ᵉ (neuf
chapitres absents, zéro voyant rouge), et ce que `scripts/verifier-bo.ts` a
fermé — pour la 6ᵉ et le CM2 seulement. ⛔ La 4ᵉ n'a PAS de
`bo-objectifs.ts` : c'est pour ça que personne ne l'a vu.

════ CE QUE DIT LE BO, MOT POUR MOT ═════════════════════════════════
Source : « Annexe 3 — Programme du cycle des approfondissements (cycle 4) »,
mathématiques aux pages 126 à 136. C'est bien le programme APPLICABLE à la 4ᵉ en
2026-2027 : il est organisé par CYCLE en cinq thèmes A→E, avec Thalès et les
lignes trigonométriques dans le même cycle. Le nouveau programme, lui, est
organisé PAR ANNÉE et déplace Thalès et le cosinus en 3ᵉ — il ne concerne la 4ᵉ
qu'en septembre 2027.
⚠️ Cette datation se déduit de la STRUCTURE du document, pas d'une date : le
fichier ne porte ni arrêté ni mention de rentrée. À reconfirmer si un doute naît.

Les intitulés ci-dessous sont RECOPIÉS. Ne jamais les reformuler.

▸ PUISSANCES ET NOTATION SCIENTIFIQUE — thème A, p. 130-131
  Connaissances  : « Les préfixes de nano à giga. »
                   « Puissance[s d'exposants] positifs ou négatifs. »
                   « Notation scientifique. »
  Compétences    : « Effectuer des calculs numériques simples impliquant des
                     puissances, notamment en utilisant la notation scientifique. »
                   « Utiliser des puissances de 10 pour comparer des nombres. »
  Attendus de 4ᵉ (éduscol, p. 3) : « Il utilise les préfixes de nano à giga. »
  Exemples de réussite donnés : 3 900 000 000 = 3,9 × 10⁹ ·
                   3 microlitres = 3 × 10⁻⁶ litre · 7 mégamètres = 7 × 10⁶ mètres

▸ RACINE CARRÉE — thème A, p. 130-131
  Connaissances  : « Les carrés parfaits de 1 à 144. »
                   « Définition de la racine carrée. »
  Compétences    : « Utiliser la racine carrée pour résoudre des problèmes,
                     notamment géométriques. »
  Repères annuels : « La racine carrée est introduite, EN LIEN AVEC DES
                     SITUATIONS GÉOMÉTRIQUES (théorème de Pythagore, connaissance
                     des carrés parfaits de 1 à 144). »
  Attendus de 4ᵉ : encadrer entre deux entiers consécutifs « sans en chercher une
                   valeur approchée ».

▸ DIVISIBILITÉ ET NOMBRES PREMIERS — thème A, p. 131. C'est un ATTENDU DE FIN DE
  CYCLE à part entière, pas un détail.
  Connaissances  : « Multiples et diviseurs. » · « Critères de divisibilité par
                     2, 3, 5, 9. » · « Division euclidienne (quotient, reste). »
                   « liste des nombres premiers inférieurs ou égaux à 30. »
                   « Fractions irréductibles. »
  Compétences    : « Déterminer les nombres premiers inférieurs ou égaux à 100. »
                   « Simplifier une fraction pour la rendre irréductible. »
                   « Modéliser et résoudre des problèmes mettant en jeu la
                     divisibilité (engrenages, conjonction de phénomènes, etc.). »
  Attendus de 4ᵉ (p. 12) : « Il détermine la liste des nombres premiers
                   inférieurs à 100. » · « Il décompose un nombre entier en
                   produit de facteurs premiers. » Exemples : « Énumère tous les
                   nombres premiers compris entre 50 et 70 » · « décompose 780 ».
  ⚠️ Noter le passage de 30 (connaissance de cycle) à 100 (compétence de 4ᵉ).

▸ FONCTIONS — thème B, p. 133. Attendu : « Comprendre et utiliser la notion de
  fonction. »
  ⛔⛔ ET C'EST ICI QUE LE NIVEAU SE JOUE. Les connaissances listées au BO sont
  celles du CYCLE : « Vocabulaire : variable, fonction, antécédent, image »,
  « Notations f() et → f() », « Fonction linéaire, fonction affine ».
  MAIS les repères annuels tranchent, et c'est la SEULE phrase de tout le
  document à nommer une année explicitement :
        « La notation et le vocabulaire fonctionnels NE SONT PAS FORMALISÉS
          EN 4e. »
  Donc en 4ᵉ, et pas au-delà :
    « La dépendance de deux grandeurs est traduite par un tableau de valeurs,
      une formule, un graphique. Les représentations graphiques permettent de
      déterminer des images et des antécédents, qui sont interprétés en fonction
      du contexte. »
    Attendus de 4ᵉ (p. 26) : « Il produit une formule littérale représentant la
      dépendance de deux grandeurs. » · « Il représente la dépendance de deux
      grandeurs par un graphique. »
  ⛔ PAS de f(x). PAS de fonction linéaire ni affine. Ce sont des notions de 3ᵉ.

▸ REPÉRAGE DANS L'ESPACE — thème D, p. 135
  Connaissances  : « Abscisse, ordonnée, altitude. »
  Compétences    : « (Se) repérer … dans un parallélépipède rectangle. »
  Attendus de 4ᵉ (p. 30) : « Il utilise le vocabulaire du repérage : abscisse,
                   ordonnée, altitude. » · « Il se repère dans un pavé droit. »
                   Exemple : « Place le point de coordonnées (2 ; 3 ; 4) ».

⛔ UN POINT NON RÉSOLU, À NE PAS INVENTER : les CAS D'ÉGALITÉ DES TRIANGLES. Le
thème D liste cinq puces pour le triangle — somme des angles, hauteurs et
médiatrices, inégalité triangulaire, UNE PUCE DONT LE TEXTE EST ILLISIBLE dans
l'extraction, triangles semblables. La puce manquante est peut-être celle-là.
👉 Ouvrir le PDF à la page 135 et LIRE la puce à l'œil avant de décider. Ne rien
écrire sur ce point tant qu'on ne l'a pas lue.

════ ⭐⭐ LA BONNE NOUVELLE : LA 3ᵉ A DÉJÀ TOUT ══════════════════════
On ne part PAS de zéro. Le coach de 3ᵉ possède déjà ces notions, avec leurs
micros ET leurs banques, et sa validité passe (140 micros, 721 items fixes) :

    notion 3ᵉ                micros                       banque          items
    entier_puissance         6 (comprendre, calculer,     puissances       59
                                dix, écriture scientifique,  .bank.ts
                                calcul, défi)
    entier_racine_carree     5 (comprendre, carré parfait, racine_carree   47
                                calculer, encadrer, défi)    .bank.ts
    entier_arithmetique      6                            arithmetique     10  ⚠️
                                                             .bank.ts
    fonction_generalite      vocabulaire, image,          fonctions        61
                             antécédent, …                  .bank.ts

⭐ LE TRAVAIL EST DONC DE **DESCENDRE**, PAS D'INVENTER : reprendre la structure
de micros de la 3ᵉ, garder ce que le BO place en 4ᵉ, écarter ce qu'il garde pour
la 3ᵉ, et réécrire les énoncés au niveau. C'est infiniment plus sûr que
d'inventer une arborescence — et ça garantit la continuité verticale 4ᵉ → 3ᵉ,
qui est un objectif affiché de `knowledge/maths/4e/bo.ts`.

⚠️ CE QUI RESTE EN 3ᵉ, ET QU'IL NE FAUT PAS FAIRE DESCENDRE :
  · les propriétés algébriques des racines carrées (√a × √b, √(a/b)) ;
  · les formules générales sur les puissances (produits et quotients de même
    base) — le BO dit qu'elles « découlent de leur définition », elles ne sont
    pas un attendu de 4ᵉ ;
  · la notation f(x), le vocabulaire image/antécédent FORMALISÉ, les fonctions
    linéaires et affines ;
  · l'arithmétique au-delà de la décomposition en facteurs premiers et des
    fractions irréductibles.

⚠️ `arithmetique.bank.ts` de la 3ᵉ ne compte que DIX items : c'est la plus
maigre des quatre, et c'est justement la notion entièrement absente en 4ᵉ. Ne
pas la recopier telle quelle — elle ne passerait pas le seuil de variété.

════ ⛔ LA RÈGLE DE FRÉDÉRIC : BANQUE D'ABORD, FICHE ENSUITE ════════
« Une fiche sans banque ne s'allume pas dans le coach. »
Et son corollaire, appris sur la 6ᵉ le 27/08 : une fiche ne répare pas un coach
qui se répète — elle lui donne une belle façade. On n'écrit la fiche qu'une fois
la banque verte.

L'ORDRE DE TRAVAIL, pour CHAQUE notion :
 1. Lire le BO ci-dessus, et les micros de la notion sœur en 3ᵉ.
 2. Écrire les MICROS dans lib/tutor-v4/knowledge/maths/4e/microSkills.ts,
    et la NOTION dans notions.ts. ⚠️ Respecter la médiane de sept micros par
    notion — Frédéric : « une notion ne doit pas avoir 12 micro-compétences ».
 3. Écrire la BANQUE dans lib/tutor-v4/questionBank/4e/maths/<notion>.bank.ts,
    et la brancher dans index.ts.
 4. ⭐ FAIRE PASSER LES SIX VÉRIFICATEURS (voir ci-dessous) — pas cinq.
 5. Seulement ensuite : la fiche, la page, le registre, le PDF (passation 4ᵉ).

════ LES VÉRIFICATEURS, ET LEURS PIÈGES D'APPEL ═════════════════════
⚠️ Les `.mjs` de banque se lancent avec **tsx**, pas avec `node` seul — sinon ils
échouent sur la résolution des `.bank`. Et leur ordre d'arguments est
**<classe> <matière>**, l'INVERSE de `verifier-micros.mjs`. Les deux existent.

    node scripts/verifier-banque.mjs 4e maths          # validité + couverture
    node scripts/verifier-generateurs.mjs 4e maths     # un gabarit se contredit-il ?
    npx --yes tsx@4 scripts/verifier-variete.mjs 4e maths      # se répète-t-il ?
    npx --yes tsx@4 scripts/verifier-devinabilite.mjs 4e maths # gagne-t-on à la longueur ?
    npx --yes tsx@4 scripts/verifier-canvas.mjs 4e maths       # micro graphique sans figure ?
    node scripts/verifier-micros.mjs maths 4e          # ⚠️ ordre INVERSE

⭐ LE SEUIL QUI COMPTE EST CELUI DE LA VARIÉTÉ : dix énoncés distincts par micro.
Et il se gagne avec des **GÉNÉRATEURS**, pas avec des `fixed` : un `fixed` ne
compte que pour UN énoncé, un `template` pour autant qu'il sait fabriquer. Les
quatre micros de 6ᵉ trouvées sous le seuil le 27/08 étaient toutes « presque
intégralement fixed ». Viser la médiane du dépôt, qui est de 310.

⛔ ET DEUX PIÈGES DE BANQUE, PAYÉS EN VRAIES ERREURS :
  · `makeChoices` déduplique et coupe à trois distracteurs : un gabarit qui
    n'écrit que trois pièges n'a aucune réserve et tombe à trois choix.
  · Un QCM se gagne à la LONGUEUR quand la bonne réponse est la plus longue.
    Méthode : on ALLONGE les leurres, on ne raccourcit pas la réponse.
    ⚠️ Piège rencontré deux fois : allonger un leurre le rapproche de la vérité,
    et il peut devenir VRAI.

════ ⭐ ET TANT QU'À FAIRE : ÉCRIRE bo-objectifs.ts POUR LA 4ᵉ ═══════
C'est le fichier qui aurait signalé ces quatre trous tout seul, et il manque.
Modèle : lib/tutor-v4/knowledge/maths/6e/bo-objectifs.ts (46 Ko, format
`ObjectifBO` : id, domaine, chapitre, objectif RECOPIÉ, page, micros[]).
Vérificateur : `npx --yes tsx@4 scripts/verifier-bo.ts 4e`.

Il se lit dans les deux sens : un objectif sans micro est un TROU, une micro
sans objectif est du HORS-PROGRAMME à déclarer dans `microsHorsProgramme`.

⛔ LA RÈGLE DE CE FICHIER, ET ELLE EST DURE : « les intitulés sont RECOPIÉS,
jamais reformulés — le jour où le programme bouge, on compare deux textes, pas
deux souvenirs ». Et : « `micros: []` n'est pas un oubli, c'est un CONSTAT. Ne
jamais y mettre une micro qui s'en rapproche pour faire passer le vérificateur au
vert — ce serait remettre le mensonge dans le fichier censé l'empêcher. »
⚠️ Donc : ouvrir le PDF et recopier. Une extraction automatique perd les
formules (√, exposants, fractions) et quelques puces entières.

════ ⚠️ L'HORIZON 2027, ET CE QU'IL CHANGE À L'ORDRE D'INVESTISSEMENT ═
Il existe DEUX programmes, et on sait désormais les distinguer SANS chercher de
date — aucun des deux n'en porte. On les reconnaît à leur STRUCTURE :

  · « Annexe 3 — Programme du cycle des approfondissements (cycle 4) »
    → organisé par CYCLE, cinq thèmes A→E, Thalès et trigonométrie ensemble.
    → C'est le programme APPLICABLE à la 4ᵉ en 2026-2027. C'est LUI qui commande
      tout ce qui précède dans ce prompt.

  · « Annexe 2 — Programme de mathématiques pour le cycle 4 »
    → organisé PAR ANNÉE (Cinquième / Quatrième / Troisième), sections
      « Automatismes », orthographe rectifiée (« connaitre », « maitrise »),
      VECTEURS en 3ᵉ.
    → C'est le NOUVEAU programme. Il ne concerne la 4ᵉ qu'en SEPTEMBRE 2027.

⭐ CE QUE LE NOUVEAU DÉPLACE, ET POURQUOI ÇA COMPTE MAINTENANT :

    en 4ᵉ                    2026-2027        à partir de 2027
    puissances, racine carrée   ✅               ✅  (reste)
    MULTIPLES ET DIVISEURS      ✅               ⚠️ PASSE EN 3ᵉ
    Thalès, cosinus             ✅               ⛔ passent en 3ᵉ
    droite des milieux          —                ⭐ arrive en 4ᵉ
    volume pyramide et cône     —                ⭐ arrive en 4ᵉ
    fonctions                   dépendance,      ⚠️ réduit au PROGRAMME DE
                                tableau,            CALCUL : « appliquer un
                                formule,            programme de calcul à deux
                                graphique           étapes … retrouver le nombre
                                                    de départ ». Le vocabulaire
                                                    image / antécédent monte en 3ᵉ.

👉 CONSÉQUENCE PRATIQUE, à dire à Frédéric avant d'investir : la banque
d'ARITHMÉTIQUE (divisibilité, nombres premiers) ne servira la 4ᵉ QU'UN AN. En
2027 elle remonte en 3ᵉ. Ça ne l'annule pas — 2026-2027 est l'année qu'on sert,
et la 3ᵉ en héritera telle quelle — mais si l'on doit choisir par quoi commencer,
PUISSANCES et RACINE CARRÉE sont les deux valeurs sûres : elles restent en 4ᵉ
dans les deux programmes.

⭐ ET UNE BONNE NOUVELLE DÉJÀ ACQUISE. Le nouveau programme dit, pour « La pensée
informatique — Quatrième » : « Représenter des conditions simples. Écrire des
instructions conditionnelles. Manipuler une variable. Écrire un programme simple
donné pour réaliser un objectif ou résoudre un problème. Modifier un programme
donné pour changer son comportement. » C'est MOT POUR MOT les cinq micros de
`algo_programmation`, donc la fiche du 27/08 est déjà alignée sur 2027.

════ CE QU'IL NE FAUT PAS FAIRE ═════════════════════════════════════
⛔ Écrire une fiche avant que la banque de sa notion soit verte.
⛔ Faire descendre de la 3ᵉ ce que le BO y garde (f(x), linéaire, affine,
   propriétés algébriques des racines, formules générales des puissances).
⛔ Reformuler un intitulé du BO dans bo-objectifs.ts.
⛔ Toucher au reste du coach de 4ᵉ : « le reste du coach 4eme on ne touche pas ».
⛔ Le français, l'écran d'accueil, les fiches de CM2 : d'autres s'en chargent.
⛔ Changer les URL des fiches existantes : sans redirections 301, on perd
   l'indexation. Le rendez-vous du 26/09 se joue là-dessus.

════ LES RÈGLES DU DÉPÔT À PLUSIEURS SESSIONS ═══════════════════════
• git commit -F message.txt -- <fichiers>  ⭐ TOUJOURS par chemin.
  ⚠️ Et RELIRE LE DIFF d'un fichier partagé JUSTE AVANT de le committer : il a
  bougé trois fois sur trois câblages le 27/08.
• ⛔ Jamais --amend, reset --hard, checkout -- .
• Le SITEMAP est génératif depuis le 26/08 : une ligne au registre suffit.
• Contrôle de parité avant chaque push :
      git show HEAD:lib/fiches/registre.ts | grep -c '"maths/4e/'
      git ls-files app/fiches-cours/maths/4e/ \
        | grep -v '^app/fiches-cours/maths/4e/page.tsx$' | grep -c '/page.tsx$'
  Les deux nombres doivent être égaux — 20 et 20 au 27/08.
• Mon serveur est `eleveai-2`. ⚠️ Quand `build:fiches-pdf` expire, LIRE LES LOGS
  avant de relancer : une dégradation ordinaire se soigne par une relance, un
  cache `.next-2` corrompu (« SyntaxError: Unexpected end of JSON input », page
  vide) exige `rm -rf .next-2`.
• Rendre compte en notions TERMINÉES ET VÉRIFIÉES, banque comprise.

════ LA CIBLE ═══════════════════════════════════════════════════════
    20 notions → 24     (+ puissances, racine carrée, arithmétique, fonctions)
    75 % → 100 %        des douze attendus de fin de cycle
    et un bo-objectifs.ts qui rende le prochain trou IMPOSSIBLE à rater.
```
