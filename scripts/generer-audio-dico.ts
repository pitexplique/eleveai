/**
 * Génère les mp3 des mots du DICO servis par la dictée du jour — les portes
 * « 🎓 Ta classe » (CP → Terminale) et « 📝 Prépa éval nationale 6e ».
 *
 * Pourquoi ce second script : `generer-audio-dictee.ts` ne couvre que les 110
 * mots de `lib/dictee-du-jour/words.ts`. Les mots venus du Dico n'avaient AUCUN
 * mp3 et retombaient tous sur la voix du navigateur — muette sur un appareil
 * sans voix installée. C'est la même plainte qu'une élève a remontée le 16/08
 * (« parfois on n'entend pas le mot »), mais par une autre porte.
 *
 * On tire les mots par l'API PUBLIQUE du Dico, exactement comme le fait la
 * page (`lib/dictee-du-jour/parNiveau.ts`) : ce qui est généré est donc très
 * précisément ce qui peut être servi à un élève, ni plus ni moins.
 *
 * IDEMPOTENT : saute les fichiers déjà là (y compris ceux des 110 mots, quand
 * un mot du Dico porte le même slug). Relancer ne génère que le manquant.
 *
 * Lancer (⚠️ --legacy-peer-deps : sans lui, npm peut « résoudre » un conflit en
 * DOWNGRADANT tes deps existantes, ex. next 15 → 9 !) :
 *   npm install -D google-tts-api tsx --legacy-peer-deps
 *   npx tsx scripts/generer-audio-dico.ts
 *   npm remove google-tts-api tsx      # les mp3 suffisent
 */

import { mkdirSync, existsSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createRequire } from "module";
import { getDico, motsDeLaClasse, NIVEAUX } from "../lib/dico";
import { slugMot } from "../lib/dictee-du-jour/words";

const require = createRequire(import.meta.url);
const _m: any = require("google-tts-api");

// ⚠️ L'API du paquet a CHANGÉ entre les deux générations d'audio du site :
//   • v0.0.6 (celle des 110 premiers mp3) exporte DIRECTEMENT une fonction
//     (text, lang, speed) => Promise<url> ;
//   • v2.x exporte un objet { getAudioUrl, getAudioBase64, … }.
// `npm install google-tts-api` ramène aujourd'hui la v2 : un script écrit pour
// la v0.0.6 s'arrête net. On accepte donc les deux, pour que relancer la
// génération dans six mois ne demande pas d'archéologie.
const mp3 = async (text: string, lang: string): Promise<Buffer> => {
  if (typeof _m?.getAudioBase64 === "function") {
    const b64 = await _m.getAudioBase64(text, { lang, slow: false });
    return Buffer.from(b64, "base64");
  }
  const url = await (typeof _m === "function" ? _m : _m?.default)(text, lang, 1);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
};

if (typeof _m?.getAudioBase64 !== "function" && typeof _m !== "function" && typeof _m?.default !== "function") {
  console.error("⚠️  google-tts-api : API inconnue (clés =", Object.keys(_m ?? {}), ")");
  process.exit(1);
}

const OUT = join(process.cwd(), "public", "audio", "dictee");

type AGenerer = { mot: string; lang: "fr" | "en" };

/** Tous les mots du Dico atteignables depuis la dictée, dédoublonnés. */
function motsAGenerer(): AGenerer[] {
  const vus = new Set<string>();
  const out: AGenerer[] = [];

  const ajouter = (mot: string, lang: "fr" | "en") => {
    const cle = `${lang}/${slugMot(mot)}`;
    if (!mot.trim() || vus.has(cle)) return;
    vus.add(cle);
    out.push({ mot, lang });
  };

  // Porte « Ta classe » : un niveau à la fois, comme getDicteeNiveau.
  for (const n of NIVEAUX) {
    for (const m of motsDeLaClasse(n.slug)) {
      ajouter(m.mot, m.matiere === "anglais" ? "en" : "fr");
    }
  }

  // Porte « Prépa éval nationale 6e » : les dicos ÉVAL maths + français 6e,
  // qui ne sont PAS les dicos de classe 6e (cf. maths/6e.ts vs 6e-college.ts).
  for (const matiere of ["maths", "francais"]) {
    const d = getDico(matiere, "6e");
    for (const m of d?.mots ?? []) ajouter(m.mot, "fr");
  }

  return out;
}

async function main() {
  const mots = motsAGenerer();
  let crees = 0;
  let sautes = 0;
  const echecs: string[] = [];

  console.log(`Génération audio de ${mots.length} mots du Dico → ${OUT}\n`);

  for (const w of mots) {
    const dest = join(OUT, w.lang, `${slugMot(w.mot)}.mp3`);
    if (existsSync(dest)) {
      sautes++;
      continue;
    }
    try {
      const buf = await mp3(w.mot, w.lang);
      if (buf.length < 500) throw new Error(`fichier vide (${buf.length} o)`);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, buf);
      crees++;
      if (crees % 25 === 0) console.log(`  … ${crees} générés`);
    } catch (e) {
      echecs.push(`${w.lang}/${w.mot} : ${(e as Error).message}`);
    }
    // Petite pause : évite d'être limité par Google Traduction.
    await new Promise((r) => setTimeout(r, 350));
  }

  console.log(
    `\nTerminé — ${crees} créés, ${sautes} déjà présents, ${echecs.length} échecs.`
  );
  // Les échecs sont listés en clair : un mot muet est invisible en preview, il
  // ne se voit que devant l'élève. Relancer le script rattrape (idempotent).
  if (echecs.length) {
    console.log("\nMots SANS audio (relancer le script les reprendra) :");
    for (const e of echecs) console.log(`  ❌ ${e}`);
  }
  if (crees > 0) console.log("\nÀ committer :  git add public/audio/dictee");
}

main();
