# frac_defi_short.py
# EleveAI — Maths CM1 ET CM2 — short jumeau de l'épisode 07 « Défi fractions »
# (micro fraction_defi). CEINTURE BLANCHE (règle du short blanc) : on VOIT les
# trois écritures (0,6 ; 7/10 ; 1/2) au même endroit de la droite, aucun
# calcul posé.
# Il AMUSE : la COURSE D'ESCARGOTS de Zoé, BIOLOGISTE, sur une piste de 1 m :
#   · EN HAUT : les 3 escargots qui avancent, chacun sur son couloir ;
#   · EN BAS, au même instant : la droite graduée du coach en dixièmes ; un
#     pointillé descend de chaque escargot jusqu'à sa graduation ;
#   · 1 question-pause (3 s) : qui est en tête ? Flash, 7/10 = 0,7 (leurres
#     Turbo 0,6 « le nombre à virgule a l'air plus grand », Lento 1/2) ;
#   · commentaire : « Turbo avance encore de 3 dixièmes : où arrive-t-il ? » (0,9 m).
# Vérifié (Python) : 1/2 = 0,5 < 0,6 < 0,7 = 7/10 ; 0,6 + 0,3 = 0,9.
# Aucune donnée réelle citée (pas de vitesse réelle d'escargot). Centres :
# animaux, jeux-defis.
#
# Le short n'affiche pas la classe : rendu UNE fois, copié sous les noms cm1 et cm2.
# Voix : manim/voix/cm-frac-defi-short.json (débit −10) ; marques : frac_defi_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/frac_defi_short.py FracDefiShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/frac_defi_short.py FracDefiShortCM -o eleveai-maths-cm1-frac-defi-short --media_dir manim/scripts/cm1/media-frac-defi-short
# Sorties : manim/sorties/{cm1,cm2}/maths/fractions/07-defi/eleveai-maths-{cm1,cm2}-frac-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403
from frac_cmj_commun import *  # noqa: E402,F403

YD = -1.75                       # la droite graduée
YC = [1.6, 0.75, -0.1]       # les trois couloirs (0,85 d'écart : un nom ne touche jamais l'escargot du dessus)
NOMS = ["Turbo", "Flash", "Lento"]
COUL = ["#f59e0b", "#38bdf8", "#a78bfa"]
VAL = [0.6, 0.7, 0.5]


def biologiste(s=0.42):
    p = personne(peau="#5c3a21", tenue="#16a34a", cheveux="#111827", longs=True, s=s)
    c = p.corps.get_right() + UP * 0.35 * s
    p.add(Circle(radius=0.22 * s, stroke_color="#e5e7eb", stroke_width=4).move_to(c + RIGHT * 0.25 * s),
          Line(c + RIGHT * 0.1 * s + DOWN * 0.15 * s, c + DOWN * 0.5 * s, color="#92400e", stroke_width=5))
    return p


class FracDefiShortCM(ShortCM):
    nom_voix = "cm-frac-defi-short"
    fichier_marques = "frac_defi_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Course d'escargots !", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Zoé, la piste, les 3 escargots ──
        self.dire("00-accroche")
        self.au_mot("Course")
        self.play(Write(titre), run_time=0.6)
        zoe = biologiste(0.42).move_to(P(-1.2, 1.75))
        nm = self.bloc(["Zoé,", "biologiste"], 26, BLEU_CALCUL).next_to(zoe, RIGHT, buff=0.3)
        au_fil(self, [("Zoé", [zoe, nm], [])])
        d = Droite(0, 1, 10, etiquettes={0: "0", 1: "1 m"}, longueur=2.7, fs=26, depasse=0.3, marge=0.25, centre=P(0, YD))
        x0, x1 = d.p(0)[0], d.p(1)[0]
        couloirs = VGroup(*[DashedLine(P(x0, y - 0.22), P(x1, y - 0.22), color="#475569", stroke_width=2,
                                       dash_length=0.08) for y in YC])
        escs = [escargot(c, 0.55).move_to(P(x0, y)) for c, y in zip(COUL, YC)]
        noms = [Text(n, font_size=20, color=c).next_to(e, UP, buff=0.08) for n, c, e in zip(NOMS, COUL, escs)]
        au_fil(self, [("3 escargots", [], [FadeOut(zoe), FadeOut(nm),
                                           LaggedStart(*[FadeIn(VGroup(e, n), shift=RIGHT * 0.2)
                                                         for e, n in zip(escs, noms)], lag_ratio=0.2)]),
                      ("piste de 1", [], [FadeIn(d), Create(couloirs)])], run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : chacun avance jusqu'à sa place ──
        self.dire("01-course")
        etiqs = [self.inline("0,6", 28, COUL[0]), EcritureFraction(7, 10, fs=22, couleur=COUL[1]),
                 EcritureFraction(1, 2, fs=22, couleur=COUL[2])]
        mots = ["à 0,6", "à 7", "à 1"]
        self.pointilles = []
        for e, n, v, y, et, mot, c in zip(escs, noms, VAL, YC, etiqs, mots, COUL):
            xv = d.p(v)[0]
            pt = Dot(d.p(v), radius=0.07, color=c)  # sa place sur la droite (pas de pointillés qui traversent les couloirs)
            et.next_to(P(xv + 0.1, y + 0.12), RIGHT, buff=0.15)  # juste après l'escargot arrivé, jamais dessus
            self.au_nb(mot)
            self.play(e.animate.shift(RIGHT * (xv - e.get_x() - 0.18)), Create(pt), FadeIn(et, scale=1.2),
                      run_time=0.8)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Qui est en tête ?"],
                            [self.inline("Turbo", 30), self.inline("Flash", 30), self.inline("Lento", 30)], 1,
                            ["7 dixièmes = 0,7", "1 demi = 0,5", "Flash est en tête !"])
        self.vider(garder)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        d2 = Droite(0, 1, 10, etiquettes={0: "0", 1: "1 m"}, longueur=2.7, fs=26, depasse=0.3, marge=0.25, centre=P(0, YD))
        e2 = escargot(COUL[0], 0.6).move_to(P(d2.p(0.6)[0] - 0.18, YD + 0.85))
        p6 = pas_audit(d2.point(0.6, "0,6", couleur=COUL[0], fs=24, haut=0.3))
        q = self.borne(self.bloc(["+ 3 dixièmes de mètre :", "où arrive-t-il ?"], 30), 0.5).move_to(P(0, 1.55))
        au_fil(self, [("Turbo avance", [d2, e2, p6], []), ("de 3 dixièmes", [q[0]], []),
                      ("Où arrive-t-il", [q[1]], [])])
        self.appel_commentaire(y=0.45)
