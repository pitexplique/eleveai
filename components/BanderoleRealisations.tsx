"use client";

// LA BANDEROLE ROUGE, AU-DESSUS DE L'EN-TÊTE (03/11/2026).
// Frédéric : « je verrais bien un rouge avec une écriture blanche ».
//
// ⛔ 05/11/2026 — ELLE NE DÉFILE PLUS. Frédéric : « le bandeau détourne
// l'attention sur la page centrale ». Une phrase fixe et cliquable : ce qui bouge
// tire l'œil sans arrêt, on ne lisait qu'une ou deux annonces sur neuf, et un
// texte en mouvement est dur à suivre pour les élèves qui lisent mal.
//
// ⭐ LES COULEURS. Un rouge profond (#B4122B → #D7263D) plutôt qu'un rouge
// pompier : il tient à côté du bleu nuit de l'en-tête (#041B33) sans crier, et
// le blanc s'y lit à plus de 5:1.
//
// ⭐ LE CONTENU vit dans Supabase (supabase/banderole_realisations.sql), lu par
// /api/banderole : c'est la PREMIÈRE ligne visible (la plus petite valeur de
// `ordre`) qui s'affiche, sans redéployer. Tant que la table est vide ou absente,
// SECOURS ci-dessous.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Ligne = { texte: string; lien?: string | null };

// ⭐ 04/11/2026 — Frédéric : « on ne vend plus un suivi mais un nombre de
// vidéos ? ». La banderole parle donc du SUIVI. Même phrase que la première
// ligne de supabase/banderole_realisations_04-11.sql.
const SECOURS: Ligne = {
  texte: "Le coach trouve ce qui te manque et t'entraîne là-dessus",
  lien: "/coach-ia/maths",
};

export default function BanderoleRealisations() {
  // ⛔ ACCUEIL SEULEMENT (Frédéric, 04/11 : « il faut mettre le bandeau que dans
  // la page d'accueil »). Le layout la rend partout ; elle s'efface ailleurs.
  const surAccueil = usePathname() === "/accueil";
  const [ligne, setLigne] = useState<Ligne>(SECOURS);

  useEffect(() => {
    if (!surAccueil) return;
    fetch("/api/banderole")
      .then((r) => r.json())
      .then((d: { lignes?: Ligne[] }) => {
        if (d.lignes && d.lignes.length > 0) setLigne(d.lignes[0]);
      })
      .catch(() => {});
  }, [surAccueil]);

  if (!surAccueil) return null;

  return (
    <section
      aria-label="L'essentiel d'EleveAI"
      // Téléphone : 12 px sans interlettrage, pour tenir sur UNE ligne à 375 px.
      className="bg-gradient-to-r from-[#B4122B] via-[#D7263D] to-[#B4122B] px-2 py-1.5 text-center text-[12px] font-bold leading-5 text-white print:hidden sm:text-sm sm:tracking-wide"
    >
      {ligne.lien ? (
        <Link href={ligne.lien} className="hover:underline">
          {ligne.texte}
        </Link>
      ) : (
        <span>{ligne.texte}</span>
      )}
    </section>
  );
}
