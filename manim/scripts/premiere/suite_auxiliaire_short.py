# suite_auxiliaire_short.py
# EleveAI — Maths 1re spé — short « Suite auxiliaire : tu paries que tu trouves
# l'équilibre en une ligne ? » (9:16), ceinture BLANCHE (échelle entière à 70 %
# sous le titre). Série SUITES, épisode 27. Micro : suite_auxiliaire (L = aL + b ;
# la raison de vₙ = uₙ − L est le coefficient a, pas b ni L).
#   · 00-garde       : le titre, l'échelle, le pari ; la balance s'équilibre ;
#   · 01-situation   : EN HAUT Samuel, infirmier, la jauge du médicament (100 mg,
#                      la moitié éliminée, + 40 mg) ; EN BAS uₙ₊₁ = 0,5 × uₙ + 40 ;
#   · 02-equilibre   : EN HAUT la balance « éliminé / dose » ; EN BAS L = 0,5L + 40,
#                      0,5L = 40, L = 80 (alignés sur le « = ») ;
#   · 03/03b         : question-pause (A : 0,5), 3 s ; le coefficient devant uₙ ;
#   · 04-commentaire : avec u₀ = 100, combien au jour 3 ? (réponse : u₃ = 82,5 mg,
#                      NON affichée) ;
#   · 05-abonne      : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur : bleu = les termes (le médicament dans le sang), orange = a, b et
# les écarts vₙ, vert = juste (l'équilibre), rouge = le piège.
# Voix : manim/voix/premiere-spe-suite-auxiliaire-short.json (débit −6), calée par
# suite_auxiliaire_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_auxiliaire_short.py SuiteAuxiliaireShort -o eleveai-maths-premiere-spe-suite-auxiliaire-short --media_dir manim/scripts/premiere/media-suite-auxiliaire-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07 : question_libre)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter_short import SuiteGeoInterpreterShort as _S16  # noqa: E402  (ép. 16 : entete)
from suite_termes_short import SuiteTermesShort as _S18  # noqa: E402  (ép. 18 : q_reponse)
from suite_sommes_short import SuiteSommesShort as _S24  # noqa: E402  (ép. 24 : boutons en rangées)
from suite_variation_spe import Bords6 as Bords6Objets  # noqa: E402  (ép. 23)
from suite_somme_geo import Bords6Cases  # noqa: E402  (ép. 25 : cases et boutons compris)
from suite_sommes import OutilsSommes  # noqa: E402  (ép. 24 : vrais indices)
from suite_auxiliaire import OutilsAuxiliaire, balance  # noqa: E402  (la paysage : « = » alignés, balance)

DOSE = [100.0]
for _ in range(3):
    DOSE.append(0.5 * DOSE[-1] + 40)
assert DOSE == [100, 90, 85, 82.5]                                             # 01, commentaire : 82,5 (non affiché)
assert 0.5 * 80 + 40 == 80 and 40 / 0.5 == 80                                  # 02
assert 0.5 * (100 - 80) * 0.5 * 0.5 + 80 == 82.5                               # commentaire, par vₙ
# question : A (0,5) : vₙ₊₁ = 0,5uₙ + 40 − 80 = 0,5(uₙ − 80) = 0,5vₙ
assert all(0.5 * x + 40 - 80 == 0.5 * (x - 80) for x in (0, 17, 100))

PEAU, CHEVEUX, BLOUSE = "#8d5524", "#1f1300", "#0D9488"


def samuel(s=1.0):
    """Samuel, infirmier : tenue turquoise, stéthoscope autour du cou."""
    corps = RoundedRectangle(width=0.95, height=1.1, corner_radius=0.26, fill_color=BLOUSE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.1))
    col = Polygon(P(-0.16, 0.65), P(0.16, 0.65), P(0, 0.38), fill_color="#115E59", fill_opacity=1, stroke_width=0)
    steth = Arc(radius=0.24, start_angle=PI + 0.2, angle=PI - 0.4, stroke_color=GREY_B, stroke_width=5).move_to(P(0, 0.42))
    pastille = Dot(P(0.2, 0.22), radius=0.07, color=GREY_B)
    tete = Circle(radius=0.26, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.93))
    cheveux = Sector(radius=0.27, angle=PI, start_angle=0, fill_color=CHEVEUX, fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.08))
    return VGroup(corps, col, steth, pastille, tete, cheveux).scale(s)


class Jauge(VGroup):
    """Le médicament dans le sang : un tube, une colonne bleue (vmax en haut)."""

    def __init__(self, centre, haut=1.6, larg=0.55, vmax=120, **kw):
        super().__init__(**kw)
        self.c, self.haut, self.larg, self.vmax = np.array(centre, dtype=float), haut, larg, vmax
        self.tube = RoundedRectangle(width=larg, height=haut, corner_radius=0.12, stroke_color=GREY_A, stroke_width=3,
                                     fill_color=FOND_CARTE, fill_opacity=1).move_to(self.c)
        self.col = self.colonne(0)
        self.add(self.tube, self.col)

    def colonne(self, v, couleur=TERME):
        h = max(0.02, v / self.vmax * (self.haut - 0.16))
        return Rectangle(width=self.larg - 0.16, height=h, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(
            self.c + DOWN * (self.haut / 2 - 0.08), aligned_edge=DOWN)

    def niveau(self, v):
        return self.c[1] - self.haut / 2 + 0.08 + v / self.vmax * (self.haut - 0.16)


def goutte(s=1.0, couleur=JUSTE):
    """Une goutte : un rond et sa pointe."""
    rond = Circle(radius=0.12, fill_color=couleur, fill_opacity=1, stroke_width=0)
    pointe = Polygon(P(-0.1, 0.06), P(0.1, 0.06), P(0, 0.26), fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(rond, pointe).scale(s)


class SuiteAuxiliaireShort(Bords6Cases, Bords6Objets, OutilsAuxiliaire, AuditMilliers, OutilsSommes, OutilsEp12,
                           OutilsGraphique, ShortSuites):
    fichier_marques = "suite_auxiliaire_short_marques.json"
    nom_voix = "premiere-spe-suite-auxiliaire-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "blanche"
    place_coche = 0.15
    largeur_texte = 3.85          # une vraie marge latérale (≈ 6 %) pour les textes pleine largeur
    k_allumer = 1.03
    entete = _S16.entete
    q_reponse = _S18.q_reponse
    bouton_rangee = _S24.bouton_rangee

    def construct(self):
        # ── 00 : la garde : titre, échelle (70 %), le pari ; la balance s'équilibre ──
        self.dire("00-garde")
        self.entete("Suite auxiliaire", extrait="Suite auxiliaire", fs=40)
        pa = self.paragraphe(["Tu paries que", "tu trouves", ("l'équilibre", JUSTE), ("en une ligne ?", RAISON)], 50,
                             buff=0.14, y=1.25)
        b0 = balance(P(0, -2.65), larg=2.6, angle=-0.22, haut=1.55)
        b1 = balance(P(0, -2.65), larg=2.6, angle=0.0, haut=1.55)
        for l, ex in zip(pa, ("Tu paries", "tu trouves", "l'équilibre", "en une ligne")):
            self.au_mot(ex)
            anims = [FadeIn(l, shift=UP * 0.1)]
            if ex == "tu trouves":
                anims.append(FadeIn(b0))
            if ex == "l'équilibre":
                anims.append(Transform(b0, b1))
            self.play(*anims, run_time=0.5 if len(anims) > 1 else 0.3)
        self.play(Indicate(pa[2], color=JUSTE, scale_factor=1.1), b0.animate.set_color(JUSTE), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : Samuel, infirmier ; EN HAUT la jauge ; EN BAS la récurrence ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        pers = samuel(0.62).move_to(P(-1.2, 1.95))
        nom = self.t("Samuel", 44, JAUNE_TITRE).move_to(P(0.62, 2.2))
        met = self.t("infirmier", 34, TERME).move_to(P(0.62, 1.66))
        self.au_mot("Samuel")
        self.play(FadeIn(pers, shift=UP * 0.15), FadeIn(nom, shift=UP * 0.1), run_time=0.4)
        self.au_mot("infirmier")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.3)
        jg = Jauge(P(1.35, 0.1), haut=1.55)
        l100 = self.t("100 mg", 46, TERME).move_to(P(-0.55, 0.62))
        self.au_mot("100")
        jg.col.become(jg.colonne(100))
        self.play(FadeIn(jg), FadeIn(l100, scale=1.3), run_time=0.45)
        sang = self.t("dans le sang", 30, GREY_A).next_to(l100, DOWN, buff=0.12)
        self.au_mot("dans le sang")
        self.play(FadeIn(sang, shift=UP * 0.1), run_time=0.3)
        self.ecrire([[("Chaque jour :", WHITE, "Chaque jour")]], -1.3, fs=36)
        moit = self.t("− la moitié", 34, RAISON).move_to(P(-0.55, -0.42))
        self.au_mot("la moitié")
        self.play(FadeOut(sang), FadeIn(moit, shift=DOWN * 0.1), Transform(jg.col, jg.colonne(50, RAISON)), run_time=0.6)
        self.play(jg.col.animate.set_fill(TERME), run_time=0.2)
        gt = goutte(0.9).move_to(P(1.35, 1.25))
        dose = self.t("+ 40 mg", 34, JUSTE).move_to(P(-0.55, -0.42))
        self.au_mot("dose de")
        self.play(FadeIn(gt, shift=DOWN * 0.2), run_time=0.3)
        self.suivre("40")
        self.play(gt.animate.move_to(P(1.35, jg.niveau(50) + 0.1)).set_opacity(0), Transform(jg.col, jg.colonne(90)),
                  FadeOut(moit), FadeIn(dose, scale=1.3), run_time=0.5)
        self.ecrire([[("u_{n + 1} =", TERME, "u indice n plus 1")]], -1.98, fs=50)
        self.ecrire([[("0,5 ×", RAISON, "0,5 fois"), ("u_{n}", TERME, None), ("+ 40", RAISON, "plus 40")]], -2.62, fs=50)
        self.attendre_voix(marge=0.3)

        # ── 02 : EN HAUT la balance « éliminé / dose » ; EN BAS L = 80, alignés ──
        self.nouvel_ecran("02-equilibre", garder=(self.badge, self.titre_s))
        self.ecrire([[("À l'équilibre :", JUSTE, "À l'équilibre")]], 2.42, fs=42)
        bal = balance(P(0, -0.05), larg=2.2, angle=0.2, haut=1.5)
        self.play(FadeIn(bal), run_time=0.3)
        bal2 = balance(P(0, -0.05), larg=2.2, angle=0.0, haut=1.5)
        le = self.t("dose", 30, JUSTE)
        lg_ = self.t("éliminé", 30, RAISON)
        self.au_mot("la dose")
        self.play(FadeIn(le.move_to(bal.plateaux[1] + DOWN * 0.36)), run_time=0.3)
        self.au_mot("compense")
        self.play(Transform(bal, bal2), le.animate.move_to(bal2.plateaux[1] + DOWN * 0.36), run_time=0.6)
        self.au_mot("éliminé")
        self.play(FadeIn(lg_.move_to(bal2.plateaux[0] + DOWN * 0.36)), run_time=0.3)
        fs = 46        # trois lignes centrées : alignées sur le « = », elles sortiraient des 6 %
        self.ecrire([[("L", TERME, "L égale"), ("=", WHITE, None), ("0,5", RAISON, "0,5"), ("L", TERME, None),
                      ("+ 40", RAISON, "40")]], -0.95, fs=fs, larg=3.7)
        self.ecrire([[("0,5", RAISON, "Donc 0,5"), ("L", TERME, None), ("=", WHITE, None), ("40", RAISON, "40")]], -1.75,
                    fs=fs, larg=3.7)
        r = self.ecrire([[("L", TERME, "et L"), ("=", WHITE, None), ("80", JUSTE, "80")]], -2.55, fs=fs + 6, larg=3.7)
        self.boite(r.parts[-1:])
        self.play(Indicate(bal, color=JUSTE, scale_factor=1.05), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → A (0,5) ; le coefficient devant uₙ ──
        cartes = VGroup(*[self.bouton_rangee(Ln, nb, fs=46) for Ln, nb in zip("ABC", ("0,5", "80", "40"))])
        for cc, y in zip(cartes, (0.12, -0.73, -1.58)):
            cc.move_to(P(0, y))
        self._qq = []

        def e1():
            l1 = self.ecrire([[("Avec", WHITE, "Avec v"), ("v_{n} =", RAISON, None), ("u_{n}", TERME, None),
                               ("− 80,", WHITE, "80")]], 2.7, fs=36, larg=3.85)
            qq = self.paragraphe(["la suite v est", "géométrique", "de raison :"], 33, buff=0.16, y=1.5)
            for l, ex in zip(qq, ("la suite v", "géométrique", "de raison")):
                self.au_mot(ex)
                self.play(FadeIn(l, shift=UP * 0.1), run_time=0.25)
            self._qq = [l1, qq]

        q = self.question_libre("03-question", [e1], cartes, P(0, -2.32))
        self.dire("03b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        self.ecrire([[("La raison de v,", WHITE, "La raison")]], 2.62, fs=36, avec_part={0: [FadeOut(m) for m in self._qq]},
                    run_time=0.2)
        self.ecrire([[("c'est le coefficient", WHITE, "c'est le coefficient")]], 2.06, fs=36)
        r = self.ecrire([[("devant", WHITE, "devant"), ("u_{n} :", TERME, None), ("0,5", JUSTE, "0,5")]], 1.4, fs=44,
                        centre=-0.12, larg=3.4)
        self.boite(r.parts[-1:])
        self.attendre_voix(marge=0.8)

        # ── 04 : la question en commentaire : au jour 3 ? ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 52, JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        self.ecrire([[("avec", WHITE, "avec u"), ("u_{0} =", TERME, "indice 0"), ("100,", WHITE, "100")]], 2.65, fs=46,
                    larg=3.7)
        self.ecrire([[("combien de mg", WHITE, "combien de")]], 2.0, fs=44)
        self.ecrire([[("reste-t-il", WHITE, "reste-t-il")]], 1.45, fs=44)
        jg = Jauge(P(1.0, -1.18), haut=0.9, larg=0.5)
        jg.col.become(jg.colonne(100))
        tq = self.t("?", 60, RAISON, audit=False).move_to(P(-0.4, -1.15))
        self.ecrire([[("au jour", WHITE, "au jour"), ("3 ?", RAISON, "3")]], 0.7, fs=44,
                    avec=[FadeIn(jg), FadeIn(tq, scale=1.4)])
        self.ecrire([[("C'est", WHITE, "C'est"), ("u_{3}.", TERME, "u indice 3")]], -0.12, fs=50)
        self.play(Transform(jg.col, jg.colonne(82)), Indicate(tq, color=RAISON, scale_factor=1.3), run_time=0.7)
        self.appel_commentaire(-2.42)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
