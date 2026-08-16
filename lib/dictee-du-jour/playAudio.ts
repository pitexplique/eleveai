// Lecture d'un mot de la dictée : on joue le mp3 PRÉ-GÉNÉRÉ (fort, clair,
// correct partout) amplifié via Web Audio (GainNode). Si le fichier manque ou
// échoue, on retombe sur la synthèse vocale du navigateur (onFallback).
//
// ⚠️ RÈGLE DE LA MAISON, apprise d'une élève (« parfois on n'entend pas le
// mot ») : dès qu'un élément audio passe par un MediaElementSource, son son ne
// sort PLUS que par le graphe Web Audio. Si le graphe n'est pas prêt, le mp3
// se déroule EN SILENCE — sans erreur, donc sans repli. Un mot muet est le
// pire cas d'une dictée : l'élève ne peut pas répondre et ne sait pas pourquoi.
// Donc : on ne branche l'amplification QUE si le contexte est bel et bien
// `running`. Sinon on joue l'élément en direct — moins fort, mais AUDIBLE.

import { audioDictee, type DicteeMot } from "./words";

let ctx: AudioContext | null = null;
let gainNode: GainNode | null = null;

/** Le contexte audio, réveillé si besoin. `null` si l'ampli est indisponible. */
async function contexteAudioPret(gain: number): Promise<AudioContext | null> {
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;

  try {
    if (!ctx) {
      ctx = new AC();
      gainNode = ctx.createGain();
      gainNode.gain.value = gain;
      gainNode.connect(ctx.destination);
    }
    // `resume()` est ASYNCHRONE : ne pas l'attendre laissait le mp3 partir dans
    // un graphe encore endormi = mot muet, au hasard du premier clic ou d'un
    // retour d'onglet. On l'attend, et on n'amplifie que si ça a marché.
    if (ctx.state === "suspended") await ctx.resume();
    return ctx.state === "running" ? ctx : null;
  } catch {
    return null;
  }
}

export function playMotDictee(
  mot: DicteeMot,
  onFallback: () => void,
  /** Appelé quand le son PART VRAIMENT (le seul signal digne de confiance). */
  onStart?: () => void,
  gain = 2.6
): void {
  if (typeof window === "undefined") return;

  let fell = false;
  const fallback = () => {
    if (fell) return;
    fell = true;
    onFallback();
  };

  void (async () => {
    try {
      const audio = new Audio(audioDictee(mot));
      audio.preload = "auto";
      audio.onerror = fallback; // fichier absent (mots du Dico) → repli TTS
      if (onStart) audio.addEventListener("playing", onStart, { once: true });

      const pret = await contexteAudioPret(gain);
      if (pret && gainNode) {
        try {
          // Un nœud est créé à CHAQUE lecture : sans déconnexion, ils
          // s'accumulaient dans le contexte au fil des clics sur « Écouter ».
          const src = pret.createMediaElementSource(audio);
          src.connect(gainNode);
          const liberer = () => src.disconnect();
          audio.addEventListener("ended", liberer, { once: true });
          audio.addEventListener("error", liberer, { once: true });
        } catch {
          /* pas d'ampli : l'élément joue en direct, au volume normal */
        }
      }

      await audio.play().catch(fallback);

      // Dernier filet : si le son n'a pas démarré (contexte retombé, lecture
      // refusée en silence), on parle plutôt que de laisser l'élève sans mot.
      window.setTimeout(() => {
        if (!fell && audio.currentTime === 0 && !audio.ended) fallback();
      }, 900);
    } catch {
      fallback();
    }
  })();
}
