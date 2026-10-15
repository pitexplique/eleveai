# famille_coccinelle_short.py
# EleveAI — CP, calcul mental : le short « La famille Coccinelle » (compléments à 10).
#
# ⭐ 26/09/2026 — né de la planche de BD des automatismes du CP. Frédéric :
# « je n'ai pas envie de remplir des caisses mais d'en faire une FAMILLE » —
# la dizaine n'est pas une boîte de dix, c'est une famille de dix coccinelles
# qui rentre sur sa feuille. Puis : « la dernière image, fais-en moi un short ».
# Script de la voix validé par lui le 26/09 (« lance le short ! »).
#
# ⭐ Le style est celui de la planche : coloré, naïf, nature, lumineux — un fond
# de ciel et de prairie, pas le fond noir des autres shorts. Le texte est donc à
# l'ENCRE BRUNE, jamais en blanc.
# ⭐ Ti Margo est le visuel OFFICIEL (les PNG du cahier de vacances) : il montre
# la feuille du doigt pour poser la question, lève le pouce pour la réponse.
# ⛔ Son copain n'apparaît pas encore : il sera dessiné plus tard (Frédéric,
# 26/09 : « le copain, on verra demain »).
# ⛔ Aucune étiquette d'âge ni de classe à l'écran (règle du 06/09).
#
# Voix : powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/cp-maths-short-famille-coccinelle.json -Debit -10
# Rendu :
#   python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/famille_coccinelle_short.py FamilleCoccinelleShort -o eleveai-maths-cp-short-famille-coccinelle --media_dir manim/scripts/cp/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import ShortBases
from gabarit_seconde import SONS

RACINE = Path(__file__).resolve().parents[3]
MARGO_MONTRE = RACINE / "public" / "cahier-vacances" / "ti-margo-cahier-sac-a-dos.png"
MARGO_POUCE = RACINE / "public" / "cahier-vacances" / "ti-margo.png"

ENCRE = "#3B2A1A"
CIEL = "#C9F0FF"
PRE_CLAIR = "#B7E4A0"
PRE = "#74C69D"
FEUILLE = "#95D5B2"
NERVURE = "#52B788"
PLACE = "#D8F3DC"
ROUGE_COCCI = "#E63946"
SOLEIL = "#FFD23F"

# La feuille : deux rangées de cinq places — la « boîte de dix » du CP, en nature.
LARG_F, HAUT_F = 4.1, 2.0
CENTRE_F = np.array([0.0, 0.35, 0.0])
PAS_X, PAS_Y = 0.66, 0.72


def place(k):
    """Le centre de la k-ième place : la rangée du haut d'abord, de gauche à droite."""
    r, c = divmod(k, 5)
    return CENTRE_F + np.array([(c - 2) * PAS_X, (0.5 - r) * PAS_Y, 0.0])


def coccinelle(taille=0.27, yeux=False):
    """Une coccinelle vue de dessus : tête noire, élytres rouges, quatre points."""
    corps = Ellipse(width=taille * 2, height=taille * 1.7, fill_color=ROUGE_COCCI, fill_opacity=1,
                    stroke_color=ENCRE, stroke_width=3)
    tete = Circle(radius=taille * 0.45, fill_color=ENCRE, fill_opacity=1, stroke_width=0).move_to(
        [0, taille * 0.78, 0])
    raie = Line([0, taille * 0.72, 0], [0, -taille * 0.85, 0], color=ENCRE, stroke_width=3)
    points = VGroup(*[
        Dot([dx * taille, dy * taille, 0], radius=taille * 0.16, color=ENCRE)
        for dx, dy in ((-0.45, 0.12), (0.45, 0.12), (-0.35, -0.45), (0.35, -0.45))
    ])
    g = VGroup(tete, corps, raie, points)
    if yeux:
        g.add(Dot([-taille * 0.18, taille * 0.86, 0], radius=taille * 0.1, color=WHITE),
              Dot([taille * 0.18, taille * 0.86, 0], radius=taille * 0.1, color=WHITE))
    return g


class FamilleCoccinelleShort(ShortBases):
    """LE COMPLÉMENT À 10 — sept petits sont rentrés, combien en manque-t-il ?"""

    dossier_voix = SONS / "cp-maths-short-famille-coccinelle"

    # ── le décor ────────────────────────────────────────────────────────────

    def decor(self):
        w, h = config.frame_width, config.frame_height
        ciel = Rectangle(width=w + 0.2, height=h + 0.2, fill_color=CIEL, fill_opacity=1, stroke_width=0)
        soleil = Circle(radius=0.34, fill_color=SOLEIL, fill_opacity=1, stroke_color=ENCRE,
                        stroke_width=3).move_to([1.8, 3.62, 0])
        rayons = VGroup(*[
            Line(soleil.get_center() + 0.45 * np.array([np.cos(a), np.sin(a), 0]),
                 soleil.get_center() + 0.6 * np.array([np.cos(a), np.sin(a), 0]),
                 color="#FFB703", stroke_width=6)
            for a in np.linspace(0, TAU, 10, endpoint=False)
        ])
        colline = VMobject(fill_color=PRE_CLAIR, fill_opacity=1, stroke_color=ENCRE, stroke_width=3)
        colline.set_points_smoothly(np.array([[-2.5, -0.9, 0], [-1.2, -0.5, 0], [0.2, -0.85, 0], [1.4, -0.6, 0], [2.5, -0.8, 0]], dtype=float))
        for q in ([2.5, -4.2, 0], [-2.5, -4.2, 0], [-2.5, -0.9, 0]):
            colline.add_line_to(np.array(q, dtype=float))
        pre = VMobject(fill_color=PRE, fill_opacity=1, stroke_color=ENCRE, stroke_width=3)
        pre.set_points_smoothly(np.array([[-2.5, -1.9, 0], [-1.0, -1.65, 0], [0.6, -1.95, 0], [2.5, -1.7, 0]], dtype=float))
        for q in ([2.5, -4.2, 0], [-2.5, -4.2, 0], [-2.5, -1.9, 0]):
            pre.add_line_to(np.array(q, dtype=float))
        fleurs = VGroup()
        for x, y, c in ((-1.9, -2.05, "#FF595E"), (1.95, -2.1, "#C77DFF"), (-0.1, -2.25, "#FFCA3A")):
            tige = Line([x, y, 0], [x, y - 0.35, 0], color="#2D6A4F", stroke_width=4)
            petales = VGroup(*[Circle(radius=0.09, fill_color=c, fill_opacity=1, stroke_color=ENCRE,
                                      stroke_width=2).move_to([x + 0.12 * np.cos(a), y + 0.12 * np.sin(a), 0])
                               for a in np.linspace(0, TAU, 5, endpoint=False)])
            coeur = Circle(radius=0.07, fill_color=SOLEIL, fill_opacity=1, stroke_color=ENCRE, stroke_width=2).move_to([x, y, 0])
            fleurs.add(VGroup(tige, petales, coeur))
        return VGroup(ciel, rayons, soleil, colline, pre, fleurs)

    def feuille(self):
        """La grande feuille, sa nervure, et ses dix places en pointillés."""
        g, d = CENTRE_F + LEFT * LARG_F / 2, CENTRE_F + RIGHT * LARG_F / 2
        haut = ArcBetweenPoints(g, d, angle=-1.15)
        bas = ArcBetweenPoints(d, g, angle=-1.15)
        limbe = VMobject(fill_color=FEUILLE, fill_opacity=1, stroke_color=ENCRE, stroke_width=4)
        limbe.set_points(np.concatenate([haut.points, bas.points]))
        queue = Line(d, d + np.array([0.3, -0.25, 0]), color=ENCRE, stroke_width=5)
        nervure = Line(g + RIGHT * 0.2, d + LEFT * 0.2, color=NERVURE, stroke_width=3)
        places = VGroup(*[
            DashedVMobject(Ellipse(width=0.56, height=0.5, stroke_color=ENCRE, stroke_width=2.5)
                           .set_fill(PLACE, 1).move_to(place(k)), num_dashes=16)
            for k in range(10)
        ])
        fonds = VGroup(*[Ellipse(width=0.56, height=0.5, stroke_width=0, fill_color=PLACE, fill_opacity=1)
                         .move_to(place(k)) for k in range(10)])
        return VGroup(limbe, queue, nervure, fonds, places), places

    def texte(self, t, taille=40, couleur=ENCRE, y=2.75):
        return self.grand(t, font_size=taille, color=couleur).move_to([0, y, 0])

    def titre2(self, haut, bas, couleur):
        """Deux lignes de titre ; ⛔ au premier rendu (26/09), posées à 0,65 d'écart
        seulement, elles se chevauchaient."""
        l1 = self.grand(haut, font_size=44, color=ENCRE)
        l2 = self.grand(bas, font_size=52, color=couleur)
        return VGroup(l1, l2).arrange(DOWN, buff=0.12).move_to([-0.1, 2.6, 0])

    def margo(self, chemin, hauteur=1.9):
        return ImageMobject(str(chemin)).set_height(hauteur).move_to([-1.2, -2.75, 0])

    # ── la scène ────────────────────────────────────────────────────────────

    def construct(self):
        self.add(self.decor())
        feuille, places = self.feuille()
        petits = VGroup(*[coccinelle().move_to(place(k)) for k in range(7)])
        maman = coccinelle(0.34, yeux=True).move_to([-1.55, 1.45, 0])
        mot_maman = Text("maman", font_size=22, color=ENCRE, weight=BOLD).next_to(maman, RIGHT, buff=0.1)
        titre = self.titre2("Il en manque", "combien ?", ROUGE_COCCI)
        margo = self.margo(MARGO_MONTRE)

        # 0. ⭐ L'image de la PREMIÈRE seconde porte déjà toute la question.
        self.add(feuille, petits, maman, mot_maman, titre, margo)
        self.dire("00-accroche")
        self.play(Wiggle(maman, scale_value=1.15), run_time=1.2)
        self.attendre_voix(marge=0.3)

        # 1. On compte les sept, puis les trois places vides clignotent.
        self.dire("01-feuille")
        nombres = VGroup()
        for k, c in enumerate(petits):
            n = Text(str(k + 1), font_size=22, color=ENCRE, weight=BOLD).next_to(c, DOWN, buff=0.02)
            nombres.add(n)
            self.play(Indicate(c, color="#FF8C42", scale_factor=1.25), FadeIn(n), run_time=0.32)
        vides = VGroup(*[places[k] for k in range(7, 10)])
        self.play(vides.animate.set_stroke("#FF8C42", width=5), run_time=0.4)
        for _ in range(2):
            self.play(vides.animate.set_stroke(opacity=0.15), run_time=0.3)
            self.play(vides.animate.set_stroke(opacity=1), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # 2. Trois secondes, sans les doigts.
        self.dire("02-compte")
        self.play(FadeOut(nombres), run_time=0.3)
        for s in ("3", "2", "1"):
            chiffre = Text(s, font_size=110, color="#FF8C42", weight=BOLD).move_to([1.0, -1.25, 0])
            self.play(FadeIn(chiffre, scale=1.6), run_time=0.25)
            self.wait(0.6)
            self.play(FadeOut(chiffre), run_time=0.15)
        self.attendre_voix(marge=0.2)

        # 3. Les trois petits arrivent en volant ; Ti Margo lève le pouce.
        self.dire("03-reponse")
        margo2 = self.margo(MARGO_POUCE)
        arrivees = VGroup(*[coccinelle().move_to([2.8 + 0.5 * i, 3.6 - 0.5 * i, 0]) for i in range(3)])
        self.play(FadeOut(margo), FadeIn(margo2), run_time=0.3)
        self.play(LaggedStart(*[
            MoveAlongPath(c, ArcBetweenPoints(c.get_center(), place(7 + i), angle=0.9))
            for i, c in enumerate(arrivees)
        ], lag_ratio=0.35), run_time=1.8)
        egal = VGroup(
            Text("7", font_size=64, color=ENCRE, weight=BOLD),
            Text("+", font_size=64, color=ENCRE),
            Text("3", font_size=64, color=ROUGE_COCCI, weight=BOLD),
            Text("=", font_size=64, color=ENCRE),
            Text("10", font_size=64, color="#2D6A4F", weight=BOLD),
        ).arrange(RIGHT, buff=0.14)
        egal.scale_to_fit_width(min(egal.width, 3.0)).move_to([0.45, -1.25, 0])
        self.play(Write(egal), run_time=0.8)
        famille = VGroup(petits, arrivees)
        self.play(Flash(egal[4], color=SOLEIL, line_length=0.35, flash_radius=0.45),
                  famille.animate.scale(1.04), run_time=0.6)
        self.play(famille.animate.scale(1 / 1.04), run_time=0.3)
        titre2 = self.titre2("La famille est", "au complet !", "#2D6A4F")
        self.play(FadeOut(titre), FadeIn(titre2), run_time=0.4)
        self.attendre_voix(marge=0.4)

        # 4. Le défi : quatre repartent se promener, il en reste six.
        self.dire("04-defi")
        titre3 = self.titre2("Défi de", "Ti Margo", "#7209B7")
        repartent = VGroup(arrivees, petits[6])
        self.play(FadeOut(titre2), FadeIn(titre3), FadeOut(egal), FadeOut(margo2), FadeIn(margo), run_time=0.4)
        self.play(LaggedStart(*[c.animate.move_to([3.2, 4.8 + 0.3 * i, 0]) for i, c in enumerate(repartent)],
                              lag_ratio=0.2), run_time=1.3)
        question = VGroup(
            Text("6", font_size=64, color=ENCRE, weight=BOLD),
            Text("+", font_size=64, color=ENCRE),
            Text("?", font_size=70, color="#7209B7", weight=BOLD),
            Text("=", font_size=64, color=ENCRE),
            Text("10", font_size=64, color="#2D6A4F", weight=BOLD),
        ).arrange(RIGHT, buff=0.14)
        question.scale_to_fit_width(min(question.width, 3.0)).move_to([0.45, -1.25, 0])
        self.play(Write(question), run_time=0.8)
        self.play(Indicate(question[2], color="#7209B7", scale_factor=1.4), run_time=0.8)
        self.attendre_voix(marge=1.0)

        # 5. La fin commune des shorts : le coach et l'abonnement.
        self.ecran_renvoi()
