# demi_droite_placer.py
# EleveAI — Maths 6e — série « Repérer sur une demi-droite graduée », épisode
# 02 : PLACER UN NOMBRE DÉCIMAL (micro du coach : abscisse_placer, notion
# demi_droite_graduee), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE (brief
# manim/brief-agent-demi-droite.md : « placer un décimal : jaune »).
# PAYSAGE SEULEMENT : le short existe (demi_droite_graduee_short.py, voix
# 6e-demi-droite-short-placer).
#
# ⭐ Le geste du SAUT (flèche courbe d'un trait au suivant) est repris de la
# paysage de notion demi_droite_graduee.py : GRANDS sauts (orange) d'une unité,
# PETITS sauts (bleus) d'un pas. 2,3 = 2 + 3 dixièmes = 2 grands puis 3 petits.
#
# Décor et métier : Karim, INFIRMIER ; le thermomètre médical gradué de 35 à
# 42 °C en dixièmes. Centre d'intérêt : corps-sante. Pas de La Réunion.
# Fait réel cité : « à partir de 38 °C, on parle de fièvre » — HAS, « Prise en
# charge de la fièvre chez l'enfant », rapport d'élaboration, octobre 2016
# (fièvre = température centrale supérieure à 38 °C) ; vérifié par WebSearch le
# 03/11/2026. Températures du récit (38,3 puis 37,8 °C) : inventées.
# Vérifié (Python) : 2 + 0,3 = 2,3 ; 1 + 0,5 = 1,5 ; 2 < 2,2 < 2,25 < 2,5 ;
# 3,5 < 3,7 < 4 ; 38 + 0,3 = 38,3 ; 37 + 0,8 = 37,8 < 38.
#
# Micro → écrans (banque lib/tutor-v4/questionBank/6e/maths/demi-droite.bank.ts,
# abscisse_placer : « quel point a pour abscisse 2,3 ? », « de 0,5 en 0,5,
# entre quelles graduations se place 4,2 ? ») : trouver le pas (02), placer
# 2,3 = 2 grands + 3 petits sauts (03), QUESTION 1 (04, leurres : compter les
# traits → 2,2 ; inverser → 3,2), pas de 0,5 : placer 1,5 (05), un nombre sans
# trait : 2,2 entre 2 et 2,5 (05b), QUESTION 2 (06, leurres : le pas « vaut
# toujours 0,1 » → 7 traits ; mauvais intervalle), zoom entre deux unités sur
# le thermomètre : 38,3 (07), défi 37,8 (08) + correction (08b).
# Écrans : 00 garde · 01 Karim et le thermomètre · 01b ce que tu vas apprendre ·
# 02 le pas · 03 placer 2,3 · 04 QUESTION 1 · 05 le pas de 0,5 · 05b entre deux
# traits · 06 QUESTION 2 · 07 le zoom · 08 défi · 08b correction · 09 ce que tu
# as appris · 10 fin.
#
# Ajouté ICI (canvas_fractions.py, prop_commun.py non modifiés) : Ligne (la
# demi-droite du coach avec grands traits aux unités, moyens aux demis, petits
# aux dixièmes), saut(), point_lettre(), thermometre(), infirmier().
# Voix : manim/voix/6e-demi-droite-placer.json (débit −10), WAV dans
# public/sons/6e-demi-droite-placer/ ; marques : demi_droite_placer_marques.json
# (scripts/marques_dump.ps1 puis scripts/cues2marques.py ; 3 marques ajoutées à
# la main : « 2,3, c'est » répété, « 38 et 39 »).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/demi_droite_placer.py DemiDroitePlacer6e
# python -m manim render -qh --disable_caching manim/scripts/6e/demi_droite_placer.py DemiDroitePlacer6e -o eleveai-maths-6e-demi-droite-placer --media_dir manim/scripts/6e/media-demi-droite-02
# Sortie : manim/sorties/6e/maths/demi-droite-graduee/02-placer/eleveai-maths-6e-demi-droite-placer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_triangles import FinTriangles  # noqa: E402  (fin du 05/11 : pouce, commentaire, cloche)
from canvas_fractions import _carte  # noqa: E402

GRAND = "#ea580c"      # un grand saut (une unité), lisible sur la carte blanche
PETIT = "#2563eb"      # un petit saut (un pas)
VERT_CARTE = "#15803d"  # le nombre placé, sous l'axe
ROUGE_FIEVRE = "#dc2626"
TUBE = "#e0f2fe"


def muet(m):
    """Une donnée de la figure (graduation écrite) : ni synchro, ni audit."""
    for f in m.get_family():
        f.sans_synchro = True
        f._pas_audit = True
    return m


SANS_JAMBAGE = set("abcdehiklmnorstuvwxzABCDEFGHIKLMNOPRSTUVWXYZ0123456789éèêàâîôûç")  # ni J ni Q


def base(t):
    """La ligne de base d'un Text : le bas d'une lettre sans jambage."""
    lettres = [c for c in getattr(t, "text", "") if not c.isspace()]
    if len(lettres) == len(t.submobjects):
        for c, g in zip(lettres, t.submobjects):
            if c in SANS_JAMBAGE:
                return g.get_bottom()[1]
    return t.get_bottom()[1]


def aligner_bases(g):
    y0 = base(g[0])
    for m in g[1:]:
        m.shift(UP * (y0 - base(m)))
    return g


def ecrit(v):
    """2.3 → « 2,3 » ; 2.0 → « 2 »."""
    return f"{round(v, 3):g}".replace(".", ",")


class Ligne(VGroup):
    """La demi-droite graduée du coach (DroiteGradueeCanvas) : carte blanche,
    axe bleu nuit + flèche, un trait par pas (1/sub d'unité) : grand aux
    unités, moyen aux demis, petit ailleurs. etiquettes : liste de valeurs
    écrites sous l'axe (0 en rouge) ; muettes (données de la figure).
    .p(v) · .tick(v) · .etiq[v] · .carte"""

    def __init__(self, a, b, sub, longueur=10.0, etiquettes=(), fs=30, carte=True, centre=ORIGIN,
                 depasse=0.55, haut_carte=1.15, **kw):
        super().__init__(**kw)
        self.a, self.b, self.sub = a, b, sub
        n = round((b - a) * sub)
        self._g = Dot(P(-longueur / 2, 0), radius=0.001, fill_opacity=0)
        self._d = Dot(P(longueur / 2, 0), radius=0.001, fill_opacity=0)
        self.axe = Arrow(P(-longueur / 2 - 0.15, 0), P(longueur / 2 + depasse, 0), buff=0, color=NUIT,
                         stroke_width=6, tip_length=0.25, max_tip_length_to_length_ratio=1)
        self.ticks = {}
        for i in range(n + 1):
            v = a + i / sub
            if abs(v - round(v)) < 1e-9:
                h, sw = 0.26, 5
            elif abs(2 * v - round(2 * v)) < 1e-9:
                h, sw = 0.19, 4
            else:
                h, sw = 0.12, 3
            x = -longueur / 2 + longueur * i / n
            self.ticks[i] = Line(P(x, -h), P(x, h), color=NUIT, stroke_width=sw)
        self.etiq = {}
        for v in etiquettes:
            t = muet(texte(ecrit(v), fs, color=ROUGE_ZERO if v == 0 else NUIT))
            self.etiq[v] = t.next_to(P(-longueur / 2 + longueur * (v - a) / (b - a), -0.28), DOWN, buff=0.1)
        corps = VGroup(self.axe, *self.ticks.values(), *self.etiq.values())
        if carte:
            self.carte = _carte(corps.width + 0.7, corps.height + 0.7 + haut_carte).move_to(corps)
            self.carte.shift(UP * haut_carte / 2)
        else:
            self.carte = VMobject()
        self.add(self.carte, self._g, self._d, self.axe, *self.ticks.values(), *self.etiq.values())
        self.move_to(centre)

    def p(self, v):
        g, d = self._g.get_center(), self._d.get_center()
        return g + (d - g) * (v - self.a) / (self.b - self.a)

    def tick(self, v):
        return self.ticks[round((v - self.a) * self.sub)]

    def corps(self):
        """Tout sauf les étiquettes (pour les faire entrer au mot)."""
        return VGroup(self.carte, self.axe, *self.ticks.values())

    def segment(self, v1, v2, couleur=AMBRE, sw=12, opacite=0.85):
        return Line(self.p(v1), self.p(v2), color=couleur, stroke_width=sw, stroke_opacity=opacite)

    def sous(self, v, s=None, couleur=VERT_CARTE, fs=30):
        """Le nombre placé, écrit SOUS l'axe à l'aplomb du point."""
        t = texte(s or ecrit(v), fs, color=couleur)
        return t.next_to(self.p(v) + DOWN * 0.28, DOWN, buff=0.1)


def saut(dr, v1, v2, couleur=PETIT, sw=4, haut=0.2, angle=-PI * 0.75):
    """Le SAUT d'un trait à un autre : une flèche courbe au-dessus de l'axe."""
    arc = ArcBetweenPoints(dr.p(v1) + UP * haut, dr.p(v2) + UP * haut, angle=angle, color=couleur,
                           stroke_width=sw)
    arc.add_tip(tip_length=0.13, tip_width=0.13)
    return arc


def grand_saut(dr, v1, v2):
    return saut(dr, v1, v2, GRAND, sw=6, haut=0.3, angle=-PI * 0.6)


def marque(dr, v, couleur=VERT_CARTE, r=0.12):
    """Le point marqué SUR l'axe."""
    return Dot(dr.p(v), radius=r, color=couleur)


def point_lettre(dr, v, lettre, couleur=BLEU_POINT, haut=0.55, fs=30):
    """Le point du coach : tige, rond, la lettre au-dessus."""
    x = dr.p(v)
    tige = Line(x, x + UP * haut, color=couleur, stroke_width=5)
    rond = Dot(x + UP * haut, radius=0.1, color=couleur)
    l = texte(lettre, fs, color=couleur).next_to(rond, UP, buff=0.08)
    g = VGroup(tige, rond, l)
    g.rond, g.lettre = rond, l
    return g


def thermometre(valeur, longueur=9.0, fs=26, centre=ORIGIN):
    """Le thermomètre médical, à l'horizontale : un tube, le réservoir rouge à
    gauche, le liquide jusqu'à `valeur`, l'échelle de 35 à 42 °C en dixièmes
    (une Ligne sans carte) ; le tout sur une carte blanche.
    .ligne · .liquide (à faire pousser depuis la gauche) · .unite (« °C »)"""
    lg = Ligne(35, 42, 10, longueur=longueur, etiquettes=range(35, 43), fs=fs, carte=False, depasse=0.25)
    y_t = 0.5
    x0, x1 = lg.p(35)[0] - 0.55, lg.p(42)[0] + 0.3
    tube = RoundedRectangle(width=x1 - x0, height=0.34, corner_radius=0.17, fill_color=TUBE, fill_opacity=1,
                            stroke_color="#94a3b8", stroke_width=3).move_to(P((x0 + x1) / 2, y_t))
    bulbe = Circle(radius=0.3, fill_color=ROUGE_FIEVRE, fill_opacity=1, stroke_color="#94a3b8",
                   stroke_width=3).move_to(P(x0 - 0.12, y_t))
    xv = lg.p(valeur)[0]
    liquide = Rectangle(width=xv - x0, height=0.16, fill_color=ROUGE_FIEVRE, fill_opacity=1,
                        stroke_width=0).move_to(P((x0 + xv) / 2, y_t))
    unite = muet(texte("°C", fs, color=NUIT)).next_to(lg.etiq[42], RIGHT, buff=0.3)
    corps = VGroup(tube, bulbe, liquide, lg, unite)
    carte = _carte(corps.width + 0.6, corps.height + 0.55).move_to(corps)
    g = VGroup(carte, tube, liquide, bulbe, lg, unite).move_to(centre)
    g.carte, g.tube, g.liquide, g.bulbe, g.ligne, g.unite = carte, tube, liquide, bulbe, lg, unite
    return g


def infirmier(s=1.0):
    """Karim, infirmier : tunique bleu-vert, stéthoscope autour du cou."""
    p = personne(peau="#8d5524", tenue="#0d9488", cheveux="#111827", s=1.0)
    c = p.corps.get_top()
    steto = VGroup(Arc(radius=0.32, start_angle=PI, angle=PI, arc_center=c + DOWN * 0.05, stroke_color="#e5e7eb",
                       stroke_width=5),
                   Line(c + P(0.32, -0.05), c + P(0.32, -0.75), color="#e5e7eb", stroke_width=5),
                   Circle(radius=0.11, fill_color="#9ca3af", fill_opacity=1, stroke_color="#e5e7eb",
                          stroke_width=3).move_to(c + P(0.32, -0.85)))
    croix_v = VGroup(Rectangle(width=0.26, height=0.08), Rectangle(width=0.08, height=0.26)).set_fill(
        WHITE, 1).set_stroke(width=0).move_to(c + P(-0.25, -0.6))
    return VGroup(p, steto, croix_v).scale(s)


class DemiDroitePlacerBase(FinTriangles, PaysageProp):
    nom_voix = "6e-demi-droite-placer"
    fichier_marques = "demi_droite_placer_marques.json"
    X0 = -0.4

    def garde(self, *a, **k):
        titre, ident, ech = super().garde(*a, **k)
        muet(ident)  # « Maths 6e » : le 6 n'est pas dit
        return titre, ident, ech

    def ligne(self, morceaux, fs=40, buff=0.2):
        """Les morceaux colorés sur la MÊME ligne de base (arrange() centre les
        boîtes : une virgule ou un « q » faisait monter ou descendre un morceau)."""
        g = super().ligne(morceaux, fs, buff)
        return aligner_bases(g)

    def carte_q(self, s):
        """Le texte d'un choix : il attend son mot ; audité à l'écran de la question
        seulement (à la réponse, le réglage des cartes le faisait passer pour neuf)."""
        t = self.t(s, 34)
        t._pas_audit = True
        return t

    def titre_haut(self, s, couleur=JAUNE_TITRE, fs=46, y=3.1):
        return self.t(s, fs, couleur).move_to(P(self.X0, y))

    def centre_txt(self, s, y, fs=36, couleur=WHITE, x=None):
        return self.t(s, fs, couleur).move_to(P(self.X0 if x is None else x, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Placer un nombre décimal", self.identite, self.ceinture, y_ech=-2.45)
        dr = Ligne(0, 3, 10, longueur=8.0, etiquettes=[0, 1, 2, 3], fs=28, centre=P(-0.5, 0.15))
        q = point_lettre(dr, 2.3, "?", couleur=GRAND, fs=36)
        self.au_mot("Placer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.au_mot("demi-droite")
        self.play(FadeIn(dr, shift=UP * 0.2), run_time=0.6)
        self.play(FadeIn(q, shift=DOWN * 0.2), run_time=0.4)
        self.insister(q.lettre, 1.4, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Karim, infirmier, et le thermomètre ────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = infirmier(0.95).move_to(P(-5.6, -1.45))
        self.au_mot("Voici Karim")
        nom = self.t("Karim", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("infirmier")
        met = self.t("infirmier", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        ecranT = RoundedRectangle(width=3.0, height=1.15, corner_radius=0.15, fill_color="#111827", fill_opacity=1,
                                  stroke_color=BLEU_CALCUL, stroke_width=4).move_to(P(-1.9, -1.3))
        self.au_mot("la température")
        self.play(FadeIn(ecranT, scale=0.8), run_time=0.4)
        self.au_mot("38,3 degrés")
        val = self.t("38,3 °C", 50, ROUGE_FIEVRE).move_to(ecranT)
        self.play(FadeIn(val, scale=1.3), run_time=0.4)
        self.insister(val, 1.2, 0.2)
        th = thermometre(38.3, longueur=9.0, centre=P(0.85, 2.0))
        self.au_mot("Son thermomètre")
        self.play(FadeIn(VGroup(th.carte, th.tube, th.bulbe, th.ligne, th.unite), shift=UP * 0.2), run_time=0.6)
        self.au_mot("35 à 42")
        self.play(Indicate(th.ligne.etiq[35], color=AMBRE, scale_factor=1.6), run_time=0.45)
        self.play(Indicate(th.ligne.etiq[42], color=AMBRE, scale_factor=1.6), run_time=0.45)
        self.au_mot("38 degrés")
        zone = th.ligne.segment(38, 42, ROUGE_FIEVRE, sw=10, opacite=0.9).shift(DOWN * 0.0)
        f38 = self.t("38 °C et plus :", 34, ROUGE_FIEVRE).move_to(P(2.6, -0.2))
        self.play(Create(zone), FadeIn(f38, shift=UP * 0.15), run_time=0.6)
        self.au_mot("fièvre")
        fv = self.t("fièvre", 34, ROUGE_FIEVRE).next_to(f38, RIGHT, buff=0.2)
        aligner_bases(VGroup(f38, fv))
        self.play(FadeIn(fv, scale=1.2), run_time=0.35)
        self.au_mot("Alors")
        self.play(GrowFromEdge(th.liquide, LEFT), run_time=1.0)
        self.au_mot("38,3 ?")
        q = self.t("Où est 38,3 ?", 44, ORANGE_RETENUE).move_to(P(2.0, -1.75))
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.attendre_voix()

    # ── 01b : ce que tu vas apprendre ───────────────────────────────────────
    def ecran_apprendre(self):
        self.ecran("01b-apprendre")
        self.au_mot("Ce que tu vas")
        tit = self.titre_haut("Ce que tu vas apprendre")
        self.play(Write(tit), run_time=0.6)
        l1 = muet(self.t("1. Trouver le pas.", 40)).move_to(P(-4.8, 1.7), aligned_edge=LEFT)
        l2 = muet(self.t("2. Placer un nombre à virgule, saut après saut.", 40)).move_to(P(-4.8, 0.85))
        if l2.width > 11.0:
            l2.scale_to_fit_width(11.0)
        l1.move_to(P(-5.4, 1.7), aligned_edge=LEFT)
        l2.move_to(P(-5.4, 0.85), aligned_edge=LEFT)
        self.au_mot("trouver le pas")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("placer")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        dr = Ligne(0, 1, 10, longueur=7.0, etiquettes=[0, 1], centre=P(-0.6, -1.35))
        self.play(FadeIn(dr, shift=UP * 0.2), run_time=0.4)
        self.au_mot("saut après saut")
        self.play(LaggedStart(*[Create(saut(dr, k / 10, (k + 1) / 10)) for k in range(10)], lag_ratio=0.25),
                  run_time=1.4)
        self.attendre_voix()

    # ── 02 : le pas ─────────────────────────────────────────────────────────
    def ligne03(self):
        return Ligne(0, 3, 10, longueur=11.0, etiquettes=[0, 1, 2, 3], fs=32, centre=P(self.X0, 1.05))

    def ecran_pas(self):
        self.ecran("02-pas")
        dr = self.ligne03()
        self.au_mot("D'abord")
        tit = self.titre_haut("D'abord, je trouve le pas")
        self.play(Write(tit), FadeIn(dr, shift=UP * 0.2), run_time=0.7)
        self.au_mot("Entre 0 et 1")
        seg = dr.segment(0, 1)
        self.play(Create(seg), Indicate(dr.etiq[0], color=AMBRE, scale_factor=1.5),
                  Indicate(dr.etiq[1], color=AMBRE, scale_factor=1.5), run_time=0.6)
        self.au_mot("les sauts")
        sauts = VGroup(*[saut(dr, k / 10, (k + 1) / 10) for k in range(10)])
        l1 = self.ligne([("Je compte les sauts,", WHITE), ("pas les traits.", ROUGE_ERREUR)], 36)
        l1.move_to(P(self.X0, -1.0))
        self.play(FadeIn(l1[0], shift=UP * 0.15), LaggedStart(*[Create(s) for s in sauts], lag_ratio=0.15),
                  run_time=0.45)
        self.au_mot("pas les traits")
        self.play(FadeIn(l1[1], shift=UP * 0.15),
                  LaggedStart(*[Indicate(dr.ticks[i], color=ROUGE_ERREUR, scale_factor=1.6) for i in range(11)],
                              lag_ratio=0.06), run_time=0.8)
        self.au_mot("10 sauts")
        l2 = self.t("10 sauts égaux", 38, BLEU_CALCUL).move_to(P(self.X0 - 2.6, -1.9))
        self.play(FadeIn(l2, scale=1.2), LaggedStart(*[Indicate(s, color=AMBRE) for s in sauts], lag_ratio=0.08),
                  run_time=0.8)
        self.au_mot("Chaque petit")
        l3 = self.ligne([("chaque saut", BLEU_CALCUL), ("= 0,1", BLEU_CALCUL)], 38).move_to(P(self.X0 + 2.6, -1.9))
        aligner_bases(VGroup(l2, *l3))
        self.play(FadeIn(l3[0], shift=RIGHT * 0.15), Indicate(sauts[0], color=AMBRE), run_time=0.45)
        self.au_mot("0,1. Le")
        un = texte("0,1", 26, color=PETIT).next_to(sauts[0], UP, buff=0.06)
        self.play(FadeIn(un, scale=1.3), FadeIn(l3[1], shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("Le pas vaut")
        res = self.t("Le pas vaut 0,1.", 46, VERT_OK).move_to(P(self.X0, -2.95))
        self.play(FadeIn(res, scale=1.1), run_time=0.45)
        self.play(Create(self.encadrer(res)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : placer 2,3 = 2 grands sauts + 3 petits ─────────────────────────
    def ecran_placer(self):
        self.ecran("03-placer")
        dr = self.ligne03()
        self.add(dr)
        self.au_mot("placer 2,3")
        tit = self.titre_haut("Je place 2,3")
        self.play(Write(tit), run_time=0.5)
        self.au_mot("2,3, c'est")
        d1 = self.ligne([("2,3 =", WHITE), ("2 unités", GRAND), ("+ 3 dixièmes", BLEU_CALCUL)], 40)
        d1.move_to(P(self.X0, -1.2))
        self.play(FadeIn(d1[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("2 unités")
        self.play(FadeIn(d1[1], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("3 dixièmes")
        self.play(FadeIn(d1[2], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("2 plus")
        d2 = self.ligne([("2,3 =", WHITE), ("2", GRAND), ("+ 0,3", BLEU_CALCUL)], 40)
        d2.move_to(P(self.X0, -2.05))
        muet(d2[0])
        self.play(FadeIn(d2[0]), FadeIn(d2[1], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("0,3. Je")
        self.play(FadeIn(d2[2], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("Je pars de 0")
        cur = Dot(dr.p(0), radius=0.13, color=GRAND)
        self.play(FadeIn(cur, scale=2), Indicate(dr.etiq[0], color=GRAND, scale_factor=1.6), run_time=0.45)
        self.au_mot("2 grands")
        g1, g2 = grand_saut(dr, 0, 1), grand_saut(dr, 1, 2)
        self.au_mot("1, puis")
        self.play(Create(g1), cur.animate.move_to(dr.p(1)), Indicate(dr.etiq[1], color=GRAND, scale_factor=1.5),
                  run_time=0.5)
        self.au_mot("puis 2")
        self.play(Create(g2), cur.animate.move_to(dr.p(2)), Indicate(dr.etiq[2], color=GRAND, scale_factor=1.5),
                  run_time=0.5)
        self.au_mot("3 petits")
        self.play(Indicate(d1[2], color=AMBRE, scale_factor=1.1), run_time=0.4)
        lu = None
        for k, mot in enumerate(["2,1. 2,2", "2,2. 2,3", "2,3. Je"]):
            v = 2 + (k + 1) / 10
            self.au_mot(mot)
            n = texte(ecrit(v), 30, color=PETIT).move_to(dr.p(v) + UP * 1.05)
            anims = [Create(saut(dr, v - 0.1, v)), cur.animate.move_to(dr.p(v)), FadeIn(n, scale=1.2)]
            if k == 2:
                s23 = dr.sous(2.3, fs=32)
                anims.append(FadeIn(s23, scale=1.3))
            if lu is not None:
                anims.append(FadeOut(lu))
            self.play(*anims, run_time=0.4)
            lu = n
        self.au_mot("Je marque")
        pt = marque(dr, 2.3)
        self.play(FadeOut(cur), FadeOut(lu), FadeIn(pt, scale=2), run_time=0.45)
        self.insister(VGroup(pt, s23), 1.3, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (quel point a pour abscisse 2,3 ?) ─────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        dr = Ligne(0, 3.5, 10, longueur=6.4, etiquettes=[0, 1, 2, 3], fs=28, haut_carte=1.5)
        self.figure_gauche(dr, haut=1.6, bas=-1.6)
        pts = VGroup(point_lettre(dr, 2.3, "A", haut=1.1, fs=28), point_lettre(dr, 2.2, "B", haut=0.75, fs=28),
                     point_lettre(dr, 3.2, "C", haut=0.55, fs=28))
        pts[0].lettre.next_to(pts[0].rond, RIGHT, buff=0.06)   # A à droite, B à gauche : jamais l'un sur l'autre
        pts[1].lettre.next_to(pts[1].rond, LEFT, buff=0.06)
        self.add(dr, pts)

        def apres(sc):
            g = VGroup(grand_saut(dr, 0, 1), grand_saut(dr, 1, 2))
            pe = VGroup(*[saut(dr, 2 + k / 10, 2 + (k + 1) / 10) for k in range(3)])
            sc.au_mot("2 grands")
            sc.play(FadeIn(sc.ph_q[0][0], shift=UP * 0.15), LaggedStart(*[Create(a) for a in g], lag_ratio=0.4),
                    run_time=0.7)
            sc.au_mot("3 petits")
            sc.play(FadeIn(sc.ph_q[0][1], shift=UP * 0.15), LaggedStart(*[Create(a) for a in pe], lag_ratio=0.3), Indicate(pts[0].lettre, color=VERT_CARTE,
                                                                                    scale_factor=1.6), run_time=0.8)
            sc.au_mot("B est sur")
            sc.play(FadeIn(sc.ph_q[1], shift=UP * 0.15),
                    LaggedStart(*[Indicate(dr.tick(v), color=ROUGE_ERREUR, scale_factor=2.0) for v in (2, 2.1, 2.2)],
                                lag_ratio=0.4), run_time=0.6)
            sc.au_mot("compté les traits")
            sc.play(FadeIn(sc.ph_q[2], shift=UP * 0.15), Indicate(pts[1].lettre, color=ROUGE_ERREUR,
                                                                     scale_factor=1.6), run_time=0.5)
            sc.ph_q.submobjects = []

        self.question_pause("04-question", "04b-reponse", ["Quel point a pour", "abscisse 2,3 ?"],
                            [self.t("le point A", 34), self.t("le point B", 34), self.t("le point C", 34)], 0,
                            ["2 grands, puis 3 petits.", "B = 2,2 :", "on a compté les traits !"],
                            mots_choix=("Le point A", "le point B", "le point C"), mot_q="Quel point",
                            autres_r=apres)

    # ── 05 : le pas de 0,5 : placer 1,5 ─────────────────────────────────────
    def ligne_demis(self, etiq=(0, 1, 2, 3)):
        return Ligne(0, 3, 2, longueur=10.0, etiquettes=list(etiq), fs=32, centre=P(self.X0, 1.05))

    def ecran_demi(self):
        self.ecran("05-demi")
        dr = self.ligne_demis()
        self.au_mot("Attention")
        tit = self.titre_haut("Attention : le pas change !", ROUGE_ERREUR)
        self.play(Write(tit), FadeIn(dr, shift=UP * 0.2), run_time=0.7)
        self.au_mot("entre 0 et 1")
        s = VGroup(saut(dr, 0, 0.5, sw=5, angle=-PI * 0.6), saut(dr, 0.5, 1, sw=5, angle=-PI * 0.6))
        l1 = self.ligne([("Entre 0 et 1 :", WHITE), ("2 sauts", BLEU_CALCUL)], 38).move_to(P(self.X0, -1.2))
        self.play(Create(dr.segment(0, 1)), FadeIn(l1[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("2 sauts")
        self.play(LaggedStart(*[Create(a) for a in s], lag_ratio=0.4), FadeIn(l1[1], shift=UP * 0.15), run_time=0.7)
        self.au_mot("Le pas vaut")
        l2 = self.t("Le pas vaut 0,5.", 42, VERT_OK).move_to(P(self.X0, -2.0))
        self.play(FadeIn(l2, scale=1.1), run_time=0.4)
        self.play(Create(self.encadrer(l2)), run_time=0.35)
        self.au_mot("Je place 1,5")
        l3 = self.ligne([("1,5 =", WHITE), ("1 grand saut", GRAND), ("+ un saut de 0,5", BLEU_CALCUL)], 38)
        l3.move_to(P(self.X0, -2.85))
        s15 = dr.sous(1.5, fs=32)
        self.play(FadeOut(s), FadeIn(l3[0], shift=RIGHT * 0.15), FadeIn(s15, scale=1.3), run_time=0.35)
        self.au_mot("1 grand saut")
        self.play(FadeIn(l3[1], shift=RIGHT * 0.15), Create(grand_saut(dr, 0, 1)), run_time=0.5)
        self.au_mot("un saut de 0,5")
        self.play(FadeIn(l3[2], shift=RIGHT * 0.15), Create(saut(dr, 1, 1.5, sw=5, angle=-PI * 0.6)), run_time=0.5)
        pt = marque(dr, 1.5)
        self.play(FadeIn(pt, scale=2), run_time=0.4)
        self.attendre_voix()

    # ── 05b : un nombre sans trait : 2,2 entre 2 et 2,5 ─────────────────────
    def ecran_entre(self):
        self.ecran("05b-entre")
        dr = self.ligne_demis()
        self.add(dr, marque(dr, 1.5), dr.sous(1.5, fs=32))
        self.au_mot("Et 2,2")
        tit = self.titre_haut("Et 2,2 ?")
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Aucun trait")
        l1 = self.t("Aucun trait ne porte 2,2.", 38).move_to(P(self.X0, -1.2))
        self.play(FadeIn(l1, shift=UP * 0.15), Indicate(dr.tick(2), color=AMBRE, scale_factor=1.8),
                  Indicate(dr.tick(2.5), color=AMBRE, scale_factor=1.8), run_time=0.7)
        self.au_mot("entre 2")
        zone = dr.segment(2, 2.5)
        l2 = self.ligne([("Il est entre 2", WHITE), ("et 2,5,", WHITE)], 40).move_to(P(self.X0, -2.0))
        self.play(Create(zone), FadeIn(l2[0], shift=UP * 0.15), run_time=0.45)
        self.au_mot("2,5, plus")
        e25 = dr.sous(2.5, fs=32, couleur=NUIT)
        self.play(FadeIn(l2[1], shift=UP * 0.15), FadeIn(e25, scale=1.3), run_time=0.4)
        self.au_mot("plus près")
        l3 = self.t("plus près de 2.", 40, VERT_OK).move_to(P(self.X0, -2.8))
        self.play(FadeIn(l3, shift=UP * 0.15), Indicate(dr.etiq[2], color=VERT_CARTE, scale_factor=1.5),
                  run_time=0.45)
        self.au_mot("Je place 2,2")
        pt = point_lettre(dr, 2.2, "2,2", couleur=VERT_CARTE, haut=0.55, fs=30)
        self.play(FadeIn(pt, shift=DOWN * 0.2), run_time=0.45)
        self.insister(pt.lettre, 1.4, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (pas de 0,5 : où se place 3,7 ?) ────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        dr = Ligne(2, 4.5, 2, longueur=6.0, etiquettes=[2, 2.5, 3, 3.5, 4], fs=28, haut_carte=1.3)
        self.figure_gauche(dr, haut=1.6, bas=-1.6)
        self.add(dr)

        def apres(sc):
            sc.au_mot("3,7 est")
            zone = dr.segment(3.5, 4)
            pt = point_lettre(dr, 3.7, "3,7", couleur=VERT_CARTE, haut=0.55, fs=28)
            sc.play(FadeIn(sc.ph_q[0][0], shift=UP * 0.15), FadeIn(pt, shift=DOWN * 0.2), run_time=0.4)
            sc.au_mot("que 3,5")
            sc.play(FadeIn(sc.ph_q[0][1], shift=UP * 0.15), Create(zone), Indicate(dr.etiq[3.5], color=AMBRE),
                    run_time=0.45)
            sc.au_mot("que 4")
            sc.play(FadeIn(sc.ph_q[0][2], shift=UP * 0.15), Indicate(dr.etiq[4], color=AMBRE), run_time=0.4)
            sc.au_mot("7 traits")
            sc.play(FadeIn(sc.ph_q[1][0], shift=UP * 0.15), run_time=0.35)
            sc.au_mot("un pas de 0,1")
            sc.play(FadeIn(sc.ph_q[1][1], shift=UP * 0.15), run_time=0.35)
            sc.au_mot("Ici, le pas")
            sc.play(FadeIn(sc.ph_q[2], shift=UP * 0.15), run_time=0.35)
            sc.ph_q.submobjects = []

        self.question_pause("06-question", "06b-reponse", ["Le pas vaut 0,5.", "Où se place 3,7 ?"],
                            [self.carte_q("entre 3 et 3,5"), self.carte_q("entre 3,5 et 4"),
                             self.carte_q("7 traits après 3")], 1,
                            ["3,7 est entre 3,5 et 4.", "7 traits : pas de 0,1 !",
                             "Ici, le pas vaut 0,5."], mot_q="le pas vaut", autres_r=apres)

    # les lignes de réponse coupées à leurs nombres : chaque morceau posé AU MOT
    COUPES = {"04-question": {0: ("2 grands,", "puis 3 petits.")},
              "06-question": {0: ("3,7 est entre", "3,5", "et 4."), 1: ("7 traits :", "pas de 0,1 !")}}

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for i, morceaux in self.COUPES.get(self._cle_voix, {}).items():
            l0 = ph[i]
            m = VGroup(*[self.t(x, 30, VERT_OK) for x in morceaux]).arrange(RIGHT, buff=0.15)
            m.scale_to_fit_height(l0.height).move_to(l0).align_to(l0, LEFT)
            ph.submobjects[i] = m
        return tete, q, cartes, pause, rebours, ph

    # ── 07 : le zoom entre 38 et 39 (thermomètre) ───────────────────────────
    def ecran_zoom(self):
        self.ecran("07-zoom")
        th = thermometre(38.3, longueur=9.0, fs=24, centre=P(self.X0, 2.3))
        self.au_mot("Revenons")
        self.play(FadeIn(th, shift=DOWN * 0.2), run_time=0.6)
        self.au_mot("je zoome")
        lg = th.ligne
        cadre = Rectangle(width=lg.p(39)[0] - lg.p(38)[0] + 0.12, height=0.75, stroke_color=AMBRE,
                          stroke_width=5).move_to((lg.p(38) + lg.p(39)) / 2)
        self.play(Create(cadre), run_time=0.4)
        gros = Ligne(38, 39, 10, longueur=7.0, etiquettes=[38, 39], fs=34, centre=P(-2.4, -1.05))
        fl = VGroup(DashedLine(cadre.get_corner(DL), gros.carte.get_corner(UL), color=AMBRE, stroke_width=3),
                    DashedLine(cadre.get_corner(DR), gros.carte.get_corner(UR), color=AMBRE, stroke_width=3))
        self.au_mot("38 et 39")
        self.play(Create(fl), FadeIn(gros.corps(), scale=0.5), FadeIn(gros.etiq[38]), run_time=0.6)
        self.au_mot("39")
        self.play(FadeIn(gros.etiq[39], scale=1.2), run_time=0.3)
        self.au_mot("10 petits")
        sauts = VGroup(*[saut(gros, 38 + k / 10, 38 + (k + 1) / 10) for k in range(10)])
        self.play(LaggedStart(*[Create(s) for s in sauts], lag_ratio=0.12), run_time=1.0)
        self.au_mot("le pas vaut")
        pas = self.t("pas = 0,1", 38, VERT_OK).move_to(P(4.1, 0.25))
        self.play(FadeIn(pas, scale=1.2), FadeOut(sauts), run_time=0.4)
        self.au_mot("38,3, c'est")
        d1 = self.t("38,3 =", 38).move_to(P(4.1, -0.6))
        pt, s = marque(gros, 38.3, ROUGE_FIEVRE), gros.sous(38.3, couleur=ROUGE_FIEVRE, fs=34)
        self.play(FadeIn(d1, shift=RIGHT * 0.15), FadeIn(s, scale=1.3), run_time=0.3)
        self.au_mot("38 plus")
        d2 = self.ligne([("38", GRAND), ("+ 3 dixièmes", BLEU_CALCUL)], 34).move_to(P(4.1, -1.35))
        if d2.get_right()[0] > self.BORD_X - 0.1:
            d2.shift(LEFT * (d2.get_right()[0] - self.BORD_X + 0.1))
        self.play(FadeIn(d2[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("3 dixièmes")
        self.play(FadeIn(d2[1], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("3 petits")
        for k in range(3):
            v = 38 + (k + 1) / 10
            self.play(Create(saut(gros, v - 0.1, v)), run_time=0.3)
        self.play(FadeIn(pt, scale=2), run_time=0.4)
        self.au_mot("plus que 38")
        f = self.ligne([("Plus que 38 :", WHITE), ("fièvre !", ROUGE_FIEVRE)], 40).move_to(P(-2.4, -3.2))
        self.play(FadeIn(f[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("fièvre")
        self.play(FadeIn(f[1], scale=1.3), Indicate(th.liquide, color=ROUGE_FIEVRE), run_time=0.5)
        self.attendre_voix()

    # ── 08 : défi (37,8 °C) ─────────────────────────────────────────────────
    def ligne_defi(self):
        return Ligne(37, 38, 10, longueur=8.5, etiquettes=[37, 38], fs=34, centre=P(self.X0, 0.55), haut_carte=0.75)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("Ton défi")
        tit = self.titre_haut("Ton défi !", fs=50)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("Une heure")
        l1 = self.ligne([("Une heure plus tard, Karim lit", WHITE), ("37,8 °C.", ROUGE_FIEVRE)], 38)
        l1.move_to(P(self.X0, 2.2))
        self.play(FadeIn(l1[0], shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("37,8 degrés")
        self.play(FadeIn(l1[1], scale=1.3), run_time=0.35)
        dr = self.ligne_defi()
        self.play(FadeIn(dr, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Combien")
        # les numéros « 1. » « 2. » ne sont pas dits : hors synchro et hors audit
        q1 = self.ligne([("1.", ORANGE_RETENUE), ("Combien de petits sauts après 37 ?", ORANGE_RETENUE)], 36)
        q1.move_to(P(self.X0, -1.3))
        muet(q1[0])
        self.play(FadeIn(q1, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("Et la fièvre")
        q2 = self.ligne([("2.", ORANGE_RETENUE), ("La fièvre est-elle tombée ?", ORANGE_RETENUE)], 36)
        q2.move_to(P(self.X0, -2.05))
        muet(q2[0])
        q2.align_to(q1, LEFT)
        self.play(FadeIn(q2, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE).move_to(P(self.X0, -2.85))
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        dr = self.ligne_defi()
        self.add(dr)
        tit = self.titre_haut("Correction", fs=50)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("37,8, c'est")
        l1 = self.ligne([("37,8 =", WHITE), ("37", GRAND), ("+ 8 dixièmes", BLEU_CALCUL)], 40)
        l1.move_to(P(self.X0, 2.2))
        self.play(FadeIn(l1[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("37 plus")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.15), Indicate(dr.etiq[37], color=GRAND, scale_factor=1.5),
                  run_time=0.35)
        self.au_mot("8 dixièmes")
        self.play(FadeIn(l1[2], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("8 petits")
        cur = Dot(dr.p(37), radius=0.12, color=GRAND)
        l2 = self.ligne([("8 petits sauts", BLEU_CALCUL), ("après 37", BLEU_CALCUL)], 38).move_to(P(self.X0, -1.3))
        self.play(FadeIn(cur, scale=2), FadeIn(l2[0], shift=UP * 0.15), run_time=0.3)
        for k in range(8):
            v = 37 + (k + 1) / 10
            anims = [Create(saut(dr, v - 0.1, v)), cur.animate.move_to(dr.p(v))]
            if k == 1:
                self.au_mot("après 37")
                anims.append(FadeIn(l2[1], shift=UP * 0.15))
            self.play(*anims, run_time=0.22)
        pt, s = marque(dr, 37.8), dr.sous(37.8, fs=34)
        self.play(FadeOut(cur), FadeIn(pt, scale=2), run_time=0.3)
        self.au_mot("37,8 est avant")
        l3 = self.ligne([("37,8 est", WHITE), ("avant 38 :", WHITE), ("la fièvre est tombée !", VERT_OK)], 38)
        l3.move_to(P(self.X0, -2.15))
        self.play(FadeIn(l3[0], shift=UP * 0.15), FadeIn(s, scale=1.3), run_time=0.35)
        self.au_mot("avant 38")
        self.play(FadeIn(l3[1], shift=UP * 0.15), Create(dr.segment(37.8, 38, VERT_OK, sw=10)), run_time=0.4)
        self.au_mot("la fièvre est")
        self.play(FadeIn(l3[2], scale=1.1), run_time=0.4)
        self.insister(l3[2], 1.1, 0.2)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        dr = Ligne(0, 3, 10, longueur=5.4, etiquettes=[0, 1, 2, 3], fs=26)
        fig = VGroup(dr, grand_saut(dr, 0, 1), grand_saut(dr, 1, 2),
                     *[saut(dr, 2 + k / 10, 2 + (k + 1) / 10, sw=3) for k in range(3)],
                     marque(dr, 2.3), muet(dr.sous(2.3, fs=26)))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Je trouve le pas :", "je compte les sauts."),
                                                         ("2,3 : 2 grands sauts,", "puis 3 petits."),
                                                         ("Pas de trait ? Je place", "entre deux traits."),
                                                         ("Pour être précis, je zoome", "entre deux unités.")],
                                     fs=34)
        for lg, mot in zip(lignes, ("je trouve le pas", "2,3, c'est", "Si aucun", "Et pour")):
            self.au_mot(mot)
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_apprendre()
        self.ecran_pas()
        self.ecran_placer()
        self.ecran_question1()
        self.ecran_demi()
        self.ecran_entre()
        self.ecran_question2()
        self.ecran_zoom()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class DemiDroitePlacer6e(DemiDroitePlacerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "jaune"
