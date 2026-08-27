/**
 * Fabrique les APERÇUS DE SURVOL des cartes de l'accueil — un à deux écrans de
 * la ressource, pris sur le site réel, empilés dans une seule bande.
 *
 * ── LA RÉFÉRENCE EST IXL, ET ELLE EST PRÉCISE ────────────────────────────────
 * Frédéric, 26/08/2026 : « quand la souris passe sur les cards il faut trois
 * screenshots de ce qui les attend », « un peu comme IXL lorsqu'on passe la
 * souris sur une compétence » — puis, une heure plus tard : « déjà un
 * screenshot, voire deux maximum ». Le plafond est donc à deux (voir
 * `ECRANS_MAX`), et la mécanique, elle, est bien celle d'IXL.
 *
 * Chez IXL, survoler une compétence ouvre une petite fenêtre intitulée « Aperçu
 * des exercices », avec QUATRE PASTILLES en haut à droite : la fenêtre montre
 * un exemple, puis le suivant, puis le suivant. Ce ne sont pas des morceaux
 * d'une page qui glisse — ce sont des ÉTATS, présentés l'un après l'autre, et
 * les pastilles disent combien il en reste. C'est cette mécanique-là qui est
 * reproduite, et c'est elle qui décide de la forme du fichier produit.
 *
 * ── CE QUE ÇA PRODUIT ────────────────────────────────────────────────────────
 * Un fichier par ressource : `public/apercus/<id>.<n>.webp`, large de 680 px,
 * fait de `n` bandes (1 ou 2) au format 16:10 chacune — le rapport d'un écran
 * d'ordinateur portable, celui du panneau qui les affiche. Chaque
 * bande est une capture à une position de défilement différente — le haut de la
 * page, puis un écran plus bas.
 *
 * UN SEUL FICHIER, ET PAS DEUX :
 *   — une requête au survol au lieu de deux, donc une fenêtre qui s'ouvre d'un
 *     coup au lieu de se remplir par morceaux ;
 *   — passer d'un écran au suivant devient un `translateY` d'une fraction, en
 *     CSS. Rien à précharger entre deux pastilles.
 *
 * ⚠️ LE NOMBRE D'ÉCRANS EST DANS LE NOM DU FICHIER, et ce n'est pas une
 * coquetterie. Le composant doit savoir de combien il translate et combien de
 * pastilles dessiner. L'écrire dans le nom, c'est s'assurer qu'un fichier et sa
 * géométrie ne peuvent JAMAIS se désynchroniser : ils voyagent ensemble. Une
 * page courte ne fait qu'un écran, et sa carte n'affiche alors qu'une pastille.
 *
 * ── POURQUOI DE VRAIES CAPTURES, ALORS QU'ApercuRessource.tsx L'AVAIT REFUSÉ ──
 * La vignette de gauche reste dessinée, et les trois objections écrites en tête
 * d'ApercuRessource.tsx restent vraies POUR ELLE. Ce fichier-ci ne les contredit
 * pas, il change les trois termes :
 *
 *   1. LE POIDS. Une capture n'est chargée QUE si quelqu'un survole la carte, et
 *      une seule à la fois. Personne ne paie l'octet d'un aperçu qu'il ne
 *      regarde pas — alors qu'une vignette s'affiche six fois par écran, à tout
 *      le monde, à chaque question. Le survol, lui, est un signe d'intention.
 *   2. LA PÉREMPTION. Elle reste entière : ces fichiers mentent le jour où la
 *      page change, et rien ne les relit. La parade est que le script est
 *      REJOUABLE en une commande — et qu'il n'écrase que ce qu'on lui nomme.
 *   3. LA LISIBILITÉ. L'objection était « à 96 px, c'est une bouillie grise ».
 *      Elle valait pour la vignette. La fenêtre du survol fait 340 px de large
 *      et ne s'ouvre qu'à partir de 1536 px d'écran : on y lit une question, un
 *      bouton, une correction.
 *
 * ── POURQUOI `playwright-core` ET CHROME ─────────────────────────────────────
 * Même raison que scripts/build-fiches-pdf.ts : `playwright-core` fait 14 Mo et
 * pilote le Chrome déjà installé (`channel: "chrome"`), au lieu de télécharger
 * ~300 Mo de navigateurs. Dépendance de développement : elle ne part jamais en
 * production, puisque les aperçus sont fabriqués ici et servis en statique.
 *
 * ⚠️ L'EMPILEMENT ET LE WEBP SONT FAITS PAR CHROME LUI-MÊME. Playwright ne sort
 * que du PNG et du JPEG, et le projet n'a ni `sharp` ni aucune bibliothèque
 * d'images. Les captures sont donc recollées dans un onglet à part : un
 * `<canvas>`, un `drawImage` par écran, puis `toDataURL("image/webp")`. Zéro
 * dépendance ajoutée, et un facteur 3 à 5 sur le poids par rapport au PNG.
 *
 * ── USAGE ────────────────────────────────────────────────────────────────────
 *   1. lancer le site en local — et LE RELANCER si le serveur tourne depuis
 *      longtemps : le rechargement à chaud perd des feuilles de style, et une
 *      capture ne dit pas pourquoi elle est laide (même piège que les PDF) ;
 *   2. npm run capturer:apercus -- http://localhost:3000 [--tout] [id…]
 *
 * Sans argument, le script ne capture QUE les ressources qui n'ont pas encore
 * de fichier : relancer coûte alors une seconde. `--tout` refait tout le monde.
 * Des identifiants nommés ne refont que ceux-là (`coach-maths parcours`).
 *
 * ⛔ NE PAS DÉPLACER ÇA SUR VERCEL. Un Chrome en fonction serverless, c'est
 * 50 Mo de paquet et une facture à chaque requête, sur un site dont le quota se
 * compte au poids relu. Un .webp statique coûte zéro à l'exécution.
 */
import fs from "node:fs";
import path from "node:path";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";
import { chromium, type Page } from "playwright-core";

/**
 * ⚠️ LE CROCHET DE RÉSOLUTION, ET IL N'EST PAS DÉCORATIF.
 *
 * `lib/matrice/ressources.ts` importe `./guides` et `./types` SANS extension —
 * c'est la façon d'écrire de tout le projet, et TypeScript la comprend. Node,
 * lui, ne la résout pas : `--experimental-strip-types` retire les types, il ne
 * fait pas la résolution de modules de TypeScript. Sans ce crochet, l'import du
 * registre échoue sur `Cannot find module '…/lib/matrice/guides'`.
 *
 * L'alternative aurait été de recopier ici la liste des ressources à capturer.
 * C'est exactement la liste qui se met à mentir : une ressource ajoutée au
 * registre n'aurait pas d'aperçu, et personne ne s'en apercevrait. Le registre
 * reste la seule source.
 */
registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith(".") && !/\.[a-z]+$/i.test(specifier)) {
      return next(specifier + ".ts", context);
    }
    return next(specifier, context);
  },
});

const { RESSOURCES, STATUTS_PUBLIABLES } = await import("../lib/matrice/ressources.ts");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SORTIE = path.join(__dirname, "..", "public", "apercus");
const MANIFESTE = path.join(__dirname, "..", "lib", "matrice", "apercus.generated.ts");

/**
 * LA FENÊTRE DE CAPTURE — 800 × 500, ET LES DEUX CHIFFRES ONT UNE RAISON.
 *
 * ── LE RAPPORT : 16:10, PARCE QU'UN APERÇU D'ÉCRAN A LA FORME D'UN ÉCRAN ─────
 * Frédéric, 26/08 : « ils doivent avoir le même rapport qu'un écran PC ou
 * téléphone, non ? ». Oui. La première version capturait en 1180 × 760, soit
 * 1,553:1 — un rapport qui ne s'appelle pas, tombé de la taille qu'on avait sous
 * la main. 16:10, c'est le format des écrans de portable, et c'est celui que le
 * panneau de survol annonce en une ligne (`aspect-ratio: 16 / 10`).
 *
 * PC ET PAS TÉLÉPHONE, ET C'EST LIÉ : l'aperçu ne s'ouvre qu'à partir de
 * 1536 px de large, donc devant quelqu'un qui est sur un ordinateur. Lui montrer
 * une capture de téléphone lui montrerait un écran qu'il n'aura jamais.
 *
 * ── ⭐ LA TAILLE : 800 ET NON 1200, ET C'EST LA LISIBILITÉ QUI A TRANCHÉ ──────
 * La première fournée capturait en 1200 × 750, « la vraie largeur d'un
 * portable ». Rendue dans un panneau de 380 px, ça fait une réduction à 32 % :
 * la page du coach — deux colonnes de listes de notions — y devenait
 * exactement la « bouillie grise » qu'ApercuRessource.tsx refusait en tête de
 * fichier. On avait reproduit l'objection qu'on croyait avoir contournée.
 *
 * Frédéric, en voyant le résultat : « peut-être que tu devrais réduire la
 * fenêtre puis faire une capture d'écran ». C'est le bon geste, et il gagne sur
 * les deux tableaux :
 *   — 800 px rendus dans 380, c'est 47 % au lieu de 32 % : un titre se lit, une
 *     promesse se lit, un bouton se reconnaît ;
 *   — et surtout, à 800 px le site passe SOUS son point de rupture `lg`. Les
 *     mises en page à deux colonnes se replient en une seule. Ce n'est pas
 *     seulement plus gros : il y a moins de choses à la fois.
 *
 * ⛔ NE PAS DESCENDRE PLUS BAS pour gagner encore en taille. Sous ~700 px on
 * bascule dans la mise en page de téléphone, et on montrerait alors un écran que
 * le survolant — qui est sur 1536 px au moins — n'aura jamais devant lui.
 *
 * ⚠️ CE RAPPORT EST RECOPIÉ DANS LE COMPOSANT (`aspect-ratio: 16 / 10`). C'est
 * lui qui fait qu'une bande tombe pile dans la fenêtre du survol : si on le
 * change ici, il faut le changer là-bas, sinon les écrans se chevauchent.
 */
const LARGEUR = 800;
const HAUTEUR = 500;
/**
 * DEUX ÉCRANS AU PLUS — et c'est un plafond revu à la baisse le jour même.
 *
 * La demande de départ disait trois. Frédéric, une heure plus tard : « déjà un
 * screenshot, voire deux maximum ». Il a raison, et la raison se voit dans ce
 * que produisent les captures : le premier écran dit CE QUE C'EST (le titre, la
 * promesse, le premier bouton), le deuxième dit CE QU'ON Y FAIT (l'exercice, la
 * question, la liste). Le troisième, sur la plupart de ces pages, ne dit plus
 * rien de neuf — il montre le bas d'une liste, ou du blanc.
 *
 * Et il coûte deux fois : un tiers de poids en plus sur chaque fichier, et
 * ~2 secondes de plus avant que la fenêtre ne revienne au premier écran — c'est-
 * à-dire un survol entier pendant lequel on regarde une page de remplissage.
 *
 * C'est aussi le nombre de pastilles de la fenêtre de survol.
 */
const ECRANS_MAX = 2;
/**
 * La bande servie fait 760 px : deux fois le panneau de 380, pour les écrans à
 * forte densité. Au-delà on paie des pixels que personne ne distingue — et de
 * toute façon la source n'en a que 800 : agrandir n'inventerait rien.
 */
const LARGEUR_SERVIE = 760;
/** 0,72 — en dessous, les traits fins des captures d'interface bavent. */
const QUALITE = 0.72;

/**
 * CE QU'ON NE CAPTURE PAS, ET POURQUOI C'EST NOMMÉ ICI PLUTÔT QUE DEVINÉ.
 *
 * Ces pages existent, sont publiées, et méritent leur carte — mais derrière une
 * session. Un robot non connecté n'y voit qu'un écran vide ou une invitation à
 * se connecter : la capture montrerait le contraire de ce qu'elle promet.
 * ⚠️ Leur carte garde donc sa vignette dessinée et n'ouvre pas de fenêtre au
 * survol. C'est le comportement voulu, pas un trou : le composant n'affiche
 * l'aperçu que si le manifeste connaît l'identifiant.
 */
const SANS_CAPTURE = new Set(["dashboard-eleve", "dashboard-prof", "dashboard-principal"]);

type Cible = { id: string; url: string };

const CIBLES: Cible[] = RESSOURCES.filter(
  (r) =>
    STATUTS_PUBLIABLES.includes(r.statut) &&
    !r.externe &&
    !SANS_CAPTURE.has(r.id) &&
    r.url.startsWith("/"),
).map((r) => ({ id: r.id, url: r.url }));

// ── Les arguments ────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const base = (args.find((a) => a.startsWith("http")) ?? "http://localhost:3000").replace(/\/$/, "");
const tout = args.includes("--tout");
const nommes = args.filter((a) => !a.startsWith("http") && !a.startsWith("--"));

fs.mkdirSync(SORTIE, { recursive: true });

/** Les fichiers déjà là, par identifiant. `<id>.<n>.webp` → id. */
function dejaLa(): Map<string, string> {
  const m = new Map<string, string>();
  for (const f of fs.readdirSync(SORTIE)) {
    const cor = /^(.+)\.(\d)\.webp$/.exec(f);
    if (cor) m.set(cor[1], f);
  }
  return m;
}

const inconnus = nommes.filter((n) => !CIBLES.some((c) => c.id === n));
if (inconnus.length > 0) {
  console.error(`✖ identifiants absents du registre : ${inconnus.join(", ")}`);
  process.exit(1);
}

const presents = dejaLa();
const aFaire = CIBLES.filter((c) => {
  if (nommes.length > 0) return nommes.includes(c.id);
  if (tout) return true;
  return !presents.has(c.id);
});

console.log(`${aFaire.length} aperçu(s) à fabriquer depuis ${base}`);
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
  // ⚠️ Le mouvement est coupé À LA SOURCE. Une page qui anime son entrée serait
  // capturée à mi-chemin — un titre à moitié transparent, une carte qui glisse.
  // `reducedMotion` fait respecter `prefers-reduced-motion` par le site lui-même.
  reducedMotion: "reduce",
});
const page = await contexte.newPage();
/** L'onglet qui ne sert qu'à recoller et encoder : un canvas, rien à charger. */
const encodeur = await contexte.newPage();
await encodeur.goto("about:blank");

let faits = 0;
let rates = 0;

for (const cible of aFaire) {
  try {
    const { octets, ecrans } = await capturer(page, cible);
    // L'ancien fichier part : son nom porte peut-être un autre nombre d'écrans,
    // et deux fichiers pour un même identifiant, c'est le manifeste qui tranche
    // au hasard de l'ordre de lecture du dossier.
    const ancien = dejaLa().get(cible.id);
    if (ancien) fs.rmSync(path.join(SORTIE, ancien));
    fs.writeFileSync(path.join(SORTIE, `${cible.id}.${ecrans}.webp`), octets);
    faits += 1;
    console.log(
      `  ✓ ${cible.id.padEnd(30)} ${ecrans} écran(s)  ${(octets.length / 1024).toFixed(0)} Ko`,
    );
  } catch (e) {
    rates += 1;
    console.error(`  ✖ ${cible.id.padEnd(30)} ${(e as Error).message.split("\n")[0]}`);
  }
}

await navigateur.close();
ecrireManifeste();
console.log(`\n${faits} aperçu(s) écrits, ${rates} en échec.`);

// ── La capture d'une page ────────────────────────────────────────────────────
async function capturer(page: Page, cible: Cible): Promise<{ octets: Buffer; ecrans: number }> {
  await page.goto(`${base}${cible.url}`, { waitUntil: "load", timeout: 30000 });

  // Le réseau se calme, ou pas — une page qui interroge en continu (un coach,
  // un rituel) n'atteindra jamais `networkidle`, et ce n'est pas une erreur.
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});

  /**
   * ⚠️ L'EN-TÊTE ET LE PIED PARTENT AVANT LA CAPTURE.
   *
   * L'en-tête du site est `sticky top-0` : il serait présent sur chacune des
   * captures, donc deux fois dans la bande, et il mangerait 66 px de chacun des
   * écrans qu'on a justement choisi de montrer. Le pied, lui, est le même sur
   * toutes les pages : il n'apprend rien et remplit le second écran.
   * Ce qu'on montre, c'est ce qui DISTINGUE la ressource.
   */
  /**
   * ⚠️ `[data-hors-apercu]` — LE CHROME QUE LE SITE DÉCLARE LUI-MÊME.
   *
   * Le bandeau « Installer l'app » vit dans app/layout.tsx : il est donc en tête
   * de TOUTES les pages, et il occupait le haut de chacun des écrans capturés.
   * Il n'est ni `sticky` ni `fixed` — le filtre des voiles ne le voyait pas — et
   * il n'est pas assez grand pour se faire remarquer autrement.
   * On ne le nomme pas par sa classe : c'est LUI qui porte l'attribut, dans
   * components/DevBanner.tsx. Un futur bandeau n'aura qu'à faire pareil, et
   * personne n'aura à revenir modifier ce script.
   */
  await page.addStyleTag({
    content: `
      header, footer, [data-hors-apercu] { display: none !important; }
      html { scroll-behavior: auto !important; }
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
      }
    `,
  });

  /**
   * LES VOILES : tout ce qui est `fixed` et couvre un quart de l'écran.
   *
   * Le bandeau « Installer l'app », une invitation à s'inscrire, un coach
   * flottant. Ils sont légitimes sur le site et ruinent une capture : on
   * photographierait la modale, pas la ressource. On ne les nomme pas un par
   * un — la liste changerait sans prévenir. On retire ce qui est fixe ET large.
   */
  await page.evaluate(() => {
    for (const el of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
      if (getComputedStyle(el).position !== "fixed") continue;
      const r = el.getBoundingClientRect();
      if (r.width * r.height > window.innerWidth * window.innerHeight * 0.25) {
        el.style.display = "none";
      }
    }
  });

  // Les polices, puis un souffle : une capture prise avant que les polices
  // soient posées montre un texte qui n'est pas celui du site.
  await page.evaluate(() => (document as unknown as { fonts: FontFaceSet }).fonts.ready);
  await page.waitForTimeout(900);

  // Les images paresseuses ne se chargent qu'une fois vues : on descend jusqu'au
  // bas de ce qu'on va capturer, puis on remonte. Sans ça, le deuxième et le
  // troisième écran sont des trous blancs.
  await page.evaluate((h) => window.scrollTo(0, h), ECRANS_MAX * HAUTEUR);
  await page.waitForTimeout(700);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const hauteurDoc = await page.evaluate(() => document.documentElement.scrollHeight);
  const ecrans = Math.max(1, Math.min(ECRANS_MAX, Math.ceil(hauteurDoc / HAUTEUR)));

  /**
   * ⚠️ UNE CAPTURE PAR ÉCRAN, PAS UNE DÉCOUPE D'UNE GRANDE.
   *
   * On pourrait prendre une seule image haute de deux écrans et la couper.
   * Deux raisons de ne pas le faire, et la seconde est celle qui compte :
   *   — un élément `sticky` (une barre d'onglets, un sommaire) apparaît dans une
   *     capture pleine hauteur à sa place de DÉPART, pas à celle qu'il occupe
   *     réellement quand on a descendu d'un écran ;
   *   — la dernière bande est CALÉE SUR LE BAS DE LA PAGE (`hauteurDoc - HAUTEUR`)
   *     et non sur un multiple de la hauteur d'écran. Une page d'une hauteur et
   *     demie donne donc deux écrans pleins qui se chevauchent un peu, au lieu
   *     d'un second écran à moitié blanc. On ne montre jamais de vide.
   */
  const bandes: Buffer[] = [];
  for (let k = 0; k < ecrans; k += 1) {
    const y = Math.max(0, Math.min(k * HAUTEUR, hauteurDoc - HAUTEUR));
    await page.evaluate((py) => window.scrollTo(0, py), y);
    await page.waitForTimeout(450);
    bandes.push(await page.screenshot({ type: "png" }));
  }

  return { octets: await empiler(bandes), ecrans };
}

/** Les bandes, recollées de haut en bas et encodées en WebP — par Chrome. */
async function empiler(bandes: Buffer[]): Promise<Buffer> {
  const sources = bandes.map((b) => `data:image/png;base64,${b.toString("base64")}`);
  const sortie = await encodeur.evaluate(
    async ({ sources, largeur, largeurSource, hauteurSource, qualite }) => {
      const hBande = Math.round((hauteurSource * largeur) / largeurSource);
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
    {
      sources,
      largeur: LARGEUR_SERVIE,
      largeurSource: LARGEUR,
      hauteurSource: HAUTEUR,
      qualite: QUALITE,
    },
  );
  if (!sortie.startsWith("data:image/webp")) throw new Error("Chrome n'a pas encodé en WebP");
  return Buffer.from(sortie.split(",")[1], "base64");
}

/**
 * LE MANIFESTE — l'identifiant, et le nombre d'écrans qu'il a. Rien d'autre.
 *
 * Il se reconstruit depuis le DOSSIER, pas depuis ce qui vient d'être fait :
 * une exécution partielle (`… coach-maths`) ne doit pas effacer les aperçus des
 * autres. Et il ne stocke aucune dimension en pixels : la bande porte les
 * siennes dans ses pixels, le CSS s'en sert directement, et le seul chiffre qui
 * manquait au composant — combien de pastilles — est déjà dans le nom du
 * fichier. Un manifeste qui ne recopie rien est un manifeste qui ne peut pas se
 * désynchroniser.
 */
function ecrireManifeste() {
  const lignes: string[] = [];
  for (const f of fs.readdirSync(SORTIE).sort()) {
    const cor = /^(.+)\.(\d)\.webp$/.exec(f);
    if (cor) lignes.push(`  ${JSON.stringify(cor[1])}: ${cor[2]},`);
  }

  const contenu = `// lib/matrice/apercus.generated.ts
//
// ⚠️ FICHIER GÉNÉRÉ — ne pas modifier à la main.
//     npm run capturer:apercus -- http://localhost:3000
//
// Les ressources qui ont une bande d'aperçu dans public/apercus/, et le nombre
// d'écrans que porte chacune (1 ou 2) — c'est-à-dire le nombre de pastilles de
// la fenêtre de survol, et le pas dont elle translate la bande.
//
// Une ressource absente d'ici garde sa vignette dessinée et n'ouvre pas de
// fenêtre au survol : c'est le cas des pages derrière une session, qu'un robot
// non connecté ne peut pas photographier honnêtement.

export const APERCUS: Readonly<Record<string, number>> = {
${lignes.join("\n")}
};

/** Le chemin de la bande d'une ressource, ou \`null\` si elle n'en a pas. */
export function bandeApercu(id: string): { src: string; ecrans: number } | null {
  const ecrans = APERCUS[id];
  if (!ecrans) return null;
  return { src: \`/apercus/\${id}.\${ecrans}.webp\`, ecrans };
}
`;
  fs.writeFileSync(MANIFESTE, contenu, "utf8");
  console.log(`Manifeste : ${lignes.length} aperçu(s) → lib/matrice/apercus.generated.ts`);
}
