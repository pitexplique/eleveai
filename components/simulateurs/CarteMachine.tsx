// LA CARTE DU HUB — le patron visuel de /simulateurs, extrait ici pour être
// partagé (Frédéric, 24/07 : « j'adore le css, fais pareil sur l'accueil ») :
// filet noir 2 px, image en bandeau 16/10, texte au chaud dans la boîte, et
// l'ombre pleine qui décolle la carte au survol. Un seul endroit à régler.

import Link from "next/link";

export type CarteMachineProps = {
  href: string;
  image?: string | null;
  emoji?: string | null;
  titre: string;
  /** Une phrase — la notion, l'accroche. Coupée à 4 lignes pour aligner les cartes. */
  texte?: string | null;
  /** Rendu tel quel (emoji + flèche compris). */
  cta?: string | null;
  /** Lien sortant (YouTube…) : nouvel onglet. */
  externe?: boolean;
};

export default function CarteMachine({
  href,
  image,
  emoji,
  titre,
  texte,
  cta,
  externe = false,
}: CarteMachineProps) {
  const classe =
    "group flex flex-col border-2 border-[#1d1c16] bg-[#fcfcf7] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#1d1c16]";

  const contenu = (
    <>
      {image && (
        <div className="aspect-[16/10] w-full overflow-hidden border-b-2 border-[#1d1c16]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={titre}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            style={{ backgroundColor: "#fcfcf7" }}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="font-serif text-lg font-black leading-tight">
          {emoji && <span aria-hidden>{emoji} </span>}
          {titre}
        </h3>
        {texte && (
          <p className="mt-1 flex-1 line-clamp-4 text-sm leading-6 text-[#1d1c16]/75">
            {texte}
          </p>
        )}
        {cta && (
          <p className="mt-2 text-sm font-black text-cyan-800 group-hover:underline">
            {cta}
          </p>
        )}
      </div>
    </>
  );

  return externe ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classe}>
      {contenu}
    </a>
  ) : (
    <Link href={href} className={classe}>
      {contenu}
    </Link>
  );
}
