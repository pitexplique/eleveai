// L'ARGUMENT DE VENTE DE L'ACCUEIL (16/11/2026) — « plus de 5 000 vidéos + le
// coach pour suivre la famille », dit honnêtement tant que le cap n'est pas passé.
//
// ⛔ Le nombre vient de lib/videos/compteur.ts (manifeste R2), JAMAIS d'un
// chiffre tapé ici. Avant le cap : « 1 875 vidéos aujourd'hui — 5 000 fin
// janvier 2027 », avec la barre. Après : « Plus de 5 000 vidéos », sans barre.
// ⛔ Composant de l'ACCUEIL seulement : il mène à l'offre famille et à la carte
// cadeau, donc jamais dans le coach ni le mode classe (avis de déontologie).
// ⛔ Pas un bandeau au-dessus de l'en-tête : la banderole rouge reste retirée.
//
// Deux maquettes à départager par Frédéric : « barre » (A) et « ligne » (B).
// ⏸ 16/11 : « enlève l'offre famille et carte cadeau pour le moment, on le
// remettra plus tard » → les liens (et « un seul abonnement… ») sont ÉTEINTS par
// LIENS_OFFRE ; passer à true pour les rallumer.
// ✅ 19/11/2026, Frédéric : « modifie page d'accueil » → l'offre revient, avec la
// phrase principale du nouveau modèle. La carte cadeau reste éteinte.
const LIENS_OFFRE = true;
const CARTE_CADEAU = false;
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Gift, PlayCircle, Users } from "lucide-react";
import { CAP_VIDEOS, ECHEANCE_CAP, etatCompteurVideos } from "@/lib/videos/compteur";
import { EXERCICES, visiteursDeLaSemaine } from "@/lib/accueil/chiffres-semaine";
import CompteurReponsesCoach from "@/components/coach/CompteurReponsesCoach";
import { OFFRE, OUVERTURE_SUIVI, montant } from "@/lib/tarifs";

export type VarianteCompteur = "barre" | "ligne";

// ⭐⭐ 22/11/2026 — L'ACCUEIL « COMME UN CEO » (Frédéric : « refais la page
// d'accueil comme un CEO ») : le bénéfice d'abord, la preuve ensuite, un appel
// clair, peu de texte, aucun mot de prof. Deux pièces courtes, montées par
// app/accueil/AccueilCeo.tsx : la bande des chiffres (la preuve) et les deux
// encarts (Famille à gauche, Prof à droite), trois lignes chacun.
// ⛔ Prix : seulement OFFRE de lib/tarifs.ts (validés le 22/11). Rien sur l'année,
// le Premium, les pays, les établissements, ni sur les vidéos (libres ou comptées ?).

function Ligne({ children, couleur }: { children: React.ReactNode; couleur: string }) {
  return (
    <li className="flex gap-1.5">
      <span aria-hidden="true" className={couleur}>✔</span>
      <span>{children}</span>
    </li>
  );
}

/** La preuve : questions en direct, animations, visiteurs, exercices. */
export function BandeChiffres() {
  const c = etatCompteurVideos();
  const cap = CAP_VIDEOS.toLocaleString("fr-FR");
  const visiteurs = visiteursDeLaSemaine();
  const chiffre = (valeur: string, libelle: string) => (
    <div className="flex flex-col-reverse items-center text-center">
      <dt className="text-xs font-bold leading-tight text-slate-600 sm:text-sm">{libelle}</dt>
      <dd className="text-2xl font-black tabular-nums text-slate-900 sm:text-3xl">{valeur}</dd>
    </div>
  );
  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white px-4 py-4 shadow-md ring-1 ring-teal-200">
      <p className="sr-only">En chiffres</p>
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <CompteurReponsesCoach chiffre className="sm:!items-center sm:!text-center [&>dd]:!text-2xl sm:[&>dd]:!text-3xl sm:[&>dt]:!text-sm" />
        {chiffre(c.capAtteint ? `+ ${cap}` : c.nombreTexte, "animations")}
        {visiteurs !== null && chiffre(visiteurs.toLocaleString("fr-FR"), "visiteurs par semaine")}
        {chiffre(EXERCICES.exercices.toLocaleString("fr-FR"), "exercices de maths")}
      </dl>
      <p className="mt-3 border-t border-slate-100 pt-2 text-center text-sm font-bold text-slate-700">
        🌙 Des élèves s&apos;entraînent le soir, et parfois même le matin avant l&apos;école.
      </p>
    </div>
  );
}

/** ⏸ 23/11/2026, Frédéric : « enlève 10 euros par mois de la page d'accueil, on
 *  la remettra plus tard » (famille ET prof). Passer à true pour les rallumer. */
const PRIX_SUR_ACCUEIL = false;

/** Famille à gauche, Prof à droite : un titre (le bénéfice), trois lignes, un bouton (sans prix depuis le 23/11). */
export function EncartsFamilleProf() {
  return (
    <div className="mx-auto grid max-w-4xl items-stretch gap-4 text-left sm:grid-cols-2">
      <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sky-200">
        <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-sky-700">
          <Users className="h-5 w-5" aria-hidden="true" /> La famille
        </p>
        <p className="mt-1 text-2xl font-black leading-snug text-slate-900">Des soirées plus simples</p>
        <p className="mt-1 flex items-center gap-2 font-bold text-slate-700">
          <Image src="/ti-margo/animations/encouragement.png" alt="" width={320} height={320} sizes="48px" className="h-12 w-12 shrink-0" />
          <span>Vos enfants s&apos;entraînent seuls. Vous savez où ils en sont.</span>
        </p>
        <ul className="mt-3 space-y-1 text-sm font-bold text-slate-700">
          <Ligne couleur="text-sky-700">Corrigés tout de suite, la vidéo s&apos;ils bloquent</Ligne>
          <Ligne couleur="text-sky-700">Ce qu&apos;ils ont compris, ce qu&apos;il faut revoir</Ligne>
          <Ligne couleur="text-sky-700">Un bilan chaque semaine par courriel</Ligne>
        </ul>
        {/* Le bouton, calé en bas : aligné d'un encart à l'autre.
            23/11, Frédéric : « enlève tarifs de 10 euros sur la page d'accueil
            et remplace par s'inscrire plutôt que voir tarifs » → aucun prix
            dans les encarts ; les prix restent sur /tarifs. */}
        <div className="mt-auto pt-4">
          {PRIX_SUR_ACCUEIL && (
            <p className="mb-3 text-lg font-black text-slate-900">
              dès {montant(OFFRE.eleve)} par mois, <span className="whitespace-nowrap">du CP à la Terminale</span>
            </p>
          )}
          <Link
            href="/auth/signin?inscription=1"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-sky-700 px-5 py-2.5 font-black text-white shadow-sm hover:bg-sky-800"
          >
            S&apos;inscrire <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-violet-200">
        <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-violet-700">
          <GraduationCap className="h-5 w-5" aria-hidden="true" /> Le prof
        </p>
        <p className="mt-1 text-2xl font-black leading-snug text-slate-900">Moins de corrections</p>
        <p className="mt-1 font-bold text-slate-700">Plus de temps pour vos élèves. Chacun s&apos;entraîne à son niveau.</p>
        <ul className="mt-3 space-y-1 text-sm font-bold text-slate-700">
          <Ligne couleur="text-violet-700">Les exercices se corrigent tout seuls</Ligne>
          <Ligne couleur="text-violet-700">En salle info, chaque élève en direct</Ligne>
          <Ligne couleur="text-violet-700">Le bulletin prêt à copier dans Pronote</Ligne>
        </ul>
        {/* 22/11 : le Menu du jour a quitté l'accueil pour le tableau de bord du prof ; ici, la séance type. */}
        <Link href="/seances" className="mt-2 inline-flex items-center gap-1 self-start text-sm font-black text-violet-800 underline">
          Voir une séance en classe
        </Link>
        <div className="mt-auto pt-4">
          {PRIX_SUR_ACCUEIL && (
            <p className="mb-3 text-lg font-black text-slate-900">
              {montant(OFFRE.prof)} par mois, <span className="whitespace-nowrap">toutes vos classes</span>
            </p>
          )}
          <Link
            href="/prof/classes"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-violet-700 px-5 py-2.5 font-black text-white shadow-sm hover:bg-violet-800"
          >
            Créer ma classe <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// `micros` (17/11) : le nombre de micro-compétences du CP à la Terminale, que
// donnait le nuage « Tout le programme », retiré ; affiché dans « En chiffres ».
// 21/11 : `micros` n'est plus affiché (« micro-compétences », un mot de prof) ; la prop reste.
export default function CompteurFamille({ variante }: { variante: VarianteCompteur; micros?: number }) {
  const c = etatCompteurVideos();
  const cap = CAP_VIDEOS.toLocaleString("fr-FR");
  const visiteurs = visiteursDeLaSemaine();

  if (variante === "ligne") {
    return (
      <div className="mx-auto mt-4 max-w-3xl">
        <p className="inline-block rounded-2xl bg-white/85 px-4 py-2.5 text-center text-base font-black leading-relaxed text-slate-800 shadow-sm ring-1 ring-teal-200 sm:text-lg">
          {/* Les icônes restent DANS le fil du texte : centré sur téléphone. */}
          <PlayCircle className="mr-1.5 inline h-5 w-5 align-[-4px] text-rose-600" aria-hidden="true" />
          {c.capAtteint ? (
            <>Plus de {cap} vidéos</>
          ) : (
            <>
              {c.nombreTexte} vidéos aujourd&apos;hui, <span className="whitespace-nowrap text-teal-700">objectif : {cap} {ECHEANCE_CAP}</span>
            </>
          )}
          <br />
          <span className="whitespace-nowrap">
            <span aria-hidden="true" className="mx-1 text-slate-400">+</span>
            <Users className="mr-1.5 inline h-5 w-5 align-[-4px] text-sky-700" aria-hidden="true" />
            le coach
          </span>{" "}
          qui suit <span className="whitespace-nowrap">chaque élève</span>, du CP à la Terminale
        </p>
        {LIENS_OFFRE && (
          <p className="mt-1.5 flex flex-wrap justify-center gap-x-4 text-sm font-bold">
            <Link href="/tarifs" className="text-sky-800 underline">Les tarifs</Link>
            {CARTE_CADEAU && <Link href="/carte-cadeau" className="text-emerald-800 underline">Offrir la carte cadeau de Noël</Link>}
          </p>
        )}
      </div>
    );
  }

  // ⭐ 16/11, Frédéric : deux encarts côte à côte, « La famille » à gauche et
  // « Le prof » à droite (le coach sert à 78 % entre 8 h et 17 h : en classe),
  // puis « En chiffres » en BANDE horizontale dessous (Tommy retiré le 17/11).
  // ⛔ L'encart prof ne parle d'AUCUNE offre payante ni d'aucun prix.
  const chiffre = (valeur: string, libelle: string) => (
    <div className="flex flex-col-reverse items-center text-center sm:items-start sm:text-left">
      <dt className="text-xs font-bold leading-tight text-slate-600">{libelle}</dt>
      <dd className="text-lg font-black tabular-nums text-slate-900 sm:text-xl">{valeur}</dd>
    </div>
  );
  return (
    <div className="mx-auto mt-5 grid max-w-3xl items-stretch gap-3 text-left sm:grid-cols-2">
      {/* À GAUCHE : LA FAMILLE.
          ⭐ 19/11/2026 — même construction que l'encart prof (titre = ce que le
          parent y gagne, une phrase, 4 lignes, puis les boutons). Frédéric :
          « propose autre encart pour les familles », puis « il faut mentionner
          aux familles qu'ils ont accès aux stats » → les stats dites en mots de
          parent : « vous savez où il en est ». Puis « pas il mais vos enfants » : tout au pluriel. Version B choisie en maquette.
          Avant : « Le coach qui suit chaque élève, du CP à la Terminale » + le
          paragraphe des aides (git show c4ddc752:components/accueil/CompteurFamille.tsx).
          ⛔ Chaque ligne décrit ce qui EXISTE (SUIVI_DES_MAINTENANT, lib/tarifs.ts).
          ⛔ Jamais « illimité » pour l'aide de l'IA. */}
      <div className="flex flex-col rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-sky-200">
        <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-sky-700">
          <Users className="h-5 w-5" aria-hidden="true" /> La famille
        </p>
        <p className="mt-1 text-xl font-black leading-snug text-slate-900">
          EleveAI simplifie <span className="whitespace-nowrap">vos soirées</span>
        </p>
        <p className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-700">
          <Image src="/ti-margo/animations/encouragement.png" alt="" width={320} height={320} sizes="48px" className="h-12 w-12 shrink-0" />
          {/* 21/11, Frédéric : « fais pareil avec famille » (comme l'encart prof,
              « comme un CEO ») → le bénéfice d'abord : du temps pour vous. */}
          <span>Plus de temps pour vous : vos enfants s&apos;entraînent seuls pendant que vous préparez le repas. Ti Margo les aide.</span>
        </p>
        {LIENS_OFFRE ? (
          <>
            {/* 21/11 : ce qui est offert d'abord, puis ce que le Suivi ajoute, dit
                clairement (⛔ jamais laisser croire que le Suivi est gratuit). */}
            <ul className="mt-2 space-y-0.5 text-sm font-bold text-slate-700">
              <li className="flex gap-1.5">
                <span aria-hidden="true" className="text-sky-700">✔</span>
                <span>Corrigés tout de suite, la vidéo s&apos;ils bloquent</span>
              </li>
            </ul>
            {/* ⭐ 22/11/2026 — LE MODÈLE DU 22/11 (note modele-tarifaire-22-11) :
                Famille 10 €/mois (27/11 : Élève 4,95 €, Famille 7,95 € jusqu'à 3 enfants), toutes les classes,
                sans IA. Fini le « Suivi » à 7,95 €, les aides de Ti Margo comptées
                et le « gratuit pour commencer ». ⛔ Prix venus de lib/tarifs.ts. */}
            <p className="mt-1.5 text-sm font-black text-sky-800">Vous savez où ils en sont :</p>
            <ul className="mt-0.5 space-y-0.5 text-sm font-bold text-slate-700">
              {[
                "Ce qu'ils ont compris, les 3 choses à revoir",
                "Une alerte s'ils décrochent",
                "Un bilan chaque semaine par courriel",
              ].map((t) => (
                <li key={t} className="flex gap-1.5">
                  <span aria-hidden="true" className="text-sky-700">✔</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-base font-black text-slate-900">
              dès {montant(OFFRE.eleve)} par mois, <span className="whitespace-nowrap">du CP à la Terminale</span>
            </p>
            <p className="text-xs font-bold text-slate-600">
              Du CP à la Terminale, un seul compte. Ouverture {OUVERTURE_SUIVI}.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-sky-700 px-4 py-2 text-sm font-black text-white shadow-sm hover:bg-sky-800"
              >
                Voir les tarifs <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              {CARTE_CADEAU && (
                <Link href="/carte-cadeau" className="inline-flex items-center gap-1 text-sm font-black text-emerald-800 underline">
                  <Gift className="h-4 w-4" aria-hidden="true" /> La carte cadeau
                </Link>
              )}
            </div>
          </>
        ) : (
          <p className="mt-1 text-sm font-bold text-slate-600">Il trouve ce qui manque, l&apos;entraîne là-dessus et garde ses progrès.</p>
        )}
      </div>

      {/* À DROITE : LE PROF. Outils réels : /prof/classes, /prof/classes/direct (toutes les 15 s),
          /prof/classes/bilan (réussite de chaque élève par micro). */}
      <div className="flex flex-col rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-violet-200">
        <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-violet-700">
          <GraduationCap className="h-5 w-5" aria-hidden="true" /> Le prof
        </p>
        {/* ⭐ 19/11/2026, Frédéric : « le mot d'ordre : me simplifier ma vie »,
            « EleveAI simplifie ta vie de prof », « les élèves sont concentrés »,
            « donc je passe une heure tranquille », « et les notes sont
            exportables ». Avant (17/11) : « Une vidéo au tableau, puis chaque
            élève s'entraîne à son niveau ». Puis (19/11, « il faut changer » la phrase de
            l'heure tranquille, « et rajouter qu'il s'entraîne le soir ») : l'énergie
            gardée pour ceux qui en ont besoin. ⛔ Toujours sans prix. */}
        <p className="mt-1 text-xl font-black leading-snug text-slate-900">
          EleveAI simplifie <span className="whitespace-nowrap">votre vie de prof</span>
        </p>
        {/* 21/11, Frédéric : « économiser du temps n'apparaît nulle part », puis
            « refais l'encart comme un CEO » → le bénéfice d'abord (le temps
            gagné), puis la preuve (correction, direct, bilan, Pronote), et la
            gratuité près du bouton. ⛔ Toujours honnête : seuls les exercices
            du site se corrigent seuls ; le bulletin se COPIE dans Pronote. */}
        <p className="mt-1 text-sm font-bold text-slate-700">
          Moins de corrections, plus de temps pour vos élèves. Chacun s&apos;entraîne à son niveau, en classe et le soir.
        </p>
        <ul className="mt-2 space-y-0.5 text-sm font-bold text-slate-700">
          {[
            "Du temps gagné : exercices corrigés tout seuls",
            "Votre énergie, pour ceux qui en ont besoin",
            // 16/11 : « suivre vos élèves en direct en salle info ».
            "En salle info, vous voyez chaque élève en direct",
            // U+2011 : trait d'union insécable, « micro‑compétence » ne se coupe pas.
            "Toutes les notes, par micro‑compétence",
            // 19/11 : le bulletin (/prof/classes/bulletin) se copie dans Pronote.
            "Le bulletin prêt à copier dans Pronote",
            // 22/11 : les codes élèves marchent quand le prof est connecté.
            "Vos élèves entrent avec votre code pendant votre cours",
          ].map((t) => (
            <li key={t} className="flex gap-1.5">
              <span aria-hidden="true" className="text-violet-700">✔</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        {/* 17/11, Frédéric : « créer ma classe et exemple de séances ! c'est le
            mieux », puis « rajoute une chips sur l'accueil à côté de créer ma
            classe » → une CHIP (même style que « Ou va directement à : »
            d'AccueilSuivi) juste après le bouton, vers le hub /seances. */}
        {/* 22/11/2026 : Prof 10 €/mois, toutes ses classes, sans IA (remplace « 2 classes gratuites »). */}
        <p className="mt-2 text-base font-black text-slate-900">
          {montant(OFFRE.prof)} par mois, <span className="whitespace-nowrap">toutes vos classes</span>
        </p>
        <p className="text-xs font-bold text-slate-600">Sans engagement. Ouverture {OUVERTURE_SUIVI}.</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Link
            href="/prof/classes"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-violet-700 px-4 py-2 text-sm font-black text-white shadow-sm hover:bg-violet-800"
          >
            Créer ma classe <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {/* 21/11, Frédéric : « dans l'encart profs enlève énigmes à projeter »
              et « exemples de séances » (le Menu du jour, juste dessous, mène
              à la séance en entier). */}

        </div>
        <p className="mt-1.5 text-xs font-bold text-slate-600">La séance type : <span className="whitespace-nowrap">20 min de cours,</span> <span className="whitespace-nowrap">25 min de coach et vidéos,</span> <span className="whitespace-nowrap">10 min de synthèse</span></p>
      </div>

      {/* ⭐ 22/11/2026 — LA LIGNE DES 10 QUESTIONS, sous les deux cartes.
          ⛔ Le compteur n'est pas codé : on l'annonce pour l'ouverture, on ne
          dit pas qu'il bloque aujourd'hui. Les vidéos ne sont pas tranchées :
          elles ne sont ni dans « libres » ni dans « comptées ». */}
      <p className="rounded-2xl bg-emerald-50 px-4 py-2.5 text-center text-sm font-bold leading-relaxed text-slate-800 ring-1 ring-emerald-200 sm:col-span-2">
        <span className="font-black text-emerald-800">{OFFRE.questionsGratuitesParJour} questions offertes chaque jour</span>, sans compte.{" "}
        Les fiches de cours, les énigmes à projeter et les PDF restent libres.{" "}
        <Link href="/tarifs" className="whitespace-nowrap font-black text-sky-800 underline">Voir les tarifs</Link>
      </p>

      {/* EN DESSOUS : LA BANDE DES CHIFFRES. Vidéos comptées (lib/videos/compteur.ts),
          exercices et visiteurs de la semaine (lib/accueil/chiffres-semaine.ts). */}
      <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm ring-1 ring-teal-200 sm:col-span-2">
        {/* 17/11 : avec 3 nombres, la bande ne passe sur une ligne qu'à partir de
            lg (1024 px) ; en dessous, « En chiffres » + barre au-dessus, les
            nombres dessous (sinon la barre et sa phrase s'écrasaient).
            21/11 : la bande est dans une colonne étroite (≈ 770 px) ; avec le
            compteur en direct, « vidéos aujourd'hui » se coupait même en lg →
            toujours les nombres SOUS la barre. */}
        <div className="flex flex-col gap-3">
          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="flex items-center gap-1.5 self-center text-sm font-black uppercase tracking-wide text-rose-700">
                <PlayCircle className="h-5 w-5" aria-hidden="true" /> En chiffres
              </span>
            </p>
            {/* 21/11, Frédéric : « En chiffres : enlève le nombre de vidéos » →
                plus de nombre, de barre ni de « 5 000 fin janvier ». */}
          </div>
          <dl className="grid shrink-0 grid-cols-2 gap-3 border-t border-slate-100 pt-2 sm:grid-cols-4">
            {/* 21/11, Frédéric : « tu peux rajouter le nombre de vidéos », puis
                « si tu étais un CEO, quel chiffre tu mettrais ? » (+ sa capture
                Vercel) → ce qui parle à un parent : vidéos, visiteurs de la
                semaine (relevé à la main, périmé après 21 j), exercices, et les
                questions répondues EN DIRECT. « Micro-compétences » retiré :
                un mot de prof. */}
            {/* 18/11, Frédéric : « il fallait enlever le nombre de visiteurs » →
                à sa place, le compteur EN DIRECT des questions répondues au coach
                (le même que le pied de page, jamais un chiffre tapé). */}
            {/* 21/11, Frédéric : « le chiffre questions répondues en premier ». */}
            <CompteurReponsesCoach chiffre />
            {chiffre(c.capAtteint ? `+ ${cap}` : c.nombreTexte, "animations")}
            {visiteurs !== null && chiffre(visiteurs.toLocaleString("fr-FR"), "visiteurs par semaine")}
            {chiffre(EXERCICES.exercices.toLocaleString("fr-FR"), "exercices de maths")}
          </dl>
          {/* 21/11, Frédéric : « ce que j'aimerais rajouter, c'est que des élèves
              s'entraînent le soir et parfois le matin ». ⛔ Sans pourcentage
              (« 80 % le soir » était faux, 16/11). */}
          <p className="text-sm font-bold text-slate-700">
            🌙 Des élèves s&apos;entraînent le soir, et parfois même le matin avant l&apos;école.
          </p>
        </div>
      </div>
      {/* 17/11, Frédéric : « enlève la ligne sur Tommy » → citation d'élève retirée. */}
    </div>
  );
}
