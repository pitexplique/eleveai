"use client";

import { useEffect, useState } from "react";
import {
  EDITEUR,
  SIGNATURE,
  VENDEUR,
  identiteProfessionnelleComplete,
} from "@/lib/legal/editeur";

/* Une ligne de facture. `quantite` reste une chaîne : on tape « 1,5 » avec une
   virgule sur un clavier français, et un input `number` la refuse. */
type Ligne = { designation: string; quantite: string; unitaire: string };

const LIGNE_VIDE: Ligne = { designation: "", quantite: "1", unitaire: "" };

const nombre = (s: string) => parseFloat(s.replace(",", ".")) || 0;

const eur = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
  " €";

const champ =
  "border-b border-slate-300 bg-transparent py-1 outline-none focus:border-slate-900";

export default function FactureClient() {
  const [pro, setPro] = useState(true);
  const [client, setClient] = useState("");
  const [adresseClient, setAdresseClient] = useState("");
  const [numero, setNumero] = useState("");
  const [dateEmission, setDateEmission] = useState("");
  const [datePrestation, setDatePrestation] = useState("");
  const [echeance, setEcheance] = useState("30 jours à compter de l'émission");
  const [reference, setReference] = useState("");
  const [lignes, setLignes] = useState<Ligne[]>([
    { ...LIGNE_VIDE },
    { ...LIGNE_VIDE },
    { ...LIGNE_VIDE },
  ]);

  /* ⚠️ LA DATE SE REMPLIT APRÈS LE MONTAGE, JAMAIS PENDANT LE RENDU. Cette page
     est un composant client, mais Next la rend aussi sur le serveur : une date
     calculée dans le corps du composant donne deux valeurs différentes de part
     et d'autre, et React signale un écart d'hydratation. Ici, le serveur rend
     un champ vide et le navigateur y écrit la date du jour. */
  useEffect(() => {
    setDateEmission(new Date().toLocaleDateString("fr-FR"));
  }, []);

  const majLigne = (i: number, patch: Partial<Ligne>) =>
    setLignes((l) => l.map((x, j) => (j === i ? { ...x, ...patch } : x)));

  const total = lignes.reduce(
    (s, l) => s + nombre(l.quantite) * nombre(l.unitaire),
    0
  );

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 print:bg-white print:p-0">
      <div className="mx-auto max-w-[21cm] rounded-2xl bg-white p-8 shadow-xl print:rounded-none print:p-0 print:shadow-none">
        {/* ⛔ MÊME GARDE-FOU QUE LE DEVIS : une facture sans SIREN n'est pas une
            facture. Message pour Frédéric, jamais imprimé. */}
        {!identiteProfessionnelleComplete && (
          <div className="mb-6 rounded-xl border-2 border-amber-400 bg-amber-50 p-4 print:hidden">
            <p className="text-sm font-black text-amber-900">
              Cette facture n&apos;est pas émissible
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-amber-800">
              Il manque le SIREN et l&apos;adresse de l&apos;entreprise
              individuelle dans{" "}
              <code className="rounded bg-amber-100 px-1">
                lib/legal/editeur.ts
              </code>
              . Une facture sans identification du vendeur ne justifie aucun
              encaissement.
            </p>
          </div>
        )}

        {/* ── QUI EST EN FACE ──
            Ce choix commande les clauses du bas. Il est en haut parce qu'il se
            prend avant d'écrire, pas après. */}
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl bg-slate-100 p-3 print:hidden">
          <span className="text-xs font-black uppercase tracking-wide text-slate-500">
            Facture adressée à
          </span>
          {[
            { valeur: true, texte: "Un professionnel" },
            { valeur: false, texte: "Un particulier" },
          ].map((o) => (
            <button
              key={o.texte}
              onClick={() => setPro(o.valeur)}
              className={`rounded-lg px-3 py-1.5 text-sm font-black transition ${
                pro === o.valeur
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-200"
              }`}
            >
              {o.texte}
            </button>
          ))}
          <span className="text-xs font-semibold text-slate-500">
            {pro
              ? "Pénalités de retard et indemnité de 40 € : obligatoires."
              : "Rétractation de 14 jours rappelée ; aucune pénalité."}
          </span>
        </div>

        {/* ── EN-TÊTE ── */}
        <header className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-slate-900 pb-4">
          <div className="text-sm leading-relaxed">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Facture
            </p>
            <p className="mt-1 text-3xl font-black leading-none">
              {VENDEUR.nomCommercial}
            </p>
            {SIGNATURE.titre && (
              <p className="mt-1 font-semibold text-slate-700">
                {SIGNATURE.titre}
              </p>
            )}
            <p className="text-xs italic text-slate-400">{SIGNATURE.accroche}</p>
            <p className="mt-2 font-bold text-slate-700">
              {VENDEUR.denominationEI}
            </p>
            <p className="text-slate-600">{VENDEUR.forme}</p>
            {VENDEUR.adresse && (
              <p className="text-slate-600">{VENDEUR.adresse}</p>
            )}
            {VENDEUR.siren && (
              <p className="text-slate-600">SIREN {VENDEUR.siren}</p>
            )}
            <p className="text-slate-600">{EDITEUR.contact}</p>
            {VENDEUR.telephone && (
              <p className="text-slate-600">{VENDEUR.telephone}</p>
            )}
          </div>

          <div className="text-sm">
            <label className="block">
              <span className="text-xs uppercase tracking-wide text-slate-400">
                {pro ? "Client (raison sociale)" : "Client"}
              </span>
              <input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className={`${champ} w-56 font-bold`}
              />
            </label>
            <label className="mt-2 block">
              <span className="text-xs uppercase tracking-wide text-slate-400">
                Adresse de facturation
              </span>
              <input
                value={adresseClient}
                onChange={(e) => setAdresseClient(e.target.value)}
                className={`${champ} w-56`}
              />
            </label>
            <div className="mt-2 flex gap-3">
              <label className="block">
                <span className="text-xs uppercase tracking-wide text-slate-400">
                  Facture n°
                </span>
                <input
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="2026-001"
                  className={`${champ} w-24 font-bold`}
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-wide text-slate-400">
                  Émise le
                </span>
                <input
                  value={dateEmission}
                  onChange={(e) => setDateEmission(e.target.value)}
                  className={`${champ} w-24`}
                />
              </label>
            </div>
            <label className="mt-2 block">
              <span className="text-xs uppercase tracking-wide text-slate-400">
                Prestation réalisée le
              </span>
              <input
                value={datePrestation}
                onChange={(e) => setDatePrestation(e.target.value)}
                className={`${champ} w-56`}
              />
            </label>
            {/* Le numéro de bon de commande n'est obligatoire que s'il existe —
                mais un établissement public en émet un, et sa facture reste
                impayée tant qu'il n'y figure pas. */}
            <label className="mt-2 block">
              <span className="text-xs uppercase tracking-wide text-slate-400">
                {pro ? "Bon de commande (le cas échéant)" : "Référence"}
              </span>
              <input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className={`${champ} w-56`}
              />
            </label>
          </div>
        </header>

        {/* ⚠️ LA NUMÉROTATION EST LA MENTION QU'ON RATE. Elle doit être
            chronologique et CONTINUE : pas de trou, pas de retour en arrière,
            pas de numéro réutilisé. Un contrôle regarde d'abord ça — une suite
            trouée laisse penser qu'une facture a été retirée. */}
        <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs font-semibold leading-relaxed text-slate-500 print:hidden">
          Numérotation continue, sans trou : <code>2026-001</code>,{" "}
          <code>2026-002</code>… Une facture annulée n&apos;est jamais effacée —
          elle est remplacée par un avoir qui porte son propre numéro. Reporte
          ensuite la recette encaissée dans ton livre des recettes, obligatoire
          au régime micro.
        </p>

        {/* ── LE DÉTAIL ──
            Désignation, quantité, prix unitaire : les trois colonnes sont
            obligatoires. « Prestation de conseil — 1 200 € » sur une seule
            ligne ne suffit pas. */}
        <section className="mt-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
            Détail de la prestation
          </h2>
          <table className="mt-2 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-xs uppercase tracking-wide text-slate-400">
                <th className="py-1 text-left font-bold">Désignation</th>
                <th className="w-16 py-1 text-right font-bold">Qté</th>
                <th className="w-28 py-1 text-right font-bold">P.U. net</th>
                <th className="w-28 py-1 text-right font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {lignes.map((l, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-1">
                    <input
                      value={l.designation}
                      onChange={(e) =>
                        majLigne(i, { designation: e.target.value })
                      }
                      className="w-full bg-transparent py-1 font-semibold outline-none"
                    />
                  </td>
                  <td className="py-1">
                    <input
                      inputMode="decimal"
                      value={l.quantite}
                      onChange={(e) => majLigne(i, { quantite: e.target.value })}
                      className="w-full bg-transparent py-1 text-right tabular-nums outline-none"
                    />
                  </td>
                  <td className="py-1">
                    <input
                      inputMode="decimal"
                      value={l.unitaire}
                      onChange={(e) => majLigne(i, { unitaire: e.target.value })}
                      className="w-full bg-transparent py-1 text-right tabular-nums outline-none"
                    />
                  </td>
                  <td className="py-1 text-right font-bold tabular-nums">
                    {l.designation || l.unitaire
                      ? eur(nombre(l.quantite) * nombre(l.unitaire))
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setLignes((l) => [...l, { ...LIGNE_VIDE }])}
            className="mt-2 text-xs font-black text-slate-500 underline print:hidden"
          >
            + une ligne
          </button>
        </section>

        {/* ── LE TOTAL ── */}
        <section className="mt-6 rounded-xl border-2 border-slate-900 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-sm font-bold">Total à payer</span>
            <span className="text-3xl font-black tabular-nums">
              {eur(total)}
            </span>
          </div>
          {/* ⚠️ EN FRANCHISE EN BASE, PAS DE LIGNE « TVA 20 % » NI DE TOTAL TTC
              DISTINCT : il n'y a qu'un montant, et cette mention à côté. */}
          <p className="mt-2 text-xs font-bold text-slate-500">
            {VENDEUR.mentionTva} — le montant indiqué est net de taxe.
          </p>
          <p className="mt-1 flex flex-wrap items-baseline gap-1 text-xs font-semibold text-slate-500">
            <span>Échéance de règlement :</span>
            <input
              value={echeance}
              onChange={(e) => setEcheance(e.target.value)}
              className={`${champ} w-64 text-xs font-semibold`}
            />
          </p>
        </section>

        {/* ── LES MENTIONS ──
            Ce bloc change entièrement selon l'interlocuteur. */}
        <section className="mt-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
            Mentions
          </h2>
          <ol className="mt-2 space-y-2 text-xs leading-relaxed text-slate-700">
            {pro ? (
              <>
                <li>
                  {/* Art. L441-10 du code de commerce. Obligatoire, et son
                      absence est sanctionnée — pas seulement inopposable. */}
                  <strong>Retard de paiement.</strong> Toute somme non réglée à
                  l&apos;échéance porte intérêt au taux de la Banque centrale
                  européenne majoré de 10 points, exigible sans rappel
                  préalable.
                </li>
                <li>
                  <strong>Indemnité de recouvrement.</strong> Tout retard donne
                  lieu à une indemnité forfaitaire pour frais de recouvrement de
                  40 €, sans préjudice d&apos;une indemnisation complémentaire
                  si les frais exposés sont supérieurs.
                </li>
                <li>
                  {/* Mention obligatoire : dire qu'il n'y en a pas EST la
                      mention. L'omettre est l'oubli le plus fréquent. */}
                  <strong>Escompte.</strong> Aucun escompte n&apos;est accordé
                  pour paiement anticipé.
                </li>
              </>
            ) : (
              <>
                <li>
                  {/* Cette ligne n'est pas une faveur : c'est l'article 9 des
                      CGV, plus favorable que la loi, et il engage. */}
                  <strong>Rétractation.</strong> Le Client dispose de quatorze
                  jours à compter de la commande pour se rétracter, sans motif à
                  donner. L&apos;intégralité des sommes versées lui est alors
                  remboursée, y compris s&apos;il s&apos;est déjà servi du
                  Service — voir l&apos;article 9 des conditions générales de
                  vente.
                </li>
                <li>
                  <strong>Réclamation.</strong> Toute demande peut être adressée
                  à {EDITEUR.contact}. Les conditions générales de vente sont
                  consultables sur www.eleveai.fr/cgv.
                </li>
              </>
            )}
          </ol>
        </section>

        {/* ⚠️ PAS DE CASE SIGNATURE. Un devis se signe « bon pour accord », une
            facture ne se signe pas : elle constate, elle ne négocie plus. */}

        <div className="mt-6 print:hidden">
          <button
            onClick={() => window.print()}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-black text-white transition hover:bg-slate-700"
          >
            Imprimer en A4
          </button>
        </div>
      </div>

      <style>{`
        @page { size: A4; margin: 14mm; }
        @media print {
          input, select, textarea {
            border-color: #cbd5e1 !important;
            -webkit-appearance: none;
            appearance: none;
          }
        }
      `}</style>
    </main>
  );
}
