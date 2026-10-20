# proba_auto_somme_issues_short.py
# EleveAI — Maths 1re TRONC COMMUN — short jumeau de la série « Probabilités »,
# épisode 25 : la probabilité d'un événement, somme de ses issues.
# CEINTURE JAUNE. Il AMUSE : « Au moins 4 étoiles : 2 notes sur 5, donc 40 % ? »
#   · en HAUT l'appli (téléphone, étoiles qui se remplissent) et dix clients :
#     4 s'allument en orange (40 % ?), puis 7 en vert (70 % !) ;
#   · en BAS, EN MÊME TEMPS, le tableau de loi du coach (tableau_donnees,
#     étoiles dessinées) : les cases 4 ★ et 5 ★ s'allument, leurs valeurs
#     glissent dans « 0,3 + 0,4 = 70 % » ;
#   · fin : « mauvaise note » (1 ou 2 ★), « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/premiere-commun-proba-somme-issues-short.json (débit −7).
# Rendu (depuis la racine du dépôt) :
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/proba_auto_somme_issues_short.py ShortProbaSommeIssuesPremiere -o eleveai-maths-premiere-commun-proba-somme-issues-short --media_dir manim/scripts/premiere/media-somme_issues
# Puis copier le mp4 dans manim/sorties/premiere-commun/maths/probabilites/25-somme-issues/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_auto_somme_issues import (  # noqa: E402  (pose les chemins)
    ETOILE, JAUNE_CASE, P, TableauLoi, remplir, telephone,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
GRIS_CLIENT = "#64748B"


def client(s=1.0):
    """Une petite silhouette : tête + buste."""
    tete = Circle(radius=0.09, fill_color=GRIS_CLIENT, fill_opacity=1, stroke_width=0).move_to(P(0, 0.17))
    buste = RoundedRectangle(width=0.26, height=0.2, corner_radius=0.08, fill_color=GRIS_CLIENT,
                             fill_opacity=1, stroke_width=0).move_to(P(0, -0.04))
    return VGroup(tete, buste).scale(s)


class ShortProbaSommeIssuesPremiere(Short6e):
    nom_voix = "premiere-commun-proba-somme-issues-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=34, buff=0.14, largeur=LARGEUR_MAX):
        g = VGroup(*[Text(m, font_size=font_size, color=c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def badge(self):
        return echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def tableau(self, y=-0.62):
        return TableauLoi(centre=P(0, y), larg_lab=1.15, larg_col=0.55, h=0.62, titre="Note donnée à l'appli",
                          fs_lab=20, fs_val=22, fs_titre=18, r_etoile=0.075, par_ligne=3, h_titre=0.32,
                          marge=0.1, sw_anneau=4)

    def clients(self):
        g = VGroup(*[client(1.0) for _ in range(10)]).arrange_in_grid(rows=2, cols=5, buff=(0.12, 0.14))
        return g.move_to(P(0.85, 1.12))

    def allumer_clients(self, cl, n, couleur):
        return [c.animate.set_fill(couleur) for c in cl[:n]] + [c.animate.set_fill(GRIS_CLIENT) for c in cl[n:]]

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche, « 2 notes sur 5, donc 40 % ? » ──
        self.dire("00-accroche")
        titre = self.grand("Au moins 4 étoiles ?", font_size=38, color=JAUNE_TITRE).move_to(P(0, 3.35))
        badge = self.badge()
        tel, vides = telephone(0.9)
        tel.move_to(P(-1.4, 1.12))
        cl = self.clients()
        tab = self.tableau()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(tel, shift=RIGHT * 0.3), FadeIn(cl),
                  FadeIn(tab.tout()), run_time=0.7)
        self.play(LaggedStart(*remplir(vides, 4), lag_ratio=0.15), run_time=0.5)
        self.au_mot("2 notes sur 5")
        faux = self.ligne([("2 notes sur 5", ORANGE_RETENUE), ("→", WHITE), ("40 % ?", ORANGE_RETENUE)], 34)
        faux.move_to(P(0, -1.95))
        self.play(*tab.allumer([3, 4]), FadeIn(faux[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("40 %")
        self.play(FadeIn(faux[1:], shift=UP * 0.1), LaggedStart(*self.allumer_clients(cl, 4, ORANGE_RETENUE),
                                                                 lag_ratio=0.05), run_time=0.5)
        self.insister(faux[2], 1.3, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : non ! 0,3 + 0,4 = 70 % ──
        self.dire("01-image")
        non = self.grand("Non !", font_size=56, color=ROUGE_ERREUR).move_to(P(0.85, 1.05))
        trait = Line(faux.get_corner(DL) + LEFT * 0.05, faux.get_corner(UR) + RIGHT * 0.05,
                     color=ROUGE_ERREUR, stroke_width=6)
        fond = BackgroundRectangle(non, color=BLACK, fill_opacity=0.85, buff=0.1)
        self.play(FadeIn(fond), FadeIn(non, scale=1.8), Create(trait), run_time=0.45)
        self.au_mot("4 étoiles, c'est 0,3")
        self.play(FadeOut(VGroup(non, fond)), FadeOut(VGroup(faux, trait)),
                  *self.allumer_clients(cl, 0, ORANGE_RETENUE), run_time=0.35)
        v3 = tab.valeur(3)
        self.play(Indicate(tab.etoiles[3], color=ETOILE, scale_factor=1.4), run_time=0.5)
        self.au_mot("0,3. 5")
        self.play(FadeIn(v3, scale=0.4), run_time=0.3)
        self.insister(v3, 1.5, 0.2)
        self.au_mot("5 étoiles, 0,4")
        v4 = tab.valeur(4)
        self.play(Indicate(tab.etoiles[4], color=ETOILE, scale_factor=1.4), *remplir(vides, 5), run_time=0.5)
        self.play(FadeIn(v4, scale=0.4), run_time=0.3)
        self.insister(v4, 1.5, 0.2)
        somme = self.ligne([("0,3", WHITE), ("+", WHITE), ("0,4", WHITE), ("=", WHITE), ("70 %", VERT_OK)], 40, largeur=3.8)
        somme.move_to(P(0, -1.95))
        self.au_mot("0,3 plus 0,4")
        c3 = tab.valeur(3)
        self.add(c3)
        self.play(ReplacementTransform(c3, somme[0]), run_time=0.45)
        self.play(FadeIn(somme[1]), run_time=0.15)
        c4 = tab.valeur(4)
        self.add(c4)
        self.play(ReplacementTransform(c4, somme[2]), run_time=0.45)
        self.au_mot(": 70 %")
        self.play(FadeIn(somme[3:], shift=UP * 0.1), run_time=0.35)
        self.au_mot("des clients")
        self.play(LaggedStart(*self.allumer_clients(cl, 7, VERT_OK), lag_ratio=0.08), run_time=0.7)
        self.play(Create(SurroundingRectangle(somme[4], color=VERT_OK, buff=0.08, stroke_width=3)), run_time=0.25)
        self.insister(somme[4], 1.4, 0.25)
        self.insister(cl[:7], 1.15, 0.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(self.badge())
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.35))
        tel2, vides2 = telephone(0.9)
        tel2.move_to(P(-1.4, 1.12))
        tab2 = self.tableau()
        self.play(Write(toi), FadeIn(tel2), FadeIn(tab2.tout()), run_time=0.5)
        self.au_mot("avec 0,1 pour 2")
        w1 = tab2.valeur(1)
        self.play(*remplir(vides2, 2), *tab2.allumer([1]), run_time=0.35)
        self.play(FadeIn(w1, scale=0.4), run_time=0.3)
        self.au_mot("0,05 pour 1")
        w0 = tab2.valeur(0)
        self.play(*remplir(vides2, 1), *tab2.allumer([0]), run_time=0.35)
        self.play(FadeIn(w0, scale=0.4), run_time=0.3)
        self.au_mot("une mauvaise note")
        q = VGroup(self.t("mauvaise note", 30, BLEU_CALCUL, 2.4), self.t("= ?", 44, ROUGE_ERREUR))
        q.arrange(DOWN, buff=0.15).move_to(P(0.85, 1.05))
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(q[1], scale=0.4), run_time=0.3)
        self.insister(q[1], 1.5, 0.25)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.05))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
