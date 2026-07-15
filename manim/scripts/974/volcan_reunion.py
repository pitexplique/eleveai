# volcan_reunion.py
# EleveAI — « Les maths en vrai · La Réunion » — Le Piton de la Fournaise
#
# Épisode 4 de la série « en vrai 974 » (voir manim/REGLES.md, section « Les maths
# en vrai »). Jumeau de cyclone_reunion.py / lait_reunion.py / circulation_eau.py :
# format simulation animée, HORS banques. Standard d'effets = animations variées
# (anim_entree) + légendes distribuées (legende_mobile) + vrai défi à 2 étapes.
#
# Maths mobilisées : fréquence/moyenne (éruptions), grands nombres (température),
# et le défi = vitesse d'une coulée + conversion km→m puis division (distance/vitesse).
#
# Deux scènes :
# - VolcanReunion974      → 16:9 YouTube (~1 min 30)
# - VolcanReunion974Short → 9:16 Shorts/Instagram (~40 s), rendre avec -r 1080,1920
#
# Rendu brouillon :
#   python -m manim render -ql manim/scripts/974/volcan_reunion.py VolcanReunion974 --media_dir manim/scripts/974/media
#   python -m manim render -ql -r 480,854 manim/scripts/974/volcan_reunion.py VolcanReunion974Short --media_dir manim/scripts/974/media
# Rendu final :
#   python -m manim render -qh manim/scripts/974/volcan_reunion.py VolcanReunion974 -o eleveai-maths-974-volcan-reunion --media_dir manim/scripts/974/media
#   python -m manim render -qh -r 1080,1920 manim/scripts/974/volcan_reunion.py VolcanReunion974Short -o eleveai-maths-974-volcan-reunion-short --media_dir manim/scripts/974/media
#
# Repères réels (ordres de grandeur, arrondis pour l'élève) :
# - Piton de la Fournaise : 2 632 m, un des volcans les plus ACTIFS du monde (~1 éruption/an, souvent plus)
# - Lave : environ 1 100 °C
# - Le volcan FABRIQUE de la terre neuve : la lave qui atteint la mer agrandit l'île (ex. 2007)
# - Défi : une coulée à 500 m/h, la côte à 3 km → 3 000 m ÷ 500 = 6 heures

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat

ROCHE = ManimColor("#3d2b24")   # roche volcanique (décor, non sémantique)
LAVE = ManimColor("#FF6A00")    # lave incandescente (orange-rouge vif)


# ── décor partagé ──────────────────────────────────────────────────────────────

def volcan(echelle=1.0):
    """Un cône de volcan tronqué (cratère plat en haut)."""
    cone = Polygon([-2.6, -1.7, 0], [-0.75, 1.1, 0], [0.75, 1.1, 0], [2.6, -1.7, 0],
                   fill_color=ROCHE, fill_opacity=1, stroke_color=GREY_B, stroke_width=3)
    return cone.scale(echelle)


def fontaine_lave(sommet, hauteur=1.3, n=9):
    """Une gerbe de lave qui jaillit du cratère (lignes + gouttes)."""
    g = VGroup()
    xs = np.linspace(-0.45, 0.45, n)
    for i, dx in enumerate(xs):
        h = hauteur * (0.55 + 0.45 * (1 - abs(dx) / 0.5))
        col = ROUGE_ERREUR if i % 2 else LAVE
        jet = Line(sommet + [dx, 0, 0], sommet + [dx * 1.6, h, 0], color=col, stroke_width=5)
        g.add(jet)
    for dx, dy in [(-0.3, 1.0), (0.25, 1.15), (0.0, 1.3), (0.4, 0.9), (-0.15, 1.2)]:
        g.add(Dot(sommet + [dx, dy, 0], radius=0.06, color=JAUNE_TITRE))
    return g


class VolcanBase(Scene):
    """Helpers communs (mêmes que cyclone / lait / eau)."""

    LARGEUR_SURE = 12.8

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
            # anti-débordement : on ramène la légende dans le cadre si sa place la sort.
            half = self.LARGEUR_SURE / 2 - 0.25
            if t.get_right()[0] > half:
                t.shift(LEFT * (t.get_right()[0] - half))
            if t.get_left()[0] < -half:
                t.shift(RIGHT * (-half - t.get_left()[0]))
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

class VolcanReunion974(VolcanBase):

    # ── écran 0 : accueil ───────────────────────────────────────────────────
    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = self.T("Le Piton de la Fournaise", size=44, color=JAUNE_TITRE).to_edge(UP)
        sous = self.T("Les maths en vrai · La Réunion — EleveAI", size=30).next_to(titre, DOWN, buff=0.35)

        v = volcan(1.0).move_to([-3.0, -1.2, 0])
        sommet = np.array([-3.0, -0.1, 0])
        gerbe = fontaine_lave(sommet, hauteur=1.4)
        # accroche à DROITE de la gerbe (sinon son bord gauche percute la lave).
        accroche = self.T("Un des volcans les plus", size=30, color=LAVE).move_to([2.4, 0.9, 0])
        accroche2 = self.T("actifs du monde... chez nous !", size=30, color=LAVE).next_to(accroche, DOWN, buff=0.2)

        self.play(GrowFromCenter(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(FadeIn(v, shift=0.3 * UP))
        self.play(LaggedStart(*[GrowFromEdge(j, DOWN) for j in gerbe], lag_ratio=0.05), run_time=1.4)
        self.play(FadeIn(accroche, scale=0.5), FadeIn(accroche2, shift=0.2 * UP))
        self.wait(2.0)

    # ── écran 1 : un volcan très actif ──────────────────────────────────────
    def ecran_actif(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Un géant qui se réveille souvent")

        v = volcan(0.9).move_to([-3.6, -1.4, 0])
        self.play(FadeIn(v, shift=0.3 * UP))
        gerbe = fontaine_lave(np.array([-3.6, -0.4, 0]), hauteur=1.1)
        self.play(LaggedStart(*[GrowFromEdge(j, DOWN) for j in gerbe], lag_ratio=0.05), run_time=1.0)

        l1 = self.T("Il culmine à 2 632 m d'altitude.", size=27).move_to([1.6, 1.9, 0])
        l2 = self.T("Il entre en éruption presque chaque année :", size=27, color=LAVE).move_to([1.4, 0.9, 0])
        l3 = self.T("un des volcans les plus actifs de la planète.", size=27, color=LAVE).move_to([1.4, 0.1, 0])
        self.play(self.anim_entree(l1, mode="slide_r"))
        self.play(self.anim_entree(l2, mode="fade_up"))
        self.play(self.anim_entree(l3, mode="fade_up"))
        self.wait(2.0)

    # ── écran 2 : comment ça marche ─────────────────────────────────────────
    def ecran_mecanisme(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Le magma monte, puis jaillit")
        dire, _ = self.legende_mobile(places=[(-3.6, 2.5), (3.4, 2.5), (-3.6, 1.5), (3.4, 1.5)])

        # sol + chambre magmatique + cheminée
        v = volcan(1.1).move_to([0, -0.3, 0])
        self.play(FadeIn(v))
        chambre = Ellipse(width=2.4, height=1.0, color=ROUGE_ERREUR, fill_color=ROUGE_ERREUR,
                          fill_opacity=0.7, stroke_width=0).move_to([0, -2.6, 0])
        clab = self.T("chambre magmatique", size=20, color=ROUGE_ERREUR).next_to(chambre, DOWN, buff=0.12)
        cheminee = Line([0, -2.3, 0], [0, 0.9, 0], color=LAVE, stroke_width=8)
        self.play(FadeIn(chambre, scale=0.6), FadeIn(clab, shift=0.2 * DOWN))
        dire("Sous terre : une poche de roche fondue, le magma.", couleur=ROUGE_ERREUR, mode="slide_l")

        # le magma monte dans la cheminée
        dire("La pression le pousse vers le haut par la cheminée.", mode="slide_r")
        self.play(Create(cheminee), run_time=1.2)
        gouttes = VGroup(*[Dot([0, -2.2, 0], radius=0.09, color=LAVE) for _ in range(4)])
        chemin = Line([0, -2.2, 0], [0, 0.9, 0])
        self.play(LaggedStart(*[MoveAlongPath(g, chemin) for g in gouttes], lag_ratio=0.2), run_time=2.0)
        self.play(FadeOut(gouttes))

        # éruption au sommet
        gerbe = fontaine_lave(np.array([0, 0.9, 0]), hauteur=1.3)
        dire("En haut, c'est l'éruption : le magma devient LAVE.", couleur=LAVE, mode="grow")
        self.play(LaggedStart(*[GrowFromEdge(j, DOWN) for j in gerbe], lag_ratio=0.05), run_time=1.2)
        self.wait(1.8)

    # ── écran 3 : la lave brûlante ──────────────────────────────────────────
    def ecran_lave(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. La lave : environ 1 100 °C")

        # une grande barre de température comparée
        l1 = self.T("La lave sort à environ 1 100 °C.", size=28, color=LAVE).move_to([0, 2.2, 0])
        self.play(self.anim_entree(l1, mode="fade_down"))

        reperes = [("eau qui bout", 100, BLEU_CALCUL), ("four à pain", 250, JAUNE_TITRE), ("la LAVE", 1100, LAVE)]
        base_y = -2.4
        barres = VGroup()
        for i, (nom, temp, col) in enumerate(reperes):
            h = 3.6 * temp / 1100
            barre = Rectangle(width=1.5, height=h, fill_color=col, fill_opacity=0.9, stroke_color=WHITE, stroke_width=1)
            barre.move_to([-3.4 + i * 3.4, base_y + h / 2, 0])
            nomt = self.T(nom, size=22, color=col).next_to(barre, UP, buff=0.15)
            tempt = self.T(f"{temp} °C", size=22).next_to(barre, DOWN, buff=0.15)
            barres.add(VGroup(barre, nomt, tempt))
        for bloc in barres:
            self.play(GrowFromEdge(bloc[0], DOWN), FadeIn(bloc[1], shift=0.2 * UP), FadeIn(bloc[2], shift=0.2 * DOWN), run_time=0.7)

        note = self.T("11 fois plus chaud que l'eau qui bout !", size=26, color=JAUNE_TITRE).move_to([3.0, 1.4, 0])
        if note.width > 5.4:
            note.scale_to_fit_width(5.4).move_to([3.0, 1.4, 0])
        self.play(self.anim_entree(note, mode="grow"), Indicate(barres[2][0], color=LAVE, scale_factor=1.08))
        self.wait(2.0)

    # ── écran 4 : le volcan fabrique l'île ──────────────────────────────────
    def ecran_ile(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Le volcan fabrique de la terre neuve")

        # une pente + la mer ; la lave descend et solidifie en nouvelle terre
        pente = Polygon([-6.4, 1.6, 0], [1.0, -1.8, 0], [-6.4, -1.8, 0],
                        fill_color=ROCHE, fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
        mer = Rectangle(width=7.0, height=1.2, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                        fill_opacity=0.5, stroke_width=0).move_to([3.0, -2.4, 0])
        merlab = self.T("la mer", size=22, color=BLEU_CALCUL).move_to([4.6, -2.4, 0])
        self.play(FadeIn(pente, shift=0.2 * UP), FadeIn(mer), FadeIn(merlab))

        l1 = self.T("La lave coule jusqu'à la mer...", size=27, color=LAVE).move_to([0, 2.3, 0])
        self.play(self.anim_entree(l1, mode="slide_l"))

        coulee = VMobject(stroke_color=LAVE, stroke_width=12)
        coulee.set_points_as_corners([[-5.4, 1.2, 0], [-3.0, 0.0, 0], [-1.0, -1.2, 0], [0.9, -1.9, 0]])
        self.play(Create(coulee), run_time=2.0)

        # nouvelle terre à la côte
        neuf = Polygon([0.9, -1.9, 0], [2.2, -2.0, 0], [1.6, -2.7, 0], [0.7, -2.6, 0],
                       fill_color=ROCHE, fill_opacity=1, stroke_color=VERT_OK, stroke_width=3)
        l2 = self.T("...elle refroidit, durcit,", size=27, color=VERT_OK).move_to([2.6, 0.9, 0])
        l3 = self.T("et AGRANDIT l'île !", size=28, color=VERT_OK).move_to([2.6, 0.0, 0])
        self.play(FadeIn(neuf, scale=0.5), self.anim_entree(l2, mode="fade_up"))
        self.play(self.anim_entree(l3, mode="grow"), Flash(neuf, color=VERT_OK))
        self.wait(2.0)

    # ── écran 5 : défi ──────────────────────────────────────────────────────
    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = self.T("Défi", size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        # le volcan à gauche, la mer à droite, la coulée entre les deux
        v = volcan(0.7).move_to([-4.6, 0.6, 0])
        mer = Rectangle(width=2.2, height=1.0, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                        fill_opacity=0.5, stroke_width=0).move_to([4.6, 0.3, 0])
        merlab = self.T("la mer", size=22, color=BLEU_CALCUL).next_to(mer, DOWN, buff=0.15)
        self.play(FadeIn(v, shift=0.3 * UP), FadeIn(mer), FadeIn(merlab, shift=0.2 * UP))

        fleche = DoubleArrow([-3.4, 0.4, 0], [3.4, 0.4, 0], color=WHITE, stroke_width=3, buff=0.1)
        dist = self.T("3 km", size=28, color=WHITE).next_to(fleche, UP, buff=0.15)
        vit = self.T("la coulée avance à 500 m/h", size=26, color=LAVE).move_to([-3.4, -0.8, 0])
        if vit.width > 6.0:
            vit.scale_to_fit_width(6.0).move_to([-3.4, -0.8, 0])
        self.play(GrowFromCenter(fleche), self.anim_entree(dist, mode="fade_down"))
        self.play(self.anim_entree(vit, mode="fade_up"))

        q = self.T("En combien de temps la lave atteint-elle la mer ?", size=30, color=WHITE).move_to([0, -2.2, 0])
        self.play(self.anim_entree(q, mode="grow"))
        pause = self.T("Mets pause : il y a DEUX étapes !", size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.3)
        self.play(GrowFromCenter(pause))
        self.wait(4.5)

    # ── écran 6 : correction (2 étapes) ─────────────────────────────────────
    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = self.T("Étape 1 — on convertit en mètres", size=27, color=BLEU_CALCUL).move_to([0, 2.3, 0])
        self.play(self.anim_entree(e1, mode="slide_l"))
        c1 = self.T("3 km = 3 000 m", size=36, color=VERT_OK).move_to([0, 1.4, 0])
        self.play(self.anim_entree(c1, mode="pop"))

        e2 = self.T("Étape 2 — le temps = distance ÷ vitesse", size=27, color=ORANGE_RETENUE).move_to([0, 0.4, 0])
        self.play(self.anim_entree(e2, mode="slide_r"))
        c2 = self.T("3 000 m ÷ 500 m/h = 6 heures", size=36, color=VERT_OK).move_to([0, -0.6, 0])
        self.play(self.anim_entree(c2, mode="grow"))
        self.play(Flash(c2, color=VERT_OK))

        concl = self.T("→ La lave atteint la mer en 6 heures.", size=30, color=JAUNE_TITRE).to_edge(DOWN, buff=0.6)
        self.play(GrowFromCenter(concl))
        self.wait(2.8)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────
    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = self.T("À retenir", size=46, color=JAUNE_TITRE).to_edge(UP)
        points = VGroup(
            self.T("1. Le Piton de la Fournaise (2 632 m) : très actif, presque chaque année.", size=25),
            self.T("2. Le magma monte de la chambre, jaillit au sommet : c'est la lave.", size=25),
            self.T("3. La lave sort à environ 1 100 °C (11 fois l'eau bouillante).", size=25),
            self.T("4. En atteignant la mer, la lave durcit et agrandit l'île.", size=25),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([-0.2, 0.2, 0])
        signature = self.T(SIGNATURE, size=26, color=VERT_OK).to_edge(DOWN)
        self.play(GrowFromCenter(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=0.4 * RIGHT) for p in points], lag_ratio=0.35))
        self.play(FadeIn(signature, shift=0.3 * UP), Flash(signature, color=VERT_OK))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_actif()
        self.ecran_mecanisme()
        self.ecran_lave()
        self.ecran_ile()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ════════════════════════════════════════════════════════════════════════════════
#  SCÈNE 9:16 — le Short, rendre avec -r 1080,1920
# ════════════════════════════════════════════════════════════════════════════════

class VolcanReunion974Short(VolcanBase):

    LARGEUR_SURE = 4.1

    def __init__(self, **kwargs):
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(**kwargs)

    def ecran_hook(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        badge = self.T("LA RÉUNION", size=26, color=JAUNE_TITRE).move_to([0, 3.4, 0])
        t1 = self.T("Un volcan qui", size=32).move_to([0, 2.5, 0])
        t2 = self.T("FABRIQUE", size=42, color=LAVE).next_to(t1, DOWN, buff=0.2)
        t3 = self.T("l'île.", size=32).next_to(t2, DOWN, buff=0.2)

        v = volcan(0.8).move_to([0, -1.2, 0])
        self.play(Write(badge))
        self.play(self.anim_entree(t1, mode="slide_l"), self.anim_entree(t2, mode="grow"))
        self.play(self.anim_entree(t3, mode="fade_up"))
        self.play(FadeIn(v, shift=0.3 * UP))
        gerbe = fontaine_lave(np.array([0, -0.2, 0]), hauteur=1.0)
        self.play(LaggedStart(*[GrowFromEdge(j, DOWN) for j in gerbe], lag_ratio=0.05), run_time=1.2)
        self.wait(1.4)

    def ecran_lave(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        l1 = self.T("La lave sort à", size=28).move_to([0, 3.3, 0])
        l2 = self.T("1 100 °C", size=44, color=LAVE).next_to(l1, DOWN, buff=0.2)
        self.play(self.anim_entree(l1, mode="fade_down"))
        self.play(GrowFromCenter(l2), Flash(l2, color=LAVE))

        barre_eau = Rectangle(width=1.0, height=0.6, fill_color=BLEU_CALCUL, fill_opacity=0.9, stroke_width=1).move_to([-1.0, -0.6, 0])
        barre_lave = Rectangle(width=1.0, height=3.0, fill_color=LAVE, fill_opacity=0.9, stroke_width=1).move_to([1.0, 0.6, 0])
        eaul = self.T("eau qui bout\n100 °C", size=20, line_spacing=0.9).next_to(barre_eau, DOWN, buff=0.15)
        lavel = self.T("la lave", size=20, color=LAVE).next_to(barre_lave, UP, buff=0.15)
        self.play(GrowFromEdge(barre_eau, DOWN), FadeIn(eaul, shift=0.2 * DOWN))
        self.play(GrowFromEdge(barre_lave, DOWN), FadeIn(lavel, shift=0.2 * UP))
        l3 = self.T("11 fois plus chaud !", size=26, color=JAUNE_TITRE).move_to([0, -2.9, 0])
        self.play(self.anim_entree(l3, mode="grow"))
        self.wait(1.6)

    def ecran_ile(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        l1 = self.T("En touchant la mer,", size=28, color=JAUNE_TITRE).move_to([0, 3.3, 0])
        l2 = self.T("la lave durcit...", size=26).next_to(l1, DOWN, buff=0.18)
        self.play(self.anim_entree(l1, mode="fade_down"))
        self.play(self.anim_entree(l2, mode="slide_l"))

        pente = Polygon([-2.2, 1.2, 0], [0.6, -0.8, 0], [-2.2, -0.8, 0],
                        fill_color=ROCHE, fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
        mer = Rectangle(width=4.4, height=1.0, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                        fill_opacity=0.5, stroke_width=0).move_to([0, -1.6, 0])
        self.play(FadeIn(pente), FadeIn(mer))
        coulee = VMobject(stroke_color=LAVE, stroke_width=10)
        coulee.set_points_as_corners([[-1.7, 0.9, 0], [-0.6, -0.2, 0], [0.5, -0.85, 0]])
        self.play(Create(coulee), run_time=1.6)
        neuf = Polygon([0.5, -0.85, 0], [1.4, -0.9, 0], [1.0, -1.5, 0], [0.4, -1.4, 0],
                       fill_color=ROCHE, fill_opacity=1, stroke_color=VERT_OK, stroke_width=3)
        l3 = self.T("...et agrandit l'île !", size=28, color=VERT_OK).move_to([0, -2.9, 0])
        self.play(FadeIn(neuf, scale=0.5), self.anim_entree(l3, mode="grow"), Flash(neuf, color=VERT_OK))
        self.wait(1.6)

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
        self.ecran_lave()
        self.ecran_ile()
        self.ecran_cta()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo 16:9 muette) ──
# [Accueil ~0:00]    « Le Piton de la Fournaise : un des volcans les plus actifs du
#                      monde... et il est chez nous, à La Réunion ! »
# [Écran 1 ~0:10]    « Il culmine à 2 632 mètres. Et il entre en éruption presque
#                      chaque année. »
# [Écran 2 ~0:25]    « Sous terre, une poche de roche fondue : le magma. La pression
#                      le pousse vers le haut par la cheminée. En haut, c'est
#                      l'éruption : le magma devient lave. »
# [Écran 3 ~0:45]    « La lave sort à environ 1 100 degrés. C'est onze fois plus chaud
#                      que l'eau qui bout ! »
# [Écran 4 ~1:00]    « Et quand la lave coule jusqu'à la mer, elle refroidit, elle
#                      durcit, et elle agrandit l'île. Le volcan fabrique de la terre
#                      neuve. »
# [Défi ~1:15]       « À toi ! Une coulée avance à 500 mètres par heure. La mer est à
#                      3 kilomètres. En combien de temps la lave atteint-elle la mer ?
#                      Mets pause ! »
# [Correction ~1:30] « 3 kilomètres, c'est 3 000 mètres. 3 000 divisé par 500 : 6.
#                      La lave atteint la mer en 6 heures. »
# [À retenir ~1:45]  « On retient : un volcan très actif ; le magma qui monte et
#                      jaillit en lave ; 1 100 degrés ; et la lave qui agrandit l'île.
#                      À bientôt ! »
