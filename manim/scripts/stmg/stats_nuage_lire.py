# stats_nuage_lire.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# LYCÉE : LIRE UN NUAGE DE POINTS (micros du coach : 1re info_nuage_lire,
# STMG statT_nuage_lire ; « Lire les coordonnées d'un point d'un nuage »), AVEC VOIX.
# ÉPISODE COMMUN : 1re 11-nuage-lire ⇄ STMG 18-nuage-lire (une voix, un script,
# deux rendus ; la voix ne cite aucune classe).
# Paysage 16:9. CEINTURES : 1re ORANGE, STMG ORANGE (lecture de coordonnées :
# le geste de base des deux banques, étoile 1, un cran sous la verte du niveau ;
# il est relevé par la lecture « à l'envers », l'abscisse partagée par deux
# points et les axes qui ne partent pas de 0). Short jumeau :
# stats_nuage_lire_short.py (JAUNE, un cran plus bas).
#
# ⭐ Décor et métier : le FOOTBALL (centre d'intérêt : sport) ; une ANALYSTE DE
# LA PERFORMANCE d'un club lit les saisons de Kylian Mbappé (problématique :
# juger un joueur, lire une donnée).
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : Mbappé au Paris Saint-Germain,
# championnat (Ligue 1), matchs joués / buts :
#   2017-18 : 27 / 13 (prêt, 1re saison) · 2018-19 : 29 / 33 · 2019-20 : 20 / 18
#   (saison arrêtée en mars 2020, Covid) · 2020-21 : 31 / 27 · 2021-22 : 35 / 28 ·
#   2022-23 : 34 / 29 · 2023-24 : 29 / 27. Short : Real Madrid 2024-25 (Liga) :
#   34 / 31. Source : https://en.wikipedia.org/wiki/Kylian_Mbapp%C3%A9, tableau
#   « Career statistics » (à jour du 21/10/2026), consulté le 24/10/2026.
#   Défi : plus de 25 buts → 33, 27, 28, 29, 27 : 5 saisons ; le moins : 13 buts
#   en 27 matchs.
# ⭐ Figure du coach : `fonctionGraphique` (nuage, grille, points rouges,
# verticale orange, horizontale violette), redessinée par Nuage
# (stats_lycee_h2_commun.py). ⛔ PAS D'ÉCART : chaque nombre lu s'écrit au mot.
#
# Mapping micro → écrans : info_nuage_lire_y / statT tpl_1 (abscisse donnée)
# → 03-04 · info_nuage_lire_x / statT tpl_2 (ordonnée donnée) → 06 ·
# info_nuage_lire_compter → 09 défi (1) · info_nuage_lire_extreme → 09 défi (2) ·
# erreur typique « inverser abscisse et ordonnée » → 07 piège, question 08.
# Écrans : 00 garde · 01 l'analyste · 02 le repère · 03 lire un point · 04 partir
# de l'abscisse · 05 QUESTION · 06 partir de l'ordonnée (deux points à 29) ·
# 07 le piège · 08 QUESTION · 09 défi · 09b correction · 10 ce que tu as appris
# · 11 fin (règle du 19/10).
#
# Voix : manim/voix/lycee-stats-nuage-lire.json (débit −7), WAV dans
# public/sons/lycee-stats-nuage-lire/ ; marques :
# manim/scripts/stmg/stats_nuage_lire_marques.json (marques.ps1 + conv.py, −7).
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_nuage_lire.py StatsNuageLirePremiere -o eleveai-maths-premiere-commun-stats-nuage-lire --media_dir manim/scripts/stmg/media-stats-nuage-lire-1re
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_nuage_lire.py StatsNuageLireStmg -o eleveai-maths-stmg-stats-nuage-lire --media_dir manim/scripts/stmg/media-stats-nuage-lire-stmg
# Sorties : manim/sorties/premiere-commun/maths/statistiques/11-nuage-lire/eleveai-maths-premiere-commun-stats-nuage-lire.mp4
#           manim/sorties/stmg/maths/statistiques/18-nuage-lire/eleveai-maths-stmg-stats-nuage-lire.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F403

SAISONS = ["2017-2018", "2018-2019", "2019-2020", "2020-2021", "2021-2022", "2022-2023", "2023-2024"]
MATCHS = [27, 29, 20, 31, 35, 34, 29]
BUTS = [13, 33, 18, 27, 28, 29, 27]
G = P(-3.45, -0.3)  # le centre du nuage


def ballon(r=0.6):
    d = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=NUIT, stroke_width=3)
    pent = RegularPolygon(5, fill_color=NUIT, fill_opacity=1, stroke_width=0).scale(0.36 * r).rotate(PI / 10)
    lignes = VGroup()
    for k in range(5):
        a = PI / 2 + k * TAU / 5
        dv = np.array([np.cos(a), np.sin(a), 0.0])
        lignes.add(Line(dv * 0.36 * r, dv * r, color=NUIT, stroke_width=3),
                   Dot(dv * 0.82 * r, radius=0.12 * r, color=NUIT))
    return VGroup(d, lignes, pent)


def ecran_portable(l=2.6, h=1.6):
    """Un ordinateur portable ; son écran reçoit un mini nuage."""
    ecran = RoundedRectangle(width=l, height=h, corner_radius=0.1, fill_color="#0b1220", fill_opacity=1,
                             stroke_color="#64748b", stroke_width=4)
    socle = Polygon(P(-l / 2 - 0.25, -h / 2 - 0.05), P(l / 2 + 0.25, -h / 2 - 0.05), P(l / 2 + 0.05, -h / 2 + 0.08),
                    P(-l / 2 - 0.05, -h / 2 + 0.08), fill_color="#475569", fill_opacity=1, stroke_width=0)
    return VGroup(ecran, socle)


class StatsNuageLireBase(PaysageH2):
    nom_voix = "lycee-stats-nuage-lire"
    fichier_marques = "stats_nuage_lire_marques.json"

    def nuage(self, centre=G, fs=26, titre=True):
        return self.cadrer(self.nuage_brut(centre, fs, titre))

    def nuage_brut(self, centre=G, fs=26, titre=True):
        return Nuage(MATCHS, BUTS, 15, 40, 10, 35, pas_x=5, pas_y=5, largeur=5.5, hauteur=4.3,
                     nom_x="Matchs joués", nom_y="Buts", titre="Mbappé au PSG, championnat" if titre else None,
                     fs=fs, centre=centre)

    def nuage_pret(self):
        n = self.nuage()
        self.add(n)
        return n

    def coord(self, x, y, fs=52, cx=WHITE, cy=WHITE):
        """« (x ; y) » en morceaux : [0] « ( », [1] x, [2] « ; », [3] y, [4] « ) »."""
        return self.ligne([("(", WHITE), (str(x), cx), (";", WHITE), (str(y), cy), (")", WHITE)], fs, 0.12)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire un nuage de points", self.identite, self.ceinture)
        n = Nuage(MATCHS, BUTS, 15, 40, 10, 35, largeur=3.4, hauteur=2.2, fs=18, centre=P(-0.6, 0.1))
        self.au_mot("Lire un nuage")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(n.fond, scale=0.9),
                  run_time=0.7)
        self.play(LaggedStart(*[FadeIn(r, scale=0.3) for r in n.ronds], lag_ratio=0.15), run_time=0.8)
        self.au_mot("deux nombres")
        q = self.coord("?", "?", 54, ORANGE_V, VIOLET_CLAIR).next_to(n, RIGHT, buff=0.5)
        self.play(n.allumer(4), FadeIn(q, scale=0.5), run_time=0.5)
        self.au_mot("dans quel ordre")
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'analyste de la performance ───────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        b = ballon(0.75).move_to(P(-4.6, 1.6))
        pc = ecran_portable().move_to(P(-2.4, 1.4))
        self.au_mot("Dans un club de football")
        self.play(FadeIn(b, shift=DOWN * 0.5), run_time=0.5)
        self.play(b.animate.move_to(P(-4.6, 1.2)), rate_func=there_and_back, run_time=0.4)
        self.au_mot("une analyste")
        metier = self.bloc(["Analyste", "de la performance"], 40, BLEU_CALCUL).move_to(P(-3.5, -0.4))
        self.play(FadeIn(pc, shift=LEFT * 0.3), FadeIn(metier, shift=UP * 0.2), run_time=0.6)
        self.au_mot("en données")
        mini = Nuage(MATCHS, BUTS, 15, 40, 10, 35, largeur=1.6, hauteur=0.85, fs=12).move_to(pc[0])
        mini.scale_to_fit_height(pc[0].height * 0.85).move_to(pc[0])
        self.play(FadeIn(mini.fond), LaggedStart(*[FadeIn(r, scale=0.3) for r in mini.ronds], lag_ratio=0.2),
                  run_time=0.9)
        self.au_mot("Kylian Mbappé")
        km = self.col(self.t("Kylian Mbappé", 54, JAUNE_TITRE), 2.0)
        self.play(Write(km), run_time=0.7)
        self.au_mot("7 saisons")
        l1 = self.col(self.ligne([("7", AMBRE), ("saisons de championnat", WHITE)], 38), 0.85)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("au Paris Saint-Germain")
        l2 = self.col(self.t("au Paris Saint-Germain", 38), 0.05)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("de 2017")
        l3 = self.col(self.ligne([("de", WHITE), ("2017", AMBRE), ("à", WHITE), ("2024", AMBRE)], 40), -0.85)
        self.play(FadeIn(l3[:2], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("à 2024")
        self.play(FadeIn(l3[2:], shift=RIGHT * 0.2), run_time=0.35)
        self.attendre_voix()

    # ── 02 : le repère ──────────────────────────────────────────────────────

    def ecran_repere(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-repere")
        n = self.nuage()
        self.play(FadeIn(n.fond, scale=0.95), run_time=0.5)
        self.au_mot("devient un point")
        l0 = self.col(self.ligne([("1 saison", WHITE), ("=", WHITE), ("1 point", ROUGE_PT)], 40), 2.6)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(r, scale=0.2) for r in n.ronds],
                                                             lag_ratio=0.15), run_time=1.0)
        self.au_mot("En abscisse")
        l1 = self.col(self.bloc(["Abscisse, à l'horizontale :", "les matchs joués"], 36, ORANGE_V), 1.45)
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), Indicate(n.axe_x, color=ORANGE_V), run_time=0.6)
        self.au_mot("les matchs joués")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), Indicate(n.nom_x, color=ORANGE_V, scale_factor=1.3),
                  run_time=0.6)
        self.au_mot("En ordonnée")
        l2 = self.col(self.bloc(["Ordonnée, à la verticale :", "les buts marqués"], 36, VIOLET_CLAIR), 0.1)
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), Indicate(n.axe_y, color=VIOLET_H), run_time=0.6)
        self.au_mot("les buts marqués")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), Indicate(n.nom_y, color=VIOLET_H, scale_factor=1.3),
                  run_time=0.6)
        self.au_mot("commencent à 15")
        l3 = self.col(self.ligne([("Départ :", WHITE), ("15", ORANGE_V), ("et", WHITE), ("10", VIOLET_CLAIR)], 38),
                      -1.15)
        self.play(FadeIn(l3[:2], shift=RIGHT * 0.2), n.nx[15].animate.scale(1.8).set_color(ORANGE_V), run_time=0.4)
        self.play(n.nx[15].animate.scale(1 / 1.8), run_time=0.3)
        self.au_mot("et à 10")
        self.play(FadeIn(l3[2:], shift=RIGHT * 0.2), n.ny[10].animate.scale(1.8).set_color(VIOLET_H), run_time=0.4)
        self.play(n.ny[10].animate.scale(1 / 1.8), run_time=0.3)
        self.au_mot("un carreau vaut 1")
        a, b = n.p(15, 10), n.p(16, 11)
        car = Rectangle(width=b[0] - a[0], height=b[1] - a[1], stroke_color=AMBRE, stroke_width=4,
                        fill_color=AMBRE, fill_opacity=0.5).move_to((a + b) / 2)
        l4 = self.col(self.ligne([("1 carreau", AMBRE), ("=", WHITE), ("1", AMBRE)], 40), -2.1)
        self.play(FadeIn(car), FadeIn(l4, shift=RIGHT * 0.2), run_time=0.4)
        self.play(car.animate.scale(2.2), run_time=0.3)
        self.play(car.animate.scale(1 / 2.2), run_time=0.3)
        self.attendre_voix()

    # ── 03 : lire un point ──────────────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lire")
        n = self.nuage_pret()
        self.au_mot("la saison 2021-2022")
        et = n.etiquette(4, "2021-2022", UL)
        tit = self.col(self.t("Saison 2021-2022", 44, JAUNE_TITRE), 2.6)
        self.play(n.allumer(4), FadeIn(et), Write(tit), run_time=0.6)
        self.au_mot("Je descends")
        vx = n.vers_x(4)
        self.play(Create(vx), run_time=0.7)
        self.au_mot("35 matchs")
        l1 = self.col(self.ligne([("35", ORANGE_V), ("matchs", WHITE)], 44), 1.5)
        lx = n.lu_x(35)
        self.play(FadeIn(lx, scale=1.6), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Puis je vais vers l'axe vertical")
        vy = n.vers_y(4)
        self.play(Create(vy), run_time=0.8)
        self.au_mot("28 buts")
        l2 = self.col(self.ligne([("28", VIOLET_CLAIR), ("buts", WHITE)], 44), 0.55)
        ly = n.lu_y(28)
        self.play(FadeIn(ly, scale=1.6), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Ses coordonnées")
        c = self.col(self.coord(35, 28, 60, ORANGE_V, VIOLET_CLAIR), -0.6)
        self.play(FadeIn(c, scale=0.7), run_time=0.5)
        self.au_mot("L'abscisse d'abord")
        ab = self.t("abscisse", 28, ORANGE_V).next_to(c[1], DOWN, buff=0.25)
        self.play(FadeIn(ab, shift=UP * 0.15), c[1].animate.scale(1.35), run_time=0.35)
        self.play(c[1].animate.scale(1 / 1.35), run_time=0.3)
        self.au_mot("l'ordonnée ensuite")
        od = self.t("ordonnée", 28, VIOLET_CLAIR).next_to(c[3], DOWN, buff=0.25)
        if od.get_left()[0] < ab.get_right()[0] + 0.15:
            od.next_to(c[3], DOWN, buff=0.75)
        self.play(FadeIn(od, shift=UP * 0.15), c[3].animate.scale(1.35), run_time=0.35)
        self.play(c[3].animate.scale(1 / 1.35), run_time=0.3)
        cadre = self.encadrer(c)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 04 : partir de l'abscisse ───────────────────────────────────────────

    def ecran_abscisse(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-abscisse")
        n = self.nuage_pret()
        self.au_mot("Pour 20 matchs")
        tit = self.col(self.ligne([("Pour", WHITE), ("20", ORANGE_V), ("matchs", WHITE)], 46), 2.6)
        lx = n.lu_x(20)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), FadeIn(lx, scale=1.6), run_time=0.45)
        self.au_mot("je monte")
        monte = Arrow(n.p(20, 10), n.p(20, 18), buff=0.08, color=ORANGE_V, stroke_width=7,
                      max_tip_length_to_length_ratio=0.15)
        self.play(GrowArrow(monte), run_time=0.8)
        self.play(n.allumer(2), run_time=0.3)
        self.au_mot("puis je lis à gauche")
        vy = n.vers_y(2)
        self.play(Create(vy), run_time=0.7)
        self.au_mot("18 buts")
        ly = n.lu_y(18)
        l1 = self.col(self.ligne([("→", WHITE), ("18", VIOLET_CLAIR), ("buts", WHITE)], 46), 1.6)
        self.play(FadeIn(ly, scale=1.6), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(l1[1], 1.4, 0.25)
        self.au_mot("C'est la saison 2019-2020")
        et = n.etiquette(2, "2019-2020", UR)
        l2 = self.col(self.t("Saison 2019-2020", 38, JAUNE_TITRE), 0.4)
        self.play(FadeIn(et), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("arrêtée en mars")
        l3 = self.col(self.bloc(["arrêtée en mars,", "à cause du Covid"], 36, ORANGE_RETENUE), -0.75)
        self.play(FadeIn(l3, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────

    def ecran_question1(self):
        n = self.nuage()

        def reponse(s):
            s.play(n.allumer(0), Create(n.vers_x(0)), run_time=0.5)
            s.play(Create(n.vers_y(0)), FadeIn(n.lu_y(13), scale=1.5), run_time=0.6)

        self.ecran_question("05-question", "05b-reponse",
                            ["Quelle est l'ordonnée du point", "d'abscisse 27 ?"],
                            ["13", "27", "33"], 0,
                            ["27 : c'est l'abscisse elle-même.", "33 : l'ordonnée d'un autre point."],
                            figure=n, autres_r=reponse, mot_q="Quelle est")

    # ── 06 : partir de l'ordonnée ; deux points à 29 matchs ─────────────────

    def ecran_envers(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-envers")
        n = self.nuage_pret()
        self.au_mot("Pour 33 buts")
        tit = self.col(self.ligne([("Pour", WHITE), ("33", VIOLET_CLAIR), ("buts", WHITE)], 46), 2.6)
        ly = n.lu_y(33)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), FadeIn(ly, scale=1.6), run_time=0.45)
        self.au_mot("je vais jusqu'au point")
        va = Arrow(n.p(15, 33), n.p(29, 33), buff=0.08, color=VIOLET_H, stroke_width=7,
                   max_tip_length_to_length_ratio=0.08)
        self.play(GrowArrow(va), run_time=0.8)
        self.play(n.allumer(1), run_time=0.3)
        self.au_mot("puis je descends")
        vx = n.vers_x(1)
        self.play(Create(vx), run_time=0.8)
        self.au_mot("29 matchs")
        lx = n.lu_x(29)
        l1 = self.col(self.ligne([("→", WHITE), ("29", ORANGE_V), ("matchs", WHITE)], 46), 1.6)
        self.play(FadeIn(lx, scale=1.6), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("C'est son record")
        et = n.etiquette(1, "2018-2019", UL)
        l2 = self.col(self.ligne([("Record :", JAUNE_TITRE), ("2018-2019", JAUNE_TITRE)], 38), 0.7)
        self.play(FadeIn(et), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("à 29 matchs, il y a deux points")
        self.play(FadeOut(VGroup(va, ly)), run_time=0.3)
        self.play(n.allumer(6), run_time=0.35)
        l3 = self.col(self.ligne([("29", ORANGE_V), ("matchs :", WHITE), ("2 points !", ROUGE_ERREUR)], 40), -0.25)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), Indicate(VGroup(n.ronds[1], n.ronds[6]), color=AMBRE),
                  run_time=0.6)
        self.au_mot("l'une à 33 buts")
        y33 = n.lu_y(33)
        self.play(FadeIn(y33, scale=1.5), Create(n.vers_y(1)), run_time=0.45)
        self.au_mot("l'autre à 27")
        y27 = n.lu_y(27)
        self.play(FadeIn(y27, scale=1.5), Create(n.vers_y(6)), run_time=0.45)
        self.au_mot("Une abscisse peut cacher")
        l4 = self.col(self.bloc(["Une abscisse peut cacher", "plusieurs points."], 38, VERT_OK), -1.45)
        self.play(FadeIn(l4, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 07 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        n = self.nuage_pret()
        self.add(n.etiquette(4, "2021-2022", UL))
        self.au_mot("Le piège")
        tit = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.6)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("inverser les deux nombres")
        l0 = self.col(self.t("inverser les deux nombres", 38, ORANGE_RETENUE), 1.85)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("35 point-virgule 28, ce")
        bon = self.col(self.coord(35, 28, 50, ORANGE_V, VIOLET_CLAIR), 0.9)
        self.play(FadeIn(bon, scale=0.7), n.allumer(4), run_time=0.45)
        self.au_mot("ce n'est pas 28")
        faux = self.coord(28, 35, 50).next_to(bon, RIGHT, buff=0.7)
        neq = self.t("≠", 50, ROUGE_ERREUR).move_to((bon.get_right() + faux.get_left()) / 2)
        self.play(FadeIn(neq), FadeIn(faux, scale=0.7), run_time=0.45)
        self.au_mot("Ce point-là")
        fantome = VGroup(Circle(radius=0.16, stroke_color=ROUGE_ERREUR, stroke_width=5),
                         ).move_to(n.p(28, 35))
        gx = DashedLine(n.p(28, 10), n.p(28, 35), color=GREY_B, stroke_width=3, dash_length=0.08)
        self.play(Create(gx), Create(fantome), run_time=0.6)
        self.au_mot("35 buts en 28 matchs")
        l1 = self.col(self.ligne([("35", WHITE), ("buts en", WHITE), ("28", WHITE), ("matchs ?", WHITE)], 38), -0.15)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("il n'existe pas")
        x = croix(fantome.copy().scale(1.2), sw=6)
        x2 = croix(faux, sw=6)
        self.play(Create(x), Create(x2), run_time=0.45)
        self.au_mot("L'abscisse s'écrit toujours en premier")
        regle = self.col(self.bloc(["L'abscisse s'écrit", "toujours en premier."], 40, VERT_OK), -1.4)
        self.play(FadeIn(regle, shift=UP * 0.2), run_time=0.5)
        self.insister(regle, 1.06, 0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────

    def ecran_question2(self):
        n = self.nuage()
        et = n.etiquette(5, "2022-2023", UL)
        fig = VGroup(n, et)

        def montrer(s):
            s.play(n.allumer(5), Indicate(et, color=AMBRE), run_time=0.5)

        def reponse(s):
            s.play(Create(n.vers_x(5)), FadeIn(n.lu_x(34), scale=1.5), run_time=0.5)
            s.play(Create(n.vers_y(5)), FadeIn(n.lu_y(29), scale=1.5), run_time=0.5)

        self.ecran_question("08-question", "08b-reponse",
                            ["Les coordonnées du point", "de la saison 2022-2023 ?"],
                            [self.coord(29, 34, 34), self.coord(34, 29, 34), self.coord(34, 27, 34)], 1,
                            ["A inverse les deux nombres,", "C prend l'ordonnée d'un voisin."],
                            figure=fig, autres_q=montrer, autres_r=reponse, mot_q="Quelles sont")

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        self.nuage_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Un : combien")
        q1 = self.col(VGroup(self.ligne([("1.", AMBRE), ("Combien de saisons", WHITE)], 38),
                             self.ligne([("à plus de", WHITE), ("25", VIOLET_CLAIR), ("buts ?", WHITE)], 38)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.12), 1.4)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Deux : la saison")
        q2 = self.col(VGroup(self.ligne([("2.", AMBRE), ("Le moins de buts :", WHITE)], 38),
                             self.t("combien de matchs ?", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.12), -0.05)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE), -1.35)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        n = self.nuage_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("la ligne des 25 buts")
        h = n.horizontale(25)
        self.play(Create(h), FadeIn(n.lu_y(25), scale=1.5), run_time=0.7)
        self.au_mot("5 points sont au-dessus")
        dessus = [i for i, y in enumerate(BUTS) if y > 25]
        self.play(*[n.allumer(i) for i in dessus], run_time=0.5)
        l1 = self.col(self.ligne([("1.", AMBRE), ("5", VERT_OK), ("points au-dessus :", WHITE)], 38), 1.55)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("5 saisons")
        l1b = self.col(self.ligne([("5", VERT_OK), ("saisons", WHITE)], 44), 0.85)
        self.play(FadeIn(l1b, scale=0.7), run_time=0.4)
        self.au_mot("le point le plus bas")
        self.play(*[n.eteindre(i) for i in dessus], FadeOut(h), run_time=0.4)
        self.play(n.allumer(0), Create(n.vers_y(0)), run_time=0.5)
        self.au_mot("13 buts")
        self.play(FadeIn(n.lu_y(13), scale=1.5), run_time=0.35)
        l2 = self.col(self.ligne([("2.", AMBRE), ("Le plus bas :", WHITE), ("13", VIOLET_CLAIR), ("buts", WHITE)], 38),
                      -0.1)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Je descends")
        self.play(Create(n.vers_x(0)), run_time=0.6)
        self.au_mot("27 matchs")
        l3 = self.col(self.ligne([("→", WHITE), ("27", ORANGE_V), ("matchs", WHITE)], 44), -0.85)
        self.play(FadeIn(n.lu_x(27), scale=1.5), FadeIn(l3, scale=0.7), run_time=0.4)
        self.add(self.encadrer(l3))
        self.au_mot("C'était sa première saison")
        l4 = self.col(self.bloc(["Sa 1re saison au club"], 36, JAUNE_TITRE), -1.75)
        self.play(FadeIn(l4, shift=UP * 0.2), FadeIn(n.etiquette(0, "2017-2018", UR)), run_time=0.5)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        n = self.nuage_pret()
        lignes = self.finale_colonne(figure=n, textes=[("Un point = deux nombres :", "l'abscisse, puis l'ordonnée."),
                                      ("Je peux partir d'un axe", "ou de l'autre."),
                                      ("Je regarde où commencent les axes,", "et ce que vaut un carreau.")])
        self.au_mot("Un point, ce sont deux nombres")
        self.montrer_ligne(lignes[0], n.allumer(4))
        self.play(Create(n.vers_x(4)), Create(n.vers_y(4)), run_time=0.6)
        self.au_mot("Je peux partir")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et je regarde toujours")
        self.montrer_ligne(lignes[2], Indicate(n.nx[15], color=ORANGE_V, scale_factor=1.6),
                           Indicate(n.ny[10], color=VIOLET_H, scale_factor=1.6))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_repere()
        self.ecran_lire()
        self.ecran_abscisse()
        self.ecran_question1()
        self.ecran_envers()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsNuageLirePremiere(StatsNuageLireBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"


class StatsNuageLireStmg(StatsNuageLireBase):
    """Même vidéo pour la STMG : identité et ceinture seulement."""

    identite = "Maths STMG — EleveAI"
    ceinture = "orange"
