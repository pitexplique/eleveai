# stats_probleme.py
# EleveAI — Maths 4e — série « Statistiques », cycle 4, épisode 10 : RÉSOUDRE UN
# PROBLÈME STATISTIQUE (micro du coach : stat_probleme, notion stat_statistique),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 4e
# (moyenne d'une série, valeurs au-dessus de la moyenne, nouvelle moyenne et
# nouvelle étendue après un ajout, moyenne pondérée lue sur un diagramme en
# bâtons, pour DÉCIDER). Short jumeau : stats_probleme_short.py (orange).
#
# ⭐ Décor et métier : l'ÉNERGIE SOLAIRE à La Réunion ; une TECHNICIENNE
# PHOTOVOLTAÏQUE installe des panneaux à Saint-Pierre (problématique : prévoir,
# décider si le toit suffit). Données VRAISEMBLABLES (un toit de 5 kWc produit
# à La Réunion de l'ordre de 20 kWh par jour en moyenne) :
#   · la semaine : 22, 18, 24, 12 (nuageux), 20, 23, 21 kWh → total 140,
#     moyenne 20 ; au-dessus de 20 : 4 jours ; pile 20 : vendredi ;
#   · un 8e jour d'orage, 4 kWh : (140 + 4) ÷ 8 = 18 ; étendue 24 − 12 = 12
#     devient 24 − 4 = 20 ; piège : ÷ 7, ou (20 + 4) ÷ 2 ;
#   · défi (genMoyennePonderee « graphe » du coach) : 12 kWh × 2 jours,
#     20 × 3, 25 × 5 → 209 ÷ 10 = 20,9 (le toit suffit) ; piège 57 ÷ 3 = 19.
# ⭐ Figures du coach (manim/canvas_stats.py) : `stat_graph` barres (jours) et
# bâtons (valeurs × effectifs).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit. Division : « ÷ ».
#
# Mapping micro → écrans (banque 4e, stat_probleme) : moyenne (fixe 12, 14, 10)
# → 03 · genAuDessusMoyenne / genEcartMoyenne → 04 · genNouvelleMoyenne +
# genNouvelleEtendue → 05-06 · genMoyennePonderee (graphe) → 07 défi / 07b.
# Écrans : 00 garde · 01 la technicienne · 02 la semaine · 03 la moyenne ·
# 04 au-dessus de la moyenne · 05 l'orage · 06 le piège · 07 défi · 07b
# correction · 08 ce que tu as appris · 09 fin (règle du 19/10).
#
# Voix : manim/voix/4e-stats-probleme.json (débit −10), WAV dans
# public/sons/4e-stats-probleme/ ; calage : manim/scripts/4e/stats_probleme_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/4e/stats_probleme.py StatsProbleme4e -o eleveai-maths-4e-stats-probleme --media_dir manim/scripts/4e/media-probleme
# Sortie : manim/sorties/4e/maths/statistiques/10-probleme/eleveai-maths-4e-stats-probleme.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lote_commun import *  # noqa: E402,F403

JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
PROD = [22, 18, 24, 12, 20, 23, 21]
SOL, NUAGE, ORAGE = "#fcd34d", "#cbd5e1", "#94a3b8"
DEFI_V, DEFI_E = [12, 20, 25], [2, 3, 5]


def soleil(r=0.45):
    """Un soleil : disque jaune et rayons."""
    d = Circle(radius=r, fill_color=SOL, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(np.array([np.cos(a), np.sin(a), 0]) * r * 1.3, np.array([np.cos(a), np.sin(a), 0]) * r * 1.75,
                           color=SOL, stroke_width=5) for a in np.linspace(0, TAU, 9)[:-1]])
    return VGroup(rayons, d)


def nuage(r=0.4, couleur=NUAGE):
    """Un nuage : trois disques et un socle."""
    g = VGroup(Circle(radius=r * 0.7).shift(LEFT * r * 0.7), Circle(radius=r).shift(UP * r * 0.25),
               Circle(radius=r * 0.75).shift(RIGHT * r * 0.75),
               RoundedRectangle(width=r * 2.9, height=r * 0.9, corner_radius=r * 0.4).shift(DOWN * r * 0.25))
    return g.set_fill(couleur, 1).set_stroke(width=0)


def eclair(h=0.5):
    return Polygon(P(0.05, h / 2), P(-0.15, -0.02), P(0.02, -0.02), P(-0.08, -h / 2), P(0.18, 0.08), P(0.0, 0.08),
                   fill_color=SOL, fill_opacity=1, stroke_width=0)


def maison(l=2.6):
    """Une maison et son toit couvert de panneaux solaires."""
    mur = Rectangle(width=l, height=l * 0.55, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
    toit = Polygon(P(-l * 0.62, l * 0.275), P(l * 0.62, l * 0.275), P(0, l * 0.75), fill_color="#7c2d12",
                   fill_opacity=1, stroke_width=0)
    porte = Rectangle(width=l * 0.18, height=l * 0.3, fill_color="#92400e", fill_opacity=1, stroke_width=0)
    porte.move_to(P(0, -l * 0.275 + l * 0.15))
    panneaux = VGroup()
    for k in range(3):
        for j in range(2):
            c = Polygon(P(0, 0), P(l * 0.16, 0), P(l * 0.16 + l * 0.07, l * 0.11), P(l * 0.07, l * 0.11),
                        fill_color="#1d4ed8", fill_opacity=1, stroke_color="#93c5fd", stroke_width=1.5)
            panneaux.add(c.move_to(P(-l * 0.38 + k * l * 0.19 + j * l * 0.07, l * 0.36 + j * l * 0.13)))
    return VGroup(mur, toit, panneaux, porte)


class StatsProbleme4e(Paysage4e):
    nom_voix = "4e-stats-probleme"
    fichier_marques = "stats_probleme_marques.json"

    def graphe(self, n=7, valeurs=None, centre=P(-3.2, -0.3), largeur=5.8):
        cats = (JOURS + ["Lun"])[:n]
        vals = valeurs or (PROD + [4])[:n]
        coul = [NUAGE if v < 15 else SOL for v in vals]
        return Barres(cats, vals, pas=5, maxi=30, couleurs=coul, nom_axe="kWh", titre="Production du toit",
                      largeur=largeur, hauteur=3.6, fs=26, centre=centre)

    def graphe_plein(self, n=7):
        g = self.graphe(n)
        vals = VGroup(*[g.valeur(i, fs=28) for i in range(n)])
        self.add(g, vals)
        return g, vals

    def ligne_moy(self, g, v, couleur=VERT_OK):
        y = g.y_axe(v)
        return DashedLine(y, P(g.barres[-1].get_right()[0] + 0.15, y[1]), color=couleur, stroke_width=6,
                          dash_length=0.15)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Résoudre un problème statistique", self.identite, "verte")
        m = maison(2.2).move_to(P(-1.2, 0.0))
        s = soleil(0.4).move_to(P(1.4, 1.0))
        self.au_mot("Résoudre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Le toit solaire")
        self.play(FadeIn(m, shift=UP * 0.3), GrowFromCenter(s), run_time=0.6)
        self.play(Rotate(s[0], PI / 8), run_time=0.4)
        self.au_mot("suffira")
        q = self.t("?", 90, ORANGE_RETENUE).move_to(P(2.6, 0.0))
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la technicienne ────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        m = maison(2.8).move_to(P(-3.7, 0.6))
        s = soleil(0.42).move_to(P(-1.4, 2.6))
        self.au_mot("Une technicienne")
        metier = self.bloc(["Technicienne", "solaire"], 44, BLEU_CALCUL).move_to(P(-3.7, -1.7))
        for x in metier:
            x.set_x(-3.7)
        self.play(FadeIn(m, shift=UP * 0.3), GrowFromCenter(s), FadeIn(metier, shift=UP * 0.2), run_time=0.7)
        self.au_mot("à Saint-Pierre")
        lieu = self.col(self.t("Saint-Pierre, La Réunion", 38, JAUNE_TITRE), 2.4)
        self.play(FadeIn(lieu, shift=RIGHT * 0.2), Indicate(m[2], color=SOL), run_time=0.6)
        self.au_mot("20 kilowattheures")
        c = self.col(VGroup(self.t("La famille consomme", 38),
                            self.ligne([("20", AMBRE), ("kWh par jour", WHITE)], 44)).arrange(DOWN, aligned_edge=LEFT,
                                                                                            buff=0.15), 1.0)
        self.play(FadeIn(c[0], shift=RIGHT * 0.2), FadeIn(c[1][0], scale=1.6), FadeIn(c[1][1]), run_time=0.5)
        self.au_mot("assez d'électricité")
        q = self.col(self.bloc(["Le toit produira-t-il", "assez ?"], 42, ORANGE_RETENUE), -0.65)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.insister(q, 1.08, 0.3)
        self.attendre_voix()

    # ── 02 : la semaine ─────────────────────────────────────────────────────

    def ecran_semaine(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-semaine")
        g = self.graphe()
        self.au_mot("Elle relève")
        tit = self.col(self.bloc(["Une semaine", "de production"], 44, JAUNE_TITRE), 2.3)
        self.play(FadeIn(g.fond), FadeIn(tit, shift=RIGHT * 0.2), run_time=0.5)
        mots = ["Lundi : 22", "Mardi : 18", "Mercredi : 24", "nuageux : 12", "Vendredi : 20", "Samedi : 23",
                "Dimanche : 21"]
        icones = VGroup()
        for i, mot in enumerate(mots):
            if i == 3:
                self.au_mot("Jeudi")
                n = nuage(0.28).next_to(g.etiquettes[3], UP, buff=0.12).shift(UP * 0.1)
                self.play(Indicate(g.etiquettes[3], color=AMBRE), run_time=0.3)
            self.au_mot(mot)
            v = g.valeur(i, fs=28)
            ic = (nuage(0.26) if i == 3 else soleil(0.17)).next_to(v, UP, buff=0.15)
            icones.add(ic)
            self.play(g.pousser(i, run_time=0.3), FadeIn(v, scale=1.6, run_time=0.3), FadeIn(ic, run_time=0.3),
                      run_time=0.3)
        kwh = self.col(self.ligne([("en", WHITE), ("kWh", AMBRE), ("(kilowattheures)", WHITE)], 34), 1.0)
        self.play(FadeIn(kwh, shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la moyenne ─────────────────────────────────────────────────────

    def ecran_moyenne(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-moyenne")
        g, vals = self.graphe_plein()
        self.au_mot("La moyenne")
        tit = self.col(self.t("La moyenne", 48, VERT_OK), 2.5)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("j'additionne les 7 jours")
        self.play(LaggedStart(*[Indicate(v, color=AMBRE, scale_factor=1.4) for v in vals], lag_ratio=0.15),
                  run_time=1.2)
        self.au_mot("ça fait 140")
        tot = self.col(self.ligne([("Total :", WHITE), ("140", AMBRE)], 46), 1.5)
        self.play(FadeIn(tot, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("140 divisé par 7")
        c = self.col(self.ligne([("140", AMBRE), ("÷", WHITE), ("7", WHITE)], 52), 0.5)
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 20")
        r = self.ligne([("=", WHITE), ("20", VERT_OK)], 52).next_to(c, RIGHT, buff=0.2)
        lm = self.ligne_moy(g, 20)
        self.play(FadeIn(r, scale=1.4), Create(lm), run_time=0.6)
        self.insister(r[1], 1.4, 0.3)
        self.au_mot("juste ce que consomme")
        eg = self.col(self.bloc(["= ce que consomme", "la famille"], 38, VERT_OK), -0.75)
        self.play(FadeIn(eg, shift=UP * 0.2), Indicate(lm, color=VERT_OK), run_time=0.6)
        self.attendre_voix()

    # ── 04 : au-dessus de la moyenne ────────────────────────────────────────

    def ecran_dessus(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-dessus")
        g, vals = self.graphe_plein()
        lm = self.ligne_moy(g, 20)
        self.add(lm)
        self.au_mot("Combien de jours")
        q = self.col(self.bloc(["Combien de jours", "au-dessus de 20 ?"], 42), 2.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Je compare")
        self.play(Indicate(lm, color=VERT_OK), run_time=0.6)
        dessus = [0, 2, 5, 6]
        self.au_mot("Lundi, mercredi")
        self.play(*[g.allumer(i, couleur=VERT_OK) for i in dessus], run_time=0.6)
        self.au_mot("4 jours au-dessus")
        r = self.col(self.ligne([("4", VERT_OK), ("jours au-dessus", WHITE)], 44), 1.0)
        self.play(FadeIn(r, scale=0.8), run_time=0.4)
        self.insister(r[0], 1.6, 0.3)
        self.au_mot("Mardi et jeudi")
        self.play(*[g.allumer(i, couleur=ORANGE_RETENUE) for i in (1, 3)], run_time=0.5)
        r2 = self.col(self.ligne([("2", ORANGE_RETENUE), ("jours en dessous", WHITE)], 40), 0.0)
        self.play(FadeIn(r2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("pile 20")
        self.play(g.allumer(4, couleur=AMBRE), Indicate(vals[4], color=AMBRE, scale_factor=1.5), run_time=0.5)
        r3 = self.col(self.ligne([("1", AMBRE), ("jour pile à 20", WHITE)], 40), -0.95)
        self.play(FadeIn(r3, shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 05 : l'orage (nouvelle moyenne, nouvelle étendue) ───────────────────

    def ecran_orage(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-orage")
        g = self.graphe(8)
        vals = VGroup(*[g.valeur(i, fs=26) for i in range(8)])
        self.add(g.fond, *g.barres[:7], *vals[:7])
        lm = self.ligne_moy(g, 20)
        self.add(lm)
        self.au_mot("un orage")
        orage = VGroup(nuage(0.3, ORAGE), eclair(0.4).shift(DOWN * 0.35)).next_to(g.etiquettes[7], UP, buff=1.0)
        self.play(FadeIn(orage, shift=DOWN * 0.3), run_time=0.5)
        self.au_mot("seulement 4")
        self.play(g.pousser(7, run_time=0.4), FadeIn(vals[7], scale=1.8), run_time=0.4)
        self.au_mot("8 jours")
        h = self.col(self.ligne([("8", AMBRE), ("jours", WHITE)], 42), 2.5)
        self.play(FadeIn(h, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("140 plus 4")
        s = self.col(self.ligne([("140", WHITE), ("+", WHITE), ("4", ORANGE_RETENUE)], 46), 1.65)
        self.play(FadeIn(s, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 144")
        s2 = self.ligne([("=", WHITE), ("144", AMBRE)], 46).next_to(s, RIGHT, buff=0.2)
        self.play(FadeIn(s2, scale=1.3), run_time=0.3)
        self.au_mot("144 divisé par 8")
        d = self.col(self.ligne([("144", AMBRE), ("÷", WHITE), ("8", AMBRE)], 50), 0.8)
        self.play(FadeIn(d, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 18")
        d2 = self.ligne([("=", WHITE), ("18", ORANGE_RETENUE)], 50).next_to(d, RIGHT, buff=0.2)
        lm2 = self.ligne_moy(g, 18, ORANGE_RETENUE)
        self.play(FadeIn(d2, scale=1.4), Transform(lm, lm2), run_time=0.7)
        self.insister(d2[1], 1.4, 0.3)
        self.au_mot("sous 20")
        sous = self.col(self.t("moyenne sous 20 !", 38, ORANGE_RETENUE), 0.0)
        self.play(FadeIn(sous, shift=UP * 0.2), run_time=0.4)
        self.au_mot("L'étendue")
        et = self.col(self.t("Étendue :", 38, BLEU_CALCUL), -0.85)
        self.play(FadeIn(et, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("24 moins 4")
        e1 = self.ligne([("24", WHITE), ("−", WHITE), ("4", ORANGE_RETENUE)], 42).next_to(et, RIGHT, buff=0.2)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), Indicate(vals[2], color=BLEU_CALCUL), Indicate(vals[7]),
                  run_time=0.4)
        self.au_mot("égale 20")
        e2 = self.ligne([("=", WHITE), ("20", BLEU_CALCUL)], 42).next_to(e1, RIGHT, buff=0.15)
        if e2.get_right()[0] > 6.6:
            VGroup(et, e1, e2).scale_to_fit_width(5.6).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(e2, scale=1.3), run_time=0.3)
        self.au_mot("au lieu de 12")
        avant = self.col(self.ligne([("au lieu de", WHITE), ("12", WHITE)], 36), -1.7)
        self.play(FadeIn(avant, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        g = self.graphe(8)
        vals = VGroup(*[g.valeur(i, fs=26) for i in range(8)])
        self.add(g, vals)
        self.au_mot("Le piège")
        tit = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.5)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("diviser encore par 7")
        f1 = self.col(self.ligne([("144", WHITE), ("÷", WHITE), ("7", ROUGE_ERREUR)], 46), 1.5)
        self.play(FadeIn(f1, shift=RIGHT * 0.2), run_time=0.4)
        self.play(Create(croix(f1, sw=6)), run_time=0.3)
        self.au_mot("la moyenne de 20 et de 4")
        f2 = self.col(self.ligne([("(20 + 4)", WHITE), ("÷", WHITE), ("2", ROUGE_ERREUR)], 46), 0.5)
        self.play(FadeIn(f2, shift=RIGHT * 0.2), run_time=0.4)
        self.play(Create(croix(f2, sw=6)), run_time=0.3)
        self.au_mot("Je refais le total")
        ok1 = self.col(self.t("Je refais le total,", 40, VERT_OK), -0.5)
        self.play(FadeIn(ok1, shift=RIGHT * 0.2), LaggedStart(*[Indicate(v, color=VERT_OK) for v in vals],
                                                              lag_ratio=0.1), run_time=1.0)
        self.au_mot("le nouveau nombre de jours")
        ok2 = self.col(self.ligne([("je divise par", WHITE), ("8", VERT_OK)], 40), -1.35)
        self.play(FadeIn(ok2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("8.")
        self.insister(ok2[1], 1.6, 0.3)
        self.attendre_voix()

    # ── 07 : défi (moyenne pondérée sur un diagramme en bâtons) ─────────────

    def batons(self):
        return Barres([str(v) for v in DEFI_V], DEFI_E, pas=1, batons=True, couleurs=[NUAGE, SOL, SOL],
                      nom_axe="Jours", titre="10 jours de production (kWh)", largeur=4.2, hauteur=3.2, fs=28,
                      centre=P(-3.5, -0.4))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        g = self.batons()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), FadeIn(g.fond), run_time=0.6)
        for i, mot in enumerate(["pendant 2 jours", "pendant 3 jours", "pendant 5 jours"]):
            self.au_mot(f"{DEFI_V[i]} " if i == 0 else f"{DEFI_V[i]} pendant")
            self.play(Indicate(g.etiquettes[i], color=AMBRE, scale_factor=1.5), run_time=0.3)
            self.au_mot(mot)
            self.play(g.pousser(i, run_time=0.35), FadeIn(g.valeur(i, fs=30), scale=1.6, run_time=0.35),
                      run_time=0.35)
        self.au_mot("Quelle est la production moyenne")
        q1 = self.col(self.ligne([("1.", AMBRE), ("La moyenne ?", WHITE)], 42), 1.5)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Le toit suffit-il")
        q2 = self.col(VGroup(self.ligne([("2.", AMBRE), ("Le toit suffit-il", WHITE)], 42),
                             self.ligne([("pour", WHITE), ("20", AMBRE), ("kWh par jour ?", WHITE)], 42)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.12), 0.45)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE), -0.85)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        g = self.batons()
        vals = VGroup(*[g.valeur(i, fs=30) for i in range(3)])
        self.add(g, vals)
        titre = self.col(self.t("Correction", 48, JAUNE_TITRE), 3.3)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Chaque valeur compte")
        ys = [2.5, 1.85, 1.2]
        prods = [(12, 2, 24), (20, 3, 60), (25, 5, 125)]
        for i, ((v, e, p), mot, mot2) in enumerate(zip(prods, ["12 fois 2", "20 fois 3", "25 fois 5"],
                                                       ["égale 24", "égale 60", "égale 125"])):
            self.au_mot(mot)
            lg = self.col(self.ligne([(str(v), WHITE), ("×", WHITE), (str(e), AMBRE), ("=", WHITE),
                                      (str(p), BLEU_CALCUL)], 42), ys[i])
            self.play(FadeIn(lg[:3], shift=RIGHT * 0.2), Indicate(g.barres[i], color=AMBRE), run_time=0.35)
            self.au_mot(mot2)
            self.play(FadeIn(lg[3:], scale=1.3), run_time=0.3)
        self.au_mot("Total : 209")
        t = self.col(self.ligne([("Total :", WHITE), ("209", BLEU_CALCUL)], 42), 0.55)
        self.play(FadeIn(t, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("209 divisé par 10")
        d = self.col(self.ligne([("209", BLEU_CALCUL), ("÷", WHITE), ("10", AMBRE), ("=", WHITE),
                                 ("20,9", VERT_OK)], 46), -0.15)
        self.play(FadeIn(d[:3], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 20,9")
        self.play(FadeIn(d[3:], scale=1.4), run_time=0.35)
        self.au_mot("Oui, le toit suffit")
        oui = self.col(self.t("Oui, le toit suffit !", 40, VERT_OK), -0.92)
        self.play(FadeIn(oui, scale=0.8), Create(self.encadrer(d)), run_time=0.5)
        self.au_mot("Attention")
        faux = self.col(self.t("(12 + 20 + 25) ÷ 3", 36), -1.45)
        self.au_mot("donnerait 19")
        self.play(FadeIn(faux, shift=UP * 0.2), run_time=0.4)
        f2 = self.col(self.ligne([("=", WHITE), ("19", ROUGE_ERREUR)], 36), -2.0)
        self.play(FadeIn(f2, scale=1.3), run_time=0.3)
        self.au_mot("C'est faux")
        f3 = self.t(": faux !", 36, ROUGE_ERREUR).next_to(f2, RIGHT, buff=0.2)
        self.play(FadeIn(f3, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        g = self.graphe(centre=P(-4.85, -0.3), largeur=2.6)
        self.add(g)
        self.XL = -2.3
        lignes = self.finale([("Moyenne =", "total ÷ nombre de valeurs."),
                              ("Une valeur en plus :", "nouveau total ÷ nouveau nombre."),
                              ("Avec des effectifs :", "chaque valeur × son effectif.")], [1.7, 0.1, -1.5],
                             fs=38)
        self.au_mot("Une moyenne")
        self.montrer_ligne(lignes[0])
        self.au_mot("Si une valeur s'ajoute")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et avec des effectifs")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.06, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_semaine()
        self.ecran_moyenne()
        self.ecran_dessus()
        self.ecran_orage()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
