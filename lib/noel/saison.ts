// La saison du fond de Noël de l'accueil (components/accueil/FondNoel.tsx) :
// du 1er décembre au 6 janvier inclus (l'Épiphanie), à l'heure du serveur.
export function saisonDeNoel(d: Date): boolean {
  return d.getMonth() === 11 || (d.getMonth() === 0 && d.getDate() <= 6);
}
