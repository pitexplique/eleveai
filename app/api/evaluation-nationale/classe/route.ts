// LA CLASSE VUE PAR SON PRINCIPAL — évaluation nationale du collège.
//
// POURQUOI UNE ROUTE À PART, et pas /api/dashboard (11/08/2026). Le dashboard
// interroge onze tables pour tout un établissement et ne lit PAS les colonnes
// `details` à cette échelle — « trop lourd », dit son propre commentaire. Or
// ici, `details` est justement tout ce qui compte : c'est lui qui porte les
// groupes de maîtrise par domaine et par test spécifique. Une route étroite —
// une classe, une matière — peut se permettre de les lire.
//
// CE QU'ELLE REND, et c'est le point : LES TRENTE ÉLÈVES, pas seulement ceux
// qui ont passé l'épreuve. Un principal qui ouvre sa liste trois jours avant
// la rentrée a besoin de voir les absents autant que les résultats. Une vue
// qui ne montrerait que les passages laisserait croire la classe complète.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { verifySessionToken } from "@/lib/server/session";

// La route lit un cookie : elle ne peut pas être mise en cache.
export const dynamic = "force-dynamic";

/** Seuls ces rôles voient l'établissement entier. Un élève ne voit que lui. */
const ROLES_ETABLISSEMENT = new Set(["prof", "principal", "boss"]);

const CLASSES = new Set(["6e", "4e"]);
const MATIERES = new Set(["maths", "francais"]);

/**
 * LE GROUPE CLASSE SE LIT SUR LE CODE, faute de colonne pour le porter.
 *
 * `acces_etablissement.classe` ne connaît que le NIVEAU — '6e', '4e' — et sa
 * contrainte SQL n'accepte rien d'autre. Or un collège n'a pas « une 6ᵉ » : il
 * a une 6ᵉ A, une 6ᵉ B, une 6ᵉ C. Constaté à Dimitile le 11/08 en découvrant
 * que la vraie 6ᵉ C (codes 6C00…6C19) et la classe de démonstration
 * (6ETEST-01…30) s'affichaient d'un seul bloc de cinquante élèves. Un
 * principal ne peut rien faire d'un tel tas.
 *
 * La convention est celle du collège lui-même : un préfixe, puis un numéro.
 * `6C07` → « 6C » ; `6ETEST-12` → « 6ETEST ».
 *
 * ⚠️ CE N'EST QU'UN DÉPANNAGE. La vraie correction est une colonne `groupe`
 * dans `acces_etablissement` — voir [[association-prof-eleves-chantier]]. Tant
 * qu'elle n'existe pas, un établissement qui nommerait ses codes autrement
 * (« ELEVE-0001 ») verrait tous ses élèves dans un même groupe. Ce n'est pas
 * faux, c'est seulement inutile — et ça ne casse rien.
 */
function groupeDuCode(code: string): string {
  const m = code.match(/^(.*?)[-_ ]?\d+$/);
  const prefixe = (m?.[1] ?? "").trim();
  return prefixe || code;
}

export type EleveDeLaClasse = {
  codeUtilisateur: string;
  /** Le groupe classe déduit du code : « 6C », « 6ETEST »… */
  groupe: string;
  nom: string | null;
  /** null = l'élève n'a pas encore passé l'épreuve. */
  resultat: {
    score: number;
    total: number;
    groupe: string | null;
    dureeSec: number | null;
    chronoEcoule: boolean;
    /** true quand la ligne vient du jeu de démonstration. */
    simule: boolean;
    domaines: BlocBilan[];
    tests: BlocBilan[];
    micros: MicroBilan[];
    passeLe: string;
  } | null;
};

type BlocBilan = {
  id: string;
  label: string;
  justes: number;
  total: number;
  groupe: string;
};

type MicroBilan = {
  microId: string;
  microLabel: string;
  notionLabel: string;
  reussi: boolean;
};

function micros(source: unknown): MicroBilan[] {
  if (!Array.isArray(source)) return [];
  return source.flatMap((m) => {
    if (!m || typeof m !== "object") return [];
    const o = m as Record<string, unknown>;
    if (typeof o.microId !== "string") return [];
    return [
      {
        microId: o.microId,
        microLabel: String(o.microLabel ?? o.microId),
        notionLabel: String(o.notionLabel ?? ""),
        reussi: o.reussi === true,
      },
    ];
  });
}

function blocs(source: unknown): BlocBilan[] {
  if (!Array.isArray(source)) return [];
  return source.flatMap((b) => {
    if (!b || typeof b !== "object") return [];
    const o = b as Record<string, unknown>;
    if (typeof o.label !== "string") return [];
    return [
      {
        id: String(o.id ?? ""),
        label: o.label,
        justes: Number(o.justes ?? 0),
        total: Number(o.total ?? 0),
        groupe: String(o.groupe ?? "a_besoins"),
      },
    ];
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const classe = url.searchParams.get("classe") ?? "6e";
  const matiere = url.searchParams.get("matiere") ?? "maths";
  if (!CLASSES.has(classe) || !MATIERES.has(matiere)) {
    return NextResponse.json(
      { ok: false, error: "Classe ou matière inconnue." },
      { status: 400 },
    );
  }

  // ── QUI DEMANDE, ET SUR QUEL ÉTABLISSEMENT ──────────────────────────────
  // DEUX PORTES, ET ELLES NE DONNENT PAS SUR LA MÊME CHOSE.
  //
  //  • Le cookie admin (Frédéric) ouvre TOUS les établissements, mais il faut
  //    en désigner un : `?etab=`. Sans lui, on rend la liste de ceux qui ont
  //    des résultats, pour qu'il choisisse — plutôt qu'une erreur, ou pire,
  //    un mélange de plusieurs collèges dans un même tableau.
  //  • Le jeton de session (M. Pelka, ses professeurs) n'ouvre QUE son
  //    établissement, et `?etab=` y est ignoré. C'est le point de sécurité de
  //    la route : un principal ne doit pas pouvoir lire le collège voisin en
  //    changeant un paramètre d'URL.
  const cookieStore = await cookies();
  const estAdmin = verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  let codeEtablissement: string;

  if (estAdmin) {
    const demande = (url.searchParams.get("etab") ?? "").trim();
    if (!demande) {
      // Les établissements qui ont au moins un passage — inutile d'en
      // proposer un dont la liste serait vide.
      const { data } = await supabaseAdmin
        .from("resultats_evaluation_nationale")
        .select("code_etablissement")
        .eq("classe", classe)
        .eq("matiere", matiere);
      const etablissements = [
        ...new Set(
          (data ?? []).map((r) =>
            String((r as Record<string, unknown>).code_etablissement ?? ""),
          ),
        ),
      ]
        .filter(Boolean)
        .sort();
      return NextResponse.json({
        ok: true,
        admin: true,
        choisirEtablissement: true,
        etablissements,
        classe,
        matiere,
      });
    }
    codeEtablissement = demande;
  } else {
    const auth = req.headers.get("authorization") ?? "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    const session = verifySessionToken(token);
    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Session expirée. Reconnectez-vous." },
        { status: 401 },
      );
    }
    if (!ROLES_ETABLISSEMENT.has(session.type_utilisateur)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Cette vue est réservée aux professeurs et à la direction.",
        },
        { status: 403 },
      );
    }
    // ⛔ JAMAIS `?etab=` ICI. C'est la session qui décide, pas l'URL.
    codeEtablissement = session.code_etablissement;
  }

  const [comptesRes, resultatsRes] = await Promise.all([
    supabaseAdmin
      .from("acces_etablissement")
      .select("code_utilisateur, nom, classe, actif")
      .eq("code_etablissement", codeEtablissement)
      .eq("classe", classe)
      .eq("type_utilisateur", "eleve")
      .eq("actif", true)
      .order("nom"),
    supabaseAdmin
      .from("resultats_evaluation_nationale")
      .select(
        "code_utilisateur, nom, score, total, duree_sec, chrono_ecoule, details, created_at",
      )
      .eq("code_etablissement", codeEtablissement)
      .eq("classe", classe)
      .eq("matiere", matiere)
      .order("created_at", { ascending: false }),
  ]);

  if (comptesRes.error || resultatsRes.error) {
    return NextResponse.json(
      { ok: false, error: "Lecture impossible. Réessayez." },
      { status: 500 },
    );
  }

  // ON GARDE LE PLUS RÉCENT PASSAGE, pas le meilleur. L'épreuve peut se
  // repasser ; ce qui intéresse à la rentrée, c'est où en est l'élève
  // aujourd'hui — pas son meilleur jour. Les lignes arrivent déjà triées du
  // plus récent au plus ancien, le premier vu gagne.
  const dernier = new Map<string, Record<string, unknown>>();
  for (const r of resultatsRes.data ?? []) {
    const row = r as Record<string, unknown>;
    const code = String(row.code_utilisateur ?? "");
    if (!dernier.has(code)) dernier.set(code, row);
  }

  const eleves: EleveDeLaClasse[] = (comptesRes.data ?? []).map((c) => {
    const compte = c as Record<string, unknown>;
    const code = String(compte.code_utilisateur ?? "");
    const r = dernier.get(code);
    if (!r) {
      return {
        codeUtilisateur: code,
        groupe: groupeDuCode(code),
        nom: (compte.nom as string) ?? null,
        resultat: null,
      };
    }

    const details = (r.details ?? {}) as Record<string, unknown>;
    return {
      codeUtilisateur: code,
      groupe: groupeDuCode(code),
      nom: ((compte.nom as string) ?? (r.nom as string)) ?? null,
      resultat: {
        score: Number(r.score ?? 0),
        total: Number(r.total ?? 0),
        groupe: (details.groupe as string) ?? null,
        dureeSec: r.duree_sec === null ? null : Number(r.duree_sec),
        chronoEcoule: Boolean(r.chrono_ecoule),
        simule: details.simule === true,
        domaines: blocs(details.themes),
        tests: blocs(details.tests),
        micros: micros(details.micros),
        passeLe: String(r.created_at ?? ""),
      },
    };
  });

  return NextResponse.json({
    ok: true,
    admin: estAdmin,
    etablissement: codeEtablissement,
    classe,
    matiere,
    // Les groupes présents, pour que la page propose un choix plutôt qu'un
    // tas. Triés : « 6A » avant « 6B », et la démo se range d'elle-même.
    groupes: [...new Set(eleves.map((e) => e.groupe))].sort(),
    eleves,
    // ⚠️ SIGNALÉ, PAS MASQUÉ. Si une seule ligne de démonstration traîne, le
    // principal doit le savoir avant de lire la répartition — sinon il prend
    // des élèves inventés pour les siens.
    contientDesSimulations: eleves.some((e) => e.resultat?.simule),
  });
}
