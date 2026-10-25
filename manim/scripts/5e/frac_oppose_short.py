# frac_oppose_short.py
# EleveAI — Maths 5e — short jumeau de l'épisode 05 « L'opposé d'une fraction »
# (micro fraction_oppose). CEINTURE BLANCHE (règle du short blanc, REGLES.md) :
# on VOIT l'opposé (même saut, de l'autre côté), aucun calcul posé.
# Il AMUSE : « Où retombe-t-il ? » Emma, GUIDE en Australie, observe un kangourou :
#   · EN HAUT, l'image qui bouge : le kangourou saute de 2/3 m vers la droite,
#     puis de 2/3 m vers la gauche ;
#   · EN BAS, au même instant, la droite graduée du coach (de −1 à 1, en
#     tiers) : +2/3 puis −2/3 → retour au 0 ; 2/3 + (−2/3) = 0 (même code
#     couleur : vert = vers la droite, orange = vers la gauche) ;
#   · 1 question-pause (3 s) : l'opposé de −4/5 → 4/5 (leurres : −5/4, 5/4) ;
#   · fin : « l'opposé de l'opposé de −3/8 ? » en commentaire (−3/8).
# Centres d'intérêt : animaux, jeux-defis. Aucune donnée réelle citée.
# Vérifié (Python) : 2/3 + (−2/3) = 0 ; −(−4/5) = 4/5 ; −(−(−3/8)) = −3/8.
#
# Bases : 5e/frac_lotg_commun.py (ShortG ← 4e/frac_lotd_commun.py ; moins_frac).
# Voix : manim/voix/5e-frac-oppose-short.json (débit −10) ; marques :
# manim/scripts/5e/frac_oppose_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/5e/frac_oppose_short.py FracOpposeShort5e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/frac_oppose_short.py FracOpposeShort5e -o eleveai-maths-5e-frac-oppose-short --media_dir manim/scripts/5e/media-frac-oppose-short
# Sortie : manim/sorties/5e/maths/fractions/05-oppose/eleveai-maths-5e-frac-oppose-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotg_commun import *  # noqa: E402,F403

DROITE_C, GAUCHE_C = VERT_PART, ORANGE_PART
FOURRURE = "#b45309"
Y_SOL, Y_DR = 1.3, -0.5
LONG = 2.9


def kangourou(s=1.0):
    """Un kangourou de profil (tourné vers la droite)."""
    corps = Ellipse(width=0.55, height=0.8, fill_color=FOURRURE, fill_opacity=1, stroke_width=0).rotate(-0.3)
    queue = Polygon(P(-0.2, -0.25), P(-0.75, -0.45), P(-0.15, -0.4), fill_color=FOURRURE, fill_opacity=1,
                    stroke_width=0)
    tete = Ellipse(width=0.36, height=0.24, fill_color=FOURRURE, fill_opacity=1, stroke_width=0).move_to(P(0.3, 0.45))
    oreilles = VGroup(*[Ellipse(width=0.08, height=0.24, fill_color=FOURRURE, fill_opacity=1, stroke_width=0)
                        .move_to(P(x, 0.62)) for x in (0.2, 0.28)])
    patte = Ellipse(width=0.4, height=0.12, fill_color="#92400e", fill_opacity=1, stroke_width=0).move_to(P(0.1, -0.42))
    oeil = Dot(P(0.36, 0.48), radius=0.03, color="#111827")
    return VGroup(queue, corps, patte, tete, oreilles, oeil).scale(s)


class FracOpposeShort5e(ShortG):
    nom_voix = "5e-frac-oppose-short"
    fichier_marques = "frac_oppose_short_marques.json"
    ceinture = "blanche"

    def droite(self, n=6):
        d = Droite(-1, 1, n, etiquettes={-1: "−1", 0: "0", 1: "1"}, longueur=LONG, marge=0.25, fs=30,
                   centre=P(0, Y_DR))
        for t in d.get_family():
            if isinstance(t, Text):
                t._pas_audit = True
        return d

    def sauter(self, k, x1, couleur, run_time=1.0):
        """Le kangourou saute jusqu'à x1 (une parabole), une trace colorée au sol."""
        x0 = k.get_x()
        arc = ArcBetweenPoints(P(x0, Y_SOL + 0.45), P(x1, Y_SOL + 0.45), angle=-PI / 1.6 if x1 > x0 else PI / 1.6)
        trace = Line(P(x0, Y_SOL - 0.05), P(x1, Y_SOL - 0.05), color=couleur, stroke_width=8)
        return AnimationGroup(MoveAlongPath(k, arc), Create(trace), run_time=run_time), trace

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Où retombe-t-il ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : les deux sauts ──
        self.dire("00-accroche")
        self.au_mot("Emma")
        nm = self.bloc(["Emma, guide", "en Australie"], 30, BLEU_CALCUL).move_to(P(0, -2.2))
        self.play(FadeIn(nm, scale=0.8), run_time=0.4)
        sol = Line(P(-2.0, Y_SOL), P(2.0, Y_SOL), color="#a16207", stroke_width=6)
        k = kangourou(0.9).move_to(P(0, Y_SOL + 0.45))
        d = self.droite()
        self.au_mot("un kangourou")
        self.play(Create(sol), FadeIn(k, shift=UP * 0.2), FadeIn(d), run_time=0.6)
        x23 = d.p(2 / 3)[0]
        saut1, tr1 = self.sauter(k, x23, DROITE_C)
        p1 = d.point(2 / 3, "2/3", couleur=DROITE_C, fs=28)
        self.au_nb("saute de 2")
        self.play(saut1, FadeIn(p1, shift=DOWN * 0.2), FadeOut(nm))
        saut2, tr2 = self.sauter(k, d.p(0)[0], GAUCHE_C)
        self.au_mot("vers la gauche")
        self.play(saut2, Flash(d.p(0), color=GAUCHE_C))
        self.au_mot("Où retombe")
        self.play(Write(titre), run_time=0.7)
        self.attendre_voix(marge=0.2)
        self.ecran1(d, k, p1, garder)

    def ecran1(self, d, k, p1, garder):
        # ── 01 : +2/3 puis −2/3 → 0 ──
        self.dire("01-saut")
        s1 = self.morceaux([("+", DROITE_C, None), (EcritureFraction(2, 3, fs=40, couleur=DROITE_C), WHITE, None)], fs=40)
        s2 = self.morceaux([(moins_frac(2, 3, fs=40, couleur=GAUCHE_C), WHITE, None)], fs=40)
        VGroup(s1, s2).arrange(RIGHT, buff=1.2).move_to(P(0, -2.3))
        self.au_nb("saut : plus 2")
        a1 = CurvedArrow(d.p(0) + UP * 0.25, d.p(2 / 3) + UP * 0.25, angle=-TAU / 6, color=DROITE_C, stroke_width=6)
        self.play(FadeIn(s1, scale=1.2), Create(a1), run_time=0.5)
        self.au_nb("saut : moins 2")
        pm = d.point(-2 / 3, "−2/3", couleur=GAUCHE_C, fs=28)
        a2 = CurvedArrow(d.p(2 / 3) + DOWN * 0.15, d.p(0) + DOWN * 0.15, angle=-TAU / 6, color=GAUCHE_C,
                         stroke_width=6)
        self.play(FadeIn(s2, scale=1.2), Create(a2), run_time=0.3)
        somme = self.L([(EcritureFraction(2, 3, fs=38), WHITE, "tiers. 2"), ("+", WHITE, "plus moins"),
                ("(", WHITE, None), (moins_frac(2, 3, fs=38), WHITE, ("moins 2", 2)), (")", WHITE, None),
                ("= 0", VERT_OK, "égale 0")], -2.3, fs=38, avec={0: [FadeOut(VGroup(s1, s2))]})
        self.au_mot("pile au départ")
        self.play(Flash(d.p(0), color=VERT_OK), Indicate(k, color=VERT_OK), run_time=0.6)
        self.au_nb("et moins 2")
        self.play(FadeIn(pm, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("sont opposés")
        op = self.borne(self.t("2/3 et −2/3 : opposés !", 30, VERT_OK), 0.6).move_to(P(0, -2.3))
        op.sans_synchro = True
        op._pas_audit = True
        self.play(FadeOut(somme), FadeIn(op, scale=1.2), run_time=0.4)
        self.attendre_voix(marge=0.3)
        self.vider(garder)
        self.ecran2(garder)

    def ecran2(self, garder):
        # ── 02 : la question-pause (3 s) ──
        def avant(sc):
            sc.au_nb("à moins 4")
            sans_synchro(sc.q_q[0])
            sc.q_tete()

        def apres(sc):
            sc.rep_mots(0, [("On change le signe :", None, "On change"), ("4/5", None, "signe : 4")])
            sc.rep_mots(1, [("de l'autre côté du", None, "de l'autre côté"), ("0", None, "côté du 0")])
            sc.fin_rep()

        self.question_pause("02-question", "02b-reponse", ["Le kangourou est à −4/5.", "Où est son opposé ?"],
                            [self.inline("4/5", 30), self.inline("−5/4", 30), self.inline("5/4", 30)], 0,
                            ["On change le signe : 4/5", "de l'autre côté du 0"], avant_q=avant,
                            autres_r=apres)
        self.vider(garder)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        d = Droite(-1, 1, 16, etiquettes={-1: "−1", 0: "0", 1: "1"}, longueur=LONG, marge=0.25, fs=30,
                   centre=P(0, 1.05))
        for t in d.get_family():
            if isinstance(t, Text):
                t._pas_audit = True
        p = d.point(-3 / 8, "−3/8", couleur=GAUCHE_C, fs=28)
        self.au_mot("l'opposé de l'opposé")
        l1 = self.bloc(["l'opposé", "de l'opposé de"], 34, WHITE).move_to(P(0, -0.8))
        sans_synchro(l1)
        self.play(FadeIn(d), FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_nb("moins 3")
        f = moins_frac(3, 8, fs=46, couleur=GAUCHE_C)
        g = VGroup(f, Text("?", font_size=46, color=ORANGE_RETENUE)).arrange(RIGHT, buff=0.25).move_to(P(0, -2.0))
        sans_synchro(g)
        self.play(FadeIn(g, scale=1.2), FadeIn(p, shift=DOWN * 0.2), run_time=0.4)
        self.appel_commentaire(y=-2.8)
