# suite_arith_interpreter_short.py
# EleveAI — Maths 1re (sans spé) — short « Interpréter une suite : tu trouves
# l'année sans te tromper d'un an ? » (9:16), ceinture BLANCHE (échelle entière
# sous le titre). Série SUITES, épisode 08. Micro du coach : lin_suite_interpreter
# (aInterpRang : « à quelle année correspond u₉ ? », départ u₀ ou u₁).
#   · 00-garde      : le titre, l'échelle, le pari en gros, un calendrier dont
#                     les pages tournent ;
#   · 01-situation  : EN HAUT le refuge, un chien adopté sort (le cœur) ;
#                     « chaque année : + 12 chiens » ; uₙ = le nombre d'adoptions ;
#                     EN BAS la case u₀ et son année 2026 ;
#                     02-idee : à chaque année, un chien sort du refuge et vient
#                     se placer AU-DESSUS de sa case (u₁, u₂, u₃ se posent EN
#                     MÊME TEMPS, la flèche orange saute d'une case à l'autre) ;
#   · 03/03b        : question-pause (B : 2035), 3 s ; correction : u₀ → u₉,
#                     « + 9 ans », 2026 + 9 = 2035 ;
#   · 04-commentaire: « Et toi ? » : u₁ correspond à 2026, u₉ → « ? »
#                     (réponse 2034, NON affichée), « Réponds en commentaire ! » ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = ce qui s'ajoute, vert = juste.
# Voix : manim/voix/premiere-suite-arith-interpreter-short.json (débit −6), calée
# par suite_arith_interpreter_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_arith_interpreter_short.py SuiteArithInterpreterShort -o eleveai-maths-premiere-suite-arith-interpreter-short --media_dir manim/scripts/premiere/media-suite-arith-interpreter-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403

assert 2026 + 9 == 2035 and 2026 + (9 - 1) == 2034          # B ; la question en commentaire
XS = (-1.5, -0.5, 0.5, 1.5)                             # les 4 cases u₀ … u₃ (et leurs chiens)
Y_CASES, Y_CHIENS = -1.65, -0.82
BOIS, TOIT_R, PELAGE = "#92400E", "#B91C1C", "#D97706"


def chien(s=1.0, pelage=PELAGE):
    """Un chien de profil vers la droite (pattes sur l'origine)."""
    corps = Ellipse(width=0.55, height=0.26, fill_color=pelage, fill_opacity=1, stroke_width=0).move_to(P(0, 0.28))
    tete = Circle(radius=0.13, fill_color=pelage, fill_opacity=1, stroke_width=0).move_to(P(0.3, 0.44))
    oreille = Ellipse(width=0.08, height=0.17, fill_color="#78350F", fill_opacity=1, stroke_width=0).move_to(
        P(0.25, 0.47)).rotate(0.4)
    nez = Dot(P(0.43, 0.43), radius=0.03, color="#111827")
    queue = Line(P(-0.26, 0.33), P(-0.38, 0.5), stroke_color=pelage, stroke_width=6)
    pattes = VGroup(*[Line(P(x, 0.18), P(x, 0.0), stroke_color=pelage, stroke_width=6) for x in (-0.17, -0.07,
                                                                                                0.1, 0.19)])
    return VGroup(queue, pattes, corps, tete, oreille, nez).scale(s, about_point=ORIGIN)


def coeur(s=1.0, couleur="#EC4899"):
    a = Circle(radius=0.1, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(-0.08, 0.05))
    b = Circle(radius=0.1, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0.08, 0.05))
    c = Polygon(P(-0.175, 0.0), P(0.175, 0.0), P(0, -0.2), fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(a, b, c).scale(s)


def refuge(s=1.0):
    """Le refuge : une maison de bois, son toit, sa porte, une pancarte."""
    mur = Rectangle(width=1.5, height=0.8, fill_color=BOIS, fill_opacity=1, stroke_width=0)
    toit = Polygon(P(-0.9, 0.4), P(0.9, 0.4), P(0, 0.9), fill_color=TOIT_R, fill_opacity=1, stroke_width=0)
    porte = RoundedRectangle(width=0.4, height=0.5, corner_radius=0.18, fill_color="#1f1300", fill_opacity=1,
                             stroke_width=0).move_to(P(0.35, -0.15))
    os_ = VGroup(Line(P(-0.62, 0.05), P(-0.22, 0.05), stroke_color=WHITE, stroke_width=7),
                 *[Dot(P(x, y), radius=0.05, color=WHITE) for x in (-0.64, -0.2) for y in (0.0, 0.1)])
    return VGroup(mur, toit, porte, os_).scale(s)


def calendrier(s=1.0):
    """Un calendrier sans nombre : la page, la bande rouge, deux anneaux, des cases."""
    page = RoundedRectangle(width=1.6, height=1.5, corner_radius=0.1, fill_color=WHITE, fill_opacity=1,
                            stroke_width=0)
    bande = Rectangle(width=1.6, height=0.36, fill_color=PIEGE, fill_opacity=1, stroke_width=0).align_to(page, UP)
    anneaux = VGroup(*[RoundedRectangle(width=0.1, height=0.3, corner_radius=0.05, fill_color=GREY_B,
                                        fill_opacity=1, stroke_width=0).move_to(page.get_top() + P(x, 0))
                       for x in (-0.4, 0.4)])
    cases = VGroup(*[Square(0.2, fill_color=GREY_B, fill_opacity=0.6, stroke_width=0).move_to(
        P(-0.54 + 0.27 * (i % 5), 0.12 - 0.27 * (i // 5))) for i in range(15)])
    return VGroup(page, bande, cases, anneaux).scale(s)


class SuiteArithInterpreterShort(ShortSuites):
    fichier_marques = "suite_arith_interpreter_short_marques.json"
    nom_voix = "premiere-suite-arith-interpreter-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"

    def feuilleter(self, cal, fois=3):
        """Les pages du calendrier tournent (une copie se replie vers le haut)."""
        for _ in range(fois):
            pg = cal[:3].copy()
            self.add(pg)
            self.play(pg.animate.stretch(0.02, 1, about_edge=UP).set_opacity(0.2), run_time=0.3)
            self.remove(pg)

    def sortir_chien(self, ref, k, run_time=0.45):
        """Un chien sort par la porte du refuge et vient au-dessus de la case k."""
        ch = chien(0.95).move_to(ref[2].get_bottom() + UP * 0.02, aligned_edge=DOWN).scale(0.4)
        self.add(ch)
        self.play(ch.animate.scale(2.5).move_to(P(XS[k], Y_CHIENS), aligned_edge=DOWN), run_time=run_time,
                  rate_func=smooth)
        return ch

    def construct(self):
        # ── 00 : la garde ──
        self.dire("00-garde")
        self.entete("Interpréter une suite", extrait="Interpréter")
        pari = self.paragraphe(["Tu paries que", "tu trouves l'année", ("sans te tromper", RAISON),
                                ("d'un an ?", RAISON)], self.fs_grand, buff=0.16, y=1.15)
        for ligne, ex in zip(pari, ("Tu paries", "tu trouves", "sans te", "d'un an")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.3)
        cal = calendrier(1.15).move_to(P(0, -1.75))
        self.play(FadeIn(cal, scale=0.7), run_time=0.3)
        self.feuilleter(cal, 3)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT le refuge ; EN BAS la case u₀ et son année ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        ref = refuge(0.8).move_to(P(0, 2.08))
        self.au_mot("Un refuge")
        self.play(FadeIn(ref, shift=UP * 0.15), run_time=0.4)
        self.au_mot("adopter")
        ch0 = self.sortir_chien(ref, 0)
        cz = coeur(1.0).next_to(ch0, RIGHT, buff=0.08).shift(UP * 0.2)
        self.play(FadeIn(cz, scale=0.5), run_time=0.25)
        self.au_mot("chaque année")
        ca = self.t("chaque année :", 40, WHITE).move_to(P(0, 1.17))
        self.play(FadeIn(ca, shift=UP * 0.1), run_time=0.3)
        self.suivre("12")
        p12 = self.t("+ 12 chiens", 46, RAISON).move_to(P(0, 0.62))
        self.play(FadeIn(p12, scale=1.3), Indicate(ch0, color=RAISON, scale_factor=1.2), FadeOut(cz), run_time=0.4)
        self.au_mot("On note")
        lg = LigneTermes([u(k) for k in range(4)], xs=XS, centre=P(0, Y_CASES), largeur=0.8, hauteur=0.78, fs=40)
        un = VGroup(self.t("uₙ : le nombre", 40, TERME).move_to(P(0, 1.17)),
                    self.t("d'adoptions", 42, WHITE).move_to(P(0, 0.62)))
        self.play(FadeOut(ca), FadeOut(p12), run_time=0.25)
        self.play(FadeIn(un[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("adoptions")
        self.play(FadeIn(un[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("u indice 0")
        self.play(FadeIn(lg.cases[0], scale=0.8), run_time=0.3)
        self.suivre("2026")
        an0 = self.t("2026", 36, JAUNE_TITRE).next_to(lg.cases[0], DOWN, buff=0.2)
        self.play(FadeIn(an0, scale=1.3), run_time=0.3)
        self.insister(VGroup(lg.cases[0], an0), 1.06)
        self.attendre_voix(marge=0.2)

        # ── 02 : l'indice compte les années écoulées : un chien par année ──
        self.dire("02-idee")
        self.au_mot("L'indice")
        idee = VGroup(self.t("l'indice compte", 40, WHITE).move_to(P(0, 1.17)),
                      self.t("les années écoulées", 42, RAISON).move_to(P(0, 0.62)))
        self.play(FadeOut(un), run_time=0.2)
        self.play(FadeIn(idee[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("années")
        self.play(FadeIn(idee[1], shift=UP * 0.1), run_time=0.3)
        for k in range(1, 4):
            s_ = lg.saut(k - 1, " ", cote=UP, fs=20, creux=0.14)
            ch = chien(0.95).move_to(ref[2].get_bottom(), aligned_edge=DOWN).scale(0.4)
            self.add(ch)
            self.play(ch.animate.scale(2.5).move_to(P(XS[k], Y_CHIENS), aligned_edge=DOWN), Create(s_[0]),
                      FadeIn(lg.cases[k], scale=0.8), run_time=0.25)
        self.au_mot("depuis")
        self.suivre("2026")
        dep = self.t("depuis 2026", 42, JAUNE_TITRE).move_to(P(0, 0.08))
        self.play(FadeIn(dep, shift=UP * 0.1), Indicate(an0, color=JAUNE_TITRE, scale_factor=1.25), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → B ──
        q = self.poser_question("03-question",
                                [(self.t("À quelle année", 44), "À quelle"),
                                 (self.t("correspond u₉ ?", 44, RAISON), "correspond")],
                                ["2036", "2035", "2034"], 1, y_question=2.85, fs=50)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 1)
        haut = q.cartes[0].get_center() + UP * 0.2
        fr_ = self.frise(["u₀", "…", "u₉"], -1.1)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), VGroup(q.cartes[1], ok).animate.shift(haut - q.cartes[1].get_center()),
                  FadeIn(fr_.cases[0], scale=0.8), FadeIn(fr_.cases[1]), FadeIn(fr_.cases[2], scale=0.8),
                  run_time=0.3)
        self.suivre("2026")
        a0 = self.t("2026", 42, JAUNE_TITRE).next_to(fr_.cases[0], DOWN, buff=0.18)
        c1 = self.t("2026", 50, WHITE)
        c2 = self.t("+ 9", 50, RAISON)
        c3 = self.t("= 2035", 50, JUSTE)
        calc = VGroup(c1, c2, c3).arrange(RIGHT, buff=0.18)
        if calc.width > 3.7:  # il grandit de 8 % (insister)
            calc.scale_to_fit_width(3.7)
        calc.move_to(P(0, -2.58))
        self.play(FadeIn(a0, scale=1.3), FadeIn(c1, shift=UP * 0.1), run_time=0.3)
        self.suivre("9")
        arc = fr_.saut(0, "+ 9 ans", j=2, cote=UP, fs=38, creux=0.3)
        self.play(Create(arc[0]), FadeIn(arc[1], scale=1.3), FadeIn(c2, shift=UP * 0.1), run_time=0.4)
        self.suivre("2035")
        a9 = self.t("2035", 42, JUSTE).next_to(fr_.cases[2], DOWN, buff=0.18)
        self.play(FadeIn(a9, scale=1.3), FadeIn(c3, shift=UP * 0.1), *self.allumer_cases(fr_, [2]), run_time=0.35)
        self.insister(VGroup(calc), 1.08)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("cette fois")
        cf = self.t("cette fois :", 42, GREY_A).move_to(P(0, 2.3))
        self.play(FadeIn(cf, shift=UP * 0.1), run_time=0.3)
        lc = self.frise(["u₁", "…", "u₉"], 1.25)
        self.au_mot("u indice 1")
        self.play(FadeIn(lc.cases[0], scale=0.8), FadeIn(lc.cases[1]), run_time=0.3)
        self.suivre("2026")
        b0 = self.t("2026", 42, JAUNE_TITRE).next_to(lc.cases[0], DOWN, buff=0.18)
        self.play(FadeIn(b0, scale=1.3), run_time=0.3)
        self.insister(VGroup(lc.cases[0], b0), 1.1)
        self.au_mot("À quelle année")
        l1 = self.t("À quelle année", 46, RAISON).move_to(P(0, -0.45))
        qm = self.t("?", 46, RAISON).next_to(lc.cases[2], DOWN, buff=0.18)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(lc.cases[2], scale=0.8), FadeIn(qm, scale=1.4), run_time=0.35)
        self.suivre("correspond")
        l2 = self.t("correspond u₉ ?", 46, RAISON).move_to(P(0, -1.1))
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(lc.cases[2], color=RAISON), run_time=0.35)
        self.appel_commentaire(-2.3)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")

    def frise(self, noms, y):
        """Trois cases : la première, « … » (sans cadre), la dernière."""
        lg = LigneTermes(noms, xs=(-1.35, 0, 1.35), centre=P(0, y), largeur=1.05, hauteur=0.85, fs=44)
        lg.cases[1][0].set_stroke(opacity=0).set_fill(opacity=0)
        lg.cases[1][1].set_color(GREY_A)
        return lg
