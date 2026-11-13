# suite_evolution_short.py
# EleveAI — Maths 1re spé — short « Pourcentages : tu paries que + 20 %, puis
# − 20 %, ne fait pas zéro ? » (9:16), ceinture BLANCHE (échelle entière à 70 %
# sous le titre). Série SUITES, épisode 22. Micro : suite_evolution (évolutions
# successives : on multiplie les coefficients ; 1,2 × 0,8 = 0,96).
#   · 00-garde      : le titre, l'échelle, le pari ; la barre qui monte de 20 %,
#                     puis redescend de 20 %… SOUS le départ ;
#   · 01-situation  : EN HAUT Hugo, photographe, et l'étiquette de son tarif
#                     (200 €, puis 240 €) ; EN BAS les cases 200 → 240 → ?, EN MÊME
#                     TEMPS, les flèches « + 20 % » et « − 20 % » ;
#   · 02-calcul     : 240 × 0,8 = 192 (l'étiquette ET la case) ; « Pas 200 ! » ;
#   · 03/03b        : question-pause (B : une baisse de 4 %), 3 s ; 1,2 × 0,8 = 0,96 ;
#   · 04-commentaire: + 50 %, puis − 50 % ? (réponse : × 1,5 × 0,5 = × 0,75, une
#                     baisse de 25 %, NON affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur : bleu = les termes (le tarif), orange = la hausse, rouge = la
# baisse et le piège, vert = juste.
# Voix : manim/voix/premiere-spe-suite-evolution-short.json (débit −6), calée par
# suite_evolution_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_evolution_short.py SuiteEvolutionShort -o eleveai-maths-premiere-spe-suite-evolution-short --media_dir manim/scripts/premiere/media-suite-evolution-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter_short import SuiteGeoInterpreterShort as _S16  # noqa: E402  (ép. 16)
from suite_termes_short import SuiteTermesShort as _S18  # noqa: E402  (ép. 18)
from suite_modeliser import SuiteModeliser1reSpe as _P21  # noqa: E402  (ép. 21 : ligne sans ligature)
from suite_evolution import Bords6, etiquette  # noqa: E402  (la paysage)

assert 200 * 1.2 == 240 and abs(240 * 0.8 - 192) < 1e-9                   # 01, 02
assert abs(1.2 * 0.8 - 0.96) < 1e-12 and abs(1 - 0.96 - 0.04) < 1e-12     # question : B (baisse de 4 %)
assert abs(1.5 * 0.5 - 0.75) < 1e-12                                       # commentaire : − 25 % (non affiché)


def hugo(s=1.0):
    """Hugo, photographe : casquette, t-shirt gris, l'appareil devant lui."""
    corps = RoundedRectangle(width=0.9, height=1.05, corner_radius=0.3, fill_color="#475569", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.05))
    tete = Circle(radius=0.25, fill_color="#c68642", fill_opacity=1, stroke_width=0).move_to(P(0, 0.85))
    casquette = VGroup(Sector(radius=0.27, angle=PI, start_angle=0, fill_color=RAISON, fill_opacity=1,
                              stroke_width=0).move_to(P(0, 1.02)),
                       Rectangle(width=0.32, height=0.07, fill_color=RAISON, fill_opacity=1, stroke_width=0)
                       .move_to(P(0.25, 0.97)))
    boitier = RoundedRectangle(width=0.62, height=0.4, corner_radius=0.06, fill_color="#111827", fill_opacity=1,
                               stroke_color=GREY_B, stroke_width=2).move_to(P(0, 0.25))
    objectif = Circle(radius=0.14, fill_color="#1E293B", fill_opacity=1, stroke_color=TERME, stroke_width=4
                      ).move_to(P(0, 0.25))
    flash = Rectangle(width=0.14, height=0.07, fill_color=GREY_A, fill_opacity=1, stroke_width=0).move_to(P(-0.18, 0.5))
    g = VGroup(corps, tete, casquette, flash, boitier, objectif).scale(s)
    g.objectif = objectif
    return g


class SuiteEvolutionShort(Bords6, AuditMilliers, OutilsEp12, OutilsGraphique, ShortSuites):
    fichier_marques = "suite_evolution_short_marques.json"
    nom_voix = "premiere-spe-suite-evolution-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "blanche"
    place_coche = 0.15
    largeur_texte = 3.85          # une vraie marge latérale (≈ 6 %) pour les textes pleine largeur
    k_allumer = 1.03
    entete = _S16.entete
    q_reponse = _S18.q_reponse
    ligne = _P21.ligne

    def prix(self, texte, couleur=WHITE):
        t = Text(texte, font_size=30, color=couleur)
        return t.move_to(self.tag[0].get_center() + LEFT * 0.16)

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; la barre ──
        self.dire("00-garde")
        self.entete("Pourcentages", extrait="Pourcentages", fs=40)
        self.calcul([("Tu paries que", WHITE, "Tu paries")], 2.15, centre=0, fs=40)
        base, h, w = -2.7, 2.0, 1.3
        b = Rectangle(width=w, height=h, fill_color=TERME, fill_opacity=1, stroke_width=0).move_to(P(0, base + h / 2))
        haut = Rectangle(width=w, height=0.2 * h, fill_color=RAISON, fill_opacity=1, stroke_width=0)
        haut.next_to(b, UP, buff=0)
        rouge = Rectangle(width=w, height=0.2 * 1.2 * h, fill_color=PIEGE, fill_opacity=1, stroke_width=0)
        rouge.move_to(P(0, base + 1.2 * h), aligned_edge=UP)
        depart = DashedLine(P(-1.5, base + h), P(1.5, base + h), color=GREY_A, dash_length=0.1, stroke_width=3)
        self.calcul([("+ 20 %,", RAISON, "20"), ("puis", WHITE, "puis"), ("− 20 %", PIEGE, "20")], 1.5, centre=0, fs=40,
                    avec_morceau={0: [GrowFromEdge(b, DOWN), Create(depart), GrowFromEdge(haut, DOWN)],
                                  2: [FadeIn(rouge)]})
        self.play(rouge.animate.set_fill(opacity=0.12), haut.animate.set_fill(opacity=0), run_time=0.4)
        q = Text("?", font_size=70, color=PIEGE).move_to(P(1.25, base + h - 0.15))
        self.calcul([("ne fait pas zéro ?", WHITE, "ne fait pas")], 0.85, centre=0, fs=40, avec=[FadeIn(q, scale=1.5)])
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT Hugo et l'étiquette ; EN BAS 200 → 240 → ? ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        hg = hugo(1.05).move_to(P(-1.35, 1.55))
        self.au_mot("Hugo")
        nom = self.t("Hugo", 42, JAUNE_TITRE).move_to(P(0.62, 2.2))
        self.play(FadeIn(hg, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.4)
        met = self.t("photographe", 30, TERME, larg=2.5).move_to(P(0.62, 1.68))
        self.au_mot("photographe")
        self.play(FadeIn(met, shift=UP * 0.1), Flash(hg.objectif, color=WHITE, line_length=0.18), run_time=0.4)
        self.tag = etiquette(1.5, TERME).move_to(P(0.62, 0.98))
        xs = (-1.42, 0.0, 1.42)
        lg = LigneTermes(["200", "240", "?"], xs=xs, centre=P(0, -0.72), largeur=1.12, hauteur=0.88, fs=30)
        lg.cases[2][1].set_color(PIEGE)
        p200, p240 = self.prix("200 €"), self.prix("240 €", RAISON)
        self.au_mot("tarif")
        self.play(FadeIn(self.tag, scale=0.8), run_time=0.3)
        self.suivre("20 %")
        a1 = lg.saut(0, "+ 20 %", cote=UP, fs=30)
        self.suivre("200")
        self.play(FadeIn(p200, scale=1.3), FadeIn(lg.cases[0][0], scale=0.8), FadeIn(lg.cases[0][1], scale=1.4),
                  run_time=0.3)
        self.suivre("240")
        self.play(FadeOut(p200), FadeIn(p240, scale=1.3), Create(a1[0]), FadeIn(a1[1], scale=1.3),
                  FadeIn(lg.cases[1][0], scale=0.8), FadeIn(lg.cases[1][1], scale=1.4), run_time=0.4)
        a2 = lg.saut(1, "− 20 %", cote=DOWN, couleur=PIEGE, fs=30)
        self.au_mot("promotion")
        self.play(Create(a2[0]), FadeIn(a2[1], scale=1.3), FadeIn(lg.cases[2][0], scale=0.8),
                  FadeIn(lg.cases[2][1], scale=1.4), Indicate(self.tag, color=PIEGE), run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 02 : 240 × 0,8 = 192 (l'étiquette ET la case) ; « Pas 200 ! » ──
        garde = (self.badge, self.titre_s, hg, nom, met, self.tag, p240, *lg.cases[0], *lg.cases[1], lg.cases[2][0], *a1)
        self.nouvel_ecran("02-calcul", garder=garde)
        vieux = lg.cases[2][1]
        self.remove(vieux)
        lg.cases[2].remove(vieux)
        n192 = Text("192", font_size=30, color=JUSTE).move_to(lg.cases[2][0])
        p192 = self.prix("192 €", JUSTE)
        self.largeur_texte = 3.3          # cadre de 192 compris : 6 % de marge de chaque côté
        c = self.calcul([("240 ×", WHITE, "240 fois"), ("0,8", PIEGE, "0,8"), ("=", WHITE, None), ("192", JUSTE, "192")],
                        -1.78, centre=-0.1, fs=44, avec_morceau={3: [FadeIn(n192, scale=1.4), FadeOut(p240),
                                                                 FadeIn(p192, scale=1.3)]})
        self.largeur_texte = 3.85
        lg.cases[2].add(n192)
        self.play(c[-1].animate.shift(RIGHT * 0.1), run_time=0.12)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.1)), *self.allumer_cases(lg, [2]), run_time=0.3)
        self.calcul([("Pas 200 !", PIEGE, "Pas 200")], -2.5, centre=0, fs=44,
                    avec=[lg.cases[0][0].animate.set_stroke(PIEGE, width=6), Indicate(lg.cases[0][1], color=PIEGE)])
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → B (une baisse de 4 %) ; 1,2 × 0,8 = 0,96 ──
        corps = [self.t(c, 40, WHITE, 1e9) for c in ("0 %", "baisse de 4 %", "hausse de 4 %")]
        larg = 3.8
        place = larg - self.place_coche - 0.5 * 40 / 32 - 0.45
        f = min(1.0, place / max(m.width for m in corps))
        for m in corps:  # les trois corps à la MÊME taille
            m.scale(f)
        cartes = VGroup(*[self.bouton(Ln, m, larg, 40) for Ln, m in zip("ABC", corps)]).arrange(DOWN, buff=0.2)
        cartes.move_to(P(0, -0.02))

        def e1():
            self.largeur_texte = 3.85     # la pause (déjà placée) est bornée plus étroit : marge avec le rebours
            self.calcul([("+ 20 %,", RAISON, "20"), ("puis", WHITE, "puis"), ("− 20 %,", PIEGE, "20")], 2.62, centre=0,
                        fs=40)
            self.calcul([("c'est au total :", WHITE, "c'est au total")], 2.0, centre=0, fs=40)

        self.largeur_texte = 3.85
        q = self.question_libre("03-question", [e1], cartes, P(0, -2.2))
        self.largeur_texte = 3.85
        self.dire("03b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        self.largeur_texte = 3.3          # cadre de 0,96 compris : 6 % de marge de chaque côté (relecture 13/11)
        c = self.calcul([("1,2 ×", RAISON, "1,2 fois"), ("0,8", PIEGE, "0,8"), ("=", WHITE, "égale"), ("0,96", JUSTE, "0,96")],
                        -2.12, centre=-0.1, fs=44)
        self.largeur_texte = 3.85
        self.play(c[-1].animate.shift(RIGHT * 0.1), run_time=0.12)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.1)), run_time=0.25)
        self.calcul([("une baisse de", WHITE, "une baisse"), ("4 %", JUSTE, "4 %")], -2.72, centre=0, fs=44)
        self.attendre_voix(marge=0.8)

        # ── 04 : la question en commentaire : + 50 %, puis − 50 % ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 52, JAUNE_TITRE).move_to(P(0, 3.38))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        base, h, w = -1.55, 1.2, 1.2
        b = Rectangle(width=w, height=h, fill_color=TERME, fill_opacity=1, stroke_width=0).move_to(P(0, base + h / 2))
        haut = Rectangle(width=w, height=0.5 * h, fill_color=RAISON, fill_opacity=1, stroke_width=0).next_to(b, UP, buff=0)
        rouge = Rectangle(width=w, height=0.75 * h, fill_color=PIEGE, fill_opacity=0.35, stroke_color=PIEGE,
                          stroke_width=3).move_to(P(0, base + 1.5 * h), aligned_edge=UP)
        depart = DashedLine(P(-1.4, base + h), P(1.4, base + h), color=GREY_A, dash_length=0.1, stroke_width=3)
        q2 = Text("?", font_size=64, color=JAUNE_TITRE).move_to(P(1.2, base + 0.9 * h))
        self.calcul([("+ 50 %,", RAISON, "50"), ("puis", WHITE, "puis"), ("− 50 %,", PIEGE, "50")], 2.62, centre=0, fs=40,
                    avec_morceau={0: [GrowFromEdge(b, DOWN), Create(depart), GrowFromEdge(haut, DOWN)],
                                  2: [FadeIn(rouge)]})
        self.calcul([("quelle évolution", WHITE, "quelle évolution")], 2.02, centre=0, fs=40)
        self.calcul([("au total,", WHITE, "au total")], 1.42, centre=0, fs=40)
        self.calcul([("en pourcentage ?", WHITE, "en pourcentage")], 0.82, centre=0, fs=40, avec=[FadeIn(q2, scale=1.5)])
        self.appel_commentaire(-2.3)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
