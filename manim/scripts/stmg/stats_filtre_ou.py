# stats_filtre_ou.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# LYCÉE : FILTRER AVEC OU (micros du coach : 1re info_filtre_ou, STMG
# don_filtre_ou ; « Utiliser un filtre avec OU (l'un des critères au moins) »),
# AVEC VOIX. ÉPISODE COMMUN : 1re 16-filtre-ou ⇄ STMG 15-filtre-ou (une voix, un
# script, deux rendus ; la voix ne cite aucune classe).
# Paysage 16:9. CEINTURES : 1re BLEUE, STMG BLEUE (le OU inclusif et la case
# comptée deux fois : étoile 3 dans les deux banques, au-dessus de la verte du
# niveau). Short jumeau : stats_filtre_ou_short.py (VERTE).
#
# ⭐ Décor et métier : l'ARCHITECTURE (centre d'intérêt : art-design) ; un
# ARCHITECTE prépare une exposition sur les gratte-ciel (problématique : réunir
# deux sélections sans compter deux fois).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : hauteur architecturale (m) et
# année d'achèvement, https://en.wikipedia.org/wiki/List_of_tallest_buildings
# (consulté le 24/10/2026) : Burj Khalifa 828 (2010) · Merdeka 118 678,9 (2024) ·
# Shanghai Tower 632 (2015) · Lotte World Tower 554,5 (2017) · One World Trade
# Center 541,3 (2014) · Taipei 101 508 (2004) · Central Park Tower 472,4 (2021) ·
# Tours Petronas 451,9 (1998, tour 1) · Willis Tower 442,1 (1974) · Empire State
# Building 381 (1931). Hauteurs arrondies au mètre (dit dans la voix).
#   Filtres : ≥ 500 → 6 ; Amérique → 4 ; ≥ 500 OU Amérique → 6 + 4 − 1 = 9
#   (One World Trade Center dans les deux) · Asie OU Année < 2000 → 6 + 3 − 1 = 8
#   (Petronas) · Amérique OU < 500 → 4 + 4 − 3 = 5 · Asie OU < 500 → 9 · Asie OU
#   Amérique → 10 (rien à retirer) ; short : ≥ 600 OU < 2000 → 6. Aucune hauteur
#   ni année n'est égale à un seuil.
#   Tableau croisé (Continent × Hauteur) : Asie 5 · 1 (6) ; Amérique 1 · 3 (4) ;
#   ≥ 500 : 6, < 500 : 4, total 10.
# ⭐ Figures du coach : `tableau_donnees` (canvasFichier) et tableau croisé avec
# marges. ⛔ PAS D'ÉCART : chaque nombre au mot. Filtres écrits comme au tableur.
#
# Mapping micro → écrans : info_filtre_ou_fichier → 03, 04, question 05 ·
# info_filtre_ou_croise / STMG tpl_1 → 06, 07, question 08 · STMG tpl_2
# (diagnostiquer le compte du stagiaire) et info_filtre_ou_lignes (deux
# modalités du même caractère) → défi 09.
# Écrans : 00 garde · 01 l'architecte · 02 le fichier · 03 OU · 04 la tour
# comptée deux fois · 05 QUESTION · 06 ligne + colonne · 07 le piège · 08
# QUESTION · 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/lycee-stats-filtre-ou.json (débit −7) ; marques :
# manim/scripts/stmg/stats_filtre_ou_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_filtre_ou.py StatsFiltreOuPremiere -o eleveai-maths-premiere-commun-stats-filtre-ou --media_dir manim/scripts/stmg/media-stats-filtre-ou-1re
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_filtre_ou.py StatsFiltreOuStmg -o eleveai-maths-stmg-stats-filtre-ou --media_dir manim/scripts/stmg/media-stats-filtre-ou-stmg
# Sorties : manim/sorties/premiere-commun/maths/statistiques/16-filtre-ou/eleveai-maths-premiere-commun-stats-filtre-ou.mp4
#           manim/sorties/stmg/maths/statistiques/15-filtre-ou/eleveai-maths-stmg-stats-filtre-ou.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403

TOURS = ["Burj Khalifa", "Merdeka 118", "Shanghai Tower", "Lotte World Tower", "One World Trade Center",
         "Taipei 101", "Central Park Tower", "Tours Petronas", "Willis Tower", "Empire State Building"]
HAUT = [828, 679, 632, 555, 541, 508, 472, 452, 442, 381]
CONT = ["Asie", "Asie", "Asie", "Asie", "Amérique", "Asie", "Amérique", "Asie", "Amérique", "Amérique"]
ANNEE = [2010, 2024, 2015, 2017, 2014, 2004, 2021, 1998, 1974, 1931]
N = len(TOURS)
GRANDES = [i for i in range(N) if HAUT[i] >= 500]          # 0..5
AMERIQUE = [i for i in range(N) if CONT[i] == "Amérique"]  # 4, 6, 8, 9
OWTC = 4
ASIE_OU_VIEILLE = [i for i in range(N) if CONT[i] == "Asie" or ANNEE[i] < 2000]   # 8 tours


def tour(h=2.4, l=0.5, couleur="#60a5fa"):
    """Un gratte-ciel stylisé : le fût, les fenêtres, la flèche."""
    fut = Rectangle(width=l, height=h, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    fen = VGroup(*[Line(P(-l * 0.3, -h / 2 + k * h / 9), P(l * 0.3, -h / 2 + k * h / 9), color="#1e3a8a",
                        stroke_width=2) for k in range(1, 9)])
    fleche = Line(fut.get_top(), fut.get_top() + UP * h * 0.15, color=WHITE, stroke_width=3)
    return VGroup(fut, fen, fleche)


class StatsFiltreOuBase(PaysageH2):
    nom_voix = "lycee-stats-filtre-ou"
    fichier_marques = "stats_filtre_ou_marques.json"
    XL = 1.55

    def tableur(self):
        tb = fichier("Tour", TOURS, ["Hauteur (m)", "Continent", "Année"],
                     [[HAUT[i], CONT[i], str(ANNEE[i])] for i in range(N)], fs=24, largeur_id=3.7,
                     largeurs=[1.7, 1.7, 1.2])
        return self.cadrer(tb, droite=1.3)

    def croise(self, fs=30):
        cr = croise(["Asie", "Amérique"], ["≥ 500 m", "< 500 m"], [[5, 1], [1, 3]], fs=fs, coin="Continent",
                    largeur_case=1.75, largeur_libelle=2.8)
        return self.cadrer(cr, droite=1.3)

    def ou_filtres(self, f1, f2, y=2.95, fs=30, mot="OU"):
        b1 = barre_filtre(f1, fs)
        ou = Text(mot, font_size=38, color=AMBRE, weight=BOLD)
        b2 = barre_filtre(f2, fs)
        g = self.col(VGroup(b1, ou, b2).arrange(DOWN, aligned_edge=LEFT, buff=0.12), 0)
        return g.align_to(P(0, y + 0.3), UP)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Filtrer avec OU", self.identite, self.ceinture)
        c1 = Circle(radius=1.05, stroke_color=ORANGE_V, stroke_width=6).shift(LEFT * 0.65)
        c2 = Circle(radius=1.05, stroke_color=VIOLET_H, stroke_width=6).shift(RIGHT * 0.65)
        cercles = VGroup(c1, c2).move_to(P(-0.6, 0.1))
        union = Union(c1, c2, fill_color=AMBRE, fill_opacity=0.55, stroke_width=0)
        self.au_mot("Filtrer avec OU")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.play(Create(c1), Create(c2), run_time=0.7)
        self.au_mot("Au moins un")
        self.play(FadeIn(union), run_time=0.6)
        self.au_mot("combien de lignes")
        q = self.t("?", 80, ORANGE_RETENUE).next_to(cercles, RIGHT, buff=0.4)
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'architecte ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        tours = VGroup(tour(3.0, 0.55), tour(2.2, 0.6, "#93c5fd"), tour(2.6, 0.5, "#fcd34d"),
                       tour(1.7, 0.7, "#c4b5fd")).arrange(RIGHT, buff=0.25, aligned_edge=DOWN).move_to(P(-4.0, 1.1))
        self.au_mot("Un architecte")
        metier = self.t("Architecte", 46, BLEU_CALCUL).move_to(P(-4.0, -1.0))
        self.play(LaggedStart(*[GrowFromEdge(t, DOWN) for t in tours], lag_ratio=0.2), FadeIn(metier), run_time=1.0)
        self.au_mot("les tours de 500 mètres")
        l1 = self.col(self.ligne([("tours de", WHITE), ("500 m", AMBRE), ("ou plus", WHITE)], 40), 2.0)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("OU celles d'Amérique")
        ou = self.col(self.t("OU", 46, AMBRE), 1.15)
        l2 = self.col(self.t("tours d'Amérique", 40), 0.3)
        self.play(FadeIn(ou, scale=1.5), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le fichier ─────────────────────────────────────────────────────

    def ecran_fichier(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-fichier")
        tb = self.tableur()
        self.au_mot("10 gratte-ciel")
        self.play(FadeIn(tb, shift=UP * 0.2), run_time=0.6)
        l0 = self.col(self.ligne([("10", AMBRE), ("gratte-ciel", WHITE)], 44), 2.6)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("828 mètres")
        self.play(*tb.allumer_case(0, 0), run_time=0.4)
        self.au_mot("à l'Empire State")
        self.play(*tb.allumer_ligne(9), run_time=0.4)
        self.play(*tb.eteindre(), run_time=0.25)
        for j, (mot, txt) in enumerate([("la hauteur", "la hauteur (m)"), ("le continent", "le continent"),
                                        ("l'année", "l'année d'achèvement")]):
            self.au_mot(mot)
            l = self.col(self.ligne([("•", AMBRE), (txt, WHITE)], 36), 1.6 - 0.8 * j)
            self.play(FadeIn(l, shift=RIGHT * 0.2), *tb.allumer_colonne(j), run_time=0.45)
            self.play(*tb.eteindre(), run_time=0.25)
        self.attendre_voix()

    # ── 03 : OU ─────────────────────────────────────────────────────────────

    def ecran_ou(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ou")
        tb = self.tableur()
        self.add(tb)
        self.au_mot("Le filtre Hauteur")
        g = self.ou_filtres("Hauteur (m) ≥ 500", "Continent = Amérique")
        self.play(FadeIn(g[0], shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("OU Continent")
        self.play(FadeIn(g[1], scale=1.5), FadeIn(g[2], shift=DOWN * 0.2), run_time=0.45)
        self.au_mot("dès qu'elle vérifie")
        l1 = self.col(self.bloc(["une tour est gardée dès qu'elle", "vérifie l'un des critères"], 32), 0.65)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("6 tours de 500")
        r1 = self.col(self.ligne([("6", ORANGE_V), ("tours de 500 m ou plus", WHITE)], 34), -0.3)
        self.play(FadeIn(r1, shift=RIGHT * 0.2),
                  *[a for r in GRANDES for a in tb.allumer_case(r, 0, couleur="#fed7aa", anneau=ORANGE_V)],
                  run_time=0.5)
        self.au_mot("4 tours d'Amérique")
        r2 = self.col(self.ligne([("4", VIOLET_CLAIR), ("tours d'Amérique", WHITE)], 34), -0.95)
        self.play(FadeIn(r2, shift=RIGHT * 0.2),
                  *[a for r in AMERIQUE for a in tb.allumer_case(r, 1, couleur="#ddd6fe", anneau=VIOLET_H)],
                  run_time=0.5)
        self.attendre_voix()

    # ── 04 : la tour comptée deux fois ──────────────────────────────────────

    def ecran_double(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-double")
        tb = self.tableur()
        for r in GRANDES:
            tb.case(r, 0).set_fill("#fed7aa").set_stroke(ORANGE_V, width=7)
        for r in AMERIQUE:
            tb.case(r, 1).set_fill("#ddd6fe").set_stroke(VIOLET_H, width=7)
        self.add(tb)
        self.au_mot("One World Trade Center")
        cadre = SurroundingRectangle(rang(tb, OWTC), color=AMBRE, buff=0.04, stroke_width=7)
        self.play(Create(cadre), run_time=0.5)
        self.au_mot("vérifie les deux")
        l1 = self.col(self.bloc(["One World Trade Center :", "dans les deux groupes !"], 36, AMBRE), 2.5)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Indicate(rang(tb, OWTC), color=AMBRE, scale_factor=1.04),
                  run_time=0.6)
        self.au_mot("qu'une fois")
        l2 = self.col(self.t("Je ne le compte qu'une fois.", 34), 1.4)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        calc = self.col(self.ligne([("6", ORANGE_V), ("+", WHITE), ("4", VIOLET_CLAIR), ("−", WHITE),
                                    ("1", AMBRE)], 46), 0.4)
        for mot, idx in [("6 plus", [0, 1]), ("4, moins", [2, 3]), ("moins 1", [4])]:
            self.au_mot(mot)
            self.play(*[FadeIn(calc[k], scale=1.4) for k in idx], run_time=0.3)
        self.au_mot("égale 9 tours")
        r = self.ligne([("=", WHITE), ("9", VERT_OK), ("tours", WHITE)], 46).next_to(calc, DOWN, buff=0.3)
        r.align_to(calc, LEFT)
        self.play(FadeIn(r, scale=0.7), *masquer(tb, [i for i in range(N) if i not in GRANDES + AMERIQUE]),
                  run_time=0.45)
        self.play(Create(self.encadrer(VGroup(calc, r))), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (Asie OU Année < 2000) ──────────────────────────────

    def ecran_question1(self):
        tb = self.tableur()

        def reponse(s):
            s.play(*masquer(tb, [i for i in range(N) if i not in ASIE_OU_VIEILLE]),
                   *tb.allumer_ligne(7), run_time=0.6)

        self.ecran_question("05-question", "05b-reponse", ["« Continent = Asie »", "OU « Année < 2000 » :",
                                                            "combien de tours ?"],
                            ["9", "8", "1"], 1, ["6 + 3 − 1 : Petronas compte une fois.",
                                                 "9 la compte deux fois ; 1 = un ET."],
                            figure=tb, autres_r=reponse, mot_q="Avec le filtre")

    # ── 06 : ligne + colonne ────────────────────────────────────────────────

    def contours(self, cr):
        """La ligne Amérique (violet) et la colonne ≥ 500 m (orange), encadrées."""
        lig = SurroundingRectangle(VGroup(cr.libelles[1], *cr.cases[1]), color=VIOLET_H, buff=0.03, stroke_width=6)
        col = SurroundingRectangle(VGroup(cr.tetes[0], *[cr.cases[r][0] for r in range(3)]), color=ORANGE_V,
                                   buff=0.03, stroke_width=6)
        return lig, col

    def ecran_croise(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-croise")
        cr = self.croise()
        self.au_mot("Le tableau croisé")
        self.play(FadeIn(cr, shift=UP * 0.2), run_time=0.6)
        self.au_mot("le continent")
        self.play(Indicate(cr.libelles[:2], color=AMBRE), run_time=0.5)
        self.au_mot("et la hauteur")
        self.play(Indicate(cr.tetes[:2], color=AMBRE), run_time=0.5)
        self.au_mot("Le OU se lit")
        l1 = self.col(self.bloc(["OU : une ligne", "+ une colonne"], 42), 2.3)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        lig, col = self.contours(cr)
        self.au_mot("la ligne Amérique, 4")
        self.play(Create(lig), *cr.allumer_case(1, 2, couleur="#ddd6fe", anneau=VIOLET_H), run_time=0.5)
        r = self.col(self.ligne([("4", VIOLET_CLAIR)], 46), 0.6)
        self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("et la colonne 500")
        self.play(Create(col), *cr.allumer_case(2, 0, couleur="#fed7aa", anneau=ORANGE_V), run_time=0.5)
        r2 = self.ligne([("et", WHITE), ("6", ORANGE_V)], 46).next_to(r, RIGHT, buff=0.25)
        self.play(FadeIn(r2, shift=RIGHT * 0.2), run_time=0.3)
        self.attendre_voix()

    # ── 07 : le piège (la case commune) ─────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        cr = self.croise()
        self.add(cr, *self.contours(cr))
        self.au_mot("Le piège")
        tit = self.col(VGroup(self.t("Le piège :", 46, ROUGE_ERREUR), self.t("la case commune", 40, ROUGE_ERREUR)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.08), 2.85)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("dans la ligne ET dans la colonne")
        self.play(*cr.allumer_case(1, 0), run_time=0.4)
        self.play(cr.cases[1][0][1].animate.scale(1.7), run_time=0.3)
        self.play(cr.cases[1][0][1].animate.scale(1 / 1.7), run_time=0.3)
        self.au_mot("4 plus 6")
        s = self.col(self.ligne([("4", VIOLET_CLAIR), ("+", WHITE), ("6", ORANGE_V), ("=", WHITE)], 46), 1.5)
        self.play(FadeIn(s[:3], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("égale 10")
        dix = self.t("10", 46, ROUGE_ERREUR).next_to(s, RIGHT, buff=0.2)
        self.play(FadeIn(s[3]), FadeIn(dix, scale=1.3), run_time=0.35)
        self.au_mot("c'est trop")
        trop = self.t("trop !", 40, ROUGE_ERREUR).next_to(dix, RIGHT, buff=0.3)
        self.play(FadeIn(trop, shift=LEFT * 0.2), run_time=0.3)
        self.au_mot("On retire une fois")
        l2 = self.col(self.t("On retire la case commune :", 34), 0.65)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("10 moins 1")
        calc = self.col(self.ligne([("10", WHITE), ("−", WHITE), ("1", AMBRE)], 46), -0.15)
        self.play(FadeIn(calc, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 9")
        r = self.ligne([("=", WHITE), ("9", VERT_OK)], 46).next_to(calc, RIGHT, buff=0.2)
        self.play(FadeIn(r, scale=1.4), run_time=0.35)
        self.play(Create(self.encadrer(VGroup(calc, r))), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (Amérique OU < 500) ─────────────────────────────────

    def ecran_question2(self):
        cr = self.croise()

        def reponse(s):
            s.play(*[a for c in range(2) for a in cr.allumer_case(1, c)], *cr.allumer_case(0, 1), run_time=0.5)
            s.play(Indicate(cr.cases[1][1], color=AMBRE, scale_factor=1.15), run_time=0.5)

        self.ecran_question("08-question", "08b-reponse", ["« Continent = Amérique »", "OU « Hauteur (m) < 500 » :",
                                                            "combien de tours ?"],
                            ["8", "5", "3"], 1, ["4 + 4 − 3 = 5.", "8 compte la case deux fois ; 3 = un ET."],
                            figure=cr, autres_r=reponse, mot_q="Combien de tours")

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        self.add(self.croise())
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 48, JAUNE_TITRE), 2.95)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Un : combien")
        q1 = self.col(VGroup(self.t("1. Combien de tours ?", 34), barre_filtre("Continent = Asie", 28),
                             Text("OU", font_size=30, color=AMBRE, weight=BOLD),
                             barre_filtre("Hauteur (m) < 500", 28)).arrange(DOWN, aligned_edge=LEFT, buff=0.1), 1.25)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Deux : un stagiaire")
        q2 = self.col(self.bloc(["2. Un stagiaire écrit :", "Asie OU Amérique :"], 34), -0.55)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("6 plus 4")
        c = self.ligne([("6", WHITE), ("+", WHITE), ("4", WHITE), ("=", WHITE), ("10", WHITE)], 38)
        self.col(c, -1.4)
        self.play(FadeIn(c[:3], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("égale 10")
        self.play(FadeIn(c[3:], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("A-t-il raison")
        q3 = self.t("A-t-il raison ?", 34, ORANGE_RETENUE).next_to(c, DOWN, buff=0.15).align_to(c, LEFT)
        self.play(FadeIn(q3), run_time=0.3)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 30, ORANGE_RETENUE), -2.75)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        cr = self.croise()
        self.add(cr)
        titre = self.col(self.t("Correction", 48, JAUNE_TITRE), 2.95)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Un : 6 plus 4")
        self.play(*cr.allumer_case(0, 2, couleur="#fed7aa", anneau=ORANGE_V),
                  *cr.allumer_case(2, 1, couleur="#ddd6fe", anneau=VIOLET_H), run_time=0.4)
        c1 = self.col(self.ligne([("1.", AMBRE), ("6", WHITE), ("+", WHITE), ("4", WHITE), ("−", WHITE)], 40), 1.8)
        self.play(FadeIn(c1, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("moins la case commune, 1")
        un = self.t("1", 40, AMBRE).next_to(c1, RIGHT, buff=0.18)
        self.play(*cr.allumer_case(0, 1), FadeIn(un, scale=1.4), run_time=0.4)
        self.au_mot(": 9 tours")
        r1 = self.ligne([("=", WHITE), ("9", VERT_OK), ("tours", WHITE)], 40).next_to(c1, DOWN, buff=0.15)
        r1.align_to(c1, LEFT).shift(RIGHT * 0.55)
        self.play(FadeIn(r1, scale=1.3), run_time=0.35)
        self.au_mot("Deux : oui")
        self.play(*cr.eteindre(), run_time=0.2)
        l2 = self.col(self.ligne([("2.", AMBRE), ("Oui, il a raison !", VERT_OK)], 40), 0.3)
        self.play(FadeIn(l2, scale=0.8), *[a for r in range(2) for a in cr.allumer_case(r, 2)], run_time=0.45)
        self.au_mot("Une tour ne peut pas")
        l3 = self.col(self.bloc(["Asie ET Amérique :", "impossible, case vide."], 34), -0.6)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("rien à retirer")
        l4 = self.col(self.t("Rien à retirer.", 38, VERT_OK), -1.6)
        self.play(FadeIn(l4, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        cr = self.croise()
        contours = VGroup(*self.contours(cr))
        fig = VGroup(cr, contours)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("OU : une ligne est gardée dès", "qu'elle vérifie au moins un", "critère (et les deux aussi)."),
                                      ("J'additionne, puis je retire", "une fois la case commune."),
                                      ("Critères incompatibles :", "rien à retirer.")], fs=32)
        self.au_mot("Avec OU")
        self.montrer_ligne(lignes[0])
        self.au_mot("Pour compter")
        self.montrer_ligne(lignes[1], *cr.allumer_case(1, 0))
        self.au_mot("Si les deux critères")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_fichier()
        self.ecran_ou()
        self.ecran_double()
        self.ecran_question1()
        self.ecran_croise()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsFiltreOuPremiere(StatsFiltreOuBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "bleue"


class StatsFiltreOuStmg(StatsFiltreOuBase):
    """Même vidéo pour la STMG : identité et ceinture seulement."""

    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"
