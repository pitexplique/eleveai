# proba_va_moyenne.py
# EleveAI — Maths STMG ET Maths 1re spécialité — série « Probabilités » :
# L'ESPÉRANCE, C'EST LA MOYENNE À LONG TERME (micros : va_esp_interpreter en
# STMG, va_echantillon en 1re spé), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_va_moyenne_short.py
# (ceinture jaune, un dé : 6, 6, 5, 6, 6 → moyenne 5,8, puis la courbe
# qui revient vers 3,5).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaVaMoyenneBase porte toutes les scènes ; les deux sous-classes
# ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure : la ROUE de la kermesse (style de proba_va_esperance.py :
# 0 € / 2 € / 10 €, secteurs 0,6 / 0,3 / 0,1), des JETONS de gain qui tombent
# un par un, une JAUGE (une barre « moyenne » sous la ligne pointillée
# « E(X) = 1,6 ») et la COURBE de la moyenne cumulée qui oscille puis se colle
# à la ligne 1,6 (axes sans nombres : seulement « 1,6 » et « nombre de parties »).
#   · 02 : 0, 2, 0, 0, 10, 0, 2, 0, 0, 2 → total 16, moyenne 1,6 (la barre
#     atteint la ligne) ;
#   · 03 : dix jetons SANS nombres (la voix ne dit pas les gains un par un),
#     « aucun 10 », total 4, moyenne 0,4 (la barre au quart de la ligne) ;
#   · 04 : la courbe (ces 20 parties, puis 980 tirées, graine 20 → 1,606).
# ⛔ PAS D'ÉCART : chaque nombre n'apparaît que quand la voix le dit.
# ⭐ au_mot cherche ici À PARTIR du dernier extrait trouvé (les « 0 » et
# les « 2 » de la liste des gains se suivent dans la voix).
#
# Écrans : 00 garde · 01 la roue (E(X) = 1,6, jamais 1,6) · 02 dix parties ·
# 03 dix autres · 04 mille parties (la courbe) · 05 le piège · 06 défi
# (500 parties) · 06b correction (500 × 1,6 = 800) · 07 ce que tu as appris ·
# 08 fin « Entraîne-toi sur eleveai.fr ».
#
# Voix : manim/voix/stmg-premiere-spe-proba-va-moyenne.json (Julie, débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_va_moyenne.py ProbaVaMoyenneSTMG -o eleveai-maths-stmg-proba-va-moyenne --media_dir manim/scripts/stmg/media-va_moyenne
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_va_moyenne.py ProbaVaMoyennePremiereSpe -o eleveai-maths-premiere-proba-va-moyenne --media_dir manim/scripts/stmg/media-va_moyenne
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_moyenne_short.py ShortProbaVaMoyenne -o eleveai-maths-stmg-proba-va-moyenne-short --media_dir manim/scripts/stmg/media-va_moyenne
# (le short n'affiche aucune classe : UN rendu, copié aussi sous
#  eleveai-maths-premiere-proba-va-moyenne-short.mp4)
# Puis copier dans manim/sorties/stmg/maths/probabilites/27-va-moyenne/ et
# manim/sorties/premiere/maths/probabilites/27-va-moyenne/.

import random
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import ENCRE, suite  # noqa: E402

# Les couleurs de la roue (palette du coach, comme proba_va_esperance.py)
COUL_0 = "#94A3B8"      # 0 € : gris
COUL_2 = "#3B82F6"      # 2 € : bleu
COUL_10 = "#F97316"     # 10 € : orange (le petit secteur)
CARTE_BORD = "#E2E8F0"
COMMUN = "#FDE047"
NEUTRE = "#CBD5E1"      # un jeton dont la voix ne dit pas le gain

GAINS_10 = [0, 2, 0, 0, 10, 0, 2, 0, 0, 2]
# Les 10 parties suivantes (total 4, aucun 10) : JAMAIS écrites, seulement
# dans la courbe de l'écran 04.
GAINS_AUTRE = [0, 0, 2, 0, 0, 0, 2, 0, 0, 0]


def P(x, y):
    return np.array([x, y, 0.0])


def moyennes_cumulees(n=1000, graine=20):
    g = list(GAINS_10 + GAINS_AUTRE)
    r = random.Random(graine)
    while len(g) < n:
        u = r.random()
        g.append(0 if u < 0.6 else (2 if u < 0.9 else 10))
    t, ms = 0, []
    for i, x in enumerate(g):
        t += x
        ms.append(t / (i + 1))
    return ms


def etiquette_blanche(texte, fs):
    t = Text(texte, font_size=fs, color=WHITE, weight=BOLD)
    t.set_stroke(ENCRE, width=4, background=True)
    return t


class RoueKermesse(VGroup):
    """La roue de la kermesse (reprise de proba_va_esperance.py) : secteurs
    proportionnels, du haut dans le sens horaire. Les étiquettes ne sont PAS
    ajoutées : on les pose quand la voix les dit (ou `tout()`)."""

    def __init__(self, secteurs, centre=P(-5.0, 0.0), r=1.25, fs=26, carte=True, **kw):
        super().__init__(**kw)
        self.c, self.r = centre, r
        self.parts, self.etiq = VGroup(), VGroup()
        a0 = PI / 2
        for nom, p, coul in secteurs:
            ang = TAU * p
            s = AnnularSector(inner_radius=0, outer_radius=r, angle=-ang, start_angle=a0, fill_color=coul,
                              fill_opacity=1, stroke_color=ENCRE, stroke_width=3).shift(centre)
            m = a0 - ang / 2
            k = 0.62 if p >= 0.2 else 0.72
            e = etiquette_blanche(nom, fs if p >= 0.2 else int(fs * 0.8))
            e.move_to(centre + P(k * r * np.cos(m), k * r * np.sin(m))).set_z_index(2)
            self.parts.add(s)
            self.etiq.add(e)
            a0 -= ang
        self.disque = VGroup(self.parts, self.etiq)
        self.moyeu = Dot(centre, radius=0.07, color=ENCRE).set_z_index(3)
        self.pointe = Polygon(P(0, 0), P(-0.15, 0.27), P(0.15, 0.27), fill_color=ENCRE, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=1.5).move_to(centre + UP * (r + 0.3),
                                                                            aligned_edge=DOWN)
        self.carte = RoundedRectangle(width=2 * r + 0.85, height=2 * r + 1.1, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=CARTE_BORD, stroke_width=2)
        self.carte.move_to(centre + UP * 0.13)
        if carte:
            self.add(self.carte)
        self.add(self.parts, self.moyeu, self.pointe)

    def tout(self):
        self.add(self.etiq)
        return self

    def tourner(self, scene, tours=1.0, run_time=1.0):
        """La roue tourne (sens horaire) ; les étiquettes restent droites."""
        angle = -tours * TAU
        depart = self.disque.copy()

        def f(m, a):
            m.become(depart)
            m.rotate(angle * a, about_point=self.c)
            for e in m[1]:
                e.rotate(-angle * a)

        scene.play(UpdateFromAlphaFunc(self.disque, f), run_time=run_time,
                   rate_func=rate_functions.ease_out_cubic)


ROUE = [("0 €", 0.6, COUL_0), ("2 €", 0.3, COUL_2), ("10 €", 0.1, COUL_10)]
COUL_GAIN = {0: COUL_0, 2: COUL_2, 10: COUL_10}


def jeton(gain=None, r=0.3):
    """Un jeton de gain : la couleur de son secteur et son nombre ; sans gain
    (gain=None) : un jeton neutre, sans nombre."""
    coul = NEUTRE if gain is None else COUL_GAIN[gain]
    d = Circle(radius=r, fill_color=coul, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    if gain is None:
        return VGroup(d)
    return VGroup(d, etiquette_blanche(str(gain), int(r * 85)).move_to(d))


def emplacements(y, x0=-1.75, pas=0.74, n=10):
    return [P(x0 + pas * k, y) for k in range(n)]


class Jauge(VGroup):
    """La ligne pointillée « E(X) = 1,6 » au-dessus d'un sol : chaque barre
    « moyenne » monte à la hauteur H × m / 1,6 (aucun nombre sur l'axe)."""

    def __init__(self, sol=-2.0, x0=3.0, x1=5.65, H=2.1, **kw):
        super().__init__(**kw)
        self.sol, self.H, self.x0, self.x1 = sol, H, x0, x1
        self.base = Line(P(x0, sol), P(x1, sol), color=WHITE, stroke_width=3)
        self.ligne = DashedLine(P(x0 - 0.1, sol + H), P(x1 + 0.1, sol + H), color=JAUNE_TITRE,
                                stroke_width=4, dash_length=0.16)
        self.lab = suite(Text("E(X)", font_size=28, color=JAUNE_TITRE, weight=BOLD),
                         Text("= 1,6", font_size=28, color=JAUNE_TITRE, weight=BOLD), buff=0.12)
        self.lab.next_to(self.ligne, UP, buff=0.14)
        self.add(self.base, self.ligne, self.lab)

    def barre(self, m, x, coul=BLEU_CALCUL, larg=0.7):
        h = max(self.H * m / 1.6, 0.02)
        return Rectangle(width=larg, height=h, fill_color=coul, fill_opacity=0.9, stroke_color=WHITE,
                         stroke_width=2).move_to(P(x, self.sol), aligned_edge=DOWN)

    def nom(self, texte, x, fs=20):
        return Text(texte, font_size=fs, color=GRAY_B).move_to(P(x, self.sol - 0.3))


X0 = -2.1   # le bord gauche de la colonne des calculs (la roue occupe la gauche)


class ProbaVaMoyenneBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-spe-proba-va-moyenne"
    identite = "Maths — EleveAI"

    # ── au_mot : la recherche reprend après le dernier extrait trouvé ──────

    def dire(self, nom, dossier=None):
        self._curseur = 0
        return super().dire(nom, dossier)

    def au_mot(self, extrait):
        texte = self._texte_voix
        i = texte.find(extrait, getattr(self, "_curseur", 0))
        if i < 0:
            raise ValueError(f"« {extrait} » absent (après {self._curseur}) de la voix : {texte[:60]}…")
        self._curseur = i + len(extrait)
        if not self._duree_voix:
            return
        cible = self._debut_voix + self._duree_voix * i / len(texte)
        reste = cible - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def t(self, texte, font_size=36, color=WHITE, weight=NORMAL):
        return Text(texte, font_size=font_size, color=color, weight=weight)

    def insister(self, mob, run_time=0.25, bord=None):
        """Agrandir puis rétrécir (×1,5 puis ÷1,5), jamais de zoom de caméra."""
        self.play(mob.animate.scale(1.5, about_edge=bord), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5, about_edge=bord), run_time=run_time)

    def gauche(self, mob, y, x=X0):
        return mob.move_to(P(x, y), aligned_edge=LEFT)

    def ligne_val(self, mot, val, fs=40, coul=JAUNE_TITRE):
        return suite(self.t(mot, fs), self.t(val, int(fs * 1.25), coul, BOLD), buff=0.2)

    def tomber(self, j, cible, run_time=0.3):
        """Un jeton tombe d'au-dessus dans son emplacement."""
        j.move_to(cible + UP * 0.6).set_opacity(0)
        return j.animate(run_time=run_time, rate_func=rate_functions.ease_in_quad).move_to(cible).set_opacity(1)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'espérance, c'est la moyenne", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.85))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        r = RoueKermesse(ROUE, centre=P(-0.6, -0.2), r=1.0, fs=22, carte=False)
        r.etiq = VGroup()                       # pas de nombres : la voix n'en dit pas
        r.disque = VGroup(r.parts, r.etiq)
        self.play(FadeIn(r, scale=0.6), run_time=0.4)
        self.au_mot("sur un très grand nombre")
        r.tourner(self, tours=3.0, run_time=2.0)
        self.attendre_voix(marge=1.0)

    # ── 01 : la roue : E(X) = 1,6 mais jamais 1,6 ───────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La roue de la kermesse")
        r = RoueKermesse(ROUE)
        self.play(FadeIn(r, scale=0.8), run_time=0.6)
        self.au_mot("l'espérance du gain")
        esp = self.gauche(self.t("L'espérance du gain :", 36), 1.6)
        self.play(FadeIn(esp, shift=UP * 0.1), run_time=0.4)
        self.au_mot("vaut 1,6")
        ex = self.gauche(suite(self.t("E(X)", 54, JAUNE_TITRE, BOLD), self.t("=", 54),
                               self.t("1,6 €", 54, JAUNE_TITRE, BOLD), buff=0.2), 0.65)
        cadre = SurroundingRectangle(ex, color=JAUNE_TITRE, buff=0.18, stroke_width=4, corner_radius=0.1)
        self.play(FadeIn(ex, scale=1.4), Create(cadre), run_time=0.6)
        self.au_mot("à chaque partie")
        partie = self.gauche(self.t("À chaque partie, on gagne :", 34), -0.55)
        self.play(FadeIn(partie, shift=UP * 0.1), run_time=0.4)
        gains = VGroup(*[jeton(g, 0.36) for g in (0, 2, 10)]).arrange(RIGHT, buff=0.45)
        self.gauche(gains, -1.5, X0 + 0.2)
        for k, m in enumerate(["on gagne 0", "2 ou", "10 euros"]):
            self.au_mot(m)
            self.play(FadeIn(r.etiq[k], scale=1.6), FadeIn(gains[k], scale=1.6),
                      Indicate(r.parts[k], color=COMMUN, scale_factor=1.05), run_time=0.45)
        self.au_mot("Jamais 1,6")
        jamais = self.t("Jamais 1,6 !", 48, ROUGE_ERREUR, BOLD).next_to(gains, RIGHT, buff=0.6)
        self.play(FadeIn(jamais, scale=1.6), run_time=0.4)
        self.insister(jamais, 0.25)
        self.attendre_voix()

    # ── 02 : dix parties : les jetons tombent un par un ─────────────────────

    def ecran_dix(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-dix")
        self.titre_ecran("Jouons 10 parties")
        r = RoueKermesse(ROUE).tout()
        jg = Jauge()
        cases = VGroup(*[Circle(radius=0.3, stroke_color=GRAY_B, stroke_width=2).set_stroke(opacity=0.6)
                         .move_to(c) for c in emplacements(2.2)])
        self.add(r)
        self.play(FadeIn(cases), FadeIn(jg), run_time=0.5)
        r.tourner(self, tours=1.0, run_time=0.9)
        self.au_mot("Les gains")
        jets = VGroup()
        for k, (g, c) in enumerate(zip(GAINS_10, emplacements(2.2))):
            self.au_mot(f"{g}," if k < 9 else f"{g}.")
            j = jeton(g)
            jets.add(j)
            self.add(j)
            self.play(self.tomber(j, c), run_time=0.3)
        self.au_mot("Total : 16")
        tot = self.gauche(self.ligne_val("Total :", "16 €"), 0.85)
        self.play(FadeIn(tot, shift=UP * 0.1), LaggedStart(*[Indicate(j, scale_factor=1.15) for j in jets],
                                                            lag_ratio=0.08), run_time=0.8)
        self.au_mot("Moyenne : 1,6")
        moy = self.gauche(self.ligne_val("Moyenne :", "1,6"), -0.2)
        b1 = jg.barre(1.6, 3.7)
        n1 = jg.nom("série 1", 3.7)
        self.play(FadeIn(moy, shift=UP * 0.1), GrowFromEdge(b1, DOWN), FadeIn(n1), run_time=0.7)
        self.play(Indicate(jg.ligne, color=COMMUN), Indicate(jg.lab, color=COMMUN), run_time=0.6)
        self.au_mot("Coup de chance")
        chance = self.gauche(self.t("Coup de chance !", 32, ORANGE_RETENUE, BOLD), -1.3)
        self.play(FadeIn(chance, scale=1.5), run_time=0.4)
        self.play(Wiggle(chance), run_time=0.6)
        self.attendre_voix()

    # ── 03 : dix autres parties : total 4, moyenne 0,4 ──────────────────────

    def ecran_autre(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-autre")
        self.titre_ecran("Encore 10 parties")
        r = RoueKermesse(ROUE).tout()
        jg = Jauge()
        avant = VGroup(*[jeton(g).move_to(c) for g, c in zip(GAINS_10, emplacements(2.2))]).set_opacity(0.3)
        b1 = jg.barre(1.6, 3.7).set_opacity(0.45)
        n1 = jg.nom("série 1", 3.7)
        self.add(r, jg, avant, b1, n1)
        cases = emplacements(1.35)
        neufs = VGroup(*[jeton(None) for _ in cases])
        r.tourner(self, tours=1.0, run_time=0.8)
        for j, c in zip(neufs, cases):
            self.add(j)
            self.play(self.tomber(j, c, 0.15), run_time=0.15)
        self.au_mot("aucun 10")
        dix = jeton(10).move_to(P(6.05, 1.35))
        croix = VGroup(Line(P(-0.38, -0.38), P(0.38, 0.38)), Line(P(-0.38, 0.38), P(0.38, -0.38)))
        croix.set_stroke(ROUGE_ERREUR, 7).move_to(dix)
        self.play(FadeIn(dix, scale=1.5), run_time=0.35)
        self.play(Create(croix), run_time=0.35)
        self.au_mot("Total : 4")
        tot = self.gauche(self.ligne_val("Total :", "4 €"), 0.25)
        self.play(FadeIn(tot, shift=UP * 0.1), run_time=0.5)
        self.au_mot("moyenne 0,4")
        moy = self.gauche(self.ligne_val("Moyenne :", "0,4"), -0.8)
        b2 = jg.barre(0.4, 5.0, coul=ORANGE_RETENUE)
        n2 = jg.nom("série 2", 5.0)
        self.play(FadeIn(moy, shift=UP * 0.1), GrowFromEdge(b2, DOWN), FadeIn(n2), b1.animate.set_opacity(1),
                  run_time=0.7)
        self.au_mot("Sur 10 parties")
        fl = DoubleArrow(P(4.35, b1.get_top()[1]), P(4.35, b2.get_top()[1]), buff=0, color=ROUGE_ERREUR,
                         stroke_width=5, tip_length=0.2)
        chute = self.chute("Sur 10 parties, la moyenne bouge beaucoup", color=ROUGE_ERREUR, font_size=34)
        self.play(GrowFromCenter(fl), Write(chute), run_time=0.8)
        self.play(Wiggle(VGroup(b1, b2)), run_time=0.7)
        self.attendre_voix()

    # ── 04 : mille parties : la courbe de la moyenne ────────────────────────

    def graphe(self, o=P(-5.2, -2.35), L=9.6, H=3.7, ymax=3.0, n=1000, fs=26):
        """Les axes (sans nombres), la ligne 1,6 et la courbe de la moyenne
        cumulée (abscisses en échelle logarithmique : on voit le début bouger)."""
        ms = moyennes_cumulees(n)
        pts = [o + P(L * np.log10(k + 1) / np.log10(n), H * min(m, ymax) / ymax) for k, m in enumerate(ms)]
        courbe = VMobject(stroke_color=BLEU_CALCUL, stroke_width=4).set_points_as_corners(pts)
        ax = VGroup(Arrow(o, o + RIGHT * (L + 0.4), buff=0, stroke_width=3, tip_length=0.2, color=WHITE),
                    Arrow(o, o + UP * (H + 0.3), buff=0, stroke_width=3, tip_length=0.2, color=WHITE))
        y16 = o[1] + H * 1.6 / ymax
        ligne = DashedLine(P(o[0], y16), P(o[0] + L + 0.2, y16), color=JAUNE_TITRE, stroke_width=4,
                           dash_length=0.16)
        lab16 = self.t("1,6", fs + 4, JAUNE_TITRE, BOLD).next_to(P(o[0], y16), LEFT, buff=0.15)
        labx = self.t("nombre de parties", fs, GRAY_B).next_to(ax[0], DOWN, buff=0.12).align_to(ax[0], RIGHT)
        laby = self.t("moyenne des gains", fs, GRAY_B).next_to(ax[1], RIGHT, buff=0.15).align_to(ax[1], UP)
        return VGroup(ax, ligne, lab16, labx, laby), courbe, pts

    def ecran_mille(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-mille")
        self.titre_ecran("Et sur 1 000 parties ?")
        fond, courbe, pts = self.graphe()
        self.play(FadeIn(fond[0]), FadeIn(fond[3]), FadeIn(fond[4]), run_time=0.4)
        point = Dot(pts[0], radius=0.09, color=WHITE).set_z_index(4)
        self.add(point)
        self.play(Create(courbe), MoveAlongPath(point, courbe.copy()), run_time=3.2, rate_func=linear)
        self.au_mot("de 1,6")
        self.play(Create(fond[1]), FadeIn(fond[2], scale=1.5), run_time=0.5)
        self.insister(fond[2], 0.25, RIGHT)
        mille = self.t("1 000 parties", 30, BLEU_CALCUL, BOLD).next_to(pts[-1], UP, buff=0.35).shift(LEFT * 0.4)
        self.play(FadeIn(mille, shift=DOWN * 0.1), Flash(point, color=JAUNE_TITRE), run_time=0.5)
        self.au_mot("Plus on joue")
        l1 = self.t("Plus on joue,", 32).move_to(P(0.5, 2.6))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("plus la moyenne")
        l2 = self.t("plus la moyenne se rapproche de l'espérance", 30, VERT_OK).next_to(l1, DOWN, buff=0.12)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        self.play(Indicate(fond[1], color=VERT_OK), run_time=0.7)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        r = RoueKermesse(ROUE).tout()
        self.add(r)
        self.au_mot("attendre 1,6")
        l1 = self.gauche(suite(self.t("1,6 €", 50, JAUNE_TITRE, BOLD), self.t("à chaque partie ?", 40), buff=0.25),
                         1.55)
        self.play(FadeIn(l1, scale=1.3), run_time=0.5)
        barre = Line(l1.get_left() + LEFT * 0.1, l1.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(barre), run_time=0.4)
        self.au_mot("ne dit rien")
        l2 = self.gauche(self.t("Une seule partie : elle ne dit rien", 34, ORANGE_RETENUE), 0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        r.tourner(self, tours=1.3, run_time=1.2)
        self.au_mot("en moyenne")
        l3 = self.gauche(self.t("En moyenne, à long terme", 42, VERT_OK, BOLD), -1.0)
        cadre = SurroundingRectangle(l3, color=VERT_OK, buff=0.2, stroke_width=4, corner_radius=0.1)
        self.play(FadeIn(l3, scale=1.3), run_time=0.5)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 06 : défi : 500 parties ─────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        r = RoueKermesse(ROUE).tout()
        self.play(FadeIn(r, scale=0.8), run_time=0.5)
        self.au_mot("500 parties")
        l1 = self.gauche(suite(self.t("500", 60, BLEU_CALCUL, BOLD), self.t("parties", 44), buff=0.25), 1.5)
        self.play(FadeIn(l1, scale=1.3), run_time=0.5)
        self.insister(l1[0], 0.25, LEFT)
        r.tourner(self, tours=2.0, run_time=1.2)
        self.au_mot("Combien d'euros")
        q = self.gauche(suite(self.t("Gains à prévoir :", 40), self.t("?", 60, ORANGE_RETENUE, BOLD),
                              self.t("€", 44), buff=0.25), 0.2)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.5)
        self.au_mot("environ")
        env = self.t("environ", 34, GRAY_B).next_to(q, DOWN, buff=0.2).align_to(q, LEFT)
        self.play(FadeIn(env), run_time=0.3)
        self.insister(q[1], 0.25)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        r = RoueKermesse(ROUE).tout()
        self.add(r)
        l = self.gauche(suite(self.t("500", 54, BLEU_CALCUL, BOLD), self.t("×", 54),
                              self.t("1,6", 54, JAUNE_TITRE, BOLD), self.t("=", 54),
                              self.t("800 €", 60, VERT_OK, BOLD), buff=0.32), 1.3)
        self.au_mot("500 fois")
        self.play(FadeIn(l[0], scale=1.4), FadeIn(l[1]), run_time=0.4)
        self.au_mot("1,6")
        self.play(FadeIn(l[2], scale=1.4), run_time=0.35)
        self.au_mot("égale 800")
        cadre = SurroundingRectangle(l[4], color=VERT_OK, buff=0.15, stroke_width=4, corner_radius=0.08)
        self.play(FadeIn(l[3]), FadeIn(l[4], scale=1.8), run_time=0.45)
        self.play(Create(cadre), run_time=0.3)
        self.au_mot("environ")
        env = self.t("environ", 36, GRAY_B).next_to(l, DOWN, buff=0.25).align_to(l[4], LEFT)
        self.play(FadeIn(env, shift=UP * 0.1), run_time=0.35)
        self.au_mot("C'est à ça")
        l2 = self.gauche(self.t("L'espérance sert à", 38), -0.6)
        l3 = self.gauche(self.t("prévoir sur un grand nombre", 36, JAUNE_TITRE, BOLD), -1.45)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("prévoir")
        self.play(FadeIn(l3, scale=1.2), run_time=0.5)
        r.tourner(self, tours=2.0, run_time=1.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 36
        items = [
            (suite(self.t("L'espérance", fs, JAUNE_TITRE, BOLD), self.t("= la moyenne des gains", fs), buff=0.2),
             self.t("sur un très grand nombre de parties", fs)),
            (self.t("Sur peu de parties :", fs, ORANGE_RETENUE, BOLD), self.t("la moyenne varie beaucoup", fs)),
            (self.t("Sur beaucoup de parties :", fs, VERT_OK, BOLD),
             self.t("elle se rapproche de l'espérance", fs)),
        ]
        blocs = VGroup()
        for haut, bas in items:
            txt = VGroup(haut, bas).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
            blocs.add(VGroup(self.coche(), txt).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        blocs.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if blocs.width > 11.0:
            blocs.scale_to_fit_width(11.0)
        blocs.move_to(P(-0.8, 0.0))
        for b in blocs:
            b[0].shift(DOWN * 0.12)
        reperes = [("L'espérance est", "sur un très grand"), ("Sur peu", "varie beaucoup"),
                   ("Sur beaucoup", "elle se rapproche")]
        for (m1, m2), b in zip(reperes, blocs):
            self.au_mot(m1)
            self.play(FadeIn(b[1][0], shift=RIGHT * 0.2), run_time=0.5)
            self.au_mot(m2)
            self.play(FadeIn(b[1][1], shift=RIGHT * 0.2), Create(b[0]), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 08 : l'écran de fin (règle du 19/10) ────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_dix()
        self.ecran_autre()
        self.ecran_mille()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement()


class ProbaVaMoyenneSTMG(ProbaVaMoyenneBase):
    identite = "Maths STMG — EleveAI"


class ProbaVaMoyennePremiereSpe(ProbaVaMoyenneBase):
    identite = "Maths 1re spé — EleveAI"
