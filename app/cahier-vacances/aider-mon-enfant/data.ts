/* Cahier de vacances « Aider mon enfant » (public = PARENTS).
   15 jours : (re)découvrir les méthodes de l'école d'aujourd'hui pour
   accompagner son enfant, sans faire à sa place.
   S1 = les maths du primaire · S2 = le français · S3 = collège & méthode. */

import type { CahierParentsData, JourParent, MondeDemainParent } from "@/components/cahier/parents-types";

export const semaines: CahierParentsData["semaines"] = [
  {
    numero: 1,
    titre: "Les maths du primaire",
    intro: "Division, fractions, soustraction, proportionnalité, décimaux — les méthodes qui ont le plus changé.",
  },
  {
    numero: 2,
    titre: "Le français",
    intro: "Accords, nature et fonction, homophones, conjugaison, comprendre un texte.",
  },
  {
    numero: 3,
    titre: "Le collège & la méthode",
    intro: "Priorités, Pythagore, aider aux devoirs, apprendre une leçon, le numérique scolaire.",
  },
];

export const jours: JourParent[] = [
  /* ===================== SEMAINE 1 — Les maths du primaire ===================== */
  {
    numero: 1,
    semaine: 1,
    domaine: "maths",
    theme: "La division posée",
    niveau: "CM1 · CM2",
    methode: {
      intro:
        "On apprend la division posée « en potence ». On traite le dividende chiffre par chiffre, de gauche à droite, en répétant toujours les mêmes quatre étapes à voix haute.",
      etapes: [
        "Diviser : combien de fois le diviseur tient-il ? (ex. combien de fois 4 dans 9 → 2)",
        "Multiplier : 2 × 4 = 8",
        "Soustraire : 9 − 8 = 1",
        "Abaisser le chiffre suivant et recommencer.",
      ],
    },
    aChange:
      "Beaucoup de parents ont appris à poser sans nommer les étapes. Aujourd'hui l'enfant récite « je divise, je multiplie, je soustrais, j'abaisse » : c'est normal, laissez-le faire.",
    exercices: [
      { q: "96 ÷ 4 =", r: "24" },
      { q: "85 ÷ 5 =", r: "17" },
      { q: "738 ÷ 6 =", r: "123" },
    ],
    aider: [
      "Faites-lui dire les 4 mots à voix haute à chaque étape : diviser, multiplier, soustraire, abaisser.",
      "Vérifiez ensemble : quotient × diviseur (+ reste) doit redonner le dividende.",
      "Ne donnez pas le résultat ; relancez par « combien de fois 6 tient dans 7 ? ».",
    ],
    mot: {
      mot: "dividende / diviseur",
      definition:
        "Dans 96 ÷ 4 : 96 est le dividende (le nombre à partager), 4 le diviseur (en combien de parts).",
    },
    geste: {
      titre: "Vérifier à la calculatrice",
      texte:
        "Montrez-lui à contrôler son résultat avec la calculatrice du téléphone — vérifier, pas remplacer le calcul.",
    },
    piege: {
      titre: "l'oubli du zéro",
      texte:
        "Quand le diviseur ne tient pas dans le chiffre abaissé, il faut écrire un 0 au quotient. C'est l'erreur la plus fréquente.",
    },
  },
  {
    numero: 2,
    semaine: 1,
    domaine: "maths",
    theme: "Les fractions",
    niveau: "CM1 · CM2 · 6e",
    methode: {
      intro:
        "Une fraction, c'est un partage : 3/4 = on coupe en 4 parts égales et on en prend 3. On l'introduit avec des images (parts de gâteau, bandes de papier) avant tout calcul, on les place sur une droite graduée et on repère les fractions égales (1/2 = 2/4).",
    },
    aChange:
      "On insiste bien plus qu'avant sur le SENS (manipuler, dessiner) avant les règles. Les calculs sur les fractions ne viennent qu'au collège.",
    exercices: [
      { q: "On prend 2 parts sur 8 : quelle fraction ?", r: "2/8, soit 1/4" },
      { q: "3/4 est-il plus ou moins que 1/2 ?", r: "Plus (1/2 = 2/4, donc 3/4 > 1/2)" },
      { q: "Une fraction égale à 1/3 ?", r: "2/6 (ou 3/9, 4/12...)" },
    ],
    aider: [
      "Manipulez du réel : une tablette de chocolat, une pizza, une bande de papier pliée.",
      "Reliez au quotidien : « la moitié », « un quart d'heure », « les trois quarts du verre ».",
      "Montrez que 1/2 > 1/3 : plus on partage, plus les parts sont petites.",
    ],
    mot: {
      mot: "numérateur / dénominateur",
      definition:
        "Dans 3/4 : le 4 (en bas, dénominateur) = nombre de parts ; le 3 (en haut, numérateur) = parts prises.",
    },
    geste: {
      titre: "Une courte vidéo",
      texte:
        "Cherchez ensemble une vidéo « fractions CM1 » : le visuel débloque souvent ce qui coince.",
    },
    piege: {
      titre: "« plus le nombre est grand, plus c'est grand »",
      texte: "Faux : 1/8 est PLUS PETIT que 1/4. Contre-intuitif, à montrer avec un dessin.",
    },
  },
  {
    numero: 3,
    semaine: 1,
    domaine: "maths",
    theme: "La soustraction avec retenue",
    niveau: "CE2 · CM1",
    methode: {
      intro:
        "Pour 52 − 17, on ne peut pas faire 2 − 7. On enseigne surtout la méthode par « cassage » : on transforme 52 en 4 dizaines + 12 unités, puis 12 − 7 = 5 et 4 − 1 = 3.",
    },
    aChange:
      "C'est LE grand changement. Beaucoup de parents ont appris la méthode « par compensation » (+1 en haut et +1 en bas). L'école privilégie aujourd'hui le « cassage », jugé plus logique. Si vous montrez votre méthode, l'enfant peut être perdu.",
    exercices: [
      { q: "52 − 17 =", r: "35" },
      { q: "83 − 46 =", r: "37" },
      { q: "604 − 158 =", r: "446" },
    ],
    aider: [
      "Demandez-lui SA méthode et suivez-la, même si ce n'est pas la vôtre.",
      "Matérialisez avec des pièces : « casser » une pièce de 10 en 10 pièces de 1.",
      "Évitez « moi, je faisais autrement » : ça brouille tout.",
    ],
    mot: {
      mot: "la retenue",
      definition:
        "La dizaine (ou centaine) qu'on « emprunte » au rang supérieur quand on ne peut pas soustraire directement.",
    },
    geste: {
      titre: "Repérer la méthode du cahier",
      texte:
        "Ouvrez le cahier de leçons (papier ou ENT) pour voir exactement la méthode enseignée cette année.",
    },
    piege: {
      titre: "mélanger deux méthodes",
      texte:
        "Compensation et cassage donnent le même résultat mais s'écrivent différemment. N'en mélangez pas les notations.",
    },
  },
  {
    numero: 4,
    semaine: 1,
    domaine: "maths",
    theme: "La proportionnalité",
    niveau: "CM2 · 6e",
    methode: {
      intro:
        "« 3 croissants coûtent 2,40 €, combien coûtent 5 croissants ? » On apprend à reconnaître une situation de proportionnalité et à la résoudre par un tableau ou par le « retour à l'unité » (le prix d'un seul croissant).",
    },
    aChange:
      "La « règle de trois » existe toujours, mais on passe d'abord par le tableau de proportionnalité et le retour à l'unité, jugés plus compréhensibles.",
    exercices: [
      { q: "3 croissants = 2,40 €. Le prix d'1 croissant ?", r: "2,40 ÷ 3 = 0,80 €" },
      { q: "Donc 5 croissants ?", r: "0,80 × 5 = 4,00 €" },
      { q: "Recette pour 4 = 200 g de farine. Pour 6 ?", r: "50 g/personne × 6 = 300 g" },
    ],
    aider: [
      "Cuisinez ensemble : adapter une recette, c'est de la proportionnalité pure.",
      "Faites verbaliser : « combien pour 1 ? » puis « fois combien ? ».",
      "Les courses, l'essence, l'échelle d'une carte : des exemples partout.",
    ],
    mot: {
      mot: "coefficient de proportionnalité",
      definition:
        "Le nombre par lequel on multiplie pour passer d'une grandeur à l'autre (ici le prix unitaire, 0,80).",
    },
    geste: {
      titre: "Le tableur, plus tard",
      texte:
        "Au collège ces tableaux deviendront des tableurs (Excel, Sheets) — un outil utile à connaître.",
    },
    piege: {
      titre: "additionner au lieu de multiplier",
      texte: "« De 3 à 5 croissants, donc +2 partout » est faux. La proportionnalité, c'est ×, pas +.",
    },
  },
  {
    numero: 5,
    semaine: 1,
    domaine: "maths",
    theme: "Les nombres décimaux",
    niveau: "CM1 · CM2",
    methode: {
      intro:
        "Dans 12,45, la virgule sépare la partie entière (12) des décimales. On lit « 12 unités, 4 dixièmes, 5 centièmes » — ce sont des partages de l'unité, pas « deux nombres collés ». Point clé : 2,5 = 2,50 (un zéro à droite ne change rien).",
    },
    aChange:
      "On ne dit plus « 12 virgule 45 » comme un bloc : on nomme dixièmes et centièmes pour donner du sens.",
    exercices: [
      { q: "Range du plus petit au plus grand : 2,5 ; 2,45 ; 2,09", r: "2,09 < 2,45 < 2,5" },
      { q: "3,7 = combien de dixièmes ?", r: "37 dixièmes" },
      { q: "Vrai ou faux : 4,8 < 4,12 ?", r: "Faux. 4,8 = 4,80 > 4,12" },
    ],
    aider: [
      "L'argent est l'allié n°1 : 2,50 € = 2 € et 50 centimes.",
      "Insistez sur le piège : 4,8 > 4,12 (8 dixièmes valent plus qu'1 dixième).",
      "La règle graduée et le mètre ruban rendent les décimaux concrets.",
    ],
    mot: {
      mot: "dixièmes, centièmes",
      definition:
        "Après la virgule : le 1er chiffre = dixièmes (1/10), le 2e = centièmes (1/100).",
    },
    geste: {
      titre: "Point ou virgule",
      texte:
        "Sur une calculatrice ou un téléphone, le séparateur décimal est souvent un point. Montrez-lui la différence.",
    },
    piege: {
      titre: "« plus de chiffres = plus grand »",
      texte: "4,12 a plus de chiffres que 4,8 mais est plus PETIT. On compare rang par rang.",
    },
  },

  /* ===================== SEMAINE 2 — Le français ===================== */
  {
    numero: 6,
    semaine: 2,
    domaine: "francais",
    theme: "L'accord du participe passé",
    niveau: "CM2 · collège",
    methode: {
      intro:
        "Avec ÊTRE, le participe passé s'accorde avec le sujet : « elles sont parties ». Avec AVOIR, il ne s'accorde pas avec le sujet… mais avec le COD si celui-ci est placé AVANT le verbe : « les fleurs que j'ai cueillies ».",
    },
    aChange:
      "La règle n'a pas changé, mais on l'aborde par étapes (d'abord être, puis avoir au collège). Inutile de noyer un CM2 avec le COD placé avant.",
    exercices: [
      { q: "Elle est (venir) ___ .", r: "venue" },
      { q: "Ils ont (manger) ___ la tarte.", r: "mangé (COD « la tarte » placé après → pas d'accord)" },
      { q: "La tarte qu'ils ont (manger) ___ .", r: "mangée (COD « que = la tarte » placé avant)" },
    ],
    aider: [
      "Astuce être : remplacez le participe par un adjectif (« elles sont contentes » → « parties »).",
      "Astuce avoir : cherchez le COD et demandez « est-il avant le verbe ? ».",
      "Au primaire, contentez-vous de l'accord avec être.",
    ],
    mot: {
      mot: "le COD (complément d'objet direct)",
      definition:
        "Ce qui subit l'action, sans préposition : « je mange QUOI ? la tarte ». C'est lui qui commande l'accord avec avoir.",
    },
    geste: {
      titre: "Le correcteur ne suffit pas",
      texte:
        "Montrez-lui que le correcteur orthographique rate souvent ces accords : il faut comprendre la règle.",
    },
    piege: {
      titre: "accorder avec avoir + sujet",
      texte: "« Les fleurs ont fanées » est faux (→ fané). Avec avoir, jamais d'accord avec le sujet.",
    },
  },
  {
    numero: 7,
    semaine: 2,
    domaine: "francais",
    theme: "Nature et fonction des mots",
    niveau: "CM1 · collège",
    methode: {
      intro:
        "Deux questions différentes. La NATURE, c'est ce qu'est le mot dans le dictionnaire (nom, verbe, adjectif, déterminant…). La FONCTION, c'est son rôle dans LA phrase (sujet, COD, complément…). Un même mot change de fonction selon la phrase, jamais de nature.",
    },
    aChange:
      "On distingue désormais clairement « classe grammaticale » (nature) et « fonction ». Beaucoup de parents mélangeaient les deux.",
    exercices: [
      { q: "« Le chat dort. » Nature et fonction de « chat » ?", r: "Nature : nom. Fonction : sujet." },
      { q: "« Je vois le chat. » Fonction de « chat » ?", r: "COD (la nature reste : nom)" },
      { q: "Nature de « rapidement » ?", r: "Adverbe" },
    ],
    aider: [
      "Image : la nature = la carte d'identité du mot ; la fonction = le métier qu'il occupe ce jour-là.",
      "Faites poser les questions : « qui fait l'action ? » (sujet), « fait quoi ? » (verbe).",
      "Surlignez sujet / verbe / compléments de trois couleurs.",
    ],
    mot: {
      mot: "classe grammaticale",
      definition:
        "Le nom savant de la « nature » d'un mot : nom, verbe, adjectif, déterminant, pronom, adverbe…",
    },
    geste: {
      titre: "Un dictionnaire en ligne",
      texte:
        "Apprenez-lui à vérifier la nature d'un mot sur un dictionnaire en ligne (les abréviations n., v., adj.).",
    },
    piege: {
      titre: "confondre nature et fonction",
      texte: "« Sujet » n'est pas une nature. Un sujet peut être un nom OU un pronom. Deux questions distinctes.",
    },
  },
  {
    numero: 8,
    semaine: 2,
    domaine: "francais",
    theme: "Les homophones (a/à, et/est, son/sont)",
    niveau: "CE2 · CM2",
    methode: {
      intro:
        "Des mots qui se prononcent pareil mais s'écrivent différemment : a/à, et/est, son/sont, ses/ces, on/ont. On apprend des « tests de remplacement » pour choisir à coup sûr.",
    },
    exercices: [
      { q: "Il ___ parti (a / à).", r: "a (« il avait parti » → verbe avoir → a)" },
      { q: "Mon père ___ ma mère (et / est).", r: "et (« et puis » → et)" },
      { q: "Ils ___ contents (son / sont).", r: "sont (« ils étaient » → sont)" },
    ],
    aider: [
      "Donnez le bon test : a/à → « avait » ; et/est → « était » ; son/sont → « étaient ».",
      "Ne corrigez pas par « c'est faux » : redonnez le test à appliquer.",
      "Affichez les tests sur le frigo le temps que ça rentre.",
    ],
    mot: {
      mot: "un homophone",
      definition:
        "Un mot qui se prononce comme un autre mais s'écrit différemment (a/à, ver/verre/vert/vers).",
    },
    geste: {
      titre: "Méfiance avec la dictée vocale",
      texte:
        "La dictée vocale du téléphone écrit souvent le mauvais homophone : parfait pour montrer qu'il faut relire.",
    },
    piege: {
      titre: "apprendre « par cœur » sans test",
      texte: "Mémoriser « à avec accent » ne marche pas. C'est le test de remplacement qui fiabilise le choix.",
    },
  },
  {
    numero: 9,
    semaine: 2,
    domaine: "francais",
    theme: "La conjugaison",
    niveau: "CE2 · CM2",
    methode: {
      intro:
        "On range les verbes en 3 groupes (1er : -er comme chanter ; 2e : -ir comme finir/finissons ; 3e : les irréguliers). On apprend les temps un par un (présent, futur, imparfait, passé composé) en repérant le radical et la terminaison.",
    },
    aChange:
      "On verbalise « radical + terminaison » et on travaille beaucoup les terminaisons régulières (-e, -es, -e, -ons, -ez, -ent au présent du 1er groupe).",
    exercices: [
      { q: "« chanter », présent, 3e pers. pluriel ?", r: "ils chantent" },
      { q: "« finir », présent, 1re pers. pluriel ?", r: "nous finissons" },
      { q: "« aller », futur, « je » ?", r: "j'irai" },
    ],
    aider: [
      "Faites réciter à voix haute, dans l'ordre des pronoms (je, tu, il…).",
      "Repérez séparément le radical (chant-) et la terminaison (-ons).",
      "Cinq minutes par jour valent mieux qu'une heure le dimanche.",
    ],
    mot: {
      mot: "radical et terminaison",
      definition:
        "« nous chantons » = radical (chant-) + terminaison (-ons). La terminaison change avec la personne et le temps.",
    },
    geste: {
      titre: "Un conjugueur en ligne",
      texte:
        "Montrez un conjugueur en ligne pour VÉRIFIER après avoir cherché — pas pour copier sans réfléchir.",
    },
    piege: {
      titre: "le -ent muet",
      texte: "« ils chantent » : le -ent final ne se prononce pas. À l'oral on n'entend rien, d'où les oublis à l'écrit.",
    },
  },
  {
    numero: 10,
    semaine: 2,
    domaine: "francais",
    theme: "Comprendre un texte et rédiger",
    niveau: "Cycle 3 (CM · 6e)",
    methode: {
      intro:
        "Pour répondre à une question sur un texte, on apprend à repérer où est l'information, à répondre par une PHRASE complète qui reprend les mots de la question, et à justifier « en citant le texte ».",
    },
    exercices: [
      { q: "« Pourquoi le loup a-t-il faim ? » À quoi ressemble une bonne réponse ?", r: "Une phrase complète : « Le loup a faim parce qu'il n'a rien mangé depuis trois jours. »" },
      { q: "Que veut dire « répondre en citant le texte » ?", r: "Recopier le passage exact qui prouve la réponse." },
      { q: "« Parce qu'il a pas mangé » : que corriger ?", r: "Phrase complète + négation : « parce qu'il n'a pas mangé »." },
    ],
    aider: [
      "Exigez la phrase complète : « Réponds avec une vraie phrase. »",
      "Faites surligner dans le texte l'endroit exact de la réponse.",
      "Pour rédiger : faites-lui dire à l'oral d'abord, puis écrire.",
    ],
    mot: {
      mot: "justifier / citer le texte",
      definition: "Prouver sa réponse en recopiant le passage du texte qui la montre.",
    },
    geste: {
      titre: "Lire à l'écran ≠ sur papier",
      texte:
        "On lit moins attentivement à l'écran. Pour un texte long, imprimez-le ou faites-le lire à voix haute.",
    },
    piege: {
      titre: "la réponse « télégramme »",
      texte: "« Oui. » ou « Parce que faim. » : la consigne attend une phrase complète qui reprend la question.",
    },
  },

  /* ===================== SEMAINE 3 — Collège & méthode ===================== */
  {
    numero: 11,
    semaine: 3,
    domaine: "maths",
    theme: "Les priorités opératoires",
    niveau: "5e · 4e",
    methode: {
      intro:
        "Dans 3 + 4 × 5, on ne calcule pas de gauche à droite : d'abord la multiplication (4 × 5 = 20), puis l'addition (3 + 20 = 23). L'ordre : parenthèses, puis × et ÷, puis + et −. C'est la base avant le calcul avec des lettres (calcul littéral).",
    },
    aChange:
      "Au collège arrivent les lettres : « 3x » signifie « 3 × x ». Beaucoup de parents décrochent là ; c'est juste un raccourci d'écriture.",
    exercices: [
      { q: "3 + 4 × 5 =", r: "23 (et non 35)" },
      { q: "(3 + 4) × 5 =", r: "35" },
      { q: "Si x = 2, combien vaut 3x + 1 ?", r: "3 × 2 + 1 = 7" },
    ],
    aider: [
      "Mémo : parenthèses d'abord, puis ×/÷, puis +/−.",
      "Rassurez : « 3x » = « 3 fois x », rien de magique.",
      "La calculatrice respecte ces priorités : faites tester 3 + 4 × 5.",
    ],
    mot: {
      mot: "le calcul littéral",
      definition:
        "Calculer avec des lettres qui remplacent des nombres (3x, a + b). La lettre est un nombre encore inconnu.",
    },
    geste: {
      titre: "La calculatrice scientifique",
      texte: "En mode scientifique (téléphone), elle gère parenthèses et priorités : un bon outil de vérification.",
    },
    piege: {
      titre: "calculer de gauche à droite",
      texte: "3 + 4 × 5 = 35 est l'erreur reine. La multiplication passe toujours avant l'addition.",
    },
  },
  {
    numero: 12,
    semaine: 3,
    domaine: "maths",
    theme: "Le théorème de Pythagore",
    niveau: "4e",
    methode: {
      intro:
        "Dans un triangle RECTANGLE, le carré du grand côté (l'hypoténuse) égale la somme des carrés des deux autres : a² + b² = c². Il sert à calculer une longueur qu'on ne peut pas mesurer directement.",
    },
    exercices: [
      { q: "Côtés 3 et 4 : longueur de l'hypoténuse ?", r: "3² + 4² = 9 + 16 = 25, donc √25 = 5" },
      { q: "Que veut dire « au carré » ?", r: "a² = a × a (donc 3² = 3 × 3 = 9)" },
      { q: "Pythagore marche-t-il sur tout triangle ?", r: "Non, seulement les triangles rectangles." },
    ],
    aider: [
      "Insistez sur la condition : triangle RECTANGLE, sinon ça ne s'applique pas.",
      "Montrez l'usage réel : vérifier un angle droit en maçonnerie (le fameux 3-4-5).",
      "« Au carré » = le nombre multiplié par lui-même : revoyez ça d'abord si besoin.",
    ],
    mot: {
      mot: "l'hypoténuse",
      definition: "Dans un triangle rectangle, le côté le plus long, opposé à l'angle droit.",
    },
    geste: {
      titre: "Une animation visuelle",
      texte: "Cherchez une animation « théorème de Pythagore » : voir les carrés s'emboîter débloque tout.",
    },
    piege: {
      titre: "oublier la racine carrée",
      texte: "On trouve c² = 25, mais la réponse est c = 5 (√25). Beaucoup s'arrêtent à 25.",
    },
  },
  {
    numero: 13,
    semaine: 3,
    domaine: "methode",
    theme: "Aider aux devoirs sans faire à la place",
    niveau: "Tous niveaux",
    methode: {
      intro:
        "Le piège n°1 du parent : donner la réponse. Aider, c'est faire réfléchir, pas dépanner. Règle d'or : posez des questions plutôt que des solutions, et laissez votre enfant tenir le crayon.",
    },
    aider: [
      "Demandez « par quoi tu commences ? » plutôt que de montrer.",
      "S'il bloque : « relis la consigne, regarde l'exemple de la leçon ».",
      "Acceptez l'erreur : une erreur cherchée vaut mieux qu'une bonne réponse donnée.",
      "Posez un cadre : un lieu calme, sans téléphone, une durée courte.",
      "S'il s'énerve, faites une pause : 10 minutes apaisées valent mieux qu'une heure de tension.",
    ],
    mot: {
      mot: "l'étayage",
      definition:
        "Aider juste ce qu'il faut pour que l'enfant réussisse presque seul, puis retirer l'aide peu à peu.",
    },
    geste: {
      titre: "Un coach qui ne donne pas la réponse",
      texte:
        "Un outil comme EleveAI fait deviner par étapes au lieu de livrer la solution : utile quand le temps ou la matière vous manquent.",
    },
    piege: {
      titre: "faire à sa place « pour aller plus vite »",
      texte: "Le devoir est juste… mais l'enfant n'a rien appris, et le contrôle le révélera.",
    },
  },
  {
    numero: 14,
    semaine: 3,
    domaine: "methode",
    theme: "Apprendre une leçon, mémoriser",
    niveau: "Tous niveaux",
    methode: {
      intro:
        "Relire n'est PAS apprendre. On retient en se TESTANT : fermer le cahier et essayer de redire. La mémoire se renforce quand on se rappelle activement, et quand on révise plusieurs fois à quelques jours d'intervalle.",
    },
    aider: [
      "Faites-lui FERMER le cahier et réciter de mémoire, puis vérifier.",
      "Interrogez-le, ou mieux : demandez-lui de VOUS expliquer la leçon.",
      "Espacez les révisions : J+1, J+3, J+7 ancrent bien mieux qu'une grosse séance.",
      "Fabriquez des cartes question-réponse (flashcards) à piocher.",
    ],
    mot: {
      mot: "la récupération active",
      definition:
        "Se forcer à retrouver l'information de mémoire (au lieu de relire) : la méthode la plus efficace pour apprendre.",
    },
    geste: {
      titre: "Des flashcards numériques",
      texte:
        "Des applis de cartes-mémoire (ou EleveAI) testent automatiquement et reviennent sur ce qui est fragile.",
    },
    piege: {
      titre: "« je l'ai relu trois fois »",
      texte: "Relire donne l'illusion de savoir. Tant qu'on n'a pas réussi à le redire cahier fermé, ce n'est pas acquis.",
    },
  },
  {
    numero: 15,
    semaine: 3,
    domaine: "methode",
    theme: "Le numérique scolaire et les écrans",
    niveau: "Tous niveaux",
    methode: {
      intro:
        "L'école est aussi en ligne : ENT, cahier de textes numérique (type Pronote), manuels, devoirs. Savoir s'y repérer fait partie de l'accompagnement — au même titre que protéger votre enfant des écrans mal dosés.",
    },
    aider: [
      "Repérez l'ENT / Pronote de l'établissement : devoirs, notes et mots des profs y sont.",
      "Convenez de règles d'écran claires (horaires, pas d'écran dans la chambre le soir).",
      "Apprenez-lui à distinguer une source fiable d'une arnaque ou d'un lien piégé.",
      "Le numérique aide quand il fait CHERCHER (exercices, coach) plutôt que regarder passivement.",
      "Montrez l'exemple : posez aussi votre téléphone aux devoirs et aux repas.",
    ],
    mot: {
      mot: "l'ENT",
      definition:
        "« Espace Numérique de Travail » : le site de l'école où l'on trouve devoirs, notes, ressources et messages.",
    },
    geste: {
      titre: "Se connecter à l'ENT",
      texte:
        "Si ce n'est pas fait, récupérez vos identifiants ENT auprès de l'établissement : c'est votre tableau de bord.",
    },
    piege: {
      titre: "« tout écran se vaut »",
      texte: "Une heure à chercher sur un exercice n'est pas une heure de vidéos passives. C'est l'usage qui compte, pas la seule durée.",
    },
  },
];

/* « En parler avec votre enfant » : une ouverture quotidienne, à la maison.
   Cycle histoire → écologie → futur. Angle PARENT : amorcer le dialogue,
   valoriser la curiosité, sans faire à la place ni angoisser. */
export const mondeDemain: Record<number, MondeDemainParent> = {
  1: {
    theme: "histoire",
    titre: "Calculer avant la calculatrice",
    texte:
      "Racontez-lui comment vous posiez vos opérations à la main, ou comment ses grands-parents comptaient au marché sans machine. Il verra que sa division a une longue histoire.",
  },
  2: {
    theme: "ecologie",
    titre: "Partager équitablement",
    texte:
      "Au prochain repas, demandez-lui de partager un fruit ou un gâteau en parts vraiment égales : une façon concrète de relier les fractions au goût de ne rien gaspiller.",
  },
  3: {
    theme: "futur",
    titre: "Les métiers des nombres",
    texte:
      "Glissez dans la conversation que beaucoup de métiers d'avenir manient les chiffres — météorologue, ingénieur, codeur. Demandez-lui ce qu'il aimerait, sans pression.",
  },
  4: {
    theme: "histoire",
    titre: "Les marchands d'autrefois",
    texte:
      "Évoquez les marchands ambulants et les petites boutiques de votre enfance, qui calculaient les prix de tête. La proportionnalité, c'est le calcul des étals d'hier et d'aujourd'hui.",
  },
  5: {
    theme: "ecologie",
    titre: "Lire une étiquette",
    texte:
      "Devant un emballage, observez ensemble les prix au kilo ou la quantité de sucre : décimaux et comparaisons servent à mieux consommer, et à moins se faire avoir.",
  },
  6: {
    theme: "futur",
    titre: "Écrire sans se tromper",
    texte:
      "Demandez-lui s'il pense que les machines écriront un jour à notre place. Profitez-en pour valoriser le fait de comprendre soi-même les accords, au-delà du correcteur.",
  },
  7: {
    theme: "histoire",
    titre: "Le français d'avant",
    texte:
      "Montrez-lui une vieille lettre de famille, une carte postale, ou parlez du créole de La Réunion : la langue change, et c'est passionnant d'en parler ensemble.",
  },
  8: {
    theme: "ecologie",
    titre: "Le mot juste sur la nature",
    texte:
      "En promenade, nommez précisément ce que vous voyez — un paille-en-queue, un filao, un letchi. Bien nommer le vivant, c'est déjà apprendre à y faire attention.",
  },
  9: {
    theme: "futur",
    titre: "Parler à une machine",
    texte:
      "Les assistants vocaux comprennent de mieux en mieux nos phrases. Demandez-lui pourquoi bien conjuguer et bien construire ses phrases restera utile, même avec ces outils.",
  },
  10: {
    theme: "histoire",
    titre: "Les histoires qu'on se transmet",
    texte:
      "Racontez-lui un conte, une légende péi ou un souvenir de famille, puis demandez-lui de vous le redire à sa façon : comprendre et restituer un récit, ça se cultive à l'oral aussi.",
  },
  11: {
    theme: "ecologie",
    titre: "Compter ce qu'on consomme",
    texte:
      "Estimez ensemble la facture d'eau ou d'électricité du mois : les priorités de calcul deviennent concrètes quand il s'agit de comprendre ce que la maison dépense.",
  },
  12: {
    theme: "futur",
    titre: "Mesurer l'inaccessible",
    texte:
      "Expliquez-lui qu'on mesure la hauteur du Piton des Neiges ou la distance des étoiles sans y grimper. Pythagore et la géométrie ouvrent sur l'astronomie et l'ingénierie de demain.",
  },
  13: {
    theme: "histoire",
    titre: "Apprendre, hier et aujourd'hui",
    texte:
      "Parlez-lui de l'école de votre enfance — l'ardoise, les leçons par cœur, le maître unique. Il mesurera que les méthodes évoluent, et que vous apprenez encore à ses côtés.",
  },
  14: {
    theme: "ecologie",
    titre: "Une mémoire qui dure",
    texte:
      "Comparez la mémoire à un jardin : ce qu'on entretient un peu chaque jour prend racine. Un parallèle simple pour parler patience et efforts réguliers, sans le presser.",
  },
  15: {
    theme: "futur",
    titre: "Grandir avec les écrans",
    texte:
      "Demandez-lui à quoi ressembleront l'école et les outils numériques quand il sera grand. Un échange ouvert vaut mieux qu'une interdiction : on apprend à choisir ses usages.",
  },
};
