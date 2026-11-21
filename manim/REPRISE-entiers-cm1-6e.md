# Reprise — série NOMBRES ENTIERS, du CM1 à la 6e (poste 2, 21/11/2026)

> Cette note est **dans le dépôt**, exprès. Les prompts de relève vivent dans le dossier de notes
> partagé des sessions, qui n'est **pas versionné** : on a déjà perdu comme ça toute la boîte à
> outils de la série Masses (`hd-masse.sh`, `film-masse.sh`, `commit-masse.sh`, `silences.py`),
> disparue avec les sessions qui l'avait écrite. Ce qui est payé une fois s'écrit ici.

L'inventaire de la série (découpage, banques, métiers, centres, état de production) reste
`manim/INVENTAIRE-entiers-cm1-6e.md`. Ici : **ce qui a coûté un aller-retour**, et les outils.

---

## Les trois outils de contrôle, et le moment où on les lance

| Outil | Quand | Ce qu'il attrape |
|---|---|---|
| `manim/poste2/verifier-avant-rendu.py <script.py> <Scene>` | **avant le dry run** | un `au_mot` sans marque à son offset exact, deux `au_mot` trop serrés, et une question / explication / choix qui n'est pas dans la voix **mot pour mot** |
| `manim/poste2/cues-apres-marques.py <serie>-cues.js` | **avant d'écrire un film Ti Margo** | les marques telles que `marquesEntiers()` les laisse — sans quoi un `mot()` introuvable tue le rendu sur un TimeoutError opaque |
| `manim/poste2/apercu-instants.py <mp4> <png> <t…>` | **à chaque doute** | l'image elle-même, à l'instant voulu (écran sauté par la planche, compteur d'un short, étiquette suspecte) |

Les trois ont leur mode d'emploi en tête de fichier. Déjà là par ailleurs :
`manim/poste2/verifier-zone-margo.py`, `verifier-coche-carte.py`, `verifier-fraicheur-mp4.py`,
`scripts/verifier-bords-video.py`, `scripts/planche-video.py`, `scripts/ti-margo-planche.py`.

### ⛔⛔ Ce qu'AUCUN de ces outils ne voit
1. **Ce qui est réellement affiché.** Ils lisent le source ou des métadonnées. Chevauchements,
   étiquettes qui se touchent, figure sortie de son cadre, emoji qui ne se rend pas, personnage
   illisible : **seule l'image**. Sur les cinq derniers épisodes, le dry run était propre et la
   moitié des défauts n'étaient visibles qu'à la planche.
2. **Les MATHS de la voix.** Voir la section suivante — c'est la plus importante de cette note.

---

## ⭐⭐ La passe MATHS sur la voix, avant tout rendu (règle validée par Frédéric le 21/11)

**Le « oui » de Frédéric sur un récapitulatif de voix n'est pas un contrôle d'arithmétique.** Quand
il valide 22 voix d'un coup, il valide le ton, le métier, le niveau de langue, la progression. Il ne
relit pas chaque rang et chaque calcul, et on ne doit pas le lui demander.

**Le cas qui a fondé la règle** : la voix `6e-entier-comparer`, clip `09b-correction`, validée,
disait « **6 032 a 3 centaines** : c'est le plus grand ». 6 032 a 0 centaine et **3 dizaines** — et
c'est bien le rang des dizaines qui décide entre 6 022, 6 023, 6 024 et 6 032. C'était une phrase de
**correction d'exercice** : l'erreur aurait été *enseignée*. Elle a été vue au moment de recopier la
voix à l'écran, par personne d'autre et par aucun instrument. Corrigée par `f9c3a08bd`.

Donc, pour chaque épisode, **une passe dédiée sur les maths seules**, indépendamment du style :
- chaque nombre, chaque rang, chaque calcul ;
- et surtout chaque **justification** (« c'est le plus grand **parce que**… ») : c'est là qu'était
  l'erreur, pas dans le résultat, qui était juste ;
- ⭐ **commencer par les phrases de correction et par la finale** : ce sont celles qu'un élève retient ;
- noter la passe, épisode par épisode, comme on note l'écran final.

⭐ **Et refuser d'écrire à l'écran ce qu'on ne peut pas justifier, même sur une voix « validée ».**

---

## Les pièges payés — lot A (CM1), § détaillé dans les prompts de relève

1. ⛔ **`col()` écrit dans la colonne de DROITE** : les figures vont à GAUCHE (x ≈ −3,4). Marge de
   3 % : x ∈ [−6,68 ; 6,68], y ∈ [−3,573 ; 3,573]. Mesurer les figures larges AVANT de les poser.
2. **Les nombres à espace** sont LE piège du lot : à l'écran toujours `nb()` (espace fine
   insécable), sinon Manim coupe le nombre en deux mots. L'audit affiche `AUDIT-ABSENT` pour chacun
   d'eux et **ne les vérifie pas** : contrôle à l'image obligatoire.
   ✅ Mesuré : l'espace fine n'est PAS un sous-mobjet, `t[0:2]` et `t[2]` tombent sur les bons chiffres.
3. ⛔⛔ `FadeIn(groupe)` et `Indicate(sous-ensemble du groupe)` dans le MÊME `play` : les éléments
   indiqués ne se dessinent pas. Toujours séparer. (Si la case est déjà à l'écran, c'est bon.)
4. ⭐ **Toujours commencer un extrait `au_mot` PAR le nombre**, sinon la ligne entière arrive sur le
   premier mot → AUDIT-AVANCE. Payé trois fois.
5. Deux `au_mot` séparés de moins de 0,6 s → RETARD : raccourcir le `play` d'avant.
6. ⭐⭐ **La synchro automatique retient déjà une ligne jusqu'à SON dernier mot.** Une ligne qui finit
   par un nombre est posée à l'instant de CE nombre ; un `au_mot()` placé après arrive donc toujours
   trop tard, et **raccourcir le `play` NE CORRIGE PAS**. Remède : ne pas appeler `au_mot` pour la
   ligne suivante, sa propre synchro la cale.
7. `finale_gauche` centre la figure en x = −4,6 : au-delà de ~3,6 unités de large, BORD.
8. **Un libellé plus large que sa colonne touche son voisin** (« 4 000500 ») → disposer en QUINCONCE.
9. ⛔ La coche ✓ touche un libellé long : réglé par `_CocheAuBout` dans `entier_commun.py`. La ligne
   `COCHE-RESERVE` du rendu dit quels libellés ont été rétrécis ; les relire à l'image, et mesurer
   avec `verifier-coche-carte.py`. ⛔ En PAYSAGE la carte vient de `_carte_choix`, dans un SHORT de
   `_carte` : surcharger l'une pour l'autre ne fait **rien**, et ça ne se voit qu'à l'image.
10. ⛔ `BOIS` et les autres noms du commun des Masses ne sont PAS dans cette chaîne d'import.
11. ✅ Fausses alertes connues : `AUDIT-ABSENT` sur tout nombre à espace, et `… « 974 »`.
12. ⛔ `scripts/miniatures-shorts-grille.json` se tient **À LA MAIN** (style compact, 5 lignes par
    miniature) : jamais par `json.dumps` (4 354 lignes réécrites une fois).
13. ⭐⭐ **Une ligne de question DIT CE QUE LA VOIX DIT, mot pour mot** : relire la voix et la
    recopier, jamais la résumer. C'est le point 4 de `verifier-avant-rendu.py`.
14. ⛔⛔ **Un mobjet construit AVANT un `move_to()` du groupe ne suit pas le groupe.** Les valeurs
    d'une bande posées dans leurs cases avant déplacement se sont écrites **sous** la bande, par
    dessus les cartes de choix, sur trois écrans. Remède : une fonction `recaler()` appelée après
    chaque déplacement, et un `cadre_ici()` qui construit le cadre à la position du moment.
15. ⭐ **Le titre d'un short tient sur UNE ligne jusqu'à ~24 caractères.** Au-delà, la carte des
    ceintures lui coupe la seconde ligne.
16. ⭐⭐ **`marquesEntiers()` sépare le nombre du mot qui lui est collé et retire l'espace des
    milliers** → `cues-apres-marques.py`. Un `mot()` introuvable tue `ti-margo-short.mjs` sur un
    TimeoutError de 120 s dont la vraie cause est en PREMIÈRE ligne de la sortie.

## Les pièges payés — lot B (6e), nouveaux

17. ⛔⛔ **VU SEULEMENT À L'IMAGE — un accessoire de la couleur des cheveux disparaît dans les
    cheveux.** `ines_ctrl()` portait un casque audio anthracite (#334155) sur des cheveux noirs :
    arceau, oreillettes et calotte fondaient en une seule masse d'où ne sortait qu'un petit ovale de
    peau, et le micro, qui finissait à 0,5 r du centre, passait **en travers du visage**. Remède :
    casque CLAIR, oreillettes rejetées à 1,2 r (hors des mèches), micro à côté du visage.
18. ⛔ **VU SEULEMENT À L'IMAGE — `move_to` centre la BOÎTE d'un `AnnularSector`, pas son arc.** Le
    pompon de `clara()`, placé à 1,55 r, flottait au-dessus d'un bonnet dont le haut est à 1,16 r :
    un point blanc tout seul.
19. ⛔ **`gauche(m, x, y)` CENTRE en hauteur.** Un bloc de DEUX lignes posé à y = 3,3 monte à 3,9 et
    sort de la marge de 3 % : **13 BORD sur un seul écran**. Une ligne simple tient à 3,15 ; un bloc
    de deux lignes, à **2,85**.
20. ⛔ **VU SEULEMENT À L'IMAGE — une étiquette posée par `next_to()` DANS une carte en sort.**
    Deux fois 0,24 unité de dépassement, même après avoir déplacé le point d'ancrage. ⭐ Remède :
    ne plus l'estimer, la **RECALER** —
    `if t.get_right()[0] > bord: t.shift(RIGHT * (bord - t.get_right()[0]))`.
21. ⛔ **VU SEULEMENT À L'IMAGE — une flèche centrée et un titre aligné à gauche se croisent.** Deux
    objets à la même hauteur dans deux systèmes d'alignement différents ne se vérifient pas de tête.
22. ⚠️ **VU À L'IMAGE — deux morceaux d'UNE MÊME phrase posés loin l'un de l'autre** (x = −3,3 et
    x = +1,3) laissent un trou de 4,6 unités et se lisent comme deux fragments. Un `self.ligne([…])`
    posé en deux temps, chaque morceau à son mot, règle ça sans changer un mot.
23. ✅ **`AUDIT-TARD` n'est pas bloquant** : il sort dès qu'un chiffre de l'explication existe aussi
    plus tôt dans la voix, et l'audit compare alors à la mauvaise occurrence. Relevé jusqu'à 2,52 s
    et accepté. Les critères restent : **0 AUDIT-AVANCE, 0 RETARD, 0 BORD**.
24. ⚠️ **La planche saute parfois un écran** : comparer son compte aux lignes `ECRAN` du log, et
    extraire les manquants avec `apercu-instants.py`. (Un écran de question partage son image avec
    sa réponse : 12 ou 13 images pour 16 écrans est NORMAL.)
25. ⭐ Les étiquettes d'une droite graduée (`Droite.nombre`) sont `hors_audit` par défaut : c'est la
    donnée d'une figure qu'on LIT. ⛔ Mais une BORNE qui est **la réponse** doit attendre son mot.
26. ⛔ **`classe.upper()` donne « 6E ».** Le badge des miniatures s'écrit « MATHS · 6e » partout
    ailleurs : d'où le dict `BADGE` dans `manim/miniature_entier.py`.
27. ⛔⛔ **Ne jamais mettre du markdown dans un heredoc bash non quoté.** Les backticks du markdown
    sont des substitutions de commande. Une note décrivant le verrou HD contenait
    `until mkdir …; do sleep 30; done` : bash l'a **exécuté**, en boucle infinie. Écrire le script
    Python dans un FICHIER, ou au minimum quoter le délimiteur (`<<'PYEOF'`).
28. ⛔⛔ **VU SEULEMENT À L'IMAGE (B4) — une phrase dite, coupée entre les DEUX COLONNES, se lit en
    morceaux.** Deux écrans de B4 mettaient le récit dans la colonne de droite et son calcul au bas
    de celle de GAUCHE : on lisait « le 5 vaut / soit 50. » et « 507 égale / et rien pour les
    dizaines. » — le « 5 × 10 » et le « 500 + 7 » étaient ailleurs. Le dry run était propre,
    `verifier-avant-rendu.py` aussi (il ne contrôle que les questions). ⭐ La règle : **tous les
    morceaux d'UNE phrase vont dans la MÊME colonne, dans l'ordre où la voix les dit** ; la colonne
    de gauche porte la FIGURE, jamais un bout de la phrase. C'est le piège n° 22 d'un cran au-dessus :
    là deux morceaux étaient trop loin, ici ils sont dans deux systèmes de lecture différents.
29. ⛔ **VU SEULEMENT À L'IMAGE (B4) — une boîte de largeur FIXE coupe le texte le plus long.** Les
    cinq jetons du défi faisaient tous 1,5 unité : « 30 000 » débordait des deux côtés (le 3 coupé
    par le bord) et « 2 000 » touchait les bords. ⭐ Remède : **construire le Text D'ABORD**, puis la
    boîte à `max(mini, txt.width + 0.5)`, et caler la rangée par son bord gauche pour ne pas revenir
    sur la figure voisine. ⚠️ `BORDS=1` ne voit rien : rien ne sort du CADRE de l'écran.
    ⭐ Même mesure pour une barre qui raye un terme (`barrerCraie`) : sa largeur se calcule sur le
    TERME (~95 px pour « 70 » en taille 86), pas à vue — 150 px mordaient sur le « + » d'avant.

## Pièges d'infrastructure (toute la série)

- ⛔ **Ne nettoyer aucun dossier `manim/scripts/*/media-ent-*`** avant la fin de la série : ils ont
  l'air de déchets mais ils portent les `.hd.log` dont `verifier-fraicheur-mp4.py` a besoin comme
  étalon.
- ⛔ **Verrou HD orphelin** : l'attente de `manim/poste2/5e_hd.sh` est une boucle `until mkdir` sur
  `%TEMP%\eleveai-rendu-hd.lock`. Un rendu planté laisse le verrou et bloque **toutes** les sessions,
  indéfiniment et sans un message. Attente anormalement longue + aucun `python.exe` en rendu =
  verrou à supprimer à la main. Et toujours le libérer soi-même, **même quand un rendu échoue**.
- ⛔ **`manim/outils-commit-cles.py` filtre par PRÉFIXE de clé** : lui passer le mauvais préfixe
  recopie HEAD et **jette silencieusement** ses propres entrées. Il accepte une liste séparée par
  des virgules (`6e-entier,cm2-entier`).
- ⚠️ La recette de commit par index temporaire laisse de **fausses suppressions** dans l'index
  principal : `git status` affiche `D` sur des fichiers neufs parfaitement présents. Le contrôle qui
  tranche est `git diff --stat -- <chemin>` (vide = identique à HEAD). ⛔ Jamais
  `diff <(git show HEAD:x) x` : il compare des LF à des CRLF et ment.
- ⚠️ Toujours `PYTHONIOENCODING=utf-8 python -X utf8 -m manim …` : sinon l'audit plante sur l'espace
  fine insécable (`UnicodeEncodeError`, cp1252) et le rendu s'arrête.
- ⭐⭐ **Les `au_mot()` survivent à une régénération de voix, les `au_t()` NON.** Un `au_mot()` est
  résolu contre le fichier de marques, qui est refait en même temps que les WAV : il reste juste
  tout seul. Un `au_t(7.53)` est un instant **relevé à la main sur l'énergie d'un WAV** : tout WAV
  refait le périme **en silence**, aucun instrument ne le dit, et le défaut n'apparaît qu'à l'image.
  ⭐ Le contrôle, à chaque régénération : la date du dernier WAV, celle du fichier de marques
  (elles doivent être en phase), et `grep -n "self\.au_t(" <script>`.
  État au 21/11 : `entier_rang.py` **0** `au_t()`, `entier_encadrer.py` **1** (le « 9 620 » de
  l'écran 05, à 7,53 s), `entier_decomposer.py` **0** — et les WAV de B1 et B3 n'ont jamais été
  régénérés, donc rien de publié n'est concerné. (⚠️ Compté à la commande : un relevé de mémoire
  circulait avec « 1 et 2 ».)
- ⭐⭐ **La DATE d'un JSON de voix ne prouve rien : `entier_voix.py --ecrire` réécrit les 22 d'un
  coup.** Le 21/11 à 16:22, la correction d'un seul clip de B2 a donné la même mtime aux 22 fichiers
  `manim/voix/*.json`, alors que les WAV de B1, B3, B4 et B5 dataient de 10:33 et leurs marques de
  10:39. Pris pour argent comptant, ce décalage fait croire que quatre épisodes ont une voix plus
  récente que leurs marques. ⭐ Le contrôle qui tranche est le CONTENU, pas la date :
  `git diff --stat -- manim/voix/<id>.json` (vide = inchangé) et `git log -1 -- …` (il doit pointer
  le commit des WAV). Vérifié ainsi avant B4 : seul `6e-entier-comparer` a bougé. C'est le même
  principe que « une métadonnée n'est jamais la chose » de REGLES.md.
- ⚠️ **Quand une voix est refaite, elle est souvent RÉGÉNÉRÉE EN ENTIER** : les 16 WAV de
  `6e-entier-comparer` l'ont été pour corriger un seul clip, et **toutes les durées ont changé**.
  Relire les durées sur les WAV avant de caler quoi que ce soit — jamais les recopier d'un message.

## Ce qui a coûté le plus cher, en une phrase

**Un instrument ne prouve rien tant qu'on n'a pas regardé l'image — et aucun instrument ne lit les
maths d'une voix.**
