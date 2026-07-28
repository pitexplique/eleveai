# corail_du_lagon.py
# EleveAI — Le Journal · « Un peu de maths » — Le corail du lagon (Hong Wang)
#
# UNE vidéo (muet + texte), la MÊME machine que le site /corail-du-lagon : un
# sous-marin tourne autour d'un corail et le FILME. Chaque image est une
# PROJECTION — la largeur filmée vaut w(φ) = 2·√(A²·sin²(θ−φ) + B²·cos²(θ−φ)) :
#   • une seule photo est AMBIGUË (court de face = long de biais) ;
#   • en tournant tout autour, la PLUS GRANDE largeur = la longueur (2A),
#     la PLUS PETITE = la largeur (2B) — on mesure sans toucher.
# C'est le geste « projeter dans toutes les directions » au cœur de la preuve
# de la conjecture de Kakeya par Hong Wang (avec Joshua Zahl, 2025) — le même
# geste que l'aiguille de Kakeya, côté MESURE au lieu de côté CACHE.
#
# ⚠️ MUET + TEXTE (Frédéric) : le texte porte tout, waits généreux. 16:9.
# Deux langues, MÊMES scènes : les textes vivent dans TEXTES ; la classe EN ne
# change que la langue (la vidéo est muette — la VO ne coûte que les chaînes).
#
# Rendu brouillon (FR) :
#   python -m manim render -ql manim/scripts/journal/corail_du_lagon.py CorailDuLagon --media_dir manim/scripts/journal/media
# Rendu final (FR) :
#   python -m manim render -qh manim/scripts/journal/corail_du_lagon.py CorailDuLagon -o eleveai-maths-journal-corail-du-lagon --media_dir manim/scripts/journal/media
# Rendu final (EN) :
#   python -m manim render -qh manim/scripts/journal/corail_du_lagon.py CorailDuLagonEN -o eleveai-maths-journal-coral-lagoon-en --media_dir manim/scripts/journal/media
# Short 9:16 :
#   python -m manim render -qh -r 1080,1920 manim/scripts/journal/corail_du_lagon.py CorailShort -o eleveai-maths-journal-corail-du-lagon-short --media_dir manim/scripts/journal/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np

from manim import *

from charte import *
from mascotte import MascotteMargouillat

CORAIL = "#f4694a"   # le corail
OMBRE = "#f4a58e"    # la largeur filmée (la « barre »)
EAU = "#5fd0e6"      # les rayons, le capteur, l'eau
SOUS = "#cbd5e1"     # le sous-marin (gris clair, visible sur fond sombre)

# Corail-vedette : 42 cm de long, 18 cm de large (comme la valeur par défaut du
# site). Demi-axes en unités Manim pour le dessin ; libellés en cm.
A_CM, B_CM = 21.0, 9.0          # demi-longueur, demi-largeur (cm)
A_U, B_U = 1.36, 0.58           # demi-axes à l'écran (unités)
THETA = np.radians(35.0)        # orientation du corail
RORB = 2.35                     # rayon de l'orbite du sous-marin
SENS = 1.0                      # demi-longueur du capteur affiché
C0 = np.array([-0.3, 0.15, 0.0])  # centre du corail


def largeur_u(phi):
    """Largeur filmée à l'écran (unités) sous l'angle φ."""
    d = THETA - phi
    return 2.0 * np.sqrt(A_U ** 2 * np.sin(d) ** 2 + B_U ** 2 * np.cos(d) ** 2)


def largeur_cm(phi):
    """Largeur filmée en cm sous l'angle φ. Max = 42 (longueur), min = 18."""
    d = THETA - phi
    return 2.0 * np.sqrt(A_CM ** 2 * np.sin(d) ** 2 + B_CM ** 2 * np.cos(d) ** 2)


def corail_mobj(a_u=A_U, b_u=B_U, theta=THETA, center=C0, op=0.85):
    """Le corail : une ellipse orientée + quelques polypes."""
    ell = Ellipse(width=2 * a_u, height=2 * b_u, color="#c2410c",
                  fill_color=CORAIL, fill_opacity=op, stroke_width=2)
    ell.rotate(theta).move_to(center)
    polypes = VGroup(*[
        Dot(radius=0.045, color=WHITE, fill_opacity=0.5).move_to(
            center + f * a_u * np.array([np.cos(theta), np.sin(theta), 0.0]))
        for f in (-0.55, -0.2, 0.2, 0.55)
    ])
    return VGroup(ell, polypes)


def sous_marin(echelle=1.0):
    """Un petit sous-marin pointant vers +x (son hublot devant)."""
    corps = Ellipse(width=0.72, height=0.36, color=SOUS,
                    fill_color=SOUS, fill_opacity=1.0, stroke_width=0)
    tourelle = RoundedRectangle(width=0.18, height=0.15, corner_radius=0.05,
                                color=SOUS, fill_color=SOUS, fill_opacity=1.0,
                                stroke_width=0).move_to([0.0, 0.2, 0.0])
    hublot = Dot(radius=0.075, color="#fde047").move_to([0.2, 0.0, 0.0])
    helice = Polygon([-0.36, 0.0, 0.0], [-0.52, 0.12, 0.0], [-0.52, -0.12, 0.0],
                     color=SOUS, fill_color=SOUS, fill_opacity=1.0, stroke_width=0)
    return VGroup(corps, tourelle, hublot, helice).scale(echelle)


TEXTES = {
    "fr": {
        "banniere": "Le corail du lagon - mesurer sans toucher - Hong Wang (Kakeya)",
        "titre": "Le corail du lagon",
        "sous_titre": "mesurer un corail sans le toucher — l'idée de Hong Wang",
        "question0": "Peut-on mesurer un corail sans le toucher ?",
        "regle": "une photo, c'est une projection : le corail devient une largeur",
        "amb_titre": "Une seule photo ne suffit pas",
        "amb_face": "vu presque dans son axe : il paraît petit",
        "amb_cote": "vu de côté : il paraît grand",
        "amb_meme": "Même largeur filmée… deux corails différents.",
        "amb_concl": "Une seule photo est ambiguë.",
        "tour_titre": "La ruse : faire le tour",
        "tour_regle": "on garde la plus grande et la plus petite largeur filmée",
        "tour_w": "largeur filmée",
        "long": "longueur = 42 cm",
        "larg": "largeur = 18 cm",
        "tour_lecon": "la plus grande « ombre » donne la vraie longueur",
        "kak_titre": "Regarder dans toutes les directions",
        "kak_obj": "un objet vu sous tous les angles",
        "kak_thm": "C'est le geste de Hong Wang, avec Joshua Zahl (2025) —",
        "kak_thm2": "celui qui a fermé la conjecture de Kakeya.",
        "lecon1": "Ce qu'une seule vue cache, le tour révèle.",
        "lecon2": "Le scanner tourne autour du corps. Le sous-marin, autour du corail.",
        "reel": "Recenser coraux et oursins du lagon, sans rien abîmer.",
        "defi_titre": "DÉFI",
        "defi_q": "En tournant, tu relèves : 24, 39, 31, 45, 28 cm. Quelle est la LONGUEUR du corail ?",
        "defi_sub": "Vérifie ta réponse sur le site — défis du CP à la Terminale",
        "honneur_nom": "Hong Wang · 王虹",
        "honneur_1": "Médaille Fields 2026 — 3ᵉ femme de l'histoire",
        "honneur_2": "Son prénom, Hong, veut dire « arc-en-ciel »",
        "honneur_3": "Femmes, hommes : pour elle, aucune différence en mathématiques.",
        "honneur_4": "L'essentiel : le travail, le temps, et les professeurs qu'elle a remerciés.",
        "appel": "Mesure le corail toi-même",
        "lien": "eleveai.fr/corail-du-lagon",
        "appel2": "…puis fais tourner l'aiguille de Kakeya",
    },
    "en": {
        "banniere": "The lagoon coral - measuring without touching - Hong Wang (Kakeya)",
        "titre": "The lagoon coral",
        "sous_titre": "measuring a coral without touching it — Hong Wang's idea",
        "question0": "Can you measure a coral without touching it?",
        "regle": "a photo is a projection: the coral becomes a width",
        "amb_titre": "One photo is not enough",
        "amb_face": "seen almost end-on: it looks small",
        "amb_cote": "seen from the side: it looks big",
        "amb_meme": "Same filmed width… two different corals.",
        "amb_concl": "A single photo is ambiguous.",
        "tour_titre": "The trick: go all the way around",
        "tour_regle": "keep the largest and the smallest filmed width",
        "tour_w": "filmed width",
        "long": "length = 42 cm",
        "larg": "width = 18 cm",
        "tour_lecon": "the largest “shadow” gives the true length",
        "kak_titre": "Look in every direction",
        "kak_obj": "an object seen from every angle",
        "kak_thm": "This is Hong Wang's move, with Joshua Zahl (2025) —",
        "kak_thm2": "the one who closed the Kakeya conjecture.",
        "lecon1": "What one view hides, the full turn reveals.",
        "lecon2": "A scanner turns around the body. The submarine, around the coral.",
        "reel": "Count the lagoon's corals and urchins without harming a thing.",
        "defi_titre": "CHALLENGE",
        "defi_q": "Turning around, you read: 24, 39, 31, 45, 28 cm. What is the coral's LENGTH?",
        "defi_sub": "Check your answer on the site — challenges for all ages",
        "honneur_nom": "Hong Wang · 王虹",
        "honneur_1": "2026 Fields Medal — 3rd woman in its history",
        "honneur_2": "Her first name, Hong, means “rainbow”",
        "honneur_3": "Women, men: for her, no difference in mathematics.",
        "honneur_4": "What counts: work, time, and the teachers she thanked.",
        "appel": "Measure the coral yourself",
        "lien": "eleveai.fr/corail-du-lagon",
        "appel2": "…then spin the Kakeya needle",
    },
}


class CorailDuLagon(Scene):
    """Une vidéo : l'ambiguïté d'une photo, le tour qui mesure, l'honneur."""

    LANG = "fr"
    LARGEUR_SURE = 12.8

    # — helpers standard EleveAI (identiques à l'aiguille de Kakeya) —
    def t_(self, cle):
        return TEXTES[self.LANG][cle]

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + LEFT, buff=0.35)
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

    def fondu_total(self):
        garder = {getattr(self, "banniere", None), getattr(self, "watermark", None)}
        self.play(*[FadeOut(m) for m in self.mobjects if m not in garder], run_time=0.5)

    # ── OUVERTURE : la question ────────────────────────────────────────────────
    def ecran_intro(self):
        self.banniere = self.T(self.t_("banniere"), size=18, color=GREY_B).to_edge(UP, buff=0.12)
        self.play(FadeIn(self.banniere, shift=0.2 * DOWN), run_time=0.5)

        self.watermark = Text("eleveai.fr", font_size=20, color=GREY_B) \
            .set_opacity(0.55).to_corner(DOWN + RIGHT, buff=0.28)
        self.add(self.watermark)

        titre = self.T(self.t_("titre"), size=46, color=JAUNE_TITRE).to_edge(UP, buff=0.72)
        soustitre = self.T(self.t_("sous_titre"), size=22, color=GREY_B).next_to(titre, DOWN, buff=0.14)
        self.play(Write(titre))
        self.play(FadeIn(soustitre, shift=0.15 * DOWN), run_time=0.5)

        corail = corail_mobj().move_to([0, 0.25, 0])
        orbite = Circle(radius=RORB, color=EAU, stroke_width=1.5, stroke_opacity=0.4) \
            .move_to([0, 0.25, 0])
        orbite = DashedVMobject(orbite, num_dashes=44)
        sub = sous_marin(0.9).move_to([0 + RORB * np.cos(0.5), 0.25 + RORB * np.sin(0.5), 0]) \
            .rotate(0.5 + PI)
        self.play(GrowFromCenter(corail), Create(orbite))
        self.play(FadeIn(sub, shift=0.3 * DOWN))

        q0 = self.T(self.t_("question0"), size=34, color=WHITE).move_to([0, -2.4, 0])
        self.play(self.anim_entree(q0, mode="grow"))
        regle = self.T(self.t_("regle"), size=20, color=EAU).to_edge(DOWN, buff=0.28)
        self.play(FadeIn(regle))
        self.wait(2.2)
        self.play(FadeOut(corail), FadeOut(orbite), FadeOut(sub), FadeOut(q0),
                  FadeOut(regle), FadeOut(titre), FadeOut(soustitre))

    # ── L'AMBIGUÏTÉ : une seule photo ment ─────────────────────────────────────
    def ecran_ambigu(self):
        label = self.T(self.t_("amb_titre"), size=34, color=ROUGE_ERREUR).to_edge(UP, buff=0.62)
        self.play(self.anim_entree(label, mode="slide_l"))

        # à gauche : un corail long, vu presque dans son axe → largeur filmée petite
        cg = corail_mobj(a_u=1.5, b_u=0.5, theta=np.radians(20), center=np.array([-3.4, 0.6, 0])) \
            .scale(1.0)
        barre_g = Line([-3.4 - 0.55, -1.4, 0], [-3.4 + 0.55, -1.4, 0], color=OMBRE, stroke_width=9)
        lg = self.T(self.t_("amb_face"), size=20, color=GREY_B).move_to([-3.4, -2.1, 0])
        # à droite : un corail court, vu de côté → même largeur filmée
        cd = corail_mobj(a_u=0.62, b_u=0.42, theta=np.radians(90), center=np.array([3.4, 0.6, 0]))
        barre_d = Line([3.4 - 0.55, -1.4, 0], [3.4 + 0.55, -1.4, 0], color=OMBRE, stroke_width=9)
        ld = self.T(self.t_("amb_cote"), size=20, color=GREY_B).move_to([3.4, -2.1, 0])

        self.play(GrowFromCenter(cg), GrowFromCenter(cd))
        self.play(Create(barre_g), Create(barre_d))
        self.play(FadeIn(lg, shift=0.2 * UP), FadeIn(ld, shift=0.2 * UP))

        egal = self.T("=", size=48, color=WHITE).move_to([0, -1.4, 0])
        self.play(FadeIn(egal, scale=0.5))
        self.play(Indicate(barre_g, color=OMBRE), Indicate(barre_d, color=OMBRE))

        meme = self.T(self.t_("amb_meme"), size=27, color=WHITE).move_to([0, 1.9, 0])
        concl = self.T(self.t_("amb_concl"), size=32, color=ROUGE_ERREUR).move_to([0, -2.9, 0])
        self.play(self.anim_entree(meme, mode="fade_down"))
        self.wait(1.4)
        self.play(self.anim_entree(concl, mode="grow"))
        self.wait(2.0)
        self.fondu_total()

    # ── LE TOUR : ça mesure — max = longueur, min = largeur ────────────────────
    def ecran_tour(self):
        label = self.T(self.t_("tour_titre"), size=34, color=JAUNE_TITRE).to_edge(UP, buff=0.6)
        regle = self.T(self.t_("tour_regle"), size=20, color=GREY_B).next_to(label, DOWN, buff=0.12)
        self.play(self.anim_entree(label, mode="slide_l"))
        self.play(FadeIn(regle))

        corail = corail_mobj().move_to(C0)
        orb = DashedVMobject(Circle(radius=RORB, color=EAU, stroke_width=1.5,
                                    stroke_opacity=0.4).move_to(C0), num_dashes=44)
        self.add(orb, corail)

        phi = ValueTracker(0.4)

        def pos_sub():
            return C0 + RORB * np.array([np.cos(phi.get_value()), np.sin(phi.get_value()), 0.0])

        def geom():
            s = pos_sub()
            d = (C0 - s)
            d = d / np.linalg.norm(d)
            p = np.array([-d[1], d[0], 0.0])
            half = largeur_u(phi.get_value()) / 2.0
            E1, E2 = C0 + half * p, C0 - half * p
            B1, B2 = s + half * p, s - half * p
            S1, S2 = s + SENS * p, s - SENS * p
            g = VGroup(
                DashedLine(C0, s, color=SOUS, stroke_width=1.5, stroke_opacity=0.5),
                Line(E1, B1, color=CORAIL, stroke_width=1.5, stroke_opacity=0.6),
                Line(E2, B2, color=CORAIL, stroke_width=1.5, stroke_opacity=0.6),
                Line(S1, S2, color=EAU, stroke_width=2, stroke_opacity=0.35),
                Line(B1, B2, color=OMBRE, stroke_width=7),
                sous_marin(0.9).move_to(s).rotate(
                    np.arctan2(d[1], d[0])),
            )
            return g

        scene = always_redraw(geom)
        wlab = always_redraw(lambda: Text(
            f"{round(largeur_cm(phi.get_value()))} cm", font_size=24, color=EAU
        ).next_to(pos_sub(), UP, buff=0.12))
        self.add(scene, wlab)

        wtag = self.T(self.t_("tour_w"), size=18, color=GREY_B).to_corner(DOWN + RIGHT, buff=0.6)
        self.play(FadeIn(wtag))
        self.play(phi.animate.set_value(0.4 + TAU), run_time=6.0, rate_func=linear)

        # le résultat : la plus GRANDE largeur = la longueur ; la plus PETITE = la largeur
        chip_long = VGroup(
            self.T(self.t_("long"), size=26, color=VERT_OK),
        )
        boite_l = SurroundingRectangle(chip_long, color=VERT_OK, buff=0.14, corner_radius=0.08)
        gl = VGroup(boite_l, chip_long).move_to([-3.4, -3.15, 0])
        chip_larg = VGroup(
            self.T(self.t_("larg"), size=26, color=CORAIL),
        )
        boite_w = SurroundingRectangle(chip_larg, color=CORAIL, buff=0.14, corner_radius=0.08)
        gw = VGroup(boite_w, chip_larg).move_to([3.4, -3.15, 0])
        self.play(FadeIn(gl, scale=0.6), FadeIn(gw, scale=0.6))

        lecon = self.T(self.t_("tour_lecon"), size=26, color=JAUNE_TITRE).to_edge(DOWN, buff=1.15)
        self.play(self.anim_entree(lecon, mode="fade_up"))
        self.wait(2.2)
        self.fondu_total()

    # ── LE LIEN KAKEYA : regarder dans toutes les directions ───────────────────
    def ecran_kakeya(self):
        titre = self.T(self.t_("kak_titre"), size=34, color=JAUNE_TITRE).to_edge(UP, buff=0.62)
        self.play(self.anim_entree(titre, mode="slide_l"))

        # l'« oursin » de directions — comme dans l'aiguille de Kakeya
        alea = np.random.RandomState(2718)
        centre = np.array([0.0, 0.2, 0.0])
        rayons = VGroup()
        for i in range(40):
            a = (i / 40) * np.pi + (alea.rand() - 0.5) * 0.04
            lg = 0.9 + 1.0 * alea.rand()
            v = np.array([np.cos(a), np.sin(a), 0.0]) * lg
            rayons.add(Line(centre - v, centre + v, color=EAU,
                            stroke_width=2.2, stroke_opacity=0.4 + 0.5 * alea.rand()))
        obj = self.T(self.t_("kak_obj"), size=24, color=GREY_B).move_to([0, -2.0, 0])
        self.play(LaggedStart(*[Create(l) for l in rayons], lag_ratio=0.03, run_time=2.2),
                  FadeIn(obj))
        self.play(Rotate(rayons, angle=0.5, about_point=centre), run_time=1.6)

        w1 = self.T(self.t_("kak_thm"), size=26, color=WHITE).move_to([0, -2.75, 0])
        w2 = self.T(self.t_("kak_thm2"), size=30, color=BLEU_CALCUL).next_to(w1, DOWN, buff=0.18)
        self.play(self.anim_entree(w1, mode="fade_up"))
        self.play(self.anim_entree(w2, mode="grow"))
        self.wait(2.6)
        self.fondu_total()

    # ── LA LEÇON ───────────────────────────────────────────────────────────────
    def ecran_lecon(self):
        l1 = self.T(self.t_("lecon1"), size=32, color=JAUNE_TITRE).move_to([0, 1.4, 0])
        l2 = self.T(self.t_("lecon2"), size=26, color=WHITE).move_to([0, 0.3, 0])
        reel = self.T(self.t_("reel"), size=25, color=EAU).move_to([0, -0.9, 0])
        self.play(self.anim_entree(l1, mode="grow"))
        self.wait(1.2)
        self.play(self.anim_entree(l2, mode="fade_up"))
        self.play(self.anim_entree(reel, mode="fade_up"))
        self.wait(2.4)
        self.fondu_total()

    # ── LE DÉFI (rappel actif : la réponse n'est JAMAIS à l'écran) ─────────────
    def ecran_defi(self):
        titre = self.T(self.t_("defi_titre"), size=44, color=CORAIL).move_to([0, 1.5, 0])
        q = self.T(self.t_("defi_q"), size=28, color=WHITE).move_to([0, 0.2, 0])
        sub = self.T(self.t_("defi_sub"), size=22, color=VERT_OK).move_to([0, -1.0, 0])
        self.play(self.anim_entree(titre, mode="pop"))
        self.play(self.anim_entree(q, mode="fade_up"))
        self.wait(2.6)
        self.play(FadeIn(sub, shift=0.2 * UP))
        self.wait(2.2)
        self.fondu_total()

    # ── L'HONNEUR + L'APPEL (copie alignée sur l'aiguille de Kakeya) ───────────
    def ecran_honneur(self):
        self.add_mascotte(scale=0.6)
        nom = self.T(self.t_("honneur_nom"), size=44, color=JAUNE_TITRE).move_to([0, 2.15, 0])
        h1 = self.T(self.t_("honneur_1"), size=28, color=WHITE).move_to([0, 1.3, 0])
        h2 = self.T(self.t_("honneur_2"), size=24, color=EAU).move_to([0, 0.6, 0])
        h3 = self.T(self.t_("honneur_3"), size=26, color=VERT_OK).move_to([0, -0.15, 0])
        h4 = self.T(self.t_("honneur_4"), size=23, color=WHITE).move_to([0, -0.85, 0])
        self.play(self.anim_entree(nom, mode="grow"))
        self.play(self.anim_entree(h1, mode="fade_up"))
        self.wait(1.0)
        self.play(self.anim_entree(h2, mode="fade_up"))
        self.wait(1.0)
        self.play(self.anim_entree(h3, mode="fade_up"))
        self.wait(1.4)
        self.play(self.anim_entree(h4, mode="fade_up"))
        self.wait(2.0)

        appel = self.T(self.t_("appel"), size=27, color=CORAIL).move_to([0, -1.9, 0])
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
        self.ecran_ambigu()
        self.ecran_tour()
        self.ecran_kakeya()
        self.ecran_lecon()
        self.ecran_defi()
        self.ecran_honneur()


class CorailDuLagonEN(CorailDuLagon):
    """Same silent film, English captions — la VO ne coûte que les chaînes."""

    LANG = "en"


# ── SHORT 9:16 (Instagram / YouTube Shorts, ~35 s) ───────────────────────────
# Le cadre vertical est IMPOSÉ dans __init__ (sinon -r ne change que les pixels).
class CorailShort(Scene):
    """Version verticale nerveuse : mesurer sans toucher → une photo ment → le
    tour révèle → Hong Wang. Muet + texte, gros caractères pour mobile."""

    LARGEUR_SURE = 4.0

    def __init__(self, **kw):
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(**kw)

    def T(self, texte, size=30, color=WHITE, **kw):
        t = Text(texte, font_size=size, color=color, **kw)
        if t.width > self.LARGEUR_SURE:
            t.scale_to_fit_width(self.LARGEUR_SURE)
        return t

    def construct(self):
        wm = self.T("eleveai.fr", size=22, color=GREY_B)
        wm.set_opacity(0.6).to_edge(DOWN, buff=0.22)
        self.add(wm)

        # ── BEAT 1 · le hook ──────────────────────────────────────────────────
        kicker = self.T("Le corail du lagon", size=26, color=GREY_B).to_edge(UP, buff=0.5)
        q1 = self.T("Mesurer un corail", size=40, color=WHITE).move_to([0, 2.55, 0])
        q2 = self.T("sans le toucher ?", size=40, color=CORAIL).next_to(q1, DOWN, buff=0.14)
        self.play(FadeIn(kicker), Write(q1), run_time=0.8)
        self.play(FadeIn(q2, shift=0.2 * UP))
        c = np.array([0.0, -0.4, 0.0])
        cor = corail_mobj(a_u=1.0, b_u=0.42, theta=np.radians(30), center=c)
        orb = DashedVMobject(Circle(radius=1.6, color=EAU, stroke_width=1.5,
                                    stroke_opacity=0.4).move_to(c), num_dashes=32)
        sub = sous_marin(0.8).move_to(c + 1.6 * np.array([np.cos(0.6), np.sin(0.6), 0])).rotate(0.6 + PI)
        self.play(GrowFromCenter(cor), Create(orb), FadeIn(sub))
        self.wait(0.6)
        self.play(FadeOut(q1), FadeOut(q2), FadeOut(kicker), FadeOut(sub), run_time=0.5)

        # ── BEAT 2 · une photo ment ───────────────────────────────────────────
        t2 = self.T("Une photo, c'est une projection.", size=26, color=WHITE).to_edge(UP, buff=1.2)
        self.play(FadeIn(t2, shift=0.2 * DOWN))
        bg = Line(c + LEFT * 0.35, c + RIGHT * 0.35, color=OMBRE, stroke_width=9).shift(DOWN * 1.9)
        bd = Line(c + LEFT * 0.35, c + RIGHT * 0.35, color=OMBRE, stroke_width=9).shift(DOWN * 1.9)
        # de face / de côté : même barre → ambigu
        self.play(Indicate(cor, scale_factor=1.15))
        amb = self.T("Une seule est ambiguë", size=28, color=ROUGE_ERREUR).move_to([0, -2.7, 0])
        self.play(FadeIn(amb, shift=0.2 * UP))
        self.wait(1.4)
        self.play(FadeOut(t2), FadeOut(amb), FadeOut(cor), FadeOut(orb), FadeOut(bg), FadeOut(bd), run_time=0.5)

        # ── BEAT 3 · le tour révèle ───────────────────────────────────────────
        cor2 = corail_mobj(a_u=1.0, b_u=0.42, theta=np.radians(30), center=c)
        orb2 = DashedVMobject(Circle(radius=1.6, color=EAU, stroke_width=1.5,
                                     stroke_opacity=0.4).move_to(c), num_dashes=32)
        self.add(orb2, cor2)
        phi = ValueTracker(0.3)
        sm = always_redraw(lambda: sous_marin(0.8).move_to(
            c + 1.6 * np.array([np.cos(phi.get_value()), np.sin(phi.get_value()), 0.0])
        ).rotate(phi.get_value() + PI))
        t3 = self.T("Fais le tour :", size=30, color=JAUNE_TITRE).to_edge(UP, buff=1.0)
        self.add(sm)
        self.play(FadeIn(t3, shift=0.2 * DOWN))
        self.play(phi.animate.set_value(0.3 + TAU), run_time=3.4, rate_func=linear)
        r1 = self.T("plus grande = longueur", size=26, color=VERT_OK).move_to([0, -2.3, 0])
        r2 = self.T("plus petite = largeur", size=26, color=CORAIL).next_to(r1, DOWN, buff=0.16)
        self.play(FadeIn(r1, shift=0.2 * UP))
        self.play(FadeIn(r2, shift=0.2 * UP))
        self.wait(1.8)
        self.play(*[FadeOut(m) for m in [t3, cor2, orb2, sm, r1, r2]], run_time=0.5)

        # ── BEAT 4 · le lien Hong Wang ────────────────────────────────────────
        l1 = Text("Regarder dans", font_size=40, color=WHITE)
        l1.scale_to_fit_width(4.0).move_to([0, 1.2, 0])
        l2 = Text("toutes les directions.", font_size=40, color=JAUNE_TITRE)
        l2.scale_to_fit_width(4.0).move_to([0, 0.1, 0])
        l3 = Text("L'idée de Hong Wang (Kakeya)", font_size=24, color=BLEU_CALCUL)
        l3.scale_to_fit_width(3.6).move_to([0, -1.2, 0])
        self.play(GrowFromCenter(l1))
        self.play(GrowFromCenter(l2))
        self.play(FadeIn(l3, shift=0.2 * UP))
        self.wait(1.8)
        self.play(FadeOut(l1), FadeOut(l2), FadeOut(l3), run_time=0.5)

        # ── BEAT 5 · l'honneur + l'appel ──────────────────────────────────────
        mob = MascotteMargouillat().scale(0.42).to_corner(DOWN + RIGHT, buff=0.3)
        self.add(mob)
        nom = self.T("Hong Wang · 王虹", size=38, color=JAUNE_TITRE).move_to([0, 2.0, 0])
        h1 = self.T("Médaille Fields 2026", size=30, color=WHITE).move_to([0, 1.0, 0])
        h2 = self.T("3ᵉ femme de l'histoire", size=26, color=BLEU_CALCUL).move_to([0, 0.3, 0])
        h3 = self.T("« Hong » : arc-en-ciel", size=24, color=EAU).move_to([0, -0.4, 0])
        self.play(GrowFromCenter(nom))
        self.play(FadeIn(h1, shift=0.2 * UP))
        self.play(FadeIn(h2, shift=0.2 * UP))
        self.play(FadeIn(h3, shift=0.2 * UP))
        self.wait(0.8)
        appel = self.T("Mesure le corail", size=30, color=CORAIL).move_to([0, -1.7, 0])
        lien = self.T("eleveai.fr/corail-du-lagon", size=22, color=BLEU_CALCUL).next_to(appel, DOWN, buff=0.2)
        self.play(FadeIn(appel, scale=0.7))
        self.play(FadeIn(lien, shift=0.2 * UP))
        self.wait(2.4)
