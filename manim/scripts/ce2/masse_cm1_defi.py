# masse_cm1_defi.py
# EleveAI — Maths CM1 — série « Masses » (CP → CM2), ÉPISODE CM1 05 : le défi des masses
# (micro masse_defi, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau (blanche) : film Ti Margo (l'ascenseur de 300 kg et le piano).
# Décor et métier : Alice, CHEFFE DE CHANTIER (elle fait monter les sacs de ciment avec un monte-charge).
# Mapping micro → écrans : 02 (la limite : 1 t = 1 000 kg ; un sac = 25 kg), 03 (1 000 ÷ 25 = 40 sacs),
# 04 question (30 sacs de 25 kg = 750 kg), 05 étapes (+ ouvrier 80 kg + brouette 20 kg = 850 kg),
# 06 question (+ 8 sacs = 1 050 kg : non), 07 défi (3 t de carrelage en paquets de 20 kg), 07b correction
# (3 000 ÷ 20 = 150 paquets, 3 voyages de 50), 08 ce que tu as appris, 09 fin commune.
# Voix : manim/voix/cm1-masse-defi.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:defi:cm1
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_cm1_defi.py MasseDefiCM1
# Sortie : manim/sorties/cm1/maths/masse/05-defi/eleveai-maths-cm1-masse-defi.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/ (fin_commune)

from masse_commun import *  # noqa: E402,F403
from masse_choisir_unite import MasseChoisirUniteCE2Base  # noqa: E402
from masse_cm1_comparer import abr, muet  # noqa: E402
from masse_probleme import coche  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["cm1-masse-defi"]
Q1, Q2 = EP["questions"]
C_G, C_KG, C_T = BLEU_D, VERT_OK, LOURD
CIMENT = "#9ca3af"
CARRELAGE = "#c2410c"
JAUNE_CASQUE = "#facc15"
ROUGE_X = "#ef4444"


def casque(p, couleur=JAUNE_CASQUE):
    """Un casque de chantier sur la tête du personnage p."""
    c, r = p.tete.get_center(), p.tete.width / 2
    calotte = AnnularSector(inner_radius=0, outer_radius=r * 1.02, angle=PI, start_angle=0, fill_color=couleur,
                            fill_opacity=1, stroke_color="#a16207", stroke_width=2).move_to(c + UP * r * 0.62)
    bord = RoundedRectangle(width=r * 2.5, height=r * 0.2, corner_radius=r * 0.08, fill_color=couleur,
                            fill_opacity=1, stroke_color="#a16207", stroke_width=2).move_to(c + UP * r * 0.18)
    crete = Line(c + UP * r * 0.25, c + UP * r * 1.12, color="#a16207", stroke_width=3)
    return VGroup(calotte, bord, crete)


def gilet(p):
    """Deux bandes réfléchissantes sur le gilet."""
    co = p.corps
    b, h = co.get_bottom()[1], co.get_top()[1]
    x0, x1 = co.get_left()[0], co.get_right()[0]
    out = VGroup()
    for f in (0.3, 0.6):
        y = b + (h - b) * f
        lg = (x1 - x0) * (0.86 - f * 0.2)
        out.add(Line(P(co.get_center()[0] - lg / 2, y), P(co.get_center()[0] + lg / 2, y), color="#fef08a",
                     stroke_width=6 * p.tete.width))
    return out


def alice(s=1.0):
    """Alice, cheffe de chantier : gilet orange à bandes, casque jaune."""
    p = visage(personne(peau="#8d5524", tenue="#f97316", cheveux="#111827", longs=True, s=s))
    p.add(gilet(p), casque(p))
    return p


def ouvrier(s=1.0):
    """Un ouvrier : bleu de travail, casque orange."""
    p = visage(personne(peau="#c68642", tenue="#2563eb", cheveux="#3f2a14", s=s))
    p.add(casque(p, "#fb923c"))
    return p


def brouette(s=1.0):
    """Une brouette verte, roue à droite, poignées à gauche."""
    bac = Polygon(P(-0.6 * s, 0.25 * s), P(0.55 * s, 0.25 * s), P(0.35 * s, -0.2 * s), P(-0.4 * s, -0.2 * s),
                  fill_color="#16a34a", fill_opacity=1, stroke_color="#14532d", stroke_width=2)
    roue = Circle(radius=0.17 * s, fill_color="#1f2937", fill_opacity=1, stroke_color="#9ca3af",
                  stroke_width=2).move_to(P(0.45 * s, -0.38 * s))
    bras = Line(P(-1.0 * s, 0.05 * s), P(0.45 * s, -0.38 * s), color="#78350f", stroke_width=5 * s)
    pied = Line(P(-0.35 * s, -0.2 * s), P(-0.4 * s, -0.5 * s), color="#78350f", stroke_width=5 * s)
    return VGroup(bras, pied, bac, roue)


def sac_ciment(texte=None, s=1.0):
    return sac(texte, s, CIMENT)


def paquet_carrelage(texte=None, s=1.0):
    return paquet(texte, s, CARRELAGE)


def monte_charge(s=1.0, L=2.0, H=1.3, pancarte=None):
    """Un monte-charge : deux rails, une poutre, une poulie, un câble, une cabine grillagée (.cabine).
    pancarte : texte (« 1 t max ») sur une plaque blanche au-dessus de la poutre (.pancarte)."""
    rx = L / 2 + 0.12
    haut = H / 2 + 1.0
    rails = VGroup(*[Rectangle(width=0.14, height=haut + H / 2 + 0.15, fill_color="#64748b", fill_opacity=1,
                               stroke_width=0).move_to(P(u * rx, (haut - H / 2 - 0.15) / 2)) for u in (-1, 1)])
    poutre = Rectangle(width=L + 0.6, height=0.16, fill_color="#475569", fill_opacity=1, stroke_width=0)
    poutre.move_to(P(0, haut))
    poulie = Circle(radius=0.14, fill_color="#1f2937", fill_opacity=1, stroke_color="#cbd5e1",
                    stroke_width=2).move_to(P(0, haut - 0.18))
    cable = Line(P(0, haut - 0.32), P(0, H / 2), color="#cbd5e1", stroke_width=2)
    cab = Rectangle(width=L, height=H, fill_color="#1e293b", fill_opacity=1, stroke_color=JAUNE_CASQUE,
                    stroke_width=4)
    sol = Line(P(-L / 2 - 0.5, -H / 2 - 0.15), P(L / 2 + 0.5, -H / 2 - 0.15), color="#a8a29e", stroke_width=4)
    g = VGroup(rails, poutre, poulie, cable, cab, sol)
    g.cabine = cab
    g.pancarte = None
    if pancarte:
        t = hors_audit(Text(pancarte, font_size=30, color=ROUGE_X, weight=BOLD))
        fond = RoundedRectangle(width=t.width + 0.35, height=t.height + 0.25, corner_radius=0.08, fill_color="#f8fafc",
                                fill_opacity=1, stroke_color=ROUGE_X, stroke_width=3).move_to(P(0, haut + 0.4))
        pc = VGroup(fond, t.move_to(fond))
        g.add(pc)
        g.pancarte = pc
    return g.scale(s)


def pile_carrelage(s=1.0):
    """Une pile de 6 paquets de carrelage (3, 2, 1)."""
    rangs = []
    for n in (3, 2, 1):
        rangs.append(VGroup(*[paquet_carrelage(None, s) for _ in range(n)]).arrange(RIGHT, buff=0.06 * s))
    return VGroup(*rangs).arrange(UP, buff=0.04 * s)


class MasseDefiCM1Base(MasseChoisirUniteCE2Base):
    nom_voix = "cm1-masse-defi"
    fichier_marques = "masse_cm1_defi_marques.json"
    ceinture = "bleue"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le défi des masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("défi")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        mc = monte_charge(1.05, 2.0, 1.3).move_to(P(-4.4, 0.3))
        sacs = VGroup(*[sac_ciment(None, 0.42) for _ in range(4)]).arrange(RIGHT, buff=0.04)
        sacs.move_to(mc.cabine).align_to(mc.cabine, DOWN).shift(UP * 0.12)
        self.au_mot("Le monte-charge")
        self.play(FadeIn(mc, shift=UP * 0.3), FadeIn(sacs), run_time=0.45)
        l1 = base_commune(self.ligne([("1 t", C_T), ("au plus", WHITE)], 54, buff=0.3))
        l1.move_to(P(1.6, 0.9))
        self.morceaux(l1, (3.45, "au plus"))
        l2 = self.t("Combien de sacs ?", 46, JAUNE_TITRE).move_to(P(1.6, -0.35))
        self.au_mot("Combien")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Alice, cheffe de chantier ──────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        X = -2.6
        pe = alice(1.45).move_to(P(-4.85, -0.2))
        nom = self.t("Alice", 42, "#fb923c").next_to(pe, UP, buff=0.35)
        self.au_mot("Voici Alice")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.t("cheffe de chantier", 28, "#fb923c").next_to(pe, DOWN, buff=0.15)
        self.au_mot("cheffe")
        self.play(FadeIn(met), run_time=0.35)
        l0 = self.t("Elle monte les sacs", 38, WHITE)
        gauche(l0, X, 2.3)
        l1 = self.t("de ciment au 3e étage,", 38, WHITE)
        muet(l1)
        gauche(l1, X, 1.5)
        l2 = self.t("avec un monte-charge.", 38, GRAY_B)
        gauche(l2, X, 0.7)
        sc_ = sac_ciment("25 kg", 1.25).move_to(P(-1.2, -1.2))
        self.au_mot("monter")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("ciment au")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(sc_, shift=DOWN * 0.2), run_time=0.35)
        mc = monte_charge(1.0, 2.0, 1.3).move_to(P(3.4, -1.25))
        self.au_mot("avec un")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(mc, shift=LEFT * 0.3), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la limite (1 t = 1 000 kg ; un sac = 25 kg) ────────────────────
    def ecran_limite(self):
        self.ecran("02-limite")
        tit = self.t("La limite", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.4)
        mc = monte_charge(1.25, 2.0, 1.4, pancarte="1 t max").move_to(P(-4.7, -0.3))
        self.au_mot("Le monte-charge")
        self.play(FadeIn(mc, shift=UP * 0.3), run_time=0.4)
        X = -1.9
        l1 = base_commune(self.ligne([("Au plus :", WHITE), ("1 t", C_T), ("= 1 000 kg", C_KG)], 46, buff=0.28))
        gauche(l1, X, 1.4)
        self.morceaux(l1, ("au plus", "1 tonne", "1 000 kilogrammes"))
        self.insister(l1[2], 1.12, 0.25)
        sc_ = sac_ciment("25 kg", 1.3).move_to(P(0.0, -1.55))
        l2 = base_commune(self.ligne([("Un sac de ciment :", WHITE), ("25 kg", C_KG)], 42, buff=0.25))
        gauche(l2, X, 0.2)
        self.au_mot("Un sac")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(sc_, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("25 kilogrammes")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 03 : 1 000 ÷ 25 = 40 sacs à la fois ─────────────────────────────────
    def ecran_diviser(self):
        self.ecran("03-diviser")
        tit = self.t("Combien de sacs à la fois ?", 44, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.4)
        l1 = base_commune(self.ligne([("1 000", C_KG), ("÷", WHITE), ("25", C_KG), ("= 40", JAUNE_TITRE)], 56,
                                     buff=0.3))
        l1.move_to(P(0, 1.85))
        self.morceaux(l1, ("1 000", "divisé", "25", "40."))
        self.insister(l1[3], 1.15, 0.25)
        mc = monte_charge(1.0, 3.7, 2.05).move_to(P(-3.0, -1.0))
        grille = VGroup(*[sac_ciment(None, 0.26) for _ in range(40)]).arrange_in_grid(4, 10, buff=0.04)
        grille.move_to(mc.cabine)
        l2 = base_commune(self.ligne([("40 sacs", JAUNE_TITRE), ("à la fois", WHITE)], 44, buff=0.25))
        gauche(l2, 0.9, -0.6)
        self.au_mot("Le monte-charge")
        self.play(FadeIn(mc, shift=UP * 0.2), run_time=0.35)
        self.au_mot("40 sacs")
        self.play(LaggedStart(*[FadeIn(g_, scale=0.6) for g_ in grille], lag_ratio=0.03), FadeIn(l2[0]),
                  run_time=0.8)
        self.au_mot("à la")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (30 sacs de 25 kg = 750 kg) ─────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        sc_ = sac_ciment("25 kg", 1.3).move_to(P(-5.4, 1.95))

        def avant_q(sc):
            sc.play(FadeIn(sc_, shift=DOWN * 0.2), run_time=0.2)

        self._ph_mots = {(0, 0): "30 fois", (1, 0): "750 kilogrammes", (2, 0): "moins que", (3, 0): "ça passe"}
        self.question_gauche("04-question", "04b-reponse",
                             ["Alice charge", "30 sacs de 25 kg.", "Quelle masse ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["30 × 25", "= 750 kg.", "Moins que 1 t :", "ça passe !"],
                             -0.2, mot_q="Alice charge", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 05 : étape par étape (+ ouvrier + brouette = 850 kg) ────────────────
    def ecran_etapes(self):
        self.ecran("05-etapes")
        tit = self.t("Étape par étape", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.4)
        mc = monte_charge(1.0, 3.5, 2.1, pancarte="1 t max").move_to(P(-4.3, -0.35))
        cab = mc.cabine
        sc_ = muet(sac_ciment("750 kg", 1.15))
        sc_.move_to(cab).align_to(cab, LEFT).align_to(cab, DOWN).shift(P(0.12, 0.08))
        self.play(FadeIn(mc, shift=UP * 0.2), FadeIn(sc_), run_time=0.4)
        X = -1.4
        ou = ouvrier(0.5)
        ou.move_to(cab).align_to(cab, DOWN).shift(P(0.05, 0.08))
        l1 = base_commune(self.ligne([("Un ouvrier :", WHITE), ("80 kg", C_KG)], 40, buff=0.25))
        gauche(l1, X, 1.8)
        self.au_mot("ouvrier")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(ou, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("80 kilogrammes")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        br = brouette(0.72)
        br.move_to(cab).align_to(cab, RIGHT).align_to(cab, DOWN).shift(P(-0.1, 0.08))
        l2 = base_commune(self.ligne([("Sa brouette :", WHITE), ("20 kg", C_KG)], 40, buff=0.25))
        gauche(l2, X, 0.95)
        self.au_mot("brouette")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(br, shift=LEFT * 0.2), run_time=0.35)
        self.au_mot("20 kilogrammes")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = base_commune(self.ligne([("750 +", WHITE), ("80 +", WHITE), ("20", WHITE), ("= 850 kg", JAUNE_TITRE)],
                                     46, buff=0.25))
        gauche(l3, X, -0.3)
        self.morceaux(l3, ("750 plus", "80 plus", "20 :", "850"))
        self.insister(l3[3], 1.12, 0.25)
        l4 = base_commune(self.ligne([("850 kg <", WHITE), ("1 000 kg", C_KG)], 42, buff=0.25))
        muet(l4[0])
        gauche(l4, X, -1.4)
        ok = coche(1.1).next_to(l4, RIGHT, buff=0.35)
        self.au_mot("Toujours")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 000 !")
        self.play(FadeIn(l4[1], shift=UP * 0.1), Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (+ 8 sacs : 1 050 kg, non) ──────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        sc_ = sac_ciment("25 kg", 1.3).move_to(P(-5.4, 1.95))

        def avant_q(sc):
            sc.play(FadeIn(sc_, shift=DOWN * 0.2), run_time=0.2)

        self._ph_mots = {(0, 0): "8 fois", (1, 0): "850 plus", (2, 0): "1 050", (3, 0): "plus que", (4, 0): "Non"}
        self.question_gauche("06-question", "06b-reponse",
                             ["Peut-elle encore", "ajouter 8 sacs", "de 25 kg ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["8 × 25 = 200 kg", "850 + 200", "= 1 050 kg,", "plus que 1 t.", "Non !"],
                             -0.2, mot_q="Peut-elle", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 07 : le défi (3 t de carrelage en paquets de 20 kg) ─────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        pile = pile_carrelage(1.15).move_to(P(-4.6, 0.3))
        X = -1.6
        l1 = base_commune(self.ligne([("3 t", C_T), ("de carrelage", WHITE)], 42, buff=0.25))
        gauche(l1, X, 2.0)
        self.au_mot("3 tonnes")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(pile, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("carrelage")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = base_commune(self.ligne([("en paquets de", WHITE), ("20 kg", C_KG)], 42, buff=0.25))
        gauche(l2, X, 1.1)
        et = hors_audit(self.t("20 kg", 30, C_KG)).next_to(pile, DOWN, buff=0.25)
        self.au_mot("paquets")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("20 kilogrammes")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(et), run_time=0.3)
        l3 = base_commune(self.ligne([("Le monte-charge :", WHITE), ("1 t", C_T)], 42, buff=0.25))
        gauche(l3, X, 0.2)
        self.morceaux(l3, ("Le monte-charge", 7.85))
        q1 = self.t("Combien de paquets ?", 40, JAUNE_TITRE)
        gauche(q1, X, -0.85)
        q2 = self.t("Combien de voyages ?", 40, JAUNE_TITRE)
        gauche(q2, X, -1.65)
        self.au_mot("Combien de paquets")
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("combien de voyages")
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.0, -3.2)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        X = -6.2
        l1 = base_commune(self.ligne([("3 t", C_T), ("= 3 000 kg", C_KG)], 44, buff=0.25))
        gauche(l1, X, 2.0)
        self.morceaux(l1, ("3 tonnes", "3 000 kilogrammes"))
        l2 = base_commune(self.ligne([("3 000", C_KG), ("÷ 20", WHITE), ("= 150 paquets", JAUNE_TITRE)], 44,
                                     buff=0.25))
        gauche(l2, X, 0.95)
        self.morceaux(l2, (5.06, "divisé", "150 paquets"))
        self.insister(l2[2], 1.1, 0.25)
        l3 = base_commune(self.ligne([("1 t", C_T), ("par voyage :", WHITE)], 44, buff=0.25))
        gauche(l3, X, -0.1)
        self.morceaux(l3, ("1 tonne", "par voyage"))
        l4 = base_commune(self.ligne([("3 voyages", JAUNE_TITRE), ("de 50 paquets", WHITE)], 44, buff=0.25))
        gauche(l4, X, -1.15)
        cabs = VGroup(*[monte_charge(0.55, 1.7, 1.25) for _ in range(3)]).arrange(RIGHT, buff=0.02)
        cabs.move_to(P(4.35, -0.3))
        pqs = VGroup()
        for c_ in cabs:
            pq = paquet_carrelage("50", 1.05).move_to(c_.cabine)
            pqs.add(pq)
        self.au_mot("3 voyages")
        self.play(FadeIn(l4[0], shift=UP * 0.1), LaggedStart(*[FadeIn(c_, shift=UP * 0.2) for c_ in cabs],
                                                             lag_ratio=0.25), run_time=0.6)
        self.au_mot("de 50")
        self.play(FadeIn(l4[1], shift=UP * 0.1), LaggedStart(*[FadeIn(p_, scale=1.2) for p_ in pqs],
                                                             lag_ratio=0.2), run_time=0.5)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        l0 = self.t("Dans un défi à étapes :", 42, WHITE)
        gauche(l0, -5.6, 1.9)
        self.au_mot("Dans un")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        lignes = []
        for i, (txt, y, mot) in enumerate((("on convertit d'abord,", 0.85, "convertit"),
                                           ("on calcule étape par étape,", -0.2, "calcule"),
                                           ("puis on vérifie.", -1.25, "puis on"))):
            l_ = base_commune(self.ligne([(f"{i + 1}.", JAUNE_TITRE), (txt, WHITE)], 40, buff=0.22))
            hors_audit(l_[0])
            gauche(l_, -5.2, y)
            lignes.append(l_)
            self.au_mot(mot)
            self.play(FadeIn(l_, shift=UP * 0.1), run_time=0.35)
        ok = coche(1.0).next_to(lignes[2], RIGHT, buff=0.4)
        self.play(Create(ok), run_time=0.35)
        self.attendre_voix(marge=1.8)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_limite()
        self.ecran_diviser()
        self.ecran_question1()
        self.ecran_etapes()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="09-abonne")


class MasseDefiCM1(MasseDefiCM1Base):
    identite = "Maths CM1 — EleveAI"
    ceinture = "bleue"
