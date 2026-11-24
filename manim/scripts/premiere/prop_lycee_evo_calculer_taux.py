# prop_lycee_evo_calculer_taux.py
# EleveAI — Maths 1re, STMG et 2de (automatismes SANS calculatrice) — série
# « Évolutions en pourcentage », épisode COMMUN 11 : CALCULER UN TAUX
# D'ÉVOLUTION (micro du coach : auto_evo_calculer_taux ; en 2de :
# info_taux_evolution), AVEC VOIX. Paysage, CEINTURE JAUNE (short jumeau :
# prop_lycee_evo_calculer_taux_short.py).
# Trois sous-classes : PropLyceeEvoCalculerTauxPremiere (rendue en entier),
# PropLyceeEvoCalculerTauxStmg et PropLyceeEvoCalculerTauxSeconde (gardes
# seules, GARDE_SEULE=1, puis collage avec frac_cm_commun.py coller).
# ⭐ Méthode : taux = (arrivée − départ) ÷ départ ; ou coefficient
# arrivée ÷ départ, moins 1. Positif = hausse, négatif = baisse.
# ⭐ Dessins : boîtes départ → arrivée ; barre de 100 % (80 % + le trou de 20 %).
# ⭐ Fil rouge : on divise par le DÉPART ; un écart en points n'est pas un taux
# (3 % → 2,4 % : − 0,6 point, mais − 20 %).
# Questions : 06 (50 € → 60 €) bonne B = + 20 % ; 08 (80 000 → 60 000) bonne A = − 25 %.
# Décor : Livret A (conseillère bancaire, journaliste, économiste), boulangerie.
# Centres : argent-budget, cuisine. Source : Livret A 3 % jusqu'au 31/01/2025,
# 2,4 % au 01/02/2025 (Banque de France).
# Base commune : EvoLyceeBase, chargée de prop_lycee_evo_valeur_initiale.py.
#
# Voix : manim/voix/lycee-evo-calculer-taux.json (« go » le 23/11, débit −10) ;
# WAV : public/sons/lycee-evo-calculer-taux/ ; marques :
# prop_lycee_evo_calculer_taux_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_evo_calculer_taux.py PropLyceeEvoCalculerTauxPremiere
# Brouillon : python -m manim render -ql --disable_caching manim/scripts/premiere/prop_lycee_evo_calculer_taux.py PropLyceeEvoCalculerTauxPremiere -o eleveai-maths-premiere-evo-calculer-taux --media_dir manim/scripts/premiere/media-prop-lycee-evo-calculer-taux
# Gardes seules : GARDE_SEULE=1 … PropLyceeEvoCalculerTauxStmg / PropLyceeEvoCalculerTauxSeconde

import sys
from pathlib import Path
import importlib.util

_ICI = Path(__file__).resolve().parent
_spec = importlib.util.spec_from_file_location("prop_lycee_evo_valeur_initiale_base",
                                               _ICI / "prop_lycee_evo_valeur_initiale.py")
_b10 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_b10)
from prop_ratio_ecrire import *  # noqa: E402,F403

sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

EvoLyceeBase = _b10.EvoLyceeBase
boite, nombre_dans, fleche, retour, pas_audit, vignette = (_b10.boite, _b10.nombre_dans, _b10.fleche, _b10.retour,
                                                          _b10.pas_audit, _b10.vignette)
gras, sans = _b10.gras, _b10.sans
DEP, ARR, HAUSSE, BAISSE = _b10.DEP, _b10.ARR, _b10.HAUSSE, _b10.BAISSE
TROU = "#1e293b"


def livret(s=1.0):
    """Un livret d'épargne : couverture bleue, bande dorée, « Livret A » (décor)."""
    c = RoundedRectangle(width=1.7, height=2.1, corner_radius=0.12, fill_color="#1d4ed8", fill_opacity=1,
                         stroke_color="#93c5fd", stroke_width=3)
    bande = Rectangle(width=1.7, height=0.22, fill_color="#fbbf24", fill_opacity=1, stroke_width=0).move_to(P(0, 0.45))
    t = Text("Livret A", font_size=24, color=WHITE, weight=BOLD).move_to(P(0, -0.25))
    return VGroup(c, bande, t).scale(s)


def baguette(s=1.0, angle=0.0):
    corps = RoundedRectangle(width=2.0, height=0.34, corner_radius=0.17, fill_color="#d97706", fill_opacity=1,
                             stroke_width=0)
    entailles = VGroup(*[Line(P(x - 0.1, -0.09), P(x + 0.1, 0.09), color="#fde68a", stroke_width=4)
                         for x in (-0.6, -0.2, 0.2, 0.6)])
    return VGroup(corps, entailles).rotate(angle).scale(s)


def immeubles(s=1.0):
    """Une petite ville : quatre immeubles et leurs fenêtres."""
    g = VGroup()
    for x, h, c in ((-1.0, 1.6, "#475569"), (-0.35, 2.2, "#64748b"), (0.3, 1.3, "#334155"), (0.95, 1.9, "#475569")):
        b = Rectangle(width=0.55, height=h, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(x, h / 2))
        fen = VGroup(*[Square(0.11, fill_color="#fde68a", fill_opacity=1, stroke_width=0)
                       .move_to(P(x + dx, y)) for dx in (-0.12, 0.12) for y in np.arange(0.3, h - 0.15, 0.35)])
        g.add(b, fen)
    return g.scale(s)


class PropLyceeEvoCalculerTauxBase(EvoLyceeBase):
    nom_voix = "lycee-evo-calculer-taux"
    fichier_marques = "prop_lycee_evo_calculer_taux_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde : départ → arrivée : ? % ─────────────────────────
    def page_de_garde(self):
        def dessin(sc):
            a = boite("départ", DEP, 34, l=2.4, centre=P(-2.4, 0.35))
            b = boite("arrivée", ARR, 34, l=2.4, centre=P(2.2, 0.35))
            fl, lab = fleche(a, b, "? %", fs=40)
            sc.au_mot("De combien")
            sc.play(FadeIn(a, shift=RIGHT * 0.2), GrowArrow(fl), FadeIn(b, shift=LEFT * 0.2), run_time=0.6)
            sc.au_mot("pour cent")
            sc.play(FadeIn(lab, scale=1.4), run_time=0.4)
            sc.play(Indicate(lab, color=AMBRE), run_time=0.6)
        self.garde_evo("Calculer un taux d'évolution", "Calculer", dessin)

    # ── 01 : le Livret A : 3 % → 2,4 % ; − 0,6 point ; en pourcentage ? ─────
    def ecran_situation(self):
        self.ecran("01-situation")
        lv = livret(1.0).move_to(P(-5.2, 1.5))
        self.montre("Livret A", FadeIn(lv, shift=UP * 0.3), rt=0.5)
        a = boite("3 %", DEP, 42, centre=P(-2.3, 1.5))
        b = boite("2,4 %", ARR, 42, centre=P(2.3, 1.5))
        fl, _ = fleche(a, b)
        date = self.t("1er février 2025", 26, GREY_B).next_to(VGroup(a, b), UP, buff=0.15)
        self.montre("de 3 %", FadeIn(a, shift=RIGHT * 0.2), rt=0.4)
        self.montre("février", GrowArrow(fl), FadeIn(date), rt=0.45)
        self.montre("2,4 %", FadeIn(b, scale=1.2), rt=0.4)
        pt = VGroup(gras("− 0,6", 36, BAISSE), gras("point", 36, BAISSE)).arrange(RIGHT, buff=0.18).move_to(P(0.0, 0.35))
        self.montre("0,6 point", FadeIn(pt[0], shift=UP * 0.15), rt=0.35)
        self.montre("point. Mais", FadeIn(pt[1], shift=UP * 0.15), rt=0.3)
        q = self.t("Mais en pourcentage ?", 38, AMBRE).move_to(P(2.6, -0.5))
        self.montre("Mais en", FadeIn(q, scale=1.1), rt=0.4)
        gens = [vignette("#be185d", "#c68642", "#111827", True), vignette("#1e3a8a", "#f1c27d", "#4b5563", False),
                vignette("#047857", "#8d5524", "#111827", True)]
        for i, (g, n, mot) in enumerate(zip(gens, ["conseillère", "journaliste", "économiste"],
                                            ["Une conseillère", "un journaliste", "une économiste"])):
            g.scale(0.85).move_to(P(-5.2 + 2.1 * i, -1.25))
            e = self.t(n, 22, DEP).next_to(g, DOWN, buff=0.12)
            self.montre(mot, FadeIn(g, shift=UP * 0.2), FadeIn(e), rt=0.4)
        une = self.t("en une phrase", 32, GREY_B).move_to(P(2.6, -1.3))
        self.montre("une phrase", FadeIn(une, shift=RIGHT * 0.15), rt=0.35)
        src = self.source(["Source : Banque de France : taux du Livret A de 3 % jusqu'au 31 janvier 2025,",
                           "2,4 % au 1er février 2025."])
        self.play(FadeIn(src), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la question du jour : 3 % → 2,4 % : − ? % ──────────────────────
    def ecran_question_jour(self):
        self.ecran("02-question-du-jour")
        a = pas_audit(boite("3 %", DEP, 42, centre=P(-4.4, 1.3)))
        b = pas_audit(boite("2,4 %", ARR, 42, centre=P(-0.6, 1.3)))
        fl, _ = fleche(a, b)
        br = self.barre(y=-0.9, largeur=5.0, x=-2.5)
        for m in br.morceaux:
            m.set_fill(DEP, 1)
        self.montre("De combien", FadeIn(a), GrowArrow(fl), FadeIn(b), FadeIn(br, shift=UP * 0.2), rt=0.5)
        L = self.lc([("− ? %", AMBRE)], 1.3, fs=64, xl=2.2)
        self.montre("pour cent", FadeIn(L, scale=1.3), *br.colorer([8, 9], BAISSE), rt=0.45)
        tq = gras("?", 40, BAISSE).next_to(VGroup(*br.morceaux[8:]), DOWN, buff=0.25)
        self.montre("baissé", FadeIn(tq, scale=1.4), Circumscribe(L, color=AMBRE, buff=0.12), rt=0.6)
        self.attendre_voix()

    # ── 03 : la formule : (arrivée − départ) ÷ départ ; − 0,6 ÷ 3 = − 0,2 ───
    def ecran_formule(self):
        self.ecran("03-formule")
        self.titre_haut("La formule", "La formule")
        F = self.lc([("(arrivée", ARR), ("− départ)", DEP), ("÷ départ", AMBRE)], 2.05, fs=42, xl=-1.6)
        self.jouer(F, ["arrivée moins", "moins départ", "divisé par départ"])
        self.play(Create(SurroundingRectangle(F, color=AMBRE, buff=0.18, corner_radius=0.12, stroke_width=4)),
                  run_time=0.4)
        br = self.barre(y=-0.3, largeur=3.6, x=-4.4)
        for m in br.morceaux:
            m.set_fill(DEP, 1)
        self.play(FadeIn(br, shift=UP * 0.2), run_time=0.4)
        L2 = self.lc([("(2,4 − 3)", WHITE), ("= − 0,6", BAISSE)], 0.75, fs=44, xl=-1.6)
        self.jouer(L2, ["2,4 moins", "égale moins 0,6"])
        L3 = self.lc([("− 0,6 ÷ 3", WHITE), ("= − 0,2", AMBRE)], -0.2, fs=44, xl=-1.6)
        self.jouer(L3, ["Moins 0,6", "égale moins 0,2"])
        L4 = self.lc([("soit", WHITE), ("− 20 %", VERT_OK)], -1.15, fs=48, xl=-1.6)
        t20 = gras("− 20 %", 30, BAISSE).next_to(VGroup(*br.morceaux[8:]), DOWN, buff=0.25)
        self.jouer(L4, ["Soit", "moins 20"], {1: [*br.colorer([8, 9], BAISSE), FadeIn(t20, scale=1.3)]})
        self.play(Create(self.cadre(L4[1])), run_time=0.3)
        self.insister(L4[1], 1.2, 0.2)
        self.attendre_voix()

    # ── 04 : le coefficient : 2,4 ÷ 3 = 0,8 ; 80 % : il manque 20 % ─────────
    def ecran_coefficient(self):
        self.ecran("04-coefficient")
        self.titre_haut("Autre chemin : le coefficient", "Autre chemin")
        L1 = self.lc([("arrivée", ARR), ("÷ départ", DEP)], 2.05, fs=42, xl=-3.2)
        self.jouer(L1, ["Arrivée divisée", "par départ"])
        L2 = self.lc([("2,4 ÷ 3", WHITE), ("= 0,8", AMBRE)], 1.15, fs=46, xl=-3.2)
        self.jouer(L2, ["2,4 divisé", "égale 0,8"])
        self.insister(L2[1], 1.2, 0.2)
        br = self.barre(y=-0.65, largeur=6.0, x=-2.6)
        self.play(FadeIn(br, shift=UP * 0.2), run_time=0.35)
        a80, t80 = self.accolade(VGroup(*br.morceaux[:8]), "80 %", DEP, DOWN)
        self.montre("c'est 80", *br.colorer(range(8), DEP), GrowFromCenter(a80), FadeIn(t80, scale=1.3), rt=0.5)
        a20, t20 = self.accolade(VGroup(*br.morceaux[8:]), "il manque 20 %", BAISSE, UP)
        self.montre("il manque", *br.colorer([8, 9], TROU), GrowFromCenter(a20), rt=0.4)
        self.montre("manque 20", FadeIn(t20, scale=1.2), rt=0.35)
        L3 = self.lc([("− 20 %", VERT_OK)], -0.65, fs=56, xl=1.5)
        self.montre("Moins 20", FadeIn(L3, scale=1.3), rt=0.4)
        self.play(Create(self.cadre(L3)), run_time=0.3)
        self.attendre_voix()

    # ── 05 : une hausse : 400 → 460 baguettes ; 60 ÷ 400 = 0,15 = + 15 % ─────
    def ecran_hausse(self):
        self.ecran("05-hausse")
        self.titre_haut("Avec une hausse", "Avec une hausse", couleur=HAUSSE)
        bg = VGroup(baguette(0.7, 0.5), baguette(0.7, 0.3).shift(DOWN * 0.35), baguette(0.7, 0.1).shift(DOWN * 0.7))
        bg.move_to(P(-5.4, 1.4))
        self.montre("Une boulangerie", FadeIn(bg, shift=UP * 0.2), rt=0.45)
        a = boite("400", DEP, 42, centre=P(-2.8, 1.5))
        b = boite("460", ARR, 42, centre=P(1.4, 1.5))
        fl, _ = fleche(a, b)
        u = sans(self.t("baguettes par jour", 26, GREY_B)).next_to(VGroup(a, b), UP, buff=0.2)
        self.montre("vend 400", FadeIn(a, shift=RIGHT * 0.2), FadeIn(u), rt=0.4)
        self.montre("puis 460", GrowArrow(fl), FadeIn(b, scale=1.2), rt=0.45)
        L1 = self.lc([("460 − 400", WHITE), ("= 60", HAUSSE)], 0.05, fs=44, xl=-3.6)
        self.jouer(L1, ["460 moins", "égale 60"])
        L2 = self.lc([("60 ÷ 400", WHITE), ("= 0,15", AMBRE)], -0.95, fs=44, xl=-3.6)
        self.jouer(L2, ["60 divisé", "égale 0,15"])
        L3 = self.lc([("+ 15 %", VERT_OK)], -0.95, fs=56, xl=2.1)
        self.montre("plus 15", FadeIn(L3, scale=1.3), Indicate(b, color=HAUSSE), rt=0.45)
        self.play(Create(self.cadre(L3)), run_time=0.3)
        self.insister(L3, 1.15, 0.2)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (50 € → 60 € ; B = + 20 %) ──────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        a = boite("", DEP, 40, l=1.6, centre=P(-5.4, 1.75))
        b = boite("", ARR, 40, l=1.6, centre=P(-1.4, 1.75))
        fl, lab = fleche(a, b, "? %")

        def avant(sc):
            sc.play(FadeIn(a), GrowArrow(fl), FadeIn(lab), FadeIn(b), run_time=0.4)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["60 − 50", "= 10"])
            l1 = sc.ligne_rep(1, ["10 ÷ 50", "= 0,2", "= + 20 %"])
            l2 = sc.ligne_rep(2, ["A : 10 € ≠ 10 % ;", "C : ÷ 60."])
            na, nb = nombre_dans(a, "50 €"), nombre_dans(b, "60 €")
            sc.montre("60 moins", FadeIn(nb, scale=1.2), rt=0.3)
            sc.montre("moins 50", FadeIn(l0[0], shift=UP * 0.15), FadeIn(na, scale=1.2), rt=0.35)
            sc.montre("égale 10", FadeIn(l0[1], scale=1.3), rt=0.35)
            sc.montre("10 divisé", FadeIn(l1[0], shift=UP * 0.15), rt=0.35)
            sc.montre("égale 0,2", FadeIn(l1[1], scale=1.3), rt=0.35)
            t20 = gras("+ 20 %", 34, VERT_OK).move_to(lab)
            sc.montre("plus 20", FadeIn(l1[2], scale=1.3), FadeOut(lab), FadeIn(t20, scale=1.3), rt=0.4)
            sc.montre("A confond", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.4)
            sc.montre("C divise", FadeIn(l2[1], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.4)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse",
                            ["Un prix passe", "de 50 € à 60 €.", "Taux d'évolution ?"],
                            [self.t("+ 10 %", 36), self.t("+ 20 %", 36), self.t("≈ + 17 %", 36)], 1,
                            ["60 − 50 = 10", "10 ÷ 50 = 0,2 = + 20 %", "A : 10 € ≠ 10 % ; C : ÷ 60."],
                            mot_q="Un prix", avant_q=avant, autres_r=apres)

    # ── 07 : le piège : ÷ départ ; − 0,6 point ≠ − 20 % ─────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        L1 = self.lc([("On divise par", WHITE), ("le départ", DEP)], 2.15, fs=44, xl=-3.6)
        self.jouer(L1, ["On divise", "valeur de départ"])
        self.play(Create(Underline(L1[1], color=DEP, stroke_width=5)), run_time=0.35)
        L2 = self.lc([("Un taux", AMBRE), ("≠", ROUGE_ERREUR), ("un écart en points", GREY_B)], 1.2, fs=38, xl=-3.6)
        self.jouer(L2, ["un taux", "n'est pas", "un écart"])
        a = boite("3 %", DEP, 42, centre=P(-4.0, -0.3))
        b = boite("2,4 %", ARR, 42, centre=P(0.0, -0.3))
        fl, _ = fleche(a, b)
        self.montre("de 3 %", FadeIn(a, shift=RIGHT * 0.2), rt=0.35)
        self.montre("2,4 %", GrowArrow(fl), FadeIn(b, scale=1.2), rt=0.4)
        L3 = self.lc([("− 0,6", BAISSE), ("point", BAISSE), ("≠", WHITE), ("− 20 %", VERT_OK)], -1.75, fs=46, xl=-4.4)
        self.jouer(L3, ["0,6 point", "point, mais", None, "mais moins 20"])
        self.play(Create(self.cadre(L3[3])), run_time=0.3)
        self.insister(L3[3], 1.2, 0.2)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (80 000 → 60 000 habitants ; A = − 25 %) ─────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        v = immeubles(0.9).move_to(P(-3.8, 1.7))

        def avant(sc):
            sc.play(FadeIn(v, shift=UP * 0.2), run_time=0.4)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["60 000 − 80 000", "= − 20 000"])
            l1 = sc.ligne_rep(1, ["÷ 80 000 :", "− 0,25", "= − 25 %"])
            l2 = sc.ligne_rep(2, ["B : 20 000 ≠ 20 % ;", "C : ÷ arrivée."])
            sc.montre("60 000 moins", FadeIn(l0[0], shift=UP * 0.15), rt=0.4)
            sc.montre("égale moins 20 000", FadeIn(l0[1], scale=1.3), rt=0.35)
            sc.montre("Divisé par", FadeIn(l1[0], shift=UP * 0.15), rt=0.35)
            sc.montre("moins 0,25", FadeIn(l1[1], scale=1.3), rt=0.35)
            sc.montre("moins 25", FadeIn(l1[2], scale=1.3), Indicate(v, color=BAISSE), rt=0.4)
            sc.montre("B confond", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.4)
            sc.montre("C divise", FadeIn(l2[1], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.4)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Une ville passe de 80 000", "à 60 000 habitants.", "Taux d'évolution ?"],
                            [self.t("− 25 %", 36), self.t("− 20 %", 36), self.t("≈ − 33 %", 36)], 0,
                            ["60 000 − 80 000 = − 20 000", "÷ 80 000 : − 0,25 = − 25 %",
                             "B : 20 000 ≠ 20 % ; C : ÷ arrivée."],
                            mot_q="Une ville", avant_q=avant, autres_r=apres)

    # ── 09 : défi : 250 → 300 inscrits ; 40 € → 30 € ─────────────────────────
    def chaines_defi(self):
        a1 = boite("250", DEP, 40, l=1.8, centre=P(-5.4, 1.45))
        b1 = boite("300", ARR, 40, l=1.8, centre=P(-1.6, 1.45))
        f1, _ = fleche(a1, b1)
        a2 = boite("40 €", DEP, 40, l=1.8, centre=P(-5.4, -0.75))
        b2 = boite("30 €", ARR, 40, l=1.8, centre=P(-1.6, -0.75))
        f2, _ = fleche(a2, b2)
        n1 = sans(self.t("inscrits", 26, GREY_B)).next_to(a1, UP, buff=0.12).align_to(a1, LEFT)
        n2 = sans(self.t("forfait", 26, GREY_B)).next_to(a2, UP, buff=0.12).align_to(a2, LEFT)
        return a1, b1, f1, a2, b2, f2, n1, n2

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        a1, b1, f1, a2, b2, f2, n1, n2 = self.chaines_defi()
        self.montre("salle de sport", FadeIn(n1), rt=0.35)
        self.montre("de 250", FadeIn(a1, shift=RIGHT * 0.2), rt=0.35)
        self.montre("300", GrowArrow(f1), FadeIn(b1, scale=1.2), rt=0.4)
        self.montre("Un forfait", FadeIn(n2), rt=0.35)
        self.montre("de 40", FadeIn(a2, shift=RIGHT * 0.2), rt=0.35)
        self.montre("30 €", GrowArrow(f2), FadeIn(b2, scale=1.2), rt=0.4)
        q1 = gras("? %", 34, AMBRE).next_to(f1, UP, buff=0.08)
        q2 = gras("? %", 34, AMBRE).next_to(f2, UP, buff=0.08)
        self.montre("les deux taux", FadeIn(q1, scale=1.3), FadeIn(q2, scale=1.3), rt=0.4)
        self.pause_defi(y=-2.25)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        a1, b1, f1, a2, b2, f2, n1, n2 = self.chaines_defi()
        self.add(pas_audit(VGroup(a1, b1, f1, a2, b2, f2, n1, n2)))
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        L1 = self.lc([("50 ÷ 250", WHITE), ("= 0,2", AMBRE), ("= + 20 %", VERT_OK)], 1.45, fs=42, xl=-0.2)
        L2 = self.lc([("− 10 ÷ 40", WHITE), ("= − 0,25", AMBRE), ("= − 25 %", VERT_OK)], -0.75, fs=42, xl=-0.2)
        L1[2].shift(RIGHT * 0.12)  # HD 23/11 : ligne réduite, le cadre collait au voisin
        L2[2].shift(RIGHT * 0.12)
        self.play(Write(tit), run_time=0.4)
        self.jouer(L1, ["50 divisé", "égale 0,2", "plus 20"])
        t1 = gras("+ 20 %", 30, VERT_OK).next_to(f1, UP, buff=0.08)
        self.play(FadeIn(t1, scale=1.3), Create(self.cadre(L1[2])), run_time=0.35)
        self.jouer(L2, ["Moins 10", "égale moins 0,25", "moins 25 %"])
        t2 = gras("− 25 %", 30, VERT_OK).next_to(f2, UP, buff=0.08)
        self.play(FadeIn(t2, scale=1.3), Create(self.cadre(L2[2])), run_time=0.35)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        a = boite("départ", DEP, 30, l=1.75, centre=P(-5.4, 0.3))
        b = boite("arrivée", ARR, 30, l=1.75, centre=P(-1.9, 0.3))
        fl, lab = fleche(a, b, "? %", fs=32)
        fig = pas_audit(VGroup(a, b, fl, lab))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Taux = (arrivée − départ)", "÷ départ."),
            ("Ou : arrivée ÷ départ,", "puis moins 1."),
            ("Positif : une hausse ;", "négatif : une baisse.")], fs=36)
        self.au_mot("Le taux")
        self.montrer_ligne(lignes[0], Indicate(lab, color=AMBRE))
        self.au_mot("Ou bien")
        self.montrer_ligne(lignes[1])
        self.au_mot("Positif")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.finir([self.page_de_garde, self.ecran_situation, self.ecran_question_jour, self.ecran_formule,
                    self.ecran_coefficient, self.ecran_hausse, self.ecran_question1, self.ecran_piege,
                    self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_finale])


class PropLyceeEvoCalculerTauxPremiere(PropLyceeEvoCalculerTauxBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"


class PropLyceeEvoCalculerTauxStmg(PropLyceeEvoCalculerTauxBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"


class PropLyceeEvoCalculerTauxSeconde(PropLyceeEvoCalculerTauxBase):
    identite = "Maths 2de — EleveAI"
    ceinture = "jaune"
