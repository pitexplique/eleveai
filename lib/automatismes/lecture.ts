// lib/automatismes/lecture.ts
//
// ⭐ La question LUE À VOIX HAUTE (Frédéric, 26/09 : « ils ne savent pas très
// bien lire, on devrait rajouter un audio comme dans le coach qui lit la
// question et les choix » — d'abord du CP à la 6e, puis « même pour tous : tu
// n'as pas envie de lire dans un bus mais d'écouter »).
//
// La voix est celle du navigateur (`speakText` du coach). Mais le coach lit le
// texte brut : sur une formule, la voix prononcerait « dollar, backslash,
// dfrac ». Ici, on traduit d'abord les formules en français parlé :
// « $\dfrac{3}{4}$ » → « 3 sur 4 », « $x^2$ » → « x au carré »,
// « $\sqrt{25}$ » → « racine carrée de 25 », « 12 cm² » → « 12 centimètres
// carrés », « AB » → « A B ».

import type { AutoQuestion } from "./types";
import { enMots } from "../lecture-en-mots";

// Le traducteur vit dans lib/lecture-en-mots.ts : le coach s'en sert aussi.
export { enMots };

/** Ce que le bouton « Écouter » lit : l'énoncé, puis les propositions d'un QCM. */
export function texteALire(q: AutoQuestion): string {
  const parts = [enMots(q.text)];
  if (q.format === "qcm" && q.choices?.length) {
    const lettres = ["A", "B", "C", "D", "E", "F"];
    parts.push(`Voici les réponses possibles. ${q.choices.map((c, i) => `Réponse ${lettres[i] ?? i + 1} : ${enMots(c)}`).join(". ")}.`);
  }
  return parts.join(" ");
}
