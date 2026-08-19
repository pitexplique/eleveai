// L'IDENTITÉ LÉGALE, ÉCRITE UNE FOIS.
//
// POURQUOI CE FICHIER (18/08/2026). Les mentions légales portaient déjà leur
// propre bloc `EDITEUR`, en haut de leur page. Il en faut maintenant un second
// jeu d'informations — celui du VENDEUR — et il doit apparaître aux deux
// endroits : la page qui identifie l'éditeur, et les conditions de vente.
// Deux copies d'un SIREN, c'est une copie qui vieillit. Elles lisent donc le
// même objet.
//
// ⛔ CE QUI EST VIDE ICI N'EST PAS UN OUBLI DE RÉDACTION : c'est ce que le site
// ne sait pas encore. Rien de ce qui est vide ne s'affiche « à compléter » en
// production — la page mentions légales a déjà servi ce brouillon-là. Les pages
// se lisent au contraire à l'état du bloc : tant que l'identité professionnelle
// est incomplète, les CGV se présentent comme un texte NON EN VIGUEUR, et le
// pied de page ne les propose pas.

/** L'éditeur du site, au sens de la LCEN (art. 6-III). */
export const EDITEUR = {
  nomDuSite: "EleveAI",
  nomComplet: "Frédéric Lacoste",
  directeurPublication: "Frédéric Lacoste",

  /* ⚠️ UNE SEULE ADRESSE POUR LES TROIS PAGES (18/08/2026). Les mentions
     légales donnaient `academienumerique@gmail.com`, la politique de
     confidentialité `contact@eleveai.fr` — deux adresses pour exercer les mêmes
     droits RGPD. Le site publie déjà la seconde sur /contact, /partenaires,
     /qui-sommes-nous et /pourquoi-eleveai, et Resend expédie la newsletter
     depuis elle : c'est celle-là qui fait foi.
     ⚠️ Resend n'expédie que du SORTANT : que le domaine y soit vérifié ne dit
     PAS que le courrier ENTRANT arrive. ✅ Frédéric a confirmé le 18/08/2026
     qu'il reçoit bien cette boîte. Si la redirection saute un jour, ce sont
     trois pages légales — dont l'exercice des droits RGPD — qui pointent vers
     une adresse morte : c'est la ligne à retester après tout changement DNS. */
  contact: "contact@eleveai.fr",
  contactSecours: "academienumerique@gmail.com",

  /* Tant qu'aucune vente n'est ouverte, un éditeur non professionnel n'a pas à
     publier son adresse postale : l'e-mail suffit à le rendre joignable. */
  statutSansVente:
    "Site édité à titre personnel par un enseignant, sans structure commerciale à ce jour.",
};

/* L'ENTREPRISE, QUAND ELLE VEND.
   ⚠️ En entreprise individuelle, le nom juridique est le nom civil : « Frédéric
   Lacoste », pas « EleveAI ». « EleveAI » est le nom commercial — c'est lui qui
   va dans le champ « nom commercial » de Stripe et sur le relevé bancaire du
   client, pas dans la case « raison sociale ».
   ⚠️ Le téléphone n'est pas décoratif : la vente à distance à un particulier
   l'exige (art. L221-5 du code de la consommation), au même titre que l'e-mail. */
export const VENDEUR = {
  nomJuridique: "Frédéric Lacoste",
  nomCommercial: "EleveAI",
  /* ⚠️ LA DÉNOMINATION DU STATUT EI — obligation, pas ornement. Depuis la loi
     du 14/02/2022 (art. R526-27 du code de commerce), un entrepreneur
     individuel doit faire figurer sur ses documents professionnels son nom
     précédé ou suivi IMMÉDIATEMENT de « EI » ou « entrepreneur individuel ».
     Accolé au nom, donc — pas relégué sur la ligne d'en dessous.
     C'est cette chaîne-là qui identifie le vendeur sur un devis ou une
     facture. `nomCommercial` peut la dominer en gros caractères, c'est même
     le sens d'un nom commercial : il ne la remplace jamais. */
  denominationEI: "Frédéric Lacoste EI",
  forme: "Entrepreneur individuel — micro-entrepreneur",
  siren: "399856558", // répertoire INSEE ; compte actif depuis le 16/04/2023
  /* ⚠️ L'ADRESSE PROFESSIONNELLE, PAS CELLE DU DOMICILE. L'Urssaf en connaît
     deux ; c'est l'adresse d'établissement qui se publie, et elle seule. */
  adresse: "249 avenue du Général de Gaulle, 97410 Saint-Pierre, La Réunion",
  /* Exigé dès la première vente à distance à un consommateur.
     ⚠️ Écrit en international : à La Réunion l'indicatif +262 REMPLACE le 0
     initial, il ne s'y ajoute pas. « +262 0692… » ne se compose depuis nulle
     part. En local, ce même numéro se forme 0692 74 29 58. */
  telephone: "+262 692 74 29 58",
  /* Franchise en base : pas de TVA collectée, donc prix TTC = prix HT, et cette
     mention sur chaque facture. ⛔ Ne pas activer Stripe Tax tant qu'elle vaut.
     ⚠️ Elle ne vaut que sous le seuil de chiffre d'affaires du régime micro, et
     ce seuil bouge d'une loi de finances à l'autre. Le jour où il est franchi,
     ce n'est pas une ligne de code qui change : /cgv et /mentions-legales
     affichent toutes deux cette phrase, et elles deviennent fausses ensemble. */
  mentionTva: "TVA non applicable, article 293 B du code général des impôts",
};

/* LA SIGNATURE COMMERCIALE — ⚠️ CE N'EST PAS UNE MENTION LÉGALE.
   Elle vit dans ce fichier parce que /audit et /devis la lisent tous les deux,
   et qu'une signature recopiée dérive comme un SIREN recopié. Mais elle ne
   remplace RIEN : sur un devis, le nom juridique et la forme (EI) restent
   obligatoires — un titre n'a jamais identifié un vendeur.
   `accroche` sort de /simulateur-epsilon : « activer des epsilons peut
   engendrer des infinis ». C'est la seule ligne de cette signature que
   personne d'autre ne peut écrire. */
export const SIGNATURE = {
  /* ⛔ VIDE PAR DÉCISION, PAS PAR OUBLI — même règle que le reste du fichier.
     « Coach IA » a été essayé puis écarté le 18/08/2026, pour deux raisons qui
     valent d'être gardées : le site publie DÉJÀ un produit de ce nom sur six
     routes (/coach-ia/maths, /coach-ia/francais…), destiné aux collégiens ; et
     « coach » annonce qu'on enseigne, alors que le client type ne veut pas
     apprendre — il veut déléguer.
     Tant que ce champ est vide, les documents n'affichent aucun titre : mieux
     vaut pas de ligne qu'une ligne qui vend le mauvais métier.
     Pistes du même jour : « Conseil · Réalisation · Formation » (le triptyque
     de ses années de statisticien), ou la phrase qui décrit vraiment le rôle —
     « je trouve ce que votre affaire perd, et je le corrige ». */
  titre: "",
  /* La formule sort de /simulateur-epsilon (« activer des epsilons peut
     engendrer des infinis »). La seconde moitié n'est pas un ornement : seule,
     la première est belle et opaque — un dirigeant d'hôtel ne sait pas ce
     qu'est un epsilon. La glose lui rend son sens sans rien lui retirer, et
     elle décrit le métier au mot près : un domaine cassé en HTTPS, une
     description qui parle de street art, une salle louée sous son point mort.
     Trois détails, et l'année change. */
  accroche: "Epsilon engendre l'infini — ou un détail peut tout changer",
};

export const HEBERGEUR = {
  nom: "Vercel Inc.",
  adresse: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  site: "https://vercel.com",
};

/* LE PRESTATAIRE DE PAIEMENT. Le site ne voit jamais un numéro de carte : le
   paiement se déroule chez Stripe, qui est l'entité européenne du groupe pour
   les clients de l'Union. */
export const PSP = {
  nom: "Stripe Payments Europe, Limited",
  adresse: "The One Building, 1 Grand Canal Street Lower, Dublin 2, Irlande",
};

/* LE MÉDIATEUR DE LA CONSOMMATION.
   ⛔ Obligatoire dès la première vente à un CONSOMMATEUR (art. L612-1 du code
   de la consommation) : tout professionnel doit adhérer, à ses frais, à un
   médiateur agréé, et en publier les coordonnées sur son site et dans ses CGV.
   Le défaut d'adhésion est sanctionné par une amende administrative (art.
   L641-1 : 15 000 € pour une personne physique). C'est l'obligation que presque
   tout le monde oublie, et la seule de cette liste qui coûte un abonnement.
   Vendre aux établissements et aux coopératives ne la déclenche pas — vendre
   aux familles, si. */
export const MEDIATEUR: { nom: string; site: string; adresse: string } | null =
  null;

/* L'ÉTAT DE LA VENTE.
   `ouverte` reste à false tant que le tunnel de paiement n'encaisse pas en
   réel : Stripe en mode test ne vend rien. Le jour où il encaisse, cette ligne
   passe à true ET les champs manquants ci-dessus doivent être remplis — sans
   quoi `cgvEnVigueur` refusera de présenter les CGV comme applicables. */
export const VENTE = {
  ouverte: false,
  /** Date d'entrée en vigueur de la version publiée des CGV (JJ/MM/AAAA). */
  dateEntreeEnVigueur: "",
  /** Une vente ouverte aux particuliers, et pas seulement aux établissements. */
  ouverteAuxParticuliers: false,
};

/** Ce qu'un éditeur professionnel doit publier : identité, siège, joignabilité. */
export const identiteProfessionnelleComplete: boolean = Boolean(
  VENDEUR.siren && VENDEUR.adresse
);

/* Les CGV ne sont « en vigueur » que quand elles sont complètes ET que quelque
   chose se vend. Il manque une pièce ? Le texte s'affiche en projet, personne
   n'est censé y avoir souscrit, et il ne part pas dans l'index de Google. */
export const cgvEnVigueur: boolean = Boolean(
  VENTE.ouverte &&
    VENTE.dateEntreeEnVigueur &&
    identiteProfessionnelleComplete &&
    (!VENTE.ouverteAuxParticuliers || (MEDIATEUR !== null && VENDEUR.telephone))
);

/** Ce qui reste à renseigner avant d'encaisser — lu par la page en mode projet. */
export function piecesManquantes(): string[] {
  const manque: string[] = [];
  if (!VENDEUR.siren) manque.push("le numéro SIREN de l'entreprise individuelle");
  if (!VENDEUR.adresse) manque.push("l'adresse de l'entreprise individuelle");
  if (!VENDEUR.telephone)
    manque.push("un numéro de téléphone joignable par les clients");
  if (MEDIATEUR === null)
    manque.push("l'adhésion à un médiateur de la consommation agréé");
  if (!VENTE.dateEntreeEnVigueur) manque.push("la date d'entrée en vigueur");
  return manque;
}
