# fonctions_reference_2de.py
# EleveAI — Maths seconde — Les fonctions de référence
# (notionId : fonctions_reference_2de)
#
# ⭐ TROISIÈME ET DERNIÈRE LEÇON VIDÉO DU BLOC « FONCTIONS » DE SECONDE
# (23/09/2026). Les deux autres — `fonction_vocabulaire_2de` et les fonctions
# affines — existaient déjà ; variations/extremums et signe d'une expression
# restent à faire.
#
# Briques communes : `manim/gabarit_seconde.py`.
# Mêmes exemples que la fiche `lib/fiches/maths-seconde-fonctions-reference.tsx`
# et que la feuille `fonctions-reference-2de`.
#
# Mapping micro-compétences (7 micros, TOUS couverts) → écrans :
# - reference_racine         → écran 1 (l'image de 4 vaut 2, celle de −1 n'existe pas)
# - reference_carre          → écran 2 (le creux en zéro, et l'ordre inversé à gauche)
# - reference_inverse        → écran 3 (zéro exclu, deux morceaux séparés)
# - reference_cube           → écran 4 (croissante partout, le signe est conservé)
# - reference_valeur_absolue → écran 4 (la courbe en V, le signe est effacé)
# - reference_comparer       → écran 5 (le récapitulatif, puis √15 et √17)
# - reference_resoudre       → écran 6 (x² = k, puis √x = −3)
#
# ⭐ LE GESTE DE FRÉDÉRIC OUVRE LA VIDÉO, comme il ouvre la fiche : « je fais
# calculer l'image de 4 par la courbe racine carrée et je montre que −1 n'a pas
# d'image ». Le domaine de définition se VOIT avant d'être énoncé — au lieu
# d'être une interdiction que l'élève doit croire sur parole.
#
# ⛔ LE PIÈGE CENTRAL, celui de la page finale : « a < b donc a² < b² » est FAUX.
#
# ⛔ SYMBOLES : ≤ ≥ √ ∞ − se rendent ; ⩽ ⩾ (la forme française des fiches) NON.
# Et pas de ℝ non plus : on écrit « tous les réels » en toutes lettres.
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/seconde/fonctions_reference_2de.py FonctionsReference2de -o eleveai-maths-seconde-fonctions-reference --media_dir manim/scripts/seconde/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, NotionSeconde, ShortSeconde

VOIX = SONS / "seconde-fonctions-reference"
VOIX_CARRE = SONS / "seconde-fonctions-reference-short-carre"
VOIX_INVERSE = SONS / "seconde-fonctions-reference-short-inverse"
VOIX_CUBE = SONS / "seconde-fonctions-reference-short-cube"
VOIX_ABSOLUE = SONS / "seconde-fonctions-reference-short-absolue"


# ── Deux outils partagés par la leçon ET ses shorts ───────────────────────────
# ⛔ AU NIVEAU DU MODULE, pas dans la classe paysage : les shorts héritent de
# `ShortSeconde`, pas de `FonctionsReference2de`. Le 23/09, `self.croix()` dans
# un short a levé un AttributeError au milieu d'un rendu.

def croix(couleur=ROUGE_ERREUR, taille=0.16, epaisseur=5):
    """La croix du « pas d'image » — pendant rouge de `coche()`."""
    c = VGroup(
        Line([-taille, -taille, 0], [taille, taille, 0]),
        Line([-taille, taille, 0], [taille, -taille, 0]),
    )
    c.set_stroke(color=couleur, width=epaisseur)
    return c


def colorie(texte, tranches, font_size=46, couleur=WHITE, largeur_max=None):
    """⭐ UNE LIGNE DONT QUELQUES CARACTÈRES SONT EN COULEUR — ceux que la règle
    transforme. Frédéric, 23/09 : « si tu affiches 1/1 mais le 1 rouge au
    dénominateur, l'élève comprendra », puis « pareil pour les autres ».
    Écrite tout en blanc, « |−4| = 4 » ne dit pas CE QUI a disparu ; le moins
    en rouge le dit sans un mot.

    ⛔ UN SEUL `Text`, recoloré par `t2c`. Assembler plusieurs `Text` côte à
    côte avec `aligned_edge=DOWN` casse l'alignement : le « − » n'a pas la même
    hauteur qu'un chiffre, il tombe sur la ligne de base et se lit comme un
    SOULIGNÉ — « |_4| » au lieu de « |−4| » (planche du 23/09).
    `tranches` = {"[2:3]": ROUGE_ERREUR}, en index de caractères.
    """
    t = Text(texte, font_size=font_size, color=couleur, t2c=tranches)
    if largeur_max and t.width > largeur_max:
        t.scale_to_fit_width(largeur_max)
    return t


class FonctionsReference2de(NotionSeconde):

    dossier_voix = VOIX

    def croix(self, **kw):
        return croix(**kw)

    def bloc(self, lignes, couleur, buff=0.28, stroke_width=2.5):
        """Un bloc encadré : le VGroup et son cadre, à jouer ensemble."""
        g = VGroup(*lignes).arrange(DOWN, buff=0.24)
        return g, SurroundingRectangle(g, color=couleur, buff=buff,
                                       stroke_width=stroke_width)

    # ── écran 1 : reference_racine — qui a une image ? ──────────────────────

    def ecran_domaine(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-domaine")
        self.titre_ecran("La racine carrée : qui a une image ?")

        axes = self.axes_notion([-2, 9, 2], [-1, 4, 1],
                                x_length=5.6, y_length=3.3, font_size=20)
        axes.move_to([-3.5, -0.55, 0])
        courbe = axes.plot(lambda x: math.sqrt(x), x_range=[0, 9, 0.04],
                           color=BLEU_CALCUL, stroke_width=5)
        nom = Text("√x", font_size=30, color=BLEU_CALCUL).move_to(axes.c2p(7.2, 3.4))
        self.play(Create(axes))
        self.play(Create(courbe), FadeIn(nom))

        # 1. L'image de 4 : elle EXISTE, et elle se lit.
        v = DashedLine(axes.c2p(4, 0), axes.c2p(4, 2), color=VERT_OK, stroke_width=4)
        h = DashedLine(axes.c2p(4, 2), axes.c2p(0, 2), color=VERT_OK, stroke_width=4)
        pt = Dot(axes.c2p(4, 2), color=VERT_OK, radius=0.09)
        self.play(Create(v), GrowFromCenter(pt), Create(h))

        oui = VGroup(
            self.coche(),
            VGroup(Text("l'image de 4 :", font_size=30, color=VERT_OK),
                   self.radical(4, font_size=34, color=VERT_OK),
                   Text("= 2", font_size=32, color=VERT_OK)
                   ).arrange(RIGHT, buff=0.16, aligned_edge=DOWN),
        ).arrange(RIGHT, buff=0.3).move_to([3.3, 1.85, 0])
        self.play(FadeIn(oui, shift=RIGHT * 0.2))

        # 2. ⭐ LA QUESTION SE POSE ICI, là où on y répond — pas sur la page de
        # garde. Elle occupe la place du verdict, le temps que l'élève cherche,
        # puis elle lui cède.
        question = Text("et l'image de −1 ?", font_size=32, color=JAUNE_TITRE)
        question.move_to([3.3, 1.05, 0])
        self.play(Write(question))
        self.play(Flash(question, color=JAUNE_TITRE, line_length=0.3))

        # 3. La réponse : la courbe n'est PAS là.
        marque = self.croix().move_to(axes.c2p(-1, 0))
        self.play(GrowFromCenter(marque))
        non = VGroup(
            self.croix(taille=0.13),
            VGroup(Text("l'image de −1 :", font_size=30, color=ROUGE_ERREUR),
                   Text("AUCUNE", font_size=32, color=ROUGE_ERREUR)
                   ).arrange(RIGHT, buff=0.18),
        ).arrange(RIGHT, buff=0.3).move_to([3.3, 1.05, 0])
        self.play(FadeOut(question), FadeIn(non, shift=RIGHT * 0.2))

        # 4. Le mot, une fois que la chose a été vue.
        corps, cadre = self.bloc([
            Text("DOMAINE DE DÉFINITION", font_size=26, color=JAUNE_TITRE),
            Text("les nombres qui ont une image", font_size=22, color=WHITE),
            Text("ici : [ 0 ; +∞ [", font_size=32, color=JAUNE_TITRE),
        ], JAUNE_TITRE)
        corps.move_to([3.3, -1.7, 0])
        cadre.move_to(corps.get_center())
        self.play(FadeIn(corps), Create(cadre))

        # 5. ⭐ L'ORDRE, AVEC DES NOMBRES DE LA FENÊTRE (Frédéric, 23/09 : les
        # nombres de l'exemple doivent être SUR le graphique). 4 et 9 sont tous
        # deux dans [−2 ; 9], et leurs images 2 et 3 dans [−1 ; 4].
        # ⛔ L'ORDRE DE RÉVÉLATION SUIT LA VOIX : le domaine se dit AVANT
        # l'exemple d'ordre, donc le cadre jaune apparaît avant ce bloc-ci,
        # même s'il est posé plus bas à l'écran.
        pt9 = Dot(axes.c2p(9, 3), color=VERT_OK, radius=0.09)
        h9 = DashedLine(axes.c2p(9, 3), axes.c2p(0, 3), color=VERT_OK, stroke_width=3)
        self.play(GrowFromCenter(pt9), Create(h9))

        ordre = VGroup(
            Text("elle MONTE : l'ordre est gardé", font_size=25, color=VERT_OK),
            VGroup(Text("4 < 9   donc", font_size=29, color=VERT_OK),
                   self.radical(4, font_size=33, color=VERT_OK),
                   Text("<", font_size=29, color=VERT_OK),
                   self.radical(9, font_size=33, color=VERT_OK),
                   ).arrange(RIGHT, buff=0.2, aligned_edge=DOWN),
        ).arrange(DOWN, buff=0.22).move_to([3.3, 0.0, 0])
        self.play(FadeIn(ordre, shift=RIGHT * 0.2))

        self.play(Write(self.chute(
            "Une fonction n'est pas obligée de donner une image à tout le monde.")))
        self.attendre_voix()

    # ── écran 2 : reference_carre — le creux en zéro ────────────────────────

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-carre")
        self.titre_ecran("La fonction carré : un creux en zéro")

        axes = self.axes_notion([-3, 3, 1], [-1, 9, 2],
                                x_length=5.0, y_length=3.3, font_size=20)
        axes.move_to([-3.6, -0.6, 0])
        courbe = axes.plot(lambda x: x * x, x_range=[-3, 3, 0.04],
                           color=BLEU_CALCUL, stroke_width=5)
        self.play(Create(axes))
        self.play(Create(courbe))

        # ⛔ Le creux ne porte PAS d'étiquette : à côté de l'origine elle tombe
        # sur les graduations 1 et 2 (rendu de contrôle du 23/09). Le titre de
        # l'écran dit déjà le mot — le point rouge suffit à le montrer.
        creux = Dot(axes.c2p(0, 0), color=ROUGE_ERREUR, radius=0.09)
        self.play(GrowFromCenter(creux))
        self.play(Flash(creux, color=ROUGE_ERREUR, line_length=0.25))

        # ⛔ Et les deux sens se posent ENTRE les branches, pas dessus : à
        # x = ±2,0 la parabole passait au travers du mot.
        gauche = Text("DÉCROÎT", font_size=22, color=ORANGE_RETENUE)
        gauche.move_to(axes.c2p(-1.5, 7.6))
        droite = Text("CROÎT", font_size=22, color=VERT_OK)
        droite.move_to(axes.c2p(1.5, 7.6))
        self.play(FadeIn(gauche, shift=DOWN * 0.15))
        self.play(FadeIn(droite, shift=DOWN * 0.15))

        # ⭐ LES DEUX CÔTÉS, ET LEURS NOMBRES SONT SUR LA COURBE (Frédéric,
        # 23/09 : « remplace −5 < −2 par −3 < −2, ça correspond au graphique »,
        # « et rajoute 1 < 2 alors 1² < 2² »). −5 était hors de la fenêtre
        # [−3 ; 3] : l'élève lisait un calcul qu'il ne pouvait pas vérifier des
        # yeux. Les quatre points ci-dessous sont tous dedans, 9 compris.
        pos = [Dot(axes.c2p(x, x * x), color=VERT_OK, radius=0.08) for x in (1, 2)]
        neg = [Dot(axes.c2p(x, x * x), color=ORANGE_RETENUE, radius=0.08) for x in (-3, -2)]
        self.play(*[GrowFromCenter(p) for p in pos])

        bloc_pos, cadre_pos = self.bloc([
            Text("1 < 2", font_size=34, color=WHITE),
            Text("1² = 1   et   2² = 4", font_size=24, color=WHITE),
            Text("1 < 4 : l'ordre est GARDÉ", font_size=25, color=VERT_OK),
        ], VERT_OK)
        bloc_pos.move_to([3.5, 1.45, 0])
        cadre_pos.move_to(bloc_pos.get_center())
        self.play(FadeIn(bloc_pos), Create(cadre_pos))

        self.play(*[GrowFromCenter(p) for p in neg])
        bloc_neg, cadre_neg = self.bloc([
            Text("−3 < −2", font_size=34, color=WHITE),
            Text("(−3)² = 9   et   (−2)² = 4", font_size=24, color=WHITE),
            Text("9 > 4 : l'ordre est INVERSÉ", font_size=25, color=ROUGE_ERREUR),
        ], ROUGE_ERREUR)
        bloc_neg.move_to([3.5, -0.85, 0])
        cadre_neg.move_to(bloc_neg.get_center())
        self.play(FadeIn(bloc_neg), Create(cadre_neg))
        self.play(Flash(bloc_neg[2], color=ROUGE_ERREUR, line_length=0.3))

        self.play(Write(self.chute("« a < b donc a² < b² » n'est vrai que sur les positifs.",
                                   color=ROUGE_ERREUR)))
        self.attendre_voix()

    # ── écran 3 : reference_inverse — zéro est exclu ────────────────────────

    def ecran_inverse(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-inverse")
        self.titre_ecran("La fonction inverse : zéro est exclu")

        axes = self.axes_notion([-4, 4, 2], [-4, 4, 2],
                                x_length=4.6, y_length=3.4, font_size=20)
        axes.move_to([-3.7, -0.5, 0])
        gauche = axes.plot(lambda x: 1 / x, x_range=[-4, -0.26, 0.02],
                           color=BLEU_CALCUL, stroke_width=5)
        droite = axes.plot(lambda x: 1 / x, x_range=[0.26, 4, 0.02],
                           color=BLEU_CALCUL, stroke_width=5)
        self.play(Create(axes))
        self.play(Create(gauche), Create(droite))

        # ⛔ PAS de trait vertical en x = 0 : il se superpose à l'axe des
        # ordonnées, qui devient rouge — l'élève croit que c'est l'axe qui est
        # interdit (rendu de contrôle du 23/09). Les deux morceaux s'écartent
        # tout seuls ; la croix sur l'origine dit le reste.
        marque = self.croix().move_to(axes.c2p(0, 0))
        self.play(GrowFromCenter(marque))
        self.play(Flash(marque, color=ROUGE_ERREUR, line_length=0.3))

        interdit = VGroup(
            Text("1 ÷ 0  n'a pas de sens", font_size=32, color=ROUGE_ERREUR),
            Text("aucun nombre × 0 ne donne 1", font_size=23, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([3.4, 1.85, 0])
        self.play(FadeIn(interdit, shift=RIGHT * 0.2))

        domaine = Text("domaine : tous les réels SAUF 0", font_size=26, color=JAUNE_TITRE)
        if domaine.width > 6.4:
            domaine.scale_to_fit_width(6.4)
        domaine.move_to([3.4, 0.95, 0])
        self.play(Write(domaine))

        morceaux = VGroup(
            Text("deux morceaux", font_size=27, color=BLEU_CALCUL),
            Text("qui ne se rejoignent jamais", font_size=22, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([3.4, 0.1, 0])
        self.play(FadeIn(morceaux, shift=RIGHT * 0.2))

        # ⭐ DÉCROISSANTE, PUIS TOUT DE SUITE SON EXEMPLE (Frédéric, 23/09 :
        # « après avoir dit décroissante », puis « 1 < 2 alors 1/1 > 1/2 »).
        # ⛔ Son premier choix était 2 < 4 donc 1/2 > 1/4 : juste, mais à
        # l'écran les deux points ne sont séparés que de 0,25 unité sur une
        # échelle qui va de −4 à 4 — la baisse ne SE VOYAIT pas. Avec 1 et 2,
        # l'écart vertical double. Et « 1/1 » plutôt que « 1 » garde les deux
        # fractions parallèles à l'œil.
        for x, y in ((1, 1), (2, 0.5)):
            self.play(GrowFromCenter(Dot(axes.c2p(x, y), color=ORANGE_RETENUE,
                                         radius=0.08)), run_time=0.35)

        corps, cadre = self.bloc([
            Text("1 < 2    mais    1/1 > 1/2", font_size=28, color=WHITE),
            Text("décroissante : le sens s'INVERSE", font_size=24, color=ORANGE_RETENUE),
            Text("et sur CHACUN des morceaux, séparément", font_size=21, color=WHITE),
        ], ORANGE_RETENUE)
        corps.move_to([3.4, -1.45, 0])
        cadre.move_to(corps.get_center())
        self.play(FadeIn(corps), Create(cadre))
        self.play(Flash(corps[0], color=ORANGE_RETENUE, line_length=0.3))

        self.play(Write(self.chute("Pour comparer, il faut rester du même côté de zéro.")))
        self.attendre_voix()

    # ── écran 4 : reference_cube + reference_valeur_absolue ─────────────────

    def ecran_cube_absolue(self):
        self.clear()
        self.add_mascotte(scale=0.42)
        self.dire("04-cube-absolue")
        self.titre_ecran("Le cube, et la valeur absolue")

        # ⭐ LES DEUX COURBES REMONTENT pour laisser place, sous chacune, à SON
        # exemple d'ordre chiffré (Frédéric, 23/09 : « idem pour les autres
        # fonctions »). Ti-Margo monte jusqu'à y = −2,58 : rien ne descend plus
        # bas que −2,35.

        # À gauche : le cube, qui ne trahit jamais l'ordre.
        axes_c = self.axes_notion([-2, 2, 1], [-8, 8, 4],
                                  x_length=3.2, y_length=2.2, font_size=18)
        axes_c.move_to([-3.5, 1.2, 0])
        cube = axes_c.plot(lambda x: x ** 3, x_range=[-2, 2, 0.04],
                           color=BLEU_CALCUL, stroke_width=5)
        self.play(Create(axes_c), Create(cube))

        leg_c = VGroup(
            Text("x³  :  CROISSANTE partout", font_size=25, color=VERT_OK),
            Text("(−3)³ = −27 : le signe RESTE", font_size=22, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([-3.5, -0.7, 0])
        for m in leg_c:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.5)

        for x in (-2, 1):
            self.play(GrowFromCenter(Dot(axes_c.c2p(x, x ** 3), color=VERT_OK,
                                         radius=0.08)), run_time=0.3)
        ordre_c = VGroup(
            Text("−2 < 1    donc    −8 < 1", font_size=26, color=VERT_OK),
            Text("l'ordre est GARDÉ, négatifs compris", font_size=21, color=VERT_OK),
        ).arrange(DOWN, buff=0.18).move_to([-3.5, -1.95, 0])
        self.play(FadeIn(ordre_c, shift=UP * 0.12))

        # À droite : la valeur absolue, qui se comporte comme le carré.
        axes_v = self.axes_notion([-4, 4, 2], [-1, 4, 1],
                                  x_length=3.2, y_length=2.0, font_size=18)
        axes_v.move_to([3.4, 1.2, 0])
        vabs = axes_v.plot(lambda x: abs(x), x_range=[-4, 4, 0.04],
                           color=BLEU_CALCUL, stroke_width=5)
        self.play(Create(axes_v), Create(vabs))

        leg_v = VGroup(
            Text("|x|  :  une courbe en V", font_size=25, color=ORANGE_RETENUE),
            Text("|−4| = 4 : le signe DISPARAÎT", font_size=22, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([3.4, -0.7, 0])
        for m in leg_v:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.5)

        for x in (-3, -1):
            self.play(GrowFromCenter(Dot(axes_v.c2p(x, abs(x)), color=ROUGE_ERREUR,
                                         radius=0.08)), run_time=0.3)
        ordre_v = VGroup(
            Text("−3 < −1    mais    3 > 1", font_size=26, color=ROUGE_ERREUR),
            Text("le sens s'INVERSE, comme le carré", font_size=21, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.18).move_to([3.4, -1.95, 0])
        self.play(FadeIn(ordre_v, shift=UP * 0.12))

        self.play(Write(self.chute("Le cube garde le signe. La valeur absolue l'efface.")))
        self.attendre_voix()

    # ── écran 5 : reference_comparer — le récapitulatif, puis l'usage ───────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte(scale=0.42)
        self.dire("05-comparer")
        self.titre_ecran("Comparer sans calculer")

        # Les cinq d'un coup d'œil — la figure de la fiche, en bandeau.
        cinq = [
            ("x²", "tous réels", "creux en 0"),
            ("1/x", "sauf 0", "décroît"),
            ("√x", "x ≥ 0", "croît"),
            ("x³", "tous réels", "croît"),
            ("|x|", "tous réels", "creux en 0"),
        ]
        colonnes = VGroup()
        for nom, dom, var in cinq:
            colonnes.add(VGroup(
                Text(nom, font_size=28, color=JAUNE_TITRE),
                Text(dom, font_size=19, color=WHITE),
                Text(var, font_size=19, color=BLEU_CALCUL),
            ).arrange(DOWN, buff=0.16))
        colonnes.arrange(RIGHT, buff=0.85, aligned_edge=UP).move_to([0, 1.65, 0])
        if colonnes.width > 11.6:
            colonnes.scale_to_fit_width(11.6)
        bandeau = SurroundingRectangle(colonnes, color=JAUNE_TITRE,
                                       buff=0.25, stroke_width=2)
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.15) for c in colonnes],
                              lag_ratio=0.25))
        self.play(Create(bandeau))

        # L'usage : la question, puis les trois temps.
        question = VGroup(
            self.radical(15, font_size=44, color=WHITE),
            Text("et", font_size=28, color=WHITE),
            self.radical(17, font_size=44, color=WHITE),
            Text(": lequel est le plus grand ?", font_size=28, color=WHITE),
        ).arrange(RIGHT, buff=0.3, aligned_edge=DOWN).move_to([0, 0.35, 0])
        self.play(FadeIn(question, shift=DOWN * 0.15))

        etapes = VGroup(
            VGroup(Text("1.", font_size=28, color=BLEU_CALCUL),
                   Text("je SITUE : 15 et 17 sont positifs", font_size=28, color=WHITE)
                   ).arrange(RIGHT, buff=0.25),
            VGroup(Text("2.", font_size=28, color=BLEU_CALCUL),
                   Text("je LIS le sens : la racine carrée est croissante",
                        font_size=28, color=WHITE)).arrange(RIGHT, buff=0.25),
            VGroup(Text("3.", font_size=28, color=BLEU_CALCUL),
                   Text("je CONCLUS : elle conserve l'ordre",
                        font_size=28, color=WHITE)).arrange(RIGHT, buff=0.25),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.34).move_to([-0.6, -1.15, 0])
        for m in etapes:
            self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.5)

        reponse = VGroup(
            Text("15 < 17   donc", font_size=32, color=VERT_OK),
            self.radical(15, font_size=38, color=VERT_OK),
            Text("<", font_size=32, color=VERT_OK),
            self.radical(17, font_size=38, color=VERT_OK),
        ).arrange(RIGHT, buff=0.25, aligned_edge=DOWN).move_to([0, -2.35, 0])
        self.play(FadeIn(reponse, shift=UP * 0.15))
        self.play(Circumscribe(reponse, color=VERT_OK, buff=0.2))

        self.play(Write(self.chute("Une valeur approchée n'aurait rien DÉMONTRÉ.")))
        self.attendre_voix()

    # ── écran 6 : reference_resoudre — combien de solutions ? ───────────────

    def ecran_resoudre(self):
        self.clear()
        self.add_mascotte(scale=0.42)
        self.dire("06-resoudre")
        # ⛔ Titre COURT : « Résoudre f(x) = k : c'est le signe de k qui décide »
        # touchait les deux bords du cadre (`titre_ecran` ne borne pas la
        # largeur). La phrase entière est passée en bas d'écran.
        self.titre_ecran("Résoudre f(x) = k")

        cas = [
            ("x² = 9", "DEUX solutions", "−3  et  3", VERT_OK),
            ("x² = 0", "UNE solution", "0", BLEU_CALCUL),
            ("x² = −4", "AUCUNE", "un carré n'est\njamais négatif", ROUGE_ERREUR),
        ]
        blocs = VGroup()
        cadres = VGroup()
        for eq, combien, detail, couleur in cas:
            corps = VGroup(
                Text(eq, font_size=36, color=WHITE),
                Text(combien, font_size=26, color=couleur),
                Text(detail, font_size=22, color=WHITE, line_spacing=0.7),
            ).arrange(DOWN, buff=0.22)
            blocs.add(corps)
        blocs.arrange(RIGHT, buff=1.1, aligned_edge=UP).move_to([0, 1.2, 0])
        for corps, (_, _, _, couleur) in zip(blocs, cas):
            cadres.add(SurroundingRectangle(corps, color=couleur,
                                            buff=0.28, stroke_width=2.5))
        for corps, cadre in zip(blocs, cadres):
            self.play(FadeIn(corps), Create(cadre), run_time=0.7)

        # Et la racine : la fausse solution que la vérification élimine.
        eq = VGroup(
            self.radical("x", font_size=44, color=JAUNE_TITRE),
            Text("= −3", font_size=40, color=JAUNE_TITRE),
        ).arrange(RIGHT, buff=0.22, aligned_edge=DOWN).move_to([-3.6, -1.3, 0])
        self.play(FadeIn(eq, shift=DOWN * 0.15))

        verdict = Text("AUCUNE solution", font_size=34, color=ROUGE_ERREUR)
        verdict.move_to([-3.6, -2.15, 0])
        self.play(Write(verdict))

        piege = VGroup(
            Text("élever au carré donnerait x = 9…", font_size=25, color=WHITE),
            VGroup(Text("mais", font_size=25, color=WHITE),
                   self.radical(9, font_size=32, color=ORANGE_RETENUE),
                   Text("= 3,  et non −3", font_size=27, color=ORANGE_RETENUE)
                   ).arrange(RIGHT, buff=0.2, aligned_edge=DOWN),
        ).arrange(DOWN, buff=0.26).move_to([2.9, -1.7, 0])
        cadre_p = SurroundingRectangle(piege, color=ORANGE_RETENUE,
                                       buff=0.28, stroke_width=2.5)
        self.play(FadeIn(piege), Create(cadre_p))

        self.play(Write(self.chute(
            "C'est le SIGNE de k qui décide. On le regarde avant de calculer.")))
        self.attendre_voix()

    # ── défi et correction ──────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("07-defi")
        self.play(Write(Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)))

        q = VGroup(
            Text("1.  On sait que  −3 ≤ x ≤ −1.  Encadre x².",
                 font_size=32, color=WHITE),
            Text("2.  Compare  1/3  et  1/8,  sans calculatrice.",
                 font_size=32, color=WHITE),
            VGroup(Text("3.  Combien de solutions pour", font_size=32, color=WHITE),
                   self.radical("x", font_size=38, color=WHITE),
                   Text("= 7 ?", font_size=32, color=WHITE)
                   ).arrange(RIGHT, buff=0.22, aligned_edge=DOWN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.62).move_to([-0.3, 0.75, 0])
        for m in q:
            self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.55)

        indice = Text("Pense à regarder de quel côté de zéro tu es.",
                      font_size=27, color=BLEU_CALCUL).move_to([0, -1.35, 0])
        self.play(FadeIn(indice, shift=UP * 0.15))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.42)
        self.dire("08-correction")
        self.titre_ecran("Correction")

        # ⛔ Les trois corrections sont TROIS BLOCS EMPILÉS, chacun avec son
        # numéro dedans. Posés à la main (un numéro à gauche, son corps à
        # droite), le « 3. √x = 7 » venait se superposer à sa propre première
        # ligne — rendu de contrôle du 23/09. Ici c'est `arrange` qui décide.

        # 1. l'encadrement, sur un intervalle négatif
        bloc1 = VGroup(
            Text("1.  −3 ≤ x ≤ −1 : encadrer x²", font_size=29, color=VERT_OK),
            Text("l'intervalle est négatif, le carré DÉCROÎT : les bornes s'échangent",
                 font_size=24, color=WHITE),
            Text("(−1)² = 1  et  (−3)² = 9      donc   1 ≤ x² ≤ 9",
                 font_size=28, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2)

        # 2. l'inverse renverse l'ordre
        bloc2 = VGroup(
            Text("2.  comparer 1/3 et 1/8", font_size=29, color=VERT_OK),
            Text("3 < 8, et l'inverse DÉCROÎT sur les positifs : l'ordre s'inverse",
                 font_size=24, color=WHITE),
            Text("donc   1/3 > 1/8", font_size=28, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2)

        # 3. cette fois le signe autorise le carré
        bloc3 = VGroup(
            VGroup(Text("3.", font_size=29, color=VERT_OK),
                   self.radical("x", font_size=33, color=VERT_OK),
                   Text("= 7 : combien de solutions ?", font_size=29, color=VERT_OK)
                   ).arrange(RIGHT, buff=0.18, aligned_edge=DOWN),
            Text("7 est POSITIF : on a le droit d'élever au carré",
                 font_size=24, color=WHITE),
            VGroup(Text("x = 49,  et", font_size=28, color=VERT_OK),
                   self.radical(49, font_size=33, color=VERT_OK),
                   Text("= 7.      UNE solution.", font_size=28, color=VERT_OK)
                   ).arrange(RIGHT, buff=0.2, aligned_edge=DOWN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2)

        tout = VGroup(bloc1, bloc2, bloc3).arrange(DOWN, aligned_edge=LEFT, buff=0.48)
        if tout.width > 11.4:
            tout.scale_to_fit_width(11.4)
        tout.move_to([-0.3, -0.35, 0])

        for bloc in tout:
            for ligne in bloc:
                self.play(FadeIn(ligne, shift=RIGHT * 0.15), run_time=0.45)
        self.play(Circumscribe(bloc3[2], color=VERT_OK, buff=0.15))

        self.attendre_voix()

    # ── le montage ──────────────────────────────────────────────────────────

    def construct(self):
        # ⛔ PAS DE QUESTION SUR LA GARDE (Frédéric, 23/09 : « enlève la 1re
        # question au début », « tu peux mettre la question quand tu expliques
        # racine carrée, mais pas au début »). L'accroche annonce la tension —
        # deux des cinq refusent des nombres — et la question de l'image de −1
        # est POSÉE sur l'écran 1, là où on y répond.
        self.page_de_garde(
            titre="Les fonctions de référence",
            accroche="Deux d'entre elles refusent certains nombres.",
            promesse="Domaine · variations · courbe",
        )
        self.page_objectifs([
            "connaître les cinq fonctions : domaine, variations, courbe",
            "comparer deux nombres sans calculer",
            "résoudre f(x) = k, et dire combien il y a de solutions",
        ])
        self.ecran_domaine()
        self.ecran_carre()
        self.ecran_inverse()
        self.ecran_cube_absolue()
        self.ecran_comparer()
        self.ecran_resoudre()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "les cinq fonctions : domaine, variations, courbe",
                "comparer sans calculer, avec le sens de variation",
                "résoudre f(x) = k : le signe de k décide",
            ],
            rappel="« a < b donc a² < b² » est FAUX : sur les négatifs, l'ordre s'inverse.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  LE SHORT — le paradoxe du carré
# ══════════════════════════════════════════════════════════════════════════════

class FonctionsReference2deShortCarre(ShortSeconde):
    """⭐ L'ERREUR du chapitre, en un paradoxe : deux inégalités vraies qui ont
    l'air de se contredire.

    ⭐ Un short par NOTION, pas par micro — celui-ci prend `reference_carre`.
    ⭐ L'angle « −1 n'a pas d'image » n'est pas repris ici : il est déjà le
    short `racine-negatif` de la notion racine carrée.
    ⛔ LA DURÉE N'EST PAS UN CRITÈRE. Frédéric, 23/09 : « on doit se soucier de
    la compréhension et pas du temps du short ». Les shorts de cette notion
    font 63 à 81 s parce qu'ils DÉMONTRENT, chiffres à l'appui. On coupe ce qui
    n'aide pas à comprendre, jamais ce qui aide.

    Rendu :
      python -m manim render -qh --disable_caching manim/scripts/seconde/fonctions_reference_2de.py FonctionsReference2deShortCarre -o eleveai-maths-seconde-fonctions-reference-short-carre -r 1080,1920 --media_dir manim/scripts/seconde/media
    """

    dossier_voix = VOIX_CARRE

    def parabole(self, y=1.15, x_length=3.4, y_length=2.7):
        """La même parabole que l'écran 2 de la leçon, au format vertical."""
        axes = self.axes_notion([-3, 3, 1], [-1, 9, 2],
                                x_length=x_length, y_length=y_length, font_size=16)
        axes.move_to([0, y, 0])
        courbe = axes.plot(lambda x: x * x, x_range=[-3, 3, 0.04],
                           color=BLEU_CALCUL, stroke_width=4)
        return axes, courbe

    # ── 00 : le paradoxe, posé en trois temps ───────────────────────────────

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")

        un = self.grand("−3 < −2", font_size=62, color=WHITE).move_to([0, 2.5, 0])
        self.play(FadeIn(un, shift=DOWN * 0.15), run_time=0.45)

        mais = self.grand("et pourtant", font_size=34, color=WHITE).move_to([0, 1.5, 0])
        self.play(FadeIn(mais), run_time=0.35)

        deux = self.grand("(−3)² > (−2)²", font_size=54, color=ROUGE_ERREUR)
        deux.move_to([0, 0.6, 0])
        self.play(FadeIn(deux, shift=UP * 0.15), run_time=0.45)
        self.play(Flash(deux, color=ROUGE_ERREUR, line_length=0.4))

        verdict = self.grand("les deux sont VRAIES", font_size=38, color=JAUNE_TITRE)
        verdict.move_to([0, -0.7, 0])
        self.play(Write(verdict))
        self.attendre_voix(marge=0.4)

    # ── 01 : on vérifie, chiffre par chiffre ────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.margo_bas()
        self.dire("01-calcul")
        self.play(Write(self.grand("Vérifie", font_size=40, color=JAUNE_TITRE)
                        .move_to([0, 3.1, 0])))

        lignes = VGroup(
            self.grand("(−3)² = 9", font_size=50, color=VERT_OK),
            self.grand("(−2)² = 4", font_size=50, color=VERT_OK),
        ).arrange(DOWN, buff=0.35).move_to([0, 1.7, 0])
        for m in lignes:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.5)

        resultat = self.grand("9 > 4", font_size=88, color=ROUGE_ERREUR)
        resultat.move_to([0, -0.2, 0])
        self.play(GrowFromCenter(resultat))
        self.play(Flash(resultat, color=ROUGE_ERREUR, line_length=0.45))

        bilan = self.grand("l'ordre s'est retourné", font_size=36, color=ORANGE_RETENUE)
        bilan.move_to([0, -1.4, 0])
        self.play(Write(bilan))
        self.attendre_voix(marge=0.4)

    # ── 02 : le creux, et la branche qui descend ────────────────────────────

    def ecran_pourquoi(self):
        self.clear()
        self.margo_bas()
        self.dire("02-pourquoi")
        self.play(Write(self.grand("Pourquoi ?", font_size=42, color=JAUNE_TITRE)
                        .move_to([0, 3.15, 0])))

        axes, courbe = self.parabole()
        self.play(Create(axes), Create(courbe))
        self.play(GrowFromCenter(Dot(axes.c2p(0, 0), color=ROUGE_ERREUR, radius=0.07)))

        for x in (-3, -2):
            self.play(GrowFromCenter(Dot(axes.c2p(x, x * x), color=ORANGE_RETENUE,
                                         radius=0.08)), run_time=0.3)

        # ⛔ `grand()` borne à la largeur du cadre : une ligne LONGUE en gros
        # corps ressort PLUS PETITE qu'une ligne courte en petit corps, et la
        # hiérarchie s'inverse. L'idée forte se coupe donc en deux lignes.
        bas = VGroup(
            self.grand("à gauche,", font_size=40, color=ORANGE_RETENUE),
            self.grand("elle DESCEND", font_size=40, color=ORANGE_RETENUE),
            self.grand("le plus petit nombre donne", font_size=25, color=WHITE),
            self.grand("la plus grande image", font_size=25, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.3, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    # ── 03 : l'autre branche, celle qui se tient bien ───────────────────────

    def ecran_positifs(self):
        self.clear()
        self.margo_bas()
        self.dire("03-positifs")
        self.play(Write(self.grand("À droite, non", font_size=40, color=JAUNE_TITRE)
                        .move_to([0, 3.15, 0])))

        axes, courbe = self.parabole()
        self.play(Create(axes), Create(courbe))
        for x in (1, 2):
            self.play(GrowFromCenter(Dot(axes.c2p(x, x * x), color=VERT_OK,
                                         radius=0.08)), run_time=0.3)

        bas = VGroup(
            self.grand("1 < 2   et   1 < 4", font_size=40, color=VERT_OK),
            self.grand("l'ordre est GARDÉ", font_size=36, color=VERT_OK),
        ).arrange(DOWN, buff=0.3).move_to([0, -1.25, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.attendre_voix(marge=0.4)

    # ── 04 : la phrase fausse, barrée ───────────────────────────────────────

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")

        phrase = VGroup(
            self.grand("a < b  donc", font_size=42, color=WHITE),
            self.grand("a² < b²", font_size=54, color=WHITE),
        ).arrange(DOWN, buff=0.25).move_to([0, 2.3, 0])
        self.play(FadeIn(phrase, shift=DOWN * 0.15), run_time=0.5)

        # ⛔ La barre se TRACE (pas de caractère barré dans la police), et elle
        # barre LA CONCLUSION SEULE. Tracée sur le groupe entier, elle tombait
        # ENTRE les deux lignes et se lisait comme un trait de séparation :
        # elle ne barrait rien (planche de contrôle du 23/09).
        barre = Line(phrase[1].get_left() + LEFT * 0.15,
                     phrase[1].get_right() + RIGHT * 0.15,
                     color=ROUGE_ERREUR, stroke_width=9)
        self.play(Create(barre))
        faux = self.grand("FAUX", font_size=64, color=ROUGE_ERREUR).move_to([0, 0.9, 0])
        self.play(GrowFromCenter(faux))
        self.play(Flash(faux, color=ROUGE_ERREUR, line_length=0.4))

        vrai = VGroup(
            self.grand("vrai seulement", font_size=32, color=VERT_OK),
            self.grand("sur les POSITIFS", font_size=44, color=VERT_OK),
        ).arrange(DOWN, buff=0.25).move_to([0, -0.5, 0])
        for m in vrai:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)

        self.play(Write(self.chute("De quel côté de zéro es-tu ?",
                                   color=JAUNE_TITRE, font_size=30)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_calcul()
        self.ecran_pourquoi()
        self.ecran_positifs()
        self.ecran_retenir()
        self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  LE SHORT — la fonction inverse : la règle qui tombe en panne
# ══════════════════════════════════════════════════════════════════════════════

class FonctionsReference2deShortInverse(ShortSeconde):
    """⭐ Une règle VRAIE, et le cas où elle ne dit plus rien : c'est le piège
    de la fonction inverse, et il ne se voit qu'en franchissant zéro.

    Rendu : ajouter `-r 1080,1920`.
    """

    dossier_voix = VOIX_INVERSE

    def fraction_un_sur(self, denom, font_size=36, coul=ROUGE_ERREUR):
        """⭐ « 1 sur x » EMPILÉ, dénominateur EN COULEUR (Frédéric, 23/09 :
        « si tu affiches 1/1 mais le 1 rouge au dénominateur, l'élève
        comprendra »). En ligne, « 1/1 » et « 1/2 » se ressemblent trop : rien
        ne dit lequel des deux chiffres est le x qui varie. Empilé et coloré,
        l'œil voit que SEUL le bas change — et que le résultat, lui, baisse.
        """
        haut = Text("1", font_size=font_size, color=WHITE)
        bas = Text(str(denom), font_size=font_size, color=coul)
        corps = VGroup(haut, bas).arrange(DOWN, buff=0.28)
        demi = max(haut.width, bas.width) / 2 + 0.11
        barre = Line([-demi, 0, 0], [demi, 0, 0], stroke_width=4, color=WHITE)
        barre.move_to(corps.get_center())
        return VGroup(corps, barre)

    def hyperbole(self, y=1.2, x_length=3.3, y_length=2.7):
        axes = self.axes_notion([-4, 4, 2], [-4, 4, 2],
                                x_length=x_length, y_length=y_length, font_size=16)
        axes.move_to([0, y, 0])
        g = axes.plot(lambda x: 1 / x, x_range=[-4, -0.26, 0.02],
                      color=BLEU_CALCUL, stroke_width=4)
        d = axes.plot(lambda x: 1 / x, x_range=[0.26, 4, 0.02],
                      color=BLEU_CALCUL, stroke_width=4)
        return axes, g, d

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        self.play(Write(self.grand("La fonction inverse", font_size=36,
                                   color=WHITE).move_to([0, 3.05, 0])))
        mot = self.grand("DÉCROISSANTE", font_size=56, color=VERT_OK)
        mot.move_to([0, 2.05, 0])
        self.play(GrowFromCenter(mot))
        regle = VGroup(
            self.grand("le plus petit nombre", font_size=30, color=WHITE),
            self.grand("a le plus grand inverse", font_size=30, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([0, 0.75, 0])
        self.play(FadeIn(regle, shift=UP * 0.12), run_time=0.5)
        sauf = self.grand("sauf que…", font_size=52, color=ORANGE_RETENUE)
        sauf.move_to([0, -0.75, 0])
        self.play(Write(sauf), Flash(sauf, color=ORANGE_RETENUE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_marche(self):
        self.clear()
        self.margo_bas()
        self.dire("01-marche")
        self.play(Write(self.grand("Quand ça marche", font_size=40, color=VERT_OK)
                        .move_to([0, 3.1, 0])))

        depart = self.grand("1 < 2", font_size=56, color=WHITE).move_to([0, 2.35, 0])
        self.play(FadeIn(depart, shift=DOWN * 0.12), run_time=0.45)

        # ⭐ Seul le DÉNOMINATEUR change, et il est rouge : on le voit passer.
        # ⛔ En corps 46 le bloc mesurait 3,0 unités de haut : il montait dans
        # « 1 < 2 » et descendait dans la conclusion (planche du 23/09).
        f1 = self.fraction_un_sur(1)
        f2 = self.fraction_un_sur(2)
        bloc = VGroup(
            VGroup(f1, Text("= 1", font_size=38, color=WHITE)
                   ).arrange(RIGHT, buff=0.3),
            VGroup(f2, Text("= 0,5", font_size=38, color=WHITE)
                   ).arrange(RIGHT, buff=0.3),
        ).arrange(DOWN, buff=0.38).move_to([0, 0.55, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.5)

        concl = VGroup(
            self.grand("1 > 0,5", font_size=44, color=VERT_OK),
            self.grand("l'ordre s'est retourné", font_size=30, color=VERT_OK),
        ).arrange(DOWN, buff=0.25).move_to([0, -1.55, 0])
        self.play(FadeIn(concl, shift=UP * 0.12), run_time=0.5)
        self.attendre_voix(marge=0.4)

    def ecran_marche_pas(self):
        self.clear()
        self.margo_bas()
        self.dire("02-marchepas")
        self.play(Write(self.grand("Quand ça tombe", font_size=40, color=ROUGE_ERREUR)
                        .move_to([0, 3.1, 0])))

        depart = self.grand("−2 < 3", font_size=56, color=WHITE).move_to([0, 2.35, 0])
        self.play(FadeIn(depart, shift=DOWN * 0.12), run_time=0.45)

        f1 = self.fraction_un_sur("−2")
        f2 = self.fraction_un_sur(3)
        bloc = VGroup(
            VGroup(f1, Text("= −0,5", font_size=38, color=WHITE)
                   ).arrange(RIGHT, buff=0.3),
            VGroup(f2, Text("= 0,33", font_size=38, color=WHITE)
                   ).arrange(RIGHT, buff=0.3),
        ).arrange(DOWN, buff=0.38).move_to([0, 0.6, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.5)

        concl = VGroup(
            self.grand("−0,5 < 0,33", font_size=44, color=ROUGE_ERREUR),
            self.grand("l'ordre est CONSERVÉ", font_size=30, color=ROUGE_ERREUR),
            self.grand("la règle vient de tomber", font_size=28, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.22).move_to([0, -1.62, 0])
        for m in concl:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def ecran_pourquoi(self):
        self.clear()
        self.margo_bas()
        self.dire("03-pourquoi")
        self.play(Write(self.grand("Pourquoi ?", font_size=42, color=JAUNE_TITRE)
                        .move_to([0, 3.15, 0])))

        axes, g, d = self.hyperbole()
        self.play(Create(axes))
        self.play(Create(g), Create(d))
        self.play(GrowFromCenter(croix().move_to(axes.c2p(0, 0))))

        bas = VGroup(
            self.grand("DEUX morceaux", font_size=44, color=BLEU_CALCUL),
            self.grand("qui ne se rejoignent jamais", font_size=26, color=WHITE),
            self.grand("elle descend sur chacun,", font_size=26, color=ORANGE_RETENUE),
            self.grand("mais séparément", font_size=26, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.35, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        bloc = VGroup(
            self.grand("décroissante", font_size=38, color=VERT_OK),
            self.grand("sur les négatifs", font_size=34, color=VERT_OK),
            self.grand("décroissante", font_size=38, color=VERT_OK),
            self.grand("sur les positifs", font_size=34, color=VERT_OK),
        ).arrange(DOWN, buff=0.22).move_to([0, 1.9, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)

        jamais = VGroup(
            self.grand("JAMAIS", font_size=54, color=ROUGE_ERREUR),
            self.grand("de l'un à l'autre", font_size=34, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.22).move_to([0, -0.4, 0])
        self.play(FadeIn(jamais, shift=UP * 0.12), run_time=0.5)
        self.play(Flash(jamais[0], color=ROUGE_ERREUR, line_length=0.4))

        self.play(Write(self.chute("Même côté de zéro, sinon la règle ne dit rien.",
                                   color=JAUNE_TITRE, font_size=26)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_marche()
        self.ecran_marche_pas()
        self.ecran_pourquoi()
        self.ecran_retenir()
        self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  LE SHORT — le cube : les mêmes nombres, deux comportements opposés
# ══════════════════════════════════════════════════════════════════════════════

class FonctionsReference2deShortCube(ShortSeconde):
    """⭐ Le carré et le cube sur LE MÊME COUPLE de nombres : l'un retourne
    l'ordre, l'autre non. C'est la confusion que la fiche signale."""

    dossier_voix = VOIX_CUBE

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        depart = self.grand("−4  et  −2", font_size=58, color=WHITE)
        depart.move_to([0, 2.75, 0])
        self.play(FadeIn(depart, shift=DOWN * 0.12), run_time=0.45)

        a = VGroup(
            self.grand("au CARRÉ", font_size=40, color=ROUGE_ERREUR),
            self.grand("l'ordre se retourne", font_size=30, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.2).move_to([0, 1.35, 0])
        self.play(FadeIn(a, shift=UP * 0.12), run_time=0.5)

        b = VGroup(
            self.grand("au CUBE", font_size=40, color=VERT_OK),
            self.grand("il ne bouge pas", font_size=30, color=VERT_OK),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.15, 0])
        self.play(FadeIn(b, shift=UP * 0.12), run_time=0.5)

        self.play(Write(self.grand("mêmes nombres, deux résultats",
                                   font_size=28, color=JAUNE_TITRE)
                        .move_to([0, -1.4, 0])))
        self.attendre_voix(marge=0.4)

    def terme(self, base, exposant, valeur, font_size=42):
        """⭐ L'EXPOSANT EN ROUGE (Frédéric, 23/09 : « pareil pour les autres,
        le cube en rouge »). Entre « (−4)² = 16 » et « (−4)³ = −64 », un seul
        caractère change — et c'est lui qui retourne, ou non, l'ordre. Écrit
        tout en blanc, il passe inaperçu. `puissance()` du gabarit sait déjà
        colorer l'exposant seul : c'est exactement son `color_exp`.
        """
        return VGroup(
            self.puissance(base, exposant, font_size=font_size,
                           color_exp=ROUGE_ERREUR),
            Text(f"=  {valeur}", font_size=font_size, color=WHITE),
        ).arrange(RIGHT, buff=0.3, aligned_edge=DOWN)

    def _cas(self, voix, titre, coul, termes, verdict, coul_verdict):
        self.clear()
        self.margo_bas()
        self.dire(voix)
        self.play(Write(self.grand(titre, font_size=44, color=coul)
                        .move_to([0, 3.1, 0])))
        bloc = VGroup(*[self.terme(*t) for t in termes])
        bloc.arrange(DOWN, buff=0.4).move_to([0, 1.5, 0])
        if bloc.width > config.frame_width - 0.6:
            bloc.scale_to_fit_width(config.frame_width - 0.6)
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.5)

        ordre = self.grand("−4 < −2", font_size=38, color=WHITE).move_to([0, -0.5, 0])
        self.play(FadeIn(ordre))

        v = VGroup(*[self.grand(t, font_size=s, color=coul_verdict)
                     for t, s in verdict])
        v.arrange(DOWN, buff=0.25).move_to([0, -1.65, 0])
        for m in v:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(Flash(v[0], color=coul_verdict, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_carre(self):
        self._cas("01-carre", "Au carré", ROUGE_ERREUR,
                  [("(−4)", "2", "16"), ("(−2)", "2", "4")],
                  [("16 > 4", 52), ("l'ordre s'est retourné", 28)],
                  ROUGE_ERREUR)

    def ecran_cube(self):
        self._cas("02-cube", "Au cube", VERT_OK,
                  [("(−4)", "3", "−64"), ("(−2)", "3", "−8")],
                  [("−64 < −8", 52), ("l'ordre est gardé", 28)],
                  VERT_OK)

    def ecran_pourquoi(self):
        self.clear()
        self.margo_bas()
        self.dire("03-pourquoi")
        self.play(Write(self.grand("C'est le SIGNE", font_size=42, color=JAUNE_TITRE)
                        .move_to([0, 3.15, 0])))

        axes = self.axes_notion([-2, 2, 1], [-8, 8, 4],
                                x_length=3.3, y_length=2.7, font_size=16)
        axes.move_to([0, 1.2, 0])
        cube = axes.plot(lambda x: x ** 3, x_range=[-2, 2, 0.04],
                         color=BLEU_CALCUL, stroke_width=4)
        self.play(Create(axes), Create(cube))

        bas = VGroup(
            self.grand("un carré EFFACE le moins", font_size=28, color=ROUGE_ERREUR),
            self.grand("un cube le GARDE", font_size=32, color=VERT_OK),
            self.grand("sa courbe monte", font_size=26, color=WHITE),
            self.grand("et ne redescend jamais", font_size=26, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.35, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        a = VGroup(
            self.grand("le CUBE", font_size=46, color=VERT_OK),
            self.grand("ne trahit jamais l'ordre", font_size=30, color=VERT_OK),
            self.grand("négatifs compris", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([0, 2.0, 0])
        for m in a:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)

        b = VGroup(
            self.grand("le CARRÉ", font_size=46, color=ROUGE_ERREUR),
            self.grand("seulement sur les positifs", font_size=30, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.22).move_to([0, -0.2, 0])
        for m in b:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)

        self.play(Write(self.chute("Ne les confonds pas.",
                                   color=JAUNE_TITRE, font_size=30)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_carre()
        self.ecran_cube()
        self.ecran_pourquoi()
        self.ecran_retenir()
        self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  LE SHORT — la valeur absolue : deux nombres, une seule image
# ══════════════════════════════════════════════════════════════════════════════

class FonctionsReference2deShortAbsolue(ShortSeconde):
    """⭐ Une fonction peut donner la MÊME image à deux nombres différents.
    C'est l'occasion de dire que l'unicité vaut dans un seul sens."""

    dossier_voix = VOIX_ABSOLUE

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        # ⭐ Le MOINS en rouge : c'est le seul caractère qui sépare les deux
        # lignes, et c'est lui que la valeur absolue efface.
        large = config.frame_width - 0.6
        a = self.grand("| 4 |  =  4", font_size=54, color=VERT_OK)
        a.move_to([0, 2.5, 0])
        self.play(FadeIn(a, shift=DOWN * 0.12), run_time=0.45)
        # « | −4 |  =  4 » : le « − » est le caractère d'indice 2.
        b = colorie("| −4 |  =  4", {"[2:3]": ROUGE_ERREUR},
                    font_size=54, couleur=ORANGE_RETENUE, largeur_max=large)
        b.move_to([0, 1.5, 0])
        self.play(FadeIn(b, shift=DOWN * 0.12), run_time=0.45)
        self.play(Flash(b, color=ROUGE_ERREUR, line_length=0.3))

        c = VGroup(
            self.grand("deux nombres différents", font_size=32, color=WHITE),
            self.grand("la MÊME image", font_size=46, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.28).move_to([0, -0.2, 0])
        self.play(FadeIn(c, shift=UP * 0.12), run_time=0.5)
        self.play(Flash(c[1], color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_distance(self):
        self.clear()
        self.margo_bas()
        self.dire("01-distance")
        self.play(Write(self.grand("Une DISTANCE", font_size=44, color=JAUNE_TITRE)
                        .move_to([0, 3.1, 0])))

        # ⛔ `label_constructor=Text` : sans lui, les graduations passent par LaTeX.
        droite = NumberLine(x_range=[-5, 5, 1], length=3.8, include_numbers=True,
                            label_constructor=Text, font_size=18)
        droite.move_to([0, 1.5, 0])
        self.play(Create(droite))

        for x, coul in ((-4, ORANGE_RETENUE), (4, VERT_OK)):
            pt = Dot(droite.n2p(x), color=coul, radius=0.08)
            fleche = Arrow(droite.n2p(x), droite.n2p(0), color=coul, buff=0.05,
                           stroke_width=5, max_tip_length_to_length_ratio=0.18)
            fleche.shift(UP * 0.45)
            mesure = Text("4", font_size=26, color=coul)
            mesure.next_to(fleche, UP, buff=0.08)
            self.play(GrowFromCenter(pt), Create(fleche), FadeIn(mesure), run_time=0.55)

        bas = VGroup(
            self.grand("sa distance à zéro", font_size=32, color=WHITE),
            self.grand("une distance n'est", font_size=28, color=ROUGE_ERREUR),
            self.grand("jamais négative", font_size=32, color=ROUGE_ERREUR),
            self.grand("elle EFFACE le signe", font_size=32, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.25, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_courbe(self):
        self.clear()
        self.margo_bas()
        self.dire("02-courbe")
        self.play(Write(self.grand("Une courbe en V", font_size=42, color=JAUNE_TITRE)
                        .move_to([0, 3.15, 0])))

        axes = self.axes_notion([-4, 4, 2], [-1, 4, 1],
                                x_length=3.3, y_length=2.5, font_size=16)
        axes.move_to([0, 1.25, 0])
        v = axes.plot(lambda x: abs(x), x_range=[-4, 4, 0.04],
                      color=BLEU_CALCUL, stroke_width=4)
        self.play(Create(axes), Create(v))
        self.play(GrowFromCenter(Dot(axes.c2p(0, 0), color=ROUGE_ERREUR, radius=0.07)))

        bas = VGroup(
            self.grand("elle descend, puis remonte", font_size=27, color=WHITE),
            self.grand("la pointe est en zéro", font_size=27, color=WHITE),
            self.grand("comme le CARRÉ", font_size=38, color=ORANGE_RETENUE),
            self.grand("avec des segments droits", font_size=25, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.35, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_ordre(self):
        self.clear()
        self.margo_bas()
        self.dire("03-ordre")
        self.play(Write(self.grand("Donc l'ordre se retourne", font_size=34,
                                   color=ORANGE_RETENUE).move_to([0, 3.1, 0])))

        axes = self.axes_notion([-4, 4, 2], [-1, 4, 1],
                                x_length=3.3, y_length=2.3, font_size=16)
        axes.move_to([0, 1.5, 0])
        v = axes.plot(lambda x: abs(x), x_range=[-4, 4, 0.04],
                      color=BLEU_CALCUL, stroke_width=4)
        self.play(Create(axes), Create(v))
        for x in (-3, -1):
            self.play(GrowFromCenter(Dot(axes.c2p(x, abs(x)), color=ROUGE_ERREUR,
                                         radius=0.08)), run_time=0.3)

        large = config.frame_width - 0.6
        # « −3 < −1 » : les deux moins sont aux indices 0 et 5.
        bas = VGroup(
            colorie("−3 < −1", {"[0:1]": ROUGE_ERREUR, "[5:6]": ROUGE_ERREUR},
                    font_size=44, largeur_max=large),
            self.grand("mais", font_size=28, color=WHITE),
            self.grand("3 > 1", font_size=48, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.22).move_to([0, -1.1, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        a = VGroup(
            self.grand("jamais négative", font_size=46, color=VERT_OK),
        ).arrange(DOWN).move_to([0, 2.4, 0])
        self.play(FadeIn(a, shift=UP * 0.12), run_time=0.45)

        b = VGroup(
            self.grand("deux nombres opposés", font_size=30, color=WHITE),
            self.grand("ont la même", font_size=30, color=WHITE),
            self.grand("valeur absolue", font_size=34, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.2).move_to([0, 0.9, 0])
        for m in b:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)

        c = VGroup(
            self.grand("donc, quand tu résous :", font_size=28, color=WHITE),
            self.grand("DEUX solutions", font_size=46, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.25).move_to([0, -0.85, 0])
        self.play(FadeIn(c, shift=UP * 0.12), run_time=0.5)
        self.play(Flash(c[1], color=ROUGE_ERREUR, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_distance()
        self.ecran_courbe()
        self.ecran_ordre()
        self.ecran_retenir()
        self.ecran_renvoi()
