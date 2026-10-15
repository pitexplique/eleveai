# proba_frequence_repeter_short.py
# EleveAI — Maths 4e — short jumeau de Probabilités, épisode 11 : répéter l'expérience.
# CEINTURE BLANCHE : en HAUT l'histogramme des 6 faces (celui de la paysage) qui
# s'agite puis s'aligne sur la ligne pointillée de 1/6 pendant que le dé roule ;
# en BAS le compteur de lancers et les mots qui s'écrivent avec la voix.
# Fin : « 6 000 lancers : combien de 6 ? » et « Réponds en commentaire ! ».
# Voix : manim/voix/4e-proba-frequence-repeter-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/proba_frequence_repeter_short.py ProbaFrequenceRepeter4eShort -o eleveai-maths-4e-proba-frequence-repeter-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/11-frequence-repeter/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_frequence_repeter import (EFF_10, EFF_100, EFF_600, TIRAGES, ZERO, Histogramme,  # noqa: E402
                                     P, de, de_qui_roule, freqs)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_bases import _Fractions  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402


class ProbaFrequenceRepeter4eShort(Histogramme, Short6e, _Fractions):
    nom_voix = "4e-proba-frequence-repeter-short"

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
        return self.ligne([(f"{n:,}".replace(",", " "), JAUNE_TITRE), ("lancers", WHITE)], 34).move_to(P(0, -0.8))

    def roule(self, d):
        r = de_qui_roule(d.get_center(), 0.5, periode=0.06, faces=TIRAGES[:80])
        self.remove(d)
        self.add(r)
        return r

    def poser(self, r, face=6):
        r.clear_updaters()
        self.remove(r)
        d = de(face, 0.5).move_to(P(1.6, 1.5))
        self.add(d)
        return d

    def construct(self):
        self.margo_bas()
        self.regler_histo(x0=-1.4, pas=0.58, larg=0.42, base=-0.05, H=4.0, font=22, cote_de=0.3)

        # ── 00 ──
        self.dire("00-accroche")
        titre = self.grand("600 lancers !", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        axe = self.axe_histo()
        d = de(3, 0.5).move_to(P(1.6, 1.5))
        self.play(FadeIn(titre), FadeIn(badge), FadeIn(axe), FadeIn(d), run_time=0.8)
        self.au_mot("600 fois")
        self.play(titre.animate.scale(1.1), run_time=0.3)
        self.play(titre.animate.scale(1 / 1.1), run_time=0.3)
        self.au_mot("Regarde les barres")
        hold = self.barres(ZERO)
        self.add(hold)
        regarde = self.borne(self.t("Regarde les barres !", 36, BLEU_CALCUL)).move_to(P(0, -1.5))
        self.play(FadeIn(regarde, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 01 ──
        self.dire("01-image")
        compteur = self.cpt(0)
        self.play(FadeOut(regarde), FadeIn(compteur), run_time=0.3)
        self.au_mot("Au début")
        r = self.roule(d)
        self.faire_monter(hold, ZERO, freqs(EFF_10), 1.2, compteur, 0, 10, self.cpt)
        d = self.poser(r, 1)
        l1 = self.ligne([("Au début :", WHITE), ("désordre", ORANGE_RETENUE)], 34).move_to(P(0, -1.5))
        self.borne(l1)
        self.play(FadeIn(l1), LaggedStart(*[Wiggle(b, scale_value=1.15) for b in hold], lag_ratio=0.08),
                  run_time=0.9)
        self.au_mot("Puis les barres montent")
        lig = self.ligne_sixieme(gauche=True)
        r = self.roule(d)
        self.play(FadeOut(l1), Create(lig[0]), FadeIn(lig[1]), run_time=0.4)
        l2 = self.borne(self.t("les barres s'alignent", 34, VERT_OK)).move_to(P(0, -1.5))
        self.faire_monter(hold, freqs(EFF_10), freqs(EFF_100), 1.2, compteur, 10, 100, self.cpt,
                          rate=linear)
        self.faire_monter(hold, freqs(EFF_100), freqs(EFF_600), 1.6, compteur, 100, 600, self.cpt,
                          rate=rate_functions.ease_out_sine, autres=[FadeIn(l2)])
        d = self.poser(r, 6)
        self.au_mot("600 lancers")
        self.play(compteur.animate.scale(1.3), Indicate(lig[0], color=VERT_OK), run_time=0.3)
        self.play(compteur.animate.scale(1 / 1.3), run_time=0.3)
        self.au_mot("à peu près 100 fois")
        eff = self.effectifs(freqs(EFF_600), EFF_600, font=18)
        l3 = self.ligne([("≈ 100", JAUNE_TITRE), ("fois chaque face", WHITE)], 32).move_to(P(0, -1.5))
        self.borne(l3)
        self.play(FadeOut(l2), FadeIn(l3), LaggedStart(*[FadeIn(e, shift=DOWN * 0.1) for e in eff], lag_ratio=0.1),
                  run_time=0.7)
        self.play(l3[0].animate.scale(1.4), run_time=0.3)
        self.play(l3[0].animate.scale(1 / 1.4), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 02 ──
        self.dire("02-question")
        histo = VGroup(axe, hold, lig, eff, d)
        self.play(FadeOut(VGroup(l3, compteur)), FadeOut(eff), histo.animate.scale(0.62).move_to(P(0, 1.05)),
                  run_time=0.5)
        self.au_mot("sur 6 000 lancers")
        q1 = self.ligne([("Sur", WHITE), ("6 000", JAUNE_TITRE), ("lancers,", WHITE)], 36).move_to(P(0, 0.05))
        self.borne(q1)
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("combien de 6")
        q2 = self.ligne([("combien de", BLEU_CALCUL), de(6, 0.5), ("?", BLEU_CALCUL)], 40, 0.2)
        self.borne(q2, 0.9).move_to(P(0, -0.6))
        self.play(FadeIn(q2, scale=0.8), run_time=0.4)
        self.play(q2[1].animate.scale(1.5), run_time=0.3)
        self.play(q2[1].animate.scale(1 / 1.5), run_time=0.3)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 46, VERT_OK), self.t("commentaire !", 46, VERT_OK)).arrange(DOWN, buff=0.12)
        self.borne(appel, 0.5)
        rep = VGroup(appel, self.grand("@eleveai974", font_size=30, color=BLEU_CALCUL)).arrange(DOWN, buff=0.12)
        self.play(FadeIn(rep.move_to(P(0, -1.65)), scale=0.8))
        self.attendre_voix(marge=1.5)
