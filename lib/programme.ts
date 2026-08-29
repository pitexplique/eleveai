// lib/programme.ts — config des pages « programme » (/programme/<classe>).
// Le moteur SEO n°2 (après les cahiers), inspiré des pages « skills » d'IXL :
// exposer à Google, en texte, TOUTES les compétences de chaque classe — la
// donnée existe déjà dans les banques tutor-v4 (bo → notions → micros).
//
// Architecture (validée avec Frédéric, 11/07/2026) :
// - la CLASSE est la porte (modèle mental du parent), les matières scolaires
//   (maths, français) y sont listées EN ENTIER ;
// - les langues/IA vivent en niveaux CECRL : la page classe fait le PONT
//   (« niveau visé en 5e : A1 → A2 ») sans dupliquer le contenu (SEO) ;
// - façon IXL : le programme d'un côté ┃ les annexes à côté (calcul rapide,
//   dictée, défis, cahier de la classe).
//
// ⚠️ SERVEUR uniquement (importe les banques via catalog) — ne jamais
// importer depuis un composant client.

import { getKnowledgePack, type Classe } from "@/lib/tutor-v4/catalog";
import { ficheHrefSiExiste } from "@/lib/fiches/registre";

export type ProgrammeClasse = {
  slug: Classe;
  label: string;
  /** « en 6e », « au CP »… pour les phrases naturelles. */
  enClasse: string;
  matieres: ("maths" | "francais")[];
  /** Niveau CECRL visé (attendus Éduscol) — null = pas de bloc langue. */
  anglais: string | null;
  espagnol: string | null;
  /** Référentiel IA maison (A1→C1) — suggestion de départ. */
  ia: string | null;
  /** Slug du cahier de vacances « Vers la/le X » (préparer l'entrée). */
  cahierSlug: string | null;
  calculRapide: boolean;
};

export const PROGRAMME_CLASSES: ProgrammeClasse[] = [
  { slug: "cp",  label: "CP",  enClasse: "au CP",  matieres: ["maths", "francais"], anglais: null, espagnol: null, ia: null, cahierSlug: "vers-le-cp",  calculRapide: false },
  { slug: "ce1", label: "CE1", enClasse: "en CE1", matieres: ["maths", "francais"], anglais: null, espagnol: null, ia: null, cahierSlug: "vers-le-ce1", calculRapide: false },
  { slug: "ce2", label: "CE2", enClasse: "en CE2", matieres: ["maths", "francais"], anglais: null, espagnol: null, ia: null, cahierSlug: "vers-le-ce2", calculRapide: false },
  { slug: "cm1", label: "CM1", enClasse: "en CM1", matieres: ["maths", "francais"], anglais: "découverte → A1", espagnol: null, ia: null, cahierSlug: "vers-le-cm1", calculRapide: true },
  { slug: "cm2", label: "CM2", enClasse: "en CM2", matieres: ["maths", "francais"], anglais: "découverte → A1", espagnol: null, ia: null, cahierSlug: "vers-le-cm2", calculRapide: true },
  /* ⭐ L'ESPAGNOL OUVRE EN 6e (29/08/2026). Frédéric : « espagnol ok 6e car ça
     peut être la première langue ». Ce n'était pas un oubli mais une hypothèse
     fausse — celle de l'espagnol LV2, qui commence en 5e. L'espagnol PEUT être
     la LV1 d'un collégien, et l'était déjà pour les élèves qui arrivent
     hispanophones. Même niveau que l'anglais, pour la même raison. */
  { slug: "6e",  label: "6e",  enClasse: "en 6e",  matieres: ["maths", "francais"], anglais: "A1",       espagnol: "A1",       ia: "A1",   cahierSlug: "vers-la-6e", calculRapide: true },
  { slug: "5e",  label: "5e",  enClasse: "en 5e",  matieres: ["maths", "francais"], anglais: "A1 → A2",  espagnol: "A1",       ia: "A1",   cahierSlug: "vers-la-5e", calculRapide: true },
  { slug: "4e",  label: "4e",  enClasse: "en 4e",  matieres: ["maths", "francais"], anglais: "A2",       espagnol: "A1 → A2",  ia: "A2",   cahierSlug: "vers-la-4e", calculRapide: true },
  { slug: "3e",  label: "3e",  enClasse: "en 3e",  matieres: ["maths", "francais"], anglais: "A2 (B1 pour les plus à l'aise)", espagnol: "A2", ia: "A2", cahierSlug: "vers-la-3e", calculRapide: true },
  // Français ajouté le 18/08/2026 : 16 notions, 96 micros, BO 2019 modifié par
  // le JORF de 2020. C'est la seule classe du lycée qui en a — la 1re et la
  // terminale restent en maths seules tant que leurs banques n'existent pas.
  { slug: "seconde", label: "Seconde", enClasse: "en seconde", matieres: ["maths", "francais"], anglais: "B1", espagnol: "B1", ia: "A2 et plus", cahierSlug: "vers-la-2nde", calculRapide: false },
  { slug: "premiere", label: "Première (sans spé maths)", enClasse: "en première", matieres: ["maths"], anglais: "B1 → B2", espagnol: "B1", ia: "B1 et plus", cahierSlug: "vers-la-premiere", calculRapide: false },
  { slug: "premiere-spe", label: "Première spé maths", enClasse: "en première", matieres: ["maths"], anglais: "B1 → B2", espagnol: "B1", ia: "B1 et plus", cahierSlug: "vers-la-premiere", calculRapide: false },
  { slug: "terminale-spe", label: "Terminale spé maths", enClasse: "en terminale", matieres: ["maths"], anglais: "B1 → B2", espagnol: "B1 → B2", ia: "B1 et plus", cahierSlug: "vers-la-terminale", calculRapide: true },
  // Le cycle terminal de la voie technologique, en une seule classe : le
  // programme est écrit sur deux ans et il est COMMUN à toutes les séries
  // technologiques. Le contenu vaut donc aussi pour ST2S, STL, STI2D et STHR.
  { slug: "stmg", label: "Maths STMG (1re et terminale)", enClasse: "en STMG", matieres: ["maths"], anglais: "B1 → B2", espagnol: "B1", ia: "B1 et plus", cahierSlug: "vers-la-premiere", calculRapide: true },
];

export function getProgrammeClasse(slug: string): ProgrammeClasse | undefined {
  return PROGRAMME_CLASSES.find((c) => c.slug === slug);
}

export type ProgrammeMatiere = {
  matiere: "maths" | "francais";
  label: string;
  coachHref: string;
  nbNotions: number;
  nbMicros: number;
  domaines: {
    boId: string;
    label: string;
    notions: { id: string; label: string; micros: string[] }[];
  }[];
};

/**
 * Les couples classe/matière dont le PROGRAMME est écrit mais dont le COACH ne
 * démarre pas encore. La page continue de lister les compétences — elles sont
 * réelles, c'est le moteur SEO — mais son bouton renvoie vers ce qui marche.
 *
 * ⛔ Le français de 2de, mesuré le 18/08/2026 : 90 de ses 96 micros lèvent
 * « Aucune paire disponible » (un seul item par micro, quand le mode complet en
 * oppose deux). Son parcours, lui, sert ses 16 notions sans un trou.
 * Contrôle : `npx --yes tsx@4 scripts/verifier-demarrage.ts seconde francais`.
 * À vider dès qu'un second item par micro sera écrit.
 */
const COACH_PAS_PRET: Record<string, string> = {
  /* ✅ VIDE DEPUIS LE 18/08/2026. « seconde/francais » y figurait le matin :
     90 de ses 96 micros levaient faute d'un second item. Les 96 seconds items
     ont été écrits, la mesure rend 96/96 en mode complet, le renvoi n'a plus
     lieu d'être. Garder la table : la STMG et la 1re sans spé passeront par là. */
};

// Le programme d'une matière, groupé BO → notions → micro-compétences.
export function getProgrammeMatiere(
  classe: ProgrammeClasse,
  matiere: "maths" | "francais"
): ProgrammeMatiere | null {
  try {
    const pack = getKnowledgePack(classe.slug, matiere);
    const domaines = pack.bo_competences
      .map((bo) => ({
        boId: bo.boId,
        label: bo.label,
        notions: pack.notions
          .filter((n) => n.boId === bo.boId)
          .map((n) => ({
            id: n.id,
            label: n.label,
            micros: pack.microSkills
              .filter((m) => m.notionId === n.id)
              .map((m) => m.label),
          })),
      }))
      .filter((d) => d.notions.length > 0);

    return {
      matiere,
      label: matiere === "maths" ? "Mathématiques" : "Français",
      coachHref:
        COACH_PAS_PRET[`${classe.slug}/${matiere}`] ??
        `/coach-ia/${matiere}?classe=${classe.slug}`,
      nbNotions: pack.notions.length,
      nbMicros: pack.microSkills.length,
      domaines,
    };
  } catch {
    // Banque absente pour ce couple classe/matière : pas de section.
    return null;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ⭐ 29/08/2026 — L'ANGLAIS, L'ESPAGNOL ET L'IA ENTRENT DANS LE PROGRAMME
   ═══════════════════════════════════════════════════════════════════════════

   Frédéric : « pour anglais et espagnol on affiche tout le coach du A1 au B2 il
   peut y avoir des enfants bilingues ! Pour IA on l'affiche pour college et
   lycée ».

   CE QUI MANQUAIT, MESURÉ. Ces trois matières n'existaient sur la page de
   classe que sous forme d'une PASTILLE DE NIVEAU — « Niveau visé : A1 → A2 »,
   et un lien vers le coach. Pas une compétence en texte, donc rien à lire pour
   un moteur : 150 notions et 453 micro-compétences, déjà écrites en banque,
   invisibles. Le moteur SEO tournait pour les maths et le français seulement.

   ⭐ POURQUOI LES QUATRE NIVEAUX, ET PAS LE NIVEAU DE LA CLASSE. C'est la
   décision de Frédéric, et elle ne vient pas du SEO : une langue ne se range
   pas par année. Un enfant bilingue en 5e lit du B2, un autre consolide son A1
   — servir le seul « niveau visé » leur mentirait à tous les deux. Les langues
   sont donc les seules sections de cette page à ignorer la classe.

   ⚠️ L'IA, ELLE, SE RANGE — mais en deux paliers, pas en années : le référentiel
   Pix distingue le collège du lycée, et les banques portent exactement ces deux
   noms. `packIa()` ne fait que lire ce découpage-là ; il n'en invente pas un.
   Le primaire n'a pas de palier Pix, et n'affiche donc rien. */

export type ProgrammeNiveau = {
  /** La clé de banque : « a1 »…« b2 », ou « pix-college » / « pix-lycee ». */
  niveau: string;
  nbNotions: number;
  nbMicros: number;
  notions: { id: string; label: string; micros: string[] }[];
};

export const NIVEAUX_LANGUE = ["a1", "a2", "b1", "b2"] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   ⭐ 29/08/2026, PLUS TARD — LE MOTEUR DES NIVEAUX : DIX PAGES, PAS CENT CINQUANTE
   ═══════════════════════════════════════════════════════════════════════════

   Frédéric : « on peut faire un moteur qui index les notions comme dans
   coach-maths », après avoir constaté deux choses le même jour — que les mêmes
   414 compétences se répétaient sur onze pages de classe, et que
   /coach-ia/english-maths n'offrait rien à indexer.

   ⛔⛔ MAIS PAS UNE PAGE PAR NOTION, ET C'EST LA DIFFÉRENCE AVEC LES MATHS.
   En maths une notion porte dix à vingt micro-compétences : il y a de quoi
   lire, d'où les 442 pages de notion. En anglais « Digits » en porte TROIS.
   Soixante-dix pages de trois lignes, c'est la page mince que Google déclasse
   — la règle qui écarte déjà les notions sans micro, appliquée un cran plus
   haut. Le bon étage ici est LE NIVEAU : `anglais/a1` réunit 19 notions et 57
   compétences, et c'est aussi la requête qu'on tape.

   ⭐ CE QUE ÇA RÈGLE EN MÊME TEMPS. La page de classe rendait ces 414
   compétences en entier, à l'identique sur onze pages, et /programme/5e
   mesurait 98 000 pixels de haut pour 40 % de trafic mobile. Elle ne garde
   maintenant que ses pastilles de niveau, chacune LIÉE à sa page. Le contenu
   ne disparaît pas : il déménage là où il est unique. */

export type MatiereHorsClasse = "anglais" | "espagnol" | "ia";

/** Le segment d'URL → la matière telle qu'elle vit dans les banques. */
export const BANQUE_HORS_CLASSE: Record<MatiereHorsClasse, "english-maths" | "espagnol" | "ia"> = {
  anglais: "english-maths",
  espagnol: "espagnol",
  ia: "ia",
};

/** Les niveaux publiés pour chaque matière — l'ordre est celui de la page. */
export const NIVEAUX_HORS_CLASSE: Record<MatiereHorsClasse, readonly string[]> = {
  anglais: ["a1", "a2", "b1", "b2"],
  espagnol: ["a1", "a2", "b1", "b2"],
  ia: ["college", "lycee"],
};

/* ⚠️ L'IA A DEUX NOMS, ET IL FAUT LES DEUX. Les banques s'appellent
   `pix-college` et `pix-lycee` ; l'URL, elle, dit `college` et `lycee` — le
   préfixe Pix n'apprend rien à un lecteur et alourdit l'adresse. Cette table
   est le seul endroit où la traduction a lieu. */
const BANQUE_NIVEAU: Record<string, string> = {
  college: "pix-college",
  lycee: "pix-lycee",
};

export const bankeNiveau = (niveau: string) => BANQUE_NIVEAU[niveau] ?? niveau;

export const LABEL_MATIERE_HORS_CLASSE: Record<MatiereHorsClasse, string> = {
  anglais: "Anglais",
  espagnol: "Espagnol",
  ia: "Culture IA",
};

export const LABEL_NIVEAU_LANGUE: Record<string, string> = {
  a1: "A1 — débutant",
  a2: "A2 — élémentaire",
  b1: "B1 — intermédiaire",
  b2: "B2 — avancé",
  college: "Collège",
  lycee: "Lycée",
  "pix-college": "Collège",
  "pix-lycee": "Lycée",
};

/** Le pack d'un couple matière/niveau, en passant par les deux traductions. */
export function getNiveauHorsClasse(
  matiere: MatiereHorsClasse,
  niveau: string
): ProgrammeNiveau | null {
  if (!NIVEAUX_HORS_CLASSE[matiere].includes(niveau)) return null;
  return getProgrammeNiveau(BANQUE_HORS_CLASSE[matiere], bankeNiveau(niveau));
}

/** Les dix couples publiés — c'est ce que lisent le sitemap et les routes. */
export function listerNiveauxHorsClasse(): {
  matiere: MatiereHorsClasse;
  niveau: string;
}[] {
  const out: { matiere: MatiereHorsClasse; niveau: string }[] = [];
  for (const matiere of Object.keys(NIVEAUX_HORS_CLASSE) as MatiereHorsClasse[]) {
    for (const niveau of NIVEAUX_HORS_CLASSE[matiere]) {
      if (getNiveauHorsClasse(matiere, niveau)) out.push({ matiere, niveau });
    }
  }
  return out;
}

/**
 * Le palier Pix d'une classe, ou `null` quand la question ne se pose pas.
 * ⛔ NE PAS REMPLACER PAR `classe.ia !== null` : ce champ dit à quel niveau
 * l'IA COMMENCE, il ne dit pas quelle banque servir. Les deux banques d'IA
 * s'appellent « pix-college » et « pix-lycee », et c'est tout le découpage.
 */
export function packIa(classeSlug: string): "pix-college" | "pix-lycee" | null {
  if (["6e", "5e", "4e", "3e"].includes(classeSlug)) return "pix-college";
  if (["seconde", "premiere", "premiere-spe", "terminale-spe", "stmg"].includes(classeSlug))
    return "pix-lycee";
  return null;
}

/**
 * Les compétences d'une banque qui n'est PAS rangée par classe : les langues
 * (par niveau CECRL) et l'IA (par palier Pix). Les notions sont rendues à plat
 * — pour ces banques le domaine et la notion se confondent presque toujours
 * (19 domaines pour 19 notions en anglais A1), et un étage de titres vides
 * n'apporterait rien à lire.
 */
export function getProgrammeNiveau(
  matiere: "english-maths" | "espagnol" | "ia",
  niveau: string
): ProgrammeNiveau | null {
  try {
    const pack = getKnowledgePack(niveau as never, matiere as never);
    const notions = pack.notions.map((n) => ({
      id: n.id,
      label: n.label,
      micros: pack.microSkills
        .filter((m) => m.notionId === n.id)
        .map((m) => m.label),
    }));
    if (notions.length === 0) return null;
    return {
      niveau,
      nbNotions: notions.length,
      nbMicros: pack.microSkills.length,
      notions,
    };
  } catch {
    // Banque absente : pas de bloc. Même règle que pour maths/français.
    return null;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ⭐ 26/08/2026 — L'ÉTAGE DE LA NOTION, ET SON GÉNÉRATEUR UNIQUE
   ═══════════════════════════════════════════════════════════════════════════

   Frédéric : « il faut créer un moteur classe / matière / notion / libellé
   micro et coach ou parcours ou fiches de cours », puis « par rapport à
   Kartable on pourrait inclure les libellés des micro-compétences et là on les
   dépasse ».

   CE QUI MANQUAIT, MESURÉ. Les 3 126 libellés de micros sont déjà publiés en
   texte — mais tous sur 12 pages seulement, une par classe. `/programme/4e`
   en porte 205 d'un coup. C'est le même défaut que les fiches avaient le matin
   même : un sommaire géant, et rien entre lui et la notion. La requête d'un
   élève ne porte pas sur « le programme de 4e », elle porte sur « calculer une
   longueur avec Pythagore ».

   ⛔ CE N'EST PAS UN RETOUR DES ADRESSES À « ? » (retirées le 10/08, voir la
   note dans app/sitemap.ts). Celles-là étaient des DOUBLONS : le coach est
   rendu côté client, le paramètre ne changeait pas une ligne de ce que le
   robot lit, et la page déclarait sa canonique sans paramètre. Ici on crée de
   VRAIES pages, rendues côté serveur, avec chacune son texte et sa canonique.

   ⭐ ET UNE PAGE DE NOTION NE CONCURRENCE JAMAIS UNE FICHE. C'est la décision
   du 26/08, confirmée par Frédéric : là où une fiche de cours existe, c'est
   ELLE la page de la notion — la page de programme se contente de rediriger
   vers elle. Deux pages sur « Thalès 4e » se cannibaliseraient, et Google en
   choisirait une au hasard.
   ✅ Conséquence gratuite, et c'est tout l'intérêt de passer par le registre :
   le jour où une fiche est écrite, la page de programme correspondante cesse
   d'exister d'elle-même et son adresse redirige vers la fiche. Rien à retirer
   du sitemap, rien à supprimer. Une ligne au registre, et l'étage se réorganise
   tout seul. */


export type NotionProgramme = {
  classeSlug: string;
  classeLabel: string;
  enClasse: string;
  matiere: "maths" | "francais";
  matiereLabel: string;
  /** L'identifiant du coach (underscores), tel qu'il vit dans les banques. */
  notionId: string;
  /** Le même, en slug d'URL (tirets) — la règle d'or partagée avec les fiches. */
  notionSlug: string;
  label: string;
  micros: string[];
  /** Le domaine du BO qui porte la notion : le contexte, en une ligne. */
  boLabel: string;
  coachHref: string;
  parcoursHref: string;
  /** Non nul ⇒ CETTE PAGE N'EXISTE PAS, elle redirige vers la fiche. */
  ficheHref: string | null;
};

const slugNotion = (id: string) => id.replace(/_/g, "-");

const PARCOURS_HREF: Record<"maths" | "francais", string> = {
  maths: "/parcours",
  francais: "/parcours-francais",
};

/** TOUTES les notions du programme, fiche comprise — la source unique. */
export function listerToutesLesNotions(): NotionProgramme[] {
  const out: NotionProgramme[] = [];
  for (const classe of PROGRAMME_CLASSES) {
    for (const matiere of classe.matieres) {
      const p = getProgrammeMatiere(classe, matiere);
      if (!p) continue;
      for (const d of p.domaines) {
        for (const n of d.notions) {
          out.push({
            classeSlug: classe.slug,
            classeLabel: classe.label,
            enClasse: classe.enClasse,
            matiere,
            matiereLabel: p.label,
            notionId: n.id,
            notionSlug: slugNotion(n.id),
            label: n.label,
            micros: n.micros,
            boLabel: d.label,
            coachHref: p.coachHref,
            parcoursHref: PARCOURS_HREF[matiere],
            ficheHref: ficheHrefSiExiste(matiere, classe.slug, slugNotion(n.id)),
          });
        }
      }
    }
  }
  return out;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ⛔⛔ 29/08/2026 — CE QUI SORT LES 444 NOTIONS DE LEUR ÎLE
   ═══════════════════════════════════════════════════════════════════════════

   Mesuré ce jour-là : les pages de notion se liaient ENTRE ELLES (les voisines
   du même domaine du BO) et remontaient vers leur page de classe — mais rien du
   site n'y descendait. `/programme/<classe>` affichait le libellé de chaque
   notion en texte mort. Le seul lien entrant du site vers les 444 adresses
   n'existait pas : seul le sitemap les annonçait.

   ⛔ ET UNE PAGE QUE SEUL LE SITEMAP ANNONCE EST CRAWLÉE TARD ET CLASSÉE BAS.
   Elle n'hérite d'aucune autorité interne, faute d'un lien qui lui en
   transmette. Déclarer n'est pas relier.

   ⚠️ LE LIEN NE MÈNE PAS TOUJOURS À UNE PAGE DE PROGRAMME, et c'est voulu : là
   où une fiche existe, c'est ELLE la page de la notion (décision du 26/08) et
   la page de programme ne fait que rediriger. On pointe donc directement sur la
   fiche — un lien de moins à suivre pour le robot, et pas une redirection
   annoncée dans le corps du site.

   ⛔ UNE NOTION SANS FICHE ET SANS MICRO N'EST PAS LIÉE. Elle n'a pas de page :
   `listerNotionsAvecPage` l'écarte, `generateStaticParams` ne la pré-rend pas.
   La lier fabriquerait un lien vers une page mince servie à la demande — très
   exactement ce que le filtre existe pour éviter. */
export function liensNotionsDeLaClasse(classeSlug: string): Map<string, string> {
  const liens = new Map<string, string>();
  for (const n of listerToutesLesNotions()) {
    if (n.classeSlug !== classeSlug) continue;
    if (n.ficheHref) {
      liens.set(`${n.matiere}/${n.notionId}`, n.ficheHref);
    } else if (n.micros.length > 0) {
      liens.set(
        `${n.matiere}/${n.notionId}`,
        `/programme/${n.classeSlug}/${n.matiere}/${n.notionSlug}`
      );
    }
  }
  return liens;
}

/** Celles qui MÉRITENT une page : sans fiche, et avec au moins un micro à lire.
 *  ⛔ LE FILTRE SUR LES MICROS N'EST PAS COSMÉTIQUE. Une notion sans micro
 *  donnerait une page sans une phrase à lire — exactement la page mince que
 *  Google déclasse, et qu'on se refuse depuis la règle des sommaires vides. */
export function listerNotionsAvecPage(): NotionProgramme[] {
  return listerToutesLesNotions().filter(
    (n) => !n.ficheHref && n.micros.length > 0
  );
}

/** Une notion précise, depuis les segments de l'URL. */
export function getNotionProgramme(
  classeSlug: string,
  matiere: string,
  notionSlug: string
): NotionProgramme | null {
  if (matiere !== "maths" && matiere !== "francais") return null;
  return (
    listerToutesLesNotions().find(
      (n) =>
        n.classeSlug === classeSlug &&
        n.matiere === matiere &&
        n.notionSlug === notionSlug
    ) ?? null
  );
}
