# stats_lire_serie.py
# EleveAI — Maths 2de — série « Statistiques », lycée, épisode 01 : LIRE UNE
# SÉRIE STATISTIQUE (micro du coach : stat_lire_serie, notion
# statistiques_descriptives), AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la
# paysage complète du niveau de la classe (méthode, pièges, questions-pauses,
# défi corrigé) — REGLES.md, « la verte, c'est la paysage complète ».
#
# ⭐ Décor et métier : le FOOTBALL, la Coupe du monde 2022 au Qatar ; Inès,
# ANALYSTE DE DONNÉES SPORTIVES d'une chaîne de télévision, prépare les chiffres
# dits à l'antenne (problématique : vérifier une phrase avant de la dire).
# Centres d'intérêt (lib/videos/centres-interet.ts, 15-18 ans) : ["sport"].
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : les 64 scores de la Coupe du
# monde 2022 (prolongations comprises, tirs au but exclus), relevés dans le
# wikitexte de https://en.wikipedia.org/wiki/2022_FIFA_World_Cup_Group_A … _H
# et …_knockout_stage (Pays-Bas–Argentine 2-2 a.p., finale Argentine–France
# 3-3 a.p.). Total 172 buts = le total officiel (infobox « 172 (2.69 per
# match) »). Buts par match → nombre de matchs :
#   0 : 7 · 1 : 10 · 2 : 17 · 3 : 14 · 4 : 4 · 5 : 6 · 6 : 3 · 7 : 2 · 8 : 1
#   (8 buts : Angleterre–Iran 6-2 ; 7 buts : Espagne–Costa Rica 7-0 et
#   Portugal–Suisse 6-1).
# Calculs (Python) : N = 64 ; somme des valeurs 0 + … + 8 = 36 (le piège) ;
# étendue 8 − 0 = 8, sans Angleterre–Iran 7 − 0 = 7 ; au moins 3 buts :
# 14 + 4 + 6 + 3 + 2 + 1 = 30 ; plus de 3 : 16 ; au plus 2 : 7 + 10 + 17 = 34
# > 32 = la moitié de 64.
# ⭐ Figures du coach (banque seconde statistiques-descriptives.bank.ts) :
# `tableau_donnees` valeurs / « Effectif » (tableauEffectifs) et `stat_graph`
# barres (diagrammeBarres), redessinés par manim/canvas_stats.py (NON modifié).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Mapping micro → écrans (banque, stat_lire_serie) : lire_effectif → 03, 04 ·
# lire_valeur_effectif → 04 · lire_mode → 05 (question) · lire_total → 06 ·
# piège « somme des valeurs » → 07 · lire_etendue → 08, 09 (question) ·
# lire_condition → 10, 11 (question), 12 défi. (lire_boite, lire_boite_pourcentage :
# l'épisode 04-mediane-quartiles.)
# Écrans : 00 garde · 01 Inès · 02 la série · 03 lire un effectif · 04 le
# diagramme · 05 question 1 · 06 effectif total · 07 le piège · 08 étendue ·
# 09 question 2 · 10 « au moins » · 11 question 3 · 12 défi · 12b correction ·
# 13 ce que tu as appris · 14 fin (règle du 19/10).
#
# Voix : manim/voix/2de-stats-lire-serie.json (débit −10), WAV dans
# public/sons/2de-stats-lire-serie/ ; calage : stats_lire_serie_marques.json
# (même dossier, cues WinRT sans doublons).
# python -m manim render -qh --disable_caching manim/scripts/seconde/stats_lire_serie.py StatsLireSerieSeconde -o eleveai-maths-seconde-stats-lire-serie --media_dir manim/scripts/seconde/media-stats-lire-serie
# Sortie : manim/sorties/seconde/maths/statistiques/01-lire-serie/eleveai-maths-seconde-stats-lire-serie.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g1_commun import *  # noqa: E402,F401,F403

BUTS = list(range(9))
MATCHS = [7, 10, 17, 14, 4, 6, 3, 2, 1]
CATS = [str(v) for v in BUTS]


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


def ecran_tv(larg=3.4, haut=2.1):
    """Un écran de télévision et son pied."""
    cadre = RoundedRectangle(width=larg, height=haut, corner_radius=0.15, stroke_color="#94a3b8", stroke_width=6,
                             fill_color="#0b3b2e", fill_opacity=1)
    terrain = VGroup(Rectangle(width=larg * 0.8, height=haut * 0.7, stroke_color=WHITE, stroke_width=3),
                     Line(UP * haut * 0.35, DOWN * haut * 0.35, color=WHITE, stroke_width=3),
                     Circle(radius=haut * 0.15, stroke_color=WHITE, stroke_width=3))
    pied = VGroup(Line(DOWN * haut / 2, DOWN * (haut / 2 + 0.35), color="#94a3b8", stroke_width=8),
                  Line(DOWN * (haut / 2 + 0.35) + LEFT * 0.5, DOWN * (haut / 2 + 0.35) + RIGHT * 0.5,
                       color="#94a3b8", stroke_width=8))
    return VGroup(cadre, terrain, pied)


class StatsLireSerieSeconde(Paysage2de):
    nom_voix = "2de-stats-lire-serie"
    fichier_marques = "stats_lire_serie_marques.json"

    def tableau(self, plein=True, centre=P(-0.35, 2.3)):
        tab = Tableau(CATS, [MATCHS if plein else [None] * 9], libelles=["Effectif"], coin="Buts",
                      largeur_case=1.05, largeur_libelle=2.0, hauteur=0.85, fs=34, centre=centre)
        return textes_devant(tab)

    def graphe(self, centre=P(-2.95, -0.35), largeur=4.8, hauteur=3.4, fs=28):
        return Barres(CATS, MATCHS, pas=5, sous_pas=1, maxi=20, largeur=largeur, hauteur=hauteur, fs=fs,
                      nom_axe="Matchs", titre="Buts dans un match", colonne_lue=True, centre=centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire une série statistique", self.identite, "verte")
        b = ballon(0.75).move_to(P(-1.9, 0.35))
        n = self.t("64 matchs", 60, BLEU_CALCUL).next_to(b, RIGHT, buff=0.5)
        self.au_mot("Lire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.au_mot("64 matchs")
        self.play(FadeIn(b, shift=DOWN * 0.6), FadeIn(n, shift=LEFT * 0.3), run_time=0.6)
        self.play(Rotate(b, -PI, run_time=0.8))
        self.insister(n, 1.2, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Inès, analyste de données sportives ────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        tv = ecran_tv().move_to(P(-3.6, 1.65))
        self.au_mot("Inès")
        nom = self.t("Inès", 50, JAUNE_TITRE).move_to(P(-3.6, -0.45))
        metier = self.bloc(["analyste de données", "sportives"], 34, BLEU_CALCUL).next_to(nom, DOWN, buff=0.2)
        metier.set_x(-3.6)
        self.play(FadeIn(tv, shift=UP * 0.3), Write(nom), run_time=0.7)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.5)
        self.au_mot("les chiffres")
        role = self.bloc(["prépare les chiffres", "dits à l'antenne"], 30, "#cbd5e1").next_to(metier, DOWN, buff=0.3)
        role.set_x(-3.6)
        b = ballon(0.3).move_to(tv[1].get_center())
        self.play(FadeIn(role, shift=UP * 0.15), run_time=0.4)
        self.play(FadeIn(b, scale=0.5), run_time=0.4)
        self.play(b.animate.shift(RIGHT * 1.0), run_time=0.6)
        self.au_mot("la Coupe du monde 2022")
        l1 = self.col(self.ligne([("Coupe du monde", WHITE), ("2022", JAUNE_TITRE)], 40), 2.5)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("au Qatar")
        l1b = self.col(self.t("au Qatar", 34, "#cbd5e1"), 1.85)
        self.play(FadeIn(l1b, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("64 matchs")
        l2 = self.col(self.ligne([("64", BLEU_CALCUL), ("matchs", WHITE)], 46), 1.0)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("172 buts")
        l3 = self.col(self.ligne([("172", AMBRE), ("buts", WHITE)], 46), 0.15)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Sa question")
        q = self.col(self.bloc(["Combien de buts", "voit-on dans un match ?"], 38, ORANGE_RETENUE), -1.15)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.insister(q, 1.06, 0.3)
        self.attendre_voix()

    # ── 02 : la série (individu, caractère, valeurs, effectifs) ─────────────

    def ecran_serie(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-serie")
        tab = self.tableau(plein=False)
        X = -5.9

        def voc(morceaux, y):
            lg = self.ligne(morceaux, 38)
            return lg.move_to(P(0, y)).align_to(P(X, 0), LEFT)

        self.au_mot("Chaque match")
        v1 = voc([("Individu :", BLEU_CALCUL), ("un match", WHITE)], 0.45)
        self.play(FadeIn(v1, shift=RIGHT * 0.2), FadeIn(tab.carte), FadeIn(tab.coin), FadeIn(tab.libelles),
                  *[FadeIn(c) for c in tab.cases[0]], run_time=0.5)
        self.au_mot("Le caractère")
        v2 = voc([("Caractère :", BLEU_CALCUL), ("le nombre de buts du match", WHITE)], -0.4)
        self.play(FadeIn(v2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("Les valeurs")
        v3 = voc([("Valeurs :", BLEU_CALCUL), ("de 0 à 8", WHITE)], -1.25)
        self.play(FadeIn(v3, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(t, shift=DOWN * 0.15) for t in tab.tetes],
                                                               lag_ratio=0.08), run_time=0.9)
        self.au_mot("l'effectif")
        v4 = voc([("Effectif :", AMBRE), ("le nombre de matchs", WHITE)], -2.1)
        self.play(FadeIn(v4, shift=RIGHT * 0.2), Indicate(tab.libelles[0], color=AMBRE), run_time=0.6)
        for j, ext in enumerate(["7 matchs", "10. ", "17. ", "14. ", "4. 5", "6. 6", "3. 7", "2. Et", "1 seul"]):
            self.au_mot(ext)
            self.play(remplir(tab, 0, j, MATCHS[j]), run_time=0.35)
        self.attendre_voix()

    # ── 03 : lire un effectif dans le tableau ───────────────────────────────

    def ecran_effectif(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-effectif")
        tab = self.tableau()
        self.add(tab)
        X = -5.9
        self.au_mot("Lire un effectif")
        tit = self.t("Lire un effectif", 46, JAUNE_TITRE).move_to(P(0, 0.45)).align_to(P(X, 0), LEFT)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Combien de matchs")
        q = self.ligne([("Combien de matchs avec", WHITE), ("3", BLEU_CALCUL), ("buts ?", WHITE)], 40)
        q.move_to(P(0, -0.45)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("Je repère la valeur 3")
        cadre = SurroundingRectangle(tab.tetes[3], color=BLEU_CALCUL, buff=0.04, stroke_width=8)
        self.play(Create(cadre), Indicate(q[1], color=BLEU_CALCUL), run_time=0.6)
        self.au_mot("Je descends")
        fl = cadre.copy().set_color(AMBRE)
        self.play(fl.animate.move_to(tab.case(0, 3)), run_time=0.7)
        self.au_mot("14. L'effectif")
        self.play(*allumer(tab, 0, 3), run_time=0.4)
        self.insister(tab.texte_case(0, 3), 1.5, 0.25)
        self.au_mot("L'effectif de la valeur 3")
        r = self.ligne([("Valeur", BLEU_CALCUL), ("3", BLEU_CALCUL), ("→", WHITE), ("effectif", AMBRE),
                        ("14 matchs", AMBRE)], 44)
        r.move_to(P(0, -1.7)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.5)
        self.play(Create(self.encadrer(r)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : le diagramme en barres ─────────────────────────────────────────

    def ecran_diagramme(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-diagramme")
        g = self.graphe()
        self.play(FadeIn(g.fond, scale=0.95), run_time=0.5)
        self.play(g.pousser(run_time=1.2, lag=0.12))
        self.au_mot("les valeurs en bas")
        self.play(Indicate(g.etiquettes, color=BLEU_CALCUL, scale_factor=1.3), run_time=0.7)
        self.au_mot("les effectifs sur l'axe")
        self.play(Indicate(VGroup(*g.nombres.values()), color=AMBRE, scale_factor=1.3), run_time=0.7)
        self.au_mot("Pour la valeur 3")
        l1 = self.col(self.ligne([("Valeur", WHITE), ("3", BLEU_CALCUL)], 42), 2.4)
        self.play(g.focus(3), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("je pars du haut")
        pt = g.vers_axe(3, jusqu_au_lu=True)
        self.play(Create(pt), run_time=0.9)
        self.au_mot("14, comme")
        lu14 = g.lu(14)
        l2 = self.col(self.ligne([("→ effectif", WHITE), ("14", AMBRE)], 42), 1.6)
        self.play(FadeIn(lu14, scale=1.4), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("comme dans le tableau")
        l2b = self.col(self.t("comme dans le tableau", 32, "#cbd5e1"), 0.95)
        self.play(FadeIn(l2b, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Dans l'autre sens")
        l3 = self.col(self.ligne([("Effectif", WHITE), ("6", AMBRE), ("→ valeur", WHITE), ("?", ORANGE_RETENUE)], 42),
                      -0.05)
        self.play(FadeOut(pt), FadeOut(lu14), g.rallumer(), FadeIn(l3, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Je cherche la barre")
        y6 = g.y_axe(6)
        h6 = DashedLine(P(g._x_lu(), y6[1]), P(g.ref_x.get_end()[0] + 0.1, y6[1]), color=AMBRE, stroke_width=6,
                        dash_length=0.14)
        lu6 = g.lu(6)
        self.play(FadeIn(lu6, scale=1.4), Create(h6), run_time=0.9)
        self.au_mot("celle de 5 buts")
        self.play(g.focus(5), Indicate(g.etiquettes[5], color=BLEU_CALCUL, scale_factor=1.6), run_time=0.6)
        self.au_mot("La réponse est une valeur")
        l4 = self.col(self.ligne([("Réponse :", WHITE), ("5 buts", VERT_OK)], 44), -1.0)
        self.play(FadeIn(l4, shift=UP * 0.2), run_time=0.45)
        self.au_mot("pas l'effectif")
        l5 = self.col(self.ligne([("pas 6 :", ROUGE_CLAIR), ("c'est l'effectif", ROUGE_CLAIR)], 34), -1.75)
        self.play(FadeIn(l5, shift=UP * 0.15), run_time=0.4)
        self.insister(l4[1], 1.25, 0.25)
        self.attendre_voix()

    # ── 05 : question 1 (la valeur la plus fréquente) ───────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        g = self.graphe()
        self.add(g)

        def geste():
            return [g.focus(2), Create(g.vers_axe(2, jusqu_au_lu=True)), FadeIn(g.lu(17), scale=1.3)]

        t0 = self.question("05-question", "05b-reponse",
                           ["Sur ce diagramme, quelle est", "la valeur la plus fréquente ?"],
                           ["17", "8", "2"], 2,
                           [("2 buts : la plus haute", VERT_OK, "2 buts"),
                            ("17 : son effectif", ROUGE_CLAIR, "17 n'est"),
                            ("8 : la valeur maximale", ROUGE_CLAIR, "et 8 est")], geste=geste)
        print(f"QUESTION 1 t = {mmss(t0)}", flush=True)

    # ── 06 : l'effectif total ───────────────────────────────────────────────

    def ecran_total(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-total")
        tab = self.tableau()
        self.add(tab)
        X = -5.9
        self.au_mot("Combien de matchs en tout")
        q = self.t("Combien de matchs en tout ?", 42).move_to(P(0, 0.5)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("la somme des effectifs")
        d = self.ligne([("Effectif total", AMBRE), ("=", WHITE), ("somme des effectifs", WHITE)], 40)
        d.move_to(P(0, -0.35)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(d, shift=RIGHT * 0.2), *teinter_ligne(tab, 0), run_time=0.6)
        termes = [str(v) for v in MATCHS]
        morceaux = []
        for k, s in enumerate(termes):
            morceaux.append((s, WHITE))
            if k < len(termes) - 1:
                morceaux.append(("+", "#94a3b8"))
        morceaux += [("=", WHITE), ("64", VERT_OK)]
        som = self.ligne(morceaux, 42, buff=0.13).move_to(P(-0.6, -1.3))
        for k, ext in enumerate(["7 plus", "10 plus", "17 plus", "14 plus", ("4 plus", 2), "6 plus", "3 plus",
                                 "2 plus", "1, égale"]):
            self.au_mot(*ext) if isinstance(ext, tuple) else self.au_mot(ext)
            anims = [FadeIn(som[2 * k], shift=UP * 0.15), Indicate(tab.texte_case(0, k), color=AMBRE)]
            if k < 8:
                anims.append(FadeIn(som[2 * k + 1]))
            self.play(*anims, run_time=0.3)
        self.au_mot("égale 64")
        self.play(FadeIn(som[-2:], scale=1.4), run_time=0.4)
        self.insister(som[-1], 1.4, 0.25)
        self.au_mot("On retrouve bien")
        ok = self.ligne([("N = 64", VERT_OK), (": les 64 matchs du tournoi", WHITE)], 38)
        ok.move_to(P(-0.4, -2.3))
        self.play(FadeIn(ok, shift=UP * 0.2), Create(self.encadrer(som)), run_time=0.6)
        self.attendre_voix()

    # ── 07 : le piège (additionner les valeurs) ─────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        tab = self.tableau()
        self.add(tab)
        X = -5.9
        self.au_mot("Le piège")
        tit = self.t("Le piège", 48, ROUGE_ERREUR).move_to(P(0, 0.5)).align_to(P(X, 0), LEFT)
        self.play(Write(tit), run_time=0.45)
        self.au_mot("additionner les valeurs")
        cadres = VGroup(*[SurroundingRectangle(t, color=ROUGE_ERREUR, buff=0.03, stroke_width=6) for t in tab.tetes])
        self.play(Create(cadres), run_time=0.6)
        self.au_mot("0 plus 1")
        f = self.ligne([("0 + 1 + 2 + … + 8", WHITE)], 44).move_to(P(0, -0.45)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(f, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égale 36")
        r = self.ligne([("=", WHITE), ("36", ROUGE_ERREUR)], 44).next_to(f, RIGHT, buff=0.25)
        self.play(FadeIn(r, scale=1.4), run_time=0.4)
        self.au_mot("rien du tout")
        x = croix(VGroup(f, r), sw=6)
        self.play(Create(x), FadeOut(cadres), run_time=0.45)
        self.au_mot("Et les 172 buts")
        l1 = self.ligne([("172 buts", AMBRE), ("= le total des buts marqués", WHITE)], 38)
        l1.move_to(P(0, -1.45)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("pas le nombre de matchs")
        l2 = self.ligne([("pas le nombre de matchs", ROUGE_CLAIR)], 36).next_to(l1, DOWN, buff=0.2)
        l2.align_to(P(X, 0), LEFT)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Il servira pour la moyenne")
        l3 = self.ligne([("→ épisode suivant :", "#cbd5e1"), ("la moyenne", BLEU_CALCUL)], 36)
        l3.next_to(l2, DOWN, buff=0.3).align_to(P(X, 0), LEFT)
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 08 : l'étendue ──────────────────────────────────────────────────────

    def ecran_etendue(self):
        self.clear()
        self.add_mascotte(scale=0.4)
        self.dire("08-etendue")
        g = self.graphe()
        self.add(g)
        self.au_mot("L'étendue")
        tit = self.col(self.t("L'étendue", 48, JAUNE_TITRE), 2.5)
        self.play(Write(tit), run_time=0.45)
        self.au_mot("la plus grande valeur moins")
        d = self.col(self.bloc(["plus grande valeur", "− plus petite valeur"], 34, "#cbd5e1"), 1.6)
        self.play(FadeIn(d, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Le plus grand score")
        l1 = self.col(self.ligne([("Plus grand :", WHITE), ("8 buts", BLEU_CALCUL)], 40), 0.55)
        self.play(g.focus(8), Indicate(g.etiquettes[8], color=BLEU_CALCUL, scale_factor=1.8),
                  FadeIn(l1, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Angleterre")
        l1b = self.col(self.t("Angleterre – Iran", 32, "#cbd5e1"), -0.05)
        self.play(FadeIn(l1b, shift=UP * 0.15), run_time=0.4)
        self.au_mot("6 à 2")
        sc = self.t("6 à 2", 32, "#cbd5e1").next_to(l1b, RIGHT, buff=0.3)
        self.play(FadeIn(sc, scale=1.3), run_time=0.3)
        self.au_mot("Le plus petit")
        l2 = self.col(self.ligne([("Plus petit :", WHITE), ("0 but", BLEU_CALCUL)], 40), -0.85)
        self.play(g.focus(0), Indicate(g.etiquettes[0], color=BLEU_CALCUL, scale_factor=1.8),
                  FadeIn(l2, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("dans 7 matchs")
        l2b = self.col(self.t("dans 7 matchs", 32, "#cbd5e1"), -1.45)
        self.play(FadeIn(l2b, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Étendue : 8 moins 0")
        ligne = self.ligne([("Étendue :", WHITE), ("8 − 0", BLEU_CALCUL), ("=", WHITE), ("8 buts", VERT_OK)], 42)
        if ligne.width > 5.3:
            ligne.scale_to_fit_width(5.3)
        ligne.move_to(P(0, -2.05)).align_to(P(self.XL, 0), LEFT)
        e, r = ligne[:2], ligne[2:]
        self.play(FadeIn(e, shift=UP * 0.2), g.rallumer(), run_time=0.5)
        self.au_mot("égale 8 buts")
        self.play(FadeIn(r, scale=1.4), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(e, r), buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 09 : question 2 (l'étendue sans le match des 8 buts) ────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        g = self.graphe()
        self.add(g)

        def retirer():
            self.au_mot("celui des 8 buts")
            x = croix(g.barres[8], sw=6)
            self.play(Create(x), Indicate(g.etiquettes[8], color=ROUGE_ERREUR, scale_factor=1.6), run_time=0.5)
            self.play(g.barres[8].animate.set_opacity(0.12), x.animate.set_opacity(0.5),
                      g.etiquettes[8].animate.set_opacity(0.3), run_time=0.4)

        def geste():
            return [g.allumer(7), g.allumer(0), Indicate(g.etiquettes[7], color=VERT_OK, scale_factor=1.6),
                    Indicate(g.etiquettes[0], color=VERT_OK, scale_factor=1.6)]

        t0 = self.question("09-question", "09b-reponse",
                           ["Sans le match des 8 buts,", "quelle est l'étendue ?"],
                           ["7", "8", "16"], 0,
                           [("Plus grand : 7 buts", VERT_OK, "le plus grand score"),
                            ("7 − 0 = 7", VERT_OK, "7 moins 0"),
                            ("8 : avant le retrait", ROUGE_CLAIR, "8 oublie"),
                            ("16 = 17 − 1 : effectifs", ROUGE_CLAIR, "16, c'est")],
                           avant_choix=retirer, geste=geste)
        print(f"QUESTION 2 t = {mmss(t0)}", flush=True)

    # ── 10 : « au moins 3 » ─────────────────────────────────────────────────

    def ecran_condition(self):
        self.clear()
        self.add_mascotte()
        self.dire("10-condition")
        tab = self.tableau()
        self.add(tab)
        X = -5.9
        self.au_mot("Combien de matchs")
        q = self.ligne([("Combien de matchs avec", WHITE), ("au moins 3", BLEU_CALCUL), ("buts ?", WHITE)], 40)
        q.move_to(P(0, 0.5)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("c'est 3 buts, ou plus")
        d = self.ligne([("au moins 3", BLEU_CALCUL), ("= 3 buts ou plus", WHITE), ("(≥ 3)", "#cbd5e1")], 38)
        d.move_to(P(0, -0.35)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(d, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("Je garde les valeurs")
        zone = VGroup(*[tab.tetes[j] for j in range(3, 9)], *[tab.case(0, j) for j in range(3, 9)])
        cadre = SurroundingRectangle(zone, color=BLEU_CALCUL, buff=0.06, stroke_width=8)
        self.play(Create(cadre), *teinter(tab, [(0, j) for j in range(3, 9)]), run_time=0.7)
        termes = [str(MATCHS[j]) for j in range(3, 9)]
        morceaux = []
        for k, s in enumerate(termes):
            morceaux.append((s, WHITE))
            if k < len(termes) - 1:
                morceaux.append(("+", "#94a3b8"))
        morceaux += [("=", WHITE), ("30 matchs", VERT_OK)]
        som = self.ligne(morceaux, 46, buff=0.16).move_to(P(0, -1.3)).align_to(P(X, 0), LEFT)
        for k, ext in enumerate(["14 plus", ("4 plus", 2), "6 plus", "3 plus", "2 plus", "1, égale"]):
            self.au_mot(*ext) if isinstance(ext, tuple) else self.au_mot(ext)
            anims = [FadeIn(som[2 * k], shift=UP * 0.15), Indicate(tab.texte_case(0, 3 + k), color=AMBRE)]
            if k < 5:
                anims.append(FadeIn(som[2 * k + 1]))
            self.play(*anims, run_time=0.3)
        self.au_mot("égale 30")
        self.play(FadeIn(som[-2:], scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(som, buff=0.15)), run_time=0.4)
        self.au_mot("Attention")
        att = self.ligne([("Attention :", ORANGE_RETENUE), ("« plus de 3 »", BLEU_CALCUL), ("n'est pas pareil !",
                                                                                         ORANGE_RETENUE)], 38)
        att.move_to(P(0, -2.35)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(att, shift=UP * 0.2), run_time=0.5)
        self.insister(att[1], 1.15, 0.3)
        self.attendre_voix()

    # ── 11 : question 3 (« plus de 3 ») ─────────────────────────────────────

    def ecran_question3(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        g = self.graphe()
        self.add(g)

        def geste():
            return [g.estomper([4, 5, 6, 7, 8]), g.etiquettes[3].animate.set_opacity(0.3)]

        t0 = self.question("11-question", "11b-reponse",
                           ["Combien de matchs ont fini", "avec plus de 3 buts ?"],
                           ["30", "16", "14"], 1,
                           [("plus de 3 : sans le 3", VERT_OK, "ne compte pas"),
                            ("30 − 14 = 16", VERT_OK, "30 moins 14"),
                            ("30 : compte aussi le 3", ROUGE_CLAIR, "30 comptait"),
                            ("14 : l'effectif du 3", ROUGE_CLAIR, "et 14")], geste=geste)
        print(f"QUESTION 3 t = {mmss(t0)}", flush=True)

    # ── 12 : défi ───────────────────────────────────────────────────────────

    def micro(self):
        tete = Circle(radius=0.32, fill_color="#94a3b8", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
        manche = RoundedRectangle(width=0.22, height=0.9, corner_radius=0.08, fill_color="#475569", fill_opacity=1,
                                  stroke_width=0).next_to(tete, DOWN, buff=-0.05)
        return VGroup(manche, tete)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("12-defi")
        tab = self.tableau()
        self.add(tab)
        X = -5.9
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer", 48, JAUNE_TITRE).move_to(P(0, 0.55)).align_to(P(X, 0), LEFT)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Inès veut annoncer")
        mc = self.micro().move_to(P(-5.3, -1.0))
        bulle = self.bloc(["« Plus de la moitié des matchs", "ont fini avec au plus 2 buts. »"], 38)
        bulle.move_to(P(0, -1.0)).align_to(P(-4.5, 0), LEFT)
        fond = SurroundingRectangle(bulle, color=BLEU_CALCUL, buff=0.22, corner_radius=0.2, stroke_width=4)
        self.play(FadeIn(mc, shift=UP * 0.3), run_time=0.4)
        self.au_mot("Plus de la moitié")
        self.play(Create(fond), FadeIn(bulle, shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("A-t-elle raison")
        r = self.ligne([("Vrai", VERT_OK), ("ou", WHITE), ("faux ?", ROUGE_CLAIR)], 42)
        r.move_to(P(0, -2.3)).align_to(P(-4.5, 0), LEFT)
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.45)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(0, -3.1)).align_to(P(-4.5, 0), LEFT)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("12b-correction")
        tab = self.tableau()
        self.add(tab)
        X = -5.9
        tit = self.t("Correction", 48, JAUNE_TITRE).move_to(P(0, 0.55)).align_to(P(X, 0), LEFT)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("c'est 0, 1 ou 2 buts")
        d = self.ligne([("au plus 2", BLEU_CALCUL), ("= 0, 1 ou 2 buts", WHITE), ("(≤ 2)", "#cbd5e1")], 38)
        d.move_to(P(0, -0.3)).align_to(P(X, 0), LEFT)
        zone = VGroup(*[tab.tetes[j] for j in range(3)], *[tab.case(0, j) for j in range(3)])
        cadre = SurroundingRectangle(zone, color=BLEU_CALCUL, buff=0.06, stroke_width=8)
        self.play(FadeIn(d, shift=RIGHT * 0.2), Create(cadre), *teinter(tab, [(0, j) for j in range(3)]), run_time=0.6)
        som = self.ligne([("7", WHITE), ("+", "#94a3b8"), ("10", WHITE), ("+", "#94a3b8"), ("17", WHITE),
                          ("=", WHITE), ("34 matchs", AMBRE)], 46).move_to(P(0, -1.2)).align_to(P(X, 0), LEFT)
        for k, ext in enumerate(["7 plus", "10 plus", "17, égale"]):
            self.au_mot(ext)
            anims = [FadeIn(som[2 * k], shift=UP * 0.15), Indicate(tab.texte_case(0, k), color=AMBRE)]
            if k < 2:
                anims.append(FadeIn(som[2 * k + 1]))
            self.play(*anims, run_time=0.3)
        self.au_mot("égale 34")
        self.play(FadeIn(som[-2:], scale=1.3), run_time=0.4)
        self.au_mot("des 64 matchs")
        m = self.ligne([("Moitié :", WHITE), ("64 ÷ 2", WHITE)], 42).move_to(P(0, -2.1)).align_to(P(X, 0), LEFT)
        self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("c'est 32")
        m2 = self.ligne([("=", WHITE), ("32", BLEU_CALCUL)], 42).next_to(m, RIGHT, buff=0.22)
        self.play(FadeIn(m2, scale=1.3), run_time=0.35)
        self.au_mot("34, c'est plus que 32")
        cmp = self.ligne([("34", AMBRE), (">", WHITE), ("32", BLEU_CALCUL)], 54).move_to(P(2.4, -2.15))
        self.play(FadeIn(cmp, scale=1.4), run_time=0.45)
        self.au_mot("Inès a raison")
        ok = self.t("Inès a raison !", 44, VERT_OK).next_to(cmp, DOWN, buff=0.3)
        self.play(FadeIn(ok, shift=UP * 0.2), Create(self.encadrer(cmp)), run_time=0.5)
        self.insister(ok, 1.12, 0.3)
        self.attendre_voix()

    # ── 13 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        self.dire("13-finale")
        b = ballon(0.55).move_to(P(5.2, 1.2))
        self.add(b)
        self.XL = -4.6
        lignes = self.finale([("Valeur et effectif :", "deux nombres différents."),
                              ("Effectif total =", "somme des effectifs."),
                              ("Étendue =", "plus grande − plus petite valeur."),
                              ("« au moins 3 » compte le 3,", "« plus de 3 » ne le compte pas.")],
                             [2.1, 0.75, -0.6, -1.95], fs=36)
        for lg, ext in zip(lignes, ["Une valeur", "L'effectif total", "L'étendue, c'est", "Et « au moins 3 »"]):
            self.au_mot(ext)
            self.montrer_ligne(lg)
        self.insister(lignes[3][1], 1.05, 0.3)
        self.attendre_voix(marge=1.0)
        self.XL = OutilsPaysage.XL

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_serie()
        self.ecran_effectif()
        self.ecran_diagramme()
        self.ecran_question1()
        self.ecran_total()
        self.ecran_piege()
        self.ecran_etendue()
        self.ecran_question2()
        self.ecran_condition()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("14-abonne")
