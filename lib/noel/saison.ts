// La saison du fond de Noël de l'accueil (components/accueil/FondNoel.tsx), à l'heure du serveur.
// Prévue du 1er décembre au 6 janvier ; Frédéric, 27/11 : « affiche-le de suite »
// → elle commence le 27 novembre (chaque année) et finit le 6 janvier inclus (l'Épiphanie).
export function saisonDeNoel(d: Date): boolean {
  const mois = d.getMonth();
  return mois === 11 || (mois === 10 && d.getDate() >= 27) || (mois === 0 && d.getDate() <= 6);
}
