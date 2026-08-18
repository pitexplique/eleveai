"use client";

import { useState } from "react";
import {
  EDITEUR,
  SIGNATURE,
  VENDEUR,
  identiteProfessionnelleComplete,
} from "@/lib/legal/editeur";

// LES TROIS MÉTIERS — Conseil · Réalisation · Formation.
// C'est le triptyque que Frédéric utilisait déjà comme statisticien en
// industrie. Il n'a pas été inventé aujourd'hui, il a été retrouvé.
//
// `inclus` / `exclus` sont là parce que le périmètre est la seule protection
// réelle d'un prestataire. Une mission sans « ce qui n'est pas compris » se
// termine toujours par trois demandes gratuites.
const MISSIONS = [
  {
    famille: "Conseil",
    nom: "Mise à plat chiffrée",
    prix: 1200,
    duree: "2 séances",
    inclus:
      "Relevé de vos indicateurs, calcul de ce que vous versez aux intermédiaires, trois objectifs mesurables pour les douze mois.",
    exclus:
      "La mise en œuvre des objectifs, qui fait l'objet d'une mission distincte.",
  },
  {
    famille: "Conseil",
    nom: "Audit et demi-journée de correction",
    prix: 950,
    duree: "3 h 30, ou 3 séances d'1 h",
    inclus:
      "Analyse préalable, puis correction faite ensemble sur vos propres pages.",
    exclus: "Les corrections postérieures à la séance.",
  },
  {
    famille: "Réalisation",
    nom: "Page dédiée (séminaire, coworking…)",
    prix: 1500,
    duree: "3 semaines",
    inclus:
      "Rédaction, mise en ligne sur votre site existant, fiche Google Business, et le relevé des demandes reçues avant et après.",
    exclus: "L'hébergement, les photographies professionnelles, la publicité.",
  },
  {
    famille: "Réalisation",
    nom: "Offre semaine complète",
    prix: 2500,
    duree: "6 semaines",
    inclus:
      "Deux pages dédiées, fiche Google Business, grille tarifaire, et les indicateurs pour mesurer si ça marche.",
    exclus: "L'hébergement, les photographies professionnelles, la publicité.",
  },
  {
    famille: "Formation",
    nom: "Demi-journée, 3 à 6 personnes",
    prix: 950,
    duree: "3 h 30",
    inclus: "Sur vos propres outils, avec vos propres cas.",
    exclus: "Les supports imprimés, la location de salle.",
  },
  {
    famille: "Formation",
    nom: "Journée, 6 à 10 personnes",
    prix: 1600,
    duree: "7 h",
    inclus: "Sur vos propres outils, avec vos propres cas.",
    exclus: "Les supports imprimés, la location de salle.",
  },
  {
    famille: "Formation",
    nom: "Accompagnement mensuel",
    prix: 450,
    duree: "4 h par mois",
    inclus:
      "Une séance mensuelle fixée à l'avance, et la tenue de votre tableau de bord.",
    exclus:
      "Toute intervention hors séance : le prestataire n'est pas d'astreinte.",
  },
];

const eur = (n: number) =>
  n.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €";

const champ =
  "border-b border-slate-300 bg-transparent py-1 outline-none focus:border-slate-900";

export default function DevisClient() {
  const [client, setClient] = useState("");
  const [adresseClient, setAdresseClient] = useState("");
  const [numero, setNumero] = useState("");
  const [date, setDate] = useState("");
  const [choix, setChoix] = useState(MISSIONS[0].nom);
  const [prix, setPrix] = useState(String(MISSIONS[0].prix));
  const [inclus, setInclus] = useState(MISSIONS[0].inclus);
  const [exclus, setExclus] = useState(MISSIONS[0].exclus);
  const [duree, setDuree] = useState(MISSIONS[0].duree);

  const choisir = (nom: string) => {
    const m = MISSIONS.find((x) => x.nom === nom);
    if (!m) return;
    setChoix(nom);
    setPrix(String(m.prix));
    setInclus(m.inclus);
    setExclus(m.exclus);
    setDuree(m.duree);
  };

  const montant = parseFloat(prix.replace(",", ".")) || 0;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 print:bg-white print:p-0">
      <div className="mx-auto max-w-[21cm] rounded-2xl bg-white p-8 shadow-xl print:rounded-none print:p-0 print:shadow-none">
        {/* ⛔ TANT QUE L'IDENTITÉ N'EST PAS COMPLÈTE, on ne fait pas semblant.
            Un devis à un professionnel doit porter le SIREN de celui qui
            l'émet. On l'affiche à l'écran, jamais à l'impression : c'est un
            message pour Frédéric, pas pour son client. */}
        {!identiteProfessionnelleComplete && (
          <div className="mb-6 rounded-xl border-2 border-amber-400 bg-amber-50 p-4 print:hidden">
            <p className="text-sm font-black text-amber-900">
              Ce devis n&apos;est pas encore émissible
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-amber-800">
              Il manque le SIREN et l&apos;adresse de l&apos;entreprise
              individuelle dans{" "}
              <code className="rounded bg-amber-100 px-1">
                lib/legal/editeur.ts
              </code>
              . Un devis adressé à un professionnel doit les porter. Tu peux
              t&apos;en servir pour préparer l&apos;entretien — pas pour
              l&apos;envoyer.
            </p>
          </div>
        )}

        {/* ── EN-TÊTE ── */}
        <header className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-slate-900 pb-4">
          <div className="text-sm leading-relaxed">
            <p className="text-2xl font-black leading-none">Devis</p>
            <p className="mt-2 font-bold">{VENDEUR.nomJuridique}</p>
            {SIGNATURE.titre && (
              <p className="font-semibold text-slate-700">{SIGNATURE.titre}</p>
            )}
            <p className="text-xs italic text-slate-400">
              {SIGNATURE.accroche}
            </p>
            {/* ⚠️ La forme juridique reste, sous le titre et non à sa place :
                « Coach IA » est une accroche, pas une identification de
                vendeur. Un devis doit porter le nom juridique et la forme. */}
            <p className="mt-1.5 text-slate-600">
              {VENDEUR.forme} · {VENDEUR.nomCommercial}
            </p>
            {VENDEUR.adresse && <p className="text-slate-600">{VENDEUR.adresse}</p>}
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
                Client
              </span>
              <input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className={`${champ} w-52 font-bold`}
              />
            </label>
            <label className="mt-2 block">
              <span className="text-xs uppercase tracking-wide text-slate-400">
                Adresse
              </span>
              <input
                value={adresseClient}
                onChange={(e) => setAdresseClient(e.target.value)}
                className={`${champ} w-52`}
              />
            </label>
            <div className="mt-2 flex gap-3">
              <label className="block">
                <span className="text-xs uppercase tracking-wide text-slate-400">
                  N°
                </span>
                <input
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className={`${champ} w-20`}
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-wide text-slate-400">
                  Date
                </span>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`${champ} w-24`}
                />
              </label>
            </div>
          </div>
        </header>

        {/* ── LA MISSION ── */}
        <section className="mt-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
            Objet de la mission
          </h2>
          <select
            value={choix}
            onChange={(e) => choisir(e.target.value)}
            className="mt-2 w-full border-b border-slate-300 bg-transparent py-1.5 text-lg font-black outline-none focus:border-slate-900 print:appearance-none"
          >
            {MISSIONS.map((m) => (
              <option key={m.nom} value={m.nom}>
                {m.famille} — {m.nom}
              </option>
            ))}
          </select>

          <div className="mt-4 space-y-3 text-sm">
            <div>
              <span className="text-xs font-black uppercase tracking-wide text-slate-400">
                Durée
              </span>
              <input
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
                className={`${champ} ml-2 w-64 font-semibold`}
              />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                Ce qui est compris
              </p>
              <textarea
                value={inclus}
                onChange={(e) => setInclus(e.target.value)}
                rows={2}
                className="mt-1 w-full resize-none rounded-lg border border-slate-200 p-2 text-sm font-semibold leading-relaxed outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                Ce qui n&apos;est pas compris
              </p>
              <textarea
                value={exclus}
                onChange={(e) => setExclus(e.target.value)}
                rows={2}
                className="mt-1 w-full resize-none rounded-lg border border-slate-200 p-2 text-sm font-semibold leading-relaxed outline-none focus:border-slate-900"
              />
            </div>
          </div>
        </section>

        {/* ── LE PRIX ── */}
        <section className="mt-6 rounded-xl border-2 border-slate-900 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-sm font-bold">Montant total</span>
            <span className="flex items-baseline gap-1">
              <input
                inputMode="decimal"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
                className="w-32 border-b border-slate-300 bg-transparent py-1 text-right text-3xl font-black tabular-nums outline-none focus:border-slate-900"
              />
              <span className="text-xl font-black">€</span>
            </span>
          </div>
          <p className="mt-2 text-xs font-bold text-slate-500">
            {VENDEUR.mentionTva} — le montant indiqué est net de taxe.
          </p>
          {montant > 0 && (
            <p className="mt-1 text-xs font-semibold text-slate-500">
              Soit {eur(montant)} à régler sous 30 jours à compter de
              l&apos;émission de la facture.
            </p>
          )}
        </section>

        {/* ── LES CLAUSES ── */}
        <section className="mt-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
            Conditions
          </h2>
          <ol className="mt-2 space-y-2 text-xs leading-relaxed text-slate-700">
            <li>
              <strong>Confidentialité réciproque.</strong> Chaque partie
              s&apos;engage à ne pas divulguer ni réutiliser les informations
              commerciales, financières ou techniques dont elle a connaissance
              à l&apos;occasion de la mission.
            </li>
            <li>
              {/* Sans cette clause, Frédéric s'interdit sa propre page de
                  référence — et il ne peut plus rien montrer au client suivant. */}
              <strong>Référence anonyme.</strong> Le prestataire est autorisé à
              mentionner la mission sous une forme anonymisée (secteur et
              commune, sans dénomination ni chiffres identifiants). La citation
              du nom du client suppose son accord écrit distinct.
            </li>
            <li>
              <strong>Obligation de moyens.</strong> Le prestataire s&apos;engage
              à mettre en œuvre les diligences nécessaires. Les estimations
              chiffrées communiquées reposent sur les données fournies par le
              client et ne constituent pas un engagement de résultat.
            </li>
            <li>
              {/* Mention obligatoire entre professionnels (art. L441-10 du code
                  de commerce). Presque tous les indépendants l'oublient. */}
              <strong>Retard de paiement.</strong> Toute somme non réglée à
              l&apos;échéance porte intérêt au taux de la Banque centrale
              européenne majoré de 10 points, et donne lieu à une indemnité
              forfaitaire de recouvrement de 40 €.
            </li>
            <li>
              <strong>Validité.</strong> Le présent devis est gratuit et valable
              trente jours à compter de sa date d&apos;émission.
            </li>
          </ol>
        </section>

        {/* ── SIGNATURE ── */}
        <section className="mt-8 flex flex-wrap gap-8 border-t border-slate-200 pt-5 text-xs">
          <div className="min-w-[7rem] flex-1">
            <p className="font-black">Le prestataire</p>
            <p className="mt-1 text-slate-500">{VENDEUR.nomJuridique}</p>
            <div className="mt-10 border-t border-slate-300" />
          </div>
          <div className="min-w-[7rem] flex-1">
            <p className="font-black">Le client</p>
            <p className="mt-1 text-slate-500">
              Précédé de la mention « Bon pour accord »
            </p>
            <div className="mt-10 border-t border-slate-300" />
          </div>
        </section>

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
          textarea { overflow: visible; }
        }
      `}</style>
    </main>
  );
}
