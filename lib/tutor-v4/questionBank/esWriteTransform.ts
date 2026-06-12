// Transforme les exercices FR -> ES (« Comment dit-on … en espagnol ? ») en
// REPONSE A ECRIRE quand le mot espagnol n'a aucun accent (ni ñ, ¿, ?), sinon
// on garde le QCM. Demande de Tamara (12/06/2026) : ecrire entraine mieux que
// cliquer ; et sans accent, la saisie au clavier reste fiable.
// Partage par les 4 niveaux d'espagnol (A1, A2, B1, B2).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

export function toWriteWhenNoAccent(item: TutorBankItemV4): TutorBankItemV4 {
  if (
    item.kind === "fixed" &&
    item.microId.endsWith("_fr_to_es") &&
    item.format === "qcm" &&
    /^[a-zA-Z ]+$/.test(item.expected[0] ?? "")
  ) {
    return {
      ...item,
      format: "short",
      comparator: "exact_text",
      choices: undefined,
      text: `${item.text} ✍️ Écris ta réponse.`,
    };
  }
  return item;
}

export function applyEsWrite(bank: TutorBankItemV4[]): TutorBankItemV4[] {
  return bank.map(toWriteWhenNoAccent);
}
