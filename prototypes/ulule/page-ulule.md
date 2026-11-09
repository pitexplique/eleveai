# Page Ulule — EleveAI × Ti Margo

> Texte prêt à coller, champ par champ, dans le formulaire Ulule. Frédéric le saisit lui-même.
> Mode : **collecte avec contreparties** · stratégie du **08/11** : objectif **3 000 € = le collège**.
> Les passages entre [crochets] sont à compléter ou à vérifier avant la mise en ligne.
> L'ancienne version (8 000 €, ordinateur, GS → terminale) reste dans l'historique git.

---

## 1. Titre du projet (≤ 50 caractères)

**Ti Margo : les maths en dessin animé**

## 2. Sous-titre / phrase d'accroche (≤ 135 caractères)

**Votre enfant aime les dessins animés ? Aidez-nous à finir ceux qui apprennent les maths du collège, relus un par un, avant le brevet.**

## 3. Catégorie et tags

- Catégorie : **Éducation** (secondaire : Film et vidéo)
- Tags : mathématiques, dessin animé, école, éducation, enfants, parents, primaire, collège

## 4. Objectif

**3 000 €** : tous les dessins animés du collège finis, et relus, avant le brevet 2027.

Étapes suivantes : **5 000 €** = l'école primaire, **8 000 €** = le lycée.

Où vont les 3 000 € : étudiants vérificateurs 1 400 € (47 %), cotisations sociales et impôts 720 € (24 %), outils d'animation 640 € (21 %), commission Ulule 240 € (8 %).

---

## 5. Description du projet

⛔ Le texte qui fait foi est **`description-ulule.html`** (l'ouvrir dans le navigateur, Ctrl+A, Ctrl+C, puis Ctrl+V dans Ulule).

Vidéo de présentation : **https://youtu.be/HQ7B3ElMH8Y** (non répertoriée).

---

## 6. Contreparties

> **Tarif fondateur**, réservé aux contributeurs. Prix normal de l'abonnement famille : 4,95 € par mois, soit 59,40 € par an.
> Chaque contrepartie donne un **code** à activer sur **eleveai.fr/code**. Les mois offerts démarrent le jour où le code est activé.
> Toutes comprennent aussi le **film de remerciement de Ti Margo**, le même pour tous, et le **nom sur le mur des soutiens** (si le contributeur le souhaite).

À saisir sur Ulule, dans cet ordre. Pour chaque contrepartie : titre, prix, description.

**4,95 € · 1 mois avec Ti Margo**
1 mois d'abonnement famille : le coach suit votre enfant, compétence après compétence, et vous montre ce qu'il maîtrise.

**12 € · 3 mois avec Ti Margo**
3 mois d'abonnement famille, soit 4 € par mois.

**22 € · 6 mois avec Ti Margo**
6 mois d'abonnement famille, soit une demi-année scolaire.

**29 € · 1 an, offre des 50 premiers** *(50 places)*
1 an d'abonnement famille à 29 € au lieu de 59,40 €, réservé aux 50 premiers contributeurs. Ensuite, le tarif fondateur reste à 39 €.

**39 € · 1 an avec Ti Margo** ⭐ *(la contrepartie phare)*
1 an d'abonnement famille, au tarif fondateur de 39 € au lieu de 59,40 €. Toute l'année scolaire, jusqu'au brevet.

**🎁 Les mêmes, « à offrir » : 4,95 € · 12 € · 22 € · 39 €**
Même abonnement, au même prix. Vous recevez un **code cadeau** et une **carte Ti Margo à imprimer**, avec le nom de la personne qui offre (« De la part de Papi et Mamie »). Pour Noël, un anniversaire, des petits-enfants, un neveu, un filleul.
Titres conseillés sur Ulule : « 1 mois à offrir », « 1 an à offrir » (09/11 : 3 et 6 mois à offrir retirés pour rester à 10 contreparties ; le duo à 69 € les remplace).

**69 € · Duo famille à offrir**
Deux codes d'un an au tarif fondateur, pour deux enfants ou pour en offrir un. Avec deux cartes Ti Margo à imprimer.

**99 € · 1 an + 2 visios avec Frédéric** *(15 places)*
1 an d'abonnement famille et deux visios de 45 minutes : en janvier 2027 pour faire le point, en avril 2027 pour préparer la fin d'année ou le brevet.

**60 € · Licence classe, 1 an** *(enseignants, écoles, associations)*
Le suivi de toute la classe pendant 1 an, jusqu'à 30 élèves (2 € par élève et par an), et le nom de l'école sur le mur des soutiens.

**60 € · Parrainer une classe dans un pays qui manque de moyens** *(09/11, son idée)*
Une classe de collège, jusqu'à 30 élèves, dans un pays francophone où les élèves et les professeurs n'ont pas les moyens de s'abonner : le suivi de toute la classe pendant 1 an, et les dessins animés projetés en classe. Le collège est choisi avec des enseignants sur place. Des nouvelles de la classe en cours d'année et votre nom sur le mur des soutiens. Une façon de participer à une éducation libre et universelle.

**500 € · Parrainer un collège dans un pays qui manque de moyens** *(10 places)*
Tout un collège, jusqu'à 10 classes et 300 élèves, suivi pendant 1 an (moins de 2 € par élève), avec une visio pour lancer le projet avec ses professeurs. Des nouvelles du collège en cours d'année et votre nom, ou celui de votre entreprise, sur le mur des soutiens.

Livraison du parrainage : un code `--type classe` par classe (`--eleves 30`), remis au professeur référent du collège choisi. ⚠️ Avant le lancement : avoir au moins un ou deux collèges partenaires prêts (contacts d'enseignants francophones : Madagascar, Comores, Sénégal…).

**[1 000 €] · Partenaire** *(entreprises, mairies, comités d'entreprise)*
Votre logo sur la page des partenaires et **10 abonnements famille d'un an** à offrir (salariés, familles en difficulté…).

Livraison : `node scripts/codes-ulule.mjs --nombre N --duree 1|3|6|12 --type famille|cadeau|classe`, puis `python scripts/carte-cadeau-code.py --csv <lot>.csv` pour les cartes (durée 3 mois ajoutée le 08/11).

---

## 7. Vidéo de présentation

La voix validée est dans **`video-ulule-voix.md`**. Vidéo en ligne (non répertoriée) : https://youtu.be/HQ7B3ElMH8Y.
Rendu : `node scripts/ti-margo-short.mjs ulule presentation film` (`BD=1` pour le brouillon, validé avant le HD).

---

## 8. FAQ

**Pour quel âge ?**
La collecte finance d'abord les dessins animés du **collège**, de la 6e à la 3e. Si les étapes suivantes sont atteintes : l'école primaire (5 000 €), puis le lycée (8 000 €). Le coach, lui, couvre déjà le programme du CP à la terminale.

**Je peux voir les vidéos avant de participer ?**
Oui : beaucoup sont déjà en accès libre sur eleveai.fr et sur la chaîne YouTube @eleveai974.

**Quand mon abonnement démarre-t-il ?**
Le jour où vous activez votre code sur **eleveai.fr/code**. Vous recevez le code par courriel [à la fin de la collecte].

**Je peux tester avant ?**
Oui, et c'est même conseillé : le test est gratuit sur **eleveai.fr/coach**, sans compte, sans abonnement et sans carte bancaire. Seul le suivi des progrès dans la durée demande un abonnement.

**Je veux offrir l'abonnement à mes petits-enfants, comment faire ?**
Choisissez une contrepartie « à offrir ». Vous recevez un code cadeau et une carte Ti Margo à imprimer. Les parents de l'enfant entrent le code sur eleveai.fr/code.

**Qui relit les dessins animés ?**
Des étudiants en maths de La Réunion, futurs professeurs. Une vidéo n'est mise en ligne qu'une fois vérifiée, et je garde la validation finale.

**Les outils d'animation remplacent-ils le professeur ?**
Non. Ils aident à **fabriquer** les vidéos plus vite. Chaque script est écrit et validé par un enseignant, et chaque vidéo est relue avant d'arriver devant un enfant.

**Mon enfant passe déjà trop de temps sur les écrans…**
Justement : les dessins animés font quelques minutes et finissent par une question. C'est du temps d'écran qui fait réfléchir, pas qui fait défiler.

**Et si l'objectif n'est pas atteint ?**
Vous êtes remboursé intégralement, comme sur toute collecte Ulule « tout ou rien ».

**Je suis enseignant, je peux l'utiliser en classe ?**
Oui, c'est fait pour ça : les vidéos sont conçues pour être **projetées en classe**. La licence classe suit tous vos élèves pendant un an.

---

## 9. Messages pour les réseaux (lancement)

**Facebook / Instagram (parents)**
> Votre enfant aime les dessins animés ? 🎬 Ici, c'est Ti Margo, un petit caméléon, qui explique les maths. Je suis prof de maths à La Réunion et je veux finir tous les dessins animés du collège avant le brevet, chacun relu par un futur professeur. Dès 4,95 €, votre enfant reçoit un mois de suivi ; 39 € pour un an au tarif fondateur. 👉 [lien Ulule]

**Version courte (story, WhatsApp)**
> 🎬 Ti Margo : les maths du collège en dessin animé. Aidez-nous à les finir avant le brevet ! 1 an de suivi pour 39 €. 👉 [lien]

**Pour les grands-parents** (Facebook, à partager par les parents)
> Cette année, sous le sapin : un an de maths en dessin animé 🎄 Ti Margo accompagne les collégiens, notion après notion. Offrez-le à vos petits-enfants, avec une carte Ti Margo à imprimer. Et testez d'abord, c'est gratuit : eleveai.fr/coach 👉 [lien Ulule]

**Pour les collègues enseignants**
> Je lance une collecte pour finir mes dessins animés de maths du collège, pensés pour être projetés en classe et relus par des étudiants, futurs professeurs. Une licence classe est proposée en contrepartie. Si ça peut servir à vos élèves, partagez ! 👉 [lien]

---

## 10. À régler AVANT la mise en ligne

Voir **`avant-lancement.md`** : SIRET, promesses de dons, calendrier.
