// lib/canvas/ConjugaisonCanvas.tsx
"use client";

import type { CanvasFigure, ConjugaisonCanvasData } from "@/lib/tutor-v4/types";

// ─── LE CANVAS DE LA CONJUGAISON ──────────────────────────────────────────────
// Voir le bloc de commentaire de `ConjugaisonCanvasData` (types_canvas.ts) pour
// ce qu'il montre et pourquoi il existe. Ici : comment il se dessine.
//
// ⭐ DES WAGONS, ET CE N'EST PAS UN DÉCOR. Une forme verbale est un mot ASSEMBLÉ
// — le BO parle de « la composition de la terminaison » et de « la composition
// en deux parties » des temps composés. Des caisses posées sur leurs roues et
// accrochées les unes aux autres disent exactement cela, et un enfant de dix ans
// le lit sans qu'on le lui explique. Frédéric, 23/08 : « à cet âge il faut des
// dessins », « ou schéma ludique ».
//
// ⚠️ LA POLICE NE DESCEND PAS SOUS 15 POUR LE TEXTE PRINCIPAL. Même raison que
// dans `PhraseCanvas` : le bloc qui reçoit un dessin ne fait que 201 px sur un
// téléphone, un dessin de 250 px s'y affiche à 0,80, et 15 px arrivent à 12.
// C'est le seuil mesuré par `scripts/apercu-canvas.mjs`, qui refuse sous 11.

type Props = { figure: CanvasFigure };

function isConjugaisonCanvas(figure: CanvasFigure): figure is ConjugaisonCanvasData {
  return figure.kind === "conjugaison";
}

// ⭐ LA COULEUR PORTE LE RÔLE, DANS TOUTE LA MATIÈRE — même principe que les
// fonctions dans `phrase`. La fiche écrit `role: "temps"`, jamais « #d97706 » :
// deux fiches ne peuvent donc pas diverger, et l'élève n'apprend la couleur
// qu'une fois.
const PALETTE = {
  radical: { fill: "#dbeafe", stroke: "#2563eb", text: "#1d4ed8" },
  temps: { fill: "#fef3c7", stroke: "#d97706", text: "#b45309" },
  personne: { fill: "#dcfce7", stroke: "#16a34a", text: "#15803d" },
  // L'auxiliaire est rouge comme le verbe l'est dans `phrase` : c'est le même
  // objet, le verbe conjugué, et il garde sa couleur d'une matière à l'autre.
  auxiliaire: { fill: "#fee2e2", stroke: "#dc2626", text: "#b91c1c" },
  participe: { fill: "#ede9fe", stroke: "#7c3aed", text: "#6d28d9" },
  neutre: { fill: "#f1f5f9", stroke: "#94a3b8", text: "#475569" },
} as const;

// ⛔ AUCUNE POLICE SOUS 11 UNE FOIS À L'ÉCHELLE (24/08/2026, REGLES.md § 2
// quater). La note sous un wagon était à 10 et l'étiquette à 11 : sur les huit
// fiches de conjugaison du CM2 et de la 6e, mesurées, la police minimale
// tombait entre 6,9 et 8,0 px dans la carte de méthode d'un téléphone. On écrit
// 12, comme dans `PhraseCanvas` depuis le même jour — 11 ne suffit pas, le
// moindre rapport de 0,98 le fait retomber à 10,8.
const FONT_MOT = 15;
const FONT_NOTE = 12;
const FONT_ETIQUETTE = 12;
const FONT_TITRE = 12;

const PAD_X = 12;
const GAP_WAGON = 8;
const H_WAGON = 34;
const RAYON_ROUE = 3.5;

// Large exprès : un dessin trop aéré se lit, deux étiquettes qui se touchent ne
// se lisent pas (REGLES.md § 2 ter).
function largeurTexte(texte: string, fontSize: number) {
  return texte.length * fontSize * 0.62;
}

/**
 * ⭐ LA NOTE PASSE À LA LIGNE, ELLE N'ÉLARGIT PLUS LE WAGON (24/08/2026).
 *
 * C'était LA cause de l'illisibilité des fiches de conjugaison, et le CATALOGUE
 * la nommait sans en tirer la conséquence : « les note sous les wagons se
 * comptent en caractères — c'est la NOTE, et non le mot, qui fixe la largeur
 * d'un wagon ». Un train « chant- / i- / -ons » noté « radical / imparfait /
 * 1re pers. plur. » mesurait 270 px de large pour trois mots de cinq lettres.
 * Dans une carte de méthode de 201 px, tout le dessin était réduit de 26 %.
 *
 * Le wagon se dimensionne donc sur SON MOT, et la note se plie dessous — même
 * principe que la phrase dans `PhraseCanvas` : on perd de la hauteur, jamais de
 * la taille de lettre. Deux lignes au maximum ; au-delà, c'est que la note est
 * une phrase, et une phrase va dans la légende.
 */
function couperNote(
  note: string,
  largeurDispo: number,
  fontSize: number,
  maxLignes = 2
): string[] {
  if (largeurTexte(note, fontSize) <= largeurDispo) return [note];
  const lignes: string[] = [];
  let courante = "";
  for (const mot of note.split(" ")) {
    const essai = courante ? `${courante} ${mot}` : mot;
    if (courante && largeurTexte(essai, fontSize) > largeurDispo) {
      lignes.push(courante);
      courante = mot;
    } else {
      courante = essai;
    }
  }
  if (courante) lignes.push(courante);
  return lignes.slice(0, maxLignes);
}

const H_LIGNE_NOTE = 13;
const H_LIGNE_LEGENDE = 14;

/**
 * ⛔ LA LÉGENDE NE SE PLIAIT PAS, ET ELLE SORTAIT DU CADRE (24/08/2026).
 *
 * Elle était écrite en une seule ligne centrée sur `w/2`. Tant que le canvas
 * faisait 250 px de large, la plupart des légendes y tenaient ; ramené à 190
 * pour rester lisible sur un téléphone, il n'en tenait plus une seule —
 * « Le "r" signale toujours le futur » occupait [-35 ; 225] dans un cadre de
 * 190. Un SVG masque ce qui dépasse : la légende n'était pas mal placée, elle
 * était coupée aux deux bouts, et rien à l'écran ne le disait.
 *
 * `PhraseCanvas` plie la sienne depuis le 20/08 ; c'est la même règle, appliquée
 * au second canvas de la matière avec quatre jours de retard.
 */
function lignesLegende(texte: string, w: number) {
  return couperNote(texte, w - 2 * PAD_X, FONT_ETIQUETTE, 3);
}

function Legende({ texte, w, y }: { texte: string; w: number; y: number }) {
  return (
    <>
      {lignesLegende(texte, w).map((ligne, i) => (
        <text
          key={i}
          x={w / 2}
          y={y + i * H_LIGNE_LEGENDE}
          textAnchor="middle"
          fontSize={FONT_ETIQUETTE}
          fill="#475569"
        >
          {ligne}
        </text>
      ))}
    </>
  );
}

/** Une caisse sur deux roues. C'est l'unité de tout le canvas. */
function Wagon({
  x,
  y,
  largeur,
  texte,
  note,
  couleur,
  alerte,
}: {
  x: number;
  y: number;
  largeur: number;
  texte: string;
  note?: string;
  couleur: { fill: string; stroke: string; text: string };
  alerte?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={largeur}
        height={H_WAGON}
        rx={6}
        fill={couleur.fill}
        stroke={couleur.stroke}
        strokeWidth={alerte ? 2.5 : 1.5}
      />
      <text
        x={x + largeur / 2}
        y={y + H_WAGON / 2 + 5}
        textAnchor="middle"
        fontSize={FONT_MOT}
        fontWeight={700}
        fill={couleur.text}
      >
        {texte}
      </text>
      {/* Les roues. Deux cercles suffisent : au-delà, le dessin devient un jouet
          et cesse d'être un schéma. */}
      <circle cx={x + largeur * 0.28} cy={y + H_WAGON + RAYON_ROUE} r={RAYON_ROUE} fill={couleur.stroke} />
      <circle cx={x + largeur * 0.72} cy={y + H_WAGON + RAYON_ROUE} r={RAYON_ROUE} fill={couleur.stroke} />
      {note
        ? couperNote(note, largeur - 2, FONT_NOTE).map((ligne, i) => (
            <text
              key={i}
              x={x + largeur / 2}
              y={y + H_WAGON + 2 * RAYON_ROUE + 13 + i * H_LIGNE_NOTE}
              textAnchor="middle"
              fontSize={FONT_NOTE}
              fontWeight={600}
              fill={couleur.text}
            >
              {ligne}
            </text>
          ))
        : null}
    </g>
  );
}

/** L'attelage entre deux wagons : deux petits traits et un crochet. */
function Attelage({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="#94a3b8" strokeWidth={2} strokeLinecap="round">
      <line x1={x} y1={y + H_WAGON / 2} x2={x + GAP_WAGON} y2={y + H_WAGON / 2} />
    </g>
  );
}

export default function ConjugaisonCanvas({ figure }: Props) {
  if (!isConjugaisonCanvas(figure)) return null;

  const mode = figure.mode ?? "wagons";
  // ⛔ 250 ÉTAIT LE PLANCHER DE LARGEUR, DONC LE PLAFOND DE LISIBILITÉ
  // (24/08/2026). `w = Math.max(width, contenu)` : tant que ce défaut valait
  // 250, aucun dessin ne pouvait descendre en dessous, et la carte de méthode
  // d'un téléphone n'en fait que 201 — soit une réduction de 20 % imposée même
  // aux dessins qui tenaient. À 190, un petit train reste petit et n'est plus
  // réduit du tout.
  const width = figure.size?.width ?? 190;
  const legende = figure.legende;

  // ── Le bandeau du haut : l'infinitif et le pronom ─────────────────────────
  const enTete = [figure.infinitif ? `infinitif : ${figure.infinitif}` : null]
    .filter(Boolean)
    .join("");
  const yTitre = figure.titre ? 16 : 0;
  const yEnTete = yTitre + (enTete ? 15 : 0);

  // ══ MODE WAGONS ═══════════════════════════════════════════════════════════
  if (mode === "wagons") {
    const segments = figure.segments ?? [];
    if (segments.length === 0) return null;

    const pronom = figure.pronom;
    const largeurPronom = pronom ? largeurTexte(pronom, FONT_MOT) + 14 : 0;

    // ⛔ LA NOTE NE DICTE PLUS LA LARGEUR (24/08/2026) : elle se plie sous le
    // wagon. Voir `couperNote`. Le wagon se mesure sur son mot, et c'est tout.
    const largeurs = segments.map((s) =>
      Math.max(30, largeurTexte(s.texte, FONT_MOT) + 18)
    );
    const largeurTrain =
      largeurs.reduce((a, b) => a + b, 0) + GAP_WAGON * (segments.length - 1);
    // ⭐ QUAND ÇA NE TIENT PAS, ON EMPILE (REGLES.md § 2 ter). Un train de trois
    // wagons précédé de « nous » dépassait 250 px ; le pronom passe au-dessus et
    // rend au train les cinquante pixels qu'il lui prenait. Voir le même
    // arbitrage en mode `composee`.
    const largeurEnLigne = largeurPronom + (pronom ? GAP_WAGON + 4 : 0) + largeurTrain;
    const pronomDessus = Boolean(pronom) && largeurEnLigne + 2 * PAD_X > width;
    const largeurTotale = pronomDessus ? largeurTrain : largeurEnLigne;

    // Le dessin se dimensionne sur son contenu : on ne force pas un cadre qui
    // laisserait le sujet occuper un quart de sa place (REGLES § 2 ter).
    const w = Math.max(width, largeurTotale + 2 * PAD_X);
    const yPronomDessus = yEnTete + 12;
    const yWagons = yEnTete + 12 + (pronomDessus ? 16 : 0);
    // La bande des notes fait la hauteur de la note la PLUS PLIÉE : sinon la
    // deuxième ligne d'une note passe sous la légende.
    const lignesNoteMax = Math.max(
      0,
      ...segments.map((s, i) => (s.note ? couperNote(s.note, largeurs[i] - 2, FONT_NOTE).length : 0))
    );
    const hauteurNotes = lignesNoteMax ? 3 + lignesNoteMax * H_LIGNE_NOTE : 0;
    const yLegende = yWagons + H_WAGON + 2 * RAYON_ROUE + hauteurNotes + 14;
    const h = yLegende + (legende ? (lignesLegende(legende, w).length - 1) * H_LIGNE_LEGENDE + 6 : -8);

    let x = (w - largeurTotale) / 2;

    return (
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }} role="img">
        {figure.titre ? (
          <text x={w / 2} y={12} textAnchor="middle" fontSize={FONT_TITRE} fontWeight={700} fill="#475569">
            {figure.titre}
          </text>
        ) : null}
        {enTete ? (
          <text x={w / 2} y={yTitre + 11} textAnchor="middle" fontSize={FONT_ETIQUETTE} fill="#64748b">
            {enTete}
          </text>
        ) : null}

        {pronom ? (
          <>
            <text
              x={pronomDessus ? w / 2 : x + largeurPronom / 2}
              y={pronomDessus ? yPronomDessus + 4 : yWagons + H_WAGON / 2 + 5}
              textAnchor="middle"
              fontSize={FONT_MOT}
              fontWeight={700}
              fill="#334155"
            >
              {pronom}
            </text>
            {(() => {
              if (!pronomDessus) x += largeurPronom + GAP_WAGON + 4;
              return null;
            })()}
          </>
        ) : null}

        {segments.map((s, i) => {
          const xi = x;
          x += largeurs[i] + GAP_WAGON;
          return (
            <g key={i}>
              <Wagon
                x={xi}
                y={yWagons}
                largeur={largeurs[i]}
                texte={s.texte}
                note={s.note}
                couleur={PALETTE[s.role] ?? PALETTE.neutre}
                alerte={s.alerte}
              />
              {i < segments.length - 1 ? <Attelage x={xi + largeurs[i]} y={yWagons} /> : null}
            </g>
          );
        })}

        {legende ? (
          <Legende texte={legende} w={w} y={yLegende} />
        ) : null}
      </svg>
    );
  }

  // ══ MODE COMPOSÉE ═════════════════════════════════════════════════════════
  // Deux caisses accrochées : c'est « la composition en deux parties » du BO,
  // rendue littérale. La flèche d'accord — ou la croix qui dit son absence —
  // part du sujet et arrive sur le participe.
  if (mode === "composee") {
    const aux = figure.auxiliaire;
    const part = figure.participe;
    if (!aux || !part) return null;

    const pronom = figure.pronom;
    const largeurPronom = pronom ? largeurTexte(pronom, FONT_MOT) + 14 : 0;
    // Même règle qu'en mode wagons : la note se plie, elle n'élargit pas.
    const lAux = Math.max(40, largeurTexte(aux.texte, FONT_MOT) + 18);
    const lPart = Math.max(40, largeurTexte(part.texte, FONT_MOT) + 18);
    // ⭐ QUAND ÇA NE TIENT PAS, ON EMPILE — ON NE RÉDUIT PAS (REGLES.md § 2 ter,
    // 24/08/2026). « nous avons regardé » alignait pronom + deux caisses sur
    // 252 px ; dans la carte de méthode d'un téléphone, qui n'en fait que 201,
    // le dessin entier était réduit à 0,80 et ses notes tombaient à 9,6 px. Le
    // pronom passe donc AU-DESSUS du train, et les 51 px qu'il prenait en
    // largeur reviennent aux deux caisses. C'est le même arbitrage que partout
    // ailleurs : on perd de la hauteur, jamais de la taille de lettre.
    const largeurTrain = lAux + GAP_WAGON + lPart;
    const largeurEnLigne = largeurPronom + (pronom ? GAP_WAGON + 4 : 0) + largeurTrain;
    const pronomDessus = Boolean(pronom) && largeurEnLigne + 2 * PAD_X > width;
    const largeurTotale = pronomDessus ? largeurTrain : largeurEnLigne;
    const w = Math.max(width, largeurTotale + 2 * PAD_X);

    // L'arc d'accord passe AU-DESSUS, comme dans `phrase` : le lecteur n'a
    // qu'une grammaire visuelle à apprendre pour toute la matière.
    const hauteurArc = figure.accord ? 24 : 0;
    const yPronomDessus = yEnTete + 12;
    const yWagons = yEnTete + 12 + (pronomDessus ? 16 : 0) + hauteurArc;
    const lignesNoteMax = Math.max(
      aux.note ? couperNote(aux.note, lAux - 2, FONT_NOTE).length : 0,
      part.note ? couperNote(part.note, lPart - 2, FONT_NOTE).length : 0
    );
    const hauteurNotes = lignesNoteMax ? 3 + lignesNoteMax * H_LIGNE_NOTE : 0;
    const yLegende = yWagons + H_WAGON + 2 * RAYON_ROUE + hauteurNotes + 14;
    const h = yLegende + (legende ? (lignesLegende(legende, w).length - 1) * H_LIGNE_LEGENDE + 6 : -8);

    const xPronom = (w - largeurTotale) / 2;
    const xAux = xPronom + (pronom && !pronomDessus ? largeurPronom + GAP_WAGON + 4 : 0);
    const xPart = xAux + lAux + GAP_WAGON;

    const depart = pronomDessus
      ? w / 2
      : pronom
        ? xPronom + largeurPronom / 2
        : xAux + lAux / 2;
    const arrivee = xPart + lPart / 2;
    const yArc = yWagons - 6;

    return (
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }} role="img">
        {figure.titre ? (
          <text x={w / 2} y={12} textAnchor="middle" fontSize={FONT_TITRE} fontWeight={700} fill="#475569">
            {figure.titre}
          </text>
        ) : null}

        {figure.accord ? (
          <g>
            <path
              d={`M ${depart} ${yArc} Q ${(depart + arrivee) / 2} ${yArc - 20} ${arrivee} ${yArc}`}
              fill="none"
              stroke={figure.accord.absent ? "#dc2626" : "#334155"}
              strokeWidth={1.6}
              strokeDasharray={figure.accord.absent ? "4 3" : undefined}
            />
            {figure.accord.absent ? (
              // ⛔ LA CROIX EST LE POINT DU DESSIN. « Elle a mangé une mangue »
              // n'accorde pas : montrer l'absence d'accord par un arc barré est
              // plus fort que de l'écrire sous la phrase.
              <g stroke="#dc2626" strokeWidth={2.2} strokeLinecap="round">
                <line
                  x1={(depart + arrivee) / 2 - 5}
                  y1={yArc - 15}
                  x2={(depart + arrivee) / 2 + 5}
                  y2={yArc - 5}
                />
                <line
                  x1={(depart + arrivee) / 2 + 5}
                  y1={yArc - 15}
                  x2={(depart + arrivee) / 2 - 5}
                  y2={yArc - 5}
                />
              </g>
            ) : figure.accord.label ? (
              <text
                x={(depart + arrivee) / 2}
                y={yArc - 13}
                textAnchor="middle"
                fontSize={FONT_NOTE}
                fontWeight={700}
                fill="#334155"
              >
                {figure.accord.label}
              </text>
            ) : null}
          </g>
        ) : null}

        {pronom ? (
          <text
            x={pronomDessus ? w / 2 : xPronom + largeurPronom / 2}
            y={pronomDessus ? yPronomDessus + 4 : yWagons + H_WAGON / 2 + 5}
            textAnchor="middle"
            fontSize={FONT_MOT}
            fontWeight={700}
            fill="#334155"
          >
            {pronom}
          </text>
        ) : null}

        <Wagon
          x={xAux}
          y={yWagons}
          largeur={lAux}
          texte={aux.texte}
          note={aux.note}
          couleur={PALETTE.auxiliaire}
        />
        <Attelage x={xAux + lAux} y={yWagons} />
        <Wagon
          x={xPart}
          y={yWagons}
          largeur={lPart}
          texte={part.texte}
          note={part.note}
          couleur={PALETTE.participe}
        />

        {legende ? (
          <Legende texte={legende} w={w} y={yLegende} />
        ) : null}
      </svg>
    );
  }

  // ══ MODE TABLEAU ══════════════════════════════════════════════════════════
  // Les six personnes, radical et terminaison séparés par un trait. C'est le
  // seul mode qui empile — parce que la variation du radical ne se voit qu'en
  // comparant les lignes entre elles.
  if (mode === "tableau") {
    const lignes = figure.lignes ?? [];
    if (lignes.length === 0) return null;

    const lPronom = Math.max(...lignes.map((l) => largeurTexte(l.pronom, FONT_MOT))) + 10;
    const lRadical = Math.max(...lignes.map((l) => largeurTexte(l.radical, FONT_MOT))) + 12;
    const lTerm = Math.max(...lignes.map((l) => largeurTexte(l.terminaison, FONT_MOT))) + 12;
    const largeurTotale = lPronom + lRadical + lTerm;
    const w = Math.max(width, largeurTotale + 2 * PAD_X);

    const hLigne = 24;
    const yEntete = yTitre + (figure.temps ? 14 : 0);
    const yPremiere = yEntete + 12;
    const yLegende = yPremiere + lignes.length * hLigne + 14;
    const h = yLegende + (legende ? (lignesLegende(legende, w).length - 1) * H_LIGNE_LEGENDE + 6 : -8);
    const x0 = (w - largeurTotale) / 2;

    return (
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }} role="img">
        {figure.titre ? (
          <text x={w / 2} y={12} textAnchor="middle" fontSize={FONT_TITRE} fontWeight={700} fill="#475569">
            {figure.titre}
          </text>
        ) : null}
        {figure.temps ? (
          <text x={w / 2} y={yTitre + 10} textAnchor="middle" fontSize={FONT_ETIQUETTE} fill="#64748b">
            {figure.temps}
          </text>
        ) : null}

        {lignes.map((l, i) => {
          const y = yPremiere + i * hLigne;
          const cRad = l.alerte ? PALETTE.temps : PALETTE.radical;
          return (
            <g key={i}>
              <text x={x0 + lPronom - 6} y={y + 15} textAnchor="end" fontSize={FONT_MOT} fill="#334155">
                {l.pronom}
              </text>
              <rect
                x={x0 + lPronom}
                y={y}
                width={lRadical}
                height={hLigne - 4}
                rx={4}
                fill={cRad.fill}
                stroke={cRad.stroke}
                strokeWidth={l.alerte ? 2 : 1}
              />
              <text
                x={x0 + lPronom + lRadical / 2}
                y={y + 15}
                textAnchor="middle"
                fontSize={FONT_MOT}
                fontWeight={700}
                fill={cRad.text}
              >
                {l.radical}
              </text>
              <rect
                x={x0 + lPronom + lRadical}
                y={y}
                width={lTerm}
                height={hLigne - 4}
                rx={4}
                fill={PALETTE.personne.fill}
                stroke={PALETTE.personne.stroke}
                strokeWidth={1}
              />
              <text
                x={x0 + lPronom + lRadical + lTerm / 2}
                y={y + 15}
                textAnchor="middle"
                fontSize={FONT_MOT}
                fontWeight={700}
                fill={PALETTE.personne.text}
              >
                {l.terminaison}
              </text>
            </g>
          );
        })}

        {legende ? (
          <Legende texte={legende} w={w} y={yLegende} />
        ) : null}
      </svg>
    );
  }

  // ══ MODE FRISE ════════════════════════════════════════════════════════════
  // Passé · présent · futur, et les temps posés dessus. C'est le seul mode qui
  // ne démonte rien : la valeur d'un temps n'est pas dans sa forme, elle est
  // dans le moment qu'il désigne — et cela se montre sur une ligne du temps.
  const reperes = figure.reperes ?? [];
  /* ⛔ LA FRISE PRENAIT SA LARGEUR SUR LE PLUS LONG DE SES REPÈRES, EN ENTIER.
     Écrits en 15 px et jamais pliés, « passé composé » ou « plus-que-parfait »
     poussaient la frise à 291 px — et dans la carte de méthode d'un téléphone,
     qui n'en fait que 201, tout le dessin y était réduit à 0,69 : les repères
     arrivaient à 10,3 px et les zones à 8,3.

     ⚠️ LA VERSION PRÉCÉDENTE AVAIT DÉJÀ VU LE PROBLÈME ET CHOISI L'INVERSE —
     « c'est la LARGEUR qui manque, pas la place », donc on prenait la largeur.
     C'était juste tant qu'on regardait un écran d'ordinateur. Sur un téléphone,
     la largeur n'est pas à prendre : elle n'existe pas. On plie donc le repère
     en deux lignes, comme la note sous un wagon et comme la phrase dans
     `PhraseCanvas` — la frise perd de la hauteur et garde ses lettres. */
  const lignesRepere = reperes.map((r) => couperNote(r.texte, 62, FONT_ETIQUETTE));
  const largeurRepere = lignesRepere.length
    ? Math.max(
        ...lignesRepere.flat().map((ligne) => largeurTexte(ligne, FONT_ETIQUETTE))
      ) + 12
    : 60;
  const w = Math.max(width, 3 * (largeurRepere + 6) + 2 * PAD_X);
  const empilementMax = Math.max(
    1,
    ...["passe", "present", "futur"].map((z) => reperes.filter((r) => r.zone === z).length)
  );
  // Un repère plié en deux lignes est plus haut : le pas d'empilement suit, sinon
  // la deuxième ligne du repère du dessous passe sous l'étiquette du dessus.
  const lignesMax = Math.max(1, ...lignesRepere.map((l) => l.length));
  const hBoite = 8 + lignesMax * 14;
  const PAS_REPERE = hBoite + 6;
  const yLigne = yTitre + 22 + empilementMax * PAS_REPERE;
  const yLegendeF = yLigne + 44;
  const h = yLegendeF + (legende ? (lignesLegende(legende, w).length - 1) * H_LIGNE_LEGENDE + 6 : -8);

  const zones: Array<{ id: "passe" | "present" | "futur"; label: string }> = [
    { id: "passe", label: "passé" },
    { id: "present", label: "présent" },
    { id: "futur", label: "futur" },
  ];
  const largeurZone = (w - 2 * PAD_X) / 3;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }} role="img">
      {figure.titre ? (
        <text x={w / 2} y={12} textAnchor="middle" fontSize={FONT_TITRE} fontWeight={700} fill="#475569">
          {figure.titre}
        </text>
      ) : null}

      {/* La flèche du temps : elle va vers la droite, et elle ne s'arrête pas. */}
      <defs>
        <marker id="fleche-temps" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#94a3b8" />
        </marker>
      </defs>
      <line
        x1={PAD_X}
        y1={yLigne}
        x2={w - PAD_X}
        y2={yLigne}
        stroke="#94a3b8"
        strokeWidth={2}
        markerEnd="url(#fleche-temps)"
      />

      {zones.map((z, i) => {
        const cx = PAD_X + largeurZone * (i + 0.5);
        const dedans = reperes.filter((r) => r.zone === z.id);
        return (
          <g key={z.id}>
            <line x1={cx} y1={yLigne - 5} x2={cx} y2={yLigne + 5} stroke="#94a3b8" strokeWidth={2} />
            <text x={cx} y={yLigne + 19} textAnchor="middle" fontSize={FONT_NOTE} fontWeight={700} fill="#64748b">
              {z.label}
            </text>
            {dedans.map((r, j) => {
              const lignes = couperNote(r.texte, 62, FONT_ETIQUETTE);
              const lw = Math.max(
                46,
                ...lignes.map((ligne) => largeurTexte(ligne, FONT_ETIQUETTE) + 12)
              );
              const yBas = yLigne - 12 - j * PAS_REPERE;
              return (
                <g key={j}>
                  <rect
                    x={cx - lw / 2}
                    y={yBas - hBoite}
                    width={lw}
                    height={hBoite}
                    rx={5}
                    fill={PALETTE.temps.fill}
                    stroke={PALETTE.temps.stroke}
                    strokeWidth={1.2}
                  />
                  {lignes.map((ligne, k) => (
                    <text
                      key={k}
                      x={cx}
                      y={yBas - hBoite + 8 + (k + 1) * 12 - 2}
                      textAnchor="middle"
                      fontSize={FONT_ETIQUETTE}
                      fontWeight={700}
                      fill={PALETTE.temps.text}
                    >
                      {ligne}
                    </text>
                  ))}
                </g>
              );
            })}
          </g>
        );
      })}

      {legende ? (
        <Legende texte={legende} w={w} y={yLegendeF} />
      ) : null}
    </svg>
  );
}
