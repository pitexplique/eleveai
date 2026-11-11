# facto_maximum.py
# EleveAI — Maths 4e — série FACTORISATION, épisode 04 : factoriser AU MAXIMUM.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : litteral_factoriser (tous les écrans).
# Métier : Camille, paysagiste. Centres : nature, architecture.
# Écrans : garde (00) ; la terrasse de Camille en deux parties, 2x² et 6x (01) ; chaque terme comme
# un produit, le 2 et le x communs (02) ; on sort 2x, la terrasse 2x par (x + 3), on vérifie (03) ;
# QUESTION 1 (03q, réponse B) ; le piège : s'arrêter trop tôt, 12x + 18 (04) ; la parenthèse n'a
# plus rien en commun (05) ; QUESTION 2 (05q, réponse C) ; défi 3x² + 12x et sa terrasse (06) et
# correction (06b) ; ce que tu as appris (07) ; fin du 05/11 (08).
# Code couleur (celui de la série) : x bleu ; le FACTEUR COMMUN orange (le côté commun de la
# terrasse aussi : c'est sa largeur) ; juste vert ; piège rouge.
# Voix : manim/voix/4e-facto-maximum.json (validée le 11/11) ; marques : facto_maximum_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/facto_maximum.py FactoMaximum4e --media_dir manim/scripts/4e/media-facto-04-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/facto_maximum.py FactoMaximum4e -o eleveai-maths-4e-facto-maximum --media_dir manim/scripts/4e/media-facto-04
# Sortie : manim/sorties/4e/maths/factorisation/04-maximum/eleveai-maths-4e-facto-maximum.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from distrib_simple import DistribSimple4e  # noqa: E402
from equation_resoudre_distributivite import Bloc  # noqa: E402

PAROLE["²"] = "carré"

FACTEUR = OPERATION  # le facteur commun
BOIS = "#92400e"  # la partie en bois de la terrasse
DALLE = "#475569"  # la partie en dalles
FEUILLE = "#15803d"


def D(s, fs=56, couleur=WHITE, lettres="x", audit=True):
    """Une expression : la lettre en bleu."""
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


def terrasse(w1, w2, h, a1, a2, fs=40, cote=None):
    """La terrasse de Camille : deux rectangles collés de même largeur h (le côté commun, à gauche).
    .r1 (bois) .r2 (dalles) .in1 .in2 (les aires, données de figure) ; .acc l'accolade orange du côté
    commun et .cote son étiquette (un « ? » par défaut)."""
    r1 = Rectangle(width=w1, height=h, fill_color=BOIS, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    r2 = Rectangle(width=w2, height=h, fill_color=DALLE, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    r2.next_to(r1, RIGHT, buff=0)
    lames = VGroup(*[Line(r1.get_left() + P(0.05, y), r1.get_right() + P(-0.05, y), color="#b45309", stroke_width=2)
                     for y in [h * (k / 6 - 0.5) for k in range(1, 6)]])
    joints = VGroup(*[Line(P(x, r2.get_bottom()[1] + 0.05), P(x, r2.get_top()[1] - 0.05), color="#64748b", stroke_width=2)
                      for x in [r2.get_left()[0] + w2 * k / 4 for k in range(1, 4)]],
                    *[Line(P(r2.get_left()[0] + 0.05, y), P(r2.get_right()[0] - 0.05, y), color="#64748b", stroke_width=2)
                      for y in [r2.get_center()[1] + h * d for d in (-0.17, 0.17)]])
    in1 = D(a1, fs, audit=False)
    in2 = D(a2, fs, audit=False)
    for m, r in ((in1, r1), (in2, r2)):
        if m.width > r.width - 0.2:
            m.scale_to_fit_width(r.width - 0.2)
        fond = BackgroundRectangle(m, color="#0f172a", fill_opacity=0.75, buff=0.08)
        m.add_to_back(fond)
        m.move_to(r)
    acc = Brace(VGroup(r1, r2), LEFT, buff=0.1, color=FACTEUR)
    if cote is None:
        cote = T("?", 52, FACTEUR, gras=True, audit=False)
    cote.next_to(acc, LEFT, buff=0.1)
    g = VGroup(r1, r2, lames, joints, in1, in2, acc, cote)
    g.r1, g.r2, g.in1, g.in2, g.acc, g.cote = r1, r2, in1, in2, acc, cote
    return g


def buisson(s=1.0):
    """Un petit buisson : trois ronds verts."""
    return VGroup(*[Circle(radius=r, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                    for x, y, r, c in ((-0.22, 0, 0.24, FEUILLE), (0.22, 0, 0.24, FEUILLE), (0, 0.18, 0.27, "#16a34a"))]).scale(s)


def camille(s=0.78):
    """Camille, paysagiste : un chapeau de jardin et une plante en pot."""
    m = Metier(["Camille", "paysagiste"], fs=32, peau="#e0ac69", tenue="#166534", cheveux="#78350f", longs=True, s=s)
    m.nom.arrange(DOWN, buff=0.12)
    p = m.perso
    bord = Ellipse(width=1.35 * s, height=0.2 * s, fill_color="#fde68a", fill_opacity=1, stroke_width=0)
    bord.move_to(p.tete.get_top() + DOWN * 0.12 * s)
    calotte = RoundedRectangle(width=0.66 * s, height=0.26 * s, corner_radius=0.1 * s, fill_color="#fde68a",
                               fill_opacity=1, stroke_width=0).next_to(bord, UP, buff=-0.04 * s)
    ruban = Rectangle(width=0.66 * s, height=0.07 * s, fill_color=FEUILLE, fill_opacity=1, stroke_width=0)
    ruban.move_to(calotte.get_bottom() + UP * 0.06 * s)
    pot = Polygon(P(-0.17, 0), P(0.17, 0), P(0.12, -0.28), P(-0.12, -0.28), fill_color="#c2410c", fill_opacity=1,
                  stroke_width=0).scale(s)
    plante = buisson(0.55 * s).next_to(pot, UP, buff=-0.04)
    VGroup(pot, plante).move_to(p.get_center() + P(0.55, -0.45) * s)
    p.add(bord, calotte, ruban, pot, plante)
    return m


class FactoMaximum4e(PaysageRel):
    nom_voix = "4e-facto-maximum"
    fichier_marques = "facto_maximum_marques.json"
    ceinture = "orange"

    fleche_arc = DistribSimple4e.fleche_arc

    def cadre(self, m, couleur=CIEL, buff=0.12):
        return SurroundingRectangle(m, color=couleur, buff=buff, stroke_width=3, corner_radius=0.08)

    def _disposer_q(self, question, choix, phrase):
        """Les cartes remontent sous la question ; la phrase de réponse va sous la figure et garde sa taille."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        pause.next_to(cartes, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        # la phrase de réponse sous la figure, à gauche : la place d'y écrire toute la voix, à la taille normale
        if len(ph.submobjects):
            ph.scale(Text(phrase[0], font_size=30).height / ph[0].height)  # défait la réduction du module commun
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        if ph.width > 6.0:
            ph.scale_to_fit_width(6.0)
        ph.align_to(P(-6.45, 0), LEFT).align_to(P(0, -1.2), UP)
        if ph.get_bottom()[1] < -3.55:
            ph.scale(2.35 / ph.height, about_point=P(-6.45, -1.2))
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
        titre, ident, ech = self.garde("Factoriser au maximum", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Factoriser", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        e = D("2x² + 6x", 84, audit=False).move_to(P(-4.0, 0.25))
        l1 = self.lg("Comment sortir tout", 3.0, 0.6, 44, maxw=6.4)
        self.dit(l1, "Comment sortir tout", avec=[FadeIn(e, shift=UP * 0.2)])
        l2 = self.lg("ce qui est commun ?", 3.0, -0.15, 48, JAUNE_TITRE, maxw=6.4)
        self.dit(l2, "ce qui est commun ?")
        self.play(Circumscribe(VGroup(*e.atomes[0:3]), color=FACTEUR, buff=0.08),
                  Circumscribe(VGroup(*e.atomes[4:6]), color=FACTEUR, buff=0.08), run_time=0.6)
        self.insister(l2, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : la terrasse de Camille ─────────────────────────────────────────
    def ecran_paysagiste(self):
        self.ecran("01-paysagiste")
        m = camille()
        m.perso.move_to(P(-5.3, 1.0))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.3)
        self.au("Camille", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("paysagiste", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        l1 = self.lg("Elle dessine une terrasse rectangulaire,", 1.0, 2.95, 38, maxw=8.6)
        self.dit(l1, "Elle dessine une terrasse rectangulaire,")
        t = terrasse(1.1, 2.5, 1.85, "2x²", "6x", 42)
        t.move_to(P(-2.1, -1.35))
        b1 = buisson(0.8).next_to(t.r2, UP, buff=0.02).align_to(t.r2, RIGHT)
        b2 = buisson(0.6).next_to(b1, LEFT, buff=0.15).align_to(b1, DOWN)
        cadre_t = VGroup(t.r1, t.r2, t[2], t[3])
        l2 = self.lg("en deux parties.", 1.0, 2.3, 38, maxw=8.6)
        self.dit(l2, "en deux parties.", avec=[FadeIn(cadre_t, shift=UP * 0.2), FadeIn(b1), FadeIn(b2)])
        l3 = self.lg("Leurs aires :", 0, 0, 38, maxw=3.0)
        l3a = self.lg("2x²,", 0, 0, 38, lettres="x", maxw=1.6)
        l3b = self.lg("et 6x.", 0, 0, 38, lettres="x", maxw=1.8)
        VGroup(l3, l3a, l3b).arrange(RIGHT, buff=0.3).move_to(P(1.0, 1.6))
        self.dit(l3, "Leurs aires :")
        self.dit(l3a, "2 x au carré,", avec=[FadeIn(t.in1, scale=0.6)])
        self.dit(l3b, "et 6 x.", avec=[FadeIn(t.in2, scale=0.6)])
        l4 = self.lg("L'aire totale :", 0, 0, 38, CIEL, maxw=3.4)
        l4a = self.lg("2x² + 6x.", 0, 0, 44, lettres="x", maxw=3.4)
        VGroup(l4, l4a).arrange(RIGHT, buff=0.3).move_to(P(1.0, 0.75))
        self.dit(l4, "L'aire totale :", avec=[Circumscribe(VGroup(t.r1, t.r2), color=CIEL, buff=0.06)])
        self.dire_eq(l4a, "2 x au carré plus 6 x.", echelle=1.15)
        l5 = self.lg("Elle cherche", 3.1, -0.65, 38, JAUNE_TITRE, maxw=5.6)
        l6 = self.lg("la largeur commune", 3.1, -1.28, 38, JAUNE_TITRE, maxw=5.6)
        l7 = self.lg("aux deux parties.", 3.1, -1.91, 38, JAUNE_TITRE, maxw=5.6)
        self.dit(l5, "Elle cherche")
        self.dit(l6, "la largeur commune", avec=[GrowFromCenter(t.acc), FadeIn(t.cote, scale=1.4)])
        self.dit(l7, "aux deux parties.")
        self.insister(t.cote, 1.4, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 02 : chaque terme comme un produit ──────────────────────────────────
    def ecran_nombre_lettre(self):
        self.ecran("02-nombre-lettre")
        l0 = self.lg("Écrivons chaque terme comme un produit.", 0, 3.0, 42, CIEL, maxw=12)
        self.dit(l0, "Écrivons chaque terme comme un produit.")
        t = terrasse(0.9, 2.1, 1.45, "2x²", "6x", 36)
        t.move_to(P(4.75, 1.2))
        self.play(FadeIn(t), run_time=0.3)
        a = D("2x² = 2 × x × x", 56).mis_sur_egal(-3.1, 1.75)
        self.dire_eq(a, "2 x au carré, c'est 2 fois x fois x.")
        b = D("6x = 2 × 3 × x", 56).mis_sur_egal(-3.1, 0.65)
        self.dire_eq(b, "6 x, c'est 2 fois 3 fois x.")
        deux = VGroup(a.atomes[4], b.atomes[3])
        xs = VGroup(a.atomes[8], b.atomes[7])
        r1 = self.lg("Le 2 est commun.", 0, 0, 40, maxw=4.6)
        r2 = self.lg("Le x aussi.", 0, 0, 40, lettres="x", maxw=3.6)
        VGroup(r1, r2).arrange(RIGHT, buff=0.7).move_to(P(-2.0, -0.5))
        self.dit(r1, "Le 2 est commun.", avec=[deux.animate.set_color(FACTEUR)])
        self.play(Circumscribe(VGroup(*deux), color=FACTEUR, buff=0.1), run_time=0.45)
        self.dit(r2, "Le x aussi.", avec=[xs.animate.set_color(FACTEUR)])
        self.play(Circumscribe(VGroup(*xs), color=FACTEUR, buff=0.1), run_time=0.45)
        r3 = self.lg("Le facteur commun, c'est 2x :", -2.0, -1.55, 48, JAUNE_TITRE, maxw=9)
        VGroup(*r3.atomes[-3:-1]).set_color(FACTEUR)
        self.dit(r3, "Le facteur commun, c'est 2 x :")
        r4 = self.lg("la largeur de la terrasse.", -2.0, -2.35, 42, CIEL, maxw=9)
        deuxx = D("2x", 46, FACTEUR, lettres="", audit=False).move_to(t.cote)
        self.dit(r4, "la largeur de la terrasse.", avec=[ReplacementTransform(t.cote, deuxx)])
        self.play(Circumscribe(t.acc, color=FACTEUR, buff=0.06), run_time=0.45)
        self.insister(VGroup(*r3.atomes[-3:-1]), 1.3, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 03 : on sort 2x ─────────────────────────────────────────────────────
    def ecran_sortir(self):
        self.ecran("03-sortir")
        l0 = self.lg("On sort 2x devant la parenthèse.", 0, 3.05, 42, lettres="x", maxw=12)
        VGroup(l0.atomes[2], l0.atomes[3]).set_color(FACTEUR)
        t = terrasse(1.0, 2.3, 1.5, "2x²", "6x", 38, cote=D("2x", 44, FACTEUR, lettres="", audit=False))
        t.move_to(P(-2.6, 1.75))
        self.dit(l0, "On sort 2 x devant la parenthèse.", avec=[FadeIn(t)])
        self.play(Circumscribe(VGroup(t.acc, t.cote), color=FACTEUR, buff=0.06), run_time=0.45)
        bx = Brace(t.r1, DOWN, buff=0.08, color=INCONNUE)
        b3 = Brace(t.r2, DOWN, buff=0.08, color=WHITE)
        lx = D("x", 40, audit=False).next_to(bx, DOWN, buff=0.06)
        l3_ = T("3", 40, WHITE, audit=False).next_to(b3, DOWN, buff=0.06)
        l1 = self.lg("Il reste x, et 3.", 3.6, 1.75, 44, lettres="x", maxw=5.0)
        self.dit_avec(l1, "Il reste x, et 3.", {2: lambda: [GrowFromCenter(bx), FadeIn(lx)],
                                                 5: lambda: [GrowFromCenter(b3), FadeIn(l3_)]})
        g = D("2x² + 6x = 2x(x + 3)", 64).mis_sur_egal(-0.2, -0.55)
        VGroup(g.atomes[7], g.atomes[8]).set_color(FACTEUR)
        self.dire_eq(g, "2 x au carré plus 6 x égale 2 x fois, entre parenthèses, x plus 3.", echelle=1.15)
        self.play(g.egal.animate.set_color(EGAL), run_time=0.1)
        cg = self.cadre(g).set_color(CIEL)
        self.play(Create(cg), run_time=0.2)
        f1 = self.fleche_arc(VGroup(g.atomes[7], g.atomes[8]), g.atomes[10], angle=-1.6)
        f2 = self.fleche_arc(VGroup(g.atomes[7], g.atomes[8]), g.atomes[12], angle=-1.15)
        v0 = self.lg("On vérifie :", -5.0, -1.85, 40, CIEL, maxw=3.0)
        self.dit(v0, "On vérifie :")
        va = D("2x × x = 2x²", 50).mis_sur_egal(0.3, -1.85)
        VGroup(va.atomes[0], va.atomes[1]).set_color(FACTEUR)
        self.dire_eq(va, "2 x fois x, 2 x au carré.", avec=[Create(f1)])
        vb = D("2x × 3 = 6x", 50).mis_sur_egal(0.3, -2.7)
        VGroup(vb.atomes[0], vb.atomes[1]).set_color(FACTEUR)
        self.dire_eq(vb, "2 x fois 3, 6 x.", avec=[Create(f2)])
        ok = self.lg("C'est juste.", 4.1, -1.85, 50, VERT_OK, maxw=3.4)
        self.dit(ok, "C'est juste.", avec=[Create(self.cadre_ok(VGroup(*va.atomes[5:]), 0.08)),
                                           Create(self.cadre_ok(VGroup(*vb.atomes[5:]), 0.08))])
        self.insister(ok, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse B) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        e = D("5x² + 10x", 76, audit=False).move_to(P(-3.6, 1.55))
        r = D("= 5x(x + 2)", 60, VERT_OK, audit=False).next_to(e, DOWN, buff=0.7)
        r.shift(RIGHT * (e.get_left()[0] - r.get_left()[0]))
        VGroup(r.atomes[1], r.atomes[2]).set_color(FACTEUR)
        f1 = self.fleche_arc(VGroup(r.atomes[1], r.atomes[2]), r.atomes[4], VERT_OK, angle=-1.6, sw=4)
        f2 = self.fleche_arc(VGroup(r.atomes[1], r.atomes[2]), r.atomes[6], VERT_OK, angle=-1.15, sw=4)

        def avant(sc):
            sc.eq_dans_q(0, "Factorise au maximum", "Factorise au maximum", lettres="", fs=36)
            sc.eq_dans_q(0, "5x² + 10x.", "5 x au carré plus 10 x.", lettres="x", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 5x(x + 2).", "Réponse B : 5 x fois, entre parenthèses, x plus 2.", lettres="x",
                     premier=True, avec=[FadeIn(r, shift=DOWN * 0.2)])
            sc.play(Create(f1), Create(f2), run_time=0.4)
            sc.ph_eq(1, "A et C sont justes, mais pas finies :", "A et C sont justes, mais pas finies :")
            sc.ph_eq(2, "il reste un facteur commun", "il reste un facteur commun")
            sc.ph_eq(3, "dans la parenthèse.", "dans la parenthèse.")
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Factorise au maximum", "5x² + 10x."],
                            [Eq("5(x² + 2x)", 34), Eq("5x(x + 2)", 34), Eq("x(5x + 10)", 34)], 1,
                            ["Réponse B : 5x(x + 2).", "A et C sont justes, mais pas finies :",
                             "il reste un facteur commun", "dans la parenthèse."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : le piège : s'arrêter trop tôt ──────────────────────────────────
    def ecran_pas_fini(self):
        self.ecran("04-pas-fini")
        tit = T("Le piège :", 46, PIEGE, gras=True)
        l0 = self.lg("s'arrêter trop tôt.", 0, 0, 46, maxw=6)
        VGroup(tit, l0).arrange(RIGHT, buff=0.35).move_to(P(-1.0, 3.0))
        self.au("Le piège", FadeIn(tit, scale=1.3), rt=0.25)
        self.dit(l0, "s'arrêter trop tôt.")
        g1 = D("12x + 18 = 2(6x + 9)", 60).mis_sur_egal(-0.4, 1.9)
        self.dire_eq(g1, "12 x plus 18 égale 2 fois, entre parenthèses, 6 x plus 9.", echelle=1.15)
        par = VGroup(*g1.atomes[7:11])
        ok1 = self.coche(VERT_OK, 0.26).next_to(g1, RIGHT, buff=0.35)
        l1 = self.lg("C'est juste, mais 6x et 9 ont encore 3 en commun !", 0, 0.8, 40, lettres="x", maxw=12.4)
        i3 = idx(l1, "3")
        l1.atomes[i3].set_color(FACTEUR)
        self.dit_avec(l1, "C'est juste, mais 6 x et 9 ont encore 3 en commun !",
                      {idx(l1, "juste"): lambda: [Create(ok1)],
                       idx(l1, "6"): lambda: [Circumscribe(VGroup(g1.atomes[7], g1.atomes[8]), color=FACTEUR, buff=0.08)],
                       idx(l1, "9"): lambda: [Circumscribe(g1.atomes[10], color=FACTEUR, buff=0.08)],
                       i3: lambda: [par.animate.set_color(PIEGE), g1.atomes[5].animate.set_color(PIEGE)]})
        self.play(Wiggle(VGroup(*g1.atomes[6:12])), run_time=0.5)
        l2 = self.lg("Le plus grand facteur commun de 12 et 18, c'est 6.", 0, -0.2, 42, JAUNE_TITRE, maxw=12.4)
        i6 = idx(l2, "6")
        l2.atomes[i6].set_color(FACTEUR)
        self.dit_avec(l2, "Le plus grand facteur commun de 12 et 18, c'est 6.",
                      {idx(l2, "12"): lambda: [Circumscribe(g1.atomes[0], color=FACTEUR, buff=0.08)],
                       idx(l2, "18"): lambda: [Circumscribe(g1.atomes[3], color=FACTEUR, buff=0.08)]})
        self.insister(l2.atomes[i6], 1.5, 0.18)
        g2 = D("12x + 18 = 6(2x + 3)", 60).mis_sur_egal(-0.4, -1.4)
        g2.atomes[5].set_color(FACTEUR)
        self.dire_eq(g2, "12 x plus 18 égale 6 fois, entre parenthèses, 2 x plus 3.", echelle=1.15,
                     avec=[g1.animate.set_opacity(0.45), ok1.animate.set_opacity(0.45)])
        c2 = self.cadre_ok(g2, 0.16)
        self.play(Create(c2), run_time=0.25)
        f1 = self.fleche_arc(g2.atomes[5], VGroup(g2.atomes[7], g2.atomes[8]), angle=-1.5)
        f2 = self.fleche_arc(g2.atomes[5], g2.atomes[10], angle=-1.1)
        self.play(Create(f1), Create(f2), run_time=0.4)
        self.insister(g2, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05 : c'est fini quand la parenthèse n'a plus rien en commun ─────────
    def ecran_fini(self):
        self.ecran("05-fini")
        l1 = self.lg("Pour savoir si c'est fini,", 0, 3.05, 44, CIEL, maxw=11)
        self.dit(l1, "Pour savoir si c'est fini,")
        e = D("6(2x + 3)", 88, audit=False).move_to(P(0, 1.2))
        e.atomes[0].set_color(FACTEUR)
        par = VGroup(*e.atomes[1:])
        loupe_c = SurroundingRectangle(par, color=JAUNE_TITRE, buff=0.16, stroke_width=6, corner_radius=0.3)
        manche = Line(loupe_c.get_corner(DR) + P(-0.05, 0.05), loupe_c.get_corner(DR) + P(0.45, -0.4),
                      color=JAUNE_TITRE, stroke_width=12)
        loupe = VGroup(loupe_c, manche)
        l2 = self.lg("regarde la parenthèse :", 0, -0.3, 42, maxw=11)
        l3 = self.lg("ses termes n'ont plus rien en commun.", 0, -0.95, 42, maxw=11)
        self.dit(l2, "regarde la parenthèse :", avec=[FadeIn(e, shift=UP * 0.2)])
        self.play(Create(loupe), par.animate.scale(1.12), run_time=0.45)
        self.play(par.animate.scale(1 / 1.12), run_time=0.25)
        self.dit(l3, "ses termes n'ont plus rien en commun.")
        g = Bloc(1.6, 0.9, "#1e3a5f", None).move_to(P(-4.3, -2.3))
        d = Bloc(1.6, 0.9, "#1e3a5f", None).move_to(P(-1.8, -2.3))
        tg = D("2x", 54, audit=False).move_to(g)
        td = T("3", 54, WHITE, audit=False).move_to(d)
        l4 = self.lg("2x et 3 : rien de commun.", 2.6, -2.0, 42, lettres="x", maxw=6.0)
        self.dit_avec(l4, "2 x et 3 : rien de commun.", {0: lambda: [FadeIn(g), FadeIn(tg)],
                                                          idx(l4, "3"): lambda: [FadeIn(d), FadeIn(td)]})
        self.play(Circumscribe(VGroup(g, d), color=CIEL, buff=0.08), run_time=0.45)
        l5 = self.lg("C'est fini.", 2.6, -2.85, 48, VERT_OK, maxw=4)
        self.dit(l5, "C'est fini.")
        self.play(Create(self.cadre_ok(l5, 0.14)), Create(self.coche(VERT_OK, 0.3).next_to(e, RIGHT, buff=0.5)),
                  run_time=0.3)
        self.insister(l5, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse C) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        e = D("8x + 20", 80, audit=False).move_to(P(-3.6, 1.1))
        a = D("4 × 2x", 46, audit=False).next_to(VGroup(e.atomes[0], e.atomes[1]), DOWN, buff=0.75)
        b = D("4 × 5", 46, audit=False).next_to(e.atomes[3], DOWN, buff=0.75)
        if b.get_left()[0] < a.get_right()[0] + 0.45:
            b.shift(RIGHT * (a.get_right()[0] + 0.45 - b.get_left()[0]))
        for m in (a, b):
            m.atomes[0].set_color(FACTEUR)

        def avant(sc):
            sc.eq_dans_q(0, "Quel est le plus grand", "Quel est le plus grand", lettres="", fs=36)
            sc.eq_dans_q(0, "facteur commun de 8x + 20 ?", "facteur commun de 8 x plus 20 ?", lettres="x", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : 4.", "Réponse C : 4.", premier=True)
            sc.ph_eq(1, "8x = 4 × 2x,", "8 x, c'est 4 fois 2 x,", lettres="x", avec=[FadeIn(a, shift=DOWN * 0.2)])
            sc.ph_eq(2, "et 20 = 4 × 5.", "et 20, c'est 4 fois 5.", avec=[FadeIn(b, shift=DOWN * 0.2)])
            sc.play(Circumscribe(VGroup(a.atomes[0], b.atomes[0]), color=FACTEUR, buff=0.1), run_time=0.5)
            sc.ph_eq(3, "2x et 5 n'ont plus rien en commun.", "2 x et 5 n'ont plus rien en commun.", lettres="x")
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Quel est le plus grand", "facteur commun de 8x + 20 ?"],
                            [Eq("2", 34), Eq("8", 34), Eq("4", 34)], 2,
                            ["Réponse C : 4.", "8x = 4 × 2x,", "et 20 = 4 × 5.", "2x et 5 n'ont plus rien en commun."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        l = self.lg("Factorise au maximum", -3.2, 1.6, 46, CIEL, maxw=6.4)
        self.dit(l, "Factorise au maximum")
        e = D("3x² + 12x", 84).move_to(P(-3.2, 0.35))
        t = terrasse(0.95, 2.6, 1.7, "3x²", "12x", 40)
        t.move_to(P(3.4, 0.6))
        self.dire_eq(e, "3 x au carré plus 12 x.", echelle=1.15)
        self.play(FadeIn(VGroup(t.r1, t.r2, t[2], t[3], t.in1, t.in2)), GrowFromCenter(t.acc), FadeIn(t.cote, scale=1.4),
                  run_time=0.35)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.9))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, l=l, e=e, t=t, pz=pz)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("06b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 2.9))
        e, t = d["e"], d["t"]
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["l"]),
                e.animate.scale(0.75).move_to(P(-3.4, 1.85)), rt=0.4)
        bx = Brace(t.r1, DOWN, buff=0.08, color=INCONNUE)
        b4 = Brace(t.r2, DOWN, buff=0.08, color=WHITE)
        lx = D("x", 40, audit=False).next_to(bx, DOWN, buff=0.06)
        l4 = T("4", 40, WHITE, audit=False).next_to(b4, DOWN, buff=0.06)
        a = D("3x² = 3x × x", 52).mis_sur_egal(-3.6, 0.75)
        VGroup(a.atomes[4], a.atomes[5]).set_color(FACTEUR)
        self.dire_eq(a, "3 x au carré, c'est 3 x fois x.")
        self.play(GrowFromCenter(bx), FadeIn(lx), run_time=0.25)
        b = D("12x = 3x × 4", 52).mis_sur_egal(-3.6, -0.25)
        VGroup(b.atomes[3], b.atomes[4]).set_color(FACTEUR)
        self.dire_eq(b, "12 x, c'est 3 x fois 4.")
        self.play(GrowFromCenter(b4), FadeIn(l4), run_time=0.25)
        r0 = self.lg("Le facteur commun est 3x.", -2.6, -1.25, 46, JAUNE_TITRE, maxw=8)
        VGroup(*r0.atomes[-3:-1]).set_color(FACTEUR)
        trois = D("3x", 46, FACTEUR, lettres="", audit=False).move_to(t.cote)
        self.dit(r0, "Le facteur commun est 3 x.", avec=[ReplacementTransform(t.cote, trois)])
        self.play(Circumscribe(VGroup(a.atomes[4], a.atomes[5], b.atomes[3], b.atomes[4]), color=FACTEUR, buff=0.08),
                  Circumscribe(t.acc, color=FACTEUR, buff=0.06), run_time=0.5)
        r = self.lg("Résultat : 3x(x + 4).", -0.6, -2.4, 58, VERT_OK, lettres="", maxw=10)
        self.dit(r, "Résultat : 3 x fois, entre parenthèses, x plus 4.")
        self.play(Create(self.cadre_ok(r, 0.18)), run_time=0.2)
        self.insister(r, 1.1, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        e = D("2x² + 6x", 50, audit=False)
        r = D("= 2x(x + 3)", 46, VERT_OK, audit=False).next_to(e, DOWN, buff=0.3)
        VGroup(r.atomes[1], r.atomes[2]).set_color(FACTEUR)
        t = terrasse(0.75, 1.75, 1.2, "2x²", "6x", 30, cote=D("2x", 34, FACTEUR, lettres="", audit=False))
        t.next_to(r, DOWN, buff=0.45)
        fig = VGroup(e, r, t)
        lignes = self.finale_colonne([["On sort le plus grand nombre", "commun, et la lettre commune."],
                                      ["La factorisation est finie quand la", "parenthèse n'a plus rien en commun."],
                                      ["Et on vérifie", "en développant."]],
                                     fs=38, figure=fig)
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_paysagiste()
        self.ecran_nombre_lettre()
        self.ecran_sortir()
        self.ecran_question1()
        self.ecran_pas_fini()
        self.ecran_fini()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
