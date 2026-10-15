# proba_frequence_comparer_short.py
# EleveAI — Maths 4e — short jumeau des probabilités, épisode 10 : comparer.
# CEINTURE JAUNE. Il AMUSE : le pari « 1 chance sur 2, donc 5 piles sur 10 ? ».
# En HAUT 10 pièces qui TOMBENT une à une (7 piles !) ; en BAS, EN MÊME TEMPS,
# le pari « 5 piles ? », puis « 7 piles ! », « 50 % », « trop peu ».
# Fin : lance une pièce 10 fois, la question en commentaire.
# Voix : manim/voix/4e-proba-frequence-comparer-short.json (débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/proba_frequence_comparer_short.py ProbaFrequenceComparer4eShort -o eleveai-maths-4e-proba-frequence-comparer-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/10-frequence-comparer/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_frequence_calculer import P, piece, piece_lancee  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

SERIE = ["P", "F", "P", "P", "P", "F", "P", "P", "F", "P"]  # 7 piles


class ProbaFrequenceComparer4eShort(Short6e):
    nom_voix = "4e-proba-frequence-comparer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def fraction(self, num, den, font_size=34, color=WHITE):
        n = Text(str(num), font_size=font_size, color=color)
        d = Text(str(den), font_size=font_size, color=color)
        larg = max(n.width, d.width) + 0.14
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=4)
        return VGroup(n, barre, d).arrange(DOWN, buff=0.08)

    def insister(self, mob, k=1.4, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def chute_piece(self, face, depart, arrivee, r=0.32):
        """La pièce tombe en tournant (aplatie puis pleine) et rebondit sur sa place."""
        modele = piece(face, r, court=True)
        p = modele.copy().move_to(depart)

        def maj(m, a):
            b = rate_functions.ease_out_bounce(a)
            m.become(modele.copy())
            m.stretch(max(abs(np.cos(a * 3 * PI)), 0.08), 1)
            m.move_to(depart + (arrivee - depart) * b)

        return p, UpdateFromAlphaFunc(p, maj)

    def construct(self):
        self.margo_bas()

        # ── 00 : le pari ──
        self.dire("00-accroche")
        titre = self.grand("Pile ou face", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        pc = piece_lancee(P(0, 0.75), 0.55, 0.8, periode=0.7)
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.6)
        self.add(pc)
        self.au_mot("1 chance sur 2")
        l1 = VGroup(self.t("P(pile) =", 36), self.fraction(1, 2, 44, JAUNE_TITRE)).arrange(RIGHT, buff=0.2)
        l1.move_to(P(0, -0.5))
        self.play(FadeIn(l1, scale=1.3), run_time=0.4)
        self.au_mot("sur 10 lancers")
        l2 = VGroup(self.t("10", 40, JAUNE_TITRE), self.t("lancers", 34)).arrange(RIGHT, buff=0.15)
        l2.move_to(P(0, -1.35))
        self.play(FadeIn(l2, shift=UP * 0.2), run_time=0.35)
        self.au_mot("5 piles")
        l3 = VGroup(self.t("5", 52, ORANGE_RETENUE), self.t("piles, c'est sûr ?", 36, ORANGE_RETENUE)
                    ).arrange(RIGHT, buff=0.15)
        l3.scale_to_fit_width(3.9).move_to(P(0, -2.1))
        self.play(FadeIn(l3, scale=1.4), run_time=0.4)
        self.insister(l3[0], 1.4, 0.25)
        self.attendre_voix(marge=0.1)
        pc.clear_updaters()

        # ── 01 : 10 pièces qui tombent une à une ──
        self.dire("01-image")
        self.play(FadeOut(pc), FadeOut(VGroup(l1, l2)), l3.animate.scale(0.6).move_to(P(0, -0.25)).set_opacity(0.5),
                  run_time=0.3)
        places = [P(-1.6 + (i % 5) * 0.8, 1.45 - (i // 5) * 0.85) for i in range(10)]
        pieces = VGroup()
        numero = None
        for i, face in enumerate(SERIE):
            p, anim = self.chute_piece(face, P(places[i][0], 1.8), places[i])
            self.add(p)
            n = self.t(str(i + 1), 64, BLEU_CALCUL).move_to(P(0, -1.0))
            if numero is None:
                self.play(anim, FadeIn(n), run_time=0.24)
            else:
                self.play(anim, FadeOut(numero, run_time=0.05), FadeIn(n), run_time=0.24)
            numero = n
            pieces.add(p)

        self.au_mot("10 lancers")
        self.play(FadeOut(numero), run_time=0.2)
        self.au_mot("7 piles")
        piles = [pieces[i] for i, f in enumerate(SERIE) if f == "P"]
        sept = VGroup(self.t("7", 64, JAUNE_TITRE), self.t("piles !", 46, JAUNE_TITRE)).arrange(RIGHT, buff=0.15)
        sept.move_to(P(0, -1.0))
        self.play(FadeIn(sept, scale=1.6), *[p.animate.scale(1.25) for p in piles], run_time=0.4)
        self.play(*[p.animate.scale(1 / 1.25) for p in piles], run_time=0.25)
        barre = Line(l3.get_corner(DL), l3.get_corner(UR), color=ROUGE_ERREUR, stroke_width=5)
        self.play(Create(barre), l3.animate.set_opacity(1).set_color(ROUGE_ERREUR), run_time=0.3)

        self.au_mot("50 %")
        l4 = VGroup(self.t("probabilité :", 30, BLEU_CALCUL), self.t("50 %", 40, BLEU_CALCUL)).arrange(RIGHT, buff=0.15)
        l4.move_to(P(0, -1.75))
        self.play(FadeIn(l4, shift=UP * 0.15), run_time=0.35)
        self.au_mot("10 lancers, c'est trop peu")
        l5 = VGroup(self.t("10", 36, ORANGE_RETENUE), self.t("lancers : trop peu", 30, ORANGE_RETENUE)
                    ).arrange(RIGHT, buff=0.12)
        l5.scale_to_fit_width(3.7).move_to(P(0, -2.3))
        self.play(FadeIn(l5, shift=UP * 0.15), run_time=0.35)
        self.au_mot("Le hasard fait des écarts")
        self.play(FadeOut(VGroup(l3, barre)), run_time=0.2)
        ecarts = self.t("Le hasard fait des écarts !", 30, VERT_OK).move_to(P(0, -0.25))
        self.play(FadeIn(ecarts, scale=1.3), Wiggle(pieces), run_time=0.8)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.3))), run_time=0.5)
        pc2 = piece_lancee(P(0, 1.85), 0.55, 0.6, periode=0.7)
        self.add(pc2)
        self.au_mot("10 fois")
        l10 = VGroup(self.t("10", 46, JAUNE_TITRE), self.t("lancers", 36)).arrange(RIGHT, buff=0.15).move_to(P(0, 0.75))
        self.play(FadeIn(l10, scale=1.4), run_time=0.4)
        self.au_mot("Combien de piles")
        q = VGroup(self.t("?", 60, BLEU_CALCUL), self.t("piles", 40, BLEU_CALCUL)).arrange(RIGHT, buff=0.15)
        q.move_to(P(0, -0.2))
        self.play(FadeIn(q, scale=0.5), run_time=0.35)
        self.insister(q, 1.3, 0.25)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=48, color=VERT_OK),
                       self.grand("commentaire !", font_size=48, color=VERT_OK)).arrange(DOWN, buff=0.12)
        if appel.width > config.frame_width - 0.5:
            appel.scale_to_fit_width(config.frame_width - 0.5)
        appel.move_to(P(0, -1.5))
        poignee = self.grand("@eleveai974", font_size=32, color=BLEU_CALCUL).move_to(P(0, -2.45))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
        pc2.clear_updaters()
