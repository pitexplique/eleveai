import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { SITS_PROP_CM } from "../proportionnalite-cm-renfort";
import { egal, nombres, net, valeur, type Q } from "./outils";

// LES CORRECTEURS DES GABARITS DE PROPORTIONNALITÉ VISIBLES AU COURS MOYEN (CM1, CM2). Vide =
// juste. Ils relisent les nombres de l'énoncé et refont le raisonnement par la valeur d'un seul.
// Ils refusent aussi tout tableau et tout coefficient de proportionnalité.

const interdit = (q: Q) => {
  const p: string[] = [];
  if (/tableau|coefficient|produit en croix/i.test(`${q.text} ${q.explanation ?? ""} ${(q.choices ?? []).join(" ")}`)) p.push("tableau ou coefficient dans la question");
  if ((q.canvas as any)?.kind === "tableau_proportionnalite") p.push("canvas tableau");
  return p;
};
const lu = (q: Q, juste: number) => (egal(net(valeur(String(q.expected[0]))), net(juste)) ? [] : [`attendu « ${q.expected[0]} », le calcul donne ${juste}`]);

/** La question demande-t-elle la quantité (« combien de mangues avec 20 € ? ») ? */
const sensInverse = (t: string, dernier: number) => SITS_PROP_CM.some((s) => t.includes(s.demandeA(dernier)));

/** n₁ → m₁, puis la dernière valeur : le calcul se fait par la valeur d'un seul. */
const valeurManquante = (q: Q) => {
  const n = nombres(q.text.replace(/On en prend \d+ fois (plus|moins)\. /, ""));
  const [a, b] = n;
  const der = n[n.length - 1];
  const un_ = b / a;
  return lu(q, sensInverse(q.text, der) ? der / un_ : der * un_);
};
const reconnaitre = (q: Q) => {
  const n = nombres(q.text);
  if (n.length < 4 || n.length % 2) return [`nombres illisibles : ${n.join(" ")}`];
  const unites = new Set<number>();
  for (let i = 0; i < n.length; i += 2) unites.add(net(n[i + 1] / n[i]));
  return String(q.expected[0]) === (unites.size === 1 ? "oui" : "non") ? [] : [`attendu « ${q.expected[0]} », valeurs pour un seul : ${[...unites].join(" ; ")}`];
};
const offres = (q: Q) => {
  const [na, pa, nb, pb] = nombres(q.text);
  const j = pa / na < pb / nb ? "l’offre A" : pa / na > pb / nb ? "l’offre B" : "elles se valent";
  return q.expected[0] === j ? [] : [`attendu « ${q.expected[0]} », juste : « ${j} »`];
};
const defi = (q: Q) => (/[Oo]ffre A/.test(q.text) ? offres(q) : valeurManquante(q));
const avec = (f: (q: Q) => string[]) => (q: Q) => [...interdit(q), ...f(q)];

export const correcteursPropRenfort = (niveau: "cm1" | "cm2"): CorrecteursMaths => {
  const r: CorrecteursMaths = {};
  const pose = (micro: string, cles: string[], f: (q: Q) => string[]) => {
    for (const c of cles) r[`${niveau}_renfort_${micro}_${c}`] = avec(f);
  };
  pose("prop_reconnaitre", ["1_1", "1_2", "2_1", "2_2", "3_1", "3_2"], reconnaitre);
  pose("prop_probleme", ["3_1", "3_2", "4_1", "4_2"], valeurManquante);
  pose("prop_defi", ["4_1", "4_2", "5_1", "5_2"], defi);
  if (niveau === "cm1") {
    pose("prop_fois_plus", ["2_1", "2_2", "3_1", "3_2"], valeurManquante);
    pose("prop_fois_moins", ["2_1", "2_2", "3_1", "3_2"], valeurManquante);
  } else {
    pose("prop_quatrieme", ["2_1", "3_1", "3_2", "4_1"], valeurManquante);
  }
  return r;
};
