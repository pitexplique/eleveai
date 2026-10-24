# stats_filtre_effectif.py
# EleveAI — Maths 1re (tronc commun) — série « Statistiques », lycée, épisode 18 :
# RETROUVER L'EFFECTIF D'UN FILTRE DANS UN TABLEAU CROISÉ. Micro du coach
# info_filtre_effectif (notion info_filtre_donnees). AVEC VOIX. Paysage 16:9.
# CEINTURE BLEUE : la synthèse des filtres ET / OU / NON (le OU inclusif était
# déjà bleu). Short jumeau : stats_filtre_effectif_short.py (verte).
#
# ⭐ Décor et métier : le PATRIMOINE MONDIAL ; une GUIDE-CONFÉRENCIÈRE prépare une
# visite sur les sites menacés (problématique : sélectionner, compter sans
# recompter). Centres d'intérêt : histoire-geographie, art-design.
# Source : Unesco, Centre du patrimoine mondial, la Liste au format XML
# (https://whc.unesco.org/en/list/xml/, 1 273 biens, après la 48e session de
# 2026), téléchargée et croisée (Python) le 24/10/2026, catégorie × « danger » :
#                 En péril   Hors péril   Total
#   Culturel         42         949        991
#   Naturel          12         228        240
#   Mixte             0          42         42
#   Total            54       1 219      1 273
# Exemples du fichier (vérifiés dans la même liste) : Mont-Saint-Michel et sa
# baie (culturel, non) ; Pitons, cirques et remparts de La Réunion (naturel,
# non) ; Villes anciennes de Djenné, Mali (culturel, oui) ; Parc national des
# Virunga, RD Congo (naturel, oui).
# Calculs (Python) : 991 + 54 − 42 = 1 003 ; 240 + 54 − 12 = 282 (leurre 294) ;
# 1 273 − 42 = 1 231 ; 1 273 − 54 = 1 219 ; NON culturel 282 ; culturel ET hors
# péril 949 ; 42 + 54 − 0 = 96 ; 1 273 − 240 = 1 033.
#
# Mapping micro → écrans (banque information-chiffree, info_filtre_effectif) :
# info_filtre_effectif_compose (ET = case, OU = ligne + colonne − case, NON =
# reste du total) → 02, 03, 04, 06, question 1, défi · info_filtre_effectif_lequel
# → question 2 · info_filtre_effectif_traduire (« à la fois » → ET, « l'un au
# moins » → OU) → 07 piège.
# Écrans : 00 garde · 01 la guide, le fichier, le tableau · 02 la règle · 03 ET ·
# 04 OU · 05 question 1 · 06 NON · 07 le piège (traduire) · 08 question 2 · 09
# défi · 09b correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/1re-stats-filtre-effectif.json (débit −7) ; calage :
# manim/scripts/premiere/stats_filtre_effectif_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/premiere/stats_filtre_effectif.py StatsFiltreEffectifPremiere -o eleveai-maths-premiere-commun-stats-filtre-effectif --media_dir manim/scripts/premiere/media-stats-filtre-effectif
# Sortie : manim/sorties/premiere-commun/maths/statistiques/18-filtre-effectif/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from stats_lycee_i1_commun import *  # noqa: E402,F403
from stats_lycee_h2_commun import barre_filtre, croise, entonnoir, ORANGE_V, VIOLET_H, VIOLET_CLAIR  # noqa: E402

LIGNES = ["Culturel", "Naturel", "Mixte"]
COLS = ["En péril", "Hors péril"]
CASES = [[42, 949], [12, 228], [0, 42]]
VIOLET_P, ORANGE_P = "#ddd6fe", "#fed7aa"


def temple(h=1.6):
    """Un temple antique : fronton, colonnes, socle (le patrimoine)."""
    c = "#e2e8f0"
    socle = Rectangle(width=h * 1.3, height=h * 0.12, fill_color=c, fill_opacity=1, stroke_width=0)
    cols = VGroup(*[Rectangle(width=h * 0.12, height=h * 0.62, fill_color=c, fill_opacity=1, stroke_width=0)
                    for _ in range(5)]).arrange(RIGHT, buff=h * 0.12).next_to(socle, UP, buff=0)
    archi = Rectangle(width=h * 1.2, height=h * 0.1, fill_color=c, fill_opacity=1, stroke_width=0).next_to(cols, UP, buff=0)
    fronton = Triangle(fill_color=c, fill_opacity=1, stroke_width=0).stretch_to_fit_width(h * 1.3)
    fronton.stretch_to_fit_height(h * 0.3).next_to(archi, UP, buff=0)
    return VGroup(socle, cols, archi, fronton)


def filtre(*morceaux, fs=30):
    """La barre de filtre du tableur ; morceaux : textes, les connecteurs en ambre."""
    m = [(x, AMBRE if x in ("ET", "OU", "NON") else WHITE) for x in morceaux]
    return barre_filtre(m, fs)


class StatsFiltreEffectifBase(PaysageI1):
    nom_voix = "1re-stats-filtre-effectif"
    fichier_marques = "stats_filtre_effectif_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "bleue"
    XL = 1.0

    def tab(self, boite=(-6.6, 0.45, -3.0, 2.6), fs=30):
        t = textes_devant(croise(LIGNES, COLS, CASES, fs=fs, coin="Type", largeur_case=1.95, largeur_libelle=2.2,
                                 hauteur=0.8))
        return caser(t, *boite)

    def tab_pret(self, **kw):
        t = self.tab(**kw)
        self.add(t)
        return t

    def zone_ou(self, t, r, c):
        """La ligne r et la colonne c, teintées (violet, orange), la case commune plus foncée."""
        anims = teinter(t, [(r, j) for j in range(3)], VIOLET_P) + teinter(t, [(i, c) for i in range(4)], ORANGE_P)
        return anims

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'effectif d'un filtre", self.identite, self.ceinture)
        t = self.tab(boite=(-4.2, 2.6, -1.9, 1.5), fs=24)
        en = entonnoir(0.9).next_to(t, RIGHT, buff=0.5)
        self.au_mot("Retrouver l'effectif")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(t, scale=0.9), FadeIn(en),
                  run_time=0.7)
        self.au_mot("Sans recompter")
        self.play(*allumer(t, 1, 0), Indicate(en, color=AMBRE), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : la guide, le fichier, le tableau ───────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        tp = temple(1.9).move_to(P(-4.6, 1.3))
        self.au_mot("1 273 biens")
        nb = self.ligne([("1 273", JAUNE_TITRE), ("biens", WHITE)], 44).next_to(tp, DOWN, buff=0.3)
        un = self.t("patrimoine mondial", 30, GREY_A).next_to(nb, DOWN, buff=0.1)
        self.play(FadeIn(tp, shift=UP * 0.2), FadeIn(nb, scale=0.7), FadeIn(un), run_time=0.6)
        self.au_mot("Une guide-conférencière")
        metier = self.col(self.t("Guide-conférencière", 44, BLEU_CALCUL), 2.75, xl=-1.6)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.5)
        self.au_mot("les sites menacés")
        men = self.col(self.t("visite : les sites menacés", 32), 2.05, xl=-1.6)
        self.play(FadeIn(men), run_time=0.4)
        self.au_mot("une ligne par bien")
        f = Tableau(["Type", "En péril"], [["Culturel", "Non"], ["Naturel", "Non"], ["Culturel", "Oui"],
                                            ["Naturel", "Oui"]],
                    libelles=["Mont-Saint-Michel", "Pitons (La Réunion)", "Djenné (Mali)", "Virunga (RDC)"],
                    coin="Bien", largeur_case=1.6, largeur_libelle=3.3, hauteur=0.55, fs=22)
        caser(f, -1.6, 6.4, -1.6, 1.6)
        self.play(FadeIn(f, shift=UP * 0.2), run_time=0.6)
        self.au_mot("son type")
        self.play(*teinter_colonne(f, 0, BLEU_PALE), run_time=0.4)
        self.au_mot("s'il est en péril")
        self.play(*teinter_colonne(f, 1, "#fde68a"), run_time=0.4)
        self.au_mot("Le tableau croisé")
        t = self.tab(boite=(-1.6, 5.2, -3.1, -1.75), fs=24)
        fl = Arrow(f.get_bottom() + DOWN * 0.02, t.get_top() + UP * 0.02, buff=0.05, color=AMBRE, stroke_width=5)
        self.play(GrowArrow(fl), FadeIn(t, shift=UP * 0.2), run_time=0.6)
        self.attendre_voix()

    # ── 02 : la règle ───────────────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-regle")
        t = self.tab_pret()
        self.au_mot("La règle")
        t0 = self.col(self.t("Un filtre = une zone", 44, JAUNE_TITRE), 2.75)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("ET, c'est une case")
        r1 = self.col(self.ligne([("ET", AMBRE), ("→ une case", WHITE)], 40), 1.75)
        self.play(FadeIn(r1, shift=RIGHT * 0.2), *allumer(t, 1, 0), run_time=0.5)
        self.au_mot("OU, c'est une ligne")
        self.play(*eteindre(t), run_time=0.2)
        r2 = self.col(self.bloc(["OU → ligne + colonne", "− la case commune"], 40), 0.65)
        r2[0][:2].set_color(AMBRE)
        self.play(FadeIn(r2, shift=RIGHT * 0.2), *self.zone_ou(t, 1, 0), run_time=0.6)
        self.au_mot("moins leur case commune")
        self.play(*allumer(t, 1, 0), run_time=0.4)
        self.au_mot("NON, c'est le total")
        self.play(*eteindre(t), run_time=0.2)
        r3 = self.col(self.ligne([("NON", AMBRE), ("→ total − la zone", WHITE)], 40), -0.65)
        self.play(FadeIn(r3, shift=RIGHT * 0.2), *allumer(t, 3, 2), run_time=0.5)
        self.insister(VGroup(r1, r2, r3), 1.04, 0.3)
        self.attendre_voix()

    # ── 03 : ET ─────────────────────────────────────────────────────────────

    def ecran_et(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-et")
        t = self.tab_pret()
        self.au_mot("Premier filtre")
        b = self.col(filtre("Naturel", "ET", "En péril"), 2.6)
        self.play(FadeIn(b, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("la ligne Naturel")
        self.play(*teinter_ligne(t, 1, VIOLET_P), run_time=0.4)
        self.au_mot("la colonne En péril")
        self.play(*teinter_colonne(t, 0, ORANGE_P), run_time=0.4)
        self.au_mot("12 biens")
        self.play(*allumer(t, 1, 0), run_time=0.3)
        self.play(t.texte_case(1, 0).animate.scale(1.8), run_time=0.3)
        self.play(t.texte_case(1, 0).animate.scale(1 / 1.8), run_time=0.3)
        r = self.col(self.ligne([("ET", AMBRE), ("= une case :", WHITE), ("12", VERT_OK)], 46), 1.2)
        self.play(FadeIn(r, scale=0.8), run_time=0.4)
        self.insister(r[2], 1.4, 0.25)
        self.attendre_voix()

    # ── 04 : OU ─────────────────────────────────────────────────────────────

    def ecran_ou(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-ou")
        t = self.tab_pret()
        self.au_mot("Deuxième filtre")
        b = self.col(filtre("Culturel", "OU", "En péril"), 2.6)
        self.play(FadeIn(b, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("La ligne Culturel")
        self.play(*teinter_ligne(t, 0, VIOLET_P), run_time=0.4)
        self.play(Indicate(t.texte_case(0, 2), color=VIOLET_H, scale_factor=1.6), run_time=0.5)
        self.au_mot("La colonne En péril")
        self.play(*teinter_colonne(t, 0, ORANGE_P), run_time=0.4)
        self.play(Indicate(t.texte_case(3, 0), color=ORANGE_V, scale_factor=1.6), run_time=0.5)
        self.au_mot("Mais les 42")
        self.play(*allumer(t, 0, 0), run_time=0.3)
        deux = self.col(self.bloc(["les 42 sont", "dans les deux !"], 36, ROUGE_ERREUR), 1.45)
        self.play(FadeIn(deux, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("991 plus 54")
        k = self.col(self.ligne([("991", VIOLET_CLAIR), ("+", WHITE), ("54", ORANGE_V), ("−", WHITE),
                                 ("42", ROUGE_ERREUR)], 44), 0.1)
        self.play(FadeIn(k, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égale 1 003")
        eg = self.col(self.ligne([("=", WHITE), ("1 003", VERT_OK)], 50), -0.85, xl=self.XL + 0.6)
        self.play(FadeIn(eg, scale=0.7), run_time=0.4)
        self.insister(eg[1], 1.35, 0.25)
        self.attendre_voix()

    # ── 05 : question 1 (naturel OU en péril) ───────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t = self.tab_pret(boite=(-6.6, 0.3, -3.0, 1.9))
        b = filtre("Naturel", "OU", "En péril", fs=28)
        caser(b, -6.4, 0.2, 2.2, 2.95)
        self.add(b)

        def montrer():
            self.play(*self.zone_ou(t, 1, 0), run_time=0.4)
            self.play(*allumer(t, 1, 0), run_time=0.4)

        self.question_pause("05-question", "05b-reponse", ["Naturel OU en péril :", "combien de biens ?"],
                            ["282", "294", "12"], 0, ["240 + 54 − 12 = 282", "B : 12 comptés 2 fois ; C : un ET"],
                            x0=self.XL + 0.2, largeur=5.0, ys=(0.95, 0.0, -0.95), geste=montrer)

    # ── 06 : NON ────────────────────────────────────────────────────────────

    def ecran_non(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-non")
        t = self.tab_pret()
        self.au_mot("Troisième filtre")
        b = self.col(filtre("NON", "(Culturel", "ET", "En péril)"), 2.6)
        self.play(FadeIn(b, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("C'est tout le tableau")
        tout = [(r, c) for r in range(3) for c in range(2)]
        self.play(*teinter(t, tout, "#bbf7d0"), run_time=0.5)
        self.au_mot("sauf une case")
        self.play(*teinter(t, [(0, 0)], "#fecaca"), run_time=0.4)
        x = croix(t.case(0, 0), sw=5)
        self.play(Create(x), run_time=0.3)
        self.au_mot("1 273 moins 42")
        k = self.col(self.ligne([("1 273", WHITE), ("−", WHITE), ("42", ROUGE_ERREUR)], 46), 1.3)
        self.play(FadeIn(k, shift=RIGHT * 0.2), Indicate(t.texte_case(3, 2), color=AMBRE, scale_factor=1.5),
                  run_time=0.5)
        self.au_mot("égale 1 231")
        eg = self.col(self.ligne([("=", WHITE), ("1 231", VERT_OK)], 50), 0.45, xl=self.XL + 0.6)
        self.play(FadeIn(eg, scale=0.7), run_time=0.4)
        self.insister(eg[1], 1.35, 0.25)
        self.attendre_voix()

    # ── 07 : le piège (traduire la phrase) ──────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        t = self.tab_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège : traduire", 46, ROUGE_ERREUR), 3.0)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("à la fois naturels et menacés")
        p1 = self.col(self.t("« à la fois naturels et menacés »", 30, GREY_A), 2.2)
        self.play(FadeIn(p1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("c'est ET")
        f1 = self.col(VGroup(filtre("Naturel", "ET", "En péril", fs=28), self.t("12", 44, VERT_OK)).arrange(RIGHT, buff=0.3), 1.45)
        self.play(FadeIn(f1, shift=RIGHT * 0.2), *allumer(t, 1, 0), run_time=0.5)
        self.au_mot("ou bien menacés")
        p2 = self.col(self.t("« naturels, ou bien menacés »", 30, GREY_A), 0.45)
        self.play(FadeIn(p2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("c'est OU")
        f2 = self.col(VGroup(filtre("Naturel", "OU", "En péril", fs=28), self.t("282", 44, VERT_OK)).arrange(RIGHT, buff=0.3), -0.3)
        self.play(FadeIn(f2, shift=RIGHT * 0.2), *self.zone_ou(t, 1, 0), run_time=0.5)
        self.au_mot("Un seul mot change")
        fin = self.col(self.ligne([("un mot :", WHITE), ("12", VERT_OK), ("→", WHITE), ("282", VERT_OK), ("!", WHITE)], 42), -1.35)
        self.play(FadeIn(fin, scale=0.8), run_time=0.5)
        self.insister(fin, 1.08, 0.3)
        self.attendre_voix()

    # ── 08 : question 2 (quel filtre ?) ─────────────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t = self.tab_pret(boite=(-6.6, -0.75, -2.6, 2.2))

        def montrer():
            self.play(*teinter(t, [(r, 1) for r in range(3)], "#bbf7d0"), run_time=0.4)
            self.play(Indicate(t.texte_case(3, 1), color=VERT_OK, scale_factor=1.6), run_time=0.5)

        self.question_pause("08-question", "08b-reponse", ["Le tableur affiche 1 219 biens.", "Quel filtre ?"],
                            [filtre("NON", "En péril", fs=30), filtre("NON", "Culturel", fs=30),
                             filtre("Culturel", "ET", "Hors péril", fs=30)], 0,
                            ["1 273 − 54 = 1 219", "B : 282 ; C : 949"],
                            x0=-0.45, largeur=6.8, ys=(0.8, -0.2, -1.2), y_bas=-2.2, geste=montrer)

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        t = self.tab_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Un : combien")
        q1 = self.col(VGroup(self.t("1.", 38, AMBRE), filtre("Mixte", "OU", "En péril", fs=30)).arrange(RIGHT, buff=0.2), 1.6)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Deux : combien")
        q2 = self.col(VGroup(self.t("2.", 38, AMBRE), filtre("NON", "Naturel", fs=30)).arrange(RIGHT, buff=0.2), 0.5)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.pause_defi(-0.7)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        t = self.tab_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), *self.zone_ou(t, 2, 0), run_time=0.5)
        self.au_mot("42 plus 54")
        k1 = self.col(self.ligne([("1.", AMBRE), ("42 + 54 − 0", WHITE)], 42), 1.8)
        self.play(FadeIn(k1, shift=RIGHT * 0.2), *allumer(t, 2, 0), run_time=0.4)
        self.au_mot("égale 96")
        r1 = self.ligne([("=", WHITE), ("96", VERT_OK)], 42).next_to(k1, RIGHT, buff=0.2)
        self.play(FadeIn(r1, scale=0.7), run_time=0.4)
        self.au_mot("aucun bien mixte")
        z = self.col(self.t("(aucun bien mixte en péril)", 30, GREY_A), 1.15, xl=self.XL + 0.4)
        self.play(FadeIn(z), run_time=0.3)
        self.au_mot("1 273 moins 240")
        self.play(*eteindre(t), run_time=0.2)
        self.play(*teinter(t, [(r, c) for r in (0, 2) for c in range(2)], "#bbf7d0"), run_time=0.4)
        k2 = self.col(self.ligne([("2.", AMBRE), ("1 273 − 240", WHITE)], 42), 0.25)
        self.play(FadeIn(k2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 1 033")
        r2 = self.col(self.ligne([("=", WHITE), ("1 033", VERT_OK)], 46), -0.5, xl=self.XL + 0.55)
        self.play(FadeIn(r2, scale=0.7), run_time=0.4)
        self.insister(r2[1], 1.3, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        t = self.tab_pret()
        lignes = self.finale([("ET :", "une case"), ("OU : ligne + colonne", "− la case commune"),
                              ("NON :", "le total − la zone")], [1.75, 0.15, -1.45])
        self.au_mot("ET, c'est une case")
        self.montrer_ligne(lignes[0], *allumer(t, 1, 0))
        self.au_mot("OU, c'est la ligne")
        self.montrer_ligne(lignes[1], *self.zone_ou(t, 0, 0))
        self.au_mot("Et NON")
        self.montrer_ligne(lignes[2], *eteindre(t))
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_regle()
        self.ecran_et()
        self.ecran_ou()
        self.ecran_question1()
        self.ecran_non()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsFiltreEffectifPremiere(StatsFiltreEffectifBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "bleue"
