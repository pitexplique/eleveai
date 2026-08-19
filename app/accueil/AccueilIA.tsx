"use client";

// LA NOUVELLE PAGE D'ACCUEIL — « Dis-nous ce que tu cherches », et rien d'autre.
//
// Ce que cet écran ne fait PAS, et c'est le sujet :
//   — aucune requête Supabase (l'ancienne page en lançait sept avant d'afficher
//     quoi que ce soit : avis, maths_974, catalogue, la Une, les articles ×2) ;
//   — aucun composant de journal monté (manchette, oreilles, Une, courrier,
//     édito, catalogue, machines, dictée, défis…). Non pas masqués en CSS :
//     pas importés du tout, donc absents du bundle de cette route ;
//   — aucun Coach IA. Il reste dans Tutor v4, là où un contexte pédagogique
//     existe — une notion, une question, une réponse, une erreur. Sur un écran
//     d'accueil il n'aurait rien de tout ça, et il ferait doublon avec l'entrée.
//
// L'ancien AccueilClient.tsx a été supprimé le 14/08 : ses rubriques vivent
// toujours à leurs routes, et ses ressources sont dans ressources.ts. Ce qu'il
// emportait sans remplaçant est listé en tête de page.tsx.

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import ColonneGauche from "@/components/accueil/ColonneGauche";
import EntreeMatrice from "@/components/matrice/EntreeMatrice";

/** Un pied de page sobre : des repères, pas une seconde page d'accueil. */
const PIED = [
  { label: "Comment ça marche", href: "/pourquoi-eleveai" },
  { label: "Enseignants", href: "/espace-profs" },
  { label: "Établissements", href: "/espace-ecoles" },
  { label: "Parents", href: "/parents" },
  { label: "Toutes les ressources", href: "/explorer" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "À propos", href: "/qui-sommes-nous" },
  { label: "Aide", href: "/faq" },
  { label: "Confidentialité", href: "/politique-confidentialite" },
  { label: "Conditions", href: "/cgu" },
];

export default function AccueilIA() {
  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <ColonneGauche />

      <main className="min-w-0 flex-1">
        {/* ⭐ COMPACTÉ LE 07/08. Cette colonne commençait à `pt-16 lg:pt-24` —
            96 px de vide au-dessus du margouillat sur un portable, avant même
            de lire quoi que ce soit. Sur un écran de 768 px de haut, les
            premières ressources tombaient sous le pli : la page proposait, et
            personne ne voyait ce qu'elle proposait.
            ⚠️ `max-w-4xl` et non `3xl` : les quatre actions du professeur et
            les douze classes doivent tenir sur une seule ligne, et 768 px n'y
            suffisaient pas. */}
        {/* ⚠️ `100vh` MOINS LA HAUTEUR DU HAUT DE PAGE, pas `min-h-screen`.
            Le piège : cette colonne commence ~116 px sous le sommet de la
            fenêtre (le bandeau « Installer l'app » puis le header), et elle
            réclamait quand même 100vh. Son milieu tombait donc 58 px plus bas
            que le milieu de l'écran — et comme le champ est lui-même sous le
            milieu de son bloc, il finissait 140 px trop bas. On ne centrait
            pas mal : on centrait dans le mauvais cadre.
            `6.5rem` couvre le header (66 px) et le bandeau (46 px) ; quand le
            bandeau se ferme, la page a simplement un peu plus d'air en bas —
            jamais de barre de défilement fantôme. */}
        <div className="mx-auto flex min-h-[calc(100vh-6.5rem)] w-full max-w-4xl flex-col px-4 pb-6 sm:px-6">
          {/* ⭐ LE BLOC EST CENTRÉ VERTICALEMENT (07/08), comme chez ChatGPT et
              Claude, et le repère est LE CHAMP DE SAISIE — c'est lui qu'on
              vient utiliser. Posé en haut, le bloc laissait 300 px de blanc
              sous les ressources et se lisait comme un formulaire collé au
              plafond. */}
          <div className="flex flex-1 flex-col justify-center py-2">
          {/* « PROPOSE », pas « trouve » : le moteur sort deux ou trois
              ressources compatibles, il ne devine pas LA bonne — on ne promet
              pas plus que ce que fait ressources.ts.
              ⭐ « CONÇUES, SÉLECTIONNÉES ET VÉRIFIÉES » (Frédéric, 07/08).
              « Vérifiées » seul laissait croire qu'EleveAI ne fait que relire
              ce que d'autres ont écrit. C'est faux dans les deux sens : les
              coachs, les parcours, les cahiers et les guides sont ÉCRITS ici ;
              les vidéos et les pages du réel sont CHOISIES ailleurs. Le verbe
              qui manquait, c'était le premier.
              L'origine reste, en petit, APRÈS la promesse : La Réunion est une
              bonne histoire, pas un bon mot-clé.

              ⭐ RÉÉCRIT LE 19/08 — deux défauts, et le second est le vrai.
              1. « TE propose » tutoyait trois profils sur quatre. profils.ts
                 pose `tutoie: false` pour parent, prof et direction, et tout
                 le reste de l'écran obéit (« Ta matière » / « La matière »,
                 « Que veux-tu » / « Que voulez-vous »). Ce titre était le seul
                 texte de la page à l'ignorer : il tutoyait le chef
                 d'établissement que la rangée du dessous vient d'inviter.
                 La sortie est celle qu'impose déjà le champ `promesse` dans
                 types.ts — ni tu ni vous, « on » et l'impersonnel — parce que
                 c'est UN texte lu par un CP tutoyé partout ailleurs ET par le
                 parent assis à côté de lui.
              2. « des ressources pédagogiques » annonçait un CATALOGUE, alors
                 que la refonte du 06/08 a justement retiré le catalogue de
                 l'accueil. Ce que fait l'écran d'en dessous, c'est ouvrir le
                 coach SUR la notion (coach.ts → ?classe=&matiere=&notion=).
                 Le titre sous-vendait la page d'un cran : il décrivait
                 /explorer, pas la porte.
              Le nouveau titre nomme donc les deux questions que la page pose
              vraiment — qui on est, ce qu'on cherche — et dans cet ordre,
              parce que c'est l'ordre où elles sont demandées.
              ⚠️ Les trois verbes de Frédéric n'ont pas disparu : ils passent
              dans la ligne du dessous, où « Conçues » s'accorde maintenant
              avec « les ressources » du titre. La Réunion y reste, en petit et
              après — inchangé. */}
          <header className="mb-6 text-center">
            {/* ⭐ TI MARGO RESTE. Il est parti avec la manchette lors de la
                refonte — il était dans le titre du journal. Or il n'appartient
                pas au journal : c'est la figure d'EleveAI, dessinée, celle des
                vidéos et des cahiers. Une page d'entrée peut être sobre sans
                être anonyme.
                Il a maigri de 16 px (07/08) : ce qu'on lui demande, c'est
                d'être reconnu, pas d'occuper le premier écran. */}
            <Image
              src="/cahier-vacances/ti-margo.png"
              alt="Ti Margo, le margouillat d'EleveAI, avec son crayon"
              width={1122}
              height={1402}
              sizes="64px"
              priority
              className="mx-auto mb-2 h-14 w-auto sm:h-16"
            />
            {/* ⭐ DEUX LIGNES, ET PAS DE DEUX-POINTS (Frédéric, 19/08).
                Les deux-points faisaient de la première moitié l'annonce de la
                seconde, alors que ce sont deux phrases : l'une dit ce qu'on
                demande, l'autre ce qu'on rend. Et le retour à la ligne tombait
                où la largeur voulait — « suffit : EleveAI propose » se
                retrouvait au milieu d'une ligne, les deux idées collées.
                ⚠️ Deux `block` et non un `<br>` : sur téléphone chaque moitié
                se replie normalement dans sa propre boîte. Un `<br>` aurait
                imposé la coupure ET laissé les replis se faire n'importe où
                autour d'elle. */}
            <h1 className="text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
              {/* ⭐ LES DEUX QUESTIONS, POSÉES TELLES QUELLES (Frédéric, 19/08).
                  Trois formulations ont précédé, chacune plus courte que la
                  précédente, et celle-ci est la plus courte possible : ce sont
                  littéralement les deux questions que la page pose. Rien à
                  décoder, aucun verbe rejeté à la fin.
                  ⚠️ ELLE TUTOIE, ET C'EST COHÉRENT ICI — la rangée du dessous
                  écrit « Qui es-tu ? » en dur pour tout le monde, chef
                  d'établissement compris (EntreeMatrice.tsx). Le titre ne crée
                  donc pas d'incohérence, il en épouse une qui existe déjà.
                  ⚠️ EN REVANCHE IL RÉPÈTE mot pour mot l'intitulé de la rangée,
                  cinq centimètres plus bas — le même piège que la note des
                  AUDIENCE_DOORS du 07/08 (« au singulier, la rangée demandait
                  qui es-tu ? une deuxième fois »). À trancher : ou le titre
                  porte la question et la rangée perd son intitulé, ou
                  l'inverse. */}
              <span className="block">
                Qui es-tu ? Que cherches-tu aujourd&rsquo;hui ?
              </span>
              {/* ⭐ LA SECONDE LIGNE DESCEND D'UN CRAN (Frédéric, 19/08 : « il y
                  a trop à lire, et la seconde phrase doit avoir une police plus
                  basse »). Deux lignes de même taille, c'est deux titres : l'œil
                  ne sait pas laquelle lire en premier et les lit toutes les
                  deux. Une seule porte la question, l'autre y répond — la
                  hiérarchie de tailles dit lequel est lequel.
                  ⚠️ « ce qui correspond » et non « les ressources qui
                  correspondent » : c'est la ligne du dessous qui reprend le mot
                  « ressources », et elle porte donc l'accord de « Conçues ». */}
              <span className="block text-base font-medium text-slate-700 sm:text-lg">
                EleveAI propose ce qui correspond
              </span>
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Des ressources conçues, sélectionnées et vérifiées — à La Réunion
            </p>
          </header>

          <Suspense fallback={<div className="h-64" aria-hidden="true" />}>
            {/* L'entrée n'affiche plus l'historique sous la recherche : c'est
                la colonne de gauche qui le porte, et lui seul. Sur téléphone
                la colonne devient un tiroir (bouton ☰) — le RÉCENT reste donc
                atteignable, à un geste plutôt qu'à zéro. */}
            <EntreeMatrice variante="page" />
          </Suspense>
          </div>

          <footer className="pt-10">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
              {PIED.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} prefetch={false} className="hover:text-slate-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </footer>
        </div>
      </main>
    </div>
  );
}
