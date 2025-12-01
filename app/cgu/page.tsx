import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d’utilisation | EleveAI",
  description:
    "Conditions générales d’utilisation de la plateforme EleveAI pour élèves, professeurs et établissements.",
};

export default function CguPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-100">
      <h1 className="mb-6 text-2xl font-semibold">
        Conditions générales d’utilisation (CGU)
      </h1>


      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          1. Objet des CGU
        </h2>
        <p>
          Les présentes Conditions générales d’utilisation définissent les
          modalités d’accès et d’utilisation de la plateforme EleveAI par les
          élèves, professeurs, équipes pédagogiques et tout autre utilisateur.
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          2. Acceptation des conditions
        </h2>
        <p>
          L’accès à EleveAI implique l’acceptation pleine et entière des
          présentes CGU. En cas de désaccord, l’utilisateur doit cesser
          d’utiliser la plateforme.
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          3. Comptes et accès
        </h2>
        <p>
          Certains services d’EleveAI nécessitent la création d’un compte (élève,
          professeur, établissement…). L’utilisateur est responsable de la
          confidentialité de ses identifiants.
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          4. Usage de l’IA et des contenus générés
        </h2>
        <p>
          Les contenus générés par l’IA sont des aides pédagogiques. Ils
          doivent être relus et validés par un adulte ou un professionnel de
          l’éducation avant utilisation en classe ou diffusion.
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          5. Comportement des utilisateurs
        </h2>
        <p>
          L’utilisateur s’engage à ne pas utiliser EleveAI pour produire ou
          partager des contenus illicites, discriminants, violents ou contraires
          aux valeurs de l’Éducation nationale.
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          6. Suspension ou suppression de compte
        </h2>
        <p>
          En cas de non-respect des CGU, EleveAI se réserve la possibilité de
          suspendre ou de supprimer l’accès d’un utilisateur.
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          7. Évolution des CGU
        </h2>
        <p>
          Les présentes CGU peuvent être modifiées à tout moment. La version en
          vigueur est celle qui est publiée sur cette page.
        </p>
      </section>
    </main>
  );
}
