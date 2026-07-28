# aiguille_de_kakeya.py
# EleveAI — Le Journal · « Un peu de maths » — L'aiguille de Kakeya (Hong Wang)
#
# UNE seule vidéo (muet + texte), la MÊME machine que le site : l'aiguille fait
# demi-tour et l'aire balayée se divise par 2 à chaque ruse :
#   1) autour du bout    → π/2 ≈ 1,57 (demi-disque)
#   2) autour du centre  → π/4 ≈ 0,79 (disque)
#   3) le deltoïde       → π/8 ≈ 0,39 (la corde qui glisse en tournant)
# puis Besicovitch (« aussi près de 0 qu'on veut », 1928) — l'aire peut MENTIR —,
# le théorème (en 3D : dimension 3 forcément, avec Joshua Zahl), le VOLCAN
# (box-counting sur le rempart de la Fournaise, LE MÊME générateur que la page
# /dimension-du-volcan, graine 271828 : 15 → 35 → 87 → 197 carrés, d ≈ 1,25),
# et l'HONNEUR :
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


# ── Le rempart de la Fournaise : LE MÊME générateur que /dimension-du-volcan ──
# (LCG graine 271828, amplitude 110·2^(−0,6k), 6 itérations, bornes [10, 290]
# dans un cadre 1000×300 « pixels ») — la vidéo compte les MÊMES carrés que la
# machine du site : 15 → 35 → 87 → 197, dimension ≈ 1,25.
def _lcg(graine):
    s = graine & 0xFFFFFFFF

    def suivant():
        nonlocal s
        s = (s * 1664525 + 1013904223) % 4294967296
        return s / 4294967296

    return suivant


def gen_rempart():
    alea = _lcg(271828)
    pts = [(20, 190), (240, 110), (420, 170), (610, 90), (800, 175), (980, 185)]
    for k in range(6):
        amp = 110 * 2 ** (-0.6 * k)
        suiv = []
        for i in range(len(pts) - 1):
            x1, y1 = pts[i]
            x2, y2 = pts[i + 1]
            suiv.append((x1, y1))
            ym = (y1 + y2) / 2 + (alea() * 2 - 1) * amp
            suiv.append(((x1 + x2) / 2, min(290.0, max(10.0, ym))))
        suiv.append(pts[-1])
        pts = suiv
    return pts


TAILLES_VOLCAN = [120, 60, 30, 15]


def compter_cases(pts, s):
    """Box-counting : les cases de la grille de pas s traversées par la ligne."""
    cases = set()
    for i in range(len(pts) - 1):
        x1, y1 = pts[i]
        x2, y2 = pts[i + 1]
        n = max(1, int(np.ceil(np.hypot(x2 - x1, y2 - y1) / (s / 5))))
        for k in range(n + 1):
            x = x1 + (x2 - x1) * k / n
            y = y1 + (y2 - y1) * k / n
            cases.add((int(np.floor(x / s)), int(np.floor(y / s))))
    return cases


TEXTES = {
    "fr": {
        "titre": "L'aiguille de Kakeya",
        "sous_titre": "un problème de 1917, résolu par Hong Wang",
        "question0": "Peut-on faire demi-tour sans être vu ?",
        "question": "Combien de place, au minimum ?",
        "regle": "1 aiguille = 1 unité — on mesure l'aire balayée",
        "m1": "1 · Autour du bout",
        "m1_aire": "aire = π/2 ≈ 1,57",
        "m1_calc": "demi-disque, rayon = 1 :  ½ · π · 1² = π/2",
        "m2": "2 · Autour du centre",
        "m2_aire": "aire = π/4 ≈ 0,79",
        "m2_calc": "disque, rayon = ½ :  π · (½)² = π/4",
        "m2_lecon": "deux fois moins !",
        "r_un": "r = 1 (l'aiguille entière)",
        "r_demi": "r = ½ (une demi-aiguille)",
        "m3": "3 · La ruse du deltoïde",
        "m3_aire": "aire = π/8 ≈ 0,39",
        "m3_lecon": "encore deux fois moins !",
        "ech_0": "1,57", "ech_1": "0,79", "ech_2": "0,39", "ech_fin": "… 0 ?",
        "besico": "On peut approcher 0 d'aussi près qu'on veut",
        "besico_sub": "(Besicovitch, 1928)",
        "mentir": "La trace devient presque invisible : l'aire peut mentir…",
        "mentir2": "Pour dire qu'un objet reste « épais », il faut mieux : la dimension.",
        "thm0": "un objet qui contient une aiguille dans toutes les directions",
        "thm": "Le théorème de Hong Wang, avec Joshua Zahl (2025) :",
        "thm2": "en 3D, un tel objet est forcément de dimension 3.",
        "banniere": "Piton de la Fournaise - Hong Wang - Médaille Fields 2026 (avec défis)",
        "rugo1": "La dimension, c'est la rugosité d'une forme.",
        "rugo2": "Et ici, la forme la plus déchiquetée… c'est le rempart de la Fournaise.",
        "volcan_titre": "Et le volcan ? La dimension se mesure",
        "volcan_sous": "le rempart de la Fournaise — on compte les carrés que la crête traverse",
        "carres_mot": "carrés",
        "volcan_d": "dimension ≈ {d} — plus qu'une ligne lisse (d = 1)",
        "volcan_meme": "C'est l'idée de dimension de son théorème — mesurée à La Réunion.",
        "defi_titre": "DÉFI",
        "defi_q": "À chaque affinement : ×2,4 environ. Après 197 carrés, la grille suivante en trouverait combien ?",
        "defi_sub": "Vérifie ta réponse sur le site — défis du CP à la Terminale",
        "lecon1": "Ce qu'on ne voit pas sous un angle se révèle quand on change de regard.",
        "lecon2": "On peut se cacher de l'aire. Pas de la dimension.",
        "appel2": "…puis mesure la dimension du volcan",
        "honneur_nom": "Hong Wang · 王虹",
        "honneur_1": "Médaille Fields 2026 — 3ᵉ femme de l'histoire",
        "honneur_2": "Son prénom, Hong, veut dire « arc-en-ciel »",
        "honneur_3": "Homme ou femme ? En maths, dit-elle, ce n'est qu'un epsilon.",
        "honneur_4": "Les vraies variables : le travail, le temps… et les professeurs, qu'elle a remerciés.",
        "appel": "Fais tourner l'aiguille toi-même",
        "lien": "eleveai.fr/aiguille-de-kakeya",
    },
    "en": {
        "titre": "The Kakeya needle",
        "sous_titre": "a 1917 problem, solved by Hong Wang",
        "question0": "Can you turn around without being seen?",
        "question": "How little room does it need?",
        "regle": "1 needle = 1 unit — we measure the swept area",
        "m1": "1 · Around the tip",
        "m1_aire": "area = π/2 ≈ 1.57",
        "m1_calc": "half-disk, radius = 1:  ½ · π · 1² = π/2",
        "m2": "2 · Around the centre",
        "m2_aire": "area = π/4 ≈ 0.79",
        "m2_calc": "full disk, radius = ½:  π · (½)² = π/4",
        "m2_lecon": "half as much!",
        "r_un": "r = 1 (the whole needle)",
        "r_demi": "r = ½ (half a needle)",
        "m3": "3 · The deltoid trick",
        "m3_aire": "area = π/8 ≈ 0.39",
        "m3_lecon": "halved again!",
        "ech_0": "1.57", "ech_1": "0.79", "ech_2": "0.39", "ech_fin": "… 0 ?",
        "besico": "You can get as close to 0 as you like",
        "besico_sub": "(Besicovitch, 1928)",
        "mentir": "The trace becomes almost invisible: area can lie…",
        "mentir2": "To say an object stays “thick”, you need better: dimension.",
        "thm0": "an object holding a needle in every direction",
        "thm": "Hong Wang's theorem, with Joshua Zahl (2025):",
        "thm2": "in 3D, such an object must have dimension 3.",
        "banniere": "Piton de la Fournaise - Hong Wang - 2026 Fields Medal (with challenges)",
        "rugo1": "Dimension measures how rough a shape is.",
        "rugo2": "And here, the most jagged shape of all… is the Fournaise rampart.",
        "volcan_titre": "And the volcano? Dimension can be measured",
        "volcan_sous": "the Fournaise rampart — count the squares the ridge crosses",
        "carres_mot": "squares",
        "volcan_d": "dimension ≈ {d} — more than a smooth line (d = 1)",
        "volcan_meme": "The very idea of dimension in her theorem — measured on Réunion island.",
        "defi_titre": "CHALLENGE",
        "defi_q": "Each refinement: about ×2.4. After 197 squares, how many would the next grid find?",
        "defi_sub": "Check your answer on the site — challenges for all ages",
        "lecon1": "What one angle cannot show, another way of looking reveals.",
        "lecon2": "You can hide from area. Not from dimension.",
        "appel2": "…then measure the volcano's dimension",
        "honneur_nom": "Hong Wang · 王虹",
        "honneur_1": "2026 Fields Medal — 3rd woman in its history",
        "honneur_2": "Her first name, Hong, means “rainbow”",
        "honneur_3": "Man or woman? In maths, she says, it's just an epsilon.",
        "honneur_4": "The real variables: work, time… and the teachers she thanked.",
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
        # Le bandeau-titre PERMANENT (Frédéric, 27/07 : « toujours à l'honneur,
        # la médaille Fields, Hong Wang ») : présent dès la PREMIÈRE image et
        # jusqu'au bout — fondu_total() l'épargne.
        self.banniere = self.T(self.t_("banniere"), size=18, color=GREY_B).to_edge(UP, buff=0.12)
        self.play(FadeIn(self.banniere, shift=0.2 * DOWN), run_time=0.5)

        titre = self.T(self.t_("titre"), size=46, color=JAUNE_TITRE).to_edge(UP, buff=0.72)
        soustitre = self.T(self.t_("sous_titre"), size=22, color=GREY_B).next_to(titre, DOWN, buff=0.14)
        self.play(Write(titre))
        self.play(FadeIn(soustitre, shift=0.15 * DOWN), run_time=0.5)

        aiguille = Line(LEFT * NL / 2, RIGHT * NL / 2, color=AIGUILLE,
                        stroke_width=10).move_to([0, 0.3, 0])
        self.play(GrowFromCenter(aiguille))
        self.play(Rotate(aiguille, angle=0.35, run_time=0.5),
                  rate_func=there_and_back)

        q0 = self.T(self.t_("question0"), size=36, color=WHITE).move_to([0, -1.3, 0])
        self.play(self.anim_entree(q0, mode="grow"))
        self.wait(1.2)
        q = self.T(self.t_("question"), size=30, color=AIGUILLE).move_to([0, -2.15, 0])
        self.play(self.anim_entree(q, mode="fade_up"))
        regle = self.T(self.t_("regle"), size=20, color=GREY_B).to_edge(DOWN, buff=0.28)
        self.play(FadeIn(regle))
        self.wait(2.0)
        self.play(FadeOut(aiguille), FadeOut(q0), FadeOut(q), FadeOut(regle),
                  FadeOut(titre), FadeOut(soustitre))

    # ── MÉTHODE 1 : autour du bout (demi-disque, π/2) ──────────────────────────
    def methode_bout(self):
        label = self.T(self.t_("m1"), size=32, color=WHITE).to_edge(UP, buff=0.62)
        self.play(self.anim_entree(label, mode="slide_l"))

        pivot = np.array([0.0, -0.9, 0.0])
        a = ValueTracker(0.0)
        zone = always_redraw(lambda: Sector(
            radius=NL, start_angle=0.0, angle=a.get_value(),
            arc_center=pivot, fill_color=PEINT, fill_opacity=0.5, stroke_width=0))
        aig = always_redraw(lambda: Line(
            pivot, pivot + NL * np.array([np.cos(a.get_value()), np.sin(a.get_value()), 0.0]),
            color=AIGUILLE, stroke_width=10))
        self.add(zone, aig)
        self.play(a.animate.set_value(np.pi), run_time=3.0, rate_func=linear)

        # LE RAYON, montré : l'aiguille ENTIÈRE (dans le demi-disque, angle ~110°)
        r_ang = np.pi * 0.60
        bout = pivot + NL * np.array([np.cos(r_ang), np.sin(r_ang), 0.0])
        r_line = DashedLine(pivot, bout, color=WHITE, stroke_width=3, dash_length=0.14)
        r_lab = self.T(self.t_("r_un"), size=20, color=WHITE).move_to(
            pivot + 0.52 * (bout - pivot) + np.array([-1.4, 0.05, 0.0]))
        self.play(Create(r_line), FadeIn(r_lab))

        aire = self.T(self.t_("m1_aire"), size=30, color=JAUNE_TITRE).move_to([3.1, 1.5, 0])
        calc = self.T(self.t_("m1_calc"), size=21, color=GREY_B).move_to([0, -1.75, 0])
        self.play(self.anim_entree(aire, mode="pop"))
        self.play(FadeIn(calc, shift=0.2 * UP))
        self.wait(1.6)
        self.rec0 = self.poser_record(0, self.t_("ech_0"), AIGUILLE)
        self.wait(1.0)
        self.play(FadeOut(zone), FadeOut(aig), FadeOut(aire), FadeOut(calc),
                  FadeOut(r_line), FadeOut(r_lab), FadeOut(label))

    # ── MÉTHODE 2 : autour du centre (disque, π/4) ─────────────────────────────
    def methode_centre(self):
        label = self.T(self.t_("m2"), size=32, color=WHITE).to_edge(UP, buff=0.62)
        self.play(self.anim_entree(label, mode="slide_l"))

        centre = np.array([0.0, 0.1, 0.0])
        r = NL / 2.0
        a = ValueTracker(0.0)
        # les DEUX moitiés de l'aiguille balayent deux secteurs opposés
        zone = always_redraw(lambda: VGroup(
            Sector(radius=r, start_angle=0.0, angle=a.get_value(),
                   arc_center=centre, fill_color=PEINT, fill_opacity=0.5, stroke_width=0),
            Sector(radius=r, start_angle=np.pi, angle=a.get_value(),
                   arc_center=centre, fill_color=PEINT, fill_opacity=0.5, stroke_width=0)))
        aig = always_redraw(lambda: Line(
            centre - r * np.array([np.cos(a.get_value()), np.sin(a.get_value()), 0.0]),
            centre + r * np.array([np.cos(a.get_value()), np.sin(a.get_value()), 0.0]),
            color=AIGUILLE, stroke_width=10))
        self.add(zone, aig)
        self.play(a.animate.set_value(np.pi), run_time=3.0, rate_func=linear)

        # LE RAYON, montré : une DEMI-aiguille (du centre au bord, angle ~115°)
        r_ang = np.pi * 0.64
        bord = centre + r * np.array([np.cos(r_ang), np.sin(r_ang), 0.0])
        r_line = DashedLine(centre, bord, color=WHITE, stroke_width=3, dash_length=0.12)
        r_lab = self.T(self.t_("r_demi"), size=20, color=WHITE).move_to(bord + np.array([-1.5, 0.2, 0.0]))
        self.play(Create(r_line), FadeIn(r_lab))

        aire = self.T(self.t_("m2_aire"), size=30, color=JAUNE_TITRE).move_to([3.3, 1.9, 0])
        lecon = self.T(self.t_("m2_lecon"), size=26, color=VERT_OK).next_to(aire, DOWN, buff=0.15)
        calc = self.T(self.t_("m2_calc"), size=21, color=GREY_B).move_to([0, -2.05, 0])
        self.play(self.anim_entree(aire, mode="pop"))
        self.play(FadeIn(lecon, shift=0.2 * UP))
        self.play(FadeIn(calc, shift=0.2 * UP))
        self.wait(1.6)
        self.poser_record(1, self.t_("ech_1"), AIGUILLE)
        self.wait(1.0)
        self.play(FadeOut(zone), FadeOut(aig), FadeOut(aire), FadeOut(lecon), FadeOut(calc),
                  FadeOut(r_line), FadeOut(r_lab), FadeOut(label))

    # ── MÉTHODE 3 : le deltoïde (π/8) ──────────────────────────────────────────
    def methode_deltoide(self):
        label = self.T(self.t_("m3"), size=32, color=WHITE).to_edge(UP, buff=0.62)
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

    # — tout effacer SAUF le bandeau-titre permanent —
    def fondu_total(self):
        garder = getattr(self, "banniere", None)
        self.play(*[FadeOut(m) for m in self.mobjects if m is not garder], run_time=0.5)

    # — décimales à la française (ou pas) —
    def fmt1(self, v):
        s = f"{v:.1f}"
        return s.replace(".", ",") if self.LANG == "fr" else s

    def fmt2(self, v):
        s = f"{v:.2f}"
        return s.replace(".", ",") if self.LANG == "fr" else s

    # ── BESICOVITCH : l'aire fond… donc l'aire peut mentir ─────────────────────
    def ecran_besicovitch(self):
        self.poser_record(3, self.t_("ech_fin"), ENCRE)
        besico = self.T(self.t_("besico"), size=32, color=WHITE).move_to([0, 1.6, 0])
        sub = self.T(self.t_("besico_sub"), size=22, color=GREY_B).next_to(besico, DOWN, buff=0.15)
        self.play(self.anim_entree(besico, mode="grow"))
        self.play(FadeIn(sub))
        self.wait(1.8)

        m1 = self.T(self.t_("mentir"), size=28, color=AIGUILLE).move_to([0, 0.2, 0])
        m2 = self.T(self.t_("mentir2"), size=28, color=WHITE).next_to(m1, DOWN, buff=0.22)
        self.play(self.anim_entree(m1, mode="fade_up"))
        self.play(self.anim_entree(m2, mode="fade_up"))
        self.wait(2.2)
        self.fondu_total()

    # ── SA SOLUTION : le théorème de dimension — et son OBJET ──────────────────
    def ecran_theoreme(self):
        # Ce qu'elle a vraiment étudié : un objet qui contient une aiguille dans
        # TOUTES les directions — dessiné en « oursin » de segments.
        alea = _lcg(1917)
        centre = np.array([0.0, 1.15, 0.0])
        aiguilles = VGroup()
        for i in range(40):
            a = (i / 40) * np.pi + (alea() - 0.5) * 0.05
            lg = 0.85 + 1.05 * alea()
            v = np.array([np.cos(a), np.sin(a), 0.0]) * lg
            aiguilles.add(Line(centre - v, centre + v, color=AIGUILLE,
                               stroke_width=2.2, stroke_opacity=0.45 + 0.55 * alea()))
        lab = self.T(self.t_("thm0"), size=24, color=GREY_B).move_to([0, -1.15, 0])
        self.play(LaggedStart(*[Create(l) for l in aiguilles], lag_ratio=0.03, run_time=2.2),
                  FadeIn(lab))
        self.play(Rotate(aiguilles, angle=0.5, about_point=centre), run_time=1.6)

        w1 = self.T(self.t_("thm"), size=28, color=WHITE).move_to([0, -2.0, 0])
        w2 = self.T(self.t_("thm2"), size=32, color=BLEU_CALCUL).next_to(w1, DOWN, buff=0.22)
        self.play(self.anim_entree(w1, mode="fade_up"))
        self.play(self.anim_entree(w2, mode="grow"))
        self.wait(2.6)
        self.fondu_total()

    # ── LE VOLCAN : la dimension se mesure (box-counting) ──────────────────────
    def ecran_volcan(self):
        # Le chaînon topographique : POURQUOI le volcan ? Parce que la dimension
        # mesure la rugosité — et que le relief d'ici est le plus déchiqueté.
        r1 = self.T(self.t_("rugo1"), size=30, color=WHITE).move_to([0, 0.75, 0])
        r2 = self.T(self.t_("rugo2"), size=27, color=JAUNE_TITRE).next_to(r1, DOWN, buff=0.3)
        self.play(self.anim_entree(r1, mode="fade_up"))
        self.play(self.anim_entree(r2, mode="fade_up"))
        self.wait(2.3)
        self.play(FadeOut(r1), FadeOut(r2), run_time=0.4)

        titre = self.T(self.t_("volcan_titre"), size=34, color=JAUNE_TITRE).to_edge(UP, buff=0.58)
        sous = self.T(self.t_("volcan_sous"), size=21, color=GREY_B).next_to(titre, DOWN, buff=0.12)
        self.play(Write(titre), FadeIn(sous))

        pts_px = gen_rempart()

        def pm(x, y):
            return np.array([-6.0 + x * 0.012, 1.55 - y * 0.012, 0.0])

        ligne = VMobject(color=WHITE, stroke_width=3.5).set_points_as_corners(
            [pm(x, y) for x, y in pts_px])
        fond = Polygon(*([pm(x, y) for x, y in pts_px] + [pm(980, 300), pm(20, 300)]),
                       fill_color=WHITE, fill_opacity=0.08, stroke_width=0)
        self.play(FadeIn(fond), Create(ligne), run_time=1.4)

        comptes = []
        prev_n = None
        for idx, s_px in enumerate(TAILLES_VOLCAN):
            cases = compter_cases(pts_px, s_px)
            n = len(cases)
            comptes.append(n)
            cote = s_px * 0.012
            grille = VGroup()
            for gx in range(0, 1001, s_px):
                grille.add(Line(pm(gx, 0), pm(gx, 300), stroke_width=1, color=GREY_D))
            for gy in range(0, 301, s_px):
                grille.add(Line(pm(0, gy), pm(1000, gy), stroke_width=1, color=GREY_D))
            carres = VGroup(*[
                Square(side_length=cote, fill_color=PEINT, fill_opacity=0.4, stroke_width=0)
                .move_to(pm((i + 0.5) * s_px, (j + 0.5) * s_px))
                for (i, j) in sorted(cases)])
            self.play(FadeIn(grille), run_time=0.35)
            self.play(LaggedStart(*[FadeIn(c) for c in carres],
                                  lag_ratio=1.5 / max(n, 1), run_time=1.1))

            mot = f" {self.t_('carres_mot')}" if idx == 0 else ""
            chip_t = self.T(f"{n}{mot}", size=24, color=AIGUILLE)
            boite = SurroundingRectangle(chip_t, color=AIGUILLE, buff=0.12, corner_radius=0.08)
            chip = VGroup(boite, chip_t).move_to([-4.6 + idx * 2.7, -3.15, 0])
            if prev_n is not None:
                fl = Arrow([-4.6 + idx * 2.7 - 1.8, -3.15, 0],
                           [-4.6 + idx * 2.7 - 1.0, -3.15, 0],
                           buff=0, stroke_width=3, color=GREY_B,
                           max_tip_length_to_length_ratio=0.35)
                mult = self.T("×" + self.fmt1(n / prev_n), size=20, color=VERT_OK) \
                    .next_to(fl, UP, buff=0.08)
                self.play(FadeIn(fl), FadeIn(mult), run_time=0.3)
            self.play(FadeIn(chip, scale=0.6), run_time=0.35)
            prev_n = n
            self.wait(0.5)
            self.play(FadeOut(grille), FadeOut(carres), run_time=0.3)

        # la dimension — la MÊME régression que la machine du site
        xs = [np.log(1.0 / s) for s in TAILLES_VOLCAN]
        ys = [np.log(n) for n in comptes]
        mx, my = float(np.mean(xs)), float(np.mean(ys))
        d = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)

        self.play(FadeOut(fond), FadeOut(ligne), FadeOut(sous))
        dtxt = self.T(self.t_("volcan_d").format(d=self.fmt2(d)), size=32, color=JAUNE_TITRE) \
            .move_to([0, 0.6, 0])
        meme = self.T(self.t_("volcan_meme"), size=25, color=BLEU_CALCUL) \
            .next_to(dtxt, DOWN, buff=0.3)
        self.play(self.anim_entree(dtxt, mode="grow"))
        self.play(self.anim_entree(meme, mode="fade_up"))
        self.wait(2.6)
        self.fondu_total()

    # ── LE DÉFI (rappel actif : la réponse n'est JAMAIS à l'écran) ─────────────
    def ecran_defi(self):
        titre = self.T(self.t_("defi_titre"), size=44, color=AIGUILLE).move_to([0, 1.5, 0])
        q = self.T(self.t_("defi_q"), size=28, color=WHITE).move_to([0, 0.2, 0])
        sub = self.T(self.t_("defi_sub"), size=22, color=VERT_OK).move_to([0, -1.0, 0])
        self.play(self.anim_entree(titre, mode="pop"))
        self.play(self.anim_entree(q, mode="fade_up"))
        self.wait(2.6)
        self.play(FadeIn(sub, shift=0.2 * UP))
        self.wait(2.2)
        self.fondu_total()

    # ── LA LEÇON (la question centrale, tranchée avec Frédéric le 27/07) ───────
    def ecran_lecon(self):
        l1 = self.T(self.t_("lecon1"), size=30, color=WHITE).move_to([0, 0.8, 0])
        l2 = self.T(self.t_("lecon2"), size=34, color=JAUNE_TITRE).move_to([0, -0.5, 0])
        self.play(self.anim_entree(l1, mode="fade_up"))
        self.wait(1.4)
        self.play(self.anim_entree(l2, mode="grow"))
        self.wait(2.6)
        self.fondu_total()

    # ── L'HONNEUR + L'APPEL ────────────────────────────────────────────────────
    def ecran_honneur(self):
        # L'HONNEUR — le prénom, la 3ᵉ femme, le merci aux profs
        self.add_mascotte(scale=0.6)
        nom = self.T(self.t_("honneur_nom"), size=44, color=JAUNE_TITRE).move_to([0, 2.15, 0])
        h1 = self.T(self.t_("honneur_1"), size=28, color=WHITE).move_to([0, 1.3, 0])
        h2 = self.T(self.t_("honneur_2"), size=24, color=ENCRE).move_to([0, 0.6, 0])
        h3 = self.T(self.t_("honneur_3"), size=26, color=VERT_OK).move_to([0, -0.15, 0])
        h4 = self.T(self.t_("honneur_4"), size=23, color=WHITE).move_to([0, -0.85, 0])
        self.play(self.anim_entree(nom, mode="grow"))
        self.play(self.anim_entree(h1, mode="fade_up"))
        self.wait(1.1)
        self.play(self.anim_entree(h2, mode="fade_up"))
        self.wait(1.1)
        self.play(self.anim_entree(h3, mode="fade_up"))
        self.wait(1.6)
        self.play(self.anim_entree(h4, mode="fade_up"))
        self.wait(2.2)

        appel = self.T(self.t_("appel"), size=27, color=AIGUILLE).move_to([0, -1.9, 0])
        lien = self.T(self.t_("lien"), size=22, color=BLEU_CALCUL).next_to(appel, DOWN, buff=0.18)
        appel2 = self.T(self.t_("appel2"), size=18, color=GREY_B).next_to(lien, DOWN, buff=0.14)
        self.play(self.anim_entree(appel, mode="pop"))
        self.play(FadeIn(lien, shift=0.2 * UP))
        self.play(FadeIn(appel2, shift=0.2 * UP))
        signature = self.T(SIGNATURE, size=22, color=VERT_OK).to_edge(DOWN, buff=0.25)
        self.play(Write(signature))
        self.wait(3.0)

    def construct(self):
        self.ecran_intro()
        self.methode_bout()
        self.methode_centre()
        self.methode_deltoide()
        self.ecran_besicovitch()
        self.ecran_theoreme()
        self.ecran_volcan()
        self.ecran_defi()
        self.ecran_lecon()
        self.ecran_honneur()


class AiguilleDeKakeyaEN(AiguilleDeKakeya):
    """Same silent film, English captions — la VO ne coûte que les chaînes."""

    LANG = "en"
