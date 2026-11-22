# masse_cm2_comparer.py
# EleveAI — Maths CM2 — série « Masses » (CP → CM2), ÉPISODE CM2 01 : comparer des masses
# (micro masse_comparer, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau (blanche) : film Ti Margo (deux melons : 1,5 kg contre 1,25 kg).
# Décor et métier : Théa, INGÉNIEURE EN AÉRONAUTIQUE (dans un avion, chaque gramme compte).
# Mapping micro → écrans : 02 (deux pièces : 1,25 kg = 1 250 g > 1 200 g), 03 (le piège de la virgule :
# 1,50 et 1,25), 04 question (1,5 kg ou 1 500 g), 05 (l'avion : 42 t + 8,5 t = 50,5 t), 06 question (la plus
# légère : 2,3 t, 2 350 kg, 2,08 t), 07 défi (trois bagages à ranger), 07b correction, 08 ce que tu as appris,
# 09 fin commune.
# Voix : manim/voix/cm2-masse-comparer.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:comparer:cm2
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_cm2_comparer.py MasseComparerCM2
# Sortie : manim/sorties/cm2/maths/masse/01-comparer/eleveai-maths-cm2-masse-comparer.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/ (fin_commune)

from masse_commun import *  # noqa: E402,F403
from masse_choisir_unite import MasseChoisirUniteCE2Base  # noqa: E402
from masse_cm1_comparer import abr, muet  # noqa: E402
from masse_cm1_estimer import avion  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["cm2-masse-comparer"]
Q1, Q2 = EP["questions"]
C_G, C_KG, C_T = BLEU_D, VERT_OK, LOURD
BLEU_THEA = "#0369a1"
VALISES = ("#7c3aed", "#dc2626", "#0d9488")


def thea(s=1.0):
    """Théa, ingénieure en aéronautique : veste bleue, casque audio, badge avec un petit avion."""
    p = visage(personne(peau="#e0ac69", tenue=BLEU_THEA, cheveux="#3f2a14", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    arceau = Arc(radius=r * 1.12, start_angle=0.1, angle=PI - 0.2, stroke_color="#1f2937",
                 stroke_width=7 * s).move_arc_center_to(c)
    ecout = VGroup(*[RoundedRectangle(width=r * 0.42, height=r * 0.7, corner_radius=r * 0.15, fill_color="#1f2937",
                                      fill_opacity=1, stroke_width=0).move_to(c + RIGHT * k * r * 1.05)
                     for k in (-1, 1)])
    badge = RoundedRectangle(width=r * 0.9, height=r * 0.6, corner_radius=r * 0.08, fill_color=WHITE,
                             fill_opacity=1, stroke_color="#94a3b8", stroke_width=1.5)
    badge.move_to(c + DOWN * r * 2.55 + RIGHT * r * 0.5)
    mini = avion(0.16 * s).move_to(badge)
    p.add(arceau, ecout, badge, mini)
    return p


def piece(s=1.0, couleur="#94a3b8"):
    """Une pièce d'avion : une roue dentée en métal, percée au centre."""
    r = 0.55 * s
    dents = VGroup(*[Rectangle(width=0.2 * s, height=0.22 * s, fill_color=couleur, fill_opacity=1,
                               stroke_color="#475569", stroke_width=2).move_to(P(0, r + 0.06 * s))
                     .rotate(k * TAU / 10, about_point=ORIGIN) for k in range(10)])
    disque = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color="#475569", stroke_width=3)
    trou = Circle(radius=0.2 * s, fill_color="#1e293b", fill_opacity=1, stroke_color="#475569", stroke_width=2)
    vis = VGroup(*[Dot(radius=0.04 * s, color="#475569").move_to(P(0.36 * s * np.cos(a), 0.36 * s * np.sin(a)))
                   for a in (PI / 4, 3 * PI / 4, 5 * PI / 4, 7 * PI / 4)])
    return VGroup(dents, disque, trou, vis)


class MasseComparerCM2Base(MasseChoisirUniteCE2Base):
    nom_voix = "cm2-masse-comparer"
    fichier_marques = "masse_cm2_comparer_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        pa, pb = piece(1.2).move_to(P(-4.0, 0.8)), piece(1.2, "#cbd5e1").move_to(P(0.6, 0.8))
        la = self.t("1,25 kg", 46, C_KG).next_to(pa, DOWN, buff=0.35)
        lb = self.t("1 200 g", 46, C_G).next_to(pb, DOWN, buff=0.35)
        ou = self.t("ou", 38, GRAY_B).move_to(P(-1.7, la.get_center()[1]))
        self.au_mot("1,25")
        self.play(FadeIn(pa, shift=DOWN * 0.2), FadeIn(la, shift=UP * 0.1), run_time=0.35)
        self.au_mot("ou 1 200")
        self.play(FadeIn(ou), run_time=0.2)
        self.au_mot("1 200 grammes")
        self.play(FadeIn(pb, shift=DOWN * 0.2), FadeIn(lb, shift=UP * 0.1), run_time=0.35)
        q = self.t("?", 90, JAUNE_TITRE).move_to(P(-1.7, 0.85))
        self.au_mot("plus lourd")
        self.play(FadeIn(q, scale=1.3), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Théa, ingénieure en aéronautique ───────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        X = -0.6
        pt = thea(1.45).move_to(P(-5.4, -0.3))
        nom = self.t("Théa", 42, "#38bdf8").next_to(pt, UP, buff=0.3)
        self.au_mot("Voici Théa")
        self.play(FadeIn(pt, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        l0 = self.t("Ingénieure", 38, WHITE)
        l0b = self.t("en aéronautique", 38, WHITE)
        gauche(l0, X, 2.5)
        gauche(l0b, X, 1.8)
        self.au_mot("Elle est")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("en aéronautique")
        self.play(FadeIn(l0b, shift=UP * 0.1), run_time=0.35)
        av = avion(1.15).move_to(P(-1.9, -2.1))
        l1 = self.t("Dans un avion,", 36, GRAY_B)
        l1b = self.t("chaque gramme compte !", 38, JAUNE_TITRE)
        gauche(l1, X, 0.75)
        gauche(l1b, X, 0.05)
        self.au_mot("Dans un")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(av, shift=RIGHT * 0.5), run_time=0.4)
        self.au_mot("chaque gramme")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.35)
        l2 = self.t("Plus il est lourd,", 36, WHITE)
        l2b = self.t("plus il consomme !", 36, ORANGE_RETENUE)
        gauche(l2, 0.6, -1.05)
        gauche(l2b, 0.6, -1.75)
        self.au_mot("plus il est")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus il consomme")
        self.play(FadeIn(l2b, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 02 : deux pièces (1,25 kg / 1 200 g) ────────────────────────────────
    def ecran_convertir(self):
        self.ecran("02-convertir")
        X = -0.6
        pa = piece(1.0).move_to(P(-5.2, 1.9))
        pb = piece(1.0, "#cbd5e1").move_to(P(-2.6, 1.9))
        l0 = base_commune(self.ligne([("Une pièce :", WHITE), ("1,25 kg", C_KG)], 42, buff=0.22))
        gauche(l0, X, 2.5)
        self.au_mot("Une pièce")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(pa, shift=DOWN * 0.2), run_time=0.35)
        self.morceaux(l0[1:], ("1,25",))
        l1 = base_commune(self.ligne([("Une autre :", WHITE), ("1 200 g", C_G)], 42, buff=0.22))
        gauche(l1, X, 1.6)
        self.au_mot("Une autre")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(pb, shift=DOWN * 0.2), run_time=0.35)
        self.morceaux(l1[1:], ("1 200 grammes",))
        l2 = self.t("La même unité :", 40, JAUNE_TITRE)
        gauche(l2, X, 0.55)
        self.au_mot("On met")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = base_commune(self.ligne([("1,25 kg", WHITE), ("= 1 250 g", C_G)], 44, buff=0.25))
        gauche(l3, X, -0.4)
        self.morceaux(l3, ("1,25 kilogramme,", "1 250 grammes"))
        self.insister(l3[1], 1.12, 0.25)
        l4 = base_commune(self.ligne([("1 250", WHITE), (">", JAUNE_TITRE), ("1 200", WHITE)], 50, buff=0.32))
        gauche(l4, X, -1.4)
        self.morceaux(l4, (12.90, "plus grand", "1 200."))
        b = Balance(4.2, 0.6, s=0.85).move_to(P(-3.9, -1.55))
        ca, cb = pa.copy(), pb.copy()
        b.poser(ca.scale(0.75), "g")
        b.poser(cb.scale(0.75), "d")
        self.play(FadeIn(b, shift=UP * 0.2), TransformFromCopy(pa, ca), TransformFromCopy(pb, cb), run_time=0.6)
        self.play(Indicate(pa, color=LOURD, scale_factor=1.1), run_time=0.35)
        self.attendre_voix()

    # ── 03 : le piège de la virgule (1,50 et 1,25) ──────────────────────────
    def ecran_virgule(self):
        self.ecran("03-virgule")
        l0 = self.t("Le piège de la virgule !", 44, JAUNE_TITRE)
        gauche(l0, -6.3, 2.6)
        self.au_mot("Le piège")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = base_commune(self.ligne([("1,5 kg", C_KG), ("ou", GRAY_B), ("1,25 kg ?", C_KG)], 46, buff=0.3))
        gauche(l1, -6.3, 1.55)
        self.morceaux(l1, ("1,5", "ou", "1,25 kilogramme ?"))
        l2 = self.t("On écrit :", 38, WHITE)
        gauche(l2, -6.3, 0.45)
        self.au_mot("On écrit")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        fs = 64
        a_ent, a_dec = self.t("1,", fs, WHITE), self.t("50", fs, JAUNE_TITRE)
        b_ent, b_dec = self.t("1,", fs, WHITE), self.t("25", fs, ORANGE_RETENUE)
        a_ent.move_to(P(-2.5, 0.45))
        b_ent.move_to(P(-2.5, -0.65))
        a_dec.next_to(a_ent, RIGHT, buff=0.06).align_to(a_ent, DOWN)
        b_dec.next_to(b_ent, RIGHT, buff=0.06).align_to(b_ent, DOWN)
        z = muet(self.t("0", fs, JAUNE_TITRE)).move_to(a_dec[1])
        for m in (a_ent, a_dec, b_ent, b_dec):
            muet(m)  # « 1,50 » / « 1,25 » montrés à leur mot : le socle attendrait le « 25 » de « 25 centièmes »
        a_dec5 = a_dec[0]
        self.au_mot("1,50")
        self.play(FadeIn(VGroup(a_ent, a_dec5), shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(z, scale=1.4), run_time=0.3)
        self.au_mot("et 1,25")
        self.play(FadeIn(VGroup(b_ent, b_dec), shift=UP * 0.1), run_time=0.3)
        l3 = base_commune(self.ligne([("50 centièmes", JAUNE_TITRE), (">", WHITE), ("25 centièmes", ORANGE_RETENUE)],
                                     38, buff=0.25))
        gauche(l3, -6.3, -1.75)
        self.morceaux(l3, ("50 centièmes", "c'est plus", "25 centièmes"))
        self.play(Indicate(VGroup(a_dec5, z), color=JAUNE_TITRE, scale_factor=1.25),
                  Indicate(b_dec, color=ORANGE_RETENUE, scale_factor=1.25), run_time=0.5)
        l4 = base_commune(self.ligne([("1,5 kg", VERT_OK), ("est le plus lourd !", WHITE)], 40, buff=0.22))
        gauche(l4, -6.3, -2.75)
        b = Balance(3.6, 0.6, s=0.85).move_to(P(2.6, 0.9))
        ca, cb = piece(0.75), piece(0.75, "#cbd5e1")
        b.poser(ca, "g")
        b.poser(cb, "d")
        ea = muet(self.t("1,5 kg", 30, C_KG)).next_to(ca, DOWN, buff=0.6)
        eb = muet(self.t("1,25 kg", 30, C_KG)).next_to(cb, DOWN, buff=0.6)
        fig = hors_audit(VGroup(b, ca, cb, ea, eb))
        self.morceaux(l4, ("1,5 kilogramme est", "est le"))
        self.play(FadeIn(fig, shift=UP * 0.2), run_time=0.4)
        self.insister(l4[0], 1.12, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (1,5 kg ou 1 500 g) ─────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()

        def avant_q(sc):
            sc._q_mots = {0: "1,5 kilogramme", 1: "1 500 grammes :", 2: "lequel"}

        self._ph_mots = {(0, 0): 0.79, (1, 0): "1 500 grammes", (2, 0): "même masse"}
        self.question_gauche("04-question", "04b-reponse",
                             ["1,5 kg", "ou 1 500 g :", "lequel est", "le plus lourd ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["1,5 kg =", "1 500 g :", "même masse."],
                             -0.2,
                             mot_q="1,5 kilogramme", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 05 : avec les tonnes (l'avion : 42 t + 8,5 t) ───────────────────────
    def ecran_tonne(self):
        self.ecran("05-tonne")
        X = -1.3
        l0 = self.t("Avec les tonnes :", 44, JAUNE_TITRE)
        gauche(l0, X, 2.6)
        self.au_mot("Avec les")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        av = avion(1.55).move_to(P(-4.3, 1.2))
        l1 = base_commune(self.ligne([("L'avion vide :", WHITE), ("42 t", C_T)], 42, buff=0.22))
        gauche(l1, X, 1.6)
        self.au_mot("l'avion")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(av, shift=RIGHT * 0.5), run_time=0.4)
        self.morceaux(l1[1:], ("42 tonnes",))
        va = valise(0.55, VALISES[0]).move_to(P(-5.4, -0.8))
        vb = valise(0.55, VALISES[1]).move_to(P(-4.0, -0.8))
        jer = RoundedRectangle(width=0.85, height=1.05, corner_radius=0.1, fill_color="#16a34a", fill_opacity=1,
                               stroke_color="#14532d", stroke_width=3).move_to(P(-2.7, -0.72))
        bouchon = Rectangle(width=0.22, height=0.18, fill_color="#14532d", fill_opacity=1,
                            stroke_width=0).next_to(jer, UP, buff=0).shift(RIGHT * 0.22)
        bag = VGroup(va, vb, jer, bouchon)
        l2 = base_commune(self.ligne([("+", JAUNE_TITRE), ("8 500 kg", C_KG)], 42, buff=0.22))
        l2b = self.t("de bagages et de carburant,", 32, GRAY_B)
        gauche(l2, X, 0.55)
        gauche(l2b, X, -0.15)
        self.au_mot("On ajoute")
        self.play(FadeIn(l2[0], scale=1.3), run_time=0.25)
        self.morceaux(l2[1:], ("8 500 kilogrammes",))
        self.au_mot("de bagages")
        self.play(FadeIn(l2b, shift=UP * 0.1), FadeIn(bag, shift=UP * 0.3), run_time=0.4)
        l3 = base_commune(self.ligne([("soit", WHITE), ("8,5 t.", C_T)], 42, buff=0.22))
        gauche(l3, X, -1.05)
        self.morceaux(l3, ("soit", "8,5 tonnes"))
        self.insister(l3[1], 1.12, 0.25)
        l4 = base_commune(self.ligne([("42", C_T), ("+ 8,5", C_T), ("= 50,5 t", VERT_OK)], 48, buff=0.3))
        gauche(l4, X, -2.15)
        self.morceaux(l4, ("42 plus", 11.64, "50,5"))
        self.insister(l4[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (la plus légère) ────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()

        def avant_q(sc):
            sc._q_mots = {1: "2,3 tonnes,", 2: "2 350 kilogrammes,", 3: "2,08 tonnes ?"}

        self._ph_mots = {(0, 0): "En kilogrammes", (1, 0): "2 300,", (1, 1): 4.26, (2, 0): 5.84,
                         (3, 0): "La plus", (4, 0): "2,08 tonnes."}
        self.question_gauche("06-question", "06b-reponse",
                             ["La plus légère :", "2,3 t,", "2 350 kg,", "ou 2,08 t ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["En kg :", "2 300 ; 2 350 ;", "2 080.", "La plus légère :", "2,08 t."],
                             -0.4, couper={1: ("2 300 ;", "2 350 ;")},
                             mot_q="La plus", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 07 : le défi (trois bagages à ranger) ───────────────────────────────
    def bagages(self, valeurs, mots, y0=2.05):
        X = -4.6
        rangs = VGroup()
        for i, (morceaux_, mot) in enumerate(zip(valeurs, mots)):
            y = y0 - 1.1 * i
            v = hors_audit(valise(0.42, VALISES[i])).move_to(P(-5.6, y))
            l = base_commune(self.ligne(list(morceaux_), 44, buff=0.2))
            gauche(l, X, y)
            for k, (m, mt) in enumerate(zip(l, mot)):
                if mt is not None:
                    self.au_t(mt) if isinstance(mt, (int, float)) else self.au_mot(mt)
                anims = [FadeIn(m, shift=UP * 0.1)] + ([FadeIn(v, shift=DOWN * 0.2)] if k == 0 else [])
                self.play(*anims, run_time=0.3)
            rangs.add(VGroup(v, l))
        return rangs

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.bagages([(("23,5 kg", C_KG),), (("23 050 g", C_G),), (("23,45 kg", C_KG),)],
                     [("23,5",), ("23 050",), ("23,45",)])
        q = self.t("Range-les du plus léger", 40, JAUNE_TITRE)
        q2 = self.t("au plus lourd.", 40, JAUNE_TITRE)
        gauche(q, -6.3, -1.2)
        gauche(q2, -6.3, -1.9)
        self.au_mot("Range-les")
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.3)
        self.au_mot("au plus lourd")
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.3, -2.85)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        eg = self.t("En grammes :", 36, GRAY_B)
        gauche(eg, -6.3, 2.35)
        self.au_mot("En grammes")
        self.play(FadeIn(eg, shift=UP * 0.1), run_time=0.3)
        r = self.bagages([(("23 500 g", C_G),), (("23 050 g", C_G),), (("23 450 g", C_G),)],
                         [("23 500",), (4.16,), (5.92,)], y0=1.45)
        l0 = self.t("Du plus léger au plus lourd :", 38, WHITE)
        gauche(l0, -6.3, -1.75)
        self.au_mot("Du plus")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = base_commune(self.ligne([("23 050 g", VERT_OK), ("< 23,45 kg", VERT_OK), ("< 23,5 kg", VERT_OK)],
                                     40, buff=0.3))
        gauche(l1, -6.3, -2.65)
        self.morceaux(l1, ("23 050 grammes,", "23,45", "23,5 kilogrammes."))
        self.play(Indicate(r[1], color=VERT_OK, scale_factor=1.06), run_time=0.35)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        b = Balance(3.6, 0.6, s=0.8).move_to(P(-4.3, -0.6))
        ca, cb = piece(0.75), piece(0.75, "#cbd5e1")
        b.poser(ca, "g")
        b.poser(cb, "d")
        fig = hors_audit(VGroup(b, ca, cb))
        X = -1.4
        l0 = self.t("Pour comparer :", 36, WHITE)
        l1 = self.t("1. la même unité,", 36, VERT_OK)
        l2 = self.t("2. la virgule bien placée,", 34, JAUNE_TITRE)
        l3 = self.t("3. chiffre par chiffre.", 36, "#38bdf8")
        for l, y in ((l0, 1.8), (l1, 1.0), (l2, 0.2), (l3, -0.6)):
            gauche(l, X, y)
        hors_audit(VGroup(l1[0:2], l2[0:2], l3[0:2]))
        self.au_mot("Pour comparer")
        self.play(FadeIn(fig, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("la même")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("la virgule")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("chiffre par")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        ex = hors_audit(self.t("1,25 kg = 1 250 g > 1 200 g", 30, GRAY_B))
        gauche(ex, X, -1.6)
        self.play(FadeIn(ex, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix(marge=1.8)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_convertir()
        self.ecran_virgule()
        self.ecran_question1()
        self.ecran_tonne()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="09-abonne")


class MasseComparerCM2(MasseComparerCM2Base):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
