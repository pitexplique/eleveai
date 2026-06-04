// components/remerciements/RemerciementsBar.tsx

const elevesRemercies = [
  "Zelie",
  "Elena",
  "Emma",
  "Éléna",
  "Adele",
  "Maëlle",
  "Arthur",
  "Ben",
  "Enzo",
  "Keïla",
  "Tamara",
  "Gaëtan"
];

export default function RemerciementsBar() {
  if (elevesRemercies.length === 0) {
    return null;
  }

  return (
    <section className="w-full border-t border-white/15 bg-slate-950/90 px-4 py-3 text-white backdrop-blur-md">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-semibold leading-relaxed text-white/90 sm:text-sm">
          <span className="font-black text-yellow-300">
            Remerciements :
          </span>{" "}
          {elevesRemercies.join(" · ")}
        </p>

        <p className="mt-1 text-[11px] font-medium text-white/55 sm:text-xs">
          Merci aux élèves testeurs qui aident EleveAI à progresser.
        </p>
      </div>
    </section>
  );
}