// LE PONT ENTRE L'ÉVALUATION ET CE QU'ON PEUT EN FAIRE.
//
// POURQUOI (17/08/2026). `/eval-pix-ia` disait à l'élève « ta compétence 2.3
// est fragile », et le seul bouton de sortie pointait vers `/coach-ia/ia` tout
// court : ni classe, ni notion. Il fallait retrouver soi-même la 2.3 parmi
// seize compétences et cinquante-neuf savoir-faire. Le diagnostic était juste,
// et il ne menait nulle part.
//
// Deux choses manquaient, et une seule était vraiment absente :
//   - les LIENS vers le coach : trois paramètres d'URL, rien de plus ;
//   - la correspondance vers les FICHES DE COURS. Les seize fiches existent
//     depuis longtemps (`lib/fiches/registre.ts`, clés `ia/<domaine>/<slug>`)
//     et elles recouvrent exactement les seize compétences Pix — mais rien
//     n'associait « 2.3 » à « ia/usages/evaluer-l-information ». Ce fichier
//     est cette association, et rien d'autre.
//
// ⚠️ POURQUOI UNE TABLE ÉCRITE À LA MAIN, ici. Ailleurs dans le dépôt, le slug
// d'une fiche EST le `notionId` du coach : aucune table, le coach fait foi
// (voir `ficheHrefPourCoach`). Cette règle ne peut pas s'appliquer ici : les
// notions du coach IA sont les identifiants Pix — « 2.3 » — et une fiche ne
// peut pas s'appeler « 2.3 ». Deux nommages, donc une table. Elle est courte,
// figée par le référentiel, et `verifierFichesPix()` la contrôle.

import { PIX_COMPETENCES } from "./referentiel";
import { PIX_MICROSKILLS } from "./microskills";
import { ficheHrefSiExiste } from "@/lib/fiches/registre";

/** compétence Pix → clé de fiche, sous la forme `<domaine>/<slug>`. */
const FICHE_PAR_COMPETENCE: Record<string, string> = {
  // Domaine 1 — Fondements
  "1.1": "fondements/definir-l-ia",
  "1.2": "fondements/apprentissage-automatique",
  "1.3": "fondements/modeles-apprentissage",
  "1.4": "fondements/grands-modeles-de-langage",
  "1.5": "fondements/algorithmes-de-recommandation",
  "1.6": "fondements/ia-incarnee-robotique",
  // Domaine 2 — Usages
  "2.1": "usages/familles-de-taches",
  "2.2": "usages/utiliser-ia-generative",
  "2.3": "usages/evaluer-l-information",
  "2.4": "usages/services-de-recommandation",
  "2.5": "usages/ia-dans-une-organisation",
  // Domaine 3 — Enjeux
  "3.1": "enjeux/empreinte-environnementale",
  "3.2": "enjeux/gouvernance",
  "3.3": "enjeux/ethique-et-transparence",
  "3.4": "enjeux/emploi-et-formation",
  "3.5": "enjeux/enjeux-culturels-societaux",
};

/**
 * Le lien de la fiche de cours d'une compétence, ou `null`.
 *
 * On passe par `ficheHrefSiExiste` plutôt que de fabriquer l'adresse : si une
 * fiche disparaît du registre, on rend `null` — pas un lien mort.
 */
export function ficheDeCompetence(competenceId: string): string | null {
  const cle = FICHE_PAR_COMPETENCE[competenceId];
  if (!cle) return null;
  const [domaine, slug] = cle.split("/");
  return ficheHrefSiExiste("ia", domaine, slug);
}

/** La classe du coach correspondant au niveau passé à l'évaluation. */
export function classeCoachPour(niveau: "college" | "lycee"): string {
  return niveau === "lycee" ? "pix-lycee" : "pix-college";
}

/**
 * Le lien vers le coach, ouvert SUR la compétence.
 *
 * Choix assumé : on ouvre sur la compétence, pas sur le premier savoir-faire
 * fragile. Le coach est déjà en vue « simple », où l'élève ne choisit pas sa
 * question ; lui retirer aussi le choix de ce qu'il travaille ferait beaucoup
 * d'un coup. Il voit ses savoir-faire, et il décide.
 */
export function coachPourCompetence(
  competenceId: string,
  niveau: "college" | "lycee",
): string {
  const classe = classeCoachPour(niveauServant(competenceId, niveau));
  return `/coach-ia/ia?classe=${encodeURIComponent(classe)}&notion=${encodeURIComponent(competenceId)}`;
}

/**
 * Le niveau qui SAIT réellement travailler cette compétence.
 *
 * ⚠️ TOUTES LES COMPÉTENCES N'EXISTENT PAS AUX DEUX NIVEAUX. La 3.4
 * (« Conséquences sur l'emploi et la formation ») n'a aucun savoir-faire
 * avancé ni expert dans le référentiel Pix : elle est donc absente du coach
 * lycée, à juste titre. Un élève de lycée fragile sur la 3.4 aurait suivi un
 * lien vers `pix-lycee&notion=3.4` et trouvé une liste vide, sans un mot
 * d'explication. Le lien bascule sur le collège.
 *
 * Ce repli est le MÊME que celui de l'évaluation blanche, qui sert déjà une
 * question de palier collège pour la 3.4 en mode lycée : l'élève s'entraîne
 * donc sur ce qui lui a été demandé. Il est écrit ici, pas subi.
 */
function niveauServant(
  competenceId: string,
  niveau: "college" | "lycee",
): "college" | "lycee" {
  if (niveau === "college") return "college";
  const aDuLycee = PIX_MICROSKILLS.some(
    (m) =>
      m.competenceId === competenceId &&
      (m.palier === "avance" || m.palier === "expert"),
  );
  return aDuLycee ? "lycee" : "college";
}

/**
 * Garde-fou : toute compétence du référentiel a-t-elle une fiche qui existe ?
 *
 * ⚠️ Une table de correspondance écrite à la main se périme en silence — une
 * fiche renommée, et le lien tombe sans que rien ne l'annonce. On ne peut pas
 * s'en remettre à la relecture : c'est exactement le genre d'oubli qui passe.
 * Utilisé par scripts/verifier-fiches-pix.ts.
 */
export function verifierFichesPix(): {
  competenceId: string;
  label: string;
  probleme: string;
}[] {
  const manques: { competenceId: string; label: string; probleme: string }[] = [];

  for (const c of PIX_COMPETENCES) {
    const cle = FICHE_PAR_COMPETENCE[c.id];
    if (!cle) {
      manques.push({ competenceId: c.id, label: c.label, probleme: "aucune fiche déclarée" });
      continue;
    }
    if (!ficheDeCompetence(c.id)) {
      manques.push({
        competenceId: c.id,
        label: c.label,
        probleme: `déclarée vers « ${cle} », absente du registre des fiches`,
      });
    }
  }

  /* Et l'inverse : une fiche déclarée pour une compétence qui n'existe plus. */
  const idsConnus = new Set(PIX_COMPETENCES.map((c) => c.id));
  for (const id of Object.keys(FICHE_PAR_COMPETENCE)) {
    if (!idsConnus.has(id)) {
      manques.push({
        competenceId: id,
        label: "—",
        probleme: "déclarée pour une compétence absente du référentiel Pix",
      });
    }
  }

  return manques;
}
