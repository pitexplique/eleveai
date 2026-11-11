# suite_geo_terme_rang_short.py
# EleveAI — Maths 1re (sans spé) — short « Un terme lointain : tu paries qu'en
# pliant une feuille 10 fois, elle dépasse 10 cm d'épaisseur ? » (9:16),
# ceinture BLANCHE (échelle entière sous le titre). Série SUITES, épisode 12.
# Micro du coach : expo_suite_terme_rang. Jumeau géométrique du short de l'ép. 04.
#   · 00-garde      : le titre, l'échelle (70 %), le pari en gros ; dessous, une
#                     feuille vue de dessus qui se plie trois fois ;
#   · 01-situation  : EN HAUT la feuille vue de côté (une couche, « 0,1 mm »),
#                     un pliage : 2 couches ; EN BAS les cases u₀ … uₙ, u₀ = 0,1 ;
#   · 02-idee       : EN HAUT la pile double (2, 4, 8 couches) EN MÊME TEMPS que
#                     les sauts « × 2 » s'allument dessous ; « n fois × 2 », puis
#                     le grand saut « × 2ⁿ » (exposant orange) ;
#   · 03/03b        : question-pause (C : uₙ = 0,1 × 2ⁿ), 3 s ; u₁₀ = 0,1 × 1 024
#                     = 102,4 mm : plus de 10 cm ;
#   · 04-commentaire: « Et toi ? » 7 pliages (réponse 12,8 mm = 0,1 × 2⁷, NON
#                     affichée), « Réponds en commentaire ! » ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = sauts et exposant,
# vert = juste, rouge = piège.
# Voix : manim/voix/premiere-suite-geo-terme-rang-short.json (débit −6),
# calée par suite_geo_terme_rang_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_geo_terme_rang_short.py SuiteGeoTermeRangShort -o eleveai-maths-premiere-suite-geo-terme-rang-short --media_dir manim/scripts/premiere/media-suite-geo-terme-rang-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_terme_rang import Rangee  # noqa: E402  (l'outil de l'épisode 04)
from suite_geo_terme_rang import GRIS_SAUT, OutilsEp12  # noqa: E402  (l'outil de l'épisode 12)

assert abs(0.1 * 2 ** 10 - 102.4) < 1e-9 and 2 ** 10 == 1024 and 102.4 > 100   # réponse C, > 10 cm
assert abs(0.1 * 2 ** 7 - 12.8) < 1e-9                                         # 7 pliages (commentaire)
PAPIER, PLI = "#F8FAFC", "#CBD5E1"
Y_PILE, Y_CASES = 0.75, -0.95
XS = (-1.52, -0.55, 0.12, 0.79, 1.75)      # u₀, u₁, u₂, u₃, uₙ (« … » entre u₃ et uₙ)
LARG = (0.92, 0.48, 0.48, 0.48, 0.58)      # u₀ plus large : « 0,1 » lisible, avec sa marge


def couche(largeur, h=0.075):
    return Rectangle(width=largeur, height=h, fill_color=PAPIER, fill_opacity=1, stroke_color=PLI, stroke_width=1.5)


def pile(k, w0=3.6, y=Y_PILE, h=0.12, g=0.022):
    """La feuille vue de côté après k pliages : 2ᵏ couches, chacune 2ᵏ fois
    plus étroite que la feuille dépliée, posées sur la table (bas en y)."""
    n, w = 2 ** k, w0 / 2 ** k
    return VGroup(*[couche(w, h).move_to(P(0, y + h / 2 + j * (h + g))) for j in range(n)])


class SuiteGeoTermeRangShort(OutilsEp12, ShortSuites):
    fichier_marques = "suite_geo_terme_rang_short_marques.json"
    nom_voix = "premiere-suite-geo-terme-rang-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"

    def plier(self, feuille, vertical=True, run_time=0.35):
        """La moitié droite (ou haute) de la feuille se rabat sur l'autre : la
        feuille vue de dessus est deux fois plus petite et plus foncée."""
        c, w, h = feuille.get_center(), feuille.width, feuille.height
        if vertical:
            a = feuille.copy().stretch(0.5, 0).move_to(c + LEFT * w / 4)
            b = a.copy().move_to(c + RIGHT * w / 4)
            axe, pivot = 0, c
        else:
            a = feuille.copy().stretch(0.5, 1).move_to(c + DOWN * h / 4)
            b = a.copy().move_to(c + UP * h / 4)
            axe, pivot = 1, c
        self.remove(feuille)
        self.add(a, b)
        coul = interpolate_color(ManimColor(feuille.get_fill_color()), ManimColor("#94A3B8"), 0.3)
        self.play(b.animate.stretch(-1, axe, about_point=pivot).set_fill(coul), run_time=run_time)
        self.remove(b)
        a.set_fill(coul)
        self.play(a.animate.move_to(c), run_time=0.15)  # la feuille pliée revient au milieu
        return a

    def entete(self, titre, extrait=None, fs=44):
        """L'en-tête du module commun, mais l'échelle (un peu plus petite) est
        posée SOUS le titre avec un vrai écart : elle ne touche plus son bas."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.titre_s = self.t(titre, fs, JAUNE_TITRE).move_to(P(0, 3.55))
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.6)
        self.badge.next_to(self.titre_s, DOWN, buff=0.2)
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def construct(self):
        # ── 00 : la garde : titre, échelle (70 %), le pari ; la feuille se plie ──
        self.dire("00-garde")
        self.entete("Un terme lointain", extrait="Un terme")
        pari = self.paragraphe(["Tu paries qu'en pliant", "une feuille 10 fois,", "elle dépasse",
                                ("10 cm d'épaisseur ?", RAISON)], self.fs_grand, buff=0.2, y=1.3)
        feuille = Rectangle(width=3.6, height=2.0, fill_color=PAPIER, fill_opacity=1, stroke_color=PLI,
                            stroke_width=2).move_to(P(0, -1.65))
        for k, (ligne, ex) in enumerate(zip(pari, ("Tu paries", "10", "elle", "centimètres"))):
            if ex == "10":
                self.au_mot("feuille")
                self.play(FadeIn(feuille, scale=0.8), run_time=0.25)
            self.au_mot(ex) if ex != "10" else self.suivre("10")
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.25)
            if ex == "centimètres":
                for vert in (True, False, True):
                    feuille = self.plier(feuille, vert, run_time=0.25)
        self.play(Indicate(feuille, color=RAISON, scale_factor=1.3), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT la feuille vue de côté ; EN BAS les cases u₀ … uₙ ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        table = Line(P(-2.0, Y_PILE), P(2.0, Y_PILE), stroke_color="#64748B", stroke_width=5)
        p0 = pile(0)
        lab_f = self.t("une feuille de papier", 36, GREY_A).next_to(self.badge, DOWN, buff=0.22)
        self.au_mot("feuille")
        self.play(FadeIn(table), FadeIn(p0, shift=DOWN * 0.2), FadeIn(lab_f, shift=UP * 0.1), run_time=0.4)
        self.suivre("0,1")
        ep = VGroup(self.t("épaisseur :", 36), self.t("0,1 mm", 40, TERME)).arrange(RIGHT, buff=0.16)
        if ep.width > self.largeur_texte:
            ep.scale_to_fit_width(self.largeur_texte)
        ep.move_to(P(0, 1.55))
        fl = Arrow(ep[1].get_bottom(), p0.get_top() + RIGHT * 0.9, buff=0.08, color=TERME, stroke_width=4,
                   tip_length=0.16)
        self.play(FadeIn(ep, shift=UP * 0.1), GrowArrow(fl), run_time=0.4)
        lg = Rangee(5, XS[0], XS[-1], Y_CASES, larg=0.5, haut=0.62, creux=0.16, sw=3, sauts=False)
        for k, c in enumerate(lg.cases):
            neuve = RoundedRectangle(width=LARG[k], height=0.62, corner_radius=0.08, stroke_color=TERME,
                                     stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(XS[k], Y_CASES))
            lg.cases.submobjects[k] = neuve
        sauts = [lg.fleche(k, k + 1, 0.16, 3, GRIS_SAUT) for k in range(3)]
        pts = Text("…", font_size=36, color=GREY_A).move_to(P((XS[3] + 0.24 + XS[4] - 0.29) / 2, Y_CASES))
        noms = [self.nom_case(lg, k, nm, 30) for k, nm in enumerate(("u₀", "u₁", "u₂", "u₃", "uₙ"))]
        self.au_mot("chaque pliage")
        m1 = self.t("à chaque pliage,", 38).move_to(P(0, 0.3))
        self.play(FadeIn(m1, shift=UP * 0.1), FadeOut(fl), FadeOut(ep), run_time=0.3)
        self.au_mot("double")
        m2 = self.t("l'épaisseur double", 40, RAISON).next_to(m1, DOWN, buff=0.12)
        p1 = pile(1)
        self.play(FadeIn(m2, shift=UP * 0.1), ReplacementTransform(p0, p1), run_time=0.45)
        self.au_mot("On note")
        self.play(FadeOut(VGroup(m1, m2)), run_time=0.25)
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in lg.cases], lag_ratio=0.1),
                  FadeIn(pts), *[FadeIn(n) for n in noms], *[Create(s) for s in sauts], run_time=0.45)
        self.play(sauts[0].animate.set_color(RAISON), Indicate(noms[1], color=RAISON), Indicate(p1, color=RAISON),
                  run_time=0.4)  # le 1er pliage (déjà fait) = le 1er saut
        note1 = VGroup(self.t("uₙ", 42, TERME), self.t(": l'épaisseur", 38)).arrange(RIGHT, buff=0.14)
        note2 = self.t("après n pliages", 38)
        VGroup(note1, note2).arrange(DOWN, buff=0.12).move_to(P(0, -2.35))
        self.au_mot("épaisseur", n=3)
        self.play(FadeIn(note1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("après")
        self.play(FadeIn(note2, shift=UP * 0.1), run_time=0.3)
        self.suivre("0,1")
        t0 = self.t("0,1", 32).move_to(lg.cases[0])
        self.play(FadeIn(t0, scale=1.4), Indicate(noms[0], color=TERME), run_time=0.3)
        self.insister(VGroup(lg.cases[0], t0), 1.12)
        self.attendre_voix(marge=0.2)

        # ── 02 : la pile double EN MÊME TEMPS que les sauts s'allument ──
        self.dire("02-idee")
        self.play(FadeOut(VGroup(note1, note2)), FadeOut(lab_f), run_time=0.25)
        self.au_mot("pliages")
        p = p1
        for k in (1, 2):
            pk = pile(k + 1)
            bille = Dot(sauts[k].get_start(), radius=0.06, color=RAISON)
            self.play(ReplacementTransform(p, pk), sauts[k].animate.set_color(RAISON),
                      MoveAlongPath(bille, sauts[k].copy()), run_time=0.3)
            self.remove(bille)
            p = pk
        tard = DashedVMobject(lg.fleche(3, 4, 0.16, 3, RAISON), num_dashes=10)
        self.play(Create(tard), run_time=0.2)
        self.au_mot("n fois")
        nfl, nf = self.ligne([("n fois", RAISON), ("× 2", RAISON)], 48)
        nfl.move_to(P(0, 0.25))
        self.play(FadeIn(nf[0], scale=1.3), run_time=0.25)
        self.suivre("2")
        # le grand saut passe SOUS les noms (les petits sauts restent seuls au-dessus)
        yb = noms[0].get_bottom()[1] - 0.1
        grand = CurvedArrow(P(XS[0], yb), P(XS[4], yb), angle=4 * np.arctan(2 * 0.38 / (XS[4] - XS[0])),
                            color=RAISON, stroke_width=6, tip_length=0.2)
        lab = Text("× 2ⁿ", font_size=56, color=RAISON).next_to(grand, DOWN, buff=0.06)
        self.play(FadeIn(nf[1], scale=1.3), ReplacementTransform(VGroup(*[s.copy() for s in sauts], tard.copy()),
                                                                 grand), FadeIn(lab, scale=1.4), run_time=0.45)
        self.insister(lab, 1.25)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → C ──
        q = self.poser_question("03-question",
                                [(self.t("Quelle formule donne", 40), "Quelle"),
                                 (VGroup(self.t("l'épaisseur", 40), self.t("uₙ ?", 44, TERME)).arrange(RIGHT, buff=0.16),
                                  "épaisseur")],
                                ["0,1 × 2 × n", "0,1 + 2n", Text("0,1 × 2ⁿ", font_size=36, color=WHITE)], 2,
                                y_question=2.85)
        self.dire("03b-reponse")
        self.q_reponse(q, 2)
        ya, yb = q.cartes[0].get_center()[1], q.cartes[1].get_center()[1]
        self.au_mot("Et")
        l1, (a1, a2, a3, a4) = self.ligne([("u₁₀ =", TERME), ("0,1", WHITE), ("×", WHITE), ("1 024", WHITE)], 50)
        l1.scale_to_fit_width(min(l1.width, self.largeur_texte - 0.1)).move_to(P(0, ya))
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), FadeIn(a1, scale=1.3), run_time=0.25)
        self.suivre("0,1")
        self.play(FadeIn(a2, scale=1.3), run_time=0.2)
        self.suivre("1 024")
        self.play(FadeIn(a3), FadeIn(a4, scale=1.3), run_time=0.2)
        l2, (b1, b2) = self.ligne([("=", WHITE), ("102,4 mm", JUSTE)], 60)
        l2.scale_to_fit_width(min(l2.width, self.largeur_texte - 0.5)).move_to(P(0, yb))
        self.au_mot("égale", n=2)
        self.play(FadeIn(b1), run_time=0.2)
        self.suivre("102,4")
        cad = self.encadre(b2, JUSTE, 0.14)
        self.play(FadeIn(b2, scale=1.4), Create(cad), run_time=0.3)
        self.au_mot("plus de")
        plus = self.t("plus de 10 cm !", 52, JUSTE, larg=3.7).next_to(q.cartes[2], DOWN, buff=0.45)
        self.suivre("10")
        self.play(FadeIn(plus, scale=1.3), run_time=0.3)
        self.insister(plus, 1.08)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        table2 = Line(P(-1.4, 1.35), P(1.4, 1.35), stroke_color="#64748B", stroke_width=5)
        p3 = pile(3, w0=4.4, y=1.35)
        self.play(FadeIn(et, shift=DOWN * 0.1), FadeIn(table2), FadeIn(p3, shift=DOWN * 0.2), run_time=0.35)
        question = self.paragraphe([("Quelle est l'épaisseur,", RAISON), ("en millimètres,", RAISON),
                                    "après 7 pliages ?"], 44, buff=0.14, y=0.3)
        for ligne, ex in zip(question, ("quelle", "millimètres", "7")):
            if ex == "7":
                self.au_mot("après")
                self.suivre("7")
            else:
                self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.3)
        case = RoundedRectangle(width=1.0, height=0.75, corner_radius=0.1, stroke_color=RAISON, stroke_width=4,
                                fill_color=FOND_CARTE, fill_opacity=1)
        qm = Text("?", font_size=48, color=RAISON).move_to(case)
        u7 = VGroup(self.t("u₇ =", 50, TERME), VGroup(case, qm)).arrange(RIGHT, buff=0.2).move_to(P(0, -1.12))
        self.play(FadeIn(u7, scale=1.2), run_time=0.3)
        self.appel_commentaire(-2.35)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
