# proba6_issue_short.py
# EleveAI — Maths 6e — short jumeau de la série « Probabilités », épisode 3 :
# les issues. CEINTURE BLANCHE. Il AMUSE : « cette roue a 3 couleurs…
# combien d'issues ? » — piège, elle a 5 parts !
#   · en HAUT la roue du coach (5 secteurs égaux, couleurs mêlées) qui tourne ;
#   · en BAS, EN MÊME TEMPS : « 3 couleurs » barré, puis 2 · 2 · 1 et
#     « 5 parts » qui se remplissent pendant que les parts s'allument ;
#   · fin : le dé du coach, « plus que 4 », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/6e-proba-issue-short.json (Julie, débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/proba6_issue_short.py ShortProba6Issue -o eleveai-maths-6e-proba-issue-short --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/03-issues/.

import importlib.util
import sys
from pathlib import Path

_chemin = Path(__file__).resolve().parent / "proba6_issue.py"
if "proba6_issue" not in sys.modules:
    _spec = importlib.util.spec_from_file_location("proba6_issue", _chemin)
    _m = importlib.util.module_from_spec(_spec)
    sys.modules["proba6_issue"] = _m
    _spec.loader.exec_module(_m)
_p = sys.modules["proba6_issue"]

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

P, roue5, Toupie, carte_de = _p.P, _p.roue5, _p.Toupie, _p.carte_de
de_coach_qui_roule = _p.de_coach_qui_roule
C_ROUGE, C_BLEU, C_JAUNE, ENCRE = _p.C_ROUGE, _p.C_BLEU, _p.C_JAUNE, _p.ENCRE

LARGEUR_MAX = 4.1
C_ROUE = P(0, 0.45)


class ShortProba6Issue(Short6e):
    nom_voix = "6e-proba-issue-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def pastille(self, c, cote=0.32):
        return RoundedRectangle(width=cote, height=cote, corner_radius=0.06, fill_color=c, fill_opacity=1,
                                stroke_color=ENCRE, stroke_width=2)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        r, d, moyeu, pointe = roue5(C_ROUE, r=1.1, carte=False)
        pointe.set_fill(WHITE)  # sur fond noir, la pointe du coach (foncée) disparaît
        self.add(r, badge)  # l'image est là dès la première seconde
        toupie = Toupie(self, d, C_ROUE, 6.5)
        self.au_mot("3 couleurs")
        pas = VGroup(*[self.pastille(c) for c in (C_ROUGE, C_BLEU, C_JAUNE)]).arrange(RIGHT, buff=0.12)
        l3 = VGroup(pas, self.t("3 couleurs", 36)).arrange(RIGHT, buff=0.2).move_to(P(0, -1.05))
        l3[1][0].set_color(JAUNE_TITRE)
        self.play(FadeIn(l3, shift=UP * 0.2), run_time=0.35)
        self.au_mot("Combien d'issues")
        titre = self.grand("Combien d'issues ?", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.35))
        self.play(Write(titre), run_time=0.6)
        q = self.grand("?", font_size=80, color=ORANGE_RETENUE).move_to(P(0, -1.85))
        self.play(FadeIn(q, scale=0.5), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : le piège ──
        self.dire("01-image")
        toupie.arreter(0.5)
        piege = self.grand("Piège !", font_size=60, color=ROUGE_ERREUR).move_to(P(0, -1.85))
        barre = Line(l3.get_corner(DL) + LEFT * 0.1, l3.get_corner(UR) + RIGHT * 0.1, color=ROUGE_ERREUR,
                     stroke_width=7)
        self.play(ReplacementTransform(q, piege), Create(barre), run_time=0.35)
        self.play(Wiggle(piege), run_time=0.4)
        self.au_mot("5 parts")
        contours = VGroup(*[s.copy().set_fill(opacity=0).set_stroke(JAUNE_TITRE, 7) for s in d])
        cinq = self.grand("5 parts", font_size=50, color=WHITE).move_to(P(0, -1.05))
        cinq[0].set_color(JAUNE_TITRE)
        self.play(FadeOut(VGroup(l3, barre), shift=UP * 0.3), FadeOut(piege),
                  LaggedStart(*[Create(k) for k in contours], lag_ratio=0.2), FadeIn(cinq, scale=0.6), run_time=0.8)
        self.bring_to_front(moyeu, pointe)
        # 2 rouges, 2 bleues, 1 jaune : les parts s'allument, le bas se remplit
        groupes = [("2 rouges", C_ROUGE, [0, 3], "2"), ("2 bleues", C_BLEU, [1, 4], "2"), ("1 jaune", C_JAUNE, [2], "1")]
        cases = VGroup()
        for ex, coul, idx, n in groupes:
            g = VGroup(self.pastille(coul, 0.36), Text(n, font_size=40, color=JAUNE_TITRE)).arrange(RIGHT, buff=0.12)
            cases.add(g)
        cases.arrange(RIGHT, buff=0.45).move_to(P(0, -1.8))
        for (ex, coul, idx, n), g in zip(groupes, cases):
            self.au_mot(ex)
            parts = [d[i] for i in idx]
            self.play(FadeIn(g, shift=UP * 0.15), *[p.animate.scale(1.12, about_point=C_ROUE) for p in parts],
                      run_time=0.3)
            self.play(*[p.animate.scale(1 / 1.12, about_point=C_ROUE) for p in parts], run_time=0.2)
        self.bring_to_front(contours, moyeu, pointe)
        self.au_mot("Les issues")
        iss = self.t("issues = 5 parts !", 36, VERT_OK).move_to(P(0, -2.55))
        self.play(FadeIn(iss, scale=0.6), contours.animate.set_stroke(VERT_OK), run_time=0.4)
        self.insister(iss, 1.2, 0.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=52, color=JAUNE_TITRE).move_to(P(0, 3.35))
        self.play(Write(toi), run_time=0.4)
        self.au_mot("avec un dé")
        roule = de_coach_qui_roule(P(0, 0.8), 1.1, periode=0.1)
        self.add(roule)
        self.au_mot("combien d'issues")
        carte, faces = carte_de(0.8, 0.16)
        carte.move_to(P(0, 0.8))
        roule.clear_updaters()
        self.play(FadeOut(roule, scale=0.6), FadeIn(carte, scale=0.8), run_time=0.4)
        self.au_mot("obtenir plus que 4")
        ev = self.t("« obtenir plus que 4 »", 34, BLEU_CALCUL).move_to(P(0, -0.6))
        self.play(FadeIn(ev, shift=UP * 0.15), Indicate(faces[3], color=JAUNE_TITRE, scale_factor=1.2), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.65))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
