# proba_frequence_echantillon_short.py
# EleveAI — Maths 4e — short jumeau de Probabilités, épisode 12 : les petits échantillons.
# CEINTURE JAUNE : en HAUT les 5 dés qui roulent (6, 2, 6, 4, 6 : trois six), puis
# qui roulent encore (le hasard fait des surprises), puis l'histogramme de 600
# lancers qui monte ; en BAS les maths qui s'écrivent avec la voix.
# Fin : « 300 six sur 600 lancers : truqué ? » et « Réponds en commentaire ! ».
# Voix : manim/voix/4e-proba-frequence-echantillon-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/proba_frequence_echantillon_short.py ProbaFrequenceEchantillon4eShort -o eleveai-maths-4e-proba-frequence-echantillon-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/12-frequence-echantillon/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_frequence_echantillon import EFF_600, RANGEE, rangee, rouler_rangee  # noqa: E402
from proba_frequence_repeter import TIRAGES, ZERO, Histogramme, P, de, de_qui_roule, freqs  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_bases import _Fractions  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

EFF_TRUQUE = [60, 58, 62, 61, 59, 300]


class ProbaFrequenceEchantillon4eShort(Histogramme, Short6e, _Fractions):
    nom_voix = "4e-proba-frequence-echantillon-short"

    def t(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=34, buff=0.15):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m[0], font_size, m[1])
                        for m in morceaux]).arrange(RIGHT, buff=buff)

    def borne(self, mob, marge=0.4):
        if mob.width > config.frame_width - marge:
            mob.scale_to_fit_width(config.frame_width - marge)
        return mob

    def cpt(self, n):
        return self.ligne([(str(n), JAUNE_TITRE), ("lancers", WHITE)], 30).move_to(P(0, 1.75))

    def construct(self):
        self.margo_bas()

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("Truqué ?", font_size=52, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        r = rangee(RANGEE, 0.66, 0.13).move_to(P(0, 1.0))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.5)
        rouler_rangee(self, r, 0.9, 0.06)
        cad = VGroup(*[SurroundingRectangle(d, color=JAUNE_TITRE, buff=0.05, stroke_width=4)
                       for d, f in zip(r, RANGEE) if f == 6])
        self.au_mot("3 six sur 5 lancers")
        l1 = self.borne(self.ligne([("3", JAUNE_TITRE), ("six sur", WHITE), ("5", JAUNE_TITRE),
                                    ("lancers", WHITE)], 36)).move_to(P(0, -0.35))
        self.play(Create(cad), FadeIn(l1), run_time=0.5)
        self.au_mot("Mon dé est truqué")
        l2 = self.borne(self.t("Mon dé est truqué ?", 38, ORANGE_RETENUE)).move_to(P(0, -1.2))
        self.play(FadeIn(l2, scale=0.8), run_time=0.4)
        self.play(l2.animate.scale(1.25), run_time=0.25)
        self.play(l2.animate.scale(1 / 1.25), run_time=0.25)
        self.attendre_voix(marge=0.1)

        # ── 01 ──
        self.dire("01-image")
        self.au_mot("Pas forcément")
        pf = self.borne(self.t("Pas forcément !", 44, VERT_OK)).move_to(P(0, -0.35))
        self.play(FadeOut(VGroup(l1, l2)), FadeIn(pf, scale=0.7), run_time=0.4)
        self.au_mot("5 lancers, c'est trop peu")
        l3 = self.borne(self.ligne([("5", JAUNE_TITRE), ("lancers : trop peu", WHITE)], 34)).move_to(P(0, -1.2))
        self.play(FadeIn(l3), run_time=0.4)
        self.au_mot("Le hasard fait des surprises")
        self.play(FadeOut(cad), FadeOut(pf), run_time=0.2)
        l4 = self.borne(self.t("Le hasard fait des surprises", 30, BLEU_CALCUL)).move_to(P(0, -0.35))
        self.play(FadeIn(l4), run_time=0.3)
        for faces in ([1, 6, 6, 3, 6], [2, 4, 1, 5, 3]):
            r2 = rangee(faces, 0.66, 0.13).move_to(r)
            self.remove(r)
            rouler_rangee(self, r2, 0.6, 0.06)
            r = r2
        self.au_mot("Il faut des centaines de lancers")
        self.regler_histo(x0=-1.4, pas=0.58, larg=0.42, base=0.15, H=3.4, font=20, cote_de=0.28)
        axe = self.axe_histo()
        hold = self.barres(ZERO)
        compteur = self.cpt(0)
        l5 = VGroup(self.t("Il faut des centaines", 32, VERT_OK), self.t("de lancers !", 32, VERT_OK)).arrange(DOWN, buff=0.1)
        self.borne(l5).move_to(P(0, -1.3))
        self.play(FadeOut(r), FadeOut(VGroup(l3, l4)), FadeIn(axe), FadeIn(compteur), run_time=0.4)
        self.add(hold)
        self.faire_monter(hold, ZERO, freqs(EFF_600), 1.8, compteur, 0, 600, self.cpt,
                          autres=[FadeIn(l5)])
        lig = self.ligne_sixieme()
        self.au_mot("pour conclure")
        self.play(Create(lig[0]), FadeIn(lig[1]), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 02 ──
        self.dire("02-question")
        self.play(FadeOut(l5), FadeOut(compteur), run_time=0.2)
        self.au_mot("300 six sur 600 lancers")
        q = self.borne(self.ligne([("300", JAUNE_TITRE), ("six sur", WHITE), ("600", JAUNE_TITRE),
                                   ("lancers", WHITE)], 34)).move_to(P(0, -0.6))
        self.faire_monter(hold, freqs(EFF_600), freqs(EFF_TRUQUE), 1.0, rate=rate_functions.ease_out_back,
                          autres=[FadeIn(q)])
        hold[5].set_fill(ORANGE_RETENUE)
        self.au_mot("ce dé est-il truqué")
        tq = self.borne(self.t("truqué ?", 36, ORANGE_RETENUE)).move_to(P(0, -1.1))
        self.play(FadeIn(tq, scale=0.8), Indicate(hold[5], color=ORANGE_RETENUE), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK)).arrange(DOWN, buff=0.1)
        self.borne(appel, 0.5)
        rep = VGroup(appel, self.grand("@eleveai974", font_size=28, color=BLEU_CALCUL)).arrange(DOWN, buff=0.1)
        self.play(FadeIn(rep.move_to(P(0, -2.05)), scale=0.8))
        self.attendre_voix(marge=1.5)
