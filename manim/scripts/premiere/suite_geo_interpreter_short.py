# suite_geo_interpreter_short.py
# EleveAI — Maths 1re (sans spé) — short « Interpréter une suite géométrique :
# tu paries que tu ne confonds pas le total et la hausse ? » (9:16), ceinture
# BLANCHE (échelle entière à 70 % sous le titre). Série SUITES, épisode 16.
# Micro : expo_suite_interpreter (gInterpTerme : un terme est une valeur, pas un gain).
#   · 00-garde      : le titre, l'échelle, le pari ; la barre « total » et sa part « hausse » ;
#   · 01-situation  : EN HAUT le téléphone qui joue le morceau de rap ; EN BAS
#                     uₙ (écoutes de la semaine, n semaines après la sortie) et
#                     uₙ = 1 600 × 1,5ⁿ, l'égaliseur bouge avec la formule ;
#   · 02-calcul     : u₂ = 1 600 × 2,25 = 3 600 ; EN MÊME TEMPS le compteur du
#                     téléphone et la barre u₂ du diagramme ;
#   · 03/03b        : question-pause (B : 2 semaines après la sortie, 3 600
#                     écoutes dans la semaine), 3 s ; puis la barre u₂ = une
#                     valeur, au rang 2, et la croix sur « un gain » ;
#   · 04-commentaire: les barres u₀ … u₄, « ? » sur u₄ (réponse 8 100 =
#                     1 600 × 1,5⁴, NON affichée) ; « Réponds en commentaire ! » ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = raison et hausse, vert = juste, rouge = piège.
# Voix : manim/voix/premiere-suite-geo-interpreter-short.json (débit −6), calée
# par suite_geo_interpreter_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_geo_interpreter_short.py SuiteGeoInterpreterShort -o eleveai-maths-premiere-suite-geo-interpreter-short --media_dir manim/scripts/premiere/media-suite-geo-interpreter-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)

ECOUTES = [round(1600 * 1.5 ** n) for n in range(5)]
assert ECOUTES[2] == 3600 and abs(1.5 ** 2 - 2.25) < 1e-9
assert ECOUTES[4] == 8100                                   # la réponse du commentaire (non affichée)
VIOLET = "#A855F7"


def telephone(s=1.0):
    """Le téléphone qui joue le morceau : l'écran, la note, l'égaliseur (g[-1])."""
    corps = RoundedRectangle(width=1.05, height=1.9, corner_radius=0.16, fill_color="#111827", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=3)
    ecran = RoundedRectangle(width=0.86, height=1.55, corner_radius=0.08, fill_color="#1E1B4B", fill_opacity=1,
                             stroke_width=0)
    tete = Circle(radius=0.11, fill_color=VIOLET, fill_opacity=1, stroke_width=0).move_to(P(-0.08, 0.28))
    hampe = Line(P(0.02, 0.28), P(0.02, 0.62), stroke_color=VIOLET, stroke_width=5)
    drapeau = Line(P(0.02, 0.62), P(0.2, 0.5), stroke_color=VIOLET, stroke_width=5)
    eq = VGroup(*[Rectangle(width=0.1, height=h, fill_color=RAISON, fill_opacity=1, stroke_width=0)
                  for h in (0.12, 0.22, 0.16, 0.26, 0.1)]).arrange(RIGHT, buff=0.05, aligned_edge=DOWN)
    eq.move_to(P(0, -0.42), aligned_edge=DOWN)
    return VGroup(corps, ecran, VGroup(tete, hampe, drapeau), eq).scale(s)


def casque(s=1.0):
    """Un casque audio : l'arceau et les deux écouteurs."""
    arc = Arc(radius=0.42, start_angle=0.15, angle=PI - 0.3, stroke_color=GREY_A, stroke_width=7)
    g = RoundedRectangle(width=0.2, height=0.36, corner_radius=0.07, fill_color=VIOLET, fill_opacity=1,
                         stroke_width=0).move_to(P(-0.42, -0.02))
    d = g.copy().move_to(P(0.42, -0.02))
    return VGroup(arc, g, d).scale(s)


def bouton_texte(lignes, fs=28):
    """Le corps d'un bouton : trois lignes à la même taille."""
    g = VGroup(*[Text(l, font_size=fs, color=WHITE) for l in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
    g.original_text = " ".join(lignes)
    return g


class SuiteGeoInterpreterShort(AuditMilliers, OutilsEp12, OutilsGraphique, ShortSuites):
    fichier_marques = "suite_geo_interpreter_short_marques.json"
    nom_voix = "premiere-suite-geo-interpreter-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"
    place_coche = 0.15            # la coche prend la place de la lettre (q_reponse)

    def entete(self, titre, extrait=None, fs=40):
        """Comme l'ép. 15 : le titre en haut, l'échelle (70 %) 0,15 sous lui."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.titre_s = self.t(titre, fs, JAUNE_TITRE).move_to(P(0, 3.55))
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.next_to(self.titre_s, DOWN, buff=0.15)
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def q_reponse(self, q, bonne):
        """La bonne réponse s'allume ; la coche remplace la lettre (copie de l'ép. 15)."""
        cartes = q.cartes
        b = cartes[bonne]
        rond, lettre = b[1][0]
        anims = [b[0].animate.set_stroke(JUSTE, width=7).set_fill("#052e16", 1), rond.animate.set_fill(JUSTE)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(len(cartes)) if j != bonne]
        self.play(*anims, FadeOut(q.rebours), FadeOut(q.pause), run_time=0.25)
        ok = self.coche(WHITE, 0.17).set_stroke(width=7).move_to(rond)
        self.play(FadeOut(lettre), Create(ok), run_time=0.25)
        b[1][0].remove(lettre)
        b.add(ok)
        self.insister(b, self.k_allumer)
        return ok

    def barres(self, n, y0=-2.6, xs=None, haut=1.9, larg=0.62):
        """Les barres des écoutes u₀ … u_{n−1} (u₂ = 3 600 → haut), leurs noms dessous."""
        xs = xs or [-1.5 + 0.75 * k for k in range(n)]
        k = haut / ECOUTES[2]
        bs = [Rectangle(width=larg, height=k * ECOUTES[i], fill_color=TERME, fill_opacity=1, stroke_width=0)
              .move_to(P(xs[i], y0), aligned_edge=DOWN) for i in range(n)]
        noms = [self.t(u(i), 28, TERME).next_to(bs[i], DOWN, buff=0.08) for i in range(n)]
        sol = Line(P(xs[0] - 0.5, y0), P(xs[-1] + 0.5, y0), stroke_color=GREY_B, stroke_width=3)
        return sol, bs, noms

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; total et hausse ──
        self.dire("00-garde")
        self.entete("Interpréter", extrait="Interpréter", fs=40)
        sg = self.paragraphe(["une suite", "géométrique"], 34, TERME, buff=0.12, y=2.3)
        sg.next_to(self.badge, DOWN, buff=0.32)
        self.au_mot("une suite")
        self.play(FadeIn(sg, shift=UP * 0.1), run_time=0.3)
        pari = self.paragraphe(["Tu paries que", "tu ne confonds", "pas le total", ("et la hausse ?", RAISON)], 40,
                               buff=0.12, y=-0.1)
        pari[2].set_color(JUSTE)
        for ligne, ex in zip(pari, ("Tu paries", "tu ne confonds", "pas le total", "et la hausse")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.25)
            if ex == "pas le total":
                y0 = -2.75
                av = Rectangle(width=0.7, height=0.75, fill_color=TERME, fill_opacity=1, stroke_width=0)
                av.move_to(P(-1.3, y0), aligned_edge=DOWN)
                ap = Rectangle(width=0.7, height=0.75, fill_color=TERME, fill_opacity=1, stroke_width=0)
                ap.move_to(P(-0.1, y0), aligned_edge=DOWN)
                hs = Rectangle(width=0.7, height=0.55, fill_color=RAISON, fill_opacity=1, stroke_width=0)
                hs.next_to(ap, UP, buff=0)
                sol = Line(P(-1.9, y0), P(0.5, y0), stroke_color=GREY_B, stroke_width=3)
                tot = self.encadre(VGroup(ap, hs), JUSTE, 0.06)
                self.play(Create(sol), GrowFromEdge(av, DOWN), GrowFromEdge(VGroup(ap, hs), DOWN), run_time=0.35)
                self.play(Create(tot), run_time=0.3)
        lh = self.t("hausse", 30, RAISON).next_to(hs, RIGHT, buff=0.2)
        self.play(FadeIn(lh, shift=LEFT * 0.1), Indicate(hs, color=RAISON, scale_factor=1.1), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT le téléphone qui joue le rap ; EN BAS uₙ et la formule ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        tel = telephone(0.75).move_to(P(-1.4, 1.5))
        haut = [self.t(l, 30, c) for l, c in (("un morceau", WHITE), ("de rap", VIOLET), ("en streaming", TERME))]
        VGroup(*haut).arrange(DOWN, buff=0.12).move_to(P(0.7, 1.5))
        self.au_mot("morceau de rap")
        self.play(FadeIn(tel, shift=UP * 0.15), FadeIn(haut[0]), FadeIn(haut[1]),
                  run_time=0.4)
        self.au_mot("en streaming")
        eq = tel[-1]
        self.play(FadeIn(haut[2], shift=UP * 0.08), eq.animate.stretch(1.6, 1, about_edge=DOWN), run_time=0.35)
        self.play(eq.animate.stretch(1 / 1.6, 1, about_edge=DOWN), run_time=0.25)
        bas = self.paragraphe([("uₙ : les écoutes", WHITE), "de la semaine,", "n semaines", "après la sortie"], 36,
                              buff=0.1, y=-0.4)
        bas[0][:2].set_color(TERME)
        for ligne, ex in zip(bas, ("u indice n", "de la semaine", "n semaines", "après la sortie")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.25)
        self.au_mot("u indice n égale")
        f = self.calcul([("uₙ =", TERME, None), ("1 600", TERME, "1 600"), ("×", WHITE, "fois"), ("1,5", RAISON, "1,5"),
                         ("ⁿ", RAISON, None)], -2.05, centre=0, fs=50,
                        avec=[eq.animate.stretch(1.8, 1, about_edge=DOWN)])
        self.play(eq.animate.stretch(1 / 1.8, 1, about_edge=DOWN), Indicate(f[3], color=RAISON), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 02 : u₂ = 3 600 : le compteur et la barre EN MÊME TEMPS ──
        self.nouvel_ecran("02-calcul", garder=(self.badge, self.titre_s, tel, *haut))
        sol, bs, noms = self.barres(3, y0=-2.6, xs=[-1.2, 0.0, 1.2], haut=1.35, larg=0.7)
        e16 = self.t("1 600", 28, TERME).next_to(bs[0], UP, buff=0.1)
        self.calcul([("u₂ =", TERME, "u indice 2"), ("1 600", WHITE, "1 600"), ("×", WHITE, "fois"),
                     ("2,25", RAISON, "2,25")], 0.22, centre=0, fs=44,
                    avec_morceau={0: [Create(sol), *[GrowFromEdge(b, DOWN) for b in bs[:2]], *[FadeIn(n) for n in noms[:2]]],
                                  1: [FadeIn(e16, scale=1.2)]})
        e36 = self.t("3 600", 30, JUSTE).next_to(bs[2], UP, buff=0.1)
        c = self.calcul([("=", WHITE, "égale"), ("3 600", JUSTE, "3 600")], -0.42, centre=0, fs=50,
                        avec_morceau={1: [GrowFromEdge(bs[2], DOWN), FadeIn(noms[2]), FadeIn(e36, scale=1.3),
                                          eq.animate.stretch(1.8, 1, about_edge=DOWN)]})
        self.play(eq.animate.stretch(1 / 1.8, 1, about_edge=DOWN), Create(self.encadre(c[1], JUSTE, 0.1)),
                  bs[2].animate.set_fill(JUSTE), run_time=0.3)
        self.attendre_voix(marge=0.4)

        # ── 03 : question-pause → B ; puis une valeur, au rang 2, pas un gain ──
        fsb = 28
        corps = [bouton_texte(l, fsb) for l in (["gagné :", "3 600 écoutes", "en 2 semaines"],
                                                ["à 2 semaines,", "3 600 écoutes", "la semaine"],
                                                ["à 3 semaines,", "3 600 écoutes", "la semaine"])]
        for c, ex in zip(corps, (["gagné", "3 600", "2"], ["2", "3 600", "dans la semaine"],
                                 ["3", "3 600", "dans la semaine"])):
            c.extraits = ex  # chaque ligne du bouton quand la voix la dit
        f = min(1.0, (4.0 - self.place_coche - 0.5 * fsb / 32 - 0.45) / max(c.width for c in corps))
        for c in corps:
            c.scale(f)  # même taille de texte dans les 3 boutons
        cartes = VGroup(*[self.bouton(L, c, 4.0, fsb) for L, c in zip("ABC", corps)])
        cartes.arrange(DOWN, buff=0.1).move_to(P(0, 0)).align_to(P(0, 2.12), UP)
        ql = []

        def e1():
            ql.append(self.calcul([("u₂ =", TERME, "u indice 2"), ("3 600.", WHITE, "3 600")], 2.92, centre=0, fs=36))
            ql.append(self.calcul([("Ça veut dire :", WHITE, "Ça veut")], 2.47, centre=0, fs=32))

        q = self.question_libre("03-question", [e1], cartes, P(0, cartes.get_bottom()[1] - 0.38))
        self.dire("03b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        b = cartes[1]
        self.play(FadeOut(cartes[0]), FadeOut(cartes[2]), FadeOut(q.tete), *[FadeOut(m) for m in ql], run_time=0.25)
        self.play(b.animate.move_to(P(0, 2.75)), run_time=0.3)
        sol, bs, noms = self.barres(3, y0=-2.6, xs=[-1.2, 0.0, 1.2], haut=1.2, larg=0.7)
        gain = Rectangle(width=0.7, height=bs[2].height - bs[0].height, fill_color=RAISON, fill_opacity=1,
                         stroke_width=0).move_to(bs[2].get_top(), aligned_edge=UP)
        niv = DashedLine(bs[0].get_corner(UR), P(bs[2].get_left()[0], bs[0].get_top()[1]), color=GREY_A,
                         stroke_width=3, dash_length=0.08)
        self.play(Create(sol), *[GrowFromEdge(x, DOWN) for x in bs], *[FadeIn(n) for n in noms], run_time=0.35)
        self.au_mot("Un terme")
        l1 = self.paragraphe([("Un terme :", WHITE), ("une valeur,", JUSTE)], 40, buff=0.1, y=1.15)
        self.play(FadeIn(l1, shift=UP * 0.1), bs[2].animate.set_fill(JUSTE), run_time=0.35)
        self.au_mot("au rang")
        self.suivre("2")
        l2 = self.t("au rang 2", 40, JUSTE).move_to(P(0, 0.2))
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(noms[2], color=JUSTE, scale_factor=1.4), run_time=0.35)
        self.au_mot("pas un gain")
        l3 = self.t("pas un gain", 40, PIEGE).move_to(P(0, -0.65))
        self.play(FadeIn(l3, shift=UP * 0.1), Create(niv), FadeIn(gain), run_time=0.35)
        cx = self.croix(gain.get_center(), r=0.24)
        self.play(Create(cx), Create(self.barre_lisible(l3)), run_time=0.3)
        self.attendre_voix(marge=0.8)

        # ── 04 : la question en commentaire ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 50, JAUNE_TITRE).move_to(P(0, 3.5))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        y0, k = 1.0, 1.5 / ECOUTES[3]
        xs = [-1.6 + 0.8 * i for i in range(5)]
        bs = [Rectangle(width=0.55, height=k * ECOUTES[i], fill_color=TERME, fill_opacity=1, stroke_width=0)
              .move_to(P(xs[i], y0), aligned_edge=DOWN) for i in range(4)]
        q4 = DashedVMobject(Rectangle(width=0.55, height=1.9, stroke_color=RAISON, stroke_width=4),
                            num_dashes=24).move_to(P(xs[4], y0), aligned_edge=DOWN)
        qm = self.t("?", 48, RAISON).move_to(q4)
        noms = [self.t(u(i), 28, TERME).next_to(P(xs[i], y0), DOWN, buff=0.12) for i in range(5)]
        sol = Line(P(xs[0] - 0.45, y0), P(xs[4] + 0.45, y0), stroke_color=GREY_B, stroke_width=3)
        self.play(Create(sol), *[GrowFromEdge(x, DOWN) for x in bs], *[FadeIn(n) for n in noms[:4]], run_time=0.4)
        question = self.paragraphe(["Combien d'écoutes", "dans la semaine,", ("4 semaines", RAISON),
                                    "après la sortie ?"], 36, buff=0.1, y=-0.6)
        for ligne, ex in zip(question, ("combien", "dans la semaine", "4", "après la sortie")):
            if ex == "4":
                self.suivre("4")
            else:
                self.au_mot(ex)
            anims = [FadeIn(ligne, shift=UP * 0.1)]
            if ex == "4":
                anims += [Create(q4), FadeIn(qm, scale=1.4), FadeIn(noms[4])]
            self.play(*anims, run_time=0.3)
        self.appel_commentaire(-2.35)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
