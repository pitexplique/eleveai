# convexite_defi_short.py
# EleveAI — Maths Tle spé — short « le vélo suivant » (9:16), ceinture BLANCHE.
# Micro du coach : convexite_defi. Paysage jumelle : convexite_defi.py.
#   · 00-accroche   : l'atelier de vélos ; le vélo suivant coûte de moins en
#                     moins cher, puis de plus en plus ;
#   · 01-image      : EN HAUT les barres du coût du vélo suivant (un vélo roule
#                     sous les barres), EN BAS la courbe du coût total qui se
#                     trace EN MÊME TEMPS : orange (bosse) tant que les barres
#                     baissent, bleue (creux) quand elles remontent ; la plus
#                     petite barre exactement au-dessus du point d'inflexion ;
#   · 02/02b        : question-pause (A : le point d'inflexion), 3 s ;
#   · 03-commentaire: C''(q) = 6q − 30, « pour quel q ? » (la réponse n'est
#                     PAS affichée) ;
#   · 04-abonne     : la fin standard.
# Les barres : C'(q) = 3q² − 24q + 60 pour q = 0, 1, …, 10 (minimum 12 en 4) ;
# la courbe : C(q) = q³ − 12q² + 60q, inflexion en 4. Même abscisse en haut et
# en bas : la barre q est pile au-dessus du point de la courbe d'abscisse q.
# ⛔ Pas de LaTeX : tout en Text. ⛔ Rien avant que la voix le dise (au_mot).
#
# Voix : manim/voix/terminale-convexite-defi-short.json (débit −6),
# calée par convexite_defi_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/terminale/convexite_defi_short.py ConvexiteDefiShort
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/convexite_defi_short.py ConvexiteDefiShort -o eleveai-maths-terminale-convexite-defi-short --media_dir manim/scripts/terminale/media-convexite-defi-short

import re
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

from convexite_defi import C, Cp, Graphe, velo  # noqa: E402  (même dossier : mon propre épisode)

assert min(range(11), key=Cp) == 4 and Cp(4) == 12 and 6 * 5 - 30 == 0

LARGEUR_MAX = 3.8
CONVEXE, CONCAVE = BLEU_CALCUL, ORANGE_RETENUE
FOND_CARTE = "#0b1220"
XA, XB = -1.8, 1.8           # q = 0 et q = 10, en haut comme en bas
Y_BARRES, H120 = 0.3, 1.75   # le pied des barres ; la hauteur de 120
G = Graphe((0, 10.6), (0, 430), (XA, -2.35), (XA + (XB - XA) * 1.06, -0.3))


def xq(q):
    return XA + (XB - XA) * q / 10


def barre(k, couleur=None):
    h = Cp(k) * H120 / 120
    c = couleur or (CONCAVE if k < 4 else (VERT_OK if k == 4 else CONVEXE))
    return Rectangle(width=0.26, height=h, stroke_width=0, fill_color=c, fill_opacity=0.9).move_to(
        P(xq(k), Y_BARRES + h / 2))


class ConvexiteDefiShort(AuditSynchro, MotsCales, Short6e):
    fichier_marques = "convexite_defi_short_marques.json"
    nom_voix = "terminale-convexite-defi-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def au_pos(self, i):
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > 0.03:
            self.wait(reste)

    def dire(self, nom, dossier=None):
        import os
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def carte(self, lettre, corps, largeur=3.7, fs=21):
        rond = Circle(radius=0.22, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.2)
        if ligne.width > largeur - 0.9:
            ligne.scale_to_fit_width(largeur - 0.9)
        cadre = RoundedRectangle(width=largeur, height=0.52, corner_radius=0.12, stroke_color=BLEU_CALCUL,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.15, LEFT)
        return VGroup(cadre, ligne)

    def construct(self):
        self.margo_bas()
        titre = self.t("La convexité", 40, JAUNE_TITRE).move_to(P(0, 3.45))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.9))
        self.add(titre, badge)

        # ── 00 : l'atelier ; le vélo suivant coûte de moins en moins, puis plus ──
        self.dire("00-accroche")
        sol = Line(P(-1.95, 0.75), P(1.95, 0.75), stroke_width=3, color=GREY_B)
        v = velo(0.75).move_to(P(-3.2, 1.25))
        lat = self.t("un atelier de vélos", 30, GREY_A).move_to(P(0, 2.2))
        self.au_mot("atelier de vélos")
        self.play(Create(sol), FadeIn(lat), v.animate.move_to(P(0, 1.25)), run_time=0.9)
        self.au_mot("le vélo suivant")
        suiv = self.t("le vélo suivant coûte…", 32).move_to(P(0, -0.1))
        self.play(FadeIn(suiv, shift=UP * 0.1), run_time=0.35)
        self.au_mot("de moins en moins")
        m1 = self.t("de moins en moins cher…", 32, CONCAVE).move_to(P(0, -0.7))
        f1 = Arrow(P(1.7, -0.45), P(1.7, -1.0), buff=0, color=CONCAVE, stroke_width=5)
        self.play(FadeIn(m1, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("puis de plus")
        m2 = self.t("… puis de plus en plus.", 32, CONVEXE).move_to(P(0, -1.3))
        self.play(FadeIn(m2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Où est")
        ou = VGroup(self.t("Où est le vélo", 36, JAUNE_TITRE), self.t("le moins cher ?", 36, JAUNE_TITRE))
        ou.arrange(DOWN, buff=0.1).move_to(P(0, -2.2))
        self.play(FadeIn(ou, scale=1.2), v.animate.shift(RIGHT * 0.15), run_time=0.4)
        self.insister(ou, 1.1)
        self.attendre_voix(marge=0.2)

        # ── 01 : les barres EN HAUT, la courbe EN BAS, en même temps ──
        self.dire("01-image")
        qv = ValueTracker(0)
        base = Line(P(XA - 0.25, Y_BARRES), P(XB + 0.25, Y_BARRES), stroke_width=2, color=GREY_B)
        lb = self.t("coût du vélo suivant", 26, GREY_A).move_to(P(0, 2.3))
        ax = G.axes()
        lq = self.t("q", 24, GREY_A).next_to(G.G(10.6, 0), DOWN, buff=0.08).align_to(G.G(10.6, 0), RIGHT)
        lc = self.t("coût total", 24, GREY_A).next_to(G.G(0, 430), RIGHT, buff=0.1)
        self.au_mot("Chaque barre")
        self.play(FadeOut(VGroup(sol, lat, suiv, m1, m2, ou)), v.animate.scale(0.3).move_to(P(xq(0), 0.0)),
                  Create(base), Create(ax), FadeIn(lq), run_time=0.6)
        self.au_mot("le coût du vélo suivant")
        b0 = barre(0, CONCAVE)
        self.play(FadeIn(lb), GrowFromEdge(b0, DOWN), run_time=0.4)
        # le tracé synchrone : la barre k paraît quand le vélo passe en k
        barres = VGroup(b0)
        vus = {0}

        def courbe_jusque():
            q = max(qv.get_value(), 0.05)
            g = VGroup(G.courbe(C, 0, min(q, 4), CONCAVE, 6, n=60))
            if q > 4.02:
                g.add(G.courbe(C, 4, q, CONVEXE, 6, n=60))
            return g

        courbe = always_redraw(courbe_jusque)
        pt = always_redraw(lambda: Dot(G.G(qv.get_value(), C(qv.get_value())), radius=0.08, color=WHITE))
        lien = always_redraw(lambda: DashedLine(P(xq(qv.get_value()), Y_BARRES - 0.3),
                                                G.G(qv.get_value(), C(qv.get_value())) + UP * 0.1,
                                                color=GREY_B, stroke_width=2, dash_length=0.08))
        v.add_updater(lambda m: m.move_to(P(xq(qv.get_value()), 0.0)))

        def pousse(m):
            k = int(qv.get_value() + 1e-6)
            for j in range(11):
                if j <= k and j not in vus:
                    vus.add(j)
                    barres.add(barre(j, CONCAVE if j <= 4 else CONVEXE))
        barres.add_updater(pousse)
        self.add(courbe, pt, lien, barres)
        self.au_mot("Les barres baissent")
        self.play(qv.animate.set_value(2), run_time=0.8, rate_func=linear)
        self.au_mot("coût total")
        self.play(FadeIn(lc), qv.animate.set_value(4), run_time=0.8, rate_func=linear)
        self.au_mot("concave")
        lcc = self.t("concave", 30, CONCAVE).move_to(G.G(2.0, 230))
        lcc.shift(RIGHT * max(0, G.G(0, 0)[0] + 0.12 - lcc.get_left()[0]))  # pas sur l'axe vertical
        self.play(FadeIn(lcc, scale=1.3), run_time=0.3)
        self.au_mot("Les barres remontent")
        self.play(qv.animate.set_value(10), run_time=1.6, rate_func=linear)
        self.au_mot("convexe")
        lcv = self.t("convexe", 30, CONVEXE).move_to(G.G(7.2, 85))
        self.play(FadeIn(lcv, scale=1.3), run_time=0.3)
        barres.clear_updaters()
        courbe.clear_updaters()
        pt.clear_updaters()
        lien.clear_updaters()
        v.clear_updaters()
        self.au_mot("La plus petite barre")
        self.play(FadeOut(VGroup(pt, lien)), barres[4].animate.set_fill(VERT_OK), run_time=0.35)
        self.play(Indicate(barres[4], color=VERT_OK, scale_factor=1.3), run_time=0.5)
        self.au_mot("pile sous")
        I = Dot(G.G(4, C(4)), radius=0.1, color=JAUNE_TITRE)
        fil = DashedLine(P(xq(4), Y_BARRES), G.G(4, C(4)), color=JAUNE_TITRE, stroke_width=3, dash_length=0.1)
        self.play(Create(fil), run_time=0.5)
        self.au_mot("point d'inflexion")
        lI = self.t("point d'inflexion", 26, JAUNE_TITRE).move_to(P(0.1, -2.68))
        self.play(FadeIn(I, scale=2.5), FadeIn(lI), Flash(I, color=JAUNE_TITRE, line_length=0.18), run_time=0.6)
        self.attendre_voix(marge=0.3)
        dessin = VGroup(base, barres, v, ax, lq, lc, courbe, lcc, lcv, fil, I, lI)
        self.question(dessin, barres, I, lb)

        # ── 04 : la fin ──
        self.fin_short("04-abonne", [self.et, badge, self.dessin, self.q_fin])

    # ── 02 / 02b : la question-pause (3 s) ; 03 : la question en commentaire ──

    def question(self, dessin, barres, I, lb):
        self.dire("02-question")
        t0 = self.renderer.time
        self.au_mot("Question")
        tete = VGroup(pastille_pause(0.32), self.t("Question !", 34, ORANGE_RETENUE)).arrange(RIGHT, buff=0.18)
        tete.move_to(P(-0.35, 2.3))
        rebours = CompteARebours(3, r=0.27, fs=26).next_to(tete, RIGHT, buff=0.3)
        self.play(dessin.animate.scale(0.5).move_to(P(0, 0.85)), FadeOut(lb), run_time=0.5)
        self.play(FadeIn(tete, shift=DOWN * 0.15), run_time=0.3)
        q = self.t("La plus petite barre est sous :", 28).move_to(P(0, -0.5))
        self.au_mot("La plus petite")
        self.play(FadeIn(q, shift=UP * 0.1), Indicate(barres[4], color=VERT_OK, scale_factor=1.4), run_time=0.5)
        cartes = VGroup(*[self.carte(l, c) for l, c in zip("ABC", ["le point d'inflexion", "le haut de la courbe",
                                                                     "l'origine"])])
        cartes.arrange(DOWN, buff=0.08).next_to(q, DOWN, buff=0.15)
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.1), run_time=0.2)
            self.au_pos(i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.1), run_time=0.2)
        pause = self.t("Mets pause, et choisis !", 26, ORANGE_RETENUE).next_to(cartes, DOWN, buff=0.1)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.1)
        rebours.jouer(self)
        print(f"QUESTION 02-question t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse=0", flush=True)
        # la réponse
        self.dire("02b-reponse")
        b = cartes[0]
        self.play(b[0].animate.set_stroke(VERT_OK, width=6).set_fill("#052e16", 1), b[1][0][0].animate.set_fill(VERT_OK),
                  cartes[1].animate.set_opacity(0.3), cartes[2].animate.set_opacity(0.3), FadeOut(rebours),
                  FadeOut(pause), run_time=0.25)
        ok = self.coche(VERT_OK, 0.16).move_to(b[0].get_right() + LEFT * 0.3)
        self.play(b.animate.scale(1.1), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.1), ok.animate.scale(1 / 1.1, about_point=b.get_center()), run_time=0.25)
        self.au_mot("Le coût du vélo suivant")
        self.play(Indicate(barres[4], color=VERT_OK, scale_factor=1.5), run_time=0.6)
        self.au_mot("la courbe change de forme")
        self.play(Flash(I, color=JAUNE_TITRE, line_length=0.18), Indicate(I, color=JAUNE_TITRE, scale_factor=1.8),
                  run_time=0.7)
        self.attendre_voix(marge=0.3)

        # ── 03 : à toi, en commentaire (la réponse n'est PAS affichée) ──
        self.dire("03-commentaire")
        self.au_mot("À toi")
        et = self.t("À toi !", 38, JAUNE_TITRE).move_to(P(0, 2.3))
        self.play(FadeOut(VGroup(tete, q, cartes, ok)), FadeIn(et, scale=1.2), run_time=0.4)
        fs = 32
        l1 = VGroup(self.t("C''(q) =", fs, VERT_OK), self.t("6q", fs), self.t("− 30", fs)).arrange(RIGHT, buff=0.14)
        l1.move_to(P(0, -1.1))
        self.au_mot("C seconde")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("6 q")
        self.play(FadeIn(l1[1], scale=1.2), run_time=0.25)
        self.au_pos(self._texte_voix.find("30"))
        self.play(FadeIn(l1[2], scale=1.2), run_time=0.25)
        l2 = self.t("Pour quel q la courbe", 30).move_to(P(0, -1.7))
        l3 = self.t("change-t-elle de forme ?", 30, ORANGE_RETENUE).move_to(P(0, -2.15))
        self.au_mot("Pour quel q")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("change-t-elle")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.insister(l3, 1.1)
        self.au_mot("Réponds en commentaire")
        appel = self.t("Réponds en commentaire !", 32, VERT_OK).move_to(P(0, -2.65))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)
        self.et, self.dessin, self.q_fin = et, dessin, VGroup(l1, l2, l3, appel)

    def fin_short(self, voix, a_effacer):
        self.dire(voix)
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.4))
        site = self.t("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.45))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 42, VERT_OK).move_to(P(0, 0.0))
        poignee = self.t("@eleveai974", 44, VERT_OK).move_to(P(0, -0.85))
        self.play(FadeOut(VGroup(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)
