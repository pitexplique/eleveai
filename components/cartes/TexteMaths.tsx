import { morceaux } from "@/lib/cartes/texte-maths";

// Un libellé de carte mentale avec ses exposants et ses indices : « (a+b)^2 »
// s'affiche (a+b)², « P_A(B) » s'affiche P avec A en indice.
export default function TexteMaths({ texte }: { texte: string }) {
  return (
    <>
      {morceaux(texte).map((m, i) =>
        m.t === "sup" ? (
          <sup key={i} className="text-[0.7em]">{m.v}</sup>
        ) : m.t === "sub" ? (
          <sub key={i} className="text-[0.7em]">{m.v}</sub>
        ) : (
          <span key={i}>{m.v}</span>
        ),
      )}
    </>
  );
}
