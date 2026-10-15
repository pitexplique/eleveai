# pythagore_solide_short.py
# EleveAI — Maths 3e — short jumeau de « Pythagore dans un solide » : le triangle
# caché dans le gobelet du brevet 2026. CEINTURE ORANGE (Frédéric, 13/10 : il y a
# un calcul, ce n'est pas une blanche) : en HAUT le gobelet,
# sa pointe qui revient en pointillés et le triangle OAD qui s'allume ; en BAS
# le calcul qui s'écrit en même temps (67,24 − 3,24 = 64, OA = 8 cm).
# Question en commentaire : le cornet de glace 13 / 5 → 12 cm.
# Voix validée le 13/10 : manim/voix/3e-pythagore-solide-short.json.
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/pythagore_solide_short.py ShortGobelet3e -o eleveai-maths-3e-pythagore-solide-short --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/pythagore/01-gobelet-brevet/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "4e"))

from pythagore_solide import CORPS, PythagoreSolide3e, arc_ellipse  # noqa: E402  (pose les chemins)
from pythagore_hypotenuse import COTE, COUL_DROIT, COUL_HYP, P  # noqa: E402
from pythagore_reconnaitre import PythagoreReconnaitre4e  # noqa: E402
from pythagore_carre_racine import PythagoreCarreRacine4e  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import ceinture  # noqa: E402


class ShortGobelet3e(Short6e):
    nom_voix = "3e-pythagore-solide-short"

    t = PythagoreCarreRacine4e.t
    carre_droit = PythagoreReconnaitre4e.carre_droit
    gobelet = PythagoreSolide3e.gobelet
    triangle_cache = PythagoreSolide3e.triangle_cache
    lettre = PythagoreSolide3e.lettre

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = VGroup(self.grand("Le triangle caché", font_size=42, color=JAUNE_TITRE),
                       self.grand("dans un gobelet", font_size=34, color=JAUNE_TITRE)).arrange(DOWN, buff=0.1)
        titre.move_to(P(0, 2.95))
        badge = VGroup(ceinture("#F97316", 0.8).scale(0.7), self.grand("Ceinture orange", font_size=22, color="#F97316"))
        badge.arrange(RIGHT, buff=0.18).move_to(P(0, 2.25))
        g = self.gobelet(cx=0.0, yO=-0.45, yB=1.6, rB=1.25, ech=0.75)
        self.play(FadeIn(titre), FadeIn(badge), FadeIn(g["corps"]), run_time=0.9)
        self.au_mot("Où est-il")
        q = self.grand("Où est-il ?", font_size=40, color=BLEU_CALCUL).move_to(P(0, -1.4))
        self.play(FadeIn(q, scale=1.4))
        self.attendre_voix(marge=0.2)

        # ── 01 ──
        self.dire("01-image")
        self.play(FadeOut(q))
        self.au_mot("On remet la pointe")
        self.play(Create(g["pointe"]), run_time=1.2)
        self.play(FadeIn(Dot(g["O"], radius=0.06)), FadeIn(self.lettre("O", g["O"], DOWN, size=26)))
        fond, oa, ad, od, carre = self.triangle_cache(g)
        self.au_mot("La hauteur OA")
        self.play(FadeIn(self.lettre("A", g["A"], LEFT, size=24)), FadeIn(self.lettre("D", g["D"], RIGHT, size=24)),
                  Create(oa), Create(ad))
        self.au_mot("le triangle OAD s'allume")
        self.play(Create(od), FadeIn(fond), GrowFromCenter(carre))
        self.play(carre.animate.scale(2.2))
        self.play(carre.animate.scale(1 / 2.2))
        l1 = self.grand("OAD rectangle en A", font_size=30, color=VERT_OK).move_to(P(0, -1.35))
        self.play(Write(l1))
        self.attendre_voix(marge=0.3)

        # ── 02 ──
        self.dire("02-calcul")
        self.play(FadeOut(l1))
        y1, y2, y3 = -1.3, -1.78, -2.3
        self.au_mot("OD égale")
        self.play(FadeIn(self.t("8,2", 22, COUL_HYP).next_to((g["O"] + g["D"]) / 2, RIGHT, buff=0.12)))
        self.au_mot("AD égale")
        self.play(FadeIn(self.t("1,8", 20, COUL_DROIT).next_to(Line(g["A"], g["D"]), UP, buff=0.22)),
                  FadeIn(self.t("?", 26, COTE).next_to(Line(g["O"], g["A"]), LEFT, buff=0.12)))
        self.au_mot("67 virgule 24")
        self.play(Write(self.grand("OA² = 8,2² − 1,8²", font_size=30).move_to(P(0, y1))))
        self.play(FadeIn(self.grand("= 67,24 − 3,24 = 64", font_size=30).move_to(P(0, y2))))
        self.au_mot("OA égale 8")
        res = self.grand("OA = 8 cm", font_size=40, color=VERT_OK).move_to(P(0, y3))
        self.play(Write(res), oa.animate.set_color(VERT_OK))
        self.play(Circumscribe(res, color=VERT_OK))
        self.attendre_voix(marge=0.4)

        # ── 03 ──
        self.clear()
        self.margo_bas()
        self.dire("03-question")
        self.play(Write(self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to(P(0, 2.85))))
        # Le cornet : la boule en haut, la pointe en bas.
        B, S = P(0, 1.65), P(0, -0.65)
        r = 0.95
        cornet = VGroup(Polygon(B + LEFT * r, B + RIGHT * r, S, stroke_color=WHITE, stroke_width=3,
                                fill_color="#D97706", fill_opacity=0.45),
                        arc_ellipse(B, r, 0.22, 0, TAU))
        boule = Arc(radius=r, start_angle=0, angle=PI, color=WHITE, stroke_width=3,
                    fill_color="#F9A8D4", fill_opacity=0.6).move_arc_center_to(B)
        self.au_mot("Un cornet")
        self.play(FadeIn(cornet), FadeIn(boule))
        self.au_mot("le bord mesure")
        bord = Line(S, B + RIGHT * r, color=COUL_HYP, stroke_width=7)
        self.play(Create(bord), FadeIn(self.t("13 cm", 24, COUL_HYP).next_to(bord.get_center() + DOWN * 0.3, RIGHT, buff=0.15)))
        self.au_mot("le rayon 5")
        ray = Line(B, B + RIGHT * r, color=COUL_DROIT, stroke_width=6)
        self.play(Create(ray), FadeIn(self.t("5 cm", 24, COUL_DROIT).next_to(B + RIGHT * r, RIGHT, buff=0.12)))
        self.au_mot("Quelle est sa hauteur")
        h = DashedLine(B, S, color=COTE, stroke_width=5)
        self.play(Create(h), FadeIn(self.t("?", 34, COTE).next_to(h.get_center(), LEFT, buff=0.15)))
        self.play(FadeIn(self.grand("Quelle est sa hauteur ?", font_size=30, color=COTE).move_to(P(0, -1.2))))
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=34, color=VERT_OK),
                     self.grand("@eleveai974", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.12)
        self.play(FadeIn(rep.move_to(P(0, -2.0))))
        self.attendre_voix(marge=1.5)
