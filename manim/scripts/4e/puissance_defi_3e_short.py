# puissance_defi_3e_short.py
# EleveAI — Maths 3e — série PUISSANCES, épisode 12 « défi », le SHORT
# ceinture BLANCHE « Le jeu des paires » : 2³ × 3³ = 6³, ça a l'air faux, et c'est juste.
#   · EN HAUT, l'image : les facteurs 2 et 3 sont des billes de deux couleurs,
#     qui se groupent par paires (2 × 3 = 6, trois fois) ;
#   · EN BAS, au même instant : 8 × 27 = 216 ; 6³ = 216 ;
#   · 1 question-pause (3 s) : 2⁵ × 5⁵ → paires (2, 5) cinq fois : 10⁵ = 100 000 ;
#   · fin : 4³ × 5³, réponse en commentaire, puis la fin standard.
# Micro du coach : 3e entier_puissance_defi. Centres d'intérêt : jeux-defis, sciences.
#
# Voix : manim/voix/3e-puissance-defi-short.json (validée), débit −6 ; WAV :
# public/sons/3e-puissance-defi-short/ ; marques : puissance_defi_3e_short_marques.json
# (marques_dump.ps1, puis conversion PAR PAQUETS).
# Outils importés sans modification : 6e/prop_commun.py, puissance_calcul.py.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/puissance_defi_3e_short.py PuissanceDefi3eShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/puissance_defi_3e_short.py PuissanceDefi3eShort -o eleveai-maths-3e-puissance-defi-short --media_dir manim/scripts/4e/media-puiss-12-short
# Sortie : manim/sorties/3e/maths/puissances/12-defi/eleveai-maths-3e-puissance-defi-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "6e"))
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from puissance_calcul import (OutilsCalcul, T, puiss, suite, ligne_base, pied, sans_audit,  # noqa: E402
                              EXPO_C, BASE_C, PIEGE)

BASE2 = "#c084fc"              # la deuxième base (violet)
Y_BILLES = 1.72                # les billes, en haut
Y_L = (-0.85, -1.17, -1.82, -2.47)   # les lignes de base du calcul, en bas


def bille(s, c, r=0.24, fs=26):
    """Une bille de couleur, le facteur écrit dedans (écrit en noir, lisible)."""
    d = Circle(radius=r, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    t = T(s, fs, "#0b1220", audit=False).move_to(d)  # chiffre sombre sur les deux couleurs
    return VGroup(d, t)


def capsule(w, h=0.62, c=EXPO_C):
    return RoundedRectangle(width=w, height=h, corner_radius=h / 2, fill_opacity=0, stroke_color=c, stroke_width=3)


class PuissanceDefi3eShort(OutilsCalcul, ShortProp):
    nom_voix = "3e-puissance-defi-short"
    fichier_marques = "puissance_defi_3e_short_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """« Question ! » et le compte à rebours reculent vers la gauche (3 %)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = rebours.get_right()[0] - 1.9
        if d > 0:
            tete.shift(LEFT * d)
            rebours.shift(LEFT * d)
        q.scale(1.25).shift(DOWN * 0.04)
        cartes.shift(DOWN * 0.1)
        pause.shift(DOWN * 0.1)
        self.tete_q, self.q_q = tete, q
        return tete, q, cartes, pause, rebours, ph

    def appel_commentaire(self, y):
        self.au("Réponds en commentaire")
        appel = VGroup(T("Réponds", 27, VERT_OK), T("en commentaire !", 27, VERT_OK)).arrange(DOWN, buff=0.12).move_to(P(0, y))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.08, 0.25)
        self.attendre_voix(marge=1.0)
        return appel

    def fin_short(self, voix, a_effacer):
        """La fin du 19/10 (celle des shorts des épisodes précédents)."""
        self.dire(voix)
        entraine = self.borne(T("Entraîne-toi sur", 40, JAUNE_TITRE), 0.6).move_to(P(0, 2.2))
        site = T("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.25))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = T("Abonne-toi !", 42, VERT_OK).move_to(P(0, -0.2))
        poignee = T("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -1.05))
        self.play(FadeOut(Group(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)

    def carte(self):
        return RoundedRectangle(width=4.05, height=2.95, corner_radius=0.18, fill_color="#0b1220", fill_opacity=1,
                                stroke_color="#334155", stroke_width=2).move_to(P(0, -1.5))

    def sur_ligne(self, m, i, ref=None):
        """Pose le calcul m sur la ligne de base i, centré, borné à 85 % de la carte."""
        if m.width > 3.45:
            m.scale_to_fit_width(3.45)
        m.move_to(P(0, m.get_y()))
        r = ref if ref is not None else m[0]
        y = pied(r)
        m.shift(UP * (Y_L[i] - (y if y is not None else r.get_bottom()[1])))
        return m

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le jeu des paires", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : 2³ × 3³ = 6³ ? ──
        self.dire("00-accroche")
        carte = self.carte()
        xs = (-1.75, -1.2, -0.65, 0.65, 1.2, 1.75)
        b2 = VGroup(*[bille("2", BASE_C).move_to(P(x, Y_BILLES)) for x in xs[:3]])
        b3 = VGroup(*[bille("3", BASE2).move_to(P(x, Y_BILLES)) for x in xs[3:]])
        l = self.sur_ligne(suite((2, 3), "×", (3, 3, BASE2), "=", (6, 3), fs=58, buff=0.2), 0)
        self.au("2 puissance", Write(titre), FadeIn(carte), FadeIn(l[0].base, scale=1.3), rt=0.2)
        self.au("3 fois", FadeIn(l[0].expo, scale=1.6), LaggedStart(*[FadeIn(b, scale=0.4) for b in b2], lag_ratio=0.2), rt=0.3)
        self.au("fois", FadeIn(l[1]), rt=0.2)
        self.au("3 puissance", FadeIn(l[2].base, scale=1.3), rt=0.25)
        self.au("3,", FadeIn(l[2].expo, scale=1.6), LaggedStart(*[FadeIn(b, scale=0.4) for b in b3], lag_ratio=0.2), rt=0.35)
        self.au("égale", FadeIn(l[3]), rt=0.2)
        self.au("6 puissance", FadeIn(l[4].base, scale=1.3), rt=0.2)
        self.au("3.", FadeIn(l[4].expo, scale=1.6), rt=0.3)
        fx = VGroup(T("Ça a l'air faux,", 34, PIEGE), T("non ?", 34, PIEGE)).arrange(DOWN, buff=0.14).move_to(P(0, -1.65))
        self.au("Ça a", FadeIn(fx, scale=1.15), rt=0.35)
        self.insister(fx, 1.12, 0.2)
        self.attendre_voix(marge=0.2)

        # ── 01 : vérifions : 8 × 27 = 216 ; 6³ = 216, les billes par paires ──
        self.dire("01-verifier")
        v = T("Vérifions.", 30, JAUNE_TITRE).move_to(P(0, 0.48))
        self.au("Vérifions", FadeOut(fx), FadeIn(v, shift=DOWN * 0.1), rt=0.3)
        k_l = T("2", 36).height / l[0].base.height
        dy_l = (pied(l[0]) - l.get_y()) * k_l
        self.play(l.animate.scale(k_l).move_to(P(0, -0.72 - dy_l)), run_time=0.3)
        a = suite((2, 3), "=", ["8", BASE_C], fs=36, buff=0.14)
        c = suite((3, 3, BASE2), "=", ["27", BASE2], fs=36, buff=0.14)
        a.move_to(P(-0.92, 0))
        c.move_to(P(0.92, 0))
        y = pied(a[0])
        a.shift(UP * (-1.32 - y))
        c.shift(UP * (-1.32 - pied(c[0])))
        cad_2 = SurroundingRectangle(b2, color=BASE_C, buff=0.08, corner_radius=0.2, stroke_width=3)
        cad_3 = SurroundingRectangle(b3, color=BASE2, buff=0.08, corner_radius=0.2, stroke_width=3)
        self.au("2 puissance", FadeIn(a[0].base, scale=1.2), Create(cad_2), rt=0.3)
        self.au("3 :", FadeIn(a[0].expo, scale=1.6), rt=0.2)
        self.au("8.", FadeIn(a[1]), FadeIn(a[2], scale=1.4), Wiggle(b2, scale_value=1.1), rt=0.35)
        self.au("3 puissance", FadeIn(c[0].base, scale=1.2), Create(cad_3), rt=0.3)
        self.au("3 :", FadeIn(c[0].expo, scale=1.6), rt=0.2)
        self.au("27.", FadeIn(c[1]), FadeIn(c[2], scale=1.4), Wiggle(b3, scale_value=1.1), rt=0.35)
        d = suite("8", "×", "27", "=", ["216", VERT_OK], fs=36, buff=0.16)
        d = self.sur_ligne(d, 2)
        d.shift(DOWN * 0.1)
        self.au("8 fois", FadeIn(d[0], scale=1.2), rt=0.2)
        self.au("fois", FadeIn(d[1]), rt=0.15)
        self.au("27", FadeIn(d[2], scale=1.2), rt=0.3)
        self.au("216.", FadeIn(d[3]), FadeIn(d[4], scale=1.4), rt=0.3)
        # les billes se groupent : (2, 3) trois fois, chaque paire vaut 6
        e = suite((6, 3), "=", ["216", VERT_OK], fs=36, buff=0.16)
        e = self.sur_ligne(e, 3, e[2])
        e.shift(DOWN * 0.05)
        xp = (-1.38, 0.0, 1.38)
        caps = VGroup(*[capsule(1.22).move_to(P(x, Y_BILLES)) for x in xp])
        anims = []
        for i, x in enumerate(xp):
            anims += [b2[i].animate.move_to(P(x - 0.29, Y_BILLES)), b3[i].animate.move_to(P(x + 0.29, Y_BILLES))]
        sx = VGroup(*[T("6", 40, VERT_OK).move_to(P(x, Y_BILLES - 0.72)) for x in xp])
        self.au("Et 6", FadeOut(cad_2), FadeOut(cad_3), FadeOut(v), *anims, rt=0.45)
        self.au("6 puissance", Create(caps), FadeIn(sx, scale=1.4), FadeIn(e[0].base, scale=1.3), rt=0.2)
        self.au("3 :", FadeIn(e[0].expo, scale=1.6), rt=0.25)
        self.au("216.", FadeIn(e[1]), FadeIn(e[2], scale=1.4), rt=0.3)
        self.play(d[4].animate.scale(1.25), e[2].animate.scale(1.25), run_time=0.2)
        self.play(d[4].animate.scale(1 / 1.25), e[2].animate.scale(1 / 1.25), run_time=0.2)
        ok = T("C'est juste !", 34, VERT_OK).move_to(P(0, 0.4))
        self.au("C'est", FadeIn(ok, scale=1.3), rt=0.35)
        self.insister(ok, 1.12, 0.2)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) : 2⁵ × 5⁵ ──
        choix = [puiss(7, 5, fs=34), puiss(10, 5, fs=34), puiss(10, 10, fs=34)]
        plans = [[("7 puissance", [choix[0].base]), ("5.", [choix[0].expo])],
                 [("10 puissance", [choix[1].base]), ("5.", [choix[1].expo])],
                 [("10 puissance", [choix[2].base]), ("10.", [choix[2].expo])]]
        xq = [-1.6 + 0.8 * i for i in range(5)]
        caps5 = VGroup(*[capsule(0.74, 0.42).move_to(P(x, 1.55)) for x in xq])
        b25 = [bille("2", BASE_C, 0.16, 18).move_to(P(x - 0.17, 1.55)) for x in xq]
        b55 = [bille("5", BASE2, 0.16, 18).move_to(P(x + 0.17, 1.55)) for x in xq]

        def avant(sc, q):
            sc.poser_mots(q[0], [(0, "2 puissance"), (1, "5 fois"), (3, "fois"), (5, "5 puissance"), (6, "5 ?")])

        def apres(sc):
            l0 = suite("Réponse B :", (10, 5, VERT_OK), ".", fs=30, buff=0.18)
            l0[0].set_color(VERT_OK)
            l0[2].set_color(VERT_OK)
            l0[2].next_to(l0[1], RIGHT, buff=0.04)
            l0[2].shift(UP * (pied(l0[0]) - l0[2].get_bottom()[1]))
            l0.move_to(P(0, sc.cartes_q.get_bottom()[1] - 0.32))
            sc.au("B :", FadeIn(l0[0], shift=UP * 0.12), rt=0.2)
            sc.au("10 puissance", FadeIn(l0[1].base, shift=UP * 0.12), rt=0.2)
            sc.au("5.", FadeIn(l0[1].expo, l0[2], shift=UP * 0.12), rt=0.25)
            self.wait(0.15)
            # les cartes s'effacent : en haut les billes, en bas le calcul
            carte2 = self.carte()
            l1 = T("On fait des paires :", 26, JAUNE_TITRE)
            l2 = suite(["2", BASE_C], "×", ["5", BASE2], fs=44, buff=0.16)
            l2t = T("cinq fois de suite.", 26)
            l3 = sans_audit(suite((10, 5, VERT_OK), "=", ["100 000", VERT_OK], fs=46, buff=0.18))
            l3.scale_to_fit_width(3.2)
            l1.move_to(P(0, 0.0))
            l1.shift(UP * (-0.5 - pied(l1)))
            l2.shift(UP * (Y_L[1] - pied(l2[0])) + RIGHT * (0 - l2.get_x()))
            l2t.shift(UP * (Y_L[2] - pied(l2t)))
            l3.shift(RIGHT * (0 - l3.get_x()))
            l3.shift(UP * (Y_L[3] - pied(l3[2])))
            sc.au("On fait", FadeOut(sc.cartes_q), FadeOut(sc.tete_q), FadeOut(sc.q_q), FadeOut(l0), FadeIn(carte2),
                  FadeIn(l1, shift=UP * 0.1), rt=0.3)
            sc.au("2 fois", FadeIn(l2[0], scale=1.2), FadeIn(b25[0], shift=RIGHT * 0.5), rt=0.2)
            sc.au("fois", FadeIn(l2[1]), rt=0.15)
            sc.au("5,", FadeIn(l2[2], scale=1.2), FadeIn(b55[0], shift=LEFT * 0.5), Create(caps5[0]), rt=0.3)
            sc.au("cinq", FadeIn(l2t, shift=UP * 0.1),
                  LaggedStart(*[AnimationGroup(FadeIn(b25[i], shift=RIGHT * 0.3), FadeIn(b55[i], shift=LEFT * 0.3),
                                               Create(caps5[i])) for i in range(1, 5)], lag_ratio=0.3), rt=1.0)
            dix = VGroup(*[T("10", 26, VERT_OK, audit=False).move_to(P(x, 0.98)) for x in xq])
            sc.au("100 000", FadeIn(l3, scale=1.2), FadeIn(dix, shift=DOWN * 0.1), rt=0.4)
            sc.insister(l3[2], 1.15, 0.2)

        self.qpause("01q-question", "01r-reponse", choix, plans, 1, ["Réponse B : 10⁵."], avant=avant, apres=apres,
                    question=["2⁵ × 5⁵ ?"])
        self.vider(garder)

        # ── 02 : la question en commentaire : 4³ × 5³ ──
        self.dire("02-question")
        carte = self.carte()
        xp = (-1.38, 0.0, 1.38)
        caps = VGroup(*[capsule(1.22).move_to(P(x, Y_BILLES)) for x in xp])
        b4 = VGroup(*[bille("4", BASE_C).move_to(P(x - 0.29, Y_BILLES)) for x in xp])
        b5 = VGroup(*[bille("5", BASE2).move_to(P(x + 0.29, Y_BILLES)) for x in xp])
        q = self.sur_ligne(suite((4, 3), "×", (5, 3, BASE2), "=", ["?", EXPO_C], fs=60, buff=0.2), 0, None)
        q.shift(DOWN * 0.1)
        self.au("4 puissance", FadeIn(carte), FadeIn(q[0].base, scale=1.3), FadeIn(b4, shift=RIGHT * 0.3), rt=0.3)
        self.au("3 fois", FadeIn(q[0].expo, scale=1.6), rt=0.25)
        self.au("fois", FadeIn(q[1]), rt=0.2)
        self.au("5 puissance", FadeIn(q[2].base, scale=1.3), FadeIn(b5, shift=LEFT * 0.3), rt=0.25)
        self.au("3,", FadeIn(q[2].expo, scale=1.6), Create(caps), rt=0.3)
        cb = T("ça fait combien ?", 28).move_to(P(0, -1.5))
        self.au("ça fait", FadeIn(cb, shift=UP * 0.1), FadeIn(q[3]), FadeIn(q[4], scale=1.5), rt=0.35)
        self.insister(q[4], 1.4, 0.2)
        self.appel_commentaire(-2.25)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])
