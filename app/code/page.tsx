// /code — activer un code d'abonnement (contreparties Ulule, carte cadeau), 08/11/2026.
// noindex : on y arrive par le courriel des contributeurs ou par la carte cadeau.
import type { Metadata } from "next";
import { Suspense } from "react";
import CodeClient from "./CodeClient";

export const metadata: Metadata = {
  title: "Activer mon code",
  description: "Activez le code reçu avec votre contribution ou votre carte cadeau : le suivi famille s'ouvre pour sa durée.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense>
      <CodeClient />
    </Suspense>
  );
}
