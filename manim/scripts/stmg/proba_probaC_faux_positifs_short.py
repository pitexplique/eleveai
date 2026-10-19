# proba_probaC_faux_positifs_short.py
# EleveAI — Maths STMG ET 1re tronc commun — short jumeau de la paysage des
# FAUX POSITIFS. CEINTURE JAUNE. Il AMUSE : « un test fiable à 99 % dit positif…
# malade à 99 % ? Même pas à 10 % ! »
#   · en HAUT le test (une cassette qui affiche « + ») puis le TABLEAU CROISÉ
#     du coach (tableau_donnees) en effectifs : lignes Malades / Sains, colonnes
#     Positif / Négatif, 100 000 dans le coin ; il se remplit quand la voix dit
#     100, 99, 99 900, 999, puis la COLONNE « Positif » s'allume ;
#   · en BAS, EN MÊME TEMPS : 1 personne sur 1 000, 999 faux positifs,
#     99 + 999 = 1 098, 99 sur 1 098 ≈ 0,09 ;
#   · fin : « 1 personne sur 10 ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
# ⭐ Rien ne change à l'écran d'une classe à l'autre : UN rendu suffit, copié
# dans les deux dossiers sous les deux noms (les deux sous-classes existent
# pour la symétrie avec la paysage).
#
# Voix : manim/voix/stmg-premiere-proba-faux-positifs-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaC_faux_positifs_short.py ShortFauxPositifsSTMG -o eleveai-maths-stmg-proba-faux-positifs-short --media_dir manim/scripts/stmg/media-probaC_faux_positifs
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/06-faux-positifs/ et, sous le nom
# eleveai-maths-premiere-commun-proba-faux-positifs-short.mp4, dans
# manim/sorties/premiere-commun/maths/probabilites/06-faux-positifs/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaC_faux_positifs import P, frac, suite  # noqa: E402  (pose les chemins)
from proba_pc_conditionnelle_short import Grille  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
ENCRE = "#0F172A"


def cassette(s=1.0):
    """Un test : la cassette blanche, sa fenêtre (index 1) et le puits (index 2)."""
    corps = RoundedRectangle(width=2.6, height=0.85, corner_radius=0.3, fill_color="#F8FAFC", fill_opacity=1,
                             stroke_color=BLEU_CALCUL, stroke_width=3)
    fenetre = RoundedRectangle(width=1.0, height=0.42, corner_radius=0.08, fill_color="#E2E8F0", fill_opacity=1,
                               stroke_color="#94A3B8", stroke_width=2).move_to(P(0.35, 0))
    puits = Circle(radius=0.17, fill_color="#E2E8F0", fill_opacity=1, stroke_color="#94A3B8",
                   stroke_width=2).move_to(P(-0.8, 0))
    return VGroup(corps, fenetre, puits).scale(s)


class ShortFauxPositifsBase(Short6e):
    nom_voix = "stmg-premiere-proba-faux-positifs-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def fit(self, mob, w=LARGEUR_MAX):
        if mob.width > w:
            mob.scale_to_fit_width(w)
        return mob

    def dans(self, rect, texte, color=ENCRE, fs=24):
        return Text(texte, font_size=fs, color=color, weight=BOLD).move_to(rect).set_z_index(5)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : positif… malade à 99 % ? Même pas à 10 % ! ──
        self.dire("00-accroche")
        titre = self.grand("Le test médical", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        cas = cassette(1.15).move_to(P(0, 1.2))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(cas, shift=UP * 0.3), run_time=0.8)
        self.au_mot("fiable à 99 %")
        l1 = suite(self.t("fiable à", 32), self.t("99 %", 40, VERT_OK), buff=0.15).move_to(P(0, -0.35))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.insister(l1[1], 1.3, 0.2)
        self.au_mot("te dit : positif")
        plus = Text("+", font_size=60, color=ROUGE_ERREUR, weight=BOLD).move_to(cas[1])
        pos = self.t("POSITIF", 34, ROUGE_ERREUR).next_to(cas, DOWN, buff=0.2)
        self.play(FadeIn(plus, scale=2.0), FadeIn(pos, scale=1.4), Wiggle(cas, scale_value=1.08), run_time=0.6)
        self.au_mot("Tu es malade")
        l2 = self.t("Malade à 99 % ?", 38, ORANGE_RETENUE).move_to(P(0, -0.95))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Même pas")
        barre = Line(l2.get_left(), l2.get_right(), color=ROUGE_ERREUR, stroke_width=7)
        choc = VGroup(self.grand("Même pas", font_size=50, color=ROUGE_ERREUR),
                      self.grand("10 % !", font_size=80, color=ROUGE_ERREUR)).arrange(DOWN, buff=0.12)
        choc.move_to(P(0, -2.08))
        self.play(Create(barre), FadeIn(choc, scale=2.2), run_time=0.45)
        self.play(Wiggle(choc, scale_value=1.15, rotation_angle=0.06 * TAU), run_time=0.7)
        self.attendre_voix(marge=0.1)

        # ── 01 : 100 000 personnes : le tableau se remplit ──
        self.dire("01-image")
        g = Grille(["Malades", "Sains"], ["Positif", "Négatif"], larg_lab=1.1, larg=1.0,
                   hs=(0.55, 0.75, 0.75), fs=22, haut=1.75)
        g.shift(LEFT * 0.5)
        self.play(FadeOut(VGroup(cas, plus, pos), shift=UP * 0.3),
                  FadeOut(VGroup(l1, l2, barre, choc), shift=DOWN * 0.3), FadeIn(g), run_time=0.6)
        self.au_mot("1 personne sur 1 000")
        a = suite(self.t("1", 36, JAUNE_TITRE), self.t("personne sur", 28), self.t("1 000", 36, JAUNE_TITRE),
                  buff=0.14)
        self.fit(a).move_to(P(0, -0.8))
        self.play(FadeIn(a, shift=UP * 0.15), Indicate(g.lab[0], color=ROUGE_ERREUR), run_time=0.5)
        self.au_mot("Sur 100 000")
        tot = Text("100 000", font_size=24, color=JAUNE_TITRE, weight=BOLD).move_to(g.r[0][0]).set_z_index(5)
        if tot.width > g.r[0][0].width - 0.1:
            tot.scale_to_fit_width(g.r[0][0].width - 0.1)
        self.play(FadeIn(tot, scale=1.8), run_time=0.4)
        self.insister(tot, 1.4, 0.2)
        self.au_mot("100 malades")
        m100 = self.t("100", 26, JAUNE_TITRE).next_to(g.r[1][2], RIGHT, buff=0.1)
        self.play(FadeIn(m100, scale=1.6), *g.etat(ligne=0), run_time=0.45)
        self.au_mot("99 positifs")
        v99 = self.dans(g.case(0, 0), "99")
        self.play(FadeIn(v99, scale=1.8), run_time=0.4)
        self.insister(v99, 1.4, 0.2)
        self.au_mot("Mais le test se trompe")
        self.play(*g.etat(ligne=1, extra=[(0, 0, v99)]), run_time=0.45)
        self.au_mot("1 %")
        b = suite(self.t("1 %", 32, ORANGE_RETENUE), self.t("des", 28), buff=0.14)
        self.au_mot("99 900 autres")
        s99 = self.t("99 900", 22, JAUNE_TITRE).next_to(g.r[2][2], RIGHT, buff=0.08)
        b.add(self.t("99 900", 32, JAUNE_TITRE)).arrange(RIGHT, buff=0.14)
        self.fit(b).move_to(P(0, -1.4))
        self.play(FadeIn(s99, scale=1.6), FadeIn(b, shift=UP * 0.15), run_time=0.45)
        self.au_mot("999 faux positifs")
        v999 = self.dans(g.case(1, 0), "999", ROUGE_ERREUR)
        c = suite(self.t("999", 40, ROUGE_ERREUR), self.t("faux positifs", 30, ROUGE_ERREUR), buff=0.15)
        self.fit(c).move_to(P(0, -2.05))
        self.play(FadeIn(v999, scale=2.0), FadeIn(c, scale=1.3), run_time=0.45)
        self.insister(c, 1.2, 0.2)
        self.au_mot("Positifs : 99 plus 999")
        extra = [(0, 0, v99), (1, 0, v999)]
        cad = SurroundingRectangle(VGroup(g.r[0][1], g.r[2][1]), color=JAUNE_TITRE, buff=0.03, stroke_width=5)
        d = suite(self.t("99", 36, VERT_OK), self.t("+", 36), self.t("999", 36, ROUGE_ERREUR), buff=0.14)
        self.play(FadeOut(VGroup(a, b, c), shift=UP * 0.2), *g.etat(colonne=0, extra=extra), run_time=0.5)
        d.move_to(P(0, -0.85))
        self.play(Create(cad), FadeIn(d, shift=UP * 0.15), run_time=0.45)
        self.au_mot("égale 1 098")
        e = self.t("= 1 098", 36, JAUNE_TITRE).next_to(d, RIGHT, buff=0.14)
        self.fit(VGroup(d, e)).move_to(P(0, -0.85))
        self.play(FadeIn(e, shift=LEFT * 0.15), run_time=0.4)
        self.au_mot("99 sur 1 098")
        f = frac("99", "1 098", 40, color_n=VERT_OK)
        approx = self.t("≈", 44)
        res = self.t("0,09", 52, JAUNE_TITRE)
        # Relecture du 19/10 : agrandi, « 0,09 » sortait à droite. Le groupe
        # tient dans 80 % de la largeur, pour laisser la place au ×1,25.
        ligne = suite(f, approx, res, buff=0.22)
        if ligne.width > config.frame_width * 0.8:
            ligne.scale_to_fit_width(config.frame_width * 0.8)
        ligne.move_to(P(0, -2.0))
        self.play(FadeIn(f, shift=UP * 0.2), Indicate(v99, color=VERT_OK, scale_factor=1.6), run_time=0.5)
        self.au_mot("environ 0,09")
        self.play(FadeIn(approx), FadeIn(res, scale=2.0), run_time=0.4)
        self.insister(res, 1.25, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 02 : et si c'était 1 sur 10 ? ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(titre, toi),
                  FadeOut(VGroup(g, tot, m100, s99, v99, v999, cad, d, e, f, approx, res)), run_time=0.5)
        cas2 = cassette(1.0).move_to(P(0, 1.05))
        plus2 = Text("+", font_size=52, color=ROUGE_ERREUR, weight=BOLD).move_to(cas2[1])
        self.play(FadeIn(cas2), FadeIn(plus2, scale=2.0), run_time=0.4)
        self.au_mot("1 personne sur 10")
        q1 = suite(self.t("1", 44, JAUNE_TITRE), self.t("personne sur", 32), self.t("10", 44, JAUNE_TITRE),
                   self.t("?", 44, ORANGE_RETENUE), buff=0.14)
        self.fit(q1).move_to(P(0, -0.1))
        self.play(FadeIn(q1, scale=1.5), run_time=0.4)
        self.insister(q1, 1.15, 0.2)
        self.au_mot("Calcule la probabilité")
        q2 = VGroup(self.t("Malade, quand le test", 30), self.t("est positif ?", 30)).arrange(DOWN, buff=0.1)
        q2.move_to(P(0, -1.0))
        self.play(FadeIn(q2, shift=UP * 0.15), Wiggle(cas2, scale_value=1.06), run_time=0.5)
        self.au_mot("réponds en commentaire")
        appel = self.grand("Réponds en commentaire !", font_size=46, color=VERT_OK, marge=0.25).move_to(P(0, -2.1))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortFauxPositifsSTMG(ShortFauxPositifsBase):
    pass


class ShortFauxPositifsPremiere(ShortFauxPositifsBase):
    pass
