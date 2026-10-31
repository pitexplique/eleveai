# prop_grandeur_produit_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 14 « Les kilowattheures »
# (micro grandeur_produit, notion grandeur_composee). CEINTURE BLANCHE (règle
# du short blanc, REGLES.md) : on VOIT la notion. Il AMUSE : combien de
# chambres tiennent sur un terrain de foot ? → 714 !
#   · EN HAUT, l'image : le terrain de foot (105 m sur 68 m), puis les 714
#     chambres qui le pavent (42 colonnes de 2,5 m × 17 rangées de 4 m : 10 m²
#     chacune ; les dimensions des chambres ne sont ni dites ni écrites) ;
#   · EN BAS, au même instant : 105 m × 68 m = 7 140 m², et sous l'opération
#     la ligne des UNITÉS alignée (m × m = m²) ; puis 7 140 ÷ 10 = 714 ;
#   · 1 question-pause (3 s) : l'unité de 105 m × 68 m ? (m² ; leurres : m,
#     m³) ;
#   · fin : un terrain de basket de 28 m sur 15 m : son aire ? (420 m²) en
#     commentaire.
# Chiffres RÉELS : terrain recommandé par la FIFA 105 m × 68 m (FIFA, Football
# Stadiums — Technical recommendations and requirements, 5e éd. 2011 ; Lois du
# jeu IFAB pour les limites) ; terrain de basket FIBA 28 m × 15 m (FIBA,
# Règles officielles du basketball 2024, art. 2). Relevés le 31/10/2026 (brief
# du lot). Une chambre « d'environ 10 m² » : ordre de grandeur, dit « environ ».
# Centres d'intérêt : sport.
#
# Voix : manim/voix/4e-prop-grandeur-produit-short.json (validée le 31/10,
# débit −10) ; WAV : public/sons/4e-prop-grandeur-produit-short/ ; marques :
# manim/scripts/4e/prop_grandeur_produit_short_marques.json (ajoutée à la
# main : le « mètre » de « mètre carré » de 02-aire, jeté comme répétition).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/prop_grandeur_produit_short.py PropGrandeurProduitShort4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_grandeur_produit_short.py PropGrandeurProduitShort4e -o eleveai-maths-4e-prop-grandeur-produit-short --media_dir manim/media-prop-4e-14
# Sortie : manim/sorties/4e/maths/proportionnalite/14-grandeur-produit/eleveai-maths-4e-prop-grandeur-produit-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

AMBRE_U = "#fbbf24"   # les UNITÉS
BLEU_N = "#38bdf8"    # les NOMBRES
HERBE = "#15803d"
HERBE2 = "#22c55e"
BOIS = "#d97706"


def gras(s, fs, couleur):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def sans(m):
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def terrain(w=3.5, h=None, centre=ORIGIN):
    """Un terrain de foot vu de haut (105 × 68) : pelouse rayée, lignes
    blanches, rond central, surfaces de réparation, buts."""
    h = h or w * 68 / 105
    k = w / 105
    bandes = VGroup(*[Rectangle(width=w / 10, height=h, fill_color=HERBE if i % 2 else "#16a34a", fill_opacity=1,
                                stroke_width=0).move_to(P(-w / 2 + (i + 0.5) * w / 10, 0)) for i in range(10)])
    bord = Rectangle(width=w, height=h, stroke_color=WHITE, stroke_width=3)
    milieu = Line(P(0, -h / 2), P(0, h / 2), color=WHITE, stroke_width=2)
    rond = Circle(radius=9.15 * k, color=WHITE, stroke_width=2)
    surf = VGroup(*[Rectangle(width=16.5 * k, height=40.3 * k, stroke_color=WHITE, stroke_width=2).move_to(
        P(s * (w / 2 - 8.25 * k), 0)) for s in (-1, 1)])
    buts = VGroup(*[Rectangle(width=0.08, height=7.32 * k, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                    .move_to(P(s * (w / 2 + 0.04), 0)) for s in (-1, 1)])
    g = VGroup(bandes, bord, milieu, rond, surf, buts).move_to(centre)
    g.bord, g.pelouse = bord, bandes
    return g


def chambres(t, nx=42, ny=17):
    """Les 714 chambres (42 × 17) qui pavent le terrain t : une rangée = un VGroup."""
    w, h = t.bord.width / nx, t.bord.height / ny
    hg = t.bord.get_corner(UL)
    rangs = VGroup()
    for j in range(ny):
        rangs.add(VGroup(*[Rectangle(width=w, height=h, fill_color="#fde68a", fill_opacity=0.55,
                                     stroke_color="#78350f", stroke_width=0.8)
                           .move_to(hg + P((i + 0.5) * w, -(j + 0.5) * h)) for i in range(nx)]))
    return rangs


def lit(s=1.0):
    """Une chambre vue de haut : un lit (couette bleue, oreiller blanc)."""
    cadre = RoundedRectangle(width=0.55, height=0.85, corner_radius=0.06, fill_color="#92400e", fill_opacity=1,
                             stroke_width=0)
    couette = RoundedRectangle(width=0.47, height=0.55, corner_radius=0.05, fill_color="#3b82f6", fill_opacity=1,
                               stroke_width=0).move_to(P(0, -0.1))
    oreiller = RoundedRectangle(width=0.4, height=0.16, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                                stroke_width=0).move_to(P(0, 0.28))
    return VGroup(cadre, couette, oreiller).scale(s)


def basket(w=3.4, centre=ORIGIN):
    """Un terrain de basket vu de haut (28 × 15) : parquet, lignes, paniers."""
    h = w * 15 / 28
    k = w / 28
    fond = Rectangle(width=w, height=h, fill_color=BOIS, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    milieu = Line(P(0, -h / 2), P(0, h / 2), color=WHITE, stroke_width=2)
    rond = Circle(radius=1.8 * k, color=WHITE, stroke_width=2)
    raquettes = VGroup(*[Rectangle(width=5.8 * k, height=4.9 * k, fill_color="#b91c1c", fill_opacity=0.8,
                                   stroke_color=WHITE, stroke_width=2).move_to(P(s * (w / 2 - 2.9 * k), 0))
                         for s in (-1, 1)])
    paniers = VGroup(*[Circle(radius=0.07, color="#f97316", stroke_width=4).move_to(P(s * (w / 2 - 1.6 * k), 0))
                       for s in (-1, 1)])
    g = VGroup(fond, raquettes, milieu, rond, paniers).move_to(centre)
    g.bord = fond
    return g


class PropGrandeurProduitShort4e(ShortProp):
    nom_voix = "4e-prop-grandeur-produit-short"
    fichier_marques = "prop_grandeur_produit_short_marques.json"
    ceinture = "blanche"

    def montre(self, mot, *anims, rt=0.4, n=1):
        self.au_mot(mot, n)
        self.play(*anims, run_time=rt)

    def mots(self, lg, mots, avec=None, rt=0.3):
        avec = avec or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                if isinstance(mot, tuple):
                    self.au_mot(*mot)
                else:
                    self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.12), *avec.get(i, []), run_time=rt)

    def cote_b(self, t, s, fs=26):
        return gras(s, fs, BLEU_N).next_to(t.bord, DOWN, buff=0.12)

    def cote_g(self, t, s, fs=26):
        return gras(s, fs, BLEU_N).rotate(PI / 2).next_to(t.bord, LEFT, buff=0.1)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le terrain de foot", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [margo, titre, badge]
        T = terrain(3.5, centre=P(0.12, 0.95))

        # ── 00 : l'accroche : combien de chambres sur un terrain de foot ? ──
        self.dire("00-accroche")
        self.montre("Combien", Write(titre), rt=0.5)
        li = lit(1.1).move_to(P(-0.9, -1.15))
        q = Text("?", font_size=120, color=AMBRE, weight=BOLD).move_to(P(0.7, -1.2))
        self.montre("chambres", FadeIn(li, scale=0.6), rt=0.4)
        self.montre("terrain de foot", FadeIn(T, scale=0.85), rt=0.5)
        self.play(FadeIn(q, scale=0.4), run_time=0.35)
        self.insister(q, 1.2)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(li), FadeOut(q), run_time=0.3)

        # ── 01 : le terrain FIFA : 105 m sur 68 m ──
        self.dire("01-terrain")
        L1 = sans(self.borne(gras("Terrain recommandé par la FIFA", 26, JAUNE_TITRE), 0.6)).move_to(P(0, -0.85))
        self.montre("FIFA", FadeIn(L1, shift=UP * 0.12), Indicate(T.bord, color=JAUNE_TITRE), rt=0.5)
        L2 = self.ligne([("105 m", BLEU_N), ("de long,", WHITE), ("68 m", BLEU_N), ("de large", WHITE)], 30)
        self.borne(L2, 0.6).move_to(P(0, -1.5))
        self.mots(L2, ["105 m", "de long", "68 m", "de large"],
                  {0: [FadeIn(self.cote_b(T, "105 m"), scale=1.3)], 2: [FadeIn(self.cote_g(T, "68 m"), scale=1.3)]})
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(L1), FadeOut(L2), run_time=0.3)

        # ── 02 : l'aire : 105 m × 68 m = 7 140 m² ; m × m = m² ──
        self.dire("02-aire")
        A = sans(gras("Son aire :", 32, WHITE)).move_to(P(0, -0.85))
        self.montre("Son aire", FadeIn(A, shift=UP * 0.12), T.pelouse.animate.set_opacity(0.7), rt=0.4)
        L = self.ligne([("105 m", WHITE), ("×", WHITE), ("68 m", WHITE), ("=", WHITE), ("7 140 m²", VERT_OK)], 34)
        self.borne(L, 0.5).move_to(P(0, -1.5))
        self.mots(L, ["105 mètres", "fois 68", "68 mètres", "égale", "7 140"], rt=0.28)
        self.play(T.pelouse.animate.set_opacity(1), Circumscribe(T.bord, color=VERT_OK, buff=0.04), run_time=0.6)
        U = VGroup(*[gras(s, 34, AMBRE_U).move_to(P(m.get_x(), L.get_y() - 0.62))
                     for s, m in zip(["m", "×", "m", "=", "m²"], L)])
        for m, mot in zip(U, ["Mètre fois", "fois mètre", "mètre :", "mètre carré", ("carré", 2)]):
            mt, n = mot if isinstance(mot, tuple) else (mot, 1)
            self.montre(mt, FadeIn(m, scale=1.3), rt=0.25, n=n)
        cad = SurroundingRectangle(U, color=AMBRE_U, buff=0.12, corner_radius=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.35)
        self.insister(VGroup(cad, U), 1.08)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(A, L, U, cad)), run_time=0.3)

        # ── 03 : 7 140 ÷ 10 = 714 chambres sur la pelouse ──
        self.dire("03-chambres")
        li = lit(0.5).move_to(P(-1.6, -0.95))
        C1 = self.ligne([("1 chambre", WHITE), ("≈", WHITE), ("10 m²", BLEU_N)], 32)
        C1.scale_to_fit_width(min(C1.width, 3.0)).move_to(P(0, -0.95)).align_to(P(-1.15, 0), LEFT)
        sans(C1[0])
        self.mots(C1, ["Une chambre", "environ", "10 mètres"], {0: [FadeIn(li, scale=0.6)]})
        R = chambres(T)
        C2 = self.ligne([("7 140", WHITE), ("÷", WHITE), ("10", WHITE), ("=", WHITE), ("714", VERT_OK)], 36)
        self.borne(C2, 0.6).move_to(P(0, -1.65))
        self.montre("7 140", FadeIn(C2[0], shift=UP * 0.12), rt=0.3)
        self.play(LaggedStart(*[FadeIn(r) for r in R], lag_ratio=0.15), run_time=1.0)
        self.mots(C2[1:], ["divisé", "par 10", "égale", "714"], rt=0.28)
        C3 = self.borne(gras("714 chambres !", 40, VERT_OK), 1.0).move_to(P(0, -2.3))
        self.montre("714 chambres", FadeIn(C3, scale=1.3), rt=0.4)
        self.montre("sur la pelouse", Circumscribe(T.bord, color=VERT_OK, buff=0.05), rt=0.6)
        self.insister(C3, 1.06)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 04 : la question-pause (3 s) ──
        self.question_pause("04-question", "04b-reponse",
                            ["105 m × 68 m :", "l'unité du résultat ?"],
                            [self.t("m", 34), self.t("m²", 34), self.t("m³", 34)], 1,
                            ["Deux longueurs multipliées", "donnent des m²."], mot_q="105 mètres")
        self.vider(garder)

        # ── 05 : la question en commentaire : le terrain de basket ──
        self.dire("05-commentaire")
        B = basket(3.3, centre=P(0.12, 1.0))
        self.montre("Et toi", FadeIn(B, scale=0.85), rt=0.45)
        Q1 = self.ligne([("Basket :", WHITE), ("28 m", BLEU_N), ("sur", WHITE), ("15 m", BLEU_N)], 32)
        self.borne(Q1, 0.6).move_to(P(0, -0.65))
        self.mots(Q1, ["Un terrain de basket", "28 m", None, "15 m"],
                  {1: [FadeIn(self.cote_b(B, "28 m"), scale=1.3)], 3: [FadeIn(self.cote_g(B, "15 m"), scale=1.3)]})
        Q2 = self.ligne([("Son aire :", WHITE), ("? m²", ORANGE_RETENUE)], 36).move_to(P(0, -1.3))
        sans(Q2)
        self.montre("Quelle est son aire", FadeIn(Q2, shift=UP * 0.12), B.bord.animate.set_fill(opacity=0.75), rt=0.4)
        self.insister(Q2[1], 1.25)
        self.appel_commentaire(y=-2.0)
