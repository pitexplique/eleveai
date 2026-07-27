# aiguille_de_kakeya.py
# EleveAI — Le Journal · « Un peu de maths » — L'aiguille de Hong Wang
#
# UNE seule vidéo (muet + texte), la MÊME machine que le site : l'aiguille fait
# demi-tour et l'aire balayée se divise par 2 à chaque ruse :
#   1) autour du bout    → π/2 ≈ 1,57 (demi-disque)
#   2) autour du centre  → π/4 ≈ 0,79 (disque)
#   3) le deltoïde       → π/8 ≈ 0,39 (la corde qui glisse en tournant)
# puis Besicovitch (« aussi près de 0 qu'on veut », 1928), et l'HONNEUR :
# Hong Wang (王虹, « arc-en-ciel »), 3ᵉ femme de l'histoire à recevoir la
# médaille Fields (23/07/2026), conjecture de Kakeya fermée en 3D avec Joshua
# Zahl — et son merci à ses professeurs.
#
# ⚠️ MUET + TEXTE (Frédéric) : le texte porte tout, waits généreux. 16:9.
# Deux langues, MÊMES scènes : les textes vivent dans TEXTES ; la classe EN ne
# change que la langue (la vidéo est muette — la VO ne coûte que les chaînes).
#
# Rendu brouillon (FR) :
#   python -m manim render -ql manim/scripts/journal/aiguille_de_kakeya.py AiguilleDeKakeya --media_dir manim/scripts/journal/media
# Rendu final (FR) :
#   python -m manim render -qh manim/scripts/journal/aiguille_de_kakeya.py AiguilleDeKakeya -o eleveai-maths-journal-aiguille-de-kakeya --media_dir manim/scripts/journal/media
# Rendu final (EN) :
#   python -m manim render -qh manim/scripts/journal/aiguille_de_kakeya.py AiguilleDeKakeyaEN -o eleveai-maths-journal-kakeya-needle-en --media_dir manim/scripts/journal/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np

from manim import *

from charte import *
from mascotte import MascotteMargouillat

AIGUILLE = "#e05252"   # l'aiguille
PEINT = "#e0a9a0"      # la surface balayée
ENCRE = "#7ea2d8"      # le deltoïde, les repères

NL = 3.4               # longueur de l'aiguille (unités Manim) = « 1 aiguille »
R_DELT = NL / 4.0      # deltoïde : la corde tangente a pour longueur 4r


def delt_point(s, centre):
    """Le deltoïde : Q(s) = centre + r·(2cos s + cos 2s, 2sin s − sin 2s)."""
    return centre + R_DELT * np.array(
        [2 * np.cos(s) + np.cos(2 * s), 2 * np.sin(s) - np.sin(2 * s), 0.0]
    )


def corde_deltoide(t, centre):
    """L'aiguille au « temps » t ∈ [0, 2π] : ses deux bouts sur la courbe."""
    return delt_point(-t / 2.0, centre), delt_point(-t / 2.0 + np.pi, centre)


TEXTES = {
    "fr": {
        "titre": "L'aiguille de Hong Wang",
        "question": "Combien de place pour faire demi-tour ?",
        "regle": "1 aiguille = 1 unité — on mesure l'aire balayée",
        "m1": "1 · Autour du bout",
        "m1_aire": "aire = π/2 ≈ 1,57",
        "m2": "2 · Autour du centre",
        "m2_aire": "aire = π/4 ≈ 0,79",
        "m2_lecon": "deux fois moins !",
        "m3": "3 · La ruse du deltoïde",
        "m3_aire": "aire = π/8 ≈ 0,39",
        "m3_lecon": "encore deux fois moins !",
        "ech_0": "1,57", "ech_1": "0,79", "ech_2": "0,39", "ech_fin": "… 0 ?",
        "besico": "On peut approcher 0 d'aussi près qu'on veut",
        "besico_sub": "(Besicovitch, 1928)",
        "wang_3d": "Et en 3D ? La conjecture de Kakeya — ouverte un siècle —",
        "wang_3d2": "fermée par Hong Wang et Joshua Zahl (2025)",
        "honneur_nom": "Hong Wang · 王虹",
        "honneur_1": "Médaille Fields 2026 — 3ᵉ femme de l'histoire",
        "honneur_2": "Son prénom, Hong, veut dire « arc-en-ciel »",
        "honneur_3": "En recevant sa médaille, elle a remercié ses professeurs.",
        "appel": "Fais tourner l'aiguille toi-même",
        "lien": "eleveai.fr/aiguille-de-kakeya",
    },
    "en": {
        "titre": "Hong Wang's needle",
        "question": "How little room does a U-turn need?",
        "regle": "1 needle = 1 unit — we measure the swept area",
        "m1": "1 · Around the tip",
        "m1_aire": "area = π/2 ≈ 1.57",
        "m2": "2 · Around the centre",
        "m2_aire": "area = π/4 ≈ 0.79",
        "m2_lecon": "half as much!",
        "m3": "3 · The deltoid trick",
        "m3_aire": "area = π/8 ≈ 0.39",
        "m3_lecon": "halved again!",
        "ech_0": "1.57", "ech_1": "0.79", "ech_2": "0.39", "ech_fin": "… 0 ?",
        "besico": "You can get as close to 0 as you like",
        "besico_sub": "(Besicovitch, 1928)",
        "wang_3d": "And in 3D? The Kakeya conjecture — open for a century —",
        "wang_3d2": "closed by Hong Wang and Joshua Zahl (2025)",
        "honneur_nom": "Hong Wang · 王虹",
        "honneur_1": "2026 Fields Medal — 3rd woman in its history",
        "honneur_2": "Her first name, Hong, means “rainbow”",
        "honneur_3": "Receiving her medal, she thanked her teachers.",
        "appel": "Spin the needle yourself",
        "lien": "eleveai.fr/aiguille-de-kakeya",
    },
}


class AiguilleDeKakeya(Scene):
    """Une vidéo : le demi-tour, l'aire divisée par 2 à chaque ruse, l'honneur."""

    LANG = "fr"
    LARGEUR_SURE = 12.8

    # — helpers standard EleveAI —
    def t_(self, cle):
        return TEXTES[self.LANG][cle]

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def T(self, texte, size=28, color=WHITE, **kw):
        t = Text(texte, font_size=size, color=color, **kw)
        if t.width > self.LARGEUR_SURE:
            t.scale_to_fit_width(self.LARGEUR_SURE)
        return t

    def anim_entree(self, m, mode=None, run_time=0.8):
        palette = ["fade_up", "pop", "slide_r", "grow", "fade_down", "slide_l", "write"]
        if mode is None:
            if not hasattr(self, "_ai"):
                self._ai = 0
            mode = palette[self._ai % len(palette)]
            self._ai += 1
        table = {
            "write": lambda: Write(m, run_time=run_time),
            "fade_up": lambda: FadeIn(m, shift=0.45 * UP, run_time=run_time),
            "fade_down": lambda: FadeIn(m, shift=0.45 * DOWN, run_time=run_time),
            "slide_r": lambda: FadeIn(m, shift=0.7 * RIGHT, run_time=run_time),
            "slide_l": lambda: FadeIn(m, shift=0.7 * LEFT, run_time=run_time),
            "pop": lambda: FadeIn(m, scale=0.5, run_time=run_time),
            "grow": lambda: GrowFromCenter(m, run_time=run_time),
        }
        return table[mode]()

    # — l'échelle des records, en bas : 1,57 → 0,79 → 0,39 → … 0 ? —
    def poser_record(self, idx, texte, couleur):
        chip = VGroup(
            self.T(texte, size=26, color=couleur),
        )
        boite = SurroundingRectangle(chip, color=couleur, buff=0.14, corner_radius=0.08)
        rec = VGroup(boite, chip).move_to([-4.2 + idx * 2.6, -3.1, 0])
        if idx > 0:
            fleche = Arrow([-4.2 + idx * 2.6 - 1.75, -3.1, 0],
                           [-4.2 + idx * 2.6 - 0.95, -3.1, 0],
                           buff=0, stroke_width=3, color=GREY_B,
                           max_tip_length_to_length_ratio=0.35)
            div = self.T("÷2", size=20, color=GREY_B).next_to(fleche, UP, buff=0.08)
            self.play(FadeIn(fleche), FadeIn(div), run_time=0.4)
        self.play(self.anim_entree(rec, mode="pop", run_time=0.6))
        return rec

    # ── OUVERTURE : la question ────────────────────────────────────────────────
    def ecran_intro(self):
        titre = self.T(self.t_("titre"), size=46, color=JAUNE_TITRE).to_edge(UP, buff=0.4)
        self.play(Write(titre))

        aiguille = Line(LEFT * NL / 2, RIGHT * NL / 2, color=AIGUILLE,
                        stroke_width=10).move_to([0, 0.2, 0])
        self.play(GrowFromCenter(aiguille))
        self.play(Rotate(aiguille, angle=0.35, run_time=0.5),
                  rate_func=there_and_back)

        q = self.T(self.t_("question"), size=36, color=WHITE).move_to([0, -1.5, 0])
        self.play(self.anim_entree(q, mode="grow"))
        regle = self.T(self.t_("regle"), size=20, color=GREY_B).to_edge(DOWN, buff=0.28)
        self.play(FadeIn(regle))
        self.wait(2.0)
        self.play(FadeOut(aiguille), FadeOut(q), FadeOut(regle), FadeOut(titre))

    # ── MÉTHODE 1 : autour du bout (demi-disque, π/2) ──────────────────────────
    def methode_bout(self):
        label = self.T(self.t_("m1"), size=32, color=WHITE).to_edge(UP, buff=0.5)
        self.play(self.anim_entree(label, mode="slide_l"))

        pivot = np.array([0.0, -0.9, 0.0])
        a = ValueTracker(0.0)
        zone = always_redraw(lambda: Sector(
            outer_radius=NL, start_angle=0.0, angle=a.get_value(),
            arc_center=pivot, fill_color=PEINT, fill_opacity=0.5, stroke_width=0))
        aig = always_redraw(lambda: Line(
            pivot, pivot + NL * np.array([np.cos(a.get_value()), np.sin(a.get_value()), 0.0]),
            color=AIGUILLE, stroke_width=10))
        self.add(zone, aig)
        self.play(a.animate.set_value(np.pi), run_time=3.0, rate_func=linear)

        aire = self.T(self.t_("m1_aire"), size=30, color=JAUNE_TITRE).move_to([0, 1.9, 0])
        self.play(self.anim_entree(aire, mode="pop"))
        self.wait(1.4)
        self.rec0 = self.poser_record(0, self.t_("ech_0"), AIGUILLE)
        self.wait(1.0)
        self.play(FadeOut(zone), FadeOut(aig), FadeOut(aire), FadeOut(label))

    # ── MÉTHODE 2 : autour du centre (disque, π/4) ─────────────────────────────
    def methode_centre(self):
        label = self.T(self.t_("m2"), size=32, color=WHITE).to_edge(UP, buff=0.5)
        self.play(self.anim_entree(label, mode="slide_l"))

        centre = np.array([0.0, 0.1, 0.0])
        r = NL / 2.0
        a = ValueTracker(0.0)
        # les DEUX moitiés de l'aiguille balayent deux secteurs opposés
        zone = always_redraw(lambda: VGroup(
            Sector(outer_radius=r, start_angle=0.0, angle=a.get_value(),
                   arc_center=centre, fill_color=PEINT, fill_opacity=0.5, stroke_width=0),
            Sector(outer_radius=r, start_angle=np.pi, angle=a.get_value(),
                   arc_center=centre, fill_color=PEINT, fill_opacity=0.5, stroke_width=0)))
        aig = always_redraw(lambda: Line(
            centre - r * np.array([np.cos(a.get_value()), np.sin(a.get_value()), 0.0]),
            centre + r * np.array([np.cos(a.get_value()), np.sin(a.get_value()), 0.0]),
            color=AIGUILLE, stroke_width=10))
        self.add(zone, aig)
        self.play(a.animate.set_value(np.pi), run_time=3.0, rate_func=linear)

        aire = self.T(self.t_("m2_aire"), size=30, color=JAUNE_TITRE).move_to([0, 2.2, 0])
        lecon = self.T(self.t_("m2_lecon"), size=26, color=VERT_OK).next_to(aire, DOWN, buff=0.15)
        self.play(self.anim_entree(aire, mode="pop"))
        self.play(FadeIn(lecon, shift=0.2 * UP))
        self.wait(1.4)
        self.poser_record(1, self.t_("ech_1"), AIGUILLE)
        self.wait(1.0)
        self.play(FadeOut(zone), FadeOut(aig), FadeOut(aire), FadeOut(lecon), FadeOut(label))

    # ── MÉTHODE 3 : le deltoïde (π/8) ──────────────────────────────────────────
    def methode_deltoide(self):
        label = self.T(self.t_("m3"), size=32, color=WHITE).to_edge(UP, buff=0.5)
        self.play(self.anim_entree(label, mode="slide_l"))

        centre = np.array([0.0, 0.35, 0.0])
        contour = ParametricFunction(
            lambda s: delt_point(s, centre), t_range=[0, TAU, 0.02],
            color=ENCRE, stroke_width=4)
        self.play(Create(contour), run_time=1.6)

        # la corde glisse, ses deux bouts SUR la courbe, en tournant de 180°
        cordes = VGroup(*[
            Line(*corde_deltoide(t, centre), color=PEINT, stroke_width=3,
                 stroke_opacity=0.55)
            for t in np.linspace(0, TAU, 110)
        ])
        t_tr = ValueTracker(0.0)
        aig = always_redraw(lambda: Line(
            *corde_deltoide(t_tr.get_value(), centre), color=AIGUILLE, stroke_width=10))
        self.add(aig)
        self.play(
            LaggedStart(*[FadeIn(c) for c in cordes], lag_ratio=1.0 / 110, run_time=4.5),
            t_tr.animate.set_value(TAU),
            run_time=4.5, rate_func=linear)

        aire = self.T(self.t_("m3_aire"), size=30, color=JAUNE_TITRE).move_to([4.6, 2.3, 0])
        lecon = self.T(self.t_("m3_lecon"), size=26, color=VERT_OK).next_to(aire, DOWN, buff=0.15)
        self.play(self.anim_entree(aire, mode="pop"))
        self.play(FadeIn(lecon, shift=0.2 * UP))
        self.wait(1.6)
        self.poser_record(2, self.t_("ech_2"), AIGUILLE)
        self.wait(1.0)
        self.play(FadeOut(cordes), FadeOut(aig), FadeOut(contour),
                  FadeOut(aire), FadeOut(lecon), FadeOut(label))

    # ── BESICOVITCH puis L'HONNEUR ─────────────────────────────────────────────
    def ecran_conclusion(self):
        fin = self.poser_record(3, self.t_("ech_fin"), ENCRE)
        besico = self.T(self.t_("besico"), size=32, color=WHITE).move_to([0, 1.6, 0])
        sub = self.T(self.t_("besico_sub"), size=22, color=GREY_B).next_to(besico, DOWN, buff=0.15)
        self.play(self.anim_entree(besico, mode="grow"))
        self.play(FadeIn(sub))
        self.wait(2.0)

        w1 = self.T(self.t_("wang_3d"), size=26, color=WHITE).move_to([0, 0.2, 0])
        w2 = self.T(self.t_("wang_3d2"), size=26, color=BLEU_CALCUL).next_to(w1, DOWN, buff=0.18)
        self.play(self.anim_entree(w1, mode="fade_up"))
        self.play(self.anim_entree(w2, mode="fade_up"))
        self.wait(2.4)
        self.play(FadeOut(besico), FadeOut(sub), FadeOut(w1), FadeOut(w2), FadeOut(fin),
                  *[FadeOut(m) for m in self.mobjects if isinstance(m, (Arrow,))])
        self.clear()

        # L'HONNEUR — le prénom, la 3ᵉ femme, le merci aux profs
        self.add_mascotte(scale=0.6)
        nom = self.T(self.t_("honneur_nom"), size=44, color=JAUNE_TITRE).move_to([0, 2.0, 0])
        h1 = self.T(self.t_("honneur_1"), size=30, color=WHITE).move_to([0, 1.0, 0])
        h2 = self.T(self.t_("honneur_2"), size=26, color=ENCRE).move_to([0, 0.25, 0])
        h3 = self.T(self.t_("honneur_3"), size=26, color=VERT_OK).move_to([0, -0.5, 0])
        self.play(self.anim_entree(nom, mode="grow"))
        self.play(self.anim_entree(h1, mode="fade_up"))
        self.wait(1.2)
        self.play(self.anim_entree(h2, mode="fade_up"))
        self.wait(1.2)
        self.play(self.anim_entree(h3, mode="fade_up"))
        self.wait(2.2)

        appel = self.T(self.t_("appel"), size=30, color=AIGUILLE).move_to([0, -1.7, 0])
        lien = self.T(self.t_("lien"), size=24, color=BLEU_CALCUL).next_to(appel, DOWN, buff=0.22)
        self.play(self.anim_entree(appel, mode="pop"))
        self.play(FadeIn(lien, shift=0.2 * UP))
        signature = self.T(SIGNATURE, size=22, color=VERT_OK).to_edge(DOWN, buff=0.25)
        self.play(Write(signature))
        self.wait(3.0)

    def construct(self):
        self.ecran_intro()
        self.methode_bout()
        self.methode_centre()
        self.methode_deltoide()
        self.ecran_conclusion()


class AiguilleDeKakeyaEN(AiguilleDeKakeya):
    """Same silent film, English captions — la VO ne coûte que les chaînes."""

    LANG = "en"
