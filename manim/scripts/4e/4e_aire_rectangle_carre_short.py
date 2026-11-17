# 4e_aire_rectangle_carre_short.py
# EleveAI — Maths 4e — SHORT de l'épisode A1 « l'aire d'un rectangle et d'un carré ».
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : deux téléphones au même prix, 16 × 7 et 15 × 8 —
# lequel a le plus grand écran ? Réponse C (le deuxième : 120 cm² contre 112).
# ⛔ La phrase de réponse ne porte que les nombres dits APRÈS le premier point de la voix
#    (15, 8, 120) : « 16 », « 7 » et « 112 » sont dits avant.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_aire_rectangle_carre_short.py ShortAireRectangleCarre4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

AIRE_C, AIRE_B = "#38bdf8", "#0c4a6e"
BOITIER = "#1e293b"


def telephone(l, h, u, o=ORIGIN, sw=3):
    """Un téléphone vu de face : le boîtier et l'écran. o = le centre. Attributs : .ecran"""
    L, H = l * u, h * u
    boit = RoundedRectangle(width=L * 1.2, height=H * 1.1, corner_radius=0.1,
                            fill_color=BOITIER, fill_opacity=1, stroke_color="#64748b",
                            stroke_width=sw).move_to(o)
    ecr = Rectangle(width=L, height=H, fill_color=AIRE_C, fill_opacity=0.5, stroke_color=AIRE_B,
                    stroke_width=sw).move_to(o)
    g = VGroup(boit, ecr)
    g.boitier, g.ecran, g.o = boit, ecr, o
    return g


class ShortAireRectangleCarre4e(Short4e):
    nom_voix = "4e-aire-rectangle-carre-short"
    fichier_marques = "4e_aire_rectangle_carre_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : deux téléphones, même prix ────────────────────────────────
        self.dire("00-accroche")
        self.au_mot("Deux téléphones")
        tit = self.grand("Le plus grand écran", font_size=30, color=JAUNE_TITRE).move_to(P(0, 3.3))
        u = 0.13
        t1 = telephone(7, 16, u, P(-1.0, 0.5))
        t2 = telephone(8, 15, u, P(1.0, 0.5))
        self.play(FadeIn(tit), FadeIn(self.echelle_short()), FadeIn(t1, scale=0.9),
                  FadeIn(t2, scale=0.9), run_time=0.9)
        self.au_mot("même prix")
        prix = self.t("même prix", 26, JAUNE_TITRE).move_to(P(0, Y_ACCROCHE))
        self.play(FadeIn(prix), run_time=0.4)
        # ⛔ Un nombre par morceau, posé à SON mot : « 16 × 7 » d'un bloc écrivait le 7
        #    1,4 s avant qu'il soit dit.
        e1 = VGroup(self.t("16", 26, BASE_C), self.t("× 7", 26, BASE_C)).arrange(RIGHT, buff=0.12)
        e1.next_to(t1, DOWN, buff=0.18)
        self.au_mot("16 centimètres")
        self.play(FadeIn(e1[0]), run_time=0.35)
        self.au_mot("7,")
        self.play(FadeIn(e1[1]), run_time=0.35)
        e2 = VGroup(self.t("15", 26, BASE_C), self.t("× 8", 26, BASE_C)).arrange(RIGHT, buff=0.12)
        e2.next_to(t2, DOWN, buff=0.18)
        self.au_mot("15 sur")
        self.play(FadeIn(e2[0]), run_time=0.35)
        self.au_mot("8.")
        self.play(FadeIn(e2[1]), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("Le premier est plus long")
        self.play(Indicate(t1, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.7)
        self.au_mot("lequel a le plus grand écran")
        q = self.accroche("le plus grand écran ?", fs=26, couleur=JAUNE_TITRE, y=-1.9)
        self.play(FadeIn(q), run_time=0.45)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse C ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["Le plus grand écran ?"],
                            ["le premier", "les deux pareil", "le deuxième"], 2,
                            [["Le deuxième :", "15", "× 8"], ["= 120 cm²."],
                             "Le plus long n'est pas le plus grand."],
                            x_col=0.0)

        # ── 03 : plus long, moins de surface ───────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Plus long", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        u = 0.14
        t1 = telephone(7, 16, u, P(-1.0, 1.1))
        t2 = telephone(8, 15, u, P(1.0, 1.1))
        self.add(t1, t2)
        self.add(sans_audit(self.t("112 cm²", 24, AIRE_C)).next_to(t1, DOWN, buff=0.15))
        self.add(sans_audit(self.t("120 cm²", 24, VERT_OK)).next_to(t2, DOWN, buff=0.15))
        self.au_mot("Plus long")
        fl = Arrow(t1.ecran.get_bottom() + DOWN * 0.05, t1.ecran.get_top() + UP * 0.05,
                   buff=0, color=JAUNE_TITRE, stroke_width=5)
        self.play(GrowArrow(fl), run_time=0.7)
        self.au_mot("moins de surface")
        self.play(Indicate(t2.ecran, color=VERT_OK, scale_factor=1.12), run_time=0.8)
        res = self.t("moins de surface", 28, ROUGE_ERREUR).move_to(P(0, -1.6))
        self.play(FadeIn(res, scale=1.15), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        t3 = telephone(9, 14, 0.16, P(0, 0.8))
        self.au_mot("un écran")
        self.play(FadeIn(t3, scale=0.9), run_time=0.6)
        e3 = VGroup(self.t("14", 30, BASE_C), self.t("× 9", 30, BASE_C)).arrange(RIGHT, buff=0.14)
        e3.move_to(P(0, -1.2))
        self.au_mot("14 centimètres")
        self.play(FadeIn(e3[0], scale=1.1), run_time=0.4)
        self.au_mot("9.")
        self.play(FadeIn(e3[1], scale=1.1), run_time=0.4)
        self.au_mot("Quelle est son aire")
        qa = self.t("son aire ?", 30, AIRE_C).move_to(P(0, -2.1))
        self.play(FadeIn(qa, scale=1.15), run_time=0.45)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.9)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
