# proba_probaT_indep_definition_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Deux événements indépendants : quand savoir l'un ne change rien ».
# CEINTURE JAUNE. Il AMUSE : la pièce tombe 5 fois sur pile… face a-t-elle
# plus de chances ? Non : la pièce n'a pas de mémoire.
#   · en HAUT : la pièce qui saute et retombe sur PILE, 5 petites pièces s'alignent
#     (le compteur) ; puis la boule de loto n° 7 ;
#   · en BAS, EN MÊME TEMPS : « 5 fois pile », « Face : ? » qui devient
#     « Face : 0,5 », « indépendants » ;
#   · fin : la question et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne ni de classe à l'écran :
# UN seul rendu, copié dans les dossiers STMG et 1re.
#
# Voix : manim/voix/stmg-premiere-proba-indep-definition-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_indep_definition_short.py ShortProbaIndepDefinition -o eleveai-maths-stmg-proba-indep-definition-short --media_dir manim/scripts/stmg/media-probaT_indep_definition
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/13-indep-definition/ et, sous le nom
# eleveai-maths-premiere-commun-proba-indep-definition-short.mp4, dans manim/sorties/premiere-commun/maths/probabilites/13-indep-definition/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaT_indep_definition import P  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
OR = "#EAB308"
OR_FONCE = "#A16207"


def piece(face="PILE", r=0.85):
    """Une pièce dorée, son anneau, et le mot PILE ou FACE."""
    disque = Circle(radius=r, fill_color=OR, fill_opacity=1, stroke_color=OR_FONCE, stroke_width=4)
    anneau = Circle(radius=r * 0.8, fill_color=OR, fill_opacity=0, stroke_color=OR_FONCE, stroke_width=3)
    mot = Text(face, font_size=int(r * 34), color="#422006", weight=BOLD)
    return VGroup(disque, anneau, mot)


def boule_loto(n="7", r=0.95):
    boule = Circle(radius=r, fill_color="#DC2626", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    reflet = Ellipse(width=r * 0.6, height=r * 0.3, fill_color=WHITE, fill_opacity=0.35, stroke_width=0)
    reflet.move_to(boule.get_center() + P(-r * 0.4, r * 0.55))
    pastille = Circle(radius=r * 0.55, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    chiffre = Text(n, font_size=int(r * 70), color="#0F172A", weight=BOLD)
    return VGroup(boule, reflet, pastille, chiffre)


class ShortProbaIndepDefinition(Short6e):
    nom_voix = "stmg-premiere-proba-indep-definition-short"
    ceinture = "jaune"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def lancer(self, p, hauteur=0.9):
        """La pièce saute en tournant (aplatie, retournée) et retombe."""
        self.play(p.animate.shift(UP * hauteur).stretch(0.06, 1), run_time=0.14, rate_func=rate_functions.ease_out_quad)
        self.play(p.animate.stretch(1 / 0.06, 1), run_time=0.1)
        self.play(p.animate.stretch(0.06, 1), run_time=0.1)
        self.play(p.animate.shift(DOWN * hauteur).stretch(1 / 0.06, 1), run_time=0.14,
                  rate_func=rate_functions.ease_in_quad)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : 5 fois pile ──
        self.dire("00-accroche")
        titre = self.grand("Pile ou face ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.55))
        p = piece().move_to(P(0, 1.0))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(p, scale=0.5), run_time=0.7)
        compteur = VGroup(*[piece(r=0.28).move_to(P(-1.4 + 0.7 * k, -0.45)) for k in range(5)])
        for k in range(5):
            self.lancer(p)
            self.play(TransformFromCopy(p, compteur[k]), run_time=0.22)
        self.au_mot("5 fois sur pile")
        cinq = self.t("5 fois pile", 40, OR).move_to(P(0, -1.2))
        self.play(FadeIn(cinq, scale=0.6), run_time=0.35)
        self.insister(cinq, 1.25)
        self.au_mot("face a plus")
        q = VGroup(self.t("Face :", 38, BLEU_CALCUL), self.t("plus de chances ?", 34, ORANGE_RETENUE))
        q.arrange(RIGHT, buff=0.2)
        q.scale_to_fit_width(min(q.width, LARGEUR_MAX)).move_to(P(0, -1.95))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.play(Wiggle(q[1]), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : non ! pas de mémoire ; face : toujours 0,5 ──
        self.dire("01-image")
        non = self.grand("Non !", font_size=90, color=ROUGE_ERREUR).move_to(P(0, 1.0))
        self.play(FadeIn(non, scale=2.0), p.animate.set_opacity(0.15), FadeOut(q), run_time=0.4)
        self.insister(non, 1.2)
        self.au_mot("La pièce n'a pas")
        memo = VGroup(self.t("La pièce n'a pas", 32), self.t("de mémoire", 36, JAUNE_TITRE)).arrange(DOWN, buff=0.1)
        memo.move_to(P(0, 1.05))
        self.play(FadeOut(non, shift=UP * 0.3), FadeIn(memo, shift=UP * 0.2), p.animate.set_opacity(1).move_to(P(0, 2.4)).scale(0.6),
                  FadeOut(badge), run_time=0.6)
        self.play(Wiggle(p), run_time=0.6)
        self.au_mot("Les lancers sont")
        ind = VGroup(self.t("Les lancers sont", 30), self.t("indépendants", 40, VERT_OK)).arrange(DOWN, buff=0.1)
        ind.move_to(P(0, -1.2))
        self.play(FadeOut(cinq), FadeIn(ind, shift=UP * 0.2), run_time=0.5)
        self.insister(ind[1], 1.2)
        self.au_mot("savoir les 5 piles")
        barre = Line(compteur.get_left() + LEFT * 0.1, compteur.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR,
                     stroke_width=7)
        rien = self.t("ne change rien", 32, ORANGE_RETENUE).next_to(compteur, UP, buff=0.2)
        self.play(FadeOut(memo, shift=UP * 0.2), run_time=0.3)
        self.play(Create(barre), compteur.animate.set_opacity(0.4), FadeIn(rien), run_time=0.5)
        self.au_mot("Face : toujours")
        pf = piece("FACE", 0.85 * 0.6).move_to(P(0, 2.4))
        self.play(FadeOut(VGroup(ind, rien), shift=DOWN * 0.2), run_time=0.3)
        self.lancer(p, 0.4)
        self.play(ReplacementTransform(p, pf), run_time=0.2)
        res = VGroup(self.t("Face :", 40, BLEU_CALCUL), self.t("toujours", 34), self.t("0,5", 64, VERT_OK))
        res.arrange(RIGHT, buff=0.18)
        res.scale_to_fit_width(min(res.width, LARGEUR_MAX)).move_to(P(0, -1.5))
        self.play(FadeIn(res[:2], shift=UP * 0.2), run_time=0.4)
        self.au_mot("0,5")
        self.play(FadeIn(res[2], scale=0.5), run_time=0.35)
        self.insister(res[2], 1.4)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : la boule n° 7 ──
        self.dire("02-question")
        toi = self.grand("Et au loto ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        b = boule_loto().move_to(P(0, 1.55))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(pf, res, compteur, barre), shift=DOWN * 0.3),
                  run_time=0.5)
        self.au_mot("le 7")
        self.play(FadeIn(b, shift=DOWN * 1.5), run_time=0.45)
        self.play(b.animate.shift(UP * 0.25), rate_func=there_and_back, run_time=0.3)
        self.au_mot("20 tirages")
        l1 = VGroup(self.t("Pas sorti depuis", 30), self.t("20 tirages", 38, ORANGE_RETENUE)).arrange(DOWN, buff=0.1)
        l1.move_to(P(0, 0.0))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.45)
        self.au_mot("A-t-il plus")
        l2 = self.t("Plus de chances ?", 36, BLEU_CALCUL).move_to(P(0, -0.95))
        self.play(FadeIn(l2, shift=UP * 0.15), Wiggle(b), run_time=0.6)
        self.au_mot("Oui ou non")
        on = self.t("Oui ou non ?", 40, JAUNE_TITRE).move_to(P(0, -1.65))
        self.play(FadeIn(on, scale=0.6), run_time=0.35)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.3))
        self.play(FadeOut(l1), VGroup(l2, on).animate.shift(UP * 0.9), run_time=0.3)
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


# 20/10 : le même short pour la 1re SPÉ (ceinture orange).
class ShortProbaIndepDefinitionPremiereSpe(ShortProbaIndepDefinition):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "orange"
