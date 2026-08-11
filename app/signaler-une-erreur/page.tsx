// /signaler-une-erreur — le geste que la table `signalements` attendait.
//
// Le menu proposait « Signaler une erreur » et envoyait vers /contact : un
// formulaire général qui ne garde ni la question, ni la notion, ni la ressource
// visée. Sans ce contexte, « ça marche pas » est inexploitable ; avec, on rejoue
// la scène. La table et la route existaient depuis des mois sans qu'aucun
// bouton ne les appelle — c'est ce trou-là que cette page bouche.
//
// Ouverte à tout le monde, connecté ou non : ceux qui arrivent par Google
// voient les choses qui coincent en premier, et ce sont eux qui n'ont pas de
// compte. Les points, eux, ne vont qu'aux comptes — et seulement quand le
// signalement est RETENU (cf. app/api/signalements/route.ts).

import type { Metadata } from "next";
import { Suspense } from "react";
import FormulaireSignalement from "./FormulaireSignalement";

const SITE_URL = "https://www.eleveai.fr";

export const metadata: Metadata = {
  // Le layout ajoute déjà « — EleveAI ».
  title: "Signaler une erreur",
  description:
    "Une réponse fausse, un énoncé incompréhensible, un exercice hors programme : dites-le ici. Chaque signalement est lu, et les corrections partent en ligne.",
  alternates: { canonical: `${SITE_URL}/signaler-une-erreur` },
  robots: { index: false, follow: true },
};

export default function SignalerUneErreurPage() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#041B33] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <header>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">
            Signaler une erreur
          </h1>
          <p className="mt-3 text-base font-semibold text-white/75">
            Une réponse qui ne tombe pas juste, un énoncé qu’on ne comprend pas,
            un exercice qui n’est pas au programme. Dites-le : c’est lu, et ce
            qui est retenu part en correction.
          </p>
          <p className="mt-2 text-sm font-semibold text-white/55">
            Pas besoin de compte. Pas besoin d’être sûr non plus — mieux vaut un
            signalement pour rien qu’une faute qui reste en ligne toute l’année.
          </p>
        </header>

        <div className="mt-8">
          {/* useSearchParams impose une frontière Suspense au prérendu. */}
          <Suspense
            fallback={<p className="text-sm font-semibold text-white/50">Chargement…</p>}
          >
            <FormulaireSignalement />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
