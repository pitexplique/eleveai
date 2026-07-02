// Lecture d'un mot de la dictée : on joue le mp3 PRÉ-GÉNÉRÉ (fort, clair,
// correct partout) amplifié via Web Audio (GainNode). Si le fichier manque ou
// échoue, on retombe sur la synthèse vocale du navigateur (onFallback).

import { audioDictee, type DicteeMot } from "./words";

let ctx: AudioContext | null = null;
let gainNode: GainNode | null = null;

export function playMotDictee(
  mot: DicteeMot,
  onFallback: () => void,
  gain = 2.6
): void {
  if (typeof window === "undefined") return;

  let fell = false;
  const fallback = () => {
    if (fell) return;
    fell = true;
    onFallback();
  };

  try {
    const audio = new Audio(audioDictee(mot));

    // Amplification (le volume HTML est plafonné à 1 ; le GainNode va au-delà).
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (AC) {
      if (!ctx) {
        ctx = new AC();
        gainNode = ctx.createGain();
        gainNode.gain.value = gain;
        gainNode.connect(ctx.destination);
      }
      if (ctx.state === "suspended") void ctx.resume();
      try {
        ctx.createMediaElementSource(audio).connect(gainNode!);
      } catch {
        /* si l'ampli échoue, on jouera au volume normal */
      }
    }

    audio.onerror = fallback; // fichier absent → repli TTS
    audio.play().catch(fallback);
  } catch {
    fallback();
  }
}
