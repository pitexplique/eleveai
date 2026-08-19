// CONDITIONS GÉNÉRALES DE VENTE.
//
// POURQUOI (18/08/2026). Les CGU disent comment on UTILISE le site. Elles ne
// disent rien de ce qui se passe quand quelqu'un paie : ce qu'il achète, pour
// combien de temps, comment il se rétracte, à qui il se plaint. C'est un autre
// texte, et il doit exister AVANT le premier encaissement, pas après.
//
// ⚠️ CETTE PAGE SE LIT À L'ÉTAT DU BLOC `lib/legal/editeur.ts`. Tant que
// l'identité professionnelle est incomplète ou qu'aucune vente n'est ouverte,
// elle s'annonce comme un PROJET, dit ce qui manque, et sort de l'index. Elle
// ne publie jamais un « à compléter » à la place d'une information légale.
//
// ⛔ LES PRIX NE SONT PAS RECOPIÉS ICI. Ils vivent sur /tarifs. Deux tarifs
// écrits à deux endroits, c'est un tarif faux à un des deux endroits — et
// celui qui engage, c'est celui qui était affiché au moment de la commande.
//
// ⚖️ Ce texte est rédigé au plus près du code de la consommation, mais il n'a
// pas été relu par un juriste. Les articles cités sont ceux qui s'appliquent ;
// un avocat ou un juriste consulté avant l'ouverture réelle de la vente reste
// le bon réflexe.

import type { Metadata } from "next";
import Link from "next/link";
import {
  EDITEUR,
  HEBERGEUR,
  MEDIATEUR,
  PSP,
  VENDEUR,
  VENTE,
  cgvEnVigueur,
  piecesManquantes,
} from "@/lib/legal/editeur";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente d'EleveAI : offres, prix, paiement, durée, rétractation, garanties et réclamations.",
  alternates: { canonical: "https://www.eleveai.fr/cgv" },
  /* Un texte qui n'est pas en vigueur n'a rien à faire dans les résultats de
     recherche : on n'indexe pas des conditions auxquelles personne n'a souscrit. */
  robots: cgvEnVigueur ? undefined : { index: false, follow: false },
};

function Article({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-7 space-y-2 text-sm leading-relaxed">
      <h2 className="text-lg font-semibold text-sky-300">{titre}</h2>
      {children}
    </section>
  );
}

export default function CgvPage() {
  const manquantes = piecesManquantes();

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-2xl font-semibold">
          Conditions générales de vente (CGV)
        </h1>

        {cgvEnVigueur ? (
          <p className="mb-8 text-xs text-slate-400">
            Version en vigueur depuis le {VENTE.dateEntreeEnVigueur}.
          </p>
        ) : (
          <div className="mb-8 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-100">
            <p className="font-semibold">
              Texte en préparation — aucune vente n’est ouverte à ce jour.
            </p>
            <p className="mt-2">
              Aucun paiement n’est encaissé sur ce site et personne n’a souscrit
              à ces conditions. Elles sont publiées ici à l’état de projet, pour
              être lisibles avant de l’être opposables.
            </p>
            {manquantes.length > 0 && (
              <p className="mt-2">
                Restent à établir : {manquantes.join(", ")}.
              </p>
            )}
          </div>
        )}

        <Article titre="1. Objet et champ d’application">
          <p>
            Les présentes conditions générales de vente régissent la vente des
            abonnements et services payants proposés par {VENDEUR.nomJuridique}{" "}
            sous le nom commercial {VENDEUR.nomCommercial}, sur le site
            www.eleveai.fr (ci-après « le Service »).
          </p>
          <p>
            Elles s’appliquent à toute commande, à l’exclusion de tout autre
            document. Le fait de passer commande emporte acceptation pleine et
            entière des présentes. L’usage du site lui-même, y compris dans ses
            parties gratuites, reste régi par les{" "}
            <Link prefetch={false} href="/cgu" className="text-sky-300 underline">
              conditions générales d’utilisation
            </Link>
            .
          </p>
          <p>
            Dans ce texte, le « Client » désigne la personne qui passe commande.
            Il est dit « Consommateur » lorsqu’il agit à des fins qui n’entrent
            pas dans le cadre d’une activité professionnelle — typiquement un
            parent achetant pour son enfant. Il est dit « Professionnel » dans
            les autres cas : établissement scolaire, collectivité, coopérative
            scolaire, foyer socio-éducatif, association, entreprise. Plusieurs
            articles ci-dessous ne bénéficient qu’au Consommateur ; ils le
            précisent.
          </p>
        </Article>

        <Article titre="2. Identité du vendeur">
          {VENDEUR.siren ? (
            <>
              <p>
                {VENDEUR.denominationEI}, {VENDEUR.forme}, exerçant sous le
                nom commercial {VENDEUR.nomCommercial}.
              </p>
              <p>{VENDEUR.adresse}</p>
              <p>SIREN : {VENDEUR.siren}</p>
              {VENDEUR.telephone && <p>Téléphone : {VENDEUR.telephone}</p>}
              <p>
                Courriel :{" "}
                <a
                  href={`mailto:${EDITEUR.contact}`}
                  className="text-sky-300 underline"
                >
                  {EDITEUR.contact}
                </a>
              </p>
              <p>{VENDEUR.mentionTva}</p>
            </>
          ) : (
            <p>
              Aucune structure commerciale n’est immatriculée à ce jour et aucune
              vente n’est ouverte. L’identité de l’éditeur du site figure dans les{" "}
              <Link
                prefetch={false}
                href="/mentions-legales"
                className="text-sky-300 underline"
              >
                mentions légales
              </Link>
              .
            </p>
          )}
          <p>
            Le site est hébergé par {HEBERGEUR.nom}, {HEBERGEUR.adresse}.
          </p>
        </Article>

        <Article titre="3. Services proposés">
          <p>
            Le Service donne accès, pour la durée souscrite, aux contenus et aux
            outils pédagogiques d’EleveAI : parcours d’entraînement, coach,
            évaluations, tableaux de suivi et ressources associées, selon
            l’offre retenue.
          </p>
          <p>
            Les offres, leur périmètre et leurs conditions d’éligibilité sont
            décrits sur la page{" "}
            <Link
              prefetch={false}
              href="/tarifs"
              className="text-sky-300 underline"
            >
              Tarifs
            </Link>
            . Le Service est fourni par accès en ligne : aucun bien matériel
            n’est livré et aucun logiciel n’est cédé.
          </p>
          <p>
            EleveAI est un service d’accompagnement pédagogique. Il ne se
            substitue ni à l’enseignement dispensé en classe, ni à un diplôme, ni
            à une préparation officielle à un examen, et n’emporte aucune
            garantie de résultat scolaire.
          </p>
        </Article>

        <Article titre="4. Prix">
          <p>
            Les prix applicables sont ceux affichés sur la page{" "}
            <Link
              prefetch={false}
              href="/tarifs"
              className="text-sky-300 underline"
            >
              Tarifs
            </Link>{" "}
            au jour de la commande, et repris dans le récapitulatif présenté au
            Client avant paiement. Ils sont exprimés en euros.
          </p>
          <p>
            {VENDEUR.mentionTva} : les prix affichés sont des prix nets, sans
            TVA à ajouter. Si le vendeur venait à devenir redevable de la TVA,
            les prix en cours des abonnements souscrits ne seraient pas modifiés
            avant leur échéance.
          </p>
          <p>
            Les prix peuvent être modifiés à tout moment pour l’avenir. Une
            modification est sans effet sur les commandes déjà passées : le prix
            payé vaut pour toute la période souscrite.
          </p>
        </Article>

        <Article titre="5. Commande">
          <p>
            La commande se déroule en ligne. Avant de la valider, le Client
            dispose du détail de l’offre, du prix total à payer et de la durée
            de l’abonnement, et peut corriger sa saisie. La validation du
            paiement vaut acceptation de la commande et des présentes
            conditions.
          </p>
          <p>
            Un courriel de confirmation, valant facture, est adressé au Client.
            Pour les établissements et les collectivités, la commande peut
            également être passée sur devis, et réglée par virement ou par
            mandat administratif selon les modalités convenues.
          </p>
          <p>
            Le vendeur se réserve le droit de refuser une commande manifestement
            anormale, frauduleuse, ou émanant d’un Client avec lequel un litige
            de paiement est en cours.
          </p>
        </Article>

        <Article titre="6. Paiement">
          <p>
            Les paiements par carte bancaire sont traités par {PSP.nom} (
            {PSP.adresse}), prestataire de services de paiement. Les données de
            carte sont saisies sur l’interface sécurisée de ce prestataire :
            elles ne transitent pas par EleveAI, qui ne les conserve à aucun
            moment.
          </p>
          <p>
            Le paiement est exigible à la commande, sauf facturation sur devis
            convenue avec un Professionnel. Entre professionnels, sauf accord
            différent, les factures sont payables à trente jours ; tout retard
            entraîne de plein droit des pénalités au taux d’intérêt de la Banque
            centrale européenne majoré de dix points, ainsi qu’une indemnité
            forfaitaire de recouvrement de 40 € (art. L441-10 du code de
            commerce).
          </p>
        </Article>

        <Article titre="7. Mise à disposition des accès">
          <p>
            Les accès sont ouverts dès la validation du paiement, ou dès
            réception du bon de commande pour les commandes sur devis. Pour les
            offres collectives, l’ouverture des comptes élèves suppose la
            transmission par l’établissement des informations nécessaires à leur
            création ; le délai court à compter de cette transmission.
          </p>
          <p>
            Le Service est accessible en ligne, sans installation. Il requiert
            une connexion internet et un navigateur à jour, qui restent à la
            charge du Client.
          </p>
        </Article>

        <Article titre="8. Durée de l’abonnement">
          <p>
            L’abonnement est souscrit pour la durée indiquée lors de la commande
            — en règle générale une année scolaire ou une année de date à date.
          </p>
          <p>
            Il ne fait l’objet d’aucune reconduction tacite : à son terme,
            l’accès prend fin, sauf nouvelle commande du Client. Aucun
            prélèvement n’intervient sans une nouvelle commande de sa part.
          </p>
        </Article>

        <Article titre="9. Droit de rétractation du Consommateur">
          <p>
            Le Consommateur dispose d’un délai de quatorze jours à compter de la
            conclusion du contrat pour exercer son droit de rétractation, sans
            avoir à motiver sa décision ni à supporter de frais (art. L221-18 du
            code de la consommation).
          </p>
          <p>
            Pour l’exercer, il suffit d’adresser une déclaration dénuée
            d’ambiguïté à{" "}
            <a
              href={`mailto:${EDITEUR.contact}`}
              className="text-sky-300 underline"
            >
              {EDITEUR.contact}
            </a>
            , ou d’utiliser le formulaire type reproduit à l’article 15. Le
            remboursement intervient au plus tard quatorze jours après réception
            de la demande, par le même moyen de paiement que celui utilisé lors
            de la commande.
          </p>
          {/* ⛔ CET ARTICLE PROMET PLUS QUE LA LOI, ET C'EST VOULU (19/08/2026).
              La loi autorise le vendeur d'un contenu numérique à faire RENONCER
              le consommateur à sa rétractation en échange d'un accès immédiat
              (art. L221-28, 13°) : c'est ce que faisait la version précédente
              de cet article. Frédéric a tranché l'inverse — « si pas content au
              bout de 14 jours, on rembourse ». Une famille qui ouvre le coach
              le soir même garde donc ses quatorze jours entiers.
              ⚠️ Écrit ici, ce n'est plus un geste commercial mais un engagement
              OPPOSABLE : on ne peut plus le retirer à une famille qui a
              commandé sous cette version. Ne jamais l'affaiblir sans changer la
              date d'entrée en vigueur des CGV.
              ⚠️ Stripe ne restitue pas sa commission sur un remboursement :
              chaque rétractation coûte la part fixe + le pourcentage. À
              quelques euros d'abonnement, c'est négligeable — mais ce n'est pas
              zéro, et ça se déduit du CA déclaré à l'Urssaf. */}
          <p className="rounded-lg border border-slate-700 bg-slate-900/50 p-3">
            <span className="font-semibold text-slate-100">
              Accès immédiat, sans renonciation.
            </span>{" "}
            Le Service est un contenu numérique fourni sans support matériel :
            la loi permettrait de subordonner son ouverture immédiate à la
            renonciation du Consommateur à son droit de rétractation (art.
            L221-28, 13° du code de la consommation). {VENDEUR.nomCommercial} ne
            le demande pas. L’accès est ouvert dès la commande et le délai de
            quatorze jours court en entier. Si, dans ce délai, le Consommateur
            n’est pas satisfait, l’intégralité des sommes versées lui est
            remboursée — sans motif à donner, et sans que l’usage déjà fait du
            Service y change quoi que ce soit.
          </p>
          <p>
            Cet article ne s’applique pas aux Professionnels, qui ne bénéficient
            pas du droit de rétractation.
          </p>
        </Article>

        <Article titre="10. Garanties légales">
          <p>
            Le Consommateur bénéficie de la garantie légale de conformité des
            contenus et services numériques (art. L224-25-12 et suivants du code
            de la consommation). Le fournisseur est tenu de livrer un contenu
            conforme au contrat et répond des défauts de conformité qui
            apparaissent pendant la durée de fourniture du Service.
          </p>
          <p>
            En cas de défaut de conformité, le Consommateur peut en exiger la
            mise en conformité sans frais et, si celle-ci est impossible ou
            n’intervient pas dans un délai raisonnable, obtenir une réduction du
            prix ou la résolution du contrat. Ces droits s’exercent sans
            préjudice de la garantie des vices cachés (art. 1641 et suivants du
            code civil).
          </p>
        </Article>

        <Article titre="11. Disponibilité et responsabilité">
          <p>
            Le vendeur s’engage à mettre en œuvre les moyens raisonnables pour
            assurer la disponibilité du Service. Des interruptions peuvent
            survenir pour maintenance, mise à jour, ou du fait d’un tiers
            (hébergeur, fournisseur d’accès, service d’intelligence
            artificielle) ; elles sont annoncées lorsqu’elles sont prévisibles.
          </p>
          <p>
            Les contenus produits par l’intelligence artificielle sont des aides
            pédagogiques : ils peuvent comporter des erreurs et doivent être
            relus. Le vendeur ne garantit ni l’exactitude de chaque réponse
            générée, ni les résultats scolaires obtenus.
          </p>
          <p>
            En cas d’indisponibilité prolongée et imputable au vendeur, la
            réparation due au Client est limitée au remboursement de la fraction
            de l’abonnement correspondant à la période d’indisponibilité. Cette
            limitation ne s’applique ni en cas de faute lourde ou dolosive, ni
            aux dommages corporels.
          </p>
        </Article>

        <Article titre="12. Propriété intellectuelle et usage des contenus">
          <p>
            L’abonnement confère un droit d’usage personnel, non exclusif et non
            transférable, limité à la durée souscrite et au périmètre de l’offre
            — un élève, une classe ou un établissement selon le cas.
          </p>
          <p>
            Les contenus imprimables (fiches, guides, cahiers) peuvent être
            reproduits pour les besoins pédagogiques du périmètre souscrit.
            Toute mise à disposition hors de ce périmètre, toute revente et
            toute réutilisation commerciale sont interdites sans autorisation
            écrite préalable.
          </p>
        </Article>

        <Article titre="13. Résiliation">
          <p>
            En cas de manquement grave d’une partie à ses obligations, non
            réparé dans un délai de quinze jours après une mise en demeure
            adressée par courriel, l’autre partie peut résilier le contrat de
            plein droit.
          </p>
          <p>
            La résiliation par le vendeur pour un manquement du Client — usage
            interdit par les conditions générales d’utilisation, partage des
            accès hors du périmètre souscrit, défaut de paiement — n’ouvre droit
            à aucun remboursement. Dans les autres cas, la fraction
            d’abonnement non consommée est remboursée au prorata.
          </p>
        </Article>

        <Article titre="14. Réclamations et médiation">
          <p>
            Toute réclamation peut être adressée à{" "}
            <a
              href={`mailto:${EDITEUR.contact}`}
              className="text-sky-300 underline"
            >
              {EDITEUR.contact}
            </a>
            . Une réponse est apportée dans les meilleurs délais.
          </p>
          {MEDIATEUR ? (
            <>
              <p>
                Conformément à l’article L612-1 du code de la consommation, le
                Consommateur qui n’a pas obtenu satisfaction après une
                réclamation écrite peut recourir gratuitement au médiateur de la
                consommation dont relève le vendeur :
              </p>
              <p className="rounded-lg border border-slate-700 bg-slate-900/50 p-3">
                {MEDIATEUR.nom}
                <br />
                {MEDIATEUR.adresse}
                <br />
                <a
                  href={MEDIATEUR.site}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-300 underline"
                >
                  {MEDIATEUR.site}
                </a>
              </p>
              <p>
                La saisine du médiateur suppose d’avoir tenté au préalable de
                résoudre le litige directement auprès du vendeur, par une
                réclamation écrite.
              </p>
            </>
          ) : (
            <p>
              Aucune vente aux particuliers n’étant ouverte à ce jour, aucun
              médiateur de la consommation n’est encore désigné. Ses coordonnées
              figureront ici avant la première vente à un Consommateur.
            </p>
          )}
        </Article>

        <Article titre="15. Formulaire type de rétractation">
          <p>
            À compléter et renvoyer si le Consommateur souhaite se rétracter du
            contrat. Aucune renonciation n’est demandée à l’ouverture du Service
            (article 9) : ce formulaire reste donc utilisable pendant les
            quatorze jours, y compris par un Consommateur qui s’est déjà servi
            du Service. Un simple message à {EDITEUR.contact} suffit également.
          </p>
          <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 text-sm italic leading-relaxed text-slate-300">
            <p>
              À l’attention de {VENDEUR.denominationEI}
              {VENDEUR.adresse ? `, ${VENDEUR.adresse}` : ""} —{" "}
              {EDITEUR.contact} :
            </p>
            <p className="mt-2">
              Je vous notifie par la présente ma rétractation du contrat portant
              sur la prestation de services ci-dessous :
            </p>
            <p className="mt-2">
              Commandé le : …………… — Nom du Consommateur : …………… — Adresse du
              Consommateur : …………… — Date : ……………
            </p>
            <p className="mt-2">
              Signature (uniquement en cas de notification sur papier) : ……………
            </p>
          </div>
        </Article>

        <Article titre="16. Données personnelles">
          <p>
            Les données collectées à l’occasion d’une commande sont traitées
            dans les conditions décrites par la{" "}
            <Link
              prefetch={false}
              href="/politique-confidentialite"
              className="text-sky-300 underline"
            >
              politique de confidentialité
            </Link>
            , qui précise les finalités, les durées de conservation et la façon
            d’exercer ses droits.
          </p>
        </Article>

        <Article titre="17. Modification des conditions">
          <p>
            Les présentes conditions peuvent être modifiées. La version
            applicable à une commande est celle en vigueur au jour où elle est
            passée ; une modification ultérieure est sans effet sur les
            abonnements en cours.
          </p>
        </Article>

        <Article titre="18. Droit applicable et litiges">
          <p>
            Les présentes conditions sont soumises au droit français et rédigées
            en langue française.
          </p>
          <p>
            En cas de litige, une solution amiable est recherchée en priorité.
            À défaut, le Consommateur peut saisir la juridiction de son choix
            parmi celles prévues par le code de procédure civile, notamment
            celle du lieu où il demeurait au moment de la conclusion du contrat.
            Les litiges avec un Professionnel relèvent des tribunaux compétents
            dans le ressort du siège du vendeur.
          </p>
        </Article>
      </div>
    </main>
  );
}
