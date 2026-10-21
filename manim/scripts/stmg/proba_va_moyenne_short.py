# proba_va_moyenne_short.py
# EleveAI — Maths STMG ET Maths 1re spécialité — short jumeau de
# « L'espérance, c'est la moyenne… sur un très grand nombre de parties ».
# CEINTURE JAUNE. Il AMUSE : un dé sort 6, 6, 5, 6, 6 → moyenne 5,8… truqué ?
# Pas forcément : la courbe de la moyenne revient vers 3,5.
#   · en HAUT : le dé qui roule, puis la courbe de la moyenne (axes sans
#     nombres, seulement la ligne « 3,5 ») ;
#   · en BAS, EN MÊME TEMPS : « Théorique : 3,5 », les 5 lancers,
#     « Moyenne : 5,8 », « Truqué ? », puis le long terme ;
#   · fin : la question (3 ou 3,5 ?) et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran : UN seul rendu,
# copié dans les dossiers STMG et 1re spé.
#
# Voix : manim/voix/stmg-premiere-spe-proba-va-moyenne-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_moyenne_short.py ShortProbaVaMoyenne -o eleveai-maths-stmg-proba-va-moyenne-short --media_dir manim/scripts/stmg/media-va_moyenne
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/27-va-moyenne/ et, sous le nom
# eleveai-maths-premiere-proba-va-moyenne-short.mp4, dans manim/sorties/premiere/maths/probabilites/27-va-moyenne/.

import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_va_moyenne import P  # noqa: E402  (pose les chemins)

import numpy as np  # noqa: E402
from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
LANCERS = [6, 6, 5, 6, 6]
POINTS = {1: [(0, 0)], 2: [(-1, 1), (1, -1)], 3: [(-1, 1), (0, 0), (1, -1)],
          4: [(-1, 1), (1, 1), (-1, -1), (1, -1)], 5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)],
          6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)]}


def de(n, c=1.3):
    """Un dé blanc, ses points noirs."""
    fond = RoundedRectangle(width=c, height=c, corner_radius=c * 0.18, fill_color=WHITE, fill_opacity=1,
                            stroke_color="#334155", stroke_width=3)
    pts = VGroup(*[Dot(P(x * c * 0.27, y * c * 0.27), radius=c * 0.085, color="#0F172A") for x, y in POINTS[n]])
    return VGroup(fond, pts)


def moyennes_de(n=1000, graine=232):
    g = list(LANCERS)
    r = random.Random(graine)
    while len(g) < n:
        g.append(r.randint(1, 6))
    t, ms = 0, []
    for i, x in enumerate(g):
        t += x
        ms.append(t / (i + 1))
    return ms


class ShortProbaVaMoyenne(Short6e):
    ceinture = "jaune"
    nom_voix = "stmg-premiere-spe-proba-va-moyenne-short"

    def dire(self, nom, dossier=None):
        self._curseur = 0
        return super().dire(nom, dossier)

    def au_mot(self, extrait):
        """Comme le gabarit, mais la recherche reprend après le dernier extrait
        trouvé (les « 6 » de la liste des lancers se suivent)."""
        texte = self._texte_voix
        i = texte.find(extrait, getattr(self, "_curseur", 0))
        if i < 0:
            raise ValueError(f"« {extrait} » absent de la voix : {texte[:60]}…")
        self._curseur = i + len(extrait)
        if not self._duree_voix:
            return
        reste = self._debut_voix + self._duree_voix * i / len(texte) - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, weight=NORMAL):
        t = Text(texte, font_size=font_size, color=color, weight=weight)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, *morceaux, y=0.0, buff=0.18):
        g = VGroup(*morceaux).arrange(RIGHT, buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def rouler(self, d, n):
        """Le dé saute en tournant et retombe sur la face n."""
        neuf = de(n, d[0].width).move_to(d)
        self.play(d.animate.shift(UP * 0.35).rotate(PI / 2), run_time=0.14, rate_func=rate_functions.ease_out_quad)
        d.become(neuf.shift(UP * 0.35))
        self.play(d.animate.shift(DOWN * 0.35), run_time=0.12, rate_func=rate_functions.ease_in_quad)

    def courbe(self, o=P(-1.3, 0.25), L=3.2, H=2.45, ymax=6.5):
        ms = moyennes_de()
        n = len(ms)
        pts = [o + P(L * np.log10(k + 1) / np.log10(n), H * m / ymax) for k, m in enumerate(ms)]
        debut = VMobject(stroke_color=ORANGE_RETENUE, stroke_width=5).set_points_as_corners(pts[:5])
        suite_ = VMobject(stroke_color=BLEU_CALCUL, stroke_width=4).set_points_as_corners(pts[4:])
        ax = VGroup(Arrow(o, o + RIGHT * (L + 0.3), buff=0, stroke_width=3, tip_length=0.16, color=WHITE),
                    Arrow(o, o + UP * (H + 0.25), buff=0, stroke_width=3, tip_length=0.16, color=WHITE))
        y35 = o[1] + H * 3.5 / ymax
        l35 = DashedLine(P(o[0], y35), P(o[0] + L + 0.15, y35), color=JAUNE_TITRE, stroke_width=4, dash_length=0.12)
        lab = Text("3,5", font_size=26, color=JAUNE_TITRE, weight=BOLD).next_to(P(o[0], y35), LEFT, buff=0.08)
        labx = Text("lancers", font_size=20, color=GRAY_B).next_to(ax[0], DOWN, buff=0.08).align_to(ax[0], RIGHT)
        laby = Text("moyenne", font_size=20, color=GRAY_B).next_to(ax[1], RIGHT, buff=0.1).align_to(ax[1], UP)
        return VGroup(ax, labx, laby), debut, suite_, VGroup(l35, lab), pts

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 6, 6, 5, 6, 6 ──
        self.dire("00-accroche")
        titre = self.grand("Un dé truqué ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        d = de(6).move_to(P(0, 1.1))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(d, scale=0.5), run_time=0.7)
        self.au_mot("théorique est 3,5")
        theo = self.ligne(self.t("Théorique :", 32), self.t("3,5", 44, JAUNE_TITRE, weight=BOLD), y=-0.75)
        self.play(FadeIn(theo, shift=UP * 0.2), run_time=0.4)
        self.insister(theo[1], 1.3)
        self.au_mot("Tu lances 5 fois")
        self.play(Wiggle(d), run_time=0.6)
        petits = [P(-1.5 + 0.75 * k, -0.05) for k in range(5)]
        compteur = VGroup()
        for k, n in enumerate(LANCERS):
            self.au_mot(("obtiens 6" if k == 0 else f"{n},") if k < 4 else f"{n}.")
            self.rouler(d, n)
            p = de(n, 0.55).move_to(petits[k])
            compteur.add(p)
            self.play(TransformFromCopy(d, p), run_time=0.18)
        self.au_mot("Moyenne : 5,8")
        moy = self.ligne(self.t("Moyenne :", 36), self.t("5,8", 60, ORANGE_RETENUE, weight=BOLD), y=-1.55)
        self.play(FadeIn(moy[0], shift=UP * 0.2), FadeIn(moy[1], scale=0.4), run_time=0.45)
        self.insister(moy[1], 1.4)
        self.au_mot("truqué")
        tru = self.t("Truqué ?", 46, ROUGE_ERREUR, weight=BOLD).move_to(P(0, -2.35))
        self.play(FadeIn(tru, scale=1.6), Wiggle(d), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : pas forcément ; la courbe revient vers 3,5 ──
        self.dire("01-image")
        non = self.grand("Pas forcément !", font_size=54, color=VERT_OK).move_to(P(0, 1.0))
        self.play(FadeOut(VGroup(d, badge, compteur), shift=UP * 0.3), FadeOut(VGroup(theo, moy, tru)),
                  FadeIn(non, scale=1.8), run_time=0.45)
        self.insister(non, 1.15)
        fond, debut, suite_, l35, pts = self.courbe()
        self.au_mot("Sur 5 lancers")
        self.play(FadeOut(non, shift=UP * 0.3), FadeIn(fond), run_time=0.35)
        b1 = VGroup(self.t("Sur 5 lancers :", 32, ORANGE_RETENUE, weight=BOLD),
                    self.t("ça bouge énormément", 32)).arrange(DOWN, buff=0.1).move_to(P(0, -0.65))
        self.play(Create(debut), FadeIn(b1[0], shift=UP * 0.2), run_time=0.6)
        self.au_mot("bouge énormément")
        self.play(FadeIn(b1[1], shift=UP * 0.2), Wiggle(debut), run_time=0.6)
        self.au_mot("Sur 1 000 lancers")
        b2 = self.ligne(self.t("Sur 1 000 lancers :", 32, BLEU_CALCUL, weight=BOLD), y=-1.6)
        point = Dot(pts[4], radius=0.07, color=WHITE).set_z_index(4)
        self.add(point)
        self.play(FadeIn(b2, shift=UP * 0.2), Create(suite_), MoveAlongPath(point, suite_.copy()),
                  run_time=2.0, rate_func=linear)
        self.au_mot("de 3,5")
        b3 = self.ligne(self.t("vers", 32), self.t("3,5", 46, JAUNE_TITRE, weight=BOLD), y=-2.15)
        self.play(Create(l35[0]), FadeIn(l35[1], scale=1.6), FadeIn(b3, scale=1.3), run_time=0.5)
        self.play(Flash(point, color=JAUNE_TITRE, line_length=0.2), run_time=0.4)
        self.au_mot("L'espérance")
        b4 = VGroup(self.t("L'espérance,", 36), self.t("c'est le long terme", 32, VERT_OK, weight=BOLD)).arrange(DOWN, buff=0.12)
        self.play(FadeOut(VGroup(b1, b2, b3), shift=UP * 0.2), run_time=0.3)
        b4.move_to(P(0, -1.1))
        self.play(FadeIn(b4, scale=1.3), run_time=0.45)
        self.insister(b4[1], 1.12)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : 3 ou 3,5 ? ──
        self.dire("02-question")
        self.au_mot("10 000 lancers")
        q1 = self.ligne(self.t("Sur", 32), self.t("10 000", 44, BLEU_CALCUL, weight=BOLD), self.t("lancers", 32),
                        y=-0.45)
        self.play(FadeOut(b4, shift=UP * 0.2), FadeIn(q1, scale=1.3), run_time=0.45)
        self.au_mot("plus proche")
        q2a = self.t("plus proche de", 34).move_to(P(0, -0.98))
        q2 = self.ligne(self.t("3", 50, ORANGE_RETENUE, weight=BOLD), self.t("ou de", 34),
                        self.t("3,5", 50, JAUNE_TITRE, weight=BOLD), self.t("?", 42), y=-1.5)
        self.play(FadeIn(q2a, shift=UP * 0.2), run_time=0.35)
        self.au_mot("de 3 ou")
        self.play(FadeIn(q2[0], scale=1.8), run_time=0.3)
        self.au_mot("de 3,5")
        self.play(FadeIn(q2[1]), FadeIn(q2[2], scale=1.8), FadeIn(q2[3]), run_time=0.35)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.42))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaVaMoyenneTerminale(ShortProbaVaMoyenne):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"
