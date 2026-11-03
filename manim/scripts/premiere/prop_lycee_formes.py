# prop_lycee_formes.py
# EleveAI — Maths 1re et STMG (automatismes) — série « Proportionnalité »,
# LYCÉE, épisode COMMUN 02 : UNE PROPORTION, TROIS ÉCRITURES (micro du coach :
# auto_prop_formes, notion auto_proportion, en 1re ET en STMG), AVEC VOIX.
# Paysage, CEINTURE JAUNE (le short jumeau : prop_lycee_formes_short.py).
# Deux sous-classes : PropLyceeFormesPremiere (« Maths 1re — EleveAI ») et
# PropLyceeFormesStmg (« Maths STMG — EleveAI ») ; seules l'identité et la
# ceinture changent, et elles ne paraissent QUE sur la garde : on rend la 1re
# en entier, la garde STMG seule (GARDE_SEULE=1), puis on colle.
# ⭐ Méthode travaillée : fraction, décimal, pourcentage = UN SEUL nombre ;
# pourcentage → décimal : ÷ 100 ; décimal → pourcentage : × 100 ; fraction →
# décimal : numérateur ÷ dénominateur. « × » et « ÷ » écrits, virgule.
# ⭐ Le dessin qui porte tout : la GRILLE DE 100 CASES (97 bleu foncé = l'eau
# salée, 3 bleu clair = l'eau douce) ; les trois écritures 3/100 = 0,03 = 3 %
# alignées, reliées par « ÷ 100 » / « × 100 » ; au piège, 0,3 (30 cases) et
# 0,03 (3 cases) face à face.
# ⭐ Fil rouge (erreurs classiques) : le piège 3 % ≠ 0,3 (la virgule d'un seul
# rang) ; question 1 (3 sur 4) A = 34 % et C = 3,4 % (coller les chiffres) ;
# question 2 (8 %) A = 0,8 (= 80 %), C = 8,0 (= 800 %).
#
# Décor et métier : NATURE / SCIENCES, Samuel, HYDROLOGUE : l'eau de la Terre
# (≈ 97 % salée, ≈ 3 % douce), l'eau douce gelée (≈ deux tiers).
# Centres d'intérêt : nature-ecologie, sciences.
# Sources (prompt lycée, 02/11/2026) :
#   · USGS (Water Science School, « Where is Earth's water? ») / ordre de
#     grandeur classique : ≈ 97 % de l'eau de la Terre est salée, ≈ 3 % douce ;
#     ≈ deux tiers (≈ 68,7 %) de l'eau douce dans les glaciers et calottes
#     polaires. Tout est dit « environ ».
#
# Écrans : 00 garde · 01 Samuel, l'eau de la Terre (grille 97 / 3) · 02 trois
# écritures : 3/100 = 0,03 = 3 % · 03 passer de l'une à l'autre (÷ 100, × 100,
# numérateur ÷ dénominateur) · 04 l'eau douce gelée (2 ÷ 3 ≈ 0,67 ≈ 67 %) ·
# 05 QUESTION 1 (3 sur 4) · 06 le piège (0,3 ≠ 0,03) · 07 QUESTION 2 (8 %) ·
# 08 défi (1 sur 8 ; l'intrus de 2 sur 5) · 08b correction · 09 ce que tu as
# appris · 10 fin.
#
# Voix : manim/voix/lycee-prop-formes.json (validée par Frédéric le 02/11,
# débit −10), WAV dans public/sons/lycee-prop-formes/ ; marques mot à mot :
# manim/scripts/premiere/prop_lycee_formes_marques.json (scripts/marques_dump.ps1
# puis le convertisseur à seuil 0,5 s).
# Outils (non modifiés) : prop_commun.py, canvas_proportion.py,
# canvas_fractions.EcritureFraction, la base PropPourcentageCoefficientBase de
# l'épisode 4e 35 (lc, jouer, montre, barrer, barrer_choix, accolade, cadre,
# ligne_rep bornée, titre_haut). Ajouté ICI : samuel(), goutte(), terre_eau(),
# glacier(), Grille100, carte_ecriture(), barre_parts().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_formes.py PropLyceeFormesPremiere
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/premiere/prop_lycee_formes.py PropLyceeFormesPremiere -o eleveai-maths-premiere-prop-formes --media_dir manim/scripts/premiere/media-prop-lycee-formes
# Garde STMG seule : GARDE_SEULE=1 python -m manim render -qh --disable_caching manim/scripts/premiere/prop_lycee_formes.py PropLyceeFormesStmg -o garde-stmg-prop-formes --media_dir manim/scripts/premiere/media-prop-lycee-formes
# Collage : python manim/scripts/cm1/frac_cm_commun.py coller <1re.mp4> <garde-stmg.mp4> <stmg.mp4>
# Sorties : manim/sorties/premiere/maths/proportionnalite/02-formes/eleveai-maths-premiere-prop-formes.mp4
#           manim/sorties/stmg/maths/proportionnalite/02-formes/eleveai-maths-stmg-prop-formes.mp4

import os
import sys
from pathlib import Path
import importlib.util

_ICI = Path(__file__).resolve().parent


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_p35 = _charger("prop_pourcentage_coefficient_4e", _ICI.parents[0] / "4e" / "prop_pourcentage_coefficient.py")
from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, couleurs, personne, P…)

sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

PropPourcentageCoefficientBase = _p35.PropPourcentageCoefficientBase
gras, sans = _p35.gras, _p35.sans

OCEAN = "#1d4ed8"      # l'eau salée (bleu foncé)
OCEAN_T = "#60a5fa"    # le texte « salée » (lisible sur fond noir)
DOUCE = "#38bdf8"      # l'eau douce (bleu clair)
GLACE = "#e0f2fe"      # la glace (blanc bleuté)
CASE_VIDE = "#f8fafc"
TRENTE = "#fb923c"     # les 30 cases de 0,3 (orange : le piège)
TENUE_S = "#0f766e"    # la veste de Samuel (vert d'eau)


def samuel(s=1.0):
    """Samuel, hydrologue : veste vert d'eau, un flacon d'échantillon d'eau."""
    p = personne(peau="#8d5524", tenue=TENUE_S, cheveux="#111827", longs=False)
    c = p.corps.get_center() + P(0.55, -0.1)
    verre = RoundedRectangle(width=0.22, height=0.42, corner_radius=0.06, fill_color=WHITE, fill_opacity=0.25,
                             stroke_color=WHITE, stroke_width=2).move_to(c)
    eau = Rectangle(width=0.18, height=0.22, fill_color=DOUCE, fill_opacity=1, stroke_width=0)
    eau.align_to(verre, DOWN).shift(UP * 0.03).set_x(c[0])
    bouchon = Rectangle(width=0.16, height=0.08, fill_color="#f59e0b", fill_opacity=1, stroke_width=0)
    bouchon.next_to(verre, UP, buff=0)
    p.add(verre, eau, bouchon)
    return p.scale(s)


def goutte(r=0.5, couleur=DOUCE):
    """Une goutte d'eau : un disque et sa pointe."""
    rond = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0)
    pointe = Polygon(P(-r * 0.86, r * 0.5), P(r * 0.86, r * 0.5), P(0, r * 2.1), fill_color=couleur,
                     fill_opacity=1, stroke_width=0)
    reflet = Arc(radius=r * 0.6, start_angle=PI * 0.6, angle=PI * 0.45, color=WHITE, stroke_width=4)
    return VGroup(pointe, rond, reflet)


def terre_eau(r=1.0):
    """La Terre, presque toute bleue : trois continents verts, une calotte blanche."""
    disque = Circle(radius=r, fill_color=OCEAN, fill_opacity=1, stroke_color="#93c5fd", stroke_width=4)
    conts = VGroup(
        Ellipse(width=r * 0.6, height=r * 0.4, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
        .rotate(0.5).move_to(P(-r * 0.35, r * 0.2)),
        Ellipse(width=r * 0.4, height=r * 0.65, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
        .rotate(-0.3).move_to(P(r * 0.35, -r * 0.2)))
    calotte = Ellipse(width=r * 0.9, height=r * 0.25, fill_color=GLACE, fill_opacity=1, stroke_width=0)
    calotte.move_to(P(0, r * 0.85))
    return VGroup(disque, conts, calotte)


def glacier(s=1.0):
    """Une montagne grise et son glacier blanc."""
    mont = Polygon(P(-1.1, -0.6), P(0, 0.75), P(1.1, -0.6), fill_color="#64748b", fill_opacity=1, stroke_width=0)
    neige = Polygon(P(-0.42, 0.24), P(0, 0.75), P(0.42, 0.24), P(0.2, 0.12), P(0, 0.26), P(-0.2, 0.1),
                    fill_color=GLACE, fill_opacity=1, stroke_width=0)
    return VGroup(mont, neige).scale(s)


def calotte_polaire(s=1.0):
    """La calotte polaire : un dôme blanc posé sur la mer."""
    mer = Rectangle(width=2.0, height=0.25, fill_color=OCEAN, fill_opacity=1, stroke_width=0).move_to(P(0, -0.45))
    dome = Ellipse(width=1.7, height=0.9, fill_color=GLACE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.3))
    cache = Rectangle(width=2.0, height=0.5, fill_color=BLACK, fill_opacity=1, stroke_width=0).move_to(P(0, -0.8))
    return VGroup(dome, cache, mer).scale(s)


class Grille100(VGroup):
    """LA GRILLE DE 100 CASES (carte blanche, cases du coach) ; rien n'est
    ajouté à la scène. .cases[i] (lecture : ligne après ligne) · .carte ·
    colorer(idx, couleur) → animations · cases_de(idx) → VGroup."""

    def __init__(self, cote=0.3, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.cases = VGroup(*[Square(cote, fill_color=CASE_VIDE, fill_opacity=1, stroke_color="#0f172a",
                                     stroke_width=1.5).move_to(P((i % 10 - 4.5) * cote, (4.5 - i // 10) * cote))
                              for i in range(100)])
        self.carte = RoundedRectangle(width=10 * cote + 0.3, height=10 * cote + 0.3, corner_radius=0.15,
                                      fill_color=WHITE, fill_opacity=1, stroke_width=0)
        self.add(self.carte, self.cases)
        self.move_to(centre)

    def peindre(self, idx, couleur):
        """Colore tout de suite (sans animation) les cases idx."""
        for i in idx:
            self.cases[i].set_fill(couleur, 1)
        return self

    def colorer(self, idx, couleur):
        return [self.cases[i].animate.set_fill(couleur, 1) for i in idx]

    def cases_de(self, idx):
        return VGroup(*[self.cases[i] for i in idx])


def carte_ecriture(contenu, nom, couleur, fs_nom=24):
    """Une écriture (la fraction, le décimal ou le pourcentage) et son nom
    dessous, en gris (le nom est du décor : sans synchro ni audit)."""
    n = sans(Text(nom, font_size=fs_nom, color=GREY_B))
    n.next_to(contenu, DOWN, buff=0.22)
    return contenu, n


def barre_parts(n, k, largeur=4.0, h=0.6, couleur=DOUCE, vide=CASE_VIDE, centre=ORIGIN):
    """Une barre coupée en n parts égales, les k premières colorées (sans nombre)."""
    lp = largeur / n
    parts = VGroup(*[Rectangle(width=lp, height=h, fill_color=couleur if i < k else vide, fill_opacity=1,
                               stroke_color="#0f172a", stroke_width=3).move_to(P((i - (n - 1) / 2) * lp, 0))
                     for i in range(n)])
    return parts.move_to(centre)


class PropLyceeFormesBase(PropPourcentageCoefficientBase):
    nom_voix = "lycee-prop-formes"
    fichier_marques = "prop_lycee_formes_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"
    XB = -2.7
    XC = 1.3

    def source(self, lignes):
        """La source, discrète, en bas à gauche (lue, jamais dite)."""
        s = VGroup(*[Text(x, font_size=16, color=GREY_B) for x in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.06)
        for x in s:
            x._bloc = True
        s._bloc = True
        return sans(s).to_corner(DL, buff=0.45)

    # ⭐ 03/11 (défauts) : la phrase de réponse des questions-pauses en 34
    # (lisible du fond de la classe), à GAUCHE sous la figure : à droite,
    # sous les cartes, elle butait sur Ti-Margo.
    Y_PH = -1.35

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph2 = VGroup(*[self.t(x, 34, VERT_OK) for x in phrase]).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        if ph2.width > 6.6:
            ph2.scale_to_fit_width(6.6)
        ph2.align_to(P(-6.15, 0), LEFT).align_to(P(0, self.Y_PH), UP)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def ligne_rep(self, i, morceaux, fs=34):
        ref = self.ph_q[i]
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs, buff=0.14)
        return lg.move_to(ref).align_to(ref, LEFT)

    @staticmethod
    def frac(num, den, fs=56, couleur=WHITE):
        return EcritureFraction(num, den, fs=fs, couleur=couleur)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Une proportion, trois écritures", self.identite, self.ceinture,
                                       y_ech=-2.45)
        sans(ident)  # « 1re » : l'identité est du décor (ni synchro, ni audit)
        sans(ech)
        self.au_mot("Une proportion")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        g = goutte(0.75).move_to(P(-3.9, 0.0))
        self.play(FadeIn(g, shift=DOWN * 0.4), run_time=0.6)
        L1 = self.lc([("Fraction,", JAUNE_TITRE), ("décimal,", AMBRE), ("pourcentage :", DOUCE)], 0.45, fs=40,
                     xl=-2.2)
        L2 = self.lc([("le même nombre ?", WHITE)], -0.35, fs=42, xl=-2.2)
        self.jouer(L1, ["Fraction", "décimal", "pourcentage"])
        self.jouer(L2, ["est-ce"])
        self.play(Circumscribe(L2, color=AMBRE, buff=0.1), Indicate(g, color=WHITE), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 : Samuel, hydrologue ; l'eau de la Terre : 97 % salée, 3 % douce ─
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = samuel(1.0).move_to(P(-5.5, -0.6))
        nom = self.t("Samuel", 40, DOUCE).next_to(pers, UP, buff=0.3)
        self.montre("Voici Samuel", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = self.t("hydrologue", 30, DOUCE).next_to(pers, DOWN, buff=0.15)
        self.montre("hydrologue", FadeIn(met, shift=DOWN * 0.1), rt=0.4)
        tr = terre_eau(1.1).move_to(P(-2.3, 0.0))
        self.montre("planète", FadeIn(tr, scale=0.7), rt=0.6)
        gr = Grille100(0.3, centre=P(-2.3, -0.45))
        L1 = self.lc([("Toute l'eau", WHITE), ("de la Terre", WHITE)], 2.5, fs=38, xl=0.6)
        self.jouer(L1, ["Sur toute", "la Terre"],
                   {0: [tr.animate.scale(0.4).move_to(P(-2.3, 1.95))], 1: [FadeIn(gr, scale=0.9)]})
        L2 = self.lc([("≈ 97 %", OCEAN_T), ("salée", WHITE)], 1.45, fs=44, xl=0.6)
        self.au_mot("97 %")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.15),
                  LaggedStart(*gr.colorer(range(97), OCEAN), lag_ratio=0.01), run_time=1.0)
        self.au_mot("salée")
        self.play(FadeIn(L2[1], shift=RIGHT * 0.15), run_time=0.35)
        L2b = self.lc([("dans les océans", GREY_B)], 0.75, fs=34, xl=0.9)
        self.jouer(L2b, ["dans les océans"])
        L3 = self.lc([("≈ 3 %", DOUCE), ("douce", WHITE)], -0.35, fs=44, xl=0.6)
        self.au_mot("3 %")
        self.play(FadeIn(L3[0], shift=RIGHT * 0.15), *gr.colorer(range(97, 100), DOUCE), run_time=0.4)
        self.au_mot("douce")
        self.play(FadeIn(L3[1], shift=RIGHT * 0.15), run_time=0.35)
        self.play(gr.cases_de(range(97, 100)).animate.scale(1.25), L3[0].animate.scale(1.25), run_time=0.3)
        self.play(gr.cases_de(range(97, 100)).animate.scale(1 / 1.25), L3[0].animate.scale(1 / 1.25), run_time=0.3)
        src = self.source(["Source : USGS (ordre de grandeur) : ≈ 97 % de l'eau de la Terre est salée, ≈ 3 % est douce ;",
                           "≈ deux tiers de l'eau douce sont dans les glaciers et les calottes polaires."])
        self.play(FadeIn(src), run_time=0.4)
        self.attendre_voix()

    # ── 02 : trois écritures : 3/100 = 0,03 = 3 % ──────────────────────────
    def ecran_trois(self):
        self.ecran("02-trois")
        gr = Grille100(0.3, centre=P(-4.45, -0.2)).peindre(range(97), OCEAN).peindre(range(97, 100), DOUCE)
        Y = 0.75
        p = gras("3 %", 62, DOUCE).move_to(P(5.0, Y))
        p_, np_ = carte_ecriture(p, "pourcentage", DOUCE)
        self.montre("3 %", FadeIn(gr, shift=RIGHT * 0.2), FadeIn(p, scale=1.4), FadeIn(np_), rt=0.5)
        L1 = self.lc([("3 sur 100", WHITE)], 2.6, fs=44, xl=-1.2)
        self.jouer(L1, ["3 sur 100"], {0: [Indicate(gr.cases_de(range(97, 100)), color=AMBRE, scale_factor=1.6)]})
        f = self.frac(3, 100, 58, JAUNE_TITRE).move_to(P(-1.0, Y))
        f_, nf = carte_ecriture(f, "fraction", JAUNE_TITRE)
        self.montre("En fraction", FadeIn(nf), rt=0.3)
        self.montre(("3 sur 100", 2), FadeIn(f.num, scale=1.3), Create(f.trait), rt=0.2)
        self.montre("100. En nombre", FadeIn(f.den, scale=1.3), rt=0.25)  # le « 100 » à son mot
        d = gras("0,03", 60, AMBRE).move_to(P(1.95, Y))
        d_, nd = carte_ecriture(d, "nombre décimal", AMBRE)
        self.montre("En nombre", FadeIn(nd), rt=0.3)
        self.montre("0,03", FadeIn(d, scale=1.3), rt=0.45)
        self.insister(d, 1.25, 0.2)
        e1 = gras("=", 60, WHITE).move_to(P(0.4, Y))
        e2 = gras("=", 60, WHITE).move_to(P(3.5, Y))
        self.montre("Trois écritures", FadeIn(e1, scale=1.4), FadeIn(e2, scale=1.4), rt=0.45)
        rang = VGroup(f, d, p, nf, nd, np_)
        br = Brace(rang, DOWN, buff=0.15, color=VERT_OK)
        tb = self.t("un seul nombre", 40, VERT_OK).next_to(br, DOWN, buff=0.12)
        self.montre("un seul", GrowFromCenter(br), FadeIn(tb, shift=UP * 0.15), rt=0.5)
        self.play(Circumscribe(VGroup(f, e1, d, e2, p), color=VERT_OK, buff=0.15), run_time=0.8)
        self.attendre_voix()

    # ── 03 : passer d'une écriture à l'autre : ÷ 100, × 100, num ÷ dén ─────
    @staticmethod
    def boite(x, y, nom, couleur, l=2.6, h=1.15):
        b = RoundedRectangle(width=l, height=h, corner_radius=0.15, stroke_color=couleur, stroke_width=4,
                             fill_color="#0f172a", fill_opacity=1).move_to(P(x, y))
        n = sans(Text(nom, font_size=26, color=couleur)).next_to(b, UP, buff=0.12)
        return b, n

    def ecran_passer(self):
        self.ecran("03-passer")
        self.titre_haut("D'une écriture à l'autre", "Pour passer")
        Y = 0.95
        bp, npc = self.boite(-3.4, Y, "pourcentage", DOUCE)
        bd, nd = self.boite(2.0, Y, "décimal", AMBRE)
        self.montre("d'un pourcentage", FadeIn(bp, shift=RIGHT * 0.2), FadeIn(npc), rt=0.4)
        self.montre("au décimal", FadeIn(bd, shift=LEFT * 0.2), FadeIn(nd), rt=0.4)
        fh = Arrow(bp.get_right() + UP * 0.28, bd.get_left() + UP * 0.28, buff=0.12, color=VERT_OK, stroke_width=7,
                   max_tip_length_to_length_ratio=0.12)
        th = gras("÷ 100", 40, VERT_OK).next_to(fh, UP, buff=0.1)
        self.montre("on divise", GrowArrow(fh), rt=0.4)
        self.montre("100 : 97", FadeIn(th, scale=1.4), rt=0.35)  # au « 100 » lui-même
        v1 = gras("97 %", 50, DOUCE).move_to(bp)
        v2 = gras("0,97", 50, AMBRE).move_to(bd)
        self.montre("97 %", FadeIn(v1, scale=1.3), rt=0.35)
        self.montre("0,97", FadeIn(v2, scale=1.3), Indicate(th, color=VERT_OK), rt=0.45)
        self.insister(v2, 1.2, 0.2)
        fb = Arrow(bd.get_left() + DOWN * 0.28, bp.get_right() + DOWN * 0.28, buff=0.12, color=ORANGE_RETENUE,
                   stroke_width=7, max_tip_length_to_length_ratio=0.12)
        tb = gras("× 100", 40, ORANGE_RETENUE).next_to(fb, DOWN, buff=0.1)
        self.montre("Pour revenir", GrowArrow(fb), rt=0.4)
        self.montre("100. Et", FadeIn(tb, scale=1.4), rt=0.35)
        Yf = -1.7
        bf, nf = self.boite(-3.4, Yf, "fraction", JAUNE_TITRE, l=3.2, h=1.35)
        nf.next_to(bf, LEFT, buff=0.2)
        f = EcritureFraction("numérateur", "dénominateur", fs=28, couleur=JAUNE_TITRE).move_to(bf)
        self.montre("Et une fraction", FadeIn(bf, shift=UP * 0.2), FadeIn(nf), Create(f.trait), rt=0.45)
        fl = Arrow(bf.get_right(), P(-0.95, Yf), buff=0.12, color=AMBRE, stroke_width=7,
                   max_tip_length_to_length_ratio=0.2)
        L = self.lc([("numérateur", JAUNE_TITRE), ("÷", AMBRE), ("dénominateur", JAUNE_TITRE)], Yf, fs=36, xl=-0.75,
                    droite=5.1)
        self.montre("On divise", GrowArrow(fl), rt=0.35)
        self.montre("numérateur", FadeIn(f.num, shift=DOWN * 0.1), FadeIn(L[0], shift=RIGHT * 0.15),
                    FadeIn(L[1]), rt=0.4)
        self.montre("dénominateur", FadeIn(f.den, shift=UP * 0.1), FadeIn(L[2], shift=RIGHT * 0.15), rt=0.4)
        self.play(Circumscribe(L, color=AMBRE, buff=0.12), run_time=0.7)
        self.attendre_voix()

    # ── 04 : l'eau douce gelée : les deux tiers ; 2 ÷ 3 ≈ 0,67 ≈ 67 % ──────
    def ecran_glace(self):
        self.ecran("04-glace")
        gr = Grille100(0.12, centre=P(-5.6, 2.55)).peindre(range(97), OCEAN).peindre(range(97, 100), DOUCE)
        b = barre_parts(3, 0, largeur=5.4, h=0.8, centre=P(-2.7, 0.75))
        for p in b:
            p.set_fill(DOUCE, 1)
        a, t = self.accolade(b, "l'eau douce", DOUCE, fs=30)
        loupe = DashedLine(gr.cases_de(range(97, 100)).get_right() + RIGHT * 0.1, t.get_left() + LEFT * 0.1, color=DOUCE)
        self.montre("cette eau douce", FadeIn(gr), Indicate(gr.cases_de(range(97, 100)), color=AMBRE),
                    FadeIn(b, shift=UP * 0.2), GrowFromCenter(a), FadeIn(t), Create(loupe), rt=0.6)
        xl = 1.2
        L1 = self.lc([("Environ", WHITE), ("les deux tiers", AMBRE)], 2.3, fs=40, xl=xl)
        self.jouer(L1, ["Environ", "les deux tiers"])
        self.au_mot("sont gelés")
        self.play(b[0].animate.set_fill(GLACE, 1), b[1].animate.set_fill(GLACE, 1), run_time=0.5)
        ag, tg = self.accolade(VGroup(b[0], b[1]), "gelée", GLACE, DOWN, fs=30)
        L2 = self.lc([("sont gelés", GLACE)], 1.6, fs=40, xl=xl)
        self.play(FadeIn(L2, shift=RIGHT * 0.15), GrowFromCenter(ag), FadeIn(tg), run_time=0.4)
        gl = glacier(0.75).move_to(P(-4.4, -1.75))
        cp = calotte_polaire(0.85).move_to(P(-1.6, -1.85))
        self.montre("glaciers", FadeIn(gl, shift=UP * 0.2), rt=0.4)
        self.montre("calottes", FadeIn(cp, shift=UP * 0.2), rt=0.4)
        L3 = self.lc([("2 ÷ 3", WHITE), ("≈ 0,67", AMBRE)], 0.6, fs=46, xl=xl)
        f23 = self.frac(2, 3, 34, GLACE).next_to(tg, RIGHT, buff=0.3)
        self.jouer(VGroup(L3[0]), ["2 divisé"], {0: [FadeIn(f23.num, scale=1.3), Create(f23.trait)]})
        self.montre("3, égale", FadeIn(f23.den, scale=1.3), rt=0.2)  # 2/3 au « 2 », au « 3 » (plus 5 s après)
        self.jouer(VGroup(L3[1]), ["0,67"])
        L4 = self.lc([("soit ≈", WHITE), ("67 %", VERT_OK)], -0.3, fs=46, xl=xl)
        self.jouer(L4, ["soit environ", "67 %"])
        self.play(Create(self.cadre(L4[1])), run_time=0.3)
        self.insister(L4[1], 1.2, 0.2)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (3 sur 4 en pourcentage → 75 %) ─────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b4 = barre_parts(4, 3, largeur=4.0, h=0.7, centre=P(-3.7, 1.75))

        def avant(sc):
            sc.play(FadeIn(b4, shift=UP * 0.2), run_time=0.4)

        def apres(sc):
            gr = Grille100(0.17, centre=P(-3.7, -0.1))
            l0 = sc.ligne_rep(0, ["3 ÷ 4 =", "0,75 ;"])
            l0b = sc.ligne_rep(1, ["× 100 :", "75 %."])
            l1 = sc.ligne_rep(2, ["A, C :", "chiffres collés."])
            sc.montre("3 divisé", FadeIn(l0[0], shift=UP * 0.15), Indicate(b4, color=AMBRE), rt=0.4)
            sc.montre("0,75", FadeIn(l0[1], scale=1.3), rt=0.35)
            sc.montre("Fois 100", FadeIn(l0b[0], shift=UP * 0.15), FadeIn(gr, scale=0.9), rt=0.4)
            sc.au_mot("75 %")
            sc.play(FadeIn(l0b[1], scale=1.3), LaggedStart(*gr.colorer(range(75), DOUCE), lag_ratio=0.01),
                    run_time=0.8)
            sc.montre("A et C", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(0)),
                      Create(sc.barrer_choix(2)), rt=0.45)
            sc.montre("les chiffres", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Comment s'écrit 3 sur 4", "en pourcentage ?"],
                            [self.t("34 %", 36), self.t("75 %", 36), self.t("3,4 %", 36)], 1,
                            ["3 ÷ 4 = 0,75 ;", "× 100 : 75 %.", "A, C : chiffres collés."],
                            mot_q="Comment", avant_q=avant, autres_r=apres)

    # ── 06 : le piège : 3 % ≠ 0,3 ; 0,3 = 30 % ; 3 % = 0,03 ─────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        xl = 0.6
        L1 = self.lc([("3 %", DOUCE), ("≠", ROUGE_ERREUR), ("0,3", TRENTE)], 2.2, fs=48, xl=xl + 0.6)
        self.jouer(L1, ["3 %, ce", "n'est pas", "0,3"])
        self.insister(L1[1], 1.3, 0.2)
        g30 = Grille100(0.24, centre=P(-4.55, 0.4))
        g3 = Grille100(0.24, centre=P(-1.5, 0.4))
        e30 = gras("30 %", 34, TRENTE).next_to(g30, DOWN, buff=0.2)
        e3 = gras("3 %", 34, DOUCE).next_to(g3, DOWN, buff=0.2)
        L2 = self.lc([("0,3 =", TRENTE), ("30 sur 100", WHITE)], 1.2, fs=40, xl=xl)
        self.au_mot("0,3", 2)
        self.play(FadeIn(L2[0], shift=RIGHT * 0.15), FadeIn(g30, scale=0.9), run_time=0.4)
        self.au_mot("30 sur")
        self.play(FadeIn(L2[1], shift=RIGHT * 0.15), LaggedStart(*g30.colorer(range(30), TRENTE), lag_ratio=0.02),
                  run_time=0.7)
        L3 = self.lc([("= 30 %", TRENTE)], 0.5, fs=40, xl=xl + 0.85)
        self.jouer(L3, ["donc 30"], {0: [FadeIn(e30, scale=1.3)]})
        L4 = self.lc([("3 % =", DOUCE), ("0,03", AMBRE)], -0.35, fs=40, xl=xl)
        # la virgule recule de deux rangs : 3, → 0,03 (le « 3, » posé au « 3 % » qui le dit)
        Yv, xs = -2.45, (-4.4, -3.6, -2.8)
        trois = gras("3", 54, AMBRE).move_to(P(xs[2], Yv))
        vg = gras(",", 54, AMBRE).move_to(P(xs[2] + 0.4, Yv - 0.15))
        self.au_mot("3 %", 2)
        self.play(FadeIn(L4[0], shift=RIGHT * 0.15), FadeIn(g3, scale=0.9), *g3.colorer(range(3), DOUCE),
                  FadeIn(e3, scale=1.3), FadeIn(trois), FadeIn(vg), run_time=0.45)
        self.au_mot("0,03")
        self.play(FadeIn(L4[1], scale=1.3), run_time=0.35)
        L5 = self.lc([("dix fois moins !", VERT_OK)], -1.1, fs=40, xl=xl)
        self.jouer(L5, ["dix fois"], {0: [Indicate(g30.cases_de(range(30)), color=TRENTE, scale_factor=1.05),
                                          Indicate(g3.cases_de(range(3)), color=AMBRE, scale_factor=1.6)]})
        z0 = sans(gras("0", 54, WHITE)).move_to(P(xs[0], Yv))
        z1 = sans(gras("0", 54, WHITE)).move_to(P(xs[1], Yv))
        dv = gras("÷ 100", 36, VERT_OK).move_to(P(-5.75, Yv))
        self.montre("Diviser par 100", FadeIn(dv, shift=RIGHT * 0.15), rt=0.4)
        arcs = VGroup(*[ArcBetweenPoints(P(x0 + 0.4, Yv + 0.5), P(x0 - 0.4, Yv + 0.5), angle=-PI * 0.7,
                                         color=VERT_OK, stroke_width=5) for x0 in (xs[2], xs[1])])
        self.au_mot("décaler")
        self.play(Create(arcs[0]), vg.animate.move_to(P(xs[1] + 0.4, Yv - 0.15)), run_time=0.45)
        self.play(Create(arcs[1]), vg.animate.move_to(P(xs[0] + 0.4, Yv - 0.15)), run_time=0.45)
        rg = self.t("deux rangs", 30, VERT_OK).next_to(arcs, RIGHT, buff=0.3).shift(RIGHT * 0.6 + UP * 0.1)
        z1.move_to(P(xs[1] - 0.1, Yv))  # 0,03 serré : 0 , 0 3
        self.montre("deux rangs", FadeIn(z0), FadeIn(z1), FadeIn(rg, shift=LEFT * 0.15),
                    trois.animate.move_to(P(xs[1] + 0.42, Yv)), vg.animate.move_to(P(xs[0] + 0.35, Yv - 0.15)), rt=0.4)
        self.play(Circumscribe(VGroup(z0, z1, trois, vg), color=AMBRE, buff=0.12), run_time=0.7)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (8 % en décimal → 0,08) ─────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = goutte(0.5).move_to(P(-3.7, 2.0))

        def avant(sc):
            sc.play(FadeIn(g, shift=DOWN * 0.3), run_time=0.4)

        def apres(sc):
            gr = Grille100(0.17, centre=P(-3.7, -0.1))
            l0 = sc.ligne_rep(0, ["8 ÷ 100 =", "0,08."])
            l1 = sc.ligne_rep(1, ["A : 80 % ;", "C : 800 %."])
            sc.montre("8 divisé", FadeIn(l0[0], shift=UP * 0.15), FadeIn(gr, scale=0.9), rt=0.4)
            sc.montre("0,08", FadeIn(l0[1], scale=1.3), *gr.colorer(range(8), DOUCE), rt=0.45)
            sc.montre("A, c'est", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.4)
            sc.montre("800", FadeIn(l1[1], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.4)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Comment s'écrit 8 %", "en nombre décimal ?"],
                            [self.t("0,8", 36), self.t("0,08", 36), self.t("8,0", 36)], 1,
                            ["8 ÷ 100 = 0,08.", "A : 80 % ; C : 800 %."],
                            mot_q="Comment", avant_q=avant, autres_r=apres)

    # ── 08 : défi : 1 sur 8 en décimal et en % ; l'intrus de 2 sur 5 ───────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        b8 = barre_parts(8, 1, largeur=4.4, h=0.65, couleur=AMBRE, centre=P(-3.75, 1.75))
        b5 = barre_parts(5, 2, largeur=4.4, h=0.65, couleur=VERT_OK, centre=P(-3.75, -0.3))
        xl = 0.4
        L1 = self.lc([("Un :", AMBRE), ("1 sur 8", WHITE)], 2.05, fs=42, xl=xl)
        self.jouer(L1, ["Un :", "1 sur 8"], {1: [FadeIn(b8, shift=UP * 0.2)]})
        L2 = self.lc([("en décimal ?", AMBRE), ("en % ?", DOUCE)], 1.35, fs=40, xl=xl + 0.5)
        self.jouer(L2, ["décimal", "pourcentage"])
        # 03/11 : sur deux lignes (sur une seule, elle était réduite à ~28)
        L3 = self.lc([("Deux :", AMBRE), ("l'intrus de", WHITE)], 0.35, fs=42, xl=xl)
        L3b = self.lc([("2 sur 5 ?", WHITE)], -0.35, fs=42, xl=xl + 1.45)
        self.jouer(VGroup(L3[0], L3[1], L3b[0]), ["Deux", "laquelle", "2 sur 5"], {2: [FadeIn(b5, shift=UP * 0.2)]})
        cartes = VGroup()
        for s, x, mot in (("0,4", 1.2, "0,4"), ("40 %", 3.1, "40 %"), ("2,5 %", 5.0, "2,5 %")):
            t = gras(s, 34, WHITE)
            c = RoundedRectangle(width=1.75, height=0.85, corner_radius=0.12, stroke_color=GREY_B, stroke_width=3,
                                 fill_color="#0f172a", fill_opacity=1).move_to(P(x, -1.2))
            t.move_to(c)
            cartes.add(VGroup(c, t))
            self.montre(mot, FadeIn(c), FadeIn(t, scale=1.3), rt=0.35)
        self.pause_defi(y=-2.2)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        b8 = barre_parts(8, 1, largeur=4.4, h=0.65, couleur=AMBRE, centre=P(-3.75, 1.75))
        b5 = barre_parts(5, 2, largeur=4.4, h=0.65, couleur=VERT_OK, centre=P(-3.75, -0.3))
        xl = 0.6
        L1 = self.lc([("1 ÷ 8 =", WHITE), ("0,125", AMBRE)], 2.05, fs=44, xl=xl)
        self.au_mot("Un")
        self.play(Write(tit), FadeIn(b8, shift=UP * 0.2), run_time=0.5)
        self.jouer(L1, ["1 divisé", "0,125"])
        a8, t8 = self.accolade(b8[0], "12,5 %", AMBRE, DOWN, fs=30)
        L2 = self.lc([("soit", WHITE), ("12,5 %", VERT_OK)], 1.3, fs=44, xl=xl + 1.2)
        self.jouer(L2, ["soit 12", None], {1: [GrowFromCenter(a8), FadeIn(t8, scale=1.3)]})
        self.play(Create(self.cadre(L2[1])), run_time=0.3)
        L3 = self.lc([("2 ÷ 5 =", WHITE), ("0,4", AMBRE)], 0.0, fs=44, xl=xl)
        self.jouer(L3, ["2 divisé", "0,4"], {0: [FadeIn(b5, shift=UP * 0.2)]})
        a5, t5 = self.accolade(VGroup(b5[0], b5[1]), "40 %", VERT_OK, DOWN, fs=30)
        L4 = self.lc([("soit", WHITE), ("40 %", VERT_OK)], -0.75, fs=44, xl=xl + 1.2)
        self.jouer(L4, ["soit 40", None], {1: [GrowFromCenter(a5), FadeIn(t5, scale=1.3)]})
        self.play(Create(self.cadre(L4[1])), run_time=0.3)
        cartes = VGroup()
        for s, x in (("0,4", -5.15), ("40 %", -3.25), ("2,5 %", -1.35)):
            t = sans(gras(s, 32, WHITE)) if s != "2,5 %" else gras(s, 32, WHITE)
            c = RoundedRectangle(width=1.75, height=0.8, corner_radius=0.12, stroke_color=GREY_B, stroke_width=3,
                                 fill_color="#0f172a", fill_opacity=1).move_to(P(x, -2.35))
            cartes.add(VGroup(c, t.move_to(c)))
        self.au_mot("L'intrus")
        self.play(FadeIn(cartes[0]), FadeIn(cartes[1]), cartes[0][0].animate.set_stroke(VERT_OK, 5),
                  cartes[1][0].animate.set_stroke(VERT_OK, 5), run_time=0.4)
        intrus = sans(self.t("l'intrus", 30, ROUGE_ERREUR)).next_to(cartes[2], RIGHT, buff=0.25)
        self.au_mot("2,5 %", 2)  # la 1re fois est dans « 12,5 % »
        self.play(FadeIn(cartes[2], scale=1.2), run_time=0.35)
        self.play(cartes[2][0].animate.set_stroke(ROUGE_ERREUR, 6), cartes[2][1].animate.set_color(ROUGE_ERREUR),
                  Create(self.barrer(cartes[2][1])), FadeIn(intrus, shift=LEFT * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        gr = Grille100(0.28, centre=P(-4.2, 0.0)).peindre(range(97), OCEAN).peindre(range(97, 100), DOUCE)
        self.add(gr)
        lignes = self.finale_colonne(figure=gr, textes=[
            ("Une proportion s'écrit en fraction,", "en décimal ou en pourcentage."),
            ("Du pourcentage au décimal :", "on divise par 100."),
            ("3 % = 0,03,", "pas 0,3.")], fs=36)
        self.au_mot("Une proportion")
        self.montrer_ligne(lignes[0], Indicate(gr, color=VERT_OK, scale_factor=1.03))
        self.au_mot("Du pourcentage")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et 3 %")
        self.montrer_ligne(lignes[2], Indicate(gr.cases_de(range(97, 100)), color=AMBRE, scale_factor=1.6))
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_trois, self.ecran_passer, self.ecran_glace,
                  self.ecran_question1, self.ecran_piege, self.ecran_question2, self.ecran_defi,
                  self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde STMG seule (voir l'en-tête)
            ecrans[0]()
            return
        for e in ecrans:
            e()
        self.page_abonnement("10-abonne")


class PropLyceeFormesPremiere(PropLyceeFormesBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"


class PropLyceeFormesStmg(PropLyceeFormesBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
