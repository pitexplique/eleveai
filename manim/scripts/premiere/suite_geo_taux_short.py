# suite_geo_taux_short.py
# EleveAI — Maths 1re (sans spé) — short « Pourcentage et raison : tu ne te fais
# pas avoir ? » (9:16), ceinture BLANCHE (échelle entière sous le titre, 70 %).
# Série SUITES, épisode 11. Micro du coach : expo_suite_taux.
#   · 00-garde      : le titre, l'échelle, le pari en gros, un « % » qui gigote ;
#   · 01-situation  : EN HAUT le smartphone et sa jauge de valeur (5 crans de
#                     20 %), EN BAS la barre de sa valeur : le même morceau
#                     « − 20 % » s'allume en orange EN MÊME TEMPS en haut et en bas ;
#   · 02-idee       : le morceau perdu est barré (en haut et en bas), il reste 80 % ;
#   · 03/03b        : question-pause (A : 0,8), 3 s ; les pièges 0,2 et 1,2 rayés,
#                     croix à côté ; 1 − 20/100 = 0,8 ;
#   · 04-commentaire: 500 € → ? (− 20 % par an), « Combien vaut-il après 2 ans ? »,
#                     « Réponds en commentaire ! » (réponse 320 € = 500 × 0,8²,
#                     NON affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = la valeur, orange = le morceau perdu,
# vert = juste, rouge = piège. Pas de LaTeX.
# Voix : manim/voix/premiere-suite-geo-taux-short.json (débit −6), calée par
# suite_geo_taux_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_geo_taux_short.py SuiteGeoTauxShort -o eleveai-maths-premiere-suite-geo-taux-short --media_dir manim/scripts/premiere/media-suite-geo-taux-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_geo_taux import Barre, SuiteGeoTaux1re, frac  # noqa: E402

assert abs((1 - 20 / 100) - 0.8) < 1e-9                    # 03 : réponse A
assert abs(500 * 0.8 ** 2 - 320) < 1e-9                    # le commentaire : 320 €


def smartphone(h=2.1):
    """Le smartphone et sa jauge de valeur : 5 crans de 20 % (du bas vers le haut)."""
    l = h * 0.52
    corps = RoundedRectangle(width=l, height=h, corner_radius=0.16, fill_color="#111827", fill_opacity=1,
                             stroke_color=GREY_A, stroke_width=4)
    ecran = RoundedRectangle(width=l * 0.84, height=h * 0.8, corner_radius=0.06, fill_color="#0b2540",
                             fill_opacity=1, stroke_width=0).move_to(corps).shift(UP * h * 0.02)
    hp = RoundedRectangle(width=l * 0.3, height=0.05, corner_radius=0.02, fill_color=GREY_B, fill_opacity=1,
                          stroke_width=0).move_to(corps.get_top() + DOWN * 0.08)
    bouton = Circle(radius=0.06, stroke_color=GREY_B, stroke_width=2).move_to(corps.get_bottom() + UP * 0.1)
    hc = ecran.height * 0.8 / 5
    crans = VGroup(*[RoundedRectangle(width=ecran.width * 0.6, height=hc - 0.05, corner_radius=0.04,
                                      fill_color=TERME, fill_opacity=0.9, stroke_width=0) for _ in range(5)])
    crans.arrange(UP, buff=0.05).move_to(ecran)
    g = VGroup(corps, ecran, hp, bouton, crans)
    g.crans = crans
    return g


class SuiteGeoTauxShort(ShortSuites):
    fichier_marques = "suite_geo_taux_short_marques.json"
    nom_voix = "premiere-suite-geo-taux-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"
    decoupe = SuiteGeoTaux1re.decoupe   # une ligne = un Text, coupé en morceaux

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari en gros ──
        self.dire("00-garde")
        self.entete("Pourcentage et raison", extrait="Pourcentage", fs=40)
        pari = self.paragraphe(["Tu paries que", "tu ne te fais pas", "avoir par les", ("pourcentages ?", RAISON)],
                               self.fs_grand, buff=0.2, y=1.25)
        for ligne, ex in zip(pari, ("Tu paries", "tu ne te", "avoir", "pourcentages")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.3)
        pc = self.t("%", 150, RAISON).move_to(P(0, -1.55))
        self.play(GrowFromCenter(pc), run_time=0.35)
        self.play(Wiggle(pc, scale_value=1.15, rotation_angle=0.08 * TAU), run_time=0.9)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT le smartphone et sa jauge, EN BAS la barre de sa valeur ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        tel = smartphone(2.15).move_to(P(-1.05, 1.3))
        self.au_mot("smartphone")
        self.play(FadeIn(tel, shift=UP * 0.2), run_time=0.45)
        W = 3.9
        b = Barre(-20, W=W, h=0.75, gauche=P(-W / 2, -0.95))
        cran = tel.crans[-1]
        lien = DashedLine(cran.get_right() + RIGHT * 0.08, P(b.morceau.get_center()[0], b.get_top()[1] + 0.08),
                          color=GREY_B, stroke_width=2, dash_length=0.08)
        self.au_mot("perd")
        self.play(GrowFromEdge(VGroup(b.bleu, b.morceau), LEFT), run_time=0.4)
        self.suivre("20 %")
        m20 = self.t("− 20 %", 44, RAISON).move_to(P(0.9, 1.85))
        self.play(cran.animate.set_fill(RAISON, 1), b.morceau.animate.set_fill(RAISON, 1), Create(lien),
                  FadeIn(m20, scale=1.3), run_time=0.4)
        self.au_mot("valeur")
        val = self.t("sa valeur", 40, TERME).next_to(b, UP, buff=0.22).align_to(b, LEFT)
        self.play(FadeIn(val, shift=UP * 0.1), Indicate(b.bleu, color=TERME, scale_factor=1.04), run_time=0.4)
        self.au_mot("chaque année")
        ca = self.t("chaque année", 42, GREY_A).move_to(P(0, -2.3))
        self.play(FadeIn(ca, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : perdre 20 %, c'est garder 80 % ──
        self.dire("02-idee")
        self.au_mot("Perdre")
        self.play(FadeOut(ca), Indicate(b.morceau, color=RAISON, scale_factor=1.1),
                  Indicate(cran, color=RAISON, scale_factor=1.1), run_time=0.4)
        self.au_mot("garder")
        cx_b = self.barrer(b.morceau, buff=0.04).set_stroke(width=6)
        cx_t = self.barrer(cran, buff=0.03).set_stroke(width=5)
        acc = Brace(b.bleu, DOWN, buff=0.1, color=JUSTE)
        g80t, g80 = self.decoupe("on garde 80 %", ["on garde", "80 %"], 50, [JUSTE, JUSTE])
        g80t.scale_to_fit_width(3.6).next_to(acc, DOWN, buff=0.15).set_x(0)
        self.play(Create(cx_b), Create(cx_t), b.morceau.animate.set_fill(opacity=0.35),
                  cran.animate.set_fill(opacity=0.35), FadeOut(lien), GrowFromCenter(acc),
                  FadeIn(g80[0], shift=UP * 0.1), *[Indicate(c, color=JUSTE, scale_factor=1.08) for c in tel.crans[:4]],
                  run_time=0.4)
        self.suivre("80 %")
        self.play(FadeIn(g80[1], scale=1.4), run_time=0.3)
        self.insister(g80t, 1.06)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → A (0,8) ; les pièges 0,2 et 1,2 rayés ──
        self.hauteur_bouton, self.buff_boutons = 0.78, 0.14
        q = self.poser_question("03-question",
                                [(self.t("Perdre 20 %,", 44), "20 %"),
                                 (self.t("c'est multiplier par :", 44), "c'est multiplier")],
                                [self.t(c, 48) for c in ("0,8", "0,2", "1,2")], 0, y_question=2.85, fs=48)
        self.dire("03b-reponse")
        self.q_reponse(q, 0)
        fs, y = 42, q.cartes.get_bottom()[1] - 0.55
        t1, (un, mo) = self.decoupe("1 −", ["1", "−"], fs, [JUSTE, JUSTE])
        fr_ = frac("20", "100", 32, JUSTE)
        t2, (eg, res) = self.decoupe("= 0,8", ["=", "0,8"], fs, [JUSTE, JUSTE])
        VGroup(t1, fr_, t2).arrange(RIGHT, buff=0.2).move_to(P(0, y))
        etapes = [(un, "1"), (mo, "moins"), (VGroup(fr_.num, fr_.trait), "20"), (fr_.den, "100"), (eg, "égale"),
                  (res, "0,8")]
        for m, ex in etapes:
            self.suivre(ex)
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.18)
        self.insister(res, 1.15)
        for j in (1, 2):  # le piège : × 0,2 (le morceau perdu), × 1,2 (une hausse)
            corps = q.cartes[j][1][1]
            corps.set_opacity(1)
            tr = Line(corps.get_left() + LEFT * 0.1, corps.get_right() + RIGHT * 0.1, stroke_color=PIEGE,
                      stroke_width=6).move_to(corps.get_center())
            cx = self.barrer(Square(0.3)).next_to(corps, RIGHT, buff=0.3)
            self.play(Create(tr), Create(cx), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        lc = LigneTermes(["500 €", "?"], xs=(-1.05, 1.05), centre=P(0, 1.75), largeur=1.9, hauteur=0.85, fs=38)
        petit = smartphone(0.8).next_to(lc.cases[0], DOWN, buff=0.2)
        self.au_mot("un smartphone")
        self.play(FadeIn(petit, shift=UP * 0.1), run_time=0.3)
        self.suivre("500")
        self.montrer_case(lc, 0, run_time=0.25)
        self.suivre("20 %")
        s = lc.saut(0, "− 20 % par an", cote=UP, fs=30, creux=0.2)
        self.play(Create(s[0]), FadeIn(s[1], scale=1.3), run_time=0.35)
        question = self.paragraphe([("Combien vaut-il", RAISON), ("après 2 ans ?", RAISON)], 48, buff=0.14, y=-0.6)
        self.au_mot("Combien")
        self.play(FadeIn(question[0], shift=UP * 0.1), FadeIn(lc.cases[1], scale=1.2), run_time=0.3)
        self.au_mot("après")
        self.suivre("2")
        apres = self.t("après 2 ans", 30, GREY_A).next_to(lc.cases[1], DOWN, buff=0.25)
        if apres.get_right()[0] > 2.0:
            apres.shift(LEFT * (apres.get_right()[0] - 2.0))
        self.play(FadeIn(question[1], shift=UP * 0.1), FadeIn(apres), Indicate(lc.cases[1], color=RAISON), run_time=0.35)
        self.appel_commentaire(-2.35)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
