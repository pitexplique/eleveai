# proba2_interpreter_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 16 :
# interpréter un échantillon. CEINTURE JAUNE. Il AMUSE : « 10 % mal remplies,
# dit le fabricant ; tu en trouves 80 sur 400 : tu le crois ? »
#   · en HAUT les bouteilles de jus de goyave sur le tapis, puis la caisse de
#     400 où les mal remplies clignotent, tamponnée « SUSPECT ! » ;
#   · en BAS, EN MÊME TEMPS, les maths : 10 %, 80, 80/400 = 0,2, l'axe (loupe
#     de 0 à 0,35 sous l'axe entier de 0 à 1) avec la bande verte 0,05 – 0,15,
#     le point rouge 0,2 dehors ;
#   · fin : « combien au maximum sans douter ? », « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : seuls les nombres dits s'écrivent (10 %, 400, 80, 0,2, 0,05,
# 0,15). Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-interpreter-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_interpreter_short.py ShortProba2Interpreter -o eleveai-maths-seconde-proba-interpreter-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/16-interpreter/.

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

# ⛔ Les helpers de la paysage, chargés par CHEMIN EXACT (des modules de même
# nom existent dans d'autres dossiers).
_spec = importlib.util.spec_from_file_location(
    "proba2_interpreter_paysage", Path(__file__).resolve().parent / "proba2_interpreter.py")
_pa = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pa)
P, AxeFreq, bouteille, rangee, caisse, fraction = (_pa.P, _pa.AxeFreq, _pa.bouteille, _pa.rangee,
                                                    _pa.caisse, _pa.fraction)
BANDE, DEDANS, DEHORS, GRIS = _pa.BANDE, _pa.DEDANS, _pa.DEHORS, _pa.GRIS

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

VMAX = 0.35


class ShortProba2Interpreter(Short6e):
    nom_voix = "seconde-proba-interpreter-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def axes(self, y_loupe, y_mini):
        """La loupe (0 à 0,35) au-dessus de l'axe entier (0 à 1), reliés."""
        a = AxeFreq(longueur=3.5, centre=P(-0.15, y_loupe), fs=22, h_bande=0.3, vmax=VMAX, pas=0.05)
        m = AxeFreq(longueur=2.6, centre=P(-0.6, y_mini), fs=18, h_bande=0.14, vmax=1.0, pas=0.1, sw=2)
        pts = [m.pt(0), m.pt(VMAX), a.pt(VMAX), a.pt(0)]
        tr = VGroup(Polygon(*pts, stroke_width=0, fill_color=WHITE, fill_opacity=0.06),
                    DashedLine(pts[0], pts[3], stroke_width=1.2, color=GRIS, dash_length=0.06),
                    DashedLine(pts[1], pts[2], stroke_width=1.2, color=GRIS, dash_length=0.06))
        return a, m, tr

    def borne(self, a, v, texte):
        t = Text(texte, font_size=22, color=BANDE)
        return t.next_to(a.pt(v), DOWN, buff=0.48)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Jus de goyave", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        tapis = Line(P(-2.1, 0.55), P(2.1, 0.55), stroke_width=6, color="#475569")
        r = rangee(10, mauvaises=(6,), s=0.62, buff=0.1)
        r.move_to(P(0, 0.55) + UP * r.height / 2 + UP * 0.03).shift(LEFT * 5)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), Create(tapis), run_time=0.5)
        self.play(r.animate.shift(RIGHT * 5), run_time=0.9, rate_func=rate_functions.ease_out_cubic)
        self.au_mot("10 %")
        cad = SurroundingRectangle(r[6], color=DEHORS, buff=0.05)
        dix = VGroup(self.t("10 %", 48, JAUNE_TITRE), self.t("mal remplies", 30, WHITE)).arrange(DOWN, buff=0.1)
        dix.move_to(P(0, -0.55))
        self.play(Create(cad), FadeIn(dix, scale=0.6), run_time=0.4)
        self.insister(VGroup(r[6], cad), 1.4, 0.2)
        self.au_mot("Sur 400")
        c = caisse(3, 8, 0.28, mauvaises=(1, 6, 10, 13, 18, 21)).move_to(P(0, 1.2))
        quatre = self.t("400", 48, JAUNE_TITRE).move_to(P(-0.9, -1.75))
        self.play(FadeOut(VGroup(r, cad, tapis)), FadeIn(c, scale=0.8), FadeIn(quatre, shift=UP * 0.2), run_time=0.45)
        self.au_mot("80")
        quatre_vingts = self.t("80", 54, DEHORS).move_to(P(0.9, -1.75))
        mal = VGroup(*[c[0][k] for k in (1, 6, 10, 13, 18, 21)])
        self.play(FadeIn(quatre_vingts, scale=0.5), *[Indicate(b, color=DEHORS, scale_factor=1.5) for b in mal],
                  run_time=0.45)
        self.insister(quatre_vingts, 1.4, 0.2)
        self.au_mot("Tu le crois")
        q = self.t("Tu le crois ?", 46, ORANGE_RETENUE).move_to(P(0, -2.5))
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.insister(q, 1.2, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : 0,2 est dehors ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(dix, quatre, quatre_vingts, q)), run_time=0.3)
        fr = fraction("80", "400", 34, WHITE, DEHORS).move_to(P(-0.75, -0.22))
        self.play(FadeIn(fr, shift=UP * 0.2), run_time=0.35)
        self.au_mot("0,2.")
        res = VGroup(self.t("=", 40, WHITE), self.t("0,2", 44, DEHORS)).arrange(RIGHT, buff=0.15)
        res.next_to(fr, RIGHT, buff=0.2)
        self.play(FadeIn(res, shift=RIGHT * 0.2), run_time=0.3)
        self.insister(res[1], 1.4, 0.2)
        self.au_mot("L'intervalle normal")
        a, m, tr = self.axes(-1.35, -2.4)
        self.play(FadeIn(m), FadeIn(tr), Create(a.ligne), FadeIn(a.ticks), FadeIn(a.zero), run_time=0.5)
        b = a.bande(0.1, 0.1).stretch_to_fit_width(0.01)
        mb = m.bande(0.1, 0.1).stretch_to_fit_width(0.01)
        self.add(b, mb)
        self.bring_to_front(a, m)
        self.au_mot("0,05 à")
        self.play(Transform(b, a.bande(0.05, 0.15)), Transform(mb, m.bande(0.05, 0.15)), run_time=0.5)
        self.bring_to_front(a, m)
        b1 = self.borne(a, 0.05, "0,05")
        self.play(FadeIn(b1, shift=UP * 0.1), run_time=0.25)
        self.au_mot("0,15")
        b2 = self.borne(a, 0.15, "0,15")
        self.play(FadeIn(b2, shift=UP * 0.1), Indicate(b, color=BANDE, scale_factor=1.15), run_time=0.35)
        self.au_mot("0,2 est dehors")
        j = a.jalon(0.2, "0,2", DEHORS, fs=26, haut=0.5)
        d0 = j[0].copy().move_to(res[1].get_bottom() + DOWN * 0.1)
        self.play(FadeIn(d0, scale=0.5), run_time=0.2)
        self.play(d0.animate.move_to(j[0]), run_time=0.4, rate_func=rate_functions.ease_in_quad)
        self.remove(d0)
        self.add(j[0])
        self.play(FadeIn(j[1]), Create(j[2]), Flash(j[0], color=DEHORS, line_length=0.15), run_time=0.35)
        self.au_mot("suspect")
        tampon = self.t("SUSPECT !", 52, DEHORS)
        cadre = SurroundingRectangle(tampon, color=DEHORS, buff=0.12, stroke_width=5)
        st = VGroup(cadre, tampon).rotate(0.18).move_to(c)
        fond = BackgroundRectangle(st, fill_opacity=0.55, buff=0.05)
        self.play(FadeIn(fond), FadeIn(st, scale=1.8), run_time=0.3)
        self.play(Flash(j[0], color=DEHORS), run_time=0.4)
        self.insister(st, 1.15, 0.2)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.25))
        self.play(Write(toi), run_time=0.4)
        self.au_mot("sur 400 bouteilles")
        ic = bouteille(True, 0.55)
        l1 = VGroup(ic, self.t("400 bouteilles", 34, WHITE)).arrange(RIGHT, buff=0.2).move_to(P(0, 1.45))
        l1[1][:3].set_color(JAUNE_TITRE)
        self.play(FadeIn(l1, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("combien")
        l2 = self.t("combien, au maximum,", 32, WHITE).move_to(P(0, 0.9))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.35)
        self.au_mot("sans douter")
        l3 = self.t("sans douter ?", 36, ORANGE_RETENUE).move_to(P(0, 0.42))
        a, m, tr = self.axes(-0.8, -1.55)
        a.mini = m
        b = a.bande(0.05, 0.15)
        mb = m.bande(0.05, 0.15)
        b1, b2 = self.borne(a, 0.05, "0,05"), self.borne(a, 0.15, "0,15")
        self.play(FadeIn(l3, shift=UP * 0.15), FadeIn(VGroup(b, a, b1, b2)), run_time=0.45)
        pt = self.t("?", 40, ORANGE_RETENUE).move_to(a.pt(0.1) + UP * 0.42)
        self.play(FadeIn(pt, shift=DOWN * 0.2), run_time=0.25)
        self.play(pt.animate.move_to(a.pt(0.15) + UP * 0.42), run_time=0.5)
        self.play(Indicate(b2, color=ORANGE_RETENUE, scale_factor=1.4), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
