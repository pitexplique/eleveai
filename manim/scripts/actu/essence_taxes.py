# essence_taxes.py
# EleveAI — LES SHORTS « Qui a raison ? » sur le prix de l'essence.
#
# ⭐ LES TITRES, arrêtés par Frédéric le 17/09 (« dans le titre il doit y avoir
# prix de l'essence et quelle stratégie adoptée ») :
#   short 1 : « Prix de l'essence : +50 centimes en 8 mois, quelle stratégie ? »
#   short 2 : « Prix de l'essence : la stratégie qui marche vraiment en Europe »
# ⚠️ Le fil tronque autour de 40 signes : ici le retournement (« +50 centimes »)
# tombe au signe 21, donc il passe ; « quelle stratégie ? » est coupé, et c'est
# assumé — c'est la PROMESSE, pas l'accroche. Elle oblige en revanche le short à
# tenir parole, d'où l'écran de fin sur les leviers et non sur les pourcentages.
#
# ── POURQUOI CETTE VIDÉO (17/09/2026) ─────────────────────────────────────────
# Frédéric l'avait proposée le 12/09 ; je l'avais écartée comme « sujet
# permanent ». Ce n'en est plus un : l'essence a pris CINQUANTE CENTIMES en huit
# mois (1,683 € le 5 janvier, 2,172 € le 14 septembre). Frédéric, le 17/09 :
# « aujourd'hui en France c'est un vrai pb ». Le ton de la vidéo en découle —
# c'est du pouvoir d'achat, pas une curiosité de pourcentages.
#
# ⛔⛔ AUCUN NOM DE RESPONSABLE POLITIQUE. Ni parti, ni ministre, ni candidat,
# ni élu local — dans le titre, l'écran, la voix, la vignette ou les tags. C'est
# la règle née de la vidéo sondages, et elle vaut DOUBLE ici : « les taxes » est
# le sujet le plus inflammable de la rubrique. On garde les PAYS, les
# INSTITUTIONS et les MONTANTS, qui sont la partie vérifiable.
# ⛔ Et on ne répond pas à « que feriez-vous à leur place ? » : on chiffre ce que
# coûte chaque levier, et le spectateur tranche. Une chaîne d'élèves qui donne
# son avis politique est une chaîne morte.
#
# ── ⛔ LE PIÈGE DE TON, ET COMMENT IL EST DÉSAMORCÉ ────────────────────────────
# Le fait le plus frappant de la série est que la PART des taxes a chuté de neuf
# points cette année. Ouvrir là-dessus serait une faute : à 2,17 € le litre,
# « rassurez-vous, les taxes pèsent moins » sonne comme une défense de l'État et
# donne raison à personne. Le paradoxe reste — mais comme OUTIL DE LECTURE au
# milieu du short, pas comme propos. Le propos est : où vont ces 2,17 €, et quel
# levier donne quoi.
#
# ── ⭐ LES CHIFFRES, ET LEUR SOURCE (chacun va dans la description) ────────────
# SOURCE PRIMAIRE : Bulletin pétrolier hebdomadaire de la Commission européenne,
# relevé du 14/09/2026, Euro-super 95 (« Reproduction is authorised provided the
# source is acknowledged »). Fichier « Prices History », feuilles « Prices with
# taxes » et « Prices wo taxes ».
#
#   France, Euro-super 95, 14/09/2026 :  2,172 €/L
#     hors taxes (brut + raffinage + distribution) 1,120 €  51,6 %
#     accise (montant FIXE)                        0,690 €  31,8 %
#     TVA 20 %                                     0,362 €  16,7 %
#     taxes au total                               1,052 €  48,4 %
#
# ⭐ DEUX VÉRIFICATIONS CROISÉES, faites avant d'animer quoi que ce soit :
#   1. la TVA vaut EXACTEMENT 1/6 du prix TTC aux deux dates testées (c'est ce
#      que doit donner un taux de 20 % : 0,20/1,20 = 1/6) ;
#   2. l'accise qu'on en déduit tombe sur 0,690 €, soit le barème officiel
#      français 2026 de 69,02 c€/L pour l'essence SP95-E5, au centime près.
#   Le bulletin européen et le barème français se confirment mutuellement : les
#   chiffres ne viennent pas d'un article de presse.
#
# ⚠️ E5 ET E10 NE SONT PAS LE MÊME CARBURANT. Le bulletin européen cote
# l'Euro-super 95 (E5, accise 69,02 c€/L). Le plus vendu en France est le
# SP95-E10 (accise 67,02 c€/L), à 2,164 €/L le 17/09 selon le flux du ministère.
# TOUTE LA VIDÉO RESTE EN E5 : c'est la seule base homogène entre pays, et
# mélanger les deux ferait mentir la comparaison de dix centimes.
#
# ⭐ LE PARADOXE (même source, même carburant, même pays) :
#   05/01/2026 : 1,683 €  taxes 0,971 €  57,7 %
#   14/09/2026 : 2,172 €  taxes 1,052 €  48,4 %
#   La taxe a AUGMENTÉ de 8 centimes et sa part a PERDU 9,3 points — parce que
#   l'accise est un montant fixe et que seule la TVA suit le prix. Numérateur en
#   hausse, dénominateur en hausse plus forte.
#
# ⭐ LE LEVIER, CALCULÉ : baisser l'accise de 10 centimes baisse le prix de 12,
#   parce que la TVA de 20 % s'applique AUSSI sur l'accise. Vérification :
#   (1,120 + 0,690) × 1,2 = 2,172  et  (1,120 + 0,590) × 1,2 = 2,052.
#
# ⭐ LES PAYS (même relevé du 14/09, Euro-super 95) :
#   Malte     1,340 €  56,3 % de taxes  ← le PLUS taxé, le MOINS cher
#   Suède     1,514 €  29,2 %           ← le MOINS taxé
#   Espagne   1,867 €  40,0 %
#   France    2,172 €  48,4 %
#   Pays-Bas  2,434 €  52,2 %
#   ⭐ Malte est à 1,340 € SANS BOUGER D'UN CENTIME depuis 2022, hors taxes figé
#   à 0,586 € semaine après semaine : c'est un prix administré, pas une anomalie
#   de saisie (vérifié sur tout l'historique avant de le mettre à l'écran).
#   👉 La part des taxes ne dit RIEN du prix payé.
#
# ⭐ LA RÉUNION — le cas français (arrêtés préfectoraux mensuels, guide-reunion) :
#   septembre 2026 : sans-plomb 1,83 €/L, gazole 1,68 €/L
#   août 2026      : sans-plomb 1,78 €/L, gazole 1,55 €/L
#   Ni TVA ni TICPE : octroi de mer + TSC régionale, et un prix MAXIMUM fixé
#   chaque mois par le préfet. 34 centimes sous la métropole, même carburant,
#   même pays.
#   ⚠️ LE CONTREPOINT QUI REND LA VIDÉO HONNÊTE (règle de la rubrique : les
#   chiffres ne donnent pas toujours raison à la voix dissonante) : le prix
#   administré AMORTIT, il ne protège pas. Il a quand même monté de 5 centimes
#   en un mois, la consommation s'est effondrée à 379 730 hL en mai (−33 % sur
#   mars, plus bas depuis 2020) et les recettes de TSCC ont perdu 7,1 M€ en un
#   mois pour la Région, le Département et les communes réunis.
#
# ⛔ CE QUE LA VIDÉO NE DIT PAS, ET POURQUOI :
#   — Aucun chiffrage du coût budgétaire d'une baisse d'accise. La feuille
#     « Consumption » du bulletin européen donne la France à 2,1 milliards de
#     litres d'essence par an, soit 2,7 % de l'UE quand elle en pèse environ
#     12 % : le chiffre est incohérent, donc il ne sert pas.
#   — Aucune séparation « raffineur / distributeur » à l'intérieur du hors
#     taxes. Diviser un baril par 159 donne le coût d'un litre DE BRUT, pas d'un
#     litre d'essence : un baril ne produit pas que de l'essence. On dit « hors
#     taxes », qui est exactement ce que le bulletin mesure.
#
# Rendu :
#   python -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/actu/essence_taxes.py EssenceShortLitre -o brouillon --media_dir manim/scripts/actu/media
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/actu/essence_taxes.py EssenceShortLitre -o eleveai-maths-actu-essence-short-litre --media_dir manim/scripts/actu/media
#   (idem EssenceShortPays)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import NotionBases, ShortBases
from gabarit_seconde import SONS

VOIX = SONS / "actu-essence"
VOIX_LITRE = SONS / "actu-essence-short-litre"
VOIX_PAYS = SONS / "actu-essence-short-pays"

# ── Les chiffres, une seule fois, pour que l'écran et le calcul ne divergent pas
PRIX = 2.172          # France, Euro-super 95, 14/09/2026
HORS_TAXES = 1.120
ACCISE = 0.690
TVA = PRIX - HORS_TAXES - ACCISE          # 0,362 — calculée, pas recopiée
PRIX_JANVIER = 1.683
TAXES_JANVIER = 0.971

# (pays, prix TTC, part de taxes en %) — relevé du 14/09/2026, Euro-super 95.
# ⭐ CINQ PAYS, choisis par Frédéric le 17/09. L'Allemagne a remplacé les
# Pays-Bas (2,434 €, 52,2 %), qui jouaient le même rôle de « plus cher » : un
# voisin que le public situe, et qu'il a nommé lui-même.
# ⛔ L'ordre est celui du PRIX, décroissant — pas celui de la part de taxes.
# C'est ce qui fait voir Malte, dernier en prix et premier en part.
PAYS = [
    ("Allemagne", 2.357, 50.0),
    ("France", 2.172, 48.4),
    ("Espagne", 1.867, 40.0),
    ("Suède", 1.514, 29.2),
    ("Malte", 1.340, 56.3),
]

# ⭐⭐ LA DÉMONSTRATION, à l'intérieur du panorama (Frédéric : « France Espagne
# Allemagne, des pays proches »). France et Espagne achètent le carburant au
# MÊME PRIX AU CENTIME PRÈS — 1,120 € hors taxes le 14/09 — en partant de 0,712
# et 0,716 en janvier. La hausse mondiale les a frappées à l'identique (+0,408
# et +0,404). Les 30 centimes d'écart à la pompe sont donc ENTIÈREMENT fiscaux :
# 1,052 € de taxes en France, 0,747 € en Espagne. Ce n'est ni le pétrole, ni le
# raffineur, ni le distributeur — et ça, ça se décide.
HT_COMMUN = 1.120     # France ET Espagne, 14/09/2026
TAXES_ES = 0.747
PRIX_ES = 1.867

REUNION = 1.83        # sans-plomb, arrêté préfectoral de septembre 2026


class _Essence:
    """⭐ L'OBJET QUI PORTE TOUTE LA SÉRIE : une barre = un litre.

    Frédéric, 17/09 : « prépare un graphique que les gens comprennent, style
    barre ». Tout passe par ici — la décomposition, la comparaison des mois, la
    comparaison des pays. Une seule échelle pour toutes les barres de la vidéo :
    c'est ce qui permet de comparer DEUX barres sans lire un seul chiffre.
    """

    # 1 euro vaut tant d'unités Manim en hauteur, et tant en largeur.
    HAUT_EURO = 1.30
    LARG_EURO = 1.35

    def tranche(self, montant, largeur, couleur, opacite=0.9):
        return Rectangle(width=largeur, height=montant * self.HAUT_EURO,
                         stroke_width=1.5, stroke_color=BLACK,
                         fill_color=couleur, fill_opacity=opacite)

    def colonne(self, parts, largeur=1.15, bas=0.0, x=0.0):
        """Une barre VERTICALE empilée, du bas vers le haut.

        `parts` = [(montant, couleur), ...]. Rend le VGroup des tranches, dans
        l'ordre donné — l'appelant les fait apparaître une par une.

        ⭐ Vertical et non horizontal : dans un cadre 9:16, la hauteur est la
        ressource abondante (8 unités contre 4,5), et une tranche de 16 % reste
        lisible verticalement là où elle ferait 0,6 unité en largeur.
        """
        g = VGroup()
        y = bas
        for montant, couleur in parts:
            r = self.tranche(montant, largeur, couleur)
            r.move_to([x, y + r.height / 2, 0])
            y += r.height
            g.add(r)
        return g

    def etiquette(self, rect, texte, valeur, couleur, font_size=21, cote=RIGHT):
        """Le nom et le montant d'une tranche, posés À CÔTÉ d'elle.

        ⛔ JAMAIS DANS la tranche : la TVA fait 0,47 unité de haut, un texte de
        taille 21 en fait 0,3 — ça tient au pixel près et ça déborde dès que le
        montant change. Dehors, avec un trait de rappel, ça tient toujours.
        """
        bloc = VGroup(
            Text(texte, font_size=font_size, color=WHITE),
            Text(valeur, font_size=font_size + 5, color=couleur),
        ).arrange(DOWN, buff=0.06, aligned_edge=LEFT if cote is RIGHT else RIGHT)
        bloc.next_to(rect, cote, buff=0.30)
        trait = Line(rect.get_edge_center(cote), bloc.get_edge_center(-cote),
                     color=couleur, stroke_width=2, stroke_opacity=0.55)
        return VGroup(trait, bloc)

    # Une seule échelle horizontale pour TOUTES les barres de pays : sans elle,
    # comparer deux écrans ne veut rien dire.
    VMAX = 2.45
    LARG_MAX = 1.72

    def barre_pays(self, prix, part, hauteur=0.32, couleur=BLEU_CALCUL):
        """Une barre HORIZONTALE coupée en deux : hors taxes, puis taxes.

        ⭐ C'est le seul dessin qui montre d'un coup POURQUOI la part ne dit pas
        le prix : la LONGUEUR est le prix, la COULEUR dit la part.
        """
        larg = self.LARG_MAX * prix / self.VMAX
        return self._duo(larg * (1 - part / 100.0), larg * part / 100.0,
                         hauteur, couleur)

    def barre_ht_taxes(self, hors_taxes, taxes, hauteur=0.38, couleur=BLEU_CALCUL):
        """La même barre, mais décrite par ses DEUX MONTANTS.

        ⭐ C'est elle qui porte la démonstration France / Espagne : on dessine
        d'abord les deux parties bleues — rigoureusement identiques, 1,120 € des
        deux côtés — puis on laisse l'orange les allonger différemment. La preuve
        est dans l'image, sans un chiffre à lire.
        """
        e = self.LARG_MAX / self.VMAX
        return self._duo(hors_taxes * e, taxes * e, hauteur, couleur)

    def _duo(self, l_bleu, l_orange, hauteur, couleur):
        bleu = Rectangle(width=max(0.02, l_bleu), height=hauteur,
                         stroke_width=0, fill_color=couleur, fill_opacity=0.85)
        orange = Rectangle(width=max(0.02, l_orange), height=hauteur,
                           stroke_width=0, fill_color=ORANGE_RETENUE, fill_opacity=0.9)
        return VGroup(bleu, orange).arrange(RIGHT, buff=0)

    def rang(self, nom, corps, valeur, coul_val=WHITE, f_nom=19, f_val=20):
        """Une ligne « nom | barre | prix » — l'unité du graphique en barres."""
        return VGroup(
            Text(nom, font_size=f_nom, color=WHITE),
            corps,
            Text(valeur, font_size=f_val, color=coul_val),
        ).arrange(RIGHT, buff=0.12)

    def aligner(self, rangs):
        """⛔ Les barres doivent PARTIR DU MÊME X, sinon la comparaison ment.
        `arrange(DOWN, aligned_edge=LEFT)` aligne les LIGNES, pas les barres :
        une ligne « Malte » est plus courte que « Allemagne », et sa barre
        démarrait 0,3 unité plus à gauche — soit 40 centimes d'essence."""
        larg = max(r[0].width for r in rangs)
        for r in rangs:
            r[1].shift(RIGHT * (larg - r[0].width))
            r[2].shift(RIGHT * (larg - r[0].width))
        return rangs


# ══════════════════════════════════════════════════════════════════════════════
#  LA VIDÉO PAYSAGE
# ══════════════════════════════════════════════════════════════════════════════

class EssenceLongue(NotionBases, _Essence):
    """Les deux shorts réunis, plus ce que seul un format long permet : le
    calcul du levier posé en entier, et un défi que le spectateur peut faire.

    ⛔ LES ÉCHELLES SONT SURCHARGÉES ICI. Les constantes de `_Essence` sont
    calibrées pour le cadre 9:16 (4,5 de large) ; en paysage on dispose de 14,2
    et de 8 de haut. Laisser les valeurs du short donnerait des barres minuscules
    perdues au centre — une barre ne dit quelque chose que si elle occupe
    l'écran.
    """

    dossier_voix = VOIX
    identite = "Prix de l'essence · EleveAI"

    HAUT_EURO = 1.45
    LARG_EURO = 1.35
    LARG_MAX = 5.20
    VMAX = 2.45

    def ecran_flambee(self):
        """Le problème, d'abord. Pas le paradoxe — le problème."""
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("01-flambee")
        self.play(Write(Text("Huit mois", font_size=46, color=JAUNE_TITRE).to_edge(UP)))

        # ⛔ LE BAS DE L'ÉCRAN EST DISPUTÉ. Avec `bas = −2,60`, les étiquettes des
        # colonnes tombaient à −3,35 et la chute, que `chute()` pose à −3,3,
        # s'écrivait PAR-DESSUS : « un plein de 50 litres » et « 5 janvier » se
        # chevauchaient, illisibles. Les colonnes remontent pour laisser la bande
        # basse à la chute.
        bas = -1.80
        c1 = self.colonne([(PRIX_JANVIER, BLEU_CALCUL)], largeur=1.5, bas=bas, x=-3.2)
        c2 = self.colonne([(PRIX, BLEU_CALCUL)], largeur=1.5, bas=bas, x=0.6)
        for col, x, nom, prix in ((c1, -3.2, "5 janvier", "1,68 €"),
                                  (c2, 0.6, "14 septembre", "2,17 €")):
            self.play(GrowFromEdge(col, DOWN), run_time=0.8)
            bloc = VGroup(Text(nom, font_size=26, color=WHITE),
                          Text(prix, font_size=40, color=BLEU_CALCUL)
                          ).arrange(DOWN, buff=0.10).move_to([x, bas - 0.62, 0])
            self.play(FadeIn(bloc), run_time=0.4)

        # L'écart, dessiné : un crochet entre les deux sommets.
        y1, y2 = bas + PRIX_JANVIER * self.HAUT_EURO, bas + PRIX * self.HAUT_EURO
        trait = DashedLine([-3.2, y1, 0], [2.6, y1, 0], color=GREY_B, stroke_width=2)
        fleche = Arrow([2.15, y1, 0], [2.15, y2, 0], buff=0, color=ROUGE_ERREUR,
                       stroke_width=6, max_tip_length_to_length_ratio=0.28)
        ecart = Text("+ 50 centimes", font_size=40, color=ROUGE_ERREUR)
        ecart.next_to(fleche, RIGHT, buff=0.30)
        self.play(Create(trait), run_time=0.5)
        self.play(GrowArrow(fleche), FadeIn(ecart, shift=RIGHT * 0.2))
        self.play(Flash(ecart, color=ROUGE_ERREUR, line_length=0.35))

        self.play(Write(self.chute("un plein de 50 litres : 25 € de plus",
                                   color=JAUNE_TITRE, font_size=32)))
        self.attendre_voix()

    def ecran_litre(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("02-litre")
        self.play(Write(Text("Un litre, trois parts", font_size=46,
                             color=JAUNE_TITRE).to_edge(UP)))

        # ⛔ UNE SEULE LIGNE PAR TRANCHE. En deux lignes, l'étiquette faisait
        # 0,75 unité de haut pour une tranche de TVA qui n'en fait que 0,52 :
        # « la TVA » et « l'accise » se marchaient dessus. La hauteur d'une
        # étiquette doit tenir dans la tranche qu'elle nomme, sinon elle
        # empiète sur la voisine.
        col = self.colonne([(HORS_TAXES, BLEU_CALCUL), (ACCISE, ORANGE_RETENUE),
                            (TVA, ROUGE_ERREUR)], largeur=1.5, bas=-2.60, x=-3.9)
        legendes = [("le carburant", "1,12 €", "51,6 %", BLEU_CALCUL),
                    ("l'accise", "0,69 €", "31,8 %", ORANGE_RETENUE),
                    ("la TVA", "0,36 €", "16,7 %", ROUGE_ERREUR)]
        for rect, (nom, val, part, coul) in zip(col, legendes):
            self.play(GrowFromEdge(rect, DOWN), run_time=0.55)
            bloc = VGroup(
                Text(nom, font_size=27, color=WHITE),
                Text(val, font_size=30, color=coul),
                Text(part, font_size=30, color=coul),
            ).arrange(RIGHT, buff=0.55)
            bloc.next_to(rect, RIGHT, buff=0.55)
            trait = Line(rect.get_right(), bloc.get_left(), color=coul,
                         stroke_width=2, stroke_opacity=0.5)
            self.play(Create(trait), FadeIn(bloc, shift=RIGHT * 0.15), run_time=0.5)

        total = Text("2,17 €", font_size=44, color=WHITE)
        total.next_to(col, UP, buff=0.30)
        self.play(GrowFromCenter(total))
        self.attendre_voix()

    def ecran_fixe(self):
        """⭐ LE POINT QUI COMMANDE TOUT LE RESTE."""
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("03-fixe")
        self.play(Write(Text("Une taxe qui ne bouge pas", font_size=46,
                             color=JAUNE_TITRE).to_edge(UP)))

        lignes = VGroup()
        for baril, accise, tva, prix in (("60 $", "69 c", "26 c", "1,55 €"),
                                         ("85 $", "69 c", "31 c", "1,86 €"),
                                         ("105 $", "69 c", "36 c", "2,17 €")):
            lignes.add(VGroup(
                Text(f"baril à {baril}", font_size=30, color=WHITE),
                Text("accise " + accise, font_size=30, color=ORANGE_RETENUE),
                Text("TVA " + tva, font_size=30, color=ROUGE_ERREUR),
                Text(prix, font_size=32, color=BLEU_CALCUL),
            ).arrange(RIGHT, buff=0.75))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to([0, 0.75, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.55)

        # La colonne « accise » est la seule immobile : on l'entoure.
        colonne_accise = VGroup(*[l[1] for l in lignes])
        self.play(Circumscribe(colonne_accise, color=ORANGE_RETENUE, buff=0.18))

        bas = VGroup(
            Text("l'accise est un MONTANT : 69,02 centimes par litre",
                 font_size=30, color=ORANGE_RETENUE),
            Text("la TVA est un POURCENTAGE : elle suit le prix",
                 font_size=30, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.22).move_to([0, -2.30, 0])
        for l in bas:
            self.play(FadeIn(l, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    def ecran_part(self):
        """Le paradoxe — ici il a la place de se démontrer, pas seulement de
        s'annoncer."""
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("04-part")
        self.play(Write(Text("La part et la somme", font_size=46,
                             color=JAUNE_TITRE).to_edge(UP)))

        # ⛔ TROIS LIGNES, PAS QUATRE. Avec quatre lignes posées à `bas − 1,00`,
        # le bloc descendait jusqu'à −4,15 : « 57,7 % » et « 48,4 % », les deux
        # nombres qui PORTENT l'écran, sortaient du cadre par le bas. Le montant
        # de taxe est déjà dit dans le bilan à droite ; il sort d'ici.
        bas = -1.55
        c1 = self.colonne([(PRIX_JANVIER - TAXES_JANVIER, BLEU_CALCUL),
                           (TAXES_JANVIER, ORANGE_RETENUE)],
                          largeur=1.3, bas=bas, x=-3.4)
        c2 = self.colonne([(HORS_TAXES, BLEU_CALCUL), (ACCISE + TVA, ORANGE_RETENUE)],
                          largeur=1.3, bas=bas, x=-0.4)
        for col, x, nom, prix, part in (
                (c1, -3.4, "janvier", "1,68 €", "57,7 %"),
                (c2, -0.4, "septembre", "2,17 €", "48,4 %")):
            self.play(GrowFromEdge(col, DOWN), run_time=0.7)
            bloc = VGroup(
                Text(nom, font_size=26, color=WHITE),
                Text(prix, font_size=30, color=BLEU_CALCUL),
                Text(part, font_size=38, color=JAUNE_TITRE),
            ).arrange(DOWN, buff=0.12).move_to([x, bas - 0.85, 0])
            self.play(FadeIn(bloc), run_time=0.45)

        bilan = VGroup(
            Text("la taxe : + 8 centimes", font_size=32, color=ORANGE_RETENUE),
            Text("sa part : − 9,3 points", font_size=32, color=BLEU_CALCUL),
            Text("les deux sont vrais", font_size=34, color=VERT_OK),
            Text("le dénominateur a grossi plus vite", font_size=26, color=GREY_B),
        ).arrange(DOWN, buff=0.28).move_to([3.9, 0.30, 0])
        for l in bilan:
            self.play(FadeIn(l, shift=UP * 0.15), run_time=0.5)
        self.play(Flash(bilan[2], color=VERT_OK, line_length=0.3))
        self.attendre_voix()

    def ecran_levier(self):
        """⭐ LE CALCUL POSÉ EN ENTIER — c'est ce que le short ne pouvait pas
        faire, et c'est la raison d'être du format long."""
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("05-levier")
        self.play(Write(Text("Baisser l'accise de 10 centimes", font_size=46,
                             color=JAUNE_TITRE).to_edge(UP)))

        etapes = VGroup(
            Text("prix hors taxes          1,12 €", font_size=32, color=BLEU_CALCUL),
            Text("accise                   0,69 €  →  0,59 €", font_size=32, color=ORANGE_RETENUE),
            Text("sous-total               1,81 €  →  1,71 €", font_size=32, color=WHITE),
            Text("× 1,20  (la TVA)         2,17 €  →  2,05 €", font_size=32, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.55, 0])
        for l in etapes:
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.6)
        self.play(Circumscribe(etapes[3], color=VERT_OK, buff=0.15))

        # ⚠️ 29 et non 32 : à 32 la ligne fait 9,5 unités de large et vient
        # frôler Ti-Margo, posté dans le coin bas-droit.
        chute = VGroup(
            Text("10 centimes de taxe en moins, 12 centimes à la pompe",
                 font_size=29, color=VERT_OK),
            Text("parce que la TVA s'applique aussi sur la taxe",
                 font_size=26, color=GREY_B),
        ).arrange(DOWN, buff=0.22).move_to([0, -2.55, 0])
        for l in chute:
            self.play(FadeIn(l, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    def ecran_pays(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("06-pays")
        self.play(Write(Text("Cinq pays, le 14 septembre", font_size=46,
                             color=JAUNE_TITRE).to_edge(UP)))

        rangs = VGroup(*[
            self.rang(nom, self.barre_pays(prix, part, hauteur=0.55),
                      f"{prix:.2f} €".replace(".", ","), f_nom=28, f_val=30)
            for nom, prix, part in PAYS
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        self.aligner(rangs).move_to([-0.4, 0.35, 0])
        for r in rangs:
            self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.5)

        legende = VGroup(
            Text("bleu : le carburant", font_size=26, color=BLEU_CALCUL),
            Text("orange : l'impôt", font_size=26, color=ORANGE_RETENUE),
        ).arrange(RIGHT, buff=0.9).move_to([0, -2.60, 0])
        self.play(FadeIn(legende))
        self.play(Circumscribe(rangs[-1], color=JAUNE_TITRE, buff=0.10))
        self.attendre_voix()

    def ecran_espagne(self):
        """⭐⭐ LA DÉMONSTRATION : même prix d'achat, 30 centimes d'écart."""
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("07-espagne")
        self.play(Write(Text("De part et d'autre des Pyrénées", font_size=46,
                             color=JAUNE_TITRE).to_edge(UP)))

        tous = VGroup(*[
            self.rang(nom, self.barre_ht_taxes(HT_COMMUN, t, hauteur=0.55), val,
                      coul_val=coul, f_nom=28, f_val=30)
            for nom, t, val, coul in (
                ("Espagne", 0.0, "1,12 €", BLEU_CALCUL),
                ("France", 0.0, "1,12 €", BLEU_CALCUL),
                ("Espagne", TAXES_ES, "1,87 €", VERT_OK),
                ("France", ACCISE + TVA, "2,17 €", ORANGE_RETENUE),
            )
        # ⛔ L'ENSEMBLE MONTAIT TROP HAUT. Avec des buffs de 0,45 et un écartement
        # de 0,60, les quatre barres et leurs deux légendes occupaient 4,75
        # unités : « ce qu'elles achètent » se posait à 3,45 et passait SOUS le
        # titre, qui descend à 3,40. On resserre, et on descend le tout.
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        self.aligner(tous).move_to([-0.4, 0.05, 0])
        haut, bas = VGroup(tous[0], tous[1]), VGroup(tous[2], tous[3])
        haut.shift(UP * 0.45)
        bas.shift(DOWN * 0.45)

        titre_h = Text("ce qu'elles achètent", font_size=28, color=BLEU_CALCUL)
        self.play(FadeIn(titre_h.next_to(haut, UP, buff=0.24)))
        for r in haut:
            self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.55)
        titre_b = Text("ce qu'on paie à la pompe", font_size=28, color=WHITE)
        self.play(FadeIn(titre_b.next_to(bas, UP, buff=0.20)))
        for r in bas:
            self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.55)

        self.play(Write(self.chute("30 centimes d'écart, et pas un centime de pétrole dedans",
                                   color=JAUNE_TITRE, font_size=30)))
        self.attendre_voix()

    def ecran_malte(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("08-malte")
        self.play(Write(Text("Le cas de Malte", font_size=46,
                             color=JAUNE_TITRE).to_edge(UP)))

        # Un prix gelé, ça se dessine : la même barre, année après année.
        annees = VGroup(*[
            self.rang(str(an), self.barre_pays(1.340, 56.3, hauteur=0.42),
                      "1,34 €", f_nom=26, f_val=28)
            for an in (2022, 2023, 2024, 2025, 2026)
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.30)
        self.aligner(annees).move_to([-0.6, 0.55, 0])
        for r in annees:
            self.play(FadeIn(r, shift=RIGHT * 0.15), run_time=0.38)
        self.play(Circumscribe(annees, color=BLEU_CALCUL, buff=0.15))

        bas = VGroup(
            Text("56,3 % de taxes : la part la plus forte d'Europe",
                 font_size=30, color=ORANGE_RETENUE),
            Text("et le prix le plus bas — parce que l'État le fixe",
                 font_size=30, color=VERT_OK),
        ).arrange(DOWN, buff=0.24).move_to([0, -2.45, 0])
        for l in bas:
            self.play(FadeIn(l, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    def ecran_reunion(self):
        """⛔ L'ÉCRAN QUI EMPÊCHE LA VIDÉO DE DEVENIR UNE PLAIDOIRIE. Le prix
        administré marche — et il a un prix, mesuré."""
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("09-reunion")
        self.play(Write(Text("Et en France : La Réunion", font_size=46,
                             color=JAUNE_TITRE).to_edge(UP)))

        duo = VGroup(*[
            self.rang(nom, self.barre_pays(prix, 0.0, hauteur=0.58, couleur=coul),
                      f"{prix:.2f} €".replace(".", ","), coul_val=coul,
                      f_nom=30, f_val=32)
            for nom, prix, coul in (("métropole", PRIX, BLEU_CALCUL),
                                    ("La Réunion", REUNION, VERT_OK))
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        self.aligner(duo).move_to([-0.6, 1.85, 0])
        for r in duo:
            self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.6)

        # ⛔ DEUX COLONNES QUI SE TÉLESCOPAIENT. À la taille 28, « un prix maximum
        # fixé chaque mois » et « plus bas niveau depuis 2020 » se touchaient au
        # milieu de l'écran. On réduit d'un cran ET on écarte : deux colonnes ne
        # se règlent pas seulement par leur centre, mais par leur LARGEUR.
        pour = VGroup(
            Text("ni TVA, ni TICPE", font_size=25, color=BLEU_CALCUL),
            Text("octroi de mer et taxe régionale", font_size=25, color=BLEU_CALCUL),
            Text("un prix maximum fixé chaque mois", font_size=25, color=BLEU_CALCUL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.20).move_to([-3.75, -0.85, 0])
        contre = VGroup(
            Text("mais + 5 centimes en un mois", font_size=25, color=ORANGE_RETENUE),
            Text("et la consommation : − 33 %", font_size=30, color=ROUGE_ERREUR),
            Text("plus bas niveau depuis 2020", font_size=24, color=GREY_B),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.20).move_to([3.55, -0.85, 0])
        for l in pour:
            self.play(FadeIn(l, shift=RIGHT * 0.15), run_time=0.42)
        for l in contre:
            self.play(FadeIn(l, shift=LEFT * 0.15), run_time=0.42)

        self.play(Write(self.chute("un prix fixé amortit le choc, il ne protège pas",
                                   color=JAUNE_TITRE, font_size=32)))
        self.attendre_voix()

    def ecran_defi(self):
        """⭐ Un défi à DEUX étapes, et dont la réponse est mémorable : le prix
        repasse sous les deux euros."""
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("10-defi")
        self.play(Write(Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)))

        enonce = VGroup(
            Text("On annonce une remise de 15 centimes sur l'accise.",
                 font_size=32, color=WHITE),
            Text("Le litre est à 2,17 €.", font_size=32, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.24).move_to([0, 2.35, 0])
        for l in enonce:
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.55)

        # ⛔ LA COLONNE DESCEND. Posée à `bas = −1,70`, elle culminait à 1,45 et
        # son étiquette « 2,17 € » se plantait à 1,75, en plein dans l'énoncé.
        # Une colonne de 3,15 unités a besoin qu'on lui compte sa hauteur.
        col = self.colonne([(HORS_TAXES + ACCISE, BLEU_CALCUL), (TVA, ROUGE_ERREUR)],
                           largeur=1.2, bas=-2.75, x=-4.6)
        self.play(GrowFromEdge(col, DOWN), run_time=0.7)
        self.play(FadeIn(Text("2,17 €", font_size=32, color=WHITE)
                         .next_to(col, UP, buff=0.22)))

        q = VGroup(
            Text("1.  De combien baisse le prix à la pompe ?", font_size=32, color=WHITE),
            Text("2.  Passe-t-il sous les 2 € ?", font_size=32, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.30).move_to([1.1, -0.30, 0])
        for m in q:
            self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.5)

        rappel = Text("rappel : la TVA de 20 % s'applique aussi sur l'accise",
                      font_size=26, color=GREY_B).move_to([1.1, -1.55, 0])
        self.play(FadeIn(rappel))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("11-correction")
        self.play(Write(Text("Correction", font_size=48,
                             color=JAUNE_TITRE).to_edge(UP)))

        etapes = VGroup(
            Text("15 c de taxe en moins", font_size=34, color=ORANGE_RETENUE),
            Text("+ la TVA sur ces 15 c :  20 % × 15 = 3 c", font_size=34, color=ROUGE_ERREUR),
            Text("baisse à la pompe :  15 + 3 = 18 centimes", font_size=36, color=VERT_OK),
            Text("2,17 € − 0,18 € = 1,99 €", font_size=42, color=VERT_OK),
        ).arrange(DOWN, buff=0.40).move_to([0, 0.55, 0])
        for l in etapes:
            self.play(FadeIn(l, shift=UP * 0.15), run_time=0.65)
        self.play(Circumscribe(etapes[3], color=VERT_OK, buff=0.18))

        self.play(Write(self.chute("oui — tout juste, et il y reste tant que le baril ne monte pas",
                                   color=JAUNE_TITRE, font_size=30)))
        self.attendre_voix()

    def ecran_retenir(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("12-retenir")
        self.play(Write(Text("À retenir", font_size=48,
                             color=JAUNE_TITRE).to_edge(UP)))
        bloc = VGroup(
            Text("Une part peut baisser pendant que la somme augmente.",
                 font_size=32, color=BLEU_CALCUL),
            Text("Une taxe en euros ne suit pas le prix ; un pourcentage, si.",
                 font_size=32, color=ORANGE_RETENUE),
            Text("Trois leviers : baisser la taxe, fixer le prix, consommer moins.",
                 font_size=32, color=VERT_OK),
            Text("Chacun a un coût. Les chiffres le disent, le choix ne leur appartient pas.",
                 font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.45).move_to([0, 0.15, 0])
        for l in bloc:
            self.play(FadeIn(l, shift=UP * 0.15), run_time=0.7)
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            "Le prix de l'essence",
            "+ 50 centimes en huit mois",
            "où va cet argent, et ce qu'on peut vraiment y faire",
        )
        self.ecran_flambee()
        self.ecran_litre()
        self.ecran_fixe()
        self.ecran_part()
        self.ecran_levier()
        self.ecran_pays()
        self.ecran_espagne()
        self.ecran_malte()
        self.ecran_reunion()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_retenir()
        self.page_abonnement("13-abonne")


# ══════════════════════════════════════════════════════════════════════════════
#  SHORT 1 — OÙ VA VOTRE ARGENT (la barre du litre, et le levier)
# ══════════════════════════════════════════════════════════════════════════════

class EssenceShortLitre(ShortBases, _Essence):
    """⭐ Le short principal : un litre, trois parts, et ce que chaque levier donne."""

    dossier_voix = VOIX_LITRE

    def ecran_accroche(self):
        """⛔ Cette image est prélevée par YouTube À 1 SECONDE : elle doit tenir
        au-delà, et porter le problème — pas le paradoxe."""
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("l'essence a pris", font_size=30, color=WHITE),
            self.grand("50 CENTIMES", font_size=58, color=ROUGE_ERREUR),
            self.grand("en huit mois", font_size=32, color=WHITE),
            self.grand("où va cet argent ?", font_size=36, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.5, 0])
        self.play(FadeIn(t[0]), GrowFromCenter(t[1]), run_time=0.5)
        self.play(FadeIn(t[2], shift=UP * 0.12), run_time=0.35)
        self.play(FadeIn(t[3], shift=UP * 0.12), run_time=0.4)
        self.play(Flash(t[3], color=JAUNE_TITRE, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_litre(self):
        """LA BARRE. Un litre monte, tranche par tranche, du produit vers l'impôt."""
        self.clear()
        self.margo_bas()
        self.dire("01-litre")

        titre = self.grand("un litre d'essence", font_size=34, color=JAUNE_TITRE)
        self.play(Write(titre.move_to([0, 3.15, 0])))
        prix = self.grand("2,17 €", font_size=52, color=WHITE).move_to([0, 2.45, 0])
        self.play(GrowFromCenter(prix))

        parts = [(HORS_TAXES, BLEU_CALCUL), (ACCISE, ORANGE_RETENUE), (TVA, ROUGE_ERREUR)]
        col = self.colonne(parts, largeur=1.05, bas=-1.95, x=-1.30)

        legendes = [
            ("le carburant", "1,12 €", BLEU_CALCUL),
            ("l'accise", "0,69 €", ORANGE_RETENUE),
            ("la TVA", "0,36 €", ROUGE_ERREUR),
        ]
        for rect, (nom, val, coul) in zip(col, legendes):
            self.play(FadeIn(rect, shift=UP * 0.18), run_time=0.45)
            self.play(FadeIn(self.etiquette(rect, nom, val, coul), shift=RIGHT * 0.1),
                      run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_moitie(self):
        """Les deux tranches d'impôt se rejoignent : presque la moitié."""
        self.clear()
        self.margo_bas()
        self.dire("02-moitie")

        titre = self.grand("les deux du haut", font_size=32, color=WHITE)
        self.play(FadeIn(titre.move_to([0, 3.15, 0])))

        parts = [(HORS_TAXES, BLEU_CALCUL), (ACCISE + TVA, ORANGE_RETENUE)]
        col = self.colonne(parts, largeur=1.15, bas=-1.70, x=-1.25)
        self.play(FadeIn(col, shift=UP * 0.15), run_time=0.6)

        e1 = self.etiquette(col[0], "le carburant", "51,6 %", BLEU_CALCUL)
        e2 = self.etiquette(col[1], "l'impôt", "48,4 %", ORANGE_RETENUE)
        self.play(FadeIn(e1), run_time=0.35)
        self.play(FadeIn(e2), run_time=0.35)
        self.play(Flash(e2[1], color=ORANGE_RETENUE, line_length=0.35))

        bas = self.grand("presque la moitié", font_size=32, color=JAUNE_TITRE)
        self.play(FadeIn(bas.move_to([0, -2.45, 0]), shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_fixe(self):
        """⭐ LE POINT QUI EXPLIQUE TOUT LE RESTE : l'accise est un MONTANT, pas
        un pourcentage. Sans lui, ni le paradoxe ni le levier ne se comprennent."""
        self.clear()
        self.margo_bas()
        self.dire("03-fixe")

        titre = self.grand("l'accise ne bouge pas", font_size=34, color=JAUNE_TITRE)
        self.play(Write(titre.move_to([0, 3.15, 0])))

        lignes = VGroup(
            self.grand("69 centimes", font_size=46, color=ORANGE_RETENUE),
            self.grand("par litre", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.12).move_to([0, 2.2, 0])
        self.play(GrowFromCenter(lignes))

        duo = VGroup(
            self.grand("baril à 60 $   →   69 c", font_size=25, color=WHITE),
            self.grand("baril à 105 $  →   69 c", font_size=25, color=WHITE),
        ).arrange(DOWN, buff=0.28).move_to([0, 0.75, 0])
        for l in duo:
            self.play(FadeIn(l, shift=RIGHT * 0.12), run_time=0.45)

        chute = VGroup(
            self.grand("c'est un MONTANT", font_size=30, color=ORANGE_RETENUE),
            self.grand("pas un pourcentage", font_size=30, color=ORANGE_RETENUE),
            self.grand("la TVA, elle, suit le prix", font_size=24, color=GREY_B),
        ).arrange(DOWN, buff=0.20).move_to([0, -1.25, 0])
        for l in chute:
            self.play(FadeIn(l, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_paradoxe(self):
        """Janvier contre septembre — deux colonnes, même échelle.

        ⭐ L'outil de lecture, pas le propos : on ne dit pas « rassurez-vous »,
        on dit « voilà pourquoi le pourcentage vous trompe »."""
        self.clear()
        self.margo_bas()
        self.dire("04-paradoxe")

        titre = self.grand("janvier / septembre", font_size=32, color=JAUNE_TITRE)
        self.play(Write(titre.move_to([0, 3.20, 0])))

        # ⛔ LES LÉGENDES VONT SOUS LES COLONNES, à la MÊME hauteur. Posées en
        # `next_to(col, UP)`, elles suivaient chacune le sommet de sa colonne :
        # deux blocs de chiffres à deux altitudes différentes, que l'œil compare
        # avant de comparer les barres. Sous les colonnes, elles s'alignent — et
        # c'est aussi la convention de tout graphique en barres.
        # ⛔ Et les colonnes sont SYMÉTRIQUES (−0,85 / +0,85) : à −1,05 et +0,65
        # l'ensemble penchait à gauche pendant que titre et chute restaient
        # centrés.
        bas = -0.45
        c1 = self.colonne([(PRIX_JANVIER - TAXES_JANVIER, BLEU_CALCUL),
                           (TAXES_JANVIER, ORANGE_RETENUE)],
                          largeur=0.95, bas=bas, x=-0.85)
        c2 = self.colonne([(HORS_TAXES, BLEU_CALCUL), (ACCISE + TVA, ORANGE_RETENUE)],
                          largeur=0.95, bas=bas, x=0.85)
        for col, x, nom, prix, part, coul in (
                (c1, -0.85, "janvier", "1,68 €", "57,7 %", GREY_B),
                (c2, 0.85, "septembre", "2,17 €", "48,4 %", JAUNE_TITRE)):
            self.play(FadeIn(col, shift=UP * 0.15), run_time=0.5)
            bloc = VGroup(
                Text(nom, font_size=21, color=WHITE),
                Text(prix, font_size=25, color=coul),
                Text(part, font_size=27, color=ORANGE_RETENUE),
            ).arrange(DOWN, buff=0.07).move_to([x, -1.15, 0])
            self.play(FadeIn(bloc), run_time=0.35)

        # ⛔ DEUX LIGNES COURTES, PAS DEUX PHRASES. « la taxe a AUGMENTÉ de 8 c »
        # dépassait la largeur du cadre : `grand()` la rétrécissait sans prévenir,
        # et la ligne qui porte tout le message finissait plus petite que les
        # étiquettes au-dessus. Les montants sont déjà dans les colonnes — ici on
        # ne garde que l'opposition.
        chute = VGroup(
            self.grand("la taxe a AUGMENTÉ", font_size=29, color=ORANGE_RETENUE),
            self.grand("sa part a BAISSÉ", font_size=29, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.20).move_to([0, -2.25, 0])
        for l in chute:
            self.play(FadeIn(l, shift=UP * 0.10), run_time=0.38)
        self.attendre_voix(marge=0.4)

    def ecran_levier(self):
        """⭐ LE CALCUL QUE PERSONNE NE FAIT : −10 c d'accise = −12 c à la pompe,
        parce que la TVA porte AUSSI sur l'accise."""
        self.clear()
        self.margo_bas()
        self.dire("05-levier")

        titre = self.grand("baisser l'accise ?", font_size=34, color=JAUNE_TITRE)
        self.play(Write(titre.move_to([0, 3.15, 0])))

        # ⛔ LA FLÈCHE A BESOIN DE PLACE POUR EXISTER. Avec un `buff` de 0,34
        # entre les deux lignes, `Arrow` n'avait que 0,18 unité à dessiner : au
        # rendu, un trait de trois pixels que personne ne voit. C'est l'écart des
        # lignes qu'il faut ouvrir, pas l'épaisseur du trait.
        calcul = VGroup(
            self.grand("−10 c d'accise", font_size=34, color=ORANGE_RETENUE),
            self.grand("−12 c à la pompe", font_size=38, color=VERT_OK),
        ).arrange(DOWN, buff=0.80).move_to([0, 1.80, 0])
        fleche = Arrow(calcul[0].get_bottom(), calcul[1].get_top(),
                       buff=0.10, color=WHITE, stroke_width=6,
                       max_tip_length_to_length_ratio=0.32,
                       max_stroke_width_to_length_ratio=14)
        self.play(FadeIn(calcul[0], shift=DOWN * 0.1), run_time=0.4)
        self.play(GrowArrow(fleche), run_time=0.35)
        self.play(GrowFromCenter(calcul[1]), run_time=0.45)
        self.play(Flash(calcul[1], color=VERT_OK, line_length=0.35))

        pourquoi = VGroup(
            self.grand("la TVA s'applique", font_size=26, color=WHITE),
            self.grand("SUR la taxe", font_size=32, color=ROUGE_ERREUR),
            self.grand("20 % de 10 c = 2 c", font_size=26, color=GREY_B),
        ).arrange(DOWN, buff=0.18).move_to([0, -0.35, 0])
        for l in pourquoi:
            self.play(FadeIn(l, shift=UP * 0.12), run_time=0.4)

        reste = self.grand("2,17 €  →  2,05 €", font_size=32, color=BLEU_CALCUL)
        self.play(FadeIn(reste.move_to([0, -2.10, 0]), shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        """⭐ LA RÉPONSE À LA PROMESSE DU TITRE. Le titre demande « quelle
        stratégie ? » : on ne peut pas finir sur une leçon de pourcentages.

        La réponse honnête tient en une image — la moitié du prix se décide à
        Paris, l'autre sur un marché mondial. C'est ce qui borne TOUTES les
        stratégies, et ça ne désigne personne.
        """
        self.clear()
        self.margo_bas()
        self.dire("06-retenir")

        titre = self.grand("sur 2,17 €", font_size=36, color=JAUNE_TITRE)
        self.play(Write(titre.move_to([0, 3.10, 0])))

        parts = [(HORS_TAXES, BLEU_CALCUL), (ACCISE + TVA, ORANGE_RETENUE)]
        col = self.colonne(parts, largeur=1.10, bas=-0.55, x=-1.25)
        self.play(FadeIn(col, shift=UP * 0.15), run_time=0.55)
        e1 = self.etiquette(col[0], "le marché", "1,12 €", BLEU_CALCUL)
        e2 = self.etiquette(col[1], "l'impôt", "1,05 €", ORANGE_RETENUE)
        self.play(FadeIn(e1), run_time=0.35)
        self.play(FadeIn(e2), run_time=0.35)

        bas = VGroup(
            self.grand("une moitié se décide", font_size=27, color=WHITE),
            self.grand("l'autre, non", font_size=33, color=VERT_OK),
        ).arrange(DOWN, buff=0.18).move_to([0, -1.90, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.play(Flash(bas[1], color=VERT_OK, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_litre()
        self.ecran_moitie()
        self.ecran_fixe()
        self.ecran_paradoxe()
        self.ecran_levier()
        self.ecran_retenir()
        self.ecran_renvoi("07-fin")


# ══════════════════════════════════════════════════════════════════════════════
#  SHORT 2 — CE QUE FONT LES AUTRES (les pays, et La Réunion)
# ══════════════════════════════════════════════════════════════════════════════

class EssenceShortPays(ShortBases, _Essence):
    """⭐ La part des taxes ne dit RIEN du prix — et la preuve est française."""

    dossier_voix = VOIX_PAYS

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("le pays le PLUS taxé", font_size=30, color=WHITE),
            self.grand("d'Europe", font_size=30, color=WHITE),
            self.grand("a l'essence", font_size=28, color=WHITE),
            self.grand("LA MOINS CHÈRE", font_size=42, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.22).move_to([0, 1.5, 0])
        self.play(FadeIn(t[0]), FadeIn(t[1]), run_time=0.45)
        self.play(FadeIn(t[2], shift=UP * 0.1), run_time=0.3)
        self.play(GrowFromCenter(t[3]), run_time=0.45)
        self.play(Flash(t[3], color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_pays(self):
        """Cinq pays, cinq barres, une seule échelle — le panorama."""
        self.clear()
        self.margo_bas()
        self.dire("01-pays")

        titre = VGroup(
            self.grand("un litre d'essence", font_size=30, color=JAUNE_TITRE),
            self.grand("le 14 septembre", font_size=22, color=GREY_B),
        ).arrange(DOWN, buff=0.10).move_to([0, 3.15, 0])
        self.play(Write(titre[0]), FadeIn(titre[1]))

        rangs = VGroup(*[
            self.rang(nom, self.barre_pays(prix, part),
                      f"{prix:.2f} €".replace(".", ","))
            for nom, prix, part in PAYS
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.32)
        self.aligner(rangs).move_to([0, 0.85, 0])
        for r in rangs:
            self.play(FadeIn(r, shift=RIGHT * 0.15), run_time=0.42)

        legende = VGroup(
            self.grand("bleu = le carburant", font_size=21, color=BLEU_CALCUL),
            self.grand("orange = l'impôt", font_size=21, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.12).move_to([0, -1.45, 0])
        self.play(FadeIn(legende), run_time=0.4)
        self.play(Circumscribe(rangs[-1], color=JAUNE_TITRE, buff=0.08))
        self.attendre_voix(marge=0.4)

    def ecran_achat(self):
        """⭐⭐ LA DÉMONSTRATION. Deux barres bleues rigoureusement identiques,
        puis l'orange qui les allonge différemment. Tout l'écart est là, et il
        se voit sans lire un seul chiffre."""
        self.clear()
        self.margo_bas()
        self.dire("02-achat")

        titre = self.grand("France et Espagne", font_size=32, color=JAUNE_TITRE)
        self.play(Write(titre.move_to([0, 3.15, 0])))
        sous = self.grand("achètent au même prix", font_size=24, color=WHITE)
        self.play(FadeIn(sous.move_to([0, 2.60, 0])))

        # ⛔ LES QUATRE BARRES SONT CONSTRUITES ENSEMBLE, PUIS SÉPARÉES. Écrites
        # en deux VGroup centrés chacun sur [0, y], elles ne partaient PAS du même
        # x : le groupe du bas est plus large (les barres sont plus longues), donc
        # son centrage le décalait de 0,17 unité vers la gauche. Or tout l'argument
        # est de comparer le bleu du haut au bleu du bas — un décalage invisible
        # à l'œil nu suffisait à le détruire. On aligne les quatre, on écarte
        # ensuite verticalement : un `shift` vertical ne touche pas au x.
        tous = VGroup(*[
            self.rang(nom, self.barre_ht_taxes(HT_COMMUN, t), val,
                      coul_val=coul, f_nom=20, f_val=22)
            for nom, t, val, coul in (
                ("Espagne", 0.0, "1,12 €", BLEU_CALCUL),
                ("France", 0.0, "1,12 €", BLEU_CALCUL),
                ("Espagne", TAXES_ES, "1,87 €", VERT_OK),
                ("France", ACCISE + TVA, "2,17 €", ORANGE_RETENUE),
            )
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        self.aligner(tous).move_to([0, 0.15, 0])
        haut, bas = VGroup(tous[0], tous[1]), VGroup(tous[2], tous[3])
        haut.shift(UP * 0.50)
        bas.shift(DOWN * 0.50)

        for r in haut:
            self.play(FadeIn(r, shift=RIGHT * 0.15), run_time=0.5)
        # ⛔ LES DEUX LÉGENDES SE POSENT PAR RAPPORT AUX BARRES, pas en absolu.
        # Écrites en `move_to([0, 0.75])` et `[0, 0.10]`, elles ne bougeaient pas
        # quand l'écartement des paires changeait : au premier réglage, la ligne
        # du haut est passée sous le sous-titre et « achètent au même prix »
        # chevauchait la barre Espagne. Un `next_to` ne peut plus se désaligner.
        meme = self.grand("le même carburant", font_size=23, color=BLEU_CALCUL)
        self.play(FadeIn(meme.next_to(haut, DOWN, buff=0.14)))

        etiq = Text("à la pompe", font_size=22, color=WHITE)
        self.play(FadeIn(etiq.next_to(bas, UP, buff=0.14), shift=DOWN * 0.1),
                  run_time=0.35)
        for r in bas:
            self.play(FadeIn(r, shift=RIGHT * 0.15), run_time=0.5)

        ecart = self.grand("30 centimes d'écart", font_size=28, color=JAUNE_TITRE)
        self.play(GrowFromCenter(ecart.move_to([0, -2.15, 0])))
        self.play(Flash(ecart, color=JAUNE_TITRE, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_malte(self):
        self.clear()
        self.margo_bas()
        self.dire("03-malte")
        bloc = VGroup(
            self.grand("Malte", font_size=44, color=JAUNE_TITRE),
            self.grand("56 % de taxes", font_size=30, color=ORANGE_RETENUE),
            self.grand("1,34 € le litre", font_size=34, color=VERT_OK),
        ).arrange(DOWN, buff=0.22).move_to([0, 2.15, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)

        fige = VGroup(
            self.grand("le MÊME prix", font_size=30, color=WHITE),
            self.grand("depuis 2022", font_size=36, color=BLEU_CALCUL),
            self.grand("l'État le fixe", font_size=26, color=GREY_B),
        ).arrange(DOWN, buff=0.18).move_to([0, 0.05, 0])
        for m in fige:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.play(Flash(fige[1], color=BLEU_CALCUL, line_length=0.35))

        chute = VGroup(
            self.grand("la part des taxes", font_size=25, color=WHITE),
            self.grand("ne dit pas le prix", font_size=31, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.16).move_to([0, -1.85, 0])
        self.play(FadeIn(chute, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_reunion(self):
        """⭐ LE CAS FRANÇAIS : même pays, même carburant, 34 centimes d'écart."""
        self.clear()
        self.margo_bas()
        self.dire("04-reunion")

        titre = self.grand("et en France ?", font_size=34, color=JAUNE_TITRE)
        self.play(Write(titre.move_to([0, 3.15, 0])))

        # ⛔ ICI LES BARRES NE SE DÉCOUPENT PAS, et c'est délibéré. La Réunion n'est
        # pas « sans taxes » : il n'y a ni TVA ni TICPE, mais il y a l'octroi de
        # mer et la TSC régionale, dont je n'ai pas le montant au litre. Une barre
        # tout en bleu dirait « zéro impôt » — un mensonge que personne ne
        # relèverait. Cet écran compare des PRIX ; la structure vient à l'écran
        # suivant, en mots.
        duo = VGroup(*[
            self.rang(nom, self.barre_pays(prix, 0.0, hauteur=0.40, couleur=coul),
                      f"{prix:.2f} €".replace(".", ","), coul_val=coul,
                      f_nom=21, f_val=23)
            # ⛔ PAS D'ORANGE ICI. Depuis l'écran des cinq pays, l'orange VEUT
            # DIRE « l'impôt » : une barre métropole toute orange se lit « que
            # des taxes », ce qui est faux et personne ne le relèverait. Bleu =
            # le prix, vert = celui qui est plus bas. L'écart se lit dans la
            # LONGUEUR, c'est à ça que sert une barre.
            for nom, prix, coul in (("métropole", PRIX, BLEU_CALCUL),
                                    ("La Réunion", REUNION, VERT_OK))
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        self.aligner(duo).move_to([0, 1.95, 0])
        for r in duo:
            self.play(FadeIn(r, shift=RIGHT * 0.15), run_time=0.5)

        ecart = self.grand("34 centimes d'écart", font_size=30, color=JAUNE_TITRE)
        self.play(GrowFromCenter(ecart.move_to([0, 0.55, 0])))

        pourquoi = VGroup(
            self.grand("ni TVA ni TICPE", font_size=27, color=BLEU_CALCUL),
            self.grand("un prix maximum", font_size=27, color=BLEU_CALCUL),
            self.grand("fixé chaque mois", font_size=27, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.17).move_to([0, -1.00, 0])
        for m in pourquoi:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_mais(self):
        """⛔ LE CONTREPOINT OBLIGATOIRE. La rubrique meurt si elle donne toujours
        raison au même camp : le prix administré amortit, il ne protège pas."""
        self.clear()
        self.margo_bas()
        self.dire("05-mais")

        titre = self.grand("mais", font_size=44, color=ROUGE_ERREUR)
        self.play(GrowFromCenter(titre.move_to([0, 3.10, 0])))

        faits = VGroup(
            self.grand("le prix a monté", font_size=27, color=WHITE),
            self.grand("quand même", font_size=27, color=WHITE),
            self.grand("+5 c en un mois", font_size=30, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.16).move_to([0, 1.90, 0])
        for m in faits:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.38)

        conso = VGroup(
            self.grand("et les Réunionnais", font_size=25, color=WHITE),
            self.grand("ont acheté", font_size=25, color=WHITE),
            self.grand("33 % DE MOINS", font_size=38, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.16).move_to([0, -0.15, 0])
        for m in conso:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.play(Flash(conso[2], color=ROUGE_ERREUR, line_length=0.4))

        chute = self.grand("un prix fixé amortit", font_size=26, color=JAUNE_TITRE)
        chute2 = self.grand("il ne protège pas", font_size=30, color=JAUNE_TITRE)
        g = VGroup(chute, chute2).arrange(DOWN, buff=0.16).move_to([0, -2.30, 0])
        self.play(FadeIn(g, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("06-retenir")
        bloc = VGroup(
            self.grand("trois leviers", font_size=34, color=JAUNE_TITRE),
            self.grand("baisser la taxe", font_size=26, color=ORANGE_RETENUE),
            self.grand("fixer le prix", font_size=26, color=BLEU_CALCUL),
            self.grand("consommer moins", font_size=26, color=VERT_OK),
        ).arrange(DOWN, buff=0.20).move_to([0, 1.75, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        bas = VGroup(
            self.grand("chacun a un prix", font_size=26, color=WHITE),
            self.grand("maintenant", font_size=24, color=GREY_B),
            self.grand("vous pouvez juger", font_size=32, color=VERT_OK),
        ).arrange(DOWN, buff=0.16).move_to([0, -1.25, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.38)
        self.play(Flash(bas[2], color=VERT_OK, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_pays()
        self.ecran_achat()
        self.ecran_malte()
        self.ecran_reunion()
        self.ecran_mais()
        self.ecran_retenir()
        self.ecran_renvoi("07-fin")
