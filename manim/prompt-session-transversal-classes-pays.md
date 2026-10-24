Prompt — session de RÉFLEXION : le transversal CLASSES × PAYS (Frédéric, 24/10/2026)

Colle ceci dans une nouvelle session :

---

Réponds toujours en français. C'est une session de RÉFLEXION, à mener avec moi : « on réfléchit ensemble ». Tu proposes, tu argumentes, tu me poses les vraies questions, et on tranche ensemble. Ne code rien et ne lance aucun agent tant qu'on n'a pas décidé. Pas de push sans mon signal.

## Le sujet
On travaille désormais PAR NOTION, du CM1 à la Terminale. Exemple : la série statistiques, 118 vidéos au lycée, faite notion par notion avec des épisodes communs à plusieurs classes. On a mesuré un gain de 20 à 30 % (modules communs, épisodes partagés, règles écrites une fois).

On veut maintenant adapter le site à plusieurs PAYS francophones. Ma liste : France (la base), Suisse romande, Belgique (FWB), Maroc, Québec, Côte d'Ivoire, puis Sénégal. Les USA et l'Ontario sont retirés du site, mais leurs matrices restent dans le code.

La question : comment rendre le travail TRANSVERSAL à la fois entre les classes ET entre les pays, pour qu'une notion faite une fois serve partout ?

## Les questions à travailler avec moi
1. **La bonne unité de travail.** Est-ce la notion (ex. « statistiques ») ou la micro du coach, et comment passe-t-elle d'un pays à l'autre ? Une micro française peut correspondre à un autre niveau ailleurs : par exemple la 4e en France face à « Sec 2 » au Québec ou « 2AC » au Maroc.
2. **La matrice.** Faut-il garder une matrice par pays et par niveau (format actuel de `lib/programmes-pays/`) ou passer à une matrice PAR NOTION, qui couvre tous les pays d'un coup (une ligne = une micro, une colonne = un pays/niveau) ?
3. **L'ordre de travail.**
   - Faut-il remplir les pays notion par notion, en commençant par les statistiques, déjà complètes en France du CM1 à la Terminale ?
   - Ou pays par pays ?
   - Que gagne-t-on dans chaque cas, en tokens et en temps pour moi ?
4. **Ce qui change d'un pays à l'autre.**
   - Le vocabulaire : « secondaire 3 », « 3AC », « 3e »…
   - Les notations : virgule ou point décimal, « ÷ »…
   - Les contextes locaux des vidéos et des exercices.
   - Les micros manquantes, que la France n'a pas.

   Que faut-il adapter, et quoi garder tel quel ? Faut-il des vidéos propres à un pays, et quand ?
5. **Le coach.** Comment l'élève d'un pays voit-il SES classes et SES notions, tout en profitant de nos séries ? Une page `/pays/<pays>` existe déjà, avec la colonne des classes du pays et les ressources par micro.
6. **La mutualisation.**
   - La Côte d'Ivoire et le Sénégal ont des programmes voisins : jusqu'où peut-on partager ?
   - Que faire de la Belgique et de la Suisse, très proches entre elles par le vocabulaire ?
7. **Le coût et le calendrier.** On a mesuré environ 0,25 à 0,3 % du quota hebdomadaire par vidéo. Ce n'est pas l'argent qui freine, c'est le quota. Avec cette base, quelle est la meilleure façon d'enchaîner les notions (vidéos, coach, feuilles) et les pays ?

## Ce qu'il faut lire d'abord (sans tout recopier)
- Mémoire : `matrice-multi-pays.md`, `changer-de-session-a-65-pourcent.md` (règle des 60 % et travail par notion), `les-classes-de-frederic-cette-annee.md` (mes classes : 6e et 4e), `business-plan-3500-videos-multi-pays.md`, `serie-statistiques-prochaine-notion.md`.
- Code :
  - `lib/programmes-pays/` : `types.ts`, `pays.ts`, `quebec-secondaire.ts`, `maroc-3ac.ts` ;
  - `app/pays/[pays]/page.tsx` ;
  - `components/pays/RessourcesMicro.tsx` ;
  - `scripts/couverture-programmes-pays.ts`.
- Vidéos : `manim/REGLES.md`, `manim/centres-interet-par-age.md` (réserve de contextes par pays), et la série statistiques comme exemple de travail par notion (`manim/consigne-videos-stats-lycee.md`).

## Ce que j'attends de toi
- D'abord, une courte synthèse de l'existant, en 10 lignes au plus.
- Puis, pour chaque question, 2 ou 3 options avec leurs avantages, leurs inconvénients et ta recommandation.
- Ensuite, on discute.
- À la fin, quand j'ai tranché : un plan écrit dans `manim/plan-transversal-classes-pays.md` et la mémoire mise à jour.
