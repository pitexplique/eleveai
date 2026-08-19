import type { Metadata } from "next";
import Link from "next/link";
import {
  EDITEUR,
  HEBERGEUR,
  VENDEUR,
  cgvEnVigueur,
  identiteProfessionnelleComplete,
} from "@/lib/legal/editeur";

// ─────────────────────────────────────────────────────────────────────────────
// L'IDENTITÉ DE L'ÉDITEUR.
//
// Identifier l'éditeur d'un site est une obligation (LCEN, art. 6-III) et elle
// ne dépend PAS de savoir si le site encaisse quoi que ce soit : elle vaut
// déjà, gratuit ou pas. Cette page affichait « À compléter » sur les quatre
// lignes qui comptent, sous un avertissement qu'on s'adressait à soi-même
// (« vérifier avec un professionnel du droit avant mise en ligne définitive »)
// — un brouillon parti en production.
//
// `nomComplet` est repris de ce que le site publie DÉJÀ partout ailleurs :
// /tarifs, /besoin-de-vous, /entreprises, et l'auteur des articles du blog
// (`author` du JSON-LD). Le site n'a jamais été anonyme — seule la page qui
// sert précisément à identifier l'éditeur l'était.
//
// ⚠️ LE BLOC N'EST PLUS ICI (18/08/2026). Il a déménagé dans
// `lib/legal/editeur.ts`, parce que les CGV ont besoin exactement des mêmes
// informations et qu'un SIREN recopié est un SIREN qui vieillit. La section 1
// ci-dessous a maintenant deux états : tant qu'aucune entreprise n'est
// immatriculée, elle dit la vérité d'aujourd'hui (un enseignant, à titre
// personnel, joignable par courriel) ; dès que le SIREN et l'adresse sont
// renseignés, elle passe aux mentions exigées d'un éditeur professionnel.
// L'adresse postale n'est exigible que de ce dernier : tant que ce n'est pas
// le cas, l'e-mail de contact suffit à te rendre joignable.
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales de la plateforme EleveAI, IA au service des élèves, professeurs et établissements.",
  alternates: { canonical: "https://www.eleveai.fr/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold">Mentions légales</h1>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          1. Éditeur du site
        </h2>
        <p>
          Nom du site :{" "}
          <span className="font-medium">{EDITEUR.nomDuSite}</span>
        </p>
        <p>
          Éditeur et responsable de la publication :{" "}
          {EDITEUR.nomComplet ? (
            <span className="font-medium">{EDITEUR.nomComplet}</span>
          ) : (
            <span className="italic text-amber-300">
              en cours de mise à jour — joignable à l’adresse ci-dessous
            </span>
          )}
        </p>

        {identiteProfessionnelleComplete ? (
          <>
            {/* « EI » accolé au nom : art. R526-27 du code de commerce. */}
            <p>
              {VENDEUR.denominationEI}, {VENDEUR.forme}, exerçant sous le nom
              commercial {VENDEUR.nomCommercial}.
            </p>
            <p>Adresse : {VENDEUR.adresse}</p>
            <p>SIREN : {VENDEUR.siren}</p>
            {VENDEUR.telephone && <p>Téléphone : {VENDEUR.telephone}</p>}
            <p>{VENDEUR.mentionTva}</p>
          </>
        ) : (
          <p>{EDITEUR.statutSansVente}</p>
        )}

        <p>
          Contact :{" "}
          <a
            href={`mailto:${EDITEUR.contact}`}
            className="text-sky-300 underline"
          >
            {EDITEUR.contact}
          </a>
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          2. Hébergeur du site
        </h2>
        <p>Hébergeur : {HEBERGEUR.nom}</p>
        <p>{HEBERGEUR.adresse}</p>
        <p>
          Site web :{" "}
          <a
            href={HEBERGEUR.site}
            target="_blank"
            rel="noreferrer"
            className="text-sky-300 underline"
          >
            {HEBERGEUR.site.replace("https://", "")}
          </a>
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          3. Propriété intellectuelle
        </h2>
        <p>
          Le contenu du site EleveAI (textes, vidéos, visuels, logo, éléments
          graphiques…) est protégé par le droit d’auteur. Toute reproduction,
          diffusion ou modification sans autorisation préalable est interdite.
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          4. Limitation de responsabilité
        </h2>
        <p>
          EleveAI met tout en œuvre pour fournir des informations fiables et
          à jour, mais ne peut garantir l’absence totale d’erreurs ou
          d’omissions. L’utilisation des contenus générés par l’IA reste sous
          la responsabilité des utilisateurs (élèves, professeurs,
          établissements…).
        </p>
      </section>

      <section className="mb-6 space-y-2 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-sky-300">
          5. Données personnelles
        </h2>
        <p>
          Le détail des données collectées, de leur usage et de la façon de les
          faire rectifier ou supprimer figure dans la{" "}
          <a
            href="/politique-confidentialite"
            className="text-sky-300 underline"
          >
            politique de confidentialité
          </a>
          .
        </p>
      </section>

      {cgvEnVigueur && (
        <section className="mb-6 space-y-2 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold text-sky-300">
            6. Conditions de vente
          </h2>
          <p>
            Les offres payantes, leurs prix, la durée des abonnements, le droit
            de rétractation et les modalités de réclamation figurent dans les{" "}
            <Link
              prefetch={false}
              href="/cgv"
              className="text-sky-300 underline"
            >
              conditions générales de vente
            </Link>
            .
          </p>
        </section>
      )}
      </div>
    </main>
  );
}
