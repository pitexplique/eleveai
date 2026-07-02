/**
 * Génère les fichiers audio (mp3) des mots de la Dictée du jour, UNE FOIS.
 * Source : TTS gratuite de Google Traduction (via google-tts-api) — sans compte,
 * sans clé, sans carte. Les fichiers atterrissent dans /public/audio/dictee/<lang>/
 * et sont ensuite servis statiquement (aucune place sur Supabase).
 *
 * IDEMPOTENT : saute les mots qui ont déjà leur fichier → relancer ne génère
 * que les NOUVEAUX mots. Pas de corvée hebdomadaire : la banque est figée.
 *
 * Lancer :
 *   npm install -D google-tts-api tsx
 *   npx tsx scripts/generer-audio-dictee.ts
 */

import { mkdirSync, existsSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { getAudioBase64 } from "google-tts-api";
import { TOUS_LES_MOTS, slugMot } from "../lib/dictee-du-jour/words";

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
      const b64 = await getAudioBase64(w.mot, { lang: w.lang, slow: false });
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, Buffer.from(b64, "base64"));
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
