# « Science péi » : le journal scientifique de La Réunion écrit par les élèves

Réflexion du 14/11/2026. Rien n'est décidé : ce document sert à trancher.

## L'idée en une phrase

Une fois par mois, des élèves de 6e et de 4e partent d'une question de l'île
ou de leur passion. Ils mesurent, ils calculent, ils écrivent un article court
avec son défi QCM. Le prof relit, puis l'article paraît dans le Journal
d'EleveAI, dans l'édition « Île de La Réunion ».

## 1. Qui écrit

Deux sources, qui se complètent :

- **La classe, en cours.** Une séance de maths (mesure, moyenne, graphique,
  échelle…) donne la matière d'un article. Toute la classe mesure et calcule.
  Un petit groupe rédige.
- **Le club volontaire (6e et 4e).** Quelques élèves motivés, sur la base du
  volontariat. Ils finissent l'article de la classe, ou proposent le leur à
  partir d'une passion.

Les rôles :

- **Frédéric = rédacteur en chef.** Il choisit le sujet du mois, il valide,
  il décide de publier.
- **Claude = secrétaire de rédaction.** Mise en forme, vérification des
  chiffres, relecture du QCM (une seule bonne réponse, bonne réponse au
  hasard A/B/C), recherche de la vidéo qui va avec, et plus tard un short.
- **Les élèves = journalistes.** Question, mesures, texte, défi.

## 2. Le rythme : 1 article par mois

- Semaine 1 : on choisit la question (en classe ou au club).
- Semaine 2 : on mesure et on calcule.
- Semaine 3 : on écrit le texte et le QCM.
- Semaine 4 : relecture du prof, mise en forme, publication.

Soit environ 8 articles sur l'année scolaire (de novembre à juin). Un
article paraît à la Une de l'édition Réunion pendant sa semaine de sortie,
puis il reste dans une rangée « Écrit par des élèves ».

## 3. Le circuit : de l'élève à la publication

1. **L'élève écrit** dans la carte « ✍️ Écrire pour le Journal », en bas de
   son tableau de bord (les maths restent en haut pour les parents).
   Il faut être connecté.
2. **Le prof relit** dans son tableau de bord : « Accepter », « À corriger »
   (avec un commentaire) ou « Pas retenu ».
3. **L'élève voit le statut** : « Chez ton prof », « À corriger »,
   « Accepté pour le Journal ».
4. **Claude met en forme** l'article accepté : il le relit, vérifie les
   nombres, ajoute « Les maths derrière » et la vidéo.
5. **Frédéric valide la version finale.** Puis l'article paraît, au moment
   du rituel de la semaine du Journal.

Pour un article écrit en classe sur papier : Frédéric prend une photo du
texte (sans visage) ou le recopie, et on entre directement à l'étape 4.

### Ce qui existe déjà (codé le 14/11 par une autre session, pas encore commité)

- La carte « ✍️ Écrire pour le Journal » : `app/dashboard-eleve/CarteEcrireJournal.tsx`
  (choix de la passion ou « Autre chose », question, ce que j'ai mesuré, défi QCM).
- L'API `app/api/journal-propositions/route.ts`.
- La relecture côté prof : `app/dashboard-prof/ArticlesARelire.tsx`.
- La table `supabase/journal_propositions.sql` (à exécuter une fois dans Supabase).

Ce qui manque : la publication. Aujourd'hui, un article accepté ne va pas
encore tout seul dans le Journal. Voir la partie 8.

## 4. Le format d'un article

Le même modèle que tous les articles du Journal : **Regarder, Lire, Écouter,
le défi QCM.** Avec, en plus, la trace du travail des élèves.

| Bloc | Ce qu'on y met | Qui |
|---|---|---|
| La question | Une question de l'île ou d'une passion. Ex. : « Combien de temps met un cyclone pour traverser l'île ? » | élèves |
| Les mesures | Ce qu'on a mesuré, compté ou trouvé, avec des nombres et l'unité. | élèves |
| Les maths utilisées | 1 ou 2 notions du programme : moyenne, proportion, vitesse, échelle, graphique, pourcentage, relatifs… | élèves + prof |
| Le texte | 5 à 8 phrases courtes. Facile à lire, facile à écouter. | élèves, relu par Claude |
| Le défi QCM | 1 question, 3 choix, une seule bonne réponse. | élèves, vérifié par Claude |
| La vidéo | Une vidéo EleveAI de la notion de maths (paysage + short). Plus tard, peut-être un short dessin animé de l'article. | Claude |
| La signature | « Par Léa et Noah, 6e B » : prénoms + classe. | — |

Le lien avec le coach reste : « S'entraîner avec le coach » sur la notion
de maths de l'article.

## 5. Huit idées d'articles

Chacune part d'une passion ou de l'île, et utilise des maths de 6e ou de 4e.

1. **Lutte : « Qui est le plus lourd de la catégorie ? »** On regarde les
   catégories de poids d'un club. Écarts, moyenne, comparer des décimaux (6e).
2. **Vélo : « Monter au Maïdo, c'est quelle pente ? »** Dénivelé et
   distance, la pente en pourcentage, la vitesse moyenne (4e : proportion,
   vitesse).
3. **Danse : « Combien de pas dans une chorégraphie de maloya ? »** On compte
   les temps et les pas, on fait des rythmes et des multiples (6e : multiples,
   proportion).
4. **Foot : « Tirer au but : qui marque le plus souvent ? »** 10 tirs par
   élève dans la cour, fréquences en pourcentage, diagramme (6e et 4e :
   statistiques, pourcentages).
5. **Cuisine : « Le cari pour 30 élèves »** On part d'une recette pour 4 et on
   l'adapte pour la classe. Tableau de proportionnalité (6e).
6. **Volcan : « La Fournaise : combien de mètres par heure pour la lave ? »**
   Données publiques de l'observatoire, vitesse, ordres de grandeur
   (4e : puissances de 10, vitesse).
7. **Cyclones : « Combien de pluie tombe en un jour ? »** Relevés de pluie
   (pluviomètre fait en classe ou données publiques), graphique, record,
   moyenne (6e et 4e).
8. **Tortues et récifs : « Combien de tortues viennent pondre ? »** Comptages
   publics de Kélonia, évolution sur 10 ans, pourcentages d'augmentation ou de
   baisse (4e).

Autres pistes pour plus tard : la canne (tonnes de canne → kilos de sucre),
la température qui baisse quand on monte (relatifs, 4e), la taille des
vagues à la plage.

Les données publiques (Météo-France, observatoire du volcan, Kélonia) sont
toujours citées en source, comme dans les autres articles.

## 6. Protéger les élèves (des mineurs)

Règles non négociables :

- **Prénom et classe seulement.** Jamais de nom de famille, jamais le nom du
  collège (à trancher, voir les questions).
- **Pas de photo de visage.** Photos permises : les mains, les objets, les
  mesures, le paysage, le tableau.
- **Rien n'est publié sans la validation du prof.** Deux validations :
  l'idée (dans le tableau de bord), puis la version finale mise en forme.
- **Pas de commentaires publics** sous les articles.
- **Pas de données personnelles dans les mesures** (pas de poids ni de taille
  d'un élève nommé ; on donne des moyennes de groupe).
- **Accord des familles** : une autorisation simple pour la publication du
  prénom (à voir avec le collège ; souvent déjà prévu dans le droit à l'image).
- Un élève peut demander à **retirer** son article à tout moment.

## 7. Pourquoi c'est utile

**Pour les élèves**

- Ils voient que les maths servent à comprendre leur île et leur passion.
- Ils écrivent pour de vrai : quelqu'un va les lire. Ça motive.
- Écrire un QCM oblige à bien comprendre (il faut trouver la bonne réponse
  et deux erreurs crédibles).
- Ceux qui lisent mal participent aussi : mesurer, compter, filmer les mains,
  choisir les réponses du QCM.
- Fierté : « mon article est sur le site ».

**Pour le site**

- Du contenu vrai, local, que personne d'autre n'a.
- Une raison pour les élèves de se connecter (et donc d'être visibles dans le
  suivi).
- Une belle histoire à raconter : à Ulule, aux parents, aux autres profs, sur
  les réseaux.
- Un modèle qu'un autre prof peut copier dans sa classe, n'importe où.
- ⚠️ Cela reste dans l'édition « Île de La Réunion », que l'élève choisit.
  L'édition « Le monde » garde la règle des 4 % de contextes réunionnais.

## 8. Ce qu'il faudrait coder plus tard

| Chantier | Ce que c'est | Effort |
|---|---|---|
| Exécuter le SQL | `supabase/journal_propositions.sql` dans Supabase | 5 min (Frédéric) |
| Publier un article accepté | Un bouton « Publier » chez le prof, ou Claude qui ajoute l'article à la main dans `lib/accueil/articles.ts` au rituel de la semaine | à la main : 0 code ; bouton : ½ journée |
| Champ « auteurs » | Afficher « Par Léa et Noah, 6e B » sous le titre | 1 h |
| Rangée « Écrit par des élèves » | Une rangée dans l'édition Réunion du Journal + un badge sur la carte | 2 h |
| Ajouter une photo | Photo d'objets ou de mesures (pas de visage), relue par le prof | ½ journée |
| Travail de groupe | Plusieurs auteurs pour un article | 2 h |
| Short dessin animé | Un short Ti Margo par article, à la main | ~½ journée par short |
| Page « Science péi » | Une page qui liste tous les articles des élèves | ½ journée |

**Conseil pour commencer :** pas de nouveau code. Le premier article se
publie à la main (Claude l'ajoute au Journal pendant le rituel de la
semaine). On code le bouton « Publier » seulement si ça marche avec les
élèves.

## 9. Questions à trancher par Frédéric

1. Le premier article : en classe (6e ou 4e ?) ou au club ? Et quand ?
2. Le club : quel moment (midi, après les cours, mercredi) ? Combien d'élèves ?
3. Le nom : « Science péi », ou un autre nom choisi par les élèves ?
4. La signature : prénom + classe, ou ajouter le collège / la ville ?
5. L'autorisation des familles : passe-t-elle par le collège (droit à
   l'image déjà signé) ou faut-il un petit mot ?
6. La publication : à la main par Claude (conseillé au début) ou un bouton
   « Publier » chez le prof ?
7. Ouvrir plus tard à d'autres profs et d'autres collèges ?
8. Une vidéo par article : seulement la vidéo de la notion, ou aussi un short
   dessin animé fait à partir de l'article ?

## 10. Décidé : le premier article

**En classe, avec les 6e, sur les tirs au but, avant Noël** (réponses de Frédéric, 14/11).

Question de départ : « Tirer au but : qui marque le plus souvent ? »

Déroulé possible en 2 séances :

1. **Dans la cour (1 h).** Par groupes de 4 : un tireur, un gardien, un
   compteur, un secrétaire. Chaque élève tire 10 fois. Le secrétaire note
   les buts sur une fiche. On peut comparer pied droit / pied gauche, ou
   tir de près / tir de loin.
2. **En classe (1 h).** On calcule le pourcentage de réussite du groupe et
   de la classe (sur 10 tirs : 7 buts = 70 %). On fait un diagramme en
   barres. Un petit groupe écrit 5 à 8 phrases. La classe vote le QCM.

Maths de 6e : fréquence, pourcentage simple, diagramme en barres, comparer.
Protection : on publie les résultats par groupe ou pour la classe, jamais
le score d'un élève nommé. Photo possible : le ballon, le but, les fiches.

Exemple de défi QCM : « Une classe a tiré 200 fois et marqué 130 buts.
Quel est son pourcentage de réussite ? » A. 65 % · B. 130 % · C. 13 %.

## 11. Piste : impliquer des parents et des entreprises

Question de Frédéric (14/11) : « pourrait-on y impliquer des entreprises ou
des parents ? » Oui, et ça va bien avec « les maths sont partout ».

**Les parents : « l'invité expert »**

- Un parent vient parler de son métier 10 minutes, ou répond à une interview
  préparée par les élèves (5 questions). Son métier pose la question de
  l'article : un maçon (combien de parpaings pour un mur ?), une infirmière
  (les doses), un pêcheur (le poids de la pêche), un chauffeur (distance et
  temps).
- Dans l'article : prénom + métier seulement (« Jean-Marc, maçon »).
  Jamais le lien avec l'élève (« le papa de… »).
- Bonus : les parents qui participent lisent l'article et en parlent à la
  maison. C'est un pont entre l'école et la famille.

**Les entreprises et structures de l'île : « la question du mois »**

- Elles posent une vraie question ou donnent des données : le club de foot
  du quartier (les tirs au but !), une boulangerie (la recette pour 200
  pains), une sucrerie (la canne), Kélonia (les tortues), Météo-France
  (la pluie), une station de surf (les vagues).
- Elles peuvent aussi proposer une visite ou un expert.
- Dans l'article : leur nom apparaît comme **source**, comme pour les autres
  articles. **Pas de logo, pas de publicité.**

**Les règles à respecter**

- À l'école publique, la **neutralité commerciale** s'applique : pas de pub
  pour une entreprise auprès des élèves. Un partenariat passe par l'accord
  du chef d'établissement (souvent une simple convention).
- Un intervenant extérieur en classe : toujours en présence du prof, et
  prévenir la direction.
- Sur le site EleveAI (en dehors du collège), on peut remercier un
  partenaire, mais sans faire de pub dans l'article lu par les élèves.

**Pour commencer simplement :** pour les tirs au but, inviter un éducateur
d'un club de foot du coin (ou un parent qui entraîne) pour la séance dans
la cour. Il donne un chiffre vrai (« en match, on marque environ 3 tirs
au but sur 4 ») que les élèves comparent avec le leur.

**Une première piste concrète : un parent architecte** (14/11). Un parent
d'élève est architecte. Idées d'articles avec lui, pour les 6e :

- **« Le plan de notre classe »** : on mesure la salle, on la dessine à
  l'échelle (1 cm pour 1 m), on calcule l'aire et le périmètre. Il montre
  un vrai plan et explique à quoi servent ces calculs dans son métier.
  Très lié à la série « périmètre, aire, volume » des vidéos.
- **« Une maison qui résiste aux cyclones »** : la case créole, la pente du
  toit, la varangue. Mesures d'angles, de longueurs, et un peu de science
  (le vent, la pluie).

Dans l'article : « Merci à notre invité, architecte », sans nom de famille
et sans dire de quel élève il est le parent.

## 12. Décidé : le deuxième article, « La case et les cyclones »

**Avec les 6e et le parent architecte** (choix de Frédéric, 14/11).
Moment conseillé : **janvier**, en pleine saison des cyclones. Le sujet est
dans l'actualité des élèves.

Question de départ : « Pourquoi la case créole résiste-t-elle au vent ? »

Déroulé possible :

1. **L'invité (20 min).** L'architecte montre un plan de case : la varangue,
   le toit en pente, les volets, les fondations. Il explique ce qu'il
   calcule avant de construire.
2. **Mesurer (1 h).** Par groupes, sur le plan ou sur une photo de case
   (sans personne) : mesurer les longueurs, l'angle du toit au rapporteur,
   passer du plan à la vraie taille avec l'échelle.
3. **La maquette (option, 1 h).** Une case en carton à l'échelle, puis un
   sèche-cheveux ou un ventilateur pour « le cyclone » : toit plat contre
   toit en pente. Les élèves notent ce qui se passe.
4. **Écrire (1 h).** 5 à 8 phrases, le QCM voté par la classe.

Maths de 6e : longueurs et conversions, échelle (proportionnalité), angles
au rapporteur, aire d'un rectangle (un mur, le sol de la varangue).
Science : le vent, la pluie, pourquoi un toit en pente évacue l'eau.

Exemple de défi QCM : « Sur le plan, la varangue mesure 4 cm. L'échelle est
1 cm pour 1 m. Quelle est sa vraie longueur ? » A. 40 cm · B. 4 m · C. 400 m.

Photos possibles : la maquette, le plan, une case (sans personne).

### Ce que l'architecte a ajouté (14/11)

**Ses consignes :**

- Il a prêté ses plans pour la classe. **On n'en publie aucun détail** :
  ni le plan, ni les cotes, ni une photo du plan. Ils servent seulement en
  classe. Les plans ne vont pas dans ce dépôt.
- **Le nom de son studio apparaît en bas de l'article**, en remerciement
  (« Merci au studio … pour son aide »). C'est son seul crédit.

**Son idée : la case change avec l'altitude.** Dans les Bas, il fait chaud
et le soleil tape : on fait de grandes avancées de toit et une varangue
profonde pour faire de l'ombre. Dans les Hauts, il fait plus frais et il
pleut plus : les avancées et les ouvertures ne sont pas les mêmes.

Cela donne une meilleure question de départ :
**« Pourquoi une case des Bas n'est pas construite comme une case des Hauts ? »**

Maths de 6e qu'on peut y mettre :

- **L'ombre de l'avancée.** Un bâton planté au soleil, on mesure son ombre
  à différentes heures. Plus l'avancée est longue, plus l'ombre protège la
  façade. Mesures, tableau, comparer.
- **La température qui baisse en montant.** Environ 6 °C de moins tous les
  1 000 m. On compare la côte et un village des Hauts (par exemple vers
  1 200 m) avec un tableau et une soustraction de décimaux.
- **L'échelle** sur des dessins simples faits par les élèves (pas sur ses
  plans).

Nouvel exemple de défi QCM : « Sur la côte, il fait 30 °C. Il fait environ
6 °C de moins tous les 1 000 m. Quelle température vers 1 000 m ? »
A. 36 °C · B. 24 °C · C. 6 °C.
