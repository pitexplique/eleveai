# proba_bern_repetition_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Répéter une épreuve » (micros probaI_arbre_deux_epreuves /
# alea_bern_repetition). CEINTURE JAUNE. Il AMUSE : trois lancers de pièce,
# combien de résultats ? 6 ? Non : l'arbre pousse 2 → 4 → 8.
#   · en HAUT la pièce qui saute et retombe, « 6 ? » ;
#   · en BAS, EN MÊME TEMPS : l'arbre des trois lancers qui se dédouble,
#     les compteurs 2, 4, 8 au-dessus de chaque niveau ; « 6 ? » barré ;
#     PPP, PPF… FFF au bout des chemins dits ;
#   · fin : « Et avec 4 lancers ? », « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : seuls les trois chemins dits (PPP, PPF, FFF) sont écrits.
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran : UN SEUL rendu suffit,
# copié sous les deux noms (STMG, 1re). Les deux sous-classes existent quand
# même, identiques.
#
# Voix : manim/voix/stmg-premiere-proba-bern-repetition-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_repetition_short.py ShortProbaBernRepetitionSTMG -o eleveai-maths-stmg-proba-bern-repetition-short --media_dir manim/scripts/stmg/media-bern_repetition
# (ShortProbaBernRepetitionPremiere donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/19-bern-repetition/ et
# manim/sorties/premiere-commun/maths/probabilites/19-bern-repetition/
# (eleveai-maths-premiere-commun-proba-bern-repetition-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bern_repetition import CHEMIN, OR, ArbreTrois, P, barrer, piece, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
CLAIR = "#CBD5E1"


class ShortProbaBernRepetitionBase(Short6e):
    nom_voix = "stmg-premiere-proba-bern-repetition-short"
    ceinture = "jaune"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def lancer(self, p, faces=("Face", "Pile")):
        """La pièce saute en tournant (deux demi-tours), et retombe."""
        haut = p.get_center() + UP * 0.3
        bas = p.get_center()
        for i, f in enumerate(faces):
            self.play(p.animate.move_to(haut if i == 0 else bas).stretch(0.06, 0), run_time=0.15)
            neuf = Text(f, font_size=22, color="#78350F", weight=BOLD).move_to(p[0])
            neuf.stretch(0.06, 0)
            p[1].become(neuf)
            self.play(p.animate.stretch(1 / 0.06, 0), run_time=0.15)
        if not np.allclose(p.get_center(), bas):
            self.play(p.animate.move_to(bas), run_time=0.15)

    def construct(self):
        self.margo_bas()

        # ── 00 : trois lancers ; combien de résultats ? 6 ? ──
        self.dire("00-accroche")
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        pc = piece(0.45).move_to(P(-0.95, 1.3))
        self.play(FadeIn(badge, shift=DOWN * 0.2), FadeIn(pc, scale=0.5), run_time=0.6)
        trois = suite(self.t("3", 40, JAUNE_TITRE), self.t("lancers", 30), buff=0.15).move_to(P(-0.95, 0.5))
        self.play(FadeIn(trois, shift=UP * 0.1), run_time=0.3)
        self.lancer(pc, ("Face", "Pile"))
        self.au_mot("Combien")
        titre = self.grand("Combien de résultats ?", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Write(titre), run_time=0.6)
        self.au_mot("6 ?")
        six = self.grand("6 ?", font_size=80, color=ORANGE_RETENUE).move_to(P(1.15, 1.0))
        self.play(FadeIn(six, scale=2.2), run_time=0.35)
        self.play(Wiggle(six), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'arbre pousse : 2, 4, 8 ──
        self.dire("01-image")
        a = ArbreTrois(dx=1.0, ecart=0.25, couleur=CLAIR, sw=3).move_to(P(-0.25, -1.62))
        for f in a.feuilles:
            f.scale(0.75)
        self.add(a.depart)
        cpt_y = -0.3
        xs = [a.niveaux[i][0].get_center()[0] for i in range(3)]
        self.au_mot("Premier lancer")
        self.lancer(pc, ("Face", "Pile"))
        self.play(*[Create(b) for b in a.niveaux[0]], run_time=0.5)
        self.au_mot("2 branches")
        c2 = self.t("2", 44, JAUNE_TITRE).move_to(P(xs[0], cpt_y))
        self.play(FadeIn(c2, scale=1.8), run_time=0.35)
        self.au_mot("se dédouble")
        self.lancer(pc, ("Face", "Pile"))
        self.play(LaggedStart(*[Create(b) for b in a.niveaux[1]], lag_ratio=0.15), run_time=0.7)
        self.au_mot("4. Puis")
        c4 = self.t("4", 48, JAUNE_TITRE).move_to(P(xs[1], cpt_y))
        self.play(FadeIn(c4, scale=1.8), run_time=0.35)
        self.au_mot("au troisième")
        self.lancer(pc, ("Face", "Pile"))
        self.play(LaggedStart(*[Create(b) for b in a.niveaux[2]], lag_ratio=0.08),
                  LaggedStart(*[FadeIn(f, scale=1.5) for f in a.feuilles], lag_ratio=0.08), run_time=0.8)
        self.au_mot("8 !")
        c8 = self.t("8", 60, VERT_OK).move_to(P(xs[2], cpt_y))
        b6 = barrer(six, sw=9)
        self.play(FadeIn(c8, scale=2.0), Create(b6), six.animate.set_opacity(0.5), run_time=0.45)
        self.insister(c8, 1.5, 0.2)
        self.play(*[Flash(f, color=CHEMIN, line_length=0.1, flash_radius=0.12) for f in a.feuilles], run_time=0.5)
        noms = [(0, "PPP", "Pile pile pile"), (1, "PPF", "pile pile face"), (7, "FFF", "face face face")]
        etiq = []
        for k, nom, mot in noms:
            self.au_mot(mot)
            chemin = [a.niveaux[0][k // 4], a.niveaux[1][k // 2], a.niveaux[2][k]]
            lab = self.t(nom, 22, CHEMIN).next_to(a.feuilles[k], RIGHT, buff=0.12)
            self.play(*[b.animate.set_stroke(CHEMIN, 6) for b in chemin], FadeIn(lab, shift=LEFT * 0.1), run_time=0.4)
            self.play(*[b.animate.set_stroke(CLAIR, 3) for b in chemin], run_time=0.25)
            etiq.append(lab)
        if len(etiq) == 3:
            pts = VGroup(*[Dot(radius=0.035, color=CHEMIN) for _ in range(3)]).arrange(DOWN, buff=0.12)
            pts.move_to(P(etiq[1].get_x(), (etiq[1].get_y() + etiq[2].get_y()) / 2))
            self.play(FadeIn(pts), run_time=0.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : et avec quatre lancers ? ──
        self.dire("02-question")
        self.au_mot("quatre lancers")
        q = self.grand("Et avec 4 lancers ?", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(titre, q), FadeOut(VGroup(pc, trois, six, b6)), run_time=0.5)
        self.insister(q, 1.15, 0.2)
        self.au_mot("combien de chemins")
        cq = self.t("combien de chemins ?", 34, WHITE).move_to(P(0, 1.55))
        self.play(FadeIn(cq, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 0.75))
        self.play(FadeIn(appel, scale=0.7), FadeOut(VGroup(c2, c4, c8)), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaBernRepetitionSTMG(ShortProbaBernRepetitionBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaBernRepetitionPremiere(ShortProbaBernRepetitionBase):
    identite = "Maths 1re — EleveAI"


# 20/10 : le même short pour la 1re SPÉ (ceinture orange).
class ShortProbaBernRepetitionPremiereSpe(ShortProbaBernRepetitionBase):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "orange"
