# proba_probabilite_vocabulaire_short.py
# EleveAI — Maths CM1 — short jumeau de la série « Probabilités », épisode 1 :
# certain, possible, impossible. CEINTURE BLANCHE. Il AMUSE : on tire les yeux
# fermés dans le sac du coach.
#   · en HAUT le sac (la carte « billes » du coach) : les billes tombent, une
#     bille mystère sort, on la retourne ;
#   · en BAS, EN MÊME TEMPS, les trois cases impossible | possible | certain
#     s'allument, et chaque bille tirée vient se poser sur sa case ;
#   · fin : le dé qui roule, « 7 ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/cm1-proba-vocabulaire-short.json (débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/proba_probabilite_vocabulaire_short.py ShortProbaVocabulaireCM1 -o eleveai-maths-cm1-proba-vocabulaire-short --media_dir manim/scripts/cm1/media
# Puis copier le mp4 dans manim/sorties/cm1/maths/probabilites/01-vocabulaire/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probabilite_vocabulaire import (  # noqa: E402  (pose les chemins)
    COACH, NUIT, P, Sac, bille_coach, bille_mystere, croix, mot, yeux_fermes)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import de_qui_roule  # noqa: E402

SAC_C = P(0, 0.25)
Y_MOTS, Y_POSE = -1.8, -1.2
NOMS = ["impossible", "possible", "certain"]


class ShortProbaVocabulaireCM1(Short6e):
    nom_voix = "cm1-proba-vocabulaire-short"

    def insister(self, mob, k=1.4, run_time=0.2):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def badge(self):
        return echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def cases(self):
        """Les trois cases du bas, éteintes (contour seul) ; allumer = remplir."""
        pleines = VGroup(*[mot(n, 30) for n in NOMS]).arrange(RIGHT, buff=0.12)
        if pleines.width > 4.3:
            pleines.scale_to_fit_width(4.3)
        pleines.move_to(P(0, Y_MOTS))
        eteintes = VGroup()
        for m in pleines:
            e = m.copy()
            e[0].set_fill(opacity=0).set_stroke(m[0].get_fill_color(), 3)
            e[1].set_color(m[0].get_fill_color()).set_opacity(0.55)
            eteintes.add(e)
        return pleines, eteintes

    def allumer(self, i, pleines, eteintes):
        self.play(ReplacementTransform(eteintes[i], pleines[i]), run_time=0.25)
        self.insister(pleines[i], 1.3, 0.15)

    def sortir(self, s, depuis, code=None, run_time=0.5):
        """Une bille mystère sort par le col ; on la retourne (si `code`)."""
        m = bille_mystere(0.3).move_to(depuis)
        self.add(m)
        self.play(m.animate.move_to(s.haut + UP * 0.05), run_time=run_time)
        if code is None:
            return m
        b = bille_coach(code, 0.3).move_to(m)
        self.play(m.animate.stretch(0.02, 0), run_time=0.12)
        self.remove(m)
        b.stretch(0.02, 0)
        self.add(b)
        self.play(b.animate.stretch(50, 0), run_time=0.12)
        return b

    def poser(self, b, i, pleines):
        cible = P(pleines[i].get_center()[0], Y_POSE)
        self.play(b.animate.scale(0.75).move_to(cible), run_time=0.4, path_arc=0.5)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Sans regarder !", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.35))
        badge = self.badge()
        s = Sac(SAC_C, cell=0.85)
        billes = s.billes(["R", "R", "R", "B"], 0.3)
        pleines, eteintes = self.cases()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(s.dessin), FadeIn(eteintes), run_time=0.7)
        self.au_mot("que des billes rouges")
        for b in billes[:3]:
            self.play(FadeIn(b, shift=DOWN * 0.8), run_time=0.2)
        self.au_mot("Je tire sans regarder")
        yeux = yeux_fermes(s.place(4), 0.8, NUIT)
        self.play(Create(yeux), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 01 : rouge, verte, bleue ──
        self.dire("01-image")
        self.au_mot("Rouge ?")
        billes[1].set_opacity(0)
        r = self.sortir(s, s.place(1), "R", run_time=0.35)
        self.au_mot("Certain !")
        self.poser(r, 2, pleines)
        self.allumer(2, pleines, eteintes)
        billes[1].set_opacity(1)

        self.au_mot("Verte ?")
        v = bille_coach("V", 0.3).move_to(s.haut + P(0, 0.05))
        q = Text("?", font_size=56, color=JAUNE_TITRE).next_to(v, RIGHT, buff=0.12)
        self.play(FadeIn(v, scale=0.4), FadeIn(q), run_time=0.25)
        self.au_mot("Impossible !")
        x = croix(v, sw=6)
        self.play(Create(x), FadeOut(q), run_time=0.2)
        self.play(VGroup(v, x).animate.scale(0.75).move_to(P(pleines[0].get_center()[0], Y_POSE)),
                  run_time=0.4, path_arc=-0.5)
        self.allumer(0, pleines, eteintes)

        self.au_mot("j'ajoute 1 bleue")
        bleue = billes[3]
        plus = Text("1", font_size=48, color=COACH["B"]).move_to(s.haut + P(1.0, 0.0))
        depart = bleue.get_center().copy()
        bleue.move_to(s.haut + UP * 0.3)
        self.play(FadeOut(yeux), FadeIn(bleue), FadeIn(plus, scale=0.5), run_time=0.2)
        self.play(bleue.animate.move_to(depart), run_time=0.35, rate_func=rate_functions.ease_in_quad)
        self.au_mot("Bleue, c'est possible")
        self.play(FadeOut(plus), run_time=0.1)
        bleue.set_opacity(0)
        b = self.sortir(s, depart, "B", run_time=0.35)
        self.poser(b, 1, pleines)
        self.allumer(1, pleines, eteintes)
        bleue.set_opacity(1)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.35))
        self.add(badge)
        _, eteintes2 = self.cases()
        self.play(Write(toi), FadeIn(eteintes2), run_time=0.4)
        roule = de_qui_roule(P(-0.95, 1.0), 1.15, periode=0.1)
        self.add(roule)
        self.au_mot("faire 7")
        sept = self.grand("7 ?", font_size=96, color=ORANGE_RETENUE).move_to(P(1.0, 1.0))
        self.play(FadeIn(sept, scale=0.5), run_time=0.3)
        self.insister(sept, 1.3, 0.2)
        for ex, i in [("certain", 2), ("possible", 1), ("impossible", 0)]:
            self.au_mot(ex)
            self.play(Indicate(eteintes2[i], color=WHITE, scale_factor=1.25), run_time=0.35)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=48, color=VERT_OK),
                       self.grand("commentaire !", font_size=48, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -0.45))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
        roule.clear_updaters()
