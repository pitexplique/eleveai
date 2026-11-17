"use client";

// Clavier à chiffres pour taper le code, « comme La Banque Postale » (17/11) :
// 10 grosses touches mélangées à chaque ouverture, sur 2 lignes de 5. Pour
// effacer, une croix apparaît à droite des ronds dès le premier chiffre
// (PointsCode). Rien ne change dans la vérification : on remplit seulement
// la valeur du code.

import { useRef, useState } from "react";

type Props = {
  valeur: string;
  onChange: (v: string) => void;
  longueurMax?: number;
  desactive?: boolean;
};

function melanger(): string[] {
  const chiffres = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (let i = chiffres.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chiffres[i], chiffres[j]] = [chiffres[j], chiffres[i]];
  }
  return chiffres;
}

export default function ClavierCode({
  valeur,
  onChange,
  longueurMax = 8,
  desactive = false,
}: Props) {
  // Le formulaire du code n'existe qu'après un clic : ce composant naît dans
  // le navigateur, le mélange ne gêne donc pas le rendu serveur.
  const [touches] = useState(melanger);
  // Dernière valeur connue : deux appuis très rapides comptent pour deux.
  const courant = useRef(valeur);
  courant.current = valeur;

  const ajouter = (c: string) => {
    if (desactive || courant.current.length >= longueurMax) return;
    courant.current = courant.current + c;
    onChange(courant.current);
  };

  return (
    <div
      className="grid grid-cols-5 gap-2"
      aria-label="Clavier pour taper le code"
    >
      {touches.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => ajouter(c)}
          disabled={desactive}
          className="h-12 rounded-lg bg-white border border-emerald-200 text-xl font-semibold text-slate-800 shadow-sm hover:bg-emerald-100 active:scale-95 transition disabled:opacity-50"
        >
          {c}
        </button>
      ))}
    </div>
  );
}

// Les ronds du code : pleins pour les chiffres tapés (le code ne s'affiche
// jamais en clair, comme à la banque). Dès le premier chiffre, une croix à
// droite efface tout.
export function PointsCode({
  n,
  total = 6,
  onEffacer,
}: {
  n: number;
  total?: number;
  onEffacer?: () => void;
}) {
  return (
    <div className="relative flex h-10 items-center justify-center">
      <div className="flex gap-3" aria-label={`${n} chiffres sur ${total}`}>
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-4 w-4 rounded-full border-2 border-emerald-700 ${
              i < n ? "bg-emerald-700" : "bg-white"
            }`}
          />
        ))}
      </div>
      {onEffacer && n > 0 && (
        <button
          type="button"
          onClick={onEffacer}
          aria-label="Effacer le code"
          className="absolute right-0 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-2xl leading-none text-emerald-800 hover:bg-emerald-100"
        >
          ×
        </button>
      )}
    </div>
  );
}
