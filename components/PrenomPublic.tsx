"use client";

// Affiche un prénom dans une liste PUBLIQUE (remerciements, élèves à l'honneur)
// en respectant le même principe que le dashboard : chacun ne voit en clair que
// SA propre donnée. Donc :
//   - élève connecté → son propre prénom en entier,
//   - tous les autres prénoms → initiale seule (« M. »),
//   - visiteur non connecté → tout en initiale.
// La session vient de useEleve() (localStorage `eleveai_eleve`), comme le
// dashboard. Au 1er rendu (SSR + hydratation) `eleve` est null → initiale, puis
// l'effet de useEleve met à jour : pas de mismatch d'hydratation.

import { useEleve } from "@/context/EleveContext";
import { initialePrenom, memePrenom, prenomFromNom } from "@/lib/prenom";

export default function PrenomPublic({
  prenom,
  className,
}: {
  prenom: string;
  className?: string;
}) {
  const { eleve } = useEleve();
  const monPrenom = prenomFromNom(eleve?.nom);
  const estMoi = memePrenom(monPrenom, prenom);
  return (
    <span className={className}>{estMoi ? prenom : initialePrenom(prenom)}</span>
  );
}
