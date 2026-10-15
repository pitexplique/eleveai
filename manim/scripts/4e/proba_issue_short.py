# proba_issue_short.py
# EleveAI — Maths 4e — short jumeau de la série « Probabilités », épisode 2 :
# les issues. CEINTURE BLANCHE. Il AMUSE : « 6 chaussettes… 6 résultats ? Non ! »
#   · en HAUT le tiroir ouvert : 5 chaussettes noires, 1 rouge ; la lumière
#     s'éteint (« dans le noir »), puis revient et les chaussettes se rangent en
#     deux tas ;
#   · en BAS, EN MÊME TEMPS : 5 noires, 1 rouge, « 6 ? » barré, la couleur,
#     noire / rouge, 2 issues ;
#   · fin : les étiquettes C-O-C-O au-dessus du chapeau, la question,
#     « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/4e-proba-issue-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/proba_issue_short.py ProbaIssue4eShort -o eleveai-maths-4e-proba-issue-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/02-issue/.

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_issue import P  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
IMAGE = P(0, 0.95)
NOIRE = "#111827"
ROUGE_CH = "#DC2626"


def chaussette(couleur, s=1.0):
    """Une chaussette : la jambe, le talon, le pied vers la droite, le revers rayé."""
    corps = Polygon(P(-0.16, 0.42), P(0.16, 0.42), P(0.16, -0.08), P(0.44, -0.2), P(0.44, -0.42),
                    P(-0.02, -0.42), P(-0.16, -0.28),
                    fill_color=couleur, fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
    revers = Rectangle(width=0.32, height=0.1, fill_color=WHITE, fill_opacity=0.85, stroke_width=0).move_to(P(0, 0.33))
    return VGroup(corps, revers).scale(s)


def chapeau(larg=2.0, haut=1.3):
    """Un chapeau de magicien RETOURNÉ (repris de la 3e)."""
    corps = Polygon(P(-larg / 2, 0), P(larg / 2, 0), P(larg * 0.47, -haut), P(-larg * 0.47, -haut),
                    fill_color="#1F2937", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    fond = Ellipse(width=larg * 0.94, height=0.3, fill_color="#1F2937", fill_opacity=1,
                   stroke_color=WHITE, stroke_width=3).move_to(P(0, -haut))
    bande = Rectangle(width=larg * 0.99, height=0.26, fill_color="#DC2626", fill_opacity=1,
                      stroke_width=0).move_to(P(0, -0.3))
    bord = Ellipse(width=larg * 1.45, height=0.4, fill_color="#374151", fill_opacity=1,
                   stroke_color=WHITE, stroke_width=3)
    trou = Ellipse(width=larg * 0.92, height=0.22, fill_color=BLACK, fill_opacity=1,
                   stroke_color=GREY_B, stroke_width=1.5)
    return VGroup(fond, corps, bande, bord, trou)


def etiquette(lettre, s=0.6):
    fond = RoundedRectangle(width=s, height=s * 1.12, corner_radius=s * 0.14,
                            fill_color=JAUNE_TITRE, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    return VGroup(fond, Text(lettre, font_size=int(56 * s), color=BLACK, weight=BOLD).move_to(fond))


class ProbaIssue4eShort(Short6e):
    nom_voix = "4e-proba-issue-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=30, buff=0.15):
        g = VGroup(*[Text(m, font_size=font_size, color=c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def puce(self, texte, fond_c, texte_c=WHITE, font_size=28):
        lbl = Text(texte, font_size=font_size, color=texte_c)
        fond = RoundedRectangle(width=lbl.width + 0.35, height=lbl.height + 0.25, corner_radius=0.1,
                                fill_color=fond_c, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        return VGroup(fond, lbl.move_to(fond))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Le tiroir mystère", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.2))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.5))
        fond_t = Rectangle(width=3.7, height=1.35, fill_color="#78350F", fill_opacity=0.55, stroke_color=WHITE,
                           stroke_width=3).move_to(IMAGE + UP * 0.3)
        facade = Rectangle(width=3.95, height=0.62, fill_color="#92400E", fill_opacity=1, stroke_color=WHITE,
                           stroke_width=3).move_to(IMAGE + DOWN * 0.55).set_z_index(2)
        bouton = Circle(radius=0.09, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0).move_to(facade).set_z_index(3)
        self.au_mot("Dans mon tiroir")
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(fond_t), FadeIn(facade), FadeIn(bouton),
                  run_time=0.8)
        couleurs = [NOIRE] * 5 + [ROUGE_CH]
        ch = VGroup(*[chaussette(c, 0.95) for c in couleurs]).arrange(RIGHT, buff=0.05).move_to(IMAGE + UP * 0.25)
        ch[5].shift(UP * 0.05)
        self.au_mot("5 chaussettes noires")
        l1 = self.ligne([("5", JAUNE_TITRE), ("chaussettes noires", WHITE)], 30).move_to(P(0, -0.35))
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.8) for c in ch[:5]], lag_ratio=0.15), FadeIn(l1),
                  run_time=0.9)
        self.au_mot("et 1 rouge")
        l2 = self.ligne([("et", WHITE), ("1", JAUNE_TITRE), ("rouge", ROUGE_CH)], 30).move_to(P(0, -0.85))
        self.play(FadeIn(ch[5], shift=DOWN * 0.8), FadeIn(l2), run_time=0.4)
        self.insister(ch[5], 1.3, 0.2)
        self.au_mot("dans le noir")
        nuit = Rectangle(width=4.5, height=2.2, fill_color=BLACK, fill_opacity=0.9, stroke_width=0)
        nuit.move_to(IMAGE + UP * 0.1).set_z_index(5)
        qm = Text("?", font_size=90, color=WHITE, weight=BOLD).move_to(IMAGE + UP * 0.1).set_z_index(6)
        self.play(FadeIn(nuit), run_time=0.4)
        self.play(FadeIn(qm, scale=0.5), run_time=0.3)
        self.play(Wiggle(qm), run_time=0.6)
        self.au_mot("Combien de résultats")
        q = VGroup(self.t("Combien de résultats", 32, BLEU_CALCUL),
                   self.t("possibles ?", 32, BLEU_CALCUL)).arrange(DOWN, buff=0.08).move_to(P(0, -1.75))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : 2 issues ──
        self.dire("01-image")
        six = self.grand("6 ?", font_size=72, color=ORANGE_RETENUE)
        non = self.grand("Non !", font_size=50, color=ROUGE_ERREUR)
        VGroup(six, non).arrange(RIGHT, buff=0.45).move_to(P(0, -1.7))
        self.play(FadeOut(q), FadeIn(six, scale=0.5), run_time=0.35)
        self.au_mot("Non")
        barre = Line(six.get_corner(DL) + P(-0.1, -0.05), six.get_corner(UR) + P(0.1, 0.05),
                     color=ROUGE_ERREUR, stroke_width=9)
        self.play(Create(barre), FadeIn(non, scale=0.5), run_time=0.35)
        self.play(Wiggle(non), run_time=0.5)
        self.au_mot("Je regarde la couleur")
        regarde = self.ligne([("je regarde :", WHITE), ("la couleur", JAUNE_TITRE)], 30).move_to(P(0, -0.35))
        self.play(FadeOut(nuit), FadeOut(qm), FadeOut(l1), FadeOut(l2), FadeOut(VGroup(six, barre, non)),
                  FadeIn(regarde), run_time=0.5)
        # les chaussettes se rangent : les noires ensemble, la rouge à part
        cibles = [IMAGE + P(-1.35 + 0.22 * k, 0.25 - 0.03 * k) for k in range(5)] + [IMAGE + P(1.15, 0.3)]
        self.play(*[c.animate.move_to(p) for c, p in zip(ch, cibles)], run_time=0.7)
        self.au_mot("Noire, ou rouge")
        pn = self.puce("noire", "#374151")
        ou = Text("ou", font_size=28)
        pr = self.puce("rouge", ROUGE_CH)
        rang = VGroup(pn, ou, pr).arrange(RIGHT, buff=0.3).move_to(P(0, -1.0))
        self.play(GrowFromCenter(pn), Indicate(VGroup(*ch[:5]), color=GREY_B, scale_factor=1.08), run_time=0.4)
        self.au_mot("ou rouge")
        self.play(FadeIn(ou), GrowFromCenter(pr), Indicate(ch[5], color=ROUGE_CH, scale_factor=1.25), run_time=0.4)
        self.au_mot("Seulement 2")
        l3 = self.ligne([("seulement", WHITE), ("2", JAUNE_TITRE), ("résultats possibles", WHITE)], 28).move_to(P(0, -1.65))
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.4)
        self.au_mot(": 2 issues")
        deux = self.ligne([("2", JAUNE_TITRE), ("issues", VERT_OK)], 52, 0.2).move_to(P(0, -2.35))
        self.play(FadeIn(deux, scale=0.6), run_time=0.35)
        self.insister(deux, 1.3, 0.25)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))
        self.play(Write(toi), run_time=0.4)
        cha = chapeau(1.9, 1.1).move_to(P(0, 0.55))
        self.au_mot("une lettre")
        lettres = VGroup(*[etiquette(c, 0.6) for c in "COCO"]).arrange(RIGHT, buff=0.15).move_to(P(0, 1.7))
        self.play(FadeIn(cha), run_time=0.3)
        self.au_mot("COCO")
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.3) for m in lettres], lag_ratio=0.15), run_time=0.6)
        bases = [m.get_center().copy() for m in lettres]
        h = {"t": 0.0}

        def saute(g, dt):
            h["t"] += dt
            for i, (m, b) in enumerate(zip(g, bases)):
                m.move_to(b + UP * 0.08 * abs(math.sin(h["t"] * 6 + i * 1.1)))

        lettres.add_updater(saute)
        self.au_mot("Combien d'issues")
        q = self.grand("Combien d'issues ?", font_size=38, color=BLEU_CALCUL).move_to(P(0, -0.7))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.65))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=28, color=BLEU_CALCUL).move_to(P(0, -2.5))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
        lettres.clear_updaters()
