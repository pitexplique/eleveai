# facto_commun_short.py
# EleveAI — Maths 4e — série FACTORISATION, épisode 01, le SHORT ceinture JAUNE
# « Le nombre caché » : 14, 21 et 35 cachent le même nombre. Trois grilles de points de 7 rangées
# (2, 3 et 5 colonnes) : la hauteur commune 7 est le facteur commun, 14 = 7 × 2, 21 = 7 × 3, 35 = 7 × 5.
#   · 1 question-pause (3 s) : 5x + 15, bonne réponse A (5) ;
#   · fin : le facteur commun de 15x + 35, réponse en commentaire (5), fin du 05/11.
# Micro : litteral_facteur_commun.
# Voix : manim/voix/4e-facto-commun-short.json (validée le 11/11, débit −6) ;
# marques : facto_commun_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/facto_commun_short.py FactoCommunShort4e
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/facto_commun_short.py FactoCommunShort4e -o eleveai-maths-4e-facto-commun-short --media_dir manim/scripts/4e/media-facto-01-short
# Sortie : manim/sorties/4e/maths/factorisation/01-commun/eleveai-maths-4e-facto-commun-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402
from distrib_simple_short import DistribSimpleShort4e, horloge  # noqa: E402

FACTEUR = OPERATION  # le facteur commun
GRIS = "#cbd5e1"


def grille(cols, rangs=7, pas=0.19, r=0.055):
    """Une grille de points : 7 rangées (la hauteur commune), cols colonnes."""
    return VGroup(*[Dot(P((c - (cols - 1) / 2) * pas, ((rangs - 1) / 2 - k) * pas), radius=r, color=GRIS)
                    for c in range(cols) for k in range(rangs)])


class FactoCommunShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-facto-commun-short"
    fichier_marques = "facto_commun_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"

    l = DistribSimpleShort4e.l

    def _disposer_q(self, question, choix, phrase):
        """Trois lignes de question ET trois de réponse : cartes à 72 %, la réponse ne descend pas sur Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(0.85).next_to(q, DOWN, buff=0.14).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        ph.arrange(DOWN, buff=0.08).next_to(cartes, DOWN, buff=0.1).set_x(0)
        return tete, q, cartes, pause, rebours, ph
    fin_05_11 = DistribSimpleShort4e.fin_05_11  # la fin du 05/11, telle quelle

    def eq_dans_q(self, i, s, phrase, n=1, fs=None, lettres="xytn", couleur=WHITE):
        """Comme le module commun, mais la ligne ne dépasse jamais 3,8 de large (marge de 3 %)."""
        ref = self.q_q[i]
        e = Eq(s, fs or 34, couleur=couleur, lettres=lettres)
        e.scale_to_fit_height(ref.height)
        if e.width > 3.8:
            e.scale_to_fit_width(3.8)
        e.move_to(ref)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase, n)
        return e

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le nombre caché", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : 14, 21 et 35 ──
        self.dire("00-accroche")
        e0 = self.l("14, 21 et 35.", 1.55, 64)
        self.dire_eq(e0, "14, 21 et 35.", avec=[FadeIn(titre)])
        l1 = self.l("Un même nombre", 0.55, 40, CIEL)
        self.dit(l1, "Un même nombre")
        l2 = self.l("se cache dans les trois.", 0.0, 38, CIEL)
        self.dit(l2, "se cache dans les trois.")
        boite = RoundedRectangle(width=0.9, height=0.9, corner_radius=0.1, color=FACTEUR, stroke_width=5).move_to(P(-1.1, -0.95))
        pt = T("?", 56, FACTEUR, gras=True, audit=False).move_to(boite)
        cadran, aig = horloge(0.36)
        VGroup(cadran, aig).move_to(P(1.1, -0.95))
        aig.shift(cadran[0].get_center() - aig.get_start())
        self.play(Create(boite), FadeIn(pt, scale=1.4), run_time=0.3)
        l3 = self.l("Tu le trouves", -1.85, 36, JAUNE_TITRE)
        self.dit(l3, "Tu le trouves", avec=[FadeIn(cadran, scale=0.6), FadeIn(aig)])
        l4 = self.l("en 5 secondes ?", -2.38, 36, JAUNE_TITRE)
        self.dit(l4, "en 5 secondes ?")
        self.play(Rotate(aig, -TAU, about_point=cadran[0].get_center()), run_time=1.0, rate_func=linear)
        self.insister(pt, 1.3, 0.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : le secret : trois grilles de même hauteur 7 ──
        self.dire("01-secret")
        gs = [grille(c) for c in (2, 3, 5)]
        VGroup(*gs).arrange(RIGHT, buff=0.42, aligned_edge=DOWN).move_to(P(0.2, 1.4))
        acc = Brace(gs[0], LEFT, buff=0.08, color=FACTEUR)
        sept = T("7", 32, FACTEUR, gras=True, audit=False).next_to(acc, LEFT, buff=0.06)
        ys = (0.25, -0.3, -0.85)
        lignes = []
        for (s, ph), y, g in zip([("14 = 7 × 2", "14, c'est 7 fois 2."), ("21 = 7 × 3", "21, c'est 7 fois 3."),
                                  ("35 = 7 × 5", "35, c'est 7 fois 5.")], ys, gs):
            e = self.l(s, y, 40)
            self.dire_eq(e, ph, avec=[FadeIn(g, shift=UP * 0.15)] + ([GrowFromCenter(acc), FadeIn(sept)] if g is gs[0] else []))
            lignes.append(e)
        septs = VGroup(*[e.atomes[2] for e in lignes])
        l5 = self.l("Le 7 est caché", -1.45, 38)
        self.dit(l5, "Le 7 est caché", avec=[septs.animate.set_color(FACTEUR), *[g.animate.set_color(FACTEUR) for g in gs]])
        l5b = self.l("dans les trois :", -1.95, 38)
        self.dit(l5b, "dans les trois :")
        self.play(Circumscribe(septs, color=FACTEUR, buff=0.08), run_time=0.45)
        l6 = self.l("c'est leur facteur commun.", -2.45, 34, JAUNE_TITRE)
        self.dit(l6, "c'est leur facteur commun.")
        self.insister(septs, 1.3, 0.15)
        self.attendre_voix(marge=1.2)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Et avec une lettre ?", "Et avec une lettre ?", lettres="", fs=34)
            sc.eq_dans_q(0, "Dans 5x + 15, quel est", "Dans 5 x plus 15, quel est", lettres="x", fs=34, couleur=JAUNE_TITRE)
            sc.eq_dans_q(0, "le facteur commun ?", "le facteur commun ?", lettres="", fs=34, couleur=JAUNE_TITRE)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : 5.", "Réponse A : 5.", premier=True)
            sc.ph_eq(1, "5x = 5 × x,", "5 x, c'est 5 fois x,", lettres="x")
            sc.ph_eq(2, "et 15 = 5 × 3.", "et 15, c'est 5 fois 3.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Et avec une lettre ?", "Dans 5x + 15, quel est", "le facteur commun ?"],
                            [Eq("5", 34), Eq("15", 34), Eq("x", 34)], 0,
                            ["Réponse A : 5.", "5x = 5 × x,", "et 15 = 5 × 3."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        t = self.l("À toi.", 1.75, 46, CIEL)
        self.dit(t, "À toi.")
        q1 = self.l("Quel est le facteur commun", 0.85, 34)
        self.dit(q1, "Quel est le facteur commun")
        q2 = self.l("de 15x + 35 ?", 0.05, 46, lettres="x")
        self.dire_eq(q2, "de 15 x plus 35 ?")
        self.insister(VGroup(*q2.atomes[1:-1]), 1.1, 0.15)
        boite = RoundedRectangle(width=0.8, height=0.8, corner_radius=0.1, color=FACTEUR, stroke_width=5).move_to(P(0, -1.0))
        pt = T("?", 50, FACTEUR, gras=True, audit=False).move_to(boite)
        self.play(Create(boite), FadeIn(pt, scale=1.4), run_time=0.3)
        self.appel_commentaire(-2.0)

        # ── 03 : la fin du 05/11 ──
        self.fin_05_11("03-abonne", [x for x in self.mobjects if x is not margo])
