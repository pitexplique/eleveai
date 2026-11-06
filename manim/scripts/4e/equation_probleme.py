# equation_probleme.py
# EleveAI — Maths 4e — série « Équations », épisode 08 : RÉSOUDRE UN PROBLÈME.
# Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : equation_probleme.
# Décor et métier : Yanis, garde forestier. Centres : nature-ecologie.
# Écrans (tous pour la micro equation_probleme) : garde (00) ; la parcelle brûlée (01) ;
# nommer (02) ; traduire (03) ; résoudre (04) ; vérifier et répondre (05) ; QUESTION 1 (05q) ;
# l'enclos (06) ; QUESTION 2 (06q) ; les deux pépinières (07) ; défi des nichoirs (08) et
# correction (08b) ; ce que tu as appris (09) ; fin nouvelle du 05/11 (10).
# Voix : manim/voix/4e-equation-probleme.json (validée, débit −6) ;
# marques : equation_probleme_marques.json.
#
# Complète equation_commun.py (lecture seule), ICI : Reperes (les 4 étapes qui s'allument et
# restent), Parcelle, arbre, Enclos, Serre, sac, camion, nichoir, barre, _OutilsProbleme.
# E et _OutilsDefi viennent de equation_defi.py (import, rien n'y est modifié).
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/equation_probleme.py EquationProbleme4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/equation_probleme.py EquationProbleme4e -o eleveai-maths-4e-equation-probleme --media_dir manim/scripts/4e/media-eq-08
# Sortie : manim/sorties/4e/maths/equations/08-probleme/eleveai-maths-4e-equation-probleme.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_defi import E, _OutilsDefi  # noqa: E402

SOL_BRULE = "#1c1410"
SOL_NEUF = "#2a3518"
FEUILLE = "#4ade80"
VERT_FONCE = "#052e16"
JAUNE_FONCE = "#422006"
TENUE_YANIS = "#4d7c0f"


def arbre(c=None, s=1.0):
    """Un jeune arbre : tronc et deux étages de feuillage."""
    c = c or FEUILLE
    tronc = Rectangle(width=0.07, height=0.14, fill_color="#a16207", fill_opacity=1, stroke_width=0).move_to(P(0, -0.17))
    bas = Polygon(P(-0.14, -0.1), P(0.14, -0.1), P(0, 0.12), fill_color=c, fill_opacity=1, stroke_width=0)
    haut = Polygon(P(-0.11, 0.03), P(0.11, 0.03), P(0, 0.24), fill_color=c, fill_opacity=1, stroke_width=0)
    return VGroup(tronc, bas, haut).scale(s)


class Reperes(VGroup):
    """Les 4 étapes en repères : éteints, allumés (l'étape en cours), verts (faits).
    deja : les étapes déjà faites (vertes) ; tous : les noms déjà écrits, tous."""

    MOTS = ("Nommer", "Traduire", "Résoudre", "Répondre")

    def __init__(self, y=3.2, w=2.95, h=0.6, fs=30, deja=0, tous=False, **kw):
        super().__init__(**kw)
        self.cases, self.noms, self.vus = [], [], set()
        for i, m in enumerate(self.MOTS):
            c = RoundedRectangle(width=w, height=h, corner_radius=0.14, stroke_color="#475569", stroke_width=3,
                                 fill_color="#0b1220", fill_opacity=1)
            n = T(f"{i + 1}. {m}", fs, "#cbd5e1", audit=False).move_to(c)
            self.cases.append(c)
            self.noms.append(n)
        VGroup(*self.cases).arrange(RIGHT, buff=0.2).move_to(P(0, y))
        for c, n in zip(self.cases, self.noms):
            n.move_to(c)
        self.add(*self.cases)
        for i in range(4):
            if i < deja:
                self._vert(i)
            if i < deja or tous:
                self.add(self.noms[i])
                self.vus.add(i)

    def _vert(self, i):
        self.cases[i].set_stroke(VERT_OK, 4).set_fill(VERT_FONCE, 1)
        self.noms[i].set_color(WHITE)

    def allumer(self, i):
        """Les animations : l'étape i s'allume en jaune, la précédente passe au vert."""
        anims = [self.cases[i].animate.set_stroke(JAUNE_TITRE, 6).set_fill(JAUNE_FONCE, 1)]
        if i not in self.vus:
            self.noms[i].set_color(JAUNE_TITRE)
            self.add(self.noms[i])
            self.vus.add(i)
            anims.append(FadeIn(self.noms[i], scale=1.25))
        else:
            anims.append(self.noms[i].animate.set_color(JAUNE_TITRE))
        if i:
            anims += [self.cases[i - 1].animate.set_stroke(VERT_OK, 4).set_fill(VERT_FONCE, 1),
                      self.noms[i - 1].animate.set_color(WHITE)]
        return anims


class Parcelle:
    """La parcelle : le sol, les souches, 4 rangées et les 6 arbres qui restent.
    .part[r] : la rangée sans son nombre (quelques arbres, « … », un arbre) ;
    .plein[r] : les 13 arbres ; .tag[r] : le x de la rangée ; .t13[r] : le 13 ; .reste ;
    .tag6 : le « + 6 ». Rien n'est ajouté à la scène : place(), puis on choisit."""

    def __init__(self, w=5.6, h=3.95):
        self.sol = RoundedRectangle(width=w, height=h, corner_radius=0.12, fill_color=SOL_BRULE, fill_opacity=1,
                                    stroke_color="#78716c", stroke_width=3)
        self.souches = VGroup()
        for i, (x, y) in enumerate(((-2.2, 1.3), (-1.3, 0.5), (-0.5, 1.45), (0.5, 0.75), (1.5, 1.35), (2.3, 0.45), (-2.3, -0.55),
                                    (-1.2, -1.2), (-0.1, -0.35), (0.9, -1.3), (1.9, -0.6), (2.45, -1.45))):
            s = Rectangle(width=0.14, height=0.3 + 0.08 * (i % 3), fill_color="#44403c", fill_opacity=1, stroke_width=0)
            br = Line(P(0, 0.05), P(0.17 * (-1) ** i, 0.22), color="#44403c", stroke_width=4)
            self.souches.add(VGroup(s, br).move_to(P(x, y)))
        self.ys = (1.45, 0.75, 0.05, -0.65)
        self.x0, self.pas, self.xtag = -2.45, 0.335, 2.15
        self.plein = VGroup(*[VGroup(*[arbre().move_to(P(self.x0 + k * self.pas, y)) for k in range(13)]) for y in self.ys])
        self.part = VGroup()
        for y in self.ys:
            g = VGroup(*[arbre().move_to(P(self.x0 + k * self.pas, y)) for k in (0, 1, 2, 3, 4, 12)])
            pts = VGroup(*[Dot(P(self.x0 + (7.25 + k * 0.75) * self.pas, y - 0.03), radius=0.05, color=WHITE) for k in range(3)])
            self.part.add(VGroup(g, pts))
        self.tag = VGroup(*[T("x", 40, INCONNUE, audit=False, gras=True).move_to(P(self.xtag, y)) for y in self.ys])
        self.t13 = VGroup(*[T("13", 36, VERT_OK, audit=False, gras=True).move_to(P(self.xtag, y)) for y in self.ys])
        self.trait = DashedLine(P(-w / 2 + 0.1, -1.05), P(w / 2 - 0.1, -1.05), color="#a8a29e", stroke_width=2)
        self.reste = VGroup(*[arbre("#bef264").move_to(P(self.x0 + k * self.pas, -1.5)) for k in range(6)])
        self.tag6 = T("+ 6", 36, WHITE, audit=False, gras=True).move_to(P(self.xtag, -1.5))
        self.tout = VGroup(self.sol, self.souches, self.plein, self.part, self.tag, self.t13, self.trait, self.reste, self.tag6)

    def place(self, k, centre):
        self.tout.scale(k).shift(np.array(centre) - self.sol.get_center())
        self.sol.set_fill(SOL_BRULE)
        return self

    def replantee(self):
        """Le fond d'une parcelle déjà replantée."""
        self.sol.set_fill(SOL_NEUF, 1)
        return VGroup(self.sol, self.trait)


class Enclos(VGroup):
    """L'enclos rectangulaire : .cotes (gauche, haut, droite, bas), piquets, arbres dedans."""

    def __init__(self, w=4.4, h=2.2, n=(5, 2), **kw):
        super().__init__(**kw)
        self.sol = Rectangle(width=w, height=h, fill_color=SOL_NEUF, fill_opacity=1, stroke_width=0)
        a, b, c, d = P(-w / 2, h / 2), P(w / 2, h / 2), P(w / 2, -h / 2), P(-w / 2, -h / 2)
        self.cotes = VGroup(*[Line(p, q, color="#cbd5e1", stroke_width=6) for p, q in ((d, a), (a, b), (b, c), (c, d))])
        self.piquets = VGroup(*[Dot(p, radius=0.07, color="#e2e8f0") for p in (a, b, c, d)])
        self.arbres = VGroup()
        for i in range(n[0]):
            for j in range(n[1]):
                self.arbres.add(arbre(s=1.25).move_to(P(-w / 2 + (i + 0.5) * w / n[0], -h / 2 + (j + 0.5) * h / n[1])))
        self.add(self.sol, self.arbres, self.cotes, self.piquets)


class Serre(VGroup):
    """Une pépinière : la serre et un jeune arbre dedans."""

    def __init__(self, c="#7dd3fc", **kw):
        super().__init__(**kw)
        base = Rectangle(width=1.15, height=0.62, stroke_color=c, stroke_width=4, fill_color="#0c4a6e", fill_opacity=0.55).move_to(P(0, -0.3))
        toit = Polygon(P(-0.68, 0.01), P(0.68, 0.01), P(0, 0.55), stroke_color=c, stroke_width=4, fill_color="#0c4a6e", fill_opacity=0.55)
        barres = VGroup(*[Line(P(x, 0.01), P(x, -0.61), color=c, stroke_width=2) for x in (-0.3, 0.3)])
        self.add(base, toit, barres, arbre(s=1.5).move_to(P(0, -0.22)))


def sac(s=1.0):
    """Un sac de graines (le x s'écrit dessus, à part)."""
    corps = RoundedRectangle(width=0.95, height=1.05, corner_radius=0.2, fill_color="#78350f", fill_opacity=1, stroke_color="#fbbf24", stroke_width=3)
    lien = Line(P(-0.24, 0.55), P(0.24, 0.55), color="#fbbf24", stroke_width=6)
    return VGroup(corps, lien).scale(s)


def camion(s=1.0, c="#60a5fa"):
    """Le camion de livraison : caisse, cabine, roues."""
    caisse = Rectangle(width=1.5, height=0.8, fill_color="#1e3a8a", fill_opacity=1, stroke_color=c, stroke_width=3).move_to(P(-0.35, 0.1))
    cab = Polygon(P(0.4, -0.3), P(1.0, -0.3), P(1.0, 0.05), P(0.78, 0.32), P(0.4, 0.32), fill_color="#1e3a8a", fill_opacity=1, stroke_color=c, stroke_width=3)
    roues = VGroup(*[Circle(radius=0.15, fill_color="#0f172a", fill_opacity=1, stroke_color=WHITE, stroke_width=3).move_to(P(x, -0.34)) for x in (-0.7, 0.68)])
    g = VGroup(caisse, cab, roues).scale(s)
    g.caisse = caisse
    return g


def nichoir(c="#d97706", s=1.0):
    """Un nichoir : la maisonnette et son trou."""
    murs = Rectangle(width=0.5, height=0.5, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0, -0.1))
    toit = Polygon(P(-0.36, 0.15), P(0.36, 0.15), P(0, 0.45), fill_color="#7c2d12", fill_opacity=1, stroke_width=0)
    trou = Circle(radius=0.1, fill_color="#0f172a", fill_opacity=1, stroke_width=0).move_to(P(0, -0.05))
    return VGroup(murs, toit, trou).scale(s)


def barre(w, c, h=0.72):
    """Un segment de barre, net et plein, avec un fond sombre derrière le texte à venir."""
    return RoundedRectangle(width=w, height=h, corner_radius=0.05, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=2)


def yanis(s=0.75):
    """Yanis : la tenue et le chapeau de garde forestier."""
    p = personne(peau="#8d5524", tenue=TENUE_YANIS, cheveux="#1f2937", s=s)
    h = p.get_top()
    bord = RoundedRectangle(width=1.3 * s, height=0.11 * s, corner_radius=0.03, fill_color="#854d0e", fill_opacity=1, stroke_width=0)
    bord.move_to(h + DOWN * 0.14 * s)
    calotte = RoundedRectangle(width=0.74 * s, height=0.3 * s, corner_radius=0.06, fill_color="#a16207", fill_opacity=1, stroke_width=0)
    calotte.next_to(bord, UP, buff=0)
    return VGroup(p, bord, calotte)


class _OutilsProbleme:
    """Ce que la paysage et le short de l'épisode partagent."""

    def lg(self, s, x, y, fs=36, c=WHITE, lettres="", maxw=None):
        e = E(s, fs, c, lettres=lettres)
        if maxw is None and x > 1:  # la colonne de droite : jamais au bord, jamais sur la figure
            maxw = 2 * min(6.5 - x, x)
        if maxw and e.width > maxw:
            e.scale_to_fit_width(maxw)
        return e.move_to(P(x, y))

    def dit(self, e, phrase, n=1, avec=(), rt=0.12):
        """Une ligne de phrase, posée mot à mot sans effet de zoom."""
        self.dire_eq(e, phrase, n=n, echelle=1.0, rt=rt, avec=avec)
        return e

    def cadre_ok(self, m, buff=0.2):
        return SurroundingRectangle(m, color=VERT_OK, buff=buff, stroke_width=4, corner_radius=0.08)

    def poser_avec(self, e, phrase, gestes, n=1, rt=0.18):
        """Comme dire_eq, mais l'atome i joue en plus ses animations gestes[i]()."""
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
            self.play(*[FadeIn(a, scale=1.3) for a in atomes], *ex, run_time=d)


class EquationProbleme4e(_OutilsProbleme, _OutilsDefi, PaysageEq):
    def cadre_ok(self, m, buff=0.2):
        """Un cadre qui laisse de l'air : plus large que haut, le x et le dernier chiffre respirent."""
        return RoundedRectangle(width=m.width + 2 * (buff + 0.14), height=m.height + 2 * buff, corner_radius=0.08,
                                color=VERT_OK, stroke_width=4).move_to(m)

    def lg(self, s, x, y, fs=36, c=WHITE, lettres="", maxw=None):
        """Sous 30, la ligne est composée à 30 puis réduite : à 28, le rendu de la police mange les espaces entre les mots."""
        if fs >= 30:
            return super().lg(s, x, y, fs, c, lettres, maxw)
        return E(s, 30, c, lettres=lettres).scale(fs / 30).move_to(P(x, y))

    nom_voix = "4e-equation-probleme"
    fichier_marques = "equation_probleme_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Résoudre un problème avec une équation", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Résoudre", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        p = Parcelle().place(0.62, P(-4.45, 0.15))
        p.sol.set_fill(SOL_NEUF, 1)
        l1 = self.lg("Comment trouver un nombre", 1.9, 0.75, 38, maxw=8)
        self.dit(l1, "Comment trouver un nombre", avec=[FadeIn(p.sol), LaggedStart(*[FadeIn(r, shift=UP * 0.1) for r in p.part], lag_ratio=0.25)])
        q = T("?", 90, JAUNE_TITRE, audit=False, gras=True).move_to(p.sol.get_center() + RIGHT * 1.36 + UP * 0.25)
        self.play(FadeIn(q, scale=0.4), run_time=0.25)
        l2 = self.lg("que personne ne te donne ?", 1.9, -0.1, 38, JAUNE_TITRE, maxw=8)
        self.dit(l2, "que personne ne te donne ?")
        self.insister(q, 1.25, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 01 : la parcelle brûlée ─────────────────────────────────────────────
    def ecran_parcelle(self):
        self.ecran("01-garde-forestier")
        y = yanis(0.72).move_to(P(-5.55, 2.2))
        p = Parcelle().place(0.95, P(-3.95, -1.5))
        self.dit(self.lg("Yanis est garde forestier.", 3.25, 3.05, 40, CIEL), "Yanis est garde forestier.", avec=[FadeIn(y, shift=UP * 0.3)])
        flammes = VGroup()
        for i, x in enumerate((-5.6, -4.8, -3.95, -3.1, -2.2, -1.75)):
            f = Polygon(P(-0.2, 0), P(0.2, 0), P(0.12, 0.3), P(0.03, 0.62), P(-0.1, 0.34), fill_color="#f97316" if i % 2 else "#facc15",
                        fill_opacity=1, stroke_width=0).move_to(P(x, -0.65 - 0.9 * (i % 3)))
            flammes.add(f)
        self.au("Après", FadeIn(p.sol), FadeIn(p.souches), LaggedStart(*[GrowFromPoint(f, f.get_bottom()) for f in flammes], lag_ratio=0.1), rt=0.2)
        self.dit(self.lg("Après un incendie,", 3.25, 2.2, 36), "Après un incendie,")
        self.dit(self.lg("il replante une parcelle.", 3.25, 1.6, 36), "il replante une parcelle.")
        self.play(FadeOut(flammes), FadeOut(p.souches), p.sol.animate.set_fill(SOL_NEUF, 1), run_time=0.4)
        reserve = VGroup(*[arbre(s=1.5) for _ in range(9)]).arrange(RIGHT, buff=0.03).move_to(P(-2.75, 1.05))
        ph = self.lg("Il a 58 jeunes arbres.", 3.25, 0.7, 36)
        ph.atomes[2].set_color(JAUNE_TITRE)
        self.dit(ph, "Il a 58 jeunes arbres.", avec=[LaggedStart(*[FadeIn(a, shift=DOWN * 0.15) for a in reserve], lag_ratio=0.1)])
        ph = self.lg("Il forme 4 rangées égales,", 3.25, 0.05, 36)
        self.dit(ph, "Il forme 4 rangées égales,")
        self.play(LaggedStart(*[FadeIn(r, shift=DOWN * 0.15) for r in p.part], lag_ratio=0.2), run_time=0.4)
        ph = self.lg("et il lui reste 6 arbres.", 3.25, -0.6, 36)
        self.dit(ph, "et il lui reste 6 arbres.")
        self.play(Create(p.trait), LaggedStart(*[FadeIn(a, scale=1.4) for a in p.reste], lag_ratio=0.15), FadeOut(reserve), run_time=0.35)
        q1 = self.lg("Combien d'arbres", 2.35, -1.7, 38, JAUNE_TITRE, maxw=6)
        q2 = self.lg("dans chaque rangée ?", 2.35, -2.35, 38, JAUNE_TITRE, maxw=6)
        self.dit(q1, "Combien d'arbres")
        self.dit(q2, "dans chaque rangée ?")
        self.attendre_voix(marge=0.7)

    def parcelle_prete(self, cx=-3.95, cy=-0.5, k=0.95, tags=False, plein=False):
        """Une parcelle déjà replantée, avec ses rangées, posée d'un coup (ajoutée)."""
        p = Parcelle().place(k, P(cx, cy))
        p.sol.set_fill(SOL_NEUF, 1)
        self.add(p.sol, p.trait, p.plein if plein else p.part, p.reste)
        if tags:
            self.add(p.t13 if plein else p.tag)
        return p

    # ── 02 : nommer ─────────────────────────────────────────────────────────
    def ecran_nommer(self):
        self.ecran("02-nommer")
        rep = Reperes()
        self.add(*rep.cases)
        p = self.parcelle_prete()
        self.au("Première", *rep.allumer(0), rt=0.3)
        self.dit(self.lg("on nomme ce qu'on cherche.", 3.25, 2.2, 32), "on nomme ce qu'on cherche.")
        self.dit(self.lg("Ici, le nombre d'arbres", 3.25, 1.2, 32), "Ici, le nombre d'arbres")
        rg = SurroundingRectangle(p.part[0], color=INCONNUE, buff=0.09, stroke_width=4, corner_radius=0.06)
        self.dit(self.lg("dans une rangée.", 3.25, 0.6, 32), "dans une rangée.", avec=[Create(rg)])
        ap = self.lg("On l'appelle x.", 3.25, -0.65, 60, JAUNE_TITRE, lettres="x")
        self.dit(ap, "On l'appelle x.")
        self.play(ap.x.animate.scale(1.5), LaggedStart(*[FadeIn(t, scale=1.5) for t in p.tag], lag_ratio=0.2), run_time=0.4)
        self.play(ap.x.animate.scale(1 / 1.5), run_time=0.2)
        self.attendre_voix(marge=1.0)

    # ── 03 : traduire ───────────────────────────────────────────────────────
    def ecran_traduire(self):
        self.ecran("03-traduire")
        rep = Reperes(deja=1)
        self.add(rep)
        p = self.parcelle_prete(tags=True)
        self.au("Deuxième", *rep.allumer(1), rt=0.3)
        self.dit(self.lg("on traduit.", 3.25, 2.3, 33), "on traduit.")
        self.dit(self.lg("4 rangées de x arbres,", 3.25, 1.55, 33, lettres="x"), "4 rangées de x arbres,")
        ac = Brace(p.tag, RIGHT, color=INCONNUE, buff=0.32)
        q = E("4x", 46, INCONNUE, lettres="x").next_to(ac, RIGHT, buff=0.08)
        self.dit(self.lg("c'est 4x.", 3.25, 0.95, 33, lettres="x"), "c'est 4 x.")
        self.play(FadeIn(ac), FadeIn(q.sans_audit(), scale=1.3), run_time=0.2)
        self.dit(self.lg("On ajoute les 6 qui restent,", 3.25, 0.2, 33), "On ajoute les 6 qui restent,")
        self.play(FadeIn(p.tag6, scale=1.4), run_time=0.15)
        self.dit(self.lg("et ça fait 58 en tout.", 3.25, -0.4, 33), "et ça fait 58 en tout.")
        e = E("4x + 6 = 58", 60).move_to(P(3.25, -1.45))
        self.dire_eq(e, "4 x plus 6 égale 58")
        self.play(e.egal.animate.set_color(EGAL), run_time=0.1)
        self.insister(e, 1.08, 0.18)
        self.attendre_voix(marge=1.0)

    # ── 04 : résoudre ───────────────────────────────────────────────────────
    def ecran_resoudre(self):
        self.ecran("04-resoudre")
        rep = Reperes(deja=2)
        self.add(rep)
        p = self.parcelle_prete(cx=-4.7, cy=-0.1, k=0.7, tags=True)
        self.add(p.tag6)
        XE, Y = 0.4, (1.45, -0.05, -2.0)
        self.au("Troisième", *rep.allumer(2), rt=0.3)
        self.dit(self.lg("on résout.", 0.4, 2.35, 36), "on résout.")
        e0 = E("4x + 6 = 58", 56).sans_audit().mis_sur_egal(XE, Y[0])
        self.play(FadeIn(e0), run_time=0.15)
        o = E("On soustrait 6 :", 36, OPERATION, lettres="").move_to(P(0, 0.7)).align_to(P(2.5, 0), LEFT)
        self.dit(o, "On soustrait 6 :", avec=[Create(self.fleche_etape(Y[0] - 0.2, Y[1] + 0.2, 2.15)), p.reste.animate.set_color(OPERATION), p.tag6.animate.set_color(OPERATION)])
        t1, t2 = self.tag("− 6", VGroup(*e0.atomes[2:4]).get_x(), 0.7, 36), self.tag("− 6", e0.atomes[5].get_x(), 0.7, 36)
        self.play(FadeIn(t1), FadeIn(t2), FadeOut(p.reste, shift=UP * 0.3), FadeOut(p.tag6), run_time=0.15)
        e1 = E("4x = 52", 56).mis_sur_egal(XE, Y[1])
        self.glisser(e0, e1, "4 x égale 52", {0: 0, 1: 1, 2: 4})
        o = E("On divise par 4 :", 36, OPERATION, lettres="").move_to(P(0, -0.9)).align_to(P(2.5, 0), LEFT)
        self.dit(o, "On divise par 4 :", avec=[Create(self.fleche_etape(Y[1] - 0.2, -1.3, 2.15))])
        t3, t4 = self.tag("÷ 4", VGroup(*e1.atomes[:2]).get_x(), -0.9, 36), self.tag("÷ 4", e1.atomes[3].get_x(), -0.9, 36)
        self.play(FadeIn(t3), FadeIn(t4), run_time=0.1)
        e2 = E("x = 13", 60, VERT_OK, inconnue=VERT_OK).mis_sur_egal(XE, Y[2])
        self.glisser(e1, e2, "x égale 13", {0: 1, 1: 2})
        self.play(Create(self.cadre_ok(e2, 0.24)),
                  *[ReplacementTransform(a, b) for a, b in zip(p.part, p.plein)],
                  *[ReplacementTransform(a, b) for a, b in zip(p.tag, p.t13)], run_time=0.5)
        self.insister(e2, 1.1, 0.2)
        self.attendre_voix(marge=2.6)

    # ── 05 : vérifier, puis répondre ────────────────────────────────────────
    def ecran_repondre(self):
        self.ecran("05-repondre")
        rep = Reperes(deja=3)
        self.add(rep)
        p = self.parcelle_prete(cy=0.45, tags=True, plein=True)
        self.add(p.tag6)
        self.au("Quatrième", *rep.allumer(3), rt=0.3)
        self.dit(self.lg("on vérifie, puis on répond.", 3.25, 2.3, 36), "on vérifie, puis on répond.")
        l1 = E("4 × 13 = 52", 50).mis_sur_egal(3.3, 1.45)
        cr = SurroundingRectangle(VGroup(p.plein, p.t13), color=OPERATION, buff=0.08, stroke_width=3, corner_radius=0.06)
        self.dire_eq(l1, "4 fois 13, 52", avec=[Create(cr)])
        l2 = E("52 + 6 = 58", 50).mis_sur_egal(3.3, 0.7)
        self.play(FadeIn(l2.atomes[0]), run_time=0.08)
        cr2 = SurroundingRectangle(VGroup(p.reste, p.tag6), color=OPERATION, buff=0.08, stroke_width=3, corner_radius=0.06)
        self.dire_eq(l2, "Plus 6, 58", sauf=[l2.atomes[0]], avec=[Create(cr2)])
        j = self.lg("C'est juste.", 3.0, -0.05, 38, VERT_OK)
        self.dit(j, "C'est juste.")
        ok = self.coche(VERT_OK, 0.26).next_to(j, RIGHT, buff=0.3)
        self.play(Create(ok), run_time=0.15)
        a = E("x = 13 ne suffit pas :", 36, PIEGE, lettres="").move_to(P(3.3, -0.85))
        self.dire_eq(a, "x égale 13 ne suffit pas :", echelle=1.0, rt=0.12)
        self.dit(self.lg("on répond par une phrase.", 3.25, -1.45, 36), "on répond par une phrase.")
        r = E("Il y a 13 arbres dans chaque rangée.", 42, VERT_OK, lettres="").move_to(P(-0.6, -2.72))
        self.dit(r, "Il y a 13 arbres dans chaque rangée.")
        self.play(Create(self.cadre_ok(r, 0.2)), run_time=0.25)
        self.insister(r.atomes[3], 1.35, 0.16)
        self.attendre_voix(marge=2.2)

    # ── 05q : QUESTION 1 ────────────────────────────────────────────────────
    def _disposer_q(self, question, choix, phrase):
        """De l'air entre les lignes de la réponse, à gauche : la figure et l'énoncé."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        ph.next_to(cartes, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        if ph.get_right()[0] > 6.45:
            ph.scale_to_fit_width(6.45 - self.XL).align_to(P(self.XL, 0), LEFT)
        return tete, q, cartes, pause, rebours, ph

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        sacs = VGroup(*[sac(0.95) for _ in range(3)]).arrange(RIGHT, buff=0.35).move_to(P(-3.5, 1.4))
        xs = VGroup(*[T("x", 42, CIEL, audit=False, gras=True).move_to(s) for s in sacs])
        tr = camion(1.05).move_to(P(-3.15, -0.85))
        f5 = T("5", 44, WHITE, audit=False, gras=True).move_to(tr.caisse)

        def avant(sc):
            sc.dit(sc.lg("Yanis achète 3 sacs de graines", -3.15, 3.1, 30), "Yanis achète 3 sacs de graines", avec=[LaggedStart(*[FadeIn(s, shift=DOWN * 0.2) for s in sacs], lag_ratio=0.25)])
            sc.dit(sc.lg("à x euros le sac.", -3.15, 2.45, 30, lettres="x"), "à x euros le sac.")
            sc.play(FadeIn(xs, scale=1.3), run_time=0.12)
            sc.dit(sc.lg("Il paie 5 euros de livraison,", -3.15, 0.0, 30), "Il paie 5 euros de livraison,", avec=[FadeIn(tr, shift=RIGHT * 0.5)])
            sc.play(FadeIn(f5, scale=1.3), run_time=0.1)
            sc.dit(sc.lg("et 41 euros en tout.", -3.15, -1.95, 40, JAUNE_TITRE), "et 41 euros en tout.")

        def apres(sc):
            sc.ph_eq(0, "Réponse A. 3 sacs, c'est 3x,", "Réponse A. 3 sacs, c'est 3 x,", lettres="x", premier=True)
            ac = Brace(sacs, DOWN, color=INCONNUE, buff=0.08)
            t3 = E("3x", 40, INCONNUE).sans_audit().next_to(ac, RIGHT, buff=0.12).shift(UP * 0.02)
            sc.play(FadeIn(ac), FadeIn(t3, scale=1.3), run_time=0.15)
            sc.ph_eq(1, "et la livraison ne se paie", "et la livraison ne se paie", avec=[Circumscribe(tr, color=OPERATION, run_time=0.5)])
            sc.ph_eq(2, "qu'une fois.", "qu'une fois.")
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Quelle équation ?"],
                            [Eq("3x + 5 = 41", 36), Eq("3(x + 5) = 41", 36), Eq("x + 3 + 5 = 41", 36)], 0,
                            ["Réponse A. 3 sacs, c'est 3x,", "et la livraison ne se paie", "qu'une fois."], avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    def ph_eq(self, i, s, phrase, n=1, lettres="", couleur=None, premier=False, avec=()):
        """Comme _OutilsDefi.ph_eq, avec une animation jouée au premier mot."""
        ref = self.ph_q[i]
        e = E(s, 30, couleur=couleur or VERT_OK, lettres=lettres)
        e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        self.dire_eq(e, phrase, n=n, echelle=1.0, rt=0.16, sauf=sauf, avec=avec)
        return e

    # ── 06 : l'enclos ───────────────────────────────────────────────────────
    def ecran_enclos(self):
        self.ecran("06-enclos")
        rep = Reperes(tous=True)
        self.add(rep)
        c = Enclos(4.2, 2.1).move_to(P(-3.4, 0.95))
        XC = 3.2
        self.dit(self.lg("Yanis protège les jeunes arbres", XC, 2.45, 28), "Yanis protège les jeunes arbres", avec=[FadeIn(c)])
        self.dit(self.lg("avec un enclos rectangulaire.", XC, 2.0, 28), "avec un enclos rectangulaire.")
        l1 = self.lg("La longueur est le double", XC, 1.45, 28)
        self.dit(l1, "La longueur est le double")
        self.dit(self.lg("de la largeur.", XC, 1.0, 28), "de la largeur.")
        self.dit(self.lg("Il a 30 mètres de grillage.", XC, 0.5, 28), "Il a 30 mètres de grillage.",
                 avec=[c.cotes.animate.set_color(OPERATION)])
        self.play(c.cotes.animate.set_color("#cbd5e1"), run_time=0.15)
        # On nomme la largeur, puis la longueur s'écrit avec x
        a = self.lg("On appelle x la largeur.", -3.6, -1.3, 34, lettres="x")
        lg_ = T("x", 44, INCONNUE, audit=False, gras=True).next_to(c.cotes[0], LEFT, buff=0.18)
        ld = T("x", 44, INCONNUE, audit=False, gras=True).next_to(c.cotes[2], RIGHT, buff=0.18)
        self.dit(a, "On appelle x la largeur.", avec=rep.allumer(0))
        self.play(FadeIn(lg_, scale=1.5), FadeIn(ld, scale=1.5), run_time=0.15)
        self.dit(self.lg("La longueur s'écrit alors", -3.6, -1.82, 34), "La longueur s'écrit alors", avec=rep.allumer(1))
        self.dit(self.lg("avec x : 2x.", -3.6, -2.32, 34, lettres="x"), "avec x : 2 x.")
        lh = E("2x", 44).sans_audit().next_to(c.cotes[1], UP, buff=0.14)
        lb = E("2x", 44).sans_audit().next_to(c.cotes[3], DOWN, buff=0.14)
        self.play(FadeIn(lh, scale=1.5), FadeIn(lb, scale=1.5), run_time=0.15)
        # Le tour : on passe par les 4 côtés, chacun s'allume à son mot
        self.dit(self.lg("Le tour :", 1.0, 0.02, 34, CIEL), "Le tour :")
        XE = 3.95
        d = E("x + 2x + x + 2x = 6x", 42).mis_sur_egal(XE, -0.55)
        allume = lambda k: (lambda: [c.cotes[k].animate.set_color(OPERATION).set_stroke(width=9)])  # noqa: E731
        self.poser_avec(d, "x plus 2 x plus x plus 2 x, 6 x", {0: allume(0), 2: allume(1), 5: allume(2), 7: allume(3)})
        l6 = E("6x = 30", 50).mis_sur_egal(XE, -1.28)
        self.dire_eq(l6, "6 x égale 30", avec=rep.allumer(2))
        self.dit(self.lg("donc", 1.75, -2.25, 34, maxw=2), "donc")
        l5 = E("x = 5", 56, VERT_OK, inconnue=VERT_OK).mis_sur_egal(XE, -2.25)
        self.dire_eq(l5, "x égale 5")
        self.play(Create(self.cadre_ok(l5, 0.18)), run_time=0.15)
        f = E("La largeur est de 5 mètres, et la longueur de 10 mètres.", 38, VERT_OK, lettres="").scale_to_fit_width(11.2).move_to(P(-0.8, -3.05))
        m5g, m5d = T("5 m", 32, VERT_OK, audit=False, gras=True), T("5 m", 32, VERT_OK, audit=False, gras=True)
        m5g.move_to(lg_).align_to(c.cotes[0].get_left() + LEFT * 0.14, RIGHT)
        m5d.move_to(ld).align_to(ld, LEFT)
        i10 = f.atomes.index(next(a for a in f.atomes if a.original_text == "10"))
        i5 = f.atomes.index(next(a for a in f.atomes if a.original_text == "5"))
        h10, b10 = T("10 m", 36, VERT_OK, audit=False, gras=True).move_to(lh), T("10 m", 36, VERT_OK, audit=False, gras=True).move_to(lb)
        self.poser_avec(f, "La largeur est de 5 mètres, et la longueur de 10 mètres.",
                        {0: lambda: rep.allumer(3),
                         i5: lambda: [ReplacementTransform(lg_, m5g), ReplacementTransform(ld, m5d)],
                         i10: lambda: [ReplacementTransform(lh, h10), ReplacementTransform(lb, b10)]}, rt=0.14)
        self.attendre_voix(marge=2.0)

    # ── 06q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        c = Enclos(4.5, 1.5, n=(7, 2)).move_to(P(-3.15, 0.72))
        lg_ = T("x", 44, INCONNUE, audit=False, gras=True).next_to(c.cotes[0], LEFT, buff=0.18)
        ld = T("x", 44, INCONNUE, audit=False, gras=True).next_to(c.cotes[2], RIGHT, buff=0.18)
        lh = E("3x", 44).sans_audit().next_to(c.cotes[1], UP, buff=0.14)
        lb = E("3x", 44).sans_audit().next_to(c.cotes[3], DOWN, buff=0.14)

        def avant(sc):
            sc.dit(sc.lg("Un autre enclos a une largeur x", -3.15, 3.1, 29, lettres="x"), "Un autre enclos a une largeur x", avec=[FadeIn(c)])
            sc.play(FadeIn(lg_, scale=1.4), FadeIn(ld, scale=1.4), run_time=0.12)
            sc.dit(sc.lg("et une longueur 3x.", -3.15, 2.45, 29, lettres="x"), "et une longueur 3 x.")
            sc.play(FadeIn(lh, scale=1.4), FadeIn(lb, scale=1.4), run_time=0.12)
            sc.dit(sc.lg("Son tour mesure 40 mètres.", -3.15, -1.2, 32, JAUNE_TITRE), "Son tour mesure 40 mètres.", avec=[c.cotes.animate.set_color(OPERATION)])

        def apres(sc):
            sc.ph_eq(0, "Réponse B. Le tour passe", "Réponse B. Le tour passe", premier=True)
            sc.ph_eq(1, "par les 4 côtés :", "par les 4 côtés :")
            ref = sc.ph_q[2]
            e = E("x + 3x + x + 3x = 8x", 30, VERT_OK, lettres="x")
            e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
            allume = lambda k: (lambda: [c.cotes[k].animate.set_color(VERT_OK).set_stroke(width=9)])  # noqa: E731
            sc.poser_avec(e, "x plus 3 x plus x plus 3 x, 8 x", {0: allume(0), 2: allume(1), 5: allume(2), 7: allume(3)})
            sc.insister(VGroup(*e.atomes[-2:]), 1.3, 0.14)
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["Quelle équation ?"],
                            [Eq("x + 3x = 40", 36), Eq("8x = 40", 36), Eq("3x = 40", 36)], 1,
                            ["Réponse B. Le tour passe", "par les 4 côtés :", "x + 3x + x + 3x = 8x"], avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : les deux pépinières ────────────────────────────────────────────
    def carte_pepiniere(self, cx, titre, l1, l2):
        fond = RoundedRectangle(width=6.2, height=1.78, corner_radius=0.14, fill_color="#0b1220", fill_opacity=1,
                                stroke_color="#7dd3fc", stroke_width=3).move_to(P(cx, 1.88))
        s = Serre().scale(0.58).move_to(P(cx - 2.55, 1.88))
        xt = cx - 1.85
        lignes = [self.lg(titre, 0, 2.38, 28, JAUNE_TITRE), self.lg(l1, 0, 1.88, 28), self.lg(l2, 0, 1.38, 28)]
        for m in lignes:
            m.align_to(P(xt, 0), LEFT)
        return fond, s, lignes

    def ecran_pepinieres(self):
        self.ecran("07-pepinieres")
        rep = Reperes(tous=True)
        self.add(rep)
        tit = self.lg("Quel fournisseur choisir ?", 0, 1.7, 50, JAUNE_TITRE)
        self.dit(tit, "Quel fournisseur choisir ?")
        f1, s1, l1 = self.carte_pepiniere(-3.4, "Première pépinière :", "3 euros l'arbre,", "et 20 euros de livraison.")
        f2, s2, l2 = self.carte_pepiniere(3.4, "Seconde pépinière :", "4 euros l'arbre,", "et 5 euros de livraison.")
        self.dit(l1[0], "Première pépinière :", avec=[FadeOut(tit), FadeIn(f1), FadeIn(s1)])
        self.dit(l1[1], "3 euros l'arbre,")
        self.dit(l1[2], "et 20 euros de livraison.")
        self.dit(l2[0], "Seconde pépinière :", avec=[FadeIn(f2), FadeIn(s2)])
        self.dit(l2[1], "4 euros l'arbre,")
        self.dit(l2[2], "et 5 euros de livraison.")
        self.dit(self.lg("Pour combien d'arbres paie-t-on le même prix ?", 0, 0.55, 38, CIEL), "Pour combien d'arbres paie-t-on le même prix ?")
        self.dit(self.lg("Avec x arbres :", -5.05, -0.08, 30, lettres="x"), "Avec x arbres :", avec=rep.allumer(0))
        e0 = E("3x + 20 = 4x + 5", 50).mis_sur_egal(0, -0.08)
        self.dire_eq(e0, "3 x plus 20 égale 4 x plus 5", avec=rep.allumer(1))
        self.play(e0.egal.animate.set_color(EGAL), run_time=0.08)
        # On retire 3x : les deux termes en orange, sous eux « − 3x »
        fl = self.fleche_etape(-0.32, -1.0, 3.1)
        o1 = self.lg("On retire 3x", 4.92, -0.42, 28, OPERATION)
        o2 = self.lg("des deux côtés :", 4.92, -0.87, 28, OPERATION)
        self.dit(o1, "On retire 3 x", avec=[Create(fl), *rep.allumer(2)])
        self.dit(o2, "des deux côtés :")
        y_t = -0.63
        self.play(FadeIn(self.tag("− 3x", VGroup(*e0.atomes[:2]).get_x(), y_t, 32)), FadeIn(self.tag("− 3x", VGroup(*e0.atomes[5:7]).get_x(), y_t, 32)), run_time=0.1)
        e1 = E("20 = x + 5", 50).mis_sur_egal(0, -1.2)
        self.glisser(e0, e1, "20 égale x plus 5", {0: 3, 1: 4, 2: 6, 3: 7, 4: 8})
        self.dit(self.lg("On soustrait 5 :", 4.92, -1.72, 28, OPERATION), "On soustrait 5 :", avec=[Create(self.fleche_etape(-1.45, -2.05, 3.1))])
        y_t = -1.84
        self.play(FadeIn(self.tag("− 5", e1.atomes[0].get_x(), y_t, 32)), FadeIn(self.tag("− 5", VGroup(*e1.atomes[3:5]).get_x(), y_t, 32)), run_time=0.1)
        e2 = E("x = 15", 50, VERT_OK, inconnue=VERT_OK).mis_sur_egal(0, -2.58)
        self.glisser(e1, e2, "x égale 15", {0: 2, 1: 1})
        self.play(Create(self.cadre_ok(e2, 0.16)), run_time=0.15)
        v = self.lg("On vérifie :", -5.1, -1.15, 34, CIEL)
        self.dit(v, "On vérifie :", avec=rep.allumer(3))
        c1 = E("3 × 15 + 20 = 65", 30).sans_audit().move_to(P(-4.6, -1.68))
        c2 = E("4 × 15 + 5 = 65", 30).sans_audit().mis_sur_egal(c1.egal.get_x(), -2.18)
        self.play(FadeIn(VGroup(*c1.atomes[:-1])), FadeIn(VGroup(*c2.atomes[:-1])), run_time=0.15)
        ph = self.lg("65 euros des deux côtés.", -4.05, -2.68, 28, VERT_OK)
        self.dit(ph, "65 euros des deux côtés.", avec=[FadeIn(c1.atomes[-1], scale=1.4), FadeIn(c2.atomes[-1], scale=1.4), c1.atomes[-1].animate.set_color(VERT_OK), c2.atomes[-1].animate.set_color(VERT_OK)])
        r = self.lg("Pour 15 arbres, les deux pépinières coûtent le même prix.", -0.8, -3.3, 36, VERT_OK, maxw=11.2)
        self.dit(r, "Pour 15 arbres, les deux pépinières coûtent le même prix.")
        self.insister(e2, 1.1, 0.18)
        self.attendre_voix(marge=2.2)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def barres(self, x0, y1, y2, k, h=0.72, fs=36):
        """Les nichoirs de Yanis et d'Inès : mêmes x, plus 10 pour Inès."""
        by = barre(30 * k, "#1e40af", h).move_to(P(x0 + 15 * k, y1))
        bi = barre(30 * k, "#1e40af", h).move_to(P(x0 + 15 * k, y2))
        bd = barre(10 * k, "#c2410c", h).move_to(P(x0 + 35 * k, y2))
        ny = T("Yanis", fs - 4, CIEL, audit=False).next_to(by, LEFT, buff=0.2)
        ni = T("Inès", fs - 4, CIEL, audit=False).next_to(bi, LEFT, buff=0.2).align_to(ny, RIGHT)
        return by, bi, bd, ny, ni

    def ecran_defi(self):
        self.ecran("08-defi")
        tit = T("À toi de jouer !", 52, JAUNE_TITRE).move_to(P(0, 3.05))
        self.au("À toi", Write(tit), rt=0.5)
        self.dit(self.lg("Yanis et Inès posent 70 nichoirs", 0, 2.2, 42), "Yanis et Inès posent 70 nichoirs")
        foret = VGroup(*[arbre(s=2.5).move_to(P(x, y)) for x, y in ((3.0, 0.5), (4.2, 0.72), (5.4, 0.45), (3.6, -0.5), (4.9, -0.42), (6.1, -0.35))])
        nis = VGroup(*[nichoir(s=0.62).move_to(P(x, y)) for x, y in ((3.0, 0.55), (4.2, 0.77), (5.4, 0.5), (3.6, -0.45), (4.9, -0.37), (6.1, -0.3))])
        self.dit(self.lg("dans la forêt.", 0, 1.55, 42), "dans la forêt.", avec=[LaggedStart(*[FadeIn(a, shift=UP * 0.2) for a in foret], lag_ratio=0.15), FadeIn(nis)])
        x0, k = -5.0, 0.1
        by, bi, bd, ny, ni = self.barres(x0, 0.5, -0.45, k)
        qy, qi = T("?", 44, WHITE, audit=False, gras=True).move_to(by), T("?", 44, WHITE, audit=False, gras=True).move_to(bi)
        ty = T("10", 38, WHITE, audit=False, gras=True).move_to(bd)
        ac = Brace(VGroup(by, bd, bi), RIGHT, color=WHITE, buff=0.14)
        t70 = T("70", 44, JAUNE_TITRE, audit=False, gras=True).next_to(ac, RIGHT, buff=0.12)
        self.play(FadeIn(by), FadeIn(ny), FadeIn(qy), run_time=0.15)
        li = self.lg("Inès en pose 10 de plus que Yanis.", -0.6, -1.5, 40)
        i10 = li.atomes.index(next(a for a in li.atomes if a.original_text == "10"))
        self.poser_avec(li, "Inès en pose 10 de plus que Yanis.", {0: lambda: [FadeIn(bi), FadeIn(ni), FadeIn(qi)],
                                                                   i10: lambda: [GrowFromEdge(bd, LEFT), FadeIn(ty, scale=1.3), FadeIn(ac), FadeIn(t70)]}, rt=0.14)
        cc = self.lg("Combien chacun en pose-t-il ?", -0.6, -2.3, 44, JAUNE_TITRE)
        self.dit(cc, "Combien chacun en")
        self.au("pose-t-il", FadeIn(VGroup(*cc.atomes[3:])), rt=0.12)
        pz = T("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(-0.6, -3.05))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 08b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("08b-correction")
        rep = Reperes(tous=True)
        self.add(rep)
        self.au("Correction", FadeIn(T("Correction", 38, JAUNE_TITRE).move_to(P(-4.7, 2.35))), rt=0.25)
        x0, k = -5.3, 0.085
        by, bi, bd, ny, ni = self.barres(x0, 0.5, -0.3, k, h=0.66, fs=34)
        a0 = self.lg("On appelle x", -4.4, 1.72, 29, lettres="x")
        a = self.lg("les nichoirs de Yanis.", -4.4, 1.24, 29)
        ly = T("x", 40, WHITE, audit=False, gras=True).move_to(by)
        self.dit(a0, "On appelle x", avec=rep.allumer(0))
        self.dit(a, "les nichoirs de Yanis.", avec=[FadeIn(by), FadeIn(ny)])
        self.play(FadeIn(ly, scale=1.3), run_time=0.1)
        b = self.lg("Inès en pose x + 10.", -3.95, -1.02, 34, lettres="x")
        self.dire_eq(b, "Inès en pose x plus 10.", echelle=1.0, rt=0.12, avec=[FadeIn(bi), FadeIn(ni)])
        li = T("x", 40, WHITE, audit=False, gras=True).move_to(bi)
        l10 = T("10", 32, WHITE, audit=False, gras=True).move_to(bd)
        self.play(FadeIn(li), GrowFromEdge(bd, LEFT), FadeIn(l10), run_time=0.15)
        XE, Y = 1.05, (2.3, 1.3, 0.1, -1.4)
        e0 = E("x + x + 10 = 70", 46).mis_sur_egal(XE, Y[0])
        self.dire_eq(e0, "Donc x plus x plus 10 égale 70", avec=rep.allumer(1))
        e1 = E("2x + 10 = 70", 46).mis_sur_egal(XE, Y[1])
        self.dire_eq(e1, "2 x plus 10 égale 70", avec=rep.allumer(2))
        o = self.lg("On soustrait 10 :", 0, 0.7, 30, OPERATION).align_to(P(2.98, 0), LEFT)
        self.dit(o, "On soustrait 10 :", avec=[Create(self.fleche_etape(Y[1] - 0.18, Y[2] + 0.18, 2.62))])
        self.play(FadeIn(self.tag("− 10", VGroup(*e1.atomes[2:4]).get_x(), 0.7, 34)), FadeIn(self.tag("− 10", e1.atomes[5].get_x(), 0.7, 34)), run_time=0.1)
        e2 = E("2x = 60", 46).mis_sur_egal(XE, Y[2])
        self.glisser(e1, e2, "2 x égale 60", {0: 0, 1: 1, 2: 4})
        o = self.lg("On divise par 2 :", 0, -0.55, 30, OPERATION).align_to(P(2.98, 0), LEFT)
        self.dit(o, "On divise par 2 :", avec=[Create(self.fleche_etape(Y[2] - 0.18, -0.8, 2.62))])
        self.play(FadeIn(self.tag("÷ 2", VGroup(*e2.atomes[:2]).get_x(), -0.55, 34)), FadeIn(self.tag("÷ 2", e2.atomes[3].get_x(), -0.55, 34)), run_time=0.1)
        e3 = E("x = 30", 52, VERT_OK, inconnue=VERT_OK).mis_sur_egal(XE, Y[3])
        self.glisser(e2, e3, "x égale 30", {0: 1, 1: 2})
        self.play(Create(self.cadre_ok(e3, 0.18)), run_time=0.15)
        v = E("On vérifie : 30 + 40 = 70", 34, CIEL, lettres="").move_to(P(-3.35, -1.98))
        for at in v.atomes[4:]:
            at.set_color(WHITE)
        self.dire_eq(v, "On vérifie : 30 plus 40, 70", echelle=1.0, rt=0.12, avec=rep.allumer(3))
        r = E("Yanis en pose 30, et Inès 40.", 50, VERT_OK, lettres="").move_to(P(-1.2, -2.98))
        t30, t40 = T("30", 38, VERT_OK, audit=False, gras=True).next_to(by, RIGHT, buff=0.14), T("40", 38, VERT_OK, audit=False, gras=True).next_to(bd, RIGHT, buff=0.14)
        i30 = r.atomes.index(next(a for a in r.atomes if a.original_text == "30"))
        i40 = r.atomes.index(next(a for a in r.atomes if a.original_text == "40"))
        self.poser_avec(r, "Yanis en pose 30, et Inès 40.", {i30: lambda: [FadeIn(t30, scale=1.3)], i40: lambda: [FadeIn(t40, scale=1.3)]}, rt=0.14)
        self.play(Create(self.cadre_ok(r, 0.18)), run_time=0.2)
        self.attendre_voix(marge=2.4)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        self.XL = -1.7
        rep = Reperes(tous=True, w=3.6, h=0.78, fs=38)
        VGroup(*rep.cases).arrange(DOWN, buff=0.28)
        for c, n in zip(rep.cases, rep.noms):
            n.move_to(c)
        lignes = self.finale_colonne([["Un problème se résout", "en quatre étapes."],
                                      ["Les autres quantités", "s'écrivent avec x."],
                                      ["On vérifie, avant de répondre", "par une phrase."]], fs=38, figure=rep)
        self.XL = type(self).XL
        self.play(FadeIn(rep), run_time=0.25)
        self.montrer_ligne(lignes[0])
        for i, mot in enumerate(("nommer", "traduire", "résoudre", "répondre")):
            self.au(mot, *rep.allumer(i), rt=0.2)
        self.play(rep.cases[3].animate.set_stroke(VERT_OK, 4).set_fill(VERT_FONCE, 1), rep.noms[3].animate.set_color(WHITE), run_time=0.15)
        self.montrer_ligne(lignes[1])
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.2)

    # ── 10 : la fin du 05/11 ────────────────────────────────────────────────
    def page_abonnement(self, voix):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = T("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.75))
        site = T("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.75))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = T("Abonne-toi !", 44, VERT_OK).move_to(P(0, 0.2))
        poignee = T("@eleveai974", 48, VERT_OK).move_to(P(0, -0.7))
        g1 = T("Un pouce", 38, WHITE)
        p1 = T("·", 38, "#94a3b8")
        g2 = T("Un commentaire", 38, WHITE)
        p2 = T("·", 38, "#94a3b8")
        g3 = T("La cloche", 38, WHITE)
        gestes = VGroup(g1, p1, g2, p2, g3).arrange(RIGHT, buff=0.28).move_to(P(-0.9, -2.2))
        g2.align_to(g1, UP)
        g3.align_to(g1, UP)
        self.play(Write(entraine), run_time=0.6)
        self.au("éleveai", GrowFromCenter(site), Create(cadre), rt=0.5)
        self.au("pouce", FadeIn(g1, scale=1.3), rt=0.25)
        self.au("commentaire", FadeIn(p1), FadeIn(g2, scale=1.3), rt=0.25)
        self.au("abonne-toi", FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), rt=0.35)
        self.au("cloche", FadeIn(p2), FadeIn(g3, scale=1.3), rt=0.25)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3), run_time=0.5)
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_parcelle()
        self.ecran_nommer()
        self.ecran_traduire()
        self.ecran_resoudre()
        self.ecran_repondre()
        self.ecran_question1()
        self.ecran_enclos()
        self.ecran_question2()
        self.ecran_pepinieres()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
