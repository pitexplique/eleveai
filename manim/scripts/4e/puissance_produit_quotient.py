# puissance_produit_quotient.py
# EleveAI — Maths 2de — série « Puissances », épisode 08 : PRODUIT ET
# QUOTIENT DE PUISSANCES DE MÊME BASE. Paysage 16:9, AVEC VOIX.
#   PuissanceProduitQuotient2de « Maths 2de — EleveAI », ceinture VERTE.
#   (la base PuissanceProduitQuotientBase porte tout ; la sous-classe ne
#   change que l'identité et la ceinture, comme les épisodes communs)
# Micro couverte : 2de `puiss_produit_quotient` (notion `puissances_2de`) :
#   écran 02 aᵐ × aⁿ = aᵐ⁺ⁿ (les facteurs se déplient puis se regroupent) ;
#   écran 03 aᵐ ÷ aⁿ = aᵐ⁻ⁿ (les facteurs barrés s'annulent) ; écran 04 le
#   rappel 5³ ÷ 5³ = 1 et 5³⁻³ = 5⁰, donc 5⁰ = 1 ; écran 05 un exposant
#   négatif ; écran 06 le piège des bases différentes.
# Code couleur constant : BLEU = la base, ORANGE = l'exposant, VERT = résultat
# juste, ROUGE = le piège (25⁸ : la base multipliée ; 2³ × 3² : bases
# différentes).
#
# Décor et métier : NUMÉRIQUE (une ingénieure en cybersécurité, les clés
# secrètes écrites en bits). Centres : technologie-ia, jeux-defis.
#
# Écrans : garde (00) ; la clé de 3 bits + 4 bits (01) ; 2³ × 2⁴ = 2⁷ (02) ;
# QUESTION 5² × 5⁶ (02q) ; 3⁷ ÷ 3² = 3⁵ (03) ; 5³ ÷ 5³ = 1 = 5⁰ (04) ;
# 2³ ÷ 2⁵ = 2⁻² (05) ; QUESTION 7⁴ ÷ 7⁶ (05q) ; le piège 2³ × 3² = 72 (06) ;
# QUESTION 2³ × 3² (06q) ; défi (07) et correction (07b) ; ce que tu as
# appris (08) ; fin (09).
#
# Voix : manim/voix/2de-puissance-produit-quotient.json (validée, débit −6),
# WAV dans public/sons/2de-puissance-produit-quotient/ ; marques :
# puissance_produit_quotient_marques.json (marques_dump.ps1 + cues2marques.py ;
# relues mot à mot : aucun mot répété perdu).
# Outils : manim/scripts/6e/prop_commun.py et OutilsNotation / puiss / T de
# puissance_notation_scientifique.py (importés, non modifiés) : `au()` avance
# un CURSEUR dans la voix, chaque extrait est cherché après le précédent.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/puissance_produit_quotient.py PuissanceProduitQuotient2de
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/puissance_produit_quotient.py PuissanceProduitQuotient2de -o eleveai-maths-seconde-puissance-produit-quotient --media_dir manim/scripts/4e/media-puiss-08-seconde
# Sortie : manim/sorties/seconde/maths/puissances/08-produit-quotient/eleveai-maths-seconde-puissance-produit-quotient.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from puissance_notation_scientifique import OutilsNotation, T, ligne_base, puiss, sans_audit  # noqa: E402

BASE_C = BLEU_CALCUL       # la base
EXPO_C = ORANGE_RETENUE    # l'exposant
PIEGE = ROUGE_ERREUR
CIEL = "#93c5fd"
OR = "#fbbf24"             # la clé


def eg(fs=60):
    return T("=", fs, WHITE, audit=False)


def rangee(*ms, buff=0.25):
    """Des morceaux côte à côte, centrés sur la même ligne (le = au milieu
    des chiffres, une fraction sur son trait)."""
    g = VGroup(*ms).arrange(RIGHT, buff=buff)
    y = None
    for m in ms:
        if hasattr(m, "trait"):
            y = m.trait.get_y()
            break
    if y is None:
        y = next((m.base.get_y() for m in ms if hasattr(m, "base")), g.get_y())
    for m in ms:
        if hasattr(m, "trait"):
            m.shift(UP * (y - m.trait.get_y()))
        elif hasattr(m, "base"):
            m.shift(UP * (y - m.base.get_y()))
        else:
            m.set_y(y)
    return g


def fracm(num, den, c=WHITE, sw=4):
    """Une fraction EMPILÉE de deux mobjects ; .num .trait .den."""
    w = max(num.width, den.width) + 0.25
    trait = Line(LEFT * w / 2, RIGHT * w / 2, color=c, stroke_width=sw)
    num.next_to(trait, UP, buff=0.14)
    den.next_to(trait, DOWN, buff=0.14)
    g = VGroup(num, trait, den)
    g.num, g.trait, g.den = num, trait, den
    return g


def facteurs(n, b, fs=54, c=BASE_C, buff=0.19):
    """« b × b × … × b » (n facteurs) : .f les facteurs, .x les signes ×.
    Données de la figure (audit=False) : le script les pose au mot."""
    items, f, x = [], VGroup(), VGroup()
    for k in range(n):
        if k:
            s = T("×", fs * 0.8, WHITE, audit=False)
            items.append(s)
            x.add(s)
        t = T(str(b), fs, c, audit=False)
        items.append(t)
        f.add(t)
    g = VGroup(*items).arrange(RIGHT, buff=buff)
    for s in x:
        s.set_y(f[0].get_y())
    g.f, g.x = f, x
    return g


def barre(m, c=CIEL, sw=6):
    """Le trait qui BARRE un facteur simplifié."""
    return Line(m.get_corner(DL) + P(-0.07, -0.05), m.get_corner(UR) + P(0.07, 0.05), color=c, stroke_width=sw)


def expo2(b, e1, e2, fs=72, audit=False):
    """aᵉ¹ᵉ² : une base et un exposant en DEUX morceaux (« 3 » puis « −5 »,
    « m » puis « +n ») : .base .e1 .e2 .expo."""
    p = puiss(b, e1 + e2, fs=fs, audit=audit)
    ch = p.chif
    n1 = len([c for c in e1 if not c.isspace()])
    p.e1, p.e2 = VGroup(*ch.submobjects[:n1]), VGroup(*ch.submobjects[n1:])
    return p


def cle(s=1.0, c=OR):
    """Une clé : l'anneau, la tige, deux dents."""
    anneau = Circle(radius=0.32, stroke_color=c, stroke_width=10).move_to(P(-0.75, 0))
    trou = Circle(radius=0.12, fill_color=c, fill_opacity=0, stroke_width=0).move_to(anneau)
    tige = Rectangle(width=1.15, height=0.16, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0.0, 0))
    dents = VGroup(*[Rectangle(width=0.12, height=0.26, fill_color=c, fill_opacity=1, stroke_width=0)
                     .move_to(P(x, -0.17)) for x in (0.35, 0.53)])
    return VGroup(anneau, trou, tige, dents).scale(s)


def cadenas(s=1.0, ouvert=False):
    """Un cadenas : le corps, l'anse (ouverte : montée et pivotée)."""
    corps = RoundedRectangle(width=0.9, height=0.75, corner_radius=0.1, fill_color="#475569", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3)
    anse = Arc(radius=0.3, start_angle=0, angle=PI, stroke_color="#cbd5e1", stroke_width=9)
    anse.next_to(corps, UP, buff=-0.02)
    trou = Circle(radius=0.08, fill_color="#0f172a", fill_opacity=1, stroke_width=0).move_to(corps)
    g = VGroup(anse, corps, trou).scale(s)
    g.anse, g.corps = anse, corps
    return g


def ingenieure(s=1.0):
    p = personne(peau="#f1c27d", tenue="#be185d", cheveux="#7c2d12", longs=True, s=s)
    p.add(lunettes(p))
    return p


def case_bit(v, c=BASE_C, w=0.62):
    """Une case de la clé, son bit dedans (0 ou 1) : .cadre .bit."""
    cadre = RoundedRectangle(width=w, height=0.72, corner_radius=0.08, fill_color="#0b1220", fill_opacity=1,
                             stroke_color=c, stroke_width=3)
    bit = T(str(v), 40, WHITE, audit=False).move_to(cadre)
    g = VGroup(cadre, bit)
    g.cadre, g.bit = cadre, bit
    return g


class PuissanceProduitQuotientBase(OutilsNotation, PaysageProp):
    nom_voix = "2de-puissance-produit-quotient"
    fichier_marques = "puissance_produit_quotient_marques.json"
    identite = "Maths 2de — EleveAI"
    ceinture = "verte"

    def poser_idx(self, t, plan, rt=0.25, avec=None):
        """Un Text écrit MORCEAU PAR MORCEAU : plan = [(indice du 1er caractère
        du morceau, extrait de la voix)] (indices : les exposants ² ⁶…)."""
        s = t.original_text
        debuts = [a for a, _ in plan]
        bornes = debuts + [len(s)]
        k, pieces = 0, []
        for a, b in zip(bornes[:-1], bornes[1:]):
            n = sum(1 for c in s[a:b] if not c.isspace())
            pieces.append(VGroup(*t.submobjects[k:k + n]))
            k += n
        for j, ((_, ex), pc) in enumerate(zip(plan, pieces)):
            self.au(ex, FadeIn(pc, shift=UP * 0.12), *((avec or {}).get(j, [])), rt=rt)

    FS_REP = 28  # UNE seule taille pour toute l'explication des questions-pauses

    def rep_ligne(self, i, morceaux):
        """La ligne i de la réponse, en morceaux posés au mot, TOUJOURS à la
        taille FS_REP (jamais réduite ligne par ligne) ; à gauche de Ti-Margo."""
        ref = self.ph_q[i]
        lg = self.ligne([(m, VERT_OK) for m in morceaux], self.FS_REP, buff=0.14)
        lg.move_to(ref).align_to(ref, LEFT)
        for f in lg.get_family():
            f.sans_synchro = True
        if lg.get_right()[0] > 5.2:
            print(f"LARGE {morceaux} : {lg.get_right()[0]:.2f}", flush=True)
        return lg

    def rep_puiss(self, i, prefixe, b, e):
        """La ligne i de la réponse : « Réponse C : » + bᵉ COMPOSÉ, en vert."""
        ref = self.ph_q[i]
        pre = T(prefixe, self.FS_REP, VERT_OK)
        p = puiss(b, e, fs=self.FS_REP * 1.15, cb=VERT_OK, ce=VERT_OK)
        pt = T(".", self.FS_REP, VERT_OK)
        lg = VGroup(pre, p, pt).arrange(RIGHT, buff=0.15)
        p.base.align_to(pre, DOWN)
        p.expo.next_to(p.base, UR, buff=0.03).shift(DOWN * 0.2)
        pt.next_to(p.base, RIGHT, buff=0.04 + p.expo.width).align_to(pre, DOWN)
        lg.move_to(ref).align_to(ref, LEFT)
        lg.pre, lg.p, lg.pt = pre, p, pt
        return lg

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Produit et quotient de puissances", self.identite, self.ceinture,
                                       y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        sans_audit(ident)  # « Maths 2de » : l'identité, jamais dite
        self.au("Produit", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.8)
        a, b = puiss(2, 3, fs=84), puiss(2, 4, fs=84)
        fois = T("×", 70)
        l1 = rangee(a, fois, b, T("?", 70, EXPO_C, audit=False), buff=0.35).move_to(P(-0.6, 0.95))
        c, d = puiss(2, 7, fs=80), puiss(4, 7, fs=80)
        ou = T("ou", 50)
        qm = T("?", 64, EXPO_C, audit=False)
        l2 = rangee(c, ou, d, qm, buff=0.5).move_to(P(-0.6, -0.55))
        self.au("2 puissance", FadeIn(a.base, scale=1.3), rt=0.3)
        self.au("3 fois", FadeIn(a.expo, scale=1.6), FadeIn(fois), rt=0.3)
        self.au("2 puissance", FadeIn(b.base, scale=1.3), rt=0.3)
        self.au("4 :", FadeIn(b.expo, scale=1.6), FadeIn(l1[3]), rt=0.3)
        self.au("2 puissance", FadeIn(c.base, scale=1.3), rt=0.3)
        self.au("7,", FadeIn(c.expo, scale=1.6), rt=0.3)
        self.au("ou", FadeIn(ou), rt=0.2)
        self.au("4 puissance", FadeIn(d.base, scale=1.3), rt=0.3)
        self.au("7 ?", FadeIn(d.expo, scale=1.6), FadeIn(qm, scale=1.4), rt=0.35)
        self.insister(c.base, 1.4, 0.2, about=c.base.get_center())
        self.insister(d.base, 1.4, 0.2, about=d.base.get_center())
        self.attendre_voix(marge=0.6)

    # ── 01 : l'ingénieure et ses clés de bits ──────────────────────────────
    def ecran_cle(self):
        self.ecran("01-cle")
        p = ingenieure(0.7).move_to(P(-5.55, -1.75))
        met = VGroup(T("ingénieure en", 26, CIEL), T("cybersécurité", 26, CIEL)).arrange(DOWN, buff=0.06)
        met.next_to(p, UP, buff=0.15).align_to(P(-6.4, 0), LEFT)
        k = cle(1.3).move_to(P(-1.9, 2.55))
        cad = cadenas(0.9).move_to(P(-4.2, 2.45))
        self.au("Une ingénieure", FadeIn(p, shift=UP * 0.3), FadeIn(met[0]), rt=0.45)
        self.au("cybersécurité", FadeIn(met[1], shift=UP * 0.1), rt=0.3)
        self.au("fabrique", FadeIn(cad, scale=0.6), rt=0.35)
        self.au("clés", FadeIn(k, shift=LEFT * 0.4), rt=0.45)
        c0 = case_bit(0, CIEL).move_to(P(0.6, 2.55))
        c1 = case_bit(1, CIEL).move_to(P(1.4, 2.55))
        c0.bit._pas_audit = False
        c1.bit._pas_audit = False
        self.au("0 et", FadeIn(c0, scale=1.3), rt=0.3)
        self.au("1.", FadeIn(c1, scale=1.3), rt=0.3)
        # la clé de 3 bits, puis les 4 bits ajoutés
        X0, W = -2.6, 0.72
        bits = [case_bit(v) for v in (1, 0, 1)] + [case_bit(v, EXPO_C) for v in (0, 1, 1, 0)]
        for j, bt in enumerate(bits):
            bt.move_to(P(X0 + W * j + (0.25 if j >= 3 else 0), 0.95))
        l3 = T("3 bits", 32, BASE_C).next_to(VGroup(*bits[:3]), DOWN, buff=0.15)
        l4 = T("4 bits", 32, EXPO_C).next_to(VGroup(*bits[3:]), DOWN, buff=0.15)
        self.au("3 bits", LaggedStart(*[FadeIn(b, shift=DOWN * 0.2) for b in bits[:3]], lag_ratio=0.25),
                FadeIn(l3), rt=0.6)
        self.melanger(bits[:3], 2)
        p3 = puiss(2, 3, fs=60)
        r3 = VGroup(p3, T("clés possibles", 38)).arrange(RIGHT, buff=0.25)
        r3[1].align_to(p3.base, DOWN)
        r3.move_to(P(0, -0.55)).align_to(P(X0 - 0.3, 0), LEFT)
        self.au("2 puissance", FadeIn(p3.base, scale=1.3), rt=0.3)
        self.au("3 clés", FadeIn(p3.expo, scale=1.6), FadeIn(r3[1], shift=RIGHT * 0.2), rt=0.35)
        self.au("4 bits", LaggedStart(*[FadeIn(b, shift=LEFT * 0.3) for b in bits[3:]], lag_ratio=0.2),
                FadeIn(l4), rt=0.6)
        p4 = puiss(2, 4, fs=60)
        r4 = VGroup(T("chaque clé se prolonge de", 36), p4, T("façons", 36)).arrange(RIGHT, buff=0.22)
        for m in (r4[0], r4[2]):
            m.align_to(p4.base, DOWN)
        r4.move_to(P(0, -1.55)).align_to(P(X0 - 0.3, 0), LEFT)
        self.au("chaque", FadeIn(r4[0], shift=RIGHT * 0.2), rt=0.35)
        self.melanger(bits[3:], 2)
        self.au("2 puissance", FadeIn(p4.base, scale=1.3), rt=0.3)
        self.au("4 façons", FadeIn(p4.expo, scale=1.6), FadeIn(r4[2], shift=RIGHT * 0.2), rt=0.35)
        q = VGroup(T("Combien de clés en tout", 40), T("?", 52, EXPO_C, audit=False)).arrange(RIGHT, buff=0.2)
        q.move_to(P(0, -2.6)).align_to(P(X0 - 0.3, 0), LEFT)
        self.au("Combien", FadeIn(q[0], shift=UP * 0.15),
                LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.15) for b in bits], lag_ratio=0.1), rt=0.8)
        self.au("tout", FadeIn(q[1], scale=1.6), rt=0.3)
        self.insister(q[1], 1.5, 0.2, about=q[1].get_center())
        self.attendre_voix(marge=0.4)

    def melanger(self, cases, fois=2, rt=0.18):
        """Les bits changent : d'autres clés possibles défilent."""
        import random
        rd = random.Random(len(cases) * 7 + fois)
        for _ in range(fois):
            anims = []
            for c in cases:
                v = "1" if c.bit.original_text == "0" else "0"
                if rd.random() < 0.4:
                    continue
                nb = T(v, 40, WHITE, audit=False).move_to(c.cadre)
                anims.append(Transform(c.bit, nb))
                c.bit.original_text = v
            if anims:
                self.play(*anims, run_time=rt)

    def regle(self, op, y, x=-0.8, fs=72):
        """aᵐ × aⁿ = aᵐ⁺ⁿ (op « × ») ou aᵐ ÷ aⁿ = aᵐ⁻ⁿ (op « ÷ ») : renvoyée,
        posée par le script au mot (.a1 .s .a2 .eg .a3)."""
        a1, a2 = puiss("a", "m", fs=fs), puiss("a", "n", fs=fs)
        a3 = expo2("a", "m", "+n" if op == "×" else "−n", fs=fs)
        s = T(op, fs * 0.85, WHITE, audit=False)
        e = eg(fs * 0.85)
        g = rangee(a1, s, a2, e, a3, buff=0.3).move_to(P(x, y))
        g.a1, g.s, g.a2, g.eg, g.a3 = a1, s, a2, e, a3
        return g

    def accolade(self, ms, txt, c=EXPO_C, fs=30):
        br = Brace(VGroup(*ms), DOWN, buff=0.12, color=c)
        lab = T(txt, fs, c).next_to(br, DOWN, buff=0.1)
        g = VGroup(br, lab)
        g.br, g.lab = br, lab
        return g

    # ── 02 : 2³ × 2⁴ : les facteurs se déplient, puis se regroupent en 2⁷ ─
    def ecran_produit(self):
        self.ecran("02-produit")
        a, b = puiss(2, 3, fs=80), puiss(2, 4, fs=80)
        fois = T("×", 66)
        haut = rangee(a, fois, b, buff=0.35).move_to(P(-0.8, 2.6))
        self.au("2 puissance", FadeIn(a.base, scale=1.3), rt=0.3)
        self.au("3 fois", FadeIn(a.expo, scale=1.6), FadeIn(fois), rt=0.3)
        self.au("2 puissance", FadeIn(b.base, scale=1.3), rt=0.3)
        self.au("4 :", FadeIn(b.expo, scale=1.6), rt=0.3)
        row = facteurs(7, 2, fs=60).move_to(P(-0.8, 1.15))
        A, B, mil = VGroup(*row[:5]), VGroup(*row[6:]), row[5]
        A.shift(LEFT * 0.6)
        B.shift(RIGHT * 0.6)
        acA = self.accolade(A, "trois facteurs")
        acB = self.accolade(B, "quatre facteurs")
        self.au("trois", TransformFromCopy(a, A), FadeIn(acA.br), rt=0.6)
        self.au("facteurs", FadeIn(acA.lab, shift=UP * 0.1), rt=0.3)
        self.au("quatre", TransformFromCopy(b, B), FadeIn(acB.br), rt=0.6)
        self.au("facteurs", FadeIn(acB.lab, shift=UP * 0.1), rt=0.3)
        self.au("Sept", A.animate.shift(RIGHT * 0.6), B.animate.shift(LEFT * 0.6), FadeIn(mil, scale=1.5),
                FadeOut(acA), FadeOut(acB), rt=0.5)
        cpt = VGroup(*[T(str(k + 1), 28, EXPO_C, audit=False).next_to(f, UP, buff=0.12)
                       for k, f in enumerate(row.f)])
        ac7 = self.accolade(row, "sept facteurs")
        self.play(LaggedStart(*[FadeIn(c, scale=1.5) for c in cpt], lag_ratio=0.25), FadeIn(ac7), run_time=0.7)
        res = puiss(2, 7, fs=80)
        e1, e2 = eg(64), eg(64)
        n128 = T("128", 66, VERT_OK)
        cl = T("clés", 44)
        bas = rangee(e1, res, e2, n128, cl, buff=0.3).move_to(P(-0.8, -0.65))
        cl.align_to(n128, DOWN)
        vol = VGroup(*[res.base.copy() for _ in range(7)])
        self.au("2 puissance", FadeIn(e1), TransformFromCopy(row.f, vol), rt=0.6)
        self.remove(vol)
        self.add(res.base)
        self.au("7,", ReplacementTransform(cpt[6].copy(), res.expo), Indicate(ac7.lab, color=EXPO_C), rt=0.45)
        self.insister(res.expo, 1.6, 0.2, about=res.expo.get_center())
        self.au("128", FadeIn(e2), FadeIn(n128, scale=1.4), rt=0.35)
        self.au("clés", FadeIn(cl, shift=LEFT * 0.2), rt=0.3)
        rg = self.regle("×", -2.35)
        self.au("a puissance", FadeIn(rg.a1.base, scale=1.3), rt=0.3)
        self.au("m fois", FadeIn(rg.a1.expo, scale=1.6), rt=0.2)
        self.au("fois", FadeIn(rg.s), rt=0.2)
        self.au("a puissance", FadeIn(rg.a2.base, scale=1.3), rt=0.3)
        self.au("n égale", FadeIn(rg.a2.expo, scale=1.6), rt=0.2)
        self.au("égale", FadeIn(rg.eg), rt=0.2)
        self.au("a puissance", FadeIn(rg.a3.base, scale=1.3), rt=0.3)
        self.au("m plus", FadeIn(rg.a3.e1, scale=1.6), rt=0.2)
        self.au("plus", FadeIn(rg.a3.e2[0], scale=1.6), rt=0.2)
        self.au("n.", FadeIn(rg.a3.e2[1], scale=1.6), rt=0.2)
        cad = self.encadrer(rg, buff=0.2)
        self.play(Create(cad), run_time=0.3)
        self.insister(rg.a3.expo, 1.5, 0.25, about=rg.a3.expo.get_center())
        self.attendre_voix(marge=0.4)

    # ── 02q : QUESTION 1 (5² × 5⁶) ──────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        a, b = puiss(5, 2, fs=100), puiss(5, 6, fs=100)
        fois = T("×", 80)
        fig = rangee(a, fois, b, buff=0.35).move_to(P(-3.6, 1.7))
        r1 = expo2(5, "2", "+6", fs=90)
        bon = sans_audit(puiss(5, 8, fs=90, cb=VERT_OK, ce=VERT_OK))  # posé au « 8 », son 5 dit à l'instant
        l2 = rangee(eg(70), r1, eg(70), bon, buff=0.3).move_to(P(-3.6, 0.05))
        faux = puiss(25, 8, fs=72, cb=PIEGE, ce=PIEGE)
        faux.move_to(P(-4.6, -1.55))
        nb = VGroup(T("la base ne se", 30, PIEGE), T("multiplie pas", 30, PIEGE)).arrange(DOWN, buff=0.08)
        nb.next_to(faux, RIGHT, buff=0.45)
        choix = [puiss(5, 12, fs=44), puiss(25, 8, fs=44), puiss(5, 8, fs=44)]
        plans = [[("5 puissance", [choix[0].base]), ("12.", [choix[0].expo])],
                 [("25 puissance", [choix[1].base]), ("8.", [choix[1].expo])],
                 [("5 puissance", [choix[2].base]), ("8.", [choix[2].expo])]]

        def avant(sc, q):
            sc.poser_idx(q[0], [(0, "5 puissance"), (1, "2 fois"), (5, "5 puissance"), (6, "6 ?")],
                         avec={0: [FadeIn(a.base, scale=1.3)], 1: [FadeIn(a.expo, scale=1.6), FadeIn(fois)],
                               2: [FadeIn(b.base, scale=1.3)], 3: [FadeIn(b.expo, scale=1.6)]})

        def apres(sc):
            lg = sc.rep_puiss(0, "Réponse C :", 5, 8)
            sc.au("C :", FadeIn(lg.pre, shift=UP * 0.12), rt=0.25)
            sc.au("5 puissance", FadeIn(lg.p.base, shift=UP * 0.12), rt=0.25)
            sc.au("8.", FadeIn(lg.p.expo, lg.pt, shift=UP * 0.12), FadeIn(l2[2]), FadeIn(bon, scale=1.3), rt=0.3)
            l1 = sc.rep_ligne(1, ["La base reste", "5 :"])
            sc.au("La base", FadeIn(l1[0], shift=UP * 0.12), rt=0.25)
            sc.au("5,", FadeIn(l1[1], shift=UP * 0.12), FadeIn(l2[0]), TransformFromCopy(a.base, r1.base), rt=0.4)
            sc.play(Indicate(VGroup(a.base, b.base, r1.base, bon.base), color=BASE_C, scale_factor=1.25), run_time=0.4)
            l3 = sc.rep_ligne(2, ["on additionne"])
            sc.au("on additionne", FadeIn(l3[0], shift=UP * 0.12), TransformFromCopy(a.expo, r1.e1), rt=0.4)
            l4 = sc.rep_ligne(3, ["les exposants."])
            sc.au("exposants", FadeIn(l4[0], shift=UP * 0.12), TransformFromCopy(b.expo, r1.e2), rt=0.4)
            sc.insister(bon.expo, 1.6, 0.2, about=bon.expo.get_center())
            sc.pieges(1)
            sc.au("25 puissance", FadeIn(faux.base, scale=1.3), rt=0.3)
            sc.au("8 :", FadeIn(faux.expo, scale=1.5), rt=0.25)
            sc.au("la base ne", FadeIn(nb[0], shift=UP * 0.12), rt=0.3)
            sc.play(Create(barre(faux, WHITE)), run_time=0.25)
            sc.au("multiplie", FadeIn(nb[1], shift=UP * 0.12), rt=0.3)

        self.qpause("02q-question", "02r-reponse", ["5² × 5⁶ ?"], choix, plans, 2,
                    ["Réponse C : 5⁸.", "La base reste 5 :", "on additionne", "les exposants."],
                    avant=avant, apres=apres)

    def deplie(self, n_haut, n_bas, b, fs=54):
        """La fraction DÉPLIÉE : n_haut facteurs b sur n_bas facteurs b, les
        deux rangées calées à GAUCHE (les facteurs simplifiés l'un sur l'autre)."""
        h, d = facteurs(n_haut, b, fs), facteurs(n_bas, b, fs)
        u = fracm(h, d)
        g = min(h.get_left()[0], d.get_left()[0])
        h.shift(RIGHT * (g - h.get_left()[0]))
        d.shift(RIGHT * (g - d.get_left()[0]))
        w = max(h.get_right()[0], d.get_right()[0]) - g + 0.25
        u.trait.become(Line(P(g - 0.125, 0), P(g - 0.125 + w, 0), color=WHITE, stroke_width=4).set_y(u.trait.get_y()))
        return u

    def simplifier(self, u, k, rt=0.3):
        """Barre la k-ième paire de facteurs (en haut et en bas) : les traits."""
        tr = VGroup(barre(u.num.f[k]), barre(u.den.f[k]))
        self.play(Create(tr), run_time=rt)
        return tr

    def griser(self, u, k, traits):
        """Les k premières paires simplifiées pâlissent (et leurs ×)."""
        ms = [u.num[j] for j in range(min(2 * k, len(u.num)))] + [u.den[j] for j in range(min(2 * k, len(u.den)))]
        self.play(*[m.animate.set_opacity(0.28) for m in ms], traits.animate.set_opacity(0.6), run_time=0.35)

    def poser_regle_div(self, y, x=-1.2, fs=64):
        """aᵐ / aⁿ = aᵐ⁻ⁿ (fraction empilée), posée au mot, encadrée."""
        fr = fracm(puiss("a", "m", fs=fs), puiss("a", "n", fs=fs))
        a3 = expo2("a", "m", "−n", fs=fs)
        e = eg(fs * 0.85)
        rg = rangee(fr, e, a3, buff=0.35).move_to(P(x, y))
        self.au("a puissance", FadeIn(fr.num.base, scale=1.3), rt=0.3)
        self.au("m divisé", FadeIn(fr.num.expo, scale=1.6), rt=0.2)
        self.au("divisé", Create(fr.trait), rt=0.2)
        self.au("a puissance", FadeIn(fr.den.base, scale=1.3), rt=0.3)
        self.au("n égale", FadeIn(fr.den.expo, scale=1.6), rt=0.2)
        self.au("égale", FadeIn(e), rt=0.2)
        self.au("a puissance", FadeIn(a3.base, scale=1.3), rt=0.3)
        self.au("m moins", FadeIn(a3.e1, scale=1.6), rt=0.2)
        self.au("moins", FadeIn(a3.e2[0], scale=1.6), rt=0.2)
        self.au("n.", FadeIn(a3.e2[1], scale=1.6), rt=0.2)
        cad = self.encadrer(rg, buff=0.2)
        self.play(Create(cad), run_time=0.3)
        self.insister(a3.expo, 1.5, 0.25, about=a3.expo.get_center())
        return rg

    def poser_frac(self, fr, mots, rt=0.3):
        """Une fraction de puissances bᵉ / bᶠ posée au mot : mots = (base du
        haut, exposant du haut, trait, base du bas, exposant du bas)."""
        anims = [FadeIn(fr.num.base, scale=1.3), FadeIn(fr.num.expo, scale=1.6), Create(fr.trait),
                 FadeIn(fr.den.base, scale=1.3), FadeIn(fr.den.expo, scale=1.6)]
        for m, a in zip(mots, anims):
            self.au(m, a, rt=rt)

    # ── 03 : 3⁷ ÷ 3² : on simplifie deux facteurs 3 ─────────────────────────
    def ecran_quotient(self):
        self.ecran("03-quotient")
        tit = T("Pour diviser", 44, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        self.au("Pour", Write(tit), rt=0.5)
        F = fracm(puiss(3, 7, fs=72), puiss(3, 2, fs=72))
        U = self.deplie(7, 2, 3)
        e1, e2 = eg(60), eg(60)
        res = puiss(3, 5, fs=80)
        rangee(F, e1, U, e2, res, buff=0.35).move_to(P(-0.6, 1.25))
        self.poser_frac(F, ("3 puissance", "7", "divisé", "3 puissance", "2."))
        self.au("On simplifie", FadeIn(e1), TransformFromCopy(F.num, U.num), TransformFromCopy(F.den, U.den),
                Create(U.trait), rt=0.6)
        self.au("deux")
        t0 = self.simplifier(U, 0, 0.25)
        self.au("3,")
        t1 = self.simplifier(U, 1, 0.25)
        traits = VGroup(t0, t1)
        self.au("haut", Indicate(VGroup(*U.num[:3]), color=CIEL, scale_factor=1.15), rt=0.3)
        self.au("bas", Indicate(U.den, color=CIEL, scale_factor=1.15), rt=0.3)
        self.griser(U, 2, traits)
        reste = U.num.f[2:]
        cpt = VGroup(*[T(str(k + 1), 28, EXPO_C, audit=False).next_to(f, UP, buff=0.1) for k, f in enumerate(reste)])
        il = VGroup(T("Il en reste", 36, EXPO_C), T("cinq", 36, EXPO_C)).arrange(RIGHT, buff=0.2)
        il.next_to(U, DOWN, buff=0.4)
        self.au("Il en", FadeIn(il[0], shift=UP * 0.15), rt=0.3)
        self.au("cinq", FadeIn(il[1], scale=1.3), reste.animate.set_color(EXPO_C),
                LaggedStart(*[FadeIn(c, scale=1.5) for c in cpt], lag_ratio=0.2), rt=0.6)
        vol = VGroup(*[res.base.copy() for _ in range(5)])
        self.au("3 puissance", FadeIn(e2), TransformFromCopy(reste, vol), rt=0.55)
        self.remove(vol)
        self.add(res.base)
        self.au("5.", ReplacementTransform(cpt[4].copy(), res.expo), rt=0.4)
        self.play(reste.animate.set_color(BASE_C), run_time=0.2)
        self.insister(res, 1.3, 0.25)
        self.poser_regle_div(-2.05)
        self.attendre_voix(marge=0.4)

    # ── 04 : le rappel : 5³ ÷ 5³ = 1, et 5³⁻³ = 5⁰ ──────────────────────────
    def ecran_zero(self):
        self.ecran("04-zero")
        tit = T("Un rappel", 44, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        self.au("Un rappel", Write(tit), rt=0.5)
        F = fracm(puiss(5, 3, fs=72), puiss(5, 3, fs=72))
        U = self.deplie(3, 3, 5)
        e1, e2 = eg(60), eg(60)
        un = T("1", 84, VERT_OK)
        rangee(F, e1, U, e2, un, buff=0.35).move_to(P(-2.6, 1.25))
        self.poser_frac(F, ("5 puissance", "3", "divisé", "5 puissance", "3 :"))
        lab = VGroup(T("un nombre divisé", 32, CIEL), T("par lui-même", 32, CIEL)).arrange(DOWN, buff=0.08)
        lab.move_to(P(3.6, 1.25))
        self.au("un nombre", FadeIn(e1), TransformFromCopy(F.num, U.num), TransformFromCopy(F.den, U.den),
                Create(U.trait), FadeIn(lab[0], shift=LEFT * 0.15), rt=0.6)
        self.au("lui-même", FadeIn(lab[1], shift=LEFT * 0.15), rt=0.3)
        trs = VGroup(*[VGroup(barre(U.num.f[k]), barre(U.den.f[k])) for k in range(3)])
        self.play(LaggedStart(*[Create(t) for t in trs], lag_ratio=0.35), run_time=0.6)
        self.au("1.", FadeIn(e2), FadeIn(un, scale=1.5), rt=0.35)
        self.griser(U, 3, trs)
        rg = T("La règle donne", 36).move_to(P(0, -0.6)).align_to(P(-6.0, 0), LEFT)
        r = expo2(5, "3", "−3", fs=80)
        e3 = eg(60)
        p0 = puiss(5, 0, fs=80)
        l2 = rangee(r, e3, p0, buff=0.35).next_to(rg, RIGHT, buff=0.5)
        l2.shift(UP * (rg.get_y() - r.base.get_y()))
        self.au("La règle", FadeIn(rg, shift=RIGHT * 0.2), rt=0.35)
        self.au("5 puissance", FadeIn(r.base, scale=1.3), rt=0.3)
        self.au("3 moins", FadeIn(r.e1, scale=1.6), rt=0.25)
        self.au("3 :", FadeIn(r.e2, scale=1.6), rt=0.25)
        self.au("5 puissance", FadeIn(e3), FadeIn(p0.base, scale=1.3), rt=0.3)
        self.au("0.", FadeIn(p0.expo, scale=1.8), rt=0.3)
        self.insister(p0.expo, 1.6, 0.2, about=p0.expo.get_center())
        a0 = rangee(puiss("a", 0, fs=84), eg(66), T("1", 76, VERT_OK), buff=0.3).move_to(P(-1.6, -2.35))
        self.au("Encore", Indicate(un, color=VERT_OK, scale_factor=1.3), Indicate(p0, color=EXPO_C, scale_factor=1.3),
                rt=0.6)
        self.au("a puissance", FadeIn(a0[0].base, scale=1.3), rt=0.3)
        self.au("0 égale", FadeIn(a0[0].expo, scale=1.6), FadeIn(a0[1]), rt=0.3)
        self.au("1.", FadeIn(a0[2], scale=1.4), rt=0.3)
        cad = self.encadrer(a0, buff=0.2)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(a0, cad), 1.25, 0.25)
        self.attendre_voix(marge=0.4)

    # ── 05 : 2³ ÷ 2⁵ : l'exposant du bas est plus grand → 2⁻² ──────────────
    def ecran_negatif(self):
        self.ecran("05-negatif")
        tit = VGroup(T("Et si l'exposant du bas", 40, JAUNE_TITRE), T("est plus grand ?", 40, JAUNE_TITRE))
        tit.arrange(RIGHT, buff=0.22).move_to(P(-0.4, 3.15))
        self.au("Et si", FadeIn(tit[0], shift=DOWN * 0.15), rt=0.35)
        self.au("plus", FadeIn(tit[1], shift=DOWN * 0.15), rt=0.35)
        F = fracm(puiss(2, 3, fs=72), puiss(2, 5, fs=72))
        U = self.deplie(3, 5, 2)
        e1 = eg(60)
        rangee(F, e1, U, buff=0.35).move_to(P(-2.6, 1.15))
        self.poser_frac(F, ("2 puissance", "3", "divisé", "2 puissance", "5 :"))
        self.play(Indicate(F.den.expo, color=EXPO_C, scale_factor=1.6), run_time=0.4)
        r = expo2(2, "3", "−5", fs=76)
        p = puiss(2, "−2", fs=76)
        sans_audit(p.base)  # la base 2 reste (posée au « moins », dite juste avant)
        q = fracm(T("1", 60, VERT_OK, audit=False), T("4", 60, VERT_OK, audit=False), c=VERT_OK)
        e2, e3, e4 = eg(60), eg(60), eg(60)
        l2 = rangee(e2, r, e3, p, e4, q, buff=0.32).move_to(P(-2.6, -0.95))
        l2.align_to(P(F.get_left()[0] + 0.6, 0), LEFT)
        self.au("3 moins", FadeIn(e1), TransformFromCopy(F.num, U.num), TransformFromCopy(F.den, U.den),
                Create(U.trait), FadeIn(e2), FadeIn(r.base, scale=1.3), FadeIn(r.e1, scale=1.6), rt=0.6)
        self.au("5,", FadeIn(r.e2, scale=1.6), rt=0.3)
        trs = VGroup(*[VGroup(barre(U.num.f[k]), barre(U.den.f[k])) for k in range(3)])
        self.play(LaggedStart(*[Create(t) for t in trs], lag_ratio=0.3), run_time=0.4)
        reste = U.den.f[3:]
        self.au("moins", FadeIn(e3), FadeIn(p.base, scale=1.3), FadeIn(p.moins, scale=1.8),
                reste.animate.set_color(EXPO_C), rt=0.35)
        bas = T("2 facteurs en bas", 30, EXPO_C, audit=False).next_to(U, RIGHT, buff=0.4).align_to(U.den, DOWN)
        self.au("2.", FadeIn(p.chif, scale=1.6), FadeIn(bas, shift=LEFT * 0.15),
                Indicate(reste, color=EXPO_C, scale_factor=1.3), rt=0.4)
        self.griser(U, 3, trs)
        self.au("2 puissance", Indicate(p, color=EXPO_C, scale_factor=1.25), rt=0.4)
        uq = T("un quart", 34, VERT_OK).next_to(q, DOWN, buff=0.18)
        self.au("un quart", FadeIn(e4), FadeIn(q, scale=1.3), rt=0.35)
        self.au("quart", FadeIn(uq, shift=UP * 0.15), rt=0.3)
        self.insister(q, 1.3, 0.25)
        tous = VGroup(T("Les règles marchent", 36, CIEL), T("avec tous les exposants entiers.", 36, CIEL))
        tous.arrange(RIGHT, buff=0.2).move_to(P(-0.6, -2.75)).align_to(P(-6.0, 0), LEFT)
        if tous.get_right()[0] > 5.1:
            tous.scale_to_fit_width(11.1).align_to(P(-6.0, 0), LEFT)
        self.au("Les règles", FadeIn(tous[0], shift=RIGHT * 0.2), rt=0.35)
        self.au("avec", FadeIn(tous[1], shift=RIGHT * 0.2), rt=0.35)
        self.attendre_voix(marge=0.4)

    # ── 05q : QUESTION 2 (7⁴ ÷ 7⁶) ──────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        F = fracm(puiss(7, 4, fs=100), puiss(7, 6, fs=100))
        F.move_to(P(-4.6, 1.3))
        r = expo2(7, "4", "−6", fs=76)
        bon = sans_audit(puiss(7, "−2", fs=80, cb=VERT_OK, ce=VERT_OK))  # posé au « 2 », son 7 dit avant
        e1, e2 = eg(60), eg(60)
        rangee(e1, r, e2, bon, buff=0.3).move_to(P(-3.6, -0.75))
        choix = [puiss(7, 2, fs=44), puiss(7, "−2", fs=44), puiss(1, "−2", fs=44)]
        plans = [[("7 puissance", [choix[0].base]), ("2.", [choix[0].expo])],
                 [("7 puissance", [choix[1].base]), ("moins", [choix[1].moins]), ("2.", [choix[1].chif])],
                 [("1 puissance", [choix[2].base]), ("moins", [choix[2].moins]), ("2.", [choix[2].chif])]]

        def avant(sc, q):
            sc.poser_idx(q[0], [(0, "7 puissance"), (1, "4 divisé"), (3, "par"), (5, "7 puissance"), (6, "6 ?")],
                         avec={0: [FadeIn(F.num.base, scale=1.3)], 1: [FadeIn(F.num.expo, scale=1.6)],
                               2: [Create(F.trait)], 3: [FadeIn(F.den.base, scale=1.3)],
                               4: [FadeIn(F.den.expo, scale=1.6)]})

        def apres(sc):
            lg = sc.rep_puiss(0, "Réponse B :", 7, "−2")
            sc.au("B :", FadeIn(lg.pre, shift=UP * 0.12), rt=0.25)
            sc.au("7 puissance", FadeIn(lg.p.base, shift=UP * 0.12), rt=0.25)
            sc.au("moins", FadeIn(lg.p.moins, scale=1.5), rt=0.2)
            sc.au("2.", FadeIn(lg.p.chif, lg.pt, shift=UP * 0.12), rt=0.25)
            sc.pieges(0, 2)
            l1 = sc.rep_ligne(1, ["4 −", "6 =", "−2."])
            sc.au("4 moins", FadeIn(l1[0], shift=UP * 0.12), FadeIn(e1), FadeIn(r.base, scale=1.3),
                  TransformFromCopy(F.num.expo, r.e1), rt=0.4)
            sc.au("6,", FadeIn(l1[1], shift=UP * 0.12), TransformFromCopy(F.den.expo, r.e2), rt=0.4)
            sc.au("2.", FadeIn(l1[2], shift=UP * 0.12), FadeIn(e2), FadeIn(bon, scale=1.3), rt=0.35)
            sc.insister(bon.expo, 1.6, 0.2, about=bon.expo.get_center())
            l3 = sc.rep_ligne(2, ["La base", "7"])
            sc.au("La base", FadeIn(l3[0], shift=UP * 0.12), rt=0.25)
            sc.au("7 ne", FadeIn(l3[1], shift=UP * 0.12),
                  Indicate(VGroup(F.num.base, F.den.base, r.base, bon.base), color=BASE_C, scale_factor=1.25), rt=0.4)
            l4 = sc.rep_ligne(3, ["ne change pas."])
            sc.au("ne change", FadeIn(l4[0], shift=UP * 0.12), rt=0.25)

        self.qpause("05q-question", "05r-reponse", ["7⁴ ÷ 7⁶ ?"], choix, plans, 1,
                    ["Réponse B : 7⁻².", "4 − 6 = −2.", "La base 7", "ne change pas."], avant=avant, apres=apres)

    # ── 06 : le piège : deux bases différentes, 2³ × 3² = 8 × 9 = 72 ────────
    def points(self, rangs, cols, c, r=0.11, pas=0.32):
        return VGroup(*[Dot(P(j * pas, -i * pas), radius=r, color=c) for i in range(rangs) for j in range(cols)])

    def ecran_piege(self):
        self.ecran("06-piege")
        tit = VGroup(T("Le piège :", 44, PIEGE), T("deux bases différentes", 44, JAUNE_TITRE)).arrange(RIGHT, buff=0.25)
        tit.move_to(P(-0.4, 3.15))
        self.au("Le piège", FadeIn(tit[0], shift=DOWN * 0.15), rt=0.35)
        self.au("deux bases", FadeIn(tit[1], shift=DOWN * 0.15), rt=0.35)
        a, b = puiss(2, 3, fs=90), puiss(3, 2, fs=90)
        fois = T("×", 72)
        rangee(a, fois, b, buff=0.6).move_to(P(-1.0, 1.85))
        self.au("2 puissance", FadeIn(a.base, scale=1.3), rt=0.3)
        self.au("3 fois", FadeIn(a.expo, scale=1.6), FadeIn(fois), rt=0.3)
        self.au("3 puissance", FadeIn(b.base, scale=1.3), rt=0.3)
        self.au("2 :", FadeIn(b.expo, scale=1.6), rt=0.3)
        nr = VGroup(T("les règles", 34, PIEGE), T("ne s'appliquent pas", 34, PIEGE)).arrange(DOWN, buff=0.08)
        nr.move_to(P(4.3, 1.0))
        rg = self.regle("×", 0, fs=40)
        rg.next_to(nr, UP, buff=0.25)
        sans_audit(rg)
        self.au("les règles", FadeIn(nr[0], shift=LEFT * 0.15), FadeIn(rg), a.base.animate.set_color(PIEGE),
                b.base.animate.set_color(PIEGE), rt=0.3)
        self.au("ne s'appliquent", FadeIn(nr[1], shift=LEFT * 0.15), Create(barre(rg, PIEGE, 7)), rt=0.3)
        self.play(Indicate(a.base, color=PIEGE, scale_factor=1.5), Indicate(b.base, color=PIEGE, scale_factor=1.5),
                  run_time=0.4)
        d8 = self.points(2, 4, BASE_C, r=0.13, pas=0.38).move_to(P(a.get_x(), 0.25))
        d9 = self.points(3, 3, BASE_C, r=0.13, pas=0.38).move_to(P(b.get_x(), 0.25))
        n8, x, n9, e, n72 = T("8", 66), T("×", 56), T("9", 66), eg(56), T("72", 72, VERT_OK)
        for m in (n8, x, n9, e, n72):
            m.set_y(-1.6)
        n8.set_x(d8.get_x())
        n9.set_x(d9.get_x())
        x.set_x((n8.get_x() + n9.get_x()) / 2)
        e.next_to(n9, RIGHT, buff=0.45)
        n72.next_to(e, RIGHT, buff=0.45)
        oc = T("On calcule :", 40).move_to(P(0, -0.8)).align_to(P(-6.0, 0), LEFT)
        self.au("On calcule", FadeIn(oc, shift=RIGHT * 0.2), TransformFromCopy(a, d8), rt=0.5)
        self.play(TransformFromCopy(b, d9), run_time=0.45)
        self.au("8 fois", FadeIn(n8, scale=1.3), FadeIn(x), Indicate(d8, color=WHITE), rt=0.35)
        self.au("9,", FadeIn(n9, scale=1.3), Indicate(d9, color=WHITE), rt=0.3)
        self.au("72.", FadeIn(e), FadeIn(n72, scale=1.4), rt=0.35)
        cad = self.encadrer(n72, buff=0.15)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(n72, cad), 1.3, 0.25)
        self.attendre_voix(marge=0.4)

    # ── 06q : QUESTION 3 (2³ × 3²) ──────────────────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        a, b = puiss(2, 3, fs=100), puiss(3, 2, fs=100)
        fois = T("×", 80)
        rangee(a, fois, b, buff=0.45).move_to(P(-3.7, 1.75))
        n72 = rangee(eg(70), T("72", 84, VERT_OK), buff=0.3).move_to(P(-3.7, 0.3))
        d8 = self.points(2, 4, BASE_C, r=0.09, pas=0.26).move_to(P(-5.0, -1.0))
        d9 = self.points(3, 3, BASE_C, r=0.09, pas=0.26).move_to(P(-2.4, -1.0))
        n8, x, n9 = T("8", 56), T("×", 48), T("9", 56)
        for m in (n8, x, n9):
            m.set_y(-2.05)
        n8.set_x(d8.get_x())
        n9.set_x(d9.get_x())
        x.set_x((n8.get_x() + n9.get_x()) / 2)
        choix = [puiss(6, 5, fs=44), T("72", 44), puiss(6, 6, fs=44)]
        plans = [[("6 puissance", [choix[0].base]), ("5.", [choix[0].expo])],
                 [("72.", [choix[1]])],
                 [("6 puissance", [choix[2].base]), ("6.", [choix[2].expo])]]

        def avant(sc, q):
            sc.poser_idx(q[0], [(0, "2 puissance"), (1, "3 fois"), (5, "3 puissance"), (6, "2 ?")],
                         avec={0: [FadeIn(a.base, scale=1.3)], 1: [FadeIn(a.expo, scale=1.6), FadeIn(fois)],
                               2: [FadeIn(b.base, scale=1.3)], 3: [FadeIn(b.expo, scale=1.6)]})

        def apres(sc):
            l0 = sc.rep_ligne(0, ["Réponse B :", "72."])
            sc.au("B :", FadeIn(l0[0], shift=UP * 0.12), rt=0.25)
            sc.au("72.", FadeIn(l0[1], shift=UP * 0.12), FadeIn(n72, scale=1.3), rt=0.3)
            sc.pieges(0, 2)
            l1 = sc.rep_ligne(1, ["Les bases sont"])
            sc.au("Les bases", FadeIn(l1[0], shift=UP * 0.12), a.base.animate.set_color(PIEGE),
                  b.base.animate.set_color(PIEGE), rt=0.35)
            l1b = sc.rep_ligne(2, ["différentes :"])
            sc.au("différentes", FadeIn(l1b[0], shift=UP * 0.12), rt=0.3)
            l2 = sc.rep_ligne(3, ["on calcule", "8 ×", "9."])
            sc.au("on calcule", FadeIn(l2[0], shift=UP * 0.12), TransformFromCopy(a, d8), TransformFromCopy(b, d9),
                  rt=0.5)
            sc.au("8 fois", FadeIn(l2[1], shift=UP * 0.12), FadeIn(n8, scale=1.3), FadeIn(x), rt=0.3)
            sc.au("9.", FadeIn(l2[2], shift=UP * 0.12), FadeIn(n9, scale=1.3), rt=0.3)
            sc.insister(n72, 1.25, 0.25)

        self.qpause("06q-question", "06r-reponse", ["2³ × 3² ?"], choix, plans, 1,
                    ["Réponse B : 72.", "Les bases sont", "différentes :", "on calcule 8 × 9."], avant=avant, apres=apres)

    # ── 07 : défi : (4⁵ × 4⁻²) ÷ 4³ en une seule puissance ─────────────────
    def defi_frac(self, fs=76):
        n1, n2 = puiss(4, 5, fs=fs), puiss(4, "−2", fs=fs)
        x = T("×", fs * 0.8)
        num = rangee(n1, x, n2, buff=0.3)
        den = puiss(4, 3, fs=fs)
        f = fracm(num, den)
        f.n1, f.x, f.n2 = n1, x, n2
        return f

    def coffre(self, x, y, s=1.0):
        cd = cadenas(1.2 * s).move_to(P(x, y))
        k = cle(0.9 * s).move_to(P(x, y - 1.35 * s))
        return cd, k

    def ecran_defi(self):
        self.ecran("07-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.au("À toi", Write(tit), rt=0.6)
        cd, k = self.coffre(-5.1, 0.7)
        qm = T("?", 60, EXPO_C, audit=False).next_to(cd, UP, buff=0.2)
        self.play(FadeIn(cd, scale=0.6), FadeIn(k, shift=UP * 0.3), FadeIn(qm, scale=1.5), run_time=0.5)
        l1 = VGroup(T("Écris sous la forme", 38), T("d'une seule puissance :", 38)).arrange(DOWN, aligned_edge=LEFT,
                                                                                          buff=0.12)
        l1.move_to(P(0, 1.95)).align_to(P(-3.3, 0), LEFT)
        self.au("Écris", FadeIn(l1[0], shift=RIGHT * 0.2), rt=0.35)
        self.au("d'une seule", FadeIn(l1[1], shift=RIGHT * 0.2), rt=0.35)
        f = self.defi_frac().move_to(P(0.6, -0.2))
        self.au("4 puissance", FadeIn(f.n1.base, scale=1.3), rt=0.3)
        self.au("5 fois", FadeIn(f.n1.expo, scale=1.6), FadeIn(f.x), rt=0.3)
        self.au("4 puissance", FadeIn(f.n2.base, scale=1.3), rt=0.3)
        self.au("moins", FadeIn(f.n2.moins, scale=1.8), rt=0.2)
        self.au("2,", FadeIn(f.n2.chif, scale=1.6), rt=0.25)
        self.au("le tout", Indicate(f.num, color=WHITE, scale_factor=1.1), rt=0.35)
        self.au("divisé", Create(f.trait), rt=0.3)
        self.au("4 puissance", FadeIn(f.den.base, scale=1.3), rt=0.3)
        self.au("3.", FadeIn(f.den.expo, scale=1.6), rt=0.3)
        self.au("Mets pause")
        pz = T("Mets pause, et cherche !", 36, ORANGE_RETENUE).move_to(P(0.6, -2.35))
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    # ── 07b : correction : 4³ / 4³ = 4³⁻³ = 4⁰ = 1, la clé ouvre ───────────
    def ecran_correction(self):
        self.ecran("07b-correction", 0.5)
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.play(Write(tit), run_time=0.5)
        f = sans_audit(self.defi_frac(fs=60))
        f2 = fracm(puiss(4, 3, fs=64), puiss(4, 3, fs=64))
        r = expo2(4, "3", "−3", fs=64)
        p0 = puiss(4, 0, fs=64)
        un = T("1", 76, VERT_OK)
        es = [eg(54) for _ in range(4)]
        rangee(f, es[0], f2, es[1], r, es[2], p0, es[3], un, buff=0.28).move_to(P(-0.9, 0.2))
        un.shift(RIGHT * 0.2)
        self.play(FadeIn(f), run_time=0.4)
        cd, k = self.coffre(5.2, 2.35, 0.75)
        k.move_to(P(3.4, 2.35))
        self.play(FadeIn(cd), FadeIn(k), run_time=0.3)
        n = VGroup(T("5 +", 36, EXPO_C), T("(−2)", 36, EXPO_C), T("= 3", 36, EXPO_C)).arrange(RIGHT, buff=0.15)
        n.next_to(f, UP, buff=0.35)
        self.au("En haut", Indicate(f.num, color=EXPO_C, scale_factor=1.1), rt=0.4)
        self.au("5 plus", FadeIn(n[0], shift=UP * 0.12), Indicate(f.n1.expo, color=EXPO_C, scale_factor=1.5), rt=0.3)
        self.au("2,", FadeIn(n[1], shift=UP * 0.12), Indicate(f.n2.expo, color=EXPO_C, scale_factor=1.5), rt=0.3)
        self.au("3 :", FadeIn(n[2], scale=1.3), rt=0.3)
        self.au("4 puissance", FadeIn(es[0]), FadeIn(f2.num.base, scale=1.3), rt=0.3)
        self.au("3.", ReplacementTransform(n[2][-1].copy(), f2.num.expo), rt=0.4)
        self.au("Divisé", Create(f2.trait), rt=0.3)
        self.au("4 puissance", FadeIn(f2.den.base, scale=1.3), rt=0.3)
        self.au("3 :", FadeIn(f2.den.expo, scale=1.6), rt=0.3)
        self.au("3 moins", FadeIn(es[1]), FadeIn(r.base, scale=1.3), FadeIn(r.e1, scale=1.6), rt=0.3)
        self.au("3,", FadeIn(r.e2, scale=1.6), rt=0.3)
        zero = T("= 0", 34, EXPO_C).next_to(r, DOWN, buff=0.3)
        self.au("0.", FadeIn(zero, shift=UP * 0.12), Indicate(r.expo, color=EXPO_C, scale_factor=1.4), rt=0.35)
        self.au("4 puissance", FadeIn(es[2]), FadeIn(p0.base, scale=1.3), rt=0.3)
        self.au("0 :", FadeIn(p0.expo, scale=1.6), rt=0.3)
        self.au("1 !", FadeIn(es[3]), FadeIn(un, scale=1.5), k.animate.move_to(cd.corps.get_center() + LEFT * 0.75),
                rt=0.45)
        self.play(cd.anse.animate.shift(UP * 0.2).rotate(0.5, about_point=cd.anse.get_right()),
                  cd.corps.animate.set_stroke(VERT_OK, width=5), run_time=0.4)
        cad = self.encadrer(un, buff=0.15)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(un, cad), 1.4, 0.25)
        self.attendre_voix(marge=0.5)

    # ── 08 : ce que tu as appris ───────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au("Ce que", Write(tit), rt=0.7)
        X0 = -6.0
        l0 = T("Avec la même base :", 38, CIEL).move_to(P(0, 2.25)).align_to(P(X0, 0), LEFT)
        self.au("Avec la", FadeIn(l0, shift=RIGHT * 0.2), rt=0.35)
        lignes = []
        for y, txts in ((1.55, ["pour multiplier,", "on additionne les exposants ;"]),
                        (0.3, ["pour diviser,", "on les soustrait."])):
            ck = self.coche()
            ts = VGroup(*[T(t, 34) for t in txts]).arrange(RIGHT, buff=0.2)
            VGroup(ck, ts).arrange(RIGHT, buff=0.3).move_to(P(0, y)).align_to(P(X0, 0), LEFT)
            lignes.append((ck, ts))
        f1 = sans_audit(self.regle("×", 0.93, fs=46))
        f2 = sans_audit(self.regle("÷", -0.32, fs=46))
        for fm in (f1, f2):
            fm.align_to(P(X0 + 0.8, 0), LEFT)
        (c1, t1), (c2, t2) = lignes
        self.au("pour multiplier", Create(c1), FadeIn(t1[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("on additionne", FadeIn(t1[1], shift=RIGHT * 0.15), FadeIn(f1, shift=UP * 0.1), rt=0.4)
        self.au("pour diviser", Create(c2), FadeIn(t2[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("on les", FadeIn(t2[1], shift=RIGHT * 0.15), FadeIn(f2, shift=UP * 0.1), rt=0.4)
        c3 = self.coche()
        l3 = VGroup(c3, T("La base ne change pas.", 34, BASE_C)).arrange(RIGHT, buff=0.3)
        l3.move_to(P(0, -0.95)).align_to(P(X0, 0), LEFT)
        self.au("La base", Create(c3), FadeIn(l3[1], shift=RIGHT * 0.15), rt=0.35)
        c4 = self.coche(PIEGE)
        t4a = T("Avec des bases différentes,", 34)
        VGroup(c4, t4a).arrange(RIGHT, buff=0.3).move_to(P(0, -1.6)).align_to(P(X0, 0), LEFT)
        t4 = VGroup(t4a, T("pas de règle :", 34, PIEGE), T("on calcule.", 34))
        VGroup(t4[1], t4[2]).arrange(RIGHT, buff=0.2).next_to(t4a, DOWN, buff=0.18).align_to(t4a, LEFT)
        self.au("Avec des", Create(c4), FadeIn(t4[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("pas de", FadeIn(t4[1], shift=RIGHT * 0.15), rt=0.3)
        self.au("on calcule", FadeIn(t4[2], shift=RIGHT * 0.15), rt=0.3)
        ep = VGroup(T("Épisode 9 :", 34, JAUNE_TITRE), T("la puissance d'une puissance", 34)).arrange(RIGHT, buff=0.22)
        ep.move_to(P(0, -3.05)).align_to(P(X0, 0), LEFT)
        self.au("9 t'attend", FadeIn(ep[0], shift=UP * 0.15), rt=0.35)
        self.au("la puissance", FadeIn(ep[1], shift=UP * 0.15), rt=0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_cle()
        self.ecran_produit()
        self.ecran_question1()
        self.ecran_quotient()
        self.ecran_zero()
        self.ecran_negatif()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class PuissanceProduitQuotient2de(PuissanceProduitQuotientBase):
    identite = "Maths 2de — EleveAI"
    ceinture = "verte"
