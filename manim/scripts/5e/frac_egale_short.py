# frac_egale_short.py
# EleveAI — Maths 5e — short jumeau de l'épisode 01 « Des fractions égales »
# (micro fraction_egale). CEINTURE BLANCHE (règle du short blanc, REGLES.md) :
# on VOIT que plusieurs fractions décrivent la même part, sans calcul posé.
# Il AMUSE : « Une demi-heure ? » Nora, HORLOGÈRE, montre une demi-heure :
#   · EN HAUT, l'image qui bouge : la grande aiguille fait un demi-tour, le
#     cadran (le disque du coach, 12 graduations) se colorie en même temps ;
#   · EN BAS, au même instant, les écritures s'alignent : 6/12 (graduations),
#     2/4 (paquets de 3), 30/60 (minutes), puis 1/2 = 2/4 = 6/12 = 30/60 ;
#   · 1 question-pause (3 s) : 3 quarts d'heure = combien de douzièmes ? (9) ;
#   · fin : « un quart d'heure, combien de soixantièmes ? » en commentaire (15).
# Centres d'intérêt : jeux-defis, art-design (l'horlogerie). Aucune donnée réelle citée.
# Vérifié (Python) : 1/2 = 2/4 = 6/12 = 30/60 ; 3/4 = 9/12 ; 1/4 = 15/60.
#
# Bases : 5e/frac_lotg_commun.py (ShortG ← 4e/frac_lotd_commun.py).
# Voix : manim/voix/5e-frac-egale-short.json (débit −10) ; marques :
# manim/scripts/5e/frac_egale_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/5e/frac_egale_short.py FracEgaleShort5e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/frac_egale_short.py FracEgaleShort5e -o eleveai-maths-5e-frac-egale-short --media_dir manim/scripts/5e/media-frac-egale-short
# Sortie : manim/sorties/5e/maths/fractions/01-egale/eleveai-maths-5e-frac-egale-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotg_commun import *  # noqa: E402,F403

OR = "#fbbf24"
Y_CAD = 0.95


def aiguille(d, longueur=0.95):
    """La grande aiguille, au centre du disque d, pointée sur 12."""
    c = d.centre_disque()
    return VGroup(Line(c, c + UP * longueur, color=OR, stroke_width=9),
                  Dot(c, radius=0.09, color=OR))


def reperes(d):
    """12 petits traits autour du cadran, comme une montre."""
    c, r = d.centre_disque(), d.cercle.width / 2
    return VGroup(*[Line(c + (r + 0.05) * np.array([np.sin(i * TAU / 12), np.cos(i * TAU / 12), 0]),
                         c + (r + 0.2) * np.array([np.sin(i * TAU / 12), np.cos(i * TAU / 12), 0]),
                         color=NUIT, stroke_width=6 if i % 3 == 0 else 3) for i in range(12)])


class FracEgaleShort5e(ShortG):
    nom_voix = "5e-frac-egale-short"
    fichier_marques = "frac_egale_short_marques.json"
    ceinture = "blanche"

    def cadran(self, n=12, k=0):
        return Disque(n, k, rayon=1.1, marge=0.28, centre=P(0, Y_CAD))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Une demi-heure ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : la demi-heure ──
        self.dire("00-accroche")
        self.au_mot("Nora")
        nm = self.bloc(["Nora,", "horlogère"], 30, BLEU_CALCUL).move_to(P(0, -1.6))
        self.play(FadeIn(nm, scale=0.8), run_time=0.4)
        d = self.cadran()
        rep = reperes(d)
        a = aiguille(d)
        self.au_mot("montre")
        self.play(d.apparaitre(0.8), FadeIn(rep), FadeIn(a), run_time=0.8)
        self.au_mot("demi-heure")
        self.play(Rotate(a[0], -PI, about_point=d.centre_disque()), d.colorier(range(6), lag=0.12),
                  run_time=1.6, rate_func=linear)
        self.au_mot("La moitié")
        m = self.t("la moitié du tour", 34, BLEU_PART).move_to(P(0, -0.85))
        m.sans_synchro = True
        self.play(FadeIn(m, scale=0.8), FadeOut(nm), run_time=0.4)
        self.au_mot("de combien")
        self.play(Write(titre), run_time=0.7)
        self.attendre_voix(marge=0.2)
        self.ecran1(d, rep, a, m, garder)

    def ecran1(self, d, rep, a, m, garder):
        # ── 01 : 6/12, 2/4, 30/60, 1/2 ──
        self.dire("01-ecritures")
        fs = 42
        fr_ = [EcritureFraction(1, 2, fs=fs, couleur=VERT_OK), EcritureFraction(2, 4, fs=fs),
               EcritureFraction(6, 12, fs=fs), EcritureFraction(30, 60, fs=fs)]
        egs = [self.t("=", fs) for _ in range(3)]
        for e in egs:
            e.sans_synchro = True
        rang = VGroup(fr_[0], egs[0], fr_[1], egs[1], fr_[2], egs[2], fr_[3]).arrange(RIGHT, buff=0.16)
        rang.scale_to_fit_width(min(rang.width, 3.5)).move_to(P(0, -1.75))
        for e in egs:
            e.set_y(fr_[0].trait.get_y())
        self.play(FadeOut(m), run_time=0.3)
        self.L([("12 graduations", WHITE, "a 12")], -0.85, fs=32,
               avec=[LaggedStart(*[Indicate(t, color=AMBRE) for t in rep], lag_ratio=0.05)])
        self.au_nb("couvre 6")
        self.play(Indicate(VGroup(*d.parts[:6]), color=WHITE, scale_factor=1.05), run_time=0.5)
        self.au_nb("6 : 6")
        self.play(FadeIn(fr_[2], scale=1.3), run_time=0.4)
        self.au_nb("paquets de 3")
        d4, anim = d.regrouper(3, run_time=1.0)
        self.play(anim, run_time=1.0)
        self.bring_to_front(a)
        self.au_nb("graduations : 2")
        self.play(FadeIn(fr_[1], scale=1.3), run_time=0.4)
        self.au_mot("en minutes")
        d60, anim = d4.repartager(15, run_time=1.2)
        self.play(anim, run_time=1.2)
        self.bring_to_front(a)
        self.au_nb("minutes : 30")
        self.play(FadeIn(fr_[3], scale=1.3), run_time=0.4)
        self.au_nb("1 demi")
        self.play(FadeIn(fr_[0], scale=1.3), *[FadeIn(e) for e in egs], run_time=0.5)
        self.au_mot("la même part")
        self.play(Create(self.encadrer(rang, buff=0.12)), Indicate(VGroup(*d60.parts[:30]), color=WHITE,
                                                                     scale_factor=1.04), run_time=0.7)
        self.insister(fr_[0], 1.4)
        self.attendre_voix(marge=0.3)
        self.vider(garder)
        self.ecran2(garder)

    def ecran2(self, garder):
        # ── 02 : la question-pause (3 s) ──
        def apres(sc):
            sc.rep_mots(0, [("4 ×", None, "B. 4"), ("3 =", None, "4 fois 3"), ("12", None, "égale 12")])
            sc.rep_mots(1, [("3 ×", None, "et 3"), ("3 =", None, ("3 fois 3", 1)), ("9", None, "égale 9"),
                            (": 9/12", None, "9 douzièmes")])
            sc.fin_rep()

        self.question_pause("02-question", "02b-reponse", ["3 quarts d'heure :", "combien de douzièmes ?"],
                            [self.inline("3", 30), self.inline("9", 30), self.inline("4", 30)], 1,
                            ["4 × 3 = 12", "3 × 3 = 9 : 9/12"], mot_q="3 quarts", autres_r=apres)
        self.vider(garder)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        d = Disque(4, 0, rayon=1.1, marge=0.28, centre=P(0, Y_CAD))
        a = aiguille(d)
        self.au_mot("un quart d'heure")
        self.play(d.apparaitre(0.6), FadeIn(a), run_time=0.6)
        q1 = self.t("un quart d'heure", 34, BLEU_PART).move_to(P(0, -0.8))
        q1.sans_synchro = True
        self.play(Rotate(a[0], -PI / 2, about_point=d.centre_disque()), d.colorier([0]), FadeIn(q1, scale=0.8),
                  run_time=0.7, rate_func=linear)
        self.au_mot("combien de soixantièmes")
        f = EcritureFraction("?", 60, fs=56).move_to(P(0.45, -1.75))
        eg = self.t("=", 56).next_to(f, LEFT, buff=0.3).set_y(f.trait.get_y())
        eg.sans_synchro = True
        self.play(FadeIn(eg), FadeIn(f, scale=1.3), run_time=0.4)
        self.appel_commentaire(y=-2.65)
