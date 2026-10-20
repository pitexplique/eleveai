# proba2_formule_union_short.py
# EleveAI — Maths 2de — short jumeau de l'épisode 6 « Probabilités » : la
# formule de la réunion. CEINTURE JAUNE. Il AMUSE : « 60 % sport, 30 % musique,
# donc 90 % ? » — et non !
#   · en HAUT dix élèves : 6 reçoivent un ballon, 3 une note de musique ; puis
#     deux notes SAUTENT sur des élèves qui ont déjà un ballon (les deux) : ils
#     clignotent, comptés deux fois ; 7 élèves sur 10 restent allumés ;
#   · en BAS, EN MÊME TEMPS : 60 % sport, 30 % musique, « 90 % ? », puis
#     60 + 30 − 20 = 70 % ;
#   · fin : « ni sport ni musique ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-formule-union-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_formule_union_short.py ShortProba2FormuleUnion -o eleveai-maths-seconde-proba-formule-union-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/06-formule-union/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

AMBRE = "#FBBF24"     # sport
BLEU_M = "#3B82F6"    # musique
DOUBLE = "#F97316"    # les deux, comptés deux fois
CORPS = "#64748B"
TETE = "#E2B48C"
LARGEUR_MAX = 3.8


def P(x, y):
    return np.array([x, y, 0.0])


def eleve():
    corps = RoundedRectangle(width=0.4, height=0.36, corner_radius=0.14, fill_color=CORPS, fill_opacity=1,
                             stroke_width=0)
    tete = Circle(radius=0.14, fill_color=TETE, fill_opacity=1, stroke_width=0).next_to(corps, UP, buff=0.03)
    return VGroup(corps, tete)


def ballon():
    b = Circle(radius=0.11, fill_color=AMBRE, fill_opacity=1, stroke_color=BLACK, stroke_width=2)
    return VGroup(b, Line(b.get_top(), b.get_bottom(), color=BLACK, stroke_width=1.5),
                  Line(b.get_left(), b.get_right(), color=BLACK, stroke_width=1.5))


def note():
    tete = Ellipse(width=0.15, height=0.11, fill_color=BLEU_M, fill_opacity=1, stroke_width=0).rotate(0.4)
    tige = Line(tete.get_right() + P(-0.01, 0), tete.get_right() + P(-0.01, 0.3), color=BLEU_M, stroke_width=3.5)
    fanion = Line(tige.get_end(), tige.get_end() + P(0.1, -0.1), color=BLEU_M, stroke_width=3.5)
    return VGroup(tete, tige, fanion)


class ShortProba2FormuleUnion(Short6e):
    nom_voix = "seconde-proba-formule-union-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.4, run_time=0.22):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def classe(self):
        """Dix élèves, deux rangs de cinq ; renvoie la liste."""
        el = [eleve() for _ in range(10)]
        for i, e in enumerate(el):
            e.move_to(P(-1.6 + (i % 5) * 0.8, 1.3 - (i // 5) * 0.95))
        return el

    def place_ballon(self, e):
        return ballon().move_to(e[1].get_center() + P(-0.24, 0.16))

    def place_note(self, e):
        return note().move_to(e[1].get_center() + P(0.25, 0.2))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Sport ou musique ?", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        el = self.classe()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2),
                  LaggedStart(*[FadeIn(e, shift=UP * 0.2) for e in el], lag_ratio=0.06), run_time=0.8)
        self.au_mot("60 %")
        ballons = [self.place_ballon(el[i]) for i in range(6)]
        l1 = VGroup(self.t("60 %", 40, AMBRE), self.t("sport", 34, AMBRE)).arrange(RIGHT, buff=0.2).move_to(P(0, -0.35))
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.4, scale=0.4) for b in ballons], lag_ratio=0.12),
                  *[el[i][0].animate.set_fill(AMBRE) for i in range(6)], FadeIn(l1, scale=0.6), run_time=0.8)
        self.au_mot("30 %")
        notes = {i: self.place_note(el[i]) for i in (6, 7, 8)}
        l2 = VGroup(self.t("30 %", 40, BLEU_M), self.t("musique", 34, BLEU_M)).arrange(RIGHT, buff=0.2).move_to(P(0, -1.0))
        self.play(LaggedStart(*[FadeIn(n, shift=DOWN * 0.4, scale=0.4) for n in notes.values()], lag_ratio=0.15),
                  *[el[i][0].animate.set_fill(BLEU_M) for i in (6, 7, 8)], FadeIn(l2, scale=0.6), run_time=0.7)
        self.au_mot("90 %")
        q = self.grand("90 % ?", font_size=80, color=WHITE)
        q.scale_to_fit_width(min(q.width, 3.3)).move_to(P(0, -1.95))
        self.play(FadeIn(q, scale=0.5), run_time=0.35)
        self.au_mot("l'un ou l'autre")
        self.insister(q, 1.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'image ──
        self.dire("01-image")
        self.au_mot("20 %")
        a1 = VGroup(self.t("20 %", 40, DOUBLE), self.t(": les deux !", 34, DOUBLE)).arrange(RIGHT, buff=0.15)
        a1.scale_to_fit_width(min(a1.width, 3.7)).move_to(P(0, -0.35))
        self.play(FadeOut(VGroup(l1, l2, q)), FadeIn(a1, scale=0.6), run_time=0.35)
        # deux notes sautent sur des élèves qui ont déjà un ballon
        sauts = [notes[7].animate(path_arc=-1.6).move_to(self.place_note(el[4]).get_center()),
                 notes[8].animate(path_arc=-1.6).move_to(self.place_note(el[5]).get_center())]
        self.play(*sauts, el[7][0].animate.set_fill(CORPS), el[8][0].animate.set_fill(CORPS), run_time=0.7)
        self.play(el[4][0].animate.set_fill(DOUBLE), el[5][0].animate.set_fill(DOUBLE), run_time=0.25)
        self.au_mot("comptés deux fois")
        a2 = self.t("comptés deux fois", 32, DOUBLE).move_to(P(0, -0.95))
        self.play(FadeIn(a2, shift=UP * 0.15), run_time=0.3)
        for _ in range(2):
            self.play(*[el[i].animate.scale(1.3) for i in (4, 5)], run_time=0.17)
            self.play(*[el[i].animate.scale(1 / 1.3) for i in (4, 5)], run_time=0.17)
        c = VGroup(self.t("60", 52, AMBRE), self.t("+", 52), self.t("30", 52, BLEU_M), self.t("−", 52),
                   self.t("20", 52, DOUBLE)).arrange(RIGHT, buff=0.18)
        c.scale_to_fit_width(min(c.width, 3.5)).move_to(P(0, -1.65))
        self.au_mot("60 plus")
        self.play(FadeIn(c[0], scale=0.5), run_time=0.2)
        self.au_mot("30 moins")
        self.play(FadeIn(c[1]), FadeIn(c[2], scale=0.5), run_time=0.2)
        self.au_mot("moins 20")
        self.play(FadeIn(c[3]), FadeIn(c[4], scale=0.5), run_time=0.2)
        self.au_mot("70 %")
        r = self.grand("= 70 %", font_size=64, color=VERT_OK)
        r.scale_to_fit_width(min(r.width, 3.2)).move_to(P(0, -2.45))
        cadres = [SurroundingRectangle(el[i], color=VERT_OK, buff=0.06, stroke_width=3) for i in range(7)]
        self.play(FadeIn(r, scale=0.5), LaggedStart(*[Create(k) for k in cadres], lag_ratio=0.08), run_time=0.6)
        self.insister(r, 1.2)
        self.attendre_voix(marge=0.7)

        # ── 02 : la question ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(FadeOut(VGroup(a1, a2, c, r)), ReplacementTransform(titre, toi), run_time=0.4)
        self.au_mot("combien")
        q1 = self.t("combien d'élèves", 36).move_to(P(0, -0.35))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.3)
        self.au_mot("ni sport ni musique")
        q2 = VGroup(self.t("ni sport", 36, AMBRE), self.t("ni musique ?", 36, BLEU_M)).arrange(DOWN, buff=0.08)
        q2.move_to(P(0, -1.1))
        self.play(FadeIn(q2, scale=0.6), run_time=0.4)
        self.insister(q2, 1.15)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=46, color=VERT_OK),
                       self.grand("commentaire !", font_size=46, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.scale_to_fit_width(min(appel.width, 3.5)).move_to(P(0, -2.2))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
