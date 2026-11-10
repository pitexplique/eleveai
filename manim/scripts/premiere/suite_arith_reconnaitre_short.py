# suite_arith_reconnaitre_short.py
# EleveAI — Maths 1re (sans spé) — short « Suite arithmétique : tu la repères
# en 3 secondes ? » (9:16), ceinture BLANCHE (échelle entière sous le titre).
# Série SUITES, épisode 01. Micro du coach : lin_suite_reconnaitre.
#   · 00-garde      : le titre, l'échelle, « en 3 secondes ? » et un chrono ;
#   · 01-situation  : EN HAUT Inès court sur la piste (un couloir par semaine,
#                     les 3 km de plus en orange) ; EN BAS les cases 10, 13, 16, 19
#                     se remplissent EN MÊME TEMPS, sous la fin de chaque course ;
#   · 02-pas        : les flèches « +3 » sautent de case en case, r = 3 ;
#   · 03/03b        : question-pause (B : 50 ; 45 ; 40 ; 35, r = −5), 3 s ;
#   · 04-commentaire: 10, 13, 16, 19 … ? : la 10e semaine (réponse 37 km =
#                     10 + 9 × 3, NON affichée) ; « Réponds en commentaire ! » ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = raison, vert = juste.
# Voix VALIDÉE (10/11) : manim/voix/premiere-suite-arith-reconnaitre-short.json
# (débit −6), calée par suite_arith_reconnaitre_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_arith_reconnaitre_short.py SuiteArithReconnaitreShort -o eleveai-maths-premiere-suite-arith-reconnaitre-short --media_dir manim/scripts/premiere/media-suite-arith-reconnaitre-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403

KM = [10, 13, 16, 19]
assert all(b - a == 3 for a, b in zip(KM, KM[1:]))
assert 10 + 9 * 3 == 37                                   # la 10e semaine (commentaire)
QS = [[2, 4, 8, 16], [50, 45, 40, 35], [1, 4, 9, 16]]
assert [len({b - a for a, b in zip(l, l[1:])}) == 1 for l in QS] == [False, True, False]  # B
X0, ECH = -1.95, 0.19                                    # la piste : x = X0 + ECH × km
Y_COUL = [1.33, 1.03, 0.73, 0.43]                         # les 4 couloirs (semaines)
Y_CASES = -0.75
PISTE, PEAU = "#9A3412", "#8d5524"


def x_km(km):
    return X0 + ECH * km


def coureuse(s=1.0, couleur="#EC4899"):
    """Inès qui court, de profil vers la droite (pieds sur l'origine)."""
    k = dict(stroke_color=WHITE, stroke_width=5)
    tete = Circle(radius=0.11, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0.06, 0.86))
    queue = Line(P(-0.03, 0.9), P(-0.2, 0.78), stroke_color="#1f1300", stroke_width=6)
    corps = Line(P(0.03, 0.74), P(-0.02, 0.4), stroke_color=couleur, stroke_width=9)
    j1 = VMobject(**k).set_points_as_corners([P(-0.02, 0.4), P(0.14, 0.2), P(0.1, 0.0)])
    j2 = VMobject(**k).set_points_as_corners([P(-0.02, 0.4), P(-0.12, 0.2), P(-0.3, 0.14)])
    b1 = VMobject(**k).set_points_as_corners([P(0.02, 0.68), P(0.16, 0.56), P(0.26, 0.66)])
    b2 = VMobject(**k).set_points_as_corners([P(0.02, 0.68), P(-0.12, 0.56), P(-0.2, 0.44)])
    return VGroup(queue, j1, j2, corps, b1, b2, tete).scale(s, about_point=ORIGIN)


def chrono(r=0.55):
    cadran = Circle(radius=r, stroke_color=WHITE, stroke_width=5)
    bouton = RoundedRectangle(width=0.2, height=0.14, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                              stroke_width=0).next_to(cadran, UP, buff=0.02)
    aiguille = Line(ORIGIN, UP * r * 0.8, stroke_color=RAISON, stroke_width=5)
    return VGroup(cadran, bouton), aiguille


class SuiteArithReconnaitreShort(ShortSuites):
    fichier_marques = "suite_arith_reconnaitre_short_marques.json"
    nom_voix = "premiere-suite-arith-reconnaitre-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"

    def piste(self):
        fond = Rectangle(width=X0 * -2, height=1.2, fill_color=PISTE, fill_opacity=1, stroke_width=0)
        fond.move_to(P(0, (Y_COUL[0] + Y_COUL[-1]) / 2))
        traits = VGroup(*[Line(P(X0, y), P(-X0, y), stroke_color=WHITE, stroke_width=1.5, stroke_opacity=0.7)
                          for y in (1.48, 1.18, 0.88, 0.58, 0.28)])
        depart = Line(P(X0, 0.28), P(X0, 1.48), stroke_color=WHITE, stroke_width=4)
        reperes = VGroup(*[Line(P(x_km(km), 0.2), P(x_km(km), 0.28), stroke_color=GREY_B, stroke_width=2)
                           for km in range(0, 21)])
        return VGroup(fond, traits, depart, reperes)

    def courir(self, k, lg, run):
        """La semaine k : Inès court dans son couloir (bleu jusqu'à la course
        d'avant, orange pour les 3 km de plus) ; la case k se remplit dessous."""
        y = Y_COUL[k]
        avant = KM[k - 1] if k else KM[0]
        bleu = Line(P(X0, y), P(x_km(avant), y), stroke_color=TERME, stroke_width=7)
        neuf = Line(P(x_km(avant), y), P(x_km(KM[k]), y), stroke_color=RAISON, stroke_width=7) if k else None
        lien = DashedLine(P(x_km(KM[k]), y - 0.08), lg.cases[k][0].get_top() + UP * 0.05, color=GREY_B,
                          stroke_width=2, dash_length=0.07)
        self.play(Create(bleu), run.animate.move_to(P(x_km(avant), y + 0.02), aligned_edge=DOWN), run_time=0.2,
                  rate_func=linear)
        anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), Create(lien)]
        if neuf:
            anims += [Create(neuf), run.animate.move_to(P(x_km(KM[k]), y + 0.02), aligned_edge=DOWN)]
        self.play(*anims, run_time=0.25, rate_func=linear)
        return VGroup(bleu, *([neuf] if neuf else []), lien)

    def ecarts_sous(self, liste, texte, couleur=RAISON, fs=22, bas=None):
        g = VGroup()
        for a, b in zip(liste.nombres, liste.nombres[1:]):
            y = (bas if bas is not None else a.get_bottom()[1]) - 0.05
            fl = CurvedArrow(P(a.get_center()[0], y), P(b.get_center()[0], y), angle=TAU / 4,
                             color=couleur, stroke_width=3, tip_length=0.1)
            g.add(VGroup(fl, self.t(texte, fs, couleur).next_to(fl, DOWN, buff=0.03)))
        return g

    def construct(self):
        # ── 00 : la garde ──
        self.dire("00-garde")
        self.entete("Suite arithmétique", extrait="Suite")
        self.au_mot("Tu paries")
        g1 = self.t("Tu paries que tu la repères", 30).move_to(P(0, 1.85))
        self.play(FadeIn(g1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("3 secondes")
        g2 = self.t("en 3 secondes ?", 40, RAISON).move_to(P(0, 1.25))
        cad, aig = chrono(0.55)
        VGroup(cad, aig).move_to(P(0, -0.3))
        aig.shift(cad[0].get_center() - aig.get_start())
        self.play(FadeIn(g2, scale=1.3), FadeIn(cad, scale=0.7), FadeIn(aig), run_time=0.35)
        self.play(Rotate(aig, -TAU, about_point=cad[0].get_center()), run_time=1.0, rate_func=linear)
        self.attendre_voix(marge=0.2)

        # ── 01 : Inès court ; les cases se remplissent dessous ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        perso = coureuse(1.05).move_to(P(-1.45, 2.05))
        nom = self.t("Inès", 34, JAUNE_TITRE)
        metier = self.t("prépare un marathon", 24, TERME)
        nm = VGroup(nom, metier).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        if nm.width > 2.9:
            nm.scale_to_fit_width(2.9)
        nm.next_to(perso, RIGHT, buff=0.3)
        self.au_mot("Inès")
        self.play(FadeOut(VGroup(g1, g2, cad, aig)), FadeIn(perso, shift=RIGHT * 0.2), FadeIn(nom), run_time=0.4)
        self.au_mot("prépare")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.3)
        pi = self.piste()
        self.au_mot("marathon")
        self.play(FadeIn(pi[0]), Create(pi[1]), Create(pi[2]), FadeIn(pi[3]), run_time=0.5)
        lg = LigneTermes([str(v) for v in KM], xs=[x_km(v) for v in KM], centre=P(0, Y_CASES), largeur=0.5,
                         hauteur=0.5, fs=26)
        self.au_mot("Chaque semaine")
        cs = VGroup(self.t("chaque", 24, GREY_A), self.t("semaine", 24, GREY_A)).arrange(DOWN, buff=0.06)
        cs.move_to(P(-1.4, Y_CASES + 0.1))
        self.play(FadeIn(cs, shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 kilomètres")
        plus = self.t("+ 3 km", 28, RAISON).move_to(P(-1.4, Y_CASES - 0.6))
        run = coureuse(0.3).move_to(P(X0, Y_COUL[0] + 0.02), aligned_edge=DOWN)
        self.play(FadeIn(plus, scale=1.3), FadeIn(run), run_time=0.3)
        traces = VGroup()
        for k, v in enumerate(KM):
            self.suivre(str(v))
            traces.add(self.courir(k, lg, run))
            if k < 3:
                run.move_to(P(X0, Y_COUL[k + 1] + 0.02), aligned_edge=DOWN)
        self.attendre_voix(marge=0.2)

        # ── 02 : le pas est toujours le même ──
        self.dire("02-pas")
        self.au_mot("plus 3")
        sauts = [lg.saut(k, "+3", fs=20, creux=0.14) for k in range(3)]
        self.play(*[Create(s[0]) for s in sauts], *[Indicate(t[1], color=RAISON) for t in traces[1:]],
                  run_time=0.3)
        self.play(*[FadeIn(s[1], scale=1.4) for s in sauts], run_time=0.2)
        self.au_mot("arithmétique")
        sa = self.t("suite arithmétique", 32, JAUNE_TITRE).move_to(P(0, -1.95))
        self.play(FadeIn(sa, scale=1.2), run_time=0.35)
        self.au_mot("raison")
        rr = VGroup(self.t("raison :", 30, WHITE), self.t("r =", 32, RAISON), self.t("3", 32, RAISON))
        rr.arrange(RIGHT, buff=0.15).move_to(P(0, -2.6))
        rr[1:].shift(RIGHT * 0.12)
        self.play(FadeIn(rr[:2], shift=UP * 0.1), run_time=0.25)
        self.suivre("3")
        cadr = self.encadre(rr[1:], RAISON, 0.1)
        self.play(FadeIn(rr[2], scale=1.4), Create(cadr), run_time=0.3)
        self.insister(VGroup(rr, cadr), 1.15)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → B ──
        listes = [liste_nombres([str(v) for v in l], 30) for l in QS]
        q = self.poser_question("03-question",
                                [(self.t("Laquelle avance toujours", 30), "Laquelle"),
                                 (self.t("du même pas ?", 30), "du même pas")],
                                listes, 1, y_question=2.5)
        self.dire("03b-reponse")
        self.q_reponse(q, 1)
        self.au_mot("5 à")
        ec = self.ecarts_sous(listes[1], "−5", bas=q.cartes[1].get_bottom()[1])
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), *[Create(e[0]) for e in ec], run_time=0.3)
        self.play(*[FadeIn(e[1], scale=1.3) for e in ec], run_time=0.2)
        self.au_mot("5", n=2)
        r5 = VGroup(self.t("r =", 34, JUSTE), self.t("−5", 34, JUSTE)).arrange(RIGHT, buff=0.12).move_to(P(0, -1.3))
        c5 = self.encadre(r5, JUSTE, 0.12)
        self.play(FadeIn(r5, scale=1.3), Create(c5), run_time=0.3)
        self.insister(VGroup(r5, c5), 1.15)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 40, JAUNE_TITRE).move_to(P(0, 3.45))
        ines = coureuse(0.9).move_to(P(-1.3, 1.85))
        self.play(FadeIn(et, shift=DOWN * 0.1), FadeIn(ines, shift=RIGHT * 0.2), run_time=0.35)
        lc = LigneTermes(["10", "13", "16", "19", "…", "?"], pas=0.7, largeur=0.56, hauteur=0.52, fs=26,
                         centre=P(0, 0.35))
        lc.cases[4][0].set_stroke(opacity=0)
        lc.cases[4][1].set_color(GREY_A)
        for k in range(4):
            self.suivre(str(KM[k]))
            self.montrer_case(lc, k, run_time=0.25)
        self.play(FadeIn(lc.cases[4][1]), run_time=0.2)
        self.au_mot("Combien")
        c1 = self.t("Combien de kilomètres", 28, RAISON).move_to(P(0, -0.65))
        self.play(FadeIn(c1, shift=UP * 0.1), FadeIn(lc.cases[5], scale=1.3), run_time=0.35)
        self.au_mot("10e")
        bulle = self.t("la 10e semaine ?", 28, RAISON, larg=2.8).next_to(ines, RIGHT, buff=0.25)
        self.play(FadeIn(bulle, scale=1.2), Indicate(lc.cases[5], color=RAISON),
                  run_time=0.4)
        self.appel_commentaire(-1.7)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
