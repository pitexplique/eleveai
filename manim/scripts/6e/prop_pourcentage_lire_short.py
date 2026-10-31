# prop_pourcentage_lire_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 12 « Lire un pourcentage »
# (micro pourcentage_lire). CEINTURE BLANCHE (règle du short blanc, REGLES.md) :
# on VOIT le pourcentage, aucun calcul.
# Il AMUSE : « Ton tee-shirt cache des maths. Regarde l'étiquette ! »
#   · EN HAUT, l'image : le tee-shirt, coupé en 10 bandes, se colorie bande
#     après bande (bleu = coton, orange = polyester) ; l'étiquette grandit ;
#   · EN BAS, au même instant, les 100 cases (BarrePourcent) se colorient
#     rangée après rangée, avec LE MÊME code couleur : 6 rangées de coton
#     (60 cases), 4 rangées de polyester (40 cases) ;
#   · 1 question-pause (3 s) : combien de polyester dans 100 g ? (40 g ;
#     leurres 60 g = la mauvaise ligne de l'étiquette, 4 g = 40 % lu 4) ;
#   · fin : « Un sweat de 200 g à 60 % de coton : combien de grammes ? »
#     (120 g) en commentaire.
# Centres d'intérêt : mode. Composition inventée (60 % coton, 40 % polyester :
# un mélange courant des étiquettes) : pas de donnée réelle à sourcer.
# Ajouté ICI (absent du module) : tee_shirt_bandes() (le tee-shirt en 10
# bandes, par intersection), sweat().
#
# Voix : manim/voix/6e-prop-pourcentage-lire-short.json (validée, débit −10) ;
# WAV : public/sons/6e-prop-pourcentage-lire-short/ ; marques :
# manim/scripts/6e/prop_pourcentage_lire_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_pourcentage_lire_short.py PropPourcentageLireShort6e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_pourcentage_lire_short.py PropPourcentageLireShort6e -o eleveai-maths-6e-prop-pourcentage-lire-short --media_dir manim/media-prop-12
# Sortie : manim/sorties/6e/maths/proportionnalite/12-pourcentage-lire/eleveai-maths-6e-prop-pourcentage-lire-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from prop_pourcentage_lire import tee_shirt  # noqa: E402

COTON = "#60a5fa"
POLY = "#fb923c"
BLANC_T = "#f8fafc"


def tee_shirt_bandes(l=1.6, centre=ORIGIN):
    """Le tee-shirt découpé en 10 bandes horizontales (du haut vers le bas),
    blanches au départ, + son contour. .bandes[r] · .contour."""
    forme = tee_shirt(l).move_to(centre)
    haut, bas = forme.get_top()[1], forme.get_bottom()[1]
    h = (haut - bas) / 10
    bandes = VGroup()
    for r in range(10):
        rect = Rectangle(width=forme.width + 0.2, height=h + 0.025).move_to(P(forme.get_x(), haut - h * (r + 0.5)))
        b = Intersection(forme, rect, fill_color=BLANC_T, fill_opacity=1, stroke_width=0)
        bandes.add(b)
    contour = forme.copy().set_fill(opacity=0).set_stroke("#1e3a8a", 4)
    g = VGroup(bandes, contour)
    g.bandes, g.contour = bandes, contour
    return g


def sweat(l=1.9, couleur=COTON):
    """Un sweat à manches longues (polygone)."""
    pts = [(-0.45, 0.75), (-0.16, 0.75), (0, 0.6), (0.16, 0.75), (0.45, 0.75), (0.8, 0.3), (0.95, -0.6),
           (0.72, -0.66), (0.6, -0.05), (0.45, 0.15), (0.45, -0.78), (-0.45, -0.78), (-0.45, 0.15), (-0.6, -0.05),
           (-0.72, -0.66), (-0.95, -0.6), (-0.8, 0.3)]
    k = l / 1.9
    corps = Polygon(*[P(x * k, y * k) for x, y in pts], fill_color=couleur, fill_opacity=1, stroke_color="#1e3a8a",
                    stroke_width=4)
    poche = RoundedRectangle(width=0.55 * k, height=0.3 * k, corner_radius=0.06, fill_color="#3b82f6",
                             fill_opacity=1, stroke_color="#1e3a8a", stroke_width=2).move_to(P(0, -0.45 * k))
    return VGroup(corps, poche)


class PropPourcentageLireShort6e(ShortProp):
    nom_voix = "6e-prop-pourcentage-lire-short"
    fichier_marques = "prop_pourcentage_lire_short_marques.json"
    ceinture = "blanche"

    def colorier_ensemble(self, rangees, couleur, run_time):
        """Les rangées du tableau de 100 cases ET les bandes du tee-shirt de
        même numéro, ensemble (l'œil descend de la bande à la rangée)."""
        idx = [r * 10 + c for r in rangees for c in range(10)]
        a = self.pc.grille.colorier(idx, couleur=couleur, lag=0.03, run_time=run_time)
        b = LaggedStart(*[self.ts.bandes[r].animate.set_fill(couleur, 1) for r in rangees],
                        lag_ratio=0.75, run_time=run_time)
        return a, b

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("L'étiquette du tee-shirt", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [margo, titre, badge]
        self.ts = ts = tee_shirt_bandes(1.3, centre=P(-1.4, 1.55))
        self.pc = pc = BarrePourcent(60, mode="cases", cote=0.29, etiquette=False, couleur=COTON)
        self.caser_bas(pc)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), run_time=0.6)
        self.au_mot("tee-shirt")
        self.play(FadeIn(ts, shift=UP * 0.2), run_time=0.5)
        self.au_mot("maths")
        self.play(FadeIn(pc, shift=UP * 0.2), run_time=0.5)
        mini = Rectangle(width=0.22, height=0.14, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8",
                         stroke_width=2).move_to(ts.contour.get_top() + DOWN * 0.3)
        carte = RoundedRectangle(width=2.45, height=1.45, corner_radius=0.12, fill_color=WHITE, fill_opacity=1,
                                 stroke_color="#94a3b8", stroke_width=3).move_to(P(0.68, 1.55))
        self.au_mot("Regarde")
        self.play(FadeIn(mini, scale=0.5), run_time=0.3)
        self.play(Indicate(mini, color=AMBRE, scale_factor=1.8), run_time=0.5)
        self.play(ReplacementTransform(mini.copy(), carte), run_time=0.6)
        self.add(mini)
        self.attendre_voix(marge=0.2)

        # ── 01 : l'étiquette se lit, tout se colorie ──
        self.dire("01-etiquette")
        l1 = VGroup(Text("Coton :", font_size=30, color=NUIT, weight=BOLD),
                    Text("60 %", font_size=30, color="#1d4ed8", weight=BOLD)).arrange(RIGHT, buff=0.12)
        l2 = VGroup(Text("Polyester :", font_size=30, color=NUIT, weight=BOLD),
                    Text("40 %", font_size=30, color="#c2410c", weight=BOLD)).arrange(RIGHT, buff=0.12)
        l3 = VGroup(Text("Poids :", font_size=30, color=NUIT, weight=BOLD),
                    Text("100 g", font_size=30, color=NUIT, weight=BOLD)).arrange(RIGHT, buff=0.12)
        lignes = VGroup(l1, l2, l3).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        lignes.scale_to_fit_width(min(lignes.width, carte.width - 0.25)).move_to(carte)
        l3[0].sans_synchro = True  # « Poids : » : le mot « pèse » de la voix
        self.au_mot("Coton")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("60 %")
        a, b = self.colorier_ensemble(range(6), COTON, 1.6)
        self.play(FadeIn(l1[1], scale=1.3), a, b, run_time=1.6)
        self.au_mot("Polyester")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("40 %")
        a, b = self.colorier_ensemble(range(6, 10), POLY, 1.2)
        self.play(FadeIn(l2[1], scale=1.3), a, b, run_time=1.2)
        self.au_mot("pèse")
        self.play(FadeIn(l3[0], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("100 g")
        self.play(FadeIn(l3[1], scale=1.3), Circumscribe(ts, color=AMBRE, buff=0.06), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 02 : 60 %, c'est 60 sur 100 ──
        self.dire("02-lire")
        lg1 = self.ligne([("60 %", COTON), ("=", WHITE), ("60 sur", WHITE), ("100", WHITE)], 38).move_to(P(0, 1.95))
        self.play(FadeOut(VGroup(ts, mini, carte, lignes)), run_time=0.3)
        self.poser_lignes(lg1, "fade", 0.3)
        self.play(Circumscribe(lg1, color=COTON), run_time=0.5)
        lg2 = self.ligne([("100 g", WHITE), ("de tissu", WHITE), ("→", WHITE), ("60 g", COTON), ("de coton", COTON)],
                         28, buff=0.12).move_to(P(0, 1.2))
        cadre = SurroundingRectangle(VGroup(*[pc.grille.cases[r][c] for r in range(6) for c in range(10)]),
                                     color=AMBRE, buff=0.04, stroke_width=6)
        self.au_mot("Dans 100 g")
        self.play(FadeIn(lg2[0], shift=RIGHT * 0.15), Circumscribe(pc.grille.liste, color=AMBRE, buff=0.05),
                  run_time=0.5)
        self.poser_lignes(VGroup(lg2[1]), "fade", 0.3)
        self.au_mot("60 g de coton")
        self.play(FadeIn(lg2[2:4], shift=RIGHT * 0.15), Create(cadre), run_time=0.4)
        self.poser_lignes(VGroup(lg2[4]), "fade", 0.3)
        self.attendre_voix(marge=0.2)

        # ── 03 : la question-pause (3 s) ──
        self.vider(garder)
        self.question_pause("03-question", "03b-reponse", ["Combien de polyester", "dans ce tee-shirt de 100 g ?"],
                            [self.t("40 g", 30), self.t("60 g", 30), self.t("4 g", 30)], 0,
                            ["40 %, c'est 40 g sur 100 g."], mot_q="Combien")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-commentaire")
        sw = sweat(2.0).move_to(P(0, 1.35))
        q1 = self.ligne([("Un sweat de", WHITE), ("200 g", AMBRE)], 36).move_to(P(0, 0.05))
        self.au_mot("Un sweat")
        self.play(FadeIn(sw, shift=UP * 0.2), FadeIn(q1[0], shift=RIGHT * 0.15), run_time=0.5)
        q2 = self.ligne([("60 %", COTON), ("de coton", WHITE)], 36).move_to(P(0, -0.6))
        q3 = self.ligne([("Combien de grammes", WHITE), ("de coton ?", COTON)], 30).arrange(DOWN, buff=0.1)
        q3.move_to(P(0, -1.45))
        self.poser_lignes(VGroup(q1[1]), "fade", 0.3)
        self.poser_lignes(q2, "fade", 0.3)
        self.au_mot("Combien")
        self.play(FadeIn(q3, shift=UP * 0.15), run_time=0.4)
        self.insister(q3, 1.1)
        self.appel_commentaire(y=-2.45)
