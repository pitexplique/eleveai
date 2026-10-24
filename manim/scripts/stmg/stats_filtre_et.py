# stats_filtre_et.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# LYCÉE : FILTRER AVEC ET (micros du coach : 1re info_filtre_et, STMG
# don_filtre_et ; « Utiliser un filtre avec ET (les deux critères à la fois) »),
# AVEC VOIX. ÉPISODE COMMUN : 1re 15-filtre-et ⇄ STMG 14-filtre-et (une voix, un
# script, deux rendus ; la voix ne cite aucune classe).
# Paysage 16:9. CEINTURES : 1re VERTE, STMG VERTE (la paysage complète du
# niveau : deux critères dans le fichier, la case du tableau croisé, le piège
# de l'addition, ET NON ; étoiles 2-3 dans les deux banques). Short jumeau :
# stats_filtre_et_short.py (ORANGE).
#
# ⭐ Décor et métier : les VOLCANS (centres d'intérêt : nature-ecologie,
# sciences) ; une VOLCANOLOGUE prépare une mission (problématique : sélectionner
# sur deux critères). La Réunion y est (Piton de la Fournaise), parmi d'autres.
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 :
#   · altitudes (m) : https://en.wikipedia.org/wiki/List_of_volcanoes_by_elevation
#     (Mauna Loa 4 169, Kilimandjaro 5 895, Fuji 3 776, Erebus 3 795, Nyiragongo
#     3 470, Teide 3 718) ; Piton de la Fournaise 2 621 (infobox fr.wikipedia,
#     cratère Bory) ; Stromboli 924, Vésuve 1 281, Kīlauea 1 247 (articles Wikipédia) ;
#   · éruption depuis 2000 : Fournaise (2026), Stromboli (activité continue),
#     Mauna Loa (2022), Erebus (lac de lave permanent), Nyiragongo (2002, 2021),
#     Kīlauea (2018…) : Oui ; Kilimandjaro, Fuji (1707), Vésuve (1944), Teide
#     (1909) : Non ;
#   · hémisphère : Sud pour la Fournaise, le Kilimandjaro, l'Erebus et le
#     Nyiragongo (1,5° S) ; Nord pour les autres.
#   Filtres : Altitude (m) ≥ 3 000 → 6 ; ET Éruption = Oui → 3 (Mauna Loa,
#   Erebus, Nyiragongo) · Sud ET Oui → 3 (OU : 7) · Sud ET NON Oui → 1 ·
#   Nord ET Non → 3 · ≥ 4 000 ET Non → 1. Aucune altitude n'est égale à un seuil.
#   Tableau croisé (Éruption × Hémisphère) : Oui 3 · 3 (6) ; Non 3 · 1 (4) ;
#   Nord 6, Sud 4, total 10.
# ⭐ Figures du coach : `tableau_donnees` (canvasFichier) et tableau croisé avec
# marges. ⛔ PAS D'ÉCART : chaque nombre au mot. Filtres écrits comme au tableur.
#
# Mapping micro → écrans : info_filtre_et_fichier → 03, 04, question 05 ·
# info_filtre_et_croise / STMG tpl_1 (une case) → 06, 07 · info_filtre_et_non /
# STMG tpl_2 (ET NON) → question 08 · défi 09.
# Écrans : 00 garde · 01 la volcanologue · 02 le fichier · 03 premier critère ·
# 04 ET · 05 QUESTION · 06 la case du tableau croisé · 07 le piège (additionner)
# · 08 QUESTION (ET NON) · 09 défi · 09b correction · 10 ce que tu as appris ·
# 11 fin (règle du 19/10).
#
# Voix : manim/voix/lycee-stats-filtre-et.json (débit −7) ; marques :
# manim/scripts/stmg/stats_filtre_et_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_filtre_et.py StatsFiltreEtPremiere -o eleveai-maths-premiere-commun-stats-filtre-et --media_dir manim/scripts/stmg/media-stats-filtre-et-1re
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_filtre_et.py StatsFiltreEtStmg -o eleveai-maths-stmg-stats-filtre-et --media_dir manim/scripts/stmg/media-stats-filtre-et-stmg
# Sorties : manim/sorties/premiere-commun/maths/statistiques/15-filtre-et/eleveai-maths-premiere-commun-stats-filtre-et.mp4
#           manim/sorties/stmg/maths/statistiques/14-filtre-et/eleveai-maths-stmg-stats-filtre-et.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403

VOLCANS = ["Piton de la Fournaise", "Stromboli", "Mauna Loa", "Kilimandjaro", "Fuji", "Vésuve", "Erebus",
           "Nyiragongo", "Teide", "Kīlauea"]
ALT = [2621, 924, 4169, 5895, 3776, 1281, 3795, 3470, 3718, 1247]
HEMI = ["Sud", "Nord", "Nord", "Sud", "Nord", "Nord", "Sud", "Sud", "Nord", "Nord"]
ERUP = ["Oui", "Oui", "Oui", "Non", "Non", "Non", "Oui", "Oui", "Non", "Oui"]
N = len(VOLCANS)
HAUTS = [i for i in range(N) if ALT[i] >= 3000]                    # 2, 3, 4, 6, 7, 8
HAUTS_ACTIFS = [i for i in HAUTS if ERUP[i] == "Oui"]              # 2, 6, 7
SUD_ACTIFS = [i for i in range(N) if HEMI[i] == "Sud" and ERUP[i] == "Oui"]   # 0, 6, 7
LAVE = "#f97316"


def volcan(l=2.4):
    """Un volcan : le cône, le cratère, la lave et un panache."""
    cone = Polygon(P(-l / 2, 0), P(-l * 0.12, l * 0.55), P(l * 0.12, l * 0.55), P(l / 2, 0),
                   fill_color="#78350f", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    lave = Polygon(P(-l * 0.12, l * 0.55), P(l * 0.12, l * 0.55), P(l * 0.05, l * 0.3), P(-l * 0.02, l * 0.15),
                   P(-l * 0.07, l * 0.35), fill_color=LAVE, fill_opacity=1, stroke_width=0)
    fumee = VGroup(*[Circle(radius=r, fill_color=GREY_B, fill_opacity=0.7, stroke_width=0).move_to(P(dx, l * 0.62 + dy))
                     for r, dx, dy in [(0.16, 0, 0.1), (0.2, 0.15, 0.35), (0.25, 0.05, 0.65)]])
    return VGroup(cone, lave, fumee)


class StatsFiltreEtBase(PaysageH2):
    nom_voix = "lycee-stats-filtre-et"
    fichier_marques = "stats_filtre_et_marques.json"
    XL = 1.55

    def tableur(self):
        tb = fichier("Volcan", VOLCANS, ["Altitude (m)", "Hémisphère", "Éruption"],
                     [[ALT[i], HEMI[i], ERUP[i]] for i in range(N)], fs=24, largeur_id=3.3,
                     largeurs=[1.75, 1.6, 1.4])
        return self.cadrer(tb, droite=1.3)

    def croise(self, fs=30):
        cr = croise(["Éruption : Oui", "Éruption : Non"], ["Nord", "Sud"], [[3, 3], [3, 1]], fs=fs,
                    largeur_case=1.6, largeur_libelle=3.4)
        return self.cadrer(cr, droite=1.3)

    def filtre(self, morceaux, y=2.95, fs=32):
        return self.col(barre_filtre(morceaux, fs), y)

    def deux_filtres(self, f1, f2, y=2.95, fs=30):
        """Deux barres de filtre reliées par « ET » (renvoie b1, et, b2)."""
        b1 = barre_filtre(f1, fs)
        et = Text("ET", font_size=38, color=AMBRE, weight=BOLD)
        b2 = barre_filtre(f2, fs)
        g = self.col(VGroup(b1, et, b2).arrange(DOWN, aligned_edge=LEFT, buff=0.12), 0)
        g.align_to(P(0, y + 0.3), UP)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Filtrer avec ET", self.identite, self.ceinture)
        cercles = VGroup(Circle(radius=1.05, stroke_color=ORANGE_V, stroke_width=6, fill_color=ORANGE_V,
                                fill_opacity=0.15).shift(LEFT * 0.65),
                         Circle(radius=1.05, stroke_color=VIOLET_H, stroke_width=6, fill_color=VIOLET_H,
                                fill_opacity=0.15).shift(RIGHT * 0.65)).move_to(P(-0.6, 0.1))
        inter = Intersection(cercles[0], cercles[1], fill_color=AMBRE, fill_opacity=0.9, stroke_width=0)
        self.au_mot("Filtrer avec ET")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Deux critères")
        self.play(Create(cercles[0]), Create(cercles[1]), run_time=0.8)
        self.au_mot("à la fois")
        self.play(FadeIn(inter), run_time=0.5)
        self.au_mot("qui reste")
        q = self.t("?", 80, ORANGE_RETENUE).next_to(cercles, RIGHT, buff=0.4)
        self.play(FadeIn(q, scale=0.4), Indicate(inter, color=AMBRE, scale_factor=1.15), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : la volcanologue ────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        v = volcan(2.6).move_to(P(-4.1, 1.0))
        self.au_mot("Une volcanologue")
        metier = self.t("Volcanologue", 46, BLEU_CALCUL).move_to(P(-4.1, -1.0))
        self.play(FadeIn(v, shift=UP * 0.3), FadeIn(metier, shift=UP * 0.2), run_time=0.7)
        self.au_mot("très hauts")
        l1 = self.col(self.ligne([("1.", AMBRE), ("très hauts", WHITE)], 42), 1.9)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("et toujours actifs")
        et = self.col(self.t("ET", 44, AMBRE), 1.05)
        l2 = self.col(self.ligne([("2.", AMBRE), ("toujours actifs", WHITE)], 42), 0.2)
        self.play(FadeIn(et, scale=1.5), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("depuis 2000")
        l3 = self.col(self.ligne([("(une éruption depuis", GREY_A), ("2000)", AMBRE)], 34), -0.55)
        self.play(FadeIn(l3, shift=UP * 0.15), v[1].animate.set_color(YELLOW), run_time=0.5)
        self.play(v[1].animate.set_color(LAVE), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le fichier ─────────────────────────────────────────────────────

    def ecran_fichier(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-fichier")
        tb = self.tableur()
        self.au_mot("10 volcans")
        self.play(FadeIn(tb, shift=UP * 0.2), run_time=0.6)
        l0 = self.col(self.ligne([("10", AMBRE), ("volcans", WHITE)], 44), 2.6)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("du Piton de la Fournaise")
        self.play(*tb.allumer_ligne(0), run_time=0.4)
        self.au_mot("au Kilimandjaro")
        self.play(*tb.allumer_ligne(3), run_time=0.4)
        self.play(*tb.eteindre(), run_time=0.25)
        for j, (mot, txt) in enumerate([("son altitude", "l'altitude (m)"), ("son hémisphère", "l'hémisphère"),
                                        ("entré en éruption", "éruption depuis 2000 ?")]):
            self.au_mot(mot)
            l = self.col(self.ligne([("•", AMBRE), (txt, WHITE)], 36), 1.6 - 0.8 * j)
            self.play(FadeIn(l, shift=RIGHT * 0.2), *tb.allumer_colonne(j), run_time=0.45)
            self.play(*tb.eteindre(), run_time=0.25)
        self.attendre_voix()

    # ── 03 : le premier critère ─────────────────────────────────────────────

    def ecran_premier(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-premier")
        tb = self.tableur()
        self.add(tb)
        self.au_mot("Premier critère")
        l0 = self.col(self.t("Premier critère", 40, JAUNE_TITRE), 2.9)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Altitude, supérieure")
        f = self.filtre("Altitude (m) ≥ 3 000", y=1.95)
        self.play(FadeIn(f, shift=DOWN * 0.2), run_time=0.5)
        autres = [i for i in range(N) if i not in HAUTS]
        self.play(*masquer(tb, autres), *[a for r in HAUTS for a in tb.allumer_case(r, 0)], run_time=0.9)
        self.au_mot("Il reste 6")
        res = self.col(self.ligne([("→", WHITE), ("6", VERT_OK), ("volcans", WHITE)], 44), 0.8)
        self.play(FadeIn(res, scale=0.7), run_time=0.4)
        self.insister(res[1], 1.5, 0.25)
        self.attendre_voix()

    # ── 04 : ET ─────────────────────────────────────────────────────────────

    def ecran_et(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-et")
        tb = self.tableur()
        autres = [i for i in range(N) if i not in HAUTS]
        for r in autres:
            rang(tb, r).set_opacity(0.16)
        self.add(tb)
        g = self.deux_filtres("Altitude (m) ≥ 3 000", "Éruption = Oui")
        self.add(g[0])
        self.au_mot("Deuxième critère")
        self.play(FadeIn(g[1], scale=1.5), FadeIn(g[2], shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("Parmi les 6")
        self.play(*[a for r in HAUTS for a in tb.allumer_case(r, 2)], run_time=0.5)
        self.au_mot("on ne garde que")
        sortent = [r for r in HAUTS if r not in HAUTS_ACTIFS]
        self.play(*masquer(tb, sortent), run_time=0.7)
        for r, mot in zip(HAUTS_ACTIFS, ["le Mauna Loa", "l'Erebus", "le Nyiragongo"]):
            self.au_mot(mot)
            self.play(Indicate(rang(tb, r), color=AMBRE, scale_factor=1.05), run_time=0.3)
        self.au_mot("il reste 3 volcans")
        res = self.col(self.ligne([("ET →", AMBRE), ("3", VERT_OK), ("volcans", WHITE)], 44), 0.2)
        self.play(FadeIn(res, scale=0.7), run_time=0.4)
        self.insister(res[1], 1.5, 0.25)
        self.au_mot("les deux critères à la fois")
        r2 = self.col(self.bloc(["les deux critères", "à la fois"], 38, VERT_OK), -0.9)
        self.play(FadeIn(r2, shift=UP * 0.2), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (Sud ET Oui) ────────────────────────────────────────

    def ecran_question1(self):
        tb = self.tableur()

        def reponse(s):
            s.play(*masquer(tb, [i for i in range(N) if i not in SUD_ACTIFS]),
                   *[a for r in SUD_ACTIFS for a in tb.allumer_ligne(r)], run_time=0.6)

        self.ecran_question("05-question", "05b-reponse", ["« Hémisphère = Sud »", "ET « Éruption = Oui » :",
                                                            "combien de volcans ?"],
                            ["3", "7", "4"], 0, ["4 : le seul critère Sud ;", "7 : c'est un OU."],
                            figure=tb, autres_r=reponse, mot_q="Avec le filtre")

    # ── 06 : la case du tableau croisé ──────────────────────────────────────

    def ecran_croise(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-croise")
        cr = self.croise()
        self.au_mot("Le tableau croisé")
        self.play(FadeIn(cr, shift=UP * 0.2), run_time=0.6)
        self.au_mot("éruption ou non")
        self.play(Indicate(cr.libelles[:2], color=AMBRE), run_time=0.5)
        self.au_mot("Nord ou Sud")
        self.play(Indicate(cr.tetes[:2], color=AMBRE), run_time=0.5)
        self.au_mot("dans une seule case")
        l1 = self.col(self.bloc(["ET : une seule case,", "à la croisée"], 40), 2.3)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("de la ligne Oui")
        lig = SurroundingRectangle(VGroup(cr.libelles[0], *cr.cases[0][:2]), color=ORANGE_V, buff=0.03,
                                   stroke_width=6)
        self.play(Create(lig), run_time=0.4)
        self.au_mot("et de la colonne Sud")
        col = SurroundingRectangle(VGroup(cr.tetes[1], cr.cases[0][1], cr.cases[1][1]), color=VIOLET_H, buff=0.03,
                                   stroke_width=6)
        self.play(Create(col), run_time=0.4)
        self.au_mot(": 3.")
        self.play(*cr.allumer_case(0, 1), run_time=0.4)
        self.play(cr.cases[0][1][1].animate.scale(1.6), run_time=0.3)
        self.play(cr.cases[0][1][1].animate.scale(1 / 1.6), run_time=0.3)
        f = self.col(VGroup(barre_filtre("Éruption = Oui", 28), Text("ET", font_size=34, color=AMBRE, weight=BOLD),
                            barre_filtre("Hémisphère = Sud", 28)).arrange(DOWN, aligned_edge=LEFT, buff=0.1), 0.0)
        res = self.col(self.ligne([("→", WHITE), ("3", VERT_OK), ("volcans", WHITE)], 44), -1.6)
        self.play(FadeIn(f, shift=UP * 0.2), FadeIn(res, scale=0.7), run_time=0.5)
        self.attendre_voix()

    # ── 07 : le piège (additionner) ─────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        cr = self.croise()
        self.add(cr)
        self.au_mot("Le piège")
        tit = self.col(VGroup(self.t("Le piège :", 46, ROUGE_ERREUR), self.t("additionner", 40, ROUGE_ERREUR)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.08), 2.85)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("La ligne Oui fait 6")
        self.play(*cr.allumer_case(0, 2, couleur="#fed7aa", anneau=ORANGE_V), run_time=0.4)
        self.au_mot("la colonne Sud fait 4")
        self.play(*cr.allumer_case(2, 1, couleur="#ddd6fe", anneau=VIOLET_H), run_time=0.4)
        self.au_mot("6 plus 4")
        s = self.col(self.ligne([("6", ORANGE_V), ("+", WHITE), ("4", VIOLET_CLAIR)], 46), 1.45)
        self.play(FadeIn(s, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 10")
        r = self.ligne([("=", WHITE), ("10", ROUGE_ERREUR)], 46).next_to(s, RIGHT, buff=0.2)
        self.play(FadeIn(r, scale=1.3), *cr.allumer_case(2, 2, couleur="#fecaca", anneau=ROUGE_ERREUR), run_time=0.4)
        self.au_mot("c'est tout le fichier")
        l2 = self.col(self.t("= tout le fichier !", 38, ROUGE_ERREUR), 0.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Create(croix(VGroup(s, r), sw=6)), run_time=0.5)
        self.au_mot("on ne prend que la case commune")
        self.play(*cr.eteindre(), run_time=0.2)
        self.play(*cr.allumer_case(0, 1), run_time=0.4)
        bon = self.col(self.bloc(["ET : la case commune,", "ici 3."], 40, VERT_OK), -0.5)
        self.play(FadeIn(bon, shift=UP * 0.2), run_time=0.45)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (ET NON) ────────────────────────────────────────────

    def ecran_question2(self):
        cr = self.croise()

        def reponse(s):
            s.play(*cr.allumer_case(1, 1), run_time=0.5)
            s.play(cr.cases[1][1][1].animate.scale(1.6), run_time=0.25)
            s.play(cr.cases[1][1][1].animate.scale(1 / 1.6), run_time=0.25)

        self.ecran_question("08-question", "08b-reponse", ["« Hémisphère = Sud »", "ET NON « Éruption = Oui » :",
                                                            "combien de volcans ?"],
                            ["1", "3", "4"], 0, ["NON Oui = Non : la case Sud / Non.", "3 oublie le NON ; 4 = la colonne."],
                            figure=cr, autres_r=reponse, mot_q="Combien de volcans")

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
        q1 = self.col(VGroup(self.t("1. Combien de volcans ?", 34),
                             barre_filtre("Hémisphère = Nord", 28), Text("ET", font_size=30, color=AMBRE, weight=BOLD),
                             barre_filtre("Éruption = Non", 28)).arrange(DOWN, aligned_edge=LEFT, buff=0.1), 1.25)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Deux : et le filtre")
        q2 = self.col(VGroup(self.t("2. Et avec :", 34), barre_filtre("Altitude (m) ≥ 4 000", 28),
                             Text("ET", font_size=30, color=AMBRE, weight=BOLD),
                             barre_filtre("Éruption = Non", 28)).arrange(DOWN, aligned_edge=LEFT, buff=0.1), -1.05)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), -2.7)
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
        cr = croise(["Oui", "Non"], ["Nord", "Sud"], [[3, 3], [3, 1]], fs=24, coin="Éruption", largeur_case=1.2,
                    largeur_libelle=2.0, hauteur=0.55)
        cr.scale_to_fit_height(1.5)
        self.col(cr, 1.65)
        self.au_mot("la case Nord et Non")
        self.play(FadeIn(cr, shift=RIGHT * 0.2), run_time=0.4)
        self.play(*cr.allumer_case(1, 0), run_time=0.4)
        self.au_mot("3 volcans")
        l1 = self.col(self.ligne([("1.", AMBRE), ("3", VERT_OK), ("volcans", WHITE)], 40), 0.4)
        nn = [i for i in range(N) if HEMI[i] == "Nord" and ERUP[i] == "Non"]
        self.play(FadeIn(l1, shift=RIGHT * 0.2), *[a for r in nn for a in tb.allumer_ligne(r)], run_time=0.5)
        self.au_mot("Deux : 2 volcans")
        self.play(*tb.eteindre(), run_time=0.2)
        l2 = self.col(self.ligne([("2.", AMBRE), ("≥ 4 000 m :", WHITE), ("2", AMBRE)], 40), -0.45)
        quatre = [i for i in range(N) if ALT[i] >= 4000]
        self.play(FadeIn(l2, shift=RIGHT * 0.2), *[a for r in quatre for a in tb.allumer_case(r, 0)], run_time=0.5)
        self.au_mot("seul le Kilimandjaro")
        self.play(*tb.allumer_case(3, 2), *masquer(tb, [i for i in range(N) if i != 3]), run_time=0.5)
        self.au_mot("1 seul volcan")
        l3 = self.col(self.ligne([("→", WHITE), ("1", VERT_OK), ("seul volcan", WHITE)], 40), -1.3)
        self.play(FadeIn(l3, scale=0.7), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        tb = self.tableur()
        self.add(tb)
        lignes = self.finale_colonne(figure=tb, textes=[("ET : une ligne est gardée", "si elle vérifie les deux", "critères à la fois."),
                                      ("Je filtre sur le premier,", "puis, parmi ceux qui restent,", "sur le second."),
                                      ("Tableau croisé : un ET,", "c'est une seule case,", "jamais une somme.")], fs=32)
        self.au_mot("Avec ET")
        self.montrer_ligne(lignes[0], *masquer(tb, [i for i in range(N) if i not in HAUTS_ACTIFS]))
        self.au_mot("Je filtre sur le premier")
        self.montrer_ligne(lignes[1])
        self.au_mot("Dans un tableau croisé")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_fichier()
        self.ecran_premier()
        self.ecran_et()
        self.ecran_question1()
        self.ecran_croise()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsFiltreEtPremiere(StatsFiltreEtBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"


class StatsFiltreEtStmg(StatsFiltreEtBase):
    """Même vidéo pour la STMG : identité et ceinture seulement."""

    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
