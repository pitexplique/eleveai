/**
 * Fabrique les APERÇUS DE SURVOL DES NOTIONS DU COACH — l'exercice qui attend
 * l'élève, photographié sur le tutor, une image par notion.
 *
 * ── LE CHIFFRE QUI COMMANDE CE CHANTIER ──────────────────────────────────────
 * Frédéric, 27/08/2026 : « un élève sur deux quitte le coach et ne va pas sur
 * tutor ». La page /coach-ia/<matiere>?classe=… liste des titres — « Opérations
 * sur les nombres relatifs », « Pythagore et sa réciproque » — et la moitié des
 * gens n'y donnent pas suite. Un titre ne dit pas ce qu'on va FAIRE : ni si
 * c'est un cours ou un exercice, ni à quoi ressemblera l'écran, ni combien ça
 * dure. L'aperçu au survol répond avant le clic.
 *
 * C'est le même pari que sur les cartes de l'accueil (scripts/capturer-apercus.ts),
 * et le même composant l'affiche (components/matrice/FenetreApercu.tsx). Ce qui
 * change ici, c'est CE QU'ON PHOTOGRAPHIE : pas une page qu'une URL suffit à
 * ouvrir, mais un exercice qu'il faut faire démarrer.
 *
 * ── ⚠️ POURQUOI IL FAUT CLIQUER, ET PAS SEULEMENT NAVIGUER ───────────────────
 * `/tutor-v4?classe=5e&matiere=maths&notion=nombre_relatif` PRÉSÉLECTIONNE bien
 * la notion — vérifié, le `<select>` porte la bonne valeur. Mais l'écran affiche
 * alors « Clique sur Démarrer une mission. » et rien d'autre. Une campagne qui
 * se contenterait de l'URL produirait 768 fois le même écran vide, et personne
 * ne s'en apercevrait avant de les regarder une par une.
 * Le scénario est donc : ouvrir, attendre le bouton, cliquer, attendre l'énoncé.
 * Il est IDENTIQUE pour les cinq coachs — ils partagent tous TutorV4Client.
 *
 * ── ⛔ LE GARDE-FOU QUI NE SERT À RIEN AUJOURD'HUI ───────────────────────────
 * `/api/chat` est coupée à la racine. Aujourd'hui c'est inutile : aucune des
 * quatre routes du tutor (start, choose, jump, answer) n'appelle l'IA, et un
 * robot sans session ne peut de toute façon pas ouvrir le coach conversationnel.
 * Mais une campagne fait 768 passages, et le jour où quelqu'un branchera un
 * appel IA quelque part dans le tutor, cette ligne empêchera une fournée de
 * captures de facturer 768 fois sans que personne l'ait voulu.
 *
 * ── USAGE ────────────────────────────────────────────────────────────────────
 *   npm run capturer:apercus-coach -- http://localhost:3000 maths:5e
 *   npm run capturer:apercus-coach -- http://localhost:3000 maths        (toutes les classes)
 *   npm run capturer:apercus-coach -- http://localhost:3000 --tout
 *
 * Sans cible, seules les notions sans fichier sont capturées : relancer après
 * une coupure ne recommence pas tout.
 *
 * ⚠️ RELANCER LE SERVEUR avant une grosse fournée — le rechargement à chaud
 * perd des feuilles de style, et une capture ne dit pas pourquoi elle est laide.
 */
import fs from "node:fs";
import path from "node:path";
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium, type Page } from "playwright-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.join(__dirname, "..");

/**
 * ⚠️ DEUX CROCHETS DE RÉSOLUTION, ET AUCUN N'EST DÉCORATIF.
 *
 * `--experimental-strip-types` retire les types, il ne fait pas la résolution de
 * modules de TypeScript. Or le catalogue du coach importe `@/lib/...` (l'alias
 * du projet) et `./notions` (sans extension). Sans ces deux crochets, l'import
 * du catalogue échoue avant la première capture.
 *
 * L'alternative aurait été de recopier ici la liste des notions. C'est
 * exactement la liste qui se met à mentir : une notion ajoutée au catalogue
 * n'aurait pas d'aperçu, et rien ne le dirait.
 */
registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith("@/")) {
      for (const suffixe of [".ts", ".tsx", "/index.ts", ""]) {
        try {
          return next(pathToFileURL(path.join(RACINE, specifier.slice(2) + suffixe)).href, context);
        } catch {
          /* on essaie le suivant */
        }
      }
    }
    if (specifier.startsWith(".") && !/\.[a-z]+$/i.test(specifier)) {
      try {
        return next(specifier + ".ts", context);
      } catch {
        return next(specifier + ".tsx", context);
      }
    }
    return next(specifier, context);
  },
});

const cat = await import(pathToFileURL(path.join(RACINE, "lib/tutor-v4/catalog.ts")).href);
const affichage = await import(pathToFileURL(path.join(RACINE, "lib/tutor-v4/displayMode.ts")).href);

const SORTIE = path.join(RACINE, "public", "apercus", "coach");
const MANIFESTE = path.join(RACINE, "lib", "tutor-v4", "apercus.generated.ts");

/**
 * LA FENÊTRE DE CAPTURE — 800 × 500, comme les aperçus des cartes de l'accueil.
 *
 * 16:10, le rapport que le panneau annonce en une ligne (`aspect-ratio: 16 / 10`
 * dans FenetreApercu.tsx). Le changer ici sans le changer là-bas ferait glisser
 * les écrans les uns sur les autres.
 *
 * ⛔ NE PAS ÉLARGIR POUR FAIRE ENTRER LE PANNEAU « QUESTIONS · TEMPS · SCORE ».
 * Il a été demandé le 27/08 (« si tu pouvais rajouter — pas tout l'écran — la
 * partie droite »), puis reposé le jour même. La raison est mécanique : ce
 * panneau latéral du tutor est en `lg:grid-cols-[1fr_340px]`, donc il N'EXISTE
 * PAS sous 1024 px. Le faire apparaître demandait de capturer en 1120 px, ce qui
 * fait tomber la réduction de 47 % à 34 % — un texte nettement plus petit dans
 * les 380 px du panneau. Frédéric, après l'essai : « on laisse comme ça ».
 * L'énoncé lisible vaut mieux qu'un compteur de score illisible.
 */
const LARGEUR = 800;
const HAUTEUR = 500;
const LARGEUR_SERVIE = 760;
const QUALITE = 0.72;

/**
 * LES NIVEAUX DE CHAQUE COACH — recopiés de app/coach-ia/[matiere]/page.tsx et
 * app/coach-ia/english-maths/page.tsx, c'est-à-dire de ce que la page PROPOSE.
 *
 * ⚠️ NE PAS croiser toutes les matières avec toutes les classes.
 * `getNotionOptions()` ne lève pas d'erreur sur une paire qui n'existe pas : il
 * RETOMBE silencieusement sur un niveau par défaut. Interrogé sur « maths en
 * a1 », il rend les 35 notions de 6e. Un comptage naïf annonçait ainsi 1 609
 * notions au lieu de 768 — près du double, uniquement en doublons invisibles.
 */
const NIVEAUX: Record<string, string[]> = {
  maths: ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde",
          "premiere", "premiere-spe", "terminale-spe", "stmg", "adulte"],
  francais: ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde"],
  espagnol: ["a1", "a2", "b1", "b2"],
  ia: ["pix-college", "pix-lycee"],
  "english-maths": ["a1", "a2", "b1", "b2"],
};

type Cible = { matiere: string; classe: string; notion: string };

const TOUTES: Cible[] = [];
for (const [matiere, classes] of Object.entries(NIVEAUX)) {
  for (const classe of classes) {
    let notions: string[] = [];
    try {
      notions = cat.getNotionOptions(classe, matiere);
    } catch {
      notions = [];
    }
    for (const notion of notions) TOUTES.push({ matiere, classe, notion });
  }
}

// ── Les arguments ────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const base = (args.find((a) => a.startsWith("http")) ?? "http://localhost:3000").replace(/\/$/, "");
const tout = args.includes("--tout");
/** « maths » = toute la matière ; « maths:5e » = une seule classe. */
const filtres = args.filter((a) => !a.startsWith("http") && !a.startsWith("--"));

/**
 * QUEL ÉCRAN VIENT EN PREMIER — `--ordre=…`, et par défaut `complet-simple`.
 *
 * ⚠️ LE DÉFAUT SUIT CE QUI EST EN LIGNE, pas ce qu'on préfère. Les aperçus
 * publiés montrent le mode complet en premier, et les libellés de
 * NotionAvecApercu.tsx annoncent « Mode complet » puis « Mode simple ». Tant que
 * l'arbitrage n'est pas rendu, changer ce défaut ferait produire des captures
 * que les pastilles décriraient à l'envers.
 *
 * Trois montages ont été essayés le 27/08, et aucun ne s'impose sur le papier :
 *   simple-complet       la question posée d'abord, le menu des deux énoncés
 *                        ensuite. Le premier écran est celui que TOUT LE MONDE
 *                        voit ; le second, seulement qui laisse la souris deux
 *                        secondes. Une question convainc mieux qu'un menu.
 *   complet-simple       l'inverse, et c'est le plus FIDÈLE : un élève de 5e qui
 *                        clique atterrit en mode complet, c'est son défaut.
 *   complet-invitation   le menu, puis « Prêt pour une question ? » et son
 *                        bouton vert. L'aperçu finit sur une porte au lieu de
 *                        finir sur plus de devoirs. Né d'un clic oublié.
 *
 * ⚠️ CE RÉGLAGE EXISTE POUR COMPARER, pas pour hésiter éternellement. Les trois
 * se regardent côte à côte sur une même notion ; une fois tranché, le défaut
 * change ici et la fournée s'aligne.
 * ⚠️ ET L'ORDRE DES LIBELLÉS SUIT : components/coach/NotionAvecApercu.tsx écrit
 * « Mode simple » puis « Mode complet ». Inverser ici sans inverser là-bas ferait
 * annoncer un mode au-dessus de l'autre.
 */
const ORDRE = (args.find((a) => a.startsWith("--ordre="))?.slice(8) ?? "complet-simple") as
  | "simple-complet"
  | "complet-simple"
  | "complet-invitation";

function fichier(c: Cible, ecrans: number) {
  return path.join(SORTIE, c.matiere, c.classe, `${c.notion}.${ecrans}.webp`);
}
function dejaLa(c: Cible): string | null {
  const dir = path.join(SORTIE, c.matiere, c.classe);
  if (!fs.existsSync(dir)) return null;
  const f = fs.readdirSync(dir).find((n) => new RegExp(`^${c.notion}\\.\\d\\.webp$`).test(n));
  return f ? path.join(dir, f) : null;
}

/**
 * ⚠️ LE FILTRE CHOISIT LE PÉRIMÈTRE, `--tout` CHOISIT DE REFAIRE.
 *
 * Les deux étaient confondus au départ : nommer « maths:5e » refaisait les 19,
 * y compris les 18 déjà bonnes. Sur une fournée où une notion échoue au hasard,
 * ça rendait le rattrapage impossible — chaque relance rejouait tout et
 * fabriquait un nouvel échec ailleurs. Par défaut on ne fait donc que les
 * manquantes, dans le périmètre demandé.
 */
const aFaire = TOUTES.filter((c) => {
  if (filtres.length > 0) {
    /**
     * ⭐ TROIS GRAINS DE FILTRE, ET LE PLUS FIN EST LE PLUS UTILE.
     *   « maths »                  toute la matière
     *   « maths:5e »               une classe
     *   « maths:5e:sym_centrale »  UNE notion
     *
     * Le troisième a été ajouté pour comparer deux façons de capturer sans
     * refaire les 47 aperçus déjà bons — et il resservira à chaque fois qu'une
     * notion seule échouera dans une grande fournée. Sans lui, la plus petite
     * unité de travail était la classe, donc dix-neuf fichiers réécrits pour en
     * corriger un.
     */
    const cle = `${c.matiere}:${c.classe}`;
    const cleNotion = `${cle}:${c.notion}`;
    if (!filtres.some((f) => f === c.matiere || f === cle || f === cleNotion)) return false;
  }
  return tout ? true : !dejaLa(c);
});

console.log(`${TOUTES.length} notions au catalogue · ${aFaire.length} à capturer depuis ${base}`);
if (aFaire.length === 0) {
  ecrireManifeste();
  process.exit(0);
}

// ── Le navigateur ────────────────────────────────────────────────────────────
const navigateur = await chromium.launch({ channel: "chrome" });
const contexte = await navigateur.newContext({
  viewport: { width: LARGEUR, height: HAUTEUR },
  deviceScaleFactor: 1,
  locale: "fr-FR",
  reducedMotion: "reduce",
});
const page = await contexte.newPage();
// ⛔ Voir la note en tête de fichier : le garde-fou qui ne sert à rien aujourd'hui.
await page.route("**/api/chat", (r) => r.abort());
const encodeur = await contexte.newPage();
await encodeur.goto("about:blank");

let faits = 0;
const rates: string[] = [];

for (const c of aFaire) {
  const t0 = Date.now();
  try {
    const { octets, ecrans } = await capturer(page, c);
    const ancien = dejaLa(c);
    if (ancien) fs.rmSync(ancien);
    const dest = fichier(c, ecrans);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, octets);
    faits += 1;
    console.log(
      `  ✓ ${`${c.matiere}/${c.classe}/${c.notion}`.padEnd(46)} ${(octets.length / 1024).toFixed(0).padStart(3)} Ko  ${((Date.now() - t0) / 1000).toFixed(1)}s`,
    );
  } catch (e) {
    const cle = `${c.matiere}/${c.classe}/${c.notion}`;
    rates.push(cle);
    console.error(`  ✖ ${cle.padEnd(46)} ${(e as Error).message.split("\n")[0].slice(0, 60)}`);
  }
}

await navigateur.close();
ecrireManifeste();
console.log(`\n${faits} aperçu(s) écrits, ${rates.length} en échec.`);
if (rates.length) console.log("Échecs : " + rates.join(" "));

// ── La capture d'une notion ──────────────────────────────────────────────────
/**
 * ⭐ LES DEUX ÉCRANS SONT LES DEUX VUES, PAS LES DEUX MOITIÉS D'UNE PAGE.
 *
 * Frédéric, 27/08 : « ça serait bien d'avoir un screenshot mode complet et un
 * mode simple, t'en penses quoi ? ». Une première version faisait comme sur
 * l'accueil — le haut de la page, puis un écran plus bas. Le rendu l'a
 * tranché : la page d'un exercice fait à peine plus d'une hauteur d'écran, donc
 * la seconde bande recopiait 80 % de la première. Deux pastilles pour la même
 * image, c'est pire qu'une seule.
 *
 * Les deux VUES, elles, montrent deux choses différentes : la complète propose
 * deux énoncés au choix et le détail des micro-compétences, la simple pose une
 * question sur un écran nu. Et les deux sont atteignables — le bouton « Mode
 * simple » est dans la barre du tutor. On ne montre donc pas un écran que
 * l'élève n'aura jamais : on montre les deux visages qu'il peut demander.
 *
 * ⚠️ UNE SEULE VUE POUR LE PRIMAIRE. Du CP au CM2 et sur les niveaux du CECRL,
 * la vue complète n'existe pas (lib/tutor-v4/displayMode.ts) : la notion garde
 * une pastille, et c'est honnête — il n'y a rien d'autre à montrer.
 */
async function capturer(page: Page, c: Cible): Promise<{ octets: Buffer; ecrans: number }> {
  const defaut = affichage.defaultDisplayModeForClasse(c.classe);

  /**
   * ⭐ LE MODE SIMPLE PASSE EN PREMIER, AVEC SA QUESTION (Frédéric, 27/08 :
   * « mode simple en premier avec la question, on ne touche à rien d'autre, puis
   * on affiche mode complet »).
   *
   * L'ordre n'est pas cosmétique : c'est le PREMIER écran qu'on voit en
   * survolant, et souvent le seul si la souris repart. Il doit donc porter ce
   * qu'il y a de plus convaincant — une question, posée, qu'on peut lire tout de
   * suite. Le mode complet vient ensuite dire qu'on a le choix entre deux
   * énoncés.
   *
   * ⛔ CE FUT L'INVERSE, ET DEUX FOIS. D'abord « complet puis simple avec une
   * question » ; puis « complet puis l'invitation Prêt pour une question ? »,
   * née d'un clic oublié et retenue exprès (« c'est comme Marie Curie »). Les
   * deux ont été essayées EN LIGNE, sur deux étalons, avant d'arriver ici. Ne
   * pas ré-inverser sans les avoir revues.
   *
   * ⚠️ UNE SEULE VUE POUR LE PRIMAIRE. Du CP au CM2 et sur les niveaux du CECRL,
   * la vue complète n'existe pas (lib/tutor-v4/displayMode.ts) : la notion garde
   * une pastille, et c'est honnête — il n'y a rien d'autre à montrer.
   */
  const vues: string[] =
    defaut !== "complete"
      ? ["simple"]
      : ORDRE === "complet-invitation"
        ? ["complete", "simple"]
        : ORDRE === "complet-simple"
          ? ["complete", "simple"]
          : ["simple", "complete"];

  const bandes: Buffer[] = [];
  for (const vue of vues) {
    /**
     * On démarre partout, SAUF pour l'invitation : là on s'arrête volontairement
     * sur « Prêt pour une question ? » (voir `ORDRE`).
     */
    const demarrer = !(ORDRE === "complet-invitation" && vue === "simple" && vues.length > 1);
    bandes.push(await capturerUneVue(page, c, vue, demarrer));
  }
  return { octets: await empiler(bandes), ecrans: bandes.length };
}

async function capturerUneVue(
  page: Page,
  c: Cible,
  vue: string,
  /**
   * ⚠️ FAUT-IL DÉMARRER L'EXERCICE, OU S'ARRÊTER SUR L'INVITATION ?
   *
   * `true` partout, SAUF pour le mode simple quand il est le SECOND écran.
   * La nuance n'est pas cosmétique : au primaire et sur les niveaux du CECRL,
   * la vue simple est le SEUL écran. S'y arrêter sur l'invitation, ce serait
   * montrer un bouton vert et rien d'autre — une notion qui ne montrerait
   * aucun exercice. L'invitation est un BON DERNIER MOT ; elle ne peut pas
   * être le seul mot.
   */
  demarrer: boolean,
): Promise<Buffer> {
  /**
   * ⚠️ L'URL EST CELLE DU CLIC, `display` COMPRIS — sinon l'aperçu ment.
   *
   * Le tutor a deux visages (lib/tutor-v4/displayMode.ts) : la vue SIMPLE pose
   * une question sur un écran nu, la vue COMPLÈTE propose deux énoncés et le
   * détail des micro-compétences. La bascule se fait au collège : le primaire et
   * les niveaux du CECRL restent en simple, la 6e passe en complète.
   *
   * La page du coach passe donc `display=` dans son lien (voir `handleClick`
   * dans app/coach-ia/[matiere]/page.tsx). Capturer sans ce paramètre, c'est
   * laisser le tutor choisir tout seul — et prendre le risque de photographier
   * un écran que l'élève de CE2 n'aura jamais, alors que l'aperçu promet
   * précisément « voilà ce qui t'attend ».
   * On construit l'URL avec la MÊME fonction que la page. Pas de recopie.
   */
  const url =
    `${base}/tutor-v4?classe=${encodeURIComponent(c.classe)}` +
    `&matiere=${encodeURIComponent(c.matiere)}` +
    `&notion=${encodeURIComponent(c.notion)}` +
    `&display=${vue}`;
  await page.goto(url, { waitUntil: "load", timeout: 45000 });

  /**
   * ⚠️ ON ATTEND LE BOUTON, PAS UN DÉLAI.
   *
   * Il n'apparaît qu'après l'hydratation de React. Un `waitForTimeout` généreux
   * marcherait la plupart du temps et laisserait des trous AU HASARD dans une
   * fournée de 768 — le pire des défauts, parce qu'il ne se reproduit pas.
   */
  /**
   * ⚠️ LES DEUX VISAGES DU TUTOR N'ONT PAS LE MÊME SCÉNARIO.
   *
   * En vue COMPLÈTE (le collège et au-delà), l'écran affiche « Clique sur
   * Démarrer une mission. » et attend le clic. En vue SIMPLE (le primaire, les
   * niveaux du CECRL), le tutor active la question tout seul — il n'y a pas de
   * bouton à cliquer, et l'attendre ferait échouer TOUTES les classes de
   * primaire, sur un délai, donc sans dire pourquoi.
   *
   * On attend donc la première des deux choses qui arrive : le bouton, ou
   * l'énoncé. Un seul scénario couvre les cinq coachs et les deux vues.
   */
  /**
   * ⛔ D'ABORD L'HYDRATATION, ET SANS ÇA TOUT LE RESTE MENT.
   *
   * Le piège, payé comptant : les deux attentes ci-dessous sont « le bouton
   * apparaît » OU « le texte d'attente a disparu ». Avant que React ait monté
   * quoi que ce soit, le texte d'attente n'est PAS dans la page — donc « il a
   * disparu » est vrai immédiatement. Les deux gardes tombaient ensemble, en
   * 2,4 s, et le script photographiait « Clique sur Démarrer une mission »,
   * c'est-à-dire l'inverse exact de ce que l'aperçu promet. Une capture de 4 Ko
   * au lieu de 14 : le poids était le seul indice.
   *
   * « Retour Coach » est le repère : c'est la barre d'outils du tutor, présente
   * dans les DEUX vues, et elle n'existe qu'une fois le composant monté.
   */
  await page
    .getByRole("button", { name: /Retour Coach/i })
    .first()
    .waitFor({ state: "visible", timeout: 30000 });

  /**
   * ⛔ ON ATTEND LE BOUTON POUR DE BON — PAS « LUI OU AUTRE CHOSE ».
   *
   * Il y a eu ici une `Promise.race` entre « le bouton apparaît » et « le texte
   * d'attente a disparu ». Elle avait l'air maligne et elle était fausse : au
   * moment où la course démarre, le bouton n'est pas ENCORE monté, donc le
   * `isVisible()` juste après rendait faux, donc on ne cliquait pas — et le
   * garde suivant passait tout aussi vite. Résultat : des captures de 4 Ko en
   * 2,5 s montrant « Clique sur Démarrer une mission », c'est-à-dire l'inverse
   * exact de ce que l'aperçu promet. Le poids était le seul indice.
   *
   * Ici on ATTEND le bouton, jusqu'à 15 s. S'il n'arrive pas, ce n'est pas une
   * erreur : c'est la vue SIMPLE (le primaire, les niveaux du CECRL), où le
   * tutor active la question tout seul.
   */
  /**
   * ⛔ ON ATTEND LE BOUTON, ET ON NE SE FIE PAS À L'ABSENCE DU TEXTE D'ATTENTE.
   *
   * Frédéric, 27/08 : « il ne faut pas cliquer sur Démarrer une mission, il
   * faut attendre deux secondes que ça s'affiche ». Une version l'a fait — et
   * elle a échoué sur 18 notions de 5e sur 19. Le diagnostic explique les deux :
   *
   *   — la barre « Retour Coach » s'affiche AVANT le panneau de mission. Dans
   *     cet intervalle, ni le texte d'attente ni le bouton n'existent (mesuré :
   *     `boutons trouvés : 0`). Un garde du type « le texte d'attente n'est plus
   *     là » est donc vrai À TORT pendant ce trou, et on repart sans avoir
   *     cliqué. L'écran d'attente arrive juste après, et c'est lui qu'on
   *     photographie ;
   *   — en vue COMPLÈTE, le tutor ne démarre pas tout seul. Les 18 échecs le
   *     disent, et le garde-fou de fin les a tous attrapés.
   *
   * Le seul repère fiable est donc POSITIF : le bouton apparaît. On l'attend
   * jusqu'à 15 s. S'il n'arrive jamais, ce n'est pas une erreur — c'est la vue
   * SIMPLE (le primaire, les niveaux du CECRL), où la question s'affiche seule.
   */
  /**
   * ⭐ LA VUE DIT S'IL FAUT CLIQUER — on ne le découvre plus par un délai.
   *
   * Frédéric, 27/08, après vérification à la main : « le mode simple, il faut
   * attendre deux secondes et la question s'affiche » ; « mode simple primaire
   * et mode complet collège lycée ».
   *
   * Les deux vues ne se comportent donc pas pareil, et on SAIT laquelle on
   * ouvre puisqu'on l'a mise dans l'URL :
   *   — SIMPLE : rien à cliquer, la question vient seule. Attendre le bouton
   *     ici, ce serait perdre quinze secondes par notion à guetter un élément
   *     qui n'existe pas — sur le primaire, c'est une demi-heure de fournée
   *     pour rien.
   *   — COMPLÈTE : le tutor ne démarre pas seul. Mesuré : 18 notions de 5e sur
   *     19 photographiées sur l'écran d'attente le jour où on a cru le
   *     contraire. Le bouton est le repère, et il est POSITIF — l'absence du
   *     texte d'attente, elle, est vraie à tort pendant que la page se monte.
   */
  const attendu = "Clique sur Démarrer une mission";
  if (vue === "complete") {
    const bouton = page.getByRole("button", { name: "Démarrer une mission" }).first();
    await bouton.waitFor({ state: "visible", timeout: 20000 });
    /**
     * ⚠️ PAS DE `scrollIntoViewIfNeeded` AVANT LE CLIC.
     *
     * Il y en avait un, et il faisait échouer une notion au hasard à chaque
     * fournée — jamais la même, ce qui est le pire des défauts : ça ressemble à
     * une page cassée alors que c'est un chronomètre. `click()` fait DÉJÀ
     * défiler jusqu'à l'élément et attend qu'il soit stable ; l'appel précédent
     * exigeait en plus que le défilement finisse dans SON propre délai, sur une
     * page que React est encore en train de peupler.
     */
    await bouton.click({ timeout: 20000 });
  }

  /**
   * ⚠️ ON ATTEND QUE L'ÉCRAN D'ATTENTE DISPARAISSE, pas qu'un délai s'écoule.
   * Sans ça, la capture peut saisir le moment entre le clic et l'énoncé — et
   * photographier « Clique sur Démarrer une mission », c'est-à-dire l'inverse
   * exact de ce qu'on promet.
   */
  await page.waitForFunction((t) => !document.body.innerText.includes(t), attendu, {
    timeout: 25000,
  });

  /**
   * ⚠️ EN VUE SIMPLE, CE GARDE-LÀ NE GARDE RIEN — d'où les deux secondes.
   *
   * Le texte « Clique sur Démarrer une mission » n'apparaît JAMAIS en vue
   * simple : la condition ci-dessus est donc vraie dès la première tentative,
   * y compris avant que la question soit rendue. C'est le même piège qui a
   * produit des captures de 4 Ko de l'écran d'attente en vue complète, à ceci
   * près qu'ici aucun texte ne trahit l'erreur.
   * Frédéric l'a chronométré à la main : « le mode simple, il faut attendre
   * deux secondes et la question s'affiche ». On les attend, et le garde-fou de
   * fin vérifie qu'il y a bien quelque chose à voir.
   */
  /**
   * ⚠️ LA VUE SIMPLE A SON PROPRE ÉCRAN DE DÉPART, ET SON PROPRE BOUTON.
   *
   * Elle n'affiche pas « Clique sur Démarrer une mission » mais « Prêt pour une
   * question ? » avec un bouton COMMENCER — un autre libellé, dans une autre
   * branche de rendu (TutorV4Client.tsx, `if (displayMode === "simple")`).
   * Le garde du dessus ne la voyait donc pas, et la seconde bande de chaque
   * notion montrait un écran de départ au lieu d'une question.
   *
   * Les deux secondes que Frédéric a chronométrées restent : elles laissent la
   * question se poser une fois le départ donné.
   */
  if (vue === "simple") {
    const commencer = page.getByRole("button", { name: /^Commencer$/i }).first();
    const aDemarrer = await commencer
      .waitFor({ state: "visible", timeout: 12000 })
      .then(() => true)
      .catch(() => false);

    /**
     * ⭐ ON S'ARRÊTE SUR L'INVITATION QUAND ELLE N'EST PAS LE SEUL MOT.
     *
     * « Prêt pour une question ? » et son bouton vert : c'est la PORTE, pas le
     * travail. Quand le panneau a déjà montré deux énoncés au choix sur son
     * premier écran, le second finit alors sur une invitation au lieu de finir
     * sur plus de devoirs. Pour un panneau dont le seul travail est de faire
     * cliquer, c'est le meilleur dernier mot.
     *
     * ⛔ CETTE IDÉE EST NÉE D'UN BOGUE, et il faut le savoir pour ne pas la
     * « corriger » par mégarde. Une fournée interrompue a produit 58 captures de
     * lycée montrant cet écran, avec une version du script qui oubliait de
     * cliquer. Frédéric, 27/08 : « j'adore le Prêt pour une question », puis
     * « c'est comme Marie Curie, j'ai l'impression qu'une erreur a donné la
     * solution pour le mode simple ».
     *
     * ⚠️ ON NE SORT PAS D'ICI EN COURT-CIRCUIT. Une première écriture rendait la
     * capture tout de suite — donc AVANT le retrait du chrome, et la bande
     * montrait le bandeau d'installation, l'en-tête du site et la barre du
     * tutor. On se contente de sauter le clic ; la suite de la fonction fait son
     * travail habituel.
     */
    if (demarrer) {
      if (aDemarrer) await commencer.click({ timeout: 15000 });

      /**
       * ⚠️ ON ATTEND QUE L'ÉCRAN DE DÉPART S'EFFACE, PAS DEUX SECONDES.
       *
       * Il y avait ici un `waitForTimeout(2500)`, chronométré à la main. Ça
       * marchait la plupart du temps et laissait des trous AU HASARD : sur le
       * français de 5e, la seconde bande montrait l'écran de départ au lieu d'un
       * exercice — dans un fichier d'un poids parfaitement normal.
       */
      await page.waitForFunction(
        () => !document.body.innerText.includes("Prêt pour une question"),
        undefined,
        { timeout: 20000 },
      );
      /* Le temps que l'énoncé se pose et que ses dessins se rendent.
         ⚠️ UNE SECONDE, ET C'ÉTAIT 2,5 (Frédéric, 27/08 : « raccourcis le temps,
         1 seconde pas 2,5 »). Ce délai ne sert plus à ATTENDRE le démarrage —
         c'est la vérification juste au-dessus qui s'en charge — mais seulement à
         laisser les dessins se poser. Deux secondes et demie de plus par notion,
         c'est une demi-heure sur une fournée de 768. */
      await page.waitForTimeout(1000);
    }
  }

  /**
   * ⚠️ LE CHROME PART ICI, ET PAS UNE LIGNE PLUS HAUT.
   *
   * Le bouton « Démarrer une mission » vit DANS le bandeau qu'on retire
   * (TutorV4Client.tsx). Injecter ce style avant le clic, c'est supprimer ce
   * qu'on venait chercher — le bogue du 27/08, qui faisait échouer chaque
   * notion sans dire pourquoi.
   *
   * Ce qui part : le chrome que le site DÉSIGNE (`data-hors-apercu` — l'en-tête,
   * le pied, le bandeau d'installation, la barre d'outils du tutor et son
   * bandeau de mission), et TOUT CE QUI EST `fixed`.
   *
   * ⭐ La règle sur `fixed` est nouvelle, et elle se démontre : sur une page
   * capturée, un élément fixe n'est jamais du contenu — il flotte au-dessus. Ce
   * sont la calculatrice, le coach flottant, l'avatar. Sur les premières
   * captures de 5e, « Calculatrice » et « Coach IA » se posaient en plein milieu
   * du cadre et recouvraient le texte des deux questions. On ne les nomme pas un
   * par un : la liste changerait sans prévenir, et `position: fixed` les décrit
   * tous, y compris ceux qui n'existent pas encore.
   */
  await page.addStyleTag({
    content: `
      [data-hors-apercu] { display: none !important; }
      /* La console de developpement de Next : le badge N/1 Issue en bas a
         gauche. Il vit dans un nextjs-portal avec un shadow DOM, donc le filtre
         des elements fixes ne le voit pas (querySelectorAll ne traverse pas un
         shadow root). Il n existe qu en developpement, mais les captures sont
         fabriquees en developpement et partiraient en production avec lui.
         ATTENTION : pas d accent grave dans ce commentaire, il est dans un
         gabarit de chaine et le refermerait. */
      nextjs-portal { display: none !important; }
      html { scroll-behavior: auto !important; }
      *, *::before, *::after {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
      }
    `,
  });
  await page.evaluate(() => {
    for (const el of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
      if (getComputedStyle(el).position === "fixed") el.style.display = "none";
    }
  });

  await page.evaluate(() => (document as unknown as { fonts: FontFaceSet }).fonts.ready);
  await page.waitForTimeout(700);

  /**
   * ⛔ LE GARDE-FOU FINAL — une capture fausse doit ÉCHOUER, pas s'écrire.
   *
   * Deux fois dans la même heure, un défaut d'attente a produit des fichiers
   * parfaitement valides montrant l'écran d'attente. Ils s'écrivaient sans un
   * mot, et rien dans le journal ne les distinguait des bons : sur une fournée
   * de 768, personne ne les aurait vus avant de les regarder un par un.
   * On relit donc ce qu'on vient de photographier. Un aperçu qui montre encore
   * « Clique sur Démarrer une mission » n'est pas un aperçu dégradé, c'est le
   * contraire de ce qu'on promet : il part en échec, et le script le nomme.
   */
  const texte = await page.evaluate(() => document.body.innerText.replace(/\s+/g, " ").trim());
  if (texte.includes(attendu)) {
    throw new Error(`vue ${vue} : l'écran d'attente est encore affiché — rien n'a démarré`);
  }
  /**
   * ⚠️ ET UNE PAGE PRESQUE VIDE EST AUSSI UN ÉCHEC.
   *
   * En vue simple, rien dans le texte ne dit « je n'ai pas démarré » : on
   * photographierait un cadre blanc sans un mot d'avertissement. Le seul signe
   * qui reste est la QUANTITÉ. 120 caractères, c'est bien en dessous du moindre
   * énoncé — mais bien au-dessus d'un écran vide.
   */
  if (texte.length < 120) {
    throw new Error(`vue ${vue} : écran quasi vide (${texte.length} caractères)`);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  return page.screenshot({ type: "png" });
}

/** Les écrans, recollés de haut en bas et encodés en WebP — par Chrome. */
async function empiler(bandes: Buffer[]): Promise<Buffer> {
  const sources = bandes.map((b) => `data:image/png;base64,${b.toString("base64")}`);
  const sortie = await encodeur.evaluate(
    async ({ sources, largeur, ls, hs, qualite }) => {
      const hBande = Math.round((hs * largeur) / ls);
      const canvas = document.createElement("canvas");
      canvas.width = largeur;
      canvas.height = hBande * sources.length;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingQuality = "high";
      for (let i = 0; i < sources.length; i += 1) {
        const img = new Image();
        img.src = sources[i];
        await img.decode();
        ctx.drawImage(img, 0, i * hBande, largeur, hBande);
      }
      return canvas.toDataURL("image/webp", qualite);
    },
    { sources, largeur: LARGEUR_SERVIE, ls: LARGEUR, hs: HAUTEUR, qualite: QUALITE },
  );
  if (!sortie.startsWith("data:image/webp")) throw new Error("Chrome n'a pas encodé en WebP");
  return Buffer.from(sortie.split(",")[1], "base64");
}

/**
 * LE MANIFESTE — reconstruit depuis le DOSSIER, jamais depuis ce qui vient
 * d'être fait : une fournée partielle ne doit pas effacer le reste.
 *
 * ⚠️ La clé est le TRIPLET, et c'est indispensable : un identifiant de notion
 * n'est unique qu'à l'intérieur d'une classe. « fraction » en CM2,
 * « fraction_nombre » en 6e, « fraction_rationnel » en 3e (voir la note de
 * lib/matrice/coach.ts). Un dossier à plat obligerait à inventer une clé
 * composée ; l'arborescence la porte toute seule.
 */
function ecrireManifeste() {
  const lignes: string[] = [];
  if (fs.existsSync(SORTIE)) {
    for (const matiere of fs.readdirSync(SORTIE).sort()) {
      for (const classe of fs.readdirSync(path.join(SORTIE, matiere)).sort()) {
        for (const f of fs.readdirSync(path.join(SORTIE, matiere, classe)).sort()) {
          const cor = /^(.+)\.(\d)\.webp$/.exec(f);
          if (cor) lignes.push(`  ${JSON.stringify(`${matiere}/${classe}/${cor[1]}`)}: ${cor[2]},`);
        }
      }
    }
  }

  const contenu = `// lib/tutor-v4/apercus.generated.ts
//
// ⚠️ FICHIER GÉNÉRÉ — ne pas modifier à la main.
//     npm run capturer:apercus-coach -- http://localhost:3000 --tout
//
// Les notions qui ont un aperçu dans public/apercus/coach/, et le nombre
// d'écrans de chacune. La clé est « matiere/classe/notion » : un identifiant de
// notion n'est unique qu'à l'intérieur d'une classe.
//
// Une notion absente d'ici n'ouvre pas de fenêtre au survol — sa ligne reste
// exactement ce qu'elle était.

export const APERCUS_COACH: Readonly<Record<string, number>> = {
${lignes.join("\n")}
};

/** Le chemin de l'aperçu d'une notion, ou \`null\` si elle n'en a pas. */
export function apercuNotion(
  matiere: string,
  classe: string,
  notion: string,
): { src: string; ecrans: number } | null {
  const cle = \`\${matiere}/\${classe}/\${notion}\`;
  const ecrans = APERCUS_COACH[cle];
  if (!ecrans) return null;
  return { src: \`/apercus/coach/\${cle}.\${ecrans}.webp\`, ecrans };
}
`;
  fs.writeFileSync(MANIFESTE, contenu, "utf8");
  console.log(`Manifeste : ${lignes.length} aperçu(s) → lib/tutor-v4/apercus.generated.ts`);
}
