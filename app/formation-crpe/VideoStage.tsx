"use client";

// LA VIDÉO DU STAGE SUR /formation-crpe (25/11/2026).
//
// Frédéric : « quand la vidéo YouTube partira, on la branchera sur la page
// CRPE ». La paysage « CRPE 2027 : les maths du concours en 1 semaine »
// (manifeste : `annonce-crpe-stage`, https://youtu.be/ZXczUKs52k4) est
// programmée PRIVÉE jusqu'au 25/11 à 21 h 30 (heure de La Réunion). Avant
// cette heure, YouTube afficherait « vidéo privée » : le bloc ne s'affiche
// donc qu'après `PUBLIEE_LE`, côté navigateur (la page est statique).
//
// ⭐ YouTube et pas R2 ici : la page s'adresse à des adultes, et chaque vue
// compte pour la chaîne. La règle « élèves = vidéos R2 » vaut pour les élèves.
// `youtube-nocookie` : pas de cookie tant qu'on ne lance pas la vidéo, et
// jamais de lecture automatique.

import { useEffect, useState } from "react";

const ID_YOUTUBE = "ZXczUKs52k4";
const PUBLIEE_LE = Date.parse("2026-11-25T21:30:00+04:00");

export default function VideoStage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reste = PUBLIEE_LE - Date.now();
    if (reste <= 0) {
      setVisible(true);
      return;
    }
    // Page restée ouverte jusqu'à l'heure de publication : elle apparaît.
    if (reste < 24 * 3600 * 1000) {
      const t = setTimeout(() => setVisible(true), reste);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  return (
    <section className="mt-8 overflow-hidden rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:p-6">
      <h2 className="text-lg font-black text-slate-900 sm:text-xl">
        🎬 Le stage en 2 minutes
      </h2>
      <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${ID_YOUTUBE}?rel=0`}
          title="CRPE 2027 : les maths du concours en 1 semaine (stage intensif en janvier)"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
