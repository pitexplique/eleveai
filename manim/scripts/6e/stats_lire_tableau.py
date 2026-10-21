# stats_lire_tableau.py
# EleveAI — Maths 6e — série « Statistiques », épisode 01 : LIRE UN TABLEAU
# (micro du coach : stat_donnee_lire_tableau, banque 6e/maths/donnees.bank.ts,
# canvas `tableau_donnees`), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE : lire le titre, croiser une ligne et une
# colonne, chercher le plus grand nombre pour DÉCIDER. Short jumeau :
# stats_lire_tableau_short.py (blanche).
#
# ⭐ Décor et métier : les TRANSPORTS, le réseau de bus ; un RÉGULATEUR compte
# les voyageurs de trois lignes de bus, le matin, le midi et le soir, pour
# décider où ajouter un bus.
# ⭐ La figure est CELLE DU COACH (canvas_stats.Tableau = `tableau_donnees`) ;
# les gestes (communs au lot, stats_tableau_commun.py) : flèche le long de la
# ligne, flèche le long de la colonne, case du croisement allumée.
# ⛔ PAS D'ÉCART : les cases sont vides jusqu'au mot où la voix dit le nombre.
#
# Écrans : 00 garde · 01 le régulateur, le bus, matin / midi / soir · 02 le
# titre, les lignes (de bus), les colonnes (moments) · 03 on remplit · 04 lire
# ligne 3 × soir = 160 · 05 décider (210 : ligne 1, le soir) · 06 le piège
# (ligne de gauche à droite, colonne de haut en bas) · 07 défi · 07b correction
# (40 ; 95 → ligne 2) · 08 ce que tu as appris · 09 fin (règle du 19/10).
#
# Voix : manim/voix/6e-stats-lire-tableau.json (débit −10), WAV dans
# public/sons/6e-stats-lire-tableau/ ; calage mot à mot :
# manim/scripts/6e/stats6_lire_tableau_marques.json (marques WinRT, même
# moteur et même SSML que scripts/generer-voix.ps1, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/6e/stats_lire_tableau.py StatsLireTableau6e -o eleveai-maths-6e-stats-lire-tableau --media_dir manim/scripts/6e/media-stats-lire-tableau
# Sortie : manim/sorties/6e/maths/statistiques/01-lire-tableau/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from stats_tableau_commun import *  # noqa: E402,F403
from stats_tableau_commun import P, BaseTableauPaysage  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, BORD_TABLEAU, NUIT, Tableau  # noqa: E402

LIGNES = ["Ligne 1", "Ligne 2", "Ligne 3"]
MOMENTS = ["Matin", "Midi", "Soir"]
VOYAGEURS = [[180, 60, 210], [95, 40, 120], [140, 75, 160]]
COUL_BUS = ["#ef4444", "#22c55e", "#3b82f6"]   # la couleur de chaque ligne de bus


def bus(s=1.0, couleur="#facc15"):
    caisse = RoundedRectangle(width=2.4 * s, height=1.0 * s, corner_radius=0.15 * s, fill_color=couleur,
                              fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    vitres = VGroup(*[Rectangle(width=0.38 * s, height=0.36 * s, fill_color="#bae6fd", fill_opacity=1,
                                stroke_width=0) for _ in range(4)]).arrange(RIGHT, buff=0.12 * s)
    vitres.move_to(caisse).shift(UP * 0.15 * s + LEFT * 0.15 * s)
    pare = Rectangle(width=0.3 * s, height=0.5 * s, fill_color="#bae6fd", fill_opacity=1, stroke_width=0)
    pare.move_to(caisse.get_right() + LEFT * 0.22 * s + UP * 0.1 * s)
    roues = VGroup(*[Circle(radius=0.18 * s, fill_color="#1f2937", fill_opacity=1, stroke_color=WHITE,
                            stroke_width=2).move_to(caisse.get_bottom() + P(x * s, 0)) for x in (-0.7, 0.7)])
    return VGroup(caisse, vitres, pare, roues)


def soleil(r=0.3, couleur="#facc15"):
    rayons = VGroup(*[Line(ORIGIN, RIGHT * r * 0.6, color=couleur, stroke_width=3).shift(RIGHT * r * 1.2)
                      .rotate(k * TAU / 8, about_point=ORIGIN) for k in range(8)])
    return VGroup(Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0), rayons)


def lune(r=0.3):
    a = Circle(radius=r, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
    b = Circle(radius=r, fill_color=BLACK, fill_opacity=1, stroke_width=0).shift(RIGHT * r * 0.5 + UP * r * 0.25)
    return VGroup(a, b)


class StatsLireTableau6e(BaseTableauPaysage):
    nom_voix = "6e-stats-lire-tableau"
    fichier_marques = "stats6_lire_tableau_marques.json"
    identite = "Maths 6e — EleveAI"
    XL = 1.55
    G = P(-3.0, -0.35)

    def tableau(self, plein=True, libelles=True):
        lignes = [list(r) for r in VOYAGEURS] if plein else [[None] * 3 for _ in range(3)]
        tab = Tableau(MOMENTS, lignes, libelles=LIGNES, coin="Bus", largeur_case=1.75, largeur_libelle=2.2,
                      hauteur=0.9, fs=32, titre="Voyageurs d'un lundi", centre=self.G)
        return textes_devant(tab)

    def tableau_pret(self):
        tab = self.tableau()
        self.add(tab)
        return tab

    def revenir(self, tab, coords):
        return [tab.case(r, c).animate.set_fill(tab._fonds[r]).set_stroke(BORD_TABLEAU, width=2.5)
                for r, c in coords]

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        ti, ident, ech = self.garde("Lire un tableau", "jaune")
        tab = Tableau(["Matin", "Midi", "Soir"], [[None] * 3 for _ in range(3)], libelles=LIGNES, coin="",
                      largeur_case=1.1, largeur_libelle=1.6, hauteur=0.55, fs=22, centre=P(-0.6, 0.15))
        self.play(Write(ti), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tab, scale=0.9), run_time=0.5)
        self.au_mot("colonne")
        self.play(*teinter_ligne(tab, 1), run_time=0.3)
        self.play(*teinter_colonne(tab, 2, BLEU_PALE), run_time=0.3)
        self.au_mot("case")
        self.play(*allumer(tab, 1, 2), run_time=0.3)
        self.insister(tab.case(1, 2), 1.25, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : le régulateur, matin / midi / soir ─────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        route = Line(P(-7.1, -0.2), P(1.0, -0.2), color=GREY_B, stroke_width=6)
        b = bus(1.2).move_to(P(-8.5, 0.55))
        metier = self.col(self.bloc(["Régulateur", "du réseau de bus"], 42, BLEU_CALCUL), 2.4)
        self.play(Create(route), b.animate.move_to(P(-3.2, 0.55)), FadeIn(metier, shift=RIGHT * 0.2), run_time=0.9)
        self.au_mot("compte les voyageurs")
        gens = VGroup(*[VGroup(Circle(radius=0.12, fill_color="#d6a77a", fill_opacity=1, stroke_width=0),
                               RoundedRectangle(width=0.3, height=0.36, corner_radius=0.1, fill_color=c,
                                                fill_opacity=1, stroke_width=0).shift(DOWN * 0.28))
                        for c in ("#f472b6", "#60a5fa", "#a3e635", "#fb923c", "#c084fc")]).arrange(RIGHT, buff=0.15)
        gens.move_to(P(-3.2, -0.85))
        self.play(LaggedStart(*[FadeIn(g, shift=UP * 0.3) for g in gens], lag_ratio=0.15), run_time=0.7)
        icones = [(soleil(0.25, "#fdba74"), "le matin", "le matin"), (soleil(0.32), "le midi", "le midi"),
                  (lune(0.28), "le soir", "le soir")]
        for k, (ic, txt, mot) in enumerate(icones):
            self.au_mot(mot)
            g = VGroup(ic, self.t(txt, 34)).arrange(DOWN, buff=0.2).move_to(P(-5.6 + 2.4 * k, -2.3))
            self.play(FadeIn(g, shift=UP * 0.2), run_time=0.35)
        self.au_mot("il décide")
        q = self.col(self.bloc(["Où ajouter", "des bus ?"], 40, JAUNE_TITRE), 0.4)
        b2 = bus(0.6, "#fb923c").next_to(q, DOWN, buff=0.4).align_to(q, LEFT)
        plus = self.t("+", 60, VERT_OK).next_to(b2, RIGHT, buff=0.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.play(FadeIn(b2, shift=RIGHT * 0.4), FadeIn(plus, scale=0.5), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le titre, les lignes, les colonnes ─────────────────────────────

    def ecran_titre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-titre")
        tab = self.tableau(plein=False)
        rects = VGroup(*[tab.case(r, c) for r in range(3) for c in range(3)])
        self.play(FadeIn(VGroup(tab.carte, tab.coin, rects), scale=0.95), run_time=0.5)
        self.au_mot("je lis le titre")
        e1 = self.col(self.ligne([("1.", AMBRE), ("le titre", WHITE)], 40), 2.3)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Voyageurs d'un lundi")
        self.play(Write(tab.titre), run_time=0.8)
        self.play(Indicate(tab.titre, color=AMBRE, scale_factor=1.1), run_time=0.5)
        self.au_mot("Les lignes du tableau")
        e2 = self.col(self.ligne([("2.", AMBRE), ("les lignes : les bus", WHITE)], 40), 1.2)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("les lignes de bus")
        self.play(LaggedStart(*[AnimationGroup(FadeIn(tab.libelles[r], shift=RIGHT * 0.3), *teinter_ligne(tab, r))
                                for r in range(3)], lag_ratio=0.35), run_time=1.0)
        self.play(*self.revenir(tab, [(r, c) for r in range(3) for c in range(3)]), run_time=0.3)
        self.au_mot("Les colonnes")
        e3 = self.col(self.ligne([("3.", AMBRE), ("les colonnes :", WHITE)], 40), 0.1)
        e3b = self.col(self.bloc(["les moments", "de la journée"], 40), -0.95)
        self.play(FadeIn(e3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("les moments")
        self.play(FadeIn(e3b, shift=RIGHT * 0.2),
                  LaggedStart(*[AnimationGroup(FadeIn(tab.tetes[c], shift=DOWN * 0.3),
                                               *teinter_colonne(tab, c, BLEU_PALE)) for c in range(3)],
                              lag_ratio=0.35), run_time=1.0)
        self.play(*self.revenir(tab, [(r, c) for r in range(3) for c in range(3)]), run_time=0.3)
        self.attendre_voix()

    # ── 03 : on remplit, ligne par ligne ────────────────────────────────────

    def ecran_remplir(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-remplir")
        tab = self.tableau(plein=False)
        self.add(tab)
        mots = [("Ligne 1", ["180 le", "60 le", "210 le"]), ("Ligne 2", ["95,", "40 et", "120."]),
                ("Ligne 3", ["140,", "75 et", "160."])]
        etiq = None
        for r, (nom, nombres) in enumerate(mots):
            self.au_mot(nom)
            neuf = VGroup(bus(0.55, COUL_BUS[r]), self.t(nom, 50, COUL_BUS[r])).arrange(RIGHT, buff=0.35)
            self.col(neuf, 1.3)
            anims = teinter_ligne(tab, r)
            if r > 0:
                anims += self.revenir(tab, [(r - 1, c) for c in range(3)])
            self.play(FadeOut(etiq) if etiq else Wait(0.01), FadeIn(neuf, shift=UP * 0.2),
                      Indicate(tab.libelles[r][1], color=AMBRE), *anims, run_time=0.35)
            etiq = neuf
            for c, mot in enumerate(nombres):
                self.au_mot(mot)
                self.play(remplir(tab, r, c, VOYAGEURS[r][c]), run_time=0.3)
        self.play(*self.revenir(tab, [(2, c) for c in range(3)]), run_time=0.4)
        self.attendre_voix()

    # ── le geste de lecture ─────────────────────────────────────────────────

    def lire(self, tab, r, c, mots, y0, unite="voyageurs"):
        """mots = (ligne, colonne, valeur) : les extraits de la voix."""
        v = VOYAGEURS[r][c]
        self.au_mot(mots[0])
        fl = fleche_ligne(tab, r, c)
        e1 = self.col(self.ligne([("1.", AMBRE), ("la " + LIGNES[r].lower(), WHITE)], 38), y0)
        self.play(GrowArrow(fl), *teinter(tab, [(r, k) for k in range(3) if k != c]), FadeIn(e1, shift=RIGHT * 0.2),
                  Indicate(tab.libelles[r][1], color=AMBRE), run_time=0.5)
        self.au_mot(mots[1])
        fc = fleche_colonne(tab, c, r, BLEU_CALCUL)
        e2 = self.col(self.ligne([("2.", BLEU_CALCUL), ("la colonne " + MOMENTS[c].lower(), WHITE)], 38), y0 - 0.75)
        self.play(GrowArrow(fc), *teinter(tab, [(k, c) for k in range(3) if k != r], BLEU_PALE),
                  FadeIn(e2, shift=RIGHT * 0.2), Indicate(tab.tetes[c][1], color=AMBRE), run_time=0.5)
        self.au_mot(mots[2])
        res = self.col(self.ligne([(str(v), VERT_OK), (unite, WHITE)], 50), y0 - 1.75)
        nb = tab.texte_case(r, c)
        self.play(*allumer(tab, r, c), nb.animate.scale(1.8), FadeIn(res, scale=0.6), run_time=0.4)
        self.play(nb.animate.scale(1 / 1.8), Create(self.encadre(res)), run_time=0.4)
        return VGroup(fl, fc, e1, e2)

    # ── 04 : lire une case ──────────────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-lire")
        tab = self.tableau_pret()
        self.au_mot("la ligne 3, le soir")
        q = self.col(self.bloc(["Ligne 3,", "le soir ?"], 44, ORANGE_RETENUE), 2.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.lire(tab, 2, 2, ("3, la colonne", "la colonne du soir", "160."), 1.05)
        self.insister(tab.texte_case(2, 2), 1.5, 0.25)
        self.attendre_voix()

    # ── 05 : décider ────────────────────────────────────────────────────────

    def ecran_decider(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-decider")
        tab = self.tableau_pret()
        q = self.col(self.bloc(["Où faut-il", "un bus de plus ?"], 42, JAUNE_TITRE), 2.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Le plus grand nombre")
        self.play(LaggedStart(*[Indicate(tab.texte_case(r, c), color=BLEU_CALCUL, scale_factor=1.4)
                                for r in range(3) for c in range(3)], lag_ratio=0.1), run_time=1.2)
        self.au_mot("210.")
        res = self.col(self.ligne([("Le plus grand :", WHITE), ("210", VERT_OK)], 42), 0.9)
        self.play(*allumer(tab, 0, 2), FadeIn(res, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(tab.texte_case(0, 2), 1.7, 0.25)
        self.au_mot("Ligne 1, le soir")
        dec = self.col(self.ligne([("Ligne 1, le soir", COUL_BUS[0])], 44), -0.1)
        b2 = bus(0.6, COUL_BUS[0]).next_to(dec, DOWN, buff=0.35).align_to(dec, LEFT)
        plus = self.t("+", 60, VERT_OK).next_to(b2, RIGHT, buff=0.3)
        self.play(FadeIn(dec, shift=RIGHT * 0.2), Indicate(tab.libelles[0][1], color=AMBRE),
                  Indicate(tab.tetes[2][1], color=AMBRE), run_time=0.5)
        self.play(FadeIn(b2, shift=RIGHT * 0.5), FadeIn(plus, scale=0.5), run_time=0.5)
        self.attendre_voix()

    # ── 06 : le piège, ligne ou colonne ─────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        tab = self.tableau_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.6)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("confondre")
        sous = self.col(self.bloc(["confondre une ligne", "et une colonne"], 38, ORANGE_RETENUE), 1.65)
        self.play(FadeIn(sous, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Une ligne se lit")
        fl = fleche_ligne(tab, 1)
        l1 = self.col(VGroup(Arrow(LEFT * 0.5, RIGHT * 0.5, buff=0, color=AMBRE, stroke_width=7),
                             self.bloc(["une ligne :", "de gauche à droite"], 36)).arrange(RIGHT, buff=0.3), 0.25)
        self.play(GrowArrow(fl), *teinter_ligne(tab, 1), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.8)
        self.au_mot("Une colonne")
        fc = fleche_colonne(tab, 1, None, BLEU_CALCUL)
        l2 = self.col(VGroup(Arrow(UP * 0.5, DOWN * 0.5, buff=0, color=BLUE_C, stroke_width=7),
                             self.bloc(["une colonne :", "de haut en bas"], 36)).arrange(RIGHT, buff=0.3), -1.2)
        self.play(GrowArrow(fc), *teinter(tab, [(0, 1), (2, 1)], BLEU_PALE), FadeIn(l2, shift=RIGHT * 0.2),
                  run_time=0.8)
        self.attendre_voix()

    # ── 07 : défi, 07b : correction ─────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        tab = self.tableau_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.55)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("la ligne 2, le midi")
        q1 = self.col(self.bloc(["1. Ligne 2, le midi :", "combien de voyageurs ?"], 36), 1.45)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Et quelle ligne")
        q2 = self.col(self.bloc(["2. Le matin : quelle ligne", "a le moins de voyageurs ?"], 36), 0.0)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -1.25)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        tab = self.tableau_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.5)
        objets = self.lire(tab, 1, 1, ("Ligne 2", "le midi", "40 voyageurs"), 1.7)
        self.au_mot("Le matin")
        self.play(FadeOut(objets), *eteindre(tab), run_time=0.3)
        self.play(*teinter_colonne(tab, 0, BLEU_PALE), run_time=0.3)
        self.play(LaggedStart(*[Indicate(tab.texte_case(r, 0), color=BLEU_CALCUL, scale_factor=1.4) for r in range(3)],
                              lag_ratio=0.3), run_time=0.9)
        self.au_mot("95 :")
        petit = self.col(self.ligne([("Le matin, le plus petit :", WHITE), ("95", VERT_OK)], 36), -0.85)
        self.play(*allumer(tab, 1, 0), FadeIn(petit, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("c'est la ligne 2")
        l2 = self.col(self.ligne([("c'est la", WHITE), ("ligne 2", COUL_BUS[1])], 40), -1.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(tab.libelles[1][1], color=AMBRE, scale_factor=1.3),
                  run_time=0.5)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        tab = self.tableau_pret()
        lignes = self.finale([["Je lis le titre."], ["La bonne ligne,", "la bonne colonne."],
                              ["Je lis la case où", "elles se croisent."]])
        self.au_mot("Je lis le titre")
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), Indicate(tab.titre, color=AMBRE), run_time=0.5)
        self.play(Create(lignes[0][0]), run_time=0.3)
        self.au_mot("Je repère")
        fl, fc = fleche_ligne(tab, 2, 1), fleche_colonne(tab, 1, 2, BLEU_CALCUL)
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), GrowArrow(fl), run_time=0.5)
        self.play(GrowArrow(fc), Create(lignes[1][0]), run_time=0.5)
        self.au_mot("Je lis la case")
        self.play(FadeIn(lignes[2][1], shift=RIGHT * 0.2), *allumer(tab, 2, 1), run_time=0.5)
        self.play(Create(lignes[2][0]), run_time=0.3)
        self.insister(tab.texte_case(2, 1), 1.6, 0.25)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_titre()
        self.ecran_remplir()
        self.ecran_lire()
        self.ecran_decider()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
