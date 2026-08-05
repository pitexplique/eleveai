"use client";

// « L'hôtel Le Terre Sainte dans ta main » — Saint-Pierre, La Réunion.
// L'élève choisit la saison, règle le remplissage : les baies s'allument une à
// une, et tout le reste suit — les petits-déjeuners, le linge, l'eau chaude du
// soleil, la caisse du soir. Le pourcentage cesse d'être un exercice : c'est
// une façade éclairée.
//
// ⚠️ LA MAISON EST NOMMÉE (Frédéric a tranché le 05/08, la direction était
// dans la pièce) — exception assumée à la règle « pas de marque sur la page ».
//
// LA GRILLE EST RÉELLE (tarifs publics 2026 de l'hôtel Le Terre Sainte,
// communiqués par la maison le 05/08) : trois catégories de chambres × quatre
// saisons = un vrai TABLEAU À DOUBLE ENTRÉE, celui qu'on apprend à lire au
// CM2. Les tarifs sont pour 2 personnes, hors petits-déjeuners et hors taxe
// de séjour — donc le petit-déjeuner est un calcul À PART, et c'est ce qui
// rend le problème vivant.
//
// Le métier tient dans cinq nombres, et on les regarde tous les matins :
//   le TAUX D'OCCUPATION = chambres vendues ÷ chambres disponibles
//   le PRIX MOYEN        = Σ(nombre × prix) ÷ Σ(nombre)   ← une pondérée
//   la RECETTE de la nuit = Σ(chambres vendues × prix de la catégorie) + extras
//   le RevPAR            = recette chambres ÷ chambres disponibles
//   le POINT MORT        = charge fixe ÷ (prix moyen − coût variable)
//
// Chiffres pédagogiques ARRONDIS (assumés « environ ») :
//   2 personnes par chambre (c'est la base du tarif) · ≈ 2,5 kg de linge par
//   personne · ≈ 150 L d'eau par client et par nuit · ≈ 2,4 kWh d'eau chaude
//   par client (60 L chauffés de 25 à 60 °C) — à La Réunion, le soleil paie.
// ⚠️ Règle d'arrondi de la maison : dès qu'on calcule SUR un nombre arrondi,
//    on écrit « ≈ », jamais « = ».

import { useEffect, useState } from "react";
import Link from "next/link";
import DefisSimulateur, { type DefiSimulateur } from "@/components/simulateurs/DefisSimulateur";

const PERS_PAR_CHAMBRE = 2; // le tarif public est affiché « pour 2 personnes »
const LINGE_KG_PAR_PERSONNE = 2.5;
const EAU_L_PAR_CLIENT = 150;
const KWH_EAU_CHAUDE_PAR_CLIENT = 2.4;
const PDJ_ADULTE = 15; // € — petit-déjeuner adulte (à partir de 13 ans)
const PDJ_ENFANT = 8; // € — petit-déjeuner enfant (3 à 12 ans)
const SUPP_KITCHENETTE = 20; // € par nuitée, en chambre Supérieure
const SUPP_LIT = 15; // € par lit supplémentaire, adulte ou enfant

// ── LA GRILLE RÉELLE : trois catégories × quatre saisons ────────────────────
const SAISONS = [
  { cle: "basse", nom: "Basse", couleur: "#3b82c4" },
  { cle: "moyenne", nom: "Moyenne", couleur: "#f5b942" },
  { cle: "haute", nom: "Haute", couleur: "#ef8354" },
  { cle: "pointe", nom: "Pointe", couleur: "#e04b4b" },
] as const;

const CATEGORIES = [
  { cle: "superieure", nom: "Supérieure", couleur: "#f5b942", prix: [96, 109, 122, 131] },
  { cle: "deluxe", nom: "Deluxe", couleur: "#4fd1c5", prix: [117, 131, 144, 152] },
  { cle: "familiale", nom: "Familiale", couleur: "#ff9d7a", prix: [135, 148, 161, 170] },
] as const;

// ── Les défis de l'hôtel (règle du 18/07 : chaque machine a les siens) ───────
// Ils sont bâtis sur la VRAIE grille : un élève de l'île calcule sur les prix
// que ses parents paieraient. L'échelle monte du CM2 (lire un tableau à
// double entrée) à la Seconde (le point mort).
const DEFIS: DefiSimulateur[] = [
  {
    id: "lecture",
    question:
      "Dans la grille ci-dessus : combien coûte une chambre Deluxe en Haute Saison ?",
    reponse: 144,
    unite: "€",
    indice:
      "Cherche la ligne « Deluxe », puis descends jusqu'à la colonne « Haute ». Le prix est à leur croisement.",
    calcul: "144 € — croiser une ligne et une colonne, c'est lire un tableau à double entrée",
  },
  {
    id: "hausse",
    question:
      "Une chambre Supérieure coûte 96 € en Basse Saison et 131 € en Saison Pointe. De combien de % le prix augmente-t-il ? (arrondis à l'unité)",
    reponse: 36,
    unite: "%",
    tolerance: 1,
    indice:
      "L'augmentation est de 131 − 96 = 35 €. Un pourcentage se calcule TOUJOURS par rapport au prix de départ : 35 ÷ 96.",
    calcul: "(131 − 96) ÷ 96 = 35 ÷ 96 ≈ 0,364 → ≈ 36 % de plus quand l'île est pleine",
  },
  {
    id: "recette",
    question:
      "Un soir de Moyenne Saison, 12 chambres Deluxe (131 €) sont occupées. Quelle recette pour ces chambres ?",
    reponse: 1572,
    unite: "€",
    tolerance: 5,
    indice: "Chaque Deluxe rapporte 131 € : 12 × 131.",
    calcul: "12 × 131 = 1 572 € — rien que pour les Deluxe de cette nuit",
  },
  {
    id: "famille",
    question:
      "Une famille (2 adultes, 2 enfants de 3 à 12 ans) prend une chambre Familiale en Haute Saison (161 €), avec un lit supplémentaire par enfant (15 € chacun) et les petits-déjeuners (15 € par adulte, 8 € par enfant). Quel est le total de la nuit ?",
    reponse: 237,
    unite: "€",
    tolerance: 1,
    indice:
      "Quatre morceaux à additionner : la chambre, les 2 lits supplémentaires, les 2 petits-déjeuners adultes, les 2 petits-déjeuners enfants.",
    calcul: "161 + 2×15 + 2×15 + 2×8 = 161 + 30 + 30 + 16 = 237 € (hors taxe de séjour)",
  },
  {
    id: "moyenne",
    question:
      "En Haute Saison, une maison a 10 Supérieures (122 €), 6 Deluxe (144 €) et 4 Familiales (161 €). Quel est le prix moyen d'une chambre ? (attention : ce n'est pas 142,33 €)",
    reponse: 136.4,
    unite: "€",
    tolerance: 1,
    indice:
      "Il y a bien plus de Supérieures que de Familiales : la moyenne penche de leur côté. Calcule la recette si tout est vendu, puis divise par 20.",
    calcul:
      "(10×122 + 6×144 + 4×161) ÷ 20 = (1 220 + 864 + 644) ÷ 20 = 2 728 ÷ 20 = 136,40 € — une moyenne PONDÉRÉE",
  },
  {
    id: "revpar",
    question:
      "Cette maison affiche 70 % de remplissage, avec un prix moyen de 136,40 €. En moyenne, combien rapporte CHAQUE chambre — occupée ou vide ? (c'est le RevPAR)",
    reponse: 95.5,
    unite: "€ par chambre",
    tolerance: 1,
    indice: "Les chambres vides comptent aussi : multiplie le taux par le prix moyen, 0,70 × 136,40.",
    calcul: "0,70 × 136,40 ≈ 95,48 € par chambre disponible — le vrai thermomètre du métier",
  },
  {
    id: "pointmort",
    question:
      "La nuit coûte 45 € par chambre, occupée ou non (salaires, prêt, communs). Chaque chambre vendue à 136 € coûte 25 € de plus (ménage, linge, énergie). À partir de quel taux de remplissage la nuit devient-elle rentable ?",
    reponse: 40.5,
    unite: "%",
    tolerance: 1.5,
    indice:
      "Une chambre vendue laisse 136 − 25 = 111 € pour payer les 45 € de charge. Cherche la part de chambres nécessaire : 45 ÷ 111.",
    calcul: "45 ÷ (136 − 25) = 45 ÷ 111 ≈ 0,405 → il faut ≈ 41 % de remplissage pour que la nuit rapporte",
  },
];

const COULEURS_DEFIS = {
  fond: "#0d2233",
  fondProfond: "#071726",
  bord: "#1c3d55",
  accent: "#f5b942",
  texte: "#f2f7fb",
  sousTexte: "#8fb3c9",
  ok: "#6ec78a",
  rate: "#ff9d7a",
};

// Formatage français des grands nombres, sans décimales inutiles.
function fr(n: number, decimales = 0): string {
  return n.toLocaleString("fr-FR", {
    maximumFractionDigits: decimales,
    minimumFractionDigits: 0,
  });
}

type Unite = { couleur: string; allumee: boolean };

// ── La façade VIVANTE (SVG animé) ────────────────────────────────────────────
// Une baie = une chambre. Les baies s'allument dans l'ordre, catégorie par
// catégorie : le pourcentage devient une image qu'on peut COMPTER, et la
// couleur dit qui remplit la maison ce soir.
// Dessinée d'après la vraie maison : socle turquoise, bande de bois verticale
// à l'angle, garde-corps sombres, dalles blanches, toitures en sheds.
// Pastilles A→H : la grammaire des coupes de manuel — ici, le vocabulaire du
// métier, que les élèves ne croisent nulle part ailleurs.
// Les chambres se répartissent également sur les étages (≈ 9 par palier) :
// une maison de 26 chambres donne 9 + 9 + 8, pas 12 + 12 + 2 — sinon le
// dernier étage n'est qu'un grand bandeau vide, et le dessin ment sur la forme
// du bâtiment.
function repartir(total: number) {
  const rangees = Math.max(1, Math.min(8, Math.round(total / 9) || 1));
  return { rangees, parRangee: Math.max(1, Math.ceil(total / rangees)) };
}

function HotelAnime({ unites, allumees }: { unites: Unite[]; allumees: number }) {
  const total = unites.length;
  const { rangees, parRangee } = repartir(total);
  const hRangee = Math.min(32, 216 / rangees);
  const hDalle = 3; // la dalle blanche entre deux étages
  const hVitre = (hRangee - hDalle) * 0.56; // la baie vitrée
  const hGarde = (hRangee - hDalle) * 0.44; // le garde-corps du balcon
  const solY = 336; // le sol devant l'hôtel
  const rezH = 56; // le rez-de-chaussée : le bar et la réception
  const toit = solY - rezH - rangees * hRangee;

  const x0 = 130; // bord gauche de la façade
  const largeur = 560;
  const lBois = 48; // la bande de bois verticale, à l'angle du bâtiment
  const xBois = x0 + largeur - lBois;
  const pas = (largeur - lBois - 26) / parRangee;
  const lFenetre = Math.max(6, pas - 8);

  // L'enseigne verticale de la bande de bois : elle ne doit JAMAIS déborder
  // sous le socle. Le bâtiment change de hauteur avec le nombre de chambres —
  // on écrit donc ce qui tient, et rien de plus.
  const placesEnseigne = Math.floor((solY - 16 - (toit + 22)) / 16);
  const enseigne =
    placesEnseigne >= 9 ? "HÔTEL·BAR" : placesEnseigne >= 5 ? "HÔTEL" : "";

  // Plus la maison est pleine, plus elle s'agite (cadence des animations).
  const taux = total > 0 ? allumees / total : 0;
  const cadence = (4.2 - taux * 2.6).toFixed(2) + "s";

  return (
    <div className="mt-3 overflow-x-auto rounded border border-[#1c3d55] bg-[#071726]">
      <style>{`
        @keyframes hot-flux { to { stroke-dashoffset: -30; } }
        @keyframes hot-lueur { 0%,100% { opacity: .92; } 50% { opacity: 1; } }
        @keyframes hot-fumee { 0% { transform: translateY(0); opacity: .55; } 100% { transform: translateY(-26px); opacity: 0; } }
        @keyframes hot-soleil { 0%,100% { opacity: .45; } 50% { opacity: .95; } }
        .h-vague { stroke-dasharray: 16 12; animation: hot-flux var(--cadence) linear infinite; }
        .h-allumee { animation: hot-lueur calc(var(--cadence) * 2) ease-in-out infinite; }
        .h-fumee { animation: hot-fumee var(--cadence) ease-out infinite; }
        .h-soleil { animation: hot-soleil calc(var(--cadence) * 2.5) ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .h-vague, .h-allumee, .h-fumee, .h-soleil { animation-duration: 14s; }
        }
      `}</style>
      <svg
        viewBox="0 0 820 380"
        style={{ ["--cadence" as string]: cadence }}
        className="mx-auto block min-w-[640px] max-w-[900px]"
        aria-label={`Façade animée d'un hôtel de Terre-Sainte : socle turquoise, bande de bois à l'angle, balcons à garde-corps sombres — ${allumees} baies allumées sur ${total} chambres, la mer derrière et les chauffe-eau solaires sur le toit`}
      >
        {/* Le ciel du soir sur Saint-Pierre */}
        <defs>
          <linearGradient id="h-ciel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1c2e" />
            <stop offset="100%" stopColor="#1d3f57" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="820" height="212" fill="url(#h-ciel)" />
        <circle cx="742" cy="52" r="15" fill="#f5f0d8" opacity="0.85" />

        {/* La mer, derrière — Terre-Sainte regarde le large */}
        <rect x="0" y="212" width="820" height="46" fill="#0e3549" />
        <path d="M0,224 Q40,218 80,224 T160,224 T240,224 T320,224 T400,224 T480,224 T560,224 T640,224 T720,224 T820,224"
          fill="none" stroke="#3f8fa8" strokeWidth="2.5" className="h-vague" />
        <path d="M0,242 Q40,236 80,242 T160,242 T240,242 T320,242 T400,242 T480,242 T560,242 T640,242 T720,242 T820,242"
          fill="none" stroke="#3f8fa8" strokeWidth="2" opacity="0.6" className="h-vague" />
        <text x="700" y="206" fill="#8fb3c9" fontSize="10" fontWeight="700" fontFamily="monospace">L&apos;OCÉAN INDIEN</text>

        {/* Le sol : la rue et le sable de Terre-Sainte */}
        <rect x="0" y="258" width="820" height="122" fill="#14293a" />
        <rect x="0" y="258" width="820" height="12" fill="#c9b98f" opacity="0.35" />

        {/* Les filaos de bord de mer */}
        {[52, 96, 762].map((x, i) => (
          <g key={x}>
            <rect x={x - 2} y={solY - 52} width="4" height="52" fill="#1f4a3a" />
            <path
              d={`M${x},${solY - 52} q-24,-12 -32,-30 M${x},${solY - 52} q24,-12 32,-30 M${x},${solY - 52} q-10,-24 -2,-38 M${x},${solY - 52} q14,-22 22,-32`}
              fill="none"
              stroke="#2c6b4f"
              strokeWidth="3"
              strokeLinecap="round"
              opacity={i === 2 ? 0.85 : 1}
            />
          </g>
        ))}

        {/* ── LA FAÇADE ─────────────────────────────────────────────────── */}
        <rect x={x0} y={toit} width={largeur} height={solY - toit} fill="#e9eef1" stroke="#c3ced5" strokeWidth="1.5" />
        {/* Les toitures en sheds, penchées comme sur la vraie façade */}
        {[0, 1, 2, 3].map((i) => {
          const xa = x0 + i * (largeur / 4);
          const w = largeur / 4 - 4;
          return (
            <polygon
              key={i}
              points={`${xa},${toit} ${xa + w},${toit} ${xa + w},${toit - 10} ${xa},${toit - 26}`}
              fill="#26323a"
            />
          );
        })}
        {/* F · les chauffe-eau solaires : à La Réunion, le soleil paie les douches */}
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={x0 + 44 + i * 150}
            y={toit - 34}
            width="104"
            height="9"
            fill="#f5b942"
            opacity="0.8"
            className="h-soleil"
            style={{ animationDelay: `calc(var(--cadence) * ${i * 0.4})` }}
          />
        ))}

        {/* Les chambres : une baie + son balcon. La couleur dit la catégorie. */}
        {Array.from({ length: rangees }).map((_, r) => (
          <rect key={`dalle-${r}`} x={x0} y={solY - rezH - (r + 1) * hRangee} width={xBois - x0} height={hDalle} fill="#f7fafb" />
        ))}
        {unites.map((u, i) => {
          const rangeeDepuisBas = Math.floor(i / parRangee);
          const col = i % parRangee;
          const x = x0 + 13 + col * pas + (pas - lFenetre) / 2;
          const yHaut = solY - rezH - (rangeeDepuisBas + 1) * hRangee + hDalle;
          return (
            <g key={i}>
              {/* la baie vitrée : allumée = chambre vendue, à la couleur de sa catégorie */}
              <rect
                x={x}
                y={yHaut}
                width={lFenetre}
                height={hVitre}
                fill={u.allumee ? u.couleur : "#243038"}
                stroke={u.allumee ? "#ffe9c2" : "#38474f"}
                strokeWidth="1"
                className={u.allumee ? "h-allumee" : undefined}
                style={u.allumee ? { animationDelay: `calc(var(--cadence) * ${(i % 7) * 0.18})` } : undefined}
              />
              {/* le garde-corps du balcon, à claire-voie */}
              <rect x={x} y={yHaut + hVitre} width={lFenetre} height={hGarde} fill="#2f3a40" />
              <line
                x1={x}
                y1={yHaut + hVitre + hGarde / 2}
                x2={x + lFenetre}
                y2={yHaut + hVitre + hGarde / 2}
                stroke="#4a585f"
                strokeWidth="1"
              />
            </g>
          );
        })}

        {/* La bande de bois verticale, à l'angle — la signature de la maison */}
        <rect x={xBois} y={toit - 10} width={lBois} height={solY - toit + 10} fill="#b58154" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={xBois + 8 + i * 8} y1={toit - 10} x2={xBois + 8 + i * 8} y2={solY} stroke="#9a6a41" strokeWidth="1.5" />
        ))}
        {enseigne.split("").map((lettre, i) => (
          <text
            key={i}
            x={xBois + lBois / 2}
            y={toit + 34 + i * 16}
            fill="#f7fafb"
            fontSize="13"
            fontWeight="700"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {lettre}
          </text>
        ))}

        {/* Le rez-de-chaussée : le socle turquoise, C · la réception, D · le bar */}
        <rect x={x0} y={solY - rezH} width={340} height={rezH} fill="#17a2a8" />
        <rect x={x0 + 340} y={solY - rezH} width={xBois - x0 - 340} height={rezH} fill="#b9c4ca" />
        {/* l'enseigne blanche sur le turquoise (sans nom : c'est le métier qu'on raconte) */}
        <rect x={x0 + 80} y={solY - 46} width="118" height="20" rx="2" fill="#f7fafb" opacity="0.92" />
        <text x={x0 + 139} y={solY - 32} fill="#17a2a8" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="monospace">LE TERRE SAINTE</text>
        {/* les baies du bar, éclairées */}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={x0 + 210 + i * 42} y={solY - 40} width="30" height="34" rx="1.5" fill="#ffd98a" opacity="0.75" />
        ))}
        <text x={x0 + 267} y={solY - 14} fill="#0d2233" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="monospace">LE BAR</text>
        {/* la porte d'entrée, sous l'auvent gris : la réception */}
        <rect x={x0 + 372} y={solY - 40} width="40" height="40" fill="#f5b942" opacity="0.9" />
        <text x={x0 + 392} y={solY - 46} fill="#20303a" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="monospace">ACCUEIL</text>
        {/* La vapeur de la cuisine : la maison travaille */}
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={x0 + 224 + i * 16}
            cy={solY - 52}
            r="3.4"
            fill="#cfe3ee"
            className="h-fumee"
            style={{ animationDelay: `calc(var(--cadence) * ${i * 0.33})` }}
          />
        ))}
        {/* E · la lingerie : le local qui tourne tous les jours, derrière */}
        <rect x={x0 + 430} y={solY - 34} width={xBois - x0 - 442} height="34" fill="#8e9aa1" />
        <text x={(x0 + 430 + xBois - 12) / 2} y={solY - 14} fill="#20303a" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="monospace">LINGERIE</text>

        {/* Le compteur, en gros, au-dessus du toit */}
        <text x="410" y={Math.max(30, toit - 46)} fill="#f5b942" fontSize="15" fontWeight="800" textAnchor="middle" fontFamily="monospace">
          {allumees} / {total} CHAMBRES ALLUMÉES
        </text>

        {/* Les pastilles A → H (la grammaire des coupes de manuel) */}
        {([
          ["A", x0 + 13 + (pas - lFenetre) / 2 + lFenetre / 2, solY - rezH - hRangee + hDalle + hVitre / 2],
          ["B", x0 - 12, toit + 20],
          ["C", x0 + 392, solY - 12],
          ["D", x0 + 300, solY - 46],
          ["E", x0 + 452, solY - 44],
          ["F", x0 + 44, toit - 44],
          ["G", 58, 234],
          ["H", x0 + 139, solY - 12],
        ] as const).map(([lettre, x, y]) => (
          <g key={lettre}>
            <circle cx={x} cy={y} r="9" fill="#f5b942" />
            <text x={x} y={y + 3.5} fill="#071726" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="monospace">
              {lettre}
            </text>
          </g>
        ))}
      </svg>

      {/* La légende des couleurs : qui remplit la maison ce soir. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-[#1c3d55] px-3 py-1.5 text-[11.5px] text-[#8fb3c9]">
        {CATEGORIES.map((c) => (
          <span key={c.cle} className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-4 rounded-sm" style={{ backgroundColor: c.couleur }} />
            {c.nom}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-4 rounded-sm border border-[#38474f] bg-[#243038]" />
          libre
        </span>
      </div>

      {/* Le vocabulaire du métier, de A à H — replié pour garder la page courte.
          Ces mots-là, un élève ne les croise nulle part ailleurs. */}
      <details className="border-t border-[#1c3d55] px-3 py-2">
        <summary className="cursor-pointer text-[11.5px] font-bold text-[#8fb3c9] hover:text-[#f2f7fb]">
          🔤 Les mots de l&apos;hôtel, de A à H ▾
        </summary>
        <div className="mt-2 grid gap-x-5 gap-y-1.5 pb-1 text-[12px] leading-5 text-[#cfe3ee] sm:grid-cols-2">
          {[
            ["A", "La chambre : l'unité de tout. Mais toutes ne se valent pas — Supérieure, Deluxe, Familiale n'ont ni le même prix ni la même capacité."],
            ["B", "Le taux d'occupation : la part des chambres vendues. C'est un pourcentage — le premier chiffre que le directeur regarde le matin."],
            ["C", "La réception : là où on compte les clés, et où on dit oui ou non au client de dernière minute."],
            ["D", "Le bar et la salle du matin : le petit-déjeuner n'est PAS dans le prix de la chambre — c'est une recette à part, qui se gagne client par client."],
            ["E", "La lingerie : ≈ 2,5 kg de draps et de serviettes par personne, tous les jours."],
            ["F", "Le chauffe-eau solaire : à La Réunion, le soleil chauffe l'eau des douches — l'énergie qu'on ne paie pas."],
            ["G", "La saison : basse, moyenne, haute, pointe. La même chambre change de prix quatre fois dans l'année — c'est toute la colonne de droite du tableau."],
            ["H", "La caisse : la recette, le prix moyen PONDÉRÉ, et le point mort — le taux à partir duquel la nuit rapporte enfin."],
          ].map(([lettre, texte]) => (
            <p key={lettre}>
              <span className="mr-1.5 inline-block w-5 rounded-sm bg-[#f5b942] text-center font-mono text-[11px] font-black text-[#071726]">
                {lettre}
              </span>
              {texte}
            </p>
          ))}
        </div>
      </details>
    </div>
  );
}

function Etape({
  nom,
  explication,
  quantite,
  unite,
  pct,
  couleur,
  decimales = 0,
}: {
  nom: string;
  explication: string;
  quantite: number;
  unite: string;
  pct: number; // largeur de la barre, en % du flux
  couleur: string;
  decimales?: number;
}) {
  return (
    <div className="rounded border border-[#1c3d55] bg-[#0d2233] px-3 py-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8fb3c9]">{nom}</p>
        <p className="font-mono text-sm font-bold tabular-nums text-[#f2f7fb]">
          {fr(quantite, decimales)} <span className="text-[11px] font-normal text-[#8fb3c9]">{unite}</span>
        </p>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#071726]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: Math.max(2, Math.min(100, pct)) + "%", backgroundColor: couleur }}
        />
      </div>
      <p className="mt-1.5 text-[12px] leading-5 text-[#cfe3ee]">{explication}</p>
    </div>
  );
}

export default function SimulateurHotelClient() {
  // Les commandes : la saison, le remplissage, et la part des clients qui
  // prennent le petit-déjeuner (il n'est PAS compris dans le prix).
  const [saison, setSaison] = useState(2); // 0 basse · 1 moyenne · 2 haute · 3 pointe
  const [taux, setTaux] = useState(70);
  const [partPdj, setPartPdj] = useState(60);

  // La maison, catégorie par catégorie. Ordres de grandeur : le directeur qui
  // passe par là met LES SIENS en trente secondes.
  const [nSuperieure, setNSuperieure] = useState(14);
  const [nDeluxe, setNDeluxe] = useState(8);
  const [nFamiliale, setNFamiliale] = useState(4);

  // Les deux nombres que seul le gérant connaît (repliés, modifiables).
  const [chargeFixe, setChargeFixe] = useState(45); // € par chambre disponible et par nuit
  const [coutVariable, setCoutVariable] = useState(25); // € par chambre VENDUE

  // MODE CLASSE (vidéoprojecteur) : tout grossit — mémorisé, partagé avec
  // les autres machines (même clé localStorage).
  const [modeClasse, setModeClasse] = useState(false);
  useEffect(() => {
    try {
      setModeClasse(localStorage.getItem("eleveai-mode-classe") === "1");
    } catch {}
  }, []);
  const basculerModeClasse = () => {
    setModeClasse((v) => {
      try {
        localStorage.setItem("eleveai-mode-classe", v ? "0" : "1");
      } catch {}
      return !v;
    });
  };

  // ── La cascade : une saison, un pourcentage, et la maison se met en marche ─
  const nombres = [nSuperieure, nDeluxe, nFamiliale];
  const parc = CATEGORIES.map((c, i) => ({ ...c, n: nombres[i], p: c.prix[saison] }));
  const total = parc.reduce((s, c) => s + c.n, 0);

  // Chaque catégorie se remplit au même taux — on ne vend pas 0,4 chambre.
  const occupees = parc.map((c) => Math.round((c.n * taux) / 100));
  const vendues = occupees.reduce((s, n) => s + n, 0);

  // LE PRIX MOYEN EST UNE MOYENNE PONDÉRÉE — pas la moyenne des trois tarifs.
  const valeurParc = parc.reduce((s, c) => s + c.n * c.p, 0);
  const prixMoyen = total > 0 ? valeurParc / total : 0;
  const moyenneNaive = parc.reduce((s, c) => s + c.p, 0) / parc.length;

  const clients = vendues * PERS_PAR_CHAMBRE;
  const pdj = Math.round((clients * partPdj) / 100);
  const recettePdj = pdj * PDJ_ADULTE;
  const linge = clients * LINGE_KG_PAR_PERSONNE;
  const eau = clients * EAU_L_PAR_CLIENT;
  const kwh = clients * KWH_EAU_CHAUDE_PAR_CLIENT;

  const recetteChambres = parc.reduce((s, c, i) => s + occupees[i] * c.p, 0);
  const recetteTotale = recetteChambres + recettePdj;
  const revpar = total > 0 ? recetteChambres / total : 0;

  // Le même soir, le même remplissage : ce que la saison change à la caisse.
  const recetteSaison = (s: number) =>
    CATEGORIES.reduce((acc, c, i) => acc + occupees[i] * c.prix[s], 0);
  const recetteBasse = recetteSaison(0);
  const recettePointe = recetteSaison(3);
  const ecartSaisons = recettePointe - recetteBasse;
  const ecartPct = recetteBasse > 0 ? (ecartSaisons / recetteBasse) * 100 : 0;

  // Le point mort : la charge fixe de la nuit ÷ ce que laisse une chambre
  // vendue. C'est une équation du premier degré — et la question que le
  // directeur se pose tous les jours.
  const marge = prixMoyen - coutVariable;
  const pointMort = marge > 0 ? Math.min(999, (chargeFixe / marge) * 100) : 999;
  const rentable = taux >= pointMort;
  const resultat = recetteChambres - chargeFixe * total - coutVariable * vendues;

  // La façade : les chambres dans l'ordre des catégories, allumées d'abord.
  const unites = parc.flatMap((c, i) =>
    Array.from({ length: c.n }, (_, k) => ({ couleur: c.couleur, allumee: k < occupees[i] })),
  );

  const majParc = (i: number, n: number) =>
    [setNSuperieure, setNDeluxe, setNFamiliale][i](Math.max(0, Math.min(60, n)));

  return (
    <div className="min-h-screen bg-[#071726] text-[#f2f7fb]">
      {/* Manchette de l'hôtel */}
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#1c3d55] px-5 pb-2.5 pt-3.5">
        <h1 className="m-0 text-[17px] font-extrabold uppercase tracking-[0.28em]">
          L&apos;hôtel Le Terre Sainte dans ta <span className="text-[#f5b942]">main</span>
        </h1>
        <span className="font-serif text-sm italic text-[#8fb3c9]">
          Saint-Pierre, La Réunion — une baie allumée, une nuit vendue
        </span>
        <button
          type="button"
          onClick={basculerModeClasse}
          aria-pressed={modeClasse}
          className={`ml-auto rounded-sm border px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider transition ${
            modeClasse
              ? "border-[#f5b942] bg-[#f5b942] text-[#071726]"
              : "border-[#f5b942]/40 bg-transparent text-[#f5b942] hover:bg-[#f5b942]/15"
          }`}
        >
          🖥️ MODE CLASSE {modeClasse ? "✓" : ""}
        </button>
        <span className="rounded-sm bg-[#f5b942] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-[#071726]">
          LE MÉTIER D&apos;HÔTELIER
        </span>
      </header>

      <main
        className="mx-auto max-w-5xl px-4 py-5 sm:px-6"
        style={modeClasse ? ({ zoom: 1.35 } as React.CSSProperties) : undefined}
      >
        {/* ── LA GRILLE : le tableau à double entrée, en vrai ──────────────
            C'est LE document du métier. On apprend à le lire au CM2, et un
            directeur d'hôtel le relit tous les jours de sa vie. */}
        <div className="rounded border border-[#1c3d55] bg-[#0d2233] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#8fb3c9]">
              📋 La grille des tarifs 2026 — choisis la saison
            </p>
            <p className="text-[11.5px] text-[#8fb3c9]">
              prix pour 2 personnes, hors petit-déjeuner et taxe de séjour
            </p>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-[13px]">
              <thead>
                <tr>
                  <th className="border border-[#1c3d55] bg-[#071726] px-2 py-1.5 text-left font-black text-[#8fb3c9]">
                    Catégorie
                  </th>
                  {SAISONS.map((s, i) => (
                    <th key={s.cle} className="border border-[#1c3d55] p-0">
                      <button
                        type="button"
                        onClick={() => setSaison(i)}
                        aria-pressed={saison === i}
                        className={`w-full px-2 py-1.5 font-black transition ${
                          saison === i ? "text-[#071726]" : "text-[#f2f7fb] hover:brightness-125"
                        }`}
                        style={{ backgroundColor: saison === i ? s.couleur : "#071726" }}
                      >
                        {s.nom}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CATEGORIES.map((c) => (
                  <tr key={c.cle}>
                    <th className="border border-[#1c3d55] bg-[#071726] px-2 py-1.5 text-left font-bold text-[#f2f7fb]">
                      <span className="mr-1.5 inline-block h-2.5 w-4 rounded-sm align-middle" style={{ backgroundColor: c.couleur }} />
                      {c.nom}
                    </th>
                    {c.prix.map((p, i) => (
                      <td
                        key={i}
                        className={`border border-[#1c3d55] px-2 py-1.5 text-center font-mono tabular-nums ${
                          saison === i
                            ? "bg-[#f5b942]/15 font-bold text-[#f5b942]"
                            : "text-[#cfe3ee]"
                        }`}
                      >
                        {fr(p)} €
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11.5px] leading-5 text-[#8fb3c9]">
            En plus, quand le client le demande : kitchenette en Supérieure{" "}
            <b className="text-[#cfe3ee]">+{fr(SUPP_KITCHENETTE)} €</b> la nuitée · lit
            supplémentaire (adulte ou enfant de 3 à 12 ans){" "}
            <b className="text-[#cfe3ee]">+{fr(SUPP_LIT)} €</b> · petit-déjeuner{" "}
            <b className="text-[#cfe3ee]">{fr(PDJ_ADULTE)} €</b> adulte,{" "}
            <b className="text-[#cfe3ee]">{fr(PDJ_ENFANT)} €</b> enfant. Une chambre Familiale
            peut loger jusqu&apos;à 6 personnes.
          </p>
        </div>

        {/* La commande : le remplissage de ce soir */}
        <div className="mt-3 rounded border border-[#1c3d55] bg-[#0d2233] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#8fb3c9]">
              🛎️ Le remplissage de ce soir
            </p>
            <p className="font-mono text-2xl font-bold tabular-nums text-[#f5b942]">
              {fr(taux)} <span className="text-sm font-normal text-[#8fb3c9]">%</span>
            </p>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={taux}
            onChange={(e) => setTaux(+e.target.value)}
            className="mt-3 w-full accent-[#f5b942]"
            aria-label="Taux d'occupation de l'hôtel, en pourcentage"
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-[#8fb3c9]/70">
            <span>0 — la maison est éteinte</span>
            <span>100 — complet, pas une clé au tableau</span>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#8fb3c9]">
                🥐 Les clients qui prennent le petit-déjeuner
              </p>
              <p className="font-mono text-lg font-bold tabular-nums text-[#f2f7fb]">{fr(partPdj)} %</p>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={partPdj}
              onChange={(e) => setPartPdj(+e.target.value)}
              className="mt-2 w-full accent-[#5aa9c9]"
              aria-label="Part des clients qui prennent le petit-déjeuner, en pourcentage"
            />
            <p className="mt-1.5 text-[12px] leading-5 text-[#cfe3ee]">
              Le petit-déjeuner n&apos;est pas dans le prix de la chambre : c&apos;est une
              deuxième recette, qui se gagne client par client — {fr(pdj)} couverts ce matin,{" "}
              <b className="text-[#f2f7fb]">{fr(recettePdj)} €</b>.
            </p>
          </div>
        </div>

        {/* LA MAISON, CATÉGORIE PAR CATÉGORIE */}
        <div className="mt-3 rounded border border-[#1c3d55] bg-[#0d2233] p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#8fb3c9]">
            🛏️ La maison — combien de chambres de chaque sorte
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {parc.map((c, i) => (
              <div key={c.cle} className="rounded border border-[#1c3d55] bg-[#071726] p-3">
                <p className="flex items-center gap-2 text-[12px] font-bold text-[#f2f7fb]">
                  <span className="inline-block h-2.5 w-4 rounded-sm" style={{ backgroundColor: c.couleur }} />
                  {c.nom} — {fr(c.p)} €
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={60}
                    value={c.n}
                    onChange={(e) => majParc(i, +e.target.value)}
                    className="w-16 rounded border border-[#1c3d55] bg-[#0d2233] px-2 py-1 font-mono text-sm text-[#f2f7fb] outline-none"
                    aria-label={`Nombre de chambres ${c.nom}`}
                  />
                  <span className="font-mono text-[11px] text-[#8fb3c9]">chambres</span>
                </div>
                <p className="mt-2 text-[11.5px] leading-4 text-[#cfe3ee]">
                  ce soir : <b className="text-[#f2f7fb]">{fr(occupees[i])}</b> occupée
                  {occupees[i] > 1 ? "s" : ""} → {fr(occupees[i] * c.p)} €
                </p>
              </div>
            ))}
          </div>

          {/* LE PIÈGE, montré au lieu d'être raconté. */}
          <div className="mt-3 rounded border border-[#f5b942]/40 bg-[#071726] px-3 py-2.5">
            <p className="text-[12.5px] leading-6 text-[#cfe3ee]">
              En saison {SAISONS[saison].nom.toLowerCase()}, le prix moyen d&apos;une chambre de
              cette maison est de <b className="font-mono text-[#f5b942]">≈ {fr(prixMoyen, 2)} €</b>{" "}
              — et <b className="text-[#f2f7fb]">pas</b> {fr(moyenneNaive, 2)} €, la moyenne des
              trois tarifs. Parce qu&apos;on n&apos;a pas autant de chaque : c&apos;est une{" "}
              <b className="text-[#f2f7fb]">moyenne pondérée</b>, chaque prix pèse le nombre de
              chambres qui le portent. Se tromper là-dessus, c&apos;est se tromper sur toute la
              nuit.
            </p>
            <p className="mt-1.5 font-mono text-[12px] leading-relaxed text-[#f5b942]">
              ({fr(nSuperieure)} × {fr(parc[0].p)} + {fr(nDeluxe)} × {fr(parc[1].p)} +{" "}
              {fr(nFamiliale)} × {fr(parc[2].p)}) ÷ {fr(total)} = {fr(valeurParc)} ÷ {fr(total)} ≈{" "}
              <b>{fr(prixMoyen, 2)} €</b>
            </p>
          </div>
        </div>

        {/* LA FAÇADE VIVANTE — le pourcentage qu'on peut compter des yeux. */}
        <HotelAnime unites={unites} allumees={vendues} />

        {/* La chaîne de l'hôtel */}
        <div className="mt-3 space-y-3">
          <Etape
            nom="1 · Les clés — le pourcentage devient des nuits"
            explication={`Chaque catégorie se remplit à ${fr(taux)} % : ${fr(nSuperieure)} Supérieures, ${fr(nDeluxe)} Deluxe et ${fr(nFamiliale)} Familiales donnent ${fr(occupees[0])} + ${fr(occupees[1])} + ${fr(occupees[2])} = ${fr(vendues)} chambres vendues. On arrondit, parce qu'on ne vend pas une demi-chambre.`}
            quantite={vendues}
            unite={`chambres sur ${fr(total)}`}
            pct={taux}
            couleur="#f5b942"
          />
          <Etape
            nom="2 · Les clients — la maison se remplit"
            explication={`Le tarif est affiché pour 2 personnes : ${fr(vendues)} chambres, c'est ≈ ${fr(clients)} personnes sous le toit — davantage encore si des familles prennent des lits supplémentaires (+${fr(SUPP_LIT)} € chacun).`}
            quantite={clients}
            unite="personnes ce soir"
            pct={taux}
            couleur="#5aa9c9"
          />
          <Etape
            nom="3 · Le service — ce que ça déclenche"
            explication={`≈ ${fr(linge, 1)} kg de linge à laver, ≈ ${fr(eau)} L d'eau, ≈ ${fr(kwh)} kWh d'eau chaude — que le soleil de l'île paie en grande partie (chauffe-eau solaires sur le toit). Tout est proportionnel au nombre de personnes : un tableau de proportionnalité grandeur nature.`}
            quantite={linge}
            unite="kg de linge"
            pct={taux}
            couleur="#6ec78a"
            decimales={1}
          />
          <Etape
            nom="4 · La caisse — la recette de la nuit"
            explication={`Les chambres : ${fr(occupees[0])} × ${fr(parc[0].p)} + ${fr(occupees[1])} × ${fr(parc[1].p)} + ${fr(occupees[2])} × ${fr(parc[2].p)} = ${fr(recetteChambres)} €. Plus ${fr(pdj)} petits-déjeuners à ${fr(PDJ_ADULTE)} € = ${fr(recettePdj)} €. Total ${fr(recetteTotale)} € — dont une bonne part est mangée avant d'arriver (voir le point mort).`}
            quantite={recetteTotale}
            unite="€ pour une nuit"
            pct={taux}
            couleur="#ff9d7a"
          />
        </div>

        {/* Les sorties du jour : les trois nombres du directeur */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded border-2 border-[#f5b942] bg-[#0d2233] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8fb3c9]">💶 La recette de la nuit</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#f5b942]">{fr(recetteTotale)} €</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#cfe3ee]">
              {fr(recetteChambres)} € de chambres + {fr(recettePdj)} € de petits-déjeuners
            </p>
          </div>
          <div className="rounded border-2 border-[#5aa9c9] bg-[#0d2233] p-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8fb3c9]">📊 Le RevPAR</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#5aa9c9]">≈ {fr(revpar, 1)} €</p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#cfe3ee]">
              ce que rapporte CHAQUE chambre de la maison, vide comprise — le vrai thermomètre du métier
            </p>
          </div>
          <div
            className={`rounded border-2 bg-[#0d2233] p-3 text-center ${
              rentable ? "border-[#6ec78a]" : "border-[#ff9d7a]"
            }`}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8fb3c9]">⚖️ Le point mort</p>
            <p
              className={`mt-1 font-mono text-2xl font-bold tabular-nums ${
                rentable ? "text-[#6ec78a]" : "text-[#ff9d7a]"
              }`}
            >
              ≈ {fr(pointMort)} %
            </p>
            <p className="mt-1 text-[11.5px] leading-4 text-[#cfe3ee]">
              {rentable
                ? `à ${fr(taux)} %, la nuit passe : ${fr(resultat)} € restent une fois tout payé`
                : `à ${fr(taux)} %, la nuit ne se paie pas : il manque ${fr(Math.abs(resultat))} €`}
            </p>
          </div>
        </div>

        {/* CE QUE LA SAISON CHANGE — la même nuit, quatre prix. */}
        <div className="mt-3 rounded border border-[#1c3d55] bg-[#0d2233] p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#8fb3c9]">
            🗓️ Ce que la saison change, à remplissage identique
          </p>
          <div className="mt-3 space-y-2">
            {SAISONS.map((s, i) => {
              const r = recetteSaison(i);
              const max = Math.max(recettePointe, 1);
              return (
                <div key={s.cle} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-[12px] font-bold text-[#cfe3ee]">{s.nom}</span>
                  <span className="h-3.5 flex-1 overflow-hidden rounded-full bg-[#071726]">
                    <span
                      className="block h-full rounded-full transition-all duration-500"
                      style={{ width: Math.max(2, (r / max) * 100) + "%", backgroundColor: s.couleur }}
                    />
                  </span>
                  <span className="w-20 shrink-0 text-right font-mono text-[12.5px] font-bold tabular-nums text-[#f2f7fb]">
                    {fr(r)} €
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[12.5px] leading-6 text-[#cfe3ee]">
            Les mêmes <b className="text-[#f2f7fb]">{fr(vendues)} chambres</b>, les mêmes draps,
            le même travail — et <b className="font-mono text-[#f5b942]">{fr(ecartSaisons)} €</b>{" "}
            d&apos;écart entre une nuit de basse saison et une nuit de pointe, soit{" "}
            <b className="text-[#f2f7fb]">≈ {fr(ecartPct)} % de plus</b>. Voilà pourquoi un
            hôtelier regarde le calendrier autant que le tableau des clés.
          </p>
        </div>

        {/* Les chiffres du gérant — repliés, mais modifiables : c'est ce qui
            transforme une page de cours en outil pour la personne du métier. */}
        <details className="mt-3 rounded border border-dashed border-[#5aa9c9]/40 bg-[#0d2233] px-3 py-2.5">
          <summary className="cursor-pointer text-[11.5px] font-bold text-[#8fb3c9] hover:text-[#f2f7fb]">
            🔧 Les charges de VOTRE établissement (à régler) ▾
          </summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-[12px] leading-5 text-[#cfe3ee]">
              Charge fixe, par chambre disponible et par nuit (salaires, prêt, communs) :
              <span className="mt-1 flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={400}
                  value={chargeFixe}
                  onChange={(e) => setChargeFixe(Math.max(0, +e.target.value))}
                  className="w-28 rounded border border-[#1c3d55] bg-[#071726] px-2.5 py-1.5 font-mono text-sm text-[#f2f7fb] outline-none"
                />
                <span className="font-mono text-[11px] text-[#8fb3c9]">€</span>
              </span>
            </label>
            <label className="text-[12px] leading-5 text-[#cfe3ee]">
              Coût variable, par chambre VENDUE (ménage, linge, énergie) :
              <span className="mt-1 flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={400}
                  value={coutVariable}
                  onChange={(e) => setCoutVariable(Math.max(0, +e.target.value))}
                  className="w-28 rounded border border-[#1c3d55] bg-[#071726] px-2.5 py-1.5 font-mono text-sm text-[#f2f7fb] outline-none"
                />
                <span className="font-mono text-[11px] text-[#8fb3c9]">€</span>
              </span>
            </label>
          </div>
          <p className="mt-2 text-[11.5px] leading-5 text-[#8fb3c9]">
            Les tarifs de la grille sont publics et réels ; le nombre de chambres et les charges
            ci-dessus sont des ordres de grandeur. Mettez les vôtres : la page recalcule tout, et
            le point mort devient le vôtre.
          </p>
        </details>

        {/* Les maths de l'hôtel, affichées — jamais cachées. */}
        <div className="mt-4 rounded border border-dashed border-[#f5b942]/40 bg-[#0d2233] px-3 py-2.5 font-mono text-[12.5px] leading-relaxed text-[#f5b942]">
          chambres vendues ≈ {fr(total)} × {fr(taux / 100, 2)} ≈ <b>{fr(vendues)}</b>
          <span className="text-[#8fb3c9]"> · </span>
          prix moyen = {fr(valeurParc)} ÷ {fr(total)} ≈ <b>{fr(prixMoyen, 2)} €</b>
          <span className="text-[#8fb3c9]"> · </span>
          recette = {fr(recetteChambres)} + {fr(recettePdj)} = <b>{fr(recetteTotale)} €</b>
          <span className="text-[#8fb3c9]"> · </span>
          RevPAR = {fr(recetteChambres)} ÷ {fr(total)} ≈ <b>{fr(revpar, 1)} €</b>
          <span className="text-[#8fb3c9]"> · </span>
          point mort = {fr(chargeFixe)} ÷ ({fr(prixMoyen, 2)} − {fr(coutVariable)}) ≈{" "}
          <b>{fr(pointMort)} %</b>
        </div>

        {/* LES DÉFIS — à toi de calculer, l'hôtel vérifie */}
        <DefisSimulateur
          titre="Les défis de l'hôtel"
          coupDePouce="Coup de pouce : les défis se calculent sur la grille du haut — la machine vérifie pour toi."
          defis={DEFIS}
          couleurs={COULEURS_DEFIS}
        />

        {/* Le métier, dit aux élèves : derrière les nombres, des gens. */}
        <div className="mt-4 rounded border border-[#1c3d55] bg-[#0d2233] p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#8fb3c9]">
            🧭 Ce que fait un directeur d&apos;hôtel, en une phrase
          </p>
          <p className="mt-2 text-[13px] leading-6 text-[#cfe3ee]">
            Il arbitre entre deux nombres qui se disputent :{" "}
            <b className="text-[#f2f7fb]">le prix</b> et{" "}
            <b className="text-[#f2f7fb]">le remplissage</b>. Baisser le prix remplit la maison
            mais rapporte moins par nuit ; le monter fait le contraire. Le seul juge, c&apos;est
            leur produit — le RevPAR. Et comme la maison a trois catégories et quatre saisons, il
            arbitre sur <b className="text-[#f2f7fb]">douze cases à la fois</b>, tous les jours de
            l&apos;année. Essayez : changez la saison, cherchez le remplissage qui fait passer la
            nuit au-dessus du point mort.
          </p>
        </div>

        {/* Le pont vers les autres machines de l'île */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="/simulateurs"
            className="inline-flex items-center gap-2 rounded bg-[#f5b942] px-4 py-2 text-sm font-bold text-[#071726] hover:brightness-110"
          >
            🧰 Toutes les machines dans ta main
          </Link>
          <Link
            href="/entreprises"
            className="inline-flex items-center gap-2 rounded border border-[#1c3d55] bg-[#0d2233] px-4 py-2 text-sm font-bold text-[#f2f7fb] hover:brightness-125"
          >
            🚀 Votre métier peut devenir une machine
          </Link>
        </div>
      </main>

      {/* Le garde-fou d'honnêteté. */}
      <footer className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[#1c3d55] px-5 py-2.5 text-[11.5px] text-[#8fb3c9]">
        <span>
          Page réalisée avec l&apos;hôtel <b className="text-[#cfe3ee]">Le Terre Sainte</b>{" "}
          (Saint-Pierre, La Réunion), qui a ouvert sa grille : les tarifs publics 2026 sont les
          siens. Le nombre de chambres, les charges et les consommations sont des ordres de
          grandeur arrondis, faits pour être remplacés par les vrais. Ce n&apos;est pas une
          publicité : c&apos;est un métier de l&apos;île raconté aux élèves, et la maison a
          validé avant publication.
        </span>
        <span className="ml-auto font-mono">
          Un jeu du <b className="font-bold text-[#f5b942]">Journal d&apos;EleveAI</b> 🦎
        </span>
      </footer>
    </div>
  );
}
