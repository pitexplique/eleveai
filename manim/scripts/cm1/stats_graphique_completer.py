# stats_graphique_completer.py
# EleveAI — Maths CM1 ET CM2 — série « Statistiques », épisode 06 : COMPLÉTER
# UN DIAGRAMME EN BARRES à partir d'un tableau (micro du coach :
# `graphique_completer`, CM1 et CM2 ; canvas `stat_graph` barres avec axe
# gradué + `tableau_donnees`), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE : comme l'épisode 05, il faut placer un nombre
# ENTRE deux graduations sans trait (820 000 entre 800 000 et 900 000), un cran
# au-dessus du « je vois ». Short jumeau : stats_graphique_completer_short.py
# (blanche).
#
# ⭐ Décor et métier : l'HISTOIRE ; un HISTORIEN compte les habitants de La
# Réunion à chaque recensement. Données INSEE, arrondies comme dans la voix :
# 1954 ≈ 270 000 (274 370), 1974 ≈ 480 000 (476 675), 1990 ≈ 600 000
# (597 828), 1999 ≈ 710 000 (706 300), 2010 ≈ 820 000 (821 136).
# ⭐ Les figures sont CELLES DU COACH (manim/canvas_stats.py) : le tableau
# `tableau_donnees` (en-tête sombre, libellés bleu clair, case allumée) posé
# À DROITE, en colonne, et le diagramme en barres À GAUCHE (axe gradué de
# 100 000 en 100 000). La barre manquante est un cadre pointillé « ? ».
# ⛔ PAS D'ÉCART : un nombre ne s'écrit qu'au mot où la voix le dit ; les
# nombres de l'axe apparaissent au mot « de 100 000 en 100 000 ».
#
# Micro → écrans : graphique_completer = 02 (lire le tableau), 03 (les
# graduations, la barre qui manque), 04 (dessiner la barre), 05 (vérifier),
# 06 (piège : graduations de 1 en 1, barre plus large), 07 défi, 07b correction.
# Écrans : 00 garde · 01 l'historien · 02 le tableau · 03 les graduations ·
# 04 dessiner 2010 · 05 je vérifie · 06 le piège · 07 défi (1999) ·
# 07b correction · 08 ce que tu as appris · 09 fin (règle du 19/10).
#
# Voix : manim/voix/cm-stats-graphique-completer.json (débit −10), WAV dans
# public/sons/cm-stats-graphique-completer/ ; calage mot à mot :
# manim/scripts/cm1/stats_graphique_completer_marques.json (marques.ps1).
# ⭐ UNE voix, UN script, DEUX rendus : StatsGraphiqueCompleterCM2 ne change que
# l'identité (« Maths CM2 — EleveAI »). La voix ne cite aucune classe.
# ⭐ Ce fichier porte aussi les OUTILS COMMUNS du lot B (MotsCalesDossier,
# OutilsStats, personnage, page_abonnement) : les épisodes 07, 08 et les 6e
# 06, 07 les importent d'ici.
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_graphique_completer.py StatsGraphiqueCompleterCM1 -o eleveai-maths-cm1-stats-graphique-completer --media_dir manim/scripts/cm1/media-graphique-completer
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_graphique_completer.py StatsGraphiqueCompleterCM2 -o eleveai-maths-cm2-stats-graphique-completer --media_dir manim/scripts/cm1/media-graphique-completer-cm2
# Sorties : manim/sorties/cm1/maths/statistiques/06-graphique-completer/ et
#           manim/sorties/cm2/maths/statistiques/06-graphique-completer/

import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, NUIT, Barres, Tableau, texte  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402


def P(x, y):
    return np.array([x, y, 0.0])


def croix(mob, color=ROUGE_ERREUR, sw=7):
    return VGroup(Line(mob.get_corner(UL), mob.get_corner(DR)),
                  Line(mob.get_corner(UR), mob.get_corner(DL))).set_stroke(color, sw)


def personnage(couleur=BLEU_CALCUL, h=0.6):
    """Un habitant stylisé : tête ronde, buste arrondi."""
    tete = Circle(radius=0.17 * h / 0.6, fill_color=couleur, fill_opacity=1, stroke_width=0)
    buste = RoundedRectangle(width=0.46 * h / 0.6, height=0.34 * h / 0.6, corner_radius=0.15 * h / 0.6,
                             fill_color=couleur, fill_opacity=1, stroke_width=0)
    buste.next_to(tete, DOWN, buff=0.04 * h / 0.6)
    return VGroup(tete, buste)


class MotsCalesDossier:
    """au_mot() calé sur les MOTS (marques WinRT), comme stats_graphique_lire.py,
    mais le fichier de marques se cherche dans `dossier_marques` (le dossier du
    script qui hérite : cm1/ ou 6e/)."""

    fichier_marques = None
    dossier_marques = Path(__file__).resolve().parent
    interpoler = False  # True : interpoler entre deux marques (voir au_mot)

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            ch = Path(self.dossier_marques) / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8-sig")) if ch.exists() else {}
        return self._cache_marques

    def dire(self, nom, dossier=None):
        self._cle_voix = nom
        return super().dire(nom, dossier)

    def au_mot(self, extrait):
        marques = self._marques().get(getattr(self, "_cle_voix", None))
        if not marques or not self._duree_voix:
            return super().au_mot(extrait)
        i = self._texte_voix.find(extrait)
        if i < 0:
            raise ValueError(f"« {extrait} » absent de la voix : {self._texte_voix[:60]}…")
        avant = [m for m in marques if m[0] <= i] or [[0, 0.0]]
        t = max(m[1] for m in avant)
        if self.interpoler:
            # entre deux marques, au prorata des caractères (marque WinRT manquante
            # sur une suite de nombres, ex. « 600. 200 fois 3, égale 600 »)
            apres = [m for m in marques if m[0] > i]
            if apres:
                p0, p1 = max(m[0] for m in avant), min(m[0] for m in apres)
                t1 = min(m[1] for m in apres)
                t = t + (t1 - t) * (i - p0) / max(1, p1 - p0)
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} « {extrait} » : {-reste:.2f} s", flush=True)
        if reste > 0.05:
            self.wait(reste)


class OutilsStats(MotsCalesDossier):
    """Les petits outils du pilote (colonne de droite, lignes colorées,
    agrandir puis rétrécir, page de fin du 19/10), partagés par le lot B."""

    XL = 0.95  # le bord gauche de la colonne de droite

    def t(self, s, fs=40, color=WHITE):
        return Text(s, font_size=fs, color=color)

    def col(self, mob, y, xl=None):
        """Pose mob dans la colonne de droite, calé à gauche, sans déborder."""
        xl = self.XL if xl is None else xl
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > 6.7:
            mob.scale_to_fit_width(6.7 - xl).align_to(P(xl, 0), LEFT)
        return mob

    def ligne(self, morceaux, fs=40, buff=0.2):
        """Une ligne de morceaux colorés ; ligne[i] = i-ème morceau."""
        return VGroup(*[self.t(m, fs, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, k=1.5, run_time=0.35, about=None):
        kw = {"about_point": about} if about is not None else {}
        self.play(mob.animate.scale(k, **kw), run_time=run_time)
        self.play(mob.animate.scale(1 / k, **kw), run_time=run_time)

    def page_abonnement(self, voix):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974 (modèle : stmg/proba_au_moins_un.py)."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def finale(self, titres, y0=1.75, dy=1.6, fs=36):
        """« Ce que tu as appris » : des lignes à coche, chacune sur 2 ou 3 lignes
        de texte COURTES (≤ 21 signes : sinon col() rétrécit tout et le texte
        devient illisible). Renvoie les lignes (coche, bloc), à animer au mot."""
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.3)), run_time=0.7)
        lignes = VGroup()
        for k, morceaux in enumerate(titres):
            bloc = VGroup(*[self.t(m, fs) for m in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            lg = VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.3)
            lignes.add(self.col(lg, y0 - k * dy))
        return lignes


# ── les données de l'épisode (INSEE, arrondies comme la voix) ───────────────
ANNEES = ["1954", "1974", "1990", "2010"]
POP = [270000, 480000, 600000, 820000]
COUL = ["#93c5fd", "#93c5fd", "#93c5fd", "#fcd34d"]  # 2010, la barre qu'on dessine, en jaune


def livre(larg=1.6):
    """Le registre du recensement, ouvert : deux pages et des lignes d'écriture."""
    g = Polygon(P(-larg / 2, -0.55), P(0, -0.45), P(0, 0.55), P(-larg / 2, 0.45), fill_color="#f8fafc",
                fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
    d = g.copy().flip(UP, about_point=ORIGIN)
    lignes = VGroup()
    for k in range(4):
        y = 0.25 - k * 0.2
        lignes.add(Line(P(-larg / 2 + 0.15, y - 0.04), P(-0.12, y), color="#64748b", stroke_width=2))
        lignes.add(Line(P(0.12, y), P(larg / 2 - 0.15, y - 0.04), color="#64748b", stroke_width=2))
    couv = Polygon(P(-larg / 2 - 0.08, -0.62), P(0, -0.52), P(larg / 2 + 0.08, -0.62), P(larg / 2 + 0.08, -0.5),
                   P(0, -0.4), P(-larg / 2 - 0.08, -0.5), fill_color="#7c2d12", fill_opacity=1, stroke_width=0)
    return VGroup(couv, g, d, lignes)


def ile(echelle=1.0):
    """La Réunion, silhouette simplifiée (un ovale penché, nord-ouest en haut)."""
    pts = [(-1.0, 0.35), (-0.55, 0.8), (0.1, 0.9), (0.75, 0.6), (1.1, 0.05), (0.95, -0.5), (0.4, -0.85),
           (-0.3, -0.8), (-0.85, -0.45), (-1.1, -0.05)]
    f = Polygon(*[P(x * echelle, y * echelle) for x, y in pts], fill_color="#166534", fill_opacity=1,
                stroke_color="#86efac", stroke_width=3)
    return f.round_corners(radius=0.25 * echelle)


class StatsGraphiqueCompleterBase(OutilsStats, Notion6e):
    nom_voix = "cm-stats-graphique-completer"
    fichier_marques = "stats_graphique_completer_marques.json"
    identite = "Maths CM1 — EleveAI"
    G = P(-3.45, -0.35)  # le centre du diagramme, à gauche
    TB = P(3.6, 1.85)    # le centre du tableau, en haut à droite

    # ── les deux figures du coach ───────────────────────────────────────────

    def graphe(self, annees=ANNEES, pop=POP, couleurs=COUL):
        """Le diagramme des habitants (non ajouté)."""
        return Barres(annees, pop, pas=100000, maxi=900000, couleurs=couleurs, nom_axe="Habitants",
                      titre="La Réunion", largeur=4.4, hauteur=4.0, fs=28, centre=self.G)

    def tableau(self, rempli=True, annees=ANNEES, pop=POP):
        lignes = [[v if rempli else None] for v in pop]
        return Tableau(["Habitants"], lignes, libelles=annees, coin="Année", largeur_case=2.3,
                       largeur_libelle=1.55, hauteur=0.6, fs=28, centre=self.TB)

    def case_vide(self, g, i):
        """La place de la barre qui manque : un cadre pointillé orange, « ? »."""
        larg = g.barres[0].width
        h = g.ref_y.get_length() * 0.96
        r = DashedVMobject(Rectangle(width=larg, height=h, stroke_color=ORANGE_RETENUE, stroke_width=4),
                           num_dashes=40)
        r.move_to(g.base(i), aligned_edge=DOWN)
        q = Text("?", font_size=60, color=ORANGE_RETENUE, weight=BOLD).move_to(r)
        return VGroup(r, q)

    def poser(self, figure, cache=()):
        """Ajoute la figure entière ; les marques d'indices `cache` restent invisibles."""
        self.add(figure)
        for i in cache:
            figure.barres[i].set_opacity(0)
        return figure

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Compléter un diagramme en barres", 52, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.85))
        g = Barres(["", "", "", ""], POP, pas=300000, maxi=900000, couleurs=COUL, largeur=3.6, hauteur=2.2,
                   fs=24, centre=P(-0.6, 0.15))
        for v, nb in g.nombres.items():
            nb.set_opacity(0)  # aucun nombre sur la garde : la voix n'en dit pas
        vide = self.case_vide(g, 3)
        self.au_mot("Il manque une barre")
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9),
                  g.pousser([0, 1, 2], run_time=0.8), run_time=0.8)
        self.play(Create(vide[0]), FadeIn(vide[1], scale=0.4), run_time=0.4)
        self.au_mot("à toi de la dessiner")
        crayon = self.crayon().next_to(vide, RIGHT, buff=0.25).shift(UP * 0.4)
        self.play(FadeIn(crayon, shift=LEFT * 0.3), run_time=0.4)
        self.insister(vide[1], 1.4, 0.25)
        self.attendre_voix(marge=0.8)

    def crayon(self):
        corps = Rectangle(width=0.28, height=1.1, fill_color="#facc15", fill_opacity=1, stroke_color=WHITE,
                          stroke_width=2)
        pointe = Polygon(P(-0.14, -0.55), P(0.14, -0.55), P(0, -0.85), fill_color="#fde68a", fill_opacity=1,
                         stroke_color=WHITE, stroke_width=2)
        mine = Polygon(P(-0.05, -0.75), P(0.05, -0.75), P(0, -0.85), fill_color=NUIT, fill_opacity=1, stroke_width=0)
        return VGroup(corps, pointe, mine).rotate(-0.5)

    # ── 01 : l'historien ────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Un historien")
        lv = livre(2.4).move_to(P(-3.6, 1.0))
        metier = self.t("Historien", 46, BLEU_CALCUL).next_to(lv, DOWN, buff=0.45)
        self.play(FadeIn(lv, shift=UP * 0.3), run_time=0.5)
        self.play(Write(metier), run_time=0.5)
        self.au_mot("La Réunion")
        carte = ile(1.35).move_to(P(2.9, 1.25))
        nom = self.t("La Réunion", 40, VERT_OK).next_to(carte, UP, buff=0.25)
        self.play(DrawBorderThenFill(carte), FadeIn(nom, shift=DOWN * 0.2), run_time=0.8)
        self.au_mot("Il compte les habitants")
        gens = VGroup(*[personnage(c, 0.55) for c in [BLEU_CALCUL, ORANGE_RETENUE, VERT_OK, "#f472b6",
                                                      JAUNE_TITRE, BLEU_CALCUL, "#f472b6", VERT_OK]])
        gens.arrange(RIGHT, buff=0.22).move_to(P(2.9, -0.9))
        self.play(LaggedStart(*[FadeIn(p, shift=UP * 0.3) for p in gens], lag_ratio=0.12), run_time=1.0)
        self.au_mot("recensement")
        rec = self.t("le recensement", 38, WHITE).next_to(gens, DOWN, buff=0.35)
        self.play(FadeIn(rec, shift=UP * 0.2), Indicate(gens, color=WHITE, scale_factor=1.06), run_time=0.6)
        self.au_mot("l'INSEE")
        src = self.t("Source : INSEE", 36, AMBRE)
        cadre = SurroundingRectangle(src, color=AMBRE, buff=0.18, corner_radius=0.1, stroke_width=3)
        VGroup(src, cadre).next_to(metier, DOWN, buff=0.5)
        self.play(FadeIn(src, scale=0.7), Create(cadre), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le tableau de l'historien ──────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        tab = self.tableau(rempli=False)
        tab.scale(1.4).move_to(P(2.6, 0.5))
        for lib in tab.libelles:
            lib[1].set_opacity(0)  # les années s'écrivent au mot
        lv = livre(1.9).move_to(P(-3.6, 1.6))
        env = self.t("environ", 36, AMBRE).next_to(tab, DOWN, buff=0.35)
        self.add(lv, tab)
        gens = VGroup()
        for r, (an, v) in enumerate(zip(ANNEES, POP)):
            self.au_mot(f"En {an}")
            self.play(tab.libelles[r][1].animate.set_opacity(1), *tab.allumer_ligne(r), run_time=0.35)
            self.play(tab.remplir(r, 0, v), run_time=0.45)
            if r == 0:
                self.play(FadeIn(env, shift=UP * 0.15), run_time=0.3)
            # de plus en plus d'habitants (1 personnage ≈ 100 000)
            rang = VGroup(*[personnage(BLEU_CALCUL, 0.32) for _ in range(round(v / 100000))])
            rang.arrange(RIGHT, buff=0.06).move_to(P(-3.6, 0.15 - r * 0.62))
            gens.add(rang)
            self.play(LaggedStart(*[FadeIn(p, scale=0.5) for p in rang], lag_ratio=0.08), *tab.eteindre(),
                      run_time=0.6)
        self.attendre_voix()

    # ── 03 : les graduations, la barre qui manque ───────────────────────────

    def ecran_graduations(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-graduations")
        g = self.graphe()
        tab = self.tableau()
        base = VGroup(g.carte, g.titre, g.nom_axe, g.grille, g.axe_x, g.axe_y, g.etiquettes)
        self.au_mot("Sur le diagramme")
        self.play(FadeIn(base, scale=0.95), FadeIn(tab, shift=LEFT * 0.2), run_time=0.6)
        self.au_mot("de 100 000 en 100 000")
        pas = self.col(self.ligne([("de", WHITE), ("100 000", AMBRE), ("en", WHITE), ("100 000", AMBRE)], 38), -0.75)
        self.play(FadeIn(pas, shift=RIGHT * 0.2), Indicate(g.axe_y, color=AMBRE), run_time=0.45)
        majeurs = sorted(g.nombres)
        for v in majeurs[:3]:
            self.play(FadeIn(g.nombre(v), scale=1.5), FadeIn(g.trait(v)), run_time=0.3)
        self.play(LaggedStart(*[AnimationGroup(FadeIn(g.nombre(v)), FadeIn(g.trait(v))) for v in majeurs[3:]],
                              lag_ratio=0.25), run_time=0.7)
        self.au_mot("Trois barres")
        trois = self.col(self.ligne([("3", BLEU_CALCUL), ("barres dessinées", WHITE)], 38), -1.55)
        self.play(g.pousser([0, 1, 2], run_time=0.9), FadeIn(trois, shift=RIGHT * 0.2))
        self.au_mot("Il manque celle de 2010")
        vide = self.case_vide(g, 3)
        manque = self.col(self.ligne([("Il manque", WHITE), ("2010", ORANGE_RETENUE)], 38), -2.35)
        self.play(Create(vide[0]), FadeIn(vide[1], scale=0.4), FadeIn(manque, shift=RIGHT * 0.2),
                  *tab.allumer_ligne(3), Indicate(g.etiquettes[3], color=ORANGE_RETENUE), run_time=0.7)
        self.insister(vide[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 04 : dessiner la barre de 2010 ──────────────────────────────────────

    def ecran_dessiner(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-dessiner")
        g = self.poser(self.graphe(), cache=[3])
        tab = self.tableau()
        self.add(tab)
        vide = self.case_vide(g, 3)
        self.add(vide)
        self.au_mot("820 000")
        v1 = self.col(self.t("820 000", 50, JAUNE_TITRE), -0.65)
        self.play(*tab.allumer_case(3, 0), FadeIn(v1, scale=1.5), run_time=0.45)
        self.insister(tab.cases[3][0], 1.25, 0.25)
        self.au_mot("entre 800 000")
        entre = self.col(self.ligne([("entre", WHITE), ("800 000", AMBRE), ("et", WHITE), ("900 000", AMBRE)], 36),
                         -1.45)
        self.play(FadeIn(entre, shift=RIGHT * 0.2), Indicate(g.nombre(800000), color=AMBRE, scale_factor=1.2),
                  Indicate(g.nombre(900000), color=AMBRE, scale_factor=1.2), run_time=0.8)
        self.au_mot("un peu au-dessus")
        dessus = self.col(self.t("un peu au-dessus de 800 000", 34, WHITE), -2.2)
        niveau = DashedLine(g.y_axe(820000), P(vide.get_right()[0], g.y_axe(820000)[1]), color=AMBRE,
                            stroke_width=6, dash_length=0.14, dashed_ratio=0.6)
        self.play(FadeIn(dessus, shift=RIGHT * 0.2), Create(niveau), run_time=0.7)
        self.au_mot("Je monte la barre")
        g.barres[3].set_opacity(1)
        fl = Arrow(g.base(3) + RIGHT * 0.55, g.point(3) + RIGHT * 0.55, buff=0, color=VERT_OK, stroke_width=7,
                   max_tip_length_to_length_ratio=0.1)
        self.play(FadeOut(vide), GrowFromEdge(g.barres[3], DOWN), GrowArrow(fl), run_time=1.4)
        self.play(g.allumer(3), run_time=0.3)
        self.insister(g.barres[3], 1.08, 0.3, about=g.base(3))
        self.attendre_voix()

    # ── 05 : je vérifie avec le tableau ─────────────────────────────────────

    def ecran_verifie(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-verifie")
        g = self.poser(self.graphe())
        tab = self.tableau()
        self.add(tab)
        self.au_mot("Je vérifie")
        verif = self.col(VGroup(self.coche(VERT_OK, 0.28), self.t("Je vérifie", 42, VERT_OK)).arrange(RIGHT, buff=0.3),
                         -0.7)
        self.play(FadeIn(verif, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("chaque barre arrive")
        traces = VGroup()
        for i in range(4):
            tr = g.vers_axe(i)
            traces.add(tr)
            self.play(g.focus(i, 0.35), *tab.allumer_case(i, 0), Create(tr), run_time=0.45)
            self.play(*tab.eteindre(), run_time=0.2)
        self.au_mot("Les barres montent")
        self.play(g.rallumer(), FadeOut(traces), run_time=0.4)
        hauts = [g.barres[i].get_top() + UP * 0.25 for i in range(4)]
        fl = Arrow(hauts[0], hauts[3], buff=0, color=VERT_OK, stroke_width=8, max_tip_length_to_length_ratio=0.12)
        monte = self.col(self.t("Les barres montent", 38, WHITE), -1.5)
        self.play(GrowArrow(fl), FadeIn(monte, shift=RIGHT * 0.2), run_time=0.8)
        self.au_mot("la population a beaucoup grandi")
        grandi = self.col(VGroup(self.t("la population", 38, VERT_OK), self.t("a beaucoup grandi", 38, VERT_OK))
                          .arrange(DOWN, aligned_edge=LEFT, buff=0.12), -2.45)
        self.play(FadeIn(grandi, shift=UP * 0.2), run_time=0.5)
        self.insister(grandi, 1.12, 0.3)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        g = self.poser(self.graphe())
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.3)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("de 1 en 1")
        faux = self.col(self.ligne([("de", WHITE), ("1", ROUGE_ERREUR), ("en", WHITE), ("1", ROUGE_ERREUR), ("?", WHITE)],
                                   40), 2.45)
        self.play(FadeIn(faux, shift=RIGHT * 0.2), run_time=0.4)
        x = croix(faux, sw=6)
        self.play(Create(x), run_time=0.35)
        self.au_mot("de 100 000 en 100 000")
        bon = self.col(VGroup(self.coche(VERT_OK, 0.26), self.ligne([("de", WHITE), ("100 000", VERT_OK), ("en", WHITE),
                                                                    ("100 000", VERT_OK)], 38)).arrange(RIGHT, buff=0.3),
                       1.6)
        self.play(FadeIn(bon, shift=RIGHT * 0.2),
                  LaggedStart(*[Indicate(g.nombre(v), color=VERT_OK, scale_factor=1.2) for v in sorted(g.nombres)],
                              lag_ratio=0.12), run_time=1.2)
        self.au_mot("une barre plus large")
        large = g.barres[3].copy().stretch(1.9, 0, about_edge=LEFT).set_stroke(ROUGE_ERREUR, 7)
        self.play(Transform(g.barres[3], large), run_time=0.6)
        oeil = self.col(self.t("plus large : ça trompe l'œil", 34, ORANGE_RETENUE), 0.6)
        self.play(FadeIn(oeil, shift=RIGHT * 0.2), run_time=0.35)
        xb = croix(g.barres[3], sw=6)
        self.play(Create(xb), run_time=0.35)
        self.au_mot("toutes les barres ont la même largeur")
        normale = self.graphe().barres[3]
        self.play(FadeOut(xb), Transform(g.barres[3], normale), run_time=0.5)
        accol = VGroup(*[Brace(g.barres[i], UP, buff=0.06, color=AMBRE) for i in range(4)])
        meme = self.col(self.t("même largeur pour toutes", 36, AMBRE), -0.4)
        self.play(FadeIn(accol), FadeIn(meme, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("seule la hauteur compte")
        xh = g.barres[3].get_right()[0] + 0.2
        haut = DoubleArrow(P(xh, g.base(3)[1]), P(xh, g.point(3)[1]), buff=0, color=VERT_OK, stroke_width=6,
                           tip_length=0.2, max_tip_length_to_length_ratio=0.1)
        seule = self.col(self.t("seule la hauteur compte", 38, VERT_OK), -1.4)
        self.play(FadeOut(accol), GrowFromCenter(haut), FadeIn(seule, shift=RIGHT * 0.2), run_time=0.6)
        self.insister(seule, 1.12, 0.3)
        self.attendre_voix()

    # ── 07 : défi (1999) ────────────────────────────────────────────────────

    def graphe5(self):
        """Le diagramme avec la place de 1999, entre 1990 et 2010."""
        return self.graphe(ANNEES[:3] + ["1999", "2010"], POP[:3] + [710000, 820000],
                           COUL[:3] + ["#fcd34d", "#93c5fd"])

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        g = self.poser(self.graphe5(), cache=[3])
        g.etiquettes[3].set_opacity(0)
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("En 1999")
        vide = self.case_vide(g, 3)
        an = self.col(self.ligne([("En", WHITE), ("1999", ORANGE_RETENUE), (":", WHITE)], 42), 1.85)
        self.play(g.etiquettes[3].animate.set_opacity(1), Create(vide[0]), FadeIn(vide[1], scale=0.4),
                  FadeIn(an, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("710 000")
        hab = self.col(self.ligne([("environ", WHITE), ("710 000", JAUNE_TITRE), ("habitants", WHITE)], 38), 1.05)
        self.play(FadeIn(hab, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(hab[1], 1.3, 0.25)
        self.au_mot("Entre quelles graduations")
        q = VGroup(self.t("Entre quelles graduations", 38), self.t("s'arrête la barre ?", 38))
        self.col(q.arrange(DOWN, aligned_edge=LEFT, buff=0.15), -0.25)
        self.play(FadeIn(q, shift=RIGHT * 0.2), Indicate(g.axe_y, color=AMBRE), run_time=0.6)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -1.5)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        g = self.poser(self.graphe5(), cache=[3])
        vide = self.case_vide(g, 3)
        self.add(vide)
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Entre 700 000")
        entre = self.col(self.ligne([("entre", WHITE), ("700 000", AMBRE), ("et", WHITE), ("800 000", AMBRE)], 38), 1.8)
        self.play(FadeIn(entre, shift=RIGHT * 0.2), Indicate(g.nombre(700000), color=AMBRE, scale_factor=1.2),
                  Indicate(g.nombre(800000), color=AMBRE, scale_factor=1.2), run_time=0.8)
        self.au_mot("juste au-dessus")
        dessus = self.col(self.t("juste au-dessus de 700 000", 36, WHITE), 0.95)
        niveau = DashedLine(g.y_axe(710000), P(vide.get_right()[0], g.y_axe(710000)[1]), color=AMBRE,
                            stroke_width=6, dash_length=0.14, dashed_ratio=0.6)
        self.play(FadeIn(dessus, shift=RIGHT * 0.2), Create(niveau), run_time=0.6)
        g.barres[3].set_opacity(1)
        self.play(FadeOut(vide), GrowFromEdge(g.barres[3], DOWN), run_time=1.0)
        self.play(g.allumer(3), run_time=0.3)
        coche = self.coche(VERT_OK, 0.3).next_to(dessus, RIGHT, buff=0.25)
        self.play(Create(coche), run_time=0.3)
        self.insister(dessus, 1.1, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        g = self.poser(self.graphe())
        lignes = self.finale([("Je lis le nombre", "dans le tableau."),
                              ("Je regarde de combien", "en combien vont", "les graduations."),
                              ("Je monte la barre,", "même largeur", "pour toutes.")], fs=34)
        self.au_mot("je lis le nombre")
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), Create(lignes[0][0]), run_time=0.6)
        self.au_mot("Je regarde")
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), run_time=0.5)
        self.play(LaggedStart(*[Indicate(g.nombre(v), color=AMBRE, scale_factor=1.2) for v in sorted(g.nombres)],
                              lag_ratio=0.12), Create(lignes[1][0]), run_time=1.3)
        self.au_mot("Puis je monte la barre")
        fl = g.monter(3, couleur=VERT_OK)
        self.play(FadeIn(lignes[2][1], shift=RIGHT * 0.2), GrowArrow(fl), g.allumer(3), run_time=0.8)
        self.au_mot("avec la même largeur")
        self.play(LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.05) for b in g.barres], lag_ratio=0.2),
                  Create(lignes[2][0]), run_time=1.0)
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_graduations()
        self.ecran_dessiner()
        self.ecran_verifie()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class StatsGraphiqueCompleterCM1(StatsGraphiqueCompleterBase):
    identite = "Maths CM1 — EleveAI"


class StatsGraphiqueCompleterCM2(StatsGraphiqueCompleterBase):
    """Même vidéo pour le CM2 : seule l'identité change."""

    identite = "Maths CM2 — EleveAI"
