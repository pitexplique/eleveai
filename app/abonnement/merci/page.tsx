import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Merci", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <main className="min-h-screen bg-white px-4 py-16 text-center text-slate-900 [color-scheme:light]">
      <h1 className="text-3xl font-black sm:text-4xl">Merci, et bienvenue !</h1>
      <p className="mx-auto mt-4 max-w-xl text-slate-600">
        Votre paiement est reçu et votre facture part par courriel. L&apos;accès s&apos;ouvre dans quelques secondes.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/video" className="rounded-full bg-sky-700 px-6 py-3 font-black text-white hover:bg-sky-800">Ouvrir la vidéothèque</Link>
        <Link href="/dashboard/abonnement" className="rounded-full px-6 py-3 font-black text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50">Mon abonnement</Link>
      </div>
    </main>
  );
}
