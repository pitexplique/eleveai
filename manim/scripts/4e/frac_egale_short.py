# frac_egale_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 01 « Fractions égales »
# (micro fraction_egale). CEINTURE BLANCHE (règle du short blanc, REGLES.md) :
# on VOIT que deux fractions égales donnent la même couleur.
# Il AMUSE : « Le même rose ? » Aïcha, DÉCORATRICE, prépare un rose : 2 pots de
# rouge sur 5 :
#   · EN HAUT, l'image qui bouge : les pots se versent dans le seau, qui prend
#     la couleur du mélange (plus il y a de rouge, plus le rose est foncé) ;
#   · EN BAS, au même instant, la barre du coach se colorie (rouge = rouge) ;
#   · elle double tout : 4 sur 10 → même rose, la barre s'arrête au même endroit ;
#   · surprise : l'apprenti AJOUTE 1 pot de chaque (3 sur 6) → plus foncé :
#     le piège « ajouter » de la paysage ;
#   · 1 question-pause (3 s) : 6/15 (bon), 3/6 et 4/7 (on a ajouté) ;
#   · fin : « combien de pots de rouge sur 25 ? » en commentaire (10).
# Centres d'intérêt : art-design. Aucune donnée réelle citée.
#
# Voix : manim/voix/4e-frac-egale-short.json (débit −10) ; marques :
# manim/scripts/4e/frac_egale_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/frac_egale_short.py FracEgaleShort4e -o eleveai-maths-4e-frac-egale-short --media_dir manim/scripts/4e/media-frac-egale-short
# Sortie : manim/sorties/4e/maths/fractions/01-egale/eleveai-maths-4e-frac-egale-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotd_commun import *  # noqa: E402,F403

ROUGE_P, BLANC_P = "#dc2626", "#f8fafc"
Y_POTS, Y_SEAU, Y_BARRE = 1.75, 0.55, -0.75


def teinte(r):
    """La couleur du mélange : r = la part de rouge."""
    return interpolate_color(ManimColor(BLANC_P), ManimColor(ROUGE_P), min(1, r * 1.25))


def pot(c):
    corps = RoundedRectangle(width=0.28, height=0.36, corner_radius=0.05, fill_color=c, fill_opacity=1,
                             stroke_color="#475569", stroke_width=2)
    couv = Rectangle(width=0.32, height=0.07, fill_color="#94a3b8", fill_opacity=1, stroke_width=0).next_to(
        corps, UP, buff=0)
    return VGroup(corps, couv)


def pots(n, k):
    g = VGroup(*[pot(ROUGE_P if i < k else BLANC_P) for i in range(n)]).arrange(RIGHT, buff=0.06)
    if g.width > 3.9:
        g.scale_to_fit_width(3.9)
    return g.move_to(P(0, Y_POTS))


def seau(x=0.0):
    s = Polygon(P(-0.55, 0.38), P(0.55, 0.38), P(0.42, -0.38), P(-0.42, -0.38), fill_color="#334155",
                fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    peinture = Polygon(P(-0.5, 0.25), P(0.5, 0.25), P(0.42, -0.36), P(-0.42, -0.36), fill_color=BLANC_P,
                       fill_opacity=0, stroke_width=0)
    g = VGroup(s, peinture).move_to(P(x, Y_SEAU))
    g.peinture = peinture
    return g


class FracEgaleShort4e(ShortLotD):
    nom_voix = "4e-frac-egale-short"
    fichier_marques = "frac_egale_short_marques.json"
    ceinture = "blanche"

    def barre(self, n, y=Y_BARRE):
        return Barre(n, 0, largeur=3.8, hauteur=0.4, couleur=ROUGE_P, marge=0.1, sw=2, centre=P(0, y))

    def verser(self, p, s, r, b, k, run_time=1.0):
        """Les pots plongent vers le seau ; le seau prend la teinte r ; la barre se colorie."""
        return AnimationGroup(LaggedStart(*[x.animate.shift(DOWN * 0.25).set_opacity(0.35) for x in p], lag_ratio=0.05),
                              s.peinture.animate.set_fill(teinte(r), 1), b.colorier(range(k), lag=0.06),
                              run_time=run_time)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le même rose ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : 2 pots de rouge sur 5 ──
        self.dire("00-accroche")
        self.au_mot("Aïcha")
        ai = self.bloc(["Aïcha,", "décoratrice"], 30, BLEU_CALCUL).move_to(P(0, -1.75))
        self.play(FadeIn(ai, scale=0.8), run_time=0.4)
        self.au_mot("2 pots de rouge")
        p5 = pots(5, 2)
        s1 = seau()
        b5 = self.barre(5)
        f = EcritureFraction(2, 5, fs=44).move_to(P(-1.2, -2.4))
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in p5], lag_ratio=0.1), FadeIn(s1), b5.apparaitre(0.8),
                  FadeIn(f.num), FadeIn(f.trait), run_time=0.9)
        self.au_nb("sur 5 pots")
        e1 = self.t("2 sur 5", 26).next_to(s1, DOWN, buff=0.12)
        self.play(self.verser(p5, s1, 2 / 5, b5, 2), FadeOut(ai), FadeIn(f.den, scale=1.3), FadeIn(e1), run_time=1.0)
        self.au_mot("elle double tout")
        self.play(Write(titre), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : 4 sur 10 : même rose ──
        self.dire("01-double")
        self.au_mot("4 pots")
        self.play(FadeOut(p5), VGroup(s1, e1).animate.shift(LEFT * 1.2), run_time=0.4)
        p10 = pots(10, 4)
        s2 = seau(1.2)
        b10 = self.barre(10, Y_BARRE - 0.6)
        e2 = self.t("4 sur 10", 26).next_to(s2, DOWN, buff=0.12)
        e2.sans_synchro = True
        self.play(FadeIn(p10), FadeIn(s2), b10.apparaitre(0.6), FadeIn(e2), run_time=0.6)
        self.play(self.verser(p10, s2, 4 / 10, b10, 4), run_time=1.0)
        self.au_mot("Même rose")
        tir = DashedLine(P(b5.x_trait(2), b5.contour.get_top()[1] + 0.1), P(b5.x_trait(2), b10.contour.get_bottom()[1] - 0.1),
                         color=AMBRE, stroke_width=5, dash_length=0.08)
        lien = DoubleArrow(s1.get_right(), s2.get_left(), color=VERT_OK, buff=0.1)
        self.play(Create(tir), GrowFromCenter(lien), run_time=0.6)
        self.au_mot("4 dixièmes")
        g = EcritureFraction(4, 10, fs=44)
        eg = VGroup(f.copy(), self.t("=", 50, VERT_OK), g).arrange(RIGHT, buff=0.3).move_to(P(0, -2.35))
        eg[1].sans_synchro = True
        self.play(f.animate.move_to(eg[0]), FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.5)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 02 : le piège de l'apprenti (ajouter) ──
        self.dire("02-piege")
        s1 = seau(-1.2)
        s1.peinture.set_fill(teinte(2 / 5), 1)
        e1 = self.t("2 sur 5", 26).next_to(s1, DOWN, buff=0.12)
        e1.sans_synchro = True
        e1._pas_audit = True  # le décor de l'écran d'avant, redit
        b5 = self.barre(5)
        b5.colorier(range(2))
        for i in range(2):
            b5.parts[i].set_fill(ROUGE_P, 1)
        self.au_mot("Son apprenti")
        self.play(FadeIn(s1), FadeIn(e1), FadeIn(b5), run_time=0.4)
        self.au_nb("ajoute 1 pot")
        p6 = pots(6, 3)
        self.play(FadeIn(p6), run_time=0.5)
        self.play(Indicate(VGroup(p6[2], p6[5]), color=AMBRE, scale_factor=1.3), run_time=0.5)
        self.au_mot("3 sur 6")
        s3 = seau(1.2)
        b6 = self.barre(6, Y_BARRE - 0.6)
        e3 = self.t("3 sur 6", 26, ROUGE_ERREUR).next_to(s3, DOWN, buff=0.12)
        self.play(FadeIn(s3), b6.apparaitre(0.5), FadeIn(e3), run_time=0.5)
        self.play(self.verser(p6, s3, 3 / 6, b6, 3), run_time=1.0)
        self.au_mot("plus foncé")
        tir = DashedLine(P(b5.x_trait(2), b5.contour.get_top()[1] + 0.1), P(b5.x_trait(2), b6.contour.get_bottom()[1] - 0.1),
                         color=AMBRE, stroke_width=5, dash_length=0.08)
        self.play(Create(tir), Indicate(s3, color=ROUGE_ERREUR, scale_factor=1.15), run_time=0.7)
        self.au_mot("la moitié")
        m = self.t("1/2 > 2/5", 40, ROUGE_ERREUR).move_to(P(0, -2.3))
        m.sans_synchro = True
        self.play(FadeIn(m, scale=1.3), run_time=0.4)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["Quel mélange donne", "le même rose que 2 sur 5 ?"],
                            [self.inline("6 sur 15", 30), self.inline("3 sur 6", 30), self.inline("4 sur 7", 30)], 0,
                            ["2 × 3 = 6 et 5 × 3 = 15"], mot_q="Quel mélange")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        p25 = pots(25, 0)
        s4 = seau()
        s4.peinture.set_fill(teinte(2 / 5), 1)
        self.au_mot("le même rose")
        self.play(FadeIn(s4), run_time=0.4)
        self.au_mot("sur 25")
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in p25], lag_ratio=0.03), run_time=0.8)
        q = VGroup(self.t("? pots de rouge", 32, ORANGE_TROU), self.t("sur 25", 32)).arrange(DOWN, buff=0.1).move_to(P(0, -0.55))
        sans_synchro(q)
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        self.insister(q[0], 1.2)
        self.appel_commentaire(y=-1.6)
