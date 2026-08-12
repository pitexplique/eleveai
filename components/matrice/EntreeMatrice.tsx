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
import { track } from "@vercel/analytics";
import { useEleve } from "@/context/EleveContext";
import { PROFILS, getProfil } from "@/lib/matrice/profils";
import { exemplesPour } from "@/lib/matrice/exemples";
import { CHIPS_VISIBLES, chipsDisponibles, composerChip, matieresDisponibles } from "@/lib/matrice/chips";
import { actionsPour, urlAction } from "@/lib/matrice/actions";
import { afficherConcours } from "@/lib/matrice/concours";
import { cahiersPour, guidesPour, urlCahierPour, urlGuidePour } from "@/lib/matrice/guides";
import { chercher, libelleIntention } from "@/lib/matrice/moteur";
import {
  CLE_HISTORIQUE,
  EVENEMENT_HISTORIQUE,
  lireHistorique,
  type EntreeHistorique,
} from "@/lib/matrice/historique";
import type { ProfilId, ResultatMatrice } from "@/lib/matrice/types";

const CLE_PROFIL = "eleveai.ia.profil";
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

  const [role, setRole] = useState<RoleId | null>(null);
  const [classe, setClasse] = useState<ProfilId | null>(null);

  // Un clic fait DANS CETTE VISITE : il gagne sur tout le reste, y compris sur
  // le compte. Un élève de 5e a le droit d'aller regarder la 3e.
  const choixManuel = useRef(false);

  const profil: ProfilId | null = role === "eleve" ? classe : role;

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
  // Jamais affiché ICI — la colonne de gauche est le seul endroit qui montre le
  // RÉCENT. Cet état existe pour une seule raison : c'est lui qui ÉCRIT dans
  // localStorage, et il doit donc connaître ce qui s'y trouve déjà.
  const [, setHistorique] = useState<EntreeHistorique[]>([]);
  const champ = useRef<HTMLInputElement>(null);

  // Le profil se retient : on ne redemande pas à un élève qui il est chaque
  // matin. Et il est PARTAGÉ entre l'entrée et la colonne — même clé, même
  // personne.
  useEffect(() => {
    try {
      // ⚠️ ON RELIT L'HISTORIQUE AVANT TOUT. Sans ça, la première demande de la
      // visite repartait d'une liste vide et ÉCRASAIT tout ce qui était déjà
      // enregistré : le RÉCENT de la colonne se vidait à chaque nouvelle
      // question. C'est le seul composant qui écrit dans cette clé.
      setHistorique(lireHistorique());

      const p = localStorage.getItem(CLE_PROFIL);
      if (p && PROFILS.some((x) => x.id === p)) {
        const id = p as ProfilId;
        const r = roleDuProfil(id);
        setRole(r);
        if (r === "eleve") setClasse(id);
        // Une demande rappelée depuis la colonne de gauche (?q=…) repart
        // aussitôt : cliquer dans l'historique doit refaire la recherche, pas
        // seulement remplir le champ.
        const q = new URLSearchParams(window.location.search).get("q");
        if (q) {
          setQuestion(q);
          setResultat(chercher({ quiEsTu: id, question: q, chip: null }));
        } else {
          // Les portes de son niveau, sans avoir rien à taper. Le moteur sait
          // déjà le faire (`repliSurLeNiveau`) ; il refusait simplement de le
          // faire sur un vecteur vide, et l'écran restait blanc sous la barre.
          setResultat(chercher({ quiEsTu: id, question: "", chip: null }));
        }
      }
    } catch {
      /* navigation privée : on s'en passe */
    }
  }, []);

  const p = useMemo(() => (profil ? getProfil(profil) : null), [profil]);
  const tutoie = p?.tutoie ?? true;

  // ⭐ Tant que personne n'a répondu à « Qui es-tu ? », on montre TOUTES les
  // matières : la réponse honnête à une question ouverte, c'est tout ce qu'on a.
  const matieres = useMemo(() => matieresDisponibles(profil), [profil]);
  /** La matière derrière le bouton allumé — on affiche des LIBELLÉS, mais c'est
   *  l'identifiant qui sert à filtrer et à choisir la bonne phrase d'invite. */
  const matiereId = useMemo(
    () => matieres.find((m) => m.label === matiereChoisie)?.matiere ?? null,
    [matieres, matiereChoisie],
  );

  // Les chips viennent des ressources réellement publiables pour ce profil ET
  // cette matière — pas d'une liste de fonctionnalités souhaitées.
  const toutesLesChips = useMemo(
    () => chipsDisponibles(profil, matiereId),
    [profil, matiereId],
  );
  /** Terminale + Mathématiques, et le collège pour le concours général. */
  const concours = useMemo(() => afficherConcours(profil, matiereId), [profil, matiereId]);

  // ⭐ LE GUIDE DE SURVIE DE SA CLASSE, EN PASTILLE (07/08, Frédéric : « on n'a
  // pas branché guide de survie dans les chips »). Il sortait déjà sous
  // « Comprendre une notion » et « Préparer un contrôle », mais il fallait
  // savoir qu'il existe pour le trouver.
  //
  // ⚠️ SEULEMENT SI SA CLASSE EN A UN. Le CP, le CE1 et le CE2 n'en ont aucun —
  // ni en maths ni en français — et la pastille n'apparaît donc pas chez eux
  // plutôt que d'ouvrir un sommaire où ils ne trouveront rien à leur niveau.
  const guides = useMemo(() => guidesPour(profil), [profil]);
  const hrefGuide = useMemo(() => urlGuidePour(profil), [profil]);

  // ⭐ LE CAHIER DE VACANCES, EN PASTILLE AUSSI (07/08). Les cahiers font
  // l'essentiel du trafic du site — Google et Bing y déposent la plupart des
  // visiteurs — et ils n'avaient aucune porte depuis l'entrée. Ils viennent
  // seulement d'entrer dans l'inventaire pour le primaire, où cinq d'entre eux
  // existaient en ligne sans être proposés à personne.
  const cahiers = useMemo(() => cahiersPour(profil), [profil]);

  /**
   * Les pastilles qui ne filtrent rien : elles ouvrent une page.
   *
   * ⚠️ Elles PRENNENT LA PLACE de chips, elles ne s'ajoutent pas. Sept
   * pastilles à la suite ne tiennent pas sur une ligne d'ordinateur — mesuré,
   * pas estimé — et une rangée qui déborde annule tout le travail de
   * compactage. On garde donc trois chips quand il y en a trois derrière.
   */
  const raccourcis =
    (concours.length > 0 ? 1 : 0) + (guides.length > 0 ? 1 : 0) + (cahiers.length > 0 ? 1 : 0);

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
    return toutesLesChips.slice(0, Math.max(MINIMUM_CHIPS, CHIPS_VISIBLES - raccourcis));
  }, [toutesLesChips, plusDOptions, raccourcis]);

  /** Combien restent derrière « Plus d'options ». */
  const restantes = toutesLesChips.length - chips.length;

  /** Les actions ÉCRITES du professeur et du chef d'établissement. */
  const actions = useMemo(() => (profil ? actionsPour(profil) : []), [profil]);

  const exemples = useMemo(() => (profil ? exemplesPour(profil) : []), [profil]);

  const lancer = useCallback(
    (texte: string, chipChoisie: string | null, profilForce?: ProfilId) => {
      const quiEsTu = profilForce ?? profil;
      const vecteur = { question: texte.trim(), chip: chipChoisie };

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
        setHistorique((prec) => {
          const suite = [
            {
              question: vecteur.question,
              profil: quiEsTu,
              quand: Date.now(),
              // ⭐ La matière voyage avec la demande : c'est elle qui fait
              // exister les filtres du RÉCENT, dans la colonne de gauche.
              matiere: res.lecture.matiere ?? null,
              niveau: getProfil(quiEsTu).label,
            },
            ...prec.filter((e) => e.question !== vecteur.question),
          ].slice(0, MAX_HISTORIQUE);
          try {
            localStorage.setItem(CLE_HISTORIQUE, JSON.stringify(suite));
            // ⭐ ON PRÉVIENT LA COLONNE. Elle lisait localStorage une seule
            // fois, à son montage : la demande qu'on venait de poser n'entrait
            // dans le RÉCENT qu'au changement de page suivant. `storage` ne
            // suffit pas : il ne se déclenche QUE dans les autres onglets,
            // jamais dans celui qui écrit.
            window.dispatchEvent(new Event(EVENEMENT_HISTORIQUE));
          } catch {
            /* tant pis */
          }
          return suite;
        });
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
    [profil, variante],
  );

  /** Retenir qui l'on est — et prévenir la page, qui se range là-dessus. */
  const memoriser = useCallback(
    (id: ProfilId) => {
      try {
        localStorage.setItem(CLE_PROFIL, id);
      } catch {
        /* tant pis */
      }
      track("ia_profil", { profil: id, ou: variante });
      onProfil?.(id);
    },
    [onProfil, variante],
  );

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
        lancer(question, null, classe);
      } else {
        // La rangée des classes vient de s'ouvrir — c'est elle, la réponse
        // attendue. On n'affiche rien tant qu'elle n'est pas remplie.
        setResultat(null);
      }
      return;
    }

    memoriser(id);
    lancer(question, null, id);
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
    memoriser(id);
    lancer(question, null, id);
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
  const bouton = (actif: boolean) =>
    surAccueil
      ? actif
        ? "border-2 border-[#1d1c16] bg-[#1d1c16] text-[#f5fafb]"
        : "border-2 border-[#1d1c16]/40 bg-white/70 text-[#1d1c16] hover:border-[#1d1c16]"
      : actif
        ? "border border-teal-700 bg-teal-700 text-white"
        : "border border-slate-300 bg-white text-slate-700 hover:border-slate-500";

  return (
    <section
      aria-label="Que veux-tu faire aujourd'hui ?"
      className={
        surAccueil
          ? "mx-auto mb-4 w-full min-w-0 max-w-6xl border-2 border-[#1d1c16] bg-white/60 px-4 py-4 sm:px-6"
          : ""
      }
    >
      {/* ── 1. Qui es-tu ? ──────────────────────────────────────────────── */}
      <Etape intitule="Qui es-tu ?" surAccueil={surAccueil}>
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

      {/* ── 2. Ta classe ────────────────────────────────────────────────── */}
      {role === "eleve" && (
        <Etape intitule="Ta classe" surAccueil={surAccueil}>
          <div className="rangee-defilante gap-1 sm:gap-1.5" role="group" aria-label="Ta classe">
            {CLASSES.map((c) => {
              const actif = classe === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => choisirClasse(c.id)}
                  aria-pressed={actif}
                  // px-2.5 et non px-3 : douze pastilles doivent tenir sur une
                  // ligne d'ordinateur, et ce sont ces 12 px qui manquaient.
                  className={`rounded-full px-2.5 py-1.5 text-[13px] transition ${bouton(actif)}`}
                >
                  {c.label}
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
                        ? "bg-teal-700 text-white"
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
          est, en dessous ce qu'on CHERCHE. */}
      <div
        className={`mt-6 border-t pt-6 ${
          surAccueil ? "border-[#1d1c16]/12" : "border-slate-200"
        }`}
      >
        <p
          className={`mb-2.5 text-center text-[13px] font-medium ${
            surAccueil ? "text-[#1d1c16]/70" : "text-slate-500"
          }`}
        >
          {tutoie ? "Que veux-tu faire aujourd'hui ?" : "Que voulez-vous faire aujourd'hui ?"}
        </p>

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
                href={urlAction(a, { matiere: matiereId })}
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

            {/* ⭐ CONCOURS À VENIR — Terminale + Mathématiques, et rien d'autre.
                Une pastille, pas une carte : elle ouvre `/concours-avenir`, qui
                existe depuis des mois avec ses dix épreuves blanches. J'avais
                écrit une page `/concours` pour porter les dates — Frédéric l'a
                écartée le 07/08, et il a raison : deux pages pour un concours,
                c'est celle qui a le contenu qu'on finit par ne plus mettre à
                jour.
                S'il ne reste aucun concours ouvert, `afficherConcours` renvoie
                une liste vide et cette pastille n'existe pas — pas de rubrique
                vide. */}
            {concours.length > 0 && (
              <Link
                href={`${concours[0].href}?from=ia`}
                prefetch={false}
                onClick={() => track("ia_concours", { profil: profil ?? "inconnu" })}
                className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition ${
                  surAccueil
                    ? "border-2 border-[#a34c07] bg-[#a34c07]/10 text-[#a34c07] hover:bg-[#a34c07]/20"
                    : "border border-amber-500 bg-amber-50 text-amber-900 hover:bg-amber-100"
                }`}
              >
                🏆 Concours
              </Link>
            )}

            {/* ⭐ LE GUIDE DE SURVIE — celui de SA classe quand il n'y en a
                qu'un, le sommaire filtré sur sa classe quand elle en a
                plusieurs (`?niveau=`). Absent au CP, au CE1 et au CE2 : ils
                n'en ont aucun, et une pastille qui mène à dix-neuf cartes dont
                aucune n'est la sienne, c'est pire que pas de pastille. */}
            {guides.length > 0 && (
              <Link
                href={`${hrefGuide}${hrefGuide.includes("?") ? "&" : "?"}from=ia`}
                prefetch={false}
                onClick={() => track("ia_guide", { profil: profil ?? "inconnu" })}
                className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition ${
                  surAccueil
                    ? "border-2 border-[#3f6b0c] bg-[#3f6b0c]/10 text-[#3f6b0c] hover:bg-[#3f6b0c]/20"
                    : "border border-lime-600 bg-lime-50 text-lime-900 hover:bg-lime-100"
                }`}
              >
                🆘 Guide
              </Link>
            )}

            {/* ⭐ LES CAHIERS DE VACANCES — c'est par eux que la plupart des
                visiteurs arrivent sur le site, et ils n'avaient aucune porte
                depuis l'entrée. Un élève en a presque toujours deux : celui
                qu'il finit et celui qui l'attend. On ouvre donc le sommaire
                plutôt que de choisir à sa place s'il révise l'année écoulée ou
                prépare la suivante. */}
            {cahiers.length > 0 && (
              <Link
                href={`${urlCahierPour(profil)}?from=ia`}
                prefetch={false}
                onClick={() => track("ia_cahier", { profil: profil ?? "inconnu" })}
                className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition ${
                  surAccueil
                    ? "border-2 border-[#0e7490]/50 bg-[#0e7490]/10 text-[#0e7490] hover:bg-[#0e7490]/20"
                    : "border border-sky-500 bg-sky-50 text-sky-900 hover:bg-sky-100"
                }`}
              >
                📒 Cahiers
              </Link>
            )}

            {(restantes > 0 || plusDOptions) && (
              <button
                type="button"
                onClick={() => setPlusDOptions((v) => !v)}
                className={`rounded-full px-3 py-1.5 text-[13px] underline underline-offset-2 transition ${
                  surAccueil ? "text-[#1d1c16]/60 hover:text-[#1d1c16]" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {plusDOptions ? "Moins d'options" : `Plus d'options (${restantes})`}
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

      {/* Une barre vide, c'est la page blanche. On souffle trois départs —
          mais seulement tant qu'il n'y a rien d'autre à lire à cet endroit. */}
      {!resultat && !demandeProfil && exemples.length > 0 && (
        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-[#1d1c16]/60">
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
            <p className="mb-2.5 text-center text-xs text-[#1d1c16]/55">
              {question.trim()
                ? "Je n'ai pas bien compris la demande — voici par où "
                : "Par où "}
              {p.tutoie ? "tu peux" : "vous pouvez"} commencer en{" "}
              <span className="text-[#1d1c16]">{p.label}</span>.
            </p>
          ) : (
            <p className="mb-2.5 text-center text-xs text-[#1d1c16]/55">
              Ce que j&apos;ai compris :{" "}
              <span className="text-[#1d1c16]">
                {[
                  p.label,
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
              <p className="mt-2 text-sm text-[#1d1c16]/70">
                C&apos;est noté — c&apos;est comme ça qu&apos;on sait quoi construire ensuite.
                Essaie de le dire autrement, ou choisis une entrée ci-dessus.
              </p>
              {resultat.lecture.motsInconnus.length > 0 && (
                <p className="mt-2 text-xs text-[#1d1c16]/45">
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
                    className={`block h-full border-2 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1d1c16] ${
                      i === 0 ? "border-[#0e7490]" : "border-[#1d1c16]/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-[#1d1c16]">{r.ressource.titre}</p>
                      <span
                        className={`shrink-0 whitespace-nowrap px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          r.ressource.statut === "testee_eleves"
                            ? "bg-[#3f6b0c]/12 text-[#3f6b0c]"
                            : "bg-[#0e7490]/12 text-[#0e7490]"
                        }`}
                      >
                        {r.ressource.statut === "testee_eleves" ? "testée en classe" : "vérifiée"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#1d1c16]/75">{r.ressource.promesse}</p>
                    <p className="mt-1.5 text-xs text-[#1d1c16]/50">
                      {r.ciblee && resultat.lecture.notionLabel ? (
                        <span className="text-[#0e7490]">
                          s&apos;ouvre sur {resultat.lecture.notionLabel} —{" "}
                        </span>
                      ) : null}
                      {r.raison}
                    </p>
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
