# suite_arith_reconnaitre_short.py
# EleveAI — Maths 1re (sans spé) — short « Suite arithmétique : tu la repères
# en 3 secondes ? » (9:16), ceinture BLANCHE (échelle entière sous le titre).
# Série SUITES, épisode 01. Micro du coach : lin_suite_reconnaitre.
#   · 00-garde      : le titre, l'échelle, « en 3 secondes ? » et un chrono ;
#   · 01-situation  : EN HAUT Inès court sur la piste (un couloir par semaine,
#                     les 3 km de plus en orange ; la piste est coupée « // » entre
#                     0 et 8 km pour que les cases soient grandes) ; EN BAS les cases
#                     10, 13, 16, 19 se remplissent EN MÊME TEMPS, sous la fin de
#                     chaque course (un pointillé les relie) ;
#   · 02-pas        : les flèches « +3 » sautent de case en case, r = 3 ;
#   · 03/03b        : question-pause (B : 50 ; 45 ; 40 ; 35, r = −5), 3 s ;
#   · 04-commentaire: 10, 13, 16, 19 … ? en haut, puis la question dans l'ordre
#                     de la voix (« Combien de kilomètres Inès courra-t-elle la 10e
#                     semaine ? »), puis « Réponds en commentaire ! » (réponse 37 km =
#                     10 + 9 × 3, NON affichée) ;
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
XD, XB = -2.0, -1.55                     # la ligne de départ ; la coupure « // » (0 → 8 km)
ECH = (1.95 - XB) / (20 - 8)              # après la coupure : x = XB + ECH × (km − 8)
Y_COUL = [1.45, 1.05, 0.65, 0.25]         # les 4 couloirs (semaines 1 à 4), 0,4 de haut
Y_CASES = -0.6
PISTE, PEAU = "#9A3412", "#8d5524"


def x_km(km):
    return XB + ECH * (km - 8)


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


def chrono(r=0.9):
    cadran = Circle(radius=r, stroke_color=WHITE, stroke_width=7)
    bouton = RoundedRectangle(width=0.3, height=0.2, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                              stroke_width=0).next_to(cadran, UP, buff=0.03)
    aiguille = Line(ORIGIN, UP * r * 0.8, stroke_color=RAISON, stroke_width=7)
    return VGroup(cadran, bouton), aiguille


class SuiteArithReconnaitreShort(ShortSuites):
    fichier_marques = "suite_arith_reconnaitre_short_marques.json"
    nom_voix = "premiere-suite-arith-reconnaitre-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"

    def piste(self):
        haut, bas = Y_COUL[0] + 0.2, Y_COUL[-1] - 0.2
        fond = Rectangle(width=-2 * XD, height=haut - bas, fill_color=PISTE, fill_opacity=1, stroke_width=0)
        fond.move_to(P(0, (haut + bas) / 2))
        traits = VGroup(*[Line(P(XD, y), P(-XD, y), stroke_color=WHITE, stroke_width=1.5, stroke_opacity=0.7)
                          for y in np.linspace(bas, haut, 5)])
        depart = Line(P(XD, bas), P(XD, haut), stroke_color=WHITE, stroke_width=4)
        coupure = VGroup(*[Line(P(XB - 0.2 + dx, bas - 0.08), P(XB - 0.1 + dx, haut + 0.08), stroke_color=BLACK,
                                stroke_width=7) for dx in (0, 0.1)])
        reperes = VGroup(*[Line(P(x_km(km), bas - 0.09), P(x_km(km), bas), stroke_color=GREY_B, stroke_width=2)
                           for km in range(8, 21)])
        return VGroup(fond, traits, depart, coupure, reperes)

    def courir(self, k, lg, run):
        """La semaine k : Inès court dans son couloir (bleu jusqu'à la course
        d'avant, orange pour les 3 km de plus) ; la case k se remplit dessous."""
        y = Y_COUL[k]
        avant = KM[k - 1] if k else KM[0]
        bleu = Line(P(XD, y), P(x_km(avant), y), stroke_color=TERME, stroke_width=8)
        neuf = Line(P(x_km(avant), y), P(x_km(KM[k]), y), stroke_color=RAISON, stroke_width=8) if k else None
        lien = DashedLine(P(x_km(KM[k]), y - 0.08), lg.cases[k][0].get_top() + UP * 0.05, color=GREY_B,
                          stroke_width=2, dash_length=0.08)
        self.play(Create(bleu), run.animate.move_to(P(x_km(avant), y - 0.17), aligned_edge=DOWN), run_time=0.2,
                  rate_func=linear)
        anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), Create(lien)]
        if neuf:
            anims += [Create(neuf), run.animate.move_to(P(x_km(KM[k]), y - 0.17), aligned_edge=DOWN)]
        self.play(*anims, run_time=0.25, rate_func=linear)
        return VGroup(bleu, *([neuf] if neuf else []), lien)

    def ecarts_sous(self, liste, texte, couleur=RAISON, fs=34, bas=None):
        g = VGroup()
        for a, b in zip(liste.nombres, liste.nombres[1:]):
            y = (bas if bas is not None else a.get_bottom()[1]) - 0.05
            fl = CurvedArrow(P(a.get_center()[0], y), P(b.get_center()[0], y), angle=TAU / 4,
                             color=couleur, stroke_width=4, tip_length=0.13)
            g.add(VGroup(fl, self.t(texte, fs, couleur).next_to(fl, DOWN, buff=0.04)))
        return g

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari en gros ──
        self.dire("00-garde")
        self.entete("Suite arithmétique", extrait="Suite")
        pari = self.paragraphe(["Tu paries que", "tu la repères", ("en 3 secondes ?", RAISON)], self.fs_grand,
                               buff=0.2, y=1.35)
        for ligne, ex in zip(pari, ("Tu paries", "tu la", "3 secondes")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.3)
        cad, aig = chrono(0.85)
        VGroup(cad, aig).move_to(P(0, -1.6))
        aig.shift(cad[0].get_center() - aig.get_start())
        self.play(FadeIn(cad, scale=0.7), FadeIn(aig), run_time=0.3)
        self.play(Rotate(aig, -TAU, about_point=cad[0].get_center()), run_time=1.0, rate_func=linear)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT Inès court ; EN BAS les cases se remplissent dessous ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        nom = self.t("Inès", 48, JAUNE_TITRE).move_to(P(0, 2.36))
        metier = self.t("prépare un marathon", 36, TERME).move_to(P(0, 1.85))
        self.au_mot("Inès")
        self.play(FadeOut(VGroup(pari, cad, aig)), FadeIn(nom, shift=UP * 0.1), run_time=0.4)
        self.au_mot("prépare")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.3)
        pi = self.piste()
        run = coureuse(0.38).move_to(P(XD + 0.1, Y_COUL[0] - 0.17), aligned_edge=DOWN)
        self.au_mot("marathon")
        self.play(FadeIn(pi[0]), Create(pi[1]), Create(pi[2]), FadeIn(pi[3:]), FadeIn(run), run_time=0.5)
        lg = LigneTermes([str(v) for v in KM], xs=[x_km(v) for v in KM], centre=P(0, Y_CASES), largeur=0.8,
                         hauteur=0.72, fs=40)
        self.au_mot("Chaque semaine")
        cs = self.t("chaque semaine", 38, GREY_A).move_to(P(0, -1.85))
        self.play(FadeIn(cs, shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 kilomètres")
        plus = self.t("+ 3 km", 50, RAISON).move_to(P(0, -2.5))
        self.play(FadeIn(plus, scale=1.3), run_time=0.3)
        traces = VGroup()
        for k, v in enumerate(KM):
            self.suivre(str(v))
            traces.add(self.courir(k, lg, run))
            if k < 3:
                run.move_to(P(XD + 0.1, Y_COUL[k + 1] - 0.17), aligned_edge=DOWN)
        self.attendre_voix(marge=0.2)

        # ── 02 : le pas est toujours le même ──
        self.dire("02-pas")
        self.au_mot("plus 3")
        sauts = [lg.saut(k, "+3", fs=30, creux=0.18) for k in range(3)]
        self.play(FadeOut(cs), FadeOut(plus), *[Create(s[0]) for s in sauts],
                  *[Indicate(t[1], color=RAISON) for t in traces[1:]], run_time=0.3)
        self.play(*[FadeIn(s[1], scale=1.4) for s in sauts], run_time=0.2)
        self.au_mot("arithmétique")
        sa = self.t("suite arithmétique", 42, JAUNE_TITRE).move_to(P(0, -2.1))
        self.play(FadeIn(sa, scale=1.2), run_time=0.35)
        self.au_mot("raison")
        rr = VGroup(self.t("raison :", 40, WHITE), self.t("r =", 44, RAISON), self.t("3", 44, RAISON))
        rr.arrange(RIGHT, buff=0.15)
        rr[1:].shift(RIGHT * 0.12)
        if rr.width > 3.6:  # il grandit de 10 % (insister)
            rr.scale_to_fit_width(3.6)
        rr.move_to(P(0, -2.72))
        self.play(FadeIn(rr[:2], shift=UP * 0.1), run_time=0.25)
        self.suivre("3")
        cadr = self.encadre(rr[1:], RAISON, 0.1)
        self.play(FadeIn(rr[2], scale=1.4), Create(cadr), run_time=0.3)
        self.insister(VGroup(rr, cadr), 1.1)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → B ──
        listes = [self.liste(l) for l in QS]
        q = self.poser_question("03-question",
                                [(self.t("Laquelle avance", 40), "Laquelle"), (self.t("toujours", 40), "toujours"),
                                 (self.t("du même pas ?", 40), "du même pas")],
                                listes, 1, y_question=2.85)
        self.dire("03b-reponse")
        self.q_reponse(q, 1)
        self.au_mot("5 à")
        ec = self.ecarts_sous(listes[1], "−5", fs=28, bas=q.cartes[1].get_bottom()[1])
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), *[Create(e[0]) for e in ec], run_time=0.3)
        self.play(*[FadeIn(e[1], scale=1.3) for e in ec], run_time=0.2)
        self.au_mot("5", n=2)
        r5 = VGroup(self.t("r =", 56, JUSTE), self.t("−5", 56, JUSTE)).arrange(RIGHT, buff=0.15)
        r5.move_to(P(0, q.cartes[1].get_bottom()[1] - 1.2))
        c5 = self.encadre(r5, JUSTE, 0.14)
        self.play(FadeIn(r5, scale=1.3), Create(c5), run_time=0.3)
        self.insister(VGroup(r5, c5), 1.1)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        lc = LigneTermes(["10", "13", "16", "19", "…", "?"], pas=0.7, largeur=0.64, hauteur=0.62, fs=36,
                         centre=P(0, 2.0))
        lc.cases[4][0].set_stroke(opacity=0)
        lc.cases[4][1].set_color(GREY_A)
        for k in range(4):
            self.suivre(str(KM[k]))
            self.montrer_case(lc, k, run_time=0.25)
        self.play(FadeIn(lc.cases[4][1]), FadeIn(lc.cases[5], scale=1.3), run_time=0.25)
        question = self.paragraphe([("Combien de", RAISON), ("kilomètres", RAISON), "Inès courra-t-elle",
                                    ("la 10e semaine ?", RAISON)], 44, buff=0.14, y=0.1)
        for ligne, ex in zip(question, ("Combien", "kilomètres", "Inès", "10e")):
            self.au_mot(ex)
            anims = [FadeIn(ligne, shift=UP * 0.1)]
            if ex == "10e":
                anims.append(Indicate(lc.cases[5], color=RAISON))
            self.play(*anims, run_time=0.3)
        self.appel_commentaire(-2.35)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
