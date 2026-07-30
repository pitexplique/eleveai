# bulles_rondes.py
# EleveAI — Le Journal · « Un peu de maths » — Pourquoi les bulles sont rondes ?
#
# UNE vidéo (muet + texte), la MÊME machine que le site
# /pourquoi-les-bulles-sont-rondes : à périmètre FIXE (la même ficelle), on
# arrondit la forme et l'aire enfermée grimpe. Un polygone régulier de n côtés
# et de périmètre P enferme A(n) = P²/(4·n·tan(π/n)), et sa « note »
# q(n) = 4πA/P² = π/(n·tan(π/n)) monte vers 1 sans jamais le dépasser : le
# CERCLE est le champion (q = 1 pile). C'est l'inégalité isopérimétrique
# 4πA ≤ P². La bulle de savon « résout » ce problème sans calcul — sa tension de
# surface minimise l'énergie donc la surface : en 2D un cercle, en 3D une sphère.
#
# Le hook (écran 0) est la question d'enfance d'une vraie mathématicienne,
# Yilin Wang (IHÉS, prix Salem 2024), rapportée dans une interview (CIRM).
# ⚠️ à vérifier au montage pour la formulation exacte.
#
# ⚠️ MUET + TEXTE (Frédéric) : le texte porte tout, waits généreux. 16:9.
# Deux langues, MÊMES scènes : les textes vivent dans TEXTES ; la classe EN ne
# change que la langue (la vidéo est muette — la VO ne coûte que les chaînes).
# ⚠️ Règle de prod : on VALIDE le FR d'abord, puis on rend l'EN.
#
# Rendu brouillon (FR) :
#   python -m manim render -ql manim/scripts/journal/bulles_rondes.py BullesRondes --media_dir manim/scripts/journal/media
# Rendu final (FR) :
#   python -m manim render -qh manim/scripts/journal/bulles_rondes.py BullesRondes -o eleveai-maths-journal-bulles-rondes --media_dir manim/scripts/journal/media
# Rendu final (EN, APRÈS validation FR) :
#   python -m manim render -qh manim/scripts/journal/bulles_rondes.py BullesRondesEN -o eleveai-maths-journal-round-bubbles-en --media_dir manim/scripts/journal/media
# Short 9:16 :
#   python -m manim render -qh -r 1080,1920 manim/scripts/journal/bulles_rondes.py BullesShort -o eleveai-maths-journal-bulles-rondes-short --media_dir manim/scripts/journal/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np

from manim import *

from charte import *
from mascotte import MascotteMargouillat

SAVON = "#7DD3FC"    # le film de savon (bleu clair)
BULLE = "#0EA5E9"    # la bulle, l'accent
CIBLE = JAUNE_TITRE  # le cercle champion (or) — la cible, note 1,00

# La ficelle : périmètre FIXE (unités écran). Le cercle limite a le rayon
# RC_U = P/(2π) ; c'est lui qui enferme le plus.
PERIM_U = 9.6
RC_U = PERIM_U / (2 * np.pi)
CENTRE = np.array([0.0, 0.15, 0.0])


def note_q(n):
    """Le quotient isopérimétrique d'un n-gone régulier : π/(n·tan(π/n)) → 1."""
    return np.pi / (n * np.tan(np.pi / n))


def rayon_poly(n):
    """Rayon circonscrit d'un n-gone régulier de périmètre PERIM_U (unités)."""
    return PERIM_U / (2 * n * np.sin(np.pi / n))


def ficelle(n, center=CENTRE):
    """La ficelle formée en polygone régulier à n côtés (périmètre fixe)."""
    p = RegularPolygon(n=int(n), radius=rayon_poly(int(n)), color=SAVON,
                       stroke_width=6, fill_color=SAVON, fill_opacity=0.18)
    return p.move_to(center)


def cercle_cible(center=CENTRE):
    """Le cercle champion (même ficelle) : la cible, en pointillés dorés."""
    return DashedVMobject(
        Circle(radius=RC_U, color=CIBLE, stroke_width=2).move_to(center),
        num_dashes=46,
    )


def note_fr(n):
    return f"{note_q(int(n)):.2f}".replace(".", ",")


def bulle_mobj(r=1.4, center=ORIGIN):
    """Une bulle : cercle irisé + reflet."""
    b = Circle(radius=r, color=SAVON, stroke_width=3,
               fill_color=SAVON, fill_opacity=0.22).move_to(center)
    reflet = Ellipse(width=0.5 * r, height=0.32 * r, color=WHITE,
                     fill_color=WHITE, fill_opacity=0.7, stroke_width=0)
    reflet.rotate(-0.5).move_to(center + np.array([-0.34 * r, 0.34 * r, 0.0]))
    return VGroup(b, reflet)


TEXTES = {
    "fr": {
        "banniere": "Pourquoi les bulles sont rondes - l'isoperimetrie - Yilin Wang",
        "titre": "Pourquoi les bulles sont rondes ?",
        "sous_titre": "à ficelle égale, quelle forme enferme le plus ?",
        "question0": "Pourquoi les bulles de savon sont-elles rondes ?",
        "question0_sub": "la question qu'une petite fille posait à ses parents",
        "par_titre": "Le savon est paresseux",
        "par_1": "sa peau se contracte : le moins de surface possible",
        "par_2": "moins de surface = moins d'énergie",
        "fic_titre": "La même ficelle",
        "fic_regle": "quelle forme enferme le plus de place ?",
        "fic_carre": "le carré : 9 cm²",
        "fic_arrondi": "on arrondit… l'aire monte",
        "fic_cercle": "le cercle : 11,5 cm² — le champion",
        "note_titre": "Une note pour chaque forme : 4·π·A / P²",
        "note_carre": "carré : 0,79",
        "note_hexa": "hexagone : 0,91",
        "note_cercle": "cercle : 1,00",
        "note_ineg": "4·π·A  ≤  P²",
        "note_lecon": "le cercle est le seul à faire 1",
        "tri_titre": "Et la vraie bulle ? En 3D",
        "tri_1": "volume d'air fixe → le moins de peau",
        "tri_2": "→ la sphère",
        "tri_3": "la bulle « résout » le problème sans calculer",
        "defi_titre": "DÉFI",
        "defi_q": "12 cm de ficelle. Le carré enferme 9 cm². Et le cercle, lui, en enferme… ?",
        "defi_sub": "Vérifie ta réponse sur le site — défis du CP à la Terminale",
        "honneur_nom": "Yilin Wang",
        "honneur_1": "Mathématicienne — IHÉS, prix Salem 2024",
        "honneur_2": "Enfant, elle demandait : « pourquoi les bulles sont rondes ? »",
        "honneur_3": "Sa mère, 1re en physique, devenue architecte.",
        "honneur_4": "Femmes, hommes : aucune différence en mathématiques.",
        "honneur_src": "d'après son interview (CIRM)",
        "appel": "Souffle ta bulle toi-même",
        "lien": "eleveai.fr/pourquoi-les-bulles-sont-rondes",
        "appel2": "…puis mesure le corail du lagon",
    },
    "en": {
        "banniere": "Why bubbles are round - the isoperimetric idea - Yilin Wang",
        "titre": "Why are bubbles round?",
        "sous_titre": "same string, which shape holds the most?",
        "question0": "Why are soap bubbles round?",
        "question0_sub": "the question a little girl asked her parents",
        "par_titre": "Soap is lazy",
        "par_1": "its skin contracts: the least surface possible",
        "par_2": "less surface = less energy",
        "fic_titre": "The same string",
        "fic_regle": "which shape holds the most space?",
        "fic_carre": "the square: 9 cm²",
        "fic_arrondi": "round it off… the area rises",
        "fic_cercle": "the circle: 11.5 cm² — the champion",
        "note_titre": "A score for each shape: 4·π·A / P²",
        "note_carre": "square: 0.79",
        "note_hexa": "hexagon: 0.91",
        "note_cercle": "circle: 1.00",
        "note_ineg": "4·π·A  ≤  P²",
        "note_lecon": "the circle is the only one to reach 1",
        "tri_titre": "And the real bubble? In 3D",
        "tri_1": "fixed volume of air → the least skin",
        "tri_2": "→ the sphere",
        "tri_3": "the bubble “solves” the problem without any maths",
        "defi_titre": "CHALLENGE",
        "defi_q": "12 cm of string. The square holds 9 cm². And the circle holds… ?",
        "defi_sub": "Check your answer on the site — challenges for all ages",
        "honneur_nom": "Yilin Wang",
        "honneur_1": "Mathematician — IHÉS, 2024 Salem Prize",
        "honneur_2": "As a child, she asked: “why are bubbles round?”",
        "honneur_3": "Her mother: top of her physics class, then an architect.",
        "honneur_4": "Women, men: no difference in mathematics.",
        "honneur_src": "from her interview (CIRM)",
        "appel": "Blow your own bubble",
        "lien": "eleveai.fr/pourquoi-les-bulles-sont-rondes",
        "appel2": "…then measure the lagoon coral",
    },
}


class BullesRondes(Scene):
    """Une vidéo : la question d'enfance, le savon paresseux, la ficelle qui
    s'arrondit, la note qui monte vers 1, la sphère, l'honneur (Yilin Wang)."""

    LANG = "fr"
    LARGEUR_SURE = 12.8

    # — helpers standard EleveAI (identiques au corail du lagon) —
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

    # ── OUVERTURE : la question d'enfance ──────────────────────────────────────
    def ecran_intro(self):
        self.banniere = self.T(self.t_("banniere"), size=18, color=GREY_B).to_edge(UP, buff=0.12)
        self.play(FadeIn(self.banniere, shift=0.2 * DOWN), run_time=0.5)

        self.watermark = Text("eleveai.fr", font_size=20, color=GREY_B) \
            .set_opacity(0.55).to_corner(DOWN + RIGHT, buff=0.28)
        self.add(self.watermark)

        titre = self.T(self.t_("titre"), size=44, color=CIBLE).to_edge(UP, buff=0.72)
        soustitre = self.T(self.t_("sous_titre"), size=22, color=GREY_B).next_to(titre, DOWN, buff=0.14)
        self.play(Write(titre))
        self.play(FadeIn(soustitre, shift=0.15 * DOWN), run_time=0.5)

        # des bulles qui montent, toutes rondes
        alea = np.random.RandomState(1618)
        bulles = VGroup()
        for i in range(7):
            r = 0.22 + 0.5 * alea.rand()
            x = -4.5 + 9.0 * alea.rand()
            bulles.add(bulle_mobj(r=r, center=np.array([x, -3.4, 0.0])))
        self.play(LaggedStart(*[FadeIn(b, shift=1.2 * UP) for b in bulles],
                              lag_ratio=0.12, run_time=2.0))
        self.play(bulles.animate.shift(1.0 * UP), run_time=1.2)

        q0 = self.T(self.t_("question0"), size=32, color=WHITE).move_to([0, -0.2, 0])
        sub = self.T(self.t_("question0_sub"), size=21, color=SAVON).next_to(q0, DOWN, buff=0.2)
        self.play(self.anim_entree(q0, mode="grow"))
        self.play(FadeIn(sub, shift=0.15 * UP))
        self.wait(2.4)
        self.play(FadeOut(bulles), FadeOut(q0), FadeOut(sub),
                  FadeOut(titre), FadeOut(soustitre))

    # ── LE SAVON PARESSEUX ─────────────────────────────────────────────────────
    def ecran_paresseux(self):
        titre = self.T(self.t_("par_titre"), size=36, color=CIBLE).to_edge(UP, buff=0.62)
        self.play(self.anim_entree(titre, mode="slide_l"))

        c = np.array([0.0, 0.1, 0.0])
        b = bulle_mobj(r=1.5, center=c)
        self.play(GrowFromCenter(b))

        # les flèches de tension : la peau tire vers le centre
        fleches = VGroup()
        for k in range(10):
            a = k * TAU / 10
            ext = c + 1.5 * np.array([np.cos(a), np.sin(a), 0.0])
            inn = c + 1.05 * np.array([np.cos(a), np.sin(a), 0.0])
            fleches.add(Arrow(ext, inn, buff=0, color=BULLE, stroke_width=3,
                              max_tip_length_to_length_ratio=0.5))
        self.play(LaggedStart(*[GrowArrow(f) for f in fleches], lag_ratio=0.05, run_time=1.4))
        self.play(b.animate.scale(0.92), run_time=0.6)

        l1 = self.T(self.t_("par_1"), size=24, color=WHITE).move_to([0, -2.4, 0])
        l2 = self.T(self.t_("par_2"), size=26, color=SAVON).to_edge(DOWN, buff=0.35)
        self.play(self.anim_entree(l1, mode="fade_up"))
        self.play(FadeIn(l2, shift=0.15 * UP))
        self.wait(2.2)
        self.fondu_total()

    # ── LA FICELLE QUI S'ARRONDIT (le cœur) ────────────────────────────────────
    def ecran_ficelle(self):
        titre = self.T(self.t_("fic_titre"), size=36, color=CIBLE).to_edge(UP, buff=0.6)
        regle = self.T(self.t_("fic_regle"), size=21, color=GREY_B).next_to(titre, DOWN, buff=0.12)
        self.play(self.anim_entree(titre, mode="slide_l"))
        self.play(FadeIn(regle))

        cible = cercle_cible()
        self.play(Create(cible))

        nb = ValueTracker(4)
        poly = always_redraw(lambda: ficelle(round(nb.get_value())))
        note_txt = always_redraw(lambda: Text(
            note_fr(round(nb.get_value())), font_size=42, color=BULLE
        ).move_to(CENTRE + np.array([0, 0.12, 0])))
        note_lbl = Text("4·π·A / P²", font_size=18, color=GREY_B).move_to(CENTRE + np.array([0, -0.55, 0]))
        self.add(poly, note_txt, note_lbl)

        carre = self.T(self.t_("fic_carre"), size=24, color=WHITE).move_to([0, -2.7, 0])
        self.play(FadeIn(carre, shift=0.15 * UP))
        self.wait(1.0)

        arr = self.T(self.t_("fic_arrondi"), size=24, color=SAVON).move_to([0, -2.7, 0])
        self.play(FadeOut(carre), FadeIn(arr, shift=0.1 * UP))
        self.play(nb.animate.set_value(30), run_time=4.0, rate_func=smooth)

        cercle = self.T(self.t_("fic_cercle"), size=26, color=VERT_OK).move_to([0, -2.7, 0])
        self.play(FadeOut(arr), FadeIn(cercle, shift=0.1 * UP))
        self.play(Flash(CENTRE, color=CIBLE, line_length=0.4, num_lines=18, flash_radius=RC_U + 0.4))
        self.wait(2.0)
        self.fondu_total()

    # ── LA NOTE ISOPÉRIMÉTRIQUE ────────────────────────────────────────────────
    def ecran_note(self):
        titre = self.T(self.t_("note_titre"), size=30, color=CIBLE).to_edge(UP, buff=0.62)
        self.play(self.anim_entree(titre, mode="fade_down"))

        chips = VGroup()
        for cle, col, x in [("note_carre", WHITE, -4.0),
                            ("note_hexa", SAVON, 0.0),
                            ("note_cercle", VERT_OK, 4.0)]:
            txt = self.T(self.t_(cle), size=26, color=col)
            box = SurroundingRectangle(txt, color=col, buff=0.18, corner_radius=0.1)
            chips.add(VGroup(box, txt).move_to([x, 0.6, 0]))
        self.play(LaggedStart(*[FadeIn(g, scale=0.7) for g in chips], lag_ratio=0.25, run_time=1.6))

        ineg = self.T(self.t_("note_ineg"), size=40, color=BULLE).move_to([0, -1.2, 0])
        self.play(self.anim_entree(ineg, mode="grow"))
        lecon = self.T(self.t_("note_lecon"), size=26, color=CIBLE).to_edge(DOWN, buff=0.7)
        self.play(self.anim_entree(lecon, mode="fade_up"))
        self.wait(2.4)
        self.fondu_total()

    # ── LA 3D : la vraie bulle → sphère ────────────────────────────────────────
    def ecran_3d(self):
        titre = self.T(self.t_("tri_titre"), size=34, color=CIBLE).to_edge(UP, buff=0.62)
        self.play(self.anim_entree(titre, mode="slide_l"))

        c = np.array([0.0, 0.2, 0.0])
        sphere = bulle_mobj(r=1.6, center=c)
        # quelques cercles concentriques pour la rondeur 3D
        halo = VGroup(*[
            Circle(radius=1.6 * s, color=SAVON, stroke_width=1.5, stroke_opacity=0.35).move_to(c)
            for s in (0.65, 0.85)
        ])
        self.play(GrowFromCenter(sphere), Create(halo))

        l1 = self.T(self.t_("tri_1"), size=25, color=WHITE).move_to([0, -1.9, 0])
        l2 = self.T(self.t_("tri_2"), size=32, color=VERT_OK).next_to(l1, DOWN, buff=0.18)
        l3 = self.T(self.t_("tri_3"), size=24, color=SAVON).to_edge(DOWN, buff=0.4)
        self.play(self.anim_entree(l1, mode="fade_up"))
        self.play(self.anim_entree(l2, mode="grow"))
        self.play(FadeIn(l3, shift=0.15 * UP))
        self.wait(2.4)
        self.fondu_total()

    # ── LE DÉFI (rappel actif : la réponse n'est JAMAIS à l'écran) ─────────────
    def ecran_defi(self):
        titre = self.T(self.t_("defi_titre"), size=44, color=BULLE).move_to([0, 1.6, 0])
        q = self.T(self.t_("defi_q"), size=27, color=WHITE).move_to([0, 0.2, 0])
        sub = self.T(self.t_("defi_sub"), size=22, color=VERT_OK).move_to([0, -1.1, 0])
        self.play(self.anim_entree(titre, mode="pop"))
        self.play(self.anim_entree(q, mode="fade_up"))
        self.wait(2.6)
        self.play(FadeIn(sub, shift=0.2 * UP))
        self.wait(2.2)
        self.fondu_total()

    # ── L'HONNEUR + L'APPEL ────────────────────────────────────────────────────
    def ecran_honneur(self):
        self.add_mascotte(scale=0.6)
        nom = self.T(self.t_("honneur_nom"), size=46, color=CIBLE).move_to([0, 2.15, 0])
        h1 = self.T(self.t_("honneur_1"), size=26, color=WHITE).move_to([0, 1.35, 0])
        h2 = self.T(self.t_("honneur_2"), size=25, color=SAVON).move_to([0, 0.6, 0])
        h3 = self.T(self.t_("honneur_3"), size=23, color=WHITE).move_to([0, -0.05, 0])
        h4 = self.T(self.t_("honneur_4"), size=26, color=VERT_OK).move_to([0, -0.7, 0])
        self.play(self.anim_entree(nom, mode="grow"))
        self.play(self.anim_entree(h1, mode="fade_up"))
        self.wait(0.9)
        self.play(self.anim_entree(h2, mode="fade_up"))
        self.wait(1.2)
        self.play(self.anim_entree(h3, mode="fade_up"))
        self.play(self.anim_entree(h4, mode="fade_up"))
        src = self.T(self.t_("honneur_src"), size=17, color=GREY_B).move_to([0, -1.25, 0])
        self.play(FadeIn(src))
        self.wait(1.6)

        appel = self.T(self.t_("appel"), size=27, color=BULLE).move_to([0, -1.95, 0])
        lien = self.T(self.t_("lien"), size=21, color=BLEU_CALCUL).next_to(appel, DOWN, buff=0.16)
        appel2 = self.T(self.t_("appel2"), size=18, color=GREY_B).next_to(lien, DOWN, buff=0.12)
        self.play(self.anim_entree(appel, mode="pop"))
        self.play(FadeIn(lien, shift=0.2 * UP))
        self.play(FadeIn(appel2, shift=0.2 * UP))
        signature = self.T(SIGNATURE, size=22, color=VERT_OK).to_edge(DOWN, buff=0.25)
        self.play(Write(signature))
        self.wait(3.0)

    def construct(self):
        self.ecran_intro()
        self.ecran_paresseux()
        self.ecran_ficelle()
        self.ecran_note()
        self.ecran_3d()
        self.ecran_defi()
        self.ecran_honneur()


class BullesRondesEN(BullesRondes):
    """Same silent film, English captions — la VO ne coûte que les chaînes.
    ⚠️ à rendre APRÈS validation du FR."""

    LANG = "en"


# ── SHORT 9:16 (Instagram / YouTube Shorts, ~35 s) ───────────────────────────
# Le cadre vertical est IMPOSÉ dans __init__ (sinon -r ne change que les pixels).
class BullesShort(Scene):
    """Version verticale nerveuse : la question → le savon paresseux → la ficelle
    qui s'arrondit → la sphère → Yilin Wang. Muet + texte, gros caractères."""

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
        kicker = self.T("Un peu de maths", size=24, color=GREY_B).to_edge(UP, buff=0.5)
        q1 = self.T("Pourquoi les bulles", size=36, color=WHITE).move_to([0, 2.6, 0])
        q2 = self.T("sont-elles rondes ?", size=36, color=BULLE).next_to(q1, DOWN, buff=0.14)
        self.play(FadeIn(kicker), Write(q1), run_time=0.8)
        self.play(FadeIn(q2, shift=0.2 * UP))
        c = np.array([0.0, -0.5, 0.0])
        b = bulle_mobj(r=1.3, center=c)
        self.play(GrowFromCenter(b))
        self.wait(0.6)
        self.play(FadeOut(q1), FadeOut(q2), FadeOut(kicker), FadeOut(b), run_time=0.5)

        # ── BEAT 2 · le savon paresseux ───────────────────────────────────────
        t2 = self.T("Le savon est paresseux.", size=28, color=CIBLE).to_edge(UP, buff=1.1)
        self.play(FadeIn(t2, shift=0.2 * DOWN))
        b2 = bulle_mobj(r=1.2, center=c)
        fleches = VGroup(*[
            Arrow(c + 1.2 * np.array([np.cos(k * TAU / 8), np.sin(k * TAU / 8), 0]),
                  c + 0.8 * np.array([np.cos(k * TAU / 8), np.sin(k * TAU / 8), 0]),
                  buff=0, color=BULLE, stroke_width=3,
                  max_tip_length_to_length_ratio=0.6)
            for k in range(8)
        ])
        self.play(GrowFromCenter(b2))
        self.play(LaggedStart(*[GrowArrow(f) for f in fleches], lag_ratio=0.05, run_time=1.0))
        t2b = self.T("le moins de surface possible", size=24, color=WHITE).move_to([0, -2.7, 0])
        self.play(FadeIn(t2b, shift=0.2 * UP))
        self.wait(1.4)
        self.play(FadeOut(t2), FadeOut(t2b), FadeOut(b2), FadeOut(fleches), run_time=0.5)

        # ── BEAT 3 · la ficelle qui s'arrondit ────────────────────────────────
        t3 = self.T("Même ficelle,", size=30, color=CIBLE).to_edge(UP, buff=1.0)
        t3b = self.T("on arrondit…", size=26, color=GREY_B).next_to(t3, DOWN, buff=0.12)
        self.play(FadeIn(t3, shift=0.2 * DOWN), FadeIn(t3b))
        cible = DashedVMobject(Circle(radius=1.2, color=CIBLE, stroke_width=2).move_to(c), num_dashes=36)
        self.add(cible)
        # même périmètre que le cercle-cible (rayon 1,2) → l'aire monte vers lui
        perim_s = 2 * np.pi * 1.2

        def rpoly_s(n):
            return perim_s / (2 * n * np.sin(np.pi / n))

        nb = ValueTracker(4)
        poly = always_redraw(lambda: RegularPolygon(
            n=round(nb.get_value()), radius=rpoly_s(round(nb.get_value())),
            color=SAVON, stroke_width=5, fill_color=SAVON, fill_opacity=0.18,
        ).move_to(c))
        note_txt = always_redraw(lambda: Text(
            note_fr(round(nb.get_value())), font_size=34, color=BULLE).move_to(c))
        self.add(poly, note_txt)
        self.play(nb.animate.set_value(28), run_time=3.0, rate_func=smooth)
        r1 = self.T("le rond gagne : note 1,00", size=26, color=VERT_OK).move_to([0, -2.9, 0])
        self.play(FadeIn(r1, shift=0.2 * UP))
        self.wait(1.6)
        self.play(*[FadeOut(m) for m in [t3, t3b, cible, poly, note_txt, r1]], run_time=0.5)

        # ── BEAT 4 · Yilin Wang ────────────────────────────────────────────────
        mob = MascotteMargouillat().scale(0.42).to_corner(DOWN + RIGHT, buff=0.3)
        self.add(mob)
        nom = self.T("Yilin Wang", size=38, color=CIBLE).move_to([0, 2.0, 0])
        h1 = self.T("prix Salem 2024", size=28, color=WHITE).move_to([0, 1.1, 0])
        h2 = self.T("Enfant, elle demandait :", size=24, color=SAVON).move_to([0, 0.35, 0])
        h3 = self.T("« pourquoi les bulles", size=26, color=WHITE).move_to([0, -0.35, 0])
        h3b = self.T("sont rondes ? »", size=26, color=WHITE).next_to(h3, DOWN, buff=0.1)
        self.play(GrowFromCenter(nom))
        self.play(FadeIn(h1, shift=0.2 * UP))
        self.play(FadeIn(h2, shift=0.2 * UP))
        self.play(FadeIn(h3, shift=0.2 * UP), FadeIn(h3b, shift=0.2 * UP))
        self.wait(0.8)
        appel = self.T("Souffle ta bulle", size=28, color=BULLE).move_to([0, -1.9, 0])
        lien = self.T("eleveai.fr", size=22, color=BLEU_CALCUL).next_to(appel, DOWN, buff=0.18)
        self.play(FadeIn(appel, scale=0.7))
        self.play(FadeIn(lien, shift=0.2 * UP))
        self.wait(2.4)
