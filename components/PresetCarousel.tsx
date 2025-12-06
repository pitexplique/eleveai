"use client";

import { useRef } from "react";

export type PresetCarouselItem = {
  id: string;
  label: string;
  description: string;
  badge?: string;
  icon?: React.ReactNode;
};

type PresetCarouselProps = {
  title?: string;
  subtitle?: string;
  items: PresetCarouselItem[];
  onSelect: (id: string) => void;
};

export function PresetCarousel({
  title,
  subtitle,
  items,
  onSelect,
}: PresetCarouselProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const delta = direction === "left" ? -260 : 260;
    scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="mb-6 rounded-3xl bg-white/90 p-4 sm:p-5 shadow-sm ring-1 ring-emerald-100">
      {title && (
        <h2 className="mb-1 text-base font-semibold text-slate-900">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mb-3 text-xs sm:text-sm text-slate-600">{subtitle}</p>
      )}

      <div className="relative">
        {/* Bouton gauche */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md ring-1 ring-slate-200 hover:bg-slate-100 md:flex"
        >
          ◀
        </button>

        {/* Liste horizontale */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth py-1 pr-2 no-scrollbar"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className="min-w-[220px] max-w-[260px] flex-1 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-left text-xs shadow-sm hover:bg-emerald-100"
            >
              <div className="mb-1 flex items-center gap-2">
                {item.icon && <span>{item.icon}</span>}
                <span className="font-semibold text-emerald-900">
                  {item.label}
                </span>
              </div>
              <p className="text-[11px] text-emerald-900/90">
                {item.description}
              </p>
              {item.badge && (
                <div className="mt-2 inline-flex rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                  {item.badge}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Bouton droite */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md ring-1 ring-slate-200 hover:bg-slate-100 md:flex"
        >
          ▶
        </button>
      </div>
    </section>
  );
}
