// Recalcul indépendant de la feuille « Filtrer des données : ET, OU, NON »
// (1re sans spé, 28/09/2026) : lib/fiches-exercices/maths-premiere-info-filtre-donnees.tsx
//
// ⭐ Le script APPLIQUE chaque filtre : il relit les fichiers (`feuille(…)`)
// dans le source, garde les lignes qui vérifient le critère, et compare la
// liste et l'effectif au corrigé — et aux lignes surlignées du schéma. Les
// tableaux croisés (`tableauProba(…)`) sont relus et leurs marges refaites ;
// les cases surlignées additionnées. Les diagrammes de Venn (`venn(…)`) sont
// reconstruits à partir du fichier ou des effectifs de l'énoncé, zone par zone.
// Plus les règles de rendu mesurées à 375 px et le socle commun.
// Usage : node scripts/verifier-exercices-premiere-info-filtre-donnees.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, lireFeuille, controlesCommuns } from "./verifier-exercices-commun.mjs";

const FICHIER = "lib/fiches-exercices/maths-premiere-info-filtre-donnees.tsx";
const NOTION = "info_filtre_donnees";
const source = fs.readFileSync(path.join(RACINE, FICHIER), "utf8");

let justes = 0;
const fausses = [];
const v = {
  ok(nom, condition, detail = "") {
    if (condition) justes++;
    else fausses.push(`${nom}${detail ? " — " + detail : ""}`);
  },
  titre() {},
};
const f = lireFeuille(source);
const c = (k) => f.corrections[k - 1] ?? "";
const e = (k) => f.enonces[k - 1] ?? "";
const dit = (k, ...ps) => ps.forEach((p) => v.ok(`${k}. « ${p} » dans le corrigé`, c(k).includes(p), "absent"));
const vaut = (nom, a, b) => v.ok(nom, a === b, `${a} ≠ ${b}`);
const memes = (nom, a, b) => v.ok(nom, JSON.stringify(a) === JSON.stringify(b), `${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`);

/* ── Relire les appels dans le source ─────────────────────────────────── */

function argumentsDe(texte, debut) {
  const args = [];
  let prof = 0;
  let courant = "";
  let chaine = false;
  for (let i = debut + 1; i < texte.length; i++) {
    const ch = texte[i];
    if (ch === '"' && texte[i - 1] !== "\\") chaine = !chaine;
    if (!chaine) {
      if ("([{".includes(ch)) prof++;
      if (")]}".includes(ch)) {
        if (prof === 0) {
          if (courant.trim()) args.push(courant.trim());
          return args;
        }
        prof--;
      }
      if (ch === "," && prof === 0) {
        args.push(courant.trim());
        courant = "";
        continue;
      }
    }
    courant += ch;
  }
  throw new Error("appel non fermé");
}
const json = (t) => JSON.parse(t.replace(/,(\s*\n\s*[\]}])/g, "$1").replace(/−/g, "-").replace(/([{,]\s*)([a-zA-Z]+):/g, '$1"$2":'));

function appels(bloc, nom) {
  return [...bloc.matchAll(new RegExp(`\\b${nom}\\(`, "g"))].map((m) => {
    const avant = bloc.slice(0, m.index);
    const iF = avant.lastIndexOf("figure:");
    const iS = avant.lastIndexOf("schema:");
    const role = iF > iS ? "figure" : "schema";
    return { role, args: argumentsDe(bloc, m.index + m[0].length - 1) };
  });
}
const bloc = (k) => {
  const b = f.blocs[k - 1] ?? "";
  return b.slice(0, b.indexOf("micros:") + 1 || undefined);
};
const un = (k, nom, role) => {
  const a = appels(bloc(k), nom).find((x) => x.role === role);
  if (!a) throw new Error(`exercice ${k} : pas de ${nom} (${role})`);
  return a.args;
};

/** Le fichier de l'exercice k, en objets { _ligne, Titre: valeur, … }. */
function fichier(k, role = "figure") {
  const args = un(k, "feuille", role);
  const grille = json(args[0]);
  const [titres, ...lignes] = grille;
  return {
    grille,
    surligne: args[1] ? json(args[1]).surligne ?? [] : [],
    individus: lignes.map((l, i) => Object.fromEntries([["_ligne", i + 2], ...titres.map((t, j) => [t, l[j]])])),
  };
}
const noms = (liste) => liste.map((x) => Object.values(x)[1]);
/** Les quatre zones de Venn de deux critères sur un fichier. */
const zones = (individus, A, B) => ({
  aSeul: noms(individus.filter((x) => A(x) && !B(x))),
  commun: noms(individus.filter((x) => A(x) && B(x))),
  bSeul: noms(individus.filter((x) => !A(x) && B(x))),
  dehors: noms(individus.filter((x) => !A(x) && !B(x))),
});
const vennDe = (k, role) => {
  const [z, n, s] = un(k, "venn", role);
  const lu = json(z);
  return { zones: { ...lu, dehors: (lu.dehors ?? []).flatMap((t) => t.split(", ")) }, noms: n ? json(n) : {}, surligne: s ? json(s) : undefined };
};
/** Un tableau croisé relu : cellule(ligne, colonne) par leurs libellés. */
function croise(k, role = "figure") {
  const [en, li, su] = un(k, "tableauProba", role);
  const entetes = json(en);
  const lignes = json(li);
  const surligne = su ? json(su) : [];
  const cellule = (l, col) => {
    const r = lignes.find((x) => x[0] === l);
    const j = entetes.indexOf(col);
    if (!r || j < 0) throw new Error(`exercice ${k} : case (${l}, ${col}) introuvable`);
    return Number(r[j]);
  };
  // Les marges : chaque ligne et chaque colonne se refont.
  const fautes = [];
  for (const r of lignes) {
    const vals = r.slice(1, -1).map(Number);
    if (vals.reduce((a, b) => a + b, 0) !== Number(r.at(-1))) fautes.push(`ligne ${r[0]}`);
  }
  for (let j = 1; j < entetes.length; j++) {
    const vals = lignes.slice(0, -1).map((r) => Number(r[j]));
    if (vals.reduce((a, b) => a + b, 0) !== Number(lignes.at(-1)[j])) fautes.push(`colonne ${entetes[j]}`);
  }
  v.ok(`${k}. le tableau croisé : marges justes`, fautes.length === 0, fautes.join(", "));
  const sommeSurlignee = surligne.reduce((s, [i, j]) => s + Number(lignes[i][j]), 0);
  return { entetes, lignes, surligne, cellule, sommeSurlignee };
}

try {
  /* ── ★ ── */
  const rando = fichier(1);
  const km = "Distance (km)";
  const den = "Dénivelé (m)";
  const chiens = (x) => x["Chiens admis"] === "oui";
  {
    const g = rando.individus.filter((x) => x[km] >= 10);
    memes("1. au moins 10 km", noms(g), ["Col", "Crête", "Forêt", "Pic", "Refuge"]);
    const s = fichier(1, "schema");
    memes("1. le schéma : même fichier", s.grille, rando.grille);
    memes("1. le schéma surligne les lignes gardées", s.surligne, g.map((x) => String(x._ligne)));
    dit(1, g.map((x) => `${x.Sentier} ($${x[km]}$)`).slice(0, 4).join(", ") + ` et ${g[4].Sentier} ($${g[4][km]}$)`, `$${g.length}$ sentiers`);
  }
  {
    const g = rando.individus.filter((x) => x[km] >= 10 && chiens(x));
    memes("2. ≥ 10 km ET chiens", noms(g), ["Forêt", "Pic"]);
    const s = fichier(2, "schema");
    memes("2. le schéma : même fichier", s.grille, rando.grille);
    memes("2. le schéma surligne les lignes gardées", s.surligne, g.map((x) => String(x._ligne)));
    dit(2, `$${g.length}$ sentiers`);
  }
  {
    const A = (x) => x[den] < 500;
    const z = zones(rando.individus, A, chiens);
    const lu = vennDe(3, "schema");
    memes("3. le Venn : les quatre zones", lu.zones, z);
    const nA = z.aSeul.length + z.commun.length;
    const nB = z.bSeul.length + z.commun.length;
    const ou = nA + nB - z.commun.length;
    vaut("3. OU", ou, 5);
    vaut("3. OU = les trois zones", ou, z.aSeul.length + z.commun.length + z.bSeul.length);
    dit(3, `$${nA} + ${nB} - ${z.commun.length} = ${ou}$ sentiers`, "$4 + 4 = 8$");
  }
  {
    const g = rando.individus.filter((x) => !chiens(x));
    memes("4. NON chiens", noms(g), ["Col", "Cascade", "Crête", "Refuge"]);
    dit(4, `$8 - 4 = ${g.length}$ sentiers : ${noms(g).join(", ")}`);
    const s = fichier(4, "schema");
    memes("4. le schéma : même fichier", s.grille, rando.grille);
    memes("4. le schéma surligne les lignes du NON", s.surligne, g.map((x) => String(x._ligne)));
  }
  {
    const t = croise(5);
    vaut("5. chat ET adopté", t.cellule("Chat", "Adopté"), 55);
    const s = croise(5, "schema");
    vaut("5. la case surlignée", s.sommeSurlignee, 55);
    dit(5, "« Adopté » : $55$");
    const o = croise(6, "schema");
    const ou = t.cellule("Chat", "Total") + t.cellule("Total", "Adopté") - t.cellule("Chat", "Adopté");
    vaut("6. chat OU adopté", ou, 122);
    vaut("6. les cases surlignées du OU", o.sommeSurlignee, ou);
    vaut("6. autre chemin", t.cellule("Total", "Total") - t.cellule("Chien", "En attente"), ou);
    dit(6, "$80 + 97 - 55 = 122$", "$140 - 18 = 122$");
    const non = t.cellule("Total", "Total") - t.cellule("Total", "Adopté");
    vaut("7. NON adopté", non, 43);
    vaut("7. = colonne « En attente »", t.cellule("Chien", "En attente") + t.cellule("Chat", "En attente"), non);
    dit(7, "$140 - 97 = 43$", "$18 + 25 = 43$");
    vaut("7. les cases surlignées du NON", croise(7, "schema").sommeSurlignee, non);
    const ni = t.cellule("Chat", "En attente");
    vaut("8. ni chien ni adopté", ni, 25);
    const chienOuAdopte = t.cellule("Chien", "Total") + t.cellule("Total", "Adopté") - t.cellule("Chien", "Adopté");
    vaut("8. = contraire de chien OU adopté", t.cellule("Total", "Total") - chienOuAdopte, ni);
    dit(8, "$140 - (60 + 97 - 42) = 140 - 115 = 25$");
    const z8 = vennDe(8, "schema");
    memes("8. le Venn chien / adopté", [z8.zones.aSeul, z8.zones.commun, z8.zones.bSeul, z8.zones.dehors].map((x) => Number(x[0])), [t.cellule("Chien", "En attente"), t.cellule("Chien", "Adopté"), t.cellule("Chat", "Adopté"), ni]);
    v.ok("8. la zone surlignée est le dehors", z8.surligne === "dehors");
  }

  /* ── ★★ ── */
  {
    const t = croise(9);
    const et = t.cellule("Récente", "Électrique");
    const ou = t.cellule("Total", "Électrique") + t.cellule("Récente", "Total") - et;
    vaut("9. ET", et, 36);
    vaut("9. OU", ou, 134);
    vaut("9. NON électrique", t.cellule("Total", "Total") - t.cellule("Total", "Électrique"), 200);
    vaut("9. thermique ET ancienne = total − OU", t.cellule("Ancienne", "Thermique"), t.cellule("Total", "Total") - ou);
    const z = vennDe(9, "schema").zones;
    memes("9. le Venn", [z.aSeul, z.commun, z.bSeul, z.dehors].map((x) => Number(x[0])), [t.cellule("Ancienne", "Électrique"), et, t.cellule("Récente", "Thermique"), t.cellule("Ancienne", "Thermique")]);
    dit(9, "$50 + 120 - 36 = 134$", "$250 - 50 = 200$", "$250 - 134 = 116$");
  }
  {
    const club = fichier(10).individus;
    const compet = (x) => x["Compétition"] === "oui";
    memes("10. confirmé ET compétition", noms(club.filter((x) => x.Niveau === "confirmé" && compet(x))), ["Inès", "Léa", "Tom"]);
    const jeune = (x) => x["Âge"] < 16;
    const z = zones(club, jeune, compet);
    memes("10. le Venn (A : moins de 16 ans, B : compétition)", vennDe(10, "schema").zones, z);
    const ou = z.aSeul.length + z.commun.length + z.bSeul.length;
    vaut("10. OU", ou, 5);
    const non = club.filter((x) => !compet(x));
    memes("10. NON compétition", noms(non), ["Hugo", "Maya", "Noah", "Zoé"]);
    v.ok("10. Noah et Zoé ont 16 ans pile", club.filter((x) => x["Âge"] === 16).map((x) => x["Prénom"]).join() === "Noah,Zoé");
    dit(10, "$4 + 4 - 3 = 5$", "$8 - 4 = 4$ inscrits : Hugo, Maya, Noah, Zoé");
  }
  {
    const { zones: z, noms: n } = vennDe(11, "figure");
    const [a, ab, b, hors] = [z.aSeul, z.commun, z.bSeul, z.dehors].map((x) => Number(x[0]));
    vaut("11. le total fait 30", a + ab + b + hors, 30);
    v.ok("11. « 30 élèves » dans le Venn et l'énoncé", n.e === "30 élèves" && e(11).includes("$30$ élèves"));
    dit(11, `$${a} + ${ab} = ${a + ab}$ élèves`, `$${ab} + ${b} = ${ab + b}$ élèves`, `$${a} + ${ab} + ${b} = ${a + ab + b}$`, `$${a + ab} + ${ab + b} - ${ab} = ${a + ab + b}$`, `$30 - ${a + ab + b} = ${hors}$`, `$30 - ${a + ab} = ${30 - a - ab}$`);
  }
  {
    const [total, dormi, sommet, deux] = [200, 120, 90, 50];
    v.ok("12. les effectifs de l'énoncé", [`$${total}$ randonneurs`, `$${dormi}$ y ont dormi`, `$${sommet}$ sont montés`, `$${deux}$ ont fait les deux`].every((p) => e(12).includes(p)));
    const t = croise(12, "schema");
    vaut("12. dormi ET sommet", t.cellule("Dormi", "Sommet"), deux);
    vaut("12. dormi sans sommet", t.cellule("Dormi", "Pas de sommet"), dormi - deux);
    vaut("12. sommet sans dormir", t.cellule("Pas dormi", "Sommet"), sommet - deux);
    vaut("12. ni l'un ni l'autre", t.cellule("Pas dormi", "Pas de sommet"), total - dormi - sommet + deux);
    vaut("12. la case surlignée est le ET", t.sommeSurlignee, deux);
    vaut("12. OU", dormi + sommet - deux, 160);
    vaut("12. NON sommet", total - sommet, 110);
    dit(12, "$120 - 50 = 70$", "$90 - 50 = 40$", "$200 - 50 - 70 - 40 = 40$", "$120 + 90 - 50 = 160$", "$200 - 90 = 110$", "$200 - 160 = 40$");
  }
  {
    const t = croise(13);
    const L = "Plus de 30 km";
    vaut("13. > 30 km ET sur site", t.cellule(L, "Sur site"), 15);
    const ou = t.cellule("Total", "Télétravail") + t.cellule(L, "Total") - t.cellule(L, "Télétravail");
    vaut("13. OU", ou, 95);
    vaut("13. NON télétravail", t.cellule("Total", "Total") - t.cellule("Total", "Télétravail"), 120);
    vaut("13. ni l'un ni l'autre = total − OU", t.cellule("30 km ou moins", "Sur site"), t.cellule("Total", "Total") - ou);
    vaut("13. les cases surlignées du OU", croise(13, "schema").sommeSurlignee, ou);
    dit(13, "$80 + 60 - 45 = 95$", "$200 - 80 = 120$", "$200 - 95 = 105$");
  }
  {
    const [total, A, B, AB] = [60, 18, 24, 6];
    v.ok("14. les effectifs de l'énoncé", [`$${total}$ espèces`, `$${A}$ sont menacées`, `$${B}$ sont médicinales`, `$${AB}$ sont les deux`].every((p) => e(14).includes(p)));
    const ou = A + B - AB;
    v.ok("14. ET ≤ A ≤ OU", AB <= A && A <= ou);
    const z = vennDe(14, "schema").zones;
    memes("14. le Venn", [z.aSeul, z.commun, z.bSeul, z.dehors].map((x) => Number(x[0])), [A - AB, AB, B - AB, total - ou]);
    dit(14, `$18 + 24 - 6 = ${ou}$`, `$60 - 36 = ${total - ou}$`);
  }
  {
    const epi = fichier(15).individus;
    const prix = "Prix (€/kg)";
    memes("15. 2 ≤ prix ≤ 4", noms(epi.filter((x) => x[prix] >= 2 && x[prix] <= 4)), ["Pommes", "Tomates", "Kiwis", "Poireaux"]);
    memes("15. France ET bio", noms(epi.filter((x) => x.France === "oui" && x.Bio === "oui")), ["Pommes", "Carottes"]);
    memes("15. NON France", noms(epi.filter((x) => x.France !== "oui")), ["Bananes", "Avocats", "Mangues"]);
    const ou = epi.filter((x) => x.Bio === "oui" || x[prix] < 2);
    memes("15. bio OU < 2 € = les bio", noms(ou), noms(epi.filter((x) => x.Bio === "oui")));
    v.ok("15. les moins de 2 € sont tous bio", epi.filter((x) => x[prix] < 2).every((x) => x.Bio === "oui"));
    dit(15, "Pommes ($2{,}5$), Tomates ($3{,}2$), Kiwis ($4$), Poireaux ($2$) : $4$ produits", "$4 + 2 - 2 = 4$");
  }
  {
    const lieux = fichier(16).individus;
    const dB = "Niveau (dB)";
    const calme = (x) => x[dB] < 60;
    const dedans = (x) => x["Intérieur"] === "oui";
    memes("16. calme ET intérieur", noms(lieux.filter((x) => calme(x) && dedans(x))), ["Bibliothèque", "Classe"]);
    const pasCalme = lieux.filter((x) => !calme(x));
    const dehors = lieux.filter((x) => !dedans(x));
    const deux = lieux.filter((x) => !calme(x) && !dedans(x));
    memes("16. pas calmes", noms(pasCalme), ["Cantine", "Cour", "Gymnase", "Rue", "Concert"]);
    memes("16. dehors", noms(dehors), ["Cour", "Rue", "Parc"]);
    vaut("16. NON (A ET B) = NON A OU NON B", pasCalme.length + dehors.length - deux.length, lieux.filter((x) => !(calme(x) && dedans(x))).length);
    memes("16. au moins 80 dB", noms(lieux.filter((x) => x[dB] >= 80)), ["Cantine", "Gymnase", "Concert"]);
    dit(16, "$8 - 2 = 6$", "$5 + 3 - 2 = 6$", "Cantine ($80$), Gymnase ($85$), Concert ($100$)");
  }

  /* ── ★★★ ── */
  {
    const s = fichier(17).individus;
    const pous = (x) => x.Poussette === "oui";
    const hiver = (x) => x.Hiver === "oui";
    memes("17. poussette ET hiver", noms(s.filter((x) => pous(x) && hiver(x))), ["Étang", "Rivière", "Forêt"]);
    const D = (x) => x["Dénivelé (m)"] >= 500;
    const L = (x) => x["Longueur (km)"] >= 10;
    memes("17. ≥ 500 m", noms(s.filter(D)), ["Gorges", "Sommet", "Crêtes"]);
    memes("17. ≥ 10 km", noms(s.filter(L)), ["Gorges", "Sommet", "Crêtes", "Lac"]);
    memes("17. OU", noms(s.filter((x) => D(x) || L(x))), ["Gorges", "Sommet", "Crêtes", "Lac"]);
    vaut("17. NON poussette", s.filter((x) => !pous(x)).length, 5);
    const t = croise(17, "schema");
    vaut("17. croisé oui/oui", t.cellule("Poussette", "Hiver"), s.filter((x) => pous(x) && hiver(x)).length);
    vaut("17. croisé oui/non", t.cellule("Poussette", "Pas l'hiver"), s.filter((x) => pous(x) && !hiver(x)).length);
    vaut("17. croisé non/oui", t.cellule("Sans poussette", "Hiver"), s.filter((x) => !pous(x) && hiver(x)).length);
    vaut("17. croisé non/non", t.cellule("Sans poussette", "Pas l'hiver"), s.filter((x) => !pous(x) && !hiver(x)).length);
    vaut("17. dix sentiers", t.cellule("Total", "Total"), s.length);
    dit(17, "$3 + 4 - 3 = 4$", "$10 - 5 = 5$", "$3 + 2 + 2 + 3 = 10$");
  }
  {
    const t = croise(18);
    const et = t.cellule("Vote T1", "Vote T2");
    const ou = t.cellule("Vote T1", "Total") + t.cellule("Total", "Vote T2") - et;
    vaut("18. ET", et, 660);
    vaut("18. OU", ou, 870);
    vaut("18. ni l'un ni l'autre", t.cellule("Abst. T1", "Abst. T2"), t.cellule("Total", "Total") - ou);
    vaut("18. un seul tour", ou - et, t.cellule("Vote T1", "Abst. T2") + t.cellule("Abst. T1", "Vote T2"));
    vaut("18. 1 200 inscrits", t.cellule("Total", "Total"), 1200);
    const z = vennDe(18, "schema").zones;
    memes("18. le Venn", [z.aSeul, z.commun, z.bSeul, z.dehors].map((x) => Number(x[0])), [t.cellule("Vote T1", "Abst. T2"), et, t.cellule("Abst. T1", "Vote T2"), t.cellule("Abst. T1", "Abst. T2")]);
    dit(18, "$780 + 750 - 660 = 870$", "$1\\,200 - 870 = 330$", "$870 - 660 = 210$", "$120 + 90 = 210$");
  }
  {
    const o = fichier(19).individus;
    const S = "Salaire (€)";
    const cdi = (x) => x.CDI === "oui";
    const tele = (x) => x["Télétravail"] === "oui";
    vaut("19. CDI ET ≥ 2 000", o.filter((x) => cdi(x) && x[S] >= 2000).length, 4);
    vaut("19. CDI OU télétravail", o.filter((x) => cdi(x) || tele(x)).length, 6);
    memes("19. ni l'un ni l'autre", noms(o.filter((x) => !cdi(x) && !tele(x))), ["Vendeur", "Serveur"]);
    const sal = o.filter(cdi).map((x) => x[S]);
    vaut("19. somme des CDI", sal.reduce((a, b) => a + b, 0), 9600);
    vaut("19. moyenne des CDI", sal.reduce((a, b) => a + b, 0) / sal.length, 2400);
    v.ok("19. l'Assistant : 2 000 € pile, pas en CDI", o.some((x) => x.Poste === "Assistant" && x[S] === 2000 && !cdi(x)));
    dit(19, "$4 + 4 - 2 = 6$", "$8 - 6 = 2$", "\\dfrac{2\\,300 + 2\\,100 + 2\\,400 + 2\\,800}{4} = \\dfrac{9\\,600}{4} = 2\\,400$");
  }
  {
    const [total, F, L, FL] = [400, 250, 180, 100];
    v.ok("20. les effectifs de l'énoncé", [`$${total}$ skieurs`, `$${F}$ ont acheté`, `$${L}$ louent`, `$${FL}$ font les deux`].every((p) => e(20).includes(p)));
    const ou = F + L - FL;
    vaut("20. OU", ou, 330);
    vaut("20. ni l'un ni l'autre", total - ou, 70);
    vaut("20. NON forfait", total - F, 150);
    vaut("20. le journaliste", F + L, 430);
    v.ok("20. 430 > 400", F + L > total);
    const z = vennDe(20, "schema").zones;
    memes("20. le Venn", [z.aSeul, z.commun, z.bSeul, z.dehors].map((x) => Number(x[0])), [F - FL, FL, L - FL, total - ou]);
    dit(20, "$250 + 180 - 100 = 330$", "$400 - 330 = 70$", "$400 - 250 = 150$", "$150 + 100 + 80 + 70 = 400$");
  }
} catch (err) {
  v.ok("le recalcul s'exécute", false, String(err?.stack ?? err));
}

/* ── Les règles de rendu, mesurées à 375 px le 28/09 ──────────────────── */
{
  let imprimes = 0;
  let ecran = 0;
  const fautes = [];
  f.blocs.forEach((_, i) => {
    const k = i + 1;
    const propre = bloc(k);
    for (const cle of ["figure:", "schema:"]) {
      const j = propre.indexOf(cle);
      if (j < 0) continue;
      if (propre.slice(j, j + 40).includes("ecranSeulement(")) ecran++;
      else imprimes++;
    }
    const dessins = ["figure:", "schema:"].map((cle) => {
      const j = propre.indexOf(cle);
      if (j < 0) return null;
      const re = /\b(?!ecranSeulement\b)(\w+)\(/g;
      re.lastIndex = j + cle.length;
      const m = re.exec(propre);
      return m[1] + JSON.stringify(argumentsDe(propre, m.index + m[0].length - 1).map((t) => t.replace(/\s+/g, "")));
    });
    if (dessins[0] && dessins[1] && dessins[0] === dessins[1]) fautes.push(`${k} : même dessin dans l'énoncé et le corrigé`);
    for (const a of appels(propre, "feuille")) {
      const grille = json(a.args[0]);
      for (const ligne of grille) for (const t of ligne) if (typeof t === "string" && (/\$/.test(t) || [...t].length > 14)) fautes.push(`${k} : case « ${t} »`);
      if (grille.some((l) => l.length > 5)) fautes.push(`${k} : plus de 5 colonnes`);
    }
    for (const a of appels(propre, "tableauProba")) {
      const en = json(a.args[0]);
      const li = json(a.args[1]);
      if (li.some((l) => l.length !== en.length)) fautes.push(`${k} : tableau croisé, lignes et en-têtes de longueurs différentes`);
      if ([...en, ...li.flat()].some((t) => /\$|-\d/.test(t))) fautes.push(`${k} : $ ou tiret-moins dans le tableau croisé`);
    }
    for (const a of appels(propre, "venn")) {
      const z = json(a.args[0]);
      const n = a.args[1] ? json(a.args[1]) : {};
      const tous = [...Object.values(z).flat(), ...Object.values(n)];
      if (tous.some((t) => /\$|-\d/.test(t))) fautes.push(`${k} : $ ou tiret-moins dans le Venn`);
      // ⛔ Le nom de A part de x = 72, celui de B finit à x = 222 : 17 signes à eux deux.
      if ([...(n.a ?? "A")].length + [...(n.b ?? "B")].length > 17) fautes.push(`${k} : noms « ${n.a} » et « ${n.b} » trop longs`);
      if ([...z.aSeul, ...z.bSeul].some((t) => [...t].length > 8) || z.commun.some((t) => [...t].length > 7)) fautes.push(`${k} : un élément déborde de sa zone`);
      if ((z.dehors ?? []).join("").length > 22) fautes.push(`${k} : le dehors déborde`);
    }
  });
  v.ok("règles de rendu : fichiers, tableaux croisés, Venn", fautes.length === 0, fautes.join(" | "));
  v.ok(`10 à 14 dessins imprimés (${imprimes} imprimés, ${ecran} à l'écran seulement)`, imprimes >= 10 && imprimes <= 14, `${imprimes}`);
  console.log(`Dessins : ${imprimes} imprimés, ${ecran} à l'écran seulement`);

  const rappels = [...f.series.matchAll(/rappel: \[([\s\S]*?)\n\s*\],/g)].map((m) => (m[1].match(/^\s*"/gm) ?? []).length);
  v.ok("trois rappels de 2 à 4 lignes", rappels.length === 3 && rappels.every((x) => x >= 2 && x <= 4), JSON.stringify(rappels));
  const serie3 = f.series.split(/niveau: [123],/)[3] ?? "";
  v.ok("les 4 problèmes ont un titre", (serie3.match(/^\s*titre: "/gm) ?? []).length === 5);
  v.ok("chaque problème a un dessin", [17, 18, 19, 20].every((k) => /figure:|schema:/.test(bloc(k))));
}

controlesCommuns(v, source, { notionId: NOTION, classe: "premiere" });
const nbCorrections = (source.match(/correction:/g) ?? []).length;
v.ok("exactement 20 `correction:`", nbCorrections === 20, `${nbCorrections}`);

console.log(`Filtrer des données (1re) — ${justes} vérifications justes, ${fausses.length} fausses`);
fausses.forEach((x) => console.log("  ✗", x));
process.exit(fausses.length ? 1 : 0);
