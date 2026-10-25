# frac_additionner_short.py
# EleveAI — Maths 5e — short jumeau de l'épisode 07 « Additionner des
# fractions » (micro fraction_additionner). CEINTURE JAUNE : on VOIT les
# pièces, mais il faut ajouter sept fractions (quarts, huitièmes, seizièmes,
# dénominateurs multiples l'un de l'autre) : plus qu'un short blanc.
# Il AMUSE : « Le tangram ». Léo, CRÉATEUR DE CASSE-TÊTE, montre le tangram
# (jeu chinois, un carré en 7 pièces) :
#   · EN HAUT, le nom de la pièce et sa fraction ; EN BAS, au même instant, la
#     pièce s'allume dans le carré ;
#   · 1 question-pause (3 s) : les deux grands triangles = 1/4 + 1/4 = 1/2
#     (leurre 2/8 : on ajoute les bas) ;
#   · tout en seizièmes : 4 + 4 + 2 + 2 + 2 + 1 + 1 = 16 → SURPRISE : 16/16 = 1,
#     les pièces s'envolent et reviennent former le carré ;
#   · commentaire : « le petit carré et les deux petits triangles ? » (1/4).
# Aires des pièces : géométrie (carré 4 × 4 = 16 : grands triangles 4, moyen 2,
# carré 2, parallélogramme 2, petits 1). Aucune donnée chiffrée du monde réel.
# Vérifié (Python) : 2 × 1/4 + 3 × 1/8 + 2 × 1/16 = 1 ; 1/8 + 2 × 1/16 = 1/4.
# Centres d'intérêt : jeux-defis, art-design.
#
# Voix : manim/voix/5e-frac-additionner-short.json (débit −10) ; marques :
# manim/scripts/5e/frac_additionner_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/5e/frac_additionner_short.py FracAdditionnerShort5e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/frac_additionner_short.py FracAdditionnerShort5e -o eleveai-maths-5e-frac-additionner-short --media_dir manim/scripts/5e/media-frac-additionner-short
# Sortie : manim/sorties/5e/maths/fractions/07-additionner/eleveai-maths-5e-frac-additionner-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_loth_commun import *  # noqa: E402,F403

TEINTES = ["#f59e0b", "#38bdf8", "#4ade80", "#fb923c", "#a78bfa", "#f472b6", "#facc15"]
S = 2.8                    # le côté du carré
C = P(0, -1.05)            # son centre
# les 7 pièces sur une grille 4 × 4 (origine en bas à gauche), leur valeur en 16es
PIECES = [([(0, 4), (4, 4), (2, 2)], 4), ([(0, 0), (0, 4), (2, 2)], 4), ([(2, 0), (4, 0), (4, 2)], 2),
          ([(2, 2), (3, 1), (2, 0), (1, 1)], 2), ([(3, 3), (4, 4), (4, 2), (3, 1)], 2),
          ([(2, 2), (3, 3), (3, 1)], 1), ([(0, 0), (2, 0), (1, 1)], 1)]
NOMS = ["1/4", "1/4", "1/8", "1/8", "1/8", "1/16", "1/16"]


def g2p(x, y):
    return C + P((x - 2) * S / 4, (y - 2) * S / 4)


def tangram():
    out = VGroup()
    for (pts, _), c in zip(PIECES, TEINTES):
        out.add(Polygon(*[g2p(x, y) for x, y in pts], fill_color=c, fill_opacity=1, stroke_color=BORD,
                        stroke_width=4))
    return out


def centre_piece(i):
    pts = PIECES[i][0]
    return g2p(sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts))


def etiq(s, fs, couleur=NUIT):
    t = Text(s, font_size=fs, color=couleur, weight=BOLD)
    t.sans_synchro = True
    return t


def createur(s=0.55):
    p = personne(peau="#e0ac69", tenue="#0891b2", cheveux="#78350f", s=s)
    p.add(lunettes(p))
    return p


class FracAdditionnerShort5e(ShortH):
    nom_voix = "5e-frac-additionner-short"
    fichier_marques = "frac_additionner_short_marques.json"
    ceinture = "jaune"

    def carte(self):
        return RoundedRectangle(width=S + 0.35, height=S + 0.35, corner_radius=0.18, fill_color=CARTE,
                                fill_opacity=1, stroke_color=GRILLE, stroke_width=3).move_to(C)

    def labels(self, textes, fss):
        out = VGroup()
        for i, (s, fs) in enumerate(zip(textes, fss)):
            out.add(etiq(s, fs).move_to(centre_piece(i)))
        return out

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le tangram", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Léo et le tangram ──
        self.dire("00-accroche")
        le = createur(0.6).move_to(P(-1.1, 1.35))
        self.au_mot("Léo")
        nm = self.bloc(["Léo,", "créateur", "de casse-tête"], 26, BLEU_CALCUL).move_to(P(0.85, 1.35))
        self.play(FadeIn(le, shift=UP * 0.2), FadeIn(nm[0]), run_time=0.4)
        self.au_mot("créateur")
        self.play(FadeIn(nm[1:], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le tangram")
        self.play(Write(titre), run_time=0.6)
        ca = self.carte()
        tg = tangram()
        self.au_mot("un carré")
        self.play(FadeIn(ca), Create(Square(S).move_to(C).set_stroke(BORD, 5)), run_time=0.5)
        self.au_nb("en 7")
        self.play(LaggedStart(*[FadeIn(p, scale=0.6) for p in tg], lag_ratio=0.12), run_time=1.0)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(le), FadeOut(nm), run_time=0.3)

        # ── 01 : la fraction de chaque pièce ──
        self.dire("01-pieces")
        labs = self.labels(NOMS, [40, 40, 30, 28, 28, 22, 22])
        tg.set_opacity(0.35)
        self.add(tg)
        etapes = [("Chaque grand triangle", "c'est 1 quart", [0, 1], "grand triangle :", "1/4"),
                  ("Le triangle moyen", "moyen : 1 huitième", [2], "triangle moyen :", "1/8"),
                  ("Le petit carré", "carré : 1 huitième", [3], "petit carré :", "1/8"),
                  ("Le parallélogramme", "parallélogramme : 1 huitième", [4], "parallélogramme :", "1/8"),
                  ("Chaque petit triangle", "triangle : 1 seizième", [5, 6], "petit triangle :", "1/16")]
        haut = None
        for mot, nb, idx, nom, fr_ in etapes:
            l = VGroup(self.t(nom, 30), self.inline(fr_, 34, AMBRE)).arrange(RIGHT, buff=0.2)
            l[0].sans_synchro = True
            self.borne(l).move_to(P(0, 1.35))
            self.au_mot(mot)
            anims = [tg[i].animate.set_opacity(1) for i in idx]
            if haut is not None:
                anims.append(FadeOut(haut))
            self.play(*anims, FadeIn(l[0], shift=RIGHT * 0.1), run_time=0.35)
            self.au_nb(nb)
            self.play(FadeIn(l[1], scale=1.3), *[FadeIn(labs[i], scale=1.3) for i in idx], run_time=0.3)
            haut = l
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Les deux grands triangles", "ensemble ?"],
                            [self.inline("2/8", 30), self.inline("1/2", 30), self.inline("1/8", 30)], 1,
                            ["1/4 + 1/4 = 2/4 = 1/2"], mot_q="Les deux grands")
        self.vider(garder)

        # ── 03 : tout en seizièmes ──
        self.dire("03-total")
        ca = self.carte()
        tg = tangram()
        self.au_mot("les 7 pièces")
        self.play(FadeIn(ca), FadeIn(tg), run_time=0.5)
        nbs = self.labels([str(v) for _, v in PIECES], [46, 46, 38, 36, 36, 28, 28])
        lg = self.ligne([("4", TEINTES[0]), ("+ 4", TEINTES[1]), ("+ 2", TEINTES[2]), ("+ 2", TEINTES[3]),
                         ("+ 2", TEINTES[4]), ("+ 1", TEINTES[5]), ("+ 1", TEINTES[6]), ("= 16", VERT_OK)], 36, buff=0.1)
        lg[:7].arrange(RIGHT, buff=0.12)
        lg[:7].scale_to_fit_width(min(lg[:7].width, 3.9)).move_to(P(0, 1.65))
        lg[7].next_to(lg[:7], DOWN, buff=0.18)
        sans_synchro(lg)
        mots = [("seizièmes : 4", 1), ("plus 4", 1), ("plus 2", 1), ("plus 2", 2), ("plus 2", 3), ("plus 1", 1),
                ("plus 1", 2)]
        for i, (mot, n) in enumerate(mots):
            self.au_nb(mot, n=n)
            self.play(FadeIn(lg[i], scale=1.3), FadeIn(nbs[i], scale=1.3), Indicate(tg[i], scale_factor=1.05),
                      run_time=0.3)
        self.au_nb("égale 16")
        self.play(FadeIn(lg[7], scale=1.3), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 04 : la surprise : 16/16 = 1 ──
        self.dire("04-surprise")
        res = VGroup(self.inline("16/16", 46, VERT_OK), self.inline("= 1 carré entier !", 34, VERT_OK))
        res.arrange(DOWN, buff=0.2)
        res.scale_to_fit_width(min(res.width, 3.8)).move_to(P(0, 1.6))
        self.au_nb("16 seizièmes")
        self.play(FadeOut(lg), FadeIn(res[0], scale=1.4), run_time=0.4)
        self.au_nb("1 carré entier")
        self.play(FadeIn(res[1], scale=1.2), run_time=0.35)
        self.au_mot("Les 7 pièces font")
        dirs = [UP, LEFT, DR, DOWN, RIGHT, UR, DL]
        self.play(*[VGroup(tg[i], nbs[i]).animate.shift(dirs[i] * 0.35) for i in range(7)], run_time=0.5)
        self.au_mot("rien ne dépasse")
        self.play(*[VGroup(tg[i], nbs[i]).animate.shift(-dirs[i] * 0.35) for i in range(7)], run_time=0.6)
        cadre = Square(S).move_to(C).set_stroke(VERT_OK, 8)
        self.au_mot("rien ne manque")
        self.play(Create(cadre), run_time=0.5)
        self.insister(res, 1.12)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 05 : la question en commentaire ──
        self.dire("05-question")
        ca = self.carte()
        tg = tangram().set_opacity(0.3)
        self.play(FadeIn(ca), FadeIn(tg), run_time=0.4)
        self.au_mot("Le petit carré")
        self.play(tg[3].animate.set_opacity(1), run_time=0.35)
        self.au_mot("les deux petits triangles")
        self.play(tg[5].animate.set_opacity(1), tg[6].animate.set_opacity(1), run_time=0.35)
        q = self.bloc(["Carré + deux petits triangles :", "quelle part du grand carré ?"], 28, AMBRE).move_to(P(0, 1.55))
        bloc_fixe(q)
        self.au_mot("quelle part")
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.appel_commentaire(y=0.75)
