# stats_tab_marges.py
# EleveAI — Maths STMG — série « Statistiques », lycée, épisode 06 : CALCULER
# LES EFFECTIFS MARGINAUX ET L'EFFECTIF TOTAL. Micro du coach don_tab_marges
# (notion donnees_tableau_croise). AVEC VOIX. Paysage 16:9. CEINTURE JAUNE
# (comme « lire un tableau croisé » : additionner une ligne, une colonne ; le
# complément « compléter » est vert). Short jumeau : stats_tab_marges_short.py (blanche).
#
# ⭐ Décor et métier : la SANTÉ ; une DIRECTRICE D'HÔPITAL vérifie une nouvelle :
# « pour la première fois, plus de femmes que d'hommes parmi les médecins »
# (problématique : vérifier une affirmation). Centres d'intérêt : corps-sante.
# Sources (lues le 24/10/2026) : DREES, communiqué « Démographie des
# professionnels de santé au 1er janvier 2025 » (28/07/2025) ; Vidal, « En France,
# la moitié des médecins sont désormais des femmes » : 237 214 médecins en
# activité, 118 957 femmes, 118 257 hommes ; Santé sur le Net (même étude) :
# 100 019 généralistes dont 52,4 % de femmes, 137 195 spécialistes dont 48,5 %.
# Calculs (Python) : femmes généralistes 100 019 × 0,524 = 52 410 ; hommes
# généralistes 47 609 ; femmes spécialistes 118 957 − 52 410 = 66 547 ; hommes
# spécialistes 118 257 − 47 609 = 70 648.
# ⚠️ En milliers ARRONDIS, ajustés pour que les marges collent aux totaux publiés
# (119 / 118 / 237) : 52 | 48 ; 67 | 70 (70,6 arrondi à 70 : sinon les hommes
# feraient 119 au lieu de 118). Marges : 100 ; 137 ; 119 ; 118 ; 237.
# 237 + 237 = 474 (leurre : cases + marges) ; 100 + 119 = 219 (leurre).
#
# Mapping micro → écrans (banque donnees-croisees, don_tab_marges) :
# stmg_don_tab_marges_tpl_1 (marge d'une ligne, d'une colonne, total) → 03, 04,
# 06, défi · stmg_don_tab_marges_tpl_2 (reconnaître le calcul : la colonne, pas
# la ligne) → question 1, 07 piège · total général (pas cases + marges) → question 2.
# Écrans : 00 garde · 01 la directrice · 02 la règle · 03 une ligne · 04 une
# colonne · 05 question 1 · 06 le total et son contrôle · 07 le piège (une
# ligne n'est pas une marge) · 08 question 2 · 09 défi · 09b correction · 10 ce
# que tu as appris · 11 fin.
#
# Voix : manim/voix/stmg-stats-tab-marges.json (débit −7) ; calage :
# manim/scripts/stmg/stats_tab_marges_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_tab_marges.py StatsTabMargesStmg -o eleveai-maths-stmg-stats-tab-marges --media_dir manim/scripts/stmg/media-stats-tab-marges
# Sortie : manim/sorties/stmg/maths/statistiques/06-tab-marges/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_i1_commun import *  # noqa: E402,F403

COLS = ["Femmes", "Hommes", "Total"]
LIGNES = ["Généralistes", "Spécialistes", "Total"]
VALS = [[52, 48, 100], [67, 70, 137], [119, 118, 237]]
MARGES = {(0, 2), (1, 2), (2, 0), (2, 1), (2, 2)}
ROSE_P = "#fbcfe8"


def croix_medicale(h=1.4):
    b1 = Rectangle(width=h, height=h * 0.34, fill_color="#ef4444", fill_opacity=1, stroke_width=0)
    b2 = Rectangle(width=h * 0.34, height=h, fill_color="#ef4444", fill_opacity=1, stroke_width=0)
    fond = Circle(radius=h * 0.68, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=3)
    return VGroup(fond, b1, b2)


def stetho(h=1.6):
    """Un stéthoscope : deux branches, le tube, la capsule."""
    c = "#94a3b8"
    br = VGroup(Arc(radius=h * 0.25, start_angle=PI, angle=PI, color=c, stroke_width=6))
    tube = CubicBezier(P(0, -h * 0.25) + DOWN * 0.0, P(0, -h * 0.7), P(h * 0.6, -h * 0.6), P(h * 0.55, -h * 0.15),
                       color=c, stroke_width=6)
    caps = Circle(radius=h * 0.13, fill_color="#cbd5e1", fill_opacity=1, stroke_color=c, stroke_width=4)
    caps.move_to(P(h * 0.55, -h * 0.08))
    jonction = Line(br.get_bottom(), P(0, -h * 0.25), color=c, stroke_width=6)
    return VGroup(br, jonction, tube, caps)


class StatsTabMargesBase(PaysageI1):
    nom_voix = "stmg-stats-tab-marges"
    fichier_marques = "stats_tab_marges_marques.json"
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
    XL = 1.0

    def tableau(self, montres=(), boite=(-6.6, 0.45, -2.8, 2.6), fs=30, titre="Médecins en 2025 (milliers)"):
        lignes = [[("?" if (r, c) not in montres else v) if (r, c) in MARGES else v for c, v in enumerate(rang)]
                  for r, rang in enumerate(VALS)]
        t = textes_devant(Tableau(COLS, lignes, libelles=LIGNES, coin="", largeur_case=1.75, largeur_libelle=2.5,
                                  hauteur=0.82, fs=fs, titre=titre))
        return caser(t, *boite)

    def tab_pret(self, montres=(), **kw):
        t = self.tableau(montres, **kw)
        self.add(t)
        return t

    def calcul(self, morceaux, y, fs=44, xl=None):
        return self.col(self.ligne(morceaux, fs), y, xl=xl)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer les marges", self.identite, self.ceinture)
        t = self.tableau(boite=(-4.0, 2.8, -1.9, 1.6), fs=24, titre=None)
        self.au_mot("Calculer les marges")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(t, scale=0.9), run_time=0.7)
        self.au_mot("sans ses totaux")
        self.play(*[Indicate(t.texte_case(r, c), color=ORANGE_RETENUE, scale_factor=1.8) for r, c in MARGES],
                  run_time=0.8)
        self.attendre_voix(marge=0.8)

    # ── 01 : la directrice ──────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        cr = croix_medicale(1.3).move_to(P(-4.6, 1.9))
        st = stetho(1.5).move_to(P(-2.6, 1.8))
        self.play(FadeIn(cr, scale=0.7), FadeIn(st), run_time=0.5)
        self.au_mot("plus de femmes que d'hommes")
        nv = self.bloc(["« Plus de femmes que", "d'hommes médecins ! »"], 34, AMBRE).move_to(P(-3.7, -0.1))
        self.play(FadeIn(nv, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Une directrice d'hôpital")
        metier = self.col(self.t("Directrice d'hôpital", 44, BLEU_CALCUL), 2.7, xl=0.4)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.5)
        self.au_mot("veut le vérifier")
        v = self.col(VGroup(self.t("vérifie", 36, VERT_OK), self.coche(VERT_OK, 0.26)).arrange(RIGHT, buff=0.2), 2.0,
                     xl=0.4)
        self.play(FadeIn(v), run_time=0.4)
        self.au_mot("la spécialité, et le sexe")
        t = self.tableau(boite=(0.4, 6.4, -2.5, 1.4), fs=24)
        self.play(FadeIn(t, shift=UP * 0.2), run_time=0.6)
        self.play(Indicate(VGroup(*t.libelles[:2]), color=AMBRE), Indicate(VGroup(*t.tetes[:2]), color=AMBRE),
                  run_time=0.7)
        self.au_mot("les marges manquent")
        self.play(*[Indicate(t.texte_case(r, c), color=ORANGE_RETENUE, scale_factor=1.8) for r, c in MARGES],
                  run_time=0.8)
        self.attendre_voix()

    # ── 02 : la règle ───────────────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-regle")
        t = self.tab_pret()
        self.au_mot("Les marges sont les totaux")
        t0 = self.col(self.t("Marges = totaux", 46, JAUNE_TITRE), 2.75)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), *teinter(t, list(MARGES), "#bbf7d0"), run_time=0.6)
        self.au_mot("La marge d'une ligne")
        self.play(*eteindre(t), run_time=0.2)
        fl = fleche_ligne(t, 0, 2)
        r1 = self.col(self.ligne([("ligne", AMBRE), ("→", WHITE), ("j'additionne la ligne", WHITE)], 36), 1.7)
        self.play(*teinter_ligne(t, 0), GrowArrow(fl), FadeIn(r1, shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("La marge d'une colonne")
        self.play(FadeOut(fl), *eteindre(t), run_time=0.2)
        fc = fleche_colonne(t, 0, 2)
        r2 = self.col(self.ligne([("colonne", BLEU_CALCUL), ("→", WHITE), ("je descends", WHITE)], 36), 0.75)
        self.play(*teinter_colonne(t, 0, BLEU_PALE), GrowArrow(fc), FadeIn(r2, shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("Et le total général")
        self.play(FadeOut(fc), *eteindre(t), run_time=0.2)
        r3 = self.col(self.bloc(["coin : la somme", "de toutes les cases"], 36), -0.45)
        self.play(FadeIn(r3, shift=RIGHT * 0.2), *allumer(t, 2, 2),
                  *teinter(t, [(0, 0), (0, 1), (1, 0), (1, 1)], "#fde68a"), run_time=0.7)
        self.attendre_voix()

    # ── 03 : une ligne ──────────────────────────────────────────────────────

    def ecran_ligne(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ligne")
        t = self.tab_pret()
        self.au_mot("La ligne des généralistes")
        t0 = self.col(self.t("Une ligne", 48, JAUNE_TITRE), 2.7)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), *teinter_ligne(t, 0), run_time=0.5)
        self.au_mot("52 plus 48")
        c = self.calcul([("52", WHITE), ("+", WHITE), ("48", WHITE)], 1.5, 52)
        fl = fleche_ligne(t, 0, 2)
        self.play(FadeIn(c, shift=RIGHT * 0.2), GrowArrow(fl), run_time=0.5)
        self.au_mot("égale 100")
        eg = self.ligne([("=", WHITE), ("100", VERT_OK)], 52).next_to(c, RIGHT, buff=0.25)
        self.play(FadeIn(eg, scale=0.7), remplir(t, 0, 2, 100), *allumer(t, 0, 2), run_time=0.5)
        self.insister(eg[1], 1.4, 0.25)
        self.au_mot("Il y a 100 milliers")
        r = self.col(self.bloc(["100 milliers de", "médecins généralistes"], 36), 0.05)
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 04 : une colonne ────────────────────────────────────────────────────

    def ecran_colonne(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-colonne")
        t = self.tab_pret({(0, 2)})
        self.au_mot("La colonne des femmes")
        t0 = self.col(self.t("Une colonne", 48, JAUNE_TITRE), 2.7)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), *teinter_colonne(t, 0, ROSE_P), run_time=0.5)
        self.au_mot("je descends")
        fc = fleche_colonne(t, 0, 2)
        self.play(GrowArrow(fc), run_time=0.5)
        self.au_mot("52 plus 67")
        c = self.calcul([("52", WHITE), ("+", WHITE), ("67", WHITE)], 1.5, 52)
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 119")
        eg = self.ligne([("=", WHITE), ("119", VERT_OK)], 52).next_to(c, RIGHT, buff=0.25)
        self.play(FadeIn(eg, scale=0.7), remplir(t, 2, 0, 119), *allumer(t, 2, 0), run_time=0.5)
        self.insister(eg[1], 1.4, 0.25)
        self.au_mot("Il y a 119 milliers")
        r = self.col(self.bloc(["119 milliers de", "femmes médecins"], 36), 0.05)
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 05 : question 1 (quel calcul pour les hommes ?) ─────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t = self.tab_pret({(0, 2), (2, 0)})

        def montrer():
            self.play(*teinter_colonne(t, 1, BLEU_PALE), GrowArrow(fleche_colonne(t, 1, 2)), run_time=0.5)
            self.play(remplir(t, 2, 1, 118), *allumer(t, 2, 1), run_time=0.5)

        self.question_pause("05-question", "05b-reponse", ["Marge de la colonne", "« Hommes » : le calcul ?"],
                            ["48 + 70", "67 + 70", "52 + 48"], 0, ["je descends : 48 + 70 = 118", "B et C : une ligne !"],
                            x0=self.XL + 0.2, largeur=5.0, ys=(0.95, 0.0, -0.95),
                            avant=lambda: self.play(Indicate(t.tetes[1], color=AMBRE), run_time=0.4), geste=montrer)

    # ── 06 : le total et son contrôle ───────────────────────────────────────

    def ecran_total(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-total")
        t = self.tab_pret({(0, 2), (2, 0), (2, 1)})
        self.au_mot("Le total général")
        t0 = self.col(self.t("Le total général", 46, JAUNE_TITRE), 2.75)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), *teinter(t, [(0, 0), (0, 1), (1, 0), (1, 1)], "#fde68a"),
                  run_time=0.5)
        self.au_mot("52 plus 48")
        c = self.calcul([("52 + 48 + 67 + 70", WHITE)], 1.75, 42)
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("égale 237")
        eg = self.calcul([("=", WHITE), ("237", VERT_OK)], 1.0, 46, xl=self.XL + 0.5)
        self.play(FadeIn(eg, scale=0.7), remplir(t, 2, 2, 237), *allumer(t, 2, 2), run_time=0.5)
        self.au_mot("Je contrôle par les marges")
        self.play(*eteindre(t), run_time=0.2)
        self.play(*teinter(t, [(2, 0), (2, 1)], BLEU_PALE), run_time=0.4)
        self.au_mot("119 plus 118")
        k = self.calcul([("119 + 118 = 237", WHITE)], -0.05, 42)
        self.play(FadeIn(k, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("sont d'accord")
        ok = self.coche(VERT_OK, 0.3).next_to(k, RIGHT, buff=0.3)
        self.col(VGroup(k, ok), -0.05)
        self.play(Create(ok), *allumer(t, 2, 2), run_time=0.5)
        self.insister(VGroup(k, ok), 1.08, 0.3)
        self.attendre_voix()

    # ── 07 : le piège (une ligne n'est pas une marge) ───────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        t = self.tab_pret({(0, 2), (2, 0), (2, 1), (2, 2)})
        self.au_mot("Alors, plus de femmes")
        t0 = self.col(self.t("Plus de femmes ?", 46, JAUNE_TITRE), 2.75)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), *teinter(t, [(2, 0), (2, 1)], "#bbf7d0"), run_time=0.5)
        self.au_mot("119 milliers contre 118")
        k = self.calcul([("119", VERT_OK), (">", WHITE), ("118", WHITE)], 1.85, 48)
        self.play(FadeIn(k, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("de justesse")
        oui = self.col(self.t("oui, de justesse !", 36, VERT_OK), 1.1)
        self.play(FadeIn(oui), run_time=0.3)
        self.au_mot("Le piège")
        self.play(*eteindre(t), run_time=0.2)
        p = self.col(self.t("Le piège : une seule ligne", 38, ROUGE_ERREUR), 0.2)
        self.play(FadeIn(p, shift=RIGHT * 0.2), *teinter_ligne(t, 1, "#fecaca"), run_time=0.5)
        self.au_mot("70 contre 67")
        k2 = self.calcul([("spécialistes :", WHITE), ("70", BLEU_CALCUL), (">", WHITE), ("67", WHITE)], -0.6, 38)
        self.play(FadeIn(k2, shift=RIGHT * 0.2), Indicate(t.texte_case(1, 1), color=BLEU_CALCUL, scale_factor=1.6),
                  run_time=0.6)
        self.au_mot("Une ligne n")
        fin = self.col(self.ligne([("une ligne", WHITE), ("≠", ROUGE_ERREUR), ("une marge", WHITE)], 40), -1.45)
        self.play(FadeIn(fin, scale=0.8), run_time=0.5)
        self.attendre_voix()

    # ── 08 : question 2 (le total général) ──────────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t = self.tab_pret({(0, 2), (2, 0), (2, 1)})
        self.question_pause("08-question", "08b-reponse", ["Le total général", "du tableau ?"], ["237", "474", "219"], 0,
                            ["somme des 4 cases : 237", "B : + marges ; C : ligne + colonne"],
                            x0=self.XL + 0.2, largeur=5.0, ys=(0.95, 0.0, -0.95),
                            avant=lambda: self.play(Indicate(t.texte_case(2, 2), color=ORANGE_RETENUE, scale_factor=1.8),
                                                    run_time=0.4),
                            geste=lambda: self.play(remplir(t, 2, 2, 237), *allumer(t, 2, 2), run_time=0.5))

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        t = self.tab_pret({(0, 2), (2, 0), (2, 1), (2, 2)})
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Un : quelle est la marge")
        q1 = self.col(VGroup(self.ligne([("1.", AMBRE), ("La marge de la ligne", WHITE)], 36),
                             self.t("« Spécialistes » ?", 36)).arrange(DOWN, aligned_edge=LEFT, buff=0.1), 1.6)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), Indicate(t.texte_case(1, 2), color=ORANGE_RETENUE, scale_factor=1.8),
                  run_time=0.6)
        self.au_mot("Deux : contrôle")
        q2 = self.col(VGroup(self.ligne([("2.", AMBRE), ("Total − cette marge", WHITE)], 36),
                             self.t("= les généralistes ?", 36)).arrange(DOWN, aligned_edge=LEFT, buff=0.1), 0.2)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Mets pause")
        pause = self.pause_defi(-1.1)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        t = self.tab_pret({(0, 2), (2, 0), (2, 1), (2, 2)})
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), *teinter_ligne(t, 1), run_time=0.5)
        self.au_mot("67 plus 70")
        c1 = self.calcul([("1.", AMBRE), ("67 + 70", WHITE)], 1.8, 44)
        self.play(FadeIn(c1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 137")
        r1 = self.ligne([("=", WHITE), ("137", VERT_OK)], 44).next_to(c1, RIGHT, buff=0.2)
        self.play(FadeIn(r1, scale=0.7), remplir(t, 1, 2, 137), *allumer(t, 1, 2), run_time=0.5)
        self.au_mot("237 moins 137")
        self.play(*eteindre(t), run_time=0.2)
        self.play(*teinter_colonne(t, 2, BLEU_PALE), run_time=0.4)
        c2 = self.calcul([("2.", AMBRE), ("237 − 137", WHITE)], 0.75, 44)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 100")
        r2 = self.calcul([("=", WHITE), ("100", VERT_OK)], 0.05, 44, xl=self.XL + 0.55)
        self.play(FadeIn(r2, scale=0.7), *allumer(t, 0, 2), run_time=0.5)
        self.au_mot("bien la marge")
        ok = self.col(VGroup(self.t("les généralistes", 36), self.coche(VERT_OK, 0.28)).arrange(RIGHT, buff=0.25),
                      -0.75, xl=self.XL + 0.5)
        self.play(FadeIn(ok), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        t = self.tab_pret(set(MARGES))
        lignes = self.finale([("Marge d'une ligne :", "j'additionne la ligne"), ("Marge d'une colonne :", "je descends"),
                              ("Le total général :", "contrôlé dans les 2 sens")], [1.75, 0.15, -1.45])
        self.au_mot("La marge d'une ligne")
        self.montrer_ligne(lignes[0], *teinter_ligne(t, 0))
        self.au_mot("La marge d'une colonne")
        self.montrer_ligne(lignes[1], *eteindre(t))
        self.play(*teinter_colonne(t, 0, BLEU_PALE), run_time=0.3)
        self.au_mot("Et le total général")
        self.montrer_ligne(lignes[2], *allumer(t, 2, 2))
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_regle()
        self.ecran_ligne()
        self.ecran_colonne()
        self.ecran_question1()
        self.ecran_total()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsTabMargesStmg(StatsTabMargesBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
