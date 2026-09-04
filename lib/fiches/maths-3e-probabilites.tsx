// ─── Fiche de cours : probabilités (3e) ───────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/probabilites.bank.ts, notionId `proba_experience`, 80 items).
//
// ⭐⭐ L'ARBRE EST ICI AUTORISÉ, ET C'EST TOUT LE SUJET DE LA FICHE. En 4e, il a
// fallu RETIRER un arbre de probabilités que j'avais inventé : les attendus
// s'arrêtent avant, et la banque de 4e ne parle que de l'événement contraire et
// des bornes 0 et 1 (voir le commentaire de `maths-4e-probabilites.tsx`). En 3e,
// la micro `proba_deux_epreuve` existe, et la banque demande explicitement
// « on représente une expérience à deux épreuves par un arbre — si chaque
// épreuve a 3 issues, combien de branches complètes ? ». Le canvas `arbre_proba`
// est donc employé ici, et il ne l'aurait pas été un an plus tôt.
// 👉 C'est la SEULE micro de cette notion qui n'existe pas en 4e — mesuré : 5
// micros sur 8 y sont communes. La fiche doit donc porter son poids sur les
// deux épreuves, et traiter le reste en consolidation.
//
// ⭐ LES 80 ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE — la règle du 31/08, née
// précisément de cet arbre inventé en 4e :
//   proba_vocabulaire        → expérience aléatoire, issue, événement, bornes
//   proba_issue              → compter les issues (dé, urne, roue, jetons)
//   proba_equiprobabilite    → même chance, et le dé truqué qui ne l'a pas
//   proba_evenement          → un événement est un ENSEMBLE d'issues
//   proba_calculer           → favorables ÷ possibles
//   proba_evenement_contraire → P(A) + P(A barre) = 1
//   proba_deux_epreuve       → l'arbre, le produit le long d'un chemin
//   proba_defi               → les bornes, et les erreurs classiques
//
// ⛔ LE PIÈGE DES BILLES EST DANS LA BANQUE, MOT POUR MOT : « un élève dit :
// s'il y a 3 billes rouges et 5 bleues, la probabilité de tirer rouge est 3/5.
// A-t-il raison ? » — non, c'est 3/8. Le dénominateur est le nombre TOTAL de
// billes, pas celui des autres. C'est l'erreur la plus fréquente du chapitre, et
// elle a sa propre ligne dans les pièges.
//
// ⛔⛔ ET POURTANT LE CANVAS `arbre_proba` N'EST PAS EMPLOYÉ ICI — mesuré, pas
// choisi. Ses colonnes sont codées en dur, `COL_X = [24, 168, 320]` : il lui
// faut un cadre d'environ 340 px. Or `scripts/mesurer-largeurs-blocs.mjs`
// montre qu'AUCUN emplacement de dessin d'une fiche ne dépasse 225 px, ni la
// carte de propriété, ni la figure de référence, ni « La formule » (217), et
// l'exemple descend à 199 sur téléphone. Un arbre à sa largeur native y serait
// affiché au ratio 0,63, soit une police finale de 7,5 px — pour un plancher
// mesuré à 11.
// 👉 La propriété enseigne donc la RÈGLE DU PRODUIT par un tableau, et l'exemple
// énumère les quatre issues PP, PF, FP, FF. L'élève voit le comptage ; il ne
// voit pas l'arbre.
// ⚠️ LA VRAIE RÉPARATION EST DANS LE CANVAS, et elle est à demander à Frédéric :
// rendre `COL_X` proportionnel à la largeur, exactement comme il l'a autorisé
// pour `ThalesCanvas` le 31/08 (`const k = width / 340`, qui vaut 1 à la taille
// par défaut, donc sortie inchangée pour toutes les banques existantes). Le
// canvas sert aussi la 2de, la 1re, la terminale et la STMG : la correction
// profiterait à cinq classes. ⛔ `lib/canvas/**` est partagé — on prévient
// AVANT d'y toucher.
//
// ⚠️ `schema_barre` EST EMPLOYÉ POUR P(A) + P(A barre) = 1, ET C'EST LÉGITIME.
// Le canvas donne à chaque part une longueur proportionnelle à sa valeur (voir
// `maths-3e-calcul-litteral.tsx`, où cela rendait un dessin FAUX) : ici les deux
// parts sont des probabilités, donc de même nature, et 0,3 doit effectivement
// occuper trois dixièmes de la barre. La proportionnalité dit la vérité.
//
// ⚠️ LES LIBELLÉS DES DESSINS SONT EN ÉCRITURE SIMPLE : ils sont tracés en
// <text> SVG, où du LaTeX s'afficherait en clair.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut porter du LaTeX.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⚠️ LES LARGEURS SONT CELLES MESURÉES SUR TÉLÉPHONE DE 375 px : 222 px pour
// une carte de propriété, 216 px pour « La formule », 200 px pour un exemple.
const tableau = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" | "formule" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "tableau_donnees",
        display: { compact: true, striped: true },
        size: {
          width: bloc === "exemple" ? 200 : bloc === "formule" ? 216 : 222,
        },
        ...data,
      } as never
    }
  />
);

/** Le matériel de l'expérience : dé, roue, urne de billes. */
const materiel = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "probabilites",
        size: { width: bloc === "exemple" ? 200 : 222, height: 170 },
        ...data,
      } as never
    }
  />
);

export const ficheProbabilites3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "proba-experience",
  titre: "Probabilités : issues, événements et deux épreuves",
  accroche:
    "Personne ne sait sur quelle face un dé va tomber, et pourtant on peut affirmer sans se tromper qu'il donnera un nombre pair une fois sur deux. C'est tout le paradoxe des probabilités : elles ne prédisent pas un résultat, elles mesurent une TENDANCE. La troisième ajoute une pièce décisive à ce que vous savez déjà — enchaîner deux expériences, et compter les possibilités qui en découlent.",
  identite: [
    { label: "La formule", valeur: "$P(A) = \\dfrac{\\text{cas favorables}}{\\text{cas possibles}}$, en équiprobabilité" },
    { label: "L'encadrement", valeur: "Une probabilité vaut toujours entre $0$ et $1$" },
    { label: "Le piège", valeur: "3 rouges et 5 bleues : $P(\\text{rouge}) = \\dfrac{3}{8}$, pas $\\dfrac{3}{5}$" },
  ],
  definition: {
    texte:
      "Une expérience aléatoire est une expérience dont on connaît tous les résultats possibles, mais dont on ne peut pas prévoir lequel se produira. Chacun de ces résultats s'appelle une ISSUE. Un ÉVÉNEMENT est un ensemble d'issues — par exemple « obtenir un nombre pair » réunit les issues 2, 4 et 6. La PROBABILITÉ d'un événement mesure sa chance de se réaliser : c'est un nombre compris entre 0 et 1, où 0 désigne un événement impossible et 1 un événement certain.",
  },
  figure: {
    schema: materiel({
      variant: "de",
      de: { faces: [1, 2, 3, 4, 5, 6], surligne: [2, 4, 6] },
    }),
    legende:
      "Six issues possibles, et trois d'entre elles réalisent l'événement « obtenir un nombre pair » : sa probabilité vaut donc $\\dfrac{3}{6}$, c'est-à-dire $\\dfrac{1}{2}$.",
  },
  proprietes: [
    {
      titre: "Le vocabulaire, en quatre mots",
      texte:
        "Une EXPÉRIENCE ALÉATOIRE a un résultat imprévisible mais des possibilités connues. Chaque résultat possible est une ISSUE. Un ÉVÉNEMENT regroupe une ou plusieurs issues. Enfin la PROBABILITÉ chiffre la chance de cet événement, entre 0 et 1. Lancer un dé est aléatoire ; mesurer la hauteur du piton des Neiges ne l'est pas, car le résultat ne change pas d'une fois sur l'autre.",
      schema: legende(
        tableau({
          headers: ["le mot", "ce qu'il désigne"],
          rows: [
            { values: ["expérience", "le lancer du dé"] },
            { values: ["issue", "un résultat : le 4"] },
            { values: ["événement", "« un nombre pair »"] },
            { values: ["probabilité", "un nombre de 0 à 1"] },
          ],
          caption: "du plus large au plus précis",
        }),
        "Une issue est un résultat unique ; un événement peut en réunir plusieurs."
      ),
      micros: ["proba_vocabulaire"],
    },
    {
      titre: "Compter les issues avant tout calcul",
      texte:
        "La première question à se poser est toujours : combien de résultats l'expérience peut-elle donner ? Un dé à six faces en donne 6, une pièce 2, une urne de 8 billes en donne 8 — une par bille, même si plusieurs partagent la même couleur. C'est ce dernier point qui fait trébucher : deux billes rouges sont DEUX issues, pas une.",
      schema: legende(
        materiel({
          variant: "billes",
          billes: {
            elements: [
              { couleur: "#dc2626" },
              { couleur: "#dc2626" },
              { couleur: "#dc2626" },
              { couleur: "#2563eb" },
              { couleur: "#2563eb" },
              { couleur: "#2563eb" },
              { couleur: "#2563eb" },
              { couleur: "#2563eb" },
            ],
          },
        }),
        "Huit billes, donc huit issues — même si l'on ne voit que deux couleurs."
      ),
      micros: ["proba_issue"],
    },
    {
      titre: "L'équiprobabilité n'est pas automatique",
      texte:
        "Une situation est équiprobable lorsque toutes les issues ont la même chance de se produire. C'est le cas d'un dé équilibré, d'une pièce, ou d'une roue dont les secteurs sont de MÊME TAILLE. Ce n'est pas le cas d'un dé truqué, ni d'une roue à secteurs inégaux. La distinction est décisive : la formule « favorables sur possibles » ne vaut QUE dans le cas équiprobable.",
      schema: legende(
        materiel({
          variant: "roue",
          roue: {
            segments: [
              { label: "A", poids: 1, couleur: "#dc2626" },
              { label: "B", poids: 1, couleur: "#2563eb" },
              { label: "C", poids: 1, couleur: "#16a34a" },
              { label: "D", poids: 1, couleur: "#f59e0b" },
            ],
          },
        }),
        "Quatre secteurs de même taille : chaque issue a la probabilité $\\dfrac{1}{4}$."
      ),
      micros: ["proba_equiprobabilite"],
    },
    {
      titre: "Un événement est un ensemble d'issues",
      texte:
        "Décrire un événement, c'est dire QUELLES issues le réalisent. Avec un dé, « obtenir au moins 5 » est réalisé par 5 et 6, donc par deux issues. Un événement réalisé par une seule issue s'appelle un événement élémentaire. Un événement que rien ne réalise est impossible, et sa probabilité vaut 0 — « obtenir 8 » avec un dé à six faces, par exemple.",
      schema: legende(
        materiel({
          variant: "de",
          de: { faces: [1, 2, 3, 4, 5, 6], surligne: [5, 6] },
        }),
        "« Obtenir au moins 5 » : deux issues sur six, donc $\\dfrac{2}{6} = \\dfrac{1}{3}$."
      ),
      micros: ["proba_evenement"],
    },
    {
      titre: "Calculer : favorables sur possibles",
      texte:
        "En situation d'équiprobabilité, la probabilité d'un événement est le nombre d'issues qui le réalisent divisé par le nombre total d'issues. Dans un sac de 3 billes rouges et 5 bleues, il y a 8 issues et 3 sont favorables au rouge : $P(\\text{rouge}) = \\dfrac{3}{8}$. Le dénominateur est le TOTAL, jamais le nombre des autres — écrire $\\dfrac{3}{5}$ est l'erreur la plus fréquente du chapitre.",
      schema: legende(
        tableau({
          headers: ["situation", "calcul", "résultat"],
          rows: [
            { values: ["3 rouges sur 8", "3 ÷ 8", "3/8"] },
            { values: ["nombre pair au dé", "3 ÷ 6", "1/2"] },
            { values: ["3 rouges, on écrit 3/5", "faux", "le total est 8"] },
          ],
          highlight: { row: 2 },
          caption: "le dénominateur est le total",
        }),
        "Compter d'abord le total, ensuite les favorables : jamais l'inverse."
      ),
      micros: ["proba_calculer"],
    },
    {
      titre: "L'événement contraire complète toujours à 1",
      texte:
        "L'événement contraire de $A$, noté $\\overline{A}$, est réalisé exactement quand $A$ ne l'est pas. Comme l'un des deux se produit forcément, leurs probabilités s'ajoutent pour donner 1 : $P(A) + P(\\overline{A}) = 1$. Si la probabilité de gagner vaut $0{,}3$, celle de perdre vaut donc $0{,}7$. C'est souvent le chemin le plus court : le contraire de « au moins un » est « aucun », bien plus facile à compter.",
      schema: legende(
        <CanvasRenderer
          figure={
            {
              kind: "schema_barre",
              size: { width: 222, height: 190 },
              title: "Gagner ou perdre",
              total: "1",
              parts: [
                { label: "gagner", value: "0,3" },
                { label: "perdre", value: "0,7" },
              ],
              questionLabel: "0,3 + 0,7 = 1",
            } as never
          }
        />,
        "Les deux parts couvrent toute la barre : il n'existe pas de troisième cas."
      ),
      micros: ["proba_evenement_contraire"],
    },
    {
      titre: "Deux épreuves : l'arbre et le produit",
      texte:
        "Quand une expérience en enchaîne deux, on dessine un ARBRE : le premier niveau porte les issues de la première épreuve, et chaque branche se ramifie selon la seconde. Le nombre de chemins complets est le PRODUIT des nombres d'issues — deux lancers d'une pièce donnent $2 \\times 2 = 4$ chemins, et deux épreuves à 3 issues en donnent 9. La probabilité d'un chemin s'obtient en multipliant les probabilités rencontrées le long de ce chemin.",
      schema: legende(
        tableau({
          headers: ["1re épreuve", "2e épreuve", "chemins"],
          rows: [
            { values: ["2 issues", "2 issues", "4"] },
            { values: ["3 issues", "3 issues", "9"] },
            { values: ["4 issues", "3 issues", "12"] },
          ],
          caption: "on multiplie, jamais on n'additionne",
        }),
        "Le nombre de chemins est le PRODUIT : quatre entrées et trois plats font douze menus, pas sept."
      ),
      micros: ["proba_deux_epreuve"],
    },
    {
      titre: "Ce qu'une probabilité ne peut pas être",
      texte:
        "Une probabilité ne dépasse jamais 1 et n'est jamais négative : un résultat comme $\\dfrac{7}{5}$ signale forcément une erreur de comptage. La valeur 0 désigne l'impossible, la valeur 1 le certain, et $0{,}5$ une chance sur deux. Un contrôle gratuit consiste donc à situer son résultat sur cet axe avant de l'écrire — s'il en sort, inutile de chercher plus loin.",
      schema: legende(
        <CanvasRenderer
          figure={
            {
              kind: "number_line",
              size: { width: 222, height: 120 },
              min: -0.2,
              max: 1.2,
              step: 1,
              points: [
                { value: 0, label: "impossible" },
                { value: 0.5, label: "1 sur 2" },
                { value: 1, label: "certain" },
              ],
              display: {
                showTicks: true,
                showValues: true,
                showPoints: true,
                showPointLabels: true,
                showZero: true,
              },
            } as never
          }
        />,
        "Toute probabilité vit sur ce segment : rien à gauche de 0, rien à droite de 1."
      ),
      micros: ["proba_defi", "proba_vocabulaire"],
    },
  ],
  reel: {
    texte:
      "Les probabilités décident bien plus de choses qu'un jeu de dés. Une prévision météo à La Réunion — « 70 % de risque de pluie sur les Hauts » — est une probabilité, et elle ne promet rien pour votre après-midi : elle dit qu'en observant beaucoup de journées semblables, il a plu dans sept cas sur dix. Une compagnie d'assurance fixe ses tarifs de la même façon, un laboratoire évalue ainsi l'efficacité d'un traitement, et un service de secours dimensionne ses équipes sur la probabilité d'un cyclone. Le point commun de tous ces usages est le contresens à éviter : une probabilité ne parle jamais du cas particulier, toujours de la répétition.",
  },
  historique: {
    texte:
      "En 1654, le chevalier de Méré, joueur passionné, pose à Blaise Pascal une question d'apparence anodine : si deux joueurs interrompent une partie avant la fin, comment partager équitablement les mises ? Pascal en discute par lettres avec Pierre de Fermat, et de cette correspondance naît le calcul des probabilités. Le détail qui compte est que la question était PRATIQUE, pas théorique — il s'agissait de rendre justice, non de décrire le hasard. Pendant longtemps, les mathématiciens avaient d'ailleurs jugé le hasard indigne d'étude, précisément parce qu'il semblait sans loi.",
  },
  formule: {
    contexte: "La probabilité d'un événement, en situation d'équiprobabilité",
    expression:
      "$P(A) = \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre d'issues possibles}}$",
    legende:
      "⚠️ La condition compte autant que la formule : elle ne vaut QUE si toutes les issues ont la même chance. Sur une roue à secteurs inégaux ou avec un dé truqué, compter les cas ne donne pas la probabilité — il faut alors les mesurer ou les lire dans l'énoncé.",
    schema: legende(
      tableau(
        {
          headers: ["événement", "favorables", "P"],
          rows: [
            { values: ["pair, avec un dé", "3 sur 6", "1/2"] },
            { values: ["rouge, 3 sur 8", "3 sur 8", "3/8"] },
            { values: ["obtenir 8, au dé", "0 sur 6", "0"] },
          ],
          caption: "toujours favorables ÷ possibles",
        },
        "formule"
      ),
      "Un événement impossible n'a aucune issue favorable : sa probabilité vaut 0."
    ),
  },
  methode: [
    {
      titre: "Toujours commencer par compter les issues",
      texte:
        "Avant de chercher la moindre probabilité, on établit le nombre total de résultats possibles. C'est le dénominateur, et c'est là que se joue l'erreur des billes : huit billes font huit issues, quelles que soient leurs couleurs.",
      micros: ["proba_issue", "proba_calculer"],
    },
    {
      titre: "Vérifier l'équiprobabilité avant d'appliquer la formule",
      texte:
        "On se demande si toutes les issues ont la même chance. Un dé équilibré, une pièce, une roue à secteurs égaux : oui. Un dé truqué, une roue à secteurs inégaux : non, et la formule ne s'applique plus.",
      micros: ["proba_equiprobabilite"],
    },
    {
      titre: "Passer par le contraire quand c'est plus court",
      texte:
        "Dès qu'un énoncé contient « au moins un », il faut penser au contraire, qui est « aucun » — presque toujours plus rapide à compter. On calcule $P(\\overline{A})$, puis on retranche de 1.",
      micros: ["proba_evenement_contraire"],
    },
    {
      titre: "Devant deux épreuves : dessiner l'arbre",
      texte:
        "On trace les branches de la première épreuve, puis on ramifie chacune selon la seconde. Le nombre de chemins se contrôle par un produit. Ensuite, la probabilité d'un chemin est le produit des probabilités portées par ses branches.",
      micros: ["proba_deux_epreuve"],
    },
    {
      titre: "Contrôler que le résultat tient entre 0 et 1",
      texte:
        "Un résultat supérieur à 1 ou négatif est nécessairement faux. Ce contrôle coûte une seconde et attrape la plupart des erreurs de dénominateur.",
      micros: ["proba_defi"],
    },
  ],
  usages: [
    {
      titre: "On me demande le nombre d'issues",
      detail:
        "Je compte tous les résultats possibles, un par objet distinct — huit billes font huit issues, même s'il n'y a que deux couleurs.",
      micros: ["proba_issue"],
    },
    {
      titre: "On me demande une probabilité simple",
      detail:
        "Je vérifie l'équiprobabilité, puis je divise le nombre d'issues favorables par le nombre total.",
      micros: ["proba_calculer", "proba_equiprobabilite"],
    },
    {
      titre: "On me donne $P(A)$ et on demande son contraire",
      detail: "Je retranche de 1 : $P(\\overline{A}) = 1 - P(A)$.",
      micros: ["proba_evenement_contraire"],
    },
    {
      titre: "L'expérience comporte deux étapes",
      detail:
        "Je dessine un arbre. Le nombre de chemins est le produit des nombres d'issues, et la probabilité d'un chemin le produit de ses branches.",
      micros: ["proba_deux_epreuve"],
    },
    {
      titre: "On me demande si une affirmation est possible",
      detail:
        "Je regarde d'abord si le nombre annoncé tient entre 0 et 1. Sinon, la réponse est non, sans autre calcul.",
      micros: ["proba_defi"],
    },
  ],
  exemples: [
    {
      titre: "Le sac de billes",
      donnees: "Un sac contient 3 billes rouges et 5 billes bleues.",
      question: "Quelle est la probabilité de tirer une bille rouge ?",
      solution:
        "On compte d'abord le TOTAL : $3 + 5 = 8$ billes, donc 8 issues, toutes également probables puisqu'on tire au hasard. Les issues favorables sont les 3 billes rouges. La probabilité vaut donc $\\dfrac{3}{8}$. ⛔ Répondre $\\dfrac{3}{5}$ est l'erreur classique : elle compare les rouges aux bleues au lieu de les comparer au total. Contrôle : $\\dfrac{3}{8}$ vaut $0{,}375$, un nombre bien compris entre 0 et 1, et inférieur à un demi — cohérent, puisqu'il y a moins de rouges que de bleues.",
      schema: legende(
        materiel(
          {
            variant: "billes",
            billes: {
              elements: [
                { couleur: "#dc2626" },
                { couleur: "#dc2626" },
                { couleur: "#dc2626" },
                { couleur: "#2563eb" },
                { couleur: "#2563eb" },
                { couleur: "#2563eb" },
                { couleur: "#2563eb" },
                { couleur: "#2563eb" },
              ],
            },
          },
          "exemple"
        ),
        "Trois rouges parmi huit billes : $\\dfrac{3}{8}$, et non $\\dfrac{3}{5}$."
      ),
      micros: ["proba_calculer", "proba_issue"],
    },
    {
      titre: "Gagner, ou perdre",
      donnees: "La probabilité de gagner à un jeu est $0{,}3$.",
      question: "Quelle est la probabilité de perdre ?",
      solution:
        "Gagner et perdre sont deux événements contraires : l'un des deux se produit forcément, et jamais les deux ensemble. Leurs probabilités s'ajoutent donc pour donner 1, d'où $P(\\text{perdre}) = 1 - 0{,}3 = 0{,}7$. Répondre $0{,}3$ également serait absurde : la somme ferait $0{,}6$, et il manquerait $0{,}4$ de chances qui ne mèneraient nulle part.",
      micros: ["proba_evenement_contraire"],
    },
    {
      titre: "Deux lancers d'une pièce",
      donnees: "On lance deux fois de suite une pièce équilibrée.",
      question: "Combien y a-t-il d'issues, et quelle est la probabilité d'obtenir exactement une fois pile ?",
      solution:
        "Chaque lancer a 2 issues, donc l'expérience complète en a $2 \\times 2 = 4$ : PP, PF, FP et FF. Elles sont équiprobables, chacune de probabilité $\\dfrac{1}{4}$. « Exactement une fois pile » est réalisé par DEUX de ces issues — PF et FP — et non par une seule : la probabilité vaut donc $\\dfrac{2}{4} = \\dfrac{1}{2}$. ⛔ L'oubli de FP est l'erreur habituelle : l'ordre compte, et deux chemins différents mènent au même résultat.",
      schema: legende(
        tableau(
          {
            headers: ["1er", "2e", "une fois pile ?"],
            rows: [
              { values: ["P", "P", "non"] },
              { values: ["P", "F", "oui"] },
              { values: ["F", "P", "oui"] },
              { values: ["F", "F", "non"] },
            ],
            caption: "deux chemins sur quatre",
          },
          "exemple"
        ),
        "PF et FP sont deux issues distinctes : l'ordre du tirage compte."
      ),
      micros: ["proba_deux_epreuve"],
    },
    {
      titre: "Le menu du snack",
      donnees: "Un snack propose 4 entrées et 3 plats.",
      question: "Combien de menus différents peut-on composer ?",
      solution:
        "C'est une expérience à deux épreuves : choisir l'entrée, puis le plat. Chaque entrée peut être suivie de l'un quelconque des 3 plats, donc le nombre de menus est $4 \\times 3 = 12$. On le retrouve sur un arbre : 4 branches au premier niveau, chacune se ramifiant en 3, ce qui donne bien 12 chemins complets. La règle vaut à chaque fois : le nombre de chemins est le PRODUIT des nombres d'issues, jamais leur somme.",
      micros: ["proba_deux_epreuve"],
    },
  ],
  pieges: [
    "Écrire $P(\\text{rouge}) = \\dfrac{3}{5}$ pour 3 billes rouges et 5 bleues. Le dénominateur est le TOTAL, soit 8 : la réponse est $\\dfrac{3}{8}$.",
    "Croire que $P(\\overline{A})$ vaut $P(A)$. Elles s'ajoutent pour donner 1 : si $P(A) = 0{,}3$, alors $P(\\overline{A}) = 0{,}7$.",
    "Annoncer une probabilité supérieure à 1 ou négative. C'est toujours le signe d'une erreur de comptage, jamais un résultat.",
    "Additionner les nombres d'issues de deux épreuves. Ils se MULTIPLIENT : 4 entrées et 3 plats font 12 menus, pas 7.",
    "Oublier qu'un ordre différent est une issue différente : « exactement une fois pile » sur deux lancers réunit PF ET FP.",
    "Appliquer « favorables sur possibles » à une roue à secteurs inégaux ou à un dé truqué : la formule suppose l'équiprobabilité.",
    "Compter deux billes de même couleur comme une seule issue. Huit billes font huit issues, quelles que soient leurs couleurs.",
  ],
  aRetenir: [
    "Une issue est un résultat ; un événement est un ensemble d'issues.",
    "Une probabilité est un nombre entre 0 et 1 : 0 pour l'impossible, 1 pour le certain.",
    "En équiprobabilité, $P(A) = \\dfrac{\\text{favorables}}{\\text{possibles}}$.",
    "$P(A) + P(\\overline{A}) = 1$ : le contraire complète toujours.",
    "Pour deux épreuves, le nombre de chemins est le PRODUIT des nombres d'issues.",
    "La probabilité d'un chemin de l'arbre est le produit des probabilités de ses branches.",
  ],
  entrainement: [
    {
      question: "Une probabilité est toujours un nombre compris entre quelles valeurs ?",
      correction:
        "Entre 0 et 1, bornes comprises. 0 correspond à un événement impossible et 1 à un événement certain.",
      micros: ["proba_vocabulaire"],
    },
    {
      question:
        "Un sac contient 4 billes rouges et 6 billes bleues. Combien y a-t-il d'issues possibles si l'on tire une bille ?",
      correction:
        "Dix : une par bille. Le nombre d'issues ne dépend pas des couleurs mais du nombre d'objets.",
      micros: ["proba_issue"],
    },
    {
      question: "Un dé truqué qui tombe plus souvent sur 6 est-il une situation d'équiprobabilité ?",
      correction:
        "Non. L'équiprobabilité exige que toutes les issues aient la même chance ; ici le 6 en a davantage, et la formule « favorables sur possibles » ne s'applique pas.",
      micros: ["proba_equiprobabilite"],
    },
    {
      question: "On lance un dé. Quelles issues réalisent l'événement « obtenir au moins 5 » ?",
      correction:
        "Les issues 5 et 6, soit deux issues sur six. La probabilité vaut $\\dfrac{2}{6} = \\dfrac{1}{3}$.",
      micros: ["proba_evenement"],
    },
    {
      question: "On lance un dé équilibré. Quelle est la probabilité d'obtenir un nombre pair ?",
      correction:
        "Trois issues sur six la réalisent — 2, 4 et 6 — donc $\\dfrac{3}{6} = \\dfrac{1}{2}$.",
      micros: ["proba_calculer"],
    },
    {
      question: "Si $P(A) = \\dfrac{1}{4}$, quelle est la probabilité de l'événement contraire ?",
      correction:
        "$P(\\overline{A}) = 1 - \\dfrac{1}{4} = \\dfrac{3}{4}$, puisque les deux probabilités s'ajoutent pour donner 1.",
      micros: ["proba_evenement_contraire"],
    },
    {
      question: "On lance deux fois une pièce. Combien y a-t-il d'issues possibles ? Les lister.",
      correction:
        "Quatre : PP, PF, FP et FF. On les obtient en multipliant $2 \\times 2$, et l'ordre distingue PF de FP.",
      micros: ["proba_deux_epreuve"],
    },
    {
      question:
        "On représente par un arbre une expérience à deux épreuves ayant chacune 3 issues. Combien de chemins complets comporte-t-il ?",
      correction:
        "Neuf : $3 \\times 3$. Chacune des 3 branches du premier niveau se ramifie en 3 branches au second.",
      micros: ["proba_deux_epreuve"],
    },
    {
      question:
        "Un élève dit : « s'il y a 3 billes rouges et 5 bleues, la probabilité de tirer rouge est $\\dfrac{3}{5}$ ». A-t-il raison ?",
      correction:
        "Non. Il compare les rouges aux bleues, alors qu'il faut les comparer au total, qui vaut 8. La probabilité est $\\dfrac{3}{8}$.",
      micros: ["proba_defi", "proba_calculer"],
    },
    {
      question:
        "Dans un panier, il y a 4 mangues, 3 ananas et 5 letchis. On prend un fruit au hasard. Quelle est la probabilité de prendre une mangue ?",
      correction:
        "Le total vaut $4 + 3 + 5 = 12$ fruits, et 4 sont favorables : $\\dfrac{4}{12} = \\dfrac{1}{3}$.",
      micros: ["proba_calculer"],
    },
  ],
  coachHref: "/coach?matiere=maths&classe=3e&notion=proba_experience",
};

// ─── Mode classe ───────────────────────────────────────────────────────────────
// ⛔ AUCUN LaTeX DANS CES DIAPOSITIVES. `ModeClasse` ne rend pas KaTeX : une
// formule écrite entre dollars s'afficherait EN CLAIR sur le tableau de la
// classe, code compris. Tout s'écrit donc en toutes lettres — ce qui est de
// toute façon la bonne façon de projeter, puisque le prof LIT la diapositive à
// voix haute.

export const slidesProbabilites3e: ClasseSlide[] = [
  {
    titre: "Prévoir sans savoir",
    badge: "Ce qu'on va faire",
    section: {
      type: "objectif",
      phrase: "Personne ne sait sur quelle face le dé va tomber",
      sousPhrase:
        "Et pourtant, on peut affirmer sans se tromper qu'il donnera un nombre pair une fois sur deux. Les probabilités ne prédisent pas un résultat : elles mesurent une tendance.",
      encadre: {
        titre: "Ce qui est nouveau en troisième",
        texte:
          "Enchaîner DEUX expériences — deux lancers, une entrée puis un plat — et compter toutes les possibilités qui en découlent.",
      },
    },
  },
  {
    titre: "Quatre mots à ne pas confondre",
    badge: "Le vocabulaire",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Expérience aléatoire",
          texte:
            "On connaît tous les résultats possibles, mais pas lequel sortira. Lancer un dé, oui. Mesurer la hauteur du piton des Neiges, non.",
        },
        {
          titre: "Issue",
          texte:
            "Un résultat possible, un seul. Le quatre est une issue du lancer de dé.",
        },
        {
          titre: "Événement",
          texte:
            "Un ensemble d'issues. Obtenir un nombre pair réunit trois issues : deux, quatre et six.",
        },
      ],
    },
  },
  {
    titre: "Compter d'abord, calculer ensuite",
    badge: "Le geste de base",
    section: {
      type: "etapes",
      etapes: [
        "Je compte le nombre total de résultats possibles. C'est le dénominateur.",
        "Attention : huit billes font huit issues, même si l'on ne voit que deux couleurs.",
        "Je compte ensuite combien de ces issues réalisent l'événement demandé.",
        "Je divise les favorables par les possibles, et je simplifie la fraction.",
      ],
    },
  },
  {
    titre: "L'erreur numéro un du chapitre",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on lit sur les copies",
        contenu:
          "Trois billes rouges et cinq bleues : la probabilité de tirer rouge est trois cinquièmes. On a comparé les rouges aux bleues.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qui est vrai",
        contenu:
          "Trois huitièmes. Le dénominateur est le TOTAL des billes, jamais le nombre des autres. Il y a huit billes dans le sac, donc huit issues.",
      },
    },
  },
  {
    titre: "La formule a une condition",
    badge: "L'équiprobabilité",
    teinte: "essentiel",
    section: {
      type: "objectif",
      phrase: "Favorables sur possibles, mais pas toujours",
      sousPhrase:
        "Cette formule ne vaut que si toutes les issues ont la même chance. Un dé équilibré, une pièce, une roue à secteurs égaux : oui.",
      encadre: {
        titre: "Quand elle ne s'applique pas",
        texte:
          "Un dé truqué, une roue dont les secteurs sont de tailles différentes. Compter les cas ne donne alors pas la probabilité : il faut la lire dans l'énoncé.",
      },
    },
  },
  {
    titre: "L'événement contraire",
    badge: "Le raccourci",
    section: {
      type: "objectif",
      phrase: "L'un des deux se produit forcément",
      sousPhrase:
        "Un événement et son contraire ne peuvent pas se produire ensemble, et l'un des deux arrive toujours. Leurs probabilités s'ajoutent donc pour faire un.",
      encadre: {
        titre: "Pourquoi c'est utile",
        texte:
          "Le contraire de « au moins un » est « aucun », presque toujours plus facile à compter. On calcule le contraire, puis on retranche de un.",
      },
    },
  },
  {
    titre: "Deux épreuves : on dessine l'arbre",
    badge: "La nouveauté de l'année",
    teinte: "essentiel",
    section: {
      type: "etapes",
      etapes: [
        "Je trace les branches de la première épreuve depuis un point de départ.",
        "Je ramifie chaque branche selon les issues de la seconde épreuve.",
        "Le nombre de chemins complets est le PRODUIT des nombres d'issues : deux lancers d'une pièce donnent quatre chemins.",
        "La probabilité d'un chemin est le produit des probabilités portées par ses branches.",
      ],
    },
  },
  {
    titre: "Le piège des deux épreuves",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "L'oubli classique",
        contenu:
          "Exactement une fois pile sur deux lancers : on ne compte qu'un seul cas, pile puis face.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qu'il faut voir",
        contenu:
          "Il y en a deux : pile puis face, ET face puis pile. Ce sont deux chemins différents de l'arbre. La probabilité vaut donc deux quarts, soit un demi.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce: "Un snack propose quatre entrées et trois plats.",
      question: "Combien de menus différents peut-on composer ?",
      correction:
        "C'est une expérience à deux épreuves : on choisit d'abord l'entrée, puis le plat. Chaque entrée peut être suivie de n'importe lequel des trois plats. Le nombre de menus est donc quatre fois trois, soit douze. On le retrouve sur l'arbre : quatre branches au premier niveau, et chacune se ramifie en trois, ce qui donne bien douze chemins complets. La règle à retenir est que le nombre de chemins est le PRODUIT des nombres d'issues, jamais leur somme — répondre sept serait l'erreur.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce: "La probabilité de gagner à un jeu est de zéro virgule trois.",
      question: "Quelle est la probabilité de perdre ?",
      indice: "Gagner et perdre sont deux événements contraires : que vaut leur somme ?",
      correction:
        "Gagner et perdre sont contraires : l'un des deux se produit forcément, et jamais les deux ensemble. Leurs probabilités s'ajoutent donc pour donner un. La probabilité de perdre vaut un moins zéro virgule trois, soit zéro virgule sept. Et l'on vérifie que le raisonnement tient : répondre zéro virgule trois également serait absurde, car la somme ferait zéro virgule six, et il manquerait quatre dixièmes de chances qui ne mèneraient nulle part.",
    },
  },
];
