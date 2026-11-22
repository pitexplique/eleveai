# ident_factoriser.py
# EleveAI — Maths 3e — série IDENTITÉS REMARQUABLES, épisode 07 : FACTORISER avec une identité.
# Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : litteral_identite (3e, notion litteral_calcul), TOUS les écrans.
# Métier : Inès, carreleuse (une terrasse carrée de x m, un carré 3 × 3 laissé pour un arbre ; la partie
# carrelée x² − 9 se coupe en deux bandes qui se recollent en un rectangle (x − 3) sur (x + 3) ;
# puis une commande de carreaux x², 6 bandes x × 1 et 9 carreaux 1 × 1 qui se posent en un carré x + 3).
# Centres : art-design (le carrelage), jeux-defis (le puzzle du carré troué).
# Écrans : garde (00) ; la terrasse d'Inès (01) ; le découpage en deux bandes, la rotation, le rectangle (02) ;
# x² − 9 = (x − 3)(x + 3), le gabarit a² − b² = (a − b)(a + b) et la vérification, les 3x barrés (03) ;
# QUESTION 1 (03q, réponse C : (x − 8)(x + 8)) ; les carreaux qui se rangent en carré x + 3 (04) ;
# reconnaître x² + 6x + 9 = (x + 3)², puis x² − 10x + 25 = (x − 5)² (05) ;
# QUESTION 2 (05q, réponse A : x² + 8x + 16) ; défi (06) et correction (06b) ; ce que tu as appris (07) ;
# fin commune (08, manim/fin_commune.py).
# Code couleur : x bleu ; dans les carreaux, x² bleu, bandes orange, petits carrés violet ; la grande bande
# bleue, la petite orange ; juste vert ; piège rouge.
# Voix : manim/voix/3e-identites-factoriser.json (validée) ; marques : ident_factoriser_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/3e/ident_factoriser.py IdentFactoriser3e --media_dir manim/scripts/3e/media-ident-07-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/3e/ident_factoriser.py IdentFactoriser3e -o eleveai-maths-3e-identites-factoriser --media_dir manim/scripts/3e/media-ident-07
# Sortie : manim/sorties/3e/maths/expression-litterale/07-factoriser-identite/eleveai-maths-3e-identites-factoriser.mp4

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS 4e et ses outils communs

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402
from ident_developper import (A2, AB, B2, X, Carre, IdentDevelopper4e, changer, croix,  # noqa: E402,F401
                              pastille)

PAROLE["²"] = "carré"

TUILE = "#d6c2a0"     # le carrelage, avant la coupe
JOINT_T = "#8a7657"
TERRE = "#5b3a1e"
FEUILLE = "#16a34a"


def Ab(s, fs=40, couleur=WHITE, audit=True):
    """Le gabarit : a en bleu, b en violet."""
    e = E(s, fs, couleur, lettres="", audit=audit)
    for a in e.atomes:
        if a.original_text == "a":
            a.set_color(A2)
        elif a.original_text == "b":
            a.set_color("#a78bfa")
    return e


def cote(p, q, s, dirn, fs=32, d=0.28, audit=False, couleur=WHITE, buff=0.08):
    """Une cote : double flèche parallèle au segment pq, décalée de d vers dirn, et son étiquette."""
    p, q = np.array(p), np.array(q)
    dv = np.array(dirn, dtype=float)
    fl = DoubleArrow(p + dv * d, q + dv * d, buff=0, stroke_width=3, tip_length=0.13,
                     max_tip_length_to_length_ratio=0.25, color=couleur)
    lab = X(s, fs, CIEL, audit=audit).next_to(fl, dirn, buff=buff)
    return fl, lab


def piece(w, h, u=None, couleur=TUILE):
    """Un morceau de carrelage : le rectangle et ses joints (pas u)."""
    r = Rectangle(width=w, height=h, stroke_color=WHITE, stroke_width=3, fill_color=couleur, fill_opacity=1)
    j = VGroup()
    if u:
        n, m = round(w / u), round(h / u)
        for i in range(1, n):
            j.add(Line(P(-w / 2 + i * u, -h / 2), P(-w / 2 + i * u, h / 2)))
        for i in range(1, m):
            j.add(Line(P(-w / 2, -h / 2 + i * u), P(w / 2, -h / 2 + i * u)))
        j.set_stroke(JOINT_T, 1.5)
    g = VGroup(r, j)
    g.rect, g.joints = r, j
    return g


class Terrasse(VGroup):
    """La terrasse carrée de côté S, coin bas droit de côté b (l'arbre). Coin haut gauche en tl.
    .grande (S sur S − b, en haut), .petite (S − b sur b, en bas à gauche), .coin (les carreaux du coin),
    .trou (la terre), .arbre ; .cible : le centre de la petite bande collée au bout de la grande."""

    def __init__(self, S=3.2, b=1.2, tl=ORIGIN, joints=True, trou_couleur=TERRE, **kw):
        super().__init__(**kw)
        x0, y0 = tl[0], tl[1]
        u = b / 3 if joints else None
        self.S, self.b, self.x0, self.y0 = S, b, x0, y0
        self.grande = piece(S, S - b, u).move_to(P(x0 + S / 2, y0 - (S - b) / 2))
        self.petite = piece(S - b, b, u).move_to(P(x0 + (S - b) / 2, y0 - S + b / 2))
        self.coin = piece(b, b, u).move_to(P(x0 + S - b / 2, y0 - S + b / 2))
        self.trou = Square(b, fill_color=trou_couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        self.trou.move_to(self.coin)
        c = self.trou.get_center()
        tronc = Rectangle(width=b * 0.12, height=b * 0.32, fill_color="#78350f", fill_opacity=1, stroke_width=0)
        tronc.move_to(c + DOWN * b * 0.2)
        feuillage = VGroup(*[Circle(radius=b * r, fill_color=FEUILLE, fill_opacity=1, stroke_color="#14532d",
                                    stroke_width=2).move_to(c + P(dx, dy) * b)
                             for r, dx, dy in ((0.2, -0.13, 0.05), (0.2, 0.13, 0.05), (0.23, 0, 0.17))])
        self.arbre = VGroup(tronc, feuillage)
        self.cible = P(x0 + S + b / 2, y0 - (S - b) / 2)
        self.add(self.trou, self.grande, self.petite)

    def coins(self):
        return dict(tl=P(self.x0, self.y0), tr=P(self.x0 + self.S, self.y0),
                    bl=P(self.x0, self.y0 - self.S), br=P(self.x0 + self.S, self.y0 - self.S),
                    cut=P(self.x0, self.y0 - self.S + self.b))

    def colorer(self):
        return [self.grande.rect.animate.set_fill(A2, opacity=0.85), self.petite.rect.animate.set_fill(AB, opacity=0.9)]

    def colores(self):
        self.grande.rect.set_fill(A2, opacity=0.85)
        self.petite.rect.set_fill(AB, opacity=0.9)
        return self

    def tourner(self, scene, rt=0.6):
        scene.play(Rotate(self.petite, -PI / 2, about_point=self.petite.get_center()), run_time=rt)

    def coller(self, scene, rt=0.8):
        scene.play(self.petite.animate.move_to(self.cible), run_time=rt)

    def rectangle_fait(self):
        """Pose directement le rectangle (rappel)."""
        self.petite.rotate(-PI / 2).move_to(self.cible)
        return self

    def contour_rect(self, couleur=VERT_OK):
        return Rectangle(width=self.S + self.b, height=self.S - self.b, stroke_color=couleur, stroke_width=6) \
            .move_to(P(self.x0 + (self.S + self.b) / 2, self.y0 - (self.S - self.b) / 2))


class Carreaux(VGroup):
    """La commande : un carreau x sur x (.grand), 6 bandes x sur 1 (.bandes), 9 carreaux 1 sur 1 (.petits).
    .stock : les places de départ ; .final(i) : les places dans le carré de côté x + 3 (coin haut gauche tl)."""

    def __init__(self, S=2.0, u=0.4, tl=ORIGIN, stock=True, **kw):
        super().__init__(**kw)
        self.S, self.u = S, u
        x0, y0 = tl[0], tl[1]
        self.x0, self.y0 = x0, y0
        self.grand = Square(S, fill_color=A2, fill_opacity=0.8, stroke_color=WHITE, stroke_width=3)
        self.grand.move_to(P(x0 + S / 2, y0 - S / 2))
        self.bandes = VGroup(*[Rectangle(width=u, height=S, fill_color=AB, fill_opacity=0.85, stroke_color=WHITE,
                                         stroke_width=3) for _ in range(6)])
        self.petits = VGroup(*[Square(u, fill_color=B2, fill_opacity=0.9, stroke_color=WHITE, stroke_width=2.5)
                               for _ in range(9)])
        if stock:
            for k, b in enumerate(self.bandes):
                b.move_to(P(x0 + S + 0.6 + u / 2 + k * (u + 0.15), y0 - S / 2))
            for k, p in enumerate(self.petits):
                i, j = k % 3, k // 3
                p.move_to(P(x0 + S / 2 + (i - 1) * (u + 0.12), y0 - S - 0.75 - j * (u + 0.12)))
        else:
            self.ranger()
        self.add(self.grand, self.bandes, self.petits)

    def place_droite(self, k):
        return P(self.x0 + self.S + self.u / 2 + k * self.u, self.y0 - self.S / 2)

    def place_bas(self, k):
        return P(self.x0 + self.S / 2, self.y0 - self.S - self.u / 2 - k * self.u)

    def place_coin(self, k):
        i, j = k % 3, k // 3
        return P(self.x0 + self.S + self.u / 2 + i * self.u, self.y0 - self.S - self.u / 2 - j * self.u)

    def ranger(self):
        for k in range(3):
            self.bandes[k].move_to(self.place_droite(k))
            self.bandes[3 + k].rotate(PI / 2).move_to(self.place_bas(k))
        for k, p in enumerate(self.petits):
            p.move_to(self.place_coin(k))
        return self

    def cote_haut(self, s="x + 3", audit=False):
        n = self.S + 3 * self.u
        return cote(P(self.x0, self.y0), P(self.x0 + n, self.y0), s, UP, audit=audit)


def ines(s=0.75, fs=36):
    """Inès, carreleuse : une truelle, un carreau à ses pieds (à droite)."""
    m = Metier(["Inès", "carreleuse"], fs=fs, peau="#8d5524", tenue="#0e7490", cheveux="#1f1308", longs=True, s=s)
    m.nom.arrange(DOWN, buff=0.1, aligned_edge=LEFT)
    p = m.perso
    lame = Polygon(P(0, 0), P(0.3, 0.12), P(0.3, -0.12), fill_color="#cbd5e1", fill_opacity=1, stroke_color="#64748b",
                   stroke_width=2).scale(s)
    manche = RoundedRectangle(width=0.22 * s, height=0.09 * s, corner_radius=0.03, fill_color="#92400e",
                              fill_opacity=1, stroke_width=0).next_to(lame, LEFT, buff=0)
    truelle = VGroup(manche, lame).next_to(p.corps, RIGHT, buff=0.02).shift(UP * 0.35 * s)
    carreau = Square(0.42 * s, fill_color=TUILE, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    carreau.next_to(p.corps, RIGHT, buff=0.05).align_to(p.corps, DOWN)
    p.add(truelle, carreau)
    return m


class IdentFactoriser3e(IdentDevelopper4e):
    nom_voix = "3e-identites-factoriser"
    fichier_marques = "ident_factoriser_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "verte"

    def ld(self, s, y, fs=46, c=WHITE, x0=0.25, maxw=6.2, lettres="x"):
        """Une ligne de la colonne de droite, calée à gauche en x0 (signale si elle rétrécit)."""
        e = E(s, fs, c, lettres=lettres)
        if e.width > maxw:
            print(f"RETRECI « {s} » {e.width:.2f} > {maxw:.2f}", flush=True)
            e.scale_to_fit_width(maxw)
        return e.move_to(P(0, y)).align_to(P(x0, 0), LEFT)

    def poser_gestes(self, e, phrase, gestes=None, n=1, rt=0.18, echelle=1.0, sauf=()):
        if os.environ.get("AUDIT") == "1":
            for i in (gestes or {}):
                mot = e.atomes[i].original_text if i < len(e.atomes) else "HORS"
                print(f"GESTE « {e.s} » {i}={mot}", flush=True)
        return super().poser_gestes(e, phrase, gestes, n=n, rt=rt, echelle=echelle, sauf=sauf)

    def _plan_eq(self, e, debut, fin, sauf=()):
        """Comme le module commun, mais signale (AUDIT) un atome qui ne serait jamais posé."""
        lots = super()._plan_eq(e, debut, fin, sauf)
        if os.environ.get("AUDIT") == "1":
            poses = [a for _, at in lots for a in at]
            for a in e.atomes:
                if not any(a is b for b in poses) and not any(a is b for b in sauf):
                    print(f"PERDU « {e.s} » : {a.original_text}", flush=True)
        return lots

    def a_cote(self, e, ref, buff=0.35, i_e=0, i_ref=0):
        """Pose e à droite de ref, sur la même ligne de base (atomes i_e et i_ref)."""
        e.next_to(ref, RIGHT, buff=buff)
        e.shift(UP * (ref.atomes[i_ref].get_bottom()[1] - e.atomes[i_e].get_bottom()[1]))
        return e

    # ── les questions : énoncé, cartes et réponse plus grands (relecture -ql du 22/11) ──
    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        self._h36 = self._h36 * 44 / 36  # la réponse à 44 (elle sortait petite)
        if len(q.submobjects):
            q.scale(1.45, about_edge=UL)
            if q.width > 6.2 - self.XL:
                q.scale_to_fit_width(6.2 - self.XL)
            q.next_to(tete, DOWN, buff=0.25).align_to(P(self.XL, 0), LEFT)
        larg = 6.3 - self.XL
        for c in cartes:
            cadre, dedans = c[0], c[1]
            dedans.scale(1.3, about_point=dedans.get_left())
            if dedans.get_right()[0] - cadre.get_left()[0] + 1.0 > larg:
                dedans.scale((larg - 1.0 - (dedans.get_left()[0] - cadre.get_left()[0])) / dedans.width,
                             about_point=dedans.get_left())
            cadre.stretch_to_fit_height(dedans.height + 0.3)
            cadre.stretch_to_fit_width(larg, about_edge=LEFT)
            dedans.set_y(cadre.get_y())
        cartes.arrange(DOWN, buff=0.16, aligned_edge=LEFT)
        cartes.next_to(q if len(q.submobjects) else tete, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        pause.next_to(cartes, DOWN, buff=0.18).align_to(P(self.XL, 0), LEFT)
        ph.next_to(cartes, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        return tete, q, cartes, pause, rebours, ph

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Factoriser avec une identité", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Factoriser", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        t = Terrasse(2.1, 0.8, P(-5.4, 1.25), joints=True)
        t.add(t.arbre)
        l1 = self.ld("Un carré troué peut-il", 0.85, 44, x0=-1.2, maxw=7.7)
        self.poser_gestes(l1, "Un carré troué peut-il", {2: lambda: [FadeIn(t, scale=0.85)]})
        l2 = self.ld("devenir un rectangle ?", 0.1, 46, JAUNE_TITRE, x0=-1.2, maxw=7.7)
        self.poser_gestes(l2, "devenir un rectangle ?", {0: lambda: [*t.colorer()]})
        t.tourner(self, 0.45)
        t.coller(self, 0.55)
        self.play(Create(t.contour_rect()), run_time=0.3)
        self.insister(l2, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : la terrasse d'Inès ──────────────────────────────────────────────
    def ecran_carreleuse(self):
        self.ecran("01-carreleuse")
        m = ines(0.72, 34)
        m.perso.move_to(P(-5.88, -2.15))
        m.nom.next_to(m.perso, RIGHT, buff=0.25).align_to(m.perso, UP).shift(DOWN * 0.1)
        self.au("Inès", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("carreleuse", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        t = Terrasse(2.6, 0.975, P(-6.3, 2.55))
        k = t.coins()
        fx, lx = cote(k["tl"], k["tr"], "x", UP, fs=40, audit=True, d=0.22)
        trou_bas = (t.trou.get_corner(DL), t.trou.get_corner(DR))
        trou_dr = (t.trou.get_corner(DR), t.trou.get_corner(UR))
        f3a, l3a = cote(*trou_bas, "3", DOWN, fs=40, audit=True, d=0.22)
        f3b, l3b = cote(*trou_dr, "3", RIGHT, fs=40, audit=True, d=0.22)
        x0, mw = -2.0, 8.6
        l1 = self.ld("Une terrasse carrée,", 3.1, 46, x0=x0, maxw=mw)
        self.poser_gestes(l1, "une terrasse carrée,", {1: lambda: [FadeIn(t.grande), FadeIn(t.petite), FadeIn(t.coin)]})
        l2 = self.ld("de x mètres de côté.", 2.42, 46, x0=x0, maxw=mw)
        self.poser_gestes(l2, "de x mètres de côté.", {1: lambda: [GrowFromCenter(fx), FadeIn(lx)]})
        self.remove(t.trou)
        l3 = self.ld("Dans un coin, un carré", 1.65, 46, x0=x0, maxw=mw)
        self.poser_gestes(l3, "Dans un coin, elle laisse un carré",
                          {2: lambda: [FadeOut(t.coin), FadeIn(t.trou)],
                           5: lambda: [Indicate(t.trou, color=JAUNE_TITRE, scale_factor=1.08)]})
        l4 = self.ld("de 3 sur 3,", 0.97, 46, x0=x0, maxw=mw)
        self.poser_gestes(l4, "de 3 mètres sur 3,", {1: lambda: [GrowFromCenter(f3a), FadeIn(l3a)],
                                                        3: lambda: [GrowFromCenter(f3b), FadeIn(l3b)]})
        l5 = self.ld("pour un arbre.", 0.29, 46, x0=x0, maxw=mw)
        self.poser_gestes(l5, "pour planter un arbre.", {2: lambda: [GrowFromCenter(t.arbre)]})
        l6 = self.ld("L'aire carrelée :", -0.5, 46, x0=x0, maxw=mw)
        self.poser_gestes(l6, "L'aire carrelée :",
                          {1: lambda: [Indicate(VGroup(t.grande, t.petite), color=JAUNE_TITRE, scale_factor=1.03)]})
        l6b = self.ld("x² − 9.", -1.2, 54, x0=x0 + 0.5, maxw=mw)
        self.dire_eq(l6b, "x au carré moins 9.", echelle=1.15)
        l7 = self.ld("Cette forme peut", -1.98, 46, JAUNE_TITRE, x0=x0, maxw=mw)
        self.dit(l7, "cette forme peut")
        l8 = self.ld("devenir un rectangle ?", -2.66, 44, JAUNE_TITRE, x0=x0, maxw=mw)
        self.dit(l8, "devenir un rectangle.")
        self.insister(VGroup(l7, l8), 1.04, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : deux bandes, une rotation, un rectangle ─────────────────────────
    def ecran_decouper(self):
        self.ecran("02-decouper")
        t = Terrasse(2.6, 0.975, P(-4.8, 2.15))
        t.add(t.arbre)
        self.add(t)
        self.play(FadeIn(t), run_time=0.3)
        k = t.coins()
        S, b = t.S, t.b
        coupe = DashedLine(k["cut"] + LEFT * 0.15, k["cut"] + RIGHT * (S - b + 0.15), dash_length=0.12,
                           color=JAUNE_TITRE, stroke_width=5)
        x0, mw = -0.85, 7.45
        l1 = self.ld("Inès coupe", 2.95, 46, x0=x0, maxw=mw)
        self.poser_gestes(l1, "Inès coupe la partie", {1: lambda: [Create(coupe)]})
        l1b = self.ld("en deux bandes.", 2.3, 46, x0=x0, maxw=mw)
        self.poser_gestes(l1b, "en deux bandes.", {2: lambda: [*t.colorer()]})
        self.play(t.petite.animate.shift(DOWN * 0.2), FadeOut(coupe), run_time=0.3)
        g, p = t.grande, t.petite
        fgx, lgx = cote(g.get_corner(UL), g.get_corner(UR), "x", UP, fs=40)
        fgh, lgh = cote(g.get_corner(UL), g.get_corner(DL), "x − 3", LEFT, fs=36)
        l2 = self.ld("Grande : x sur x − 3.", 1.55, 44, x0=x0, maxw=mw)
        self.poser_gestes(l2, "Une grande bande, de x sur x moins 3.",
                          {0: lambda: [Indicate(g, color=A2, scale_factor=1.04)],
                           2: lambda: [GrowFromCenter(fgx), FadeIn(lgx)],
                           6: lambda: [GrowFromCenter(fgh), FadeIn(lgh)]})
        fp3, lp3 = cote(p.get_corner(UL), p.get_corner(DL), "3", LEFT, fs=40)
        fpx, lpx = cote(p.get_corner(DL), p.get_corner(DR), "x − 3", DOWN, fs=38)
        l3 = self.ld("Petite : 3 sur x − 3.", 0.9, 44, x0=x0, maxw=mw)
        self.poser_gestes(l3, "Une petite bande, de 3 sur x moins 3.",
                          {0: lambda: [Indicate(p, color=AB, scale_factor=1.06)],
                           2: lambda: [GrowFromCenter(fp3), FadeIn(lp3)],
                           6: lambda: [GrowFromCenter(fpx), FadeIn(lpx)]})
        l4 = self.ld("Elle tourne la petite,", 0.15, 42, x0=x0, maxw=mw)
        self.poser_gestes(l4, "Elle tourne la petite,", {1: lambda: [FadeOut(VGroup(fp3, lp3, fpx, lpx))]})
        t.tourner(self, 0.6)
        l5 = self.ld("et la colle au bout.", -0.5, 44, x0=x0, maxw=mw)
        self.dit(l5, "et la colle au bout")
        t.coller(self, 0.75)
        cadre = t.contour_rect()
        l6 = self.ld("Un rectangle !", -1.25, 52, VERT_OK, x0=x0, maxw=mw)
        self.dit(l6, "Un rectangle !", avec=[Create(cadre), FadeOut(VGroup(t.trou, t.arbre))])
        self.play(Indicate(VGroup(g, p), color=VERT_OK, scale_factor=1.03), run_time=0.4)
        fL, lL = cote(cadre.get_corner(DL), cadre.get_corner(DR), "x + 3", DOWN, fs=40)
        l7 = self.ld("Largeur : x − 3.", -1.98, 46, x0=x0, maxw=mw)
        self.poser_gestes(l7, "Largeur : x moins 3.",
                          {0: lambda: [Indicate(lgh, color=JAUNE_TITRE, scale_factor=1.25)]})
        l8 = self.ld("Longueur : x + 3.", -2.66, 46, x0=x0, maxw=mw)
        self.poser_gestes(l8, "Longueur : x plus 3.", {4: lambda: [GrowFromCenter(fL), FadeIn(lL)]})
        self.insister(VGroup(l7, l8), 1.04, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : l'identité a² − b² = (a − b)(a + b) ─────────────────────────────
    def ecran_identite(self):
        self.ecran("03-identite")
        tL = Terrasse(1.6, 0.6, P(-6.5, 2.7))
        tL.add(tL.arbre)
        tR = Terrasse(1.6, 0.6, P(-6.5, 0.1)).colores().rectangle_fait()
        tR.remove(tR.trou)
        kL = tL.coins()
        fx, lx = cote(kL["tl"], kL["tr"], "x", UP, fs=36, d=0.2)
        cR = tR.contour_rect()
        fw, lw = cote(cR.get_corner(DL), cR.get_corner(DR), "x + 3", DOWN, fs=34, d=0.2)
        fh, lh = cote(cR.get_corner(UR), cR.get_corner(DR), "x − 3", RIGHT, fs=34, d=0.2)
        self.play(FadeIn(VGroup(tL, fx, lx)), FadeIn(VGroup(tR, cR, fw, lw, fh, lh)), run_time=0.4)
        x0, mw = -2.2, 8.8
        l0 = self.ld("Même aire, deux écritures.", 3.15, 42, x0=x0, maxw=mw)
        self.poser_gestes(l0, "Même aire, deux écritures.",
                          {0: lambda: [Indicate(VGroup(tL.grande, tL.petite), color=JAUNE_TITRE, scale_factor=1.04)],
                           3: lambda: [Indicate(VGroup(tR.grande, tR.petite), color=JAUNE_TITRE, scale_factor=1.04)]})
        e1 = X("x² − 9 = (x − 3)(x + 3)", 52).move_to(P(0, 2.4)).align_to(P(x0, 0), LEFT)
        self.poser_gestes(e1, "x au carré moins 9 égale x moins 3, fois x plus 3.",
                          {0: lambda: [Circumscribe(VGroup(tL.grande, tL.petite), color=CIEL, buff=0.04)],
                           5: lambda: [Circumscribe(cR, color=CIEL, buff=0.04)]}, echelle=1.15)
        l2 = self.ld("C'est l'identité :", 1.65, 46, CIEL, x0=x0, maxw=mw)
        self.dit(l2, "C'est l'identité :")
        e2 = Ab("a² − b² = (a − b)(a + b)", 48).move_to(P(0, 0.95)).align_to(P(x0 + 0.4, 0), LEFT)
        self.dire_eq(e2, "a au carré moins b au carré égale a moins b, fois a plus b.", echelle=1.15)
        cad = SurroundingRectangle(e2, color=JAUNE_TITRE, buff=0.14, stroke_width=4, corner_radius=0.08)
        self.play(Create(cad), run_time=0.3)
        l3 = self.ld("a = x, b = 3 : 9 = 3².", 0.18, 46, x0=x0, maxw=mw)
        for a in l3.atomes:
            if a.original_text == "a":
                a.set_color(A2)
            elif a.original_text == "b":
                a.set_color("#a78bfa")
        self.poser_gestes(l3, "a vaut x, et b vaut 3, car 9, c'est 3 au carré.",
                          {2: lambda: [Indicate(lx, color=JAUNE_TITRE, scale_factor=1.4)],
                           6: lambda: [Indicate(tL.trou, color=JAUNE_TITRE, scale_factor=1.15)]})
        l4 = self.ld("Inès vérifie :", -0.52, 46, x0=x0, maxw=mw)
        rap = X("(x − 3)(x + 3)", 46, audit=False).move_to(P(0, -1.22)).align_to(P(x0 + 0.4, 0), LEFT)
        self.poser_gestes(l4, "Inès vérifie en développant :", {0: lambda: [FadeIn(rap)]})
        e5 = X("= x² + 3x − 3x − 9", 46).move_to(P(0, -1.92)).align_to(P(x0 + 1.0, 0), LEFT)
        self.dire_eq(e5, "x au carré, plus 3 x, moins 3 x, moins 9.", echelle=1.15)
        trois = VGroup(*e5.atomes[3:6])
        moins3 = VGroup(*e5.atomes[6:9])
        l6 = self.ld("3x s'annulent : x² − 9.", -2.62, 42, VERT_OK, x0=x0, maxw=7.6)
        b1, b2 = self.barrer(trois), self.barrer(moins3)
        self.poser_gestes(l6, "Les 3 x s'annulent : on retrouve x au carré moins 9.",
                          {2: lambda: [Create(b1), Create(b2)]})
        self.play(Create(self.cadre_ok(VGroup(*l6.atomes[-5:]), 0.1)), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse C) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        t = Terrasse(2.7, 1.2, P(-5.4, 0.9), joints=False, trou_couleur="#1e1b4b")
        t.trou.set_stroke(B2, 3)
        n64 = T("64", 40, WHITE).move_to(t.trou)
        k = t.coins()
        fx, lx = cote(k["tl"], k["tr"], "x", UP, fs=40, audit=True)
        f8, l8 = cote(t.trou.get_corner(DL), t.trou.get_corner(DR), "8", DOWN, fs=40, audit=True)

        def avant(sc):
            sc.ligne_q("Factorise x² − 64.", "Factorise x au carré moins 64.",
                       {0: lambda: [FadeIn(VGroup(t.trou, t.grande, t.petite))],
                        1: lambda: [GrowFromCenter(fx), FadeIn(lx)], 4: lambda: [FadeIn(n64, scale=1.3)]})

        def apres(sc):
            sc.monter_reponse(2)
            sc.ph_gestes(0, "Réponse C :", "Réponse C :", {}, premier=True)
            sc.ph_gestes(1, "64 = 8².", "64, c'est 8 au carré.", {2: lambda: [GrowFromCenter(f8), FadeIn(l8)]})
            sc.ph_gestes(2, "(x − 8)(x + 8).", "Donc x moins 8, fois x plus 8.",
                         {1: lambda: [*t.colorer(), FadeOut(VGroup(n64, f8, l8, t.trou))]})
            t.tourner(sc, 0.3)
            t.coller(sc, 0.35)
            sc.ph_gestes(3, "Pas 32 : 32² ≠ 64.", "Pas 32 : 32 au carré ne fait pas 64.", {})
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Factorise x² − 64."],
                            [X("(x − 8)²", 34), X("(x − 32)(x + 32)", 34), X("(x − 8)(x + 8)", 34)], 2,
                            ["Réponse C :", "64 = 8².", "(x − 8)(x + 8).", "Pas 32 : 32² ≠ 64."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : les carreaux se rangent en un carré ─────────────────────────────
    def ecran_carreaux(self):
        self.ecran("04-carreaux")
        c = Carreaux(2.0, 0.4, P(-6.4, 2.15))
        x0, mw = -0.35, 6.95
        l0 = self.ld("Une autre commande.", 3.05, 44, CIEL, x0=x0, maxw=mw)
        self.dit(l0, "Une autre commande.")
        l1 = self.ld("Un carreau x sur x,", 2.35, 44, x0=x0, maxw=mw)
        self.poser_gestes(l1, "un grand carreau de x sur x,", {1: lambda: [FadeIn(c.grand, scale=0.8)]})
        l2 = self.ld("6 bandes x sur 1,", 1.7, 44, x0=x0, maxw=mw)
        self.poser_gestes(l2, "6 bandes de x sur 1,",
                          {1: lambda: [LaggedStart(*[FadeIn(b, shift=DOWN * 0.2) for b in c.bandes], lag_ratio=0.1)]})
        l3 = self.ld("9 carreaux 1 sur 1.", 1.05, 44, x0=x0, maxw=mw)
        self.poser_gestes(l3, "9 petits carreaux de 1 sur 1.",
                          {1: lambda: [LaggedStart(*[FadeIn(p, scale=0.6) for p in c.petits], lag_ratio=0.05)]})
        l4 = self.ld("En tout :", 0.3, 44, x0=x0, maxw=mw)
        self.dit(l4, "En tout :")
        l4b = X("x² + 6x + 9", 54).move_to(P(0, -0.42)).align_to(P(x0 + 0.5, 0), LEFT)
        self.poser_gestes(l4b, "x au carré plus 6 x plus 9.",
                          {0: lambda: [Indicate(c.grand, color=JAUNE_TITRE, scale_factor=1.04)],
                           3: lambda: [Indicate(c.bandes, color=JAUNE_TITRE, scale_factor=1.04)],
                           6: lambda: [Indicate(c.petits, color=JAUNE_TITRE, scale_factor=1.06)]}, echelle=1.1)
        l5 = self.ld("Un seul carré ?", -1.2, 46, JAUNE_TITRE, x0=x0, maxw=mw)
        self.dit(l5, "un seul carré ?")
        # le rangement
        self.play(FadeOut(VGroup(l1, l2, l3)), run_time=0.3)
        m1 = self.ld("Trois à droite,", 2.35, 44, x0=x0, maxw=mw)
        self.dit(m1, "trois bandes à droite,")
        self.play(*[c.bandes[k].animate.move_to(c.place_droite(k)) for k in range(3)], run_time=0.55)
        m2 = self.ld("trois en bas,", 1.7, 44, x0=x0, maxw=mw)
        self.dit(m2, "trois en bas,")
        self.play(*[c.bandes[3 + k].animate.rotate(PI / 2).move_to(c.place_bas(k)) for k in range(3)], run_time=0.45)
        m3 = self.ld("les 9 dans le coin.", 1.05, 44, x0=x0, maxw=mw)
        self.poser_gestes(m3, "les 9 petits carreaux dans le coin.", {})
        self.play(*[p.animate.move_to(c.place_coin(k)) for k, p in enumerate(c.petits)], run_time=0.55)
        fc, lc = c.cote_haut()
        n = c.S + 3 * c.u
        cadre = Square(n, stroke_color=VERT_OK, stroke_width=6).move_to(P(c.x0 + n / 2, c.y0 - n / 2))
        l6 = self.ld("Un carré de côté", -1.95, 46, VERT_OK, x0=x0, maxw=mw)
        self.poser_gestes(l6, "Un carré de côté", {1: lambda: [Create(cadre)]})
        l6b = X("x + 3 !", 56, VERT_OK).move_to(P(0, -2.68)).align_to(P(x0 + 0.5, 0), LEFT)
        l6b.atomes[0].set_color(INCONNUE)
        self.poser_gestes(l6b, "x plus 3 !", {2: lambda: [GrowFromCenter(fc), FadeIn(lc)]}, echelle=1.1)
        self.insister(l6b, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05 : reconnaître les trois termes ────────────────────────────────────
    def ecran_reconnaitre(self):
        self.ecran("05-reconnaitre")
        c = Carreaux(1.9, 0.38, P(-6.55, 2.0), stock=False)
        fc, lc = c.cote_haut()
        self.play(FadeIn(c), FadeIn(fc), FadeIn(lc), run_time=0.1)
        x0, mw = -2.75, 9.3
        e1 = X("x² + 6x + 9 = (x + 3)²", 52).move_to(P(0, 3.0)).align_to(P(x0, 0), LEFT)
        self.dire_eq(e1, "x au carré plus 6 x plus 9 égale x plus 3, au carré.", echelle=1.15)
        l1 = self.ld("Pour le reconnaître :", 2.2, 46, CIEL, x0=x0, maxw=mw)
        self.dit(l1, "Pour le reconnaître :")
        l2 = self.ld("deux carrés, x² et 9 = 3²,", 1.45, 44, x0=x0, maxw=mw)
        car = l2.atomes[-2]
        car._pas_audit = True
        vir = l2.atomes[-1]
        vir._pas_audit = True
        self.poser_gestes(l2, "deux carrés, x au carré et 9, le carré de 3.",
                          {3: lambda: [Circumscribe(VGroup(*e1.atomes[0:2]), color=A2, buff=0.06),
                                       Indicate(c.grand, color=JAUNE_TITRE, scale_factor=1.04)],
                           6: lambda: [Circumscribe(e1.atomes[6], color=B2, buff=0.06),
                                       Indicate(c.petits, color=JAUNE_TITRE, scale_factor=1.06)]},
                          sauf=[car, vir])
        self.play(FadeIn(car, scale=1.2), FadeIn(vir), run_time=0.15)
        l3 = self.ld("Au milieu, double produit :", 0.7, 42, x0=x0, maxw=mw)
        self.dit(l3, "au milieu, le double produit :")
        l4 = self.ld("2 × x × 3 = 6x", -0.08, 52, ORANGE_RETENUE, x0=x0 + 0.5, maxw=mw)
        for a in l4.atomes:
            if a.original_text == "x":
                a.set_color(INCONNUE)
        self.poser_gestes(l4, "2 fois x fois 3, 6 x.",
                          {6: lambda: [Circumscribe(VGroup(*e1.atomes[2:5]), color=AB, buff=0.06),
                                       Indicate(c.bandes, color=JAUNE_TITRE, scale_factor=1.04)]}, echelle=1.15)
        l5 = self.ld("Avec un moins au milieu :", -0.95, 44, x0=x0, maxw=mw)
        self.dit(l5, "Avec un moins au milieu, ça marche aussi :")
        e6 = X("x² − 10x + 25 = (x − 5)²", 52).move_to(P(0, -1.85)).align_to(P(x0, 0), LEFT)
        e6.atomes[2].set_color(PIEGE)
        e6.atomes[10].set_color(PIEGE)
        self.dire_eq(e6, "x au carré moins 10 x plus 25 égale x moins 5, au carré.", echelle=1.15)
        self.play(Create(self.cadre_ok(e6, 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse A) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        C = self.figure_q(("x", "4"), ("x", "4"), wa=2.3, wb=1.15)
        C.shift(LEFT * 0.4)

        def avant(sc):
            sc.ligne_q("(x + 4)² = ?", "égale à x plus 4, au carré ?",
                       {1: lambda: [FadeIn(C.cases), FadeIn(C.haut[0]), FadeIn(C.gauche[0])],
                        3: lambda: [FadeIn(C.haut[1]), FadeIn(C.gauche[1])]})

        def apres(sc):
            sc.monter_reponse(0)
            sc.ph_gestes(0, "Réponse A :", "Réponse A :", {}, premier=True)
            sc.ph_gestes(1, "2 × x × 4 = 8x.", "2 fois x fois 4, donne 8 x.",
                         {4: lambda: [*C.remplir(1, 2), FadeIn(C.nom(1, "4x")), FadeIn(C.nom(2, "4x"))],
                          6: lambda: [Circumscribe(VGroup(C.cases[1], C.cases[2]), color=AB, buff=0.04)]})
            sc.ph_gestes(2, "x² + 16 n'a pas de", "Et x au carré plus 16 n'a pas de",
                         {0: lambda: [*C.remplir(0), FadeIn(C.nom(0, "x²"))],
                          3: lambda: [*C.remplir(3), FadeIn(C.nom(3, "16"))]})
            sc.ph_gestes(3, "double produit.", "double produit :",
                         {0: lambda: [Circumscribe(VGroup(C.cases[1], C.cases[2]), color=AB, buff=0.04)]})
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["(x + 4)² = ?"],
                            [X("x² + 8x + 16", 34), X("x² + 16", 34), X("x² + 4x + 16", 34)], 0,
                            ["Réponse A :", "2 × x × 4 = 8x.", "x² + 16 n'a pas de", "double produit."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        m = ines(0.72, 36)
        m.perso.move_to(P(-5.9, -1.1))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.25)
        t = Terrasse(1.6, 0.6, P(-4.3, 2.45))
        t.add(t.arbre)
        q = T("?", 60, JAUNE_TITRE, audit=False).next_to(t, DOWN, buff=0.2)
        self.play(FadeIn(m), FadeIn(t), run_time=0.3)
        x0 = -2.2
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.95)).align_to(P(x0, 0), LEFT)
        self.au("À toi", Write(tit), rt=0.5)
        l1 = self.ld("Factorise :", 1.95, 48, x0=x0, maxw=8.5)
        self.dit(l1, "Factorise.", avec=[FadeIn(q, scale=1.4)])
        p1 = pastille("1", CIEL, 0.3).move_to(P(x0 + 0.3, 1.05))
        e1 = X("4x² − 25", 52).next_to(p1, RIGHT, buff=0.3)
        self.dire_eq(e1, "4 x au carré moins 25.", avec=[FadeIn(p1, scale=1.3)], echelle=1.15)
        p2 = pastille("2", CIEL, 0.3).move_to(P(x0 + 0.3, -0.35))
        e2 = X("x² − 14x + 49", 52).next_to(p2, RIGHT, buff=0.3)
        self.dire_eq(e2, "x au carré moins 14 x plus 49.", avec=[FadeIn(p2, scale=1.3)], echelle=1.15)
        pz = T("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(0, -1.9)).align_to(P(x0, 0), LEFT)
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, e1=e1, e2=e2, p1=p1, p2=p2, pz=pz, autres=VGroup(m, t, q, l1))
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        x0 = -6.3
        self.dire("06b-correction")
        tit = T("Correction", 52, JAUNE_TITRE).move_to(P(0, 3.05)).align_to(P(x0, 0), LEFT)
        e1, e2, p1, p2 = d["e1"], d["e2"], d["p1"], d["p2"]
        g1, g2 = VGroup(p1, e1), VGroup(p2, e2)
        c1 = g1.copy().align_to(P(x0, 0), LEFT).set_y(2.15)
        c2 = g2.copy().align_to(P(x0, 0), LEFT).set_y(-0.35)
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["autres"]),
                g1.animate.move_to(c1), g2.animate.move_to(c2), rt=0.45)
        xi = e1.get_left()[0]
        # ① 4x² = (2x)² et 25 = 5², puis 4x² − 25 = (2x − 5)(2x + 5)
        s1a = X("4x² = (2x)²", 46).move_to(P(0, 1.4)).align_to(P(xi, 0), LEFT)
        dernier = s1a.atomes[-1]
        dernier._pas_audit = True
        egal = s1a.atomes[3]  # « = » : aucun mot ne le dit, et suivi de « ( » (muet aussi) il se perdait
        egal._pas_audit = True
        self.poser_gestes(s1a, "4 x au carré, c'est le carré de 2 x.",
                          {0: lambda: [Indicate(VGroup(*e1.atomes[0:3]), color=JAUNE_TITRE, scale_factor=1.12)],
                           2: lambda: [FadeIn(egal, scale=1.2)]},
                          sauf=[dernier, egal])
        self.play(FadeIn(dernier, scale=1.2), run_time=0.15)
        s1b = self.a_cote(X("et 25 = 5²", 46), s1a, buff=0.5, i_e=1, i_ref=0)
        self.poser_gestes(s1b, "Et 25, c'est 5 au carré.",
                          {1: lambda: [Indicate(e1.atomes[4], color=JAUNE_TITRE, scale_factor=1.12)]})
        rap1 = X("4x² − 25 =", 48, audit=False).move_to(P(0, 0.6)).align_to(P(xi, 0), LEFT)
        r1 = self.a_cote(X("(2x − 5)(2x + 5)", 48, VERT_OK), rap1, buff=0.3, i_e=1, i_ref=0)
        for a in r1.atomes:
            if a.original_text == "x":
                a.set_color(INCONNUE)
        self.dire_eq(r1, "2 x moins 5, fois 2 x plus 5.", avec=[FadeIn(rap1)], echelle=1.15)
        self.play(Create(self.cadre_ok(VGroup(rap1, r1), 0.12)), run_time=0.25)
        # ② 49 = 7² et 14x = 2 × x × 7, avec un moins, puis x² − 14x + 49 = (x − 7)²
        xi2 = e2.get_left()[0]
        s2a = X("49 = 7²", 46).move_to(P(0, -1.12)).align_to(P(xi2, 0), LEFT)
        self.poser_gestes(s2a, "49, c'est 7 au carré.",
                          {0: lambda: [Indicate(e2.atomes[-1], color=JAUNE_TITRE, scale_factor=1.12)]})
        s2b = self.a_cote(X("et 14x = 2 × x × 7,", 46), s2a, buff=0.5, i_e=1, i_ref=0)
        self.poser_gestes(s2b, "Et 14 x, c'est 2 fois x fois 7,",
                          {1: lambda: [Indicate(VGroup(*e2.atomes[3:5]), color=JAUNE_TITRE, scale_factor=1.12)]})
        l3 = self.ld("avec un moins.", -1.82, 46, PIEGE, x0=xi2, maxw=8)
        self.dit(l3, "avec un moins.", avec=[e2.atomes[2].animate.set_color(PIEGE)])
        rap2 = X("x² − 14x + 49 =", 48, audit=False).move_to(P(0, -2.6)).align_to(P(xi2, 0), LEFT)
        rap2.atomes[2].set_color(PIEGE)
        r2 = self.a_cote(X("(x − 7)²", 48, VERT_OK), rap2, buff=0.3, i_e=1, i_ref=0)
        r2.atomes[1].set_color(INCONNUE)
        r2.atomes[2].set_color(PIEGE)
        self.dire_eq(r2, "x moins 7, au carré.", avec=[FadeIn(rap2)], echelle=1.15)
        self.play(Create(self.cadre_ok(VGroup(rap2, r2), 0.12)), run_time=0.25)
        self.insister(VGroup(r1, r2), 1.05, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP, buff=0.5)
        t = Terrasse(1.7, 0.6375, P(-6.5, 1.6)).colores().rectangle_fait()
        t.remove(t.trou)
        c = Carreaux(1.5, 0.3, P(-6.5, -0.4), stock=False)
        self.play(Write(tit), FadeIn(t), FadeIn(t.contour_rect()), FadeIn(c), run_time=0.6)
        x0, mw = -2.9, 9.4
        y = [2.3, 1.6, 0.9, 0.15, -0.5, -1.25, -2.05]

        def ok(e):
            k = self.coche(VERT_OK, 0.24).move_to(P(x0 - 0.45, e.get_y()))
            return [Create(k)]

        l0 = self.ld("On cherche des carrés.", y[0], 46, x0=x0, maxw=mw)
        self.poser_gestes(l0, "on cherche des carrés.", {0: lambda: ok(l0)})
        l1 = self.ld("Deux carrés et un moins :", y[1], 46, x0=x0, maxw=mw)
        self.poser_gestes(l1, "Deux carrés séparés par un moins :",
                          {0: lambda: [*ok(l1), Indicate(t, color=JAUNE_TITRE, scale_factor=1.04)]})
        l2 = Ab("(a − b)(a + b)", 50).move_to(P(0, y[2])).align_to(P(x0 + 0.5, 0), LEFT)
        self.dire_eq(l2, "a moins b, fois a plus b.", echelle=1.1)
        l3 = self.ld("Trois termes,", y[3], 46, x0=x0, maxw=mw)
        self.poser_gestes(l3, "Trois termes,", {0: lambda: [*ok(l3), Indicate(c, color=JAUNE_TITRE, scale_factor=1.04)]})
        l4a = self.ld("double produit au milieu :", y[4], 46, x0=x0, maxw=mw)
        self.dit(l4a, "le double produit au milieu :")
        l4 = Ab("(a + b)² ou (a − b)²", 50).move_to(P(0, y[5])).align_to(P(x0 + 0.5, 0), LEFT)
        for a in l4.atomes:
            a._pas_audit = True
        at = l4.atomes
        self.au("a plus b, ou", *[FadeIn(a, scale=1.1) for a in at[0:5]], rt=0.25)
        self.au("ou a moins", FadeIn(at[6], scale=1.1), FadeIn(at[5], scale=1.1), rt=0.2)
        self.au("a moins b, au", *[FadeIn(a, scale=1.1) for a in at[7:12]], rt=0.25)
        self.au("au carré.", FadeIn(at[12], scale=1.1), rt=0.2)
        l5 = self.ld("On vérifie en développant.", y[6], 46, VERT_OK, x0=x0, maxw=mw)
        self.poser_gestes(l5, "on vérifie toujours en développant.", {0: lambda: ok(l5)})
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_carreleuse()
        self.ecran_decouper()
        self.ecran_identite()
        self.ecran_question1()
        self.ecran_carreaux()
        self.ecran_reconnaitre()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="08-abonne")
