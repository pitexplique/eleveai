/**
 * Génère les fichiers audio (mp3) des mots de la Dictée du jour, UNE FOIS.
 * Source : TTS gratuite de Google Traduction (via google-tts-api) — sans compte,
 * sans clé, sans carte. Les fichiers atterrissent dans /public/audio/dictee/<lang>/
 * et sont ensuite servis statiquement (aucune place sur Supabase).
 *
 * IDEMPOTENT : saute les mots qui ont déjà leur fichier → relancer ne génère
 * que les NOUVEAUX mots. Pas de corvée hebdomadaire : la banque est figée.
 *
 * Lancer (⚠️ --legacy-peer-deps : sans lui, npm peut « résoudre » un conflit
 * en DOWNGRADANT tes deps existantes, ex. next 15 → 9 !) :
 *   npm install -D google-tts-api tsx --legacy-peer-deps
 *   npx tsx scripts/generer-audio-dictee.ts
 * Puis, une fois généré, tu peux désinstaller les deux (les mp3 suffisent) :
 *   npm remove google-tts-api tsx
 */

import { mkdirSync, existsSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createRequire } from "module";
import { TOUS_LES_MOTS, slugMot } from "../lib/dictee-du-jour/words";

// google-tts-api v0.0.6 exporte DIRECTEMENT une fonction (text, lang, speed)
// qui renvoie l'URL de l'audio. On la charge en CommonJS (fiable).
const require = createRequire(import.meta.url);
const _m: any = require("google-tts-api");
const ttsUrl: (text: string, lang: string, speed?: number) => Promise<string> =
  typeof _m === "function" ? _m : _m?.default;

if (typeof ttsUrl !== "function") {
  console.error("⚠️  google-tts-api : fonction introuvable (type =", typeof _m, ")");
  process.exit(1);
}

const OUT = join(process.cwd(), "public", "audio", "dictee");

async function main() {
  let crees = 0;
  let sautes = 0;
  let erreurs = 0;

  console.log(`Génération audio de ${TOUS_LES_MOTS.length} mots → ${OUT}\n`);

  for (const w of TOUS_LES_MOTS) {
    const dest = join(OUT, w.lang, `${slugMot(w.mot)}.mp3`);
    if (existsSync(dest)) {
      sautes++;
      continue;
    }
    try {
      const url = await ttsUrl(w.mot, w.lang, 1);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, buf);
      crees++;
      console.log(`✅ ${w.lang}/${slugMot(w.mot)}.mp3   « ${w.mot} »`);
    } catch (e) {
      erreurs++;
      console.error(`❌ ${w.mot} (${w.lang}) : ${(e as Error).message}`);
    }
    // Petite pause : évite d'être limité par Google Traduction.
    await new Promise((r) => setTimeout(r, 350));
  }

  console.log(
    `\nTerminé — ${crees} créés, ${sautes} déjà présents, ${erreurs} erreurs.`
  );
  if (crees > 0) {
    console.log("\nPense à committer les fichiers :  git add public/audio/dictee");
  }
}

main();
