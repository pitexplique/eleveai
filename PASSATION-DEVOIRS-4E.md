# Passation : les devoirs « 5 exercices par micro » de toute la 4e

Rédigée le 12/10/2026, à la fin de la session Pythagore (épisodes 1 et 2).

## Ce que Frédéric veut

« 5 exercices par micro, comme devoir » : il parle **en prof**. Pour chaque micro du coach de 4e :
5 exercices de cette micro seulement, à donner en devoir, imprimables (tous sur UNE feuille A4 recto verso) et
projetables (mode classe). Plus tard, chaque devoir recevra le QR de la vidéo de sa micro.

## Le modèle existe : le copier

`app/fiches-exercices/maths/4e/pythagore-theoreme/devoirs/` (commits `925b67db`, `520c176e`) :

- `DevoirsClient.tsx` : un tableau `DEVOIRS`, un devoir par micro (`video` facultatif : sans épisode tourné, seul le QR du corrigé) ;
  - un exercice = `{ enonce: string, corrige: string, figure?: ReactNode }` (du TEXTE : le mode classe le typographie) ;
  - **impression** : ⛔ Frédéric, 12/10 : « 5, 4 ou 7, mais UNE feuille A4 à imprimer », recto verso. Un quart de page par devoir (`height: 66mm`), 4 par face, 8 au plus ; pointillé de découpe, en-tête et pied du site masqués (`body > *:not(main)`), corrigé masqué. Une notion à plus de 8 micros (proportionnalité 13, fractions 12, statistiques 11) : deux feuilles, ou regrouper deux micros proches ;
  - **mode classe** (`ModeClasse`) : une diapo d'ouverture, puis une diapo `corrige` par exercice (`revelable: true`, une phrase par ligne).
- `page.tsx` : les métadonnées.

⚠️ Pour une notion SANS vidéo par micro, il n'y a pas de QR d'épisode : soit on le retire du bloc et de la diapo d'ouverture, soit on met le QR de la paysage de la NOTION.

## L'ampleur (mesurée le 12/10)

- **216 micros** dans **31 notions** (de 4 à 13 micros par notion).
- Sans les micros `*_defi` (une par notion), il reste **environ 185 micros**, donc environ **925 exercices** corrigés.
- Une page `devoirs/` par notion : `app/fiches-exercices/maths/4e/<slug>/devoirs/`.
  Le slug se trouve dans `lib/fiches-exercices/registre.ts`.

## Les règles à respecter (sa mémoire)

- **Des questions PRÉCISES** : un cas chiffré, une seule réponse attendue. Jamais « Explique pourquoi » sans cas concret.
- **QCM** : jamais deux choix de même valeur.
- **Division** : écrire « ÷ », jamais 5/2 hors des fractions.
- **× 10** : passer par la valeur des chiffres, jamais « ajouter un zéro ».
- Les 5 exercices vont **du plus simple au plus exigeant** ; le 5e est concret (La Réunion si possible).
- **Partir des questions de la micro** dans `lib/tutor-v4/questionBank/4e/maths/<notion>.bank.ts` (environ 10 par micro, avec correction) : les réécrire en énoncés d'exercice, sans les recopier telles quelles.
- **Vérifier en rendant** : la capture d'impression (Chromium, `channel: "chrome"`) et le mode classe en 1280 × 800, avant de commiter.
- **Commiter PAR CHEMIN** (plusieurs sessions sur le même poste) ; ne pousser qu'au signal.

## Ordre conseillé

Les notions du moment en classe d'abord. Ensuite, par lots de 3 à 4 notions par bloc de 2 h.
