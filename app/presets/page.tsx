// app/presets/page.tsx
import PresetsClient from "./PresetsClient";

export default function PresetsPage() {
  return (
    <>
      {/* ✅ TEXTE SEO – rendu côté serveur */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 py-8 space-y-3">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Presets pédagogiques IA pour enseignants
          </h1>

          <p className="text-slate-700">
            Un <strong>preset pédagogique</strong> EleveAI est un{" "}
            <strong>prompt IA guidé</strong> : une consigne structurée,
            prête à l’emploi, conçue pour la classe (collège & lycée),
            conforme aux programmes officiels.
          </p>

          <p className="text-sm text-slate-600">
            Les presets EleveAI encadrent l’usage de l’intelligence artificielle :
            ils guident la réflexion dsans jamais faire à sa place.
          </p>

          <ul className="text-sm text-slate-700 list-disc pl-5">
            <li>Presets pédagogiques par classe (6e à Terminale)</li>
            <li>Presets pédagogiques par matière</li>
            <li>Différenciation : basique, standard, remédiation, expert, ULIS</li>
          </ul>
        </div>
      </section>

      {/* UI interactive */}
      <PresetsClient />
    </>
  );
}
