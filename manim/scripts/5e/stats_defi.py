# stats_defi.py
# EleveAI — Maths 5e — série « Statistiques » (cycle 4), épisode 08 : DÉFIS SUR
# LES STATISTIQUES (micro du coach stat_defi, notion stat_statistique ; banque
# genMoyenneDiagramme : moyenne lue sur un diagramme en bâtons, valeur ×
# effectif ; genNouvelleMoyenne : une valeur s'ajoute, nouvelle moyenne ;
# « la moyenne de 1, 2, 3, 4 sans les effectifs » = l'erreur typique). AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE (problème en plusieurs étapes, au-dessus de la
# verte du niveau). Short jumeau : stats_defi_short.py (verte, un cran plus bas).
#
# ⭐ Décor et métier : la SÉCURITÉ CIVILE ; une CHEFFE DE CENTRE de
# sapeurs-pompiers prépare ses équipes. Données VRAISEMBLABLES (un petit centre
# inventé, pas un relevé du SDIS), calculées en Python : 20 jours ; 1
# intervention : 4 jours, 2 : 6 jours, 3 : 8 jours, 4 : 2 jours ; total
# 4 + 12 + 24 + 8 = 48 ; moyenne 48 ÷ 20 = 2,4 ; le piège (1+2+3+4) ÷ 4 = 2,5 ;
# défi : un 21e jour de feu de forêt à 15 interventions → 63 ÷ 21 = 3 (une
# valeur extrême tire la moyenne).
# ⭐ Figure du coach : `stat_graph` « batons » (canvas_stats.Barres batons=True :
# les valeurs en bas, la hauteur = l'effectif). La moyenne se VOIT comme une
# ligne verticale sur l'axe des valeurs (le point d'équilibre).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Écrans : 00 garde · 01 la cheffe de centre · 02 le diagramme · 03 l'effectif
# total · 04 la somme (valeur × effectif) · 05 la moyenne · 06 le piège · 07 défi
# · 07b correction · 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/5e-stats-defi.json (débit −10) ; calage :
# manim/scripts/5e/stats5_defi_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/5e/stats_defi.py StatsDefi5e -o eleveai-maths-5e-stats-defi --media_dir manim/scripts/5e/media-defi
# Sortie : manim/sorties/5e/maths/statistiques/08-defi/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_lire_tableau import personne  # noqa: E402

VALS = [1, 2, 3, 4]
EFF = [4, 6, 8, 2]
ROUGE_P = "#dc2626"
assert sum(EFF) == 20 and sum(v * e for v, e in zip(VALS, EFF)) == 48 and (48 + 15) / 21 == 3


def camion(s=1.0):
    """Un camion de pompiers : caisse rouge, cabine, échelle, roues, gyrophare."""
    caisse = RoundedRectangle(width=3.0, height=1.0, corner_radius=0.1, fill_color=ROUGE_P, fill_opacity=1,
                              stroke_width=0).move_to(P(-0.3, 0.2))
    cabine = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.12, fill_color=ROUGE_P, fill_opacity=1,
                              stroke_width=0).move_to(P(1.6, 0.3))
    vitre = Rectangle(width=0.6, height=0.4, fill_color="#bae6fd", fill_opacity=1, stroke_width=0).move_to(P(1.7, 0.6))
    echelle = VGroup(Line(P(-1.6, 0.85), P(1.0, 0.85)), Line(P(-1.6, 1.05), P(1.0, 1.05)),
                     *[Line(P(-1.5 + 0.3 * k, 0.85), P(-1.5 + 0.3 * k, 1.05)) for k in range(9)]).set_stroke("#e5e7eb", 4)
    roues = VGroup(*[Circle(radius=0.28, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                            stroke_width=4).move_to(P(x, -0.35)) for x in (-1.2, 0.4, 1.6)])
    gyro = Circle(radius=0.12, fill_color="#3b82f6", fill_opacity=1, stroke_width=0).move_to(P(1.6, 1.0))
    return VGroup(echelle, caisse, cabine, vitre, roues, gyro).scale(s)


def flamme(s=1.0):
    ext = VMobject(fill_color="#f97316", fill_opacity=1, stroke_width=0).set_points_smoothly(
        [P(0, 1.2), P(0.45, 0.4), P(0.4, -0.3), P(0, -0.5), P(-0.4, -0.3), P(-0.45, 0.4), P(0, 1.2)])
    inte = ext.copy().set_fill("#facc15").scale(0.55).shift(DOWN * 0.15)
    return VGroup(ext, inte).scale(s)


class StatsDefiBase(Paysage5):
    nom_voix = "5e-stats-defi"
    fichier_marques = "stats5_defi_marques.json"
    identite = "Maths 5e — EleveAI"
    ceinture = "bleue"
    XL = 0.95
    G = P(-3.3, -0.25)

    def graphe(self, centre=None):
        g = Barres([str(v) for v in VALS], EFF, pas=2, sous_pas=1, maxi=8, batons=True,
                   couleurs=["#f87171"] * 4, nom_axe="Jours", titre="Interventions par jour", largeur=4.6,
                   hauteur=3.6, fs=30, centre=self.G if centre is None else centre)
        cap = texte("interventions dans la journée", 24, "#475569").next_to(g.etiquettes, DOWN, buff=0.12)
        g.cap = cap
        return g

    def graphe_pret(self, valeurs=True):
        g = self.graphe()
        self.add(g)
        if valeurs:
            self.add(*[g.valeur(i, fs=28) for i in range(4)])
        return g

    def x_valeur(self, g, v):
        """L'abscisse de la valeur v (interpolée entre les bâtons 1, 2, 3, 4)."""
        x1, x2 = g.point(0)[0], g.point(1)[0]
        return x1 + (v - 1) * (x2 - x1)

    def ligne_moy(self, g, v, couleur=AMBRE, label=None):
        x = self.x_valeur(g, v)
        y0, y1 = g.base(0)[1], g.y_axe(7.0)[1]
        l = DashedLine(P(x, y0), P(x, y1), color=couleur, stroke_width=6, dash_length=0.14).set_z_index(3)
        tri = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.14).move_to(P(x, y0),
                                                                                               aligned_edge=DOWN)
        grp = VGroup(l, tri)
        if label:
            t = texte(label, 26, couleur).set_stroke(WHITE, 5, background=True).next_to(l, UP, buff=0.04)
            grp.add(t.set_z_index(4))
        return grp

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi statistiques", self.identite, self.ceinture)
        self.add(titre, ident, ech)
        g = Barres(["", "", "", ""], EFF, pas=2, maxi=8, batons=True, couleurs=["#f87171"] * 4, largeur=3.2,
                   hauteur=2.0, fs=20, centre=P(-0.6, 0.2))
        self.play(FadeIn(g.fond, scale=0.9), g.pousser(run_time=0.8), run_time=0.8)
        self.au_mot("plusieurs étapes")
        etapes = VGroup(*[Circle(radius=0.28, stroke_color=AMBRE, stroke_width=5) for _ in range(3)]).arrange(
            DOWN, buff=0.2).next_to(g, RIGHT, buff=0.6)
        nums = VGroup(*[self.t(str(k + 1), 30, AMBRE).move_to(c) for k, c in enumerate(etapes)])
        self.play(LaggedStart(*[AnimationGroup(Create(c), FadeIn(n)) for c, n in zip(etapes, nums)], lag_ratio=0.3),
                  run_time=0.9)
        self.au_mot("es-tu prêt")
        q = self.t("?", 90, ORANGE_RETENUE).next_to(etapes, RIGHT, buff=0.4)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la cheffe de centre ────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Une cheffe de centre")
        pers = personne(peau="#8d5524", haut="#1e3a8a", cheveux="#111827", r=0.5).move_to(P(-4.4, 0.0))
        casque = Sector(radius=0.62, start_angle=0, angle=PI, fill_color="#e5e7eb", fill_opacity=1,
                        stroke_width=0).move_to(pers[1].get_center() + UP * 0.32)
        bande = Rectangle(width=1.6, height=0.12, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(
            pers[2].get_center() + DOWN * 0.3)
        pers.add(casque, bande)
        met = self.metier("Cheffe de centre de pompiers", fs=34).next_to(pers, UP, buff=0.45).set_x(-3.4)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(met, scale=0.8), run_time=0.6)
        self.au_mot("prépare ses équipes")
        cam = camion(0.9).move_to(P(-1.5, -2.1))
        self.play(FadeIn(cam, shift=RIGHT * 1.0), run_time=0.7)
        self.play(cam[5].animate.set_fill(ROUGE_P), run_time=0.2)
        self.play(cam[5].animate.set_fill("#3b82f6"), run_time=0.2)
        self.au_mot("Combien d'interventions")
        q = self.bloc(["Combien d'interventions", "par jour, en moyenne ?"], 40)
        q.move_to(P(2.9, 1.3))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.au_mot("20 jours")
        cal = VGroup(*[Square(side_length=0.36, fill_color="#334155", fill_opacity=1, stroke_color="#94a3b8",
                              stroke_width=2) for _ in range(20)]).arrange_in_grid(4, 5, buff=0.06).move_to(P(2.6, -1.2))
        t20 = self.ligne([("20", JAUNE_TITRE), ("jours", WHITE)], 40).next_to(cal, RIGHT, buff=0.35)
        self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in cal], lag_ratio=0.04), FadeIn(t20), run_time=0.9)
        self.attendre_voix()

    # ── 02 : le diagramme ───────────────────────────────────────────────────

    def ecran_diagramme(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-diagramme")
        g = self.graphe()
        base = VGroup(g.carte, g.titre, g.grille, g.axe_x, g.axe_y, *g.traits.values(), *g.nombres.values())
        self.au_mot("Voici le diagramme")
        self.play(FadeIn(base, scale=0.95), run_time=0.5)
        self.au_mot("En bas")
        e1 = self.col(self.bloc(["En bas : les interventions", "dans la journée"], 36), 2.2)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), FadeIn(g.etiquettes, shift=UP * 0.2), run_time=0.5)
        self.au_mot("La hauteur")
        e2 = self.col(self.ligne([("La hauteur :", WHITE), ("le nombre de jours", AMBRE)], 36), 1.3)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), FadeIn(g.nom_axe), Indicate(g.axe_y, color=AMBRE), run_time=0.5)
        lignes = VGroup()
        for i, (m1, m2) in enumerate([("1 intervention", "4 jours"), ("2 interventions", "6 jours"),
                                      ("3 :", "8 jours"), ("4 :", "2 jours")]):
            self.au_mot(m1)
            self.play(Indicate(g.etiquettes[i], color=AMBRE, scale_factor=1.5), run_time=0.3)
            self.au_mot(m2)
            v = g.valeur(i, fs=28)
            lg = self.col(self.ligne([(str(VALS[i]), WHITE), ("intervention" + ("s" if i else "") + " :", WHITE),
                                      (str(EFF[i]), AMBRE), ("jours", WHITE)], 34), 0.35 - 0.6 * i)
            self.play(g.pousser(i, run_time=0.4), FadeIn(v, scale=1.5), FadeIn(lg, shift=RIGHT * 0.2), run_time=0.4)
            lignes.add(lg)
        self.attendre_voix()

    # ── 03 : l'effectif total ───────────────────────────────────────────────

    def ecran_total(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-total")
        g = self.graphe_pret()
        self.au_mot("l'effectif total")
        e = self.col(self.t("1. L'effectif total", 44, JAUNE_TITRE), 2.2)
        self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.4)
        somme = self.ligne([("4", AMBRE), ("+", WHITE), ("6", AMBRE), ("+", WHITE), ("8", AMBRE), ("+", WHITE),
                            ("2", AMBRE)], 52, 0.2)
        self.col(somme, 1.1)
        idx = self.positions("l'effectif total :", 5)
        for i in range(4):
            self.au_pos(idx[i])
            morceaux = [somme[2 * i]] + ([somme[2 * i - 1]] if i else [])
            self.play(*[FadeIn(m, scale=1.4) for m in morceaux], g.focus(i, 0.4), run_time=0.3)
        self.au_pos(idx[4])
        tot = self.col(self.ligne([("=", WHITE), ("20", VERT_OK), ("jours", WHITE)], 52, 0.25), 0.0)
        self.play(FadeIn(tot, shift=UP * 0.2), g.rallumer(), run_time=0.4)
        self.au_mot("C'est bien le nombre de jours")
        ok = self.col(VGroup(self.coche(VERT_OK, 0.3), self.t("20 jours relevés", 38)).arrange(RIGHT, buff=0.3), -1.0)
        self.play(FadeIn(ok, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 04 : la somme (valeur × effectif) ───────────────────────────────────

    def ecran_somme(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-somme")
        g = self.graphe_pret()
        self.au_mot("le nombre total d'interventions")
        e = self.col(self.bloc(["2. Le total", "des interventions"], 42, JAUNE_TITRE), 2.2)
        self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.4)
        prods = VGroup()
        for i in range(4):
            prods.add(self.ligne([(str(EFF[i]), AMBRE), ("×", WHITE), (str(VALS[i]), WHITE)], 44, 0.15))
        prods.arrange(RIGHT, buff=0.55)
        self.col(prods, 0.95)
        self.au_mot("4 jours à 1 intervention")
        self.play(g.focus(0, 0.4), run_time=0.3)
        jours = VGroup(*[Dot(radius=0.09, color=AMBRE) for _ in range(4)]).arrange(RIGHT, buff=0.12)
        jours.next_to(g.barres[0], RIGHT, buff=0.1).shift(DOWN * 0.3)
        self.play(LaggedStart(*[FadeIn(d, scale=0.4) for d in jours], lag_ratio=0.2), run_time=0.5)
        self.au_mot("4 fois 1")
        self.play(FadeIn(prods[0], scale=1.3), FadeOut(jours), run_time=0.35)
        for i, mot in [(1, "6 fois 2"), (2, "8 fois 3"), (3, "2 fois 4")]:
            self.au_mot(mot)
            self.play(FadeIn(prods[i], scale=1.3), g.focus(i, 0.4), run_time=0.35)
        self.play(g.rallumer(), run_time=0.2)
        res = self.ligne([("4", WHITE), ("+", WHITE), ("12", WHITE), ("+", WHITE), ("24", WHITE), ("+", WHITE),
                          ("8", WHITE)], 46, 0.18)
        self.col(res, -0.05)
        idx = self.positions("4 plus 12", 5)
        for i in range(4):
            self.au_pos(idx[i])
            morceaux = [res[2 * i]] + ([res[2 * i - 1]] if i else [])
            self.play(*[FadeIn(m, scale=1.4) for m in morceaux], Indicate(prods[i], color=AMBRE), run_time=0.3)
        self.au_pos(idx[4])
        tot = self.col(self.ligne([("=", WHITE), ("48", VERT_OK), ("interventions", WHITE)], 46, 0.22), -0.95)
        self.play(FadeIn(tot, shift=UP * 0.2), run_time=0.4)
        self.insister(tot[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 05 : la moyenne ─────────────────────────────────────────────────────

    def ecran_moyenne(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-moyenne")
        g = self.graphe_pret()
        self.au_mot("Enfin, la moyenne")
        e = self.col(self.t("3. La moyenne", 44, JAUNE_TITRE), 2.2)
        self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.4)
        c = self.ligne([("48", VERT_OK), ("÷", WHITE), ("20", AMBRE), ("=", WHITE), ("2,4", AMBRE)], 54, 0.22)
        self.col(c, 1.0)
        self.au_mot("48 divisé par 20")
        self.play(FadeIn(c[:3], scale=1.3), run_time=0.4)
        self.au_mot("égale 2,4")
        lm = self.ligne_moy(g, 2.4, label="2,4")
        self.play(FadeIn(c[3:], scale=1.4), Create(lm), run_time=0.6)
        self.insister(c[4], 1.4, 0.25)
        self.au_mot("interventions par jour")
        t = self.col(self.bloc(["2,4 interventions", "par jour, en moyenne"], 40), -0.3)
        self.play(FadeIn(t, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 06 : le piège (oublier les effectifs) ───────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        g = self.graphe_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.4)
        self.play(Write(titre), run_time=0.5)
        faux = self.ligne([("(1 + 2 + 3 + 4)", WHITE), ("÷ 4", WHITE)], 44, 0.2)
        self.col(faux, 1.45)
        self.au_mot("la moyenne de 1, 2, 3 et 4")
        self.play(FadeIn(faux, shift=RIGHT * 0.2), LaggedStart(*[Indicate(e, color=ORANGE_RETENUE, scale_factor=1.5)
                                                                 for e in g.etiquettes], lag_ratio=0.2), run_time=0.9)
        self.au_mot("sans tenir compte des effectifs")
        sans = self.col(self.t("sans les effectifs", 38, ORANGE_RETENUE), 0.7)
        self.play(FadeIn(sans, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Ça donnerait 2,5")
        r = self.col(self.ligne([("=", WHITE), ("2,5", ROUGE_ERREUR)], 48), -0.05)
        lm = self.ligne_moy(g, 2.5, ROUGE_ERREUR, "2,5")
        self.play(FadeIn(r, scale=1.3), Create(lm), run_time=0.5)
        self.au_mot("c'est faux")
        x = croix(VGroup(faux, r), sw=6)
        self.play(Create(x), FadeOut(lm), run_time=0.4)
        self.au_mot("Chaque valeur compte")
        e = self.col(self.bloc(["Chaque valeur compte", "autant de fois", "que son effectif."], 38, VERT_OK), -1.45)
        pts = VGroup()
        for i in range(4):
            col_ = VGroup(*[Dot(radius=0.07, color=AMBRE) for _ in range(EFF[i])]).arrange(UP, buff=0.05)
            col_.next_to(g.barres[i], RIGHT, buff=0.08).align_to(g.base(i), DOWN).shift(UP * 0.05)
            pts.add(col_)
        self.play(FadeIn(e, shift=UP * 0.2), LaggedStart(*[FadeIn(c, shift=UP * 0.2) for c in pts], lag_ratio=0.2),
                  run_time=1.0)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        g = self.graphe_pret()
        self.add(self.ligne_moy(g, 2.4, label="2,4"))
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Le 21e jour")
        j = self.col(self.ligne([("21e jour :", WHITE), ("feu de forêt !", ORANGE_RETENUE)], 40), 1.5)
        fl = flamme(0.5).move_to(P(5.7, 2.45))
        self.play(FadeIn(j, shift=RIGHT * 0.2), GrowFromEdge(fl, DOWN), run_time=0.6)
        self.au_mot("15 interventions")
        q = self.col(self.ligne([("15", ROUGE_ERREUR), ("interventions !", WHITE)], 44), 0.65)
        self.play(FadeIn(q, scale=0.8), Wiggle(fl), run_time=0.6)
        self.au_mot("Quelle est la nouvelle moyenne")
        q2 = self.col(self.bloc(["Nouvelle moyenne", "sur les 21 jours ?"], 40), -0.35)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE), -1.5)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        g = self.graphe_pret()
        lm = self.ligne_moy(g, 2.4, label="2,4")
        self.add(lm)
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.5)
        c1 = self.ligne([("48", WHITE), ("+", WHITE), ("15", ROUGE_ERREUR), ("=", WHITE), ("63", VERT_OK)], 50, 0.2)
        self.col(c1, 1.45)
        self.au_mot("48 plus")
        self.play(FadeIn(c1[:2], scale=1.3), run_time=0.3)
        self.au_mot("15, égale")
        self.play(FadeIn(c1[2:4], scale=1.3), run_time=0.3)
        self.au_mot("63 interventions")
        self.play(FadeIn(c1[4], scale=1.5), run_time=0.35)
        c2 = self.ligne([("63", VERT_OK), ("÷", WHITE), ("21", AMBRE), ("=", WHITE), ("3", VERT_OK)], 50, 0.2)
        self.col(c2, 0.5)
        self.au_mot("63 divisé par 21")
        self.play(FadeIn(c2[:3], scale=1.3), run_time=0.35)
        self.au_mot("égale 3")
        lm3 = self.ligne_moy(g, 3, VERT_OK, "3")
        self.play(FadeIn(c2[3:], scale=1.4), Transform(lm, lm3), run_time=0.8)
        self.play(Create(self.encadrer(VGroup(c1, c2))), run_time=0.35)
        self.au_mot("Un seul jour extrême")
        e = self.col(self.bloc(["Un seul jour extrême :", "2,4 devient 3 !"], 40, ORANGE_RETENUE), -0.75)
        self.play(FadeIn(e, shift=UP * 0.2), run_time=0.5)
        self.au_mot("passe de 2,4 à 3")
        self.insister(e[1], 1.15, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        g = self.graphe_pret()
        lignes = self.finale([("Valeur × effectif,", "pour chaque valeur."),
                              ("Je divise par", "l'effectif total."),
                              ("Une valeur extrême", "peut tirer la moyenne.")], [1.75, 0.15, -1.45])
        self.au_mot("je multiplie chaque valeur")
        self.montrer_ligne(lignes[0], LaggedStart(*[Indicate(b, color=AMBRE) for b in g.barres], lag_ratio=0.2))
        self.au_mot("Je divise")
        self.montrer_ligne(lignes[1], Create(self.ligne_moy(g, 2.4, label="2,4")))
        self.au_mot("Et une valeur extrême")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_diagramme()
        self.ecran_total()
        self.ecran_somme()
        self.ecran_moyenne()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class StatsDefi5e(StatsDefiBase):
    identite = "Maths 5e — EleveAI"
