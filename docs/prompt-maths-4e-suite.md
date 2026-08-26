# Prompt — finir la 4ᵉ maths : les neuf fiches qui restent

> Écrit le 26/08/2026 par la session qui a écrit les onze premières. **Autonome.**
> (`docs/*` est ignoré par git : ajouter avec `git add -f`.)

```
Tu travailles sur eleveai (C:\Users\FRED\Documents\eleveai).
Tu es la session MATHS 4e. Deux autres sessions travaillent dans le même dossier.

⭐ COMMENCER PAR : git pull, puis LIRE docs/passation-maths-4e.md EN ENTIER.
   Elle contient les règles apprises en mesurant — elles ont coûté six passes de
   mesure à découvrir, et elles font gagner une fiche sur deux.

════ OÙ ON EN EST ═══════════════════════════════════════════════════
maths 4e   12 fiches sur 20   ·   micros 85/85   ·   12 PDF   ·   tout est POUSSÉ

⚠️ VINGT et non dix-neuf : les fractions ont été scindées en deux le 26/08
(fraction_nombre, 5 micros · fraction_calcul, 7 micros), parce que la notion en
portait douze contre une médiane de sept. Frédéric : « une notion ne doit pas
avoir 12 micro-compétences ». Le découpage suit la ligne de fracture déjà
présente dans les prérequis, et il copie celui de la 5e.
⚠️ stat_statistique en a dix et RESTE en l'état : « ça me parait cohérent ».
Le seuil n'est donc pas mécanique — demander avant de scinder autre chose.

FAIT (12) : pythagore-theoreme · thales-theoreme · trigo-cosinus ·
quadrilatere-parallelogramme · sym-transformation · stat-statistique ·
proba-experience · relatif-operation · fraction-nombre · fraction-calcul ·
prop-proportionnalite · litteral-expression

RESTE (8) :
  ⭐ LA SUITE DU BLOC ALGÈBRE, à écrire dans cet ordre : litteral_distributivite
     → litteral_identite_remarquable → litteral_factorisation →
     equation_resolution. Elles partagent le vocabulaire posé par
     `litteral-expression` (la lettre, le coefficient, le terme constant, les
     termes semblables) : LIRE SON EN-TÊTE AVANT, et ne pas le redéfinir.
     ⭐ Et elles partagent ses canvas : `algebre` pour l'inconnue rendue
     concrète, `calcul_pose`, `tableau_donnees`. La distributivité se dessine
     naturellement en `figure_libre` — l'aire d'un rectangle découpé en deux.
  · aire_perimetre · aire_surface · volume_solide  (grandeurs et espace ;
    `figure_libre` pour les aires, `solide_3d` pour les volumes — ⛔ ce dernier
    ne se laisse pas rétrécir, la seule commande est la POLICE)
  · algo_programmation                              (le canvas `scratch`)

════ LA RÈGLE QUE FRÉDÉRIC A POSÉE LE 26/08 ═════════════════════════
« AVANT DE FAIRE LA FICHE IL FAUT BIEN LIRE LES MICRO ID DES NOTIONS. »

Dite après une vraie erreur : un ARBRE DE PROBABILITÉS avait été mis dans la
fiche de 4e. Il n'y est pas au programme — et la banque le disait déjà, les huit
énoncés de `proba_defi` ne parlant que de l'événement contraire.

Donc, avant d'écrire une ligne, dans cet ordre :
 1. lire TOUS les microId de la notion dans
    lib/tutor-v4/knowledge/maths/4e/microSkills.ts ;
 2. lire les ÉNONCÉS RÉELS dans la banque, surtout pour les micros nommées
    `*_defi` ou `*_probleme` — leur nom ne dit pas leur contenu ;
 3. relever LES NOMBRES : ceux de la fiche doivent être ceux de la banque ;
 4. en cas de doute sur le niveau, ouvrir les attendus de fin d'année de 4e
    (eduscol), pas le programme de cycle qui ne dit pas quelle année.

⭐ LE DÉFI DE LA BANQUE FAIT SOUVENT LE MEILLEUR CONTRE-EXEMPLE. Sur les onze
fiches écrites, c'est vrai six fois : le triangle 4-5-6 qui n'est pas rectangle,
la roue à secteurs inégaux, le trapèze qui est penché sans en être un, « 1/2 +
1/3 = 2/5 », « si 2 → 6 alors 5 → 9 car j'ajoute 3 ». Chercher ce défi d'abord.

════ CE QUI A CHANGÉ DANS LE RENDU, ET QU'IL FAUT SAVOIR ════════════
⭐ LES FICHES RENDENT LE LATEX depuis le 26/08 :
components/fiches/TexteMath.tsx est branché sur les 23 points d'affichage de
FicheCoursClient. On écrit donc $\\frac{2}{3}$ et non « 2/3 ».
Il est l'IDENTITÉ sur un texte sans $ — les 109 fiches antérieures ne bougent pas.

⛔ TROIS ENDROITS NE RENDENT PAS LE LATEX :
  · les libellés À L'INTÉRIEUR d'un canvas (label, total, values, caption,
    questionLabel) — tracés en <text> SVG ;
  · les DIAPOS DU MODE CLASSE (ClasseSlide[]) — ModeClasse.tsx n'a aucun KaTeX,
    le code serait projeté en clair au tableau devant les élèves ;
  · une légende sous un dessin, sauf si le helper `legende()` de la fiche passe
    lui-même par TexteMath (les fiches récentes le font).

⚠️ DEUX ANTISLASHS DANS LE SOURCE : $\\frac{…}$. Avec un seul, « \t » est la
tabulation et « \d » perd son antislash — l'écran affiche « imes » et « div ».
INVISIBLE AU TYPECHECK. Ça se voit en comptant les .katex-error dans la page.

⭐ ET LE PDF SUIT : KaTeX_Main-Regular est embarquée dans le fichier
téléchargeable, vérifié en listant ses /BaseFont.

════ LES PIÈGES DE DESSIN, TOUS MESURÉS ═════════════════════════════
1. LES CANVAS À POINTS FIXES ne se laissent pas rétrécir : réduire leur `size`
   ROGNE au lieu de mettre à l'échelle, sans rien casser ni faire baisser la
   police. Concernés : triangle, quadrilatere, thales, transformation, solide_3d,
   fonctionGraphique. ⭐ On resserre les POINTS, pas le cadre.
2. LES TROIS LARGEURS DE BLOC, mesurées sur un téléphone de 375 px :
   carte de propriété 222 px · bloc « La formule » 216 px · exemple 200 px.
   D'où des viewBox de 228 et 208, jamais 340.
3. ⭐ UN DESSIN RÉUTILISÉ DANS DEUX BLOCS DOIT ÊTRE UNE FONCTION qui prend le
   bloc. Rencontré deux fois : la même constante posée dans une carte ET dans un
   exemple tombait à 10,6 px dans le second.
4. schema_barre pose ses étiquettes de parts à 144 px DU HAUT et sa phrase à
   18 px DU BAS : viser 200 de hauteur. Ce défaut ne se voit QU'EN 1280.
5. fraction en mode `compare` pose l'étiquette de la 2e fraction à une hauteur
   indépendante de la size : viser 200 aussi.
6. Une ÉTIQUETTE DE POINT est centrée sur sa valeur : un mot posé sur le minimum
   d'une number_line sort du cadre. Les mots vont dans la légende.
7. Le libellé d'un VECTEUR se compte en caractères, comme la phrase du bas.
8. ⛔ `algebre` N'A PAS DE CHAMP `size`, seul canvas du catalogue dans ce cas, et
   il rend en HTML et non en SVG. On ne peut rien régler — seulement mesurer. Ses
   étiquettes de thème (« score inconnu », « niveau ») sont en 10 px FIXES, donc
   10 px sur tous les écrans. C'est le style du composant, partagé avec le coach :
   signalé, pas touché. ⚠️ Le mesureur de console ne les voit pas : il ne lit que
   les `<text>` des SVG. Pour ce canvas, contrôler à l'œil.

════ ⛔ CE QUI A FAILLI PUBLIER UN 404, ET LA RÈGLE QUI EN SORT ═════
Le 26/08, la session de français a commité `registre.ts` et `sitemap.ts` en
emportant sans le vouloir quatre lignes de maths : entre sa vérification du diff
et son `git add`, la session maths avait écrit dans les mêmes fichiers. `git add`
prend le fichier tel qu'il est À CET INSTANT, pas tel qu'on l'a lu.

Résultat : le tip de `main` déclarait la route `maths/4e/litteral-expression`
alors que ni la fiche ni la page n'étaient encore suivies. Pousser aurait publié
une entrée de hub menant à un 404 et une URL morte au sitemap.

⭐ LA RÈGLE : COMMITER LA FICHE ET SA PAGE **AVANT** LE CÂBLAGE, jamais l'inverse.
Une route déclarée sans fichier casse le site ; un fichier sans route ne fait
qu'attendre. Et contrôler avant de pousser :
    git show HEAD:lib/fiches/registre.ts | grep -c '"maths/4e/'
    git ls-files app/fiches-cours/maths/4e/ | wc -l
Les deux nombres doivent être égaux.

════ LA BOUCLE, FICHE PAR FICHE ═════════════════════════════════════
1. Lire les micros ET leurs énoncés (voir plus haut).
2. Écrire lib/fiches/maths-4e-<notion>.tsx + la page mince.
3. Registre + sitemap (⚠️ voir le point en suspens ci-dessous).
4. npx tsc --noEmit  puis  node scripts/verifier-micros.mjs maths 4e
5. RENDRE ET MESURER en 375 ET en 1280 — le mesureur de console est dans la
   passation, et il compte aussi les .katex-error.
6. npm run build:fiches-pdf, puis commit PAR CHEMIN.

⚠️ Le serveur de dev se dégrade toutes les heures : 404 sur des routes qui
existent, puis build:fiches-pdf qui expire. Le relancer suffit, ce n'est jamais
le code. C'est arrivé cinq fois le 26/08.
⚠️ tsc peut échouer sur .next-2/types/validator.ts en citant une route d'une
AUTRE matière : c'est le cache de Next. rm -rf .next-2/types.

════ ✅ RIEN N'EST EN SUSPENS ═══════════════════════════════════════
Au 26/08, tout est commité ET poussé. Contrôlé : 12 entrées `maths/4e/` au
registre, 12 routes suivies sous app/fiches-cours/maths/4e/, mêmes noms, arbre de
travail vide, tsc propre.

⚠️ Le déploiement du 26/08 a publié quarante commits d'un coup — dont la
réparation du coach de 4e, la scission des fractions et le rendu KaTeX des
109 fiches. Si quelque chose cloche en ligne, c'est là qu'il faut regarder.

════ CE QU'IL NE FAUT PAS FAIRE ═════════════════════════════════════
⛔ Le graphe des PRÉREQUIS : reporté par Frédéric.
⛔ Les ANCRES par micro : abandonné (docs/prompt-ancres-micros.md).
⛔ Changer les URL des fiches : sans redirections 301 on perd l'indexation.
⛔ Le français : deux autres sessions s'en chargent.
⛔ Les fiches de CM2 en maths : Frédéric les réécrit.
⛔ Toucher au reste du coach de 4e : « le reste du coach 4eme on ne touche pas ».
⛔ Enrichir une fiche d'une notion de l'année suivante, même si le canvas existe
   et donnerait un beau dessin. Le canvas `arbre_proba` est prêt : il est pour la 3e.

════ LES RÈGLES DU DÉPÔT À TROIS SESSIONS ═══════════════════════════
• git commit -F message.txt -- <fichiers>  ⭐ TOUJOURS par chemin.
  ⚠️ Et VÉRIFIER LE DIFF d'un fichier partagé avant de le committer : il peut
  contenir le travail d'une autre session.
• ⛔ Jamais --amend, reset --hard, checkout -- .
• Mon serveur est `eleveai-2` (port 3100, dossier compilé .next-2).
• Fichiers partagés : prévenir Frédéric avant d'y toucher. Déjà touchés, tous de
  façon additive : registre.ts, sitemap.ts, pdf-disponibles.ts, next.config.ts,
  lib/canvas/ThalesCanvas.tsx, components/fiches/FicheCoursClient.tsx.
• Rendre compte à la fin de chaque journée en fiches TERMINÉES ET VÉRIFIÉES.
```
