# stats_lire_graphique.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# épisode 01 : LIRE UN GRAPHIQUE (origine, graduations, échelle). Micro du coach
# auto_stat_lire_graphique, la MÊME dans les deux classes (1re : notion
# auto_lire_statistiques ; STMG : auto_donnees_graphiques). AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE dans les deux classes : un automatisme revu au
# lycée, un cran au-dessus du « je vois » (lire un petit trait sans nombre, un
# axe qui ne part pas de 0). Short jumeau : stats_lire_graphique_short.py (blanche).
#
# ⭐ Décor et métier : le CLIMAT ; une CLIMATOLOGUE présente les mesures de CO₂
# de l'observatoire de Mauna Loa (Hawaï), la plus longue série du monde (depuis
# 1958). Problématique : JUGER une impression (« ×3 ? »).
# Source : NOAA Global Monitoring Laboratory, moyennes annuelles de Mauna Loa,
# https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_annmean_mlo.txt (lu le 24/10/2026) :
# 1980 : 338,76 · 2000 : 369,71 · 2010 : 390,10 · 2023 : 421,08 ppm.
# ⚠️ Arrondies à 10 près pour la lecture sur l'axe (340, 370, 390, 420) : la voix
# dit « environ » à la première lecture.
# Centres d'intérêt : meteo-climat, nature-ecologie.
#
# Mapping micro → écrans (banques 1re automatismes-proportions-stats + STMG
# automatismes-graphiques) : lire une barre sur une graduation (lire_barre,
# stmg tpl_1) → 03 · lire un sommet ENTRE deux graduations (lire_milieu) → 04,
# question 1 · le pas d'une graduation, l'origine → 02, piège 06 · l'écart entre
# deux barres (stmg tpl_4) → 06, question 2, défi 1 · combien de barres
# dépassent un seuil (stmg tpl_2) → défi 2.
# Écrans : 00 garde · 01 Mauna Loa, la climatologue · 02 les trois réflexes ·
# 03 lire 1980 · 04 lire 2000 (petit trait) · 05 question 1 + réponse · 06 le
# piège (axe tronqué, redessiné depuis 0) · 07 question 2 + réponse · 08 défi ·
# 08b correction · 09 ce que tu as appris · 10 fin (règle du 19/10).
# ⛔ PAS D'ÉCART : une valeur ne s'écrit qu'au mot où la voix la dit (les
# nombres de l'axe sont des étiquettes).
#
# Voix : manim/voix/lycee-stats-lire-graphique.json (débit −7), WAV dans
# public/sons/lycee-stats-lire-graphique/ ; calage mot à mot :
# manim/scripts/stmg/stats_lire_graphique_marques.json (marques.ps1 + conv.py).
# ⭐ UNE voix, UN script, DEUX rendus : la voix ne cite aucune classe.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_lire_graphique.py StatsLireGraphiquePremiere -o eleveai-maths-premiere-commun-stats-lire-graphique --media_dir manim/scripts/stmg/media-stats-lire-graphique-premiere
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_lire_graphique.py StatsLireGraphiqueStmg -o eleveai-maths-stmg-stats-lire-graphique --media_dir manim/scripts/stmg/media-stats-lire-graphique-stmg
# Sorties : manim/sorties/premiere-commun/maths/statistiques/01-lire-graphique/
#           manim/sorties/stmg/maths/statistiques/01-lire-graphique/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F403

ANNEES = ["1980", "2000", "2010", "2023"]
CO2 = [340, 370, 390, 420]
BLEU_BARRE = "#93c5fd"
TERRE, ROCHE = "#7c4a2d", "#4b3426"


def molecule(r=0.22):
    """Une molécule de CO₂ : le carbone noir au milieu, deux oxygènes rouges."""
    c = Circle(radius=r, fill_color="#1f2937", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    o = [Circle(radius=r * 0.85, fill_color="#ef4444", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
         .move_to(P(s * r * 1.75, 0)) for s in (-1, 1)]
    return VGroup(*o, c)


def volcan(larg=5.0, haut=1.5):
    """Mauna Loa : un volcan bouclier, large et bas, l'observatoire au sommet."""
    pts = [P(-larg / 2, 0), P(-larg * 0.3, haut * 0.55), P(-larg * 0.1, haut * 0.95), P(larg * 0.1, haut),
           P(larg * 0.3, haut * 0.6), P(larg / 2, 0)]
    corps = VMobject(fill_color=TERRE, fill_opacity=1, stroke_color=ROCHE, stroke_width=3)
    corps.set_points_smoothly(pts)
    corps.add_line_to(P(-larg / 2, 0))
    sol = Line(P(-larg / 2 - 0.2, 0), P(larg / 2 + 0.2, 0), color=ROCHE, stroke_width=4)
    dome = Arc(radius=0.22, start_angle=0, angle=PI, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B,
               stroke_width=2).move_to(P(0, haut + 0.1))
    socle = Rectangle(width=0.5, height=0.14, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    socle.next_to(dome, DOWN, buff=0)
    return VGroup(corps, sol, socle, dome)


class StatsLireGraphiqueBase(PaysageLycee):
    nom_voix = "lycee-stats-lire-graphique"
    fichier_marques = "stats_lire_graphique_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"
    G = P(-3.35, -0.35)  # le centre du graphique, à gauche

    def graphe(self, centre=None, **kw):
        """Le diagramme du coach : axe tronqué à 300, pas 20, petit trait 10."""
        opts = dict(pas=20, sous_pas=10, mini=300, maxi=440, couleurs=[BLEU_BARRE] * 4, nom_axe="CO2 (ppm)",
                    titre="CO2 de l'air, Mauna Loa", largeur=4.0, hauteur=3.4, fs=28, colonne_lue=True,
                    centre=self.G if centre is None else centre)
        opts.update(kw)
        g = Barres(ANNEES, CO2, **opts)
        return caser(g) if centre is None else g

    def graphe_pret(self):
        g = self.graphe()
        self.add(g)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire un graphique", self.identite, self.ceinture)
        g = self.graphe(centre=P(-0.6, 0.0), largeur=3.4, hauteur=2.2, fs=24, titre=None, nom_axe=None,
                        colonne_lue=False, pas=40, sous_pas=None, maxi=None)
        self.au_mot("Lire un graphique")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9),
                  run_time=0.7)
        self.play(g.pousser(run_time=0.8))
        self.au_mot("ce qu'il semble dire")
        q = self.t("?", 90, ORANGE_RETENUE).next_to(g, RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Mauna Loa, la climatologue ─────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        v = volcan().move_to(P(-3.6, -0.9))
        self.au_mot("Mauna Loa")
        lieu = self.t("Mauna Loa, Hawaï", 46, JAUNE_TITRE).move_to(P(-3.6, 2.9))
        self.play(FadeIn(v, shift=UP * 0.3), Write(lieu), run_time=0.8)
        self.au_mot("le C O 2 de l'air")
        mols = VGroup(*[molecule(0.16).rotate(a) for a in (0.3, -0.5, 0.9)])
        for m, p in zip(mols, [P(-4.9, 1.3), P(-3.6, 1.8), P(-2.3, 1.2)]):
            m.move_to(p)
        nom = self.t("CO₂", 40, WHITE).move_to(P(-3.6, 0.95))
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.3) for m in mols], lag_ratio=0.3), FadeIn(nom),
                  run_time=0.9)
        self.au_mot("depuis 1958")
        date = self.t("mesuré depuis 1958", 36, BLEU_CALCUL).move_to(P(-3.6, -2.4))
        self.play(FadeIn(date, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Une climatologue")
        ecran = RoundedRectangle(width=4.8, height=3.1, corner_radius=0.18, fill_color="#1e293b", fill_opacity=1,
                                 stroke_color="#64748b", stroke_width=4).move_to(P(3.3, 1.0))
        metier = self.t("Climatologue", 44, BLEU_CALCUL).next_to(ecran, DOWN, buff=0.45)
        self.play(FadeIn(ecran, scale=0.9), FadeIn(metier, shift=UP * 0.2), run_time=0.5)
        self.au_mot("avec un diagramme en barres")
        mini = self.graphe(centre=ecran.get_center(), largeur=2.8, hauteur=1.5, fs=20, titre=None, nom_axe=None,
                           colonne_lue=False, pas=40, sous_pas=None, maxi=None)
        if mini.height > ecran.height * 0.9:
            mini.scale_to_fit_height(ecran.height * 0.9).move_to(ecran)
        self.play(FadeIn(mini.fond, scale=0.9), run_time=0.4)
        self.play(mini.pousser(run_time=0.9))
        self.au_mot("comprendre le climat")
        role = self.bloc(["comprendre le climat", "avec des données"], 34).next_to(metier, DOWN, buff=0.25)
        self.play(FadeIn(role, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 02 : les trois réflexes ─────────────────────────────────────────────

    def ecran_reperes(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-reperes")
        g = self.graphe()
        self.play(FadeIn(g.fond, scale=0.95), run_time=0.5)
        self.play(g.pousser(run_time=0.8))
        self.add(g)
        self.au_mot("Un : le titre")
        r1 = self.col(self.ligne([("1.", AMBRE), ("Titre et unité", WHITE)], 38), 2.6)
        self.play(FadeIn(r1, shift=RIGHT * 0.2), Indicate(g.titre, color=AMBRE), run_time=0.6)
        self.au_mot("en p p m")
        u = self.col(self.t("ppm : parties par million", 32, GREY_A), 2.0)
        self.play(FadeIn(u), Indicate(g.nom_axe, color=AMBRE, scale_factor=1.3), run_time=0.6)
        self.au_mot("Deux : l'origine")
        r2 = self.col(self.ligne([("2.", AMBRE), ("L'origine", WHITE)], 38), 1.05)
        self.play(FadeIn(r2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("il commence à 300")
        o = self.col(self.ligne([("l'axe part de", WHITE), ("300,", ROUGE_ERREUR), ("pas de 0 !", WHITE)], 34), 0.45)
        n300 = g.nombre(300)
        self.play(FadeIn(o), n300.animate.scale(1.8).set_color(ROUGE_ERREUR), run_time=0.4)
        self.play(n300.animate.scale(1 / 1.8), run_time=0.4)
        self.au_mot("Trois : le pas")
        r3 = self.col(self.ligne([("3.", AMBRE), ("Le pas", WHITE)], 38), -0.5)
        self.play(FadeIn(r3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("De 300 à 320")
        self.play(Indicate(g.nombre(300), color=AMBRE, scale_factor=1.5), Indicate(g.nombre(320), color=AMBRE,
                                                                                  scale_factor=1.5), run_time=0.6)
        self.au_mot("avance de 20")
        p20 = self.col(self.ligne([("un grand trait :", WHITE), ("+ 20", BLEU_CALCUL)], 34), -1.1)
        self.play(FadeIn(p20, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Et le petit trait")
        petits = VGroup(*[g.trait(v) for v in sorted(g.traits) if v not in g.nombres])
        self.play(*[m.animate.scale(2.6).set_color(AMBRE) for m in petits], run_time=0.4)
        self.au_mot("vaut 10 de plus")
        p10 = self.col(self.ligne([("un petit trait :", AMBRE), ("+ 10", VERT_OK)], 34), -1.7)
        self.play(FadeIn(p10, shift=RIGHT * 0.2), *[m.animate.scale(1 / 2.6).set_color(NUIT) for m in petits],
                  run_time=0.5)
        self.insister(p10[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 03 : lire 1980 ──────────────────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lire")
        g = self.graphe_pret()
        self.au_mot("Je lis 1980")
        tit = self.col(self.t("1980", 50, JAUNE_TITRE), 2.5)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), g.focus(0, 0.35), run_time=0.5)
        self.au_mot("Je monte")
        e1 = self.col(self.ligne([("1.", AMBRE), ("Je monte en haut", WHITE)], 38), 1.4)
        fl = g.monter(0)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), GrowArrow(fl), run_time=0.8)
        self.au_mot("puis je vais vers l'axe")
        e2 = self.col(self.ligne([("2.", AMBRE), ("Je vais vers l'axe", WHITE)], 38), 0.5)
        tr = g.vers_axe(0)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), Create(tr), run_time=0.8)
        self.au_mot("arrive sur 340")
        nb = g.nombre(340)
        self.play(nb.animate.scale(1.8).set_color(AMBRE), run_time=0.35)
        self.play(nb.animate.scale(1 / 1.8), run_time=0.35)
        self.au_mot("environ 340")
        res = self.col(self.ligne([("1980 :", WHITE), ("environ", WHITE), ("340", VERT_OK), ("ppm", WHITE)], 40),
                       -0.75, xl=self.XL + 0.25)
        cadre = self.encadrer(res)
        self.play(FadeIn(res, scale=0.7), run_time=0.4)
        self.play(Create(cadre), run_time=0.4)
        self.insister(res[2], 1.3, 0.3)
        self.attendre_voix()

    # ── 04 : lire 2000, sur le petit trait ──────────────────────────────────

    def ecran_milieu(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-milieu")
        g = self.graphe_pret()
        self.au_mot("Et en 2000")
        tit = self.col(self.t("2000", 50, JAUNE_TITRE), 2.5)
        fl = g.monter(1)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), g.focus(1, 0.35), run_time=0.5)
        self.play(GrowArrow(fl), run_time=0.6)
        self.au_mot("tombe entre 360 et 380")
        tr = g.vers_axe(1)
        self.play(Create(tr), run_time=0.6)
        entre = self.col(self.ligne([("entre", WHITE), ("360", WHITE), ("et", WHITE), ("380", WHITE)], 40), 1.4)
        self.play(FadeIn(entre, shift=RIGHT * 0.2), Indicate(g.nombre(360), color=AMBRE, scale_factor=1.5),
                  Indicate(g.nombre(380), color=AMBRE, scale_factor=1.5), run_time=0.7)
        self.au_mot("sur le petit trait")
        t370 = g.trait(370)
        self.play(t370.animate.scale(2.8).set_color(AMBRE), run_time=0.3)
        self.play(t370.animate.scale(1 / 2.8), run_time=0.3)
        self.au_mot("la moitié du pas")
        moit = self.col(self.ligne([("petit trait", AMBRE), ("= moitié de 20", WHITE)], 38), 0.45)
        self.play(FadeIn(moit, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("360 plus 10")
        calc = self.col(self.ligne([("360", WHITE), ("+", WHITE), ("10", BLEU_CALCUL)], 50), -0.65)
        self.play(FadeIn(calc, shift=UP * 0.2), run_time=0.4)
        self.au_mot("égale 370")
        eg = self.ligne([("=", WHITE), ("370", VERT_OK)], 50).next_to(calc, RIGHT, buff=0.25)
        suite = DashedLine(g.y_axe(370), P(g._x_lu(), g.y_axe(370)[1]), color=AMBRE, stroke_width=6,
                           dash_length=0.14, dashed_ratio=0.6)
        lu = g.lu(370)
        self.play(FadeIn(eg, scale=0.7), Create(suite), FadeIn(lu, scale=1.6), t370.animate.set_color(NUIT),
                  run_time=0.5)
        cadre = self.encadrer(VGroup(calc, eg))
        self.play(Create(cadre), run_time=0.4)
        self.insister(eg[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 05 : question 1 (lire 2010) ─────────────────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.graphe_pret()
        etat = {}

        def lire_2010():
            fl, tr = g.monter(2), g.vers_axe(2, jusqu_au_lu=True)
            self.play(GrowArrow(fl), run_time=0.4)
            self.play(Create(tr), FadeIn(g.lu(390), scale=1.6), run_time=0.5)

        self.question_pause("05-question", "05b-reponse", ["Que vaut la barre", "de 2010 ?"], ["380", "390", "400"],
                            1, ["390 : le petit trait, au milieu", "380 ou 400 : le petit trait oublié"],
                            avant=lambda: self.play(g.focus(2, 0.35), run_time=0.4), geste=lire_2010,
                            mot_explication="380 ou 400")
        return etat

    # ── 06 : le piège, l'axe qui ne part pas de 0 ───────────────────────────

    def hauteur(self, g, i, couleur, txt):
        """Une double flèche le long de la barre i, de l'axe du bas à son sommet."""
        x = g.barres[i].get_right()[0] + 0.18
        fl = DoubleArrow(P(x, g.base(i)[1]), P(x, g.point(i)[1]), buff=0, color=couleur, stroke_width=6,
                         tip_length=0.16, max_tip_length_to_length_ratio=0.25)
        return VGroup(fl, self.t(txt, 34, couleur).next_to(fl, RIGHT, buff=0.08))

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        g = self.graphe_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.1)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Regarde 1980 et 2023")
        self.play(g.estomper([0, 3], 0.3), run_time=0.5)
        self.au_mot("paraît trois fois plus haute")
        h0, h3 = self.hauteur(g, 0, ORANGE_RETENUE, "1"), self.hauteur(g, 3, ORANGE_RETENUE, "3")
        fois = self.col(self.ligne([("2023 :", WHITE), ("× 3 ?", ORANGE_RETENUE)], 44), 2.45)
        self.play(GrowFromCenter(h0[0]), GrowFromCenter(h3[0]), FadeIn(h0[1]), FadeIn(h3[1]), run_time=0.6)
        self.play(FadeIn(fois, scale=0.7), run_time=0.4)
        self.au_mot("l'axe commence à 300")
        n300 = g.nombre(300)
        part = self.col(self.ligne([("l'axe part de", WHITE), ("300", ROUGE_ERREUR)], 36), 1.7)
        self.play(FadeIn(part), n300.animate.scale(1.8).set_color(ROUGE_ERREUR), run_time=0.4)
        self.play(n300.animate.scale(1 / 1.8), run_time=0.4)
        self.au_mot("340, puis")
        lect = self.ligne([("1980 :", WHITE), ("340", VERT_OK)], 38)
        lect2 = self.ligne([("2023 :", WHITE), ("420", VERT_OK)], 38).next_to(lect, RIGHT, buff=0.5)
        self.col(VGroup(lect, lect2), 0.95)
        self.play(FadeIn(lect, shift=RIGHT * 0.2), Indicate(g.nombre(340), color=AMBRE, scale_factor=1.5),
                  run_time=0.5)
        self.au_mot("puis 420")
        self.play(FadeIn(lect2, shift=RIGHT * 0.2), Indicate(g.nombre(420), color=AMBRE, scale_factor=1.5),
                  run_time=0.5)
        self.au_mot("Redessinée depuis 0")
        z = Barres(["1980", "2023"], [340, 420], pas=100, mini=0, couleurs=[BLEU_BARRE] * 2, largeur=2.4,
                   hauteur=2.3, fs=26, titre="Axe depuis 0", centre=P(3.2, -0.75))
        self.play(FadeOut(VGroup(part, lect, lect2), shift=UP * 0.2), FadeIn(z.fond, scale=0.9), run_time=0.5)
        self.play(z.pousser(run_time=0.8))
        self.au_mot("que d'un quart environ")
        quart = VGroup(self.t("2023 :", 38), self.t("+ un quart environ", 38, VERT_OK)).arrange(RIGHT, buff=0.2)
        self.col(quart, 1.65)
        self.play(FadeIn(quart, shift=LEFT * 0.2), Create(croix(fois[1], sw=6)), run_time=0.5)
        self.au_mot("elle se lit sur l'axe")
        self.play(Indicate(g.axe_y, color=AMBRE), Indicate(g.nombre(340), color=AMBRE, scale_factor=1.5),
                  Indicate(g.nombre(420), color=AMBRE, scale_factor=1.5), run_time=0.8)
        self.attendre_voix()

    # ── 07 : question 2 (l'écart) ───────────────────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.graphe_pret()
        self.question_pause("07-question", "07b-reponse", ["De 1980 à 2023,", "le CO₂ a…"],
                            ["été multiplié par 3", "augmenté de 80 ppm", "augmenté de 420 ppm"], 1,
                            ["420 − 340 = 80 ppm", "A : l'axe ne part pas de 0",
                             "C : 340 oublié"], ys=(0.95, 0.05, -0.85),
                            avant=lambda: self.play(g.estomper([0, 3], 0.3), run_time=0.4))

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        g = self.graphe_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Un : de combien")
        q1 = self.col(VGroup(self.ligne([("1.", AMBRE), ("De combien entre", WHITE)], 38),
                             self.t("2000 et 2023 ?", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.15), 1.35)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), g.estomper([1, 3], 0.35), run_time=0.6)
        self.au_mot("Deux : combien d'années")
        q2 = self.col(VGroup(self.ligne([("2.", AMBRE), ("Combien d'années", WHITE)], 38),
                             self.t("dépassent 350 ppm ?", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.15), -0.15)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), g.rallumer(), run_time=0.6)
        self.au_mot("Mets pause")
        pause = self.col(VGroup(icone_pause(0.36), self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE))
                         .arrange(RIGHT, buff=0.2), -1.5)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08b-correction")
        g = self.graphe_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("en 2000, 370")
        self.play(g.estomper([1, 3], 0.35), FadeIn(g.lu(370), scale=1.6), run_time=0.5)
        self.au_mot("en 2023, 420")
        self.play(Indicate(g.nombre(420), color=AMBRE, scale_factor=1.6), run_time=0.5)
        self.au_mot("420 moins 370")
        c1 = self.col(self.ligne([("1.", AMBRE), ("420", WHITE), ("−", WHITE), ("370", WHITE)], 44), 1.75)
        self.play(FadeIn(c1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 50")
        r1 = self.ligne([("=", WHITE), ("50", VERT_OK)], 44).next_to(c1, RIGHT, buff=0.25)
        self.play(FadeIn(r1, scale=0.7), run_time=0.4)
        self.insister(r1[1], 1.4, 0.25)
        self.au_mot("je trace la ligne de 350")
        self.play(g.rallumer(), run_time=0.3)
        y = g.y_axe(350)[1]
        seuil = DashedLine(P(g.y_axe(350)[0], y), P(g.barres[3].get_right()[0] + 0.25, y), color=ROUGE_ERREUR,
                           stroke_width=6, dash_length=0.14).set_z_index(5)
        t350 = self.col(self.ligne([("2.", AMBRE), ("au-dessus de", WHITE), ("350", ROUGE_ERREUR)], 40), 0.55)
        self.play(Create(seuil), FadeIn(t350, shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("entre 340 et 360")
        t35 = g.trait(350)
        self.play(t35.animate.scale(2.6).set_color(ROUGE_ERREUR), run_time=0.3)
        self.play(t35.animate.scale(1 / 2.6), run_time=0.3)
        self.au_mot("2000, 2010")
        self.play(LaggedStart(*[Indicate(g.barres[i], color=VERT_OK, scale_factor=1.06) for i in (1, 2, 3)],
                              lag_ratio=0.45), run_time=1.3)
        self.au_mot("3 années")
        r2 = self.col(self.ligne([("3", VERT_OK), ("années", WHITE)], 50), -0.6)
        cadre = self.encadrer(r2)
        self.play(FadeIn(r2, scale=0.7), Create(cadre), run_time=0.5)
        self.insister(VGroup(r2, cadre), 1.15, 0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        g = self.graphe_pret()
        lignes = self.finale([("Titre, unité,", "origine et pas"), ("Je monte en haut,", "puis vers l'axe"),
                              ("Je compare l'écart", "des valeurs")], [1.75, 0.15, -1.45])
        self.au_mot("le titre, l'unité")
        self.montrer_ligne(lignes[0], Indicate(g.titre, color=AMBRE), Indicate(g.nom_axe, color=AMBRE))
        self.au_mot("l'origine et le pas")
        self.play(Indicate(g.nombre(300), color=ROUGE_ERREUR, scale_factor=1.6), run_time=0.6)
        self.au_mot("je monte")
        fl = g.monter(1)
        self.montrer_ligne(lignes[1], GrowArrow(fl))
        self.au_mot("puis je vais vers l'axe")
        self.play(Create(g.vers_axe(1)), run_time=0.7)
        self.au_mot("pour comparer")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_reperes()
        self.ecran_lire()
        self.ecran_milieu()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsLireGraphiquePremiere(StatsLireGraphiqueBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"


class StatsLireGraphiqueStmg(StatsLireGraphiqueBase):
    """Même vidéo pour la STMG : seules l'identité (et la ceinture) changent."""

    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
