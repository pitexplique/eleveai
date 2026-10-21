# stats_enquete_mesurer_short.py
# EleveAI — Maths 6e — short jumeau de la série « Statistiques », épisode 05 :
# mesurer et noter ses mesures. CEINTURE BLANCHE. Il AMUSE : « Qui est le plus
# grand : 1 mètre 45, ou 152 ? » 152 a l'air énorme… mais ce sont des
# centimètres.
#   · en HAUT deux enfants debout, chacun au-dessus de SA mesure ;
#   · en BAS, EN MÊME TEMPS, une toise couchée (droite graduée en cm) : le
#     point de chacun s'allume au mot où sa taille est dite ; « 152 ? » flotte
#     sans unité, puis se pose sur 1 m 52 ;
#   · fin : deux serpents, 2 m et 180 cm, « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit (les
# petits traits de la toise n'ont pas de nombre).
# Ti-Margo en bas (margo_bas).
#
# Voix : manim/voix/6e-stats-enquete-mesurer-short.json (débit −10), WAV dans
# public/sons/6e-stats-enquete-mesurer-short/ ; calage mot à mot :
# manim/scripts/6e/stats_enquete_mesurer_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/stats_enquete_mesurer_short.py StatsEnqueteMesurerShort6e -o eleveai-maths-6e-stats-enquete-mesurer-short --media_dir manim/scripts/6e/media-enquete-mesurer-short
# Sortie : manim/sorties/6e/maths/statistiques/05-enquete-mesurer/eleveai-maths-6e-stats-enquete-mesurer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats6_lotc_commun import *  # noqa: E402,F403
from canvas_stats import AMBRE  # noqa: E402

Y_SOL = -0.5           # les pieds des enfants
Y_TOISE = -1.25        # la droite graduée
CM0, CM1 = 140, 155    # la toise va de 1,40 m à 1,55 m
X0, X1 = -1.9, 1.9
K = 1.5                # 1 m de taille = 1,5 unité à l'écran


def x_cm(v):
    return X0 + (X1 - X0) * (v - CM0) / (CM1 - CM0)


def enfant(taille, c_haut, c_cheveux="#1f2937"):
    """Un enfant debout, de hauteur `taille` (unités), pieds à l'origine."""
    h = taille
    r = h * 0.11
    tete = Circle(radius=r, fill_color="#c68642", fill_opacity=1, stroke_width=0).move_to(P(0, h - r))
    chev = AnnularSector(inner_radius=0, outer_radius=r * 1.1, angle=PI, start_angle=0, fill_color=c_cheveux,
                         fill_opacity=1, stroke_width=0).move_to(tete.get_top() + DOWN * r * 0.3)
    corps = RoundedRectangle(width=h * 0.3, height=h * 0.38, corner_radius=0.08, fill_color=c_haut, fill_opacity=1,
                             stroke_width=0).move_to(P(0, h * 0.58))
    jambes = VGroup(*[Rectangle(width=h * 0.1, height=h * 0.4, fill_color="#1e3a8a", fill_opacity=1, stroke_width=0)
                      .move_to(P(dx * h, h * 0.2)) for dx in (-0.07, 0.07)])
    return VGroup(jambes, corps, tete, chev)


def serpent(longueur, couleur):
    pts = [P(t, 0.18 * np.sin(t * 5)) for t in np.linspace(0, longueur, 40)]
    corps = VMobject(stroke_color=couleur, stroke_width=16).set_points_smoothly(pts)
    tete = Ellipse(width=0.32, height=0.24, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(pts[-1])
    oeil = Dot(pts[-1] + P(0.06, 0.04), radius=0.03, color=BLACK)
    return VGroup(corps, tete, oeil)


class StatsEnqueteMesurerShort6e(MotsCales6, OutilsShort, Short6e):
    nom_voix = "6e-stats-enquete-mesurer-short"
    fichier_marques = "stats_enquete_mesurer_short_marques.json"

    def toise(self):
        axe = Line(P(X0 - 0.15, Y_TOISE), P(X1 + 0.15, Y_TOISE), color=WHITE, stroke_width=4)
        traits = VGroup(*[Line(P(x_cm(v), Y_TOISE - (0.14 if v % 5 == 0 else 0.07)),
                               P(x_cm(v), Y_TOISE + (0.14 if v % 5 == 0 else 0.07)), color=WHITE,
                               stroke_width=4 if v % 5 == 0 else 2) for v in range(CM0, CM1 + 1)])
        nom = self.t("la toise, en cm", 24, "#94a3b8").next_to(axe, DOWN, buff=0.3)
        return VGroup(axe, traits, nom)

    def point(self, v, couleur):
        return Dot(P(x_cm(v), Y_TOISE), radius=0.1, color=couleur).set_z_index(2)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Qui est le plus grand ?")
        self.add(badge)
        toise = self.toise()
        a = enfant(1.45 * K, "#f43f5e").move_to(P(x_cm(145), Y_SOL), aligned_edge=DOWN)
        b = enfant(1.52 * K, "#22c55e", "#78350f").move_to(P(x_cm(152), Y_SOL), aligned_edge=DOWN)
        sol = Line(P(-2.1, Y_SOL), P(2.1, Y_SOL), color="#64748b", stroke_width=3)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(FadeIn(titre), FadeIn(sol), FadeIn(toise), run_time=0.4)
        self.au_mot("1 mètre 45")
        la = self.t("1 m 45", 30, "#fda4af").next_to(a, UP, buff=0.08)
        pa = self.point(145, "#f43f5e")
        va = DashedLine(P(x_cm(145), Y_SOL), P(x_cm(145), Y_TOISE), color="#f43f5e", stroke_width=3)
        self.play(FadeIn(a, shift=UP * 0.2), FadeIn(la), Create(va), FadeIn(pa, scale=2), run_time=0.5)
        self.au_mot("ou 152")
        lb = self.t("152 ?", 32, ORANGE_RETENUE).next_to(b, UP, buff=0.08)
        if lb.get_right()[0] > 2.15:
            lb.shift(LEFT * (lb.get_right()[0] - 2.15))
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(lb, scale=1.5), run_time=0.45)
        self.insister(lb, 1.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : 152 centimètres, c'est 1 mètre 52 ──
        self.dire("01-image")
        self.au_mot("152 centimètres")
        lb2 = self.t("152 cm", 30, "#86efac").move_to(lb).align_to(lb, RIGHT)
        self.play(Transform(lb, lb2), run_time=0.35)
        self.au_mot("c'est 1 mètre 52")
        lb3 = self.t("1 m 52", 30, "#86efac").move_to(lb).align_to(lb, RIGHT)
        pb = self.point(152, "#22c55e")
        vb = DashedLine(P(x_cm(152), Y_SOL), P(x_cm(152), Y_TOISE), color="#22c55e", stroke_width=3)
        self.play(Transform(lb, lb3), Create(vb), FadeIn(pb, scale=2), run_time=0.45)
        self.au_mot("Plus grand que 1 mètre 45")
        niveau = DashedLine(a.get_top() + LEFT * 0.4, P(b.get_right()[0] + 0.1, a.get_top()[1]), color=AMBRE,
                            stroke_width=4)
        ecart = Arrow(P(b.get_center()[0], a.get_top()[1]), b.get_top() + UP * 0.02, buff=0, color=AMBRE,
                      stroke_width=5, max_tip_length_to_length_ratio=0.5, tip_length=0.1)
        plus = self.t("plus grand !", 36, VERT_OK).move_to(P(0, -2.05))
        self.play(Create(niveau), GrowArrow(ecart), FadeOut(toise[2]), FadeIn(plus, scale=0.7), run_time=0.5)
        self.insister(b, 1.08)
        self.au_mot("Sans son unité")
        regle = VGroup(self.t("Sans son unité,", 30, ORANGE_RETENUE), self.t("un nombre ne dit rien !", 30, ORANGE_RETENUE))
        self.borne(regle.arrange(DOWN, buff=0.08), 0.4).move_to(P(0, -2.2))
        self.play(FadeOut(plus), FadeIn(regle, shift=UP * 0.2), run_time=0.45)
        self.insister(regle, 1.08)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("Qui est le plus long")
        self.play(FadeOut(VGroup(a, b, la, lb, pa, pb, va, vb, niveau, ecart, regle, sol, toise[0], toise[1])), run_time=0.4)
        self.au_mot("2 mètres")
        s1 = serpent(3.0, "#22c55e").move_to(P(0, 1.1))
        l1 = self.t("2 m", 38, "#86efac").next_to(s1, UP, buff=0.15)
        self.play(Create(s1[0]), FadeIn(s1[1:]), FadeIn(l1), run_time=0.6)
        self.au_mot("180 centimètres")
        s2 = serpent(3.0, "#facc15").move_to(P(0, -0.6))
        l2 = self.t("180 cm", 38, "#fde047").next_to(s2, UP, buff=0.15)
        self.play(Create(s2[0]), FadeIn(s2[1:]), FadeIn(l2), run_time=0.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 32, VERT_OK)).move_to(P(0, -1.75))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
