"use client";

// « Dans l'œil du cyclone » — portage fidèle du prototype validé (artifact v0.1).
// Principe : l'élève A LA MAIN — il pose le cyclone, trace sa route (8 points),
// règle force et vitesse, lance : rotation HORAIRE (hémisphère sud), alertes
// réunionnaises (jaune → orange → rouge → violette), et la formule t = d ÷ v
// affichée en direct (les maths de la vigie, jamais cachées).
//
// Choix technique : la logique du jeu est impérative (SVG construit au montage
// dans un useEffect, comme le prototype éprouvé) — React ne gère que le cadre.
// ⚠️ Garde-fou non négociable : bandeau « outil pédagogique, suivez
// Météo-France et la préfecture » — jamais confondable avec la prévision
// officielle (c'est aussi la protection d'EleveAI).

import { useEffect, useRef } from "react";

export default function SimulateurCycloneClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // ── Projection : lon 38→68 °E sur x 0→1000 ; lat −8→−30 sur y 0→660 ───
    const LON0 = 38, LON1 = 68, LAT0 = -8, LAT1 = -30, W = 1000, H = 660;
    const toX = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
    const toY = (lat: number) => ((lat - LAT0) / (LAT1 - LAT0)) * H;
    const toLon = (x: number) => LON0 + (x / W) * (LON1 - LON0);
    const toLat = (y: number) => LAT0 + (y / H) * (LAT1 - LAT0);

    type P = { lon: number; lat: number };
    // Distance en km (plate carrée corrigée — juste assez pour un jouet pédagogique).
    function km(a: P, b: P) {
      const latM = (((a.lat + b.lat) / 2) * Math.PI) / 180;
      const dx = (b.lon - a.lon) * 111.32 * Math.cos(latM);
      const dy = (b.lat - a.lat) * 110.57;
      return Math.hypot(dx, dy);
    }

    const REUNION: P = { lon: 55.53, lat: -21.11 };
    const CATS = [
      { nom: "dépression tropicale", vent: 55, rayon: 26, rot: "4s" },
      { nom: "tempête tropicale", vent: 100, rayon: 34, rot: "3.2s" },
      { nom: "cyclone tropical", vent: 150, rayon: 44, rot: "2.4s" },
      { nom: "cyclone intense", vent: 190, rayon: 54, rot: "1.8s" },
    ];

    const svg = root.querySelector<SVGSVGElement>("#simcy-carte")!;
    const NS = "http://www.w3.org/2000/svg";
    const el = (tag: string, attrs: Record<string, string | number>, parent?: Element) => {
      const n = document.createElementNS(NS, tag);
      for (const k in attrs) n.setAttribute(k, String(attrs[k]));
      (parent || svg).appendChild(n);
      return n;
    };

    // ── Fond : quadrillage 5°, Madagascar, les îles ────────────────────────
    const fond = el("g", {});
    for (let lon = 40; lon <= 65; lon += 5) {
      el("line", { x1: toX(lon), y1: 0, x2: toX(lon), y2: H, stroke: "rgba(180,220,240,0.07)", "stroke-width": 1 }, fond);
      el("text", { x: toX(lon) + 4, y: 14, fill: "#9db4c2", "font-size": 9, opacity: 0.6 }, fond).textContent = lon + "°E";
    }
    for (let lat = -10; lat >= -28; lat -= 5) {
      el("line", { x1: 0, y1: toY(lat), x2: W, y2: toY(lat), stroke: "rgba(180,220,240,0.07)", "stroke-width": 1 }, fond);
      el("text", { x: 6, y: toY(lat) - 4, fill: "#9db4c2", "font-size": 9, opacity: 0.6 }, fond).textContent = lat + "°";
    }

    const MADA: [number, number][] = [
      [49.3, -12.1], [50.3, -14.0], [50.2, -15.6], [49.8, -16.9], [49.6, -18.4],
      [48.8, -20.3], [47.9, -22.2], [47.3, -23.8], [46.4, -25.2], [45.2, -25.6],
      [44.2, -24.9], [43.7, -23.5], [43.4, -22.2], [43.7, -20.9], [44.3, -19.6],
      [44.0, -18.0], [44.5, -16.4], [46.0, -15.3], [46.9, -13.8], [48.0, -12.8],
    ];
    el("polygon", {
      points: MADA.map(([lo, la]) => toX(lo) + "," + toY(la)).join(" "),
      fill: "#d9c589", stroke: "#8f7f4e", "stroke-width": 1.5, opacity: 0.92,
    }, fond);
    el("text", { x: toX(45.6), y: toY(-19.6), fill: "#6b5f33", "font-size": 13, "font-weight": 700, "letter-spacing": 2, "text-anchor": "middle" }, fond).textContent = "MADAGASCAR";

    function ile(lon: number, lat: number, r: number, nom: string, dy: number) {
      el("circle", { cx: toX(lon), cy: toY(lat), r, fill: "#d9c589", stroke: "#8f7f4e", "stroke-width": 1.5 }, fond);
      el("text", { x: toX(lon), y: toY(lat) + dy, fill: "#9db4c2", "font-size": 11, "font-weight": 700, "text-anchor": "middle" }, fond).textContent = nom;
    }
    ile(REUNION.lon, REUNION.lat, 7, "LA RÉUNION", 24);
    ile(57.55, -20.3, 5, "Maurice", -12);
    ile(63.42, -19.7, 4, "Rodrigues", -10);

    const halo = el("circle", {
      cx: toX(REUNION.lon), cy: toY(REUNION.lat), r: 16,
      fill: "none", stroke: "transparent", "stroke-width": 3, opacity: 0.9,
    });

    const coucheRoute = el("g", {});
    const coucheCyclone = el("g", { style: "display:none" });
    const spinG = el("g", { class: "simcy-spin" }, coucheCyclone) as SVGGElement;

    const $ = (id: string) => root.querySelector<HTMLElement>("#" + id)!;
    const hint = $("simcy-hint"), alerte = $("simcy-alerte"), formule = $("simcy-formule"),
      cadDist = $("simcy-dist"), cadHeure = $("simcy-heure"), bilan = $("simcy-bilan");
    const btnLancer = $("simcy-lancer") as HTMLButtonElement;
    const btnReset = $("simcy-reset") as HTMLButtonElement;
    const rangeVitesse = $("simcy-vitesse") as HTMLInputElement;
    const vitesseVal = $("simcy-vitesse-val");

    const catCourante = () => +(root.querySelector<HTMLInputElement>('input[name="simcy-cat"]:checked')?.value ?? 2);
    const vitesse = () => +rangeVitesse.value;

    function dessineCyclone(rayon: number) {
      spinG.innerHTML = "";
      spinG.style.setProperty("--simcy-rot", CATS[catCourante()].rot);
      for (let bras = 0; bras < 4; bras++) {
        let d = "";
        for (let i = 0; i <= 22; i++) {
          const t = i / 22;
          const ang = (bras * Math.PI) / 2 + t * 2.4;
          const r = 5 + t * rayon;
          d += (i ? "L" : "M") + (Math.cos(ang) * r).toFixed(1) + "," + (Math.sin(ang) * r).toFixed(1);
        }
        el("path", { d, fill: "none", stroke: "rgba(232,244,250,0.85)", "stroke-width": 3.4, "stroke-linecap": "round", opacity: 0.85 }, spinG);
      }
      el("circle", { cx: 0, cy: 0, r: 4.5, fill: "#071825", stroke: "#fff", "stroke-width": 1.6 }, spinG);
    }

    // ── État ───────────────────────────────────────────────────────────────
    let points: P[] = [];
    let phase: "pose" | "trace" | "course" | "fini" = "pose";
    let anim = 0;

    const racine = root; // capture non-nulle (les function déclarées sont hissées)
    function majEtapes() {
      const rang = phase === "pose" ? 1 : phase === "trace" ? 2 : 4;
      racine.querySelectorAll<HTMLElement>(".simcy-etape").forEach((e) => {
        const n = +(e.dataset.etape ?? 0);
        e.classList.toggle("active", n === rang && phase !== "fini");
        e.classList.toggle("faite", n < rang || phase === "fini");
      });
    }

    function placeCyclone(p: P) {
      coucheCyclone.setAttribute("transform", `translate(${toX(p.lon)},${toY(p.lat)})`);
    }

    function dessineRoute() {
      coucheRoute.innerHTML = "";
      if (points.length > 1) {
        el("polyline", {
          points: points.map((p) => toX(p.lon) + "," + toY(p.lat)).join(" "),
          fill: "none", stroke: "#62d6e8", "stroke-width": 2, "stroke-dasharray": "7 6", opacity: 0.8,
        }, coucheRoute);
      }
      points.forEach((p, i) => {
        el("circle", {
          cx: toX(p.lon), cy: toY(p.lat), r: i === 0 ? 5 : 3.5,
          fill: i === 0 ? "#62d6e8" : "#071825", stroke: "#62d6e8", "stroke-width": 1.5,
        }, coucheRoute);
      });
    }

    function approche() {
      if (points.length < 2) return null;
      let best = { d: Infinity, parcours: 0, total: 0 };
      let cumul = 0;
      for (let s = 0; s < points.length - 1; s++) {
        const A = points[s], B = points[s + 1];
        const seg = km(A, B);
        for (let t = 0; t <= 1; t += 0.02) {
          const Pp = { lon: A.lon + (B.lon - A.lon) * t, lat: A.lat + (B.lat - A.lat) * t };
          const d = km(Pp, REUNION);
          if (d < best.d) best = { d, parcours: cumul + seg * t, total: 0 };
        }
        cumul += seg;
      }
      best.total = cumul;
      return best;
    }

    function majPrevision() {
      if (points.length === 0) return;
      cadDist.innerHTML = Math.round(km(points[0], REUNION)) + " <small>km</small>";
      const a = approche();
      if (!a) {
        formule.innerHTML = '<span class="muet">Trace la route pour calculer l&apos;heure du plus près.</span>';
        return;
      }
      const h = a.parcours / vitesse();
      formule.innerHTML =
        `plus près de l'île : <b>${Math.round(a.d)} km</b><br>` +
        `t = ${Math.round(a.parcours)} km ÷ ${vitesse()} km/h = <b>${h.toFixed(1)} h</b> ` +
        `<span class="muet">(≈ ${Math.round((h / 24) * 10) / 10} jours)</span>`;
    }

    // L'échelle d'alerte réunionnaise (pédagogique, simplifiée).
    function niveauAlerte(dKm: number, hRest: number) {
      if (hRest > 24) return { nom: "PRÉ-ALERTE JAUNE", c: "#ffd23f", tx: "#3a2e00" };
      if (hRest > 6) return { nom: "ALERTE ORANGE", c: "#ff8c1a", tx: "#301700" };
      if (dKm > 90) return { nom: "ALERTE ROUGE — confinement", c: "#ff3b30", tx: "#fff" };
      return { nom: "PHASE VIOLETTE — ne sortez pas", c: "#b14aed", tx: "#fff" };
    }
    function alerteNeutre() {
      alerte.style.background = "#123049";
      alerte.style.color = "#9db4c2";
      halo.setAttribute("stroke", "transparent");
    }

    // ── Interactions ───────────────────────────────────────────────────────
    const onPointer = (ev: PointerEvent) => {
      if (phase === "course" || phase === "fini") return;
      const m = svg.getScreenCTM();
      if (!m) return;
      const pt = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(m.inverse());
      const p = { lon: toLon(pt.x), lat: toLat(pt.y) };

      if (phase === "pose") {
        points = [p];
        phase = "trace";
        (coucheCyclone as SVGGElement).style.display = "";
        dessineCyclone(CATS[catCourante()].rayon);
        placeCyclone(p);
        hint.textContent = "Trace sa route : clique jusqu'à 8 points, puis ▶ Lancer";
      } else if (phase === "trace" && points.length < 9) {
        points.push(p);
        btnLancer.disabled = false;
        if (points.length === 9) hint.textContent = "Route complète (8 étapes) — ▶ Lance la course !";
      }
      dessineRoute();
      majPrevision();
      majEtapes();
    };
    svg.addEventListener("pointerdown", onPointer);

    const onVitesse = () => {
      vitesseVal.textContent = vitesse() + " km/h";
      if (phase !== "course") majPrevision();
    };
    rangeVitesse.addEventListener("input", onVitesse);

    const onCat = () => {
      if ((coucheCyclone as SVGGElement).style.display !== "none") dessineCyclone(CATS[catCourante()].rayon);
    };
    root.querySelectorAll('input[name="simcy-cat"]').forEach((r) => r.addEventListener("change", onCat));

    // ── La course : 1 s réelle = 2,5 h simulées ────────────────────────────
    const H_PAR_SECONDE = 2.5;

    const onLancer = () => {
      if (points.length < 2 || phase === "course") return;
      phase = "course";
      majEtapes();
      btnLancer.disabled = true;
      hint.style.display = "none";
      bilan.classList.remove("visible");

      const segs: { A: P; B: P; L: number; avant: number }[] = [];
      let total = 0;
      for (let s = 0; s < points.length - 1; s++) {
        const L = km(points[s], points[s + 1]);
        segs.push({ A: points[s], B: points[s + 1], L, avant: total });
        total += L;
      }
      const a = approche()!;
      let minD = Infinity;
      const t0 = performance.now();

      function tick(now: number) {
        const hSim = ((now - t0) / 1000) * H_PAR_SECONDE;
        const dist = Math.min(hSim * vitesse(), total);

        let seg = segs[segs.length - 1], t = 1;
        for (const s of segs) if (dist <= s.avant + s.L) { seg = s; t = (dist - s.avant) / s.L; break; }
        const Pp = { lon: seg.A.lon + (seg.B.lon - seg.A.lon) * t, lat: seg.A.lat + (seg.B.lat - seg.A.lat) * t };
        placeCyclone(Pp);

        const d = km(Pp, REUNION);
        minD = Math.min(minD, d);
        cadDist.innerHTML = Math.round(d) + " <small>km</small>";
        cadHeure.textContent = "H+" + Math.round(hSim);

        const hRest = Math.max(0, a.parcours - dist) / vitesse();
        if (dist < a.parcours + 60 && a.d < 900) {
          const n = niveauAlerte(d, hRest);
          alerte.textContent = n.nom;
          alerte.style.background = n.c;
          alerte.style.color = n.tx;
          halo.setAttribute("stroke", n.c);
        } else {
          alerte.textContent = "SURVEILLANCE — le système s'éloigne";
          alerteNeutre();
        }

        if (dist >= total) { fin(hSim, minD); return; }
        anim = requestAnimationFrame(tick);
      }
      anim = requestAnimationFrame(tick);
    };
    btnLancer.addEventListener("click", onLancer);

    function fin(hSim: number, minD: number) {
      phase = "fini";
      majEtapes();
      const cat = CATS[catCourante()];
      const touche = minD < 90;
      alerte.textContent = touche ? "PHASE DE SAUVEGARDE" : "FIN D'ALERTE";
      alerte.style.background = "#45d18a";
      alerte.style.color = "#00301a";
      halo.setAttribute("stroke", "#45d18a");
      bilan.innerHTML =
        `<strong>Bilan de course</strong> — ton ${cat.nom} (vents ${cat.vent} km/h) est passé ` +
        `au plus près à <strong>${Math.round(minD)} km</strong> de La Réunion, après ` +
        `<strong>${Math.round(hSim)} h</strong> de route à ${vitesse()} km/h.` +
        (touche
          ? " Passage direct : recommence en décalant la route de 100 km — que devient l'alerte ?"
          : " L'île est épargnée cette fois. Rejoue la même route à une autre vitesse : l'heure du plus près change, pas la distance !");
      bilan.classList.add("visible");
    }

    const onReset = () => {
      if (anim) cancelAnimationFrame(anim);
      points = [];
      phase = "pose";
      coucheRoute.innerHTML = "";
      (coucheCyclone as SVGGElement).style.display = "none";
      btnLancer.disabled = true;
      hint.style.display = "";
      hint.textContent = "Clique sur l'océan pour poser ton cyclone 🌀";
      cadDist.textContent = "—";
      cadHeure.textContent = "H+0";
      alerte.textContent = "EN ATTENTE — pose un cyclone";
      alerteNeutre();
      formule.innerHTML = '<span class="muet">temps = distance ÷ vitesse — pose ton cyclone et trace sa route pour voir le calcul.</span>';
      bilan.classList.remove("visible");
      majEtapes();
    };
    btnReset.addEventListener("click", onReset);

    majEtapes();

    return () => {
      if (anim) cancelAnimationFrame(anim);
      svg.removeEventListener("pointerdown", onPointer);
      svg.innerHTML = "";
    };
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-[#071825] text-[#e8f1f6]">
      {/* L'animation du cyclone : SENS HORAIRE (hémisphère sud). */}
      <style>{`
        @keyframes simcy-spin { to { transform: rotate(360deg); } }
        .simcy-spin { animation: simcy-spin var(--simcy-rot, 2.6s) linear infinite; transform-origin: center; transform-box: fill-box; }
        @media (prefers-reduced-motion: reduce) { .simcy-spin { animation-duration: 12s; } }
        .simcy-etape.active { color: #e8f1f6; background: #123049; border-color: rgba(98,214,232,.35); }
        .simcy-etape.active .simcy-num { color: #62d6e8; border-color: #62d6e8; }
        .simcy-etape.faite { color: #45d18a; }
        .simcy-etape.faite .simcy-num { color: #45d18a; border-color: #45d18a; }
        #simcy-formule b { color: #62d6e8; }
        #simcy-formule .muet { color: #9db4c2; }
        #simcy-bilan { display: none; }
        #simcy-bilan.visible { display: block; }
        #simcy-bilan strong { color: #62d6e8; }
      `}</style>

      {/* Manchette de la vigie */}
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#123049] px-5 pb-2.5 pt-3.5">
        <h1 className="m-0 text-[17px] font-extrabold uppercase tracking-[0.28em]">
          Dans l&apos;<span className="text-[#62d6e8]">œil</span> du cyclone
        </h1>
        <span className="font-serif text-sm italic text-[#9db4c2]">
          Tiens le vent dans ta main — le simulateur d&apos;eleveai.fr
        </span>
        <span className="ml-auto rounded-sm bg-[#62d6e8] px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-[#071825]">
          BÊTA
        </span>
      </header>

      <main className="grid min-h-0 grid-cols-1 lg:grid-cols-[1fr_320px]">
        {/* La carte */}
        <div className="relative min-h-[380px] bg-[#0c2438]">
          <svg id="simcy-carte" viewBox="0 0 1000 660" className="block h-full min-h-[380px] w-full cursor-crosshair" aria-label="Carte du bassin sud-ouest de l'océan Indien" />
          <div id="simcy-hint" className="pointer-events-none absolute left-1/2 top-3.5 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#62d6e8]/35 bg-[#071825]/90 px-3.5 py-1.5 text-[13px]">
            Clique sur l&apos;océan pour poser ton cyclone 🌀
          </div>
        </div>

        {/* Le pupitre */}
        <aside className="flex flex-col gap-3.5 border-t border-[#123049] bg-[#0e2233] p-4 lg:border-l lg:border-t-0">
          <div className="flex flex-col gap-1.5">
            {[
              [1, "Pose le cyclone — clique sur l'océan"],
              [2, "Trace sa route — clique encore (jusqu'à 8 points)"],
              [3, "Règle sa force et sa vitesse"],
              [4, "Lance la course"],
            ].map(([n, txt]) => (
              <div key={n} data-etape={n} className="simcy-etape flex items-baseline gap-2.5 rounded border border-transparent px-2.5 py-1.5 text-[13px] text-[#9db4c2]">
                <span className="simcy-num grid h-[18px] w-[18px] flex-none place-items-center rounded-full border border-[#9db4c2] font-mono text-[11px] font-bold">
                  {n}
                </span>
                <span>{txt}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#9db4c2]">
              Force — échelle du bassin
            </span>
            <div className="flex flex-col gap-1">
              {[
                [0, "Dépression tropicale", "< 63 km/h", false],
                [1, "Tempête tropicale", "63–117 km/h", false],
                [2, "Cyclone tropical", "118–165 km/h", true],
                [3, "Cyclone intense", "166–212 km/h", false],
              ].map(([v, nom, vent, def]) => (
                <label key={String(v)} className="flex cursor-pointer items-center gap-2 rounded border border-[#123049] px-2 py-1.5 text-[12.5px] hover:bg-[#123049]">
                  <input type="radio" name="simcy-cat" value={String(v)} defaultChecked={Boolean(def)} className="m-0 accent-[#62d6e8]" />
                  <span>{nom}</span>
                  <span className="ml-auto font-mono text-[11px] text-[#9db4c2]">{vent}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#9db4c2]">
              Vitesse de déplacement
            </span>
            <div className="flex items-center gap-2.5">
              <input type="range" id="simcy-vitesse" min={5} max={40} defaultValue={20} step={1} className="flex-1 accent-[#62d6e8]" aria-label="Vitesse de déplacement en kilomètres par heure" />
              <span id="simcy-vitesse-val" className="min-w-[72px] text-right font-mono text-sm font-bold text-[#62d6e8]">
                20 km/h
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button id="simcy-lancer" disabled className="flex-1 rounded border border-[#62d6e8] bg-[#62d6e8] px-3 py-2.5 text-[13px] font-bold text-[#071825] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35">
              ▶ Lancer
            </button>
            <button id="simcy-reset" className="flex-1 rounded border border-[#123049] bg-[#123049] px-3 py-2.5 text-[13px] font-bold text-[#e8f1f6] hover:brightness-125">
              ↺ Recommencer
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded border border-[#123049] bg-[#071825] px-2.5 py-2">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#9db4c2]">Distance → Réunion</div>
              <div id="simcy-dist" className="mt-0.5 font-mono text-[19px] font-bold tabular-nums">—</div>
            </div>
            <div className="rounded border border-[#123049] bg-[#071825] px-2.5 py-2">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#9db4c2]">Horloge de course</div>
              <div id="simcy-heure" className="mt-0.5 font-mono text-[19px] font-bold tabular-nums">H+0</div>
            </div>
          </div>

          <div id="simcy-alerte" className="rounded bg-[#123049] px-3 py-2.5 text-center text-sm font-extrabold tracking-wide text-[#9db4c2]">
            EN ATTENTE — pose un cyclone
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#9db4c2]">
              Les maths de la vigie
            </span>
            <div id="simcy-formule" className="min-h-[40px] rounded border border-dashed border-[#62d6e8]/40 bg-[#071825] px-3 py-2 font-mono text-[12.5px] leading-relaxed text-[#62d6e8]">
              <span className="muet">temps = distance ÷ vitesse — pose ton cyclone et trace sa route pour voir le calcul.</span>
            </div>
          </div>

          <div id="simcy-bilan" className="rounded bg-[#123049] p-3 text-[13px] leading-relaxed" />
        </aside>
      </main>

      {/* Le garde-fou officiel — non négociable. */}
      <footer className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[#123049] px-5 py-2.5 text-[11.5px] text-[#9db4c2]">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 flex-none rounded-full bg-[#ffd23f]" />
          Outil pédagogique — en cas d&apos;alerte réelle, suivez Météo-France et la préfecture de La Réunion.
        </span>
        <span className="ml-auto font-mono">
          Un jeu du <b className="font-bold text-[#62d6e8]">Journal d&apos;EleveAI</b> 🦎
        </span>
      </footer>
    </div>
  );
}
