"use client";

// La vidéothèque entière est dans le suivi famille (décision du 02/11/2026).
// ⛔ Seule la GALERIE se ferme : la page de chaque vidéo reste ouverte, car le
// coach, les fiches et les QR y pointent, en classe. Tant que la vente n'est pas
// ouverte, rien ne change pour personne.
import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function GardeVideotheque({
  fermee,
  nbVideos,
  children,
}: {
  fermee: boolean;
  nbVideos: number;
  children: ReactNode;
}) {
  const [acces, setAcces] = useState<boolean | null>(fermee ? null : true);

  useEffect(() => {
    if (!fermee) return;
    (async () => {
      const { data } = await createClient().auth.getSession();
      if (!data.session) return setAcces(false);
      const r = await fetch("/api/abonnement/statut", {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
      });
      const j = await r.json();
      setAcces(Boolean(j.acces));
    })().catch(() => setAcces(false));
  }, [fermee]);

  if (acces === null) return <p className="mt-6 text-slate-500">Chargement…</p>;
  if (acces) return <>{children}</>;
  return (
    <section className="mt-6 rounded-3xl bg-white p-8 text-center ring-1 ring-slate-200">
      <h2 className="text-2xl font-black text-slate-900">Toute la vidéothèque : {nbVideos} vidéos</h2>
      <p className="mx-auto mt-3 max-w-xl text-slate-600">
        Parcourir toutes les vidéos par classe fait partie du suivi famille. La vidéo de chaque micro-compétence reste
        ouverte à tous dans le coach.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/abonnement" className="rounded-full bg-sky-700 px-6 py-3 font-black text-white hover:bg-sky-800">Voir le suivi famille</Link>
        <Link href="/coach-ia/maths" className="rounded-full px-6 py-3 font-black text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50">Aller au coach</Link>
      </div>
    </section>
  );
}
