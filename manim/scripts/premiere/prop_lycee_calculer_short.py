# prop_lycee_calculer_short.py
# EleveAI — Maths 1re ET STMG — short jumeau de l'épisode commun 01 « Calculer
# une proportion » (micro auto_prop_calculer), série « Proportionnalité »
# LYCÉE. Rendu UNE fois, copié sous les deux noms (il n'affiche aucune classe).
# CEINTURE BLANCHE (règle du short blanc, REGLES.md) : on VOIT la part.
# Il AMUSE : « Le refrain, c'est quelle part de ta chanson ? »
#   · EN HAUT, l'image qui bouge : des notes de musique qui sautent quand un
#     refrain passe ; EN BAS, au même instant, la FRISE de la chanson (200 s)
#     dont les 4 refrains (20 s chacun) s'allument en rose ; code couleur
#     partagé : notes roses = refrains roses = « 80 s » ;
#   · 1 question-pause (3 s) : 80 s sur 200 → B 40 % (A 80 % = la partie sans
#     diviser ; C 2,5 = 200 ÷ 80, l'inverse) ;
#   · fin : un refrain de 30 s, 3 fois, dans 3 min : quelle proportion ? (50 %)
#     en commentaire.
# Centre d'intérêt : musique. Chanson type (3 min 20, refrain de 20 s) :
# nombres inventés, ordre de grandeur courant d'une chanson pop ; pas de source.
#
# Voix : manim/voix/lycee-prop-calculer-short.json (validée le 02/11, débit
# −10) ; WAV : public/sons/lycee-prop-calculer-short/ ; marques :
# manim/scripts/premiere/prop_lycee_calculer_short_marques.json.
# Ajouté ICI : note(), frise().
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/prop_lycee_calculer_short.py PropLyceeCalculerShort
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/prop_lycee_calculer_short.py PropLyceeCalculerShort -o eleveai-maths-premiere-prop-calculer-short --media_dir manim/scripts/premiere/media-prop-lycee-calculer-short
# Sorties (le même fichier, copié) :
#   manim/sorties/premiere/maths/proportionnalite/01-calculer/eleveai-maths-premiere-prop-calculer-short.mp4
#   manim/sorties/stmg/maths/proportionnalite/01-calculer/eleveai-maths-stmg-prop-calculer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403

REFRAIN = "#f472b6"   # le refrain (rose) : notes, frise, « 80 s »
COUPLET = "#475569"   # le reste de la chanson (ardoise)
CHANSON = [(0, 15, 0), (15, 35, 1), (35, 65, 0), (65, 85, 1), (85, 115, 0), (115, 135, 1), (135, 160, 0),
           (160, 180, 1), (180, 200, 0)]                   # (début, fin, refrain ?) en secondes : 4 × 20 s
CHANSON3 = [(0, 20, 0), (20, 50, 1), (50, 90, 0), (90, 120, 1), (120, 150, 0), (150, 180, 1)]  # 3 min, 3 × 30 s


def sans(m):
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def note(s=1.0, couleur=REFRAIN):
    """Une croche : tête ovale, hampe, crochet."""
    tete = Ellipse(width=0.42, height=0.3, fill_color=couleur, fill_opacity=1, stroke_width=0).rotate(0.4)
    hampe = Line(P(0.19, 0.05), P(0.19, 0.95), stroke_color=couleur, stroke_width=6)
    crochet = CubicBezier(P(0.19, 0.95), P(0.45, 0.8), P(0.5, 0.55), P(0.38, 0.35)).set_stroke(couleur, 6)
    return VGroup(tete, hampe, crochet).scale(s)


def frise(parts, duree, largeur=4.0, h=0.55, centre=ORIGIN):
    """La frise de la chanson : un segment par partie (refrains en gris, allumés
    au mot). .segs · .refrains (les segments de refrain) · .cadre."""
    segs, refr = VGroup(), VGroup()
    x0 = -largeur / 2
    for a, b, r in parts:
        w = largeur * (b - a) / duree
        seg = Rectangle(width=w, height=h, fill_color=COUPLET, fill_opacity=1, stroke_color=NUIT,
                        stroke_width=2).move_to(P(x0 + largeur * a / duree + w / 2, 0))
        segs.add(seg)
        if r:
            refr.add(seg)
    cadre = Rectangle(width=largeur, height=h, stroke_color=WHITE, stroke_width=3)
    g = VGroup(segs, cadre).move_to(centre)
    g.segs, g.refrains, g.cadre = segs, refr, cadre
    return g


def allumer(fr, k=None, run_time=0.9):
    rs = fr.refrains if k is None else fr.refrains[:k]
    return LaggedStart(*[r.animate.set_fill(REFRAIN, 1) for r in rs], lag_ratio=0.5, run_time=run_time)


class PropLyceeCalculerShort(ShortProp):
    nom_voix = "lycee-prop-calculer-short"
    fichier_marques = "prop_lycee_calculer_short_marques.json"
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

    def _disposer_q(self, question, choix, phrase):
        """Cartes moins hautes (0,66) : la place d'une 3e ligne d'énoncé, en 28."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for c in cartes:
            c[0].stretch_to_fit_height(0.66)
            c[1].move_to(c[0]).align_to(c[0].get_left() + RIGHT * 0.2, LEFT)
        q[0].sans_synchro = True  # « 80 s de refrain » posé à « 80 secondes », sans attendre « refrain »
        cartes.arrange(DOWN, buff=0.1).next_to(q, DOWN, buff=0.18).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.15).set_x(0)
        ph.next_to(cartes, DOWN, buff=0.12).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def ligne_rep(self, i, morceaux, fs=None):
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs or 28, buff=0.14)
        if lg.width > config.frame_width - 0.4:
            lg.scale_to_fit_width(config.frame_width - 0.4)
        return lg.move_to(self.ph_q[i])

    def sauter(self, notes):
        return LaggedStart(*[n.animate(rate_func=there_and_back).shift(UP * 0.25) for n in notes], lag_ratio=0.2,
                           run_time=0.8)

    def _rep_q(self, sc):
        lg = VGroup(*sc.ligne_rep(0, ["80 ÷", "200 =", "0,4"]), *sc.ligne_rep(1, ["= 40 %"]))
        for m, mot in zip(lg, ["80 divisé", "par 200", "0,4", "40 %"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.play(Indicate(self.mini.refrains, color=WHITE, scale_factor=1.15), run_time=0.5)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le refrain", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        notes = VGroup(*[note(0.7) for _ in range(3)]).arrange(RIGHT, buff=0.45).move_to(P(0, 0.35))
        self.au_mot("Le refrain")
        self.play(Write(titre), LaggedStart(*[FadeIn(n, shift=DOWN * 0.3) for n in notes], lag_ratio=0.2),
                  run_time=0.7)
        q = VGroup(self.t("Quelle part", 38, AMBRE), self.t("de ta chanson ?", 38, AMBRE)).arrange(DOWN, buff=0.1)
        q.move_to(P(0, 1.55))
        self.au_mot("quelle part")
        self.play(FadeIn(q, scale=1.15), run_time=0.4)
        self.play(self.sauter(notes))
        self.attendre_voix(marge=0.2)

        # ── 01 : la frise : 200 s, 4 refrains de 20 s ──
        self.dire("01-image")
        self.play(FadeOut(q), notes.animate.scale(0.75).move_to(P(0, 1.55)), run_time=0.4)
        fr = frise(CHANSON, 200, 4.0, 0.55, centre=P(0, -0.35))
        d = self.ligne([("3 min 20 s", WHITE), ("= 200 s", AMBRE)], 34).move_to(P(0, 0.6))
        self.au_mot("3 minutes")
        self.play(FadeIn(d[0], shift=UP * 0.15), GrowFromEdge(fr, LEFT), run_time=0.6)
        z = sans(self.t("0", 24, GREY_B)).next_to(fr.cadre, DOWN, buff=0.12).align_to(fr.cadre, LEFT)
        f200 = self.t("200 s", 24, GREY_B).next_to(fr.cadre, DOWN, buff=0.12).align_to(fr.cadre, RIGHT)
        self.au_mot("soit 200")
        self.play(FadeIn(d[1], scale=1.2), FadeIn(z), FadeIn(f200), run_time=0.4)
        lg = self.ligne([("4 ×", REFRAIN), ("20 s =", REFRAIN), ("80 s", REFRAIN)], 36).move_to(P(0, -1.6))
        self.au_mot("revient 4 fois")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.12), allumer(fr, run_time=1.2), self.sauter(notes), run_time=1.2)
        v20 = self.t("20 s", 22, REFRAIN).next_to(fr.refrains[0], UP, buff=0.1)
        self.au_mot("20 secondes")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.12), FadeIn(v20, scale=1.3), run_time=0.35)
        self.au_mot("80 secondes")
        self.play(FadeIn(lg[2], scale=1.3), Indicate(fr.refrains, color=WHITE, scale_factor=1.1), run_time=0.5)
        self.insister(lg[2], 1.1)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 02 : la question-pause (3 s) ──
        self.mini = frise(CHANSON, 200, 1.5, 0.32, centre=P(-1.2, -2.85))
        for r in self.mini.refrains:
            r.set_fill(REFRAIN, 1)
        self.play(FadeIn(self.mini), run_time=0.3)
        self.question_pause("02-question", "02b-reponse", ["80 s de refrain", "sur 200 s.", "Quelle proportion ?"],
                            [self.t("80 %", 30), self.t("40 %", 30), self.t("2,5", 30)], 1,
                            ["80 ÷ 200 = 0,4", "= 40 %"], mot_q="80 secondes", autres_r=self._rep_q)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question en commentaire ──
        self.dire("03-commentaire")
        et = self.t("À toi !", 40, AMBRE).move_to(P(0, 1.85))
        self.au_mot("À toi")
        self.play(FadeIn(et, scale=1.2), run_time=0.35)
        l1 = self.ligne([("refrain :", REFRAIN), ("30 s,", WHITE), ("3 fois", WHITE)], 32).move_to(P(0, 1.1))
        sans(l1[0])
        f3 = frise(CHANSON3, 180, 4.0, 0.5, centre=P(0, -0.35))
        self.au_mot("un refrain")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.12), run_time=0.3)
        self.au_mot("30 secondes")
        self.play(FadeIn(l1[1], scale=1.2), run_time=0.3)
        self.au_mot("3 fois")
        self.play(FadeIn(l1[2], scale=1.2), FadeIn(f3), allumer(f3, run_time=0.6), run_time=0.6)
        l2 = self.ligne([("chanson :", WHITE), ("3 min", WHITE)], 32).move_to(P(0, 0.4))
        sans(l2[0])
        self.au_mot("dans une chanson")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.12), run_time=0.3)
        self.au_mot("3 minutes")
        self.play(FadeIn(l2[1], scale=1.2), Indicate(f3.cadre, color=WHITE, scale_factor=1.04), run_time=0.4)
        r = self.borne(self.ligne([("Quelle", AMBRE), ("proportion ?", AMBRE)], 38), 0.9).move_to(P(0, -1.2))
        self.au_mot("Quelle proportion")
        self.play(FadeIn(r, scale=1.2), run_time=0.4)
        self.insister(r, 1.1)
        self.appel_commentaire(y=-2.05)
