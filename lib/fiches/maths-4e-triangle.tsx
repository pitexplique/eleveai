// ─── Fiche de cours : le triangle pour démontrer (4e) ──────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/triangles.bank.ts, notionId triangle_figure).
//
// ⭐ NOTION OUVERTE LE 28/08/2026, et elle a fermé SEPT PUCES DU BO d'un coup —
// le record du chantier de 4e. Ce n'est pas un forçage : la ligne « Triangle »
// du programme porte elle-même la somme des angles, les hauteurs et
// médiatrices, l'inégalité, les cas d'égalité et les triangles semblables en
// SOUS-PUCES D'UN MÊME POINT. La fiche suit ce découpage, elle ne le refait pas.
//
// ⭐⭐ LES CAS D'ÉGALITÉ SONT LA PUCE QUE L'EXTRACTION AUTOMATIQUE DU PDF
// PERDAIT, dans les deux fichiers testés le 27/08 — seule une capture d'écran
// l'a rendue lisible. Elle est bien au programme du cycle 4, et la compétence
// 4e-D-geometrie-12 le confirme en demandant de la relier à la construction.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Tous les nombres
// de la fiche sortent de la banque :
//   triangle_inegalite    → constructible ou non, et l'encadrement du 3e côté
//   triangle_somme_angle  → l'angle manquant, et le triangle impossible
//   triangle_droites      → hauteur / médiatrice / médiane, deux conditions
//   triangle_egalite      → les trois cas, et les trois angles qui n'en sont pas
//   triangle_construire   → l'ordre du protocole, et les données suffisantes
//   triangle_semblable    → la forme sans la taille, et le côté manquant
//   triangle_defi         → égaux ou semblables, l'impossible, l'outil à choisir
//
// ⭐⭐ LE CONTRE-EXEMPLE PORTE LA FICHE. Deux le font :
//   · le triangle PLAT, où l'inégalité devient une égalité — c'est lui qui
//     explique pourquoi l'inégalité est STRICTE ;
//   · les TROIS ANGLES, qui ne sont PAS un cas d'égalité — ils donnent des
//     triangles semblables. Sans ce cas, l'élève croit qu'il y a quatre cas.
//
// ⭐⭐ LE CANVAS `triangle` EST ICI À L'ÉCHELLE 1, ET C'EST MESURÉ. Son SVG est
// enfermé dans un `max-w-[240px]`, et son `viewBox` vaut son champ `size` :
// en posant `size.width` à 222 — la largeur mesurée d'une carte de propriété
// sur un téléphone de 375 px — l'échelle vaut 1 et les libellés sortent à leur
// taille nominale, 13 à 18 px. Un viewBox plus large les rétrécirait d'autant.
// ⚠️ Corollaire : ce canvas n'a PAS de « zone large du coach » où se rattraper.
// Ce qui est illisible ici l'est partout — la banque a été corrigée le même
// jour pour la même raison.
//
// ⛔ LES ANGLES ALTERNES INTERNES NE SONT PAS DANS CETTE FICHE. Le BO en fait
// une puce distincte (4e-D-geometrie-1), encore sans micro. Conséquence
// assumée et écrite dans l'historique : la somme des angles est UTILISÉE ici,
// elle n'est pas encore PROUVÉE.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter du LaTeX. Les
 * libellés À L'INTÉRIEUR du dessin, eux, restent en écriture simple — ils sont
 * tracés en <text> SVG, où le LaTeX s'afficherait en clair.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⚠️ LES LARGEURS SONT CELLES MESURÉES SUR TÉLÉPHONE DE 375 px : 222 px pour
// une carte de propriété, 216 px pour « La formule », 200 px pour un exemple.
const tableau = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" | "formule" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "tableau_donnees",
        display: { compact: true, striped: true },
        size: {
          width: bloc === "exemple" ? 200 : bloc === "formule" ? 216 : 222,
        },
        ...data,
      } as never
    }
  />
);

// ⭐ LE TRIANGLE À L'ÉCHELLE 1. Les points sont posés DANS la boîte du bloc, si
// bien que le viewBox égale la largeur d'affichage. Le format « exemple » est
// le même triangle réduit de 10 % : la figure est identique, seuls les libellés
// deviennent relativement plus gros — ce qui est le bon sens de l'erreur.
const triangleFiche = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" = "carte"
) => {
  const petit = bloc === "exemple";
  return (
    <CanvasRenderer
      figure={
        {
          kind: "triangle",
          points: petit
            ? { A: { x: 25, y: 128 }, B: { x: 177, y: 128 }, C: { x: 94, y: 31 } }
            : { A: { x: 28, y: 142 }, B: { x: 196, y: 142 }, C: { x: 104, y: 34 } },
          display: { showPoints: true, showLabels: true, showSides: true },
          size: petit
            ? { width: 200, height: 155 }
            : { width: 222, height: 172 },
          ...data,
        } as never
      }
    />
  );
};

export const ficheTriangle4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "triangle-figure",
  titre: "Le triangle pour démontrer",
  accroche:
    "En sixième, on dessinait des triangles. En quatrième, on les DÉMONTRE : trois longueurs suffisent-elles à en construire un ? Deux figures qui se ressemblent sont-elles vraiment identiques ? Le triangle devient l'outil qui répond — parce qu'il est la seule figure que trois données bien choisies déterminent complètement.",
  identite: [
    { label: "Les deux contrôles", valeur: "La somme des angles fait 180° · le plus grand côté est plus petit que la somme des deux autres" },
    { label: "Les trois cas d'égalité", valeur: "3 côtés · 2 côtés et l'angle entre eux · 1 côté et ses 2 angles" },
    { label: "Le piège", valeur: "Trois ANGLES ne suffisent pas : ils donnent des triangles semblables" },
  ],
  definition: {
    texte:
      "Deux triangles sont ÉGAUX lorsqu'ils sont superposables : leurs trois côtés et leurs trois angles se correspondent deux à deux. Ils sont SEMBLABLES lorsqu'ils ont seulement la même forme — leurs angles se correspondent, mais l'un peut être un agrandissement de l'autre. ⚠️ Deux triangles égaux sont toujours semblables ; l'inverse est faux, et c'est toute la difficulté de l'année.",
  },
  figure: {
    schema: legende(
      triangleFiche({
        display: { showPoints: true, showLabels: true, showSides: false, showAngles: true },
        angleLabels: { A: "62°", B: "45°", C: "?" },
      }),
      "$62 + 45 = 107$, donc l'angle en C vaut $180 - 107 = 73°$",
    ),
    legende:
      "La somme des trois angles vaut toujours 180°, dans n'importe quel triangle. Deux angles connus suffisent donc à trouver le troisième — et c'est ce qui rend deux angles aussi informatifs que trois.",
  },
  proprietes: [
    {
      titre: "Le plus grand côté est plus petit que la somme des deux autres",
      micros: ["triangle_inegalite"],
      texte:
        "C'est l'inégalité triangulaire, et c'est la même idée que « le chemin le plus court est la ligne droite » : passer par un troisième point rallonge toujours. Avec 3 cm, 5 cm et 9 cm, aucun triangle n'est possible — 9 dépasse 3 + 5. ⚠️ L'égalité est le cas limite : avec 3, 5 et 8, les trois points sont ALIGNÉS et le triangle est plat.",
      schema: legende(
        triangleFiche({
          sideLabels: { AB: "5 cm", CA: "3 cm", BC: "?" },
        }),
        "le troisième côté est entre $5 - 3 = 2$ et $5 + 3 = 8$ cm",
      ),
    },
    {
      titre: "Les trois angles font toujours 180°",
      micros: ["triangle_somme_angle"],
      texte:
        "Dans n'importe quel triangle — grand, aplati, rectangle —, la somme des trois angles vaut exactement 180°. Deux angles connus donnent donc le troisième par soustraction. ⭐ C'est aussi un CONTRÔLE : si un énoncé annonce 70°, 60° et 70°, la somme fait 200° et le triangle n'existe pas.",
      schema: legende(
        triangleFiche({
          display: { showPoints: true, showLabels: true, showSides: false, showAngles: true },
          angleLabels: { A: "35°", B: "80°", C: "65°" },
        }),
        "$35 + 80 + 65 = 180$",
      ),
    },
    {
      titre: "Hauteur, médiatrice, médiane : deux conditions chacune",
      micros: ["triangle_droites"],
      texte:
        "La HAUTEUR issue de C passe par C et coupe [AB] à angle droit. La MÉDIATRICE de [AB] passe par le MILIEU de [AB] et le coupe à angle droit. La MÉDIANE issue de C passe par C et par le milieu de [AB]. ⚠️ Chacune se définit par deux conditions, et c'est en n'en retenant qu'une qu'on les confond.",
      schema: legende(
        triangleFiche({
          display: { showPoints: true, showLabels: true, showSides: false },
          height: { fromVertex: "C", label: "hauteur", baseLabel: "[AB]" },
        }),
        "elle part du SOMMET, et le petit carré marque l'angle droit",
      ),
    },
    {
      titre: "Trois données bien choisies suffisent",
      micros: ["triangle_egalite"],
      texte:
        "Il n'y a pas besoin de vérifier les six mesures pour affirmer que deux triangles sont égaux : trois suffisent, à condition d'être les bonnes. Il existe exactement TROIS cas, et le programme demande de savoir les nommer.",
      schema: tableau({
        headers: ["ce qu'on connaît", "égaux ?"],
        rows: [
          { values: ["les 3 côtés", "oui"] },
          { values: ["2 côtés + l'angle entre eux", "oui"] },
          { values: ["1 côté + ses 2 angles", "oui"] },
          { values: ["les 3 angles", "NON"] },
        ],
        highlight: { row: 3 },
        caption: "trois cas, et un faux ami",
      }),
    },
    {
      titre: "Trois angles donnent la forme, pas la taille",
      micros: ["triangle_semblable"],
      texte:
        "Deux triangles dont les angles sont deux à deux égaux ont la même FORME : ils sont semblables. Mais rien ne fixe leur taille — l'un peut être dix fois plus grand. Dans deux triangles semblables, tous les côtés sont multipliés par un MÊME nombre, le rapport d'agrandissement.",
      schema: tableau({
        headers: ["petit", "× 3", "grand"],
        rows: [
          { values: ["4 cm", "→", "12 cm"] },
          { values: ["5 cm", "→", "15 cm"] },
          { values: ["7 cm", "→", "21 cm"] },
        ],
        highlight: { col: 1 },
        caption: "le même rapport sur tous les côtés",
      }),
    },
    {
      titre: "Un protocole ne doit rien laisser deviner",
      micros: ["triangle_construire"],
      texte:
        "Écrire un protocole, c'est écrire une suite d'instructions qu'une autre personne peut suivre sans rien inventer. On commence toujours par ce qui se trace SANS RIEN CHERCHER : un segment de longueur donnée. ⭐ Et un bon protocole donne toujours le même triangle — parce que ses données forment un cas d'égalité.",
      schema: tableau({
        headers: ["étape", "on trace"],
        rows: [
          { values: ["1", "[AB] de 6 cm"] },
          { values: ["2", "le cercle de centre A, rayon 4 cm"] },
          { values: ["3", "le cercle de centre B, rayon 5 cm"] },
          { values: ["4", "C à leur intersection"] },
        ],
        highlight: { row: 0 },
        caption: "on part de ce qui ne se cherche pas",
      }),
    },
  ],
  reel: {
    texte:
      "Le triangle est la seule figure indéformable, et c'est pour cela qu'il est partout dans les constructions. Un quadrilatère articulé aux sommets se déforme en losange ; un triangle articulé, non — ses trois côtés fixent ses trois angles, ce qui est exactement le premier cas d'égalité. Les charpentes des cases créoles, les pylônes électriques qui longent la route du littoral, les portiques de chantier et les ponts sont donc découpés en triangles. Les cas d'égalité servent aussi à mesurer sans se déplacer : c'est la triangulation, employée pour cartographier La Réunion au XIXe siècle et pour calculer la hauteur du Piton des Neiges bien avant qu'on puisse s'y poser un instrument. On mesure une base au sol et deux angles, et le troisième côté suit — un côté et ses deux angles, le troisième cas.",
  },
  historique: {
    texte:
      "Les trois cas d'égalité ne sont pas récents : ils occupent les propositions 4, 8 et 26 du premier livre des Éléments d'Euclide, vers 300 avant notre ère, et ils y sont démontrés — pas admis. La somme des angles y est la proposition 32, et Euclide la démontre en traçant une parallèle à un côté par le sommet opposé. Or cette démonstration a besoin du cinquième postulat, celui des parallèles, dont on a longtemps cherché à se passer. On n'y est jamais arrivé, et pour une raison qui a stupéfié les mathématiciens du XIXe siècle : Gauss, Bolyai et Lobatchevski ont montré au début des années 1830 qu'on pouvait bâtir des géométries parfaitement cohérentes où il est FAUX. Sur une sphère, la somme des angles d'un triangle dépasse 180° — un triangle tracé entre le pôle Nord, la côte du Gabon et celle de l'Indonésie a trois angles droits, soit 270°. La propriété qu'on apprend en quatrième n'est donc pas une évidence : c'est une conséquence de la géométrie plane, et elle ne vaut que là.",
  },
  formule: {
    contexte: "Dans n'importe quel triangle ABC",
    expression: "$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180°$",
    legende:
      "La somme des trois angles est constante, et cette constance en fait un outil à double emploi : on l'utilise pour CALCULER un angle manquant, et pour CONTRÔLER qu'un triangle annoncé peut exister. Le second usage est celui qu'on oublie, et c'est celui qui rapporte le plus de points.",
    schema: tableau(
      {
        headers: ["on connaît", "on trouve"],
        rows: [
          { values: ["50° et 60°", "180 − 110 = 70°"] },
          { values: ["90° et 35°", "180 − 125 = 55°"] },
          { values: ["70°, 60° et 70°", "200° : impossible"] },
        ],
        highlight: { row: 2 },
        caption: "calculer, ou contrôler",
      },
      "formule"
    ),
  },
  methode: [
    {
      titre: "Vérifier qu'un triangle est possible",
      micros: ["triangle_inegalite", "triangle_somme_angle"],
      texte:
        "Deux contrôles indépendants, et on applique celui qui correspond aux données. Si l'énoncé donne des CÔTÉS : le plus grand est-il plus petit que la somme des deux autres ? Si l'énoncé donne des ANGLES : leur somme fait-elle 180° ? ⭐ Ces contrôles se font AVANT toute construction et coûtent quelques secondes.",
      schema: tableau({
        headers: ["on me donne", "je vérifie"],
        rows: [
          { values: ["des côtés", "le plus grand < somme des 2 autres"] },
          { values: ["des angles", "la somme fait 180°"] },
        ],
        caption: "les données commandent le contrôle",
      }),
    },
    {
      titre: "Encadrer le troisième côté",
      micros: ["triangle_inegalite"],
      texte:
        "Quand deux côtés sont connus, le troisième est encadré par les DEUX bouts : il est plus petit que leur somme, et plus grand que leur différence. Avec 4 cm et 9 cm, il est entre 5 et 13 cm. ⚠️ Oublier la borne BASSE est l'erreur fréquente — un côté de 1 cm ne referme pas le triangle.",
      schema: legende(
        triangleFiche({
          sideLabels: { AB: "9 cm", CA: "4 cm", BC: "entre 5 et 13" },
        }),
        "$9 - 4 = 5$ et $9 + 4 = 13$",
      ),
    },
    {
      titre: "Reconnaître un cas d'égalité",
      micros: ["triangle_egalite"],
      texte:
        "On regarde ce qui est donné, et on cherche si c'est l'un des trois cas. Puis on écrit la conclusion dans le bon ordre des lettres : si ABC est égal à DEF, alors A correspond à D, B à E, C à F — donc [AB] et [DE] ont la même longueur. ⭐ Trois données suffisent à en déduire les six.",
      schema: tableau({
        headers: ["dans ABC", "dans DEF"],
        rows: [
          { values: ["le côté [AB]", "le côté [DE]"] },
          { values: ["l'angle en A", "l'angle en D"] },
          { values: ["le côté [BC]", "le côté [EF]"] },
        ],
        caption: "l'ordre des lettres fait la correspondance",
      }),
    },
    {
      titre: "Trouver un côté dans deux triangles semblables",
      micros: ["triangle_semblable"],
      texte:
        "On cherche d'abord le RAPPORT, avec le seul couple de côtés dont on connaît les deux valeurs : on divise le grand par le petit. Puis on applique ce rapport à l'autre côté. C'est exactement un agrandissement, donc de la proportionnalité.",
      schema: legende(
        triangleFiche({
          sideLabels: { AB: "6 cm", CA: "4 cm", BC: "" },
        }),
        "si le grand a 18 cm pour 6, le rapport vaut 3 et l'autre côté fait $4 \\times 3 = 12$ cm",
      ),
    },
    {
      titre: "Écrire un protocole de construction",
      micros: ["triangle_construire"],
      texte:
        "On commence par le segment dont on connaît la longueur. Puis, selon les données : deux cercles si on a les trois côtés, un angle reporté au rapporteur si on a deux côtés et l'angle entre eux, deux angles reportés aux extrémités si on a un côté et ses deux angles. ⭐ Le contrôle final est toujours le même : le protocole laisse-t-il un choix ? S'il en laisse un, il ne décrit pas UN triangle.",
      schema: tableau({
        headers: ["données", "outil après le segment"],
        rows: [
          { values: ["3 côtés", "deux cercles"] },
          { values: ["2 côtés + angle", "le rapporteur"] },
          { values: ["1 côté + 2 angles", "le rapporteur, deux fois"] },
        ],
        caption: "chaque cas a son geste",
      }),
    },
    {
      titre: "Choisir la propriété qui démontre",
      micros: ["triangle_defi"],
      texte:
        "Démontrer, c'est choisir la propriété qui s'applique AUX DONNÉES qu'on a. On regarde d'abord ce qui est donné — des côtés, des angles, ou les deux — avant de chercher une propriété. ⭐ Les données commandent l'outil, jamais l'inverse : c'est le geste de la démonstration, et il ne s'apprend qu'en le répétant.",
      schema: tableau({
        headers: ["si on donne", "l'outil"],
        rows: [
          { values: ["3 côtés deux à deux égaux", "un cas d'égalité"] },
          { values: ["2 angles d'un triangle", "la somme à 180°"] },
          { values: ["3 angles deux à deux égaux", "les semblables"] },
          { values: ["3 longueurs seules", "l'inégalité"] },
        ],
        caption: "les données commandent l'outil",
      }),
    },
  ],
  usages: [
    {
      titre: "On me demande si un triangle existe",
      micros: ["triangle_inegalite", "triangle_somme_angle"],
      detail:
        "Deux contrôles : la somme des angles vaut-elle 180° ? le plus grand côté est-il plus petit que la somme des deux autres ? Un seul des deux suffit à conclure à l'impossibilité.",
    },
    {
      titre: "On me demande un angle ou un côté manquant",
      micros: ["triangle_somme_angle", "triangle_semblable"],
      detail:
        "Pour un angle : 180 moins la somme des deux autres. Pour un côté dans un triangle semblable : on trouve le rapport, puis on multiplie.",
    },
    {
      titre: "On me demande de prouver que deux triangles sont égaux",
      micros: ["triangle_egalite", "triangle_defi"],
      detail:
        "On cherche lequel des trois cas s'applique, on l'écrit, et on en déduit les mesures manquantes. ⚠️ Trois angles ne prouvent rien de plus que la ressemblance.",
    },
    {
      titre: "On me demande de construire une figure",
      micros: ["triangle_construire"],
      detail:
        "On vérifie d'abord que la figure est possible, puis on écrit le protocole en commençant par le segment donné. Un protocole qui laisse le choix est à revoir.",
    },
  ],
  exemples: [
    {
      titre: "Le triangle impossible",
      micros: ["triangle_inegalite", "triangle_defi"],
      donnees: "Un élève annonce un triangle de côtés 4 cm, 6 cm et 11 cm.",
      question: "Ce triangle peut-il exister ?",
      schema: tableau(
        {
          headers: ["le plus grand", "les deux autres"],
          rows: [
            { values: ["11 cm", "4 + 6 = 10 cm"] },
            { values: ["11 > 10", "impossible"] },
          ],
          highlight: { row: 1 },
        },
        "exemple"
      ),
      solution:
        "On repère le plus grand côté, 11 cm, et on additionne les deux autres : $4 + 6 = 10$ cm.\n\nOr $11 > 10$ : le plus grand côté dépasse la somme des deux autres. Aucun triangle n'est possible.\n\n⭐ L'image aide à comprendre pourquoi : pour rejoindre les deux extrémités du côté de 11 cm en passant par un troisième point, il faudrait parcourir au moins 11 cm — or les deux autres côtés n'en offrent que 10. Le chemin est trop court, la figure ne se referme pas.",
    },
    {
      titre: "Les trois angles ne suffisent pas",
      micros: ["triangle_egalite", "triangle_semblable"],
      donnees:
        "Deux triangles ont chacun un angle de 40° et un angle de 75°.",
      question: "Sont-ils forcément égaux ?",
      schema: tableau(
        {
          headers: ["ce qui est fixé", "ce qui ne l'est pas"],
          rows: [
            { values: ["la forme", "la taille"] },
            { values: ["→ semblables", "→ pas égaux"] },
          ],
          highlight: { row: 1 },
        },
        "exemple"
      ),
      solution:
        "Le troisième angle se déduit : $40 + 75 = 115$, donc il vaut $180 - 115 = 65°$. Les deux triangles ont bien leurs trois angles deux à deux égaux.\n\nMais cela ne fixe que la FORME. Le premier peut avoir un côté de 3 cm et le second le côté correspondant de 30 cm : ils sont SEMBLABLES, pas égaux.\n\n⭐ Pour conclure à l'égalité, il faudrait une longueur. Si l'on ajoutait « et le côté entre ces deux angles mesure 5 cm dans les deux », on tomberait sur le cas « un côté et ses deux angles » — et cette fois ils seraient égaux.",
    },
    {
      titre: "Le protocole qui ne laisse pas le choix",
      micros: ["triangle_construire", "triangle_egalite"],
      donnees: "On veut construire un triangle ABC avec AB = 6 cm, AC = 4 cm et BC = 5 cm.",
      question: "Écrire le protocole, et dire s'il donne toujours le même triangle.",
      schema: legende(
        triangleFiche(
          {
            sideLabels: { AB: "6 cm", CA: "4 cm", BC: "5 cm" },
          },
          "exemple"
        ),
        "trois côtés : un seul triangle possible",
      ),
      solution:
        "On vérifie d'abord que le triangle existe : le plus grand côté vaut 6, et $4 + 5 = 9 > 6$. C'est possible.\n\nProtocole : tracer le segment [AB] de 6 cm. Tracer le cercle de centre A et de rayon 4 cm, puis le cercle de centre B et de rayon 5 cm. Le point C est à leur intersection.\n\n⭐ Ce protocole donne TOUJOURS le même triangle, parce que les trois côtés forment un cas d'égalité. C'est exactement le lien que le programme demande : les données qui suffisent à construire un seul triangle sont celles des cas d'égalité. Construire et démontrer sont le même savoir vu des deux côtés.",
    },
  ],
  pieges: [
    "Oublier la borne basse de l'inégalité triangulaire. Le troisième côté est plus petit que la somme, mais aussi plus grand que la différence.",
    "Croire que trois angles suffisent à prouver l'égalité. Ils donnent des triangles semblables : même forme, taille libre.",
    "Confondre la hauteur et la médiatrice. Les deux coupent le côté à angle droit, mais la hauteur part d'un SOMMET et la médiatrice d'un MILIEU.",
    "Confondre la hauteur et la médiane. La médiane va au milieu du côté opposé, sans angle droit.",
    "Ne pas contrôler la somme des angles avant de calculer. Un énoncé qui annonce 200° au total est faux, et tout le calcul qui suit l'est aussi.",
    "Écrire l'égalité de deux triangles sans respecter l'ordre des lettres. Dans « ABC égal à DEF », c'est [AB] qui correspond à [DE], pas à [DF].",
    "Appliquer un rapport d'agrandissement à un seul côté. Dans deux triangles semblables, TOUS les côtés sont multipliés par le même nombre.",
  ],
  aRetenir: [
    "La somme des trois angles d'un triangle vaut toujours 180°.",
    "Le plus grand côté est strictement plus petit que la somme des deux autres : c'est l'inégalité triangulaire.",
    "Le troisième côté est encadré par la différence et la somme des deux autres.",
    "Deux triangles sont ÉGAUX s'ils sont superposables, SEMBLABLES s'ils ont seulement la même forme.",
    "Trois cas d'égalité : les 3 côtés ; 2 côtés et l'angle entre eux ; 1 côté et les 2 angles qui le touchent.",
    "Trois angles ne sont PAS un cas d'égalité : ils donnent des triangles semblables.",
    "La hauteur part d'un sommet et coupe le côté opposé à angle droit ; la médiatrice part du milieu ; la médiane va au milieu.",
    "Les données qui suffisent à construire UN SEUL triangle sont exactement celles des cas d'égalité.",
  ],
  entrainement: [
    {
      micros: ["triangle_inegalite"],
      question: "Peut-on construire un triangle de côtés 5 cm, 7 cm et 13 cm ?",
      correction:
        "Non. Le plus grand côté vaut 13, et $5 + 7 = 12$. Comme $13 > 12$, la figure ne se referme pas.",
    },
    {
      micros: ["triangle_inegalite"],
      question: "Deux côtés d'un triangle mesurent 6 cm et 10 cm. Entre quelles valeurs se situe le troisième ?",
      correction:
        "Entre $10 - 6 = 4$ cm et $10 + 6 = 16$ cm. ⚠️ Les deux bornes sont exclues : à 4 ou à 16, le triangle serait plat.",
    },
    {
      micros: ["triangle_somme_angle"],
      question: "Dans un triangle, deux angles mesurent 47° et 68°. Combien mesure le troisième ?",
      correction: "$47 + 68 = 115$, puis $180 - 115 = 65°$.",
    },
    {
      micros: ["triangle_somme_angle"],
      question: "Un élève annonce un triangle dont les angles mesurent 80°, 60° et 50°. Est-ce possible ?",
      correction:
        "Non : $80 + 60 + 50 = 190°$ au lieu de 180. Aucun triangle ne peut avoir ces angles.",
    },
    {
      micros: ["triangle_droites"],
      question: "Dans le triangle ABC, qu'est-ce que la médiatrice de [BC] ? Et la hauteur issue de A ?",
      correction:
        "La médiatrice de [BC] passe par le MILIEU de [BC] et le coupe à angle droit. La hauteur issue de A passe par le SOMMET A et coupe [BC] à angle droit. Elles sont toutes deux perpendiculaires à [BC], et c'est ce point commun qui les fait confondre.",
    },
    {
      micros: ["triangle_egalite"],
      question: "Deux triangles ont deux côtés égaux deux à deux et l'angle compris entre eux égal. Sont-ils égaux ?",
      correction:
        "Oui : c'est le cas « deux côtés et l'angle entre eux ». ⚠️ L'angle doit être ENTRE les deux côtés — s'il est ailleurs, ce n'est plus un cas d'égalité.",
    },
    {
      micros: ["triangle_egalite"],
      question: "Les triangles ABC et DEF sont égaux. Dans ABC, [AB] mesure 7 cm et l'angle en B mesure 52°. Que peut-on dire de DEF ?",
      correction:
        "[DE] mesure 7 cm et l'angle en E mesure 52°. On suit l'ordre des lettres : A correspond à D, B à E, C à F.",
    },
    {
      micros: ["triangle_semblable"],
      question: "Deux triangles sont semblables. Un côté du petit mesure 5 cm et son correspondant dans le grand 20 cm. Un autre côté du petit mesure 7 cm : combien mesure son correspondant ?",
      correction:
        "Le rapport vaut $20 \\div 5 = 4$. Donc le côté cherché mesure $7 \\times 4 = 28$ cm.",
    },
    {
      micros: ["triangle_construire"],
      question: "On veut construire un triangle ABC avec AB = 7 cm, AC = 5 cm et BC = 4 cm. Par quoi commence le protocole ?",
      correction:
        "Par tracer [AB] de 7 cm : c'est ce qui se trace sans rien chercher. Puis le cercle de centre A et de rayon 5 cm, celui de centre B et de rayon 4 cm ; C est à leur intersection.",
    },
    {
      micros: ["triangle_defi"],
      question: "On sait que deux angles d'un triangle mesurent 55° et 65°. Quelle propriété permet de conclure, et que conclut-on ?",
      correction:
        "La somme des angles d'un triangle. $55 + 65 = 120$, donc le troisième angle vaut $180 - 120 = 60°$.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesTriangle4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le triangle pour démontrer - 4e",
    section: {
      type: "objectif",
      phrase: "Trois données bien choisies suffisent",
      sousPhrase:
        "En sixième, on dessinait des triangles. En quatrième, on les démontre : trois longueurs suffisent-elles à en construire un ? Deux figures qui se ressemblent sont-elles vraiment identiques ?",
      encadre: {
        titre: "Les deux contrôles",
        texte:
          "La somme des trois angles vaut 180 degrés. Et le plus grand côté est plus petit que la somme des deux autres.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Le triangle est la seule figure indéformable : ses trois côtés fixent ses trois angles. C'est pourquoi les charpentes, les pylônes de la route du littoral et les ponts sont découpés en triangles. Un quadrilatère articulé se déforme ; un triangle, non.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les trois cas d'égalité sont les propositions 4, 8 et 26 du premier livre d'Euclide, vers trois cents avant notre ère. Et la somme des angles n'y est pas une évidence : sur une sphère, un triangle peut avoir trois angles droits, soit deux cent soixante-dix degrés.",
      },
    },
  },
  {
    titre: "L'inégalité triangulaire",
    badge: "Le premier contrôle",
    section: {
      type: "objectif",
      phrase: "Le chemin le plus court est la ligne droite",
      sousPhrase:
        "Avec des côtés de 4, 6 et 11 centimètres, aucun triangle n'est possible : pour rejoindre les deux bouts du côté de 11 en passant par un troisième point, il faudrait au moins 11 centimètres, et les deux autres côtés n'en offrent que 10.",
      encadre: {
        titre: "Le cas limite",
        texte:
          "Avec 3, 5 et 8, la somme tombe juste : les trois points sont alignés et le triangle est PLAT. C'est pour cela que l'inégalité est stricte.",
      },
    },
  },
  {
    titre: "Les trois cas d'égalité",
    badge: "Ce qu'il faut savoir par cœur",
    section: {
      type: "etapes",
      etapes: [
        "Les TROIS CÔTÉS deux à deux égaux.",
        "DEUX CÔTÉS et l'angle compris ENTRE EUX.",
        "UN CÔTÉ et les DEUX ANGLES qui le touchent.",
        "⚠️ Et le faux ami : trois ANGLES ne suffisent pas.",
        "⭐ Trois données bien choisies permettent d'en déduire les six.",
      ],
    },
  },
  {
    titre: "Égaux, ou seulement semblables ?",
    badge: "Le piège de l'année",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "ÉGAUX",
        contenu:
          "Superposables : mêmes côtés, mêmes angles. Il faut au moins une longueur pour l'affirmer, parce que c'est une longueur qui fixe la taille.",
      },
      droite: {
        variante: "info",
        titre: "SEMBLABLES",
        contenu:
          "Même forme seulement : les angles se correspondent, mais l'un peut être dix fois plus grand. Tous les côtés sont multipliés par un même nombre.",
      },
    },
  },
  {
    titre: "Trois droites qu'on confond",
    badge: "Deux conditions chacune",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "La hauteur issue de A",
          texte:
            "Elle passe par le SOMMET A, et elle coupe le côté opposé à angle droit. Deux conditions.",
        },
        {
          titre: "La médiatrice de [BC]",
          texte:
            "Elle passe par le MILIEU de [BC], et elle le coupe à angle droit. Elle ne passe pas par un sommet.",
        },
        {
          titre: "La médiane issue de A",
          texte:
            "Elle passe par le sommet A et par le MILIEU du côté opposé. Pas d'angle droit ici.",
        },
        {
          titre: "Pourquoi on les confond",
          texte:
            "Parce qu'on ne retient qu'une condition sur deux. Hauteur et médiatrice sont toutes deux perpendiculaires ; hauteur et médiane partent toutes deux d'un sommet.",
        },
      ],
    },
  },
  {
    titre: "Construire, c'est démontrer",
    badge: "Le lien que le programme demande",
    section: {
      type: "objectif",
      phrase: "Un protocole ne doit rien laisser deviner",
      sousPhrase:
        "On commence toujours par ce qui se trace sans rien chercher : un segment de longueur donnée. Puis les cercles, ou le rapporteur, selon les données.",
      encadre: {
        titre: "Le contrôle",
        texte:
          "Le protocole laisse-t-il un choix ? S'il en laisse un, il ne décrit pas UN triangle. Les données qui n'en laissent aucun sont exactement celles des cas d'égalité.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "Deux triangles ont chacun un angle de 40 degrés et un angle de 75 degrés.",
      question: "Sont-ils forcément égaux ?",
      correction:
        "Le troisième angle se déduit : 40 plus 75 font 115, donc il vaut 180 moins 115, soit 65 degrés. Les trois angles sont donc deux à deux égaux. Mais cela ne fixe que la forme : le premier peut avoir un côté de 3 centimètres et le second le côté correspondant de 30. Ils sont semblables, pas égaux. Pour conclure à l'égalité, il faudrait une longueur — par exemple le côté entre ces deux angles, égal dans les deux.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "Un élève annonce un triangle de côtés 5, 7 et 13 centimètres, dont les angles mesurent 80, 60 et 50 degrés.",
      question: "Deux erreurs se cachent dans cet énoncé. Lesquelles ?",
      indice: "Il y a deux contrôles indépendants : un sur les côtés, un sur les angles.",
      correction:
        "Première erreur, sur les côtés : le plus grand vaut 13, et 5 plus 7 font 12. Comme 13 dépasse 12, la figure ne se referme pas. Seconde erreur, sur les angles : 80 plus 60 plus 50 font 190 degrés au lieu de 180. Chacune des deux suffisait à conclure que ce triangle n'existe pas.",
    },
  },
];
