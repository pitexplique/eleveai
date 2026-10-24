# stats_graphiques_usuels.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# épisode 02 : LES DIAGRAMMES USUELS (camembert et barres : lire, calculer,
# commenter). Micros du coach : 1re auto_stat_graphiques_usuels (« lire et
# commenter les graphiques usuels ») ⇄ STMG auto_stat_diagrammes_usuels (« lire
# un diagramme en barres ou circulaire »). AVEC VOIX. Paysage 16:9.
# CEINTURES : 1re ORANGE (commenter : l'écart de deux pourcentages en POINTS,
# deux crans au-dessus du « je vois ») ; STMG ORANGE (angle p × 3,6, part → effectif).
# Short jumeau : stats_graphiques_usuels_short.py (blanche).
#
# ⭐ Décor et métier : le CINÉMA ; un PROGRAMMATEUR de cinéma, qui choisit les
# films de ses salles (problématique : décider / commenter une évolution).
# Source : CNC, bilan 2024 (communiqué « Avec plus de 181 millions d'entrées en
# 2024… », cnc.fr, lu le 24/10/2026) : 181,3 millions d'entrées ; parts de marché
# 2024 : films français 44,4 %, américains 36,7 %, autres 18,9 % ; 2023 : 40,1 %,
# 41,2 %, 18,7 %.
# Centres d'intérêt : cinema-series.
# Calculs (vérifiés en Python) : 44,4 × 3,6 = 159,84 ≈ 160° · 44,4 + 18,9 = 63,3 ·
# 181,3 × 0,444 ≈ 80,5 · 44,4 − 40,1 = 4,3 points · 4,3 ÷ 40,1 ≈ 10,7 % ·
# 41,2 − 36,7 = 4,5 points · 181,3 × 0,367 ≈ 66,5 · 18,9 × 3,6 ≈ 68°.
#
# Mapping micro → écrans : plus grande part, lire les parts (stmg tpl_1, 1re
# usuels_camembert) → 02 · angle p × 3,6 (stmg tpl_3) → 03, défi 2 · deux parts
# réunies (stmg tpl_4, 1re usuels_camembert) → question 1 · part → effectif
# (stmg tpl_2) → 05, défi 1 · barres : lire, comparer, écart (1re usuels_calcul,
# usuels_batons) → 06 · commenter une évolution (1re usuels_affirmation) → 07, question 2.
# Écrans : 00 garde · 01 le programmateur, 181,3 millions d'entrées · 02 le
# camembert · 03 l'angle · 04 question 1 · 05 de la part à l'effectif · 06 deux
# années en barres · 07 le piège (points ≠ %) · 08 question 2 · 09 défi ·
# 09b correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/lycee-stats-graphiques-usuels.json (débit −7) ; calage :
# manim/scripts/stmg/stats_graphiques_usuels_marques.json. UNE voix, DEUX rendus.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_graphiques_usuels.py StatsGraphiquesUsuelsPremiere -o eleveai-maths-premiere-commun-stats-graphiques-usuels --media_dir manim/scripts/stmg/media-stats-graphiques-usuels-premiere
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_graphiques_usuels.py StatsGraphiquesUsuelsStmg -o eleveai-maths-stmg-stats-diagrammes-usuels --media_dir manim/scripts/stmg/media-stats-diagrammes-usuels-stmg
# Sorties : manim/sorties/premiere-commun/maths/statistiques/02-graphiques-usuels/
#           manim/sorties/stmg/maths/statistiques/02-diagrammes-usuels/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F403

NOMS = ["Français", "Américains", "Autres"]
P24 = [44.4, 36.7, 18.9]
P23 = [40.1, 41.2, 18.7]
COUL = ["#93c5fd", "#fca5a5", "#fcd34d"]
COUL_TXT = ["#93c5fd", "#fca5a5", "#fcd34d"]


def ecran_cinema(larg=4.6):
    """Une salle de cinéma : l'écran lumineux, trois rangées de fauteuils."""
    ecran = RoundedRectangle(width=larg, height=larg * 0.42, corner_radius=0.08, fill_color="#e0f2fe",
                             fill_opacity=1, stroke_color="#94a3b8", stroke_width=4)
    rideaux = VGroup(*[Rectangle(width=0.35, height=larg * 0.5, fill_color="#991b1b", fill_opacity=1, stroke_width=0)
                       .next_to(ecran, s, buff=0.02) for s in (LEFT, RIGHT)])
    rangs = VGroup()
    for k in range(3):
        n = 7 + k
        rang = VGroup(*[RoundedRectangle(width=0.42, height=0.32, corner_radius=0.08, fill_color="#b91c1c",
                                         fill_opacity=1, stroke_width=0) for _ in range(n)]).arrange(RIGHT, buff=0.1)
        rangs.add(rang)
    rangs.arrange(DOWN, buff=0.14).next_to(ecran, DOWN, buff=0.45)
    return VGroup(rideaux, ecran, rangs)


class StatsGraphiquesUsuelsBase(PaysageLycee):
    nom_voix = "lycee-stats-graphiques-usuels"
    fichier_marques = "stats_graphiques_usuels_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"
    G = P(-3.4, -0.35)

    def camembert(self, centre=None, rayon=1.9, fs=28, titre="Entrées 2024 (en %)"):
        cam = Camembert(NOMS, P24, rayon=rayon, couleurs=COUL, titre=titre, fs=fs,
                        centre=self.G if centre is None else centre)
        for t in cam.textes:  # les noms DEVANT les parts, même allumées (z_index 1)
            t.set_z_index(5)
        return cam

    def pct(self, cam, i, fs=26):
        """Le pourcentage décimal sous le nom de la part i (le coach n'écrit que des entiers)."""
        t = texte(f"{fr(P24[i])} %", fs, NUIT).set_stroke(WHITE, width=5, background=True)
        return t.next_to(cam.textes[i], DOWN, buff=0.06).set_z_index(5)

    def cam_pret(self, avec_pct=True):
        cam = self.camembert()
        self.add(cam)
        pcts = VGroup(*[self.pct(cam, i) for i in range(3)])
        if avec_pct:
            self.add(pcts)
        return cam, pcts

    def barres_annee(self, valeurs, titre, centre, largeur=3.6, hauteur=3.0, fs=24, noms=NOMS, couleurs=COUL):
        return Barres(noms, valeurs, pas=10, sous_pas=5, maxi=50, couleurs=couleurs, nom_axe="%", titre=titre,
                      largeur=largeur, hauteur=hauteur, fs=fs, centre=centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire les diagrammes usuels", self.identite, self.ceinture)
        cam = self.camembert(centre=P(-2.3, 0.1), rayon=1.0, fs=18, titre=None)
        g = self.barres_annee(P24, None, P(1.4, 0.1), largeur=2.4, hauteur=1.6, fs=18)
        self.au_mot("Les diagrammes usuels")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.6)
        self.au_mot("Un camembert")
        self.play(FadeIn(cam.fond), cam.apparaitre(run_time=0.8))
        self.au_mot("des barres")
        self.play(FadeIn(g.fond), g.pousser(run_time=0.7))
        self.au_mot("vraiment")
        q = self.t("?", 90, ORANGE_RETENUE).next_to(g, RIGHT, buff=0.45)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : le programmateur, 181,3 millions d'entrées ─────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        salle = ecran_cinema().move_to(P(-3.5, 0.6))
        self.au_mot("les cinémas français")
        self.play(FadeIn(salle, shift=UP * 0.3), run_time=0.7)
        self.au_mot("181,3 millions")
        nb = self.ligne([("181,3", JAUNE_TITRE), ("millions d'entrées", WHITE)], 36).move_to(P(-3.4, -2.35))
        self.play(FadeIn(nb, scale=0.7), run_time=0.4)
        self.insister(nb[0], 1.3, 0.25)
        self.au_mot("Un programmateur")
        metier = self.col(self.t("Programmateur de cinéma", 40, BLEU_CALCUL), 2.7, xl=0.4)
        role = self.bloc(["il choisit les films", "de ses salles"], 34).next_to(metier, DOWN, buff=0.25)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        self.au_mot("choisit les films")
        self.play(FadeIn(role, shift=UP * 0.2), run_time=0.4)
        self.au_mot("dans un diagramme circulaire")
        cam = self.camembert(centre=P(3.2, -1.0), rayon=1.15, fs=20)
        self.play(FadeIn(cam.fond, scale=0.9), run_time=0.3)
        self.play(cam.apparaitre(run_time=1.0))
        self.attendre_voix()

    # ── 02 : le camembert ───────────────────────────────────────────────────

    def ecran_camembert(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-camembert")
        cam = self.camembert()
        self.play(FadeIn(cam.fond, scale=0.95), cam.apparaitre(run_time=1.0))
        self.au_mot("une part du même total")
        t0 = self.col(self.t("Une part du même total", 40, JAUNE_TITRE), 2.6)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), run_time=0.4)
        lignes = []
        for i, (mot, y) in enumerate(zip(["44,4 %", "36,7 %", "18,9 %"], [1.55, 0.6, -0.35])):
            self.au_mot(mot)
            lg = self.col(self.ligne([(f"Films {NOMS[i].lower()} :" if i < 2 else "Autres films :", WHITE),
                                      (f"{fr(P24[i])} %", COUL_TXT[i])], 38), y)
            p = self.pct(cam, i)
            self.play(cam.focus(i, 0.35), FadeIn(lg, shift=RIGHT * 0.2), FadeIn(p, scale=1.5), run_time=0.45)
            self.add(p)
            lignes.append(lg)
        self.au_mot("le disque entier")
        tot = self.col(self.ligne([("Total :", WHITE), ("100 %", VERT_OK)], 44), -1.45)
        self.play(cam.rallumer(), FadeIn(tot, scale=0.7), run_time=0.5)
        self.insister(tot[1], 1.3, 0.25)
        self.attendre_voix()

    # ── 03 : l'angle ────────────────────────────────────────────────────────

    def ecran_angle(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-angle")
        cam, pcts = self.cam_pret()
        self.au_mot("360 degrés")
        l1 = self.col(self.ligne([("100 %", WHITE), ("→", GREY_B), ("360°", BLEU_CALCUL)], 46), 2.4)
        tour = Circle(radius=0.55, stroke_color=BLEU_CALCUL, stroke_width=7).move_to(cam.centre)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Create(tour), run_time=0.8)
        self.au_mot("Donc 1 %")
        l2 = self.col(self.ligne([("1 %", WHITE), ("→", GREY_B), ("3,6°", BLEU_CALCUL)], 46), 1.35)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), FadeOut(tour), run_time=0.5)
        self.insister(l2[2], 1.3, 0.25)
        self.au_mot("Le secteur des films français")
        self.play(cam.focus(0, 0.35), run_time=0.4)
        arc = Arc(radius=0.6, start_angle=PI / 2, angle=-P24[0] / 100 * TAU, arc_center=cam.centre,
                  stroke_color=AMBRE, stroke_width=8).set_z_index(3)
        self.play(Create(arc), run_time=0.8)
        self.au_mot("44,4 fois 3,6")
        l3 = self.col(self.ligne([("44,4", COUL_TXT[0]), ("×", WHITE), ("3,6", BLEU_CALCUL)], 46), 0.2)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("environ 160 degrés")
        r = self.col(self.ligne([("≈", WHITE), ("160°", VERT_OK)], 54), -0.9)
        lab = texte("160°", 30, NUIT).set_stroke(WHITE, 5, background=True)
        lab.move_to(cam.centre + np.array([0.75, 0.55, 0])).set_z_index(4)
        cadre = self.encadrer(VGroup(l3, r))
        self.play(FadeIn(r, scale=0.7), FadeIn(lab, scale=1.5), run_time=0.4)
        self.play(Create(cadre), run_time=0.4)
        self.insister(r[1], 1.3, 0.25)
        self.attendre_voix()

    # ── 04 : question 1 (deux parts réunies) ────────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        cam, pcts = self.cam_pret()
        self.question_pause("04-question", "04b-reponse", ["Ensemble, les films français", "et les autres films ?"],
                            ["63,3 %", "25,5 %", "36,7 %"], 0,
                            ["44,4 + 18,9 = 63,3 %", "B soustrait ; C : la part qui reste"],
                            avant=lambda: self.play(cam.estomper([0, 2], 0.3), run_time=0.4))

    # ── 05 : de la part à l'effectif ────────────────────────────────────────

    def ecran_effectif(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-effectif")
        cam, pcts = self.cam_pret()
        self.au_mot("Une part ne dit rien sans le total")
        t0 = self.col(self.bloc(["Une part ne dit rien", "sans le total"], 40, JAUNE_TITRE), 2.4)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("44,4 % de 181,3 millions")
        l1 = self.col(self.ligne([("44,4 %", COUL_TXT[0]), ("de", WHITE), ("181,3 millions", WHITE)], 40), 1.05)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), cam.focus(0, 0.35), run_time=0.5)
        self.au_mot("181,3 fois 0,444")
        l2 = self.col(self.ligne([("181,3", WHITE), ("×", WHITE), ("0,444", COUL_TXT[0])], 46), 0.05)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("environ 80,5 millions")
        r = self.col(self.ligne([("≈", WHITE), ("80,5", VERT_OK), ("millions", WHITE)], 50), -1.0)
        cadre = self.encadrer(VGroup(l2, r))
        self.play(FadeIn(r, scale=0.7), run_time=0.4)
        self.play(Create(cadre), run_time=0.4)
        self.insister(r[1], 1.3, 0.25)
        self.attendre_voix()

    # ── 06 : deux années, en barres ─────────────────────────────────────────

    def ecran_barres(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-barres")
        g23 = self.barres_annee(P23, "Entrées 2023 (en %)", P(-3.5, -0.6), largeur=4.3)
        g24 = self.barres_annee(P24, "Entrées 2024 (en %)", P(2.35, -0.6), largeur=4.3)
        self.au_mot("on passe aux barres")
        t0 = self.t("Comparer deux années : les barres", 42, JAUNE_TITRE).move_to(P(-0.6, 3.15))
        self.play(FadeIn(t0, shift=DOWN * 0.2), FadeIn(g23.fond), FadeIn(g24.fond), run_time=0.6)
        self.play(g23.pousser(run_time=0.8), g24.pousser(run_time=0.8))
        self.add(g23, g24)
        self.au_mot("En 2023")
        self.play(Indicate(g23.titre, color=AMBRE), run_time=0.5)
        self.au_mot("41,2 %")
        v1 = g23.valeur(1, fs=26)
        self.play(g23.focus(1, 0.35), FadeIn(v1, scale=1.6), run_time=0.4)
        self.au_mot("contre 40,1")
        v0 = g23.valeur(0, fs=26)
        self.play(g23.allumer(0), FadeIn(v0, scale=1.6), run_time=0.4)
        self.au_mot("En 2024")
        self.play(Indicate(g24.titre, color=AMBRE), run_time=0.5)
        self.au_mot("passent devant")
        self.play(g24.estomper([0, 1], 0.35), run_time=0.4)
        self.au_mot("44,4 % contre")
        w0 = g24.valeur(0, fs=26)
        self.play(g24.allumer(0), FadeIn(w0, scale=1.6), run_time=0.4)
        self.au_mot("contre 36,7")
        w1 = g24.valeur(1, fs=26)
        self.play(FadeIn(w1, scale=1.6), run_time=0.4)
        self.insister(w0, 1.4, 0.25)
        self.attendre_voix()

    # ── 07 : le piège (points ≠ pourcentage) ────────────────────────────────

    def barres_deux(self, valeurs, titre, couleur, centre=None):
        """Une catégorie, deux années (2023, 2024), valeurs écrites (déjà dites)."""
        g = Barres(["2023", "2024"], valeurs, pas=10, sous_pas=5, maxi=50, couleurs=[couleur] * 2, nom_axe="%",
                   titre=titre, largeur=3.2, hauteur=3.6, fs=28, centre=self.G if centre is None else centre)
        return g

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        g = self.barres_deux([40.1, 44.4], "Films français", COUL[0])
        self.add(g, g.valeur(0, fs=28), g.valeur(1, fs=28))
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.1)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("a augmenté de 4,3 %")
        faux = self.col(self.ligne([("« + 4,3 % »", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 44), 2.35)
        self.play(FadeIn(faux, scale=0.7), run_time=0.4)
        self.au_mot("Faux")
        x = croix(faux[0], sw=6)
        self.play(Create(x), run_time=0.4)
        self.au_mot("44,4 moins 40,1")
        l1 = self.ligne([("44,4", WHITE), ("−", WHITE), ("40,1", WHITE)], 44)
        r1 = self.ligne([("=", WHITE), ("4,3 points", VERT_OK)], 44).next_to(l1, RIGHT, buff=0.25)
        self.col(VGroup(l1, r1), 1.35)
        ecart = DoubleArrow(P(g.barres[1].get_right()[0] + 0.15, g.point(0)[1]),
                            P(g.barres[1].get_right()[0] + 0.15, g.point(1)[1]), buff=0, color=VERT_OK,
                            stroke_width=6, tip_length=0.14, max_tip_length_to_length_ratio=0.3)
        niveau = DashedLine(g.barres[0].get_corner(UR), P(g.barres[1].get_right()[0] + 0.15, g.point(0)[1]),
                            color=AMBRE, stroke_width=5, dash_length=0.1)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Create(niveau), GrowFromCenter(ecart), run_time=0.6)
        self.au_mot("égale 4,3 points")
        self.play(FadeIn(r1, scale=0.7), run_time=0.4)
        self.insister(r1[1], 1.25, 0.25)
        self.au_mot("se compte en points")
        regle = self.col(self.bloc(["écart de deux %", "= des points"], 36, AMBRE), 0.3)
        self.play(FadeIn(regle, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("4,3 divisé par 40,1")
        l2 = self.ligne([("4,3", WHITE), ("÷", WHITE), ("40,1", WHITE)], 44)
        r2 = self.ligne([("≈", WHITE), ("10,7 %", VERT_OK)], 44).next_to(l2, RIGHT, buff=0.25)
        self.col(VGroup(l2, r2), -0.85)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("environ 10,7 %")
        lbl = self.t("en %", 30, GREY_A).next_to(r2, DOWN, buff=0.12).align_to(r2, LEFT)
        self.play(FadeIn(r2, scale=0.7), FadeIn(lbl), run_time=0.4)
        self.insister(r2[1], 1.25, 0.25)
        self.attendre_voix()

    # ── 08 : question 2 ─────────────────────────────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.barres_deux([41.2, 36.7], "Films américains", COUL[1])
        self.add(g, g.valeur(0, fs=28), g.valeur(1, fs=28))
        self.question_pause("08-question", "08b-reponse", ["De 2023 à 2024, la part", "des films américains…"],
                            ["a baissé de 4,5 points", "a baissé de 4,5 %", "a augmenté de 4,5 points"], 0,
                            ["41,2 − 36,7 = 4,5 points", "B : points ≠ % ; C : la part baisse"])

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        cam, pcts = self.cam_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Un : en 2024")
        q1 = self.col(VGroup(self.ligne([("1.", AMBRE), ("Combien d'entrées pour", WHITE)], 38),
                             self.t("les films américains ?", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.15), 1.35)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), cam.focus(1, 0.35), run_time=0.6)
        self.au_mot("Deux : quel angle")
        q2 = self.col(VGroup(self.ligne([("2.", AMBRE), ("Quel angle pour", WHITE)], 38),
                             self.t("les autres films ?", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.15), -0.15)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), cam.focus(2, 0.35), run_time=0.6)
        self.au_mot("Mets pause")
        pause = self.col(VGroup(icone_pause(0.36), self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE))
                         .arrange(RIGHT, buff=0.2), -1.5)
        self.play(Write(pause), cam.rallumer(), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        cam, pcts = self.cam_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("181,3 fois 0,367")
        c1 = self.col(self.ligne([("1.", AMBRE), ("181,3", WHITE), ("×", WHITE), ("0,367", COUL_TXT[1])], 42), 1.7)
        self.play(FadeIn(c1, shift=RIGHT * 0.2), cam.focus(1, 0.35), run_time=0.5)
        self.au_mot("environ 66,5 millions")
        r1 = self.col(self.ligne([("≈", WHITE), ("66,5", VERT_OK), ("millions d'entrées", WHITE)], 42), 0.85)
        self.play(FadeIn(r1, scale=0.7), run_time=0.4)
        self.insister(r1[1], 1.3, 0.25)
        self.au_mot("18,9 fois 3,6")
        c2 = self.col(self.ligne([("2.", AMBRE), ("18,9", COUL_TXT[2]), ("×", WHITE), ("3,6", BLEU_CALCUL)], 42),
                      -0.3)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), cam.focus(2, 0.35), run_time=0.5)
        self.au_mot("environ 68 degrés")
        r2 = self.col(self.ligne([("≈", WHITE), ("68°", VERT_OK)], 46), -1.15)
        debut = PI / 2 - (P24[0] + P24[1]) / 100 * TAU
        arc = Arc(radius=0.6, start_angle=debut, angle=-P24[2] / 100 * TAU, arc_center=cam.centre,
                  stroke_color=AMBRE, stroke_width=8).set_z_index(3)
        self.play(FadeIn(r2, scale=0.7), Create(arc), run_time=0.5)
        self.insister(r2[1], 1.3, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        cam, pcts = self.cam_pret()
        lignes = self.finale([("Parts additionnées ;", "1 % = 3,6°"), ("Effectif = part", "appliquée au total"),
                              ("Écart de deux %", "= des points")], [1.75, 0.15, -1.45])
        self.au_mot("elles s'additionnent")
        self.montrer_ligne(lignes[0], cam.estomper([0, 2], 0.35))
        self.au_mot("1 % fait 3,6 degrés")
        self.insister(lignes[0][1][1], 1.2, 0.25)
        self.au_mot("Pour un effectif")
        self.montrer_ligne(lignes[1], cam.focus(0, 0.35))
        self.au_mot("l'écart de deux pourcentages")
        self.montrer_ligne(lignes[2], cam.rallumer())
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_camembert()
        self.ecran_angle()
        self.ecran_question1()
        self.ecran_effectif()
        self.ecran_barres()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsGraphiquesUsuelsPremiere(StatsGraphiquesUsuelsBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"


class StatsGraphiquesUsuelsStmg(StatsGraphiquesUsuelsBase):
    """Même vidéo pour la STMG (micro auto_stat_diagrammes_usuels)."""

    identite = "Maths STMG — EleveAI"
    ceinture = "orange"
