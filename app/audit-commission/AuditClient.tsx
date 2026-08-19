"use client";

import { useState } from "react";
import { SIGNATURE, VENDEUR } from "@/lib/legal/editeur";

// Les intermédiaires par métier. C'est la même fuite partout — seul le nom du
// péage change. Garder cette liste courte et vraie : elle sert à choisir vite
// pendant le rendez-vous, pas à impressionner.
const INTERMEDIAIRES = [
  { nom: "Booking / Expedia", taux: 16, metier: "hôtel" },
  { nom: "TheFork / Uber Eats", taux: 22, metier: "restaurant" },
  { nom: "Planity / Treatwell", taux: 12, metier: "coiffure, esthétique" },
  { nom: "Marketplace", taux: 12, metier: "commerce" },
  { nom: "Plateforme de mise en relation", taux: 15, metier: "artisan" },
  { nom: "Billetterie en ligne", taux: 15, metier: "loisirs, activités" },
];

const eur = (n: number) =>
  n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €";

export default function AuditClient() {
  const [entreprise, setEntreprise] = useState("");
  const [date, setDate] = useState("");
  const [constats, setConstats] = useState(["", "", ""]);

  const [intermediaire, setIntermediaire] = useState(INTERMEDIAIRES[0].nom);
  const [ca, setCa] = useState("");
  const [part, setPart] = useState("");
  const [taux, setTaux] = useState("16");
  const [prix, setPrix] = useState("950");

  const nb = (v: string) => {
    const n = parseFloat(v.replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  };

  // La chaîne de calcul, volontairement en trois temps : le dirigeant doit
  // pouvoir la refaire de tête. CA × part × taux = ce qu'il verse.
  const verse = (nb(ca) * nb(part) * nb(taux)) / 10000;
  // ⚠️ 10 % de ce qu'il VERSE — pas 10 points de son chiffre d'affaires. Le
  // chiffre prudent est plus difficile à contester, et il suffit largement.
  const recupere = verse * 0.1;
  const semaines = recupere > 0 ? (nb(prix) * 52) / recupere : 0;
  const complet = verse > 0;

  const majConstat = (i: number, v: string) =>
    setConstats((c) => c.map((x, j) => (j === i ? v : x)));

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 print:bg-white print:p-0">
      <div className="mx-auto max-w-[21cm] rounded-2xl bg-white p-8 shadow-xl print:rounded-none print:p-0 print:shadow-none">
        {/* ── EN-TÊTE ── */}
        <header className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-slate-900 pb-4">
          <div>
            {/* Le titre nomme CE QUI EST MESURÉ, pas la marque de l'outil :
                le document remis au dirigeant doit dire de quoi il parle. */}
            <h1 className="text-2xl font-black leading-none">
              Ce que vous versez aux intermédiaires
            </h1>
            {/* Le nom commercial porte le document, le nom civil l'identifie —
                ce diagnostic est gratuit et n'engage aucun paiement, mais il
                précède un devis : le dirigeant doit retrouver le même vendeur
                sur les deux papiers. */}
            <p className="mt-1.5 text-sm font-black">
              {VENDEUR.nomCommercial}
              <span className="font-semibold text-slate-500">
                {" "}
                · {VENDEUR.denominationEI}
              </span>
              {SIGNATURE.titre && (
                <span className="font-semibold text-slate-500">
                  {" "}
                  · {SIGNATURE.titre}
                </span>
              )}
            </p>
            <p className="text-xs font-semibold italic text-slate-400">
              {SIGNATURE.accroche}
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <label className="font-bold">
              <span className="block text-xs uppercase tracking-wide text-slate-400">
                Entreprise
              </span>
              <input
                value={entreprise}
                onChange={(e) => setEntreprise(e.target.value)}
                className="w-44 border-b border-slate-300 bg-transparent py-1 font-bold outline-none focus:border-slate-900"
              />
            </label>
            <label className="font-bold">
              <span className="block text-xs uppercase tracking-wide text-slate-400">
                Date
              </span>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-24 border-b border-slate-300 bg-transparent py-1 font-bold outline-none focus:border-slate-900"
              />
            </label>
          </div>
        </header>

        {/* ── 1. LES CONSTATS ── */}
        <section className="mt-7">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
            1 · Ce que j&apos;ai constaté
          </h2>
          <ol className="mt-3 space-y-2">
            {constats.map((c, i) => (
              <li key={i} className="flex items-baseline gap-3">
                <span className="text-lg font-black text-slate-300">
                  {i + 1}
                </span>
                <input
                  value={c}
                  onChange={(e) => majConstat(i, e.target.value)}
                  placeholder="un fait vérifiable, pas une opinion"
                  className="flex-1 border-b border-slate-200 bg-transparent py-1.5 text-sm font-semibold outline-none placeholder:font-normal placeholder:italic placeholder:text-slate-300 focus:border-slate-900 print:placeholder:text-transparent"
                />
              </li>
            ))}
          </ol>
        </section>

        {/* ── 2. LE CALCUL ── */}
        <section className="mt-7">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
            2 · Ce que ça coûte
          </h2>

          <div className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-3">
            <label className="text-sm">
              <span className="block text-xs font-bold text-slate-500">
                Intermédiaire
              </span>
              <select
                value={intermediaire}
                onChange={(e) => {
                  setIntermediaire(e.target.value);
                  const t = INTERMEDIAIRES.find(
                    (x) => x.nom === e.target.value
                  )?.taux;
                  if (t) setTaux(String(t));
                }}
                className="mt-0.5 border-b border-slate-300 bg-transparent py-1 text-sm font-bold outline-none focus:border-slate-900"
              >
                {INTERMEDIAIRES.map((x) => (
                  <option key={x.nom} value={x.nom}>
                    {x.nom} — {x.metier}
                  </option>
                ))}
              </select>
            </label>

            {[
              { l: "Chiffre d'affaires annuel", v: ca, set: setCa, u: "€", w: "w-28" },
              { l: "Part qui passe par lui", v: part, set: setPart, u: "%", w: "w-16" },
              { l: "Taux de commission", v: taux, set: setTaux, u: "%", w: "w-16" },
            ].map((f) => (
              <label key={f.l} className="text-sm">
                <span className="block text-xs font-bold text-slate-500">
                  {f.l}
                </span>
                <span className="flex items-baseline gap-1">
                  <input
                    inputMode="decimal"
                    value={f.v}
                    onChange={(e) => f.set(e.target.value)}
                    className={`${f.w} border-b border-slate-300 bg-transparent py-1 text-right text-base font-black outline-none focus:border-slate-900`}
                  />
                  <span className="font-bold text-slate-400">{f.u}</span>
                </span>
              </label>
            ))}
          </div>

          {/* Le résultat. Il n'apparaît qu'une fois les chiffres donnés —
              c'est le moment où le dirigeant voit son propre montant. */}
          <div className="mt-5 rounded-xl border-2 border-slate-900 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-sm font-bold">
                Versé à {intermediaire} chaque année
              </span>
              <span className="text-3xl font-black tabular-nums">
                {complet ? eur(verse) : "—"}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-t border-slate-200 pt-3">
              <span className="text-sm font-bold text-emerald-700">
                En récupérer seulement 10 %
              </span>
              <span className="text-3xl font-black tabular-nums text-emerald-700">
                {complet ? eur(recupere) : "—"}
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold leading-relaxed text-slate-500">
              Calcul : {ca || "CA"} × {part || "part"} % × {taux || "taux"} % =
              ce que vous versez. Le montant du bas en représente le dixième.
              Vous pouvez le refaire de tête.
            </p>
          </div>
        </section>

        {/* ── 3. LA SUITE ── */}
        <section className="mt-7">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
            3 · La suite
          </h2>
          <div className="mt-3 flex flex-wrap items-end gap-5">
            <label className="text-sm">
              <span className="block text-xs font-bold text-slate-500">
                Mission proposée
              </span>
              <span className="flex items-baseline gap-1">
                <input
                  inputMode="decimal"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                  className="w-24 border-b border-slate-300 bg-transparent py-1 text-right text-base font-black outline-none focus:border-slate-900"
                />
                <span className="font-bold text-slate-400">€</span>
              </span>
            </label>
            {complet && semaines > 0 && (
              <p className="text-base font-black">
                Remboursée en{" "}
                <span className="text-emerald-700">
                  {Math.ceil(semaines)} semaines
                </span>
              </p>
            )}
          </div>
        </section>

        {/* ── LA MENTION QUI PROTÈGE ── */}
        <footer className="mt-8 border-t border-slate-200 pt-4">
          <p className="text-xs leading-relaxed text-slate-500">
            Ce diagnostic est gratuit et vous appartient. Les montants sont
            calculés à partir des chiffres que vous m&apos;avez communiqués et
            constituent une estimation, non un engagement de résultat.
          </p>
        </footer>

        {/* Bouton d'impression — masqué à l'impression, évidemment. */}
        <div className="mt-6 print:hidden">
          <button
            onClick={() => window.print()}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-black text-white transition hover:bg-slate-700"
          >
            Imprimer en A4
          </button>
        </div>
      </div>

      {/* A4 propre : marges raisonnables, aucune couleur de fond gaspillée en
          encre, et les champs saisis restent lisibles une fois sur papier. */}
      <style>{`
        @page { size: A4; margin: 14mm; }
        @media print {
          input, select {
            border-bottom-color: #cbd5e1 !important;
            -webkit-appearance: none;
            appearance: none;
          }
        }
      `}</style>
    </main>
  );
}
