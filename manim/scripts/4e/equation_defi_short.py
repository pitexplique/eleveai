# equation_defi_short.py
# EleveAI — Maths 4e — série ÉQUATIONS, épisode 07, le SHORT ceinture BLANCHE
# « Léo a juste et il a tort » : EN HAUT Léo, sa feuille (coche, puis grande croix) et le
# dé du hasard ; EN BAS, au même instant, le calcul qui fait basculer le verdict.
#   · 1 question-pause (3 s) : a + 2 = 11, donc a = 13 ;
#   · fin : 3x + 4 = x + 10, que vaut x ? réponse en commentaire, fin standard.
# Micro : equation_defi. Centres : jeux-defis (ceux de l'épisode).
#
# Voix : manim/voix/4e-equation-defi-short.json (validée, débit −6) ;
# marques : equation_defi_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/equation_defi_short.py EquationDefiShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/equation_defi_short.py EquationDefiShort -o eleveai-maths-4e-equation-defi-short --media_dir manim/scripts/4e/media-eq-07-short
# Sortie : manim/sorties/4e/maths/equations/07-defi/eleveai-maths-4e-equation-defi-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_defi import E, De, Feuille, _OutilsDefi, coche_x, encre  # noqa: E402


class EquationDefiShort(_OutilsDefi, ShortEq):
    nom_voix = "4e-equation-defi-short"
    fichier_marques = "equation_defi_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    def lg(self, s, y, fs=30, couleur=WHITE, lettres=""):
        e = E(s, fs, couleur, lettres=lettres)
        if e.width > 3.9:
            e.scale_to_fit_width(3.9)
        return e.move_to(P(0, y))

    def _disposer_q(self, question, choix, phrase):
        """Les cartes reprennent toute la largeur : Ti-Margo est loin, le texte reste grand."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(1 / 0.85).next_to(q, DOWN, buff=0.18).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.12).set_x(0)
        ph.next_to(cartes, DOWN, buff=0.12).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Léo a juste et il a tort", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche, la grande surprise ──
        self.dire("00-accroche")
        leo = personne(peau="#8d5524", tenue="#2563eb", cheveux="#4b2e16", s=0.62).move_to(P(-1.55, 1.45))
        f = Feuille(2.0, 1.6, pas=0.4).move_to(P(0.35, 1.45))
        l1 = self.lg("Léo a la bonne réponse.", 0.2, 32, VERT_OK)
        ok = self.coche(VERT_OK, 0.36).move_to(f.get_center() + P(-0.42, 0))
        self.dire_eq(l1, "Léo a la bonne réponse.", echelle=1.0, rt=0.12, avec=[FadeIn(titre), FadeIn(leo, shift=UP * 0.2), FadeIn(f)])
        self.play(Create(ok), run_time=0.18)
        l2 = self.lg("Et pourtant,", -0.5, 34)
        self.dire_eq(l2, "Et pourtant,", echelle=1.0, rt=0.12)
        l3 = self.lg("il a tort.", -1.25, 66, PIEGE)
        no = coche_x(f, k=0.36).shift(P(0.48, 0))
        self.dire_eq(l3, "il a tort.", echelle=1.0, rt=0.12)
        self.play(FadeIn(no, scale=2.4), Flash(f, color=PIEGE, line_length=0.3, flash_radius=1.25), run_time=0.3)
        self.insister(l3.atomes[2], 1.3, 0.16)
        l4 = self.lg("Comment est-ce possible ?", -2.2, 32, JAUNE_TITRE)
        self.dire_eq(l4, "Comment est-ce possible ?", echelle=1.0, rt=0.12)
        self.attendre_voix(marge=0.1)

        # ── 01 : le calcul de Léo ──
        self.dire("01-leo")
        e = self.lg("2x + 3 = 11", 0.17, 46, lettres="x")
        self.dire_eq(e, "2 x plus 3 égale 11", avec=[FadeOut(VGroup(l1, l2, l3, l4, ok, no))])
        s = self.lg("Léo écrit : x = 4,", -0.4, 34, lettres="x")
        ink = encre("x = 4", 30).sans_audit().move_to(f.get_center() + P(-0.2, 0.36))
        self.dire_eq(s, "Léo écrit : x égale 4,", echelle=1.0, rt=0.12)
        ok2 = self.coche(VERT_OK, 0.17).next_to(ink, RIGHT, buff=0.1)
        self.play(FadeIn(ink), Create(ok2), run_time=0.15)
        c = self.lg("car 2 + 3 + 4 = 9", -1.0, 36)
        ink2 = encre("2 + 3 + 4 = 9", 24, lettres="").sans_audit().scale_to_fit_width(1.35).move_to(f.get_center() + P(0.2, -0.36))
        self.dire_eq(c, "car 2 plus 3 plus 4 égale 9")
        self.play(FadeIn(ink2), run_time=0.1)
        self.insister(c.atomes[-1], 1.3, 0.12)
        m = self.lg("Mais on voulait 11, pas 9 !", -1.6, 34, PIEGE)
        no2 = self.barrer(ink2, PIEGE, 5)
        self.dire_eq(m, "Mais on voulait 11, pas 9 !", echelle=1.0, rt=0.12)
        self.play(Create(no2), run_time=0.15)
        z = self.lg("Il est tombé juste", -2.15, 34, JAUNE_TITRE)
        z2 = self.lg("par hasard.", -2.65, 34, JAUNE_TITRE)
        de = De(1, 0.56).move_to(P(1.8, 1.45))
        self.dire_eq(z, "Il est tombé juste", echelle=1.0, rt=0.12)
        self.dire_eq(z2, "par hasard.", echelle=1.0, rt=0.12, avec=[FadeIn(de, scale=0.5)])
        de = self.rouler(de, (6, 2, 5, 4))
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "a + 2 = 11, donc a = 13.", "a plus 2 égale 11, donc a égale 13.", fs=36, lettres="a")
            sc.eq_dans_q(0, "Où est l'erreur ?", "Où est l'erreur ?", lettres="", fs=36)

        def apres(sc):
            sc.ph_eq(0, "Réponse A :", "Réponse A :", premier=True)
            sc.ph_eq(1, "on soustrait 2, et a = 9.", "on soustrait 2, et a égale 9.", lettres="a")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["a + 2 = 11, donc a = 13.", "Où est l'erreur ?"],
                            [E("soustraire 2", 28, lettres=""), E("multiplier par 2", 28, lettres=""), E("pas d'erreur", 28, lettres="")], 0,
                            ["Réponse A :", "on soustrait 2, et a = 9."], avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        leo2 = leo.copy().move_to(P(-1.2, 1.5))
        f2 = Feuille(2.0, 1.45, pas=0.36).move_to(P(0.75, 1.5))
        qm = T("?", 72, OPERATION, audit=False, gras=True).move_to(f2)
        l1 = self.lg("Sauras-tu faire", 0.45, 36, CIEL)
        l1b = self.lg("mieux que Léo ?", -0.08, 36, CIEL)
        self.dire_eq(l1, "Sauras-tu faire", echelle=1.0, rt=0.12, avec=[FadeIn(leo2), FadeIn(f2), FadeIn(qm)])
        self.dire_eq(l1b, "mieux que Léo ?", echelle=1.0, rt=0.12)
        e2 = self.lg("3x + 4 = x + 10", -0.75, 46, lettres="x")
        self.dire_eq(e2, "3 x plus 4 égale x plus 10")
        self.play(e2.egal.animate.set_color(EGAL), run_time=0.08)
        q2 = self.lg("Que vaut x ?", -1.45, 42, JAUNE_TITRE, lettres="x")
        self.dire_eq(q2, "Que vaut x ?", echelle=1.0, rt=0.13)
        self.appel_commentaire(-2.25)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])
