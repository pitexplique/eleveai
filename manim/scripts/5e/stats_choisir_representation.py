# stats_choisir_representation.py
# EleveAI — Maths 5e — série « Statistiques » (cycle 4), épisode 06 : CHOISIR
# UNE REPRÉSENTATION ADAPTÉE (micro du coach stat_representation_choisir,
# notion stat_statistique ; banque genChoisirRep : « une évolution dans le
# temps → courbe ; des parts d'un tout → diagramme circulaire ; des effectifs à
# comparer → barres » ; niveau 4 : pourcentage d'un secteur). AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE. Short jumeau : stats_choisir_representation_short.py (jaune).
#
# ⭐ Décor et métier : la MODE ; une CRÉATRICE DE MODE lance sa marque de
# robes (tissus coton, lin et madras). Données VRAISEMBLABLES (une petite
# marque inventée), calculées en Python : ventes de janvier à juin 20, 25, 35,
# 30, 45, 60 ; tissus sur 100 robes : coton 50, lin 25, madras 25 ; tailles
# S 15, M 40, L 30, XL 15 (total 100). Défi : température heure par heure →
# courbe ; lin 25 sur 100 = 25 %.
# ⭐ Figures du coach : `stat_graph` courbe, camembert et barres
# (canvas_stats.Courbe / Camembert / Barres). En haut à droite, le « menu »
# des trois graphiques : celui qu'on choisit s'allume.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Écrans : 00 garde · 01 la créatrice · 02 la courbe · 03 le disque · 04 les
# barres · 05 le piège · 06 défi · 06b correction · 07 ce que tu as appris · 08 fin.
#
# Voix : manim/voix/5e-stats-choisir-representation.json (débit −10) ; calage :
# manim/scripts/5e/stats5_choisir_representation_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/5e/stats_choisir_representation.py StatsChoisirRepresentation5e -o eleveai-maths-5e-stats-choisir-representation --media_dir manim/scripts/5e/media-choisir-representation
# Sortie : manim/sorties/5e/maths/statistiques/06-choisir-representation/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_lire_tableau import personne  # noqa: E402

MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin"]
VENTES = [20, 25, 35, 30, 45, 60]
TISSUS = ["Coton", "Lin", "Madras"]
NB_TISSUS = [50, 25, 25]
TAILLES = ["S", "M", "L", "XL"]
NB_TAILLES = [15, 40, 30, 15]
assert sum(NB_TISSUS) == 100 and sum(NB_TAILLES) == 100 and VENTES[2] - VENTES[3] == 5


def icone(kind, s=0.55, couleur=WHITE):
    """Les trois icônes du menu : barres, disque, courbe."""
    cadre = RoundedRectangle(width=2.2 * s, height=1.8 * s, corner_radius=0.1, stroke_color="#475569", stroke_width=3,
                             fill_color="#0b1220", fill_opacity=1)
    if kind == "barres":
        d = VGroup(*[Rectangle(width=0.3 * s, height=h * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
                     for h in (0.6, 1.2, 0.9)]).arrange(RIGHT, buff=0.12 * s, aligned_edge=DOWN)
    elif kind == "disque":
        d = VGroup(Sector(radius=0.65 * s, start_angle=PI / 2, angle=-PI, fill_color=couleur, fill_opacity=1,
                          stroke_width=0),
                   Sector(radius=0.65 * s, start_angle=-PI / 2, angle=-PI / 2, fill_color=couleur, fill_opacity=0.55,
                          stroke_width=0),
                   Sector(radius=0.65 * s, start_angle=PI, angle=-PI / 2, fill_color=couleur, fill_opacity=0.25,
                          stroke_width=0))
    else:
        d = VMobject(stroke_color=couleur, stroke_width=5).set_points_as_corners(
            [P(-0.7 * s, -0.4 * s), P(-0.25 * s, -0.1 * s), P(0.15 * s, -0.25 * s), P(0.7 * s, 0.5 * s)])
    return VGroup(cadre, d.move_to(cadre))


class StatsChoisirRepresentationBase(Paysage5):
    nom_voix = "5e-stats-choisir-representation"
    fichier_marques = "stats5_choisir_representation_marques.json"
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"
    XL = 0.9
    G = P(-3.4, -0.45)
    KINDS = ["courbe", "disque", "barres"]
    NOMS = ["courbe", "disque", "barres"]

    def menu(self):
        """Les trois icônes, en haut à droite, avec leur nom (non ajouté)."""
        m = VGroup()
        for k, n in zip(self.KINDS, self.NOMS):
            m.add(VGroup(icone(k), self.t(n, 28)).arrange(DOWN, buff=0.1))
        m.arrange(RIGHT, buff=0.35).move_to(P(3.8, 2.75))
        return m

    def choisir(self, menu, k):
        """L'icône k s'allume (bord ambre, agrandie), les autres pâlissent."""
        anims = []
        for j, it in enumerate(menu):
            if j == k:
                anims += [it[0][0].animate.set_stroke(AMBRE, 6), it.animate.scale(1.15), it[1].animate.set_color(AMBRE)]
            else:
                anims.append(it.animate.set_opacity(0.35))
        return anims

    def courbe(self, centre=None):
        return Courbe(MOIS, VENTES, pas=10, maxi=60, nom_axe="Robes", titre="Ventes par mois", largeur=5.0,
                      hauteur=3.6, fs=26, centre=self.G if centre is None else centre)

    def disque(self, centre=None, rayon=1.7):
        return Camembert(TISSUS, NB_TISSUS, rayon=rayon, titre="Tissus de 100 robes", fs=28,
                         centre=self.G if centre is None else centre)

    def barres(self, centre=None):
        return Barres(TAILLES, NB_TAILLES, pas=10, sous_pas=5, maxi=40, nom_axe="Robes", titre="Ventes par taille",
                      largeur=4.4, hauteur=3.6, fs=28, centre=self.G if centre is None else centre)

    def tracer_courbe(self, cb, idx):
        """Les points apparaissent un à un AU MOT (index des nombres), la ligne
        se trace de point en point."""
        segs = VGroup()
        for i, k in enumerate(idx):
            self.au_pos(k)
            anims = [FadeIn(cb.ronds[i], scale=0.3)]
            if i:
                s = Line(cb.ronds[i - 1].get_center(), cb.ronds[i].get_center(), stroke_color=cb.couleur, stroke_width=6)
                segs.add(s)
                anims.append(Create(s))
            self.play(*anims, run_time=0.25)
            self.bring_to_front(*cb.ronds[:i + 1])
        return segs

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Choisir le bon graphique", self.identite, self.ceinture)
        self.add(titre, ident, ech)
        ics = VGroup(icone("barres", 0.9), icone("disque", 0.9), icone("courbe", 0.9)).arrange(RIGHT, buff=0.6)
        ics.move_to(P(-0.6, 0.2))
        for k, mot in enumerate(["Barres", "disque", "courbe"]):
            self.au_mot(mot)
            self.play(FadeIn(ics[k], scale=0.6), run_time=0.3)
        self.au_mot("quel graphique choisir")
        q = self.t("?", 90, ORANGE_RETENUE).next_to(ics, RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la créatrice ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Une créatrice de mode")
        pers = personne(peau="#8d5524", haut="#db2777", cheveux="#111827", r=0.5).move_to(P(-4.0, 0.0))
        met = self.metier("Créatrice de mode", fs=42).next_to(pers, UP, buff=0.45)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(met, scale=0.8), run_time=0.6)
        self.au_mot("sa marque de robes")
        robes = VGroup()
        for c in ("#93c5fd", "#fcd34d", "#f472b6"):
            r = VGroup(Polygon(P(-0.25, 0.6), P(0.25, 0.6), P(0.6, -0.7), P(-0.6, -0.7), fill_color=c, fill_opacity=1,
                               stroke_width=0),
                       Line(P(-0.15, 0.6), P(-0.2, 0.85), stroke_color=c, stroke_width=5),
                       Line(P(0.15, 0.6), P(0.2, 0.85), stroke_color=c, stroke_width=5))
            robes.add(r)
        robes.arrange(RIGHT, buff=0.5).move_to(P(-0.6, 0.3))
        self.play(LaggedStart(*[FadeIn(r, shift=DOWN * 0.3) for r in robes], lag_ratio=0.25), run_time=0.8)
        self.au_mot("trois questions")
        qs = VGroup(*[self.t("?", 60, ORANGE_RETENUE) for _ in range(3)]).arrange(RIGHT, buff=0.9).move_to(P(-0.6, -1.4))
        self.play(LaggedStart(*[FadeIn(q, scale=0.4) for q in qs], lag_ratio=0.25), run_time=0.7)
        self.au_mot("le bon graphique")
        m = self.menu().scale(1.15).move_to(P(4.3, 0.3))
        self.play(FadeIn(m, shift=LEFT * 0.3), run_time=0.6)
        self.attendre_voix()

    # ── 02 : la courbe ──────────────────────────────────────────────────────

    def ecran_courbe(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-courbe")
        m = self.menu()
        self.add(m)
        cb = self.courbe()
        self.au_mot("Première question")
        self.play(FadeIn(cb.fond, scale=0.95), run_time=0.4)
        q = self.col(self.bloc(["Mes ventes augmentent,", "mois après mois ?"], 38), 1.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("une évolution dans le temps")
        e = self.col(self.t("une évolution dans le temps", 36, JAUNE_TITRE), 0.35)
        self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("je choisis une courbe")
        c = self.col(self.ligne([("donc", WHITE), ("une courbe", AMBRE)], 44), -0.45)
        self.play(*self.choisir(m, 0), FadeIn(c, scale=0.8), run_time=0.6)
        self.tracer_courbe(cb, self.positions("à juin :", 6))
        self.au_mot("La courbe monte")
        fl = Arrow(cb.ronds[0].get_center() + DOWN * 0.3, cb.ronds[5].get_center() + DOWN * 0.3, buff=0.1,
                   color=VERT_OK, stroke_width=6)
        mt = self.col(self.t("La courbe monte !", 42, VERT_OK), -1.4)
        self.play(GrowArrow(fl), FadeIn(mt, shift=UP * 0.2), run_time=0.6)
        self.attendre_voix()

    # ── 03 : le disque ──────────────────────────────────────────────────────

    def ecran_disque(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-disque")
        m = self.menu()
        self.add(m)
        cam = self.disque()
        self.au_mot("Deuxième question")
        self.play(FadeIn(cam.fond, scale=0.95), run_time=0.4)
        q = self.col(self.bloc(["La part de chaque tissu", "dans mes 100 robes ?"], 38), 1.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("les parts d'un tout")
        e = self.col(self.t("les parts d'un tout", 38, JAUNE_TITRE), 0.35)
        self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("je choisis un diagramme circulaire")
        c = self.col(self.ligne([("donc", WHITE), ("un disque", AMBRE)], 44), -0.45)
        self.play(*self.choisir(m, 1), FadeIn(c, scale=0.8), run_time=0.6)
        lignes = VGroup()
        for i, (m1, m2, y, frac) in enumerate([("Coton : 50", "la moitié", -1.25, "la moitié"),
                                                ("Lin : 25", "un quart. Madras", -1.85, "un quart"),
                                                ("Madras : 25", "un quart.", -2.45, "un quart")]):
            self.au_mot(m1)
            self.play(GrowFromPoint(cam.parts[i], cam.centre), FadeIn(cam.textes[i]), run_time=0.45)
            lg = self.col(self.ligne([(TISSUS[i] + " :", WHITE), (str(NB_TISSUS[i]), BLEU_CALCUL),
                                      (frac, VERT_OK)], 34), y)
            lg[2].set_opacity(0)
            self.play(FadeIn(lg[:2]), run_time=0.25)
            self.au_mot(m2) if i < 2 else self.au_pos(self._texte_voix.rfind("un quart"))
            anims = [lg[2].animate.set_opacity(1)]
            if i == 0:
                anims.append(Create(cam.moitie()))
            self.play(*anims, cam.sortir(i, 0.15), run_time=0.4)
            self.play(cam.rentrer(i, 0.15), run_time=0.25)
            lignes.add(lg)
        self.attendre_voix()

    # ── 04 : les barres ─────────────────────────────────────────────────────

    def ecran_barres(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-barres")
        m = self.menu()
        self.add(m)
        g = self.barres()
        self.au_mot("Troisième question")
        self.play(FadeIn(g.fond, scale=0.95), run_time=0.4)
        q = self.col(self.bloc(["Quelle taille", "se vend le plus ?"], 38), 1.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Je compare des catégories")
        e = self.col(self.t("comparer des catégories", 38, JAUNE_TITRE), 0.35)
        self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("je choisis un diagramme en barres")
        c = self.col(self.ligne([("donc", WHITE), ("des barres", AMBRE)], 44), -0.45)
        self.play(*self.choisir(m, 2), FadeIn(c, scale=0.8), run_time=0.6)
        for i, mot in enumerate(["S : 15", "M : 40", "L : 30", "XL : 15"]):
            self.au_mot(mot)
            v = g.valeur(i, fs=28)
            self.play(g.pousser(i, run_time=0.35), run_time=0.35)
            self.play(FadeIn(v, scale=1.5), run_time=0.2)
        self.au_mot("La taille M gagne")
        gg = self.col(self.t("La taille M gagne !", 42, VERT_OK), -1.4)
        self.play(g.focus(1, 0.4), FadeIn(gg, shift=UP * 0.2), run_time=0.5)
        self.insister(g.barres[1], 1.08, 0.3)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.4)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("un disque pour une évolution")
        faux = Camembert(MOIS, VENTES, rayon=1.6, fs=24, titre="Ventes par mois ?", centre=P(-3.4, -0.2))
        self.play(FadeIn(faux.fond), faux.apparaitre(run_time=1.0), run_time=1.0)
        self.au_mot("Les mois ne sont pas")
        x = croix(faux.parts, sw=8)
        e = self.col(self.bloc(["Les mois ne sont pas", "les parts d'un tout !"], 38, ORANGE_RETENUE), 1.35)
        self.play(Create(x), FadeIn(e, shift=RIGHT * 0.2), run_time=0.5)
        regles = [("courbe", "Évolution", "courbe"), ("disque", "Parts d'un tout", "disque"),
                  ("barres", "Comparer", "barres")]
        mots = ["Une évolution", "Des parts d'un tout", "Comparer"]
        ys = [0.1, -0.95, -2.0]
        for (k, a, b), mot, y in zip(regles, mots, ys):
            self.au_mot(mot)
            lg = VGroup(icone(k, 0.45, AMBRE), self.ligne([(a + " :", WHITE), (b, AMBRE)], 38)).arrange(RIGHT, buff=0.3)
            self.col(lg, y)
            if mot == "Une évolution":
                self.play(FadeOut(VGroup(faux, x)), run_time=0.3)
                cb = self.courbe(P(-3.4, -0.4))
                self.play(FadeIn(cb.fond), cb.tracer(run_time=1.0), FadeIn(lg, shift=RIGHT * 0.2), run_time=1.0)
            else:
                self.play(FadeIn(lg, shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        cam = self.disque()
        self.add(cam)
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 48, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("la température de l'atelier")
        th = VGroup(RoundedRectangle(width=0.22, height=1.0, corner_radius=0.11, stroke_color=WHITE, stroke_width=3),
                    Circle(radius=0.2, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_color=WHITE, stroke_width=3))
        th[1].next_to(th[0], DOWN, buff=-0.08)
        q1 = self.bloc(["1. Température,", "heure par heure :", "quel graphique ?"], 38)
        self.col(VGroup(th, q1).arrange(RIGHT, buff=0.3), 1.2)
        self.play(FadeIn(VGroup(th, q1), shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("quel pourcentage représente le lin")
        q2 = self.col(self.bloc(["2. Le lin :", "quel pourcentage ?"], 38), -0.4)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), cam.focus(1, 0.4), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE), -1.6)
        self.play(Write(pause), cam.rallumer(), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06b-correction")
        cam = self.disque()
        self.add(cam)
        titre = self.col(self.t("Correction", 48, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("La température évolue")
        r1 = self.col(VGroup(icone("courbe", 0.45, AMBRE), self.bloc(["évolue dans le temps :", "une courbe"], 36)).arrange(
            RIGHT, buff=0.3), 1.35)
        self.play(FadeIn(r1[0], scale=0.6), FadeIn(r1[1][0], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("une courbe. Le lin")
        r1[1][1].set_color(AMBRE)
        self.play(FadeIn(r1[1][1], scale=1.2), run_time=0.35)
        self.au_mot("Le lin : 25 robes")
        c = self.ligne([("25", BLEU_CALCUL), ("sur", WHITE), ("100", WHITE), ("=", WHITE), ("25 %", VERT_OK)], 46, 0.2)
        self.col(c, 0.0)
        self.play(FadeIn(c[:3], scale=1.3), cam.focus(1, 0.4), run_time=0.4)
        self.au_mot("soit 25 %")
        self.play(FadeIn(c[3:], scale=1.4), run_time=0.4)
        self.au_mot("un quart du disque")
        qd = self.col(self.t("un quart du disque", 38, VERT_OK), -0.8)
        self.play(FadeIn(qd, shift=UP * 0.2), Create(cam.quarts()), run_time=0.6)
        self.play(Create(self.encadrer(VGroup(c, qd))), run_time=0.35)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.3)), run_time=0.6)
        cb = self.courbe(P(-4.55, 0.85)).scale(0.66)
        cam = self.disque(P(0.0, 0.85), 1.7).scale(0.66)
        g = self.barres(P(4.5, 0.85)).scale(0.66)
        lab = [("Évolution", "dans le temps"), ("Parts", "d'un tout"), ("Catégories", "à comparer")]
        figs = [cb, cam, g]
        for k, (mot, f, (a, b)) in enumerate(zip(["Une évolution", "Des parts d'un tout", "Des catégories"], figs, lab)):
            self.au_mot(mot)
            t = VGroup(self.coche(), self.bloc([a, b], 34)).arrange(RIGHT, buff=0.25).next_to(f, DOWN, buff=0.35)
            self.play(FadeIn(f, scale=0.9), FadeIn(t[1], shift=UP * 0.2), Create(t[0]), run_time=0.6)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_courbe()
        self.ecran_disque()
        self.ecran_barres()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")


class StatsChoisirRepresentation5e(StatsChoisirRepresentationBase):
    identite = "Maths 5e — EleveAI"
