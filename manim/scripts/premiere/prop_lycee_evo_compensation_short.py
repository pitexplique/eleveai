# prop_lycee_evo_compensation_short.py
# EleveAI — Maths 1re et STMG (automatismes) — short jumeau de l'épisode 14
# « Le piège de la compensation » (micro auto_evo_piege_compensation).
# CEINTURE BLANCHE (échelle entière), rendu UNE fois, sans identité de classe.
#   · EN HAUT, la barre du prix : 100 € (bleu), + 50 % = le bout vert (150 €),
#     − 50 % = la moitié rouge (75 €), sous le trait des 100 € ;
#   · EN BAS, au même instant, la chaîne 100 € → 150 € → 75 € et × 1,5 puis
#     × 0,5 = × 0,75 ;
#   · 1 question-pause (3 s) : + 10 % puis − 10 % sur 200 € → 198 € (A) ;
#   · fin : − 20 % puis + 20 % sur 50 € (48 €) en commentaire.
# Centre d'intérêt : argent-budget. Aucun fait réel, pas de source.
#
# Voix : manim/voix/lycee-evo-compensation-short.json (go de Frédéric le 23/11,
# débit −10) ; WAV : public/sons/lycee-evo-compensation-short/ ; marques :
# manim/scripts/premiere/prop_lycee_evo_compensation_short_marques.json.
# Outils (non modifiés) : prop_commun.py (ShortProp), fin_commune.py.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/prop_lycee_evo_compensation_short.py PropLyceeEvoCompensationShort
# Brouillon : PYTHONIOENCODING=utf-8 python -m manim render -ql -r 480,854 --disable_caching manim/scripts/premiere/prop_lycee_evo_compensation_short.py PropLyceeEvoCompensationShort -o eleveai-maths-premiere-evo-compensation-short --media_dir manim/scripts/premiere/media-prop-lycee-evo-compensation-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

DEP = "#60a5fa"
HAUSSE = "#22c55e"
BAISSE = "#ef4444"
X0, U = -1.65, 0.022   # la barre : bord gauche, longueur d'un euro


def morceau(e0, e1, y, couleur, h=0.6, op=1.0):
    """Le morceau de barre de e0 € à e1 €."""
    return Rectangle(width=(e1 - e0) * U, height=h, fill_color=couleur, fill_opacity=op, stroke_color=WHITE,
                     stroke_width=2).move_to(P(X0 + (e0 + e1) / 2 * U, y))


class PropLyceeEvoCompensationShort(ShortProp):
    nom_voix = "lycee-evo-compensation-short"
    fichier_marques = "prop_lycee_evo_compensation_short_marques.json"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for c in cartes:  # la place du ✓, réservée à droite (épisode 13, 23/11)
            corps = c[1][1]
            lim = c[0].get_right()[0] - 0.85
            if corps.get_right()[0] > lim:
                g = corps.get_left()[0]
                corps.scale_to_fit_width(lim - g).align_to(P(g, 0), LEFT)
        ph2 = self.bloc(phrase, 28, VERT_OK).next_to(cartes, DOWN, buff=0.14).set_x(0)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def ligne_rep(self, i, morceaux, fs=28):
        return super().ligne_rep(i, morceaux, fs)

    def lg(self, morceaux, y, fs=34, largeur=3.8):
        g = self.ligne(morceaux, fs, buff=0.3)  # pas « puis− 50 % » (planche du 23/11)
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g.move_to(P(0, y))

    def jouer(self, lg, mots, anims=None, rt=0.3):
        anims = anims or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.12), *anims.get(i, []), run_time=rt)

    def _rep_q(self, sc):
        l0 = sc.ligne_rep(0, ["220 €,", "puis"])
        l1 = sc.ligne_rep(1, ["220 − 22", "= 198 €."])
        sc.au_mot("220 €")
        sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("puis 220")
        sc.play(FadeIn(l0[1], shift=UP * 0.12), FadeIn(l1[0], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("égale 198")
        sc.play(FadeIn(l1[1], scale=1.3), run_time=0.35)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Retour au départ ?", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche : + 50 % puis − 50 % = départ ? ──
        self.dire("00-accroche")
        L1 = self.lg([("+ 50 %", HAUSSE)], 1.35, 60)
        self.au_mot("Plus 50")
        self.play(Write(titre), FadeIn(L1, scale=1.3), run_time=0.45)
        L2 = self.lg([("puis", WHITE), ("− 50 %", BAISSE)], 0.35, 60)
        self.jouer(L2, ["puis moins", "moins 50"])
        L3 = self.lg([("= départ ?", AMBRE)], -0.75, 54, largeur=3.3)
        self.jouer(L3, ["au départ"])
        self.insister(L3, 1.12, 0.2)
        self.attendre_voix(marge=0.2)

        # ── 01 : 100 € → 150 € → 75 € ; × 1,5 puis × 0,5 = × 0,75 ──
        self.dire("01-image")
        self.play(FadeOut(L1), FadeOut(L2), FadeOut(L3), run_time=0.25)
        Y = 1.55
        b100 = morceau(0, 100, Y, DEP)
        v50 = morceau(100, 150, Y, HAUSSE)
        r75 = morceau(75, 150, Y, BAISSE, op=0.92)
        tr = DashedLine(P(X0 + 100 * U, Y - 0.45), P(X0 + 100 * U, Y + 0.45), color=JAUNE_TITRE, stroke_width=4)
        C1 = self.lg([("100 €", DEP), ("→ 150 €", HAUSSE), ("→ 75 €", BAISSE)], 0.5, 34)
        self.jouer(C1, ["Non ! 100", "puis 150", "puis 75"],
                   {0: [GrowFromEdge(b100, LEFT), Create(tr)], 1: [GrowFromEdge(v50, LEFT)], 2: [FadeIn(r75)]})
        self.play(Indicate(r75, color=BAISSE, scale_factor=1.08), run_time=0.4)
        C2 = self.lg([("× 1,5", HAUSSE), ("puis", WHITE), ("× 0,5", BAISSE)], -0.35, 42)
        self.jouer(C2, ["Fois 1,5", None, "fois 0,5"])
        C3 = self.lg([("au total :", WHITE), ("× 0,75", AMBRE)], -1.3, 40, largeur=3.3)  # HD 23/11 : texte contre le cadre
        self.jouer(C3, ["au total", "fois 0,75"])
        self.play(Create(SurroundingRectangle(C3, color=AMBRE, buff=0.16, corner_radius=0.1)), run_time=0.3)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 02 : la question-pause (3 s) : + 10 % puis − 10 % sur 200 € → 198 € ──
        choix = [self.t("198 €", 30), self.t("200 €", 30), self.t("202 €", 30)]
        for c in choix:  # audités à la question ; à la réponse, les cartes ne font que pâlir
            for f in c.get_family():
                f._pas_audit = True
        self.question_pause("02-question", "02b-reponse", ["+ 10 %, puis − 10 %,", "sur 200 € :"],
                            choix, 0, ["220 €, puis", "220 − 22 = 198 €."], mot_q="Plus 10",
                            autres_r=self._rep_q)

        # ── 03 : la question en commentaire (sans Ti-Margo, règle du 17/11) ──
        self.dire("03-commentaire")
        self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.3)
        self.remove(*self.mobjects)
        tit = self.t("À toi !", 52, JAUNE_TITRE).move_to(P(0, 2.6))
        self.au_mot("À toi")
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.35)
        Q1 = self.lg([("− 20 %", BAISSE), ("puis", WHITE), ("+ 20 %", HAUSSE)], 1.55, 44)
        self.jouer(Q1, ["moins 20", None, "plus 20"])
        Q2 = self.lg([("sur 50 €.", WHITE)], 0.8, 44)
        self.jouer(Q2, ["sur 50"])
        Q3 = self.lg([("Combien à la fin ?", AMBRE)], 0.05, 44)
        self.jouer(Q3, ["Combien"])
        appel_commentaire(self, y=-1.2)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="04-abonne")
