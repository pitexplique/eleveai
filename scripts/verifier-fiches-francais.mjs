// Vérifie les DESSINS d'une fiche de français sans ouvrir le site.
//
// ⭐ POURQUOI CE SCRIPT EXISTE (24/08/2026). `apercu-canvas.mjs` fait déjà les
// deux bonnes mesures — la taille finale des lettres et le débordement du cadre
// — mais il attend un `figures.json` écrit à la main. Une fiche de français en
// porte une quarantaine : personne ne les recopie, donc personne ne les mesure.
// Celui-ci les EXTRAIT du module de la fiche, en descendant l'arbre React des
// champs `figure`, `proprietes[].schema`, `methode[].schema`, `usages[].schema`,
// `exemples[].schema` et `formule.schema`.
//
// ⭐ ET SURTOUT : il mesure CHAQUE texte, pas seulement le plus gros. C'est ce
// qui manquait. `apercu-canvas.mjs` juge un dessin sur sa plus grande police —
// or les 98 textes illisibles de la fiche du groupe nominal de 5e étaient les
// PLUS PETITS : les natures, écrites en 10, affichées en 8,6 sur un téléphone.
// Un dessin dont le titre est lisible peut avoir toutes ses étiquettes en dessous
// du plancher.
//
// ⚠️ CHAQUE DESSIN EST JUGÉ À LA LARGEUR DE SON PROPRE BLOC, pas à une largeur
// moyenne. Les trois valeurs sont MESURÉES sur la page rendue en 375 px, pas
// estimées :
//   201 px — une carte de méthode, le bloc le plus étroit de la fiche ;
//   218 px — une carte de propriété ou d'usage ;
//   226 px — la figure de référence, la formule et les exemples corrigés.
// Appliquer 201 partout serait plus sévère que la réalité, et condamnerait des
// dessins que le CATALOGUE réserve déjà aux blocs larges — la frise, par exemple.
//
// Usage : node scripts/verifier-fiches-francais.mjs [fichier.tsx…]
//         (sans argument : toutes les fiches lib/fiches/francais-*.tsx)
// Sortie : code 1 si un texte passe sous 11 px ou sort de son cadre.

import { readdirSync } from "node:fs";
import { dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const ici = dirname(fileURLToPath(import.meta.url));
const racine = resolve(ici, "..");

// `jsx: true` est indispensable : sans lui, jiti lit les `.tsx` comme du TS et
// s'arrête sur le premier `<CanvasRenderer … />`.
const jiti = createJiti(import.meta.url, { alias: { "@": racine }, interopDefault: true, jsx: true });

const React = await jiti.import("react", { default: true });
const { renderToStaticMarkup } = await jiti.import("react-dom/server");
globalThis.React = React;

const POLICE_MINI = 11;
/** La largeur réelle du bloc qui reçoit le dessin, rubrique par rubrique. */
const LARGEUR_BLOC = {
  figure: 226,
  formule: 226,
  proprietes: 218,
  methode: 201,
  usages: 218,
  exemples: 226,
};
// Le même coefficient que `largeurTexte` dans PhraseCanvas : on mesure avec la
// règle du dessinateur, sinon on signale des débordements qui n'existent pas.
const LARGEUR_CARACTERE = 0.62;
const MARGE_DEBORDEMENT = 2;

const demandes = process.argv.slice(2);
const fichiers = demandes.length
  ? demandes.map((f) => resolve(process.cwd(), f))
  : readdirSync(resolve(racine, "lib/fiches"))
      .filter((f) => f.startsWith("francais-") && f.endsWith(".tsx"))
      .map((f) => resolve(racine, "lib/fiches", f));

/** Descend l'arbre React et rend chaque dessin trouvé. */
function collecter(noeud, html) {
  if (!noeud || typeof noeud !== "object") return;
  if (Array.isArray(noeud)) {
    for (const n of noeud) collecter(n, html);
    return;
  }
  if (noeud.props?.figure) {
    html.push(renderToStaticMarkup(noeud));
    return;
  }
  if (noeud.props?.children) collecter(noeud.props.children, html);
}

function dessinsDe(fiche) {
  const sources = [
    ["figure", fiche.figure?.schema],
    ["formule", fiche.formule?.schema],
    ...(fiche.proprietes ?? []).map((p) => ["proprietes", p.schema]),
    ...(fiche.methode ?? []).map((m) => ["methode", m.schema]),
    ...(fiche.usages ?? []).map((u) => ["usages", u.schema]),
    ...(fiche.exemples ?? []).map((e) => ["exemples", e.schema]),
  ].filter(([, s]) => s);

  const dessins = [];
  for (const [rubrique, s] of sources) {
    const html = [];
    collecter(s, html);
    for (const h of html) dessins.push({ rubrique, html: h });
  }
  return dessins;
}

let fautes = 0;

for (const fichier of fichiers) {
  const mod = await jiti.import(fichier);
  const fiche = Object.values(mod).find((v) => v && typeof v === "object" && v.notion && v.titre);
  if (!fiche) {
    console.log(`\n⚠️ ${basename(fichier)} — aucune FicheCoursData exportée`);
    continue;
  }

  const dessins = dessinsDe(fiche);
  let mini = Infinity;
  const tropPetits = [];
  const debordements = [];
  const chevauchements = [];

  for (const { rubrique, html } of dessins) {
    // ⛔ TROISIÈME MESURE, AJOUTÉE LE 28/08/2026 : DEUX ÉTIQUETTES QUI S'ÉCRIVENT
    // L'UNE SUR L'AUTRE. Les deux mesures d'avant — la taille de police et le
    // débordement du cadre — la laissaient passer entièrement : un texte peut
    // être à 12 px, tenir dans le cadre, et être illisible parce qu'un autre
    // texte occupe les mêmes pixels. Vérifié au navigateur sur la fiche des
    // pronoms de 6e : deux étiquettes « pronom » se recouvrent de 11 px, ligne
    // des natures, et rien ne le signalait.
    //
    // ⛔⛔ ON NE COMPARE QUE DES TEXTES DE MÊME LIGNE DE BASE (même `y`), ET
    // C'EST TOUT L'INTÉRÊT. Comparer les extensions horizontales sans regarder le
    // `y` fait crier au loup : `number_line` DÉCALE EN HAUTEUR les étiquettes qui
    // ne tiendraient pas côte à côte (y = 62, 40, 18, 4), et une frise de quatre
    // périodes affiche ainsi « Moyen Âge » et « Renaissance » sur des extensions
    // qui se recouvrent de 56 px sans qu'un seul pixel soit partagé.
    const surLaLigne = new Map();

    const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(html);
    if (!vb) continue;
    const largeurVb = Number(vb[1]);
    const largeurBloc = LARGEUR_BLOC[rubrique] ?? 201;

    for (const t of html.matchAll(/<text([^>]*)>([^<]*)<\/text>/g)) {
      const attrs = t[1];
      const texte = t[2]
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&");
      if (!texte.trim()) continue;
      const police = Number(/font-size="([\d.]+)"/.exec(attrs)?.[1] ?? 15);

      // La taille finale se juge dans LE bloc de ce dessin — un SVG se met à
      // l'échelle de son conteneur, et il n'y en a qu'un.
      const echelle = Math.min(1, largeurBloc / largeurVb);
      const effective = police * echelle;
      if (effective < mini) mini = effective;
      if (effective < POLICE_MINI) {
        tropPetits.push(
          `« ${texte.slice(0, 28)} » : ${effective.toFixed(1)} px dans le bloc ${rubrique} (${largeurBloc} px)`
        );
      }

      const x = Number(/\bx="([\d.-]+)"/.exec(attrs)?.[1] ?? 0);
      const ancre = /text-anchor="([a-z]+)"/.exec(attrs)?.[1] ?? "start";
      const large = texte.length * police * LARGEUR_CARACTERE;
      const gauche = ancre === "middle" ? x - large / 2 : ancre === "end" ? x - large : x;
      if (gauche < -MARGE_DEBORDEMENT || gauche + large > largeurVb + MARGE_DEBORDEMENT) {
        debordements.push(
          `« ${texte.slice(0, 28)} » occupe [${gauche.toFixed(0)} ; ${(gauche + large).toFixed(0)}] dans ${largeurVb.toFixed(0)} px`
        );
      }

      const y = /\by="([\d.-]+)"/.exec(attrs)?.[1];
      if (y !== undefined) {
        if (!surLaLigne.has(y)) surLaLigne.set(y, []);
        surLaLigne.get(y).push({ texte, gauche, droite: gauche + large, echelle });
      }
    }

    // Sur chaque ligne de base, deux voisins ne doivent pas se recouvrir. Le
    // recouvrement est ramené à l'échelle du bloc : deux pixels dans le viewBox
    // d'un dessin réduit de moitié n'en font qu'un sous les yeux de l'élève.
    for (const [, textes] of surLaLigne) {
      const tries = [...textes].sort((a, b) => a.gauche - b.gauche);
      for (let i = 1; i < tries.length; i += 1) {
        const avant = tries[i - 1];
        const apres = tries[i];
        const recouvrement = (avant.droite - apres.gauche) * apres.echelle;
        if (recouvrement > MARGE_DEBORDEMENT) {
          chevauchements.push(
            `« ${avant.texte.slice(0, 20)} » et « ${apres.texte.slice(0, 20)} » ` +
              `se superposent sur ${recouvrement.toFixed(0)} px dans le bloc ${rubrique}`
          );
        }
      }
    }
  }

  const ok = !tropPetits.length && !debordements.length && !chevauchements.length;
  console.log(
    `\n${ok ? "✅" : "⛔"} ${basename(fichier)} — ${dessins.length} dessins, ` +
      `police minimale ${Number.isFinite(mini) ? mini.toFixed(1) : "—"} px`
  );
  for (const p of [...new Set(tropPetits)].slice(0, 6)) console.log(`   ⛔ trop petit : ${p}`);
  if (tropPetits.length > 6) console.log(`   ⛔ … et ${tropPetits.length - 6} autres`);
  for (const d of [...new Set(debordements)].slice(0, 6)) console.log(`   ⛔ hors cadre : ${d}`);
  if (debordements.length > 6) console.log(`   ⛔ … et ${debordements.length - 6} autres`);
  for (const c of [...new Set(chevauchements)].slice(0, 6)) console.log(`   ⛔ superposé : ${c}`);
  if (chevauchements.length > 6) console.log(`   ⛔ … et ${chevauchements.length - 6} autres`);
  fautes += tropPetits.length + debordements.length + chevauchements.length;
}

console.log(
  fautes
    ? `\n⛔ ${fautes} problème(s). Le plancher : ${POLICE_MINI} px une fois le dessin à l'échelle de son bloc (REGLES.md § 2 quater).`
    : `\n✅ Toutes les fiches vérifiées : aucun texte sous ${POLICE_MINI} px, aucun hors cadre.`
);
process.exit(fautes ? 1 : 0);
