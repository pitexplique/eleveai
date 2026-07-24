# proteine_effort.py
# EleveAI — « Les maths en vrai · La Réunion » — L'effort et les protéines
# (1 minute à fond sur le rameur : combien d'énergie, et comment on récupère).
#
# Épisode « en vrai 974 », hors banques (pas de notionId), jumeau de style de
# lait_reunion.py — né d'une rencontre avec le coach principal d'une salle de
# sport de Saint-Pierre (crédit affiché tel quel au carton final : JAMAIS de nom
# de salle, jamais de marque, jamais de poudres/compléments — protéines = l'assiette).
#
# UNE seule scène, VERTICALE (Short/Reel 9:16, 1080×1920).
# ⏱️ Durée estimée ≈ 65 s après rabotage des temps morts (le premier jet en
# faisait 75). À CONFIRMER au rendu -ql : si ça dépasse, raboter d'abord les
# self.wait() de fin d'écran, jamais les temps de lecture des calculs.
# ⚠️ MUETTE (règle Frédéric) : AUCUN son, le texte à l'écran porte TOUTE
# l'explication — waits généreux, phrases courtes, une idée par ligne.
#
# L'arc : le défi OMS (60 min/jour, posé comme un défi, jamais un reproche)
#   → 1 minute à fond sur le rameur (250 W, les watts qui montent)
#   → 250 W = 25 ampoules LED allumées
#   → le calcul qui se déroule : 250 × 60 = 15 000 J ÷ 4 184 ≈ 3,6 kcal
#   → le gag : même pas UN carré de chocolat (23 kcal) — à peine un sixième
#   → le rebond : rendement musculaire 25 %, le corps a brûlé ×4 (≈ 14,4 kcal)
#   → la récup : réparer le muscle = protéines de l'assiette (1 œuf ≈ 6,5 g)
#   → la morale « L'effort, c'est des maths. La récup aussi. »
#   → carton eleveai.fr/effort.
#
# Rendu brouillon :
#   python -m manim render -ql -r 480,854 manim/scripts/974/proteine_effort.py ProteineEffort974Short --media_dir manim/scripts/974/media
# Rendu final :
#   python -m manim render -qh -r 1080,1920 manim/scripts/974/proteine_effort.py ProteineEffort974Short -o eleveai-maths-974-proteine-effort-short --media_dir manim/scripts/974/media
#
# Constantes VÉRIFIÉES (aucun autre chiffre affiché) :
# - 1 kcal = 4 184 J · une ampoule LED ≈ 10 W · 1 carré de chocolat ≈ 4,2 g ≈ 23 kcal
# - Rameur : 50 W (débutant tranquille) → 400 W (athlète en sprint) ; 250 W = très bon effort
# - Rendement musculaire ≈ 25 % (le corps brûle ~4× l'énergie mécanique) → 3,6 × 4 = 14,4 kcal
#   (⚠️ jamais arrondi à 15 : une vidéo de maths ne peut pas se tromper à l'écran ;
#    la chute tient quand même — 14,4 < 23, toujours « même pas un carré »)
# - Protéines : 1 œuf ≈ 6,5 g · verre de lait (250 ml) ≈ 8 g · 100 g de lentilles cuites ≈ 9 g ·
#   100 g de poisson ≈ 20 g · sportif ≈ 1,2 à 1,6 g/kg/jour
# - OMS : 60 min d'activité physique par jour recommandées aux 11-17 ans ;
#   plus de 8 ados sur 10 dans le monde n'atteignent pas ce seuil.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat

# couleurs de décor (comme le FEU de la Diagonale : décor seulement, jamais le code couleur pédagogique)
CHOCOLAT = "#8B5A2B"
CHOCOLAT_BORD = "#5C3A1E"
CHOCOLAT_CLAIR = "#A9743F"


# ── décors dessinés (tout en Manim, aucun asset externe) ──────────────────────

def rameur(echelle=1.0):
    """Un rameur d'appartement stylisé, vu de profil : volant à gauche,
    silhouette qui tire la poignée, chaîne en pointillés."""
    rail = Line([-1.35, -0.45, 0], [1.35, -0.45, 0], color=GREY_B, stroke_width=6)
    pieds = VGroup(
        Line([-1.2, -0.45, 0], [-1.2, -0.68, 0], color=GREY_B, stroke_width=5),
        Line([1.2, -0.45, 0], [1.2, -0.68, 0], color=GREY_B, stroke_width=5),
    )
    support = Line([-1.05, -0.45, 0], [-1.05, -0.26, 0], color=GREY_B, stroke_width=5)
    volant = Circle(radius=0.4, color=GREY_B, stroke_width=5).move_to([-1.05, 0.12, 0])
    moyeu = Dot(radius=0.07, color=GREY_B).move_to([-1.05, 0.12, 0])
    cale = Line([-0.6, -0.42, 0], [-0.42, -0.04, 0], color=GREY_B, stroke_width=5)

    bassin = np.array([0.5, -0.26, 0])
    epaule = np.array([0.95, 0.34, 0])
    genou = np.array([0.0, 0.06, 0])
    pied = np.array([-0.48, -0.16, 0])
    main = np.array([0.2, 0.3, 0])

    siege = Rectangle(width=0.32, height=0.1, color=WHITE, fill_color=GREY_B,
                      fill_opacity=1, stroke_width=2).move_to([0.5, -0.36, 0])
    jambe1 = Line(bassin, genou, color=WHITE, stroke_width=6)
    jambe2 = Line(genou, pied, color=WHITE, stroke_width=6)
    torse = Line(bassin, epaule, color=WHITE, stroke_width=6)
    bras = Line(epaule, main, color=WHITE, stroke_width=5)
    tete = Circle(radius=0.15, color=WHITE, fill_color=WHITE, fill_opacity=1,
                  stroke_width=0).move_to(epaule + np.array([0.12, 0.26, 0]))
    poignee = Line(main + np.array([0, -0.13, 0]), main + np.array([0, 0.13, 0]),
                   color=ORANGE_RETENUE, stroke_width=7)
    chaine = DashedLine(main, [-1.05, 0.12, 0], color=GREY_B, stroke_width=3)

    return VGroup(rail, pieds, support, volant, moyeu, cale, siege, chaine,
                  jambe1, jambe2, torse, bras, tete, poignee).scale(echelle)


def ampoule(r=0.16):
    """Une petite ampoule LED, éteinte (verre gris). On l'allume en remplissant
    le verre (indice 0) de jaune."""
    verre = Circle(radius=r, color=GREY_B, stroke_width=2,
                   fill_color=GREY_D, fill_opacity=0.25)
    culot = Rectangle(width=r * 0.9, height=r * 0.5, color=GREY_B, fill_color=GREY_B,
                      fill_opacity=1, stroke_width=0).next_to(verre, DOWN, buff=0.02)
    return VGroup(verre, culot)


def carre_chocolat(cote=1.6):
    """UN carré de chocolat (fond + relief central, façon tablette)."""
    fond = RoundedRectangle(width=cote, height=cote, corner_radius=0.08,
                            color=CHOCOLAT_BORD, fill_color=CHOCOLAT,
                            fill_opacity=1, stroke_width=4)
    relief = RoundedRectangle(width=cote * 0.68, height=cote * 0.68, corner_radius=0.06,
                              color=CHOCOLAT_CLAIR, fill_color=CHOCOLAT_CLAIR,
                              fill_opacity=0.55, stroke_width=2)
    return VGroup(fond, relief)


def oeuf_au_plat():
    """Un œuf au plat dans une assiette (la récup, c'est l'assiette)."""
    assiette = Ellipse(width=2.6, height=1.05, color=GREY_B, fill_color=GREY_E,
                       fill_opacity=0.5, stroke_width=3)
    blanc = Ellipse(width=1.7, height=0.62, color=WHITE, fill_color=WHITE,
                    fill_opacity=1, stroke_width=0).shift(UP * 0.06)
    jaune = Circle(radius=0.2, color=ORANGE_RETENUE, fill_color=JAUNE_TITRE,
                   fill_opacity=1, stroke_width=2).shift(UP * 0.1)
    return VGroup(assiette, blanc, jaune)


def icone_verre():
    corps = Polygon([-0.14, -0.2, 0], [0.14, -0.2, 0], [0.18, 0.2, 0], [-0.18, 0.2, 0],
                    color=GREY_B, stroke_width=2)
    lait = Polygon([-0.12, -0.17, 0], [0.12, -0.17, 0], [0.15, 0.1, 0], [-0.15, 0.1, 0],
                   color=WHITE, fill_color=WHITE, fill_opacity=0.95, stroke_width=0)
    return VGroup(lait, corps)


def icone_bol():
    bol = Arc(radius=0.2, start_angle=PI, angle=PI, color=GREY_B, stroke_width=3)
    bord = Line([-0.2, 0, 0], [0.2, 0, 0], color=GREY_B, stroke_width=3)
    lentilles = VGroup(*[Dot(radius=0.035, color=ORANGE_RETENUE).move_to([x, 0.05, 0])
                         for x in (-0.09, 0.0, 0.09)])
    return VGroup(bol, bord, lentilles)


def icone_poisson():
    corps = Ellipse(width=0.36, height=0.18, color=BLEU_CALCUL, fill_color=BLEU_CALCUL,
                    fill_opacity=0.8, stroke_width=0)
    queue = Polygon([0.16, 0, 0], [0.3, 0.1, 0], [0.3, -0.1, 0],
                    color=BLEU_CALCUL, fill_color=BLEU_CALCUL, fill_opacity=0.8, stroke_width=0)
    oeil = Dot(radius=0.022, color=WHITE).move_to([-0.1, 0.03, 0])
    return VGroup(corps, queue, oeil)


class EffortBase(Scene):
    """Helpers communs (recopiés du standard lait_reunion.py)."""

    LARGEUR_SURE = 12.8  # 16:9 ; le Short redéfinit

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def T(self, texte, size=28, color=WHITE, **kw):
        """Text auto-ajusté à la largeur du cadre (sécurité anti-débordement)."""
        t = Text(texte, font_size=size, color=color, **kw)
        if t.width > self.LARGEUR_SURE:
            t.scale_to_fit_width(self.LARGEUR_SURE)
        return t

    def anim_entree(self, m, mode=None, run_time=0.8):
        """Une animation d'apparition qui CHANGE à chaque appel (anti-monotonie).
        Sans mode imposé, on tourne dans une palette variée."""
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


# ════════════════════════════════════════════════════════════════════════════════
#  SCÈNE 9:16 — le Short/Reel, rendre avec -r 1080,1920
# ════════════════════════════════════════════════════════════════════════════════

class ProteineEffort974Short(EffortBase):

    LARGEUR_SURE = 4.1

    def __init__(self, **kwargs):
        # cadre vertical : -r ne change que les pixels → on impose le cadre logique
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(**kwargs)

    # jauge des watts : 50 W (gauche) → 400 W (droite)
    Y_JAUGE = -1.15

    def x_w(self, w):
        return -1.7 + (w - 50.0) / 350.0 * 3.4

    # ── écran 1 : le défi OMS (un défi énergisant, jamais un reproche) ──────
    def ecran_defi_oms(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        badge = self.T("LA RÉUNION · EN VRAI", size=22, color=JAUNE_TITRE).move_to([0, 3.55, 0])
        gros = self.T("60 min", size=62, color=BLEU_CALCUL).move_to([0, 2.5, 0])
        # « activité physique », pas « sport » : marcher vite, danser, jouer
        # comptent aussi — c'est le libellé exact de l'OMS.
        sous = self.T("d'activité physique par jour :", size=26).move_to([0, 1.75, 0])
        defi = self.T("le défi de l'OMS aux 11-17 ans.", size=22, color=WHITE).move_to([0, 1.2, 0])
        self.play(FadeIn(badge, shift=0.3 * DOWN), GrowFromCenter(gros))
        self.play(self.anim_entree(sous, mode="fade_up"), self.anim_entree(defi, mode="fade_up"))

        # 10 ados : plus de 8 sur 10 n'y arrivent pas encore (constat, pas reproche)
        ados = VGroup(*[Circle(radius=0.14, color=VERT_OK, fill_color=VERT_OK,
                               fill_opacity=0.9, stroke_width=2).move_to([-1.8 + i * 0.4, 0.2, 0])
                        for i in range(10)])
        self.play(LaggedStart(*[FadeIn(a, scale=0.4) for a in ados], lag_ratio=0.06), run_time=1.0)
        constat1 = self.T("Dans le monde, plus de 8 sur 10", size=23).move_to([0, -0.7, 0])
        constat2 = self.T("n'y arrivent pas encore.", size=23).move_to([0, -1.15, 0])
        self.play(self.anim_entree(constat1, mode="slide_l"),
                  self.anim_entree(constat2, mode="slide_r"),
                  *[ados[i].animate.set_fill(GREY_D, opacity=0.4).set_stroke(GREY_D)
                    for i in range(8)])
        self.wait(1.0)

        appel = self.T("Alors on relève le défi :", size=22, color=BLEU_CALCUL).move_to([-0.15, -1.95, 0])
        minute = self.T("UNE minute, à fond !", size=28, color=ORANGE_RETENUE).move_to([-0.35, -2.25, 0])
        self.play(self.anim_entree(appel, mode="fade_down"))
        self.play(GrowFromCenter(minute), Flash(minute, color=ORANGE_RETENUE, flash_radius=1.2))
        self.wait(0.9)

    # ── écran 2 : le rameur, les watts qui montent ──────────────────────────
    def ecran_rameur(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        titre = self.T("1 minute à fond", size=32, color=JAUNE_TITRE).move_to([0, 3.5, 0])
        sous = self.T("sur le rameur !", size=24).move_to([0, 2.95, 0])
        self.play(GrowFromCenter(titre), FadeIn(sous, shift=0.3 * DOWN))

        machine = rameur(0.95).move_to([0, 1.6, 0])
        self.play(FadeIn(machine, shift=0.4 * RIGHT), run_time=1.0)

        # la jauge de puissance : de 50 W (tranquille) à 400 W (sprint d'athlète)
        ligne = Line([-1.7, self.Y_JAUGE, 0], [1.7, self.Y_JAUGE, 0], color=GREY_B, stroke_width=4)
        ticks = VGroup(*[Line([self.x_w(w), self.Y_JAUGE - 0.08, 0],
                              [self.x_w(w), self.Y_JAUGE + 0.08, 0],
                              color=WHITE, stroke_width=3) for w in (50, 250, 400)])
        lab_g = self.T("50 W · tranquille", size=15, color=GREY_B).move_to([-1.15, self.Y_JAUGE - 0.4, 0])
        lab_d = self.T("400 W · sprint", size=15, color=GREY_B).move_to([1.2, self.Y_JAUGE - 0.4, 0])
        self.play(Create(ligne), FadeIn(ticks), FadeIn(lab_g), FadeIn(lab_d), run_time=0.8)

        # les watts s'affichent et MONTENT (compteur + jauge qui se remplit)
        w = ValueTracker(50)
        compteur = always_redraw(lambda: Integer(int(w.get_value()), font_size=64,
                                                 color=BLEU_CALCUL).move_to([-0.35, 0.0, 0]))
        unite = self.T("watts", size=24, color=BLEU_CALCUL).move_to([0.8, -0.05, 0])

        def remplissage_jauge():
            largeur = max(0.001, self.x_w(w.get_value()) + 1.7)
            r = Rectangle(width=largeur, height=0.16, fill_color=BLEU_CALCUL,
                          fill_opacity=0.85, stroke_width=0)
            r.move_to([-1.7 + largeur / 2, self.Y_JAUGE, 0])
            return r

        remplissage = always_redraw(remplissage_jauge)
        self.add(compteur, remplissage)
        self.play(FadeIn(unite, scale=0.5), run_time=0.4)
        self.play(w.animate.set_value(250), run_time=1.6)
        compteur.clear_updaters()
        remplissage.clear_updaters()
        self.play(Flash([self.x_w(250), self.Y_JAUGE, 0], color=ORANGE_RETENUE, flash_radius=0.5))

        verdict = self.T("250 W : un très bon effort !", size=24, color=ORANGE_RETENUE) \
            .move_to([-0.2, -2.3, 0])
        self.play(self.anim_entree(verdict, mode="pop"))
        self.wait(1.0)

    # ── écran 3 : 250 W = 25 ampoules LED ───────────────────────────────────
    def ecran_ampoules(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        titre = self.T("250 watts, ça donne quoi ?", size=28, color=JAUNE_TITRE).move_to([0, 3.5, 0])
        self.play(self.anim_entree(titre, mode="fade_down"))
        l1 = self.T("Une ampoule LED ≈ 10 watts.", size=22, color=BLEU_CALCUL).move_to([0, 2.85, 0])
        self.play(self.anim_entree(l1, mode="slide_l"))

        # 25 ampoules (5 × 5), éteintes puis qui s'allument en cascade
        grille = VGroup()
        for i in range(25):
            a = ampoule()
            a.move_to([-1.04 + (i % 5) * 0.52, 1.85 - (i // 5) * 0.62, 0])
            grille.add(a)
        self.play(LaggedStart(*[FadeIn(a, scale=0.4) for a in grille], lag_ratio=0.02), run_time=0.9)

        calc = self.T("250 ÷ 10 = 25 ampoules !", size=27, color=VERT_OK).move_to([0, -1.5, 0])
        self.play(self.anim_entree(calc, mode="grow"),
                  LaggedStart(*[a[0].animate.set_fill(JAUNE_TITRE, opacity=1)
                                .set_stroke(JAUNE_TITRE) for a in grille],
                              lag_ratio=0.05), run_time=1.2)
        # Remontée à -1,95 et recentrée à gauche : à -2,15 la phrase passait
        # DERRIÈRE le margouillat du coin bas-droit (vérif image par image).
        l2 = self.T("Pendant ta minute, TU éclaires tout ça.", size=21).move_to([-0.15, -1.95, 0])
        self.play(self.anim_entree(l2, mode="fade_up"))
        l3 = self.T("Ton corps est une centrale.", size=24, color=ORANGE_RETENUE).move_to([-0.35, -2.25, 0])
        self.play(self.anim_entree(l3, mode="pop"))
        self.wait(1.0)

    # ── écran 4 : le calcul qui se déroule ──────────────────────────────────
    def ecran_calcul(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        titre = self.T("Ta minute, en chiffres", size=30, color=JAUNE_TITRE).move_to([0, 3.5, 0])
        self.play(GrowFromCenter(titre))

        l1 = self.T("1 watt = 1 joule par seconde.", size=22).move_to([0, 2.7, 0])
        self.play(self.anim_entree(l1, mode="slide_l"))
        l2 = self.T("En 60 secondes :", size=22, color=BLEU_CALCUL).move_to([0, 1.95, 0])
        self.play(self.anim_entree(l2, mode="fade_up"))
        c1 = self.T("250 × 60 = 15 000 joules", size=30, color=BLEU_CALCUL).move_to([0, 1.25, 0])
        self.play(self.anim_entree(c1, mode="grow"))
        self.play(Circumscribe(c1, color=BLEU_CALCUL))

        l3 = self.T("Une kilocalorie, c'est costaud :", size=20).move_to([0, 0.4, 0])
        conv = self.T("1 kcal = 4 184 joules", size=26).move_to([0, -0.15, 0])
        cadre = SurroundingRectangle(conv, color=WHITE, buff=0.14, corner_radius=0.1)
        self.play(self.anim_entree(l3, mode="fade_down"))
        self.play(self.anim_entree(conv, mode="pop"), Create(cadre))

        c2 = self.T("15 000 ÷ 4 184 ≈ 3,6 kcal", size=30, color=VERT_OK).move_to([0, -1.2, 0])
        self.play(self.anim_entree(c2, mode="fade_up"))
        self.play(Flash(c2, color=VERT_OK, flash_radius=1.4))

        tease = self.T("3,6 kcal... c'est beaucoup ?", size=24, color=ORANGE_RETENUE) \
            .move_to([-0.3, -2.3, 0])
        self.play(self.anim_entree(tease, mode="slide_r"))
        self.wait(1.0)

    # ── écran 5 : le gag du carré de chocolat ───────────────────────────────
    def ecran_chocolat(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        t1 = self.T("3,6 kcal,", size=32, color=BLEU_CALCUL).move_to([0, 3.5, 0])
        t2 = self.T("c'est combien de chocolat ?", size=24).move_to([0, 2.95, 0])
        self.play(self.anim_entree(t1, mode="grow"), self.anim_entree(t2, mode="fade_down"))

        carre = carre_chocolat(1.6).move_to([0, 1.2, 0])
        lab = self.T("1 carré ≈ 4,2 g ≈ 23 kcal", size=22, color=JAUNE_TITRE).move_to([0, 0.05, 0])
        self.play(FadeIn(carre, scale=0.5), run_time=0.9)
        self.play(self.anim_entree(lab, mode="fade_up"))
        self.wait(0.8)

        # on coupe : ta minute à fond, c'est CE petit bout (3,6 / 23 ≈ un sixième)
        part = 1.6 * 3.6 / 23.0  # ≈ 0,25 : la part du carré
        coupe = DashedLine([-0.8 + part, 0.4, 0], [-0.8 + part, 2.0, 0],
                           color=WHITE, stroke_width=3)
        morceau = Rectangle(width=part, height=1.6, color=VERT_OK, fill_color=CHOCOLAT,
                            fill_opacity=1, stroke_width=4).move_to([-0.8 + part / 2, 1.2, 0])
        self.play(Create(coupe))
        self.play(carre.animate.set_opacity(0.25), FadeIn(morceau, scale=0.6))
        legende = self.T("Ta minute à fond = ce petit bout.", size=22, color=VERT_OK) \
            .move_to([0, -0.85, 0])
        self.play(self.anim_entree(legende, mode="slide_l"))
        self.wait(0.8)

        # la chute
        chute = self.T("Même pas UN carré...", size=28, color=ORANGE_RETENUE).move_to([0, -1.7, 0])
        chute2 = self.T("à peine un sixième !", size=28, color=ORANGE_RETENUE).move_to([0, -2.25, 0])
        self.play(GrowFromCenter(chute))
        self.play(self.anim_entree(chute2, mode="pop"))
        tease = self.T("Mais attends... ce n'est pas fini.", size=21, color=BLEU_CALCUL) \
            .move_to([-0.35, -1.95, 0])
        self.play(self.anim_entree(tease, mode="fade_up"))
        self.wait(1.0)

    # ── écran 6 : le rebond — rendement 25 %, le corps a brûlé ×4 ───────────
    def ecran_rendement(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        titre = self.T("Ton muscle : rendement 25 %", size=27, color=JAUNE_TITRE).move_to([0, 3.5, 0])
        self.play(self.anim_entree(titre, mode="fade_down"))

        # 4 joules brûlés : 1 devient mouvement (vert), 3 deviennent chaleur (orange)
        carres = VGroup(*[Square(side_length=0.6, color=WHITE, fill_color=GREY_D,
                                 fill_opacity=0.5, stroke_width=3).move_to([-1.2 + i * 0.8, 2.3, 0])
                          for i in range(4)])
        self.play(LaggedStart(*[GrowFromCenter(c) for c in carres], lag_ratio=0.12), run_time=0.9)
        l1 = self.T("Sur 4 joules brûlés...", size=22).move_to([0, 1.5, 0])
        self.play(self.anim_entree(l1, mode="slide_l"))

        self.play(carres[0].animate.set_fill(VERT_OK, opacity=0.9))
        lab_m = self.T("1 seul devient mouvement", size=21, color=VERT_OK).move_to([0, 0.85, 0])
        self.play(self.anim_entree(lab_m, mode="fade_up"))
        self.play(*[c.animate.set_fill(ORANGE_RETENUE, opacity=0.9) for c in carres[1:]])
        lab_c = self.T("3 te réchauffent !", size=21, color=ORANGE_RETENUE).move_to([0, 0.25, 0])
        self.play(self.anim_entree(lab_c, mode="pop"))

        calc = self.T("Ton corps a donc brûlé 4 × plus :", size=22).move_to([0, -0.75, 0])
        total = self.T("3,6 × 4 ≈ 14,4 kcal !", size=32, color=VERT_OK).move_to([0, -1.45, 0])
        self.play(self.anim_entree(calc, mode="fade_down"))
        self.play(self.anim_entree(total, mode="grow"))
        self.play(Flash(total, color=VERT_OK, flash_radius=1.4))
        note = self.T("Voilà pourquoi tu as chaud.", size=21, color=BLEU_CALCUL) \
            .move_to([-0.35, -2.3, 0])
        self.play(self.anim_entree(note, mode="slide_r"))
        self.wait(1.0)

    # ── écran 7 : la récup — les protéines de l'assiette ────────────────────
    def ecran_assiette(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        titre = self.T("La récup, maintenant !", size=30, color=JAUNE_TITRE).move_to([0, 3.5, 0])
        self.play(GrowFromCenter(titre))
        l1 = self.T("L'effort a fatigué tes muscles.", size=21).move_to([0, 2.85, 0])
        l2 = self.T("Pour se réparer : des protéines.", size=22, color=BLEU_CALCUL).move_to([0, 2.35, 0])
        self.play(self.anim_entree(l1, mode="slide_l"))
        self.play(self.anim_entree(l2, mode="fade_up"))

        # l'assiette : un œuf au plat dessiné
        plat = oeuf_au_plat().move_to([0, 1.2, 0])
        self.play(FadeIn(plat[0], shift=0.3 * UP), run_time=0.6)
        self.play(FadeIn(plat[1], scale=0.5), GrowFromCenter(plat[2]))
        lab_oeuf = self.T("1 œuf ≈ 6,5 g de protéines", size=25, color=VERT_OK).move_to([0, 0.35, 0])
        self.play(self.anim_entree(lab_oeuf, mode="grow"))
        self.play(Circumscribe(lab_oeuf, color=VERT_OK))

        # le reste de l'assiette (jamais de poudres : la vraie nourriture)
        lignes = VGroup(
            VGroup(icone_verre(), self.T("un verre de lait ≈ 8 g", size=21)).arrange(RIGHT, buff=0.25),
            VGroup(icone_bol(), self.T("100 g de lentilles cuites ≈ 9 g", size=21)).arrange(RIGHT, buff=0.25),
            VGroup(icone_poisson(), self.T("100 g de poisson ≈ 20 g", size=21)).arrange(RIGHT, buff=0.25),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.32).move_to([-0.1, -1.15, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=0.4 * RIGHT) for l in lignes], lag_ratio=0.3),
                  run_time=1.1)

        b1 = self.T("Un sportif en mange 1,2 à 1,6 g", size=20).move_to([-0.35, -2.3, 0])
        b2 = self.T("par kilo, chaque jour.", size=20).move_to([-0.35, -2.25, 0])
        self.play(self.anim_entree(b1, mode="fade_up"), self.anim_entree(b2, mode="fade_up"))
        self.wait(1.2)

    # ── écran 8 : la morale + le carton ─────────────────────────────────────
    def ecran_carton(self):
        self.clear()
        m = MascotteMargouillat().scale(0.85).move_to([0, -1.3, 0])
        self.add(m)
        m1 = self.T("L'effort, c'est des maths.", size=30).move_to([0, 3.1, 0])
        m2 = self.T("La récup aussi.", size=30, color=JAUNE_TITRE).move_to([0, 2.5, 0])
        self.play(self.anim_entree(m1, mode="slide_l"))
        self.play(self.anim_entree(m2, mode="slide_r"))

        appel = self.T("Calcule TON effort :", size=22, color=BLEU_CALCUL).move_to([0, 1.55, 0])
        url = self.T("eleveai.fr/effort", size=40, color=VERT_OK).move_to([0, 0.85, 0])
        self.play(self.anim_entree(appel, mode="fade_down"))
        self.play(GrowFromCenter(url), Flash(url, color=VERT_OK, flash_radius=1.6))

        # ⚠️ Le cadre s'arrête à y = -4 : la signature à -3,7 était ROGNÉE au
        # rendu (vérif image par image, 24/07). Tout le pied remonte.
        credit1 = self.T("Né d'une rencontre avec le coach principal", size=15, color=GREY_B) \
            .move_to([-0.35, -2.25, 0])
        credit2 = self.T("d'une salle de sport de Saint-Pierre.", size=15, color=GREY_B) \
            .move_to([-0.35, -1.95, 0])
        sig = self.T(SIGNATURE, size=16, color=VERT_OK).move_to([-0.35, -1.95, 0])
        self.play(FadeIn(credit1), FadeIn(credit2))
        self.play(Write(sig))
        self.wait(1.3)

    def construct(self):
        self.ecran_defi_oms()
        self.ecran_rameur()
        self.ecran_ampoules()
        self.ecran_calcul()
        self.ecran_chocolat()
        self.ecran_rendement()
        self.ecran_assiette()
        self.ecran_carton()
