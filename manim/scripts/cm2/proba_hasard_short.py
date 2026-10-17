# proba_hasard_short.py
# EleveAI — Maths CM2 — short jumeau de la série « Probabilités », épisode 2 :
# hasard ou pas hasard ? CEINTURE BLANCHE. Il AMUSE : « pile, pile, pile,
# pile… le prochain, c'est sûrement face ? »
#   · en HAUT la pièce qui tourne et retombe ;
#   · en BAS, EN MÊME TEMPS, la série des résultats qui se remplit, puis la
#     barre PILE | FACE et « 1 chance sur 2 » ;
#   · fin : 10 piles de suite, pile ou face ?, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/cm2-proba-hasard-short.json (Julie, débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm2/proba_hasard_short.py ShortProbaHasardCM2 -o eleveai-maths-cm2-proba-hasard-short --media_dir manim/scripts/cm2/media
# Puis copier le mp4 dans manim/sorties/cm2/maths/probabilites/02-hasard/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_hasard import P, piece, piece_qui_tourne  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
HAUT = P(0, 0.85)


class ShortProbaHasardCM2(Short6e):
    nom_voix = "cm2-proba-hasard-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def badge(self):
        return echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        # ⛔ 17/10 « pas d'écart » : le titre se construit mot à mot, quand la voix dit « pile »
        titre = VGroup(*[Text(m, font_size=44, color=JAUNE_TITRE) for m in ["Pile,", "pile,", "pile,", "pile."]])
        titre.arrange(RIGHT, buff=0.18)
        if titre.width > LARGEUR_MAX:
            titre.scale_to_fit_width(LARGEUR_MAX)
        titre.move_to(P(0, 3.4))
        badge = self.badge()
        tourne = piece_qui_tourne(HAUT, 0.62)
        self.add(tourne, badge)
        xs = [-1.6, -0.8, 0.0, 0.8, 1.6]
        y_serie = -0.8
        serie = VGroup()
        for ex, x in zip(["Pile", "pile, pile, pile.", "pile, pile.", "pile. Le"], xs):
            self.au_mot(ex)
            haut = piece("PILE", 0.6).move_to(HAUT)
            self.remove(tourne)
            self.add(haut)
            bas = piece("PILE", 0.34).move_to(P(x, y_serie))
            self.play(TransformFromCopy(haut, bas), FadeIn(titre[len(serie)], scale=0.6), run_time=0.3)
            serie.add(bas)
            self.remove(haut)
            self.add(tourne)
        self.au_mot("Le prochain")
        trou = Circle(radius=0.34, stroke_color=ORANGE_RETENUE, stroke_width=4).move_to(P(xs[4], y_serie))
        qm = self.t("?", 36, ORANGE_RETENUE).move_to(trou)
        self.play(Create(trou), FadeIn(qm, scale=0.5), run_time=0.35)
        self.au_mot("sûrement face")
        sur = self.grand("sûrement FACE ?", font_size=44, color=ORANGE_RETENUE).move_to(P(0, -1.8))
        self.play(FadeIn(sur, scale=0.5), run_time=0.35)
        self.insister(sur, 1.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : raté ! ──
        self.dire("01-image")
        self.au_mot("Raté")
        self.remove(tourne)
        tombe = piece("PILE", 0.6).move_to(HAUT)
        self.add(tombe)
        rate = self.grand("Raté !", font_size=60, color=ROUGE_ERREUR).move_to(P(0, -1.8))
        cinq = piece("PILE", 0.34).move_to(P(xs[4], y_serie))
        self.play(FadeOut(VGroup(trou, qm)), TransformFromCopy(tombe, cinq), ReplacementTransform(sur, rate),
                  run_time=0.45)
        serie.add(cinq)
        self.play(Wiggle(rate), run_time=0.5)
        self.au_mot("ne se souvient de rien")
        self.remove(tombe)
        self.add(tourne)
        self.play(serie.animate.set_opacity(0.12), FadeOut(rate, shift=DOWN * 0.2), run_time=0.9)
        self.au_mot("Pile ou face")
        g = Rectangle(width=1.8, height=0.75, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_color=WHITE,
                      stroke_width=3)
        d = g.copy().set_fill(ORANGE_RETENUE)
        barre = VGroup(g, d).arrange(RIGHT, buff=0).move_to(P(0, -0.8))
        mots = VGroup(Text("PILE", font_size=30, color=BLACK, weight=BOLD).move_to(g),
                      Text("FACE", font_size=30, color=BLACK, weight=BOLD).move_to(d))
        self.play(FadeOut(serie), FadeIn(barre), FadeIn(mots), run_time=0.4)
        self.au_mot("toujours 1 chance sur 2")
        une = self.grand("1 chance sur 2", font_size=50, color=JAUNE_TITRE).move_to(P(0, -1.85))
        self.play(FadeIn(une, scale=0.6), run_time=0.35)
        self.insister(une[0], 1.6)
        self.attendre_voix(marge=0.2)
        tourne.clear_updaters()

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Write(toi), run_time=0.4)
        self.au_mot("10 piles")
        dix = VGroup(*[piece("PILE", 0.24) for _ in range(10)]).arrange_in_grid(rows=2, cols=5, buff=0.16)
        dix.move_to(P(0, 1.2))
        self.play(LaggedStart(*[FadeIn(p, scale=0.4) for p in dix], lag_ratio=0.12), run_time=0.9)
        lbl = self.t("10 piles de suite", 34, WHITE).move_to(P(0, 0.3))
        self.play(FadeIn(lbl, shift=UP * 0.15), run_time=0.3)
        self.au_mot("tu paries")
        pp = piece("PILE", 0.42).move_to(P(-1.1, -0.65))
        pf = piece("FACE", 0.42).move_to(P(1.1, -0.65))
        ou = self.t("ou", 32).move_to(P(0, -0.65))
        self.play(FadeIn(pp, scale=0.5), FadeIn(ou), FadeIn(pf, scale=0.5), run_time=0.4)
        self.insister(VGroup(pp, pf), 1.15)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.75))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1)
        self.attendre_voix(marge=1.5)
