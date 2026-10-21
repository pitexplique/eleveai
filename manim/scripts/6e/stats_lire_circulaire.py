# stats_lire_circulaire.py
# EleveAI — Maths 6e — série « Statistiques », épisode 07 : LIRE UN DIAGRAMME
# CIRCULAIRE (micro du coach : `stat_donnee_lire_circulaire`, canvas
# `stat_graph` camembert), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 6e (lire des
# parts « moitié » et « quart », en déduire une quantité par une division,
# piège des parts inégales, défi corrigé). Short jumeau :
# stats_lire_circulaire_short.py (jaune, un cran plus bas).
#
# ⭐ Décor et métier : la SANTÉ et l'alimentation ; un DIÉTÉTICIEN explique
# l'assiette équilibrée (repère courant : la moitié de légumes, un quart de
# féculents, un quart de viande, poisson ou œufs).
# ⭐ La figure est CELLE DU COACH (manim/canvas_stats.py, Camembert) : la 1re
# part part de midi, couleurs franches, bord blanc, part allumée bordée d'ambre ;
# moitie() et quarts() tracent les diamètres en pointillé.
# ⛔ PAS D'ÉCART : un nombre ne s'écrit qu'au mot où la voix le dit.
# ⛔ La division s'écrit « ÷ » (400 ÷ 2), jamais 400/2 (règle du 06/10).
#
# Micro → écrans : stat_donnee_lire_circulaire = 02 (les parts : moitié,
# quarts), 03 (la plus grande part), 04 (une quantité : 400 ÷ 2, 400 ÷ 4),
# 05 (piège : trois parts ≠ trois tiers), 06 défi, 06b correction.
# Écrans : 00 garde · 01 le diététicien · 02 les parts · 03 comparer · 04 calculer ·
# 05 le piège · 06 défi · 06b correction · 07 ce que tu as appris · 08 fin.
#
# Voix : manim/voix/6e-stats-lire-circulaire.json (débit −10), WAV dans
# public/sons/6e-stats-lire-circulaire/ ; calage mot à mot :
# manim/scripts/6e/stats_lire_circulaire_marques.json (marques.ps1) ; ⚠️ sur
# 04-calcul et 06b-correction, WinRT avait mal placé les marques dans les
# suites de nombres : elles ont été retirées et `interpoler = True` répartit
# le temps entre les marques sûres.
# Outils communs du lot : manim/scripts/cm1/stats_graphique_completer.py.
# python -m manim render -qh --disable_caching manim/scripts/6e/stats_lire_circulaire.py StatsLireCirculaire6e -o eleveai-maths-6e-stats-lire-circulaire --media_dir manim/scripts/6e/media-lire-circulaire
# Sortie : manim/sorties/6e/maths/statistiques/07-lire-circulaire/

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, NUIT, Camembert  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_graphique_completer import OutilsStats, P, croix  # noqa: E402

PARTS = ["Légumes", "Riz", "Poisson"]
VALEURS = [2, 1, 1]
COUL = ["#6ee7b7", "#fcd34d", "#fca5a5"]
TXT = ["#6ee7b7", "#fcd34d", "#fca5a5"]  # les mêmes couleurs pour écrire sur le noir


def devant(d):
    """Les noms des parts restent DEVANT : le module passe la part allumée en
    z_index 1 (canvas_stats, non modifiable), ce qui cachait son nom."""
    for t in d.textes:
        t.set_z_index(3)
    return d


def assiette(r=1.4):
    """Une assiette vue de dessus : le bord et le creux."""
    bord = Circle(radius=r, fill_color="#f1f5f9", fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
    creux = Circle(radius=r * 0.72, fill_color=WHITE, fill_opacity=1, stroke_color="#cbd5e1", stroke_width=2)
    return VGroup(bord, creux)


def couverts(h=1.6):
    """Une fourchette et un couteau, debout."""
    manche_f = RoundedRectangle(width=0.14, height=h * 0.62, corner_radius=0.06, fill_color="#cbd5e1",
                                fill_opacity=1, stroke_width=0).move_to(P(0, -h * 0.19))
    dents = VGroup(*[Line(P(dx, h * 0.12), P(dx, h * 0.45), color="#cbd5e1", stroke_width=5)
                     for dx in (-0.12, -0.04, 0.04, 0.12)])
    tete = Line(P(-0.14, h * 0.12), P(0.14, h * 0.12), color="#cbd5e1", stroke_width=6)
    fourchette = VGroup(manche_f, dents, tete)
    lame = Polygon(P(-0.07, -0.05), P(0.1, -0.05), P(0.1, h * 0.45), P(-0.07, h * 0.3), fill_color="#e2e8f0",
                   fill_opacity=1, stroke_width=0)
    manche_c = RoundedRectangle(width=0.17, height=h * 0.5, corner_radius=0.06, fill_color="#94a3b8", fill_opacity=1,
                                stroke_width=0).move_to(P(0.015, -h * 0.25 - 0.05))
    couteau = VGroup(lame, manche_c).shift(RIGHT * 0.5)
    return VGroup(fourchette, couteau)


class StatsLireCirculaire6e(OutilsStats, Notion6e):
    nom_voix = "6e-stats-lire-circulaire"
    fichier_marques = "stats_lire_circulaire_marques.json"
    dossier_marques = Path(__file__).resolve().parent
    interpoler = True
    identite = "Maths 6e — EleveAI"
    C = P(-3.3, -0.35)

    def disque(self, centre=None, rayon=2.2, etiquettes=True):
        d = Camembert(PARTS, VALEURS, rayon=rayon, couleurs=COUL, montrer_etiquettes=etiquettes,
                      titre="Mon assiette", fs=32, centre=self.C if centre is None else centre)
        devant(d)
        return d

    def disque_pret(self):
        d = self.disque()
        self.add(d)
        return d

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Lire un diagramme circulaire", 54, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.85))
        d = Camembert(PARTS, VALEURS, rayon=1.1, couleurs=COUL, montrer_etiquettes=False, carte=True,
                      centre=P(-0.6, 0.2))
        self.au_mot("Un diagramme circulaire")
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(d.fond), run_time=0.6)
        self.au_mot("un disque")
        disque = Circle(radius=1.1, stroke_color=WHITE, stroke_width=4).move_to(d.centre)
        self.play(Create(disque), run_time=0.5)
        self.au_mot("coupé en parts")
        self.play(d.apparaitre(run_time=1.0), FadeOut(disque))
        self.play(d.sortir(0, 0.2), run_time=0.3)
        self.play(d.rentrer(0, 0.2), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 01 : le diététicien ─────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Un diététicien")
        metier = self.t("Diététicien", 46, BLEU_CALCUL).move_to(P(2.6, 2.3))
        sante = self.t("aider à bien manger", 36).next_to(metier, DOWN, buff=0.3)
        self.play(Write(metier), run_time=0.6)
        self.au_mot("à bien manger")
        self.play(FadeIn(sante, shift=UP * 0.2), run_time=0.4)
        self.au_mot("une assiette équilibrée")
        ass = assiette(1.6).move_to(P(-3.3, 0.0))
        cv = couverts(1.7).next_to(ass, RIGHT, buff=0.35)
        eq = self.t("une assiette équilibrée", 38, VERT_OK).move_to(P(2.6, 0.6))
        self.play(FadeIn(ass, scale=0.8), FadeIn(cv, shift=LEFT * 0.2), FadeIn(eq, shift=UP * 0.2), run_time=0.7)
        self.au_mot("il dessine un disque")
        d = Camembert(PARTS, VALEURS, rayon=1.15, couleurs=COUL, montrer_etiquettes=False, carte=False,
                      centre=ass.get_center())
        self.play(d.apparaitre(run_time=1.2))
        self.au_mot("comme une assiette")
        comme = self.t("un disque = une assiette", 38).move_to(P(2.6, -0.6))
        self.play(FadeIn(comme, shift=UP * 0.2), Indicate(ass[0], color=AMBRE, scale_factor=1.05), run_time=0.6)
        self.attendre_voix()

    # ── 02 : les parts ──────────────────────────────────────────────────────

    def ecran_parts(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-parts")
        d = self.disque()
        self.add(d.fond)
        lignes = [("La moitié :", "légumes", "La moitié de l'assiette"),
                  ("Un quart :", "féculents (riz, grains)", "Un quart : des féculents"),
                  ("Un quart :", "viande, poisson, œufs", "Un quart : la viande")]
        traits = [d.moitie(), d.quarts()[1]]
        for k, (a, b, mot) in enumerate(lignes):
            self.au_mot(mot)
            lg = VGroup(self.t(a, 38, TXT[k]), self.t(b, 36)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
            self.col(lg, 2.0 - 1.45 * k)
            anims = [GrowFromPoint(d.parts[k], d.centre), FadeIn(d.textes[k]), FadeIn(lg, shift=RIGHT * 0.2)]
            if k < 2:
                anims.append(Create(traits[k]))
            self.play(*anims, run_time=0.7)
            self.play(d.sortir(k, 0.2), run_time=0.3)
            self.play(d.rentrer(k, 0.2), run_time=0.3)
        self.attendre_voix()

    # ── 03 : la plus grande part ────────────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lire")
        d = self.disque_pret()
        self.au_mot("Plus la part est grande")
        l1 = self.col(VGroup(self.t("Plus la part est grande,", 38), self.t("plus il y en a.", 38, AMBRE))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.12), 2.0)
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("plus il y en a")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("La moitié, c'est la plus grande part")
        l2 = self.col(VGroup(self.t("La moitié :", 38, TXT[0]), self.t("la plus grande part", 38))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.12), 0.35)
        self.play(d.focus(0, 0.35), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        self.play(d.sortir(0, 0.3), run_time=0.4)
        self.au_mot("les légumes gagnent")
        gagne = self.col(self.t("Les légumes gagnent !", 44, VERT_OK), -1.1)
        self.play(FadeIn(gagne, scale=0.7), run_time=0.4)
        self.insister(gagne, 1.12, 0.3)
        self.attendre_voix()

    # ── 04 : calculer une quantité ──────────────────────────────────────────

    def sur_part(self, d, i, s, fs=30):
        """Un texte posé sur la part i (sous son nom), encre du coach, liseré blanc."""
        t = Text(s, font_size=fs, color=NUIT, weight=BOLD).set_stroke(WHITE, 5, background=True)
        return t.next_to(d.textes[i], DOWN, buff=0.08).set_z_index(3)

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-calcul")
        d = self.disque_pret()
        self.au_mot("pèse 400")
        tot = self.col(self.ligne([("L'assiette :", WHITE), ("400 g", JAUNE_TITRE)], 40), 2.6)
        self.play(FadeIn(tot, shift=RIGHT * 0.2), Indicate(d.parts, color=WHITE, scale_factor=1.04), run_time=0.5)
        blocs = []
        for k, (nom, div, mot_nom, mot_div, mot_res, res) in enumerate([
                ("Légumes, la moitié :", "2", "Les légumes", "400 divisé par 2", "égale 200", "200 g"),
                ("Riz, un quart :", "4", "Le riz, un quart", "400 divisé par 4", "égale 100", "100 g")]):
            y = 1.55 - 2.0 * k
            self.au_mot(mot_nom)
            tete = self.col(self.t(nom, 36, TXT[k]), y)
            self.play(d.focus(k, 0.35), FadeIn(tete, shift=RIGHT * 0.2), run_time=0.45)
            calc = self.ligne([("400", WHITE), ("÷", WHITE), (div, AMBRE), ("=", WHITE), (res, TXT[k])], 46, 0.22)
            self.col(calc, y - 0.75)
            self.au_mot(mot_div)
            self.play(FadeIn(calc[:3], shift=RIGHT * 0.2), run_time=0.4)
            self.au_mot(mot_res)
            g = self.sur_part(d, k, res)
            self.play(FadeIn(calc[3:], scale=1.4), FadeIn(g, scale=1.5), run_time=0.4)
            self.insister(calc[4], 1.25, 0.25)
            blocs.append(VGroup(tete, calc))
        self.play(d.rallumer(), run_time=0.4)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        d = self.disque_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.3)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("trois parts, ce sont trois tiers")
        tiers = Camembert(["", "", ""], [1, 1, 1], rayon=0.85, couleurs=["#cbd5e1", "#94a3b8", "#e2e8f0"],
                          montrer_etiquettes=False, carte=False, centre=P(1.75, 1.75))
        # le mini-camembert à GAUCHE, la phrase à DROITE, en grand ; seule la phrase est barrée
        faux = VGroup(self.ligne([("3", ROUGE_ERREUR), ("parts", WHITE)], 42),
                      self.ligne([("=", WHITE), ("3", ROUGE_ERREUR), ("tiers ?", WHITE)], 42))
        faux.arrange(DOWN, aligned_edge=LEFT, buff=0.15).next_to(tiers, RIGHT, buff=0.55)
        self.play(tiers.apparaitre(run_time=0.8), FadeIn(faux, shift=RIGHT * 0.2))
        x = croix(faux.copy().scale(1.08), sw=6)
        self.au_mot("Ici, les parts ne sont pas égales")
        self.play(Create(x), run_time=0.4)
        neg = self.col(VGroup(self.t("Ici, les parts", 38), self.t("ne sont pas égales :", 38))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 0.1)
        self.play(FadeIn(neg, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("une moitié")
        moit = d.moitie()
        l1 = self.col(self.ligne([("une moitié", TXT[0]), ("et", WHITE), ("deux quarts", TXT[1])], 38), -0.95)
        self.play(Create(moit), FadeIn(l1[0], shift=RIGHT * 0.2), d.focus(0, 0.35), run_time=0.5)
        self.au_mot("deux quarts")
        h = d.quarts()[1]
        self.play(Create(h), FadeIn(l1[1:], shift=RIGHT * 0.2), d.estomper([1, 2], 0.35), run_time=0.5)
        self.au_mot("Je regarde la taille")
        self.play(d.rallumer(), run_time=0.3)
        ok = self.col(VGroup(self.coche(VERT_OK, 0.26), VGroup(self.t("Je regarde la taille", 36, VERT_OK),
                                                                self.t("de chaque part.", 36, VERT_OK))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.1)).arrange(RIGHT, buff=0.3), -1.95)
        self.play(FadeIn(ok, shift=UP * 0.2),
                  LaggedStart(*[d.sortir(i, 0.15) for i in range(3)], lag_ratio=0.3), run_time=0.9)
        self.play(*[d.rentrer(i, 0.15) for i in range(3)], run_time=0.4)
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        d = self.disque_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Une assiette de 600")
        tot = self.col(self.ligne([("Une assiette de", WHITE), ("600 g", JAUNE_TITRE)], 40), 1.6)
        self.play(FadeIn(tot, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Combien de grammes de légumes")
        q1 = self.col(VGroup(self.t("Combien de grammes", 38), self.t("de légumes ?", 38, TXT[0]))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 0.55)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), d.focus(0, 0.4), run_time=0.5)
        self.au_mot("Et de poisson")
        q2 = self.col(self.ligne([("Et de", WHITE), ("poisson ?", TXT[2])], 38), -0.45)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), d.estomper([0, 2], 0.35), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -1.4)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06b-correction")
        d = self.disque_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.1)
        self.play(Write(titre), run_time=0.5)
        etapes = [("La moitié de 600", "300 grammes de légumes", "2", "300 g", 0, "légumes"),
                  ("Un quart de 600", "150 grammes de poisson", "4", "150 g", 2, "poisson")]
        for k, (mot1, mot2, div, res, i, nom) in enumerate(etapes):
            y = 2.15 - 0.85 * k
            self.au_mot(mot1)
            calc = self.ligne([("600", WHITE), ("÷", WHITE), (div, AMBRE), ("=", WHITE), (res, TXT[i]), (nom, WHITE)],
                              40, 0.2)
            self.col(calc, y)
            self.play(d.focus(i, 0.35), FadeIn(calc[:3], shift=RIGHT * 0.2), run_time=0.45)
            self.au_mot(mot2)
            self.play(FadeIn(calc[3:], scale=1.3), FadeIn(self.sur_part(d, i, res), scale=1.5), run_time=0.4)
        self.au_mot("Et 150 grammes de riz")
        riz = self.col(self.ligne([("Et", WHITE), ("150 g", TXT[1]), ("de riz", WHITE)], 40), 0.45)
        self.play(d.focus(1, 0.35), FadeIn(riz, shift=RIGHT * 0.2), FadeIn(self.sur_part(d, 1, "150 g"), scale=1.5),
                  run_time=0.45)
        somme = self.ligne([("300", TXT[0]), ("+", WHITE), ("150", TXT[2]), ("+", WHITE), ("150", TXT[1]),
                            ("=", WHITE), ("600", VERT_OK)], 48, 0.22)
        self.col(somme, -0.65)
        for mot, idx in [("300 plus", [0, 1]), ("150 plus 150", [2, 3, 4]), ("égale 600", [5, 6])]:
            self.au_mot(mot)
            self.play(*[FadeIn(somme[j], scale=1.4) for j in idx], d.rallumer(), run_time=0.4)
        self.au_mot("tout le disque")
        tout = self.col(self.t("tout le disque !", 40, VERT_OK), -1.55)
        cercle = Circle(radius=d._rayon() + 0.12, stroke_color=VERT_OK, stroke_width=7).move_to(d.centre)
        self.play(FadeIn(tout, shift=UP * 0.2), Create(cercle), run_time=0.7)
        self.insister(somme[6], 1.4, 0.3)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        d = self.disque_pret()
        lignes = self.finale([("Chaque part :", "une partie du tout."),
                              ("Je compare la taille :", "une moitié, un quart."),
                              ("Toutes les parts", "ensemble :", "le disque entier.")], fs=34)
        self.au_mot("chaque part représente")
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), d.sortir(1, 0.25), run_time=0.6)
        self.play(d.rentrer(1, 0.25), Create(lignes[0][0]), run_time=0.4)
        self.au_mot("Je compare la taille")
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), d.focus(0, 0.4), run_time=0.6)
        self.au_mot("un quart")
        self.play(d.focus(2, 0.4), Create(lignes[1][0]), run_time=0.5)
        self.au_mot("toutes les parts ensemble")
        cercle = Circle(radius=d._rayon() + 0.12, stroke_color=VERT_OK, stroke_width=7).move_to(d.centre)
        self.play(FadeIn(lignes[2][1], shift=RIGHT * 0.2), d.rallumer(), Create(cercle), run_time=0.8)
        self.play(Create(lignes[2][0]), run_time=0.3)
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_parts()
        self.ecran_comparer()
        self.ecran_calcul()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
