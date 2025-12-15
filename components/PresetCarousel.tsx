"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export type PresetCarouselItem = {
  id: string;
  label: string;
  description: string;
  badge?: string;
  icon?: React.ReactNode;
  badges?: string[];
};

type PresetCarouselProps = {
  title?: string;
  subtitle?: string;
  items: PresetCarouselItem[];
  onSelect: (id: string) => void;
  showControls?: boolean;
  searchPlaceholder?: string;
  tone?: "emerald" | "sky" | "amber" | "slate";
};

/* ----------------------------------------
   PERF: debounce (évite filtre à chaque lettre)
---------------------------------------- */
function useDebouncedValue<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

/* ----------------------------------------
   HELPERS
---------------------------------------- */
function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function uniqKeepOrder(arr: string[]) {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const a of arr) {
    const v = (a || "").trim();
    if (!v) continue;
    if (!seen.has(v)) {
      seen.add(v);
      out.push(v);
    }
  }
  return out;
}

function deriveBadges(item: PresetCarouselItem): string[] {
  const raw = [...(item.badges ?? []), item.badge ?? "", item.label, item.description]
    .filter(Boolean)
    .join(" | ");

  const s = normalize(raw);

  const tags: string[] = [];
  if (s.includes("dys")) tags.push("DYS");
  if (s.includes("brevet") || s.includes("dnb")) tags.push("Brevet");
  if (s.includes("bac") || s.includes("annale")) tags.push("Bac");
  if (s.includes("word expert") || s.includes("expert")) tags.push("Word Expert");
  if (s.includes("seance") || s.includes("séance")) tags.push("Séance");
  if (s.includes("exercice")) tags.push("Exercices");

  if (item.badge && !tags.includes(item.badge)) tags.push(item.badge);

  return uniqKeepOrder(tags);
}

export function PresetCarousel({
  title,
  subtitle,
  items,
  onSelect,
  showControls = true,
  searchPlaceholder = "Rechercher un modèle… (ex : brevet, fractions, philo)",
  tone = "emerald",
}: PresetCarouselProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const firstBtnRef = useRef<HTMLButtonElement | null>(null);

  const [q, setQ] = useState("");
  const debouncedQ = useDebouncedValue(q, 250);

  const [activeTag, setActiveTag] = useState<string>("Tous");
  const [sortMode, setSortMode] = useState<"ordre" | "az">("ordre");

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const toneClasses =
    tone === "sky"
      ? {
          ring: "ring-1 ring-sky-100",
          card: "border-sky-200 bg-sky-50 hover:bg-sky-100",
          title: "text-sky-900",
          desc: "text-sky-900/90",
          badge: "text-sky-700 ring-sky-200",
          chipActive: "border-sky-400 bg-sky-100 text-sky-800",
        }
      : tone === "amber"
      ? {
          ring: "ring-1 ring-amber-100",
          card: "border-amber-200 bg-amber-50 hover:bg-amber-100",
          title: "text-amber-900",
          desc: "text-amber-900/90",
          badge: "text-amber-700 ring-amber-200",
          chipActive: "border-amber-400 bg-amber-100 text-amber-900",
        }
      : tone === "slate"
      ? {
          ring: "ring-1 ring-slate-200",
          card: "border-slate-200 bg-slate-50 hover:bg-slate-100",
          title: "text-slate-900",
          desc: "text-slate-900/90",
          badge: "text-slate-700 ring-slate-200",
          chipActive: "border-slate-400 bg-slate-100 text-slate-800",
        }
      : {
          ring: "ring-1 ring-emerald-100",
          card: "border-emerald-200 bg-emerald-50 hover:bg-emerald-100",
          title: "text-emerald-900",
          desc: "text-emerald-900/90",
          badge: "text-emerald-700 ring-emerald-200",
          chipActive: "border-emerald-400 bg-emerald-100 text-emerald-900",
        };

  // ✅ indexation (pré-calcul) : norm + tags une seule fois
  const indexed = useMemo(() => {
    return items.map((it, idx) => ({
      ...it,
      __idx: idx,
      __norm: normalize(`${it.label} ${it.description} ${(it.badge ?? "")} ${(it.badges ?? []).join(" ")}`),
      __tags: deriveBadges(it),
    }));
  }, [items]);

  const allTags = useMemo(() => {
    const bag: string[] = ["Tous"];
    for (const it of indexed) bag.push(...it.__tags);
    return uniqKeepOrder(bag);
  }, [indexed]);

  // ✅ filtre basé sur debouncedQ (pas q)
  const filtered = useMemo(() => {
    const nq = normalize(debouncedQ);

    let list = indexed.filter((it) => {
      const okQ = !nq || it.__norm.includes(nq);
      const okTag = activeTag === "Tous" || it.__tags.includes(activeTag);
      return okQ && okTag;
    });

    if (sortMode === "az") {
      list = [...list].sort((a, b) => a.label.localeCompare(b.label, "fr"));
    } else {
      list = [...list].sort((a, b) => a.__idx - b.__idx);
    }

    return list;
  }, [indexed, debouncedQ, activeTag, sortMode]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const delta = direction === "left" ? -320 : 320;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const eps = 4;
    setCanLeft(el.scrollLeft > eps);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - eps);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => updateScrollState();
    const onResize = () => updateScrollState();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ✅ IMPORTANT : on ne fait PLUS scroll+focus à chaque frappe
  // - on scroll au début quand tag/tri changent
  // - pour la recherche, on scroll seulement quand la valeur debounced change (et sans "smooth")
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: 0, behavior: "smooth" });
    setTimeout(() => firstBtnRef.current?.focus(), 50);
  }, [activeTag, sortMode]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: 0, behavior: "auto" });
  }, [debouncedQ]);

  const onKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    scroll(e.key === "ArrowLeft" ? "left" : "right");
  };

  return (
    <section className={`mb-6 rounded-3xl bg-white/90 p-4 sm:p-5 shadow-sm ${toneClasses.ring}`}>
      {(title || subtitle) && (
        <div className="mb-3">
          {title && <h2 className="mb-1 text-base font-semibold text-slate-900">{title}</h2>}
          {subtitle && <p className="text-xs sm:text-sm text-slate-600">{subtitle}</p>}
        </div>
      )}

      {showControls && (
        <div className="mb-3 grid gap-2 sm:grid-cols-[1fr,auto] sm:items-center">
          <div className="flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200"
            />

            <button
              type="button"
              onClick={() => {
                setQ("");
                setActiveTag("Tous");
                setSortMode("ordre");
              }}
              className="shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              title="Réinitialiser les filtres"
            >
              Reset
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-600">Tri</span>
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as "ordre" | "az")}
                className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs"
              >
                <option value="ordre">Recommandé</option>
                <option value="az">A → Z</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {showControls && allTags.length > 1 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {allTags.map((t) => {
            const active = t === activeTag;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTag(t)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold border transition ${
                  active ? toneClasses.chipActive : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canLeft}
          className={`absolute left-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full shadow-md ring-1 md:flex ${
            canLeft
              ? "bg-white/95 text-slate-700 ring-slate-200 hover:bg-slate-100"
              : "bg-white/60 text-slate-300 ring-slate-100 cursor-not-allowed"
          }`}
          aria-label="Défiler vers la gauche"
        >
          ◀
        </button>

        <div
          ref={scrollRef}
          onKeyDown={onKeyDownList}
          tabIndex={0}
          className="flex gap-3 overflow-x-auto scroll-smooth py-1 pr-2 no-scrollbar outline-none"
          aria-label="Modèles rapides"
        >
          {filtered.length === 0 ? (
            <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              Aucun modèle ne correspond. Essaie un autre mot-clé.
            </div>
          ) : (
            filtered.map((item, i) => (
              <button
                key={item.id}
                ref={i === 0 ? firstBtnRef : null}
                type="button"
                onClick={() => onSelect(item.id)}
                className={`min-w-[240px] max-w-[320px] flex-1 rounded-2xl border px-3 py-3 text-left text-xs shadow-sm transition ${toneClasses.card}`}
                title="Cliquer pour pré-remplir"
              >
                <div className="mb-1 flex items-center gap-2">
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span className={`font-semibold ${toneClasses.title}`}>{item.label}</span>
                </div>

                <p className={`text-[11px] ${toneClasses.desc}`}>{item.description}</p>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(item as any).__tags?.slice(0, 3).map((b: string) => (
                    <span
                      key={b}
                      className={`inline-flex rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold ring-1 ${toneClasses.badge}`}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </button>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canRight}
          className={`absolute right-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full shadow-md ring-1 md:flex ${
            canRight
              ? "bg-white/95 text-slate-700 ring-slate-200 hover:bg-slate-100"
              : "bg-white/60 text-slate-300 ring-slate-100 cursor-not-allowed"
          }`}
          aria-label="Défiler vers la droite"
        >
          ▶
        </button>
      </div>
    </section>
  );
}
