# trigonometrie_shorts.py
# EleveAI — les shorts de la trigonométrie (1re spé). La vidéo paysage est dans
# `trigonometrie.py` (TrigoCercle, vidéo 1 sur 2).
#
# ⭐ SHORT 1 — « Dix valeurs à apprendre ? Une seule ligne suffit. »
# Micro `trig_valeurs`. Choisi par Frédéric le 27/09 (« moi je ferai un short
# sur les valeurs remarquables »), script validé le même jour (« go »).
#   La ligne √0/2, √1/2, √2/2, √3/2, √4/2 donne les sinus de 0, π/6, π/4, π/3,
#   π/2 ; les cosinus sont la même ligne à l'envers ; le cercle empêche de les
#   échanger (petit angle, point bas, sinus petit).
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/trigonometrie_shorts.py TrigoShortValeurs -o eleveai-maths-premiere-trigonometrie-short-valeurs --media_dir manim/scripts/premiere/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np
from manim import *

from charte import *
from gabarit_seconde import SONS, ShortSeconde
from trigonometrie import TrigoBase, GRIS_DOUX, ORANGE_ATTENTION

ANGLES = [(0, 1), (1, 6), (1, 4), (1, 3), (1, 2)]
SINUS = ["0", "1/2", "2/2", "3/2", "1"]  # clés de TrigoBase.fval (« 2/2 » = √2/2)
COLS = [-1.72 + 0.86 * i for i in range(5)]  # cinq colonnes dans 4,5 unités


class TrigoShortValeurs(ShortSeconde, TrigoBase):

    dossier_voix = SONS / "premiere-trigonometrie-short-valeurs"

    def ligne(self, objets, y):
        for o, x in zip(objets, COLS):
            o.move_to([x, y, 0])
        return VGroup(*objets)

    def astuce(self, k, color=ORANGE_ATTENTION, font_size=24):
        return self.frac(self.radical(str(k), font_size=font_size, color=color),
                         self.T("2", font_size, color), color=color)

    # ── 00 : l'accroche — à l'image dès la première seconde ─────────────────
    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        haut = VGroup(
            self.grand("10 valeurs", font_size=56, color=JAUNE_TITRE),
            self.grand("à apprendre par cœur ?", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.18).move_to([0, 2.35, 0])
        non = self.grand("NON.", font_size=64, color=ROUGE_ERREUR).move_to([0, 1.0, 0])
        une = self.grand("Une seule ligne suffit :", font_size=30, color=VERT_OK).move_to([0, 0.05, 0])
        lig = self.ligne([self.astuce(k, font_size=26) for k in range(5)], -0.95)
        self.add(haut, non, une, lig)  # tout est là à la première seconde
        self.play(Flash(non, color=ROUGE_ERREUR, line_length=0.3), run_time=0.6)
        self.attendre_voix(marge=0.3)

    # ── 01 à 03 : le tableau se remplit, sans effacer ───────────────────────
    def ecrans_tableau(self):
        self.clear()
        self.margo_bas()
        self.dire("01-ligne")
        titre = self.grand("Une seule ligne", font_size=42, color=JAUNE_TITRE).move_to([0, 3.0, 0])
        self.play(Write(titre))
        # ⛔ Brouillon du 27/09 : un « x » en tête touchait π/4 ; les angles se
        # passent d'étiquette, et chaque ligne a sa légende AU-DESSUS, avec de l'air.
        angles = self.ligne([self.fpi(n, d, 24) for n, d in ANGLES], 2.2)
        self.play(LaggedStart(*[FadeIn(a, shift=DOWN * 0.1) for a in angles], lag_ratio=0.25))
        astuces = self.ligne([self.astuce(k) for k in range(5)], 1.15)
        self.play(LaggedStart(*[FadeIn(a, shift=DOWN * 0.1) for a in astuces], lag_ratio=0.35), run_time=2.2)
        # 0, 1, 2, 3, 4 : on entoure les nombres sous la racine.
        ronds = VGroup(*[Circle(radius=0.17, color=JAUNE_TITRE, stroke_width=3).move_to(a[0][0][-1].get_center()) for a in astuces])
        self.play(LaggedStart(*[Create(r) for r in ronds], lag_ratio=0.3), run_time=1.6)
        tout = self.grand("0, 1, 2, 3, 4 : c'est tout.", font_size=28, color=JAUNE_TITRE).move_to([0, 0.3, 0])
        self.play(Write(tout))
        self.attendre_voix(marge=0.3)

        # 02 : on simplifie → les sinus.
        self.dire("02-simplifier")
        self.play(FadeOut(ronds), FadeOut(tout))
        cap_sin = self.T("sin x", 26, ORANGE_ATTENTION).move_to([0, 0.4, 0])
        sinus = self.ligne([self.fval(v, 24, ORANGE_ATTENTION) for v in SINUS], -0.35)
        self.play(FadeIn(cap_sin))
        for i in (0, 1, 4, 2, 3):  # l'ordre de la voix : √0, √1, √4, puis le reste
            self.play(TransformFromCopy(astuces[i], sinus[i]), run_time=0.8)
        self.attendre_voix(marge=0.3)

        # 03 : la même ligne à l'envers → les cosinus.
        self.dire("03-cosinus")
        cap_cos = self.T("cos x : à l'envers", 26, VERT_OK).move_to([0, -1.05, 0])
        cosinus = self.ligne([self.fval(SINUS[4 - i], 24, VERT_OK) for i in range(5)], -1.8)
        self.play(FadeIn(cap_cos))
        self.play(LaggedStart(*[TransformFromCopy(sinus[4 - i], cosinus[i]) for i in range(5)], lag_ratio=0.3), run_time=2.4)
        self.attendre_voix(marge=0.3)

    # ── 04 : le cercle pour ne jamais les échanger ──────────────────────────
    def ecran_verifier(self):
        """LE SINUS EST UNE HAUTEUR, LE COSINUS UNE LONGUEUR AU SOL — et ça doit se
        VOIR (Frédéric, 27/09 : « il manque le cercle avec un arrêt à chaque
        valeur », « ça doit être visuel »).

        ⭐ SA CONVENTION DE CLASSE : « à mes élèves je dessine l'axe horizontal en
        rouge pour cos et vert pour sinus ». L'axe horizontal est ROUGE (cos),
        l'axe vertical VERT (sin) ; le segment rouge au sol et la barre verte
        reprennent ces couleurs. Sous le cercle, deux lignes se mettent à jour à
        chaque arrêt : cos(angle) = …, sin(angle) = ….
        Les barres vertes RESTENT : cinq hauteurs qui montent en escalier.
        """
        self.clear()
        self.margo_bas()
        self.dire("04-verifier")
        titre = self.grand("cos au sol, sin en hauteur", font_size=32, color=JAUNE_TITRE).move_to([0, 3.0, 0])
        self.play(Write(titre))

        C_COS, C_SIN = ROUGE_ERREUR, VERT_OK
        # ⛔ Frédéric, 27/09 : « tu n'as pas dessiné le cercle ». Le quart de
        # cercle zoomé ne se reconnaissait pas : on garde le CERCLE ENTIER.
        c = np.array([0, 0.65, 0])
        R = 1.55

        def pos(theta, rayon=R):
            return c + np.array([rayon * np.cos(theta), rayon * np.sin(theta), 0])

        sol = Arrow(c + LEFT * (R + 0.2), c + RIGHT * (R + 0.4), buff=0, color=C_COS, stroke_width=5,
                    max_tip_length_to_length_ratio=0.05)
        mur = Arrow(c + DOWN * (R + 0.02), c + UP * (R + 0.35), buff=0, color=C_SIN, stroke_width=5,
                    max_tip_length_to_length_ratio=0.05)
        quart = Circle(radius=R, color=BLEU_CALCUL, stroke_width=5).move_to(c)
        self.play(Create(sol), Create(mur), Create(quart),
                  FadeIn(self.T("cos", 22, C_COS).next_to(sol, DOWN, buff=0.08).align_to(sol, RIGHT)),
                  FadeIn(self.T("sin", 22, C_SIN).next_to(mur, RIGHT, buff=0.1).align_to(mur, UP)))

        theta = ValueTracker(0.0)
        rayon = always_redraw(lambda: Line(c, pos(theta.get_value()), color=WHITE, stroke_width=3))
        au_sol = always_redraw(lambda: Line(c, [pos(theta.get_value())[0], c[1], 0], color=C_COS, stroke_width=9))
        mobile = always_redraw(lambda: self.point(pos(theta.get_value()), JAUNE_TITRE, 0.11))
        self.play(FadeIn(rayon), FadeIn(au_sol), FadeIn(mobile), run_time=0.4)

        def lecture(n, d, cos_txt, sin_txt):
            """Les deux lignes sous le cercle, pour l'angle nπ/d."""
            l1 = self.rang("cos(", self.fpi(n, d, 22, WHITE), ") =", self.T(cos_txt, 28, C_COS), font_size=28, color=C_COS, buff=0.08)
            l2 = self.rang("sin(", self.fpi(n, d, 22, WHITE), ") =", self.T(sin_txt, 28, C_SIN), font_size=28, color=C_SIN, buff=0.08)
            return VGroup(l1, l2).arrange(DOWN, buff=0.28, aligned_edge=LEFT).move_to([0, -1.8, 0])

        # ⭐ Frédéric, 27/09 : « quand tu bouges le point, la valeur du cos et du sin
        # change ». Pendant le trajet, deux lignes VIVANTES donnent les valeurs
        # approchées, recalculées à chaque image ; à l'arrêt, la valeur exacte
        # prend le relais.
        def vivant():
            t = theta.get_value()
            fr = lambda v: f"{v:.2f}".replace(".", ",").replace("-", "−")
            l1 = self.T(f"cos x ≈ {fr(np.cos(t))}", 28, C_COS)
            l2 = self.T(f"sin x ≈ {fr(np.sin(t))}", 28, C_SIN)
            return VGroup(l1, l2).arrange(DOWN, buff=0.34, aligned_edge=LEFT).move_to([0, -1.8, 0])

        # ⛔ π/6, π/4 et π/3 sont à 15° l'un de l'autre : en rayon, leurs fractions
        # se recouvraient (deux essais du 27/09). Chacune a son décalage, mesuré.
        DECALAGES = {(1, 6): np.array([0.45, 0.0, 0]), (1, 4): np.array([0.42, 0.28, 0]),
                     (1, 3): np.array([0.2, 0.42, 0]), (1, 2): np.array([0.5, -0.4, 0])}

        # (n, d, cos, sin)
        arrets = [(0, 1, "1", "0"), (1, 6, "√3/2", "1/2"), (1, 4, "√2/2", "√2/2"), (1, 3, "1/2", "√3/2"), (1, 2, "0", "1")]
        affichage = None
        for n, d, cos_txt, sin_txt in arrets:
            cible = n * PI / d
            if cible > 0:
                live = always_redraw(vivant)
                self.remove(affichage)
                self.add(live)
                self.play(theta.animate.set_value(cible), run_time=1.1)
                self.remove(live)
                affichage = None
            p = pos(cible)
            anims = [FadeIn(self.point(p, WHITE, 0.08))]
            if cible > 0:
                anims.append(FadeIn(self.fpi(n, d, 22, WHITE).move_to(
                    p + DECALAGES[(n, d)])))
                barre = Line([p[0], c[1], 0], p, color=C_SIN, stroke_width=8)
                self.play(Create(barre), run_time=0.5)
            nouvel = lecture(n, d, cos_txt, sin_txt)
            anims.append(FadeIn(nouvel))
            affichage = nouvel
            self.play(*anims, run_time=0.45)
            self.wait(0.45)
        self.attendre_voix(marge=0.3)

    def construct(self):
        self.ecran_accroche()
        self.ecrans_tableau()
        self.ecran_verifier()
        self.ecran_renvoi("05-fin")


# ══════════════════════════════════════════════════════════════════════════════
#  SHORT 2 — « Le cosinus est-il positif ou négatif ? Demande au vent. »
#  Micro `trig_cos_sin` (signe du cosinus). ⭐ LA PÉDAGOGIE DE CLASSE DE
#  FRÉDÉRIC (28/09/2026) : « c'est comme ça que j'explique l'utilité du cosinus
#  et pourquoi il est positif ou négatif ». Tu avances vers la droite (axe
#  rouge), le vent souffle dans la direction de l'angle : le cosinus est la part
#  du vent qui te pousse vers l'avant. Script validé le 28/09 (« fais le short »).
#  Convention : axe ROUGE = cos, axe VERT = sin. Un clip par phrase.
#
#  Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/trigonometrie_shorts.py TrigoShortVent -o eleveai-maths-premiere-trigonometrie-short-vent --media_dir manim/scripts/premiere/media
# ══════════════════════════════════════════════════════════════════════════════

C_COS_V, C_SIN_V = ROUGE_ERREUR, VERT_OK


class TrigoShortVent(ShortSeconde, TrigoBase):

    dossier_voix = SONS / "premiere-trigonometrie-short-vent"
    C = np.array([0, 0.75, 0])  # ⛔ à 0,45, les verdicts du bas chevauchaient le pied de l'axe vert
    R = 1.55

    def P(self, t, r=None):
        r = self.R if r is None else r
        return self.C + np.array([r * np.cos(t), r * np.sin(t), 0])

    def cercle(self):
        c, R = self.C, self.R
        ax = Arrow(c + LEFT * (R + 0.2), c + RIGHT * (R + 0.4), buff=0, color=C_COS_V, stroke_width=5,
                   max_tip_length_to_length_ratio=0.05)
        ay = Arrow(c + DOWN * (R + 0.2), c + UP * (R + 0.35), buff=0, color=C_SIN_V, stroke_width=5,
                   max_tip_length_to_length_ratio=0.05)
        return VGroup(ax, ay, Circle(radius=R, color=BLEU_CALCUL, stroke_width=4).move_to(c),
                      self.T("cos", 22, C_COS_V).next_to(ax.get_end(), DOWN, buff=0.08))

    def toi(self):
        a = Arrow(self.C + LEFT * 0.05, self.C + RIGHT * 0.95, buff=0, color=WHITE, stroke_width=8,
                  max_tip_length_to_length_ratio=0.3)
        return VGroup(a, self.T("tu avances", 20, WHITE).next_to(a, DOWN, buff=0.12).shift(RIGHT * 0.3))

    def vent(self, theta):
        return always_redraw(lambda: Arrow(self.C, self.P(theta.get_value(), self.R * 0.95), buff=0, color=BLEU_CALCUL,
                                           stroke_width=8, max_tip_length_to_length_ratio=0.16))

    def part(self, theta):
        """La part du vent qui pousse vers l'avant : sa projection sur l'axe rouge."""
        seg = always_redraw(lambda: Line(self.C, [self.P(theta.get_value(), self.R * 0.95)[0], self.C[1], 0],
                                         color=C_COS_V, stroke_width=11))
        tir = always_redraw(lambda: DashedLine(self.P(theta.get_value(), self.R * 0.95),
                                               [self.P(theta.get_value(), self.R * 0.95)[0], self.C[1], 0],
                                               color=GRIS_DOUX, stroke_width=2.5, dash_length=0.1))
        return VGroup(tir, seg)

    def verdict(self, ligne1, n, d, val, signe, coul):
        l1 = self.grand(ligne1, font_size=30, color=WHITE)
        morceaux = ["cos(", self.fpi(n, d, 24, WHITE), ") =", self.fval(val, 26, coul)] + ([signe] if signe else [])
        l2 = self.rang(*morceaux, font_size=30, color=coul, buff=0.08)
        return VGroup(l1, l2).arrange(DOWN, buff=0.22).move_to([0, -1.75, 0])

    # ── 00 : l'accroche, à l'image dès la première seconde ──────────────────
    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        haut = VGroup(self.grand("cos > 0 ou cos < 0 ?", font_size=40, color=JAUNE_TITRE),
                      self.grand("Demande au vent.", font_size=36, color=BLEU_CALCUL)).arrange(DOWN, buff=0.2).move_to([0, -1.75, 0])  # sous le cercle : en haut, il touchait l'axe vert
        theta = ValueTracker(PI / 6)
        self.add(haut, self.cercle(), self.toi(), self.vent(theta))
        self.play(Flash(haut[1], color=BLEU_CALCUL, line_length=0.3), run_time=0.6)
        self.attendre_voix(marge=0.2)

    # ── 01 à 04 : un seul écran, synchronisé phrase par phrase ──────────────
    def ecran_vent(self):
        self.clear()
        self.margo_bas()
        titre = self.grand("Le cosinus et le vent", font_size=38, color=JAUNE_TITRE).move_to([0, 3.0, 0])
        self.add(titre)
        theta = ValueTracker(PI / 6)

        self.dire("01-toi")    # « tu avances vers la droite, le long de l'axe rouge »
        self.play(FadeIn(self.cercle()), run_time=0.6)
        t = self.toi()
        self.play(GrowArrow(t[0]), FadeIn(t[1]), run_time=0.9)
        self.attendre_voix(marge=0.15)

        self.dire("01-vent")   # « Et le vent souffle dans la direction de l'angle. »
        fl = self.vent(theta)
        nom = always_redraw(lambda: self.T("le vent", 22, BLEU_CALCUL).move_to(self.P(theta.get_value() + 0.45, self.R * 0.6)))
        self.play(FadeIn(fl), FadeIn(nom), run_time=0.8)
        self.attendre_voix(marge=0.15)

        self.dire("01-part")   # « Le cosinus, c'est la part du vent qui te pousse vers l'avant. »
        part = self.part(theta)
        self.play(FadeIn(part), run_time=0.8)
        explic = VGroup(self.grand("cos = la part du vent", font_size=28, color=C_COS_V),
                        self.grand("qui te pousse vers l'avant", font_size=28, color=C_COS_V)).arrange(DOWN, buff=0.12).move_to([0, -1.75, 0])
        self.play(FadeIn(explic))
        self.attendre_voix(marge=0.15)

        etapes = [
            ("02-aide", PI / 6, "π/6 : il t'aide", 1, 6, "3/2", "> 0", C_COS_V),
            ("03-cote", PI / 2, "π/2 : de côté", 1, 2, "0", "", WHITE),
            ("04-freine", 2 * PI / 3, "2π/3 : il te freine", 2, 3, "-1/2", "< 0", GRIS_DOUX),
        ]
        aff = explic
        for voix, ang, phrase, n, d, val, signe, coul in etapes:
            self.dire(voix)
            if abs(theta.get_value() - ang) > 1e-6:
                self.play(theta.animate.set_value(ang), FadeOut(aff), run_time=1.2)
            else:
                self.play(FadeOut(aff), run_time=0.3)
            aff = self.verdict(phrase, n, d, val, signe, coul)
            self.play(FadeIn(aff, shift=UP * 0.1), run_time=0.5)
            self.attendre_voix(marge=0.15)

        self.dire("04-retenir")  # « à droite de l'axe vert : positif ; à gauche : négatif »
        droite = Arc(radius=self.R + 0.12, start_angle=-PI / 2, angle=PI, arc_center=self.C, color=C_COS_V, stroke_width=9)
        gauche = Arc(radius=self.R + 0.12, start_angle=PI / 2, angle=PI, arc_center=self.C, color=GRIS_DOUX, stroke_width=9)
        bilan = VGroup(self.grand("à droite : cos > 0", font_size=30, color=C_COS_V),
                       self.grand("à gauche : cos < 0", font_size=30, color=GRIS_DOUX)).arrange(DOWN, buff=0.2).move_to([0, -1.75, 0])
        self.play(FadeOut(aff), Create(droite), Create(gauche), run_time=1.0)
        self.play(FadeIn(bilan))
        self.attendre_voix(marge=0.3)

    def construct(self):
        self.ecran_accroche()
        self.ecran_vent()
        self.ecran_renvoi("05-fin")
