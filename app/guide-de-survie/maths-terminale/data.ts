// ─── Guide de survie · Spé maths Terminale ──────────────────────────────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/maths/terminale-spe/notions.ts
// - checklists     = micro-compétences de microSkills.ts (libellés du BO)
// - test de survie = items "fixed" puisés dans les banques du coach
// Condensés écrits par 18 rédacteurs parallèles (workflow du 26/07) puis VÉRIFIÉS
// à la main contre le BO et les banques (exactitude des exemples, périmètre
// Terminale strict — pas de débordement vers le supérieur, couverture des micros).
// Ici on n'écrit QUE le condensé de survie ; checklists + tests sont dérivés.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/terminale-spe/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { suitesBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/suites.bank";
import { limitesSuitesBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/limites-suites.bank";
import { limitesFonctionsBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/limites-fonctions.bank";
import { continuiteTviBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/continuite-tvi.bank";
import { derivationBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/derivation.bank";
import { convexiteBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/convexite.bank";
import { exponentielleBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/exponentielle.bank";
import { logarithmeBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/logarithme.bank";
import { primitivesIntegralesBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/primitives-integrales.bank";
import { equationsDifferentiellesBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/equations-differentielles.bank";
import { denombrementBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/denombrement.bank";
import { geometrieEspaceBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/geometrie-espace.bank";
import { produitScalaireEspaceBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/produit-scalaire-espace.bank";
import { probabilitesConditionnellesBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/probabilites-conditionnelles.bank";
import { variablesAleatoiresBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/variables-aleatoires.bank";
import { loiBinomialeBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/loi-binomiale.bank";
import { concentrationBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/concentration.bank";
import { algorithmiquePythonBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/algorithmique-python.bank";
import type { KitData, KitNotion } from "@/components/kit/types";

// Checklists + tests dérivés du coach (module partagé par tous les guides).
const { microsDe, testDeSurvie } = kitHelpers(microSkills);

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  {
    id: "suite_numerique",
    emoji: "🪜",
    titre: "Suites numériques",
    domaine: "Analyse",
    essentiel:
      "Une suite, c'est une **fonction de l'entier $n$**. Deux façons de la définir : **explicite** ($u_n$ en fonction de $n$, calcul direct) ou **récurrente** ($u_{n+1}$ en fonction de $u_n$, terme par terme). Les deux modèles clés : **arithmétique** (on ajoute toujours $r$) et **géométrique** (on multiplie toujours par $q$). On étudie ensuite le **sens de variation** (signe de $u_{n+1}-u_n$), on prouve les propriétés **par récurrence**, et **monotone + bornée $\\Rightarrow$ converge**.",
    formules: [
      { label: "Arithmétique (raison $r$)", latex: "$u_{n+1}=u_n+r$ ; $u_n=u_0+nr$" },
      { label: "Géométrique (raison $q$)", latex: "$u_{n+1}=q\\,u_n$ ; $u_n=u_0\\,q^{\\,n}$" },
      { label: "Variations", latex: "$u_{n+1}-u_n\\ge 0\\Rightarrow$ croissante ; $\\le 0\\Rightarrow$ décroissante" },
      { label: "Récurrence (3 étapes)", latex: "Initialisation $P(0)$ ; Hérédité $P(n)\\Rightarrow P(n+1)$ ; Conclusion" },
      { label: "Convergence + limite", latex: "croissante+majorée $\\Rightarrow$ converge ; limite : $\\ell=a\\ell+b$" },
    ],
    reflexes: [
      { si: "« on ajoute toujours $r$ », $u_{n+1}=u_n+r$", alors: "arithmétique : $u_n=u_0+nr$" },
      { si: "« on multiplie toujours par $q$ », $u_{n+1}=q\\,u_n$", alors: "géométrique : $u_n=u_0\\,q^{\\,n}$" },
      { si: "« pour tout entier $n$ », propriété à prouver ($u_n\\ge 0$, $u_n\\le 2$…)", alors: "récurrence : initialisation PUIS hérédité" },
      { si: "« croissante et majorée » (ou décroissante et minorée)", alors: "elle converge, puis limite $\\ell=a\\ell+b$" },
    ],
    pieges: [
      "Confondre arithmétique (on AJOUTE $r$) et géométrique (on MULTIPLIE par $q$) : les formules $u_0+nr$ et $u_0 q^n$ n'ont rien à voir.",
      "Oublier l'initialisation dans une récurrence : l'hérédité seule ne prouve RIEN (pas de premier maillon, pas de chaîne).",
      "Résoudre $\\ell=a\\ell+b$ et annoncer « la limite est $\\ell$ » SANS avoir prouvé que la suite converge : c'est une limite candidate, pas une limite.",
    ],
    reel: "Ton livret d'épargne : verser $50$ € chaque mois, c'est une suite **arithmétique** ($+50$) ; laisser courir $3\\%$ d'intérêts, c'est une suite **géométrique** ($\\times 1{,}03$). Sur le long terme, la géométrique finit toujours par écraser l'arithmétique.",
  },
  {
    id: "limite_suite",
    emoji: "♾️",
    titre: "Limites de suites",
    domaine: "Analyse",
    essentiel:
      "Une suite **converge** quand elle admet une **limite finie** ; sinon elle **diverge** (vers $\\pm\\infty$, ou sans limite comme $(-1)^n$). On calcule à partir des **limites de référence** ($1/n$, $n^p$, $q^n$) et des **opérations**, en levant les **formes indéterminées**. Deux théorèmes débloquent le reste : **gendarmes** (encadrement) et **convergence monotone**.",
    formules: [
      { label: "Limites de référence", latex: "$\\lim\\tfrac1n=0$ ; $\\lim n^p=+\\infty$ ($p>0$) ; $\\lim q^n=0$ si $-1<q<1$, $+\\infty$ si $q>1$" },
      { label: "Opérations & formes indéterminées", latex: "$\\lim(u_n+v_n)=\\lim u_n+\\lim v_n$ ; à surveiller : $\\infty-\\infty$, $\\dfrac{\\infty}{\\infty}$, $0\\times\\infty$" },
      { label: "Comparaison & gendarmes", latex: "$u_n\\ge v_n\\to+\\infty\\Rightarrow u_n\\to+\\infty$ ; $v_n\\le u_n\\le w_n\\to\\ell\\Rightarrow u_n\\to\\ell$" },
      { label: "Convergence monotone", latex: "croissante et majorée $\\Rightarrow$ converge ; décroissante et minorée $\\Rightarrow$ converge" },
      { label: "Récurrence : limite candidate", latex: "si $u_{n+1}=a\\,u_n+b$ converge vers $\\ell$, alors $\\ell=a\\ell+b$" },
    ],
    reflexes: [
      { si: "quotient/somme donnant $\\dfrac{\\infty}{\\infty}$ ou $\\infty-\\infty$", alors: "factoriser par le terme dominant (souvent $n$) pour lever l'indétermination" },
      { si: "$\\sin n$, $\\cos n$ ou $(-1)^n$ au numérateur", alors: "encadrer entre $-1$ et $1$, puis gendarmes" },
      { si: "suite récurrente $u_{n+1}=a\\,u_n+b$", alors: "prouver la convergence D'ABORD (monotone + bornée), PUIS résoudre $\\ell=a\\ell+b$" },
      { si: "« croissante et majorée » dans l'énoncé", alors: "conclure convergente — le théorème donne l'existence, pas la valeur" },
    ],
    pieges: [
      "Écrire $\\ell=a\\ell+b$ sans avoir d'abord justifié la convergence : l'équation donne une limite candidate, jamais une preuve.",
      "Croire que « bornée » suffit pour converger : il faut monotone ET bornée ($(-1)^n$ est bornée mais diverge).",
      "Conclure sur $\\infty-\\infty$ ou $\\dfrac{\\infty}{\\infty}$ sans lever l'indétermination : ces formes ne valent NI $0$ NI $\\infty$ a priori.",
    ],
    reel: "Un médicament éliminé de moitié chaque jour puis redosé : $u_{n+1}=0{,}5\\,u_n+2$. La concentration se stabilise vers $\\ell=4$, le palier que vise le traitement.",
  },
  {
    id: "limite_fonction",
    emoji: "📉",
    titre: "Limites de fonctions",
    domaine: "Analyse",
    essentiel:
      "Une limite décrit **où va $f(x)$** quand $x$ file vers $\\pm\\infty$ ou s'approche d'une valeur. On récite les **limites de référence**, on **combine** par les opérations, et devant une **forme indéterminée** ($\\tfrac{\\infty}{\\infty}$, $\\infty-\\infty$, $\\tfrac00$) on factorise par le **terme de plus haut degré** avant de conclure.",
    formules: [
      { label: "Références en $+\\infty$", latex: "$\\lim x^n=+\\infty$ ; $\\lim\\dfrac1{x^n}=0$ ; $\\lim\\sqrt x=+\\infty$" },
      { label: "Inverse en $0$", latex: "$\\lim\\limits_{x\\to0^+}\\dfrac1x=+\\infty$ ; $\\lim\\limits_{x\\to0^-}\\dfrac1x=-\\infty$" },
      { label: "Formes indéterminées", latex: "$\\dfrac{\\infty}{\\infty}$ ; $\\infty-\\infty$ ; $0\\times\\infty$ ; $\\dfrac00$" },
      { label: "En $\\pm\\infty$ (polynôme, quotient)", latex: "terme dominant : $\\dfrac{ax^2+\\dots}{bx^2+\\dots}\\to\\dfrac ab$" },
      { label: "Asymptotes", latex: "$\\lim\\limits_{\\pm\\infty}f=\\ell\\Rightarrow y=\\ell$ ; $\\lim\\limits_{a}f=\\pm\\infty\\Rightarrow x=a$" },
    ],
    reflexes: [
      { si: "fonction usuelle ($x^n$, $\\tfrac1x$, $\\sqrt x$)", alors: "limite de référence à réciter, sans calcul" },
      { si: "polynôme ou quotient en $\\pm\\infty$", alors: "garder le(s) terme(s) de plus haut degré" },
      { si: "$f$ continue et $x\\to a$ (valeur autorisée)", alors: "on remplace : $\\lim f=f(a)$" },
      { si: "$\\tfrac00$ ou $\\infty-\\infty$ (indéterminée)", alors: "factoriser, simplifier, PUIS conclure" },
    ],
    pieges: [
      "Remplacer $x$ par une valeur **interdite** (dénominateur nul) : il faut étudier à gauche ET à droite.",
      "Conclure « $0$ » ou « $\\infty$ » sur une forme indéterminée ($\\tfrac{\\infty}{\\infty}$, $\\infty-\\infty$) sans l'avoir levée.",
      "Oublier le signe : $\\lim\\limits_{x\\to0^+}\\tfrac1x=+\\infty$ mais $\\lim\\limits_{x\\to0^-}\\tfrac1x=-\\infty$ — les deux limites latérales diffèrent.",
    ],
    reel: "Un cari qui refroidit sur la table : sa température file vers celle de la pièce sans jamais descendre en dessous — la température ambiante est son asymptote horizontale.",
  },
  {
    id: "continuite_tvi",
    emoji: "🎯",
    titre: "Continuité et TVI",
    domaine: "Analyse",
    essentiel:
      "Une fonction est **continue** si on peut tracer sa courbe **sans lever le crayon** (polynômes, $\\exp$, $\\ln$, racine, inverse le sont sur leur domaine). Le **TVI** : si $f$ est continue sur $[a\\,;b]$, elle prend **toute valeur** $k$ comprise entre $f(a)$ et $f(b)$, donc $f(x)=k$ a **au moins une solution**. Ajoute la **stricte monotonie** et cette solution devient **unique**.",
    formules: [
      { label: "TVI (existence)", latex: "$f$ continue sur $[a\\,;b]$ et $k$ entre $f(a)$ et $f(b)$ $\\Rightarrow$ il existe $c\\in[a\\,;b]$, $f(c)=k$" },
      { label: "Cas $f(x)=0$", latex: "$f(a)\\times f(b)<0 \\Rightarrow 0$ est encadré, donc une solution" },
      { label: "Corollaire (unicité)", latex: "continue $+$ strictement monotone $\\Rightarrow$ solution unique" },
      { label: "Monotonie via $f'$", latex: "$f'>0$ sur $I \\Rightarrow f$ strictement croissante sur $I$" },
      { label: "Fonctions continues", latex: "polynômes sur $\\mathbb{R}$ ; $\\exp$ sur $\\mathbb{R}$ ; $\\ln$ sur $]0\\,;+\\infty[$ ; dérivable $\\Rightarrow$ continue" },
    ],
    reflexes: [
      { si: "« il existe une solution », « au moins une »", alors: "TVI : citer la continuité $+$ $k$ entre $f(a)$ et $f(b)$" },
      { si: "« unique solution », « exactement une »", alors: "TVI $+$ stricte monotonie (signe de $f'$)" },
      { si: "$f(a)$ et $f(b)$ de signes contraires", alors: "$0$ est encadré $\\Rightarrow$ solution de $f(x)=0$" },
      { si: "on demande une valeur approchée", alors: "balayage / dichotomie à la calculatrice (le TVI ne donne pas $c$)" },
    ],
    pieges: [
      "Oublier de citer la **continuité** : sans elle le TVI ne s'applique pas. C'est la première ligne de la rédaction (souvent « $f$ polynôme donc continue sur $\\mathbb{R}$ »).",
      "Croire que le TVI donne l'**unicité** : il donne seulement l'**existence**. L'unicité vient de la stricte monotonie, justifiée par le signe de $f'$.",
      "Conclure « pas de solution » quand $k$ n'est pas entre $f(a)$ et $f(b)$ : le TVI ne permet pas de conclure, mais une solution peut exister quand même.",
    ],
    reel: "La température à Cilaos passe de 14 °C à l’aube à 26 °C à midi : continûment, elle est forcément passée par 20 °C à un instant précis. C’est exactement le TVI.",
  },
  {
    id: "derivation_fonction",
    emoji: "📈",
    titre: "Dérivation et variations",
    domaine: "Analyse",
    essentiel:
      "Dériver, c'est lire les **variations** dans le **signe de $f'$** : $f'>0$ la courbe **monte**, $f'<0$ elle **descend**, et là où $f'$ **s'annule en changeant de signe** se cache un **extremum**. Tout le reste, c'est appliquer les dérivées usuelles, les règles **produit/quotient** et la **composée** $(u^n)'=n\\,u'\\,u^{n-1}$.",
    formules: [
      { label: "Usuelles", latex: "$(x^n)'=n\\,x^{n-1}$ ; $(\\sqrt x)'=\\dfrac{1}{2\\sqrt x}$ ; $\\left(\\dfrac1x\\right)'=-\\dfrac1{x^2}$" },
      { label: "Produit et quotient", latex: "$(uv)'=u'v+uv'$ ; $\\left(\\dfrac uv\\right)'=\\dfrac{u'v-uv'}{v^2}$" },
      { label: "Composée", latex: "$(u^n)'=n\\,u'\\,u^{n-1}$ ; $(\\sqrt u)'=\\dfrac{u'}{2\\sqrt u}$" },
      { label: "Tangente en $a$", latex: "$y=f'(a)(x-a)+f(a)$" },
      { label: "Variations et extremum", latex: "$f'>0\\Rightarrow f\\nearrow$ ; $f'<0\\Rightarrow f\\searrow$ ; $f'(a)=0$ + changement de signe $\\Rightarrow$ extremum en $a$" },
    ],
    reflexes: [
      { si: "« tangente », « pente », « coefficient directeur »", alors: "calculer $f'(a)$, puis $y=f'(a)(x-a)+f(a)$" },
      { si: "« sens de variation », tableau de variations", alors: "étudier le **signe de $f'$** : $+$ ça monte, $-$ ça descend" },
      { si: "« maximum », « minimum », « optimiser »", alors: "résoudre $f'(x)=0$, puis regarder le **changement de signe**" },
      { si: "une puissance $(\\ldots)^n$ ou une $\\sqrt{\\ldots}$", alors: "composée : ne pas oublier de multiplier par $u'$" },
    ],
    pieges: [
      "Écrire $(uv)'=u'v'$ : FAUX — c'est $u'v+uv'$ ; et le quotient garde un signe moins : $u'v-uv'$.",
      "Dériver $(2x+1)^3$ en $3(2x+1)^2$ : il manque le facteur $u'=2$, la vraie dérivée est $6(2x+1)^2$.",
      "Croire que $f'(a)=0$ suffit pour un extremum : il faut que $f'$ **change de signe** (sinon simple palier, comme $x^3$ en $0$).",
    ],
    reel: "Un caillou lancé au-dessus du lagon de l'Ermitage : au point le plus haut, sa vitesse verticale s'annule — la dérivée de la hauteur passe du $+$ au $-$. Ce sommet, c'est l'optimum que traque tout problème d'optimisation.",
  },
  {
    id: "convexite_fonction",
    emoji: "🥣",
    titre: "Convexité",
    domaine: "Analyse",
    essentiel:
      "La convexité se lit sur le **signe de la dérivée seconde** : $f$ est **convexe** (courbe en vallée) quand $f''\\ge 0$, **concave** (colline) quand $f''\\le 0$. Une courbe convexe est **au-dessus de ses tangentes**, une concave au-dessous. Là où $f''$ **s'annule en changeant de signe**, la courbe change de convexité : c'est un **point d'inflexion**.",
    formules: [
      { label: "Critère du signe", latex: "$f$ convexe $\\iff f''\\ge 0$ ; $f$ concave $\\iff f''\\le 0$" },
      { label: "Lien avec $f'$", latex: "convexe $\\iff f'$ croissante ; concave $\\iff f'$ décroissante" },
      { label: "Position / tangentes", latex: "$\\mathcal C_f$ au-dessus de ses tangentes $\\iff$ convexe ; au-dessous $\\iff$ concave" },
      { label: "Point d'inflexion", latex: "en $a$ : $f''(a)=0$ ET $f''$ change de signe en $a$" },
      { label: "Inégalités clés", latex: "$e^x\\ge x+1$ ; $\\ln x\\le x-1$" },
    ],
    reflexes: [
      { si: "« étudier la convexité »", alors: "calculer $f''$ et dresser son tableau de **signe**" },
      { si: "« point d'inflexion »", alors: "résoudre $f''(x)=0$ PUIS vérifier le **changement de signe**" },
      { si: "courbe « au-dessus » / « au-dessous » de ses tangentes", alors: "convexe (au-dessus) / concave (au-dessous)" },
      { si: "montrer $e^x\\ge x+1$ ou $\\ln x\\le x-1$", alors: "convexité : $\\mathcal C_f$ du bon côté de la tangente (en $0$, en $1$)" },
    ],
    pieges: [
      "Confondre $f'$ (sens de variation) et $f''$ (convexité) : $f''>0$ ne dit RIEN sur la croissance de $f$.",
      "Croire que $f''(a)=0$ suffit pour un point d'inflexion : il faut le CHANGEMENT DE SIGNE (contre-exemple $x^4$ en $0$ : $f''(0)=0$ sans inflexion).",
      "Inverser la position : une fonction CONVEXE est au-DESSUS de ses tangentes, pas au-dessous.",
    ],
    reel: "Une mangue qui tombe de l'arbre : sa courbe distance–temps se creuse vers le haut, donc **convexe**. Sa dérivée seconde, c'est l'accélération $g\\approx 9{,}8$ — constante et positive, convexe partout.",
  },
  {
    id: "fonction_exponentielle",
    emoji: "🚀",
    titre: "Fonction exponentielle",
    domaine: "Analyse",
    essentiel:
      "$\\exp$ est LA fonction **égale à sa propre dérivée** : $(e^x)'=e^x$. Toujours **strictement positive** et **strictement croissante**, elle transforme les sommes en produits ($e^{a+b}=e^a e^b$). En Terminale, deux réflexes s'ajoutent : dériver une **composée** avec $(e^u)'=u'e^u$, et lever les indéterminations par **croissances comparées** — l'exponentielle l'emporte sur toute puissance de $x$.",
    formules: [
      { label: "Propriétés algébriques", latex: "$e^{a+b}=e^a e^b$ ; $e^{-a}=\\dfrac{1}{e^a}$ ; $\\dfrac{e^a}{e^b}=e^{a-b}$" },
      { label: "Dérivées", latex: "$(e^x)'=e^x$ ; $(e^{u})'=u'\\,e^{u}$" },
      { label: "Signe et équation", latex: "$e^x>0$ ; $\\exp$ strictement croissante ; $e^A=e^B\\iff A=B$" },
      { label: "Limites aux bornes", latex: "$\\displaystyle\\lim_{x\\to+\\infty}e^x=+\\infty$ ; $\\displaystyle\\lim_{x\\to-\\infty}e^x=0$" },
      { label: "Croissances comparées", latex: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{e^x}{x}=+\\infty$ ; $\\displaystyle\\lim_{x\\to-\\infty}x\\,e^x=0$" },
    ],
    reflexes: [
      { si: "équation ou inéquation $e^u=e^v$", alors: "$u=v$ (l'inégalité garde son sens : $\\exp$ est croissante)" },
      { si: "signe ou variations d'un produit avec $e^x$", alors: "seul l'autre facteur compte, car $e^x>0$" },
      { si: "dériver $e^u$", alors: "$(e^u)'=u'e^u$ — ex. $(e^{3x})'=3e^{3x}$" },
      { si: "indétermination $\\dfrac{e^x}{x}$, $x\\,e^x$… en $\\pm\\infty$", alors: "croissances comparées : l'exponentielle l'emporte" },
    ],
    pieges: [
      "Écrire $e^{a+b}=e^a+e^b$ : FAUX — la somme devient un PRODUIT $e^a e^b$.",
      "Dériver $e^{3x}$ en $e^{3x}$ : il manque le facteur $u'$, c'est $3e^{3x}$.",
      "Croire que $\\dfrac{e^x}{x}$ reste indéterminée en $+\\infty$ : par croissances comparées la limite est $+\\infty$.",
    ],
    reel: "Un plat sorti du four à Saint-Denis refroidit en $e^{-kt}$ : sa température retombe vers l'ambiance sans jamais tout à fait l'atteindre, car $\\displaystyle\\lim_{t\\to+\\infty}e^{-kt}=0$.",
  },
  {
    id: "fonction_logarithme",
    emoji: "🌱",
    titre: "Fonction logarithme népérien",
    domaine: "Analyse",
    essentiel:
      "$\\ln$ est la fonction **réciproque** de l'exponentielle : $\\ln(e^x)=x$ et $e^{\\ln x}=x$. Définie **seulement pour $x>0$**, elle est **strictement croissante** et transforme les **produits en sommes** : $\\ln(ab)=\\ln a+\\ln b$. Repères à connaître : $\\ln 1=0$ et $\\ln e=1$.",
    formules: [
      { label: "Propriétés algébriques", latex: "$\\ln(ab)=\\ln a+\\ln b$ ; $\\ln\\dfrac{a}{b}=\\ln a-\\ln b$ ; $\\ln(a^n)=n\\ln a$" },
      { label: "Réciprocité et repères", latex: "$\\ln(e^x)=x$ ; $e^{\\ln x}=x$ ; $\\ln 1=0$ ; $\\ln e=1$" },
      { label: "Dérivées", latex: "$(\\ln x)'=\\dfrac1x$ ; $(\\ln u)'=\\dfrac{u'}{u}$" },
      { label: "Limites aux bornes", latex: "$\\lim\\limits_{x\\to 0^+}\\ln x=-\\infty$ ; $\\lim\\limits_{x\\to +\\infty}\\ln x=+\\infty$" },
      { label: "Croissances comparées", latex: "$\\lim\\limits_{x\\to +\\infty}\\dfrac{\\ln x}{x}=0$ ; $\\lim\\limits_{x\\to 0^+}x\\ln x=0$" },
    ],
    reflexes: [
      { si: "équation $\\ln A=\\ln B$", alors: "$A=B$ — après avoir vérifié $A>0$ et $B>0$" },
      { si: "résoudre $\\ln x=k$", alors: "$x=e^k$ (on applique $\\exp$ des deux côtés)" },
      { si: "dériver un $\\ln(u)$", alors: "$\\dfrac{u'}{u}$ : dérivée de l'intérieur SUR l'intérieur" },
      { si: "forme $\\dfrac{\\ln x}{x}$ ou $x\\ln x$ en $+\\infty$ ou $0^+$", alors: "croissances comparées → la limite vaut $0$" },
    ],
    pieges: [
      "Écrire $\\ln(a+b)=\\ln a+\\ln b$ : FAUX — seul le PRODUIT devient une somme, jamais l'addition.",
      "Oublier le domaine : $\\ln x$ n'existe que pour $x>0$, donc on vérifie les conditions AVANT de résoudre une équation ou inéquation.",
      "Dériver $\\ln(3x+1)$ en $\\dfrac{1}{3x+1}$ : il manque $u'=3$ au numérateur — la dérivée est $\\dfrac{3}{3x+1}$.",
    ],
    reel: "L'échelle de Richter des séismes du Piton de la Fournaise est **logarithmique** : chaque cran de magnitude, c'est dix fois plus d'amplitude — un séisme de $5$ secoue dix fois plus fort qu'un séisme de $4$.",
  },
  {
    id: "primitive_integrale",
    emoji: "🟦",
    titre: "Primitives et intégrales",
    domaine: "Analyse",
    essentiel:
      "Une **primitive** $F$ de $f$ vérifie $F'=f$ : c'est l'opération **inverse de la dérivation**, et il en existe une infinité, toutes à une **constante** près. L'**intégrale** $\\displaystyle\\int_a^b f$ se calcule avec n'importe quelle primitive : $F(b)-F(a)$. Quand $f\\ge 0$, elle mesure l'**aire** sous la courbe.",
    formules: [
      { label: "Primitives usuelles", latex: "$x^n\\to\\dfrac{x^{n+1}}{n+1}$ ($n\\ne -1$) ; $k\\to kx$" },
      { label: "Exponentielle et inverse", latex: "$e^{ax}\\to\\dfrac1a\\,e^{ax}$ ; $\\dfrac1x\\to\\ln x$ (sur $]0;+\\infty[$)" },
      { label: "Théorème fondamental", latex: "$\\displaystyle\\int_a^b f(x)\\,dx=\\big[F(x)\\big]_a^b=F(b)-F(a)$" },
      { label: "Aire entre deux courbes", latex: "si $f\\ge g$ : aire $=\\displaystyle\\int_a^b\\big(f(x)-g(x)\\big)\\,dx$" },
      { label: "Valeur moyenne", latex: "$m=\\dfrac{1}{b-a}\\displaystyle\\int_a^b f(x)\\,dx$" },
    ],
    reflexes: [
      { si: "« une primitive de $x^n$ »", alors: "augmenter l'exposant, diviser par le nouveau : $\\dfrac{x^{n+1}}{n+1}$" },
      { si: "« calculer $\\displaystyle\\int_a^b f$ »", alors: "trouver UNE primitive $F$, puis $F(b)-F(a)$" },
      { si: "« aire », « unités d'aire »", alors: "intégrale de la courbe du haut moins celle du bas" },
      { si: "« valeur moyenne »", alors: "diviser l'intégrale par la longueur $b-a$" },
    ],
    pieges: [
      "Oublier de diviser par le nouvel exposant : une primitive de $x^2$ est $\\dfrac{x^3}{3}$, PAS $x^3$ (vérifie en dérivant).",
      "Confondre intégrale et aire : si $f\\le 0$, l'intégrale est négative et l'aire vaut $-\\displaystyle\\int_a^b f$.",
      "Rendre l'intégrale brute pour la valeur moyenne : il faut encore diviser par $b-a$.",
    ],
    reel: "Sur ton compteur, la distance parcourue est l'aire sous la courbe de vitesse ; ta vitesse moyenne, c'est cette aire divisée par la durée du trajet.",
  },
  {
    id: "equation_differentielle",
    emoji: "🌡️",
    titre: "Équations différentielles",
    domaine: "Analyse",
    essentiel:
      "Une équation différentielle relie une **fonction inconnue** $y$ et sa **dérivée** $y'$. Le programme se limite à deux modèles : $y'=ay$, dont les solutions sont $y=Ce^{ax}$, et $y'=ay+b$, dont les solutions ajoutent la **solution constante** $-\\dfrac{b}{a}$. Une **condition initiale** $y(0)$ fixe la constante $C$ et rend la solution **unique**.",
    formules: [
      { label: "Modèle $y'=ay$", latex: "$y=C\\,e^{ax}$, avec $C\\in\\mathbb{R}$" },
      { label: "Modèle $y'=ay+b$", latex: "$y=C\\,e^{ax}-\\dfrac{b}{a}$" },
      { label: "Solution constante", latex: "$y'=0\\Rightarrow 0=ay+b\\Rightarrow y=-\\dfrac{b}{a}$" },
      { label: "Constante $C$ (ex. $y'=ay$)", latex: "$y(0)=C\\,e^{0}=C$, donc $C=y(0)$" },
      { label: "Comportement", latex: "$a>0$ : explose ; $a<0$ : tend vers $-\\tfrac{b}{a}$" },
    ],
    reflexes: [
      { si: "l'énoncé montre $y'=ay$", alors: "$y=C\\,e^{ax}$ — le $a$ passe dans l'exposant, pas devant" },
      { si: "l'énoncé montre $y'=ay+b$", alors: "$y=C\\,e^{ax}-\\dfrac{b}{a}$ : ne jamais oublier la constante" },
      { si: "« vérifier que $f$ est solution »", alors: "calculer $f'$ et remplacer dans l'équation, jamais tracer" },
      { si: "condition initiale $y(0)=y_0$", alors: "poser $x=0$ (avec $e^{0}=1$) puis isoler $C$" },
    ],
    pieges: [
      "Oublier la solution constante et écrire $y=Ce^{ax}+b$ au lieu de $y=Ce^{ax}-\\dfrac{b}{a}$.",
      "Placer le coefficient au mauvais endroit : $y'=3y$ donne $Ce^{3x}$, surtout pas $3e^{x}$.",
      "Chercher $C$ avant d'avoir écrit la forme générale, ou oublier que $e^{0}=1$ en appliquant $y(0)$.",
    ],
    reel: "La désintégration d'un noyau radioactif suit $y'=ay$ avec $a<0$. Le refroidissement d'un cari sorti du feu suit $y'=a(y-T_{amb})$, donc $y'=ay+b$, et $y$ tend vers la température de la cuisine.",
  },
  {
    id: "denombrement_combinatoire",
    emoji: "🔢",
    titre: "Dénombrement et combinatoire",
    domaine: "Algèbre et géométrie",
    essentiel:
      "Dénombrer, c'est **compter les possibilités**. Deux réflexes de base : on **multiplie** des choix successifs (« puis »), on **additionne** des cas disjoints (« ou »). Ensuite une seule question tranche tout : **l'ordre compte-t-il ?** Oui $\\rightarrow$ **arrangement** ; non $\\rightarrow$ **combinaison** $\\binom{n}{k}$.",
    formules: [
      { label: "Deux principes", latex: "$n_1\\times n_2$ (choix successifs, « puis ») ; $n_1+n_2$ (cas disjoints, « ou »)" },
      { label: "Factorielle et permutations", latex: "$n!=n\\times(n-1)\\times\\cdots\\times1$ ; $0!=1$ ; ranger $n$ objets $=n!$" },
      { label: "Coefficient binomial", latex: "$\\binom{n}{k}=\\dfrac{n!}{k!\\,(n-k)!}$" },
      { label: "Symétrie et Pascal", latex: "$\\binom{n}{k}=\\binom{n}{n-k}$ ; $\\binom{n}{k}=\\binom{n-1}{k-1}+\\binom{n-1}{k}$" },
      { label: "Valeurs à connaître", latex: "$\\binom{n}{0}=\\binom{n}{n}=1$ ; $\\binom{n}{1}=n$" },
    ],
    reflexes: [
      { si: "« puis » / plusieurs étapes  vs  « ou » / cas séparés", alors: "on multiplie ($\\times$)  vs  on additionne ($+$)" },
      { si: "podium, code, mot de passe, tiercé « dans l'ordre »", alors: "l'ordre compte $\\rightarrow$ arrangement" },
      { si: "comité, main de cartes, équipe, salade de fruits", alors: "l'ordre est ignoré $\\rightarrow$ combinaison $\\binom{n}{k}$" },
      { si: "calculer $\\binom{n}{k}$ à la main", alors: "$\\dfrac{n(n-1)\\cdots}{k!}$ ($k$ facteurs en haut) ou on lit le triangle de Pascal" },
    ],
    pieges: [
      "Confondre arrangement (l'ordre compte) et combinaison (l'ordre est ignoré) : le « code » d'un cadenas n'est pas une « main » de cartes.",
      "Additionner des choix successifs au lieu de les multiplier : « étape 1 PUIS étape 2 » se multiplie.",
      "Oublier le $(n-k)!$ : $\\binom{n}{k}=\\dfrac{n!}{k!\\,(n-k)!}$, surtout pas $\\dfrac{n!}{k!}$.",
    ],
    reel: "Au Loto, ta grille de 5 numéros parmi 49 est une combinaison : l'ordre de sortie des boules ne change rien à ta grille — d'où les $\\binom{49}{5}$ grilles possibles.",
  },
  {
    id: "geometrie_espace",
    emoji: "🧊",
    titre: "Géométrie dans l’espace",
    domaine: "Algèbre et géométrie",
    essentiel:
      "Dans l'espace, tout se joue avec **trois coordonnées**. Un vecteur se lit « arrivée − départ » : $\\overrightarrow{AB}(x_B-x_A\\,;y_B-y_A\\,;z_B-z_A)$. Une **droite** se décrit par un point et un **vecteur directeur** ($M=A+t\\vec{u}$), un **plan** par une équation $ax+by+cz+d=0$ et son **vecteur normal** $\\vec{n}(a\\,;b\\,;c)$. Toutes les **positions relatives** se lisent en comparant ces vecteurs (colinéaires ? produit scalaire nul ?).",
    formules: [
      { label: "Vecteur & distance", latex: "$\\overrightarrow{AB}(x_B-x_A\\,;y_B-y_A\\,;z_B-z_A)$ ; $AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2+(z_B-z_A)^2}$" },
      { label: "Milieu de $[AB]$", latex: "$I\\left(\\dfrac{x_A+x_B}{2}\\,;\\dfrac{y_A+y_B}{2}\\,;\\dfrac{z_A+z_B}{2}\\right)$" },
      { label: "Droite : point $A$ + directeur $\\vec{u}(a\\,;b\\,;c)$", latex: "$\\begin{cases}x=x_A+a\\,t\\\\ y=y_A+b\\,t\\\\ z=z_A+c\\,t\\end{cases}\\ (t\\in\\mathbb{R})$" },
      { label: "Plan & normale $\\vec{n}$", latex: "$ax+by+cz+d=0$ de normale $\\vec{n}(a\\,;b\\,;c)$" },
      { label: "Droite / plan", latex: "$\\vec{u}\\cdot\\vec{n}=0\\Rightarrow$ droite $\\parallel$ plan ; $\\vec{u},\\vec{n}$ colinéaires $\\Rightarrow$ droite $\\perp$ plan" },
    ],
    reflexes: [
      { si: "« coordonnées du vecteur $\\overrightarrow{AB}$ »", alors: "arrivée − départ : $x_B-x_A$, $y_B-y_A$, $z_B-z_A$" },
      { si: "« représentation paramétrique », « vecteur directeur »", alors: "$\\vec{u}$ = les coefficients de $t$ ; le point $A$ s'obtient pour $t=0$" },
      { si: "équation de plan, « vecteur normal »", alors: "$\\vec{n}(a\\,;b\\,;c)$ = les coefficients de $x,y,z$" },
      { si: "position relative droite / plan", alors: "produit scalaire $\\vec{u}\\cdot\\vec{n}$ : nul $\\to$ parallèle, colinéaires $\\to$ perpendiculaire" },
    ],
    pieges: [
      "Calculer $\\overrightarrow{AB}$ en faisant $A-B$ : c'est $B-A$ (arrivée moins départ).",
      "Confondre vecteur directeur d'une droite et vecteur normal d'un plan : le directeur se lit sur les coefficients de $t$, le normal sur les coefficients de $x,y,z$.",
      "Croire que $\\vec{u}\\cdot\\vec{n}=0$ rend la droite perpendiculaire au plan : c'est l'inverse — nul $\\to$ parallèle, colinéaires $\\to$ perpendiculaire.",
    ],
    reel: "Un drone qui filme le cirque de Mafate se repère par trois nombres : longitude, latitude et altitude — exactement les coordonnées $(x\\,;y\\,;z)$ d'un point de l'espace.",
  },
  {
    id: "produit_scalaire_espace",
    emoji: "📐",
    titre: "Produit scalaire dans l’espace",
    domaine: "Algèbre et géométrie",
    essentiel:
      "Dans l'espace, le produit scalaire garde sa formule analytique : on **multiplie les coordonnées deux à deux et on additionne**. Il vaut aussi $\\|\\vec u\\|\\,\\|\\vec v\\|\\cos\\theta$, d'où deux usages massifs : **prouver une orthogonalité** ($\\vec u\\cdot\\vec v=0$) et **calculer un angle**. Enfin, un plan est décrit par un **vecteur normal** dont les coordonnées sont exactement les coefficients de son équation.",
    formules: [
      { label: "Analytique et carré", latex: "$\\vec u\\cdot\\vec v = xx'+yy'+zz'$ ; $\\vec u\\cdot\\vec u = \\|\\vec u\\|^2$" },
      { label: "Norme et distance", latex: "$\\|\\vec u\\|=\\sqrt{x^2+y^2+z^2}$ ; $AB=\\|\\overrightarrow{AB}\\|$" },
      { label: "Orthogonalité", latex: "$\\vec u\\perp\\vec v \\iff \\vec u\\cdot\\vec v = 0$" },
      { label: "Angle", latex: "$\\cos\\theta = \\dfrac{\\vec u\\cdot\\vec v}{\\|\\vec u\\|\\,\\|\\vec v\\|}$" },
      { label: "Plan et normale", latex: "$ax+by+cz+d=0 \\Rightarrow \\vec n(a\\,;b\\,;c)$" },
    ],
    reflexes: [
      { si: "« orthogonaux », « angle droit », « rectangle en $A$ »", alors: "calculer $\\vec u\\cdot\\vec v$ et vérifier que ça fait $0$" },
      { si: "trouver l'équation d'un plan", alors: "coefficients $=$ coordonnées de la normale $\\vec n$, puis un point fixe $d$" },
      { si: "lire la normale d'un plan $ax+by+cz+d=0$", alors: "prendre $\\vec n(a\\,;b\\,;c)$ (les coefficients de $x,y,z$)" },
      { si: "calculer un angle", alors: "$\\cos\\theta=\\dfrac{\\vec u\\cdot\\vec v}{\\|\\vec u\\|\\,\\|\\vec v\\|}$ — jamais sans les deux normes" },
    ],
    pieges: [
      "Croire que $\\vec u\\cdot\\vec v$ est un vecteur : c'est un NOMBRE (scalaire).",
      "Oublier de diviser par les normes : $\\vec u\\cdot\\vec v$ tout seul n'est PAS le cosinus de l'angle.",
      "Droite $\\perp$ plan : le vecteur directeur est COLINÉAIRE à la normale — surtout pas orthogonal.",
    ],
    reel: "Le fil à plomb du maçon et l'horizontale d'un mur à Saint-Denis : produit scalaire nul, angle droit garanti — exactement la vérification qu'on fait dans l'espace.",
  },
  {
    id: "probabilite_conditionnelle",
    emoji: "🌳",
    titre: "Probabilités conditionnelles",
    domaine: "Probabilités",
    essentiel:
      "Conditionner, c'est **réduire l'univers** : $P_A(B)$ se lit « probabilité de $B$ **sachant** $A$ », donc on divise par $P(A)$. Sur un **arbre pondéré**, on **multiplie** le long d'un chemin et on **additionne** les chemins qui mènent au même événement (**probabilités totales**). Attention, le conditionnement n'est **pas symétrique** : $P_A(B)\\neq P_B(A)$.",
    formules: [
      { label: "Conditionnelle", latex: "$P_A(B)=\\dfrac{P(A\\cap B)}{P(A)}$ (avec $P(A)\\neq 0$)" },
      { label: "Le long d'un chemin (produit)", latex: "$P(A\\cap B)=P(A)\\times P_A(B)$" },
      { label: "Probabilités totales", latex: "$P(B)=P(A)P_A(B)+P(\\overline{A})P_{\\overline{A}}(B)$" },
      { label: "Inverser (sachant $B$)", latex: "$P_B(A)=\\dfrac{P(A\\cap B)}{P(B)}$" },
      { label: "Branches d'un même nœud", latex: "$P_A(B)+P_A(\\overline{B})=1$" },
    ],
    reflexes: [
      { si: "le mot « **sachant** » (ou « parmi les… »)", alors: "conditionnelle $P_A(B)$ : on divise par la proba de ce qui est connu, $P(A)$" },
      { si: "on descend **un chemin** de l'arbre", alors: "on **multiplie** les branches : $P(A\\cap B)=P(A)\\,P_A(B)$" },
      { si: "un événement $B$ est atteint par **plusieurs branches**", alors: "**probabilités totales** : on **additionne** tous les chemins vers $B$" },
      { si: "on donne $P_A(B)$ mais on demande $P_B(A)$", alors: "on **inverse** en repassant par $P(A\\cap B)$ puis $P(B)$" },
    ],
    pieges: [
      "Confondre $P_A(B)$ et $P_B(A)$ : le conditionnement n'est PAS symétrique (« malade sachant test positif » $\\neq$ « test positif sachant malade »).",
      "Additionner le long d'un chemin (au lieu de multiplier) ou multiplier les chemins (au lieu d'additionner) pour $P(B)$.",
      "Dans $P_A(B)$, diviser par $P(B)$ au lieu de $P(A)$ : on divise TOUJOURS par la proba de l'événement placé en indice.",
    ],
    reel: "Un test de dépistage de la dengue à La Réunion : « positif sachant malade » (fiabilité du test) et « malade sachant positif » (ce qui t'inquiète vraiment) sont deux nombres différents — les inverser, c'est tout l'enjeu.",
  },
  {
    id: "variable_aleatoire",
    emoji: "🎲",
    titre: "Variables aléatoires",
    domaine: "Probabilités",
    essentiel:
      "Une **variable aléatoire** $X$ associe un nombre à chaque issue d'une expérience. Donner sa **loi**, c'est lister ses valeurs $x_i$ et leurs probabilités $P(X=x_i)$ (leur somme fait toujours $1$). L'**espérance** $E(X)$ est la moyenne sur le long terme ; la **variance** et l'**écart-type** mesurent la dispersion autour de cette moyenne.",
    formules: [
      { label: "Loi valide", latex: "$\\sum P(X=x_i)=1$ ; $\\;0\\le P(X=x_i)\\le 1$" },
      { label: "Espérance", latex: "$E(X)=\\sum x_i\\,P(X=x_i)$" },
      { label: "Variance (König-Huygens)", latex: "$V(X)=E(X^2)-\\big(E(X)\\big)^2$" },
      { label: "$E(X^2)$ et écart-type", latex: "$E(X^2)=\\sum x_i^{\\,2}\\,P(X=x_i)$ ; $\\;\\sigma(X)=\\sqrt{V(X)}$" },
    ],
    reflexes: [
      { si: "« en moyenne », « gain moyen », « sur un grand nombre »", alors: "espérance $E(X)=\\sum x_i\\,P(X=x_i)$" },
      { si: "calculer $V(X)$", alors: "d'abord $E(X)$ ET $E(X^2)$, puis $E(X^2)-\\big(E(X)\\big)^2$" },
      { si: "« dispersion », « régularité », « risque »", alors: "écart-type $\\sigma(X)=\\sqrt{V(X)}$" },
      { si: "« jeu équitable »", alors: "espérance du gain $=0$" },
    ],
    pieges: [
      "Écrire $V(X)=E(X^2)-E(X)$ : FAUX, on retranche le CARRÉ de l'espérance, $\\big(E(X)\\big)^2$.",
      "Confondre $E(X^2)$ (moyenne des carrés) et $\\big(E(X)\\big)^2$ (carré de la moyenne) : ce sont deux nombres différents.",
      "Rendre la variance comme écart-type (oublier la racine), ou l'annoncer négative : $V(X)\\ge 0$ toujours et $\\sigma(X)=\\sqrt{V(X)}$.",
    ],
    reel: "Deux rivières de La Réunion peuvent avoir le même niveau moyen : celle au plus grand écart-type est la plus dangereuse. L'espérance dit le niveau habituel, l'écart-type dit le risque de crue.",
  },
  {
    id: "loi_binomiale",
    emoji: "🪙",
    titre: "Loi binomiale",
    domaine: "Probabilités",
    essentiel:
      "Quand on répète **$n$ fois** la **même** épreuve à **deux issues** (succès/échec), de façon **indépendante** avec une probabilité de succès $p$ **constante**, le nombre de succès $X$ suit une **loi binomiale** $\\mathcal{B}(n\\,;p)$. Tout se calcule avec une seule formule : $\\binom{n}{k}$ compte les chemins, $p^k(1-p)^{n-k}$ pèse chacun d'eux.",
    formules: [
      { label: "Reconnaître", latex: "$n$ épreuves identiques, indépendantes, 2 issues, $p$ constant $\\Rightarrow X\\sim\\mathcal{B}(n\\,;p)$" },
      { label: "Probabilité", latex: "$P(X=k)=\\binom{n}{k}\\,p^k(1-p)^{n-k}$, pour $k\\in\\{0,\\dots,n\\}$" },
      { label: "Espérance, variance, écart-type", latex: "$E(X)=np$ ; $V(X)=np(1-p)$ ; $\\sigma(X)=\\sqrt{np(1-p)}$" },
      { label: "Au moins un succès", latex: "$P(X\\ge 1)=1-P(X=0)=1-(1-p)^n$" },
      { label: "Intervalle", latex: "$P(a\\le X\\le b)=\\displaystyle\\sum_{k=a}^{b}P(X=k)$ (ou calculatrice)" },
    ],
    reflexes: [
      { si: "« $n$ fois », « avec remise », « indépendantes », deux issues", alors: "loi binomiale $\\mathcal{B}(n\\,;p)$, où $X$ compte les succès" },
      { si: "« au moins un »", alors: "événement contraire : $1-P(X=0)=1-(1-p)^n$" },
      { si: "« espérance / moyenne / variance »", alors: "$E(X)=np$ ; $V(X)=np(1-p)$ — appliquer la formule, pas de somme" },
      { si: "« au plus $k$ », « entre $a$ et $b$ »", alors: "sommer les $P(X=i)$ (ou la loi cumulée à la calculatrice)" },
    ],
    pieges: [
      "Tirages **sans remise** : les épreuves ne sont plus indépendantes, ce n'est PLUS binomial.",
      "Oublier le coefficient $\\binom{n}{k}$ et n'écrire que $p^k(1-p)^{n-k}$ : on compte alors un seul chemin au lieu de tous.",
      "Confondre $E(X)=np$ et $V(X)=np(1-p)$, ou prendre $\\sigma=V$ au lieu de $\\sigma=\\sqrt{V}$.",
    ],
    reel: "Sur une barquette de 30 letchis, chacun abîmé avec la même probabilité indépendamment : le nombre d'abîmés suit une binomiale — c'est ce contrôle qualité qui décide si le lot part à l'expédition.",
  },
  {
    id: "concentration_echantillonnage",
    emoji: "📊",
    titre: "Concentration et loi des grands nombres",
    domaine: "Probabilités",
    essentiel:
      "Plus l'échantillon est grand, plus sa moyenne $M_n$ se **colle** à l'espérance $\\mu$. La clé : $E(M_n)=\\mu$ ne bouge pas, mais $V(M_n)=\\dfrac{\\sigma^2}{n}$ **rétrécit** quand $n$ grandit. L'inégalité de concentration chiffre ce resserrement : $P(|M_n-\\mu|\\ge\\delta)\\le\\dfrac{\\sigma^2}{n\\delta^2}$, et ce majorant tend vers $0$ — c'est la **loi des grands nombres**.",
    formules: [
      { label: "Moyenne d'échantillon", latex: "$E(M_n)=\\mu$ ; $V(M_n)=\\dfrac{\\sigma^2}{n}$ ; $\\sigma(M_n)=\\dfrac{\\sigma}{\\sqrt n}$" },
      { label: "Bienaymé-Tchebychev", latex: "$P(|X-\\mu|\\ge\\delta)\\le\\dfrac{V(X)}{\\delta^2}$" },
      { label: "Inégalité de concentration", latex: "$P(|M_n-\\mu|\\ge\\delta)\\le\\dfrac{\\sigma^2}{n\\delta^2}$" },
      { label: "Fréquence", latex: "$E(F_n)=p$ ; $V(F_n)=\\dfrac{p(1-p)}{n}$" },
      { label: "Loi des grands nombres", latex: "$P(|M_n-\\mu|\\ge\\delta)\\to 0$ quand $n\\to+\\infty$" },
    ],
    reflexes: [
      { si: "« moyenne d'un échantillon » $M_n$", alors: "$E(M_n)=\\mu$ et $V(M_n)=\\dfrac{\\sigma^2}{n}$ (on DIVISE par $n$)" },
      { si: "« majorer » $P(|X-\\mu|\\ge\\delta)$ pour UNE variable", alors: "Bienaymé : $\\dfrac{V(X)}{\\delta^2}$" },
      { si: "l'écart porte sur la moyenne $M_n$", alors: "concentration $\\dfrac{\\sigma^2}{n\\delta^2}$ (Bienaymé appliqué à $M_n$)" },
      { si: "« $n$ grand », « estimer une proba par une fréquence »", alors: "loi des grands nombres : la proba d'écart tend vers $0$" },
    ],
    pieges: [
      "Écrire $V(M_n)=\\sigma^2$ : on oublie le $\\div n$. C'est justement ce $\\dfrac{\\sigma^2}{n}$ qui fait la concentration.",
      "Prendre le majorant de Bienaymé pour la vraie probabilité : c'est une BORNE ($\\le$), qui peut valoir $1$ et donc ne rien dire.",
      "Confondre la fréquence $F_n$ (variance $\\dfrac{p(1-p)}{n}$) et le nombre de succès $X\\sim\\mathcal{B}(n,p)$ (variance $np(1-p)$).",
    ],
    reel: "Un sondage sur $1000$ personnes serre bien plus près la vraie intention de vote qu'un sondage sur $10$ : c'est le $\\dfrac{\\sigma^2}{n\\delta^2}$ qui fond quand $n$ grandit.",
  },
  {
    id: "algorithmique_python",
    emoji: "🐍",
    titre: "Algorithmique (Python)",
    domaine: "Algorithmique et programmation",
    essentiel:
      "En Terminale, Python **exécute** ce qu'on sait calculer à la main : on lit le code **ligne par ligne** en suivant chaque variable. Deux boucles suffisent — `for` quand le **nombre de tours est connu**, `while` quand on cherche un **seuil** — et le module `random` **simule le hasard**.",
    formules: [
      { label: "Boucle bornée", latex: "$\\texttt{for i in range(n)}$ : $n$ tours, $i=0,1,\\dots,n-1$" },
      { label: "Terme d'une suite", latex: "$\\texttt{u=u0}$ ; $\\texttt{for i in range(n): u=f(u)}$ donne $u_n$" },
      { label: "Recherche de seuil", latex: "$\\texttt{while u<S: u=f(u); n=n+1}$ $\\Rightarrow$ rang $n$" },
      { label: "Simuler le hasard", latex: "$\\texttt{randint(1,6)}$ (dé) ; $\\texttt{random()}\\in[0\\,;1[$" },
      { label: "Estimer une proba", latex: "$\\texttt{freq = succes/N}\\to P$ (grands nombres)" },
    ],
    reflexes: [
      { si: "« combien de fois », $\\texttt{range(n)}$", alors: "$n$ tours, $i$ va de $0$ à $n-1$" },
      { si: "$u_{n+1}=f(u_n)$, calculer $u_n$", alors: "boucle $\\texttt{for}$ : partir de $u_0$, appliquer $n$ fois $\\texttt{u=f(u)}$" },
      { si: "« plus petit $n$ tel que … dépasse un seuil »", alors: "boucle $\\texttt{while}$ (nombre de tours inconnu)" },
      { si: "« simuler », « estimer une probabilité »", alors: "$\\texttt{random}$ + fréquence $\\texttt{succes/N}$" },
    ],
    pieges: [
      "$\\texttt{range(n)}$ s'arrête à $n-1$ : la borne haute est EXCLUE ($\\texttt{range(2,6)}$ donne $2,3,4,5$).",
      "Confondre $\\texttt{=}$ (affecter une valeur à une variable) et $\\texttt{==}$ (tester une égalité).",
      "Prendre un $\\texttt{for}$ pour un problème de seuil alors que le nombre de tours est inconnu : c'est $\\texttt{while}$.",
    ],
    reel: "« Après combien d'années la population de Saint-Pierre dépasse-t-elle $100\\,000$ habitants ? » On ne devine pas le nombre de tours : une boucle `while` s'arrête toute seule au bon moment.",
  },
];

const BANQUES: Record<string, TutorBankItemV4[]> = {
  suite_numerique: suitesBank,
  limite_suite: limitesSuitesBank,
  limite_fonction: limitesFonctionsBank,
  continuite_tvi: continuiteTviBank,
  derivation_fonction: derivationBank,
  convexite_fonction: convexiteBank,
  fonction_exponentielle: exponentielleBank,
  fonction_logarithme: logarithmeBank,
  primitive_integrale: primitivesIntegralesBank,
  equation_differentielle: equationsDifferentiellesBank,
  denombrement_combinatoire: denombrementBank,
  geometrie_espace: geometrieEspaceBank,
  produit_scalaire_espace: produitScalaireEspaceBank,
  probabilite_conditionnelle: probabilitesConditionnellesBank,
  variable_aleatoire: variablesAleatoiresBank,
  loi_binomiale: loiBinomialeBank,
  concentration_echantillonnage: concentrationBank,
  algorithmique_python: algorithmiquePythonBank,
};

export const KIT_MATHS_TERMINALE: KitData = {
  slug: "maths-terminale",
  titre: "Guide de survie · Spé maths Terminale",
  baseline:
    "Les 18 chapitres du programme en 18 fiches : les formules qui sauvent, les réflexes, les pièges qui coûtent des points — et un test corrigé par chapitre. À imprimer, à glisser dans le classeur.",
  matiere: "maths",
  classeLabel: "Terminale · spécialité maths",
  coachClasse: "terminale-spe",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
