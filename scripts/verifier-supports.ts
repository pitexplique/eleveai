// GARDE-FOU DES TEXTES SUPPORTS des épreuves de français.
//
// POURQUOI (16/08). Les supports échappent aux trois vérificateurs de banque :
// ils ne sont pas dans une banque. Personne ne contrôlait donc qu'une réponse
// attendue figure bien parmi les propositions, ni qu'un énoncé ne soit pas
// recopié d'un support à l'autre — et un énoncé partagé, c'est le moteur qui
// écarte silencieusement la deuxième occurrence (`textesDuTirage`), donc un
// support qui rend moins de questions que prévu sans rien dire.
//
// CE QU'IL VÉRIFIE, support par support : le nombre de questions, les énoncés
// en double dans un même support ET entre supports, la réponse attendue
// présente parmi les propositions, les propositions en double, et le compte
// de quatre propositions qu'exige le format du sujet officiel.
//
// Usage :
//   npx --yes tsx@4 scripts/verifier-supports.ts

import {
  SUPPORTS_CM2,
  SUPPORTS_ORAL_CM2,
  SUPPORTS_5E,
  SUPPORTS_ORAL_5E,
} from "@/lib/eval-nationale/supports";

const tousLesTextes = new Map<string, string>();
let defauts = 0;

for (const [nom, lot] of [
  ["CM2 écrit", SUPPORTS_CM2],
  ["CM2 oral", SUPPORTS_ORAL_CM2],
  ["5e écrit", SUPPORTS_5E],
  ["5e oral", SUPPORTS_ORAL_5E],
] as const) {
  console.log(`\n■ ${nom}`);
  for (const s of lot) {
    const distincts = new Set(s.questions.map((q) => q.text));
    const alertes: string[] = [];
    if (distincts.size !== s.questions.length) alertes.push("énoncés en double");
    for (const q of s.questions) {
      if (!q.choices.includes(q.expected)) alertes.push(`réponse absente: ${q.text.slice(0, 30)}`);
      if (new Set(q.choices.map((c) => c.trim())).size !== q.choices.length)
        alertes.push(`propositions en double: ${q.text.slice(0, 30)}`);
      if (q.choices.length !== 4) alertes.push(`${q.choices.length} propositions: ${q.text.slice(0, 30)}`);
      const vu = tousLesTextes.get(q.text);
      if (vu && vu !== s.id) alertes.push(`énoncé partagé avec ${vu}`);
      tousLesTextes.set(q.text, s.id);
    }
    if (alertes.length) defauts += alertes.length;
    console.log(
      `   ${String(s.questions.length).padStart(2)} q · ${s.kicker.padEnd(24)} ${s.titre}` +
        (alertes.length ? `\n      ⛔ ${alertes.join(" · ")}` : ""),
    );
  }
}

console.log(defauts ? `\n⛔ ${defauts} défaut(s)\n` : "\n✅ aucun défaut\n");
