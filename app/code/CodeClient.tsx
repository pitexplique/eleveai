// app/code/CodeClient.tsx — saisir son code, se connecter, ouvrir l'accès (08/11/2026).
"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { JETON_ESSAI, libelleDuree, type TypeCode } from "@/lib/codes-abonnement";

type Verification =
  | { etat: "valide" | "utilise"; code: string; duree_mois: number; type: TypeCode; nb_eleves: number | null; essai?: boolean }
  | { etat: "inconnu"; code: string; essai?: boolean }
  | { etat: "forme" | "trop" | "panne"; message: string };

type Activation = {
  resultat: "inconnu" | "deja_utilise" | "deja_utilise_par_vous" | "abonnement_mensuel" | "classe" | "ouvert" | "connexion" | "trop" | "panne";
  duree_mois?: number;
  type?: TypeCode;
  nb_eleves?: number | null;
  acces_jusquau?: string;
};

const dateLongue = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "";

function ceQueDonne(v: { duree_mois: number; type: TypeCode; nb_eleves: number | null }) {
  const d = libelleDuree(v.duree_mois);
  if (v.type === "classe") return `une licence classe pour ${v.nb_eleves} élèves, pendant ${d}`;
  return `${d} de suivi famille${v.type === "cadeau" ? (v.duree_mois > 1 && v.duree_mois !== 12 ? " offerts" : " offert") : ""}`;
}

export default function CodeClient() {
  const params = useSearchParams();
  const supabase = useMemo(() => createClient(), []);
  const [saisie, setSaisie] = useState("");
  const [verif, setVerif] = useState<Verification | null>(null);
  const [activation, setActivation] = useState<Activation | null>(null);
  const [compte, setCompte] = useState<{ email: string; jeton: string } | null>(null);
  const [occupe, setOccupe] = useState(false);

  // Le compte connecté, s'il y en a un.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session;
      if (s) setCompte({ email: s.user.email ?? "", jeton: s.access_token });
    });
  }, [supabase]);

  const verifier = useCallback(async (texte: string) => {
    setOccupe(true);
    setActivation(null);
    try {
      const r = await fetch("/api/code/verifier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: texte }),
      });
      const v = (await r.json()) as Verification;
      setVerif(v);
      if ("code" in v) setSaisie(v.code);
      if ("essai" in v && v.essai) setCompte((c) => c ?? { email: "essai@eleveai.test", jeton: JETON_ESSAI });
    } catch {
      setVerif({ etat: "panne", message: "Pas de réseau ? Réessayez dans un instant." });
    } finally {
      setOccupe(false);
    }
  }, []);

  // ?c=MARGO-… : le lien du courriel, ou le retour de la connexion.
  useEffect(() => {
    const c = params.get("c");
    if (c) {
      setSaisie(c);
      verifier(c);
    }
  }, [params, verifier]);

  async function activer() {
    if (!compte || !verif || verif.etat !== "valide") return;
    setOccupe(true);
    try {
      const r = await fetch("/api/code/activer", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${compte.jeton}` },
        body: JSON.stringify({ code: verif.code }),
      });
      setActivation((await r.json()) as Activation);
    } catch {
      setActivation({ resultat: "panne" });
    } finally {
      setOccupe(false);
    }
  }

  function envoyer(e: FormEvent) {
    e.preventDefault();
    if (saisie.trim()) verifier(saisie);
  }

  const retour = verif && "code" in verif ? `/code?c=${verif.code}` : "/code";
  const lienConnexion = `/auth/signin?next=${encodeURIComponent(retour)}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-4 py-10 text-slate-900 [color-scheme:light]">
      <div className="mx-auto max-w-xl">
        <div className="flex items-end gap-4">
          <Image src="/cahier-vacances/ti-margo.png" alt="Ti Margo" width={96} height={120} className="h-28 w-auto" priority />
          <div>
            <h1 className="text-3xl font-black leading-tight">Activer mon code</h1>
            <p className="mt-1 text-slate-600">Le code reçu avec votre contribution Ulule, ou sur une carte cadeau.</p>
          </div>
        </div>

        {/* 1. Le code */}
        <form onSubmit={envoyer} className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <label htmlFor="code" className="block font-bold">Votre code</label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="code"
              value={saisie}
              onChange={(e) => {
                setSaisie(e.target.value);
                setVerif(null);
                setActivation(null);
              }}
              placeholder="MARGO-7KQ4-X2PD"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              className="min-w-0 flex-1 rounded-xl px-4 py-3 font-mono text-xl uppercase tracking-wider ring-1 ring-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="submit"
              disabled={occupe || !saisie.trim()}
              className="rounded-xl bg-emerald-700 px-6 py-3 font-black text-white hover:bg-emerald-800 disabled:opacity-50"
            >
              Vérifier
            </button>
          </div>
          <p className="mt-2 text-sm text-slate-500">Majuscules ou minuscules, avec ou sans tirets : peu importe.</p>
        </form>

        {/* 2. Ce que dit le code */}
        {verif && !activation && (
          <section aria-live="polite" className="mt-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            {verif.etat === "valide" && (
              <>
                <p className="text-xl font-black text-emerald-800">Ce code est valable.</p>
                <p className="mt-1 text-lg">Il vous donne {ceQueDonne(verif)}.</p>
                {compte ? (
                  <>
                    <p className="mt-4 text-slate-600">
                      Il sera activé sur le compte <strong>{compte.email}</strong>.
                      {verif.essai && " (essai local : compte fictif)"}
                    </p>
                    <button
                      type="button"
                      onClick={activer}
                      disabled={occupe}
                      className="mt-3 rounded-full bg-emerald-700 px-6 py-3 font-black text-white hover:bg-emerald-800 disabled:opacity-50"
                    >
                      Activer mon code
                    </button>
                    {!verif.essai && (
                      <p className="mt-3 text-sm text-slate-500">
                        Pas le bon compte ?{" "}
                        <button
                          type="button"
                          className="underline"
                          onClick={async () => {
                            await supabase.auth.signOut();
                            setCompte(null);
                          }}
                        >
                          Changer de compte
                        </button>
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="mt-4 text-slate-600">
                      Le suivi s&apos;ouvre sur un compte famille : connectez-vous, ou créez-le avec votre adresse
                      électronique. Vous revenez ici ensuite, le code est gardé.
                    </p>
                    <Link
                      href={lienConnexion}
                      className="mt-3 inline-flex rounded-full bg-emerald-700 px-6 py-3 font-black text-white hover:bg-emerald-800"
                    >
                      Me connecter ou créer mon compte
                    </Link>
                  </>
                )}
              </>
            )}
            {verif.etat === "utilise" && (
              <>
                <p className="text-xl font-black text-rose-700">Ce code a déjà été utilisé.</p>
                <p className="mt-1">
                  Un code ne sert qu&apos;une fois. Si vous l&apos;avez déjà activé, votre accès est ouvert :{" "}
                  <Link href="/dashboard/abonnement" className="font-bold underline">Mon abonnement</Link>. Sinon,{" "}
                  <Link href="/contact" className="font-bold underline">écrivez-nous</Link> avec ce code.
                </p>
              </>
            )}
            {verif.etat === "inconnu" && (
              <>
                <p className="text-xl font-black text-rose-700">Ce code n&apos;existe pas.</p>
                <p className="mt-1">
                  Vérifiez chaque signe sur votre carte ou votre courriel. Si le code est bien recopié,{" "}
                  <Link href="/contact" className="font-bold underline">écrivez-nous</Link>.
                </p>
              </>
            )}
            {(verif.etat === "forme" || verif.etat === "trop" || verif.etat === "panne") && (
              <p className="font-bold text-rose-700">{verif.message}</p>
            )}
          </section>
        )}

        {/* 3. Après l'activation */}
        {activation && (
          <section aria-live="polite" className="mt-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            {activation.resultat === "ouvert" && (
              <>
                <p className="text-2xl font-black text-emerald-800">C&apos;est ouvert !</p>
                <p className="mt-1 text-lg">
                  Le suivi famille est à vous jusqu&apos;au <strong>{dateLongue(activation.acces_jusquau)}</strong>, sans
                  prélèvement ni reconduction.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/suivi" className="rounded-full bg-emerald-700 px-6 py-3 font-black text-white hover:bg-emerald-800">
                    Suivre mon enfant
                  </Link>
                  <Link href="/dashboard/abonnement" className="rounded-full px-6 py-3 font-black ring-1 ring-slate-300 hover:bg-slate-50">
                    Mon abonnement
                  </Link>
                </div>
              </>
            )}
            {activation.resultat === "classe" && (
              <>
                <p className="text-2xl font-black text-emerald-800">Licence classe enregistrée.</p>
                <p className="mt-1">
                  {activation.nb_eleves} élèves, {libelleDuree(activation.duree_mois ?? 12)}. Elle est rattachée à votre
                  compte. <Link href="/contact" className="font-bold underline">Écrivez-nous</Link> le nom de votre
                  établissement et de la classe : nous l&apos;ouvrons à vos élèves.
                </p>
              </>
            )}
            {activation.resultat === "deja_utilise_par_vous" && (
              <p className="text-lg">
                Vous avez déjà activé ce code : votre accès est ouvert.{" "}
                <Link href="/dashboard/abonnement" className="font-bold underline">Mon abonnement</Link>
              </p>
            )}
            {activation.resultat === "deja_utilise" && (
              <p className="font-bold text-rose-700">
                Ce code vient d&apos;être utilisé par un autre compte. Un code ne sert qu&apos;une fois :{" "}
                <Link href="/contact" className="underline">écrivez-nous</Link>.
              </p>
            )}
            {activation.resultat === "inconnu" && <p className="font-bold text-rose-700">Ce code n&apos;existe pas.</p>}
            {activation.resultat === "abonnement_mensuel" && (
              <p className="text-lg">
                Votre compte a un abonnement au mois, payé jusqu&apos;au {dateLongue(activation.acces_jusquau)}. Le code
                n&apos;a pas été utilisé : arrêtez le prélèvement dans{" "}
                <Link href="/dashboard/abonnement" className="font-bold underline">Mon abonnement</Link>, puis revenez
                après cette date. Ou offrez-le !
              </p>
            )}
            {activation.resultat === "connexion" && (
              <p className="font-bold text-rose-700">
                Votre connexion a expiré. <Link href={lienConnexion} className="underline">Reconnectez-vous</Link>, le
                code est gardé.
              </p>
            )}
            {activation.resultat === "trop" && <p className="font-bold text-rose-700">Trop d&apos;essais. Réessayez dans un quart d&apos;heure.</p>}
            {activation.resultat === "panne" && (
              <p className="font-bold text-rose-700">Le code n&apos;a pas pu être activé. Réessayez dans un instant : il n&apos;a pas été perdu.</p>
            )}
          </section>
        )}

        <p className="mt-8 text-sm text-slate-500">
          Le suivi famille : les vidéos, et la page qui montre ce que votre enfant a travaillé dans le coach. Un code
          ne sert qu&apos;une fois ; deux codes sur le même compte s&apos;additionnent.
        </p>
      </div>
    </main>
  );
}
