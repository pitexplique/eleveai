# convexite_reconnaitre_micro_short.py
# EleveAI — Maths Tle spé — short « creux ou bosse : convexe ou concave »
# (9:16), ceinture BLANCHE. Micro du coach : convexite_reconnaitre.
# ⚠️ Nommé « _micro_short » : convexite_reconnaitre_short.py appartient à la
# session de la vidéo de notion (convexite_fonction), qui l'a pris le 03/11.
#   · 00 : un skateur au bord d'un parcours (un creux puis une bosse) ;
#          « Creux ou bosse ? », le repère s'ouvre en bas ;
#   · 01 : il roule : EN HAUT le skateur, EN BAS la courbe qui se trace EN MÊME
#          TEMPS sous lui (un pointillé les relie) : bleue dans le creux
#          (convexe), orange sur la bosse (concave) ; le skateur prend la couleur ;
#   · 02 : question-pause (l'arche de pont : A convexe, B concave, C les deux →
#          B), compte à rebours de 3 s ;
#   · 03 : la question en commentaire : un parcours de 3 creux et 2 bosses
#          (réponse 3, NON affichée) ;
#   · 04 : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
# Le profil du parcours : y = −sin(πu) sur [0 ; 2] : creux (convexe) sur
# [0 ; 1], bosse (concave) sur [1 ; 2] ; le même dessiné en haut et en bas.
# Code couleur (le même que la paysage) : bleu = convexe, orange = concave.
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
#
# Voix : manim/voix/terminale-convexite-reconnaitre-short.json (débit −6),
# calée par convexite_reconnaitre_micro_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/convexite_reconnaitre_micro_short.py ConvexiteReconnaitreShort -o eleveai-maths-terminale-convexite-reconnaitre-short --media_dir manim/scripts/terminale/media-convexite-reconnaitre-short
# Sortie : manim/sorties/terminale/maths/analyse/convexite-reconnaitre/

import math
import os
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
from convexite_reconnaitre import FOND_BETON, FOND_CARTE, BETON, Graphe, pose  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

CONVEXE, CONCAVE = BLEU_CALCUL, ORANGE_RETENUE
LARGEUR_MAX = 4.0
U0, U1 = -0.2, 2.2  # le parcours : plat, creux [0 ; 1], bosse [1 ; 2], plat

# le profil : vérifié (creux puis bosse, inflexion en 1)
assert all(math.pi ** 2 * math.sin(math.pi * u) > 0 for u in (0.1, 0.5, 0.9))   # p'' > 0 : convexe
assert all(math.pi ** 2 * math.sin(math.pi * u) < 0 for u in (1.1, 1.5, 1.9))   # p'' < 0 : concave
# la question en commentaire : −sin(πu) sur [0 ; 5] : creux sur [0;1], [2;3], [4;5]
assert sum(1 for k in range(5) if math.sin(math.pi * (k + 0.5)) > 0) == 3


def profil(u):
    return -math.sin(math.pi * u) if 0 <= u <= 2 else 0.0


def dprofil(u):
    return -math.pi * math.cos(math.pi * u) if 0 <= u <= 2 else 0.0


def couleur_de(u):
    if 0 < u < 1:
        return CONVEXE
    if 1 <= u < 2:
        return CONCAVE
    return WHITE


class ConvexiteReconnaitreShort(AuditSynchro, MotsCales, Short6e):
    fichier_marques = "convexite_reconnaitre_micro_short_marques.json"
    nom_voix = "terminale-convexite-reconnaitre-short"
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

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def au_pos(self, i):
        """Attend l'instant où la voix dit le mot à la position i."""
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > 0.03:
            self.wait(reste)

    def parcours(self, g, f, a, b, ybas, n=120, couleur=BETON):
        """Le béton sous le profil f, de a à b, jusqu'à ybas (repère g)."""
        pts = [g.G(x, f(x)) for x in np.linspace(a, b, n)]
        bloc = Polygon(*pts, g.G(b, ybas), g.G(a, ybas), stroke_width=0, fill_color=FOND_BETON, fill_opacity=1)
        bord = VMobject(stroke_color=couleur, stroke_width=6).set_points_smoothly(pts)
        return VGroup(bloc, bord)

    def carte_choix(self, lettre, corps, largeur=3.55, fs=30):
        rond = Circle(radius=0.22, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.25)
        cadre = RoundedRectangle(width=largeur, height=0.6, corner_radius=0.12, stroke_color=BLEU_CALCUL,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def construct(self):
        self.margo_bas()
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.78))
        self.add(badge)
        gt = Graphe((U0, U1), (-1.0, 1.0), (-1.95, 0.35), (1.95, 1.95))   # EN HAUT : le parcours
        gb = Graphe((U0, U1), (-1.15, 1.15), (-1.95, -2.3), (1.95, -0.3))  # EN BAS : la courbe
        u = ValueTracker(-0.15)

        # ── 00 : un skateur, un creux, une bosse ──
        self.dire("00-accroche")
        parc = self.parcours(gt, profil, U0, U1, -1.0)
        sk = always_redraw(lambda: pose(gt, profil, dprofil, u.get_value(), couleur_de(u.get_value()), 0.62))
        self.play(FadeIn(parc[0]), Create(parc[1]), run_time=0.5)
        self.au_mot("skateur")
        self.play(FadeIn(sk, shift=DOWN * 0.2), run_time=0.3)
        self.au_mot("bowl")
        self.play(Indicate(parc[1], color=WHITE, scale_factor=1.03), run_time=0.5)
        t1 = self.t("Creux", 40, CONVEXE)
        t2 = self.t("ou", 40, WHITE)
        t3 = self.t("bosse ?", 40, CONCAVE)
        titre = VGroup(t1, t2, t3).arrange(RIGHT, buff=0.2)
        titre.scale_to_fit_width(min(titre.width, 3.7)).move_to(P(0, 3.5))
        creux_h = gt.courbe(profil, 0, 1, CONVEXE, 9)
        bosse_h = gt.courbe(profil, 1, 2, CONCAVE, 9)
        self.au_mot("Creux")
        self.play(FadeIn(t1, shift=DOWN * 0.1), Create(creux_h), run_time=0.4)
        self.au_mot("ou bosse")
        self.play(FadeIn(t2), run_time=0.15)
        self.au_mot("bosse")
        self.play(FadeIn(t3, shift=DOWN * 0.1), Create(bosse_h), run_time=0.4)
        self.au_mot("les maths")
        ax = gb.axes()
        self.play(Create(ax), FadeOut(creux_h), FadeOut(bosse_h), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : il roule ; la courbe se trace dessous, en même temps ──
        self.dire("01-image")

        def trace(a, b, coul):
            def f():
                v = u.get_value()
                hi = min(v, b)
                if hi <= a + 0.01:
                    return VMobject()
                return gb.courbe(profil, a, hi, coul, 7, n=max(4, int(60 * (hi - a))))
            return always_redraw(f)

        tr1, tr2 = trace(0, 1, CONVEXE), trace(1, 2, CONCAVE)
        lien = always_redraw(lambda: DashedLine(gt.G(u.get_value(), profil(u.get_value())) + DOWN * 0.05,
                                                gb.G(u.get_value(), profil(u.get_value())) + UP * 0.05,
                                                color=GREY_B, stroke_width=2, dash_length=0.08))
        point = always_redraw(lambda: Dot(gb.G(u.get_value(), profil(u.get_value())), radius=0.08,
                                          color=couleur_de(u.get_value())))
        self.add(tr1, tr2, lien, point)
        self.au_mot("Il descend")
        self.play(u.animate.set_value(0.45), run_time=1.4, rate_func=rate_functions.ease_in_quad)
        self.au_mot("tournée vers le haut")
        fh = Arrow(gb.G(0.5, -0.95), gb.G(0.5, 0.15), buff=0, color=CONVEXE, stroke_width=5)
        self.play(u.animate.set_value(0.8), GrowArrow(fh), run_time=0.6, rate_func=linear)
        self.au_mot("convexe")
        lv = self.t("convexe", 30, CONVEXE).move_to(gb.G(0.62, 0.95))  # loin de la bosse orange
        self.play(u.animate.set_value(1.0), FadeIn(lv, scale=1.4), run_time=0.4, rate_func=linear)
        self.insister(lv, 1.15)
        self.au_mot("Il passe")
        self.play(u.animate.set_value(1.45), run_time=1.0, rate_func=linear)
        self.au_mot("tournée vers le bas")
        fb = Arrow(gb.G(1.5, 0.95), gb.G(1.5, -0.15), buff=0, color=CONCAVE, stroke_width=5)
        self.play(u.animate.set_value(1.8), GrowArrow(fb), run_time=0.6, rate_func=linear)
        self.au_mot("concave")
        lc = self.t("concave", 30, CONCAVE).move_to(gb.G(1.62, -0.68))  # loin de la montée bleue
        self.play(u.animate.set_value(2.15), FadeIn(lc, scale=1.4), run_time=0.6,
                  rate_func=rate_functions.ease_out_quad)
        self.insister(lc, 1.15)
        self.attendre_voix(marge=0.3)
        for m in (sk, tr1, tr2, lien, point):
            m.clear_updaters()

        # ── 02 : question-pause : l'arche de pont ──
        self.dire("02-question")
        t0 = self.renderer.time
        tete = VGroup(pastille_pause(0.34), self.t("Question !", 38, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2)
        rebours = CompteARebours(3, r=0.28, fs=28)
        VGroup(tete, rebours).arrange(RIGHT, buff=0.35).move_to(P(0, 3.5))
        self.au_mot("Question")
        self.play(FadeOut(VGroup(parc, sk, ax, tr1, tr2, lien, point, fh, fb, lv, lc)),
                  ReplacementTransform(titre, tete), run_time=0.5)
        ga = Graphe((-1.2, 1.2), (0, 1.2), (-1.5, 1.2), (1.5, 2.3))
        arche = ga.courbe(lambda x: 1.0 - 0.69 * x * x, -1.2, 1.2, WHITE, 7)
        tablier = Line(ga.G(-1.45, 1.0), ga.G(1.45, 1.0), stroke_width=8, color=GREY_B)
        piles = VGroup(*[Line(ga.G(x, 1.0), ga.G(x, 1.0 - 0.69 * x * x), stroke_width=3, color=GREY_B)
                         for x in (-0.9, -0.45, 0, 0.45, 0.9)])
        eau = VGroup(*[Line(ga.G(-1.45 + 0.6 * k, -0.05), ga.G(-1.15 + 0.6 * k, -0.05), stroke_width=4,
                            color="#38BDF8") for k in range(5)])
        pont = VGroup(eau, piles, tablier, arche)
        self.au_mot("arche de pont")
        q1a = self.t("Une arche de pont,", 30)
        q1b = self.t("en bosse.", 30, CONCAVE)
        q1 = VGroup(q1a, q1b).arrange(DOWN, buff=0.1).move_to(P(0, 0.62))
        self.play(Create(arche), FadeIn(VGroup(eau, piles, tablier)), FadeIn(q1a, shift=UP * 0.1), run_time=0.7)
        self.au_mot("en bosse")
        self.play(FadeIn(q1b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Sa courbe")
        q2 = self.t("Sa courbe est :", 30).move_to(P(0, -0.08))
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.3)
        cartes = VGroup(*[self.carte_choix(l, c) for l, c in zip("ABC", ["convexe", "concave", "les deux"])])
        cartes.arrange(DOWN, buff=0.12).move_to(P(0, -1.45))
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            self.au_pos(i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.15), run_time=0.2)
        self.au_mot("Mets pause")
        mp = self.t("Mets pause, et choisis !", 30, ORANGE_RETENUE).next_to(cartes, DOWN, buff=0.12)
        self.play(FadeIn(mp, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.35)
        self.attendre_voix(marge=0.1)
        rebours.jouer(self)
        print(f"QUESTION 02-question t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse=1", flush=True)

        # ── 02b : la réponse B ──
        self.dire("02b-reponse")
        b = cartes[1]
        self.play(b[0].animate.set_stroke(VERT_OK, width=6).set_fill("#052e16", 1),
                  b[1][0][0].animate.set_fill(VERT_OK), cartes[0].animate.set_opacity(0.3),
                  cartes[2].animate.set_opacity(0.3), FadeOut(mp), FadeOut(rebours), run_time=0.25)
        ok = VMobject(stroke_color=VERT_OK, stroke_width=5).set_points_as_corners(
            [P(-0.2, 0), P(-0.05, -0.15), P(0.2, 0.16)]).move_to(b[0].get_right() + LEFT * 0.35)
        self.play(b.animate.scale(1.1), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.1), ok.animate.scale(1 / 1.1, about_point=b.get_center()), run_time=0.25)
        self.au_mot("En bosse")
        self.play(arche.animate.set_color(CONCAVE), run_time=0.35)
        self.au_mot("tournée vers le bas")
        fl = Arrow(ga.G(0, 0.95), ga.G(0, 0.15), buff=0, color=CONCAVE, stroke_width=5)
        self.play(GrowArrow(fl), run_time=0.3)
        self.au_mot("concave")
        self.play(Indicate(b, color=VERT_OK, scale_factor=1.08), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 03 : la question en commentaire : 3 creux, 2 bosses ──
        self.dire("03-commentaire")
        self.au_mot("À toi")
        et = self.t("À toi !", 38, JAUNE_TITRE).move_to(P(0, 3.5))
        self.play(FadeOut(VGroup(pont, fl, q1, q2, cartes, ok)), ReplacementTransform(tete, et), run_time=0.45)
        g5 = Graphe((-0.2, 5.2), (-1.0, 1.0), (-1.95, 0.45), (1.95, 1.95))
        p5 = lambda x: -math.sin(math.pi * x) if 0 <= x <= 5 else 0.0  # noqa: E731
        d5 = lambda x: -math.pi * math.cos(math.pi * x) if 0 <= x <= 5 else 0.0  # noqa: E731
        parc5 = self.parcours(g5, p5, -0.2, 5.2, -1.0, n=220, couleur=WHITE)
        self.au_mot("ce parcours")
        sk5 = pose(g5, p5, d5, -0.1, WHITE, 0.5)
        self.play(FadeIn(parc5[0]), Create(parc5[1]), FadeIn(sk5), run_time=0.7)
        self.au_mot("combien")
        c1 = self.t("Combien de parties", 34, ORANGE_RETENUE).move_to(P(0, -0.3))
        self.play(FadeIn(c1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("convexes")
        c2 = self.t("convexes ?", 40, CONVEXE).move_to(P(0, -0.85))
        self.play(FadeIn(c2, scale=1.3), run_time=0.3)
        self.insister(c2, 1.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 36, VERT_OK), self.t("commentaire !", 36, VERT_OK))
        appel.arrange(DOWN, buff=0.1).move_to(P(0, -1.75))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 04 : la fin ──
        self.fin_short("04-abonne", [et, badge, parc5, sk5, c1, c2, appel])

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
