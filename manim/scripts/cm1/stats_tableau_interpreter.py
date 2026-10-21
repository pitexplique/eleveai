# stats_tableau_interpreter.py
# EleveAI — Maths CM1 ET CM2 — série « Statistiques », épisode 03 :
# INTERPRÉTER UN TABLEAU (micro du coach : tableau_interpreter, banque
# cm1/maths/tableaux.bank.ts, canvas `tableau_donnees`), AVEC VOIX.
# Paysage 16:9, CEINTURE ORANGE : chercher le plus grand, comparer par une
# soustraction, puis CONCLURE par une phrase. Short jumeau :
# stats_tableau_interpreter_short.py (jaune).
#
# ⭐ Décor et métier : l'ALIMENTATION, une boulangerie ; une BOULANGÈRE note ses
# ventes (baguettes, croissants ; lundi, mercredi, samedi, dimanche) pour
# DÉCIDER combien de pain préparer : ni clients déçus, ni pain jeté.
# ⭐ La figure est CELLE DU COACH (canvas_stats.Tableau = `tableau_donnees`),
# posée EN HAUT sur toute la largeur (2 lignes, 4 colonnes) ; dessous, les
# comparaisons se VOIENT par deux barres côte à côte (la différence = « ? »).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Écrans : 00 garde · 01 la boulangère, trop peu / trop · 02 on remplit ·
# 03 le plus grand nombre de chaque ligne (240, 150 : le dimanche) ·
# 04 conclure (le dimanche, c'est le grand jour) · 05 comparer (90 − 40 = 50)
# · 06 le piège (110 < lundi, mais 60 > 40 : toute la ligne, toute la colonne)
# · 07 défi · 07b correction (240 − 180 = 60) · 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/cm-stats-tableau-interpreter.json (débit −10), WAV dans
# public/sons/cm-stats-tableau-interpreter/ ; calage mot à mot :
# manim/scripts/cm1/statscm_tableau_interpreter_marques.json.
# ⭐ UNE voix, UN script, DEUX rendus : StatsTableauInterpreterCM2 ne change que
# l'identité (« Maths CM2 — EleveAI »). La voix ne cite aucune classe.
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_tableau_interpreter.py StatsTableauInterpreterCM1 -o eleveai-maths-cm1-stats-tableau-interpreter --media_dir manim/scripts/cm1/media-tableau-interpreter
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_tableau_interpreter.py StatsTableauInterpreterCM2 -o eleveai-maths-cm2-stats-tableau-interpreter --media_dir manim/scripts/cm1/media-tableau-interpreter-cm2
# Sorties : manim/sorties/cm1/maths/statistiques/03-tableau-interpreter/ et
#           manim/sorties/cm2/maths/statistiques/03-tableau-interpreter/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_tableau_commun import *  # noqa: E402,F403
from stats_tableau_commun import P, BaseTableauPaysage  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, NUIT, ORANGE_Q, Tableau  # noqa: E402

PRODUITS = ["Baguettes", "Croissants"]
JOURS = ["Lundi", "Mercredi", "Samedi", "Dimanche"]
VENTES = [[120, 110, 180, 240], [40, 60, 90, 150]]
DORE, DORE_FONCE = "#f59e0b", "#b45309"
COUL_PROD = ["#fbbf24", "#fb923c"]   # baguettes, croissants (pour écrire sur le noir)


# ── les dessins : baguette, croissant, boutique, pétrin ─────────────────────

def baguette(s=1.0):
    corps = RoundedRectangle(width=2.0 * s, height=0.34 * s, corner_radius=0.17 * s, fill_color=DORE, fill_opacity=1,
                             stroke_color=DORE_FONCE, stroke_width=2)
    entailles = VGroup(*[Line(P((-0.6 + 0.4 * k) * s - 0.1 * s, -0.08 * s), P((-0.6 + 0.4 * k) * s + 0.1 * s, 0.08 * s),
                              color=DORE_FONCE, stroke_width=3) for k in range(4)])
    return VGroup(corps, entailles)


def croissant(s=1.0):
    parts = VGroup()
    for k, (a, w) in enumerate(((-0.9, 0.36), (-0.45, 0.48), (0, 0.56), (0.45, 0.48), (0.9, 0.36))):
        e = Ellipse(width=w * s, height=0.42 * s, fill_color=DORE if k % 2 == 0 else "#fbbf24", fill_opacity=1,
                    stroke_color=DORE_FONCE, stroke_width=2)
        e.move_to(P(np.sin(a) * 0.55 * s, -np.cos(a) * 0.3 * s + 0.15 * s)).rotate(a)
        parts.add(e)
    return parts


def boutique(s=1.0):
    mur = Rectangle(width=3.2 * s, height=2.0 * s, fill_color="#fef3c7", fill_opacity=1, stroke_width=0)
    bandes = VGroup(*[Rectangle(width=0.4 * s, height=0.5 * s, fill_color="#dc2626" if k % 2 == 0 else WHITE,
                                fill_opacity=1, stroke_width=0) for k in range(8)]).arrange(RIGHT, buff=0)
    bandes.next_to(mur, UP, buff=0)
    vitrine = Rectangle(width=2.0 * s, height=1.0 * s, fill_color="#bae6fd", fill_opacity=1, stroke_color=NUIT,
                        stroke_width=3).move_to(mur).shift(LEFT * 0.4 * s + DOWN * 0.2 * s)
    porte = Rectangle(width=0.6 * s, height=1.3 * s, fill_color="#92400e", fill_opacity=1, stroke_width=0)
    porte.align_to(mur, DOWN).align_to(mur, RIGHT).shift(LEFT * 0.2 * s)
    enseigne = Text("Boulangerie", font_size=int(26 * s), color=NUIT, weight=BOLD).next_to(bandes, DOWN, buff=0.06 * s)
    return VGroup(mur, bandes, vitrine, porte, enseigne)


def petrin(s=1.0):
    """Un pétrin vu de face : le bac (trapèze) et la pâte qui dépasse (index 0 : la pâte)."""
    bol = Polygon(P(-0.8 * s, 0.1 * s), P(0.8 * s, 0.1 * s), P(0.55 * s, -0.5 * s), P(-0.55 * s, -0.5 * s),
                  fill_color="#a16207", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    pate = Ellipse(width=1.3 * s, height=0.5 * s, fill_color="#fef3c7", fill_opacity=1,
                   stroke_width=0).shift(UP * 0.12 * s)
    return VGroup(pate, bol)


class StatsTableauInterpreterBase(BaseTableauPaysage):
    nom_voix = "cm-stats-tableau-interpreter"
    fichier_marques = "statscm_tableau_interpreter_marques.json"
    identite = "Maths CM1 — EleveAI"
    G = P(-0.4, 1.35)  # le centre du tableau, en haut
    Y_BAS = -1.2       # la première ligne de texte sous le tableau

    def tableau(self, plein=True):
        lignes = [list(r) for r in VENTES] if plein else [[None] * 4 for _ in range(2)]
        tab = Tableau(JOURS, lignes, libelles=PRODUITS, coin="Ventes", largeur_case=2.25, largeur_libelle=2.6,
                      hauteur=0.9, fs=32, titre="Ventes de la boulangerie", centre=self.G)
        return textes_devant(tab)

    def tableau_pret(self, plein=True):
        tab = self.tableau(plein)
        self.add(tab)
        return tab

    def bas(self, mob, y, x=None):
        """Pose mob sous le tableau, centré (ou calé à gauche en x), sans déborder."""
        if mob.width > 10.5:
            mob.scale_to_fit_width(10.5)
        mob.move_to(P(-0.5 if x is None else 0, y))
        if x is not None:
            mob.align_to(P(x, 0), LEFT)
        return mob

    def deux_barres(self, v_haut, v_bas, noms, y, couleur=COUL_PROD[1], x0=-4.3, longueur=5.1):
        """Deux barres horizontales calées à gauche (la plus grande en haut) ; le
        morceau en plus est marqué. Renvoie (b_haut, b_bas, surplus, noms) non joués."""
        u = longueur / max(v_haut, v_bas)
        h = 0.5

        def b(v, yy, op):
            return Rectangle(width=v * u, height=h, fill_color=couleur, fill_opacity=op, stroke_color=WHITE,
                             stroke_width=2).move_to(P(x0 + v * u / 2, yy))

        bh, bb = b(v_haut, y + 0.33, 0.9), b(v_bas, y - 0.33, 0.55)
        surplus = Rectangle(width=(v_haut - v_bas) * u, height=h + 0.12, fill_opacity=0, stroke_color=ORANGE_RETENUE,
                            stroke_width=6).move_to(P(x0 + (v_bas + (v_haut - v_bas) / 2) * u, y + 0.33))
        ns = VGroup(self.t(noms[0], 30).next_to(bh, LEFT, buff=0.2), self.t(noms[1], 30).next_to(bb, LEFT, buff=0.2))
        return bh, bb, surplus, ns

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        ti, ident, ech = self.garde("Interpréter un tableau", "orange")
        tab = Tableau(["Lun.", "Mer.", "Sam.", "Dim."], [[None] * 4, [None] * 4], libelles=PRODUITS, coin="",
                      largeur_case=0.95, largeur_libelle=2.0, hauteur=0.55, fs=22, centre=P(-1.3, 0.2))
        self.play(Write(ti), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tab, scale=0.9), run_time=0.6)
        self.au_mot("raconte une histoire")
        bulle = RoundedRectangle(width=1.7, height=1.0, corner_radius=0.4, fill_color=WHITE, fill_opacity=1,
                                 stroke_color=AMBRE, stroke_width=4).next_to(tab, RIGHT, buff=0.5).shift(UP * 0.6)
        pointe = Polygon(bulle.get_corner(DL) + RIGHT * 0.3, bulle.get_corner(DL) + RIGHT * 0.7,
                         bulle.get_corner(DL) + LEFT * 0.25 + DOWN * 0.4, fill_color=WHITE, fill_opacity=1,
                         stroke_width=0)
        points = VGroup(*[Dot(radius=0.09, color=NUIT) for _ in range(3)]).arrange(RIGHT, buff=0.2).move_to(bulle)
        self.play(FadeIn(VGroup(pointe, bulle), scale=0.5), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(p, scale=2) for p in points], lag_ratio=0.3), run_time=0.6)
        self.au_mot("l'écouter")
        oreille = self.t("?", 80, ORANGE_RETENUE).next_to(bulle, RIGHT, buff=0.3)
        self.play(FadeIn(oreille, scale=0.4), run_time=0.3)
        self.insister(VGroup(bulle, points), 1.15, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la boulangère ──────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        bout = boutique(1.15).move_to(P(-4.0, 1.2))
        metier = self.t("Boulangère", 48, BLEU_CALCUL).move_to(P(2.6, 2.7))
        pains = VGroup(baguette(1.0), croissant(1.0)).arrange(RIGHT, buff=0.5).next_to(metier, DOWN, buff=0.45)
        self.play(FadeIn(bout, shift=UP * 0.3), FadeIn(metier, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(p, scale=0.5) for p in pains],
                                                                  lag_ratio=0.3), run_time=0.7)
        self.au_mot("Avec son tableau")
        mini = Tableau(["Lun.", "Mer."], [[None] * 2, [None] * 2], libelles=["Baguettes", "Croissants"], coin="",
                       largeur_case=0.9, largeur_libelle=1.9, hauteur=0.5, fs=20, centre=P(-4.0, -1.35))
        self.play(FadeIn(mini, shift=UP * 0.2), run_time=0.5)
        self.au_mot("elle décide")
        dec = self.t("Combien de pain préparer ?", 40, JAUNE_TITRE).move_to(P(2.2, 0.55))
        self.play(FadeIn(dec, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Trop peu")
        triste = VGroup(Circle(radius=0.32, stroke_color=ROUGE_ERREUR, stroke_width=5),
                        Dot(P(-0.11, 0.08), radius=0.04, color=ROUGE_ERREUR),
                        Dot(P(0.11, 0.08), radius=0.04, color=ROUGE_ERREUR),
                        ArcBetweenPoints(P(-0.14, -0.16), P(0.14, -0.16), angle=-PI * 0.6, color=ROUGE_ERREUR,
                                         stroke_width=4))
        l1 = VGroup(triste, self.ligne([("Trop peu :", ORANGE_RETENUE), ("des clients déçus", WHITE)], 36))
        self.col(l1.arrange(RIGHT, buff=0.3), -0.65, xl=-1.2)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Trop :")
        poubelle = VGroup(Rectangle(width=0.5, height=0.6, fill_color="#475569", fill_opacity=1, stroke_color=WHITE,
                                    stroke_width=2),
                          Rectangle(width=0.62, height=0.1, fill_color="#64748b", fill_opacity=1, stroke_width=0)
                          .shift(UP * 0.36))
        l2 = VGroup(poubelle, self.ligne([("Trop :", ORANGE_RETENUE), ("du pain jeté", WHITE)], 36))
        self.col(l2.arrange(RIGHT, buff=0.3), -1.7, xl=-1.2)
        b2 = baguette(0.4).rotate(0.6).move_to(poubelle.get_top() + UP * 0.15)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), FadeIn(b2, shift=DOWN * 0.3), run_time=0.5)
        self.attendre_voix()

    # ── 02 : on remplit ─────────────────────────────────────────────────────

    def ecran_remplir(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-remplir")
        tab = self.tableau_pret(plein=False)
        for r, (nom, mots) in enumerate((("Les baguettes", ["120 le lundi", "110 le mercredi", "180 le samedi",
                                                            "240 le dimanche"]),
                                         ("Les croissants", ["40,", "60,", "90 et", "150."]))):
            self.au_mot(nom)
            icone = (baguette(1.3) if r == 0 else croissant(1.3)).move_to(P(-3.0, -1.8))
            nomt = self.t(PRODUITS[r], 46, COUL_PROD[r]).next_to(icone, RIGHT, buff=0.5)
            anims = teinter_ligne(tab, r)
            if r == 1:
                anims += [tab.case(0, c).animate.set_fill(WHITE) for c in range(4)]
                anims += [FadeOut(self._tete)]
            self.play(FadeIn(VGroup(icone, nomt), shift=UP * 0.2), *anims, run_time=0.4)
            self._tete = VGroup(icone, nomt)
            for c, mot in enumerate(mots):
                self.au_mot(mot)
                self.play(remplir(tab, r, c, VENTES[r][c]), Circumscribe(tab.tetes[c], color=AMBRE), run_time=0.3)
        self.play(*[tab.case(1, c).animate.set_fill(tab._fonds[1]) for c in range(4)], run_time=0.4)
        self.attendre_voix()

    # ── 03 : le plus grand nombre de chaque ligne ───────────────────────────

    def ecran_max(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-max")
        tab = self.tableau_pret()
        self.au_mot("Quel jour")
        q = self.bas(self.t("Quel jour vend-elle le plus ?", 44, JAUNE_TITRE), self.Y_BAS)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        rep = []
        for r, (m_ligne, m_val, m_jour) in enumerate((("Sur la ligne des baguettes", "240 :", "le dimanche. Pour"),
                                                      ("Pour les croissants", "150 :", "encore le dimanche"))):
            self.au_mot(m_ligne)
            fl = fleche_ligne(tab, r)
            self.play(GrowArrow(fl), *teinter_ligne(tab, r), run_time=0.6)
            self.play(LaggedStart(*[Indicate(tab.texte_case(r, c), color=BLEU_CALCUL, scale_factor=1.4)
                                    for c in range(4)], lag_ratio=0.25), run_time=0.9)
            self.au_mot(m_val)
            self.play(*allumer(tab, r, 3), FadeOut(fl), run_time=0.35)
            self.insister(tab.texte_case(r, 3), 1.6, 0.25)
            ligne = self.ligne([(PRODUITS[r] + " :", COUL_PROD[r]), (str(VENTES[r][3]), VERT_OK)], 40)
            self.au_mot(m_jour)
            ligne.add(Arrow(LEFT * 0.4, RIGHT * 0.4, buff=0, color=WHITE, stroke_width=5), self.t("le dimanche", 40))
            ligne.arrange(RIGHT, buff=0.25)
            self.bas(ligne, self.Y_BAS - 0.95 - 0.8 * r, x=-4.6)
            self.play(FadeIn(ligne[:2], shift=RIGHT * 0.2), FadeIn(ligne[2:], shift=RIGHT * 0.2),
                      Circumscribe(tab.tetes[3], color=AMBRE), run_time=0.5)
            rep.append(ligne)
        self.attendre_voix()

    # ── 04 : conclure ───────────────────────────────────────────────────────

    def ecran_conclure(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-conclure")
        tab = self.tableau_pret()
        self.au_mot("Ce que dit le tableau")
        dit = self.bas(self.t("Ce que dit le tableau :", 40, BLEU_CALCUL), self.Y_BAS)
        self.play(FadeIn(dit, shift=UP * 0.2), *teinter_colonne(tab, 3), run_time=0.5)
        self.au_mot("le grand jour")
        phrase = self.bas(self.t("Le dimanche, c'est le grand jour !", 50, JAUNE_TITRE), self.Y_BAS - 0.9)
        self.play(Write(phrase), *allumer(tab, 0, 3), *allumer(tab, 1, 3), run_time=0.8)
        self.insister(phrase, 1.1, 0.3)
        self.au_mot("Elle doit préparer")
        pet = petrin(0.9).move_to(P(-3.6, self.Y_BAS - 2.0))
        decide = self.t("Plus de pâte le dimanche", 42, VERT_OK).next_to(pet, RIGHT, buff=0.45)
        self.play(FadeIn(pet, shift=UP * 0.2), FadeIn(decide, shift=RIGHT * 0.2), run_time=0.6)
        self.play(pet[0].animate.scale(1.35), run_time=0.6)
        self.attendre_voix()

    # ── comparer deux cases par deux barres ─────────────────────────────────

    def comparer(self, tab, haut, bas_, couleur, mots, unite, y=-2.35):
        """haut, bas_ = (r, c) ; mots = (extrait du 1er nombre, du 2e, du résultat)."""
        vh, vb = VENTES[haut[0]][haut[1]], VENTES[bas_[0]][bas_[1]]
        bh, bb, surplus, ns = self.deux_barres(vh, vb, (JOURS[haut[1]], JOURS[bas_[1]]), y, couleur)
        calc = self.ligne([(str(vh), WHITE), ("−", WHITE), (str(vb), WHITE), ("=", WHITE), (str(vh - vb), VERT_OK)],
                          46, 0.2)
        calc.move_to(P(0, y + 0.85)).align_to(P(1.15, 0), LEFT)
        self.play(FadeIn(ns), GrowFromEdge(bh, LEFT), GrowFromEdge(bb, LEFT), run_time=0.6)
        self.au_mot(mots[0])
        self.play(FadeIn(calc[:2], scale=1.3), *allumer(tab, *haut), run_time=0.4)
        self.au_mot(mots[1])
        self.play(FadeIn(calc[2:4], scale=1.3), *allumer(tab, *bas_), run_time=0.4)
        self.au_mot(mots[2])
        t = self.t(str(vh - vb), 34, ORANGE_RETENUE).move_to(surplus)
        self.play(Create(surplus), FadeIn(t, scale=1.5), FadeIn(calc[4], scale=1.6), run_time=0.5)
        if unite:
            u = self.t(unite, 32).next_to(calc, DOWN, buff=0.25).align_to(calc, LEFT)
            self.play(FadeIn(u, shift=UP * 0.2), run_time=0.3)
        self.play(Create(self.encadre(calc)), run_time=0.35)
        self.insister(calc[4], 1.4, 0.25)

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-comparer")
        tab = self.tableau_pret()
        self.au_mot("Le samedi")
        q = self.bas(self.t("Samedi : combien de croissants de plus que lundi ?", 38, JAUNE_TITRE), self.Y_BAS + 0.25)
        self.play(FadeIn(q, shift=UP * 0.2), *teinter_ligne(tab, 1), run_time=0.5)
        self.au_mot("combien de croissants")
        self.comparer(tab, (1, 2), (1, 0), COUL_PROD[1], ("90 moins", "40, égale", "50."), "croissants de plus",
                      y=-2.6)
        self.attendre_voix()

    # ── 06 : le piège, une seule case ───────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        tab = self.tableau_pret()
        self.au_mot("Le piège")
        titre = self.bas(self.t("Le piège", 48, ROUGE_ERREUR), self.Y_BAS + 0.05)
        titre.align_to(P(-5.6, 0), LEFT)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("lire une seule case")
        sous = self.t("une seule case, et conclure trop vite", 36, ORANGE_RETENUE).next_to(titre, RIGHT, buff=0.4)
        self.play(FadeIn(sous, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("110 baguettes")
        self.play(*allumer(tab, 0, 1), run_time=0.35)
        self.insister(tab.texte_case(0, 1), 1.5, 0.25)
        self.au_mot("moins que le lundi")
        l1 = self.ligne([("Mercredi :", WHITE), ("110", COUL_PROD[0]), ("baguettes, moins que lundi", WHITE)], 36)
        self.bas(l1, self.Y_BAS - 0.85, x=-5.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), *allumer(tab, 0, 0, couleur="#fecaca", anneau=ROUGE_ERREUR),
                  run_time=0.5)
        self.au_mot("60 contre")
        l2 = self.ligne([("Mais", VERT_OK), ("croissants :", WHITE), ("60", COUL_PROD[1])], 36)
        self.bas(l2, self.Y_BAS - 1.6, x=-5.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), *allumer(tab, 1, 1, couleur="#bbf7d0", anneau=VERT_OK), run_time=0.4)
        self.au_mot("40.")
        l2b = self.ligne([("contre", WHITE), ("40", COUL_PROD[1])], 36).next_to(l2, RIGHT, buff=0.25)
        self.play(FadeIn(l2b, shift=RIGHT * 0.2), *allumer(tab, 1, 0), run_time=0.4)
        self.au_mot("Je lis toute la ligne")
        fl = fleche_ligne(tab, 0)
        self.play(*eteindre(tab), run_time=0.25)
        self.play(GrowArrow(fl), *teinter_ligne(tab, 0), run_time=0.5)
        self.au_mot("toute la colonne")
        fc = fleche_colonne(tab, 1, None, BLEU_CALCUL)
        regle = self.t("Toute la ligne, et toute la colonne !", 38, BLEU_CALCUL)
        self.bas(regle, self.Y_BAS - 2.35, x=-5.6)
        self.play(GrowArrow(fc), *teinter(tab, [(1, 1)], BLEU_PALE), FadeIn(regle, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 07 : défi, 07b : correction ─────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        tab = self.tableau_pret()
        self.au_mot("À toi de jouer")
        titre = self.bas(self.t("À toi de jouer", 48, JAUNE_TITRE), self.Y_BAS)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Le dimanche, combien")
        q = self.bas(VGroup(self.t("Dimanche : combien de baguettes", 40), self.t("de plus que samedi ?", 40))
                     .arrange(DOWN, buff=0.15), self.Y_BAS - 1.05)
        self.play(FadeIn(q, shift=UP * 0.2), Circumscribe(tab.tetes[3], color=AMBRE),
                  Circumscribe(tab.tetes[2], color=AMBRE), run_time=0.7)
        self.au_mot("Mets pause")
        pause = self.bas(self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE), self.Y_BAS - 2.2)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        tab = self.tableau_pret()
        titre = self.bas(self.t("Correction", 46, JAUNE_TITRE), self.Y_BAS + 0.05)
        titre.align_to(P(-5.6, 0), LEFT)
        self.play(Write(titre), *teinter_ligne(tab, 0), run_time=0.5)
        self.comparer(tab, (0, 3), (0, 2), COUL_PROD[0], ("240 moins", "180, égale", "60 baguettes"),
                      "baguettes de plus")
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        tab = self.tableau_pret()
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP, buff=0.12)),
                  tab.animate.scale(0.85).shift(DOWN * 0.2), run_time=0.7)
        textes = ["Je lis les lignes et les colonnes.", "Je compare les nombres.",
                  "Je dis avec une phrase ce que le tableau m'apprend."]
        lignes = []
        for k, s in enumerate(textes):
            lg = VGroup(self.coche(), self.t(s, 36)).arrange(RIGHT, buff=0.3)
            lignes.append(self.bas(lg, -1.3 - 0.8 * k, x=-5.6))
        self.au_mot("je lis les lignes")
        fl, fc = fleche_ligne(tab, 1), fleche_colonne(tab, 3, None, BLEU_CALCUL)
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), GrowArrow(fl), run_time=0.5)
        self.play(GrowArrow(fc), Create(lignes[0][0]), run_time=0.4)
        self.au_mot("je compare")
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), FadeOut(fl), FadeOut(fc), *allumer(tab, 0, 3),
                  *allumer(tab, 0, 2), Create(lignes[1][0]), run_time=0.6)
        self.au_mot("Puis je dis")
        self.play(FadeIn(lignes[2][1], shift=RIGHT * 0.2), run_time=0.5)
        self.play(Create(lignes[2][0]), run_time=0.4)
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_remplir()
        self.ecran_max()
        self.ecran_conclure()
        self.ecran_comparer()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class StatsTableauInterpreterCM1(StatsTableauInterpreterBase):
    identite = "Maths CM1 — EleveAI"


class StatsTableauInterpreterCM2(StatsTableauInterpreterBase):
    """Même vidéo pour le CM2 : seule l'identité change."""

    identite = "Maths CM2 — EleveAI"
