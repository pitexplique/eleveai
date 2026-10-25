# frac_decimal_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 03 « Fraction, décimal,
# pourcentage » (micro fraction_decimal). CEINTURE JAUNE (pas blanche) : on
# voit le sondage se remplir, mais le short pose aussi le calcul 13 ÷ 20 = 0,65
# et le passage au pourcentage (un cran au-dessus du short « on voit »).
# Il AMUSE : Yanis, COMMUNITY MANAGER, lance un sondage en story (escalade ou
# kayak ?) :
#   · EN HAUT, la story : les votes tombent un à un dans le sondage ;
#   · EN BAS, au même instant, la barre du coach (20 parts, une par vote) se
#     colorie : bleu = escalade, orange = kayak (même code couleur en haut) ;
#   · surprise : l'appli calcule 13 ÷ 20 = 0,65 → 65 % (et 35 % pour le kayak) ;
#   · 1 question-pause (3 s) : 3 votes sur 20 → 15 % (leurres de Frédéric :
#     chiffres collés 3,2 %, oubli du × 100 : 0,15 %) ;
#   · fin : « 12 votes sur 25 : quel pourcentage ? » en commentaire (48 %).
# Centres d'intérêt : reseaux-sociaux. Aucune donnée réelle citée.
#
# Voix : manim/voix/4e-frac-decimal-short.json (débit −10) ; marques :
# manim/scripts/4e/frac_decimal_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/frac_decimal_short.py FracDecimalShort4e -o eleveai-maths-4e-frac-decimal-short --media_dir manim/scripts/4e/media-frac-decimal-short
# Sortie : manim/sorties/4e/maths/fractions/03-decimal/eleveai-maths-4e-frac-decimal-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotd_commun import *  # noqa: E402,F403

Y_TEL, Y_BARRE = 1.0, -1.05
ESC, KAY = BLEU_PART, ORANGE_PART
LP = 2.2   # la longueur d'une pilule du sondage


def story():
    """La story : le cadre du téléphone, la question, deux pilules vides.
    .p_esc .p_kay (pistes) ; .plein_esc .plein_kay (le remplissage)."""
    tel = RoundedRectangle(width=3.9, height=2.45, corner_radius=0.25, fill_color="#1e1b4b", fill_opacity=1,
                           stroke_color="#a78bfa", stroke_width=4).move_to(P(0, Y_TEL))
    q = Text("Escalade ou kayak ?", font_size=22, color=WHITE, weight=BOLD).move_to(P(0, Y_TEL + 0.8))
    q.sans_synchro = True
    g = VGroup(tel, q)
    for nom, y, c in (("esc", Y_TEL + 0.15, ESC), ("kay", Y_TEL - 0.55, KAY)):
        piste = RoundedRectangle(width=LP, height=0.45, corner_radius=0.22, fill_color="#334155", fill_opacity=1,
                                 stroke_width=0).move_to(P(-0.35, y))
        plein = RoundedRectangle(width=0.01, height=0.45, corner_radius=0.0, fill_color=c, fill_opacity=1,
                                 stroke_width=0).move_to(piste.get_left(), LEFT)
        lab = Text("Escalade" if nom == "esc" else "Kayak", font_size=22, color=WHITE)
        lab.move_to(piste.get_left() + RIGHT * (0.15 + 0.5), LEFT).set_y(y).align_to(piste.get_left() + RIGHT * 0.15, LEFT)
        lab.sans_synchro = True
        setattr(g, "p_" + nom, piste)
        setattr(g, "plein_" + nom, plein)
        g.add(piste, plein, lab)
    return g


def remplir(st, nom, frac, run_time=1.0):
    plein, piste = getattr(st, "plein_" + nom), getattr(st, "p_" + nom)
    g = piste.get_left()

    def maj(m, a):
        w = max(0.01, LP * frac * a)
        m.stretch_to_fit_width(w)
        m.move_to(g, LEFT)

    return UpdateFromAlphaFunc(plein, maj, run_time=run_time, rate_func=smooth)


class FracDecimalShort4e(ShortLotD):
    nom_voix = "4e-frac-decimal-short"
    fichier_marques = "frac_decimal_short_marques.json"
    ceinture = "jaune"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le sondage", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : la story ──
        self.dire("00-accroche")
        self.au_mot("Yanis")
        ya = self.bloc(["Yanis,", "community manager"], 30, BLEU_CALCUL).move_to(P(0, -1.6))
        self.play(FadeIn(ya, scale=0.8), run_time=0.4)
        st = story()
        self.au_mot("un sondage")
        self.play(FadeIn(st, shift=UP * 0.2), Write(titre), run_time=0.6)
        self.au_mot("Les votes arrivent")
        b = Barre(20, 0, largeur=3.9, hauteur=0.42, couleur=ESC, marge=0.1, sw=2, centre=P(0, Y_BARRE))
        self.play(FadeOut(ya), b.apparaitre(0.9), run_time=0.9)
        self.attendre_voix(marge=0.1)

        # ── 01 : les 20 votes ──
        self.dire("01-votes")
        self.au_mot("20 votes")
        n20 = self.t("20 votes", 30).next_to(b, DOWN, buff=0.15)
        self.play(FadeIn(n20), run_time=0.3)
        self.au_mot("13 pour")
        cpt = self.t("13", 30, ESC).next_to(st.p_esc, RIGHT, buff=0.12)
        self.play(b.colorier(range(13), lag=0.08), remplir(st, "esc", 13 / 20, 1.2), FadeIn(cpt), run_time=1.2)
        self.au_mot("7 pour")
        ck = self.t("7", 30, KAY).next_to(st.p_kay, RIGHT, buff=0.12)
        self.play(b.colorier(range(13, 20), couleur=KAY, lag=0.08), remplir(st, "kay", 7 / 20, 1.0), FadeIn(ck),
                  run_time=1.0)
        self.au_mot("13 vingtièmes")
        f = EcritureFraction(13, 20, fs=44).move_to(P(-1.35, -2.1))
        self.play(FadeOut(n20), FadeIn(f, scale=1.3), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 02 : la surprise : 0,65 → 65 % ──
        self.dire("02-surprise")
        self.au_mot("13 divisé par 20")
        d = self.t("= 13 ÷ 20", 34).next_to(f, RIGHT, buff=0.2).set_y(f.trait.get_y())
        self.play(FadeIn(d, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("0,65.")
        r = self.t("= 0,65", 34, BLEU_CALCUL).next_to(d, DOWN, buff=0.15).align_to(d, LEFT)
        self.play(FadeIn(r, scale=1.3), run_time=0.4)
        self.au_mot("65 %")
        pc = self.t("65 %", 30, WHITE).move_to(cpt)
        self.play(ReplacementTransform(cpt, pc), Flash(pc, color=ESC, flash_radius=0.4), run_time=0.6)
        self.insister(pc, 1.4)
        self.au_mot("35 %")
        pk = self.t("35 %", 30, WHITE).move_to(ck)
        self.play(ReplacementTransform(ck, pk), run_time=0.5)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["3 votes sur 20 :", "qu'affiche l'appli ?"],
                            [self.inline("3,2 %", 30), self.inline("15 %", 30), self.inline("0,15 %", 30)], 1,
                            ["3 ÷ 20 = 0,15 = 15 %"], mot_q="3 votes")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        st = story()
        self.add(st)
        self.au_mot("12 votes sur 25")
        l1 = self.t("12 votes sur 25", 34).move_to(P(0, -0.7))
        self.play(FadeIn(l1, shift=UP * 0.15), remplir(st, "esc", 12 / 25, 1.0), run_time=1.0)
        self.au_mot("Quel pourcentage")
        q = self.t("? %", 30, ORANGE_TROU).next_to(st.p_esc, RIGHT, buff=0.12)
        self.play(FadeIn(q, scale=1.4), run_time=0.4)
        self.insister(q, 1.5)
        self.appel_commentaire(y=-1.6)
