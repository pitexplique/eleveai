# stats_linearite_moyenne.py
# EleveAI — Maths 2de — série « Statistiques », lycée, épisode 07 : LA
# LINÉARITÉ DE LA MOYENNE (micro du coach : stat_linearite_moyenne, notion
# statistiques_descriptives), AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la
# paysage complète du niveau (méthode, pièges, questions-pauses, défi corrigé).
#
# ⭐ Décor et métier : le CINÉMA ; Jade, PROGRAMMATRICE d'un cinéma, prépare
# les horaires d'un marathon Hunger Games (problématique : prévoir sans tout
# recalculer). Centres (lib/videos/centres-interet.ts, 15-18 ans) :
# ["cinema-series", "technologie-ia"].
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 :
#   · durées des 5 films Hunger Games (Box Office Mojo, « Running Time »,
#     https://www.boxofficemojo.com ; même liste au programme du marathon des
#     Cameo Cinemas, https://www.cameocinemas.com.au/events/the-hunger-games-marathon) :
#     Hunger Games 142 min (2 h 22), L'Embrasement 146, La Révolte 1re partie
#     123 (2 h 03), La Révolte 2e partie 137, La Ballade du serpent et de
#     l'oiseau chanteur 157 ;
#   · DVD européen (PAL) : 25 images/s au lieu de 24, le film dure 4 % de moins
#     (aide IMDb « why is the USA running time sometimes different… » : « a
#     100-minutes theatrical release will only be 96 minutes long ») → × 0,96.
#   Les 20 minutes de bandes-annonces sont un choix de Jade (un paramètre).
# Calculs (Python) : somme 705, moyenne 141 ; + 20 → 161 (somme 805 ÷ 5) ;
#   + 30 → 171 (piège 141 + 5 × 30 = 291) ; × 60 → 8 460 s ; × 0,96 → 135,36
#   (pièges 141,96 et 140,04) ; défi (141 + 20) × 60 = 9 660 s (piège
#   141 × 60 + 20 = 8 480).
# ⭐ Figure du coach : `stat_graph` barres (canvas_stats.Barres), la moyenne en
# pointillé ; banque : lin_ajout, lin_ajout_serie, lin_mult, lin_mult_qcm,
# lin_affine, lin_affine_qcm, lin_deux_etapes.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Mapping micro → écrans : lin_ajout / lin_ajout_serie → 03, 04, 05 (question)
# · lin_mult / lin_mult_qcm → 06, 07 (question) · lin_affine → 08 ·
# lin_deux_etapes (l'ordre) → 09 défi.
# Écrans : 00 garde · 01 Jade · 02 la moyenne · 03 + 20 min · 04 vérifier ·
# 05 question 1 · 06 × 60 · 07 question 2 · 08 la règle · 09 défi ·
# 09b correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/2de-stats-linearite-moyenne.json (débit −10), WAV dans
# public/sons/2de-stats-linearite-moyenne/ ; calage :
# stats_linearite_moyenne_marques.json (même dossier).
# python -m manim render -qh --disable_caching manim/scripts/seconde/stats_linearite_moyenne.py StatsLineariteMoyenneSeconde -o eleveai-maths-seconde-stats-linearite-moyenne --media_dir manim/scripts/seconde/media-stats-linearite-moyenne
# Sortie : manim/sorties/seconde/maths/statistiques/07-linearite-moyenne/eleveai-maths-seconde-stats-linearite-moyenne.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g2_commun import *  # noqa: E402,F401,F403

DUREES = [142, 146, 123, 137, 157]
CATS = ["1", "2", "3", "4", "5"]
ROSE = "#f472b6"


def chrono(r=0.9):
    c = Circle(radius=r, stroke_color=WHITE, stroke_width=6, fill_color="#1e293b", fill_opacity=1)
    bouton = RoundedRectangle(width=0.3 * r, height=0.2 * r, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                              stroke_width=0).next_to(c, UP, buff=0.02)
    traits = VGroup(*[Line(UP * 0.85 * r, UP * r, color=WHITE, stroke_width=4).rotate(-k * TAU / 12, about_point=ORIGIN)
                      for k in range(12)])
    aiguille = Line(ORIGIN, UP * 0.75 * r, color=ORANGE_RETENUE, stroke_width=6)
    return VGroup(c, bouton, traits.move_to(c), aiguille.shift(c.get_center()))


def disque(r=1.0):
    d = Circle(radius=r, stroke_color="#94a3b8", stroke_width=4, fill_color="#cbd5e1", fill_opacity=0.9)
    reflet = AnnularSector(inner_radius=0.45 * r, outer_radius=0.9 * r, angle=PI / 3, start_angle=PI / 6,
                           fill_color=VIOLET, fill_opacity=0.7, stroke_width=0)
    trou = Circle(radius=0.15 * r, fill_color=BLACK, fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
    return VGroup(d, reflet, trou)


class StatsLineariteMoyenneSeconde(Paysage2de):
    nom_voix = "2de-stats-linearite-moyenne"
    fichier_marques = "stats_linearite_moyenne_marques.json"

    def graphe(self, centre=P(-3.25, -0.35)):
        return Barres(CATS, DUREES, pas=50, sous_pas=10, maxi=200, largeur=4.6, hauteur=3.6, fs=28,
                      nom_axe="min", titre="Durée des 5 films", centre=centre)

    def ligne_moy(self, g, v, couleur=VERT_OK, txt=None):
        y = g.y_axe(v)[1]
        x0, x1 = g.ref_x.get_start()[0] - 0.05, g.ref_x.get_end()[0] + 0.05
        tr = DashedLine(P(x0, y), P(x1, y), color=couleur, stroke_width=6, dash_length=0.14)
        if txt is None:
            return tr
        t = Text(txt, font_size=28, color=couleur, weight=BOLD).next_to(tr, RIGHT, buff=0.12)
        return VGroup(tr, t)

    def bandes(self, g, minutes=20):
        """Les bandes-annonces : un bloc rose posé sur chaque barre."""
        h = g.y_axe(minutes)[1] - g.y_axe(0)[1]
        return VGroup(*[Rectangle(width=b.width, height=h, fill_color=ROSE, fill_opacity=0.95, stroke_color=NUIT,
                                  stroke_width=2).next_to(b, UP, buff=0) for b in g.barres])

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La linéarité de la moyenne", self.identite, "verte")
        b1 = bobine(0.7).move_to(P(-2.6, 0.45))
        b2 = bobine(0.5).move_to(P(-1.3, 0.75))
        q = self.bloc(["Tout", "recalculer ?"], 46, BLEU_CALCUL).move_to(P(1.6, 0.45))
        self.au_mot("La linéarité")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.play(FadeIn(b1, scale=0.6), FadeIn(b2, scale=0.6), run_time=0.5)
        self.play(Rotate(b1, -PI, run_time=1.0), Rotate(b2, PI, run_time=1.0))
        self.au_mot("tout recalculer")
        self.play(FadeIn(q, shift=LEFT * 0.3), run_time=0.45)
        self.insister(q, 1.12, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Jade, programmatrice de cinéma ─────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        b = bobine(0.85).move_to(P(-3.6, 2.0))
        self.au_mot("Jade")
        nom = self.t("Jade", 50, JAUNE_TITRE).move_to(P(-3.6, 0.5))
        metier = self.bloc(["programmatrice", "de cinéma"], 36, BLEU_CALCUL).next_to(nom, DOWN, buff=0.2).set_x(-3.6)
        self.play(FadeIn(b, scale=0.6), Write(nom), run_time=0.6)
        self.play(FadeIn(metier, shift=UP * 0.2), Rotate(b, -PI / 2), run_time=0.6)
        self.au_mot("elle choisit")
        role = self.bloc(["choisit les films,", "fixe les horaires"], 30, GRIS).next_to(metier, DOWN, buff=0.3)
        role.set_x(-3.6)
        self.play(FadeIn(role, shift=UP * 0.15), run_time=0.45)
        self.au_mot("un marathon")
        l1 = self.col(self.bloc(["Marathon", "Hunger Games"], 44, JAUNE_TITRE), 2.35)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("5 films")
        l2 = self.col(self.ligne([("5", BLEU_CALCUL), ("films", WHITE)], 42), 1.1)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.35)
        pu = VGroup(*[puce(v, w=1.0, fs=32, couleur=ROSE) for v in DUREES]).arrange(RIGHT, buff=0.1)
        self.col(pu, 0.0)
        for k, e in enumerate(["142,", "146,", "123,", "137 et", "157 minutes"]):
            self.au_mot(e)
            self.play(FadeIn(pu[k], shift=DOWN * 0.2), run_time=0.3)
        u = self.col(self.t("(en minutes)", 30, GRIS), -0.75)
        self.play(FadeIn(u), run_time=0.3)
        self.attendre_voix()

    # ── 02 : la durée moyenne d'un film ─────────────────────────────────────

    def ecran_moyenne(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.dire("02-moyenne")
        g = self.graphe()
        self.play(FadeIn(g.fond, scale=0.95), run_time=0.5)
        self.au_mot("La durée moyenne")
        tit = self.col(self.t("La durée moyenne", 46, JAUNE_TITRE), 2.6)
        self.play(Write(tit), g.pousser(run_time=1.0, lag=0.15), run_time=1.0)
        termes = []
        for k, v in enumerate(DUREES):
            termes.append((str(v), WHITE))
            if k < 4:
                termes.append(("+", "#94a3b8"))
        som = self.ligne(termes, 40, buff=0.12)
        self.col(som, 1.6)
        for k, e in enumerate(["142 plus", "146 plus", "123 plus", "137 plus", "157, égale"]):
            self.au_mot(e)
            an = [FadeIn(som[2 * k], shift=UP * 0.15), Indicate(g.barres[k], color=AMBRE)]
            if k < 4:
                an.append(FadeIn(som[2 * k + 1]))
            self.play(*an, run_time=0.3)
        self.au_mot("égale 705")
        r1 = self.col(self.ligne([("=", WHITE), ("705 min", AMBRE)], 42), 0.8)
        self.play(FadeIn(r1, scale=1.3), run_time=0.4)
        self.au_mot("705 divisé par 5")
        lg = self.col(avec_xbarre([("x̄", BLEU_CALCUL), ("=", BLEU_CALCUL), ("705 ÷ 5", WHITE),
                                   ("= 141 min", VERT_OK)], 46, buff=0.2), -0.4)
        g2, d2 = lg[:3], lg[3:]
        self.play(FadeIn(g2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("égale 141")
        lm = self.ligne_moy(g, 141, VERT_OK, "141")
        self.play(FadeIn(d2, scale=1.3), Create(lm[0]), FadeIn(lm[1]), run_time=0.6)
        self.play(Create(self.encadrer(VGroup(g2, d2))), run_time=0.4)
        self.attendre_voix()

    # ── 03 : + 20 minutes de bandes-annonces ────────────────────────────────

    def ecran_ajout(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.dire("03-ajout")
        g = self.graphe()
        lm = self.ligne_moy(g, 141, VERT_OK, "141")
        self.add(g, lm)
        self.au_mot("20 minutes de bandes-annonces")
        tit = self.col(self.ligne([("+ 20 min", ROSE), ("de bandes-annonces", WHITE)], 42), 2.6)
        bd = self.bandes(g)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), LaggedStart(*[GrowFromEdge(b, DOWN) for b in bd], lag_ratio=0.15),
                  run_time=1.0)
        self.au_mot("Chaque séance dure")
        l1 = self.col(self.t("Séance = film + 20 min", 38), 1.8)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("La durée moyenne d'une séance")
        l2 = self.col(self.ligne([("Moyenne des séances :", WHITE), ("?", ORANGE_RETENUE)], 38), 1.0)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Pas besoin")
        l3 = self.col(self.bloc(["+ 20 à chaque valeur", "→ + 20 à la moyenne"], 38, BLEU_CALCUL), -0.05)
        self.play(FadeIn(l3[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("on ajoute 20 à la moyenne")
        lm2 = self.ligne_moy(g, 161, ROSE, "161")
        self.play(FadeIn(l3[1], shift=RIGHT * 0.2), Create(lm2[0]), run_time=0.6)
        self.au_mot("141 plus 20")
        g4, d4 = self.ligne2([("141 + 20", WHITE)], [("= 161 min", ROSE)], -1.35, fs=46)
        self.play(FadeIn(g4, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 161")
        self.play(FadeIn(d4, scale=1.3), FadeIn(lm2[1]), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(g4, d4), ROSE)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : vérifier sur les 5 séances ─────────────────────────────────────

    def ecran_verif(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.dire("04-verif")
        g = self.graphe()
        bd = self.bandes(g)
        lm2 = self.ligne_moy(g, 161, ROSE, "161")
        self.add(g, bd, lm2)
        self.au_mot("Vérifions")
        tit = self.col(self.t("Vérifions", 46, JAUNE_TITRE), 2.6)
        self.play(Write(tit), run_time=0.45)
        se = [v + 20 for v in DUREES]
        pu = VGroup(*[puce(v, w=1.0, fs=32, couleur=ROSE) for v in se]).arrange(RIGHT, buff=0.1)
        self.col(pu, 1.6)
        for k, e in enumerate(["162,", "166,", "143,", "157 et", "177."]):
            self.au_mot(e)
            self.play(FadeIn(pu[k], shift=DOWN * 0.2), Indicate(bd[k], color=AMBRE), run_time=0.3)
        self.au_mot("Leur somme")
        s1 = self.col(self.ligne([("Somme :", WHITE), ("805", AMBRE)], 42), 0.6)
        self.play(FadeIn(s1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("805 divisé par 5")
        g2, d2 = self.ligne2([("805 ÷ 5", WHITE)], [("= 161", ROSE)], -0.4, fs=46)
        self.play(FadeIn(g2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 161")
        self.play(FadeIn(d2, scale=1.3), run_time=0.4)
        self.au_mot("C'est bien la même")
        ok = self.col(self.t("La même moyenne !", 42, VERT_OK), -1.4)
        self.play(FadeIn(ok, shift=UP * 0.2), Indicate(lm2, color=VERT_OK), run_time=0.5)
        self.insister(ok, 1.12, 0.25)
        self.attendre_voix()

    # ── 05 : question 1 (+ 30 minutes) ──────────────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        g = self.graphe()
        lm = self.ligne_moy(g, 141, VERT_OK, "141")
        self.add(g, lm)
        bd = self.bandes(g, 30)

        def geste():
            return [LaggedStart(*[GrowFromEdge(b, DOWN) for b in bd], lag_ratio=0.1),
                    lm.animate.shift(UP * (g.y_axe(30)[1] - g.y_axe(0)[1])).set_color(ROSE)]

        t0 = self.question("05-question", "05b-reponse",
                           ["Avec 30 min de", "bandes-annonces, la durée", "moyenne d'une séance ?"],
                           ["171", "291", "141"], 0,
                           [("141 + 30 = 171", VERT_OK, "141 plus 30"),
                            ("291 : ajoute 30 cinq fois", ROUGE_CLAIR, "291 ajoute"),
                            ("141 : oubli des 30 min", ROUGE_CLAIR, "et 141")], geste=geste)
        print(f"QUESTION 1 t = {mmss(t0)}", flush=True)

    # ── 06 : × 60 (en secondes) ─────────────────────────────────────────────

    def ecran_mult(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.dire("06-mult")
        ch = chrono(1.1).move_to(P(-3.5, 0.9))
        u = self.ligne([("1 min", WHITE), ("=", WHITE), ("60 s", AMBRE)], 44).next_to(ch, DOWN, buff=0.5)
        self.au_mot("Le projecteur")
        tit = self.col(self.t("En secondes", 46, JAUNE_TITRE), 2.6)
        self.play(Write(tit), FadeIn(ch, scale=0.7), run_time=0.6)
        self.play(Rotate(ch[3], -TAU, about_point=ch[0].get_center()), run_time=1.0)
        self.au_mot("multipliée par 60")
        l1 = self.col(self.t("Chaque durée × 60", 40), 1.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), FadeIn(u, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Alors la moyenne")
        l2 = self.col(self.t("→ la moyenne × 60", 40, BLEU_CALCUL), 0.75)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("141 fois 60")
        g3, d3 = self.ligne2([("141 × 60", WHITE)], [("= 8 460 s", VERT_OK)], -0.4, fs=48)
        self.play(FadeIn(g3, shift=RIGHT * 0.2), Rotate(ch[3], -TAU, about_point=ch[0].get_center()), run_time=0.6)
        self.au_mot("égale 8 460")
        self.play(FadeIn(d3, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(g3, d3))), run_time=0.4)
        self.attendre_voix()

    # ── 07 : question 2 (× 0,96, le DVD européen) ───────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        dv = disque(1.25).move_to(P(-3.5, 0.6))
        lab = self.ligne([("× 0,96", AMBRE)], 48).next_to(dv, DOWN, buff=0.45)
        self.add(dv)

        def montrer():
            self.au_mot("multipliée par 0,96")
            self.play(Rotate(dv, -TAU, run_time=1.0), FadeIn(lab, scale=1.3))

        t0 = self.question("07-question", "07b-reponse",
                           ["DVD européen :", "chaque durée × 0,96.", "La durée moyenne ?"],
                           ["141,96", "140,04", "135,36"], 2,
                           [("0,96 × 141 = 135,36 min", VERT_OK, "0,96 fois 141"),
                            ("141,96 : ajoute 0,96", ROUGE_CLAIR, "141,96 ajoute"),
                            ("140,04 : le retire", ROUGE_CLAIR, "et 140,04")],
                           x0=0.2, largeur=1.95, avant_choix=montrer)
        print(f"QUESTION 2 t = {mmss(t0)}", flush=True)

    # ── 08 : la règle ───────────────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte(scale=0.5)
        self.dire("08-regle")
        X = -5.6
        self.au_mot("La règle")
        tit = self.t("La règle", 50, JAUNE_TITRE).move_to(P(0, 3.0)).align_to(P(X, 0), LEFT)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("si chaque valeur")
        l1 = self.ligne([("Si chaque valeur", WHITE), ("x", BLEU_CALCUL), ("devient", WHITE), ("a·x + b,", AMBRE)], 48)
        l1.move_to(P(0, 1.6)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("alors la moyenne")
        l2 = avec_xbarre([("alors", WHITE), ("x̄", BLEU_CALCUL), ("devient", WHITE), ("a·", AMBRE), ("x̄", AMBRE),
                          ("+ b", AMBRE)], 48, buff=0.18)
        l2[4].shift(LEFT * 0.12)
        l2[5].shift(LEFT * 0.12)
        l2.move_to(P(0, 0.4)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(self.encadrer(VGroup(l1, l2), BLEU_CALCUL)), run_time=0.5)
        self.au_mot("On multiplie")
        l3 = self.ligne([("On multiplie,", BLEU_CALCUL), ("puis on ajoute.", ROSE)], 44)
        l3.move_to(P(0, -1.2)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(l3[0], shift=UP * 0.2), run_time=0.4)
        self.au_mot("puis on ajoute")
        self.play(FadeIn(l3[1], shift=UP * 0.2), run_time=0.4)
        self.insister(l3[0], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        X = -6.0
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer", 48, JAUNE_TITRE).move_to(P(0, 3.0)).align_to(P(X, 0), LEFT)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Jade veut")
        l1 = self.ligne([("Durée moyenne d'une séance,", WHITE), ("en secondes", AMBRE)], 40)
        l1.move_to(P(0, 1.9)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("chaque film")
        f = self.ligne([("( film", WHITE), ("+ 20 min", ROSE), (")", WHITE), ("× 60", AMBRE)], 52)
        f.move_to(P(0, 0.7)).align_to(P(-4.8, 0), LEFT)
        self.play(FadeIn(f[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("plus 20 minutes")
        self.play(FadeIn(f[1:3], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("le tout fois 60")
        self.play(FadeIn(f[3], scale=1.3), run_time=0.35)
        rap = avec_xbarre([("rappel :", GRIS), ("x̄", BLEU_CALCUL), ("= 141 min", BLEU_CALCUL)], 36)
        rap.move_to(P(0, -0.5)).align_to(P(-4.8, 0), LEFT)
        self.play(FadeIn(rap), run_time=0.3)
        self.au_mot("Combien")
        q = self.t("Combien ?", 44, ORANGE_RETENUE).move_to(P(0, -1.5)).align_to(P(-4.8, 0), LEFT)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(0, -2.5)).align_to(P(-4.8, 0), LEFT)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        X = -6.0
        tit = self.t("Correction", 48, JAUNE_TITRE).move_to(P(0, 3.0)).align_to(P(X, 0), LEFT)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("on ajoute d'abord")
        o = self.ligne([("1) on ajoute,", ROSE), ("2) on multiplie", AMBRE)], 40, buff=0.6).move_to(P(0, 2.0)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(o[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("puis on multiplie")
        self.play(FadeIn(o[1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("141 plus 20")
        c1 = self.ligne([("141 + 20", WHITE), ("= 161", ROSE)], 46).move_to(P(0, 0.95)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(c1[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 161")
        self.play(FadeIn(c1[1], scale=1.3), run_time=0.35)
        self.au_mot("161 fois 60")
        c2 = self.ligne([("161 × 60", WHITE), ("= 9 660 s", VERT_OK)], 50).move_to(P(0, -0.15)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(c2[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 9 660")
        self.play(FadeIn(c2[1], scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(c2)), run_time=0.4)
        self.au_mot("Attention à l'ordre")
        att = self.t("Attention à l'ordre !", 40, ORANGE_RETENUE).move_to(P(0, -1.35)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(att, shift=UP * 0.2), run_time=0.4)
        self.au_mot("141 fois 60, plus 20")
        fx = self.ligne([("141 × 60 + 20", WHITE), ("= 8 480", ROUGE_CLAIR)], 42).move_to(P(0, -2.35))
        fx.align_to(P(X, 0), LEFT)
        self.play(FadeIn(fx[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("donnerait 8 480")
        self.play(FadeIn(fx[1], scale=1.2), run_time=0.35)
        self.au_mot("c'est faux")
        self.play(Create(croix(fx, sw=6)), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        self.dire("10-finale")
        b = bobine(0.5).move_to(P(5.4, 1.6))
        self.add(b)
        self.XL = -5.6
        lignes = self.finale([("Ajouter b à chaque valeur", "ajoute b à la moyenne."),
                              ("Multiplier chaque valeur par a", "multiplie la moyenne par a."),
                              ("Si x devient a·x + b,", "la moyenne devient a × moyenne + b."),
                              ("L'ordre des opérations compte !",)],
                             [2.05, 0.65, -0.8, -2.05], fs=36)
        for lg, ext in zip(lignes, ["Ajouter b", "Multiplier chaque", "Si chaque x", "Et l'ordre"]):
            self.au_mot(ext)
            self.montrer_ligne(lg)
        self.insister(lignes[3][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)
        self.XL = OutilsPaysage.XL

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_moyenne()
        self.ecran_ajout()
        self.ecran_verif()
        self.ecran_question1()
        self.ecran_mult()
        self.ecran_question2()
        self.ecran_regle()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")
