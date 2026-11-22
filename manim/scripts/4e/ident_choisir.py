# ident_choisir.py
# EleveAI — Maths 4e — série IDENTITÉS REMARQUABLES, épisode 04 : CHOISIR entre une identité et la
# double distributivité. Paysage 16:9, AVEC VOIX, ceinture ORANGE.
# Micro : litteral_identite_choisir (tous les écrans).
# Métier : Emma, styliste. Centres : art-design (mode).
# Écrans : garde (00) ; les deux pièces de tissu d'Emma, la nappe carrée x + 5 et le foulard
# x + 5 sur x − 2 (01) ; la nappe : parenthèses identiques, un carré, le carré découpé (02) ; le foulard :
# les quatre produits, les flèches de la double distributivité (03) ; QUESTION 1 (03q, réponse A) ;
# la méthode en trois questions, l'arbre de décision dessiné (04) ; le piège : forcer une identité,
# et (x + 3)(3 + x) qui EST un carré (05) ; QUESTION 2 (05q, réponse C, le carré découpé (x + 4)²) ;
# défi (x − 3)(x + 8) et (x − 3)(x + 3) (06) et correction (06b) ; ce que tu as appris (07) ;
# la fin commune (08, manim/fin_commune.py).
# Code couleur (celui des séries distributivité et factorisation) : x bleu ; le carré découpé :
# x² bleu, les deux bandes a·b ORANGE, b² violet ; juste vert ; piège rouge.
# Voix : manim/voix/4e-identites-choisir.json (validée) ; marques : ident_choisir_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/ident_choisir.py IdentChoisir4e --media_dir manim/scripts/4e/media-ident-04-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/ident_choisir.py IdentChoisir4e -o eleveai-maths-4e-identites-choisir --media_dir manim/scripts/4e/media-ident-04
# Sortie : manim/sorties/4e/maths/identites/04-choisir/eleveai-maths-4e-identites-choisir.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

PAROLE["²"] = "carré"

BANDE = OPERATION  # les deux bandes a·b du carré découpé
CARRE_X = "#1d4ed8"  # le carré x²
CARRE_B = "#7c3aed"  # le carré b²
NAPPE = "#be185d"  # le tissu de la nappe
FOULARD = "#0f766e"  # le tissu du foulard
GRIS = "#94a3b8"


def D(s, fs=56, couleur=WHITE, lettres="x", audit=True):
    """Une expression : la lettre x en bleu."""
    return E(s, fs, couleur, lettres=lettres, audit=audit)


def idx(e, s, k=1):
    """L'indice du k-ième atome de texte s dans e."""
    n = 0
    for i, a in enumerate(e.atomes):
        if a.original_text == s:
            n += 1
            if n == k:
                return i
    raise ValueError(f"{s} absent de {e.s}")


def tissu(w, h, fond, centre=ORIGIN, frange=False):
    """Une pièce de tissu : le fond, des rayures claires, la couture en pointillés ; des franges (foulard)."""
    r = Rectangle(width=w, height=h, fill_color=fond, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    n = max(2, int(h / 0.32))
    rayures = VGroup(*[Line(P(-w / 2 + 0.1, y), P(w / 2 - 0.1, y), color=WHITE, stroke_width=2, stroke_opacity=0.25)
                       for y in [-h / 2 + h * (k + 0.5) / n for k in range(n)]])
    couture = DashedVMobject(Rectangle(width=w - 0.2, height=h - 0.2, stroke_color="#fde68a", stroke_width=2),
                             num_dashes=int(2 * (w + h) / 0.18))
    g = VGroup(r, rayures, couture)
    if frange:
        for s in (-1, 1):
            g.add(VGroup(*[Line(P(s * w / 2, y), P(s * (w / 2 + 0.16), y), color="#fde68a", stroke_width=3)
                           for y in [-h / 2 + h * (k + 0.5) / 7 for k in range(7)]]))
    g.move_to(centre)
    g.fond = r
    return g


class CarreDecoupe(VGroup):
    """Le carré (a + b)² découpé : .aa (a², bleu) .ab .ba (les bandes a·b, orange) .bb (b², violet),
    .ins (les quatre aires, données de figure), .haut / .gauche (les étiquettes des côtés), .coupes
    (les pointillés de la découpe). Rien n'est ajouté coloré : la scène fait apparaître les pièces."""

    def __init__(self, ua, ub, la="x", lb="5", aires=("x²", "5x", "5x", "25"), fs=34, fs_cote=32, **kw):
        super().__init__(**kw)
        tot = ua + ub
        o = P(-tot / 2, tot / 2)  # le coin haut gauche

        def piece(x, y, w, h, c):
            return Rectangle(width=w, height=h, fill_color=c, fill_opacity=0.9, stroke_color=WHITE,
                             stroke_width=3).move_to(o + P(x + w / 2, -(y + h / 2)))

        self.aa = piece(0, 0, ua, ua, CARRE_X)
        self.ab = piece(ua, 0, ub, ua, BANDE)
        self.ba = piece(0, ua, ua, ub, BANDE)
        self.bb = piece(ua, ua, ub, ub, CARRE_B)
        self.bord = Square(side_length=tot, stroke_color=WHITE, stroke_width=4).move_to(o + P(tot / 2, -tot / 2))
        self.coupes = VGroup(DashedLine(o + P(ua, 0), o + P(ua, -tot), color="#fde68a", stroke_width=4, dash_length=0.1),
                             DashedLine(o + P(0, -ua), o + P(tot, -ua), color="#fde68a", stroke_width=4, dash_length=0.1))
        self.ins = VGroup()
        self.pieces = VGroup(self.aa, self.ab, self.ba, self.bb)
        if not la:  # un petit carré sans étiquettes (une icône)
            self.haut, self.gauche = VGroup(), VGroup()
            self.add(self.pieces, self.bord, self.coupes)
            return
        for p, s in zip((self.aa, self.ab, self.ba, self.bb), aires):
            t = D(s, fs, audit=False)
            for a in t.atomes:
                a.set_color(WHITE)
            if t.width > p.width - 0.12:
                t.scale_to_fit_width(p.width - 0.12)
            if t.height > p.height - 0.12:
                t.scale_to_fit_height(p.height - 0.12)
            self.ins.add(t.move_to(p))
        self.haut = VGroup(D(la, fs_cote, audit=False).next_to(self.aa, UP, buff=0.1),
                           T(lb, fs_cote, WHITE, audit=False).next_to(self.ab, UP, buff=0.1))
        self.gauche = VGroup(D(la, fs_cote, audit=False).next_to(self.aa, LEFT, buff=0.1),
                             T(lb, fs_cote, WHITE, audit=False).next_to(self.ba, LEFT, buff=0.1))
        self.haut[1].set_y(self.haut[0].get_y())
        self.gauche[1].set_x(self.gauche[0].get_x())
        self.add(self.pieces, self.bord, self.coupes, self.ins, self.haut, self.gauche)


def emma(s=0.78):
    """Emma, styliste : un mètre ruban jaune autour du cou et une paire de ciseaux."""
    m = Metier(["Emma", "styliste"], fs=32, peau="#f1c27d", tenue="#6d28d9", cheveux="#78350f", longs=True, s=s)
    m.nom.arrange(DOWN, buff=0.12)
    p = m.perso
    c = p.tete.get_bottom()
    ruban = VGroup(*[Rectangle(width=0.09 * s, height=0.85 * s, fill_color="#facc15", fill_opacity=1, stroke_width=0)
                     .move_to(c + P(dx, -0.5) * s) for dx in (-0.2, 0.2)])
    traits = VGroup(*[Line(c + P(dx - 0.045, -0.2 - 0.14 * k) * s, c + P(dx + 0.01, -0.2 - 0.14 * k) * s,
                           color="#1f2937", stroke_width=2) for dx in (-0.2, 0.2) for k in range(5)])
    lames = VGroup(*[Line(P(0, 0), P(0.42, 0.12 * sg), color="#e2e8f0", stroke_width=5) for sg in (1, -1)])
    anneaux = VGroup(*[Circle(radius=0.07, stroke_color="#f43f5e", stroke_width=4).move_to(P(-0.08, 0.1 * sg))
                       for sg in (1, -1)])
    ciseaux = VGroup(lames, anneaux).scale(s).move_to(p.get_center() + P(0.62, -0.35) * s)
    p.add(ruban, traits, ciseaux)
    return m


def panneau(texte, vers_droite=True, w=3.1, h=0.62, fs=28):
    """Une plaque de panneau indicateur en forme de flèche."""
    s = 1 if vers_droite else -1
    pts = [P(0, h / 2), P(s * (w - 0.35), h / 2), P(s * w, 0), P(s * (w - 0.35), -h / 2), P(0, -h / 2)]
    plaque = Polygon(*pts, fill_color="#92400e", fill_opacity=1, stroke_color="#fde68a", stroke_width=3)
    t = T(texte, fs, WHITE, gras=True)
    if t.width > w - 0.6:
        t.scale_to_fit_width(w - 0.6)
    t.move_to(P(s * (w - 0.3) / 2, 0))
    return VGroup(plaque, t)


def carte_arbre(lignes, w, couleur, fs=30, fond="#0b1220"):
    """Une case de l'arbre de décision : un cadre arrondi et ses lignes (Eq, posées au mot)."""
    ts = VGroup(*[E(l, fs, WHITE, lettres="") for l in lignes]).arrange(DOWN, buff=0.1)
    if ts.width > w - 0.3:
        ts.scale_to_fit_width(w - 0.3)
    cadre = RoundedRectangle(width=w, height=ts.height + 0.36, corner_radius=0.14, stroke_color=couleur,
                             stroke_width=4, fill_color=fond, fill_opacity=1)
    ts.move_to(cadre)
    g = VGroup(cadre, ts)
    g.cadre, g.lignes = cadre, ts
    return g


class IdentChoisir4e(PaysageRel):
    nom_voix = "4e-identites-choisir"
    fichier_marques = "ident_choisir_marques.json"
    ceinture = "orange"

    def cadre(self, m, couleur=CIEL, buff=0.12):
        return SurroundingRectangle(m, color=couleur, buff=buff, stroke_width=3, corner_radius=0.08)

    def fleche_arc(self, a, b, couleur=None, angle=-1.2, sw=4, bas=False):
        """La flèche de la double distributivité : par-dessus, ou par en dessous (bas=True)."""
        if bas:
            return CurvedArrow(a.get_bottom() + DOWN * 0.08, b.get_bottom() + DOWN * 0.1, angle=-angle,
                               color=couleur or BANDE, stroke_width=sw, tip_length=0.15)
        return CurvedArrow(a.get_top() + UP * 0.08, b.get_top() + UP * 0.1, angle=angle, color=couleur or BANDE,
                           stroke_width=sw, tip_length=0.15)

    def _disposer_q(self, question, choix, phrase):
        """Les cartes remontent sous la question ; la phrase de réponse va sous la figure et garde sa taille."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        pause.next_to(cartes, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        if len(ph.submobjects):
            ph.scale(T(phrase[0], 36, audit=False).height / ph[0].height)  # défait la réduction du module commun
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        if ph.width > 6.7:
            ph.scale_to_fit_width(6.7)
        haut = getattr(self, "ph_haut", -0.6)
        ph.align_to(P(-6.45, 0), LEFT).align_to(P(0, haut), UP)
        if ph.get_bottom()[1] < -3.45:
            ph.scale((haut + 3.45) / ph.height, about_point=P(-6.45, haut))
        return tete, q, cartes, pause, rebours, ph

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

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Identité ou double distributivité ?", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Identité", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        # le panneau indicateur : deux chemins, il faut choisir
        poteau = Line(P(-3.4, -1.75), P(-3.4, 1.35), color="#78350f", stroke_width=12)
        p1 = panneau("Identité", True).shift(P(-3.4, 0.75))
        p2 = panneau("Distributivité", False, w=3.0).shift(P(-3.4, -0.2))
        l1 = self.lg("Comment choisir", 3.0, 0.6, 46, maxw=6.2)
        self.dit(l1, "Comment choisir", avec=[Create(poteau), FadeIn(p1, shift=RIGHT * 0.3), FadeIn(p2, shift=LEFT * 0.3)])
        l2 = self.lg("la bonne méthode ?", 3.0, -0.15, 48, JAUNE_TITRE, maxw=6.2)
        self.dit(l2, "la bonne méthode ?")
        self.play(Wiggle(p1), Wiggle(p2), run_time=0.6)
        self.insister(l2, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les deux pièces de tissu d'Emma ────────────────────────────────
    def ecran_styliste(self):
        self.ecran("01-styliste")
        m = emma()
        m.perso.move_to(P(-5.3, 0.55))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.3)
        self.au("Emma", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("styliste", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        l1 = self.lg("Pour un défilé, elle découpe deux pièces de tissu.", 0.9, 2.95, 36, maxw=8.8)
        self.dit(l1, "Pour un défilé, elle découpe deux pièces de tissu.")
        # la nappe carrée et le foulard : même largeur x + 5
        nappe = tissu(2.2, 2.2, NAPPE, P(-1.4, -0.4))
        foul = tissu(2.2, 1.3, FOULARD, P(2.4, -0.4), frange=True)
        nh = D("x + 5", 32, audit=False).next_to(nappe, UP, buff=0.12)
        ng = D("x + 5", 32, audit=False).next_to(nappe, LEFT, buff=0.15)
        fh = D("x + 5", 32, audit=False).next_to(foul.fond, UP, buff=0.12)
        fd = D("x − 2", 32, audit=False).next_to(foul, RIGHT, buff=0.15)
        tn = T("nappe", 30, "#f9a8d4", audit=False).next_to(nappe, DOWN, buff=0.15)
        tf = T("foulard", 30, "#5eead4", audit=False).next_to(foul.fond, DOWN, buff=0.15)
        l2 = self.lg("Une nappe carrée, de côté x + 5.", 0.9, 2.35, 36, lettres="x", maxw=8.8)
        self.dit_avec(l2, "Une nappe carrée, de côté x plus 5.",
                      {0: lambda: [FadeIn(nappe, shift=UP * 0.2), FadeIn(tn)],
                       idx(l2, "5"): lambda: [FadeIn(nh), FadeIn(ng)]})
        l3 = self.lg("Et un foulard rectangulaire, de x + 5 sur x − 2.", 0.9, 1.75, 36, lettres="x", maxw=8.8)
        self.dit_avec(l3, "Et un foulard rectangulaire, de x plus 5 sur x moins 2.",
                      {0: lambda: [FadeIn(foul, shift=UP * 0.2), FadeIn(tf)],
                       idx(l3, "5"): lambda: [FadeIn(fh)],
                       idx(l3, "2"): lambda: [FadeIn(fd)]})
        l4 = self.lg("Quelle est l'aire de chaque pièce ?", 0.4, -2.55, 42, JAUNE_TITRE, maxw=8.6)
        self.dit(l4, "Quelle est l'aire de chaque pièce ?",
                 avec=[Indicate(nappe, color=JAUNE_TITRE, scale_factor=1.04)])
        self.play(Indicate(foul, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.4)
        self.insister(l4, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : la nappe : un carré ────────────────────────────────────────────
    def ecran_nappe(self):
        self.ecran("02-nappe")
        l0 = self.lg("Avant de calculer, on regarde les deux parenthèses.", 0, 3.05, 40, CIEL, maxw=12.4)
        self.dit(l0, "Avant de calculer, on regarde les deux parenthèses.")
        c = CarreDecoupe(1.9, 1.0, "x", "5", ("x²", "5x", "5x", "25"), fs=40, fs_cote=34)
        c.move_to(P(-3.85, -0.55))
        nappe = tissu(2.9, 2.9, NAPPE, c.bord.get_center())
        l1 = self.lg("Pour la nappe :", 2.2, 1.95, 40, maxw=6.4)
        self.dit(l1, "Pour la nappe :", avec=[FadeIn(nappe, shift=UP * 0.2)])
        e = D("(x + 5)(x + 5)", 66).move_to(P(2.2, 1.15))
        self.poser_avec(e, "x plus 5, fois x plus 5.",
                        {1: lambda: [FadeIn(c.haut[0]), FadeIn(c.gauche[0])],
                         3: lambda: [FadeIn(c.haut[1]), FadeIn(c.gauche[1])]})
        g1, g2 = VGroup(*e.atomes[0:5]), VGroup(*e.atomes[5:10])
        s1 = Underline(g1, color=JAUNE_TITRE, stroke_width=5, buff=0.08)
        s2 = Underline(g2, color=JAUNE_TITRE, stroke_width=5, buff=0.08)
        l2 = self.lg("Elles sont identiques :", 2.2, 0.15, 40, maxw=6.4)
        self.dit(l2, "Elles sont identiques :", avec=[Create(s1), Create(s2)])
        self.play(Indicate(g1, color=JAUNE_TITRE, scale_factor=1.08), Indicate(g2, color=JAUNE_TITRE, scale_factor=1.08),
                  run_time=0.5)
        l3 = self.lg("c'est un carré.", 2.2, -0.5, 46, JAUNE_TITRE, maxw=6.4)
        self.dit(l3, "c'est un carré.", avec=[FadeOut(nappe), FadeIn(c.pieces), FadeIn(c.bord), Create(c.coupes)])
        self.insister(l3, 1.1, 0.2)
        l4 = self.lg("On écrit tout de suite", 2.2, -1.35, 40, maxw=6.4)
        self.dit(l4, "On écrit tout de suite")
        r = D("x² + 10x + 25", 62, VERT_OK).move_to(P(2.2, -2.2))
        for a in r.x:
            a.set_color(INCONNUE)
        self.dit_avec(r, "x au carré plus 10 x plus 25.",
                      {0: lambda: [FadeIn(c.ins[0], scale=0.6), Indicate(c.aa, color=WHITE, scale_factor=1.05)],
                       idx(r, "10"): lambda: [FadeIn(c.ins[1], scale=0.6), FadeIn(c.ins[2], scale=0.6),
                                              Indicate(VGroup(c.ab, c.ba), color=WHITE, scale_factor=1.05)],
                       idx(r, "25"): lambda: [FadeIn(c.ins[3], scale=0.6), Indicate(c.bb, color=WHITE, scale_factor=1.08)]})
        self.play(Create(self.cadre_ok(r, 0.16)), run_time=0.25)
        self.insister(r, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : le foulard : les quatre produits ───────────────────────────────
    def ecran_foulard(self):
        self.ecran("03-foulard")
        l0 = self.lg("Pour le foulard :", -4.3, 3.05, 42, maxw=4.2)
        foul = tissu(2.0, 1.2, FOULARD, P(4.0, 1.75), frange=True)
        fh = D("x + 5", 30, audit=False).next_to(foul.fond, UP, buff=0.1)
        fd = D("x − 2", 30, audit=False).next_to(foul, RIGHT, buff=0.12)
        self.dit(l0, "Pour le foulard :", avec=[FadeIn(foul, shift=UP * 0.2)])
        e = D("(x + 5)(x − 2)", 72).move_to(P(-1.3, 1.65))
        self.poser_avec(e, "x plus 5, fois x moins 2.", {3: lambda: [FadeIn(fh)], 8: lambda: [FadeIn(fd)]})
        l1 = self.lg("Les nombres sont différents : 5 et 2.", -0.6, 0.2, 38, maxw=9.6)
        self.dit_avec(l1, "Les nombres sont différents : 5 et 2.",
                      {idx(l1, "5"): lambda: [Circumscribe(e.atomes[3], color=JAUNE_TITRE, buff=0.08)],
                       idx(l1, "2"): lambda: [Circumscribe(e.atomes[8], color=JAUNE_TITRE, buff=0.08)]})
        l2 = self.lg("Aucune identité ici.", -0.6, -0.45, 40, PIEGE, maxw=8)
        self.dit(l2, "Aucune identité ici.")
        self.play(Wiggle(l2), run_time=0.4)
        l3 = self.lg("On fait les quatre produits :", -0.6, -1.15, 38, CIEL, maxw=9)
        self.dit(l3, "On fait les quatre produits :")
        xa, cinq, xb, m2 = e.atomes[1], e.atomes[3], e.atomes[6], VGroup(e.atomes[7], e.atomes[8])
        f1 = self.fleche_arc(xa, xb, angle=-1.15)
        f2 = self.fleche_arc(xa, m2, angle=-1.0)
        f3 = self.fleche_arc(cinq, xb, angle=-1.2, bas=True)
        f4 = self.fleche_arc(cinq, m2, angle=-1.0, bas=True)
        p = D("x² − 2x + 5x − 10", 52).move_to(P(-0.6, -1.85))
        self.dit_avec(p, "x au carré, moins 2 x, plus 5 x, moins 10.",
                      {0: lambda: [Create(f1)], idx(p, "2"): lambda: [Create(f2)],
                       idx(p, "5"): lambda: [Create(f3)], idx(p, "10"): lambda: [Create(f4)]})
        r = D("Résultat : x² + 3x − 10.", 48, VERT_OK).move_to(P(-0.6, -2.75))
        for a in r.x:
            a.set_color(INCONNUE)
        self.dit(r, "Résultat : x au carré plus 3 x moins 10.",
                 avec=[Circumscribe(VGroup(*p.atomes[2:7]), color=CIEL, buff=0.08)])
        self.play(Create(self.cadre_ok(r, 0.14)), run_time=0.25)
        self.insister(r, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse A) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        self.ph_haut = -0.45
        e = D("(x − 7)(x + 7)", 60, audit=False).move_to(P(-3.35, 2.1))
        r = D("= x² − 49", 60, VERT_OK, audit=False).move_to(P(-3.5, 0.75))
        r.atomes[1].set_color(INCONNUE)
        memes = VGroup(e.atomes[1], e.atomes[3], e.atomes[6], e.atomes[8])
        signes = VGroup(e.atomes[2], e.atomes[7])

        def avant(sc):
            sc.eq_dans_q(0, "Pour (x − 7)(x + 7),", "Pour x moins 7, fois x plus 7,", lettres="x", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)
            sc.eq_dans_q(0, "quelle méthode est la plus rapide ?", "quelle méthode est la plus rapide ?", lettres="",
                         fs=36)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : les mêmes termes,", "Réponse A : les mêmes termes,", premier=True,
                     avec=[Circumscribe(memes, color=JAUNE_TITRE, buff=0.08)])
            sc.ph_eq(1, "avec des signes contraires.", "avec des signes contraires.",
                     avec=[e.atomes[2].animate.set_color(PIEGE), e.atomes[7].animate.set_color(VERT_OK)])
            sc.play(Indicate(signes, scale_factor=1.4), run_time=0.4)
            sc.ph_eq(2, "On écrit tout de suite x² − 49.", "On écrit tout de suite x au carré moins 49.", lettres="x")
            sc.play(FadeIn(r, shift=DOWN * 0.2), run_time=0.25)
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Pour (x − 7)(x + 7),", "quelle méthode est la plus rapide ?"],
                            [Eq("(a − b)(a + b)", 34, lettres=""), Eq("(a − b)²", 34, lettres=""),
                             Eq("aucune identité ne marche", 34, lettres="")], 0,
                            ["Réponse A : les mêmes termes,", "avec des signes contraires.",
                             "On écrit tout de suite x² − 49."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : la méthode en trois questions : l'arbre de décision ────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        tit = self.lg("La méthode, en trois questions.", 0, 3.05, 46, JAUNE_TITRE, maxw=12)
        self.dit(tit, "La méthode, en trois questions.")
        xq, xr, wq, wr = -3.0, 2.6, 5.0, 4.4
        ys = (1.75, 0.05, -1.65)
        q1 = carte_arbre(["Les deux parenthèses", "sont identiques ?"], wq, CIEL).move_to(P(xq, ys[0]))
        q2 = carte_arbre(["Les mêmes termes, avec", "des signes contraires ?"], wq, CIEL).move_to(P(xq, ys[1]))
        q3 = carte_arbre(["Ni l'un ni l'autre ?"], wq, CIEL).move_to(P(xq, ys[2]))
        r1 = carte_arbre(["C'est un carré :", "trois termes."], wr, CARRE_X, fond="#0c1a3d").move_to(P(xr, ys[0]))
        r2 = carte_arbre(["Différence de deux", "carrés : deux termes."], wr, VERT_OK, fond="#052e16").move_to(P(xr, ys[1]))
        r3 = carte_arbre(["Double distributivité :", "quatre produits."], wr, BANDE, fond="#3b1d06").move_to(P(xr, ys[2]))
        # les flèches « oui » vers la droite, « non » vers le bas
        def oui(q, r):
            f = Arrow(q.get_right(), r.get_left(), buff=0.08, color=VERT_OK, stroke_width=5,
                      max_tip_length_to_length_ratio=0.25)
            return VGroup(f, T("oui", 26, VERT_OK, audit=False).next_to(f, UP, buff=0.06))

        def non(a, b):
            f = Arrow(a.get_bottom(), b.get_top(), buff=0.05, color=PIEGE, stroke_width=5,
                      max_tip_length_to_length_ratio=0.3)
            return VGroup(f, T("non", 26, PIEGE, audit=False).next_to(f, LEFT, buff=0.1))

        o1, o2, o3 = oui(q1, r1), oui(q2, r2), oui(q3, r3)
        n1, n2 = non(q1, q2), non(q2, q3)
        # le petit carré découpé à côté de la case « carré » ; a² − b² à côté de la case « différence »
        mini = CarreDecoupe(0.42, 0.24, "", "")
        mini.next_to(r1, RIGHT, buff=0.25)
        diff = D("a² − b²", 30, VERT_OK, lettres="", audit=False).next_to(r2, RIGHT, buff=0.2)

        def question(q, extraits):
            self.au(extraits[0], FadeIn(q.cadre), rt=0.2)
            for l, x in zip(q.lignes, extraits):
                self.dit(l, x)

        def reponse(r, o, mot, extraits, avec=()):
            for k, (l, x) in enumerate(zip(r.lignes, extraits)):
                ex = [GrowArrow(o[0]), FadeIn(o[1]), FadeIn(r.cadre)] if k == 0 else []
                if k == len(extraits) - 1:
                    ex += list(avec)
                self.dit(l, x, avec=ex, rt=0.2 if k == 0 else 0.12)
            self.insister(r, 1.05, 0.18)

        question(q1, ("Les deux parenthèses", "sont identiques ?"))
        reponse(r1, o1, "C'est un carré", ("C'est un carré :", "trois termes."), avec=[FadeIn(mini, scale=0.6)])
        self.play(GrowArrow(n1[0]), FadeIn(n1[1]), run_time=0.3)
        question(q2, ("Les mêmes termes, avec", "des signes contraires ?"))
        reponse(r2, o2, "C'est une différence", ("différence de deux", "carrés : deux termes."),
                avec=[FadeIn(diff, shift=LEFT * 0.1)])
        self.play(GrowArrow(n2[0]), FadeIn(n2[1]), run_time=0.3)
        question(q3, ("Ni l'un ni l'autre ?",))
        reponse(r3, o3, "Double distributivité", ("Double distributivité :", "quatre produits."))
        self.attendre_voix(marge=0.8)

    # ── 05 : le piège : forcer une identité ─────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = T("Le piège :", 46, PIEGE, gras=True)
        l0 = self.lg("forcer une identité.", 0, 0, 46, maxw=6.5)
        VGroup(tit, l0).arrange(RIGHT, buff=0.35).move_to(P(-1.0, 3.0))
        self.au("Le piège", FadeIn(tit, scale=1.3), rt=0.25)
        self.dit(l0, "forcer une identité.")
        e1 = D("(x + 6)(x + 4) ≠ (x + 6)²", 62).move_to(P(-0.5, 1.75))
        e1.atomes[idx(e1, "≠")].set_color(PIEGE)
        self.dire_eq(e1, "x plus 6, fois x plus 4, ce n'est pas x plus 6 au carré.", echelle=1.15)
        faux = VGroup(*e1.atomes[idx(e1, "≠") + 1:])
        self.play(faux.animate.set_color(PIEGE), Create(self.barrer(faux)),
                  Circumscribe(e1.atomes[3], color=PIEGE, buff=0.08), Circumscribe(e1.atomes[8], color=PIEGE, buff=0.08),
                  run_time=0.5)
        et = self.lg("Et", 0, 0, 44, maxw=1.0)
        e2 = D("(x + 3)(3 + x) ?", 60)
        VGroup(et, e2).arrange(RIGHT, buff=0.3).move_to(P(-2.4, 0.25))
        self.dit(et, "Et x plus 3")
        self.dire_eq(e2, "x plus 3, fois 3 plus x ?", echelle=1.15)
        l1 = self.lg("Là, oui :", -4.9, -0.95, 42, VERT_OK, maxw=3)
        self.dit(l1, "Là, oui :")
        l2 = self.lg("x + 3 et 3 + x, c'est pareil.", -2.4, -1.65, 40, lettres="x", maxw=7.4)
        g1, g2 = VGroup(*e2.atomes[0:5]), VGroup(*e2.atomes[5:10])
        self.dit_avec(l2, "x plus 3 et 3 plus x, c'est pareil.",
                      {0: lambda: [Circumscribe(g1, color=JAUNE_TITRE, buff=0.06)],
                       idx(l2, "3", 2): lambda: [Circumscribe(g2, color=JAUNE_TITRE, buff=0.06)]})
        c = CarreDecoupe(1.55, 0.8, "x", "3", ("x²", "3x", "3x", "9"), fs=36, fs_cote=32)
        c.move_to(P(3.6, -0.85))
        l3 = self.lg("C'est un carré !", -2.4, -2.55, 50, JAUNE_TITRE, maxw=7)
        self.dit(l3, "C'est un carré !", avec=[FadeIn(c.pieces), FadeIn(c.bord), Create(c.coupes), FadeIn(c.haut),
                                               FadeIn(c.gauche)])
        self.play(FadeIn(c.ins), run_time=0.3)
        self.insister(l3, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse C) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        self.ph_haut = -0.55
        e = D("(4 + x)(x + 4)", 58, audit=False).move_to(P(-3.35, 2.3))
        e2 = D("(x + 4)²", 60, VERT_OK, audit=False).move_to(P(-4.7, 0.6))
        e2.atomes[1].set_color(INCONNUE)
        c = CarreDecoupe(1.05, 0.55, "x", "4", ("x²", "4x", "4x", "16"), fs=28, fs_cote=26)
        c.move_to(P(-1.85, 0.55))

        def avant(sc):
            sc.eq_dans_q(0, "Développe (4 + x)(x + 4).", "Développe 4 plus x, fois x plus 4.", lettres="x", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : 4 + x, c'est x + 4.", "Réponse C : 4 plus x, c'est x plus 4.", lettres="x",
                     premier=True, avec=[Circumscribe(VGroup(*e.atomes[0:5]), color=JAUNE_TITRE, buff=0.06)])
            sc.ph_eq(1, "C'est donc (x + 4)² :", "C'est donc x plus 4, au carré :", lettres="x",
                     avec=[FadeIn(e2, shift=DOWN * 0.2), FadeIn(c.pieces), FadeIn(c.bord), Create(c.coupes),
                           FadeIn(c.haut), FadeIn(c.gauche)])
            ph = sc.ph_q[2]
            r = E("x² + 8x + 16.", 30, VERT_OK, lettres="x")
            r.scale_to_fit_width(ph.width).move_to(ph).align_to(ph, LEFT)
            sc.dit_avec(r, "x au carré plus 8 x plus 16.",
                        {0: lambda: [FadeIn(c.ins[0])], idx(r, "8"): lambda: [FadeIn(c.ins[1]), FadeIn(c.ins[2])],
                         idx(r, "16"): lambda: [FadeIn(c.ins[3])]})
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Développe (4 + x)(x + 4)."],
                            [Eq("x² + 16", 34), Eq("x² + 4x + 16", 34), Eq("x² + 8x + 16", 34)], 2,
                            ["Réponse C : 4 + x, c'est x + 4.", "C'est donc (x + 4)² :", "x² + 8x + 16."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def pastille(self, s, couleur=CIEL):
        rond = Circle(radius=0.32, fill_color="#0b1220", fill_opacity=1, stroke_color=couleur, stroke_width=4)
        return VGroup(rond, T(s, 34, couleur, gras=True, audit=False).move_to(rond))

    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        l = self.lg("Choisis la méthode, puis développe.", 0, 1.75, 44, CIEL, maxw=11)
        self.dit(l, "Choisis la méthode, puis développe.")
        b1 = self.pastille("1").move_to(P(-3.3, 0.95))
        b2 = self.pastille("2").move_to(P(3.3, 0.95))
        e1 = D("(x − 3)(x + 8)", 66).move_to(P(-3.3, 0.05))
        e2 = D("(x − 3)(x + 3)", 66).move_to(P(3.3, 0.05))
        self.au("Un :", FadeIn(b1, scale=1.3), rt=0.2)
        self.dire_eq(e1, "x moins 3, fois x plus 8.", echelle=1.15)
        self.au("Deux :", FadeIn(b2, scale=1.3), rt=0.2)
        self.dire_eq(e2, "x moins 3, fois x plus 3.", echelle=1.15)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.6))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, l=l, e1=e1, e2=e2, b1=b1, b2=b2, pz=pz)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("06b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 2.9))
        e1, e2, b1, b2 = d["e1"], d["e2"], d["b1"], d["b2"]
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["l"]),
                e1.animate.scale(0.8).move_to(P(-2.95, 1.75)), e2.animate.scale(0.8).move_to(P(3.65, 1.75)),
                b1.animate.move_to(P(-5.6, 1.75)), b2.animate.move_to(P(1.05, 1.75)), rt=0.45)
        # Un : double distributivité
        self.au("Un :", Indicate(b1, color=CIEL, scale_factor=1.3), rt=0.3)
        a1 = self.lg("les nombres sont différents,", -3.3, 0.8, 34, maxw=6.0)
        self.dit(a1, "les nombres sont différents,",
                 avec=[Circumscribe(e1.atomes[3], color=JAUNE_TITRE, buff=0.06)])
        self.play(Circumscribe(e1.atomes[8], color=JAUNE_TITRE, buff=0.06), run_time=0.35)
        a2 = self.lg("double distributivité.", -3.3, 0.25, 36, BANDE, maxw=6.0)
        self.dit(a2, "double distributivité.")
        p = D("x² + 8x − 3x − 24", 46).move_to(P(-3.3, -0.65))
        self.dire_eq(p, "x au carré plus 8 x moins 3 x moins 24 :", echelle=1.1)
        r1 = D("= x² + 5x − 24", 50, VERT_OK).move_to(P(-3.3, -1.55))
        for a in r1.x:
            a.set_color(INCONNUE)
        self.dit(r1, "x au carré plus 5 x moins 24.", avec=[Circumscribe(VGroup(*p.atomes[2:9]), color=CIEL, buff=0.06)])
        self.play(Create(self.cadre_ok(r1, 0.14)), run_time=0.25)
        # Deux : l'identité
        self.au("Deux :", Indicate(b2, color=CIEL, scale_factor=1.3), rt=0.3)
        c1 = self.lg("signes contraires,", 3.3, 0.8, 34, maxw=5.6)
        self.dit(c1, "signes contraires,", avec=[e2.atomes[2].animate.set_color(PIEGE),
                                                 e2.atomes[7].animate.set_color(VERT_OK)])
        c2 = self.lg("identité.", 3.3, 0.25, 36, VERT_OK, maxw=5.6)
        self.dit(c2, "identité.")
        r2 = D("= x² − 9", 56, VERT_OK).move_to(P(3.3, -0.65))
        for a in r2.x:
            a.set_color(INCONNUE)
        self.dit(r2, "x au carré moins 9.")
        self.play(Create(self.cadre_ok(r2, 0.14)), run_time=0.25)
        self.insister(VGroup(r1, r2), 1.05, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def finale_gauche(self, textes, figure, fs=40):
        """« Ce que tu as appris » : titre en haut et centré, la figure à gauche, les points en lignes
        courtes à sa droite (repris de facto_maximum.py)."""
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.cadrer(figure, gauche=-6.3, droite=-3.0, haut=tit.get_bottom()[1] - 0.5, bas=-2.7)
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
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.32)
        xl = figure.get_right()[0] + 0.6
        largeur = 5.1 - xl
        if lignes.width > largeur:
            lignes.scale_to_fit_width(largeur)
        haut = tit.get_bottom()[1] - 0.35
        if lignes.height > haut + 3.3:
            lignes.scale_to_fit_height(haut + 3.3)
        lignes.align_to(P(xl, 0), LEFT).align_to(P(0, haut), UP)
        return lignes

    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        c = CarreDecoupe(1.3, 0.7, "x", "5", ("x²", "5x", "5x", "25"), fs=30, fs_cote=28)
        tn = T("nappe : un carré", 28, "#f9a8d4", audit=False).next_to(c, DOWN, buff=0.15)
        foul = tissu(2.0, 1.0, FOULARD, frange=True)
        tf = T("foulard : 4 produits", 28, "#5eead4", audit=False).next_to(foul, DOWN, buff=0.15)
        g2 = VGroup(foul, tf).next_to(tn, DOWN, buff=0.45)
        fig = VGroup(c, tn, g2)
        lignes = self.finale_gauche([["Avant de développer, on", "regarde les parenthèses."],
                                     ["Identiques : un carré."],
                                     ["Les mêmes termes avec des", "signes contraires : a² − b²."],
                                     ["Sinon : la double distributivité,", "qui marche toujours."]], fig)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_styliste()
        self.ecran_nappe()
        self.ecran_foulard()
        self.ecran_question1()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="08-abonne")
