# suite_geo_explicite_short.py
# EleveAI — Maths 1re (sans spé) — short « La formule explicite : tu paries que
# tu la lis en 5 secondes ? » (9:16), ceinture BLANCHE (échelle entière sous le
# titre). Série SUITES, épisode 13 (vidéo commune avec la 1re spé).
# Micro du coach : expo_suite_explicite (gExplLire : lire u₀ et q dans uₙ = a × qⁿ).
#   · 00-garde      : le titre, l'échelle (70 %), le pari en gros, un chrono ;
#   · 01-situation  : EN HAUT l'étang, les nénuphars qui doublent chaque jour ;
#                     EN BAS les cases u₀ … u₃ qui se remplissent EN MÊME TEMPS
#                     (les mêmes nénuphars, en petit), les sauts « × 2 », puis
#                     uₙ = 3 × 2ⁿ ;
#   · 02-idee       : « le départ » → 3 (et la case u₀), « la raison » → 2 (et
#                     les sauts) ;
#   · 03/03b        : question-pause (A : u₀ = 3 et q = 2), 3 s ; 2⁰ = 1 ;
#   · 04-commentaire: « Et toi ? » au bout de 6 jours (réponse 3 × 2⁶ = 192 m²,
#                     NON affichée), « Réponds en commentaire ! » ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = raison et sauts,
# vert = juste, rouge = piège.
# Voix : manim/voix/premiere-suite-geo-explicite-short.json (débit −6),
# calée par suite_geo_explicite_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_geo_explicite_short.py SuiteGeoExpliciteShort -o eleveai-maths-premiere-suite-geo-explicite-short --media_dir manim/scripts/premiere/media-suite-geo-explicite-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_terme_rang import Rangee  # noqa: E402  (l'outil de l'épisode 04)
from suite_geo_recurrence_short import deux_lignes  # noqa: E402  (l'outil de l'épisode 10)
from suite_geo_terme_rang import GRIS_SAUT, OutilsEp12  # noqa: E402  (l'outil de l'épisode 12)

assert 3 * 2 ** 0 == 3 and 2 ** 0 == 1          # réponse A
assert 3 * 2 ** 6 == 192                         # 6 jours (commentaire, non affiché)
EAU, BORD_EAU, FEUILLE, FEUILLE_B, FLEUR = "#0c3b5e", "#38bdf8", "#22c55e", "#15803d", "#f9a8d4"
Y_ETANG, Y_CASES = 1.75, -0.6
XS = (-1.58, -0.53, 0.52, 1.57)
# les 8 places des nénuphars, par rapport au centre de l'étang (jour 0 : 1, jour 1 : 2, jour 2 : 4, jour 3 : 8)
PLACES = [(-1.25, 0.3), (-0.42, -0.33), (0.42, 0.33), (1.25, -0.3), (-1.3, -0.35), (-0.45, 0.35), (0.4, -0.36),
          (1.3, 0.33)]


def nenuphar(r=0.24, fleur=False):
    """Un nénuphar : une feuille ronde entaillée (vert), parfois une fleur rose."""
    f = Sector(radius=r, start_angle=0.35, angle=TAU - 0.7, fill_color=FEUILLE, fill_opacity=1,
               stroke_color=FEUILLE_B, stroke_width=2).rotate(PI / 4, about_point=ORIGIN)
    g = VGroup(f)
    if fleur:
        g.add(Circle(radius=r * 0.32, fill_color=FLEUR, fill_opacity=1, stroke_width=0).move_to(P(-r * 0.25, -r * 0.2)))
    return g


def etang(w=3.95, h=1.4, y=Y_ETANG):
    """L'eau de l'étang (une ellipse) et trois petites vagues DANS l'eau ; g.eau = l'ellipse."""
    eau = Ellipse(width=w, height=h, fill_color=EAU, fill_opacity=1, stroke_color=BORD_EAU, stroke_width=4)
    vague = VGroup(*[Arc(radius=0.14, start_angle=PI / 4, angle=PI / 2, stroke_color=BORD_EAU, stroke_width=2,
                         stroke_opacity=0.6).move_to(P(x * w / 3.95, yy * h / 1.4))
                     for x, yy in ((-0.85, 0.02), (0.85, 0.0), (0.0, -0.5))])
    g = VGroup(eau, vague).shift(UP * y)
    g.eau = eau
    return g


def mini(k, case):
    """Les 2ᵏ nénuphars d'un jour, en petit, dans sa case (avec une marge)."""
    n = 2 ** k
    cols = {1: 1, 2: 2, 4: 2, 8: 4}[n]
    r, b = (0.1, 0.08) if n < 8 else (0.07, 0.04)
    g = VGroup(*[nenuphar(r) for _ in range(n)])
    g.arrange_in_grid(rows=n // cols, cols=cols, buff=b)
    return g.move_to(case)


class SuiteGeoExpliciteShort(OutilsEp12, ShortSuites):
    fichier_marques = "suite_geo_explicite_short_marques.json"
    nom_voix = "premiere-suite-geo-explicite-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"
    place_coche = 0.78            # la coche du bouton allumé ne touche pas la formule (ép. 10)
    hauteur_bouton = 0.95         # choix sur deux lignes : une marge en haut et en bas
    buff_boutons = 0.14

    def entete(self, titre, extrait=None, fs=44):
        """L'en-tête du module commun (échelle à 70 %), titre (fs 40) un peu plus
        haut et l'échelle posée SOUS lui avec un écart de 0,15 (comme l'ép. 12)."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.titre_s = self.t(titre, fs, JAUNE_TITRE).move_to(P(0, 3.6))
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.next_to(self.titre_s, DOWN, buff=0.15)
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def chrono(self, r=0.75):
        cadran = Circle(radius=r, fill_color=FOND_CARTE, fill_opacity=1, stroke_color=WHITE, stroke_width=5)
        bouton = RoundedRectangle(width=0.3, height=0.18, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                                  stroke_width=0).next_to(cadran, UP, buff=0.02)
        traits = VGroup(*[Line(P(0, r * 0.78), P(0, r * 0.9), stroke_color=GREY_B, stroke_width=3)
                          .rotate(-k * TAU / 12, about_point=ORIGIN) for k in range(12)])
        aiguille = Line(ORIGIN, P(0, r * 0.7), stroke_color=RAISON, stroke_width=6)
        return VGroup(cadran, bouton, traits, aiguille)

    def construct(self):
        # ── 00 : la garde : titre, échelle (70 %), le pari ; un chrono ──
        self.dire("00-garde")
        self.entete("La formule explicite", extrait="La formule", fs=40)
        pari = self.paragraphe(["Tu paries que", "tu la lis", ("en 5 secondes ?", RAISON)], self.fs_grand,
                               buff=0.2, y=1.3)
        haut = self.badge.get_bottom()[1] - 0.4  # le pari reste sous l'échelle
        if pari.get_top()[1] > haut:
            pari.shift(DOWN * (pari.get_top()[1] - haut))
        ch = self.chrono().move_to(P(0, -1.55))
        centre = ch[0].get_center()
        for ligne, ex in zip(pari, ("Tu paries", "tu la lis", "5")):
            self.au_mot(ex) if ex != "5" else self.suivre("5")
            anims = [FadeIn(ligne, shift=UP * 0.1)]
            if ex == "tu la lis":
                anims.append(FadeIn(ch, scale=0.8))
            self.play(*anims, run_time=0.3)
        self.play(Rotate(ch[3], angle=-TAU * 5 / 12, about_point=centre), run_time=1.2, rate_func=linear)
        self.play(Indicate(ch[0], color=RAISON, scale_factor=1.1), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT l'étang et ses nénuphars ; EN BAS les cases u₀ … u₃ ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        et = etang()
        if et.eau.get_top()[1] > self.badge.get_bottom()[1] - 0.15:
            et.shift(DOWN * (et.eau.get_top()[1] - self.badge.get_bottom()[1] + 0.15))
        yc = et.eau.get_center()[1]
        pads = [nenuphar(0.23, fleur=(k % 3 == 0)).move_to(P(x, yc + y)) for k, (x, y) in enumerate(PLACES)]
        self.au_mot("étang")
        self.play(FadeIn(et, scale=0.9), run_time=0.35)
        lg = Rangee(4, XS[0], XS[-1], Y_CASES, larg=0.86, haut=0.86, creux=0.17, sw=3, sauts=False)
        noms = [self.nom_case(lg, k, u(k), 32) for k in range(4)]
        sauts = [lg.fleche(k, k + 1, 0.17, 3, GRIS_SAUT) for k in range(3)]
        icones = [mini(k, lg.cases[k]) for k in range(4)]
        self.au_mot("nénuphars")
        self.play(GrowFromCenter(pads[0]), FadeIn(lg.cases[0], scale=0.8), FadeIn(noms[0]),
                  FadeIn(icones[0], scale=1.3), run_time=0.35)
        self.suivre("3")
        l3 = VGroup(self.t("3 m²", 46, TERME), self.t("de nénuphars", 36)).arrange(RIGHT, buff=0.16)
        if l3.width > self.largeur_texte:
            l3.scale_to_fit_width(self.largeur_texte)
        l3.move_to(P(0, et.eau.get_bottom()[1] - 0.3))
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(pads[0], scale_factor=1.3), run_time=0.35)  # pas de zoom : l3 remplit la largeur
        self.au_mot("Chaque jour")
        l4 = VGroup(self.t("chaque jour :", 36), self.t("la surface double", 36, RAISON)).arrange(RIGHT, buff=0.14)
        l4.move_to(l3)
        if l4.width > self.largeur_texte:
            l4.scale_to_fit_width(self.largeur_texte)
        self.play(FadeOut(l3), FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("double")
        groupes = [pads[1:2], pads[2:4], pads[4:8]]
        for k, gr in enumerate(groupes):
            bille = Dot(sauts[k].get_start(), radius=0.06, color=RAISON)
            anims = [*[GrowFromCenter(p) for p in gr], Create(sauts[k].set_color(RAISON)),
                     MoveAlongPath(bille, sauts[k].copy()), FadeIn(lg.cases[k + 1], scale=0.8), FadeIn(noms[k + 1]),
                     FadeIn(icones[k + 1], scale=1.3)]
            if k == 0:
                anims.append(FadeIn(l4[1], shift=UP * 0.1))
            self.play(*anims, run_time=0.4)
            self.remove(bille)
        self.au_mot("On note")
        note = VGroup(self.t("uₙ", 40, TERME), self.t(": la surface après n jours", 34)).arrange(RIGHT, buff=0.12)
        if note.width > self.largeur_texte:
            note.scale_to_fit_width(self.largeur_texte)
        note.move_to(P(0, -1.78))
        self.play(FadeIn(note, shift=UP * 0.1), run_time=0.35)
        labs = [self.t("× 2", 30, RAISON).next_to(s, UP, buff=0.03) for s in sauts]
        self.play(FadeOut(l4), run_time=0.2)
        f = self.calcul([("uₙ =", TERME, "u indice n égale"), ("3", TERME, "3"), ("×", WHITE, None),
                         ("2", RAISON, "2"), ("ⁿ", RAISON, "puissance")], -2.5, centre=0, fs=50,
                        avec_morceau={3: [FadeIn(l, scale=1.3) for l in labs]})
        cad = self.encadre(f, JUSTE, 0.14)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : « le départ » → 3 et u₀ ; « la raison » → 2 et les sauts ──
        self.dire("02-idee")
        self.au_mot("Le nombre devant")
        dep = self.t("le départ", 34, TERME, larg=1.75).move_to(P(-1.08, -1.78))
        rai = self.t("la raison", 34, RAISON, larg=1.75).move_to(P(1.08, -1.78))
        self.play(FadeOut(note), Indicate(f[1], color=TERME, scale_factor=1.5), run_time=0.35)
        self.au_mot("le départ")
        self.play(FadeIn(dep, shift=DOWN * 0.1), Indicate(VGroup(lg.cases[0], icones[0]), color=TERME),
                  Indicate(pads[0], color=TERME, scale_factor=1.3), run_time=0.45)
        self.au_mot("La base")
        self.play(Indicate(f[3], color=RAISON, scale_factor=1.5), run_time=0.4)
        self.au_mot("la raison")
        self.play(FadeIn(rai, shift=DOWN * 0.1), *[Indicate(l, color=RAISON, scale_factor=1.15) for l in labs],
                  run_time=0.45)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → A ──
        l1 = self.paragraphe(["Quels sont le premier terme", "et la raison de"], 33, buff=0.08)
        rappel, _ = self.ligne([("uₙ =", TERME), ("3", WHITE), ("×", WHITE), ("2", WHITE), ("ⁿ", RAISON),
                                ("?", WHITE)], 42)
        choix = [deux_lignes(a, b, 33) for a, b in (("u₀ = 3", "q = 2"), ("u₀ = 2", "q = 3"), ("u₀ = 6", "q = 2"))]
        q = self.poser_question("03-question", [(l1, "Quels"), (rappel, None)], choix, 0, y_question=2.9, fs=36)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 0)
        a = q.cartes[0]
        self.au_mot("Pour n")
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), run_time=0.25)
        c1 = self.calcul([("Pour", WHITE, None), ("n =", WHITE, None), ("0", RAISON, "0")], -0.3, centre=0, fs=48)
        c2 = self.calcul([("2", WHITE, "2"), ("⁰", RAISON, "puissance 0"), ("=", WHITE, "égale"), ("1", WHITE, "1")],
                         -1.25, centre=0, fs=56)
        c3 = self.calcul([("u₀ =", TERME, "u indice 0"), ("3", JUSTE, "3")], -2.3, centre=0.3, fs=60)
        p0 = nenuphar(0.3, fleur=True).next_to(c3, LEFT, buff=0.4)
        cad = self.encadre(c3, JUSTE, 0.14)
        self.play(Create(cad), GrowFromCenter(p0), run_time=0.4)
        self.insister(VGroup(c3, cad), 1.1)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 50, JAUNE_TITRE).move_to(P(0, 3.6))
        etg = etang(3.7, 1.25, 2.15)
        pads = VGroup(*[nenuphar(0.2, fleur=(k % 3 == 0)).move_to(P(x * 0.92, 2.15 + y * 0.88))
                        for k, (x, y) in enumerate(PLACES)])
        self.play(FadeIn(et, shift=DOWN * 0.1), FadeIn(etg, scale=0.9), FadeIn(pads), run_time=0.35)
        question = self.paragraphe([("Combien de m²", RAISON), ("couvrent-ils au bout", RAISON),
                                    "de 6 jours ?"], 42, buff=0.14, y=0.25)
        for ligne, ex in zip(question, ("combien", "couvrent", "6")):
            if ex == "6":
                self.au_mot("bout de")
                self.suivre("6")
            else:
                self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.3)
        case = RoundedRectangle(width=1.1, height=0.75, corner_radius=0.1, stroke_color=RAISON, stroke_width=4,
                                fill_color=FOND_CARTE, fill_opacity=1)
        qm = Text("?", font_size=48, color=RAISON).move_to(case)
        u6 = VGroup(self.t("u₆ =", 50, TERME), VGroup(case, qm)).arrange(RIGHT, buff=0.2).move_to(P(0, -1.3))
        self.play(FadeIn(u6, scale=1.2), run_time=0.3)
        self.appel_commentaire(-2.4)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
