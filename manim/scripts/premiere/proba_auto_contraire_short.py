# proba_auto_contraire_short.py
# EleveAI — Maths 1re TRONC COMMUN — short jumeau de la série « Probabilités »,
# épisode 2 : l'événement contraire. CEINTURE JAUNE. Il AMUSE :
# « 30 % de pluie… donc 70 % de beau temps ? »
#   · en HAUT la météo : la pluie, puis le soleil, puis les nuages ;
#   · en BAS, EN MÊME TEMPS, le schéma en barre du coach (schema_barre) :
#     30 % | 70 % ; « beau temps ? » devient « pas de pluie » = nuages + soleil ;
#   · fin : le colis en retard (20 % | ?), « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/premiere-commun-proba-contraire-short.json (Julie, débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/proba_auto_contraire_short.py ShortProbaContrairePremiereCommun -o eleveai-maths-premiere-commun-proba-contraire-short --media_dir manim/scripts/premiere/media
# Puis copier le mp4 dans manim/sorties/premiere-commun/maths/probabilites/02-contraire/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_auto_contraire import (  # noqa: E402  (pose les chemins)
    BLEU_PART, ROUGE_INCONNU, VERT_PART, P, SchemaBarre, colis, nuage, pluie, soleil,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaContrairePremiereCommun(Short6e):
    nom_voix = "premiere-commun-proba-contraire-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def schema(self, parts, y=-1.3, h=2.0, dy=0.2, fs_nom=20):
        return SchemaBarre(parts, centre=P(0, y), largeur=3.8, h_barre=0.72, carte=(4.25, h),
                           dy_barre=dy, fs_val=28, fs_nom=fs_nom)

    def badge(self):
        return echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("La météo de demain", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.35))
        badge = self.badge()
        pl = pluie(0.6).move_to(P(-1.35, 1.15))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(pl, shift=DOWN * 0.2), run_time=0.8)
        # la pluie tombe : chaque goutte descend et remonte sous le nuage
        gouttes = pl[1]
        etat = {"t": 0.0}
        bases = [g.get_center() - pl[0].get_center() for g in gouttes]

        def tombe(m, dt):
            etat["t"] += dt
            for k, g in enumerate(m):
                d = (etat["t"] * 0.9 + 0.13 * k) % 0.3
                g.move_to(pl[0].get_center() + bases[k] + DOWN * d)

        gouttes.add_updater(tombe)
        sb = self.schema([(0.3, BLEU_PART), (0.7, VERT_PART)])
        self.au_mot("30 %")
        v0 = sb.valeur(0, "30 %")
        n0 = sb.nom(0, "pluie")
        self.play(FadeIn(sb.carte), GrowFromEdge(sb.rects[0], LEFT), FadeIn(n0), run_time=0.4)
        self.play(FadeIn(v0, scale=0.4), Indicate(pl, color=BLEU_CALCUL), run_time=0.4)
        self.au_mot("Donc 70 %")
        so = soleil(0.6).move_to(P(1.35, 1.15))
        v1 = sb.valeur(1, "70 %")
        n1 = sb.nom(1, "beau temps ?", ORANGE_RETENUE)
        self.play(GrowFromEdge(sb.rects[1], LEFT), FadeIn(so, scale=0.5), run_time=0.4)
        self.play(FadeIn(v1, scale=0.4), FadeIn(n1), Rotate(so[0], PI / 4), run_time=0.5)
        self.insister(n1, 1.3, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : pas de pluie ≠ beau temps ──
        self.dire("01-image")
        non = self.grand("Pas tout à fait !", font_size=34, color=ROUGE_ERREUR).move_to(P(0, 0.15))
        self.play(FadeIn(non, scale=0.5), Wiggle(n1), run_time=0.6)
        self.au_mot("c'est « pas de pluie »")
        n1b = sb.nom(1, "pas de pluie", "#15803D")
        self.play(ReplacementTransform(n1, n1b), sb.rects[1].animate.set_stroke(VERT_OK, 5), run_time=0.5)
        self.insister(n1b, 1.3, 0.25)
        self.au_mot("ça peut être nuageux")
        nu = nuage(0.6).move_to(P(0.05, 1.3))
        self.play(FadeOut(non), pl.animate.move_to(P(-1.5, 1.15)), so.animate.move_to(P(1.55, 1.15)),
                  FadeIn(nu, shift=DOWN * 0.3), run_time=0.6)
        self.play(Indicate(nu, color=WHITE, scale_factor=1.3), run_time=0.6)
        self.au_mot("Le contraire de pluie")
        acc = Brace(VGroup(nu, so), DOWN, color=VERT_OK, buff=0.08)
        lbl = self.t("pas de pluie", 28, VERT_OK).next_to(acc, DOWN, buff=0.05)
        self.play(GrowFromCenter(acc), FadeIn(lbl), Indicate(n1b, color=VERT_OK), run_time=0.5)
        self.au_mot("pas « beau temps »")
        faux = self.t("beau temps", 24, ROUGE_ERREUR).next_to(so, UP, buff=0.08)
        faux.shift(LEFT * max(0, faux.get_right()[0] - 2.1))
        self.play(FadeIn(faux, scale=0.6), Indicate(so, color=ROUGE_ERREUR), run_time=0.45)
        self.play(Create(Line(faux.get_left() + LEFT * 0.05, faux.get_right() + RIGHT * 0.05,
                              color=ROUGE_ERREUR, stroke_width=5)), run_time=0.3)
        self.insister(lbl, 1.25, 0.25)
        self.attendre_voix(marge=0.2)
        gouttes.clear_updaters()

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(self.badge())
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.35))
        self.play(Write(toi), run_time=0.4)
        self.au_mot("un colis")
        bx = colis(0.9).move_to(P(0, 1.3))
        self.play(FadeIn(bx, shift=LEFT * 0.6), run_time=0.4)
        sb2 = self.schema([(0.2, BLEU_PART), (0.8, VERT_PART, True)], y=-0.25, h=1.6, dy=0.12, fs_nom=18)
        self.au_mot("20 %")
        w0 = sb2.valeur(0, "20 %")
        m0 = sb2.nom(0, "en retard")
        self.play(FadeIn(sb2.carte), GrowFromEdge(sb2.rects[0], LEFT), FadeIn(m0), run_time=0.4)
        self.play(FadeIn(w0, scale=0.4), run_time=0.3)
        self.au_mot("ne soit pas en retard")
        q = sb2.inconnu(1)
        m1 = sb2.nom(1, "pas en retard", ROUGE_INCONNU)
        m1.align_to(sb2.rects[1], RIGHT)
        self.play(GrowFromEdge(sb2.rects[1], LEFT), FadeIn(m1), run_time=0.4)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.5, 0.25)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.7))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=28, color=BLEU_CALCUL).move_to(P(0, -2.6))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
