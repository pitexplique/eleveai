# proba_comparer_short.py
# EleveAI — Maths CM2 — short jumeau de la série « Probabilités », épisode 3 :
# comparer des chances. CEINTURE JAUNE (un calcul : ramener au même total).
# Il AMUSE : « 4 gagnants contre 2 gagnants, tu joues où ? »… piège !
#   · en HAUT les deux stands : d'abord SEULEMENT les tickets gagnants, puis
#     les autres tickets surgissent (20 et 5) ; la colonne de 5 du stand D se
#     recopie jusqu'à 20 tickets (8 gagnants) ;
#   · en BAS, EN MÊME TEMPS : « 4 gagnants », « 2 gagnants », puis « 4 sur 20 »,
#     « 2 sur 5 », « 4 sur 20 contre 8 sur 20 », « Le stand D gagne ! » ;
#   · fin : 3 sur 4 ou 5 sur 8 ?, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/cm2-proba-comparer-short.json (Julie, débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm2/proba_comparer_short.py ShortProbaComparerCM2 -o eleveai-maths-cm2-proba-comparer-short --media_dir manim/scripts/cm2/media
# Puis copier le mp4 dans manim/sorties/cm2/maths/probabilites/03-comparer/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_comparer import P, ARDOISE, GAGNANT, ticket  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
XC, XD, YS = -1.06, 1.06, 0.55   # les deux stands
W, PX, PY = 0.36, 0.43, 0.3    # ticket, pas en x, pas en y


def grille(gagnants, cols, rows, x, y):
    """Tickets en grille (cols × rows) centrée en (x, y) ; renvoie un dict
    (colonne, rangée) → ticket."""
    d = {}
    for c in range(cols):
        for r in range(rows):
            d[(c, r)] = ticket((c, r) in gagnants, W).move_to(
                P(x + (c - (cols - 1) / 2) * PX, y - (r - (rows - 1) / 2) * PY))
    return d


def cadre(x, y, w=1.94, h=1.8, couleur=BLEU_CALCUL):
    return RoundedRectangle(width=w, height=h, corner_radius=0.15, stroke_color=couleur, stroke_width=3,
                            fill_color=ARDOISE, fill_opacity=0.6).move_to(P(x, y))


class ShortProbaComparerCM2(Short6e):
    nom_voix = "cm2-proba-comparer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=40, buff=0.15, largeur=LARGEUR_MAX):
        """Morceaux colorés d'UN SEUL Text (même ligne de base) ; g[i] = i-ème morceau."""
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):
            g = VGroup(*[Text(m, font_size=font_size, color=c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        else:
            g, k = VGroup(), 0
            for (m, c), n in zip(morceaux, tailles):
                g.add(VGroup(*T[k:k + n]).set_color(c))
                k += n
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g

    def sur(self, a, b, font_size=34, largeur=1.8):
        return self.ligne([(str(a), GAGNANT), ("sur", WHITE), (str(b), JAUNE_TITRE)], font_size, largeur=largeur)

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def sauter(self, tickets, h=0.12):
        self.play(*[tk.animate.shift(UP * h) for tk in tickets], run_time=0.15)
        self.play(*[tk.animate.shift(DOWN * h) for tk in tickets], run_time=0.2,
                  rate_func=rate_functions.ease_out_bounce)

    def badge(self):
        return echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def construct(self):
        self.margo_bas()
        badge = self.badge()

        # ── 00 : l'accroche : on ne voit QUE les gagnants ──
        self.dire("00-accroche")
        self.play(FadeIn(badge, shift=DOWN * 0.2), run_time=0.4)
        gc = {(1, 0), (3, 1), (0, 3), (2, 4)}
        C = grille(gc, 4, 5, XC, YS)
        D = grille({(c, r) for c in range(4) for r in (1, 3)}, 4, 5, XD, YS)
        kc, kd = cadre(XC, YS), cadre(XD, YS)
        nc = Text("Stand C", font_size=28, color=BLEU_CALCUL, weight=BOLD).next_to(kc, UP, buff=0.1)
        nd = Text("Stand D", font_size=28, color=BLEU_CALCUL, weight=BOLD).next_to(kd, UP, buff=0.1)
        y_bas = -0.75
        self.au_mot("Stand C")
        self.play(FadeIn(kc), FadeIn(nc, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("4 tickets gagnants")
        g4 = self.ligne([("4", GAGNANT), ("gagnants", WHITE)], 32, largeur=1.8).move_to(P(XC, y_bas))
        self.play(LaggedStart(*[FadeIn(C[k], scale=0.3) for k in sorted(gc)], lag_ratio=0.2),
                  FadeIn(g4, shift=UP * 0.15), run_time=0.7)
        self.au_mot("Stand D")
        self.play(FadeIn(kd), FadeIn(nd, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("2 tickets gagnants")
        g2 = self.ligne([("2", GAGNANT), ("gagnants", WHITE)], 32, largeur=1.8).move_to(P(XD, y_bas))
        self.play(LaggedStart(*[FadeIn(D[(0, r)], scale=0.3) for r in (1, 3)], lag_ratio=0.3),
                  FadeIn(g2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Tu joues où")
        titre = self.grand("Tu joues où ?", font_size=50, color=ORANGE_RETENUE).move_to(P(0, 3.4))
        self.play(FadeIn(titre, scale=0.5), run_time=0.35)
        self.insister(VGroup(g4[0], g2[0]), 1.4)
        self.attendre_voix(marge=0.1)

        # ── 01 : piège ! les autres tickets surgissent ──
        self.dire("01-image")
        self.au_mot("Piège")
        piege = self.grand("Piège !", font_size=60, color=ROUGE_ERREUR).move_to(P(0, 3.4))
        self.play(ReplacementTransform(titre, piege), run_time=0.35)
        self.play(Wiggle(piege), run_time=0.45)
        self.au_mot("20 tickets")
        autres_c = [C[k] for k in sorted(C) if k not in gc]
        self.play(LaggedStart(*[FadeIn(tk, scale=0.3) for tk in autres_c], lag_ratio=0.05), run_time=0.8)
        self.au_mot("seulement 5")
        autres_d = [D[(0, r)] for r in (0, 2, 4)]
        self.play(LaggedStart(*[FadeIn(tk, scale=0.3) for tk in autres_d], lag_ratio=0.15), run_time=0.45)
        self.au_mot("4 sur 20 contre")
        s420 = self.sur(4, 20).move_to(P(XC, y_bas))
        self.play(FadeOut(g4, shift=UP * 0.2), FadeIn(s420, shift=UP * 0.2), run_time=0.35)
        self.au_mot("2 sur 5")
        s25 = self.sur(2, 5).move_to(P(XD, y_bas))
        self.play(FadeOut(g2, shift=UP * 0.2), FadeIn(s25, shift=UP * 0.2), run_time=0.35)
        self.au_mot("c'est 4 sur 20")
        col0 = VGroup(*[D[(0, r)] for r in range(5)])
        for c in (1, 2, 3):  # la colonne de 5 se recopie : 20 tickets, comme au stand C
            colc = VGroup(*[D[(c, r)] for r in range(5)])
            self.play(TransformFromCopy(col0, colc), run_time=0.3)
        bas = self.ligne([("4", GAGNANT), ("sur", WHITE), ("20", JAUNE_TITRE), ("contre", GREY_B),
                          ("8", GAGNANT), ("sur", WHITE), ("20", JAUNE_TITRE)], 36)
        bas.move_to(P(0, -1.4))
        self.play(FadeIn(bas[:4], shift=UP * 0.15), run_time=0.3)
        self.au_mot("8 sur 20")
        self.play(FadeIn(bas[4:], shift=UP * 0.15), run_time=0.3)
        self.sauter([D[(c, r)] for c in range(4) for r in (1, 3)])
        self.au_mot("Le stand D gagne")
        gagne = self.grand("Le stand D gagne !", font_size=46, color=VERT_OK).move_to(P(0, -2.2))
        self.play(kd.animate.set_stroke(VERT_OK, 6), nd.animate.set_color(VERT_OK), FadeIn(gagne, scale=0.6),
                  run_time=0.4)
        self.insister(gagne, 1.15)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Write(toi), run_time=0.4)
        g = grille({(0, 0), (1, 0), (0, 1)}, 2, 2, XC, 0.85)
        h = grille({(0, 0), (1, 0), (2, 0), (3, 0), (1, 1)}, 4, 2, XD, 0.85)
        k1, k2 = cadre(XC, 0.85, 1.94, 1.0), cadre(XD, 0.85, 1.94, 1.0)
        self.au_mot("3 sur 4")
        q = self.ligne([("3", GAGNANT), ("sur", WHITE), ("4", JAUNE_TITRE), ("ou", GREY_B),
                        ("5", GAGNANT), ("sur", WHITE), ("8", JAUNE_TITRE)], 44)
        q.move_to(P(0, -0.15))
        q1, ou, q2 = q[:3], q[3], q[4:]
        self.play(FadeIn(k1), *[FadeIn(tk, scale=0.4) for tk in g.values()], FadeIn(q1, shift=UP * 0.15),
                  run_time=0.4)
        self.au_mot("ou 5 sur 8")
        self.play(FadeIn(ou), run_time=0.15)
        self.play(FadeIn(k2), *[FadeIn(tk, scale=0.4) for tk in h.values()], FadeIn(q2, shift=UP * 0.15),
                  run_time=0.4)
        self.au_mot("lequel")
        lequel = self.t("le plus de chances ?", 34, ORANGE_RETENUE).move_to(P(0, -0.85))
        self.play(FadeIn(lequel, scale=0.6), run_time=0.35)
        self.insister(q, 1.06)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.95))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1)
        self.attendre_voix(marge=1.5)
