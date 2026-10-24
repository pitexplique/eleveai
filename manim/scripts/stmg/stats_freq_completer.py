# stats_freq_completer.py
# EleveAI — Maths STMG — série « Statistiques », épisode 11 « COMPLÉTER UN
# TABLEAU AVEC DES FRÉQUENCES » (micro du coach don_freq_completer : « Compléter
# un tableau croisé en utilisant des fréquences conditionnelles », notion
# donnees_frequences). AVEC VOIX. Paysage 16:9.
# CEINTURE VERTE : la paysage complète du niveau (effectif = fréquence ×
# référence, la case voisine par différence, remonter à la référence par une
# division, l'effectif approché quand le pourcentage est arrondi).
# Short jumeau : stats_freq_completer_short.py (ORANGE).
#
# ⭐ Décor et métier : l'AUTOMOBILE ÉLECTRIQUE ; une RESPONSABLE DES VENTES d'une
# concession (problématique : retrouver des effectifs à partir de pourcentages).
# Centres d'intérêt : transports, technologie-ia.
# ⭐ DONNÉES RÉELLES (lues le 24/10/2026) : SDES (ministère de la Transition
# écologique), « Immatriculations des voitures particulières en 2024 : baisse
# dans le neuf et léger rebond pour l'occasion »,
# https://www.statistiques.developpement-durable.gouv.fr/immatriculations-des-voitures-particulieres-en-2024-baisse-dans-le-neuf-et-leger-rebond-pour
# 2024 : 1,755 million de voitures neuves, 295 600 électriques (16,8 %) ;
# 2023 : 1,817 million, 303 900 électriques (16,7 %).
# Tableau (milliers) complété PAR LE CALCUL, une COLONNE par année : Électriques
# 303 | 295 | 598 ; Autres 1 514 | 1 460 | 2 974 ; Total 1 817 | 1 755 | 3 572.
# Calculs : 1 755 × 0,168 = 294,84 ≈ 295 · 1 817 × 0,167 = 303,4 ≈ 303 ·
# 303,9 ÷ 0,167 = 1 819,8 ≈ 1 820 · 295,6 ÷ 0,168 = 1 759,5 ≈ 1 760 ; leurres :
# 1 817 ÷ 0,167 ≈ 10 880 (division), 1 817 × 16,7 ≈ 30 344 (oubli du ÷ 100),
# 295,6 × 0,168 ≈ 50, 295,6 + 16,8 ≈ 312.
#
# Mapping micro → écrans (banque stmg donnees-croisees) : tpl_1 (effectif =
# fréquence × référence) → 03, 04, question 05, défi · tpl_2 (remonter à la
# population de référence : effectif ÷ fréquence) → 07, question 08 ·
# 06 le conseil du statisticien (pourcentage arrondi → effectif approché).
# Écrans : 00 garde · 01 la responsable des ventes · 02 le tableau · 03 la
# méthode (1 755 × 0,168) · 04 la case voisine · 05 QUESTION (2023) · 06 le
# conseil du statisticien · 07 dans l'autre sens · 08 QUESTION (remonter) ·
# 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/stmg-stats-freq-completer.json (débit −7) ; marques :
# manim/scripts/stmg/stats_freq_completer_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_freq_completer.py StatsFreqCompleterStmg -o eleveai-maths-stmg-stats-freq-completer --media_dir manim/scripts/stmg/media-stats-freq-completer-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/11-freq-completer/eleveai-maths-stmg-stats-freq-completer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_i2_commun import *  # noqa: E402,F403

COLONNES = ["2023", "2024", "Total"]
LIGNES = ["Électriques", "Autres", "Total"]
VALS = [["303", "295", "598"], ["1 514", "1 460", "2 974"], ["1 817", "1 755", "3 572"]]
TITRE = "Voitures neuves (en milliers)"
VIDES = {(0, 0), (1, 0), (0, 1), (1, 1), (0, 2), (1, 2), (2, 2)}


def voiture(l=2.0, couleur="#38bdf8", eclair=True):
    """Une voiture vue de côté ; un éclair vert si elle est électrique."""
    caisse = RoundedRectangle(width=l, height=0.32 * l, corner_radius=0.08 * l, fill_color=couleur,
                              fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    cab = Polygon(P(-0.28 * l, 0.16 * l), P(-0.16 * l, 0.36 * l), P(0.18 * l, 0.36 * l), P(0.32 * l, 0.16 * l),
                  fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    vitre = Polygon(P(-0.22 * l, 0.17 * l), P(-0.13 * l, 0.32 * l), P(0.15 * l, 0.32 * l), P(0.25 * l, 0.17 * l),
                    fill_color="#0f172a", fill_opacity=1, stroke_width=0)
    roues = VGroup(*[Circle(radius=0.11 * l, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B,
                            stroke_width=3).move_to(P(x * l, -0.16 * l)) for x in (-0.3, 0.3)])
    g = VGroup(caisse, cab, vitre, roues)
    if eclair:
        e = Polygon(P(0.02, 0.14), P(-0.08, -0.02), P(0.0, -0.02), P(-0.04, -0.16), P(0.09, 0.03), P(0.01, 0.03),
                    fill_color="#4ade80", fill_opacity=1, stroke_width=0).scale(l * 0.9).move_to(caisse)
        g.add(e)
    return g


class StatsFreqCompleterBase(PaysageI2):
    nom_voix = "stmg-stats-freq-completer"
    fichier_marques = "stats_freq_completer_marques.json"

    def tableau(self, vides=VIDES, trous=(), centre=None, **kw):
        opts = dict(titre=TITRE, largeur_case=1.6, largeur_libelle=2.4, hauteur=0.86, fs=32)
        opts.update(kw)
        t = croise_i2(COLONNES, LIGNES, VALS, trous=trous, vides=vides, **opts)
        return self.placer_tab(t) if centre is None else t.move_to(centre)

    def tab_pret(self, vides=VIDES, trous=()):
        t = self.tableau(vides, trous)
        self.add(t)
        return t

    def den_case(self, t, r, c):
        return t.case(r, c).animate.set_fill(REF).set_stroke(C_DEN, width=8)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Compléter avec des fréquences", self.identite, self.ceinture)
        v = voiture(2.2).move_to(P(-2.6, 0.1))
        pc = self.t("16,8 %", 56, AMBRE).move_to(P(0.6, 0.15))
        fl = Arrow(P(1.7, 0.15), P(2.9, 0.15), color=WHITE, buff=0)
        q = self.t("?", 70, ORANGE_RETENUE).move_to(P(3.4, 0.15))
        self.au_mot("Compléter un tableau")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(v, shift=RIGHT * 0.4),
                  run_time=0.7)
        self.au_mot("Un pourcentage")
        self.play(FadeIn(pc, scale=0.7), run_time=0.4)
        self.au_mot("redonner un effectif")
        self.play(GrowArrow(fl), FadeIn(q, scale=0.5), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : la responsable des ventes ──────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        v = voiture(2.6).move_to(P(-4.0, 1.2))
        self.play(FadeIn(v, shift=RIGHT * 0.5), run_time=0.5)
        self.au_mot("1 755 000")
        nb = VGroup(self.t("1 755 000", 54, JAUNE_TITRE), self.t("voitures neuves", 38)).arrange(DOWN, buff=0.15)
        nb.move_to(P(-4.0, -0.8))
        self.play(FadeIn(nb, scale=0.7), run_time=0.5)
        self.au_mot("Une responsable des ventes")
        metier = self.col(self.t("Responsable des ventes", 42, BLEU_CALCUL), 2.7, xl=0.9)
        lieu = self.col(self.t("concession automobile", 32), 2.0, xl=0.9)
        self.play(FadeIn(metier, shift=UP * 0.2), FadeIn(lieu), run_time=0.5)
        self.au_mot("combien étaient électriques")
        q = self.col(self.ligne([("combien", WHITE), ("électriques", "#4ade80"), ("?", ORANGE_RETENUE)], 38), 0.9,
                     xl=0.9)
        self.play(FadeIn(q, shift=RIGHT * 0.2), Indicate(v[-1], color="#4ade80", scale_factor=1.6), run_time=0.6)
        self.au_mot("que des pourcentages")
        pcs = self.col(self.ligne([("%", AMBRE), ("%", AMBRE), ("%", AMBRE)], 60, buff=0.5), -0.3, xl=0.9)
        self.play(FadeIn(pcs, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le tableau ─────────────────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        t = self.tableau()
        self.au_mot("Voici son tableau")
        self.play(FadeIn(t, shift=UP * 0.2), run_time=0.6)
        self.au_mot("1 817 en 2023")
        self.play(*allumer(t, 2, 0), run_time=0.4)
        self.au_mot("1 755 en 2024")
        self.play(*allumer(t, 2, 1), run_time=0.4)
        self.au_mot("Les cases sont vides")
        self.play(*[Indicate(t.case(r, c), color=ORANGE_RETENUE, scale_factor=1.15) for r, c in
                    [(0, 0), (1, 0), (0, 1), (1, 1)]], run_time=0.7)
        self.au_mot("16,8 %")
        info = self.calc(self.bloc(["2024 :", "16,8 % d'électriques"], 40), 1.7)
        info[1][:6].set_color(AMBRE)
        self.play(FadeIn(info, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 03 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-methode")
        t = self.tab_pret()
        self.au_mot("la colonne 2024")
        self.play(*ref_colonne(t, 1), self.den_case(t, 2, 1), run_time=0.5)
        ref = self.calc(self.ligne([("référence :", C_DEN), ("1 755", C_DEN)], 38), 2.75)
        self.play(FadeIn(ref, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("1 755 fois 0,168")
        cc = self.calc(self.ligne([("1 755", C_DEN), ("×", WHITE), ("0,168", AMBRE), ("≈", WHITE), ("295", VERT_OK)], 48), 1.75)
        c, r = cc[:3], cc[3:]
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égale environ 295")
        self.play(FadeIn(r, scale=0.7), remplir(t, 0, 1, "295"), *num_case(t, 0, 1), run_time=0.5)
        self.insister(r[1], 1.35, 0.25)
        self.au_mot("Effectif égale")
        reg = self.calc(self.bloc(["effectif =", "fréquence × référence"], 40, JAUNE_TITRE), 0.45)
        self.play(FadeIn(reg, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Environ 295 000")
        e = self.calc(self.ligne([("≈ 295 000", VERT_OK), ("électriques", WHITE)], 38), -0.85)
        self.play(FadeIn(e, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 04 : la case voisine ────────────────────────────────────────────────

    def ecran_difference(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-difference")
        t = self.tab_pret(VIDES - {(0, 1)})
        self.au_mot("La case du dessous")
        self.play(*teinter_colonne(t, 1, "#bbf7d0"), Indicate(t.case(1, 1), color=ORANGE_RETENUE), run_time=0.6)
        self.au_mot("1 755 moins 295")
        cc = self.calc(self.ligne([("1 755 − 295", WHITE), ("=", WHITE), ("1 460", VERT_OK)], 48), 1.6)
        c, r = cc[:1], cc[1:]
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 1 460")
        self.play(FadeIn(r, scale=0.7), remplir(t, 1, 1, "1 460"), *allumer(t, 1, 1), run_time=0.5)
        self.au_mot("voitures non électriques")
        n = self.calc(self.t("voitures non électriques", 36, GREY_A), 0.7)
        self.play(FadeIn(n, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (2023) ──────────────────────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t = self.tab_pret(VIDES - {(0, 1), (1, 1)})

        def montrer():
            self.play(*ref_colonne(t, 0), self.den_case(t, 2, 0), run_time=0.4)
            self.play(remplir(t, 0, 0, "303"), *num_case(t, 0, 0), run_time=0.5)

        self.question_pause("05-question", "05b-reponse", ["2023 : 16,7 % des", "1 817 milliers. Combien ?"],
                            ["≈ 303", "≈ 10 880", "≈ 30 344"], 0, ["1 817 × 0,167 ≈ 303", "B : ÷ ; C : oubli du ÷ 100"],
                            x0=self.XL + 0.3, largeur=4.9, ys=(1.0, 0.1, -0.8), geste=montrer)

    # ── 06 : le conseil du statisticien ─────────────────────────────────────

    def ecran_statisticien(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-statisticien")
        tit = self.t("Le conseil du statisticien", 48, JAUNE_TITRE).move_to(P(0, 2.95))
        self.play(Write(tit), run_time=0.6)
        self.au_mot("le ministère a compté")
        entetes = VGroup(self.t("", 36), self.t("Ministère", 36, GREY_A), self.t("Notre calcul", 36, GREY_A))
        lignes = [("2023", "303 900", "≈ 303 000"), ("2024", "295 600", "≈ 295 000")]
        grille = VGroup(entetes, *[VGroup(self.t(a, 38, AMBRE), self.t(b, 42), self.t(c, 42, C_DEN))
                                    for a, b, c in lignes])
        for i, rang in enumerate(grille):
            for j, m in enumerate(rang):
                m.move_to(P(-4.6 + 3.6 * j, 1.75 - 0.9 * i))
        self.play(FadeIn(entetes[1]), FadeIn(grille[1][:2]), run_time=0.4)
        self.au_mot("et 295 600")
        self.play(FadeIn(grille[2][:2]), run_time=0.4)
        self.au_mot("Notre calcul donne un peu moins")
        self.play(FadeIn(entetes[2]), FadeIn(grille[1][2]), FadeIn(grille[2][2]), run_time=0.5)
        self.au_mot("arrondi au dixième")
        a = self.ligne([("16,8 %", AMBRE), ("est", WHITE), ("arrondi", ORANGE_RETENUE)], 40).move_to(P(-0.4, -0.85))
        self.play(FadeIn(a, shift=UP * 0.2), run_time=0.5)
        self.au_mot("un effectif approché")
        r = self.ligne([("→", WHITE), ("un effectif approché :", VERT_OK), ("≈", VERT_OK)], 42).move_to(P(-0.4, -1.85))
        self.play(FadeIn(r, scale=0.8), run_time=0.5)
        self.insister(r[2], 1.6, 0.25)
        self.attendre_voix()

    # ── 07 : dans l'autre sens ──────────────────────────────────────────────

    def ecran_inverse(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-inverse")
        t = self.tab_pret(VIDES - {(0, 1), (1, 1), (0, 0)})
        self.au_mot("Et dans l'autre sens")
        tit = self.calc(self.t("Dans l'autre sens", 44, ORANGE_RETENUE), 2.8)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Si 303,9 milliers")
        d = self.calc(self.ligne([("303,9", AMBRE), ("=", WHITE), ("16,7 %", AMBRE), ("de", WHITE), ("?", C_DEN)], 44), 1.95)
        self.play(FadeIn(d[:1], shift=RIGHT * 0.2), Indicate(t.case(0, 0), color=AMBRE), run_time=0.5)
        self.au_mot("c'est 16,7 %")
        self.play(FadeIn(d[1:3], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("combien de voitures en tout")
        self.play(FadeIn(d[3:], shift=RIGHT * 0.2), Indicate(t.case(2, 0), color=C_DEN), run_time=0.5)
        self.au_mot("je divise")
        reg = self.calc(self.bloc(["référence =", "effectif ÷ fréquence"], 38, JAUNE_TITRE), 0.95)
        self.play(FadeIn(reg, shift=UP * 0.2), run_time=0.5)
        self.au_mot("303,9 divisé par 0,167")
        cc = self.calc(self.ligne([("303,9 ÷ 0,167", WHITE), ("≈", WHITE), ("1 820", VERT_OK)], 46), -0.25)
        c, r = cc[:1], cc[1:]
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale environ 1 820")
        self.play(FadeIn(r, scale=0.7), run_time=0.4)
        self.au_mot("On retrouve presque")
        self.play(*allumer(t, 2, 0, couleur="#bbf7d0", anneau=VERT_OK), run_time=0.4)
        k = self.calc(self.ligne([("≈ 1 817", VERT_OK), ("du tableau", WHITE)], 36), -1.2)
        self.play(FadeIn(k, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (remonter à la référence) ───────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.question_large("08-question", "08b-reponse",
                            ["2024 : 295,6 milliers de voitures électriques,", "soit 16,8 % des ventes. Combien en tout ?"],
                            ["≈ 1 760 milliers", "≈ 50 milliers", "≈ 312 milliers"], 0,
                            ["295,6 ÷ 0,168 ≈ 1 760", "B a multiplié ; C a ajouté le %"])

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        t = self.tab_pret({(1, 0), (2, 2)}, trous={(0, 2), (1, 2)})
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("1 817 moins 303")
        c = self.calc(self.ligne([("1 817 − 303 = 1 514", WHITE)], 36), 2.05)
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.play(remplir(t, 1, 0, "1 514"), *allumer(t, 1, 0), run_time=0.4)
        self.au_mot("Un : le total")
        q1 = self.col(self.bloc(["1. Total des", "électriques ?"], 38), 1.0)
        q1[0][:2].set_color(AMBRE)
        self.play(*eteindre(t), FadeIn(q1, shift=RIGHT * 0.2), Indicate(t.texte_case(0, 2), scale_factor=1.6),
                  run_time=0.5)
        self.au_mot("Deux : le total")
        q2 = self.col(self.bloc(["2. Total des", "autres voitures ?"], 38), -0.35)
        q2[0][:2].set_color(AMBRE)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), Indicate(t.texte_case(1, 2), scale_factor=1.6), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.pause_defi(-1.5)), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        t = self.tab_pret({(2, 2)}, trous={(0, 2), (1, 2)})
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("303 plus 295")
        c1 = self.calc(self.ligne([("1.", AMBRE), ("303 + 295", WHITE), ("=", WHITE), ("598", VERT_OK)], 42), 1.8)
        self.play(*teinter_ligne(t, 0, REF), FadeIn(c1[:2], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 598")
        self.play(FadeIn(c1[2:], scale=0.7), remplir(t, 0, 2, "598"), *allumer(t, 0, 2), run_time=0.5)
        self.au_mot("1 514 plus 1 460")
        self.play(*eteindre(t), run_time=0.2)
        c2 = self.calc(self.ligne([("2.", AMBRE), ("1 514 + 1 460", WHITE), ("=", WHITE), ("2 974", VERT_OK)], 42), 0.8)
        self.play(*teinter_ligne(t, 1, REF), FadeIn(c2[:2], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 2 974")
        self.play(FadeIn(c2[2:], scale=0.7), remplir(t, 1, 2, "2 974"), *allumer(t, 1, 2), run_time=0.5)
        self.au_mot("Contrôle")
        self.play(*eteindre(t), run_time=0.2)
        self.play(*teinter_colonne(t, 2, "#bbf7d0"), run_time=0.3)
        self.au_mot("598 plus 2 974")
        k = self.calc(self.ligne([("598 + 2 974 = 3 572", WHITE)], 38), -0.25)
        self.play(FadeIn(k, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 3 572")
        ok = self.coche(VERT_OK, 0.28).next_to(k, DOWN, buff=0.25).align_to(k, LEFT)
        self.play(remplir(t, 2, 2, "3 572"), *allumer(t, 2, 2), Create(ok), run_time=0.5)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        t = self.placer_tab(self.tableau(vides=set()), haut=2.7)
        self.add(t)
        lignes = self.finale([("effectif =", "fréquence × référence"),
                              ("référence =", "effectif ÷ fréquence"),
                              ("% arrondi →", "effectif approché (≈)")], [1.75, 0.2, -1.35], fs=38)
        self.au_mot("Effectif égale")
        self.montrer_ligne(lignes[0], *ref_colonne(t, 1), *num_case(t, 0, 1))
        self.au_mot("Pour retrouver la population")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et un pourcentage arrondi")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_methode()
        self.ecran_difference()
        self.ecran_question1()
        self.ecran_statisticien()
        self.ecran_inverse()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsFreqCompleterStmg(StatsFreqCompleterBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
