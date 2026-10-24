# stats_tab_completer.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# épisode « COMPLÉTER UN TABLEAU CROISÉ » (1re 05, STMG 07). Micros du coach :
# 1re info_tab_completer (« marges et total ») ⇄ STMG don_tab_completer (« par
# des raisonnements sur les effectifs »). AVEC VOIX. Paysage 16:9.
# CEINTURE VERTE dans les deux classes : la paysage complète du niveau (marges =
# sommes, case = différence, deux trous dans une ligne → passer par la colonne).
# Short jumeau : stats_tab_completer_short.py (blanche).
#
# ⭐ Décor et métier : l'ESPACE ; une INGÉNIEURE SPATIALE, à Kourou, compare les
# lancements orbitaux réussis et ratés (problématique : contrôler, retrouver).
# Source : Wikipédia « 2024 in spaceflight », tableau « By country » (lu le
# 24/10/2026) : 261 lancements orbitaux, 253 réussis, 6 échecs, 2 échecs partiels.
# États-Unis 156 (155 réussis, 1 échec) · Chine 68 (65, 2 échecs + 1 partiel) ·
# Russie 17 (17, 0) · autres 20 (France 1 partiel, Inde 5, Iran 4, Italie 2,
# Japon 7 dont 2 échecs, Corée du Nord 1 échec → 16 réussis, 4 ratés).
# « Ratés » = échecs + échecs partiels. Totaux 253 | 8 | 261.
# Centres d'intérêt : espace, technologie-ia.
#
# Mapping micro → écrans (banques 1re information-chiffree, STMG
# donnees-croisees) : une marge = une somme (info_tab_completer_marge) → 02, 04 ·
# une case = total − cases connues (info_tab_completer_case, don_tab_completer_tpl_1)
# → 03, défi · deux trous dans une ligne, passer par la colonne
# (info_tab_completer_deux, don_tab_completer_tpl_2) → questions 1 et 2 · le
# total général n'est pas la somme de tout le tableau → 06 piège.
# Écrans : 00 garde · 01 Kourou, 261 lancements · 02 la règle d'or · 03 une case
# (autres pays) · 04 une marge, et son contrôle · 05 question 1 (ratés de la
# Chine) · 07 question 2 (total de la Chine) · 06 le piège (marges comptées deux
# fois) · 08 défi · 08b correction · 09 ce que tu as appris · 10 fin.
# (Les deux questions se suivent : la ligne Chine se complète en deux temps, et
# le piège a besoin de ses 68.)
#
# Voix : manim/voix/lycee-stats-tab-completer.json (débit −7) ; calage :
# manim/scripts/stmg/stats_tab_completer_marques.json. UNE voix, DEUX rendus.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_tab_completer.py StatsTabCompleterPremiere -o eleveai-maths-premiere-commun-stats-tab-completer --media_dir manim/scripts/stmg/media-stats-tab-completer-premiere
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_tab_completer.py StatsTabCompleterStmg -o eleveai-maths-stmg-stats-tab-completer --media_dir manim/scripts/stmg/media-stats-tab-completer-stmg
# Sorties : manim/sorties/premiere-commun/maths/statistiques/05-tab-completer/
#           manim/sorties/stmg/maths/statistiques/07-tab-completer/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F403

COLONNES = ["Réussis", "Ratés", "Total"]
PAYS = ["États-Unis", "Chine", "Russie", "Autres", "Total"]
VALS = [[155, 1, 156], [65, 3, 68], [17, 0, 17], [16, 4, 20], [253, 8, 261]]
TROUS = {(1, 1), (1, 2), (3, 0), (4, 0)}


def fusee(h=1.6):
    """Une fusée : corps blanc, nez rouge, ailerons, hublot, flamme."""
    corps = RoundedRectangle(width=0.36 * h, height=0.9 * h, corner_radius=0.08 * h, fill_color=WHITE,
                             fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
    nez = Polygon(corps.get_corner(UL), corps.get_corner(UR), corps.get_top() + UP * 0.3 * h, fill_color="#dc2626",
                  fill_opacity=1, stroke_width=0)
    hublot = Circle(radius=0.07 * h, fill_color="#38bdf8", fill_opacity=1, stroke_color=GREY_D,
                    stroke_width=2).move_to(corps.get_center() + UP * 0.18 * h)
    ail = VGroup(*[Polygon(corps.get_corner(s + DOWN), corps.get_corner(s + DOWN) + s * 0.18 * h,
                           corps.get_corner(s + DOWN) + UP * 0.3 * h, fill_color="#dc2626", fill_opacity=1,
                           stroke_width=0) for s in (LEFT, RIGHT)])
    flamme = Polygon(corps.get_corner(DL) + RIGHT * 0.05 * h, corps.get_corner(DR) + LEFT * 0.05 * h,
                     corps.get_bottom() + DOWN * 0.45 * h, fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0)
    return VGroup(flamme, ail, corps, nez, hublot)


class StatsTabCompleterBase(PaysageLycee):
    nom_voix = "lycee-stats-tab-completer"
    fichier_marques = "stats_tab_completer_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"
    XL = 1.0

    def tableau(self, trous=TROUS, centre=None, **kw):
        lignes = [["?" if (r, c) in trous else v for c, v in enumerate(rang)] for r, rang in enumerate(VALS)]
        opts = dict(libelles=PAYS, coin="", largeur_case=1.45, largeur_libelle=1.9, hauteur=0.78, fs=28,
                    titre="Lancements orbitaux 2024", centre=ORIGIN if centre is None else centre)
        opts.update(kw)
        t = textes_devant(Tableau(COLONNES, lignes, **opts))
        return caser(t, -6.6, 0.6, -3.3, 3.0) if centre is None else t

    def tab_pret(self, trous=TROUS):
        t = self.tableau(trous)
        self.add(t)
        return t

    def calcul(self, morceaux, y, fs=44):
        return self.col(self.ligne(morceaux, fs), y)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Compléter un tableau croisé", self.identite, self.ceinture)
        t = self.tableau(centre=P(-0.6, -0.05), largeur_case=1.0, largeur_libelle=1.3, fs=18, hauteur=0.42,
                         titre=None)
        self.au_mot("Compléter un tableau croisé")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(t, scale=0.9), run_time=0.7)
        self.au_mot("peut-on les retrouver")
        self.play(*[Indicate(t.texte_case(r, c), color=ORANGE_RETENUE, scale_factor=1.8) for r, c in TROUS],
                  run_time=0.8)
        self.attendre_voix(marge=0.8)

    # ── 01 : Kourou, 261 lancements ─────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        f = fusee(1.8).move_to(P(-4.6, -1.2))
        etoiles = VGroup(*[Dot(P(x, y), radius=0.03, color=WHITE) for x, y in
                           ((-6, 2.6), (-5.2, 1.9), (-3.4, 2.9), (-2.6, 1.4), (-6.2, 0.6), (-3.0, 0.2), (-4.0, 2.2))])
        self.au_mot("261 fusées")
        nb = self.ligne([("261", JAUNE_TITRE), ("lancements", WHITE)], 44).move_to(P(-3.6, -3.0))
        self.play(FadeIn(etoiles), FadeIn(f), FadeIn(nb, scale=0.7), run_time=0.6)
        self.play(f.animate.shift(UP * 2.6), run_time=1.2, rate_func=rush_into)
        self.au_mot("un record")
        rec = self.t("un record !", 36, ORANGE_RETENUE).next_to(nb, UP, buff=0.2)
        self.play(FadeIn(rec, scale=0.6), run_time=0.4)
        self.au_mot("Une ingénieure spatiale")
        metier = self.col(self.t("Ingénieure spatiale", 44, BLEU_CALCUL), 2.7, xl=0.6)
        lieu = self.col(self.t("à Kourou", 36), 2.0, xl=0.6)
        self.play(FadeIn(metier, shift=UP * 0.2), FadeIn(lieu), run_time=0.5)
        self.au_mot("réussis et ratés")
        t = self.tableau(centre=P(3.5, -0.9), largeur_case=0.95, largeur_libelle=1.25, fs=18, hauteur=0.42,
                         titre=None)
        self.play(FadeIn(t, shift=UP * 0.2), run_time=0.5)
        self.au_mot("des cases manquent")
        self.play(*[Indicate(t.texte_case(r, c), color=ORANGE_RETENUE, scale_factor=2) for r, c in TROUS],
                  run_time=0.8)
        self.attendre_voix()

    # ── 02 : la règle d'or ──────────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-regle")
        t = self.tableau()
        self.au_mot("La règle d'or")
        t0 = self.col(self.t("La règle d'or", 46, JAUNE_TITRE), 3.0)
        self.play(FadeIn(t, scale=0.95), FadeIn(t0, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("les marges sont des sommes")
        r1 = self.col(self.ligne([("marges", VERT_OK), ("=", WHITE), ("sommes", WHITE)], 44), 2.1)
        bords = [(r, 2) for r in range(5)] + [(4, c) for c in range(2)]
        self.play(FadeIn(r1, shift=RIGHT * 0.2), *teinter(t, bords, "#bbf7d0"), run_time=0.6)
        self.au_mot("Chaque ligne s'additionne")
        self.play(*eteindre(t), run_time=0.2)
        fl = fleche_ligne(t, 0, 2)
        ex = self.col(self.ligne([("ligne", AMBRE), ("→", WHITE), ("son total", WHITE)], 38), 1.15)
        self.play(*teinter_ligne(t, 0), GrowArrow(fl), FadeIn(ex, shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("et chaque colonne aussi")
        fc = fleche_colonne(t, 1, 4)
        self.play(FadeOut(fl), *eteindre(t), run_time=0.2)
        self.play(*teinter_colonne(t, 1, BLEU_PALE), GrowArrow(fc), run_time=0.6)
        self.au_mot("Une case manquante")
        self.play(FadeOut(fc), *eteindre(t), run_time=0.2)
        r2 = self.col(self.bloc(["case manquante :", "une soustraction"], 40, AMBRE), -0.1)
        self.play(FadeIn(r2, shift=RIGHT * 0.2),
                  *[Indicate(t.texte_case(r, c), color=ORANGE_RETENUE, scale_factor=1.8) for r, c in TROUS],
                  run_time=0.7)
        self.insister(r2, 1.1, 0.3)
        self.attendre_voix()

    # ── 03 : une case (les autres pays) ─────────────────────────────────────

    def ecran_case(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-case")
        t = self.tab_pret()
        self.au_mot("Les autres pays")
        self.play(*teinter_ligne(t, 3), run_time=0.4)
        self.au_mot("20 lancements en tout")
        self.play(*allumer(t, 3, 2), run_time=0.4)
        self.au_mot("dont 4 ratés")
        self.play(Indicate(t.cases[3][1], color=AMBRE, scale_factor=1.3), run_time=0.5)
        self.au_mot("20 moins 4")
        c = self.calcul([("20", WHITE), ("−", WHITE), ("4", WHITE)], 1.6, 52)
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 16")
        eg = self.ligne([("=", WHITE), ("16", VERT_OK)], 52).next_to(c, RIGHT, buff=0.25)
        self.play(FadeIn(eg, scale=0.7), remplir(t, 3, 0, 16), *allumer(t, 3, 0), run_time=0.5)
        self.insister(eg[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 04 : une marge, et son contrôle ─────────────────────────────────────

    def ecran_marge(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-marge")
        t = self.tab_pret({(1, 1), (1, 2), (4, 0)})
        self.au_mot("Le total des réussis")
        self.play(*teinter_colonne(t, 0, BLEU_PALE), run_time=0.4)
        self.au_mot("155 plus 65")
        c = self.calcul([("155", WHITE), ("+", WHITE), ("65", WHITE)], 2.6, 44)
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("plus 17, plus 16")
        c2 = self.ligne([("+", WHITE), ("17", WHITE), ("+", WHITE), ("16", WHITE)], 44).next_to(c, RIGHT, buff=0.2)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 253")
        eg = self.calcul([("=", WHITE), ("253", VERT_OK)], 1.85, 44)
        self.play(FadeIn(eg, scale=0.7), remplir(t, 4, 0, 253), *allumer(t, 4, 0), run_time=0.5)
        self.au_mot("par l'autre sens")
        self.play(*eteindre(t), run_time=0.2)
        self.play(*teinter_ligne(t, 4), run_time=0.4)
        self.au_mot("261 moins 8")
        k = self.calcul([("261", WHITE), ("−", WHITE), ("8", WHITE), ("=", WHITE), ("253", VERT_OK)], 0.75, 44)
        self.play(FadeIn(k, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Les deux calculs sont d'accord")
        ok = self.coche(VERT_OK, 0.3).next_to(k, RIGHT, buff=0.3)
        self.play(Create(ok), *allumer(t, 4, 0), run_time=0.5)
        self.insister(VGroup(k, ok), 1.1, 0.3)
        self.attendre_voix()

    # ── 05 : question 1 (les ratés de la Chine) ─────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t = self.tab_pret({(1, 1), (1, 2)})

        def montrer():
            self.play(*teinter_colonne(t, 1, BLEU_PALE), run_time=0.3)
            self.play(remplir(t, 1, 1, 3), *allumer(t, 1, 1), run_time=0.5)

        self.question_pause("05-question", "05b-reponse", ["Combien de ratés", "pour la Chine ?"], ["3", "4", "7"], 0,
                            ["8 − 1 − 0 − 4 = 3 (par la colonne)", "C : 8 − 1 ; B : 8 − 4"], x0=self.XL + 0.3, ys=(0.95, 0.0, -0.95),
                            largeur=4.9, avant=lambda: self.play(*teinter_ligne(t, 1), run_time=0.4), geste=montrer)

    # ── 07 : question 2 (le total de la Chine) ──────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t = self.tab_pret({(1, 2)})
        self.question_pause("07-question", "07b-reponse", ["Combien de lancements", "en tout pour la Chine ?"],
                            ["68", "62", "65"], 0, ["65 + 3 = 68", "B soustrait ; C oublie les ratés"],
                            x0=self.XL + 0.3, largeur=4.9, ys=(0.95, 0.0, -0.95),
                            avant=lambda: self.play(*teinter_ligne(t, 1), run_time=0.4),
                            geste=lambda: self.play(remplir(t, 1, 2, 68), *allumer(t, 1, 2), run_time=0.5))

    # ── 06 : le piège (les marges comptées deux fois) ───────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        t = self.tab_pret(set())
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.1)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("additionner tout le tableau")
        tout = [(r, c) for r in range(5) for c in range(3) if (r, c) != (4, 2)]
        self.play(*teinter(t, tout, "#fecaca"), run_time=0.5)
        self.au_mot("marges comprises")
        faux = self.col(self.ligne([("tout additionner", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 40), 2.25)
        self.play(FadeIn(faux, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("deux fois")
        x = croix(faux[0], sw=6)
        deux = self.col(self.t("comptés 2 fois !", 36, ROUGE_ERREUR), 1.55)
        self.play(Create(x), FadeIn(deux), run_time=0.5)
        self.au_mot("Le total général")
        self.play(*eteindre(t), run_time=0.2)
        self.play(*teinter_ligne(t, 4), run_time=0.3)
        self.au_mot("253 plus 8")
        c1 = self.calcul([("253", WHITE), ("+", WHITE), ("8", WHITE), ("=", WHITE), ("261", VERT_OK)], 0.6, 44)
        self.play(FadeIn(c1, shift=RIGHT * 0.2), *allumer(t, 4, 2), run_time=0.5)
        self.au_mot("Et par les lignes")
        self.play(*eteindre(t), run_time=0.2)
        self.play(*teinter_colonne(t, 2, BLEU_PALE), run_time=0.3)
        self.au_mot("156 plus 68")
        c2 = self.calcul([("156 + 68 + 17 + 20", WHITE)], -0.4, 40)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égale encore 261")
        e2 = self.calcul([("=", WHITE), ("261", VERT_OK)], -1.2, 44)
        self.play(FadeIn(e2, scale=0.7), *allumer(t, 4, 2), run_time=0.4)
        self.insister(e2[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        t = self.tab_pret(set())
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Deux autres cases ont disparu")
        self.play(remplir(t, 0, 0, "?"), remplir(t, 2, 2, "?"), run_time=0.6)
        self.au_mot("Un : combien")
        q1 = self.col(self.bloc(["1. Réussis des", "États-Unis ?"], 38), 1.75)
        q1[0][:2].set_color(AMBRE)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), Indicate(t.texte_case(0, 0), scale_factor=1.8), run_time=0.5)
        self.au_mot("Deux : combien")
        q2 = self.col(self.bloc(["2. La Russie,", "en tout ?"], 38), 0.35)
        q2[0][:2].set_color(AMBRE)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), Indicate(t.texte_case(2, 2), scale_factor=1.8), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(VGroup(icone_pause(0.36), self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE))
                         .arrange(RIGHT, buff=0.2), -1.0)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08b-correction")
        t = self.tab_pret({(0, 0), (2, 2)})
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("la ligne des États-Unis")
        self.play(*teinter_ligne(t, 0), run_time=0.4)
        self.au_mot("156 moins 1")
        c1 = self.calcul([("1.", AMBRE), ("156 − 1", WHITE), ("=", WHITE), ("155", VERT_OK)], 1.9, 42)
        self.play(FadeIn(c1[:2], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 155")
        self.play(FadeIn(c1[2:], scale=0.7), remplir(t, 0, 0, 155), *allumer(t, 0, 0), run_time=0.5)
        self.au_mot("la colonne des totaux")
        self.play(*eteindre(t), run_time=0.2)
        self.play(*teinter_colonne(t, 2, BLEU_PALE), run_time=0.4)
        self.au_mot("261 moins 156")
        c2 = self.calcul([("2.", AMBRE), ("261 − 156 − 68 − 20", WHITE)], 0.95, 40)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égale 17")
        e2 = self.calcul([("=", WHITE), ("17", VERT_OK)], 0.2, 44)
        self.play(FadeIn(e2, scale=0.7), remplir(t, 2, 2, 17), *allumer(t, 2, 2), run_time=0.5)
        self.au_mot("Contrôle par la ligne")
        self.play(*eteindre(t), run_time=0.2)
        self.play(*teinter_ligne(t, 2), run_time=0.3)
        self.au_mot("17 plus 0")
        k = self.calcul([("17 + 0 = 17", WHITE)], -0.6, 40)
        ok = self.coche(VERT_OK, 0.28).next_to(k, RIGHT, buff=0.3)
        self.play(FadeIn(k, shift=RIGHT * 0.2), Create(ok), run_time=0.5)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        t = self.tab_pret(set())
        lignes = self.finale([("Marges = sommes,", "par ligne et par colonne"), ("Case manquante =", "total − cases connues"),
                              ("Deux trous sur une ligne :", "je passe par la colonne")], [1.75, 0.15, -1.45])
        self.au_mot("Les marges sont des sommes")
        bords = [(r, 2) for r in range(5)] + [(4, c) for c in range(2)]
        self.montrer_ligne(lignes[0], *teinter(t, bords, "#bbf7d0"))
        self.au_mot("Une case manquante")
        self.montrer_ligne(lignes[1], *eteindre(t))
        self.play(*allumer(t, 3, 0), run_time=0.3)
        self.au_mot("quand une ligne a deux trous")
        self.montrer_ligne(lignes[2], *teinter_colonne(t, 1, BLEU_PALE))
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_regle()
        self.ecran_case()
        self.ecran_marge()
        self.ecran_question1()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsTabCompleterPremiere(StatsTabCompleterBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"


class StatsTabCompleterStmg(StatsTabCompleterBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
