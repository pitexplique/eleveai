# frac_comparer_short.py
# EleveAI — Maths 5e — short jumeau de l'épisode 04 « Comparer des fractions »
# (micro fraction_comparer). CEINTURE BLANCHE (règle du short blanc, REGLES.md) :
# on VOIT qui est devant, puis la piste se recoupe ; un seul geste de calcul.
# Il AMUSE : « Qui mène ? » Léo, ANIMATEUR, lance une course d'escargots :
#   · EN HAUT, l'image qui bouge : deux escargots avancent sur leurs pistes ;
#   · EN BAS, au même instant, les barres du coach se colorient : 2/3 (vert)
#     et 7/12 (jaune) ; la barre verte est recoupée (chaque tiers en 4) :
#     2/3 = 8/12 > 7/12, le vert mène (même code couleur piste / barre) ;
#   · 1 question-pause (3 s) : 1/2 contre 3/6 → égalité ;
#   · fin : « 2/5 ou 3/10 : lequel mène ? » en commentaire (2/5 = 4/10).
# Centres d'intérêt : animaux, jeux-defis. Aucune donnée réelle citée.
# Vérifié (Python) : 2/3 = 8/12 > 7/12 ; 1/2 = 3/6 ; 2/5 = 4/10 > 3/10.
#
# Bases : 5e/frac_lotg_commun.py (ShortG ← 4e/frac_lotd_commun.py).
# Voix : manim/voix/5e-frac-comparer-short.json (débit −10) ; marques :
# manim/scripts/5e/frac_comparer_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/5e/frac_comparer_short.py FracComparerShort5e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/frac_comparer_short.py FracComparerShort5e -o eleveai-maths-5e-frac-comparer-short --media_dir manim/scripts/5e/media-frac-comparer-short
# Sortie : manim/sorties/5e/maths/fractions/04-comparer/eleveai-maths-5e-frac-comparer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotg_commun import *  # noqa: E402,F403

VERT, JAUNE = VERT_PART, "#facc15"
L_PISTE = 3.8
X0 = -L_PISTE / 2


def escargot(couleur, s=1.0):
    """Un escargot vu de profil, tourné vers la droite."""
    corps = RoundedRectangle(width=0.62, height=0.14, corner_radius=0.07, fill_color="#d6d3d1", fill_opacity=1,
                             stroke_width=0).move_to(P(0.05, -0.13))
    cornes = VGroup(*[Line(P(0.3, -0.08), P(0.38 + dx, 0.12), color="#d6d3d1", stroke_width=3) for dx in (0, 0.08)])
    coquille = Circle(radius=0.2, fill_color=couleur, fill_opacity=1, stroke_color="#1f2937", stroke_width=3)
    spirale = Arc(radius=0.1, start_angle=0, angle=1.6 * PI, color="#1f2937", stroke_width=3)
    return VGroup(corps, cornes, coquille, spirale).scale(s)


def piste(y, couleur):
    """Une piste : une bande sombre bordée de la couleur de l'escargot, un drapeau à l'arrivée."""
    bande = Rectangle(width=L_PISTE, height=0.5, fill_color="#292524", fill_opacity=1, stroke_color=couleur,
                      stroke_width=3).move_to(P(0, y))
    drapeau = VGroup(Line(P(0, 0), P(0, 0.5), color=WHITE, stroke_width=3),
                     Polygon(P(0, 0.5), P(0.25, 0.4), P(0, 0.3), fill_color=ROUGE_COACH, fill_opacity=1,
                             stroke_width=0)).move_to(P(L_PISTE / 2 - 0.08, y + 0.3))
    return VGroup(bande, drapeau)


class FracComparerShort5e(ShortG):
    nom_voix = "5e-frac-comparer-short"
    fichier_marques = "frac_comparer_short_marques.json"
    ceinture = "blanche"

    def barre(self, n, k, couleur, y):
        return Barre(n, k, largeur=L_PISTE, hauteur=0.42, couleur=couleur, marge=0.12, sw=2, centre=P(0, y))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Qui mène ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : la course ──
        self.dire("00-accroche")
        self.au_mot("Léo")
        nm = self.bloc(["Léo,", "animateur"], 30, BLEU_CALCUL).move_to(P(0, -2.3))
        self.play(FadeIn(nm, scale=0.8), run_time=0.4)
        pv, pj = piste(1.75, VERT), piste(0.95, JAUNE)
        ev, ej = escargot(VERT).move_to(P(X0 + 0.2, 1.75)), escargot(JAUNE).move_to(P(X0 + 0.2, 0.95))
        bv, bj = self.barre(3, 0, VERT, -0.1), self.barre(12, 0, JAUNE, -0.85)
        self.au_mot("course d'escargots")
        self.play(FadeIn(pv), FadeIn(pj), FadeIn(ev, shift=RIGHT * 0.2), FadeIn(ej, shift=RIGHT * 0.2),
                  bv.apparaitre(), bj.apparaitre(), run_time=0.8)
        fv = EcritureFraction(2, 3, fs=48, couleur=VERT).move_to(P(-1.0, -1.85))
        fj = EcritureFraction(7, 12, fs=48, couleur=JAUNE).move_to(P(1.0, -1.85))
        self.au_nb("fait 2")
        self.play(ev.animate.move_to(P(X0 + L_PISTE * 2 / 3 - 0.3, 1.75)), bv.colorier(range(2), lag=0.3),
                  FadeOut(nm), FadeIn(fv, scale=1.3), run_time=1.2, rate_func=linear)
        self.au_nb("jaune, 7")
        self.play(ej.animate.move_to(P(X0 + L_PISTE * 7 / 12 - 0.3, 0.95)), bj.colorier(range(7), lag=0.06),
                  FadeIn(fj, scale=1.3), run_time=1.2, rate_func=linear)
        self.au_mot("Qui mène")
        self.play(Write(titre), Wiggle(VGroup(ev, ej)), run_time=0.8)
        self.attendre_voix(marge=0.2)

        # ── 01 : recouper la piste verte ──
        self.dire("01-piste")
        self.au_nb("a 12")
        self.play(LaggedStart(*[Indicate(p, color=WHITE, scale_factor=1.1) for p in bj.parts], lag_ratio=0.05),
                  run_time=0.8)
        self.au_mot("On coupe")
        b12, anim = bv.repartager(4, run_time=1.2)
        self.play(anim, run_time=1.2)
        self.au_nb("tiers égale 8")
        g = EcritureFraction(8, 12, fs=48, couleur=VERT)
        eg = VGroup(fv.copy(), self.t("=", 48), g).arrange(RIGHT, buff=0.18).move_to(P(-0.85, -1.85))
        eg[1].sans_synchro = True
        self.play(fv.animate.move_to(eg[0]), FadeIn(eg[1]), FadeIn(g, scale=1.3), fj.animate.move_to(P(1.55, -1.85)),
                  run_time=0.5)
        self.au_nb("8 cases")
        tir = DashedLine(P(b12.x_trait(8), 2.1), P(b12.x_trait(8), -1.15), color=AMBRE, stroke_width=4,
                         dash_length=0.08)
        self.play(Create(tir), Indicate(VGroup(*b12.parts[:8]), color=WHITE), run_time=0.6)
        self.au_nb("contre 7")
        s = self.t(">", 48, VERT_OK).move_to(P(0.66, -1.85))
        s.sans_synchro = True
        self.play(FadeIn(s, scale=1.5), Indicate(VGroup(*bj.parts[:7]), color=WHITE), run_time=0.5)
        self.au_mot("le vert mène")
        self.play(Flash(ev, color=VERT), ev.animate.scale(1.4), run_time=0.5)
        self.play(ev.animate.scale(1 / 1.4), run_time=0.3)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        def apres(sc):
            sc.rep_mots(0, [("1/2", None, "C. 1"), ("= 3/6 :", None, "égale 3"), ("égalité !", None, "égalité")])
            sc.fin_rep()

        self.question_pause("02-question", "02b-reponse", ["Rouge : 1/2. Bleu : 3/6.", "Qui mène ?"],
                            [self.inline("le rouge", 30), self.inline("le bleu", 30), self.inline("égalité", 30)], 2,
                            ["1/2 = 3/6 : égalité !"], mot_q="Escargot rouge", autres_r=apres)
        self.vider(garder)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        pa, pb = piste(1.75, VERT), piste(0.95, JAUNE)
        ea, eb = escargot(VERT).move_to(P(X0 + 0.2, 1.75)), escargot(JAUNE).move_to(P(X0 + 0.2, 0.95))
        self.au_mot("un escargot")
        self.play(FadeIn(pa), FadeIn(pb), FadeIn(ea), FadeIn(eb), run_time=0.5)
        f1 = EcritureFraction(2, 5, fs=52, couleur=VERT).move_to(P(-1.0, -0.2))
        f2 = EcritureFraction(3, 10, fs=52, couleur=JAUNE).move_to(P(1.0, -0.2))
        self.au_nb("à 2")
        self.play(FadeIn(f1, scale=1.3), run_time=0.4)
        self.au_nb("l'autre à 3")
        self.play(FadeIn(f2, scale=1.3), run_time=0.4)
        self.au_mot("Lequel mène")
        q = self.t("Lequel mène ?", 36, ORANGE_RETENUE).move_to(P(0, -1.3))
        q.sans_synchro = True
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.appel_commentaire(y=-2.2)
