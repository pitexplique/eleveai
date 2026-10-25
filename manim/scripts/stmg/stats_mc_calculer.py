# stats_mc_calculer.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE, épisode 28-mc-calculer :
# CALCULER LA SOMME DES CARRÉS DES ÉCARTS (micro du coach statT_mc_calculer :
# « calculer la somme des carrés des écarts pour une droite donnée »), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE (la paysage complète du niveau : prévu, écart,
# carré, somme, les deux pièges, le point qui pèse le plus, défi).
# Short jumeau : stats_mc_calculer_short.py (ORANGE).
#
# ⭐ Décor et métier : la SANTÉ ; un SAGE-FEMME qui dirige une maternité prévoit
# ses lits (problématique : prévoir, contrôler un modèle).
# Centres d'intérêt : corps-sante.
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : naissances vivantes en France
# (Insee, « Naissances et taux de natalité », insee.fr/fr/statistiques/2381380),
# en milliers : 2016 : 783,6 · 2017 : 769,6 · 2018 : 758,6 · 2019 : 753,4,
# arrondies au millier : 784, 770, 759, 753.
# ⭐ Calculs vérifiés en Python : x = 1..4 ; D : y = −10x + 793 → prévu 783, 773,
# 763, 753 ; écarts +1, −3, −4, 0 ; carrés 1, 9, 16, 0 ; somme 26 (sans carrés :
# −6) ; D' : y = −11x + 794 → prévu 783, 772, 761, 750 ; écarts +1, −2, −2, +3 ;
# carrés 1, 4, 4, 9 ; somme 18. (La droite des moindres carrés, y = −10,4x +
# 792,5, donne 16,2.) Question 3 : écarts 2, −1, −2 → 4 + 1 + 4 = 9.
# ⭐ Figure du coach : `tableau_donnees` (canvasTableauNuage de la banque :
# x en en-tête, les relevés dessous), prolongé en tableur : prévu, écart, carré.
# ⛔ PAS D'ÉCART : chaque nombre au mot.
#
# Mapping micro → écrans : tpl_1 (la somme) → 03-06, question 09, défi ·
# tpl_2 (le point qui pèse le plus) → question 08 ; erreurs typiques (signe de
# l'écart, oubli du carré, (−3)² = −9) → question 05, 07, question 09.
# Écrans : 00 garde · 01 le sage-femme · 02 la droite du stagiaire · 03 prévu ·
# 04 écart · 05 QUESTION · 06 carrés et somme · 07 les pièges · 08 QUESTION ·
# 09 QUESTION · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# Voix : manim/voix/stmg-stats-mc-calculer.json (débit −7) ; marques :
# manim/scripts/stmg/stats_mc_calculer_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_mc_calculer.py StatsMcCalculerStmg -o eleveai-maths-stmg-stats-mc-calculer --media_dir manim/scripts/stmg/media-stats-mc-calculer-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/28-mc-calculer/eleveai-maths-stmg-stats-mc-calculer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j2_commun import *  # noqa: E402,F403

XS = [1, 2, 3, 4]
YS = [784, 770, 759, 753]
A, B = -10, 793
PREVU = [783, 773, 763, 753]
ECART = ["+1", "−3", "−4", "0"]
CARRE = [1, 9, 16, 0]
A2, B2 = -11, 794
PREVU2 = [783, 772, 761, 750]
ECART2 = ["+1", "−2", "−2", "+3"]
CARRE2 = [1, 4, 4, 9]
LIB = ["Observé", "Prévu", "Écart", "Carré"]


def berceau(h=1.5):
    """Un berceau dessiné, et le bébé emmailloté."""
    caisse = Polygon(P(-0.8, 0), P(0.8, 0), P(0.6, -0.55), P(-0.6, -0.55), fill_color="#93c5fd", fill_opacity=1,
                     stroke_color=WHITE, stroke_width=3)
    pieds = VGroup(Arc(radius=0.9, start_angle=-PI * 0.8, angle=PI * 0.6, color=WHITE, stroke_width=4).shift(UP * 0.1))
    bebe = VGroup(Ellipse(width=0.9, height=0.4, fill_color="#fde68a", fill_opacity=1, stroke_color=WHITE,
                          stroke_width=2).shift(UP * 0.12),
                  Circle(radius=0.17, fill_color="#fcd9b6", fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to(P(-0.55, 0.15)))
    return VGroup(pieds, caisse, bebe).scale_to_fit_height(h)


class StatsMcCalculerBase(PaysageJ2):
    nom_voix = "stmg-stats-mc-calculer"
    fichier_marques = "stats_mc_calculer_marques.json"

    def nuage(self, centre=P(-3.4, -0.25)):
        return self.cadrer(Nuage(XS, YS, 0, 5, 740, 800, pas_x=1, pas_y=10, fin_x=1, fin_y=5, largeur=5.4, hauteur=4.2,
                                 nom_x="Rang de l'année", nom_y="Naissances (milliers)", fs=24, centre=centre))

    def table(self, prevu=None, ecart=None, carre=None, lignes=None, entetes=XS):
        """Le tableur à gauche ; prevu / ecart / carre : listes (None = vide)."""
        vide = [None] * 4
        rows = lignes or [YS, prevu or vide, ecart or vide, carre or vide]
        tb = tableur([str(x) for x in entetes], rows, LIB, coin="x", largeur_case=1.3, largeur_libelle=2.3,
                     hauteur=0.85, fs=36)
        return self.cadrer(tb, droite=0.55, haut=3.4, bas=-1.5)

    def somme_txt(self, tb, valeur, couleur=VERT_OK):
        s = self.ligne([("Somme des carrés", WHITE), ("=", WHITE), (str(valeur), couleur)], 40)
        return s.next_to(tb, DOWN, buff=0.45).align_to(tb, LEFT).shift(RIGHT * 0.3)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer la somme des carrés des écarts", self.identite, self.ceinture)
        n = self.nuage(centre=P(-0.6, 0.0))
        n.scale(0.6).move_to(P(-0.6, 0.0))
        self.au_mot("Calculer la somme")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.play(FadeIn(n.fond), FadeIn(n.ronds, scale=2), Create(droite(n, A, B)), run_time=0.7)
        self.au_mot("avec un seul nombre")
        self.play(LaggedStart(*[GrowFromEdge(c, LEFT) for c in carres(n, A, B)], lag_ratio=0.2), run_time=0.9)
        self.au_mot("colle bien")
        self.play(Indicate(n.ronds, color=AMBRE, scale_factor=1.3), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : le sage-femme ──────────────────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        b = berceau(1.4).move_to(P(-4.2, 1.5))
        metier = self.t("Sage-femme", 46, BLEU_CALCUL).move_to(P(-4.2, 0.0))
        self.au_mot("Un sage-femme")
        self.play(GrowFromCenter(b), FadeIn(metier, shift=UP * 0.2), run_time=0.7)
        self.au_mot("dirige une maternité")
        self.poser(self.bloc(["Il dirige une maternité :", "combien de lits prévoir ?"], 38, JAUNE_TITRE), 2.3)
        self.au_mot("les naissances en France")
        self.poser(self.ligne([("Naissances en France", WHITE), ("(Insee)", GREY_B)], 34), 1.15)
        ys = [0.35, -0.3, -0.95, -1.6]
        for an, v, y, mot in zip([2016, 2017, 2018, 2019], YS, ys, ["784 milliers", "770", "759", "753"]):
            self.au_mot(mot)
            self.poser(self.ligne([(f"{an} :", WHITE), (f"{v} milliers", VIOLET_CLAIR)], 34), y, run_time=0.3)
        self.attendre_voix()

    # ── 02 : la droite du stagiaire ─────────────────────────────────────────

    def ecran_droite(self):
        self.ecran("02-droite")
        n = self.nuage()
        self.play(FadeIn(n.fond), FadeIn(n.ronds, scale=2), run_time=0.4)
        self.au_mot("Un stagiaire")
        self.titre_col("La droite du stagiaire", y=2.75, fs=40)
        self.au_mot("moins 10 x plus 793")
        eq = self.ligne([("D : y =", WHITE), ("−10x + 793", BLEU_CLAIR)], 42)
        self.poser(eq, 1.8, "pop")
        self.play(Create(droite(n, A, B)), run_time=0.7)
        self.au_mot("le rang de l'année")
        self.poser(self.ligne([("x : rang de l'année,", ORANGE_V), ("1 à 4", ORANGE_V)], 34), 0.9)
        self.play(*[Indicate(n.nx[v], color=ORANGE_V, scale_factor=1.6) for v in XS], run_time=0.5)
        self.au_mot("Est-elle bonne")
        self.poser(self.t("Est-elle bonne ?", 40, AMBRE), 0.0, "pop")
        self.au_mot("colonne par colonne")
        self.poser(self.bloc(["→ sa somme des carrés", "des écarts, colonne", "par colonne"], 34, VERT_OK), -1.1)
        self.play(Create(residus(n, A, B)), run_time=0.6)
        self.attendre_voix()

    # ── 03 : la valeur prévue ───────────────────────────────────────────────

    def ecran_prevu(self):
        self.ecran("03-prevu")
        tb = self.table()
        self.play(FadeIn(tb), run_time=0.4)
        self.au_mot("la valeur prévue")
        self.titre_col("1. Le prévu", BLEU_CLAIR, y=2.75)
        self.play(*tb.allumer_ligne(1), run_time=0.4)
        self.au_mot("Pour x égale 1")
        self.poser(self.ligne([("x = 1 :", ORANGE_V)], 38), 1.8)
        self.au_mot("moins 10 fois 1")
        c = self.poser(self.t("−10 × 1 + 793", 40, BLEU_CLAIR), 1.0, "pop")
        self.au_mot("cela donne 783")
        r = self.poser(self.ligne([("=", WHITE), ("783", BLEU_CLAIR)], 44), 0.15, "pop")
        self.play(remplir(tb, 1, 0, 783, BLEU_D), run_time=0.5)
        for j, mot in zip([1, 2, 3], ["773", "763", "753"]):
            self.au_mot(mot)
            self.play(remplir(tb, 1, j, PREVU[j], BLEU_D), run_time=0.35)
        self.play(*tb.eteindre(), run_time=0.3)
        self.attendre_voix()

    # ── 04 : l'écart ────────────────────────────────────────────────────────

    def ecran_ecart(self):
        self.ecran("04-ecart")
        tb = self.table(prevu=PREVU)
        self.add(tb)
        self.au_mot("Ensuite, l'écart")
        self.titre_col("2. L'écart", AMBRE, y=2.75)
        self.play(*tb.allumer_ligne(2), run_time=0.4)
        self.au_mot("observé moins prévu")
        f = self.ligne([("écart =", WHITE), ("observé", ROUGE_PT), ("−", WHITE), ("prévu", BLEU_CLAIR)], 36)
        self.poser(f, 1.8, "pop")
        self.au_mot("toujours dans cet ordre")
        self.play(Indicate(f[1], color=ROUGE_PT), Indicate(f[3], color=BLEU_CLAIR), run_time=0.6)
        self.au_mot("784 moins 783")
        self.poser(self.t("784 − 783", 40), 0.85)
        self.au_mot("plus 1")
        self.play(remplir(tb, 2, 0, "+1", "#b45309"), run_time=0.4)
        self.au_mot("770 moins 773")
        self.poser(self.t("770 − 773", 40), -0.05)
        self.au_mot("moins 3")
        self.play(remplir(tb, 2, 1, "−3", "#b45309"), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        tb = self.table(prevu=PREVU, ecart=ECART[:2] + [None, None])

        def montrer(s):
            s.play(*tb.allumer_colonne(2), run_time=0.4)

        def reponse(s):
            s.play(remplir(tb, 2, 2, "−4", "#b45309"), run_time=0.4)

        self.ecran_question("05-question", "05b-reponse", ["2018 : observé 759, prévu 763.", "Quel est l'écart ?"],
                            ["−4", "+4", "16"], 0, ["759 − 763 = −4 :", "sous la droite."],
                            figure=tb, autres_q=montrer, mot_q="En 2018")

    # ── 06 : les carrés et la somme ─────────────────────────────────────────

    def ecran_carres(self):
        self.ecran("06-carres")
        tb = self.table(prevu=PREVU, ecart=ECART[:3] + [None])
        self.add(tb)
        self.au_mot("753 moins 753")
        self.poser(self.t("753 − 753", 38), 2.75)
        self.au_mot(", 0")
        self.play(remplir(tb, 2, 3, "0", "#b45309"), run_time=0.4)
        self.poser(self.t("le point est sur la droite", 32, GREY_B), 2.1)
        self.au_mot("chaque écart au carré")
        self.titre_col("3. Le carré", ROSE_CLAIR, y=1.15)
        self.play(*tb.allumer_ligne(3), run_time=0.4)
        for j, mot in enumerate(["1, 9", "9, 16", "16 et", "0. Puis"]):
            self.au_mot(mot)
            self.play(remplir(tb, 3, j, CARRE[j], ROSE_C), run_time=0.3)
        self.au_mot("vaut 26")
        s = self.somme_txt(tb, 26)
        self.play(FadeIn(s, scale=0.7), *tb.eteindre(), run_time=0.45)
        self.insister(s[1], 1.5)
        self.attendre_voix()

    # ── 07 : les pièges ─────────────────────────────────────────────────────

    def ecran_pieges(self):
        self.ecran("07-piege")
        tb = self.table(prevu=PREVU, ecart=ECART, carre=CARRE)
        self.add(tb)
        self.au_mot("Le piège")
        tit = self.col(VGroup(self.t("Le piège :", 44, ROUGE_ERREUR), self.t("oublier les carrés", 40, ROUGE_ERREUR))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 2.75)
        self.play(Write(tit), run_time=0.5)
        self.play(*tb.allumer_ligne(2), run_time=0.4)
        self.au_mot("1, moins 3")
        f = self.poser(self.t("1 − 3 − 4 + 0", 40), 1.6)
        self.au_mot("font moins 6")
        r = self.poser(self.ligne([("=", WHITE), ("−6", ROUGE_ERREUR)], 44), 0.9, "pop")
        self.play(Create(croix(r[1])), run_time=0.4)
        self.au_mot("ne mesure rien")
        self.poser(self.t("Négatif : ça ne mesure rien !", 34, ROUGE_ERREUR), 0.25)
        self.au_mot("Autre piège")
        self.play(*tb.eteindre(), *tb.allumer_case(3, 1), run_time=0.4)
        self.au_mot("moins 3 au carré fait plus 9")
        self.poser(self.ligne([("(−3)² =", WHITE), ("+9", VERT_OK)], 44), -0.6, "pop")
        self.au_mot("pas moins 9")
        self.poser(self.t("et pas −9 !", 40, ROUGE_ERREUR), -1.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (le point qui pèse le plus) ─────────────────────────

    def ecran_question2(self):
        tb = self.table(prevu=PREVU, ecart=ECART, carre=CARRE)

        def reponse(s):
            s.play(*tb.allumer_case(3, 2), run_time=0.4)

        self.ecran_question("08-question", "08b-reponse", ["Quel point pèse le plus", "dans cette somme ?"],
                            ["2016", "2017", "2018"], 2, ["2018 : un carré de 16.", "Son écart, −4,", "est le plus grand."],
                            figure=tb, autres_r=reponse, mot_q="Quel point")

    # ── 09 : QUESTION 3 (une autre droite) ──────────────────────────────────

    def ecran_question3(self):
        tb = tableur(["1", "2", "3"], [["2", "−1", "−2"], [None] * 3], ["Écart", "Carré"], coin="Point",
                     largeur_case=1.4, largeur_libelle=2.2, hauteur=0.85, fs=36)
        self.cadrer(tb, droite=0.55)

        self.ecran_question("09-question", "09b-reponse", ["Écarts : 2, −1 et −2.", "Somme des carrés ?"],
                            ["−1", "9", "5"], 1, ["4 + 1 + 4 = 9.", "−1 oublie les carrés ;", "5 oublie les signes."],
                            figure=tb, mot_q="Pour une autre droite")

    # ── 10 : défi + correction ──────────────────────────────────────────────

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        tb = self.table(prevu=["?"] * 4, ecart=["?"] * 4, carre=["?"] * 4)
        self.au_mot("À toi de jouer")
        self.play(FadeIn(tb), run_time=0.4)
        self.titre_col("À toi de jouer !", y=2.75, fs=48)
        self.au_mot("moins 11 x plus 794")
        self.poser(self.ligne([("D' : y =", WHITE), ("−11x + 794", BLEU_CLAIR)], 40), 1.8, "pop")
        self.au_mot("Calcule sa somme")
        self.poser(self.bloc(["Calcule sa somme", "des carrés des écarts."], 36), 0.85)
        self.au_mot("Laquelle des deux droites")
        self.poser(self.bloc(["D ou D' : laquelle", "colle le mieux ?"], 36, AMBRE), -0.35)
        self.pause_defi(y=-1.45)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tb = self.table(prevu=["?"] * 4, ecart=["?"] * 4, carre=["?"] * 4)
        self.add(tb)
        self.titre_col("Correction", y=2.75, fs=48)
        self.poser(self.ligne([("D' : y =", WHITE), ("−11x + 794", BLEU_CLAIR)], 36), 1.95)
        mots = [["Prévu : 783", "772", "761", "750"], ["plus 1", "moins 2,", "moins 2 et", "plus 3"],
                ["Carrés : 1", "4, 4", "4 et 9", "9. Somme"]]
        vals = [PREVU2, ECART2, CARRE2]
        coul = [BLEU_D, "#b45309", ROSE_C]
        for r in range(3):
            for j in range(4):
                self.au_mot(mots[r][j])
                self.play(remplir(tb, r + 1, j, vals[r][j], coul[r]), run_time=0.25)
        self.au_mot("Somme : 18")
        s = self.somme_txt(tb, 18)
        self.play(FadeIn(s, scale=0.7), run_time=0.4)
        self.au_mot("18 est plus petit que 26")
        self.poser(self.ligne([("18", VERT_OK), ("<", WHITE), ("26", ROUGE_ERREUR)], 48), 0.85, "pop")
        self.au_mot("la droite de la collègue colle mieux")
        self.poser(self.bloc(["D' colle mieux", "au nuage que D."], 38, VERT_OK), -0.3)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        tb = self.table(prevu=PREVU, ecart=ECART, carre=CARRE)
        self.add(tb)
        lignes = self.finale_colonne(figure=tb, textes=[("Le prévu, puis l'écart :", "observé − prévu."),
                                                        ("Chaque écart au carré,", "puis la somme."),
                                                        ("Plus la somme est petite,", "mieux la droite colle.")])
        self.au_mot("je calcule la valeur prévue")
        self.montrer_ligne(lignes[0], *tb.allumer_ligne(2))
        self.au_mot("J'élève chaque écart au carré")
        self.montrer_ligne(lignes[1], *tb.eteindre(), *tb.allumer_ligne(3))
        self.au_mot("Plus la somme est petite")
        self.montrer_ligne(lignes[2], *tb.eteindre())
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_droite()
        self.ecran_prevu()
        self.ecran_ecart()
        self.ecran_question1()
        self.ecran_carres()
        self.ecran_pieges()
        self.ecran_question2()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class StatsMcCalculerStmg(StatsMcCalculerBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
