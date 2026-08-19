// Couverture des FICHES DE COURS, notion par notion, à l'exécution.
//
// POURQUOI (19/08/2026). La question « combien de fiches manque-t-il ? »
// n'avait aucune réponse fiable : compter les `lib/fiches/*.tsx` donne un
// nombre de fichiers, pas une couverture, et compter les `*.bank.ts` donne un
// nombre de fichiers de banque — or au français les notions sont GÉNÉRÉES
// (une seule banque en porte parfois quinze). Les deux chiffres mentent, dans
// des sens opposés.
//
// Ici on demande au catalogue la liste des notions réellement servies à
// l'élève (`getKnowledgePack`), et on regarde pour chacune si le registre des
// fiches (`lib/fiches/registre.ts`) en connaît une. C'est la même clé des deux
// côtés : le notionId du coach, tirets à la place des underscores — la règle
// d'or « slug de fiche = notionId du coach ».
//
// Usage — tsx n'est pas une dépendance du projet, npx le récupère au vol :
//   npx --yes tsx@4 scripts/couverture-fiches.ts
//   npx --yes tsx@4 scripts/couverture-fiches.ts --manquantes maths 4e
// (`--manquantes` liste les notions sans fiche au lieu du seul décompte.)

import { getKnowledgePack, type Classe, type Matiere } from "@/lib/tutor-v4/catalog";
import { FICHES_REGISTRE } from "@/lib/fiches/registre";

const CLASSES_MATHS: Classe[] = [
  "cp", "ce1", "ce2", "cm1", "cm2",
  "6e", "5e", "4e", "3e",
  "seconde", "premiere", "premiere-spe", "terminale-spe", "stmg",
];

const CLASSES_FRANCAIS: Classe[] = [
  "cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde",
];

// Le slug de fiche = le notionId du coach, underscores changés en tirets.
const slug = (notionId: string) => notionId.replace(/_/g, "-");

type Ligne = {
  matiere: Matiere;
  classe: Classe;
  notions: number;
  micros: number;
  avecFiche: number;
  manquantes: string[];
};

function mesurer(matiere: Matiere, classe: Classe): Ligne {
  const pack = getKnowledgePack(classe, matiere) as {
    notions?: { id: string; label?: string; titre?: string }[];
    microSkills?: unknown[];
  };
  const notions = pack?.notions ?? [];
  const micros = pack?.microSkills ?? [];
  const manquantes: string[] = [];
  let avecFiche = 0;
  for (const n of notions) {
    const cle = `${matiere}/${classe}/${slug(n.id)}`;
    if (FICHES_REGISTRE[cle]) avecFiche += 1;
    else manquantes.push(n.id);
  }
  return { matiere, classe, notions: notions.length, micros: micros.length, avecFiche, manquantes };
}

function pourcent(a: number, b: number) {
  return b === 0 ? "—" : `${Math.round((a / b) * 100)} %`;
}

function main() {
  const args = process.argv.slice(2);
  const detail = args.includes("--manquantes");
  const filtres = args.filter((a) => !a.startsWith("--"));

  const lignes: Ligne[] = [];
  for (const classe of CLASSES_MATHS) lignes.push(mesurer("maths", classe));
  for (const classe of CLASSES_FRANCAIS) lignes.push(mesurer("francais", classe));

  const retenues = filtres.length
    ? lignes.filter((l) => filtres.includes(l.matiere) || filtres.includes(l.classe))
    : lignes;

  console.log("matiere   classe          notions  avec fiche  couverture   micros");
  console.log("-".repeat(70));
  let totalNotions = 0;
  let totalFiches = 0;
  for (const l of retenues) {
    totalNotions += l.notions;
    totalFiches += l.avecFiche;
    console.log(
      `${l.matiere.padEnd(9)} ${l.classe.padEnd(15)} ${String(l.notions).padStart(6)} ` +
        `${String(l.avecFiche).padStart(11)} ${pourcent(l.avecFiche, l.notions).padStart(11)} ` +
        `${String(l.micros).padStart(8)}`
    );
  }
  console.log("-".repeat(70));
  console.log(
    `TOTAL${" ".repeat(20)}${String(totalNotions).padStart(6)} ${String(totalFiches).padStart(11)} ` +
      `${pourcent(totalFiches, totalNotions).padStart(11)}`
  );

  if (detail) {
    for (const l of retenues) {
      if (!l.manquantes.length) continue;
      console.log(`\n${l.matiere} ${l.classe} — ${l.manquantes.length} notion(s) sans fiche :`);
      for (const id of l.manquantes) console.log(`  ${slug(id)}`);
    }
  }
}

main();
