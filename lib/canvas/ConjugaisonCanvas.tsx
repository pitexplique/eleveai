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

const FONT_MOT = 15;
const FONT_NOTE = 10;
const FONT_ETIQUETTE = 11;
const FONT_TITRE = 12;

const PAD_X = 12;
const GAP_WAGON = 8;
const H_WAGON = 34;
const RAYON_ROUE = 3.5;

// Large exprès : un dessin trop aéré se lit, deux étiquettes qui se touchent ne
// se lisent pas (REGLES.md § 2 ter).
function largeurTexte(texte: string, fontSize: number) {
  return texte.length * fontSize * 0.6;
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
      {note ? (
        <text
          x={x + largeur / 2}
          y={y + H_WAGON + 2 * RAYON_ROUE + 13}
          textAnchor="middle"
          fontSize={FONT_NOTE}
          fontWeight={600}
          fill={couleur.text}
        >
          {note}
        </text>
      ) : null}
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
  const width = figure.size?.width ?? 250;
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

    const largeurs = segments.map((s) =>
      Math.max(30, largeurTexte(s.texte, FONT_MOT) + 18, s.note ? largeurTexte(s.note, FONT_NOTE) + 6 : 0)
    );
    const largeurTrain =
      largeurs.reduce((a, b) => a + b, 0) + GAP_WAGON * (segments.length - 1);
    const largeurTotale = largeurPronom + (pronom ? GAP_WAGON + 4 : 0) + largeurTrain;

    // Le dessin se dimensionne sur son contenu : on ne force pas un cadre qui
    // laisserait le sujet occuper un quart de sa place (REGLES § 2 ter).
    const w = Math.max(width, largeurTotale + 2 * PAD_X);
    const yWagons = yEnTete + 12;
    const hauteurNotes = segments.some((s) => s.note) ? 16 : 0;
    const yLegende = yWagons + H_WAGON + 2 * RAYON_ROUE + hauteurNotes + 14;
    const h = yLegende + (legende ? 6 : -8);

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
              x={x + largeurPronom / 2}
              y={yWagons + H_WAGON / 2 + 5}
              textAnchor="middle"
              fontSize={FONT_MOT}
              fontWeight={700}
              fill="#334155"
            >
              {pronom}
            </text>
            {(() => {
              x += largeurPronom + GAP_WAGON + 4;
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
          <text x={w / 2} y={yLegende} textAnchor="middle" fontSize={FONT_ETIQUETTE} fill="#475569">
            {legende}
          </text>
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
    const lAux = Math.max(
      40,
      largeurTexte(aux.texte, FONT_MOT) + 18,
      aux.note ? largeurTexte(aux.note, FONT_NOTE) + 6 : 0
    );
    const lPart = Math.max(
      40,
      largeurTexte(part.texte, FONT_MOT) + 18,
      part.note ? largeurTexte(part.note, FONT_NOTE) + 6 : 0
    );
    const largeurTotale = largeurPronom + (pronom ? GAP_WAGON + 4 : 0) + lAux + GAP_WAGON + lPart;
    const w = Math.max(width, largeurTotale + 2 * PAD_X);

    // L'arc d'accord passe AU-DESSUS, comme dans `phrase` : le lecteur n'a
    // qu'une grammaire visuelle à apprendre pour toute la matière.
    const hauteurArc = figure.accord ? 24 : 0;
    const yWagons = yEnTete + 12 + hauteurArc;
    const hauteurNotes = aux.note || part.note ? 16 : 0;
    const yLegende = yWagons + H_WAGON + 2 * RAYON_ROUE + hauteurNotes + 14;
    const h = yLegende + (legende ? 6 : -8);

    const xPronom = (w - largeurTotale) / 2;
    const xAux = xPronom + (pronom ? largeurPronom + GAP_WAGON + 4 : 0);
    const xPart = xAux + lAux + GAP_WAGON;

    const depart = pronom ? xPronom + largeurPronom / 2 : xAux + lAux / 2;
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
            x={xPronom + largeurPronom / 2}
            y={yWagons + H_WAGON / 2 + 5}
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
          <text x={w / 2} y={yLegende} textAnchor="middle" fontSize={FONT_ETIQUETTE} fill="#475569">
            {legende}
          </text>
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
    const h = yLegende + (legende ? 6 : -8);
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
          <text x={w / 2} y={yLegende} textAnchor="middle" fontSize={FONT_ETIQUETTE} fill="#475569">
            {legende}
          </text>
        ) : null}
      </svg>
    );
  }

  // ══ MODE FRISE ════════════════════════════════════════════════════════════
  // Passé · présent · futur, et les temps posés dessus. C'est le seul mode qui
  // ne démonte rien : la valeur d'un temps n'est pas dans sa forme, elle est
  // dans le moment qu'il désigne — et cela se montre sur une ligne du temps.
  const reperes = figure.reperes ?? [];
  /* ⛔ LA FRISE DEMANDE UN BLOC LARGE, ET ELLE LE DIT EN LE PRENANT.
     Première version : les repères étaient écrits en 11 px, et
     `scripts/apercu-canvas.mjs` a refusé le dessin — 9,9 px une fois mis à
     l'échelle d'une carte de 250. Le seuil est à 11.
     Baisser encore la police aurait été la mauvaise réparation : c'est la
     LARGEUR qui manque, pas la place. Les repères sont donc écrits comme le
     reste du canvas (15 px) et la frise calcule sa largeur sur eux. Elle sort
     à ~410 px : elle va dans un bloc d'exemple ou de méthode, PAS dans une
     carte de propriété sur trois colonnes. C'est écrit dans le type. */
  const largeurRepere = reperes.length
    ? Math.max(...reperes.map((r) => largeurTexte(r.texte, FONT_MOT))) + 16
    : 70;
  const w = Math.max(width, 3 * (largeurRepere + 8) + 2 * PAD_X);
  const empilementMax = Math.max(
    1,
    ...["passe", "present", "futur"].map((z) => reperes.filter((r) => r.zone === z).length)
  );
  const yLigne = yTitre + 22 + empilementMax * 26;
  const yLegendeF = yLigne + 44;
  const h = yLegendeF + (legende ? 6 : -8);

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
              const lw = Math.max(46, largeurTexte(r.texte, FONT_MOT) + 14);
              const y = yLigne - 18 - j * 26;
              return (
                <g key={j}>
                  <rect
                    x={cx - lw / 2}
                    y={y - 15}
                    width={lw}
                    height={22}
                    rx={5}
                    fill={PALETTE.temps.fill}
                    stroke={PALETTE.temps.stroke}
                    strokeWidth={1.2}
                  />
                  <text
                    x={cx}
                    y={y}
                    textAnchor="middle"
                    fontSize={FONT_MOT}
                    fontWeight={700}
                    fill={PALETTE.temps.text}
                  >
                    {r.texte}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}

      {legende ? (
        <text x={w / 2} y={yLegendeF} textAnchor="middle" fontSize={FONT_ETIQUETTE} fill="#475569">
          {legende}
        </text>
      ) : null}
    </svg>
  );
}
