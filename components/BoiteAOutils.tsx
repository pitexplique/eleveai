"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Boîte à outils flottante, réutilisable sur toutes les rubriques maths
 * (fiches de cours, tutor, coach…). Composant autonome : il gère son propre
 * état, il suffit de poser <BoiteAOutils /> sur une page.
 *
 * Demande élèves (2026-06-18) : une calculatrice accessible pendant les
 * exercices et la lecture des fiches. Placé en BAS À GAUCHE (une élève l'a
 * demandé là), pour ne pas heurter le Coach IA flottant en bas à droite.
 *
 * La calculatrice n'utilise PAS eval : un petit évaluateur maison (récursif)
 * gère + − × ÷, parenthèses, virgule/point décimal, puissance (^), racine (√)
 * et pourcentage (%). Sûr et hors-ligne.
 */

// --- Évaluateur d'expression sûr (récursif, sans eval) ---------------------
// Grammaire : expr = terme (('+'|'-') terme)*
//             terme = facteur (('*'|'/') facteur)*
//             facteur = ('+'|'-')? puissance
//             puissance = atome ('^' facteur)?   (puissance associative à droite)
//             atome = nombre | '(' expr ')' | '√' facteur
//             un suffixe '%' divise l'atome par 100
function evaluerExpression(input: string): number {
  // Normalise les symboles d'affichage vers des opérateurs simples.
  const src = input
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/,/g, ".")
    .replace(/π/g, String(Math.PI));

  let i = 0;

  function espaces() {
    while (i < src.length && src[i] === " ") i++;
  }

  function parseExpr(): number {
    let valeur = parseTerme();
    espaces();
    while (i < src.length && (src[i] === "+" || src[i] === "-")) {
      const op = src[i++];
      const droite = parseTerme();
      valeur = op === "+" ? valeur + droite : valeur - droite;
      espaces();
    }
    return valeur;
  }

  function parseTerme(): number {
    let valeur = parseFacteur();
    espaces();
    while (i < src.length && (src[i] === "*" || src[i] === "/")) {
      const op = src[i++];
      const droite = parseFacteur();
      valeur = op === "*" ? valeur * droite : valeur / droite;
      espaces();
    }
    return valeur;
  }

  function parseFacteur(): number {
    espaces();
    if (src[i] === "+") {
      i++;
      return parseFacteur();
    }
    if (src[i] === "-") {
      i++;
      return -parseFacteur();
    }
    return parsePuissance();
  }

  function parsePuissance(): number {
    const base = parseAtome();
    espaces();
    if (src[i] === "^") {
      i++;
      const exposant = parseFacteur(); // associatif à droite
      return Math.pow(base, exposant);
    }
    return base;
  }

  function appliquerPourcent(valeur: number): number {
    espaces();
    if (src[i] === "%") {
      i++;
      return valeur / 100;
    }
    return valeur;
  }

  function parseAtome(): number {
    espaces();
    if (src[i] === "(") {
      i++;
      const valeur = parseExpr();
      espaces();
      if (src[i] === ")") i++;
      else throw new Error("Parenthèse fermante manquante");
      return appliquerPourcent(valeur);
    }
    if (src[i] === "√") {
      i++;
      const valeur = Math.sqrt(parseFacteur());
      return appliquerPourcent(valeur);
    }
    // nombre
    const debut = i;
    while (i < src.length && (/[0-9.]/.test(src[i]))) i++;
    if (i === debut) throw new Error("Nombre attendu");
    const nombre = parseFloat(src.slice(debut, i));
    if (Number.isNaN(nombre)) throw new Error("Nombre invalide");
    return appliquerPourcent(nombre);
  }

  const resultat = parseExpr();
  espaces();
  if (i < src.length) throw new Error("Expression invalide");
  if (!Number.isFinite(resultat)) throw new Error("Résultat non défini");
  return resultat;
}

// Arrondit proprement (évite 0.30000000000004) sans imposer de format rigide.
function formaterResultat(n: number): string {
  if (Number.isInteger(n)) return String(n);
  const arrondi = Math.round(n * 1e10) / 1e10;
  return String(arrondi);
}

type Touche = {
  label: string;
  // ce qu'on ajoute à l'expression (par défaut = label)
  inserer?: string;
  action?: "egal" | "effacer" | "supprimer";
  // style : accent (opérateurs), chiffre, fonction, egal
  variante?: "chiffre" | "operateur" | "fonction" | "egal" | "effacer";
  large?: boolean;
};

const TOUCHES: Touche[] = [
  { label: "C", action: "effacer", variante: "effacer" },
  { label: "( )", inserer: "(", variante: "fonction" },
  { label: "√", inserer: "√", variante: "fonction" },
  { label: "⌫", action: "supprimer", variante: "fonction" },

  { label: "7", variante: "chiffre" },
  { label: "8", variante: "chiffre" },
  { label: "9", variante: "chiffre" },
  { label: "÷", inserer: "÷", variante: "operateur" },

  { label: "4", variante: "chiffre" },
  { label: "5", variante: "chiffre" },
  { label: "6", variante: "chiffre" },
  { label: "×", inserer: "×", variante: "operateur" },

  { label: "1", variante: "chiffre" },
  { label: "2", variante: "chiffre" },
  { label: "3", variante: "chiffre" },
  { label: "−", inserer: "-", variante: "operateur" },

  { label: "0", variante: "chiffre" },
  { label: ",", inserer: ",", variante: "chiffre" },
  { label: "%", inserer: "%", variante: "fonction" },
  { label: "+", inserer: "+", variante: "operateur" },

  { label: "x²", inserer: "^2", variante: "fonction" },
  { label: "^", inserer: "^", variante: "fonction" },
  { label: "π", inserer: "π", variante: "fonction" },
  { label: "=", action: "egal", variante: "egal" },
];

const STYLE_VARIANTE: Record<NonNullable<Touche["variante"]>, string> = {
  chiffre: "bg-white text-slate-800 hover:bg-slate-100",
  operateur: "bg-cyan-100 text-cyan-700 hover:bg-cyan-200",
  fonction: "bg-slate-100 text-slate-600 hover:bg-slate-200",
  egal: "bg-gradient-to-br from-cyan-500 to-emerald-500 text-white hover:from-cyan-400 hover:to-emerald-400",
  effacer: "bg-pink-100 text-pink-700 hover:bg-pink-200",
};

export default function BoiteAOutils() {
  const [open, setOpen] = useState(false);
  const [expression, setExpression] = useState("");
  const [resultat, setResultat] = useState("");
  const [erreur, setErreur] = useState(false);
  const ecranRef = useRef<HTMLDivElement | null>(null);

  // Aperçu du résultat en direct pendant la frappe.
  useEffect(() => {
    if (!expression.trim()) {
      setResultat("");
      setErreur(false);
      return;
    }
    try {
      const valeur = evaluerExpression(expression);
      setResultat(formaterResultat(valeur));
      setErreur(false);
    } catch {
      setResultat("");
      setErreur(false); // pas d'erreur tant qu'on tape ; l'erreur n'apparaît qu'au "="
    }
  }, [expression]);

  useEffect(() => {
    const ecran = ecranRef.current;
    if (ecran) ecran.scrollLeft = ecran.scrollWidth;
  }, [expression]);

  function appuyer(touche: Touche) {
    if (touche.action === "effacer") {
      setExpression("");
      setResultat("");
      setErreur(false);
      return;
    }
    if (touche.action === "supprimer") {
      setExpression((prev) => prev.slice(0, -1));
      setErreur(false);
      return;
    }
    if (touche.action === "egal") {
      if (!expression.trim()) return;
      try {
        const valeur = evaluerExpression(expression);
        const texte = formaterResultat(valeur);
        setExpression(texte);
        setResultat("");
        setErreur(false);
      } catch {
        setErreur(true);
      }
      return;
    }
    const morceau = touche.inserer ?? touche.label;
    setExpression((prev) => prev + morceau);
    setErreur(false);
  }

  // Saisie clavier quand la boîte est ouverte.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      const k = e.key;
      if (k === "Escape") {
        setOpen(false);
        return;
      }
      if (/[0-9]/.test(k)) {
        setExpression((p) => p + k);
      } else if (k === "+" || k === "-" || k === "(" || k === ")" || k === "^" || k === "%") {
        setExpression((p) => p + k);
      } else if (k === "*") {
        setExpression((p) => p + "×");
      } else if (k === "/") {
        setExpression((p) => p + "÷");
      } else if (k === "." || k === ",") {
        setExpression((p) => p + ",");
      } else if (k === "Enter" || k === "=") {
        e.preventDefault();
        appuyer({ label: "=", action: "egal" });
      } else if (k === "Backspace") {
        setExpression((p) => p.slice(0, -1));
      } else {
        return;
      }
      setErreur(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, expression]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir la boîte à outils"
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 px-5 py-3 text-sm font-black text-white shadow-2xl ring-2 ring-white/50 transition hover:scale-105 print:hidden"
      >
        🧮 <span className="hidden sm:inline">Boîte à outils</span>
      </button>
    );
  }

  return (
    <aside className="fixed bottom-5 left-5 z-50 flex w-[290px] flex-col overflow-hidden rounded-3xl border border-cyan-200 bg-[#f5f8ff] text-slate-800 shadow-2xl sm:w-[320px] print:hidden">
      <div className="flex items-center justify-between bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 px-5 py-4">
        <div>
          <p className="font-black text-white">🧮 Boîte à outils</p>
          <p className="text-[11px] font-bold text-white/80">Calculatrice</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fermer"
          className="rounded-full bg-white/25 px-3 py-1 text-xs font-black text-white hover:bg-white/40"
        >
          ✕
        </button>
      </div>

      <div className="p-3">
        {/* Écran */}
        <div
          className={[
            "mb-3 rounded-2xl border bg-white px-4 py-3 text-right shadow-inner",
            erreur ? "border-pink-300" : "border-slate-200",
          ].join(" ")}
        >
          <div
            ref={ecranRef}
            className="min-h-[1.5rem] overflow-x-auto whitespace-nowrap text-lg font-bold text-slate-800"
          >
            {expression || <span className="text-slate-300">0</span>}
          </div>
          <div className="min-h-[1.25rem] text-sm font-semibold text-slate-400">
            {erreur ? (
              <span className="text-pink-600">Expression invalide</span>
            ) : resultat ? (
              <span>= {resultat}</span>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Clavier */}
        <div className="grid grid-cols-4 gap-2">
          {TOUCHES.map((touche) => (
            <button
              key={touche.label}
              type="button"
              onClick={() => appuyer(touche)}
              className={[
                "rounded-xl py-3 text-base font-black shadow-sm transition active:scale-95",
                STYLE_VARIANTE[touche.variante ?? "chiffre"],
              ].join(" ")}
            >
              {touche.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
