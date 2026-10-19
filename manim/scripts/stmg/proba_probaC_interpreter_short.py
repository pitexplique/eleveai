# proba_probaC_interpreter_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Interpréter une probabilité conditionnelle par une phrase ».
# CEINTURE JAUNE. Il AMUSE : « 9 accidents sur 10 ont lieu à moins de 10 km
# de chez soi » : rouler près de chez soi, c'est dangereux ?
#   · en HAUT la route : la maison, la zone « moins de 10 km », des voitures qui
#     roulent ; 9 accidents sur 10 éclatent dans la zone ; puis les trajets
#     presque tous près de chez soi ;
#   · en BAS, EN MÊME TEMPS : la phrase, « parmi les accidents » → P_accident(près),
#     puis la question retournée P_près(accident) ;
#   · fin : 95 % des trajets, « plus ou moins dangereux ? », « Réponds en
#     commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne, aucune classe à l'écran :
# UN SEUL rendu suffit, copié sous les deux noms (STMG, 1re). Les deux
# sous-classes existent quand même, identiques.
#
# Voix : manim/voix/stmg-premiere-proba-interpreter-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaC_interpreter_short.py ShortProbaInterpreterSTMG -o eleveai-maths-stmg-proba-interpreter-short --media_dir manim/scripts/stmg/media-probaC_interpreter
# (ShortProbaInterpreterPremiere donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/05-interpreter/ et
# manim/sorties/premiere-commun/maths/probabilites/05-interpreter/
# (eleveai-maths-premiere-commun-proba-interpreter-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaC_interpreter import P, maison, p_cond, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
ROUTE = "#334155"
ZONE = "#22C55E"
BOUM = "#F97316"
COULEURS = ["#38BDF8", "#F472B6", "#A3E635", "#FACC15", "#C084FC", "#F87171"]


def voiture(couleur, s=1.0):
    caisse = RoundedRectangle(width=0.6, height=0.2, corner_radius=0.06, fill_color=couleur, fill_opacity=1,
                              stroke_width=0)
    cabine = RoundedRectangle(width=0.32, height=0.16, corner_radius=0.05, fill_color=couleur, fill_opacity=1,
                              stroke_width=0).next_to(caisse, UP, buff=-0.02).shift(LEFT * 0.04)
    vitre = Rectangle(width=0.22, height=0.08, fill_color="#E0F2FE", fill_opacity=1, stroke_width=0).move_to(cabine)
    roues = VGroup(*[Circle(radius=0.065, fill_color="#0F172A", fill_opacity=1, stroke_color=WHITE,
                            stroke_width=1).move_to(caisse.get_bottom() + RIGHT * dx) for dx in (-0.17, 0.17)])
    return VGroup(caisse, cabine, vitre, roues).scale(s)


def boum(r=0.16):
    return Star(8, outer_radius=r, inner_radius=r * 0.5, fill_color=BOUM, fill_opacity=1, stroke_color=JAUNE_TITRE,
                stroke_width=2)


class ShortProbaInterpreterBase(Short6e):
    nom_voix = "stmg-premiere-proba-interpreter-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def formule(self, cond, cible, fs=50):
        f = p_cond(cond, cible, fs, WHITE, JAUNE_TITRE, VERT_OK)
        if f.width > LARGEUR_MAX:
            f.scale_to_fit_width(LARGEUR_MAX)
        return f

    def bloc(self, lignes, fs=26, y=-0.9, buff=0.12):
        """Des lignes centrées ; chaque ligne est une liste de (texte, couleur)."""
        g = VGroup(*[suite(*[Text(tx, font_size=fs, color=c) for tx, c in l], buff=0.1) for l in lignes])
        g.arrange(DOWN, buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : la route, la zone, 9 accidents sur 10 ──
        self.dire("00-accroche")
        titre = self.grand("Sur la route", font_size=42, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        route = Rectangle(width=4.6, height=0.6, fill_color=ROUTE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.95))
        tirets = DashedLine(P(-2.3, 0.95), P(2.3, 0.95), dash_length=0.18, color=WHITE, stroke_width=3)
        zone = Rectangle(width=2.65, height=1.45, fill_color=ZONE, fill_opacity=0.18, stroke_color=ZONE,
                         stroke_width=3).move_to(P(-0.925, 1.12))
        chez = maison(False, 0.42).move_to(P(-1.85, 1.55))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(route), FadeIn(tirets), FadeIn(chez),
                  run_time=0.7)
        autos = VGroup(*[voiture(COULEURS[k], 0.75) for k in range(3)])
        for k, au in enumerate(autos):
            au.move_to(P(-3.0 - 1.1 * k, 0.8 + 0.3 * (k % 2)))
        self.add(autos)
        self.play(autos.animate.shift(RIGHT * 3.4), run_time=1.0, rate_func=linear)
        self.au_mot("9 accidents sur 10")
        dedans = [(-2.0, 0.85), (-1.6, 1.12), (-1.25, 0.78), (-0.95, 1.05), (-0.6, 0.8), (-0.3, 1.1), (-0.05, 0.85),
                  (-1.85, 0.62), (-0.75, 1.32)]
        booms = VGroup(*[boum().move_to(P(x, y)) for x, y in dedans])
        dehors = boum().move_to(P(1.55, 0.95))
        l0 = self.bloc([[("«", WHITE), ("9 accidents sur 10", JAUNE_TITRE)],
                        [("ont lieu à moins de", WHITE)],
                        [("10 km", JAUNE_TITRE), ("de chez soi »", WHITE)]], 28, -0.85)
        self.play(LaggedStart(*[GrowFromCenter(b) for b in booms], lag_ratio=0.08), GrowFromCenter(dehors),
                  FadeIn(l0[0], shift=UP * 0.15), autos.animate.shift(RIGHT * 2.0).set_opacity(0.0), run_time=0.9)
        self.au_mot("moins de 10 kilomètres")
        fl = DoubleArrow(P(-2.2, 0.28), P(0.35, 0.28), buff=0, color=ZONE, stroke_width=4, tip_length=0.15)
        km = self.t("10 km", 22, ZONE).next_to(fl, RIGHT, buff=0.12)
        self.play(FadeIn(zone), GrowFromCenter(fl), FadeIn(km), FadeIn(l0[1:], shift=UP * 0.15), run_time=0.6)
        self.au_mot("Alors, rouler")
        self.remove(autos)
        auto = voiture(COULEURS[0], 0.75).move_to(P(-1.9, 0.8))
        self.play(FadeIn(auto), run_time=0.2)
        self.play(auto.animate.shift(RIGHT * 2.0), run_time=0.8, rate_func=rate_functions.ease_in_out_sine)
        self.au_mot("c'est dangereux")
        dang = self.grand("Dangereux ?", font_size=56, color=ORANGE_RETENUE).move_to(P(0, -2.2))
        self.play(FadeIn(dang, scale=0.5), Wiggle(auto), run_time=0.6)
        self.insister(dang, 1.15, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : « parmi les accidents » ; presque tous les trajets sont près ──
        self.dire("01-image")
        self.au_mot("« parmi les accidents")
        l1 = self.bloc([[("« parmi les accidents,", WHITE)],
                        [("90 %", JAUNE_TITRE), ("sont près de chez soi »", WHITE)]], 30, -0.75)
        self.play(FadeOut(l0, shift=DOWN * 0.2), FadeOut(dang, shift=DOWN * 0.2), FadeOut(auto),
                  FadeIn(l1[0], shift=UP * 0.15), run_time=0.5)
        self.play(*[Indicate(b, color=JAUNE_TITRE, scale_factor=1.6) for b in booms],
                  Indicate(dehors, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.7)
        self.au_mot("90 %")
        self.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.4)
        self.insister(l1[1][0], 1.4, 0.2)
        self.au_mot("C'est P indice accident")
        f1 = self.formule("accident", "près", 50).move_to(P(0, -1.85))
        self.play(FadeIn(f1[0]), FadeIn(f1[1], shift=DOWN * 0.3), FadeIn(f1[2], shift=LEFT * 0.15), run_time=0.6)
        self.play(Indicate(f1[1], color=JAUNE_TITRE, scale_factor=1.3), run_time=0.5)
        self.au_mot("Or presque tous")
        trafic = VGroup()
        for k in range(12):
            v = voiture(COULEURS[k % 6], 0.55)
            v.move_to(P(-2.0 + (k % 6) * 0.42, 0.78 + 0.32 * (k // 6)))
            trafic.add(v)
        loin = voiture(COULEURS[2], 0.55).move_to(P(1.6, 0.78))
        tous = self.bloc([[("presque tous nos trajets :", WHITE)], [("près de chez soi !", VERT_OK)]], 30, -0.75)
        self.play(FadeOut(l1, shift=UP * 0.2), f1.animate.move_to(P(0, -1.85)),
                  LaggedStart(*[FadeIn(v, shift=RIGHT * 0.5) for v in trafic], lag_ratio=0.06), FadeIn(loin),
                  booms.animate.set_opacity(0.25), dehors.animate.set_opacity(0.25), run_time=1.1)
        self.play(FadeIn(tous, shift=UP * 0.15), run_time=0.4)
        self.insister(tous[1], 1.15, 0.2)
        self.au_mot("ne dit rien du risque")
        risque = self.t("le risque d'un trajet près ?", 28, ORANGE_RETENUE).move_to(P(0, -2.45))
        self.play(f1.animate.scale(0.8).move_to(P(0, -0.4)), FadeOut(tous, shift=UP * 0.2), run_time=0.5)
        self.play(FadeIn(risque, shift=UP * 0.15), run_time=0.4)
        self.au_mot("P indice près de accident")
        f2 = self.formule("près", "accident", 50)
        q = self.t("?", 50, ORANGE_RETENUE)
        ligne2 = suite(f2, q, buff=0.15)
        if ligne2.width > LARGEUR_MAX:
            ligne2.scale_to_fit_width(LARGEUR_MAX)
        ligne2.move_to(P(0, -1.5))
        self.play(FadeIn(f2, shift=UP * 0.2), FadeIn(q, scale=0.5), run_time=0.6)
        self.insister(f2[1], 1.4, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : 95 % des trajets ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(f1, ligne2, risque), shift=DOWN * 0.3),
                  run_time=0.5)
        self.au_mot("95 %")
        l3 = self.bloc([[("95 %", JAUNE_TITRE), ("des trajets", WHITE)], [("près de chez soi", VERT_OK)]], 30, -0.42)
        self.play(FadeIn(l3, shift=UP * 0.15), Indicate(trafic, color=VERT_OK, scale_factor=1.1), run_time=0.6)
        self.insister(l3[0][0], 1.4, 0.2)
        self.au_mot("ces trajets sont-ils")
        l4 = self.bloc([[("plus dangereux", ROUGE_ERREUR)], [("ou moins dangereux ?", VERT_OK)]], 28, -1.42)
        self.play(FadeIn(l4[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("ou moins dangereux")
        self.play(FadeIn(l4[1], shift=UP * 0.15), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 38, VERT_OK), self.t("commentaire !", 38, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaInterpreterSTMG(ShortProbaInterpreterBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaInterpreterPremiere(ShortProbaInterpreterBase):
    identite = "Maths 1re — EleveAI"
