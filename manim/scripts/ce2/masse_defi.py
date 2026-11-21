# masse_defi.py
# EleveAI — Maths CE2 — série « Masses » (CP → CM2), ÉPISODE CE2 07 : le défi des masses
# (micro ce2_masse_defi, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE ORANGE. Short jumeau (jaune) : film Ti Margo (l'ananas et les 3 mangues de 400 g).
# Décor et métier : Louise, SAVONNIÈRE (chaque savon doit peser 100 g).
# Mapping micro → écrans : 02 (équilibre : un pain de savon contre 500 g + 200 g + 200 g), 03 (somme : 900 g),
# 04 question (900 g en savons de 100 g : 9 savons), 05 (la boîte : 10 savons + 200 g = 1 200 g = 1 kg 200 g),
# 06 question (Léa 1 kg 200 g, Kevin 1 200 g, Malia 1 020 g : Léa et Kevin), 07 défi (boîte de 300 g,
# pleine 1 kg 500 g : 12 savons), 07b correction, 08 ce que tu as appris, 09 fin commune.
# Voix : manim/voix/ce2-masse-defi.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:defi
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_defi.py MasseDefiCE2
# Sortie : manim/sorties/ce2/maths/masse/07-defi/eleveai-maths-ce2-masse-defi.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/ (fin_commune)

from masse_commun import *  # noqa: E402,F403
from masse_choisir_unite import MasseChoisirUniteCE2Base, court  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["ce2-masse-defi"]
Q1, Q2 = EP["questions"]
C_G, C_KG = BLEU_D, VERT_OK
LAVANDE = "#c4b5fd"
SAVONS = ("#f9a8d4", "#a7f3d0", "#fde68a", "#c4b5fd", "#bae6fd")


def louise(s=1.0):
    """Louise, savonnière : blouse lavande, tablier blanc, cheveux longs châtains, foulard rose."""
    p = visage(personne(peau="#e0ac69", tenue="#7c3aed", cheveux="#78350f", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    foulard = AnnularSector(inner_radius=0, outer_radius=r * 1.04, angle=PI, start_angle=0, fill_color="#f472b6",
                            fill_opacity=1, stroke_color="#be185d", stroke_width=2).move_to(c + UP * r * 0.62)
    tb = tablier(p, "#fbcfe8")
    tb.scale(0.8).move_to(p.get_bottom() + UP * tb.height * 0.62)
    poche = RoundedRectangle(width=tb.width * 0.5, height=tb.height * 0.22, corner_radius=0.03 * s,
                             fill_color="#f9a8d4", fill_opacity=1, stroke_width=0).move_to(tb.get_bottom() + UP * tb.height * 0.3)
    tb = VGroup(tb, poche)
    p.add(tb, foulard)
    return p


def savon(s=1.0, couleur="#f9a8d4"):
    """Un petit savon : un pavé arrondi, un ovale gravé au milieu."""
    corps = RoundedRectangle(width=0.62 * s, height=0.36 * s, corner_radius=0.1 * s, fill_color=couleur,
                             fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    ov = Ellipse(width=0.34 * s, height=0.16 * s, stroke_color=WHITE, stroke_width=2, fill_opacity=0)
    return VGroup(corps, ov.move_to(corps))


def pain_savon(s=1.0, couleur=LAVANDE):
    """Le gros pain de savon : un long bloc, des traits de coupe en pointillé."""
    corps = RoundedRectangle(width=1.9 * s, height=0.62 * s, corner_radius=0.08 * s, fill_color=couleur,
                             fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    g = VGroup(corps)
    for i in range(1, 5):
        x = corps.get_left()[0] + corps.width * i / 5
        g.add(DashedLine(P(x, corps.get_top()[1] - 0.06 * s), P(x, corps.get_bottom()[1] + 0.06 * s),
                         color=WHITE, stroke_width=2, dash_length=0.06 * s).set_opacity(0.7))
    return g


def boite_savons(n=10, s=1.0, couleur="#fcd34d"):
    """Une boîte ouverte (vue de face), n savons rangés dedans en deux rangées."""
    rang = (n + 1) // 2
    sv = VGroup(*[savon(0.6 * s, SAVONS[i % len(SAVONS)]) for i in range(n)])
    sv.arrange_in_grid(2, rang, buff=0.04 * s)
    fond = Rectangle(width=sv.width + 0.24 * s, height=sv.height * 0.45 + 0.12 * s, fill_color=couleur,
                     fill_opacity=1, stroke_color="#92400e", stroke_width=3)
    fond.move_to(sv.get_bottom() + UP * fond.height / 2 + DOWN * 0.06 * s)
    return VGroup(sv, fond)


def boite_vide(s=1.0, couleur="#fcd34d"):
    """La même boîte, vide."""
    ref = boite_savons(10, s, couleur)
    return VGroup(ref[1].copy())


def ardoise_eleve(sc, nom, l1, l2=None, c=WHITE):
    """Une petite ardoise : le prénom au-dessus, ce que l'élève a écrit dedans (une ou deux parties)."""
    n = sc.t(nom, 30, JAUNE_TITRE)
    morceaux = [(l1, c)] + ([(l2, c)] if l2 else [])
    v = base_commune(sc.ligne(morceaux, 30, buff=0.18))
    cadre = RoundedRectangle(width=max(v.width + 0.45, 2.3), height=0.85, corner_radius=0.1, fill_color="#1f2937",
                             fill_opacity=1, stroke_color="#a16207", stroke_width=5)
    v.move_to(cadre)
    n.next_to(cadre, UP, buff=0.12)
    return VGroup(cadre, n, v)


class MasseDefiCE2Base(MasseChoisirUniteCE2Base):
    nom_voix = "ce2-masse-defi"
    fichier_marques = "masse_defi_marques.json"
    ceinture = "orange"

    def figure_equilibre(self, x=-3.25, y=-0.9, penche=0.0):
        """La balance de l'écran 02 : le pain de savon à gauche, 500 g + 200 g + 200 g à droite."""
        b = Balance(4.8, penche, s=1.05).move_to(P(x, y))
        pn = b.poser(pain_savon(0.85), "g")
        ms = self.masses()
        b.poser(ms, "d")
        return b, pn, ms

    def masses(self):
        """500 g, et à côté deux masses de 200 g l'une sur l'autre (tout tient sur le plateau)."""
        m5, m2a, m2b = masse_marquee("500 g", 1.0), masse_marquee("200 g", 0.85), masse_marquee("200 g", 0.85)
        return VGroup(m5, m2a, m2b).arrange(RIGHT, buff=0.04, aligned_edge=DOWN)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le défi des masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le défi")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        b, pn, ms = self.figure_equilibre(-2.2, 0.15)
        fig = VGroup(b, pn, ms).scale(0.95).move_to(P(-2.2, 0.35))
        self.au_mot("La balance")
        self.play(FadeIn(fig, shift=UP * 0.2), run_time=0.45)
        q = self.t("? g", 46, JAUNE_TITRE).move_to(b.sous("g", 0.35))
        self.au_mot("combien pèse")
        self.play(FadeIn(q, scale=1.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Louise, savonnière ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pl = louise(1.45).move_to(P(-4.6, -0.3))
        nom = self.t("Louise", 42, "#f472b6").next_to(pl, UP, buff=0.3)
        self.au_mot("Voici Louise")
        self.play(FadeIn(pl, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.t("savonnière", 26, "#f472b6").next_to(pl, DOWN, buff=0.15)
        l0 = self.t("Elle fabrique des savons.", 38, GRAY_B)
        gauche(l0, -2.4, 2.3)
        sv = VGroup(*[savon(1.3, SAVONS[i]) for i in range(5)]).arrange(RIGHT, buff=0.25).move_to(P(1.6, 0.9))
        self.au_mot("Elle fabrique")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(met), LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in sv],
                                                                        lag_ratio=0.15), run_time=0.6)
        l1 = base_commune(self.ligne([("Un savon :", WHITE), ("100 g", C_G)], 44, buff=0.22))
        gauche(l1, -2.4, -0.6)
        self.morceaux(l1, ("Chaque savon", "100 grammes"))
        self.insister(l1[1], 1.15, 0.25)
        l2 = self.t("pour être vendu au bon prix.", 32, GRAY_B)
        gauche(l2, -2.4, -1.6)
        self.au_mot("pour être")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 02 : l'équilibre (pain contre 500 g + 200 g + 200 g) ────────────────
    def ecran_equilibre(self):
        self.ecran("02-equilibre")
        X = 0.7
        b = Balance(4.8, 0.0, s=1.05).move_to(P(-3.25, -0.9))
        self.play(FadeIn(b, shift=UP * 0.2), run_time=0.3)
        pn = b.poser(pain_savon(0.85), "g")
        l0 = self.t("Un gros pain de savon", 38, WHITE)
        gauche(l0, X, 2.4)
        self.au_mot("Louise pose")
        self.play(FadeIn(pn, shift=DOWN * 0.4), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        basculer(self, b, 0.7, [pn], [], run_time=0.5)
        ms = self.masses()
        m5, m2a, m2b = ms
        b.poser(ms, "d")
        l1 = self.t("De l'autre côté :", 38, WHITE)
        gauche(l1, X, 1.5)
        self.au_mot("De l'autre")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = base_commune(self.ligne([("500 g", C_G), ("+ 200 g", C_G), ("+ 200 g", C_G)], 36, buff=0.22))
        gauche(l2, X, 0.6)
        self.au_mot("500 grammes")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(m5, shift=DOWN * 0.4), run_time=0.35)
        basculer(self, b, 0.3, [pn], [m5], run_time=0.45)
        self.au_mot("200 grammes")
        self.play(FadeIn(l2[1:], shift=UP * 0.1), FadeIn(m2a, shift=DOWN * 0.4), FadeIn(m2b, shift=DOWN * 0.4),
                  run_time=0.35)
        basculer(self, b, 0.0, [pn], [ms], run_time=0.6)
        eq = self.t("Équilibre !", 50, VERT_OK)
        gauche(eq, X, -0.6)
        self.au_mot("Équilibre")
        self.play(FadeIn(eq, scale=1.2), run_time=0.35)
        self.insister(eq, 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : la somme (900 g) ───────────────────────────────────────────────
    def ecran_somme(self):
        self.ecran("03-somme")
        X = 0.7
        b, pn, ms = self.figure_equilibre()
        hors_audit(VGroup(b, pn, ms))
        self.play(FadeIn(b), FadeIn(pn), FadeIn(ms), run_time=0.3)
        l0 = self.t("Le pain de savon pèse :", 34, WHITE)
        gauche(l0, X, 2.0)
        self.au_mot("Le pain")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = base_commune(self.ligne([("500 +", WHITE), ("200 +", WHITE), ("200", WHITE)], 50, buff=0.32))
        gauche(l1, X, 0.9)
        self.morceaux(l1, ("500 plus", "200 plus", 2.82))
        l2 = self.t("= 900 g", 56, JAUNE_TITRE)
        gauche(l2, X, -0.3)
        et = self.t("900 g", 34, JAUNE_TITRE).move_to(b.sous("g", 0.3))
        for f in et.get_family():
            f._pas_audit = True  # le même « 900 » que la ligne du calcul
            f.sans_synchro = True
        self.au_mot("900 grammes")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        self.insister(l2, 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (900 g en savons de 100 g) ──────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pn = pain_savon(1.1).move_to(P(-4.6, 2.35))
        sv = savon(1.1, SAVONS[0]).next_to(pn, RIGHT, buff=0.35)

        def avant_q(sc):
            sc._q_mots = {0: "900 grammes", 2: "100 grammes"}
            sc._q_apres = {1: montrer_savon}
            sc.play(FadeIn(pn, shift=UP * 0.2), run_time=0.2)

        def montrer_savon(sc):
            sc.play(FadeIn(sv, shift=DOWN * 0.2), run_time=0.25)

        def apres(sc):
            sc.play(Indicate(pn, color=VERT_OK, scale_factor=1.1), run_time=0.3)

        self._ph_mots = {(0, 0): 0.83, (0, 1): "900 grammes", (1, 0): "Louise fait"}
        self.question_gauche("04-question", "04b-reponse",
                             ["Un pain de 900 g", "coupé en savons", "de 100 g.", "Combien de savons ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["9 × 100 g = 900 g.", "Louise fait 9 savons."],
                             -0.2, couper={0: ("9 × 100 g", "= 900 g.")},
                             mot_q="Louise coupe", avant_q=avant_q, autres_r=apres)
        self._ph_mots, self._q_apres = {}, {}

    # ── 05 : la boîte (10 savons + 200 g = 1 200 g = 1 kg 200 g) ────────────
    def ecran_boite(self):
        self.ecran("05-boite")
        X = -1.2
        bal = balance_electronique("0 g", 1.6).move_to(P(-4.6, -1.7))
        bx = boite_savons(10, 1.5)
        bx.next_to(bal.plateau, UP, buff=0.0)
        l0a = self.t("10 savons", 40, WHITE)
        gauche(l0a, X, 2.5)
        l0b = base_commune(self.ligne([("dans une boîte de", WHITE), ("200 g", C_G)], 40, buff=0.2))
        gauche(l0b, X, 1.75)
        l0 = VGroup(l0a, *l0b)
        self.au_mot("Louise met")
        self.play(FadeIn(bal, shift=UP * 0.2), FadeIn(bx, shift=DOWN * 0.3), FadeIn(l0[0], shift=UP * 0.1),
                  run_time=0.4)
        self.au_mot("dans une")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        self.au_t(2.27)
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.3)
        l1 = base_commune(self.ligne([("10 savons :", WHITE), ("1 000 g", C_G)], 42, buff=0.22))
        gauche(l1, X, 0.8)
        self.morceaux(l1, ("10 savons :", "1 000 grammes"))
        self.play(Indicate(bx[0], color=JAUNE_TITRE, scale_factor=1.08), run_time=0.35)
        l2 = base_commune(self.ligne([("Avec la boîte :", WHITE), ("1 200 g", JAUNE_TITRE)], 42, buff=0.22))
        gauche(l2, X, -0.25)
        self.au_mot("Avec la")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 200 grammes")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Transform(bal.affichage, afficher(bal, "1 200 g", 1.6)),
                  run_time=0.3)
        l3 = base_commune(self.ligne([("soit", WHITE), ("1 kg", C_KG), ("200 g", C_G)], 42, buff=0.22))
        gauche(l3, X, -1.3)
        self.morceaux(l3, ("soit", "1 kilogramme", 10.20))
        self.insister(l3[1:], 1.12, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (Léa, Kevin, Malia) ─────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        a_lea = ardoise_eleve(self, "Léa", "1 kg", "200 g")
        a_kev = ardoise_eleve(self, "Kevin", "1 200 g")
        a_mal = ardoise_eleve(self, "Malia", "1 020 g")
        a_lea.move_to(P(-5.0, 2.0))
        a_kev.move_to(P(-2.2, 2.0))
        a_mal.move_to(P(-3.6, 0.35))

        def avant_q(sc):
            sc._q_mots = {1: "cette boîte"}
            sc._q_apres = {1: eleves}

        def eleves(sc):
            for a, mots in ((a_lea, ("Léa écrit", "1 kilogramme 200 grammes, Kevin", "200 grammes, Kevin")),
                            (a_kev, ("Kevin", "1 200 grammes, Malia")),
                            (a_mal, ("Malia", "1 020"))):
                sc.au_mot(mots[0])
                sc.play(FadeIn(a[0]), FadeIn(a[1], shift=DOWN * 0.1), run_time=0.3)
                for m, mot in zip(a[2], mots[1:]):
                    sc.au_mot(mot)
                    sc.play(FadeIn(m, shift=UP * 0.1), run_time=0.25)

        def apres(sc):
            sc.play(Indicate(VGroup(a_lea, a_kev), color=VERT_OK, scale_factor=1.06), run_time=0.35)

        self._ph_mots = {(0, 0): "1 kilogramme 200", (0, 1): "c'est 1 200", (1, 0): "Léa et Kevin ont"}
        self.question_gauche("06-question", "06b-reponse",
                             ["Trois élèves pèsent", "cette boîte.", "Qui a raison ?"],
                             [self.choix(c_, fs=24) for c_ in Q2["choix"]], Q2["reponse"],
                             ["1 kg 200 g = 1 200 g :", "Léa et Kevin ont raison."],
                             -0.6, couper={0: ("1 kg 200 g", "= 1 200 g :")},
                             mot_q="Trois élèves", avant_q=avant_q, autres_r=apres)
        self._ph_mots, self._q_apres = {}, {}

    # ── 07 : le défi (boîte de 300 g, pleine 1 kg 500 g) ────────────────────
    def figure_defi(self, pleine=True):
        bal = balance_electronique("? g" if pleine else "300 g", 1.4).move_to(P(-4.75, -1.8))
        bx = boite_savons(12, 1.4) if pleine else boite_vide(1.4)
        bx.next_to(bal.plateau, UP, buff=0.0)
        return bal, bx

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        X = -2.6
        bal, bv = self.figure_defi(pleine=False)
        hors_audit(bal)
        l0 = base_commune(self.ligne([("Boîte vide :", WHITE), ("300 g", C_G)], 40, buff=0.22))
        gauche(l0, X, 1.9)
        self.morceaux(l0, ("Une boîte vide", "300 grammes"))
        self.play(FadeIn(bal, shift=UP * 0.2), FadeIn(bv, shift=DOWN * 0.3), run_time=0.35)
        l1 = base_commune(self.ligne([("Pleine de savons de", WHITE), ("100 g", C_G), (":", WHITE)], 40, buff=0.2))
        gauche(l1, X, 1.0)
        self.morceaux(l1, ("Pleine", "100 grammes,", None))
        bp, bxp = self.figure_defi(pleine=True)
        self.play(FadeIn(bxp[0], shift=DOWN * 0.4), run_time=0.35)
        l2 = base_commune(self.ligne([("1 kg", C_KG), ("500 g", C_G)], 46, buff=0.22))
        gauche(l2, X, 0.05)
        self.morceaux(l2, ("1 kilogramme", "500 grammes."))
        self.play(Transform(bal.affichage, afficher(bal, "1 kg 500 g", 1.4)), run_time=0.3)
        q = self.t("Combien de savons ?", 42, JAUNE_TITRE)
        gauche(q, X, -0.95)
        self.au_mot("Combien de")
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, X, -1.95)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        X = -2.6
        bal, bx = self.figure_defi(pleine=True)
        bal = balance_electronique("1 kg 500 g", 1.4).move_to(bal)
        hors_audit(VGroup(bal, bx))
        self.play(FadeIn(bal), FadeIn(bx), run_time=0.3)
        l0 = base_commune(self.ligne([("1 kg 500 g", WHITE), ("= 1 500 g", C_G)], 44, buff=0.22))
        gauche(l0, X, 2.0)
        self.morceaux(l0, ("1 kilogramme", "1 500 grammes."))
        l1 = base_commune(self.ligne([("1 500 −", WHITE), ("300", WHITE), ("= 1 200 g", JAUNE_TITRE)], 48,
                                     buff=0.32))
        gauche(l1, X, 0.85)
        self.morceaux(l1, ("1 500 moins", "300,", "1 200 grammes"))
        self.play(Indicate(bx[0], color=JAUNE_TITRE, scale_factor=1.06), run_time=0.35)
        l2 = base_commune(self.ligne([("1 200 =", WHITE), ("12 × 100", WHITE)], 48, buff=0.32))
        gauche(l2, X, -0.3)
        self.morceaux(l2, ("1 200, c'est", "12 fois"))
        l3 = self.t("12 savons !", 54, VERT_OK)
        gauche(l3, X, -1.5)
        self.au_mot("12 savons")
        self.play(FadeIn(l3, scale=1.2), run_time=0.35)
        self.insister(l3, 1.12, 0.25)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        b, pn, ms = self.figure_equilibre(-3.6, -0.4)
        fig = hors_audit(VGroup(b, pn, ms)).scale(0.85)
        l0 = self.t("Balance en équilibre :", 36, WHITE)
        l0b = self.t("on additionne les masses.", 36, VERT_OK)
        gauche(l0, 0.2, 1.7)
        gauche(l0b, 0.2, 1.0)
        self.au_mot("Sur une")
        self.play(FadeIn(fig, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("on additionne")
        self.play(FadeIn(l0b, shift=UP * 0.1), run_time=0.35)
        l1 = self.t("Tout en grammes", 36, WHITE)
        l1b = self.t("avant de calculer.", 36, AMBRE if "AMBRE" in globals() else JAUNE_TITRE)
        gauche(l1, 0.2, -0.3)
        gauche(l1b, 0.2, -1.0)
        self.au_mot("Et on met")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("avant de")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.35)
        ex = hors_audit(self.t("1 kg 200 g = 1 200 g", 30, GRAY_B))
        gauche(ex, 0.2, -1.9)
        self.play(FadeIn(ex, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix(marge=1.8)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_equilibre()
        self.ecran_somme()
        self.ecran_question1()
        self.ecran_boite()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="09-abonne")


class MasseDefiCE2(MasseDefiCE2Base):
    identite = "Maths CE2 — EleveAI"
    ceinture = "orange"
