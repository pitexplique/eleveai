# suite_limite_spe_short.py
# EleveAI — Maths 1re spé — short « Limite d'une suite : tu paries que tu
# devines où ça s'arrête ? » (9:16), ceinture BLANCHE (échelle entière à 70 %
# sous le titre). Série SUITES, épisode 26.
# Micro : suite_limite (uₙ₊₁ = a uₙ + b : la limite vérifie L = aL + b ;
# conjecturer une limite en regardant les termes).
#   · 00-garde      : le titre, l'échelle, le pari ; des points qui
#                     s'approchent d'une droite en pointillés, un « ? » ;
#   · 01-situation  : Lou, pâtissière ; EN HAUT le four et le gâteau, le
#                     thermomètre à 180 °C ; EN BAS uₙ₊₁ = 0,5 × uₙ + 10 ;
#   · 02-termes     : EN HAUT le thermomètre qui descend (180, 100, 60, 40,
#                     30, 25) ; EN BAS le nuage qui se pose EN MÊME TEMPS ;
#   · 03/03b        : question-pause (B : 20 °C), boutons en rangées, 3 s ;
#                     puis L = 0,5L + 10 donne L = 20 : la cuisine ;
#   · 04-commentaire: avec + 12 au lieu de + 10 ? (réponse 24 °C, NON affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur : bleu = les termes (la température), orange = le « × 0,5 + 10 »,
# vert = le juste (la droite limite), rouge = le chaud (le four).
# Voix : manim/voix/premiere-spe-suite-limite-short.json (débit −6), calée par
# suite_limite_spe_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_limite_spe_short.py SuiteLimiteSpeShort -o eleveai-maths-premiere-spe-suite-limite-short --media_dir manim/scripts/premiere/media-suite-limite-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07 : question_libre)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter_short import SuiteGeoInterpreterShort as _S16  # noqa: E402  (ép. 16 : entete)
from suite_termes_short import SuiteTermesShort as _S18  # noqa: E402  (ép. 18 : q_reponse)
from suite_variation_spe import Bords6 as Bords6Objets  # noqa: E402  (ép. 23)
from suite_evolution import Bords6 as Bords6Textes  # noqa: E402  (ép. 22)
from suite_sommes import OutilsSommes  # noqa: E402  (ép. 24)
from suite_sommes_short import SuiteSommesShort as _S24  # noqa: E402  (ép. 24 : boutons en rangées)
from suite_limite_spe import Repere, mini_lim  # noqa: E402  (la paysage)

GATEAU = [180.0]
for _ in range(5):
    GATEAU.append(0.5 * GATEAU[-1] + 10)
assert GATEAU == [180, 100, 60, 40, 30, 25]                                      # 02
assert 0.5 * 20 + 10 == 20 and 10 / 0.5 == 20                                     # question : B
assert 0.5 * 24 + 12 == 24                                                        # commentaire : 24 °C

PEAU, CHAUD = "#c68642", "#EF4444"


def lou(s=1.0):
    """Lou, pâtissière : toque blanche, veste blanche, tablier orange."""
    corps = RoundedRectangle(width=0.95, height=1.1, corner_radius=0.26, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.1))
    tablier = RoundedRectangle(width=0.55, height=0.75, corner_radius=0.08, fill_color=RAISON, fill_opacity=1,
                               stroke_width=0).move_to(P(0, -0.02))
    tete = Circle(radius=0.26, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.93))
    bandeau = Rectangle(width=0.5, height=0.12, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, 1.16))
    toque = VGroup(*[Circle(radius=0.17, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(dx, 1.34))
                     for dx in (-0.14, 0.0, 0.14)])
    return VGroup(corps, tablier, tete, bandeau, toque).scale(s)


def gateau(s=1.0):
    """Un gâteau à deux étages sur son plat, une cerise."""
    plat = Ellipse(width=1.5, height=0.2, fill_color=GREY_B, fill_opacity=1, stroke_width=0).move_to(P(0, -0.32))
    bas = RoundedRectangle(width=1.2, height=0.42, corner_radius=0.06, fill_color="#B45309", fill_opacity=1,
                           stroke_width=0).move_to(P(0, -0.08))
    creme = RoundedRectangle(width=1.24, height=0.1, corner_radius=0.04, fill_color="#FDE68A", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.15))
    haut = RoundedRectangle(width=0.8, height=0.32, corner_radius=0.06, fill_color="#D97706", fill_opacity=1,
                            stroke_width=0).move_to(P(0, 0.36))
    cerise = Dot(P(0, 0.6), radius=0.08, color=CHAUD)
    return VGroup(plat, bas, creme, haut, cerise).scale(s)


def four(s=1.0):
    """Le four : la caisse, la vitre, les boutons."""
    caisse = RoundedRectangle(width=1.9, height=1.35, corner_radius=0.12, fill_color="#334155", fill_opacity=1,
                              stroke_color=GREY_A, stroke_width=2)
    vitre = RoundedRectangle(width=1.4, height=0.8, corner_radius=0.08, fill_color="#7C2D12", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2).move_to(P(0, -0.14))
    btn = VGroup(*[Dot(P(dx, 0.48), radius=0.06, color=GREY_A) for dx in (-0.5, -0.25, 0.0)])
    return VGroup(caisse, vitre, btn).scale(s)


class Thermometre(VGroup):
    """Un thermomètre : le tube, le réservoir rouge, la colonne qui monte ou descend."""

    def __init__(self, centre, haut=1.6, tmax=200, **kw):
        super().__init__(**kw)
        c = np.array(centre, dtype=float)
        self.y0, self.h, self.tmax = c[1] - haut / 2 + 0.12, haut - 0.3, tmax
        tube = RoundedRectangle(width=0.26, height=haut, corner_radius=0.13, fill_color=FOND_CARTE, fill_opacity=1,
                                stroke_color=WHITE, stroke_width=3).move_to(c)
        bulbe = Circle(radius=0.2, fill_color=CHAUD, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
        bulbe.move_to(P(c[0], c[1] - haut / 2 - 0.05))
        self.x = c[0]
        self.col = self.colonne(0)
        self.add(tube, self.col, bulbe)

    def colonne(self, t):
        hh = max(0.02, t / self.tmax * self.h)
        return Rectangle(width=0.12, height=hh, fill_color=CHAUD, fill_opacity=1, stroke_width=0).move_to(
            P(self.x, self.y0 + hh / 2))


class SuiteLimiteSpeShort(Bords6Textes, Bords6Objets, AuditMilliers, OutilsSommes, OutilsEp12, OutilsGraphique,
                          ShortSuites):
    fichier_marques = "suite_limite_spe_short_marques.json"
    nom_voix = "premiere-spe-suite-limite-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "blanche"
    place_coche = 0.15
    largeur_texte = 3.85          # une vraie marge latérale (≈ 6 %) pour les textes pleine largeur
    k_allumer = 1.03
    entete = _S16.entete
    q_reponse = _S18.q_reponse
    bouton_rangee = _S24.bouton_rangee

    def construct(self):
        # ── 00 : la garde : titre, échelle (70 %), le pari ; les points et le « ? » ──
        self.dire("00-garde")
        self.entete("Limite d'une suite", extrait="Limite d'une suite", fs=32)
        pa = self.paragraphe(["Tu paries que", "tu devines où", ("ça s'arrête ?", RAISON)], 48, buff=0.14, y=1.55)
        m = mini_lim([3.0 + 2.2 * 0.6 ** k for k in range(8)], 3.0, 3.3, 2.0, P(-0.25, -1.15))
        q = self.t("?", 64, RAISON, audit=False).next_to(m.ligne, RIGHT, buff=0.15)
        for l, ex in zip(pa, ("Tu paries", "tu devines", "ça s'arrête")):
            self.au_mot(ex)
            anims = [FadeIn(l, shift=UP * 0.1)]
            if ex == "tu devines":
                anims += [FadeIn(m.axes), LaggedStart(*[GrowFromCenter(p) for p in m.pts], lag_ratio=0.2)]
            if ex == "ça s'arrête":
                anims += [Create(m.ligne), FadeIn(q, scale=1.4)]
            self.play(*anims, run_time=0.5 if len(anims) > 1 else 0.3)
        self.play(Indicate(q, color=RAISON, scale_factor=1.3), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : Lou, pâtissière ; EN HAUT le four, le gâteau, 180 °C ; EN BAS la récurrence ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        pers = lou(0.62).move_to(P(-1.2, 1.95))
        nom = self.t("Lou", 44, JAUNE_TITRE).move_to(P(0.6, 2.2))
        met = self.t("pâtissière", 34, TERME).move_to(P(0.6, 1.66))
        self.au_mot("Lou")
        self.play(FadeIn(pers, shift=UP * 0.15), FadeIn(nom, shift=UP * 0.1), run_time=0.4)
        self.au_mot("pâtissière")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.3)
        fo = four(0.95).move_to(P(-0.45, 0.42))
        ga = gateau(0.62).move_to(fo[1].get_center() + DOWN * 0.04)
        th = Thermometre(P(1.42, 0.45), 1.5)
        self.au_mot("Son gâteau")
        self.play(FadeIn(fo), FadeIn(ga, scale=0.8), FadeIn(th), run_time=0.4)
        self.play(ga.animate.move_to(P(-0.45, 0.35)).scale(1.2), run_time=0.5)
        lab = self.t("180 °C", 46, CHAUD).move_to(P(-0.4, -0.62))
        self.au_mot("180")
        self.play(Transform(th.col, th.colonne(180)), FadeIn(lab, scale=1.3), run_time=0.45)
        self.ecrire([[("Minute après minute :", WHITE, "Minute après")]], -1.3, fs=36)
        self.ecrire([[("u_{n + 1} =", TERME, "u indice n plus 1")]], -1.98, fs=50)
        self.ecrire([[("0,5 ×", RAISON, "0,5 fois"), ("u_{n}", TERME, None), ("+ 10", RAISON, "10")]], -2.62, fs=50)
        self.attendre_voix(marge=0.3)

        # ── 02 : EN HAUT le thermomètre descend ; EN BAS le nuage se pose EN MÊME TEMPS ──
        self.nouvel_ecran("02-termes", garder=(self.badge, self.titre_s))
        ga = gateau(0.85).move_to(P(-0.75, 1.65))
        th = Thermometre(P(1.3, 1.55), 1.5)
        th.col.become(th.colonne(180))
        rp = Repere((0, 5), (0, 200), P(-1.0, -2.3), P(1.2, -0.4), grad_u=(100, 200), grad_n=(1, 3, 5), fs=26)
        lab = None
        for n, v in enumerate(GATEAU):
            self.suivre(fr(v))
            nl = self.t(f"{fr(v)} °C", 46, CHAUD if n == 0 else TERME).move_to(P(-0.75, 0.8))
            d = rp.point(n, v)
            anims = [Transform(th.col, th.colonne(v)), GrowFromCenter(d)]
            anims.append(FadeIn(nl, scale=1.2) if lab is None else ReplacementTransform(lab, nl))
            if n == 0:
                anims += [FadeIn(ga), FadeIn(th), FadeIn(rp)]
            self.play(*anims, run_time=0.25)
            lab = nl
        self.attendre_voix(marge=0.4)

        # ── 03 : question-pause → B (20 °C) ; puis L = 0,5L + 10 donne L = 20 ──
        cartes = VGroup(*[self.bouton_rangee(Ln, nb, fs=44) for Ln, nb in zip("ABC", ("10 °C", "20 °C", "0 °C"))])
        for cc, y in zip(cartes, (0.5, -0.37, -1.24)):
            cc.move_to(P(0, y))
        self._qq = None

        def e1():
            self.largeur_texte = 3.85     # la pause (déjà placée) était bornée à 3,4 : marge de 6 % avec le rebours
            qq = self.paragraphe(["Vers quelle", "température le", "gâteau semble-t-il", "tendre ?"], 44, buff=0.1,
                                 y=2.0)
            for l, ex in zip(qq, ("Vers quelle", "température", "gâteau semble", "tendre")):
                self.au_mot(ex)
                self.play(FadeIn(l, shift=UP * 0.1), run_time=0.25)
            self._qq = qq

        self.largeur_texte = 3.85
        q = self.question_libre("03-question", [e1], cartes, P(0, -1.98))
        self.largeur_texte = 3.85
        self.dire("03b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        self.ecrire([[("L =", TERME, "L égale"), ("0,5", RAISON, "0,5 L"), ("L", TERME, None), ("+ 10", RAISON, "10")]],
                    2.45, fs=48, larg=3.6, avec_part={0: [FadeOut(self._qq)]}, run_time=0.15)
        r = self.ecrire([[("donne", WHITE, "donne"), ("L =", TERME, None), ("20", JUSTE, "20")]], 1.6, fs=46, larg=3.2)
        self.play(r.parts[-1].animate.shift(RIGHT * 0.12), run_time=0.12)
        c1 = self.ecrire([[("la température", JUSTE, "la température")]], -1.98, fs=42,
                         avec=[Create(self.encadre(r.parts[-1], JUSTE, 0.1))])
        c2 = self.ecrire([[("de la cuisine !", JUSTE, "de la cuisine")]], -2.6, fs=42)
        self.play(Indicate(VGroup(c1, c2), color=JUSTE, scale_factor=1.06), run_time=0.4)
        self.attendre_voix(marge=0.8)

        # ── 04 : la question en commentaire : + 12 au lieu de + 10 ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 52, JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        self.ecrire([[("Avec", WHITE, "avec"), ("u_{n + 1} =", TERME, "u indice n plus 1")]], 2.62, fs=44, larg=3.5)
        self.ecrire([[("0,5 ×", RAISON, "0,5 fois"), ("u_{n}", TERME, None), ("+ 12", RAISON, "12")]], 1.92, fs=48,
                    larg=3.6)
        pa = self.paragraphe(["vers quelle", "température le", "gâteau tend-il ?"], 44, buff=0.1, y=0.72)
        ga = gateau(0.85).move_to(P(-0.6, -0.95))
        th = Thermometre(P(1.15, -0.8), 1.15)
        th.col.become(th.colonne(180))
        for l, ex in zip(pa, ("vers quelle", "température le", "gâteau tend")):
            self.au_mot(ex)
            anims = [FadeIn(l, shift=UP * 0.1)]
            if ex == "gâteau tend":
                anims += [FadeIn(ga, scale=0.8), FadeIn(th)]
            self.play(*anims, run_time=0.3)
        tq = self.t("?", 56, RAISON, audit=False).next_to(th, LEFT, buff=0.3).shift(UP * 0.35)
        self.play(Transform(th.col, th.colonne(40)), FadeIn(tq, scale=1.4), run_time=0.8)
        self.appel_commentaire(-2.42)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
