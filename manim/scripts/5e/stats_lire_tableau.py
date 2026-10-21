# stats_lire_tableau.py
# EleveAI — Maths 5e ET 4e — série « Statistiques » (cycle 4), épisode COMMUN :
# LIRE ET INTERPRÉTER UN TABLEAU STATISTIQUE (micro du coach stat_lire_tableau,
# en 5e notion stat_statistique, épisode 02 ; en 4e notion stat_donnee, épisode
# 01). Banques : 5e genLireTableau (effectif d'une case, total, écart, « ne
# sont pas », case manquante avec le total) ; 4e genLireTableauCat,
# genTableauDouble (tableau à DOUBLE ENTRÉE : ligne × colonne), genMaxMinTableau.
# AVEC VOIX. Paysage 16:9. CEINTURES : 5e ORANGE (croiser ligne et colonne,
# total, case manquante : deux crans au-dessus du « je vois ») ; 4e JAUNE (la
# même lecture, révisée un cran plus bas pour la 4e). Short jumeau :
# stats_lire_tableau_short.py (blanche), rendu une fois, copié sous les deux noms.
#
# ⭐ Décor et métier : l'AÉRONAUTIQUE, l'aéroport Roland-Garros ; une
# PLANIFICATRICE organise les vols et prévoit les équipes au sol. Données
# VRAISEMBLABLES (ordre de grandeur des vols hebdomadaires, pas un programme
# réel), calculées en Python :
#   avril    : Paris 28, Maurice 21, Mayotte 12, Madagascar 9 → total 70
#   décembre : Paris 42, Maurice 24, Mayotte 15, Madagascar 9 → total 90
#   42 − 28 = 14 ; 70 − 28 − 21 − 12 = 9 ; 90 − 42 = 48.
# ⭐ La figure est CELLE DU COACH (canvas_stats.Tableau = `tableau_donnees`) ;
# gestes repris du cycle 3 (stats_tableau_commun : teinter, flèches ligne /
# colonne, case allumée avec anneau).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Écrans : 00 garde · 01 la planificatrice · 02 titre, lignes, colonnes, valeurs
# · 03 une case (décembre × Maurice) · 04 le total d'une ligne · 05 comparer
# (Paris : +14) · 06 le piège (mauvaise colonne) · 07 défi · 07b correction ·
# 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/5e-stats-lire-tableau.json (débit −10) ; la voix ne cite
# aucune classe. Calage : manim/scripts/5e/stats5_lire_tableau_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/5e/stats_lire_tableau.py StatsLireTableau5e -o eleveai-maths-5e-stats-lire-tableau --media_dir manim/scripts/5e/media-lire-tableau
# python -m manim render -qh --disable_caching manim/scripts/5e/stats_lire_tableau.py StatsLireTableau4e -o eleveai-maths-4e-stats-lire-tableau --media_dir manim/scripts/5e/media-lire-tableau-4e
# Sorties : manim/sorties/5e/maths/statistiques/02-lire-tableau/
#           manim/sorties/4e/maths/statistiques/01-lire-tableau/
# python -m manim render -qh --disable_caching manim/scripts/5e/stats_lire_tableau.py StatsLireTableau3e -o eleveai-maths-3e-stats-lire-tableau --media_dir manim/scripts/5e/media-lire-tableau-3e
#           manim/sorties/3e/maths/statistiques/01-lire-tableau/ (3e : ceinture BLANCHE, révision)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from canvas_stats import CASE_ALLUMEE, ANNEAU  # noqa: E402

DEST = ["Paris", "Maurice", "Mayotte", "Madagascar"]
MOIS = ["Avril", "Décembre"]
VOLS = [[28, 21, 12, 9], [42, 24, 15, 9]]
TOTAUX = [sum(r) for r in VOLS]
assert TOTAUX == [70, 90] and VOLS[1][0] - VOLS[0][0] == 14 and 90 - 42 == 48
PALE_L = "#fde68a"   # la ligne choisie
PALE_C = "#bfdbfe"   # la colonne choisie


def avion(s=1.0, couleur=WHITE):
    """Un avion de ligne vu de dessus (le nez vers la droite)."""
    corps = RoundedRectangle(width=2.2, height=0.32, corner_radius=0.16, fill_color=couleur, fill_opacity=1,
                             stroke_width=0)
    aile = Polygon(P(-0.1, 0), P(0.35, 0), P(-0.35, 1.05), P(-0.65, 1.05), fill_color=couleur, fill_opacity=1,
                   stroke_width=0)
    aile2 = aile.copy().flip(RIGHT, about_point=ORIGIN)
    queue = Polygon(P(-0.85, 0), P(-0.65, 0), P(-1.05, 0.45), P(-1.2, 0.45), fill_color=couleur, fill_opacity=1,
                    stroke_width=0)
    queue2 = queue.copy().flip(RIGHT, about_point=ORIGIN)
    return VGroup(aile, aile2, queue, queue2, corps).scale(s)


def personne(peau="#8d5524", haut="#2563eb", cheveux="#111827", r=0.3, casque_audio=False):
    """Un personnage simple : cheveux, tête, buste (et un casque audio)."""
    tete = Circle(radius=r, fill_color=peau, fill_opacity=1, stroke_width=0)
    chev = Circle(radius=r * 1.22, fill_color=cheveux, fill_opacity=1, stroke_width=0).move_to(
        tete.get_center() + UP * r * 0.18)
    corps = Polygon(P(-1.8 * r, -4 * r), P(1.8 * r, -4 * r), P(1.2 * r, -1.15 * r), P(-1.2 * r, -1.15 * r),
                    fill_color=haut, fill_opacity=1, stroke_width=0)
    g = VGroup(chev, tete, corps)
    if casque_audio:
        arc = Arc(radius=r * 1.25, start_angle=0.1, angle=PI - 0.2, stroke_color="#e5e7eb",
                  stroke_width=6).move_to(tete.get_center() + UP * r * 0.55)
        micro = Line(P(r * 1.1, -0.1 * r), P(0.3 * r, -0.75 * r), stroke_color="#e5e7eb", stroke_width=5)
        g.add(arc, micro)
    return g


class StatsLireTableauBase(Paysage5):
    nom_voix = "5e-stats-lire-tableau"
    fichier_marques = "stats5_lire_tableau_marques.json"
    identite = "Maths 5e — EleveAI"
    ceinture = "orange"
    XB = -6.1   # le bord gauche des lignes de texte, sous le tableau

    # ── les figures ─────────────────────────────────────────────────────────

    def tableau(self, valeurs=True, total=False, totaux=(None, None), avril_mada="9"):
        """Le tableau des vols ; la colonne Total est TOUJOURS là (pour que la
        figure ne bouge pas), mais invisible tant que total=False."""
        lignes = [[*VOLS[0][:3], avril_mada, totaux[0]], [*VOLS[1], totaux[1]]]
        tab = Tableau([*DEST, "Total"], lignes, libelles=MOIS, coin="Vols", largeur_case=2.2,
                      largeur_libelle=2.1, hauteur=0.9, fs=31, titre="Vols par semaine", centre=P(0, 1.6))
        textes_devant(tab)
        self.col_total = VGroup(tab.tetes[4], tab.cases[0][4], tab.cases[1][4])
        if not total:
            self.col_total.set_opacity(0)
        if not valeurs:
            for r in range(2):
                for c in range(4):
                    tab.texte_case(r, c).set_opacity(0)
        return tab

    def bas(self, mob, y, x=None):
        """Pose mob sous le tableau, calé à gauche."""
        mob.move_to(P(0, y - 0.25)).align_to(P(self.XB if x is None else x, 0), LEFT)
        if mob.get_right()[0] > 5.6:
            mob.scale_to_fit_width(5.6 - mob.get_left()[0])
        return mob

    def montrer_total(self, tab):
        """La colonne Total apparaît (en-tête et cases)."""
        tab.tetes[4].set_opacity(1)
        for r in range(2):
            tab.cases[r][4][0].set_opacity(1)
        return FadeIn(VGroup(tab.tetes[4], tab.cases[0][4][0], tab.cases[1][4][0]), shift=LEFT * 0.2)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire un tableau", self.identite, self.ceinture)
        self.add(titre, ident, ech)
        mini = Tableau(["", "", ""], [[None] * 3, [None] * 3], libelles=["", ""], coin="", largeur_case=1.2,
                       largeur_libelle=1.4, hauteur=0.6, fs=24, centre=P(-0.6, 0.05))
        self.play(FadeIn(mini, scale=0.9), run_time=0.3)
        self.au_mot("Une ligne")
        self.play(*teinter_ligne(mini, 1, PALE_L), run_time=0.4)
        self.au_mot("une colonne")
        self.play(*teinter_colonne(mini, 1, PALE_C), run_time=0.4)
        self.au_mot("une case")
        self.play(*allumer(mini, 1, 1), run_time=0.4)
        self.insister(mini.case(1, 1), 1.3, 0.2)
        self.au_mot("sais-tu lire")
        q = self.t("?", 90, ORANGE_RETENUE).next_to(mini, RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la planificatrice ──────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("À l'aéroport")
        piste = Rectangle(width=8.0, height=0.9, fill_color="#334155", fill_opacity=1, stroke_width=0)
        piste.move_to(P(-2.6, -1.6))
        traits = VGroup(*[Rectangle(width=0.5, height=0.08, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                          .move_to(P(-6.2 + 0.9 * k, -1.6)) for k in range(9)])
        av = avion(0.9).move_to(P(-5.5, -1.6))
        nom = self.t("Aéroport Roland-Garros", 42, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.play(FadeIn(piste), FadeIn(traits), FadeIn(av), Write(nom), run_time=0.8)
        self.play(av.animate.move_to(P(-1.5, 0.6)).rotate(0.35).scale(0.8), run_time=0.9)
        self.au_mot("une planificatrice")
        pers = personne(peau="#c68642", haut="#0d9488", r=0.45, casque_audio=True).move_to(P(3.6, 0.0))
        met = self.metier("Planificatrice", fs=44).next_to(pers, UP, buff=0.45)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(met, scale=0.8), run_time=0.6)
        self.au_mot("Combien d'avions")
        q1 = self.t("Combien d'avions ?", 38).move_to(P(-2.6, 1.9))
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.4)
        self.au_mot("et vers où")
        q2 = self.t("Vers où ?", 38, BLEU_CALCUL).next_to(q1, DOWN, buff=0.25)
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.4)
        self.au_mot("elle prévoit les équipes")
        equipe = VGroup(*[personne(haut=c, r=0.16) for c in ("#f97316", "#f97316", "#f97316")]).arrange(RIGHT, buff=0.25)
        equipe.next_to(pers, DOWN, buff=0.5)
        self.play(LaggedStart(*[FadeIn(e, shift=UP * 0.2) for e in equipe], lag_ratio=0.2), run_time=0.7)
        self.attendre_voix()

    # ── 02 : titre, lignes, colonnes, valeurs ───────────────────────────────

    def ecran_titre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-titre")
        tab = self.tableau(valeurs=False)
        squelette = VGroup(tab.carte, tab.coin, *tab.tetes[:4], tab.libelles,
                           *[c[0] for r in tab.cases for c in r[:4]])
        self.au_mot("je lis le titre")
        self.play(FadeIn(tab.carte), Write(tab.titre), run_time=0.6)
        self.play(Circumscribe(tab.titre, color=AMBRE), run_time=0.6)
        self.au_mot("En haut")
        self.play(FadeIn(squelette, shift=UP * 0.1), run_time=0.4)
        e = self.bas(self.t("En haut : où vont les avions", 38), -0.95)
        self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.3)
        for c, mot in enumerate(DEST):
            self.au_mot(mot)
            self.play(Indicate(tab.tetes[c], color=AMBRE, scale_factor=1.15), run_time=0.3)
        self.au_mot("À gauche")
        e2 = self.bas(self.t("À gauche : deux mois", 38), -1.7)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), Indicate(tab.libelles, color=AMBRE, scale_factor=1.1), run_time=0.5)
        for r, debut in enumerate(["En avril :", "En décembre :"]):
            self.au_mot(debut)
            self.play(*teinter_ligne(tab, r, PALE_L), run_time=0.3)
            for c, i in enumerate(self.positions(debut, 4)):
                self.au_pos(i)
                self.play(tab.texte_case(r, c).animate.set_opacity(1), run_time=0.15)
                self.play(Indicate(tab.texte_case(r, c), color=AMBRE, scale_factor=1.5), run_time=0.25)
            self.play(*eteindre(tab), run_time=0.3)
        self.attendre_voix()

    # ── 03 : une case ───────────────────────────────────────────────────────

    def ecran_case(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-case")
        tab = self.tableau()
        self.add(tab)
        self.au_mot("En décembre, combien")
        q = self.bas(self.ligne([("Décembre", WHITE), ("et", WHITE), ("Maurice", WHITE), ("?", ORANGE_RETENUE)], 42),
                     -0.95)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("la ligne de décembre")
        fl = fleche_ligne(tab, 1, 1)
        self.play(*teinter_ligne(tab, 1, PALE_L), GrowArrow(fl), q[0].animate.set_color(JAUNE_TITRE), run_time=0.6)
        self.au_mot("la colonne de Maurice")
        fc = fleche_colonne(tab, 1, 1)
        self.play(*teinter_colonne(tab, 1, PALE_C), GrowArrow(fc), q[2].animate.set_color(BLEU_CALCUL), run_time=0.6)
        self.au_mot("se croisent")
        self.play(*allumer(tab, 1, 1), run_time=0.4)
        self.au_mot("24 vols")
        r = self.bas(self.ligne([("24", VERT_OK), ("vols", WHITE)], 52), -1.95)
        self.play(FadeIn(r, scale=0.7), Indicate(tab.texte_case(1, 1), color=AMBRE, scale_factor=1.7), run_time=0.5)
        self.play(Create(self.encadrer(r)), run_time=0.35)
        self.attendre_voix()

    # ── 04 : le total d'une ligne ───────────────────────────────────────────

    def ecran_total(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-total")
        tab = self.tableau()
        self.add(tab)
        self.au_mot("Combien de vols en tout")
        q = self.bas(self.t("En tout, en décembre ?", 42), -0.95)
        self.play(FadeIn(q, shift=RIGHT * 0.2), self.montrer_total(tab), run_time=0.5)
        self.au_mot("J'additionne la ligne")
        fl = fleche_ligne(tab, 1, 3)
        self.play(*teinter_ligne(tab, 1, PALE_L), GrowArrow(fl), run_time=0.5)
        somme = self.ligne([("42", WHITE), ("+", WHITE), ("24", WHITE), ("+", WHITE), ("15", WHITE), ("+", WHITE),
                            ("9", WHITE), ("=", WHITE), ("90", VERT_OK)], 48, 0.2)
        self.bas(somme, -1.9)
        idx = self.positions("la ligne :", 5)
        for c in range(4):
            self.au_pos(idx[c])
            morceaux = [somme[2 * c]] + ([somme[2 * c - 1]] if c > 0 else [])
            self.play(*[FadeIn(m, scale=1.4) for m in morceaux],
                      Indicate(tab.texte_case(1, c), color=AMBRE, scale_factor=1.5), run_time=0.3)
        self.au_pos(idx[4])
        self.play(FadeIn(somme[7:], scale=1.4), remplir(tab, 1, 4, 90), *allumer(tab, 1, 4), run_time=0.45)
        self.au_mot("l'effectif total")
        et = self.t("l'effectif total du mois", 38, VERT_OK).next_to(somme, DOWN, buff=0.3).align_to(somme, LEFT)
        self.play(FadeIn(et, shift=UP * 0.2), run_time=0.4)
        self.insister(somme[8], 1.4, 0.25)
        self.attendre_voix()

    # ── 05 : comparer (Paris) ───────────────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-comparer")
        tab = self.tableau(total=True, totaux=(None, 90))
        self.add(tab)
        self.au_mot("Et vers Paris")
        fc = fleche_colonne(tab, 0, 1)
        self.play(*teinter_colonne(tab, 0, PALE_C), GrowArrow(fc), run_time=0.5)
        self.au_mot("28 vols en avril")
        self.play(*allumer(tab, 0, 0), run_time=0.35)
        self.au_mot("42 en décembre")
        self.play(*allumer(tab, 1, 0), run_time=0.35)
        calc = self.ligne([("42", WHITE), ("−", WHITE), ("28", WHITE), ("=", WHITE), ("14", VERT_OK),
                           ("vols de plus", WHITE)], 48, 0.2)
        self.bas(calc, -1.0)
        self.au_mot("42 moins")
        self.play(FadeIn(calc[:2], scale=1.3), run_time=0.3)
        self.au_mot("28, égale")
        self.play(FadeIn(calc[2:4], scale=1.3), run_time=0.3)
        self.au_mot("14 vols de plus")
        self.play(FadeIn(calc[4:], scale=1.3), run_time=0.4)
        self.insister(calc[4], 1.5, 0.25)
        self.au_mot("les vacances de Noël")
        av = avion(0.45, JAUNE_TITRE)
        noel = self.bas(VGroup(av, self.t("Les vacances de Noël !", 40, JAUNE_TITRE)).arrange(RIGHT, buff=0.3), -2.1)
        self.play(FadeIn(noel[1], shift=UP * 0.2), FadeIn(av, shift=RIGHT * 0.6), run_time=0.6)
        self.attendre_voix()

    # ── 06 : le piège (la mauvaise colonne) ─────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        tab = self.tableau(total=True, totaux=(None, 90))
        self.add(tab)
        self.au_mot("Le piège")
        titre = self.bas(self.t("Le piège", 48, ROUGE_ERREUR), -0.9)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("la bonne ligne")
        fl = fleche_ligne(tab, 1, 2)
        self.play(*teinter_ligne(tab, 1, PALE_L), GrowArrow(fl), run_time=0.5)
        self.au_mot("la mauvaise colonne")
        self.play(*allumer(tab, 1, 2, couleur="#fecaca", anneau=ROUGE_ERREUR), run_time=0.4)
        self.au_mot("15, c'est Mayotte")
        e1 = self.bas(self.ligne([("15", ROUGE_ERREUR), (": c'est Mayotte,", WHITE)], 40), -1.65)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), Indicate(tab.tetes[2], color=ROUGE_ERREUR), run_time=0.5)
        self.au_mot("pas Maurice")
        e1b = self.t("pas Maurice !", 40, ROUGE_ERREUR).next_to(e1, RIGHT, buff=0.25)
        x = croix(tab.case(1, 2), sw=6).set_z_index(8)
        self.play(FadeIn(e1b, shift=RIGHT * 0.2), Create(x), run_time=0.5)
        self.au_mot("Un doigt sur la ligne")
        self.play(*eteindre(tab), FadeOut(x), FadeOut(fl), run_time=0.3)
        d1 = Dot(radius=0.14, color=ORANGE_RETENUE).set_stroke(WHITE, 3).set_z_index(9)
        d1.move_to(tab.libelles[1].get_left() + RIGHT * 0.25)
        self.play(FadeIn(d1, scale=0.5), *teinter_ligne(tab, 1, PALE_L), run_time=0.4)
        self.au_mot("un doigt sur la colonne")
        d2 = d1.copy().move_to(tab.tetes[1].get_top() + DOWN * 0.18)
        self.play(FadeIn(d2, scale=0.5), *teinter_colonne(tab, 1, PALE_C), run_time=0.4)
        self.au_mot("la case du croisement")
        self.play(d1.animate.move_to(tab.case(1, 1).get_center() + LEFT * 0.6),
                  d2.animate.move_to(tab.case(1, 1).get_center() + UP * 0.32), *allumer(tab, 1, 1), run_time=0.6)
        e2 = self.bas(self.ligne([("Décembre et Maurice :", WHITE), ("24", VERT_OK)], 40), -2.4)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        tab = self.tableau(total=True, totaux=(None, 90), avril_mada="?")
        self.add(tab)
        self.au_mot("À toi de jouer")
        titre = self.bas(self.t("À toi de jouer", 46, JAUNE_TITRE), -0.85)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("70 vols en tout")
        self.play(remplir(tab, 0, 4, 70), *allumer(tab, 0, 4), run_time=0.45)
        self.au_mot("Combien vont à Madagascar")
        q1 = self.bas(self.ligne([("1.", AMBRE), ("Avril, Madagascar : combien ?", WHITE)], 38), -1.55)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), Indicate(tab.texte_case(0, 3), scale_factor=1.6), run_time=0.5)
        self.au_mot("ne vont pas à Paris")
        q2 = self.bas(self.ligne([("2.", AMBRE), ("Décembre : combien ne vont pas à Paris ?", WHITE)], 38), -2.2)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE).move_to(P(1.6, -2.95))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        tab = self.tableau(total=True, totaux=(70, 90), avril_mada="?")
        self.add(tab)
        titre = self.bas(self.t("Correction", 46, JAUNE_TITRE), -0.85)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Madagascar, en avril")
        self.play(*teinter_ligne(tab, 0, PALE_L), run_time=0.4)
        c1 = self.ligne([("70", WHITE), ("−", WHITE), ("28", WHITE), ("−", WHITE), ("21", WHITE), ("−", WHITE),
                         ("12", WHITE), ("=", WHITE), ("9", VERT_OK)], 44, 0.18)
        self.bas(c1, -1.6)
        for (mot, idx, case) in [("70 moins", [0, 1], (0, 4)), ("28, moins", [2, 3], (0, 0)),
                                 ("21, moins", [4, 5], (0, 1)), ("12, égale", [6, 7], (0, 2))]:
            self.au_mot(mot)
            self.play(*[FadeIn(c1[j], scale=1.3) for j in idx],
                      Indicate(tab.texte_case(*case), color=AMBRE, scale_factor=1.5), run_time=0.3)
        self.au_mot("9 vols")
        self.play(FadeIn(c1[8], scale=1.6), remplir(tab, 0, 3, 9), *allumer(tab, 0, 3), run_time=0.45)
        self.au_mot("En décembre :")
        self.play(*eteindre(tab), run_time=0.3)
        self.play(*teinter_ligne(tab, 1, PALE_L), run_time=0.3)
        c2 = self.ligne([("90", WHITE), ("−", WHITE), ("42", WHITE), ("=", WHITE), ("48", VERT_OK),
                         ("vols", WHITE)], 44, 0.2)
        self.bas(c2, -2.35)
        self.au_mot("90 moins")
        self.play(FadeIn(c2[:2], scale=1.3), Indicate(tab.texte_case(1, 4), color=AMBRE, scale_factor=1.5), run_time=0.3)
        self.au_mot("42, égale")
        self.play(FadeIn(c2[2:4], scale=1.3), Indicate(tab.texte_case(1, 0), color=AMBRE, scale_factor=1.5), run_time=0.3)
        self.au_mot("48 vols")
        self.play(FadeIn(c2[4:], scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(c1, c2))), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        tab = self.tableau(total=True, totaux=(70, 90))
        tab.scale(0.8).move_to(P(-0.4, 1.55))
        self.add(tab)
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP, buff=0.2)), run_time=0.6)
        textes = ["Je lis le titre, les lignes, les colonnes.", "Je lis la case du croisement.",
                  "Pour un total, j'additionne ;"]
        lignes = VGroup()
        for s_, y in zip(textes, [-0.5, -1.2, -1.9]):
            lg = VGroup(self.coche(), self.t(s_, 36)).arrange(RIGHT, buff=0.3)
            lg.move_to(P(0, y)).align_to(P(-6.2, 0), LEFT)
            if lg.get_right()[0] > 5.5:
                lg.scale_to_fit_width(11.7).align_to(P(-6.2, 0), LEFT)
            lignes.add(lg)
        self.au_mot("Je lis le titre")
        self.montrer_ligne(lignes[0], Circumscribe(tab.titre, color=AMBRE))
        self.au_mot("Je lis la case")
        self.montrer_ligne(lignes[1], *teinter_ligne(tab, 1, PALE_L), *teinter_colonne(tab, 1, PALE_C))
        self.play(*allumer(tab, 1, 1), run_time=0.4)
        self.au_mot("Pour un total")
        suite = self.t("pour une case manquante, j'enlève au total.", 36).next_to(lignes[2][1], DOWN, buff=0.3)
        suite.align_to(lignes[2][1], LEFT)
        self.montrer_ligne(lignes[2], Indicate(tab.texte_case(1, 4), color=AMBRE, scale_factor=1.5))
        self.au_mot("pour une case manquante")
        self.play(FadeIn(suite, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_titre()
        self.ecran_case()
        self.ecran_total()
        self.ecran_comparer()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class StatsLireTableau5e(StatsLireTableauBase):
    identite = "Maths 5e — EleveAI"
    ceinture = "orange"


class StatsLireTableau4e(StatsLireTableauBase):
    """Même vidéo pour la 4e : seules l'identité et la ceinture changent."""

    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"


class StatsLireTableau3e(StatsLireTableauBase):
    """Même vidéo pour la 3e (révision) : identité et ceinture seulement."""

    identite = "Maths 3e — EleveAI"
    ceinture = "blanche"
