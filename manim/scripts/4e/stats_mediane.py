# stats_mediane.py
# EleveAI — Maths 4e ET 3e — série « Statistiques », cycle 4 : DÉTERMINER UNE
# MÉDIANE (micro du coach : stat_mediane, notion stat_statistique), AVEC VOIX.
# ÉPISODE COMMUN : 4e 07-mediane et 3e 05-mediane (une voix, un script, deux
# rendus ; la voix ne cite aucune classe).
# Paysage 16:9. CEINTURES : 4e VERTE (la paysage complète du niveau : ranger,
# milieu d'une série impaire, sens « au moins la moitié », le piège de la liste
# non rangée, série paire, médiane d'un tableau par effectifs cumulés, défi
# pair) ; 3e ORANGE (révision ; les effectifs cumulés sont son « mediane_effectifs »).
# Short jumeau : stats_mediane_short.py (jaune).
#
# ⭐ Décor et métier : l'ÉNERGIE SOLAIRE à La Réunion ; une TECHNICIENNE EN
# ÉNERGIE SOLAIRE surveille la production d'un toit photovoltaïque
# (problématique : contrôler, résumer). Données VRAISEMBLABLES (ordre de
# grandeur d'une installation domestique de 3 kWc à La Réunion : 10 à 16 kWh
# par jour, moins un jour de pluie), calculées en Python :
#   semaine 14, 9, 16, 12, 15, 6, 13 → rangée 6, 9, 12, 13, 14, 15, 16 → 13 ;
#   piège : 4e valeur de la liste non rangée = 12 ; + 17 → (13 + 14) ÷ 2 = 13,5 ;
#   mois de 30 jours : 10 kWh : 2 · 12 : 3 · 13 : 6 · 14 : 12 · 15 : 7 →
#   cumulés 2, 5, 11, 23, 30 → 15e et 16e valeurs = 14 ;
#   défi : 11, 15, 8, 14, 10, 16 → 8, 10, 11, 14, 15, 16 → (11 + 14) ÷ 2 = 12,5.
# ⭐ Figures : des TUILES de valeurs qui se RANGENT sous nos yeux, la droite
# graduée du coach (`number_line`, AxePoints du lot E) où la médiane coupe la
# série, et `tableau_donnees` avec une ligne d'effectifs cumulés.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Mapping micro → écrans : 4e genMediane impair / 3e mediane_impaire → 02-03 ;
# fixed « que signifie la médiane » → 04 ; 3e mediane_impaire_qcm (milieu non
# rangé) → 05 ; 4e genMediane pair / 3e mediane_paire → 06, 08 défi ;
# 3e mediane_effectifs / mediane_cumules_grand → 07.
# Écrans : 00 garde · 01 la technicienne · 02 la semaine · 03 ranger, le milieu
# · 04 la droite graduée, « au moins la moitié » · 05 le piège · 06 série paire
# · 07 tableau, effectifs cumulés · 08 défi · 08b correction · 09 ce que tu as
# appris · 10 fin (règle du 19/10).
#
# Voix : manim/voix/4e-stats-mediane.json (débit −10), WAV dans
# public/sons/4e-stats-mediane/ ; calage mot à mot :
# manim/scripts/4e/stats_mediane_marques.json (marques.ps1 + conv.py, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/4e/stats_mediane.py StatsMediane4e -o eleveai-maths-4e-stats-mediane --media_dir manim/scripts/4e/media-mediane
# python -m manim render -qh --disable_caching manim/scripts/4e/stats_mediane.py StatsMediane3e -o eleveai-maths-3e-stats-mediane --media_dir manim/scripts/4e/media-mediane-3e
# Sorties : manim/sorties/4e/maths/statistiques/07-mediane/eleveai-maths-4e-stats-mediane.mp4
#           manim/sorties/3e/maths/statistiques/05-mediane/eleveai-maths-3e-stats-mediane.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lotf_commun import *  # noqa: E402,F403

SEMAINE = [14, 9, 16, 12, 15, 6, 13]
JOURS = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"]
DEFI = [11, 15, 8, 14, 10, 16]
VALS_M, EFFS_M = [10, 12, 13, 14, 15], [2, 3, 6, 12, 7]
CUMUL = [2, 5, 11, 23, 30]
SOLEIL = "#fbbf24"
TUILE = "#fef3c7"


def soleil(r=0.5):
    disque = Circle(radius=r, fill_color=SOLEIL, fill_opacity=1, stroke_color="#f59e0b", stroke_width=3)
    rayons = VGroup(*[Line(P(np.cos(a) * r * 1.25, np.sin(a) * r * 1.25), P(np.cos(a) * r * 1.65,
                                                                          np.sin(a) * r * 1.65),
                           color=SOLEIL, stroke_width=6) for a in np.arange(0, TAU, TAU / 10)])
    return VGroup(rayons, disque)


def maison_solaire(s=1.0):
    """Une case créole simple, le toit couvert de panneaux bleus."""
    murs = Rectangle(width=2.6 * s, height=1.4 * s, fill_color="#f1f5f9", fill_opacity=1, stroke_color=WHITE,
                     stroke_width=2).move_to(P(0, -0.7 * s))
    toit = Polygon(P(-1.6 * s, 0), P(1.6 * s, 0), P(0.9 * s, 1.0 * s), P(-0.9 * s, 1.0 * s), fill_color="#7f1d1d",
                   fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    panneaux = VGroup()
    for k in range(4):
        x = -0.95 * s + k * 0.63 * s
        pn = Polygon(P(x, 0.15 * s), P(x + 0.55 * s, 0.15 * s), P(x + 0.5 * s, 0.85 * s), P(x + 0.07 * s, 0.85 * s),
                     fill_color="#1e3a8a", fill_opacity=1, stroke_color="#93c5fd", stroke_width=2)
        panneaux.add(pn)
    porte = Rectangle(width=0.5 * s, height=0.8 * s, fill_color="#92400e", fill_opacity=1, stroke_width=0)
    porte.move_to(P(0, -1.0 * s))
    return VGroup(murs, toit, panneaux, porte)


def tuile(v, cote=1.05, fs=48, fond=TUILE):
    c = RoundedRectangle(width=cote, height=cote, corner_radius=0.12, fill_color=fond, fill_opacity=1,
                         stroke_color="#b45309", stroke_width=3)
    return VGroup(c, texte(v, fs, NUIT).move_to(c))


def rangee(vals, y=0.0, pas=1.25, x0=0.0, cote=1.05, fs=48):
    g = VGroup(*[tuile(v, cote, fs) for v in vals])
    for k, t in enumerate(g):
        t.move_to(P(x0 + (k - (len(vals) - 1) / 2) * pas, y))
    return g


class StatsMedianeBase(PaysageF):
    nom_voix = "4e-stats-mediane"
    fichier_marques = "stats_mediane_marques.json"

    def allumer_tuile(self, t, couleur=VERT_OK):
        return t[0].animate.set_fill(couleur).set_stroke(WHITE, 5)

    def accolade_sous(self, tuiles, txt, couleur=BLEU_CALCUL):
        b = Brace(tuiles, DOWN, color=couleur, buff=0.12)
        return VGroup(b, self.t(txt, 38, couleur).next_to(b, DOWN, buff=0.1))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Déterminer une médiane", self.identite, self.ceinture)
        tu = rangee(sorted(SEMAINE), 0.2, 1.0, -0.6, 0.85, 36)
        self.au_mot("Déterminer une médiane")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.6)
        self.play(LaggedStart(*[FadeIn(t, shift=DOWN * 0.3) for t in tu], lag_ratio=0.1), run_time=0.8)
        self.au_mot("la valeur du milieu")
        q = self.t("?", 80, ORANGE_RETENUE).next_to(tu[3], UP, buff=0.25)
        self.play(self.allumer_tuile(tu[3], AMBRE), FadeIn(q, scale=0.4), run_time=0.5)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la technicienne en énergie solaire ─────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("À La Réunion")
        sol = soleil(0.5).move_to(P(-5.6, 2.6))
        lieu = self.t("La Réunion", 44, JAUNE_TITRE).next_to(sol, RIGHT, buff=0.5)
        self.play(FadeIn(sol, scale=0.5), Rotate(sol, PI / 5), Write(lieu), run_time=0.8)
        self.au_mot("Sur ce toit")
        mai = maison_solaire(1.35).move_to(P(-4.0, -0.5))
        self.play(FadeIn(mai, shift=UP * 0.3), run_time=0.6)
        self.au_mot("produisent de l'électricité")
        eclair = VGroup(*[Line(sol.get_center() + DR * 0.6, mai[2][k].get_center(), color=SOLEIL, stroke_width=3)
                          .set_opacity(0.7) for k in range(4)])
        self.play(LaggedStart(*[Create(e) for e in eclair], lag_ratio=0.2), mai[2].animate.set_fill("#2563eb"),
                  run_time=0.8)
        self.au_mot("Une technicienne")
        tech = personne("#f97316", "#8d5524", 0.36, "#111827", longs=True).move_to(P(0.9, 2.2))
        metier = VGroup(self.t("Technicienne", 42, BLEU_CALCUL), self.t("en énergie solaire", 38, BLEU_CALCUL))
        metier.arrange(DOWN, aligned_edge=LEFT, buff=0.1).next_to(tech, RIGHT, buff=0.4)
        self.play(FadeIn(tech, shift=UP * 0.2), FadeIn(metier, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("en kilowattheures")
        kwh = self.ligne([("kWh", AMBRE), ("= kilowattheure", WHITE)], 38).move_to(P(3.2, 0.75))
        self.play(FadeIn(kwh, scale=0.8), run_time=0.4)
        self.au_mot("coupe ses relevés en deux")
        bande = VGroup(Rectangle(width=2.9, height=0.65, fill_color=ORANGE_RETENUE, fill_opacity=0.85, stroke_width=0),
                       Rectangle(width=2.9, height=0.65, fill_color=BLEU_CALCUL, fill_opacity=0.85, stroke_width=0)
                       ).arrange(RIGHT, buff=0).move_to(P(3.2, -0.45))
        coupe = DashedLine(bande.get_top() + UP * 0.25, bande.get_bottom() + DOWN * 0.25, color=VERT_OK,
                           stroke_width=6)
        self.play(FadeIn(bande, scale=0.9), run_time=0.4)
        self.play(Create(coupe), run_time=0.4)
        self.au_mot("la moitié des jours en dessous")
        m1 = self.t("moitié en dessous", 28).next_to(bande[0], DOWN, buff=0.3)
        self.play(FadeIn(m1, shift=UP * 0.15), run_time=0.35)
        self.au_mot("la moitié au-dessus")
        m2 = self.t("moitié au-dessus", 28).next_to(bande[1], DOWN, buff=0.3)
        self.play(FadeIn(m2, shift=UP * 0.15), run_time=0.35)
        self.au_mot("C'est la médiane")
        med = self.t("C'est la médiane.", 46, VERT_OK).move_to(P(3.2, -2.1))
        self.play(FadeIn(med, scale=0.6), Indicate(coupe, color=VERT_OK), run_time=0.5)
        self.insister(med, 1.2, 0.3)
        self.attendre_voix()

    # ── 02 : la semaine ─────────────────────────────────────────────────────

    def tuiles_semaine(self, y=1.5, jours=True):
        tu = rangee(SEMAINE, y)
        js = VGroup(*[self.t(j, 26, "#cbd5e1").next_to(t, UP, buff=0.12)
                      for j, t in zip(JOURS, tu)]) if jours else VGroup()
        return tu, js

    def ecran_serie(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-serie")
        tit = self.t("La production de la semaine", 44, JAUNE_TITRE).to_edge(UP, buff=0.4)
        sol = soleil(0.3).next_to(tit, LEFT, buff=0.4)
        self.play(Write(tit), FadeIn(sol), run_time=0.6)
        tu, js = self.tuiles_semaine(0.6)
        self.play(FadeIn(js), run_time=0.3)
        for k, p in enumerate(self.nombres_apres("chaque jour", 7)):
            self.au_i(p)
            self.play(FadeIn(tu[k], shift=DOWN * 0.4, scale=0.6), run_time=0.3)
        self.au_mot("kilowattheures")
        unite = self.t("en kWh", 34, AMBRE).next_to(tu, RIGHT, buff=0.3)
        self.play(FadeIn(unite), run_time=0.3)
        self.au_mot("7 valeurs")
        sept = self.ligne([("7", BLEU_CALCUL), ("valeurs", WHITE)], 46).move_to(P(0, -1.2))
        acc = Brace(tu, DOWN, color=BLEU_CALCUL, buff=0.15)
        self.play(GrowFromCenter(acc), FadeIn(sept, shift=UP * 0.2), run_time=0.5)
        self.insister(sept[0], 1.5, 0.25)
        self.attendre_voix()

    # ── 03 : ranger, puis le milieu ─────────────────────────────────────────

    def ranger_au_mot(self, tu, debut, y_bas, n_vals):
        """Chaque tuile descend à sa place dans la rangée triée, au mot de sa valeur."""
        ordre = sorted(range(len(tu)), key=lambda k: tu[k].valeur_t)
        cibles = rangee(sorted(t.valeur_t for t in tu), y_bas)
        for rang, (k, p) in enumerate(zip(ordre, self.nombres_apres(debut, n_vals))):
            self.au_i(p)
            self.play(tu[k].animate.move_to(cibles[rang]), run_time=0.35)
        return VGroup(*[tu[k] for k in ordre])

    def ecran_ranger(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ranger")
        tu, js = self.tuiles_semaine(1.5)
        for t, v in zip(tu, SEMAINE):
            t.valeur_t = v
        self.add(tu, js)
        self.au_mot("je range")
        e1 = self.ligne([("1.", AMBRE), ("Je range dans l'ordre croissant", WHITE)], 38).move_to(P(-0.4, 3.2))
        self.play(FadeIn(e1, shift=DOWN * 0.2), run_time=0.4)
        fl = Arrow(P(-4.6, -1.55), P(4.6, -1.55), buff=0, color="#64748b", stroke_width=4)
        self.play(GrowArrow(fl), FadeOut(js), run_time=0.4)
        rg = self.ranger_au_mot(tu, "ordre croissant", -0.5, 7)
        self.au_mot("je cherche le milieu")
        e2 = self.ligne([("2.", AMBRE), ("Je cherche le milieu", WHITE)], 38).move_to(P(-0.4, 1.9))
        self.play(FadeIn(e2, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("3 valeurs à gauche")
        ag = self.accolade_sous(rg[:3], "3")
        self.play(GrowFromCenter(ag[0]), FadeIn(ag[1]), *[t[0].animate.set_fill("#fdba74") for t in rg[:3]],
                  run_time=0.5)
        self.au_mot("3 valeurs à droite")
        ad = self.accolade_sous(rg[4:], "3")
        self.play(GrowFromCenter(ad[0]), FadeIn(ad[1]), *[t[0].animate.set_fill("#93c5fd") for t in rg[4:]],
                  run_time=0.5)
        self.au_mot("La médiane est 13")
        self.play(self.allumer_tuile(rg[3]), run_time=0.3)
        self.play(rg[3].animate.scale(1.4), run_time=0.3)
        self.play(rg[3].animate.scale(1 / 1.4), run_time=0.3)
        res = self.ligne([("Médiane =", WHITE), ("13", VERT_OK), ("kWh", WHITE)], 50).move_to(P(0, -2.7))
        cadre = self.encadrer(res)
        self.play(FadeIn(res, shift=UP * 0.2), Create(cadre), run_time=0.5)
        self.attendre_voix()

    # ── 04 : la droite graduée, « au moins la moitié » ──────────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-sens")
        ax = AxePoints(SEMAINE, 4, 18, 2, sous_pas=1, longueur=10.0, couleur="#fbbf24", fs=30, nom="kWh",
                       rayon=0.17, centre=P(-0.3, 1.1))
        self.play(FadeIn(ax.fond, scale=0.95), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(r, shift=DOWN * 0.4) for r in ax.ronds], lag_ratio=0.1), run_time=0.8)
        self.au_mot("13 coupe la série")
        rep = ax.repere(13, "13", VERT_OK)
        self.play(Create(rep[0]), FadeIn(rep[1], scale=1.5), run_time=0.5)
        gauche = [i for i, v in enumerate(SEMAINE) if v <= 13]
        droite = [i for i, v in enumerate(SEMAINE) if v >= 13]
        self.au_mot("Au moins la moitié des jours")
        self.play(*[ax.ronds[i].animate.set_fill(ORANGE_RETENUE) for i in gauche if SEMAINE[i] < 13], run_time=0.4)
        l1 = self.ligne([("au moins la moitié :", WHITE), ("13 ou moins", ORANGE_RETENUE)], 40).move_to(P(-0.3, -1.1))
        self.play(FadeIn(l1, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Et au moins la moitié")
        self.play(*[ax.ronds[i].animate.set_fill(BLEU_CALCUL) for i in droite if SEMAINE[i] > 13], run_time=0.4)
        l2 = self.ligne([("au moins la moitié :", WHITE), ("13 ou plus", BLEU_CALCUL)], 40).move_to(P(-0.3, -2.0))
        self.play(FadeIn(l2, shift=UP * 0.2), run_time=0.4)
        self.insister(rep[1], 1.5, 0.3)
        self.attendre_voix()

    # ── 05 : le piège, le milieu sans ranger ────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.au_mot("Le piège")
        tit = self.t("Le piège", 50, ROUGE_ERREUR).to_edge(UP, buff=0.4)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("prendre le milieu sans ranger")
        tu, js = self.tuiles_semaine(1.3)
        st = self.t("sans ranger", 36, ORANGE_RETENUE).next_to(tit, DOWN, buff=0.2)
        self.play(FadeIn(tu), FadeIn(js), FadeIn(st), run_time=0.5)
        self.au_mot("le nombre du milieu est 12")
        anneau = SurroundingRectangle(tu[3], color=ROUGE_ERREUR, buff=0.08, stroke_width=7)
        self.play(Create(anneau), run_time=0.4)
        douze = self.ligne([("milieu :", WHITE), ("12", ROUGE_ERREUR)], 44).move_to(P(-2.2, -0.2))
        self.play(FadeIn(douze, shift=UP * 0.2), run_time=0.35)
        self.au_mot("faux")
        x = croix(douze, sw=7)
        f = self.t("faux !", 46, ROUGE_ERREUR).next_to(douze, RIGHT, buff=0.5)
        self.play(Create(x), FadeIn(f, scale=1.5), run_time=0.4)
        self.au_mot("On range toujours")
        rg = rangee(sorted(SEMAINE), -1.55, 1.0, 0, 0.82, 36)
        lab = self.t("rangée :", 32, VERT_OK).next_to(rg, LEFT, buff=0.3)
        self.play(FadeIn(rg, shift=UP * 0.2), FadeIn(lab), run_time=0.5)
        self.play(self.allumer_tuile(rg[3]), run_time=0.3)
        bon = self.ligne([("On range", VERT_OK), ("toujours d'abord", WHITE)], 44).move_to(P(-0.5, -2.85))
        self.play(FadeIn(bon, shift=UP * 0.2), Create(self.encadrer(bon)), run_time=0.5)
        self.attendre_voix()

    # ── 06 : un nombre pair de valeurs ──────────────────────────────────────

    def calcul_milieu(self, a, b, res, y, mots):
        """(a + b) ÷ 2 = res, écrit au mot : mots = (a plus, b, divisé par 2, égale)."""
        lg = self.ligne([("(", WHITE), (str(a), BLEU_CALCUL), ("+", WHITE), (str(b), BLEU_CALCUL), (")", WHITE),
                         ("÷", WHITE), ("2", WHITE), ("=", WHITE), (fr(res), VERT_OK)], 52, 0.14).move_to(P(-0.5, y))
        self.au_mot(mots[0])
        self.play(FadeIn(lg[:3], scale=1.3), run_time=0.3)
        self.au_mot(mots[1])
        self.play(FadeIn(lg[3:5], scale=1.3), run_time=0.3)
        self.au_mot(mots[2])
        self.play(FadeIn(lg[5:7], scale=1.3), run_time=0.3)
        self.au_mot(mots[3])
        self.play(FadeIn(lg[7:], scale=1.5), run_time=0.35)
        return lg

    def ecran_pair(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-pair")
        self.au_mot("un nombre pair")
        tit = self.t("Un nombre PAIR de valeurs", 46, JAUNE_TITRE).to_edge(UP, buff=0.4)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("produit 17")
        t17 = tuile(17).move_to(P(0, 2.0))
        h = self.t("8e jour", 30, "#cbd5e1").next_to(t17, LEFT, buff=0.3)
        self.play(FadeIn(t17, scale=0.5), FadeIn(h), run_time=0.4)
        huit = sorted(SEMAINE + [17])
        rg = rangee(huit, 0.55, 1.22)
        self.au_mot("Je range")
        pos = self.nombres_apres("Je range", 8)
        for k, p in enumerate(pos):
            self.au_i(p)
            if k == 7:
                self.play(t17.animate.move_to(rg[7]), FadeOut(h), run_time=0.3)
                rg.submobjects[7] = t17
            else:
                self.play(FadeIn(rg[k], shift=DOWN * 0.3), run_time=0.22)
        self.au_mot("deux valeurs")
        self.play(self.allumer_tuile(rg[3]), self.allumer_tuile(rg[4]), run_time=0.4)
        self.au_mot("13 et 14")
        self.insister(VGroup(rg[3], rg[4]), 1.2, 0.25)
        self.au_mot("entre les deux")
        x_mil = (rg[3].get_center()[0] + rg[4].get_center()[0]) / 2
        coupe = DashedLine(P(x_mil, 1.3), P(x_mil, -0.2), color=VERT_OK, stroke_width=7)
        self.play(Create(coupe), run_time=0.4)
        lg = self.calcul_milieu(13, 14, 13.5, -2.1, ("13 plus", "14, divisé", "divisé par 2", "égale 13,5"))
        self.play(Create(self.encadrer(lg)), run_time=0.4)
        lab = self.t("13,5", 36, VERT_OK).next_to(coupe, UP, buff=0.08)
        self.play(FadeIn(lab, scale=1.5), run_time=0.3)
        self.attendre_voix()

    # ── 07 : un tableau d'effectifs, les effectifs cumulés ──────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-tableau")
        tab = Tableau([str(v) for v in VALS_M], [EFFS_M, [None] * 5], libelles=["Jours", "Effectifs cumulés"],
                      coin="kWh", largeur_case=1.45, largeur_libelle=3.2, hauteur=0.9, fs=38, centre=P(-1.0, 1.35))
        textes_devant(tab)
        fond = VGroup(tab.carte, tab.coin, tab.libelles[0], *[t[0] for t in tab.tetes],
                      *[c[0] for c in tab.cases[0]])
        self.au_mot("Sur un mois de 30 jours")
        m30 = self.ligne([("Un mois :", WHITE), ("30", BLEU_CALCUL), ("jours", WHITE)], 40).to_edge(UP, buff=0.3)
        self.play(FadeIn(m30, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("tableau d'effectifs")
        self.play(FadeIn(fond, scale=0.95), run_time=0.5)
        mots = [("10 kilowattheures", "2 jours"), ("12 :", "3 jours"), ("13 :", "6 jours"), ("14 :", "12 jours"),
                ("15 :", "7 jours")]
        for j, (a, b) in enumerate(mots):
            self.au_mot(a)
            self.play(FadeIn(tab.tetes[j][1], scale=1.6), run_time=0.22)
            self.au_mot(b)
            self.play(FadeIn(tab.cases[0][j][1], scale=1.6), run_time=0.22)
        self.au_mot("Avec 30 valeurs")
        q = self.ligne([("30", BLEU_CALCUL), ("valeurs : entre la", WHITE), ("15e", AMBRE), ("et la", WHITE),
                        ("16e", AMBRE)], 40).move_to(P(-0.4, -0.55))
        self.au_mot("entre la quinzième")
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.au_mot("au fur et à mesure")
        self.play(FadeIn(tab.libelles[1]), *[FadeIn(c[0]) for c in tab.cases[1]], run_time=0.4)
        mots_c = ["2, puis", "5, puis", "11, puis", "23. La"]
        for j, m in enumerate(mots_c):
            self.au_mot(m)
            t = texte(CUMUL[j], 38, VERT_OK if j < 3 else AMBRE).move_to(tab.cases[1][j][0]).set_z_index(4)
            tab.cases[1][j].add(t)
            self.play(FadeIn(t, scale=1.6), *allumer(tab, 1, j), run_time=0.3)
            self.play(*eteindre(tab), run_time=0.15)
        self.au_mot("tombent dans la colonne 14")
        self.play(*tab.allumer_colonne(3), run_time=0.4)
        expl = self.ligne([("11", VERT_OK), ("<", WHITE), ("15e, 16e", AMBRE), ("≤", WHITE), ("23", AMBRE)], 40)
        expl.move_to(P(-0.4, -1.45))
        self.play(FadeIn(expl, shift=UP * 0.2), run_time=0.4)
        self.au_mot("la médiane est 14")
        res = self.ligne([("Médiane =", WHITE), ("14", VERT_OK), ("kWh", WHITE)], 50).move_to(P(-0.4, -2.5))
        self.play(FadeIn(res, shift=UP * 0.2), Create(self.encadrer(res)), run_time=0.5)
        self.insister(res[1], 1.4, 0.3)
        self.attendre_voix()

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer", 52, JAUNE_TITRE).to_edge(UP, buff=0.4)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("sur six jours")
        six = self.ligne([("Une autre semaine, sur", WHITE), ("6", BLEU_CALCUL), ("jours", WHITE)], 38)
        six.next_to(tit, DOWN, buff=0.3)
        self.play(FadeIn(six, shift=DOWN * 0.2), run_time=0.4)
        tu = rangee(DEFI, 0.7, 1.35)
        for k, p in enumerate(self.nombres_apres("sur six jours", 6)):
            self.au_i(p)
            self.play(FadeIn(tu[k], shift=DOWN * 0.4, scale=0.6), run_time=0.3)
        self.au_mot("Quelle est la médiane")
        q = self.ligne([("Quelle est la", WHITE), ("médiane", VERT_OK), ("?", ORANGE_RETENUE)], 46).move_to(P(0, -0.8))
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 42, ORANGE_RETENUE).move_to(P(0, -2.0))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08b-correction")
        tit = self.t("Correction", 52, JAUNE_TITRE).to_edge(UP, buff=0.4)
        tu = rangee(DEFI, 2.0, 1.15, 0, 0.8, 34)
        self.play(Write(tit), FadeIn(tu), run_time=0.6)
        for t, v in zip(tu, DEFI):
            t.valeur_t = v
        cibles = rangee(sorted(DEFI), 0.55, 1.35)
        ordre = sorted(range(6), key=lambda k: DEFI[k])
        for rang, (k, p) in enumerate(zip(ordre, self.nombres_apres("Je range", 6))):
            self.au_i(p)
            self.play(tu[k].animate.scale(1.05 / 0.8).move_to(cibles[rang]), run_time=0.3)
        rg = VGroup(*[tu[k] for k in ordre])
        self.au_mot("6 valeurs")
        pair = self.ligne([("6", BLEU_CALCUL), ("valeurs : pair", WHITE)], 38).move_to(P(-3.5, -0.6))
        self.play(FadeIn(pair, shift=UP * 0.2), run_time=0.4)
        self.au_mot("11 et 14")
        self.play(self.allumer_tuile(rg[2]), self.allumer_tuile(rg[3]), run_time=0.4)
        x_mil = (rg[2].get_center()[0] + rg[3].get_center()[0]) / 2
        coupe = DashedLine(P(x_mil, 1.25), P(x_mil, -0.15), color=VERT_OK, stroke_width=7)
        self.play(Create(coupe), run_time=0.3)
        lg = self.calcul_milieu(11, 14, 12.5, -1.6, ("11 plus", "14, divisé", "divisé par 2", "égale 12,5"))
        self.au_mot("La médiane est 12,5")
        res = self.ligne([("Médiane =", WHITE), ("12,5", VERT_OK), ("kWh", WHITE)], 48).move_to(P(-0.5, -2.75))
        self.play(FadeIn(res, shift=UP * 0.2), Create(self.encadrer(res)), run_time=0.5)
        self.insister(res[1], 1.3, 0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        rg = rangee(sorted(SEMAINE), 0.0, 0.78, -3.7, 0.68, 30)
        rg[3][0].set_fill(VERT_OK)
        self.add(rg)
        textes = [("La médiane coupe", "la série RANGÉE en deux."), ("On range", "toujours d'abord."),
                  ("Nombre pair : le milieu", "des deux valeurs centrales.")]
        lignes = self.finale(textes, [1.75, 0.2, -1.35], fs=36)
        self.au_mot("La médiane coupe")
        self.montrer_ligne(lignes[0], Indicate(rg[3], color=VERT_OK))
        self.au_mot("On range")
        self.montrer_ligne(lignes[1])
        self.au_mot("Avec un nombre pair")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_serie()
        self.ecran_ranger()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_pair()
        self.ecran_tableau()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsMediane4e(StatsMedianeBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"


class StatsMediane3e(StatsMedianeBase):
    """Même vidéo pour la 3e (révision) : identité et ceinture seulement."""

    identite = "Maths 3e — EleveAI"
    ceinture = "orange"
