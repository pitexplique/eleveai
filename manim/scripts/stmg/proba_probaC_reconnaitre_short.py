# proba_probaC_reconnaitre_short.py
# EleveAI — Maths STMG — short jumeau de la série « Probabilités
# conditionnelles », épisode 1 : reconnaître une probabilité conditionnelle.
# CEINTURE JAUNE. Il AMUSE : « 80 % des déchets bien triés sont du plastique,
# donc 80 % du plastique est bien trié ? »
#   · en HAUT les déchets tombent dans les poubelles (bouteilles et trognons) ;
#   · en BAS, EN MÊME TEMPS, le tableau croisé du coach (Plastique / Autre ×
#     Bien trié / Mal trié), SANS aucun nombre non dit : la COLONNE « bien
#     trié » s'allume, puis la LIGNE « plastique » ;
#   · fin : l'usine qui recycle, la question, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/stmg-proba-reconnaitre-short.json (Julie, débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaC_reconnaitre_short.py ShortProbaReconnaitreSTMG -o eleveai-maths-stmg-proba-reconnaitre-short --media_dir manim/scripts/stmg/media
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/01-reconnaitre/.

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaC_reconnaitre import P, TableauCroise, ANNEAU, mot_cle  # noqa: E402,F401  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

BLEU_PLASTIQUE = "#38BDF8"
BRUN = "#92400E"
JAUNE_BAC = "#FACC15"
GRIS_BAC = "#6B7280"
ENCRE_CASE = "#0F172A"
X_BACS = (-1.05, 1.05)
Y_BAC = 0.72         # le centre des poubelles
Y_HAUT, Y_BAS = 1.62, 1.1   # les déchets tombent de Y_HAUT jusque dans la poubelle


def bouteille(s=1.0):
    corps = RoundedRectangle(width=0.2, height=0.34, corner_radius=0.06, fill_color=BLEU_PLASTIQUE,
                             fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    col = Rectangle(width=0.09, height=0.08, fill_color=BLEU_PLASTIQUE, fill_opacity=1, stroke_width=0)
    col.next_to(corps, UP, buff=0)
    bouchon = Rectangle(width=0.1, height=0.05, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    bouchon.next_to(col, UP, buff=0)
    return VGroup(corps, col, bouchon).scale(s)


def trognon(s=1.0):
    t = Circle(radius=0.13, fill_color=BRUN, fill_opacity=1, stroke_color="#FDE68A", stroke_width=2)
    q = Line(P(0, 0.12), P(0.04, 0.22), color="#65A30D", stroke_width=4)
    return VGroup(t, q).scale(s)


def poubelle(couleur, x):
    cuve = Polygon(P(-0.42, 0.38), P(0.42, 0.38), P(0.34, -0.42), P(-0.34, -0.42),
                   fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    couvercle = RoundedRectangle(width=1.0, height=0.1, corner_radius=0.04, fill_color=couleur, fill_opacity=1,
                                 stroke_color=WHITE, stroke_width=2).move_to(P(0, 0.45))
    raies = VGroup(*[Line(P(dx, 0.25), P(dx * 0.85, -0.3), color=WHITE, stroke_width=2, stroke_opacity=0.5)
                     for dx in (-0.15, 0.0, 0.15)])
    return VGroup(cuve, raies, couvercle).move_to(P(x, Y_BAC))


def usine(s=1.0):
    corps = Polygon(P(-1.0, -0.5), P(1.0, -0.5), P(1.0, 0.1), P(0.5, 0.4), P(0.5, 0.1), P(0.0, 0.4),
                    P(0.0, 0.1), P(-0.5, 0.4), P(-0.5, 0.1), P(-1.0, 0.1),
                    fill_color="#475569", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    chem = Rectangle(width=0.2, height=0.6, fill_color="#334155", fill_opacity=1, stroke_color=WHITE,
                     stroke_width=2).move_to(P(-0.75, 0.4))
    fen = VGroup(*[Square(0.18, fill_color=JAUNE_BAC, fill_opacity=0.9, stroke_width=0).move_to(P(x, -0.2))
                   for x in (-0.6, -0.2, 0.2, 0.6)])
    return VGroup(chem, corps, fen).scale(s)


def fleches_recyclage(r=0.42, couleur=VERT_OK):
    """Trois flèches en rond : le symbole du recyclage."""
    g = VGroup()
    for k in range(3):
        a0 = k * TAU / 3 + 0.25
        arc = Arc(radius=r, start_angle=a0, angle=TAU / 3 - 0.5, color=couleur, stroke_width=7)
        arc.add_tip(tip_length=0.16, tip_width=0.18)
        g.add(arc)
    return g


# les déchets qui tombent : (dessin, poubelle visée, décalage, phase)
CHUTES = [("b", 0, -0.12, 0.0), ("t", 1, 0.1, 0.17), ("b", 0, 0.14, 0.34), ("b", 1, -0.1, 0.5),
          ("t", 1, -0.14, 0.67), ("b", 0, 0.0, 0.84)]


class ShortProbaReconnaitreSTMG(Short6e):
    nom_voix = "stmg-proba-reconnaitre-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def dechets(self):
        """Les déchets tombent en boucle dans les deux poubelles."""
        g = VGroup()
        for sorte, _, _, _ in CHUTES:
            g.add(bouteille(1.0) if sorte == "b" else trognon(1.0))
        horloge = {"t": 0.0}

        def tombe(m, dt):
            horloge["t"] += dt
            for d, (_, bac, dx, ph) in zip(m, CHUTES):
                f = (horloge["t"] * 0.55 + ph) % 1.0
                d.move_to(P(X_BACS[bac] + dx, Y_HAUT - (Y_HAUT - Y_BAS) * f * f))
                d.set_opacity(min(1.0, f / 0.12) * (1.0 - max(0.0, (f - 0.82) / 0.18)))

        g.add_updater(tombe)
        tombe(g, 0)
        return g

    def tableau(self):
        tb = TableauCroise(["Plastique", "Autre"], ["Bien trié", "Mal trié"], [[None, None], [None, None]],
                           larg_lab=1.55, larg=1.35, h=0.75, h_ent=0.62, fs=24)
        for t in tb.ent:
            if t.width > 1.35 - 0.16:
                t.scale_to_fit_width(1.35 - 0.16)
        tb.move_to(P(0, -1.12))
        return tb

    def cadre_colonne(self, tb, j):
        return SurroundingRectangle(VGroup(tb.rect[0][j + 1], tb.rect[2][j + 1]), color=ANNEAU, buff=0.04,
                                    stroke_width=5)

    def cadre_ligne(self, tb, i):
        return SurroundingRectangle(VGroup(tb.rect[i + 1][0], tb.rect[i + 1][2]), color=ANNEAU, buff=0.04,
                                    stroke_width=5)

    def dessous(self, mob):
        """La phrase sous le tableau, au-dessus de Ti-Margo."""
        return mob.move_to(P(0, -2.6))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Piège au tri !", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        bacs = VGroup(poubelle(JAUNE_BAC, X_BACS[0]), poubelle(GRIS_BAC, X_BACS[1]))
        chutes = self.dechets()
        tb = self.tableau()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(bacs), FadeIn(tb, shift=UP * 0.2),
                  run_time=0.9)
        self.add(chutes)
        self.au_mot("80 % des déchets")
        cc = self.cadre_colonne(tb, 0)
        p80 = Text("80 %", font_size=30, color=ENCRE_CASE, weight=BOLD).move_to(tb.case(0, 0)).set_z_index(4)
        self.play(*tb.etat(colonnes=(0,)), Create(cc), run_time=0.5)
        self.play(FadeIn(p80, scale=1.8), run_time=0.35)
        self.au_mot("du plastique.")
        self.play(Indicate(tb.lab[0], color=BLEU_PLASTIQUE, scale_factor=1.3), run_time=0.5)
        self.au_mot("Donc 80 %")
        cl = self.cadre_ligne(tb, 0)
        q = self.dessous(self.t("80 % du plastique ?", 32, ORANGE_RETENUE))
        self.play(*tb.etat(lignes=(0,)), ReplacementTransform(cc, cl), FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.insister(q, 1.2, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : parmi QUI ? ──
        self.dire("01-image")
        non = self.dessous(self.grand("Non !", font_size=56, color=ROUGE_ERREUR))
        self.play(ReplacementTransform(q, non), run_time=0.35)
        self.play(Wiggle(non), run_time=0.5)
        self.au_mot("parmi les déchets bien triés")
        cc = self.cadre_colonne(tb, 0)
        l1 = self.dessous(self.t("parmi les bien triés : 80 %", 28, VERT_OK))
        self.play(*tb.etat(colonnes=(0,)), ReplacementTransform(cl, cc), FadeOut(non, shift=UP * 0.2),
                  FadeIn(l1, shift=UP * 0.2), run_time=0.5)
        self.insister(p80, 1.4, 0.25)
        self.au_mot("Parmi le plastique")
        cl = self.cadre_ligne(tb, 0)
        self.play(*tb.etat(lignes=(0,)), ReplacementTransform(cc, cl), FadeOut(l1, shift=UP * 0.2), run_time=0.5)
        self.au_mot("peut-être 40 %")
        p40 = Text("40 % ?", font_size=25, color=ENCRE_CASE, weight=BOLD).move_to(tb.case(0, 0)).set_z_index(4)
        l2 = self.dessous(self.t("parmi le plastique : 40 % ?", 28, ORANGE_RETENUE))
        self.play(ReplacementTransform(p80, p40), FadeIn(l2, shift=UP * 0.2), run_time=0.45)
        self.insister(p40, 1.4, 0.25)
        self.au_mot("parmi QUI")
        qui = self.dessous(self.grand("parmi QUI ?", font_size=44, color=JAUNE_TITRE))
        self.play(ReplacementTransform(l2, qui), run_time=0.4)
        self.insister(qui, 1.2, 0.25)
        self.attendre_voix(marge=0.2)
        chutes.clear_updaters()

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        fab = usine(0.85).move_to(P(-0.55, 1.3))
        rec = fleches_recyclage(0.38).move_to(P(1.45, 1.35))
        rec.add_updater(lambda m, dt: m.rotate(-1.4 * dt))
        self.play(Write(toi), FadeIn(fab, shift=UP * 0.2), FadeIn(rec), run_time=0.6)
        self.au_mot("70 %")
        phr = VGroup(self.t("« 70 % des entreprises", 30), self.t("qui recyclent", 30, VERT_OK),
                     self.t("font des bénéfices »", 30)).arrange(DOWN, buff=0.12).move_to(P(0, -0.12))
        phr[0][1:4].set_color(JAUNE_TITRE)
        self.play(FadeIn(phr, shift=UP * 0.15), run_time=0.5)
        self.insister(phr[0][1:4], 1.3, 0.2)
        self.au_mot("Probabilité conditionnelle ou pas")
        cond = self.t("Conditionnelle ou pas ?", 32, ORANGE_RETENUE).move_to(P(0, -1.05))
        self.play(FadeIn(cond, scale=0.7), run_time=0.4)
        self.insister(cond, 1.15, 0.25)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.9))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=24, color=BLEU_CALCUL).move_to(P(0, -2.72))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
        rec.clear_updaters()
