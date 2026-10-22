"use client";

// Le sélecteur de pays du COACH (22/10/2026) — Frédéric : « le sélecteur doit
// venir du coach, pas du tutor ». Il se pose dans la rangée de pastilles de
// /coach-ia/maths et de /pays/<pays> : la France ouvre le coach habituel, un
// autre pays ouvre son programme mis en correspondance avec nos séries.
// Le choix est aussi gardé dans le navigateur (préférence, pour la suite).

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CLE_PAYS, PAYS } from "@/lib/programmes-pays/pays";

export default function SelecteurPays({ paysActuel }: { paysActuel: string }) {
  const router = useRouter();
  const [pays, setPays] = useState<string>(paysActuel);

  function choisir(valeur: string) {
    setPays(valeur);
    try {
      if (valeur === "france") localStorage.removeItem(CLE_PAYS);
      else localStorage.setItem(CLE_PAYS, valeur);
    } catch {}
    router.push(valeur === "france" ? "/coach-ia/maths" : `/pays/${valeur}`);
  }

  return (
    <label className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white py-1 pl-4 pr-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
      Programme
      <select
        value={pays}
        onChange={(e) => choisir(e.target.value)}
        className="cursor-pointer rounded-full bg-transparent py-1 font-bold text-teal-700 outline-none"
      >
        <option value="france">France</option>
        {PAYS.map((p) => (
          <option key={p.slug} value={p.slug}>
            {p.nom}
          </option>
        ))}
      </select>
    </label>
  );
}
