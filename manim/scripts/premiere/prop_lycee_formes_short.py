# prop_lycee_formes_short.py
# EleveAI — Maths 1re et STMG (automatismes) — short jumeau de l'épisode
# COMMUN 02 « Une proportion, trois écritures » (micro auto_prop_formes, notion
# auto_proportion). CEINTURE BLANCHE (règle du short blanc, REGLES.md), rendu
# UNE fois et copié sous les deux noms (1re, STMG). Il AMUSE : « Trouve l'intrus ! »
#   · EN HAUT, le jeu : 4 cartes (1/2, 0,5, 5 %, 50 %) ; les trois égales
#     s'allument en vert, l'intrus 5 % devient ROUGE et TOMBE ;
#   · EN BAS, au même instant, la grille de 100 cases : 50 cases bleues
#     (1/2 = 0,5 = 50 %) ; 5 % = 0,05 : dix fois moins (5 cases rouges) ;
#   · 1 question-pause (3 s) : l'intrus parmi 3/4, 0,75, 7,5 % (C) ;
#   · fin : l'intrus parmi 1/5, 0,2, 20 %, 0,5, 2/10 (0,5) en commentaire.
# Centre d'intérêt : jeux-defis. Chiffres : aucun fait réel, pas de source.
#
# Voix : manim/voix/lycee-prop-formes-short.json (validée par Frédéric le
# 02/11, débit −10) ; WAV : public/sons/lycee-prop-formes-short/ ; marques :
# manim/scripts/premiere/prop_lycee_formes_short_marques.json.
# Outils (non modifiés) : prop_commun.py (ShortProp), canvas_fractions
# (EcritureFraction). Ajouté ICI : carte_jeu(), grille_short().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/prop_lycee_formes_short.py PropLyceeFormesShort
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/prop_lycee_formes_short.py PropLyceeFormesShort -o eleveai-maths-premiere-prop-formes-short --media_dir manim/scripts/premiere/media-prop-lycee-formes-short
# Sorties (le même fichier, copié) :
#   manim/sorties/premiere/maths/proportionnalite/02-formes/eleveai-maths-premiere-prop-formes-short.mp4
#   manim/sorties/stmg/maths/proportionnalite/02-formes/eleveai-maths-stmg-prop-formes-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403

BLEU = "#38bdf8"       # les cases de 1/2 = 0,5 = 50 % (bleu clair)
ROUGE = "#ef4444"      # l'intrus
FOND_C = "#0f172a"
CASE_VIDE = "#f8fafc"


def carte_jeu(contenu, centre, l=1.8, h=0.95):
    """Une carte du jeu : cadre gris, contenu (Text ou fraction) au centre."""
    c = RoundedRectangle(width=l, height=h, corner_radius=0.14, stroke_color=GREY_B, stroke_width=4,
                         fill_color=FOND_C, fill_opacity=1).move_to(centre)
    contenu.move_to(c)
    g = VGroup(c, contenu)
    g.cadre, g.contenu = c, contenu
    return g


def grille_short(cote=0.17, centre=ORIGIN):
    """La grille de 100 cases du coach (carte blanche), cases vides."""
    cases = VGroup(*[Square(cote, fill_color=CASE_VIDE, fill_opacity=1, stroke_color="#0f172a", stroke_width=1.2)
                     .move_to(P((i % 10 - 4.5) * cote, (4.5 - i // 10) * cote)) for i in range(100)])
    carte = RoundedRectangle(width=10 * cote + 0.24, height=10 * cote + 0.24, corner_radius=0.12,
                             fill_color=WHITE, fill_opacity=1, stroke_width=0)
    g = VGroup(carte, cases).move_to(centre)
    g.cases = cases
    return g


class PropLyceeFormesShort(ShortProp):
    nom_voix = "lycee-prop-formes-short"
    fichier_marques = "prop_lycee_formes_short_marques.json"
    ceinture = "blanche"

    def fr_(self, n, d, fs=40, couleur=WHITE):
        return EcritureFraction(n, d, fs=fs, couleur=couleur)

    def _rep_q(self, sc):
        l0 = sc.ligne_rep(0, ["3/4 =", "0,75", "= 75 %."])
        l1 = sc.ligne_rep(1, ["7,5 % =", "0,075."])
        sc.au_mot("3 sur 4")
        sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.35)
        sc.au_mot("0,75")
        sc.play(FadeIn(l0[1], scale=1.3), run_time=0.3)
        sc.au_mot("soit 75")
        sc.play(FadeIn(l0[2], scale=1.3), run_time=0.35)
        sc.au_mot("7,5 %, c'est")
        sc.play(FadeIn(l1[0], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("0,075")
        sc.play(FadeIn(l1[1], scale=1.3), run_time=0.35)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Trouve l'intrus !", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche : les 4 cartes, chacune à son mot ──
        self.dire("00-accroche")
        self.au_mot("Trouve")
        self.play(Write(titre), run_time=0.5)
        pos = [P(-1.05, 1.45), P(1.05, 1.45), P(-1.05, 0.3), P(1.05, 0.3)]
        contenus = [self.fr_(1, 2, 38), Text("0,5", font_size=44, weight=BOLD), Text("5 %", font_size=44, weight=BOLD),
                    Text("50 %", font_size=44, weight=BOLD)]
        for c in contenus:
            if c.width > 1.45:
                c.scale_to_fit_width(1.45)
        cartes = [carte_jeu(c, p) for c, p in zip(contenus, pos)]
        for k, mot in zip(cartes, ["2. 0,5", "0,5", "5 %", "50 %"]):  # la fraction au « 2 »
            self.au_mot(mot)
            self.play(FadeIn(k.cadre, scale=0.8), FadeIn(k.contenu, scale=1.3), run_time=0.3)
        self.play(*[Wiggle(k, scale_value=1.06, rotation_angle=0.04) for k in cartes], run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : 1/2 = 0,5 = 50 % (vert, 50 cases) ; 5 % rouge, tombe : 0,05 ──
        self.dire("01-image")
        gr = grille_short(0.17, P(-0.95, -1.45))
        self.au_mot("1 sur 2")
        self.play(cartes[0].cadre.animate.set_stroke(VERT_OK, 6), FadeIn(gr, shift=UP * 0.2), run_time=0.35)
        self.au_mot("0,5")
        self.play(cartes[1].cadre.animate.set_stroke(VERT_OK, 6), run_time=0.3)
        self.au_mot("50 %")
        self.play(cartes[3].cadre.animate.set_stroke(VERT_OK, 6),
                  LaggedStart(*[gr.cases[i].animate.set_fill(BLEU, 1) for i in range(50)], lag_ratio=0.02),
                  run_time=0.7)
        intrus = cartes[2]
        self.au_mot("L'intrus")
        self.play(intrus.cadre.animate.set_stroke(ROUGE, 7), intrus.contenu.animate.set_color(ROUGE), run_time=0.3)
        self.play(intrus.animate.rotate(-0.25).move_to(P(1.1, -0.8)), run_time=0.6, rate_func=rush_into)
        t05 = Text("= 0,05", font_size=34, color=ROUGE, weight=BOLD).move_to(P(1.1, -1.95))
        self.au_mot("0,05")
        self.play(FadeIn(t05, scale=1.3), *[gr.cases[i].animate.set_fill(ROUGE, 1) for i in range(5)],
                  run_time=0.4)
        dix = Text("dix fois moins !", font_size=32, color=AMBRE, weight=BOLD).move_to(P(0, -2.75))
        self.au_mot("dix fois")
        self.play(FadeIn(dix, scale=1.2), Indicate(VGroup(*gr.cases[:5]), color=ROUGE, scale_factor=1.4),
                  run_time=0.45)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 02 : la question-pause (3 s) : l'intrus parmi 3/4, 0,75, 7,5 % ──
        choix = [self.t("3/4", 30), self.t("0,75", 30), self.t("7,5 %", 30)]
        for c in choix:  # audités à la question ; à la réponse, les cartes ne font que pâlir
            for f in c.get_family():
                f._pas_audit = True
        self.question_pause("02-question", "02b-reponse", ["Trouve l'intrus :"],
                            choix, 2,
                            ["3/4 = 0,75 = 75 %.", "7,5 % = 0,075."], mot_q="Trouve",
                            autres_r=self._rep_q)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question en commentaire : 1/5, 0,2, 20 %, 0,5, 2/10 ──
        self.dire("03-commentaire")
        q = self.t("À toi : trouve l'intrus !", 30, AMBRE).move_to(P(0, 2.2))
        if q.width > 3.9:
            q.scale_to_fit_width(3.9)
        self.au_mot("À toi")
        self.play(FadeIn(q, shift=DOWN * 0.2), run_time=0.35)
        pos = [P(-1.36, 1.1), P(0, 1.1), P(1.36, 1.1), P(-0.7, -0.1), P(0.7, -0.1)]
        contenus = [self.fr_(1, 5, 32), Text("0,2", font_size=36, weight=BOLD), Text("20 %", font_size=36, weight=BOLD),
                    Text("0,5", font_size=36, weight=BOLD), self.fr_(2, 10, 32)]
        for c, p, mot in zip(contenus, pos, ["5. 0,2", "0,2", "20 %", "0,5", "10. Réponds"]):
            if c.width > 1.0:
                c.scale_to_fit_width(1.0)
            k = carte_jeu(c, p, l=1.2, h=0.95)
            self.au_mot(mot)
            self.play(FadeIn(k.cadre, scale=0.8), FadeIn(k.contenu, scale=1.3), run_time=0.3)
        self.appel_commentaire(y=-1.5)
