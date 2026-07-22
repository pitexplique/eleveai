import type { FamilleDico, MotDico } from "../types";

// 🦉 Dico Philosophie Terminale (CARTES) — la matière nouvelle de terminale.
// Le vocabulaire du cours ET de la dissertation (orthographe piégeuse comprise).

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsPhiloTerminale: MotDico[] = [
  carte("term-p-philosophie", "Philosophie", "philo", "L'amour de la sagesse : questionner ce qu'on croit savoir."),
  carte("term-p-conscience", "Conscience", "philo", "La connaissance immédiate que l'esprit a de lui-même."),
  carte("term-p-inconscient", "Inconscient", "philo", "La part du psychisme qui échappe à la conscience (Freud)."),
  carte("term-p-metaphysique", "Métaphysique", "philo", "L'étude de ce qui est au-delà du monde physique."),
  carte("term-p-dialectique", "Dialectique", "philo", "L'art de progresser vers le vrai par le dialogue et les contradictions."),
  carte("term-p-scepticisme", "Scepticisme", "philo", "La doctrine qui doute qu'une vérité certaine soit accessible."),
  carte("term-p-stoicisme", "Stoïcisme", "philo", "L'école antique : n'être troublé que par ce qui dépend de nous.", "Attention au tréma sur le ï."),
  carte("term-p-transcendance", "Transcendance", "philo", "Ce qui dépasse et surplombe l'expérience humaine."),
  carte("term-p-aliénation", "Aliénation", "philo", "Devenir étranger à soi-même, dépossédé de ce qu'on est."),
  carte("term-p-ethique", "Éthique", "philo", "La réflexion sur la manière de bien agir."),
  carte("term-p-souverainete", "Souveraineté", "philo", "Le pouvoir suprême de décider, qui n'obéit à aucun autre."),
  carte("term-p-existentialisme", "Existentialisme", "philo", "L'existence précède l'essence : l'homme se définit par ses actes (Sartre)."),
];
