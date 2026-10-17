// Les deux comptes du site et leurs logos, partagés par l'en-tête et le pied
// de page. Dessinés ici : lucide a retiré ses icônes de marque, et quelques
// formes ne valent pas une dépendance.

export const YOUTUBE_URL = "https://www.youtube.com/@eleveai974";
export const INSTAGRAM_URL = "https://www.instagram.com/eleveai.fr/";

export function IconeYoutube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 17" aria-hidden="true" className={className}>
      <rect width="24" height="17" rx="4.5" fill="#FF0000" />
      <path d="M9.6 4.6v7.8l6.9-3.9z" fill="#fff" />
    </svg>
  );
}

// ⚠️ `id` OBLIGATOIRE ET UNIQUE PAR PAGE : le dégradé est référencé par son id,
// et l'en-tête comme le pied de page sont sur toutes les pages. Deux dégradés
// du même nom, et le second prend celui du premier.
export function IconeInstagram({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={id} cx="0.3" cy="1.07" r="1.25">
          <stop offset="0" stopColor="#FFD776" />
          <stop offset="0.25" stopColor="#F3A554" />
          <stop offset="0.5" stopColor="#E1306C" />
          <stop offset="0.8" stopColor="#C13584" />
          <stop offset="1" stopColor="#5851DB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill={`url(#${id})`} />
      <rect x="5" y="5" width="14" height="14" rx="4.2" fill="none" stroke="#fff" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" strokeWidth="1.9" />
      <circle cx="16.4" cy="7.6" r="1.05" fill="#fff" />
    </svg>
  );
}
