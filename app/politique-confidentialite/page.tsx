import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | EleveAI",
  description:
    "Politique de confidentialité d’EleveAI concernant les données des élèves, professeurs et établissements.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-100">
      <h1 className="mb-6 text-2xl font-semibold">
        Politique de confidentialité
      </h1>

      <p className="mb-4 text-sm text-slate-400">
        Modèle de politique de confidentialité à adapter avec un juriste, en
        fonction de votre utilisation réelle des données et des exigences RGPD.
      </p>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          1. Responsable du traitement
        </h2>
        <p>
          Le responsable du traitement des données personnelles collectées sur
          la plateforme EleveAI est :{" "}
          <span className="italic">Nom de la structure à compléter</span>.
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          2. Données collectées
        </h2>
        <p>
          Selon les fonctionnalités utilisées, EleveAI peut collecter notamment
          :
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Nom et prénom</li>
          <li>Adresse e-mail</li>
          <li>Niveau de classe, établissement</li>
          <li>Données d’usage de la plateforme (logs, préférences…)</li>
        </ul>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          3. Finalités du traitement
        </h2>
        <p>Les données sont utilisées notamment pour :</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Permettre l’accès à la plateforme EleveAI</li>
          <li>Adapter les contenus pédagogiques aux utilisateurs</li>
          <li>Améliorer le service et la qualité des prompts</li>
          <li>Assurer la sécurité du site et des comptes</li>
        </ul>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          4. Durée de conservation
        </h2>
        <p>
          Les données sont conservées pendant une durée limitée et adaptée aux
          finalités du traitement (par exemple : durée de l’année scolaire +
          archivage légal). À compléter avec vos règles internes.
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          5. Droits des utilisateurs
        </h2>
        <p>
          Conformément au RGPD, les utilisateurs disposent d’un droit d’accès,
          de rectification, d’effacement, d’opposition et de limitation du
          traitement de leurs données.
        </p>
        <p>
          Pour exercer ces droits :{" "}
          <span className="italic">adresse e-mail de contact à compléter</span>.
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          6. Sous-traitants et hébergement
        </h2>
        <p>
          Certaines données peuvent être hébergées ou traitées par des
          prestataires techniques (hébergeur, fournisseur d’API IA…). La liste
          complète des sous-traitants doit être documentée et mise à jour.
        </p>
      </section>
    </main>
  );
}
