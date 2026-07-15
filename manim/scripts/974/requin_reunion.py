# requin_reunion.py
# EleveAI — « Les maths en vrai · La Réunion » — Les requins : la peur vs le risque réel
#
# Épisode 5 de la série « en vrai 974 » (voir manim/REGLES.md). Sujet sensible traité
# avec soin : on NE dit PAS « le requin est inoffensif » (faux et irrespectueux ici) ;
# on montre que la PEUR est disproportionnée (probabilités), que l'humain n'est pas
# dans la chaîne alimentaire du requin (une morsure = une confusion), l'enjeu
# ÉCOLOGIQUE (le requin garde le récif → le récif fait le lagon → le lagon te
# protège), et la vraie réponse à La Réunion (zones surveillées, pas tuer).
#
# Maths mobilisées : probabilités / comparaison de risques (requin ~10 vs route
# ~1 300 000 morts/an), grands nombres (100 000 000 de requins tués par l'homme),
# et le défi = proportionnalité 2 étapes (vigies à Saint-Pierre).
#
# Deux scènes :
# - RequinReunion974      → 16:9 YouTube (~1 min 50)
# - RequinReunion974Short → 9:16 Shorts/Instagram (~40 s), rendre avec -r 1080,1920
#
# Rendu brouillon :
#   python -m manim render -ql manim/scripts/974/requin_reunion.py RequinReunion974 --media_dir manim/scripts/974/media
#   python -m manim render -ql -r 480,854 manim/scripts/974/requin_reunion.py RequinReunion974Short --media_dir manim/scripts/974/media
# Rendu final :
#   python -m manim render -qh manim/scripts/974/requin_reunion.py RequinReunion974 -o eleveai-maths-974-requin-reunion --media_dir manim/scripts/974/media
#   python -m manim render -qh -r 1080,1920 manim/scripts/974/requin_reunion.py RequinReunion974Short -o eleveai-maths-974-requin-reunion-short --media_dir manim/scripts/974/media
#
# Repères réels (ordres de grandeur, arrondis pour l'élève) :
# - Requins : ~10 humains tués/an dans le monde ; humains : ~100 000 000 de requins tués/an
# - Route : ~1 300 000 morts/an dans le monde
# - Le requin = super-prédateur (garde l'équilibre du récif) ; la barrière de corail crée le lagon calme
# - La Réunion : drames réels (2011-2019) ; baignade réglementée ; vigies requins ; bassin protégé de Saint-Pierre
# - Défi : 1 vigie / 40 nageurs ; 320 + 120 nageurs → 440 ÷ 40 = 11 vigies

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat

REQUIN = ManimColor("#6E90B0")
VENTRE = ManimColor("#C9DCEB")
CORAIL = ManimColor("#FF7EA6")
CORAIL2 = ManimColor("#FFAF52")
LAGON = ManimColor("#4FD0E0")


# ── décor partagé ──────────────────────────────────────────────────────────────

def requin_gentil(echelle=1.0):
    """Un requin GENTIL (sourire, œil doux) — pour dédramatiser l'animal. Tête à droite."""
    corps = Ellipse(width=2.8, height=1.15, fill_color=REQUIN, fill_opacity=1, stroke_width=0)
    ventre = Ellipse(width=2.3, height=0.55, fill_color=VENTRE, fill_opacity=1, stroke_width=0).shift(DOWN * 0.32)
    queue = Polygon([-1.35, 0, 0], [-2.05, 0.55, 0], [-1.7, 0, 0], [-2.05, -0.55, 0],
                    fill_color=REQUIN, fill_opacity=1, stroke_width=0)
    dorsale = Polygon([-0.1, 0.5, 0], [0.3, 1.2, 0], [0.55, 0.5, 0], fill_color=REQUIN, fill_opacity=1, stroke_width=0)
    pectorale = Polygon([0.1, -0.45, 0], [0.35, -1.0, 0], [0.7, -0.4, 0], fill_color=REQUIN, fill_opacity=1, stroke_width=0)
    oeil_b = Dot([0.95, 0.22, 0], radius=0.14, color=WHITE)
    oeil = Dot([0.99, 0.2, 0], radius=0.07, color=BLACK)
    sourire = Arc(radius=0.4, start_angle=-PI * 0.75, angle=PI * 0.45, color=BLACK, stroke_width=3).move_to([1.05, -0.12, 0])
    return VGroup(queue, corps, ventre, dorsale, pectorale, oeil_b, oeil, sourire).scale(echelle)


def poisson(echelle=1.0, couleur=BLEU_CALCUL):
    corps = Ellipse(width=0.7, height=0.36, fill_color=couleur, fill_opacity=1, stroke_width=0)
    queue = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.16).rotate(-PI / 2).next_to(corps, LEFT, buff=-0.03)
    oeil = Dot([0.2, 0.06, 0], radius=0.035, color=BLACK)
    return VGroup(corps, queue, oeil).scale(echelle)


def corail(echelle=1.0):
    """Un buisson de corail (quelques doigts colorés)."""
    g = VGroup()
    specs = [(-0.5, 0.7, CORAIL), (-0.15, 1.0, CORAIL2), (0.2, 0.75, CORAIL), (0.5, 0.95, VIOLET_ACCENT)]
    for x, h, col in specs:
        doigt = RoundedRectangle(width=0.28, height=h, corner_radius=0.13, fill_color=col, fill_opacity=1, stroke_width=0)
        doigt.move_to([x, h / 2 - 0.5, 0])
        g.add(doigt)
    return g.scale(echelle)


def voiture(echelle=1.0, couleur=ROUGE_ERREUR):
    caisse = RoundedRectangle(width=1.7, height=0.55, corner_radius=0.12, fill_color=couleur, fill_opacity=1, stroke_width=0)
    toit = RoundedRectangle(width=0.95, height=0.42, corner_radius=0.12, fill_color=couleur, fill_opacity=1, stroke_width=0).shift(UP * 0.42 + LEFT * 0.05)
    vitre = RoundedRectangle(width=0.7, height=0.28, corner_radius=0.06, fill_color=VENTRE, fill_opacity=1, stroke_width=0).shift(UP * 0.44 + LEFT * 0.05)
    r1 = Circle(radius=0.22, color=BLACK, fill_color=BLACK, fill_opacity=1, stroke_width=0).shift(DOWN * 0.32 + LEFT * 0.5)
    r2 = Circle(radius=0.22, color=BLACK, fill_color=BLACK, fill_opacity=1, stroke_width=0).shift(DOWN * 0.32 + RIGHT * 0.5)
    phare = Dot([0.85, 0.0, 0], radius=0.06, color=JAUNE_TITRE)
    return VGroup(caisse, toit, vitre, r1, r2, phare).scale(echelle)


def bonhomme(echelle=1.0, couleur=WHITE):
    tete = Circle(radius=0.16, color=couleur, fill_color=couleur, fill_opacity=1, stroke_width=0).shift(UP * 0.5)
    corps = Line([0, 0.34, 0], [0, -0.25, 0], color=couleur, stroke_width=5)
    bras = Line([-0.28, 0.1, 0], [0.28, 0.1, 0], color=couleur, stroke_width=5)
    jg = Line([0, -0.25, 0], [-0.2, -0.7, 0], color=couleur, stroke_width=5)
    jd = Line([0, -0.25, 0], [0.2, -0.7, 0], color=couleur, stroke_width=5)
    return VGroup(tete, corps, bras, jg, jd).scale(echelle)


class RequinBase(Scene):
    """Helpers communs (mêmes que cyclone / volcan), avec le clamp anti-débordement."""

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

class RequinReunion974(RequinBase):

    # ── écran 0 : accueil ───────────────────────────────────────────────────
    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = self.T("Les requins : faut-il avoir peur ?", size=42, color=JAUNE_TITRE).to_edge(UP)
        sous = self.T("Les maths en vrai · La Réunion — EleveAI", size=30).next_to(titre, DOWN, buff=0.35)
        r = requin_gentil(1.0).move_to([-2.4, -1.2, 0])
        accroche = self.T("À la télé, c'est un monstre. La vérité va te surprendre.",
                          size=30, color=BLEU_CALCUL).move_to([0, 1.1, 0])
        if accroche.width > 11.5:
            accroche.scale_to_fit_width(11.5).move_to([0, 1.1, 0])
        self.play(GrowFromCenter(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(FadeIn(r, shift=0.6 * RIGHT))
        self.play(r.animate.shift(RIGHT * 0.5), rate_func=there_and_back, run_time=1.4)
        self.play(FadeIn(accroche, scale=0.5))
        self.wait(2.0)

    # ── écran 1 : le lagon protégé par le corail ────────────────────────────
    def ecran_lagon(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Le lagon, protégé par le corail")

        # océan profond (droite) + barrière de corail + lagon calme (gauche) + plage
        ocean = Rectangle(width=6.0, height=1.8, fill_color=BLEU_CALCUL, fill_opacity=0.7, stroke_width=0).move_to([3.4, -2.0, 0])
        lagon = Rectangle(width=6.8, height=1.4, fill_color=LAGON, fill_opacity=0.5, stroke_width=0).move_to([-3.0, -2.2, 0])
        recif = corail(0.9).move_to([0.4, -2.0, 0])
        vagues = VGroup(*[Arc(radius=0.25, start_angle=0, angle=PI, color=WHITE, stroke_width=3).move_to([2.2 + i * 0.7, -1.15, 0]) for i in range(4)])
        nageur = bonhomme(0.7, WHITE).move_to([-3.4, -1.9, 0])

        self.play(FadeIn(ocean), FadeIn(lagon))
        self.play(GrowFromEdge(recif, DOWN), Create(vagues, lag_ratio=0.2))
        self.play(FadeIn(nageur, shift=0.3 * UP))

        l1 = self.T("La barrière de corail casse les vagues du large.", size=27).move_to([0, 1.9, 0])
        l2 = self.T("Derrière, le lagon est calme et peu profond.", size=27, color=LAGON).move_to([-1.4, 0.9, 0])
        l3 = self.T("C'est là qu'on se baigne.", size=27, color=VERT_OK).move_to([-2.6, 0.0, 0])
        self.play(self.anim_entree(l1, mode="fade_down"))
        self.play(self.anim_entree(l2, mode="slide_l"))
        self.play(self.anim_entree(l3, mode="grow"))
        self.wait(1.8)

    # ── écran 2 : la rareté (le champ de maïs) + route vs requin ─────────────
    def ecran_rarete(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Se faire mordre ? Ultra-rare")

        # champ de maïs : grille de grains jaunes, UN entouré de rouge
        grains = VGroup()
        cible = None
        for r in range(6):
            for c in range(14):
                g = Dot([-4.9 + c * 0.42, 0.7 - r * 0.34, 0], radius=0.07, color=JAUNE_TITRE)
                grains.add(g)
                if r == 3 and c == 9:
                    cible = g
        self.play(LaggedStart(*[FadeIn(g, scale=0.4) for g in grains], lag_ratio=0.003), run_time=1.6)
        anneau = Circle(radius=0.2, color=ROUGE_ERREUR, stroke_width=5).move_to(cible.get_center())
        self.play(Create(anneau), Indicate(cible, color=ROUGE_ERREUR, scale_factor=2.0))

        l1 = self.T("C'est comme trouver CE grain de maïs,", size=26, color=WHITE).move_to([0, 2.2, 0])
        l2 = self.T("dans tout le champ, du premier coup.", size=26, color=WHITE).next_to(l1, DOWN, buff=0.16)
        self.play(self.anim_entree(l1, mode="slide_l"), self.anim_entree(l2, mode="slide_r"))

        cmp1 = self.T("Requin : ~10 morts / an dans le monde.", size=26, color=REQUIN).move_to([0, -1.6, 0])
        cmp2 = self.T("La route : ~1 300 000 morts / an.", size=28, color=ROUGE_ERREUR).move_to([0, -2.4, 0])
        self.play(self.anim_entree(cmp1, mode="fade_up"))
        self.play(self.anim_entree(cmp2, mode="grow"), Flash(cmp2, color=ROUGE_ERREUR))
        self.wait(2.0)

    # ── écran 3 : le renversement (qui tue qui ?) ───────────────────────────
    def ecran_renversement(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. Mais qui tue qui ?")

        a = self.T("Les requins tuent", size=28).move_to([-3.4, 1.6, 0])
        an = self.T("~ 10 humains / an", size=30, color=REQUIN).next_to(a, DOWN, buff=0.2)
        self.play(self.anim_entree(a, mode="slide_l"))
        self.play(self.anim_entree(an, mode="pop"))

        b = self.T("Les humains tuent", size=28).move_to([2.8, 1.6, 0])
        bn = self.T("~ 100 000 000", size=44, color=ROUGE_ERREUR).next_to(b, DOWN, buff=0.2)
        bn2 = self.T("de requins / an", size=28, color=ROUGE_ERREUR).next_to(bn, DOWN, buff=0.12)
        self.play(self.anim_entree(b, mode="slide_r"))
        self.play(GrowFromCenter(bn), Flash(bn, color=ROUGE_ERREUR))
        self.play(self.anim_entree(bn2, mode="fade_up"))

        punch = self.T("10 millions de fois plus. Qui est le monstre ?", size=32, color=JAUNE_TITRE).to_edge(DOWN, buff=0.7)
        self.play(GrowFromCenter(punch))
        self.wait(2.4)

    # ── écran 4 : l'humain n'est pas au menu ────────────────────────────────
    def ecran_chaine(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Tu n'es PAS au menu du requin")

        # chaîne : plancton → petit poisson → gros poisson → requin
        plancton = VGroup(*[Dot([-5.3 + 0.12 * (i % 3), -0.5 + 0.12 * (i // 3), 0], radius=0.05, color=VERT_OK) for i in range(6)])
        p1 = poisson(0.9, BLEU_CALCUL).move_to([-2.8, -0.5, 0])
        p2 = poisson(1.5, VIOLET_ACCENT).move_to([0.4, -0.5, 0])
        rq = requin_gentil(0.55).move_to([4.0, -0.5, 0])
        chaine = VGroup(plancton, p1, p2, rq)
        fleches = VGroup(
            Arrow([-4.7, -0.5, 0], [-3.6, -0.5, 0], color=WHITE, stroke_width=3, buff=0.1),
            Arrow([-2.1, -0.5, 0], [-0.6, -0.5, 0], color=WHITE, stroke_width=3, buff=0.1),
            Arrow([1.4, -0.5, 0], [2.9, -0.5, 0], color=WHITE, stroke_width=3, buff=0.1),
        )
        self.play(LaggedStart(FadeIn(plancton), GrowArrow(fleches[0]), FadeIn(p1, shift=0.2 * RIGHT),
                              GrowArrow(fleches[1]), FadeIn(p2, shift=0.2 * RIGHT),
                              GrowArrow(fleches[2]), FadeIn(rq, shift=0.2 * RIGHT), lag_ratio=0.4), run_time=3.0)

        # l'humain À CÔTÉ de la chaîne, avec un ≠
        toi = bonhomme(0.9, JAUNE_TITRE).move_to([4.0, 1.7, 0])
        diff = self.T("≠", size=40, color=ROUGE_ERREUR).move_to([4.0, 0.7, 0])
        toilab = self.T("toi", size=22, color=JAUNE_TITRE).next_to(toi, UP, buff=0.1)
        self.play(FadeIn(toi, shift=0.3 * DOWN), FadeIn(toilab, shift=0.2 * DOWN), Write(diff))

        l1 = self.T("Le requin mange poissons, tortues, raies — pas l'humain.", size=25, color=BLEU_CALCUL).move_to([-1.3, 2.4, 0])
        l2 = self.T("Une morsure = une confusion : de dessous, un surfeur", size=24).move_to([-1.2, -2.1, 0])
        l3 = self.T("ressemble à une tortue. Il goûte... et lâche.", size=24).next_to(l2, DOWN, buff=0.14)
        self.play(self.anim_entree(l1, mode="fade_down"))
        self.play(self.anim_entree(l2, mode="fade_up"))
        self.play(self.anim_entree(l3, mode="fade_up"))
        self.wait(2.2)

    # ── écran 5 : la boucle (le cœur) ───────────────────────────────────────
    def ecran_boucle(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Tout est lié")

        # cycle : requin (haut) → récif (droite) → lagon (bas) → toi (gauche) → requin
        rq = requin_gentil(0.5).move_to([0, 2.0, 0])
        rc = corail(0.7).move_to([3.0, 0.0, 0])
        lg = Rectangle(width=1.7, height=0.7, fill_color=LAGON, fill_opacity=0.6, stroke_width=0).move_to([0, -1.9, 0])
        toi = bonhomme(0.8, JAUNE_TITRE).move_to([-3.0, 0.0, 0])
        labels = VGroup(
            self.T("le requin", size=22, color=REQUIN).next_to(rq, DOWN, buff=0.12),
            self.T("le récif", size=22, color=CORAIL).next_to(rc, DOWN, buff=0.12),
            self.T("le lagon", size=22, color=LAGON).next_to(lg, DOWN, buff=0.12),
            self.T("toi", size=22, color=JAUNE_TITRE).next_to(toi, DOWN, buff=0.12),
        )
        for icon, lab in [(rq, labels[0]), (rc, labels[1]), (lg, labels[2]), (toi, labels[3])]:
            self.play(FadeIn(icon, scale=0.6), FadeIn(lab, shift=0.15 * DOWN), run_time=0.5)

        # flèches du cercle (sens horaire)
        arcs = VGroup(
            CurvedArrow([1.0, 1.9, 0], [2.7, 0.7, 0], color=VERT_OK, angle=-PI / 4),
            CurvedArrow([2.7, -0.7, 0], [0.9, -1.7, 0], color=VERT_OK, angle=-PI / 4),
            CurvedArrow([-0.9, -1.7, 0], [-2.7, -0.6, 0], color=VERT_OK, angle=-PI / 4),
            CurvedArrow([-2.7, 0.7, 0], [-0.9, 1.8, 0], color=VERT_OK, angle=-PI / 4),
        )
        phrases = [
            "garde en bonne santé",
            "fabrique",
            "te protège",
            "protège le requin",
        ]
        for arc in arcs:
            self.play(Create(arc), run_time=0.5)

        note = self.T("Le requin garde le récif → le récif fait le lagon → le lagon te protège.", size=24, color=VERT_OK).move_to([0, -3.0, 0])
        self.play(self.anim_entree(note, mode="grow"))
        self.wait(2.4)

    # ── écran 6 : à La Réunion (drame nommé + solution) ─────────────────────
    def ecran_reunion(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("6. À La Réunion, soyons justes")

        l1 = self.T("Ici, on a connu des drames. On ne les oublie pas.", size=27, color=WHITE).move_to([0, 2.1, 0])
        self.play(self.anim_entree(l1, mode="fade_down"))
        self.wait(0.4)

        l2 = self.T("Près des côtes, au large, le risque est réel.", size=27, color=ORANGE_RETENUE).move_to([0, 1.0, 0])
        self.play(self.anim_entree(l2, mode="slide_l"))

        # la vraie réponse
        panneau = VGroup(
            self.T("La vraie réponse : PAS tuer les requins,", size=27, color=VERT_OK),
            self.T("mais nager dans le lagon et les zones surveillées.", size=27, color=VERT_OK),
            self.T("Vigies requins · bassin protégé de Saint-Pierre.", size=25, color=LAGON),
        ).arrange(DOWN, buff=0.28).move_to([0, -1.2, 0])
        for ligne in panneau:
            self.play(self.anim_entree(ligne), run_time=0.7)
        self.wait(2.2)

    # ── écran 7 : défi (probabilités : requin vs voiture) ───────────────────
    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        titre = self.T("Défi", size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        intro = self.T("Tu vas te baigner à la plage. Qu'est-ce qui est le plus probable ?",
                       size=27, color=WHITE).move_to([0, 2.2, 0])
        if intro.width > 11.5:
            intro.scale_to_fit_width(11.5).move_to([0, 2.2, 0])
        self.play(self.anim_entree(intro, mode="fade_down"))

        # carte gauche : morsure de requin
        r = requin_gentil(0.55).move_to([-3.6, 0.6, 0])
        rp1 = self.T("morsure de requin", size=24, color=REQUIN).move_to([-3.6, -0.5, 0])
        rp2 = self.T("~ 1 sur 4 000 000", size=28, color=REQUIN).move_to([-3.6, -1.2, 0])
        self.play(FadeIn(r, shift=0.3 * RIGHT), self.anim_entree(rp1, mode="fade_up"))
        self.play(self.anim_entree(rp2, mode="pop"))

        # carte droite : renversé par une voiture
        v = voiture(0.9).move_to([3.6, 0.6, 0])
        vp1 = self.T("renversé par une voiture", size=24, color=ROUGE_ERREUR).move_to([3.6, -0.5, 0])
        vp2 = self.T("~ 1 sur 4 000", size=28, color=ROUGE_ERREUR).move_to([3.6, -1.2, 0])
        self.play(FadeIn(v, shift=0.3 * LEFT), self.anim_entree(vp1, mode="fade_up"))
        self.play(self.anim_entree(vp2, mode="pop"))

        q = self.T("Laquelle est la plus probable ? Combien de fois plus ?", size=28, color=JAUNE_TITRE).move_to([0, -2.4, 0])
        self.play(self.anim_entree(q, mode="grow"))
        pause = self.T("Mets pause et cherche !", size=26, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.25)
        self.play(GrowFromCenter(pause))
        self.wait(4.5)

    # ── écran 8 : correction (comparer deux probabilités) ───────────────────
    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = self.T("Astuce : plus le nombre est GRAND, plus c'est RARE.", size=27, color=BLEU_CALCUL).move_to([0, 2.3, 0])
        self.play(self.anim_entree(e1, mode="slide_l"))
        c1 = self.T("Requin : 1 sur 4 000 000  →  hyper rare", size=28, color=REQUIN).move_to([0, 1.4, 0])
        c2 = self.T("Voiture : 1 sur 4 000  →  bien plus fréquent", size=28, color=ROUGE_ERREUR).move_to([0, 0.6, 0])
        self.play(self.anim_entree(c1, mode="fade_up"))
        self.play(self.anim_entree(c2, mode="fade_up"))

        e2 = self.T("Combien de fois plus ? On divise :", size=27, color=ORANGE_RETENUE).move_to([0, -0.4, 0])
        self.play(self.anim_entree(e2, mode="slide_r"))
        c3 = self.T("4 000 000 ÷ 4 000 = 1 000", size=36, color=VERT_OK).move_to([0, -1.3, 0])
        self.play(self.anim_entree(c3, mode="grow"))
        self.play(Flash(c3, color=VERT_OK))

        concl = self.T("→ La voiture, c'est 1 000 fois plus probable que le requin !", size=28, color=JAUNE_TITRE).to_edge(DOWN, buff=0.5)
        if concl.width > 12.4:
            concl.scale_to_fit_width(12.4).to_edge(DOWN, buff=0.5)
        self.play(GrowFromCenter(concl))
        self.wait(2.8)

    # ── écran 9 : à retenir ─────────────────────────────────────────────────
    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = self.T("À retenir", size=46, color=JAUNE_TITRE).to_edge(UP)
        points = VGroup(
            self.T("1. La peur est bien plus grande que le risque réel.", size=25),
            self.T("2. Tu n'es pas au menu du requin : une morsure est une erreur.", size=25),
            self.T("3. Le requin garde le récif — qui fait le lagon qui te protège.", size=25),
            self.T("4. À La Réunion : on ne tue pas, on nage dans les zones surveillées.", size=25),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([-0.1, 0.2, 0])
        signature = self.T(SIGNATURE, size=26, color=VERT_OK).to_edge(DOWN)
        self.play(GrowFromCenter(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=0.4 * RIGHT) for p in points], lag_ratio=0.35))
        self.play(FadeIn(signature, shift=0.3 * UP), Flash(signature, color=VERT_OK))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_lagon()
        self.ecran_rarete()
        self.ecran_renversement()
        self.ecran_chaine()
        self.ecran_boucle()
        self.ecran_reunion()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ════════════════════════════════════════════════════════════════════════════════
#  SCÈNE 9:16 — le Short (buzz : le renversement d'abord)
# ════════════════════════════════════════════════════════════════════════════════

class RequinReunion974Short(RequinBase):

    LARGEUR_SURE = 4.1

    def __init__(self, **kwargs):
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(**kwargs)

    def ecran_hook(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        t1 = self.T("Les HUMAINS tuent", size=28).move_to([0, 3.3, 0])
        t2 = self.T("100 MILLIONS", size=34, color=ROUGE_ERREUR).next_to(t1, DOWN, buff=0.18)
        t3 = self.T("de requins / an.", size=28).next_to(t2, DOWN, buff=0.18)
        self.play(self.anim_entree(t1, mode="fade_down"))
        self.play(GrowFromCenter(t2), Flash(t2, color=ROUGE_ERREUR))
        self.play(self.anim_entree(t3, mode="fade_up"))
        r = requin_gentil(1.1).move_to([0, -1.0, 0])
        self.play(FadeIn(r, shift=0.5 * RIGHT))
        self.wait(1.4)

    def ecran_renversement(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        l1 = self.T("Et les requins ?", size=30, color=JAUNE_TITRE).move_to([0, 3.3, 0])
        l2 = self.T("~ 10 humains / an.", size=30, color=REQUIN).next_to(l1, DOWN, buff=0.2)
        self.play(self.anim_entree(l1, mode="fade_down"))
        self.play(self.anim_entree(l2, mode="pop"))
        big = self.T("10 millions", size=40, color=ROUGE_ERREUR).move_to([0, 0.4, 0])
        big2 = self.T("de fois plus.", size=30).next_to(big, DOWN, buff=0.15)
        self.play(GrowFromCenter(big), Flash(big, color=ROUGE_ERREUR))
        self.play(self.anim_entree(big2, mode="fade_up"))
        q = self.T("Qui est le monstre ?", size=34, color=JAUNE_TITRE).move_to([0, -2.4, 0])
        self.play(GrowFromCenter(q))
        self.wait(1.8)

    def ecran_boucle(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        l1 = self.T("Et en plus,", size=28, color=JAUNE_TITRE).move_to([0, 3.4, 0])
        self.play(self.anim_entree(l1, mode="fade_down"))
        lignes = VGroup(
            self.T("le requin garde le récif,", size=26, color=REQUIN),
            self.T("le récif fait le lagon,", size=26, color=CORAIL),
            self.T("le lagon te protège.", size=26, color=LAGON),
        ).arrange(DOWN, buff=0.3).move_to([0, 0.8, 0])
        for ligne in lignes:
            self.play(self.anim_entree(ligne), run_time=0.7)
        rc = corail(0.8).move_to([0, -2.2, 0])
        self.play(GrowFromEdge(rc, DOWN))
        l2 = self.T("Le tuer casse tout le cercle.", size=26, color=ORANGE_RETENUE).move_to([0, -3.3, 0])
        self.play(self.anim_entree(l2, mode="grow"))
        self.wait(1.8)

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
        self.ecran_renversement()
        self.ecran_boucle()
        self.ecran_cta()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo 16:9 muette) ──
# [Accueil ~0:00]   « Les requins : faut-il vraiment avoir peur ? À la télé, c'est un
#                     monstre. La vérité va te surprendre. »
# [Écran 1 ~0:10]   « À La Réunion, la barrière de corail casse les vagues du large.
#                     Derrière, le lagon est calme et peu profond : c'est là qu'on se
#                     baigne. »
# [Écran 2 ~0:25]   « Se faire mordre, c'est comme trouver un grain de maïs précis dans
#                     tout un champ, du premier coup. Chaque année, les requins tuent
#                     environ 10 personnes. La route ? Un million trois cent mille. »
# [Écran 3 ~0:45]   « Mais qui tue qui ? Les humains tuent environ cent millions de
#                     requins par an. Dix millions de fois plus. Qui est le monstre ? »
# [Écran 4 ~1:05]   « Et surtout : tu n'es pas au menu du requin. Il mange des poissons,
#                     des tortues. Pas l'humain. Une morsure, c'est une confusion : vu
#                     de dessous, un surfeur ressemble à une tortue. Il goûte, et il
#                     lâche. »
# [Écran 5 ~1:25]   « Tout est lié : le requin garde le récif en bonne santé, le récif
#                     fabrique le lagon, et le lagon te protège. »
# [Écran 6 ~1:40]   « À La Réunion, on a connu des drames, on ne les oublie pas. Près des
#                     côtes, le risque est réel. La vraie réponse n'est pas de tuer les
#                     requins, mais de nager dans le lagon et les zones surveillées. »
# [Défi ~1:55]      « À toi ! Une vigie surveille 40 nageurs. Il y en a 320 le matin,
#                     120 de plus l'après-midi. Combien de vigies l'après-midi ? »
# [Correction ~2:10]« 320 plus 120, ça fait 440. 440 divisé par 40 : 11. Il faut 11
#                     vigies. »
# [À retenir ~2:20] « On retient : la peur dépasse le risque ; tu n'es pas au menu du
#                     requin ; il protège le récif qui fait le lagon qui te protège ; et
#                     ici, on ne tue pas, on nage dans les zones surveillées. À bientôt ! »
