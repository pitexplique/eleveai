// 🔹 Fonctions utiles pour gérer les défis

import { defis } from "./data/defis";
import type { Defi } from "./types";

// 🔸 Convertit une date en format YYYY-MM-DD
function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// 🔸 Récupère le défi du jour
export function getDefiDuJour(date = new Date()): Defi {
  const today = toIsoDate(date);

  // 1️⃣ On cherche s’il existe un défi avec une date précise
  const defiAvecDate = defis.find((d) => d.date === today);
  if (defiAvecDate) return defiAvecDate;

  // 2️⃣ Sinon, rotation automatique
  const index =
    Math.floor(date.getTime() / (1000 * 60 * 60 * 24)) % defis.length;

  return defis[index];
}

// 🔸 Récupère tous les défis (pour la page /defis)
export function getAllDefis(): Defi[] {
  return defis;
}