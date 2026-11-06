# equation_resoudre_distributivite.py
# EleveAI — Maths 4e — série « Équations », épisode 05 : LES ÉQUATIONS AVEC PARENTHÈSES.
# Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : equation_resoudre_distributivite.
# Décor et métier : MUSIQUE (Nathan, DJ). Centres : electro-dj, musique.
# Écrans : garde (00) ; la timeline du DJ (01) ; deux routes en deux colonnes : diviser
# (02), développer (03), même arrivée (04) ; QUESTION 1 (04q) ; le piège (05) ; avec un
# moins (06) ; QUESTION 2 (06q) ; défi (07) et correction (07b) ; ce que tu as appris
# (08) ; fin (09).
# Voix : manim/voix/4e-equation-resoudre-distributivite.json (validée, débit −6) ;
# marques : equation_resoudre_distributivite_marques.json.
#
# Complète equation_commun.py (lecture seule), ICI : Bloc, platine(), partie(),
# Barre (x moins un nombre), fleche_arc(), glisser() (la ligne suivante : ses atomes
# viennent de la ligne d'avant), sous_membre(), ph_eq(), E().
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/equation_resoudre_distributivite.py EquationResoudreDistributivite4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/equation_resoudre_distributivite.py EquationResoudreDistributivite4e -o eleveai-maths-4e-equation-resoudre-distributivite --media_dir manim/scripts/4e/media-eq-05
# Sortie : manim/sorties/4e/maths/equations/05-resoudre-distributivite/eleveai-maths-4e-equation-resoudre-distributivite.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402

PAROLE.update({"5,5": "5 virgule 5"})
VIOLET_T = "#7c3aed"  # la transition (ni bleu ni orange : le code couleur reste libre)
GRIS_B = "#94a3b8"
BLEU_BLOC = "#0369a1"  # les blocs de l'inconnue : bleu foncé, le x blanc s'y lit de loin
FOND_B = "#0b1220"


def E(s, fs=60, **kw):
    """Une Eq dont les décimaux (« 5,5 », dit « 5 virgule 5 ») ne passent pas à l'audit."""
    e = Eq(s, fs, **kw)
    for a in e.atomes:
        if "," in a.original_text and a.original_text[0].isdigit():
            a._pas_audit = True
    return e


class Bloc(VGroup):
    """Un morceau de timeline : .rect et .txt (posé au mot, ou audit=False)."""

    def __init__(self, w, h, couleur, s=None, fs=28, audit=False, onde=False, **kw):
        super().__init__(**kw)
        self.rect = RoundedRectangle(width=w, height=h, corner_radius=0.06, fill_color=couleur, fill_opacity=1,
                                     stroke_color=WHITE, stroke_width=2)
        self.add(self.rect)
        self.txt = None
        if s:
            self.txt = T(s, fs, WHITE, audit, gras=True)
            if self.txt.width > w - 0.1:
                self.txt.scale_to_fit_width(w - 0.1)
        if onde:  # la forme d'onde du morceau : aucune strie sous son nom, qui reste lisible
            hs = [0.3, 0.6, 0.42, 0.8, 0.5, 0.7, 0.34, 0.62, 0.46, 0.76, 0.38, 0.56]
            n = max(4, int(w / 0.14))
            libre = (self.txt.width / 2 + 0.16) if self.txt is not None else 0
            xs = [-w / 2 + 0.1 + k * (w - 0.2) / (n - 1) for k in range(n)]
            self.add(VGroup(*[Line(P(x, -hs[k % 12] * h * 0.42), P(x, hs[k % 12] * h * 0.42),
                                   color=WHITE, stroke_width=2, stroke_opacity=0.28)
                              for k, x in enumerate(xs) if abs(x) > libre]))
        if self.txt is not None:
            self.add(self.txt)


def partie(u, h, n=3, lettre="x", x_val=4, txt_x="x min", txt_n="3 min", fs=28):
    """Une partie du set : le morceau (bleu) et la transition (violette), à l'échelle u."""
    a = Bloc(x_val * u, h, BLEU_BLOC, txt_x, fs, onde=True)
    b = Bloc(n * u, h, VIOLET_T, txt_n, fs)
    g = VGroup(a, b).arrange(RIGHT, buff=0)
    g.a, g.b = a, b
    return g


def platine(s=1.0):
    """La table de mixage : deux disques qui tournent (.disques), des curseurs."""
    fond = RoundedRectangle(width=2.5, height=1.0, corner_radius=0.1, fill_color="#1f2937", fill_opacity=1,
                            stroke_color="#64748b", stroke_width=3)
    disques = VGroup()
    for x in (-0.72, 0.72):
        d = VGroup(Circle(radius=0.38, fill_color="#0f172a", fill_opacity=1, stroke_color=CIEL, stroke_width=3),
                   Circle(radius=0.22, stroke_color="#475569", stroke_width=2),
                   Dot(ORIGIN, radius=0.05, color=OPERATION),
                   Line(P(0, 0.1), P(0, 0.34), color=WHITE, stroke_width=4)).move_to(P(x, 0))
        disques.add(d)
    mix = VGroup(*[Line(P(x, -0.3), P(x, 0.3), color="#64748b", stroke_width=3) for x in (-0.09, 0.09)],
                 RoundedRectangle(width=0.14, height=0.08, corner_radius=0.02, fill_color=JAUNE_TITRE, fill_opacity=1,
                                  stroke_width=0).move_to(P(-0.09, 0.12)),
                 RoundedRectangle(width=0.14, height=0.08, corner_radius=0.02, fill_color=VERT_OK, fill_opacity=1,
                                  stroke_width=0).move_to(P(0.09, -0.1)))
    g = VGroup(fond, disques, mix)
    g.disques = disques
    return g.scale(s)


class Barre(VGroup):
    """x − r à l'échelle u : le morceau gardé (.plein) et, en pointillés, ce qui est
    retiré (.retire). .txt = le texte du morceau gardé (audit=False)."""

    def __init__(self, u, h, x_val, r, s, fs=26, **kw):
        super().__init__(**kw)
        self.plein = RoundedRectangle(width=(x_val - r) * u, height=h, corner_radius=0.05, fill_color=BLEU_BLOC,
                                      fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        self.retire = DashedVMobject(Rectangle(width=r * u, height=h, stroke_color=GRIS_B, stroke_width=3), num_dashes=16)
        VGroup(self.plein, self.retire).arrange(RIGHT, buff=0)
        self.txt = T(s, fs, WHITE, audit=False, gras=True).move_to(self.plein)
        if self.txt.width > self.plein.width - 0.12:
            self.txt.scale_to_fit_width(self.plein.width - 0.12)
        self.add(self.plein, self.retire, self.txt)


class _OutilsDj:
    """Ce que la paysage et le short de l'épisode partagent."""

    def _debut_phrase(self, phrase, n=1):
        debut = -1
        for _ in range(n):
            debut = self._texte_voix.find(phrase, debut + 1)
            if debut < 0:
                raise ValueError(f"« {phrase} » (n = {n}) absent de la voix {self._cle_voix}")
        return debut

    def glisser(self, a, b, phrase, paires, n=1, sauf=(), rt=0.22):
        """La ligne b se pose AU MOT : chaque atome listé (paires {i_b: i_a}) GLISSE
        depuis la ligne a, les autres arrivent en fondu."""
        debut = self._debut_phrase(phrase, n)
        src = {id(b.atomes[ib]): a.atomes[ia] for ib, ia in paires.items()}
        lots = self._plan_eq(b, debut, debut + len(phrase), sauf)
        for k, (pos, atomes) in enumerate(lots):
            self._attendre_pos(pos)
            d = rt
            if k + 1 < len(lots):
                gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                d = max(0.08, min(rt, gap - 0.01))
            self.play(*[TransformFromCopy(src[id(x)], x) if id(x) in src else FadeIn(x, scale=1.2) for x in atomes],
                      run_time=d)

    def sous_membre(self, m, s, y, fs=36, audit=True):
        """L'opération orange, écrite sous un membre (m) à la hauteur y."""
        o = E(s, fs, couleur=OPERATION, lettres="")
        if not audit:
            o.sans_audit()
        return o.move_to(P(m.get_x(), y))

    def deux_cotes(self, g, d, s, y, phrase, fs=36, n=1, mot_d=None, avec=()):
        """L'opération des deux côtés : à gauche sur `phrase`, à droite aussitôt ou
        au mot mot_d."""
        o1 = self.sous_membre(g, s, y, fs)
        o2 = self.sous_membre(d, s, y, fs, audit=False)
        self.dire_eq(o1, phrase, n=n, echelle=1.0, rt=0.16, avec=[] if mot_d else list(avec) + [FadeIn(o2)])
        if mot_d:
            self.au(mot_d, FadeIn(o2), *avec, rt=0.25)
        return o1, o2

    def ph_eq(self, i, s, phrase, n=1, lettres="", couleur=None, premier=False):
        """La ligne i de la phrase de réponse, posée mot à mot (avec ses nombres)."""
        ref = self.ph_q[i]
        e = E(s, 30, couleur=couleur or VERT_OK, lettres=lettres)
        e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)  # jamais plus large que la ligne prévue
        sauf = []
        if premier:  # « Réponse » : dit pendant que la carte s'allume, il n'attend plus
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        self.dire_eq(e, phrase, n=n, echelle=1.0, rt=0.16, sauf=sauf)
        return e

    def fleche_arc(self, a, b, couleur=None, angle=-1.2, sw=5):
        """Du nombre devant la parenthèse vers ce qu'il multiplie (par au-dessus)."""
        return CurvedArrow(a.get_top() + UP * 0.1, b.get_top() + UP * 0.12, angle=angle, color=couleur or OPERATION,
                           stroke_width=sw, tip_length=0.16)


XE_G, XE_D = -2.75, 3.75  # le signe = des deux routes
Y_R = (1.9, 1.12, 0.47, -0.16, -0.72, -1.42)  # les rangées de la colonne de droite


class EquationResoudreDistributivite4e(_OutilsDj, PaysageEq):
    nom_voix = "4e-equation-resoudre-distributivite"
    fichier_marques = "equation_resoudre_distributivite_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Résoudre une équation avec des parenthèses", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Résoudre", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        pg, pd = T("(", 150, WHITE, audit=False), T(")", 150, WHITE, audit=False)
        pg.move_to(P(-3.7, 0.2))
        pd.move_to(P(-1.1, 0.2))
        q = T("?", 110, INCONNUE, audit=False, gras=True).move_to(P(-2.4, 0.2))
        self.au("parenthèses", FadeIn(pg, shift=RIGHT * 0.4), FadeIn(pd, shift=LEFT * 0.4), rt=0.35)
        l = Eq("Par où commencer ?", 50, lettres="").move_to(P(3.0, 0.2))
        self.dire_eq(l, "Par où commencer ?", echelle=1.0, rt=0.16, avec=[FadeIn(q, scale=1.4)])
        self.insister(q, 1.25, 0.2)
        self.attendre_voix(marge=0.6)

    # ── 01 : Nathan et sa timeline ──────────────────────────────────────────
    def ecran_dj(self):
        self.ecran("01-dj")
        m = Metier(["Nathan", "DJ"], fs=38, peau="#8d5524", tenue="#6366f1", s=0.78)
        m.nom.arrange(DOWN, buff=0.14)
        m.perso.add(casque_audio(m.perso))
        m.perso.move_to(P(-5.25, 0.55))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.25)
        pl = platine(0.98).move_to(P(-5.2, -1.0))
        for d in pl.disques:
            d.add_updater(lambda o, dt: o.rotate(-2.4 * dt))
        self.au("Nathan", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("DJ", FadeIn(m.nom[1], shift=UP * 0.1), FadeIn(pl, shift=UP * 0.2), rt=0.3)
        u, h, y = 0.645, 1.05, 1.5
        p1 = partie(u, h).move_to(P(-1.05, y))
        p2 = partie(u, h).next_to(p1, RIGHT, buff=0.0)
        c1 = DashedVMobject(SurroundingRectangle(p1, buff=0.0, color=CIEL, stroke_width=3), num_dashes=40)
        c2 = DashedVMobject(SurroundingRectangle(p2, buff=0.0, color=CIEL, stroke_width=3), num_dashes=40)
        lt = Eq("2 parties identiques", 36, CIEL, lettres="").move_to(P(1.2, 2.6))
        self.dire_eq(lt, "2 parties identiques", echelle=1.0, rt=0.15, avec=[Create(c1), Create(c2)])
        for b in (p1.a, p1.b):
            b.remove(b.txt)
        mo = T("morceau", 28, CIEL).next_to(p1.a, DOWN, buff=0.1)
        self.au("morceau", FadeIn(p1.a, shift=DOWN * 0.15), FadeIn(mo), rt=0.3)
        tx = T("x min", 30, WHITE, gras=True).move_to(p1.a)
        self.au("x minutes", FadeIn(tx, scale=1.3), rt=0.25)
        t3 = T("3 min", 30, WHITE, gras=True).move_to(p1.b)
        self.au("3 minutes", FadeIn(p1.b, shift=DOWN * 0.15), FadeIn(t3, scale=1.3), rt=0.25)
        tr = T("transition", 28, "#c4b5fd").next_to(p1.b, DOWN, buff=0.1)
        self.au("transition", FadeIn(tr), rt=0.25)
        self.play(FadeIn(p2, shift=LEFT * 0.35), run_time=0.45)
        br = Brace(VGroup(p1, p2), DOWN, buff=0.52, color=WHITE)
        self.au("En tout", GrowFromCenter(br), rt=0.3)
        t14 = T("14 min", 40, JAUNE_TITRE, gras=True).next_to(br, DOWN, buff=0.08)
        self.au("14 minutes", FadeIn(t14, scale=1.3), rt=0.25)
        e = Eq("2(x + 3) = 14", 80).move_to(P(1.2, -1.75))
        self.dire_eq(e, "2 fois, entre parenthèses, x plus 3, égale 14")
        self.play(e.egal.animate.set_color(EGAL), run_time=0.12)
        pa = VGroup(e.atomes[1], e.atomes[5])
        self.insister(pa, 1.2, 0.18)
        self.attendre_voix(marge=0.5)
        for d in pl.disques:
            d.clear_updaters()

    # ── 02 : la première route, diviser ─────────────────────────────────────
    def ecran_diviser(self):
        self.ecran("02-diviser")
        sep = DashedLine(P(0.35, 3.3), P(0.35, -1.75), color="#475569", stroke_width=2)
        u, h = 0.33, 0.36
        p1 = partie(u, h, txt_x=None, txt_n=None).move_to(P(-4.5, 2.6))
        p2 = partie(u, h, txt_x=None, txt_n=None).next_to(p1, RIGHT, buff=0)
        e0 = Eq("2(x + 3) = 14", 44).sans_audit().mis_sur_egal(XE_G, Y_R[0])
        e0.egal.set_color(EGAL)
        t = T("Première route :", 28, CIEL).move_to(P(0, 3.2)).align_to(P(-6.2, 0), LEFT)
        self.au("Première", FadeIn(t, shift=DOWN * 0.12), FadeIn(sep), FadeIn(VGroup(p1, p2)), FadeIn(e0), rt=0.3)
        t2 = Eq("on divise", 28, OPERATION, lettres="").next_to(t, RIGHT, buff=0.15)
        t2.shift(UP * (t.get_bottom()[1] - t2.atomes[0].get_bottom()[1]))
        self.dire_eq(t2, "on divise", echelle=1.0, rt=0.12)
        coupe = DashedLine(p1.get_corner(UR) + UP * 0.1, p1.get_corner(DR) + DOWN * 0.1, color=OPERATION, stroke_width=5)
        self.deux_cotes(e0.gauche, e0.droite, "÷ 2", 1.07, "divise par 2", fs=34, mot_d="deux côtés",
                        avec=[Create(coupe), p2.animate.set_opacity(0.22)])
        e1 = Eq("x + 3 = 7", 44).mis_sur_egal(XE_G, 0.25)
        self.glisser(e0, e1, "x plus 3 égale 7", {0: 2, 1: 3, 2: 4, 3: 6})
        e1.egal.set_color(EGAL)
        self.deux_cotes(e1.gauche, e1.droite, "− 3", -0.58, "On soustrait 3", fs=34, avec=[p1.b.animate.set_opacity(0.22)])
        e2 = Eq("x = 4", 44).mis_sur_egal(XE_G, Y_R[5])
        self.glisser(e1, e2, "x égale 4", {0: 0, 1: 3})
        self.play(e2.egal.animate.set_color(EGAL), e2.droite.animate.set_color(VERT_OK), run_time=0.12)
        f = Eq("Le morceau dure 4 minutes.", 34, VERT_OK, lettres="").move_to(P(-3.0, -2.12))
        self.dire_eq(f, "Le morceau dure 4 minutes.", echelle=1.0, rt=0.14)
        self.g0, self.g1, self.g2, self.fin_g = e0, e1, e2, f
        self.attendre_voix(marge=0.4)

    # ── 03 : la deuxième route, développer ──────────────────────────────────
    def ecran_developper(self):
        self.dire("03-developper")
        t = T("Deuxième route :", 28, CIEL).move_to(P(0, 3.2)).align_to(P(0.55, 0), LEFT)
        self.au("Deuxième", FadeIn(t, shift=DOWN * 0.12), rt=0.25)
        t2 = Eq("on développe", 28, OPERATION, lettres="").next_to(t, RIGHT, buff=0.15)
        t2.shift(UP * (t.get_bottom()[1] - t2.atomes[0].get_bottom()[1]))
        self.dire_eq(t2, "on développe", echelle=1.0, rt=0.12)
        e0 = Eq("2(x + 3) = 14", 44).sans_audit().mis_sur_egal(XE_D, Y_R[0])
        e0.egal.set_color(EGAL)
        self.play(FadeIn(e0), run_time=0.15)
        e1 = Eq("2x + 6 = 14", 44).mis_sur_egal(XE_D, Y_R[1])
        f1 = self.fleche_arc(e0.atomes[0], e0.atomes[2], angle=-1.7)
        self.au("2 fois x", Create(f1), e0.atomes[2].animate.set_color(OPERATION), rt=0.3)
        reste = [e1.atomes[k] for k in (2, 3, 4, 5)]
        self.glisser(e0, e1, "2 x.", {0: 0, 1: 2}, sauf=reste)
        self.play(e0.atomes[2].animate.set_color(INCONNUE), run_time=0.1)
        f2 = self.fleche_arc(e0.atomes[0], e0.atomes[4], angle=-1.25)
        self.au("2 fois 3", Create(f2), e0.atomes[4].animate.set_color(OPERATION), rt=0.3)
        self.glisser(e0, e1, "3, 6.", {3: 4}, sauf=[e1.atomes[k] for k in (0, 1, 2, 4, 5)])
        self.dire_eq(e1, "2 x plus 6 égale 14", sauf=[e1.atomes[k] for k in (0, 1, 3)], echelle=1.1)
        self.play(e1.egal.animate.set_color(EGAL), e0.atomes[4].animate.set_color(WHITE), run_time=0.1)
        self.deux_cotes(VGroup(*e1.atomes[2:4]), e1.droite, "− 6", Y_R[2], "On soustrait 6", fs=34)
        e2 = Eq("2x = 8", 44).mis_sur_egal(XE_D, Y_R[3])
        self.glisser(e1, e2, "2 x égale 8", {0: 0, 1: 1, 2: 4})
        e2.egal.set_color(EGAL)
        self.deux_cotes(e2.gauche, e2.droite, "÷ 2", Y_R[4], "divise par 2", fs=34)
        e3 = Eq("x = 4", 44).mis_sur_egal(XE_D, Y_R[5])
        self.glisser(e2, e3, "x égale 4", {0: 1, 1: 2})
        self.play(e3.egal.animate.set_color(EGAL), e3.droite.animate.set_color(VERT_OK), run_time=0.12)
        self.d3 = e3
        self.attendre_voix(marge=0.4)

    # ── 04 : la même arrivée ────────────────────────────────────────────────
    def ecran_routes(self):
        self.dire("04-deux-routes")
        g = self.encadrer(self.g2, buff=0.09)
        g.stretch_to_fit_width(g.width + 0.2)
        d = self.encadrer(self.d3, buff=0.09)
        d.stretch_to_fit_width(d.width + 0.2)
        self.play(FadeOut(self.fin_g), run_time=0.15)
        l1 = Eq("Deux routes, la même solution.", 42, JAUNE_TITRE, lettres="").move_to(P(0.35, -2.14))
        self.dire_eq(l1, "Deux routes, la même solution.", echelle=1.0, rt=0.14, avec=[Create(g), Create(d)])
        self.insister(VGroup(self.g2, g), 1.15, 0.15)
        l2 = Eq("Ici, diviser d'abord est plus court :", 36, lettres="").move_to(P(0.0, -2.73))
        self.dire_eq(l2, "Ici, diviser d'abord est plus court", echelle=1.0, rt=0.12)
        l3 = Eq("la parenthèse disparaît d'un coup.", 36, VERT_OK, lettres="").move_to(P(0.0, -3.27))
        pa = VGroup(self.g0.atomes[1], self.g0.atomes[5])
        self.dire_eq(l3, "la parenthèse disparaît d'un coup.", echelle=1.0, rt=0.12,
                     avec=[pa.animate.set_color(OPERATION)])
        self.insister(pa, 1.35, 0.16)
        self.insister(VGroup(*self.g1.atomes[:3]), 1.2, 0.15)
        self.attendre_voix(marge=0.5)

    # ── 04q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u, h = 0.42, 0.72
        XF = -3.0
        lg1 = partie(u, h, txt_x="x", txt_n="3", fs=32).move_to(P(XF, 1.15))
        lg2 = partie(u, h, txt_x="x", txt_n="3", fs=32).move_to(P(XF, 0.3))
        for lg in (lg1, lg2):
            lg.a.txt.set_color(WHITE)
        e = Eq("2(x + 3)", 62).sans_audit().move_to(P(XF, 2.55))
        fois = T("2 fois", 30, CIEL, audit=False)
        acc = Brace(VGroup(lg1, lg2), LEFT, buff=0.1, color=CIEL)
        fois.next_to(acc, LEFT, buff=0.08)

        def avant(sc):
            sc.eq_dans_q(0, "Que donne 2(x + 3)", "Que donne 2 fois, entre parenthèses, x plus 3,", fs=36)
            sc.play(FadeIn(e), FadeIn(VGroup(lg1, lg2)), GrowFromCenter(acc), FadeIn(fois), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 2x + 6.", "Réponse B : 2 x plus 6.", lettres="x", premier=True)
            sc.ph_eq(1, "Le 2 multiplie x,", "Le 2 multiplie x,", lettres="x")
            f1 = sc.fleche_arc(e.atomes[0], e.atomes[2], angle=-1.7)
            ya = -1.15
            xa1, xa2 = -5.95, -5.95 + lg1.a.width + 0.04
            sc.play(Create(f1), FadeOut(acc), FadeOut(fois), lg1.a.animate.move_to(P(xa1 + lg1.a.width / 2, ya)),
                    lg2.a.animate.move_to(P(xa2 + lg1.a.width / 2, ya)), run_time=0.45)
            sc.ph_eq(2, "et il multiplie aussi le 3.", "et il multiplie aussi le 3.")
            f2 = sc.fleche_arc(e.atomes[0], e.atomes[4], angle=-1.2)
            xb1 = xa2 + lg1.a.width + 0.2
            xb2 = xb1 + lg1.b.width + 0.04
            sc.play(Create(f2), lg1.b.animate.move_to(P(xb1 + lg1.b.width / 2, ya)),
                    lg2.b.animate.move_to(P(xb2 + lg1.b.width / 2, ya)), run_time=0.45)
            b1 = Brace(VGroup(lg1.a, lg2.a), DOWN, buff=0.08, color=VERT_OK)
            b2 = Brace(VGroup(lg1.b, lg2.b), DOWN, buff=0.08, color=VERT_OK)
            t1 = Eq("2x", 44, VERT_OK, audit=False).next_to(b1, DOWN, buff=0.06)
            t2 = Eq("6", 44, VERT_OK, audit=False).next_to(b2, DOWN, buff=0.06)
            sc.play(GrowFromCenter(b1), GrowFromCenter(b2), FadeIn(t1, scale=1.3), FadeIn(t2, scale=1.3), run_time=0.3)
            sc.rep_fini()

        self.question_pause("04q-question", "04r-reponse", ["Que donne 2(x + 3)", "quand on développe ?"],
                            [Eq("2x + 3", 34), Eq("2x + 6", 34), Eq("x + 6", 34)], 1,
                            ["Réponse B : 2x + 6.", "Le 2 multiplie x,", "et il multiplie aussi le 3."],
                            avant_q=avant, autres_r=apres)

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = T("Le piège :", 46, PIEGE, gras=True).move_to(P(-5.0, 3.0))
        self.au("Le piège", FadeIn(tit, scale=1.3), rt=0.25)
        l = Eq("ne multiplier que le premier terme.", 38, lettres="").next_to(tit, RIGHT, buff=0.22)
        e0 = Eq("2(x + 3)", 66).sans_audit().move_to(P(-4.4, 1.2))
        f1 = self.fleche_arc(e0.atomes[0], e0.atomes[2], PIEGE, angle=-1.7, sw=6)
        self.dire_eq(l, "ne multiplier que le premier terme.", echelle=1.0, rt=0.12, avec=[FadeIn(e0)])
        self.play(Create(f1), run_time=0.25)
        trois = e0.atomes[4]  # le 3 oublié, souligné : un cercle touchait le 3 ou la parenthèse
        rond = Line(trois.get_corner(DL) + P(-0.04, -0.1), trois.get_corner(DR) + P(0.04, -0.1), color=PIEGE, stroke_width=8)
        self.play(Create(rond), run_time=0.2)
        fx = Arrow(P(-2.3, 1.2), P(-1.2, 1.2), color=PIEGE, stroke_width=6, buff=0)
        e1 = Eq("2x + 3", 66, PIEGE, inconnue=PIEGE).move_to(P(0.62, 1.2))
        self.dire_eq(e1, "2 x plus 3", avec=[GrowArrow(fx)])
        ba = self.barrer(e1)
        fx2 = Eq("est faux", 46, PIEGE, lettres="").move_to(P(3.8, 1.2))
        self.dire_eq(fx2, "est faux", echelle=1.0, rt=0.12, avec=[Create(ba)])
        # la preuve à la timeline : il manque un 3
        u, h, y = 0.5, 0.8, -0.35
        ax = -5.75
        a1 = Bloc(4 * u, h, BLEU_BLOC, "x", 36, onde=True)
        a2 = Bloc(4 * u, h, BLEU_BLOC, "x", 36, onde=True)
        b1 = Bloc(3 * u, h, VIOLET_T, "3", 36)
        rangee = VGroup(a1, a2, b1).arrange(RIGHT, buff=0).move_to(P(0, y)).align_to(P(ax, 0), LEFT)
        trou = DashedVMobject(Rectangle(width=3 * u, height=h, stroke_color=PIEGE, stroke_width=4), num_dashes=20)
        trou.next_to(rangee, RIGHT, buff=0)
        tq = T("?", 44, PIEGE, audit=False, gras=True).move_to(trou)
        self.play(FadeIn(rangee, shift=UP * 0.1), run_time=0.3)
        self.play(Create(trou), FadeIn(tq, scale=1.4), run_time=0.3)
        n1 = Eq("Le nombre devant la parenthèse", 42, VERT_OK, lettres="").move_to(P(-0.75, -1.65))
        n2 = Eq("multiplie tout ce qu'elle contient.", 42, VERT_OK, lettres="").move_to(P(-0.75, -2.35))
        self.dire_eq(n1, "Le nombre devant la parenthèse", echelle=1.0, rt=0.12)
        vert = VGroup(*[self.fleche_arc(e0.atomes[0], e0.atomes[k], VERT_OK, angle=a, sw=6) for k, a in ((2, -1.7), (4, -1.2))])
        b2 = Bloc(3 * u, h, VIOLET_T, "3", 36).move_to(trou)
        self.dire_eq(n2, "multiplie tout ce qu'elle contient.", echelle=1.0, rt=0.12,
                     avec=[ReplacementTransform(f1, vert), FadeOut(rond), FadeOut(tq), FadeOut(trou), FadeIn(b2, scale=1.2)])
        self.insister(b2, 1.15, 0.16)
        self.attendre_voix(marge=0.5)

    # ── 06 : avec un moins ──────────────────────────────────────────────────
    def ecran_moins(self):
        self.ecran("06-moins")
        tit = Eq("Avec un moins", 46, JAUNE_TITRE, lettres="").move_to(P(-3.6, 3.05))
        self.dire_eq(tit, "Avec un moins", echelle=1.0, rt=0.14)
        XE = 3.7
        u, h = 0.62, 0.72
        ys = (1.25, 0.3, -0.65)
        bs = [Barre(u, h, 5, 1, "x − 1", 30).move_to(P(-3.0, y)) for y in ys]
        e0 = Eq("3(x − 1) = 12", 62).mis_sur_egal(XE, 2.45)
        self.dire_eq(e0, "3 fois, entre parenthèses, x moins 1, égale 12",
                     avec=[])
        # les barres arrivent au moment où la voix a dit « x moins 1 » (déjà posé)
        self.play(e0.egal.animate.set_color(EGAL), *[FadeIn(b, shift=RIGHT * 0.25) for b in bs], run_time=0.3)
        acc = Brace(VGroup(*bs), LEFT, buff=0.1, color=WHITE)
        t12 = T("12", 40, JAUNE_TITRE, audit=False, gras=True).next_to(acc, LEFT, buff=0.1)
        self.play(GrowFromCenter(acc), FadeIn(t12, scale=1.3), run_time=0.25)
        self.deux_cotes(e0.gauche, e0.droite, "÷ 3", 1.7, "divise par 3", fs=40,
                        avec=[bs[1].animate.set_opacity(0.22), bs[2].animate.set_opacity(0.22), FadeOut(acc), FadeOut(t12)])
        e1 = Eq("x − 1 = 4", 62).mis_sur_egal(XE, 0.95)
        self.glisser(e0, e1, "x moins 1 égale 4", {0: 2, 1: 3, 2: 4, 3: 6})
        q = T("4", 34, WHITE, audit=False, gras=True).move_to(bs[0].plein)
        self.play(e1.egal.animate.set_color(EGAL), ReplacementTransform(bs[0].txt, q), run_time=0.2)
        self.deux_cotes(e1.gauche, e1.droite, "+ 1", 0.2, "ajoute 1", fs=40,
                        avec=[bs[0].retire.animate.set_stroke(OPERATION, 5)])
        e2 = Eq("x = 5", 62).mis_sur_egal(XE, -0.75)
        self.glisser(e1, e2, "x égale 5", {0: 0, 1: 3})
        haut = Brace(VGroup(bs[0].plein, bs[0].retire), UP, buff=0.08, color=VERT_OK)
        tv = Eq("x = 5", 40, VERT_OK, audit=False).next_to(haut, UP, buff=0.06)
        self.play(e2.egal.animate.set_color(EGAL), e2.droite.animate.set_color(VERT_OK), GrowFromCenter(haut), FadeIn(tv, scale=1.2), run_time=0.25)
        self.play(Create(self.encadrer(e2, buff=0.14)), run_time=0.2)
        self.attendre_voix(marge=0.5)

    # ── 06q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u, h = 0.62, 0.62
        ys = (1.75, 0.95, 0.15, -0.65)
        bs = [Barre(u, h, 5, 2, "x − 2", 28).move_to(P(-2.9, y)) for y in ys]
        acc = Brace(VGroup(*bs), LEFT, buff=0.1, color=WHITE)
        t12 = T("12", 40, JAUNE_TITRE, audit=False, gras=True).next_to(acc, LEFT, buff=0.1)

        def avant(sc):
            sc.eq_dans_q(0, "4(x − 2) = 12.", "4 fois, entre parenthèses, x moins 2, égale 12.", fs=36)
            sc.eq_dans_q(0, "Que vaut x ?", "Que vaut x ?", fs=36)
            sc.play(*[FadeIn(b, shift=RIGHT * 0.2) for b in bs], GrowFromCenter(acc), FadeIn(t12), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : 5.", "Réponse C : 5.", premier=True)
            l1 = Eq("On divise par 4 : x − 2 = 3.", 34, VERT_OK).move_to(P(0, -1.6)).align_to(P(-6.2, 0), LEFT)
            sc.dire_eq(l1, "On divise par 4 : x moins 2 égale 3.", echelle=1.0, rt=0.14)
            q = T("3", 34, WHITE, audit=False, gras=True).move_to(bs[0].plein)
            sc.play(*[b.animate.set_opacity(0.22) for b in bs[1:]], FadeOut(acc), FadeOut(t12), ReplacementTransform(bs[0].txt, q), run_time=0.25)
            l2 = Eq("On ajoute 2 : x = 5.", 34, VERT_OK).move_to(P(0, -2.25)).align_to(P(-6.2, 0), LEFT)
            sc.dire_eq(l2, "On ajoute 2 : x égale 5.", echelle=1.0, rt=0.14)
            haut = Brace(VGroup(bs[0].plein, bs[0].retire), UP, buff=0.06, color=VERT_OK)
            tv = Eq("x = 5", 38, VERT_OK, audit=False).next_to(haut, UP, buff=0.05)
            sc.play(bs[0].retire.animate.set_stroke(OPERATION, 5), GrowFromCenter(haut), FadeIn(tv, scale=1.2), run_time=0.25)
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["4(x − 2) = 12.", "Que vaut x ?"],
                            [Eq("3", 34), Eq("1", 34), Eq("5", 34)], 2,
                            ["Réponse C : 5."],
                            avant_q=avant, autres_r=apres)

    # ── 07 : le défi ────────────────────────────────────────────────────────
    XE_C = 1.3

    def ecran_defi(self):
        self.ecran("07-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        self.au("À toi", Write(tit), rt=0.5)
        u, h, y = 0.3, 0.8, 1.45
        intro = Bloc(7 * u, h, "#334155", "7 min", 28)
        ps = VGroup(*[partie(u, h, n=6, x_val=4, txt_x="a", txt_n="6 min", fs=28) for _ in range(3)]).arrange(RIGHT, buff=0)
        ligne = VGroup(intro, ps).arrange(RIGHT, buff=0).move_to(P(-0.4, y))
        cadres = VGroup(*[DashedVMobject(SurroundingRectangle(p, buff=0, color=CIEL, stroke_width=3), num_dashes=30) for p in ps])
        t3 = Eq("3 parties", 34, CIEL, lettres="").next_to(ps, UP, buff=0.12)
        self.dire_eq(t3, "3 parties", echelle=1.0, rt=0.13, avec=[Create(cadres)])
        for p in ps:
            p.b.txt.set_opacity(0)
        ta = [p.a for p in ps]
        self.au("a plus", *[FadeIn(b, shift=DOWN * 0.12) for b in ta], rt=0.25)
        self.au("6 minutes", *[FadeIn(p.b, shift=DOWN * 0.12) for p in ps], rt=0.25)
        for p in ps:
            p.b.txt.set_opacity(1)
        self.add(*[p.b.txt for p in ps])
        self.au("7 minutes", FadeIn(intro, shift=RIGHT * 0.2), rt=0.25)
        tin = T("introduction", 26, "#cbd5e1").next_to(intro, UP, buff=0.12)
        self.au("introduction", FadeIn(tin), rt=0.2)
        br = Brace(ligne, DOWN, buff=0.08, color=WHITE)
        self.au("En tout", GrowFromCenter(br), rt=0.25)
        t37 = T("37 min", 36, JAUNE_TITRE, gras=True).next_to(br, DOWN, buff=0.06)
        self.au("37 minutes", FadeIn(t37, scale=1.3), rt=0.25)
        e = Eq("3(a + 6) + 7 = 37", 66, lettres="a").mis_sur_egal(self.XE_C + 0.6, -0.65)
        self.dire_eq(e, "3 fois, entre parenthèses, a plus 6, plus 7, égale 37")
        self.play(e.egal.animate.set_color(EGAL), run_time=0.1)
        q = Eq("Que vaut a ?", 46, JAUNE_TITRE, lettres="").move_to(P(-0.4, -1.75))
        q.atomes[2].set_color(INCONNUE)
        self.dire_eq(q, "Que vaut a ?", echelle=1.0, rt=0.13)
        pz = T("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(-0.4, -2.6))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, ligne=ligne, ps=ps, intro=intro, tin=tin, t3=t3, br=br, t37=t37, e=e, q=q, pz=pz, cadres=cadres)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("07b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        e = d["e"]
        k = 44 / 66
        y0, pas = 0.95, 1.25
        cible = e.get_center() + (P(self.XE_C, y0) - e.egal.get_center()) + (e.get_center() - e.egal.get_center()) * (k - 1)
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["q"]), FadeOut(d["pz"]), FadeOut(d["br"]),
                FadeOut(d["t37"]), FadeOut(d["tin"]), FadeOut(d["t3"]), e.animate.scale(k).move_to(cible),
                VGroup(d["ligne"], d["cadres"]).animate.shift(UP * 0.4), rt=0.35)
        mg, md = VGroup(*e.atomes[6:8]), e.atomes[9]
        self.deux_cotes(mg, md, "− 7", y0 - pas / 2, "soustrait d'abord 7", fs=34,
                        avec=[d["intro"].animate.set_opacity(0.2)])
        e1 = Eq("3(a + 6) = 30", 44, lettres="a").mis_sur_egal(self.XE_C, y0 - pas)
        self.glisser(e, e1, "3 fois, entre parenthèses, a plus 6, égale 30", {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 8})
        e1.egal.set_color(EGAL)
        self.deux_cotes(e1.gauche, e1.droite, "÷ 3", y0 - 1.5 * pas, "divise par 3", fs=34,
                        avec=[d["ps"][1].animate.set_opacity(0.2), d["ps"][2].animate.set_opacity(0.2), d["cadres"][1:].animate.set_opacity(0.2)])
        e2 = Eq("a + 6 = 10", 44, lettres="a").mis_sur_egal(self.XE_C, y0 - 2 * pas)
        self.glisser(e1, e2, "a plus 6 égale 10", {0: 2, 1: 3, 2: 4, 3: 6})
        e2.egal.set_color(EGAL)
        self.deux_cotes(VGroup(*e2.atomes[1:3]), e2.droite, "− 6", y0 - 2.5 * pas + 0.03, "soustrait 6", fs=34,
                        avec=[d["ps"][0].b.animate.set_opacity(0.2)])
        e3 = Eq("a = 4", 44, lettres="a").mis_sur_egal(self.XE_C, y0 - 3 * pas - 0.1)
        self.glisser(e2, e3, "a égale 4", {0: 0, 1: 3})
        self.play(e3.egal.animate.set_color(EGAL), e3.droite.animate.set_color(VERT_OK), run_time=0.12)
        cad = self.encadrer(e3, buff=0.1)
        cad.stretch_to_fit_width(cad.width + 0.2)
        self.play(Create(cad), run_time=0.2)
        self.insister(VGroup(e3, cad), 1.15, 0.16)
        # le résultat reste le temps de le lire, puis l'écran se vide en fondu (la voix est finie)
        self.attendre_voix(marge=2.2)
        self.play(FadeOut(Group(*[m for m in self.mobjects if type(m).__name__ != "MascotteMargouillat"])), run_time=0.4)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        e = Eq("2(x + 3)", 64).sans_audit()
        f = VGroup(self.fleche_arc(e.atomes[0], e.atomes[2], VERT_OK, angle=-1.7),
                   self.fleche_arc(e.atomes[0], e.atomes[4], VERT_OK, angle=-1.2))
        pl = platine(1.1).next_to(e, DOWN, buff=0.45)
        fig = VGroup(f, e, pl)
        lignes = self.finale_colonne([["Devant une parenthèse,", "on peut diviser d'abord", "ou développer d'abord."],
                                      ["Les deux routes donnent", "la même solution."],
                                      ["En développant, le nombre", "multiplie tout ce qui est", "dans la parenthèse."]],
                                     fs=36, figure=fig)
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_dj()
        self.ecran_diviser()
        self.ecran_developper()
        self.ecran_routes()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_moins()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
