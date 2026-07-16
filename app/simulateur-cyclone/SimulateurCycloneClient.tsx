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

// embed : version widget (iframe chez les médias de l'île) — même simulateur,
// mais la marque devient un lien traçé vers eleveai.fr (utm_source=widget).
export default function SimulateurCycloneClient({ embed = false }: { embed?: boolean }) {
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

    // ── Rejouer l'histoire — les cyclones que l'île n'a pas oubliés ────────
    // Trajectoires SIMPLIFIÉES d'après les relevés officiels (but pédagogique).
    // Tact : de vrais cyclones ont fait de vraies victimes — on rejoue pour
    // comprendre et se souvenir, jamais pour jouer avec.
    const HISTORIQUES: Record<string, {
      nom: string; annee: number; cat: number; vitesse: number;
      route: [number, number][]; memoire: string;
    }> = {
      belal: {
        nom: "BELAL", annee: 2024, cat: 3, vitesse: 12,
        route: [[52.5, -14.5], [53.5, -16.5], [54.5, -18.5], [55.4, -20.9], [56.5, -23.0], [58.0, -25.5]],
        memoire: "Janvier 2024 — alerte violette, l'île à l'arrêt complet. Rafales mesurées à 217 km/h au Maïdo. Des vies ont été perdues : on s'en souvient.",
      },
      dina: {
        nom: "DINA", annee: 2002, cat: 3, vitesse: 15,
        route: [[62.0, -17.0], [59.5, -18.2], [57.3, -19.4], [55.6, -20.5], [53.8, -21.8], [52.5, -23.5]],
        memoire: "Janvier 2002 — l'œil est passé au nord sans toucher terre, et pourtant : rafales au-delà de 200 km/h dans les hauts, des toits arrachés dans toute l'île. Pas besoin d'un passage direct pour frapper fort.",
      },
      firinga: {
        nom: "FIRINGA", annee: 1989, cat: 2, vitesse: 18,
        route: [[59.5, -17.5], [58.0, -18.8], [56.8, -19.9], [55.6, -21.2], [54.3, -22.8], [53.0, -24.5]],
        memoire: "Janvier 1989 — passage direct sur le Sud. Saint-Pierre et la Rivière durement touchés. Ceux qui l'ont vécu racontent encore le bruit du vent.",
      },
      gamede: {
        nom: "GAMÈDE", annee: 2007, cat: 2, vitesse: 8,
        route: [[57.0, -15.5], [55.0, -16.8], [53.5, -18.0], [52.8, -19.2], [52.3, -20.5], [51.5, -22.5]],
        memoire: "Février 2007 — il n'a JAMAIS touché l'île… et il a pourtant battu des records du monde de pluie : près de 5 mètres d'eau à Cilaos en 9 jours. Regarde sa vitesse : 8 km/h. Un cyclone lent qui reste à côté, c'est des jours de pluie.",
      },
    };

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
      cadDist = $("simcy-dist"), cadHeure = $("simcy-heure"), bilan = $("simcy-bilan"),
      force = $("simcy-force");
    const btnLancer = $("simcy-lancer") as HTMLButtonElement;
    const btnAnnuler = $("simcy-annuler") as HTMLButtonElement;
    const btnReset = $("simcy-reset") as HTMLButtonElement;
    const btnPause = $("simcy-pause") as HTMLButtonElement;
    const btnMult = $("simcy-mult") as HTMLButtonElement;
    const inputNom = $("simcy-nom") as HTMLInputElement;
    const rangeVitesse = $("simcy-vitesse") as HTMLInputElement;
    const vitesseVal = $("simcy-vitesse-val");

    // Le nom du cyclone, nettoyé (il part dans du innerHTML → on échappe).
    const nomCyclone = () =>
      inputNom.value.trim().toUpperCase().replace(/[<>&"]/g, "").slice(0, 16);

    // Le cyclone est-il au-dessus de Madagascar ? (ray casting sur le polygone)
    function surMadagascar(p: P) {
      let dedans = false;
      for (let i = 0, j = MADA.length - 1; i < MADA.length; j = i++) {
        const [xi, yi] = MADA[i], [xj, yj] = MADA[j];
        if (yi > p.lat !== yj > p.lat && p.lon < ((xj - xi) * (p.lat - yi)) / (yj - yi) + xi) {
          dedans = !dedans;
        }
      }
      return dedans;
    }

    const catCourante = () => +(root.querySelector<HTMLInputElement>('input[name="simcy-cat"]:checked')?.value ?? 2);
    const vitesse = () => +rangeVitesse.value;

    function dessineCyclone(catIdx: number) {
      const rayon = CATS[catIdx].rayon;
      spinG.innerHTML = "";
      spinG.style.setProperty("--simcy-rot", CATS[catIdx].rot);
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
        dessineCyclone(catCourante());
        placeCyclone(p);
        hint.textContent = "Trace sa route : clique jusqu'à 8 points, puis ▶ Lancer";
      } else if (phase === "trace" && points.length < 9) {
        points.push(p);
        btnLancer.disabled = false;
        btnAnnuler.disabled = false;
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
      if ((coucheCyclone as SVGGElement).style.display !== "none") dessineCyclone(catCourante());
    };
    root.querySelectorAll('input[name="simcy-cat"]').forEach((r) => r.addEventListener("change", onCat));

    // ── Rejouer l'histoire : un clic charge tout (route, force, vitesse, nom).
    let histoireCourante: (typeof HISTORIQUES)[string] | null = null;

    const chargerHistoire = (id: string) => {
      const h = HISTORIQUES[id];
      if (!h || phase === "course") return;
      onReset();
      histoireCourante = h;
      points = h.route.map(([lon, lat]) => ({ lon, lat }));
      phase = "trace";
      const radio = root.querySelector<HTMLInputElement>(`input[name="simcy-cat"][value="${h.cat}"]`);
      if (radio) radio.checked = true;
      rangeVitesse.value = String(h.vitesse);
      vitesseVal.textContent = h.vitesse + " km/h";
      inputNom.value = h.nom;
      (coucheCyclone as SVGGElement).style.display = "";
      dessineCyclone(h.cat);
      placeCyclone(points[0]);
      dessineRoute();
      majPrevision();
      majEtapes();
      btnLancer.disabled = false;
      btnAnnuler.disabled = true; // on ne retouche pas l'histoire
      hint.textContent = `La route de ${h.nom} (${h.annee}) est tracée — ▶ Lance pour revivre sa course`;
      const memoire = $("simcy-memoire");
      memoire.textContent = h.memoire;
      memoire.classList.remove("hidden");
    };
    root.querySelectorAll<HTMLButtonElement>("[data-hist]").forEach((b) =>
      b.addEventListener("click", () => chargerHistoire(b.dataset.hist!))
    );

    // ↩ Annuler le dernier point de la route (jamais le cyclone lui-même).
    const onAnnuler = () => {
      if (phase !== "trace" || points.length < 2) return;
      points.pop();
      if (points.length < 2) {
        btnLancer.disabled = true;
        btnAnnuler.disabled = true;
        hint.textContent = "Trace sa route : clique jusqu'à 8 points, puis ▶ Lancer";
      }
      dessineRoute();
      majPrevision();
    };
    btnAnnuler.addEventListener("click", onAnnuler);

    // ── La course : 1 s réelle = 2,5 h simulées (×2 possible, pause) ───────
    const H_PAR_SECONDE = 2.5;
    let pauseCourse = false;
    let multCourse = 1;

    const onPause = () => {
      pauseCourse = !pauseCourse;
      btnPause.textContent = pauseCourse ? "▶ Reprendre" : "⏸ Pause";
      spinG.style.animationPlayState = pauseCourse ? "paused" : "running";
    };
    btnPause.addEventListener("click", onPause);

    const onMult = () => {
      multCourse = multCourse === 1 ? 2 : 1;
      btnMult.textContent = "⏩ ×" + multCourse;
    };
    btnMult.addEventListener("click", onMult);

    const onLancer = () => {
      if (points.length < 2 || phase === "course") return;
      phase = "course";
      majEtapes();
      btnLancer.disabled = true;
      btnAnnuler.disabled = true;
      inputNom.disabled = true;
      btnPause.disabled = false;
      btnMult.disabled = false;
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

      // La force peut CHUTER sur les terres (le relief malgache déchire les
      // cyclones — c'est la leçon) : −1 catégorie toutes les 6 h sur terre.
      const catInit = catCourante();
      let catEff = catInit;
      let hSurTerre = 0;
      let oeilPasse = false;

      // La trace : la trajectoire réellement parcourue, en trait plein
      // (le dessin des vraies cartes cycloniques).
      const trace = el("polyline", {
        points: toX(points[0].lon) + "," + toY(points[0].lat),
        fill: "none", stroke: "rgba(232,244,250,0.55)", "stroke-width": 2.5,
      }, coucheRoute);
      let tracePts = trace.getAttribute("points")!;
      let dernierTraceX = toX(points[0].lon), dernierTraceY = toY(points[0].lat);

      force.classList.remove("hidden");
      const majForce = () => {
        force.textContent =
          "FORCE ACTUELLE : " + CATS[catEff].nom + " (vents ~" + CATS[catEff].vent + " km/h)" +
          (catEff < catInit ? " — affaibli par les terres" : "");
      };
      majForce();

      let hSim = 0;
      let last = performance.now();

      function tick(now: number) {
        const dt = (now - last) / 1000;
        last = now;
        if (pauseCourse) { anim = requestAnimationFrame(tick); return; }

        const dh = dt * H_PAR_SECONDE * multCourse;
        hSim += dh;
        const dist = Math.min(hSim * vitesse(), total);

        let seg = segs[segs.length - 1], t = 1;
        for (const s of segs) if (dist <= s.avant + s.L) { seg = s; t = (dist - s.avant) / s.L; break; }
        const Pp = { lon: seg.A.lon + (seg.B.lon - seg.A.lon) * t, lat: seg.A.lat + (seg.B.lat - seg.A.lat) * t };
        placeCyclone(Pp);

        // La trace (un point ajouté tous les ~5 px, pas à chaque frame).
        const px = toX(Pp.lon), py = toY(Pp.lat);
        if (Math.hypot(px - dernierTraceX, py - dernierTraceY) > 5) {
          tracePts += " " + px.toFixed(1) + "," + py.toFixed(1);
          trace.setAttribute("points", tracePts);
          dernierTraceX = px; dernierTraceY = py;
        }

        // Sur Madagascar : le cyclone s'use.
        if (surMadagascar(Pp) && catEff > 0) {
          hSurTerre += dh;
          if (hSurTerre >= 6) {
            hSurTerre = 0;
            catEff -= 1;
            dessineCyclone(catEff);
            majForce();
          }
        }

        const d = km(Pp, REUNION);
        minD = Math.min(minD, d);
        cadDist.innerHTML = Math.round(d) + " <small>km</small>";
        cadHeure.textContent = "H+" + Math.round(hSim);

        const hRest = Math.max(0, a.parcours - dist) / vitesse();
        if (d < 30) {
          // LA leçon de sécurité : le calme de l'œil est un piège mortel.
          oeilPasse = true;
          alerte.textContent = "🌀 L'ŒIL PASSE — calme trompeur : le vent va revenir en sens inverse. NE SORTEZ PAS.";
          alerte.style.background = "#b14aed";
          alerte.style.color = "#fff";
          halo.setAttribute("stroke", "#b14aed");
        } else if (dist < a.parcours + 60 && a.d < 900) {
          const n = niveauAlerte(d, hRest);
          alerte.textContent = n.nom;
          alerte.style.background = n.c;
          alerte.style.color = n.tx;
          halo.setAttribute("stroke", n.c);
        } else {
          alerte.textContent = "SURVEILLANCE — le système s'éloigne";
          alerteNeutre();
        }

        if (dist >= total) { fin(hSim, minD, catInit, catEff, oeilPasse); return; }
        anim = requestAnimationFrame(tick);
      }
      anim = requestAnimationFrame(tick);
    };
    btnLancer.addEventListener("click", onLancer);

    function fin(hSim: number, minD: number, catInit: number, catEff: number, oeilPasse: boolean) {
      phase = "fini";
      majEtapes();
      btnPause.disabled = true;
      btnMult.disabled = true;
      const nom = nomCyclone();
      const sujet = nom ? `le cyclone <strong>${nom}</strong>` : `ton ${CATS[catInit].nom}`;
      const touche = minD < 90;
      alerte.textContent = touche ? "PHASE DE SAUVEGARDE" : "FIN D'ALERTE";
      alerte.style.background = "#45d18a";
      alerte.style.color = "#00301a";
      halo.setAttribute("stroke", "#45d18a");
      bilan.innerHTML =
        `<strong>Bilan de course</strong> — ${sujet} (vents ${CATS[catInit].vent} km/h au départ) ` +
        `est passé au plus près à <strong>${Math.round(minD)} km</strong> de La Réunion, après ` +
        `<strong>${Math.round(hSim)} h</strong> de route à ${vitesse()} km/h.` +
        (catEff < catInit
          ? ` En traversant Madagascar, il a perdu de sa force : à l'arrivée, ce n'était plus qu'une ${CATS[catEff].nom}. Le relief protège !`
          : "") +
        (oeilPasse
          ? " <strong>L'œil est passé sur l'île</strong> — retiens la leçon : pendant le calme de l'œil, on ne sort JAMAIS."
          : "") +
        (touche
          ? " Recommence en décalant la route de 100 km — que devient l'alerte ?"
          : " L'île est épargnée cette fois. Rejoue la même route à une autre vitesse : l'heure du plus près change, pas la distance !") +
        (histoireCourante
          ? `<br><br><em>🕯️ ${histoireCourante.nom} ${histoireCourante.annee}, en vrai : ${histoireCourante.memoire}</em>`
          : "");
      bilan.classList.add("visible");
    }

    const onReset = () => {
      if (anim) cancelAnimationFrame(anim);
      points = [];
      phase = "pose";
      histoireCourante = null;
      $("simcy-memoire").classList.add("hidden");
      inputNom.value = "";
      coucheRoute.innerHTML = "";
      (coucheCyclone as SVGGElement).style.display = "none";
      btnLancer.disabled = true;
      btnAnnuler.disabled = true;
      btnPause.disabled = true;
      btnMult.disabled = true;
      inputNom.disabled = false;
      pauseCourse = false;
      multCourse = 1;
      btnPause.textContent = "⏸ Pause";
      btnMult.textContent = "⏩ ×1";
      spinG.style.animationPlayState = "running";
      force.classList.add("hidden");
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

    // Sur desktop, le simulateur remplit EXACTEMENT la hauteur restante de
    // l'écran (mesurée, pas devinée : header du site + bannières varient) —
    // le pupitre ne fait jamais défiler la page (retour Frédéric).
    const fitHauteur = () => {
      if (window.innerWidth >= 1024) {
        racine.style.height = window.innerHeight - racine.getBoundingClientRect().top + "px";
      } else {
        racine.style.height = "";
      }
    };
    fitHauteur();
    // Les bannières (PWA, dev) se montent APRÈS nous et décalent la page :
    // on re-mesure quand tout ce qui est au-dessus change de taille.
    const t1 = window.setTimeout(fitHauteur, 300);
    const t2 = window.setTimeout(fitHauteur, 1200);
    window.addEventListener("resize", fitHauteur);
    const ro = new ResizeObserver(fitHauteur);
    ro.observe(document.body);

    return () => {
      if (anim) cancelAnimationFrame(anim);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener("resize", fitHauteur);
      svg.removeEventListener("pointerdown", onPointer);
      svg.innerHTML = "";
    };
  }, []);

  return (
    // Sur desktop : tout le simulateur tient dans la hauteur de l'écran (moins
    // le header du site ~66px) — le pupitre ne doit jamais faire défiler la
    // page (retour Frédéric). Sur mobile : empilement naturel.
    <div
      ref={rootRef}
      className="min-h-screen bg-[#071825] text-[#e8f1f6] lg:flex lg:min-h-0 lg:flex-col lg:overflow-hidden"
    >
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

      <main className="grid min-h-0 grid-cols-1 lg:min-h-0 lg:flex-1 lg:grid-cols-[1fr_320px] lg:overflow-hidden">
        {/* La carte */}
        <div className="relative min-h-[380px] bg-[#0c2438]">
          <svg id="simcy-carte" viewBox="0 0 1000 660" className="block h-full min-h-[380px] w-full cursor-crosshair" aria-label="Carte du bassin sud-ouest de l'océan Indien" />
          <div id="simcy-hint" className="pointer-events-none absolute left-1/2 top-3.5 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#62d6e8]/35 bg-[#071825]/90 px-3.5 py-1.5 text-[13px]">
            Clique sur l&apos;océan pour poser ton cyclone 🌀
          </div>
        </div>

        {/* Le pupitre — COMPACT : il tient dans une hauteur d'écran (retour
            Frédéric) ; overflow-y-auto en filet de sécurité sur petits écrans. */}
        <aside className="flex flex-col gap-2 overflow-y-auto border-t border-[#123049] bg-[#0e2233] p-3 lg:min-h-0 lg:border-l lg:border-t-0">
          <div className="flex flex-col gap-1">
            {[
              [1, "Pose le cyclone — clique sur l'océan"],
              [2, "Trace sa route (jusqu'à 8 points)"],
              [3, "Règle sa force et sa vitesse"],
              [4, "Lance la course"],
            ].map(([n, txt]) => (
              <div key={n} data-etape={n} className="simcy-etape flex items-baseline gap-2 rounded border border-transparent px-2 py-0.5 text-[12px] text-[#9db4c2]">
                <span className="simcy-num grid h-4 w-4 flex-none place-items-center rounded-full border border-[#9db4c2] font-mono text-[10px] font-bold">
                  {n}
                </span>
                <span>{txt}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#9db4c2]">
              Force — échelle du bassin
            </span>
            <div className="grid grid-cols-2 gap-1">
              {[
                [0, "Dépression", "< 63", false],
                [1, "Tempête", "63–117", false],
                [2, "Cyclone", "118–165", true],
                [3, "Cycl. intense", "166–212", false],
              ].map(([v, nom, vent, def]) => (
                <label key={String(v)} className="flex cursor-pointer items-center gap-1.5 rounded border border-[#123049] px-1.5 py-1 text-[11.5px] hover:bg-[#123049]">
                  <input type="radio" name="simcy-cat" value={String(v)} defaultChecked={Boolean(def)} className="m-0 accent-[#62d6e8]" />
                  <span>{nom}</span>
                  <span className="ml-auto font-mono text-[9.5px] text-[#9db4c2]">{vent}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#9db4c2]">
              Vitesse
            </span>
            <input type="range" id="simcy-vitesse" min={5} max={40} defaultValue={20} step={1} className="flex-1 accent-[#62d6e8]" aria-label="Vitesse de déplacement en kilomètres par heure" />
            <span id="simcy-vitesse-val" className="min-w-[64px] text-right font-mono text-[13px] font-bold text-[#62d6e8]">
              20 km/h
            </span>
          </div>

          <input
            id="simcy-nom"
            type="text"
            maxLength={16}
            placeholder="Nomme ton cyclone (optionnel)"
            aria-label="Nom de ton cyclone"
            className="rounded border border-[#123049] bg-[#071825] px-2.5 py-1.5 text-[12px] font-bold uppercase tracking-wider text-[#e8f1f6] placeholder-[#9db4c2]/60 outline-none focus:border-[#62d6e8]"
          />

          <div className="flex gap-1.5">
            <button id="simcy-lancer" disabled className="flex-1 rounded border border-[#62d6e8] bg-[#62d6e8] px-3 py-1.5 text-[12.5px] font-bold text-[#071825] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35">
              ▶ Lancer
            </button>
            <button id="simcy-annuler" disabled title="Annuler le dernier point" className="rounded border border-[#123049] bg-[#123049] px-2.5 py-1.5 text-[12.5px] font-bold text-[#e8f1f6] hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-35">
              ↩ Point
            </button>
            <button id="simcy-reset" className="rounded border border-[#123049] bg-[#123049] px-2.5 py-1.5 text-[12.5px] font-bold text-[#e8f1f6] hover:brightness-125">
              ↺
            </button>
            <button id="simcy-pause" disabled className="rounded border border-[#123049] bg-[#0c2438] px-2 py-1.5 text-[12px] font-bold text-[#e8f1f6] hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-35">
              ⏸
            </button>
            <button id="simcy-mult" disabled className="rounded border border-[#123049] bg-[#0c2438] px-2 py-1.5 text-[12px] font-bold text-[#e8f1f6] hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-35">
              ⏩ ×1
            </button>
          </div>

          {/* Rejouer l'histoire — en mémoire, jamais en jeu. */}
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#9db4c2]">
              Rejouer l&apos;histoire · en mémoire
              <span className="ml-1 normal-case tracking-normal text-[#9db4c2]/60">(trajectoires simplifiées)</span>
            </span>
            <div className="grid grid-cols-4 gap-1">
              {[
                ["belal", "BELAL", "2024"],
                ["dina", "DINA", "2002"],
                ["firinga", "FIRINGA", "1989"],
                ["gamede", "GAMÈDE", "2007"],
              ].map(([id, nom, annee]) => (
                <button
                  key={id}
                  data-hist={id}
                  className="rounded border border-[#123049] bg-[#0c2438] px-1 py-1 font-mono text-[10px] font-bold leading-tight text-[#e8f1f6] hover:border-[#62d6e8]/50 hover:brightness-125"
                >
                  {nom}
                  <span className="block text-[9px] font-normal text-[#9db4c2]">{annee}</span>
                </button>
              ))}
            </div>
            <p id="simcy-memoire" className="hidden rounded border border-[#9db4c2]/25 bg-[#071825] px-2.5 py-1.5 text-[11px] italic leading-snug text-[#9db4c2]" />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <div className="rounded border border-[#123049] bg-[#071825] px-2 py-1">
              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#9db4c2]">Distance → Réunion</div>
              <div id="simcy-dist" className="font-mono text-[16px] font-bold tabular-nums">—</div>
            </div>
            <div className="rounded border border-[#123049] bg-[#071825] px-2 py-1">
              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#9db4c2]">Horloge de course</div>
              <div id="simcy-heure" className="font-mono text-[16px] font-bold tabular-nums">H+0</div>
            </div>
          </div>

          {/* La force ACTUELLE (elle peut chuter sur les terres). */}
          <div id="simcy-force" className="hidden rounded border border-[#123049] bg-[#071825] px-2 py-1 font-mono text-[10.5px] text-[#9db4c2]" />

          <div id="simcy-alerte" className="rounded bg-[#123049] px-2.5 py-1.5 text-center text-[13px] font-extrabold tracking-wide text-[#9db4c2]">
            EN ATTENTE — pose un cyclone
          </div>

          <div id="simcy-formule" className="rounded border border-dashed border-[#62d6e8]/40 bg-[#071825] px-2.5 py-1.5 font-mono text-[11.5px] leading-relaxed text-[#62d6e8]">
            <span className="muet">temps = distance ÷ vitesse — pose ton cyclone et trace sa route pour voir le calcul.</span>
          </div>

          <div id="simcy-bilan" className="rounded bg-[#123049] p-2.5 text-[12px] leading-relaxed" />
        </aside>
      </main>

      {/* Le garde-fou officiel — non négociable. */}
      <footer className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[#123049] px-5 py-2.5 text-[11.5px] text-[#9db4c2]">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 flex-none rounded-full bg-[#ffd23f]" />
          Outil pédagogique — en cas d&apos;alerte réelle, suivez Météo-France et la préfecture de La Réunion.
        </span>
        {embed ? (
          <a
            href="https://www.eleveai.fr/simulateur-cyclone?utm_source=widget&utm_medium=embed&utm_campaign=cyclone"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto font-mono underline decoration-[#62d6e8]/50 underline-offset-2 hover:text-[#e8f1f6]"
          >
            Un jeu du <b className="font-bold text-[#62d6e8]">Journal d&apos;EleveAI</b> 🦎 — eleveai.fr
          </a>
        ) : (
          <span className="ml-auto font-mono">
            Un jeu du <b className="font-bold text-[#62d6e8]">Journal d&apos;EleveAI</b> 🦎
          </span>
        )}
      </footer>
    </div>
  );
}
