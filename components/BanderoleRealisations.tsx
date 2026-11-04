"use client";

// LA BANDEROLE ROUGE DES RÉALISATIONS (03/11/2026).
// Frédéric : « une banderole au-dessus du site qui affiche tout ce qui a été
// fait, par exemple 20 vidéos de spécialité maths, que ça défile, que les gens
// voient le travail qui est fait ». « Je verrais bien un rouge avec une
// écriture blanche. »
//
// ⭐ LES COULEURS. Un rouge profond (#B4122B → #D7263D) plutôt qu'un rouge
// pompier : il tient à côté du bleu nuit de l'en-tête (#041B33) sans crier, et
// le blanc s'y lit à plus de 5:1. Les séparateurs sont une étoile rose pâle
// (#FFD1D7) : on voit où finit une annonce sans un second blanc qui fatigue.
//
// ⭐ LE CONTENU vit dans Supabase (supabase/banderole_realisations.sql), lu par
// /api/banderole : une ligne ajoutée défile sans redéployer. Tant que la table
// est vide ou absente, SECOURS ci-dessous.
// ⭐ Le défilé s'arrête au survol (pour cliquer) et ne bouge pas du tout pour
// qui a demandé moins d'animations au système (prefers-reduced-motion).

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Ligne = { texte: string; lien?: string | null };

// Relevé le 03/11/2026 dans lib/videos/videos-r2.json.
const SECOURS: Ligne[] = [
  { texte: "1 363 vidéos de maths en ligne, du CP à la Terminale", lien: "/video" },
  { texte: "66 vidéos de Terminale spécialité maths", lien: "/video" },
  { texte: "170 vidéos pour la STMG", lien: "/video" },
  { texte: "162 vidéos de Première", lien: "/video" },
  { texte: "168 vidéos de 4e et 130 de 6e", lien: "/video" },
  { texte: "2 370 exercices de lycée corrigés sans IA", lien: "/fiches-exercices" },
  { texte: "Le coach suit ton programme et tes progrès", lien: "/coach" },
];

export default function BanderoleRealisations() {
  // ⛔ ACCUEIL SEULEMENT (Frédéric, 04/11 : « il faut mettre le bandeau que dans
  // la page d'accueil »). Le layout la rend partout ; elle s'efface ailleurs.
  const surAccueil = usePathname() === "/accueil";
  const [lignes, setLignes] = useState<Ligne[]>(SECOURS);

  useEffect(() => {
    if (!surAccueil) return;
    fetch("/api/banderole")
      .then((r) => r.json())
      .then((d: { lignes?: Ligne[] }) => {
        if (d.lignes && d.lignes.length > 0) setLignes(d.lignes);
      })
      .catch(() => {});
  }, [surAccueil]);

  if (!surAccueil) return null;

  // Vitesse constante, quelle que soit la longueur : ~ 7 signes par seconde.
  const signes = lignes.reduce((n, l) => n + l.texte.length + 6, 0);
  const duree = Math.max(25, Math.round(signes / 7));

  // La liste est rendue DEUX fois à la suite : l'animation recule de moitié,
  // la seconde copie prend la place de la première, la boucle ne se voit pas.
  const bande = (copie: number) =>
    lignes.map((l, i) => (
      <span key={`${copie}-${i}`} className="flex shrink-0 items-center" aria-hidden={copie === 1 || undefined}>
        {l.lien ? (
          <Link href={l.lien} tabIndex={copie === 1 ? -1 : undefined} className="hover:underline">
            {l.texte}
          </Link>
        ) : (
          <span>{l.texte}</span>
        )}
        <span className="px-5 text-[#FFD1D7]" aria-hidden>
          ★
        </span>
      </span>
    ));

  return (
    <section
      aria-label="Ce qui a déjà été fait sur EleveAI"
      className="banderole-realisations relative overflow-hidden bg-gradient-to-r from-[#B4122B] via-[#D7263D] to-[#B4122B] text-white print:hidden"
    >
      <div
        className="banderole-piste flex w-max whitespace-nowrap py-1.5 text-[13px] font-bold tracking-wide sm:text-sm"
        style={{ animationDuration: `${duree}s` }}
      >
        {bande(0)}
        {bande(1)}
      </div>
    </section>
  );
}
