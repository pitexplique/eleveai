// Audit : un secret part-il dans le JavaScript envoyé au navigateur ?
//
// Né d'une fuite réelle (31/07/2026) : les liens visio, annotés « PRIVÉ,
// jamais affiché sur le site », étaient lisibles en clair dans un chunk JS.
// Le contrôle de l'époque ne regardait que le HTML — les liens n'y étaient
// pas, ils étaient dans le JavaScript.
//
// Ce script fait donc les deux passes :
//   1. DYNAMIQUE — télécharge tous les chunks JS des pages listées et y
//      cherche la VALEUR de chaque variable d'environnement non publique.
//      C'est le seul test qui prouve quelque chose.
//   2. STATIQUE — repère les modules importés par un composant "use client"
//      qui contiennent des motifs sensibles (liens de visio, clés, mots de
//      passe, jetons). Sert d'alerte précoce sur du code non encore rendu.
//
// ⚠️ Ce script n'affiche JAMAIS la valeur d'un secret : uniquement le NOM de
// la variable concernée et l'endroit où elle fuite.
//
// Usage : node scripts/audit-fuites-client.mjs [http://localhost:3000]

import fs from "node:fs";
import path from "node:path";

const BASE = process.argv[2] || "http://localhost:3000";

const PAGES = [
  "/accueil",
  "/concours-avenir",
  "/francais-de-l-etranger",
  "/contact",
  "/entreprises",
  "/tarifs",
  "/coach-ia/maths",
  "/guide-de-survie",
  "/cahier-vacances",
  "/simulateurs",
  "/dictee-du-jour",
  "/espace-eleves",
];

/* ============================ 1. PASSE DYNAMIQUE ======================== */

// Variables qui ne sont PAS des secrets malgré l'absence de préfixe
// NEXT_PUBLIC_ : elles portent des adresses publiques du site, dont la
// présence dans le HTML est voulue (canoniques, OpenGraph, page contact).
// Sans cette liste, l'audit rendait 14 alertes toutes fausses — et un
// contrôle qui crie au loup finit par n'être plus lu.
const NON_SECRETS = new Set(["SITE_URL", "CONTACT_FROM"]);

function lireSecrets() {
  const fichier = path.resolve(".env.local");
  if (!fs.existsSync(fichier)) return [];
  return fs
    .readFileSync(fichier, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      const nom = l.slice(0, i).trim();
      let valeur = l.slice(i + 1).trim();
      if (
        (valeur.startsWith('"') && valeur.endsWith('"')) ||
        (valeur.startsWith("'") && valeur.endsWith("'"))
      ) {
        valeur = valeur.slice(1, -1);
      }
      return { nom, valeur };
    })
    // NEXT_PUBLIC_* est publique par construction : sa présence est normale.
    // On écarte aussi les valeurs trop courtes (faux positifs garantis).
    .filter(
      (v) =>
        !v.nom.startsWith("NEXT_PUBLIC_") &&
        !NON_SECRETS.has(v.nom) &&
        v.valeur.length >= 8
    );
}

async function chunksDe(page) {
  const r = await fetch(BASE + page);
  if (!r.ok) return { erreur: `HTTP ${r.status}` };
  const html = await r.text();
  const srcs = [
    ...new Set([...html.matchAll(/src="(\/_next\/[^"]+\.js)"/g)].map((m) => m[1])),
  ];
  return { html, srcs };
}

async function passeDynamique() {
  const secrets = lireSecrets();
  console.log(`\n=== 1. Passe dynamique — ${BASE} ===`);
  console.log(
    `${secrets.length} secret(s) surveillé(s) : ${secrets.map((s) => s.nom).join(", ")}\n`
  );

  const fuites = [];
  let nbChunks = 0;
  const cache = new Map();

  for (const page of PAGES) {
    let res;
    try {
      res = await chunksDe(page);
    } catch {
      console.log(`  !!  ${page} — page injoignable`);
      continue;
    }
    if (res.erreur) {
      console.log(`  --  ${page} — ${res.erreur} (ignorée)`);
      continue;
    }

    for (const s of secrets) {
      if (res.html.includes(s.valeur)) {
        fuites.push(`${s.nom} — dans le HTML de ${page}`);
      }
    }

    for (const src of res.srcs) {
      if (!cache.has(src)) {
        try {
          cache.set(src, await (await fetch(BASE + src)).text());
          nbChunks += 1;
        } catch {
          cache.set(src, "");
        }
      }
      const js = cache.get(src);
      for (const s of secrets) {
        if (js.includes(s.valeur)) {
          fuites.push(`${s.nom} — dans ${src.split("/").pop()} (page ${page})`);
        }
      }
    }
    console.log(`  ok  ${page.padEnd(28)} ${res.srcs.length} chunk(s)`);
  }

  console.log(`\n${nbChunks} chunk(s) distinct(s) téléchargé(s) et inspecté(s).`);
  return [...new Set(fuites)];
}

/* ============================ 2. PASSE STATIQUE ========================= */

// Motifs qui n'ont rien à faire dans un module atteignable côté client.
const MOTIFS = [
  { nom: "lien de visioconférence", re: /(meet\.google\.com|zoom\.us\/j\/|whereby\.com)/ },
  { nom: "clé d'API en dur", re: /\b(sk-[A-Za-z0-9]{16,}|re_[A-Za-z0-9]{16,})\b/ },
  { nom: "jeton JWT en dur", re: /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/ },
  { nom: "service role Supabase", re: /SUPABASE_SERVICE_ROLE_KEY/ },
  { nom: "mot de passe en dur", re: /(ADMIN_PASSWORD|PILOTE_PASSWORD)/ },
];

function fichiersSources(racine, acc = []) {
  for (const e of fs.readdirSync(racine, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = path.join(racine, e.name);
    if (e.isDirectory()) fichiersSources(p, acc);
    else if (/\.(ts|tsx)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

function resoudre(depuis, spec) {
  let base;
  if (spec.startsWith("@/")) base = path.resolve(spec.slice(2));
  else if (spec.startsWith(".")) base = path.resolve(path.dirname(depuis), spec);
  else return null;
  for (const suffixe of [".ts", ".tsx", "/index.ts", "/index.tsx"]) {
    const p = base + suffixe;
    if (fs.existsSync(p)) return p;
  }
  return fs.existsSync(base) && fs.statSync(base).isFile() ? base : null;
}

function passeStatique() {
  console.log(`\n=== 2. Passe statique — modules atteignables côté client ===\n`);

  const tous = [...fichiersSources(path.resolve("app")), ...fichiersSources(path.resolve("components")), ...fichiersSources(path.resolve("lib"))];
  const source = new Map(tous.map((f) => [f, fs.readFileSync(f, "utf8")]));

  // Point de départ : tout fichier marqué "use client".
  const aVisiter = tous.filter((f) => /^\s*["']use client["']/m.test(source.get(f)));
  const atteignables = new Set(aVisiter);

  while (aVisiter.length) {
    const f = aVisiter.pop();
    const src = source.get(f) ?? "";
    for (const m of src.matchAll(/from\s+["']([^"']+)["']/g)) {
      const cible = resoudre(f, m[1]);
      if (cible && !atteignables.has(cible) && source.has(cible)) {
        // `server-only` coupe la chaîne : le module ne peut pas être client.
        if (/import\s+["']server-only["']/.test(source.get(cible))) continue;
        atteignables.add(cible);
        aVisiter.push(cible);
      }
    }
  }

  const alertes = [];
  for (const f of atteignables) {
    const src = source.get(f) ?? "";
    for (const motif of MOTIFS) {
      if (motif.re.test(src)) {
        alertes.push(`${path.relative(process.cwd(), f)} — ${motif.nom}`);
      }
    }
  }

  console.log(`${atteignables.size} module(s) atteignable(s) depuis un composant client.`);
  return alertes;
}

/* ================================ RAPPORT =============================== */

const fuites = await passeDynamique();
const alertes = passeStatique();

console.log(`\n${"=".repeat(60)}`);
if (fuites.length === 0) {
  console.log(`\nAucun secret d'environnement retrouvé dans le HTML ni dans le JS.`);
} else {
  console.log(`\n${fuites.length} FUITE(S) DE SECRET :\n`);
  fuites.forEach((f) => console.log(`  - ${f}`));
}

if (alertes.length === 0) {
  console.log(`Aucun motif sensible dans les modules atteignables côté client.\n`);
} else {
  console.log(`\n${alertes.length} module(s) à regarder :\n`);
  alertes.forEach((a) => console.log(`  - ${a}`));
  console.log();
}

process.exit(fuites.length || alertes.length ? 1 : 0);
