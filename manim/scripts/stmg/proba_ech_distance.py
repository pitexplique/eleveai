# proba_ech_distance.py
# EleveAI — Maths STMG — série « Probabilités » : LA DISTANCE ENTRE f ET p
# (micro va_ech_distance, notion va_echantillonnage), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_ech_distance_short.py
# (ceinture jaune : « 8 % sur 400 colis, écart trop grand ? »).
#
# Contexte business : un fournisseur garantit 5 % de colis abîmés ; sur 400
# colis, 32 abîmés → f = 0,08 ; distance 0,03 < marge 1/√400 = 0,05 → normal.
# Piège : la valeur absolue (0,02 → distance 0,03, pas −0,03).
# Défi : 48 sur 400 → 0,12 ; distance 0,07 > 0,05 → pas normal.
#
# ⭐ Les figures : la micro du coach n'a PAS de canvas (questions en texte,
# intervalle [p − 1/√n ; p + 1/√n]). On dessine donc :
#   · les 400 colis (grille 20 × 20), les abîmés en rouge ;
#   · un AXE avec p et f, une ACCOLADE entre p et f (la distance) ;
#   · une RÈGLE qui mesure la marge de part et d'autre de p : la BANDE,
#     verte dedans, rouge dehors ; l'accolade descend sur la règle pour comparer.
# ⛔ PAS D'ÉCART : seuls les nombres dits s'écrivent (axe sans graduations
# chiffrées, bords de la bande non chiffrés).
#
# Écrans : 00 garde · 01 situation · 02 fréquence · 03 distance · 04 comparer ·
# 05 sens · 06 piège · 07 défi · 07b correction · 08 ce que tu as appris ·
# 09 fin « Entraîne-toi sur eleveai.fr ».
#
# Voix : manim/voix/stmg-proba-ech-distance.json (débit −7).
# Rendu (media à soi : WinError 32 sinon) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_ech_distance.py ProbaEchDistanceSTMG -o eleveai-maths-stmg-proba-ech-distance --media_dir manim/scripts/stmg/media-ech_distance
# Puis copier dans manim/sorties/stmg/maths/probabilites/35-ech-distance/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import ENCRE, suite  # noqa: E402

CARTON = "#C08A4B"      # un colis
CARTON_BORD = "#7C5A2E"
SCOTCH = "#E8D3A8"
ABIME = "#EF4444"       # un colis abîmé
COUL_P = "#FACC15"      # p : jaune
COUL_F = "#38BDF8"      # f : bleu
VERT_BANDE = "#22C55E"
ROUGE_BANDE = "#EF4444"
REGLE = "#FDE68A"       # la règle (bois clair)

# les colis abîmés : toujours les mêmes ; les 32 premiers, puis 16 de plus
_ORDRE = np.random.default_rng(974).permutation(400)
ABIMES_32 = set(int(i) for i in _ORDRE[:32])
ABIMES_48 = set(int(i) for i in _ORDRE[:48])


def P(x, y):
    return np.array([x, y, 0.0])


def colis(h=0.9, abime=False):
    """Un carton : la boîte, la bande de scotch, et une fente s'il est abîmé."""
    w = h * 1.25
    boite = RoundedRectangle(width=w, height=h, corner_radius=h * 0.06, fill_color=CARTON, fill_opacity=1,
                             stroke_color=CARTON_BORD, stroke_width=2)
    rabat = Line(boite.get_left() + UP * h * 0.22, boite.get_right() + UP * h * 0.22, stroke_color=CARTON_BORD,
                 stroke_width=2)
    scotch = Rectangle(width=w * 0.16, height=h, fill_color=SCOTCH, fill_opacity=1, stroke_width=0).move_to(boite)
    g = VGroup(boite, scotch, rabat)
    if abime:
        fente = VMobject(stroke_color=ABIME, stroke_width=4)
        fente.set_points_as_corners([P(-0.3, 0.25), P(-0.1, 0.0), P(0.05, 0.12), P(0.3, -0.2)])
        g.add(fente.scale(h).move_to(boite).shift(LEFT * w * 0.18))
    return g


class Grille(VGroup):
    """Les 400 colis : 20 × 20 petites boîtes. `abimer(ens)` rend les
    animations qui passent en rouge les colis de l'ensemble."""

    def __init__(self, centre=P(0, 0), pas=0.2, **kw):
        super().__init__(**kw)
        self.cases = VGroup()
        c = pas * 0.82
        for n in range(400):
            x = centre[0] + pas * (n % 20 - 9.5)
            y = centre[1] + pas * (9.5 - n // 20)
            self.cases.add(Square(c, fill_color=CARTON, fill_opacity=1, stroke_color=CARTON_BORD,
                                  stroke_width=1).move_to(P(x, y)))
        self.add(self.cases)

    def abimer(self, ens):
        return [self.cases[i].animate.set_fill(ABIME, 1).set_stroke(WHITE, 1) for i in sorted(ens)]

    def rougir(self, ens):
        for i in ens:
            self.cases[i].set_fill(ABIME, 1).set_stroke(WHITE, 1)
        return self


def fraction(num, den, fs=48, color=WHITE):
    """Une fraction en Text : numérateur, trait, dénominateur."""
    n = Text(num, font_size=fs, color=color)
    d = Text(den, font_size=fs, color=color)
    w = max(n.width, d.width) + 0.15
    barre = Line(LEFT * w / 2, RIGHT * w / 2, stroke_width=3, color=color)
    return VGroup(n, barre, d).arrange(DOWN, buff=0.1)


def racine(n_txt, fs=44, color=WHITE):
    """√n : le radical « √ » et une barre au-dessus de n."""
    rad = Text("√", font_size=fs, color=color)
    n = Text(n_txt, font_size=fs, color=color).next_to(rad, RIGHT, buff=0.02)
    barre = Line(n.get_corner(UL) + UP * 0.08 + LEFT * 0.04, n.get_corner(UR) + UP * 0.08 + RIGHT * 0.02,
                 stroke_width=2.5, color=color)
    rad.align_to(barre, UP).shift(DOWN * 0.02)
    return VGroup(rad, n, barre)


def un_sur_racine(n_txt, fs=40, color=WHITE):
    """1/√n en fraction."""
    un = Text("1", font_size=fs, color=color)
    r = racine(n_txt, fs, color)
    w = max(un.width, r.width) + 0.15
    barre = Line(LEFT * w / 2, RIGHT * w / 2, stroke_width=3, color=color)
    return VGroup(un, barre, r).arrange(DOWN, buff=0.1)


def barres(mob, color=WHITE, fs=None):
    """|mob| : deux traits verticaux autour de mob."""
    h = mob.height + 0.25
    g = Line(UP * h / 2, DOWN * h / 2, stroke_width=4, color=color).next_to(mob, LEFT, buff=0.1)
    d = Line(UP * h / 2, DOWN * h / 2, stroke_width=4, color=color).next_to(mob, RIGHT, buff=0.1)
    return VGroup(g, d)


class Axe(VGroup):
    """L'axe des fréquences, de 0 à vmax, SANS nombres (ils viennent avec la voix).
    · x(v) : le point de l'axe pour la valeur v ;
    · repere(v, nom, coul) : un point + sa lettre (p, f) SOUS l'axe ;
    · valeur(v, texte, coul) : le nombre sous la lettre ;
    · accolade(v1, v2, coul) : l'accolade AU-DESSUS, entre les deux points ;
    · bande(p, m) : vert dedans [p − m ; p + m], rouge dehors ;
    · regle(p, m) : la règle sous l'axe, une moitié de longueur m de chaque côté."""

    def __init__(self, gauche=-5.8, longueur=10.8, vmax=0.14, y=0.6, fs=34, **kw):
        super().__init__(**kw)
        self.g, self.k, self.y, self.vmax, self.fs = gauche, longueur / vmax, y, vmax, fs
        self.ligne = Arrow(P(gauche - 0.1, y), P(gauche + longueur + 0.35, y), buff=0, stroke_width=4,
                           color=GREY_B, max_tip_length_to_length_ratio=0.03)
        self.ticks = VGroup(*[Line(self.x(i / 100) + UP * (0.12 if i % 5 else 0.18),
                                   self.x(i / 100) + DOWN * (0.12 if i % 5 else 0.18),
                                   stroke_width=2, color=GREY_B) for i in range(int(round(vmax * 100)) + 1)])
        self.add(self.ligne, self.ticks)

    def x(self, v):
        return P(self.g + self.k * v, self.y)

    def repere(self, v, nom, coul, r=0.11):
        d = Dot(self.x(v), radius=r, color=coul).set_z_index(3)
        lettre = Text(nom, font_size=self.fs, color=coul, weight=BOLD, slant=ITALIC)
        lettre.move_to(self.x(v) + DOWN * 0.48)
        return VGroup(d, lettre)

    def valeur(self, v, texte, coul):
        return Text(texte, font_size=self.fs, color=coul, weight=BOLD).move_to(self.x(v) + DOWN * 0.98)

    def accolade(self, v1, v2, coul=WHITE, buff=0.22):
        a, b = sorted((v1, v2))
        br = Brace(Line(self.x(a), self.x(b)), UP, buff=buff, color=coul, sharpness=1.2)
        return br

    def sur_accolade(self, br, texte, coul=WHITE, fs=None):
        t = Text(texte, font_size=fs or self.fs + 4, color=coul, weight=BOLD)
        return t.next_to(br, UP, buff=0.1)

    def bande(self, p, m, h=0.5):
        a, b = max(0, p - m), p + m
        dedans = Rectangle(width=self.k * (b - a), height=h, fill_color=VERT_BANDE, fill_opacity=0.3,
                           stroke_color=VERT_BANDE, stroke_width=2)
        dedans.move_to((self.x(a) + self.x(b)) / 2)
        fin = self.vmax + 0.004
        dehors = Rectangle(width=self.k * (fin - b), height=h, fill_color=ROUGE_BANDE, fill_opacity=0.25,
                           stroke_width=0)
        dehors.move_to((self.x(b) + self.x(fin)) / 2)
        dedans.set_z_index(-1)
        dehors.set_z_index(-1)
        return VGroup(dedans, dehors)

    def regle(self, p, m, dy=-1.75, h=0.32):
        """La règle : une latte claire de p − m à p + m, graduée, repère au milieu
        (sur p). r[0] = la latte, r[1] = les graduations, r[2] = le repère de p."""
        a, b = self.x(p - m), self.x(p + m)
        latte = RoundedRectangle(width=b[0] - a[0], height=h, corner_radius=0.05, fill_color=REGLE,
                                 fill_opacity=1, stroke_color="#A16207", stroke_width=2)
        latte.move_to((a + b) / 2 + UP * dy)
        top = latte.get_top()[1]
        grads = VGroup()
        n = int(round(2 * m * 100))
        for i in range(n * 2 + 1):
            xx = a[0] + (b[0] - a[0]) * i / (n * 2)
            lg = h * (0.55 if i % 2 == 0 else 0.3)
            grads.add(Line(P(xx, top), P(xx, top - lg), stroke_width=1.5, color="#713F12"))
        milieu = Line(P(self.x(p)[0], top + 0.05), P(self.x(p)[0], latte.get_bottom()[1] - 0.05),
                      stroke_width=4, color=COUL_P)
        return VGroup(latte, grads, milieu)

    def mesure(self, regle, cote, texte="0,05", coul=ENCRE):
        """Le « 0,05 » sous une moitié de la règle (cote = −1 gauche, +1 droite)."""
        latte = regle[0]
        cx = latte.get_center()[0] + cote * latte.width / 4
        return Text(texte, font_size=self.fs - 2, color=REGLE, weight=BOLD).move_to(
            P(cx, latte.get_bottom()[1] - 0.32))

    def pointilles(self, v, y_bas):
        """Un pointillé vertical de l'axe vers la règle (repère de p)."""
        return DashedLine(self.x(v), P(self.x(v)[0], y_bas), dash_length=0.08, stroke_width=2, color=COUL_P)


class ProbaEchDistanceBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-proba-ech-distance"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE, weight=NORMAL):
        return Text(texte, font_size=font_size, color=color, weight=weight)

    def insister(self, mob, run_time=0.3, bord=None):
        """Agrandir puis rétrécir (×1,5 puis ÷1,5), jamais de zoom de caméra."""
        self.play(mob.animate.scale(1.5, about_edge=bord), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5, about_edge=bord), run_time=run_time)

    def calcul(self, morceaux, fs=44, buff=0.16):
        """Une ligne de calcul ; morceaux = [(texte ou mob, couleur), …]."""
        return suite(*[x if isinstance(x, Mobject) else self.t(x, fs, c, BOLD) for x, c in morceaux], buff=buff)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La distance entre f et p", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.85))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        ax = Axe(gauche=-5.2, longueur=9.2, y=0.0)
        rp, rf = ax.repere(0.05, "p", COUL_P), ax.repere(0.08, "f", COUL_F)
        self.play(Create(ax), run_time=0.5)
        self.play(FadeIn(rp, scale=1.5), FadeIn(rf, scale=1.5), run_time=0.4)
        br = ax.accolade(0.05, 0.08, WHITE)
        self.play(GrowFromCenter(br), run_time=0.5)
        self.insister(br, 0.25, DOWN)
        self.attendre_voix(marge=1.0)

    # ── 01 : la situation : 400 colis, 32 abîmés ────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Les colis du fournisseur")
        boite = colis(1.3).move_to(P(-4.3, 1.6))
        boite2 = colis(1.3, abime=True).next_to(boite, RIGHT, buff=0.4)
        self.au_mot("Un fournisseur")
        self.play(FadeIn(boite, shift=UP * 0.2), run_time=0.5)
        l1 = self.t("garantit :", 38).move_to(P(-4.0, -0.1))
        cinq = self.t("5 % abîmés", 46, COUL_P, BOLD).next_to(l1, DOWN, buff=0.2)
        self.au_mot("garantit")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("5 %")
        self.play(FadeIn(cinq, scale=1.6), FadeIn(boite2, shift=UP * 0.2), run_time=0.5)
        self.insister(cinq, 0.25)
        gr = Grille(centre=P(2.4, -0.2), pas=0.19)
        self.au_mot("Sur 400 colis")
        n400 = self.t("400 colis", 36, WHITE, BOLD).next_to(gr, UP, buff=0.2)
        self.play(LaggedStart(*[FadeIn(c, scale=0.3) for c in gr.cases], lag_ratio=0.002), FadeIn(n400),
                  run_time=1.2)
        self.au_mot("32 abîmés")
        self.play(LaggedStart(*gr.abimer(ABIMES_32), lag_ratio=0.05), run_time=1.0)
        n32 = self.t("32 abîmés", 44, ABIME, BOLD).move_to(P(-4.0, -2.2))
        self.play(FadeIn(n32, scale=1.5), run_time=0.4)
        self.insister(n32, 0.25)
        self.attendre_voix()

    # ── 02 : la fréquence observée ──────────────────────────────────────────

    def ecran_frequence(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-frequence")
        self.titre_ecran("La fréquence observée")
        gr = Grille(centre=P(3.6, 0.9), pas=0.13).rougir(ABIMES_32)
        self.add(gr)
        lf = self.t("f", 52, COUL_F, BOLD)
        fr = fraction("32", "400", 52)
        fr[0].set_color(ABIME)
        l1 = self.calcul([(lf, None), ("=", WHITE), (fr, None)], buff=0.25).move_to(P(-3.2, 1.3))
        self.au_mot("La fréquence observée")
        self.play(FadeIn(l1[:2], shift=RIGHT * 0.2), Indicate(gr, scale_factor=1.05), run_time=0.5)
        self.au_mot("32 sur 400")
        self.play(FadeIn(fr, scale=1.4), run_time=0.5)
        res = self.calcul([("=", WHITE), ("0,08", COUL_F)], 52, buff=0.25).next_to(l1, RIGHT, buff=0.25)
        ax = Axe(gauche=-5.8, longueur=10.2, y=-1.4)
        self.au_mot("0,08")
        self.play(FadeIn(res[0]), FadeIn(res[1], scale=1.8), run_time=0.45)
        self.play(Create(ax), run_time=0.5)
        rf = ax.repere(0.08, "f", COUL_F)
        vf = ax.valeur(0.08, "0,08", COUL_F)
        self.play(TransformFromCopy(res[1], vf), FadeIn(rf, scale=1.5), run_time=0.6)
        self.insister(rf[0], 0.25)
        self.attendre_voix()

    # ── 03 : la distance : l'accolade entre p et f ──────────────────────────

    def ecran_distance(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-distance")
        self.titre_ecran("La distance à p")
        ax = Axe(y=-0.1)
        rf, vf = ax.repere(0.08, "f", COUL_F), ax.valeur(0.08, "0,08", COUL_F)
        rp, vp = ax.repere(0.05, "p", COUL_P), ax.valeur(0.05, "0,05", COUL_P)
        self.play(Create(ax), FadeIn(rf), FadeIn(vf), run_time=0.5)
        self.au_mot("à p")
        self.play(FadeIn(rp, scale=1.6), run_time=0.4)
        br = ax.accolade(0.05, 0.08)
        self.au_mot("la différence")
        self.play(GrowFromCenter(br), run_time=0.5)
        d = self.t("distance", 42, WHITE, BOLD)
        eg = self.t("=", 44, WHITE, BOLD)
        a = self.t("0,08", 44, COUL_F, BOLD)
        moins = self.t("−", 44, WHITE, BOLD)
        b = self.t("0,05", 44, COUL_P, BOLD)
        dedans = suite(a, moins, b, buff=0.18)
        l1 = VGroup(d, eg, dedans)
        d.next_to(eg, LEFT, buff=0.25)
        dedans.next_to(eg, RIGHT, buff=0.5)
        l1.move_to(P(-1.9, 2.35))
        self.play(FadeIn(d), FadeIn(eg), run_time=0.3)
        self.au_mot("0,08 et")
        self.play(TransformFromCopy(vf, a), Indicate(rf, color=COUL_F), run_time=0.5)
        self.au_mot("0,05")
        self.play(FadeIn(vp, scale=1.5), run_time=0.35)
        self.play(FadeIn(moins), TransformFromCopy(vp, b), run_time=0.5)
        self.au_mot("sans signe")
        bb = barres(dedans, WHITE)
        sans = self.t("sans signe", 30, ORANGE_RETENUE).next_to(bb, DOWN, buff=0.08)
        self.play(Create(bb), FadeIn(sans, shift=UP * 0.1), run_time=0.5)
        self.au_mot("0,03.")
        res = suite(self.t("=", 44, WHITE, BOLD), self.t("0,03", 50, VERT_OK, BOLD), buff=0.25)
        res.next_to(bb, RIGHT, buff=0.35)
        lab = ax.sur_accolade(br, "0,03", VERT_OK)
        self.play(FadeIn(res[0]), FadeIn(res[1], scale=1.8), br.animate.set_color(VERT_OK), run_time=0.45)
        self.play(TransformFromCopy(res[1], lab), run_time=0.5)
        cadre = SurroundingRectangle(res[1], color=VERT_OK, buff=0.14, stroke_width=4, corner_radius=0.08)
        self.play(Create(cadre), run_time=0.3)
        self.insister(VGroup(br, lab), 0.25, DOWN)
        self.attendre_voix()

    # ── 04 : comparer à la marge : la règle et la bande ─────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-comparer")
        self.titre_ecran("Comparer à la marge")
        ax = Axe(y=0.75)
        rf, rp = ax.repere(0.08, "f", COUL_F), ax.repere(0.05, "p", COUL_P)
        br = ax.accolade(0.05, 0.08, VERT_OK)
        lab = ax.sur_accolade(br, "0,03", VERT_OK)
        self.add(ax, rf, rp, br, lab)
        self.au_mot("la marge")
        lm = self.t("marge", 40, REGLE, BOLD)
        eg = self.t("=", 44, WHITE, BOLD)
        l1 = suite(lm, eg, buff=0.25).move_to(P(-5.4, -2.25), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("1 sur racine de 400")
        f1 = un_sur_racine("400", 38).next_to(l1, RIGHT, buff=0.25)
        self.play(FadeIn(f1, scale=1.4), run_time=0.5)
        self.au_mot("400 : 0,05")
        eg2 = self.t("=", 44, WHITE, BOLD).next_to(f1, RIGHT, buff=0.25)
        m5 = self.t("0,05", 48, REGLE, BOLD).next_to(eg2, RIGHT, buff=0.25)
        rg = ax.regle(0.05, 0.05, dy=-1.6)
        pt = ax.pointilles(0.05, rg[0].get_top()[1])
        mg, md = ax.mesure(rg, -1), ax.mesure(rg, 1)
        self.play(FadeIn(eg2), FadeIn(m5, scale=1.8), run_time=0.4)
        self.play(GrowFromPoint(rg, ax.x(0.05) + DOWN * 1.6), Create(pt), run_time=0.6)
        self.play(TransformFromCopy(m5, mg), TransformFromCopy(m5, md), run_time=0.5)
        bande = ax.bande(0.05, 0.05)
        self.play(FadeIn(bande), run_time=0.5)
        self.au_mot("0,03 est plus petit")
        # l'accolade descend sur la règle : elle tient dans la moitié droite
        copie = br.copy()
        self.play(copie.animate.shift(DOWN * (br.get_bottom()[1] - rg[0].get_top()[1] + 0.02)), run_time=0.8)
        cmp = suite(self.t("0,03", 46, VERT_OK, BOLD), self.t("<", 46, WHITE, BOLD),
                    self.t("0,05", 46, REGLE, BOLD), buff=0.22).move_to(P(-5.4, -3.2), aligned_edge=LEFT)
        self.play(FadeIn(cmp, shift=UP * 0.1), Indicate(md, color=VERT_OK), run_time=0.5)
        self.au_mot("la distance est normale")
        ok = self.t("normale", 46, VERT_OK, BOLD).next_to(ax.x(0.08), UP, buff=1.25).shift(RIGHT * 1.4)
        self.play(rf[0].animate.set_color(VERT_OK), bande[0].animate.set_fill(opacity=0.5), run_time=0.4)
        self.play(FadeIn(ok, scale=1.5), run_time=0.4)
        self.insister(ok, 0.25)
        self.attendre_voix()

    # ── 05 : le sens : petite = fluctuation, grande = rare ──────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-sens")
        self.titre_ecran("Petite ou grande distance ?")
        ax = Axe(y=0.75)
        rp = ax.repere(0.05, "p", COUL_P)
        rg = ax.regle(0.05, 0.05, dy=-1.6)
        pt = ax.pointilles(0.05, rg[0].get_top()[1])
        bande = ax.bande(0.05, 0.05)
        self.add(bande, ax, rp, rg, pt)
        v = ValueTracker(0.066)

        def coul():
            return VERT_OK if v.get_value() <= 0.1 else ROUGE_BANDE

        dot = always_redraw(lambda: Dot(ax.x(v.get_value()), radius=0.12, color=coul()).set_z_index(3))
        lf = always_redraw(lambda: Text("f", font_size=34, color=coul(), weight=BOLD, slant=ITALIC)
                           .move_to(ax.x(v.get_value()) + DOWN * 0.48))
        br = always_redraw(lambda: ax.accolade(0.05, v.get_value(), coul()))
        self.au_mot("Une petite distance")
        self.play(FadeIn(dot, scale=1.5), FadeIn(lf), GrowFromCenter(br), run_time=0.5)
        l1 = suite(self.t("petite distance :", 38), self.t("fluctuation", 42, VERT_OK, BOLD), buff=0.22)
        l1.move_to(P(-1.8, -2.35))
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("la fluctuation")
        self.play(FadeIn(l1[1], scale=1.4), run_time=0.4)
        for cible in (0.072, 0.058, 0.07, 0.062):
            self.play(v.animate.set_value(cible), run_time=0.35, rate_func=smooth)
        self.au_mot("Une grande distance")
        self.play(v.animate.set_value(0.125), run_time=0.9)
        l2 = suite(self.t("grande distance :", 38), self.t("rare", 46, ROUGE_BANDE, BOLD), buff=0.22)
        l2.move_to(P(-1.8, -3.05)).align_to(l1, LEFT)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("plus grande que la marge")
        copie = ax.accolade(0.05, 0.125, ROUGE_BANDE)
        self.add(copie)
        self.play(copie.animate.shift(DOWN * (copie.get_bottom()[1] - rg[0].get_top()[1] + 0.02)), run_time=0.8)
        self.play(Indicate(bande[1], color=ROUGE_BANDE, scale_factor=1.05), run_time=0.5)
        self.au_mot("c'est rare")
        self.play(FadeIn(l2[1], scale=1.6), run_time=0.4)
        self.insister(l2[1], 0.25, LEFT)
        self.attendre_voix()

    # ── 06 : le piège : oublier la valeur absolue ───────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        ax = Axe(y=0.3)
        rp = ax.repere(0.05, "p", COUL_P)
        self.add(ax, rp)
        self.au_mot("oublier la valeur absolue")
        oub = self.t("Oublier la valeur absolue", 38, ORANGE_RETENUE, BOLD).move_to(P(-0.6, 2.45))
        self.play(FadeIn(oub, shift=DOWN * 0.1), run_time=0.5)
        self.au_mot("0,02")
        rf, vf = ax.repere(0.02, "f", COUL_F), ax.valeur(0.02, "0,02", COUL_F)
        self.play(FadeIn(rf, scale=1.6), FadeIn(vf, scale=1.4), run_time=0.45)
        self.au_mot("à 0,05")
        vp = ax.valeur(0.05, "0,05", COUL_P)
        br = ax.accolade(0.02, 0.05)
        self.play(FadeIn(vp, scale=1.4), GrowFromCenter(br), run_time=0.5)
        self.au_mot("aussi 0,03")
        lab = ax.sur_accolade(br, "0,03", VERT_OK)
        bon = suite(self.t("distance", 40, WHITE, BOLD), self.t("=", 42, WHITE, BOLD),
                    self.t("0,03", 46, VERT_OK, BOLD), buff=0.22).move_to(P(-3.3, -2.3))
        self.play(br.animate.set_color(VERT_OK), FadeIn(lab, scale=1.6), FadeIn(bon, shift=UP * 0.1),
                  run_time=0.5)
        self.insister(VGroup(br, lab), 0.25, DOWN)
        self.au_mot("pas moins 0,03")
        faux = self.t("−0,03", 46, ROUGE_ERREUR, BOLD).move_to(P(1.9, -2.3))
        self.play(FadeIn(faux, scale=1.4), run_time=0.4)
        barre = Line(faux.get_corner(DL) + P(-0.1, -0.05), faux.get_corner(UR) + P(0.1, 0.05),
                     color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(barre), run_time=0.35)
        self.insister(lab, 0.25, DOWN)
        self.attendre_voix()

    # ── 07 : défi : 48 colis abîmés ─────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        gr = Grille(centre=P(3.0, 0.45), pas=0.165)
        n400 = self.t("400 colis", 40, WHITE, BOLD).move_to(P(-3.6, 2.0))
        self.au_mot("Sur 400 colis")
        self.play(LaggedStart(*[FadeIn(c, scale=0.3) for c in gr.cases], lag_ratio=0.002), FadeIn(n400),
                  run_time=1.0)
        self.au_mot("48 abîmés")
        n48 = self.t("48 abîmés", 44, ABIME, BOLD).next_to(n400, DOWN, buff=0.35)
        self.play(LaggedStart(*gr.abimer(ABIMES_48), lag_ratio=0.03), FadeIn(n48, scale=1.4), run_time=1.0)
        self.au_mot("Quelle est la distance")
        q1 = suite(self.t("distance à", 40), self.t("0,05", 44, COUL_P, BOLD), self.t("=", 44),
                   self.t("?", 52, ORANGE_RETENUE, BOLD), buff=0.2).move_to(P(-3.3, -0.3))
        self.play(FadeIn(q1[:2], shift=UP * 0.1), run_time=0.4)
        self.play(FadeIn(q1[2:], scale=1.4), run_time=0.3)
        self.insister(q1[3], 0.25)
        self.au_mot("Est-elle normale")
        q2 = suite(self.t("normale", 44, VERT_OK, BOLD), self.t("?", 52, ORANGE_RETENUE, BOLD), buff=0.15)
        q2.next_to(q1, DOWN, buff=0.5)
        self.play(FadeIn(q2, scale=1.3), run_time=0.4)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        ax = Axe(y=0.45)
        rp = ax.repere(0.05, "p", COUL_P)
        self.add(ax, rp)
        lf = self.t("f", 48, COUL_F, BOLD)
        fr = fraction("48", "400", 46)
        fr[0].set_color(ABIME)
        l1 = suite(lf, self.t("=", 46, WHITE, BOLD), fr, buff=0.22).move_to(P(-4.0, 2.3))
        self.au_mot("48 sur 400")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("0,12")
        res = suite(self.t("=", 46, WHITE, BOLD), self.t("0,12", 50, COUL_F, BOLD), buff=0.22)
        res.next_to(l1, RIGHT, buff=0.22)
        rf, vf = ax.repere(0.12, "f", COUL_F), ax.valeur(0.12, "0,12", COUL_F)
        self.play(FadeIn(res[0]), FadeIn(res[1], scale=1.8), run_time=0.4)
        self.play(FadeIn(rf, scale=1.6), TransformFromCopy(res[1], vf), run_time=0.5)
        self.au_mot("Distance : 0,07")
        br = ax.accolade(0.05, 0.12)
        lab = ax.sur_accolade(br, "0,07", WHITE)
        self.play(GrowFromCenter(br), run_time=0.45)
        self.play(FadeIn(lab, scale=1.6), run_time=0.35)
        self.au_mot("Plus grande que 0,05")
        rg = ax.regle(0.05, 0.05, dy=-1.6)
        pt = ax.pointilles(0.05, rg[0].get_top()[1])
        mg, md = ax.mesure(rg, -1), ax.mesure(rg, 1)
        bande = ax.bande(0.05, 0.05)
        self.play(GrowFromPoint(rg, ax.x(0.05) + DOWN * 1.6), Create(pt), FadeIn(bande), run_time=0.6)
        self.play(FadeIn(mg, scale=1.4), FadeIn(md, scale=1.4), run_time=0.35)
        copie = br.copy()
        self.play(copie.animate.shift(DOWN * (br.get_bottom()[1] - rg[0].get_top()[1] + 0.02)),
                  br.animate.set_color(ROUGE_BANDE), lab.animate.set_color(ROUGE_BANDE), run_time=0.8)
        self.play(copie.animate.set_color(ROUGE_BANDE), rf[0].animate.set_color(ROUGE_BANDE), run_time=0.3)
        cmp = suite(self.t("0,07", 46, ROUGE_BANDE, BOLD), self.t(">", 46, WHITE, BOLD),
                    self.t("0,05", 46, REGLE, BOLD), buff=0.22).move_to(P(-3.6, -2.5))
        self.play(FadeIn(cmp, shift=UP * 0.1), run_time=0.4)
        self.au_mot("ce n'est pas normal")
        non = self.t("pas normal", 46, ROUGE_BANDE, BOLD).move_to(P(1.2, -2.5))
        self.play(FadeIn(non, scale=1.5), Indicate(bande[1], color=ROUGE_BANDE, scale_factor=1.05), run_time=0.5)
        self.insister(non, 0.25)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 40
        items = [
            (suite(self.t("La distance :", fs, JAUNE_TITRE, BOLD), self.t("l'écart entre f et p,", fs), buff=0.18),
             self.t("sans signe", fs, ORANGE_RETENUE, BOLD)),
            (self.t("On la compare à", fs), un_sur_racine("n", 36, REGLE)),
            (suite(self.t("plus petite :", fs), self.t("normal", fs, VERT_OK, BOLD), buff=0.18),
             suite(self.t("plus grande :", fs), self.t("rare", fs, ROUGE_BANDE, BOLD), buff=0.18)),
        ]
        blocs = VGroup()
        for k, (haut, bas) in enumerate(items):
            if k == 1:
                txt = VGroup(haut, bas).arrange(RIGHT, buff=0.3)
            else:
                txt = VGroup(haut, bas).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
            blocs.add(VGroup(self.coche(), txt).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        blocs.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if blocs.width > 11.0:
            blocs.scale_to_fit_width(11.0)
        blocs.move_to(P(-0.8, -0.2))
        for b in blocs:
            b[0].shift(DOWN * 0.12)
        reperes = [("La distance", "sans signe"), ("On la compare", "racine de n"), ("plus petite", "plus grande")]
        for (m1, m2), b in zip(reperes, blocs):
            self.au_mot(m1)
            self.play(FadeIn(b[1][0], shift=RIGHT * 0.2), run_time=0.5)
            self.au_mot(m2)
            self.play(FadeIn(b[1][1], shift=RIGHT * 0.2), Create(b[0]), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 09 : l'écran de fin (règle du 19/10) ────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre : la voix ne parle plus du coach."""
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
        self.ecran_frequence()
        self.ecran_distance()
        self.ecran_comparer()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement()


class ProbaEchDistanceSTMG(ProbaEchDistanceBase):
    identite = "Maths STMG — EleveAI"
