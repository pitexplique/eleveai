# proba6_frequence_repeter.py
# EleveAI — Maths 6e — série « Probabilités », épisode 9 (FIN DE SÉRIE) :
# répéter beaucoup, la fréquence se rapproche de la probabilité
# (micro : proba_frequence_repeter), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : proba6_frequence_repeter_short.py (ceinture jaune).
#
# Écrans : 00 garde · 01 10 lancers, 7 piles · 02 la courbe jusqu'à 10 : 0,7,
# loin de 1/2 · 03 on continue : 100 → 0,54, 1000 → 0,503 (la courbe se
# resserre, le tableau du coach se remplit) · 04 la loi : vers 1/2 = 0,5 ·
# 05 le piège « face va rattraper » · 06 défi de la punaise · 06b correction ·
# 07 ce que tu as appris · 08 abonnement.
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque 6e/maths/probabilites.bank.ts, micro proba_frequence_repeter) :
#   · « tableau » : carte blanche, en-têtes « Nombre de lancers » / « Fréquence
#     de « pile » » sur fond gris clair (slate-100), cases blanches, texte foncé
#     gras, case surlignée en ambre (amber-100 / amber-900).
# ⭐ Fil rouge de la série : l'axe vertical de la courbe EST l'échelle de 0 à 1
# (même dégradé que l'échelle des épisodes précédents).
# ⛔ PAS D'ÉCART : aucun nombre n'est écrit avant d'être dit (pas de 0 ni de 1
# sur l'axe : la voix ne les dit pas).
#
# Voix : manim/voix/6e-proba-frequence-repeter.json (Julie, débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/proba6_frequence_repeter.py Proba6FrequenceRepeter -o eleveai-maths-6e-proba-frequence-repeter --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/09-repeter/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import piece_qui_tourne  # noqa: E402

GRIS_ETEINT = "#6B7280"
# le canvas « tableau » du coach
T_BORD = "#e2e8f0"      # slate-200
T_ENTETE = "#f1f5f9"    # slate-100
T_ENCRE = "#1e293b"     # slate-800
T_AMBRE = "#fef3c7"     # amber-100
T_AMBRE_TXT = "#78350f"  # amber-900


class Notion6eProba(Notion6e):
    identite = "Maths 6e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les lancers : une série fixée (graine 18) ───────────────────────────────
# 7 piles sur les 10 premiers, 54 sur 100, 503 sur 1000 : exactement les
# nombres de la voix. Entre deux paliers, l'ordre est tiré au hasard.

def lancers():
    r = np.random.default_rng(18)
    b1 = np.array([1] * 7 + [0] * 3)
    r.shuffle(b1)
    b2 = np.array([1] * 47 + [0] * 43)
    r.shuffle(b2)
    b3 = np.array([1] * 449 + [0] * 451)
    r.shuffle(b3)
    return np.concatenate([b1, b2, b3])


def frequences():
    s = lancers()
    return np.cumsum(s) / np.arange(1, len(s) + 1)


def piece(face="PILE", r=0.55):
    """Une pièce posée : PILE (jaune) ou FACE (orange), comme la pièce qui tourne (CM2)."""
    pile = face == "PILE"
    disque = Circle(radius=r, fill_color=JAUNE_TITRE if pile else ORANGE_RETENUE, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=3)
    bord = Circle(radius=r * 0.82, stroke_color=BLACK, stroke_width=1.5, stroke_opacity=0.35)
    mot = Text(face, font_size=max(8, int(r * 34)), color=BLACK, weight=BOLD).move_to(disque)
    return VGroup(disque, bord, mot)


def punaise(pointe_en_l_air=True, s=1.0):
    """Une punaise vue de côté : la tête (un disque aplati) et la pointe."""
    tete = RoundedRectangle(width=1.0, height=0.22, corner_radius=0.1, fill_color="#DC2626",
                            fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    dome = Ellipse(width=0.5, height=0.36, fill_color="#B91C1C", fill_opacity=1, stroke_color=WHITE,
                   stroke_width=2).next_to(tete, UP, buff=-0.08)
    pointe = Line(tete.get_bottom(), tete.get_bottom() + DOWN * 0.75, color="#CBD5E1", stroke_width=6)
    g = VGroup(pointe, dome, tete)
    if pointe_en_l_air:
        g.rotate(PI)
    else:
        g.rotate(-1.15)
    return g.scale(s)


class Proba6FrequenceRepeter(Notion6eProba):
    nom_voix = "6e-proba-frequence-repeter"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=sw, color=color)

    def demi(self, font_size=34, color=JAUNE_TITRE):
        return self.fraction(1, 2, font_size, color)

    # ── la courbe : x = nombre de lancers (échelle 1, 10, 100, 1000 régulière),
    #    y = fréquence de pile, l'axe vertical = l'échelle de 0 à 1 ─────────

    GX0, GX1 = -5.5, 0.6     # n = 1 … n = 1000
    GY0, GY1 = -2.3, 2.0     # f = 0 … f = 1
    CAM = None

    def gx(self, n):
        return self.GX0 + (self.GX1 - self.GX0) * math.log10(n) / 3

    def gy(self, f):
        return self.GY0 + (self.GY1 - self.GY0) * f

    def gp(self, n, f):
        return P(self.gx(n), self.gy(f))

    def axes_courbe(self):
        ech = Line(P(self.GX0, self.GY0), P(self.GX0, self.GY1), stroke_width=10)
        ech.set_color([VERT_OK, JAUNE_TITRE, ORANGE_RETENUE, ROUGE_ERREUR])
        bouts = VGroup(*[Line(P(self.GX0 - 0.16, y), P(self.GX0 + 0.16, y), stroke_width=4)
                         for y in (self.GY0, self.GY1)])
        ax = Arrow(P(self.GX0, self.GY0), P(self.GX1 + 0.7, self.GY0), buff=0, stroke_width=4,
                   color=WHITE, max_tip_length_to_length_ratio=0.04)
        lx = self.t("lancers", 26).next_to(ax.get_end(), RIGHT, buff=0.12)
        ly = self.t("fréquence de pile", 26, BLEU_CALCUL).next_to(P(self.GX0, self.GY1), UP, buff=0.18)
        ly.align_to(P(self.GX0 - 0.3, 0), LEFT)
        return VGroup(ax, ech, bouts, lx, ly)

    def ligne_demi(self):
        return DashedLine(P(self.GX0, self.gy(0.5)), P(self.GX1 + 0.3, self.gy(0.5)),
                          dash_length=0.15, color=VERT_OK, stroke_width=4)

    def courbe(self, f, n0, n1, color=BLEU_CALCUL, sw=4):
        pts = [self.gp(n, f[n - 1]) for n in range(n0, n1 + 1)]
        c = VMobject(stroke_color=color, stroke_width=sw)
        c.set_points_as_corners(pts)
        return c

    def graduation(self, n, texte):
        tr = Line(P(self.gx(n), self.GY0 - 0.12), P(self.gx(n), self.GY0 + 0.12), stroke_width=4)
        lb = self.t(texte, 28, JAUNE_TITRE).next_to(tr, DOWN, buff=0.12)
        return tr, lb

    def point_val(self, n, f, texte, haut=0.45):
        pt = Dot(self.gp(n, f), radius=0.1, color=JAUNE_TITRE)
        lb = self.t(texte, 32, JAUNE_TITRE)
        lb.move_to(self.gp(n, f) + UP * haut)
        fond = BackgroundRectangle(lb, color=BLACK, fill_opacity=0.85, buff=0.06)
        return pt, VGroup(fond, lb)

    # ── le tableau du coach ─────────────────────────────────────────────────

    TX, TY = 4.25, 2.0       # centre haut du tableau
    TW = (2.0, 2.3)
    TH_ENT, TH = 0.95, 0.62

    def tableau(self):
        """Le canvas « tableau » : en-têtes gris clair, 3 lignes blanches vides."""
        g = VGroup()
        x_g = self.TX - sum(self.TW) / 2
        entetes = [("Nombre", "de lancers"), ("Fréquence", "de « pile »")]
        cases = []
        x = x_g
        for (a, b), w in zip(entetes, self.TW):
            r = Rectangle(width=w, height=self.TH_ENT, fill_color=T_ENTETE, fill_opacity=1,
                          stroke_color=T_BORD, stroke_width=2).move_to(P(x + w / 2, self.TY - self.TH_ENT / 2))
            txt = VGroup(Text(a, font_size=24, color=T_ENCRE, weight=BOLD),
                         Text(b, font_size=24, color=T_ENCRE, weight=BOLD)).arrange(DOWN, buff=0.06)
            if txt.width > w - 0.15:
                txt.scale_to_fit_width(w - 0.15)
            g.add(r, txt.move_to(r))
            x += w
        for i in range(3):
            ligne = []
            x = x_g
            y = self.TY - self.TH_ENT - self.TH * (i + 0.5)
            for w in self.TW:
                r = Rectangle(width=w, height=self.TH, fill_color=WHITE, fill_opacity=1,
                              stroke_color=T_BORD, stroke_width=2).move_to(P(x + w / 2, y))
                g.add(r)
                ligne.append(r)
                x += w
            cases.append(ligne)
        return g, cases

    def remplir(self, case, texte, ambre=False):
        txt = Text(texte, font_size=32, color=T_AMBRE_TXT if ambre else T_ENCRE, weight=BOLD).move_to(case)
        return txt

    def surligner(self, case, on=True):
        return case.animate.set_fill(T_AMBRE if on else WHITE, 1)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Répéter beaucoup", 56, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.6))
        pc = piece_qui_tourne(P(-3.4, 0.55), 0.9)
        self.add(pc)  # ⚠️ AVANT le premier play : sinon une copie figée reste derrière
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        # une courbe qui oscille puis se resserre (sans nombre)
        xs = np.linspace(0, 1, 160)
        pts = [P(-1.0 + 4.2 * x, 0.55 + 1.0 * math.exp(-4.2 * x) * math.sin(26 * x)) for x in xs]
        c = VMobject(stroke_color=BLEU_CALCUL, stroke_width=5).set_points_as_corners(pts)
        ref = DashedLine(P(-1.0, 0.55), P(3.4, 0.55), dash_length=0.15, color=VERT_OK, stroke_width=4)
        self.au_mot("la fréquence")
        self.play(Create(ref), Create(c), run_time=1.3)
        mot = self.t("la fréquence se rapproche", 40, BLEU_CALCUL).move_to(P(-0.6, -1.15))
        self.play(FadeIn(mot, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix(marge=1.0)
        pc.clear_updaters()

    # ── 01 : 10 lancers, 7 piles ────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        pc = piece_qui_tourne(P(-0.6, 1.5), 0.8)
        self.add(pc)
        self.titre_ecran("On lance une pièce")
        s = lancers()[:10]
        self.au_mot("10 lancers")
        rangee = VGroup(*[piece("PILE" if v else "FACE", 0.42).move_to(P(-5.1 + 1.0 * k, -0.25))
                          for k, v in enumerate(s)])
        dix = self.t("10 lancers", 44, JAUNE_TITRE).move_to(P(-3.0, -1.55))
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.5, scale=0.6) for p in rangee], lag_ratio=0.15),
                  FadeIn(dix), run_time=1.5)
        self.au_mot("7 piles")
        piles = VGroup(*[p for p, v in zip(rangee, s) if v])
        faces = VGroup(*[p for p, v in zip(rangee, s) if not v])
        sept = self.t("7 piles", 44, JAUNE_TITRE).move_to(P(1.2, -1.55))
        self.play(faces.animate.set_opacity(0.3), *[p.animate.shift(UP * 0.2) for p in piles],
                  FadeIn(sept, scale=0.6), run_time=0.5)
        self.insister(sept, 0.35)
        self.au_mot("Pile sort plus souvent")
        pc.clear_updaters()
        self.play(Write(self.chute("Pile sort plus souvent ?", color=ORANGE_RETENUE, font_size=40)), run_time=0.8)
        self.attendre_voix()

    # ── 02 : la courbe jusqu'à 10 ───────────────────────────────────────────

    def ecran_peu(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-peu")
        self.titre = self.titre_ecran("Peu de lancers")
        f = self.f
        axes = self.axes_courbe()
        tab, cases = self.tableau()
        self.cases = cases
        self.play(Create(axes[0]), Create(axes[1]), FadeIn(axes[2:]), FadeIn(tab), run_time=0.8)
        self.au_mot("Sur 10 lancers")
        c1 = self.courbe(f, 1, 10)
        tr, lb = self.graduation(10, "10")
        n10 = self.remplir(cases[0][0], "10")
        self.play(Create(c1), run_time=1.4, rate_func=linear)
        self.play(Create(tr), FadeIn(lb), FadeIn(n10), run_time=0.4)
        self.au_mot("0,7")
        pt, val = self.point_val(10, f[9], "0,7")
        v10 = self.remplir(cases[0][1], "0,7", ambre=True)
        self.play(FadeIn(pt, scale=0.5), FadeIn(val), self.surligner(cases[0][1]), FadeIn(v10), run_time=0.5)
        self.insister(val, 0.3)
        self.au_mot("Loin de un demi")
        ld = self.ligne_demi()
        dm = self.demi(30).next_to(P(self.GX0, self.gy(0.5)), LEFT, buff=0.22)
        self.play(Create(ld), FadeIn(dm, scale=0.6), run_time=0.6)
        ecart = DoubleArrow(self.gp(10, 0.5), self.gp(10, f[9]), buff=0.08, color=ROUGE_ERREUR,
                            stroke_width=5, max_tip_length_to_length_ratio=0.15).shift(RIGHT * 0.3)
        loin = self.t("loin", 34, ROUGE_ERREUR).next_to(ecart, RIGHT, buff=0.12)
        self.play(GrowFromCenter(ecart), FadeIn(loin), run_time=0.5)
        self.au_mot("ça varie beaucoup")
        varie = self.t("ça varie beaucoup !", 36, ORANGE_RETENUE).move_to(P(self.TX, -1.2))
        self.play(FadeIn(varie, shift=UP * 0.15), c1.animate.set_stroke(ORANGE_RETENUE, 7), run_time=0.5)
        self.play(Wiggle(c1, scale_value=1.15), run_time=0.9)
        self.attendre_voix()
        self.fig = VGroup(axes, tab, c1, tr, lb, n10, pt, val, v10, ld, dm)
        self.a_retirer = VGroup(ecart, loin, varie)

    # ── 03 : on continue : 100, puis 1000 ───────────────────────────────────

    def palier(self, n, n_prec, ligne, txt_n, txt_piles, txt_f, ex_n, ex_piles, ex_f, run):
        f, cases = self.f, self.cases
        self.au_mot(ex_n)
        c = self.courbe(f, n_prec, n)
        tr, lb = self.graduation(n, txt_n)
        nn = self.remplir(cases[ligne][0], txt_n)
        tete = self.t(f"{txt_n} lancers :", 34).move_to(P(self.TX, -1.15))
        self.play(FadeIn(tete, shift=UP * 0.15), FadeIn(nn), run_time=0.4)
        self.play(Create(c), run_time=run, rate_func=linear)
        self.play(Create(tr), FadeIn(lb), run_time=0.3)
        self.au_mot(ex_piles)
        pl = self.t(txt_piles, 40, JAUNE_TITRE).next_to(tete, DOWN, buff=0.22)
        self.play(FadeIn(pl, scale=0.6), run_time=0.35)
        self.au_mot(ex_f)
        pt, val = self.point_val(n, f[n - 1], txt_f)
        vv = self.remplir(cases[ligne][1], txt_f, ambre=True)
        self.play(FadeIn(pt, scale=0.5), FadeIn(val), self.surligner(cases[ligne][1]), FadeIn(vv), run_time=0.45)
        self.insister(val, 0.3)
        return VGroup(c, tr, lb, nn, pt, val, vv), VGroup(tete, pl)

    def ecran_beaucoup(self):
        self.dire("03-beaucoup")
        titre = self.t("Beaucoup de lancers", 40, JAUNE_TITRE).to_edge(UP)
        c1 = self.fig[2]
        self.play(FadeOut(self.a_retirer), Transform(self.titre, titre), c1.animate.set_stroke(BLEU_CALCUL, 4),
                  self.surligner(self.cases[0][1], False), self.fig[8].animate.set_color(T_ENCRE), run_time=0.6)
        g2, l2 = self.palier(100, 10, 1, "100", "54 piles", "0,54", "100 lancers", "54 piles", "0,54", 1.6)
        self.play(FadeOut(l2), self.surligner(self.cases[1][1], False), g2[6].animate.set_color(T_ENCRE),
                  run_time=0.3)
        g3, l3 = self.palier(1000, 100, 2, "1 000", "503 piles", "0,503", "1000 lancers", "503 piles", "0,503",
                             2.0)
        self.attendre_voix()
        self.fig.add(g2, g3)
        self.a_retirer = l3

    # ── 04 : la loi : vers un demi, 0,5 ────────────────────────────────────

    def ecran_loi(self):
        self.dire("04-loi")
        titre = self.t("Plus on répète…", 40, JAUNE_TITRE).to_edge(UP)
        tab = self.fig[1]
        # le tableau et sa légende laissent la place à la conclusion
        a_sortir = VGroup(self.a_retirer, tab)
        nums = VGroup(self.fig[5], self.fig[8], self.fig[11][3], self.fig[11][6], self.fig[12][3],
                      self.fig[12][6])
        self.play(Transform(self.titre, titre), FadeOut(a_sortir), FadeOut(nums), run_time=0.6)
        self.au_mot("Plus on répète")
        # l'entonnoir : la courbe se resserre
        haut = VMobject(stroke_color=ORANGE_RETENUE, stroke_width=4)
        bas = VMobject(stroke_color=ORANGE_RETENUE, stroke_width=4)
        ns = np.logspace(0.4, 3, 60)
        haut.set_points_smoothly([self.gp(n, 0.5 + 0.75 / math.sqrt(n)) for n in ns])
        bas.set_points_smoothly([self.gp(n, 0.5 - 0.75 / math.sqrt(n)) for n in ns])
        self.play(Create(haut), Create(bas), run_time=1.2)
        self.au_mot("se rapproche")
        courbe = VGroup(self.fig[2], self.fig[11][0], self.fig[12][0])
        self.play(courbe.animate.set_stroke(VERT_OK, 6), run_time=0.5)
        self.au_mot("la probabilité")
        ld = self.fig[9]
        prob = self.t("probabilité", 34, VERT_OK).next_to(ld.get_end(), RIGHT, buff=0.3)
        self.play(ld.animate.set_stroke(width=7), FadeIn(prob, shift=LEFT * 0.2),
                  Flash(self.gp(1, 0.5), color=VERT_OK, line_length=0.3), run_time=0.6)
        self.au_mot("un demi")
        dm = self.demi(40, VERT_OK).next_to(prob, RIGHT, buff=0.35)
        self.play(FadeIn(dm, scale=0.6), run_time=0.4)
        self.insister(dm, 0.3)
        self.au_mot("0,5")
        cinq = self.t("= 0,5", 44, VERT_OK).next_to(dm, RIGHT, buff=0.25)
        self.play(FadeIn(cinq, scale=0.6), run_time=0.4)
        self.insister(cinq, 0.3)
        self.attendre_voix()

    # ── 05 : le piège « face va rattraper » ─────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        self.au_mot("après 7 piles")
        sept = VGroup(*[piece("PILE", 0.42).move_to(P(-5.5 + 0.95 * k, 1.7)) for k in range(7)])
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.4, scale=0.6) for p in sept], lag_ratio=0.12),
                  run_time=1.0)
        n7 = self.t("7 piles", 36, JAUNE_TITRE).next_to(sept, DOWN, buff=0.3)
        self.play(FadeIn(n7), run_time=0.3)
        self.au_mot("face va")
        fc = piece("FACE", 0.6).move_to(P(2.6, 1.7))
        rat = self.t("va « rattraper » ?", 36, ORANGE_RETENUE).next_to(fc, DOWN, buff=0.3)
        fl = Arrow(fc.get_left(), sept.get_right() + RIGHT * 0.05, buff=0.15, color=ORANGE_RETENUE,
                   stroke_width=5, max_tip_length_to_length_ratio=0.12)
        self.play(FadeIn(fc, scale=0.5), GrowArrow(fl), FadeIn(rat, shift=UP * 0.15), run_time=0.6)
        self.au_mot("ne se souvient de rien")
        oubli = self.t("aucune mémoire", 36, ROUGE_ERREUR).move_to(n7)
        self.play(sept.animate.set_opacity(0.15), Transform(n7, oubli), Create(self.barrer(rat)),
                  FadeOut(fl), run_time=0.9)
        self.au_mot("C'est le grand nombre")
        # en bas : la courbe des 1000 lancers, plus petite
        f = self.f
        GY0, GY1 = self.GY0, self.GY1
        self.GY0, self.GY1 = -2.5, -0.55
        axes = self.axes_courbe()
        axes[4].next_to(P(self.GX0, self.GY1), UP, buff=0.12).align_to(P(self.GX0 - 0.3, 0), LEFT)
        c = self.courbe(f, 1, 1000, BLEU_CALCUL, 4)
        queue = self.courbe(f, 100, 1000, VERT_OK, 7)
        ld = self.ligne_demi()
        self.play(FadeIn(axes), Create(ld), run_time=0.5)
        self.play(Create(c), run_time=1.6, rate_func=linear)
        self.au_mot("rapproche la fréquence")
        self.play(Create(queue), run_time=0.8)
        self.au_mot("de 0,5")
        cinq = self.t("0,5", 40, VERT_OK).next_to(ld.get_end(), RIGHT, buff=0.25)
        self.play(FadeIn(cinq, scale=0.6), run_time=0.4)
        self.insister(cinq, 0.3)
        self.attendre_voix()
        self.GY0, self.GY1 = GY0, GY1

    # ── 06 : défi de la punaise ─────────────────────────────────────────────

    def deux_choix(self):
        cartes = VGroup()
        for i, (txt, x) in enumerate([("10 lancers", -4.0), ("500 lancers", 1.6)]):
            lb = self.t(txt, 44, WHITE)
            r = RoundedRectangle(width=lb.width + 0.8, height=1.2, corner_radius=0.2, stroke_color=BLEU_CALCUL,
                                 stroke_width=4, fill_color="#0F172A", fill_opacity=0.8).move_to(P(x, -1.0))
            cartes.add(VGroup(r, lb.move_to(r)))
        ou = self.t("ou", 36).move_to((cartes[0].get_right() + cartes[1].get_left()) / 2)
        return cartes, ou

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("une punaise")
        sol = Line(P(-3.4, 0.55), P(3.0, 0.55), color=GREY_B, stroke_width=4)
        pn = punaise(True, 1.2)
        pn.next_to(P(-1.3, 0.55), UP, buff=0)
        pn2 = punaise(False, 1.2)
        pn2.next_to(P(1.5, 0.55), UP, buff=0)
        self.play(Create(sol), FadeIn(pn, shift=DOWN * 0.6), FadeIn(pn2, shift=DOWN * 0.6), run_time=0.6)
        self.au_mot("pointe en l'air")
        lb = self.t("pointe en l'air ?", 34, JAUNE_TITRE).next_to(pn, LEFT, buff=0.3)
        self.play(FadeIn(lb, shift=RIGHT * 0.15), pn2.animate.set_opacity(0.3), run_time=0.4)
        self.insister(pn, 0.3)
        cartes, ou = self.deux_choix()
        self.au_mot("10 lancers")
        self.play(FadeIn(cartes[0], shift=UP * 0.2), run_time=0.4)
        self.au_mot("500 lancers")
        self.play(FadeIn(ou), FadeIn(cartes[1], shift=UP * 0.2), run_time=0.4)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        cartes, ou = self.deux_choix()
        self.add(cartes, ou)
        self.au_mot("500 lancers")
        cadre = SurroundingRectangle(cartes[1], color=VERT_OK, buff=0.12, stroke_width=6, corner_radius=0.2)
        self.play(Create(cadre), cartes[0].animate.set_opacity(0.25), ou.animate.set_opacity(0.25),
                  cartes[1][1].animate.set_color(VERT_OK), run_time=0.5)
        self.insister(VGroup(cartes[1], cadre), 0.3)
        self.au_mot("plus on répète")
        y0 = 1.35
        xs = np.linspace(0, 1, 200)
        pts = [P(-5.3 + 6.6 * x, y0 + 1.05 * math.exp(-4.0 * x) * math.sin(30 * x + 0.4)) for x in xs]
        c = VMobject(stroke_color=BLEU_CALCUL, stroke_width=5).set_points_as_corners(pts)
        ref = DashedLine(P(-5.3, y0), P(1.6, y0), dash_length=0.15, color=VERT_OK, stroke_width=4)
        self.play(Create(ref), run_time=0.3)
        self.play(Create(c), run_time=1.6, rate_func=linear)
        self.au_mot("vraie probabilité")
        vp = self.t("vraie probabilité", 34, VERT_OK).next_to(ref.get_end(), RIGHT, buff=0.3)
        self.play(FadeIn(vp, shift=LEFT * 0.2), ref.animate.set_stroke(width=7), run_time=0.5)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP)))
        l1 = VGroup(self.coche(), self.ligne_m([("Peu d'essais :", ORANGE_RETENUE),
                                                ("la fréquence varie beaucoup.", WHITE)])).arrange(RIGHT, buff=0.3)
        l2 = VGroup(self.coche(), self.ligne_m([("Beaucoup d'essais :", VERT_OK),
                                                ("elle se rapproche", WHITE)])).arrange(RIGHT, buff=0.3)
        l2b = self.t("de la probabilité.", 36)
        l1.move_to(P(-0.6, 1.6)).align_to(P(-6.0, 0), LEFT)
        l2.move_to(P(-0.6, 0.2)).align_to(P(-6.0, 0), LEFT)
        l2b.next_to(l2[1], DOWN, buff=0.25).align_to(l2[1], LEFT)
        self.au_mot("Avec peu d'essais")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(l1[0]), run_time=0.4)
        self.au_mot("Avec beaucoup d'essais")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), FadeIn(l2b, shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(l2[0]), run_time=0.4)
        self.au_mot("Bravo")
        self.play(Write(self.chute("Bravo, tu as fini la série des probabilités de 6e !", color=VERT_OK,
                                   font_size=36)))
        self.attendre_voix(marge=1.0)

    def ligne_m(self, morceaux, font_size=36):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=0.2)

    # ── 08 : abonnement (rien qui ne soit dit) ──────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        self.au_mot("va sur le coach")
        entraine = self.t("Va sur le coach", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("sur éleveai")
        site = self.t("eleveai.fr", 58, BLEU_CALCUL).move_to(P(0, 1.05))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        abonne = self.t("Abonne-toi à la chaîne !", 44, VERT_OK).move_to(P(0, -0.7))
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.5)
        self.play(Flash(abonne, color=VERT_OK, line_length=0.3), run_time=0.6)
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.f = frequences()
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_peu()
        self.ecran_beaucoup()
        self.ecran_loi()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
