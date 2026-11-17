# 4e_aire_defi_short.py
# EleveAI — Maths 4e — SHORT de l'épisode A5 « défis sur les aires » (micro aire_defi).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : 18 flocages de 563 cm², ça fait combien de mètres carrés ?
# Réponse B (à peine plus d'un mètre carré : 10 134 cm² contre 10 000).
# ⛔ Dans un short, l'audit efface l'espace des milliers : « 10 000 » devient « 10000 »,
#    introuvable dans la voix (AUDIT-ABSENT toléré). Le morceau est donc posé par le mot qui
#    le précède, jamais par le nombre.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_aire_defi_short.py ShortAireDefi4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

TISSU_C, TISSU_B = "#1d4ed8", "#1e3a8a"
FILM_C = "#fbbf24"
LOGO_C = "#f472b6"


def flocage(u, o=ORIGIN, sw=2):
    """Un flocage : le rectangle du numéro et le disque du logo."""
    num = Rectangle(width=1.25 * u, height=0.9 * u, fill_color=FILM_C, fill_opacity=0.85,
                    stroke_color="#78350f", stroke_width=sw).move_to(o)
    log = Circle(radius=0.28 * u, fill_color=LOGO_C, fill_opacity=0.9, stroke_color="#831843",
                 stroke_width=sw).move_to(o + P(0.9 * u, 0))
    g = VGroup(num, log)
    g.numero, g.logo = num, log
    return g


def metre_carre(cote, o=ORIGIN, sw=4):
    """Un carré d'un mètre de côté, quadrillé en décimètres."""
    c = Square(side_length=cote, fill_color="#334155", fill_opacity=0.3, stroke_color=WHITE,
               stroke_width=sw).move_to(o)
    grille = VGroup()
    for k in range(1, 10):
        grille.add(Line(o + P(-cote / 2 + k * cote / 10, -cote / 2),
                        o + P(-cote / 2 + k * cote / 10, cote / 2)))
        grille.add(Line(o + P(-cote / 2, -cote / 2 + k * cote / 10),
                        o + P(cote / 2, -cote / 2 + k * cote / 10)))
    grille.set_stroke("#94a3b8", 1.2)
    g = VGroup(c, grille)
    g.carre, g.grille = c, grille
    return g


class ShortAireDefi4e(Short4e):
    nom_voix = "4e-aire-defi-short"
    fichier_marques = "4e_aire_defi_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : 18 flocages de 563 cm² ────────────────────────────────────
        self.dire("00-accroche")
        self.au_mot("Ryan floque")
        tit = self.grand("Un mètre carré ?", font_size=32, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.play(FadeIn(tit), FadeIn(self.echelle_short()), run_time=0.6)
        self.au_mot("18 maillots")
        u = 0.42
        equipe = VGroup(*[flocage(u, P(-1.45 + (k % 3) * 1.45, 1.4 - (k // 3) * 0.75))
                          for k in range(18)])
        e18 = self.t("18 flocages", 26, TISSU_C).move_to(P(0, Y_ACCROCHE))
        self.play(LaggedStart(*[FadeIn(f, scale=0.8) for f in equipe], lag_ratio=0.05),
                  FadeIn(e18), run_time=1.3)
        self.au_mot("563 centimètres carrés")
        e563 = self.t("563 cm² chacun", 26, FILM_C).move_to(P(0, -2.4))
        self.play(FadeIn(e563, scale=1.1), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("En mètres carrés")
        q = self.accroche("en m², ça fait combien ?", fs=26, couleur=JAUNE_TITRE, y=-2.76)
        self.play(FadeIn(q), run_time=0.5)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse B ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["Tout ça, en m² ?"],
                            ["101 m²", "environ 1 m²", "environ 10 m²"], 1,
                            [["Un mètre carré en fait", "10 000."],
                             "À peine plus d'un m²."],
                            x_col=0.0)

        # ── 03 : dix-huit flocages dans un carré d'un mètre ────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Dans un carré d'un mètre", font_size=28,
                         color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        mc = metre_carre(3.4, P(0, 0.2))
        self.au_mot("Dix-huit flocages")
        u = 0.4
        dedans = VGroup(*[flocage(u, P(-1.1 + (k % 3) * 1.1, 1.25 - (k // 3) * 0.52))
                          for k in range(18)])
        self.play(FadeIn(mc), run_time=0.6)
        self.play(LaggedStart(*[FadeIn(f, scale=0.8) for f in dedans], lag_ratio=0.05), run_time=1.3)
        self.au_mot("un carré d'un mètre")
        res = sans_audit(self.t("1 m² = 10 000 cm²", 28, VERT_OK)).move_to(P(0, -2.6))
        self.play(Indicate(mc.carre, color=WHITE, scale_factor=1.04), FadeIn(res, scale=1.15),
                  run_time=0.9)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        # ⛔ Pas de margo_bas() sur CET écran : Ti-Margo occupe y ∈ [-3.85, -3.02]
        # et sa tête couvrait une lettre de « @eleveai974 » (17/11). Le gabarit le dit
        # lui-même : dans la bande basse il ne porte aucune information, il peut être
        # masqué sans rien coûter. Il reste présent sur l'écran d'abonnement.
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        trois = VGroup(*[metre_carre(1.15, P(-1.25 + k * 1.25, 0.9), sw=3) for k in range(3)])
        self.au_mot("combien de centimètres carrés")
        self.play(FadeIn(trois, scale=0.9), run_time=0.9)
        self.au_mot("3 mètres carrés")
        e3 = self.t("3 m²", 32, BASE_C).move_to(P(0, -0.6))
        self.play(FadeIn(e3, scale=1.15), run_time=0.5)
        qa = self.t("combien de cm² ?", 28, FILM_C).move_to(P(0, -1.6))
        self.play(FadeIn(qa), run_time=0.45)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.9)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
