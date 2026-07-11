// ─── Fiche de cours : les pourcentages (5e) ────────────────────────────────────
// Fiche « en blocs » : toute la matière de la page vit ici, la page et les
// flashcards ne font que la rendre. Contenu repris de l'ancienne page écrite
// à la main, enrichi des blocs Définition et Propriétés (format canonique
// réclamé par les profs).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Oublier de diviser par 100 : un pourcentage, c'est toujours sur 100.",
  "Confondre le montant de la réduction et le prix final.",
  "Oublier la référence : un pourcentage est toujours « de quelque chose ».",
];

const aRetenir = [
  "p % = p / 100.",
  "p % d'un nombre N = N × p / 100.",
  "50 % = moitié, 25 % = quart, 10 % = diviser par 10.",
];

// Le tableau de conversion de l'ancienne page (affiché à côté de la formule).
const conversion = [
  { pct: "10 %", val: "8" },
  { pct: "25 %", val: "20" },
  { pct: "50 %", val: "40" },
  { pct: "100 %", val: "80" },
];

const tableauConversion = (
  <>
    <p className="mb-3 text-sm font-bold text-slate-600">
      Quelques pourcentages de 80 :
    </p>
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full border-collapse text-center text-sm">
        <tbody className="divide-y divide-slate-200">
          <tr>
            <th className="bg-slate-50 px-3 py-2 text-left font-black text-slate-900">
              Pourcentage
            </th>
            {conversion.map((c) => (
              <td key={c.pct} className="px-3 py-2 text-slate-600">
                {c.pct}
              </td>
            ))}
          </tr>
          <tr>
            <th className="bg-slate-50 px-3 py-2 text-left font-black text-slate-900">
              de 80
            </th>
            {conversion.map((c) => (
              <td key={c.pct} className="px-3 py-2 font-bold text-sky-600">
                {c.val}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  </>
);

export const fichePourcentages5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "pourcentages",
  titre: "Les pourcentages",
  accroche:
    "Un pourcentage exprime une proportion sur 100. Il sert à calculer une part d'un nombre, une réduction ou une augmentation.",
  identite: [
    { label: "Prérequis", valeur: "Fractions, multiplication, division" },
    { label: "Formule clé", valeur: "p % de N = N × p / 100" },
    { label: "Outil", valeur: "Calculatrice" },
  ],
  definition: {
    texte:
      "Un pourcentage est une proportion exprimée sur 100 : écrire p %, c'est écrire la fraction p / 100. Prendre p % d'une quantité, c'est en prendre la fraction p / 100.",
  },
  proprietes: [
    {
      titre: "Prendre p % = multiplier par p / 100",
      texte:
        "Prendre p % d'un nombre revient à le multiplier par p / 100. Par exemple, prendre 20 % de 45, c'est calculer 45 × 20 / 100 = 9.",
    },
    {
      titre: "Un cas de proportionnalité",
      texte:
        "Appliquer un pourcentage, c'est une situation de proportionnalité : la part reste la même quelle que soit la quantité. 40 %, c'est 40 sur 100, mais aussi 20 sur 50 ou 10 sur 25.",
    },
    {
      titre: "Réduction et augmentation",
      texte:
        "Pour une réduction de p %, on calcule la part enlevée (prix × p / 100), puis on la soustrait au prix de départ. Pour une augmentation de p %, on calcule la part de la même façon, puis on l'ajoute.",
    },
  ],
  reel: {
    texte:
      "Les pourcentages sont partout dans la vie : les soldes (−30 %), la batterie du téléphone (80 %), les résultats de sondages, les taux d'intérêt, les réductions, ou encore le pourcentage de matières grasses sur les étiquettes.",
  },
  historique: {
    texte:
      "Le mot vient du latin « per centum », qui veut dire « pour cent ». Les marchands italiens de la Renaissance l'utilisaient déjà pour les intérêts et les taxes. Le symbole % est apparu petit à petit vers le XVIIᵉ siècle.",
  },
  formule: {
    contexte: "Prendre un pourcentage",
    expression: "p % de N = N × p / 100",
    legende: "On divise par 100, puis on multiplie par le nombre.",
    schema: tableauConversion,
  },
  methode: [
    {
      titre: "Comprendre",
      texte: "p % signifie « p sur 100 ». Par exemple 20 % = 20 / 100 = 0,2.",
    },
    {
      titre: "Calculer",
      texte: "Pour prendre p % d'un nombre N, on calcule N x p / 100.",
    },
    {
      titre: "Vérifier",
      texte:
        "On vérifie avec un cas facile : 50 % = la moitié, 25 % = le quart, 10 % = diviser par 10.",
    },
  ],
  usages: [
    {
      titre: "Calculer un pourcentage",
      detail: "p % d'un nombre N se calcule ainsi : N × p / 100.",
    },
    {
      titre: "Les cas faciles",
      detail: "50 % = la moitié, 25 % = le quart, 10 % = diviser par 10.",
    },
    {
      titre: "Réduction ou hausse",
      detail:
        "Une réduction de p % enlève une part du prix : on calcule la part, puis on soustrait.",
    },
  ],
  exemples: [
    {
      titre: "Calculer une part",
      donnees: "Une classe compte 25 élèves et 40 % sont demi-pensionnaires.",
      question: "Combien d'élèves sont demi-pensionnaires ?",
      solution:
        "40 % de 25 = 25 × 40 / 100 = 10. Il y a donc 10 demi-pensionnaires.",
    },
    {
      titre: "Une réduction",
      donnees: "Un article coûte 40 euros avec 10 % de réduction.",
      question: "Quel est le montant de la réduction, puis le prix payé ?",
      solution:
        "Réduction = 40 × 10 / 100 = 4 euros. Prix payé = 40 − 4 = 36 euros.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule 30 % de 200.",
      correction: "30 % de 200 = 200 × 30 / 100 = 60.",
    },
    {
      question:
        "Un jean coûte 60 euros avec 20 % de réduction. Quel est le montant de la réduction ?",
      correction: "60 × 20 / 100 = 12 euros de réduction.",
    },
    {
      question:
        "Dans un collège de 500 élèves, 12 % font de l'allemand. Combien d'élèves est-ce ?",
      correction: "500 × 12 / 100 = 60 élèves.",
    },
    {
      question: "Explique pourquoi 25 % correspond au quart d'un nombre.",
      correction:
        "25 / 100 = 1 / 4. Prendre 25 % d'un nombre revient donc à le diviser par 4.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesPourcentages5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Pourcentages - 5e",
    section: {
      type: "objectif",
      phrase: "Calculer un pourcentage d'un nombre",
      sousPhrase: "Un pourcentage exprime une proportion sur 100.",
      encadre: {
        titre: "L'idée",
        texte: "p % veut dire « p pour cent », donc p sur 100.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Les soldes (−30 %), la batterie du téléphone (80 %), les sondages, les taux d'intérêt, les étiquettes.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Pour cent » vient du latin per centum. Les marchands italiens de la Renaissance l'utilisaient déjà pour les intérêts.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: fichePourcentages5e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "La formule",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "p % de N = N x p / 100",
      sousPhrase: "On divise par 100, puis on multiplie par le nombre.",
      encadre: {
        titre: "Cas faciles",
        texte: "50 % = la moitié · 25 % = le quart · 10 % = diviser par 10.",
      },
    },
  },
  {
    titre: "Selon le calcul",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: fichePourcentages5e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Calculer une part",
    section: {
      type: "exemple",
      enonce: "Une classe de 25 élèves, 40 % de demi-pensionnaires.",
      question: "Combien de demi-pensionnaires ?",
      correction: "40 % de 25 = 25 x 40 / 100 = 10 élèves.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Une réduction",
    section: {
      type: "exemple",
      enonce: "Un article coûte 40 euros, avec 10 % de réduction.",
      question: "Réduction, puis prix payé ?",
      correction:
        "Réduction = 40 x 10 / 100 = 4 euros. Prix payé = 40 − 4 = 36 euros.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "Un jean coûte 60 euros, avec 20 % de réduction.",
      question: "Quel est le montant de la réduction ?",
      indice: "réduction = prix x p / 100.",
      correction: "60 x 20 / 100 = 12 euros de réduction.",
    },
  },
];
