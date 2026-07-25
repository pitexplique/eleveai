import Link from "next/link";

// LE PONT VERS LE COACH — règle produit (Frédéric, 24/07) : le journal, les
// rituels, les fiches et les pages SEO sont des PORTES d'entrée, jamais la
// destination. Chaque porte finit par ramener l'élève à l'ENTRAÎNEMENT.
// Pendant « hors machines » du pont de DefisSimulateur (qui, lui, vit sous
// les défis des simulateurs, avec la palette de chaque machine).
//
// Composant serveur-compatible (un simple <Link>) — utilisable partout.
// Toujours caché à l'impression (les fiches et livrets s'impriment).

const TEINTES = {
  indigo: "bg-indigo-600 hover:bg-indigo-700",
  cyan: "bg-cyan-600 hover:bg-cyan-500",
  emerald: "bg-emerald-600 hover:bg-emerald-500",
  sky: "bg-sky-600 hover:bg-sky-700",
} as const;

export default function PontCoach({
  href,
  label,
  accroche = "Tu as compris ? À toi de t'entraîner :",
  teinte = "indigo",
  className = "",
}: {
  href: string;
  label: string;
  accroche?: string;
  teinte?: keyof typeof TEINTES;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm print:hidden ${className}`}
    >
      <p className="text-sm font-bold text-slate-600">{accroche}</p>
      <Link
        href={href}
        className={`mt-3 inline-block rounded-xl px-6 py-3 text-base font-black text-white shadow-sm transition ${TEINTES[teinte]}`}
      >
        {label}
      </Link>
    </div>
  );
}
