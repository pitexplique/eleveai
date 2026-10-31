# prop_grandeur_quotient_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 15 « Les kilomètres par
# heure » (micro grandeur_quotient, notion grandeur_composee). CEINTURE
# BLANCHE (règle du short blanc, REGLES.md). Il AMUSE : ton cœur bat-il plus
# vite que ta chanson préférée ? Les BPM = des battements PAR minute, une
# grandeur quotient ramenée à 1 minute.
#   · EN HAUT, l'image : le cœur qui bat, la platine du DJ, l'horloge d'une
#     minute dont les quarts se remplissent (15 s = un quart de minute) ;
#   · EN BAS, au même instant : 30 battements en 15 s → 30 × 4 = 120 BPM ;
#   · la surprise : sur une règle des BPM, la zone du cœur au repos (60 à 100)
#     et la chanson à 120, plus loin ;
#   · 1 question-pause (3 s) : 60 battements en 30 s → 120 BPM ; leurres :
#     30 BPM (diviser par 2 au lieu de multiplier), 2 BPM (60 ÷ 30) ;
#   · fin : 25 battements en 10 s, combien de BPM ? (150 BPM : 10 s est un
#     sixième de minute, 25 × 6) en commentaire.
# Fait réel : au repos, le cœur d'un adulte bat en général entre 60 et
# 100 fois par minute (CHUV, procédure de soins « fréquence cardiaque »,
# consultée le 31/10/2026 ; mêmes bornes chez les cardiologues). Le reste est
# inventé (120 BPM, le DJ).
# Centres d'intérêt : musique, corps-sante.
#
# Voix : manim/voix/4e-prop-grandeur-quotient-short.json (validée, débit
# −10) ; WAV : public/sons/4e-prop-grandeur-quotient-short/ ; marques :
# manim/scripts/4e/prop_grandeur_quotient_short_marques.json (cues2marques
# + une marque ajoutée à la main : le 2e « 15 secondes » de 02-bpm, 8,416 s).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/prop_grandeur_quotient_short.py PropGrandeurQuotientShort4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_grandeur_quotient_short.py PropGrandeurQuotientShort4e -o eleveai-maths-4e-prop-grandeur-quotient-short --media_dir manim/media-prop-4e-15
# Sortie : manim/sorties/4e/maths/proportionnalite/15-grandeur-quotient/eleveai-maths-4e-prop-grandeur-quotient-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_grandeur_quotient import gras, sans  # noqa: E402

ROUGE_C = "#ef4444"    # le cœur
BLEU_M = "#38bdf8"     # la musique
AMBRE_F = "#f59e0b"


def coeur(s=1.0, couleur=ROUGE_C):
    """Un cœur plein : deux ronds et une pointe."""
    g = VGroup(Circle(radius=0.3).move_to(P(-0.24, 0.12)), Circle(radius=0.3).move_to(P(0.24, 0.12)),
               Polygon(P(-0.53, 0.04), P(0.53, 0.04), P(0, -0.62)))
    g.set_fill(couleur, 1).set_stroke(width=0)
    return g.scale(s)


def note(s=1.0, couleur=BLEU_M):
    """Deux croches liées."""
    t1 = Ellipse(width=0.34, height=0.24, fill_color=couleur, fill_opacity=1, stroke_width=0).rotate(0.4).move_to(
        P(-0.3, -0.4))
    t2 = t1.copy().move_to(P(0.3, -0.25))
    h1 = Line(P(-0.15, -0.37), P(-0.15, 0.45), color=couleur, stroke_width=6)
    h2 = Line(P(0.45, -0.22), P(0.45, 0.6), color=couleur, stroke_width=6)
    lien = Polygon(P(-0.18, 0.45), P(0.48, 0.6), P(0.48, 0.45), P(-0.18, 0.3), fill_color=couleur, fill_opacity=1,
                   stroke_width=0)
    return VGroup(t1, t2, h1, h2, lien).scale(s)


def platine(s=1.0):
    """La platine du DJ : un boîtier et un disque (.disque tourne)."""
    boite = RoundedRectangle(width=1.5, height=0.95, corner_radius=0.1, fill_color="#1f2937", fill_opacity=1,
                             stroke_color="#64748b", stroke_width=2)
    disque = VGroup(Circle(radius=0.36, fill_color="#0f172a", fill_opacity=1, stroke_color="#94a3b8",
                           stroke_width=2),
                    Circle(radius=0.12, fill_color=AMBRE_F, fill_opacity=1, stroke_width=0),
                    Line(P(0, 0.14), P(0, 0.34), color="#94a3b8", stroke_width=3)).move_to(P(-0.25, 0))
    bras = Line(P(0.55, 0.32), P(0.15, -0.1), color="#e5e7eb", stroke_width=4)
    bouton = Circle(radius=0.07, fill_color=ROUGE_C, fill_opacity=1, stroke_width=0).move_to(P(0.5, -0.3))
    g = VGroup(boite, disque, bras, bouton).scale(s)
    g.disque = disque
    return g


class Horloge(VGroup):
    """Le cadran d'UNE minute partagé en n parts égales (en partant de midi,
    dans le sens des aiguilles) ; .part(k) : la k-ième part, pleine (à jouer)."""

    def __init__(self, r=0.7, n=4, couleur=BLEU_M, **kw):
        super().__init__(**kw)
        self.r, self.n, self.couleur = r, n, couleur
        self.cadran = Circle(radius=r, stroke_color=WHITE, stroke_width=4, fill_color="#0b1220", fill_opacity=1)
        self.tics = VGroup(*[Line(P(0, r * 0.82).copy(), P(0, r)).rotate(-k * TAU / 12, about_point=ORIGIN)
                             for k in range(12)]).set_stroke(WHITE, 2)
        self.traits = VGroup(*[Line(ORIGIN, P(0, r)).rotate(-k * TAU / n, about_point=ORIGIN)
                               for k in range(n)]).set_stroke(ARDOISE_S, 2)
        self.add(self.cadran, self.tics, self.traits)

    def part(self, k, couleur=None):
        a = TAU / self.n
        sec = AnnularSector(inner_radius=0, outer_radius=self.r * 0.97, start_angle=PI / 2 - (k + 1) * a, angle=a,
                            fill_color=couleur or self.couleur, fill_opacity=0.75, stroke_width=0)
        return sec.shift(self.cadran.get_center())

    def milieu(self, k, f=0.55):
        a = PI / 2 - (k + 0.5) * TAU / self.n
        return self.cadran.get_center() + self.r * f * np.array([np.cos(a), np.sin(a), 0])


ARDOISE_S = "#94a3b8"


class PropGrandeurQuotientShort4e(ShortProp):
    nom_voix = "4e-prop-grandeur-quotient-short"
    fichier_marques = "prop_grandeur_quotient_short_marques.json"
    ceinture = "blanche"

    def mots(self, lg, mots, avec=None):
        avec = avec or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                if isinstance(mot, tuple):
                    self.au_mot(*mot)
                else:
                    self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.12), *avec.get(i, []), run_time=0.3)

    def battre(self, c, n=2, k=1.2):
        """Le cœur bat n fois (agrandir puis rétrécir)."""
        for _ in range(n):
            self.play(c.animate.scale(k), run_time=0.16)
            self.play(c.animate.scale(1 / k), run_time=0.2)

    def _disposer_q(self, question, choix, phrase):
        """La phrase de réponse se pose À LA PLACE des choix B et C (estompés,
        puis retirés) : sous les cartes, elle descendait sur Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph.next_to(cartes[0], DOWN, buff=0.35).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def _rep_q(self, sc):
        sc.play(FadeOut(sc.cartes_q[1]), FadeOut(sc.cartes_q[2]), run_time=0.2)
        l0 = sc.ligne_rep(0, ["30 s :", "une demi-minute."])
        sc.au_mot("30 secondes")
        sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.25)
        sc.au_mot("une demi")
        sc.play(FadeIn(l0[1], shift=UP * 0.12), run_time=0.25)
        l1 = sc.ligne_rep(1, ["1 min :", "60 ×", "2 =", "120 BPM."])
        for m, mot in zip(l1, ["En 1", "60 fois", "2, égale", "120"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le cœur et les BPM", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        c = coeur(1.15).move_to(P(-1.05, 1.0))
        n = note(1.2).move_to(P(1.05, 1.0))
        vs = gras("ou", 34, WHITE).move_to(P(0, 0.95))
        sans(vs)
        self.au_mot("Ton")
        self.play(Write(titre), FadeIn(c, scale=0.7), run_time=0.5)
        Q = VGroup(self.t("Ton cœur bat-il", 38), self.t("plus vite", 38), self.t("que ta chanson ?", 38, AMBRE))
        Q.arrange(DOWN, buff=0.15).move_to(P(0, -1.05))
        self.borne(Q)
        self.play(FadeIn(Q[0], shift=UP * 0.12), run_time=0.3)
        self.au_mot("plus vite")
        self.play(FadeIn(Q[1], shift=UP * 0.12), run_time=0.3)
        self.battre(c, 1)
        self.au_mot("chanson")
        self.play(FadeIn(Q[2], scale=1.15), FadeIn(vs), FadeIn(n, shift=DOWN * 0.3), run_time=0.45)
        self.play(n.animate.shift(UP * 0.2), rate_func=there_and_back, run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 01 : le cœur au repos : entre 60 et 100 fois par minute ──
        self.dire("01-coeur")
        c = coeur(1.5).move_to(P(0, 1.0))
        L0 = self.ligne([("Au repos :", WHITE)], 36).move_to(P(0, -0.65))
        self.au_mot("Au repos")
        self.play(FadeIn(c, scale=0.7), FadeIn(L0, shift=UP * 0.12), run_time=0.45)
        self.au_mot("bat")
        self.battre(c, 2)
        L1 = self.ligne([("entre", WHITE), ("60", ROUGE_C), ("et", WHITE), ("100", ROUGE_C)], 40).move_to(P(0, -1.3))
        self.mots(L1, ["entre", "60", "et 100", None])
        L2 = self.ligne([("fois par minute", WHITE)], 34).move_to(P(0, -1.95))
        self.au_mot("fois par")
        self.play(FadeIn(L2, shift=UP * 0.12), run_time=0.3)
        self.battre(c, 2)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : les BPM ; 30 battements en 15 s ; 30 × 4 = 120 BPM ──
        self.dire("02-bpm")
        B0 = gras("BPM", 46, AMBRE).move_to(P(0, 1.85))
        B1 = self.ligne([("battements par minute", WHITE)], 30).move_to(P(0, 1.3))
        self.au_mot("BPM")
        self.play(FadeIn(B0, scale=1.3), run_time=0.35)
        self.au_mot("battements par")
        self.play(FadeIn(B1, shift=UP * 0.12), run_time=0.35)
        pl = platine(0.95).move_to(P(-1.1, -0.15))
        dj = gras("DJ", 30, BLEU_M).next_to(pl, UP, buff=0.1)
        sans(dj)
        h = Horloge(0.72).move_to(P(1.1, -0.05))
        self.au_mot("Un DJ")
        self.play(FadeIn(pl, shift=UP * 0.2), FadeIn(dj), FadeIn(h, scale=0.8), run_time=0.45)
        L1 = self.ligne([("30 battements", WHITE), ("en 15 s", WHITE)], 32).move_to(P(0, -0.95))
        self.au_mot("compte")
        self.play(Rotate(pl.disque, -TAU, about_point=pl.disque.get_center()), run_time=0.5)
        q0 = h.part(0)
        e15 = gras("15 s", 19, WHITE).move_to(h.milieu(0, 0.52))
        self.mots(L1, ["30", "15 secondes"], {1: [FadeIn(q0), FadeIn(e15, scale=1.3)]})
        L2 = self.ligne([("15 s :", WHITE), ("un quart de minute", AMBRE)], 32).move_to(P(0, -1.55))
        self.mots(L2, [("15 secondes", 2), "un quart"], {1: [Indicate(q0, color=AMBRE, scale_factor=1.1)]})
        m1 = gras("1 min", 24, BLEU_M).next_to(h, UP, buff=0.1)
        self.au_mot("En 1")
        self.play(FadeIn(m1, scale=1.3), Circumscribe(h.cadran, Circle, color=BLEU_M), run_time=0.45)
        L3 = self.ligne([("30 ×", WHITE), ("4", WHITE), ("=", WHITE), ("120 BPM", VERT_OK)], 34).move_to(P(0, -2.15))
        trente = VGroup(*[gras("30", 19, WHITE).move_to(h.milieu(k, 0.52)) for k in range(4)])
        quarts = [h.part(k) for k in (1, 2, 3)]
        self.mots(L3, ["30 fois", "4,", "égale", "120"],
                  {0: [FadeOut(e15), LaggedStart(*[FadeIn(t, scale=1.3) for t in trente], lag_ratio=0.15)],
                   1: [LaggedStart(*[FadeIn(q) for q in quarts], lag_ratio=0.25)]})
        self.play(Circumscribe(L3[3], color=VERT_OK), run_time=0.6)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 03 : la surprise : 120 BPM, plus vite qu'un cœur au repos ──
        self.dire("03-surprise")
        x0, x1, vmax, y = -1.9, 1.9, 140, 0.35
        X = lambda v: x0 + (x1 - x0) * v / vmax  # noqa: E731
        axe = Arrow(P(x0 - 0.05, y), P(x1 + 0.15, y), color=WHITE, stroke_width=4, buff=0, tip_length=0.18)
        band = Rectangle(width=X(100) - X(60), height=0.32, fill_color=ROUGE_C, fill_opacity=0.55,
                         stroke_width=0).move_to(P((X(60) + X(100)) / 2, y))
        labs = sans(VGroup(*[gras(str(v), 22, ARDOISE_S).move_to(P(X(v), y - 0.42)) for v in (60, 100)]))
        tics = VGroup(*[Line(P(X(v), y - 0.18), P(X(v), y + 0.18), color=WHITE, stroke_width=3) for v in (60, 100)])
        cz = coeur(0.6).next_to(band, UP, buff=0.2)
        mk = Triangle(fill_color=BLEU_M, fill_opacity=1, stroke_width=0).scale(0.16).rotate(PI).move_to(
            P(X(120), y + 0.35))
        l120 = gras("120", 24, BLEU_M).next_to(mk, UP, buff=0.08)
        nz = note(0.55).next_to(l120, UP, buff=0.1)
        self.add(axe, band, tics, labs, cz)
        L0 = self.ligne([("120 BPM :", VERT_OK)], 40).move_to(P(0, -0.85))
        self.au_mot("120")
        self.play(FadeIn(L0, scale=1.2), FadeIn(mk, shift=DOWN * 0.3), FadeIn(nz), FadeIn(l120, scale=1.3),
                  run_time=0.45)
        L1 = self.ligne([("la chanson va plus vite", WHITE)], 32).move_to(P(0, -1.5))
        self.au_mot("la chanson")
        self.play(FadeIn(L1, shift=UP * 0.12), run_time=0.35)
        L2 = self.ligne([("qu'un cœur au repos !", AMBRE)], 34).move_to(P(0, -2.1))
        self.au_mot("qu'un")
        self.play(FadeIn(L2, scale=1.15), Indicate(band, color=ROUGE_C), run_time=0.45)
        self.insister(VGroup(nz, mk), 1.25)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 04 : la question-pause (3 s) ──
        self.question_pause("04-question", "04b-reponse",
                            ["60 battements", "en 30 secondes.", "Combien de BPM ?"],
                            [self.t("120 BPM", 30), self.t("30 BPM", 30), self.t("2 BPM", 30)], 0,
                            ["30 s : une demi-minute.", "1 min : 60 × 2 = 120 BPM."], mot_q="Une chanson",
                            autres_r=self._rep_q)
        self.vider(garder)

        # ── 05 : la question en commentaire ──
        self.dire("05-commentaire")
        h = Horloge(0.75, n=6).move_to(P(0, 0.95))
        m1 = sans(gras("1 min", 24, BLEU_M).next_to(h, UP, buff=0.1))
        self.au_mot("Et toi")
        self.play(FadeIn(h, scale=0.8), FadeIn(m1), run_time=0.45)
        Q1 = self.ligne([("25 battements", WHITE)], 36).move_to(P(0, -0.6))
        self.au_mot("25")
        self.play(FadeIn(Q1, shift=UP * 0.12), run_time=0.3)
        Q2 = self.ligne([("en 10 secondes.", WHITE)], 36).move_to(P(0, -1.15))
        p0 = h.part(0)
        e10 = gras("10 s", 17, WHITE).move_to(h.milieu(0, 0.6))
        self.au_mot("10")
        self.play(FadeIn(Q2, shift=UP * 0.12), FadeIn(p0), FadeIn(e10, scale=1.3), run_time=0.35)
        Q3 = self.ligne([("Combien de BPM ?", ORANGE_RETENUE)], 32).move_to(P(0, -1.75))
        self.au_mot("Combien")
        self.play(FadeIn(Q3, scale=1.15), run_time=0.35)
        self.play(Circumscribe(Q3, color=ORANGE_RETENUE), run_time=0.6)
        self.appel_commentaire(y=-2.35)
