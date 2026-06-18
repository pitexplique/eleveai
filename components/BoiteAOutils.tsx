"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Calculatrice flottante, réutilisable sur toutes les rubriques maths
 * (fiches de cours, tutor, coach…). Composant autonome : il gère son propre
 * état, il suffit de poser <BoiteAOutils /> sur une page.
 *
 * Demande élèves (2026-06-18) : une calculatrice accessible pendant les
 * exercices et la lecture des fiches. Placée en BAS AU CENTRE (Écris-moi à
 * gauche, Coach IA à droite).
 *
 * Deux modes : simple (par défaut, primaire/collège) et scientifique (sin, cos,
 * tan + inverses, ln, log, exp, π, e) avec bascule DEG/RAD pour la trigo.
 *
 * La calculatrice n'utilise PAS eval : un petit évaluateur maison (récursif)
 * gère + − × ÷, parenthèses, virgule/point décimal, puissance (^), racine (√),
 * pourcentage (%), les fonctions ci-dessus et les constantes π / e. Sûr et
 * hors-ligne.
 */

type AngleMode = "deg" | "rad";

// --- Évaluateur d'expression sûr (récursif, sans eval) ---------------------
// Grammaire : expr = terme (('+'|'-') terme)*
//             terme = facteur (('*'|'/') facteur)*
//             facteur = ('+'|'-')? puissance
//             puissance = atome ('^' facteur)?   (puissance associative à droite)
//             atome = nombre | constante | fonction'(' expr ')' | '(' expr ')' | '√' facteur
//             un suffixe '%' divise l'atome par 100
function evaluerExpression(input: string, angleMode: AngleMode): number {
  // Normalise les symboles d'affichage vers des opérateurs simples.
  const src = input
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/,/g, ".")
    .replace(/π/g, String(Math.PI));

  const versRad = (x: number) => (angleMode === "deg" ? (x * Math.PI) / 180 : x);
  const depuisRad = (x: number) => (angleMode === "deg" ? (x * 180) / Math.PI : x);

  const FONCTIONS: Record<string, (x: number) => number> = {
    sin: (x) => Math.sin(versRad(x)),
    cos: (x) => Math.cos(versRad(x)),
    tan: (x) => Math.tan(versRad(x)),
    asin: (x) => depuisRad(Math.asin(x)),
    acos: (x) => depuisRad(Math.acos(x)),
    atan: (x) => depuisRad(Math.atan(x)),
    ln: (x) => Math.log(x),
    log: (x) => Math.log10(x),
    exp: (x) => Math.exp(x),
    sqrt: (x) => Math.sqrt(x),
    abs: (x) => Math.abs(x),
  };

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
    // fonction (sin, cos, ln…) ou constante (e)
    if (/[a-zA-Z]/.test(src[i])) {
      const debut = i;
      while (i < src.length && /[a-zA-Z]/.test(src[i])) i++;
      const nom = src.slice(debut, i).toLowerCase();
      espaces();
      if (src[i] === "(") {
        i++;
        const arg = parseExpr();
        espaces();
        if (src[i] === ")") i++;
        else throw new Error("Parenthèse fermante manquante");
        const fn = FONCTIONS[nom];
        if (!fn) throw new Error("Fonction inconnue");
        return appliquerPourcent(fn(arg));
      }
      if (nom === "e") return appliquerPourcent(Math.E);
      throw new Error("Identifiant inconnu");
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

// Arrondit proprement (évite 0.30000000000004 et les ε de trigo) sans imposer
// de format rigide.
function formaterResultat(n: number): string {
  if (Number.isInteger(n)) return String(n);
  const arrondi = Math.round(n * 1e10) / 1e10;
  return String(arrondi);
}

type Touche = {
  label: string;
  // ce qu'on ajoute à l'expression (par défaut = label)
  inserer?: string;
  action?: "egal" | "effacer" | "supprimer" | "parenthese";
  variante?: "chiffre" | "operateur" | "fonction" | "egal" | "effacer";
};

// Clavier scientifique (affiché seulement en mode scientifique).
const TOUCHES_SCI: Touche[] = [
  { label: "sin", inserer: "sin(", variante: "fonction" },
  { label: "cos", inserer: "cos(", variante: "fonction" },
  { label: "tan", inserer: "tan(", variante: "fonction" },
  { label: "π", inserer: "π", variante: "fonction" },

  { label: "sin⁻¹", inserer: "asin(", variante: "fonction" },
  { label: "cos⁻¹", inserer: "acos(", variante: "fonction" },
  { label: "tan⁻¹", inserer: "atan(", variante: "fonction" },
  { label: "e", inserer: "e", variante: "fonction" },

  { label: "ln", inserer: "ln(", variante: "fonction" },
  { label: "log", inserer: "log(", variante: "fonction" },
  { label: "eˣ", inserer: "exp(", variante: "fonction" },
  { label: "10ˣ", inserer: "10^", variante: "fonction" },
];

const TOUCHES: Touche[] = [
  { label: "C", action: "effacer", variante: "effacer" },
  { label: "( )", action: "parenthese", variante: "fonction" },
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
  const [scientifique, setScientifique] = useState(false);
  const [angleMode, setAngleMode] = useState<AngleMode>("deg");
  const [expression, setExpression] = useState("");
  const [resultat, setResultat] = useState("");
  const [erreur, setErreur] = useState(false);
  const ecranRef = useRef<HTMLDivElement | null>(null);

  // Aperçu du résultat en direct pendant la frappe (recalculé aussi au
  // changement de mode DEG/RAD).
  useEffect(() => {
    if (!expression.trim()) {
      setResultat("");
      setErreur(false);
      return;
    }
    try {
      const valeur = evaluerExpression(expression, angleMode);
      const texte = formaterResultat(valeur);
      // Pas d'aperçu « = X » si l'expression est déjà ce nombre (après un "=").
      setResultat(texte === expression.trim() ? "" : texte);
      setErreur(false);
    } catch {
      setResultat("");
      setErreur(false); // pas d'erreur tant qu'on tape ; l'erreur n'apparaît qu'au "="
    }
  }, [expression, angleMode]);

  useEffect(() => {
    const ecran = ecranRef.current;
    if (ecran) ecran.scrollLeft = ecran.scrollWidth;
  }, [expression]);

  function evaluerMaintenant() {
    if (!expression.trim()) return;
    try {
      const valeur = evaluerExpression(expression, angleMode);
      setExpression(formaterResultat(valeur));
      setResultat("");
      setErreur(false);
    } catch {
      setErreur(true);
    }
  }

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
    if (touche.action === "parenthese") {
      // Parenthèse intelligente : ferme si une ouverte attend, sinon ouvre.
      setExpression((prev) => {
        const ouvertes = (prev.match(/\(/g) ?? []).length;
        const fermees = (prev.match(/\)/g) ?? []).length;
        const dernier = prev.slice(-1);
        const apresOperateurOuVide = prev === "" || "+-×÷^(".includes(dernier);
        const onFerme = ouvertes > fermees && !apresOperateurOuVide;
        return prev + (onFerme ? ")" : "(");
      });
      setErreur(false);
      return;
    }
    if (touche.action === "egal") {
      evaluerMaintenant();
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
        evaluerMaintenant();
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
  }, [open, expression, angleMode]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir la calculatrice"
        className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 px-5 py-3 text-sm font-black text-white shadow-2xl ring-2 ring-white/50 transition hover:scale-105 print:hidden"
      >
        🧮 <span className="hidden sm:inline">Calculatrice</span>
      </button>
    );
  }

  return (
    <aside className="fixed bottom-5 left-1/2 z-50 flex w-[290px] -translate-x-1/2 flex-col overflow-hidden rounded-3xl border border-cyan-200 bg-[#f5f8ff] text-slate-800 shadow-2xl sm:w-[320px] print:hidden">
      <div className="flex items-center justify-between bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 px-5 py-4">
        <div>
          <p className="font-black text-white">🧮 Calculatrice</p>
          <p className="text-[11px] font-bold text-white/80">
            {scientifique ? "Scientifique" : "Simple"}
          </p>
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

        {/* Barre de contrôle : mode scientifique + DEG/RAD */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setScientifique((v) => !v)}
            className={[
              "rounded-full px-3 py-1.5 text-xs font-black transition",
              scientifique
                ? "bg-cyan-500 text-white hover:bg-cyan-400"
                : "bg-slate-200 text-slate-600 hover:bg-slate-300",
            ].join(" ")}
          >
            🔬 Scientifique
          </button>
          {scientifique ? (
            <button
              type="button"
              onClick={() => setAngleMode((m) => (m === "deg" ? "rad" : "deg"))}
              aria-label="Basculer degrés / radians"
              className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-700 hover:bg-emerald-200"
            >
              {angleMode === "deg" ? "DEG" : "RAD"}
            </button>
          ) : null}
        </div>

        {/* Clavier scientifique */}
        {scientifique ? (
          <div className="mb-2 grid grid-cols-4 gap-2">
            {TOUCHES_SCI.map((touche) => (
              <button
                key={touche.label}
                type="button"
                onClick={() => appuyer(touche)}
                className={[
                  "rounded-xl py-2.5 text-sm font-black shadow-sm transition active:scale-95",
                  STYLE_VARIANTE[touche.variante ?? "chiffre"],
                ].join(" ")}
              >
                {touche.label}
              </button>
            ))}
          </div>
        ) : null}

        {/* Clavier standard */}
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
