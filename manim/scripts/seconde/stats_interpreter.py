# stats_interpreter.py
# EleveAI — Maths 2de — série « Statistiques », lycée, épisode 09 : INTERPRÉTER
# DES INDICATEURS (micro du coach : stat_interpreter, notion
# statistiques_descriptives), AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la
# paysage complète du niveau (méthode, pièges, questions-pauses, défi corrigé).
#
# ⭐ Décor et métier : les SALAIRES et une vidéo virale ; Clara,
# DATA-JOURNALISTE, vérifie une affirmation vue sur un réseau social
# (problématique : juger une affirmation). Centres (lib/videos/centres-interet.ts,
# 15-18 ans) : ["argent-budget", "reseaux-sociaux"].
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : Insee Première n° 2020,
# « Les salaires dans le secteur privé en 2023 », paru le 23/10/2024
# (https://www.insee.fr/fr/statistiques/8270416) — salaires nets mensuels en
# équivalent temps plein (EQTP), secteur privé, France hors Mayotte :
#   moyenne 2 735 € ; médiane 2 183 € ; D1 1 512 € (« un sur dix gagne moins ») ;
#   D9 4 302 € (« un sur dix perçoit plus ») ; C99 10 222 € (« un salarié sur
#   cent gagne plus ») ; femmes : moyenne 2 508 €, médiane 2 069 € ; hommes :
#   moyenne 2 898 €, médiane 2 275 € ; « les femmes gagnent en moyenne 13,5 %
#   de moins que les hommes en EQTP ».
# Calculs (Python) : (2 898 − 2 508) / 2 898 = 13,46 % ≈ 13,5 % ; défi : Hugo
#   à 2 300 € : 2 183 < 2 300 < 2 735 (sous la moyenne, au-dessus de la médiane).
# ⭐ Figures du coach : la droite graduée (AxePoints) et `stat_graph` barres
# (canvas_stats.Barres) ; banque : interp_phrase_indicateur,
# interp_valeur_extreme, interp_remplacer_max, interp_comparer_moyennes,
# interp_niveau_regularite.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Mapping micro → écrans : interp_phrase_indicateur → 02, 03 (question) ·
# interp_valeur_extreme → 04 · interp_remplacer_max → 05 (question) ·
# interp_comparer_moyennes / niveau → 06, 07 (question) · défi (médiane ≠
# moyenne) → 08.
# Écrans : 00 garde · 01 Clara · 02 moyenne et médiane · 03 question 1 ·
# 04 pourquoi la moyenne est plus haute · 05 question 2 · 06 femmes et hommes ·
# 07 question 3 · 08 défi · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/2de-stats-interpreter.json (débit −10), WAV dans
# public/sons/2de-stats-interpreter/ ; calage : stats_interpreter_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/seconde/stats_interpreter.py StatsInterpreterSeconde -o eleveai-maths-seconde-stats-interpreter --media_dir manim/scripts/seconde/media-stats-interpreter
# Sortie : manim/sorties/seconde/maths/statistiques/09-interpreter/eleveai-maths-seconde-stats-interpreter.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g2_commun import *  # noqa: E402,F401,F403

ROSE = "#f472b6"
BLEU_H = "#60a5fa"


def personne(couleur=BLEU_CALCUL, h=0.7):
    tete = Circle(radius=0.16 * h, fill_color=couleur, fill_opacity=1, stroke_width=0).shift(UP * 0.3 * h)
    corps = RoundedRectangle(width=0.42 * h, height=0.42 * h, corner_radius=0.18 * h, fill_color=couleur,
                             fill_opacity=1, stroke_width=0).shift(DOWN * 0.08 * h)
    return VGroup(tete, corps)


def telephone(h=2.4):
    cadre = RoundedRectangle(width=0.52 * h, height=h, corner_radius=0.08 * h, stroke_color="#94a3b8", stroke_width=5,
                             fill_color="#0f172a", fill_opacity=1)
    ecran = RoundedRectangle(width=0.44 * h, height=0.82 * h, corner_radius=0.04 * h, fill_color="#1e293b",
                             fill_opacity=1, stroke_width=0)
    play = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.08 * h).rotate(-PI / 2)
    coeur = Text("98 k vues", font_size=int(8 * h), color=ROSE).move_to(ecran.get_bottom() + UP * 0.12 * h)
    return VGroup(cadre, ecran, play, coeur)


class StatsInterpreterSeconde(Paysage2de):
    nom_voix = "2de-stats-interpreter"
    fichier_marques = "stats_interpreter_marques.json"

    def foule(self, n=10, centre=P(-3.5, 0.0)):
        g = VGroup(*[personne(BLEU_CALCUL if k < n // 2 else AMBRE, 1.0) for k in range(n)])
        g.arrange(RIGHT, buff=0.08).move_to(centre)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Interpréter des indicateurs", self.identite, "verte")
        tel = telephone(2.0).move_to(P(-2.3, 0.4))
        q = self.bloc(["« Le salaire", "moyen » ?"], 46, BLEU_CALCUL).move_to(P(1.2, 0.45))
        self.au_mot("Interpréter")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.play(FadeIn(tel, shift=UP * 0.3), run_time=0.5)
        self.au_mot("le salaire moyen")
        self.play(FadeIn(q, shift=LEFT * 0.3), run_time=0.45)
        self.insister(q, 1.1, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Clara, data-journaliste ────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        tel = telephone(2.0).move_to(P(-4.8, 1.6))
        self.au_mot("Clara")
        nom = self.t("Clara", 50, JAUNE_TITRE).move_to(P(-1.9, 2.1))
        metier = self.t("data-journaliste", 34, BLEU_CALCUL).next_to(nom, DOWN, buff=0.2)
        self.play(FadeIn(tel, shift=UP * 0.3), Write(nom), run_time=0.6)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.45)
        self.au_mot("Sur un réseau social")
        self.play(Indicate(tel, color=ROSE, scale_factor=1.08), run_time=0.6)
        self.au_mot("En France")
        bulle = self.bloc(["« En France, on gagne 2 735 € par mois en moyenne,",
                           "donc la plupart des gens gagnent ça. »"], 34)
        bulle.scale_to_fit_width(min(bulle.width, 11.2)).move_to(P(0, -0.15))
        fond = SurroundingRectangle(bulle, color=ROSE, buff=0.22, corner_radius=0.2, stroke_width=4)
        self.play(Create(fond), FadeIn(bulle[0], shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("donc la plupart")
        self.play(FadeIn(bulle[1], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("Clara vérifie")
        src = self.bloc(["Source : Insee — secteur privé, 2023,", "salaires nets par mois, équivalent temps plein"],
                        30, GRIS)
        src.move_to(P(0, -1.95))
        self.play(FadeIn(src[0], shift=UP * 0.15), run_time=0.45)
        self.au_mot("en salaires nets")
        self.play(FadeIn(src[1], shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 02 : moyenne et médiane ─────────────────────────────────────────────

    def ecran_indicateurs(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.dire("02-indicateurs")
        f = self.foule(10, P(-3.6, -0.2))
        self.add(f)
        self.au_mot("Le salaire moyen")
        l1 = self.col(self.ligne([("Salaire moyen :", WHITE), ("2 735 €", AMBRE)], 42), 2.4)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("Le salaire médian")
        l2 = self.col(self.ligne([("Salaire médian :", WHITE), ("2 183 €", VERT_OK)], 42), 1.5)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("La médiane partage")
        coupe = DashedLine(P(f.get_center()[0], -1.2), P(f.get_center()[0], 0.85), color=VERT_OK, stroke_width=6)
        lc = Text("médiane", font_size=28, color=VERT_OK).next_to(coupe, UP, buff=0.1)
        self.play(Create(coupe), FadeIn(lc), run_time=0.6)
        self.au_mot("la moitié gagne moins")
        a = self.col(self.ligne([("la moitié :", BLEU_CALCUL), ("moins de 2 183 €", WHITE)], 38), 0.3)
        ga = VGroup(Text("moins de", font_size=24, color=BLEU_CALCUL), Text("2 183 €", font_size=24, color=BLEU_CALCUL))
        ga.arrange(DOWN, buff=0.06).next_to(f[:5], DOWN, buff=0.3)
        self.play(FadeIn(a, shift=RIGHT * 0.2), Indicate(f[:5], color=BLEU_CALCUL), FadeIn(ga), run_time=0.6)
        self.au_mot("l'autre moitié gagne plus")
        b = self.col(self.ligne([("l'autre moitié :", AMBRE), ("plus", WHITE)], 38), -0.55)
        gb = Text("plus", font_size=24, color=AMBRE).next_to(f[5:], DOWN, buff=0.3)
        self.play(FadeIn(b, shift=RIGHT * 0.2), Indicate(f[5:], color=AMBRE), FadeIn(gb), run_time=0.6)
        self.attendre_voix()

    # ── 03 : question 1 (le sens de la médiane) ─────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        t0 = self.question("03-question", "03b-reponse", ["Quelle phrase est juste ?"],
                           ["La plupart gagnent 2 735 €", "La moitié gagne exactement 2 183 €",
                            "La moitié gagne moins de 2 183 €"], 2,
                           [("C'est le sens de la médiane.", VERT_OK, "c'est le sens"),
                            ("2 735 € : la moyenne, pas « la plupart »", ROUGE_CLAIR, "la moyenne n'est pas"),
                            ("presque personne ne gagne exactement 2 183 €", ROUGE_CLAIR, "presque personne")],
                           x0=-5.5, y0=3.0, rangee=False, largeur=10.0)
        print(f"QUESTION 1 t = {mmss(t0)}", flush=True)

    # ── 04 : pourquoi la moyenne est plus haute ─────────────────────────────

    def axe_salaires(self, maxi=11000, centre=P(-0.4, -2.3), longueur=11.0, pas=2000, hauteur_carte=None):
        return AxePoints([], 0, maxi, pas, sous_pas=pas // 2, longueur=longueur, couleur=BLEU_CALCUL, fs=24,
                         centre=centre, hauteur_carte=hauteur_carte)

    def repere(self, ax, v, txt, couleur, h, fs=28):
        """Un trait pointillé de l'axe jusqu'à la hauteur h, et la valeur au-dessus."""
        base = ax.x(v)
        tr = DashedLine(P(base[0], base[1] + 0.05), P(base[0], h), color=couleur, stroke_width=4, dash_length=0.09)
        t = Text(txt, font_size=fs, color=couleur, weight=BOLD).next_to(tr, UP, buff=0.06)
        return VGroup(tr, t)

    def ecran_asymetrie(self):
        self.clear()
        self.add_mascotte(scale=0.4)
        self.dire("04-asymetrie")
        X = -6.0
        ax = self.axe_salaires(hauteur_carte=3.0, centre=P(-0.4, -1.6))
        self.au_mot("Pourquoi")
        tit = self.t("Pourquoi la moyenne est plus haute ?", 44, JAUNE_TITRE).move_to(P(0, 3.2)).align_to(P(X, 0), LEFT)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("Regarde l'axe")
        self.play(FadeIn(ax), run_time=0.5)
        yb = ax.x(0)[1]
        lignes = [("1 sur 10 :", "moins de 1 512 €", 1512, "1 512", BLEU_CALCUL, "moins de 1 512", 2.35, yb + 0.7),
                  ("1 sur 10 :", "plus de 4 302 €", 4302, "4 302", AMBRE, "plus de 4 302", 1.75, yb + 0.7),
                  ("1 sur 100 :", "plus de 10 222 €", 10222, "10 222", ROUGE_CLAIR, "plus de 10 222", 1.15, yb + 0.7)]
        for a, b, v, txt, c, ext, y, h in lignes:
            self.au_mot(ext)
            lg = self.ligne([(a, c), (b, WHITE)], 36).move_to(P(0, y)).align_to(P(X, 0), LEFT)
            r = self.repere(ax, v, txt, c, h)
            self.play(FadeIn(lg, shift=RIGHT * 0.2), Create(r[0]), FadeIn(r[1], scale=1.3), run_time=0.55)
        self.au_mot("tirent la moyenne")
        rmed = self.repere(ax, 2183, "médiane 2 183", VERT_OK, yb + 2.05, fs=26)
        rmoy = self.repere(ax, 2735, "moyenne 2 735", AMBRE, yb + 1.4, fs=26)
        rmed[1].next_to(rmed[0], RIGHT, buff=0.08).align_to(rmed[0], UP)
        rmoy[1].next_to(rmoy[0], RIGHT, buff=0.08).align_to(rmoy[0], UP)
        self.play(Create(rmed[0]), FadeIn(rmed[1]), run_time=0.45)
        dx = ax.x(2735)[0] - ax.x(2183)[0]
        rmoy.shift(LEFT * dx)
        self.play(FadeIn(rmoy), run_time=0.3)
        self.play(rmoy.animate.shift(RIGHT * dx), run_time=0.8)
        self.au_mot("ne regarde que le milieu")
        self.play(Indicate(rmed, color=VERT_OK, scale_factor=1.15), run_time=0.7)
        self.attendre_voix()

    # ── 05 : question 2 (si les plus hauts salaires doublaient) ─────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        t0 = self.question("05-question", "05b-reponse",
                           ["Si les plus hauts salaires doublaient,", "sans rien changer aux autres ?"],
                           ["La moyenne augmente, la médiane ne bouge pas", "Les deux augmentent",
                            "La médiane augmente, pas la moyenne"], 0,
                           [("La somme augmente : la moyenne aussi.", VERT_OK, "la somme des salaires"),
                            ("Le salarié du milieu gagne toujours autant :", VERT_OK, "le salarié du milieu"),
                            ("la médiane reste à 2 183 €.", VERT_OK, "la médiane reste")],
                           x0=-5.5, y0=3.0, rangee=False, largeur=10.0)
        print(f"QUESTION 2 t = {mmss(t0)}", flush=True)

    # ── 06 : femmes et hommes ───────────────────────────────────────────────

    def graphe_fh(self):
        return Barres(["F", "H", "F", "H"], [2508, 2898, 2069, 2275], pas=1000, sous_pas=500, maxi=3000, largeur=4.6,
                      hauteur=3.4, fs=28, couleurs=[ROSE, BLEU_H, ROSE, BLEU_H], nom_axe="€",
                      titre="moyenne       médiane", centre=P(-3.3, -0.4))

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.dire("06-comparer")
        g = self.graphe_fh()
        self.au_mot("Comparons")
        tit = self.col(self.ligne([("Femmes", ROSE), ("et", WHITE), ("hommes", BLEU_H)], 46), 2.6)
        self.play(Write(tit), FadeIn(g.fond, scale=0.95), run_time=0.6)
        self.au_mot("Salaire moyen")
        l1 = self.col(self.t("Salaire moyen :", 38), 1.7)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.35)
        vals = VGroup()
        for i, ext in [(0, "2 508 euros"), (1, "2 898")]:
            self.au_mot(ext)
            v = g.valeur(i, fs=24, color=WHITE)
            vals.add(v)
            self.play(GrowFromEdge(g.barres[i], DOWN), FadeIn(v, scale=1.3), run_time=0.45)
        l1b = self.col(self.ligne([("2 508 €", ROSE), ("/", WHITE), ("2 898 €", BLEU_H)], 38), 1.05)
        self.play(FadeIn(l1b, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("Salaire médian")
        l2 = self.col(self.t("Salaire médian :", 38), 0.2)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.35)
        for i, ext in [(2, "2 069"), (3, "2 275")]:
            self.au_mot(ext)
            v = g.valeur(i, fs=24, color=WHITE)
            vals.add(v)
            self.play(GrowFromEdge(g.barres[i], DOWN), FadeIn(v, scale=1.3), run_time=0.45)
        l2b = self.col(self.ligne([("2 069 €", ROSE), ("/", WHITE), ("2 275 €", BLEU_H)], 38), -0.45)
        self.play(FadeIn(l2b, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("dans le même sens")
        l3 = self.col(self.t("→ dans le même sens", 36, GRIS), -1.3)
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.4)
        self.au_mot("13,5 %")
        l4 = self.col(self.ligne([("femmes :", ROSE), ("− 13,5 % en moyenne", WHITE)], 38), -2.1)
        self.play(FadeIn(l4, scale=1.1), run_time=0.45)
        self.insister(l4[1], 1.1, 0.25)
        self.attendre_voix()

    # ── 07 : question 3 (quelle conclusion) ─────────────────────────────────

    def ecran_question3(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        t0 = self.question("07-question", "07b-reponse", ["Quelle conclusion est juste ?"],
                           ["Toutes les femmes gagnent moins que tous les hommes",
                            "Le niveau des femmes est plus bas, en moyenne et en médiane",
                            "On ne peut rien comparer"], 1,
                           [("La moyenne et la médiane sont plus basses ;", VERT_OK, "la moyenne et la médiane"),
                            ("un indicateur résume un groupe,", ROUGE_CLAIR, "un indicateur résume"),
                            ("pas chaque personne.", ROUGE_CLAIR, "il ne dit rien")],
                           x0=-5.5, y0=3.0, rangee=False, largeur=10.3)
        print(f"QUESTION 3 t = {mmss(t0)}", flush=True)

    # ── 08 : défi et correction ─────────────────────────────────────────────

    def rappel(self):
        g = VGroup(self.ligne([("moyenne :", AMBRE), ("2 735 €", WHITE)], 34),
                   self.ligne([("médiane :", VERT_OK), ("2 183 €", WHITE)], 34)).arrange(RIGHT, buff=0.8)
        return g.move_to(P(0, 2.25)).align_to(P(-6.0, 0), LEFT)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        X = -6.0
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer", 48, JAUNE_TITRE).move_to(P(0, 3.15)).align_to(P(X, 0), LEFT)
        rp = self.rappel()
        self.play(Write(tit), FadeIn(rp, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Hugo écrit")
        nom = self.t("Hugo :", 36, BLEU_H).move_to(P(0, 1.2)).align_to(P(-5.6, 0), LEFT)
        self.play(FadeIn(nom, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("Je gagne 2 300")
        bulle = self.bloc(["« Je gagne 2 300 €, moins que la moyenne :",
                           "je fais donc partie de la moitié la moins payée. »"], 32)
        bulle.next_to(nom, DOWN, buff=0.3).align_to(P(-5.4, 0), LEFT)
        fond = SurroundingRectangle(bulle, color=BLEU_H, buff=0.2, corner_radius=0.2, stroke_width=4)
        self.play(Create(fond), FadeIn(bulle[0], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("je fais donc partie")
        self.play(FadeIn(bulle[1], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("Vrai ou faux")
        r = self.ligne([("Vrai", VERT_OK), ("ou", WHITE), ("faux ?", ROUGE_CLAIR)], 42)
        r.move_to(P(0, -1.5)).align_to(P(-5.4, 0), LEFT)
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.45)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(0, -2.5)).align_to(P(-5.4, 0), LEFT)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.5)
        self.dire("08b-correction")
        X = -6.0
        tit = self.t("Correction", 48, JAUNE_TITRE).move_to(P(0, 3.15)).align_to(P(X, 0), LEFT)
        self.play(Write(tit), run_time=0.5)
        ax = AxePoints([], 1500, 3000, 500, sous_pas=100, longueur=10.5, couleur=BLEU_CALCUL, fs=26,
                       centre=P(-0.5, -2.2), hauteur_carte=2.2)
        self.add(ax)
        yb = ax.x(1500)[1]
        self.au_mot("La moitié la moins payée")
        l1 = self.ligne([("Moitié la moins payée :", BLEU_CALCUL), ("moins de 2 183 €", WHITE)], 38)
        l1.move_to(P(0, 2.2)).align_to(P(X, 0), LEFT)
        zone = Rectangle(width=ax.x(2183)[0] - ax.x(1500)[0], height=1.1, fill_color=BLEU_CALCUL, fill_opacity=0.22,
                         stroke_width=0).move_to(P((ax.x(1500)[0] + ax.x(2183)[0]) / 2, yb + 0.6))
        rmed = self.repere(ax, 2183, "médiane 2 183", VERT_OK, yb + 1.2, fs=26)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), FadeIn(zone), Create(rmed[0]), FadeIn(rmed[1]), run_time=0.6)
        self.au_mot("Or 2 300")
        hugo = personne(BLEU_H, 0.7).move_to(P(ax.x(2300)[0], yb + 0.45))
        th = Text("Hugo 2 300", font_size=26, color=BLEU_H, weight=BOLD).next_to(hugo, RIGHT, buff=0.1)
        c = self.ligne([("2 300", BLEU_H), (">", WHITE), ("2 183", VERT_OK)], 50).move_to(P(0, 1.25)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(hugo, shift=DOWN * 0.3), FadeIn(th), FadeIn(c, scale=1.2), run_time=0.6)
        self.au_mot("sous la moyenne")
        rmoy = self.repere(ax, 2735, "moyenne 2 735", AMBRE, yb + 1.2, fs=26)
        l2 = self.ligne([("sous la moyenne,", AMBRE), ("mais dans la moitié la mieux payée", WHITE)], 34)
        l2.move_to(P(0, 0.35)).align_to(P(X, 0), LEFT)
        if l2.get_right()[0] > DROITE:
            l2.scale_to_fit_width(DROITE - X).align_to(P(X, 0), LEFT)
        self.play(Create(rmoy[0]), FadeIn(rmoy[1]), FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("dans la moitié la mieux payée")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("c'est faux")
        fx = self.t("Faux !", 50, ROUGE_CLAIR).next_to(c, RIGHT, buff=1.0)
        self.play(FadeIn(fx, scale=1.4), run_time=0.45)
        self.au_mot("Clara publie")
        cp = self.t("Clara publie sa vérification.", 34, GRIS).move_to(P(0, -0.45)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(cp, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        self.dire("09-finale")
        self.XL = -5.6
        lignes = self.finale([("La moyenne utilise toutes les valeurs :", "les valeurs extrêmes la tirent vers elles."),
                              ("La médiane partage la série en deux moitiés,", "et bouge peu."),
                              ("Moyenne nettement au-dessus de la médiane :", "quelques très grandes valeurs."),
                              ("Un indicateur résume un groupe,", "pas chaque personne.")],
                             [2.05, 0.65, -0.75, -2.15], fs=34)
        for lg, ext in zip(lignes, ["La moyenne utilise", "La médiane partage", "Quand la moyenne", "Et un indicateur"]):
            self.au_mot(ext)
            self.montrer_ligne(lg)
        self.insister(lignes[3][1], 1.05, 0.3)
        self.attendre_voix(marge=1.0)
        self.XL = OutilsPaysage.XL

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_indicateurs()
        self.ecran_question1()
        self.ecran_asymetrie()
        self.ecran_question2()
        self.ecran_comparer()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
