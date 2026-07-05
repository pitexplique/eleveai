import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNiveau, motsDeLaClasse, NIVEAUX } from "@/lib/dico";
import DeckNiveauClient, { type CarteQ } from "./DeckNiveauClient";

const TAILLE_DECK = 30; // 30 cartes-questions (+ garde + fin = 32 cartes physiques)

/* Une carte est « rare » (légendaire ⭐) si son orthographe est costaude. */
function estRare(mot: string): boolean {
  return mot.replace(/[^A-Za-zÀ-ÿ]/g, "").length >= 11;
}

/* Construit le paquet d'une classe : round-robin entre matières (arc-en-ciel),
   30 cartes, référence « CODE·NN » (ex. 6E·07) pour l'échange. */
function construireCartes(niveau: string, code: string): CarteQ[] {
  const mots = motsDeLaClasse(niveau);
  const matieres = [...new Set(mots.map((m) => m.matiere))];
  const groupes = matieres.map((mt) => mots.filter((m) => m.matiere === mt));
  const maxLen = groupes.reduce((n, g) => Math.max(n, g.length), 0);

  const deck: typeof mots = [];
  for (let i = 0; i < maxLen; i++) {
    for (const g of groupes) if (g[i]) deck.push(g[i]);
  }

  return deck.slice(0, TAILLE_DECK).map((m, i) => ({
    matiere: m.matiere,
    matiereLabel: m.matiereLabel,
    question: m.definition,
    answer: m.mot,
    rare: estRare(m.mot),
    ref: `${code}·${String(i + 1).padStart(2, "0")}`,
    ...(m.image ? { image: m.image } : {}),
  }));
}

export function generateStaticParams() {
  return NIVEAUX.filter((n) => motsDeLaClasse(n.slug).length > 0).map((n) => ({ niveau: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ niveau: string }>;
}): Promise<Metadata> {
  const { niveau } = await params;
  const n = getNiveau(niveau);
  const label = n?.label ?? niveau;
  const url = `/qui-suis-je-a-imprimer/${niveau}`;
  return {
    title: `Qui suis-je ? — Jeu de cartes ${label} à imprimer (gratuit)`,
    description: `Un jeu de cartes « Qui suis-je ? » de ${label} à imprimer gratuitement : on lit la définition, l'élève retrouve le mot. Toutes matières, à découper et jouer.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Qui suis-je ? — Jeu de cartes ${label} à imprimer — EleveAI`,
      description: `Un jeu de cartes « Qui suis-je ? » de ${label} à imprimer, découper et jouer. Une autre façon d'apprendre.`,
      url,
      type: "article",
      siteName: "EleveAI",
      locale: "fr_FR",
    },
  };
}

export default async function DeckNiveauPage({
  params,
}: {
  params: Promise<{ niveau: string }>;
}) {
  const { niveau } = await params;
  const n = getNiveau(niveau);
  if (!n) notFound();

  const cartes = construireCartes(niveau, n.code);
  if (cartes.length === 0) notFound();

  return <DeckNiveauClient label={n.label} cartes={cartes} />;
}
