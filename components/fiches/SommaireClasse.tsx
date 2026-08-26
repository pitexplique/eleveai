import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Download,
  FileText,
  MessageCircle,
} from "lucide-react";
import { listerFiches, libelleClasse } from "@/lib/fiches/registre";

// ─── Le sommaire d'UNE classe dans UNE matière ────────────────────────────────
//
// ⭐ 26/08/2026 — POURQUOI CETTE PAGE EXISTE.
// Les dossiers `app/fiches-cours/<matiere>/<classe>/` ne contenaient que des
// dossiers de NOTION : `/fiches-cours/maths/4e` renvoyait 404. Faute de cette
// page, les cartes de `lib/matrice/ressources.ts` pointaient toutes sur le
// sommaire TOUTES CLASSES (`/fiches-cours/maths`) — un élève de 4e qui cliquait
// « Maths — cours et exercices corrigés » atterrissait devant les 82 fiches du
// CM2 à la 1re et devait chercher les siennes. C'est ce trajet-là qu'on ferme.
//
// ⚠️ MÊME SOURCE DE VÉRITÉ QUE LES DEUX SOMMAIRES DE MATIÈRE : `listerFiches()`
// relit `FICHES_REGISTRE`. Une fiche ajoutée au registre apparaît ici toute
// seule. ⛔ Ne JAMAIS écrire une liste de notions en dur dans une page de
// classe : ce serait la deuxième liste à maintenir, et c'est exactement ce que
// le registre a été écrit pour éviter.
//
// ⛔ ET PAS DE PAGE POUR UNE CLASSE VIDE : `notFound()` si le registre ne
// connaît aucune fiche. Une page de classe qui s'ouvre sur zéro fiche est pire
// qu'un 404 — le 404 dit « pas encore », la page vide dit « on t'a menti ».

// ⭐ 26/08/2026 — « LE NIVEAU » N'EST PAS TOUJOURS UNE CLASSE (Frédéric) :
// « les fiches existent en IA mais pas par classe, mais par niveau ». En maths
// et en français, le second segment de l'URL est une CLASSE (4e, cm2…) ; en IA
// c'est un DOMAINE Pix (fondements, usages, enjeux), et les 16 fiches ne se
// rangent par aucune année. Le registre le savait déjà — `ORDRE_CLASSES` y
// range « fondements, usages, enjeux » à la suite des classes, sous le
// commentaire « IA : par thème ».
// ⛔ D'où le mot `niveau` dans ce fichier, et pas `classe` : c'est ce que le
// segment porte VRAIMENT. Les deux cas se rendent avec la même page parce
// qu'ils posent la même question — « donne-moi les fiches de CE groupe-là,
// et rien d'autre ».
type Matiere = "maths" | "francais" | "ia";

// ⚠️ CLASSES TAILWIND ÉCRITES EN ENTIER, JAMAIS CONCATÉNÉES. Tailwind lit le
// source en texte : `bg-${accent}-50` ne produirait aucune règle CSS.
const ACCENTS: Record<
  Matiere,
  {
    nom: string;
    banniere: string;
    pastille: string;
    pastilleNiveau: string;
    encart: string;
    icone: string;
    bouton: string;
    carte: string;
    lien: string;
  }
> = {
  maths: {
    nom: "Mathématiques",
    banniere: "bg-gradient-to-br from-cyan-50 via-white to-emerald-50",
    pastille: "border-emerald-200 bg-emerald-50 text-emerald-700",
    pastilleNiveau: "bg-cyan-100 text-cyan-700",
    encart: "border-emerald-200 bg-emerald-50",
    icone: "text-emerald-500",
    bouton:
      "bg-emerald-500 shadow-emerald-500/30 hover:bg-emerald-400",
    carte: "hover:border-emerald-300 hover:shadow-emerald-200/40",
    lien: "text-emerald-600",
  },
  francais: {
    nom: "Français",
    banniere: "bg-gradient-to-br from-violet-50 via-white to-cyan-50",
    pastille: "border-violet-200 bg-violet-50 text-violet-700",
    pastilleNiveau: "bg-violet-100 text-violet-700",
    encart: "border-violet-200 bg-violet-50",
    icone: "text-violet-500",
    bouton: "bg-violet-500 shadow-violet-500/30 hover:bg-violet-400",
    carte: "hover:border-violet-300 hover:shadow-violet-200/40",
    lien: "text-violet-600",
  },
  // L'indigo est déjà la couleur des fiches d'IA sur /fiches-cours/ia : les
  // trois pages de domaine doivent se lire comme la suite de ce sommaire-là,
  // pas comme une quatrième matière.
  ia: {
    nom: "Intelligence artificielle",
    banniere: "bg-gradient-to-br from-indigo-50 via-white to-violet-50",
    pastille: "border-indigo-200 bg-indigo-50 text-indigo-700",
    pastilleNiveau: "bg-indigo-100 text-indigo-700",
    encart: "border-indigo-200 bg-indigo-50",
    icone: "text-indigo-500",
    bouton: "bg-indigo-600 shadow-indigo-500/30 hover:bg-indigo-500",
    carte: "hover:border-indigo-300 hover:shadow-indigo-200/40",
    lien: "text-indigo-600",
  },
};

const LIBELLE_MATIERE: Record<Matiere, string> = {
  maths: "Maths",
  francais: "Français",
  ia: "IA",
};

// Les trois domaines Pix, tels qu'ils s'écrivent. `libelleClasse` ne les
// connaît pas — il traduit des slugs de CLASSE (« cm2 » → « CM2 »), et ce
// n'en sont pas.
const LIBELLE_DOMAINE_IA: Record<string, string> = {
  fondements: "Fondements",
  usages: "Usages",
  enjeux: "Enjeux",
};

export default function SommaireClasse({
  matiere,
  /** Une CLASSE en maths et en français (« 4e », « cm2 »), un DOMAINE Pix en
   *  IA (« fondements », « usages », « enjeux ») — voir la note en tête. */
  niveau: slugNiveau,
}: {
  matiere: Matiere;
  niveau: string;
}) {
  // `f.classe` est le deuxième segment de la clé du registre : il porte la
  // classe en maths/français et le domaine en IA. Le filtre est donc le même.
  const fiches = listerFiches(matiere).filter((f) => f.classe === slugNiveau);
  if (fiches.length === 0) notFound();

  const a = ACCENTS[matiere];
  const niveau =
    matiere === "ia"
      ? LIBELLE_DOMAINE_IA[slugNiveau] ?? slugNiveau
      : libelleClasse(slugNiveau);
  const nbFiches = fiches.length;

  return (
    <main className="min-h-screen bg-[#f5f8ff] text-slate-800">
      <section className={`border-b border-slate-200 ${a.banniere}`}>
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-12 sm:px-8">
          {/* Le fil d'Ariane garde les DEUX remontées : la matière toutes
              classes, et la collection. C'est ce qui permet à l'élève d'aller
              voir le niveau d'à côté sans repasser par l'accueil. */}
          <nav className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-bold text-slate-500">
            <Link
              href={`/fiches-cours/${matiere}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              {LIBELLE_MATIERE[matiere]}
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900">{niveau}</span>
          </nav>
          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-black uppercase ${a.pastille}`}
          >
            <BookOpen className="h-4 w-4" />
            {a.nom} · {niveau}
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black tracking-normal text-slate-900 sm:text-5xl">
              {/* « Fiches de cours Maths 4e » se lit d'un trait — la classe
                  qualifie la matière. « Fiches de cours IA Enjeux » non : deux
                  noms communs collés, sans lien lisible. Le tiret le pose. */}
              Fiches de cours {LIBELLE_MATIERE[matiere]}
              {matiere === "ia" ? " — " : " "}
              {niveau}
            </h1>
            {/* ⚠️ LE SINGULIER EST UN VRAI CAS, PAS UNE COQUETTERIE : la 1re
                spé n'a qu'UNE fiche (la dérivation). « Les 1 notions du
                programme », et surtout les accords qui suivent, s'afficheraient
                tels quels. Les phrases sont donc écrites en entier.
                ⛔ ET L'IA NE DIT PAS « LE PROGRAMME DE FONDEMENTS » : ses fiches
                ne suivent aucune année, elles couvrent un domaine du cadre Pix.
                Reprendre la phrase des classes ici écrirait une phrase fausse. */}
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              {matiere === "ia"
                ? `Les ${nbFiches} fiches du domaine ${niveau} : courtes, colorées, lisibles sur téléphone et imprimables en PDF depuis le navigateur.`
                : nbFiches > 1
                  ? `Les ${nbFiches} notions du programme de ${niveau}, une par fiche : courtes, colorées, lisibles sur téléphone et imprimables en PDF depuis le navigateur.`
                  : `Une fiche pour l'instant en ${niveau} : courte, colorée, lisible sur téléphone et imprimable en PDF depuis le navigateur.`}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        <div
          className={`flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 ${a.encart}`}
        >
          <div className="flex items-start gap-3">
            <MessageCircle className={`mt-0.5 h-6 w-6 shrink-0 ${a.icone}`} />
            <div>
              <p className="text-base font-black text-slate-900">
                Teste les nouvelles fiches de cours
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Ces fiches sont toutes neuves. Lis-les, entraîne-toi, puis
                dis-nous si elles t&apos;aident à mieux comprendre. Ton avis nous
                aide à les améliorer pour toute la classe.
              </p>
            </div>
          </div>
          <Link
            href="/votre-avis"
            className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-black text-white shadow-lg transition ${a.bouton}`}
          >
            <MessageCircle className="h-4 w-4" />
            Donner mon avis
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900">
          <span
            className={`rounded-full px-3 py-1 text-sm ${a.pastilleNiveau}`}
          >
            {niveau}
          </span>
          <span className="text-slate-400">
            {nbFiches} fiche{nbFiches > 1 ? "s" : ""}
          </span>
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {fiches.map((fiche) => (
            <Link
              key={fiche.href}
              href={fiche.href}
              className={`group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${a.carte}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {fiche.titre}
                  </h3>
                  {fiche.resume ? (
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {fiche.resume}
                    </p>
                  ) : null}
                </div>
                <FileText className={`mt-1 h-6 w-6 shrink-0 ${a.icone}`} />
              </div>
              <div
                className={`mt-5 inline-flex items-center gap-2 text-sm font-bold ${a.lien}`}
              >
                <Download className="h-4 w-4" />
                Ouvrir la fiche
              </div>
            </Link>
          ))}
        </div>

        {/* La sortie vers les autres niveaux : un élève qui ne trouve pas sa
            notion ici doit pouvoir aller voir l'année d'avant sans 404. */}
        <p className="mt-10 text-sm font-bold text-slate-500">
          <Link
            href={`/fiches-cours/${matiere}`}
            className="underline decoration-slate-300 underline-offset-4 hover:text-slate-700"
          >
            {matiere === "ia"
              ? "Voir les 16 fiches d'IA, les trois domaines →"
              : `Voir toutes les fiches de ${LIBELLE_MATIERE[matiere].toLowerCase()}, tous niveaux →`}
          </Link>
        </p>
      </section>
    </main>
  );
}
