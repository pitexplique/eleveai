# prop_echelle_defi.py
# EleveAI — Maths 6e — série « Proportionnalité », lot 2 (échelles), épisode
# 10 PROPRE À LA 6e : DÉFIS SUR LES ÉCHELLES (micro du coach : echelle_defi,
# notion prop_echelle), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (comme le défi
# du lot 1, 06-defi : « un défi garde la verte »). Short jumeau :
# prop_echelle_defi_short.py (blanche).
# ⭐ Méthode travaillée : RETROUVER L'ÉCHELLE = chercher ce que vaut 1 cm
# (longueur réelle ÷ longueur du plan), puis × vers la réalité, ÷ vers le
# plan. ⛔ Pas de produit en croix (6e). « ÷ » pour une division.
# ⭐ Le geste (canvas `echelle` du coach, lib/canvas/EchelleCanvas.tsx) : PLAN
# court en bleu, RÉALITÉ longue en vert, flèche ambre avec l'opération.
# ⭐ Leurres (consigne-videos-proportionnalite.md) : 1. AJOUTER / soustraire
# au lieu de diviser (question 1 : 15 = 20 − 5 ; écran 04 : « 1 cm pour 10 m »
# en enlevant 2 partout ; question 2 : 11 = 7 + 4) ; 3. et 5. INVERSER
# (question 1 : 100 = 20 × 5 ; question 2 : 1,75 = 7 ÷ 4).
#
# Décor et métier : CINÉMA, Jade, MAQUETTISTE (décors miniatures pour le
# cinéma) : maison de 12 m ↔ 3 cm, pont de 7 cm, terrain 40 m × 20 m.
# Échelles et objets inventés : AUCUN chiffre du monde réel dans la paysage,
# rien à sourcer. (Le short cite un dinosaure de film : voir son en-tête.)
# Centres d'intérêt : cinema-series, art-design.
#
# Micro → écrans : retrouver ce que vaut 1 cm (01, 02) ; QUESTION 1 (03) ;
# le piège de la soustraction (04) ; utiliser l'échelle retrouvée, QUESTION 2
# (05) ; défi à deux étapes : du réel vers le plan, puis le périmètre (06,
# 06b) ; ce que tu as appris (07) ; fin (08).
# Écrans : 00 garde · 01 Jade et la maison · 02 on retrouve 1 cm → 4 m ·
# 03 QUESTION 1 · 04 le piège · 05 QUESTION 2 (le pont) · 06 défi du terrain ·
# 06b correction · 07 ce que tu as appris · 08 fin.
#
# Voix : manim/voix/6e-prop-echelle-defi.json (validée par Frédéric, débit
# −10), WAV dans public/sons/6e-prop-echelle-defi/ ; marques mot à mot :
# manim/scripts/6e/prop_echelle_defi_marques.json (scripts/marques_dump.ps1
# puis scripts/cues2marques.py).
# Outils : prop_commun.py + manim/canvas_proportion.py (non modifiés).
# Ajouté ICI : Correspondance, cartouche(), gras() RECOPIÉES de
# prop_echelle_reelle.py (épisode 08, non modifié) ; EchelleCarte du module
# n'est pas utilisée (échelle « 1/25 000 » seulement, segment fixe) ;
# jade(), clap(), maquette_maison(), pont(), terrain().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_echelle_defi.py PropEchelleDefi6e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/6e/prop_echelle_defi.py PropEchelleDefi6e -o eleveai-maths-6e-prop-echelle-defi --media_dir manim/media-prop-10-6e
# Sortie : manim/sorties/6e/maths/proportionnalite/10-echelle-defi/eleveai-maths-6e-prop-echelle-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

BLEU_P = "#2563eb"     # le PLAN (canvas echelle du coach)
BLEU_P2 = "#60a5fa"
VERT_R = "#16a34a"     # la RÉALITÉ
VERT_R2 = "#15803d"
AMBRE_F = "#f59e0b"    # la flèche
AMBRE_T = "#b45309"    # son étiquette, lisible sur la carte blanche
ARDOISE = "#475569"
ENCRE = "#0f172a"
ROSE = "#db2777"


def gras(s, fs, couleur):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def sans(m):
    """Un décor ou un libellé redit partout : ni attente de synchro, ni audit."""
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


class Correspondance(VGroup):
    """RECOPIÉE de prop_echelle_reelle.py (épisode 08) : la figure `echelle`
    du coach. Carte blanche, « PLAN » et sa ligne BLEUE (courte), « RÉALITÉ »
    et sa ligne VERTE (longue), flèche AMBRE avec l'opération.
    up / ur : longueur à l'écran d'une unité du plan / de la réalité."""

    def __init__(self, up, ur, long_reel=4.2, centre=ORIGIN, hauteur=3.5, fs=30, **kw):
        super().__init__(**kw)
        self.up, self.ur, self.fs = up, ur, fs
        larg = 2.0 + long_reel + 1.15
        self.carte = RoundedRectangle(width=larg, height=hauteur, corner_radius=0.22, fill_color=WHITE,
                                      fill_opacity=1, stroke_color="#cbd5e1", stroke_width=3)
        self.carte.move_to(centre)
        g = self.carte.get_left()[0]
        self.x0 = g + 1.85
        self.y_p = self.carte.get_top()[1] - 0.3 * hauteur
        self.y_r = self.carte.get_bottom()[1] + 0.3 * hauteur
        self.lib_p = gras("PLAN", 22, ARDOISE).move_to(P(g + 0.85, self.y_p))
        self.lib_r = gras("RÉALITÉ", 22, ARDOISE).move_to(P(g + 0.85, self.y_r))
        for t in (self.lib_p, self.lib_r):
            t.sans_synchro = True
        self.fond = VGroup(self.carte, self.lib_p, self.lib_r)
        self.add(self.fond)

    def xp(self, a):
        return self.x0 + a * self.up

    def xr(self, a):
        return self.x0 + a * self.ur

    def _seg(self, x0, x1, y, couleur, sw=9, bouts=True):
        ligne = Line(P(x0, y), P(x1, y), color=couleur, stroke_width=sw)
        if not bouts:
            return VGroup(ligne)
        return VGroup(ligne, Dot(P(x0, y), radius=0.065, color=ENCRE), Dot(P(x1, y), radius=0.065, color=ENCRE))

    def plan(self, a, b, couleur=BLEU_P, bouts=True):
        return self._seg(self.xp(a), self.xp(b), self.y_p, couleur, bouts=bouts)

    def reel(self, a, b, couleur=VERT_R, bouts=True):
        return self._seg(self.xr(a), self.xr(b), self.y_r, couleur, bouts=bouts)

    def ticks(self, n, a=0):
        return VGroup(*[Line(P(self.xp(k), self.y_p + 0.14), P(self.xp(k), self.y_p - 0.14), color=ENCRE,
                             stroke_width=3) for k in range(a, n + 1)])

    def lab_p(self, a, b, s, couleur=BLEU_P, fs=None):
        return gras(s, fs or self.fs, couleur).move_to(P((self.xp(a) + self.xp(b)) / 2, self.y_p + 0.42))

    def lab_r(self, a, b, s, couleur=VERT_R, fs=None, dessus=False):
        dy = 0.38 if dessus else -0.42
        return gras(s, fs or self.fs, couleur).move_to(P((self.xr(a) + self.xr(b)) / 2, self.y_r + dy))

    def fleche(self, s, a_plan, a_reel, couleur=AMBRE_F):
        d = P(self.xp(a_plan) + 0.25, self.y_p - 0.2)
        f = P(self.xr(a_reel) + 0.3, self.y_r + 0.2)
        fl = CurvedArrow(d, f, angle=-0.9, color=couleur, stroke_width=6, tip_length=0.22)
        et = gras(s, self.fs + 2, AMBRE_T)
        et.next_to(fl.point_from_proportion(0.55), RIGHT, buff=0.12)
        droite = self.carte.get_right()[0] - 0.12
        if et.get_right()[0] > droite:
            et.shift(LEFT * (et.get_right()[0] - droite))
        g = VGroup(fl, et)
        g.fleche, g.etiquette = fl, et
        return g


def cartouche(cm, reel, fs=34):
    """RECOPIÉE de prop_echelle_reelle.py : « 1 cm → 4 m » encadré ; .cm,
    .fl, .reel, .cadre à montrer au mot."""
    a = gras(cm, fs, BLEU_CALCUL)
    f = Text("→", font_size=fs, color=WHITE)
    b = gras(reel, fs, VERT_OK)
    lg = VGroup(a, f, b).arrange(RIGHT, buff=0.2)
    cadre = SurroundingRectangle(lg, color=AMBRE, buff=0.18, corner_radius=0.12, stroke_width=4)
    g = VGroup(cadre, lg)
    g.cm, g.fl, g.reel, g.cadre = a, f, b, cadre
    return g


# ── le décor : Jade, maquettiste de cinéma ──────────────────────────────────
def jade(s=1.0):
    """Jade, maquettiste : tablier rose, un petit pinceau à la main."""
    p = personne(peau="#e0ac69", tenue=ROSE, cheveux="#7c2d12", longs=True, s=s)
    c = p.corps.get_center()
    tablier = Polygon(P(-0.35, 0.35), P(0.35, 0.35), P(0.45, -0.7), P(-0.45, -0.7), fill_color="#fce7f3",
                      fill_opacity=1, stroke_color="#9d174d", stroke_width=2).scale(s).move_to(c + DOWN * 0.15 * s)
    manche = Line(P(0, 0), P(0.5, 0.45), color="#a16207", stroke_width=6 * s)
    poils = Polygon(P(0.45, 0.4), P(0.6, 0.55), P(0.66, 0.42), fill_color=BLEU_P2, fill_opacity=1,
                    stroke_width=0)
    pinceau = VGroup(manche, poils).scale(s).move_to(c + P(0.85, 0.2) * s)
    p.add(tablier, pinceau)
    return p


def clap(s=1.0):
    """Le clap de cinéma (bandes noires et blanches)."""
    corps = Rectangle(width=1.0, height=0.62, fill_color="#111827", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2)
    barre = Rectangle(width=1.0, height=0.2, fill_color=WHITE, fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2).next_to(corps, UP, buff=0.02)
    bandes = VGroup(*[Polygon(P(-0.5 + 0.2 * k, -0.1), P(-0.4 + 0.2 * k, -0.1), P(-0.3 + 0.2 * k, 0.1),
                              P(-0.4 + 0.2 * k, 0.1), fill_color="#111827", fill_opacity=1, stroke_width=0)
                      for k in range(5)]).move_to(barre)
    lignes = VGroup(*[Line(P(-0.4, y), P(0.4, y), color="#9ca3af", stroke_width=2) for y in (0.1, -0.08)])
    lignes.move_to(corps)
    haut = VGroup(barre, bandes).rotate(0.25, about_point=barre.get_corner(DL))
    return VGroup(corps, lignes, haut).scale(s)


def maquette_maison(s=1.0):
    """La maquette d'une maison de décor : murs, toit, porte, fenêtres."""
    mur = Rectangle(width=1.6, height=1.0, fill_color="#fef3c7", fill_opacity=1, stroke_color=ENCRE,
                    stroke_width=3)
    toit = Polygon(P(-0.95, 0.5), P(0.95, 0.5), P(0, 1.15), fill_color="#b91c1c", fill_opacity=1,
                   stroke_color=ENCRE, stroke_width=3)
    porte = Rectangle(width=0.32, height=0.55, fill_color="#92400e", fill_opacity=1, stroke_width=0).move_to(
        P(0, -0.22))
    fen = VGroup(*[Square(0.3, fill_color="#7dd3fc", fill_opacity=1, stroke_color=ENCRE, stroke_width=2)
                   .move_to(P(x, 0.12)) for x in (-0.5, 0.5)])
    return VGroup(mur, toit, porte, fen).scale(s)


def pont(s=1.0):
    """Un pont en arc au-dessus d'une rivière (décor, sans nombre)."""
    eau = RoundedRectangle(width=3.2, height=0.35, corner_radius=0.12, fill_color="#38bdf8", fill_opacity=1,
                           stroke_width=0).move_to(P(0, -0.45))
    tablier = Rectangle(width=3.0, height=0.16, fill_color="#78716c", fill_opacity=1, stroke_color=ENCRE,
                        stroke_width=2).move_to(P(0, 0.35))
    arc = Arc(radius=1.3, start_angle=PI * 0.18, angle=PI * 0.64, color="#57534e", stroke_width=8).move_to(
        P(0, 0.05))
    piles = VGroup(*[Rectangle(width=0.22, height=0.75, fill_color="#a8a29e", fill_opacity=1, stroke_color=ENCRE,
                               stroke_width=2).move_to(P(x, -0.08)) for x in (-1.35, 1.35)])
    garde = VGroup(*[Line(P(x, 0.43), P(x, 0.62), color="#57534e", stroke_width=3)
                     for x in np.linspace(-1.4, 1.4, 9)])
    rampe = Line(P(-1.45, 0.62), P(1.45, 0.62), color="#57534e", stroke_width=3)
    return VGroup(eau, piles, arc, tablier, garde, rampe).scale(s)


def terrain(l, h, couleur=VERT_R, fond="#bbf7d0"):
    """Un terrain rectangulaire vu de haut (herbe, ligne du milieu)."""
    r = Rectangle(width=l, height=h, fill_color=fond, fill_opacity=1, stroke_color=couleur, stroke_width=7)
    milieu = DashedLine(r.get_top(), r.get_bottom(), color=WHITE, stroke_width=3, dash_length=0.12)
    g = VGroup(r, milieu)
    g.r = r
    return g


class PropEchelleDefiBase(PaysageProp):
    nom_voix = "6e-prop-echelle-defi"
    fichier_marques = "prop_echelle_defi_marques.json"

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_tableau.py : la ligne de réponse garde la taille de la
        phrase qu'elle remplace, bornée à droite (BORD_X)."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def lc(self, morceaux, y, fs=40, xl=1.3):
        """Une ligne de la colonne de droite (non jouée)."""
        return self.col(self.ligne(morceaux, fs), y, xl)

    def plan_bleu(self, l=4.4, h=3.2):
        """Le plan de Jade : papier bleu ciel, cadre bleu."""
        return RoundedRectangle(width=l, height=h, corner_radius=0.2, fill_color="#eff6ff", fill_opacity=1,
                                stroke_color="#93c5fd", stroke_width=4)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les échelles", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        mais = maquette_maison(1.05).move_to(P(-3.5, 1.0))
        cl = clap(0.75).move_to(P(-1.4, 0.6))
        self.play(FadeIn(mais, scale=0.8), FadeIn(cl, shift=LEFT * 0.2), run_time=0.6)
        q = VGroup(self.t("Sauras-tu retrouver", 38), self.t("l'échelle cachée ?", 38, VERT_OK))
        q.arrange(DOWN, buff=0.16).move_to(P(3.3, 0.35))
        self.au_mot("Sauras-tu")
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.4)
        cache = sans(VGroup(self.t("Échelle :", 30, WHITE), self.t("?", 40, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2))
        cache.move_to(P(-2.6, -0.6))
        cadre = SurroundingRectangle(cache, color=AMBRE, buff=0.16, corner_radius=0.12, stroke_width=4)
        self.au_mot("l'échelle cachée")
        self.play(FadeIn(q[1], scale=1.2), Create(cadre), FadeIn(cache), run_time=0.5)
        self.play(Indicate(cache[1], color=ORANGE_RETENUE, scale_factor=1.5), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Jade, maquettiste ; la maison de 12 m mesure 3 cm ──────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = jade(0.95).move_to(P(-5.6, -0.75))
        nom = self.t("Jade", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.au_mot("Voici Jade")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        met = self.t("maquettiste", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        self.au_mot("maquettiste")
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        cl = clap(0.6).move_to(P(-4.15, 1.95))
        mini = maquette_maison(0.45).move_to(P(-4.15, -0.35))
        self.au_mot("décors miniatures")
        self.play(FadeIn(mini, scale=0.6), run_time=0.4)
        self.au_mot("cinéma")
        self.play(FadeIn(cl, shift=DOWN * 0.2), run_time=0.4)
        self.play(Wiggle(cl), run_time=0.5)
        pl = self.plan_bleu().move_to(P(-1.0, 0.35))
        dessin = maquette_maison(1.05)
        dessin.set_fill(opacity=0).set_stroke(BLEU_P, 4).move_to(P(-0.65, 0.75))
        xa, xb = dessin[0].get_left()[0], dessin[0].get_right()[0]
        y_m = dessin[0].get_bottom()[1] - 0.3
        self.au_mot("Sur son plan")
        self.play(FadeIn(pl, scale=0.9), Create(dessin), run_time=0.7)
        L1 = self.lc([("En vrai :", WHITE), ("12 m", VERT_OK)], 2.2, xl=1.75)
        self.au_mot("une maison")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.2), Indicate(dessin, color=BLEU_P2, scale_factor=1.05), run_time=0.5)
        self.au_mot("12 m")
        self.play(FadeIn(L1[1], scale=1.3), run_time=0.4)
        mes = VGroup(Line(P(xa, y_m), P(xb, y_m), color=BLEU_P, stroke_width=8),
                     Dot(P(xa, y_m), radius=0.07, color=ENCRE), Dot(P(xb, y_m), radius=0.07, color=ENCRE))
        l3 = gras("3 cm", 34, BLEU_P).next_to(mes, DOWN, buff=0.12)
        L2 = self.lc([("Sur le plan :", WHITE), ("3 cm", BLEU_CALCUL)], 1.35, xl=1.75)
        self.au_mot("mesure")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("3 cm")
        self.play(Create(mes), FadeIn(l3, scale=1.3), FadeIn(L2[1], scale=1.3), run_time=0.5)
        self.insister(l3, 1.2, 0.2)
        tache = Ellipse(width=1.1, height=0.45, fill_color="#94a3b8", fill_opacity=0.95, stroke_width=0)
        tache.move_to(pl.get_corner(UL) + P(0.75, -0.4))
        eff = self.col(self.t("Échelle effacée !", 36, ROUGE_ERREUR), 0.45, 1.75)
        self.au_mot("effacée")
        self.play(FadeIn(tache, scale=1.4), FadeIn(eff, scale=1.2), run_time=0.5)
        L3 = self.lc([("1 cm", BLEU_CALCUL), ("→", WHITE), ("? m", ORANGE_RETENUE)], -0.5, fs=44, xl=1.75)
        L3[2].sans_synchro = True
        self.au_mot("Que vaut")
        self.play(FadeIn(L3, shift=RIGHT * 0.2), run_time=0.45)
        self.play(Indicate(L3[2], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 02 : 3 cm → 12 m, donc 1 cm → 4 m ───────────────────────────────────
    def ecran_retrouver(self):
        self.ecran("02-retrouver")
        co = Correspondance(0.9, 0.35, centre=P(-2.9, 0.35))
        self.play(FadeIn(co.fond, shift=UP * 0.2), run_time=0.4)
        L1 = self.lc([("3 cm", BLEU_CALCUL), ("→", WHITE), ("12 m", VERT_OK)], 2.1)
        self.au_mot("3 cm")
        self.play(Create(co.plan(0, 3)), Create(co.ticks(3)), FadeIn(co.lab_p(0, 3, "3 cm"), scale=1.3),
                  FadeIn(L1[0], scale=1.3), run_time=0.5)
        l12 = co.lab_r(0, 12, "12 m")
        self.au_mot("12 m")
        self.play(Create(co.reel(0, 12)), FadeIn(l12, scale=1.3), FadeIn(L1[1]), FadeIn(L1[2], scale=1.3),
                  run_time=0.5)
        L2 = self.lc([("Pour 1 cm :", WHITE), ("3 fois moins", AMBRE)], 1.25)
        un = co.plan(0, 1, BLEU_P2, bouts=False)
        self.au_mot("Pour 1 cm")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.2), un.animate.set_stroke(width=16), run_time=0.45)
        morceaux = [co.reel(4 * k, 4 * (k + 1), VERT_R if k % 2 == 0 else "#86efac", bouts=False) for k in range(3)]
        self.au_mot("3 fois moins")
        self.play(FadeIn(L2[1], scale=1.2), FadeOut(l12),
                  LaggedStart(*[m.animate.set_stroke(width=14) for m in morceaux], lag_ratio=0.3), run_time=0.8)
        L3 = self.lc([("12 ÷ 3 =", WHITE), ("4", VERT_OK)], 0.4, fs=44)
        self.au_mot("12 divisé")
        self.play(FadeIn(L3[0], shift=RIGHT * 0.2), run_time=0.4)
        labs = [co.lab_r(4 * k, 4 * (k + 1), "4 m", fs=24) for k in range(3)]
        self.au_mot("égale 4")
        self.play(FadeIn(L3[1], scale=1.4), LaggedStart(*[FadeIn(t, scale=1.3) for t in labs], lag_ratio=0.2),
                  run_time=0.6)
        car = cartouche("1 cm", "4 m", 42)
        self.col(car, -0.55, 1.3)
        fl = co.fleche("× 4", 1, 4)
        self.au_mot("1 cm représente")
        self.play(Create(car.cadre), FadeIn(car.cm, scale=1.3), Indicate(un, color=BLEU_P2, scale_factor=1.0),
                  run_time=0.45)
        self.au_mot("4 m. On")
        self.play(FadeIn(car.fl, shift=RIGHT * 0.2), FadeIn(car.reel, scale=1.3), Create(fl.fleche),
                  FadeIn(fl.etiquette, scale=1.3), Indicate(labs[0], color=VERT_R2), run_time=0.45)
        ok = self.col(self.t("On a retrouvé l'échelle !", 34, VERT_OK), -1.45, 1.3)
        self.au_mot("On a retrouvé")
        self.play(FadeIn(ok, shift=UP * 0.15), run_time=0.4)
        self.insister(car, 1.15, 0.25)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (5 cm → 20 m ; 1 cm ?) ──────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(jade(0.75).move_to(P(-5.7, -1.4)), maquette_maison(1.0).move_to(P(-3.0, 0.6)),
                      clap(0.6).move_to(P(-1.3, -0.6)))
        self.add(deco)
        co = Correspondance(0.5, 0.21, centre=P(-2.9, 0.3))

        def apres(sc):
            # la figure de l'énoncé (déjà dit) : posée d'un bloc, sans attente
            sc.play(FadeOut(deco), FadeIn(co.fond), Create(co.plan(0, 5)), Create(co.ticks(5)),
                    FadeIn(sans(co.lab_p(0, 5, "5 cm")), scale=1.2), Create(co.reel(0, 20)),
                    FadeIn(sans(co.lab_r(0, 20, "20 m")), scale=1.2), run_time=0.25)
            l0 = sc.ligne_rep(0, ["20 ÷", "5 =", "4 m", "pour 1 cm."])
            sc.au_mot("20 divisé")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("5, égale")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("4 m")
            sc.play(FadeIn(l0[2], scale=1.3), co.plan(0, 1, BLEU_P2, bouts=False).animate.set_stroke(width=16),
                    co.reel(0, 4, "#86efac", bouts=False).animate.set_stroke(width=14), run_time=0.4)
            sc.au_mot("pour 1 cm")
            sc.play(FadeIn(l0[3], shift=UP * 0.15), run_time=0.3)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse",
                            ["Sur un plan,", "5 cm représentent 20 m.", "Que représente 1 cm ?"],
                            [self.t("4 m", 34), self.t("100 m", 34), self.t("15 m", 34)], 0,
                            ["20 ÷ 5 = 4 m pour 1 cm."], mot_q="Sur un plan", autres_r=apres)

    # ── 04 : le piège : pas de soustraction (3 → 1 et 12 → 10, faux) ────────
    def ecran_piege(self):
        self.ecran("04-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-2.9, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        tb = TableauProp(["Plan (cm)", "Réalité (m)"], [[3, 1], [12, 10]], montrer=False, largeur_case=1.6,
                         largeur_libelle=3.2, hauteur=0.95, fs=42, centre=P(-2.7, 0.35))
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.4)
        L0 = self.lc([("Une soustraction ?", ROUGE_ERREUR)], 2.3)
        self.au_mot("soustraction")
        self.play(FadeIn(L0, scale=1.2), run_time=0.4)
        L1 = self.lc([("3 cm", BLEU_CALCUL), ("→", WHITE), ("12 m", VERT_OK)], 1.4)
        self.au_mot("3 cm pour")
        self.play(FadeIn(L1[0], scale=1.3), FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.35)
        self.au_mot("12 m")
        self.play(FadeIn(L1[1]), FadeIn(L1[2], scale=1.3), FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.35)
        L2 = self.lc([("1 cm", BLEU_CALCUL), ("→", WHITE), ("10 m", ROUGE_ERREUR)], 0.55)
        h_faux = sans(tb.fleche_col(0, 1, "− 2", ligne=0, couleur=ROUGE_P))
        b_faux = sans(tb.fleche_col(0, 1, "− 2", ligne=1, couleur=ROUGE_P))
        self.au_mot("1 cm pour")
        self.play(FadeIn(L2[0], scale=1.3), FadeIn(tb.valeur(0, 1), scale=1.4), Create(h_faux.fleche),
                  FadeIn(h_faux.etiquette), run_time=0.4)
        dix = tb.valeur(1, 1, ROUGE_P)
        self.au_mot("10 m")
        self.play(FadeIn(L2[1]), FadeIn(L2[2], scale=1.3), FadeIn(dix, scale=1.4), Create(b_faux.fleche),
                  FadeIn(b_faux.etiquette), run_time=0.4)
        cr1, cr2 = croix(L2, sw=6), tb.barrer(1, 1)
        self.play(Create(cr1), Create(cr2), run_time=0.4)
        L3 = self.lc([("On divise :", AMBRE)], -0.35)
        h_ok = tb.fleche_col(0, 1, "÷ 3", ligne=0, couleur=AMBRE)
        b_ok = tb.fleche_col(0, 1, "÷ 3", ligne=1, couleur=AMBRE)
        self.au_mot("On divise")
        self.play(FadeIn(L3, shift=RIGHT * 0.2), FadeOut(h_faux), FadeOut(b_faux), FadeOut(dix), FadeOut(cr2),
                  run_time=0.4)
        L4 = self.lc([("12 ÷ 3 =", WHITE), ("4 m", VERT_OK)], -1.2, fs=44)
        self.au_mot("12 divisé")
        self.play(FadeIn(L4[0], shift=RIGHT * 0.2), Create(h_ok.fleche), Create(b_ok.fleche), run_time=0.4)
        self.au_mot("par 3")
        self.play(FadeIn(h_ok.etiquette, scale=1.3), FadeIn(b_ok.etiquette, scale=1.3), run_time=0.35)
        quatre = tb.poser(1, 1, 4, VERT_R2)
        self.au_mot("égale 4")
        self.play(FadeIn(L4[1], scale=1.3), FadeIn(quatre, scale=1.5), tb.allumer(1, 1), run_time=0.4)
        self.insister(L4[1], 1.2, 0.2)
        self.attendre_voix()

    # ── 05 : QUESTION 2 (1 cm → 4 m ; pont de 7 cm) ─────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(self.plan_bleu(5.0, 3.2).move_to(P(-3.0, 0.5)), pont(1.25).move_to(P(-3.0, 0.5)))
        self.add(deco)
        co = Correspondance(0.42, 0.15, centre=P(-2.9, 0.3))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(co.fond), run_time=0.25)
            l0 = sc.ligne_rep(0, ["7 ×", "4 =", "28 m."])
            sc.au_mot("7 fois")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), Create(co.plan(0, 7)), Create(co.ticks(7)),
                    FadeIn(co.lab_p(0, 7, "7 cm"), scale=1.3), run_time=0.35)
            fl = co.fleche("× 4", 7, 28)
            sc.au_mot("4, égale")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3),
                    run_time=0.35)
            sc.au_mot("28 m")
            sc.play(FadeIn(l0[2], scale=1.3), Create(co.reel(0, 28)), FadeIn(co.lab_r(0, 28, "28 m"), scale=1.3),
                    run_time=0.45)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Sur le plan de Jade,", "1 cm représente 4 m.", "Un pont mesure 7 cm.",
                             "Combien mesure-t-il en vrai ?"],
                            [self.t("11 m", 34), self.t("28 m", 34), self.t("1,75 m", 34)], 1,
                            ["7 × 4 = 28 m."], mot_q="Sur le plan de Jade", autres_r=apres)

    # ── 06 : défi : terrain 40 m × 20 m, 1 cm → 5 m, périmètre sur le plan ──
    def terrain_reel(self, l, h, centre, fs=32):
        """Le terrain en vrai (vert) et ses deux longueurs (.l40, .l20)."""
        te = terrain(l, h).move_to(centre)
        l40 = gras("40 m", fs, VERT_OK).next_to(te.r, DOWN, buff=0.15)
        l20 = gras("20 m", fs, VERT_OK).next_to(te.r, LEFT, buff=0.15)
        te.l40, te.l20 = l40, l20
        return te

    def ecran_defi(self):
        self.ecran("06-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.au_mot("À toi de jouer")
        self.play(Write(tit), run_time=0.6)
        te = self.terrain_reel(4.4, 2.2, P(-2.75, 0.55), fs=36)
        self.au_mot("Un terrain")
        self.play(FadeIn(te, scale=0.9), run_time=0.5)
        self.au_mot("40 m")
        self.play(FadeIn(te.l40, scale=1.3), Indicate(te.r, color=VERT_OK, scale_factor=1.03), run_time=0.45)
        self.au_mot("20 m")
        self.play(FadeIn(te.l20, scale=1.3), run_time=0.4)
        car = cartouche("1 cm", "5 m", 40)
        self.col(car, 2.3, 1.5)
        self.au_mot("1 cm")
        self.play(Create(car.cadre), FadeIn(car.cm, scale=1.3), run_time=0.35)
        self.au_mot("5 m")
        self.play(FadeIn(car.fl, shift=RIGHT * 0.2), FadeIn(car.reel, scale=1.3), run_time=0.4)
        L1 = self.lc([("Périmètre", WHITE), ("sur le plan :", WHITE)], 1.1, fs=38, xl=1.5)
        L2 = self.lc([("? cm", ORANGE_RETENUE)], 0.3, fs=48, xl=1.5)
        L2[0].sans_synchro = True
        self.au_mot("périmètre")
        self.play(FadeIn(L1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("rectangle dessiné")
        self.play(FadeIn(L2, scale=1.3), run_time=0.4)
        self.play(Indicate(L2, color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.5)
        self.pause_defi(y=-0.75)

    def ecran_correction(self):
        self.ecran("06b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        te = self.terrain_reel(2.6, 1.3, P(-3.75, 1.45), fs=28)
        self.add(te, sans(VGroup(te.l40, te.l20)))
        self.play(Write(tit), run_time=0.5)
        u = 0.42                           # 1 cm du plan à l'écran
        pl = Rectangle(width=8 * u, height=4 * u, stroke_color=BLEU_P, stroke_width=8, fill_color="#eff6ff",
                       fill_opacity=1).move_to(P(-2.6, -1.25))
        fl = CurvedArrow(te.r.get_right() + P(0.1, -0.2), pl.get_top() + P(0.6, 0.1), angle=-0.8, color=AMBRE_F,
                         stroke_width=6, tip_length=0.22)
        et = gras("÷ 5", 34, AMBRE).next_to(fl.point_from_proportion(0.5), RIGHT, buff=0.12)
        L1 = self.lc([("40 ÷", WHITE), ("5 =", WHITE), ("8 cm", BLEU_CALCUL)], 2.2, fs=42)
        self.au_mot("40 divisé")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.2), Indicate(te.l40, color=VERT_OK), Create(fl), run_time=0.4)
        self.au_mot("par 5")
        self.play(FadeIn(L1[1], shift=RIGHT * 0.2), FadeIn(et, scale=1.3), run_time=0.35)
        l8 = gras("8 cm", 32, BLEU_P2).next_to(pl, DOWN, buff=0.12)
        bas = Line(pl.get_corner(DL), pl.get_corner(DR), color=BLEU_P, stroke_width=8)
        self.au_mot("égale 8")
        self.play(FadeIn(L1[2], scale=1.3), FadeIn(pl), Create(bas), FadeIn(l8, scale=1.3), run_time=0.5)
        L2 = self.lc([("20 ÷ 5 =", WHITE), ("4 cm", BLEU_CALCUL)], 1.35, fs=42)
        self.au_mot("20 divisé")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.2), Indicate(te.l20, color=VERT_OK), run_time=0.4)
        l4 = gras("4 cm", 32, BLEU_P2).next_to(pl, LEFT, buff=0.12)
        self.au_mot("égale 4 cm")
        self.play(FadeIn(L2[1], scale=1.3), FadeIn(l4, scale=1.3), run_time=0.45)
        L3 = self.lc([("Périmètre :", WHITE)], 0.45, fs=40)
        self.au_mot("Le périmètre")
        self.play(FadeIn(L3, shift=RIGHT * 0.2), run_time=0.35)
        cotes = [Line(a, b, color=AMBRE, stroke_width=12) for a, b in (
            (pl.get_corner(UL), pl.get_corner(UR)), (pl.get_corner(UR), pl.get_corner(DR)),
            (pl.get_corner(DR), pl.get_corner(DL)), (pl.get_corner(DL), pl.get_corner(UL)))]
        L4 = self.lc([("8 +", WHITE), ("4 +", WHITE), ("8 +", WHITE), ("4", WHITE)], -0.35, fs=42)
        L5 = self.lc([("=", WHITE), ("24 cm", VERT_OK)], -1.2, fs=46)
        for k, (mot, n) in enumerate((("8 plus", 1), ("4 plus", 1), ("8 plus", 2), ("4, égale", 1))):
            self.au_mot(mot, n)
            self.play(FadeIn(L4[k], shift=RIGHT * 0.15), Create(cotes[k]), run_time=0.3)
        self.au_mot("24 cm")
        self.play(FadeIn(L5[0]), FadeIn(L5[1], scale=1.3), run_time=0.4)
        self.insister(L5[1], 1.25, 0.25)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.65)
        co = Correspondance(0.6, 0.6, long_reel=2.4, centre=ORIGIN)
        fig = VGroup(co.fond, co.plan(0, 1), co.lab_p(0, 1, "1 cm"), co.reel(0, 4), co.lab_r(0, 4, "4 m"))
        fl = co.fleche("× 4", 1, 4)
        fig.add(fl)
        sans(fig)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Retrouver l'échelle :", "chercher ce que vaut 1 cm."),
            ("Longueur réelle ÷ longueur", "du plan = ce que vaut 1 cm."),
            ("Vers la réalité : on multiplie.", "Vers le plan : on divise.")], fs=34)
        sans(lignes[1][1][1])  # « … = ce que vaut 1 cm » : le rappel du « 1 cm » dit juste avant
        self.au_mot("Pour retrouver")
        self.montrer_ligne(lignes[0], Indicate(fig[1], color=BLEU_P2))
        self.au_mot("on divise la")
        self.montrer_ligne(lignes[1])
        self.au_mot("Puis on multiplie")
        self.montrer_ligne(lignes[2], Indicate(fl, color=AMBRE))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_retrouver()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")


class PropEchelleDefi6e(PropEchelleDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
