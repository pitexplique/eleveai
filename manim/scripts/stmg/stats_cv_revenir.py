# stats_cv_revenir.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE, épisode 32-cv-revenir :
# REVENIR AUX VARIABLES DE DÉPART (micro du coach statT_cv_revenir : « revenir
# aux variables initiales après un ajustement sur les variables transformées »),
# AVEC VOIX. Paysage 16:9, CEINTURE BLEUE (au-dessus de la verte du niveau :
# deux étapes, puissance de dix, le piège « 10 × z », les limites d'un modèle).
# Short jumeau : stats_cv_revenir_short.py (VERTE).
#
# ⭐ Décor et métier : la DÉMOGRAPHIE de l'Afrique ; un URBANISTE prépare écoles
# et logements pour les villes du continent (problématique : prévoir, garder une
# marge). Centres d'intérêt : histoire-geographie.
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : population de l'Afrique au
# 1er juillet, ONU, World Population Prospects 2024 (statisticstimes.com,
# « Population of Africa ») : 1960 : 283,9 M · 1970 : 365,6 · 1980 : 483,1 ·
# 1990 : 643,8 · 2000 : 830,6 · 2010 : 1 072,2 · 2020 : 1 380,8 ; projection
# (variante moyenne) 2030 : 1 727,2 M. Arrondis : 284, 366, 483, 644, 831,
# 1 072, 1 381 ; 1 727.
# ⭐ Calculs vérifiés en Python : x = 0..6 ; z = log(y) = 2,453 · 2,563 · 2,684 ·
# 2,809 · 2,920 · 3,030 · 3,140 ; moindres carrés (x ; z) : a = 0,11535,
# b = 2,45391 → z = 0,115x + 2,454 (au millième) ; 2030 (x = 7) : z = 3,259 →
# y = 10^3,259 ≈ 1 815,5 ≈ 1 816 M ; leurres : 0,115 × 7 = 0,805 (oubli de b),
# 0,115 + 2,454 = 2,569 (oubli du × 7), 10 × 3,259 = 32,59 ; 2040 (x = 8) :
# z = 3,374 → 10^3,374 ≈ 2 366 M.
# ⭐ Figures du coach : `fonctionGraphique` (canvasNuagePoints : nuage (x ; z =
# log y) et sa droite ; puis le nuage d'origine). ⛔ PAS D'ÉCART : chaque nombre
# au mot.
#
# Mapping micro → écrans : tpl_1 (z = ax + b, puis y = 10^z) → 03-06, question
# 05, défi · tpl_2 (diagnostiquer « 10 × z ») → 07, question 08 ; limites → 09.
# Écrans : 00 garde · 01 l'urbaniste · 02 les données · 03 l'ajustement ·
# 04 étape 1 · 05 QUESTION · 06 étape 2 · 07 le piège · 08 QUESTION · 09 les
# limites · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# Voix : manim/voix/stmg-stats-cv-revenir.json (débit −7) ; marques :
# manim/scripts/stmg/stats_cv_revenir_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_cv_revenir.py StatsCvRevenirStmg -o eleveai-maths-stmg-stats-cv-revenir --media_dir manim/scripts/stmg/media-stats-cv-revenir-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/32-cv-revenir/eleveai-maths-stmg-stats-cv-revenir.mp4

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_j2_commun import *  # noqa: E402,F403
from stats_cv_lire import puiss  # noqa: E402

XS = [0, 1, 2, 3, 4, 5, 6]
YS = [284, 366, 483, 644, 831, 1072, 1381]
ZS = [math.log10(y) for y in YS]
A, B = 0.115, 2.454
Z7, Y7 = 3.259, 1816
ONU30 = 1727


def immeubles(h=1.5):
    """Une petite ville dessinée : trois immeubles et une école au drapeau."""
    bats = VGroup()
    for x, hh, c in [(-0.7, 1.1, "#64748b"), (-0.2, 1.6, "#475569"), (0.3, 1.25, "#94a3b8")]:
        b = Rectangle(width=0.45, height=hh, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        b.move_to(P(x, hh / 2))
        fen = VGroup(*[Square(0.08, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(
            P(x - 0.1 + 0.2 * (k % 2), 0.25 + 0.25 * (k // 2))) for k in range(int(hh / 0.25) * 2 - 2)])
        bats.add(b, fen)
    ecole = VGroup(Rectangle(width=0.7, height=0.5, fill_color="#f59e0b", fill_opacity=1, stroke_color=WHITE,
                             stroke_width=2).move_to(P(0.95, 0.25)),
                   Polygon(P(0.55, 0.5), P(1.35, 0.5), P(0.95, 0.8), fill_color="#b45309", fill_opacity=1,
                           stroke_color=WHITE, stroke_width=2),
                   Line(P(0.95, 0.8), P(0.95, 1.15), color=WHITE, stroke_width=2),
                   Polygon(P(0.95, 1.15), P(1.2, 1.07), P(0.95, 0.99), fill_color=VERT_OK, fill_opacity=1, stroke_width=0))
    return VGroup(bats, ecole).scale_to_fit_height(h)


class StatsCvRevenirBase(PaysageJ2):
    nom_voix = "stmg-stats-cv-revenir"
    fichier_marques = "stats_cv_revenir_marques.json"

    def nuage_z(self, centre=P(-3.4, -0.25)):
        return self.cadrer(Nuage(XS, ZS, 0, 8, 2.4, 3.6, pas_x=1, pas_y=0.2, fin_x=1, fin_y=0.1, largeur=5.6,
                                 hauteur=4.2, nom_x="Rang de la décennie (x)", nom_y="z = log(y)", fs=24, centre=centre))

    def nuage_y(self, centre=P(-3.4, -0.25)):
        return self.cadrer(Nuage(XS, YS, 0, 8, 0, 2500, pas_x=1, pas_y=500, fin_x=1, fin_y=250, largeur=5.6,
                                 hauteur=4.2, nom_x="Rang de la décennie (x)", nom_y="Population (millions)", fs=24,
                                 centre=centre))

    def z_pret(self, ligne=True):
        n = self.nuage_z()
        self.add(n.fond, n.ronds)
        d = None
        if ligne:
            d = droite(n, A, B)
            self.add(d)
        return n, d

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Revenir aux variables de départ", self.identite, self.ceinture)
        n = self.nuage_z(centre=P(-0.6, 0.0))
        n.scale(0.6).move_to(P(-0.6, 0.0))
        self.au_mot("Revenir aux variables")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("On a ajusté")
        self.play(FadeIn(n.fond), FadeIn(n.ronds, scale=2), Create(droite(n, A, B, BLEU_D, 4)), run_time=0.7)
        self.au_mot("la vraie valeur")
        f = self.ligne([("z", VERT_OK), ("→", WHITE), ("y ?", AMBRE)], 56).next_to(n, RIGHT, buff=0.4)
        self.play(FadeIn(f, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'urbaniste ────────────────────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        im = immeubles(1.7).move_to(P(-4.2, 1.3))
        metier = self.t("Urbaniste", 46, BLEU_CALCUL).move_to(P(-4.2, -0.4))
        self.au_mot("Un urbaniste")
        self.play(GrowFromEdge(im, DOWN), FadeIn(metier, shift=UP * 0.2), run_time=0.7)
        self.au_mot("des écoles et des logements")
        self.poser(self.bloc(["Des écoles et des logements", "pour les villes d'Afrique"], 36, JAUNE_TITRE), 2.4)
        self.au_mot("Selon l'ONU")
        self.poser(self.t("Population de l'Afrique (ONU)", 32, GREY_B), 1.3)
        self.au_mot("284 millions")
        self.poser(self.ligne([("1960 :", WHITE), ("284 millions", VIOLET_CLAIR)], 40), 0.4, "pop")
        self.au_mot("1 381 millions")
        self.poser(self.ligne([("2020 :", WHITE), ("1 381 millions", VIOLET_CLAIR)], 40), -0.45, "pop")
        self.attendre_voix()

    # ── 02 : les données ────────────────────────────────────────────────────

    def ecran_donnees(self):
        self.ecran("02-donnees")
        n = self.nuage_y()
        self.play(FadeIn(n.fond), FadeIn(n.ronds, scale=2), run_time=0.5)
        self.au_mot("le rang de la décennie")
        self.poser(self.ligne([("x :", ORANGE_V), ("rang de la décennie", WHITE)], 34), 2.6)
        self.au_mot("0 pour 1960")
        self.poser(self.ligne([("0 → 1960", ORANGE_V), ("·", WHITE), ("6 → 2020", ORANGE_V)], 34), 2.0)
        self.play(Indicate(n.nx[0], color=ORANGE_V, scale_factor=1.8), Indicate(n.nx[6], color=ORANGE_V, scale_factor=1.8),
                  run_time=0.6)
        self.au_mot("multipliée à peu près par le même nombre")
        self.poser(self.bloc(["× à peu près le même", "nombre chaque décennie"], 34, AMBRE), 1.05)
        self.au_mot("on a posé z égale log de y")
        self.poser(self.t("→ on a posé z = log(y)", 36, VERT_OK), 0.15)
        self.au_mot("le nuage x, z est aligné")
        m = self.nuage_z()
        n.ronds.set_z_index(5)
        self.play(*[n.ronds[i].animate.move_to(m.ronds[i]) for i in range(7)], FadeTransform(n.fond, m.fond), run_time=1.2)
        self.poser(self.t("Nuage (x ; z) : aligné", 36, VERT_OK), -0.75)
        self.attendre_voix()

    # ── 03 : l'ajustement ───────────────────────────────────────────────────

    def ecran_ajustement(self):
        self.ecran("03-ajustement")
        n, _ = self.z_pret(ligne=False)
        self.au_mot("La droite des moindres carrés")
        self.play(Create(droite(n, A, B)), run_time=0.7)
        self.au_mot("0,115 x plus 2,454")
        eq = self.poser(self.ligne([("z =", WHITE), ("0,115x + 2,454", BLEU_CLAIR)], 42), 2.5, "pop")
        self.au_mot("arrondis au millième")
        self.poser(self.t("coefficients arrondis au millième", 28, GREY_B), 1.85)
        self.au_mot("Mais attention")
        att = self.poser(self.t("Attention !", 46, ROUGE_ERREUR), 0.85, "pop")
        self.au_mot("elle donne z, pas la population")
        self.poser(self.ligne([("Elle donne", WHITE), ("z", VERT_OK), (",", WHITE)], 38), -0.05)
        self.poser(self.ligne([("pas la population", WHITE), ("y", AMBRE), ("!", WHITE)], 38), -0.8)
        self.play(Indicate(n.nom_y, color=VERT_OK, scale_factor=1.3), run_time=0.5)
        self.attendre_voix()

    # ── 04 : étape 1 ────────────────────────────────────────────────────────

    def ecran_etape1(self):
        self.ecran("04-etape1")
        n, d = self.z_pret()
        self.au_mot("Prévoyons 2030")
        self.poser(self.ligne([("2030", AMBRE), ("→", WHITE), ("x = 7", ORANGE_V)], 42), 2.6, "pop")
        self.play(Create(n.verticale(7)), FadeIn(n.lu_x(7), scale=1.5), run_time=0.6)
        self.au_mot("Étape 1")
        self.poser(self.ligne([("Étape 1 :", JAUNE_TITRE), ("je calcule z", WHITE)], 38), 1.75)
        self.au_mot("0,115 fois 7")
        self.poser(self.t("0,115 × 7 + 2,454", 42, BLEU_CLAIR), 0.85)
        self.au_mot("z égale 3,259")
        r = self.poser(self.ligne([("z =", WHITE), ("3,259", VERT_OK)], 50), -0.05, "pop")
        pt = Dot(n.p(7, Z7), radius=0.11, fill_color=VERT_OK, stroke_color=WHITE, stroke_width=2)
        self.play(GrowFromCenter(pt), Create(n.horizontale(Z7)), run_time=0.5)
        self.insister(r[1], 1.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        n = self.nuage_z()
        d = droite(n, A, B)
        eq = self.ligne([("z =", WHITE), ("0,115x + 2,454", BLEU_CLAIR)], 34).next_to(n.carte, DOWN, buff=0.15)
        fig = VGroup(n.fond, n.ronds, d, n.verticale(7), eq)
        self.cadrer(fig, droite=0.55)
        self.ecran_question("05-question", "05b-reponse", ["Pour x = 7,", "combien vaut z ?"],
                            ["3,259", "0,805", "2,569"], 0, ["B oublie d'ajouter 2,454 ;", "C oublie de multiplier", "0,115 par 7."],
                            figure=fig, mot_q="Pour x égale 7")

    # ── 06 : étape 2 ────────────────────────────────────────────────────────

    def ecran_etape2(self):
        self.ecran("06-etape2")
        n = self.nuage_y()
        self.add(n.fond, n.ronds)
        self.au_mot("Étape 2")
        self.poser(self.ligne([("Étape 2 :", JAUNE_TITRE), ("je reviens à y", WHITE)], 38), 2.65)
        self.au_mot("Si z égale log de y")
        self.poser(self.ligne([("Si z = log(y),", VERT_OK), ("alors :", WHITE)], 40), 1.85)
        p = VGroup(self.t("y =", 44, AMBRE), puiss("10", "z", 56, AMBRE)).arrange(RIGHT, buff=0.2)
        self.poser(p, 1.0, "pop")
        self.insister(p, 1.1, 0.3)
        self.au_mot("10 puissance 3,259")
        self.poser(VGroup(puiss("10", "3,259", 48), self.t("≈", 44)).arrange(RIGHT, buff=0.2), 0.0)
        self.au_mot("environ 1 816 millions")
        r = self.poser(self.t("1 816 millions", 44, VERT_OK), -0.75, "pop")
        pt = Dot(n.p(7, Y7), radius=0.12, fill_color=VERT_OK, stroke_color=WHITE, stroke_width=2)
        self.play(GrowFromCenter(pt), Create(n.vers_y(x=7, y=Y7)), Create(n.vers_x(x=7, y=Y7)), run_time=0.6)
        self.au_mot("soit 1,8 milliard")
        self.poser(self.t("≈ 1,8 milliard d'habitants", 34, VERT_OK), -1.45)
        self.attendre_voix()

    # ── 07 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.ecran("07-piege")
        n = self.nuage_y()
        self.add(n.fond, n.ronds)
        self.au_mot("Le piège")
        self.titre_col("Le piège : 10 × z", ROUGE_ERREUR, y=2.75)
        self.au_mot("10 fois 3,259")
        f = self.poser(self.t("10 × 3,259", 44), 1.75)
        self.au_mot("32,59 millions")
        r = self.poser(self.ligne([("=", WHITE), ("32,59 millions", ROUGE_ERREUR)], 40), 0.95, "pop")
        pt = Dot(n.p(7, 32.59), radius=0.12, fill_color=ROUGE_ERREUR, stroke_color=WHITE, stroke_width=2)
        self.play(GrowFromCenter(pt), run_time=0.4)
        self.au_mot("absurde")
        self.play(Create(Line(r.get_left(), r.get_right(), color=ROUGE_ERREUR, stroke_width=6)), Flash(pt, color=ROUGE_ERREUR),
                  run_time=0.5)
        self.au_mot("moins qu'en 1960")
        self.poser(self.t("Absurde : moins qu'en 1960 !", 34, ROUGE_ERREUR), 0.15)
        self.play(Indicate(n.ronds[0], color=AMBRE, scale_factor=2), run_time=0.5)
        self.au_mot("Le log se défait")
        g = VGroup(self.t("log se défait par", 36), puiss("10", "z", 48, VERT_OK)).arrange(RIGHT, buff=0.25)
        self.poser(g, -0.75)
        self.au_mot("pas par une multiplication")
        self.poser(self.t("pas par une multiplication", 32, GREY_B), -1.45)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────

    def ecran_question2(self):
        n = self.nuage_y()
        fig = VGroup(n.fond, n.ronds, n.verticale(7))
        self.ecran_question("08-question", "08b-reponse", ["On a trouvé z = 3,259.", "Que vaut y ?"],
                            ["32,59", "environ 1 816", "log(3,259)"], 1, ["10 puissance 3,259.", "A multiplie par 10 ; C reprend", "le log au lieu de le défaire."],
                            figure=fig, mot_q="On a trouvé")

    # ── 09 : les limites ────────────────────────────────────────────────────

    def ecran_limites(self):
        self.ecran("09-limites")
        n = self.nuage_y()
        self.add(n.fond, n.ronds)
        pm = Dot(n.p(7, Y7), radius=0.12, fill_color=VERT_OK, stroke_color=WHITE, stroke_width=2)
        self.add(pm)
        lm = texte("modèle", 20, VERT_OK).set_stroke(WHITE, 4, background=True).next_to(pm, LEFT, buff=0.1)
        self.add(lm)
        self.au_mot("L'ONU, elle, prévoit")
        self.poser(self.t("Prévision de l'ONU :", 36, GREY_B), 2.6)
        self.au_mot("1 727 millions en 2030")
        po = Square(0.22, fill_color=AMBRE, fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to(n.p(7, ONU30))
        lo = texte("ONU", 20, "#b45309").set_stroke(WHITE, 4, background=True).next_to(po, RIGHT, buff=0.1)
        self.play(GrowFromCenter(po), FadeIn(lo), run_time=0.4)
        self.poser(self.ligne([("2030 :", WHITE), ("1 727 millions", AMBRE)], 40), 1.85, "pop")
        self.au_mot("la croissance ralentit")
        self.poser(self.ligne([("Modèle : 1 816", VERT_OK), (">", WHITE), ("1 727", AMBRE)], 36), 1.05)
        self.poser(self.t("La croissance ralentit.", 36), 0.3)
        self.au_mot("Un modèle prolonge le passé")
        self.poser(self.bloc(["Un modèle prolonge", "le passé…"], 38, JAUNE_TITRE), -0.65)
        self.au_mot("garde une marge")
        self.poser(self.t("… on garde une marge.", 36, VERT_OK), -1.55)
        self.attendre_voix()

    # ── 10 : défi + correction ──────────────────────────────────────────────

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        n, d = self.z_pret()
        self.au_mot("À toi de jouer")
        self.titre_col("À toi de jouer !", y=2.75, fs=48)
        self.poser(self.ligne([("z =", WHITE), ("0,115x + 2,454", BLEU_CLAIR)], 34), 2.05)
        self.au_mot("prévois la population")
        self.poser(self.bloc(["Prévois la population", "de l'Afrique", "en 2040"], 34, buff=0.08), 0.9)
        self.poser(self.ligne([("2040", AMBRE), ("→", WHITE), ("x = 8", ORANGE_V)], 42), -0.45, "pop")
        self.play(Create(n.verticale(8)), run_time=0.5)
        self.pause_defi(y=-1.35)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        n, d = self.z_pret()
        self.add(n.verticale(8))
        self.titre_col("Correction", y=2.75, fs=48)
        self.au_mot("0,115 fois 8")
        self.poser(self.t("z = 0,115 × 8 + 2,454", 38, BLEU_CLAIR), 1.85)
        self.au_mot(": 3,374")
        self.poser(self.ligne([("z =", WHITE), ("3,374", VERT_OK)], 44), 1.05, "pop")
        self.play(GrowFromCenter(Dot(n.p(8, 3.374), radius=0.11, fill_color=VERT_OK, stroke_color=WHITE)), run_time=0.4)
        self.au_mot("y égale 10 puissance 3,374")
        self.poser(VGroup(self.t("y =", 40, AMBRE), puiss("10", "3,374", 48, AMBRE)).arrange(RIGHT, buff=0.2), 0.15)
        self.au_mot("environ 2 366 millions")
        self.poser(self.ligne([("≈", WHITE), ("2 366 millions", VERT_OK)], 44), -0.7, "pop")
        self.au_mot("près de 2,4 milliards")
        self.poser(self.t("près de 2,4 milliards !", 36, VERT_OK), -1.45)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        n, d = self.z_pret()
        lignes = self.finale_colonne(figure=VGroup(n, d), textes=[("L'ajustement donne z,", "la variable transformée."),
                                                                  ("1. Je calcule z ;", "2. je défais :", "y = 10 puissance z."),
                                                                  ("Jamais 10 fois z !",)])
        self.au_mot("L'ajustement donne")
        self.montrer_ligne(lignes[0], Indicate(d, color=BLEU_CLAIR))
        self.au_mot("je calcule d'abord z")
        self.montrer_ligne(lignes[1])
        self.au_mot("Jamais 10 fois z")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_ajustement()
        self.ecran_etape1()
        self.ecran_question1()
        self.ecran_etape2()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_limites()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class StatsCvRevenirStmg(StatsCvRevenirBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"
