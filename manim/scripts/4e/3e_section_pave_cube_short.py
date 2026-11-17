# 3e_section_pave_cube_short.py
# EleveAI — Maths 3e — SHORT de l'épisode T3 « la section d'un pavé » (micro 3e section_pave_cube).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : Fatou coupe le pain droit, puis en biais — la tranche en biais
# est-elle plus grande ? Réponse A (en biais, la coupe traverse le pain sur une plus grande longueur).
# ⛔ La voix de réponse n'a qu'un seul point, à la fin : la phrase de réponse ne porte aucun nombre.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/3e_section_pave_cube_short.py ShortSectionPaveCube3e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

MIE_C, MIE_D, CROUTE = "#fde68a", "#fef3c7", "#b45309"
SECTION_C = "#22d3ee"


def vue_dessus(l, p, o=ORIGIN, sw=4):
    """Le pain vu de DESSUS : un rectangle l × p, croûte autour. o = son centre."""
    r = Rectangle(width=l, height=p, fill_color=MIE_D, fill_opacity=0.5, stroke_color=CROUTE,
                  stroke_width=sw).move_to(o)
    g = VGroup(r)
    g.bord, g.l, g.p, g.o = r, l, p, o
    return g


def tranche(a, b, o=ORIGIN, sw=4, couleur=SECTION_C):
    """La tranche vue à plat : un rectangle a × b, la mie dedans."""
    r = Rectangle(width=a, height=b, fill_color=couleur, fill_opacity=0.35, stroke_color=couleur,
                  stroke_width=sw).move_to(o)
    mie = Rectangle(width=a * 0.74, height=b * 0.74, fill_color=MIE_C, fill_opacity=0.55,
                    stroke_width=0).move_to(o)
    g = VGroup(r, mie)
    g.cadre, g.mie = r, mie
    return g


class ShortSectionPaveCube3e(Short4e):
    nom_voix = "3e-section-pave-cube-short"
    fichier_marques = "3e_section_pave_cube_short_marques.json"

    def _carte(self, lettre, contenu, fs):
        """⛔ Le gabarit étire le contenu jusqu'à 0,8 du bord de la carte, or le ✓ de la bonne
        réponse se pose à 0,38 du bord DROIT. Ici le libellé est pourtant COURT (« plus
        grande ») : c'est la carte du short qui est étroite, et il touchait quand même —
        mesuré à 0 px par `manim/poste2/verifier-coche-carte.py`, pas vu à l'œil. On réserve
        la place du ✓. ⚠️ Ne pas se fier à la longueur du libellé pour décider : mesurer."""
        g = super()._carte(lettre, contenu, fs)
        cadre, ligne = g
        if ligne.width > self.LARG - 1.2:
            ligne.scale_to_fit_width(self.LARG - 1.2)
            ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return g

    def construct(self):
        self.margo_bas()

        # ── 00 : droit, puis en biais ──────────────────────────────────────
        self.dire("00-accroche")
        self.ouverture("La tranche en biais", fs=32)
        vd = vue_dessus(3.2, 1.5, P(0, 0.9))
        et = sans_audit(self.t("vu de dessus", 20, CROUTE)).next_to(vd, UP, buff=0.15)
        # ⛔ Le pain est POSÉ, pas animé : la voix dit « coupe » dès la 0,6ᵉ seconde, et
        #    l'ouverture (0,7 s) suffit à mettre un FadeIn de plus en RETARD.
        self.add(vd, et)
        self.au_mot("coupe le pain droit")
        droit = Line(P(-1.0, 0.15), P(-1.0, 1.65), color=BLEU_CALCUL, stroke_width=7)
        self.play(Create(droit), run_time=0.6)
        self.au_mot("en biais")
        biais = Line(P(0.2, 0.15), P(1.3, 1.65), color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(biais), run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("La tranche en biais")
        tr1 = tranche(1.2, 1.1, P(-0.9, -1.2))
        tr2 = tranche(1.8, 1.1, P(0.8, -1.2), couleur=ROUGE_ERREUR)
        self.play(FadeIn(tr1, scale=0.85), run_time=0.5)
        self.play(FadeIn(tr2, scale=0.85), run_time=0.5)
        self.au_mot("plus grande, plus petite")
        q = self.accroche("plus grande ? plus petite ?", fs=24, couleur=JAUNE_TITRE, y=-2.6)
        self.play(FadeIn(q), run_time=0.5)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse A ───────────────────────
        # ⛔ Le mot de la carte (« tranche ») est ABSENT de la voix : avec « plus », _cue
        #    attendrait le choix A et la carte arriverait en retard (leçon 14).
        self.ecran_question("02-question", "02b-reponse",
                            ["La tranche en biais ?"],
                            ["plus grande", "plus petite", "la même"], 0,
                            ["En biais, la coupe traverse", "une plus grande longueur."],
                            x_col=0.0)

        # ── 03 : même pain, deux gestes ────────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Deux gestes", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        self.au_mot("Même pain")
        vd = vue_dessus(3.2, 1.5, P(0, 1.7))
        self.play(FadeIn(vd, scale=0.9), run_time=0.6)
        self.au_mot("deux gestes")
        droit = Line(P(-1.0, 0.95), P(-1.0, 2.45), color=BLEU_CALCUL, stroke_width=7)
        biais = Line(P(0.2, 0.95), P(1.3, 2.45), color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(droit), Create(biais), run_time=0.9)
        self.au_mot("deux tranches")
        tr1 = tranche(1.2, 1.1, P(-0.9, -0.5))
        tr2 = tranche(1.8, 1.1, P(0.8, -0.5), couleur=ROUGE_ERREUR)
        self.play(FadeIn(tr1, scale=0.85), FadeIn(tr2, scale=0.85), run_time=0.9)
        res = self.t("en biais, plus grande", 28, VERT_OK).move_to(P(0, -2.3))
        self.play(FadeIn(res, scale=1.15), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        # ⛔ Pas de margo_bas() sur CET écran (REGLES.md, « Mascotte », Frédéric 17/11) :
        #    Ti-Margo occupe y ∈ [−3,85 ; −3,02] et sa tête couvrait une lettre de
        #    « @eleveai974 » — on lisait « @elev◼i974 ». Le remonter est impossible
        #    (0,55 d'unité libre pour un bloc de 0,852). Il revient à l'écran suivant.
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        self.au_mot("la section d'un cube")
        cb = VGroup(Square(1.5, fill_color=MIE_D, fill_opacity=0.5, stroke_color=CROUTE,
                           stroke_width=4),
                    Square(1.5, fill_color=MIE_C, fill_opacity=0.35, stroke_color=CROUTE,
                           stroke_width=4).shift(P(0.42, 0.42)))
        cb.move_to(P(0, 1.1))
        self.play(FadeIn(cb, scale=0.85), run_time=0.7)
        self.au_mot("coupé parallèlement à une face")
        pl = Line(P(-1.1, 0.5), P(1.1, 0.5), color=JAUNE_TITRE, stroke_width=6)
        fq = self.t("quelle forme ?", 30, JAUNE_TITRE).move_to(P(0, -0.7))
        self.play(Create(pl), FadeIn(fq, scale=1.1), run_time=0.8)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.4)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
