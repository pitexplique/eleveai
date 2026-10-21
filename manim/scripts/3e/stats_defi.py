# stats_defi.py
# EleveAI — Maths 3e — série « Statistiques », cycle 4, épisode 08 : DÉFIS
# (micro du coach : stat_defi, notion stat_statistique — problèmes en
# plusieurs étapes, façon brevet), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE
# (au-dessus de la verte du niveau : enchaîner moyenne pondérée, médiane par
# effectifs cumulés, valeur minimale pour un objectif, moyenne d'un groupe
# inconnu, et DÉCIDER). Short jumeau : stats_defi_short.py (verte).
#
# ⭐ Décor et métier : l'INDUSTRIE et la mobilité ; une INGÉNIEURE QUALITÉ
# d'une usine de vélos électriques décide si un lot de batteries peut partir
# (problématique : contrôler, décider). Données VRAISEMBLABLES (autonomie
# d'une batterie de vélo électrique : 60 à 100 km), calculées en Python :
#   25 batteries : 60 km : 2 · 70 : 5 · 80 : 9 · 90 : 6 · 100 : 3 →
#   somme 2 030, moyenne 81,2 > 80 ; cumulés 2, 7, 16 → 13e valeur = 80 ;
#   objectif 82 sur 26 : 82 × 26 = 2 132 ; 2 132 − 2 030 = 102 km ;
#   défi (defi_groupe_inconnu) : A 30 batteries, moyenne 85 ; ensemble 50,
#   moyenne 82 → B : 20 batteries, (4 100 − 2 550) ÷ 20 = 77,5 ; piège 79.
# ⭐ Figure du coach : `tableau_donnees` (tableauEffectifs de la banque 3e,
# avec la ligne des effectifs cumulés).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Mapping micro → écrans (banque 3e réécrite le 21/10) : defi_ecart_moyenne_mediane
# (moyenne pondérée + médiane par effectifs cumulés) → 02-03 ; defi_note_minimale
# → 04 ; defi_groupe_inconnu → 05 défi / 05b.
# Écrans : 00 garde · 01 l'ingénieure qualité, la règle · 02 étape 1 : moyenne
# pondérée · 03 étape 2 : médiane · 04 étape 3 : l'objectif · 05 défi (deux
# chaînes) · 05b correction · 06 ce que tu as appris · 07 fin (règle du 19/10).
#
# Voix : manim/voix/3e-stats-defi.json (débit −10), WAV dans
# public/sons/3e-stats-defi/ ; calage mot à mot :
# manim/scripts/3e/stats_defi_marques.json (marques.ps1 + conv.py, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/3e/stats_defi.py StatsDefi3e -o eleveai-maths-3e-stats-defi --media_dir manim/scripts/3e/media-defi
# Sortie : manim/sorties/3e/maths/statistiques/08-defi/eleveai-maths-3e-stats-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "4e"))

from stats4e_lotf_commun import *  # noqa: E402,F403

KM = [60, 70, 80, 90, 100]
NB = [2, 5, 9, 6, 3]
CUM = [2, 7, 16, 22, 25]
C_OK = VERT_OK


def velo(s=1.0, couleur="#22c55e"):
    """Un vélo électrique : deux roues, cadre, selle, guidon, batterie."""
    r1 = Circle(radius=0.42 * s, color=WHITE, stroke_width=5).move_to(P(-0.75 * s, 0))
    r2 = Circle(radius=0.42 * s, color=WHITE, stroke_width=5).move_to(P(0.75 * s, 0))
    cadre = VMobject(stroke_color=couleur, stroke_width=7).set_points_as_corners(
        [P(-0.75 * s, 0), P(-0.15 * s, 0.6 * s), P(0.55 * s, 0.6 * s), P(0.75 * s, 0), P(0, 0), P(-0.75 * s, 0)])
    selle = Line(P(-0.3 * s, 0.78 * s), P(0.0 * s, 0.78 * s), color=WHITE, stroke_width=7)
    tige = Line(P(-0.15 * s, 0.6 * s), P(-0.15 * s, 0.78 * s), color=WHITE, stroke_width=5)
    guidon = Line(P(0.55 * s, 0.6 * s), P(0.68 * s, 0.9 * s), color=WHITE, stroke_width=5)
    bat = RoundedRectangle(width=0.42 * s, height=0.16 * s, corner_radius=0.04, fill_color="#facc15",
                           fill_opacity=1, stroke_width=0).move_to(P(0.2 * s, 0.48 * s))
    return VGroup(r1, r2, cadre, selle, tige, guidon, bat)


def batterie(s=1.0, niveau=1.0, couleur="#22c55e"):
    corps = RoundedRectangle(width=0.5 * s, height=0.9 * s, corner_radius=0.06, stroke_color=WHITE,
                             stroke_width=4)
    borne = Rectangle(width=0.2 * s, height=0.08 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    borne.next_to(corps, UP, buff=0)
    jus = Rectangle(width=0.4 * s, height=0.8 * s * niveau, fill_color=couleur, fill_opacity=1, stroke_width=0)
    jus.align_to(corps, DOWN).shift(UP * 0.05 * s)
    return VGroup(corps, borne, jus)


class StatsDefiBase(PaysageF):
    nom_voix = "3e-stats-defi"
    fichier_marques = "stats_defi_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "bleue"

    def tableau(self, cumules=False, centre=P(-0.9, 2.2)):
        lignes = [NB] + ([[None] * 5] if cumules else [])
        lib = ["Batteries"] + (["Effectifs cumulés"] if cumules else [])
        tab = Tableau([str(v) for v in KM], lignes, libelles=lib, coin="Autonomie (km)", largeur_case=1.45,
                      largeur_libelle=3.3, hauteur=0.85, fs=36, centre=centre)
        textes_devant(tab)
        return tab

    def etape(self, n, txt, y=3.3):
        return self.ligne([(f"Étape {n} :", AMBRE), (txt, WHITE)], 40).move_to(P(-0.6, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi statistiques", self.identite, self.ceinture)
        v = velo(1.3).move_to(P(-1.6, 0.2))
        b = batterie(1.2).move_to(P(0.9, 0.2))
        self.au_mot("Défi statistiques")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(v, shift=RIGHT * 0.4),
                  run_time=0.7)
        self.au_mot("décider avec des chiffres")
        q = self.t("?", 80, ORANGE_RETENUE).next_to(b, RIGHT, buff=0.4)
        self.play(FadeIn(b, scale=0.6), FadeIn(q, scale=0.4), run_time=0.5)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'ingénieure qualité, la règle ─────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("une usine de vélos électriques")
        v = velo(1.1).move_to(P(-5.0, 2.3))
        u = self.t("Usine de vélos électriques", 40, JAUNE_TITRE).next_to(v, RIGHT, buff=0.5)
        self.play(FadeIn(v, shift=RIGHT * 0.4), Write(u), run_time=0.8)
        self.au_mot("une ingénieure qualité")
        ing = personne("#e11d48", "#8d5524", 0.32, "#111827", longs=True).move_to(P(-5.2, 0.4))
        met = self.metier("Ingénieure qualité", fs=40).next_to(ing, RIGHT, buff=0.35)
        self.play(FadeIn(ing, shift=UP * 0.2), FadeIn(met, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("elle en teste 25")
        bats = VGroup(*[batterie(0.32, 0.4 + 0.6 * ((k * 7) % 10) / 10) for k in range(25)])
        bats.arrange_in_grid(rows=2, buff=(0.12, 0.2)).move_to(P(2.6, 0.5))
        t25 = self.ligne([("25", BLEU_CALCUL), ("batteries testées", WHITE)], 34).next_to(bats, UP, buff=0.25)
        self.play(LaggedStart(*[FadeIn(b, scale=0.5) for b in bats], lag_ratio=0.03), FadeIn(t25), run_time=0.9)
        self.au_mot("Sa règle")
        regle = self.t("Le lot part si :", 38, AMBRE).move_to(P(-3.6, -1.15))
        self.play(FadeIn(regle, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("la moyenne dépasse 80")
        r1 = self.ligne([("1.", AMBRE), ("moyenne", WHITE), ("> 80 km", BLEU_CALCUL)], 38)
        r1.next_to(regle, RIGHT, buff=0.5)
        self.play(FadeIn(r1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("au moins la moitié")
        r2 = self.ligne([("2.", AMBRE), ("au moins la moitié", WHITE), ("≥ 80 km", BLEU_CALCUL)], 38)
        r2.next_to(r1, DOWN, buff=0.3).align_to(r1, LEFT)
        self.play(FadeIn(r2[:2], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("tient 80")
        self.play(FadeIn(r2[2], scale=1.3), run_time=0.3)
        cadre = self.encadrer(VGroup(regle, r1, r2), AMBRE)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 02 : étape 1, la moyenne pondérée ───────────────────────────────────

    def ecran_moyenne(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-moyenne")
        tab = self.tableau()
        fond = VGroup(tab.carte, tab.coin, tab.libelles, *[t[0] for t in tab.tetes], *[c[0] for c in tab.cases[0]])
        self.play(FadeIn(fond, scale=0.95), run_time=0.5)
        pos = self.nombres_apres("Ses résultats", 10)
        for j in range(5):
            self.au_i(pos[2 * j])
            self.play(FadeIn(tab.tetes[j][1], scale=1.6), run_time=0.22)
            self.au_i(pos[2 * j + 1])
            self.play(FadeIn(tab.cases[0][j][1], scale=1.6), run_time=0.22)
        self.au_mot("Étape 1")
        et = self.etape(1, "la moyenne pondérée", 0.7)
        self.play(FadeIn(et, shift=RIGHT * 0.2), run_time=0.4)
        morceaux = []
        for j, (v, e) in enumerate(zip(KM, NB)):
            if j:
                morceaux.append(("+", WHITE))
            morceaux.append((f"{v}×{e}", BLEU_CALCUL))
        prod = self.ligne(morceaux + [("=", WHITE), ("2 030", VERT_OK)], 38, 0.18).move_to(P(-0.4, -0.25))
        for j, m in enumerate(["60 fois 2", "70 fois 5", "80 fois 9", "90 fois 6", "100 fois 3"]):
            self.au_mot(m)
            idx = [0] if j == 0 else [2 * j - 1, 2 * j]
            self.play(*[FadeIn(prod[k], scale=1.4) for k in idx], *tab.allumer_colonne(j), run_time=0.28)
            self.play(*eteindre(tab), run_time=0.12)
        self.au_mot("égale 2 030")
        self.play(FadeIn(prod[-2:], shift=LEFT * 0.2), run_time=0.35)
        self.au_mot("Divisé par 25")
        d = self.ligne([("2 030", VERT_OK), ("÷", WHITE), ("25", BLEU_CALCUL)], 46).move_to(P(-2.8, -1.3))
        self.play(FadeIn(d, shift=UP * 0.2), run_time=0.4)
        self.au_mot("81,2 kilomètres")
        r = self.ligne([("=", WHITE), ("81,2 km", VERT_OK)], 46).next_to(d, RIGHT, buff=0.25)
        self.play(FadeIn(r, scale=1.4), run_time=0.35)
        self.au_mot("C'est plus que 80")
        c1 = self.ligne([("81,2 > 80", VERT_OK), ("critère 1", WHITE)], 42).move_to(P(-1.6, -2.4))
        ok = self.coche(VERT_OK, 0.3).next_to(c1, RIGHT, buff=0.3)
        self.play(FadeIn(c1, shift=UP * 0.2), run_time=0.4)
        self.au_mot("premier critère validé")
        self.play(Create(ok), run_time=0.4)
        self.insister(VGroup(c1, ok), 1.1, 0.3)
        self.attendre_voix()

    # ── 03 : étape 2, la médiane par les effectifs cumulés ──────────────────

    def ecran_mediane(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-mediane")
        tab = self.tableau(cumules=True)
        fond = VGroup(tab.carte, tab.coin, tab.libelles[0], *[t for t in tab.tetes], *[c for c in tab.cases[0]])
        self.add(fond)
        self.au_mot("Étape 2")
        et = self.etape(2, "la médiane", 0.2)
        self.play(FadeIn(et, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Avec 25 batteries")
        r13 = self.ligne([("25", BLEU_CALCUL), ("valeurs : la médiane est la", WHITE)], 38).move_to(P(-0.8, -0.7))
        self.play(FadeIn(r13, shift=UP * 0.2), run_time=0.4)
        self.au_mot("la treizième valeur")
        t13 = self.t("13e", 42, AMBRE).next_to(r13, RIGHT, buff=0.2)
        self.play(FadeIn(t13, scale=1.5), run_time=0.35)
        self.au_mot("Effectifs cumulés")
        self.play(FadeIn(tab.libelles[1]), *[FadeIn(c[0]) for c in tab.cases[1]], run_time=0.4)
        for j, m in enumerate(["2, puis", "7, puis", "16. La"]):
            self.au_mot(m)
            t = texte(CUM[j], 36, VERT_OK if j < 2 else AMBRE).move_to(tab.cases[1][j][0]).set_z_index(4)
            tab.cases[1][j].add(t)
            self.play(FadeIn(t, scale=1.6), *allumer(tab, 1, j), run_time=0.3)
            self.play(*eteindre(tab), run_time=0.12)
        self.au_mot("colonne 80")
        self.play(*tab.allumer_colonne(2), run_time=0.4)
        ex = self.ligne([("7", VERT_OK), ("<", WHITE), ("13e", AMBRE), ("≤", WHITE), ("16", AMBRE)], 40)
        ex.move_to(P(-3.6, -1.6))
        self.play(FadeIn(ex, shift=UP * 0.2), run_time=0.35)
        self.au_mot("la médiane est 80")
        med = self.ligne([("Médiane =", WHITE), ("80 km", VERT_OK)], 46).next_to(ex, RIGHT, buff=0.8)
        self.play(FadeIn(med, scale=0.8), run_time=0.4)
        self.au_mot("Au moins la moitié")
        c2 = self.ligne([("au moins la moitié ≥ 80", VERT_OK), ("critère 2", WHITE)], 40).move_to(P(-1.4, -2.55))
        self.play(FadeIn(c2, shift=UP * 0.2), *eteindre(tab), run_time=0.4)
        self.au_mot("deuxième critère validé")
        ok = self.coche(VERT_OK, 0.3).next_to(c2, RIGHT, buff=0.3)
        self.play(Create(ok), run_time=0.35)
        self.au_mot("Le lot peut partir")
        tampon = VGroup(RoundedRectangle(width=3.6, height=0.9, corner_radius=0.15, stroke_color=VERT_OK,
                                         stroke_width=8),
                        Text("LOT ACCEPTÉ", font_size=40, color=VERT_OK, weight=BOLD)).rotate(0.12)
        tampon.move_to(P(4.6, -0.35))
        tampon[1].move_to(tampon[0])
        self.play(FadeIn(tampon, scale=1.8), run_time=0.4)
        self.attendre_voix()

    # ── 04 : étape 3, l'objectif ────────────────────────────────────────────

    def ecran_objectif(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-objectif")
        et = self.etape(3, "l'objectif", 3.0)
        self.play(FadeIn(et, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("moyenne de 82")
        o = self.ligne([("Moyenne visée :", WHITE), ("82 km", BLEU_CALCUL)], 42).move_to(P(-2.4, 2.0))
        self.play(FadeIn(o, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("vingt-sixième batterie")
        bats = VGroup(*[batterie(0.28, 0.7) for _ in range(25)]).arrange(RIGHT, buff=0.07).move_to(P(-1.3, 0.9))
        b26 = batterie(0.28, 0.0, ORANGE_RETENUE).next_to(bats, RIGHT, buff=0.25)
        q26 = self.t("26e", 30, ORANGE_RETENUE).next_to(b26, UP, buff=0.12)
        self.play(FadeIn(bats), FadeIn(b26, scale=1.5), FadeIn(q26), run_time=0.5)
        self.au_mot("au minimum")
        qm = self.t("au minimum ?", 38, ORANGE_RETENUE).next_to(b26, DOWN, buff=0.3)
        self.play(FadeIn(qm), run_time=0.3)
        self.au_mot("La somme visée")
        sv = self.t("Somme visée :", 40).move_to(P(-4.3, -0.4))
        self.play(FadeIn(sv, shift=RIGHT * 0.2), run_time=0.3)
        c1 = self.ligne([("82", BLEU_CALCUL), ("×", WHITE), ("26", BLEU_CALCUL), ("=", WHITE), ("2 132", VERT_OK)],
                        46).next_to(sv, RIGHT, buff=0.4)
        self.au_mot("82 fois 26")
        self.play(FadeIn(c1[:3], scale=1.3), run_time=0.35)
        self.au_mot("égale 2 132")
        self.play(FadeIn(c1[3:], scale=1.4), run_time=0.35)
        self.au_mot("Il manque")
        im = self.t("Il manque :", 40).move_to(P(-4.4, -1.4))
        self.play(FadeIn(im, shift=RIGHT * 0.2), run_time=0.3)
        c2 = self.ligne([("2 132", VERT_OK), ("−", WHITE), ("2 030", BLEU_CALCUL), ("=", WHITE), ("102", AMBRE)],
                        46).next_to(im, RIGHT, buff=0.4)
        self.au_mot("2 132 moins")
        self.play(FadeIn(c2[:2], scale=1.3), run_time=0.3)
        self.au_mot("2 030, égale")
        self.play(FadeIn(c2[2:4], scale=1.3), run_time=0.3)
        self.au_mot("égale 102")
        self.play(FadeIn(c2[4], scale=1.5), run_time=0.35)
        self.au_mot("au moins 102")
        res = self.ligne([("La 26e :", WHITE), ("au moins 102 km", AMBRE)], 44).move_to(P(-0.8, -2.5))
        jus = batterie(0.28, 1.0, AMBRE).move_to(b26)
        self.play(FadeIn(res, shift=UP * 0.2), Create(self.encadrer(res, AMBRE)), Transform(b26, jus), FadeOut(qm),
                  run_time=0.6)
        self.attendre_voix()

    # ── 05 : défi, deux chaînes de montage ──────────────────────────────────

    def chaine(self, nom, couleur, n_txt, m_txt, centre):
        boite = RoundedRectangle(width=3.6, height=2.3, corner_radius=0.2, stroke_color=couleur, stroke_width=5,
                                 fill_color=couleur, fill_opacity=0.12).move_to(centre)
        t = self.t(nom, 38, couleur).move_to(boite.get_top() + DOWN * 0.4)
        n = self.t(n_txt, 34).move_to(boite.get_center() + DOWN * 0.1)
        m = self.t(m_txt, 34).move_to(boite.get_center() + DOWN * 0.7)
        return VGroup(boite, t, n, m)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("05-defi")
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer", 52, JAUNE_TITRE).to_edge(UP, buff=0.35)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("deux chaînes de montage")
        A = self.chaine("Chaîne A", "#38bdf8", "30 batteries", "moyenne 85 km", P(-4.2, 1.0))
        B = self.chaine("Chaîne B", "#f472b6", "? batteries", "moyenne ?", P(-0.2, 1.0))
        self.play(FadeIn(A[0]), FadeIn(A[1]), FadeIn(B[0]), FadeIn(B[1]), run_time=0.5)
        self.au_mot("30 batteries")
        self.play(FadeIn(A[2], scale=1.3), run_time=0.3)
        self.au_mot("moyenne de 85")
        self.play(FadeIn(A[3], scale=1.3), run_time=0.3)
        self.au_mot("Les deux chaînes ensemble")
        E = self.chaine("Ensemble", VERT_OK, "50 batteries", "moyenne 82 km", P(3.9, 1.0))
        plus = self.t("+", 60).move_to(P(-2.2, 1.0))
        egal = self.t("=", 60).move_to(P(1.85, 1.0))
        self.play(FadeIn(E[0]), FadeIn(E[1]), FadeIn(plus), FadeIn(egal), run_time=0.5)
        self.au_mot("50 batteries")
        self.play(FadeIn(E[2], scale=1.3), run_time=0.3)
        self.au_mot("moyenne de 82")
        self.play(FadeIn(E[3], scale=1.3), run_time=0.3)
        self.au_mot("la moyenne de la chaîne B")
        self.play(FadeIn(B[2]), FadeIn(B[3]), Indicate(B[3], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.6)
        q = self.ligne([("Moyenne de la chaîne B", WHITE), ("?", ORANGE_RETENUE)], 44).move_to(P(-0.4, -1.2))
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 42, ORANGE_RETENUE).move_to(P(-0.4, -2.3))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("05b-correction")
        tit = self.t("Correction", 50, JAUNE_TITRE).to_edge(UP, buff=0.3)
        self.play(Write(tit), run_time=0.5)
        Y = [2.35, 1.4, 0.45, -0.5, -1.45]
        V = VERT_OK
        lignes = [
            [("Chaîne B :", "#f472b6"), ("50 − 30 =", BLEU_CALCUL), ("20", V), ("batteries", WHITE)],
            [("Total des 50 :", V), ("82 × 50 =", BLEU_CALCUL), ("4 100", V)],
            [("Total de A :", "#38bdf8"), ("85 × 30 =", BLEU_CALCUL), ("2 550", V)],
            [("Reste pour B :", "#f472b6"), ("4 100 − 2 550 =", BLEU_CALCUL), ("1 550 km", V)],
            [("Moyenne de B :", "#f472b6"), ("1 550 ÷ 20 =", BLEU_CALCUL), ("77,5 km", V)],
        ]
        objs = [self.ligne(l, 40).move_to(P(0, y)).align_to(P(-6.3, 0), LEFT) for l, y in zip(lignes, Y)]
        mots = ["50 moins 30", "82 fois 50", "85 fois 30", "4 100 moins", "1 550 divisé"]
        fins = ["soit 20", "égale 4 100", "égale 2 550", "égale 1 550", "égale 77,5"]
        for o, m, f in zip(objs, mots, fins):
            self.au_mot(m)
            self.play(FadeIn(o[0], shift=RIGHT * 0.2), FadeIn(o[1], shift=RIGHT * 0.2), run_time=0.4)
            self.au_mot(f)
            self.play(*[FadeIn(k, scale=1.3) for k in o[2:]], run_time=0.35)
        self.play(Create(self.encadrer(objs[4])), run_time=0.4)
        self.au_mot("Le piège")
        pg = self.ligne([("Le piège :", ROUGE_ERREUR), ("79", ROUGE_ERREUR)], 42).move_to(P(-4.0, -2.55))
        self.au_mot("répondre 79")
        x = croix(pg[1], sw=6)
        self.play(FadeIn(pg, shift=UP * 0.2), run_time=0.35)
        self.play(Create(x), run_time=0.3)
        self.au_mot("le même nombre")
        pas = self.bloc(["les chaînes n'ont pas", "le même effectif !"], 32, ORANGE_RETENUE).next_to(pg, RIGHT, buff=0.5)
        self.play(FadeIn(pas, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 06 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-finale")
        tab = self.tableau(cumules=False, centre=P(-3.6, 0.2))
        tab.scale(0.62).move_to(P(-3.7, 0.0))
        self.add(tab)
        textes = [("Décider : moyenne pondérée", "et médiane (cumulés)."), ("Somme = moyenne × effectif :", "la valeur manquante."),
                  ("Deux groupes de tailles", "différentes : on pondère.")]
        lignes = self.finale(textes, [1.75, 0.2, -1.35], fs=32)
        self.au_mot("Pour décider")
        self.montrer_ligne(lignes[0], Indicate(tab, color=AMBRE, scale_factor=1.04))
        self.au_mot("La somme, c'est")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et deux groupes")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_moyenne()
        self.ecran_mediane()
        self.ecran_objectif()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("07-abonne")


class StatsDefi3e(StatsDefiBase):
    identite = "Maths 3e — EleveAI"
    ceinture = "bleue"
