# stats_tab_lire.py
# EleveAI — Maths 1re (tronc commun) ET Maths STMG — série « Statistiques »,
# épisode « LIRE UN TABLEAU CROISÉ » (1re 04, STMG 05). Micros du coach :
# 1re info_tab_lire ⇄ STMG don_tab_lire (« lire un effectif dans un tableau
# croisé »). AVEC VOIX. Paysage 16:9. CEINTURE JAUNE dans les deux classes (lire
# une case et une marge, un cran au-dessus du « je vois »).
# Short jumeau : stats_tab_lire_short.py (blanche).
#
# ⭐ Décor et métier : l'HISTOIRE DES SCIENCES ; un JOURNALISTE SCIENTIFIQUE
# prépare un podcast sur les femmes prix Nobel en sciences (problématique :
# juger une évolution).
# Source : liste des lauréates des prix Nobel (nobelprize.org, reprise par
# Wikipédia « List of female Nobel laureates », lue le 24/10/2026), prix remis à
# des femmes de 1901 à 2025 (Marie Curie compte deux fois : physique 1903, chimie 1911) :
#   physique 1903, 1963 | 2018, 2020, 2023 → 2 | 3 (5)
#   chimie 1911, 1935, 1964 | 2009, 2018, 2020, 2020, 2022 → 3 | 5 (8)
#   médecine 1947, 1977, 1983, 1986, 1988, 1995 | 2004, 2008, 2009, 2009, 2014,
#   2015, 2023, 2025 → 6 | 8 (14) ; totaux 11 | 16 (27).
# Centres d'intérêt : histoire-geographie, sciences.
# ⚠️ Le tableau rempli est l'OBJET qu'on lit : il apparaît entier à l'écran 03,
# comme dans le coach (l'écran 02 montre sa structure, cases vides).
#
# Mapping micro → écrans (banques 1re information-chiffree, STMG
# donnees-croisees) : lire une case (info_tab_lire_case, don_tab_lire_tpl_1) →
# 03, question 1, défi 1 · lire une marge (info_tab_lire_marge) → 04, défi 2 ·
# retrouver la case d'un nombre (info_tab_lire_retrouver, don_tab_lire_tpl_2) → 06, question 2.
# Écrans : 00 garde · 01 le journaliste, 27 prix · 02 la structure (lignes,
# colonnes, marges) · 03 une case · 04 une marge, le total général · 05 question 1
# · 06 le piège (le 3 deux fois) · 07 question 2 · 08 défi · 08b correction ·
# 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/lycee-stats-tab-lire.json (débit −7) ; calage :
# manim/scripts/stmg/stats_tab_lire_marques.json. UNE voix, DEUX rendus.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_tab_lire.py StatsTabLirePremiere -o eleveai-maths-premiere-commun-stats-tab-lire --media_dir manim/scripts/stmg/media-stats-tab-lire-premiere
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_tab_lire.py StatsTabLireStmg -o eleveai-maths-stmg-stats-tab-lire --media_dir manim/scripts/stmg/media-stats-tab-lire-stmg
# Sorties : manim/sorties/premiere-commun/maths/statistiques/04-tab-lire/
#           manim/sorties/stmg/maths/statistiques/05-tab-lire/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h1_commun import *  # noqa: E402,F403

COLONNES = ["1901 à 1999", "2000 à 2025", "Total"]
LIGNES = ["Physique", "Chimie", "Médecine", "Total"]
VALEURS = [[2, 3, 5], [3, 5, 8], [6, 8, 14], [11, 16, 27]]
OR_NOBEL = "#eab308"


def medaille_nobel(r=0.7):
    """Une médaille d'or gravée « Nobel », sur son ruban."""
    disque = Circle(radius=r, fill_color=OR_NOBEL, fill_opacity=1, stroke_color="#fde68a", stroke_width=5)
    grave = Circle(radius=r * 0.8, stroke_color="#a16207", stroke_width=3)
    nom = Text("Nobel", font_size=int(40 * r / 0.7), color="#713f12", weight=BOLD).move_to(disque)
    ruban = VGroup(*[Polygon(P(s * 0.12 * r, r * 0.9), P(s * 0.75 * r, r * 2.1), P(s * 0.35 * r, r * 2.1),
                             P(s * -0.2 * r, r * 0.95), fill_color="#1d4ed8", fill_opacity=1, stroke_width=0)
                     for s in (-1, 1)])
    return VGroup(ruban, disque, grave, nom)


def micro_podcast(h=1.0):
    """Un micro de podcast sur son pied."""
    tete = RoundedRectangle(width=0.45 * h, height=0.7 * h, corner_radius=0.22 * h, fill_color="#94a3b8",
                            fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    grille = VGroup(*[Line(LEFT * 0.15 * h, RIGHT * 0.15 * h, color="#334155", stroke_width=2).shift(UP * k * 0.12 * h)
                      for k in (-1, 0, 1, 2)]).move_to(tete)
    arc = Arc(radius=0.35 * h, start_angle=PI, angle=PI, color=WHITE, stroke_width=3).next_to(tete, DOWN, buff=-0.25 * h)
    pied = Line(arc.get_bottom(), arc.get_bottom() + DOWN * 0.35 * h, color=WHITE, stroke_width=3)
    socle = Line(LEFT * 0.25 * h, RIGHT * 0.25 * h, color=WHITE, stroke_width=4).move_to(pied.get_end())
    return VGroup(tete, grille, arc, pied, socle)


class StatsTabLireBase(PaysageLycee):
    nom_voix = "lycee-stats-tab-lire"
    fichier_marques = "stats_tab_lire_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"
    XL = 1.35
    T = P(-2.95, -0.25)

    def tableau(self, plein=True, centre=None, **kw):
        opts = dict(libelles=LIGNES, coin="Prix Nobel", largeur_case=1.75, largeur_libelle=2.0, hauteur=0.82,
                    fs=28, titre="Prix Nobel remis à des femmes", centre=self.T if centre is None else centre)
        opts.update(kw)
        lignes = VALEURS if plein else [[None] * 3 for _ in VALEURS]
        t = textes_devant(Tableau(COLONNES, lignes, **opts))
        return caser(t, -6.6, 1.05, -3.3, 3.0) if centre is None else t

    def tab_pret(self):
        t = self.tableau()
        self.add(t)
        return t

    def lire(self, t, r, c, txt_ligne=None):
        """Le geste : flèche le long de la ligne r, flèche le long de la colonne c,
        puis la case du croisement s'allume. Renvoie les deux flèches."""
        fl = fleche_ligne(t, r, c)
        fc = fleche_colonne(t, c, r)
        return fl, fc

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire un tableau croisé", self.identite, self.ceinture)
        t = self.tableau(plein=False, centre=P(-0.6, -0.05), largeur_case=1.2, largeur_libelle=1.5, fs=20,
                         hauteur=0.5, titre=None)
        self.au_mot("Lire un tableau croisé")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(t, scale=0.9), run_time=0.7)
        self.au_mot("Une case")
        self.play(*allumer(t, 1, 1), run_time=0.4)
        self.au_mot("une ligne")
        self.play(*teinter_ligne(t, 1), run_time=0.4)
        self.au_mot("une colonne")
        self.play(*teinter_colonne(t, 1, BLEU_PALE), run_time=0.4)
        self.au_mot("qui compte quoi")
        q = self.t("?", 90, ORANGE_RETENUE).next_to(t, RIGHT, buff=0.4)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : le journaliste, 27 prix ────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        med = medaille_nobel(0.9).move_to(P(-3.8, 0.9))
        self.au_mot("Depuis 1901")
        an = self.t("depuis 1901", 40, JAUNE_TITRE).next_to(med, DOWN, buff=0.4)
        self.play(FadeIn(med, shift=DOWN * 0.3), FadeIn(an), run_time=0.7)
        self.au_mot("Un journaliste scientifique")
        mic = micro_podcast(1.2).move_to(P(1.4, 1.4))
        metier = self.bloc(["Journaliste", "scientifique"], 40, BLEU_CALCUL).next_to(mic, RIGHT, buff=0.5)
        self.play(FadeIn(mic, shift=UP * 0.2), FadeIn(metier, shift=LEFT * 0.2), run_time=0.6)
        self.au_mot("les femmes Nobel en sciences")
        sujet = self.col(self.t("les femmes Nobel en sciences", 36), -0.3, xl=0.5)
        self.play(FadeIn(sujet, shift=UP * 0.2), run_time=0.4)
        self.au_mot("27 prix")
        nb = self.col(self.ligne([("27", JAUNE_TITRE), ("prix, de 1901 à 2025", WHITE)], 38), -1.1, xl=0.5)
        self.play(FadeIn(nb, scale=0.7), run_time=0.4)
        self.insister(nb[0], 1.4, 0.25)
        self.au_mot("dans un tableau croisé")
        t = self.tableau(plein=False, centre=P(-3.4, -2.3), largeur_case=0.9, largeur_libelle=1.2, fs=16,
                         hauteur=0.32, titre=None)
        self.play(FadeOut(an), med.animate.scale(0.7).shift(UP * 0.6), FadeIn(t, shift=UP * 0.3), run_time=0.6)
        self.attendre_voix()

    # ── 02 : la structure ───────────────────────────────────────────────────

    def ecran_structure(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-structure")
        t = self.tableau(plein=False)
        self.play(FadeIn(t, scale=0.95), run_time=0.5)
        self.au_mot("croise deux caractères")
        t0 = self.col(self.t("Deux caractères", 42, JAUNE_TITRE), 2.9)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("En ligne")
        l1 = self.col(self.ligne([("En ligne :", AMBRE), ("la discipline", WHITE)], 36), 1.95)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Indicate(VGroup(*t.libelles[:3]), color=AMBRE), run_time=0.6)
        for k, mot in enumerate(["physique,", "chimie,", "médecine."]):
            self.au_mot(mot)
            self.play(*teinter_ligne(t, k), run_time=0.3)
        self.au_mot("En colonne")
        self.play(*eteindre(t), run_time=0.3)
        l2 = self.col(self.ligne([("En colonne :", BLEU_CALCUL), ("la période", WHITE)], 36), 1.15)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("de 1901 à 1999")
        self.play(*teinter_colonne(t, 0, BLEU_PALE), Indicate(t.tetes[0], color=BLEU_CALCUL), run_time=0.4)
        self.au_mot("de 2000 à 2025")
        self.play(*teinter_colonne(t, 1, BLEU_PALE), Indicate(t.tetes[1], color=BLEU_CALCUL), run_time=0.4)
        self.au_mot("sur les bords")
        self.play(*eteindre(t), run_time=0.3)
        bords = [(r, 2) for r in range(4)] + [(3, c) for c in range(2)]
        self.play(*teinter(t, bords, "#bbf7d0"), run_time=0.5)
        self.au_mot("ce sont les marges")
        l3 = self.col(self.ligne([("Les totaux :", VERT_OK), ("les marges", WHITE)], 36), 0.35)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(l3, 1.12, 0.3)
        self.attendre_voix()

    # ── 03 : une case ───────────────────────────────────────────────────────

    def ecran_case(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-case")
        t = self.tableau()
        self.au_mot("Combien de femmes Nobel de chimie")
        q = self.col(self.bloc(["Chimie, depuis 2000 ?"], 40, JAUNE_TITRE), 2.9)
        self.play(FadeIn(t, scale=0.95), FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Je prends la ligne chimie")
        fl = fleche_ligne(t, 1, 1)
        e1 = self.col(self.ligne([("1.", AMBRE), ("la ligne chimie", WHITE)], 36), 1.9)
        self.play(*teinter_ligne(t, 1), GrowArrow(fl), FadeIn(e1, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("puis la colonne 2000 à 2025")
        fc = fleche_colonne(t, 1, 1)
        e2 = self.col(self.ligne([("2.", AMBRE), ("la colonne 2000 à 2025", WHITE)], 36), 1.15)
        self.play(*teinter_colonne(t, 1, BLEU_PALE), GrowArrow(fc), FadeIn(e2, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("La case du croisement vaut 5")
        self.play(*allumer(t, 1, 1), run_time=0.4)
        self.insister(t.cases[1][1], 1.3, 0.3)
        self.au_mot("5 prix de chimie")
        res = self.col(self.ligne([("5", VERT_OK), ("prix de chimie", WHITE)], 44), 0.0)
        res2 = self.col(self.t("depuis 2000", 36), -0.65)
        cadre = self.encadrer(VGroup(res, res2))
        self.play(FadeIn(res, scale=0.7), FadeIn(res2), run_time=0.4)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 04 : une marge, le total général ────────────────────────────────────

    def ecran_marge(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-marge")
        t = self.tab_pret()
        self.au_mot("Et en médecine")
        q = self.col(self.t("Médecine, en tout ?", 40, JAUNE_TITRE), 2.9)
        self.play(FadeIn(q, shift=RIGHT * 0.2), *teinter_ligne(t, 2), run_time=0.5)
        self.au_mot("au bout : 14")
        fl = fleche_ligne(t, 2, 2)
        self.play(GrowArrow(fl), *allumer(t, 2, 2), run_time=0.6)
        self.insister(t.cases[2][2], 1.3, 0.3)
        self.au_mot("6 avant 2000")
        c = self.col(self.ligne([("6", WHITE), ("+", WHITE), ("8", WHITE)], 50), 1.8)
        self.play(FadeIn(c[0], scale=1.5), Indicate(t.cases[2][0], color=AMBRE, scale_factor=1.2), run_time=0.4)
        self.au_mot("plus 8 depuis")
        self.play(FadeIn(c[1:], scale=1.5), Indicate(t.cases[2][1], color=AMBRE, scale_factor=1.2), run_time=0.4)
        self.au_mot("égale 14")
        eg = self.ligne([("=", WHITE), ("14", VERT_OK)], 50).next_to(c, RIGHT, buff=0.25)
        self.play(FadeIn(eg, scale=0.7), run_time=0.4)
        self.au_mot("Et dans le coin")
        self.play(FadeOut(fl), *eteindre(t), run_time=0.3)
        self.play(*allumer(t, 3, 2), run_time=0.4)
        self.au_mot("le total général, 27")
        tg = self.col(self.ligne([("Total général :", WHITE), ("27", VERT_OK)], 40), 0.55)
        self.play(FadeIn(tg, scale=0.7), run_time=0.4)
        self.insister(t.cases[3][2], 1.3, 0.3)
        self.attendre_voix()

    # ── 05 : question 1 (une case, pas une marge) ───────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t = self.tab_pret()
        self.question_pause("05-question", "05b-reponse", ["Femmes Nobel de physique", "avant 2000 ?"],
                            ["2", "5", "11"], 0, ["la case physique × 1901 à 1999", "5 : total de ligne ; 11 : de colonne"],
                            x0=self.XL, largeur=4.9, ys=(0.95, 0.0, -0.95),
                            avant=lambda: self.play(*teinter_ligne(t, 0), *teinter_colonne(t, 0, BLEU_PALE),
                                                    run_time=0.4),
                            geste=lambda: self.play(*allumer(t, 0, 0), run_time=0.4))

    # ── 06 : le piège, le 3 deux fois ───────────────────────────────────────

    def remonter(self, t, r, c, couleur):
        """Du nombre (r, c) : flèche vers le haut jusqu'à l'en-tête, puis vers la
        gauche jusqu'au libellé de la ligne."""
        case = t.case(r, c)
        haut = Arrow(case.get_top() + DOWN * 0.05, t.tetes[c].get_bottom() + UP * 0.25, buff=0, color=couleur,
                     stroke_width=7, max_tip_length_to_length_ratio=0.25).set_z_index(6)
        gauche = Arrow(case.get_left() + RIGHT * 0.05, t.libelles[r].get_right() + LEFT * 0.35, buff=0,
                       color=couleur, stroke_width=7, max_tip_length_to_length_ratio=0.2).set_z_index(6)
        return haut, gauche

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        t = self.tab_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.1)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("le nombre 3 apparaît deux fois")
        ronds = [Circle(radius=0.36, color=ORANGE_RETENUE, stroke_width=6).move_to(t.case(r, c)).set_z_index(6)
                 for r, c in ((0, 1), (1, 0))]
        deux = self.col(self.ligne([("3", ORANGE_RETENUE), ("deux fois !", WHITE)], 42), 2.3)
        self.play(*[Create(o) for o in ronds], FadeIn(deux, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Une fois pour la physique depuis 2000")
        h1, g1 = self.remonter(t, 0, 1, BLEU_CALCUL)
        l1 = self.col(self.ligne([("3 :", BLEU_CALCUL), ("physique, depuis 2000", WHITE)], 34), 1.45)
        self.play(GrowArrow(h1), GrowArrow(g1), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("une fois pour la chimie avant 2000")
        h2, g2 = self.remonter(t, 1, 0, VERT_OK)
        l2 = self.col(self.ligne([("3 :", VERT_OK), ("chimie, avant 2000", WHITE)], 34), 0.75)
        self.play(GrowArrow(h2), GrowArrow(g2), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("je monte à sa colonne")
        regle = self.col(self.bloc(["je monte à la colonne,", "je reviens à la ligne"], 36, AMBRE), -0.4)
        self.play(FadeIn(regle, shift=RIGHT * 0.2), Indicate(VGroup(h1, h2), color=AMBRE), run_time=0.6)
        self.au_mot("je reviens au début de sa ligne")
        self.play(Indicate(VGroup(g1, g2), color=AMBRE), run_time=0.6)
        self.attendre_voix()

    # ── 07 : question 2 (retrouver la case) ─────────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t = self.tab_pret()

        def montrer():
            h, g = self.remonter(t, 2, 0, VERT_OK)
            self.play(GrowArrow(h), GrowArrow(g), run_time=0.6)

        self.question_pause("07-question", "07b-reponse", ["Le nombre 6, c'est…"],
                            ["la médecine avant 2000", "la médecine depuis 2000", "toute la médecine"], 0,
                            ["ligne médecine, colonne 1901 à 1999", "depuis 2000 : 8 ; en tout : 14"],
                            x0=self.XL, largeur=4.9, ys=(1.4, 0.5, -0.4),
                            avant=lambda: self.play(*allumer(t, 2, 0), run_time=0.4), geste=montrer)

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        t = self.tab_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Un : combien")
        q1 = self.col(self.bloc(["1. Médecine,", "depuis 2000 ?"], 38), 1.7)
        q1[0][:2].set_color(AMBRE)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Deux : combien de prix")
        q2 = self.col(self.bloc(["2. Depuis 2000,", "toutes disciplines ?"], 38), 0.3)
        q2[0][:2].set_color(AMBRE)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(VGroup(icone_pause(0.36), self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE))
                         .arrange(RIGHT, buff=0.2), -1.0)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08b-correction")
        t = self.tab_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("ligne médecine")
        fl, fc = fleche_ligne(t, 2, 1), fleche_colonne(t, 1, 2)
        self.play(*teinter_ligne(t, 2), GrowArrow(fl), run_time=0.5)
        self.play(*teinter_colonne(t, 1, BLEU_PALE), GrowArrow(fc), run_time=0.5)
        self.au_mot(": 8")
        r1 = self.col(self.ligne([("1.", AMBRE), ("8", VERT_OK), ("prix", WHITE)], 44), 1.85)
        self.play(*allumer(t, 2, 1), FadeIn(r1, scale=0.7), run_time=0.4)
        self.au_mot("c'est le total de la colonne")
        self.play(FadeOut(fl), FadeOut(fc), *eteindre(t), run_time=0.3)
        self.play(*teinter_colonne(t, 1, BLEU_PALE), run_time=0.4)
        self.au_mot("3 plus 5 plus 8")
        c2 = self.ligne([("2.", AMBRE), ("3 + 5 + 8", WHITE)], 44)
        e2 = self.ligne([("=", WHITE), ("16", VERT_OK)], 44).next_to(c2, RIGHT, buff=0.25)
        self.col(VGroup(c2, e2), 0.85)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 16")
        self.play(FadeIn(e2, scale=0.7), *allumer(t, 3, 1), run_time=0.4)
        self.insister(e2[1], 1.4, 0.25)
        self.au_mot("Plus en un quart de siècle")
        comp = self.col(self.ligne([("16", VERT_OK), (">", WHITE), ("11", WHITE)], 46), -0.3)
        sous = self.col(self.bloc(["en un quart de siècle,", "plus que le siècle d'avant !"], 34, JAUNE_TITRE), -1.2)
        self.play(FadeIn(comp, scale=0.7), Indicate(t.cases[3][0], color=AMBRE, scale_factor=1.2), run_time=0.5)
        self.play(FadeIn(sous, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        t = self.tab_pret()
        lignes = self.finale([("Une case : sa ligne", "croisée avec sa colonne"), ("Au bout, en bas :", "les marges"),
                              ("Un nombre : je monte", "puis je reviens")], [1.75, 0.15, -1.45])
        self.au_mot("Une case")
        self.montrer_ligne(lignes[0], *allumer(t, 1, 1))
        self.au_mot("Au bout d'une ligne")
        bords = [(r, 2) for r in range(4)] + [(3, c) for c in range(2)]
        self.montrer_ligne(lignes[1], *teinter(t, bords, "#bbf7d0"))
        self.au_mot("pour lire un nombre")
        h, g = self.remonter(t, 2, 0, AMBRE)
        self.montrer_ligne(lignes[2], GrowArrow(h), GrowArrow(g))
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_structure()
        self.ecran_case()
        self.ecran_marge()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsTabLirePremiere(StatsTabLireBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"


class StatsTabLireStmg(StatsTabLireBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
