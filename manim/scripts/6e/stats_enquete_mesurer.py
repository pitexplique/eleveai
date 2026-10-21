# stats_enquete_mesurer.py
# EleveAI — Maths 6e — série « Statistiques », épisode 05 : MESURER ET NOTER
# SES MESURES (micro du coach : stat_enquete_mesurer — consigner des mesures
# dans un tableau, l'unité une seule fois dans l'en-tête, une même unité par
# ligne), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE : ranger des mesures et
# convertir des millimètres en centimètres avant de comparer ; un cran
# au-dessus du « je vois ». Short jumeau : stats_enquete_mesurer_short.py (blanche).
#
# ⭐ Décor et métier : la PHYSIQUE, au laboratoire ; un TECHNICIEN DE
# LABORATOIRE chauffe de l'eau et relève sa température toutes les 2 minutes.
# Données : 0, 2, 4, 6, 8 min → 20, 35, 50, 65, 80 °C (+15 °C toutes les
# 2 min) ; piège : 120 (secondes) au lieu de 2 ; défi : un ressort s'allonge de
# 3 cm puis de 45 mm = 4,5 cm.
# ⭐ Le tableau est CELUI DU COACH (`tableau_donnees`, manim/canvas_stats.py) :
# l'en-tête sombre porte le temps, la ligne bleu clair la température ; les
# unités sont dans les libellés, une seule fois.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
# ⚠️ Voix corrigée (21/10) : « Au départ : 20 degrés. » → « Au départ, à 0
# minute : 20 degrés. » (le tableau écrit 0 dans la case du départ ; un
# nombre écrit doit être dit). 02-mesures régénéré (generer-voix.ps1, −10).
#
# Écrans : 00 garde · 01 le technicien, l'eau qui chauffe · 02 les mesures
# (le thermomètre monte) · 03 le tableau, l'unité dans l'en-tête · 04 lire :
# +15 °C toutes les 2 min · 05 le piège (120 secondes dans la ligne des
# minutes) · 06 défi (le ressort) · 06b correction (45 mm = 4,5 cm > 3 cm) ·
# 07 ce que tu as appris · 08 fin (règle du 19/10).
#
# Voix : manim/voix/6e-stats-enquete-mesurer.json (débit −10), WAV dans
# public/sons/6e-stats-enquete-mesurer/ ; calage mot à mot :
# manim/scripts/6e/stats_enquete_mesurer_marques.json (marques.ps1 + conv.py, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/6e/stats_enquete_mesurer.py StatsEnqueteMesurer6e -o eleveai-maths-6e-stats-enquete-mesurer --media_dir manim/scripts/6e/media-enquete-mesurer
# Sortie : manim/sorties/6e/maths/statistiques/05-enquete-mesurer/eleveai-maths-6e-stats-enquete-mesurer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats6_lotc_commun import *  # noqa: E402,F403
from canvas_stats import AMBRE, NUIT, Tableau, texte  # noqa: E402

TEMPS = [0, 2, 4, 6, 8]
TEMP = [20, 35, 50, 65, 80]
ROUGE_T = "#ef4444"


# ── les dessins du laboratoire ──────────────────────────────────────────────

class Thermometre(VGroup):
    """Un thermomètre de 0 à 100 °C ; la colonne rouge suit self.niveau(v)."""

    def __init__(self, h=4.0, **kw):
        super().__init__(**kw)
        self.h = h
        tube = RoundedRectangle(width=0.36, height=h, corner_radius=0.18, fill_color=WHITE, fill_opacity=1,
                                stroke_color="#94a3b8", stroke_width=3)
        bulbe = Circle(radius=0.32, fill_color=ROUGE_T, fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
        bulbe.move_to(tube.get_bottom())
        self.y0 = tube.get_bottom()[1] + 0.3
        self.y100 = tube.get_top()[1] - 0.25
        grad = VGroup()
        for v in range(0, 101, 10):
            y = self.y_de(v)
            grad.add(Line(P(0.18, y), P(0.18 + (0.22 if v % 50 == 0 else 0.12), y), color=WHITE, stroke_width=3))
        self.colonne = Rectangle(width=0.16, height=0.01, fill_color=ROUGE_T, fill_opacity=1, stroke_width=0)
        self.colonne.move_to(P(0, self.y0), aligned_edge=DOWN)
        self.add(tube, grad, self.colonne, bulbe)
        self.ref = Line(P(0, self.y0), P(0, self.y100), stroke_width=0)
        self.add(self.ref)

    def y_de(self, v):
        return self.y0 + (self.y100 - self.y0) * v / 100

    def niveau(self, v):
        """Animation : la colonne monte jusqu'à v °C."""
        a, b = self.ref.get_start(), self.ref.get_end()
        haut = a + (b - a) * v / 100
        cible = Rectangle(width=self.colonne.width, height=max(0.01, haut[1] - a[1]), fill_color=ROUGE_T,
                          fill_opacity=1, stroke_width=0).move_to(a, aligned_edge=DOWN)
        return Transform(self.colonne, cible)

    def point(self, v):
        a, b = self.ref.get_start(), self.ref.get_end()
        return a + (b - a) * v / 100


def becher(larg=1.6, h=1.8):
    verre = VMobject(stroke_color="#cbd5e1", stroke_width=5).set_points_as_corners(
        [P(-larg / 2, h / 2), P(-larg / 2, -h / 2), P(larg / 2, -h / 2), P(larg / 2, h / 2)])
    eau = Rectangle(width=larg - 0.08, height=h * 0.62, fill_color="#60a5fa", fill_opacity=0.75,
                    stroke_width=0).move_to(P(0, -h / 2 + h * 0.31 + 0.03))
    return VGroup(eau, verre)


def flamme(s=0.5):
    ext = Ellipse(width=0.7, height=1.2, fill_color="#f97316", fill_opacity=1, stroke_width=0)
    inte = Ellipse(width=0.35, height=0.65, fill_color="#3b82f6", fill_opacity=1, stroke_width=0).shift(DOWN * 0.22)
    return VGroup(ext, inte).scale(s)


def chrono(r=0.55):
    cadran = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#64748b", stroke_width=5)
    bouton = Rectangle(width=0.2, height=0.16, fill_color="#64748b", fill_opacity=1, stroke_width=0)
    bouton.next_to(cadran, UP, buff=0)
    aiguille = Line(ORIGIN, P(0, r * 0.8), color=ROUGE_T, stroke_width=5)
    reperes = VGroup(*[Line(P(0, r * 0.82), P(0, r * 0.95), color=NUIT, stroke_width=3).rotate(
        k * TAU / 12, about_point=ORIGIN) for k in range(12)])
    return VGroup(cadran, reperes, bouton, aiguille)


def ressort(longueur, spires=9, larg=0.5):
    """Un ressort horizontal accroché à un mur, de longueur donnée (unités Manim)."""
    pts = [P(0, 0), P(0.2, 0)]
    pas = (longueur - 0.4) / spires
    for k in range(spires):
        pts += [P(0.2 + pas * (k + 0.25), larg / 2), P(0.2 + pas * (k + 0.75), -larg / 2)]
    pts += [P(longueur - 0.2, 0), P(longueur, 0)]
    z = VMobject(stroke_color="#cbd5e1", stroke_width=5).set_points_as_corners(pts)
    poids = Square(0.4, fill_color="#64748b", fill_opacity=1, stroke_width=0).move_to(P(longueur + 0.2, 0))
    return VGroup(z, poids)


class StatsEnqueteMesurerBase(MotsCales6, OutilsPaysage, Notion6e):
    nom_voix = "6e-stats-enquete-mesurer"
    fichier_marques = "stats_enquete_mesurer_marques.json"
    identite = "Maths 6e — EleveAI"
    T = P(-0.55, 0.9)  # le centre du tableau (large : il prend toute la largeur)

    def tableau(self, plein=True, centre=None):
        """Le tableau du coach (non ajouté) : l'en-tête sombre = le temps,
        la ligne = la température ; les unités dans les libellés."""
        tab = Tableau([t if plein else None for t in TEMPS], [[v if plein else None for v in TEMP]],
                      libelles=["Température (°C)"], coin="Temps (min)", largeur_case=1.5, largeur_libelle=3.9,
                      hauteur=1.1, fs=38)
        return tab.move_to(self.T if centre is None else centre)

    def tableau_pret(self):
        tab = self.tableau()
        self.add(tab)
        return tab

    def ecrire_tete(self, tab, c, v, color=WHITE):
        """Écrit v dans la case d'en-tête c (non ajouté au tableau : renvoie le texte)."""
        t = texte(v, tab.fs, color)
        return t.move_to(tab.tetes[c][0])

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Mesurer, puis noter", self.identite, "jaune")
        th = Thermometre(2.6).move_to(P(-2.4, 0.15))
        feuille = RoundedRectangle(width=2.6, height=2.6, corner_radius=0.1, fill_color=WHITE, fill_opacity=1,
                                   stroke_color="#94a3b8", stroke_width=3).move_to(P(0.9, 0.15))
        lignes = VGroup(*[Line(P(-1.0, 0), P(1.0, 0), color="#93c5fd", stroke_width=3) for _ in range(5)])
        lignes.arrange(DOWN, buff=0.38).move_to(feuille)
        crayon = VGroup(Rectangle(width=1.4, height=0.22, fill_color="#facc15", fill_opacity=1, stroke_width=0),
                        Triangle(fill_color="#f5d0a9", fill_opacity=1, stroke_width=0).rotate(-PI / 2).scale(0.13)
                        ).arrange(RIGHT, buff=0).rotate(-0.6).move_to(feuille.get_corner(DR) + P(0.2, 0.3))
        self.au_mot("Mesurer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(th, shift=UP * 0.2),
                  run_time=0.6)
        self.play(th.niveau(60), run_time=0.8)
        self.au_mot("Bien noter")
        self.play(FadeIn(feuille, scale=0.9), FadeIn(crayon, shift=LEFT * 0.3), run_time=0.5)
        self.au_mot("tout un art")
        self.play(LaggedStart(*[Create(l) for l in lignes], lag_ratio=0.2), run_time=0.9)
        self.attendre_voix(marge=0.8)

    # ── 01 : le technicien de laboratoire ───────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        b = becher().move_to(P(-3.6, 0.3))
        support = Rectangle(width=2.0, height=0.12, fill_color="#64748b", fill_opacity=1, stroke_width=0)
        support.next_to(b, DOWN, buff=0.05)
        pieds = VGroup(*[Line(support.get_corner(DL) + RIGHT * k, support.get_corner(DL) + RIGHT * k + DOWN * 1.1,
                              color="#64748b", stroke_width=6) for k in (0.1, 1.9)])
        f = flamme(0.7).next_to(support, DOWN, buff=0.15)
        self.au_mot("Un technicien")
        metier = self.t("Technicien de laboratoire", 44, BLEU_CALCUL).move_to(P(1.6, 2.7))
        self.play(FadeIn(VGroup(b, support, pieds), shift=UP * 0.3), Write(metier), run_time=0.8)
        self.au_mot("chauffe de l'eau")
        bulles = VGroup(*[Circle(radius=0.06, stroke_color=WHITE, stroke_width=2).move_to(b[0].get_bottom() +
                                                                                       P(dx, 0.2)) for dx in (-0.4, 0, 0.35)])
        self.play(FadeIn(f, scale=0.3), run_time=0.4)
        self.play(*[bl.animate.shift(UP * 0.8).set_opacity(0) for bl in bulles], run_time=0.9)
        self.au_mot("Toutes les 2 minutes")
        c = chrono(0.7).move_to(P(0.4, 0.9))
        t2 = self.ligne([("toutes les", WHITE), ("2 min", AMBRE)], 42).next_to(c, RIGHT, buff=0.4)
        self.play(FadeIn(c, scale=0.6), FadeIn(t2, shift=RIGHT * 0.2), run_time=0.5)
        self.play(Rotate(c[3], -TAU / 2, about_point=c[0].get_center()), run_time=0.8)
        self.au_mot("il mesure sa température")
        th = Thermometre(2.6).move_to(b.get_center() + P(0.3, 0.75))
        self.play(FadeIn(th, shift=DOWN * 0.5), run_time=0.5)
        self.play(th.niveau(20), run_time=0.5)
        self.au_mot("avec un thermomètre")
        lt = self.t("un thermomètre", 40, ROUGE_T).move_to(P(1.6, -0.9))
        fl = Arrow(lt.get_left(), th.get_right() + RIGHT * 0.1, buff=0.15, color=ROUGE_T, stroke_width=6)
        self.play(FadeIn(lt, shift=LEFT * 0.2), GrowArrow(fl), run_time=0.5)
        self.attendre_voix()

    # ── 02 : les mesures ────────────────────────────────────────────────────

    def ecran_mesures(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-mesures")
        th = Thermometre(5.4).move_to(P(-5.2, 0.0))
        c = chrono(0.6).move_to(P(-3.4, 2.5))
        self.add(th, c)
        mots = [("à 0 minute", "20 degrés"), ("Après 2 minutes", "35"), ("Après 4 minutes", "50"),
                ("Après 6 minutes", "65"), ("Après 8 minutes", "80")]
        notes = VGroup()
        for k, ((m1, m2), t, v) in enumerate(zip(mots, TEMPS, TEMP)):
            y = 2.4 - k * 1.1
            a = self.t(f"{t} min", 48, AMBRE).move_to(P(0.6, y), aligned_edge=RIGHT)
            dp = self.t(":", 48).next_to(a, RIGHT, buff=0.25)
            b = self.t(f"{v} °C", 48, WHITE).next_to(dp, RIGHT, buff=0.3)
            self.au_mot(m1)
            anims = [FadeIn(a, shift=RIGHT * 0.2), FadeIn(dp)]
            if k > 0:
                anims.append(Rotate(c[3], -PI / 2, about_point=c[0].get_center()))
            self.play(*anims, run_time=0.4)
            self.au_mot(m2)
            repere = DashedLine(th.point(v) + RIGHT * 0.25, P(a.get_left()[0] - 0.1, th.point(v)[1]),
                                color=ROUGE_T, stroke_width=3, dash_length=0.1)
            self.play(th.niveau(v), FadeIn(b, scale=1.4), run_time=0.45)
            self.play(Create(repere), run_time=0.25)
            self.play(FadeOut(repere), run_time=0.2)
            notes.add(VGroup(a, dp, b))
        self.attendre_voix()

    # ── 03 : le tableau, l'unité dans l'en-tête ─────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-tableau")
        tab = self.tableau()
        self.au_mot("Il range tout")
        self.play(FadeIn(tab, shift=UP * 0.3), run_time=0.6)
        self.au_mot("le temps")
        self.play(Circumscribe(VGroup(tab.coin, tab.tetes), color=AMBRE), run_time=0.6)
        self.au_mot("et la température")
        self.play(Circumscribe(VGroup(tab.libelles, *tab.cases[0]), color=ROUGE_T), run_time=0.6)
        self.au_mot("L'unité s'écrit une seule fois")
        e = self.t("L'unité : une seule fois", 42, VERT_OK).move_to(P(-0.4, -1.0))
        # les unités recopiées dans chaque case : c'est ce qu'on NE fait PAS
        fantomes = VGroup(*[self.t("°C", 26, "#94a3b8").next_to(tab.case(0, j), DOWN, buff=0.08)
                            for j in range(5)])
        self.play(FadeIn(e, shift=UP * 0.2), FadeIn(fantomes), run_time=0.5)
        xs = VGroup(*[croix(f, sw=4) for f in fantomes])
        self.play(Create(xs), run_time=0.4)
        self.au_mot("dans l'en-tête")
        self.play(FadeOut(VGroup(fantomes, xs)), run_time=0.3)
        self.au_mot("en minutes")
        m1 = self.t("en minutes", 40, AMBRE).move_to(P(-4.6, -2.1))
        c1 = SurroundingRectangle(tab.coin, color=AMBRE, buff=0.04, stroke_width=7)
        self.play(Create(c1), FadeIn(m1, shift=UP * 0.2), run_time=0.45)
        self.au_mot("en degrés Celsius")
        m2 = self.t("en degrés Celsius", 40, ROUGE_T).move_to(P(0.6, -2.1))
        c2 = SurroundingRectangle(tab.libelles[0], color=ROUGE_T, buff=0.04, stroke_width=7)
        self.play(Create(c2), FadeIn(m2, shift=UP * 0.2), run_time=0.45)
        self.insister(VGroup(tab.coin, tab.libelles), 1.1, 0.3)
        self.attendre_voix()

    # ── 04 : lire le tableau ────────────────────────────────────────────────

    def saut(self, a, b, etiquette, couleur, haut=True):
        """Un petit arc d'une case à la suivante (au-dessus ou au-dessous), avec son étiquette."""
        d = UP if haut else DOWN
        p0 = (a.get_top() if haut else a.get_bottom()) + d * 0.05
        p1 = (b.get_top() if haut else b.get_bottom()) + d * 0.05
        arc = ArcBetweenPoints(p0, p1, angle=-PI / 2 if haut else PI / 2, color=couleur, stroke_width=5)
        arc.add_tip(tip_length=0.16)
        e = self.t(etiquette, 32, couleur).next_to(arc, d, buff=0.05)
        return VGroup(arc, e)

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-lire")
        tab = self.tableau_pret()
        self.au_mot("Grâce au tableau")
        self.play(Circumscribe(tab, color=WHITE), run_time=0.7)
        self.au_mot("la température monte")
        fl = Arrow(P(0, -0.4), P(0, 0.4), buff=0, color=ROUGE_T, stroke_width=9)
        e1 = VGroup(fl, self.t("la température monte", 42, ROUGE_T)).arrange(RIGHT, buff=0.3).move_to(P(-0.4, -1.75))
        self.play(FadeIn(e1, shift=UP * 0.2), run_time=0.5)
        self.au_mot("de 15 degrés")
        bas = VGroup(*[self.saut(tab.case(0, j), tab.case(0, j + 1), "+15", ROUGE_T, haut=False) for j in range(4)])
        e2 = self.ligne([("+15 °C", ROUGE_T)], 46).move_to(P(-3.2, -2.75))
        self.play(LaggedStart(*[Create(s) for s in bas], lag_ratio=0.25), FadeIn(e2, scale=0.6), run_time=1.0)
        self.au_mot("toutes les 2 minutes")
        hautg = VGroup(*[self.saut(tab.tetes[j], tab.tetes[j + 1], "+2", AMBRE) for j in range(4)])
        e3 = self.ligne([("toutes les", WHITE), ("2 min", AMBRE)], 46).next_to(e2, RIGHT, buff=0.4)
        self.play(LaggedStart(*[Create(s) for s in hautg], lag_ratio=0.25), FadeIn(e3, scale=0.6), run_time=1.0)
        self.insister(VGroup(e2, e3), 1.12, 0.3)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        tab = self.tableau(centre=P(-0.55, -0.15))
        self.add(tab)
        self.au_mot("Le piège")
        titre = self.t("Le piège : changer d'unité en route", 44, ROUGE_ERREUR).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.8)
        self.au_mot("Si on note 120")
        vieux = tab.tetes[1][1]
        neuf = self.ecrire_tete(tab, 1, 120, "#fca5a5")
        self.play(vieux.animate.set_opacity(0), FadeIn(neuf, scale=1.6), run_time=0.4)
        self.au_mot("en secondes")
        sec = self.t("120 secondes ?", 40, ROUGE_ERREUR).move_to(P(tab.tetes[1].get_center()[0] + 1.2, 2.3))
        fl = Arrow(sec.get_bottom(), tab.tetes[1].get_top(), buff=0.1, color=ROUGE_ERREUR, stroke_width=6)
        self.play(FadeIn(sec, shift=UP * 0.2), GrowArrow(fl), Indicate(tab.coin, color=AMBRE), run_time=0.5)
        self.au_mot("le tableau devient faux")
        x = croix(tab.tetes[1], sw=7)
        faux = self.t("faux !", 44, ROUGE_ERREUR).next_to(sec, RIGHT, buff=0.5)
        self.play(Create(x), FadeIn(faux, scale=1.4), run_time=0.45)
        self.au_mot("Une même ligne")
        self.play(FadeOut(VGroup(x, neuf, sec, fl, faux)), vieux.animate.set_opacity(1), run_time=0.4)
        regle = self.t("Une même ligne, une même unité", 46, VERT_OK).move_to(P(-0.4, -2.3))
        self.play(FadeIn(regle, shift=UP * 0.2), Circumscribe(VGroup(tab.coin, tab.tetes), color=VERT_OK),
                  run_time=0.7)
        self.insister(regle, 1.1, 0.3)
        self.attendre_voix()

    # ── 06 : défi (le ressort) ──────────────────────────────────────────────

    def ressorts(self):
        """Le mur, deux ressorts au repos (3 unités) et leurs allongements
        (1 cm = 0,7 unité : 3 cm → 2,1 ; 4,5 cm → 3,15)."""
        mur = Rectangle(width=0.25, height=3.4, fill_color="#64748b", fill_opacity=1, stroke_width=0)
        mur.move_to(P(-6.3, -0.15))
        x0 = mur.get_right()[0]
        r1 = ressort(3.0).move_to(P(x0, 0.7), aligned_edge=LEFT)
        r2 = ressort(3.0).move_to(P(x0, -1.0), aligned_edge=LEFT)
        r1b = ressort(3.0 + 2.1, spires=11).move_to(P(x0, 0.7), aligned_edge=LEFT)
        r2b = ressort(3.0 + 3.15, spires=13).move_to(P(x0, -1.0), aligned_edge=LEFT)
        return mur, r1, r2, r1b, r2b

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        mur, r1, r2, r1b, r2b = self.ressorts()
        self.au_mot("À toi de jouer")
        titre = self.t("À toi de jouer", 50, JAUNE_TITRE).to_edge(UP, buff=0.35)
        self.play(Write(titre), FadeIn(VGroup(mur, r1, r2)), run_time=0.6)
        self.au_mot("de 3 centimètres")
        a1 = self.t("+ 3 cm", 46, AMBRE).next_to(r1b, RIGHT, buff=0.35)
        self.play(Transform(r1, r1b), FadeIn(a1, shift=RIGHT * 0.3), run_time=0.7)
        self.au_mot("de 45 millimètres")
        a2 = self.t("+ 45 mm", 46, BLEU_CALCUL).next_to(r2b, RIGHT, buff=0.35)
        self.play(Transform(r2, r2b), FadeIn(a2, shift=RIGHT * 0.3), run_time=0.7)
        self.au_mot("Quel allongement")
        q = self.t("Quel allongement est le plus grand ?", 40).move_to(P(0, 2.35))
        self.play(FadeIn(q, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(-0.6, -2.5))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06b-correction")
        mur, r1, r2, r1b, r2b = self.ressorts()
        a1 = self.t("+ 3 cm", 46, AMBRE).next_to(r1b, RIGHT, buff=0.35)
        a2 = self.t("+ 45 mm", 46, BLEU_CALCUL).next_to(r2b, RIGHT, buff=0.35)
        self.add(mur, r1b, r2b, a1, a2)
        titre = self.t("Correction", 50, JAUNE_TITRE).to_edge(UP, buff=0.35)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("45 millimètres, c'est")
        conv = self.ligne([("45 mm", BLEU_CALCUL), ("=", WHITE)], 48)
        cm = self.t("4,5 cm", 48, VERT_OK).next_to(conv, RIGHT, buff=0.25)
        VGroup(conv, cm).move_to(P(0, 2.3))
        self.play(FadeIn(conv, shift=RIGHT * 0.2), Indicate(a2, color=BLUE_C), run_time=0.5)
        self.au_mot("4,5 centimètres")
        a2b = self.t("+ 4,5 cm", 46, VERT_OK).move_to(a2, aligned_edge=LEFT)
        self.play(FadeIn(cm, scale=1.5), Transform(a2, a2b), run_time=0.45)
        self.au_mot("Et 4,5 est plus grand que 3")
        comp = self.ligne([("4,5", VERT_OK), (">", WHITE), ("3", AMBRE)], 60, 0.3).move_to(P(4.6, 0.7))
        self.play(FadeIn(comp, scale=0.6), run_time=0.45)
        self.au_mot("le deuxième allongement")
        ok = self.coche(VERT_OK, 0.3).next_to(a2, RIGHT, buff=0.3)
        self.play(Create(ok), Indicate(r2b, color=VERT_OK, scale_factor=1.05), run_time=0.5)
        self.au_mot("Avant de comparer")
        regle = self.t("Avant de comparer : la même unité !", 40, VERT_OK).move_to(P(-0.6, -2.5))
        self.play(FadeIn(regle, shift=UP * 0.2), run_time=0.5)
        self.insister(regle, 1.08, 0.3)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.3)), run_time=0.7)
        tab = self.tableau(centre=P(-0.55, 1.4))
        self.add(tab)
        textes = ["Je mesure toujours de la même façon.", "Je note dans un tableau, l'unité dans l'en-tête.",
                  "Je compare dans la même unité."]
        lignes = VGroup()
        for s, y in zip(textes, [-0.4, -1.35, -2.3]):
            lg = VGroup(self.coche(), self.t(s, 36)).arrange(RIGHT, buff=0.3)
            lignes.add(lg.move_to(P(0, y)).align_to(P(-6.3, 0), LEFT))
        self.au_mot("Je mesure toujours")
        self.montrer_ligne(lignes[0], Circumscribe(tab.tetes, color=AMBRE))
        self.au_mot("Je note dans un tableau")
        self.montrer_ligne(lignes[1], Circumscribe(tab, color=AMBRE))
        self.au_mot("dans l'en-tête")
        self.play(Circumscribe(tab.coin, color=AMBRE), Circumscribe(tab.libelles, color=AMBRE), run_time=0.6)
        self.au_mot("Et je ne compare")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_mesures()
        self.ecran_tableau()
        self.ecran_lire()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")


class StatsEnqueteMesurer6e(StatsEnqueteMesurerBase):
    identite = "Maths 6e — EleveAI"
