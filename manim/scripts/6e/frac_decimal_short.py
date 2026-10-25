# frac_decimal_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 04 « Fraction et nombre
# décimal » (micro fraction_decimal). CEINTURE JAUNE (pas blanche) : on voit
# la barre se remplir, mais le short montre aussi le calcul 3 ÷ 4 = 0,75 et le
# passage au pourcentage : un cran au-dessus du short blanc « on voit ».
# Il AMUSE : Hugo, INGÉNIEUR DU SON, crée une appli de musique. La chanson dure
# 4 minutes, on en a écouté 3 :
#   · EN HAUT, l'appli : la barre de lecture avance minute par minute ;
#   · EN BAS, au même instant, la barre du coach (4 parts, une par minute) se
#     colorie, part pour part, EXACTEMENT sous la barre de lecture ;
#   · surprise : l'appli calcule 3 ÷ 4 = 0,75 et affiche 75 % ;
#   · 1 question-pause (3 s) : à la moitié, l'appli affiche 50 % (leurres
#     12 % et 0,5 %, les erreurs de Frédéric : coller les chiffres, 0,5 = 0,5 %) ;
#   · fin : « 1 minute sur 4 : quel pourcentage ? » en commentaire (25 %).
# Centres d'intérêt : musique, technologie-ia.
#
# Voix : manim/voix/6e-frac-decimal-short.json (débit −10) ; marques :
# manim/scripts/6e/frac_decimal_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/frac_decimal_short.py FracDecimalShort6e -o eleveai-maths-6e-frac-decimal-short --media_dir manim/scripts/6e/media-frac-decimal-short
# Sortie : manim/sorties/6e/maths/fractions/04-decimal/eleveai-maths-6e-frac-decimal-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_commun import *  # noqa: E402,F403

LARG = 3.4
X0 = -LARG / 2
Y_APP, Y_BARRE = 1.35, -0.25
VERT_APP = "#22c55e"


def appli():
    """La carte de l'appli : pochette, titre, piste de lecture vide.
    .piste .plein .bouton .pochette ; la barre va de X0 à X0 + LARG."""
    fond = RoundedRectangle(width=4.0, height=1.75, corner_radius=0.2, fill_color="#111827", fill_opacity=1,
                            stroke_color="#475569", stroke_width=3).move_to(P(0, Y_APP))
    pochette = RoundedRectangle(width=0.7, height=0.7, corner_radius=0.08, fill_color="#7c3aed", fill_opacity=1,
                                stroke_width=0).move_to(P(-1.45, Y_APP + 0.38))
    note = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).rotate(-PI / 2).scale(0.18).move_to(pochette)
    titre = Text("Ma chanson", font_size=26, color=WHITE).next_to(pochette, RIGHT, buff=0.25)
    titre.sans_synchro = True
    piste = Line(P(X0, Y_APP - 0.35), P(X0 + LARG, Y_APP - 0.35), color="#475569", stroke_width=8)
    plein = Line(P(X0, Y_APP - 0.35), P(X0 + 0.001, Y_APP - 0.35), color=VERT_APP, stroke_width=8)
    bouton = Dot(P(X0, Y_APP - 0.35), radius=0.1, color=WHITE)
    g = VGroup(fond, pochette, note, titre, piste, plein, bouton)
    g.piste, g.plein, g.bouton = piste, plein, bouton
    return g


def avancer(app, x_frac, run_time=0.6):
    """La lecture avance jusqu'à x_frac (0 à 1) de la chanson."""
    y = app.piste.get_y()
    x_dep = app.plein.get_end()[0]
    x_fin = X0 + LARG * x_frac

    def maj(m, a):
        x = x_dep + (x_fin - x_dep) * a
        m[0].put_start_and_end_on(P(X0, y), P(max(X0 + 0.001, x), y))
        m[1].move_to(P(x, y))

    return UpdateFromAlphaFunc(VGroup(app.plein, app.bouton), maj, run_time=run_time, rate_func=smooth)


class FracDecimalShort6e(ShortFrac):
    nom_voix = "6e-frac-decimal-short"
    fichier_marques = "frac_decimal_short_marques.json"
    ceinture = "jaune"

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.22).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.15).set_x(0)
        ph.next_to(cartes, DOWN, buff=0.15).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def temps(self, s, app):
        t = Text(s, font_size=24, color="#cbd5e1")
        t.sans_synchro = True
        return t.next_to(app.piste, DOWN, buff=0.12).align_to(app.piste, RIGHT)

    def barre(self):
        return Barre(4, 0, largeur=LARG, hauteur=0.45, couleur=VERT_APP, marge=0.12, sw=2, centre=P(0, Y_BARRE))

    def minute(self, app, b, k, tps):
        """La minute k : la lecture avance d'un quart ET la part k se colorie,
        juste dessous (un pointillé relie les deux)."""
        x = X0 + LARG * (k + 1) / 4
        lien = DashedLine(P(x, app.piste.get_y() - 0.15), P(x, b.contour.get_top()[1]), color=AMBRE,
                          stroke_width=4, dash_length=0.08)
        neuf = self.temps(f"{k + 1}:00 / 4:00", app)
        self.play(avancer(app, (k + 1) / 4, 0.5), b.colorier([k], lag=0), Transform(tps, neuf), run_time=0.5)
        self.play(Create(lien), run_time=0.25)
        self.play(FadeOut(lien), run_time=0.2)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("La barre de lecture", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Hugo et son appli ──
        self.dire("00-accroche")
        self.au_mot("Hugo")
        hg = self.ligne([("Hugo,", BLEU_CALCUL), ("ingénieur du son", WHITE)], 30).move_to(P(0, -1.3))
        self.play(FadeIn(hg, scale=0.8), run_time=0.4)
        app = appli()
        self.au_mot("une appli")
        self.play(FadeIn(app, shift=UP * 0.2), run_time=0.6)
        self.au_mot("4 minutes")
        tps = self.temps("0:00 / 4:00", app)
        b = self.barre()
        self.play(FadeIn(tps), b.apparaitre(0.8), FadeOut(hg), run_time=0.8)
        self.au_mot("écouté 3")
        l3 = self.ligne([("écouté :", WHITE), ("3", VERT_APP), ("min", WHITE)], 30).move_to(P(0, -1.3))
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Que doit afficher")
        self.play(Write(titre), Indicate(app.piste, color=AMBRE), run_time=0.7)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(l3), run_time=0.3)

        # ── 01 : minute par minute ──
        self.dire("01-minutes")
        for k, mot in enumerate(["1 minute", "2 minutes", "3 minutes"]):
            self.au_mot(mot)
            self.minute(app, b, k, tps)
        self.au_mot("3 quarts")
        f = EcritureFraction(3, 4, fs=60).move_to(P(-1.2, -1.6))
        self.play(FadeIn(f, scale=1.4), run_time=0.4)
        self.insister(f, 1.2)
        self.attendre_voix(marge=0.2)

        # ── 02 : la surprise : 0,75 → 75 % ──
        self.dire("02-surprise")
        self.au_mot("3 divisé par 4")
        d = self.ligne([("= 3 ÷ 4", WHITE)], 38).next_to(f, RIGHT, buff=0.25)
        d.set_y(f.trait.get_y())
        self.play(FadeIn(d, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("0,75")
        r = self.ligne([("= 0,75", BLEU_CALCUL)], 44).move_to(P(0.3, -2.55))
        self.play(FadeIn(r, scale=1.3), run_time=0.4)
        self.au_mot("75 %")
        pc = Text("75 %", font_size=30, color=VERT_APP, weight=BOLD).next_to(app.piste, DOWN, buff=0.1)
        pc.align_to(app.piste, LEFT)
        self.play(FadeIn(pc, scale=1.6), Flash(pc, color=VERT_APP, flash_radius=0.5), run_time=0.6)
        self.insister(pc, 1.3)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["À la moitié de la chanson,", "l'appli affiche :"],
                            [self.inline("12 %", 30), self.inline("50 %", 30), self.inline("0,5 %", 30)], 1,
                            ["1/2 = 0,5 = 50 %"], mot_q="moitié")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        app = appli()
        b = self.barre()
        tps = self.temps("0:00 / 4:00", app)
        self.add(app, b, tps)
        self.au_mot("1 minute sur 4")
        self.minute(app, b, 0, tps)
        self.au_mot("Quel pourcentage")
        q = self.ligne([("?", ORANGE_TROU), ("%", VERT_APP)], 30).next_to(app.piste, DOWN, buff=0.1)
        q.align_to(app.piste, LEFT)
        self.play(FadeIn(q, scale=1.4), run_time=0.4)
        self.insister(q[0], 1.5)
        self.appel_commentaire(y=-1.5)
