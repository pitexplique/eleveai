# masse_cm1_convertir.py
# EleveAI — Maths CM1 — série « Masses » (CP → CM2), ÉPISODE CM1 03 : convertir des masses
# (micro masse_convertir, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE. Short jumeau (blanche) : film Ti Margo (3 kg de pommes en sachets de 500 g).
# Décor et métier : Margaux, DIÉTÉTICIENNE (elle prépare les menus d'une cantine).
# Mapping micro → écrans : 02 (kg → g : × 1 000 ; 2 kg de pâtes), 03 (g → kg : ÷ 1 000 ; 5 000 g de riz),
# 04 question (3 kg = ? g), 05 (la tonne : 1 t = 1 000 kg ; 2 t de légumes), 06 (le tableau t kg hg dag g),
# 07 question (4 000 g = 40 kg ?), 08 défi (120 g de poisson × 50 élèves), 08b correction, 09 ce que tu as
# appris, 10 fin commune.
# Voix : manim/voix/cm1-masse-convertir.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:convertir:cm1
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_cm1_convertir.py MasseConvertirCM1
# Sortie : manim/sorties/cm1/maths/masse/03-convertir/eleveai-maths-cm1-masse-convertir.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/ (fin_commune)

from masse_commun import *  # noqa: E402,F403
from masse_choisir_unite import MasseChoisirUniteCE2Base, sac_riz  # noqa: E402
from masse_relations import camion_m  # noqa: E402
from masse_cm1_comparer import abr, muet  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["cm1-masse-convertir"]
Q1, Q2 = EP["questions"]
C_G, C_KG, C_T = BLEU_D, VERT_OK, LOURD
C_MUL, C_DIV = "#f59e0b", "#38bdf8"
BLOUSE = "#f8fafc"


def margaux(s=1.0):
    """Margaux, diététicienne : blouse blanche, col vert, une pomme verte brodée sur la poitrine."""
    p = visage(personne(peau="#f1c27d", tenue=BLOUSE, cheveux="#b45309", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    cou = p.tete.get_bottom()
    col_ = Triangle(fill_color="#16a34a", fill_opacity=1, stroke_width=0).scale(r * 0.38).rotate(PI)
    col_.move_to(cou + DOWN * r * 0.4)
    pom = Circle(radius=r * 0.24, fill_color="#22c55e", fill_opacity=1, stroke_color="#166534", stroke_width=2)
    pom.move_to(cou + P(r * 0.7, -r * 1.15))
    queue = Line(pom.get_top(), pom.get_top() + UP * r * 0.16, color="#78350f", stroke_width=3)
    p.add(col_, pom, queue)
    return p


def pates(texte=None, s=1.0):
    """Un paquet de pâtes debout : carton jaune, fenêtre avec des coquillettes, étiquette."""
    corps = RoundedRectangle(width=1.1 * s, height=1.55 * s, corner_radius=0.08 * s, fill_color="#facc15",
                             fill_opacity=1, stroke_color="#a16207", stroke_width=3)
    fen = RoundedRectangle(width=0.7 * s, height=0.55 * s, corner_radius=0.1 * s, fill_color="#fef9c3",
                           fill_opacity=1, stroke_color="#a16207", stroke_width=2)
    fen.move_to(corps.get_center() + UP * 0.3 * s)
    coq = VGroup(*[Arc(radius=0.07 * s, start_angle=a, angle=PI * 1.2, color="#d97706", stroke_width=5 * s)
                   .move_to(fen.get_center() + P(dx * s, dy * s))
                   for a, dx, dy in ((0, -0.2, 0.1), (1, 0.0, -0.08), (2, 0.2, 0.1), (3, -0.08, 0.14), (4, 0.15, -0.12))])
    g = VGroup(corps, fen, coq)
    if texte:
        et = hors_audit(Text(texte, font_size=int(24 * s), color="#7c2d12", weight=BOLD))
        et.move_to(corps.get_center() + DOWN * 0.42 * s)
        g.add(et)
    return g


def carotte(s=1.0):
    """Une carotte couchée, pointe à droite, fanes vertes à gauche."""
    corps = Polygon(P(-0.4, 0.13), P(0.45, 0.0), P(-0.4, -0.13), fill_color="#f97316", fill_opacity=1,
                    stroke_color="#c2410c", stroke_width=2).round_corners(0.05).scale(s, about_point=ORIGIN)
    fanes = VGroup(*[Line(P(-0.4 * s, 0), P((-0.4 - 0.22) * s, a * s), color="#16a34a", stroke_width=5 * s)
                     for a in (0.16, 0.0, -0.16)])
    return VGroup(fanes, corps)


def cagette(s=1.0):
    """Une cagette de légumes : carottes et tomates."""
    bac = Rectangle(width=1.7 * s, height=0.6 * s, fill_color="#d6a35c", fill_opacity=1, stroke_color="#92400e",
                    stroke_width=3)
    lat = VGroup(*[Line(bac.get_left() + P(0, y * s), bac.get_right() + P(0, y * s), color="#92400e",
                        stroke_width=2) for y in (-0.1, 0.1)])
    tom = VGroup(*[Circle(radius=0.17 * s, fill_color="#dc2626", fill_opacity=1, stroke_width=0)
                   .move_to(bac.get_top() + P(x * s, 0.08 * s)) for x in (-0.55, -0.22)])
    car = VGroup(*[carotte(0.75 * s).move_to(bac.get_top() + P(x * s, y * s)) for x, y in ((0.35, 0.12), (0.45, 0.26))])
    return VGroup(tom, car, bac, lat)


def assiette_poisson(s=1.0):
    """Une assiette vue de biais, un filet de poisson dessus."""
    a = Ellipse(width=2.0 * s, height=0.75 * s, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8",
                stroke_width=3)
    b = Ellipse(width=1.4 * s, height=0.48 * s, fill_opacity=0, stroke_color="#cbd5e1", stroke_width=2)
    f = poisson(0.85 * s, "#fb923c", "#fed7aa").move_to(a.get_center() + UP * 0.08 * s)
    return VGroup(a, b, f)


def schema(sc, a="kg", b="g", fs=48, ecart=3.0):
    """Deux unités dans des cadres, une flèche du haut (× 1 000) de a vers b, une du bas (÷ 1 000) de b vers a.
    Rien n'est montré : les morceaux sont rangés dans .ca, .cb, .fh, .lh, .fb, .lb."""
    ca = VGroup(RoundedRectangle(width=1.45, height=1.0, corner_radius=0.15, fill_color="#14532d", fill_opacity=1,
                                 stroke_color=C_KG, stroke_width=3))
    ca.add(sc.t(a, fs, C_KG if a == "kg" else C_T).move_to(ca[0]))
    cb = VGroup(RoundedRectangle(width=1.45, height=1.0, corner_radius=0.15, fill_color="#1e3a8a", fill_opacity=1,
                                 stroke_color=C_G, stroke_width=3))
    cb.add(sc.t(b, fs, C_G if b == "g" else C_KG).move_to(cb[0]))
    cb.move_to(ca.get_center() + RIGHT * ecart)
    fh = CurvedArrow(ca.get_top() + RIGHT * 0.2, cb.get_top() + LEFT * 0.2, angle=-PI / 2.6, color=C_MUL,
                     stroke_width=6)
    lh = hors_audit(sc.t("× 1 000", 40, C_MUL)).next_to(fh, UP, buff=0.12)
    fb = CurvedArrow(cb.get_bottom() + LEFT * 0.2, ca.get_bottom() + RIGHT * 0.2, angle=-PI / 2.6, color=C_DIV,
                     stroke_width=6)
    lb = hors_audit(sc.t("÷ 1 000", 40, C_DIV)).next_to(fb, DOWN, buff=0.12)
    g = VGroup(ca, cb, fh, lh, fb, lb)
    hors_audit(g)
    g.ca, g.cb, g.fh, g.lh, g.fb, g.lb = ca, cb, fh, lh, fb, lb
    return g


class MasseConvertirCM1Base(MasseChoisirUniteCE2Base):
    nom_voix = "cm1-masse-convertir"
    fichier_marques = "masse_cm1_convertir_marques.json"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Convertir des masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Convertir")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        pa = pates(None, 1.0).move_to(P(-3.6, 1.0))
        la = base_commune(self.ligne([("2 kg", C_KG), ("= ? g", C_G)], 54, buff=0.25)).move_to(P(-3.6, -0.6))
        cm = camion_m(0.75).move_to(P(2.9, 1.0))
        lb = base_commune(self.ligne([("3 000 kg", C_KG), ("= ? t", C_T)], 54, buff=0.25)).move_to(P(2.9, -0.6))
        self.au_mot("2 kilogrammes")
        self.play(FadeIn(pa, shift=DOWN * 0.2), FadeIn(la[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("grammes ?")
        self.play(FadeIn(la[1], shift=UP * 0.1), run_time=0.3)
        self.au_t(5.90)
        self.play(FadeIn(cm, shift=RIGHT * 0.3), FadeIn(lb[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("tonnes ?")
        self.play(FadeIn(lb[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Margaux, diététicienne ─────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        X = -2.0
        pm = margaux(1.45).move_to(P(-5.3, -0.2))
        nom = self.t("Margaux", 42, "#22c55e").next_to(pm, UP, buff=0.3)
        self.au_mot("Voici Margaux")
        self.play(FadeIn(pm, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.t("diététicienne", 28, "#22c55e").next_to(pm, DOWN, buff=0.15)
        self.au_mot("diététicienne")
        self.play(FadeIn(met), run_time=0.35)
        l0 = self.t("Elle aide les gens", 38, WHITE)
        l0b = self.t("à bien manger.", 38, WHITE)
        gauche(l0, X, 2.4)
        gauche(l0b, X, 1.65)
        self.au_mot("elle aide")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        pom = pomme(1.0, "#22c55e").move_to(P(-3.55, -0.55))
        self.au_mot("bien manger")
        self.play(FadeIn(l0b, shift=UP * 0.1), FadeIn(pom, scale=1.2), run_time=0.35)
        l1 = self.t("Elle prépare les menus", 36, GRAY_B)
        l1b = self.t("d'une cantine.", 36, GRAY_B)
        gauche(l1, X, 0.4)
        gauche(l1b, X, -0.35)
        self.au_mot("Elle prépare")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("cantine,")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.3)
        l2 = self.t("Les bonnes quantités !", 42, JAUNE_TITRE)
        gauche(l2, X, -1.5)
        self.au_mot("bonnes")
        self.play(FadeIn(l2, scale=1.1), run_time=0.35)
        self.attendre_voix()

    # ── 02 : kg → g, on multiplie par 1 000 ─────────────────────────────────
    def ecran_multiplier(self):
        self.ecran("02-multiplier")
        X = -0.3
        l0 = base_commune(self.ligne([("1 kg", C_KG), ("= 1 000 g", C_G)], 56, buff=0.3))
        gauche(l0, X, 2.4)
        self.morceaux(l0, ("1 kilogramme,", "1 000 grammes."))
        self.insister(l0[1], 1.12, 0.25)
        sch = schema(self).move_to(P(-4.3, 1.1))
        self.au_mot("kilogrammes aux")
        self.play(FadeIn(sch.ca, shift=UP * 0.1), run_time=0.3)
        self.au_mot("grammes, on")
        self.play(FadeIn(sch.cb, shift=UP * 0.1), run_time=0.3)
        l1 = base_commune(self.ligne([("On multiplie", WHITE), ("par 1 000.", C_MUL)], 40, buff=0.2))
        gauche(l1, X, 1.2)
        self.au_mot("multiplie")
        self.play(Create(sch.fh), FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("1 000. 2")
        self.play(FadeIn(sch.lh, scale=1.2), FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        pa = pates("2 kg", 1.25).move_to(P(-4.3, -1.6))
        l2 = base_commune(self.ligne([("2 kg", C_KG), ("de pâtes :", WHITE)], 42, buff=0.22))
        gauche(l2, X, -0.1)
        self.au_mot("2 kilogrammes")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(pa, shift=DOWN * 0.2), run_time=0.35)
        self.morceaux(l2[1:], ("pâtes",))
        l3 = base_commune(self.ligne([("2 ×", WHITE), ("1 000", C_MUL), ("= 2 000 g", C_G)], 44, buff=0.22))
        gauche(l3, X, -1.25)
        self.morceaux(l3, ("2 fois", "1 000, 2", "2 000 grammes."))
        self.insister(l3[2], 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : g → kg, on divise par 1 000 ────────────────────────────────────
    def ecran_diviser(self):
        self.ecran("03-diviser")
        X = -0.3
        sch = schema(self).move_to(P(-4.3, 1.1))
        self.add(sch.ca, sch.cb, sch.fh, sch.lh)
        l0 = self.t("Dans l'autre sens :", 42, JAUNE_TITRE)
        gauche(l0, X, 2.4)
        self.au_mot("Dans")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = base_commune(self.ligne([("On divise", WHITE), ("par 1 000.", C_DIV)], 40, buff=0.2))
        gauche(l1, X, 1.2)
        self.au_mot("divise")
        self.play(Create(sch.fb), FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("1 000. 5")
        self.play(FadeIn(sch.lb, scale=1.2), FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        sr = sac_riz("5 000 g", 1.45).move_to(P(-4.3, -1.75))
        l2 = base_commune(self.ligne([("5 000 g", C_G), ("de riz :", WHITE)], 42, buff=0.22))
        gauche(l2, X, -0.1)
        self.au_mot("5 000 grammes")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(sr, shift=DOWN * 0.2), run_time=0.35)
        self.morceaux(l2[1:], ("riz",))
        l3 = base_commune(self.ligne([("5 000 ÷", WHITE), ("1 000", C_DIV), ("= 5 kg", C_KG)], 44, buff=0.22))
        gauche(l3, X, -1.25)
        self.morceaux(l3, ("5 000 divisé", "1 000, 5", "5 kilogrammes."))
        self.insister(l3[2], 1.12, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (3 kg = ? g) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()

        def avant_q(sc):
            sc._q_mots = {1: "3 kilogrammes ?"}

        self._ph_mots = {(0, 0): "3 fois", (1, 0): "1 000 :", (2, 0): "3 000 grammes."}
        self.question_gauche("04-question", "04b-reponse",
                             ["Combien de grammes", "dans 3 kg ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["3 ×", "1 000", "= 3 000 g."],
                             -0.2,
                             mot_q="Combien", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 05 : la tonne (2 t de légumes) ──────────────────────────────────────
    def ecran_tonne(self):
        self.ecran("05-tonne")
        X = -0.9
        l0 = base_commune(self.ligne([("Pour la tonne :", JAUNE_TITRE), ("pareil !", JAUNE_TITRE)], 44, buff=0.25))
        gauche(l0, X, 2.4)
        self.morceaux(l0, ("Pour la", "pareil"))
        sch = schema(self, "t", "kg", ecart=2.8).scale(0.85).move_to(P(-4.6, 1.15))
        self.au_mot("avec les")
        self.play(FadeIn(VGroup(sch.ca, sch.cb), shift=UP * 0.1), run_time=0.35)
        l1 = base_commune(self.ligne([("1 t", C_T), ("= 1 000 kg", C_KG)], 54, buff=0.3))
        gauche(l1, X, 1.15)
        self.au_mot("1 tonne,")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(sch.fh), run_time=0.4)
        self.au_mot("1 000 kilogrammes.")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(sch.lh, scale=1.2), run_time=0.3)
        self.insister(l1[1], 1.12, 0.25)
        cm = camion_m(1.05, "2 t").move_to(P(-4.4, -1.55))
        cg = cagette(1.0).next_to(cm, UP, buff=0.05).align_to(cm, LEFT).shift(RIGHT * 0.35)
        l2 = base_commune(self.ligne([("La cantine reçoit", WHITE), ("2 t", C_T)], 40, buff=0.22))
        l2b = self.t("de légumes par an :", 40, WHITE)
        gauche(l2, X, -0.05)
        gauche(l2b, X, -0.8)
        self.au_mot("La cantine")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(cm, shift=RIGHT * 0.4), run_time=0.4)
        self.au_mot("2 tonnes")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("légumes")
        self.play(FadeIn(l2b, shift=UP * 0.1), FadeIn(cg, shift=DOWN * 0.2), run_time=0.35)
        l3 = base_commune(self.ligne([("2 t", C_T), ("= 2 000 kg", C_KG)], 50, buff=0.25))
        muet(l3[0])
        gauche(l3, X, -1.9)
        self.au_mot("2 000 kilogrammes.")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.insister(l3[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 06 : le tableau des unités ──────────────────────────────────────────
    def ecran_tableau(self):
        self.ecran("06-tableau")
        l0 = self.t("Le tableau aide aussi :", 42, JAUNE_TITRE)
        gauche(l0, -6.3, 2.7)
        tab = tableau_masses(larg=1.6, h=0.85, fs=36).move_to(P(-1.4, 1.0))
        cases = VGroup(*[tab.cases[c] for c in ("t", "kg", "hg", "dag", "g")])
        self.au_mot("tableau")
        self.play(FadeIn(l0, shift=UP * 0.1), Create(cases), run_time=0.5)
        noms = ("tonne,", "kilogramme,", "hectogramme,", "décagramme,", "gramme. 1")
        for e, mot in zip(tab.entetes, noms):
            self.au_mot(mot)
            self.play(FadeIn(e, scale=1.15), run_time=0.3)
        l1 = base_commune(self.ligne([("1 kg", C_KG), ("= 1 000 g", C_G)], 54, buff=0.3))
        gauche(l1, -6.3, -1.0)
        self.au_mot("1 kilogramme :")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        un = chiffre_dans(tab, "kg", "1", 44, C_KG)
        self.au_mot("1 sous")
        self.play(FadeIn(un, scale=1.4), run_time=0.3)
        self.au_mot("k g")
        self.play(Indicate(tab.entetes[1], color=C_KG, scale_factor=1.12), run_time=0.4)
        zeros = [chiffre_dans(tab, c, "0", 44, WHITE) for c in ("hg", "dag", "g")]
        for z, t_ in zip(zeros, (9.51, 9.95, 10.4)):
            self.au_t(t_)
            self.play(FadeIn(z, scale=1.4), run_time=0.25)
        fl = Arrow(tab.cases["kg"].get_bottom() + DOWN * 0.1, tab.cases["g"].get_bottom() + DOWN * 0.1,
                   buff=0.05, color=C_G, stroke_width=5)
        fl.shift(DOWN * 0.15)
        self.au_mot("1 000 grammes.")
        self.play(FadeIn(l1[1], shift=UP * 0.1), GrowArrow(fl), run_time=0.35)
        self.insister(l1[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (4 000 g = 40 kg ?) ────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()

        def avant_q(sc):
            sc._q_mots = {1: "4 000 grammes,", 2: "40 kilogrammes."}

        self._ph_mots = {(0, 0): "1 000. 4", (1, 0): "4 000 divisé", (2, 0): "1 000 :",
                         (3, 0): "4 kilogrammes."}
        self.question_gauche("07-question", "07b-reponse",
                             ["Un élève écrit :", "4 000 g,", "c'est 40 kg.", "A-t-il raison ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["÷ 1 000.", "4 000 ÷", "1 000", "= 4 kg."],
                             -0.4,
                             mot_q="Un élève", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 08 : le défi (120 g de poisson × 50 élèves) ─────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        X = -2.3
        pm = margaux(1.15).move_to(P(-5.4, 0.7))
        ap = assiette_poisson(1.0).move_to(P(-5.0, -1.4))
        self.au_mot("Margaux prévoit")
        self.play(FadeIn(pm, shift=UP * 0.2), run_time=0.35)
        l0 = base_commune(self.ligne([("120 g", C_G), ("de poisson", WHITE)], 44, buff=0.22))
        gauche(l0, X, 1.9)
        self.au_mot("120 grammes")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("poisson")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(ap, shift=DOWN * 0.2), run_time=0.35)
        l1 = self.t("par élève.", 44, WHITE)
        gauche(l1, X, 1.1)
        self.au_mot("par élève")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = base_commune(self.ligne([("Il y a", WHITE), ("50 élèves.", JAUNE_TITRE)], 44, buff=0.22))
        gauche(l2, X, 0.1)
        self.morceaux(l2, ("Il y a", "50 élèves."))
        l3 = self.t("Combien de kg", 44, JAUNE_TITRE)
        l3b = self.t("commander ?", 44, JAUNE_TITRE)
        gauche(l3, X, -1.0)
        gauche(l3b, X, -1.75)
        self.au_mot("Combien")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("commander")
        self.play(FadeIn(l3b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.3, -2.95)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        X = -2.3
        ap = assiette_poisson(1.45).move_to(P(-4.9, 0.9))
        hors_audit(ap)
        l0 = base_commune(self.ligne([("120 ×", WHITE), ("50", JAUNE_TITRE), ("= 6 000 g", C_G)], 52, buff=0.25))
        gauche(l0, X, 1.6)
        self.au_mot("120 fois")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(ap, shift=DOWN * 0.2), run_time=0.35)
        self.morceaux(l0[1:], ("50 :", "6 000 grammes."))
        l1 = base_commune(self.ligne([("6 000 ÷", WHITE), ("1 000", C_DIV), ("= 6 kg", C_KG)], 52, buff=0.36))
        gauche(l1, X, 0.2)
        self.morceaux(l1, (5.30, "1 000 :", "6 kilogrammes."))
        cad = SurroundingRectangle(l1[2], color=VERT_OK, buff=0.1, stroke_width=5)
        self.play(Create(cad), run_time=0.35)
        l2 = muet(base_commune(self.ligne([("Elle commande", WHITE), ("6 kg", C_KG)], 38, buff=0.2)))
        gauche(l2, X, -1.2)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        sch = schema(self, ecart=2.9).move_to(P(-4.4, 0.0))
        X = -1.3
        l0 = base_commune(self.ligne([("kg vers g :", WHITE), ("× 1 000", C_MUL)], 44, buff=0.3))
        gauche(l0, X, 1.5)
        self.au_mot("kilogrammes aux")
        self.play(FadeIn(VGroup(sch.ca, sch.cb), shift=UP * 0.1), FadeIn(l0[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("multiplie")
        self.play(Create(sch.fh), run_time=0.4)
        self.au_mot("1 000. Des")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(sch.lh, scale=1.2), run_time=0.3)
        l1 = base_commune(self.ligne([("g vers kg :", WHITE), ("÷ 1 000", C_DIV)], 44, buff=0.3))
        gauche(l1, X, 0.3)
        self.au_mot("grammes aux kilogrammes")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("divise")
        self.play(Create(sch.fb), run_time=0.4)
        self.au_mot("1 000. Pareil")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(sch.lb, scale=1.2), run_time=0.3)
        l2 = base_commune(self.ligne([("Pareil :", JAUNE_TITRE), ("t vers kg.", WHITE)], 40, buff=0.25))
        gauche(l2, X, -1.0)
        self.morceaux(l2, ("Pareil", "tonnes"))
        self.attendre_voix(marge=1.8)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_multiplier()
        self.ecran_diviser()
        self.ecran_question1()
        self.ecran_tonne()
        self.ecran_tableau()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="10-abonne")


class MasseConvertirCM1(MasseConvertirCM1Base):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
