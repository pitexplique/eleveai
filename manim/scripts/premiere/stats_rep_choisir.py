# stats_rep_choisir.py
# EleveAI — Maths 1re (tronc commun) — série « Statistiques », lycée, épisode 09 :
# CHOISIR LA REPRÉSENTATION ADAPTÉE. Micro du coach info_rep_choisir (notion
# info_representations_croisees). AVEC VOIX. Paysage 16:9. CEINTURE VERTE : la
# paysage complète du niveau (intention → représentation ; pièges : parts qui
# dépassent 100 %, secteurs trop proches). Short jumeau :
# stats_rep_choisir_short.py (orange).
#
# ⭐ Décor et métier : le JEU VIDÉO ; une CHARGÉE D'ÉTUDES du jeu vidéo prépare le
# bilan du marché français (problématique : choisir le bon graphique pour
# chaque message). Centres d'intérêt : jeux-video, argent-budget.
# Sources (lues le 24/10/2026) :
#  · SELL, communiqué « Bilan du marché français 2024 » (27/03/2025) :
#    https://www.sell.fr/sites/default/files/espace-presse/sell_cp_bilan_marche_2024_def.pdf
#    marché 5,677 Md€ (5,7) ; console 2,554 Md€ (45 %) ; PC 1,519 Md€ (27 %) ;
#    mobile 1,604 Md€ (28 %). Contrôle : 2,554 + 1,519 + 1,604 = 5,677 ; 45 + 27 + 28 = 100.
#  · SELL, « L'essentiel du jeu vidéo », mars 2025, p. 56 « Les supports utilisés
#    pour jouer » (enquête de juin-juillet 2024, 4 005 personnes de 10 à 80 ans) :
#    https://www.sell.fr/sites/default/files/essentiel-jeu-video/def_ejv_mars_2025.pdf
#    smartphone 56 % · console de jeux TV 45 % · ordinateur 38 % · console
#    portable 23 % · tablette 22 % ; 2,2 supports utilisés en moyenne.
#    56 + 45 + 38 + 23 + 22 = 184 (Python).
#
# Mapping micro → écrans (banque information-chiffree, info_rep_choisir) :
# info_rep_choisir_intention (répartition → circulaire, comparaison → barres,
# évolution → courbe, relation → nuage) → 02, 03, 04, questions 1 et 2, défi ·
# info_rep_choisir_piege (« multiples » : parts > 100 % ; secteurs trop proches)
# → 04, 06 piège.
# Écrans : 00 garde · 01 la chargée d'études · 02 les quatre intentions · 03 la
# répartition · 04 la comparaison · 05 question 1 · 06 le piège (184 %) · 07
# question 2 · 08 défi · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/1re-stats-rep-choisir.json (débit −7) ; calage :
# manim/scripts/premiere/stats_rep_choisir_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/premiere/stats_rep_choisir.py StatsRepChoisirPremiere -o eleveai-maths-premiere-commun-stats-rep-choisir --media_dir manim/scripts/premiere/media-stats-rep-choisir
# Sortie : manim/sorties/premiere-commun/maths/statistiques/09-rep-choisir/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from stats_lycee_i1_commun import *  # noqa: E402,F403

ECO = ["Console", "Mobile", "PC"]
ECO_PC = [45, 28, 27]
ECO_MD = [2.554, 1.604, 1.519]
SUPPORTS = ["Smart-\nphone", "Console\nsalon", "Ordi-\nnateur", "Console\nportable", "Tablette"]
SUPPORTS_COURTS = ["Smartph.", "Console", "Ordi.", "Portable", "Tablette"]
SUP_PC = [56, 45, 38, 23, 22]
COUL3 = ["#93c5fd", "#fcd34d", "#6ee7b7"]
BLEU_B = "#93c5fd"


def mini_carte(contenu, w=1.6, h=1.2):
    c = RoundedRectangle(width=w, height=h, corner_radius=0.14, fill_color=WHITE, fill_opacity=1,
                         stroke_color=GRILLE, stroke_width=3)
    contenu.move_to(c)
    return VGroup(c, contenu)


def icone(genre, w=1.6, h=1.2):
    """Le pictogramme d'une représentation, dans une petite carte blanche."""
    if genre == "circulaire":
        g = VGroup(*[Sector(radius=0.42, start_angle=PI / 2 - a0 * TAU, angle=-a * TAU, fill_color=c,
                            fill_opacity=1, stroke_color=WHITE, stroke_width=2)
                     for a0, a, c in ((0, 0.5, "#fcd34d"), (0.5, 0.3, "#93c5fd"), (0.8, 0.2, "#6ee7b7"))])
    elif genre == "barres":
        g = VGroup(*[Rectangle(width=0.22, height=hh, fill_color="#93c5fd", fill_opacity=1, stroke_color=NUIT,
                               stroke_width=2) for hh in (0.75, 0.5, 0.3)]).arrange(RIGHT, buff=0.1, aligned_edge=DOWN)
        g.add(Line(g.get_corner(DL) + LEFT * 0.08, g.get_corner(DR) + RIGHT * 0.08, color=NUIT, stroke_width=3))
    elif genre == "courbe":
        pts = [P(-0.55, -0.3), P(-0.25, -0.05), P(0.05, -0.15), P(0.3, 0.15), P(0.55, 0.3)]
        g = VGroup(VMobject(stroke_color=BLEU_COURBE_I, stroke_width=4).set_points_as_corners(pts),
                   *[Dot(p, radius=0.05, color=BLEU_COURBE_I) for p in pts],
                   Line(P(-0.65, -0.42), P(0.65, -0.42), color=NUIT, stroke_width=3))
    else:  # nuage
        pts = [(-0.5, -0.3), (-0.35, -0.1), (-0.2, -0.2), (-0.05, 0.05), (0.1, -0.02), (0.25, 0.2), (0.4, 0.12),
               (0.52, 0.32)]
        g = VGroup(*[Dot(P(x, y), radius=0.05, color="#dc2626") for x, y in pts],
                   Line(P(-0.62, -0.42), P(0.62, -0.42), color=NUIT, stroke_width=3),
                   Line(P(-0.62, -0.42), P(-0.62, 0.42), color=NUIT, stroke_width=3))
    return mini_carte(g, w, h)


BLEU_COURBE_I = "#2563eb"
INTENTIONS = [("Répartition", "circulaire", "circulaire"), ("Comparaison", "barres", "barres"),
              ("Évolution", "courbe", "courbe"), ("Lien", "nuage", "nuage de points")]


def manette(h=1.6):
    """Une manette de jeu : corps arrondi, croix, deux boutons."""
    corps = RoundedRectangle(width=h * 1.6, height=h * 0.8, corner_radius=h * 0.35, fill_color="#334155",
                             fill_opacity=1, stroke_color="#94a3b8", stroke_width=4)
    croix_ = VGroup(Rectangle(width=h * 0.36, height=h * 0.12), Rectangle(width=h * 0.12, height=h * 0.36))
    croix_.set_fill(WHITE, 1).set_stroke(width=0).move_to(corps.get_center() + LEFT * h * 0.45)
    b = VGroup(Circle(radius=h * 0.07, fill_color="#ef4444", fill_opacity=1, stroke_width=0),
               Circle(radius=h * 0.07, fill_color="#22c55e", fill_opacity=1, stroke_width=0))
    b.arrange(RIGHT, buff=h * 0.08).move_to(corps.get_center() + RIGHT * h * 0.45)
    return VGroup(corps, croix_, b)


class StatsRepChoisirBase(PaysageI1):
    nom_voix = "1re-stats-rep-choisir"
    fichier_marques = "stats_rep_choisir_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"
    XL = 1.0

    def quatre(self, w=2.6, h=1.6, fs=30, avec_noms=True):
        """La grille des quatre intentions : carte-icône + intention + représentation."""
        cases = VGroup()
        for nom, g, rep in INTENTIONS:
            ic = icone(g, w, h)
            t1 = self.t(nom, fs, AMBRE)
            t2 = self.t(rep, fs - 4, WHITE)
            cases.add(VGroup(ic, VGroup(t1, t2).arrange(DOWN, buff=0.06).next_to(ic, DOWN, buff=0.15)))
        cases.arrange(RIGHT, buff=0.45)
        return cases

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Choisir la bonne représentation", self.identite, self.ceinture)
        ics = VGroup(*[icone(g, 1.6, 1.2) for g in ("circulaire", "barres", "courbe", "nuage")]).arrange(RIGHT, buff=0.35)
        ics.move_to(P(-0.4, 0.1))
        self.au_mot("Choisir la bonne représentation")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Camembert")
        for k, mot in enumerate(["Camembert", "barres", "courbe", "nuage"]):
            self.au_mot(mot)
            self.play(FadeIn(ics[k], shift=UP * 0.2), run_time=0.3)
        self.au_mot("lequel")
        q = self.t("?", 80, ORANGE_RETENUE).next_to(ics, RIGHT, buff=0.4)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la chargée d'études ────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        m = manette(1.9).move_to(P(-3.8, 0.7))
        self.play(FadeIn(m, shift=UP * 0.3), run_time=0.5)
        self.au_mot("Une chargée d'études")
        metier = self.col(self.bloc(["Chargée d'études", "du jeu vidéo"], 42, BLEU_CALCUL), 2.45, xl=0.4)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.5)
        self.au_mot("le bilan du marché")
        bil = self.col(self.t("bilan du marché français", 32), 1.35, xl=0.4)
        self.play(FadeIn(bil), run_time=0.4)
        self.au_mot("5,7 milliards")
        nb = self.ligne([("5,7", JAUNE_TITRE), ("milliards d'euros", WHITE)], 36).move_to(P(-3.7, -1.1))
        an = self.t("en 2024", 30, GREY_A).next_to(nb, DOWN, buff=0.12)
        self.play(FadeIn(nb, scale=0.7), FadeIn(an), run_time=0.5)
        self.au_mot("Pour chaque message")
        ics = VGroup(*[icone(g, 1.25, 0.95) for g in ("circulaire", "barres", "courbe", "nuage")])
        ics.arrange(RIGHT, buff=0.22)
        self.col(ics, 0.05, xl=0.5)
        self.play(LaggedStart(*[FadeIn(i, shift=UP * 0.2) for i in ics], lag_ratio=0.2), run_time=0.8)
        self.au_mot("le bon graphique")
        q = self.col(self.t("lequel choisir ?", 38, ORANGE_RETENUE), -1.1, xl=0.5)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.attendre_voix()

    # ── 02 : les quatre intentions ──────────────────────────────────────────

    def ecran_intentions(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-intentions")
        self.au_mot("La règle")
        t0 = self.t("D'abord l'intention, ensuite le dessin", 44, JAUNE_TITRE).move_to(P(0, 2.85))
        self.play(Write(t0), run_time=0.8)
        cases = self.quatre()
        caser(cases, -6.3, 6.3, -1.8, 1.9)
        for k, mot in enumerate(["Une répartition", "Une comparaison", "Une évolution", "Un lien"]):
            self.au_mot(mot)
            self.play(FadeIn(cases[k][0], shift=UP * 0.2), FadeIn(cases[k][1][0]), run_time=0.4)
            self.play(FadeIn(cases[k][1][1], shift=UP * 0.1), run_time=0.3)
        self.insister(cases, 1.04, 0.3)
        self.attendre_voix()

    # ── 03 : la répartition ─────────────────────────────────────────────────

    def ecran_repartition(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-repartition")
        c = Camembert(ECO, ECO_PC, rayon=1.8, couleurs=COUL3, titre="Marché 2024 (en %)", fs=30,
                      valeurs_parts=True, pourcentages=True)
        caser(c, -6.6, 0.45, -3.2, 3.1)
        vals = [t[1] for t in c.textes]
        for t, v in zip(c.textes, vals):
            t.remove(v)
            t.set_z_index(3)
            v.set_z_index(3)
        self.au_mot("Message un")
        t0 = self.col(self.ligne([("Message 1 :", AMBRE), ("le partage", WHITE)], 42), 2.7)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), FadeIn(c.fond), c.apparaitre(run_time=0.9), run_time=0.9)
        for k, (nom, v) in enumerate(zip(ECO, ECO_PC)):
            self.au_mot(f"{v} %")
            ln = self.col(self.ligne([(nom + " :", WHITE), (f"{v} %", COUL3[k])], 38), 1.75 - k * 0.65)
            self.play(FadeIn(vals[k], scale=1.3), FadeIn(ln, shift=RIGHT * 0.2), c.focus(k, 0.4), run_time=0.4)
        self.au_mot("les parts d'un même tout")
        self.play(c.rallumer(), run_time=0.3)
        s = self.col(self.ligne([("45 + 28 + 27", WHITE), ("=", WHITE), ("100 %", VERT_OK)], 38), -0.35)
        self.play(FadeIn(s, shift=UP * 0.15), run_time=0.4)
        self.au_mot("un diagramme circulaire")
        r = self.col(VGroup(icone("circulaire", 1.3, 1.0), self.t("diagramme circulaire", 36, VERT_OK))
                     .arrange(RIGHT, buff=0.25), -1.4)
        self.play(FadeIn(r, scale=0.8), run_time=0.5)
        self.insister(r, 1.08, 0.3)
        self.attendre_voix()

    # ── 04 : la comparaison ─────────────────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-comparer")
        g = Barres(ECO, ECO_MD, pas=0.5, maxi=3, couleurs=[BLEU_B] * 3, nom_axe="milliards d'€",
                   titre="Marché 2024", largeur=4.4, hauteur=3.3, fs=28)
        caser(g, -6.6, -0.6, -3.2, 3.1)
        self.au_mot("Message deux")
        t0 = self.col(self.ligne([("Message 2 :", AMBRE), ("classer", WHITE)], 42), 2.7, xl=-0.2)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), FadeIn(g.fond), run_time=0.5)
        for k, (mot, v) in enumerate(zip(["2,554", "1,604", "1,519"], ECO_MD)):
            self.au_mot(mot)
            self.play(g.pousser(indices=[k], run_time=0.5), run_time=0.5)
            self.add(g.barres[k])
            val = texte(mot, 26, NUIT).next_to(g.barres[k], UP, buff=0.08)
            self.play(FadeIn(val, scale=1.3), run_time=0.3)
        self.au_mot("très proches")
        mc = Camembert(ECO, ECO_PC, rayon=0.95, couleurs=COUL3, fs=20, titre=None, montrer_etiquettes=False)
        mc.move_to(P(1.4, 0.75))
        self.play(FadeIn(mc), g.estomper([1, 2], 0.35), run_time=0.5)
        self.play(mc.estomper([1, 2], 0.3), run_time=0.3)
        lab = VGroup(self.t("Mobile ou PC ?", 32, ORANGE_RETENUE), self.t("28 % ou 27 % ?", 32, ORANGE_RETENUE))
        lab.arrange(DOWN, aligned_edge=LEFT, buff=0.1).next_to(mc, RIGHT, buff=0.3)
        self.play(FadeIn(lab), run_time=0.3)
        self.au_mot("des barres les départagent")
        r = self.col(VGroup(icone("barres", 1.3, 1.0), self.t("des barres", 36, VERT_OK)).arrange(RIGHT, buff=0.25),
                     -1.45, xl=-0.2)
        self.play(FadeIn(r, scale=0.8), g.rallumer(), run_time=0.5)
        self.insister(r, 1.08, 0.3)
        self.attendre_voix()

    # ── 05 : question 1 (une évolution) ─────────────────────────────────────

    def frise(self):
        """Une frise des années 2019 → 2024, et un « ? » : l'évolution à montrer."""
        ans = VGroup(*[self.t(str(a), 34) for a in range(2019, 2025)]).arrange(RIGHT, buff=0.3)
        ax = Arrow(ans.get_left() + LEFT * 0.2 + UP * 0.35, ans.get_right() + RIGHT * 0.35 + UP * 0.35, buff=0,
                   color=GREY_B, stroke_width=4)
        lab = self.t("chiffre d'affaires", 38, AMBRE).next_to(ax, UP, buff=1.3)
        q = self.t("?", 90, ORANGE_RETENUE).next_to(lab, DOWN, buff=0.15)
        g = VGroup(lab, q, ax, ans)
        return caser(g, -6.4, -0.3, -1.8, 1.8)

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        fr_ = self.frise()
        self.add(fr_)

        def montrer():
            ic = icone("courbe", 2.4, 1.6).move_to(fr_[1])
            self.play(FadeOut(fr_[1]), FadeIn(ic, scale=0.7), run_time=0.5)

        self.question_pause("05-question", "05b-reponse", ["Le chiffre d'affaires,", "année après année ?"],
                            ["diagramme circulaire", "courbe", "nuage de points"], 1,
                            ["évolution : l'axe du temps", "A : pas de temps ; C : 2 caractères"],
                            x0=self.XL - 0.2, largeur=5.5, ys=(0.95, 0.0, -0.95), geste=montrer)

    # ── 06 : le piège (plusieurs réponses : 184 %) ──────────────────────────

    def graphe_supports(self, **kw):
        opts = dict(pas=10, sous_pas=None, maxi=60, couleurs=[BLEU_B] * 5, nom_axe="% des joueurs",
                    titre="Sur quel support jouez-vous ?", largeur=6.4, hauteur=3.0, fs=26)
        opts.update(kw)
        return caser(Barres(SUPPORTS, SUP_PC, **opts), -6.6, 1.0, -3.2, 3.0)

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.XL = 1.35
        g = self.graphe_supports()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.0)
        self.play(Write(titre), FadeIn(g.fond), run_time=0.5)
        self.au_mot("plusieurs réponses")
        pl = self.col(self.t("plusieurs réponses possibles", 32, AMBRE), 2.25)
        self.play(FadeIn(pl), run_time=0.4)
        vals = []
        for k, mot in enumerate(["Smartphone : 56", "salon : 45", "Ordinateur : 38", "portable : 23", "Tablette : 22"]):
            self.au_mot(mot)
            self.play(g.pousser(indices=[k], run_time=0.4), run_time=0.4)
            self.add(g.barres[k])
            v = texte(f"{SUP_PC[k]} %", 24, NUIT).next_to(g.barres[k], UP, buff=0.06)
            self.play(FadeIn(v, scale=1.3), run_time=0.2)
            vals.append(v)
        self.au_mot("Additionne")
        s = self.col(self.t("56 + 45 + 38 + 23 + 22", 38), 1.35)
        self.play(FadeIn(s, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("184 %")
        eg = self.col(self.ligne([("=", WHITE), ("184 %", ROUGE_ERREUR)], 48), 0.55, xl=self.XL + 0.4)
        self.play(FadeIn(eg, scale=0.7), run_time=0.4)
        self.insister(eg[1], 1.35, 0.25)
        self.au_mot("2,2 supports")
        m = self.col(self.ligne([("2,2", AMBRE), ("supports par joueur", WHITE)], 34), -0.25)
        self.play(FadeIn(m, shift=UP * 0.15), run_time=0.4)
        self.au_mot("pas de camembert")
        ic1 = icone("circulaire", 1.25, 0.95)
        ic2 = icone("barres", 1.25, 0.95)
        fl = self.t("→", 44)
        rang_ = self.col(VGroup(ic1, fl, ic2).arrange(RIGHT, buff=0.3), -1.25)
        self.play(FadeIn(ic1), run_time=0.3)
        self.play(Create(croix(ic1, sw=7)), run_time=0.3)
        self.au_mot("mais des barres")
        self.play(FadeIn(fl), FadeIn(ic2, scale=0.8), run_time=0.4)
        self.play(Circumscribe(ic2, color=VERT_OK), run_time=0.6)
        self.attendre_voix()
        self.XL = 1.0

    # ── 07 : question 2 (un lien) ───────────────────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        m = manette(1.6).move_to(P(-3.6, 1.4))
        deux = VGroup(self.ligne([("temps de jeu", AMBRE), ("(h)", GREY_A)], 32),
                      self.t("et", 30), self.ligne([("score", BLEU_CALCUL), ("(points)", GREY_A)], 32))
        deux.arrange(DOWN, buff=0.15).move_to(P(-3.6, -0.6))
        self.add(m, deux)

        def montrer():
            ic = icone("nuage", 2.2, 1.6).move_to(P(-3.6, -2.3))
            self.play(FadeIn(ic, scale=0.7), run_time=0.5)

        self.question_pause("07-question", "07b-reponse", ["Jouer plus longtemps,", "est-ce mieux scorer ?"],
                            ["nuage de points", "diagramme en barres", "diagramme circulaire"], 0,
                            ["2 nombres par joueur : un point", "B et C ne relient pas 2 nombres"],
                            x0=self.XL - 0.2, largeur=5.5, ys=(0.95, 0.0, -0.95), geste=montrer)

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def rangee(self, y=-2.05):
        ics = VGroup(*[icone(g, 1.8, 1.3) for g in ("circulaire", "barres", "courbe", "nuage")]).arrange(RIGHT, buff=0.35)
        ics.move_to(P(-0.6, y))
        return ics

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.au_mot("À toi de jouer")
        titre = self.t("À toi de jouer", 50, JAUNE_TITRE).move_to(P(0, 2.9))
        ics = self.rangee()
        self.play(Write(titre), FadeIn(ics), run_time=0.6)
        self.au_mot("Un : la part")
        q1 = VGroup(self.ligne([("1.", AMBRE), ("La part de chaque genre de jeu dans les ventes", WHITE)], 34),
                    self.t("(5 genres, qui font 100 %)", 32, GREY_A)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        q1.move_to(P(-0.4, 1.6))
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Deux : les ventes")
        q2 = self.ligne([("2.", AMBRE), ("Les ventes de consoles, mois par mois, en 2024", WHITE)], 34)
        q2.move_to(P(-0.4, 0.3)).align_to(q1, LEFT)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Mets pause")
        pause = VGroup(icone_pause(0.36), self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2)
        pause.move_to(P(-0.6, -0.75))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08b-correction")
        titre = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 2.9))
        ics = self.rangee()
        self.play(Write(titre), FadeIn(ics), run_time=0.5)
        self.au_mot("des parts d'un tout")
        c1 = self.ligne([("1.", AMBRE), ("parts d'un tout, 5 secteurs", WHITE), ("→", WHITE), ("circulaire", VERT_OK)], 36)
        c1.move_to(P(-0.4, 1.6))
        self.play(FadeIn(c1[:2], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("un diagramme circulaire")
        self.play(FadeIn(c1[2:]), Circumscribe(ics[0], color=VERT_OK), ics[0].animate.scale(1.12), run_time=0.7)
        self.au_mot("une évolution")
        c2 = self.ligne([("2.", AMBRE), ("évolution dans le temps", WHITE), ("→", WHITE), ("courbe", VERT_OK)], 36)
        c2.move_to(P(-0.4, 0.4)).align_to(c1, LEFT)
        self.play(FadeIn(c2[:2], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("une courbe")
        self.play(FadeIn(c2[2:]), Circumscribe(ics[2], color=VERT_OK), ics[2].animate.scale(1.12), run_time=0.7)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        cases = self.quatre(w=1.9, h=1.25, fs=26)
        cases.arrange_in_grid(rows=2, cols=2, buff=(0.4, 0.3))
        caser(cases, -6.5, 0.2, -3.3, 2.5)
        self.add(cases)
        lignes = self.finale([("D'abord l'intention,", "ensuite le dessin"), ("Camembert : seulement", "si les parts font 100 %"),
                              ("2 nombres par individu :", "un nuage de points")], [1.75, 0.15, -1.45])
        self.au_mot("D'abord l'intention")
        self.montrer_ligne(lignes[0], LaggedStart(*[Indicate(c[1][0], color=AMBRE) for c in cases], lag_ratio=0.2))
        self.au_mot("Le camembert")
        self.montrer_ligne(lignes[1], Indicate(cases[0][0], color=AMBRE, scale_factor=1.1))
        self.au_mot("Et deux nombres")
        self.montrer_ligne(lignes[2], Indicate(cases[3][0], color=AMBRE, scale_factor=1.1))
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_intentions()
        self.ecran_repartition()
        self.ecran_comparer()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsRepChoisirPremiere(StatsRepChoisirBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"
