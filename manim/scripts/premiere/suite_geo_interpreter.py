# suite_geo_interpreter.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite géométrique :
# interpréter » (16:9), ceinture VERTE. Série SUITES, épisode 16.
# Micro du coach : expo_suite_interpreter (notion expo_suite_terme_general) :
# lib/tutor-v4/questionBank/premiere/maths/suites-geometriques.bank.ts
# + suites-geometriques-renfort.ts (gInterpRang, gInterpQ, gInterpTerme,
# gInterpGlobal, gInterpSeuil ; indice « Que compte l'indice, et que compte la
# valeur ? », « Deux évolutions successives se multiplient. »).
#
# Ce que demande le coach → écran :
#   · le sens de u₀ (valeur de départ) et de q (q − 1 = taux)  → 02-formule, 04-question ;
#   · un terme = une valeur totale, pas un gain (gInterpTerme)  → 03-terme ;
#   · le rang ↔ l'année (gInterpRang)                           → 05-seuil, 07-question ;
#   · le premier rang qui dépasse un seuil (gInterpSeuil)       → 05-seuil, 08 défi ;
#   · l'évolution globale : les coefficients se multiplient
#     (gInterpGlobal ; erreur typique « 20 % + 20 % = 40 % »)   → 06-piege, 08b.
# Clé de voix → écran :
#   00-garde (uₙ = u₀ × qⁿ, chaque lettre interrogée) · 01 Baptiste, chargé de
#   mobilité : la piste cyclable, 50 000 trajets/jour, + 20 % par an, élargir
#   · 02 la formule uₙ = 50 000 × 1,2ⁿ, ses morceaux expliqués · 03 u₃ = 86 400 :
#   la barre de 2029 (total) et sa part gagnée (36 400) · 04/04b question (B :
#   baisse de 3 %) · 05 le seuil 100 000 : u₃ sous la ligne, u₄ au-dessus, 2030 ·
#   06 le piège : × 1,2 × 1,2 = × 1,44 (44 %, pas 40 %), 1,2⁵ ≈ 2,49 · 07/07b
#   question (A : 2033) sur la frise des rangs · 08/08b défi de la piscine
#   (40 000, − 10 %) : 29 160 en 2029, 0,81 → − 19 % · 09 « Ce que tu as appris »
#   · 10 fin.
# Code couleur (module commun) : bleu = termes, orange = raison et taux, vert =
# juste, rouge = piège. ⛔ Pas de LaTeX : Text et MarkupText.
# Voix : manim/voix/premiere-suite-geo-interpreter.json (débit −6), calée mot à
# mot par suite_geo_interpreter_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_geo_interpreter.py SuiteGeoInterpreter1re -o eleveai-maths-premiere-suite-geo-interpreter --media_dir manim/scripts/premiere/media-suite-geo-interpreter
# Sortie : manim/sorties/premiere/maths/suites/16-geo-interpreter/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import GRIS_DROITE, OutilsGraphique, formule  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers, liste_aeree  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12 : calcul sur une ligne de base)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
VELO = [round(50000 * 1.2 ** n) for n in range(6)]
assert VELO[3] == 86400 and abs(1.2 ** 3 - 1.728) < 1e-9 and VELO[3] - VELO[0] == 36400
assert VELO[4] == 103680 > 100000 > VELO[3] and 2026 + 4 == 2030
assert abs(1.2 - 1 - 0.2) < 1e-9 and abs(1.2 ** 2 - 1.44) < 1e-9 and round(1.2 ** 5, 2) == 2.49
assert abs(0.97 - 1 + 0.03) < 1e-9                                                 # question 1 : B
assert 2026 + 7 == 2033                                                             # question 2 : A
PISC = [round(40000 * 0.9 ** n) for n in range(4)]
assert PISC[1:] == [36000, 32400, 29160] and PISC[2] > 30000 > PISC[3] and 2026 + 3 == 2029
assert abs(0.9 ** 2 - 0.81) < 1e-9                                                  # − 19 %

PEAU, CASQUE, GILET = "#8d5524", "#22C55E", "#FACC15"
BITUME, PISTE, EAU = "#374151", "#15803D", "#0EA5E9"


# ── les dessins de l'épisode ────────────────────────────────────────────────

def baptiste(s=1.0):
    """Baptiste, chargé de mobilité : casque de vélo vert, gilet jaune, une carte."""
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    casque = Sector(radius=0.33, angle=PI, start_angle=0, fill_color=CASQUE, fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.2))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#1E3A8A", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    gilet = VGroup(*[Rectangle(width=0.2, height=0.95, fill_color=GILET, fill_opacity=1, stroke_width=0)
                     .move_to(P(x, 0.12)) for x in (-0.25, 0.25)])
    bande = Rectangle(width=0.95, height=0.08, fill_color=GREY_A, fill_opacity=1, stroke_width=0).move_to(P(0, -0.12))
    carte = RoundedRectangle(width=0.5, height=0.42, corner_radius=0.04, fill_color="#DCFCE7", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2).move_to(P(0.7, 0.15))
    trace = VMobject(stroke_color=PISTE, stroke_width=3).set_points_as_corners(
        [P(0.5, 0.0), P(0.62, 0.2), P(0.78, 0.1), P(0.9, 0.3)])
    return VGroup(corps, gilet, bande, tete, casque, carte, trace).scale(s)


def velo(s=1.0, couleur=TERME):
    """Un vélo de profil : deux roues, le cadre, la selle, le guidon."""
    r1 = Circle(radius=0.32, stroke_color=WHITE, stroke_width=4).move_to(P(-0.5, 0))
    r2 = Circle(radius=0.32, stroke_color=WHITE, stroke_width=4).move_to(P(0.5, 0))
    cadre = VMobject(stroke_color=couleur, stroke_width=5).set_points_as_corners(
        [P(-0.5, 0), P(-0.1, 0), P(0.3, 0.42), P(-0.22, 0.42), P(-0.1, 0), P(-0.5, 0)])
    fourche = Line(P(0.5, 0), P(0.3, 0.42), stroke_color=couleur, stroke_width=5)
    selle = Line(P(-0.36, 0.55), P(-0.1, 0.55), stroke_color=WHITE, stroke_width=6)
    tige = Line(P(-0.22, 0.42), P(-0.22, 0.55), stroke_color=WHITE, stroke_width=4)
    guidon = Line(P(0.3, 0.42), P(0.38, 0.6), stroke_color=WHITE, stroke_width=4)
    return VGroup(r1, r2, cadre, fourche, tige, selle, guidon).scale(s)


def route(larg=5.6, piste=0.55):
    """La rue vue de côté : le bitume et la piste cyclable verte (largeur `piste`)."""
    bit = Rectangle(width=larg, height=0.55, fill_color=BITUME, fill_opacity=1, stroke_width=0)
    pst = Rectangle(width=larg, height=piste, fill_color=PISTE, fill_opacity=1, stroke_width=0)
    pst.next_to(bit, UP, buff=0)
    tirets = DashedLine(bit.get_left() + RIGHT * 0.1, bit.get_right() + LEFT * 0.1, color=WHITE, stroke_width=3,
                        dash_length=0.2)
    tirets.move_to(bit)
    return VGroup(bit, pst, tirets)


def piscine(larg=3.6, haut=1.7):
    """La piscine municipale vue de dessus : le bassin, ses lignes d'eau."""
    bord = RoundedRectangle(width=larg + 0.3, height=haut + 0.3, corner_radius=0.12, fill_color="#E2E8F0",
                            fill_opacity=1, stroke_width=0)
    eau = Rectangle(width=larg, height=haut, fill_color=EAU, fill_opacity=1, stroke_width=0)
    lignes = VGroup(*[DashedLine(P(-larg / 2 + 0.1, y), P(larg / 2 - 0.1, y), color="#F87171", stroke_width=3,
                                 dash_length=0.12) for y in np.linspace(-haut / 2, haut / 2, 5)[1:-1]])
    return VGroup(bord, eau, lignes)


def nageur(p, s=1.0):
    """Un nageur vu de dessus : la tête (bonnet orange) et les bras."""
    tete = Circle(radius=0.09, fill_color=RAISON, fill_opacity=1, stroke_width=0).move_to(p)
    bras = Line(p + P(0.05, 0.14), p + P(0.05, -0.14), stroke_color=WHITE, stroke_width=4)
    corps = Line(p + P(0.08, 0), p + P(0.36, 0), stroke_color=WHITE, stroke_width=5)
    return VGroup(corps, bras, tete).scale(s, about_point=p)


def barre(x, y0, h, larg=0.8, couleur=TERME, opac=1.0):
    """Une barre (posée sur y0, de hauteur h)."""
    return Rectangle(width=larg, height=max(h, 0.01), fill_color=couleur, fill_opacity=opac, stroke_width=0
                     ).move_to(P(x, y0 + h / 2))


class SuiteGeoInterpreter1re(AuditMilliers, OutilsEp12, OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_geo_interpreter_marques.json"
    nom_voix = "premiere-suite-geo-interpreter"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"
    k_allumer = 1.06              # les boutons larges de la question 1 restent dans la marge
    XG = -3.3                     # le centre de la colonne de gauche (texte), x ∈ [−6,5 ; −0,1]

    def tg(self, texte, fs=36, color=WHITE, audit=True):
        """Une ligne de la colonne de gauche (au plus 6,4 de large)."""
        return self.t(texte, fs, color, larg=6.4, audit=audit)

    def calc(self, *a, larg=6.4, **k):
        """Le calcul de l'ép. 12, mais borné à la largeur larg (une colonne)."""
        old = self.largeur_texte
        self.largeur_texte = larg
        try:
            return self.calcul(*a, **k)
        finally:
            self.largeur_texte = old

    def fleche(self, a, b, couleur):
        return Arrow(a, b, buff=0.08, color=couleur, stroke_width=5, max_tip_length_to_length_ratio=0.25)

    def boutons_ligne(self, textes, couleurs=None, largeur=3.3, fs=52, y=-1.15, pas=3.6):
        """Trois boutons côte à côte, le même corps de texte (copie de l'ép. 15)."""
        couleurs = couleurs or [WHITE] * 3
        corps = [self.t(c, fs, k, 1e9) for c, k in zip(textes, couleurs)]
        place = largeur - self.place_coche - 0.5 * fs / 32 - 0.45
        f = min(1.0, place / max(c.width for c in corps))
        for c in corps:
            c.scale(f)
        cartes = VGroup(*[self.bouton(L, c, largeur, fs) for L, c in zip("ABC", corps)])
        for c, dx in zip(cartes, (-pas, 0, pas)):
            c.move_to(P(dx, y))
        return cartes

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def formule_garde(self):
        """uₙ = u₀ × qⁿ : un « ? » orange sur chaque morceau qu'on va interpréter."""
        f, parts = self.ligne([("uₙ", TERME), ("=", WHITE), ("u₀", TERME), ("×", WHITE), ("q", RAISON),
                               ("ⁿ", TERME)], 56)
        f.move_to(P(-0.6, -1.2))
        qs = VGroup(*[self.t("?", 36, RAISON).next_to(parts[k], UP, buff=0.14) for k in (2, 4)])
        qs.align_to(qs[0], DOWN)
        self.au_mot("d'une formule")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(q, shift=DOWN * 0.15, scale=1.4) for q in qs], lag_ratio=0.4), run_time=0.6)

    def ecran_garde(self):
        self.garde("Suite géométrique",
                   [("interpréter", "interpréter", TERME),
                    ("Que disent, dans la vraie vie, chaque nombre", "Que disent"),
                    ("et chaque indice d'une formule ?", "et chaque indice")],
                   dessin=self.formule_garde)

    # ── 01 : Baptiste et les pistes cyclables ──────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -4.5
        pers = baptiste(1.05).move_to(P(x, 1.95))
        nom = self.t("Baptiste", 44, JAUNE_TITRE).move_to(P(x, 0.72))
        met = [self.t("chargé de mobilité", 30, TERME), self.t("dans une grande ville", 28, GREY_A)]
        met[0].move_to(P(x, 0.15))
        met[1].move_to(P(x, -0.32))
        self.au_mot("Baptiste")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("chargé de mobilité")
        self.play(FadeIn(met[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("grande ville")
        self.play(FadeIn(met[1], shift=UP * 0.1), run_time=0.35)
        xr = 2.0
        rt = route(5.4).move_to(P(xr, 1.55))
        pst = rt[1]
        velos = VGroup(*[velo(0.42).move_to(pst.get_center() + P(dx, 0.12)) for dx in (-1.6, 0.0, 1.6)])
        lab = self.t("les pistes cyclables", 30, JUSTE).next_to(rt, DOWN, buff=0.2)
        self.au_mot("pistes cyclables")
        self.play(FadeIn(rt, shift=UP * 0.1), FadeIn(lab, shift=UP * 0.1), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(v, shift=RIGHT * 0.4) for v in velos], lag_ratio=0.3), run_time=0.5)
        self.au_mot("En 2026")
        self.calc([("En 2026 :", GREY_A, None), ("50 000", TERME, "50 000"), ("trajets", WHITE, "trajets")],
                  -0.1, centre=xr, fs=36, larg=7.6, avec=[velos.animate.shift(RIGHT * 0.3)])
        self.calc([("à vélo par jour", WHITE, "à vélo")], -0.62, centre=xr, fs=36, larg=7.6)
        self.au_mot("une étude")
        hausse = self.t("+ 20 % chaque année", 42, RAISON)
        fl = Arrow(DOWN * 0.35, UP * 0.35, buff=0, color=RAISON, stroke_width=7, max_tip_length_to_length_ratio=0.35)
        g = VGroup(fl, hausse).arrange(RIGHT, buff=0.25).move_to(P(xr, -1.35))
        self.suivre("20 %")
        v4 = velo(0.42, RAISON).move_to(pst.get_center() + P(-2.45, 0.12))
        self.play(GrowArrow(fl), FadeIn(hausse, shift=UP * 0.1), FadeIn(v4, shift=RIGHT * 0.4), run_time=0.45)
        q1 = self.t("En quelle année les trajets auront-ils doublé ?", 36, JAUNE_TITRE, larg=11.4).move_to(P(-0.5, -2.2))
        self.au_mot("en quelle année")
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("élargir")
        q2 = self.t("Quand élargir les pistes ?", 34, JUSTE).move_to(P(-0.5, -2.85))
        large = Rectangle(width=pst.width, height=0.95, fill_color=PISTE, fill_opacity=1, stroke_width=0)
        large.move_to(pst.get_bottom(), aligned_edge=DOWN)
        self.play(FadeIn(q2, shift=UP * 0.1), Transform(pst, large),
                  VGroup(*velos, v4).animate.shift(UP * 0.2 + RIGHT * 0.2), lab.animate.shift(UP * 0.0), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 02 : la formule, morceau par morceau ───────────────────────────────

    def ecran_formule(self):
        self.nouvel_ecran("02-formule")
        self.calcul([("uₙ :", TERME, "u indice n"), ("le nombre de trajets par jour en", WHITE, "le nombre"),
                     ("2026 + n", WHITE, "2026")], 2.95, centre=0, fs=38)
        self.calcul([("u₀", TERME, "u indice 0"), ("correspond à", WHITE, "correspond"), ("2026", WHITE, "2026")],
                    2.25, centre=0, fs=38)
        f = self.calcul([("uₙ =", TERME, "u indice n égale"), ("50 000", TERME, "50 000"), ("×", WHITE, "fois"),
                         ("1,2", RAISON, "1,2"), ("ⁿ", RAISON, None)], 1.05, centre=0, fs=72)
        cadre = self.encadre(f, GREY_B, 0.25)
        self.play(Create(cadre), run_time=0.35)
        self.au_mot("c'est la valeur")
        b1 = VGroup(self.t("la valeur", 36, TERME), self.t("en 2026", 36, TERME)).arrange(DOWN, buff=0.12)
        b1.move_to(P(-2.6, -0.95))
        f1 = self.fleche(f[1].get_bottom() + DOWN * 0.3, b1.get_top(), TERME)
        self.suivre("2026")
        self.play(GrowArrow(f1), FadeIn(b1, shift=DOWN * 0.1), Indicate(f[1], color=TERME), run_time=0.45)
        self.au_mot("une hausse")
        b2 = VGroup(self.t("une hausse de 20 %", 36, RAISON), self.t("chaque année", 36, RAISON)).arrange(DOWN,
                                                                                                         buff=0.12)
        b2.move_to(P(2.9, -0.95))
        f2 = self.fleche(f[3].get_bottom() + DOWN * 0.3, b2.get_top(), RAISON)
        self.suivre("20 %")
        self.play(GrowArrow(f2), FadeIn(b2, shift=DOWN * 0.1), Indicate(f[3], color=RAISON), run_time=0.45)
        c = self.calcul([("1,2 − 1", RAISON, "1,2 moins"), ("=", WHITE, "égale"), ("0,2", RAISON, "0,2"),
                         ("= 20 %", JUSTE, None)], -2.45, centre=1.6, fs=44)
        self.play(Create(self.encadre(c, JUSTE, 0.14)), run_time=0.35)
        self.attendre_voix(marge=0.5)

    # ── 03 : u₃ = 86 400 : une valeur totale, pas un gain ──────────────────

    def ecran_terme(self):
        self.nouvel_ecran("03-terme")
        self.calcul([("u₃ =", TERME, "u indice 3"), ("50 000 ×", WHITE, "50 000"), ("1,2", RAISON, "1,2"),
                     ("³", RAISON, None)], 2.95, centre=0, fs=46)
        l2 = self.calcul([("=", WHITE, "égale"), ("50 000 ×", WHITE, "50 000"), ("1,728", RAISON, "1,728"),
                          ("=", WHITE, "égale"), ("86 400", JUSTE, "86 400")], 2.15, centre=0.4, fs=46)
        self.play(Create(self.encadre(l2[-1], JUSTE, 0.1)), run_time=0.3)
        y0, k = -2.75, 3.3 / 86400
        x26, x29 = 1.2, 3.0
        b29 = barre(x29, y0, k * VELO[3], 1.1, TERME)
        b26 = barre(x26, y0, k * VELO[0], 1.1, TERME)
        sol = Line(P(0.4, y0), P(3.9, y0), stroke_color=GREY_B, stroke_width=3)
        e29 = self.t("2029", 30, GREY_A).next_to(b29, DOWN, buff=0.12)
        e26 = self.t("2026", 30, GREY_A).next_to(b26, DOWN, buff=0.12)
        v29 = self.t("86 400", 32, JUSTE).next_to(b29, UP, buff=0.12)
        self.au_mot("2029")
        self.calc([("en 2029 :", WHITE, None), ("86 400", JUSTE, "86 400")], 0.95, centre=self.XG, fs=40,
                    avec_morceau={0: [Create(sol), GrowFromEdge(b29, DOWN), FadeIn(e29)], 1: [FadeIn(v29, scale=1.3)]})
        self.calc([("trajets par jour", WHITE, "trajets")], 0.38, centre=self.XG, fs=40)
        self.au_mot("Ce n'est pas")
        pas = self.tg("Ce n'est pas l'augmentation !", 36, PIEGE).move_to(P(self.XG, -0.4))
        self.play(FadeIn(pas, shift=UP * 0.1), run_time=0.35)
        self.au_mot("depuis")
        self.suivre("2026")
        niv = DashedLine(b26.get_corner(UR), P(b29.get_left()[0], b26.get_top()[1]), color=GREY_A, stroke_width=3,
                         dash_length=0.1)
        self.play(GrowFromEdge(b26, DOWN), FadeIn(e26), Create(niv), run_time=0.45)
        gain = Rectangle(width=1.1, height=b29.get_top()[1] - b26.get_top()[1], fill_color=RAISON, fill_opacity=1,
                         stroke_width=0).move_to(b29.get_top(), aligned_edge=UP)
        acc = Brace(gain, RIGHT, buff=0.1, color=RAISON)
        g36 = self.t("+ 36 400", 32, RAISON).next_to(acc, RIGHT, buff=0.1)
        self.calc([("depuis 2026 :", WHITE, None), ("+ 36 400", RAISON, "36 400")], -1.2, centre=self.XG, fs=40,
                  avec_morceau={1: [FadeIn(gain), GrowFromCenter(acc), FadeIn(g36, scale=1.2)]})
        self.calc([("trajets gagnés", RAISON, "trajets")], -1.78, centre=self.XG, fs=40)
        self.bring_to_front(v29)
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 : que veut dire 0,97 ? → B ────────────────

    def ecran_question1(self):
        fs = 34
        corps = [self.t(c, fs, WHITE, 1e9) for c in ("la population augmente de 97 % par an",
                                                     "la population baisse de 3 % par an",
                                                     "la population baisse de 0,97 habitant par an")]
        larg = 12.0
        place = larg - self.place_coche - 0.5 * fs / 32 - 0.45
        f = min(1.0, place / max(c.width for c in corps))
        for c in corps:
            c.scale(f)
        cartes = VGroup(*[self.bouton(L, c, larg, fs) for L, c in zip("ABC", corps)])
        cartes.arrange(DOWN, buff=0.14).move_to(P(0, 0)).align_to(P(0, 0.85), UP)

        def e1():
            self.calcul([("Une ville compte", WHITE, "Une ville"), ("vₙ =", TERME, "v indice n"),
                         ("80 000", WHITE, "80 000"), ("×", WHITE, "fois"), ("0,97", RAISON, "0,97"),
                         ("ⁿ", RAISON, None), ("habitants", WHITE, "habitants")], 2.2, centre=0, fs=36)

        def e2():
            self.calcul([("en 2026 + n.", WHITE, "en 2026"), ("Que veut dire le nombre", WHITE, "Que veut"),
                         ("0,97 ?", RAISON, "0,97")], 1.5, centre=0, fs=36)

        q = self.question_libre("04-question", [e1, e2], cartes, P(-0.4, -2.42))
        self.dire("04b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        c = self.calc([("0,97 − 1", RAISON, "0,97 moins"), ("=", WHITE, "égale"), ("−0,03 :", RAISON, "moins 0,03")],
                      -2.5, centre=-0.6, fs=40, larg=11)
        c2 = self.calc([("une baisse de 3 % chaque année", JUSTE, "une baisse")], -3.1, centre=-0.6, fs=40, larg=11)
        self.play(Create(self.encadre(VGroup(c, c2), JUSTE, 0.12)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : le seuil : quand passe-t-on 100 000 ? ─────────────────────────

    def ecran_seuil(self):
        self.nouvel_ecran("05-seuil")
        xg = -2.95
        self.titre("Quand les trajets auront-ils doublé ?", JAUNE_TITRE, 42, extrait="Quand", y=3.2)
        y0, k = -2.75, 3.3 / 100000
        x3, x4 = 2.25, 4.45
        ys = y0 + k * 100000
        sol = Line(P(1.0, y0), P(5.55, y0), stroke_color=GREY_B, stroke_width=3)
        seuil = DashedLine(P(1.0, ys), P(5.6, ys), color=JUSTE, stroke_width=4, dash_length=0.14)
        ls = self.t("100 000", 30, JUSTE).next_to(seuil, UP, buff=0.12).align_to(seuil, LEFT)
        self.suivre("100 000")
        self.play(Create(sol), Create(seuil), FadeIn(ls, scale=1.2), run_time=0.45)
        self.au_mot("On calcule")
        l1 = self.t("On calcule les termes un à un :", 36, larg=7.0).move_to(P(xg, 2.2))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        b3 = barre(x3, y0, k * VELO[3], 1.95, TERME)
        b4 = barre(x4, y0, k * VELO[4], 1.95, TERME)
        n3 = self.t("u₃", 32, TERME).next_to(b3, DOWN, buff=0.1)
        n4 = self.t("u₄", 32, TERME).next_to(b4, DOWN, buff=0.1)
        v3 = self.t("86 400", 26, WHITE).move_to(b3)
        v4 = self.t("103 680", 26, WHITE).move_to(b4)
        self.calc([("u₃ =", TERME, "u indice 3"), ("86 400", WHITE, "86 400"), (": pas encore", PIEGE, "pas encore")],
                    1.35, centre=xg, fs=38, larg=7.0,
                    avec_morceau={1: [GrowFromEdge(b3, DOWN), FadeIn(n3), FadeIn(v3)]})
        self.bring_to_front(seuil, ls)
        self.play(Indicate(b3, color=PIEGE, scale_factor=1.04), run_time=0.3)
        c4 = self.calc([("u₄ =", TERME, "u indice 4"), ("86 400 × 1,2", WHITE, "86 400"), ("=", WHITE, "égale"),
                          ("103 680", JUSTE, "103 680")], 0.45, centre=xg, fs=36, larg=7.0,
                         avec_morceau={3: [GrowFromEdge(b4, DOWN), FadeIn(n4), FadeIn(v4)]})
        self.bring_to_front(seuil, ls, v4)
        self.au_mot("c'est dépassé")
        dep = self.t("c'est dépassé !", 38, JUSTE, larg=7.0).move_to(P(xg, -0.35))
        self.play(FadeIn(dep, shift=UP * 0.1), b4.animate.set_fill(JUSTE), Flash(P(x4, ys), color=JUSTE), run_time=0.45)
        c1 = self.calc([("Le rang 4", TERME, "Le rang 4")], -1.15, centre=xg, fs=40, larg=7.0)
        c = self.calc([("correspond à", WHITE, "correspond"), ("2030", JUSTE, "2030")], -1.75, centre=xg, fs=40, larg=7.0)
        self.play(Create(self.encadre(VGroup(c1, c), JUSTE, 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège : 20 % + 20 % ne font pas 40 % ───────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège", y=3.2)
        x = -3.2
        y0, h0 = -2.75, 1.25
        xs = [1.0 + 0.78 * k for k in range(6)]
        bars = [barre(xs[k], y0, h0 * 1.2 ** k, 0.56, TERME) for k in range(6)]
        sol = Line(P(0.55, y0), P(5.3, y0), stroke_color=GREY_B, stroke_width=3)
        self.au_mot("Croire")
        l1 = self.calc([("Croire que", WHITE, None), ("+ 20 % par an", RAISON, "20 %")], 2.45, centre=x, fs=36,
                         avec_morceau={1: [Create(sol), *[GrowFromEdge(b, DOWN) for b in bars[:3]]]})
        l2 = self.calc([("fait", WHITE, "fait"), ("+ 40 %", PIEGE, "40 %"), ("en deux ans…", WHITE, "en deux ans")],
                         1.72, centre=x, fs=36)
        y40 = y0 + 1.4 * h0
        n40 = DashedLine(P(xs[0] - 0.35, y40), P(xs[2] + 0.35, y40), color=PIEGE, stroke_width=4, dash_length=0.1)
        self.play(Create(n40), Create(self.barre_lisible(l2)), run_time=0.4)
        c = self.calc([("1,2", RAISON, "1,2 au carré"), ("²", RAISON, None), ("=", WHITE, "égale"),
                         ("1,44", RAISON, "1,44")], 0.9, centre=x, fs=42)
        g44 = self.calc([("hausse globale :", WHITE, "la hausse globale"), ("+ 44 %", JUSTE, "44 %")], 0.15,
                          centre=x, fs=36, avec=[bars[2].animate.set_fill(JUSTE)])
        e44 = self.t("+ 44 %", 30, JUSTE).next_to(bars[2], UP, buff=0.12)
        self.play(FadeIn(e44, scale=1.2), FadeOut(n40), run_time=0.3)
        self.au_mot("en 5 ans")
        y100 = y0 + 2 * h0
        n100 = DashedLine(P(xs[0] - 0.35, y100), P(xs[5] + 0.35, y100), color=PIEGE, stroke_width=4, dash_length=0.1)
        self.calc([("En 5 ans :", WHITE, None), ("pas + 100 %", PIEGE, "100 %")], -0.65, centre=x, fs=36,
                    avec_morceau={0: [FadeOut(e44), bars[2].animate.set_fill(TERME),
                                      *[GrowFromEdge(b, DOWN) for b in bars[3:]]], 1: [Create(n100)]})
        self.calc([("1,2", RAISON, "1,2 puissance"), ("⁵", RAISON, None), ("≈ 2,49", WHITE, "2,49")], -1.4,
                    centre=x, fs=42)
        self.calc([("soit", WHITE, "soit"), ("+ 149 %", JUSTE, "149 %")], -2.15, centre=x, fs=40,
                    avec=[bars[5].animate.set_fill(JUSTE)])
        e149 = self.t("+ 149 %", 30, JUSTE).next_to(bars[5], UP, buff=0.12).shift(LEFT * 0.35)
        self.play(FadeIn(e149, scale=1.2), Indicate(n100, color=PIEGE), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 : u₇ ↔ quelle année ? → A ─────────────────

    def ecran_question2(self):
        X0, PAS, YF = -4.55, 1.3, 0.45
        ticks = VGroup(*[Line(P(X0 + PAS * n, YF - 0.12), P(X0 + PAS * n, YF + 0.12), stroke_width=3, color=GREY_B)
                         for n in range(8)])
        axe = Line(P(X0 - 0.3, YF), P(X0 + 7 * PAS + 0.3, YF), stroke_width=3, color=GREY_B)
        noms = VGroup(*[self.t(u(n), 32, TERME).next_to(ticks[n], DOWN, buff=0.12) for n in (0, 7)])
        an0 = self.t("2026", 32, WHITE).next_to(ticks[0], UP, buff=0.15)
        qm = self.t("?", 40, RAISON).next_to(ticks[7], UP, buff=0.15)

        def e1():
            self.calcul([("u₀", TERME, "u indice 0"), ("correspond à", WHITE, "correspond"), ("2026.", WHITE, "2026")],
                        2.3, centre=0, fs=40,
                        avec_morceau={0: [Create(axe), Create(ticks), FadeIn(noms[0])], 2: [FadeIn(an0, scale=1.2)]})

        def e2():
            self.calcul([("À quelle année correspond", WHITE, "À quelle"), ("u₇ ?", TERME, "u indice 7")], 1.6,
                        centre=0, fs=40, avec_morceau={1: [FadeIn(noms[1]), FadeIn(qm, scale=1.3)]})

        cartes = self.boutons_ligne(["2033", "2032", "2034"], y=-1.1)
        q = self.question_libre("07-question", [e1, e2], cartes, P(0, -2.3))
        self.dire("07b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        self.au_mot("2026 plus")
        bille = Dot(ticks[0].get_center(), radius=0.1, color=RAISON)
        arcs = [ArcBetweenPoints(P(X0 + PAS * n, YF + 0.05), P(X0 + PAS * (n + 1), YF + 0.05), angle=-PI / 2.2)
                for n in range(7)]
        self.add(bille)
        self.play(Succession(*[MoveAlongPath(bille, a, run_time=0.12) for a in arcs]),
                  Indicate(an0, color=RAISON), run_time=0.9)
        c = self.calcul([("2026 + 7", WHITE, "7"), ("=", WHITE, "égale"), ("2033", JUSTE, "2033")], -2.4, centre=0,
                        fs=46)
        a33 = self.t("2033", 32, JUSTE).move_to(qm)
        self.play(ReplacementTransform(qm, a33), bille.animate.set_color(JUSTE), Create(self.encadre(c, JUSTE, 0.14)),
                  run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi de la piscine ─────────────────────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.2)
        pc = piscine(2.5, 1.1).move_to(P(4.55, 2.4))
        c0 = pc[1].get_center()
        nag = VGroup(*[nageur(c0 + P(-1.05 + 0.52 * (k % 4), -0.36 + 0.36 * (k // 4)), 0.8) for k in range(12)])
        xc, L = -0.5, 11.4
        self.au_mot("Une piscine")
        self.calc([("Une piscine accueille", WHITE, None), ("40 000", TERME, "40 000"), ("nageurs en", WHITE, None),
                   ("2026,", WHITE, "2026")], 1.2, centre=xc, fs=34, larg=L,
                  avec_morceau={0: [FadeIn(pc, scale=0.9)], 1: [LaggedStart(*[FadeIn(n, shift=RIGHT * 0.2)
                                                                             for n in nag], lag_ratio=0.1)]})
        self.calc([("et sa fréquentation baisse de", WHITE, "fréquentation"), ("10 % par an.", RAISON, "10 %")],
                  0.58, centre=xc, fs=34, larg=L, avec=[FadeOut(nag[-1], shift=RIGHT * 0.3)])
        self.calc([("uₙ :", TERME, "u indice n"), ("la fréquentation en", WHITE, None), ("2026 + n.", WHITE, "2026")],
                  -0.04, centre=xc, fs=34, larg=L)
        self.calc([("En quelle année passe-t-elle", JAUNE_TITRE, "En quelle année")], -0.75, centre=xc, fs=34, larg=L)
        self.calc([("pour la première fois sous", JAUNE_TITRE, "première fois"), ("30 000", RAISON, "30 000"),
                   ("nageurs ?", JAUNE_TITRE, "nageurs")], -1.32, centre=xc, fs=34, larg=L)
        self.calc([("Quelle est la baisse globale entre", JAUNE_TITRE, "Et quelle"), ("2026", JAUNE_TITRE, "2026"),
                   ("et 2028 ?", JAUNE_TITRE, "et 2028")], -1.95, centre=xc, fs=34, larg=L)
        self.defi_pause(-2.8, x=-0.8)
        self._defi = (tit, [m for m in self.mobjects if m is not tit and m is not self._margo])

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, efface = self._defi
        x = -2.75
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        y0, k = -2.75, 3.2 / 40000
        xs = [1.75 + 0.85 * n for n in range(4)]
        bars = [barre(xs[n], y0, k * PISC[n], 0.62, TERME) for n in range(4)]
        noms = [self.t(u(n), 30, TERME).next_to(bars[n], DOWN, buff=0.1) for n in range(4)]
        sol = Line(P(1.25, y0), P(4.75, y0), stroke_color=GREY_B, stroke_width=3)
        ys = y0 + k * 30000
        self.play(ReplacementTransform(tit, cor), *[FadeOut(m) for m in efface], run_time=0.45)
        self.remove(*efface)
        self.play(Create(sol), GrowFromEdge(bars[0], DOWN), FadeIn(noms[0]), run_time=0.35)
        self.calc([("On multiplie par", WHITE, "On multiplie"), ("0,9", RAISON, "0,9")], 2.35, centre=x, fs=38,
                  larg=7.4)
        for n, y in ((1, 1.7), (2, 1.05)):
            self.calc([(u(n) + " =", TERME, f"u indice {n}"), (fr(PISC[n]), WHITE, fr(PISC[n]))], y, centre=x, fs=38, larg=7.4,
                        avec=[GrowFromEdge(bars[n], DOWN), FadeIn(noms[n])])
        seuil = DashedLine(P(1.4, ys), P(4.75, ys), color=RAISON, stroke_width=4, dash_length=0.12)
        self.calc([("u₃ =", TERME, "u indice 3"), ("29 160", JUSTE, "29 160")], 0.4, centre=x, fs=38, larg=7.4,
                    avec=[GrowFromEdge(bars[3], DOWN), FadeIn(noms[3])])
        ls = self.t("30 000", 28, RAISON).next_to(seuil, RIGHT, buff=0.12)
        self.calc([("c'est sous", WHITE, "c'est sous"), ("30 000,", RAISON, "30 000"), ("en 2029", JUSTE, "2029")],
                  -0.3, centre=x, fs=38, larg=7.4, avec_morceau={1: [Create(seuil), FadeIn(ls)]})
        self.play(bars[3].animate.set_fill(JUSTE), Indicate(noms[3], color=JUSTE), run_time=0.3)
        self.calc([("Entre 2026", WHITE, "Entre 2026"), ("et 2028 :", WHITE, "et 2028")], -1.0, centre=x, fs=38,
                  larg=7.4, avec=[Indicate(VGroup(bars[0], bars[2]), color=RAISON, scale_factor=1.05)])
        self.calc([("0,9", RAISON, "0,9 au carré"), ("²", RAISON, None), ("=", WHITE, "égale"), ("0,81", RAISON, "0,81")],
                  -1.72, centre=x, fs=40, larg=7.4)
        c = self.calc([("une baisse globale de", JUSTE, "baisse globale"), ("19 %", JUSTE, "19 %")], -2.55, centre=x,
                      fs=38, larg=7.4)
        self.play(Create(self.encadre(c, JUSTE, 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 36
        tc = lambda s, d: Text(s, font_size=fs, color=WHITE, t2c=d)  # noqa: E731
        p1 = [tc("Dans uₙ = u₀ × qⁿ, u₀ est la valeur de départ,", {"u₀ est la valeur de départ": TERME}),
              tc("et q − 1 donne le pourcentage d'évolution à chaque étape.", {"q − 1": RAISON})]
        p2 = [tc("Un terme est une valeur totale, pas un gain.", {"valeur totale": JUSTE, "pas un gain": PIEGE})]
        p3 = [tc("Sur plusieurs années, les coefficients se multiplient.", {"se multiplient": RAISON})]
        self.finale([(p1, ["Dans u indice n", "1 donne"]), (p2, ["Un terme"]), (p3, ["sur plusieurs"])],
                    cle="09-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_formule()
        self.ecran_terme()
        self.ecran_question1()
        self.ecran_seuil()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("10-abonne")
