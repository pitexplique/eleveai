# suite_somme_geo_short.py
# EleveAI — Maths 1re spé — short « Somme géométrique : tu paries que ça grimpe
# plus vite que tu ne crois ? » (9:16), ceinture BLANCHE (échelle entière à 70 %
# sous le titre). Série SUITES, épisode 25. Micro : suite_somme_geo (u₀ en
# facteur : 3 + 6 + … + 48 = 3 × (2⁵ − 1)/(2 − 1) = 93).
#   · 00-garde      : le titre, l'échelle, le pari ; des barres qui doublent ;
#   · 01-situation  : EN HAUT Enzo et son morceau (la note qui saute), les 3
#                     premiers partages ; EN BAS les cases J1 → J5, « × 2 » ;
#   · 02-calcul     : chaque case à sa voix (3, 6, 12, 24, 48), puis la formule
#                     3 × (2⁵ − 1)/(2 − 1) = 3 × 31 = 93 ;
#   · 03/03b        : question-pause (C : 3 069), 3 s ; 3 × (2¹⁰ − 1) = 3 × 1 023 ;
#   · 04-commentaire: sur 20 jours ? (réponse : 3 × (2²⁰ − 1) = 3 145 725, NON
#                     affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur : bleu = les termes (les partages), orange = la raison × 2 et les
# exposants, vert = juste, rouge = le piège.
# Voix : manim/voix/premiere-spe-suite-somme-geo-short.json (débit −6), calée par
# suite_somme_geo_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_somme_geo_short.py SuiteSommeGeoShort -o eleveai-maths-premiere-spe-suite-somme-geo-short --media_dir manim/scripts/premiere/media-suite-somme-geo-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07 : question_libre)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12 : calcul)
from suite_geo_interpreter_short import SuiteGeoInterpreterShort as _S16  # noqa: E402  (ép. 16 : entete)
from suite_termes_short import SuiteTermesShort as _S18  # noqa: E402  (ép. 18 : q_reponse)
from suite_modeliser import SuiteModeliser1reSpe as _P21  # noqa: E402  (ép. 21 : ligne sans ligature)
from suite_evolution import Bords6  # noqa: E402  (ép. 22 : 6 % de marge)
from suite_somme_geo import Bords6Cases, Frac, OutilsSommeGeo  # noqa: E402  (la paysage : la formule à fraction)

assert [3 * 2 ** k for k in range(5)] == [3, 6, 12, 24, 48] and sum([3, 6, 12, 24, 48]) == 93 == 3 * 31   # 02
assert 3 * (2 ** 10 - 1) == 3 * 1023 == 3069 and 3 * 2 ** 9 == 1536 and 3 * 2 ** 10 == 3072   # question : C
assert 3 * (2 ** 20 - 1) == 3145725                                                            # commentaire (non affiché)


def enzo(s=1.0):
    """Enzo : sweat violet, casque audio orange sur les oreilles."""
    corps = RoundedRectangle(width=0.9, height=1.05, corner_radius=0.3, fill_color="#7C3AED", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.05))
    tete = Circle(radius=0.25, fill_color="#c68642", fill_opacity=1, stroke_width=0).move_to(P(0, 0.85))
    cheveux = Sector(radius=0.26, angle=PI, start_angle=0, fill_color="#1f1300", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.0))
    arceau = Arc(radius=0.33, start_angle=0.15, angle=PI - 0.3, stroke_color=RAISON, stroke_width=6).move_to(P(0, 1.05))
    oreilles = VGroup(*[RoundedRectangle(width=0.14, height=0.26, corner_radius=0.05, fill_color=RAISON, fill_opacity=1,
                                         stroke_width=0).move_to(P(x, 0.85)) for x in (-0.29, 0.29)])
    return VGroup(corps, tete, cheveux, arceau, oreilles).scale(s)


def note(s=1.0, couleur=JAUNE_TITRE):
    """Une double croche dessinée (pas de glyphe de police)."""
    t1 = Ellipse(width=0.3, height=0.22, fill_color=couleur, fill_opacity=1, stroke_width=0).rotate(0.4).move_to(P(-0.25, -0.3))
    t2 = t1.copy().move_to(P(0.3, -0.2))
    h1 = Line(P(-0.12, -0.27), P(-0.12, 0.42), stroke_width=5, color=couleur)
    h2 = Line(P(0.43, -0.17), P(0.43, 0.52), stroke_width=5, color=couleur)
    barre = Polygon(P(-0.14, 0.32), P(0.45, 0.42), P(0.45, 0.56), P(-0.14, 0.46), fill_color=couleur, fill_opacity=1,
                    stroke_width=0)
    return VGroup(t1, t2, h1, h2, barre).scale(s)


def bonhomme(s=1.0, couleur=TERME):
    return VGroup(Circle(radius=0.11, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, 0.2)),
                  RoundedRectangle(width=0.3, height=0.26, corner_radius=0.1, fill_color=couleur, fill_opacity=1,
                                   stroke_width=0).move_to(P(0, -0.08))).scale(s)


class SuiteSommeGeoShort(Bords6Cases, AuditMilliers, OutilsSommeGeo, OutilsEp12, OutilsGraphique, ShortSuites):
    fichier_marques = "suite_somme_geo_short_marques.json"
    nom_voix = "premiere-spe-suite-somme-geo-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "blanche"
    place_coche = 0.15
    largeur_texte = 3.85          # une vraie marge latérale (≈ 6 %) pour les textes pleine largeur
    k_allumer = 1.03
    entete = _S16.entete
    q_reponse = _S18.q_reponse
    ligne = _P21.ligne

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; les barres ──
        self.dire("00-garde")
        self.entete("Somme géométrique", extrait="Somme géométrique", fs=40)
        base = -2.7
        b = VGroup(*[Rectangle(width=0.5, height=0.175 * 2 ** k, fill_color=TERME, fill_opacity=1, stroke_width=0)
                     .move_to(P(-1.6 + 0.8 * k, base), aligned_edge=DOWN) for k in range(5)])
        sol = Line(P(-1.95, base), P(1.95, base), stroke_width=3, color=GREY_B)
        self.calcul([("Tu paries que", WHITE, "Tu paries")], 2.3, centre=0, fs=36)
        self.calcul([("ça grimpe", RAISON, "ça grimpe")], 1.7, centre=0, fs=36,
                    avec=[Create(sol), LaggedStart(*[GrowFromEdge(x, DOWN) for x in b], lag_ratio=0.3)])
        self.calcul([("plus vite que", WHITE, "plus vite")], 1.09, centre=0, fs=36)
        q = Text("?", font_size=80, color=RAISON).move_to(P(-0.6, -0.55))
        self.calcul([("tu ne crois ?", WHITE, "tu ne crois")], 0.48, centre=0,
                    fs=36, avec=[FadeIn(q, scale=1.5), Indicate(b[-1], color=RAISON, scale_factor=1.08)])
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT Enzo et son morceau ; EN BAS les cases J1 → J5 ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        ez = enzo(0.85).move_to(P(-1.2, 1.84))
        nom = self.t("Enzo", 44, JAUNE_TITRE).move_to(P(0.85, 2.25))
        nt = note(0.75).move_to(P(0.2, 1.5))
        self.au_mot("Enzo")
        self.play(FadeIn(ez, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.4)
        self.calcul([("publie son premier", WHITE, "publie")], 0.92, centre=0, fs=27,
                    avec=[FadeIn(nt, shift=UP * 0.3, scale=0.6)])
        self.calcul([("morceau de musique", RAISON, "morceau")], 0.47, centre=0, fs=27,
                    avec=[nt.animate.shift(UP * 0.12).rotate(0.15)])
        xs = [-1.56 + 0.78 * k for k in range(5)]   # cases à plus de 6 % des bords (relecture 13/11)
        lg = LigneTermes(["3"] + ["?"] * 4, xs=xs, centre=P(0, -1.1), largeur=0.64, hauteur=0.7, fs=26,
                         noms=[f"J{k}" for k in range(1, 6)], fs_noms=24)
        gens = VGroup(*[bonhomme(1.0).move_to(P(0.88 + 0.42 * k, 1.45)) for k in range(3)])
        self.au_mot("Le premier jour")
        self.suivre("3")
        self.play(FadeIn(lg.cases[0][0], scale=0.8), FadeIn(lg.cases[0][1], scale=1.4), FadeIn(lg.noms[0]),
                  run_time=0.3)
        self.au_mot("partagent")
        self.play(LaggedStart(*[FadeIn(g, shift=DOWN * 0.15) for g in gens], lag_ratio=0.3),
                  Indicate(lg.cases[0], color=TERME, scale_factor=1.12), run_time=0.6)
        arcs = [lg.saut(k, "× 2", cote=UP, fs=24) for k in range(4)]
        self.calcul([("Puis chaque jour,", WHITE, "Puis chaque")], -2.24, centre=0, fs=34)
        self.calcul([("2 fois plus", RAISON, "2 fois plus")], -2.72, centre=0, fs=36,
                    avec=[LaggedStart(*[AnimationGroup(Create(a[0]), FadeIn(a[1], scale=1.3),
                                                       FadeIn(lg.cases[k + 1], scale=0.8), FadeIn(lg.noms[k + 1]))
                                        for k, a in enumerate(arcs)], lag_ratio=0.35)])
        self.attendre_voix(marge=0.2)

        # ── 02 : chaque case à sa voix, puis la formule → 93 ──
        self.nouvel_ecran("02-calcul", garder=(self.badge, self.titre_s, lg.cases, lg.noms))
        # les « J1 … J5 » partent : « Sur 5 jours » les dit, la place va à la formule
        self.au_mot("Sur")
        self.suivre("5")
        sur = self.t("Sur 5 jours :", 36, WHITE).move_to(P(0, 2.33))
        self.play(FadeIn(sur, shift=DOWN * 0.1), FadeOut(lg.noms), lg.cases.animate.shift(UP * 2.72), run_time=0.4)
        for k, v in enumerate(["6", "12", "24", "48"]):
            c = lg.cases[k + 1]
            t = Text(v, font_size=26, color=WHITE).move_to(c[0])
            self.suivre(v)
            self.play(FadeOut(c[1]), FadeIn(t, scale=1.4), run_time=0.2)
            c.remove(c[1])
            c.add(t)
        self.calcul([("Avec la formule :", RAISON, "Avec la formule")], 0.78, centre=0, fs=36)
        self.largeur_texte = 3.7
        self.formule([("3 ×", WHITE, "3 fois,"),
                      Frac([("2⁵", RAISON, "2 puissance 5"), ("− 1", WHITE, "moins 1")], [("2 − 1", WHITE, "2 moins 1")],
                           ex_barre="divisé")], -0.45, centre=0, fs=48)
        self.formule([("= 3 ×", WHITE, "égale 3 fois"), ("31", WHITE, "31")], -1.55, centre=0, fs=48)
        self.largeur_texte = 3.55
        c = self.formule([("=", WHITE, "égale 93"), ("93", JUSTE, None), ("personnes", JUSTE, "personnes")], -2.4,
                         centre=0, fs=42)
        self.largeur_texte = 3.85
        self.play(c.seq[0].animate.shift(LEFT * 0.13), c.seq[2].animate.shift(RIGHT * 0.13), run_time=0.12)
        self.play(Create(self.encadre(c.seq[1], JUSTE, 0.1)), *self.allumer_cases(lg, range(5)), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → C (3 069) ──
        corps = [self.t(v, 44, WHITE, 1e9) for v in ("1 536", "3 072", "3 069")]
        cartes = VGroup(*[self.bouton(Ln, m, 3.5, 44) for Ln, m in zip("ABC", corps)]).arrange(DOWN, buff=0.18)
        cartes.move_to(P(0, -0.79))

        def e1():
            self.calcul([("Et sur", WHITE, "Et sur"), ("10 jours,", RAISON, "10 jours")], 2.84, centre=0, fs=36)
            self.calcul([("combien de", WHITE, "combien de")], 2.29, centre=0, fs=36)
            self.calcul([("personnes", WHITE, "personnes")], 1.65, centre=0, fs=36)
            self.calcul([("en tout ?", JAUNE_TITRE, "en tout")], 1.17, centre=0, fs=36)

        q = self.question_libre("03-question", [e1], cartes, P(0, -2.75))
        self.dire("03b-reponse")
        self.au_mot("Réponse C")
        self.q_reponse(q, 2)
        self.largeur_texte = 3.7
        self.formule([("3 ×", WHITE, "3 fois,"), ("(2¹⁰", RAISON, "2 puissance 10"), ("− 1)", WHITE, "moins 1")], -0.66,
                     centre=0, fs=48, avec_morceau={0: [FadeOut(cartes[0]), FadeOut(cartes[1]),
                                                        cartes[2].animate.move_to(P(0, 0.3))]})
        self.formule([("= 3 ×", WHITE, "égale 3 fois"), ("1 023", WHITE, "1 023")], -1.45, centre=0, fs=48)
        c = self.formule([("=", WHITE, "égale 3 069"), ("3 069", JUSTE, None)], -2.32, centre=-0.1, fs=50)
        self.largeur_texte = 3.85
        self.play(c.seq[-1].animate.shift(RIGHT * 0.14), run_time=0.12)
        self.play(Create(self.encadre(c.seq[-1], JUSTE, 0.12)), run_time=0.25)
        self.attendre_voix(marge=0.8)

        # ── 04 : la question en commentaire : sur 20 jours ? ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 52, JAUNE_TITRE).move_to(P(0, 3.38))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        base = -1.45
        bs = VGroup(*[Rectangle(width=0.14, height=max(0.03, 2.1 * 2 ** (k - 19)), fill_color=TERME, fill_opacity=1,
                                stroke_width=0).move_to(P(-1.71 + 0.18 * k, base), aligned_edge=DOWN) for k in range(20)])
        sol = Line(P(-1.9, base), P(1.9, base), stroke_width=3, color=GREY_B)
        self.calcul([("sur", WHITE, "sur 20"), ("20 jours,", RAISON, None)], 2.72, centre=0, fs=36,
                    avec=[Create(sol), LaggedStart(*[GrowFromEdge(x, DOWN) for x in bs], lag_ratio=0.12)])
        self.calcul([("combien de", WHITE, "combien de")], 2.17, centre=0, fs=36)
        self.calcul([("personnes", WHITE, "personnes")], 1.55, centre=0, fs=36)
        self.calcul([("en tout ?", JAUNE_TITRE, "en tout")], 1.05, centre=0, fs=36,
                    avec=[Indicate(bs[-1], color=RAISON, scale_factor=1.05)])
        self.appel_commentaire(-2.35)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
