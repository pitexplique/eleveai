# frac_additionner_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 06 « Additionner des
# fractions » (micro fraction_additionner). CEINTURE JAUNE : on VOIT la somme
# (un carré qui se remplit de moitiés), mais il faut ajouter six fractions de
# dénominateurs différents et tout écrire en 64es : plus qu'un short blanc.
# Il AMUSE : « Le blé des scribes ». Nour, ÉGYPTOLOGUE, étudie des tablettes
# de bois où les scribes partageaient le blé (le hekat) en moitiés :
#   · EN HAUT, l'image qui bouge : un sac de blé qui se vide dans le boisseau,
#     le niveau monte à chaque morceau ;
#   · EN BAS, au même instant, le carré « 1 hekat » se remplit : 1/2, 1/4, 1/8,
#     1/16, 1/32, 1/64 (chaque morceau = la moitié de ce qui reste) ;
#   · 1 question-pause (3 s) : 1/2 + 1/4 = ? (leurre 2/6 : on ajoute les bas) ;
#   · tout en 64es : 32 + 16 + 8 + 4 + 2 + 1 = 63 → SURPRISE : il manque 1/64 !
#     (le reste se comptait en ro, 1 hekat = 320 ro) ;
#   · commentaire : « 1/2 + 1/4 + 1/8 = ? » (7/8).
# Données réelles (WebSearch, 25/10/2026) : tablettes d'Akhmim (Moyen Empire,
# vers 2000 av. J.-C., ≈ 4 000 ans), divisions du hekat en 1/2 … 1/64 et
# reste en ro (1/320 de hekat) — fr/en.wikipedia.org « Akhmim wooden tablets »,
# math.libretexts.org « Prelude to Fractions – Egyptian Math ». On ne relie
# PAS ces fractions à l'œil d'Horus (lien contesté, dcode.fr).
# Vérifié (Python) : 1/2 + 1/4 + 1/8 + 1/16 + 1/32 + 1/64 = 63/64 ;
# 1/2 + 1/4 = 3/4 ; 1/2 + 1/4 + 1/8 = 7/8.
# Centres d'intérêt : histoire-geographie, jeux-defis.
#
# Voix : manim/voix/4e-frac-additionner-short.json (débit −10) ; marques :
# manim/scripts/4e/frac_additionner_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/frac_additionner_short.py FracAdditionnerShort4e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/frac_additionner_short.py FracAdditionnerShort4e -o eleveai-maths-4e-frac-additionner-short --media_dir manim/scripts/4e/media-frac-additionner-short
# Sortie : manim/sorties/4e/maths/fractions/06-additionner/eleveai-maths-4e-frac-additionner-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lote_commun import *  # noqa: E402,F403

BLE = "#eab308"
TEINTES = ["#f59e0b", "#38bdf8", "#4ade80", "#fb923c", "#a78bfa", "#f472b6"]
S = 2.9                     # le côté du carré « 1 hekat »
C = P(-0.35, -1.05)         # son centre
NOMS = ["1/2", "1/4", "1/8", "1/16", "1/32", "1/64"]
MOTS = ["1 demi", "Plus 1 quart", "Plus 1 huitième", "Plus 1 seizième", "Plus 1 trente-deuxième",
        "Plus 1 soixante-quatrième"]
SOIX = [32, 16, 8, 4, 2, 1]


def morceaux():
    """Les six morceaux : chacun la moitié de ce qui reste (x0, x1, y0, y1 en fractions de S)."""
    h = 0.5
    boites = [(-h, 0, -h, h), (0, h, 0, h), (0, h / 2, -h, 0), (h / 2, h, -h / 2, 0), (h / 2, 3 * h / 4, -h, -h / 2),
              (3 * h / 4, h, -3 * h / 4, -h / 2)]
    out = VGroup()
    for (x0, x1, y0, y1), c in zip(boites, TEINTES):
        r = Rectangle(width=(x1 - x0) * S, height=(y1 - y0) * S, fill_color=c, fill_opacity=1, stroke_color=BORD,
                      stroke_width=3).move_to(C + P((x0 + x1) / 2 * S, (y0 + y1) / 2 * S))
        out.add(r)
    trou = Rectangle(width=S / 8, height=S / 8, fill_color=VIDE, fill_opacity=1, stroke_color=BORD,
                     stroke_width=3).move_to(C + P(7 * S / 16, -7 * S / 16))
    return out, trou


def nour(s=0.55):
    p = personne(peau="#c68642", tenue="#0e7490", cheveux="#111827", longs=True, s=s)
    return p


def tablette():
    t = RoundedRectangle(width=1.5, height=0.95, corner_radius=0.08, fill_color="#92400e", fill_opacity=1,
                         stroke_color="#451a03", stroke_width=3)
    traits = VGroup(*[Line(P(-0.55, y), P(0.55, y), stroke_color="#fde68a", stroke_width=3) for y in (0.25, 0, -0.25)])
    signes = VGroup(*[Circle(radius=0.06, stroke_color="#fde68a", stroke_width=3).move_to(P(x, 0.25))
                      for x in (-0.3, 0.2)])
    return VGroup(t, traits.move_to(t), signes.move_to(t).shift(UP * 0.13))


def boisseau():
    """Le récipient « 1 hekat » (contour) en haut : .corps."""
    corps = Polygon(P(-0.55, 0.6), P(0.55, 0.6), P(0.42, -0.6), P(-0.42, -0.6), stroke_color="#cbd5e1",
                    stroke_width=4, fill_opacity=0)
    g = VGroup(corps)
    g.corps = corps
    return g


def grain(bs, v):
    """Le blé dans le boisseau, jusqu'à la fraction v de sa hauteur (rectangle simple)."""
    c = bs.corps
    H = c.height - 0.08
    r = Rectangle(width=0.8, height=max(0.001, H * v), fill_color=BLE, fill_opacity=0.95, stroke_width=0)
    return r.move_to(P(c.get_x(), c.get_bottom()[1] + 0.04 + H * v / 2))


def etiq(s, fs, couleur=NUIT):
    t = Text(s, font_size=fs, color=couleur, weight=BOLD)
    t.sans_synchro = True
    return t


class FracAdditionnerShort4e(ShortE):
    nom_voix = "4e-frac-additionner-short"
    fichier_marques = "frac_additionner_short_marques.json"
    ceinture = "jaune"

    def carre(self):
        fond = Square(side_length=S, fill_color=VIDE, fill_opacity=1, stroke_color=BORD, stroke_width=4).move_to(C)
        carte = RoundedRectangle(width=S + 0.3, height=S + 0.3, corner_radius=0.18, fill_color=CARTE, fill_opacity=1,
                                 stroke_color=GRILLE, stroke_width=3).move_to(C)
        return VGroup(carte, fond)

    def etiquettes(self, ms, textes, fss):
        out = VGroup()
        for i, (m, s, fs) in enumerate(zip(ms, textes, fss)):
            e = etiq(s, fs)
            if i < 4:
                e.move_to(m)
            else:  # trop petit : dehors, à droite, avec un trait
                y = m.get_y() + (0.05 if i == 4 else -0.05)
                e.move_to(P(C[0] + S / 2 + 0.5, y + (0.25 if i == 4 else -0.3))).set_color(WHITE)
                e.add(Line(m.get_center(), e.get_left() + LEFT * 0.05, stroke_color=WHITE, stroke_width=2))
            out.add(e)
        return out

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le blé des scribes", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Nour et les tablettes ──
        self.dire("00-accroche")
        n = nour(0.75).move_to(P(-0.95, 0.15))
        self.au_mot("Nour")
        nm = self.bloc(["Nour,", "égyptologue"], 30, BLEU_CALCUL).next_to(n, DOWN, buff=0.2).set_x(-0.7)
        self.play(FadeIn(n, shift=UP * 0.2), FadeIn(nm[0]), run_time=0.4)
        self.au_mot("égyptologue")
        self.play(FadeIn(nm[1], shift=UP * 0.1), run_time=0.3)
        tb = tablette().move_to(P(1.05, 0.45))
        self.au_mot("tablettes de bois")
        self.play(FadeIn(tb, scale=0.7), run_time=0.4)
        age = self.inline("4 000 ans", 30, AMBRE).next_to(tb, DOWN, buff=0.2)
        self.au_nb("vieilles de 4")
        self.play(FadeIn(age, scale=1.3), run_time=0.3)
        self.au_mot("Les scribes")
        self.play(Write(titre), run_time=0.7)
        self.au_mot("en moitiés")
        self.play(Indicate(tb, color=AMBRE), run_time=0.5)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 01 : le hekat se remplit de moitiés ──
        self.dire("01-hekat")
        bs = boisseau().move_to(P(-1.1, 1.5))
        car = self.carre()
        ms, trou = morceaux()
        labs = self.etiquettes(ms, NOMS, [40, 34, 26, 22, 22, 22])
        self.au_mot("1 hekat")
        un = self.inline("1 hekat", 32, BLE).move_to(P(0.9, 1.5))
        self.play(FadeIn(bs), FadeIn(car), FadeIn(trou), FadeIn(un, shift=LEFT * 0.1), run_time=0.5)
        tot = 0
        for i, mot in enumerate(MOTS):
            self.au_nb(mot)
            g = grain(bs, tot + 1 / 2 ** (i + 1))
            tot += 1 / 2 ** (i + 1)
            self.play(FadeIn(ms[i], scale=0.9), FadeIn(labs[i]), FadeIn(g), run_time=0.35)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["1 demi + 1 quart,", "ça fait combien ?"],
                            [self.inline("2/6", 30), self.inline("3/4", 30), self.inline("1/3", 30)], 1,
                            ["1/2 = 2/4", "2/4 + 1/4 = 3/4"], mot_q="1 demi")
        self.vider(garder)

        # ── 03 : tout en 64es : 32 + 16 + 8 + 4 + 2 + 1 = 63 ──
        self.dire("03-total")
        car = self.carre()
        ms, trou = morceaux()
        self.au_mot("les six morceaux")
        self.play(FadeIn(car), FadeIn(ms), FadeIn(trou), run_time=0.5)
        nbs = self.etiquettes(ms, [str(k) for k in SOIX], [44, 38, 30, 26, 24, 24])
        lg = self.ligne([("32", TEINTES[0]), ("+ 16", TEINTES[1]), ("+ 8", TEINTES[2]), ("+ 4", TEINTES[3]),
                         ("+ 2", TEINTES[4]), ("+ 1", TEINTES[5]), ("= 63", VERT_OK)], 38, buff=0.1)
        lg[:6].arrange(RIGHT, buff=0.12)
        lg[:6].scale_to_fit_width(min(lg[:6].width, 3.9)).move_to(P(0, 1.75))
        lg[6].next_to(lg[:6], DOWN, buff=0.18)
        for m in lg:
            m.sans_synchro = True
        for i, mot in enumerate(["quatrièmes : 32", "plus 16", "plus 8", "plus 4", "plus 2", "plus 1,"]):
            self.au_nb(mot)
            self.play(FadeIn(lg[i], scale=1.3), FadeIn(nbs[i], scale=1.3), Indicate(ms[i], scale_factor=1.05),
                      run_time=0.3)
        self.au_nb("égale 63")
        self.play(FadeIn(lg[6], scale=1.3), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 04 : la surprise : il manque 1/64 ──
        self.dire("04-surprise")
        res = self.inline("63/64", 50, VERT_OK).move_to(P(0, 1.7))
        self.au_nb("Surprise : 63")
        self.play(FadeOut(lg), FadeIn(res, scale=1.4), run_time=0.4)
        self.au_mot("Il manque")
        q = etiq("?", 26, ROUGE_ERREUR).move_to(trou)
        self.play(Flash(trou, color=ROUGE_ERREUR, line_length=0.25), FadeIn(q), run_time=0.5)
        self.au_nb("Il manque 1")
        manque = self.inline("Il manque 1/64 !", 30, ROUGE_ERREUR).move_to(P(0, 0.95))
        self.play(FadeIn(manque, scale=1.2), trou.animate.set_fill(ROUGE_COACH, 1), run_time=0.4)
        self.insister(manque, 1.15)
        self.au_mot("le ro")
        ro = self.t("→ le « ro »", 28, AMBRE).next_to(trou, RIGHT, buff=0.15)
        if ro.get_right()[0] > 2.05:
            ro.shift(LEFT * (ro.get_right()[0] - 2.05))
        ro.set_y(trou.get_y() - 0.45)
        self.play(FadeIn(ro, shift=LEFT * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 05 : la question en commentaire ──
        self.dire("05-question")
        e = expression((1, 2), "+", (1, 4), "+", (1, 8), "=", "?", fs=40)
        e.scale_to_fit_width(min(e.width, 3.8)).move_to(P(0, 0.9))
        e[6].set_color(AMBRE)
        b = Barre(8, 0, largeur=3.6, hauteur=0.5, couleur=TEINTES[0], marge=0.12, centre=P(0, -0.35))
        self.play(b.apparaitre(0.4), run_time=0.4)
        self.au_mot("1 demi")
        self.play(FadeIn(e[0], scale=1.3), b.colorier(range(4), lag=0.05, run_time=0.3), run_time=0.35)
        self.au_nb("plus 1 quart")
        self.play(FadeIn(e[1:3], scale=1.3), b.colorier([4, 5], couleur=TEINTES[1], run_time=0.3), run_time=0.35)
        self.au_nb("plus 1 huitième")
        self.play(FadeIn(e[3:5], scale=1.3), b.colorier([6], couleur=TEINTES[2], run_time=0.3), run_time=0.35)
        self.au_mot("combien")
        self.play(FadeIn(e[5:], scale=1.3), run_time=0.35)
        self.insister(e[6], 1.5)
        self.appel_commentaire(y=-1.55)
