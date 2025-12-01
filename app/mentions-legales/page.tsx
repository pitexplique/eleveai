import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | EleveAI",
  description:
    "Mentions légales de la plateforme EleveAI, IA au service des élèves, professeurs et établissements.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-100">
      <h1 className="mb-6 text-2xl font-semibold">Mentions légales</h1>

      <p className="mb-4 text-sm text-slate-400">
        Ces informations sont fournies à titre indicatif. Merci de vérifier
        leur conformité avec un professionnel du droit avant mise en ligne
        définitive.
      </p>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          1. Éditeur du site
        </h2>
        <p>
          Nom / Raison sociale : <span className="font-medium">EleveAI</span>
        </p>
        <p>
          Statut juridique : <span className="italic">À compléter</span>
        </p>
        <p>
          Siège social : <span className="italic">À compléter</span>
        </p>
        <p>
          Responsable de la publication :{" "}
          <span className="italic">À compléter</span>
        </p>
        <p>
          Contact :{" "}
          <span className="italic">adresse e-mail / téléphone à compléter</span>
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          2. Hébergeur du site
        </h2>
        <p>Hébergeur : Vercel Inc.</p>
        <p>
          Site web :{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="text-sky-300 underline"
          >
            vercel.com
          </a>
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          3. Propriété intellectuelle
        </h2>
        <p>
          Le contenu du site EleveAI (textes, vidéos, visuels, logo, éléments
          graphiques…) est protégé par le droit d’auteur. Toute reproduction,
          diffusion ou modification sans autorisation préalable est interdite.
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          4. Limitation de responsabilité
        </h2>
        <p>
          EleveAI met tout en œuvre pour fournir des informations fiables et
          à jour, mais ne peut garantir l’absence totale d’erreurs ou
          d’omissions. L’utilisation des contenus générés par l’IA reste sous
          la responsabilité des utilisateurs (élèves, professeurs,
          établissements…).
        </p>
      </section>
    </main>
  );
}
