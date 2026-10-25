# frac_lire_short.py
# EleveAI — Maths CM1 ET CM2 — short jumeau de l'épisode 01 « Lire une
# fraction » (micro fraction_lire). CEINTURE BLANCHE (règle du short blanc) : on
# VOIT les quarts sur le cadran, aucun calcul posé.
# Il AMUSE : « Pourquoi dit-on 1 quart d'heure ? ». Romane, HORLOGÈRE :
#   · EN HAUT : Romane, puis ce qu'on lit (1 tour = 60 minutes ; 1 quart d'heure
#     = 15 minutes ; 1 demi-heure = 30 minutes) ;
#   · EN BAS, au même instant : le cadran (le disque du coach en 4 parts) ; la
#     grande aiguille tourne, chaque quart se colorie quand elle le parcourt ;
#   · 1 question-pause (3 s) : 1 tiers de tour = 20 minutes (leurres 3 : le
#     dénominateur ; 30 : la demi-heure) ;
#   · commentaire : « 3 quarts d'heure, c'est combien de minutes ? » (45).
# Vérifié (Python) : 60 ÷ 4 = 15 ; 2 × 15 = 30 ; 60 ÷ 3 = 20 ; 3 × 15 = 45.
# Aucune donnée réelle citée. Centres : sciences, jeux-defis.
#
# Le short n'affiche pas la classe : rendu UNE fois, copié sous les noms cm1 et cm2.
# Voix : manim/voix/cm-frac-lire-short.json (débit −10) ; marques :
# manim/scripts/cm1/frac_lire_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/frac_lire_short.py FracLireShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/frac_lire_short.py FracLireShortCM -o eleveai-maths-cm1-frac-lire-short --media_dir manim/scripts/cm1/media-frac-lire-short
# Sorties : manim/sorties/cm1/maths/fractions/01-lire/eleveai-maths-cm1-frac-lire-short.mp4
#           manim/sorties/cm2/maths/fractions/01-lire/eleveai-maths-cm2-frac-lire-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403

YC = -1.2      # le centre du cadran
R = 1.1
Y1, Y2, Y3 = 1.95, 1.4, 0.85   # les trois lignes de la bande du haut


def horlogere(s=0.45):
    p = personne(peau="#c68642", tenue="#0f766e", cheveux="#1f2937", longs=True, s=s)
    p.add(lunettes(p))
    return p


def cadran(n=4, k=0, rayon=R, centre=P(0, YC)):
    """Le disque du coach en n parts, avec les heures 12, 3, 6, 9 (décor) et
    le petit point du centre. Les traits sont cachés (ils se tracent au mot)."""
    d = Disque(n, k, rayon=rayon, centre=centre, marge=0.5)
    c = d.centre_disque()
    heures = VGroup(*[Text(h, font_size=24, color=NUIT, weight=BOLD).move_to(c + (rayon + 0.24) * np.array(
        [np.cos(PI / 2 - i * PI / 2), np.sin(PI / 2 - i * PI / 2), 0])) for i, h in enumerate(["12", "3", "6", "9"])])
    pas_audit(heures)
    for t in d.traits:
        t.set_stroke(opacity=0)
    d.heures = heures
    return d


def aiguille(d, couleur=ROUGE_ERREUR):
    c = d.centre_disque()
    a = Line(c, c + UP * (d.cercle.width / 2 - 0.12), color=couleur, stroke_width=7)
    return VGroup(a, Dot(c, radius=0.08, color=NUIT))


class FracLireShortCM(ShortCM):
    nom_voix = "cm-frac-lire-short"
    fichier_marques = "frac_lire_short_marques.json"

    def dans_part(self, d, i, k=0.6):
        """Le point au milieu de la part i du cadran (à k × rayon du centre)."""
        a = PI / 2 - (i + 0.5) * TAU / d.n
        v = np.array([np.cos(a), np.sin(a), 0])
        return d.centre_disque() + k * d.cercle.width / 2 * v

    def tourner(self, aig, d, angle, run_time=1.0, avec=()):
        self.play(Rotate(aig[0], angle=-angle, about_point=d.centre_disque()), *avec, run_time=run_time)

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le quart d'heure", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Romane et son horloge ──
        self.dire("00-accroche")
        self.au_mot("Pourquoi")
        self.play(Write(titre), run_time=0.6)
        rom = horlogere(0.45).move_to(P(-1.4, Y2))
        nm = self.bloc(["Romane,", "horlogère"], 26, BLEU_CALCUL).next_to(rom, RIGHT, buff=0.25)
        self.au_mot("Romane")
        self.play(FadeIn(rom, shift=UP * 0.2), FadeIn(nm), run_time=0.5)
        d = cadran()
        aig = aiguille(d)
        self.au_mot("Regarde son horloge")
        self.play(FadeIn(VGroup(d.carte, d.parts, d.cercle)), FadeIn(d.heures), FadeIn(aig), run_time=0.6)
        self.add_foreground_mobjects(d.traits, d.cercle, d.heures, aig)
        self.attendre_voix(marge=0.2)

        # ── 01 : 1 tour = 60 minutes ; 4 quarts ; 1 quart d'heure = 15 minutes ──
        self.dire("01-quart")
        self.play(FadeOut(rom), FadeOut(nm), run_time=0.3)
        l1 = self.inline("1 tour", 28)
        l1b = self.inline("= 60 minutes", 28, AMBRE).next_to(l1, RIGHT, buff=0.2)
        VGroup(l1, l1b).move_to(P(0, Y1))
        self.au_nb("fait 1 tour")
        self.tourner(aig, d, PI, 0.5, avec=[FadeIn(l1, shift=UP * 0.1)])
        self.au_nb("60 minutes")
        self.tourner(aig, d, PI, 0.5, avec=[FadeIn(l1b, scale=1.2)])
        self.au_nb("en 4 parts")
        self.play(*[t.animate.set_stroke(opacity=1) for t in d.traits], run_time=0.5)
        self.au_mot("des quarts")
        self.play(LaggedStart(*[Indicate(p, color=AMBRE, scale_factor=1.06) for p in d.parts], lag_ratio=0.2),
                  run_time=0.7)
        l2 = self.inline("1 quart d'heure", 32, BLEU_PART).move_to(P(0, Y2))
        self.au_nb("1 quart d'heure")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.25)
        self.tourner(aig, d, PI / 2, 0.8, avec=[d.colorier([0], run_time=0.8)])
        q15 = self.bloc(["15", "min"], 22, NUIT).move_to(self.dans_part(d, 0, 0.5))
        l2b = self.inline("= 15 minutes !", 32, VERT_OK).move_to(P(0, Y3))
        self.au_nb("c'est 15")
        self.play(FadeIn(q15, scale=1.3), FadeIn(l2b, scale=1.2), run_time=0.35)
        self.insister(l2b, 1.2)
        self.attendre_voix(marge=0.2)

        # ── 02 : 2 quarts = 1 demi-heure = 30 minutes ──
        self.dire("02-demi")
        self.au_nb("2 quarts")
        self.play(FadeOut(VGroup(l1, l1b, l2, l2b)), run_time=0.25)
        self.tourner(aig, d, PI / 2, 0.8, avec=[d.colorier([1], run_time=0.8)])
        q30 = pas_audit(self.bloc(["15", "min"], 22, NUIT).move_to(self.dans_part(d, 1, 0.5)))
        self.play(FadeIn(q30, scale=1.3), run_time=0.25)
        l3 = self.inline("1 demi-heure", 32, BLEU_PART).move_to(P(0, Y1 - 0.2))
        self.au_nb("1 demi-heure")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        l3b = self.inline("= 30 minutes", 32, VERT_OK).move_to(P(0, Y2 - 0.2))
        self.au_nb("30 minutes")
        self.play(FadeIn(l3b, scale=1.2), run_time=0.3)
        self.attendre_voix(marge=0.3)
        self.remove_foreground_mobjects(d.traits, d.cercle, d.heures, aig)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["1 tiers de tour :", "combien de minutes ?"],
                            [self.inline("3", 30), self.inline("20", 30), self.inline("30", 30)], 1,
                            ["60 min en 3 parts :", "chaque part : 20 min"], mot_q="La grande aiguille")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        d3 = cadran()
        for t in d3.traits:
            t.set_stroke(opacity=1)
        a3 = aiguille(d3)
        e = self.borne(self.inline("3 quarts d'heure = ? min", 30), 0.6).move_to(P(0, Y1))
        e[e.original_text.index("?") - e.original_text[:e.original_text.index("?")].count(" ")].set_color(AMBRE)
        self.au_nb("3 quarts")
        self.play(FadeIn(VGroup(d3.carte, d3.parts, d3.cercle, d3.traits, d3.heures, a3)), FadeIn(e, scale=1.1),
                  run_time=0.4)
        self.add_foreground_mobjects(d3.traits, d3.cercle, d3.heures, a3)
        self.tourner(a3, d3, 3 * PI / 2, 1.0, avec=[d3.colorier([0, 1, 2], run_time=1.0)])
        self.appel_commentaire(y=Y2 - 0.1)
