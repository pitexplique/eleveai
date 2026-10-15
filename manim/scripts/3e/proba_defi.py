# proba_defi.py
# EleveAI — Maths 3e — Probabilités, épisode 8 : les défis (micro proba_defi), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE. Short jumeau : proba_defi_short.py (ceinture jaune).
#
# ⭐ Pas de défi « Mets pause » unique : la voix enchaîne TROIS défis, chacun suivi
# de sa correction. « Mets pause, et cherche ! » (orange) tombe à la fin de chaque
# écran de défi, avec un temps d'attente, même si la voix ne le dit pas.
#   · défi 1 : deux boîtes de bonbons (A : 7 blancs, 6 roses ; B : 3 blancs, 1 rose),
#     puis deux BANDES de même longueur remplies à 7/13 et 3/4 → la B gagne ;
#   · défi 2 : un sac de 5 jetons jaunes et 9 noirs ; +1 jaune → 6/15, rangés en
#     3 paquets de 5 (2 jaunes chacun) → 2/5 ;
#   · défi 3 : un dé truqué, 7 parts (1 par face de 1 à 5, 2 pour le 6) → 2/7.
#
# Voix : manim/voix/3e-proba-defi.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/proba_defi.py ProbaDefi3e -o eleveai-maths-3e-proba-defi --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/probabilites/08-defis/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import de, de_qui_roule, sac_vide  # noqa: E402

BONBON_BLANC = "#F9FAFB"
BONBON_ROSE = "#F472B6"
CARTON = "#92400E"
CARTON_BORD = "#F59E0B"
JETON_JAUNE = "#FACC15"
JETON_NOIR = "#1F2937"


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins communs (paysage et short) ──────────────────────────────────

def bonbon(couleur, s=1.0):
    """Un bonbon emballé : un ovale et ses deux papillotes."""
    bord = GREY_B if couleur == BONBON_BLANC else "#9D174D"
    corps = Ellipse(width=0.46, height=0.3, fill_color=couleur, fill_opacity=1,
                    stroke_color=bord, stroke_width=2)
    g = Polygon(P(-0.2, 0), P(-0.38, 0.13), P(-0.38, -0.13), fill_color=couleur, fill_opacity=1,
                stroke_color=bord, stroke_width=2)
    d = Polygon(P(0.2, 0), P(0.38, 0.13), P(0.38, -0.13), fill_color=couleur, fill_opacity=1,
                stroke_color=bord, stroke_width=2)
    return VGroup(g, d, corps).scale(s)


def boite(blancs, roses, cols, s=1.0):
    """Une boîte de bonbons ouverte vue de face : [corps, bonbons, couvercle].
    Les blancs d'abord (rangée par rangée), puis les roses : on les compte."""
    n = blancs + roses
    rows = math.ceil(n / cols)
    dx, dy = 0.85, 0.48
    larg, haut = cols * dx + 0.3, rows * dy + 0.35
    corps = Rectangle(width=larg, height=haut, fill_color=CARTON, fill_opacity=0.35,
                      stroke_color=CARTON_BORD, stroke_width=3)
    bonbons = VGroup()
    for k in range(n):
        r, c = divmod(k, cols)
        x = -larg / 2 + 0.15 + dx * (c + 0.5)
        y = haut / 2 - 0.175 - dy * (r + 0.5)
        bonbons.add(bonbon(BONBON_BLANC if k < blancs else BONBON_ROSE).move_to(P(x, y)))
    couvercle = Rectangle(width=larg + 0.16, height=0.24, fill_color="#B45309", fill_opacity=1,
                          stroke_color=CARTON_BORD, stroke_width=3).next_to(corps, UP, buff=0)
    return VGroup(corps, bonbons, couvercle).scale(s)


def bande(parts, largeur=6.0, hauteur=0.7):
    """Une bande vide coupée en `parts` cases (on la remplit ensuite)."""
    cw = largeur / parts
    g = VGroup()
    for i in range(parts):
        g.add(Rectangle(width=cw, height=hauteur, stroke_width=2, stroke_color=WHITE,
                        fill_color=BONBON_BLANC, fill_opacity=0).move_to(P(-largeur / 2 + cw * (i + 0.5), 0)))
    return g


def remplir(b, blancs):
    """Les animations qui remplissent la bande : blancs en blanc, le reste en rose pâle."""
    return [c.animate.set_fill(BONBON_BLANC if i < blancs else BONBON_ROSE, 0.9 if i < blancs else 0.35)
            for i, c in enumerate(b)]


def jeton(couleur, r=0.22):
    j = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    anneau = Circle(radius=r * 0.62, stroke_color=WHITE if couleur == JETON_NOIR else "#A16207",
                    stroke_width=1.5, stroke_opacity=0.7).move_to(j)
    return VGroup(j, anneau)


class ProbaDefi3e(Notion3e):
    nom_voix = "3e-proba-defi"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        g = VGroup()
        for m, c in morceaux:
            g.add(m if isinstance(m, Mobject) else self.t(m, font_size, c))
        return g.arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def pause_cherche(self):
        """La fin de chaque défi : la voix s'est tue, on laisse chercher."""
        self.attendre_voix(marge=0.3)
        ch = self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)
        self.play(Write(ch), run_time=0.8)
        self.insister(ch, 0.35)
        self.wait(2.5)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les défis des probabilités", 52, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.5))
        b = boite(3, 1, 2, 0.75).move_to(P(-4.0, 0.0))
        sac = sac_vide(1.6, 1.5).move_to(P(-0.6, -0.1))
        jet = VGroup(*[jeton(c, 0.17) for c in [JETON_JAUNE, JETON_NOIR, JETON_NOIR, JETON_JAUNE, JETON_NOIR]])
        for j, p in zip(jet, [P(-1.0, -0.5), P(-0.55, -0.55), P(-0.1, -0.5), P(-0.8, -0.05), P(-0.35, -0.05)]):
            j.move_to(p)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        roule = de_qui_roule(P(2.9, 0.0), 1.3)
        self.add(roule)
        self.play(FadeIn(b, shift=DOWN * 0.3), FadeIn(sac), FadeIn(jet, shift=DOWN * 0.3), run_time=0.7)
        self.au_mot("Prêt à raisonner")
        q = self.t("Prêt à raisonner ?", 44, BLEU_CALCUL).move_to(P(-0.6, 1.35))
        self.play(FadeIn(q, scale=0.8), run_time=0.5)
        self.insister(q)
        self.attendre_voix(marge=1.0)
        roule.clear_updaters()

    # ── 01 : défi 1, les boîtes de bonbons ───────────────────────────────────

    def ecran_defi1(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-defi1")
        self.titre_ecran("Défi 1 : la boîte de bonbons")
        a = boite(7, 6, 5).move_to(P(-3.4, 0.55))
        b = boite(3, 1, 2).move_to(P(2.4, 0.55))
        la = self.t("Boîte A", 36, JAUNE_TITRE).next_to(a, UP, buff=0.25)
        lb = self.t("Boîte B", 36, JAUNE_TITRE).next_to(b, UP, buff=0.25).set_y(la.get_y())
        for bx in (a, b):
            bx[1].set_opacity(0)

        self.au_mot("Boîte A")
        self.play(FadeIn(VGroup(a[0], a[2])), FadeIn(la), run_time=0.5)
        self.play(a[2].animate.shift(UP * 0.4 + RIGHT * 0.3).rotate(-0.25).set_opacity(0), run_time=0.5)
        ca = self.ligne([("7", JAUNE_TITRE), ("blancs", WHITE)], 34, 0.16)
        ra = self.ligne([("6", JAUNE_TITRE), ("roses", BONBON_ROSE)], 34, 0.16)
        VGroup(ca, ra).arrange(RIGHT, buff=0.6).next_to(a, DOWN, buff=0.35)
        self.au_mot("7 bonbons blancs")
        self.play(LaggedStart(*[bb.animate.set_opacity(1) for bb in a[1][:7]], lag_ratio=0.12),
                  FadeIn(ca), run_time=0.9)
        self.au_mot("6 roses")
        self.play(LaggedStart(*[bb.animate.set_opacity(1) for bb in a[1][7:]], lag_ratio=0.12),
                  FadeIn(ra), run_time=0.8)

        self.au_mot("Boîte B")
        self.play(FadeIn(VGroup(b[0], b[2])), FadeIn(lb), run_time=0.4)
        self.play(b[2].animate.shift(UP * 0.4 + RIGHT * 0.3).rotate(-0.25).set_opacity(0), run_time=0.4)
        cb = self.ligne([("3", JAUNE_TITRE), ("blancs", WHITE)], 34, 0.16)
        rb = self.ligne([("1", JAUNE_TITRE), ("rose", BONBON_ROSE)], 34, 0.16)
        VGroup(cb, rb).arrange(RIGHT, buff=0.5).next_to(b, DOWN, buff=0.35)
        cb.align_to(ca, DOWN)
        rb.align_to(ca, DOWN)
        self.au_mot("3 blancs")
        self.play(LaggedStart(*[bb.animate.set_opacity(1) for bb in b[1][:3]], lag_ratio=0.15),
                  FadeIn(cb), run_time=0.6)
        self.au_mot("1 rose")
        self.play(b[1][3].animate.set_opacity(1), FadeIn(rb), run_time=0.4)

        self.au_mot("Tu veux un blanc")
        veux = self.ligne([("Tu veux un", BLEU_CALCUL), (bonbon(BONBON_BLANC, 1.3), None),
                           ("blanc.", BLEU_CALCUL)], 38, 0.2).move_to(P(-0.6, -1.75))
        self.play(FadeIn(veux, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Quelle boîte")
        q = self.t("A ou B ?", 44, JAUNE_TITRE).next_to(veux, RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.7), Wiggle(a), Wiggle(b), run_time=0.9)
        self.pause_cherche()

    def ecran_correction1(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-correction1")
        self.titre_ecran("Correction du défi 1")
        a = boite(7, 6, 5, 0.5).move_to(P(-5.3, 1.15))
        b = boite(3, 1, 2, 0.5).move_to(P(-5.3, -1.0))
        for bx in (a, b):
            bx[2].set_opacity(0)
        la = self.t("A", 34, JAUNE_TITRE).next_to(a, UP, buff=0.12)
        lb = self.t("B", 34, JAUNE_TITRE).next_to(b, UP, buff=0.12)
        self.add(a, b, la, lb)
        ba = bande(13).move_to(P(0.2, 1.15))
        bb = bande(4).move_to(P(0.2, -1.0))

        self.au_mot("7 sur 13")
        fa = self.fraction(7, 13, 40, JAUNE_TITRE).next_to(ba, RIGHT, buff=0.5)
        self.play(Create(ba), run_time=0.6)
        self.play(LaggedStart(*remplir(ba, 7), lag_ratio=0.08), FadeIn(fa, shift=LEFT * 0.2), run_time=1.2)
        self.au_mot("un peu plus d'une chance sur 2")
        mil = DashedLine(P(0.2, 1.75), P(0.2, -1.6), color=BLEU_CALCUL, stroke_width=3)
        demi = self.fraction(1, 2, 28, BLEU_CALCUL).next_to(mil, UP, buff=0.08)
        self.play(Create(mil), FadeIn(demi), run_time=0.6)
        self.play(Indicate(ba[6], color=WHITE, scale_factor=1.3), run_time=0.5)

        self.au_mot("3 sur 4")
        fb = self.fraction(3, 4, 40, JAUNE_TITRE).next_to(bb, RIGHT, buff=0.5)
        fb.align_to(fa, LEFT)
        self.play(Create(bb), run_time=0.4)
        self.play(LaggedStart(*remplir(bb, 3), lag_ratio=0.2), FadeIn(fb, shift=LEFT * 0.2), run_time=0.9)

        self.au_mot("La boîte B gagne")
        cadre = SurroundingRectangle(VGroup(bb, fb), color=VERT_OK, buff=0.15, stroke_width=4)
        gagne = self.t("B gagne !", 40, VERT_OK).next_to(cadre, DOWN, buff=0.25)
        self.play(Create(cadre), FadeIn(gagne, scale=0.7), run_time=0.6)
        self.insister(fb)

        self.au_mot("avec pourtant moins")
        moins = self.ligne([("seulement", WHITE), ("3", JAUNE_TITRE), ("blancs, contre", WHITE),
                            ("7", JAUNE_TITRE)], 28, 0.15).to_edge(LEFT, buff=0.45).set_y(-2.55)
        self.play(FadeIn(moins, shift=UP * 0.15), Indicate(b[1][:3], color=WHITE), run_time=0.7)

        self.au_mot("Ce qui compte")
        self.play(Write(self.chute("Ce qui compte, c'est la proportion.", color=VERT_OK, font_size=38)))
        self.attendre_voix()

    # ── 03 : défi 2, le sac de jetons ────────────────────────────────────────

    def sac_jetons(self, n_jaunes=5, n_noirs=9):
        sac = sac_vide(3.0, 3.0).move_to(P(-4.4, -0.4))
        places = [P(-5.3 + 0.6 * c, -1.55 + 0.58 * r) for r in range(4) for c in range(4)]
        jetons = VGroup(*[jeton(JETON_JAUNE if k < n_jaunes else JETON_NOIR).move_to(places[k])
                          for k in range(n_jaunes + n_noirs)])
        return sac, jetons, places

    def ecran_defi2(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-defi2")
        self.titre_ecran("Défi 2 : le sac de jetons")
        sac, jetons, _ = self.sac_jetons()
        self.au_mot("Un sac contient")
        self.play(FadeIn(sac), run_time=0.5)
        self.au_mot("5 jetons jaunes")
        tj = self.ligne([("5", JAUNE_TITRE), ("jetons jaunes", JETON_JAUNE)], 38, 0.18).move_to(P(1.4, 1.75))
        haut = [j.copy().shift(UP * 3) for j in jetons[:5]]
        self.play(LaggedStart(*[Transform(h, j) for h, j in zip(haut, jetons[:5])], lag_ratio=0.15),
                  FadeIn(tj), run_time=0.9, rate_func=rate_functions.ease_out_bounce)
        self.remove(*haut)
        self.add(jetons[:5])
        self.au_mot("9 noirs")
        tn = self.ligne([("9", JAUNE_TITRE), ("jetons noirs", WHITE)], 38, 0.18).move_to(P(1.4, 1.0))
        haut = [j.copy().shift(UP * 3) for j in jetons[5:]]
        self.play(LaggedStart(*[Transform(h, j) for h, j in zip(haut, jetons[5:])], lag_ratio=0.1),
                  FadeIn(tn), run_time=1.1, rate_func=rate_functions.ease_out_bounce)
        self.remove(*haut)
        self.add(jetons[5:])

        self.au_mot("Combien de jaunes")
        q1 = self.ligne([("Combien de", BLEU_CALCUL), (jeton(JETON_JAUNE), None),
                         ("faut-il ajouter ?", BLEU_CALCUL)], 36, 0.2).move_to(P(1.4, -0.2))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("2 sur 5")
        q2 = self.ligne([("pour que   P(jaune) =", WHITE), (self.fraction(2, 5, 40, JAUNE_TITRE), None)], 36, 0.25)
        q2.move_to(P(1.4, -1.45))
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.6)
        self.insister(q2[1])
        self.pause_cherche()

    def ecran_correction2(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-correction2")
        self.titre_ecran("Correction du défi 2")
        sac, jetons, places = self.sac_jetons()
        self.add(sac, jetons)
        self.au_mot("Avec 1 jaune de plus")
        nouveau = jeton(JETON_JAUNE).move_to(places[14])
        plus = self.ligne([("+ 1", JAUNE_TITRE), (jeton(JETON_JAUNE), None)], 40, 0.15).move_to(P(-4.4, 2.1))
        self.play(FadeIn(plus, scale=0.7), run_time=0.4)
        self.play(FadeIn(nouveau, shift=DOWN * 1.9), run_time=0.7, rate_func=rate_functions.ease_out_bounce)

        self.au_mot("6 jaunes sur 15")
        f615 = self.fraction(6, 15, 46, JAUNE_TITRE)
        l1 = self.ligne([("P(jaune) =", WHITE), (f615, None)], 40, 0.25).move_to(P(3.6, 1.2))
        self.play(FadeIn(l1[0]), FadeIn(f615, shift=LEFT * 0.2), run_time=0.6)
        tous = [*jetons[:5], nouveau, *jetons[5:]]   # 6 jaunes puis 9 noirs
        self.play(Indicate(VGroup(*tous[:6]), color=JETON_JAUNE, scale_factor=1.3), run_time=0.6)

        self.au_mot("c'est 2 sur 5")
        # trois paquets de 5 : 2 jaunes + 3 noirs dans chacun
        xs = [-2.1, -1.0, 0.1]
        cibles = []
        for c, x in enumerate(xs):
            cibles += [P(x, 1.15 - 0.55 * r) for r in range(5)]
        ordre = []
        for c in range(3):
            ordre += [tous[2 * c], tous[2 * c + 1]] + list(tous[6 + 3 * c: 9 + 3 * c])
        self.play(*[j.animate.move_to(p) for j, p in zip(ordre, cibles)], FadeOut(plus), run_time=1.2)
        paquets = VGroup(*[RoundedRectangle(width=0.8, height=2.85, corner_radius=0.2, stroke_color=BLEU_CALCUL,
                                            stroke_width=3).move_to(P(x, 0.05)) for x in xs])
        sous = VGroup(*[self.fraction(2, 5, 28, BLEU_CALCUL).next_to(p, DOWN, buff=0.15) for p in paquets])
        f25 = self.fraction(2, 5, 46, VERT_OK)
        l2 = self.ligne([("=", WHITE), (f25, None)], 40, 0.25).next_to(l1, DOWN, buff=0.45).align_to(l1[0], RIGHT)
        l2.shift(RIGHT * (f615.get_center()[0] - f25.get_center()[0]))
        self.play(LaggedStart(*[Create(p) for p in paquets], lag_ratio=0.25), FadeIn(sous), run_time=0.9)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.insister(f25)

        self.au_mot("Il faut ajouter 1 jaune")
        self.play(Write(self.chute("Il faut ajouter 1 jaune.", color=VERT_OK, font_size=40)))
        self.attendre_voix()

    # ── 05 : défi 3, le dé truqué ────────────────────────────────────────────

    def ecran_defi3(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-defi3")
        self.titre_ecran("Défi 3 : le dé truqué")
        self.au_mot("Un dé est truqué")
        roule = de_qui_roule(P(-5.0, 1.1), 1.4, periode=0.18, faces=[6, 2, 6, 4, 6, 1, 6, 5, 6, 3])
        tr = self.t("truqué !", 34, ORANGE_RETENUE).move_to(P(-5.0, -0.15))
        self.add(roule)
        self.play(FadeIn(tr, scale=0.7), run_time=0.4)

        self.au_mot("le 6 sort deux fois")
        faces = VGroup(*[de(k, 0.9) for k in range(1, 7)]).arrange(RIGHT, buff=0.45).move_to(P(0.8, 1.15))
        self.play(LaggedStart(*[FadeIn(f, shift=DOWN * 0.2) for f in faces], lag_ratio=0.12), run_time=0.8)
        fois = VGroup(*[self.t("× 1", 30, WHITE).next_to(f, DOWN, buff=0.25) for f in faces[:5]])
        f2 = self.t("× 2", 40, JAUNE_TITRE).next_to(faces[5], DOWN, buff=0.22)
        self.play(FadeIn(f2, scale=0.6), faces[5][0].animate.set_stroke(JAUNE_TITRE, 6), run_time=0.5)
        self.insister(VGroup(faces[5], f2))
        self.au_mot("chacune des autres faces")
        self.play(LaggedStart(*[FadeIn(f) for f in fois], lag_ratio=0.1), run_time=0.6)
        phrase = self.t("Le 6 sort 2 fois plus souvent que chaque autre face.", 32).move_to(P(-0.6, -0.95))
        self.play(FadeIn(phrase, shift=UP * 0.15), run_time=0.5)

        self.au_mot("Quelle est la probabilité")
        q = self.t("P(6) = ?", 52, BLEU_CALCUL).move_to(P(-0.6, -2.0))
        self.play(Write(q), run_time=0.6)
        self.insister(q)
        self.pause_cherche()
        roule.clear_updaters()

    def ecran_correction3(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-correction3")
        self.titre_ecran("Correction du défi 3")
        w, h = 1.3, 1.25
        x0 = -0.6 - 3.5 * w
        cases = VGroup()
        for i in range(7):
            face = min(i + 1, 6)
            coul = JAUNE_TITRE if face == 6 else BLEU_CALCUL
            r = Rectangle(width=w, height=h, stroke_color=WHITE, stroke_width=3, fill_color=coul, fill_opacity=0.3)
            r.move_to(P(x0 + w * (i + 0.5), 0.6))
            cases.add(VGroup(r, de(face, 0.75).move_to(r)))

        self.au_mot("Les 5 autres faces")
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in cases[:5]], lag_ratio=0.15), run_time=1.0)
        un = VGroup(*[self.t("1 part", 24, BLEU_CALCUL).next_to(c, DOWN, buff=0.15) for c in cases[:5]])
        self.play(FadeIn(un), run_time=0.4)
        self.au_mot("le 6 compte 2 parts")
        deux = self.t("2 parts", 28, JAUNE_TITRE).next_to(VGroup(cases[5], cases[6]), DOWN, buff=0.15)
        self.play(FadeIn(cases[5], shift=DOWN * 0.2), run_time=0.4)
        self.play(FadeIn(cases[6], shift=DOWN * 0.2), FadeIn(deux), run_time=0.4)

        self.au_mot("7 parts en tout")
        y = cases.get_top()[1] + 0.25
        acc = VGroup(Line(P(cases.get_left()[0], y - 0.15), P(cases.get_left()[0], y)),
                     Line(P(cases.get_left()[0], y), P(cases.get_right()[0], y)),
                     Line(P(cases.get_right()[0], y), P(cases.get_right()[0], y - 0.15))).set_stroke(WHITE, 3)
        sept = self.ligne([("7", JAUNE_TITRE), ("parts en tout", WHITE)], 34, 0.15).next_to(acc, UP, buff=0.12)
        self.play(Create(acc), FadeIn(sept), run_time=0.6)
        self.play(LaggedStart(*[Indicate(c, color=WHITE, scale_factor=1.1) for c in cases], lag_ratio=0.1),
                  run_time=0.8)

        self.au_mot("2 chances sur 7")
        f = self.fraction(2, 7, 56, VERT_OK)
        res = self.ligne([("P(6) =", WHITE), (f, None)], 52, 0.3).move_to(P(-0.6, -1.9))
        self.play(Write(res[0]), FadeIn(f, shift=UP * 0.2), run_time=0.7)
        self.insister(f)
        self.play(Create(SurroundingRectangle(res, color=VERT_OK, buff=0.2)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ─────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("On compare des proportions", "On compare des proportions, pas des quantités."),
            ("On cherche le nombre", "On cherche le nombre qui donne la bonne probabilité."),
            ("Et on compte en parts", "On compte en parts quand ce n'est pas équiprobable."),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 34)).arrange(RIGHT, buff=0.3)
                          for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 12.0:
            lignes.scale_to_fit_width(12.0)
        lignes.move_to(P(-0.5, 1.0))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Tu as fini la série")
        fini = self.t("Tu as fini la série de 3e !", 44, JAUNE_TITRE).move_to(P(-0.9, -1.25))
        self.play(FadeIn(fini, scale=0.7), run_time=0.6)
        self.insister(fini)
        self.au_mot("Les défis continuent")
        self.play(Write(self.chute("Les défis continuent sur le coach !", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_defi1()
        self.ecran_correction1()
        self.ecran_defi2()
        self.ecran_correction2()
        self.ecran_defi3()
        self.ecran_correction3()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
