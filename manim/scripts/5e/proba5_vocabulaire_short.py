# proba5_vocabulaire_short.py
# EleveAI — Maths 5e — short jumeau de la série « Probabilités », épisode 1 :
# le vocabulaire. CEINTURE BLANCHE. Il AMUSE : « MAFATE dans une boîte,
# combien d'issues ? » — 5 lettres différentes… mais 6 papiers !
#   · en HAUT la boîte : les lettres du titre tombent dedans, puis ressortent
#     en papiers, rangés comme le canvas « billes » du coach (3 × 2) ;
#   · en BAS, EN MÊME TEMPS, le compte : 5 lettres différentes (barré), le A
#     surligné deux fois (ambre, comme `surligne` du coach), 6 issues ;
#   · fin : les lettres de CILAOS, la question, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/5e-proba-vocabulaire-short.json (débit −8).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/proba5_vocabulaire_short.py ShortProba5Vocabulaire -o eleveai-maths-5e-proba-vocabulaire-short --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/probabilites/01-vocabulaire/.

import importlib.util
import sys
from pathlib import Path

# ⚠️ les helpers de CET épisode, importés par CHEMIN EXACT (des modules de même
# nom existent dans d'autres dossiers)
_spec = importlib.util.spec_from_file_location(
    "proba5_vocabulaire_5e", Path(__file__).resolve().parent / "proba5_vocabulaire.py")
_m = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_m)  # pose aussi les chemins (manim/, scripts/seconde)
P, papier, surligner, carte_papiers, boite, croix = (_m.P, _m.papier, _m.surligner, _m.carte_papiers,
                                                     _m.boite, _m.croix)
MAFATE, BORD_AMBRE = _m.MAFATE, _m.BORD_AMBRE

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
CILAOS = ["C", "I", "L", "A", "O", "S"]


class ShortProba5Vocabulaire(Short6e):
    nom_voix = "5e-proba-vocabulaire-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def badge(self):
        return echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        badge = self.badge()
        bt = boite(2.2, 1.35).move_to(P(0, 0.6))
        bt[1].set_z_index(3)
        titre = VGroup(*[Text(l, font_size=72, color=JAUNE_TITRE) for l in MAFATE]).arrange(RIGHT, buff=0.08)
        titre.scale_to_fit_width(3.6).move_to(P(0, 3.35))
        self.play(FadeIn(badge, shift=DOWN * 0.2), FadeIn(bt, shift=UP * 0.2),
                  LaggedStart(*[FadeIn(l, shift=DOWN * 0.3) for l in titre], lag_ratio=0.1), run_time=0.7)
        self.au_mot("MAFATE")
        self.insister(titre, 1.15, 0.2)
        self.au_mot("dans une boîte")
        papiers = VGroup(*[papier(l, 0.5, 0.58).move_to(m).set_z_index(1) for l, m in zip(MAFATE, titre)])
        self.play(*[TransformFromCopy(m, p) for m, p in zip(titre, papiers)], run_time=0.35)
        haut = bt[1].get_top() + UP * 0.3
        self.play(LaggedStart(*[p.animate.move_to(haut + RIGHT * (k - 2.5) * 0.25).rotate(0.3 * (k - 2.5))
                                for k, p in enumerate(papiers)], lag_ratio=0.15), run_time=0.8)
        self.play(*[p.animate.shift(DOWN * 0.8) for p in papiers], Wiggle(bt), run_time=0.45)
        self.remove(*papiers)
        self.au_mot("Combien d'issues")
        q = VGroup(self.grand("Combien", font_size=56, color=WHITE),
                   self.grand("d'issues ?", font_size=56, color=ORANGE_RETENUE)).arrange(DOWN, buff=0.12)
        q.move_to(P(0, -1.2))
        self.play(FadeIn(q, scale=0.5), run_time=0.35)
        self.insister(q, 1.15, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : 5 lettres… 6 papiers ──
        self.dire("01-image")
        carte, cp = carte_papiers(MAFATE, 0.95, 0.75, 0.8)
        carte.move_to(P(0, 0.75))
        self.play(FadeOut(q, shift=DOWN * 0.3), FadeOut(bt, shift=DOWN * 0.3), FadeIn(carte[0]), run_time=0.35)
        self.play(LaggedStart(*[FadeIn(p, shift=UP * 0.6, scale=0.5) for p in cp], lag_ratio=0.1), run_time=0.6)
        self.au_mot("5 lettres")
        l5 = self.t("5 lettres différentes…", 30, WHITE).move_to(P(0, -0.75))
        l5[0].set_color(JAUNE_TITRE)
        rang = VGroup(*[papier(l, 0.5, 0.56) for l in ["M", "A", "F", "T", "E"]]).arrange(RIGHT, buff=0.1)
        rang.move_to(P(0, -1.4))
        self.play(FadeIn(l5, shift=UP * 0.15), LaggedStart(*[FadeIn(p, scale=0.5) for p in rang], lag_ratio=0.1),
                  run_time=0.6)
        self.au_mot("mais 6 papiers")
        l6 = self.t("mais 6 papiers !", 38, JAUNE_TITRE).move_to(P(0, -2.15))
        self.play(FadeIn(l6, scale=0.6), rang.animate.set_opacity(0.4), run_time=0.4)
        self.insister(l6, 1.2, 0.2)
        self.au_mot("Le A est là")
        self.play(*surligner(cp[1]), *surligner(cp[3]), run_time=0.3)
        deux = VGroup(cp[1], cp[3])
        self.play(*[p.animate.scale(1.45) for p in deux], run_time=0.25)
        self.play(*[p.animate.scale(1 / 1.45) for p in deux], run_time=0.25)
        self.au_mot("6 issues")
        six = self.grand("6 issues !", font_size=66, color=VERT_OK).move_to(P(0, -1.35))
        self.play(FadeOut(VGroup(l5, rang, l6), shift=DOWN * 0.2),
                  FadeIn(six, scale=0.5), run_time=0.4)
        cadre = SurroundingRectangle(carte, color=VERT_OK, buff=0.08, stroke_width=6)
        self.play(Create(cadre), run_time=0.3)
        self.insister(six, 1.2, 0.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.4))
        bt2 = boite(2.2, 1.35).move_to(P(0, 0.6))
        self.play(Write(toi), FadeIn(bt2, shift=UP * 0.2), run_time=0.4)
        self.play(Wiggle(bt2), run_time=0.6)
        self.au_mot("CILAOS")
        self.play(FadeOut(bt2, shift=DOWN * 0.3), run_time=0.25)
        carte2, cp2 = carte_papiers(CILAOS, 0.95, 0.75, 0.8)
        carte2.move_to(P(0, 0.75))
        self.play(FadeIn(carte2[0]), LaggedStart(*[FadeIn(p, shift=DOWN * 0.5) for p in cp2], lag_ratio=0.1),
                  run_time=0.7)
        self.au_mot("combien de chances")
        c1 = self.t("Combien de chances", 32).move_to(P(0, -0.65))
        self.play(FadeIn(c1, shift=UP * 0.15), run_time=0.3)
        self.au_mot("tirer une voyelle")
        c2 = self.t("de tirer une voyelle ?", 32, ORANGE_RETENUE).move_to(P(0, -1.1))
        self.play(FadeIn(c2, shift=UP * 0.15), run_time=0.3)
        self.play(Wiggle(carte2), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.95))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=26, color=BLEU_CALCUL).move_to(P(0, -2.75))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
