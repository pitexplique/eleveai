# stats_moyenne.py
# EleveAI — Maths 2de — série « Statistiques », lycée, épisode 02 : CALCULER
# UNE MOYENNE (micro du coach : stat_moyenne, notion statistiques_descriptives),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage complète du niveau :
# méthode, somme = moyenne × nombre, piège de l'ajout, retrait, défi).
#
# ⭐ Décor et métier : l'ESPACE ; Malik, INGÉNIEUR au centre spatial de
# Toulouse, prépare les sorties extravéhiculaires (problématique : planifier,
# retrouver une durée). Centres (lib/videos/centres-interet.ts, 15-18 ans) :
# ["espace", "sciences"].
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 :
#   · les 6 sorties de Thomas Pesquet : 13/01/2017 5 h 58 ; 24/03/2017 6 h 34
#     (en.wikipedia.org/wiki/Thomas_Pesquet, d'après la NASA et CBS) ;
#     16/06/2021 7 h 15 ; 20/06/2021 6 h 28 ; 25/06/2021 ; 12/09/2021 6 h 54
#     (fr.wikipedia.org/wiki/Thomas_Pesquet) ; total 39 h 54 min (les deux
#     pages, record européen), d'où la 3e sortie de 2021 : 6 h 45.
#     En minutes : 358, 394, 435, 388, 405, 414 → somme 2 394 = 39 h 54 ✓.
#   · record du monde : 9 h 06, Shenzhou 19, 17/12/2024 (Cai Xuzhe et Song
#     Lingdong), en.wikipedia.org/wiki/List_of_longest_spacewalks.
# Calculs (Python) : moyenne 2 394 ÷ 6 = 399 min = 6 h 39 ; 2017 : (358 + 394)
# ÷ 2 = 376 ; 390 × 4 = 1 560 ; ajout de 480 : 2 874 ÷ 7 ≈ 410,6 (piège
# (399 + 480) ÷ 2 = 439,5) ; retrait de 358 : 2 036 ÷ 5 = 407,2 (leurre
# 2 036 ÷ 6 ≈ 339,3) ; défi : 420 × 7 − 2 394 = 546 min = 9 h 06 = le record.
# ⭐ Figure du coach : `stat_graph` barres (moy_diagramme), canvas_stats.Barres.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit. Division : « ÷ ».
#
# Mapping micro → écrans (banque, stat_moyenne) : moy_entiere / moy_diagramme →
# 02, 03 · moy_arrondie → 07 · moy_total → 05, 06 (question) · moy_ajout → 07 ·
# moy_retrait → 08 (question) · moy_manquante → 09 défi, 10.
# Écrans : 00 garde · 01 Malik · 02 les sorties · 03 la moyenne · 04 question 1
# · 05 la clé · 06 question 2 · 07 le piège · 08 question 3 · 09 défi ·
# 10 correction · 11 ce que tu as appris · 12 fin.
#
# Voix : manim/voix/2de-stats-moyenne.json (débit −10), WAV dans
# public/sons/2de-stats-moyenne/ ; calage : stats_moyenne_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/seconde/stats_moyenne.py StatsMoyenneSeconde -o eleveai-maths-seconde-stats-moyenne --media_dir manim/scripts/seconde/media-stats-moyenne
# Sortie : manim/sorties/seconde/maths/statistiques/02-moyenne/eleveai-maths-seconde-stats-moyenne.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g1_commun import *  # noqa: E402,F401,F403

DUREES = [358, 394, 435, 388, 405, 414]
SORTIES = ["S1", "S2", "S3", "S4", "S5", "S6"]
ORANGE_BARRE = "#fdba74"
GRIS = "#cbd5e1"


def casque(r=0.75):
    """Un casque d'astronaute : coque blanche, visière dorée, reflet."""
    coque = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8", stroke_width=4)
    visiere = RoundedRectangle(width=1.25 * r, height=0.8 * r, corner_radius=0.3 * r, fill_color="#f59e0b",
                               fill_opacity=1, stroke_color="#b45309", stroke_width=3).shift(UP * 0.08 * r)
    reflet = Line(LEFT * 0.35 * r + UP * 0.25 * r, LEFT * 0.1 * r + UP * 0.33 * r, color=WHITE, stroke_width=5)
    col = RoundedRectangle(width=1.3 * r, height=0.3 * r, corner_radius=0.1 * r, fill_color="#e2e8f0",
                           fill_opacity=1, stroke_width=0).next_to(coque, DOWN, buff=-0.12 * r)
    return VGroup(col, coque, visiere, reflet)


def station(larg=2.4):
    """La station spatiale : un module et deux ailes de panneaux solaires."""
    module = RoundedRectangle(width=0.9, height=0.35, corner_radius=0.08, fill_color="#e2e8f0", fill_opacity=1,
                              stroke_width=0)
    poutre = Line(LEFT * larg / 2, RIGHT * larg / 2, color="#94a3b8", stroke_width=5)
    ailes = VGroup()
    for sx in (-1, 1):
        for dy in (0.35, -0.35):
            ailes.add(Rectangle(width=0.55, height=0.42, fill_color="#1d4ed8", fill_opacity=1, stroke_color="#93c5fd",
                                stroke_width=2).move_to(P(sx * (larg / 2 - 0.3), dy)))
    return VGroup(poutre, ailes, module)


class StatsMoyenneSeconde(Paysage2de):
    nom_voix = "2de-stats-moyenne"
    fichier_marques = "stats_moyenne_marques.json"

    def graphe(self, n=6, maxi=500, extra=None, centre=P(-2.95, -0.35), titre="Sorties de Thomas Pesquet"):
        cats, vals, coul = SORTIES[:n], DUREES[:n], [GRIS] * n
        if extra is not None:  # une 7e sortie (hypothétique), en orange
            cats, vals, coul = cats + ["S7"], vals + [extra], coul + [ORANGE_BARRE]
        return Barres(cats, vals, pas=100, sous_pas=50, maxi=maxi, largeur=4.8, hauteur=3.4, fs=28,
                      couleurs=coul, nom_axe="Minutes", titre=titre, centre=centre)

    def valeurs(self, g, fs=24):
        return VGroup(*[g.valeur(i, fs=fs) for i in range(g.n)])

    def ligne_moy(self, g, v, couleur=VERT_OK, debut=0, fin=None):
        fin = g.n - 1 if fin is None else fin
        y = g.y_axe(v)[1]
        return DashedLine(P(g.base(debut)[0] - 0.3, y), P(g.base(fin)[0] + 0.3, y), color=couleur, stroke_width=6,
                          dash_length=0.14)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer une moyenne", self.identite, "verte")
        c = casque(0.7).move_to(P(-1.6, 0.35))
        st = station(2.2).move_to(P(1.4, 0.5))
        self.au_mot("Calculer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.au_mot("Combien de temps")
        self.play(FadeIn(c, shift=UP * 0.4), FadeIn(st, shift=LEFT * 0.4), run_time=0.7)
        self.play(c.animate.shift(RIGHT * 0.4 + UP * 0.2).rotate(-0.2), run_time=1.0)
        self.attendre_voix(marge=0.8)

    # ── 01 : Malik, ingénieur ───────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        st = station(2.6).move_to(P(-3.6, 2.0))
        c = casque(0.55).move_to(P(-3.6, 0.55))
        self.au_mot("Malik")
        nom = self.t("Malik", 50, JAUNE_TITRE).move_to(P(-3.6, -0.75))
        metier = self.bloc(["ingénieur au centre", "spatial de Toulouse"], 34, BLEU_CALCUL).next_to(nom, DOWN, buff=0.2)
        metier.set_x(-3.6)
        self.play(FadeIn(c, shift=UP * 0.3), Write(nom), run_time=0.6)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Il prépare les sorties")
        self.play(FadeIn(st, shift=LEFT * 0.4), run_time=0.6)
        self.play(c.animate.move_to(st.get_center() + P(0.0, -0.75)).scale(0.7), run_time=0.8)
        l0a = self.col(self.t("Les sorties hors de la station", 32, "#cbd5e1"), 2.55)
        self.play(FadeIn(l0a, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("chaque minute")
        l0 = self.col(self.t("chaque minute se planifie", 32, "#cbd5e1"), 2.0)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Thomas Pesquet")
        l1 = self.col(self.t("Thomas Pesquet", 44, JAUNE_TITRE), 1.25)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("6 sorties")
        l2 = self.col(self.ligne([("6", BLEU_CALCUL), ("sorties dans l'espace", WHITE)], 38), 0.45)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("39 heures")
        l3 = self.col(self.ligne([("39 h 54 min", AMBRE), ("en tout", WHITE)], 38), -0.3)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Sa question")
        q = self.col(self.bloc(["Combien dure une sortie,", "en moyenne ?"], 38, ORANGE_RETENUE), -1.5)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.insister(q, 1.06, 0.3)
        self.attendre_voix()

    # ── 02 : les 6 sorties, en minutes ──────────────────────────────────────

    def ecran_donnees(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-donnees")
        g = self.graphe()
        vals = self.valeurs(g)
        self.play(FadeIn(g.fond, scale=0.95), run_time=0.5)
        self.au_mot("5 heures 58")
        l1 = self.col(self.ligne([("S1 :", WHITE), ("5 h 58 min", BLEU_CALCUL)], 42), 2.3)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Indicate(g.etiquettes[0], color=BLEU_CALCUL), run_time=0.45)
        self.au_mot("5 fois 60")
        l2 = self.col(self.ligne([("=", WHITE), ("5 × 60 + 58", WHITE)], 42), 1.4)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("358 minutes")
        l3 = self.col(self.ligne([("=", WHITE), ("358 min", AMBRE)], 46), 0.5)
        self.play(FadeIn(l3, scale=1.3), g.pousser(0, run_time=0.6), FadeIn(vals[0], scale=1.4), run_time=0.6)
        for i, ext in enumerate(["394,", "435,", "388,", "405,", "414 minutes"], start=1):
            self.au_mot(ext)
            self.play(g.pousser(i, run_time=0.45), FadeIn(vals[i], scale=1.4), run_time=0.45)
        l4 = self.col(self.t("1 h = 60 min", 34, "#cbd5e1"), -0.5)
        self.play(FadeIn(l4, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la moyenne ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-methode")
        g = self.graphe()
        vals = self.valeurs(g)
        self.add(g, vals)
        self.au_mot("La moyenne, c'est")
        tit = self.col(self.t("La moyenne", 48, JAUNE_TITRE), 2.5)
        d = self.col(self.ligne([("somme", WHITE), ("÷", WHITE), ("nombre de valeurs", WHITE)], 36), 1.75)
        self.play(Write(tit), run_time=0.45)
        self.play(FadeIn(d, shift=RIGHT * 0.2), run_time=0.45)
        termes = [str(v) for v in DUREES]
        h1 = self.ligne([(termes[0], WHITE), ("+", "#94a3b8"), (termes[1], WHITE), ("+", "#94a3b8"), (termes[2], WHITE)],
                        40, buff=0.15)
        h2 = self.ligne([("+", "#94a3b8"), (termes[3], WHITE), ("+", "#94a3b8"), (termes[4], WHITE), ("+", "#94a3b8"),
                         (termes[5], WHITE)], 40, buff=0.15)
        self.col(h1, 0.95)
        self.col(h2, 0.3)
        morceaux = [h1[0], VGroup(h1[1], h1[2]), VGroup(h1[3], h1[4]), VGroup(h2[0], h2[1]), VGroup(h2[2], h2[3]),
                    VGroup(h2[4], h2[5])]
        for k, ext in enumerate(["358 plus", "394 plus", "435 plus", "388 plus", "405 plus", "414, égale"]):
            self.au_mot(ext)
            self.play(FadeIn(morceaux[k], shift=UP * 0.15), Indicate(vals[k], color=AMBRE), run_time=0.3)
        self.au_mot("2 394 minutes")
        s = self.col(self.ligne([("=", WHITE), ("2 394 min", AMBRE)], 42), -0.4)
        self.play(FadeIn(s, scale=1.3), run_time=0.4)
        self.au_mot("Divisé par 6")
        m, m2 = self.ligne2([("2 394 ÷ 6", WHITE)], [("=", WHITE), ("399 min", VERT_OK)], -1.15, maxi=6.3)
        self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("399 minutes")
        lm = self.ligne_moy(g, 399)
        self.play(FadeIn(m2, scale=1.4), Create(lm), run_time=0.6)
        self.au_mot("6 heures et 39")
        hm = self.col(self.ligne([("soit", "#cbd5e1"), ("6 h 39 min", VERT_OK), ("par sortie", "#cbd5e1")], 36), -1.9)
        self.play(FadeIn(hm, shift=UP * 0.15), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(m, m2), buff=0.12)), run_time=0.4)
        self.au_mot("Sur la ligne")
        self.play(LaggedStart(*[Indicate(g.barres[i], color=VERT_OK, scale_factor=1.08) for i in range(6)],
                              lag_ratio=0.15), run_time=1.4)
        self.attendre_voix()

    # ── 04 : question 1 (la moyenne de deux valeurs) ────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        g = self.graphe()
        vals = self.valeurs(g)
        self.add(g, vals[:2])
        self.play(g.estomper([0, 1], opacite=0.25), run_time=0.3)

        def geste():
            return [Create(self.ligne_moy(g, 376, fin=1))]

        t0 = self.question("04-question", "04b-reponse", ["358 min et 394 min :",
                                                          "quelle est leur moyenne ?"],
                           ["752", "376", "36"], 1,
                           [("752 ÷ 2 = 376", VERT_OK, "752 divisé"),
                            ("752 : la somme seule", ROUGE_CLAIR, "752, c'est"),
                            ("36 : l'écart", ROUGE_CLAIR, "et 36")], geste=geste)
        print(f"QUESTION 1 t = {mmss(t0)}", flush=True)

    # ── 05 : la clé (somme = moyenne × nombre) ──────────────────────────────

    def ecran_cle(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-cle")
        g = self.graphe()
        vals = self.valeurs(g)
        lm = self.ligne_moy(g, 399)
        self.add(g, vals, lm)
        self.au_mot("Retourne la formule")
        tit = self.col(self.t("La clé", 48, JAUNE_TITRE), 2.5)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("la somme, c'est")
        d = self.col(self.ligne([("somme", AMBRE), ("=", WHITE), ("moyenne × nombre", WHITE)], 38), 1.7)
        if d.width > 5.2:
            d.scale_to_fit_width(5.2).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(d, shift=RIGHT * 0.2), run_time=0.45)
        self.insister(d, 1.08, 0.25)
        self.au_mot("399 fois 6")
        f, f2 = self.ligne2([("399 × 6", WHITE)], [("=", WHITE), ("2 394 min", AMBRE)], 0.75, fs=46)
        fantomes = VGroup(*[DashedVMobject(Rectangle(width=g.barres[i].width, height=g.y_axe(399)[1] - g.base(i)[1])
                                           .move_to(g.base(i), aligned_edge=DOWN), num_dashes=24).set_stroke(VERT_OK, 4)
                            for i in range(6)])
        self.play(FadeIn(f, shift=RIGHT * 0.2), FadeOut(vals), g.estomper([], opacite=0.35), Create(fantomes),
                  run_time=0.8)
        self.au_mot("égale 2 394")
        self.play(FadeIn(f2, scale=1.3), run_time=0.4)
        self.au_mot("On retrouve")
        r = self.col(self.ligne([("=", WHITE), ("39 h 54 min", AMBRE)], 44), -0.3)
        ok = self.coche().next_to(r, RIGHT, buff=0.3)
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.45)
        self.play(Create(ok), run_time=0.3)
        self.au_mot("dans l'espace")
        note = self.col(self.bloc(["6 sorties de 399 min", "= le même temps total"], 32, "#cbd5e1"), -1.5)
        self.play(FadeIn(note, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 06 : question 2 (somme = moyenne × nombre) ──────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        g = Barres(["1", "2", "3", "4"], [390] * 4, pas=100, sous_pas=50, maxi=500, largeur=4.0, hauteur=3.4, fs=28,
                   couleurs=["#c4b5fd"] * 4, nom_axe="Minutes", titre="Une astronaute : 4 sorties",
                   centre=P(-3.1, -0.35))
        self.add(g.fond)
        self.play(g.pousser(run_time=0.8), run_time=0.8)

        def geste():
            return [Create(self.ligne_moy(g, 390, couleur=VERT_OK)),
                    LaggedStart(*[Indicate(b, color=VERT_OK) for b in g.barres], lag_ratio=0.15)]

        t0 = self.question("06-question", "06b-reponse", ["4 sorties, 390 min en moyenne.",
                                                          "Combien de minutes en tout ?"],
                           ["97,5", "394", "1 560"], 2,
                           [("390 × 4 = 1 560", VERT_OK, "390 fois 4"),
                            ("97,5 = 390 ÷ 4", ROUGE_CLAIR, "97,5, c'est"),
                            ("394 = 390 + 4", ROUGE_CLAIR, "et 394")], geste=geste)
        print(f"QUESTION 2 t = {mmss(t0)}", flush=True)

    # ── 07 : le piège (ajouter une valeur) ──────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        g = self.graphe(extra=480, maxi=600)
        vals = self.valeurs(g)
        lm = self.ligne_moy(g, 399, fin=5)
        self.add(g.fond, *g.barres[:6], *vals[:6], lm)
        self.au_mot("Le piège")
        tit = self.col(self.t("Le piège", 48, ROUGE_ERREUR), 2.5)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Imagine une septième sortie")
        self.play(Indicate(g.etiquettes[6], color=ORANGE_RETENUE, scale_factor=1.6), run_time=0.5)
        self.au_mot("480 minutes")
        l1 = self.col(self.ligne([("+ 1 sortie :", WHITE), ("480 min", ORANGE_RETENUE)], 40), 1.7)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), g.pousser(6, run_time=0.6), FadeIn(vals[6], scale=1.4), run_time=0.6)
        self.au_mot("Faux")
        f, f2 = self.ligne2([("(399 + 480) ÷ 2", WHITE)], [("=", WHITE), ("439,5", ROUGE_ERREUR)], 0.9, fs=40)
        self.play(FadeIn(f, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 439,5")
        self.play(FadeIn(f2, scale=1.3), run_time=0.35)
        self.play(Create(croix(VGroup(f, f2), sw=6)), run_time=0.35)
        self.au_mot("Juste")
        j = self.col(self.ligne([("(2 394 + 480) ÷ 7", WHITE)], 40), 0.05)
        self.play(FadeIn(j, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 2 874")
        j2, j3 = self.ligne2([("=", WHITE), ("2 874 ÷ 7", WHITE)], [("≈", WHITE), ("410,6 min", VERT_OK)], -0.75,
                             fs=40, maxi=6.3)
        self.play(FadeIn(j2, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("environ 410,6")
        lm2 = self.ligne_moy(g, 410.6, fin=6)
        self.play(FadeIn(j3, scale=1.3), Transform(lm, lm2), run_time=0.6)
        self.play(Create(self.encadrer(VGroup(j2, j3), buff=0.12)), run_time=0.35)
        self.au_mot("une valeur sur 7")
        u = self.col(self.ligne([("480 :", ORANGE_RETENUE), ("1 valeur sur 7", WHITE)], 36), -1.7)
        self.play(FadeIn(u, shift=UP * 0.15), Indicate(g.barres[6], color=ORANGE_RETENUE), run_time=0.6)
        self.attendre_voix()

    # ── 08 : question 3 (retirer une valeur) ────────────────────────────────

    def ecran_question3(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        g = self.graphe()
        vals = self.valeurs(g)
        self.add(g, vals)

        def retirer():
            self.au_mot("358 minutes")
            x = croix(g.barres[0], sw=6)
            self.play(Create(x), run_time=0.4)
            self.play(g.barres[0].animate.set_opacity(0.15), vals[0].animate.set_opacity(0.3),
                      x.animate.set_opacity(0.5), run_time=0.4)

        def geste():
            return [Create(self.ligne_moy(g, 407.2, debut=1))]

        t0 = self.question("08-question", "08b-reponse", ["On retire 358 min :",
                                                          "moyenne des 5 autres ?"],
                           ["399", "407,2", "339,3"], 1,
                           [("2 394 − 358 = 2 036", VERT_OK, "2 394 moins"),
                            ("2 036 ÷ 5 = 407,2", VERT_OK, "divisé par 5"),
                            ("399 : oublie le retrait", ROUGE_CLAIR, "399 oublie"),
                            ("339,3 : divise par 6", ROUGE_CLAIR, "339,3")], avant_choix=retirer, geste=geste)
        print(f"QUESTION 3 t = {mmss(t0)}", flush=True)

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def trou(self, g, i, h=1.2):
        b = g.barres[i]
        r = Rectangle(width=b.width, height=h).move_to(b.get_bottom(), aligned_edge=DOWN)
        return VGroup(DashedVMobject(r, num_dashes=22).set_stroke(ORANGE_RETENUE, 4),
                      texte("?", 40, ORANGE_Q).move_to(r))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        g = self.graphe(extra=546, maxi=600)
        vals = self.valeurs(g)
        self.add(g.fond, *g.barres[:6], *vals[:6])
        tr = self.trou(g, 6)
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer", 48, JAUNE_TITRE), 2.5)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("une moyenne de 7 heures")
        l1 = self.col(self.ligne([("Objectif :", WHITE), ("moyenne 7 h", VERT_OK)], 40), 1.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("420 minutes")
        l1b = self.col(self.ligne([("=", WHITE), ("420 min", VERT_OK)], 40), 0.85)
        self.play(FadeIn(l1b, shift=RIGHT * 0.2), Create(self.ligne_moy(g, 420, couleur=VERT_OK)), run_time=0.5)
        self.au_mot("sur 7 sorties")
        l2 = self.col(self.ligne([("sur", WHITE), ("7", BLEU_CALCUL), ("sorties", WHITE)], 40), 0.1)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Create(tr[0]), FadeIn(tr[1], scale=1.5), run_time=0.5)
        self.au_mot("combien de temps")
        l3 = self.col(self.ligne([("7e sortie :", WHITE), ("?", ORANGE_RETENUE)], 44), -0.75)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(l3[1], 1.5, 0.25)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE), -1.7)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-correction")
        self.remove(*[m for m in self.mobjects if isinstance(m, MascotteMargouillat)])
        self.add_mascotte(scale=0.45)
        g = self.graphe(extra=546, maxi=600)
        vals = self.valeurs(g)
        tr = self.trou(g, 6)
        self.add(g.fond, *g.barres[:6], *vals[:6], tr)
        tit = self.col(self.t("Correction", 48, JAUNE_TITRE), 2.5)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("420 fois 7")
        l1, l1b = self.ligne2([("420 × 7", WHITE)], [("=", WHITE), ("2 940 min", AMBRE)], 1.65)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 2 940")
        self.play(FadeIn(l1b, scale=1.3), run_time=0.35)
        self.au_mot("déjà 2 394")
        l2 = self.col(self.ligne([("déjà :", WHITE), ("2 394 min", AMBRE)], 40), 0.9)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(VGroup(*vals[:6]), color=AMBRE), run_time=0.5)
        self.au_mot("2 940 moins")
        l3, l3b = self.ligne2([("2 940 − 2 394", WHITE)], [("=", WHITE), ("546 min", VERT_OK)], 0.15, fs=40, maxi=6.3)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 546")
        self.play(FadeIn(l3b, scale=1.3), FadeOut(tr), g.pousser(6, run_time=0.8), run_time=0.8)
        self.play(FadeIn(vals[6], scale=1.6), run_time=0.35)
        self.au_mot("9 heures et 6")
        l4 = self.col(self.ligne([("=", WHITE), ("9 h 06 min", VERT_OK)], 44), -0.6)
        self.play(FadeIn(l4, shift=UP * 0.2), Create(self.encadrer(l4, buff=0.12)), run_time=0.5)
        self.au_mot("le record du monde")
        rec = self.col(self.bloc(["Le record du monde :", "9 h 06 (décembre 2024)"], 30, ORANGE_RETENUE), -1.45)
        self.play(FadeIn(rec, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Un vrai défi")
        self.insister(rec, 1.06, 0.3)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        self.dire("11-finale")
        self.add(casque(0.34).move_to(P(5.6, 2.95)))
        self.XL = -4.9
        lignes = self.finale([("Moyenne =", "somme ÷ nombre de valeurs."),
                              ("Somme =", "moyenne × nombre de valeurs."),
                              ("Ajouter, retirer une valeur :", "je repasse par la somme."),
                              ("Jamais (ancienne moyenne + nouvelle", "valeur) ÷ 2 !")],
                             [2.1, 0.75, -0.6, -1.95], fs=36)
        for lg, ext in zip(lignes, ["La moyenne, c'est", "La somme, c'est", "Pour ajouter", "Et jamais"]):
            self.au_mot(ext)
            self.montrer_ligne(lg)
        self.insister(lignes[3][1], 1.05, 0.3)
        self.attendre_voix(marge=1.0)
        self.XL = OutilsPaysage.XL

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_cle()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")
