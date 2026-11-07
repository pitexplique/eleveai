# premier_decomposer.py
# EleveAI — Maths 4e — série « Divisibilité et nombres premiers », épisode 10 : DÉCOMPOSER EN
# FACTEURS PREMIERS. Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : premier_decomposer.
# Décor et métier : Nathan, ingénieur en cybersécurité. Centres : technologie-ia.
# Écrans : garde (00) ; les codes de Nathan (01) ; on casse 84 (02) ; le résultat (03) ;
# deux contrôles (04) ; QUESTION 1 (04q) ; simplifier une fraction (05) ; le piège (06) ;
# QUESTION 2 (06q) ; défi (07) et correction (07b) ; ce que tu as appris (08) ; fin (09).
# Code couleur : les facteurs premiers (les briques) en jaune ; juste vert ; piège rouge.
# Seul épisode de la série avec des fractions : 84 sur 126 et 2 sur 3, écrites en vraies fractions.
# Voix : manim/voix/4e-premier-decomposer.json ; marques : premier_decomposer_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/premier_decomposer.py PremierDecomposer4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/premier_decomposer.py PremierDecomposer4e -o eleveai-maths-4e-premier-decomposer --media_dir manim/scripts/4e/media-div-10
# Sortie : manim/sorties/4e/maths/divisibilite/10-decomposer/eleveai-maths-4e-premier-decomposer.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from div_commun import *  # noqa: E402,F403

BRIQUE = "#b45309"
BRIQUE_BORD = "#7c2d12"
FACTEUR = JAUNE_TITRE   # un facteur premier, une brique


def nathan_cyber(s=0.72):
    """Nathan : le sweat bleu nuit, les lunettes, un casque de hotline."""
    p = personne(peau="#e0ac69", tenue="#1e3a8a", cheveux="#3f2a14", s=s)
    return VGroup(p, lunettes(p))


def cadenas(s=1.0, c="#facc15"):
    """Un cadenas fermé : l'anse et le corps."""
    anse = Arc(radius=0.17 * s, start_angle=0, angle=PI, stroke_color="#cbd5e1", stroke_width=7 * s)
    corps = RoundedRectangle(width=0.5 * s, height=0.4 * s, corner_radius=0.06 * s, fill_color=c, fill_opacity=1, stroke_width=0)
    anse.next_to(corps, UP, buff=-0.02 * s)
    trou = Circle(radius=0.05 * s, fill_color="#78350f", fill_opacity=1, stroke_width=0).move_to(corps)
    return VGroup(anse, corps, trou)


def ordi(s=1.0):
    """Un ordinateur portable, un cadenas sur l'écran (le paiement protégé)."""
    ecran = RoundedRectangle(width=1.9 * s, height=1.2 * s, corner_radius=0.08 * s, fill_color="#0f172a", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=4)
    base = Polygon(P(-1.15 * s, 0), P(1.15 * s, 0), P(0.95 * s, 0.14 * s), P(-0.95 * s, 0.14 * s),
                   fill_color="#94a3b8", fill_opacity=1, stroke_width=0)
    base.next_to(ecran, DOWN, buff=0.02)
    carte = RoundedRectangle(width=0.62 * s, height=0.4 * s, corner_radius=0.05 * s, fill_color="#2563eb", fill_opacity=1,
                             stroke_width=0).move_to(ecran.get_center() + LEFT * 0.42 * s)
    puce = Rectangle(width=0.14 * s, height=0.1 * s, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    puce.move_to(carte.get_center() + LEFT * 0.14 * s + UP * 0.04 * s)
    cad = cadenas(0.75 * s).move_to(ecran.get_center() + RIGHT * 0.45 * s)
    return VGroup(ecran, base, carte, puce, cad)


def brique(w=0.62, h=0.3, c=BRIQUE):
    return RoundedRectangle(width=w, height=h, corner_radius=0.04, fill_color=c, fill_opacity=1,
                            stroke_color=BRIQUE_BORD, stroke_width=2)


def mur(lignes, colonnes, w=0.62, h=0.3, centre=ORIGIN):
    """Un mur de briques : une rangée sur deux décalée d'une demi-brique."""
    g = VGroup()
    for i in range(lignes):
        dec = w / 2 if i % 2 else 0
        for j in range(colonnes - (1 if i % 2 else 0)):
            g.add(brique(w - 0.04, h - 0.04).move_to(P((j - (colonnes - 1) / 2) * w + dec, ((lignes - 1) / 2 - i) * h)))
    return g.move_to(centre)


def bloc(s, fs=40, w=0.95, h=0.6, c=BRIQUE, texte=FACTEUR):
    """Une brique écrite (un facteur premier) : la brique et son nombre."""
    b = brique(w, h, c)
    return VGroup(b, T(s, fs, texte, audit=False, gras=True).move_to(b))


def rangee(nombres, centre=ORIGIN, fs=40, w=0.95, h=0.6, buff=0.08):
    return VGroup(*[bloc(str(n), fs, w, h) for n in nombres]).arrange(RIGHT, buff=buff).move_to(centre)


def marteau(s=1.0):
    manche = RoundedRectangle(width=0.16 * s, height=1.3 * s, corner_radius=0.05 * s, fill_color="#a16207", fill_opacity=1, stroke_width=0)
    tete = RoundedRectangle(width=0.72 * s, height=0.3 * s, corner_radius=0.06 * s, fill_color="#64748b", fill_opacity=1,
                            stroke_color="#334155", stroke_width=2)
    tete.next_to(manche, UP, buff=-0.05 * s)
    return VGroup(manche, tete).rotate(0.45)


def jaunir(e, *idx):
    for i in idx:
        e.atomes[i].set_color(FACTEUR)
    return e


class Frac(VGroup):
    """Une vraie fraction posée au mot : .num, .barre (dite « sur »), .den ; .atomes pour dire_eq."""

    def __init__(self, num, den, fs=56, couleur=WHITE, audit=True, **kw):
        super().__init__(**kw)
        self.s = f"{num} sur {den}"
        self.num = E(num, fs, couleur, lettres="", audit=audit)
        self.den = E(den, fs, couleur, lettres="", audit=audit)
        w = max(self.num.width, self.den.width) + 0.3
        self.barre = Line(LEFT * w / 2, RIGHT * w / 2, color=couleur, stroke_width=5)
        self.barre.original_text = "sur"
        self.num.next_to(self.barre, UP, buff=0.14)
        self.den.next_to(self.barre, DOWN, buff=0.14)
        self.add(self.num, self.barre, self.den)
        self.atomes = list(self.num.atomes) + [self.barre] + list(self.den.atomes)

    def sans_audit(self):
        self.num.sans_audit()
        self.den.sans_audit()
        return self


class Cascade(VGroup):
    """La colonne des divisions : les nombres à gauche du trait, les diviseurs premiers à droite.
    .n[k] et .d[k] (Text, audit=False) : le script les pose au mot."""

    def __init__(self, nombres, diviseurs, x=-3.6, y0=2.2, pas=0.95, fs=54, **kw):
        super().__init__(**kw)
        self.n, self.d = [], []
        for k, v in enumerate(nombres):
            t = T(str(v), fs, VERT_OK if v == 1 else WHITE, audit=False).move_to(P(0, y0 - k * pas))
            self.n.append(t.align_to(P(x - 0.32, 0), RIGHT))
        for k, v in enumerate(diviseurs):
            t = T(str(v), fs, FACTEUR, audit=False).move_to(P(0, y0 - k * pas))
            self.d.append(t.align_to(P(x + 0.32, 0), LEFT))
        self.trait = Line(P(x, y0 + pas * 0.45), P(x, y0 - (len(nombres) - 1) * pas - pas * 0.45), color="#cbd5e1", stroke_width=5)
        self.add(self.trait)

    def remplie(self):
        for m in self.n + self.d:
            self.add(m)
        return self


class PremierDecomposer4e(PaysageDiv):
    nom_voix = "4e-premier-decomposer"
    fichier_marques = "premier_decomposer_marques.json"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Décomposer en facteurs premiers", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Décomposer", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        m = mur(6, 6, centre=P(-4.4, 0.3))
        mt = marteau(0.9).move_to(P(-2.55, 0.85))
        l1 = self.lg("Comment casser un nombre", 2.0, 0.75, 46, maxw=8)
        self.dit(l1, "Comment casser un nombre", avec=[LaggedStart(*[FadeIn(b, scale=0.5) for b in m], lag_ratio=0.03)])
        l2 = self.lg("en briques ?", 2.0, -0.1, 54, JAUNE_TITRE, maxw=8)
        self.dit(l2, "en briques ?", avec=[FadeIn(mt, shift=DOWN * 0.3)])
        self.play(Rotate(mt, -0.6, about_point=mt.get_bottom()), run_time=0.2)
        self.play(Rotate(mt, 0.6, about_point=mt.get_bottom()), run_time=0.2)
        self.insister(l2, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les codes de Nathan ────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = nathan_cyber(0.9).move_to(P(-5.75, 2.1))
        pc = ordi(1.1).move_to(P(-3.3, 1.75))
        m = mur(4, 7, centre=P(-3.6, -1.2))
        self.dit(self.lg("Nathan est ingénieur", 2.75, 3.0, 42, CIEL, maxw=7.0), "Nathan est ingénieur", avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.lg("en cybersécurité :", 2.75, 2.4, 42, CIEL, maxw=7.0), "en cybersécurité :")
        self.dit(self.lg("il protège les paiements en ligne.", 2.75, 1.7, 36, maxw=7.0), "il protège les paiements en ligne.",
                 avec=[FadeIn(pc, shift=UP * 0.2)])
        self.dit(self.lg("Ses codes secrets reposent", 2.75, 0.95, 36, maxw=7.0), "Ses codes secrets reposent",
                 avec=[Indicate(pc[4], color=JAUNE_TITRE)])
        self.dit(self.lg("sur une idée simple :", 2.75, 0.35, 36, maxw=7.0), "sur une idée simple :")
        q1 = self.lg("tout nombre se casse", 2.75, -0.45, 42, JAUNE_TITRE, maxw=7.0)
        self.dit(q1, "tout nombre se casse")
        q2 = self.lg("en nombres premiers,", 2.75, -1.1, 42, JAUNE_TITRE, maxw=7.0)
        self.dit(q2, "en nombres premiers,")
        self.insister(VGroup(q1, q2), 1.1, 0.2)
        self.dit(self.lg("comme un mur en briques.", 2.75, -1.75, 38, maxw=7.0), "comme un mur en briques.",
                 avec=[LaggedStart(*[FadeIn(b, scale=0.5) for b in m], lag_ratio=0.03)])
        c84 = self.lg("Commençons par 84.", 2.6, -2.6, 44, VERT_OK, maxw=5.0)
        self.dit(c84, "Commençons par 84.")
        self.insister(c84, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : on casse 84 ────────────────────────────────────────────────────
    def ecran_casser(self):
        self.ecran("02-casser")
        cas = Cascade([84, 42, 21, 7, 1], [2, 2, 3, 7])
        self.dit(self.lg("On divise par le plus petit nombre premier possible.", 0, 3.2, 38, JAUNE_TITRE, maxw=12.4),
                 "On divise par le plus petit nombre premier possible.",
                 avec=[Create(cas.trait), FadeIn(cas.n[0], scale=1.2)])
        X = 2.9

        def division(s, phrase, y, k):
            e = F(s, 46).move_to(P(X, y))
            jaunir(e, 2)
            self.poser_avec(e, phrase, {2: lambda: [FadeIn(cas.d[k], scale=1.4)],
                                        4: lambda: [FadeIn(cas.n[k + 1], scale=1.4)]})
            return e

        division("84 ÷ 2 = 42", "84 divisé par 2 égale 42.", 2.2, 0)
        division("42 ÷ 2 = 21", "42 divisé par 2 égale 21.", 1.5, 1)
        r21 = SurroundingRectangle(cas.n[2], color=CIEL, buff=0.1, stroke_width=4)
        self.dit(self.lg("21 n'est pas pair :", X, 0.75, 36, CIEL), "21 n'est pas pair :", avec=[Create(r21)])
        self.dit(self.lg("on passe à 3.", X, 0.15, 36, CIEL), "on passe à 3.")
        division("21 ÷ 3 = 7", "21 divisé par 3 égale 7.", -0.6, 2)
        o7 = Circle(radius=0.42, color=VERT_OK, stroke_width=5).move_to(cas.n[3])
        self.dit(self.lg("7 est premier :", X, -1.3, 38, VERT_OK), "7 est premier :", avec=[Create(o7)])
        division("7 ÷ 7 = 1", "7 divisé par 7 égale 1.", -2.0, 3)
        stop = self.lg("On s'arrête.", X, -2.75, 42, JAUNE_TITRE, maxw=3.6)
        self.dit(stop, "On s'arrête.", avec=[Create(SurroundingRectangle(cas.n[4], color=VERT_OK, buff=0.12, stroke_width=4))])
        self.insister(stop, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : le résultat ────────────────────────────────────────────────────
    def ecran_resultat(self):
        self.ecran("03-resultat")
        cas = Cascade([84, 42, 21, 7, 1], [2, 2, 3, 7]).remplie()
        self.play(FadeIn(cas), run_time=0.3)
        col = SurroundingRectangle(VGroup(*cas.d), color=FACTEUR, buff=0.16, stroke_width=4)
        e = jaunir(F("84 = 2 × 2 × 3 × 7", 56), 2, 4, 6, 8).move_to(P(2.5, 2.2))
        self.dire_eq(e, "Donc 84 égale 2 fois 2 fois 3 fois 7.", echelle=1.2, avec=[Create(col)])
        self.play(Create(self.cadre_ok(e, 0.18)), run_time=0.25)
        mur4 = rangee([2, 2, 3, 7], centre=P(2.5, -1.35), fs=44, w=1.1, h=0.7)
        l1 = self.lg("Et c'est la seule décomposition", 2.5, 0.95, 38, CIEL, maxw=7.2)
        self.dit(l1, "Et c'est la seule décomposition",
                 avec=[LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in mur4], lag_ratio=0.15)])
        self.dit(self.lg("possible, à l'ordre près.", 2.5, 0.3, 38, CIEL, maxw=7.2), "possible, à l'ordre près.")
        # à l'ordre près : les briques changent de place, c'est la même décomposition
        ici = [b.get_center() for b in mur4]
        self.play(mur4[0].animate.move_to(ici[3]), mur4[3].animate.move_to(ici[0]),
                  mur4[1].animate.move_to(ici[2]), mur4[2].animate.move_to(ici[1]), run_time=0.7)
        self.play(*[mur4[k].animate.move_to(ici[k]) for k in range(4)], run_time=0.6)
        self.insister(l1, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 04 : deux contrôles ─────────────────────────────────────────────────
    def ecran_controle(self):
        self.ecran("04-controle")
        tit = self.lg("Deux contrôles.", 0, 3.2, 46, JAUNE_TITRE, maxw=10)
        self.dit(tit, "Deux contrôles.")
        self.dit(self.lg("Chaque facteur est premier :", -3.3, 2.15, 38, CIEL, maxw=5.4), "Chaque facteur est premier :")
        br = rangee([2, 2, 3, 7], centre=P(-3.2, 0.1), fs=44, w=1.1, h=0.7)
        ok = [self.coche(VERT_OK, 0.2).next_to(b, DOWN, buff=0.18) for b in br]
        e = jaunir(F("2, 2, 3 et 7.", 50), 0, 2, 4, 6).move_to(P(-3.2, 1.3))
        self.poser_avec(e, "2, 2, 3 et 7.", {i: (lambda k=k: [FadeIn(br[k], scale=1.3), Create(ok[k])]) for k, i in enumerate((0, 2, 4, 6))})
        self.dit(self.lg("Et le produit redonne 84 :", 3.4, 2.15, 38, CIEL, maxw=5.4), "Et le produit redonne 84 :")
        lignes = [("2 × 2 = 4", "2 fois 2, 4", 1.3), ("4 × 3 = 12", "fois 3, 12", 0.5), ("12 × 7 = 84", "fois 7, 84", -0.3)]
        der = None
        for s, ph, y in lignes:
            der = F(s, 48).mis_sur_egal(3.9, y)
            self.dire_eq(der, ph, echelle=1.2)
        der.atomes[-1].set_color(VERT_OK)
        self.play(Create(SurroundingRectangle(der.atomes[-1], color=VERT_OK, buff=0.1, stroke_width=4, corner_radius=0.06)), run_time=0.25)
        self.attendre_voix(marge=0.8)

    # ── 04q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        b60 = bloc("60", 72, 2.4, 1.3).move_to(P(-3.6, 0.2))
        mt = marteau(1.1).move_to(P(-1.75, 1.35))

        def avant(sc):
            sc.eq_dans_q(0, "Quelle est la", "Quelle est la", lettres="")
            sc.eq_dans_q(0, "décomposition de 60 ?", "décomposition de 60 ?", lettres="")
            sc.play(FadeIn(b60, scale=0.8), FadeIn(mt), run_time=0.4)

        def apres(sc):
            ca, cc = sc.cartes_q[0][1][1], sc.cartes_q[2][1][1]
            sc.ph_eq(0, "Réponse B.", "Réponse B.", premier=True)
            sc.ph_eq(1, "Dans A, 15 n'est pas premier.", "Dans A, 15 n'est pas premier.")
            sc.play(Create(sc.barrer(ca.atomes[-1])), run_time=0.25)
            sc.ph_eq(2, "Dans C, 4 n'est pas premier.", "Dans C, 4 n'est pas premier.")
            sc.play(Create(sc.barrer(cc.atomes[0])), run_time=0.25)
            sc.ph_eq(3, "2 × 2 × 3 × 5 = 60.", "2 fois 2 fois 3 fois 5 égale 60.")
            sc.rep_fini()

        self.question_pause("04q-question", "04r-reponse", ["Quelle est la", "décomposition de 60 ?"],
                            [E("2 × 2 × 15", 40, lettres=""), E("2 × 2 × 3 × 5", 40, lettres=""), E("4 × 3 × 5", 40, lettres="")], 1,
                            ["Réponse B.", "Dans A, 15 n'est pas premier.", "Dans C, 4 n'est pas premier.", "2 × 2 × 3 × 5 = 60."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : simplifier une fraction ────────────────────────────────────────
    def ecran_fraction(self):
        self.ecran("05-fraction")
        self.dit(self.lg("À quoi ça sert ?", 0, 3.2, 44, CIEL, maxw=10), "À quoi ça sert ?")
        sous = self.lg("À simplifier une fraction d'un coup.", 0, 2.55, 40, JAUNE_TITRE, maxw=11)
        self.dit(sous, "À simplifier une fraction d'un coup.")
        f = Frac("84", "126", 60).move_to(P(-4.6, 0.75))
        self.dire_eq(f, "84 sur 126.", echelle=1.2)
        X0 = 0.4
        e1 = jaunir(F("84 = 2 × 2 × 3 × 7", 44), 2, 4, 6, 8).mis_sur_egal(X0, 1.25)
        self.dire_eq(e1, "84 égale 2 fois 2 fois 3 fois 7.", echelle=1.15,
                     avec=[Indicate(f.num, color=JAUNE_TITRE)])
        e2 = jaunir(F("126 = 2 × 3 × 3 × 7", 44), 2, 4, 6, 8).mis_sur_egal(X0, 0.45)
        self.dire_eq(e2, "126 égale 2 fois 3 fois 3 fois 7.", echelle=1.15,
                     avec=[Indicate(f.den, color=JAUNE_TITRE)])
        g = Frac("2 × 2 × 3 × 7", "2 × 3 × 3 × 7", 48).sans_audit().move_to(P(-1.6, -1.55))
        for a in g.num.atomes[::2] + g.den.atomes[::2]:
            a.set_color(FACTEUR)
        self.au("On barre", TransformFromCopy(VGroup(*e1.droite), g.num), TransformFromCopy(VGroup(*e2.droite), g.den),
                FadeIn(g.barre), rt=0.6)
        for mot, i, j in (("un 2", 0, 0), ("un 3", 4, 2), ("un 7", 6, 6)):
            self.au(mot, Create(self.barrer(g.num.atomes[i], sw=6)), Create(self.barrer(g.den.atomes[j], sw=6)),
                    g.num.atomes[i].animate.set_opacity(0.45), g.den.atomes[j].animate.set_opacity(0.45), rt=0.3)
        reste = [g.num.atomes[2], g.den.atomes[4]]
        self.au("en haut", Indicate(g.num, color=CIEL, scale_factor=1.05), rt=0.4)
        self.au("en bas", Indicate(g.den, color=CIEL, scale_factor=1.05), rt=0.4)
        r = Frac("2", "3", 60, couleur=VERT_OK)
        eg = T("=", 60, WHITE)
        eg.original_text = "="
        res = VGroup(eg, r).arrange(RIGHT, buff=0.35).move_to(P(2.6, -1.55))
        eg.set_y(r.barre.get_y())
        res.atomes = [eg] + r.atomes
        res.s = "= 2 sur 3"
        self.dire_eq(res, "Il reste 2 sur 3.", echelle=1.25,
                     avec=[a.animate.set_color(VERT_OK).scale(1.15) for a in reste])
        self.play(Create(self.cadre_ok(r, 0.16)), run_time=0.25)
        self.attendre_voix(marge=0.8)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.dit(self.lg("Le piège : garder un facteur qui n'est pas premier.", 0, 3.2, 38, PIEGE, maxw=12.4),
                 "Le piège : garder un facteur qui n'est pas premier.")
        e = F("84 = 2 × 6 × 7", 56).move_to(P(-3.0, 2.0))
        jaunir(e, 2, 6)
        self.dire_eq(e, "84 égale 2 fois 6 fois 7 :", echelle=1.2)
        self.dit(self.lg("c'est juste,", 3.3, 2.0, 40, VERT_OK), "c'est juste,")
        six = e.atomes[4]
        rond = Circle(radius=0.42, color=PIEGE, stroke_width=5).move_to(six)
        self.dit(self.lg("mais 6 se casse encore", 3.3, 1.1, 38), "mais 6 se casse encore",
                 avec=[Create(rond), six.animate.set_color(PIEGE)])
        b2 = bloc("2", 40, 0.85, 0.58).move_to(six.get_center() + P(-0.65, -1.45))
        b3 = bloc("3", 40, 0.85, 0.58).move_to(six.get_center() + P(0.65, -1.45))
        br1 = Line(six.get_bottom() + DOWN * 0.38, b2.get_top() + UP * 0.05, color=PIEGE, stroke_width=5)
        br2 = Line(six.get_bottom() + DOWN * 0.38, b3.get_top() + UP * 0.05, color=PIEGE, stroke_width=5)
        l = self.lg("en 2 × 3.", 3.3, 0.45, 42, JAUNE_TITRE)
        self.poser_avec(l, "en 2 fois 3.", {1: lambda: [Create(br1), FadeIn(b2, scale=1.3)], 3: lambda: [Create(br2), FadeIn(b3, scale=1.3)]})
        rap = jaunir(F("84 = 2 × 2 × 3 × 7 × 1", 42), 2, 4, 6, 8).sans_audit().move_to(P(-0.4, -1.75))
        self.dit(self.lg("Et on n'écrit jamais × 1 :", -0.4, -0.95, 40, maxw=8), "Et on n'écrit jamais fois 1 :",
                 avec=[FadeIn(rap)])
        fois1 = VGroup(rap.atomes[-2], rap.atomes[-1])
        non = self.lg("1 n'est pas premier.", -0.4, -2.6, 42, PIEGE, maxw=8)
        self.dit(non, "1 n'est pas premier.", avec=[Create(self.barrer(fois1, sw=7)), fois1.animate.set_color(PIEGE)])
        self.insister(non, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        b45 = bloc("45", 72, 2.4, 1.3).move_to(P(-3.6, 0.2))
        mt = marteau(1.1).move_to(P(-1.75, 1.35))

        def avant(sc):
            sc.eq_dans_q(0, "Quelle est la", "Quelle est la", lettres="")
            sc.eq_dans_q(0, "décomposition de 45 ?", "décomposition de 45 ?", lettres="")
            sc.play(FadeIn(b45, scale=0.8), FadeIn(mt), run_time=0.4)

        def apres(sc):
            sc.reponse(("Réponse A : 3 × 3 × 5.", "Réponse A : 3 fois 3 fois 5."),
                       ("9 et 15 ne sont pas premiers :", "9 et 15 ne sont pas premiers :"),
                       ("ils se cassent encore.", "ils se cassent encore."))

        self.question_pause("06q-question", "06r-reponse", ["Quelle est la", "décomposition de 45 ?"],
                            [E("3 × 3 × 5", 40, lettres=""), E("5 × 9", 40, lettres=""), E("3 × 15", 40, lettres="")], 0,
                            ["Réponse A : 3 × 3 × 5.", "9 et 15 ne sont pas premiers :", "ils se cassent encore."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        p = nathan_cyber().move_to(P(-5.6, 0.7))
        b90 = bloc("90", 72, 2.4, 1.3).move_to(P(-2.9, 0.75))
        q1 = self.lg("Décompose 90", 3.2, 1.25, 50, JAUNE_TITRE, maxw=5.6)
        self.poser_avec(q1, "Décompose 90", {1: lambda: [FadeIn(p), FadeIn(b90, scale=0.8)]})
        q2 = self.lg("en facteurs premiers.", 3.2, 0.45, 44, JAUNE_TITRE, maxw=5.6)
        self.dit(q2, "en facteurs premiers.")
        self.insister(VGroup(q1, q2), 1.1, 0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.9))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("07b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.15))), rt=0.25)
        cas = Cascade([90, 45, 15, 5], [2, 3, 3], y0=2.2, pas=0.9, fs=52)
        self.play(Create(cas.trait), FadeIn(cas.n[0]), run_time=0.3)
        X = 2.9
        for k, (s, ph, y) in enumerate((("90 ÷ 2 = 45", "90 divisé par 2 égale 45.", 2.2),
                                        ("45 ÷ 3 = 15", "45 divisé par 3 égale 15.", 1.45),
                                        ("15 ÷ 3 = 5", "15 divisé par 3 égale 5.", 0.7))):
            e = jaunir(F(s, 46), 2).move_to(P(X, y))
            self.poser_avec(e, ph, {2: (lambda k=k: [FadeIn(cas.d[k], scale=1.4)]),
                                    4: (lambda k=k: [FadeIn(cas.n[k + 1], scale=1.4)])})
        o5 = Circle(radius=0.4, color=VERT_OK, stroke_width=5).move_to(cas.n[3])
        self.dit(self.lg("5 est premier.", X, -0.05, 40, VERT_OK), "5 est premier.",
                 avec=[Create(o5), cas.n[3].animate.set_color(FACTEUR)])
        e = jaunir(F("Donc 90 = 2 × 3 × 3 × 5", 54), 3, 5, 7, 9).move_to(P(0, -1.75))
        e.atomes[0].shift(LEFT * 0.35)
        self.dire_eq(e, "Donc 90 égale 2 fois 3 fois 3 fois 5.", echelle=1.2)
        self.play(Create(self.cadre_ok(VGroup(*e.atomes[1:]), 0.18)), run_time=0.25)
        self.attendre_voix(marge=1.0)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        self.XL = -1.5
        cas = Cascade([84, 42, 21, 7, 1], [2, 2, 3, 7], x=0, y0=0, pas=0.62, fs=36).remplie()
        bas = jaunir(F("84 = 2 × 2 × 3 × 7", 34), 2, 4, 6, 8).sans_audit()
        fig = VGroup(cas, bas)
        bas.next_to(cas, DOWN, buff=0.35)
        lignes = self.finale_colonne([["On divise par le plus petit", "nombre premier, encore et encore,", "jusqu'à 1."],
                                      ["On vérifie que chaque facteur", "est premier, et que le produit", "redonne le nombre."],
                                      ["La décomposition est unique."]], fs=40, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_casser()
        self.ecran_resultat()
        self.ecran_controle()
        self.ecran_question1()
        self.ecran_fraction()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
