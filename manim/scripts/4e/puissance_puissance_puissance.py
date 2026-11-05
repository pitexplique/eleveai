# puissance_puissance_puissance.py
# EleveAI — Maths 2de — série « Puissances », épisode 09 : LA PUISSANCE D'UNE
# PUISSANCE. Paysage 16:9, AVEC VOIX (pas de short : le short
# « puissances-parenthese » déjà en ligne est gardé).
#   PuissancePuissancePuissance2de « Maths 2de — EleveAI », ceinture VERTE.
#   (la base PuissancePuissancePuissanceBase porte tout ; la sous-classe ne
#   change que l'identité et la ceinture, comme les épisodes communs)
# Micro couverte : 2de `puiss_puissance_puissance` (notion `puissances_2de`) :
#   écran 02 (10²)² = 10² × 10² = 10⁴ (la place quadrillée) ; écran 03
#   (2³)² : le paquet de 3 facteurs recopié 2 fois, la grille 3 × 2 qui se
#   remplit puis se regroupe en 2⁶ ; la règle (aᵐ)ⁿ = aᵐˣⁿ ; écran 04 le
#   piège (2³)² ≠ 2³⁺² (deux colonnes) ; écran 05 un exposant négatif (les
#   sauts sur la droite des exposants) ; défi 4³ = (2²)³ = 2⁶.
# Code couleur constant : BLEU = la base, ORANGE = l'exposant, VERT = résultat
# juste, ROUGE = le piège (on additionne au lieu de multiplier).
#
# Décor et métier : ARCHITECTURE (une architecte dessine une place carrée,
# puis des dalles 2 × 2). Centres : art-design, jeux-defis.
#
# Écrans : garde (00) ; l'architecte et la place (01) ; (10²)² = 10⁴ (02) ;
# (2³)² = 2⁶ et la règle (03) ; QUESTION (5⁴)³ (03q) ; les deux règles (04) ;
# (10⁻³)² = 10⁻⁶ (05) ; QUESTION (3⁻²)⁻¹ (05q) ; défi 4³ (06) et correction
# (06b) ; ce que tu as appris (07) ; fin (08).
#
# Voix : manim/voix/2de-puissance-puissance-puissance.json (validée, débit −6,
# non modifiée), WAV dans public/sons/2de-puissance-puissance-puissance/ ;
# marques : puissance_puissance_puissance_marques.json (marques_dump.ps1, puis
# une copie corrigée de cues2marques.py qui lit les cues doublées PAR PAQUETS :
# « 2 puissance » ×2, « 4 fois » ×4, « 10 000 mètres » ×3 gardent chacun leur
# instant ; scripts/cues2marques.py non modifié).
# Outils : manim/scripts/6e/prop_commun.py, OutilsNotation / puiss / T de
# puissance_notation_scientifique.py et les outils de l'épisode 08
# (puissance_produit_quotient.py), importés, non modifiés.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/puissance_puissance_puissance.py PuissancePuissancePuissance2de
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/puissance_puissance_puissance.py PuissancePuissancePuissance2de -o eleveai-maths-seconde-puissance-puissance-puissance --media_dir manim/scripts/4e/media-puiss-09-seconde
# Sortie : manim/sorties/seconde/maths/puissances/09-puissance-puissance/eleveai-maths-seconde-puissance-puissance-puissance.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from puissance_notation_scientifique import OutilsNotation, T, ligne_base, puiss, sans_audit  # noqa: E402
from puissance_produit_quotient import (  # noqa: E402
    PuissanceProduitQuotientBase, barre, eg, expo2, facteurs, rangee)

BASE_C = BLEU_CALCUL       # la base
EXPO_C = ORANGE_RETENUE    # l'exposant
PIEGE = ROUGE_ERREUR
CIEL = "#93c5fd"
PAVE = "#475569"           # les dalles de la place
ARBRE = "#15803d"


def ppar(b, m, n, fs=72, cb=BASE_C, ce=EXPO_C, audit=True):
    """(bᵐ)ⁿ COMPOSÉ : .po « ( », .base, .m (l'exposant du dedans, .mm le −,
    .mc le chiffre), .pf « ) », .n (l'exposant du dehors, .nm .nc)."""
    inner = puiss(b, m, fs=fs, cb=cb, ce=ce, audit=audit)
    po = T("(", fs * 1.05, WHITE, audit=False)
    pf = T(")", fs * 1.05, WHITE, audit=False)
    po.next_to(inner.base, LEFT, buff=0.05).set_y(inner.base.get_y() + fs * 0.0012)
    pf.next_to(inner, RIGHT, buff=0.05).set_y(po.get_y())
    dehors = puiss(b, n, fs=fs, cb=cb, ce=ce, audit=audit)
    nx = sans_audit(dehors.expo)  # dit « carré », « cube » : posé au mot par le script
    nx.next_to(pf, RIGHT, buff=0.04)
    nx.align_to(inner.expo, DOWN).shift(UP * fs * 0.0025)
    g = VGroup(po, inner.base, inner.expo, pf, nx)
    g.po, g.base, g.m, g.pf, g.n = po, inner.base, inner.expo, pf, nx
    g.mm, g.mc, g.nm, g.nc = inner.moins, inner.chif, dehors.moins, dehors.chif
    g.paren = VGroup(po, pf)
    return g


def expo_fois(b, e1, e2, fs=72):
    """a^(m×n) : la base et l'exposant « m × n » en morceaux .e1 .x .e2."""
    p = puiss(b, f"{e1}×{e2}", fs=fs)
    ch = p.chif
    n1 = len(e1)
    p.e1 = VGroup(*ch.submobjects[:n1])
    p.x = ch.submobjects[n1]
    p.e2 = VGroup(*ch.submobjects[n1 + 1:])
    return p


def architecte(s=1.0):
    """Une architecte : la silhouette, un casque de chantier, une équerre."""
    p = personne(peau="#c68642", tenue="#0f766e", cheveux="#92400e", longs=True, s=s)
    hd = p.get_top()
    casque = VGroup(
        Arc(radius=0.36 * s, start_angle=0, angle=PI, fill_color="#facc15", fill_opacity=1,
            stroke_color="#ca8a04", stroke_width=2),
        Rectangle(width=0.86 * s, height=0.07 * s, fill_color="#ca8a04", fill_opacity=1, stroke_width=0))
    casque[1].next_to(casque[0], DOWN, buff=0)
    casque.next_to(p, UP, buff=-0.16 * s)
    eq = Polygon(P(0, 0), P(0.75, 0), P(0, 0.75), stroke_color="#e2e8f0", stroke_width=4,
                 fill_color="#e2e8f0", fill_opacity=0.15).scale(s)
    eq.next_to(p, RIGHT, buff=-0.1 * s).shift(DOWN * 0.15 * s)
    g = VGroup(p, casque, eq)
    return g


def place(cote=3.4):
    """La place vue d'en haut : le contour, les dalles, la fontaine, 4 arbres.
    .contour .dalles .fontaine .arbres"""
    contour = Square(side_length=cote, stroke_color=WHITE, stroke_width=5)
    k = 10
    a = cote / k
    dalles = VGroup(*[Square(side_length=a * 0.9, stroke_width=0, fill_color=PAVE, fill_opacity=1)
                      .move_to(contour.get_corner(UL) + P(a * (j + 0.5), -a * (i + 0.5)))
                      for i in range(k) for j in range(k)])
    fontaine = VGroup(Circle(radius=0.42, stroke_color=CIEL, stroke_width=4, fill_color="#1e3a8a", fill_opacity=1),
                      Circle(radius=0.16, stroke_width=0, fill_color=CIEL, fill_opacity=1))
    arbres = VGroup(*[Circle(radius=0.2, stroke_color="#bbf7d0", stroke_width=3, fill_color=ARBRE, fill_opacity=1)
                      .move_to(contour.get_corner(c) + (-c) * 0.38) for c in (UL, UR, DL, DR)])
    g = VGroup(dalles, contour, fontaine, arbres)
    g.contour, g.dalles, g.fontaine, g.arbres, g.a = contour, dalles, fontaine, arbres, a
    return g


def paquet(m, b, fs=50, c=BASE_C):
    """Un PAQUET de m facteurs b (« 2 × 2 × 2 ») dans son cadre : .f .cadre"""
    f = facteurs(m, b, fs=fs, c=c)
    cadre = SurroundingRectangle(f, buff=0.14, corner_radius=0.12, color=EXPO_C, stroke_width=3)
    g = VGroup(cadre, f)
    g.f, g.cadre = f, cadre
    return g


def ligne_seule(*ms, buff=0.25):
    """rangee() des épisodes : le = au milieu des chiffres, les puissances
    (simples ou parenthésées) sur la même ligne de base."""
    return rangee(*ms, buff=buff)


class PuissancePuissancePuissanceBase(OutilsNotation, PaysageProp):
    nom_voix = "2de-puissance-puissance-puissance"
    fichier_marques = "puissance_puissance_puissance_marques.json"
    identite = "Maths 2de — EleveAI"
    ceinture = "verte"

    poser_idx = PuissanceProduitQuotientBase.poser_idx
    accolade = PuissanceProduitQuotientBase.accolade

    X_MARGO = 5.15  # la colonne des réponses s'arrête avant Ti-Margo
    FS_REP = 28  # UNE seule taille pour toute l'explication d'une question

    def pp(self, p, mots, rt=0.3, avec_n=()):
        """(bᵐ)ⁿ posé au mot : mots = (base, exposant du dedans, parenthèses,
        exposant du dehors) ; un exposant négatif : (moins, chiffre)."""
        mb, mm, mpar, mn = mots
        self.au(mb, FadeIn(p.base, scale=1.3), rt=rt)
        if isinstance(mm, tuple):
            self.au(mm[0], FadeIn(p.mm, scale=1.8), rt=0.2)
            self.au(mm[1], FadeIn(p.mc, scale=1.6), rt=rt)
        else:
            self.au(mm, FadeIn(p.m, scale=1.6), rt=rt)
        self.au(mpar, FadeIn(p.po, shift=RIGHT * 0.15), FadeIn(p.pf, shift=LEFT * 0.15), rt=rt)
        if isinstance(mn, tuple):
            self.au(mn[0], FadeIn(p.nm, scale=1.8), rt=0.2)
            self.au(mn[1], FadeIn(p.nc, scale=1.6), *avec_n, rt=rt)
        else:
            self.au(mn, FadeIn(p.n, scale=1.6), *avec_n, rt=rt)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La puissance d'une puissance", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        sans_audit(ident)  # « Maths 2de » : l'identité, jamais dite
        self.au("La puissance", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.8)
        a = ppar(2, 3, 2, fs=88)
        qa = T("?", 70, EXPO_C, audit=False)
        l1 = rangee(a, qa, buff=0.45).move_to(P(-0.6, 0.95))
        c, d = puiss(2, 5, fs=80), puiss(2, 6, fs=80)
        ou = T("ou", 50)
        qm = T("?", 64, EXPO_C, audit=False)
        l2 = rangee(c, ou, d, qm, buff=0.5).move_to(P(-0.6, -0.55))
        self.pp(a, ("2 puissance", "3,", "le tout", "carré"))
        self.play(FadeIn(qa, scale=1.4), run_time=0.25)
        self.au("2 puissance", FadeIn(c.base, scale=1.3), rt=0.3)
        self.au("5,", FadeIn(c.expo, scale=1.6), rt=0.3)
        self.au("ou", FadeIn(ou), rt=0.2)
        self.au("2 puissance", FadeIn(d.base, scale=1.3), rt=0.3)
        self.au("6 ?", FadeIn(d.expo, scale=1.6), FadeIn(qm, scale=1.4), rt=0.35)
        self.insister(c.expo, 1.6, 0.2, about=c.expo.get_center())
        self.insister(d.expo, 1.6, 0.2, about=d.expo.get_center())
        self.attendre_voix(marge=0.6)

    # ── 01 : l'architecte et sa place carrée ───────────────────────────────
    def ecran_architecte(self):
        self.ecran("01-architecte")
        ar = architecte(0.75).move_to(P(-5.5, -1.55))
        met = T("architecte", 30, CIEL).next_to(ar, UP, buff=0.2)
        pl = place(3.6).move_to(P(-2.0, 0.45))
        self.au("Une architecte", FadeIn(ar, shift=UP * 0.3), FadeIn(met, shift=UP * 0.1), rt=0.45)
        self.au("dessine", Create(pl.contour), rt=0.6)
        self.au("place", LaggedStart(*[FadeIn(d, scale=0.6) for d in pl.dalles], lag_ratio=0.01),
                FadeIn(pl.fontaine, scale=0.5), rt=0.8)
        self.play(LaggedStart(*[GrowFromCenter(a) for a in pl.arbres], lag_ratio=0.2), run_time=0.45)
        # la cote du côté, en haut
        y = pl.contour.get_top()[1] + 0.32
        xa, xb = pl.contour.get_left()[0], pl.contour.get_right()[0]
        fl = DoubleArrow(P(xa, y), P(xb, y), buff=0, color=WHITE, stroke_width=3, tip_length=0.16)
        c10 = puiss(10, 2, fs=40)
        cm = T("mètres", 30)
        cote = rangee(c10, cm, buff=0.15).next_to(fl, UP, buff=0.1)
        cm.align_to(c10.base, DOWN)
        self.au("Chaque", Create(fl), Indicate(pl.contour, color=EXPO_C, scale_factor=1.02), rt=0.4)
        self.au("10 puissance", FadeIn(c10.base, scale=1.3), rt=0.3)
        self.au("2 mètres", FadeIn(c10.expo, scale=1.6), FadeIn(cm, shift=LEFT * 0.1), rt=0.3)
        cent = VGroup(T("= 100", 34, WHITE), T("mètres", 30)).arrange(RIGHT, buff=0.15)
        cent.next_to(cote, RIGHT, buff=0.25)
        cent[0].align_to(cm, DOWN)
        cent[1].align_to(cm, DOWN)
        self.au("100 mètres", FadeIn(cent[0], scale=1.3), rt=0.3)
        self.au("mètres.", FadeIn(cent[1], shift=LEFT * 0.1), rt=0.25)
        self.insister(cent[0], 1.35, 0.2)
        # l'aire : la place se remplit rangée par rangée
        X = 1.0  # le bord gauche de la colonne de droite
        l_aire = VGroup(T("aire", 38, VERT_OK), T("=", 38), T("côté", 38), T("²", 38, EXPO_C, audit=False))
        l_aire.arrange(RIGHT, buff=0.18).move_to(P(0, 1.25)).align_to(P(X, 0), LEFT)
        l_aire[3].next_to(l_aire[2], UR, buff=0.02).shift(DOWN * 0.18)
        self.au("Son aire", FadeIn(l_aire[0], shift=UP * 0.12),
                LaggedStart(*[pl.dalles[10 * i:10 * i + 10].animate.set_fill(VERT_OK, 0.85) for i in range(10)],
                            lag_ratio=0.15), rt=1.0)
        self.au("le côté", FadeIn(l_aire[1]), FadeIn(l_aire[2], shift=UP * 0.12),
                Indicate(VGroup(fl, cote), color=EXPO_C, scale_factor=1.08), rt=0.35)
        self.au("carré :", FadeIn(l_aire[3], scale=1.6), rt=0.3)
        f = ppar(10, 2, 2, fs=64)
        lf = f.move_to(P(0, -0.05)).align_to(P(X, 0), LEFT)
        self.pp(f, ("10 puissance", "2,", "le tout", "carré."))
        self.play(Indicate(f.paren, color=WHITE, scale_factor=1.3), run_time=0.35)
        q = VGroup(T("Combien de", 34), T("mètres carrés", 34), T("?", 44, EXPO_C, audit=False))
        q.arrange(RIGHT, buff=0.18)
        q[0].next_to(lf, DOWN, buff=0.55).align_to(lf, LEFT)
        q[1].next_to(q[0], DOWN, buff=0.14).align_to(q[0], LEFT)
        q[2].next_to(q[1], RIGHT, buff=0.18)
        self.au("Combien", FadeIn(q[0], shift=UP * 0.12), rt=0.3)
        self.au("mètres carrés", FadeIn(q[1], shift=UP * 0.12), FadeIn(q[2], scale=1.5), rt=0.35)
        self.insister(q[2], 1.5, 0.2, about=q[2].get_center())
        self.attendre_voix(marge=0.4)

    # ── 02 : (10²)² = 10² × 10² = 10⁴ = 10 000 m² ──────────────────────────
    def cotes(self, pl, fs=32):
        """Les deux cotes de la place : en haut et à gauche, « 10² » chacune."""
        c = pl.contour
        y = c.get_top()[1] + 0.28
        fh = DoubleArrow(P(c.get_left()[0], y), P(c.get_right()[0], y), buff=0, color=WHITE, stroke_width=3,
                         tip_length=0.14)
        x = c.get_left()[0] - 0.28
        fg = DoubleArrow(P(x, c.get_bottom()[1]), P(x, c.get_top()[1]), buff=0, color=WHITE, stroke_width=3,
                         tip_length=0.14)
        ph = sans_audit(puiss(10, 2, fs=fs)).next_to(fh, UP, buff=0.08)
        pg = sans_audit(puiss(10, 2, fs=fs)).next_to(fg, LEFT, buff=0.1)
        return fh, fg, ph, pg

    def ecran_decomposer(self):
        self.ecran("02-decomposer")
        pl = place(2.2).move_to(P(-4.4, 0.35))
        fh, fg, ph, pg = self.cotes(pl)
        self.add(pl, fh, fg, ph, pg)
        f = ppar(10, 2, 2, fs=76)  # 76 : le « 10 » est bien serré à cette taille (72 l'écarte)
        e1 = eg(60)
        A, B = puiss(10, 2, fs=76), puiss(10, 2, fs=76)
        x = T("×", 60, WHITE, audit=False)
        XC = -2.5  # le bord gauche de la colonne
        rangee(f, e1, A, x, B, buff=0.3).move_to(P(0, 2.35)).align_to(P(XC, 0), LEFT)
        self.pp(f, ("10 puissance", "2,", "le tout", "carré,"))
        self.au("c'est", FadeIn(e1), rt=0.25)
        self.au("10 puissance", FadeIn(A.base, scale=1.3), Indicate(VGroup(fh, ph), color=EXPO_C), rt=0.35)
        self.au("2 fois", TransformFromCopy(ph.expo, A.expo), FadeIn(x), rt=0.35)
        self.au("10 puissance", FadeIn(B.base, scale=1.3), Indicate(VGroup(fg, pg), color=EXPO_C), rt=0.35)
        self.au("2.", TransformFromCopy(pg.expo, B.expo), rt=0.35)
        oa = T("On additionne :", 38).move_to(P(0, 0.95)).align_to(P(XC, 0), LEFT)
        s1, pl_, s2, egs, s4 = (T("2", 46, EXPO_C), T("+", 42, WHITE), T("2", 46, EXPO_C), T("=", 42, WHITE),
                                T("4", 50, EXPO_C))
        cal = VGroup(s1, pl_, s2, egs, s4).arrange(RIGHT, buff=0.18).next_to(oa, RIGHT, buff=0.35)
        self.au("On additionne", FadeIn(oa, shift=RIGHT * 0.2), rt=0.35)
        self.au("2 plus", TransformFromCopy(A.expo, s1), FadeIn(pl_), rt=0.4)
        self.au("2,", TransformFromCopy(B.expo, s2), rt=0.4)
        self.au("4.", FadeIn(egs), FadeIn(s4, scale=1.8), rt=0.35)
        e2 = eg(60)
        r = puiss(10, 4, fs=76)
        e3 = eg(60)
        dm = sans_audit(T("10 000", 60, VERT_OK))  # posé au mot ; « 10 000 » lu en deux morceaux
        l3 = rangee(e2, r, e3, dm, buff=0.3).move_to(P(0, -0.45)).align_to(P(XC, 0), LEFT)
        dm.shift(RIGHT * 0.2)  # son cadre viendra : loin du =
        mc = T("mètres carrés", 36, VERT_OK).next_to(dm, DOWN, buff=0.2).align_to(dm, LEFT)
        self.au("10 puissance", FadeIn(e2), FadeIn(r.base, scale=1.3), rt=0.3)
        self.au("4 :", ReplacementTransform(s4.copy(), r.expo), rt=0.4)
        self.au("10 000", FadeIn(e3), FadeIn(dm, scale=1.3),
                LaggedStart(*[pl.dalles[10 * i:10 * i + 10].animate.set_fill(VERT_OK, 0.85) for i in range(10)],
                            lag_ratio=0.12), rt=0.9)
        self.au("carrés.", FadeIn(mc, shift=UP * 0.12), rt=0.3)
        cad = self.encadrer(VGroup(dm, mc), buff=0.18)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(dm, mc, cad), 1.15, 0.25)
        self.attendre_voix(marge=0.4)

    # ── 03 : (2³)² : le paquet de trois facteurs recopié deux fois → 2⁶ ────
    def regle_pp(self, y, x=-1.0, fs=72):
        """(aᵐ)ⁿ = aᵐˣⁿ, renvoyée (.p .eg .r) ; posée par regle_au_mot()."""
        p = ppar("a", "m", "n", fs=fs)
        e = eg(fs * 0.85)
        r = expo_fois("a", "m", "n", fs=fs)
        g = rangee(p, e, r, buff=0.35).move_to(P(x, y))
        g.p, g.eg, g.r = p, e, r
        return g

    def regle_au_mot(self, rg):
        self.pp(rg.p, ("a puissance", "m,", "le tout", "n,"))
        self.au("égale", FadeIn(rg.eg), rt=0.2)
        self.au("a puissance", FadeIn(rg.r.base, scale=1.3), rt=0.3)
        self.au("m fois", FadeIn(rg.r.e1, scale=1.6), rt=0.2)
        self.au("fois", FadeIn(rg.r.x, scale=1.6), rt=0.2)
        self.au("n.", FadeIn(rg.r.e2, scale=1.6), rt=0.2)
        cad = self.encadrer(rg, buff=0.22)
        self.play(Create(cad), run_time=0.3)
        return cad

    def ecran_regle(self):
        self.ecran("03-regle")
        f = ppar(2, 3, 2, fs=76)
        A, B, R = puiss(2, 3, fs=72), puiss(2, 3, fs=72), puiss(2, 6, fs=76)
        e1, x, e2 = eg(60), T("×", 58, WHITE, audit=False), eg(60)
        rangee(f, e1, A, x, B, e2, R, buff=0.3).move_to(P(-1.0, 2.85))
        self.pp(f, ("2 puissance", "3,", "le tout", "carré :"))
        # deux PAQUETS de trois facteurs : la grille 3 × 2
        p1, p2 = paquet(3, 2), paquet(3, 2)
        p1.move_to(P(-3.3, 0.9))
        p2.move_to(P(-3.3, -0.05))
        self.au("2 puissance", FadeIn(e1), FadeIn(A.base, scale=1.3), rt=0.3)
        self.au("3 fois", FadeIn(A.expo, scale=1.6), FadeIn(x), TransformFromCopy(A, p1.f), Create(p1.cadre), rt=0.5)
        self.au("2 puissance", FadeIn(B.base, scale=1.3), rt=0.3)
        self.au("3,", FadeIn(B.expo, scale=1.6), TransformFromCopy(p1, p2), rt=0.55)
        tous = VGroup(*p1.f.f, *p2.f.f)
        cpt = self.compteurs2(p1, p2, fs=26)
        self.au("2 puissance", FadeIn(e2), FadeIn(R.base, scale=1.3),
                LaggedStart(*[FadeIn(c, scale=1.5) for c in cpt], lag_ratio=0.2), rt=0.7)
        self.au("6.", FadeIn(R.expo, scale=1.6), Indicate(cpt[5], color=EXPO_C, scale_factor=1.6), rt=0.4)
        self.insister(R.expo, 1.6, 0.2, about=R.expo.get_center())
        self.play(FadeOut(cpt), run_time=0.25)
        # l'exposant 3 pris deux fois
        acc3 = Brace(p1, UP, buff=0.08, color=EXPO_C)
        l3 = T("3", 34, EXPO_C).next_to(acc3, UP, buff=0.06)
        accn = Brace(VGroup(p1, p2), RIGHT, buff=0.12, color=EXPO_C)
        ln = T("deux fois", 32, EXPO_C).next_to(accn, RIGHT, buff=0.12)
        self.au("L'exposant", Indicate(f.m, color=EXPO_C, scale_factor=1.8), rt=0.4)
        self.au("3 est", FadeIn(acc3), FadeIn(l3, scale=1.4), rt=0.35)
        self.au("deux fois", FadeIn(accn), FadeIn(ln, shift=LEFT * 0.12), Indicate(f.n, color=EXPO_C, scale_factor=1.8),
                rt=0.4)
        c3, cx, c2, ce, c6 = T("3", 48, EXPO_C), T("×", 42), T("2", 48, EXPO_C), T("=", 42), T("6", 54, VERT_OK)
        cal = VGroup(c3, cx, c2, ce, c6).arrange(RIGHT, buff=0.2).move_to(P(2.9, 0.5))
        self.au("3 fois", TransformFromCopy(l3, c3), FadeIn(cx), rt=0.35)
        self.au("2,", FadeIn(c2, scale=1.4), rt=0.3)
        self.au("6.", FadeIn(ce), FadeIn(c6, scale=1.8), rt=0.3)
        tr = T("La règle :", 38, JAUNE_TITRE).move_to(P(0, -1.35)).align_to(P(-6.0, 0), LEFT)
        self.au("La règle", FadeIn(tr, shift=RIGHT * 0.2), rt=0.35)
        rg = self.regle_pp(-1.35, x=0.6, fs=70)
        cad = self.regle_au_mot(rg)
        ic = VGroup(T("Ici,", 38), T("on multiplie", 38, VERT_OK), T("les exposants.", 38))
        ic.arrange(RIGHT, buff=0.2).move_to(P(0, -2.75)).align_to(P(-6.0, 0), LEFT)
        self.au("Ici", FadeIn(ic[0], shift=UP * 0.12), rt=0.25)
        self.au("on multiplie", FadeIn(ic[1], shift=UP * 0.12), rt=0.3)
        self.au("exposants", FadeIn(ic[2], shift=UP * 0.12), rt=0.3)
        self.play(Indicate(rg.r.expo, color=EXPO_C, scale_factor=1.2), run_time=0.4)
        self.attendre_voix(marge=0.4)

    # ── outils des questions-pauses ─────────────────────────────────────────
    SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ˣ"

    def poser_glyphes(self, t, plan, rt=0.25, avec=None):
        """Un Text posé glyphe par glyphe : plan = [([indices des glyphes non
        blancs], extrait de la voix)] (la parenthèse au « le tout »)."""
        for j, (idx, ex) in enumerate(plan):
            pc = VGroup(*[t.submobjects[k] for k in idx])
            self.au(ex, FadeIn(pc, shift=UP * 0.12), *((avec or {}).get(j, [])), rt=rt)

    def rep_l(self, i, morceaux, c=VERT_OK):
        """La ligne i de l'explication : des morceaux (« Réponse B : », « 5 »,
        « ¹². ») TOUS à la taille FS_REP, posés au mot par le script, la ligne
        CENTRÉE dans la colonne des cartes, à la hauteur de la ligne i."""
        items = []
        for m in morceaux:
            cc = c
            if isinstance(m, tuple):
                m, cc = m
            items.append(T(m, self.FS_REP, cc))
        lg = VGroup(*items)
        sup = [it.original_text[0] in self.SUP for it in items]
        for k, it in enumerate(items):
            if k:
                it.next_to(items[k - 1], RIGHT, buff=0.03 if sup[k] else 0.16)
        ligne_base(VGroup(*[it for it, s in zip(items, sup) if not s]))
        for k, it in enumerate(items):
            if sup[k]:
                it.align_to(items[k - 1], UP).shift(UP * 0.04)
        gx, dx = self.cartes_q.get_left()[0], min(self.cartes_q.get_right()[0], self.X_MARGO)
        lg.move_to(P((gx + dx) / 2, self.cartes_q.get_bottom()[1] - 0.45 - 0.48 * i))
        for f in lg.get_family():
            f.sans_synchro = True
        if lg.get_right()[0] > self.X_MARGO or lg.get_left()[0] < gx - 0.05:
            print(f"LARGE {morceaux} : {lg.get_left()[0]:.2f} → {lg.get_right()[0]:.2f}", flush=True)
        return lg

    def montrer(self, lg, plan, rt=0.25):
        """Pose les morceaux de la ligne : plan = [(extrait, [indices], [animations])]."""
        for ex, idx, anims in plan:
            self.au(ex, *[FadeIn(lg[k], shift=UP * 0.12) for k in idx], *anims, rt=rt)

    # ── 03q : QUESTION 1 ((5⁴)³) ────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = ppar(5, 4, 3, fs=100).move_to(P(-3.9, 1.75))
        r = expo_fois(5, "4", "3", fs=80)
        sans_audit(r.base)  # le 5 dit juste avant
        bon = sans_audit(puiss(5, 12, fs=80, cb=VERT_OK, ce=VERT_OK))
        e1, e2 = eg(64), eg(64)
        rangee(e1, r, e2, bon, buff=0.3).move_to(P(-3.7, 0.05))
        faux = puiss(5, 7, fs=72, cb=PIEGE, ce=PIEGE).move_to(P(-5.2, -1.65))
        nb = VGroup(T("règle du produit :", 30, PIEGE), T("le piège.", 30, PIEGE)).arrange(DOWN, buff=0.1,
                                                                                           aligned_edge=LEFT)
        nb.next_to(faux, RIGHT, buff=0.45)
        choix = [puiss(5, 7, fs=44), puiss(5, 12, fs=44), puiss(15, 4, fs=44)]
        plans = [[("5 puissance", [choix[0].base]), ("7.", [choix[0].expo])],
                 [("5 puissance", [choix[1].base]), ("12.", [choix[1].expo])],
                 [("15 puissance", [choix[2].base]), ("4.", [choix[2].expo])]]

        def avant(sc, q):
            sc.poser_glyphes(q[0], [([1], "5 puissance"), ([2], "4,"), ([0, 3], "le tout"), ([4, 5], "cube")],
                             avec={0: [FadeIn(f.base, scale=1.3)], 1: [FadeIn(f.m, scale=1.6)],
                                   2: [FadeIn(f.paren)], 3: [FadeIn(f.n, scale=1.6)]})

        def apres(sc):
            l0 = sc.rep_l(0, ["Réponse B :", "5", "¹²."])
            sc.montrer(l0, [("B", [0], []), ("5 puissance", [1], []),
                            ("12.", [2], [FadeIn(e2), FadeIn(bon, scale=1.3)])])
            l1 = sc.rep_l(1, ["Puissance d'une"])
            sc.montrer(l1, [("Puissance d'une", [0], [Indicate(f.paren, color=WHITE, scale_factor=1.3)])])
            l1b = sc.rep_l(2, ["puissance :"])
            sc.montrer(l1b, [("puissance :", [0], [])])
            l2 = sc.rep_l(3, ["4 ×", "3 =", "12."])
            sc.montrer(l2, [("4 fois", [0], [FadeIn(e1), FadeIn(r.base, scale=1.3), TransformFromCopy(f.m, r.e1),
                                             FadeIn(r.x)]),
                            ("3,", [1], [TransformFromCopy(f.n, r.e2)]),
                            ("12.", [2], [Indicate(bon.expo, color=VERT_OK, scale_factor=1.6)])], rt=0.35)
            sc.pieges(0)
            sc.au("5 puissance", FadeIn(faux.base, scale=1.3), rt=0.3)
            sc.au("7,", FadeIn(faux.expo, scale=1.5), rt=0.3)
            sc.au("règle", FadeIn(nb[0], shift=UP * 0.1), rt=0.3)
            sc.au("piège", FadeIn(nb[1], shift=UP * 0.1), rt=0.3)
            sc.play(Create(barre(faux, WHITE)), run_time=0.25)

        self.qpause("03q-question", "03r-reponse", ["(5⁴)³ ?"], choix, plans, 1,
                    ["Réponse B : 5¹².", "Puissance d'une", "puissance :", "4 × 3 = 12."], avant=avant, apres=apres)

    # ── 04 : les deux règles, côte à côte ──────────────────────────────────
    def carte(self, x0, x1, y0=2.8, y1=-3.1, c=CIEL):
        r = RoundedRectangle(width=x1 - x0, height=y0 - y1, corner_radius=0.2, stroke_color=c, stroke_width=3,
                             fill_color="#0b1220", fill_opacity=1)
        return r.move_to(P((x0 + x1) / 2, (y0 + y1) / 2))

    def compteurs2(self, p1, p2, fs=24):
        """Les compteurs 1…6 de deux paquets : au-dessus du 1er, sous le 2e."""
        h = [T(str(k + 1), fs, EXPO_C, audit=False).next_to(m, UP, buff=0.0).set_y(p1.cadre.get_top()[1] + 0.2)
             .set_x(m.get_x()) for k, m in enumerate(p1.f.f)]
        b = [T(str(k + 4), fs, EXPO_C, audit=False).set_y(p2.cadre.get_bottom()[1] - 0.2).set_x(m.get_x())
             for k, m in enumerate(p2.f.f)]
        return VGroup(*h, *b)

    def compteurs(self, ms, fs=26):
        return VGroup(*[T(str(k + 1), fs, EXPO_C, audit=False).next_to(m, UP, buff=0.1) for k, m in enumerate(ms)])

    def ecran_deux_regles(self):
        self.ecran("04-deux-regles")
        tit = T("Ne confonds pas les deux règles", 40, JAUNE_TITRE).move_to(P(-0.6, 3.22))
        self.au("Ne confonds", Write(tit), rt=0.6)
        XL, XR = -3.65, 2.22
        cg, cd = self.carte(-6.35, -0.95), self.carte(-0.55, 5.0)
        self.play(FadeIn(cg), FadeIn(cd), run_time=0.3)
        # à gauche : le produit 2³ × 2² = 2⁵
        A, B = puiss(2, 3, fs=70), puiss(2, 2, fs=70)
        x = T("×", 56, WHITE, audit=False)
        rangee(A, x, B, buff=0.3).move_to(P(XL, 1.6))
        self.au("2 puissance", FadeIn(A.base, scale=1.3), rt=0.3)
        self.au("3 fois", FadeIn(A.expo, scale=1.6), FadeIn(x), rt=0.3)
        self.au("2 puissance", FadeIn(B.base, scale=1.3), rt=0.3)
        self.au("2 :", FadeIn(B.expo, scale=1.6), rt=0.3)
        row = facteurs(5, 2, fs=46).move_to(P(XL, 0.15))
        G, D, mil = VGroup(*row[:5]), VGroup(*row[6:]), row[5]
        G.shift(LEFT * 0.4)
        D.shift(RIGHT * 0.4)
        hg = T("un produit", 25, CIEL).move_to(P(XL, 2.4))
        self.au("un produit", FadeIn(hg, shift=DOWN * 0.12), TransformFromCopy(A, G), TransformFromCopy(B, D), rt=0.6)
        og = T("on additionne", 34, VERT_OK).move_to(P(XL, -1.5))
        cg5 = self.compteurs(row.f)
        self.au("on additionne", FadeIn(og, shift=UP * 0.12), G.animate.shift(RIGHT * 0.4),
                D.animate.shift(LEFT * 0.4), FadeIn(mil, scale=1.5), rt=0.45)
        self.play(LaggedStart(*[FadeIn(c, scale=1.5) for c in cg5], lag_ratio=0.2), run_time=0.5)
        rg = rangee(eg(56), puiss(2, 5, fs=72, cb=VERT_OK, ce=VERT_OK), buff=0.3).move_to(P(XL, -2.35))
        self.au("2 puissance", FadeIn(rg[0]), FadeIn(rg[1].base, scale=1.3), rt=0.3)
        self.au("5.", FadeIn(rg[1].expo, scale=1.6), Indicate(cg5[4], color=EXPO_C, scale_factor=1.6), rt=0.4)
        self.insister(rg[1].expo, 1.6, 0.2, about=rg[1].expo.get_center())
        # à droite : la puissance de puissance (2³)² = 2⁶
        f = ppar(2, 3, 2, fs=70).move_to(P(XR, 1.6))
        self.pp(f, ("2 puissance", "3,", "le tout", "carré :"))
        p1, p2 = paquet(3, 2, fs=42), paquet(3, 2, fs=42)
        p1.move_to(P(XR, 0.45))
        p2.move_to(P(XR, -0.4))
        hd = T("une puissance de puissance", 25, CIEL).move_to(P(XR, 2.4))
        if hd.width > cd.width - 0.5:
            print(f"LARGE titre de carte : {hd.width:.2f}", flush=True)
        self.au("une puissance", FadeIn(hd, shift=DOWN * 0.12), TransformFromCopy(f, p1.f), Create(p1.cadre), rt=0.5)
        self.au("de puissance", TransformFromCopy(p1, p2), rt=0.45)
        od = T("on multiplie", 34, VERT_OK).move_to(P(XR, -1.5))
        cd6 = self.compteurs2(p1, p2)
        self.au("on multiplie", FadeIn(od, shift=UP * 0.12),
                LaggedStart(*[FadeIn(c, scale=1.5) for c in cd6], lag_ratio=0.15), rt=0.6)
        rd = rangee(eg(56), puiss(2, 6, fs=72, cb=VERT_OK, ce=VERT_OK), buff=0.3).move_to(P(XR - 0.95, -2.35))
        self.au("2 puissance", FadeIn(rd[0]), FadeIn(rd[1].base, scale=1.3), rt=0.3)
        self.au("6.", FadeIn(rd[1].expo, scale=1.6), Indicate(cd6[5], color=EXPO_C, scale_factor=1.6), rt=0.4)
        self.insister(rd[1].expo, 1.6, 0.2, about=rd[1].expo.get_center())
        # le piège : (2³)² n'est pas 2⁵
        ne = sans_audit(VGroup(T("≠", 52, PIEGE), puiss(2, 5, fs=60, cb=PIEGE, ce=PIEGE)).arrange(RIGHT, buff=0.2))
        ne.next_to(rd, RIGHT, buff=0.45)
        ne[0].set_y(rd[0].get_y())
        self.play(TransformFromCopy(rg[1], ne[1]), FadeIn(ne[0], scale=1.4), run_time=0.5)
        self.insister(ne, 1.3, 0.25)
        self.attendre_voix(marge=0.4)

    # ── 05 : (10⁻³)² = 10⁻⁶ : deux sauts de −3 sur la droite des exposants ─
    def ecran_negatif(self):
        self.ecran("05-negatif")
        tit = VGroup(T("Avec un exposant négatif,", 40, JAUNE_TITRE), T("c'est pareil.", 40, JAUNE_TITRE))
        tit.arrange(RIGHT, buff=0.22).move_to(P(-0.6, 3.15))
        self.au("Avec", FadeIn(tit[0], shift=DOWN * 0.15), rt=0.35)
        self.au("c'est", FadeIn(tit[1], shift=DOWN * 0.15), rt=0.35)
        f = ppar(10, "−3", 2, fs=76)
        e1 = eg(64)
        R = puiss(10, "−6", fs=76, cb=VERT_OK, ce=VERT_OK)
        sans_audit(R.base)  # le 10 redit juste avant
        rangee(f, e1, R, buff=0.35).move_to(P(-3.0, 1.75))
        self.pp(f, ("10 puissance", ("moins", "3,"), "le tout", "carré :"))
        # la droite des exposants, de −6 à 0
        pas = 1.15
        x0 = 2.6  # l'abscisse du 0
        ax = Line(P(x0 - 6 * pas - 0.35, -0.6), P(x0 + 0.45, -0.6), color=WHITE, stroke_width=3)
        tk = VGroup(*[Line(P(x0 - k * pas, -0.72), P(x0 - k * pas, -0.48), color=WHITE, stroke_width=3)
                      for k in range(7)])
        z = T("0", 32, audit=False).next_to(tk[0], DOWN, buff=0.15)
        pt = Dot(P(x0, -0.6), radius=0.11, color=EXPO_C)
        self.play(Create(ax), FadeIn(tk), FadeIn(z), FadeIn(pt, scale=1.5), run_time=0.45)
        m3 = T("−3", 32, EXPO_C).next_to(tk[3], DOWN, buff=0.15)
        m6 = T("−6", 34, VERT_OK).next_to(tk[6], DOWN, buff=0.15)
        arcs = [ArcBetweenPoints(P(x0 - 3 * k * pas, -0.42), P(x0 - 3 * (k + 1) * pas, -0.42), angle=PI * 0.55,
                                 color=EXPO_C, stroke_width=5) for k in range(2)]
        for a in arcs:
            a.add_tip(tip_length=0.18)
        c1, cx, c2, ce, c6 = (T("−3", 54, EXPO_C), T("×", 46), T("2", 54, EXPO_C), T("=", 46),
                              T("−6", 58, VERT_OK))
        cal = VGroup(c1, cx, c2, ce, c6).arrange(RIGHT, buff=0.22).move_to(P(3.1, 1.75))
        self.au("3 fois", TransformFromCopy(VGroup(f.m), c1), FadeIn(cx), Create(arcs[0]),
                pt.animate.move_to(P(x0 - 3 * pas, -0.6)), FadeIn(m3, scale=1.3), rt=0.6)
        self.au("2,", FadeIn(c2, scale=1.4), Indicate(f.n, color=EXPO_C, scale_factor=1.5), Create(arcs[1]), pt.animate.move_to(P(x0 - 6 * pas, -0.6)),
                rt=0.6)
        self.au("6.", FadeIn(ce), FadeIn(c6, scale=1.4), FadeIn(m6, scale=1.4),
                pt.animate.set_color(VERT_OK), rt=0.4)
        self.insister(c6, 1.5, 0.2, about=c6.get_center())
        self.au("10 puissance", FadeIn(e1), FadeIn(R.base, scale=1.3), rt=0.3)
        self.au("moins", FadeIn(R.moins, scale=1.8), rt=0.2)
        self.au("6.", FadeIn(R.chif, scale=1.6), Indicate(c6, color=VERT_OK, scale_factor=1.2), rt=0.4)
        cad = self.encadrer(VGroup(f, e1, R), buff=0.2)
        self.play(Create(cad), run_time=0.3)
        self.insister(R, 1.3, 0.25)
        self.attendre_voix(marge=0.4)

    # ── 05q : QUESTION 2 ((3⁻²)⁻¹) ──────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = ppar(3, "−2", "−1", fs=100).move_to(P(-3.9, 1.75))
        bon = sans_audit(puiss(3, 2, fs=84, cb=VERT_OK, ce=VERT_OK))
        e1 = eg(64)
        rangee(e1, bon, buff=0.3).move_to(P(-3.9, 0.1))
        c1, cx, c2, ce, c3 = (T("(−2)", 50, EXPO_C), T("×", 44), T("(−1)", 50, EXPO_C), T("=", 44),
                              T("+2", 56, VERT_OK))
        cal = VGroup(c1, cx, c2, ce, c3).arrange(RIGHT, buff=0.2).move_to(P(-3.55, -1.5))
        choix = [puiss(3, 2, fs=44), puiss(3, "−3", fs=44), puiss(3, "−2", fs=44)]
        plans = [[("3 puissance", [choix[0].base]), ("2.", [choix[0].expo])],
                 [("3 puissance", [choix[1].base]), ("moins", [choix[1].moins]), ("3.", [choix[1].chif])],
                 [("3 puissance", [choix[2].base]), ("moins", [choix[2].moins]), ("2.", [choix[2].chif])]]

        def avant(sc, q):
            sc.poser_glyphes(q[0], [([1], "3 puissance"), ([2], "moins"), ([3], "2,"), ([0, 4], "le tout"),
                                    ([5], "moins"), ([6, 7], "1 ?")],
                             avec={0: [FadeIn(f.base, scale=1.3)], 1: [FadeIn(f.mm, scale=1.8)],
                                   2: [FadeIn(f.mc, scale=1.6)], 3: [FadeIn(f.paren)],
                                   4: [FadeIn(f.nm, scale=1.8)], 5: [FadeIn(f.nc, scale=1.6)]})

        def apres(sc):
            l0 = sc.rep_l(0, ["Réponse A :", "3", "²."])
            sc.montrer(l0, [("A", [0], []), ("3 puissance", [1], []),
                            ("2.", [2], [FadeIn(e1), FadeIn(bon, scale=1.3)])])
            sc.pieges(1, 2)
            l1 = sc.rep_l(1, ["(−2) ×", "(−1) =", "+2."])
            sc.montrer(l1, [("2 fois", [0], [FadeIn(c1, scale=1.3), Indicate(f.m, color=EXPO_C, scale_factor=1.4), FadeIn(cx)]),
                            ("1 :", [1], [FadeIn(c2, scale=1.3), Indicate(f.n, color=EXPO_C, scale_factor=1.4)]),
                            ("2.", [2], [FadeIn(ce), FadeIn(c3, scale=1.4)])], rt=0.35)
            sc.insister(bon.expo, 1.6, 0.2, about=bon.expo.get_center())

        self.qpause("05q-question", "05r-reponse", ["(3⁻²)⁻¹ ?"], choix, plans, 0,
                    ["Réponse A : 3².", "(−2) × (−1) = +2."], avant=avant, apres=apres)

    # ── 06 : défi : 4³ en une seule puissance de 2 ─────────────────────────
    def carre_points(self, c=BASE_C, pas=0.34, r=0.1):
        """4 = 2 × 2 : un carré de 2 × 2 points (une dalle de 4 carreaux)."""
        return VGroup(*[Dot(P(j * pas, -i * pas), radius=r, color=c) for i in range(2) for j in range(2)])

    def ecran_defi(self):
        self.ecran("06-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.au("À toi", Write(tit), rt=0.6)
        ar = architecte(0.6).move_to(P(-5.6, -1.6))
        met = T("architecte", 26, CIEL).next_to(ar, UP, buff=0.15)
        self.play(FadeIn(ar, shift=UP * 0.2), FadeIn(met), run_time=0.4)
        p43 = puiss(4, 3, fs=64)
        l1 = VGroup(T("Écris", 40), p43, T("sous la forme", 40)).arrange(RIGHT, buff=0.25)
        l1[0].align_to(p43.base, DOWN)
        l1[2].align_to(p43.base, DOWN)
        l1.move_to(P(0, 1.95)).align_to(P(-4.2, 0), LEFT)
        l2 = VGroup(T("d'une seule puissance de", 40), T("2", 46, BASE_C), T(".", 40)).arrange(RIGHT, buff=0.15)
        l2[1].align_to(l2[0][0], DOWN)
        l2[2].next_to(l2[1], RIGHT, buff=0.05).align_to(l2[1], DOWN)
        l2.next_to(l1, DOWN, buff=0.3).align_to(l1, LEFT)
        self.au("Écris", FadeIn(l1[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("4 puissance", FadeIn(p43.base, scale=1.3), rt=0.3)
        self.au("3 sous", FadeIn(p43.expo, scale=1.6), FadeIn(l1[2], shift=RIGHT * 0.2), rt=0.35)
        f444 = facteurs(3, 4, fs=56).move_to(P(-0.6, -0.15))
        self.play(TransformFromCopy(p43, f444), run_time=0.5)
        self.au("d'une seule", FadeIn(l2[0], shift=RIGHT * 0.2), rt=0.35)
        self.au("2.", FadeIn(l2[1], scale=1.4), FadeIn(l2[2]), rt=0.3)
        ind = T("Un indice :", 36, CIEL).move_to(P(0, -1.35)).align_to(P(-4.2, 0), LEFT)
        q4 = T("4", 46, BASE_C)
        e = eg(44)
        p22 = puiss(2, 2, fs=56)
        sans_audit(p22.expo)  # dit « au carré »
        li = rangee(q4, e, p22, buff=0.25).next_to(ind, RIGHT, buff=0.4)
        cp = self.carre_points().next_to(li, RIGHT, buff=0.95)
        self.au("Un indice", FadeIn(ind, shift=UP * 0.12), rt=0.3)
        self.au("4,", FadeIn(q4, scale=1.3), Indicate(f444.f[0], color=BASE_C, scale_factor=1.3), rt=0.35)
        self.au("c'est", FadeIn(e), TransformFromCopy(f444.f[0], cp), rt=0.45)
        s1 = T("2", 28, EXPO_C, audit=False).next_to(cp, UP, buff=0.12)
        s2 = T("2", 28, EXPO_C, audit=False).next_to(cp, LEFT, buff=0.15)
        self.au("2 au", FadeIn(p22.base, scale=1.3), FadeIn(s1), FadeIn(s2), rt=0.3)
        self.au("carré", FadeIn(p22.expo, scale=1.6), Indicate(cp, color=EXPO_C, scale_factor=1.2), rt=0.35)
        pz = T("Mets pause, et cherche !", 36, ORANGE_RETENUE).move_to(P(0.2, -2.6))
        self.au("Mets pause", Write(pz), rt=0.8)
        self.attendre_voix(marge=2.0)

    # ── 06b : correction : 4³ = (2²)³ = 2⁶ = 64 ────────────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction", 0.5)
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.au("Correction", Write(tit), rt=0.5)
        X0 = -6.0
        q4, e0, p22 = T("4", 60, BASE_C), eg(52), puiss(2, 2, fs=66)
        l1 = rangee(q4, e0, p22, buff=0.25).move_to(P(0, 2.2)).align_to(P(X0, 0), LEFT)
        cp = self.carre_points().next_to(l1, RIGHT, buff=0.5)
        self.au("4 égale", FadeIn(q4, scale=1.3), FadeIn(e0), FadeIn(cp, scale=0.6), rt=0.35)
        self.au("2 puissance", FadeIn(p22.base, scale=1.3), rt=0.3)
        self.au("2.", FadeIn(p22.expo, scale=1.6), Indicate(cp, color=EXPO_C, scale_factor=1.2), rt=0.35)
        a = puiss(4, 3, fs=72)
        f = ppar(2, 2, 3, fs=72)
        r = puiss(2, 6, fs=72)
        n64 = T("64", 72, VERT_OK)
        es = [eg(56) for _ in range(3)]
        l2 = rangee(a, es[0], f, es[1], r, es[2], n64, buff=0.3).move_to(P(0, 0.85)).align_to(P(X0, 0), LEFT)
        n64.shift(RIGHT * 0.22)  # son cadre viendra : loin du =
        self.au("Donc", Indicate(VGroup(q4, p22), color=WHITE, scale_factor=1.15), rt=0.35)
        self.au("4 puissance", FadeIn(a.base, scale=1.3), rt=0.3)
        self.au("3 égale", FadeIn(a.expo, scale=1.6), FadeIn(es[0]), rt=0.3)
        pk = [paquet(2, 2, fs=44) for _ in range(3)]
        for k, p in enumerate(pk):
            p.move_to(P(3.7, 2.45 - 0.82 * k))
        acc = Brace(VGroup(*pk), RIGHT, buff=0.12, color=EXPO_C)
        trois = T("3", 34, EXPO_C, audit=False).next_to(acc, RIGHT, buff=0.12)
        self.pp(f, ("2 puissance", "2,", "le tout", "cube"),
                avec_n=[LaggedStart(*[TransformFromCopy(VGroup(f.base, f.m), p) for p in pk], lag_ratio=0.25),
                        FadeIn(acc), FadeIn(trois, scale=1.4)])
        c2, cx, c3, ce, c6 = T("2", 44, EXPO_C), T("×", 38), T("3", 44, EXPO_C), T("=", 38), T("6", 48, VERT_OK)
        cal = VGroup(c2, cx, c3, ce, c6).arrange(RIGHT, buff=0.18).next_to(f, DOWN, buff=0.45)
        self.au("2 fois", TransformFromCopy(f.m, c2), FadeIn(cx), rt=0.35)
        self.au("3,", TransformFromCopy(f.n, c3), rt=0.35)
        six = VGroup(*[g for p in pk for g in p.f.f])
        self.au("6.", FadeIn(ce), FadeIn(c6, scale=1.4), Indicate(six, color=EXPO_C, scale_factor=1.25), rt=0.35)
        self.au("2 puissance", FadeIn(es[1]), FadeIn(r.base, scale=1.3), rt=0.3)
        self.au("6 :", ReplacementTransform(c6.copy(), r.expo), rt=0.4)
        self.au("64.", FadeIn(es[2]), FadeIn(n64, scale=1.4), rt=0.35)
        self.insister(n64, 1.3, 0.25)
        ve = T("Vérification :", 38, CIEL).move_to(P(0, -1.75)).align_to(P(X0, 0), LEFT)
        v = VGroup(T("4", 46, BASE_C), T("×", 40), T("4", 46, BASE_C), T("×", 40), T("4", 46, BASE_C), T("=", 40),
                   T("64", 50, VERT_OK)).arrange(RIGHT, buff=0.2).next_to(ve, RIGHT, buff=0.4)
        self.au("Vérification", FadeIn(ve, shift=RIGHT * 0.2), rt=0.35)
        self.au("4 fois", FadeIn(v[0], scale=1.3), FadeIn(v[1]), rt=0.25)
        self.au("4 fois", FadeIn(v[2], scale=1.3), FadeIn(v[3]), rt=0.25)
        self.au("4,", FadeIn(v[4], scale=1.3), rt=0.25)
        ok = self.coche(VERT_OK, 0.26)
        self.au("64.", FadeIn(v[5]), FadeIn(v[6], scale=1.4), rt=0.35)
        ok.next_to(v, RIGHT, buff=0.3)
        cad = self.encadrer(n64, buff=0.15)
        self.play(Create(ok), Create(cad), run_time=0.35)
        self.insister(VGroup(n64, cad), 1.3, 0.25)
        self.attendre_voix(marge=0.5)

    # ── 07 : ce que tu as appris ───────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au("Ce que", Write(tit), rt=0.7)
        X0 = -6.0
        items = []
        for y, l1, l2, sens in ((2.25, "Une puissance d'une puissance :", "on multiplie les exposants.", DOWN),
                                (0.2, "Un produit de même base :", "on additionne.", RIGHT)):
            ck = self.coche()
            ts = VGroup(T(l1, 34), T(l2, 34, VERT_OK)).arrange(sens, buff=0.25 if sens is RIGHT else 0.14,
                                                               aligned_edge=LEFT if sens is DOWN else ORIGIN)
            if sens is RIGHT:
                ligne_base(ts)
            VGroup(ck, ts).arrange(RIGHT, buff=0.3).move_to(P(0, y)).align_to(P(X0, 0), LEFT)
            ck.align_to(ts[0], UP)
            items.append((ck, ts))
            if ts.get_right()[0] > 6.3:
                print(f"FINALE large : {ts.get_right()[0]:.2f}", flush=True)
        f1 = sans_audit(self.regle_pp(0, fs=54))
        f1.move_to(P(0, 1.2)).align_to(items[0][1], LEFT)
        a1, a2 = puiss("a", "m", fs=54), puiss("a", "n", fs=54)
        f2 = sans_audit(rangee(a1, T("×", 46), a2, eg(46), expo2("a", "m", "+n", fs=54), buff=0.25))
        f2.move_to(P(0, -0.55)).align_to(items[1][1], LEFT)
        (c1, t1), (c2, t2) = items
        self.au("Une puissance", Create(c1), FadeIn(t1[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("on multiplie", FadeIn(t1[1], shift=RIGHT * 0.15), FadeIn(f1, shift=UP * 0.1), rt=0.4)
        self.au("Un produit", Create(c2), FadeIn(t2[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("on additionne", FadeIn(t2[1], shift=RIGHT * 0.15), FadeIn(f2, shift=UP * 0.1), rt=0.4)
        c3 = self.coche()
        t3 = VGroup(T("Pour écrire", 34), T("4", 36, BASE_C), T("ou", 34), T("8", 36, BASE_C),
                    T("en puissance de", 34), T("2,", 36, BASE_C)).arrange(RIGHT, buff=0.17)
        ligne_base(t3)
        t3b = T("cette règle aide.", 34).next_to(t3, DOWN, buff=0.14).align_to(t3, LEFT)
        VGroup(c3, VGroup(t3, t3b)).arrange(RIGHT, buff=0.3).move_to(P(0, -1.75)).align_to(P(X0, 0), LEFT)
        c3.align_to(t3, UP)
        self.au("Pour", Create(c3), FadeIn(t3[0], shift=RIGHT * 0.15), rt=0.3)
        self.au("4 ou", FadeIn(t3[1], scale=1.3), FadeIn(t3[2]), rt=0.25)
        self.au("8 en", FadeIn(t3[3], scale=1.3), FadeIn(t3[4], shift=RIGHT * 0.1), rt=0.25)
        self.au("2,", FadeIn(t3[5], scale=1.3), rt=0.25)
        self.au("cette", FadeIn(t3b, shift=RIGHT * 0.15), rt=0.3)
        ep = VGroup(T("Épisode 10 :", 34, JAUNE_TITRE), T("enchaîner toutes les règles", 34)).arrange(RIGHT,
                                                                                                    buff=0.22)
        ep.move_to(P(0, -3.0)).align_to(P(X0, 0), LEFT)
        self.au("10 t'attend", FadeIn(ep[0], shift=UP * 0.15), rt=0.35)
        self.au("enchaîner", FadeIn(ep[1], shift=UP * 0.15), rt=0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_architecte()
        self.ecran_decomposer()
        self.ecran_regle()
        self.ecran_question1()
        self.ecran_deux_regles()
        self.ecran_negatif()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")


class PuissancePuissancePuissance2de(PuissancePuissancePuissanceBase):
    identite = "Maths 2de — EleveAI"
    ceinture = "verte"
