"use client";

// Le rapport d'un enfant, lu par son parent. Sert à /suivi et à /suivi/exemple.
import Link from "next/link";
import { AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";
import BulletinDashboard from "@/components/bulletin/BulletinDashboard";
import type { RapportEnfant } from "@/lib/suivi/types";

function Chiffre({ valeur, libelle, avant }: { valeur: number; libelle: string; avant: number }) {
  const ecart = valeur - avant;
  return (
    <div className="rounded-2xl bg-slate-50 p-4 text-center">
      <p className="text-3xl font-black">{valeur}</p>
      <p className="text-sm font-bold text-slate-600">{libelle}</p>
      <p className="text-xs text-slate-500">
        {ecart === 0 ? "comme la semaine d'avant" : `${ecart > 0 ? "+" : ""}${ecart} sur la semaine d'avant`}
      </p>
    </div>
  );
}

export default function RapportVue({ r, liens = true }: { r: RapportEnfant; liens?: boolean }) {
  const { semaine: s, semainePrecedente: p } = r;
  const reussite = s.questions ? Math.round((s.justes / s.questions) * 100) : null;
  const travaillees = r.carte.filter((n) => n.compris + n.enCours + n.aRevoir > 0).length;

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-black sm:text-3xl">
          {r.prenom}
          {r.classe ? <span className="font-bold text-slate-500">, {r.classe}</span> : null}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {r.derniereActivite
            ? `Dernier travail au coach le ${new Date(r.derniereActivite).toLocaleDateString("fr-FR")}.`
            : "Aucune séance au coach pour l'instant. Le rapport se remplit dès les premiers exercices, quand votre enfant est connecté."}
        </p>
      </header>

      {r.alertes.map((a) => (
        <p key={a} className="flex gap-3 rounded-2xl bg-amber-50 p-4 font-bold text-amber-900 ring-1 ring-amber-200">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /> {a}
        </p>
      ))}

      <section>
        <h3 className="text-xl font-black">Cette semaine</h3>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Chiffre valeur={s.jours} libelle="jours de travail" avant={p.jours} />
          <Chiffre valeur={s.seances} libelle="séances" avant={p.seances} />
          <Chiffre valeur={s.questions} libelle="questions" avant={p.questions} />
          <Chiffre valeur={s.minutes} libelle="minutes" avant={p.minutes} />
        </div>
        {reussite !== null && (
          <p className="mt-3 text-slate-700">
            <strong>{reussite} %</strong> de réponses justes sur la semaine.
          </p>
        )}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl p-5 ring-1 ring-rose-200">
          <h3 className="flex items-center gap-2 text-xl font-black">
            <RotateCcw className="h-5 w-5 text-rose-600" aria-hidden="true" /> Les choses à revoir
          </h3>
          {r.aRevoir.length === 0 ? (
            <p className="mt-3 text-slate-600">Rien à signaler pour l&apos;instant.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {r.aRevoir.map((m) => (
                <li key={m.id}>
                  <p className="font-bold">{m.libelle}</p>
                  <p className="text-sm text-slate-500">
                    {m.notion ? `${m.notion} · ` : ""}{m.justes} {m.justes > 1 ? "justes" : "juste"} sur {m.reponses}
                  </p>
                  {liens && m.href && (
                    <Link href={m.href} className="text-sm font-black text-sky-700 underline">Le retravailler avec le coach</Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-3xl p-5 ring-1 ring-emerald-200">
          <h3 className="flex items-center gap-2 text-xl font-black">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" /> Ce qui est acquis
            {r.nbAcquises > 0 && <span className="font-bold text-slate-500">({r.nbAcquises})</span>}
          </h3>
          {r.acquises.length === 0 ? (
            <p className="mt-3 text-slate-600">Il faut au moins 3 réponses sur un point pour le dire acquis.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {r.acquises.map((m) => (
                <li key={m.id} className="font-bold">{m.libelle}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {r.carte.length > 0 && (
        <section>
          <h3 className="text-xl font-black">La carte de sa classe, en maths</h3>
          <p className="mt-1 text-sm text-slate-600">
            {travaillees} notion{travaillees > 1 ? "s" : ""} travaillée{travaillees > 1 ? "s" : ""} sur {r.carte.length}.
            Vert : compris. Orange : en cours. Rouge : à revoir. Gris : pas encore travaillé.
          </p>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {r.carte.map((n) => (
              <li key={n.id}>
                <p className="text-sm font-bold leading-tight">{n.titre}</p>
                <div
                  role="img"
                  aria-label={`${n.compris} compris, ${n.enCours} en cours, ${n.aRevoir} à revoir, sur ${n.total}`}
                  className="mt-1 flex h-2.5 overflow-hidden rounded-full bg-slate-200"
                >
                  <span className="bg-emerald-500" style={{ width: `${(n.compris / n.total) * 100}%` }} />
                  <span className="bg-amber-400" style={{ width: `${(n.enCours / n.total) * 100}%` }} />
                  <span className="bg-rose-500" style={{ width: `${(n.aRevoir / n.total) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {r.bulletin && (
        <section>
          <h3 className="mb-3 text-xl font-black">Son bulletin, toutes matières</h3>
          <BulletinDashboard bulletin={r.bulletin} />
        </section>
      )}
    </div>
  );
}
