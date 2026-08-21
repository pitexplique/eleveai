"use client";

// L'ENTRÉE D'ELEVEAI : « Qui es-tu ? », puis « Que veux-tu faire aujourd'hui ? ».
//
// Le même composant sert à deux endroits, et c'est voulu — une seule entrée,
// pas deux qui divergeraient :
//   — variante « page »    : l'accueil, en plein écran ;
//   — variante « accueil » : en tête du journal, compacte.
// (Une troisième vie a existé du 05 au 06/08/2026 : la route de test /ia, morte
//  le jour où l'entrée est devenue l'accueil — un seul geste, un seul endroit.)
//
// Aucun appel d'API : tout se joue dans lib/matrice/moteur.ts. La même phrase
// donne toujours la même réponse, et on peut dire pourquoi.
//
// ─────────────────────────────────────────────────────────────────────────────
// ⭐ REFONTE DU 07/08/2026 — QUATRE ÉTAPES SUR QUATRE LIGNES.
//
// 1. « Qui es-tu ? » se coupe en DEUX : le rôle d'abord (Élève · Parent ·
//    Enseignant · Chef d'établissement), la classe ensuite. Quinze pastilles
//    sur une seule question, ça passait à la ligne, et surtout ça mélangeait
//    deux questions différentes — « que fais-tu dans l'école ? » et « en quelle
//    année es-tu ? ». La classe n'apparaît que pour un élève, parce qu'un
//    parent n'en a pas.
//
// 2. LA MATIÈRE PASSE AVANT « Que veux-tu faire aujourd'hui ? » (option A).
//    C'était la question ouverte de Frédéric — A ou B. Ce qui a tranché n'est
//    pas le goût mais une conséquence mesurable : les intentions se déduisent
//    des ressources, donc les proposer APRÈS la matière permet de ne montrer
//    que celles qui existent DANS cette matière. En B, un élève qui cliquait
//    « Espagnol » lisait « Corriger une erreur » — une chip comptée sur le
//    coach de maths, qui n'ouvrait rien. La hauteur, elle, est la même dans les
//    deux ordres : ce sont les mêmes rangées.
//    ⚠️ Conséquence à connaître : la rangée des matières ne s'écrit toujours
//    JAMAIS dans le champ. Elle filtre, elle ne dicte pas.
//
// 3. Chaque étape tient sur UNE LIGNE, son intitulé à gauche (`rangee-defilante`
//    dans globals.css). Sur téléphone la rangée défile au doigt plutôt que de
//    se casser en deux. Gain mesuré : l'entrée passe de ~11 lignes à 5.
//
// 4. Le professeur et le chef d'établissement n'ont PAS de chips déduites mais
//    des ACTIONS écrites (lib/matrice/actions.ts), qui ouvrent un outil. Une
//    intention déduite ne peut pas produire un outil qui n'existe pas encore.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import { useEleve } from "@/context/EleveContext";
import { PROFILS, getProfil } from "@/lib/matrice/profils";
import { exemplesPour } from "@/lib/matrice/exemples";
import {
  CHIPS_VISIBLES,
  chipsDisponibles,
  composerChip,
  matieresDisponibles,
  partiesDeLaChip,
} from "@/lib/matrice/chips";
import { actionsPour, urlAction } from "@/lib/matrice/actions";
import { afficherConcours } from "@/lib/matrice/concours";
import { cahiersPour, guidesPour, urlCahierPour, urlGuidePour } from "@/lib/matrice/guides";
import { chercher, libelleIntention } from "@/lib/matrice/moteur";
import {
  EVENEMENT_NOUVELLE_DEMANDE,
  ecrireHistorique,
  lireDemande,
  lireHistorique,
  type EntreeHistorique,
} from "@/lib/matrice/historique";
import { memoriserAudience, type Audience } from "@/lib/useAudience";
import type { ProfilId, ResultatMatrice } from "@/lib/matrice/types";

const CLE_PROFIL = "eleveai.ia.profil";

/**
 * LE RÔLE CLIQUÉ ICI → LA PORTE ALLUMÉE DANS LE HEADER (19/08/2026).
 *
 * Les deux vivaient chacun leur souvenir : le header ne connaissait que les
 * VISITES (/parents, /espace-profs, /espace-ecoles), cette rangée ne connaissait
 * que les CLICS. Un visiteur passé une fois par /parents gardait donc « 👪
 * Parents » allumé en haut pendant qu'il cliquait « Élève » ici. Voir la note
 * de lib/useAudience.ts.
 *
 * ⚠️ Le vocabulaire diffère des deux côtés — `prof` ici, `enseignant` là-bas ;
 * `direction` ici, `etablissement` là-bas. La traduction est cette table, et
 * elle est le seul endroit où elle existe.
 */
const AUDIENCE_DU_ROLE: Record<string, Audience> = {
  eleve: "eleve",
  parent: "parent",
  prof: "enseignant",
  direction: "etablissement",
};
/**
 * LA CLASSE D'UN ADULTE, retenue à part.
 *
 * ⚠️ DEUX CLÉS ET NON UNE, et ce n'est pas une commodité : chez un élève la
 * classe EST le profil (`CLE_PROFIL` suffit), chez un parent elle s'ajoute au
 * rôle sans le remplacer. Les écrire au même endroit, ce serait perdre le rôle
 * à la visite suivante — le parent reviendrait en « 5e », c'est-à-dire en élève.
 */
const CLE_CLASSE_ADULTE = "eleveai.ia.classe";
// On en garde plus qu'on n'en montre : la colonne affiche les 10 dernières et
// ouvre le reste derrière « Afficher plus ». 30, c'est quelques jours d'usage
// pour quelques kilo-octets — au-delà, personne ne remonte.
const MAX_HISTORIQUE = 30;

/**
 * LE RÔLE — la première question, et la seule que tout le monde peut lire.
 *
 * ⚠️ « Enseignant » et non « Professeur » : c'est le mot du header et celui des
 * quatre portes d'audience. Le profil, lui, s'appelle toujours `prof` dans la
 * matrice — un libellé se change, un identifiant se garde.
 */
type RoleId = "eleve" | "parent" | "prof" | "direction";

const ROLES: { id: RoleId; label: string }[] = [
  { id: "eleve", label: "Élève" },
  { id: "parent", label: "Parent" },
  { id: "prof", label: "Enseignant" },
  { id: "direction", label: "Chef d'établissement" },
];

/** Les douze classes, du CP à la Terminale — dans l'ordre de la scolarité. */
const CLASSES = PROFILS.filter((p) => p.groupe === "eleve");

/**
 * ⭐ LE LIBELLÉ COURT DES TROIS CLASSES DE LYCÉE — DANS CETTE RANGÉE SEULEMENT
 * (20/08/2026).
 *
 * « Seconde », « Première » et « Terminale » font 26 caractères à elles trois
 * quand « 2de », « 1re », « Tle » en font 9. C'est ce qui manquait pour que les
 * douze pastilles tiennent : mesuré à 1280 px avec la colonne de gauche
 * ouverte, la douzième était rognée — on lisait « Termina… », c'est-à-dire que
 * la classe la plus demandée du site était la seule illisible.
 *
 * ⛔ ON NE TOUCHE PAS À `label` DANS profils.ts. Ce champ sort partout ailleurs
 * en toutes lettres — « Par où tu peux commencer en Terminale », le niveau
 * enregistré dans l'historique, « Ce que j'ai compris : … ». L'abréger là-bas
 * abrégerait des phrases, pas des pastilles.
 * ⚠️ Et le bouton garde son `aria-label` en toutes lettres : « 2de » écrit se
 * lit, « 2de » lu à voix haute par un lecteur d'écran ne veut rien dire.
 */
const CLASSE_COURTE: Record<string, string> = {
  seconde: "2de",
  premiere: "1re",
  terminale: "Tle",
};

/**
 * ⭐ QUI A UNE CLASSE À DIRE (16/08/2026, Frédéric : « il faut afficher classe
 * et matière pas que pour l'élève mais aussi pour prof et parents »).
 *
 * La rangée des classes ne sortait que pour l'élève, et l'intitulé de l'étape
 * 2 disait pourquoi : « un parent n'en a pas ». C'était vrai de sa scolarité à
 * lui, et faux de sa demande — un parent ne vient jamais chercher « quelque
 * chose pour un parent », il vient pour un enfant qui est en 5ᵉ. Sans cette
 * classe, le moteur n'avait de son côté que huit ressources marquées
 * « parent » : la rangée des matières ne s'affichait pas (une seule matière),
 * aucune notion du programme n'était reconnue, et le coach ne pouvait s'ouvrir
 * sur rien.
 *
 * ⛔ LE CHEF D'ÉTABLISSEMENT N'EN A PAS, et c'est délibéré : il ne parle pas
 * d'une classe mais de son établissement. Lui en demander une le ferait
 * choisir au hasard entre douze réponses également fausses.
 */
const ROLES_AVEC_CLASSE = new Set<RoleId>(["eleve", "parent", "prof"]);

/**
 * L'intitulé de la rangée des classes, dans les mots de chacun.
 * Un parent ne dit pas « ma classe » ; un enseignant en a plusieurs.
 */
const INTITULE_CLASSE: Record<string, string> = {
  eleve: "Ta classe",
  parent: "La classe de votre enfant",
  prof: "La classe",
};

/**
 * LES DEUX BOUTONS ALLUMÉS, RELUS DANS LA CHIP.
 *
 * La chip est composite — « Mathématiques · M'entraîner » — et le vecteur n'a
 * qu'un champ pour la porter (voir composerChip). Pour enregistrer une demande
 * rejouable, il faut la re-séparer : d'un côté la matière, de l'autre
 * l'intention. Le seul juge est la liste des matières réellement disponibles
 * pour ce profil — c'est elle qui a produit le libellé, c'est elle qui le
 * reconnaît. Ce qui n'y est pas est une intention.
 *
 * ⚠️ On rend des LIBELLÉS et non des identifiants : ce sont eux que les
 * pastilles comparent pour savoir laquelle se rallume.
 */
function boutonsDeLaChip(
  profil: ProfilId,
  chip: string | null,
  classe: ProfilId | null,
): { matiereLabel: string | null; intention: string | null } {
  const parties = partiesDeLaChip(chip);
  if (parties.length === 0) return { matiereLabel: null, intention: null };
  const matieres = new Set(matieresDisponibles(profil, classe).map((m) => m.label));
  return {
    matiereLabel: parties.find((p) => matieres.has(p)) ?? null,
    intention: parties.find((p) => !matieres.has(p)) ?? null,
  };
}

/** Le rôle auquel appartient un profil enregistré. */
function roleDuProfil(profil: ProfilId): RoleId {
  if (profil === "parent" || profil === "prof" || profil === "direction") return profil;
  return "eleve";
}

/**
 * Pourquoi on demande le profil AVANT de répondre — dit avec un exemple de la
 * matière qu'on vient de cliquer.
 *
 * ⚠️ La phrase citait « les fractions » même quand on demandait de l'espagnol.
 * L'argument restait vrai, mais l'exemple tombait à côté — et un exemple à côté
 * donne l'impression de ne pas avoir été entendu, exactement au moment où l'on
 * refuse de répondre. Chaque matière cite donc ce qui, chez elle, change
 * vraiment de sens entre le début et la fin de la scolarité.
 */
const POURQUOI_LE_PROFIL: Partial<Record<string, string>> = {
  maths: "« les fractions » ne veulent pas dire la même chose en CP et en Terminale",
  francais: "« analyser une phrase » ne veut pas dire la même chose au CE1 et en Terminale",
  anglais: "« parler du passé » ne s'apprend pas pareil en 6ᵉ et en Terminale",
  espagnol: "« ser » et « estar » ne se travaillent pas pareil en 5ᵉ et en Terminale",
  ia: "« un modèle » ne veut pas dire la même chose en 4ᵉ et en Terminale",
};

const POURQUOI_SANS_MATIERE =
  "la même phrase ne veut pas dire la même chose en CP et en Terminale";

/**
 * UNE ÉTAPE = UNE LIGNE. L'intitulé à gauche, les pastilles à droite.
 *
 * C'est ce qui fait tenir les quatre questions sur quatre lignes au lieu de
 * huit : un intitulé posé au-dessus de sa rangée coûte une ligne entière à
 * chaque fois, et quatre lignes perdues en haut d'écran, ce sont les ressources
 * qui passent sous le pli. Sur téléphone l'intitulé reprend sa place au-dessus —
 * la largeur y est trop rare pour la partager.
 *
 * ⚠️ DÉFINIE ICI, AU NIVEAU DU MODULE, ET PAS DANS LE COMPOSANT. Une fonction
 * de composant recréée à chaque rendu est un TYPE différent à chaque rendu :
 * React démonte et remonte tout son contenu — le champ de saisie perdait le
 * focus à chaque lettre tapée.
 */
function Etape({
  intitule,
  surAccueil,
  children,
}: {
  intitule: string;
  surAccueil: boolean;
  children: React.ReactNode;
}) {
  return (
    // ⚠️ `mt-4`, pas `mt-2.5` (07/08, retour de Frédéric : « manque
    // d'aération »). La première passe visait à faire remonter les ressources
    // au-dessus du pli — c'est gagné, et de loin : elles tenaient à 630 px sur
    // un écran de 900. Il restait donc de la place, et quatre rangées collées
    // se lisaient comme un formulaire administratif. On rend l'air qu'on
    // n'avait pas besoin de prendre.
    <div className="mt-4 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
      <span
        className={`shrink-0 text-[13px] font-medium leading-tight sm:w-32 ${
          surAccueil ? "text-[#1d1c16]/70" : "text-slate-500"
        }`}
      >
        {intitule}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export default function EntreeMatrice({
  variante = "page",
  onProfil,
}: {
  variante?: "page" | "accueil";
  /**
   * Prévenu à chaque choix de profil. C'est par là que l'accueil se réordonne :
   * depuis le 05/08 cette barre REMPLACE les huit tuiles « Qui est-ce ? », donc
   * c'est elle qui doit dire au journal pour qui il se range.
   */
  onProfil?: (profil: ProfilId) => void;
}) {
  const surAccueil = variante === "accueil";

  // ⭐ DEUX ÉTATS LÀ OÙ IL Y EN AVAIT UN. `profil` se DÉDUIT : c'est le rôle
  // pour un adulte, la classe pour un élève. Tant qu'un élève n'a pas dit sa
  // classe, il n'y a pas de profil — et c'est une information, pas un trou à
  // combler par « 6e ». (L'ancien défaut technique « 6e » montrait le monde
  // d'un sixième à un lycéen avant le moindre clic.)
  //
  // ⭐ NUANCE AJOUTÉE LE 12/08/2026 : ne rien inventer ≠ ignorer ce qu'on sait.
  // Un élève CONNECTÉ a déjà dit sa classe — elle est dans son compte. La lui
  // redemander à chaque visite, c'est lui faire retaper une réponse qu'il a
  // donnée. On pré-sélectionne donc SA classe, jamais un défaut : un visiteur
  // anonyme continue de partir de null, et le lycéen ne voit toujours pas le
  // monde d'un sixième avant son premier clic.
  const { eleve } = useEleve();
  const classeConnue = useMemo<ProfilId | null>(() => {
    const c = eleve?.classe;
    if (!c) return null;
    // ⚠️ DEUX VOCABULAIRES POUR LA MÊME CLASSE. `acces_etablissement` dit
    // « premiere-spe » et « terminale-spe » (le niveau ET la spécialité dans
    // un seul champ) ; les pastilles disent « premiere » et « terminale », qui
    // sont des niveaux. Sans ce raccord, un lycéen n'aurait RIEN de
    // présélectionné — et en silence, puisqu'une classe introuvable vaut null.
    const id = c.replace(/-spe$/, "");
    return (CLASSES.find((p) => p.id === id)?.id as ProfilId | undefined) ?? null;
  }, [eleve?.classe]);

  /**
   * ⭐ « ÉLÈVE » EST ALLUMÉ D'ENTRÉE (Frédéric, 20/08/2026).
   *
   * La rangée des rôles partait vide, et les deux rangées suivantes — la classe,
   * la matière — n'existaient donc pas tant qu'on n'avait pas cliqué. Le premier
   * écran ne montrait qu'une question et quatre pastilles : il fallait un clic
   * pour découvrir qu'on pouvait dire sa classe. Neuf visiteurs sur dix sont des
   * élèves, et c'est déjà le défaut de tout le reste du site (voir
   * `useAudience` : « Défaut : espace élève (= tout le monde) »).
   *
   * ⛔ ET ÇA NE PRÉSÉLECTIONNE AUCUNE CLASSE. La distinction est toute la
   * nuance : dire « tu es sans doute un élève » est vrai de presque tout le
   * monde et se corrige d'un clic ; dire « tu es sans doute en 6ᵉ » est faux de
   * onze douzièmes des élèves — c'était l'ancien défaut technique, qui montrait
   * le monde d'un sixième à un lycéen avant son premier geste. `classe` part
   * donc toujours de `null`, et le moteur ne répond rien avant qu'elle soit
   * dite. Même règle pour la matière : une matière allumée d'office serait un
   * filtre que personne n'a demandé.
   */
  const [role, setRole] = useState<RoleId | null>("eleve");
  const [classe, setClasse] = useState<ProfilId | null>(null);

  // Un clic fait DANS CETTE VISITE : il gagne sur tout le reste, y compris sur
  // le compte. Un élève de 5e a le droit d'aller regarder la 3e.
  const choixManuel = useRef(false);

  const profil: ProfilId | null = role === "eleve" ? classe : role;

  /**
   * LA CLASSE DITE PAR UN ADULTE — `null` chez l'élève, dont la classe est déjà
   * le profil, et `null` chez le chef d'établissement, qui n'en a pas.
   * C'est ce qui part dans le vecteur, à côté de « qui es-tu ».
   */
  const classeAdulte: ProfilId | null =
    role === "parent" || role === "prof" ? classe : null;

  /**
   * LE NIVEAU DONT ON PARLE, quel que soit le rôle. C'est lui — et non le
   * profil — qui décide du guide de survie, du cahier de vacances et du
   * concours : ces trois-là sont attachés à une CLASSE, jamais à un rôle.
   */
  const niveauContexte: ProfilId | null = role && ROLES_AVEC_CLASSE.has(role) ? classe : null;

  const [question, setQuestion] = useState("");
  // Deux sélections à l'écran, UNE SEULE chip dans le vecteur : elles se
  // composent en « Mathématiques · M'entraîner ». Le vecteur reste à trois
  // champs — c'est une règle du produit, pas une contrainte technique.
  const [matiereChoisie, setMatiereChoisie] = useState<string | null>(null);
  const [intentionChoisie, setIntentionChoisie] = useState<string | null>(null);
  const chip = useMemo(
    () => composerChip(matiereChoisie, intentionChoisie),
    [matiereChoisie, intentionChoisie],
  );
  const [resultat, setResultat] = useState<ResultatMatrice | null>(null);
  const [demandeProfil, setDemandeProfil] = useState(false);
  const [plusDOptions, setPlusDOptions] = useState(false);
  // ⛔ IL Y AVAIT ICI UN ÉTAT `historique` QUE PERSONNE NE LISAIT — un
  // `const [, setHistorique]`, en écriture seule. Il ne servait qu'à connaître
  // la liste déjà enregistrée au moment d'y ajouter une demande, et il a coûté
  // un vrai défaut (17/08/2026) : comme l'écriture se faisait DANS la fonction
  // de mise à jour, `ecrireHistorique` émettait son signal pendant que React
  // calculait le nouvel état. La colonne de gauche l'attrapait et appelait son
  // propre `setHistorique` au milieu du rendu d'un AUTRE composant — d'où
  // « Cannot update a component while rendering a different component », le
  // doigt pointé sur ColonneGauche alors que la faute était ici.
  //
  // La liste déjà enregistrée, `lireHistorique()` la donne : localStorage est
  // la source de vérité, et il est toujours à jour. L'état ne servait à rien
  // qu'à dupliquer ce que le disque savait déjà.
  const champ = useRef<HTMLInputElement>(null);

  // Le profil se retient : on ne redemande pas à un élève qui il est chaque
  // matin. Et il est PARTAGÉ entre l'entrée et la colonne — même clé, même
  // personne.
  useEffect(() => {
    try {
      const p = localStorage.getItem(CLE_PROFIL);
      if (p && PROFILS.some((x) => x.id === p)) {
        const id = p as ProfilId;
        const r = roleDuProfil(id);
        setRole(r);

        // La classe se relit selon le rôle : celle de l'élève EST son profil,
        // celle d'un adulte vit dans sa propre clé.
        let classeRelue: ProfilId | null = null;
        if (r === "eleve") {
          classeRelue = id;
        } else if (r === "parent" || r === "prof") {
          const c = localStorage.getItem(CLE_CLASSE_ADULTE);
          if (c && CLASSES.some((x) => x.id === c)) classeRelue = c as ProfilId;
        }
        setClasse(classeRelue);

        // ⚠️ Un adulte garde sa classe dans le vecteur, un élève non : chez lui
        // elle est déjà dans `quiEsTu`, et l'y remettre serait l'écrire deux
        // fois (voir l'invariant de VecteurEntree).
        const classeVecteur = r === "eleve" ? null : classeRelue;

        // Une demande rappelée depuis la colonne de gauche (?q=…) repart
        // aussitôt : cliquer dans l'historique doit refaire la recherche, pas
        // seulement remplir le champ.
        const q = new URLSearchParams(window.location.search).get("q");
        if (q) {
          setQuestion(q);
          setResultat(chercher({ quiEsTu: id, classe: classeVecteur, question: q, chip: null }));
        } else {
          // Les portes de son niveau, sans avoir rien à taper. Le moteur sait
          // déjà le faire (`repliSurLeNiveau`) ; il refusait simplement de le
          // faire sur un vecteur vide, et l'écran restait blanc sous la barre.
          setResultat(chercher({ quiEsTu: id, classe: classeVecteur, question: "", chip: null }));
        }
      }
    } catch {
      /* navigation privée : on s'en passe */
    }
  }, []);

  const p = useMemo(() => (profil ? getProfil(profil) : null), [profil]);
  const tutoie = p?.tutoie ?? true;

  /**
   * « 5e » quand un adulte l'a dite — et rien du tout sinon.
   *
   * ⚠️ Ce n'est pas de la décoration. « Par où vous pouvez commencer en
   * Parent » ne veut rien dire : ce n'est pas un niveau, c'est un rôle. Dès
   * qu'une classe est dite, c'est ELLE que la phrase doit nommer, sinon on
   * affiche des ressources de 5ᵉ en annonçant qu'elles sont « pour un parent ».
   */
  const labelClasseAdulte = useMemo(
    () => (classeAdulte ? getProfil(classeAdulte).label : null),
    [classeAdulte],
  );

  // ⭐ Tant que personne n'a répondu à « Qui es-tu ? », on montre TOUTES les
  // matières : la réponse honnête à une question ouverte, c'est tout ce qu'on a.
  const matieres = useMemo(() => matieresDisponibles(profil, classeAdulte), [profil, classeAdulte]);
  /** La matière derrière le bouton allumé — on affiche des LIBELLÉS, mais c'est
   *  l'identifiant qui sert à filtrer et à choisir la bonne phrase d'invite. */
  const matiereId = useMemo(
    () => matieres.find((m) => m.label === matiereChoisie)?.matiere ?? null,
    [matieres, matiereChoisie],
  );

  // Les chips viennent des ressources réellement publiables pour ce profil ET
  // cette matière — pas d'une liste de fonctionnalités souhaitées.
  const toutesLesChips = useMemo(
    () => chipsDisponibles(profil, matiereId, classeAdulte),
    [profil, matiereId, classeAdulte],
  );
  /** Terminale + Mathématiques, et le collège pour le concours général. */
  const concours = useMemo(
    () => afficherConcours(niveauContexte, matiereId),
    [niveauContexte, matiereId],
  );

  // ⭐ LE GUIDE DE SURVIE DE SA CLASSE, EN PASTILLE (07/08, Frédéric : « on n'a
  // pas branché guide de survie dans les chips »). Il sortait déjà sous
  // « Comprendre une notion » et « Préparer un contrôle », mais il fallait
  // savoir qu'il existe pour le trouver.
  //
  // ⚠️ SEULEMENT SI SA CLASSE EN A UN. Le CP, le CE1 et le CE2 n'en ont aucun —
  // ni en maths ni en français — et la pastille n'apparaît donc pas chez eux
  // plutôt que d'ouvrir un sommaire où ils ne trouveront rien à leur niveau.
  // ⚠️ `niveauContexte` ET NON `profil` : un guide de survie appartient à une
  // CLASSE. Un parent qui a dit « 5ᵉ » a droit au guide de 5ᵉ — c'est même la
  // page à imprimer qu'il cherche le plus souvent.
  const guides = useMemo(() => guidesPour(niveauContexte), [niveauContexte]);
  const hrefGuide = useMemo(() => urlGuidePour(niveauContexte), [niveauContexte]);

  // ⭐ LE CAHIER DE VACANCES, EN PASTILLE AUSSI (07/08). Les cahiers font
  // l'essentiel du trafic du site — Google et Bing y déposent la plupart des
  // visiteurs — et ils n'avaient aucune porte depuis l'entrée. Ils viennent
  // seulement d'entrer dans l'inventaire pour le primaire, où cinq d'entre eux
  // existaient en ligne sans être proposés à personne.
  const cahiers = useMemo(() => cahiersPour(niveauContexte), [niveauContexte]);

  /**
   * Les pastilles qui ne filtrent rien : elles ouvrent une page.
   *
   * ⚠️ Elles PRENNENT LA PLACE de chips, elles ne s'ajoutent pas. Sept
   * pastilles à la suite ne tiennent pas sur une ligne d'ordinateur — mesuré,
   * pas estimé — et une rangée qui déborde annule tout le travail de
   * compactage. On garde donc trois chips quand il y en a trois derrière.
   */
  /**
   * ⛔ « LES MATHS EN VRAI » NE SE COMPTAIT PAS (corrigé le 20/08/2026).
   *
   * Elle est arrivée dans la rangée le 12/08, à la place laissée par la
   * pastille « Photographier un cours » — et elle est arrivée SEULE, sans
   * entrer dans `raccourcis`. La règle « chaque pastille prend la place d'une
   * chip » ne la voyait donc pas : du CM1 à la Terminale, la rangée montait à
   * trois chips PLUS quatre pastilles PLUS « Plus d'options », c'est-à-dire les
   * huit éléments que la note d'en dessous dit de ne jamais atteindre.
   * C'est ce que l'audit du 20/08 a constaté de l'extérieur — « 6 boutons +
   * Plus d'options (3) » — sans pouvoir en nommer la cause.
   */
  const mathsEnVrai =
    !!profil &&
    ["cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere", "terminale"].includes(profil);

  /**
   * LES RACCOURCIS, EN LISTE ORDONNÉE ET NON PLUS EN COMPTEUR (20/08/2026).
   *
   * Ils étaient quatre `&&` posés à la suite dans le JSX, donc quatre pastilles
   * qui s'affichaient toutes ou rien : le compteur `raccourcis` servait à
   * retirer des CHIPS pour leur faire de la place, mais eux-mêmes n'entraient
   * jamais sous le pli. Avec le plancher de trois chips, la rangée montait
   * mécaniquement à sept éléments — mesuré à l'écran le 20/08, « M'entraîner »
   * rogné à gauche et « Autres options » coupé à droite.
   * En liste, ils obéissent au même budget que les chips.
   *
   * ⚠️ L'ORDRE EST CELUI DU 07/08, à une place près : le concours d'abord (il a
   * une DATE et il expire), puis le guide, puis les cahiers. « Les maths en
   * vrai » passe en dernier — c'est la seule des quatre qui ne soit pas
   * attachée à la scolarité de la personne (son concours, son guide, son
   * cahier), et c'est celle qui s'était ajoutée sans budget.
   */
  const raccourcis = useMemo(() => {
    const l: { cle: string; href: string; label: string; evenement: string; couleur?: string }[] = [];
    if (concours.length > 0)
      l.push({
        cle: "concours",
        href: `${concours[0].href}?from=ia`,
        label: "🏆 Concours",
        evenement: "ia_concours",
        // La SEULE pastille encore colorée, et pour une raison qui se dit en un
        // mot : elle expire. Le guide et les cahiers, eux, sont là toute l'année.
        couleur: surAccueil
          ? "border-2 border-[#a34c07] bg-[#a34c07]/10 text-[#a34c07] hover:bg-[#a34c07]/20"
          : "border border-amber-500 bg-amber-50 text-amber-900 hover:bg-amber-100",
      });
    if (guides.length > 0)
      l.push({
        cle: "guide",
        href: `${hrefGuide}${hrefGuide.includes("?") ? "&" : "?"}from=ia`,
        label: "🆘 Guide",
        evenement: "ia_guide",
      });
    if (cahiers.length > 0)
      l.push({
        cle: "cahiers",
        href: `${urlCahierPour(profil)}?from=ia`,
        label: "📒 Cahiers",
        evenement: "ia_cahier",
      });
    if (mathsEnVrai)
      l.push({
        cle: "maths-974",
        href: "/maths-974?from=ia",
        label: "Les maths en vrai",
        evenement: "ia_maths_reel",
      });
    return l;
  }, [concours, guides, cahiers, mathsEnVrai, hrefGuide, profil, surAccueil]);

  // ⭐ LA PASTILLE CONCOURS S'INSÈRE EN 5ᵉ POSITION (Frédéric, 07/08 : « le
  // concours arrive en 5ᵉ position ! »). L'ordre de la rangée suit les outils :
  //   1. M'entraîner      ─┐ le coach
  //   2. Comprendre       ─┘
  //   3. Teste-toi          les parcours
  //   4. Cinq minutes       les rituels
  //   5. 🏆 Concours        ← ici
  //   … le reste derrière « Plus d'options »
  //
  // ⚠️ Elle n'est PAS une chip : elle ne filtre rien, elle ouvre une page. Elle
  // ne peut donc pas venir de `chipsDisponibles`, et sa place se calcule ici.
  // Quand il n'y a pas de concours à ce niveau, les cinq premières chips
  // occupent la ligne — on ne laisse pas un trou en attendant.
  // ⚠️ CHAQUE PASTILLE PREND LA PLACE D'UNE CHIP, jamais de place en plus.
  // Sans cette règle la rangée montait à huit éléments (5 chips + 3 pastilles
  // + « Plus d'options ») : elle se met alors à défiler sur un écran
  // d'ordinateur, et tout le travail de compactage tombe.
  // ⛔ MAIS JAMAIS MOINS DE TROIS CHIPS. En dessous, la rangée cesse de dire ce
  // qu'on peut FAIRE pour ne plus montrer que des destinations — c'est-à-dire
  // qu'elle redevient le catalogue qu'on vient d'enterrer.
  const MINIMUM_CHIPS = 3;
  const chips = useMemo(() => {
    if (plusDOptions) return toutesLesChips;
    return toutesLesChips.slice(0, Math.max(MINIMUM_CHIPS, CHIPS_VISIBLES - raccourcis.length));
  }, [toutesLesChips, plusDOptions, raccourcis.length]);

  /**
   * ⭐ LE BUDGET EST COMMUN AUX CHIPS ET AUX RACCOURCIS (20/08/2026).
   *
   * `CHIPS_VISIBLES` disait « cinq pastilles tiennent sur une ligne
   * d'ordinateur » — mais il ne comptait que les chips, et les raccourcis
   * s'ajoutaient par-dessus. Cinq voulait donc dire cinq, six, sept ou huit
   * selon la classe. Le budget porte maintenant sur TOUT ce qui est rond dans
   * cette rangée ; le bouton « Autres options » vient après, et lui seul.
   *
   * ⚠️ Les chips servent en premier (plancher de trois) : c'est la rangée qui
   * dit ce qu'on peut FAIRE. Les raccourcis prennent ce qui reste.
   */
  const raccourcisVisibles = useMemo(
    () => (plusDOptions ? raccourcis : raccourcis.slice(0, Math.max(0, CHIPS_VISIBLES - chips.length))),
    [raccourcis, chips.length, plusDOptions],
  );

  /** Combien restent derrière « Autres options » — chips ET raccourcis. */
  const restantes =
    toutesLesChips.length - chips.length + (raccourcis.length - raccourcisVisibles.length);

  /** Les actions ÉCRITES du professeur et du chef d'établissement. */
  const actions = useMemo(() => (profil ? actionsPour(profil) : []), [profil]);

  const exemples = useMemo(() => (profil ? exemplesPour(profil) : []), [profil]);

  const lancer = useCallback(
    (
      texte: string,
      chipChoisie: string | null,
      /**
       * Ce qu'on vient de cliquer, quand React n'a pas encore rendu l'état.
       * ⚠️ `classe: null` VEUT DIRE « pas de classe », pas « prends celle de
       * l'état » — d'où le `in` plutôt qu'un `??` : un élève qui choisit son
       * rôle doit repartir SANS classe dans le vecteur, et un `??` aurait
       * silencieusement ressuscité celle de l'écran précédent.
       */
      forcage?: { profil?: ProfilId; classe?: ProfilId | null },
    ) => {
      const quiEsTu = forcage?.profil ?? profil;
      const laClasse =
        forcage && "classe" in forcage ? (forcage.classe ?? null) : classeAdulte;
      const vecteur = { question: texte.trim(), chip: chipChoisie, classe: laClasse };

      // Sans profil, on ne devine pas : la même phrase ne veut pas dire la même
      // chose en CP et en Terminale.
      if (!quiEsTu) {
        if (vecteur.question || vecteur.chip) {
          setDemandeProfil(true);
          setResultat(null);
        }
        return;
      }

      const res = chercher({ quiEsTu, ...vecteur });
      setResultat(res);
      setDemandeProfil(false);

      // Rien n'a été dit : on vient d'ouvrir les portes du niveau. Ce n'est pas
      // une demande — on ne la compte pas, on ne l'enregistre pas.
      if (!vecteur.question && !vecteur.chip) return;

      if (vecteur.question) {
        // ⭐ ON ENREGISTRE LA DEMANDE ENTIÈRE, PAS SEULEMENT LA PHRASE
        // (17/08/2026). Voir la note de EntreeHistorique : sans la classe et
        // sans les deux boutons allumés, une ligne du RÉCENT ne peut pas être
        // rejouée — on ne recollait qu'un texte dans un contexte qui avait
        // changé depuis.
        //
        // ⚠️ EN CLAIR, ET NON DANS UN `setHistorique(prec => …)`. Une fonction
        // de mise à jour doit être PURE : y écrire sur le disque et y émettre un
        // signal, c'est prévenir la colonne pendant que React calcule son état,
        // et la faire se mettre à jour au milieu du rendu d'un autre composant.
        // React le refusait à voix haute, en pointant la colonne.
        const suite: EntreeHistorique[] = [
          {
              question: vecteur.question,
              profil: quiEsTu,
              quand: Date.now(),
              // La matière voyage avec la demande : c'est elle qui fait
              // exister les filtres du RÉCENT, dans la colonne de gauche.
              // Depuis le 17/08 elle est renseignée dès que le MOTEUR la
              // connaît, et non plus seulement quand un bouton a été cliqué.
              matiere: res.lecture.matiere ?? null,
              niveau: getProfil(quiEsTu).label,
              // ⚠️ `laClasse` et non `classeAdulte` : quand le clic vient
              // d'arriver, l'état de l'écran a un rendu de retard — c'est
              // exactement la raison d'être du `forcage`, et l'oublier ici
              // aurait enregistré la classe d'AVANT le clic.
              classe: laClasse,
              // Les BOUTONS, tels qu'ils étaient allumés. Ce que le moteur a
              // deviné vit dans `matiere`, au-dessus ; ces deux-là ne portent
              // que des gestes réellement faits.
              //
              // ⚠️ ON LES RELIT DANS LA CHIP, PAS DANS L'ÉTAT. Même piège que
              // pour la classe, et il se serait vu tout de suite : `cliquerMatiere`
              // appelle `lancer` dans la foulée de `setMatiereChoisie`, si bien
              // que l'état porte encore la matière PRÉCÉDENTE. On aurait
              // enregistré « Français » pour une demande faite en cliquant
              // « Mathématiques ». La chip, elle, est composée par l'appelant à
              // partir de ce qu'il vient de cliquer : elle est toujours juste.
              ...boutonsDeLaChip(quiEsTu, chipChoisie, laClasse),
          },
          // ⚠️ `lireHistorique()` ET NON UN ÉTAT. C'est le disque qui fait foi,
          // et il est à jour : la colonne peut avoir supprimé une ligne depuis,
          // et un état gardé en mémoire l'aurait fait revenir à la demande
          // suivante.
          ...lireHistorique().filter((e) => e.question !== vecteur.question),
        ].slice(0, MAX_HISTORIQUE);
        // Écrire ET prévenir la colonne : les deux gestes sont inséparables,
        // dans historique.ts. Sans le signal, la demande qu'on vient de poser
        // n'entrait dans le RÉCENT qu'au changement de page — `storage` ne se
        // déclenche QUE dans les autres onglets.
        ecrireHistorique(suite);
      }

      // Mesure. On envoie le PROFIL et le NOMBRE de résultats, jamais le texte
      // de la question : ce que quelqu'un tape ne part nulle part.
      track("ia_demande", {
        profil: quiEsTu,
        ou: variante,
        trouve: res.recommandations.length,
        notion: res.lecture.notionId ?? "aucune",
        intention: res.lecture.intention ?? "aucune",
      });

      // LA PHRASE ELLE-MÊME part en base — sans aucune identité. Compter les
      // questions sans réponse disait COMBIEN ; il faut savoir LESQUELLES, sinon
      // on ne sait pas quoi construire ensuite.
      try {
        fetch("/api/questions-entree", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: vecteur.question,
            profil: quiEsTu,
            chip: chipChoisie,
            notion: res.lecture.notionId,
            intention: res.lecture.intention,
            trouves: res.recommandations.length,
            ou: variante,
          }),
          keepalive: true,
        }).catch(() => {});
      } catch {
        /* fire and forget : jamais bloquant */
      }

      if (res.recommandations.length === 0) {
        // Le compteur reste : il vit dans le suivi des pages, à côté du reste.
        try {
          fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ page: "/accueil", source: "sans-reponse" }),
            keepalive: true,
          }).catch(() => {});
        } catch {
          /* fire and forget */
        }
      }
    },
    [profil, classeAdulte, variante],
  );

  /** Retenir qui l'on est — et prévenir la page, qui se range là-dessus. */
  const memoriser = useCallback(
    (id: ProfilId) => {
      try {
        localStorage.setItem(CLE_PROFIL, id);
      } catch {
        /* tant pis */
      }
      // ⭐ … ET LE HEADER AVEC (19/08). `roleDuProfil` ramène les douze classes
      // à « eleve » : dire « CM2 », c'est dire qu'on est un élève.
      memoriserAudience(AUDIENCE_DU_ROLE[roleDuProfil(id)]);
      track("ia_profil", { profil: id, ou: variante });
      onProfil?.(id);
    },
    [onProfil, variante],
  );

  /** Retenir la classe d'un adulte — l'autre moitié de « qui es-tu ». */
  const retenirClasse = useCallback((id: ProfilId | null) => {
    try {
      if (id) localStorage.setItem(CLE_CLASSE_ADULTE, id);
      else localStorage.removeItem(CLE_CLASSE_ADULTE);
    } catch {
      /* tant pis */
    }
  }, []);

  /**
   * ⭐ REJOUER UNE DEMANDE DU RÉCENT (17/08/2026) — l'écran entier, pas la
   * phrase seule.
   *
   * Frédéric : « si on sélectionne ça ne marche pas ». C'était vrai deux fois.
   * D'abord parce qu'on ne recollait que le texte, en repartant du profil du
   * jour. Ensuite, et c'est ce qui rendait le clic parfaitement muet, parce que
   * la lecture de `?q=` vivait dans l'effet de MONTAGE : la colonne pointait
   * vers `/`, on était déjà sur l'accueil, et le routeur faisait une navigation
   * douce — même composant, même état, l'effet ne repassait pas. Cliquer une
   * ligne du RÉCENT ne provoquait donc rien du tout, littéralement.
   *
   * ⚠️ ON NE PASSE PAS PAR `lancer`. Rejouer, ce n'est pas redemander : `lancer`
   * réécrirait la ligne avec un horodatage neuf — elle remonterait en tête de
   * liste et changerait d'identifiant sous le clic — et renverrait la question
   * en base une deuxième fois. On refait la recherche, rien de plus.
   */
  const rejouer = useCallback(
    (e: EntreeHistorique) => {
      // Un rappel est un choix délibéré : il doit gagner sur la classe du
      // compte, sinon l'effet `classeConnue` ramènerait Arthur en 5ᵉ juste
      // après qu'il a rouvert sa demande de CM1.
      choixManuel.current = true;

      const r = roleDuProfil(e.profil);
      // Chez l'élève la classe EST le profil ; chez un adulte elle est à côté.
      const laClasse = r === "eleve" ? e.profil : (e.classe ?? null);

      setRole(r);
      setClasse(laClasse);
      setQuestion(e.question);
      setMatiereChoisie(e.matiereLabel ?? null);
      setIntentionChoisie(e.intention ?? null);
      setDemandeProfil(false);
      setPlusDOptions(false);

      memoriser(e.profil);
      if (r !== "eleve") retenirClasse(laClasse);

      setResultat(
        chercher({
          quiEsTu: e.profil,
          classe: r === "eleve" ? null : laClasse,
          question: e.question,
          chip: composerChip(e.matiereLabel ?? null, e.intention ?? null),
        }),
      );
    },
    [memoriser, retenirClasse],
  );

  /** Repartir à blanc — la page vide, mais SANS redemander qui l'on est. */
  const nouvelleDemande = useCallback(() => {
    setQuestion("");
    setMatiereChoisie(null);
    setIntentionChoisie(null);
    setPlusDOptions(false);
    setDemandeProfil(false);
    setResultat(
      profil ? chercher({ quiEsTu: profil, classe: classeAdulte, question: "", chip: null }) : null,
    );
  }, [profil, classeAdulte]);

  /**
   * L'URL DIT QUELLE DEMANDE EST OUVERTE — comme un fil de conversation.
   *
   * `?d=<horodatage>` désigne une ligne du RÉCENT ; une URL nue veut dire
   * « nouvelle demande ». C'est ce qui rend le bouton Précédent et l'ouverture
   * dans un nouvel onglet cohérents, au lieu d'un état qui ne vivrait que dans
   * la mémoire du composant.
   *
   * ⚠️ `useSearchParams` ET NON `window.location` : c'est la seule lecture qui
   * se remette à jour sur une navigation douce, celle qui ne remonte pas le
   * composant. Tout le défaut d'origine tient dans cette différence.
   *
   * ⚠️ ON SORT DÈS QUE L'URL N'A PAS BOUGÉ. Cet effet dépend aussi de deux
   * fonctions dont l'identité change quand le profil change : sans ce garde-fou,
   * choisir sa classe aurait rappelé `nouvelleDemande()` et effacé la question
   * en cours de frappe.
   */
  const parametres = useSearchParams();
  const idDemande = parametres.get("d");
  const questionUrl = parametres.get("q");
  const urlPrecedente = useRef<string | null>(null);

  useEffect(() => {
    const cle = `${idDemande ?? ""}|${questionUrl ?? ""}`;
    if (urlPrecedente.current === cle) return;
    const auMontage = urlPrecedente.current === null;
    urlPrecedente.current = cle;

    if (idDemande) {
      const e = lireDemande(Number(idDemande));
      // Une demande supprimée, ou l'URL d'un autre navigateur : le RÉCENT est
      // local. On ne montre pas d'erreur pour ça — on ouvre l'accueil normal.
      if (e) rejouer(e);
      return;
    }

    // Au montage, l'effet de restauration ci-dessus a déjà lu `?q=` et posé les
    // portes du niveau. Repasser derrière lui effacerait ce qu'il vient de faire.
    if (auMontage) return;

    if (questionUrl) {
      setQuestion(questionUrl);
      if (profil) {
        setResultat(
          chercher({ quiEsTu: profil, classe: classeAdulte, question: questionUrl, chip: null }),
        );
      }
      return;
    }

    nouvelleDemande();
  }, [idDemande, questionUrl, rejouer, nouvelleDemande, profil, classeAdulte]);

  // Le même geste quand l'URL, elle, ne change pas — voir EVENEMENT_NOUVELLE_DEMANDE.
  useEffect(() => {
    const vider = () => nouvelleDemande();
    window.addEventListener(EVENEMENT_NOUVELLE_DEMANDE, vider);
    return () => window.removeEventListener(EVENEMENT_NOUVELLE_DEMANDE, vider);
  }, [nouvelleDemande]);

  function choisirRole(id: RoleId) {
    choixManuel.current = true;
    setRole(id);
    setDemandeProfil(false);
    setMatiereChoisie(null);
    setIntentionChoisie(null);
    setPlusDOptions(false);

    if (id === "eleve") {
      // La classe déjà connue reste valable : on ne redemande pas.
      if (classe) {
        memoriser(classe);
        lancer(question, null, { profil: classe, classe: null });
      } else {
        // La rangée des classes vient de s'ouvrir — c'est elle, la réponse
        // attendue. On n'affiche rien tant qu'elle n'est pas remplie.
        setResultat(null);
      }
      return;
    }

    memoriser(id);
    // ⭐ LA CLASSE SURVIT AU CHANGEMENT DE RÔLE (16/08). Une classe reste une
    // classe : un parent qui bascule sur « Enseignant » parle toujours de la
    // 5ᵉ, et la lui redemander serait lui faire retaper une réponse donnée dix
    // secondes plus tôt. Seul le chef d'établissement la met de côté — il n'a
    // pas de rangée pour la montrer, donc il ne doit pas en avoir une cachée
    // qui filtre en silence.
    lancer(question, null, {
      profil: id,
      classe: ROLES_AVEC_CLASSE.has(id) ? classe : null,
    });
    champ.current?.focus();
  }

  // LE COMPTE GAGNE SUR LE PROFIL MÉMORISÉ (12/08/2026).
  //
  // L'effet de montage ci-dessus restaure `CLE_PROFIL` — un clic d'une visite
  // passée. Arthur, passé en 5e le matin même, s'affichait donc en CP sur
  // l'accueil parce qu'un « CP » traînait dans son localStorage, alors que son
  // tableau de bord disait bien 5e. Un souvenir de clic ne peut pas primer sur
  // ce que dit le compte.
  //
  // Deux raisons de ne pas se contenter de `setClasse` :
  //   • l'effet de montage a déjà calculé un RÉSULTAT pour le CP — changer la
  //     pastille sans relancer laisserait les portes du CP sous la barre ;
  //   • le CP resterait écrit dans localStorage et reviendrait à la visite
  //     suivante. On réécrit la clé.
  //
  // `choixManuel` protège le seul cas où l'écran doit gagner : un clic fait
  // pendant cette visite. La session arrive tard (localStorage, puis
  // /api/ma-classe) — sans ce garde-fou, elle écraserait un choix délibéré.
  useEffect(() => {
    if (!classeConnue || choixManuel.current) return;
    if (classe === classeConnue && role === "eleve") return;
    setRole("eleve");
    setClasse(classeConnue);
    memoriser(classeConnue);
    setResultat(chercher({ quiEsTu: classeConnue, question: "", chip: null }));
  }, [classeConnue, classe, role, memoriser]);

  function choisirClasse(id: ProfilId) {
    choixManuel.current = true;
    setClasse(id);
    setDemandeProfil(false);
    setMatiereChoisie(null);
    setIntentionChoisie(null);
    setPlusDOptions(false);

    // ⚠️ DEUX GESTES DIFFÉRENTS SOUS LE MÊME CLIC. Chez l'élève, choisir sa
    // classe c'est dire QUI IL EST : le profil devient la classe. Chez un
    // adulte, c'est dire DE QUI IL PARLE : le rôle ne bouge pas, la classe
    // s'ajoute à côté. Confondre les deux ferait d'un parent un élève de 5ᵉ —
    // il verrait « Teste-toi » et perdrait son espace parents.
    if (role === "eleve") {
      memoriser(id);
      lancer(question, null, { profil: id, classe: null });
    } else {
      retenirClasse(id);
      lancer(question, null, { classe: id });
    }
    champ.current?.focus();
  }

  function cliquerMatiere(label: string) {
    const suivante = matiereChoisie === label ? null : label;
    setMatiereChoisie(suivante);
    // La matière restreint les intentions : celle qui était allumée peut ne
    // plus exister ici. On la relâche plutôt que de garder un filtre invisible.
    setIntentionChoisie(null);
    setPlusDOptions(false);
    lancer(question, composerChip(suivante, null));
  }

  function cliquerChip(label: string) {
    const suivante = intentionChoisie === label ? null : label;
    setIntentionChoisie(suivante);
    lancer(question, composerChip(matiereChoisie, suivante));
  }

  // Sur le journal on emprunte l'encre et le papier de la page ; sur l'accueil
  // on a notre propre calme. Deux habillages, un seul comportement.
  /**
   * ⭐ UNE TEINTE PAR RANGÉE (21/08/2026).
   *
   * Les trois rangées répondent à trois questions différentes — qui tu es, ta
   * classe, ta matière — et allumaient toutes la même pastille teal. Résultat,
   * les trois choix en cours se lisaient comme une seule liste : rien ne disait
   * à l'œil que « Élève », « 6ᵉ » et « Mathématiques » sont trois réponses
   * distinctes. La couleur porte l'appartenance, elle ne décore pas.
   *
   * ⚠️ Des aplats, pas des dégradés : sur une pastille de 26 px de haut, un
   * dégradé ne se voit pas — il ne fait qu'ajouter du bruit au rendu.
   * ⚠️ Les trois teintes sont prises au cran 700, seul niveau qui tienne le
   * contraste AA en blanc sur 13 px (sky-700 6,4:1 · emerald-700 5,3:1 ·
   * amber-700 5,9:1). Les crans 400 des tuiles du coach tombent sous 2:1 :
   * ils valent pour une grande tuile à texte noir, pas pour une pastille.
   * ⛔ La variante « accueil » (le journal, en papier noir sur crème) n'est PAS
   * touchée : sa gamme est délibérée, la couleur n'y entre pas.
   */
  const TEINTE_ACTIVE = {
    role: "border-sky-700 bg-sky-700",
    classe: "border-emerald-700 bg-emerald-700",
    matiere: "border-amber-700 bg-amber-700",
  } as const;

  const bouton = (actif: boolean, teinte: keyof typeof TEINTE_ACTIVE = "role") =>
    surAccueil
      ? actif
        ? "border-2 border-[#1d1c16] bg-[#1d1c16] text-[#f5fafb]"
        : "border-2 border-[#1d1c16]/40 bg-white/70 text-[#1d1c16] hover:border-[#1d1c16]"
      : actif
        ? `border ${TEINTE_ACTIVE[teinte]} text-white`
        : "border border-slate-300 bg-white text-slate-700 hover:border-slate-500";

  return (
    <section
      // ⚠️ CE NOM ACCESSIBLE TUTOYAIT EN DUR (corrigé le 20/08/2026). Depuis
      // que l'intitulé visible du champ a été retiré (19/08), c'est LUI que le
      // lecteur d'écran annonce en entrant dans le bloc — donc le seul endroit
      // où un enseignant entendait « Que veux-tu faire aujourd'hui ? ». Un texte
      // invisible reste un texte : il suit `tutoie` comme les autres.
      aria-label={
        tutoie ? "Que veux-tu faire aujourd'hui ?" : "Que voulez-vous faire aujourd'hui ?"
      }
      className={
        surAccueil
          ? "mx-auto mb-4 w-full min-w-0 max-w-6xl border-2 border-[#1d1c16] bg-white/60 px-4 py-4 sm:px-6"
          : ""
      }
    >
      {/* ── 1. Qui es-tu ? ──────────────────────────────────────────────── */}
      {/* ⭐ L'INTITULÉ EST VIDE DEPUIS LE 19/08, ET C'EST VOULU.
          Le titre de l'accueil pose désormais la question lui-même — « Qui
          es-tu ? Que cherches-tu aujourd'hui ? » — et l'écrire une seconde fois
          cinq centimètres plus bas, c'est le piège déjà noté le 07/08 à propos
          des portes d'audience : on demande deux fois, et le visiteur se
          demande si ce sont deux questions différentes.
          Les quatre pastilles (Élève · Parent · Enseignant · Chef
          d'établissement) se lisent seules — aucune étiquette n'est nécessaire
          pour comprendre ce qu'on demande là.
          ⚠️ ON GARDE L'ÉTAPE ET SA CHAÎNE VIDE plutôt que de sortir la rangée
          du composant : `Etape` réserve une colonne de largeur FIXE (sm:w-32),
          et c'est elle qui aligne les pastilles avec celles de « Ta classe » et
          « Ta matière » en dessous. Sans elle, la première rangée partirait
          128 px à gauche des deux autres.
          ⚠️ L'`aria-label` du groupe, lui, RESTE : un lecteur d'écran qui
          arrive sur ces boutons n'a pas le titre sous les yeux. */}
      <Etape intitule="" surAccueil={surAccueil}>
        <div className="rangee-defilante gap-1.5 sm:gap-2" role="group" aria-label="Qui es-tu ?">
          {ROLES.map((r) => {
            const actif = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => choisirRole(r.id)}
                aria-pressed={actif}
                className={`rounded-full px-3 py-1.5 text-[13px] transition ${bouton(actif)}`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </Etape>

      {/* ⭐ L'ADULTE QUI N'EST DANS AUCUNE DES QUATRE CASES (21/08/2026).
          Deux adultes ont testé le site : ils ont cliqué « Élève », tapé une
          classe, et ça ne les a pas gênés. C'est ce test qui a fait ABANDONNER
          la 5ᵉ pastille « Adulte » — elle n'aurait rien ouvert de neuf, les
          rituels et les coachs sortent déjà pour qui dit une classe, et un
          profil `adulte` sans ressource taguée aurait rendu une page blanche
          (`rangNiveaux` ne trouve ce niveau nulle part).
          Reste ce que le test ne pouvait pas voir : Frédéric était À CÔTÉ
          d'eux pour leur dire quoi cliquer. Celui qui arrive par Google lit
          « Qui es-tu ? », voit quatre cases où il n'est pas, et repart. Cette
          ligne est la phrase que Frédéric disait à voix haute.

          ⚠️ ELLE VOUVOIE au milieu d'un écran qui tutoie, et c'est voulu :
          elle ne s'adresse qu'à l'adulte. Le reste de la page parle à l'élève,
          et `tutoie` vaut d'ailleurs `true` ici (sans classe, `profil` est nul).
          ⚠️ `sm:ml-36` = la colonne d'intitulé d'`Etape` (w-32) plus son gap-4 :
          la ligne se pose SOUS les pastilles, pas sous leur libellé.
          ⛔ ON NE NOMME NI LE CRPE NI AUCUNE DATE. Le français du cycle 3 le
          prépare déjà (lib/fiches/REGLES.md), mais les fiches ne sont pas
          finies : on n'annonce pas un concours qu'on ne tient pas encore.
          ⛔ ET ELLE S'EFFACE DÈS QU'UNE CLASSE EST CLIQUÉE. C'est ce qui la rend
          acceptable sur un écran dont tout le fichier répète qu'il n'a qu'un
          travail : faire choisir une classe. Elle ne coûte une ligne qu'à ceux
          qui n'ont pas encore répondu — après, elle disparaît. */}
      {role === "eleve" && !classe && (
        <p className="mt-2 text-xs leading-snug text-slate-600 sm:ml-36">
          Adulte&nbsp;? Reprendre les bases, préparer un concours&nbsp;:
          choisissez la classe du niveau visé.
        </p>
      )}

      {/* ── 2. La classe ──────────────────────────────────────────────────
          ⭐ PLUS SEULEMENT L'ÉLÈVE (16/08) : le parent et l'enseignant l'ont
          aussi. Voir ROLES_AVEC_CLASSE en tête de fichier — c'est la classe qui
          fait exister leurs matières, leur guide de survie et la porte du
          coach. */}
      {role && ROLES_AVEC_CLASSE.has(role) && (
        <Etape intitule={INTITULE_CLASSE[role] ?? "La classe"} surAccueil={surAccueil}>
          <div
            className="rangee-defilante gap-1 sm:gap-1.5"
            role="group"
            aria-label={INTITULE_CLASSE[role] ?? "La classe"}
          >
            {CLASSES.map((c) => {
              const actif = classe === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => choisirClasse(c.id)}
                  aria-pressed={actif}
                  aria-label={c.label}
                  // px-2.5 et non px-3 : douze pastilles doivent tenir sur une
                  // ligne d'ordinateur, et ce sont ces 12 px qui manquaient.
                  className={`rounded-full px-2.5 py-1.5 text-[13px] transition ${bouton(actif, "classe")}`}
                >
                  {CLASSE_COURTE[c.id] ?? c.label}
                </button>
              );
            })}
          </div>
        </Etape>
      )}

      {/* ── 3. La matière ───────────────────────────────────────────────────
          AVANT « Que veux-tu faire ? » depuis le 07/08 (option A). Elle ne
          s'écrit JAMAIS dans le champ : le texte tapé reste celui de la
          personne, et la pastille allumée dit le filtre. */}
      {matieres.length > 1 && (
        <Etape intitule={tutoie ? "Ta matière" : "La matière"} surAccueil={surAccueil}>
          <div className="rangee-defilante gap-1.5 sm:gap-2" role="group" aria-label="La matière">
            {matieres.map((m) => {
              const actif = matiereChoisie === m.label;
              return (
                <button
                  key={m.matiere}
                  type="button"
                  onClick={() => cliquerMatiere(m.label)}
                  aria-pressed={actif}
                  className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition ${
                    surAccueil
                      ? actif
                        ? "bg-[#0e7490] text-white"
                        : "bg-[#1d1c16]/[0.07] text-[#1d1c16] hover:bg-[#1d1c16]/15"
                      : actif
                        ? "bg-amber-700 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </Etape>
      )}

      {/* ── 4. Que veux-tu faire aujourd'hui ? ──────────────────────────────
          ⭐ LE CHAMP EST AU CENTRE, ET LA FLÈCHE EST DEDANS (07/08, Frédéric :
          « le champ de saisie est vraiment centré sur Claude et ChatGPT », « la
          flèche de validation doit être à l'intérieur du champ »).

          Ce qui le décentrait : l'intitulé posé à SA GAUCHE, comme pour les
          trois rangées du dessus. 128 px de colonne + 16 px d'espace, et le
          champ se retrouvait 75 px à droite du milieu de la page — assez pour
          qu'on le voie sans savoir dire pourquoi. L'intitulé passe donc
          au-dessus, centré ; le champ prend toute la largeur du conteneur, qui
          est lui-même centré. Son milieu est alors exactement celui de la page.

          Le filet marque en même temps la bascule : au-dessus on dit QUI on
          est, en dessous ce qu'on CHERCHE.

          ⭐ L'INTITULÉ CENTRÉ A ÉTÉ RETIRÉ LE 19/08. Il disait « Que veux-tu
          faire aujourd'hui ? » — et la même question était posée DEUX AUTRES
          FOIS sur le même écran : par le titre de l'accueil, qui la reprend mot
          pour mot depuis ce matin, et par le placeholder du champ, « Écris ta
          question ou explique ce qui coince… », qui est le plus utile des trois
          puisqu'il donne un exemple de ce qu'on peut taper.
          Le filet reste, muet : la bascule se voit sans qu'on la commente, et
          c'est justement ce que le titre vient d'annoncer.
          ⚠️ Le `aria-label` du <section> porte toujours la question (voir plus
          haut) — c'est lui qui la dit aux lecteurs d'écran, pas ce texte.
          ⚠️ Cette suppression fait perdre le SEUL endroit où la version
          vouvoyée sortait pour le parent, le prof et la direction. Rien n'est
          cassé : le placeholder et les libellés du champ gardent leur variante
          (voir `tutoie` plus bas). */}
      <div
        className={`mt-6 border-t pt-6 ${
          surAccueil ? "border-[#1d1c16]/12" : "border-slate-200"
        }`}
      >

        <form
          onSubmit={(e) => {
            e.preventDefault();
            lancer(question, chip);
          }}
          className="relative"
        >
          <input
            ref={champ}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={
              tutoie ? "Écris ta question ou explique ce qui coince…" : "Décrivez votre besoin…"
            }
            aria-label={tutoie ? "Ta question" : "Votre demande"}
            // ⚠️ ARRONDI, seul de toute la page (Frédéric, 05/08). Le journal
            // est carré partout — filets, tuiles, encadrés — et c'est justement
            // pour ça : une zone de saisie d'IA se reconnaît à sa forme avant
            // d'être lue. La rondeur dit « écris ici » là où un rectangle
            // dirait « encore un encadré ».
            // `pr-14` réserve la place de la flèche, qui vit DANS le champ.
            className={
              surAccueil
                ? "w-full rounded-full border-2 border-[#1d1c16] bg-white py-3 pl-5 pr-14 text-base text-[#1d1c16] outline-none placeholder:text-[#1d1c16]/45 focus:ring-2 focus:ring-[#0e7490]/30"
                : "w-full rounded-full border border-slate-300 bg-white py-3 pl-5 pr-14 text-base shadow-sm outline-none placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
            }
          />
          <button
            type="submit"
            aria-label="Chercher"
            className={`absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition ${
              surAccueil
                ? "bg-[#1d1c16] text-[#f5fafb] hover:bg-[#0e7490]"
                : "bg-teal-700 text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700/40"
            }`}
          >
            <span aria-hidden="true">→</span>
          </button>
        </form>

        {/* Les actions du professeur et du chef d'établissement — écrites, pas
            déduites, et chacune ouvre un outil. Voir lib/matrice/actions.ts.
            ⚠️ `sm:justify-center` et pas `justify-center` : centrer une rangée
            qui défile rogne son DÉBUT dès qu'elle déborde, et sur téléphone
            elle déborde toujours. */}
        {actions.length > 0 ? (
          <div className="rangee-defilante mt-3 gap-1.5 sm:justify-center sm:gap-2">
            {actions.map((a) => (
              <Link
                key={a.href}
                // La classe part avec la matière : le jour où une action
                // acceptera des filtres (`accepteFiltres`), elle s'ouvrira déjà
                // sur la bonne — l'enseignant vient de la dire deux lignes plus
                // haut, la redemander à l'écran suivant serait ne pas l'écouter.
                href={urlAction(a, { matiere: matiereId, niveau: niveauContexte })}
                prefetch={false}
                title={a.aide}
                onClick={() => track("ia_action", { action: a.label, profil: profil ?? "inconnu" })}
                className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                  surAccueil
                    ? "border-2 border-[#1d1c16]/25 bg-white/70 text-[#1d1c16]/80 hover:border-[#0e7490] hover:text-[#0e7490]"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-teal-700 hover:text-teal-800"
                }`}
              >
                {a.label}
              </Link>
            ))}
          </div>
        ) : (
          // `depliee` casse le « une seule ligne » — et seulement là. Replié on
          // tient la ligne pour garder les ressources au-dessus du pli ; déplié,
          // la personne a demandé à voir, on montre tout d'un coup plutôt que de
          // lui faire faire défiler une rangée qui ne dit pas qu'elle défile.
          <div
            className={`rangee-defilante mt-3 gap-1.5 sm:justify-center sm:gap-2 ${
              plusDOptions ? "depliee" : ""
            }`}
          >
            {chips.map((c) => {
              const actif = intentionChoisie === c.label;
              return (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => cliquerChip(c.label)}
                  aria-pressed={actif}
                  className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                    surAccueil
                      ? actif
                        ? "border-2 border-[#0e7490] bg-[#0e7490]/10 text-[#0e7490]"
                        : "border-2 border-[#1d1c16]/25 bg-white/70 text-[#1d1c16]/80 hover:border-[#1d1c16]/60"
                      : actif
                        ? "border border-teal-700 bg-teal-50 text-teal-900"
                        : "border border-slate-300 bg-white text-slate-600 hover:border-slate-500"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}

            {/* ⭐ LES RACCOURCIS — concours, guide, cahiers, maths en vrai.
                Ils ne filtrent rien : ils OUVRENT une page. C'est ce qui les
                sépare des chips, et c'est pourquoi ils ne peuvent pas venir de
                `chipsDisponibles`. Leur liste et leur ordre se calculent en
                tête de composant (`raccourcis`).

                🔑 CE QU'ON RETIENT DU 12/08, et qui vaut toujours : une carte
                porte un titre, une promesse et un pictogramme ; une pastille
                porte un mot. Quand les deux mènent au même endroit, c'est la
                pastille qui s'efface — c'est comme ça que « Photographier un
                cours » a quitté cette rangée pour devenir une carte.

                ⚠️ ILS PASSENT SOUS « AUTRES OPTIONS » COMME LES CHIPS depuis le
                20/08 : ils étaient quatre `&&` empilés, qui s'ajoutaient à une
                rangée déjà pleine au lieu d'y prendre place.

                ⚠️ POUR UN ÉLÈVE, `profil` EST SA CLASSE — elle vaut `null` tant
                qu'il ne l'a pas choisie, et aucun raccourci n'apparaît donc
                avant. C'est vrai des quatre, par construction. */}
            {raccourcisVisibles.map((rc) => (
              <Link
                key={rc.cle}
                href={rc.href}
                prefetch={false}
                onClick={() => track(rc.evenement, { profil: profil ?? "inconnu" })}
                className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                  rc.couleur ??
                  (surAccueil
                    ? "border-2 border-[#1d1c16]/25 bg-white/70 text-[#1d1c16]/80 hover:border-[#1d1c16]/60"
                    : "border border-slate-300 bg-white text-slate-600 hover:border-slate-500")
                }`}
              >
                {rc.label}
              </Link>
            ))}

            {(restantes > 0 || plusDOptions) && (
              <button
                type="button"
                onClick={() => setPlusDOptions((v) => !v)}
                className={`rounded-full px-3 py-1.5 text-[13px] underline underline-offset-2 transition ${
                  surAccueil ? "text-[#1d1c16]/60 hover:text-[#1d1c16]" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {/* ⚠️ « AUTRES OPTIONS », SANS LE COMPTE (20/08/2026). Le
                    « (3) » chiffrait ce qu'on cache, pas ce qu'on ouvre : il se
                    lisait comme un badge de notification — trois choses en
                    attente — alors que ces trois-là sont précisément celles
                    qu'on a jugées moins utiles ici. Et le nombre changeait à
                    chaque clic de matière, ce qui faisait bouger la largeur du
                    bouton sous le doigt. */}
                {plusDOptions ? "Moins d'options" : "Autres options"}
              </button>
            )}
          </div>
        )}
      </div>

      {demandeProfil && (
        <p
          role="alert"
          className={
            surAccueil
              ? "mt-2.5 border-2 border-[#a34c07] bg-[#a34c07]/10 px-3 py-2 text-sm text-[#1d1c16]"
              : "mt-2.5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900"
          }
        >
          {/* Toujours au tutoiement : ce message ne s'affiche QUE tant que
              personne n'a dit qui il est. Un professeur qui a choisi son profil
              ne le verra jamais.
              ⚠️ Il s'affiche aussi quand un ÉLÈVE n'a pas dit sa classe — c'est
              le même trou, et c'est la même phrase qui le comble. */}
          Dis-moi d&apos;abord qui tu es —{" "}
          {POURQUOI_LE_PROFIL[matiereId ?? ""] ?? POURQUOI_SANS_MATIERE}.
        </p>
      )}

      {/* ⭐ LE PREMIER ÉCRAN NE DISAIT PAS CE QU'IL ATTENDAIT (20/08/2026).
          Tant qu'aucune classe n'est dite, le moteur ne répond rien — c'est la
          règle, et elle est juste : la même phrase ne veut pas dire la même
          chose en CP et en Terminale. Mais à l'écran, ça donnait quarante pour
          cent de hauteur blanche sous la barre, et un blanc ne dit pas « il me
          manque ta classe » : il dit « c'est tout ».
          Le pire, c'est que la ligne prévue pour meubler cet endroit — « Par
          exemple : … », juste en dessous — est justement morte là : elle exige
          un `profil`, qui n'existe pas avant la classe. La seule chose capable
          de remplir ce vide était éteinte exactement quand il apparaissait.
          Une ligne suffit, et elle redit l'argument qui justifie la question.
          ⚠️ Elle sort AUSSI pour un élève qui a cliqué son rôle sans sa classe —
          c'est le même trou. Le parent, le prof et la direction, eux, ont un
          profil dès leur rôle : leur écran répond, ils ne la voient jamais. */}
      {!profil && !resultat && !demandeProfil && (
        <p className="mt-3 text-center text-xs text-[#1d1c16]/70">
          Choisis ta classe : les réponses ne sont pas les mêmes du CP à la Terminale.
        </p>
      )}

      {/* Une barre vide, c'est la page blanche. On souffle trois départs —
          mais seulement tant qu'il n'y a rien d'autre à lire à cet endroit. */}
      {!resultat && !demandeProfil && exemples.length > 0 && (
        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-[#1d1c16]/70">
          <span>Par exemple :</span>
          {exemples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setQuestion(ex);
                lancer(ex, null);
              }}
              className="underline decoration-[#1d1c16]/30 underline-offset-2 hover:decoration-[#1d1c16]"
            >
              « {ex} »
            </button>
          ))}
        </p>
      )}

      {/* ── Ce qu'on a trouvé ───────────────────────────────────────────── */}
      {resultat && p && (
        <div className={surAccueil ? "mt-6" : "mt-7"} aria-live="polite">
          {/* Quand NI notion NI intention n'ont été lues, on n'a rien compris —
              et écrire « Ce que j'ai compris : 4e » au-dessus de trois ressources
              choisies au niveau seul serait un mensonge poli. On le dit, et les
              ressources deviennent une proposition de départ, pas une réponse.
              ⚠️ Sauf quand la personne n'a RIEN demandé : après un simple choix
              de classe, « je n'ai pas bien compris la demande » reprocherait un
              silence. On annonce alors ce que c'est — un point de départ. */}
          {!resultat.lecture.notionId && !resultat.lecture.intention && !matiereChoisie ? (
            <p className="mb-2.5 text-center text-xs text-[#1d1c16]/65">
              {question.trim()
                ? "Je n'ai pas bien compris la demande — voici par où "
                : "Par où "}
              {p.tutoie ? "tu peux" : "vous pouvez"} commencer en{" "}
              <span className="text-[#1d1c16]">{labelClasseAdulte ?? p.label}</span>.
            </p>
          ) : (
            <p className="mb-2.5 text-center text-xs text-[#1d1c16]/65">
              Ce que j&apos;ai compris :{" "}
              <span className="text-[#1d1c16]">
                {[
                  p.label,
                  labelClasseAdulte,
                  matiereChoisie,
                  resultat.lecture.intention ? libelleIntention(resultat.lecture.intention) : null,
                  resultat.lecture.notionLabel,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </p>
          )}

          {resultat.lecture.intention === "humain" ? (
            // Chercher quelqu'un, ce n'est pas chercher une ressource. On n'a
            // pas d'annuaire — on le dit, et on ouvre la porte qui existe.
            <div className="border-2 border-[#1d1c16] bg-white p-4">
              <p className="text-sm text-[#1d1c16]">
                {p.tutoie ? "Tu cherches" : "Vous cherchez"} quelqu&apos;un, pas un exercice.
              </p>
              <p className="mt-2 text-sm text-[#1d1c16]/70">
                EleveAI n&apos;a pas encore d&apos;annuaire de professeurs — je ne vais pas{" "}
                {p.tutoie ? "te" : "vous"} faire croire le contraire. En attendant, c&apos;est un
                vrai enseignant qui lit les messages.
              </p>
              <Link
                href="/contact?from=ia"
                prefetch={false}
                onClick={() => track("ia_ressource", { id: "contact-humain", rang: 1, profil: p.id })}
                className="mt-3 inline-block border-2 border-[#1d1c16] bg-[#1d1c16] px-3 py-1.5 text-sm font-bold text-[#f5fafb] hover:bg-[#0e7490] hover:border-[#0e7490]"
              >
                Écrire à un enseignant
              </Link>
            </div>
          ) : resultat.recommandations.length === 0 ? (
            <div className="border-2 border-[#1d1c16] bg-white p-4">
              <p className="text-sm text-[#1d1c16]">
                Je n&apos;ai rien de vérifié à {p.tutoie ? "te" : "vous"} proposer là-dessus pour{" "}
                {p.label}.
              </p>
              {/* ⚠️ CES DEUX VERBES TUTOYAIENT TOUT LE MONDE (corrigé le
                  20/08/2026). Le paragraphe juste au-dessus dit bien « vous
                  proposer » à un parent — et deux lignes plus bas on lui
                  répondait « Essaie de le dire autrement ». C'était le dernier
                  texte de l'écran à ignorer `p.tutoie`, et il tombait au pire
                  moment : celui où l'on vient de ne rien trouver. */}
              <p className="mt-2 text-sm text-[#1d1c16]/70">
                C&apos;est noté — c&apos;est comme ça qu&apos;on sait quoi construire ensuite.
                {p.tutoie
                  ? " Essaie de le dire autrement, ou choisis une entrée ci-dessus."
                  : " Essayez de le dire autrement, ou choisissez une entrée ci-dessus."}
              </p>
              {resultat.lecture.motsInconnus.length > 0 && (
                <p className="mt-2 text-xs text-[#1d1c16]/70">
                  Mots que je n&apos;ai pas reconnus : {resultat.lecture.motsInconnus.join(", ")}
                </p>
              )}
            </div>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-3">
              {resultat.recommandations.map((r, i) => (
                <li key={r.ressource.id}>
                  <Link
                    // Une ressource externe s'ouvre dans un nouvel onglet et ne
                    // porte pas `?from=ia` : ce paramètre ne sert qu'à notre
                    // suivi interne, et on ne renvoie personne d'un clic hors
                    // du site sans qu'il puisse revenir.
                    href={
                      r.ressource.externe
                        ? r.url
                        : `${r.url}${r.url.includes("?") ? "&" : "?"}from=ia`
                    }
                    target={r.ressource.externe ? "_blank" : undefined}
                    rel={r.ressource.externe ? "noopener noreferrer" : undefined}
                    // ⚠️ PAS DE PRÉCHARGEMENT. Un <Link> d'App Router va
                    // chercher la charge RSC de sa destination dès qu'il entre
                    // dans le champ de vision, et sur une route statique c'est
                    // une LECTURE du cache durable — le quota ISR Reads du
                    // compte. Ces cartes changent à chaque question : les
                    // laisser précharger ferait payer des destinations que
                    // personne n'ouvre.
                    prefetch={false}
                    onClick={() => track("ia_ressource", { id: r.ressource.id, rang: i + 1, profil: p.id })}
                    // ⭐ COLONNE FLEX, ET NON UN SIMPLE `block` (20/08/2026).
                    // Les trois cartes sont d'égale hauteur (grille), donc la
                    // plus courte creusait un vide en bas pendant que sa voisine
                    // était pleine — et la ligne de raison flottait à une
                    // hauteur différente sur chaque carte. En colonne, c'est la
                    // PROMESSE qui prend le mou (`flex-1`) et la raison qui se
                    // pose au même endroit sur les trois.
                    className={`flex h-full flex-col border-2 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1d1c16] ${
                      i === 0 ? "border-[#0e7490]" : "border-[#1d1c16]/30"
                    }`}
                  >
                    {/* ⭐ LE PICTOGRAMME DU GESTE (Frédéric, 12/08 : « comme
                        sur Le Bon Coin »). Un appareil photo dit « il y a une
                        photo à prendre » avant qu'on ait lu le titre — et
                        « photographier » est le seul geste PHYSIQUE de toute
                        la rangée, donc le seul qui gagne à être dessiné.
                        ⚠️ Discret et sur une seule carte : trois vignettes
                        côte à côte se neutraliseraient, et la carte perdrait
                        la place de sa promesse. `aria-hidden` — le titre dit
                        déjà tout à qui n'y voit pas. */}
                    {/* ⚠️ UNE PASTILLE, PLUS UNE BANDE (20/08/2026). Le
                        pictogramme vivait dans un rectangle pleine largeur de
                        56 px de haut, bordé et grisé, avec une petite icône
                        pâle au milieu : la forme exacte d'une image qui n'a pas
                        chargé. Sur la seule carte censée dire « il y a une
                        photo à prendre », l'écran répondait « il manque une
                        photo ». Même icône, même intention, dans une pastille
                        de 38 px qui ne peut pas se lire comme un cadre vide. */}
                    {/* ⭐ LE BADGE MONTE SUR LA LIGNE DU PICTOGRAMME (20/08/2026),
                        IL NE PARTAGE PLUS SA LIGNE AVEC LE TITRE.
                        Un badge `shrink-0 whitespace-nowrap` posé à droite du
                        titre lui prenait 110 px inamovibles : dans une colonne
                        de tiers d'écran, « Le coach maths » se cassait en TROIS
                        lignes et « Photographier un cours » aussi. Le titre a
                        maintenant toute la largeur, et il tient sur une ligne
                        dès que la place existe.
                        ⚠️ `h-9` MÊME SANS PICTOGRAMME : cette ligne est la même
                        sur les trois cartes, donc les trois titres commencent à
                        la même hauteur. Sans hauteur fixe, la carte à l'appareil
                        photo décalait son titre de 16 px vers le bas. */}
                    <div className="mb-2 flex h-9 items-center justify-between gap-2">
                      {/* ⭐ LE PICTOGRAMME DU GESTE (Frédéric, 12/08 : « comme
                          sur Le Bon Coin »). Un appareil photo dit « il y a une
                          photo à prendre » avant qu'on ait lu le titre — et
                          « photographier » est le seul geste PHYSIQUE de toute
                          la rangée, donc le seul qui gagne à être dessiné.
                          ⚠️ UNE PASTILLE, PLUS UNE BANDE (20/08). Il vivait dans
                          un rectangle pleine largeur de 56 px de haut, bordé et
                          grisé, avec une petite icône pâle au milieu : la forme
                          exacte d'une image qui n'a pas chargé. Sur la seule
                          carte censée dire « il y a une photo à prendre »,
                          l'écran répondait « il manque une photo ».
                          ⚠️ Discret et sur une seule carte : trois vignettes
                          côte à côte se neutraliseraient. `aria-hidden` — le
                          titre dit déjà tout à qui n'y voit pas. */}
                      {r.ressource.icone === "camera" ? (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0e7490]/10">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="h-5 w-5 text-[#0e7490]"
                          >
                            <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2a1.5 1.5 0 0 0 1.3-.75l.7-1.2A1.5 1.5 0 0 1 10 4.3h4a1.5 1.5 0 0 1 1.3.75l.7 1.2A1.5 1.5 0 0 0 17.3 7h2.2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
                            <circle cx="12" cy="13" r="3.4" />
                          </svg>
                        </span>
                      ) : (
                        <span aria-hidden="true" />
                      )}
                      {/* ⭐ LES DEUX BADGES RESTENT, MAIS ILS SE DISENT
                          (20/08/2026). Un audit demandait d'en choisir UN, au
                          motif que deux mots pour une idée sèment le doute. Ce
                          ne sont pas deux mots pour une idée : « vérifiée » veut
                          dire qu'un enseignant l'a relue, « testée en classe »
                          qu'elle est en plus passée devant des élèves. La
                          seconde contient la première, elle ne la répète pas —
                          et c'est exactement la promesse du site.
                          Ce qui manquait, c'est que la différence n'était écrite
                          NULLE PART : le `title` la dit à qui s'arrête dessus. */}
                      <span
                        title={
                          r.ressource.statut === "testee_eleves"
                            ? "Relue par un enseignant, et déjà utilisée avec des élèves."
                            : "Relue par un enseignant avant d'être publiée."
                        }
                        className={`shrink-0 whitespace-nowrap px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          r.ressource.statut === "testee_eleves"
                            ? "bg-[#3f6b0c]/12 text-[#3f6b0c]"
                            : "bg-[#0e7490]/12 text-[#0e7490]"
                        }`}
                      >
                        {r.ressource.statut === "testee_eleves" ? "testée en classe" : "vérifiée"}
                      </span>
                    </div>
                    {/* Le titre a la ligne pour lui seul — voir la note du bloc
                        au-dessus. `text-balance` pour que, s'il doit tout de
                        même passer à deux lignes sur téléphone, la coupure
                        tombe au milieu et non après le premier mot. */}
                    <p className="text-balance font-bold text-[#1d1c16]">{r.ressource.titre}</p>
                    {/* `flex-1` : c'est la promesse qui absorbe la différence de
                        hauteur entre les trois cartes, pas un vide en bas. */}
                    <p className="mt-1 flex-1 text-sm text-[#1d1c16]/75">{r.ressource.promesse}</p>
                    {/* ⚠️ LA LIGNE N'EXISTE QUE S'IL Y A QUELQUE CHOSE À Y
                        METTRE. Depuis que `raisonner` ne réécrit plus le niveau
                        sous chaque carte (moteur.ts, 20/08), `r.raison` peut
                        être vide — un <p> vide laisserait une ligne blanche
                        sous la promesse, ce qu'on vient justement de retirer.
                        ⚠️ `/65` et non `/50` : #1d1c16 à 50 % sur blanc, c'est
                        3,4:1, sous le seuil AA. À 65 % on est à 5,3:1. */}
                    {(r.raison || (r.ciblee && resultat.lecture.notionLabel)) && (
                      <p className="mt-1.5 text-xs text-[#1d1c16]/65">
                        {r.ciblee && resultat.lecture.notionLabel ? (
                          <span className="text-[#0e7490]">
                            s&apos;ouvre sur {resultat.lecture.notionLabel}
                            {r.raison ? " — " : ""}
                          </span>
                        ) : null}
                        {r.raison}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ⛔ PAS D'HISTORIQUE ICI (retiré le 06/08/2026). Il vivait sous la
          recherche du temps de /ia, qui n'avait rien d'autre pour le porter.
          Depuis que l'entrée est l'accueil, la colonne de gauche l'affiche —
          et il apparaissait deux fois sur le même écran. Un seul endroit pour
          revenir sur ses pas : le RÉCENT, à gauche. L'écriture reste ici :
          c'est elle que la colonne lit. */}
    </section>
  );
}
