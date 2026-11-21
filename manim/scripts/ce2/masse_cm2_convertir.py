# masse_cm2_convertir.py
# EleveAI — Maths CM2 — série « Masses » (CP → CM2), ÉPISODE CM2 02 : convertir des masses
# (micro masse_convertir, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE. Short jumeau (blanche) : film Ti Margo (0,5 kg de farine, le copain verse 5 g).
# Décor et métier : Mathis, MARÉCHAL-FERRANT (il fabrique et pose les fers des chevaux).
# Mapping micro → écrans : 02 (le tableau kg hg dag g : × 10 par colonne, kg → g : × 1 000), 03 (0,75 kg placé
# dans le tableau : 750 g), 04 question (1,2 kg = ? g), 05 (g → kg : ÷ 1 000 ; 4 fers de 750 g = 3 kg),
# 06 question (250 g = 2,5 kg ?), 07 (le milligramme : 500 mg = 0,5 g), 08 défi (24 fers de 750 g),
# 08b correction, 09 ce que tu as appris, 10 fin commune.
# Voix : manim/voix/cm2-masse-convertir.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:convertir:cm2
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_cm2_convertir.py MasseConvertirCM2
# Sortie : manim/sorties/cm2/maths/masse/02-convertir/eleveai-maths-cm2-masse-convertir.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/ (fin_commune)

from masse_commun import *  # noqa: E402,F403
from masse_choisir_unite import MasseChoisirUniteCE2Base  # noqa: E402
from masse_cm1_comparer import abr, muet  # noqa: E402
from masse_cm1_convertir import schema  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["cm2-masse-convertir"]
Q1, Q2 = EP["questions"]
C_G, C_KG, C_MG = BLEU_D, VERT_OK, "#e879f9"
C_MUL, C_DIV = "#f59e0b", "#38bdf8"
CUIR = "#7c2d12"
FER = "#9ca3af"


def mathis(s=1.0):
    """Mathis, maréchal-ferrant : chemise bleue, grand tablier de cuir, un marteau à la main."""
    p = visage(personne(peau="#c68642", tenue="#1d4ed8", cheveux="#1f2937", longs=False, s=s))
    r = p.tete.width / 2
    cou = p.tete.get_bottom()
    tab = Polygon(cou + P(-r * 0.75, -r * 0.55), cou + P(r * 0.75, -r * 0.55), cou + P(r * 1.0, -r * 3.3),
                  cou + P(-r * 1.0, -r * 3.3), fill_color=CUIR, fill_opacity=1, stroke_color="#451a03",
                  stroke_width=2)
    poche = RoundedRectangle(width=r * 0.9, height=r * 0.55, corner_radius=r * 0.08, fill_color="#9a3412",
                             fill_opacity=1, stroke_color="#451a03", stroke_width=1.5).move_to(cou + P(0, -r * 2.1))
    manche = Line(cou + P(r * 1.55, -r * 1.2), cou + P(r * 2.25, -r * 0.2), color="#a16207", stroke_width=7 * s)
    tete_m = Rectangle(width=r * 0.75, height=r * 0.32, fill_color="#4b5563", fill_opacity=1, stroke_color="#111827",
                       stroke_width=1.5).rotate(0.95).move_to(manche.get_end())
    p.add(tab, poche, manche, tete_m)
    return p


def fer(s=1.0, couleur=FER):
    """Un fer à cheval, ouverture en bas, avec ses trous de clous."""
    R, r = 0.55 * s, 0.32 * s
    arc = AnnularSector(inner_radius=r, outer_radius=R, angle=1.5 * PI, start_angle=-PI / 4, fill_color=couleur,
                        fill_opacity=1, stroke_color="#374151", stroke_width=2.5)
    m = (R + r) / 2
    trous = VGroup(*[Dot(radius=0.035 * s, color="#1f2937").move_to(P(m * np.cos(a), m * np.sin(a)))
                     for a in np.linspace(-PI / 4 + 0.35, 5 * PI / 4 - 0.35, 7)])
    return VGroup(arc, trous)


def pile_fers(n, s=0.6, par_ligne=6):
    """n fers rangés en lignes (pour le défi : 24 fers)."""
    g = VGroup(*[fer(s) for _ in range(n)])
    g.arrange_in_grid(rows=(n + par_ligne - 1) // par_ligne, cols=par_ligne, buff=0.12)
    return g


def comprime(s=1.0):
    """Un comprimé en gélule couchée : moitié blanche, moitié violette."""
    a = RoundedRectangle(width=0.5 * s, height=0.34 * s, corner_radius=0.17 * s, fill_color=WHITE,
                         fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
    b = a.copy().set_fill(C_MG).next_to(a, RIGHT, buff=0)
    return VGroup(a, b).rotate(0.35)


class MasseConvertirCM2Base(MasseChoisirUniteCE2Base):
    nom_voix = "cm2-masse-convertir"
    fichier_marques = "masse_cm2_convertir_marques.json"
    ceinture = "verte"

    def virgule(self, tab, colonne, couleur=JAUNE_TITRE):
        """La virgule au bas du bord droit d'une case (le chiffre des unités est dans cette colonne)."""
        c = tab.cases[colonne]
        return hors_audit(Text(",", font_size=60, color=couleur, weight=BOLD)).move_to(
            c.get_corner(DR) + P(0, 0.24))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Convertir des masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Convertir")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        f = fer(1.6).move_to(P(-3.3, 0.75))
        la = base_commune(self.ligne([("0,75 kg", C_KG), ("= ? g", C_G)], 58, buff=0.3)).move_to(P(1.4, 0.75))
        self.au_mot("0,75")
        self.play(FadeIn(f, shift=DOWN * 0.2), FadeIn(la[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("grammes ?")
        self.play(FadeIn(la[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Mathis, maréchal-ferrant ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        X = -2.2
        pm = mathis(1.45).move_to(P(-5.3, -0.2))
        nom = self.t("Mathis", 42, "#60a5fa").next_to(pm, UP, buff=0.3)
        self.au_mot("Voici Mathis")
        self.play(FadeIn(pm, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        l0 = self.t("Maréchal-ferrant", 42, JAUNE_TITRE)
        gauche(l0, X, 2.4)
        self.au_mot("maréchal-ferrant")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.t("Il fabrique et pose", 36, WHITE)
        l1b = self.t("les fers des chevaux.", 36, WHITE)
        gauche(l1, X, 1.5)
        gauche(l1b, X, 0.8)
        self.au_mot("il fabrique")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        ch = cheval(1.45).move_to(P(4.1, -2.0))
        self.au_mot("fers des")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("chevaux.")
        self.play(FadeIn(ch, shift=LEFT * 0.4), run_time=0.4)
        f = fer(1.0).move_to(P(-1.6, -0.3))
        l2 = base_commune(self.ligne([("Un fer :", WHITE), ("0,75 kg", C_KG)], 44, buff=0.25))
        gauche(l2, -0.85, -0.3)
        self.au_mot("Un fer")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(f, scale=1.2), run_time=0.35)
        self.au_mot("0,75")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l2[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 02 : le tableau, × 10 par colonne, kg → g : × 1 000 ─────────────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        l0 = self.t("Le tableau des unités", 42, JAUNE_TITRE)
        gauche(l0, -6.3, 2.75)
        tab = tableau_masses(colonnes=("kg", "hg", "dag", "g"), larg=1.9, h=0.9, fs=38).move_to(P(-1.6, 0.25))
        cases = VGroup(*[tab.cases[c] for c in ("kg", "hg", "dag", "g")])
        self.au_mot("tableau")
        self.play(FadeIn(l0, shift=UP * 0.1), Create(cases), run_time=0.5)
        for e, mot in zip(tab.entetes, ("kilogramme,", "hectogramme,", "décagramme,", "gramme. Chaque")):
            self.au_mot(mot)
            self.play(FadeIn(e, scale=1.15), run_time=0.3)
        fls = VGroup()
        for a, b in (("hg", "kg"), ("dag", "hg"), ("g", "dag")):
            ea, eb = tab.cases[a], tab.cases[b]
            fl = CurvedArrow(ea.get_top() + UP * 0.75 + LEFT * 0.25, eb.get_top() + UP * 0.75 + RIGHT * 0.25,
                             angle=PI / 2.4, color=C_MUL, stroke_width=4)
            lb = muet(self.t("× 10", 28, C_MUL)).next_to(fl, UP, buff=0.05)
            fls.add(VGroup(fl, lb))
        hors_audit(fls)
        self.au_mot("10 fois")
        self.play(LaggedStart(*[FadeIn(f_, shift=DOWN * 0.1) for f_ in fls], lag_ratio=0.3), run_time=0.8)
        l1 = base_commune(self.ligne([("kg vers g :", WHITE), ("× 1 000", C_MUL)], 48, buff=0.3))
        gauche(l1, -6.3, -1.75)
        fl = Arrow(tab.cases["kg"].get_bottom() + DOWN * 0.15, tab.cases["g"].get_bottom() + DOWN * 0.15,
                   buff=0.05, color=C_G, stroke_width=5)
        self.au_mot("Du kilogramme")
        self.play(FadeIn(l1[0], shift=UP * 0.1), GrowArrow(fl), run_time=0.4)
        self.au_mot("1 000.")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l1[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : 0,75 kg placé dans le tableau ──────────────────────────────────
    def ecran_placer(self):
        self.ecran("03-placer")
        l0 = base_commune(self.ligne([("0,75 kg", C_KG), ("dans le tableau :", WHITE)], 42, buff=0.25))
        gauche(l0, -6.3, 2.75)
        tab = tableau_masses(colonnes=("kg", "hg", "dag", "g"), larg=1.9, h=0.9, fs=38).move_to(P(-1.6, 1.0))
        self.add(tab)
        self.au_mot("0,75")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("dans le")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        chs = [chiffre_dans(tab, c, ch, 50, col) for c, ch, col in
               (("kg", "0", C_KG), ("hg", "7", WHITE), ("dag", "5", WHITE), ("g", "0", C_G))]
        vir = self.virgule(tab, "kg")
        mots = ("0 sous", "7 sous", "5 sous", "zéro")
        cols = ("kg", "hg", "dag", "g")
        for ch, mot, col, k in zip(chs, mots, cols, range(4)):
            self.au_mot(mot)
            anims = [FadeIn(ch, scale=1.4)]
            if k == 0:
                anims.append(FadeIn(vir, scale=1.3))
            self.play(*anims, run_time=0.3)
            self.au_mot({"kg": "k g", "hg": "h g", "dag": "d a g", "g": "les g."}[col])
            self.play(Indicate(tab.entetes[k], color=JAUNE_TITRE, scale_factor=1.12), run_time=0.35)
        l1 = base_commune(self.ligne([("On lit :", WHITE), ("750 g", C_G)], 50, buff=0.3))
        gauche(l1, -6.3, -1.1)
        self.au_mot("On lit")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("750")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = muet(base_commune(self.ligne([("0,75 kg", C_KG), ("= 750 g", C_G)], 44, buff=0.25)))
        gauche(l2, -6.3, -2.2)
        cad = SurroundingRectangle(l2, color=VERT_OK, buff=0.14, stroke_width=4)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(cad), run_time=0.45)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (1,2 kg = ? g) ──────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()

        def avant_q(sc):
            sc._q_mots = {0: "1,2"}

        self._ph_mots = {(0, 0): "1,2 fois", (1, 0): "1 000 :", (2, 0): 2.54, (3, 0): "3 rangs",
                         (4, 0): "1 !"}
        self.question_gauche("04-question", "04b-reponse",
                             ["1,2 kg, c'est", "combien de g ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["1,2 ×", "1 000", "= 1 200 g.", "3 rangs,", "pas 1 !"],
                             -0.2,
                             mot_q="1,2", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 05 : g → kg, on divise par 1 000 (4 fers de 750 g) ──────────────────
    def ecran_diviser(self):
        self.ecran("05-diviser")
        X = -0.3
        sch = schema(self).move_to(P(-4.3, 1.1))
        self.add(sch.ca, sch.cb, sch.fh, sch.lh)
        l0 = self.t("Dans l'autre sens :", 42, JAUNE_TITRE)
        gauche(l0, X, 2.4)
        self.au_mot("Dans")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = base_commune(self.ligne([("On divise", WHITE), ("par 1 000.", C_DIV)], 40, buff=0.2))
        gauche(l1, X, 1.4)
        self.au_mot("divise")
        self.play(Create(sch.fb), FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("1 000. 4")
        self.play(FadeIn(sch.lb, scale=1.2), FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        fers = VGroup(*[fer(0.92) for _ in range(4)]).arrange(RIGHT, buff=0.15).move_to(P(-4.0, -1.75))
        l2 = base_commune(self.ligne([("4 ×", WHITE), ("750", C_G), ("= 3 000 g", C_G)], 44, buff=0.22))
        gauche(l2, X, 0.15)
        self.au_mot("4 fers")
        self.play(LaggedStart(*[FadeIn(f_, shift=DOWN * 0.15) for f_ in fers], lag_ratio=0.2),
                  FadeIn(l2[0], shift=UP * 0.1), run_time=0.5)
        self.morceaux(l2[1:], ("750,", "3 000 grammes."))
        l3 = base_commune(self.ligne([("3 000 ÷", WHITE), ("1 000", C_DIV), ("= 3 kg", C_KG)], 44, buff=0.3))
        gauche(l3, X, -1.05)
        self.morceaux(l3, (8.42, "1 000 :", "3 kilogrammes."))
        self.insister(l3[2], 1.12, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (250 g = 2,5 kg ?) ─────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()

        def avant_q(sc):
            sc._q_mots = {1: "250 grammes,", 2: "2,5"}

        self._ph_mots = {(0, 0): "Des grammes", (1, 0): "1 000. 250", (2, 0): "250 divisé", (3, 0): "1 000 :",
                         (4, 0): "0,25"}
        self.question_gauche("06-question", "06b-reponse",
                             ["Un élève écrit :", "250 g", "= 2,5 kg.", "A-t-il raison ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["g vers kg :", "÷ 1 000.", "250 ÷", "1 000", "= 0,25 kg."],
                             -0.4,
                             mot_q="Un élève", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 07 : le milligramme (500 mg = 0,5 g) ────────────────────────────────
    def ecran_mg(self):
        self.ecran("07-mg")
        X = -1.2
        l0 = self.t("Les toutes petites masses", 42, JAUNE_TITRE)
        gauche(l0, -6.3, 2.75)
        self.au_mot("toutes")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        ch = cheval(1.2).move_to(P(-4.7, -0.1))
        cp = comprime(1.6).move_to(P(-4.7, -2.0))
        self.au_mot("comprimé")
        self.play(FadeIn(ch, shift=RIGHT * 0.3), FadeIn(cp, scale=1.3), run_time=0.4)
        l1 = base_commune(self.ligne([("Un comprimé :", WHITE), ("500 mg", C_MG)], 44, buff=0.25))
        gauche(l1, X, 1.45)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("500")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        mg = hors_audit(self.t("mg = milligramme", 30, GRAY_B))
        gauche(mg, X, 0.75)
        self.au_mot("milligrammes. 1")
        self.play(FadeIn(mg, shift=UP * 0.1), run_time=0.3)
        l2 = base_commune(self.ligne([("1 g", C_G), ("= 1 000 mg", C_MG)], 50, buff=0.3))
        gauche(l2, X, -0.4)
        self.morceaux(l2, ("1 gramme", "1 000 milligrammes"))
        self.insister(l2[1], 1.12, 0.25)
        l3 = base_commune(self.ligne([("500 mg", C_MG), ("= 0,5 g", C_G)], 50, buff=0.3))
        gauche(l3, X, -1.6)
        self.au_mot("500", n=2)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("0,5")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        cad = SurroundingRectangle(l3, color=VERT_OK, buff=0.14, stroke_width=4)
        self.play(Create(cad), run_time=0.35)
        self.attendre_voix()

    # ── 08 : le défi (24 fers de 750 g) ─────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        X = -1.4
        pm = mathis(1.1).move_to(P(-5.5, 0.6))
        self.au_mot("Mathis commande")
        self.play(FadeIn(pm, shift=UP * 0.2), run_time=0.35)
        l0 = base_commune(self.ligne([("Mathis commande", WHITE), ("24 fers", JAUNE_TITRE)], 42, buff=0.22))
        gauche(l0, X, 1.9)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        pf = pile_fers(24, 0.36).move_to(P(-4.6, -1.85))
        self.au_mot("24 fers")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(pf, shift=DOWN * 0.2), run_time=0.4)
        l1 = base_commune(self.ligne([("de", WHITE), ("750 g.", C_G)], 42, buff=0.22))
        gauche(l1, X, 1.1)
        self.morceaux(l1, ("de 750", "750"))
        l2 = self.t("Combien de kg", 44, JAUNE_TITRE)
        l2b = self.t("en tout ?", 44, JAUNE_TITRE)
        gauche(l2, X, -0.2)
        gauche(l2b, X, -0.95)
        self.au_mot("Combien")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("en tout")
        self.play(FadeIn(l2b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -1.4, -2.35)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        X = -2.4
        pf = hors_audit(pile_fers(24, 0.36)).move_to(P(-4.6, 0.6))
        l0 = base_commune(self.ligne([("24 ×", WHITE), ("750", C_G), ("= 18 000 g", C_G)], 46, buff=0.25))
        gauche(l0, X, 1.6)
        self.au_mot("24 fois")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(pf, shift=DOWN * 0.2), run_time=0.35)
        self.morceaux(l0[1:], ("750 :", "18 000 grammes."))
        l1 = base_commune(self.ligne([("18 000 ÷", WHITE), ("1 000", C_DIV), ("= 18 kg", C_KG)], 46, buff=0.45))
        gauche(l1, X, 0.2)
        self.morceaux(l1, (6.22, "1 000 :", "18 kilogrammes."))
        cad = SurroundingRectangle(l1[2], color=VERT_OK, buff=0.1, stroke_width=5)
        self.play(Create(cad), run_time=0.35)
        l2 = muet(base_commune(self.ligne([("24 fers pèsent", WHITE), ("18 kg", C_KG)], 38, buff=0.2)))
        gauche(l2, X, -1.2)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        sch = schema(self, ecart=2.9).move_to(P(-4.4, 0.3))
        X = -1.3
        l0 = base_commune(self.ligne([("kg vers g :", WHITE), ("× 1 000", C_MUL)], 44, buff=0.3))
        gauche(l0, X, 1.6)
        self.au_mot("Du kilogramme")
        self.play(FadeIn(VGroup(sch.ca, sch.cb), shift=UP * 0.1), FadeIn(l0[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("multiplie")
        self.play(Create(sch.fh), run_time=0.4)
        self.au_mot("1 000. Du")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(sch.lh, scale=1.2), run_time=0.3)
        l1 = base_commune(self.ligne([("g vers kg :", WHITE), ("÷ 1 000", C_DIV)], 44, buff=0.3))
        gauche(l1, X, 0.45)
        self.au_mot("Du gramme")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("divise")
        self.play(Create(sch.fb), run_time=0.4)
        self.au_mot("1 000. Le")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(sch.lb, scale=1.2), run_time=0.3)
        l2 = self.t("Le tableau place la virgule.", 40, JAUNE_TITRE)
        gauche(l2, X, -0.75)
        tab = tableau_masses(colonnes=("kg", "hg", "dag", "g"), larg=1.15, h=0.6, fs=28,
                             chiffres={"kg": "0", "hg": "7", "dag": "5", "g": "0"})
        hors_audit(tab)
        tab.move_to(P(X + tab.width / 2, -2.25))
        vir = self.virgule(tab, "kg")
        self.au_mot("tableau")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(tab, shift=UP * 0.1), run_time=0.4)
        self.au_mot("virgule")
        self.play(FadeIn(vir, scale=1.4), run_time=0.3)
        self.attendre_voix(marge=1.8)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_placer()
        self.ecran_question1()
        self.ecran_diviser()
        self.ecran_question2()
        self.ecran_mg()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="10-abonne")


class MasseConvertirCM2(MasseConvertirCM2Base):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
