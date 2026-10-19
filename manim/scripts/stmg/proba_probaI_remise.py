# proba_probaI_remise.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités » :
# AVEC ou SANS REMISE (micros : probaI_avec_sans_remise en STMG,
# alea_bern_avec_sans_remise en 1re), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_probaI_remise_short.py
# (ceinture jaune, un tiroir dans le noir, deux paires de chaussettes).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaRemiseBase porte toutes les scènes ; les deux sous-classes ne
# changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure est l'ARBRE PONDÉRÉ du coach (`canvasArbre` de la banque STMG :
# « Avec remise : mêmes probabilités au 2ᵉ niveau » / « Sans remise : les
# probabilités changent ») : carte blanche, branches grises, probabilités en
# bleu, chemin allumé en orange. Les fractions sont EMPILÉES (Text).
# ⛔ PAS D'ÉCART : seules les fractions DITES s'écrivent (avec remise : 3 sur 10
# puis 3 sur 10 ; sans remise : 2 sur 9 après coco, 3 sur 9 après menthe) ;
# les autres branches restent sans nombre.
#
# Écrans : 00 garde · 01 le sachet (10 bonbons : 3 coco, 7 menthe) · 02 avec
# remise (le bonbon retourne dans le sachet ; 3 sur 10 puis 3 sur 10) ·
# 03 0,3 × 0,3 = 0,09 · 04 sans remise (le bonbon est croqué ; 2 sur 9) ·
# 05 3/10 × 2/9 = 6/90 = 1/15 ≈ 0,07 · 06 le piège : les deux arbres côte à
# côte · 07 défi (deux menthes, sans remise) · 07b correction 7/10 × 6/9 =
# 42/90 = 7/15 ≈ 0,47 · 08 ce que tu as appris · 09 fin (eleveai.fr).
#
# Voix : manim/voix/stmg-premiere-proba-remise.json (Julie, débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaI_remise.py ProbaRemiseSTMG -o eleveai-maths-stmg-proba-remise --media_dir manim/scripts/stmg/media-probaI_remise
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaI_remise.py ProbaRemisePremiere -o eleveai-maths-premiere-commun-proba-remise --media_dir manim/scripts/stmg/media-probaI_remise
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaI_remise_short.py ShortProbaRemiseSTMG -o eleveai-maths-stmg-proba-remise-short --media_dir manim/scripts/stmg/media-probaI_remise
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaI_remise_short.py ShortProbaRemisePremiere -o eleveai-maths-premiere-commun-proba-remise-short --media_dir manim/scripts/stmg/media-probaI_remise
# Puis copier dans manim/sorties/stmg/maths/probabilites/17-remise/ et
# manim/sorties/premiere-commun/maths/probabilites/17-remise/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import (  # noqa: E402
    BORD, BRANCHE, CHEMIN, ENCRE, PROBA, frac, pastille, suite,
)

COCO = "#F8FAFC"        # bonbon à la coco : blanc
COCO_BORD = "#94A3B8"
MENTHE = "#34D399"      # bonbon à la menthe : vert
MENTHE_ENCRE = "#059669"
BLEU_FR = "#60A5FA"     # les fractions recopiées hors de la carte


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : bonbons et sachet ─────────────────────────────────────────

def bonbon(couleur=COCO, s=1.0):
    """Un bonbon emballé : le rond, et les deux papillotes."""
    bord = COCO_BORD if couleur == COCO else "#047857"
    corps = Circle(radius=0.17, fill_color=couleur, fill_opacity=1, stroke_color=bord, stroke_width=2)
    g_ = Polygon(P(-0.15, 0), P(-0.32, 0.12), P(-0.32, -0.12), fill_color=couleur, fill_opacity=1,
                 stroke_color=bord, stroke_width=2)
    d_ = g_.copy().rotate(PI, about_point=ORIGIN)
    return VGroup(g_, d_, corps).scale(s)


class Sachet(VGroup):
    """Un sachet ouvert en haut et ses bonbons (3 coco, 7 menthe, mêlés)."""

    ORDRE = [MENTHE, COCO, MENTHE, MENTHE, MENTHE, MENTHE, COCO, MENTHE, COCO, MENTHE]

    def __init__(self, s=1.0, **kw):
        super().__init__(**kw)
        self.sac = Polygon(P(-1.55, 1.0), P(-1.3, -1.05), P(1.3, -1.05), P(1.55, 1.0),
                           fill_color="#BAE6FD", fill_opacity=0.12, stroke_color="#BAE6FD", stroke_width=3)
        self.ourlet = Line(P(-1.62, 1.0), P(1.62, 1.0), color="#BAE6FD", stroke_width=6)
        self.bonbons = VGroup()
        places = [P(-1.05 + 0.7 * k, -0.72) for k in range(4)] + [P(-0.7 + 0.7 * k, -0.2) for k in range(3)] + [
            P(-0.7 + 0.7 * k, 0.32) for k in range(3)]
        for i, (c, pl) in enumerate(zip(self.ORDRE, places)):
            self.bonbons.add(bonbon(c, 0.95).move_to(pl).rotate(0.25 * ((i % 3) - 1)))
        self.add(self.sac, self.ourlet, self.bonbons)
        self.scale(s)

    def cocos(self):
        return [b for b, c in zip(self.bonbons, self.ORDRE) if c == COCO]

    def menthes(self):
        return [b for b, c in zip(self.bonbons, self.ORDRE) if c == MENTHE]


def croquer(b):
    """Le bonbon croqué : une bouchée en moins (un disque noir mord le bord)."""
    morsure = VGroup(*[Circle(radius=0.1 * b.width / 0.64, fill_color=config.background_color, fill_opacity=1, stroke_width=0)
                       .move_to(b.get_center() + np.array([0.1 * dx, 0.13, 0]) * b.width / 0.64)
                       for dx in (-1, 0.4, 1.6)])
    return morsure


# ── l'ARBRE PONDÉRÉ du coach (repris d'ArbrePR, mots coco / menthe) ─────────

class ArbreBonbons(VGroup):
    """Carte blanche du coach : 1er bonbon (coco / menthe), puis 2e bonbon.
    Branches : 0 → coco, 1 → menthe, 2 coco → coco, 3 coco → menthe,
    4 menthe → coco, 5 menthe → menthe. lab : 0 coco, 1 menthe (fond blanc),
    2 coco, 3 menthe, 4 coco, 5 menthe."""

    def __init__(self, titre="Arbre pondéré", dx=2.2, dy1=1.3, dy2=0.68, fs=28, **kw):
        super().__init__(**kw)
        racine = P(0, 0)
        noeuds = [P(dx, dy1), P(dx, -dy1)]
        feuilles = [P(2 * dx, dy1 + dy2), P(2 * dx, dy1 - dy2), P(2 * dx, -dy1 + dy2), P(2 * dx, -dy1 - dy2)]
        bouts = [(racine, noeuds[0]), (racine, noeuds[1]), (noeuds[0], feuilles[0]), (noeuds[0], feuilles[1]),
                 (noeuds[1], feuilles[2]), (noeuds[1], feuilles[3])]
        self.branches = [Line(u, v, color=BRANCHE, stroke_width=4) for u, v in bouts]
        self.depart = Dot(racine, radius=0.07, color=ENCRE)
        self.lab = []
        mots = [("coco", ENCRE), ("menthe", MENTHE_ENCRE)]
        for k in range(2):
            m = Text(mots[k][0], font_size=fs, color=mots[k][1])
            # au-dessus (coco) ou au-dessous (menthe) du nœud, décalé à gauche :
            # le mot ne mord pas sur les branches du second niveau
            m.next_to(noeuds[k], UP if k == 0 else DOWN, buff=0.12)
            m.shift(LEFT * (m.get_right()[0] - noeuds[k][0] - 0.12))
            fond = BackgroundRectangle(m, color=WHITE, fill_opacity=1, buff=0.04)
            self.lab.append(VGroup(fond, m))
        for k in range(4):
            mt, c = mots[k % 2]
            self.lab.append(Text(mt, font_size=fs, color=c).next_to(feuilles[k], RIGHT, buff=0.12))
        tout = VGroup(self.depart, *self.branches, *self.lab)
        self.carte = RoundedRectangle(width=tout.width + 1.2, height=tout.height + 1.5, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.32 + RIGHT * 0.05)
        self.titre = Text(titre, font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        self.nombres = {}
        self.add(self.carte, self.titre, *self.branches, self.depart, *self.lab)

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart)

    def construire(self, k, run_time=0.6):
        return Succession(Create(self.branches[k], run_time=run_time * 0.6),
                          FadeIn(self.lab[k], scale=1.4, run_time=run_time * 0.4))

    def nombre(self, k, n, d, fs=24, buff=0.06):
        """La fraction EMPILÉE n/d de la branche k, en bleu, au-dessus du trait."""
        t = frac(n, d, fs, PROBA, sw=2.5)
        u, v = self.branches[k].get_start(), self.branches[k].get_end()
        dd = v - u
        nn = np.array([-dd[1], dd[0], 0.0])
        nn = nn / np.linalg.norm(nn)
        if nn[1] < 0:
            nn = -nn
        demi = abs(nn[0]) * t.width / 2 + abs(nn[1]) * t.height / 2
        t.move_to((u + v) / 2 + nn * (demi + buff))
        self.nombres[k] = t
        self.add(t)
        return t

    def etat(self, ks=None, op=0.18):
        """Allume les branches ks (orange épais) et estompe le reste ; ks=None : tout normal."""
        anims = []
        for k, br in enumerate(self.branches):
            if ks is None:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=1))
            elif k in ks:
                anims.append(br.animate.set_stroke(CHEMIN, 9, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
            if k in self.nombres:
                on = ks is None or k in ks
                anims.append(self.nombres[k].animate.set_opacity(1 if on else op))
        gardes = set() if ks is None else ({0} if any(k in (0, 2, 3) for k in ks) else set()) | (
            {1} if any(k in (1, 4, 5) for k in ks) else set()) | {k for k in ks if k >= 2}
        for k, m in enumerate(self.lab):
            on = ks is None or k in gardes
            cible = m[1] if k < 2 else m
            anims.append(cible.animate.set_opacity(1 if on else op))
        return anims


class ProbaRemiseBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-remise"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg=5.6):
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def arbre(self, titre, nombres=(), centre=P(2.0, -0.35), echelle=0.9):
        """L'arbre de l'écran ; `nombres` = [(branche, n, d)] déjà dits."""
        a = ArbreBonbons(titre).scale(echelle).move_to(centre)
        for k, n, d in nombres:
            a.nombre(k, n, d, fs=int(28 * echelle))
        return a

    def ligne_calcul(self, morceaux, fs=50):
        """Une ligne : ("f", n, d) pour une fraction empilée, (texte, couleur) sinon."""
        objs = []
        for m in morceaux:
            if m[0] == "f":
                objs.append(frac(m[1], m[2], fs, BLEU_FR if len(m) < 4 else m[3]))
            else:
                objs.append(self.t(m[0], fs, m[1]))
        return suite(*objs, buff=0.22)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Avec ou sans remise ?", 52, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        s1 = Sachet(0.78).move_to(P(-3.4, 0.2))
        s2 = Sachet(0.78).move_to(P(2.2, 0.2))
        l1 = self.t("Avec remise", 34, VERT_OK).next_to(s1, DOWN, buff=0.35)
        l2 = self.t("Sans remise", 34, ORANGE_RETENUE).next_to(s2, DOWN, buff=0.35)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(s1), FadeIn(s2), run_time=0.9)
        b1 = s1.cocos()[0]
        haut1 = b1.get_center()
        dehors = P(s1.get_center()[0] + 1.25, s1.get_top()[1] + 0.35)
        self.play(FadeIn(l1, shift=UP * 0.15), b1.animate.move_to(dehors), run_time=0.5)
        retour = CurvedArrow(dehors + P(0.1, -0.25), s1.get_right() + P(-0.15, 0.1), angle=-1.6, color=VERT_OK,
                             stroke_width=5, tip_length=0.2)
        self.play(Create(retour), b1.animate.move_to(haut1), run_time=0.6)
        self.au_mot("sans remise")
        b2 = s2.cocos()[0]
        dehors2 = P(s2.get_center()[0] + 1.25, s2.get_top()[1] + 0.35)
        self.play(FadeIn(l2, shift=UP * 0.15), b2.animate.move_to(dehors2).scale(1.4), run_time=0.5)
        mors = croquer(b2)
        self.play(FadeIn(mors), run_time=0.25)
        self.play(FadeOut(VGroup(b2, mors), scale=0.3), run_time=0.35)
        self.au_mot("ça change tout")
        self.play(Indicate(l1, color=VERT_OK), Indicate(l2, color=ORANGE_RETENUE), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 01 : le sachet ──────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le sachet de bonbons")
        s = Sachet(1.25).move_to(P(-3.0, -0.2))
        self.play(FadeIn(VGroup(s.sac, s.ourlet)), run_time=0.4)
        self.au_mot("10 bonbons")
        cibles = [b.get_center() for b in s.bonbons]
        for b in s.bonbons:
            b.shift(UP * 3.2)
        l10 = self.t("10 bonbons", 46).move_to(P(2.6, 1.7))
        self.play(LaggedStart(*[b.animate.move_to(c) for b, c in zip(s.bonbons, cibles)], lag_ratio=0.08),
                  FadeIn(l10, shift=LEFT * 0.2), run_time=1.2)
        self.au_mot("3 à la coco")
        lc = suite(bonbon(COCO, 1.2), self.t("3", 50, JAUNE_TITRE), self.t("à la coco", 38, COCO), buff=0.25)
        lc.move_to(P(2.6, 0.55))
        self.play(FadeIn(lc, shift=LEFT * 0.2), *[Indicate(b, color=YELLOW, scale_factor=1.4) for b in s.cocos()],
                  run_time=0.7)
        self.au_mot("7 à la menthe")
        lm = suite(bonbon(MENTHE, 1.2), self.t("7", 50, JAUNE_TITRE), self.t("à la menthe", 38, MENTHE), buff=0.25)
        lm.move_to(P(2.6, -0.55))
        lm.align_to(lc, LEFT)
        self.play(FadeIn(lm, shift=LEFT * 0.2), *[Indicate(b, color=YELLOW, scale_factor=1.3) for b in s.menthes()],
                  run_time=0.7)
        self.au_mot("On en prend un")
        b1 = s.menthes()[2]
        self.play(b1.animate.move_to(s.get_top() + P(-0.5, 0.45)).scale(1.3), run_time=0.6)
        self.au_mot("au hasard")
        hasard = self.t("au hasard", 34, BLEU_CALCUL).move_to(P(2.6, -1.75))
        self.play(FadeIn(hasard, shift=UP * 0.1), Wiggle(b1), run_time=0.6)
        self.au_mot("puis un deuxième")
        b2 = s.cocos()[1]
        self.play(b2.animate.move_to(s.get_top() + P(0.5, 0.45)).scale(1.3), run_time=0.6)
        self.attendre_voix()

    # ── 02 : avec remise ────────────────────────────────────────────────────

    def ecran_avec(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-avec")
        self.titre_ecran("Avec remise")
        s = Sachet(1.0).move_to(P(-4.6, 0.45))
        a = self.arbre("Avec remise")
        a.remove(*a.branches, *a.lab)
        self.add(s, a.socle())
        self.au_mot("on remet le premier bonbon")
        b = s.cocos()[0]
        place = b.get_center()
        dehors = s.get_top() + P(1.1, 0.4)
        self.play(b.animate.move_to(dehors).scale(1.3), run_time=0.6)
        self.au_mot("dans le sachet")
        retour = CurvedArrow(dehors + P(0.15, -0.3), s.get_right() + P(-0.2, -0.1), angle=-1.5, color=VERT_OK,
                             stroke_width=5, tip_length=0.2)
        remis = self.t("on le remet", 32, VERT_OK).next_to(s, DOWN, buff=0.3)
        self.play(Create(retour), b.animate.move_to(place).scale(1 / 1.3), FadeIn(remis, shift=UP * 0.1),
                  run_time=0.8)
        self.au_mot("Le sachet est le même")
        self.play(Indicate(s.sac, color=VERT_OK, scale_factor=1.05), a.construire(0), a.construire(1), run_time=0.8)
        self.au_mot("3 coco sur 10")
        f1 = a.nombre(0, "3", "10", fs=int(28 * 0.9))
        a.remove(f1)
        self.play(FadeIn(f1, scale=1.6), *[Indicate(x, color=YELLOW, scale_factor=1.4) for x in s.cocos()],
                  run_time=0.6)
        self.insister(f1, 0.25)
        self.au_mot("puis encore 3 sur 10")
        self.play(*[a.construire(k) for k in (2, 3, 4, 5)])
        self.au_mot("3 sur 10. Les")
        f2 = a.nombre(2, "3", "10", fs=int(28 * 0.9))
        a.remove(f2)
        self.play(FadeIn(f2, scale=1.6), run_time=0.5)
        self.play(Indicate(f1, color=VERT_OK), Indicate(f2, color=VERT_OK), run_time=0.6)
        self.au_mot("Les deux tirages")
        ind = VGroup(self.t("Les deux tirages", 30), self.t("sont indépendants", 32, VERT_OK)).arrange(DOWN, buff=0.1)
        ind.next_to(remis, DOWN, buff=0.55)
        self.play(FadeIn(ind[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("indépendants")
        self.play(FadeIn(ind[1], scale=1.3), run_time=0.5)
        self.attendre_voix()

    # ── 03 : 0,3 × 0,3 = 0,09 ───────────────────────────────────────────────

    def ecran_avec_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-avec-calcul")
        a = self.arbre("Avec remise", [(0, "3", "10"), (2, "3", "10")], centre=P(-3.4, -0.35))
        self.add(a)
        self.titre_ecran("Deux bonbons coco")
        self.play(*a.etat([0, 2]), run_time=0.6)
        k = [self.t(x, 60, c) for x, c in (("0,3", BLEU_FR), ("×", WHITE), ("0,3", BLEU_FR), ("=", WHITE),
                                           ("0,09", JAUNE_TITRE))]
        calc = self.caser(suite(*k, buff=0.25)).move_to(P(3.5, 0.6))
        self.au_mot("0,3 fois")
        self.play(TransformFromCopy(a.nombres[0], k[0]), run_time=0.6)
        self.play(FadeIn(k[1], scale=1.8), run_time=0.3)
        self.au_mot("0,3, égale")
        self.play(TransformFromCopy(a.nombres[2], k[2]), run_time=0.6)
        self.au_mot("égale 0,09")
        self.play(FadeIn(k[3]), FadeIn(k[4], scale=1.8), run_time=0.5)
        self.insister(k[4], 0.3)
        bout = pastille("0,09", 24).next_to(a.lab[2], RIGHT, buff=0.15)
        self.play(TransformFromCopy(k[4], bout), run_time=0.6)
        self.attendre_voix()

    # ── 04 : sans remise ────────────────────────────────────────────────────

    def ecran_sans(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-sans")
        self.titre_ecran("Sans remise")
        s = Sachet(1.0).move_to(P(-4.6, 0.45))
        a = self.arbre("Sans remise")
        a.remove(*a.branches, *a.lab)
        self.add(s, a.socle())
        self.au_mot("on mange le premier bonbon")
        b = s.cocos()[0]
        dehors = s.get_top() + P(1.1, 0.4)
        self.play(b.animate.move_to(dehors).scale(1.4), run_time=0.6)
        mors = croquer(b)
        mange = self.t("on le mange", 32, ORANGE_RETENUE).next_to(s, DOWN, buff=0.3)
        self.play(FadeIn(mors), FadeIn(mange, shift=UP * 0.1), run_time=0.3)
        self.play(FadeOut(VGroup(b, mors), scale=0.3), run_time=0.4)
        self.au_mot("S'il était à la coco")
        self.play(a.construire(0), a.construire(1), run_time=0.8)
        self.play(*a.etat([0]), run_time=0.4)
        self.au_mot("il n'en reste que")
        self.play(a.construire(2), a.construire(3), run_time=0.8)
        self.au_mot("2 sur 9")
        f = a.nombre(2, "2", "9", fs=int(28 * 0.9))
        a.remove(f)
        reste = [x for x in s.cocos() if x is not b]
        self.play(FadeIn(f, scale=1.6), *[Indicate(x, color=YELLOW, scale_factor=1.5) for x in reste], run_time=0.7)
        self.insister(f, 0.25)
        self.au_mot("Le deuxième tirage dépend")
        self.play(*a.etat([0, 2]), run_time=0.4)
        self.play(a.construire(4), a.construire(5), run_time=0.8)
        self.au_mot("ils ne sont pas")
        ind = VGroup(self.t("Les deux tirages ne sont", 28), self.t("pas indépendants", 32, ORANGE_RETENUE))
        ind.arrange(DOWN, buff=0.1).next_to(mange, DOWN, buff=0.55)
        self.play(FadeIn(ind[0], shift=UP * 0.1), run_time=0.4)
        self.play(FadeIn(ind[1], scale=1.3), run_time=0.5)
        self.attendre_voix()

    # ── 05 : 3/10 × 2/9 = 6/90 = 1/15 ≈ 0,07 ───────────────────────────────

    def ecran_sans_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-sans-calcul")
        a = self.arbre("Sans remise", [(2, "2", "9")], centre=P(-3.4, -0.35))
        self.add(a)
        self.titre_ecran("Deux bonbons coco")
        self.play(*a.etat([0, 2]), run_time=0.6)
        fs = 50
        l1 = self.ligne_calcul([("f", "3", "10"), ("×", WHITE), ("f", "2", "9"), ("=", WHITE),
                                ("f", "6", "90", WHITE)], fs)
        l2 = self.ligne_calcul([("=", WHITE), ("f", "1", "15", WHITE), ("≈", WHITE), ("0,07", JAUNE_TITRE)], fs)
        l1.move_to(P(3.75, 1.3))
        l2.next_to(l1, DOWN, buff=0.55).align_to(l1, LEFT)
        self.au_mot("3 sur 10")
        f0 = a.nombre(0, "3", "10", fs=int(28 * 0.9))
        a.remove(f0)
        self.play(FadeIn(f0, scale=1.6), run_time=0.4)
        self.play(TransformFromCopy(f0, l1[0]), run_time=0.6)
        self.au_mot("fois 2 sur 9")
        self.play(FadeIn(l1[1], scale=1.8), run_time=0.3)
        self.play(TransformFromCopy(a.nombres[2], l1[2]), run_time=0.6)
        self.au_mot("égale 6 sur 90")
        self.play(FadeIn(l1[3]), FadeIn(l1[4], scale=1.5), run_time=0.5)
        self.au_mot("soit 1 sur 15")
        self.play(FadeIn(l2[0]), FadeIn(l2[1], scale=1.5), run_time=0.5)
        self.au_mot("environ 0,07")
        self.play(FadeIn(l2[2]), FadeIn(l2[3], scale=1.8), run_time=0.5)
        self.insister(l2[3], 0.3)
        bout = pastille("0,07", 24).next_to(a.lab[2], RIGHT, buff=0.15)
        self.play(TransformFromCopy(l2[3], bout), run_time=0.6)
        self.attendre_voix()

    # ── 06 : le piège : les deux arbres côte à côte ─────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        e = 0.78
        av = self.arbre("Avec remise", [(0, "3", "10"), (2, "3", "10")], centre=P(-3.5, -0.95), echelle=e)
        sa = self.arbre("Sans remise", [(0, "3", "10"), (2, "2", "9")], centre=P(2.35, -0.95), echelle=e)
        k = [self.t(x, 52, c) for x, c in (("0,3", BLEU_FR), ("×", WHITE), ("0,3", BLEU_FR))]
        calc = suite(*k, buff=0.22)
        sr = self.t("sans remise", 36, ORANGE_RETENUE)
        haut = suite(calc, sr, buff=0.45).move_to(P(-0.6, 2.25))
        self.au_mot("multiplier 0,3 par 0,3")
        self.play(FadeIn(calc, shift=DOWN * 0.15), run_time=0.6)
        self.au_mot("dans un tirage sans remise")
        self.play(FadeIn(sr, shift=LEFT * 0.15), run_time=0.5)
        barre = Line(calc.get_corner(DL) + P(-0.12, -0.05), calc.get_corner(UR) + P(0.12, 0.05),
                     color=ROUGE_ERREUR, stroke_width=8)
        self.play(Create(barre), calc.animate.set_opacity(0.55), run_time=0.4)
        self.au_mot("Sur l'arbre")
        self.play(FadeIn(av), FadeIn(sa), run_time=0.7)
        self.au_mot("la deuxième branche change")
        self.play(*[Indicate(x.branches[i], color=CHEMIN, scale_factor=1.05) for x in (av, sa) for i in (2, 3, 4, 5)],
                  run_time=0.8)
        self.au_mot("après coco")
        self.play(*av.etat([0, 2]), *sa.etat([0, 2]), run_time=0.5)
        self.au_mot("2 sur 9")
        self.play(Indicate(av.nombres[2], color=VERT_OK, scale_factor=1.4), run_time=0.5)
        self.insister(sa.nombres[2], 0.3)
        self.au_mot("après menthe")
        self.play(*av.etat([1, 4]), *sa.etat([1, 4]), run_time=0.5)
        self.au_mot("3 sur 9")
        f = sa.nombre(4, "3", "9", fs=int(28 * e))
        sa.remove(f)
        self.play(FadeIn(f, scale=1.6), run_time=0.5)
        self.insister(f, 0.3)
        self.attendre_voix()

    # ── 07 : défi : deux menthes, sans remise ───────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        s = Sachet(1.1).move_to(P(-3.6, 0.2))
        self.play(FadeIn(s), run_time=0.5)
        self.au_mot("Sans remise")
        q0 = self.t("Sans remise :", 40, ORANGE_RETENUE)
        q1 = self.t("la probabilité de prendre", 34)
        q2 = suite(self.t("deux bonbons", 38), self.t("à la menthe ?", 38, MENTHE), buff=0.2)
        q = self.caser(VGroup(q0, q1, q2).arrange(DOWN, buff=0.3), 6.0).move_to(P(2.9, 0.6))
        self.play(FadeIn(q0, shift=UP * 0.15), run_time=0.5)
        self.au_mot("quelle est la probabilité")
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("deux bonbons à la menthe")
        self.play(FadeIn(q2, shift=UP * 0.15), *[Indicate(x, color=YELLOW, scale_factor=1.3) for x in s.menthes()],
                  run_time=0.7)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction : 7/10 × 6/9 = 42/90 = 7/15 ≈ 0,47 ────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        a = self.arbre("Sans remise", centre=P(-3.4, -0.35))
        self.add(a)
        self.titre_ecran("Correction")
        self.au_mot("7 sur 10, puis")
        f1 = a.nombre(1, "7", "10", fs=int(28 * 0.9))
        a.remove(f1)
        self.play(*a.etat([1]), FadeIn(f1, scale=1.6), run_time=0.6)
        self.au_mot("6 menthes sur 9")
        f2 = a.nombre(5, "6", "9", fs=int(28 * 0.9))
        a.remove(f2)
        self.play(*a.etat([1, 5]), FadeIn(f2, scale=1.6), run_time=0.6)
        self.insister(f2, 0.25)
        fs = 50
        l1 = self.ligne_calcul([("f", "7", "10"), ("×", WHITE), ("f", "6", "9"), ("=", WHITE),
                                ("f", "42", "90", WHITE)], fs)
        l2 = self.ligne_calcul([("=", WHITE), ("f", "7", "15", WHITE), ("≈", WHITE), ("0,47", JAUNE_TITRE)], fs)
        l1.move_to(P(3.75, 1.3))
        l2.next_to(l1, DOWN, buff=0.55).align_to(l1, LEFT)
        self.au_mot("7 sur 10 fois")
        self.play(TransformFromCopy(f1, l1[0]), run_time=0.6)
        self.play(FadeIn(l1[1], scale=1.8), run_time=0.3)
        self.au_mot("6 sur 9, égale")
        self.play(TransformFromCopy(f2, l1[2]), run_time=0.6)
        self.au_mot("égale 42 sur 90")
        self.play(FadeIn(l1[3]), FadeIn(l1[4], scale=1.5), run_time=0.5)
        self.au_mot("soit 7 sur 15")
        self.play(FadeIn(l2[0]), FadeIn(l2[1], scale=1.5), run_time=0.5)
        self.au_mot("environ 0,47")
        self.play(FadeIn(l2[2]), FadeIn(l2[3], scale=1.8), run_time=0.5)
        self.insister(l2[3], 0.3)
        bout = pastille("0,47", 24).next_to(a.lab[5], RIGHT, buff=0.15)
        self.play(TransformFromCopy(l2[3], bout), run_time=0.6)
        ok = self.coche(taille=0.35).next_to(l2, DOWN, buff=0.5).align_to(l2, LEFT).shift(RIGHT * 0.2)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        ta = self.t("Avec remise :", 42, VERT_OK)
        a1 = self.t("le sachet ne change pas", fs)
        a2 = self.t("les tirages sont indépendants", fs)
        a3 = self.t("on multiplie les mêmes probabilités", fs)
        ts = self.t("Sans remise :", 42, ORANGE_RETENUE)
        s1 = self.t("le sachet change", fs)
        s2 = self.t("la deuxième branche dépend de la première", fs)
        lignes = [VGroup(self.coche(), m).arrange(RIGHT, buff=0.3) for m in (a1, a2, a3, s1, s2)]
        bloc_a = VGroup(ta, *lignes[:3]).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        bloc_s = VGroup(ts, *lignes[3:]).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        for l in lignes:
            l.shift(RIGHT * 0.4)
        tout = VGroup(bloc_a, bloc_s).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if tout.width > 10.6:
            tout.scale_to_fit_width(10.6)
        tout.move_to(P(-0.7, -0.4))
        self.au_mot("Avec remise")
        self.play(FadeIn(ta, shift=RIGHT * 0.2), run_time=0.5)
        reperes = ["le sachet ne change pas", "les tirages sont", "on multiplie", "le sachet change",
                   "la deuxième branche"]
        for i, (mot, l) in enumerate(zip(reperes, lignes)):
            self.au_mot(mot)
            if i == 3:
                self.play(FadeIn(ts, shift=RIGHT * 0.2), run_time=0.4)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
        self.attendre_voix(marge=1.0)

    # ── 09 : l'écran de fin (règle du 19/10 : il écrit ce que dit la voix) ──

    def ecran_fin(self, voix="09-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 0.95))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.28, stroke_width=3)
        abonne = self.t("Abonne-toi !", 46, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 50, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.7)
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.7)
        self.au_mot("Et abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.5)
        self.play(GrowFromCenter(poignee), run_time=0.5)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_avec()
        self.ecran_avec_calcul()
        self.ecran_sans()
        self.ecran_sans_calcul()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.ecran_fin()


class ProbaRemiseSTMG(ProbaRemiseBase):
    identite = "Maths STMG — EleveAI"


class ProbaRemisePremiere(ProbaRemiseBase):
    identite = "Maths 1re — EleveAI"
