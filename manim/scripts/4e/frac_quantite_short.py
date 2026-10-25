# frac_quantite_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 10 « Prendre une fraction d'une
# quantité » (micro fraction_quantite) : L'ÉNIGME DE FRÉDÉRIC DU GÂTEAU CARRÉ
# EN 5 (consigne-videos-fractions.md, « SES deux énigmes du gâteau »).
# CEINTURE JAUNE (comme le gâteau en 6 de la 6e) : on VOIT la notion, mais le
# short ajoute de la géométrie (aires de triangles) et la chaîne
# simplifier → décimal → pourcentage ; plus exigeant que le short blanc.
# Il AMUSE : Lina, CHEFFE DE CUISINE, coupe un gâteau carré en 5 parts égales :
#   · côté 20 cm → tour 4 × 20 = 80 cm → 1/5 du tour : 80 ÷ 5 = 16 cm de bord ;
#   · on part d'un coin, un point tous les 16 cm, on coupe depuis le centre ;
#   · SURPRISE : 2 triangles et 3 morceaux à 4 côtés… même aire :
#     triangle 16 × 10 ÷ 2 = 80 cm² ; une part qui passe un coin = 2 triangles
#     de hauteur 10 : 4 × 10 ÷ 2 + 12 × 10 ÷ 2 = 20 + 60 = 80 ;
#   · 1 question-pause (3 s) : la part du milieu (8 + 8) → 40 + 40 = 80 ;
#   · 80/400 = 1/5 = 0,2 = 20 % ; commentaire : « pour 8 personnes, combien de
#     cm de bord par part ? » (80 ÷ 8 = 10).
# Découpes vérifiées (Python) : coins à 0, 20, 40, 60 cm du tour ; coupes à 0,
# 16, 32, 48, 64 → parts 16 | 4 + 12 | 8 + 8 | 12 + 4 | 16 ; chaque part
# 16 × 10 ÷ 2 = 80 cm² ; 5 × 80 = 400 = 20 × 20.
# Centres d'intérêt : cuisine, jeux-defis.
#
# Voix : manim/voix/4e-frac-quantite-short.json (débit −10) ; marques :
# manim/scripts/4e/frac_quantite_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/frac_quantite_short.py FracQuantiteShort4e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/frac_quantite_short.py FracQuantiteShort4e -o eleveai-maths-4e-frac-quantite-short --media_dir manim/scripts/4e/media-frac-quantite-short
# Sortie : manim/sorties/4e/maths/fractions/10-quantite/eleveai-maths-4e-frac-quantite-short.mp4

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotf_commun import *  # noqa: E402,F403

C = P(0, 0.75)
S = 2.3                     # le côté dessiné (20 cm)
K = S / 20                  # unités par centimètre
CREME, CROUTE = "#fde68a", "#b45309"
COULEURS = ["#fb923c", "#60a5fa", "#4ade80", "#f472b6", "#a78bfa"]
COINS = [C + P(-S / 2, S / 2), C + P(S / 2, S / 2), C + P(S / 2, -S / 2), C + P(-S / 2, -S / 2)]


def bord(s):
    """Le point du tour à s cm du coin haut-gauche, dans le sens des aiguilles."""
    s = s % 80
    i, r = int(s // 20), (s % 20) / 20
    return COINS[i] + (COINS[(i + 1) % 4] - COINS[i]) * r


def part(k, couleur=CREME, op=1.0):
    """La part k : du centre, le bord de 16k à 16(k+1) (avec le coin éventuel)."""
    a, b = 16 * k, 16 * (k + 1)
    pts = [C, bord(a)] + [COINS[(c // 20) % 4] for c in (20, 40, 60, 80) if a < c < b] + [bord(b)]
    return Polygon(*pts, fill_color=couleur, fill_opacity=op, stroke_color=CROUTE, stroke_width=3)


class FracQuantiteShort4e(ShortF):
    nom_voix = "4e-frac-quantite-short"
    fichier_marques = "frac_quantite_short_marques.json"
    ceinture = "jaune"

    def mots(self, specs, y, fs=32):
        g = self.ligne_mots(specs, fs=fs, buff=0.12)
        self.borne(g, 0.9)
        g.move_to(P(0, y))
        self.jouer_mots(g)
        return g

    def gateau(self):
        fond = Square(side_length=S, fill_color=CREME, fill_opacity=1, stroke_color=CROUTE, stroke_width=8).move_to(C)
        return fond

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Un gâteau carré en 5", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        g = self.gateau()

        # ── 00 : Lina, cheffe de cuisine ──
        self.dire("00-accroche")
        self.au_mot("Lina")
        li = self.bas(self.ligne([("Lina,", BLEU_CALCUL), ("cheffe de cuisine", WHITE)], 32), -1.0)
        self.play(FadeIn(li, scale=0.8), run_time=0.4)
        self.au_mot("gâteau carré")
        self.play(FadeIn(g, scale=0.9), run_time=0.6)
        self.au_mot("5 parts égales")
        l5 = self.bas(self.ligne([("5", ORANGE_RETENUE), ("parts égales", WHITE)], 32), -1.65)
        self.play(FadeIn(l5, shift=UP * 0.15), Write(titre), run_time=0.5)
        self.au_mot("En 4")
        diag = VGroup(Line(COINS[0], COINS[2]), Line(COINS[1], COINS[3])).set_stroke(CROUTE, 5)
        l4 = pas_audit(self.bas(self.t("en 4 : facile !", 30, VERT_OK), -2.3))
        self.play(Create(diag), FadeIn(l4), run_time=0.6)
        self.au_mot("Mais en 5")
        q = self.t("?", 90, ORANGE_RETENUE).move_to(C)
        self.play(FadeOut(diag), FadeOut(l4), FadeIn(q, scale=0.4), run_time=0.5)
        self.insister(q, 1.3)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(li, l5, q)), run_time=0.3)

        # ── 01 : le tour ──
        self.dire("01-tour")
        self.au_mot("le tour")
        tour = Square(side_length=S, stroke_color=AMBRE, stroke_width=10).move_to(C)
        self.play(Create(tour), run_time=1.0)
        self.au_mot("20 centimètres")
        c20 = Brace(Line(COINS[3], COINS[2]), DOWN, color=AMBRE, buff=0.05)
        t20 = self.mor("20 cm", 28, AMBRE).next_to(c20, DOWN, buff=0.04)
        self.play(GrowFromCenter(c20), FadeIn(t20), run_time=0.4)
        self.mots([("4 ×", WHITE, "4 fois"), ("20", WHITE, "20, égale"),
                   ("= 80 cm", AMBRE, "80 centimètres de tour")], -1.4)
        self.mots([(EcritureFraction(1, 5, fs=40, couleur=ORANGE_RETENUE), WHITE, "1 cinquième"),
                   ("du tour :", WHITE, None)], -2.05)
        self.mots([("80 ÷", WHITE, "80 divisé"), ("5", WHITE, "5, égale"),
                   ("= 16 cm", VERT_OK, "16 centimètres de bord")], -2.7, fs=34)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in garder and m is not g])), run_time=0.4)

        # ── 02 : un point tous les 16 cm, coupes depuis le centre ──
        self.dire("02-coupes")
        self.au_mot("part d'un coin")
        pts = VGroup(*[Dot(bord(16 * k), radius=0.08, color=ORANGE_RETENUE) for k in range(5)])
        self.play(FadeIn(pts[0], scale=2), Flash(bord(0), color=ORANGE_RETENUE, flash_radius=0.25), run_time=0.5)
        self.au_mot("tous les 16")
        l16 = self.bas(self.ligne([("un point tous les", WHITE), ("16 cm", VERT_OK)], 30), -1.0)
        self.play(FadeIn(l16, shift=UP * 0.15), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(p, scale=2) for p in pts[1:]], lag_ratio=0.35), run_time=1.2)
        self.au_mot("coupe depuis le centre")
        ctr = Dot(C, radius=0.07, color=CROUTE)
        coupes = VGroup(*[Line(C, bord(16 * k), color=CROUTE, stroke_width=5) for k in range(5)])
        self.play(FadeIn(ctr), LaggedStart(*[Create(c) for c in coupes], lag_ratio=0.25), run_time=1.3)
        self.attendre_voix(marge=0.2)

        # ── 03 : surprise : des formes différentes ──
        self.dire("03-formes")
        parts = VGroup(*[part(k) for k in range(5)])
        self.add(parts)
        self.bring_to_front(coupes, pts, ctr)
        self.au_mot("Surprise")
        self.play(*[parts[k].animate.set_fill(COULEURS[k]) for k in range(5)], FadeOut(l16), run_time=0.6)
        self.au_mot("2 triangles")
        lt = self.bas(self.ligne([("2", COULEURS[0]), ("triangles", WHITE)], 32), -1.0)
        self.play(FadeIn(lt), Indicate(VGroup(parts[0], parts[4]), color=WHITE, scale_factor=1.06), run_time=0.6)
        self.au_mot("3 morceaux")
        lq = self.bas(self.ligne([("3", COULEURS[1]), ("morceaux à 4 côtés", WHITE)], 32), -1.6)
        self.play(FadeIn(lq), Indicate(VGroup(parts[1], parts[2], parts[3]), color=WHITE, scale_factor=1.06),
                  run_time=0.6)
        self.au_mot("vraiment égales")
        qe = self.bas(self.t("égales ?", 44, ORANGE_RETENUE), -2.35)
        self.play(FadeIn(qe, scale=0.6), run_time=0.4)
        self.insister(qe, 1.2)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(lt, lq, qe)), run_time=0.3)

        # ── 04 : l'aire d'une part triangle ──
        self.dire("04-aire")
        self.au_mot("Une part triangle")
        autres = VGroup(*[parts[k] for k in (1, 2, 3, 4)])
        self.play(autres.animate.set_fill(opacity=0.25), run_time=0.4)
        self.au_mot("16 de base")
        base = Line(bord(0), bord(16), color=VERT_OK, stroke_width=10)
        b16 = self.mor("16", 28, VERT_OK).next_to(base, UP, buff=0.1)
        self.play(Create(base), FadeIn(b16), run_time=0.4)
        self.au_mot("10 de hauteur")
        pied = P(C[0], C[1] + S / 2)
        h = DashedLine(C, pied, color=WHITE, stroke_width=5, dash_length=0.1)
        h10 = self.mor("10", 28, WHITE).next_to(h, RIGHT, buff=0.08)
        self.play(Create(h), FadeIn(h10), run_time=0.5)
        lc = self.mots([("16 ×", WHITE, "16 fois"), ("10", WHITE, "10 divisé"), ("÷ 2", WHITE, "2, égale"),
                        ("= 80 cm²", VERT_OK, "80 centimètres")], -1.1, fs=36)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(base, b16, h, h10)), FadeOut(lc), autres.animate.set_fill(opacity=1),
                  run_time=0.4)

        # ── 05 : une part qui passe un coin ──
        self.dire("05-coin")
        self.au_mot("passe un coin")
        sauf1 = VGroup(*[parts[k] for k in (0, 2, 3, 4)])
        self.play(sauf1.animate.set_fill(opacity=0.25), Indicate(parts[1], color=WHITE, scale_factor=1.05), run_time=0.5)
        self.au_mot("2 triangles")
        coin = Line(C, COINS[1], color=WHITE, stroke_width=5)
        self.play(Create(coin), run_time=0.5)
        self.au_mot("hauteur 10")
        h1 = DashedLine(C, P(C[0], C[1] + S / 2), color=WHITE, stroke_width=4, dash_length=0.08)
        h2 = DashedLine(C, P(C[0] + S / 2, C[1]), color=WHITE, stroke_width=4, dash_length=0.08)
        self.play(Create(h1), Create(h2), run_time=0.5)
        self.mots([("4 ×", WHITE, "4 fois"), ("10", WHITE, ("10 divisé", 1)), ("÷ 2", WHITE, "2, égale 20"),
                   ("= 20", BLEU_CALCUL, "20. 12")], -1.0, fs=34)
        self.mots([("12 ×", WHITE, "12 fois"), ("10", WHITE, ("10 divisé", 2)), ("÷ 2", WHITE, "2, égale 60"),
                   ("= 60", BLEU_CALCUL, "60. 20")], -1.65, fs=34)
        self.mots([("20 +", WHITE, "20 plus"), ("60", WHITE, "60, égale"), ("= 80", VERT_OK, "80 :"),
                   ("pareil !", VERT_OK, "pareil")], -2.35, fs=38)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 06 : la question-pause (3 s) : la part du milieu ──
        self.question_b("06-question", "06b-reponse", ["Part du milieu : 8 cm + 8 cm", "de bord. Son aire ?"],
                        [bloc_fixe(self.inline("64 cm²", 30)), bloc_fixe(self.inline("80 cm²", 30)),
                         bloc_fixe(self.inline("160 cm²", 30))], 1,
                        [[("8 ×", WHITE, "8 fois"), ("10", WHITE, "10 divisé"), ("÷ 2", WHITE, "2, égale"),
                          ("= 40", BLEU_CALCUL, "40. 40")],
                         [("40 +", WHITE, "40 plus"), ("40", WHITE, "40, égale"), ("= 80", VERT_OK, "80.")]],
                        fs_rep=28, mot_q="La part")
        self.vider(garder)

        # ── 07 : 80/400 = 1/5 = 0,2 = 20 % ──
        self.dire("07-fraction")
        tout = VGroup(*[part(k, COULEURS[k]) for k in range(5)])
        self.au_mot("Le gâteau entier")
        self.play(FadeIn(tout), run_time=0.5)
        self.mots([("20 ×", WHITE, "20 fois"), ("20", WHITE, "20, égale"), ("= 400 cm²", AMBRE, "400")], -0.95, fs=36)
        self.au_mot("Une part")
        self.play(VGroup(*tout[1:]).animate.set_fill(opacity=0.25), run_time=0.4)
        f1 = EcritureFraction(80, 400, fs=44)
        f2 = EcritureFraction(1, 5, fs=44, couleur=VERT_OK)
        eg = egalite(f1, f2, buff=0.9).move_to(P(0, -1.8))
        hb = fleches(f1, f2, "÷ 80", fs=26)
        self.au_mot("80 sur 400")
        self.play(FadeIn(f1, scale=1.2), run_time=0.4)
        self.au_nb("par 80")
        self.play(*[Create(x[0]) for x in hb], *[FadeIn(x[1]) for x in hb], run_time=0.5)
        self.au_mot("1 cinquième. 1")
        self.play(FadeIn(eg[1]), FadeIn(f2, scale=1.3), run_time=0.4)
        self.play(FadeOut(VGroup(*hb)), VGroup(f1, eg[1], f2).animate.shift(UP * 0.0), run_time=0.2)
        lp = self.mots([("1 ÷", WHITE, "1 divisé"), ("5", WHITE, "5, égale"), ("= 0,2", BLEU_CALCUL, "0,2"),
                        ("= 20 %", VERT_OK, "20 %")], -2.75, fs=40)
        self.insister(lp, 1.1)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 08 : la question en commentaire ──
        self.dire("08-question")
        self.add(self.gateau())
        self.au_mot("8 personnes")
        l8 = self.bas(self.ligne([("8", ORANGE_RETENUE), ("personnes", WHITE)], 36), -0.95)
        self.play(FadeIn(l8, scale=0.8), run_time=0.4)
        self.au_mot("combien de centimètres")
        q = self.bas(self.ligne([("?", ORANGE_TROU), ("cm de bord par part", WHITE)], 32), -1.6)
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        self.insister(q[0], 1.6)
        self.appel_commentaire(y=-2.35)

    def au_nb(self, extrait):
        i = self._texte_voix.find(extrait)
        k = [m.start() for m in re.finditer(r"\d+", extrait)]
        self._attendre_pos(i + k[-1])
