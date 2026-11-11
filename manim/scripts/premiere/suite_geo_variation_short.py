# suite_geo_variation_short.py
# EleveAI — Maths 1re (sans spé) — short « Sens de variation : tu paries que tu
# sais si elle monte ou descend, sans calculer ? » (9:16), ceinture BLANCHE
# (échelle entière sous le titre, 70 %). Série SUITES, épisode 14.
# Micro du coach : expo_suite_variation. Jumeau géométrique du short de l'ép. 06.
#   · 00-garde      : le titre, l'échelle, le pari en gros ; la flèche verte qui
#                     monte à « monte », la violette qui descend à « descend » ;
#   · 01-situation  : EN HAUT le sang du patient en trois coupes (une par heure) :
#                     16, puis 12, puis 9 grains de médicament ; EN BAS, sous
#                     chaque coupe, la barre u₀, u₁, u₂ qui pousse EN MÊME TEMPS ;
#                     « − 25 % chaque heure », puis les sauts « × 0,75 » ;
#   · 02-idee       : « 0,75 < 1 » ;
#   · 03/03b        : question-pause (A : décroissante), 3 s ; « 0 < q < 1 », les
#                     barres descendent vers 0 sans passer dessous ;
#   · 04-commentaire: « Et toi ? » 200 mg, après 2 heures : ? (réponse 112,5 mg =
#                     200 × 0,75², NON affichée), « Réponds en commentaire ! » ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (série) : bleu = termes (et les grains de médicament), orange =
# raison, vert = juste, violet = « décroissante ».
# Voix : manim/voix/premiere-suite-geo-variation-short.json (débit −6),
# calée par suite_geo_variation_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_geo_variation_short.py SuiteGeoVariationShort -o eleveai-maths-premiere-suite-geo-variation-short --media_dir manim/scripts/premiere/media-suite-geo-variation-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402
from suite_arith_variation import DESCEND, fleche_sens  # noqa: E402
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ligne : de vraies espaces)
from suite_geo_variation import barres  # noqa: E402  (les termes en barres, paysage de l'épisode)

GRAINS = [16, 12, 9]
assert GRAINS[1] == GRAINS[0] * 0.75 and GRAINS[2] == GRAINS[1] * 0.75     # − 25 % = × 0,75
assert 0 < 0.75 < 1                                                       # → A (décroissante)
assert 200 * 0.75 ** 2 == 112.5                                           # le commentaire : 112,5 mg
XS = (-1.42, 0.0, 1.42)                    # les 3 heures : la coupe en haut, la barre dessous
Y_SANG, Y_BASE, H0 = 1.5, -1.45, 1.1
SANG, SANG_BORD = "#4c0519", "#9f1239"


def coupe(n, r=0.48):
    """Une goutte du sang du patient (vue en coupe) et ses grains de médicament
    (bleus) : les 16 places d'une grille 4 × 4, les n premières remplies."""
    disque = Circle(radius=r, fill_color=SANG, fill_opacity=1, stroke_color=SANG_BORD, stroke_width=4)
    places = [P(-0.255 + 0.17 * (k % 4), 0.255 - 0.17 * (k // 4)) for k in range(16)]
    grains = VGroup(*[Dot(places[k], radius=0.065, color=TERME) for k in range(n)])
    grains.set_z_index(2)  # toujours devant le disque
    return VGroup(disque, grains)


def barre(k, x):
    return Rectangle(width=0.62, height=H0 * 0.75 ** k, fill_color=TERME, fill_opacity=1, stroke_width=0).move_to(
        P(x, Y_BASE + H0 * 0.75 ** k / 2))


class SuiteGeoVariationShort(AuditMilliers, OutilsEp12, ShortSuites):
    fichier_marques = "suite_geo_variation_short_marques.json"
    nom_voix = "premiere-suite-geo-variation-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"
    place_coche = 0.78
    hauteur_bouton = 0.95         # le choix B, sur trois lignes, a son bouton plus haut

    def entete(self, titre, extrait=None, fs=40):
        """L'en-tête du module commun (échelle à 70 %), titre un peu plus haut et
        l'échelle posée SOUS lui avec un écart de 0,15 (comme l'ép. 12)."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.titre_s = self.t(titre, fs, JAUNE_TITRE).move_to(P(0, 3.6))
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.next_to(self.titre_s, DOWN, buff=0.15)
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def saut_barres(self, a, b, y_lab, texte="× 0,75", fs=24):
        """La flèche « × 0,75 » du haut de la barre a au haut de la barre b ; son
        texte sur la ligne y_lab (les deux textes alignés, sans se toucher)."""
        d, f = a.get_top() + UP * 0.08 + RIGHT * 0.12, b.get_top() + UP * 0.08 + LEFT * 0.12
        fl = CurvedArrow(d, f, angle=-0.9, color=RAISON, stroke_width=4, tip_length=0.14)
        lab = Text(texte, font_size=fs, color=RAISON).move_to(P(fl.get_center()[0], y_lab))
        return VGroup(fl, lab)

    def construct(self):
        # ── 00 : la garde : titre, échelle (70 %), le pari ; les deux flèches ──
        self.dire("00-garde")
        self.entete("Sens de variation", extrait="Sens", fs=40)
        pari = self.paragraphe(["Tu paries que", "tu sais si elle", ("monte ou descend,", TERME),
                                ("sans calculer ?", RAISON)], self.fs_grand - 4, buff=0.2, y=1.2)
        haut = self.badge.get_bottom()[1] - 0.35
        if pari.get_top()[1] > haut:
            pari.shift(DOWN * (pari.get_top()[1] - haut))
        for ligne, ex in zip(pari[:2], ("Tu paries", "tu sais")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.25)
        fm = fleche_sens(1, 1.3, 12).move_to(P(-1.1, -0.75))
        fd = fleche_sens(-1, 1.3, 12).move_to(P(1.1, -0.75))
        bm = barres(1.35, 5, 0.22, 0.08, 0.32).move_to(P(-1.1, 0)).align_to(P(0, -2.6), DOWN)
        bd = barres(0.72, 5, 0.22, 0.08, 1.05).move_to(P(1.1, 0)).align_to(P(0, -2.6), DOWN)
        self.au_mot("monte")
        self.play(FadeIn(pari[2], shift=UP * 0.1), GrowArrow(fm),
                  LaggedStart(*[GrowFromEdge(b, DOWN) for b in bm], lag_ratio=0.25), run_time=0.45)
        self.au_mot("descend")
        self.play(GrowArrow(fd), LaggedStart(*[GrowFromEdge(b, DOWN) for b in bd], lag_ratio=0.25), run_time=0.45)
        self.au_mot("sans calculer")
        self.play(FadeIn(pari[3], shift=UP * 0.1), run_time=0.3)
        pt = self.t("?", 72, RAISON).move_to(P(0, -1.1))
        self.play(FadeIn(pt, scale=1.5), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT le sang heure par heure ; EN BAS les barres, dessous ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        lab = self.t("le sang d'un patient", 34, GREY_A).move_to(P(0, 2.3))
        self.au_mot("sang")
        self.play(FadeIn(lab, shift=UP * 0.1), run_time=0.3)
        coupes = [coupe(n).move_to(P(x, Y_SANG)) for n, x in zip(GRAINS, XS)]
        bars = [barre(k, x) for k, x in enumerate(XS)]
        sol = Line(P(-2.0, Y_BASE), P(2.0, Y_BASE), stroke_color=GREY_B, stroke_width=3)
        noms = [self.t(u(k), 30, WHITE).move_to(P(x, Y_BASE + 0.24)) for k, x in enumerate(XS)]  # dans la barre
        self.play(FadeIn(coupes[0][0], scale=0.8), Create(sol), run_time=0.35)
        leg = VGroup(Dot(radius=0.08, color=TERME), self.t("le médicament", 32, TERME)).arrange(RIGHT, buff=0.15)
        leg.move_to(P(0, 0.72))
        self.au_mot("médicament")
        self.play(LaggedStart(*[GrowFromCenter(g) for g in coupes[0][1]], lag_ratio=0.05), FadeIn(leg),
                  GrowFromEdge(bars[0], DOWN), FadeIn(noms[0]), run_time=0.6)
        bas = VGroup(self.t("− 25 %", 46, RAISON), self.t("chaque heure", 38)).arrange(DOWN, buff=0.1)
        bas.move_to(P(0, -2.35))
        self.suivre("25")
        self.play(FadeIn(bas[0], scale=1.3), run_time=0.3)
        self.au_mot("chaque heure")
        for k in (1, 2):
            perdus = VGroup(*coupes[k - 1][1][GRAINS[k]:])
            avec = [FadeIn(bas[1], shift=UP * 0.1)] if k == 1 else []
            self.play(FadeIn(coupes[k][0], scale=0.8), Indicate(perdus, color=RAISON, scale_factor=1.3), *avec,
                      run_time=0.2)
            self.play(TransformFromCopy(VGroup(*coupes[k - 1][1][:GRAINS[k]]), coupes[k][1]),
                      TransformFromCopy(bars[k - 1], bars[k]), FadeIn(noms[k]), run_time=0.3)
        self.au_mot("On multiplie")
        sauts = [self.saut_barres(bars[k], bars[k + 1], bars[0].get_top()[1] + 0.42) for k in (0, 1)]
        self.play(*[Create(s[0]) for s in sauts], run_time=0.3)
        self.suivre("0,75")
        self.play(*[FadeIn(s[1], scale=1.4) for s in sauts], run_time=0.25)
        self.play(*[Indicate(s[1], color=RAISON) for s in sauts], run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 02 : 0,75 < 1 ──
        self.dire("02-idee")
        cmp_, (c1, c2, c3) = self.ligne([("0,75", RAISON), ("<", DESCEND), ("1", DESCEND)], 60)
        cmp_.move_to(P(0, -2.45))
        self.suivre("0,75")
        self.play(FadeOut(bas), FadeIn(c1, scale=1.3), run_time=0.3)
        self.au_mot("plus petit")
        self.play(FadeIn(c2, scale=1.3), run_time=0.2)
        self.suivre("1")
        self.play(FadeIn(c3, scale=1.4), run_time=0.25)
        self.insister(cmp_, 1.12)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → A ──
        b3 = VGroup(*[Text(x, font_size=36, color=WHITE) for x in ("croissante,", "car q est", "positif")])
        b3.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        b3.original_text = "croissante, car q est positif"
        choix = [Text("décroissante", font_size=36, color=WHITE), b3, Text("constante", font_size=36, color=WHITE)]
        q = self.poser_question("03-question",
                                [(self.t("La suite des", 42), "La suite"), (self.t("quantités est :", 42), "quantités")],
                                choix, 0, y_question=2.85)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 0)
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), FadeOut(q.question),
                  VGroup(q.cartes[0], ok).animate.move_to(P(0, 2.25)), run_time=0.35)
        enc, (e1, e2) = self.ligne([("0 < q <", RAISON), ("1", RAISON)], 58)
        enc.move_to(P(0, 1.05))
        self.au_mot("entre 0")
        self.play(FadeIn(e1, scale=1.2), run_time=0.3)
        self.suivre("1")
        self.play(FadeIn(e2, scale=1.4), run_time=0.25)
        sol2 = Line(P(-1.9, -1.3), P(1.9, -1.3), stroke_color=GREY_B, stroke_width=4)
        br = VGroup(*[Rectangle(width=0.36, height=1.5 * 0.75 ** k, fill_color=TERME, fill_opacity=1, stroke_width=0)
                      for k in range(8)]).arrange(RIGHT, buff=0.1, aligned_edge=DOWN)
        br.move_to(P(0, 0)).align_to(sol2, DOWN).shift(UP * 0.02)
        self.au_mot("baisse")
        self.play(Create(sol2), LaggedStart(*[GrowFromEdge(b, DOWN) for b in br], lag_ratio=0.2), run_time=0.8)
        neg = self.paragraphe([("sans devenir", JUSTE), ("négative", JUSTE)], 46, buff=0.08, y=-2.15, larg=3.6)
        self.au_mot("sans devenir")
        self.play(FadeIn(neg, shift=UP * 0.1), sol2.animate.set_color(JUSTE), run_time=0.35)
        self.insister(neg, 1.08)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        lc = LigneTermes(["200 mg", "?"], xs=(-1.0, 1.28), centre=P(0, 2.1), largeur=1.5, hauteur=0.85, fs=40)
        self.suivre("200")
        self.montrer_case(lc, 0)
        dep = self.t("au départ", 28, GREY_A).next_to(lc.cases[0], DOWN, buff=0.15)
        self.au_mot("départ")
        self.play(FadeIn(dep, shift=UP * 0.1), run_time=0.3)
        question = self.paragraphe([("Combien en", RAISON), ("reste-t-il après", RAISON), "2 heures ?"], 46,
                                   buff=0.14, y=0.0)
        fl = Arrow(lc.cases[0][0].get_right(), lc.cases[1][0].get_left(), buff=0.1, color=RAISON, stroke_width=5,
                   max_tip_length_to_length_ratio=0.25)
        self.au_mot("Combien")
        self.play(FadeIn(question[0], shift=UP * 0.1), FadeIn(lc.cases[1], scale=1.3), GrowArrow(fl), run_time=0.3)
        self.au_mot("reste")
        self.play(FadeIn(question[1], shift=UP * 0.1), run_time=0.3)
        self.suivre("2")
        self.play(FadeIn(question[2], shift=UP * 0.1), Indicate(lc.cases[1], color=RAISON, scale_factor=1.05), run_time=0.35)
        self.appel_commentaire(-2.35)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
