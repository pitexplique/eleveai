import Link from "next/link";

// ⭐ 24/11/2026 — Frédéric : un lien bien visible vers le hub /simulateurs,
// dans le Cockpit ET dans le Jardin. Une phrase courte, un gros bouton.
export default function CarteSimulateurs({ variante }: { variante: "cockpit" | "jardin" }) {
  const cockpit = variante === "cockpit";
  return (
    <Link
      href="/simulateurs"
      className={`mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-5 shadow-lg transition hover:-translate-y-0.5 ${
        cockpit
          ? "border border-slate-800 bg-slate-950 text-white hover:border-slate-600"
          : "bg-gradient-to-r from-lime-100 to-emerald-100 text-emerald-950 ring-1 ring-emerald-900/10"
      }`}
    >
      <span>
        <span className="block text-xl font-black">🧪 Simulateurs</span>
        <span className={`mt-1 block text-sm font-semibold ${cockpit ? "text-slate-300" : "text-emerald-800"}`}>
          Fais bouger les maths et la physique : tu touches, tu vois, tu comprends.
        </span>
      </span>
      <span
        className={`shrink-0 rounded-xl px-4 py-2 text-sm font-black ${
          cockpit ? "bg-white text-slate-950" : "bg-emerald-600 text-white"
        }`}
      >
        Essayer →
      </span>
    </Link>
  );
}
