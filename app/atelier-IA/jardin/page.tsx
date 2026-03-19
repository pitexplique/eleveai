"use client";

import React, { useEffect, useRef, useState } from "react";

/* =========================================================
   OUTILS
========================================================= */

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function rgb(r: number, g: number, b: number) {
  return `rgb(${r}, ${g}, ${b})`;
}

/*
  Classification simple, adaptée à ton image de feuilles :
  0 = ciel / lumière forte
  1 = feuille / vert
  2 = branche / brun
  3 = sombre / tronc
  4 = autre
*/
function classifyPixel(r: number, g: number, b: number): 0 | 1 | 2 | 3 | 4 {
  // zone très lumineuse
  if (r > 210 && g > 210 && b > 210) return 0;

  // vert dominant, même clair
  if (g > r - 5 && g > b + 8 && g > 70) return 1;

  // brun / branche
  if (r > 60 && g > 35 && b < 80 && r > b + 8) return 2;

  // sombre
  if (r < 65 && g < 65 && b < 65) return 3;

  return 4;
}

function valueToLabel(value: number) {
  switch (value) {
    case 0:
      return "lumière";
    case 1:
      return "feuille";
    case 2:
      return "branche";
    case 3:
      return "sombre";
    default:
      return "autre";
  }
}

function valueToColorClass(value: number) {
  switch (value) {
    case 0:
      return "bg-sky-200 text-slate-900";
    case 1:
      return "bg-emerald-500 text-white";
    case 2:
      return "bg-amber-700 text-white";
    case 3:
      return "bg-stone-800 text-white";
    default:
      return "bg-slate-500 text-white";
  }
}

/* =========================================================
   TYPES
========================================================= */

type Particle = {
  x: number;
  y: number;
  color: string;
  phase: number;
  strength: number;
  size: number;
  srcSize: number;
};

type MatrixCell = {
  value: number;
  color: string;
};

/* =========================================================
   COMPOSANT
========================================================= */

export default function JardinImageOptimiseePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const animationStartRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const [isImageReady, setIsImageReady] = useState(false);
  const [status, setStatus] = useState("Charge l’image de feuilles.");
  const [wind, setWind] = useState(8);
  const [duration, setDuration] = useState(5);
  const [gridSize, setGridSize] = useState(8);
  const [matrix, setMatrix] = useState<MatrixCell[][]>([]);
  const [leafCount, setLeafCount] = useState(0);
  const [showDebug, setShowDebug] = useState(false);

  /* =========================================================
     NETTOYAGE
  ========================================================= */

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  function stopAnimation() {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }

  /* =========================================================
     CANVAS
  ========================================================= */

  function fitCanvasToImage(canvas: HTMLCanvasElement, width: number, height: number) {
    const maxWidth = 980;
    const maxHeight = 650;
    const scale = Math.min(maxWidth / width, maxHeight / height, 1);

    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
  }

  /* =========================================================
     IMAGE
  ========================================================= */

  function drawBaseImage() {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    return ctx;
  }

  function loadImage(file: File) {
    if (!file.type.startsWith("image/")) {
      setStatus("Ce fichier n'est pas une image.");
      return;
    }

    stopAnimation();
    setIsImageReady(false);
    setLeafCount(0);
    setMatrix([]);
    setStatus("Chargement de l’image...");

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      imageRef.current = img;

      const canvas = canvasRef.current;
      if (!canvas) return;

      fitCanvasToImage(canvas, img.naturalWidth, img.naturalHeight);

      const off = document.createElement("canvas");
      off.width = img.naturalWidth;
      off.height = img.naturalHeight;

      const offCtx = off.getContext("2d");
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0);
      offscreenRef.current = off;

      buildSimplifiedMatrix(gridSize);
      buildParticlesForLeaves();
      drawBaseImage();

      setIsImageReady(true);

      if (particlesRef.current.length > 0) {
        setStatus("Image prête. Lance l’animation.");
      } else {
        setStatus("Image chargée, mais peu de feuilles ont été détectées.");
      }
    };

    img.onerror = () => {
      setStatus("Impossible de charger l’image.");
    };

    img.src = url;
  }

  /* =========================================================
     MATRICE
  ========================================================= */

  function buildSimplifiedMatrix(size: number) {
    const off = offscreenRef.current;
    if (!off) return;

    const ctx = off.getContext("2d");
    if (!ctx) return;

    const { width, height } = off;
    const cellWidth = width / size;
    const cellHeight = height / size;

    const newMatrix: MatrixCell[][] = [];

    for (let row = 0; row < size; row++) {
      const rowCells: MatrixCell[] = [];

      for (let col = 0; col < size; col++) {
        const x = Math.floor(col * cellWidth);
        const y = Math.floor(row * cellHeight);
        const w = Math.max(1, Math.floor(cellWidth));
        const h = Math.max(1, Math.floor(cellHeight));

        const data = ctx.getImageData(x, y, w, h).data;

        let totalR = 0;
        let totalG = 0;
        let totalB = 0;
        let count = 0;

        for (let i = 0; i < data.length; i += 4) {
          totalR += data[i];
          totalG += data[i + 1];
          totalB += data[i + 2];
          count++;
        }

        const avgR = Math.round(totalR / count);
        const avgG = Math.round(totalG / count);
        const avgB = Math.round(totalB / count);

        const value = classifyPixel(avgR, avgG, avgB);

        rowCells.push({
          value,
          color: rgb(avgR, avgG, avgB),
        });
      }

      newMatrix.push(rowCells);
    }

    setMatrix(newMatrix);
  }

  /* =========================================================
     PARTICULES
  ========================================================= */

  function buildParticlesForLeaves() {
    const off = offscreenRef.current;
    if (!off) return;

    const ctx = off.getContext("2d");
    if (!ctx) return;

    const { width, height } = off;
    const data = ctx.getImageData(0, 0, width, height).data;
    const particles: Particle[] = [];

    /*
      Plus step est petit, plus on a de feuilles détectées.
      Pour ton image, 5 fonctionne bien.
    */
    const step = 5;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 10) continue;

        const type = classifyPixel(r, g, b);

        if (type === 1) {
          particles.push({
            x,
            y,
            color: rgb(r, g, b),
            phase: rand(0, Math.PI * 2),
            strength: rand(0.9, 1.9),
            size: rand(12, 22),
            srcSize: rand(10, 16),
          });
        }
      }
    }

    particlesRef.current = particles;
    setLeafCount(particles.length);
  }

  /* =========================================================
     DESSIN ANIME
  ========================================================= */

  function drawOverlay(
    ctx: CanvasRenderingContext2D,
    elapsedSeconds: number,
    remainingSeconds: number
  ) {
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(12, 12, 250, 78);

    ctx.fillStyle = "white";
    ctx.font = "16px sans-serif";
    ctx.fillText(`Temps : ${elapsedSeconds.toFixed(1)} s`, 24, 38);
    ctx.fillText(`Reste : ${remainingSeconds.toFixed(1)} s`, 24, 60);
    ctx.restore();
  }

  function drawDebugPoints(ctx: CanvasRenderingContext2D, scaleX: number, scaleY: number) {
    ctx.save();
    ctx.fillStyle = "rgba(255, 0, 0, 0.6)";

    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i += 12) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x * scaleX, p.y * scaleY, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawAnimatedLeaves(ctx: CanvasRenderingContext2D, t: number) {
    const canvas = canvasRef.current;
    const off = offscreenRef.current;
    if (!canvas || !off) return;

    const scaleX = canvas.width / off.width;
    const scaleY = canvas.height / off.height;

    /*
      Vent visible
    */
    const amp = wind * 7.5;

    ctx.save();
    ctx.imageSmoothingEnabled = true;

    for (const p of particlesRef.current) {
      const dx =
        Math.sin(t * 5 + p.phase) * amp * p.strength +
        Math.cos(t * 2.8 + p.phase) * 3.5;

      const dy =
        Math.cos(t * 4 + p.phase) * 3 +
        Math.sin(t * 2.2 + p.phase) * 1.2;

      const srcSize = p.srcSize;
      const half = srcSize / 2;

      const sx = clamp(p.x - half, 0, off.width - srcSize);
      const sy = clamp(p.y - half, 0, off.height - srcSize);

      const tx = (p.x + dx) * scaleX - p.size / 2;
      const ty = (p.y + dy) * scaleY - p.size / 2;

      // morceau réel de l'image
      ctx.globalAlpha = 0.78;
      ctx.drawImage(
        off,
        sx,
        sy,
        srcSize,
        srcSize,
        tx,
        ty,
        p.size,
        p.size
      );

      // halo léger pour mieux voir le mouvement
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.18;
      ctx.ellipse(
        (p.x + dx) * scaleX,
        (p.y + dy) * scaleY,
        p.size * 0.44,
        p.size * 0.28,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    if (showDebug) {
      drawDebugPoints(ctx, scaleX, scaleY);
    }

    ctx.restore();
  }

  /* =========================================================
     BOUCLE ANIMATION
  ========================================================= */

  function renderFrame(time: number) {
    const ctx = drawBaseImage();
    if (!ctx) return;

    if (animationStartRef.current === null) {
      animationStartRef.current = time;
    }

    const elapsed = (time - animationStartRef.current) / 1000;
    const remaining = Math.max(0, duration - elapsed);

    if (elapsed >= duration) {
      drawAnimatedLeaves(ctx, duration);
      drawOverlay(ctx, duration, 0);
      stopAnimation();
      setStatus("Animation terminée.");
      return;
    }

    drawAnimatedLeaves(ctx, elapsed);
    drawOverlay(ctx, elapsed, remaining);

    animationFrameRef.current = requestAnimationFrame(renderFrame);
  }

  function startAnimation() {
    if (!isImageReady) {
      setStatus("Charge d’abord une image.");
      return;
    }

    if (particlesRef.current.length === 0) {
      setStatus("Aucune feuille détectée, impossible d’animer.");
      return;
    }

    stopAnimation();
    animationStartRef.current = null;
    setStatus("Animation en cours...");

    animationFrameRef.current = requestAnimationFrame(renderFrame);
  }

  /* =========================================================
     MISE À JOUR MATRICE SI TAILLE CHANGE
  ========================================================= */

  useEffect(() => {
    if (!isImageReady) return;
    buildSimplifiedMatrix(gridSize);
    drawBaseImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize]);

  /* =========================================================
     STATS MATRICE
  ========================================================= */

  const stats = {
    light: 0,
    leaf: 0,
    branch: 0,
    dark: 0,
    other: 0,
  };

  for (const row of matrix) {
    for (const cell of row) {
      if (cell.value === 0) stats.light++;
      else if (cell.value === 1) stats.leaf++;
      else if (cell.value === 2) stats.branch++;
      else if (cell.value === 3) stats.dark++;
      else stats.other++;
    }
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <section className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-900/40 to-sky-900/30 p-6 shadow-2xl">
          <p className="mb-2 inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            EleveAI • Image de feuilles optimisée
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Feuilles animées avec matrice simplifiée
          </h1>

          <p className="mt-3 max-w-3xl text-sm text-slate-200 md:text-base">
            Cette version est réécrite pour fonctionner avec ton image de branche
            verte et de fond lumineux.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          {/* Panneau gauche */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur">
            <h2 className="mb-4 text-xl font-bold text-emerald-300">Réglages</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Charger l’image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) loadImage(file);
                  }}
                  className="block w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Vent : <span className="text-emerald-300">{wind}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={wind}
                  onChange={(e) => setWind(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Durée : <span className="text-emerald-300">{duration} s</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Taille de la matrice :{" "}
                  <span className="text-emerald-300">
                    {gridSize} × {gridSize}
                  </span>
                </label>
                <input
                  type="range"
                  min={4}
                  max={12}
                  step={1}
                  value={gridSize}
                  onChange={(e) => setGridSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={startAnimation}
                  className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
                >
                  ▶ Lancer l’animation
                </button>

                <button
                  onClick={() => {
                    stopAnimation();
                    drawBaseImage();
                    setStatus("Animation arrêtée.");
                  }}
                  className="rounded-2xl bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-600"
                >
                  ■ Arrêter
                </button>

                <button
                  onClick={() => setShowDebug((v) => !v)}
                  className="rounded-2xl bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
                >
                  {showDebug ? "Masquer debug" : "Afficher debug"}
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-200">
                <p className="font-semibold text-emerald-300">État</p>
                <p className="mt-2">{status}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-sm text-slate-300">
                <p className="font-semibold text-slate-100">Détection</p>
                <p className="mt-2">Feuilles détectées : {leafCount}</p>
                <p className="mt-2 text-xs text-slate-400">
                  Avec cette image, il faut généralement plusieurs centaines de
                  particules pour que le mouvement soit bien visible.
                </p>
              </div>
            </div>
          </section>

          {/* Partie droite */}
          <section className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-4 shadow-2xl">
              <div className="mb-3">
                <h2 className="text-xl font-bold text-sky-300">Animation</h2>
                <p className="text-sm text-slate-400">
                  Les morceaux verts de l’image sont redessinés avec un décalage
                  animé.
                </p>
              </div>

              <div className="flex min-h-[420px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                {!isImageReady ? (
                  <div className="p-10 text-center text-slate-400">
                    <p className="text-lg font-semibold text-slate-200">
                      Aucune image chargée
                    </p>
                    <p className="mt-2 text-sm">
                      Charge maintenant l’image générée avec les grandes feuilles.
                    </p>
                  </div>
                ) : null}

                <canvas
                  ref={canvasRef}
                  className={isImageReady ? "max-h-[75vh] max-w-full rounded-xl" : "hidden"}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-emerald-300">
                  Matrice simplifiée
                </h2>
                <p className="text-sm text-slate-400">
                  Chaque case représente une grande zone de l’image.
                </p>
              </div>

              {matrix.length === 0 ? (
                <p className="text-sm text-slate-400">
                  La matrice apparaîtra après le chargement de l’image.
                </p>
              ) : (
                <>
                  <div className="overflow-auto">
                    <div
                      className="grid gap-1"
                      style={{
                        gridTemplateColumns: `repeat(${matrix[0]?.length ?? 0}, minmax(0, 1fr))`,
                      }}
                    >
                      {matrix.flatMap((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            title={`ligne ${rowIndex + 1}, colonne ${colIndex + 1} : ${valueToLabel(
                              cell.value
                            )}`}
                            className={`flex h-10 w-10 items-center justify-center rounded text-xs font-bold ${valueToColorClass(
                              cell.value
                            )}`}
                          >
                            {cell.value}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                    <div className="rounded-2xl bg-sky-200/20 p-3 text-sm">
                      <span className="font-bold">0 = lumière</span>
                      <p className="mt-1 text-slate-300">{stats.light} case(s)</p>
                    </div>

                    <div className="rounded-2xl bg-emerald-500/20 p-3 text-sm">
                      <span className="font-bold">1 = feuille</span>
                      <p className="mt-1 text-slate-300">{stats.leaf} case(s)</p>
                    </div>

                    <div className="rounded-2xl bg-amber-700/20 p-3 text-sm">
                      <span className="font-bold">2 = branche</span>
                      <p className="mt-1 text-slate-300">{stats.branch} case(s)</p>
                    </div>

                    <div className="rounded-2xl bg-stone-800/20 p-3 text-sm">
                      <span className="font-bold">3 = sombre</span>
                      <p className="mt-1 text-slate-300">{stats.dark} case(s)</p>
                    </div>

                    <div className="rounded-2xl bg-slate-500/20 p-3 text-sm">
                      <span className="font-bold">4 = autre</span>
                      <p className="mt-1 text-slate-300">{stats.other} case(s)</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-5">
              <h2 className="text-xl font-bold text-yellow-300">Explication simple</h2>
              <div className="mt-3 space-y-2 text-sm text-slate-200">
                <p>1. On charge une image.</p>
                <p>2. On repère surtout les zones vertes.</p>
                <p>3. On crée une matrice simplifiée.</p>
                <p>4. On découpe de petits morceaux de feuilles.</p>
                <p>5. On les déplace un peu pour simuler le vent.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}