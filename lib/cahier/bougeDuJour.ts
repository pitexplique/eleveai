// « Bouge du jour » — banque PARTAGÉE de défis-corps pour les cahiers de vacances.
// Le cahier n'est plus 100 % cérébral : chaque jour, un petit défi physique qui
// sort l'enfant du canapé (anti-écran) et incarne l'école « nager, coder, bâtir ».
// Saveur 974, sans matériel (alternatives données), sûr, joyeux. Réutilisée par
// tous les cahiers → indexée par numéro de jour, pas de contenu à écrire par cahier.

export const BOUGE_DU_JOUR: string[] = [
  "20 sauts sur place, puis cours jusqu'à l'arbre le plus proche 🌳",
  "Tiens en équilibre sur un pied 30 secondes… puis change de pied 🦩",
  "10 sauts de grenouille à travers le jardin 🐸",
  "Danse sur ta chanson préférée, du début à la fin 💃",
  "Marche jusqu'au bout de la rue et reviens en comptant tes pas 👣",
  "15 montées de genoux, comme si tu courais sur place 🏃",
  "Étire-toi comme un chat qui se réveille, tout doucement 🐱",
  "Course de vitesse : d'un mur à l'autre, 5 allers-retours ⚡",
  "10 sauts en étoile (jumping jacks) 🌟",
  "Saute par-dessus une ligne comme un cabri péi, 10 fois 🐐",
  "Fais la brouette avec quelqu'un de la famille 🤸",
  "Marche comme un crabe pendant 20 pas 🦀",
  "8 flexions : imagine t'asseoir sur une chaise invisible 🪑",
  "Cours sur place 1 minute, genoux hauts 🔥",
  "Tiens la position de la planche le plus longtemps possible 🧱",
  "Saute à cloche-pied du salon à la cuisine 🦵",
  "Lance et rattrape une balle (ou une chaussette en boule) 20 fois 🎾",
  "Monte et descends un escalier 3 fois (ou 30 sauts si pas d'escalier) 🪜",
  "Fais 3 roulades sur un tapis ou dans l'herbe 🤾",
  "Marche sur la pointe des pieds jusqu'à la porte, puis sur les talons 🦶",
  "10 grandes respirations du ventre : gonfle, dégonfle, tout doucement 🫁",
  "Imite 5 animaux : kangourou, serpent, oiseau, crabe, gecko 🦎",
  "Saute à la corde 30 fois (vraie corde ou imaginaire) 🪢",
  "Fais 2 tours de course lente autour de la maison ou du jardin 🏡",
  "Assis-debout 12 fois sans t'aider des mains 🔁",
  "Tiens 3 secondes en appui, puis 3 pompes (ou contre un mur) 💪",
  "Marche en grandes fentes : 10 pas, le genou qui plie 🚶",
  "Attrape tes orteils sans plier les genoux, doucement, 20 secondes 🙆",
  "Invente une petite chorégraphie de 8 mouvements et montre-la 🕺",
  "Sors dehors et bouge 5 minutes à ta façon : cours, saute, grimpe ! 🌞",
];

/** Le défi du jour N (1-indexé), en boucle si le cahier dépasse la banque. */
export function bougeDuJour(numeroJour: number): string {
  const i = (numeroJour - 1) % BOUGE_DU_JOUR.length;
  return BOUGE_DU_JOUR[i];
}
