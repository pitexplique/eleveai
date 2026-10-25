# frac_representer_short.py
# EleveAI — Maths CM1 ET CM2 — short jumeau de l'épisode 02 « Représenter une
# fraction » (micro fraction_representer). CEINTURE BLANCHE (règle du short
# blanc) : on VOIT des quarts, aucun calcul.
# Il AMUSE : « Couper en quarts : de combien de façons ? ». Zoé, CRÉATRICE DE
# PUZZLES :
#   · EN HAUT : Zoé, puis les trois découpes rangées côte à côte ;
#   · EN BAS, au même instant : LE carré (carte du coach) découpé en 4 bandes,
#     en 4 petits carrés, en 4 triangles ; 1 part coloriée à chaque fois ;
#   · SURPRISE : des formes différentes, mais la même taille : des quarts ;
#     le piège : 4 parts pas pareilles, ce ne sont pas des quarts ;
#   · 1 question-pause (3 s) : 2 triangles égaux → 1 triangle = 1 demi
#     (leurres 1 quart : « 4 côtés » ; 2 demis : le carré entier) ;
#   · commentaire : « 8 parts égales, 6 coloriées : quelle fraction ? » (6/8).
# Vérifié : 6/8 = 3/4. Aucune donnée réelle citée. Centres : art-design, jeux-defis.
#
# Le short n'affiche pas la classe : rendu UNE fois, copié sous les noms cm1 et cm2.
# Voix : manim/voix/cm-frac-representer-short.json (débit −10) ; marques :
# manim/scripts/cm1/frac_representer_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/frac_representer_short.py FracRepresenterShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/frac_representer_short.py FracRepresenterShortCM -o eleveai-maths-cm1-frac-representer-short --media_dir manim/scripts/cm1/media-frac-representer-short
# Sorties : manim/sorties/{cm1,cm2}/maths/fractions/02-representer/eleveai-maths-{cm1,cm2}-frac-representer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403

YC = -1.1
Y1, Y2, Y3 = 1.95, 1.35, 0.8


def puzzleuse(s=0.45):
    p = personne(peau="#8d5524", tenue="#db2777", cheveux="#111827", longs=True, s=s)
    return p


def _poly(pts, c, couleur):
    return Polygon(*[c + P(x, y) for x, y in pts], fill_color=couleur, fill_opacity=1, stroke_color=BORD,
                   stroke_width=3)


def carre_coupe(mode, k=1, cote=2.4, centre=ORIGIN, couleur=BLEU_PART):
    """Le carré du coach découpé : mode « bandes », « carres », « triangles »,
    « inegal », « diag2 », « huit ». Les k premières parts sont coloriées.
    .parts .carte ; rien n'est ajouté à la scène."""
    h = cote / 2
    if mode == "bandes":
        pts = [[(-h + i * h / 2, -h), (-h + (i + 1) * h / 2, -h), (-h + (i + 1) * h / 2, h), (-h + i * h / 2, h)]
               for i in range(4)]
    elif mode == "carres":
        pts = [[(x, y), (x + h, y), (x + h, y + h), (x, y + h)] for y in (0, -h) for x in (-h, 0)]
    elif mode == "triangles":
        pts = [[(-h, h), (h, h), (0, 0)], [(h, h), (h, -h), (0, 0)], [(h, -h), (-h, -h), (0, 0)],
               [(-h, -h), (-h, h), (0, 0)]]
    elif mode == "diag2":
        pts = [[(-h, h), (h, h), (h, -h)], [(-h, h), (h, -h), (-h, -h)]]
    elif mode == "huit":
        pts = [[(x, y), (x + h / 2, y), (x + h / 2, y + h), (x, y + h)] for y in (0, -h)
               for x in (-h, -h / 2, 0, h / 2)]
    else:  # « inegal » : une grande part, une moyenne, deux petites
        a, b = -h + cote * 0.62, h - cote * 0.3
        pts = [[(-h, -h), (a, -h), (a, h), (-h, h)], [(a, b), (h, b), (h, h), (a, h)],
               [(a, -h), (h * 0.6, -h), (h * 0.6, b), (a, b)], [(h * 0.6, -h), (h, -h), (h, b), (h * 0.6, b)]]
    parts = VGroup(*[_poly(p, ORIGIN, couleur if i < k else VIDE) for i, p in enumerate(pts)])
    carte = RoundedRectangle(width=cote + 0.6, height=cote + 0.6, corner_radius=0.22, fill_color=CARTE,
                             fill_opacity=1, stroke_color=GRILLE, stroke_width=3)
    g = VGroup(carte, parts).move_to(centre)
    g.parts, g.carte = parts, carte
    return g


class FracRepresenterShortCM(ShortCM):
    nom_voix = "cm-frac-representer-short"
    fichier_marques = "frac_representer_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Couper en quarts", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Zoé et son carré ──
        self.dire("00-accroche")
        self.au_mot("Zoé")
        zoe = puzzleuse().move_to(P(-1.4, 1.65))
        nm = self.bloc(["Zoé crée", "des puzzles"], 26, BLEU_CALCUL).next_to(zoe, RIGHT, buff=0.2)
        self.play(Write(titre), FadeIn(zoe, shift=UP * 0.2), FadeIn(nm), run_time=0.6)
        vide = carre_coupe("bandes", 0, centre=P(0, YC))
        for p in vide.parts:
            p.set_stroke(opacity=0)
        cadre = Square(2.4, stroke_color=BORD, stroke_width=4).move_to(P(0, YC))
        self.au_mot("un carré")
        self.play(FadeIn(vide), Create(cadre), run_time=0.5)
        q = self.inline("4 parts égales ?", 30, AMBRE).move_to(P(0, 0.65))
        self.au_nb("en 4")
        self.play(FadeIn(q, scale=1.2), run_time=0.3)
        self.au_mot("De combien de façons")
        self.insister(q, 1.12)
        self.attendre_voix(marge=0.2)

        # ── 01 : trois façons ──
        self.dire("01-facons")
        self.play(FadeOut(VGroup(zoe, nm, q)), run_time=0.3)
        actuel = VGroup(vide, cadre)
        minis = []
        for k, (mode, mot) in enumerate((("bandes", "En 4 bandes"), ("carres", "En 4 petits"),
                                         ("triangles", "En 4 triangles"))):
            c = carre_coupe(mode, 1, centre=P(0, YC))
            self.au_nb(mot)
            self.play(FadeOut(actuel), FadeIn(c.carte), LaggedStart(*[Create(p) for p in c.parts], lag_ratio=0.15),
                      run_time=0.7)
            actuel = c
            minis.append(c.copy().scale(0.34))
        rang = VGroup(*minis).arrange(RIGHT, buff=0.15).move_to(P(0, 1.6))
        self.au_mot("Toutes ces parts")
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.2) for m in rang], lag_ratio=0.2), run_time=0.7)
        dq = self.inline("des quarts !", 36, VERT_OK).move_to(P(0, 0.68))
        self.au_mot("des quarts")
        self.play(FadeIn(dq, scale=1.3), run_time=0.3)
        self.au_mot("la même taille")
        self.play(*[Indicate(m.parts[0], color=VERT_OK, scale_factor=1.25) for m in rang], run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 02 : le piège ──
        self.dire("02-piege")
        ineg = carre_coupe("inegal", 1, centre=P(0, YC))
        self.au_mot("Mais là")
        self.play(FadeOut(actuel), FadeOut(dq), FadeIn(ineg.carte),
                  LaggedStart(*[Create(p) for p in ineg.parts], lag_ratio=0.15), run_time=0.7)
        self.au_mot("pas pareilles")
        self.play(*[Indicate(p, color=ROUGE_ERREUR, scale_factor=1.06) for p in ineg.parts], run_time=0.6)
        ko = self.inline("pas des quarts !", 34, ROUGE_ERREUR).move_to(P(0, 0.68))
        self.au_mot("ce ne sont pas")
        self.play(FadeIn(ko, scale=1.2), Create(croix(ineg.carte, sw=7)), run_time=0.4)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["2 triangles égaux :", "1 triangle, c'est… ?"],
                            [self.inline("1/2", 30), self.inline("1/4", 30), self.inline("2/2", 30)], 0,
                            ["2 parts égales : des demis."], mot_q="Ce carré")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        c8 = carre_coupe("huit", 0, centre=P(0, YC))
        self.au_nb("en 8")
        self.play(FadeIn(c8.carte), LaggedStart(*[Create(p) for p in c8.parts], lag_ratio=0.08), run_time=0.7)
        self.au_nb("en colorie 6")
        self.play(LaggedStart(*[c8.parts[i].animate.set_fill(BLEU_PART, 1) for i in range(6)], lag_ratio=0.15),
                  run_time=0.8)
        e = self.inline("Quelle fraction ?", 36, AMBRE).move_to(P(0, Y1))
        self.au_mot("Quelle fraction")
        self.play(FadeIn(e, scale=1.1), run_time=0.3)
        self.appel_commentaire(y=Y2 - 0.1)
