# proba_va_esperance_short.py
# EleveAI — Maths STMG ET Maths 1re spécialité — short jumeau de
# « L'espérance : le gain moyen ».
# CEINTURE JAUNE. Il AMUSE : un dé qui paie le nombre affiché. En moyenne,
# 3 € ? Non : 21 ÷ 6 = 3,5… alors qu'AUCUNE face ne donne 3,5 !
#   · en HAUT le dé qui roule, puis ses 6 faces et leurs gains (1 € … 6 €) ;
#   · en BAS, EN MÊME TEMPS : 1 + 2 + 3 + 4 + 5 + 6 = 21, 21 ÷ 6 = 3,5 ;
#   · fin : « payer 4 € pour jouer ? » et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran : UN SEUL rendu suffit,
# copié sous les deux noms (STMG, 1re spé). Les deux sous-classes existent
# quand même, identiques.
#
# Voix : manim/voix/stmg-premiere-spe-proba-va-esperance-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_esperance_short.py ShortProbaVaEsperanceSTMG -o eleveai-maths-stmg-proba-va-esperance-short --media_dir manim/scripts/stmg/media-va_esperance
# (ShortProbaVaEsperancePremiereSpe donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/25-va-esperance/ et
# manim/sorties/premiere/maths/probabilites/25-va-esperance/
# (eleveai-maths-premiere-proba-va-esperance-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_va_esperance import ENCRE, P, suite  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
POINTS = {1: [(0, 0)], 2: [(-1, 1), (1, -1)], 3: [(-1, 1), (0, 0), (1, -1)],
          4: [(-1, 1), (1, 1), (-1, -1), (1, -1)], 5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)],
          6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)]}


def de(n, cote=1.2):
    """Une face de dé : carré blanc arrondi, n points noirs."""
    fond = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.16, fill_color=WHITE,
                            fill_opacity=1, stroke_color="#CBD5E1", stroke_width=3)
    pts = VGroup(*[Dot(P(a * cote * 0.27, b * cote * 0.27), radius=cote * 0.085, color=ENCRE)
                   for a, b in POINTS[n]])
    return VGroup(fond, pts)


class ShortProbaVaEsperanceBase(Short6e):
    nom_voix = "stmg-premiere-spe-proba-va-esperance-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, weight=NORMAL):
        t = Text(texte, font_size=font_size, color=color, weight=weight)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=34, y=-1.0, buff=0.12):
        g = suite(*[Text(x, font_size=fs, color=c) for x, c in morceaux], buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def rouler(self, d, suite_faces, fin, duree=0.1):
        """Le dé roule : il saute, change de face en tournant, retombe sur `fin`."""
        centre, cote = d.get_center().copy(), d[0].width
        self.play(d.animate.shift(UP * 0.4).rotate(PI / 6), run_time=0.2)
        for n in list(suite_faces) + [fin]:
            nv = de(n, cote).move_to(d.get_center()).rotate(PI / 6 if n != fin else 0)
            self.play(Transform(d, nv), run_time=duree)
        self.play(d.animate.move_to(centre), run_time=0.2, rate_func=rate_functions.ease_in_quad)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : un dé qui paie ; en moyenne, 3 € ? ──
        self.dire("00-accroche")
        titre = self.grand("Le dé qui paie", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        d = de(5, 1.5).move_to(P(0, 0.6))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(d, scale=0.5), run_time=0.7)
        self.rouler(d, [2, 6, 1, 4, 3], 5)
        self.au_mot("tu gagnes autant")
        g = self.ligne([("Gain :", WHITE), ("le nombre affiché", BLEU_CALCUL)], 30, -1.1)
        self.play(FadeIn(g, shift=UP * 0.1), Indicate(d, color=JAUNE_TITRE, scale_factor=1.15), run_time=0.6)
        self.au_mot("En moyenne")
        m = self.ligne([("En moyenne ?", JAUNE_TITRE)], 38, -1.8)
        self.play(FadeIn(m, scale=1.4), run_time=0.4)
        self.au_mot("3 euros ?")
        trois = self.ligne([("3 € ?", ORANGE_RETENUE)], 50, -2.55)
        self.play(FadeIn(trois, scale=1.8), run_time=0.4)
        self.insister(trois, 1.3, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : les 6 faces et leurs gains ; 21 ÷ 6 = 3,5 ──
        self.dire("01-image")
        faces = VGroup(*[de(n, 0.78) for n in range(1, 7)])
        for k, f in enumerate(faces):
            f.move_to(P(-1.35 + 1.35 * (k % 3), 1.35 - 1.3 * (k // 3)))
        gains = VGroup(*[self.t(f"{n} €", 28, JAUNE_TITRE).next_to(faces[n - 1], DOWN, buff=0.12)
                         for n in range(1, 7)])
        self.play(FadeOut(VGroup(g, m, trois), shift=DOWN * 0.2), FadeOut(badge),
                  ReplacementTransform(d, faces[4]),
                  LaggedStart(*[FadeIn(f, scale=0.5) for k, f in enumerate(faces) if k != 4], lag_ratio=0.1),
                  run_time=0.7)
        self.au_mot("1 chance sur 6")
        chance = self.ligne([("1 chance sur 6", BLEU_CALCUL)], 36, 2.4)
        self.play(FadeIn(chance, scale=1.3), LaggedStart(*[Indicate(f, scale_factor=1.15) for f in faces],
                                                         lag_ratio=0.1), run_time=0.8)
        s = self.ligne([("1", WHITE), ("+", WHITE), ("2", WHITE), ("+", WHITE), ("3", WHITE), ("+", WHITE),
                        ("4", WHITE), ("+", WHITE), ("5", WHITE), ("+", WHITE), ("6", WHITE), ("=", WHITE),
                        ("21", JAUNE_TITRE)], 34, -1.15, buff=0.08)
        for n, mot in enumerate(["1 plus 2", "plus 2", "plus 3", "plus 4", "plus 5", "plus 6"], start=1):
            self.au_mot(mot)
            a = [FadeIn(gains[n - 1], scale=1.6), FadeIn(s[2 * (n - 1)], scale=1.5),
                 faces[n - 1].animate.shift(UP * 0.12)]
            if n > 1:
                a.append(FadeIn(s[2 * n - 3]))
            self.play(*a, run_time=0.22)
            self.play(faces[n - 1].animate.shift(DOWN * 0.12), run_time=0.12)
        self.au_mot("égale 21")
        self.play(FadeIn(s[11]), FadeIn(s[12], scale=1.8), run_time=0.35)
        dv = self.ligne([("21", JAUNE_TITRE), ("÷", WHITE), ("6", WHITE), ("=", WHITE), ("3,5", VERT_OK)], 40, -1.8)
        self.au_mot("21 divisé")
        self.play(TransformFromCopy(s[12], dv[0]), FadeIn(dv[1]), FadeIn(dv[2], scale=1.4), run_time=0.45)
        self.au_mot("égale 3,5")
        self.play(FadeIn(dv[3]), FadeIn(dv[4], scale=1.8), run_time=0.35)
        self.au_mot("En moyenne, 3,50")
        moy = self.ligne([("En moyenne :", WHITE), ("3,50 €", VERT_OK)], 36, -2.45, buff=0.18)
        cadre = SurroundingRectangle(moy, color=VERT_OK, buff=0.12, stroke_width=3, corner_radius=0.08)
        self.play(FadeIn(moy, shift=UP * 0.1), Create(cadre), run_time=0.45)
        self.au_mot("aucune face")
        aucune = VGroup(self.t("Aucune face", 36, ROUGE_ERREUR, weight=BOLD),
                        self.t("ne donne 3,5 !", 36, ROUGE_ERREUR, weight=BOLD)).arrange(DOWN, buff=0.08)
        aucune.move_to(P(0, 2.3))
        self.play(ReplacementTransform(chance, aucune), *[Wiggle(f, scale_value=1.1) for f in faces],
                  run_time=0.8)
        self.insister(aucune, 1.12, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : payer 4 € pour jouer ? ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        d2 = de(4, 1.3).move_to(P(0, 0.55))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(faces, gains, s, dv, aucune)),
                  FadeIn(d2, scale=0.5), run_time=0.6)
        self.au_mot("payait 4 euros")
        q1 = self.ligne([("Payer", WHITE), ("4 €", ORANGE_RETENUE), ("pour jouer ?", WHITE)], 34, -1.1, buff=0.15)
        self.play(FadeIn(q1, scale=1.3), run_time=0.4)
        self.rouler(d2, [6, 1, 3], 2, duree=0.08)
        self.au_mot("gagnerais-tu")
        q2 = self.ligne([("Gagnant à long terme ?", JAUNE_TITRE)], 34, -1.75)
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaVaEsperanceSTMG(ShortProbaVaEsperanceBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaVaEsperancePremiereSpe(ShortProbaVaEsperanceBase):
    identite = "Maths 1re spé — EleveAI"
