// (24/11) Branche sur les automatismes de 1re (et de STMG, même id de micro) des vidéos DÉJÀ FAITES
// pour le collège, la 2de ou les « bases ». Tableau et raisons : manim/branchement-auto-1re-24-11.md
// node .tmp-ress-branchement-auto-1re.mjs          → lecture + contrôle R2 (rien n'est écrit)
// node .tmp-ress-branchement-auto-1re.mjs ecrire   → insère les lignes manquantes (PRODUCTION)
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
for (const l of readFileSync(".env.local", "utf8").split(/\r?\n/)) { const m = l.match(/^([A-Z_]+)=(.*)$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const ecrire = process.argv[2] === "ecrire";
const R2 = "https://pub-a5bab809c9be4ab6a33fe47c1aa68b5b.r2.dev/";
const MAN = Object.fromEntries(JSON.parse(readFileSync("manim/manifeste-youtube.json", "utf8")).videos.map((v) => [v.id, v]));
const VR2 = JSON.parse(readFileSync("lib/videos/videos-r2.json", "utf8"));
const micros = (f) => Object.fromEntries([...readFileSync(f, "utf8").matchAll(/id: "(auto_[a-z_]+)", label: "[^"]*", notionId: "([a-z_]+)"/g)].map((m) => [m[1], m[2]]));
const MICROS = { premiere: micros("lib/tutor-v4/knowledge/maths/premiere/microSkills.ts"), stmg: micros("lib/tutor-v4/knowledge/maths/stmg/microSkills.ts") };

// micro → vidéos (paysage d'abord, puis short). « *1re » / « *stmg » : seulement pour cette classe.
const B = {
  auto_num_fractions_comparer: ["4e-frac-comparer", "4e-frac-comparer-short"],
  auto_num_fractions_operations: ["bases-fractions", "bases-fractions-ordre", "bases-fractions-additionner"],
  auto_num_ecritures: ["4e-frac-decimal", "4e-frac-decimal-short", "bases-fractions-ecritures", "seconde-puissance-notation-scientifique*stmg"],
  auto_num_calcul_mental: ["bases-pourcentages-calcul-mental", "bases-pourcentages-calcul-mental-short"],
  auto_num_vraisemblance: ["4e-prop-grandeur-coherence", "4e-prop-grandeur-coherence-short"],
  auto_num_conversions: ["4e-prop-grandeur-convertir", "4e-prop-grandeur-convertir-short"],
  auto_alg_developper: ["4e-litteral-developper", "4e-distrib-reduire", "4e-distrib-reduire-short"],
  auto_alg_identites: ["4e-identites-developper", "4e-identites-developper-short", "ir-double-produit"],
  auto_alg_factoriser_commun: ["4e-litteral-factoriser", "4e-facto-maximum", "4e-facto-maximum-short"],
  auto_alg_factoriser_identite: ["3e-identites-factoriser", "3e-identites-factoriser-short", "ir-difference"],
  auto_alg_equation_premier_degre: ["4e-equation-resoudre-reduction", "4e-equation-resoudre-reduction-short"],
  auto_alg_equation_carre: ["3e-equation-resolution"],
  auto_alg_inequation: ["equations-inequations", "eq-retournement"],
  auto_alg_produit_nul: ["premiere-degre2-forme-factorisee", "3e-equation-resolution"],
  auto_alg_signe_premier_degre: ["seconde-signes-expression"],
  auto_alg_signe_factorisee: ["premiere-degre2-forme-factorisee", "seconde-signes-expression"],
  auto_alg_tableau_signes: ["seconde-signes-expression", "seconde-signes-expression-short-dauphin"],
  auto_alg_application_formule: ["3e-expression-substituer", "3e-expression-substituer-short", "4e-expression-substituer-short"],
  auto_fct_image_antecedent: ["fonction-vocabulaire", "3e-affine-graphique", "fv-lecture"],
  auto_fct_reperer_graphique: ["premiere-commun-stats-lire-graphique*premiere", "stmg-stats-lire-graphique*stmg"],
  auto_fct_estimer_seuil: ["3e-affine-graphique-short"],
  auto_fct_resoudre_graphiquement: ["fv-lecture"],
  auto_fct_signe_graphique: ["seconde-signes-expression-short-dauphin"],
  auto_fct_lineaire_affine: ["3e-affine-reconnaitre", "3e-affine-reconnaitre-short"],
  auto_fct_tracer_droite: ["3e-affine-tracer", "3e-affine-tracer-short"],
  auto_fct_lire_equation_reduite: ["3e-affine-ordonnee-origine", "3e-affine-coeff-directeur"],
  auto_fct_coefficient_directeur: ["3e-affine-coeff-directeur", "3e-affine-expression", "3e-affine-expression-short"],
  auto_fct_equation_deux_points: ["3e-affine-expression", "3e-affine-expression-short"],
  auto_stat_moyenne: ["seconde-stats-moyenne", "seconde-stats-moyenne-short", "seconde-stats-moyenne-ponderee", "seconde-stats-moyenne-ponderee-short"],
  auto_stat_mediane: ["seconde-stats-mediane-quartiles", "seconde-stats-mediane-quartiles-short"],
  auto_stat_quartiles: ["seconde-stats-mediane-quartiles"],
  auto_stat_interpreter_indicateurs: ["seconde-stats-interpreter", "seconde-stats-interpreter-short"],
  auto_stat_boites: ["stmg-stats-boite", "stmg-stats-boite-short"],
};

const estShort = (id) => (MAN[id] ? MAN[id].type === "short" : VR2[id]?.short === true);
const url = (id) => `https://www.eleveai.fr/video/${id}${estShort(id) ? "?format=short" : ""}`;
const titre = (id) => MAN[id]?.titre ?? VR2[id]?.titre ?? id;
let lignes = [];
const manque = [];
for (const [micro, vids] of Object.entries(B))
  for (const classe of ["premiere", "stmg"]) {
    const notion = MICROS[classe][micro];
    if (!notion) continue;
    for (const brut of vids) {
      const [id, seul] = brut.split("*");
      if (seul && seul !== classe) continue;
      if (!VR2[id]) { manque.push(id); continue; }
      lignes.push({ matiere: "maths", classe, notion_id: notion, micro_id: micro, type: "video", url: url(id), titre: titre(id), _id: id });
    }
  }
if (manque.length) console.log("ABSENTES de videos-r2.json :", [...new Set(manque)]);

// Contrôle R2 : chaque fichier doit répondre 200.
const ids = [...new Set(lignes.map((l) => l._id))];
let ko = 0;
await Promise.all(ids.map(async (id) => {
  const r = await fetch(R2 + VR2[id].fichier, { method: "HEAD" });
  if (r.status !== 200) { ko++; console.log("R2", r.status, id); }
}));
console.log(`R2 : ${ids.length - ko} / ${ids.length} vidéos en 200`);
if (ko) { lignes = lignes.filter(() => false); throw new Error("R2 en échec : rien n'est inséré"); }

const { data: deja, error: e0 } = await sb.from("notion_ressources").select("classe,micro_id,url").in("classe", ["premiere", "stmg"]).eq("type", "video").limit(5000);
if (e0) throw e0;
const cle = (l) => `${l.classe}|${l.micro_id}|${l.url}`;
const vus = new Set(deja.map(cle));
lignes = lignes.filter((l) => !vus.has(cle(l)));
console.log("à insérer :", lignes.length);
for (const l of lignes) console.log(" ", l.classe, l.micro_id, l._id);
if (ecrire && lignes.length) {
  const { data, error } = await sb.from("notion_ressources").insert(lignes.map(({ _id, ...l }) => l)).select("micro_id");
  if (error) throw error;
  console.log("insérées :", data.length);
}
