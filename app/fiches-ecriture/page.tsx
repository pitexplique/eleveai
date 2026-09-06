// LE HUB DES FICHES D'ÉCRITURE — /fiches-ecriture
//
// ⚠️ À ne pas confondre avec /fiches-cours : là-bas c'est un COURS plus des
// exercices ; ici c'est une feuille de réglure où l'enfant repasse une lettre.
// Voir `lib/fiches-ecriture/registre.ts` pour le raisonnement complet.
//
// ⭐ MISE EN PAGE REPRISE DE `/maths-974` (Frédéric, 03/09 : « comme dans maths
// réel 974 ») : une carte par entrée, le média en haut, le texte dessous. Ce
// gabarit a déjà fait ses preuves sur le site, et il porte exactement ce qu'il
// faut ici — une vidéo, un titre, une action.

import type { Metadata } from "next";
import Link from "next/link";
import { Download, PlayCircle, Sparkles } from "lucide-react";

import { FAMILLES, fichesDe, type FicheEcriture } from "@/lib/fiches-ecriture/registre";

// ⭐ LE TITRE VISE LA REQUÊTE TAPÉE. « fiche d'écriture CP à imprimer » est très
// cherchée — cinq sites en vivent (vérifié le 03/09). Le mot « gratuit » reste
// ici parce que c'est ce qui se tape, alors qu'il est banni du corps du site
// quand on décrit l'offre.
export const metadata: Metadata = {
  title: "Fiches d'écriture CP à imprimer — gratuit, avec la vidéo du geste | EleveAI",
  description:
    "Des fiches d'écriture cursive à imprimer, une par lettre : le modèle, les pointillés à repasser, la ligne où l'on écrit seul. Et pour chaque lettre, la vidéo qui montre le geste — pour un droitier comme pour un gaucher.",
  alternates: { canonical: "/fiches-ecriture" },
  openGraph: {
    title: "Fiches d'écriture CP — avec la vidéo du geste",
    description:
      "Le modèle, les pointillés, la ligne libre — et le film du crayon qui trace la lettre, pour un droitier comme pour un gaucher.",
    url: "/fiches-ecriture",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

// ⭐⭐ DES COULEURS, PARCE QUE CE SONT DES ENFANTS DE SIX ANS.
// Frédéric, 03/09 : « ça doit être joyeux comme le ciel, le soleil… ils aiment
// les couleurs, les fleurs, la nature ». La première version était bleu nuit et
// grise — la charte d'un site de collège posée sur une page de CP.
// ⚠️ La couleur tourne d'une carte à l'autre : une grille monochrome de
// vingt-six lettres est un tableau d'horaires, pas un jardin. Ce sont les mêmes
// teintes que la nature de l'île — hibiscus, mangue, feuille, lagon, bougainvillier.
const TEINTES = [
  { bord: "border-rose-200", fond: "bg-rose-50", texte: "text-rose-700", fleur: "🌺" },
  { bord: "border-amber-200", fond: "bg-amber-50", texte: "text-amber-700", fleur: "🌻" },
  { bord: "border-emerald-200", fond: "bg-emerald-50", texte: "text-emerald-700", fleur: "🌿" },
  { bord: "border-sky-200", fond: "bg-sky-50", texte: "text-sky-700", fleur: "🌈" },
  { bord: "border-violet-200", fond: "bg-violet-50", texte: "text-violet-700", fleur: "🌸" },
];

function Carte({ f, i = 0 }: { f: FicheEcriture; i?: number }) {
  const t = TEINTES[i % TEINTES.length];
  // ⛔⛔ AUCUNE IFRAME SUR LE HUB, ET C'EST STRUCTUREL.
  // Frédéric, 03/09 : « ça va être lourd à charger le jour où il y aura mille
  // vidéos ». Une iframe YouTube tire ~1 Mo de script AVANT même qu'on clique —
  // à vingt-six lettres la page traîne déjà, à mille elle ne s'ouvre plus.
  // ⭐ La carte montre donc une IMAGE FIXE, la nôtre, servie depuis notre
  // domaine et chargée en `lazy` : zéro requête chez YouTube tant que personne
  // ne demande la vidéo. Le lecteur ne se charge que sur la page de la lettre,
  // une seule fois, à la demande.
  // ⚠️ Ne pas « améliorer » ça en remettant une iframe silencieuse : le coût ne
  // se voit pas sur une page de test à trois cartes, il se voit à cinquante.
  const video = f.video?.droitier ?? f.video?.gaucher;
  return (
    <article
      className={`overflow-hidden rounded-[2rem] border-4 ${t.bord} bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl`}
    >
      <Link
        href={`/fiches-ecriture/${f.famille}/${f.slug}`}
        className="relative block"
      >
        {/* ⭐⭐ ON MONTRE LA FICHE, PAS LA VIGNETTE DE LA VIDÉO.
            Frédéric, 03/09 : « il faut montrer les fiches ». C'est la feuille
            que les gens viennent chercher — la voir décide du clic bien mieux
            qu'une image de chaîne YouTube.
            ⚠️ `object-top` : on cadre le HAUT de la feuille, là où se lisent le
            titre et la première bande de modèles. Centré, on ne verrait que des
            lignes vides. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={f.apercu}
          alt={`La fiche d'écriture de la lettre ${f.slug} en cursive`}
          className="aspect-[4/3] w-full bg-white object-cover object-top"
          loading="lazy"
        />
        {video && (
          <span className="absolute inset-0 flex items-center justify-center">
            <PlayCircle
              className="h-16 w-16 text-white drop-shadow-lg"
              strokeWidth={1.5}
            />
          </span>
        )}
      </Link>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full ${t.fond} px-2.5 py-1 text-xs font-black ${t.texte}`}
          >
            <span aria-hidden>{t.fleur}</span>
            CP · écriture
          </span>
          {video && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
              <PlayCircle className="h-3.5 w-3.5" />
              avec la vidéo
            </span>
          )}
        </div>

        <h2 className="mt-3 text-xl font-black text-slate-900">{f.titre}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Le modèle, les pointillés à repasser, puis la ligne où l&apos;on écrit
          tout seul — en partant du point vert.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={f.pdf}
            download
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
          >
            <Download className="h-4 w-4" />
            La fiche en PDF
          </a>
          <Link
            href={`/fiches-ecriture/${f.famille}/${f.slug}`}
            className="inline-flex items-center rounded-full border-2 border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-sky-500 hover:text-sky-700"
          >
            Voir le geste
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function HubFichesEcriture() {
  // ⛔⛔ ON PARCOURT LES FAMILLES OUVERTES, ON N'EN NOMME PLUS UNE.
  // Cette page disait `fichesDe("lettres")` en dur — écrit quand « lettres »
  // était la seule famille ouverte, donc juste ce jour-là et faux le jour
  // suivant. Le 06/09, ouvrir « chiffres » les a RETIRÉS de la liste « Bientôt »
  // sans les faire apparaitre nulle part : six fiches existaient sur le disque,
  // étaient dans le sitemap, et la page d'accueil du hub n'en montrait aucune.
  // ⚠️ Et le lien était déjà annoncé dans les descriptions YouTube du soir.
  // 👉 La leçon, encore : **changer un drapeau ne suffit jamais.** Il faut
  // suivre la chaîne jusqu'à ce qui s'affiche. Voir la note « les trous de la
  // matrice d'entrée » — même faute, autre endroit.
  const ouvertes = FAMILLES.filter((f) => f.ouverte).map((f) => ({
    famille: f,
    fiches: fichesDe(f.slug),
  })).filter((x) => x.fiches.length > 0);
  const aVenir = FAMILLES.filter((f) => !f.ouverte);
  // La première fiche qui a sa vidéo en ligne sert de démonstration.
  const vedette = ouvertes
    .flatMap((x) => x.fiches)
    .find((f) => f.video?.droitier || f.video?.gaucher);

  return (
    // ⛔ FOND CLAIR EXPLICITE, comme /maths-974. Le gabarit du site est SOMBRE :
    // une page qui pose du `text-slate-900` sans fond à elle rend un titre noir
    // sur bleu nuit — illisible, et invisible dans le code. Vérifié au rendu.
    <main className="min-h-screen bg-[#f2fbff] text-slate-800">
      {/* ⭐ LE CIEL ET LE SOLEIL. Le soleil est un vrai disque, posé dans le
          coin : à six ans on lit une forme avant un dégradé. */}
      <section className="relative overflow-hidden border-b-4 border-amber-200 bg-gradient-to-br from-sky-400 via-cyan-300 to-emerald-300 text-white">
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-amber-300/80 blur-[2px]"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/25 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Écriture · cycle 2
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight drop-shadow-[0_2px_6px_rgba(2,60,90,0.35)] sm:text-6xl">
            Les fiches d&apos;écriture
          </h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/90 sm:text-lg">
            Une feuille par lettre : le modèle, les pointillés à repasser, et la
            ligne où l&apos;on écrit tout seul.{" "}
            {/* ⭐ LA PHRASE QUI NOUS SÉPARE DES CINQ SITES qui vivent de cette
                requête. Eux donnent un PDF ; nous montrons le crayon qui trace. */}
            <strong className="text-amber-100">
              Et pour chaque lettre, la vidéo qui montre le geste
            </strong>{" "}
            — pour un droitier comme pour un gaucher.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">

      {/* ⭐ UNE SEULE VIDÉO EN AVANT, JAMAIS LA GRILLE ENTIÈRE.
          Frédéric, 03/09 : « on peut en montrer une deux, mais surtout qu'il
          ait accès facilement à sa fiche d'écriture ». Une vidéo suffit à
          montrer CE QUE C'EST ; au-delà, elle vole la place de ce que les gens
          viennent chercher — la feuille à imprimer.
          ⛔ Et c'est aussi la limite de charge : un lecteur, pas cinquante. */}
      {vedette?.video && (
        <section className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <p className="text-sm font-black uppercase tracking-wider text-slate-500">
            Comment ça marche
          </p>
          <div className="mt-3 grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${
                  vedette.video.droitier ?? vedette.video.gaucher
                }`}
                title={vedette.titre}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div>
              <p className="text-lg leading-7 text-slate-700">
                On regarde le crayon tracer la lettre, puis{" "}
                <strong className="text-slate-900">on imprime la feuille</strong>{" "}
                et on repasse dessus. Dans l&apos;autre sens aussi : la fiche
                sous les yeux, la vidéo montre le geste qui manque.
              </p>
              <a
                href={vedette.pdf}
                download
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 font-bold text-white transition hover:bg-slate-700"
              >
                <Download className="h-4 w-4" />
                La fiche de cette vidéo
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ⭐ UNE SECTION PAR FAMILLE OUVERTE. Le titre de famille n'apparait que
          s'il y en a plusieurs : sur une seule, il ferait doublon avec le titre
          de la page. */}
      {ouvertes.map(({ famille: fam, fiches }) => (
        <section key={fam.slug} className="mt-10">
          {ouvertes.length > 1 && (
            <h2 className="text-2xl font-black text-slate-900">{fam.titre}</h2>
          )}
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fiches.map((f, i) => (
              <Carte key={`${f.famille}-${f.slug}`} f={f} i={i} />
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            {fiches.length} sur {fam.slug === "chiffres" ? 10 : 26} — les
            suivantes arrivent une par une.
          </p>
        </section>
      ))}

      {/* ⭐ LES FAMILLES À VENIR SONT ANNONCÉES, PAS CACHÉES : elles disent où va
          le chantier. ⛔ Mais elles ne sont pas cliquables — une page vide coûte
          plus cher qu'une promesse tenue plus tard. */}
      <h2 className="mt-14 text-2xl font-black text-slate-900">Bientôt</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {aVenir.map((f) => (
          <li
            key={f.slug}
            className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4"
          >
            <p className="font-black text-slate-700">{f.titre}</p>
            <p className="mt-1 text-sm text-slate-500">{f.promesse}</p>
          </li>
        ))}
      </ul>

        <p className="mt-12 text-sm text-slate-500">
          Frédéric Lacoste — La Réunion 🌋
        </p>
      </div>
    </main>
  );
}
