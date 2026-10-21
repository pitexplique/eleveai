# stats_comparer.py
# EleveAI — Maths 6e — série « Statistiques », épisode 08 : COMPARER DES
# DONNÉES (micro du coach : stat_donnee_comparer — qui est le plus grand, et de
# combien ; lire chaque valeur, ranger, calculer l'écart), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE : lire trois valeurs, les ranger et calculer un
# écart par une soustraction de nombres à quatre chiffres ; un cran au-dessus
# du « je vois ». Short jumeau : stats_comparer_short.py (blanche).
#
# ⭐ Décor et métier : la GÉOGRAPHIE de La Réunion ; un CARTOGRAPHE mesure les
# montagnes pour dessiner les cartes. Altitudes (IGN, arrondies au mètre) :
# Piton des Neiges 3 070 m, Grand Bénare 2 898 m, Piton de la Fournaise 2 632 m.
# Écart Neiges − Fournaise = 438 m ; défi Bénare − Fournaise = 266 m.
# ⭐ La figure est CELLE DU COACH (`stat_graph` barres, manim/canvas_stats.py :
# carte blanche, axe gradué de 500 en 500). Les barres sont d'abord dans
# l'ordre de la carte (d'ouest en est : Bénare, Neiges, Fournaise), puis on les
# RANGE (elles glissent à leur place). L'écart se VOIT : le niveau du plus
# petit sommet en pointillé, une double flèche sur la barre du plus grand.
# Le carte de l'île : manim/carte_reunion.py (contour géographique).
# ⛔ PAS D'ÉCART : une altitude ne s'écrit qu'au mot où la voix la dit ; les
# nombres de l'axe sont des étiquettes.
#
# Écrans : 00 garde · 01 le cartographe, la carte et les trois sommets · 02 les
# altitudes · 03 ranger · 04 l'écart (3 070 − 2 632 = 438 m) · 05 le piège (la
# photo) · 06 défi · 06b correction (2 898 − 2 632 = 266 m) · 07 ce que tu as
# appris · 08 fin (règle du 19/10).
#
# Voix : manim/voix/6e-stats-comparer.json (débit −10), WAV dans
# public/sons/6e-stats-comparer/ ; calage mot à mot :
# manim/scripts/6e/stats_comparer_marques.json (marques.ps1 + conv.py, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/6e/stats_comparer.py StatsComparer6e -o eleveai-maths-6e-stats-comparer --media_dir manim/scripts/6e/media-comparer
# Sortie : manim/sorties/6e/maths/statistiques/08-comparer/eleveai-maths-6e-stats-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats6_lotc_commun import *  # noqa: E402,F403
from canvas_stats import AMBRE, NUIT, Barres, fr, texte  # noqa: E402
from carte_reunion import CarteReunion  # noqa: E402

# l'ordre de la carte, d'ouest en est
NOMS = ["Grand Bénare", "Piton des Neiges", "Piton de la Fournaise"]
CAT = ["Grand\nBénare", "Piton des\nNeiges", "Piton de la\nFournaise"]
ALT = [2898, 3070, 2632]
COUL = ["#93c5fd", "#e2e8f0", "#fca5a5"]
COUL_TXT = ["#93c5fd", "#f8fafc", "#fca5a5"]
GEO = [(55.42, -21.12), (55.48, -21.10), (55.71, -21.24)]
RANG = [1, 0, 2]  # rangés du plus haut au plus bas : Neiges, Bénare, Fournaise


def montagne(larg=1.6, haut=1.3, couleur="#78716c", neige=False, volcan=False):
    corps = Polygon(P(-larg / 2, 0), P(larg / 2, 0), P(0.08 * larg, haut), P(-0.06 * larg, haut * 0.96),
                    fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    g = VGroup(corps)
    if neige:
        g.add(Polygon(P(-0.06 * larg, haut * 0.96), P(0.08 * larg, haut), P(0.2 * larg, haut * 0.72),
                      P(0.05 * larg, haut * 0.78), P(-0.17 * larg, haut * 0.7), fill_color=WHITE, fill_opacity=1,
                      stroke_width=0))
    if volcan:
        g.add(VGroup(*[Circle(radius=0.08 * k, fill_color="#9ca3af", fill_opacity=0.7, stroke_width=0)
                       .move_to(P(0.05 * larg + 0.1 * k, haut + 0.15 * k)) for k in (1, 2, 3)]))
    return g


def triangle_sommet(couleur, r=0.16):
    return Triangle(fill_color=couleur, fill_opacity=1, stroke_color=NUIT, stroke_width=2).scale(r)


class StatsComparerBase(MotsCales6, OutilsPaysage, Notion6e):
    nom_voix = "6e-stats-comparer"
    fichier_marques = "stats_comparer_marques.json"
    identite = "Maths 6e — EleveAI"
    G = P(-3.2, -0.25)

    def graphe(self, ordre=(0, 1, 2), centre=None, titre=True):
        """Le diagramme du coach (non ajouté), barres dans l'ordre donné (indices de NOMS)."""
        g = Barres([CAT[k] for k in ordre], [ALT[k] for k in ordre], pas=500, maxi=3500,
                   couleurs=[COUL[k] for k in ordre], nom_axe="Altitude (m)",
                   titre="Les sommets de La Réunion" if titre else None, largeur=4.9, hauteur=4.0, fs=26,
                   centre=self.G if centre is None else centre)
        g.ordre = list(ordre)
        return g

    def range_pret(self, valeurs=True):
        """Le diagramme rangé, posé d'un coup, avec les altitudes au-dessus (déjà dites)."""
        g = self.graphe(RANG)
        self.add(g)
        vals = VGroup(*[g.valeur(i, fs=28) for i in range(3)]) if valeurs else VGroup()
        self.add(vals)
        return g, vals

    def ecart(self, g, i_haut, i_bas, couleur=ORANGE_RETENUE):
        """Le niveau du plus bas (pointillé) et la double flèche sur la barre du plus haut."""
        y_bas = g.barres[i_bas].get_top()[1]
        b = g.barres[i_haut]
        x = b.get_center()[0]
        x0 = min(g.barres[i_bas].get_left()[0], b.get_left()[0])
        x1 = max(g.barres[i_bas].get_right()[0], b.get_right()[0])
        niveau = DashedLine(P(x0, y_bas), P(x1 + 0.1, y_bas), color=AMBRE, stroke_width=5, dash_length=0.12)
        fl = DoubleArrow(P(x, y_bas), P(x, b.get_top()[1]), buff=0, color=couleur, stroke_width=6,
                         tip_length=0.15, max_tip_length_to_length_ratio=0.4)
        return niveau, fl

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des données", self.identite, "jaune")
        g = Barres(["", "", ""], ALT, pas=500, maxi=3500, couleurs=COUL, largeur=3.4, hauteur=2.2, fs=22,
                   centre=P(-0.6, 0.1))
        self.au_mot("Comparer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9),
                  run_time=0.6)
        self.au_mot("qui est le plus haut")
        self.play(g.pousser(run_time=0.8))
        self.play(g.focus(1, 0.4), run_time=0.3)
        self.au_mot("de combien")
        niveau, fl = self.ecart(g, 1, 2)
        q = self.t("?", 80, ORANGE_RETENUE).next_to(g, RIGHT, buff=0.4)
        self.play(Create(niveau), GrowFromCenter(fl), FadeIn(q, scale=0.4), run_time=0.5)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : le cartographe ─────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        carte = CarteReunion(hauteur=4.6, centre=P(-3.3, -0.3), couleur="#4ade80", remplissage="#166534",
                             opacite=0.5)
        ile = carte.contour()
        # deux courbes de niveau autour des sommets (la carte du cartographe)
        c_n = carte.point(*GEO[1])
        niveaux = VGroup(*[Ellipse(width=w, height=w * 0.75, stroke_color="#bbf7d0", stroke_width=2,
                                   stroke_opacity=0.8).move_to(c_n) for w in (0.9, 1.6)])
        c_f = carte.point(*GEO[2])
        niveaux.add(*[Ellipse(width=w, height=w * 0.8, stroke_color="#fecaca", stroke_width=2,
                              stroke_opacity=0.8).move_to(c_f) for w in (0.6, 1.1)])
        self.au_mot("Un cartographe")
        metier = self.t("Cartographe", 48, BLEU_CALCUL).move_to(P(2.6, 2.7))
        self.play(DrawBorderThenFill(ile), Write(metier), run_time=1.0)
        self.au_mot("mesure les montagnes")
        self.play(LaggedStart(*[Create(n) for n in niveaux], lag_ratio=0.2), run_time=1.0)
        self.au_mot("dessiner les cartes")
        compas = VGroup(Line(P(0, 0), P(-0.35, -1.0), stroke_width=6, color="#cbd5e1"),
                        Line(P(0, 0), P(0.35, -1.0), stroke_width=6, color="#cbd5e1"),
                        Circle(radius=0.1, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)).move_to(P(2.6, 1.2))
        self.play(FadeIn(compas, shift=DOWN * 0.2), run_time=0.4)
        self.play(Rotate(compas, PI / 8), run_time=0.4)
        self.au_mot("trois grands sommets")
        tris = VGroup(*[triangle_sommet(COUL[k]).move_to(carte.point(*GEO[k])) for k in range(3)])
        noms = VGroup(*[VGroup(triangle_sommet(COUL[k], 0.2), self.t(NOMS[k], 36)).arrange(RIGHT, buff=0.25)
                        for k in RANG])
        noms.arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        self.col(noms, -0.6, xl=1.3)
        self.play(LaggedStart(*[GrowFromCenter(t) for t in tris], lag_ratio=0.25),
                  LaggedStart(*[FadeIn(n, shift=RIGHT * 0.2) for n in noms], lag_ratio=0.25), run_time=1.0)
        self.attendre_voix()

    # ── 02 : les altitudes ──────────────────────────────────────────────────

    def ecran_donnees(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-donnees")
        g = self.graphe()
        self.add(g)  # le graphique est déjà là : la voix commence tout de suite par « Le Piton des Neiges »
        mots = [("Le Piton des Neiges", "3 070"), ("Le Grand Bénare", "2 898"), ("Le Piton de la Fournaise", "2 632")]
        for (m1, m2), k, y in zip(mots, RANG, [1.8, 0.5, -0.8]):
            self.au_mot(m1)
            ligne = VGroup(triangle_sommet(COUL[k], 0.2), self.t(NOMS[k] + " :", 36)).arrange(RIGHT, buff=0.25)
            self.col(ligne, y)
            self.play(g.focus(k, 0.35), FadeIn(ligne, shift=RIGHT * 0.2), run_time=0.4)
            self.au_mot(m2)
            v = g.valeur(k, fs=28)
            alt = self.t(fr(ALT[k]) + " m", 44, COUL_TXT[k]).next_to(ligne, DOWN, buff=0.12).align_to(ligne[1], LEFT)
            self.play(FadeIn(v, scale=1.6), FadeIn(alt, scale=1.4), run_time=0.4)
        self.play(g.rallumer(), run_time=0.4)
        self.attendre_voix()

    # ── 03 : ranger ─────────────────────────────────────────────────────────

    def ecran_ranger(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ranger")
        g = self.graphe()
        self.add(g)
        vals = [g.valeur(i, fs=28) for i in range(3)]
        self.add(*vals)
        self.au_mot("je range dans l'ordre")
        titre = self.col(self.t("Je range dans l'ordre", 42, JAUNE_TITRE), 2.6)
        g2 = self.graphe(RANG)
        anims = []
        for j, k in enumerate(RANG):
            anims += [Transform(g.barres[k], g2.barres[j]), Transform(g.etiquettes[k], g2.etiquettes[j])]
        self.play(FadeIn(titre, shift=RIGHT * 0.2), run_time=0.4)
        self.play(*anims, *[vals[k].animate.next_to(g2.barres[j].get_top(), UP, buff=0.14) for j, k in
                            enumerate(RANG)], run_time=1.2)
        fl = Arrow(g2.barres[0].get_top() + UP * 0.6 + LEFT * 0.3, g2.barres[2].get_top() + UP * 0.6 + RIGHT * 0.3,
                   buff=0, color=AMBRE, stroke_width=6)
        lignes = []
        for mot, k, y in [("Le plus haut", 1, 0.9), ("Puis le Grand Bénare", 0, -0.1),
                          ("Puis le Piton de la Fournaise", 2, -1.1)]:
            self.au_mot(mot)
            if k == 1:
                h = self.col(self.t("le plus haut :", 40, VERT_OK), 1.75)
                self.play(FadeIn(h, shift=RIGHT * 0.2), run_time=0.3)
            morceaux = [triangle_sommet(COUL[k], 0.22), self.t(NOMS[k], 40)]
            if k != 1:
                morceaux.insert(0, self.t("puis", 40, "#94a3b8"))
            ligne = VGroup(*morceaux).arrange(RIGHT, buff=0.22)
            self.col(ligne, y)
            b = g.barres[k]
            self.play(FadeIn(ligne, shift=RIGHT * 0.2), Indicate(b, color=AMBRE, scale_factor=1.05), run_time=0.5)
            lignes.append(ligne)
        self.play(GrowArrow(fl), run_time=0.5)
        self.attendre_voix()

    # ── 04 : l'écart ────────────────────────────────────────────────────────

    def ecran_ecart(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-ecart")
        g, vals = self.range_pret()
        self.au_mot("De combien")
        q = self.col(self.bloc(["De combien le Piton", "des Neiges dépasse", "la Fournaise ?"], 40), 2.2)
        self.play(FadeIn(q, shift=RIGHT * 0.2), g.estomper([0, 2], 0.3), run_time=0.5)
        niveau, fl = self.ecart(g, 0, 2)
        pq = self.t("?", 48, ORANGE_RETENUE).set_stroke(BLACK, 5, background=True).next_to(fl, DOWN, buff=0.08)
        self.play(Create(niveau), run_time=0.4)
        self.play(GrowFromCenter(fl), FadeIn(pq, scale=1.5), run_time=0.4)
        calc = self.ligne([("3 070", COUL_TXT[1]), ("−", WHITE), ("2 632", COUL_TXT[2]), ("=", WHITE),
                           ("438 m", VERT_OK)], 46, 0.22)
        self.col(calc, 0.2)
        self.au_mot("3 070 moins")
        self.play(FadeIn(calc[0], scale=1.4), FadeIn(calc[1]), Indicate(vals[0], color=AMBRE), run_time=0.4)
        self.au_mot("2 632, égale")
        self.play(FadeIn(calc[2], scale=1.4), FadeIn(calc[3]), Indicate(vals[2], color=AMBRE), run_time=0.4)
        self.au_mot("438 mètres")
        lab = self.t("438 m", 30, ORANGE_RETENUE).set_stroke(BLACK, 5, background=True).next_to(fl, DOWN, buff=0.08)
        self.play(FadeIn(calc[4], scale=1.6), Transform(pq, lab), run_time=0.45)
        cadre = self.encadrer(calc)
        self.play(Create(cadre), run_time=0.35)
        self.insister(calc[4], 1.3, 0.3)
        self.attendre_voix()

    # ── 05 : le piège (la photo) ────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.au_mot("Le piège")
        titre = self.t("Le piège : se fier à une photo", 46, ROUGE_ERREUR).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.7)
        cadre = RoundedRectangle(width=6.2, height=4.2, corner_radius=0.1, fill_color="#0c4a6e", fill_opacity=1,
                                 stroke_color=WHITE, stroke_width=8).move_to(P(-3.3, -0.5))
        sol = Rectangle(width=6.2, height=0.9, fill_color="#365314", fill_opacity=1, stroke_width=0)
        sol.align_to(cadre, DOWN).align_to(cadre, LEFT)
        loin = montagne(1.6, 1.0, "#94a3b8", neige=True).move_to(cadre.get_center() + P(-1.6, -0.4), aligned_edge=DOWN)
        pres = montagne(4.2, 3.0, "#7f1d1d", volcan=True).move_to(cadre.get_center() + P(1.0, -2.05), aligned_edge=DOWN)
        self.play(FadeIn(VGroup(cadre, sol, loin)), run_time=0.5)
        self.au_mot("De près")
        self.play(GrowFromEdge(pres, DOWN), run_time=0.8)
        self.au_mot("paraît immense")
        e1 = self.col(self.bloc(["De près, un petit sommet", "paraît immense !"], 36, ORANGE_RETENUE), 1.5)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), Indicate(pres, color=ORANGE_RETENUE, scale_factor=1.05), run_time=0.6)
        self.au_mot("Je compare les nombres")
        comp = self.ligne([("3 070 m", COUL_TXT[1]), (">", WHITE), ("2 632 m", COUL_TXT[2])], 46, 0.25)
        self.col(comp, 0.0)
        x = croix(VGroup(cadre).copy().scale(0.9), sw=6)
        self.play(FadeIn(comp, scale=0.6), Create(x), run_time=0.6)
        self.au_mot("dans la même unité")
        u = self.col(self.t("dans la même unité", 40, VERT_OK), -1.1)
        self.play(FadeIn(u, shift=UP * 0.2), run_time=0.4)
        self.insister(comp, 1.12, 0.3)
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        g, vals = self.range_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("De combien de mètres")
        q = self.col(self.bloc(["De combien de mètres", "le Grand Bénare", "dépasse la Fournaise ?"], 40), 1.15)
        self.play(FadeIn(q, shift=RIGHT * 0.2), g.estomper([1, 2], 0.3), run_time=0.6)
        niveau, fl = self.ecart(g, 1, 2)
        pq = self.t("?", 48, ORANGE_RETENUE).set_stroke(BLACK, 5, background=True).next_to(fl, DOWN, buff=0.08)
        self.play(Create(niveau), GrowFromCenter(fl), FadeIn(pq, scale=1.5), run_time=0.6)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -1.0)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06b-correction")
        g, vals = self.range_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), g.estomper([1, 2], 0.3), run_time=0.6)
        niveau, fl = self.ecart(g, 1, 2)
        self.add(niveau, fl)
        calc = VGroup(self.ligne([("2 898", COUL_TXT[0]), ("−", WHITE), ("2 632", COUL_TXT[2])], 50, 0.25),
                      self.ligne([("=", WHITE), ("266 m", VERT_OK)], 50, 0.25))
        calc[1].next_to(calc[0], DOWN, buff=0.3).align_to(calc[0], LEFT)
        calc = VGroup(*calc[0], *calc[1])
        self.col(calc, 1.0)
        self.au_mot("2 898 moins")
        self.play(FadeIn(calc[0], scale=1.4), FadeIn(calc[1]), Indicate(vals[1], color=AMBRE), run_time=0.4)
        self.au_mot("2 632, égale")
        self.play(FadeIn(calc[2], scale=1.4), FadeIn(calc[3]), Indicate(vals[2], color=AMBRE), run_time=0.4)
        self.au_mot("266 mètres")
        lab = self.t("266 m", 30, ORANGE_RETENUE).set_stroke(BLACK, 5, background=True).next_to(fl, DOWN, buff=0.08)
        self.play(FadeIn(calc[4], scale=1.6), FadeIn(lab, scale=1.4), run_time=0.45)
        self.play(Create(self.encadrer(calc)), run_time=0.35)
        self.insister(calc[4], 1.3, 0.3)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        g, vals = self.range_pret()
        lignes = self.finale([("Je lis chaque valeur.",), ("Je les range", "dans l'ordre."),
                              ("Je calcule l'écart :", "une soustraction."), ("Toujours", "la même unité.")],
                             [2.1, 1.0, -0.3, -1.55])
        self.au_mot("je lis chaque valeur")
        self.montrer_ligne(lignes[0], LaggedStart(*[Indicate(v, color=AMBRE) for v in vals], lag_ratio=0.2))
        self.au_mot("je les range dans l'ordre")
        self.montrer_ligne(lignes[1])
        self.au_mot("je calcule l'écart")
        niveau, fl = self.ecart(g, 0, 2)
        self.montrer_ligne(lignes[2], Create(niveau), GrowFromCenter(fl))
        self.au_mot("Toujours dans la même unité")
        self.montrer_ligne(lignes[3])
        self.insister(lignes[3][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_ranger()
        self.ecran_ecart()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")


class StatsComparer6e(StatsComparerBase):
    identite = "Maths 6e — EleveAI"
