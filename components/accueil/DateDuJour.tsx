"use client";

// LA DATE DU JOUR, SANS ERREUR D'HYDRATATION (24/09/2026).
//
// Frédéric, après avoir vu « La leçon du jour · Lundi 21 septembre » un jeudi :
// « corrige et mets la date du jour », puis « à terme ça devra changer ».
// C'est ce fichier, le « à terme » : le libellé ne se périme plus, et personne
// n'a à le retaper chaque matin.
//
// ⛔⛔ POURQUOI PAS SIMPLEMENT `new Date()` DANS LE RENDU — le piège est écrit
// en tête de lib/accueil/une.ts depuis le 20/09, et il est réel : le HTML est
// fabriqué une fois (au déploiement), le navigateur le rejoue plus tard. Les
// deux rendus tombent sur des dates différentes dès le lendemain, React voit
// que le texte ne correspond pas, et c'est une erreur d'hydratation — bruyante
// en développement, silencieuse et fautive en production.
//
// ⭐ LA SORTIE TIENT EN DEUX TEMPS, et c'est le motif standard :
//   1. au PREMIER rendu (serveur et client), on affiche `repli` — la date
//      écrite à la main dans une.ts. Les deux rendus sont donc IDENTIQUES,
//      aucune erreur d'hydratation possible ;
//   2. une fois hydraté, `useEffect` ne s'exécute QUE dans le navigateur : on
//      remplace par la vraie date du visiteur.
//
// ⚠️ CE QUE ÇA COÛTE, ET C'EST ASSUMÉ : le HTML servi porte encore la date
// figée — donc c'est elle que Google lit, et elle que le visiteur voit pendant
// une fraction de seconde. C'est le prix à payer pour garder l'accueil STATIQUE.
// ⛔ L'alternative (`force-dynamic` ou un `revalidate` court) rendrait la page
// à chaque visite : une fonction serverless par visiteur sur la page la plus
// vue du site, alors que toute la refonte du 06/08 visait « zéro requête ».
// On ne paie pas ça pour un nom de jour.
//
// ⚠️ ET LA DATE EST CELLE DU VISITEUR, pas celle de La Réunion. Un élève à
// Paris un soir tardif peut donc voir la veille de ce que Frédéric voit. C'est
// voulu : « aujourd'hui » veut dire aujourd'hui POUR CELUI QUI LIT.

import { useEffect, useState } from "react";

/** « jeudi 24 septembre » → « Jeudi 24 septembre ». Intl rend le jour en
 *  minuscule en français ; ce libellé ouvre une ligne, il prend la majuscule. */
function enTete(texte: string) {
  return texte.charAt(0).toUpperCase() + texte.slice(1);
}

export function dateDuJour(d = new Date()) {
  return enTete(
    new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(d),
  );
}

export default function DateDuJour({ repli }: { repli: string }) {
  const [texte, setTexte] = useState(repli);

  useEffect(() => {
    // ⚠️ Pas de dépendance : on ne recalcule pas à chaque rendu. Une page
    // laissée ouverte toute la nuit gardera la date de la veille — c'est le
    // comportement de n'importe quel journal ouvert sur une table.
    setTexte(dateDuJour());
  }, []);

  return <>{texte}</>;
}
