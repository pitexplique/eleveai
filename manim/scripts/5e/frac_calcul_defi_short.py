# frac_calcul_defi_short.py
# EleveAI — Maths 5e — short jumeau de l'épisode 10 « Défi : calculer avec les
# fractions » (micro fraction_calcul_defi). CEINTURE JAUNE : toute la chaîne de
# SES erreurs en petit — simplifier 12/20, puis décimal, puis pourcentage — sur
# des barres qu'on VOIT : plus qu'un short blanc.
# Il AMUSE : « Le trophée ». Lucas, COMMENTATEUR D'E-SPORT : Léa a gagné 12
# parties sur 20, Inès 7 sur 10 ; Léa a plus de victoires…
#   · EN HAUT, le trophée et les joueuses ; EN BAS, au même instant, les deux
#     barres de victoires (20 et 10 parts) ;
#   · 1 question-pause (3 s) : simplifier 12/20 → 3/5 (leurres 10/18 en
#     soustrayant, 6/20 en ne divisant que le haut) ;
#   · 3/5 = 0,6 = 60 % contre 7/10 = 0,7 = 70 % → SURPRISE : Inès gagne ;
#   · commentaire : « 9 parties sur 15 : quel pourcentage ? » (60 %).
# Chiffres inventés (aucune donnée réelle). Vérifié (Python) : 12/20 = 3/5 =
# 0,6 ; 7/10 = 0,7 ; 9/15 = 3/5 = 60 %.
# Centres d'intérêt : jeux-video, jeux-defis.
#
# Voix : manim/voix/5e-frac-calcul-defi-short.json (débit −10) ; marques :
# manim/scripts/5e/frac_calcul_defi_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/5e/frac_calcul_defi_short.py FracCalculDefiShort5e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/frac_calcul_defi_short.py FracCalculDefiShort5e -o eleveai-maths-5e-frac-calcul-defi-short --media_dir manim/scripts/5e/media-frac-calcul-defi-short
# Sortie : manim/sorties/5e/maths/fractions/10-calcul-defi/eleveai-maths-5e-frac-calcul-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_loth_commun import *  # noqa: E402,F403

C_LEA = "#f472b6"
C_INES = "#38bdf8"
OR = "#facc15"


def trophee(s=1.0):
    coupe = Polygon(P(-0.45, 0.5), P(0.45, 0.5), P(0.3, -0.05), P(-0.3, -0.05), fill_color=OR, fill_opacity=1,
                    stroke_width=0)
    anses = VGroup(*[Arc(radius=0.18, start_angle=PI / 2 * (1 if x < 0 else -1), angle=PI * (1 if x < 0 else 1),
                         color=OR, stroke_width=6).move_to(P(x, 0.3)) for x in (-0.5, 0.5)])
    pied = VGroup(Rectangle(width=0.12, height=0.3, fill_color=OR, fill_opacity=1, stroke_width=0).move_to(P(0, -0.2)),
                  Rectangle(width=0.55, height=0.14, fill_color="#a16207", fill_opacity=1, stroke_width=0)
                  .move_to(P(0, -0.4)))
    return VGroup(anses, coupe, pied).scale(s)


def commentateur(s=0.55):
    p = personne(peau="#8d5524", tenue="#4338ca", cheveux="#111827", s=s)
    p.add(casque_audio(p))
    return p


class FracCalculDefiShort5e(ShortH):
    nom_voix = "5e-frac-calcul-defi-short"
    fichier_marques = "frac_calcul_defi_short_marques.json"
    ceinture = "jaune"

    def barres(self, ya=-0.85, yb=-2.2):
        a = Barre(20, 0, largeur=3.7, hauteur=0.55, couleur=C_LEA, marge=0.12, centre=P(0, ya))
        b = Barre(10, 0, largeur=3.7, hauteur=0.55, couleur=C_INES, marge=0.12, centre=P(0, yb))
        na = self.inline("Léa", 30, C_LEA).next_to(a, UP, buff=0.1).align_to(a, LEFT)
        nb = self.inline("Inès", 30, C_INES).next_to(b, UP, buff=0.1).align_to(b, LEFT)
        return a, b, na, nb

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le trophée", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Lucas et le trophée ──
        self.dire("00-accroche")
        lu = commentateur(0.6).move_to(P(-1.3, 1.35))
        self.au_mot("Lucas")
        nm = self.bloc(["Lucas,", "commentateur", "d'e-sport"], 26, BLEU_CALCUL).move_to(P(0.7, 1.35))
        self.play(FadeIn(lu, shift=UP * 0.2), FadeIn(nm[0]), run_time=0.5)
        self.au_mot("commentateur")
        self.play(FadeIn(nm[1:], shift=UP * 0.1), run_time=0.3)
        tr = trophee(0.9).move_to(P(0, -0.6))
        self.au_mot("un seul trophée")
        self.play(FadeIn(tr, scale=0.5), Write(titre), run_time=0.5)
        self.au_mot("Qui est la meilleure")
        self.play(Wiggle(tr), run_time=0.6)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(lu), FadeOut(nm), tr.animate.scale(0.6).move_to(P(0, 1.45)), run_time=0.4)

        # ── 01 : les scores ──
        self.dire("01-scores")
        a, b, na, nb = self.barres()
        la = VGroup(self.inline("12", 30, C_LEA), self.inline("sur 20", 30, C_LEA)).arrange(RIGHT, buff=0.12)
        la.next_to(a, UP, buff=0.1).align_to(a, RIGHT)
        lb = VGroup(self.inline("7", 30, C_INES), self.inline("sur 10", 30, C_INES)).arrange(RIGHT, buff=0.12)
        lb.next_to(b, UP, buff=0.1).align_to(b, RIGHT)
        self.au_mot("Léa a gagné")
        self.play(FadeIn(a), FadeIn(na), run_time=0.4)
        self.au_nb("gagné 12")
        self.play(a.colorier(range(12), lag=0.04, run_time=0.6), FadeIn(la[0]), run_time=0.6)
        self.au_nb("sur 20")
        self.play(FadeIn(la[1]), run_time=0.3)
        self.add(a.traits, a.contour)
        self.au_mot("Inès")
        self.play(FadeIn(b), FadeIn(nb), run_time=0.4)
        self.au_nb("seulement 7")
        self.play(b.colorier(range(7), lag=0.06, run_time=0.6), FadeIn(lb[0]), run_time=0.6)
        self.au_nb("sur 10")
        self.play(FadeIn(lb[1]), run_time=0.3)
        self.add(b.traits, b.contour)
        self.au_mot("plus de victoires")
        self.play(Indicate(la, color=AMBRE), run_time=0.5)
        self.au_mot("mais attention")
        self.play(Wiggle(tr), run_time=0.5)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Simplifie", "12 vingtièmes."],
                            [self.inline("10/18", 30), self.inline("3/5", 30), self.inline("6/20", 30)], 1,
                            ["÷ 4 en haut et en bas : 3/5"], mot_q="Comment simplifier")
        self.vider(garder)

        # ── 03 : décimal, puis pourcentage ──
        self.dire("03-pourcent")
        tr = trophee(0.54).move_to(P(0, 1.5))
        self.add(tr)
        a, b, na, nb = self.barres(ya=0.35, yb=-1.6)
        a = Barre(5, 3, largeur=3.7, hauteur=0.55, couleur=C_LEA, marge=0.12, centre=a.get_center())
        b = Barre(10, 7, largeur=3.7, hauteur=0.55, couleur=C_INES, marge=0.12, centre=b.get_center())
        fa = pas_audit(self.inline("3/5", 30, C_LEA).next_to(a, UP, buff=0.1).align_to(a, RIGHT))
        fb = pas_audit(self.inline("7/10", 30, C_INES).next_to(b, UP, buff=0.1).align_to(b, RIGHT))
        self.play(FadeIn(a), FadeIn(b), FadeIn(na), FadeIn(nb), FadeIn(fa), FadeIn(fb), run_time=0.4)
        ra = VGroup(self.inline("3", 30, WHITE), self.inline("÷ 5", 30, WHITE), self.inline("= 0,6", 30, BLEU_CALCUL),
                    self.inline("= 60 %", 34, C_LEA)).arrange(RIGHT, buff=0.12).next_to(a, DOWN, buff=0.15)
        rb = VGroup(self.inline("= 0,7", 30, BLEU_CALCUL), self.inline("= 70 %", 34, C_INES)).arrange(RIGHT, buff=0.12)
        rb.next_to(b, DOWN, buff=0.15)
        for r in (ra, rb):
            r.scale_to_fit_width(min(r.width, 3.8)).set_x(0)
        self.au_nb("c'est 3")
        self.play(FadeIn(ra[0], shift=RIGHT * 0.1), run_time=0.3)
        self.au_nb("divisé par 5")
        self.play(FadeIn(ra[1], shift=RIGHT * 0.1), run_time=0.3)
        self.au_nb("5 : 0,6")
        self.play(FadeIn(ra[2], shift=RIGHT * 0.1), run_time=0.3)
        self.au_nb("Soit 60")
        self.play(FadeIn(ra[3], scale=1.3), run_time=0.3)
        self.au_nb("c'est 0,7")
        self.play(FadeIn(rb[0], shift=RIGHT * 0.1), run_time=0.3)
        self.au_nb("0,7 : 70")
        self.play(FadeIn(rb[1], scale=1.3), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 04 : la surprise : Inès gagne ──
        self.dire("04-surprise")
        self.au_mot("Inès gagne")
        self.play(tr.animate.scale(1.2).move_to(P(1.4, 1.75)), Indicate(rb[1], color=OR, scale_factor=1.3), run_time=0.6)
        g = self.inline("Inès gagne !", 36, C_INES).move_to(P(-0.55, 1.75))
        self.play(FadeIn(g, scale=1.3), Flash(tr, color=OR), run_time=0.5)
        self.au_mot("un meilleur pourcentage")
        self.play(Circumscribe(rb[1], color=OR), run_time=0.7)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 05 : la question en commentaire ──
        self.dire("05-question")
        c = Barre(15, 0, largeur=3.7, hauteur=0.55, couleur=VERT_PART, marge=0.12, centre=P(0, -1.5))
        self.au_mot("Un joueur")
        self.play(FadeIn(c), run_time=0.4)
        l = VGroup(self.inline("9", 40, VERT_PART), self.inline("sur 15", 40, VERT_PART)).arrange(RIGHT, buff=0.15)
        l.move_to(P(0, 1.45))
        self.au_nb("gagne 9")
        self.play(FadeIn(l[0], scale=1.3), c.colorier(range(9), lag=0.05, run_time=0.6), run_time=0.6)
        self.add(c.traits, c.contour)
        self.au_nb("sur 15")
        self.play(FadeIn(l[1], scale=1.2), run_time=0.3)
        self.au_mot("Quel pourcentage")
        q = self.inline("? %", 48, AMBRE).move_to(P(0, 0.75))
        self.play(FadeIn(q, scale=1.3), run_time=0.35)
        self.appel_commentaire(y=0.05)
