# stats_ecart_interquartile.py
# EleveAI — Maths 2de — série « Statistiques », lycée, épisode 06 : L'ÉCART
# INTERQUARTILE (micro du coach : stat_ecart_interquartile, notion
# statistiques_descriptives), AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la
# paysage complète du niveau (méthode, piège, questions-pauses, défi corrigé).
#
# ⭐ Décor et métier : la PLUIE, Paris et Saint-Denis de La Réunion ; Noé,
# HYDROLOGUE, aide à dimensionner des réservoirs (problématique : juger la
# régularité d'une série). Centres (lib/videos/centres-interet.ts, 15-18 ans) :
# ["meteo-climat", "nature-ecologie"].
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : normales Météo-France
# 1991-2020 des hauteurs de précipitations mensuelles, citées par Wikipédia
# (tableaux « Statistiques 1991-2020 ») :
#   · Paris-Montsouris, fiche 75114001 (https://fr.wikipedia.org/wiki/Climat_de_Paris) :
#     47,6 · 41,8 · 45,2 · 45,8 · 69,0 · 51,3 · 59,4 · 58,0 · 44,7 · 55,2 · 54,3 · 62,0 (634,3 mm)
#   · Saint-Denis, Gillot-aéroport, fiche 97418110
#     (https://fr.wikipedia.org/wiki/Saint-Denis_(La_Réunion)) :
#     270,2 · 279,3 · 264,5 · 133,4 · 95,8 · 66,9 · 50,9 · 54,8 · 48,5 · 43,3 · 62,5 · 160,2 (1 530,3 mm)
#   Arrondies au millimètre (demi vers le haut) pour l'écran et la voix.
# Calculs (Python), convention du coach (Q1 au rang ⌈n/4⌉, Q3 au rang ⌈3n/4⌉) :
#   Paris rangé 42 45 45 46 48 51 54 55 58 59 62 69 : Q1 = 45, Q3 = 58, EIQ 13,
#     médiane 52,5, étendue 27 ;
#   Saint-Denis rangé 43 49 51 55 63 67 96 133 160 265 270 279 : Q1 = 51,
#     Q3 = 160, EIQ 109, médiane 81,5, étendue 236 ; janvier à 1 000 : EIQ 109,
#     étendue 957 ; 8 × 13 = 104 < 109.
# ⭐ Figures du coach (banque seconde statistiques-descriptives.bank.ts,
# eiq_donnes, eiq_boite, eiq_boite_qcm, eiq_deux_boites, eiq_liste) : la série
# rangée, la droite graduée (AxePoints) et `diagrammeBoites` (Boite).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Mapping micro → écrans : eiq_liste → 02, 03, 06 · eiq_donnes → 04 (question),
# 05 · eiq_boite / eiq_deux_boites → 07 · eiq_boite_qcm (étendue ≠ EIQ) → 08,
# 09 (question) · défi → 10.
# Écrans : 00 garde · 01 Noé · 02 Paris rangé · 03 les quartiles · 04 question 1
# · 05 l'écart interquartile · 06 Saint-Denis · 07 deux boîtes · 08 le piège ·
# 09 question 2 · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# Voix : manim/voix/2de-stats-ecart-interquartile.json (débit −10), WAV dans
# public/sons/2de-stats-ecart-interquartile/ ; calage :
# stats_ecart_interquartile_marques.json (même dossier).
# python -m manim render -qh --disable_caching manim/scripts/seconde/stats_ecart_interquartile.py StatsEcartInterquartileSeconde -o eleveai-maths-seconde-stats-ecart-interquartile --media_dir manim/scripts/seconde/media-stats-ecart-interquartile
# Sortie : manim/sorties/seconde/maths/statistiques/06-ecart-interquartile/eleveai-maths-seconde-stats-ecart-interquartile.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g2_commun import *  # noqa: E402,F401,F403

PARIS = [42, 45, 45, 46, 48, 51, 54, 55, 58, 59, 62, 69]            # rangés
REUNION = [43, 49, 51, 55, 63, 67, 96, 133, 160, 265, 270, 279]      # rangés
BLEU_P = "#60a5fa"
VERT_R = "#34d399"


def nuage(l=1.6):
    """Un nuage : trois bulles et une base."""
    c = "#94a3b8"
    g = VGroup(Circle(radius=0.3 * l, fill_color=c, fill_opacity=1, stroke_width=0).shift(LEFT * 0.35 * l),
               Circle(radius=0.4 * l, fill_color=c, fill_opacity=1, stroke_width=0).shift(UP * 0.15 * l),
               Circle(radius=0.28 * l, fill_color=c, fill_opacity=1, stroke_width=0).shift(RIGHT * 0.4 * l),
               RoundedRectangle(width=1.3 * l, height=0.4 * l, corner_radius=0.18 * l, fill_color=c,
                                fill_opacity=1, stroke_width=0).shift(DOWN * 0.12 * l))
    return g


def gouttes(centre, n=6, l=1.6):
    return VGroup(*[Line(UP * 0.12, DOWN * 0.12, color=BLEU_P, stroke_width=5).move_to(
        centre + P(-0.5 * l + k * l / (n - 1), -0.5 * l - (k % 2) * 0.25)) for k in range(n)])


class StatsEcartInterquartileSeconde(Paysage2de):
    nom_voix = "2de-stats-ecart-interquartile"
    fichier_marques = "stats_ecart_interquartile_marques.json"

    def rangee(self, valeurs, y=2.45, w=0.95, couleur=BLEU_P, fs=30):
        r = VGroup(*[puce(v, w=w, fs=fs, couleur=couleur) for v in valeurs]).arrange(RIGHT, buff=0.08)
        return r.move_to(P(-0.2, y))

    def rangs(self, r, fs=22):
        return VGroup(*[Text(str(k + 1), font_size=fs, color="#94a3b8").next_to(p, DOWN, buff=0.08)
                        for k, p in enumerate(r)])

    def marquer(self, p, couleur=AMBRE):
        return [p[0].animate.set_stroke(couleur, width=6).set_fill("#3b2a05"), Indicate(p[1], color=couleur)]

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'écart interquartile", self.identite, "verte")
        n = nuage().move_to(P(-1.6, 0.6))
        g = gouttes(n.get_center(), 6)
        q = self.t("Régulière ?", 50, BLEU_CALCUL).move_to(P(2.0, 0.4))
        self.au_mot("L'écart")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.au_mot("La pluie")
        self.play(FadeIn(n, shift=DOWN * 0.4), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 0.5) for d in g], lag_ratio=0.15), run_time=0.8)
        self.au_mot("régulière")
        self.play(FadeIn(q, shift=LEFT * 0.3), run_time=0.4)
        self.insister(q, 1.2, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Noé, hydrologue ────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        n = nuage(1.3).move_to(P(-3.6, 2.2))
        g = gouttes(n.get_center(), 5, 1.3)
        self.au_mot("Noé")
        nom = self.t("Noé", 50, JAUNE_TITRE).move_to(P(-3.6, 0.35))
        metier = self.t("hydrologue", 38, BLEU_CALCUL).next_to(nom, DOWN, buff=0.2).set_x(-3.6)
        self.play(FadeIn(n, shift=DOWN * 0.3), Write(nom), run_time=0.6)
        self.play(FadeIn(metier, shift=UP * 0.2), LaggedStart(*[FadeIn(d, shift=DOWN * 0.4) for d in g],
                                                                lag_ratio=0.15), run_time=0.7)
        self.au_mot("il étudie l'eau")
        role = self.bloc(["étudie l'eau,", "dimensionne les réservoirs"], 30, GRIS).next_to(metier, DOWN, buff=0.3)
        role.set_x(-3.6)
        self.play(FadeIn(role, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Paris")
        l1 = self.col(self.t("Paris", 46, BLEU_P), 2.5)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Saint-Denis")
        l2 = self.col(self.ligne([("Saint-Denis", VERT_R), ("(La Réunion)", GRIS)], 42), 1.65)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Météo-France")
        l3 = self.col(self.bloc(["Météo-France : la pluie moyenne", "de chaque mois"], 32, WHITE), 0.6)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("sur 30 ans")
        l4 = self.col(self.t("sur 30 ans (1991-2020)", 32, GRIS), -0.35)
        self.play(FadeIn(l4, shift=UP * 0.15), run_time=0.35)
        self.au_mot("Sa question")
        q = self.col(self.bloc(["Où la pluie est-elle", "la plus régulière ?"], 40, ORANGE_RETENUE), -1.6)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.insister(q, 1.06, 0.3)
        self.attendre_voix()

    # ── 02 : Paris, la série rangée ─────────────────────────────────────────

    def axe_paris(self, centre=P(-0.3, -1.5), longueur=10.0, hauteur_carte=None):
        return AxePoints(PARIS, 40, 70, 5, sous_pas=1, longueur=longueur, couleur=BLEU_P, fs=26,
                         rayon=0.12, centre=centre, hauteur_carte=hauteur_carte)

    def ecran_paris(self):
        self.clear()
        self.add_mascotte(scale=0.4)
        self.dire("02-paris")
        X = -6.0
        self.au_mot("Paris d'abord")
        tit = self.ligne([("Paris", BLEU_P), ("· pluie de chaque mois (mm)", WHITE)], 40)
        tit.move_to(P(0, 3.3)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), run_time=0.45)
        r = self.rangee(PARIS)
        ax = self.axe_paris()
        self.au_mot("Je range")
        sens = self.ligne([("du plus sec", GRIS), ("→", GRIS), ("au plus pluvieux", GRIS)], 30)
        sens.next_to(r, DOWN, buff=0.25)
        self.play(FadeIn(ax.fond), FadeIn(sens, shift=UP * 0.1), run_time=0.5)
        exts = [("42,", 1), ("45,", 1), ("45,", 2), ("46,", 1), ("48,", 1), ("51,", 1), ("54,", 1), ("55,", 1),
                ("58,", 1), ("59,", 1), ("62 et", 1), ("69.", 1)]
        for k, (e, n) in enumerate(exts):
            self.au_mot(e, n)
            self.play(FadeIn(r[k], shift=DOWN * 0.2), FadeIn(ax.ronds[k], scale=1.6), run_time=0.3)
        self.attendre_voix()

    # ── 03 : les quartiles Q1 et Q3 ─────────────────────────────────────────

    def ecran_quartiles(self):
        self.clear()
        self.add_mascotte(scale=0.4)
        self.dire("03-quartiles")
        r = self.rangee(PARIS)
        rg = self.rangs(r)
        ax = self.axe_paris(centre=P(-0.3, -2.3), longueur=9.0, hauteur_carte=2.3)
        self.add(r, ax)
        self.play(FadeIn(rg), run_time=0.4)
        X = -6.0
        for (cle, txt, calc, egal, rang, val, i, y, ext) in [
                ("Le premier", "Q1 :", "12 ÷ 4", "= 3", "→ 3e valeur :", "45", 2, 1.0,
                 ("12 divisé", "égale 3", "C'est la 3e", "45. Le")),
                ("Le troisième", "Q3 :", "3 × 12 ÷ 4", "= 9", "→ 9e valeur :", "58", 8, 0.05,
                 ("3 fois 12", "égale 9", "C'est la 9e", "58."))]:
            lg = self.ligne([(txt, AMBRE), (calc, WHITE), (egal, WHITE), (rang, GRIS), (val, AMBRE)], 40)
            lg.move_to(P(0, y)).align_to(P(X, 0), LEFT)
            self.au_mot(cle)
            self.play(FadeIn(lg[0], shift=RIGHT * 0.2), run_time=0.35)
            self.au_mot(ext[0])
            self.play(FadeIn(lg[1], shift=RIGHT * 0.2), run_time=0.35)
            self.au_mot(ext[1])
            self.play(FadeIn(lg[2], scale=1.3), run_time=0.3)
            self.au_mot(ext[2])
            self.play(FadeIn(lg[3], shift=RIGHT * 0.2), Indicate(rg[i], color=AMBRE, scale_factor=1.8), run_time=0.45)
            self.au_mot(ext[3])
            rep = ax.repere(PARIS[i], txt[:2], AMBRE)
            self.play(FadeIn(lg[4], scale=1.4), *self.marquer(r[i]), Create(rep), run_time=0.5)
        self.attendre_voix()

    # ── 04 : question 1 (l'écart interquartile de Paris) ────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        r = self.rangee(PARIS, y=-3.3, w=0.82, fs=26).set_x(-0.9)
        for i in (2, 8):
            r[i][0].set_stroke(AMBRE, width=6).set_fill("#3b2a05")
        q1 = Text("Q1", font_size=24, color=AMBRE).next_to(r[2], UP, buff=0.08)
        q3 = Text("Q3", font_size=24, color=AMBRE).next_to(r[8], UP, buff=0.08)
        self.add(r, q1, q3)

        def geste():
            return [Indicate(r[2], color=VERT_OK), Indicate(r[8], color=VERT_OK)]

        t0 = self.question("04-question", "04b-reponse",
                           ["Avec ces quartiles, que vaut", "l'écart interquartile de Paris ?"],
                           ["27", "13", "5,5"], 1,
                           [("Q3 − Q1 = 58 − 45 = 13", VERT_OK, "58 moins 45"),
                            ("27 : l'étendue (69 − 42)", ROUGE_CLAIR, "27, c'est"),
                            ("5,5 : Q3 − médiane", ROUGE_CLAIR, "et 5,5")], x0=-6.0, y0=3.0, geste=geste,
                           centre_rebours=P(0.75, 0.55))
        print(f"QUESTION 1 t = {mmss(t0)}", flush=True)

    # ── 05 : l'écart interquartile, la moitié centrale ──────────────────────

    def ecran_eiq(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.dire("05-eiq")
        X = -6.0
        ax = self.axe_paris(centre=P(-0.6, -0.7), longueur=10.0, hauteur_carte=2.5)
        self.add(ax)
        self.au_mot("L'écart interquartile")
        tit = self.t("L'écart interquartile", 46, JAUNE_TITRE).move_to(P(0, 3.2)).align_to(P(X, 0), LEFT)
        f = self.ligne([("= Q3 − Q1", AMBRE), ("= 58 − 45", WHITE), ("= 13 mm", VERT_OK)], 42)
        f.move_to(P(0, 2.35)).align_to(P(X, 0), LEFT)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Q3 moins Q1")
        self.play(FadeIn(f[0], shift=RIGHT * 0.2), Create(ax.repere(45, "Q1", AMBRE)),
                  Create(ax.repere(58, "Q3", AMBRE)), run_time=0.6)
        self.play(FadeIn(f[1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("la moitié centrale")
        haut = max(rd.get_top()[1] for rd in ax.ronds) + 0.15
        zone = Rectangle(width=ax.x(58)[0] - ax.x(45)[0], height=haut - ax.x(45)[1] + 0.1, fill_color=AMBRE,
                         fill_opacity=0.18, stroke_color=AMBRE, stroke_width=3)
        zone.move_to(P((ax.x(45)[0] + ax.x(58)[0]) / 2, (haut + ax.x(45)[1]) / 2))
        lab = self.t("la moitié centrale des mois", 32, AMBRE).next_to(ax.carte, DOWN, buff=0.2).set_x(zone.get_center()[0])
        self.play(FadeIn(zone), FadeIn(lab, shift=UP * 0.15), run_time=0.6)
        self.au_mot("13 millimètres")
        acc = ax.accolade(45, 58, "13 mm", VERT_OK, fs=30)
        self.play(FadeIn(f[2], scale=1.4), Create(acc[0]), FadeIn(acc[1]), run_time=0.5)
        self.insister(f[2], 1.25, 0.25)
        self.au_mot("très régulière")
        fin = self.t("La pluie y est très régulière.", 38, BLEU_P).move_to(P(0, -3.2)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(fin, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 06 : Saint-Denis ────────────────────────────────────────────────────

    def ecran_reunion(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.dire("06-reunion")
        X = -6.0
        self.au_mot("À Saint-Denis")
        tit = self.ligne([("Saint-Denis", VERT_R), ("· pluie de chaque mois (mm)", WHITE)], 40)
        tit.move_to(P(0, 3.3)).align_to(P(X, 0), LEFT)
        axr = AxePoints(REUNION, 0, 300, 50, sous_pas=10, longueur=10.6, couleur=VERT_R, fs=26, rayon=0.09,
                        centre=P(-0.55, -2.55))
        self.play(FadeIn(tit, shift=RIGHT * 0.2), FadeIn(axr.fond), run_time=0.45)
        r = self.rangee(REUNION, couleur=VERT_R)
        rg = self.rangs(r)
        exts = ["43,", "49,", "51,", "55,", "63,", "67,", "96,", "133,", "160,", "265,", "270 et", "279."]
        for k, e in enumerate(exts):
            self.au_mot(e)
            self.play(FadeIn(r[k], shift=DOWN * 0.2), FadeIn(axr.ronds[k], scale=1.6), run_time=0.28)
        self.play(FadeIn(rg), run_time=0.3)
        for (txt, i, ext, y) in [("Q1 = 51", 2, "Q1, la 3e", 1.3), ("Q3 = 160", 8, "Q3, la 9e", 0.62)]:
            self.au_mot(ext)
            lg = self.ligne([(txt.split(" = ")[0] + " :", AMBRE), (f"{i + 1}e valeur", GRIS), ("→", GRIS),
                             (txt.split(" = ")[1], AMBRE)], 42)
            lg.move_to(P(0, y)).align_to(P(X, 0), LEFT)
            self.play(FadeIn(lg[:3], shift=RIGHT * 0.2), Indicate(rg[i], color=AMBRE, scale_factor=1.8),
                      run_time=0.45)
            self.au_mot(txt.split(" = ")[1] + ".")
            self.play(FadeIn(lg[3], scale=1.4), *self.marquer(r[i]), Create(axr.repere(REUNION[i], txt[:2], AMBRE)),
                      run_time=0.4)
        self.au_mot("Écart interquartile")
        e = self.ligne([("Écart interquartile :", WHITE), ("160 − 51", WHITE), ("= 109 mm", VERT_OK)], 44)
        e.move_to(P(0, -0.3)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(e[:2], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("égale 109")
        self.play(FadeIn(e[2], scale=1.4), run_time=0.4)
        self.play(Create(self.encadrer(e, buff=0.12)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : deux boîtes sur un même axe ────────────────────────────────────

    def deux_boites(self):
        ax = AxePoints([], 0, 300, 50, sous_pas=10, longueur=10.6, couleur=BLEU_P, fs=26,
                       centre=P(-0.55, -2.35))
        bp = Boite(ax, 42, 45, 52.5, 58, 69, y=-1.0, h=0.7, couleur="#2563eb", fond="#bfdbfe")
        br = Boite(ax, 43, 51, 81.5, 160, 279, y=0.55, h=0.7, couleur="#059669", fond="#a7f3d0")
        np_ = self.t("Paris", 32, BLEU_P).next_to(bp, RIGHT, buff=0.3)
        nr = self.t("Saint-Denis", 32, VERT_R).next_to(br, RIGHT, buff=0.3)
        return ax, bp, br, np_, nr

    def ecran_boites(self):
        self.clear()
        self.add_mascotte(scale=0.4)
        self.dire("07-boites")
        X = -6.0
        ax, bp, br, np_, nr = self.deux_boites()
        self.au_mot("Les deux diagrammes")
        tit = self.t("Deux boîtes, un même axe (mm)", 44, JAUNE_TITRE).move_to(P(0, 3.25)).align_to(P(X, 0), LEFT)
        self.play(Write(tit), FadeIn(ax), run_time=0.6)
        self.play(FadeIn(bp), FadeIn(np_), run_time=0.5)
        self.play(FadeIn(br), FadeIn(nr), run_time=0.5)
        self.au_mot("La largeur de la boîte")
        d = self.ligne([("Largeur de la boîte", WHITE), ("= écart interquartile", AMBRE)], 38)
        d.move_to(P(0, 2.45)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(d, shift=RIGHT * 0.2), Indicate(bp.boite, color=AMBRE), Indicate(br.boite, color=AMBRE),
                  run_time=0.6)
        self.au_mot("13 pour Paris")
        a1 = self.t("13", 34, AMBRE).next_to(bp.boite, UP, buff=0.12)
        self.play(FadeIn(a1, scale=1.5), run_time=0.35)
        self.au_mot("109 pour")
        a2 = self.t("109", 34, AMBRE).next_to(br.boite, UP, buff=0.12)
        self.play(FadeIn(a2, scale=1.5), br.boite.animate.set_stroke(AMBRE, width=7), run_time=0.4)
        self.insister(a2, 1.4, 0.25)
        self.au_mot("l'été austral")
        l2 = self.ligne([("Été austral :", VERT_R), ("les grosses pluies", WHITE),
                         ("→ bien moins régulière", ORANGE_RETENUE)], 34)
        l2.move_to(P(0, 1.75)).align_to(P(X, 0), LEFT)
        if l2.get_right()[0] > DROITE:
            l2.scale_to_fit_width(DROITE - X).align_to(P(X, 0), LEFT)
        self.play(FadeIn(l2[:2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("bien moins régulière")
        self.play(FadeIn(l2[2], shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 08 : le piège (boîte ou moustaches) ─────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte(scale=0.4)
        self.dire("08-piege")
        X = -6.0
        ax, bp, br, np_, nr = self.deux_boites()
        self.add(ax, br, nr)
        self.au_mot("Le piège")
        tit = self.t("Le piège : boîte ou moustaches ?", 44, ROUGE_ERREUR).move_to(P(0, 3.25)).align_to(P(X, 0), LEFT)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("L'étendue va")
        fl = DoubleArrow(P(ax.x(43)[0], -0.4), P(ax.x(279)[0], -0.4), buff=0, color=ROUGE_CLAIR, stroke_width=6,
                         tip_length=0.2)
        self.play(GrowFromCenter(fl), Indicate(br.bouts, color=ROUGE_CLAIR), run_time=0.6)
        self.au_mot("279 moins 43")
        e = self.ligne([("Étendue :", ROUGE_CLAIR), ("279 − 43", WHITE), ("= 236", ROUGE_CLAIR)], 40)
        e.move_to(P(0, 1.55)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(e[:2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("égale 236")
        self.play(FadeIn(e[2], scale=1.3), run_time=0.35)
        self.au_mot("ne regarde que la boîte")
        b = self.ligne([("Écart interquartile :", AMBRE), ("160 − 51 = 109", WHITE)], 40)
        b.move_to(P(0, 2.3)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(b, shift=RIGHT * 0.2), br.boite.animate.set_stroke(AMBRE, width=8), run_time=0.5)
        self.insister(br.boite, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 : question 2 (un cyclone) ────────────────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        r = self.rangee(REUNION, y=-3.3, w=0.86, fs=26, couleur=VERT_R).set_x(-0.7)
        for i in (2, 8):
            r[i][0].set_stroke(AMBRE, width=6).set_fill("#3b2a05")
        q1 = Text("Q1", font_size=24, color=AMBRE).next_to(r[2], UP, buff=0.08)
        q3 = Text("Q3", font_size=24, color=AMBRE).next_to(r[8], UP, buff=0.08)
        self.add(r, q1, q3)

        def cyclone():
            self.au_mot("1 000 millimètres")
            neuf = puce("1 000", w=0.86, fs=24, couleur=ROUGE_ERREUR).move_to(r[11])
            self.play(r[10].animate.move_to(r[11]).set_opacity(0), r[11].animate.move_to(r[10]),
                      FadeIn(neuf, shift=DOWN * 0.3), run_time=0.7)
            self.play(Flash(neuf, color=ROUGE_ERREUR), run_time=0.4)

        def geste():
            return [Indicate(r[2], color=VERT_OK), Indicate(r[8], color=VERT_OK)]

        t0 = self.question("09-question", "09b-reponse",
                           ["Un cyclone : janvier reçoit 1 000 mm au lieu de 270.",
                            "Que devient l'écart interquartile de Saint-Denis ?"],
                           ["839", "957", "109"], 2,
                           [("Q1 et Q3 ne bougent pas : 109", VERT_OK, "Q1 et Q3"),
                            ("957 : la nouvelle étendue", ROUGE_CLAIR, "957, c'est"),
                            ("839 : ajoute la pluie en plus", ROUGE_CLAIR, "et 839")],
                           x0=-6.0, y0=3.0, fs_q=36, avant_choix=cyclone, geste=geste,
                           centre_rebours=P(0.75, 0.55))
        print(f"QUESTION 2 t = {mmss(t0)}", flush=True)

    # ── 10 : défi ───────────────────────────────────────────────────────────

    def rappel(self):
        g = VGroup(self.ligne([("Paris :", BLEU_P), ("EIQ = 13 mm", WHITE)], 36),
                   self.ligne([("Saint-Denis :", VERT_R), ("EIQ = 109 mm", WHITE)], 36))
        g.arrange(DOWN, aligned_edge=LEFT, buff=0.18).move_to(P(0, 2.2)).align_to(P(-6.0, 0), LEFT)
        return g

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-defi")
        X = -6.0
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer", 48, JAUNE_TITRE).move_to(P(0, 3.3)).align_to(P(X, 0), LEFT)
        rp = self.rappel()
        self.play(Write(tit), FadeIn(rp, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Noé écrit")
        bulle = self.bloc(["« À Saint-Denis, l'écart interquartile", "est plus de 8 fois celui de Paris. »"], 38)
        bulle.move_to(P(0, 0.2)).align_to(P(-5.6, 0), LEFT)
        fond = SurroundingRectangle(bulle, color=BLEU_CALCUL, buff=0.22, corner_radius=0.2, stroke_width=4)
        self.au_mot("À Saint-Denis, l'écart")
        self.play(Create(fond), FadeIn(bulle, shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("A-t-il raison")
        r = self.ligne([("Vrai", VERT_OK), ("ou", WHITE), ("faux ?", ROUGE_CLAIR)], 42)
        r.move_to(P(0, -1.5)).align_to(P(-5.6, 0), LEFT)
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.45)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(0, -2.5)).align_to(P(-5.6, 0), LEFT)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10b-correction")
        X = -6.0
        tit = self.t("Correction", 48, JAUNE_TITRE).move_to(P(0, 3.3)).align_to(P(X, 0), LEFT)
        rp = self.rappel()
        self.play(Write(tit), FadeIn(rp), run_time=0.5)
        self.au_mot("8 fois 13")
        c1 = self.ligne([("8 × 13", WHITE), ("= 104", BLEU_CALCUL)], 46).move_to(P(0, 0.6)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(c1[0], shift=RIGHT * 0.2), Indicate(rp[0][1], color=BLEU_CALCUL), run_time=0.45)
        self.au_mot("égale 104")
        self.play(FadeIn(c1[1], scale=1.3), run_time=0.35)
        self.au_mot("Et 109")
        c2 = self.ligne([("109", AMBRE), (">", WHITE), ("104", BLEU_CALCUL)], 54).move_to(P(0, -0.5))
        c2.align_to(P(X, 0), LEFT)
        self.play(FadeIn(c2, scale=1.3), Indicate(rp[1][1], color=AMBRE), run_time=0.5)
        self.au_mot("Noé a raison")
        ok = self.t("Noé a raison !", 46, VERT_OK).next_to(c2, RIGHT, buff=0.8)
        self.play(FadeIn(ok, shift=LEFT * 0.2), Create(self.encadrer(c2)), run_time=0.5)
        self.insister(ok, 1.12, 0.3)
        self.au_mot("il prévoit")
        r = self.bloc(["À Saint-Denis : de grands réservoirs,", "remplis l'été pour la saison sèche."], 34, GRIS)
        r.move_to(P(0, -2.0)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        self.dire("11-finale")
        self.XL = -5.6
        lignes = self.finale([("On range la série : Q1 au rang n ÷ 4,", "Q3 au rang 3n ÷ 4 (entier au-dessus)."),
                              ("Écart interquartile = Q3 − Q1 :", "la largeur de la boîte."),
                              ("Il mesure la dispersion de la moitié", "centrale ; une valeur extrême", "ne le change pas.")],
                             [1.85, 0.25, -1.55], fs=36)
        for lg, ext in zip(lignes, ["Pour les quartiles", "L'écart interquartile, c'est", "Il mesure"]):
            self.au_mot(ext)
            self.montrer_ligne(lg)
        self.au_mot("une valeur extrême")
        self.insister(lignes[2][1], 1.05, 0.3)
        self.attendre_voix(marge=1.0)
        self.XL = OutilsPaysage.XL

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_paris()
        self.ecran_quartiles()
        self.ecran_question1()
        self.ecran_eiq()
        self.ecran_reunion()
        self.ecran_boites()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")
