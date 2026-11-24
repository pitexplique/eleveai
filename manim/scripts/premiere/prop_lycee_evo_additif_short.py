# prop_lycee_evo_additif_short.py
# EleveAI — Maths 1re et STMG (automatismes) — short jumeau de l'épisode COMMUN 07
# « Le coefficient multiplicateur » (micro auto_evo_additif_multiplicatif).
# CEINTURE BLANCHE (échelle entière), rendu UNE fois, copié sous les deux noms.
# Il AMUSE : « + 5 %, c'est × 1,5 ? » — Non ! Deux barres face à face :
#   · 150 % (100 % + un GROS bout rouge de 50 %), barrée ;
#   · 105 % (100 % + un petit bout vert de 5 %) : × 1,05 ;
#   · 1 question-pause (3 s) : + 20 % = × 1,2 (B) ;
#   · en commentaire : + 8 %, c'est fois combien ? (× 1,08).
# Centre d'intérêt : argent-budget. Chiffres inventés, pas de source.
# Voix : manim/voix/lycee-evo-additif-short.json (« go » le 23/11, débit −10) ;
# WAV : public/sons/lycee-evo-additif-short/ ; marques : prop_lycee_evo_additif_short_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/prop_lycee_evo_additif_short.py PropLyceeEvoAdditifShort
# Brouillon : python -m manim render -ql -r 480,854 --disable_caching manim/scripts/premiere/prop_lycee_evo_additif_short.py PropLyceeEvoAdditifShort -o eleveai-maths-premiere-evo-additif-short --media_dir manim/scripts/premiere/media-prop-lycee-evo-additif-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

BLEU_C = "#38bdf8"     # les 100 % (bleu)
BOUT = "#fb923c"       # le bout ajouté (orange)
FAUX = "#ef4444"


def sans(m):
    """Un décor (le titre de la vidéo) : ni attente de synchro, ni audit."""
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def gras(s, fs=34, couleur=WHITE):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def barre_s(largeur=2.4, h=0.5, centre=ORIGIN):
    """La barre de 100 % du short : 10 morceaux bleus dans une piste."""
    piste = RoundedRectangle(width=largeur, height=h, corner_radius=0.08, fill_color="#1e293b", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3)
    W, hh = largeur - 0.12, h - 0.12
    x0 = -largeur / 2 + 0.06
    morceaux = VGroup(*[Rectangle(width=W / 10, height=hh, stroke_width=0, fill_color=BLEU_C, fill_opacity=1)
                        .move_to(P(x0 + (i + 0.5) * W / 10, 0)) for i in range(10)])
    traits = VGroup(*[Line(P(x0 + i * W / 10, -hh / 2), P(x0 + i * W / 10, hh / 2), color="#0f172a", stroke_width=2)
                      for i in range(1, 10)])
    g = VGroup(piste, morceaux, traits).move_to(centre)
    g.piste, g.lm, g.hh = piste, W / 10, hh
    return g


def bout_s(b, k, couleur=BOUT):
    """Le bout ajouté : k morceaux de 10 %."""
    return Rectangle(width=b.lm * k, height=b.hh, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                     stroke_width=1.5).next_to(b.piste, RIGHT, buff=0.03)


class PropLyceeEvoAdditifShort(ShortProp):
    nom_voix = "lycee-evo-additif-short"
    fichier_marques = "prop_lycee_evo_additif_short_marques.json"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph2 = self.bloc(phrase, 28, VERT_OK).next_to(cartes, DOWN, buff=0.14).set_x(0)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def ligne_rep(self, i, morceaux, fs=28):
        return super().ligne_rep(i, morceaux, fs)

    def dire(self, nom, dossier=None):
        """Le début de chaque clé de voix, pour les chapitres (lu dans le log)."""
        print(f"CLE {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier) if dossier is not None else super().dire(nom)

    def lg(self, morceaux, y, fs=36):
        """Une ligne de morceaux (texte, couleur), centrée, jamais plus large que 3,9."""
        l = self.ligne(morceaux, fs, buff=0.24)
        if l.width > 3.9:
            l.scale_to_fit_width(3.9)
        return l.move_to(P(0, y))

    def poser(self, l, mots, rt=0.3):
        for m, mot in zip(l, mots):
            if mot:
                self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
            self.play(FadeIn(m, scale=1.2), run_time=rt)

    def _rep_q(self, sc):
        l0 = sc.ligne_rep(0, ["100 % + 20 %", "= 120 %"])
        l1 = sc.ligne_rep(1, ["= 1,2."])
        sc.au_mot("100 % plus")
        sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("égale 120")
        sc.play(FadeIn(l0[1], scale=1.3), run_time=0.3)
        sc.au_mot("1,2.")
        sc.play(FadeIn(l1[0], scale=1.3), run_time=0.3)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le piège de la hausse", self.ceinture)
        sans(titre)  # le titre de la vidéo : posé d un bloc (ni synchro, ni audit)
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Un prix")
        self.play(Write(titre), run_time=0.5)
        b0 = barre_s(2.6, 0.6, P(-0.3, 1.45))
        self.play(FadeIn(b0, shift=UP * 0.2), run_time=0.35)
        p5 = gras("+ 5 %", 48, BOUT).move_to(P(0, 0.45))
        self.au_mot("5 %")
        self.play(FadeIn(p5, scale=1.3), run_time=0.35)
        q = gras("× 1,5 ?", 60, AMBRE).move_to(P(0, -0.75))
        self.au_mot("1,5")
        self.play(FadeIn(q, scale=1.4), run_time=0.4)
        self.play(Wiggle(q, scale_value=1.1, rotation_angle=0.05), run_time=0.6)
        self.attendre_voix(marge=0.2)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.3)

        # ── 01 : Non ! 150 % (barré) / 105 % (vert) ──
        self.dire("01-image")
        non = gras("Non !", 52, ROUGE_ERREUR).move_to(P(0, 1.95))
        self.au_mot("Non")
        self.play(FadeIn(non, scale=1.4), run_time=0.3)
        b1 = barre_s(2.4, 0.5, P(-0.6, 1.2))
        bt1 = bout_s(b1, 5, FAUX)
        L1 = self.lg([("× 1,5", FAUX), ("= 150 %", FAUX)], 0.55, 36)
        L1b = self.lg([("= + 50 % !", FAUX)], 0.0, 34)
        self.au_mot("1,5")
        self.play(FadeIn(b1, shift=UP * 0.15), FadeIn(L1[0], scale=1.2), run_time=0.3)
        self.au_mot("150 %")
        self.play(FadeIn(bt1, shift=LEFT * 0.3), FadeIn(L1[1], scale=1.2), run_time=0.35)
        self.au_mot("plus 50")
        self.play(FadeIn(L1b, scale=1.2), run_time=0.3)
        b2 = barre_s(2.4, 0.5, P(-0.6, -0.8))
        bt2 = bout_s(b2, 0.5, VERT_OK)
        L2 = self.lg([("+ 5 %", BOUT), ("= 105 %", VERT_OK)], -1.45, 36)
        L2b = self.lg([("= × 1,05", VERT_OK)], -2.0, 40)
        self.au_mot("Plus 5 %")
        self.play(FadeIn(b2, shift=UP * 0.15), FadeIn(L2[0], scale=1.2), run_time=0.3)
        self.au_mot("105 %")
        self.play(FadeIn(bt2, shift=LEFT * 0.2), FadeIn(L2[1], scale=1.2), run_time=0.35)
        self.au_mot("1,05")
        self.play(FadeIn(L2b, scale=1.3), run_time=0.35)
        self.play(Create(SurroundingRectangle(L2b, color=VERT_OK, buff=0.08, corner_radius=0.1, stroke_width=4)),
                  Indicate(bt2, color=WHITE, scale_factor=2.0), run_time=0.45)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.3)

        # ── 02 : la question-pause (3 s) : + 20 % = × 1,2 (B) ──
        choix = [self.t("1,02", 30), self.t("1,2", 30), self.t("20", 30)]
        for c in choix:
            for f in c.get_family():
                f._pas_audit = True
        self.question_pause("02-question", "02b-reponse", ["Plus 20 %, c'est fois :"], choix, 1,
                            ["100 % + 20 % = 120 %", "= 1,2."], mot_q="Plus 20", autres_r=self._rep_q)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in (titre, badge))], run_time=0.3)

        # ── 03 : la question en commentaire (sans Ti-Margo, règle du 17/11) ──
        self.dire("03-commentaire")
        q1 = gras("À toi :", 44, AMBRE).move_to(P(0, 1.85))
        self.au_mot("À toi")
        self.play(FadeIn(q1, shift=DOWN * 0.15), run_time=0.3)
        b3 = barre_s(2.6, 0.55, P(-0.15, 1.05))
        bt3 = bout_s(b3, 0.8)
        L3 = self.lg([("+ 8 %", BOUT), ("= × ?", AMBRE)], 0.2, 46)
        self.au_mot("plus 8")
        self.play(FadeIn(b3), FadeIn(bt3, shift=LEFT * 0.2), FadeIn(L3[0], scale=1.3), run_time=0.35)
        self.au_mot("fois combien")
        self.play(FadeIn(L3[1], scale=1.3), run_time=0.35)
        appel_commentaire(self, y=-1.2)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="04-abonne")
