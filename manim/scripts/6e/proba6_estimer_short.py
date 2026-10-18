# proba6_estimer_short.py
# EleveAI — Maths 6e — short jumeau de la série « Probabilités », épisode 4 :
# calculer une probabilité. CEINTURE JAUNE. Il AMUSE : « il faut un 6 pour
# sortir… tes chances : 6 sur 1 ? » — NON !
#   · en HAUT le dé (il roule, puis la carte des 6 faces du coach) ;
#   · en BAS, EN MÊME TEMPS, la fraction se construit : la face 6 MONTE
#     au-dessus de la barre, les 6 faces DESCENDENT dessous → 1 sur 6, qui se
#     pose ensuite sur l'échelle (impossible → certain) ;
#   · fin : 5 ou 6 ? et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/6e-proba-estimer-short.json (Julie, débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/proba6_estimer_short.py ShortProba6Estimer -o eleveai-maths-6e-proba-estimer-short --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/04-calculer/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba6_estimer import (P, barre, carte_de, de_coach, de_coach_qui_roule, echelle,  # noqa: E402
                            fraction, nombre, surligner)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
Y_CARTE = 0.85
XD, XN = -0.7, 1.7            # la fraction de dés, la fraction écrite
YH, YBARRE, YB = -0.35, -0.85, -1.35
PAS, COTE = 0.42, 0.36
X0, X1, YE = -1.75, 1.75, -1.65  # l'échelle (fin de l'écran 01)


class ShortProba6Estimer(Short6e):
    nom_voix = "6e-proba-estimer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return VGroup(Line(mob.get_corner(UL) + P(-0.08, 0.08), mob.get_corner(DR) + P(0.08, -0.08)),
                      Line(mob.get_corner(UR) + P(0.08, 0.08), mob.get_corner(DL) + P(-0.08, -0.08))
                      ).set_stroke(color, sw)

    def voler(self, sources, cibles, cote, run_time=0.5, lag=0.1):
        copies = VGroup(*[s.copy() for s in sources])
        anims = []
        for c, (x, y) in zip(copies, cibles):
            c.generate_target()
            c.target.scale_to_fit_width(cote).move_to(P(x, y))
            anims.append(MoveToTarget(c, path_arc=-0.5))
        self.play(LaggedStart(*anims, lag_ratio=lag), run_time=run_time)
        return copies

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Il faut un 6 !", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        roule = de_coach_qui_roule(P(0, Y_CARTE), 1.4, periode=0.12)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.6)
        self.add(roule)
        self.au_mot("Tes chances")
        ch = self.t("tes chances :", 34).move_to(P(0, -0.3))
        self.play(FadeIn(ch, shift=UP * 0.2), run_time=0.3)
        self.au_mot("6 sur 1")
        faux = fraction("6", "1", 72, ORANGE_RETENUE).move_to(P(-0.3, -1.65))
        q = self.t("?", 80, ORANGE_RETENUE).next_to(faux, RIGHT, buff=0.3)
        self.play(FadeIn(faux, scale=0.5), FadeIn(q, scale=0.5), run_time=0.35)
        self.insister(VGroup(faux, q), 1.25, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : non ! la fraction se construit ──
        self.dire("01-image")
        croix = self.barrer(faux)
        non = self.grand("Non !", font_size=54, color=ROUGE_ERREUR).move_to(P(0, -0.2))
        self.play(Create(croix), FadeOut(ch), FadeIn(non, scale=0.5), run_time=0.35)
        roule.clear_updaters()
        carte, faces = carte_de(0.5, 0.14)
        carte.move_to(P(0, Y_CARTE))
        self.play(FadeOut(VGroup(faux, croix, q), shift=DOWN * 0.6), FadeOut(roule), FadeIn(carte, scale=0.8),
                  run_time=0.4)

        self.au_mot("1 face gagnante")
        self.play(FadeOut(non), faces[5].animate.scale(1.3), run_time=0.2)
        surligner(faces[5])
        self.play(faces[5].animate.scale(1 / 1.3), run_time=0.15)
        haut = self.voler([faces[5]], [(XD, YH)], COTE + 0.06, 0.45)
        n1 = nombre("1", 60, VERT_OK).move_to(P(XN, YH))
        self.play(FadeIn(n1, scale=0.5), run_time=0.25)

        self.au_mot("6 faces en tout")
        bas = self.voler(list(faces), [(XD + (i - 2.5) * PAS, YB) for i in range(6)], COTE, 0.6, 0.08)
        n6 = nombre("6", 60, BLEU_CALCUL).move_to(P(XN, YB))
        self.play(FadeIn(n6, scale=0.5), run_time=0.25)

        self.au_mot("1 sur 6")
        b_des = barre(6 * PAS + 0.15, WHITE, 5).move_to(P(XD, YBARRE))
        egal = self.t("=", 46).move_to(P(1.03, YBARRE))
        b_num = barre(0.55, WHITE, 5).move_to(P(XN, YBARRE))
        self.play(GrowFromCenter(b_des), GrowFromCenter(b_num), FadeIn(egal), run_time=0.35)
        fr = VGroup(n1, b_num, n6)

        self.au_mot("Les favorables en haut")
        self.insister(VGroup(haut, n1), 1.5, 0.2)
        self.au_mot("toutes les issues en bas")
        self.insister(VGroup(bas, n6), 1.15, 0.2)

        # 1/6 descend se poser sur l'échelle
        ech = echelle(X0, X1, YE, 9, 0.17)
        imp = self.t("impossible", 20, ROUGE_ERREUR).next_to(P(X0, YE - 0.17), DOWN, buff=0.08)
        imp.align_to(P(-2.1, 0), LEFT)
        cer = self.t("certain", 20, VERT_OK).next_to(P(X1, YE - 0.17), DOWN, buff=0.08)
        cer.align_to(P(2.1, 0), RIGHT)
        self.play(FadeOut(VGroup(b_des, egal, bas, haut)), run_time=0.3)
        self.play(Create(ech), FadeIn(imp), FadeIn(cer), run_time=0.4)
        x = X0 + (X1 - X0) / 6
        self.play(fr.animate.scale_to_fit_height(0.85).move_to(P(x, YE + 0.25 + 0.45)), run_time=0.6)
        pt = Dot(P(x, YE), radius=0.1, color=JAUNE_TITRE)
        self.play(GrowFromCenter(pt), Flash(pt, color=JAUNE_TITRE), run_time=0.35)
        self.attendre_voix(marge=0.4)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        carte, faces = carte_de(0.5, 0.14)
        carte.move_to(P(0, Y_CARTE))
        self.play(Write(toi), FadeIn(carte, scale=0.8), run_time=0.45)
        self.au_mot("5 ou 6")
        for f in (5, 6):
            self.play(faces[f - 1].animate.scale(1.3), run_time=0.15)
            surligner(faces[f - 1])
            self.play(faces[f - 1].animate.scale(1 / 1.3), run_time=0.12)
        cinq6 = self.t("5 ou 6", 44, JAUNE_TITRE)
        frq = fraction("?", "?", 50, ORANGE_RETENUE)
        ligne = VGroup(cinq6, self.t("→", 40), frq).arrange(RIGHT, buff=0.3).move_to(P(0, -0.45))
        self.play(FadeIn(ligne, shift=UP * 0.2), run_time=0.35)
        self.insister(frq, 1.3, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=46, color=VERT_OK),
                       self.grand("commentaire !", font_size=46, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.55))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=28, color=BLEU_CALCUL).move_to(P(0, -2.45))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
