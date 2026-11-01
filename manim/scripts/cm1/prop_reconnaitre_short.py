# prop_reconnaitre_short.py (cm1/)
# EleveAI — Maths CM1 ET CM2 — short jumeau de l'épisode 01 COMMUN « Reconnaître
# la proportionnalité » (micro prop_reconnaitre). CEINTURE BLANCHE (règle du
# short blanc, REGLES.md) : on VOIT la notion, aucun calcul posé à résoudre.
# Il AMUSE : « Un piège qui attrape même les adultes. »
#   · EN HAUT, l'image : 1 musicien, puis 5 musiciens qui jouent ENSEMBLE la
#     même chanson ; l'horloge reste à 3 minutes ;
#   · EN BAS, au même instant, le tableau musiciens → minutes : 1 → 3, puis
#     5 → « 15 ? » (barré, rouge) → 3 (vert) : PAS proportionnel ;
#   · 1 question-pause (3 s) : 1 œuf cuit en 10 min ; 3 œufs dans la même
#     casserole ? (A 30 min, B 10 min, C 13 min ; réponse B) ;
#   · fin : 5 tee-shirts étendus en même temps (réponse attendue : 2 h).
# Centres d'intérêt : musique, jeux-defis.
# Faits réels : aucun chiffre à sourcer (situations inventées).
# Rendu une fois, copié sous les deux noms (cm1, cm2) : le short n'affiche
# aucune classe.
#
# Voix : manim/voix/cm-prop-reconnaitre-short.json (validée par Frédéric le
# 01/11, débit −10), WAV dans public/sons/cm-prop-reconnaitre-short/ ;
# marques : manim/scripts/cm1/prop_reconnaitre_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/prop_reconnaitre_short.py PropReconnaitreShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/prop_reconnaitre_short.py PropReconnaitreShortCM -o eleveai-maths-cm1-prop-reconnaitre-short --media_dir manim/scripts/cm1/media-prop-reconnaitre-short
# Sorties : manim/sorties/cm1/maths/proportionnalite/01-reconnaitre/eleveai-maths-cm1-prop-reconnaitre-short.mp4
#           manim/sorties/cm2/maths/proportionnalite/01-reconnaitre/eleveai-maths-cm2-prop-reconnaitre-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

VIOLET_M = "#a78bfa"   # les musiciens = la ligne « Musiciens »
BLEU_H = "#38bdf8"     # l'horloge = la ligne « Minutes »


def guitariste(s=1.0, tenue=VIOLET_M):
    """Un musicien et sa guitare."""
    p = personne(peau="#c68642", tenue=tenue, cheveux="#1f2937", s=1.0)
    caisse = VGroup(Circle(radius=0.32, fill_color="#b45309", fill_opacity=1, stroke_width=0).move_to(P(-0.12, -1.25)),
                    Circle(radius=0.24, fill_color="#b45309", fill_opacity=1, stroke_width=0).move_to(P(0.2, -1.0)),
                    Circle(radius=0.08, fill_color="#1f2937", fill_opacity=1, stroke_width=0).move_to(P(0.0, -1.15)))
    manche = Line(P(0.2, -1.0), P(0.95, -0.25), color="#78350f", stroke_width=8)
    p.add(manche, caisse)
    return p.scale(s)


def note(s=1.0, couleur=AMBRE):
    """Une croche dessinée (pas d'emoji)."""
    tete = Ellipse(width=0.22, height=0.16, fill_color=couleur, fill_opacity=1, stroke_width=0).rotate(0.4)
    hampe = Line(tete.get_right() + DOWN * 0.02, tete.get_right() + UP * 0.45, color=couleur, stroke_width=4)
    drapeau = Line(hampe.get_end(), hampe.get_end() + P(0.16, -0.16), color=couleur, stroke_width=4)
    return VGroup(tete, hampe, drapeau).scale(s)


def horloge(r=0.45):
    """Une horloge : le cadran, les 12 traits, deux aiguilles."""
    cadran = Circle(radius=r, fill_color="#0f172a", fill_opacity=1, stroke_color=BLEU_H, stroke_width=5)
    traits = VGroup(*[Line(P(0.82 * r * np.cos(a), 0.82 * r * np.sin(a)), P(r * np.cos(a), r * np.sin(a)),
                           color=WHITE, stroke_width=2) for a in np.arange(0, TAU, TAU / 12)])
    g = Line(ORIGIN, P(0, 0.62 * r), color=WHITE, stroke_width=4)
    m = Line(ORIGIN, P(0.75 * r * np.cos(PI / 6), 0.75 * r * np.sin(PI / 6)), color=AMBRE, stroke_width=4)
    return VGroup(cadran, traits, g, m)


def tee_shirt(couleur, s=1.0):
    corps = Polygon(P(-0.3, 0.3), P(-0.12, 0.36), P(0, 0.3), P(0.12, 0.36), P(0.3, 0.3), P(0.48, 0.12),
                    P(0.36, 0.0), P(0.24, 0.1), P(0.24, -0.38), P(-0.24, -0.38), P(-0.24, 0.1), P(-0.36, 0.0),
                    P(-0.48, 0.12), fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    pince = Rectangle(width=0.06, height=0.14, fill_color="#a16207", fill_opacity=1, stroke_width=0)
    pince.move_to(P(0, 0.36))
    return VGroup(corps, pince).scale(s)


def soleil(r=0.35):
    disque = Circle(radius=r, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(P(1.3 * r * np.cos(a), 1.3 * r * np.sin(a)), P(1.7 * r * np.cos(a), 1.7 * r * np.sin(a)),
                           color="#facc15", stroke_width=4) for a in np.arange(0, TAU, TAU / 10)])
    return VGroup(rayons, disque)


class PropReconnaitreShortCM(ShortProp):
    nom_voix = "cm-prop-reconnaitre-short"
    fichier_marques = "prop_reconnaitre_short_marques.json"
    ceinture = "blanche"

    q_lignes = None   # la question écrite en lignes de MORCEAUX (un nombre au plus)
    ph_lignes = None  # idem pour la phrase de réponse

    def _disposer_q(self, question, choix, phrase):
        """Comme le gabarit, mais la question et la réponse en lignes de morceaux :
        chaque Text (un nombre au plus) entre à SON mot (l'audit le mesure)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)

        def lignes(spec, fs, couleur, ref):
            g = VGroup(*[self.borne(VGroup(*[self.t(m, fs, couleur) for m in ms]).arrange(RIGHT, buff=0.12))
                         for ms in spec]).arrange(DOWN, buff=0.1)
            return g.move_to(ref).align_to(ref, UP).set_x(0)

        if self.q_lignes:
            q = lignes(self.q_lignes, 28, WHITE, q)
        if self.ph_lignes:
            ph = lignes(self.ph_lignes, 26, VERT_OK, ph)
            self.ph_q = ph
        return tete, q, cartes, pause, rebours, ph

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le piège du temps", self.ceinture)
        self.add(badge)
        garder = [badge, titre, margo]
        tb = TableauProp(["Musiciens", "Minutes"], [[1, 5], [3, 15]], montrer=False, largeur_case=1.0,
                         largeur_libelle=1.75, hauteur=0.66, fs=32, marge=0.16, centre=P(0, -1.1))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("piège")
        self.play(Write(titre), run_time=0.6)
        self.au_mot("adultes")
        ad = self.borne(self.t("même les adultes !", 34, AMBRE), 0.7).move_to(P(0, 1.55))
        self.play(FadeIn(ad, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("Tu es prêt")
        pret = self.t("Tu es prêt ?", 44, ORANGE_RETENUE).move_to(P(0, 0.4))
        self.play(FadeIn(pret, scale=1.3), run_time=0.4)
        self.insister(pret, 1.15)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(ad), FadeOut(pret), run_time=0.3)

        # ── 01 : 1 musicien, 3 minutes ──
        self.dire("01-chanson")
        g1 = guitariste(0.5).move_to(P(-1.1, 1.3))
        self.au_mot("1 musicien")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(g1, shift=UP * 0.2), run_time=0.4)
        self.play(tb.allumer(0, 0), FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
        notes = VGroup(*[note(0.8).move_to(g1.get_right() + P(0.15 + 0.3 * k, 0.3 + 0.2 * (k % 2))) for k in range(2)])
        self.au_mot("chanson")
        self.play(LaggedStart(*[FadeIn(n, shift=UP * 0.2) for n in notes], lag_ratio=0.3), tb.eteindre(0, 0),
                  run_time=0.5)
        hor = horloge(0.42).move_to(P(1.25, 1.45))
        self.au_mot("3 minutes")
        m3 = self.t("3 min", 30, BLEU_H).next_to(hor, DOWN, buff=0.12)
        self.play(FadeIn(hor, scale=0.6), FadeIn(m3), tb.allumer(1, 0), FadeIn(tb.valeur(1, 0), scale=1.4),
                  run_time=0.45)
        self.play(tb.eteindre(1, 0), run_time=0.2)
        self.attendre_voix(marge=0.2)

        # ── 02 : 5 musiciens : 5 × 3 = 15 minutes ? ──
        self.dire("02-cinq")
        groupe = VGroup(*[guitariste(0.3, tenue=c) for c in (VIOLET_M, "#f472b6", "#34d399", "#fb923c", "#60a5fa")])
        groupe.arrange(RIGHT, buff=0.04).scale_to_fit_width(3.0).move_to(P(-0.55, 1.5))
        self.au_mot("5 musiciens")
        self.play(FadeOut(notes), FadeOut(g1), hor.animate.scale(0.72).move_to(P(1.6, 1.7)),
                  m3.animate.scale(0.8).move_to(P(1.6, 1.08)), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.2) for m in groupe], lag_ratio=0.15),
                  tb.allumer(0, 1), FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.6)
        self.play(tb.eteindre(0, 1), run_time=0.2)
        self.au_mot("ensemble")
        ens = self.t("ensemble", 28, VIOLET_M).move_to(P(0, 0.5))
        self.play(FadeIn(ens, shift=UP * 0.1), run_time=0.3)
        lg = self.ligne([("5 × 3", WHITE), ("= 15 min ?", ORANGE_RETENUE)], 36).move_to(P(0, -2.35))
        self.au_mot("5 fois 3")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("15 minutes")
        t15 = tb.valeur(1, 1, ORANGE_RETENUE)
        self.play(FadeIn(lg[1], scale=1.2), FadeIn(t15, scale=1.4), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 03 : non ! toujours 3 minutes ──
        self.dire("03-non")
        self.au_mot("Non")
        x15 = tb.barrer(1, 1)
        non = self.t("Non !", 52, ROUGE_ERREUR).move_to(P(0, -2.35))
        self.play(Create(x15), FadeOut(lg), FadeIn(non, scale=1.4), run_time=0.4)
        self.au_mot("en même temps")
        mt = self.t("en même temps", 28, VIOLET_M).move_to(P(0, 0.5))
        notes5 = VGroup(*[note(0.45).move_to(m.get_top() + UP * 0.14) for m in groupe])
        self.play(FadeOut(ens), FadeIn(mt), LaggedStart(*[FadeIn(n, shift=UP * 0.15) for n in notes5], lag_ratio=0.05),
                  *[Indicate(m, color=AMBRE, scale_factor=1.12) for m in groupe], run_time=0.7)
        self.au_mot("Toujours 3 minutes")
        trois = tb.poser(1, 1, 3, VERT_OK)
        self.play(FadeOut(t15), FadeOut(x15), FadeIn(trois, scale=1.5), Indicate(hor, color=VERT_OK),
                  Indicate(m3, color=VERT_OK), run_time=0.5)
        self.insister(trois, 1.3)
        self.au_mot("Plus de musiciens")
        pl = self.bloc(["Plus de musiciens :", "pas plus long !"], 30, VERT_OK).move_to(P(0, -2.35))
        self.play(FadeOut(non), run_time=0.2)
        self.poser_lignes(pl, "up", 0.3)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 04 : la question-pause (3 s) : les œufs ──
        self.q_lignes = [["1 œuf", "cuit en", "10 minutes."], ["3 œufs,", "dans la même"], ["casserole, cuisent en…"]]
        self.ph_lignes = [["Les 3 œufs :", "10 minutes."], ["On ne multiplie pas toujours !"]]
        self.question_pause("04-question", "04b-reponse",
                            ["1 œuf cuit en 10 minutes.", "3 œufs, dans la même", "casserole, cuisent en…"],
                            [self.t("30 minutes", 30), self.t("10 minutes", 30), self.t("13 minutes", 30)], 1,
                            ["Les 3 œufs cuisent en même temps :", "10 minutes.", "On ne multiplie pas toujours !"],
                            mot_q="1 œuf")
        self.vider(garder)

        # ── 05 : la question en commentaire : les tee-shirts ──
        self.dire("05-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 40, AMBRE).move_to(P(0, 1.95))
        sun = soleil(0.28).move_to(P(1.6, 1.95))
        self.play(FadeIn(et, scale=1.3), FadeIn(sun, scale=0.6), run_time=0.4)
        corde = Line(P(-1.95, 1.3), P(1.95, 1.3), color=GREY_B, stroke_width=3)
        tt = TableauProp(["Tee-shirts", "Heures"], [[1, 5], [2, "?"]], montrer=False, largeur_case=1.0,
                         largeur_libelle=1.75, hauteur=0.66, fs=32, marge=0.16, centre=P(0, -0.55))
        t1 = tee_shirt("#f472b6", 0.8).move_to(P(-1.5, 1.05))
        self.au_mot("1 tee-shirt")
        self.play(Create(corde), FadeIn(t1, shift=DOWN * 0.2), FadeIn(tt.fond), FadeIn(tt.valeur(0, 0), scale=1.4),
                  run_time=0.5)
        self.au_mot("2 heures")
        h2 = self.t("2 h", 30, BLEU_H).next_to(t1, DOWN, buff=0.1)
        self.play(FadeIn(h2), FadeIn(tt.valeur(1, 0), scale=1.4), Indicate(sun, color=AMBRE), run_time=0.4)
        cinq = VGroup(*[tee_shirt(c, 0.6) for c in ("#60a5fa", "#34d399", "#fb923c", "#a78bfa", "#facc15")])
        cinq.arrange(RIGHT, buff=0.06).move_to(P(0, 1.1))
        self.au_mot("5 tee-shirts")
        self.play(FadeOut(h2), FadeOut(t1),
                  LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in cinq], lag_ratio=0.12),
                  FadeIn(tt.valeur(0, 1), scale=1.4), run_time=0.6)
        self.au_mot("en même temps")
        mt = self.t("en même temps", 26, AMBRE).move_to(P(0, 0.5))
        self.play(FadeIn(mt, shift=UP * 0.1), run_time=0.3)
        self.au_mot("combien de temps")
        self.play(FadeIn(tt.trou(1, 1), scale=1.3), run_time=0.35)
        self.insister(tt.trou(1, 1), 1.3)
        self.appel_commentaire(y=-1.95)
