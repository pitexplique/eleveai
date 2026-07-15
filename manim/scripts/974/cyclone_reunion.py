# cyclone_reunion.py
# EleveAI — « Les maths en vrai · La Réunion » — Les cyclones à La Réunion
#
# Épisode 3 de la série « en vrai 974 » (voir manim/REGLES.md, section « Les maths
# en vrai »). Jumeau de circulation_eau.py / lait_reunion.py : format simulation
# animée, HORS banques (pas de notionId). Standard d'effets = animations variées
# (anim_entree) + légendes distribuées (legende_mobile) + vrai défi à 2 étapes.
#
# Maths mobilisées : lecture d'échelle (vitesse des vents en km/h), grands nombres
# (record de pluie), et le défi = vitesse/distance/temps + conversion heures→jours.
#
# Deux scènes :
# - CycloneReunion974      → 16:9 YouTube (~1 min 40)
# - CycloneReunion974Short → 9:16 Shorts/Instagram (~40 s), rendre avec -r 1080,1920
#
# Rendu brouillon :
#   python -m manim render -ql manim/scripts/974/cyclone_reunion.py CycloneReunion974 --media_dir manim/scripts/974/media
#   python -m manim render -ql -r 480,854 manim/scripts/974/cyclone_reunion.py CycloneReunion974Short --media_dir manim/scripts/974/media
# Rendu final :
#   python -m manim render -qh manim/scripts/974/cyclone_reunion.py CycloneReunion974 -o eleveai-maths-974-cyclone-reunion --media_dir manim/scripts/974/media
#   python -m manim render -qh -r 1080,1920 manim/scripts/974/cyclone_reunion.py CycloneReunion974Short -o eleveai-maths-974-cyclone-reunion-short --media_dir manim/scripts/974/media
#
# Repères réels (ordres de grandeur, arrondis pour l'élève) :
# - Saison cyclonique : novembre → avril ; l'océan doit dépasser ~26 °C (le carburant)
# - Échelle Météo-France océan Indien : tempête ~60, cyclone ≥118, intense ≥166, très intense >212 km/h
# - Record du MONDE de pluie en 24 h : cyclone Gamède, 2007, Commerson (974) → ~1 692 mm
# - Défi : un cyclone à 900 km avançant à 15 km/h → 900 ÷ 15 = 60 h = 2,5 jours

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


# ── décor partagé ──────────────────────────────────────────────────────────────

def cyclone(echelle=1.0, couleur=BLEU_CALCUL, n_bras=3):
    """Un cyclone vu du dessus : des bras en spirale + un œil calme au centre."""
    g = VGroup()
    for k in range(n_bras):
        offset = k * TAU / n_bras
        pts = []
        for t in np.linspace(0.35, 3.05, 55):
            r = 0.22 * np.exp(0.30 * t)
            a = 1.5 * t + offset
            pts.append(np.array([r * np.cos(a), r * np.sin(a), 0]))
        bras = VMobject(stroke_color=couleur, stroke_width=7)
        bras.set_points_smoothly(pts)
        g.add(bras)
    oeil = Circle(radius=0.24, stroke_color=WHITE, stroke_width=3, fill_color=BLACK, fill_opacity=1)
    g.add(oeil)
    return g.scale(echelle)


def ile_vue_dessus(echelle=1.0):
    """La Réunion vue du ciel : une petite tache (ovale) verte."""
    forme = Ellipse(width=1.5, height=1.15, color=VERT_OK, fill_color=GREEN, fill_opacity=0.9, stroke_width=2)
    return forme.scale(echelle)


def thermometre(temp_ratio=0.8):
    """Un thermomètre simple ; temp_ratio = niveau de rouge (0 à 1)."""
    tube = RoundedRectangle(width=0.34, height=2.4, corner_radius=0.17, color=WHITE, stroke_width=3)
    boule = Circle(radius=0.34, color=WHITE, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=3).move_to(tube.get_bottom())
    h = 1.9 * temp_ratio
    merc = Rectangle(width=0.16, height=h, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0)
    merc.move_to(boule.get_center() + UP * (h / 2))
    return VGroup(tube, merc, boule)


class CycloneBase(Scene):
    """Helpers communs (mêmes que lait_reunion / circulation_eau)."""

    LARGEUR_SURE = 12.8  # 16:9 ; le Short redéfinit

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def T(self, texte, size=28, color=WHITE, **kw):
        t = Text(texte, font_size=size, color=color, **kw)
        if t.width > self.LARGEUR_SURE:
            t.scale_to_fit_width(self.LARGEUR_SURE)
        return t

    def titre_ecran(self, texte):
        t = self.T(texte, size=38, color=JAUNE_TITRE).to_edge(UP)
        if not hasattr(self, "_tt"):
            self._tt = 0
        anim = [Write(t), FadeIn(t, shift=0.3 * DOWN), GrowFromCenter(t)][self._tt % 3]
        self._tt += 1
        self.play(anim)
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

    def legende_mobile(self, places=None):
        state = {"m": None, "k": 0}
        if places is None:
            places = [(-3.4, 2.6), (3.2, 1.9), (0, 2.9), (-3.3, 0.9), (3.3, -1.4), (0, -2.9)]

        def dire(texte, size=26, couleur=BLEU_CALCUL, mode=None, pos=None):
            x, y = pos if pos is not None else places[state["k"] % len(places)]
            t = self.T(texte, size=size, color=couleur).move_to([x, y, 0])
            if t.width > self.LARGEUR_SURE - 1.0:
                t.scale_to_fit_width(self.LARGEUR_SURE - 1.0).move_to([0, y, 0])
            entree = self.anim_entree(t, mode=mode)
            if state["m"] is None:
                self.play(entree)
            else:
                self.play(FadeOut(state["m"], shift=0.2 * DOWN), entree)
            state["m"] = t
            state["k"] += 1
            return t

        return dire, state


# ════════════════════════════════════════════════════════════════════════════════
#  SCÈNE 16:9 — la vidéo YouTube complète
# ════════════════════════════════════════════════════════════════════════════════

class CycloneReunion974(CycloneBase):

    # ── écran 0 : accueil ───────────────────────────────────────────────────
    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = self.T("Un cyclone, c'est quoi ?", size=44, color=JAUNE_TITRE).to_edge(UP)
        sous = self.T("Les maths en vrai · La Réunion — EleveAI", size=30).next_to(titre, DOWN, buff=0.35)

        cyc = cyclone(1.5).move_to([-2.4, -0.8, 0])
        ile = ile_vue_dessus(0.7).move_to([2.6, -1.3, 0])
        ilab = self.T("La Réunion", size=22, color=VERT_OK).next_to(ile, DOWN, buff=0.15)
        accroche = self.T("Chaque été, La Réunion est dans le couloir des cyclones.",
                          size=30, color=BLEU_CALCUL).move_to([0, 1.2, 0])

        self.play(GrowFromCenter(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(FadeIn(cyc, scale=0.5), FadeIn(ile, shift=0.3 * UP), FadeIn(ilab, shift=0.2 * UP))
        self.play(Rotate(cyc, -TAU, run_time=2.5, rate_func=linear), FadeIn(accroche, scale=0.5))
        self.wait(1.8)

    # ── écran 1 : l'océan chaud, le carburant ───────────────────────────────
    def ecran_ocean(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. L'océan chaud, le carburant")

        ocean = Rectangle(width=12.6, height=1.6, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                          fill_opacity=0.55, stroke_width=0).move_to([0, -2.6, 0])
        thermo = thermometre(0.85).move_to([-4.6, 0.3, 0])
        tlab = self.T("plus de 26 °C", size=26, color=ROUGE_ERREUR).next_to(thermo, RIGHT, buff=0.35)
        self.play(GrowFromEdge(ocean, DOWN), FadeIn(thermo, shift=0.3 * UP))
        self.play(self.anim_entree(tlab, mode="slide_r"))

        # la vapeur qui monte de l'océan chaud
        vap = VGroup(*[Circle(radius=0.06, color=WHITE, fill_color=WHITE, fill_opacity=0.8, stroke_width=0)
                       .move_to([-1 + i * 1.0, -1.8, 0]) for i in range(6)])
        l1 = self.T("En été (novembre → avril), l'océan dépasse 26 °C.", size=27).move_to([1.2, 1.4, 0])
        l2 = self.T("Cette chaleur donne toute son énergie au cyclone.", size=27, color=BLEU_CALCUL).move_to([1.0, 0.4, 0])
        self.play(self.anim_entree(l1, mode="fade_down"))
        self.play(LaggedStart(*[Succession(FadeIn(g, scale=0.4), g.animate.shift(UP * 2.2).set_opacity(0.1))
                                for g in vap], lag_ratio=0.15), run_time=2.4)
        self.play(self.anim_entree(l2, mode="grow"))
        self.wait(2.0)

    # ── écran 2 : la spirale géante ─────────────────────────────────────────
    def ecran_spirale(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Une spirale géante qui tourne")

        cyc = cyclone(2.0).move_to([-2.8, -0.4, 0])
        self.play(FadeIn(cyc, scale=0.4))
        self.play(Rotate(cyc, -1.5 * TAU, run_time=3.0, rate_func=linear))

        # on montre l'œil
        fleche = Arrow([1.2, -0.4, 0], cyc[-1].get_center() + [0.4, 0, 0], color=WHITE, stroke_width=4, buff=0.2)
        oeil_lab = self.T("l'œil : le centre calme", size=26, color=VERT_OK).move_to([3.4, -0.4, 0])
        if oeil_lab.width > 5.4:
            oeil_lab.scale_to_fit_width(5.4).move_to([3.4, -0.4, 0])
        l1 = self.T("L'air tourne autour d'un centre calme : l'œil.", size=27).move_to([1.6, 2.4, 0])
        l2 = self.T("Les vents les plus forts soufflent juste autour.", size=27, color=BLEU_CALCUL).move_to([1.6, 1.5, 0])
        self.play(self.anim_entree(l1, mode="slide_r"))
        self.play(GrowArrow(fleche), self.anim_entree(oeil_lab, mode="pop"))
        self.play(self.anim_entree(l2, mode="fade_up"), Rotate(cyc, -0.6 * TAU, run_time=1.6, rate_func=linear))
        self.wait(1.8)

    # ── écran 3 : l'échelle des vents ───────────────────────────────────────
    def ecran_echelle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. On les classe par la vitesse du vent")

        zones = [
            ("Tempête", "dès 60", VERT_OK),
            ("Cyclone", "dès 118", JAUNE_TITRE),
            ("Intense", "dès 166", ORANGE_RETENUE),
            ("Très intense", "plus de 212", ROUGE_ERREUR),
        ]
        largeur = 2.7
        barre = VGroup()
        for i, (nom, seuil, col) in enumerate(zones):
            case = Rectangle(width=largeur, height=1.0, fill_color=col, fill_opacity=0.85, stroke_color=WHITE, stroke_width=2)
            nomt = self.T(nom, size=24, color=WHITE).move_to(case.get_center() + UP * 0.18)
            seuilt = self.T(f"{seuil} km/h", size=20, color=WHITE).move_to(case.get_center() + DOWN * 0.22)
            barre.add(VGroup(case, nomt, seuilt))
        barre.arrange(RIGHT, buff=0.06).move_to([0, -0.4, 0])

        cons = self.T("Plus le vent est rapide, plus le cyclone est dangereux.", size=27, color=BLEU_CALCUL).move_to([0, 2.2, 0])
        self.play(self.anim_entree(cons, mode="fade_down"))
        for bloc in barre:
            self.play(GrowFromEdge(bloc, LEFT), run_time=0.5)

        note = self.T("Une échelle : on lit la catégorie selon les km/h.", size=25).move_to([0, -2.3, 0])
        self.play(self.anim_entree(note, mode="grow"), Indicate(barre[3], color=ROUGE_ERREUR, scale_factor=1.1))
        self.wait(2.0)

    # ── écran 4 : le record du monde ────────────────────────────────────────
    def ecran_record(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Un record du monde... à La Réunion !")

        l1 = self.T("En 2007, le cyclone Gamède frappe l'île.", size=27).move_to([0, 2.2, 0])
        self.play(self.anim_entree(l1, mode="slide_l"))

        # la colonne d'eau : 1 692 mm en 24 h
        colonne = Rectangle(width=1.4, height=3.2, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                            fill_opacity=0.55, stroke_color=WHITE, stroke_width=2).move_to([-3.8, -0.6, 0])
        gros = self.T("1 692 mm", size=40, color=BLEU_CALCUL).next_to(colonne, UP, buff=0.25)
        dur = self.T("en 24 h", size=26, color=WHITE).next_to(colonne, DOWN, buff=0.2)
        self.play(GrowFromEdge(colonne, DOWN, run_time=1.4), self.anim_entree(gros, mode="fade_down"))
        self.play(self.anim_entree(dur, mode="fade_up"))

        l2 = self.T("À Commerson : presque 1,7 m d'eau", size=28, color=VERT_OK).move_to([2.2, 0.4, 0])
        l3 = self.T("tombée en UN seul jour.", size=28, color=VERT_OK).move_to([2.2, -0.5, 0])
        l4 = self.T("C'est le RECORD DU MONDE !", size=30, color=JAUNE_TITRE).move_to([2.2, -1.7, 0])
        self.play(self.anim_entree(l2, mode="slide_r"))
        self.play(self.anim_entree(l3, mode="fade_up"))
        self.play(self.anim_entree(l4, mode="grow"), Flash(l4, color=JAUNE_TITRE))
        self.wait(2.2)

    # ── écran 5 : défi ──────────────────────────────────────────────────────
    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = self.T("Défi", size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        # le cyclone à gauche, l'île à droite, la distance entre les deux
        cyc = cyclone(0.85).move_to([-4.3, 0.6, 0])
        ile = ile_vue_dessus(0.8).move_to([4.4, 0.6, 0])
        ilab = self.T("La Réunion", size=22, color=VERT_OK).next_to(ile, DOWN, buff=0.15)
        self.play(FadeIn(cyc, scale=0.5), FadeIn(ile, shift=0.3 * LEFT), FadeIn(ilab, shift=0.2 * UP))
        self.play(Rotate(cyc, -TAU, run_time=1.6, rate_func=linear))

        fleche = DoubleArrow([-3.3, 0.6, 0], [3.4, 0.6, 0], color=WHITE, stroke_width=3, buff=0.1)
        dist = self.T("900 km", size=28, color=WHITE).next_to(fleche, UP, buff=0.15)
        vit = self.T("il avance à 15 km/h", size=26, color=ORANGE_RETENUE).move_to([-4.3, -0.7, 0])
        self.play(GrowFromCenter(fleche), self.anim_entree(dist, mode="fade_down"))
        self.play(self.anim_entree(vit, mode="fade_up"))

        q = self.T("Dans combien de temps touche-t-il l'île ?", size=30, color=WHITE).move_to([0, -2.2, 0])
        self.play(self.anim_entree(q, mode="grow"))
        pause = self.T("Mets pause : il y a DEUX étapes !", size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.3)
        self.play(GrowFromCenter(pause))
        self.wait(4.5)

    # ── écran 6 : correction (2 étapes) ─────────────────────────────────────
    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = self.T("Étape 1 — le temps de trajet (distance ÷ vitesse)", size=27, color=BLEU_CALCUL).move_to([0, 2.3, 0])
        self.play(self.anim_entree(e1, mode="slide_l"))
        c1 = self.T("900 km ÷ 15 km/h = 60 heures", size=36, color=VERT_OK).move_to([0, 1.4, 0])
        self.play(self.anim_entree(c1, mode="grow"))
        self.play(Circumscribe(c1, color=VERT_OK))

        e2 = self.T("Étape 2 — on convertit en jours", size=27, color=ORANGE_RETENUE).move_to([0, 0.3, 0])
        self.play(self.anim_entree(e2, mode="slide_r"))
        conv = self.T("1 jour = 24 heures", size=28).move_to([0, -0.5, 0])
        self.play(self.anim_entree(conv, mode="pop"))
        c2 = self.T("60 ÷ 24 = 2,5 jours", size=36, color=VERT_OK).move_to([0, -1.4, 0])
        self.play(self.anim_entree(c2, mode="fade_up"))
        self.play(Flash(c2, color=VERT_OK))

        concl = self.T("→ Le cyclone arrive dans 2 jours et demi.", size=30, color=JAUNE_TITRE).to_edge(DOWN, buff=0.5)
        self.play(GrowFromCenter(concl))
        self.wait(2.8)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────
    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = self.T("À retenir", size=46, color=JAUNE_TITRE).to_edge(UP)
        points = VGroup(
            self.T("1. L'océan chaud (plus de 26 °C) donne l'énergie au cyclone.", size=26),
            self.T("2. Un cyclone est une spirale géante autour d'un œil calme.", size=26),
            self.T("3. On les classe par la vitesse du vent (km/h).", size=26),
            self.T("4. La Réunion détient le record du monde de pluie (Gamède, 2007).", size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([-0.2, 0.2, 0])
        signature = self.T(SIGNATURE, size=26, color=VERT_OK).to_edge(DOWN)
        self.play(GrowFromCenter(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=0.4 * RIGHT) for p in points], lag_ratio=0.35))
        self.play(FadeIn(signature, shift=0.3 * UP), Flash(signature, color=VERT_OK))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_ocean()
        self.ecran_spirale()
        self.ecran_echelle()
        self.ecran_record()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ════════════════════════════════════════════════════════════════════════════════
#  SCÈNE 9:16 — le Short, rendre avec -r 1080,1920
# ════════════════════════════════════════════════════════════════════════════════

class CycloneReunion974Short(CycloneBase):

    LARGEUR_SURE = 4.1

    def __init__(self, **kwargs):
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(**kwargs)

    def ecran_hook(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        badge = self.T("LA RÉUNION", size=26, color=JAUNE_TITRE).move_to([0, 3.4, 0])
        t1 = self.T("Le RECORD", size=36).move_to([0, 2.5, 0])
        t2 = self.T("DU MONDE", size=40, color=BLEU_CALCUL).next_to(t1, DOWN, buff=0.2)
        t3 = self.T("de pluie en 24 h.", size=30).next_to(t2, DOWN, buff=0.25)

        cyc = cyclone(1.4).move_to([0, -0.9, 0])
        self.play(Write(badge))
        self.play(self.anim_entree(t1, mode="slide_l"), self.anim_entree(t2, mode="slide_r"))
        self.play(self.anim_entree(t3, mode="fade_up"))
        self.play(FadeIn(cyc, scale=0.4))
        self.play(Rotate(cyc, -TAU, run_time=2.0, rate_func=linear))
        self.wait(1.4)

    def ecran_record(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        l1 = self.T("Cyclone Gamède, 2007 :", size=26, color=JAUNE_TITRE).move_to([0, 3.3, 0])
        self.play(self.anim_entree(l1, mode="fade_down"))

        colonne = Rectangle(width=1.5, height=3.0, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                            fill_opacity=0.55, stroke_color=WHITE, stroke_width=2).move_to([0, -0.1, 0])
        gros = self.T("1 692 mm", size=34, color=BLEU_CALCUL).move_to([0, 1.9, 0])
        self.play(GrowFromEdge(colonne, DOWN, run_time=1.4), self.anim_entree(gros, mode="pop"))
        l2 = self.T("en UN seul jour !", size=28, color=VERT_OK).move_to([0, -2.4, 0])
        l3 = self.T("Presque 1,7 m d'eau.", size=26).move_to([0, -3.1, 0])
        self.play(self.anim_entree(l2, mode="grow"), Flash(gros, color=BLEU_CALCUL))
        self.play(self.anim_entree(l3, mode="fade_up"))
        self.wait(1.8)

    def ecran_spirale(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        l1 = self.T("Un cyclone,", size=30, color=JAUNE_TITRE).move_to([0, 3.3, 0])
        l2 = self.T("c'est une spirale géante", size=26, color=BLEU_CALCUL).next_to(l1, DOWN, buff=0.18)
        l3 = self.T("autour d'un œil calme.", size=26, color=BLEU_CALCUL).next_to(l2, DOWN, buff=0.15)
        self.play(self.anim_entree(l1, mode="fade_down"))
        self.play(self.anim_entree(l2, mode="slide_l"), self.anim_entree(l3, mode="slide_r"))

        cyc = cyclone(1.5).move_to([0, -1.2, 0])
        self.play(FadeIn(cyc, scale=0.4))
        self.play(Rotate(cyc, -1.6 * TAU, run_time=3.0, rate_func=linear))
        self.wait(1.4)

    def ecran_cta(self):
        self.clear()
        m = MascotteMargouillat().scale(0.9).move_to([0, -1.4, 0])
        self.add(m)
        t1 = self.T("La Réunion en vrai,", size=28).move_to([0, 2.6, 0])
        t2 = self.T("expliquée en vidéo :", size=28).next_to(t1, DOWN, buff=0.2)
        url = self.T("eleveai.fr", size=44, color=VERT_OK).next_to(t2, DOWN, buff=0.5)
        sig = self.T(SIGNATURE, size=20, color=VERT_OK).move_to([0, -3.4, 0])
        self.play(self.anim_entree(t1, mode="slide_l"), self.anim_entree(t2, mode="slide_r"))
        self.play(GrowFromCenter(url), Flash(url, color=VERT_OK))
        self.play(FadeIn(sig, shift=0.2 * UP))
        self.wait(2.2)

    def construct(self):
        self.ecran_hook()
        self.ecran_record()
        self.ecran_spirale()
        self.ecran_cta()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo 16:9 muette) ──
# [Accueil ~0:00]    « Un cyclone, c'est quoi ? Chaque été, La Réunion est dans le
#                      couloir des cyclones. »
# [Écran 1 ~0:10]    « Tout part de l'océan. En été, de novembre à avril, l'eau
#                      dépasse 26 degrés. Cette chaleur donne toute son énergie au
#                      cyclone. »
# [Écran 2 ~0:28]    « Un cyclone, c'est une spirale géante qui tourne. Au centre, un
#                      endroit calme : l'œil. Les vents les plus forts sont juste
#                      autour. »
# [Écran 3 ~0:45]    « On classe les cyclones par la vitesse du vent, en kilomètres
#                      par heure : tempête, cyclone, intense, très intense. »
# [Écran 4 ~1:00]    « Et le record du monde de pluie en 24 heures ? Il est ICI : en
#                      2007, le cyclone Gamède a fait tomber mille six cent quatre-
#                      vingt-douze millimètres à Commerson. Presque 1 mètre 70 d'eau
#                      en un jour ! »
# [Défi ~1:20]       « À toi ! Un cyclone est à 900 km, il avance à 15 km/h. Dans
#                      combien de temps touche-t-il l'île ? Mets pause ! »
# [Correction ~1:35] « 900 divisé par 15 : 60 heures. Puis 60 divisé par 24 : deux
#                      jours et demi. Le cyclone arrive dans deux jours et demi. »
# [À retenir ~1:50]  « On retient : l'océan chaud donne l'énergie ; le cyclone est une
#                      spirale autour d'un œil ; on les classe par la vitesse du vent ;
#                      et La Réunion a le record du monde de pluie. À bientôt ! »
