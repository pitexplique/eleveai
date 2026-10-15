# Passation — le trio d'une notion : fiche de cours + feuille d'exercices + vidéo (20/09/2026)

> À coller tel quel dans une nouvelle session (Opus 5). Remplir la ligne NOTION.
> La mémoire du projet se charge toute seule : lire d'abord les notes citées.

**NOTION :** `<classe>` / `<notionId du coach>` — par exemple `seconde / valeur_absolue`.
Priorité de Frédéric : ses deux classes (seconde, 3e), dans l'ordre de son
calendrier (`calendrier-d-enseignement-de-la-seconde`). Objectif : tout fini fin
janvier. Ses temps : une feuille = 15 min si le coach est bon, une fiche = 30-40 min.

## Ce que tu livres, DANS CET ORDRE

1. **Le coach d'abord** (« coach d'abord, fiche ensuite »). Lis TOUTES les micros
   de la notion (`lib/tutor-v4/knowledge/<matière>/<classe>/microSkills.ts`) puis
   les énoncés réels de la banque (`lib/tutor-v4/questionBank/...`). Note les
   nombres. Si la notion n'est pas robuste (pool figé déguisé, exercice type
   absent), dis-le et répare avant d'écrire quoi que ce soit.
   Notes : `lire-les-micros-avant-d-ecrire-une-fiche`, `robustesse-mesuree-des-notions`,
   `coach-vert-mais-l-exercice-type-manque`.
2. **La fiche de cours** (`lib/fiches/`, registre `lib/fiches/registre.ts`) si elle
   n'existe pas. Écrite SIMPLEMENT (la règle de sa fille), un visuel par bloc,
   deux colonnes jamais trois, rien du programme de l'année suivante.
   Notes : `fiches-de-cours-ecrire-simplement`, `fiches-un-visuel-par-bloc-et-exemples-de-leur-age`,
   `largeur-des-blocs-d-une-fiche`, `mode-classe-la-seconde-lunette`, `verifier-chaque-fiche-en-la-rendant`.
3. **La feuille de 20 exercices** (8 + 8 + 4, rappel avant chaque niveau, corrigé
   étape par étape, piège nommé). Modèle le plus récent :
   `lib/fiches-exercices/maths-5e-fraction-calcul.tsx` + sa page + une ligne au
   registre `lib/fiches-exercices/registre.ts`.
   Notes : `fiches-exercices-le-mecanisme`, `feuille-exercices-fractions-5e`.
4. **Le script de recalcul** de la feuille (`scripts/verifier-exercices-<notion>.mjs`) :
   un AUTRE chemin que le corrigé, et le résultat doit se LIRE dans le corrigé.
   Un entier se vérifie par sa PHRASE. Puis des contrôles négatifs qui prouvent
   qu'ils ont été JOUÉS (casser, relancer, restaurer à l'octet).
5. **Les PDF** (fiche et feuille) : serveur REDÉMARRÉ, PowerShell,
   `node --experimental-strip-types scripts/build-fiches-pdf.ts http://localhost:<port> <chemin>`.
6. **La vidéo Manim** : une leçon paysage + 1 à 3 shorts. L'accroche complète
   « Les maths, ça sert à rien… sauf à ___ » ; un short = un paradoxe, un lieu
   réel de La Réunion ou une erreur fréquente ; pas d'étiquette d'âge ; la
   vignette NOMME la notion.
   Notes : `videos-manim-de-la-seconde`, `accroche-paradoxe-predit-les-vues`,
   `image-a-1-seconde-des-shorts`, `vignette-nommer-la-notion`,
   `arborescence-sorties-video-matiere-langue`, `rendu-echoue-laisse-le-fichier-d-avant`.
7. **Quand Frédéric a publié et donné les identifiants YouTube** (pas avant) :
   - une ligne par vidéo dans la table `notion_ressources` — c'est la base de
     PRODUCTION : montrer le tableau et attendre son oui ;
   - la même ligne dans `VIDEOS_FICHES` de `app/sitemap.ts`, avec `ajoutee` ;
   - une entrée EN TÊTE de `UNES` dans `lib/accueil/une.ts`, vignette en webp
     216 px dans `public/une/` (sharp, depuis la miniature du short).
   Note : `une-de-la-semaine-accueil`.

## Les règles qui ne se discutent pas

- Frédéric est statisticien : annonce le PROTOCOLE avec la conclusion, prévois
  témoin et contrôle négatif, et si une anomalie est identique partout ou se
  déplace d'une passe à l'autre, c'est l'instrument (`frederic-est-statisticien-parler-mesure`,
  `anomalie-qui-se-deplace-vient-de-l-instrument`).
- Tout se vérifie AU RENDU : 360 et 375 px, bureau, mode classe à 1280 × 800
  comparé à une feuille témoin déjà validée.
- ⛔ Aucun fichier de `manim/` ni aucun son dans un commit. ⛔ Ne pas modifier
  `components/matrice/EntreeMatrice.tsx`. ⛔ L'en-tête porte sa photo + Ti Margo
  avec un « + » : décidé le 20/09, ne pas déplacer.
- Commit PAR CHEMIN, `git diff --cached --name-only` avant chaque commit, une
  autre session peut travailler en même temps. Grouper les push. Montrer le
  rendu AVANT de pousser, et pousser seulement quand il le dit.
- Quand il demande une chose précise, faire CELLE-LÀ. Donner son avis une fois,
  puis exécuter sa décision — ne pas prendre un « on envoie » pour un accord sur
  une contre-proposition (erreur du 20/09 : la photo mise dans la Une).

## Fini quand

La notion a : coach robuste, fiche, feuille + script vert + contrôles négatifs,
deux PDF, vidéo(s) rendue(s) dans `manim/sorties/`, et — après publication —
base, sitemap et Une à jour. Rapport court : ce qui est livré, ce qui est
mesuré, ce qui reste, ce qui attend sa décision.
