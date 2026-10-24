# stats_nuage_construire.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# LYCÉE : CONSTRUIRE UN NUAGE DE POINTS à partir d'un tableau (micros du coach :
# 1re info_nuage_construire « Construire un nuage de points à partir d'un tableau
# de données » ; STMG statT_nuage_representer « Représenter un nuage de points
# associé à une série statistique à deux variables quantitatives »), AVEC VOIX.
# ÉPISODE COMMUN : 1re 12-nuage-construire ⇄ STMG 17-nuage-representer (une voix,
# un script, deux rendus ; la voix ne cite aucune classe).
# Paysage 16:9. CEINTURES : 1re VERTE, STMG VERTE (la paysage complète du
# niveau : choisir les axes, placer, piège de l'inversion, CONTRÔLER le nuage
# d'un autre, retrouver l'individu d'un point ; étoile 2 dans les deux banques).
# Short jumeau : stats_nuage_construire_short.py (ORANGE, un cran plus bas).
#
# ⭐ Décor et métier : les TRANSPORTS (centre d'intérêt : transports) ; une
# INGÉNIEURE DES TRANSPORTS compare les lignes du métro de Paris (problématique :
# représenter pour décider ; touche locale remplaçable : un autre réseau).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : longueur (km) et nombre de stations
# des lignes du métro de Paris, tableau « Lines » de
# https://en.wikipedia.org/wiki/Paris_M%C3%A9tro (consulté le 24/10/2026) :
#   3bis 1,3 km / 4 · 7bis 3,1 / 8 · 10 11,7 / 23 · 4 14,0 / 29 · 1 16,6 / 25 ·
#   12 17,2 / 31 · 9 19,6 / 37 · 13 24,4 / 32 ; défi : 5 14,6 / 22 · 8 23,4 / 38 ;
#   short : 6 13,6 / 28. Longueurs ARRONDIES au km (dit dans la voix) :
#   (1 ; 4) (3 ; 8) (12 ; 23) (14 ; 29) (17 ; 25) (17 ; 31) (20 ; 37) (24 ; 32),
#   défi (15 ; 22) (23 ; 38), short (14 ; 28). (La ligne 14 est écartée : 20 ou
#   21 stations selon les sections de l'article.)
# ⭐ Figures du coach : `tableau_donnees` (une colonne = un individu, comme
# canvasNuageTableau en 1re et canvasTableauNuage en STMG) et `fonctionGraphique`
# (Nuage de stats_lycee_h2_commun.py). ⛔ PAS D'ÉCART : chaque nombre au mot.
#
# Mapping micro → écrans : info_nuage_construire_coord / statT tpl_1 (les
# coordonnées d'une colonne) → 04, question 06 · info_nuage_construire_erreur /
# statT tpl_2 (contrôler un report) → 08 · info_nuage_construire_individu →
# question 09 · erreur typique « abscisse et ordonnée inversées » → 07.
# Écrans : 00 garde · 01 l'ingénieure · 02 le tableau · 03 les axes · 04 placer
# (ligne 4, ligne 1) · 05 tous les points · 06 QUESTION · 07 le piège · 08 le
# nuage du stagiaire · 09 QUESTION · 10 défi · 10b correction · 11 ce que tu as
# appris · 12 fin (règle du 19/10).
#
# Voix : manim/voix/lycee-stats-nuage-construire.json (débit −7) ; marques :
# manim/scripts/stmg/stats_nuage_construire_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_nuage_construire.py StatsNuageConstruirePremiere -o eleveai-maths-premiere-commun-stats-nuage-construire --media_dir manim/scripts/stmg/media-stats-nuage-construire-1re
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_nuage_construire.py StatsNuageRepresenterStmg -o eleveai-maths-stmg-stats-nuage-representer --media_dir manim/scripts/stmg/media-stats-nuage-construire-stmg
# Sorties : manim/sorties/premiere-commun/maths/statistiques/12-nuage-construire/eleveai-maths-premiere-commun-stats-nuage-construire.mp4
#           manim/sorties/stmg/maths/statistiques/17-nuage-representer/eleveai-maths-stmg-stats-nuage-representer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403

LIGNES = ["3bis", "7bis", "10", "4", "1", "12", "9", "13"]
KM = [1, 3, 12, 14, 17, 17, 20, 24]
STATIONS = [4, 8, 23, 29, 25, 31, 37, 32]
METRO = "#2563eb"
GN = P(-3.55, -1.05)   # le centre du nuage (sous le tableau)


def rame(l=1.6):
    """Une rame de métro de profil : caisse, fenêtres, roues."""
    caisse = RoundedRectangle(width=l, height=0.55, corner_radius=0.15, fill_color=METRO, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=3)
    fen = VGroup(*[RoundedRectangle(width=0.22, height=0.2, corner_radius=0.04, fill_color="#e0f2fe",
                                    fill_opacity=1, stroke_width=0) for _ in range(int(l / 0.35))])
    fen.arrange(RIGHT, buff=0.1).move_to(caisse).shift(UP * 0.07)
    roues = VGroup(*[Circle(radius=0.08, fill_color=GREY_D, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
                     for _ in range(4)]).arrange(RIGHT, buff=(l - 0.64) / 3 * 0.8).next_to(caisse, DOWN, buff=-0.05)
    return VGroup(caisse, fen, roues)


class StatsNuageConstruireBase(PaysageH2):
    nom_voix = "lycee-stats-nuage-construire"
    fichier_marques = "stats_nuage_construire_marques.json"

    def tableau(self, fs=24, centre=P(0, 2.95), colonnes=None):
        cols = range(len(LIGNES)) if colonnes is None else colonnes
        tb = Tableau([LIGNES[c] for c in cols], [[KM[c] for c in cols], [STATIONS[c] for c in cols]],
                     libelles=["Longueur (km)", "Stations"], coin="Ligne", largeur_case=0.95,
                     largeur_libelle=2.75, hauteur=0.5, fs=fs, centre=centre)
        if tb.get_top()[1] > self.BORD_Y:  # jamais collé au bord du haut
            tb.shift(DOWN * (tb.get_top()[1] - self.BORD_Y))
        return tb

    def nuage(self, xs=KM, ys=STATIONS, centre=GN):
        n = Nuage(xs, ys, 0, 25, 0, 40, pas_x=5, pas_y=5, largeur=5.0, hauteur=3.55, nom_x="Longueur (km)",
                  nom_y="Stations", fs=24, rayon=0.085, centre=centre)
        if centre is GN:  # sous le tableau du haut
            return self.cadrer(n, haut=1.3)
        return self.cadrer(n)

    def coord(self, x, y, fs=50, cx=ORANGE_V, cy=VIOLET_CLAIR):
        return self.ligne([("(", WHITE), (str(x), cx), (";", WHITE), (str(y), cy), (")", WHITE)], fs, 0.12)

    def placer(self, n, i, run=0.6):
        """Les deux flèches : j'avance (orange) puis je monte (violet) ; le point."""
        x, y = KM[i], STATIONS[i]
        av = Arrow(n.p(0, 0), n.p(x, 0), buff=0, color=ORANGE_V, stroke_width=6, max_tip_length_to_length_ratio=0.12)
        mo = Arrow(n.p(x, 0), n.p(x, y), buff=0, color=VIOLET_H, stroke_width=6, max_tip_length_to_length_ratio=0.12)
        return av, mo

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Construire un nuage de points", self.identite, self.ceinture)
        tb = self.tableau(fs=18, centre=P(-3.2, 0.3), colonnes=[0, 1, 2, 3])
        tb.scale_to_fit_width(4.2).move_to(P(-3.1, 0.25))
        n = Nuage(KM, STATIONS, 0, 25, 0, 40, largeur=2.6, hauteur=1.9, fs=16, centre=P(2.4, 0.15))
        fl = Arrow(tb.get_right(), n.get_left(), buff=0.25, color=AMBRE, stroke_width=7)
        self.au_mot("Construire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Du tableau")
        self.play(FadeIn(tb, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("au dessin")
        self.play(GrowArrow(fl), FadeIn(n.fond), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(r, scale=0.2) for r in n.ronds], lag_ratio=0.15), run_time=0.5)
        self.au_mot("où va chaque point")
        q = self.t("?", 80, ORANGE_RETENUE).next_to(n, RIGHT, buff=0.3)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'ingénieure des transports ────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        voie = Line(P(-6.6, 0.9), P(-0.6, 0.9), color=GREY_B, stroke_width=6)
        stations = VGroup(*[Dot(P(-6.2 + 1.1 * k, 0.9), radius=0.13, fill_color=WHITE, stroke_color=METRO,
                                stroke_width=4) for k in range(6)])
        r = rame().move_to(P(-5.6, 1.35))
        self.au_mot("Une ingénieure des transports")
        metier = self.bloc(["Ingénieure", "des transports"], 42, BLEU_CALCUL).move_to(P(-3.6, -0.7))
        self.play(Create(voie), FadeIn(stations), FadeIn(r, shift=RIGHT * 0.3), FadeIn(metier, shift=UP * 0.2),
                  run_time=0.8)
        self.au_mot("le métro de Paris")
        mp = self.col(self.t("Le métro de Paris", 50, JAUNE_TITRE), 2.2)
        self.play(Write(mp), r.animate.move_to(P(-1.6, 1.35)), run_time=1.4)
        self.au_mot("une ligne plus longue")
        q1 = self.col(self.bloc(["Une ligne plus longue", "a-t-elle plus de stations ?"], 38), 0.9)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), LaggedStart(*[Indicate(s, color=AMBRE) for s in stations],
                                                             lag_ratio=0.15), run_time=1.2)
        self.au_mot("elle construit un nuage")
        n = Nuage(KM, STATIONS, 0, 25, 0, 40, largeur=1.9, hauteur=1.2, fs=14, centre=P(2.6, -1.25))
        nom = self.t("un nuage de points", 34, ROUGE_PT).next_to(n, RIGHT, buff=0.3)
        if nom.get_right()[0] > 6.7:
            VGroup(n, nom).shift(LEFT * (nom.get_right()[0] - 6.6))
        self.play(FadeIn(n.fond), LaggedStart(*[FadeIn(p, scale=0.3) for p in n.ronds], lag_ratio=0.12),
                  FadeIn(nom), run_time=1.0)
        self.attendre_voix()

    # ── 02 : le tableau ─────────────────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        tb = self.tableau(fs=30, centre=P(0, 1.6))
        tb.scale_to_fit_width(12.6).move_to(P(0, 1.6))
        corps = VGroup(*[c[1] for rang in tb.cases for c in rang])
        self.au_mot("Voici 8 lignes")
        self.play(FadeIn(VGroup(tb.carte, tb.coin, tb.tetes, tb.libelles, *[c[0] for r in tb.cases for c in r]),
                         shift=DOWN * 0.2), run_time=0.6)
        n8 = self.ligne([("8", AMBRE), ("lignes de métro", WHITE)], 40).move_to(P(-3.4, -0.5))
        self.play(FadeIn(n8, shift=UP * 0.2), run_time=0.4)
        self.au_mot("sa longueur")
        self.play(Indicate(tb.libelles[0], color=AMBRE), LaggedStart(*[FadeIn(c[1]) for c in tb.cases[0]],
                                                                    lag_ratio=0.1), run_time=0.9)
        self.au_mot("au kilomètre près")
        pres = self.t("longueur arrondie au km près", 32, ORANGE_RETENUE).move_to(P(2.9, -0.5))
        self.play(FadeIn(pres), run_time=0.3)
        self.au_mot("son nombre de stations")
        self.play(Indicate(tb.libelles[1], color=AMBRE), LaggedStart(*[FadeIn(c[1]) for c in tb.cases[1]],
                                                                    lag_ratio=0.1), run_time=0.9)
        self.add(corps)
        self.au_mot("La ligne 3 bis")
        self.play(*tb.allumer_colonne(0), run_time=0.4)
        l1 = self.ligne([("Ligne 3bis :", WHITE), ("1", ORANGE_V), ("km,", WHITE), ("4", VIOLET_CLAIR),
                         ("stations", WHITE)], 38).move_to(P(0, -1.3))
        self.au_mot("1 kilomètre")
        self.play(FadeIn(l1[:3], shift=UP * 0.15), run_time=0.3)
        self.au_mot("4 stations")
        self.play(FadeIn(l1[3:], shift=UP * 0.15), run_time=0.3)
        self.au_mot("La ligne 13")
        self.play(*tb.eteindre(), run_time=0.2)
        self.play(*tb.allumer_colonne(7), run_time=0.35)
        l2 = self.ligne([("Ligne 13 :", WHITE), ("24", ORANGE_V), ("km,", WHITE), ("32", VIOLET_CLAIR),
                         ("stations", WHITE)], 38).next_to(l1, DOWN, buff=0.3).align_to(l1, LEFT)
        self.au_mot("24 kilomètres")
        self.play(FadeIn(l2[:3], shift=UP * 0.15), run_time=0.3)
        self.au_mot("32 stations")
        self.play(FadeIn(l2[3:], shift=UP * 0.15), run_time=0.3)
        self.au_mot("Une colonne du tableau")
        cadre = SurroundingRectangle(VGroup(tb.tetes[7], tb.cases[1][7]), color=ROUGE_PT, buff=0.06, stroke_width=6)
        regle = self.ligne([("1 colonne", AMBRE), ("=", WHITE), ("1 ligne de métro", WHITE), ("=", WHITE),
                            ("1 point", ROUGE_PT)], 40).move_to(P(-0.4, -2.9))
        self.play(Create(cadre), FadeIn(regle[:3], shift=UP * 0.2), run_time=0.5)
        self.au_mot("donc un point")
        self.play(FadeIn(regle[3:], shift=UP * 0.2), run_time=0.4)
        self.insister(regle[4], 1.4, 0.25)
        self.attendre_voix()

    def petit_tableau(self):
        """Le tableau réduit au-dessus du nuage, à gauche (écrans de question)."""
        tb = self.tableau()
        return tb.scale_to_fit_width(6.3).move_to(P(-3.6, 2.85))

    # ── la mise en page commune : tableau en haut, nuage en bas à gauche ────

    def decor(self, points=True, xs=KM, ys=STATIONS):
        tb = self.tableau()
        n = self.nuage(xs, ys)
        self.add(tb, n.fond)
        if points:
            self.add(n.ronds)
        return tb, n

    # ── 03 : les axes ───────────────────────────────────────────────────────

    def ecran_axes(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-axes")
        tb = self.tableau()
        n = self.nuage()
        self.add(tb)
        self.au_mot("On étudie les stations")
        l0 = self.col(self.bloc(["les stations", "en fonction de la longueur"], 36), 0.75)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("La longueur va en abscisse")
        base = VGroup(n.carte, n.grille, n.axe_x, n.axe_y)
        self.play(FadeIn(base), *tb.allumer_ligne(0), run_time=0.5)
        l1 = self.col(self.ligne([("abscisse :", ORANGE_V), ("la longueur", WHITE)], 36), -0.3)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), FadeIn(n.nom_x), Indicate(n.axe_x, color=ORANGE_V), run_time=0.6)
        self.au_mot("de 0 à 25")
        self.play(LaggedStart(*[FadeIn(v, scale=1.4) for v in n.nx.values()], lag_ratio=0.15), run_time=0.9)
        self.au_mot("Les stations vont en ordonnée")
        self.play(*tb.eteindre(), run_time=0.2)
        self.play(*tb.allumer_ligne(1), run_time=0.3)
        l2 = self.col(self.ligne([("ordonnée :", VIOLET_CLAIR), ("les stations", WHITE)], 36), -1.1)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), FadeIn(n.nom_y), Indicate(n.axe_y, color=VIOLET_H), run_time=0.6)
        self.au_mot("de 0 à 40")
        self.play(LaggedStart(*[FadeIn(v, scale=1.4) for v in n.ny.values()], lag_ratio=0.12), run_time=0.9)
        self.au_mot("Un carreau vaut 1")
        a, b = n.p(0, 0), n.p(1, 1)
        car = Rectangle(width=b[0] - a[0], height=b[1] - a[1], stroke_color=AMBRE, stroke_width=3,
                        fill_color=AMBRE, fill_opacity=0.6).move_to((a + b) / 2)
        l3 = self.col(self.ligne([("1 carreau", AMBRE), ("=", WHITE), ("1", AMBRE)], 38), -1.95)
        self.play(FadeIn(car), FadeIn(l3, shift=RIGHT * 0.2), *tb.eteindre(), run_time=0.4)
        self.play(car.animate.scale(3), run_time=0.3)
        self.play(car.animate.scale(1 / 3), run_time=0.3)
        self.attendre_voix()

    # ── 04 : placer la ligne 4, puis la ligne 1 ─────────────────────────────

    def ecran_placer(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-placer")
        tb, n = self.decor(points=False)
        self.au_mot("Plaçons la ligne 4")
        self.play(*tb.allumer_colonne(3), run_time=0.4)
        l0 = self.col(self.t("Ligne 4", 44, JAUNE_TITRE), 0.85)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("J'avance de 14")
        av, mo = self.placer(n, 3)
        self.play(GrowArrow(av), FadeIn(n.lu_x(14), scale=1.5), run_time=0.7)
        self.au_mot("je monte jusqu'à 29")
        self.play(GrowArrow(mo), run_time=0.7)
        self.play(FadeIn(n.vers_y(3)), FadeIn(n.lu_y(29), scale=1.5), run_time=0.4)
        self.au_mot("et je place le point")
        self.play(FadeIn(n.ronds[3], scale=3), run_time=0.4)
        self.play(Flash(n.ronds[3], color=ROUGE_PT, line_length=0.15), run_time=0.4)
        self.au_mot("14 point-virgule 29")
        c = self.col(self.coord(14, 29), -0.15)
        self.play(FadeIn(c, scale=0.7), run_time=0.4)
        self.au_mot("Puis la ligne 1")
        self.play(*tb.eteindre(), run_time=0.2)
        self.play(*tb.allumer_colonne(4), FadeOut(VGroup(av, mo)), run_time=0.35)
        av1, mo1 = self.placer(n, 4)
        self.au_mot("17 point-virgule")
        c1 = self.col(self.ligne([("Ligne 1 :", WHITE)], 38), -1.25)
        c2 = self.coord(17, 25).next_to(c1, RIGHT, buff=0.25)
        self.play(GrowArrow(av1), FadeIn(c1), FadeIn(c2[:2]), run_time=0.4)
        self.au_mot("25.")
        self.play(GrowArrow(mo1), FadeIn(c2[2:]), run_time=0.4)
        self.play(FadeIn(n.ronds[4], scale=3), run_time=0.3)
        self.attendre_voix()

    # ── 05 : tous les points ────────────────────────────────────────────────

    def ecran_tous(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-tous")
        tb, n = self.decor(points=False)
        self.add(n.ronds[3], n.ronds[4])
        self.au_mot("colonne par colonne")
        reste = [0, 1, 2, 5, 6, 7]
        for i in reste:
            self.play(*tb.eteindre(), run_time=0.05)
            self.play(*tb.allumer_colonne(i), FadeIn(n.ronds[i], scale=3), run_time=0.35)
        self.play(*tb.eteindre(), run_time=0.2)
        self.au_mot("8 colonnes")
        l1 = self.col(self.ligne([("8", AMBRE), ("colonnes", WHITE)], 44), 0.7)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Indicate(tb.tetes, color=AMBRE), run_time=0.5)
        self.au_mot("8 points")
        l2 = self.col(self.ligne([("8", ROUGE_PT), ("points", WHITE)], 44), -0.3)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), LaggedStart(*[Indicate(r, color=AMBRE, scale_factor=1.8)
                                                              for r in n.ronds], lag_ratio=0.08), run_time=0.9)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (la ligne 9) ────────────────────────────────────────

    def ecran_question1(self):
        tb = self.petit_tableau()
        n = self.nuage()
        fig = VGroup(tb, n.fond, *[n.ronds[i] for i in range(8) if i != 6])

        def montrer(s):
            s.play(*tb.allumer_colonne(6), run_time=0.4)

        def reponse(s):
            av, mo = self.placer(n, 6)
            s.play(GrowArrow(av), run_time=0.4)
            s.play(GrowArrow(mo), run_time=0.4)
            s.play(FadeIn(n.ronds[6], scale=3), run_time=0.3)

        self.ecran_question("06-question", "06b-reponse", ["Où placer la ligne 9 :", "20 km, 37 stations ?"],
                            [self.coord(37, 20, 34, WHITE, WHITE), self.coord(20, 37, 34, WHITE, WHITE),
                             self.coord(20, 27, 34, WHITE, WHITE)], 1,
                            ["A inverse les deux nombres,", "C s'arrête 10 stations trop bas."],
                            figure=fig, autres_q=montrer, autres_r=reponse, mot_q="Où placer")

    # ── 07 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        tb, n = self.decor()
        self.au_mot("Le piège")
        tit = self.col(self.t("Le piège : inverser", 46, ROUGE_ERREUR), 0.85)
        self.play(Write(tit), *tb.allumer_colonne(3), n.allumer(3), run_time=0.5)
        self.au_mot("29 point-virgule 14")
        c = self.col(self.coord(29, 14, 50, WHITE, WHITE), 0.0)
        self.play(FadeIn(c, scale=0.7), run_time=0.4)
        self.au_mot("le point sort même du graphique")
        fant = Circle(radius=0.14, stroke_color=ROUGE_ERREUR, stroke_width=5).move_to(n.p(29, 14))
        fl = DashedLine(n.p(0, 14), n.p(29, 14), color=ROUGE_ERREUR, stroke_width=3, dash_length=0.1)
        self.play(Create(fl), Create(fant), run_time=0.7)
        self.play(Flash(fant, color=ROUGE_ERREUR), run_time=0.4)
        self.au_mot("s'arrête à 25")
        self.play(n.nx[25].animate.scale(2).set_color(ROUGE_ERREUR), run_time=0.3)
        self.play(n.nx[25].animate.scale(0.5), run_time=0.3)
        self.play(Create(croix(c, sw=6)), Create(croix(fant.copy().scale(1.2), sw=5)), run_time=0.4)
        self.au_mot("La colonne se lit de haut en bas")
        fl2 = Arrow(tb.case(0, 3).get_top() + UP * 0.05, tb.case(1, 3).get_bottom() + DOWN * 0.05, buff=0,
                    color=AMBRE, stroke_width=6).next_to(tb.case(0, 3), RIGHT, buff=0.02)
        fl2.set_y((tb.case(0, 3).get_y() + tb.case(1, 3).get_y()) / 2)
        self.play(GrowArrow(fl2), run_time=0.4)
        self.au_mot("l'abscisse, puis l'ordonnée")
        regle = self.col(VGroup(self.ligne([("en haut :", WHITE), ("l'abscisse", ORANGE_V)], 38),
                                self.ligne([("en bas :", WHITE), ("l'ordonnée", VIOLET_CLAIR)], 38)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.15), -1.25)
        self.play(FadeIn(regle, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 08 : le nuage du stagiaire ──────────────────────────────────────────

    def ecran_controle(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-controle")
        faux = STATIONS[:7] + [23]
        tb, n = self.decor(points=False, ys=faux)
        self.au_mot("Un stagiaire")
        l0 = self.col(self.t("Le nuage du stagiaire", 40, JAUNE_TITRE), 0.85)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(r, scale=0.3) for r in n.ronds],
                                                             lag_ratio=0.1), run_time=0.9)
        self.au_mot("un point est faux")
        l1 = self.col(self.t("un point est faux !", 38, ROUGE_ERREUR), 0.25)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("colonne par colonne")
        for i in range(7):
            self.play(*tb.allumer_colonne(i), Indicate(n.ronds[i], color=VERT_OK, scale_factor=2), run_time=0.22)
            self.play(*tb.eteindre(), run_time=0.05)
        self.au_mot("La ligne 13 doit être")
        self.play(*tb.allumer_colonne(7), run_time=0.3)
        c1 = self.col(self.ligne([("attendu :", WHITE)], 34), -0.5)
        c1b = self.coord(24, 32, 40).next_to(c1, RIGHT, buff=0.2)
        self.play(FadeIn(c1), FadeIn(c1b), run_time=0.4)
        bon = Circle(radius=0.13, stroke_color=VERT_OK, stroke_width=5).move_to(n.p(24, 32))
        self.play(Create(bon), run_time=0.3)
        self.au_mot("il l'a placée en")
        c2 = self.col(self.ligne([("tracé :", WHITE)], 34), -1.25)
        c2b = self.coord(24, 23, 40, ORANGE_V, ROUGE_ERREUR).next_to(c2, RIGHT, buff=0.2).align_to(c1b, LEFT)
        self.play(FadeIn(c2), FadeIn(c2b), n.allumer(7, ROUGE_ERREUR), run_time=0.45)
        self.au_mot("C'est ce point-là")
        fl = Arrow(n.p(24, 23), n.p(24, 32), buff=0.12, color=VERT_OK, stroke_width=6)
        self.play(GrowArrow(fl), run_time=0.5)
        self.play(n.ronds[7].animate.move_to(n.p(24, 32)), FadeOut(bon), run_time=0.6)
        self.play(Create(croix(c2b, sw=5)), run_time=0.3)
        self.attendre_voix()

    # ── 09 : QUESTION 2 (quel individu ?) ───────────────────────────────────

    def ecran_question2(self):
        tb = self.petit_tableau()
        n = self.nuage()
        fig = VGroup(tb, n.fond, n.ronds)

        def montrer(s):
            s.play(n.allumer(4), run_time=0.4)

        def reponse(s):
            s.play(*tb.allumer_colonne(4), run_time=0.4)
            s.play(Indicate(tb.cases[0][5], color=ORANGE_V), Indicate(tb.cases[1][5], color=ROUGE_ERREUR), run_time=0.6)

        self.ecran_question("09-question", "09b-reponse", ["Quelle ligne représente", "le point (17 ; 25) ?"],
                            ["la ligne 12", "la ligne 1", "la ligne 4"], 1,
                            ["Ligne 12 : 17 km, mais 31 stations.", "Il faut les deux nombres à la fois."],
                            figure=fig, autres_q=montrer, autres_r=reponse, mot_q="Quelle ligne")

    # ── 10 : défi ───────────────────────────────────────────────────────────

    def tableau_defi(self, y=0.3):
        tb = Tableau(["5", "8"], [[15, 23], [22, 38]], libelles=["Longueur (km)", "Stations"], coin="Ligne",
                     largeur_case=0.95, largeur_libelle=2.75, hauteur=0.5, fs=24)
        return self.col(tb, y)

    def nuage10(self):
        return self.nuage(KM + [15, 23], STATIONS + [22, 38])

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-defi")
        tb = self.tableau()
        n = self.nuage10()
        self.add(tb, n.fond, *n.ronds[:8])
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 48, JAUNE_TITRE), 0.85)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Place deux nouvelles lignes")
        td = self.tableau_defi(-0.65)
        self.play(FadeIn(VGroup(td.carte, td.coin, td.tetes, td.libelles, *[c[0] for r in td.cases for c in r]),
                         shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("La ligne 5")
        self.play(*td.allumer_colonne(0), run_time=0.3)
        self.au_mot("15 kilomètres")
        self.play(FadeIn(td.cases[0][0][1], scale=1.5), run_time=0.25)
        self.au_mot("22 stations")
        self.play(FadeIn(td.cases[1][0][1], scale=1.5), run_time=0.25)
        self.au_mot("La ligne 8")
        self.play(*td.eteindre(), run_time=0.15)
        self.play(*td.allumer_colonne(1), run_time=0.3)
        self.au_mot("23 kilomètres")
        self.play(FadeIn(td.cases[0][1][1], scale=1.5), run_time=0.25)
        self.au_mot("38 stations")
        self.play(FadeIn(td.cases[1][1][1], scale=1.5), run_time=0.25)
        self.au_mot("Mets pause")
        self.play(*td.eteindre(), run_time=0.15)
        pause = self.col(self.t("Mets pause, et place-les !", 38, ORANGE_RETENUE), -2.05)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10b-correction")
        tb = self.tableau()
        n = self.nuage10()
        self.add(tb, n.fond, *n.ronds[:8])
        titre = self.col(self.t("Correction", 48, JAUNE_TITRE), 0.85)
        td = self.tableau_defi(-0.65)
        self.add(td)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("La ligne 5")
        self.play(*td.allumer_colonne(0), run_time=0.35)
        self.au_mot("j'avance de 15")
        av = Arrow(n.p(0, 0), n.p(15, 0), buff=0, color=ORANGE_V, stroke_width=6, max_tip_length_to_length_ratio=0.12)
        self.play(GrowArrow(av), run_time=0.5)
        self.au_mot("je monte à 22")
        mo = Arrow(n.p(15, 0), n.p(15, 22), buff=0, color=VIOLET_H, stroke_width=6, max_tip_length_to_length_ratio=0.12)
        self.play(GrowArrow(mo), run_time=0.5)
        self.au_mot("le point 15")
        c1 = self.col(self.coord(15, 22, 40), -2.0)
        self.play(FadeIn(n.ronds[8], scale=3), FadeIn(c1, scale=0.7), run_time=0.4)
        self.au_mot("La ligne 8")
        self.play(*td.eteindre(), FadeOut(VGroup(av, mo)), run_time=0.2)
        self.play(*td.allumer_colonne(1), run_time=0.3)
        self.au_mot("23 point-virgule 38")
        c2 = self.coord(23, 38, 40).next_to(c1, RIGHT, buff=0.5)
        self.play(FadeIn(n.ronds[9], scale=3), FadeIn(c2, scale=0.7), Create(n.vers_x(9)), Create(n.vers_y(9)),
                  run_time=0.6)
        self.au_mot("tout en haut à droite")
        self.play(Flash(n.ronds[9], color=AMBRE), run_time=0.5)
        self.au_mot("Et regarde le nuage")
        self.play(*td.eteindre(), run_time=0.2)
        tend = Arrow(n.p(1, 2), n.p(24, 40), buff=0, color=VERT_OK, stroke_width=8, max_tip_length_to_length_ratio=0.06)
        tend.set_opacity(0.75)
        self.play(GrowArrow(tend), run_time=1.0)
        self.au_mot("plus une ligne est longue")
        l3 = self.col(self.bloc(["plus longue,", "plus de stations"], 34, VERT_OK), -2.85)
        self.play(FadeIn(l3, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("11-finale")
        n = self.nuage(centre=P(-3.55, -0.3))
        self.add(n)
        lignes = self.finale_colonne(figure=n, textes=[("Une colonne du tableau", "donne un point."),
                                      ("« En fonction de » quoi ?", "Ce caractère va en abscisse."),
                                      ("L'abscisse d'abord, puis l'ordonnée ;", "je vérifie chaque point.")])
        self.au_mot("Une colonne du tableau")
        self.montrer_ligne(lignes[0], n.allumer(3))
        self.au_mot("Le caractère en fonction")
        self.montrer_ligne(lignes[1], Indicate(n.nom_x, color=ORANGE_V, scale_factor=1.5))
        self.au_mot("Je place l'abscisse")
        self.montrer_ligne(lignes[2], Create(n.vers_x(3)), Create(n.vers_y(3)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_axes()
        self.ecran_placer()
        self.ecran_tous()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_controle()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class StatsNuageConstruirePremiere(StatsNuageConstruireBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"


class StatsNuageRepresenterStmg(StatsNuageConstruireBase):
    """Même vidéo pour la STMG : identité et ceinture seulement."""

    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
