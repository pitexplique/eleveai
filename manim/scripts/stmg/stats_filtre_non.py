# stats_filtre_non.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# LYCÉE : FILTRER AVEC NON (micros du coach : 1re info_filtre_non, STMG
# don_filtre_non ; « Utiliser un filtre avec NON (le critère contraire) »),
# AVEC VOIX. ÉPISODE COMMUN : 1re 17-filtre-non ⇄ STMG 16-filtre-non (une voix,
# un script, deux rendus ; la voix ne cite aucune classe).
# Paysage 16:9. CEINTURES : 1re VERTE, STMG VERTE (le complémentaire, le
# contraire de « ≥ », et NON d'un ET : étoiles 2-3 dans les deux banques).
# Short jumeau : stats_filtre_non_short.py (ORANGE).
#
# ⭐ Décor et métier : l'ESPACE (centres d'intérêt : espace, sciences) ; une
# INGÉNIEURE D'UNE AGENCE SPATIALE choisit des cibles de mission (problématique :
# écarter, garder le reste).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : NASA Planetary Fact Sheet,
# https://nssdc.gsfc.nasa.gov/planetary/factsheet/ (consulté le 24/10/2026) :
# diamètre (km) Mercure 4 879 · Vénus 12 104 · Terre 12 756 · Mars 6 792 ·
# Jupiter 142 984 · Saturne 120 536 · Uranus 51 118 · Neptune 49 528 ; lunes
# 0 · 0 · 1 · 2 · 95 · 274 · 28 · 16 (colonne « Lune » : Oui / Non) ; rocheuses :
# Mercure, Vénus, Terre, Mars ; gazeuses (géantes) : les quatre autres.
#   Filtres : NON Type = Gazeuse → 4 · NON Diamètre (km) ≥ 10 000 → 2 · NON
#   Lune = Oui → 2 (8 − 6) · NON (Gazeuse ET Lune = Oui) → 8 − 4 = 4 (« ni l'un
#   ni l'autre » : 2) · NON (Rocheuse ET Lune = Non) → 8 − 2 = 6 (ni-ni : 4) ·
#   NON Diamètre (km) < 50 000 → 3 (Neptune, 49 528, juste en dessous) · NON
#   Rocheuse → 4. Aucun diamètre n'est égal à un seuil. On ne nie jamais la
#   modalité « Non » seule (double négation, règle des banques).
#   Tableau croisé (Type × Lune) : Rocheuse 2 · 2 (4) ; Gazeuse 4 · 0 (4) ;
#   Oui 6, Non 2, total 8.
# ⭐ Figures du coach : `tableau_donnees` (canvasFichier) et tableau croisé avec
# marges. ⛔ PAS D'ÉCART : chaque nombre au mot. Filtres écrits comme au tableur.
#
# Mapping micro → écrans : info_filtre_non_fichier → 03, 04, question 05 ·
# info_filtre_non_croise / STMG tpl_1 (total − marge) → 06 · info_filtre_non_et
# / STMG tpl_2 (NON d'un ET, « ni l'un ni l'autre ») → 07, question 08 · défi 09.
# Écrans : 00 garde · 01 l'ingénieure · 02 le fichier · 03 NON Gazeuse · 04 par
# le total · 05 QUESTION · 06 le tableau croisé · 07 le piège (NON d'un ET) ·
# 08 QUESTION · 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/lycee-stats-filtre-non.json (débit −7) ; marques :
# manim/scripts/stmg/stats_filtre_non_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_filtre_non.py StatsFiltreNonPremiere -o eleveai-maths-premiere-commun-stats-filtre-non --media_dir manim/scripts/stmg/media-stats-filtre-non-1re
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_filtre_non.py StatsFiltreNonStmg -o eleveai-maths-stmg-stats-filtre-non --media_dir manim/scripts/stmg/media-stats-filtre-non-stmg
# Sorties : manim/sorties/premiere-commun/maths/statistiques/17-filtre-non/eleveai-maths-premiere-commun-stats-filtre-non.mp4
#           manim/sorties/stmg/maths/statistiques/16-filtre-non/eleveai-maths-stmg-stats-filtre-non.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403

PLANETES = ["Mercure", "Vénus", "Terre", "Mars", "Jupiter", "Saturne", "Uranus", "Neptune"]
DIAM = [4879, 12104, 12756, 6792, 142984, 120536, 51118, 49528]
TYPE = ["Rocheuse"] * 4 + ["Gazeuse"] * 4
LUNE = ["Non", "Non", "Oui", "Oui", "Oui", "Oui", "Oui", "Oui"]
N = len(PLANETES)
ROCHEUSES = [0, 1, 2, 3]
GAZEUSES = [4, 5, 6, 7]
PETITES = [i for i in range(N) if DIAM[i] < 10000]   # Mercure, Mars
COUL_PL = ["#a8a29e", "#fcd34d", "#3b82f6", "#ef4444", "#fdba74", "#fde68a", "#67e8f9", "#3b5bdb"]


def systeme(l=5.6):
    """Le Soleil et les 8 planètes en rang (tailles indicatives, pas à l'échelle)."""
    soleil = Circle(radius=0.55, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    rayons = [0.09, 0.14, 0.15, 0.11, 0.38, 0.33, 0.22, 0.21]
    pl = VGroup(*[Circle(radius=r, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
                  for r, c in zip(rayons, COUL_PL)]).arrange(RIGHT, buff=0.16)
    anneau = Ellipse(width=0.95, height=0.22, stroke_color="#fde68a", stroke_width=3).move_to(pl[5])
    g = VGroup(soleil, pl).arrange(RIGHT, buff=0.3)
    anneau.move_to(pl[5])
    g.add(anneau)
    return g.scale_to_fit_width(l)


class StatsFiltreNonBase(PaysageH2):
    nom_voix = "lycee-stats-filtre-non"
    fichier_marques = "stats_filtre_non_marques.json"
    XL = 1.55

    def tableur(self):
        tb = fichier("Planète", PLANETES, ["Diamètre (km)", "Type", "Lune"],
                     [[DIAM[i], TYPE[i], LUNE[i]] for i in range(N)], fs=26, largeur_id=2.3,
                     largeurs=[2.1, 1.75, 1.1], hauteur=0.56)
        return self.cadrer(tb, droite=1.3)

    def croise(self, fs=30):
        cr = croise(["Rocheuse", "Gazeuse"], ["Lune : Oui", "Lune : Non"], [[2, 2], [4, 0]], fs=fs, coin="Type",
                    largeur_case=2.0, largeur_libelle=2.4)
        return self.cadrer(cr, droite=1.3)

    def filtre(self, morceaux, y=2.95, fs=32):
        return self.col(barre_filtre(morceaux, fs), y)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Filtrer avec NON", self.identite, self.ceinture)
        fond = RoundedRectangle(width=4.6, height=2.6, corner_radius=0.2, fill_color=AMBRE, fill_opacity=0.5,
                                stroke_color=AMBRE, stroke_width=4).move_to(P(-0.6, 0.1))
        rond = Circle(radius=0.8, fill_color=BLACK, fill_opacity=1, stroke_color=ORANGE_V, stroke_width=6)
        rond.move_to(fond)
        lab = Text("A", font_size=48, color=ORANGE_V, weight=BOLD).move_to(rond)
        nonA = Text("NON A", font_size=34, color=NUIT, weight=BOLD).move_to(fond.get_corner(UL) + P(0.95, -0.42))
        self.au_mot("Filtrer avec NON")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.play(FadeIn(fond), FadeIn(rond), FadeIn(lab), run_time=0.6)
        self.au_mot("tout ce qui ne vérifie pas")
        self.play(FadeIn(nonA, scale=1.4), Indicate(fond, color=AMBRE, scale_factor=1.03), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'ingénieure ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        sy = systeme(6.0).move_to(P(-3.3, 1.9))
        self.au_mot("Une ingénieure")
        metier = self.bloc(["Ingénieure", "d'une agence spatiale"], 42, BLEU_CALCUL).move_to(P(-3.3, -0.4))
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.5)
        self.au_mot("les 8 planètes")
        self.play(FadeIn(sy[0], scale=0.5), LaggedStart(*[FadeIn(p, scale=0.3) for p in sy[1]], lag_ratio=0.12),
                  FadeIn(sy[2]), run_time=1.0)
        l1 = self.col(self.ligne([("8", AMBRE), ("planètes", WHITE)], 44), 2.0)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Elle filtre ses données")
        l2 = self.col(self.bloc(["Elle filtre pour", "choisir ses cibles."], 38), 0.7)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), FadeIn(entonnoir(0.8).next_to(l2, DOWN, buff=0.35)), run_time=0.6)
        self.attendre_voix()

    # ── 02 : le fichier ─────────────────────────────────────────────────────

    def ecran_fichier(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-fichier")
        tb = self.tableur()
        self.au_mot("une ligne par planète")
        self.play(FadeIn(tb, shift=UP * 0.2), run_time=0.6)
        l0 = self.col(self.ligne([("1 ligne", AMBRE), ("=", WHITE), ("1 planète", WHITE)], 42), 2.6)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("de Mercure")
        self.play(*tb.allumer_ligne(0), run_time=0.35)
        self.au_mot("à Neptune")
        self.play(*tb.allumer_ligne(7), run_time=0.35)
        self.play(*tb.eteindre(), run_time=0.25)
        for j, (mot, txt) in enumerate([("son diamètre", "le diamètre (km)"), ("son type", "rocheuse ou gazeuse"),
                                        ("au moins une lune", "au moins une lune ?")]):
            self.au_mot(mot)
            l = self.col(self.ligne([("•", AMBRE), (txt, WHITE)], 36), 1.6 - 0.8 * j)
            self.play(FadeIn(l, shift=RIGHT * 0.2), *tb.allumer_colonne(j), run_time=0.45)
            self.play(*tb.eteindre(), run_time=0.25)
        self.attendre_voix()

    # ── 03 : NON Type = Gazeuse ─────────────────────────────────────────────

    def ecran_non(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-non")
        tb = self.tableur()
        self.add(tb)
        self.au_mot("Le filtre NON")
        f = self.filtre([("NON", AMBRE), ("Type = Gazeuse", WHITE)])
        self.play(FadeIn(f, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("qui ne sont pas gazeuses")
        self.play(*masquer(tb, GAZEUSES), run_time=0.7)
        for r, mot in zip(ROCHEUSES, ["Mercure", "Vénus", "la Terre", "et Mars"]):
            self.au_mot(mot)
            self.play(*tb.allumer_case(r, 1), run_time=0.25)
        self.au_mot("4 planètes")
        res = self.col(self.ligne([("→", WHITE), ("4", VERT_OK), ("planètes", WHITE)], 44), 1.7)
        self.play(FadeIn(res, scale=0.7), run_time=0.4)
        self.au_mot("c'est le contraire")
        l2 = self.col(self.bloc(["NON = le contraire :", "le complémentaire"], 38, AMBRE), 0.55)
        self.play(FadeIn(l2, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 04 : par le total ; le contraire de « ≥ » ───────────────────────────

    def ecran_total(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-total")
        tb = self.tableur()
        self.add(tb)
        self.au_mot("par le total")
        l0 = self.col(self.t("Par le total :", 40, JAUNE_TITRE), 2.8)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        c = self.col(self.ligne([("8", WHITE), ("−", WHITE), ("4", WHITE), ("=", WHITE), ("4", VERT_OK)], 48), 1.9)
        self.au_mot("8 planètes")
        self.play(FadeIn(c[0], scale=1.4), Indicate(tb.libelles, color=AMBRE, scale_factor=1.04), run_time=0.4)
        self.au_mot("moins les 4 gazeuses")
        self.play(FadeIn(c[1:3], scale=1.4), *[a for r in GAZEUSES for a in tb.allumer_case(r, 1)], run_time=0.4)
        self.au_mot("égale 4")
        self.play(FadeIn(c[3:], scale=1.4), *masquer(tb, GAZEUSES), run_time=0.4)
        self.au_mot("le contraire de supérieur ou égal")
        b1 = barre_filtre([("NON", AMBRE), ("Diamètre ≥ …", WHITE)], 28)
        eg = self.t("=", 40)
        b2 = barre_filtre("Diamètre < …", 28)
        self.col(VGroup(b1, eg, b2).arrange(DOWN, buff=0.12), 0.2)
        self.play(FadeIn(b1, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("strictement inférieur")
        self.play(FadeIn(eg), FadeIn(b2, shift=DOWN * 0.2), run_time=0.45)
        r = self.col(self.ligne([("contraire de", WHITE), ("≥", AMBRE), (":", WHITE), ("<", VERT_OK)], 40), -1.55)
        self.play(FadeIn(r, scale=0.8), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (NON Diamètre ≥ 10 000) ─────────────────────────────

    def ecran_question1(self):
        tb = self.tableur()

        def reponse(s):
            s.play(*masquer(tb, [i for i in range(N) if i not in PETITES]),
                   *[a for r in PETITES for a in tb.allumer_case(r, 0)], run_time=0.6)

        self.ecran_question("05-question", "05b-reponse", ["Filtre NON :", "« Diamètre (km) ≥ 10 000 »",
                                                            "combien de planètes ?"],
                            ["6", "2", "8"], 1, ["< 10 000 : Mercure et Mars.", "6 oublie le NON ; 8 = tout le fichier."],
                            figure=tb, autres_r=reponse, mot_q="Avec le filtre")

    # ── 06 : le tableau croisé (NON une colonne) ────────────────────────────

    def ecran_croise(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-croise")
        cr = self.croise()
        self.au_mot("Le tableau croisé")
        self.play(FadeIn(cr, shift=UP * 0.2), run_time=0.6)
        self.au_mot("le type")
        self.play(Indicate(cr.libelles[:2], color=AMBRE), run_time=0.45)
        self.au_mot("et les lunes")
        self.play(Indicate(cr.tetes[:2], color=AMBRE), run_time=0.45)
        self.au_mot("NON, Lune égale Oui")
        f = self.filtre([("NON", AMBRE), ("Lune = Oui", WHITE)], y=2.6)
        self.play(FadeIn(f, shift=DOWN * 0.2), run_time=0.45)
        self.au_mot("c'est la colonne Non")
        self.play(*[a for r in range(2) for a in cr.allumer_case(r, 1)], run_time=0.4)
        self.au_mot("2 planètes")
        r1 = self.col(self.ligne([("→", WHITE), ("2", VERT_OK), ("planètes", WHITE)], 42), 1.45)
        self.play(FadeIn(r1, scale=0.7), *cr.allumer_case(2, 1, couleur="#bbf7d0", anneau=VERT_OK), run_time=0.4)
        self.au_mot("Ou bien le total")
        l2 = self.col(self.t("Ou bien : le total − la colonne Oui", 32), 0.5)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        c = self.col(self.ligne([("8", WHITE), ("−", WHITE), ("6", WHITE), ("=", WHITE), ("2", VERT_OK)], 46), -0.35)
        self.au_mot("8 moins 6")
        self.play(FadeIn(c[:3], shift=RIGHT * 0.2), *cr.allumer_case(2, 0, couleur="#fed7aa", anneau=ORANGE_V),
                  run_time=0.4)
        self.au_mot("égale 2")
        self.play(FadeIn(c[3:], scale=1.4), run_time=0.35)
        self.attendre_voix()

    # ── 07 : le piège (NON d'un ET) ─────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        cr = self.croise()
        self.add(cr)
        self.au_mot("Le piège")
        tit = self.col(VGroup(self.t("Le piège :", 46, ROUGE_ERREUR), self.t("nier un ET", 40, ROUGE_ERREUR)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.08), 2.85)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("NON, Gazeuse ET")
        f = self.col(barre_filtre([("NON (", AMBRE), ("Gazeuse ET Lune = Oui", WHITE), (")", AMBRE)], 26), 1.85)
        self.play(FadeIn(f, shift=DOWN * 0.2), run_time=0.45)
        self.au_mot("écarte seulement la case commune")
        self.play(*cr.allumer_case(1, 0, couleur="#fecaca", anneau=ROUGE_ERREUR), run_time=0.4)
        x = croix(cr.case(1, 0), sw=5)
        self.play(Create(x), run_time=0.3)
        self.au_mot("8 moins 4")
        c = self.col(self.ligne([("8", WHITE), ("−", WHITE), ("4", WHITE), ("=", WHITE), ("4", VERT_OK)], 46), 0.95)
        self.play(FadeIn(c[:3], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 4")
        self.play(FadeIn(c[3:], scale=1.4), run_time=0.35)
        self.au_mot("Ce n'est pas ni l'un ni l'autre")
        l2 = self.col(self.bloc(["≠ « ni l'un ni l'autre »", "(la case opposée)"], 34, ORANGE_RETENUE), -0.1)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("Mercure et Vénus, 2 planètes")
        self.play(*cr.allumer_case(0, 1, couleur="#fed7aa", anneau=ORANGE_V), run_time=0.4)
        l3 = self.col(self.ligne([("ni-ni :", ORANGE_RETENUE), ("2", ORANGE_RETENUE), ("planètes", WHITE)], 38), -0.95)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (NON (Rocheuse ET Lune = Non)) ──────────────────────

    def ecran_question2(self):
        cr = self.croise()

        def reponse(s):
            s.play(*cr.allumer_case(0, 1, couleur="#fecaca", anneau=ROUGE_ERREUR), run_time=0.4)
            s.play(Create(croix(cr.case(0, 1), sw=5)), run_time=0.3)

        self.ecran_question("08-question", "08b-reponse", ["NON « Rocheuse", "ET Lune = Non » :",
                                                            "combien de planètes ?"],
                            ["2", "6", "4"], 1, ["8 − 2 = 6 : on retire une seule case.",
                                                 "2 = la case ; 4 = ni l'un ni l'autre."],
                            figure=cr, autres_r=reponse, mot_q="Combien de planètes")

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        self.add(self.tableur())
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 48, JAUNE_TITRE), 2.95)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Un : combien")
        q1 = self.col(VGroup(self.t("1. Combien de planètes ?", 34),
                             barre_filtre([("NON", AMBRE), ("Diamètre (km) < 50 000", WHITE)], 26)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.12), 1.7)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Deux : et NON")
        q2 = self.col(VGroup(self.t("2. Et avec :", 34), barre_filtre([("NON", AMBRE), ("Type = Rocheuse", WHITE)],
                                                                       26)).arrange(DOWN, aligned_edge=LEFT, buff=0.12),
                      0.1)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE), -1.3)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        tb = self.tableur()
        self.add(tb)
        titre = self.col(self.t("Correction", 48, JAUNE_TITRE), 2.95)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("le contraire d'inférieur")
        b = self.col(VGroup(barre_filtre([("NON", AMBRE), ("Diamètre < 50 000", WHITE)], 24),
                            self.t("=", 34), barre_filtre("Diamètre ≥ 50 000", 24)).arrange(DOWN, buff=0.08), 1.6)
        self.play(FadeIn(b[0], shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("supérieur ou égal à 50 000")
        self.play(FadeIn(b[1:], shift=DOWN * 0.2), run_time=0.35)
        grosses = [4, 5, 6]
        for r, mot in zip(grosses, ["Jupiter", "Saturne", "et Uranus"]):
            self.au_mot(mot)
            self.play(*tb.allumer_case(r, 0), run_time=0.25)
        self.au_mot("3 planètes")
        l1 = self.col(self.ligne([("1.", AMBRE), ("3", VERT_OK), ("planètes", WHITE)], 40), 0.25)
        self.play(FadeIn(l1, scale=0.7), run_time=0.35)
        self.au_mot("Neptune, 49 528")
        self.play(*tb.allumer_case(7, 0, couleur="#fed7aa", anneau=ORANGE_V), run_time=0.35)
        l1b = self.col(self.ligne([("Neptune :", WHITE), ("49 528", ORANGE_V), ("< 50 000", WHITE)], 34), -0.45)
        self.play(FadeIn(l1b, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("Deux : NON Rocheuse")
        l2 = self.col(self.ligne([("2.", AMBRE), ("NON Rocheuse = Gazeuse", WHITE)], 34), -1.2)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("4 planètes")
        l3 = self.col(self.ligne([("→", WHITE), ("4", VERT_OK), ("planètes :", WHITE), ("8 − 4", WHITE)], 36), -1.9)
        self.play(FadeIn(l3, scale=0.8), *[a for r in GAZEUSES for a in tb.allumer_case(r, 1)], run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        cr = self.croise()
        self.add(cr)
        lignes = self.finale_colonne(figure=cr, textes=[("NON garde tout ce qui ne vérifie", "pas le critère : le total, moins", "ceux qui le vérifient."),
                                      ("Le contraire de « ≥ »,", "c'est « < »."),
                                      ("NON d'un ET écarte", "une seule case, pas une ligne.")], fs=32)
        self.au_mot("NON garde tout")
        self.montrer_ligne(lignes[0], *[a for r in range(2) for a in cr.allumer_case(r, 1)])
        self.au_mot("Le contraire de supérieur")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et NON d'un ET")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_fichier()
        self.ecran_non()
        self.ecran_total()
        self.ecran_question1()
        self.ecran_croise()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsFiltreNonPremiere(StatsFiltreNonBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"


class StatsFiltreNonStmg(StatsFiltreNonBase):
    """Même vidéo pour la STMG : identité et ceinture seulement."""

    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
