# prop_lycee_evo_valeur_initiale_short.py
# EleveAI — Maths 1re et STMG (automatismes) — short jumeau de l'épisode
# COMMUN 10 « Retrouver la valeur de départ » (micro auto_evo_valeur_initiale).
# CEINTURE BLANCHE (échelle entière), rendu UNE fois, sans identité de classe.
#   · EN HAUT, le ticket de caisse « 120 € TTC, TVA 20 % » ; le prix HT s'y
#     inscrit (100 €) au moment où le calcul le trouve ;
#   · EN BAS, le calcul : 96 × 1,2 = 115,20 (barré) ; 120 ÷ 1,2 = 100 € ;
#   · 1 question-pause (3 s) : + 10 % → 110 € ; avant ? (A = 100 €) ;
#   · fin : 36 € TTC avec 20 % de TVA, prix HT ? (30 €) en commentaire,
#     puis la fin commune (fin_commune.py).
# Voix : manim/voix/lycee-evo-valeur-initiale-short.json ; WAV :
# public/sons/lycee-evo-valeur-initiale-short/ ; marques :
# prop_lycee_evo_valeur_initiale_short_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/prop_lycee_evo_valeur_initiale_short.py PropLyceeEvoValeurInitialeShort
# Brouillon : python -m manim render -ql -r 480,854 --disable_caching manim/scripts/premiere/prop_lycee_evo_valeur_initiale_short.py PropLyceeEvoValeurInitialeShort -o eleveai-maths-premiere-evo-valeur-initiale-short --media_dir manim/scripts/premiere/media-prop-lycee-evo-valeur-initiale-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from fin_commune import ecran_fin, appel_commentaire as appel_fin  # noqa: E402

DEP = "#38bdf8"
ARR = "#22c55e"
ENCRE = "#0f172a"
PAPIER = "#f8fafc"
BAISSE = "#ef4444"


def gras(s, fs=36, couleur=WHITE):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def pas_audit(m):
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def ticket(s=1.0, l=3.7, h=2.3, n=12):
    """Un ticket de caisse blanc, bord bas en dents de scie (sans texte)."""
    pts = [P(-l / 2, h / 2), P(l / 2, h / 2), P(l / 2, -h / 2)]
    for i in range(n):
        pts += [P(l / 2 - (i + 0.5) * l / n, -h / 2 - 0.12), P(l / 2 - (i + 1) * l / n, -h / 2)]
    return Polygon(*pts, fill_color=PAPIER, fill_opacity=1, stroke_width=0).scale(s)


class EvoShortBase(ShortProp):
    """Les outils communs des shorts 10, 11, 12 (repris de prop_lycee_appliquer_short.py)."""
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        # chaque ligne de la réponse prend la place d'une carte fausse (retirée à la réponse)
        ph2 = VGroup(*[self.t(x, 28, VERT_OK) for x in phrase])
        places = [j for j in range(3) if j != getattr(self, "bonne_q", 0)]
        for k, x in enumerate(ph2):
            if x.width > 3.85:
                x.scale_to_fit_width(3.85)
            x.move_to(cartes[places[k]]).set_x(0)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def ligne_rep(self, i, morceaux, fs=28, buff=0.2):
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs, buff=buff)
        if lg.width > 3.85:
            lg.scale_to_fit_width(3.85)
        return lg.move_to(self.ph_q[i])

    def garder_bonne(self, sc, bonne):
        """Réponse : les deux cartes fausses s'en vont (la phrase prend leur place)."""
        cs = sc.cartes_q
        return [FadeOut(cs[j]) for j in range(3) if j != bonne]

    def au(self, mot, *anims, rt=0.35):
        self.au_mot(mot)
        self.play(*anims, run_time=rt)

    def vider(self, garder):
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

    def commentaire(self, cle, lignes, y0=1.75, fs=40, pas=0.62):
        """L'écran « À toi ! » + la question (chaque ligne à son mot) +
        « Réponds en commentaire ! » ; SANS Ti-Margo (règle du 17/11).
        lignes : [(texte, couleur, mot de la voix)]."""
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        self.dire(cle)
        tit = self.t("À toi !", 52, JAUNE_TITRE).move_to(P(0, 2.75))
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1))
        for k, (txt, c, mot) in enumerate(lignes):
            t = self.t(txt, fs, c)
            if t.width > 4.0:
                t.scale_to_fit_width(4.0)
            t.move_to(P(0, y0 - k * pas))
            self.au(mot, FadeIn(t, shift=UP * 0.1), rt=0.3)
        appel_fin(self, y=-1.25)
        self.attendre_voix(marge=0.6)

    def borne_l(self, lg, l=3.8):
        if lg.width > l:
            lg.scale_to_fit_width(l)
        return lg

    def debut(self, titre_txt):
        margo = self.margo_bas()
        titre, badge = self.entete_short(titre_txt, self.ceinture)
        pas_audit(titre)
        self.add(badge)
        return [margo, titre, badge], titre


class PropLyceeEvoValeurInitialeShort(EvoShortBase):
    nom_voix = "lycee-evo-valeur-initiale-short"
    fichier_marques = "prop_lycee_evo_valeur_initiale_short_marques.json"

    def _rep_q(self, sc):
        l0 = sc.ligne_rep(0, ["110 ÷ 1,1", "=", "100 €"], buff=0.3)  # HD 23/11 : cadre collé au « = »
        sc.au("110 divisé", FadeIn(l0[0], shift=UP * 0.12), *self.garder_bonne(sc, 0))
        sc.au("égale 100", FadeIn(l0[1]), FadeIn(l0[2], scale=1.3))
        sc.play(Create(SurroundingRectangle(l0[2], color=VERT_OK, buff=0.14)), run_time=0.3)
        sc.rep_fini()

    def construct(self):
        garder, titre = self.debut("Le prix hors taxe")

        # ── 00 : le ticket : 120 € TTC, TVA 20 % ; HT = 96 € ? ──
        self.dire("00-accroche")
        self.au_mot("Avec")
        self.play(Write(titre), run_time=0.5)
        tk = ticket().move_to(P(0, 1.05))
        tva = gras("TVA 20 %", 34, BAISSE).move_to(tk.get_center() + P(0, 0.65))
        self.au("20 %", FadeIn(tk, shift=UP * 0.2), FadeIn(tva, scale=1.2), rt=0.4)
        ttc = gras("120 € TTC", 40, ENCRE).move_to(tk.get_center() + P(0, -0.02))
        self.au("120 €", FadeIn(ttc, scale=1.3), rt=0.4)
        q = self.ligne([("HT =", DEP), ("96 € ?", AMBRE)], 48, buff=0.28).move_to(P(0, -0.55))
        self.au("Hors taxe", FadeIn(q[0], shift=RIGHT * 0.12))
        self.au("96 €", FadeIn(q[1], scale=1.3), rt=0.4)
        self.insister(q[1], 1.15)
        self.attendre_voix(marge=0.2)

        # ── 01 : non ! 96 × 1,2 = 115,20 ; 120 ÷ 1,2 = 100 € ──
        self.dire("01-image")
        non = gras("Non !", 44, ROUGE_ERREUR).move_to(P(0, -0.55))
        self.au("Non", FadeOut(q), FadeIn(non, scale=1.3))
        L1 = self.borne_l(self.ligne([("96 × 1,2", WHITE), ("= 115,20 €", ROUGE_ERREUR)], 40)).move_to(P(0, -1.35))
        self.au("96 fois", FadeIn(L1[0], shift=RIGHT * 0.12))
        self.au("115,20", FadeIn(L1[1], scale=1.3))
        self.play(Create(Line(L1.get_left() + LEFT * 0.08, L1.get_right() + RIGHT * 0.08, color=ROUGE_ERREUR,
                              stroke_width=6)), run_time=0.3)
        L2 = self.borne_l(self.ligne([("120 ÷ 1,2", WHITE), ("=", WHITE), ("100 €", VERT_OK)], 38, buff=0.32))
        L2[2].shift(RIGHT * 0.14)  # HD 23/11 : réduite par borne_l, la ligne collait le « = » au cadre
        L2.move_to(P(0, -2.2))
        self.au("On divise", Indicate(ttc, color=DEP))
        self.au("120 divisé", FadeIn(L2[0], shift=RIGHT * 0.12))
        ht = gras("HT : 100 €", 36, "#15803d").move_to(tk.get_center() + P(0, -0.68))
        self.au("égale 100", FadeIn(L2[1]), FadeIn(L2[2], scale=1.3), FadeIn(ht, scale=1.3), rt=0.4)
        self.play(Create(SurroundingRectangle(L2[2], color=VERT_OK, buff=0.14)), run_time=0.3)  # HD 23/11 : chiffres contre le trait
        self.insister(ht, 1.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) : + 10 % → 110 € ; avant ? ──
        self.bonne_q = 0
        self.question_pause("02-question", "02b-reponse", ["Après + 10 %,", "un prix vaut 110 €.", "Avant ?"],
                            [self.t("100 €", 32), self.t("99 €", 32), self.t("121 €", 32)], 0,
                            ["110 ÷ 1,1 = 100 €"], mot_q="Après", autres_r=self._rep_q)
        self.vider(garder)

        # ── 03 : la question en commentaire (sans Ti-Margo), puis la fin commune ──
        self.commentaire("03-commentaire", [("Avec 20 % de TVA,", WHITE, "20 %"), ("un objet coûte", WHITE, "un objet"),
                                            ("36 € TTC.", JAUNE_TITRE, "36 €"), ("Prix HT ?", AMBRE, "Combien")])
        ecran_fin(self, "short", voix="04-abonne")
