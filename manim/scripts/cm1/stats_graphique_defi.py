# stats_graphique_defi.py
# EleveAI — Maths CM1 ET CM2 — série « Statistiques », épisode 08 : UN DÉFI
# AVEC UN DIAGRAMME EN BARRES, en trois étapes (micro du coach :
# `graphique_defi`, CM1 et CM2 ; canvas `stat_graph` barres, axe gradué), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE : c'est la paysage complète du niveau (lire
# cinq barres, choisir les barres utiles, calculer en trois étapes, piège,
# défi corrigé). Short jumeau : stats_graphique_defi_short.py (jaune, un cran
# plus bas : on lit et on compare, une soustraction en commentaire).
#
# ⭐ Décor et métier : le CINÉMA ; un PROGRAMMATEUR DE CINÉMA décide des
# séances d'après les entrées d'un dessin animé, du mercredi au dimanche
# (données vraisemblables d'une petite salle : 120, 80, 150, 300, 250).
# ⭐ La figure est CELLE DU COACH (manim/canvas_stats.py, Barres) : axe gradué
# de 50 en 50, un petit trait tous les 10 ; le geste de lecture se voit
# (pointillé ambre vers l'axe), la valeur s'écrit au mot.
# ⛔ PAS D'ÉCART : un nombre ne s'écrit qu'au mot où la voix le dit.
#
# Micro → écrans : graphique_defi = 03 (la question), 04-05-06 (trois étapes),
# 07 (piège : la plus haute moins la plus basse), 08 défi, 08b correction.
# Écrans : 00 garde · 01 le programmateur · 02 lire les barres · 03 le défi ·
# 04 étape 1 · 05 étape 2 · 06 étape 3 · 07 le piège · 08 défi (séances
# pleines) · 08b correction · 09 ce que tu as appris · 10 fin (règle du 19/10).
#
# Voix : manim/voix/cm-stats-graphique-defi.json (débit −10), WAV dans
# public/sons/cm-stats-graphique-defi/ ; calage mot à mot :
# manim/scripts/cm1/stats_graphique_defi_marques.json (marques.ps1).
# ⭐ UNE voix, UN script, DEUX rendus (seule l'identité change).
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_graphique_defi.py StatsGraphiqueDefiCM1 -o eleveai-maths-cm1-stats-graphique-defi --media_dir manim/scripts/cm1/media-graphique-defi
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_graphique_defi.py StatsGraphiqueDefiCM2 -o eleveai-maths-cm2-stats-graphique-defi --media_dir manim/scripts/cm1/media-graphique-defi-cm2
# Sorties : manim/sorties/cm1/maths/statistiques/08-graphique-defi/ et
#           manim/sorties/cm2/maths/statistiques/08-graphique-defi/

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, NUIT, Barres  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_graphique_completer import OutilsStats, P, croix  # noqa: E402

JOURS = ["Mer.", "Jeu.", "Ven.", "Sam.", "Dim."]
JOURS_VOIX = ["mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
ENTREES = [120, 80, 150, 300, 250]
VIOLET = "#c4b5fd"
ROSE = "#f9a8d4"   # le week-end, quand on le désigne
BLEU_SEM = "#93c5fd"  # du mercredi au vendredi, quand on le désigne


def ecran_cine(larg=4.2, haut=2.4):
    """La salle : l'écran blanc, deux rideaux rouges, trois rangées de fauteuils."""
    ecran = Rectangle(width=larg * 0.7, height=haut * 0.5, fill_color="#f8fafc", fill_opacity=1, stroke_width=0)
    ecran.move_to(P(0, haut * 0.2))
    rid_g = Polygon(P(-larg / 2, haut / 2), P(-larg * 0.3, haut / 2), P(-larg * 0.36, -haut * 0.08),
                    P(-larg / 2, -haut * 0.08), fill_color="#b91c1c", fill_opacity=1, stroke_width=0)
    rid_d = rid_g.copy().flip(UP, about_point=ORIGIN)
    barre = Rectangle(width=larg, height=0.12, fill_color="#7f1d1d", fill_opacity=1, stroke_width=0)
    barre.move_to(P(0, haut / 2))
    sieges = VGroup()
    for r in range(3):
        for k in range(9 - r):
            sieges.add(RoundedRectangle(width=0.28, height=0.22, corner_radius=0.06, fill_color="#7c3aed",
                                        fill_opacity=1, stroke_width=0)
                       .move_to(P((k - (8 - r) / 2) * 0.38, -haut * 0.25 - r * 0.3)))
    return VGroup(ecran, rid_g, rid_d, barre, sieges)


def ticket(larg=1.5):
    corps = RoundedRectangle(width=larg, height=larg * 0.5, corner_radius=0.08, fill_color="#fde68a", fill_opacity=1,
                             stroke_color="#b45309", stroke_width=3)
    t = Text("ENTRÉE", font_size=26, color="#92400e", weight=BOLD)
    t.scale_to_fit_width(larg * 0.78).move_to(corps)
    return VGroup(corps, t)


def bobine(r=0.55):
    """Une bobine de film : un disque et cinq trous."""
    d = Circle(radius=r, fill_color="#475569", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    trous = VGroup(*[Circle(radius=r * 0.2, fill_color="#0b1220", fill_opacity=1, stroke_width=0)
                     .move_to(P(r * 0.55 * np.cos(a), r * 0.55 * np.sin(a))) for a in np.linspace(0, TAU, 6)[:-1]])
    axe = Circle(radius=r * 0.1, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    return VGroup(d, trous, axe)


class StatsGraphiqueDefiBase(OutilsStats, Notion6e):
    nom_voix = "cm-stats-graphique-defi"
    fichier_marques = "stats_graphique_defi_marques.json"
    identite = "Maths CM1 — EleveAI"
    G = P(-3.3, -0.4)

    def graphe(self, couleurs=None):
        return Barres(JOURS, ENTREES, pas=50, sous_pas=10, maxi=350, couleurs=couleurs or [VIOLET] * 5,
                      nom_axe="Entrées", titre="Le dessin animé", largeur=5.0, hauteur=4.0, fs=28, centre=self.G)

    def graphe_pret(self, couleurs=None, valeurs=True):
        g = self.graphe(couleurs)
        self.add(g)
        g.vals = VGroup(*[g.valeur(i, fs=26) for i in range(5)])
        if valeurs:
            self.add(g.vals)
        return g

    def accolade(self, g, indices, couleur, texte_):
        """Une accolade au-dessus des valeurs des barres choisies, et son nom."""
        cibles = VGroup(*[g.vals[i] for i in indices], *[g.barres[i] for i in indices])
        b = Brace(cibles, UP, buff=0.1, color=couleur)
        t = Text(texte_, font_size=28, color=couleur, weight=BOLD).next_to(b, UP, buff=0.06)
        return VGroup(b, t)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Un défi avec un diagramme", 54, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.85))
        g = Barres([""] * 5, ENTREES, pas=50, maxi=350, couleurs=[VIOLET] * 5, largeur=3.6, hauteur=2.2, fs=24,
                   centre=P(-0.6, 0.15))
        for nb in g.nombres.values():
            nb.set_opacity(0)
        tk = ticket(1.5).rotate(0.2).move_to(P(3.4, 0.9))
        self.au_mot("Un défi de cinéma")
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9),
                  FadeIn(tk, shift=LEFT * 0.3), run_time=0.6)
        self.au_mot("avec un diagramme en barres")
        self.play(g.pousser(run_time=0.9))
        self.insister(tk, 1.15, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : le programmateur de cinéma ─────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Un programmateur de cinéma")
        salle = ecran_cine().move_to(P(-3.2, 1.0))
        metier = self.t("Programmateur de cinéma", 40, BLEU_CALCUL).next_to(salle, DOWN, buff=0.45)
        self.play(FadeIn(salle, scale=0.9), Write(metier), run_time=0.8)
        self.au_mot("choisit les films")
        bob = bobine(0.6).move_to(P(2.0, 2.0))
        films = self.t("les films", 38).next_to(bob, RIGHT, buff=0.35)
        self.play(FadeIn(bob, scale=0.5), Rotate(bob, -PI, run_time=0.8), FadeIn(films, shift=LEFT * 0.2))
        self.au_mot("et les séances")
        horaires = VGroup(*[self.t(h, 34, JAUNE_TITRE) for h in ("14 h", "16 h", "18 h")]).arrange(RIGHT, buff=0.4)
        seances = VGroup(self.t("les séances", 38), horaires).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        seances.move_to(P(2.9, 0.45))
        self.play(FadeIn(seances, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("combien de spectateurs")
        tks = VGroup(*[ticket(1.0) for _ in range(4)]).arrange(RIGHT, buff=0.15).move_to(P(1.7, -1.75))
        spect = self.t("les spectateurs, chaque jour", 32).next_to(tks, DOWN, buff=0.3)
        self.play(LaggedStart(*[FadeIn(k, shift=UP * 0.3) for k in tks], lag_ratio=0.15),
                  FadeIn(spect, shift=UP * 0.2), run_time=0.9)
        self.attendre_voix()

    # ── 02 : lire les barres ────────────────────────────────────────────────

    def ecran_barres(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-barres")
        g = self.graphe()
        self.add(g)
        self.au_mot("Le nouveau dessin animé")
        self.play(Indicate(g.titre, color=AMBRE), run_time=0.5)
        lignes = VGroup()
        for i, (j, v) in enumerate(zip(JOURS_VOIX, ENTREES)):
            self.au_mot(str(v) + (" entrées" if i == 0 else " le"))
            tr = g.vers_axe(i)
            val = g.valeur(i, fs=26)
            lg = self.ligne([(j.capitalize() + " :", WHITE), (str(v), VIOLET)], 34)
            self.col(lg, 2.3 - 0.7 * i)
            self.play(g.focus(i, 0.35), Create(tr), FadeIn(val, scale=1.6), FadeIn(lg, shift=RIGHT * 0.2),
                      run_time=0.4)
            self.play(FadeOut(tr), run_time=0.2)
            lignes.add(lg)
        self.au_mot("de 50 en 50")
        self.play(g.rallumer(), run_time=0.3)
        pas = self.col(self.ligne([("Les nombres :", WHITE), ("de 50 en 50", AMBRE)], 36), -1.4)
        self.play(FadeIn(pas, shift=RIGHT * 0.2),
                  LaggedStart(*[Indicate(g.nombre(v), color=AMBRE, scale_factor=1.15) for v in sorted(g.nombres)],
                              lag_ratio=0.12), run_time=1.1)
        self.attendre_voix()

    # ── 03 : le défi ────────────────────────────────────────────────────────

    def ecran_question(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-question")
        g = self.graphe_pret()
        self.au_mot("Le défi")
        titre = self.col(self.t("Le défi", 50, JAUNE_TITRE), 2.7)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("combien d'entrées de plus")
        q1 = self.col(self.t("Combien d'entrées de plus", 38), 1.7)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("le week-end")
        we = self.accolade(g, [3, 4], "#db2777", "week-end")
        q2 = self.col(self.t("le week-end", 38, ROSE), 0.95)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), FadeIn(we, shift=DOWN * 0.1), run_time=0.5)
        self.au_mot("que du mercredi au vendredi")
        sem = self.accolade(g, [0, 1, 2], "#2563eb", "mer. à ven.")
        q3 = self.col(self.t("que du mercredi au vendredi ?", 38, BLEU_SEM), 0.2)
        self.play(FadeIn(q3, shift=RIGHT * 0.2), FadeIn(sem, shift=DOWN * 0.1), run_time=0.5)
        cadre = SurroundingRectangle(VGroup(q1, q2, q3), color=JAUNE_TITRE, buff=0.2, corner_radius=0.12,
                                     stroke_width=4)
        self.play(Create(cadre), run_time=0.5)
        self.attendre_voix()

    # ── 04 · 05 · 06 : les trois étapes ─────────────────────────────────────

    ETAPES = [("Étape 1 : le week-end", ROSE, [("300", "300 plus"), ("+", None), ("250", "250, égale"), ("=", None),
                                                 ("550", "égale 550")]),
              ("Étape 2 : mercredi à vendredi", BLEU_SEM, [("120", "120 plus"), ("+", None), ("80", "80 plus"),
                                                           ("+", None), ("150", "150, égale"), ("=", None),
                                                           ("350", "égale 350")]),
              ("Étape 3 : la différence", VERT_OK, [("550", "550 moins"), ("−", None), ("350", "350, égale"),
                                                    ("=", None), ("200", "égale 200")])]

    def bloc_etape(self, k):
        nom, coul, morceaux = self.ETAPES[k]
        tete = self.t(nom, 34, coul)
        eq = self.ligne([(m, coul if m[0].isdigit() and (k < 2 or m == "200") else WHITE) for m, _ in morceaux],
                        46, 0.22)
        bloc = VGroup(tete, eq).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        return self.col(bloc, 2.55 - 1.35 * k)

    def ecran_etape(self, k, voix, barres_par_morceau, insiste=True):
        """Une étape : les étapes déjà faites restent, la nouvelle s'écrit au mot,
        chaque nombre allume sa barre (barres_par_morceau : indice de barre ou None)."""
        self.clear()
        self.add_mascotte()
        self.dire(voix)
        g = self.graphe_pret()
        for j in range(k):
            self.add(self.bloc_etape(j))
        bloc = self.bloc_etape(k)
        tete, eq = bloc
        self.au_mot(f"Étape {k + 1}")
        garder = [i for i in barres_par_morceau if i is not None]
        anims = [FadeIn(tete, shift=RIGHT * 0.2)]
        if garder:
            anims.append(g.estomper(garder, 0.3))
        self.play(*anims, run_time=0.5)
        morceaux = self.ETAPES[k][2]
        for j, (m, mot) in enumerate(morceaux):
            if mot is None:
                continue
            self.au_mot(mot)
            paire = [eq[j]] + ([eq[j - 1]] if j > 0 else [])
            anims = [FadeIn(x, scale=1.5) for x in paire]
            i = barres_par_morceau[j]
            if i is not None:
                anims.append(Indicate(g.vals[i], color=AMBRE, scale_factor=1.4))
            self.play(*anims, run_time=0.4)
        cadre = SurroundingRectangle(eq[-1], color=VERT_OK, buff=0.12, corner_radius=0.08, stroke_width=5)
        self.play(Create(cadre), run_time=0.35 if insiste else 0.25)
        if insiste:
            self.insister(eq[-1], 1.3, 0.25)
        return g, bloc

    def ecran_etape3(self):
        g, bloc = self.ecran_etape(2, "06-etape3", [None, None, None, None, None], insiste=False)
        self.au_mot("entrées de plus le week-end")
        fin = self.col(self.ligne([("200", VERT_OK), ("entrées de plus le week-end", WHITE)], 34), -1.3)
        self.play(FadeIn(fin, shift=RIGHT * 0.2), g.estomper([3, 4], 0.3), run_time=0.5)
        self.au_mot("Il ajoute une séance")
        seance = self.col(VGroup(ticket(0.8), self.t("+ 1 séance le samedi !", 34, JAUNE_TITRE))
                          .arrange(RIGHT, buff=0.3), -2.1)
        self.play(FadeIn(seance, shift=UP * 0.2), g.focus(3, 0.3), run_time=0.5)
        self.insister(seance, 1.1, 0.3)
        self.attendre_voix()

    def ecran_etape1(self):
        self.ecran_etape(0, "04-etape1", [3, None, 4, None, None])
        self.attendre_voix()

    def ecran_etape2(self):
        self.ecran_etape(1, "05-etape2", [0, None, 1, None, 2, None, None])
        self.attendre_voix()

    # ── 07 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        g = self.graphe_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.3)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("la barre la plus haute")
        h = self.col(self.t("la plus haute et la plus basse ?", 36, ORANGE_RETENUE), 2.45)
        self.play(FadeIn(h, shift=RIGHT * 0.2), g.estomper([3], 0.3), run_time=0.5)
        self.au_mot("et la plus basse")
        self.play(g.estomper([3, 1], 0.3), run_time=0.4)
        self.au_mot("300 moins 80")
        faux = self.col(self.ligne([("300", WHITE), ("−", WHITE), ("80", WHITE)], 50, 0.25), 1.5)
        self.play(FadeIn(faux, shift=RIGHT * 0.2), Indicate(g.vals[3], color=AMBRE, scale_factor=1.4),
                  Indicate(g.vals[1], color=AMBRE, scale_factor=1.4), run_time=0.6)
        self.au_mot("ne répond pas")
        x = croix(faux, sw=7)
        rep = self.col(self.t("ne répond pas à la question", 34, ROUGE_ERREUR), 0.65)
        self.play(Create(x), FadeIn(rep, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Je relis la question")
        self.play(g.rallumer(), run_time=0.3)
        relis = self.col(VGroup(self.coche(VERT_OK, 0.26), self.t("Je relis la question", 38, VERT_OK))
                         .arrange(RIGHT, buff=0.3), -0.35)
        q = VGroup(self.ligne([("de plus le week-end", ROSE), ("que", WHITE)], 38),
                   self.t("du mercredi au vendredi ?", 38, BLEU_SEM))
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(q, -1.45, xl=self.XL + 0.2)
        cadre = SurroundingRectangle(q, color=JAUNE_TITRE, buff=0.15, corner_radius=0.1, stroke_width=3)
        self.play(FadeIn(relis, shift=RIGHT * 0.2), run_time=0.4)
        self.play(FadeIn(q, shift=UP * 0.2), Create(cadre), run_time=0.5)
        self.au_mot("avant de calculer")
        self.insister(VGroup(q, cadre), 1.08, 0.3)
        self.attendre_voix()

    # ── 08 : défi (séances pleines) ─────────────────────────────────────────

    def salle(self, c=0.11):
        """Une salle de 100 places : 10 rangées de 10 fauteuils."""
        s = VGroup(*[Square(side_length=c, fill_color="#7c3aed", fill_opacity=1, stroke_width=0)
                     .move_to(P(k % 10 * c * 1.35, -(k // 10) * c * 1.35)) for k in range(100)])
        cadre = SurroundingRectangle(s, color=WHITE, buff=0.08, stroke_width=2)
        return VGroup(cadre, s)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        g = self.graphe_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 3.0)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Une salle a 100 places")
        sl = self.salle(0.08)
        l1 = VGroup(sl, self.ligne([("1 salle :", WHITE), ("100", JAUNE_TITRE), ("places", WHITE)], 38))
        self.col(l1.arrange(RIGHT, buff=0.3), 1.85)
        self.play(FadeIn(sl, scale=0.6), FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Le samedi")
        l2 = self.col(self.ligne([("Samedi :", WHITE), ("300", VIOLET), ("spectateurs", WHITE)], 38), 0.8)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), g.focus(3, 0.3), run_time=0.5)
        self.au_mot("Combien de séances pleines")
        q = VGroup(self.t("Combien de séances", 38), self.t("pleines faut-il ?", 38))
        self.col(q.arrange(DOWN, aligned_edge=LEFT, buff=0.12), -0.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -1.5)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08b-correction")
        g = self.graphe_pret()
        self.play(g.focus(3, 0.3), run_time=0.01)
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.0)
        self.play(Write(titre), run_time=0.5)
        b = g.barres[3]
        salles = VGroup(*[self.salle(0.09) for _ in range(3)]).arrange(RIGHT, buff=0.35)
        self.col(salles, 1.6)
        for k, mot in enumerate(["100,", "200,", "300 :"]):
            self.au_mot(mot)
            v = 100 * (k + 1)
            y_bas, y_haut = g.y_axe(v - 100)[1], g.y_axe(v)[1]
            bout = Rectangle(width=b.width, height=y_haut - y_bas, fill_color=JAUNE_TITRE, fill_opacity=0.55,
                             stroke_color=NUIT, stroke_width=3).move_to(P(b.get_center()[0], (y_bas + y_haut) / 2))
            nb = self.t(str(v), 40, JAUNE_TITRE).next_to(salles[k], DOWN, buff=0.2)
            self.play(FadeIn(bout, scale=0.8), FadeIn(salles[k], shift=DOWN * 0.2), FadeIn(nb, scale=1.5),
                      run_time=0.4)
        self.au_mot("3 séances pleines")
        res = self.col(self.ligne([("Il faut", WHITE), ("3", VERT_OK), ("séances pleines", WHITE)], 40), -0.45)
        cadre = SurroundingRectangle(res, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        self.play(FadeIn(res, shift=UP * 0.2), Create(cadre), run_time=0.5)
        self.insister(res[1], 1.5, 0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        g = self.graphe_pret()
        lignes = self.finale([("Je relis", "la question."), ("Je lis les barres", "utiles."),
                              ("Je calcule", "étape par étape.")])
        self.au_mot("je relis la question")
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), Create(lignes[0][0]), run_time=0.6)
        self.au_mot("je lis les barres utiles")
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), g.estomper([3, 4], 0.3), run_time=0.6)
        self.play(Create(lignes[1][0]), run_time=0.3)
        self.au_mot("je calcule")
        self.play(FadeIn(lignes[2][1], shift=RIGHT * 0.2), g.rallumer(), run_time=0.6)
        self.play(Create(lignes[2][0]), run_time=0.3)
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_barres()
        self.ecran_question()
        self.ecran_etape1()
        self.ecran_etape2()
        self.ecran_etape3()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsGraphiqueDefiCM1(StatsGraphiqueDefiBase):
    identite = "Maths CM1 — EleveAI"


class StatsGraphiqueDefiCM2(StatsGraphiqueDefiBase):
    """Même vidéo pour le CM2 : seule l'identité change."""

    identite = "Maths CM2 — EleveAI"
