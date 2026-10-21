# stats_lire_graphique.py
# EleveAI — Maths 6e — série « Statistiques », épisode 06 : LIRE UN GRAPHIQUE
# (diagramme en barres sur un axe gradué ; micro du coach :
# `stat_donnee_lire_graphique`, canvas `stat_graph` barres, showAxis + step),
# AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE : il faut lire une valeur AU MILIEU entre deux
# graduations sans trait (450 entre 400 et 500), un cran au-dessus du
# « je vois ». Short jumeau : stats_lire_graphique_short.py (blanche).
#
# ⭐ Décor et métier : l'AGRICULTURE ; une AGRICULTRICE pèse sa récolte de
# letchis chaque semaine de décembre (la saison du letchi à La Réunion) pour
# savoir combien de cueilleurs embaucher. Données vraisemblables d'une petite
# exploitation : 200, 450, 600, 350 kg.
# ⭐ La figure est CELLE DU COACH (manim/canvas_stats.py, Barres) : axe gradué
# de 100 en 100 ; le geste de lecture se voit (flèche qui monte, pointillé
# ambre jusqu'à l'axe, valeur lue dans une pastille à gauche des nombres).
# ⛔ PAS D'ÉCART : un nombre ne s'écrit qu'au mot où la voix le dit.
#
# Micro → écrans : stat_donnee_lire_graphique = 02 (les axes, l'unité, le pas),
# 03 (lire quatre barres), 04 (la plus haute, décider), 05 (piège : arrondir à
# vue), 06 défi, 06b correction.
# Écrans : 00 garde · 01 l'agricultrice · 02 les axes · 03 lire · 04 décider ·
# 05 le piège (loupe 400 – 500) · 06 défi · 06b correction · 07 ce que tu as
# appris · 08 fin (règle du 19/10).
#
# Voix : manim/voix/6e-stats-lire-graphique.json (débit −10), WAV dans
# public/sons/6e-stats-lire-graphique/ ; calage mot à mot :
# manim/scripts/6e/stats_lire_graphique_marques.json (marques.ps1).
# Outils communs du lot : manim/scripts/cm1/stats_graphique_completer.py.
# python -m manim render -qh --disable_caching manim/scripts/6e/stats_lire_graphique.py StatsLireGraphique6e -o eleveai-maths-6e-stats-lire-graphique --media_dir manim/scripts/6e/media-lire-graphique
# Sortie : manim/sorties/6e/maths/statistiques/06-lire-graphique/

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, NUIT, Barres, texte  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_graphique_completer import OutilsStats, P, croix, personnage  # noqa: E402

SEMAINES = ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4"]
MASSES = [200, 450, 600, 350]
ROUGE_LETCHI = "#e11d48"
COUL = ["#fda4af"] * 4


def letchi(r=0.22):
    """Un letchi : une boule rouge à la peau bosselée, et sa queue."""
    boule = Circle(radius=r, fill_color=ROUGE_LETCHI, fill_opacity=1, stroke_color="#9f1239", stroke_width=2)
    bosses = VGroup(*[Dot(P(r * 0.5 * np.cos(a), r * 0.5 * np.sin(a)), radius=r * 0.12, color="#be123c")
                      for a in np.linspace(0, TAU, 7)[:-1]])
    queue = Line(P(0, r), P(r * 0.3, r * 1.5), color="#65a30d", stroke_width=3)
    return VGroup(queue, boule, bosses)


def grappe(n=7, r=0.22):
    pos = [(0, 0), (-0.4, -0.15), (0.4, -0.15), (-0.2, -0.5), (0.2, -0.5), (-0.55, -0.55), (0.55, -0.55), (0, -0.85)]
    g = VGroup(*[letchi(r).move_to(P(x * r / 0.22, y * r / 0.22)) for x, y in pos[:n]])
    feuilles = VGroup(*[Ellipse(width=0.9 * r / 0.22, height=0.32 * r / 0.22, fill_color="#16a34a", fill_opacity=1,
                                stroke_width=0).rotate(a).move_to(P(dx * r / 0.22, 0.45 * r / 0.22))
                        for a, dx in [(0.4, -0.35), (-0.4, 0.35)]])
    return VGroup(feuilles, g)


def balance(larg=1.6):
    """Une balance à plateau : le plateau, le corps, l'écran."""
    plateau = RoundedRectangle(width=larg, height=0.14, corner_radius=0.05, fill_color="#cbd5e1", fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0.5))
    corps = RoundedRectangle(width=larg * 0.8, height=0.8, corner_radius=0.12, fill_color="#475569",
                             fill_opacity=1, stroke_width=0)
    ecran = RoundedRectangle(width=larg * 0.5, height=0.32, corner_radius=0.05, fill_color="#bbf7d0",
                             fill_opacity=1, stroke_width=0).move_to(P(0, -0.05))
    return VGroup(corps, plateau, ecran)


class StatsLireGraphique6e(OutilsStats, Notion6e):
    nom_voix = "6e-stats-lire-graphique"
    fichier_marques = "stats_lire_graphique_marques.json"
    dossier_marques = Path(__file__).resolve().parent
    identite = "Maths 6e — EleveAI"
    G = P(-3.25, -0.42)

    def graphe(self):
        return Barres(SEMAINES, MASSES, pas=100, maxi=700, couleurs=COUL, nom_axe="Masse (kg)",
                      titre="Récolte de letchis", largeur=4.6, hauteur=4.0, fs=28, colonne_lue=True,
                      centre=self.G)

    def graphe_pret(self, lus=()):
        """Le diagramme posé d'un coup ; `lus` = indices dont la valeur lue (pastille) est déjà dite."""
        g = self.graphe()
        self.add(g)
        for i in lus:
            self.add(g.lu(MASSES[i]))
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Lire un graphique", 56, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.85))
        g = Barres([""] * 4, MASSES, pas=100, maxi=700, couleurs=COUL, largeur=3.2, hauteur=2.2, fs=24,
                   centre=P(-0.6, 0.15))
        for nb in g.nombres.values():
            nb.set_opacity(0)
        gr = grappe(5, 0.26).move_to(P(3.0, 0.4))
        self.au_mot("Sur un graphique")
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9),
                  g.pousser(run_time=0.8), run_time=0.8)
        self.au_mot("les nombres qui parlent")
        self.play(FadeIn(gr, shift=DOWN * 0.3), run_time=0.4)
        self.play(LaggedStart(*[Indicate(t, color=AMBRE, scale_factor=1.8) for t in g.traits.values()],
                              lag_ratio=0.1), run_time=0.9)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'agricultrice ─────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Une agricultrice")
        gr = grappe(8, 0.3).move_to(P(-4.0, 1.9))
        metier = self.t("Agricultrice", 46, BLEU_CALCUL).next_to(gr, DOWN, buff=0.4)
        self.play(FadeIn(gr, shift=DOWN * 0.3), Write(metier), run_time=0.7)
        self.au_mot("des letchis")
        nom = self.t("les letchis", 38, ROUGE_LETCHI).next_to(gr, RIGHT, buff=0.4)
        self.play(FadeIn(nom, shift=LEFT * 0.2), Indicate(gr, color=WHITE, scale_factor=1.08), run_time=0.5)
        self.au_mot("En décembre")
        cal = VGroup(RoundedRectangle(width=1.9, height=1.3, corner_radius=0.12, fill_color=WHITE, fill_opacity=1,
                                      stroke_width=0),
                     Rectangle(width=1.9, height=0.4, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0))
        cal[1].align_to(cal[0], UP)
        mois = Text("Décembre", font_size=26, color=WHITE, weight=BOLD)
        mois.scale_to_fit_width(1.6).move_to(cal[1])
        cal.add(mois)
        cal.move_to(P(3.2, 2.1))
        self.play(FadeIn(cal, scale=0.7), run_time=0.5)
        self.au_mot("elle pèse sa récolte")
        bal = balance(1.8).move_to(P(-1.0, -1.4))
        panier = grappe(5, 0.2).next_to(bal[1], UP, buff=0.0)
        sem = self.t("chaque semaine", 36).next_to(bal, DOWN, buff=0.3)
        self.play(FadeIn(bal, shift=UP * 0.2), run_time=0.4)
        self.play(FadeIn(panier, shift=DOWN * 0.4), FadeIn(sem), run_time=0.5)
        self.au_mot("combien de cueilleurs")
        gens = VGroup(*[personnage(c, 0.6) for c in [VERT_OK, ORANGE_RETENUE, BLEU_CALCUL, "#f472b6"]])
        gens.arrange(RIGHT, buff=0.25).move_to(P(3.4, -0.9))
        q = self.t("?", 64, ORANGE_RETENUE).next_to(gens, RIGHT, buff=0.3)
        cue = self.t("des cueilleurs", 36).next_to(gens, DOWN, buff=0.35)
        self.play(LaggedStart(*[FadeIn(p, shift=UP * 0.3) for p in gens], lag_ratio=0.15), FadeIn(cue),
                  run_time=0.8)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix()

    # ── 02 : les axes ───────────────────────────────────────────────────────

    def ecran_axes(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-axes")
        g = self.graphe()
        base = VGroup(g.carte, g.titre, g.grille, g.axe_x, g.axe_y, *g.marques)
        self.play(FadeIn(base, scale=0.95), run_time=0.4)
        self.au_mot("en bas, les semaines")
        bas = self.col(self.t("En bas : les semaines", 38), 2.2)
        self.play(FadeIn(bas, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(e, shift=UP * 0.2) for e in g.etiquettes],
                                                              lag_ratio=0.2), run_time=0.8)
        self.au_mot("Sur le côté")
        cote = self.col(self.t("Sur le côté : la masse", 38), 1.25)
        self.play(FadeIn(cote, shift=RIGHT * 0.2), FadeIn(g.nom_axe, scale=1.4), Indicate(g.axe_y, color=AMBRE),
                  run_time=0.6)
        self.au_mot("en kilogrammes")
        kg = self.col(self.ligne([("en kilogrammes", WHITE), ("(kg)", AMBRE)], 38), 0.45)
        self.play(FadeIn(kg, shift=RIGHT * 0.2), Indicate(g.nom_axe, color=AMBRE, scale_factor=1.3), run_time=0.5)
        self.au_mot("de 100 en 100")
        pas = self.col(self.ligne([("de", WHITE), ("100", AMBRE), ("en", WHITE), ("100", AMBRE)], 42), -0.6)
        self.play(FadeIn(pas, shift=RIGHT * 0.2), run_time=0.3)
        self.play(LaggedStart(*[AnimationGroup(FadeIn(g.nombre(v), scale=1.5), FadeIn(g.trait(v)))
                                for v in sorted(g.nombres)], lag_ratio=0.2), run_time=1.3)
        self.insister(pas, 1.15, 0.3)
        self.attendre_voix()

    # ── 03 : lire les quatre barres ─────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lire")
        g = self.graphe_pret()
        traces = VGroup()
        for i in range(4):
            self.au_mot(f"Semaine {i + 1}")
            fl = g.monter(i)
            self.play(g.focus(i, 0.35), GrowArrow(fl), run_time=0.45)
            tr = g.vers_axe(i, jusqu_au_lu=True)
            lu = g.lu(MASSES[i])
            lg = self.ligne([(f"Semaine {i + 1} :", WHITE), (str(MASSES[i]), AMBRE), ("kg", WHITE)], 36)
            self.col(lg, 2.4 - 0.85 * i - (0.75 if i >= 2 else 0))
            self.play(Create(tr), run_time=0.35)
            self.play(FadeIn(lu, scale=1.6), FadeIn(lg, shift=RIGHT * 0.2), FadeOut(fl), run_time=0.35)
            traces.add(tr)
            if i == 1:
                self.au_mot("au milieu")
                mil = self.col(self.ligne([("au milieu, entre", WHITE), ("400", AMBRE), ("et", WHITE),
                                           ("500", AMBRE)], 32), 0.8)
                self.play(FadeIn(mil, shift=RIGHT * 0.2), Indicate(g.nombre(400), color=AMBRE, scale_factor=1.3),
                          Indicate(g.nombre(500), color=AMBRE, scale_factor=1.3), run_time=0.7)
        self.play(g.rallumer(), FadeOut(traces), run_time=0.4)
        self.attendre_voix()

    # ── 04 : décider ────────────────────────────────────────────────────────

    def ecran_decider(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-decider")
        g = self.graphe_pret(lus=range(4))
        self.au_mot("La barre la plus haute")
        h = self.col(self.t("La barre la plus haute", 40, JAUNE_TITRE), 2.3)
        self.play(FadeIn(h, shift=RIGHT * 0.2),
                  LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.05) for b in g.barres], lag_ratio=0.2),
                  run_time=0.8)
        self.au_mot("la semaine 3")
        res = self.col(self.ligne([("Semaine 3 :", WHITE), ("600", AMBRE), ("kg", WHITE)], 48), 1.3)
        self.play(g.focus(2, 0.35), FadeIn(res[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("avec 600")
        self.play(FadeIn(res[1:], scale=1.5), Indicate(g.lu(600), color=WHITE), run_time=0.5)
        cadre = SurroundingRectangle(res, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        self.play(Create(cadre), run_time=0.4)
        self.au_mot("elle embauchera")
        gens = VGroup(*[personnage(c, 0.55) for c in [VERT_OK, ORANGE_RETENUE, BLEU_CALCUL, "#f472b6", JAUNE_TITRE,
                                                      BLEU_CALCUL]]).arrange(RIGHT, buff=0.18)
        self.col(gens, -0.15)
        plus = self.col(self.t("le plus de cueilleurs", 38, VERT_OK), -1.15)
        self.play(LaggedStart(*[FadeIn(p, shift=UP * 0.3) for p in gens], lag_ratio=0.12), FadeIn(plus),
                  run_time=0.9)
        self.insister(plus, 1.1, 0.3)
        self.attendre_voix()

    # ── 05 : le piège (la loupe sur 400 – 500) ──────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        g = self.graphe_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.3)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("arrondir à vue")
        av = self.col(self.t("arrondir « à vue »", 38, ORANGE_RETENUE), 2.55)
        self.play(FadeIn(av, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("La barre de la semaine 2")
        fl = g.monter(1)
        self.play(g.focus(1, 0.35), GrowArrow(fl), run_time=0.6)
        # la loupe : l'axe de 400 à 500, agrandi, et le haut de la barre au milieu
        cx, cy = 2.55, -0.1
        carte = RoundedRectangle(width=3.3, height=4.0, corner_radius=0.22, fill_color=WHITE, fill_opacity=1,
                                 stroke_color=AMBRE, stroke_width=5).move_to(P(cx, cy))
        y = lambda v: cy - 1.5 + (v - 400) / 100 * 3.0  # noqa: E731
        xa = cx - 0.1  # les nombres 400 et 500 bien DANS la carte
        axe = Line(P(xa, y(390)), P(xa, y(510)), color=NUIT, stroke_width=6)
        t4 = Line(P(xa - 0.35, y(400)), P(xa, y(400)), color=NUIT, stroke_width=6)
        t5 = Line(P(xa - 0.35, y(500)), P(xa, y(500)), color=NUIT, stroke_width=6)
        n4 = texte(400, 40).next_to(t4, LEFT, buff=0.1)
        n5 = texte(500, 40).next_to(t5, LEFT, buff=0.1)
        barre = Rectangle(width=0.8, height=y(450) - y(390), fill_color=COUL[1], fill_opacity=1, stroke_color=AMBRE,
                          stroke_width=6).move_to(P(xa + 0.75, (y(450) + y(390)) / 2))
        zone = Rectangle(width=0.6, height=g.y_axe(500)[1] - g.y_axe(400)[1] + 0.3, stroke_color=AMBRE,
                         stroke_width=5).move_to(P(g.y_axe(450)[0] - 0.1, g.y_axe(450)[1]))
        self.au_mot("s'arrête au milieu")
        self.play(Create(zone), FadeIn(VGroup(carte, axe, t4, t5, n4, n5, barre), scale=0.5), run_time=0.6)
        moit = VGroup(DoubleArrow(P(xa + 0.2, y(400)), P(xa + 0.2, y(450)), buff=0, color=VERT_OK, stroke_width=5,
                                  tip_length=0.15),
                      DoubleArrow(P(xa + 0.2, y(450)), P(xa + 0.2, y(500)), buff=0, color=VERT_OK, stroke_width=5,
                                  tip_length=0.15)).shift(RIGHT * 1.3)
        self.play(GrowFromCenter(moit[0]), GrowFromCenter(moit[1]), run_time=0.5)
        self.au_mot("c'est 450")
        niv = DashedLine(P(xa + 0.4, y(450)), P(xa, y(450)), color=AMBRE, stroke_width=6)
        lu = VGroup(RoundedRectangle(width=1.0, height=0.55, corner_radius=0.1, fill_color=AMBRE, fill_opacity=1,
                                     stroke_width=0), texte(450, 36, WHITE))
        lu[1].move_to(lu[0])
        lu.next_to(P(xa, y(450)), LEFT, buff=0.1)
        res = self.col(self.ligne([("c'est", WHITE), ("450", AMBRE)], 44), -0.1, xl=4.4)
        self.play(Create(niv), FadeIn(lu, scale=1.5), FadeIn(res, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("pas 400")
        x4 = croix(n4.copy().scale(1.05), sw=6)
        self.play(Create(x4), n4.animate.set_opacity(0.4), run_time=0.35)
        self.au_mot("ni 500")
        x5 = croix(n5.copy().scale(1.05), sw=6)
        self.play(Create(x5), n5.animate.set_opacity(0.4), run_time=0.35)
        self.insister(res, 1.15, 0.3)
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        g = self.graphe_pret(lus=range(4))
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Combien de kilogrammes")
        q = VGroup(self.t("Combien de kilogrammes", 38), self.ligne([("de plus en", WHITE), ("semaine 3", AMBRE)], 38),
                   self.ligne([("qu'en", WHITE), ("semaine 2", AMBRE), ("?", WHITE)], 38))
        self.col(q.arrange(DOWN, aligned_edge=LEFT, buff=0.15), 0.85)
        self.play(FadeIn(q[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("en semaine 3")
        self.play(FadeIn(q[1], shift=RIGHT * 0.2), g.estomper([2], 0.3), run_time=0.4)
        self.au_mot("qu'en semaine 2")
        self.play(FadeIn(q[2], shift=RIGHT * 0.2), g.estomper([1, 2], 0.3), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -0.75)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06b-correction")
        g = self.graphe_pret(lus=range(4))
        self.play(g.estomper([1, 2], 0.3), run_time=0.01)
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.5)
        calc = self.ligne([("600", AMBRE), ("−", WHITE), ("450", AMBRE), ("=", WHITE), ("150", VERT_OK), ("kg", WHITE)],
                          56, 0.25)
        self.col(calc, 1.0)
        self.au_mot("600 moins")
        self.play(FadeIn(calc[0], scale=1.5), FadeIn(calc[1]), Indicate(g.lu(600), color=WHITE), run_time=0.4)
        self.au_mot("450, égale")
        self.play(FadeIn(calc[2], scale=1.5), Indicate(g.lu(450), color=WHITE), run_time=0.4)
        self.au_mot("150 kilogrammes")
        # l'écart, sur la barre de la semaine 3, du niveau 450 au niveau 600
        xg = g.barres[2].get_left()[0] + 0.15
        niveau = DashedLine(g.barres[1].get_corner(UR), P(xg, g.point(1)[1]), color=AMBRE, stroke_width=5,
                            dash_length=0.12)
        ecart = DoubleArrow(P(xg, g.point(1)[1]), P(xg, g.point(2)[1]), buff=0, color=VERT_OK, stroke_width=6,
                            tip_length=0.18, max_tip_length_to_length_ratio=0.3)
        self.play(FadeIn(calc[3:], shift=RIGHT * 0.2), Create(niveau), GrowFromCenter(ecart), run_time=0.5)
        plus = self.col(self.t("de plus en semaine 3", 38, VERT_OK), 0.0)
        self.play(FadeIn(plus, shift=UP * 0.2), run_time=0.4)
        cadre = SurroundingRectangle(VGroup(calc, plus), color=VERT_OK, buff=0.22, corner_radius=0.15, stroke_width=5)
        self.play(Create(cadre), run_time=0.4)
        self.insister(calc[4], 1.4, 0.3)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        g = self.graphe_pret()
        lignes = self.finale([("Je lis le titre", "et les axes."),
                              ("Je vérifie de combien", "en combien vont", "les graduations."),
                              ("Je lis les nombres,", "avec leur unité.")], fs=34)
        self.au_mot("Je lis le titre")
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), Indicate(g.titre, color=AMBRE), run_time=0.6)
        self.au_mot("et les axes")
        self.play(Indicate(g.etiquettes, color=AMBRE), Indicate(g.nom_axe, color=AMBRE), Create(lignes[0][0]),
                  run_time=0.6)
        self.au_mot("Je vérifie")
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), run_time=0.5)
        self.play(LaggedStart(*[Indicate(g.nombre(v), color=AMBRE, scale_factor=1.3) for v in sorted(g.nombres)],
                              lag_ratio=0.15), Create(lignes[1][0]), run_time=1.2)
        self.au_mot("Puis je lis les nombres")
        fl, tr = g.monter(1), g.vers_axe(1, jusqu_au_lu=True)
        self.play(FadeIn(lignes[2][1], shift=RIGHT * 0.2), GrowArrow(fl), run_time=0.6)
        self.play(Create(tr), run_time=0.5)
        self.play(FadeIn(g.lu(450), scale=1.5), run_time=0.3)
        self.au_mot("avec leur unité")
        self.play(Create(lignes[2][0]), Indicate(g.nom_axe, color=AMBRE, scale_factor=1.3), run_time=0.6)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_axes()
        self.ecran_lire()
        self.ecran_decider()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
