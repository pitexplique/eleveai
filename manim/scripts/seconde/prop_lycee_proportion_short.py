# prop_lycee_proportion_short.py
# EleveAI — Maths 2de — short jumeau de l'épisode seconde 01 « Proportion
# d'une sous-population » (micro info_proportion, notion
# information_chiffree_evolutions). CEINTURE BLANCHE (règle du short blanc,
# REGLES.md), échelle entière des ceintures sous le titre, sans identité de
# classe. Il AMUSE : « ton taux de j'aime ».
#   · EN HAUT, l'image : un écran de vidéo stylisé (aucune marque) et ses deux
#     compteurs, vues (blanc) et j'aime (rose, le cœur) ;
#   · EN BAS, au même instant, la fraction 150 sur 2 000 (le numérateur rose
#     comme le cœur), puis 0,075, puis 7,5 % et la barre de 100 % qui se remplit
#     en rose : code couleur partagé j'aime = partie ;
#   · 1 question-pause (3 s) : 500 vues, 40 j'aime → 8 % (40 % = la partie
#     recopiée, 12,5 = tout ÷ partie) ;
#   · fin : 1 200 vues et 54 j'aime, quel taux ? (4,5 %) en commentaire.
# Chiffres inventés (pas de source). Centre d'intérêt : reseaux-sociaux.
#
# Voix : manim/voix/seconde-prop-proportion-short.json (validée le 02/11, débit
# −10) ; WAV : public/sons/seconde-prop-proportion-short/ ; marques :
# manim/scripts/seconde/prop_lycee_proportion_short_marques.json
# (marques_dump.ps1 puis cues2marques_gap.py).
# Base : ShortProp (manim/scripts/6e/prop_commun.py, non modifié), comme
# manim/scripts/cm1/prop_tableau_short.py. Ajouté ICI : ecran_video(), oeil(),
# coeur(), barre100(), fraction_v().
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/seconde/prop_lycee_proportion_short.py PropLyceeProportionShort
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/prop_lycee_proportion_short.py PropLyceeProportionShort -o eleveai-maths-seconde-prop-proportion-short --media_dir manim/scripts/seconde/media-prop-lycee-proportion-short
# Sortie : manim/sorties/seconde/maths/proportionnalite/01-proportion/eleveai-maths-seconde-prop-proportion-short.mp4

import sys
from pathlib import Path

_ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(_ICI.parents[0] / "6e"))
sys.path.insert(0, str(_ICI))

from prop_commun import *  # noqa: E402,F403

ROSE = "#f472b6"        # le cœur, les j'aime, la partie
ECRAN = "#0f172a"       # l'écran de la vidéo


def pas_audit(m):
    """Décor sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def ecran_video(w=3.6, h=1.75):
    """Un écran de vidéo stylisé, sans aucune marque : cadre, bouton lecture,
    barre de progression."""
    cadre = RoundedRectangle(width=w, height=h, corner_radius=0.14, fill_color=ECRAN, fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=3)
    rond = Circle(radius=0.36, fill_color=WHITE, fill_opacity=0.15, stroke_color=WHITE, stroke_width=3)
    tri = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.17).rotate(-PI / 2).shift(RIGHT * 0.04)
    prog = Line(P(-w / 2 + 0.2, -h / 2 + 0.2), P(w / 2 - 0.2, -h / 2 + 0.2), color=GREY_C, stroke_width=4)
    lu = Line(P(-w / 2 + 0.2, -h / 2 + 0.2), P(-w / 2 + 0.2 + (w - 0.4) * 0.6, -h / 2 + 0.2), color=ROSE,
              stroke_width=5)
    return VGroup(cadre, rond, tri, prog, lu)


def oeil(s=1.0):
    e = Ellipse(width=0.42, height=0.24, stroke_color=WHITE, stroke_width=3)
    return VGroup(e, Dot(radius=0.06, color=WHITE)).scale(s)


def coeur(s=1.0, couleur=ROSE):
    c1 = Circle(radius=0.1, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(-0.085, 0.05))
    c2 = Circle(radius=0.1, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0.085, 0.05))
    pt = Polygon(P(-0.175, 0.01), P(0.175, 0.01), P(0, -0.2), fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(c1, c2, pt).scale(s)


def barre100(w=3.4, h=0.32, part=0.075, couleur=ROSE):
    """La barre de 100 % : la piste et la part (pas ajoutées)."""
    piste = Rectangle(width=w, height=h, fill_color="#1e293b", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    plein = Rectangle(width=w * part, height=h, fill_color=couleur, fill_opacity=1, stroke_width=0)
    plein.align_to(piste, LEFT)
    g = VGroup(piste, plein)
    g.piste, g.plein = piste, plein
    return g


class PropLyceeProportionShort(ShortProp):
    nom_voix = "seconde-prop-proportion-short"
    fichier_marques = "prop_lycee_proportion_short_marques.json"
    ceinture = "blanche"

    # Défauts repris le 03/11 : la phrase de réponse de la question-pause en
    # 28 (au lieu de 26, réduite), lisible depuis le fond de la classe.
    def question_pause(self, *a, **k):
        self._en_q = True
        try:
            return super().question_pause(*a, **k)
        finally:
            self._en_q = False

    def bloc(self, lignes, fs=30, color=WHITE, buff=0.1):
        if getattr(self, "_en_q", False):
            fs = max(fs, 28)
        return super().bloc(lignes, fs, color, buff)

    def ligne_rep(self, i, morceaux, fs=None):
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs or 28, buff=0.14)
        if lg.width > config.frame_width - 0.4:
            lg.scale_to_fit_width(config.frame_width - 0.4)
        return lg.move_to(self.ph_q[i])

    def fraction_v(self, num, den, fs=44, c_num=ROSE):
        n = self.t(num, fs, c_num)
        d = self.t(den, fs, WHITE)
        barre = Line(LEFT, RIGHT, color=WHITE, stroke_width=4)
        barre.set_width(max(n.width, d.width) + 0.2)
        VGroup(n, barre, d).arrange(DOWN, buff=0.1)
        return VGroup(n, barre, d)

    def compteurs(self, vues, n_aime, y=0.0, fs=26):
        """Les deux compteurs sous l'écran, l'un sous l'autre : (œil, « 2 000
        vues ») et (cœur, « 150 », « j'aime ») ; renvoyés, non ajoutés."""
        cv = VGroup(oeil(0.85), self.t(vues, fs, WHITE)).arrange(RIGHT, buff=0.14)
        ca = VGroup(coeur(0.95), self.t(n_aime, fs, ROSE), self.t("j'aime", fs, ROSE)).arrange(RIGHT, buff=0.14)
        VGroup(cv, ca).arrange(DOWN, aligned_edge=LEFT, buff=0.16).move_to(P(0, y))
        return cv, ca

    def _rep_q(self, sc):
        lg = VGroup(*sc.ligne_rep(0, ["40 ÷", "500 =", "0,08,"]), *sc.ligne_rep(1, ["soit 8 %."]))
        b = barre100(1.9, 0.28, 0.08)
        y2 = lg[3].get_y()
        VGroup(lg[3], b).arrange(RIGHT, buff=0.3).move_to(P(0, y2))  # la barre à côté de « soit 8 % »
        sc.au_mot("40 divisé")
        sc.play(FadeIn(lg[0], shift=UP * 0.12), FadeIn(b.piste), run_time=0.3)
        sc.au_mot("par 500")
        sc.play(FadeIn(lg[1], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("0,08")
        sc.play(FadeIn(lg[2], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("8 %")
        sc.play(FadeIn(lg[3], scale=1.3), GrowFromEdge(b.plein, LEFT), run_time=0.45)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Ton taux de j'aime", self.ceinture)
        pas_audit(titre)
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche : 2 000 vues, 150 j'aime ──
        self.dire("00-accroche")
        ev = ecran_video().move_to(P(0, 1.4))
        cv, ca = self.compteurs("2 000 vues", "150", y=0.12)
        self.au_mot("Ta vidéo")
        self.play(Write(titre), FadeIn(ev, shift=DOWN * 0.2), run_time=0.6)
        self.au_mot("2 000 vues")
        self.play(FadeIn(cv, shift=UP * 0.15), run_time=0.35)
        self.au_mot("150")
        self.play(FadeIn(ca[0], scale=1.2), FadeIn(ca[1], scale=1.2), run_time=0.35)
        self.au_mot("j'aime")
        self.play(FadeIn(ca[2], shift=RIGHT * 0.1), Indicate(ca[0], color=ROSE, scale_factor=1.5), run_time=0.5)
        q = self.borne(self.ligne([("Ton taux", AMBRE), ("de j'aime ?", ROSE)], 40), 0.8).move_to(P(0, -1.3))
        self.au_mot("Quel est")
        self.play(FadeIn(q[0], scale=1.2), run_time=0.3)
        self.au_mot("de j'aime")
        self.play(FadeIn(q[1], scale=1.2), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 01 : la fraction, puis le pourcentage ──
        self.dire("01-image")
        fr = self.fraction_v("150", "2 000", 36)
        eg = self.t("= 0,075", 36, WHITE)
        rang = VGroup(fr, eg).arrange(RIGHT, buff=0.22).move_to(P(0, -1.05))
        self.borne(rang, 0.8)
        self.au_mot("150")
        self.play(FadeOut(q), FadeIn(fr[0], scale=1.3), Indicate(ca, color=ROSE), run_time=0.4)
        self.au_mot("par 2 000")
        self.play(Create(fr[1]), FadeIn(fr[2], shift=UP * 0.12), Indicate(cv, color=WHITE), run_time=0.4)
        self.au_mot("0,075")
        self.play(FadeIn(eg, shift=RIGHT * 0.15), run_time=0.35)
        pc = self.t("= 7,5 %", 50, VERT_OK).move_to(P(0, -1.95))
        b = barre100(3.2).move_to(P(0, -2.75))
        z = pas_audit(self.t("0", 20, GREY_B)).next_to(b.piste, LEFT, buff=0.08)
        self.au_mot("7,5 %")
        self.play(FadeIn(pc, scale=1.3), FadeIn(b.piste), FadeIn(z), run_time=0.4)
        self.play(GrowFromEdge(b.plein, LEFT), run_time=0.5)
        self.insister(pc, 1.15)
        self.au_mot("des personnes")
        dp = pas_audit(self.t("des personnes qui l'ont vue", 22, GREY_B)).move_to(P(0, -2.4))
        self.borne(dp, 0.8)
        self.play(FadeIn(dp, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["500 vues, 40 j'aime.", "Quel taux ?"],
                            [self.t("8 %", 30), self.t("40 %", 30), self.t("12,5", 30)], 0,
                            ["40 ÷ 500 = 0,08,", "soit 8 %."], mot_q="500 vues", autres_r=self._rep_q)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question en commentaire ──
        self.dire("03-commentaire")
        et = self.t("À toi !", 40, AMBRE).move_to(P(0, 2.05))
        self.au_mot("À toi")
        self.play(FadeIn(et, scale=1.2), run_time=0.35)
        ev2 = ecran_video(3.0, 1.25).move_to(P(0, 1.1))
        cv2, ca2 = self.compteurs("1 200 vues", "54", y=-0.12)
        self.au_mot("1 200 vues")
        self.play(FadeIn(ev2), FadeIn(cv2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("54")
        self.play(FadeIn(ca2[0], scale=1.2), FadeIn(ca2[1], scale=1.2), run_time=0.35)
        self.au_mot("j'aime")
        self.play(FadeIn(ca2[2], shift=RIGHT * 0.1), run_time=0.3)
        r = self.borne(self.ligne([("Quel taux", AMBRE), ("de j'aime ?", ROSE)], 38), 0.8).move_to(P(0, -1.05))
        self.au_mot("Quel taux")
        self.play(FadeIn(r[0], scale=1.2), run_time=0.3)
        self.au_mot("de j'aime")
        self.play(FadeIn(r[1], scale=1.2), run_time=0.3)
        self.insister(r, 1.1)
        self.appel_commentaire(y=-1.9)
