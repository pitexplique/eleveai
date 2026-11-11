// /carte-cadeau — la carte cadeau Ti Margo de Noël (11/11/2026) : 20 € = 1 an de suivi famille.
// Le short « carte cadeau » dit « va sur eleveai.fr » : c'est la page à mettre dans sa description.
// Paiement : Wero (numéro choisi par Frédéric, imprimé aussi sur les cartes) ou Ulule quand la campagne ouvre.
// Le code se tape ensuite sur /code. La carte montrée porte un code d'exemple, jamais un vrai.
// ⛔ Aucun lien depuis le coach ni le pied de page (comme /soutenir) : un professeur ne sollicite pas ses élèves.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const PRIX = 20;
const WERO = "+262 262 74 29 58";

export const metadata: Metadata = {
  title: "La carte cadeau Ti Margo",
  description: "Offrez les maths en dessin animé : 20 € pour un an de dessins animés avec Ti Margo et le coach de maths EleveAI.",
  robots: { index: false, follow: false },
};

const ETAPES = [
  { n: "1", titre: `Payez ${PRIX} €`, texte: "Avec l'application Wero, ou sur la campagne Ulule « Ti Margo » dès son ouverture." },
  { n: "2", titre: "Recevez la carte", texte: "Frédéric vous remet la carte, ou vous l'envoie en photo pour l'imprimer. Écrivez « de la part de… » et glissez-la sous le sapin." },
  { n: "3", titre: "L'enfant tape son code", texte: "Sur eleveai.fr/code : un an de dessins animés et de suivi s'ouvre aussitôt. Son défi l'attend !" },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-amber-50 px-4 py-10 text-slate-900 [color-scheme:light]">
      <div className="mx-auto max-w-2xl">
        <p className="text-center text-sm font-black uppercase tracking-wide text-emerald-700">Cadeau de Noël</p>
        <h1 className="mt-2 text-center text-3xl font-black leading-tight sm:text-5xl">Offrez les maths en dessin animé</h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-slate-700">
          Une carte, un code : un enfant a un an de dessins animés avec Ti Margo, et un coach de maths qui suit ses progrès.
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl border-4 border-emerald-900 bg-white shadow-[0_10px_0_rgba(6,78,59,0.2)]">
          <Image src="/carte-cadeau/carte-exemple.webp" alt="La carte cadeau Ti Margo : 1 an offert du suivi famille EleveAI, avec un code à activer sur eleveai.fr/code" width={874} height={620} className="h-auto w-full" priority />
        </div>

        <div className="mt-8 flex flex-col items-center gap-1">
          <span className="rounded-full border-4 border-emerald-900 bg-amber-400 px-10 py-2 text-5xl font-black sm:text-6xl">{PRIX} €</span>
          <span className="text-xl font-black">= 1 an pour un enfant</span>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-3">
          {ETAPES.map((e) => (
            <li key={e.n} className="rounded-2xl bg-white p-5 ring-2 ring-emerald-900/15">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800 text-lg font-black text-white">{e.n}</span>
              <h2 className="mt-3 text-lg font-black">{e.titre}</h2>
              <p className="mt-1 text-sm text-slate-600">{e.texte}</p>
            </li>
          ))}
        </ol>

        <section className="mt-10 rounded-3xl border-4 border-emerald-800 bg-white p-6 text-center">
          <h2 className="text-2xl font-black text-emerald-800">Pour payer</h2>
          <p className="mt-3 text-slate-600">Avec l&apos;application Wero :</p>
          <p className="mt-1 text-3xl font-black tracking-wide text-emerald-900 sm:text-4xl">{WERO}</p>
          <p className="mt-2 text-sm text-slate-500">Indiquez votre nom dans le message, pour que Frédéric vous envoie votre carte.</p>
          <p className="mt-5 text-slate-600">ou sur Ulule, campagne « Ti Margo » (ouverture prochaine).</p>
        </section>

        <p className="mt-8 text-center text-sm text-slate-500">
          Avec 50 cartes, Frédéric peut finir tous les dessins animés pour les élèves. Merci de soutenir le projet !
          <br />
          Les cartes ne sont pas proposées aux élèves de Frédéric ni à leurs familles.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/code" className="rounded-full bg-emerald-800 px-6 py-3 font-black text-white hover:bg-emerald-900">J&apos;ai une carte : activer mon code</Link>
          <Link href="/accueil" className="rounded-full bg-white px-6 py-3 font-black text-emerald-900 ring-2 ring-emerald-900/20 hover:bg-emerald-50">Découvrir le site</Link>
        </div>
      </div>
    </main>
  );
}
