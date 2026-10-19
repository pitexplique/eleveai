# proba_probaI_remise_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Avec ou sans remise » (micros probaI_avec_sans_remise / alea_bern_avec_sans_remise).
# CEINTURE JAUNE. Il AMUSE : dans le noir, deux chaussettes prises dans un
# tiroir (2 noires, 2 blanches). Une chance sur deux d'avoir une paire ? Non :
# la première n'est pas remise, il en reste 3 dont UNE seule de sa couleur :
# 1 chance sur 3.
#   · en HAUT le tiroir dans le noir, la lampe de poche qui balaie, la
#     chaussette qui sort (puis qui revient, à la question) ;
#   · en BAS, EN MÊME TEMPS : 2 noires, 2 blanches ; 1/2 ? barré ; 1/3 ;
#   · fin : « Et avec remise ? », « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : seuls les nombres dits s'écrivent (2, 2, 1 sur 2, 3, 1 sur 3).
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran : UN SEUL rendu suffit,
# copié sous les deux noms (STMG, 1re). Les deux sous-classes existent quand
# même, identiques.
#
# Voix : manim/voix/stmg-premiere-proba-remise-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaI_remise_short.py ShortProbaRemiseSTMG -o eleveai-maths-stmg-proba-remise-short --media_dir manim/scripts/stmg/media-probaI_remise
# (ShortProbaRemisePremiere donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/17-remise/ et
# manim/sorties/premiere-commun/maths/probabilites/17-remise/
# (eleveai-maths-premiere-commun-proba-remise-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaI_remise import P, frac, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
NOIRE = "#1F2937"
NOIRE_BORD = "#9CA3AF"
BLANCHE = "#F1F5F9"
BLANCHE_BORD = "#CBD5E1"
BOIS = "#5B3A24"
BOIS_FACE = "#7C4A2D"
LUMIERE = "#FDE68A"
Y_FOND = 0.5   # le fond du tiroir, où la lampe éclaire


def chaussette(noire=True, s=1.0):
    """Une chaussette : la jambe, le pied vers la droite, le revers."""
    c, b = (NOIRE, NOIRE_BORD) if noire else (BLANCHE, BLANCHE_BORD)
    corps = Polygon(P(-0.13, 0.38), P(0.13, 0.38), P(0.13, -0.06), P(0.3, -0.08), P(0.36, -0.19),
                    P(0.3, -0.3), P(-0.13, -0.3), fill_color=c, fill_opacity=1, stroke_color=b, stroke_width=2)
    corps.round_corners(0.05)
    revers = Rectangle(width=0.26, height=0.08, fill_color=b, fill_opacity=1, stroke_width=0).move_to(P(0, 0.33))
    return VGroup(corps, revers).scale(s)


def lampe(s=1.0):
    """La lampe de poche, tête vers la gauche."""
    manche = RoundedRectangle(width=0.5, height=0.16, corner_radius=0.06, fill_color="#94A3B8", fill_opacity=1,
                              stroke_width=0)
    tete = Polygon(P(-0.25, 0.08), P(-0.25, -0.08), P(-0.42, -0.14), P(-0.42, 0.14), fill_color="#CBD5E1",
                   fill_opacity=1, stroke_width=0)
    verre = Line(P(-0.42, 0.13), P(-0.42, -0.13), color=LUMIERE, stroke_width=5)
    return VGroup(manche, tete, verre).scale(s)


class ShortProbaRemiseBase(Short6e):
    nom_voix = "stmg-premiere-proba-remise-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def borner(self, g):
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g

    def eclairer(self, cx, w, socks, run_time=0.6):
        """La lampe balaie jusqu'à cx ; les chaussettes visées passent dans la lumière."""
        self.play(self.cx.animate.set_value(cx), self.w.animate.set_value(w), run_time=run_time)
        for c in self.chaussettes:
            c.set_z_index(4 if c in socks else 1)
            if c is getattr(self, "sortie", None):
                c.set_z_index(6)   # la chaussette sortie reste dans la lumière

    def construct(self):
        self.margo_bas()

        # ── 00 : dans le noir, le tiroir ; une chance sur deux ? ──
        self.dire("00-accroche")
        titre = self.grand("Une paire ?", font_size=48, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        fond = Rectangle(width=3.8, height=1.3, fill_color=BOIS, fill_opacity=1, stroke_color=BOIS_FACE,
                         stroke_width=3).move_to(P(0, 0.75))
        face = Rectangle(width=4.0, height=0.5, fill_color=BOIS_FACE, fill_opacity=1, stroke_width=0).move_to(
            P(0, -0.05))
        poignee = RoundedRectangle(width=0.7, height=0.12, corner_radius=0.05, fill_color="#D6D3D1", fill_opacity=1,
                                   stroke_width=0).move_to(P(0, -0.05))
        tiroir = VGroup(fond, face, poignee)
        xs = [-1.35, -0.45, 0.45, 1.35]
        self.chaussettes = [chaussette(n, 1.25).move_to(P(x, 0.72)).rotate(r)
                            for n, x, r in zip((True, True, False, False), xs, (0.15, -0.1, -0.2, 0.12))]
        for c in self.chaussettes:
            c.set_z_index(1)
        noir = Rectangle(width=4.4, height=2.05, fill_color=BLACK, fill_opacity=0.84, stroke_width=0)
        noir.move_to(P(0, 0.55)).set_z_index(2)
        lp = lampe(1.3).rotate(0.55).move_to(P(1.75, 1.62)).set_z_index(5)
        self.cx = ValueTracker(0.0)
        self.w = ValueTracker(0.35)
        tete = lp[2].get_center()
        cone = always_redraw(lambda: Polygon(tete, P(self.cx.get_value() - self.w.get_value(), Y_FOND - 0.4),
                                             P(self.cx.get_value() + self.w.get_value(), Y_FOND - 0.4),
                                             fill_color=LUMIERE, fill_opacity=0.3, stroke_width=0).set_z_index(3))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(tiroir), *[FadeIn(c) for c in self.chaussettes],
                  run_time=0.7)
        self.au_mot("tu prends deux")
        self.play(FadeIn(noir), FadeIn(lp), run_time=0.5)
        self.add(cone)
        self.au_mot("2 noires")
        n, b = self.chaussettes[:2], self.chaussettes[2:]
        self.eclairer(-0.9, 0.85, n)
        rang_a = suite(self.t("2", 44, JAUNE_TITRE), self.t("noires", 32, NOIRE_BORD), self.t("et", 30),
                       self.t("2", 44, JAUNE_TITRE), self.t("blanches", 32, BLANCHE), buff=0.15)
        self.borner(rang_a).move_to(P(0, -0.95))
        self.play(FadeIn(rang_a[:2], shift=UP * 0.15), *[Wiggle(c) for c in n],
                  run_time=0.5)
        self.au_mot("2 blanches")
        self.eclairer(0.9, 0.85, b)
        self.play(FadeIn(rang_a[2:], shift=UP * 0.15), *[Wiggle(c) for c in b],
                  run_time=0.5)
        self.au_mot("Une chance sur deux")
        demi = frac("1", "2", 46, BLEU_CALCUL)
        rang_b = suite(self.t("Une paire :", 34), demi, self.t("?", 50, ORANGE_RETENUE), buff=0.2)
        self.borner(rang_b).move_to(P(0, -2.0))
        self.play(FadeIn(rang_b[0], shift=UP * 0.1), FadeIn(demi, scale=1.6), run_time=0.5)
        self.play(FadeIn(rang_b[2], scale=2.0), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : la première n'est pas remise : 1 chance sur 3 ──
        self.dire("01-image")
        self.au_mot("La première")
        c0 = self.chaussettes[0]
        place0 = c0.get_center()
        self.sortie = c0
        self.eclairer(-1.35, 0.4, [c0], run_time=0.4)
        self.play(c0.animate.move_to(P(-1.6, 1.5)).rotate(0.5), run_time=0.6)
        self.au_mot("peu importe")
        self.play(Wiggle(c0), run_time=0.6)
        self.au_mot("tu ne la remets pas")
        pas = self.t("pas remise !", 28, ORANGE_RETENUE).move_to(P(-0.3, 1.78)).set_z_index(6)
        self.play(FadeIn(pas, scale=1.8), run_time=0.4)
        self.play(Wiggle(pas), run_time=0.5)
        self.au_mot("Il reste 3 chaussettes")
        reste = self.chaussettes[1:]
        self.eclairer(0.45, 1.45, reste)
        rang_a2 = suite(self.t("Il reste", 32), self.t("3", 46, JAUNE_TITRE), self.t("chaussettes", 32), buff=0.15)
        self.borner(rang_a2).move_to(P(0, -0.95))
        self.play(FadeOut(rang_a, shift=UP * 0.15), FadeIn(rang_a2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("une seule de la même couleur")
        rond = Circle(radius=0.48, color=JAUNE_TITRE, stroke_width=5).move_to(self.chaussettes[1]).set_z_index(6)
        self.play(Create(rond), Wiggle(self.chaussettes[1]), run_time=0.7)
        self.au_mot("1 chance sur 3")
        barre = Line(VGroup(demi, rang_b[2]).get_corner(DL) + P(-0.1, -0.05),
                     VGroup(demi, rang_b[2]).get_corner(UR) + P(0.1, 0.05), color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(barre), run_time=0.3)
        tiers = frac("1", "3", 52, VERT_OK)
        rang_b2 = suite(self.t("Une paire :", 34), tiers, buff=0.25)
        self.borner(rang_b2).move_to(P(0, -2.0))
        self.play(FadeOut(VGroup(demi, rang_b[2], barre), scale=0.5), ReplacementTransform(rang_b[0], rang_b2[0]),
                  run_time=0.4)
        self.play(TransformFromCopy(rond, tiers[0]), GrowFromCenter(tiers[1]),
                  TransformFromCopy(rang_a2[1], tiers[2]), run_time=0.6)
        self.insister(tiers, 1.4, 0.25)
        self.au_mot("Sans remise")
        chang = VGroup(self.t("Sans remise :", 32, ORANGE_RETENUE), self.t("le tiroir a changé", 30, JAUNE_TITRE))
        chang.arrange(DOWN, buff=0.08).move_to(P(0, 3.3))
        self.play(ReplacementTransform(titre, chang), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 02 : et avec remise ? ──
        self.dire("02-question")
        self.au_mot("Et si tu remettais")
        etsi = self.grand("Et avec remise ?", font_size=42, color=JAUNE_TITRE).move_to(P(0, 3.4))
        retour = CurvedArrow(P(-1.95, 1.2), P(-1.45, 0.95), angle=1.8, color=VERT_OK, stroke_width=5,
                             tip_length=0.18).set_z_index(6)
        self.play(ReplacementTransform(chang, etsi), FadeOut(VGroup(pas, rond)), run_time=0.5)
        self.play(c0.animate.move_to(place0).rotate(-0.5), Create(retour), run_time=0.8)
        self.sortie = None
        self.eclairer(0.0, 1.85, self.chaussettes, run_time=0.5)
        self.au_mot("quelle serait la probabilité")
        q = VGroup(self.t("Avec remise :", 36, VERT_OK), self.t("une paire ?", 40, WHITE)).arrange(DOWN, buff=0.1)
        q.move_to(P(0, -0.95))
        self.play(FadeOut(VGroup(rang_a2, rang_b2), shift=DOWN * 0.2), FadeIn(q, shift=UP * 0.2), run_time=0.6)
        self.insister(q[1], 1.2, 0.25)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 36, VERT_OK), self.t("commentaire !", 36, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.2))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaRemiseSTMG(ShortProbaRemiseBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaRemisePremiere(ShortProbaRemiseBase):
    identite = "Maths 1re — EleveAI"
