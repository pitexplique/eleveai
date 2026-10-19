# proba_probaT_chemin_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « La probabilité d'un chemin » (micros probaT_chemin / alea_arbre_chemin).
# CEINTURE JAUNE. Il AMUSE : deux feux tricolores sur ta route ; deux feux
# verts : 0,5 + 0,8 ? Non, 1,3 c'est impossible : on multiplie, 0,4.
#   · en HAUT la route, les deux feux qui s'allument, la voiture qui passe ;
#   · en BAS, EN MÊME TEMPS : le petit arbre pondéré (feu 1 puis feu 2), le
#     chemin vert → vert allumé en orange, 0,5 × 0,8 = 0,4 ;
#   · fin : rouge puis vert (0,3), « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : la branche « rouge » du premier feu reste SANS nombre (0,5
# n'est pas dit) ; c'est le défi.
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran : UN SEUL rendu suffit,
# copié sous les deux noms (STMG, 1re). Les deux sous-classes existent quand
# même, identiques.
#
# Voix : manim/voix/stmg-premiere-proba-chemin-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_chemin_short.py ShortProbaCheminSTMG -o eleveai-maths-stmg-proba-chemin-short --media_dir manim/scripts/stmg/media-probaT_chemin
# (ShortProbaCheminPremiere donne la même image.) Copier dans
# manim/sorties/stmg/maths/probabilites/10-chemin/ et
# manim/sorties/premiere-commun/maths/probabilites/10-chemin/
# (eleveai-maths-premiere-commun-proba-chemin-short.mp4).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaT_chemin import BRANCHE, CHEMIN, P, pastille, suite  # noqa: E402  (pose les chemins)
from proba_probaC_interpreter_short import voiture  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
ROUTE = "#334155"
FEU_R = "#EF4444"
FEU_O = "#F59E0B"
FEU_V = "#22C55E"
ETEINT = 0.18


def feu(s=1.0):
    """Un feu tricolore : poteau, boîtier, rouge / orange / vert (éteints)."""
    poteau = Line(P(0, -0.42), P(0, 0.0), color="#94A3B8", stroke_width=6)
    boite = RoundedRectangle(width=0.34, height=0.8, corner_radius=0.08, fill_color="#111827", fill_opacity=1,
                             stroke_color="#94A3B8", stroke_width=2).move_to(P(0, 0.4))
    feux = [Circle(radius=0.1, fill_color=c, fill_opacity=ETEINT, stroke_width=0).move_to(P(0, 0.4 + dy))
            for c, dy in ((FEU_R, 0.24), (FEU_O, 0.0), (FEU_V, -0.24))]
    return VGroup(poteau, boite, *feux).scale(s)


def allumer(f, k):
    """Allume la lampe k (2 rouge, 3 orange, 4 vert) et éteint les autres."""
    return [f[i].animate.set_fill(opacity=1 if i == k else ETEINT) for i in (2, 3, 4)]


def pastille_feu(couleur, lt, r=0.17):
    d = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    return VGroup(d, Text(lt, font_size=20, color=WHITE, weight=BOLD).move_to(d))


class PetitArbre(VGroup):
    """Feu 1 (vert / rouge) puis feu 2 (vert / rouge) ; mêmes indices que l'arbre
    de la paysage : 0 → V, 1 → R, 2 V → V, 3 V → R, 4 R → V, 5 R → R."""

    def __init__(self, x0=-1.95, dx=1.35, dy1=0.5, dy2=0.28, y0=-0.78, **kw):
        super().__init__(**kw)
        racine = P(x0, y0)
        noeuds = [P(x0 + dx, y0 + dy1), P(x0 + dx, y0 - dy1)]
        feuilles = [P(x0 + 2 * dx, y0 + dy1 + dy2), P(x0 + 2 * dx, y0 + dy1 - dy2),
                    P(x0 + 2 * dx, y0 - dy1 + dy2), P(x0 + 2 * dx, y0 - dy1 - dy2)]
        bouts = [(racine, noeuds[0]), (racine, noeuds[1]), (noeuds[0], feuilles[0]), (noeuds[0], feuilles[1]),
                 (noeuds[1], feuilles[2]), (noeuds[1], feuilles[3])]
        self.branches = [Line(a, b, color="#CBD5E1", stroke_width=4) for a, b in bouts]
        self.depart = Dot(racine, radius=0.06, color=WHITE)
        cs = [(FEU_V, "V"), (FEU_R, "R"), (FEU_V, "V"), (FEU_R, "R"), (FEU_V, "V"), (FEU_R, "R")]
        self.lab = [pastille_feu(c, lt).move_to(b) for (c, lt), (_, b) in zip(cs, bouts)]
        for k in range(2, 6):
            self.lab[k].shift(RIGHT * 0.2)
        for m in self.lab:
            m.set_z_index(3)
        self.nombres = {}
        self.crees = set()
        self.add(self.depart)

    def construire(self, k, run_time=0.5):
        self.crees.add(k)
        return Succession(Create(self.branches[k], run_time=run_time * 0.6),
                          FadeIn(self.lab[k], scale=1.5, run_time=run_time * 0.4))

    def nombre(self, k, texte, fs=24):
        a, b = self.branches[k].get_start(), self.branches[k].get_end()
        t = Text(texte, font_size=fs, color="#60A5FA", weight=BOLD)
        haut = b[1] >= a[1]
        t.move_to((a + b) / 2 + (UP if haut else DOWN) * 0.22 + LEFT * 0.05)
        self.nombres[k] = t
        return t

    def etat(self, ks=None, op=0.2):
        anims = []
        for k, br in enumerate(self.branches):
            if k not in self.crees:
                continue
            on = ks is None or k in ks
            anims.append(br.animate.set_stroke(CHEMIN if (ks is not None and on) else "#CBD5E1",
                                               8 if (ks is not None and on) else 4, opacity=1 if on else op))
            if k in self.nombres:
                anims.append(self.nombres[k].animate.set_opacity(1 if on else op))
        return anims


class ShortProbaCheminBase(Short6e):
    nom_voix = "stmg-premiere-proba-chemin-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def ligne(self, morceaux, fs=44, y=-2.2):
        g = suite(*[Text(tx, font_size=fs, color=c) for tx, c in morceaux], buff=0.14)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g.move_to(P(0, y))

    def construct(self):
        self.margo_bas()

        # ── 00 : la route, les deux feux ; 0,5 plus 0,8 ? ──
        self.dire("00-accroche")
        titre = self.grand("Deux feux verts ?", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        route = Rectangle(width=4.5, height=0.36, fill_color=ROUTE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.65))
        tirets = DashedLine(P(-2.25, 0.65), P(2.25, 0.65), dash_length=0.16, color=WHITE, stroke_width=3)
        f1 = feu(0.85)
        f1.shift(P(-0.55, 0.83) - f1[0].get_start())
        f2 = feu(0.85)
        f2.shift(P(1.45, 0.83) - f2[0].get_start())
        n1 = self.t("1", 22, WHITE).next_to(f1[1], LEFT, buff=0.1)
        n2 = self.t("2", 22, WHITE).next_to(f2[1], LEFT, buff=0.1)
        auto = voiture("#38BDF8", 0.7).move_to(P(-3.0, 0.6))
        auto.set_z_index(2)
        self.add(auto)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(route), FadeIn(tirets),
                  FadeIn(f1, shift=UP * 0.3), FadeIn(f2, shift=UP * 0.3), FadeIn(n1), FadeIn(n2), run_time=0.8)
        self.play(auto.animate.move_to(P(-1.5, 0.6)), run_time=0.8, rate_func=rate_functions.ease_out_cubic)
        a = PetitArbre()
        self.add(a)
        self.au_mot("Le premier est vert")
        self.play(*allumer(f1, 4), a.construire(0), a.construire(1), run_time=0.7)
        self.play(Flash(f1[4], color=FEU_V, line_length=0.15), run_time=0.4)
        self.au_mot("0,5")
        n05 = a.nombre(0, "0,5")
        self.play(FadeIn(n05, scale=1.8), run_time=0.4)
        self.insister(n05, 1.5, 0.2)
        self.au_mot("S'il est vert")
        self.play(*allumer(f2, 4), a.construire(2), a.construire(3), run_time=0.7)
        self.play(Flash(f2[4], color=FEU_V, line_length=0.15), run_time=0.4)
        self.au_mot("0,8")
        n08 = a.nombre(2, "0,8")
        self.play(FadeIn(n08, scale=1.8), run_time=0.4)
        self.insister(n08, 1.5, 0.2)
        self.au_mot("0,5 plus 0,8")
        somme = self.ligne([("0,5", "#60A5FA"), ("+", WHITE), ("0,8", "#60A5FA"), ("?", ORANGE_RETENUE)])
        self.play(TransformFromCopy(n05, somme[0]), FadeIn(somme[1], scale=1.6), TransformFromCopy(n08, somme[2]),
                  run_time=0.7)
        self.play(FadeIn(somme[3], scale=2.0), run_time=0.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : 1,3 impossible ; on suit le chemin et on multiplie ──
        self.dire("01-image")
        self.au_mot("Non : 1,3")
        somme2 = self.ligne([("0,5", "#60A5FA"), ("+", WHITE), ("0,8", "#60A5FA"), ("=", WHITE),
                             ("1,3", ORANGE_RETENUE)])
        self.play(ReplacementTransform(somme[:3], somme2[:3]), FadeOut(somme[3]), FadeIn(somme2[3:], scale=1.6),
                  run_time=0.5)
        self.au_mot("impossible")
        barre = Line(somme2.get_corner(DL) + P(-0.1, -0.05), somme2.get_corner(UR) + P(0.1, 0.05),
                     color=ROUGE_ERREUR, stroke_width=8)
        imp_t = self.grand("IMPOSSIBLE !", font_size=50, color=ROUGE_ERREUR).rotate(0.15)
        imp = VGroup(BackgroundRectangle(imp_t, color=BLACK, fill_opacity=0.85, buff=0.15), imp_t).move_to(P(0, -1.0))
        self.play(Create(barre), run_time=0.3)
        self.play(FadeIn(imp, scale=2.2), run_time=0.35)
        self.play(Wiggle(imp), run_time=0.5)
        self.au_mot("On suit le chemin vert")
        self.play(FadeOut(imp, scale=0.5), FadeOut(VGroup(somme2, barre), shift=DOWN * 0.2), run_time=0.4)
        trace = Line(P(-1.5, 0.52), P(-0.55, 0.52), color=CHEMIN, stroke_width=8)
        self.play(*a.etat([0]), auto.animate.move_to(P(-0.55, 0.6)), Create(trace), run_time=0.8)
        self.au_mot("puis vert")
        trace2 = Line(P(-0.55, 0.52), P(1.45, 0.52), color=CHEMIN, stroke_width=8)
        self.play(*a.etat([0, 2]), auto.animate.move_to(P(1.45, 0.6)), Create(trace2), run_time=0.8)
        self.au_mot("on multiplie")
        prod = self.ligne([("0,5", "#60A5FA"), ("×", WHITE), ("0,8", "#60A5FA"), ("=", WHITE), ("0,4", JAUNE_TITRE)])
        self.play(Indicate(a.branches[0], color=CHEMIN), Indicate(a.branches[2], color=CHEMIN), run_time=0.5)
        self.au_mot("0,5 fois")
        self.play(TransformFromCopy(n05, prod[0]), FadeIn(prod[1], scale=1.8), run_time=0.5)
        self.au_mot("0,8, égale")
        self.play(TransformFromCopy(n08, prod[2]), run_time=0.4)
        self.au_mot("égale 0,4")
        self.play(FadeIn(prod[3]), FadeIn(prod[4], scale=2.0), run_time=0.4)
        bout = pastille("0,4", 20).next_to(a.lab[2], RIGHT, buff=0.1)
        self.play(TransformFromCopy(prod[4], bout), auto.animate.shift(RIGHT * 1.6).set_opacity(0), run_time=0.6)
        self.au_mot("Moins d")
        moins = VGroup(self.t("Moins d'une chance", 32, JAUNE_TITRE), self.t("sur deux !", 32, JAUNE_TITRE))
        moins.arrange(DOWN, buff=0.08).move_to(P(0, 3.3))
        self.play(ReplacementTransform(titre, moins), run_time=0.5)
        self.insister(prod[4], 1.5, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 02 : rouge, puis vert ? ──
        self.dire("02-question")
        self.au_mot("Si le premier est rouge")
        etsi = self.grand("Et si c'est rouge ?", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(moins, etsi), FadeOut(VGroup(prod, bout, trace, trace2)), *allumer(f1, 2),
                  *allumer(f2, 3), *a.etat([1]), run_time=0.6)
        self.play(Flash(f1[2], color=FEU_R, line_length=0.15), run_time=0.5)
        self.insister(a.lab[1], 1.4, 0.2)
        self.au_mot("le second est vert")
        self.play(*allumer(f2, 4), a.construire(4), a.construire(5), run_time=0.7)
        self.play(*a.etat([1, 4]), run_time=0.4)
        self.au_mot("0,3")
        n03 = a.nombre(4, "0,3")
        self.play(FadeIn(n03, scale=1.8), run_time=0.4)
        self.insister(n03, 1.5, 0.2)
        self.au_mot("Quelle est la probabilit")
        q = VGroup(suite(self.t("Rouge,", 40, FEU_R), self.t("puis vert", 40, FEU_V), buff=0.18),
                   self.t("quelle probabilité ?", 32, WHITE)).arrange(DOWN, buff=0.12)
        if q[0].width > LARGEUR_MAX:
            q[0].scale_to_fit_width(LARGEUR_MAX)
        q.move_to(P(0, 1.0))
        self.play(FadeOut(VGroup(route, tirets, f1, f2, n1, n2, auto)), FadeIn(q, shift=UP * 0.2), run_time=0.6)
        self.insister(q[0], 1.15, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 36, VERT_OK), self.t("commentaire !", 36, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


class ShortProbaCheminSTMG(ShortProbaCheminBase):
    identite = "Maths STMG — EleveAI"


class ShortProbaCheminPremiere(ShortProbaCheminBase):
    identite = "Maths 1re — EleveAI"
