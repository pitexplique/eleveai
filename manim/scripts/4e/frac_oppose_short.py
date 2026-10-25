# frac_oppose_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 11 « L'opposé d'une fraction »
# (micro fraction_oppose). CEINTURE BLANCHE (règle du short blanc de REGLES.md) :
# aucun calcul, on VOIT la notion ; EN HAUT le tir à la corde, EN BAS la droite
# graduée du coach : le ruban est TOUJOURS juste au-dessus de son point
# (même échelle, un pointillé les relie), synchrones. Code couleur partagé :
# bleu à droite du 0 (les bleus), rouge à gauche (les rouges).
# Il AMUSE : Aïcha, PROFESSEURE D'EPS, arbitre un tir à la corde :
#   · les bleus tirent le ruban à 3/5 m à droite ; les rouges à −3/5 m ;
#   · même distance au 0 de chaque côté : des opposés, « comme un miroir » ;
#   · les deux tirent aussi fort : 3/5 + (−3/5) = 0, le ruban ne bouge pas ;
#   · 1 question-pause (3 s) : l'opposé de −2/7 ;
#   · commentaire : « ruban à −5/8 m : de combien les bleus doivent-ils tirer
#     pour le ramener au 0 ? » (5/8 m).
# Chiffres inventés. Centres d'intérêt : sport, jeux-defis.
#
# Voix : manim/voix/4e-frac-oppose-short.json (débit −10) ; marques :
# manim/scripts/4e/frac_oppose_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/frac_oppose_short.py FracOpposeShort4e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/frac_oppose_short.py FracOpposeShort4e -o eleveai-maths-4e-frac-oppose-short --media_dir manim/scripts/4e/media-frac-oppose-short
# Sortie : manim/sorties/4e/maths/fractions/11-oppose/eleveai-maths-4e-frac-oppose-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotf_commun import *  # noqa: E402,F403

BLEU_E, ROUGE_E = "#3b82f6", "#ef4444"
UM = 1.3                  # unités par mètre (corde ET droite : le ruban au-dessus de son point)
YC, YD = 1.35, -0.5        # la corde ; la droite graduée


def equipe(couleur, sens):
    """Deux tireurs penchés en arrière (sens = -1 : à gauche, +1 : à droite)."""
    g = VGroup()
    for k in range(2):
        p = personnage(peau=["#8d5524", "#f1c27d"][k], haut=couleur, cheveux="#111827", s=0.27)
        p.rotate(-sens * 0.25).move_to(P(sens * (0.7 + 0.34 * k), YC - 0.05))
        g.add(p)
    return g


class FracOpposeShort4e(ShortF):
    nom_voix = "4e-frac-oppose-short"
    fichier_marques = "frac_oppose_short_marques.json"
    ceinture = "blanche"

    def jeu(self):
        corde = Line(P(-1.25, YC), P(1.25, YC), color="#d6b98c", stroke_width=9)
        ruban = Rectangle(width=0.12, height=0.45, fill_color=AMBRE, fill_opacity=1, stroke_width=0).move_to(P(0, YC))
        g = VGroup(corde, equipe(ROUGE_E, -1), equipe(BLEU_E, 1), ruban)
        g.ruban = ruban
        return g

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le tir à la corde", self.ceinture)
        self.add(badge, titre)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Aïcha, la corde, le 0 ──
        self.dire("00-accroche")
        self.au_mot("Aïcha")
        ai = self.bas(self.ligne([("Aïcha,", BLEU_CALCUL), ("professeure d'EPS", WHITE)], 30), -2.4)
        self.play(FadeIn(ai, scale=0.8), run_time=0.4)
        jeu = self.jeu()
        self.au_mot("tir à la corde")
        self.play(FadeIn(jeu, shift=UP * 0.2), run_time=0.6)
        self.au_mot("un ruban")
        self.play(Indicate(jeu.ruban, color=AMBRE, scale_factor=1.6), run_time=0.5)
        self.au_mot("une ligne")
        sol = DashedLine(P(0, YC + 0.7), P(0, YC - 0.7), color=WHITE, stroke_width=5, dash_length=0.1)
        d = Droite(-1, 1, 10, etiquettes={0: "0"}, longueur=2 * UM, centre=P(0, YD), fs=30, depasse=0.3)
        d.shift(LEFT * d.p(0)[0])
        self.play(Create(sol), run_time=0.4)
        self.au_mot("c'est le 0")
        self.play(FadeIn(d, shift=UP * 0.2), Indicate(sol, color=ROUGE_ZERO), run_time=0.6)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(ai), run_time=0.3)
        self.d, self.jeu_, self.sol = d, jeu, sol

        # ── 01 : les bleus ──
        self.dire("01-bleus")
        self.au_mot("Les bleus tirent")
        cur = always_redraw(lambda: DashedLine(jeu.ruban.get_bottom(), P(jeu.ruban.get_x(), YD + 0.05),
                                               color=AMBRE, stroke_width=3, dash_length=0.08))
        self.add(cur)
        self.play(jeu.animate.shift(RIGHT * 0.6 * UM), run_time=1.4)
        self.au_mot("3 cinquièmes de mètre")
        pb = d.point(0.6, "3/5", couleur=BLEU_E, fs=30)
        self.play(FadeIn(pb, shift=DOWN * 0.15), run_time=0.35)
        self.au_mot("On écrit")
        lb = self.ligne_mots([(EcritureFraction(3, 5, fs=48, couleur=BLEU_E), WHITE, "3 cinquièmes.")], fs=40)
        lb.move_to(P(0.9, -2.3))
        self.jouer_mots(lb)
        self.attendre_voix(marge=0.2)

        # ── 02 : les rouges ──
        self.dire("02-rouges")
        self.au_mot("ripostent")
        self.play(jeu.animate.shift(LEFT * 0.6 * UM), run_time=0.9)
        self.au_mot("à gauche")
        self.play(jeu.animate.shift(LEFT * 0.6 * UM), run_time=0.9)
        self.au_mot("3 cinquièmes du 0")
        pr = d.point(-0.6, "−3/5", couleur=ROUGE_E, fs=30)
        self.play(FadeIn(pr, shift=DOWN * 0.15), run_time=0.35)
        lr = self.ligne_mots([(moins_frac(3, 5, fs=48, couleur=ROUGE_E), WHITE, ("3 cinquièmes.", 1))], fs=40)
        lr.move_to(P(-0.9, -2.3))
        self.jouer_mots(lr)
        self.attendre_voix(marge=0.2)

        # ── 03 : le miroir ──
        self.dire("03-miroir")
        self.au_mot("Même distance")
        a1 = BraceBetweenPoints(d.p(0), d.p(0.6), DOWN, color=BLEU_E).shift(DOWN * 0.55)
        a2 = BraceBetweenPoints(d.p(-0.6), d.p(0), DOWN, color=ROUGE_E).shift(DOWN * 0.55)
        self.play(GrowFromCenter(a1), GrowFromCenter(a2), run_time=0.6)
        self.au_mot("des opposés")
        op = self.bas(self.t("des opposés !", 40, VERT_OK), -3.0 + 0.0)
        op.move_to(P(0, -2.3))
        self.play(FadeOut(VGroup(lb, lr)), run_time=0.2)
        self.play(FadeIn(op, scale=1.2), run_time=0.4)
        self.au_mot("miroir")
        mir = DashedLine(P(0, YD + 2.5), P(0, YD - 0.9), color=VERT_OK, stroke_width=6, dash_length=0.12)
        self.play(Create(mir), Flash(d.p(0), color=VERT_OK, flash_radius=0.35), run_time=0.7)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(a1, a2, op, mir, pb, pr)), run_time=0.3)

        # ── 04 : aussi fort : la somme vaut 0 ──
        self.dire("04-zero")
        self.au_mot("aussi fort")
        self.play(jeu.animate.shift(RIGHT * 0.6 * UM), run_time=1.0)
        self.au_mot("Les bleus tirent")
        fb = Arrow(P(0.15, YC + 0.75), P(0.15 + 0.6 * UM, YC + 0.75), buff=0, color=BLEU_E, stroke_width=8)
        self.play(GrowArrow(fb), Wiggle(jeu[2], scale_value=1.05), run_time=0.6)
        self.au_mot("les rouges de moins")
        fr2 = Arrow(P(-0.15, YC + 0.75), P(-0.15 - 0.6 * UM, YC + 0.75), buff=0, color=ROUGE_E, stroke_width=8)
        self.play(GrowArrow(fr2), Wiggle(jeu[1], scale_value=1.05), run_time=0.6)
        lg = self.ligne_mots([(EcritureFraction(3, 5, fs=48, couleur=BLEU_E), WHITE, "3 cinquièmes plus"),
                              ("+ (", WHITE, None),
                              (moins_frac(3, 5, fs=48, couleur=ROUGE_E), WHITE, ("3 cinquièmes, égale", 1)),
                              (")", WHITE, None), ("= 0", VERT_OK, "0 :")], fs=40, buff=0.1)
        self.borne(lg, 0.6)
        lg.move_to(P(0, -2.3))
        self.jouer_mots(lg)
        self.au_mot("ne bouge pas")
        self.play(Indicate(jeu.ruban, color=AMBRE, scale_factor=1.6), Flash(d.p(0), color=VERT_OK), run_time=0.6)
        self.au_mot("Égalité")
        eg = self.t("Égalité !", 44, VERT_OK).move_to(P(0, -2.4))
        self.play(FadeOut(lg), FadeIn(eg, scale=1.3), run_time=0.4)
        self.insister(eg, 1.15)
        self.attendre_voix(marge=0.3)
        self.remove(cur)
        self.vider(garder)

        # ── 05 : la question-pause (3 s) ──
        self.question_b("05-question", "05b-reponse", ["Le ruban est à −2/7.", "Où est son opposé ?"],
                        [bloc_fixe(self.inline("2/7", 30)), bloc_fixe(self.inline("−7/2", 30)),
                         bloc_fixe(self.inline("7/2", 30))], 0,
                        [[("on change seulement le signe :", WHITE, "On change")],
                         [("2/7", VERT_OK, "2 septièmes, de"), ("de l'autre côté du", WHITE, "de l'autre"), ("0", WHITE, "0.")]],
                        fs_rep=26, mot_q="Le ruban", avant_q=lambda sc: sc.q_au_mot("2 septièmes. Où"))
        self.vider(garder)

        # ── 06 : la question en commentaire ──
        self.dire("06-question")
        jeu2 = self.jeu()
        d2 = Droite(-1, 1, 8, etiquettes={0: "0"}, longueur=2 * UM, centre=P(0, YD), fs=30, depasse=0.3)
        d2.shift(LEFT * d2.p(0)[0])
        self.add(d2)
        self.au_mot("les rouges ont tiré")
        self.play(FadeIn(jeu2), run_time=0.4)
        self.play(jeu2.animate.shift(LEFT * 0.625 * UM), run_time=0.9)
        self.au_mot("5 huitièmes")
        p5 = d2.point(-0.625, "−5/8", couleur=ROUGE_E, fs=30)
        self.play(FadeIn(p5, shift=DOWN * 0.15), run_time=0.35)
        self.au_mot("De combien")
        q = self.bas(self.ligne([("Les bleus :", BLEU_E), ("?", ORANGE_TROU), ("m", WHITE)], 38), -2.2)
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        self.au_mot("ramener au 0")
        fl = Arrow(d2.p(-0.625) + DOWN * 0.45, d2.p(0) + DOWN * 0.45, buff=0, color=BLEU_E, stroke_width=7)
        self.play(GrowArrow(fl), run_time=0.5)
        self.insister(q[1], 1.6)
        self.appel_commentaire(y=-2.75)
