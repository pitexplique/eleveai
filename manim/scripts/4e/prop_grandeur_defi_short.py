# prop_grandeur_defi_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 19 « Défis sur les grandeurs
# composées » (micro grandeur_defi, notion grandeur_composee). CEINTURE
# BLANCHE (règle du short blanc, REGLES.md). Il AMUSE : le plus gros paquet
# n'est pas toujours le moins cher au kilo !
#   · EN HAUT, l'image : deux paquets de céréales (500 g à 3 €, 750 g à
#     4,80 €) ; le petit se double (2 paquets = 1 kg), le gros se coupe en 3
#     tranches de 250 g ;
#   · EN BAS, au même instant : 3 € × 2 = 6 €/kg ; 4,80 € ÷ 3 = 1,60 €,
#     × 4 = 6,40 €/kg ; les deux prix au kilo restent sous leurs paquets ;
#   · la surprise : le petit est moins cher au kilo ;
#   · 1 question-pause (3 s) : 1 kg à 5 € ou 2 kg à 11 € → le paquet de 1 kg
#     (11 ÷ 2 = 5,50 €/kg) ; leurres : le gros (« plus gros = moins cher »),
#     « c'est pareil » ;
#   · fin : jus d'orange 1,5 L à 2,70 € ou 2 L à 3,40 € : le moins cher au
#     litre ? (1,80 €/L contre 1,70 €/L : la bouteille de 2 L) en commentaire.
# Tous les prix sont inventés (aucun chiffre réel).
# Centres d'intérêt : argent-budget, cuisine.
#
# Voix : manim/voix/4e-prop-grandeur-defi-short.json (validée, débit −10) ;
# WAV : public/sons/4e-prop-grandeur-defi-short/ ; marques :
# manim/scripts/4e/prop_grandeur_defi_short_marques.json (une marque par
# occurrence).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/prop_grandeur_defi_short.py PropGrandeurDefiShort4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_grandeur_defi_short.py PropGrandeurDefiShort4e -o eleveai-maths-4e-prop-grandeur-defi-short --media_dir manim/media-prop-4e-19
# Sortie : manim/sorties/4e/maths/proportionnalite/19-grandeur-defi/eleveai-maths-4e-prop-grandeur-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import gras, sans  # noqa: E402
from prop_grandeur_unite import UNITE_C  # noqa: E402

ORANGE_J = "#fb923c"
ROUGE_C = "#ef4444"


def paquet(l=0.75, h=1.0, couleur="#2563eb"):
    """Un paquet de céréales : la boîte, une bande, un bol de flocons."""
    boite = Rectangle(width=l, height=h, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    bande = Rectangle(width=l, height=h * 0.16, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(
        boite.get_top() + DOWN * h * 0.17)
    bol = Sector(radius=l * 0.3, angle=-PI, start_angle=0, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    bol.move_to(boite.get_center() + DOWN * h * 0.12)
    flocons = VGroup(*[Ellipse(width=l * 0.12, height=l * 0.08, fill_color="#f59e0b", fill_opacity=1,
                               stroke_width=0).move_to(bol.get_top() + P(dx * l, 0.03)) for dx in (-0.15, 0, 0.15)])
    g = VGroup(boite, bande, bol, flocons)
    g.boite = boite
    return g


def bouteille(h=1.3, couleur=ORANGE_J):
    """Une bouteille de jus d'orange : le corps, le goulot, le bouchon, le jus."""
    corps = RoundedRectangle(width=h * 0.42, height=h * 0.75, corner_radius=0.08, fill_color="#e0f2fe",
                             fill_opacity=0.25, stroke_color=WHITE, stroke_width=3)
    jus = RoundedRectangle(width=h * 0.38, height=h * 0.62, corner_radius=0.06, fill_color=couleur, fill_opacity=1,
                           stroke_width=0).align_to(corps, DOWN).shift(UP * 0.03)
    goulot = Rectangle(width=h * 0.16, height=h * 0.16, fill_color="#e0f2fe", fill_opacity=0.25, stroke_color=WHITE,
                       stroke_width=3).next_to(corps, UP, buff=0)
    bouchon = Rectangle(width=h * 0.2, height=h * 0.08, fill_color="#16a34a", fill_opacity=1,
                        stroke_width=0).next_to(goulot, UP, buff=0)
    return VGroup(jus, corps, goulot, bouchon)


class PropGrandeurDefiShort4e(ShortProp):
    nom_voix = "4e-prop-grandeur-defi-short"
    fichier_marques = "prop_grandeur_defi_short_marques.json"
    ceinture = "blanche"
    XP, XG, YP = -1.1, 1.05, 1.3     # les deux paquets

    def question_pause(self, *a, **k):
        """Les choix, audités quand ils entrent, ne le sont plus pendant la
        réponse (la carte juste s'agrandit)."""
        avant = k.pop("autres_q", None)

        def figer(sc):
            for c in sc.cartes_q:
                for f in c.get_family():
                    if isinstance(f, Text):
                        f._pas_audit = True
            if avant:
                avant(sc)
        return super().question_pause(*a, autres_q=figer, **k)

    def mots(self, lg, mots, avec=None):
        avec = avec or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                if isinstance(mot, tuple):
                    self.au_mot(*mot)
                else:
                    self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.12), *avec.get(i, []), run_time=0.3)

    def lig(self, morceaux, y, fs=32):
        return self.borne(self.ligne(morceaux, fs), 0.9).move_to(P(0, y))

    def lab(self, s, x, y, couleur=WHITE, fs=30):
        return gras(s, fs, couleur).move_to(P(x, y))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Prix au kilo", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        pt = paquet(0.75, 1.0, "#2563eb").move_to(P(self.XP, self.YP - 0.2))
        gr = paquet(1.05, 1.45, "#dc2626").move_to(P(self.XG, self.YP))
        garder = [margo, titre, badge, pt, gr]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        q = VGroup(self.t("Le plus gros paquet", 34), self.t("est-il toujours", 34),
                   self.t("le moins cher ?", 36, AMBRE)).arrange(DOWN, buff=0.12)
        self.borne(q, 0.85).move_to(P(0, -1.0))
        self.au_mot("Le plus")
        self.play(Write(titre), FadeIn(pt, shift=UP * 0.2), run_time=0.5)
        self.au_mot("gros paquet")
        self.play(GrowFromEdge(gr, DOWN), FadeIn(q[0], shift=UP * 0.12), run_time=0.45)
        self.au_mot("est-il")
        self.play(FadeIn(q[1], shift=UP * 0.12), run_time=0.3)
        self.au_mot("le moins")
        self.play(FadeIn(q[2], scale=1.15), run_time=0.35)
        self.insister(q[2], 1.15)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(q), run_time=0.3)

        # ── 01 : les deux paquets ──
        self.dire("01-paquets")
        mp, pp = self.lab("500 g", self.XP, 0.25), self.lab("3 €", self.XP, -0.2, AMBRE)
        mg, pg = self.lab("750 g", self.XG, 0.25), self.lab("4,80 €", self.XG, -0.2, AMBRE)
        self.au_mot("Des céréales")
        self.play(Indicate(pt, scale_factor=1.08), Indicate(gr, scale_factor=1.08), run_time=0.6)
        self.au_mot("petit paquet")
        self.play(Circumscribe(pt, color=WHITE, buff=0.06), run_time=0.5)
        self.au_mot("500")
        self.play(FadeIn(mp, shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 euros")
        self.play(FadeIn(pp, scale=1.2), run_time=0.3)
        self.au_mot("gros paquet")
        self.play(Circumscribe(gr, color=WHITE, buff=0.06), run_time=0.5)
        self.au_mot("750")
        self.play(FadeIn(mg, shift=UP * 0.1), run_time=0.3)
        self.au_mot("4,80")
        self.play(FadeIn(pg, scale=1.2), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : on ramène au kilo ──
        self.dire("02-kilo")
        H = self.lig([("On ramène au kilo", AMBRE)], -0.75, fs=34)
        self.au_mot("On ramène")
        self.play(FadeIn(H, shift=UP * 0.12), run_time=0.35)
        double = pt.copy().set_opacity(0.55).shift(P(0.25, 0.18))
        L1 = self.lig([("Petit :", WHITE), ("2 paquets", WHITE), ("= 1 kg", WHITE)], -1.35)
        self.mots(L1, ["Le petit", "2 paquets", "1 kg"],
                  {1: [FadeIn(double, shift=RIGHT * 0.25)], 2: [Circumscribe(VGroup(pt, double), color=WHITE)]})
        L2 = self.lig([("3 € × 2", WHITE), ("=", WHITE), ("6 €/kg", VERT_OK)], -1.95, fs=34)
        self.mots(L2, ["3 fois", "égale", "6 euros"])
        self.insister(L2[2], 1.2)
        self.play(FadeOut(VGroup(L1, L2[:2], double)), L2[2].animate.scale(0.9).move_to(P(self.XP, -0.7)),
                  FadeOut(H), run_time=0.45)
        tr = VGroup(*[DashedLine(gr.boite.get_left() + UP * dy, gr.boite.get_right() + UP * dy, color=WHITE,
                                 stroke_width=4, dash_length=0.08) for dy in (gr.boite.height / 6, -gr.boite.height / 6)])
        tr.shift(UP * (gr.boite.get_center()[1] - tr.get_center()[1]))
        h3 = gr.boite.height / 3
        tranche = Rectangle(width=gr.boite.width, height=h3, fill_color=AMBRE, fill_opacity=0.55,
                            stroke_width=0).move_to(gr.boite.get_top() + DOWN * h3 / 2)
        L3 = self.lig([("Gros : 4,80 € ÷ 3", WHITE), ("= 1,60 €", WHITE)], -1.35)
        self.mots(L3, ["Le gros", "égale 1,60"], {0: [Create(tr)]})
        t250 = gras("250 g", 26, WHITE).move_to(tranche)
        self.au_mot("250 g")
        self.play(FadeIn(tranche), FadeIn(t250, scale=1.2), run_time=0.4)
        L4 = self.lig([("× 4 :", WHITE), ("6,40 €/kg", ROUGE_C)], -1.95, fs=34)
        self.mots(L4, ["Fois 4", "6,40"], {0: [Indicate(gr, scale_factor=1.06)]})
        self.insister(L4[1], 1.2)
        self.play(FadeOut(VGroup(L3, L4[0], tranche, t250, tr)), L4[1].animate.scale(0.9).move_to(P(self.XG, -0.7)),
                  run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 03 : la surprise ──
        self.dire("03-surprise")
        S = VGroup(gras("Le petit paquet", 34, VERT_OK), gras("est moins cher", 34, VERT_OK),
                   gras("au kilo !", 34, VERT_OK)).arrange(DOWN, buff=0.1)
        cadre = SurroundingRectangle(S, color=VERT_OK, buff=0.16, corner_radius=0.12, stroke_width=5)
        sur = VGroup(cadre, S).move_to(P(0, -1.65))
        self.borne(sur, 0.88)
        self.au_mot("Surprise")
        self.play(Flash(pt, color=VERT_OK, line_length=0.25), Circumscribe(L2[2], color=VERT_OK), run_time=0.6)
        self.au_mot("le petit")
        self.play(FadeIn(sur, scale=1.2), pt.animate.scale(1.12), run_time=0.45)
        self.play(pt.animate.scale(1 / 1.12), run_time=0.25)
        self.attendre_voix(marge=0.2)
        self.vider([margo, titre, badge])

        # ── 04 : la question-pause (3 s) ──
        self.question_pause("04-question", "04b-reponse",
                            ["1 kg à 5 €, ou 2 kg à 11 € :", "le moins cher au kilo ?"],
                            [self.t("le 1 kg", 28), self.t("le 2 kg", 28),
                             self.t("c'est pareil", 28)], 0,
                            ["11 ÷ 2 = 5,50 €/kg :", "plus cher que 5 € !"], mot_q="Un paquet")
        self.vider([margo, titre, badge])

        # ── 05 : la question en commentaire : le jus d'orange ──
        self.dire("05-commentaire")
        b1 = bouteille(1.25).move_to(P(-1.05, 1.3))
        b2 = bouteille(1.6).move_to(P(1.05, 1.4))
        self.au_mot("Du jus")
        self.play(FadeIn(b1, shift=UP * 0.2), FadeIn(b2, shift=UP * 0.2), run_time=0.45)
        v1, p1 = self.lab("1,5 L", -1.05, 0.15), self.lab("2,70 €", -1.05, -0.3, AMBRE)
        v2, p2 = self.lab("2 L", 1.05, 0.15), self.lab("3,40 €", 1.05, -0.3, AMBRE)
        self.au_mot("1,5")
        self.play(FadeIn(v1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("2,70")
        self.play(FadeIn(p1, scale=1.2), run_time=0.3)
        self.au_mot("2 litres")
        self.play(FadeIn(v2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("3,40")
        self.play(FadeIn(p2, scale=1.2), run_time=0.3)
        Q = self.lig([("Le moins cher", WHITE), ("au litre ?", AMBRE)], -0.95, fs=34)
        self.mots(Q, ["Lequel", "au litre"])
        self.insister(Q[1], 1.2)
        self.appel_commentaire(y=-1.7)
