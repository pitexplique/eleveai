# Pied de prompt — à coller dans les trois sessions

> Écrit le 25/08/2026. Trois sessions travaillent en parallèle dans le même
> dossier : deux en français (4ᵉ et 3ᵉ), une en maths (4ᵉ). Ce bloc se colle à la
> fin de chacun des trois prompts.

```
════ ⛔ VOUS N'ÊTES PAS SEUL DANS CE DOSSIER ════════════════════════
TROIS sessions travaillent en même temps dans
C:\Users\FRED\Documents\eleveai :

   • français 4e   • français 3e   • maths 4e

Le 24/08, DEUX sessions ont suffi à provoquer : un commit avalé par un
`git commit --amend` d'une autre session, neuf fichiers étrangers
emportés dans un commit, et des 404 aléatoires sur des pages qui
existaient. Plusieurs heures perdues. À trois, le risque triple.

LES QUATRE RÈGLES QUI EN DÉCOULENT :

1. ⭐ COMMITTER PAR CHEMIN, TOUJOURS :
       git commit -F message.txt -- <fichier> <fichier>
   Un `git commit` ordinaire emporte TOUT ce que les autres sessions ont
   laissé dans l'index. C'est arrivé, et il a fallu défaire à la main
   (`git reset --soft HEAD~1`, puis recommit limité).

2. ⛔ JAMAIS `git commit --amend`, ni `git reset --hard`, ni
   `git checkout -- .`. Vous écraseriez le travail non commité d'un autre.

3. `git status` MONTRERA DES FICHIERS QUI NE SONT PAS À VOUS. C'est
   normal. Ne pas les ajouter, ne pas les annuler, ne pas s'en étonner.
   Si un fichier vous surprend, demandez à Frédéric — ne le corrigez pas.

4. LE SERVEUR DE DÉVELOPPEMENT : démarrez le VÔTRE (il prendra un port
   libre automatiquement). Ne tuez jamais celui d'une autre session.
   ⚠️ Il se dégrade au bout d'une heure ou deux : 404 aléatoires sur des
   routes qui existent, puis `build:fiches-pdf` qui expire en attendant
   `networkidle`. Le relancer suffit — ce n'est JAMAIS le code.

════ QUI TOUCHE À QUOI ══════════════════════════════════════════════
Chacun reste chez soi. Les fichiers PARTAGÉS sont les plus dangereux.

  français 4e/3e  → lib/fiches/francais-4e-*, francais-3e-*
                    lib/tutor-v4/knowledge/francais/**
                    lib/tutor-v4/questionBank/**/francais/**
  maths 4e        → lib/fiches/maths-4e-*
                    lib/tutor-v4/knowledge/maths/4e/**
                    lib/tutor-v4/questionBank/4e/maths/**

  ⚠️ PARTAGÉS — prévenir Frédéric AVANT d'y toucher :
     components/fiches/FicheCoursClient.tsx   (rend les 109 fiches)
     lib/fiches/types.ts · lib/fiches/registre.ts
     lib/canvas/**        (un canvas sert toutes les matières)
     package.json · docs/note-du-matin.md

  ⭐ Si vous corrigez un CANVAS, dites-le : la correction profite aux
     autres, et ils doivent refaire leurs PDF. Un PDF est une PHOTO de la
     page — changer un canvas les périme tous, et `verifier:pdf` ne le
     voit PAS (il compare des dates de commit de FICHES).

════ LA MÉTHODE, EN UNE PHRASE ══════════════════════════════════════
⭐ MESURER, PAS CONCLURE. Sur les trois jours écoulés, chaque erreur est
venue d'une conclusion tirée avant vérification : un filtre de fichiers
qui a rendu une mesure entièrement fausse, 37 « identifiants fantômes »
qui n'existaient pas, des labels jugés lisibles parce qu'ils étaient
uniques. Chaque fois, c'est une mesure qui a rattrapé — jamais une
relecture.

Concrètement : vérifier en RENDANT la page, pas en lisant le code. Et
quand un chiffre surprend, le remesurer autrement avant d'en tirer quoi
que ce soit.

════ LE RYTHME ══════════════════════════════════════════════════════
⭐ Frédéric, 25/08 : « le principal est la qualité, je ne suis pas
pressé. » Il s'est donné 4-5 mois pour le CP → Terminale. IL N'Y A AUCUNE
ÉCHÉANCE À LA SEMAINE. Une fiche finie et vérifiée vaut mieux que trois
commencées. Ne pas accélérer, ne pas grouper, ne pas sauter la mesure.

Rendre compte en travail TERMINÉ et VÉRIFIÉ, jamais en travail commencé.

════ DIVERS ═════════════════════════════════════════════════════════
• `docs/*` est ignoré par .gitignore : `git add -f` pour y ajouter.
• Lire `docs/note-du-matin.md` avant de commencer : c'est la passation,
  elle porte l'état mesuré du site et les pièges déjà payés.
• Les messages de commit portent le RAISONNEMENT, pas seulement le quoi :
  ce qui a été essayé, ce qui a échoué, et pourquoi la solution retenue.
```
