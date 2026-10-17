# proba_conditionnelle_arbre_short.py
# EleveAI — Maths Tle spé — short jumeau de l'épisode 1 « L'arbre pondéré ».
# CEINTURE ORANGE. Il AMUSE : « le gardien arrête 30 % à gauche, 20 % à
# droite… il arrête 25 % des tirs ? » — non : 0,26, c'est l'arbre.
#   · en HAUT la cage : le gardien plonge, le ballon part, il l'arrête ;
#   · en BAS, EN MÊME TEMPS, l'arbre pondéré (canvas `arbre_proba` du coach) :
#     le chemin G → A s'allume quand il plonge à gauche, Ḡ → A quand il plonge
#     à droite ; 25 % barré, 0,26 ;
#   · fin : « et à 90 % ? », la question, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/terminale-proba-arbre-short.json (débit −6).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_conditionnelle_arbre_short.py ShortProbaArbreTerminale -o eleveai-maths-terminale-proba-arbre-short --media_dir manim/scripts/terminale/media
# Puis copier le mp4 dans manim/sorties/terminale/maths/probabilites/01-arbre-pondere/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_conditionnelle_arbre import P, ArbreP, ballon, cage, gardien  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaArbreTerminale(Short6e):
    nom_voix = "terminale-proba-arbre-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=6):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=sw, color=color)

    def presents(self, anims):
        """Ne garde que les animations d'objets DÉJÀ à l'écran (sinon `play`
        ferait apparaître une probabilité que la voix n'a pas encore dite)."""
        fam = set(self.get_mobject_family_members())
        return [a for a in anims if a.mobject in fam]

    # ── la cage ─────────────────────────────────────────────────────────────

    def la_cage(self, centre, s=1.0):
        c = cage(3.4, 1.5).scale(s).move_to(centre)
        gk = gardien(0.62 * s).move_to(centre)
        gk.shift(UP * (c.get_bottom()[1] + 0.02 - gk.get_bottom()[1]))
        b = ballon(0.13 * s).move_to(centre + P(0, -1.0 * s))
        gk.save_state()
        return c, gk, b

    def tir(self, gk, b, cote, s=1.0, run_time=0.45, depart=None):
        """Le gardien plonge (−1 gauche, +1 droite) et le ballon file dans ses gants."""
        if depart is not None:
            self.play(Restore(gk), b.animate.move_to(depart).set_opacity(1), run_time=0.2)
        self.play(gk.animate.rotate(-cote * 1.15).shift(RIGHT * cote * 1.05 * s + UP * 0.15 * s),
                  run_time=run_time, rate_func=rate_functions.ease_out_cubic)
        cible = max(gk[4], key=lambda g: cote * g.get_center()[0]).get_center()
        self.play(b.animate.move_to(cible), run_time=0.3, rate_func=rate_functions.ease_in_quad)
        self.play(Flash(cible, color=VERT_OK, line_length=0.15, flash_radius=0.2), run_time=0.3)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Le gardien", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.35))
        badge = echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        centre = P(0, 0.95)
        c, gk, b = self.la_cage(centre)
        depart = b.get_center()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(c), FadeIn(gk), FadeIn(b), run_time=0.8)
        g1 = self.t("à gauche : 30 %", 34).move_to(P(0, -0.65))
        g2 = self.t("à droite : 20 %", 34).move_to(P(0, -1.2))
        self.au_mot("30 %")
        self.tir(gk, b, -1)
        self.play(FadeIn(g1, shift=UP * 0.15), run_time=0.3)
        self.au_mot("20 % à droite")
        self.tir(gk, b, 1, depart=depart)
        self.play(FadeIn(g2, shift=UP * 0.15), run_time=0.3)
        self.au_mot("Il arrête 25 %")
        q = self.grand("25 % ?", font_size=64, color=ORANGE_RETENUE).move_to(P(0, -1.95))
        self.play(Restore(gk), b.animate.move_to(depart), FadeIn(q, scale=0.5), run_time=0.4)
        self.insister(q, 1.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'arbre ──
        self.dire("01-image")
        non = self.grand("Pas si vite !", font_size=52, color=ROUGE_ERREUR).move_to(P(0, -1.3))
        self.play(FadeOut(VGroup(g1, g2), shift=UP * 0.2), q.animate.scale_to_fit_width(1.05).move_to(P(1.62, -0.6)),
                  FadeIn(non, scale=0.6), run_time=0.45)
        self.play(Wiggle(non), run_time=0.5)
        haut = VGroup(c, gk, b)
        s = 0.72
        self.play(FadeOut(non), haut.animate.scale(s).move_to(P(0, 1.12)), run_time=0.4)
        depart = b.get_center()
        gk.save_state()

        A = ArbreP(racine=P(-2.0, -1.25), dx=1.25, dy1=0.6, dy2=0.3, fs=26, lab_fs=28, sw=3,
                   ecart=0.18, haut_lab=0.26)
        self.play(Create(A.rac), *[Create(x) for x in A.b1], FadeIn(A.l1), run_time=0.5)
        self.play(*[Create(x) for x in A.b2], FadeIn(A.l2), run_time=0.5)

        self.au_mot("60 %")
        soixante = self.t("à gauche : 60 %", 30, JAUNE_TITRE).move_to(P(0, 0.1))
        self.play(FadeIn(soixante, scale=0.6), Indicate(A.l1[0], color=JAUNE_TITRE), run_time=0.4)
        self.insister(soixante, 1.2)

        calc = VGroup(self.t("0,6 × 0,3", 32, BLEU_CALCUL), self.t("+", 32),
                      self.t("0,4 × 0,2", 32, BLEU_CALCUL)).arrange(RIGHT, buff=0.12)
        calc.scale_to_fit_width(4.1).move_to(P(0, 0.1))
        self.au_mot("0,6 fois 0,3")
        self.play(FadeOut(soixante, shift=UP * 0.2), FadeIn(A.q1[0], scale=0.5), FadeIn(A.q2[0], scale=0.5),
                  FadeIn(calc[0], shift=UP * 0.1),
                  *self.presents(A.eteindre(garder=(0,), opacite=0.35)), *self.presents(A.allumer(0, sw=6)), run_time=0.4)
        self.tir(gk, b, -1, s=s)
        self.au_mot("plus 0,4 fois 0,2")
        self.play(*self.presents(A.rallumer(sw=3)), run_time=0.2)
        self.play(FadeIn(A.q1[1], scale=0.5), FadeIn(A.q2[2], scale=0.5), FadeIn(calc[1:], shift=UP * 0.1),
                  *self.presents(A.eteindre(garder=(2,), opacite=0.35)), *self.presents(A.allumer(2, sw=6)), run_time=0.4)
        self.tir(gk, b, 1, s=s, depart=depart)

        self.au_mot("0,26")
        self.play(*self.presents(A.rallumer(sw=3)), run_time=0.2)
        self.play(*self.presents(A.eteindre(garder=(0, 2), opacite=0.35)), *self.presents(A.allumer(0, sw=6)), *self.presents(A.allumer(2, sw=6)),
                  run_time=0.3)
        res = self.t("0,26", 46, VERT_OK, largeur=1.1).move_to(P(1.68, -1.45))
        self.play(FadeIn(res, scale=0.5), run_time=0.35)
        self.insister(res, 1.4)
        self.au_mot("pas la moyenne")
        self.play(Create(self.barrer(q, sw=7)), run_time=0.35)
        self.au_mot("c'est l'arbre")
        cadre = SurroundingRectangle(VGroup(A.rac, A.l2), color=JAUNE_TITRE, buff=0.12, corner_radius=0.1)
        self.play(Create(cadre), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.35))
        s = 0.62
        c, gk, b = self.la_cage(P(0, 1.38), s)
        depart = b.get_center()
        self.play(Write(toi), FadeIn(c), FadeIn(gk), FadeIn(b), run_time=0.45)
        self.au_mot("90 %")
        quatre_vingt_dix = self.t("90 % à gauche", 30, ORANGE_RETENUE).move_to(P(0, 0.48))
        self.play(FadeIn(quatre_vingt_dix, scale=0.6), run_time=0.3)
        A = ArbreP(racine=P(-1.95, -0.45), dx=1.15, dy1=0.42, dy2=0.21, fs=22, lab_fs=24, sw=3,
                   probas=("90 %", "0,1", "0,3", "0,7", "0,2", "0,8"), ecart=0.15, haut_lab=0.22)
        # ⛔ PAS D'ÉCART : seule la branche G porte un nombre, « 90 % », dit par la voix
        self.play(FadeIn(VGroup(A.rac, A.b1, A.b2, A.l1, A.l2)), FadeIn(A.q1[0], scale=0.5), run_time=0.4)
        self.insister(A.q1[0], 1.5)
        self.tir(gk, b, -1, s=s, run_time=0.35)
        self.au_mot("il arrêterait combien")
        pa = self.t("combien ?", 32, JAUNE_TITRE, largeur=1.3).move_to(P(1.5, -0.45))
        self.play(FadeIn(pa, shift=LEFT * 0.2), *self.presents(A.allumer(0, sw=5)), *self.presents(A.allumer(2, sw=5)),
                  run_time=0.4)
        self.insister(pa, 1.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=38, color=VERT_OK),
                       self.grand("commentaire !", font_size=38, color=VERT_OK)).arrange(DOWN, buff=0.06)
        appel.move_to(P(0, -1.92))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1)
        poignee = Text("@eleveai974", font_size=24, color=BLEU_CALCUL).move_to(P(0, -2.6))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
