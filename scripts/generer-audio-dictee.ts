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

// ⚠️ L'API du paquet a CHANGÉ depuis la génération des 110 premiers mp3 :
//   • v0.0.6 exporte DIRECTEMENT une fonction (text, lang, speed) => url ;
//   • v2.x (ce que `npm install` ramène aujourd'hui) exporte un objet
//     { getAudioUrl, getAudioBase64, … } — ce script s'arrêtait donc net sur
//     « fonction introuvable ». On accepte les deux formes.
const require = createRequire(import.meta.url);
const _m: any = require("google-tts-api");

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

if (
  typeof _m?.getAudioBase64 !== "function" &&
  typeof _m !== "function" &&
  typeof _m?.default !== "function"
) {
  console.error("⚠️  google-tts-api : API inconnue (clés =", Object.keys(_m ?? {}), ")");
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
      const buf = await mp3(w.mot, w.lang);
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
