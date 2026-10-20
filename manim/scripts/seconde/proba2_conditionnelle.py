# proba2_conditionnelle.py
# EleveAI — Maths 2de — série « Probabilités », épisode 8 : la PROBABILITÉ
# CONDITIONNELLE (micro : proba_conditionnelle), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba2_conditionnelle_short.py
# (ceinture orange : « 40 sur 400, donc 10 % ? »).
#
# Écrans : 00 garde · 01 le sondage de Saint-Denis (400 points, 160 jaunes,
# 40 rouges) · 02 le TABLEAU CROISÉ (car jaune / autre trajet × en retard /
# à l'heure) · 03 « sachant » : la ligne du car s'allume, 40 sur 160 ·
# 04 la notation P_C(R) = 40/160 = 0,25 · 05 ce n'est pas P(R) (sur 400) ·
# 06 le piège 40/400 = P(C ∩ R) · 07 défi (24 parmi 240) · 07b correction
# (ligne « autre trajet », 24/240 = 0,1) · 08 ce que tu as appris · 09 fin.
#
# ⭐ Canvas du coach repris :
#   · tableau_donnees (lib/canvas/TableauDonneesCanvas.tsx, servi par la banque
#     probabilites-conditionnelles.bank.ts, fonction tableau()) : carte
#     blanche arrondie, titre gras slate-800, en-têtes de colonnes fond
#     slate-800 texte blanc, en-têtes de lignes fond sky-100, cases blanches,
#     lignes « Car jaune / Autre trajet / Total », colonnes « Retard / À
#     l'heure / Total » ; case ou ligne surlignée jaune (yellow-200, anneau
#     yellow-500) ;
#   · la situation « Dans un lycée de Saint-Denis » (car jaune / retard) de la
#     même banque.
# ⛔ Seuls les nombres DITS entrent dans le tableau (400, 160, 40, 240, 24).
#
# Voix : manim/voix/seconde-proba-conditionnelle.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_conditionnelle.py Proba2Conditionnelle -o eleveai-maths-seconde-proba-conditionnelle --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/08-conditionnelle/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# Les couleurs du canvas tableau_donnees du coach.
ENCRE = "#0F172A"         # slate-900
ENTETE = "#1E293B"        # slate-800 : en-têtes de colonnes
LIGNE_FOND = "#E0F2FE"    # sky-100 : en-têtes de lignes
CASE_BORD = "#CBD5E1"     # slate-300
BORD_CARTE = "#E2E8F0"    # slate-200
JAUNE_CASE = "#FEF08A"    # yellow-200 : surlignage
JAUNE_ANNEAU = "#EAB308"  # yellow-500
NUM = "#B45309"           # le numérateur (ambre foncé, lisible sur jaune)
DEN = "#1D4ED8"           # le dénominateur (bleu)
CAR = "#FACC15"           # le car jaune
RETARD = "#EF4444"        # les élèves en retard
ETEINT = 0.22


class NotionSeconde8(Notion6e):
    identite = "Maths 2de — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def frac_txt(num, den, fs=28, color=WHITE, c_num=None, c_den=None):
    """Une fraction écrite (sans LaTeX) : numérateur, barre, dénominateur."""
    n = Text(str(num), font_size=fs, color=c_num or color, weight=BOLD)
    d = Text(str(den), font_size=fs, color=c_den or color, weight=BOLD)
    larg = max(n.width, d.width) + 0.12
    barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3)
    return VGroup(n, barre, d).arrange(DOWN, buff=0.07)


def p_indice(ind, ev="R", fs=40, color=WHITE, barre=False, c_ind=None):
    """« P indice C de R » : P, C en indice (barré au-dessus si barre=True), (R)."""
    p = Text("P", font_size=fs, color=color)
    i = Text(ind, font_size=int(fs * 0.62), color=c_ind or color)
    i.next_to(p, RIGHT, buff=0.03).set_y(p.get_bottom()[1] + 0.02)
    morceaux = [p, i]
    if barre:
        b = Line(LEFT * i.width / 2, RIGHT * i.width / 2, color=c_ind or color, stroke_width=2.5)
        b.next_to(i, UP, buff=0.04)
        morceaux.append(b)
    r = Text(f"({ev})", font_size=fs, color=color)
    r.next_to(i, RIGHT, buff=0.04).set_y(p.get_y())
    morceaux.append(r)
    return VGroup(*morceaux)


def car_jaune(s=1.0):
    """Le car jaune de La Réunion, de profil (repris de premiere/proba_pc_registres.py)."""
    caisse = RoundedRectangle(width=3.0, height=1.25, corner_radius=0.18, fill_color=CAR, fill_opacity=1,
                              stroke_color="#A16207", stroke_width=3)
    nez = RoundedRectangle(width=0.5, height=0.75, corner_radius=0.12, fill_color=CAR, fill_opacity=1,
                           stroke_color="#A16207", stroke_width=3).move_to(P(1.55, -0.25))
    vitres = VGroup(*[RoundedRectangle(width=0.5, height=0.42, corner_radius=0.06, fill_color="#BAE6FD",
                                       fill_opacity=1, stroke_width=0).move_to(P(-1.1 + 0.62 * k, 0.22))
                      for k in range(4)])
    pare_brise = Polygon(P(1.15, 0.45), P(1.42, 0.45), P(1.42, -0.02), P(1.15, -0.02), fill_color="#BAE6FD",
                         fill_opacity=1, stroke_width=0)
    bande = Rectangle(width=2.9, height=0.1, fill_color=ENCRE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.2))
    phare = Circle(radius=0.07, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(1.74, -0.4))
    roues = VGroup()
    for x in (-0.85, 0.95):
        roues.add(VGroup(Circle(radius=0.3, fill_color=ENCRE, fill_opacity=1, stroke_color=GREY_B, stroke_width=2),
                         Circle(radius=0.11, fill_color=GREY_B, fill_opacity=1, stroke_width=0)).move_to(P(x, -0.66)))
    return VGroup(nez, caisse, vitres, pare_brise, bande, phare, roues).scale(s)


def foule(n_col=20, n_lig=20, pas=0.2, r=0.065):
    """400 élèves : une grille de points (ligne par ligne, du haut)."""
    pts = VGroup(*[Dot(P(c * pas, -l * pas), radius=r, color=GREY_B)
                   for l in range(n_lig) for c in range(n_col)])
    return pts.move_to(ORIGIN)


# ── le TABLEAU CROISÉ du coach (tableau_donnees) ────────────────────────────

LIGNES = ["Car jaune", "Autre trajet", "Total"]
COLONNES = ["En retard", "À l'heure", "Total"]
CAR_L, AUTRE_L, TOT_L = 0, 1, 2
RET_C, HEURE_C, TOT_C = 0, 1, 2


class TableauCoach(VGroup):
    """La carte blanche du coach : en-têtes de colonnes sombres, en-têtes de
    lignes bleu ciel, cases blanches VIDES. Les nombres entrent un à un
    (self.valeur), quand la voix les dit."""

    def __init__(self, centre=ORIGIN, lab_w=2.2, cw=1.5, h=0.72, fs=26, fs_ent=22,
                 titre="Élèves du lycée"):
        super().__init__()
        self.fs = fs
        x0 = -(lab_w + 3 * cw) / 2
        y0 = 0.0
        self.coin = Rectangle(width=lab_w, height=h, fill_color=ENTETE, fill_opacity=1,
                              stroke_color=CASE_BORD, stroke_width=2).move_to(P(x0 + lab_w / 2, y0))
        self.lab_col, self.lab_lig, self.cases, self.vals = [], [], {}, {}
        for c, mot in enumerate(COLONNES):
            fond = Rectangle(width=cw, height=h, fill_color=ENTETE, fill_opacity=1, stroke_color=CASE_BORD,
                             stroke_width=2).move_to(P(x0 + lab_w + cw * (c + 0.5), y0))
            t = Text(mot, font_size=fs_ent * 3, color=WHITE, weight=BOLD).scale(1 / 3).move_to(fond)
            if t.width > cw - 0.12:
                t.scale_to_fit_width(cw - 0.12)
            self.lab_col.append(VGroup(fond, t))
        for r, mot in enumerate(LIGNES):
            y = y0 - h * (r + 1)
            fond = Rectangle(width=lab_w, height=h, fill_color=LIGNE_FOND, fill_opacity=1,
                             stroke_color=CASE_BORD, stroke_width=2).move_to(P(x0 + lab_w / 2, y))
            # ⛔ Écrit en grand puis réduit : en petite taille, Pango colle les mots (« Carjaune »).
            t = Text(mot, font_size=fs_ent * 3, color=ENCRE, weight=BOLD).scale(1 / 3).move_to(fond)
            if t.width > lab_w - 0.15:
                t.scale_to_fit_width(lab_w - 0.15)
            self.lab_lig.append(VGroup(fond, t))
            for c in range(3):
                self.cases[(r, c)] = Rectangle(width=cw, height=h, fill_color=WHITE, fill_opacity=1,
                                               stroke_color=CASE_BORD, stroke_width=2).move_to(
                    P(x0 + lab_w + cw * (c + 0.5), y))
        grille = VGroup(self.coin, *self.lab_col, *self.lab_lig, *self.cases.values())
        haut_titre = 0.5 if titre else 0.0
        self.carte = RoundedRectangle(width=grille.width + 0.4, height=grille.height + 0.4 + haut_titre,
                                      corner_radius=0.2, fill_color=WHITE, fill_opacity=1,
                                      stroke_color=BORD_CARTE, stroke_width=2)
        self.carte.move_to(grille).shift(UP * haut_titre / 2)
        self.titre = Text(titre, font_size=fs_ent + 2, color=ENTETE, weight=BOLD) if titre else VGroup()
        if titre:
            self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        self.grille = grille
        self.add(self.carte, self.titre, grille)
        self.shift(centre - self.carte.get_center())

    def valeur(self, r, c, txt, color=ENCRE):
        """Le nombre d'une case (pas encore ajouté à la scène)."""
        t = Text(str(txt), font_size=self.fs, color=color, weight=BOLD).move_to(self.cases[(r, c)])
        self.vals[(r, c)] = t
        return t

    def etat(self, ligne=None, cases=(), estomper=True, op=ETEINT):
        """La ligne `ligne` s'allume en jaune (et les cases `cases`) ; si
        estomper, les autres lignes s'effacent. ligne=None, cases=() : tout
        revient."""
        cases = set(cases)
        anims = []
        for r in range(3):
            on = (ligne is None and not cases) or r == ligne or not estomper or any(k[0] == r for k in cases)
            o = 1 if on else op
            anims.append(self.lab_lig[r].animate.set_opacity(o))
            for c in range(3):
                jaune = r == ligne or (r, c) in cases
                anims.append(self.cases[(r, c)].animate.set_fill(JAUNE_CASE if jaune else WHITE, opacity=o)
                             .set_stroke(JAUNE_ANNEAU if jaune else CASE_BORD, 5 if jaune else 2, opacity=o))
                if (r, c) in self.vals:
                    anims.append(self.vals[(r, c)].animate.set_opacity(o))
        return anims

    def anneau(self, r, c, color=DEN):
        return SurroundingRectangle(self.cases[(r, c)], color=color, buff=0.0, stroke_width=7)


# ── la vidéo ────────────────────────────────────────────────────────────────

C_TAB = P(-3.25, -0.2)   # le centre de la carte du tableau
X_D = 0.85               # le bord gauche de la zone de droite (calculs)


class Proba2Conditionnelle(NotionSeconde8):
    nom_voix = "seconde-proba-conditionnelle"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.2):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m, font_size, c)
                        for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.35, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return Line(mob.get_corner(DL) + P(-0.08, -0.04), mob.get_corner(UR) + P(0.08, 0.04),
                    stroke_width=sw, color=color)

    def a_droite(self, mob, y):
        return mob.move_to(P(0, y)).align_to(P(X_D, 0), LEFT)

    def tableau(self, valeurs=(), ligne=None):
        """Le tableau du coach, avec les nombres déjà dits (rappel)."""
        tb = TableauCoach(centre=C_TAB)
        for (r, c), v in valeurs:
            tb.add(tb.valeur(r, c, v))
        return tb

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Probabilité conditionnelle", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        tb = TableauCoach(centre=P(-0.6, 0.0), lab_w=1.7, cw=1.15, h=0.5, fs=20, fs_ent=17, titre=None)
        self.play(FadeIn(tb, scale=0.85), run_time=0.6)
        self.au_mot("on sait déjà")
        self.play(*tb.etat(CAR_L), run_time=0.6)
        self.insister(tb.lab_lig[CAR_L], 0.3, 1.3)
        self.attendre_voix(marge=1.0)

    # ── 01 : le sondage ─────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Un sondage à Saint-Denis")
        f = foule().move_to(P(-3.6, -0.45))
        self.au_mot("400 élèves")
        self.play(LaggedStart(*[FadeIn(d, scale=0.3) for d in f], lag_ratio=0.004), run_time=1.2)
        x0 = 0.4
        t1 = self.ligne([("400", JAUNE_TITRE), ("élèves", WHITE)], 44, 0.2)
        self.a_droite(t1, 1.4).align_to(P(x0, 0), LEFT)
        self.play(FadeIn(t1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("160 prennent")
        car = car_jaune(0.75).move_to(P(4.6, -0.5))
        self.play(LaggedStart(*[f[k].animate.set_color(CAR) for k in range(160)], lag_ratio=0.006),
                  FadeIn(car, shift=RIGHT * 0.6), run_time=1.0)
        t2 = self.ligne([("160", CAR), ("en car jaune", WHITE)], 40, 0.2).next_to(t1, DOWN, buff=0.35)
        t2.align_to(t1, LEFT)
        self.play(FadeIn(t2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Parmi eux, 40")
        self.play(LaggedStart(*[f[k].animate.set_color(RETARD).scale(1.25) for k in range(40)], lag_ratio=0.02),
                  run_time=0.9)
        t3 = self.ligne([("40", RETARD), ("en retard", WHITE)], 40, 0.2).next_to(car, DOWN, buff=0.45)
        t3.align_to(t1, LEFT)
        self.play(FadeIn(t3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("au moins une fois")
        horloge = VGroup(Circle(radius=0.32, color=WHITE, stroke_width=3),
                         Line(ORIGIN, UP * 0.22, color=WHITE, stroke_width=3),
                         Line(ORIGIN, RIGHT * 0.16, color=RETARD, stroke_width=3)).next_to(t3, RIGHT, buff=0.3)
        self.play(FadeIn(horloge, scale=0.5), run_time=0.3)
        self.play(Rotate(horloge[2], -TAU, about_point=horloge[0].get_center()), run_time=0.8)
        self.insister(VGroup(*f[:40]), 0.3, 1.15)
        self.attendre_voix()

    # ── 02 : le tableau croisé ──────────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        self.titre_ecran("Un tableau croisé")
        tb = TableauCoach(centre=C_TAB)
        self.au_mot("tableau croisé")
        self.play(FadeIn(tb.carte), FadeIn(tb.titre), FadeIn(tb.coin), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(c) for c in tb.cases.values()], lag_ratio=0.05), run_time=0.6)
        self.au_mot("En ligne")
        yl = tb.lab_lig[CAR_L].get_y()
        fl_l = Arrow(P(X_D + 1.3, yl), P(X_D + 0.1, yl), buff=0, color=LIGNE_FOND, stroke_width=6)
        e1 = self.t("en ligne", 36, LIGNE_FOND).next_to(fl_l, RIGHT, buff=0.2)
        self.play(GrowArrow(fl_l), FadeIn(e1), run_time=0.4)
        self.au_mot("car jaune, autre")
        self.play(FadeIn(tb.lab_lig[CAR_L], shift=RIGHT * 0.2), run_time=0.4)
        self.play(Indicate(tb.lab_lig[CAR_L], color=CAR, scale_factor=1.12), run_time=0.4)
        self.au_mot("autre trajet")
        self.play(FadeIn(tb.lab_lig[AUTRE_L], shift=RIGHT * 0.2), run_time=0.4)
        self.play(FadeIn(tb.lab_lig[TOT_L], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("En colonne")
        yc = tb.lab_col[RET_C].get_y() + 0.15
        fl_c = Arrow(P(X_D + 1.3, yc), P(X_D + 0.1, yc), buff=0, color=GREY_B, stroke_width=6)
        e2 = self.t("en colonne", 36, GREY_B).next_to(fl_c, RIGHT, buff=0.2)
        self.play(GrowArrow(fl_c), FadeIn(e2), run_time=0.4)
        self.au_mot("en retard, à")
        self.play(FadeIn(tb.lab_col[RET_C], shift=DOWN * 0.2), run_time=0.4)
        self.play(Indicate(tb.lab_col[RET_C], color=RETARD, scale_factor=1.12), run_time=0.4)
        self.au_mot("à l'heure")
        self.play(FadeIn(tb.lab_col[HEURE_C], shift=DOWN * 0.2), run_time=0.4)
        self.play(FadeIn(tb.lab_col[TOT_C], shift=DOWN * 0.2), run_time=0.3)
        self.attendre_voix()

    # ── 03 : sachant : on se place dans la ligne du car ─────────────────────

    def ecran_sachant(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-sachant")
        self.titre_ecran("On sait déjà quelque chose")
        tb = self.tableau()
        self.add(tb)
        self.au_mot("qui prend le car")
        car = car_jaune(0.6).move_to(P(3.3, 1.45))
        self.play(FadeIn(car, shift=RIGHT * 0.8), Indicate(tb.lab_lig[CAR_L], color=CAR), run_time=0.6)
        self.au_mot("souvent en retard")
        self.play(Indicate(tb.lab_col[RET_C], color=RETARD, scale_factor=1.15), run_time=0.6)
        self.au_mot("on se place dans la ligne")
        self.play(*tb.etat(CAR_L), run_time=0.7)
        self.insister(VGroup(tb.lab_lig[CAR_L], *[tb.cases[(CAR_L, c)] for c in range(3)]), 0.3, 1.1)
        self.au_mot("40 sur 160")
        v40 = tb.valeur(CAR_L, RET_C, "40", NUM)
        v160 = tb.valeur(CAR_L, TOT_C, "160", DEN)
        self.play(FadeIn(v40, scale=0.4), FadeIn(v160, scale=0.4), run_time=0.4)
        fr = frac_txt(40, 160, 54, WHITE, c_num=CAR, c_den=LIGNE_FOND).move_to(P(3.3, -0.6))
        self.play(TransformFromCopy(v40, fr[0]), Create(fr[1]), TransformFromCopy(v160, fr[2]), run_time=0.7)
        self.play(Create(tb.anneau(CAR_L, TOT_C)), run_time=0.3)
        self.insister(fr, 0.3)
        self.attendre_voix()

    # ── 04 : la notation ────────────────────────────────────────────────────

    def ecran_notation(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-notation")
        self.titre_ecran("La notation")
        tb = self.tableau([((CAR_L, RET_C), "40"), ((CAR_L, TOT_C), "160")])
        tb.vals[(CAR_L, RET_C)].set_color(NUM)
        tb.vals[(CAR_L, TOT_C)].set_color(DEN)
        self.add(tb)
        self.play(*tb.etat(CAR_L), run_time=0.4)
        self.au_mot("C :")
        l1 = self.ligne([(self.t("C", 50, CAR), None), (": prend le car", WHITE)], 38, 0.18)
        self.a_droite(l1, 1.3)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Indicate(tb.lab_lig[CAR_L], color=CAR), run_time=0.5)
        self.au_mot("R :")
        l2 = self.ligne([(self.t("R", 50, RETARD), None), (": souvent en retard", WHITE)], 38, 0.18)
        self.a_droite(l2, 0.55)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(tb.lab_col[RET_C], color=RETARD), run_time=0.5)
        self.au_mot("On écrit")
        pc = p_indice("C", "R", 52, WHITE, c_ind=CAR)
        eg = self.t("=", 48)
        fr = frac_txt(40, 160, 46, WHITE, c_num=CAR, c_den=LIGNE_FOND)
        calc = VGroup(pc, eg, fr).arrange(RIGHT, buff=0.25)
        self.a_droite(calc, -0.85)
        self.play(Write(pc), run_time=0.6)
        self.play(Indicate(pc[1], color=CAR, scale_factor=1.6), run_time=0.5)
        self.au_mot("égale 40 sur 160")
        self.play(FadeIn(eg), TransformFromCopy(tb.vals[(CAR_L, RET_C)], fr[0]), Create(fr[1]),
                  TransformFromCopy(tb.vals[(CAR_L, TOT_C)], fr[2]), run_time=0.7)
        self.au_mot("soit 0,25")
        res = VGroup(self.t("=", 48), self.t("0,25", 52, VERT_OK)).arrange(RIGHT, buff=0.25)
        res.next_to(calc, DOWN, buff=0.35).align_to(eg, LEFT)
        self.play(FadeIn(res, shift=RIGHT * 0.2), run_time=0.45)
        self.play(Create(SurroundingRectangle(res[1], color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(res[1], 0.3)
        self.attendre_voix()

    # ── 05 : ce n'est pas P(R) ──────────────────────────────────────────────

    def ecran_differente(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-differente")
        self.titre_ecran("Ce n'est pas P(R)")
        tb = self.tableau([((CAR_L, RET_C), "40"), ((CAR_L, TOT_C), "160")])
        self.add(tb)
        self.play(*tb.etat(CAR_L), run_time=0.4)
        self.au_mot("Ce n'est pas")
        l1 = self.ligne([(p_indice("C", "R", 46, WHITE, c_ind=CAR), None), ("≠", ROUGE_ERREUR), ("P(R)", WHITE)],
                        46, 0.3)
        self.a_droite(l1, 1.2)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.insister(l1[1], 0.3)
        self.au_mot("sur les 400")
        tout = tb.etat()
        v400 = tb.valeur(TOT_L, TOT_C, "400", DEN)
        self.play(*tout, FadeIn(v400, scale=0.4), run_time=0.6)
        an = tb.anneau(TOT_L, TOT_C)
        l2 = self.ligne([("P(R) :", WHITE), ("sur", WHITE), ("400", LIGNE_FOND)], 40, 0.2)
        self.a_droite(l2, 0.0)
        self.play(Create(an), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        self.play(Flash(v400, color=LIGNE_FOND), run_time=0.4)
        self.au_mot("Sachant C")
        self.play(*tb.etat(CAR_L), run_time=0.6)
        self.au_mot("le total devient 160")
        an2 = tb.anneau(CAR_L, TOT_C)
        l3 = self.ligne([("sachant C :", CAR), ("sur", WHITE), ("160", LIGNE_FOND)], 40, 0.2)
        self.a_droite(l3, -1.1)
        self.play(Transform(an, an2), FadeIn(l3, shift=RIGHT * 0.2), run_time=0.7)
        self.insister(tb.vals[(CAR_L, TOT_C)], 0.3, 1.6)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        tb = self.tableau([((CAR_L, RET_C), "40"), ((CAR_L, TOT_C), "160"), ((TOT_L, TOT_C), "400")])
        self.add(tb)
        self.au_mot("diviser 40 par 400")
        self.play(*tb.etat(cases=[(CAR_L, RET_C), (TOT_L, TOT_C)], estomper=False), run_time=0.5)
        fx = frac_txt(40, 400, 42, ROUGE_ERREUR)
        l1 = VGroup(p_indice("C", "R", 44, ROUGE_ERREUR), self.t("=", 44, ROUGE_ERREUR), fx,
                    self.t("?", 52, ROUGE_ERREUR)).arrange(RIGHT, buff=0.22)
        self.a_droite(l1, 1.15)
        self.play(FadeIn(l1[:2]), TransformFromCopy(tb.vals[(CAR_L, RET_C)], fx[0]), Create(fx[1]),
                  TransformFromCopy(tb.vals[(TOT_L, TOT_C)], fx[2]), run_time=0.7)
        self.play(FadeIn(l1[3], scale=0.5), run_time=0.25)
        self.insister(l1[3], 0.25)
        self.au_mot("c'est P de C inter R")
        self.play(Create(self.barrer(VGroup(l1[0], l1[1]))), run_time=0.35)
        f2 = frac_txt(40, 400, 42, ORANGE_RETENUE)
        l2 = VGroup(f2, self.t("=", 44, ORANGE_RETENUE), self.t("P(C ∩ R)", 44, ORANGE_RETENUE))
        l2.arrange(RIGHT, buff=0.22)
        self.a_droite(l2, -0.15)
        self.play(TransformFromCopy(fx, f2), FadeIn(l2[1:], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("car ET retard")
        self.play(Indicate(tb.lab_lig[CAR_L], color=CAR), Indicate(tb.lab_col[RET_C], color=RETARD), run_time=0.6)
        self.play(Flash(tb.cases[(CAR_L, RET_C)], color=ORANGE_RETENUE, line_length=0.35), run_time=0.5)
        self.insister(tb.vals[(CAR_L, RET_C)], 0.25, 1.6)
        self.au_mot("Sachant C")
        self.play(*tb.etat(CAR_L), run_time=0.6)
        self.au_mot("l'effectif de C")
        an = tb.anneau(CAR_L, TOT_C)
        f3 = frac_txt(40, 160, 42, VERT_OK)
        l3 = VGroup(p_indice("C", "R", 44, VERT_OK), self.t("=", 44, VERT_OK), f3).arrange(RIGHT, buff=0.22)
        self.a_droite(l3, -1.5)
        ok = self.coche(taille=0.25).next_to(l3, RIGHT, buff=0.3)
        self.play(Create(an), FadeIn(l3, shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(ok), run_time=0.3)
        self.insister(f3[2], 0.3, 1.5)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tb = self.tableau([((CAR_L, RET_C), "40"), ((CAR_L, TOT_C), "160"), ((TOT_L, TOT_C), "400")])
        tb.scale(0.9).shift(UP * 0.3)   # la chute « Mets pause » passe dessous
        self.play(FadeIn(tb), run_time=0.5)
        self.au_mot("240 élèves")
        anims = tb.etat(AUTRE_L)
        v240 = tb.valeur(AUTRE_L, TOT_C, "240", DEN)
        self.play(*anims, FadeIn(v240, scale=0.4), run_time=0.6)
        self.au_mot("ne prennent pas le car")
        self.play(Indicate(tb.lab_lig[AUTRE_L], color=LIGNE_FOND, scale_factor=1.15), run_time=0.6)
        self.au_mot("24 sont")
        v24 = tb.valeur(AUTRE_L, RET_C, "24", NUM)
        self.play(FadeIn(v24, scale=0.4), run_time=0.4)
        self.insister(v24, 0.25, 1.6)
        self.au_mot("Calcule")
        q = VGroup(p_indice("C", "R", 50, BLEU_CALCUL, barre=True, c_ind=CAR), self.t("=", 48),
                   self.t("?", 60, ORANGE_RETENUE)).arrange(RIGHT, buff=0.25)
        self.a_droite(q, 0.4).shift(RIGHT * 0.6)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.play(Indicate(q[0][2], color=CAR, scale_factor=2.0), run_time=0.5)
        self.insister(q[2], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        tb = self.tableau([((CAR_L, RET_C), "40"), ((CAR_L, TOT_C), "160"), ((TOT_L, TOT_C), "400"),
                           ((AUTRE_L, RET_C), "24"), ((AUTRE_L, TOT_C), "240")])
        self.add(tb)
        self.au_mot("dans la ligne")
        self.play(*tb.etat(AUTRE_L), run_time=0.6)
        self.insister(VGroup(tb.lab_lig[AUTRE_L], *[tb.cases[(AUTRE_L, c)] for c in range(3)]), 0.3, 1.1)
        self.bring_to_front(*tb.vals.values())   # les nombres restent AU-DESSUS des cases
        self.au_mot("24 sur 240")
        pc = p_indice("C", "R", 48, WHITE, barre=True, c_ind=CAR)
        fr = frac_txt(24, 240, 46, WHITE, c_num=CAR, c_den=LIGNE_FOND)
        calc = VGroup(pc, self.t("=", 48), fr).arrange(RIGHT, buff=0.25)
        self.a_droite(calc, 0.6)
        self.play(FadeIn(calc[:2]), TransformFromCopy(tb.vals[(AUTRE_L, RET_C)], fr[0]), Create(fr[1]),
                  TransformFromCopy(tb.vals[(AUTRE_L, TOT_C)], fr[2]), Create(tb.anneau(AUTRE_L, TOT_C)),
                  run_time=0.7)
        self.au_mot("soit 0,1")
        res = VGroup(self.t("=", 48), self.t("0,1", 52, VERT_OK)).arrange(RIGHT, buff=0.25)
        res.next_to(calc, DOWN, buff=0.4).align_to(calc[1], LEFT)
        self.play(FadeIn(res, shift=RIGHT * 0.2), run_time=0.4)
        self.play(Create(SurroundingRectangle(res[1], color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(res[1], 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 36
        l1 = self.ligne([(p_indice("A", "B", 40, BLEU_CALCUL, c_ind=CAR), None),
                         (": la probabilité de B quand A est réalisé", WHITE)], fs, 0.2)
        l2 = self.ligne([("Le total devient", WHITE), ("l'effectif de A", CAR)], fs, 0.2)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if lignes.width > 12.0:
            lignes.scale_to_fit_width(12.0)
        lignes.move_to(P(-0.4, 1.55))
        mini = TableauCoach(centre=P(-1.0, -1.25), lab_w=1.7, cw=1.15, h=0.42, fs=18, fs_ent=16, titre=None)
        self.au_mot("P indice A de B")
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), run_time=0.5)
        self.play(Create(lignes[0][0]), run_time=0.3)
        self.au_mot("quand on sait")
        self.play(FadeIn(mini, scale=0.85), run_time=0.4)
        self.play(*mini.etat(CAR_L), run_time=0.5)
        self.au_mot("Le total devient")
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), run_time=0.5)
        self.play(Create(lignes[1][0]), Create(mini.anneau(CAR_L, TOT_C)), run_time=0.4)
        self.au_mot("L'épisode 9")
        self.play(Write(self.chute("Épisode 9 : l'arbre pondéré", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_sachant()
        self.ecran_notation()
        self.ecran_differente()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
