"use client";

// Clavier à chiffres pour taper le code reçu par mail, « comme La Banque
// Postale » (17/11) : 10 grosses touches mélangées à chaque ouverture, puis
// « Effacer ». Le champ texte reste au-dessus pour coller le code depuis le
// mail. Rien ne change dans la vérification : on remplit seulement `otpCode`.

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
  // Le formulaire du code n'existe qu'après l'envoi du mail : ce composant
  // naît dans le navigateur, le mélange ne gêne donc pas le rendu serveur.
  const [touches] = useState(melanger);
  // Dernière valeur connue : deux appuis très rapides comptent pour deux.
  const courant = useRef(valeur);
  courant.current = valeur;

  const ajouter = (c: string) => {
    if (desactive || courant.current.length >= longueurMax) return;
    courant.current = courant.current + c;
    onChange(courant.current);
  };

  const classeTouche =
    "h-12 rounded-lg bg-white border border-emerald-200 text-xl font-semibold text-slate-800 shadow-sm hover:bg-emerald-100 active:scale-95 transition disabled:opacity-50";

  return (
    <div className="space-y-2" aria-label="Clavier pour taper le code">
      <div className="grid grid-cols-5 gap-2">
        {touches.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => ajouter(c)}
            disabled={desactive}
            className={classeTouche}
          >
            {c}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange(valeur.slice(0, -1))}
        disabled={desactive || valeur.length === 0}
        className="w-full rounded-lg border border-emerald-300 bg-white py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition disabled:opacity-50"
      >
        ⌫ Effacer
      </button>
    </div>
  );
}

// Les ronds du code : pleins pour les chiffres tapés (le code ne s'affiche
// jamais en clair, comme à la banque).
export function PointsCode({ n, total = 6 }: { n: number; total?: number }) {
  return (
    <div
      className="flex justify-center gap-3 py-1"
      aria-label={`${n} chiffres sur ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-4 w-4 rounded-full border-2 border-emerald-600 ${
            i < n ? "bg-emerald-600" : "bg-white"
          }`}
        />
      ))}
    </div>
  );
}
