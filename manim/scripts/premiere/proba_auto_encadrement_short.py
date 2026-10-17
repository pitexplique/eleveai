# proba_auto_encadrement_short.py
# EleveAI — Maths 1re TRONC COMMUN — short jumeau de la série « Probabilités »,
# épisode 1 : une probabilité est entre 0 et 1. CEINTURE JAUNE. Il AMUSE :
# « 120 % de chances d'être rentable ! Tu signes ? »
#   · en HAUT le panneau solaire au soleil et la pub « 120 % » ;
#   · en BAS, EN MÊME TEMPS, la JAUGE de probabilité que le panneau remplit…
#     jusqu'à DÉBORDER à 120 % ;
#   · fin : « 0,99 ou 99/100 ? » et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/premiere-commun-proba-encadrement-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/proba_auto_encadrement_short.py ShortProbaEncadrementPremiereCommun -o eleveai-maths-premiere-commun-proba-encadrement-short --media_dir manim/scripts/premiere/media
# Puis copier le mp4 dans manim/sorties/premiere-commun/maths/probabilites/01-entre-0-et-1/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_auto_encadrement import P, Jauge, barrer, panneau_solaire, soleil  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaEncadrementPremiereCommun(Short6e):
    nom_voix = "premiere-commun-proba-encadrement-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Panneau solaire", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.35))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        sol = soleil(0.3).move_to(P(-1.7, 1.6))
        pan = panneau_solaire(1.6, 1.0).move_to(P(-1.0, 0.75))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(sol, scale=0.6),
                  FadeIn(pan, shift=UP * 0.2), run_time=0.8)
        j = Jauge(-2.0, 0.4, -0.85, h=0.45)
        liq = j.remplissage()
        self.add(liq)
        self.play(Create(j.corps()), run_time=0.4)
        self.au_mot("120 %")
        pub = self.t("120 %", 54, ORANGE_RETENUE, largeur=1.75)
        pub.move_to(P(2.1 - pub.width / 2, 1.2))
        rent = self.t("rentable !", 28, ORANGE_RETENUE, largeur=1.75).next_to(pub, DOWN, buff=0.12)
        rayon = DashedLine(sol.get_center(), pan.get_center(), color=JAUNE_TITRE, stroke_width=3)
        self.play(FadeIn(pub, scale=0.4), Create(rayon), j.niveau.animate.set_value(1.2), run_time=0.9)
        self.play(FadeIn(rent, shift=UP * 0.1), Flash(j.point(1.2), color=ROUGE_ERREUR), run_time=0.35)
        self.play(Wiggle(VGroup(j.tube, liq)), run_time=0.5)
        self.au_mot("Tu signes")
        signe = self.grand("Tu signes ?", font_size=46, color=BLEU_CALCUL).move_to(P(0, -2.3))
        self.play(FadeIn(signe, scale=0.5), run_time=0.35)
        self.insister(signe, 1.2, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : la jauge déborde ──
        self.dire("01-image")
        non = self.grand("Non !", font_size=64, color=ROUGE_ERREUR).move_to(P(0, -2.3))
        self.play(ReplacementTransform(signe, non), j.niveau.animate.set_value(0), run_time=0.45)
        self.play(Wiggle(non), run_time=0.5)
        self.au_mot("jamais 100 %")
        p1 = self.t("100 %", 30, JAUNE_TITRE).next_to(j.point(1), UP, buff=0.35)
        self.play(j.niveau.animate.set_value(1), FadeIn(p1, scale=0.5), run_time=0.8)
        self.au_mot("100 %, c'est")
        self.insister(p1, 1.4, 0.25)
        self.au_mot("certain")
        cert = self.t("certain", 28, VERT_OK).next_to(j.point(1), DOWN, buff=0.35)
        self.play(FadeIn(cert, shift=UP * 0.1), Flash(j.point(1), color=VERT_OK), run_time=0.4)
        self.au_mot("120 %, c'est")
        p12 = self.t("120 %", 28, ROUGE_ERREUR).next_to(j.point(1.2), RIGHT, buff=0.12)
        self.play(j.niveau.animate.set_value(1.2), FadeIn(p12, scale=0.5), run_time=0.6)
        self.play(Wiggle(VGroup(j.tube, liq)), Flash(j.point(1.2), color=ROUGE_ERREUR), run_time=0.5)
        self.au_mot("du marketing")
        mk = VGroup(self.t("du marketing,", 34, ORANGE_RETENUE),
                    self.t("pas des maths !", 34, VERT_OK)).arrange(DOWN, buff=0.1).move_to(P(0, -2.3))
        self.play(FadeOut(non, shift=UP * 0.2), FadeIn(mk[0], shift=UP * 0.2), run_time=0.35)
        self.au_mot("pas des maths")
        self.play(FadeIn(mk[1], scale=0.6), Create(barrer(pub, sw=7)), Create(barrer(p12, sw=5)), run_time=0.4)
        self.insister(mk[1], 1.15, 0.25)
        self.attendre_voix(marge=0.2)
        sol[0].clear_updaters()

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.35))
        self.play(Write(toi), run_time=0.4)
        self.au_mot("0,99")
        a = self.t("0,99", 60, JAUNE_TITRE).move_to(P(-1.35, 1.0))
        self.play(FadeIn(a, scale=0.5), run_time=0.35)
        self.au_mot("99 sur 100")
        ou = self.t("ou", 30).move_to(P(0, 1.0))
        b = self.fraction_short(99, 100).move_to(P(1.4, 1.0))
        self.play(FadeIn(ou), FadeIn(b, scale=0.5), run_time=0.35)
        self.au_mot("lequel est")
        q = self.t("le plus probable ?", 36, BLEU_CALCUL).move_to(P(0, -0.25))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.play(Wiggle(VGroup(a, b)), run_time=0.6)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.5))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=28, color=BLEU_CALCUL).move_to(P(0, -2.45))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)

    def fraction_short(self, num, den, font_size=48, color=JAUNE_TITRE):
        n = Text(str(num), font_size=font_size, color=color)
        d = Text(str(den), font_size=font_size, color=color)
        larg = max(n.width, d.width) + 0.14
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3.5)
        return VGroup(n, barre, d).arrange(DOWN, buff=0.08)
