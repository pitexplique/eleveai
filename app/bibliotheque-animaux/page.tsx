// app/bibliotheque-animaux/page.tsx
//
// La planche d'aperçu de la bibliothèque d'animaux (`lib/canvas/animaux`).
// Page de travail, pas une page du site : `noindex`, absente du menu et du
// sitemap. Elle sert à VOIR les 24 dessins et les grilles à compter avant de
// les brancher dans une banque du coach.

import type { Metadata } from "next";
import { ANIMAUX, FICHES, Animal, GrilleAnimaux, nommer } from "@/lib/canvas/animaux";

export const metadata: Metadata = {
  title: "Bibliothèque d'animaux — aperçu",
  robots: { index: false, follow: false },
};

const FAMILLES: Record<string, string> = {
  insecte: "insecte",
  arachnide: "arachnide",
  mollusque: "mollusque",
  oiseau: "oiseau",
  mammifere: "mammifère",
  poisson: "poisson",
  reptile: "reptile",
  amphibien: "amphibien",
};

function Carte({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-semibold text-slate-800">{titre}</h2>
      {children}
    </section>
  );
}

export default function Page() {
  const monde = ANIMAUX.filter((a) => FICHES[a].origine === "monde");
  const reunion = ANIMAUX.filter((a) => FICHES[a].origine === "reunion");

  const vignette = (a: (typeof ANIMAUX)[number]) => (
    <li key={a} className="flex flex-col items-center rounded-xl bg-slate-50 p-2 text-center">
      <Animal nom={a} taille={72} />
      <span className="mt-1 text-sm font-medium text-slate-800">{FICHES[a].un}</span>
      <code className="text-[11px] text-slate-500">{a}</code>
      <span className="text-[11px] text-slate-500">
        {FAMILLES[FICHES[a].famille]} · {FICHES[a].pattes} pattes
      </span>
    </li>
  );

  return (
    <main className="mx-auto max-w-5xl space-y-6 bg-slate-100 px-4 py-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Bibliothèque d&apos;animaux</h1>
        <p className="mt-1 text-sm text-slate-600">
          {ANIMAUX.length} animaux dessinés en SVG (boite 60 × 60), pour le coach CP → CM2 et les
          shorts Manim. Code : <code>lib/canvas/animaux</code>.
        </p>
      </header>

      <Carte titre={`Le monde (${monde.length})`}>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">{monde.map(vignette)}</ul>
      </Carte>

      <Carte titre={`La Réunion (${reunion.length}) — à garder rares (≈ 4 % des contextes)`}>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">{reunion.map(vignette)}</ul>
      </Carte>

      <div className="grid gap-6 md:grid-cols-2">
        <Carte titre="« Combien de poules ? » — grille, 5 par ligne">
          <GrilleAnimaux groupes={[{ animal: "poule", nombre: 7 }]} />
          <p className="mt-2 text-sm text-slate-600">Réponse : {nommer("poule", 7)}.</p>
        </Carte>

        <Carte titre="« Compte les insectes » — en vrac, avec des pièges">
          <GrilleAnimaux
            groupes={[
              { animal: "coccinelle", nombre: 3 },
              { animal: "abeille", nombre: 2 },
              { animal: "fourmi", nombre: 2 },
              { animal: "araignee", nombre: 2 },
              { animal: "escargot", nombre: 1 },
            ]}
            disposition="vrac"
            colonnes={4}
            graine={7}
          />
          <p className="mt-2 text-sm text-slate-600">
            Réponse : 7 insectes (l&apos;araignée a 8 pattes, l&apos;escargot n&apos;en a pas).
          </p>
        </Carte>

        <Carte titre="« Combien de poissons rouges ? » — la couleur est la donnée">
          <GrilleAnimaux
            groupes={[
              { animal: "poisson", nombre: 4, couleur: "#ef4444" },
              { animal: "poisson", nombre: 5 },
            ]}
            graine={3}
          />
          <p className="mt-2 text-sm text-slate-600">Réponse : 4 rouges, 5 bleus, 9 en tout.</p>
        </Carte>

        <Carte titre="« 3 lignes de 4 lapins » — vers la multiplication">
          <GrilleAnimaux groupes={[{ animal: "lapin", nombre: 12 }]} colonnes={4} taille={48} />
          <p className="mt-2 text-sm text-slate-600">Réponse : 3 × 4 = 12 lapins.</p>
        </Carte>

        <Carte titre="Version à colorier (fiches imprimées)">
          <GrilleAnimaux
            groupes={[
              { animal: "chat", nombre: 1 },
              { animal: "chien", nombre: 1 },
              { animal: "vache", nombre: 1 },
              { animal: "tortue", nombre: 1 },
            ]}
            coloriage
            colonnes={4}
            melange={false}
          />
        </Carte>

        <Carte titre="À La Réunion : « Combien de margouillats sur le mur ? »">
          <GrilleAnimaux
            groupes={[{ animal: "margouillat", nombre: 6 }]}
            disposition="vrac"
            colonnes={3}
            graine={5}
            fond="#fef3c7"
          />
        </Carte>
      </div>
    </main>
  );
}
