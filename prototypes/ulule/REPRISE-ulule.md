# Reprise — campagne Ulule « Ti Margo : les maths en dessin animé »

> Session du 07/11/2026, bascule à 65 % de contexte. À lire en entier avant de reprendre.

## Où on en est

Frédéric remplit le formulaire Ulule lui-même, dans son navigateur et sur son compte (eleveai974). Moi, je lui donne les textes à coller. **Ne jamais remplir ni envoyer le formulaire à sa place sans son accord explicite.**

Ses choix, tranchés :
- **Mode** : collecte « pour un projet », avec contreparties. À l'étape 2, il a coché « réunir de l'argent ».
- **Titre** : « Ti Margo : les maths en dessin animé » (déjà saisi).
- **Objectif** : **8 000 €**. Paliers : 12 000 € (tout le parcours GS → terminale vérifié), 18 000 € (un an d'IA et plus de visibilité), 31 000 € (pays francophones, grâce à la matrice des programmes par pays).
- **Périmètre** : de la grande section à la **terminale** (et non plus GS → 6e).
- ⛔ **La qualité d'abord** : le facteur limitant, c'est la vérification, pas l'IA. Les étudiants vérificateurs passent avant l'IA.
- ⛔ **Pas de nombre de vidéos sur la page** : on parle de « vérification ».
- ⛔ **Pas de prénom d'enfant au générique** en contrepartie (trop de contributeurs). À la place : un film de remerciement Ti Margo, le même pour tous, et le mur des soutiens.
- ⛔ **Ne nommer aucun concurrent** sur la page. Écrire « un adulte qui explique au tableau » plutôt qu'IXL.
- ⛔ **Devoir de réserve** : aucune critique des inspecteurs. Écrire « un projet indépendant, né en classe ».
- Rectorat : **OK** pour le cumul d'activités (confirmé le 07/11).
- Test gratuit : **eleveai.fr/coach**, sans compte ni abonnement, mais **sans suivi**. Le suivi dans la durée vient avec l'abonnement.
- Coûts réels : Claude Max 200 $/mois, Vercel 40 €/mois, Supabase Pro à venir, voix Julie gratuite (voix Windows).
- Il prévoit **3 500 vidéos en deux mois**. Avec 8 000 €, la vérification n'est pas toute payée dès l'objectif : elle se finit au palier 12 000 €. Une question « 13 000 € ou 8 000 € + palier » est restée sans réponse claire, et il a continué avec 8 000 €.

## Les fichiers (`prototypes/ulule/`)

| Fichier | Contenu |
|---|---|
| `page-ulule.md` | Toute la page : titre, textes, contreparties, script vidéo, FAQ, messages réseaux, liste avant lancement. ⚠️ La « description » y est plus longue que le texte final ci-dessous : c'est ce dernier qui fait foi. |
| `budget.md` | Le budget interne détaillé : matériel, mensuel, étudiants, URSSAF, paliers, contributeurs. |
| `budget-camembert.png` | Le camembert des 8 000 € (8 postes, sans nombre de vidéos). |
| `image-principale.png` | L'image principale Ulule, 1360 × 760 (affichée en 680 × 380) : Ti Margo détouré et le titre. |
| `video-ulule-voix.md` | La voix **VALIDÉE** de la vidéo de présentation (9 scènes, paysage, ≈ 2 min). |

Les scripts qui dessinent les deux images sont dans le scratchpad de l'ancienne session. Ils ne sont pas indispensables : il suffit de rouvrir les PNG.

## Le texte final de la description (le dernier mélange, à coller tel quel)

Voir la fin de ce fichier, section « Description finale ».

## Ce qui reste

1. **La vidéo de présentation** : un agent la rendait en arrière-plan au moment de la bascule (série `ulule`, épisode `presentation`, sortie attendue `manim/sorties/ulule/presentation.mp4`, aperçu `manim/sorties/apercu.html` en pause). Il devait s'inspirer de `scripts/film-noel.mjs` pour le paysage, sans toucher aux fichiers du film de Noël. **Contrôler sa planche et son son**, corriger tout défaut, puis la faire écouter à Frédéric. Mise en ligne YouTube « non répertoriée » **seulement sur son ordre**. Les fichiers qu'il a créés (`prototypes/ti-margo/films/ulule*`, `public/sons/ulule-presentation`, une éventuelle option paysage dans `scripts/ti-margo-short.mjs`) ne sont pas committés.
2. **Les contreparties** à saisir sur Ulule : textes dans `page-ulule.md`, section 6.
3. **Avant le lancement** : le SIRET, les codes cadeaux (rien n'existe encore), la carte Ti Margo à imprimer, la date d'ouverture de l'offre famille, et une centaine de promesses de dons avant le jour 1.
4. **Facultatif** : une adresse `eleveai.fr/ulule` vers le coach avec `utm_source=ulule` (aujourd'hui, `/coach` compte les visiteurs comme venant de YouTube).
5. **Calendrier** : lancement conseillé début décembre, sur 35 jours. Ulule verse l'argent quelques semaines après la fin : si la production se fait en décembre, l'ordinateur doit être acheté avant.

## Description finale

```text
Je suis Frédéric, professeur de maths à La Réunion.
Pour mes élèves, j'ai créé eleveai.fr. Le site accompagne chaque notion du programme, de la grande section à la terminale, avec :

* un court dessin animé avec Ti Margo, pour avoir envie ;
* une vidéo pour comprendre chaque étape ;
* un coach qui suit l'enfant, micro-compétence après micro-compétence.

Le coach est construit sur une matrice des programmes par pays : il suit le programme français, et il est conçu pour s'adapter aux autres pays francophones.

Près de 1 500 vidéos existent déjà. Le site reçoit 500 visites par jour sans publicité, et mes élèves les regardent de leur plein gré. C'est ce qui me donne envie d'aller plus loin.

Mais aujourd'hui, je bute sur deux limites. La première, c'est la fabrication : tout est calculé image par image sur un ordinateur portable, qui ne peut pas produire les milliers de vidéos qui manquent encore pour couvrir l'ensemble du programme. La seconde, c'est la qualité : fabriquer vite ne suffit pas, chaque vidéo doit être juste avant d'arriver devant un enfant.

C'est exactement à ces deux limites que répond la collecte. Elle financera, dans l'ordre :

* un ordinateur de fabrication, pour produire plusieurs vidéos à la fois ;
* des étudiants vérificateurs à La Réunion, futurs professeurs, qui relisent chaque vidéo avant sa mise en ligne ;
* l'intelligence artificielle qui m'aide à écrire et à animer les vidéos ;
* de la publicité, pour faire connaître le projet aux familles.

Avec ces moyens, je pourrai mener le projet jusqu'au bout : offrir à chaque enfant, de la grande section à la terminale, un parcours complet où chaque notion a son dessin animé, sa vidéo et son coach, et où chaque vidéo a été vérifiée. Pour qu'aucun enfant ne décroche faute d'avoir compris une étape.

En contribuant, vous pouvez recevoir des mois d'abonnement famille dès 10 €, notamment dans une version à offrir à vos petits-enfants, ou des licences pour les classes.

Chaque soutien aidera eleveai.fr à produire les vidéos animées avec Ti Margo qui manquent, sans rien lâcher sur la qualité, et à rendre les maths plus accessibles, notion après notion.
```

Sous-titre (133 caractères) :

```text
Votre enfant aime les dessins animés ? Aidez-nous à finir ceux qui apprennent les maths, de la GS à la terminale, vérifiés un par un.
```
