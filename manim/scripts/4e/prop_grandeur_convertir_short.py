# prop_grandeur_convertir_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 17 « Convertir des
# grandeurs » (micro grandeur_convertir, notion grandeur_composee).
# CEINTURE BLANCHE (règle du short blanc, REGLES.md). Il AMUSE : Usain Bolt
# court-il plus vite qu'une voiture en ville ?
#   · EN HAUT, l'image : la piste de 100 m que Bolt avale, puis la zone 30 où
#     il double la voiture ;
#   · EN BAS, au même instant : 10 m en 1 s → 36 000 m en 1 h (1 h = 3 600 s,
#     tableau × 3 600) → 36 km/h ; à la fin, 10 m/s et 36 km/h écrits l'un
#     sous l'autre, nombres et UNITÉS alignés ;
#   · 1 question-pause (3 s) : 10 m/s = combien de km/h ? B 36 ; leurres :
#     10 (ne pas convertir), 600 (1 h = 60 s, une seule conversion) ;
#   · fin : une cycliste roule à 5 m/s : combien de km/h ? (18) en commentaire.
# Chiffres réels : Usain Bolt, 100 m en 9,58 s, Berlin, 16/08/2009, record du
# monde toujours valable (World Athletics, relevé le 31/10/2026) ; 100 ÷ 9,58
# ≈ 10,4 m/s, « environ 10 m/s ». Zones 30 en ville (Code de la route).
# Centres d'intérêt : sport, transports.
#
# Voix : manim/voix/4e-prop-grandeur-convertir-short.json (validée, débit
# −10) ; WAV : public/sons/4e-prop-grandeur-convertir-short/ ; marques :
# manim/scripts/4e/prop_grandeur_convertir_short_marques.json (une marque par
# occurrence, chaque mot d'un groupe « 3 600 secondes » daté).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/prop_grandeur_convertir_short.py PropGrandeurConvertirShort4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_grandeur_convertir_short.py PropGrandeurConvertirShort4e -o eleveai-maths-4e-prop-grandeur-convertir-short --media_dir manim/media-prop-4e-17
# Sortie : manim/sorties/4e/maths/proportionnalite/17-grandeur-convertir/eleveai-maths-4e-prop-grandeur-convertir-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import gras, sans  # noqa: E402
from prop_grandeur_unite import UNITE_C, voiture  # noqa: E402
from prop_grandeur_quotient import cycliste  # noqa: E402

JAUNE_B = "#facc15"    # le maillot de Bolt
VERT_B = "#16a34a"
PISTE = "#c2410c"
ARDOISE_S = "#94a3b8"


def coureur(s=1.0):
    """Un sprinteur en pleine foulée (vers la droite) : maillot jaune, short vert."""
    peau = "#5c3a21"
    tete = Circle(radius=0.17, fill_color=peau, fill_opacity=1, stroke_width=0).move_to(P(0.22, 0.95))
    buste = Line(P(0.12, 0.75), P(-0.05, 0.2), color=JAUNE_B, stroke_width=16)
    short = Line(P(-0.03, 0.25), P(-0.08, 0.05), color=VERT_B, stroke_width=18)
    j1 = VMobject(stroke_color=peau, stroke_width=8).set_points_as_corners([P(-0.06, 0.08), P(0.3, -0.2),
                                                                           P(0.2, -0.6)])
    j2 = VMobject(stroke_color=peau, stroke_width=8).set_points_as_corners([P(-0.06, 0.08), P(-0.3, -0.25),
                                                                           P(-0.62, -0.32)])
    b1 = VMobject(stroke_color=peau, stroke_width=7).set_points_as_corners([P(0.1, 0.65), P(0.35, 0.4),
                                                                           P(0.55, 0.6)])
    b2 = VMobject(stroke_color=peau, stroke_width=7).set_points_as_corners([P(0.08, 0.65), P(-0.2, 0.45),
                                                                           P(-0.35, 0.2)])
    return VGroup(j2, b2, short, buste, j1, b1, tete).scale(s)


def panneau30(r=0.42):
    """Le panneau rond « 30 » (le nombre est posé à part, au mot)."""
    return Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#dc2626", stroke_width=10)


class PropGrandeurConvertirShort4e(ShortProp):
    nom_voix = "4e-prop-grandeur-convertir-short"
    fichier_marques = "prop_grandeur_convertir_short_marques.json"
    ceinture = "blanche"

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

    def _disposer_q(self, question, choix, phrase):
        """La phrase de réponse se pose sous la carte B (A et C s'effacent) :
        sous les trois cartes, elle descendait sur Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph.next_to(cartes[1], DOWN, buff=0.3).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def mots(self, lg, mots, avec=None):
        avec = avec or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                if isinstance(mot, tuple):
                    self.au_mot(*mot)
                else:
                    self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.12), *avec.get(i, []), run_time=0.3)

    def _rep_q(self, sc):
        sc.play(FadeOut(sc.cartes_q[0]), FadeOut(sc.cartes_q[2]), run_time=0.2)
        l0 = sc.ligne_rep(0, ["10 ×", "3 600 =", "36 000 m"])
        for m, mot in zip(l0, ["10 fois", "3 600", "36 000"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        l1 = sc.ligne_rep(1, ["en 1 h :", "36 km/h."])
        for m, mot in zip(l1, ["en 1", "36 kilomètres"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Bolt et les km/h", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche : Bolt contre une voiture en ville ──
        self.dire("00-accroche")
        b = coureur(1.0).move_to(P(-1.0, 1.0))
        v = voiture(1.0).move_to(P(1.05, 1.0))
        vs = sans(gras("ou", 30, WHITE).move_to(P(0.1, 1.1)))
        Q = VGroup(self.t("Usain Bolt court-il", 34), self.t("plus vite qu'une voiture", 34),
                   self.t("en ville ?", 36, AMBRE)).arrange(DOWN, buff=0.15).move_to(P(0, -1.0))
        self.borne(Q, 0.9)
        self.au_mot("Usain")
        self.play(Write(titre), FadeIn(b, shift=RIGHT * 0.3), FadeIn(Q[0], shift=UP * 0.12), run_time=0.5)
        self.au_mot("plus vite")
        self.play(FadeIn(Q[1], shift=UP * 0.12), FadeIn(vs), FadeIn(v, shift=LEFT * 0.3), run_time=0.4)
        self.au_mot("en ville")
        self.play(FadeIn(Q[2], scale=1.15), run_time=0.35)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 01 : le record : 100 m en 9,58 s, Berlin 2009 ──
        self.dire("01-record")
        x0, x1, y = -1.6, 1.6, 0.6
        piste = Rectangle(width=x1 - x0 + 0.3, height=0.9, fill_color=PISTE, fill_opacity=1, stroke_width=0)
        piste.move_to(P(0, y))
        couloirs = VGroup(*[Line(P(x0 - 0.15, y + d), P(x1 + 0.15, y + d), color=WHITE, stroke_width=2)
                            for d in (-0.45, 0, 0.45)])
        dep = Line(P(x0, y - 0.45), P(x0, y + 0.45), color=WHITE, stroke_width=5)
        arr = Line(P(x1, y - 0.45), P(x1, y + 0.45), color=WHITE, stroke_width=5)
        b = coureur(0.65).move_to(P(x0 + 0.3, y + 0.62))
        L1 = self.ligne([("En 2009,", WHITE), ("à Berlin", WHITE)], 34).move_to(P(0, -1.05))
        self.au_mot("En 2009")
        self.play(FadeIn(VGroup(piste, couloirs, dep, arr)), FadeIn(L1[0], shift=UP * 0.12), run_time=0.4)
        self.au_mot("Berlin")
        self.play(FadeIn(L1[1], shift=UP * 0.12), FadeIn(b, shift=UP * 0.2), run_time=0.35)
        acc = BraceBetweenPoints(P(x0, y - 0.5), P(x1, y - 0.5), DOWN, color=WHITE)
        l100 = gras("100 m", 26, WHITE).next_to(acc, DOWN, buff=0.05)
        L2 = self.ligne([("100 m", WHITE), ("en 9,58 s", AMBRE)], 38).move_to(P(0, -1.7))
        self.mots(L2, ["100 mètres", "9,58"], {0: [FadeIn(acc), FadeIn(l100)]})
        self.play(b.animate.move_to(P(x1 - 0.3, y + 0.62)), rate_func=linear, run_time=0.96)
        L3 = self.ligne([("Record du monde !", VERT_OK)], 34).move_to(P(0, -2.3))
        self.au_mot("record")
        self.play(FadeIn(L3, shift=UP * 0.12), Flash(b, color=JAUNE_B, line_length=0.2), run_time=0.45)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : 10 m en 1 s → 36 000 m en 1 h → 36 km/h ──
        self.dire("02-convertir")
        L0 = VGroup(gras("≈ 10", 40, WHITE), gras("m/s", 40, UNITE_C)).arrange(RIGHT, buff=0.15).move_to(P(0, 1.85))
        tb = TableauProp(["Temps (s)", "Distance (m)"], [[1, 3600], [10, 36000]], montrer=False, largeur_case=1.02,
                         largeur_libelle=1.7, hauteur=0.6, fs=24, centre=P(0, 0.1))
        un = sans(VGroup(tb.valeur(0, 0)))
        self.au_mot("10 mètres")
        self.play(FadeIn(L0[0], scale=1.2), FadeIn(tb.fond, shift=DOWN * 0.15), FadeIn(un),
                  FadeIn(tb.valeur(1, 0), scale=1.3), run_time=0.45)
        self.au_mot("par seconde")
        self.play(FadeIn(L0[1], shift=UP * 0.1), run_time=0.3)
        L1 = self.ligne([("1 h", WHITE), ("=", WHITE), ("3 600 s", AMBRE)], 36).move_to(P(0, -1.0))
        fh = tb.fleche_col(0, 1, "× 3 600", ligne=0)
        self.mots(L1, ["1 heure", None, "3 600 secondes"],
                  {2: [FadeIn(tb.valeur(0, 1), scale=1.3), Create(fh.fleche), FadeIn(fh.etiquette)]})
        L2 = self.ligne([("10 m ×", WHITE), ("3 600", WHITE), ("= 36 000 m", VERT_OK)], 34).move_to(P(0, -1.6))
        self.borne(L2, 0.92)
        self.mots(L2, [("10 mètres", 2), "fois 3", "36 000"],
                  {2: [FadeIn(tb.valeur(1, 1), scale=1.3), tb.allumer(1, 1)]})
        L3 = self.ligne([("= 36 km", VERT_OK)], 36).move_to(P(0, -2.2))
        self.au_mot("36 km")
        self.play(FadeIn(L3, scale=1.2), run_time=0.35)
        # la fin : 10 m/s et 36 km/h, nombres et unités ALIGNÉS
        n1, u1 = gras("10", 40, WHITE), gras("m/s", 40, UNITE_C)
        n2, u2 = gras("36", 40, VERT_OK), gras("km/h", 40, VERT_OK)
        eg = gras("=", 40, WHITE)
        sans(VGroup(n1, u1))
        n1.move_to(P(-0.35, -1.05), aligned_edge=RIGHT)
        n2.move_to(P(-0.35, -1.75), aligned_edge=RIGHT)
        u1.next_to(n1, RIGHT, buff=0.2).align_to(P(-0.1, 0), LEFT)
        u2.next_to(n2, RIGHT, buff=0.2).align_to(P(-0.1, 0), LEFT)
        eg.next_to(n2, LEFT, buff=0.3)
        fin = VGroup(n1, u1, eg, n2, u2)
        fin.set_x(0)
        cadre = SurroundingRectangle(fin, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=4)
        self.au_mot("Donc")
        self.play(FadeOut(VGroup(L1, L2, L3)), run_time=0.3)
        self.play(FadeIn(n1), FadeIn(u1), run_time=0.3)
        self.au_mot("36 kilomètres")
        self.play(FadeIn(eg), FadeIn(n2, scale=1.3), Create(cadre), run_time=0.4)
        self.au_mot("par heure")
        self.play(FadeIn(u2, shift=UP * 0.1), run_time=0.3)
        self.insister(VGroup(cadre, fin), 1.08)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 03 : la surprise : en zone 30, Bolt double les voitures ──
        self.dire("03-surprise")
        route = Rectangle(width=4.1, height=0.75, fill_color="#334155", fill_opacity=1, stroke_width=0)
        route.move_to(P(0, 0.75))
        tirets = DashedLine(P(-2.0, 0.75), P(2.0, 0.75), color=WHITE, stroke_width=3, dash_length=0.15)
        pan = panneau30(0.33).move_to(P(-1.45, 1.55))
        n30 = gras("30", 28, "#111827").move_to(pan)
        pied = Line(P(-1.45, 1.22), P(-1.45, 1.13), color=ARDOISE_S, stroke_width=5)
        v = voiture(0.75).move_to(P(-1.2, 0.95))
        b = coureur(0.6).move_to(P(-1.3, 0.65))
        L0 = self.ligne([("Zone à 30 km/h :", WHITE)], 34).move_to(P(0, -0.5))
        self.au_mot("Dans une")
        self.play(FadeIn(VGroup(route, tirets, pied)), FadeIn(pan, scale=0.7), FadeIn(v), FadeIn(b), run_time=0.4)
        self.au_mot("30")
        self.play(FadeIn(n30, scale=1.3), FadeIn(L0, shift=UP * 0.12), run_time=0.35)
        self.au_mot("par heure")
        self.play(v.animate.shift(RIGHT * 1.3), b.animate.shift(RIGHT * 2.0), rate_func=linear, run_time=0.75)
        L1 = self.ligne([("Bolt irait plus vite", WHITE)], 34).move_to(P(0, -1.15))
        self.au_mot("Bolt")
        self.play(FadeIn(L1, shift=UP * 0.12), v.animate.shift(RIGHT * 0.3), b.animate.shift(RIGHT * 0.6),
                  rate_func=linear, run_time=0.35)
        L2 = self.ligne([("que les voitures !", AMBRE)], 32).move_to(P(0, -1.8))
        self.au_mot("que les")
        self.play(FadeIn(L2, shift=UP * 0.12), Flash(b, color=JAUNE_B, line_length=0.2), run_time=0.45)
        self.insister(L2, 1.08)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 04 : la question-pause (3 s) ──
        self.question_pause("04-question", "04b-reponse",
                            ["10 m/s,", "ça fait combien", "de km/h ?"],
                            [self.t("10 km/h", 30), self.t("36 km/h", 30), self.t("600 km/h", 30)], 1,
                            ["10 × 3 600 = 36 000 m", "en 1 h : 36 km/h."], mot_q="10 mètres",
                            autres_r=self._rep_q)
        self.vider(garder)

        # ── 05 : la question en commentaire : la cycliste à 5 m/s ──
        self.dire("05-commentaire")
        cy = cycliste(0.8).move_to(P(-1.0, 1.0))
        self.au_mot("Et toi")
        self.play(FadeIn(cy, shift=RIGHT * 0.3), run_time=0.4)
        Q1 = self.ligne([("Une cycliste :", WHITE), ("5 m/s", BLEU_CALCUL)], 34).move_to(P(0, -0.45))
        self.mots(Q1, ["Une cycliste", "5 mètres"],
                  {1: [cy.animate.shift(RIGHT * 1.6)]})
        Q2 = self.ligne([("Combien de km/h ?", ORANGE_RETENUE)], 34).move_to(P(0, -1.1))
        self.au_mot("Combien")
        self.play(FadeIn(Q2, shift=UP * 0.12), run_time=0.35)
        self.play(Circumscribe(Q2, color=ORANGE_RETENUE), run_time=0.6)
        self.appel_commentaire(y=-1.85)
