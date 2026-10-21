# proba_va_loi_short.py
# EleveAI — Maths STMG ET Maths 1re spé — short jumeau de
# « Dresser la loi de probabilité d'une variable aléatoire ».
# CEINTURE JAUNE. Il AMUSE : deux dés, la somme 2 et la somme 7 ont-elles la
# même chance ? Non : la grille des 36 cas le montre d'un coup d'œil.
#   · en HAUT : les deux dés qui roulent, puis la grille 6 × 6 des 36 cas (les
#     faces des dés en tête de ligne et de colonne) : la case (1, 1) seule
#     s'allume pour la somme 2, la diagonale de 6 cases pour la somme 7 ;
#   · en BAS, EN MÊME TEMPS : « Somme 2 : 1 seul cas », les couples de la
#     somme 7 un par un, « 6 cas sur 36 », « 6 fois plus probable » ;
#   · fin : la question (la somme 12) et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne ni de classe à l'écran :
# UN seul rendu, copié dans les dossiers STMG et 1re spé.
#
# Voix : manim/voix/stmg-premiere-spe-proba-va-loi-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_loi_short.py ShortProbaVaLoi -o eleveai-maths-stmg-proba-va-loi-short --media_dir manim/scripts/stmg/media-va_loi
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/24-va-loi/ et, sous le nom
# eleveai-maths-premiere-proba-va-loi-short.mp4, dans manim/sorties/premiere/maths/probabilites/24-va-loi/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_va_loi import P  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import ANNEAU, BORD, SURLIGNE  # noqa: E402

LARGEUR_MAX = 4.1
COUL_2 = "#F97316"   # la somme 2 (orange)
COUL_7 = "#22C55E"   # la somme 7 (vert)
CASE = "#1E293B"

POINTS = {1: [(0, 0)], 2: [(-1, 1), (1, -1)], 3: [(-1, 1), (0, 0), (1, -1)],
          4: [(-1, 1), (1, 1), (-1, -1), (1, -1)], 5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)],
          6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)]}


def de(n, c=0.9, couleur=WHITE, point="#0F172A"):
    """Une face de dé : carré arrondi, n points."""
    fond = RoundedRectangle(width=c, height=c, corner_radius=c * 0.18, fill_color=couleur, fill_opacity=1,
                            stroke_color="#94A3B8", stroke_width=2)
    pts = VGroup(*[Dot(P(x * c * 0.27, y * c * 0.27), radius=c * 0.085, color=point) for x, y in POINTS[n]])
    return VGroup(fond, pts)


class Grille(VGroup):
    """La grille des 36 cas : dé rouge en tête de ligne, dé bleu en tête de
    colonne, 36 cases sombres. `case(i, j)` : le dé rouge fait i, le bleu j."""

    def __init__(self, c=0.46, **kw):
        super().__init__(**kw)
        self.cases = {}
        fonds = VGroup()
        for i in range(1, 7):
            for j in range(1, 7):
                r = Square(side_length=c, fill_color=CASE, fill_opacity=1, stroke_color=BORD, stroke_width=1.5)
                r.move_to(P(j * c, -i * c))
                self.cases[(i, j)] = r
                fonds.add(r)
        self.tetes_l = VGroup(*[de(i, c * 0.8, "#FECACA").move_to(P(0, -i * c)) for i in range(1, 7)])
        self.tetes_c = VGroup(*[de(j, c * 0.8, "#BFDBFE").move_to(P(j * c, 0)) for j in range(1, 7)])
        self.fonds = fonds
        self.add(fonds, self.tetes_l, self.tetes_c)

    def case(self, i, j):
        return self.cases[(i, j)]

    def allumer(self, i, j, couleur):
        return self.case(i, j).animate.set_fill(couleur, 1).set_stroke(WHITE, 3)


class ShortProbaVaLoi(Short6e):
    ceinture = "jaune"
    nom_voix = "stmg-premiere-spe-proba-va-loi-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, weight=NORMAL):
        t = Text(texte, font_size=font_size, color=color, weight=weight)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ajuster(self, g, largeur=LARGEUR_MAX):
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def rouler(self, d1, d2, faces=((3, 5), (6, 2), (4, 4), (1, 1))):
        """Les dés roulent : ils tournent et changent de face."""
        for a, b in faces:
            n1 = de(a, d1.width / 1.0, "#FECACA").move_to(d1)
            n2 = de(b, d2.width / 1.0, "#BFDBFE").move_to(d2)
            self.play(Rotate(d1, PI / 2), Rotate(d2, -PI / 2), run_time=0.14)
            d1.become(n1)
            d2.become(n2)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : deux dés, 2 et 7 même chance ? ──
        self.dire("00-accroche")
        titre = self.grand("Deux dés", font_size=52, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        d1 = de(3, 1.15, "#FECACA").move_to(P(-0.85, 0.85))
        d2 = de(5, 1.15, "#BFDBFE").move_to(P(0.85, 0.85))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(d1, shift=LEFT), FadeIn(d2, shift=RIGHT),
                  run_time=0.6)
        self.rouler(d1, d2, ((6, 2), (4, 4), (2, 6), (5, 3)))
        self.au_mot("La somme 2")
        s2 = self.t("Somme 2", 42, COUL_2, weight=BOLD)
        s7 = self.t("Somme 7", 42, COUL_7, weight=BOLD)
        s2.move_to(P(0, -0.35))
        s7.move_to(P(0, -0.95))
        self.play(FadeIn(s2, scale=1.5), run_time=0.35)
        self.au_mot("la somme 7")
        self.play(FadeIn(s7, scale=1.5), run_time=0.35)
        self.au_mot("même chance")
        q = self.t("Même chance ?", 46, JAUNE_TITRE, weight=BOLD).move_to(P(0, -1.7))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.play(Wiggle(q), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : la grille des 36 cas ──
        self.dire("01-image")
        g = Grille().move_to(P(-0.12, 1.35))
        self.play(FadeOut(VGroup(d1, d2, badge, s2, s7, q)), FadeIn(g, scale=0.8), run_time=0.5)
        self.au_mot("Somme 2 :")
        l1a = self.t("Somme 2 :", 34, COUL_2, weight=BOLD)
        l1b = self.t("1 seul cas", 34)
        l1 = self.ajuster(VGroup(l1a, l1b).arrange(RIGHT, buff=0.2)).move_to(P(0, -0.6))
        self.play(FadeIn(l1a, shift=UP * 0.15), run_time=0.3)
        self.au_mot("un seul cas")
        self.play(g.allumer(1, 1, COUL_2), FadeIn(l1b, scale=1.4), run_time=0.4)
        self.au_mot("1 et 1")
        self.play(Indicate(g.tetes_l[0], scale_factor=1.5), Indicate(g.tetes_c[0], scale_factor=1.5),
                  Indicate(g.case(1, 1), color=COUL_2, scale_factor=1.6), run_time=0.6)
        self.au_mot("Somme 7 :")
        l2a = self.t("Somme 7 :", 30, COUL_7, weight=BOLD).move_to(P(0, -1.1))
        self.play(FadeIn(l2a, shift=UP * 0.15), run_time=0.3)
        couples = [(1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1)]
        txts = VGroup(*[self.t(f"{a} et {b}", 28, COUL_7) for a, b in couples])
        self.ajuster(txts.arrange_in_grid(2, 3, buff=(0.35, 0.12))).move_to(P(0, -1.75))
        for (a, b), tx in zip(couples, txts):
            self.au_mot(f"{a} et {b}")
            self.play(g.allumer(a, b, COUL_7), FadeIn(tx, scale=1.4), run_time=0.3)
        self.au_mot("Six cas")
        six = self.t("6 cas !", 40, COUL_7, weight=BOLD).move_to(P(0, -1.7))
        diag = VGroup(*[g.case(a, b) for a, b in couples])
        self.play(FadeOut(txts), FadeIn(six, scale=1.6), run_time=0.35)
        self.play(diag.animate.scale(1.25), run_time=0.2)
        self.play(diag.animate.scale(1 / 1.25), run_time=0.2)
        self.au_mot("Sur 36")
        n1 = self.ajuster(VGroup(self.t("Somme 2 :", 32, COUL_2, weight=BOLD), self.t("1 cas sur 36", 32)).arrange(RIGHT, buff=0.18))
        n2 = self.ajuster(VGroup(self.t("Somme 7 :", 32, COUL_7, weight=BOLD), self.t("6 cas sur 36", 32)).arrange(RIGHT, buff=0.18))
        n1.move_to(P(0, -0.55))
        n2.move_to(P(0, -1.05))
        cadre = SurroundingRectangle(g.fonds, color=JAUNE_TITRE, buff=0.06, stroke_width=4)
        self.play(ReplacementTransform(l1, n1), ReplacementTransform(VGroup(l2a, six), n2), Create(cadre), run_time=0.5)
        self.au_mot("six fois")
        fin = VGroup(self.t("Le 7 est 6 fois", 36, JAUNE_TITRE, weight=BOLD),
                     self.t("plus probable que le 2", 32, JAUNE_TITRE)).arrange(DOWN, buff=0.1)
        fin.move_to(P(0, -1.75))
        self.play(FadeIn(fin, scale=0.7), FadeOut(cadre), run_time=0.45)
        self.insister(fin[0], 1.15)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : la somme 12 ──
        self.dire("02-question")
        toi = self.grand("Et la somme 12 ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        reset = [g.case(1, 1).animate.set_fill(CASE, 1).set_stroke(BORD, 1.5)]
        reset += [g.case(a, b).animate.set_fill(CASE, 1).set_stroke(BORD, 1.5) for a, b in couples]
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(n1, n2, fin)), *reset, run_time=0.5)
        self.au_mot("combien")
        cb = VGroup(self.t("Combien de cas", 38), self.t("sur 36 ?", 38, BLEU_CALCUL)).arrange(RIGHT, buff=0.15)
        if cb.width > LARGEUR_MAX:
            cb.scale_to_fit_width(LARGEUR_MAX)
        cb.move_to(P(0, -0.6))
        self.play(FadeIn(cb, shift=UP * 0.15), Indicate(g.tetes_l[5], scale_factor=1.5),
                  Indicate(g.tetes_c[5], scale_factor=1.5), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 46, VERT_OK, weight=BOLD),
                       self.t("commentaire !", 46, VERT_OK, weight=BOLD)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.55))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaVaLoiTerminale(ShortProbaVaLoi):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"
