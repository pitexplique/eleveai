import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { nombres, reponse, texte, type Q } from "./outils";

// LES CORRECTEURS DE aiguilles-patrons-probas.bank.ts. Vide = juste. Le patron est
// vérifié par un vrai pliage (un cube qu'on fait rouler), indépendant de la liste des 11.

const lireHeure = (t: string) => {
  const m = t.match(/(\d+) h (\d{2})/);
  return m ? { h: Number(m[1]), m: Number(m[2]) } : null;
};
const grande = (q: Q) => {
  const t = lireHeure(q.text);
  return t ? reponse(q, t.m === 0 ? 12 : t.m / 5) : ["heure illisible"];
};
const petite = (q: Q) => {
  const t = lireHeure(q.text);
  if (!t) return ["heure illisible"];
  const a = t.h % 12 === 0 ? 12 : t.h % 12;
  return texte(q, t.m === 0 ? `Sur le ${a}` : `Entre le ${a} et le ${a === 12 ? 1 : a + 1}`);
};
const ouiHorloge = (q: Q) => {
  const f = q.canvas as any;
  const t = lireHeure(q.text);
  if (!t) return ["heure illisible"];
  return texte(q, t.h === f.time.hour && t.m === f.time.minute ? "Oui" : "Non");
};
const quelleHorloge = (q: Q) => {
  const f = q.canvas as any;
  const t = lireHeure(q.text);
  if (!t) return ["heure illisible"];
  const a = f.start.hour === t.h && f.start.minute === t.m;
  const b = f.end.hour === t.h && f.end.minute === t.m;
  if (a === b) return ["pas exactement une horloge juste"];
  return texte(q, a ? "L'horloge A" : "L'horloge B");
};
const apresMidi = (q: Q) => (/grande/.test(q.text) ? grande(q) : petite(q));
const trotteuse = (q: Q) => {
  const m = q.text.match(/min (\d+) s/);
  return m ? reponse(q, Number(m[1]) / 5) : ["secondes illisibles"];
};
const cadranAM = (q: Q) => {
  const f = q.canvas as any;
  const t = lireHeure(q.text);
  if (!t) return ["heure illisible"];
  return texte(q, t.h - 12 === f.time.hour && t.m === f.time.minute ? "Oui" : "Non");
};

/* patron : on fait rouler un cube sur les carrés ; il faut 6 faces différentes. */
type Cases = [number, number][];
function faces(c: Cases) {
  const out = new Map<string, number>();
  const clef = (r: number, x: number) => `${r},${x}`;
  const dedans = new Set(c.map(([r, x]) => clef(r, x)));
  // Un cube : [dessous, dessus, nord, sud, est, ouest], numérotés de 0 à 5.
  let ok = true;
  const roule = (r: number, x: number, d: number[]) => {
    const k = clef(r, x);
    if (out.has(k)) { if (out.get(k) !== d[0]) ok = false; return; }
    out.set(k, d[0]);
    const [b, h, n, s, e, o] = d;
    if (dedans.has(clef(r, x + 1)) && !out.has(clef(r, x + 1))) roule(r, x + 1, [e, o, n, s, h, b]);
    if (dedans.has(clef(r, x - 1)) && !out.has(clef(r, x - 1))) roule(r, x - 1, [o, e, n, s, b, h]);
    if (dedans.has(clef(r + 1, x)) && !out.has(clef(r + 1, x))) roule(r + 1, x, [s, n, b, h, e, o]);
    if (dedans.has(clef(r - 1, x)) && !out.has(clef(r - 1, x))) roule(r - 1, x, [n, s, h, b, e, o]);
  };
  roule(c[0][0], c[0][1], [0, 1, 2, 3, 4, 5]);
  return { out, ok };
}
const replie = (c: Cases) => {
  const { out } = faces(c);
  return c.length === 6 && out.size === 6 && new Set(out.values()).size === 6;
};
const OPPOSE = [1, 0, 3, 2, 5, 4];
const lequelPatron = (q: Q, mot: string, chercheOui = true) => {
  const l = (q.canvas as any).patrons as { nom: string; cases: Cases }[];
  const j = l.filter((p) => replie(p.cases) === chercheOui);
  return j.length === 1 ? texte(q, `${mot} ${j[0].nom}`) : [`${j.length} dessins conviennent`];
};
const ouiPatron = (q: Q) => texte(q, replie((q.canvas as any).patrons[0].cases) ? "Oui" : "Non");
const VRAI: [RegExp, number][] = [[/arêtes/, 12], [/sommets/, 8], [/faces|carrés/, 6]];
const cube = (q: Q) => {
  const m = VRAI.find(([r]) => r.test(q.text));
  return m ? reponse(q, m[1]) : ["question inconnue"];
};
const place = (q: Q) => {
  const p = (q.canvas as any).patrons[0];
  const j = p.places.filter((t: any) => replie([...p.cases, t.case]));
  return j.length === 1 ? texte(q, `La place ${j[0].texte}`) : [`${j.length} places conviennent`];
};
const oppose = (q: Q) => {
  const p = (q.canvas as any).patrons[0];
  const { out } = faces(p.cases);
  const n = nombres(q.text)[0];
  const faceDe = (t: string) => {
    const a = p.textes.find((x: any) => x.texte === t);
    return out.get(`${a.case[0]},${a.case[1]}`)!;
  };
  const opp = OPPOSE[faceDe(String(n))];
  const r = p.textes.find((x: any) => out.get(`${x.case[0]},${x.case[1]}`) === opp);
  return reponse(q, Number(r.texte));
};
const de = (q: Q) => {
  const p = (q.canvas as any).patrons[0];
  const { out } = faces(p.cases);
  const c = p.textes.find((x: any) => x.texte === "?");
  const f = out.get(`${c.case[0]},${c.case[1]}`)!;
  const r = p.textes.find((x: any) => out.get(`${x.case[0]},${x.case[1]}`) === OPPOSE[f]);
  return reponse(q, 7 - Number(r.texte));
};
const carton = (q: Q) => {
  const a = nombres(q.text)[0];
  return reponse(q, (/sans couvercle/.test(q.text) ? 5 : 6) * a * a, "cm²");
};

/* deux étapes : on écrit toutes les issues. */
const lireChance = (s: string) => {
  const m = s.match(/^(\d+) chances? sur (\d+)$/);
  return m ? [Number(m[1]), Number(m[2])] : null;
};
const chance = (q: Q, a: number, b: number) => {
  const e = lireChance(String(q.expected[0]));
  if (!e) return [`réponse illisible : ${q.expected[0]}`];
  if (e[0] !== a || e[1] !== b) return [`attendu ${e[0]} sur ${e[1]}, calcul : ${a} sur ${b}`];
  const vals = (q.choices ?? []).map(lireChance).map((x) => (x ? x[0] / x[1] : NaN));
  if (new Set(vals).size !== vals.length) return [`deux choix de même valeur : ${q.choices?.join(" | ")}`];
  return [];
};
const issuesPiece = (q: Q) => reponse(q, 4);
const feuilles = (q: Q) => {
  const f = q.canvas as any;
  return reponse(q, f.racineEnfants.reduce((s: number, n: any) => s + n.enfants.length, 0));
};
const piece = (q: Q) => {
  const I = [["Pile", "Pile"], ["Pile", "Face"], ["Face", "Pile"], ["Face", "Face"]];
  const t = q.text;
  const test = (x: string[]) => {
    if (/deux fois Pile/.test(t)) return x[0] === "Pile" && x[1] === "Pile";
    if (/deux fois Face/.test(t)) return x[0] === "Face" && x[1] === "Face";
    if (/Pile puis Face/.test(t)) return x[0] === "Pile" && x[1] === "Face";
    if (/Face puis Pile/.test(t)) return x[0] === "Face" && x[1] === "Pile";
    if (/même côté/.test(t)) return x[0] === x[1];
    if (/une fois Pile et une fois Face/.test(t)) return x[0] !== x[1];
    if (/au moins une fois Pile/.test(t)) return x.includes("Pile");
    if (/au moins une fois Face/.test(t)) return x.includes("Face");
    if (/Pile au premier/.test(t)) return x[0] === "Pile";
    if (/Face au deuxième/.test(t)) return x[1] === "Face";
    return false;
  };
  const fav = I.filter(test).length;
  return fav ? chance(q, fav, 4) : ["événement inconnu"];
};
const des = (q: Q) => {
  const f = q.canvas as any;
  const s = nombres(q.text).slice(-1)[0];
  const n = f.rows.length;
  // On contrôle le tableau, puis on compte ses cases.
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (Number(f.rows[i].values[j + 1]) !== i + j + 2) return ["tableau faux"];
  const cases = f.rows.flatMap((r: any) => r.values.slice(1)).filter((x: string) => Number(x) === s).length;
  return chance(q, cases, n * n);
};
const sacs = (q: Q) => {
  // « Le sac 1 contient r1 … et a1 … Le sac 2 contient r2 … et a2 » : les numéros des sacs comptent aussi.
  const b = nombres(q.text);
  const v = [b[1], b[2], b[4], b[5]];
  return chance(q, v[0] * v[2], (v[0] + v[1]) * (v[2] + v[3]));
};
const finir = (q: Q) => {
  const f = q.canvas as any;
  const c = q.text.match(/(?:finir par|arriver sur) (.+?) \?/)?.[1];
  const tous = f.racineEnfants.flatMap((n: any) => n.enfants.map((e: any) => e.label));
  return chance(q, tous.filter((x: string) => x === c).length, tous.length);
};
const roue = (q: Q) => {
  const [n, g] = nombres(q.text);
  return chance(q, g, n * 2);
};
const qui = (q: Q) => {
  const m = q.text.match(/On lance deux dés\. (\S+) gagne si la somme vaut (\d+)\. (\S+) gagne si la somme vaut (\d+)/);
  if (!m) return ["énoncé illisible"];
  const nb = (s: number) => {
    let t = 0;
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === s) t++;
    return t;
  };
  const x = nb(Number(m[2]));
  const y = nb(Number(m[4]));
  if (x === y) return ["mêmes chances : énoncé à éviter"];
  return texte(q, x > y ? m[1] : m[3]);
};
const menu = (q: Q) => {
  const [a, b] = nombres(q.text);
  return chance(q, 1, a * b);
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  duree_positionner_aiguilles_tpl_1: grande,
  duree_positionner_aiguilles_tpl_2: petite,
  duree_positionner_aiguilles_tpl_3: ouiHorloge,
  duree_positionner_aiguilles_tpl_4: quelleHorloge,
  duree_positionner_aiguilles_tpl_5: apresMidi,
  duree_positionner_aiguilles_tpl_6: trotteuse,
  duree_positionner_aiguilles_tpl_7: grande,
  duree_positionner_aiguilles_tpl_8: petite,
  duree_positionner_aiguilles_tpl_9: cadranAM,
  solide_patron_construire_tpl_1: (q) => lequelPatron(q, "Le dessin"),
  solide_patron_construire_tpl_2: ouiPatron,
  solide_patron_construire_tpl_3: cube,
  solide_patron_construire_tpl_4: place,
  solide_patron_construire_tpl_5: oppose,
  solide_patron_construire_tpl_6: (q) => lequelPatron(q, "Le dessin", false),
  solide_patron_construire_tpl_7: (q) => lequelPatron(q, "La découpe"),
  solide_patron_construire_tpl_8: de,
  solide_patron_construire_tpl_9: carton,
  probabilite_deux_etapes_tpl_1: issuesPiece,
  probabilite_deux_etapes_tpl_2: feuilles,
  probabilite_deux_etapes_tpl_3: piece,
  probabilite_deux_etapes_tpl_4: des,
  probabilite_deux_etapes_tpl_5: sacs,
  probabilite_deux_etapes_tpl_6: finir,
  probabilite_deux_etapes_tpl_7: roue,
  probabilite_deux_etapes_tpl_8: qui,
  probabilite_deux_etapes_tpl_9: menu,
});
