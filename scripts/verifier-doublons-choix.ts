// UN QCM NE DOIT JAMAIS MONTRER DEUX FOIS LA MÊME PROPOSITION.
//
// POURQUOI CE SCRIPT (02/08/2026). Trouvé en corrigeant le défilement des
// épreuves blanches : la console signalait « two children with the same key:
// x = 5 et y = 5 ». Un gabarit de repérage CM2 tirait x et y au hasard entre
// 1 et 5, puis proposait comme piège les coordonnées inversées — quand x = y,
// le piège EST la bonne réponse. Une fois sur cinq, l'élève voyait deux fois
// la même ligne, et les deux étaient justes.
//
// Ça ne se voit pas en relisant le source : la collision n'existe que pour
// certains tirages. Ça ne se voit pas non plus en cliquant : il faut tomber
// sur le bon item ET le bon tirage. D'où un contrôle qui TIRE.
//
// CE QU'ON MESURE, banque par banque :
//   - un item `fixed` dont `choices` contient deux fois la même chaîne ;
//   - un gabarit `template` qui produit un doublon sur au moins un tirage,
//     avec le TAUX (sur combien de tirages) — c'est le taux qui dit si l'élève
//     tombe dessus une fois sur cinq ou une fois sur mille ;
//   - la bonne réponse absente des propositions, tant qu'on tire (le contrôle
//     source de verifier-banque.mjs ne peut pas le faire sur un gabarit).
//
// On compare les chaînes une fois rognées (`trim`) : deux propositions qui ne
// diffèrent que par une espace sont identiques pour l'élève qui les lit.
//
// Usage — tsx n'est pas une dépendance du projet, npx le récupère au vol :
//   npx --yes tsx@4 scripts/verifier-doublons-choix.ts
//   npx --yes tsx@4 scripts/verifier-doublons-choix.ts 500
//
// Sortie 1 s'il reste le moindre doublon : utilisable comme garde-fou.

import { loadQuestionBankV4 } from "@/lib/tutor-v4/loaders/loadQuestionBankV4";

/** Toutes les paires servies par le loader (lues dans son source le 02/08). */
const BANQUES: [classe: string, matiere: string][] = [
  ["cp", "maths"],
  ["ce1", "maths"],
  ["ce2", "maths"],
  ["cm1", "maths"],
  ["cm2", "maths"],
  ["6e", "maths"],
  ["5e", "maths"],
  ["4e", "maths"],
  ["3e", "maths"],
  ["seconde", "maths"],
  ["premiere-spe", "maths"],
  ["terminale-spe", "maths"],
  ["adulte", "maths"],
  ["cp", "francais"],
  ["ce1", "francais"],
  ["ce2", "francais"],
  ["cm1", "francais"],
  ["cm2", "francais"],
  ["6e", "francais"],
  ["5e", "francais"],
  ["4e", "francais"],
  ["3e", "francais"],
  ["a1", "english-maths"],
  ["a2", "english-maths"],
  ["b1", "english-maths"],
  ["b2", "english-maths"],
  ["eco-college", "economie"],
  ["a1", "espagnol"],
  ["a2", "espagnol"],
  ["b1", "espagnol"],
  ["b2", "espagnol"],
  ["a1", "ia"],
  ["a2", "ia"],
  ["b1", "ia"],
  ["b2", "ia"],
  ["c1", "ia"],
];

/** Nombre de tirages par gabarit. 300 attrape une collision à 1 %. */
const TIRAGES = Number(process.argv[2]) || 300;

type Probleme = {
  id: string;
  microId: string;
  quoi: "doublon" | "reponse-absente" | "generate-casse";
  /** Sur combien de tirages le problème apparaît (1/1 pour un item fixe). */
  taux: string;
  detail: string;
  exemple?: string;
};

function doublonsDe(choices: string[]): string[] {
  const vus = new Set<string>();
  const dup = new Set<string>();
  for (const c of choices) {
    const k = c.trim();
    if (vus.has(k)) dup.add(k);
    vus.add(k);
  }
  return [...dup];
}

async function verifier(classe: string, matiere: string) {
  let banque;
  try {
    banque = await loadQuestionBankV4(classe, matiere);
  } catch (e) {
    console.log(`\n${classe}/${matiere} — ILLISIBLE : ${(e as Error).message}`);
    return [];
  }
  if (!banque?.length) {
    console.log(`\n${classe}/${matiere} — banque vide`);
    return [];
  }

  const problemes: Probleme[] = [];

  for (const item of banque) {
    if (item.kind === "fixed") {
      if (!item.choices?.length) continue;
      const dup = doublonsDe(item.choices);
      if (dup.length) {
        problemes.push({
          id: item.id,
          microId: item.microId,
          quoi: "doublon",
          taux: "1/1",
          detail: dup.map((d) => `« ${d} »`).join(", "),
          exemple: item.text?.slice(0, 90),
        });
      }
      continue;
    }

    // Gabarit : on tire, c'est tout l'objet du script.
    let nbDoublons = 0;
    let nbAbsente = 0;
    let premierDoublon: { dup: string[]; text: string } | null = null;
    let premiereAbsente: { attendu: string; text: string } | null = null;
    let casse: string | null = null;

    for (let i = 0; i < TIRAGES; i += 1) {
      let q;
      try {
        q = item.generate();
      } catch (e) {
        casse = (e as Error).message;
        break;
      }
      if (!q?.choices?.length) break; // format short/open : rien à vérifier

      const dup = doublonsDe(q.choices);
      if (dup.length) {
        nbDoublons += 1;
        premierDoublon ??= { dup, text: q.text ?? "" };
      }

      const attendu = q.expected?.[0];
      if (attendu !== undefined) {
        const presente = q.choices.some((c) => c.trim() === attendu.trim());
        if (!presente) {
          nbAbsente += 1;
          premiereAbsente ??= { attendu, text: q.text ?? "" };
        }
      }
    }

    if (casse) {
      problemes.push({
        id: item.id,
        microId: item.microId,
        quoi: "generate-casse",
        taux: "—",
        detail: casse,
      });
      continue;
    }
    if (nbDoublons && premierDoublon) {
      problemes.push({
        id: item.id,
        microId: item.microId,
        quoi: "doublon",
        taux: `${nbDoublons}/${TIRAGES}`,
        detail: premierDoublon.dup.map((d) => `« ${d} »`).join(", "),
        exemple: premierDoublon.text.slice(0, 90),
      });
    }
    if (nbAbsente && premiereAbsente) {
      problemes.push({
        id: item.id,
        microId: item.microId,
        quoi: "reponse-absente",
        taux: `${nbAbsente}/${TIRAGES}`,
        detail: `attendu « ${premiereAbsente.attendu} » hors des propositions`,
        exemple: premiereAbsente.text.slice(0, 90),
      });
    }
  }

  if (problemes.length) {
    console.log(
      `\n══ ${classe}/${matiere} — ${problemes.length} problème${problemes.length > 1 ? "s" : ""} sur ${banque.length} items`,
    );
    for (const p of problemes) {
      const etiquette =
        p.quoi === "doublon"
          ? "DOUBLON"
          : p.quoi === "reponse-absente"
            ? "RÉPONSE ABSENTE"
            : "GENERATE CASSÉ";
      console.log(`  [${etiquette}] ${p.id}  (${p.taux})`);
      console.log(`      micro   : ${p.microId}`);
      console.log(`      détail  : ${p.detail}`);
      if (p.exemple) console.log(`      énoncé  : ${p.exemple}`);
    }
  }

  return problemes;
}

async function main() {
  console.log(
    `Doublons de propositions — ${TIRAGES} tirages par gabarit, ${BANQUES.length} banques.`,
  );

  let total = 0;
  for (const [classe, matiere] of BANQUES) {
    total += (await verifier(classe, matiere)).length;
  }

  console.log(
    total === 0
      ? "\n✅ Aucune question ne montre deux fois la même proposition."
      : `\n❌ ${total} item${total > 1 ? "s" : ""} à corriger.`,
  );
  process.exit(total === 0 ? 0 : 1);
}

main();
