# proba_frequence_comparer.py
# EleveAI — Maths 4e — Probabilités, épisode 10 : comparer fréquence et probabilité
# (micro : frequence_comparer), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE.
# Short jumeau (ceinture jaune) : proba_frequence_comparer_short.py.
#
# ⭐ LE DESSIN QUI PORTE TOUT : deux barres côte à côte, « calculé » et
# « observé », sur la MÊME échelle de 0 à 1 ; l'écart marqué par une accolade.
# Écrans : 00 garde · 01 le dé de 60 lancers (14 six) · 02 le calculé (1/6 ≈ 0,17)
# · 03 l'observé (14/60 ≈ 0,23) · 04 l'écart est normal (10 six attendus) ·
# 05 la méthode (même écriture) · 06 le piège (« exactement » ; 600 lancers) ·
# 07 défi (47 piles sur 100) · 07b correction (0,47 / 0,5 / 0,03) · 08 appris.
#
# Voix : manim/voix/4e-proba-frequence-comparer.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/proba_frequence_comparer.py ProbaFrequenceComparer4e -o eleveai-maths-4e-proba-frequence-comparer --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/10-frequence-comparer/.

import math
import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_frequence_calculer import GRIS, Notion4e, P, piece, piece_lancee  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

COUL_OBS = BLEU_CALCUL     # l'observé
COUL_CALC = JAUNE_TITRE    # le calculé

# les 60 lancers du dé : 14 six (graine fixe)
_r = random.Random(6014)
LANCERS_DE = [1] * 9 + [2] * 10 + [3] * 8 + [4] * 11 + [5] * 8 + [6] * 14
_r.shuffle(LANCERS_DE)
# 600 lancers pour « beaucoup d'essais »
_r6 = random.Random(1758)
TIRAGES = [_r6.randint(1, 6) for _ in range(600)]

POINTS_DE = {1: [(0, 0)], 2: [(-1, 1), (1, -1)], 3: [(-1, 1), (0, 0), (1, -1)],
             4: [(-1, 1), (1, 1), (-1, -1), (1, -1)], 5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)],
             6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)]}


def de(face, cote=1.2):
    """Un dé DESSINÉ, vu de face : carré arrondi blanc, points noirs (toujours 6 points,
    les inutiles invisibles, pour que `become` garde la même structure)."""
    corps = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.18, fill_color=WHITE,
                             fill_opacity=1, stroke_color=GREY_B, stroke_width=3)
    pts = POINTS_DE[face]
    dots = VGroup(*[Dot(P(x * cote * 0.27, y * cote * 0.27) if i < len(pts) else ORIGIN,
                        radius=cote * 0.085, color="#111827").set_opacity(1 if i < len(pts) else 0)
                    for i, (x, y) in enumerate(pts + [(0, 0)] * (6 - len(pts)))])
    return VGroup(corps, dots)


def de_qui_roule(centre, cote=1.2, periode=0.12, faces=None):
    faces = faces or [3, 5, 2, 6, 1, 4]
    etat = {"t": 0.0}

    def faire(t):
        k = int(t / periode)
        return de(faces[k % len(faces)], cote).rotate(0.3 * math.sin(t * 9)).move_to(
            centre + UP * 0.12 * abs(math.sin(t * 9)))

    holder = faire(0)

    def maj(m, dt):
        etat["t"] += dt
        m.become(faire(etat["t"]))

    holder.add_updater(maj)
    return holder


class ProbaFrequenceComparer4e(Notion4e):
    nom_voix = "4e-proba-frequence-comparer"

    # l'échelle commune des deux barres
    X_AXE, Y0, H = 1.3, -1.95, 4.4
    X_CALC, X_OBS, LARG = 2.4, 4.1, 1.0

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.45, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.1, mob.get_corner(UR) + RIGHT * 0.1,
                    stroke_width=7, color=color)

    # ── l'échelle et les barres ─────────────────────────────────────────────

    def y(self, v):
        return self.Y0 + self.H * v

    def echelle(self):
        x = self.X_AXE
        axe = Line(P(x, self.Y0), P(x, self.y(1) + 0.15), stroke_width=4)
        sol = Line(P(x, self.Y0), P(self.X_OBS + 0.75, self.Y0), stroke_width=3, color=GRIS)
        ticks = VGroup(*[Line(P(x - 0.12, self.y(v)), P(x + 0.12, self.y(v)), stroke_width=3)
                         for v in (0, 0.5, 1)])
        haut = DashedLine(P(x, self.y(1)), P(self.X_OBS + 0.75, self.y(1)), stroke_width=2,
                          color=GRIS, dash_length=0.1)
        l0 = self.t("0", 30).next_to(ticks[0], LEFT, buff=0.12)
        l1 = self.t("1", 30).next_to(ticks[2], LEFT, buff=0.12)
        lc = self.t("calculé", 26, COUL_CALC).move_to(P(self.X_CALC, self.Y0 - 0.32))
        lo = self.t("observé", 26, COUL_OBS).move_to(P(self.X_OBS, self.Y0 - 0.32))
        return VGroup(axe, sol, ticks, haut, l0, l1, lc, lo)

    def barre(self, v, x, color):
        h = max(self.H * v, 0.01)
        return Rectangle(width=self.LARG, height=h, stroke_color=WHITE, stroke_width=2,
                         fill_color=color, fill_opacity=0.85).move_to(P(x, self.Y0 + h / 2))

    def accolade(self, v_obs, v_calc, texte="écart", color=ORANGE_RETENUE, fs=32):
        """L'écart : un pointillé au niveau du calculé, une accolade contre l'observé."""
        xb = self.X_OBS + self.LARG / 2 + 0.08
        pointille = DashedLine(P(self.X_CALC - self.LARG / 2, self.y(v_calc)), P(xb, self.y(v_calc)),
                               stroke_width=3, color=COUL_CALC, dash_length=0.08)
        lo, hi = sorted([v_obs, v_calc])
        seg = Line(P(xb, self.y(lo)), P(xb, self.y(hi)))
        acc = Brace(seg, RIGHT, buff=0.02, color=color)
        lbl = self.t(texte, fs, color).next_to(acc, RIGHT, buff=0.1)
        return pointille, acc, lbl

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Observé ou calculé ?", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        d = de_qui_roule(P(-4.6, 0.2), 1.3)
        self.add(d)
        base = -0.7
        horloge = {"t": 0.0}

        def faire(t):
            hc = 1.2
            ho = 1.2 + 0.45 * math.sin(t * 3.0) + 0.2 * math.sin(t * 7.1)
            g = VGroup(Rectangle(width=0.9, height=hc, fill_color=COUL_CALC, fill_opacity=0.85,
                                 stroke_color=WHITE, stroke_width=2).move_to(P(1.2, base + hc / 2)),
                       Rectangle(width=0.9, height=ho, fill_color=COUL_OBS, fill_opacity=0.85,
                                 stroke_color=WHITE, stroke_width=2).move_to(P(2.6, base + ho / 2)))
            return g

        barres = faire(0)

        def maj(m, dt):
            horloge["t"] += dt
            m.become(faire(horloge["t"]))

        lc = self.t("calculé", 24, COUL_CALC).move_to(P(1.2, base - 0.25))
        lo = self.t("observé", 24, COUL_OBS).move_to(P(2.6, base - 0.25))
        barres.add_updater(maj)
        self.play(FadeIn(barres), FadeIn(lc), FadeIn(lo), run_time=0.6)
        self.au_mot("Pourquoi")
        q = self.t("?", 72, ORANGE_RETENUE).move_to(P(4.0, 1.0))
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.play(Wiggle(q), run_time=0.7)
        self.attendre_voix(marge=1.0)
        barres.clear_updaters()
        d.clear_updaters()

    # ── 01 : le dé de 60 lancers ───────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("60 lancers de dé")
        d = de_qui_roule(P(-5.4, 1.4), 1.2, periode=0.07, faces=LANCERS_DE)
        self.add(d)
        x0, pas, larg, base, k = -3.4, 0.95, 0.7, -1.7, 0.2
        axe = Line(P(x0 - 0.6, base), P(x0 + 5 * pas + 0.6, base), stroke_width=3)
        faces = VGroup(*[de(i + 1, 0.42).move_to(P(x0 + i * pas, base - 0.35)) for i in range(6)])
        n = ValueTracker(0)

        def barres():
            s = LANCERS_DE[:int(n.get_value())]
            return VGroup(*[Rectangle(width=larg, height=max(s.count(i + 1) * k, 0.001), stroke_width=0,
                                      fill_opacity=0.85, fill_color=JAUNE_TITRE if i == 5 else COUL_OBS)
                            .move_to(P(x0 + i * pas, base + max(s.count(i + 1) * k, 0.001) / 2))
                            for i in range(6)])

        hist = always_redraw(barres)
        cpt = always_redraw(lambda: self.ligne([(str(int(n.get_value())), JAUNE_TITRE), ("lancers", WHITE)],
                                               34, 0.18).move_to(P(-5.4, 0.1)))
        self.play(Create(axe), FadeIn(faces), FadeIn(cpt), run_time=0.4)
        self.add(hist)
        self.au_mot("un dé")
        self.play(n.animate.set_value(60), run_time=2.0, rate_func=linear)
        hist.clear_updaters()
        cpt.clear_updaters()
        d.clear_updaters()

        self.au_mot("14 fois")
        l14 = self.t("14", 40, JAUNE_TITRE).next_to(hist[5], UP, buff=0.15)
        self.play(FadeIn(l14, shift=DOWN * 0.2), Indicate(faces[5], scale_factor=1.5, color=JAUNE_TITRE),
                  run_time=0.6)
        self.insister(l14, 0.35)

        self.au_mot("Mon dé")
        bulle_txt = VGroup(self.t("Mon dé n'obéit pas", 32), self.t("aux maths !", 32)).arrange(DOWN, buff=0.12)
        cadre = RoundedRectangle(width=bulle_txt.width + 0.6, height=bulle_txt.height + 0.5, corner_radius=0.3,
                                 stroke_color=WHITE, stroke_width=3, fill_color="#1F2937", fill_opacity=1)
        bulle = VGroup(cadre, bulle_txt).move_to(P(4.0, 1.5))
        queue = Polygon(P(3.2, 0.95), P(3.6, 0.95), P(2.9, 0.35), stroke_color=WHITE, stroke_width=3,
                        fill_color="#1F2937", fill_opacity=1)
        self.play(FadeIn(queue), GrowFromCenter(bulle), run_time=0.6)

        self.au_mot("A-t-il raison")
        self.play(Write(self.chute("A-t-il raison ?", color=ORANGE_RETENUE, font_size=44)))
        self.attendre_voix()

    # ── 02 : le calculé ────────────────────────────────────────────────────

    def ecran_calcule(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-calcule")
        self.titre_ecran("D'abord le calculé")
        ech = self.echelle()
        self.play(FadeIn(ech), run_time=0.6)
        des = VGroup(*[de(i + 1, 0.62) for i in range(6)]).arrange(RIGHT, buff=0.22).move_to(P(-3.3, 2.15))
        self.play(LaggedStart(*[FadeIn(x, scale=0.5) for x in des], lag_ratio=0.1), run_time=0.7)

        xg = -6.2
        self.au_mot("obtenir 6")
        self.play(des[5].animate.scale(1.3), Create(SurroundingRectangle(des[5], color=JAUNE_TITRE, buff=0.12)),
                  run_time=0.5)
        self.au_mot("1 sur 6")
        l1 = VGroup(self.t("P(6) =", 44), self.fraction(1, 6, 48, COUL_CALC)).arrange(RIGHT, buff=0.3)
        l1.move_to(P(xg, 0.75), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=UP * 0.2), run_time=0.5)

        self.au_mot("1 divisé par 6")
        l2a = self.t("1 ÷ 6", 44).move_to(P(xg, -0.6), aligned_edge=LEFT)
        self.play(FadeIn(l2a), run_time=0.4)
        self.au_mot("environ 0,17")
        l2b = self.t("≈ 0,17", 44, COUL_CALC).next_to(l2a, RIGHT, buff=0.25)
        bc = self.barre(1 / 6, self.X_CALC, COUL_CALC)
        self.play(FadeIn(l2b, shift=LEFT * 0.2), GrowFromEdge(bc, DOWN), run_time=0.7)

        self.au_mot("17 %")
        l3 = self.t("≈ 17 %", 48, VERT_OK).move_to(P(xg, -1.75), aligned_edge=LEFT)
        lb = self.t("17 %", 30, COUL_CALC).next_to(bc, UP, buff=0.12)
        self.play(FadeIn(l3, scale=1.3), FadeIn(lb), run_time=0.5)
        self.insister(l3, 0.35)
        self.attendre_voix()

    # ── 03 : l'observé ─────────────────────────────────────────────────────

    def ecran_observe(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-observe")
        self.titre_ecran("Ensuite l'observé")
        ech = self.echelle()
        bc = self.barre(1 / 6, self.X_CALC, COUL_CALC)
        lb = self.t("17 %", 30, COUL_CALC).next_to(bc, UP, buff=0.12)
        self.play(FadeIn(ech), FadeIn(bc), FadeIn(lb), run_time=0.6)
        # les 60 lancers : 6 rangées de 10, les 14 six en jaune
        c = 0.3
        six = set(i for i, v in enumerate(LANCERS_DE) if v == 6)
        grille = VGroup(*[Square(c * 0.85, stroke_color=WHITE, stroke_width=1.5, fill_color=GRIS, fill_opacity=0.25)
                          .move_to(P(-5.9 + (i % 10) * c, 2.35 - (i // 10) * c)) for i in range(60)])
        self.play(LaggedStart(*[FadeIn(q, scale=0.5) for q in grille], lag_ratio=0.01), run_time=0.7)
        l60 = self.t("60 lancers", 26).next_to(grille, RIGHT, buff=0.3)
        self.play(FadeIn(l60), run_time=0.3)

        xg = -6.2
        self.au_mot("14 sur 60")
        self.play(*[grille[i].animate.set_fill(JAUNE_TITRE, 1) for i in six], run_time=0.5)
        l1 = VGroup(self.t("f =", 44), self.fraction(14, 60, 48, COUL_OBS)).arrange(RIGHT, buff=0.3)
        l1.move_to(P(xg, 0.0), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=UP * 0.2), run_time=0.5)
        self.au_mot("14 divisé par 60")
        l2a = self.t("14 ÷ 60", 44).move_to(P(xg, -1.2), aligned_edge=LEFT)
        self.play(FadeIn(l2a), run_time=0.4)
        self.au_mot("environ 0,23")
        l2b = self.t("≈ 0,23", 44, COUL_OBS).next_to(l2a, RIGHT, buff=0.25)
        bo = self.barre(14 / 60, self.X_OBS, COUL_OBS)
        self.play(FadeIn(l2b, shift=LEFT * 0.2), GrowFromEdge(bo, DOWN), run_time=0.7)
        self.au_mot("23 %")
        l3 = self.t("≈ 23 %", 48, VERT_OK).move_to(P(xg, -2.3), aligned_edge=LEFT)
        lo = self.t("23 %", 30, COUL_OBS).next_to(bo, UP, buff=0.12)
        self.play(FadeIn(l3, scale=1.3), FadeIn(lo), run_time=0.5)
        self.insister(l3, 0.35)
        self.attendre_voix()

    # ── 04 : l'écart est normal ────────────────────────────────────────────

    def deux_barres(self, vo, vc, lo, lc):
        ech = self.echelle()
        bc = self.barre(vc, self.X_CALC, COUL_CALC)
        bo = self.barre(vo, self.X_OBS, COUL_OBS)
        tc = self.t(lc, 30, COUL_CALC).next_to(bc, UP, buff=0.12)
        to = self.t(lo, 30, COUL_OBS).next_to(bo, UP, buff=0.12)
        return ech, bc, bo, tc, to

    def ecran_ecart(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-ecart")
        self.titre_ecran("Un écart, c'est normal")
        ech, bc, bo, tc, to = self.deux_barres(14 / 60, 1 / 6, "23 %", "17 %")
        self.play(FadeIn(ech), FadeIn(bc), FadeIn(bo), run_time=0.5)
        self.au_mot("23 % observés")
        self.play(FadeIn(to, scale=1.5), Indicate(bo, color=WHITE, scale_factor=1.05), run_time=0.5)
        self.au_mot("17 % calculés")
        self.play(FadeIn(tc, scale=1.5), Indicate(bc, color=WHITE, scale_factor=1.05), run_time=0.5)
        self.au_mot("un écart")
        pt, acc, lbl = self.accolade(14 / 60, 1 / 6)
        self.play(Create(pt), GrowFromCenter(acc), FadeIn(lbl), run_time=0.7)
        self.insister(VGroup(acc, lbl), 0.4)

        d = de_qui_roule(P(-5.6, 1.9), 1.0)
        self.au_mot("C'est normal")
        self.add(d)
        norm = self.t("C'est normal !", 48, VERT_OK).move_to(P(-2.4, 1.9))
        self.play(FadeIn(norm, scale=1.4), run_time=0.5)
        self.au_mot("Le hasard")
        has = VGroup(self.t("Le hasard ne donne jamais", 30), self.t("exactement la probabilité.", 30)
                     ).arrange(DOWN, buff=0.1, aligned_edge=LEFT).move_to(P(-6.3, 0.75), aligned_edge=LEFT)
        self.play(FadeIn(has), run_time=0.5)
        self.au_mot("Sur 60 lancers")
        d.clear_updaters()
        a1 = self.ligne([("Sur", WHITE), ("60", JAUNE_TITRE), ("lancers :", WHITE)], 30, 0.13)
        a2 = self.ligne([("environ", WHITE), ("10", JAUNE_TITRE), ("six attendus", WHITE)], 30, 0.13)
        a1.move_to(P(-6.3, -0.2), aligned_edge=LEFT)
        a2.move_to(P(-6.3, -0.7), aligned_edge=LEFT)
        self.play(FadeIn(a1), run_time=0.4)
        self.au_mot("environ 10 six")
        self.play(FadeIn(a2, shift=LEFT * 0.2), run_time=0.4)
        self.insister(a2[1], 0.3)
        self.au_mot("En avoir 14")
        q = VGroup(self.t("14 six :", 34, JAUNE_TITRE), self.t("ça arrive très souvent !", 34, VERT_OK))
        q.arrange(DOWN, buff=0.15, aligned_edge=LEFT).move_to(P(-6.3, -1.75), aligned_edge=LEFT)
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.4)
        self.au_mot("très souvent")
        self.play(FadeIn(q[1], shift=LEFT * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 05 : la méthode ────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-methode")
        self.titre_ecran("La méthode")
        ech, bc, bo, tc, to = self.deux_barres(14 / 60, 1 / 6, "0,23", "0,17")
        self.play(FadeIn(ech), FadeIn(bc), FadeIn(bo), run_time=0.5)
        lignes = []
        for y, nom, coul, f, dec, pc in [(1.2, "calculé :", COUL_CALC, (1, 6), "0,17", "17 %"),
                                         (-0.7, "observé :", COUL_OBS, (14, 60), "0,23", "23 %")]:
            lbl = self.t(nom, 32, coul).move_to(P(-6.5, y), aligned_edge=LEFT)
            fr = self.fraction(*f, 40, coul).move_to(P(-3.85, y))
            f1 = self.t("→", 36, GRIS).move_to(P(-3.15, y))
            dd = self.t(dec, 40, coul).move_to(P(-2.4, y))
            f2 = self.t("→", 36, GRIS).move_to(P(-1.55, y))
            pp = self.t(pc, 40, coul).move_to(P(-0.55, y))
            lignes.append((lbl, fr, f1, dd, f2, pp))
        self.play(*[FadeIn(VGroup(l[0], l[1])) for l in lignes], run_time=0.6)
        self.au_mot("en décimal")
        self.play(*[FadeIn(VGroup(l[2], l[3]), shift=RIGHT * 0.2) for l in lignes], FadeIn(tc), FadeIn(to),
                  run_time=0.5)
        self.insister(VGroup(lignes[0][3], lignes[1][3]), 0.3, 1.3)
        self.au_mot("en pourcentage")
        self.play(*[FadeIn(VGroup(l[4], l[5]), shift=RIGHT * 0.2) for l in lignes], run_time=0.5)
        self.au_mot("regarder l'écart")
        pt, acc, lbl = self.accolade(14 / 60, 1 / 6)
        self.play(Create(pt), GrowFromCenter(acc), FadeIn(lbl), run_time=0.6)
        self.play(Write(self.chute("Même écriture, puis on regarde l'écart.", color=VERT_OK, font_size=34)))
        self.attendre_voix()

    # ── 06 : le piège ──────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("croire que la probabilité")
        faux = VGroup(self.t("La probabilité dit exactement", 32, ROUGE_ERREUR),
                      self.t("ce qui va se passer ?", 32, ROUGE_ERREUR)).arrange(DOWN, buff=0.12)
        faux.move_to(P(-3.0, 2.0))
        self.play(FadeIn(faux, shift=DOWN * 0.2), run_time=0.6)
        self.au_mot("exactement ce qui")
        barre = self.barrer(faux)
        self.play(Create(barre), run_time=0.4)
        self.play(Wiggle(VGroup(faux, barre)), run_time=0.5)

        x0, pas, larg, base, k = -0.4, 0.95, 0.7, -1.7, 2.9 / 110
        axe = Line(P(x0 - 0.6, base), P(x0 + 5 * pas + 0.6, base), stroke_width=3)
        faces = VGroup(*[de(i + 1, 0.42).move_to(P(x0 + i * pas, base - 0.35)) for i in range(6)])
        n = ValueTracker(0)

        def barres():
            s = TIRAGES[:int(n.get_value())]
            return VGroup(*[Rectangle(width=larg, height=max(s.count(i + 1) * k, 0.001), stroke_width=0,
                                      fill_opacity=0.85, fill_color=COUL_OBS)
                            .move_to(P(x0 + i * pas, base + max(s.count(i + 1) * k, 0.001) / 2))
                            for i in range(6)])

        hist = always_redraw(barres)
        d = de_qui_roule(P(-4.8, -0.4), 1.1, periode=0.06)
        self.au_mot("Elle dit")
        self.add(d)
        self.play(Create(axe), FadeIn(faces), run_time=0.4)
        self.add(hist)
        self.play(n.animate.set_value(600), run_time=2.4, rate_func=linear)
        hist.clear_updaters()
        d.clear_updaters()
        self.au_mot("en moyenne")
        moy = DashedLine(P(x0 - 0.6, base + 100 * k), P(x0 + 5 * pas + 0.6, base + 100 * k), stroke_width=4,
                         color=JAUNE_TITRE, dash_length=0.12)
        lm = self.t("en moyenne", 30, JAUNE_TITRE).next_to(moy, UP, buff=0.12)
        self.play(Create(moy), FadeIn(lm), run_time=0.6)
        self.au_mot("beaucoup d'essais")
        lb = self.t("sur beaucoup d'essais", 30, COUL_OBS).move_to(P(-4.8, -1.5))
        self.play(FadeIn(lb, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        pc = piece_lancee(P(-4.8, 0.7), 0.7, 1.0, periode=0.6)
        self.add(pc)
        self.au_mot("100 fois")
        l100 = self.ligne([("100", JAUNE_TITRE), ("lancers", WHITE)], 40, 0.2).move_to(P(-4.8, -1.0))
        self.play(FadeIn(l100, shift=UP * 0.2), run_time=0.5)
        self.au_mot("47 piles")
        l47 = self.ligne([("47", JAUNE_TITRE), ("piles", WHITE)], 40, 0.2).next_to(l100, DOWN, buff=0.3)
        self.play(FadeIn(l47, shift=UP * 0.2), run_time=0.5)
        qs = VGroup()
        for i, (extrait, texte) in enumerate([("Quelle est la fréquence", "Fréquence de pile ?"),
                                              ("Quelle est la probabilité", "Probabilité ?"),
                                              ("Quel est l'écart", "Écart ?")]):
            self.au_mot(extrait)
            q = self.ligne([(f"{i + 1}.", GRIS), (texte, BLEU_CALCUL)], 40, 0.25)
            q.move_to(P(-1.6, 1.6 - i * 1.0), aligned_edge=LEFT)
            qs.add(q)
            self.play(FadeIn(q, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)
        pc.clear_updaters()

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        ech = self.echelle()
        self.play(FadeIn(ech), run_time=0.5)
        xg = -6.4
        self.au_mot("47 sur 100")
        l1 = VGroup(self.t("Fréquence :", 36, COUL_OBS), self.fraction(47, 100, 42, COUL_OBS)).arrange(RIGHT, buff=0.3)
        l1.move_to(P(xg, 1.7), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=UP * 0.2), run_time=0.5)
        self.au_mot("donc 0,47")
        e1 = self.t("= 0,47", 42, COUL_OBS).next_to(l1, RIGHT, buff=0.25)
        bo = self.barre(0.47, self.X_OBS, COUL_OBS)
        to = self.t("0,47", 30, BLACK).move_to(bo.get_top() + DOWN * 0.3)
        self.play(FadeIn(e1), GrowFromEdge(bo, DOWN), FadeIn(to), run_time=0.7)

        self.au_mot("1 sur 2")
        l2 = VGroup(self.t("Probabilité :", 36, COUL_CALC), self.fraction(1, 2, 42, COUL_CALC)).arrange(RIGHT, buff=0.3)
        l2.move_to(P(xg, 0.0), aligned_edge=LEFT)
        self.play(FadeIn(l2, shift=UP * 0.2), run_time=0.5)
        self.au_mot("donc 0,5")
        e2 = self.t("= 0,5", 42, COUL_CALC).next_to(l2, RIGHT, buff=0.25)
        bc = self.barre(0.5, self.X_CALC, COUL_CALC)
        tc = self.t("0,5", 30, BLACK).move_to(bc.get_top() + DOWN * 0.3)
        self.play(FadeIn(e2), GrowFromEdge(bc, DOWN), FadeIn(tc), run_time=0.7)

        self.au_mot("L'écart est 0,03")
        l3 = self.ligne([("Écart :", ORANGE_RETENUE), ("0,03", ORANGE_RETENUE)], 40, 0.25)
        l3.move_to(P(xg, -1.5), aligned_edge=LEFT)
        pt, acc, lbl = self.accolade(0.47, 0.5, "0,03")
        self.play(FadeIn(l3, shift=UP * 0.2), Create(pt), GrowFromCenter(acc), FadeIn(lbl), run_time=0.7)
        self.au_mot("très petit")
        tp = self.t("très petit", 40, VERT_OK).next_to(l3, RIGHT, buff=0.4)
        self.play(FadeIn(tp, scale=1.3), run_time=0.4)
        self.insister(VGroup(acc, lbl), 0.35)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        d = de_qui_roule(P(-5.8, 3.1), 0.55)
        self.add(d)
        l1 = VGroup(self.coche(), self.t("On compare la fréquence et la probabilité", 34))
        l2 = VGroup(self.coche(), self.t("écrites de la même façon : en décimal ou en %", 34))
        l3 = VGroup(self.coche(), self.t("Un écart est normal", 34))
        lignes = VGroup(l1, l2, l3)
        for l in lignes:
            l.arrange(RIGHT, buff=0.3)
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.5:
            lignes.scale_to_fit_width(11.5)
        lignes.move_to(P(-0.5, 1.35))
        for mot, l in zip(["On compare", "en les écrivant", "Un écart est normal"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1:], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        ech, bc, bo, tc, to = self.deux_barres(14 / 60, 1 / 6, "", "")
        pt, acc, lbl = self.accolade(14 / 60, 1 / 6)
        mini = VGroup(ech, bc, bo, pt, acc, lbl).scale(0.62).move_to(P(2.6, -0.85))
        self.play(FadeIn(mini, shift=UP * 0.2), run_time=0.6)
        self.insister(VGroup(*mini[3:]), 0.35)
        self.au_mot("L'épisode suivant")
        self.play(Write(self.chute("Épisode suivant : et si on lance beaucoup plus ?", color=VERT_OK,
                                   font_size=36)))
        self.attendre_voix(marge=1.0)
        d.clear_updaters()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_garde()
        self.ecran_situation()
        self.ecran_calcule()
        self.ecran_observe()
        self.ecran_ecart()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
