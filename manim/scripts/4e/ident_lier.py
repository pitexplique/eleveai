# ident_lier.py
# EleveAI — Maths 4e — série IDENTITÉS REMARQUABLES, épisode 01 : LIER le carré d'une somme à la
# double distributivité. Paysage 16:9, AVEC VOIX, ceinture JAUNE.
# Micro : litteral_identite_lier_distributivite (TOUS les écrans).
# Métier : Nadia, architecte (la terrasse carrée de x mètres, agrandie de 4 m dans chaque sens).
# Centres : art-design, histoire-geographie.
# Écrans : garde (00) ; la terrasse de Nadia, côté x + 4 (01) ; l'aire (x + 4)(x + 4) = (x + 4)² (02) ;
# QUESTION 1 (02q, réponse B) ; la terrasse découpée : x², deux bandes 4x, le coin 16 (03) ; les
# 4 produits de la double distributivité posés sur les 4 morceaux (04) ; réduire, le double produit
# (05) ; vérifier pour x = 1 sur une grille 5 × 5 (05b) ; le piège x² + 16 (06) ; QUESTION 2 (06q,
# réponse C) ; la formule (a + b)² et son carré (07) ; défi (x + 6)² (08) et correction (08b) ; ce que
# tu as appris (09) ; fin commune (10, manim/fin_commune.py).
# Code couleur : x bleu (série distributivité / factorisation) ; le carré x² bleu, les deux BANDES
# orange, le coin violet ; juste vert ; piège rouge. ⛔ Pas de factorisation par une identité (3e).
# Voix : manim/voix/4e-identites-lier.json (validée) ; marques : ident_lier_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/ident_lier.py IdentLier4e --media_dir manim/scripts/4e/media-ident-01-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/ident_lier.py IdentLier4e -o eleveai-maths-4e-identites-lier --media_dir manim/scripts/4e/media-ident-01
# Sortie : manim/sorties/4e/maths/identites/01-lier/eleveai-maths-4e-identites-lier.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(0, str(ICI.parents[1]))  # manim/ : fin_commune

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_resoudre_distributivite import BLEU_BLOC  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

PAROLE["²"] = "carré"  # « x au carré » : le ² se pose sur « carré »
PAROLE["ab"] = "a b"  # « 2ab » se dit « 2 a b »

FACTEUR = OPERATION
BANDE = "#ea580c"  # les deux bandes (le double produit)
COIN = "#7c3aed"  # le petit carré du coin
FL_X = CIEL


def D(s, fs=56, couleur=WHITE, lettres="x", audit=True):
    """Une expression : la lettre (et son ²) en bleu."""
    e = E(s, fs, couleur, lettres=lettres, audit=audit)
    for i, a in enumerate(e.atomes):
        if a.original_text == "²" and i and e.atomes[i - 1].original_text in (lettres or "#"):
            a.set_color(INCONNUE)
    return e


def idx(e, s, k=1):
    """L'indice du k-ième atome de texte s dans e."""
    n = 0
    for i, a in enumerate(e.atomes):
        if a.original_text == s:
            n += 1
            if n == k:
                return i
    raise ValueError(f"{s} absent de {e.s}")


class Terrasse(VGroup):
    """Le carré de côté xv + b découpé : .p["xx"] (le carré x², en haut à gauche), .p["xb"] (la bande de
    droite), .p["bx"] (la bande du bas), .p["bb"] (le coin) ; .bord, .coupes (hors du groupe)."""

    COUL = {"xx": BLEU_BLOC, "xb": BANDE, "bx": BANDE, "bb": COIN}

    def __init__(self, xv=2.4, b=1.0, centre=ORIGIN, plein=True, **kw):
        super().__init__(**kw)
        W = xv + b
        tl = P(-W / 2, W / 2)
        self.xv, self.b = xv, b
        self.p = {
            "xx": Rectangle(width=xv, height=xv).move_to(tl + P(xv / 2, -xv / 2)),
            "xb": Rectangle(width=b, height=xv).move_to(tl + P(xv + b / 2, -xv / 2)),
            "bx": Rectangle(width=xv, height=b).move_to(tl + P(xv / 2, -xv - b / 2)),
            "bb": Rectangle(width=b, height=b).move_to(tl + P(xv + b / 2, -xv - b / 2)),
        }
        for k, r in self.p.items():
            r.set_stroke(WHITE, 2).set_fill(self.COUL[k], 0.9 if plein else 0)
        self.bord = Square(W, stroke_color=WHITE, stroke_width=5)
        self.coupes = VGroup(DashedLine(tl + P(xv, 0), tl + P(xv, -W), color=WHITE, stroke_width=3, dash_length=0.12),
                             DashedLine(tl + P(0, -xv), tl + P(W, -xv), color=WHITE, stroke_width=3, dash_length=0.12))
        self.add(*self.p.values(), self.bord)
        c0 = self.get_center()
        self.move_to(centre)
        self.coupes.shift(self.get_center() - c0)

    def remplir(self, k, opacite=0.9):
        return self.p[k].animate.set_fill(self.COUL[k], opacite)

    def etiquette(self, k, s, fs=40, lettres="x"):
        e = D(s, fs, lettres=lettres, audit=False).set_color(WHITE)
        r = self.p[k]
        if e.width > r.width - 0.14:
            e.scale_to_fit_width(r.width - 0.14)
        if e.height > r.height - 0.14:
            e.scale_to_fit_height(r.height - 0.14)
        return e.move_to(r)

    def accolade(self, cote, morceaux, s, fs=34, lettres="x", buff=0.1):
        """Une accolade (UP, LEFT, DOWN) le long des morceaux, et son texte."""
        g = VGroup(*[self.p[k] for k in morceaux])
        br = Brace(g, cote, buff=buff, color=CIEL)
        t = D(s, fs, lettres=lettres, audit=False)
        t.next_to(br, cote, buff=0.08)
        return VGroup(br, t)

    def cotes(self, x="x", b="4", fs=34, lettres="x", haut=UP, gauche=LEFT):
        """Les quatre accolades : x | b en haut, x | b à gauche."""
        return VGroup(self.accolade(haut, ("xx",), x, fs, lettres), self.accolade(haut, ("xb",), b, fs, lettres),
                      self.accolade(gauche, ("xx",), x, fs, lettres), self.accolade(gauche, ("bx",), b, fs, lettres))

    def trous(self, morceaux=("xb", "bx", "bb"), couleur=None):
        """Des morceaux encore à trouver : un pointillé et un « ? »."""
        g = VGroup()
        for k in morceaux:
            r = self.p[k]
            d = DashedVMobject(Rectangle(width=r.width - 0.06, height=r.height - 0.06,
                                         stroke_color=couleur or PIEGE, stroke_width=4), num_dashes=24).move_to(r)
            g.add(VGroup(d, T("?", 34, couleur or PIEGE, audit=False, gras=True).move_to(r)))
        return g


def nadia(s=0.78):
    """Nadia, architecte : le casque de chantier et un plan roulé."""
    m = Metier(["Nadia", "architecte"], fs=32, peau="#a16207", tenue="#334155", cheveux="#1f1308", longs=True, s=s)
    m.nom.arrange(DOWN, buff=0.12)
    p = m.perso
    calotte = AnnularSector(inner_radius=0, outer_radius=0.47 * s, angle=PI, start_angle=0, fill_color="#facc15",
                            fill_opacity=1, stroke_width=0).move_to(p.tete.get_top() + DOWN * 0.05 * s)
    visiere = RoundedRectangle(width=1.08 * s, height=0.1 * s, corner_radius=0.03, fill_color="#eab308", fill_opacity=1,
                               stroke_width=0).next_to(calotte, DOWN, buff=-0.03 * s)
    plan = Rectangle(width=0.62 * s, height=0.44 * s, fill_color="#bfdbfe", fill_opacity=1, stroke_color="#1d4ed8",
                     stroke_width=2)
    traits = VGroup(*[Line(plan.get_left() + P(0.05, dy * s), plan.get_right() + P(-0.05, dy * s), color="#1d4ed8",
                           stroke_width=1.5) for dy in (-0.1, 0.0, 0.1)],
                    Line(plan.get_top() + P(0.05, -0.04), plan.get_bottom() + P(0.05, 0.04), color="#1d4ed8", stroke_width=1.5))
    g_plan = VGroup(plan, traits).move_to(p.get_center() + P(0.45, -0.3) * s)
    p.add(calotte, visiere, g_plan)
    return m


class IdentLier4e(PaysageRel):
    nom_voix = "4e-identites-lier"
    fichier_marques = "ident_lier_marques.json"
    ceinture = "jaune"

    def cadre(self, m, couleur=CIEL, buff=0.12):
        return SurroundingRectangle(m, color=couleur, buff=buff, stroke_width=3, corner_radius=0.08)

    def fleche_arc(self, a, b, couleur=None, angle=-1.2, sw=5):
        return CurvedArrow(a.get_top() + UP * 0.1, b.get_top() + UP * 0.12, angle=angle, color=couleur or FACTEUR,
                           stroke_width=sw, tip_length=0.16)

    def fleche_bas(self, a, b, couleur=None, angle=1.2, sw=5):
        return CurvedArrow(a.get_bottom() + DOWN * 0.1, b.get_bottom() + DOWN * 0.12, angle=angle,
                           color=couleur or FACTEUR, stroke_width=sw, tip_length=0.16)

    def quatre_fleches(self, e, i1, i2, j1, j2, sw=5):
        """Les 4 flèches de (i1 i2)(j1 j2) : celles du 1er terme dessus, celles du 2e dessous."""
        return [self.fleche_arc(e.atomes[i1], e.atomes[j1], FL_X, -1.6, sw),
                self.fleche_arc(e.atomes[i1], e.atomes[j2], FL_X, -1.15, sw),
                self.fleche_bas(e.atomes[i2], e.atomes[j1], FACTEUR, 1.6, sw),
                self.fleche_bas(e.atomes[i2], e.atomes[j2], FACTEUR, 1.15, sw)]

    def clignoter(self, mobs, k=1.12, fois=2, rt=0.18):
        for _ in range(fois):
            self.play(*[m.animate.scale(k) for m in mobs], run_time=rt)
            self.play(*[m.animate.scale(1 / k) for m in mobs], run_time=rt)

    def dit_avec(self, e, phrase, gestes, n=1, rt=0.12):
        """Comme dit (sans zoom), mais l'atome i joue en plus les animations gestes[i]()."""
        debut = -1
        for _ in range(n):
            debut = self._texte_voix.find(phrase, debut + 1)
        if debut < 0:
            raise ValueError(f"« {phrase} » absent de la voix {self._cle_voix}")
        lots = self._plan_eq(e, debut, debut + len(phrase))
        for k, (pos, atomes) in enumerate(lots):
            self._attendre_pos(pos)
            d = rt
            if k + 1 < len(lots):
                gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                d = max(0.08, min(rt, gap - 0.01))
            ex = []
            for a in atomes:
                f = gestes.get(e.atomes.index(a))
                if f:
                    ex += f()
            self.play(*[FadeIn(a) for a in atomes], *ex, run_time=max(d, 0.2) if ex else d)
        return e

    def _disposer_q(self, question, choix, phrase):
        """Comme la factorisation 04 : la phrase de réponse sous la figure, à gauche, à 36 pt."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        pause.next_to(cartes, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        if len(ph.submobjects):
            ph.scale(T(phrase[0], 36, audit=False).height / ph[0].height)
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        if ph.width > 6.7:
            ph.scale_to_fit_width(6.7)
        haut = getattr(self, "ph_haut", -0.6)
        ph.align_to(P(-6.45, 0), LEFT).align_to(P(0, haut), UP)
        if ph.get_bottom()[1] < -3.45:
            ph.scale((haut + 3.45) / ph.height, about_point=P(-6.45, haut))
        return tete, q, cartes, pause, rebours, ph

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le carré d'une somme", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Le carré", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        fig = Terrasse(1.75, 0.75, centre=P(-4.0, 0.2))
        l1 = self.lg("D'où vient la formule ?", 2.6, 0.75, 46, JAUNE_TITRE, maxw=7.0)
        self.dit(l1, "D'où vient la formule ?", avec=[FadeIn(fig, shift=UP * 0.2)])
        l2 = self.lg("Un carré découpé", 2.6, -0.05, 40, maxw=7.0)
        self.dit_avec(l2, "Un carré découpé", {idx(l2, "découpé"): lambda: [Create(fig.coupes)]})
        l3 = self.lg("va te le montrer.", 2.6, -0.7, 40, maxw=7.0)
        self.dit(l3, "va te le montrer.")
        self.clignoter([fig.p["xb"], fig.p["bx"]], 1.08, 1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : la terrasse de Nadia ───────────────────────────────────────────
    def ecran_architecte(self):
        self.ecran("01-architecte")
        m = nadia()
        m.perso.move_to(P(-5.35, 0.9))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.35)
        self.au("Nadia", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("architecte", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        fig = Terrasse(2.3, 1.0, centre=P(-1.95, -0.6))
        hx, h4, gx, g4 = fig.cotes("x", "4", 34)
        tot = fig.accolade(DOWN, ("bx", "bb"), "x + 4", 36)
        l1 = self.lg("Une cliente a une terrasse carrée,", 3.45, 2.9, 42, maxw=6.3)
        self.dit(l1, "Une cliente a une terrasse carrée,", avec=[FadeIn(fig.p["xx"], scale=0.8)])
        l2 = self.lg("de x mètres de côté.", 3.45, 2.3, 42, lettres="x", maxw=6.3)
        self.dit_avec(l2, "de x mètres de côté.", {1: lambda: [GrowFromCenter(hx[0]), FadeIn(hx[1]),
                                                               GrowFromCenter(gx[0]), FadeIn(gx[1])]})
        l3 = self.lg("Elle veut l'agrandir :", 3.4, 1.45, 38, CIEL, maxw=6.0)
        self.dit(l3, "Elle veut l'agrandir :")
        l4 = self.lg("4 mètres de plus dans un sens,", 3.45, 0.85, 42, maxw=6.3)
        self.dit_avec(l4, "4 mètres de plus dans un sens,",
                      {0: lambda: [GrowFromEdge(fig.p["xb"], LEFT), GrowFromCenter(h4[0]), FadeIn(h4[1])]})
        l5 = self.lg("et 4 mètres de plus dans l'autre.", 3.45, 0.25, 42, maxw=6.3)
        self.dit_avec(l5, "et 4 mètres de plus dans l'autre.",
                      {1: lambda: [GrowFromEdge(fig.p["bx"], UP), GrowFromEdge(fig.p["bb"], UP),
                                   GrowFromCenter(g4[0]), FadeIn(g4[1])]})
        l6 = self.lg("La nouvelle terrasse", 3.45, -0.6, 42, maxw=6.3)
        self.dit(l6, "La nouvelle terrasse")
        l7 = self.lg("est encore un carré,", 3.45, -1.15, 42, maxw=6.3)
        self.dit(l7, "est encore un carré,", avec=[Create(fig.bord)])
        l8 = self.lg("de côté x + 4.", 3.0, -1.85, 46, JAUNE_TITRE, lettres="x", maxw=4.6)
        self.dit_avec(l8, "de côté x plus 4.", {idx(l8, "4"): lambda: [GrowFromCenter(tot[0]), FadeIn(tot[1])]})
        self.insister(l8, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : l'aire, (x + 4)² ───────────────────────────────────────────────
    def ecran_carre(self):
        self.ecran("02-carre")
        fig = Terrasse(2.3, 1.0, centre=P(-3.75, -0.35))
        hx, h4, gx, g4 = fig.cotes("x", "4", 34)
        l1 = self.lg("Son aire, c'est côté fois côté :", 2.7, 2.65, 38, maxw=7.0)
        self.dit_avec(l1, "Son aire, c'est côté fois côté :",
                      {0: lambda: [FadeIn(VGroup(fig, hx, h4, gx, g4))],
                       idx(l1, "côté", 1): lambda: [Indicate(VGroup(hx, h4), color=JAUNE_TITRE, scale_factor=1.08)],
                       idx(l1, "côté", 2): lambda: [Indicate(VGroup(gx, g4), color=JAUNE_TITRE, scale_factor=1.08)]})
        e1 = D("(x + 4) × (x + 4)", 60).move_to(P(2.7, 1.65))
        self.dire_eq(e1, "x plus 4, fois, x plus 4.", echelle=1.15)
        l2 = self.lg("On l'écrit plus court :", 2.7, 0.6, 38, CIEL, maxw=7.0)
        self.dit(l2, "On l'écrit plus court :")
        e2 = D("(x + 4)²", 84).move_to(P(2.7, -0.45))
        self.dire_eq(e2, "x plus 4, au carré.", echelle=1.2)
        self.play(Create(self.cadre(e2, buff=0.16)), run_time=0.25)
        l3 = self.lg("Un carré, c'est une expression", 2.4, -1.65, 38, maxw=6.6)
        self.dit(l3, "Un carré, c'est une expression")
        l4 = self.lg("multipliée par elle-même.", 2.2, -2.35, 42, JAUNE_TITRE, maxw=5.6)
        self.dit(l4, "multipliée par elle-même.")
        self.clignoter([VGroup(*e1.atomes[:5]), VGroup(*e1.atomes[6:])], 1.1, 1, 0.2)
        self.insister(l4, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02q : QUESTION 1 (réponse B) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        self.ph_haut = -0.55
        fig = Terrasse(1.65, 0.8, centre=P(-3.5, 1.15))
        haut = fig.accolade(UP, ("xx", "xb"), "x + 5", 34)
        gauche = fig.accolade(LEFT, ("xx", "bx"), "x + 5", 34)

        def avant(sc):
            sc.eq_dans_q(0, "Que veut dire (x + 5)² ?", "Que veut dire x plus 5, au carré ?", lettres="x", fs=36)
            sc.play(FadeIn(fig, shift=UP * 0.2), GrowFromCenter(haut[0]), FadeIn(haut[1]), GrowFromCenter(gauche[0]),
                    FadeIn(gauche[1]), run_time=0.35)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : (x + 5) × (x + 5).", "Réponse B : x plus 5, fois x plus 5.", lettres="x",
                     premier=True, avec=[Indicate(haut, color=JAUNE_TITRE, scale_factor=1.08),
                                         Indicate(gauche, color=JAUNE_TITRE, scale_factor=1.08)])
            sc.ph_eq(1, "Le carré multiplie l'expression", "Le carré multiplie l'expression")
            sc.ph_eq(2, "par elle-même.", "par elle-même.")
            sc.rep_fini()

        self.question_pause("02q-question", "02r-reponse", ["Que veut dire (x + 5)² ?"],
                            [Eq("(x + 5) × 2", 34), Eq("(x + 5) × (x + 5)", 34), Eq("x² + 25", 34)], 1,
                            ["Réponse B : (x + 5) × (x + 5).", "Le carré multiplie l'expression", "par elle-même."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 03 : la terrasse découpée ───────────────────────────────────────────
    def ecran_decoupe(self):
        self.ecran("03-decoupe")
        fig = Terrasse(2.5, 1.1, centre=P(-3.75, -0.6))
        cotes = fig.cotes("x", "4", 34)
        tit = self.lg("Découpons la nouvelle terrasse.", 0, 3.05, 44, JAUNE_TITRE, maxw=12)
        self.dit(tit, "Découpons la nouvelle terrasse.", avec=[FadeIn(VGroup(fig, cotes))])
        self.play(Create(fig.coupes), *[r.animate.set_fill(opacity=0.22) for r in fig.p.values()], run_time=0.4)
        rangs = [("L'ancienne terrasse :", "x × x = x²", "x fois x, x au carré.", "xx", "x²", 60, 5),
                 ("Une bande le long d'un côté :", "x × 4 = 4x", "x fois 4, 4 x.", "xb", "4x", 40, 5),
                 ("Une autre bande, de l'autre côté :", "encore 4x.", "encore 4 x.", "bx", "4x", 40, 2),
                 ("Et le coin :", "4 × 4 = 16", "4 fois 4, 16.", "bb", "16", 40, 4)]
        for (texte, s, phrase, k, lab, fs, j), (y1, y2) in zip(rangs, ((2.1, 1.45), (0.75, 0.1), (-0.6, -1.25),
                                                                       (-1.95, -2.6))):
            t = self.lg(texte, 2.55, y1, 40, CIEL, maxw=7.6)
            self.dit(t, texte.replace("Une autre bande, de", "Une autre bande, le long de"), avec=[fig.remplir(k)])
            e = D(s, 46).move_to(P(2.55, y2))
            et = fig.etiquette(k, lab, fs)
            self.poser_avec(e, phrase, {j: lambda et=et: [FadeIn(et, scale=1.4)]})
        self.clignoter([fig.p["xb"], fig.p["bx"]], 1.06, 1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 04 : les 4 produits sur les 4 morceaux ──────────────────────────────
    def ecran_distributivite(self):
        self.ecran("04-distributivite")
        fig = Terrasse(2.1, 0.9, centre=P(-4.35, 0.1))
        cotes = fig.cotes("x", "4", 32)
        e = D("(x + 4)(x + 4)", 66, audit=False).move_to(P(2.4, 1.45))
        e.atomes[3].set_color(FACTEUR)
        e.atomes[8].set_color(FACTEUR)
        tit = self.lg("C'est exactement la double distributivité.", 0, 3.1, 42, JAUNE_TITRE, maxw=12)
        self.dit(tit, "C'est exactement la double distributivité.",
                 avec=[FadeIn(VGroup(fig, cotes)), Create(fig.coupes), FadeIn(e, shift=UP * 0.2)])
        fl = self.quatre_fleches(e, 1, 3, 6, 8)
        prods = [("x × x = x²", "x fois x : x au carré.", "xx", "x²", 56),
                 ("x × 4 = 4x", "x fois 4 : 4 x.", "xb", "4x", 38),
                 ("4 × x = 4x", "4 fois x : 4 x.", "bx", "4x", 38),
                 ("4 × 4 = 16", "4 fois 4 : 16.", "bb", "16", 38)]
        for (s, phrase, k, lab, fs), y, a in zip(prods, (0.15, -0.6, -1.35, -2.1), fl):
            c = D(s, 44).mis_sur_egal(2.6, y)
            if s.startswith("4"):
                c.atomes[0].set_color(FACTEUR)
            et = fig.etiquette(k, lab, fs)
            j = c.atomes.index(c.egal) + 1
            self.poser_avec(c, phrase, {0: lambda a=a: [Create(a)],
                                        j: lambda et=et, c=c, j=j, k=k: [
                                            FadeIn(et, target_position=VGroup(*c.atomes[j:]).get_center()),
                                            Circumscribe(fig.p[k], color=JAUNE_TITRE, buff=0.02)]})
        l = self.lg("Quatre produits, quatre morceaux du carré.", -1.0, -2.95, 40, VERT_OK, maxw=10)
        self.dit(l, "Quatre produits, quatre morceaux du carré.")
        self.play(Circumscribe(fig.bord, color=VERT_OK, buff=0.06), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 05 : réduire, le double produit ─────────────────────────────────────
    def ecran_reduire(self):
        self.ecran("05-reduire")
        fig = Terrasse(2.1, 0.9, centre=P(-4.35, 0.1))
        cotes = fig.cotes("x", "4", 32)
        et = {k: fig.etiquette(k, s, fs) for k, s, fs in (("xx", "x²", 56), ("xb", "4x", 38), ("bx", "4x", 38),
                                                          ("bb", "16", 38))}
        s = D("x² + 4x + 4x + 16", 52, audit=False).move_to(P(2.4, 1.95))
        VGroup(*s.atomes[3:5], *s.atomes[6:8]).set_color(BANDE)
        l0 = self.lg("On réduit :", 2.4, 2.8, 40, CIEL, maxw=5)
        self.dit(l0, "On réduit :", avec=[FadeIn(VGroup(fig, cotes, *et.values())), Create(fig.coupes), FadeIn(s)])
        r1 = D("4x + 4x = 8x", 52).move_to(P(2.4, 1.05))
        self.dire_eq(r1, "4 x plus 4 x, 8 x.", echelle=1.15,
                     avec=[Circumscribe(VGroup(fig.p["xb"], fig.p["bx"]), color=JAUNE_TITRE, buff=0.03)])
        r2 = self.lg("L'aire vaut x² + 8x + 16.", 2.4, 0.05, 46, VERT_OK, maxw=7.4)
        self.dit(r2, "L'aire vaut x au carré plus 8 x plus 16.")
        self.play(Create(self.cadre_ok(r2, 0.14)), run_time=0.25)
        l3 = self.lg("Les deux bandes sont égales :", 2.4, -0.95, 38, maxw=7.4)
        self.dit_avec(l3, "Les deux bandes sont égales :",
                      {idx(l3, "égales"): lambda: [Indicate(VGroup(et["xb"], et["bx"]), color=JAUNE_TITRE)]})
        l4 = self.lg("ensemble, elles font", 2.4, -1.6, 38, maxw=7.4)
        self.dit(l4, "ensemble, elles font")
        l5 = self.lg("le double produit : 2 × x × 4.", 1.9, -2.3, 42, JAUNE_TITRE, lettres="x", maxw=6.4)
        self.dit_avec(l5, "le double produit, 2 fois x fois 4.",
                      {idx(l5, "2"): lambda: [Circumscribe(VGroup(r2.atomes[7], r2.atomes[8]), color=JAUNE_TITRE,
                                                           buff=0.06)]})
        self.clignoter([fig.p["xb"], fig.p["bx"], et["xb"], et["bx"]], 1.06, 1, 0.2)
        self.insister(l5, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05b : vérifier pour x = 1 ───────────────────────────────────────────
    def ecran_verifier(self):
        self.ecran("05b-verifier")
        g = D("(x + 4)² = x² + 8x + 16", 50).sans_audit().move_to(P(0, 3.05))
        self.play(FadeIn(g), run_time=0.3)
        l = self.lg("Vérifions pour x = 1.", 0, 2.1, 40, CIEL, lettres="x", maxw=9)
        self.dit(l, "Vérifions pour x égale 1.")
        # la grille 5 × 5 : 1 case (x² = 1), deux bandes de 4 cases, le coin de 16 cases
        u = 0.46
        x0, y0 = -5.25, 0.45
        cases = {}
        for r in range(5):
            for c in range(5):
                cases[(r, c)] = Square(u, stroke_color="#94a3b8", stroke_width=2, fill_color="#1e293b",
                                       fill_opacity=1).move_to(P(x0 + u * (c + 0.5), y0 - u * (r + 0.5)))
        grille = VGroup(*cases.values())
        un = VGroup(cases[(0, 0)])
        bandes = VGroup(*[cases[(0, c)] for c in range(1, 5)], *[cases[(r, 0)] for r in range(1, 5)])
        coin = VGroup(*[cases[(r, c)] for r in range(1, 5) for c in range(1, 5)])
        b1 = Brace(cases[(0, 0)], UP, buff=0.08, color=CIEL)
        b4 = Brace(VGroup(*[cases[(0, c)] for c in range(1, 5)]), UP, buff=0.08, color=CIEL)
        t1 = T("1", 30, WHITE, audit=False).next_to(b1, UP, buff=0.06)
        t4 = T("4", 30, WHITE, audit=False).next_to(b4, UP, buff=0.06)
        lb1 = Brace(cases[(0, 0)], LEFT, buff=0.08, color=CIEL)
        lb4 = Brace(VGroup(*[cases[(r, 0)] for r in range(1, 5)]), LEFT, buff=0.08, color=CIEL)
        lt1 = T("1", 30, WHITE, audit=False).next_to(lb1, LEFT, buff=0.06)
        lt4 = T("4", 30, WHITE, audit=False).next_to(lb4, LEFT, buff=0.06)
        lg_g = self.lg("À gauche :", 2.0, 1.0, 38, CIEL, maxw=5)
        self.dit_avec(lg_g, "À gauche :", {idx(lg_g, "gauche"): lambda: [Indicate(VGroup(*g.atomes[:6]),
                                                                                  color=JAUNE_TITRE)]})
        a = D("1 + 4 = 5, et 5² = 25.", 44).move_to(P(2.0, 0.3))
        self.poser_avec(a, "1 plus 4, 5, et 5 au carré, 25.", {
            0: lambda: [FadeIn(grille), GrowFromCenter(b1), FadeIn(t1), GrowFromCenter(lb1), FadeIn(lt1)],
            2: lambda: [GrowFromCenter(b4), FadeIn(t4), GrowFromCenter(lb4), FadeIn(lt4)],
            idx(a, "25"): lambda: [Indicate(grille, color=JAUNE_TITRE, scale_factor=1.04)]})
        lg_d = self.lg("À droite :", 2.0, -0.6, 38, CIEL, maxw=5)
        self.dit_avec(lg_d, "À droite :", {idx(lg_d, "droite"): lambda: [Indicate(VGroup(*g.atomes[7:]),
                                                                                  color=JAUNE_TITRE)]})
        b = D("1 + 8 + 16 = 25.", 44).move_to(P(2.0, -1.3))
        self.poser_avec(b, "1 plus 8 plus 16, 25.", {
            0: lambda: [un.animate.set_fill(BLEU_BLOC, 1)],
            2: lambda: [bandes.animate.set_fill(BANDE, 1)],
            4: lambda: [coin.animate.set_fill(COIN, 1)],
            idx(b, "25"): lambda: [Circumscribe(grille, color=VERT_OK, buff=0.05)]})
        ok = self.lg("Ça marche.", 1.6, -2.4, 50, VERT_OK, maxw=5)
        self.dit(ok, "Ça marche.", avec=[
            Create(SurroundingRectangle(a.atomes[idx(a, "25")], color=VERT_OK, buff=0.07, stroke_width=4)),
            Create(SurroundingRectangle(b.atomes[idx(b, "25")], color=VERT_OK, buff=0.07, stroke_width=4))])
        self.insister(ok, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06 : le piège x² + 16 ───────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = T("Le piège :", 46, PIEGE, gras=True)
        l0 = self.lg("oublier les bandes.", 0, 0, 46, maxw=6)
        VGroup(tit, l0).arrange(RIGHT, buff=0.35).move_to(P(-1.0, 3.0))
        self.au("Le piège", FadeIn(tit, scale=1.3), rt=0.25)
        self.dit(l0, "oublier les bandes.")
        fig = Terrasse(2.0, 0.85, centre=P(-3.9, -1.25), plein=False)
        cotes = fig.cotes("x", "4", 32)
        exx = fig.etiquette("xx", "x²", 56)
        ebb = fig.etiquette("bb", "16", 36)
        trous = fig.trous(("xb", "bx"))
        e = D("(x + 4)² ≠ x² + 16", 62).move_to(P(0, 1.85))
        i_ne = idx(e, "≠")
        VGroup(*e.atomes[i_ne:]).set_color(PIEGE)
        self.poser_avec(e, "x plus 4, au carré, ne fait pas x au carré plus 16.", {
            0: lambda: [Create(fig.bord), FadeIn(cotes)],
            i_ne + 2: lambda: [fig.remplir("xx"), FadeIn(exx)],
            idx(e, "16"): lambda: [fig.remplir("bb"), FadeIn(ebb), Create(trous)]})
        self.play(Wiggle(trous), run_time=0.5)
        l1 = self.lg("Il manquerait 8x :", 2.6, -0.2, 46, PIEGE, maxw=7)
        e1 = fig.etiquette("xb", "4x", 38)
        e2 = fig.etiquette("bx", "4x", 38)
        self.dit_avec(l1, "Il manquerait 8 x :", {idx(l1, "8"): lambda: [
            fig.remplir("xb"), fig.remplir("bx"), FadeOut(trous[0][1]), FadeOut(trous[1][1]), FadeIn(e1), FadeIn(e2)]})
        l2 = self.lg("les deux bandes de la terrasse !", 2.6, -0.9, 40, maxw=7.2)
        self.dit(l2, "les deux bandes de la terrasse !")
        mil = [VGroup(fig.p["xb"], trous[0][0], e1), VGroup(fig.p["bx"], trous[1][0], e2)]
        self.bring_to_front(*mil)
        self.clignoter(mil, 1.1, 2, 0.18)
        self.insister(l1, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 2 (réponse C) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        self.ph_haut = -0.55
        fig = Terrasse(1.75, 0.7, centre=P(-3.5, 1.15))
        cotes = fig.cotes("x", "2", 32)
        exx = fig.etiquette("xx", "x²", 50)
        ebb = fig.etiquette("bb", "4", 34)
        e1 = fig.etiquette("xb", "2x", 32)
        e2 = fig.etiquette("bx", "2x", 32)

        def avant(sc):
            sc.eq_dans_q(0, "Développe (x + 2)².", "Développe x plus 2, au carré.", lettres="x", fs=36)
            sc.play(FadeIn(VGroup(fig, cotes), shift=UP * 0.2), Create(fig.coupes), run_time=0.35)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : x² + 4x + 4.", "Réponse C : x au carré plus 4 x plus 4.", lettres="x",
                     premier=True, avec=[FadeIn(exx, scale=1.3), FadeIn(ebb, scale=1.3)])
            sc.ph_eq(1, "Les deux bandes valent 2x chacune :", "Les deux bandes valent 2 x chacune :", lettres="x",
                     avec=[FadeIn(e1, scale=1.3), FadeIn(e2, scale=1.3)])
            sc.ph_eq(2, "4x en tout.", "4 x en tout.", lettres="x",
                     avec=[Circumscribe(VGroup(fig.p["xb"], fig.p["bx"]), color=JAUNE_TITRE, buff=0.03)])
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["Développe (x + 2)²."],
                            [Eq("x² + 4", 34), Eq("x² + 2x + 4", 34), Eq("x² + 4x + 4", 34)], 2,
                            ["Réponse C : x² + 4x + 4.", "Les deux bandes valent 2x chacune :", "4x en tout."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : la formule avec des lettres ────────────────────────────────────
    def ecran_formule(self):
        self.ecran("07-formule")
        tit = self.lg("Avec des lettres :", 0, 3.1, 44, JAUNE_TITRE, maxw=8)
        self.dit(tit, "Avec des lettres :")
        fig = Terrasse(2.0, 0.9, centre=P(-4.1, -0.9))
        cotes = fig.cotes("a", "b", 34, lettres="ab")
        f = D("(a + b)² = a² + 2ab + b²", 66, lettres="ab").move_to(P(0, 2.05))
        self.dire_eq(f, "a plus b, au carré, égale a au carré, plus 2 a b, plus b au carré.", echelle=1.15,
                     avec=[FadeIn(VGroup(fig, cotes)), Create(fig.coupes)])
        eaa = fig.etiquette("xx", "a²", 54, lettres="ab")
        eab1 = fig.etiquette("xb", "ab", 36, lettres="ab")
        eab2 = fig.etiquette("bx", "ab", 36, lettres="ab")
        ebb = fig.etiquette("bb", "b²", 34, lettres="ab")
        l1 = self.lg("Le carré de a,", 2.6, 0.55, 40, lettres="ab", maxw=7)
        self.dit_avec(l1, "Le carré de a,", {idx(l1, "a"): lambda: [
            FadeIn(eaa, scale=1.3), Circumscribe(VGroup(f.atomes[7], f.atomes[8]), color=JAUNE_TITRE, buff=0.06)]})
        l2 = self.lg("les deux rectangles ab,", 2.6, -0.1, 40, lettres="ab", maxw=7)
        self.dit_avec(l2, "les deux rectangles a b,", {idx(l2, "ab"): lambda: [
            FadeIn(eab1, scale=1.3), FadeIn(eab2, scale=1.3),
            Circumscribe(VGroup(f.atomes[10], f.atomes[11]), color=JAUNE_TITRE, buff=0.06)]})
        l3 = self.lg("le carré de b.", 2.6, -0.75, 40, lettres="ab", maxw=7)
        self.dit_avec(l3, "le carré de b.", {idx(l3, "b"): lambda: [
            FadeIn(ebb, scale=1.3), Circumscribe(VGroup(f.atomes[13], f.atomes[14]), color=JAUNE_TITRE, buff=0.06)]})
        l4 = self.lg("Rien de nouveau :", 2.2, -1.65, 40, CIEL, maxw=6)
        self.dit(l4, "Rien de nouveau :")
        l5 = self.lg("c'est la double distributivité,", 2.0, -2.3, 40, JAUNE_TITRE, maxw=5.4)
        self.dit(l5, "c'est la double distributivité,")
        l6 = self.lg("déjà faite.", 2.0, -2.95, 40, JAUNE_TITRE, maxw=6.0)
        self.dit(l6, "déjà faite.")
        self.insister(VGroup(l5, l6), 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au("À toi", Write(tit), rt=0.5)
        fig = Terrasse(2.0, 0.9, centre=P(3.5, 0.15), plein=False)
        fig.p["xx"].set_fill(BLEU_BLOC, 0.9)
        hx, h6, gx, g6 = fig.cotes("x", "6", 34)
        trous = fig.trous(("xb", "bx", "bb"), CIEL)
        l1 = self.lg("Nadia agrandit une autre", -2.9, 1.95, 40, maxw=7)
        self.dit(l1, "Nadia agrandit une autre")
        l2 = self.lg("terrasse carrée,", -2.9, 1.35, 40, maxw=7)
        self.dit(l2, "terrasse carrée,", avec=[FadeIn(fig.p["xx"], scale=0.8)])
        l3 = self.lg("de x mètres de côté :", -2.9, 0.7, 40, lettres="x", maxw=7)
        self.dit_avec(l3, "de x mètres de côté :", {1: lambda: [GrowFromCenter(hx[0]), FadeIn(hx[1]),
                                                                GrowFromCenter(gx[0]), FadeIn(gx[1])]})
        l4 = self.lg("6 mètres de plus dans chaque sens.", -2.9, 0.05, 40, maxw=7.4)
        self.dit_avec(l4, "6 mètres de plus dans chaque sens.", {0: lambda: [
            Create(trous), GrowFromCenter(h6[0]), FadeIn(h6[1]), GrowFromCenter(g6[0]), FadeIn(g6[1])]})
        q1 = self.lg("Quelle est sa nouvelle aire,", -2.9, -0.85, 44, JAUNE_TITRE, maxw=7)
        self.dit(q1, "Quelle est sa nouvelle aire,", avec=[Create(fig.bord)])
        q2 = self.lg("développée ?", -2.9, -1.5, 44, JAUNE_TITRE, maxw=7)
        self.dit(q2, "développée ?")
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-1.0, -2.6))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, textes=VGroup(l1, l2, l3, l4, q1, q2, pz), fig=fig, trous=trous)
        self.attendre_voix(marge=2.0)

    # ── 08b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        fig, trous = d["fig"], d["trous"]
        self.dire("08b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["textes"]), rt=0.4)
        e = D("(x + 6)² = (x + 6)(x + 6)", 50)
        if e.width > 7.2:
            e.scale_to_fit_width(7.2)
        e.move_to(P(-2.75, 1.95))
        self.dire_eq(e, "x plus 6, au carré, c'est x plus 6, fois x plus 6.", echelle=1.15)
        exx = fig.etiquette("xx", "x²", 54)
        e1 = fig.etiquette("xb", "6x", 38)
        e2 = fig.etiquette("bx", "6x", 38)
        ebb = fig.etiquette("bb", "36", 36)
        l1 = self.lg("Le carré x²,", -2.75, 0.95, 42, lettres="x", maxw=7)
        self.dit_avec(l1, "Le carré x au carré,", {idx(l1, "²"): lambda: [FadeIn(exx, scale=1.3)]})
        l2 = self.lg("deux bandes de 6x,", -2.75, 0.3, 42, lettres="x", maxw=7)
        self.dit_avec(l2, "deux bandes de 6 x,", {idx(l2, "6"): lambda: [
            fig.remplir("xb"), fig.remplir("bx"), FadeOut(VGroup(trous[0], trous[1])), FadeIn(e1), FadeIn(e2)]})
        l3 = self.lg("et un coin de 36.", -2.75, -0.35, 42, maxw=7)
        self.dit_avec(l3, "et un coin de 36.", {idx(l3, "36"): lambda: [
            fig.remplir("bb"), FadeOut(trous[2]), FadeIn(ebb)]})
        r = self.lg("L'aire vaut x² + 12x + 36.", -1.9, -2.0, 50, VERT_OK, maxw=8.4)
        self.dit(r, "L'aire vaut x au carré plus 12 x plus 36.")
        self.play(Create(self.cadre_ok(r, 0.16)), run_time=0.2)
        self.insister(r, 1.08, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def finale_gauche(self, textes, figure, fs=40):
        """« Ce que tu as appris » (celle de la factorisation 04) : la figure à gauche, les points à sa droite."""
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.cadrer(figure, gauche=-6.3, droite=-2.7, haut=tit.get_bottom()[1] - 0.5, bas=-2.7)
        self.play(FadeIn(figure), run_time=0.3)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux in textes:
            ts = [self.t(x, fs) for x in morceaux]
            pas = max(t.height for t in ts) + 0.1
            for k, t in enumerate(ts):
                t.align_to(P(0, -k * pas), UP).align_to(P(0, 0), LEFT)
            c = self.coche()
            c.next_to(ts[0], LEFT, buff=0.25).set_y(ts[0].get_center()[1])
            lignes.add(VGroup(c, VGroup(*ts)))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.4)
        xl = figure.get_right()[0] + 0.6
        largeur = 5.0 - xl
        if lignes.width > largeur:
            lignes.scale_to_fit_width(largeur)
        haut = tit.get_bottom()[1] - 0.4
        if lignes.height > haut + 3.2:
            lignes.scale_to_fit_height(haut + 3.2)
        lignes.align_to(P(xl, 0), LEFT).align_to(P(0, haut), UP)
        return lignes

    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        e = D("(x + 4)²", 52, audit=False)
        r = D("= x² + 8x + 16", 44, VERT_OK, audit=False).next_to(e, DOWN, buff=0.3)
        VGroup(r.atomes[4], r.atomes[5]).set_color(BANDE)
        fig = Terrasse(1.6, 0.7)
        cotes = fig.cotes("x", "4", 28)
        ets = VGroup(fig.etiquette("xx", "x²", 44), fig.etiquette("xb", "4x", 30), fig.etiquette("bx", "4x", 30),
                     fig.etiquette("bb", "16", 28))
        carre = VGroup(fig, fig.coupes, cotes, ets).next_to(r, DOWN, buff=0.5)
        figure = VGroup(e, r, carre)
        lignes = self.finale_gauche([["Un carré, c'est une expression", "multipliée par elle-même."],
                                     ["(x + 4)²", "se développe par", "la double distributivité."],
                                     ["Le résultat a trois termes :", "les deux bandes forment", "le double produit."]],
                                    figure)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_architecte()
        self.ecran_carre()
        self.ecran_question1()
        self.ecran_decoupe()
        self.ecran_distributivite()
        self.ecran_reduire()
        self.ecran_verifier()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_formule()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="10-abonne")
