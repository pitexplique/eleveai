# affine_graphique.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 06 : LIRE UNE FONCTION AFFINE SUR UN GRAPHIQUE.
# Paysage 16:9, AVEC VOIX, ceinture VERTE.
# Métier : Clara, community manager (le compte d'un club de basket : 200 abonnés au départ, puis 50 de plus
# chaque jour : f(x) = 50x + 200, x en jours).
# Écrans (clés de manim/voix/3e-affine-graphique.json) :
#   00-garde        page de garde, échelle des ceintures, une droite, « Que nous dit une droite ? »
#   01-community    Clara, son téléphone (ballon de basket, compteur d'abonnés), puis le repère jours / abonnés
#   02-image        l'image de 4 : flèches en pointillés axe horizontal → droite → axe vertical : 400
#   03-antecedent   l'antécédent de 600 : axe vertical → droite → axe horizontal : 8
#   03q / 03r       QUESTION 1 : droite par (0 ; 1) et (2 ; 5), f(3) ? → B (7) ; l'escalier de 3 pas de + 2
#   04-expression   b = 200 (axe vertical), a = 50 (un jour de plus) : f(x) = 50x + 200
#   05q / 05r       QUESTION 2 : coupe l'axe vertical à 4, descend d'un carreau par pas → A (−x + 4)
#   06-defi         le graphique de −2x + 6 : l'antécédent de 0, l'expression
#   06b-correction  antécédent de 0 : 3 ; b = 6, a = −2 : f(x) = −2x + 6
#   07-finale       ce que tu as appris (titre en haut et centré)
#   08-abonne       la fin commune (manim/fin_commune.py)
# Lettres justes : 03q → B, 05q → A.
# Code couleur : x bleu ; a (« monte de… ») orange ; b (le point sur l'axe vertical) violet ; droite de f bleue ;
# juste vert ; piège rouge. Lectures : flèches en pointillés (image : axe horizontal → droite → axe vertical ;
# antécédent : l'inverse).
# Voix : manim/voix/3e-affine-graphique.json (validée) ; marques : affine_graphique_marques.json.
# Contrôle : AUDIT=1 imprime aussi « CHEVAUCHE » si un texte mord sur le repère (boîtes englobantes),
# sur Ti-Margo, ou si une étiquette de figure mord sur une graduation ou sur la droite.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/3e/affine_graphique.py AffineGraphique3e --media_dir manim/scripts/3e/media-affine-06-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/3e/affine_graphique.py AffineGraphique3e -o eleveai-maths-3e-affine-graphique --media_dir manim/scripts/3e/media-affine-06
# Sortie : manim/sorties/3e/maths/fonctions-affines/06-graphique/eleveai-maths-3e-affine-graphique.mp4

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS 4e et ses outils communs
sys.path.insert(0, str(ICI.parent / "seconde"))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402
from ident_developper import X, pastille  # noqa: E402
from ident_factoriser import IdentFactoriser3e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402,F401

PAROLE["0"] = "0"  # la voix écrit « 0 » en chiffre (relatif_commun disait « zéro »)

COUL_A = ORANGE_RETENUE  # a : orange
COUL_B = "#a78bfa"       # b : violet
DROITE = BLEU_CALCUL     # la droite de f
GRILLE = "#334155"
GRAD = "#e2e8f0"
LECT = "#fde68a"         # les flèches de lecture
BALLON = "#ea580c"


def nb(v):
    return f"{v:g}".replace(".", ",").replace("-", "−")


def col(e, a=(), b=(), bleu=(), vert=(), jaune=()):
    """Colore les atomes d'indices donnés : a orange, b violet, x bleu, juste vert, mots clés jaunes."""
    for idx, c in ((a, COUL_A), (b, COUL_B), (bleu, INCONNUE), (vert, VERT_OK), (jaune, JAUNE_TITRE)):
        for i in idx:
            e.atomes[i].set_color(c)
    return e


def fleche(p, q, c=LECT, sw=4):
    """Une flèche de lecture en POINTILLÉS, de p vers q (pointe pleine en q)."""
    p, q = np.array(p, dtype=float), np.array(q, dtype=float)
    d = (q - p) / np.linalg.norm(q - p)
    trait = DashedLine(p, q - d * 0.16, dash_length=0.12, dashed_ratio=0.55, color=c, stroke_width=sw)
    pointe = Triangle(fill_color=c, fill_opacity=1, stroke_width=0).scale(0.1)
    pointe.rotate(np.arctan2(d[1], d[0]) - PI / 2).move_to(q - d * 0.09)
    return VGroup(trait, pointe).set_z_index(4)


class Repere(VGroup):
    """Un repère dessiné : .p(x, y) ; grille légère ; graduations à 28 pt (données de figure, sans audit) ;
    .lx[v] / .ly[v] les nombres des axes ; axes nommés."""

    def __init__(self, o, ux, uy, xr, yr, xt=(), xl=(), yt=(), yl=(), nom_x="x", nom_y="y", fs=28, grille=True,
                 nx_haut=True, nx_sous=None, **kw):
        """nx_sous = x : le nom de l'axe horizontal SOUS la ligne des nombres, son bord droit en x (short : la
        place manque à droite du quadrillage, et « jours » touchait la fin de la droite)."""
        super().__init__(**kw)
        self.o, self.ux, self.uy = np.array(o, dtype=float), ux, uy
        (x0, x1), (y0, y1) = xr, yr
        self.grille = VGroup()
        if grille:
            for v in xt:
                self.grille.add(Line(self.p(v, y0), self.p(v, max(yt) if yt else y1)))
            for v in yt:
                self.grille.add(Line(self.p(x0, v), self.p(max(xt) if xt else x1, v)))
            self.grille.set_stroke(GRILLE, 1.5)
        kw_f = dict(buff=0, stroke_width=3, tip_length=0.18, max_tip_length_to_length_ratio=0.1, color=WHITE)
        self.ax = Arrow(self.p(x0, 0), self.p(x1, 0), **kw_f)
        self.ay = Arrow(self.p(0, y0), self.p(0, y1), **kw_f)
        self.traits = VGroup(*[Line(self.p(v, 0) + DOWN * 0.07, self.p(v, 0) + UP * 0.07) for v in xt],
                             *[Line(self.p(0, v) + LEFT * 0.07, self.p(0, v) + RIGHT * 0.07) for v in yt])
        self.traits.set_stroke(WHITE, 2.5)
        self.lx, self.ly = {}, {}
        self.labs = VGroup()
        for v in xl:
            self.lx[v] = T(nb(v), fs, GRAD, audit=False).next_to(self.p(v, 0), DOWN, buff=0.12)
            self.labs.add(self.lx[v])
        for v in yl:
            self.ly[v] = T(nb(v), fs, GRAD, audit=False).next_to(self.p(0, v), LEFT, buff=0.14)
            self.labs.add(self.ly[v])
        self.zero = T("0", fs, GRAD, audit=False).next_to(self.p(0, 0), DL, buff=0.08)
        self.labs.add(self.zero)
        self.noms = VGroup()
        if nom_x:
            self.nx = T(nom_x, 30, CIEL, audit=False)
            self.nx.next_to(self.ax.get_end(), UP if nx_haut else DOWN, buff=0.14).align_to(self.ax.get_end(), RIGHT)
            self.noms.add(self.nx)
        if nom_y:
            self.ny = T(nom_y, 30, CIEL, audit=False).next_to(self.ay.get_end(), RIGHT, buff=0.15)
            self.noms.add(self.ny)
        # les noms d'axes HORS du quadrillage, avec une marge de 0,1 (relecture -ql du 22/11)
        if nom_x and nx_sous is not None:
            bas = min([m.get_bottom()[1] for m in self.lx.values()] + [self.zero.get_bottom()[1]])
            self.nx.next_to(P(nx_sous, bas), DOWN, buff=0.06).align_to(P(nx_sous, 0), RIGHT)
        elif xt and nom_x:
            d = self.p(max(xt), 0)[0] + 0.1 - self.nx.get_left()[0]
            if d > 0:
                self.nx.shift(RIGHT * d)
        if yt and nom_y:
            d = self.p(0, max(yt))[1] + 0.1 - self.ny.get_bottom()[1]
            if d > 0:
                self.ny.shift(UP * d)
        self.add(self.grille, self.ax, self.ay, self.traits, self.labs, self.noms)

    def p(self, x, y):
        return self.o + np.array([x * self.ux, y * self.uy, 0.0])

    def droite(self, a, b, xa, xb, c=DROITE, sw=5):
        return Line(self.p(xa, a * xa + b), self.p(xb, a * xb + b), color=c, stroke_width=sw).set_z_index(3)

    def point(self, x, y, c=WHITE, r=0.1):
        return Dot(self.p(x, y), radius=r, color=c).set_z_index(5)

    def image(self, x, y, c=LECT):
        """Lire l'image de x : de l'axe horizontal vers la droite, puis vers l'axe vertical."""
        return fleche(self.p(x, 0), self.p(x, y), c), fleche(self.p(x, y), self.p(0, y), c)

    def antecedent(self, y, x, c=LECT):
        """Lire l'antécédent de y : de l'axe vertical vers la droite, puis vers l'axe horizontal."""
        return fleche(self.p(0, y), self.p(x, y), c), fleche(self.p(x, y), self.p(x, 0), c)

    def pas(self, x, y, dx, dy):
        """Un pas : la flèche horizontale (bleue) puis la verticale (orange)."""
        kw = dict(buff=0, stroke_width=5, tip_length=0.15, max_tip_length_to_length_ratio=0.35)
        h = Arrow(self.p(x, y), self.p(x + dx, y), color=INCONNUE, **kw).set_z_index(4)
        v = Arrow(self.p(x + dx, y), self.p(x + dx, y + dy), color=COUL_A, **kw).set_z_index(4)
        return h, v


def etiquette(s, fs=32, c=WHITE):
    """Une étiquette de figure lisible (2e relecture -ql du 22/11) : ≥ 32 pt, sur un fond NOIR opaque qui masque
    le quadrillage dessous (jamais gris foncé)."""
    e = X(s, fs, c, audit=False)
    fond = BackgroundRectangle(e, color=BLACK, fill_opacity=1, buff=0.05, stroke_width=0)
    g = VGroup(fond, e)
    g.texte = e
    return g


def taille(m):
    """La taille EFFECTIVE (font_size × échelle) du premier texte de m."""
    for f in m.get_family():
        if isinstance(f, Text) and getattr(f, "original_text", "").strip():
            return f.font_size
    return 36.0


def telephone(s=1.0):
    """Le téléphone de Clara : l'écran, le logo du club (un ballon de basket), la place du compteur."""
    coque = RoundedRectangle(width=1.3, height=2.3, corner_radius=0.18, fill_color="#0f172a", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=4)
    ecran = RoundedRectangle(width=1.1, height=1.9, corner_radius=0.1, fill_color="#1e293b", fill_opacity=1,
                             stroke_width=0).move_to(coque).shift(UP * 0.03)
    ballon = Circle(radius=0.3, fill_color=BALLON, fill_opacity=1, stroke_color="#1c1917", stroke_width=3)
    lignes = VGroup(Line(P(-0.3, 0), P(0.3, 0)), Line(P(0, -0.3), P(0, 0.3)),
                    ArcBetweenPoints(P(-0.18, 0.24), P(-0.18, -0.24), angle=-1.6),
                    ArcBetweenPoints(P(0.18, 0.24), P(0.18, -0.24), angle=1.6)).set_stroke("#1c1917", 2.5)
    logo = VGroup(ballon, lignes).move_to(ecran.get_center() + UP * 0.45)
    coeur = VGroup(Circle(radius=0.07), Circle(radius=0.07).shift(RIGHT * 0.1),
                   Triangle().scale(0.09).rotate(PI).shift(P(0.05, -0.07))).set_fill("#f43f5e", 1).set_stroke(width=0)
    coeur.move_to(ecran.get_center() + P(-0.32, -0.25))
    g = VGroup(coque, ecran, logo, coeur)
    g.scale(s)
    g.compteur = ecran.get_center() + P(0.12, -0.25) * s
    g.ligne2 = ecran.get_center() + P(0.0, -0.68) * s
    g.logo = logo
    return g


def clara(s=0.72, fs=34):
    """Clara, community manager : maillot orange du club, cheveux longs."""
    m = Metier(["Clara", "community", "manager"], fs=fs, peau="#8d5524", tenue="#ea580c", cheveux="#1f1308",
               longs=True, s=s)
    return m


class AffineGraphique3e(IdentFactoriser3e):
    nom_voix = "3e-affine-graphique"
    fichier_marques = "affine_graphique_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "verte"

    # ── outils ──────────────────────────────────────────────────────────────
    def lf(self, s, y, fs=40, c=WHITE, x0=-0.5, maxw=7.05, **cols):
        """Une ligne de la colonne de droite, colorée par indices d'atomes."""
        return col(self.ld(s, y, fs, c, x0=x0, maxw=maxw), **cols)

    def ph_g(self, i, s, phrase, gestes=None, premier=False, **cols):
        """La ligne i de la réponse (verte), au mot, avec ses gestes sur la figure."""
        ref = self.ph_q[i]
        e = col(X(s, 30, VERT_OK), **cols)
        e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        return self.poser_gestes(e, phrase, gestes or {}, rt=0.16, sauf=sauf)

    def lq(self, s, phrase, gestes=None, **cols):
        """Dans avant_q : la première ligne restante de la question, posée au mot (gardée pour l'effacer)."""
        ref = self.q_q[0]
        e = col(X(s, 34), **cols)
        e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        self.q_q.remove(ref)
        self._poses_q.append(e)
        return self.poser_gestes(e, phrase, gestes or {}, echelle=1.2, rt=0.2)

    def _disposer_q(self, question, choix, phrase):
        """2e relecture -ql du 22/11 (modèle : affine_coeff_directeur) : l'énoncé à 38 pt en lignes courtes,
        les cartes à 40 pt raccourcies à leur contenu, « Mets pause, / et choisis ! » sur deux lignes à 35 pt
        À DROITE des cartes, à mi-hauteur, loin de Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        self._tete_q = tete
        self._poses_q = []
        if len(q.submobjects):
            q.scale(38 / taille(q[0]))
            q.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            q.next_to(tete, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        for c in cartes:
            dedans = c[1]
            dedans.scale(40 / taille(dedans[1]), about_point=dedans.get_left())
        # la place du ✓ (question_pause rétrécit le choix s'il passe à moins de 0,95 du bord droit)
        larg = max(2.4, max(c[1].get_right()[0] - c[0].get_left()[0] for c in cartes) + 1.0)
        for c in cartes:
            cadre, dedans = c[0], c[1]
            cadre.stretch_to_fit_height(dedans.height + 0.2)
            cadre.stretch_to_fit_width(larg, about_edge=LEFT)
            dedans.set_y(cadre.get_y())
        cartes.arrange(DOWN, buff=0.1, aligned_edge=LEFT)
        cartes.next_to(q if len(q.submobjects) else tete, DOWN, buff=0.25).align_to(P(self.XL, 0), LEFT)
        neuf = VGroup(T("Mets pause,", 35, ORANGE_RETENUE, audit=False),
                      T("et choisis !", 35, ORANGE_RETENUE, audit=False)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        for f in neuf.get_family():
            f.sans_synchro = True
        # à droite des cartes, en face de A et B : bien au-dessus de Ti-Margo (haut −2,2)
        neuf.next_to(cartes, RIGHT, buff=0.35).align_to(P(0, cartes.get_top()[1] - 0.3), UP)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE {self._cle_voix} énoncé {taille(q):.0f} pt {q.get_top()[1]:.2f}/{q.get_bottom()[1]:.2f}"
                  f" droite {q.get_right()[0]:.2f} ; cartes {taille(cartes[0][1][1]):.0f} pt "
                  f"{cartes.get_top()[1]:.2f}/{cartes.get_bottom()[1]:.2f} droite {cartes.get_right()[0]:.2f} ; "
                  f"pause {taille(neuf):.0f} pt bas {neuf.get_bottom()[1]:.2f} droite {neuf.get_right()[0]:.2f} "
                  f"(Ti-Margo x ≥ 5,55, y ≤ −2,2) ; rebours {rebours.get_left()[0]:.2f}/{rebours.get_bottom()[1]:.2f}",
                  flush=True)
        return tete, q, cartes, neuf, rebours, ph

    def monter_reponse(self, bonne):
        """2e relecture -ql du 22/11 : la réponse sortait à ~20 pt. L'énoncé et les mauvaises cartes s'effacent,
        la bonne carte monte sous « Question ! », la réponse est dessous à 36 pt, en lignes courtes."""
        cartes, ph = self.cartes_q, self.ph_q
        b = cartes[bonne]
        ok = self.mobjects[-1]  # la coche, posée juste avant autres_r
        haut = self._tete_q.get_bottom()[1] - 0.26
        d = P(self.XL, haut) - b.get_corner(UL)
        anims = [FadeOut(cartes[j]) for j in range(3) if j != bonne]
        anims += [FadeOut(m) for m in self._poses_q + list(self.q_q)]
        anims.append(b.animate.shift(d))
        if ok is not b and ok not in b.get_family():
            anims.append(ok.animate.shift(d))
        self.play(*anims, run_time=0.2)
        ph.scale(36 / taille(ph[0]))
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        ph.next_to(b, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)  # b a déjà monté
        if os.environ.get("AUDIT") == "1":
            print(f"TAILLE-REPONSE {self._cle_voix} {taille(ph[0]):.0f} pt, bas {ph.get_bottom()[1]:.2f}, "
                  f"droite {ph.get_right()[0]:.2f}", flush=True)

    def verifier(self, r, nom, figure=(), lignes=()):
        """AUDIT : aucun texte ne chevauche le repère r (boîtes englobantes) ni Ti-Margo ; les étiquettes de
        `figure` ne mordent ni sur une graduation, ni sur un nom d'axe, ni sur les segments de `lignes`."""
        if os.environ.get("AUDIT") != "1":
            return

        def boite(m, marge=0.0):
            return (m.get_left()[0] - marge, m.get_right()[0] + marge, m.get_bottom()[1] - marge,
                    m.get_top()[1] + marge)

        def coupe(u, v):
            return u[0] < v[1] and v[0] < u[1] and u[2] < v[3] and v[2] < u[3]

        fig = {id(m) for f in figure for m in f.get_family()}
        dans_r = {id(m) for m in r.get_family()}
        zone = boite(r, 0.05)
        margos = [m for m in self.mobjects if type(m).__name__ == "MascotteMargouillat"]
        textes = [m for top in self.mobjects for m in top.get_family() if isinstance(m, Text)
                  and id(m) not in dans_r and id(m) not in fig and m.get_fill_opacity() > 0.05]
        for t in textes:
            if coupe(boite(t), zone):
                print(f"CHEVAUCHE {nom} texte « {t.original_text} » sur le repère", flush=True)
            for mg in margos:
                if coupe(boite(t), boite(mg)):
                    print(f"CHEVAUCHE {nom} texte « {t.original_text} » sur Ti-Margo", flush=True)
        reperes = [m for m in list(r.labs) + list(r.noms)]
        if len(r.grille):  # les noms d'axes hors du quadrillage et de la droite
            zg = boite(r.grille, 0.05)
            for g in r.noms:
                if coupe(boite(g), zg):
                    print(f"CHEVAUCHE {nom} nom d'axe « {g.original_text} » sur le quadrillage", flush=True)
            figure = list(figure) + [r.noms]
        etiquettes = [m for f in figure for m in f.get_family() if isinstance(m, Text)]
        for t in etiquettes:
            for g in reperes:
                if g is t:
                    continue
                if coupe(boite(t, 0.02), boite(g)):
                    print(f"CHEVAUCHE {nom} étiquette « {t.original_text} » sur « {g.original_text} »", flush=True)
            bt = boite(t, 0.03)
            for ln in lignes:
                a, b = ln.get_start(), ln.get_end()
                for k in np.linspace(0, 1, 80):
                    q = a + (b - a) * k
                    if bt[0] < q[0] < bt[1] and bt[2] < q[1] < bt[3]:
                        print(f"CHEVAUCHE {nom} étiquette « {t.original_text} » sur la droite", flush=True)
                        break

    # ── le repère de Clara (écrans 01 à 04) ─────────────────────────────────
    def repere_clara(self):
        return Repere(P(-5.8, -2.55), 0.39, 0.0058, (0, 13.1), (0, 870), xt=range(1, 11), xl=(2, 4, 6, 8, 10),
                      yt=range(100, 801, 100), yl=(200, 400, 600, 800), nom_x="jours", nom_y="abonnés")

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire une fonction affine sur un graphique", self.identite, self.ceinture,
                                       y_ech=-2.75)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Lire", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        r = Repere(P(-5.8, -1.75), 0.55, 0.5, (0, 6.0), (0, 6.3), xt=range(1, 6), yt=range(1, 6), nom_x="x",
                   nom_y="y")
        d = r.droite(0.6, 1.5, 0, 5)
        q = T("?", 64, JAUNE_TITRE, audit=False, gras=True).move_to(r.p(3.8, 1.6))
        self.au("graphique", FadeIn(r), rt=0.35)
        x0 = -1.0
        l1 = self.lf("Que nous dit", 0.75, 52, x0=x0)
        self.dit(l1, "Que nous dit")
        l2 = self.lf("une droite ?", -0.1, 52, JAUNE_TITRE, x0=x0)
        self.poser_gestes(l2, "une droite ?", {1: lambda: [Create(d)]}, rt=0.3)
        self.play(FadeIn(q, scale=0.5), run_time=0.25)
        self.insister(l2, 1.06, 0.2)
        self.verifier(r, "00-garde", figure=[q], lignes=[d])
        self.attendre_voix(marge=0.8)

    # ── 01 : Clara, community manager ───────────────────────────────────────
    def ecran_community(self):
        self.ecran("01-community")
        # 2e relecture -ql du 22/11 : Clara et son nom plus grands, le téléphone aussi
        m = clara(1.1, 38)
        m.perso.move_to(P(-4.95, -1.35))
        m.nom.next_to(m.perso, UP, buff=0.2).set_x(-4.95)
        tel = telephone(1.35).move_to(P(-2.0, -0.75))
        # les places du compteur, recalculées APRÈS le déplacement (telephone() les donnait autour de l'origine)
        n200 = T("200", 40, COUL_B, audit=False, gras=True).move_to(tel[1].get_center() + P(0.12, -0.25) * 1.35)
        n50 = T("+ 50", 38, COUL_A, audit=False, gras=True).move_to(tel[1].get_center() + P(0.0, -0.68) * 1.35)
        if os.environ.get("AUDIT") == "1":
            print(f"GEO 01 Clara {m.perso.get_left()[0]:.2f}/{m.perso.get_right()[0]:.2f} "
                  f"{m.perso.get_bottom()[1]:.2f}/{m.perso.get_top()[1]:.2f} nom {m.nom.get_left()[0]:.2f}/"
                  f"{m.nom.get_right()[0]:.2f} haut {m.nom.get_top()[1]:.2f} ; téléphone {tel.get_left()[0]:.2f}/"
                  f"{tel.get_right()[0]:.2f} {tel.get_bottom()[1]:.2f}/{tel.get_top()[1]:.2f} ; « 200 » "
                  f"{n200.get_left()[0]:.2f}/{n200.get_right()[0]:.2f}", flush=True)
        self.au("Clara", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("community", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.25)
        self.au("manager", FadeIn(m.nom[2], shift=UP * 0.1), rt=0.25)
        l1 = self.lf("Elle lance le compte", 2.95)
        self.poser_gestes(l1, "Elle lance le compte", {2: lambda: [FadeIn(tel, shift=UP * 0.3)]})
        l2 = self.lf("d'un club de basket.", 2.3)
        self.poser_gestes(l2, "d'un club de basket.",
                          {5: lambda: [Indicate(tel.logo, color=JAUNE_TITRE, scale_factor=1.3)]})
        l3 = self.lf("Au départ, 200 abonnés.", 1.4, b=(3,))
        self.poser_gestes(l3, "Au départ, 200 abonnés.", {3: lambda: [FadeIn(n200, scale=1.3)]})
        l4 = self.lf("Puis 50 de plus", 0.75, a=(1,))
        self.poser_gestes(l4, "Puis 50 de plus", {1: lambda: [FadeIn(n50, shift=UP * 0.2)]})
        l5 = self.lf("chaque jour.", 0.1)
        self.dit(l5, "chaque jour.")
        r = self.repere_clara()
        d = r.droite(50, 200, 0, 10)
        l6 = self.lf("Elle trace la droite :", -0.8)
        self.poser_gestes(l6, "Elle trace la droite :",
                          {1: lambda: [FadeOut(VGroup(m, tel, n200, n50)), FadeIn(r)], 3: lambda: [Create(d)]},
                          rt=0.3)
        l7 = self.lf("jours en bas,", -1.45, jaune=(0,))
        self.poser_gestes(l7, "jours en bas,", {0: lambda: [Indicate(r.nx, color=JAUNE_TITRE, scale_factor=1.4),
                                                            Indicate(r.ax, color=JAUNE_TITRE, scale_factor=1.0)]})
        l8 = self.lf("abonnés à gauche.", -2.1, jaune=(0,))
        self.poser_gestes(l8, "abonnés à gauche.", {0: lambda: [Indicate(r.ny, color=JAUNE_TITRE, scale_factor=1.4),
                                                                Indicate(r.ay, color=JAUNE_TITRE, scale_factor=1.0)]})
        self.verifier(r, "01-community", lignes=[d])
        self.r_clara, self.d_clara = r, d
        self.attendre_voix(marge=0.8)

    # ── 02 : lire une image ─────────────────────────────────────────────────
    def ecran_image(self):
        r, d = self.r_clara, self.d_clara
        self.ecran("02-image")
        self.add(r, d)
        f1, f2 = r.image(4, 400)
        pt = r.point(4, 400, JAUNE_TITRE, 0.11)
        rond4 = Circle(radius=0.3, stroke_color=INCONNUE, stroke_width=4).move_to(r.lx[4])
        l1 = self.lf("Après 4 jours ?", 2.95, 44, JAUNE_TITRE, bleu=(1,))
        self.dit(l1, "Combien d'abonnés après 4 jours ?")
        l2 = self.lf("On part de 4,", 2.1, bleu=(3,))
        self.poser_gestes(l2, "On part de 4,", {3: lambda: [Create(rond4), r.lx[4].animate.set_color(INCONNUE)]})
        l3 = self.lf("sur l'axe horizontal.", 1.45)
        self.poser_gestes(l3, "sur l'axe horizontal.", {3: lambda: [Indicate(r.ax, color=JAUNE_TITRE,
                                                                              scale_factor=1.0)]})
        l4 = self.lf("On monte jusqu'à", 0.6)
        self.poser_gestes(l4, "On monte jusqu'à", {1: lambda: [Create(f1)]}, rt=0.4)
        l5 = self.lf("la droite.", -0.05)
        self.poser_gestes(l5, "la droite.", {1: lambda: [GrowFromCenter(pt)]})
        l6 = self.lf("Puis à gauche : 400.", -0.85, vert=(4,))
        self.poser_gestes(l6, "Puis on va à gauche : 400.",
                          {2: lambda: [Create(f2)], 4: lambda: [r.ly[400].animate.set_color(VERT_OK)]},
                          rt=0.35)
        l7 = self.lf("L'image de 4 est 400.", -1.65, 42, jaune=(2,), bleu=(4,), vert=(6,))
        self.dit(l7, "L'image de 4 est 400.")
        self.play(Create(self.cadre_ok(l7, 0.12)), run_time=0.3)
        self.verifier(r, "02-image", lignes=[d])
        self.attendre_voix(marge=0.8)
        r.lx[4].set_color(GRAD)
        r.ly[400].set_color(GRAD)

    # ── 03 : lire un antécédent ─────────────────────────────────────────────
    def ecran_antecedent(self):
        r, d = self.r_clara, self.d_clara
        self.ecran("03-antecedent")
        self.add(r, d)
        f1, f2 = r.antecedent(600, 8)
        pt = r.point(8, 600, JAUNE_TITRE, 0.11)
        cad8 = Circle(radius=0.3, stroke_color=VERT_OK, stroke_width=4).move_to(r.lx[8])
        l1 = self.lf("Et quand 600 abonnés ?", 2.95, 40, JAUNE_TITRE)
        self.dit(l1, "Et quand le compte atteindra-t-il 600 abonnés ?")
        l2 = self.lf("On part de 600,", 2.1)
        self.poser_gestes(l2, "on part de 600,", {3: lambda: [r.ly[600].animate.set_color(JAUNE_TITRE)]})
        l3 = self.lf("sur l'axe vertical.", 1.45)
        self.poser_gestes(l3, "sur l'axe vertical.", {3: lambda: [Indicate(r.ay, color=JAUNE_TITRE,
                                                                            scale_factor=1.0)]})
        l4 = self.lf("Jusqu'à la droite,", 0.6)
        self.poser_gestes(l4, "On va jusqu'à la droite,", {0: lambda: [Create(f1)], 4: lambda: [GrowFromCenter(pt)]},
                          rt=0.35)
        l5 = self.lf("puis on descend :", -0.05)
        self.poser_gestes(l5, "puis on descend :", {2: lambda: [Create(f2)]}, rt=0.35)
        l6 = self.lf("8 jours.", -0.7, vert=(0,))
        self.poser_gestes(l6, "8 jours.", {0: lambda: [Create(cad8), r.lx[8].animate.set_color(VERT_OK)]})
        l7 = self.lf("8 est l'antécédent", -1.55, 42, vert=(0,), jaune=(4,))
        self.dit(l7, "8 est l'antécédent")
        l8 = self.lf("de 600.", -2.2, 42)
        self.dit(l8, "de 600.")
        self.play(Create(self.cadre_ok(VGroup(l7, l8), 0.12)), run_time=0.3)
        self.verifier(r, "03-antecedent", lignes=[d])
        self.attendre_voix(marge=0.8)
        r.lx[8].set_color(GRAD)
        r.ly[600].set_color(GRAD)

    # ── 03q : QUESTION 1 (réponse B) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        # 2e relecture -ql du 22/11 : 4 nombres par axe au plus 6 ; étiquettes à 32 pt sur fond noir, hors des axes
        r = Repere(P(-5.75, -2.95), 1.0, 0.7, (0, 4.5), (0, 8.6), xt=range(1, 5), xl=range(1, 5), yt=range(1, 9),
                   yl=(2, 4, 6, 8), nom_x="x", nom_y="y")
        d = r.droite(2, 1, 0, 3.5)
        pA, pB = r.point(0, 1, COUL_B, 0.11), r.point(2, 5, WHITE, 0.11)
        labA = etiquette("(0 ; 1)", 32, COUL_B).next_to(r.p(0, 1), RIGHT, buff=0.18)
        labA.shift(DOWN * (labA.get_top()[1] - (r.p(0, 1)[1] - 0.12)))  # sous la 1re marche, au-dessus de l'axe
        labB = etiquette("(2 ; 5)", 32, WHITE).next_to(r.p(2, 5), UL, buff=0.08)
        q3 = Circle(radius=0.27, stroke_color=JAUNE_TITRE, stroke_width=4).move_to(r.lx[3])
        esc = VGroup(*[f for k in range(3) for f in r.pas(k, 1 + 2 * k, 1, 2)])
        p2 = etiquette("+ 2", 34, COUL_A).next_to(r.p(1, 2), RIGHT, buff=0.12)
        p7 = r.point(3, 7, VERT_OK, 0.12)
        lab7 = etiquette("(3 ; 7)", 32, VERT_OK).next_to(r.p(3, 7), UL, buff=0.08)

        def avant(sc):
            sc.au("graphique", FadeIn(r), Create(d), rt=0.4)
            sc.lq("La droite passe", "la droite passe")
            sc.lq("par (0 ; 1)", "par le point de coordonnées 0 et 1,",
                  {2: lambda: [GrowFromCenter(pA), FadeIn(labA)]}, b=(1, 2, 3, 4, 5))
            sc.lq("et par (2 ; 5).", "et par le point de coordonnées 2 et 5.",
                  {3: lambda: [GrowFromCenter(pB), FadeIn(labB)]})
            sc.lq("Combien vaut f(3) ?", "Combien vaut f de 3 ?", {4: lambda: [Create(q3)]}, bleu=(4,))

        def apres(sc):
            sc.monter_reponse(1)
            sc.ph_g(0, "Réponse B :", "Réponse B :", premier=True)
            sc.ph_g(1, "Chaque pas : + 2.", "à chaque pas vers la droite, la droite monte de 2.",
                    {1: lambda: [LaggedStart(*[GrowArrow(f) for f in esc], lag_ratio=0.25)],
                     4: lambda: [FadeIn(p2, scale=1.3)]}, a=(3, 4))
            sc.ph_g(2, "À 3, 1 + 3 × 2", "À 3, elle est à 1, plus 3 fois 2",
                    {1: lambda: [Indicate(r.lx[3], color=JAUNE_TITRE, scale_factor=1.5)],
                     3: lambda: [Indicate(pA, color=COUL_B, scale_factor=1.8)],
                     6: lambda: [Indicate(esc, color=JAUNE_TITRE, scale_factor=1.0)]}, b=(3,), a=(7,), bleu=(1,))
            sc.ph_g(3, "= 7.", ": 7.", {1: lambda: [GrowFromCenter(p7), FadeIn(lab7, scale=1.2)]})
            sc.verifier(r, "03r-reponse", figure=[labA, labB, p2, lab7], lignes=[d])
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["La droite passe", "par (0 ; 1)", "et par (2 ; 5).",
                                                            "Combien vaut f(3) ?"],
                            [X("6", 34), X("7", 34), X("3", 34)], 1,
                            ["Réponse B :", "Chaque pas : + 2.", "À 3, 1 + 3 × 2", "= 7."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : la droite donne l'expression ───────────────────────────────────
    def ecran_expression(self):
        r, d = self.r_clara, self.d_clara
        self.ecran("04-expression")
        self.add(r, d)
        pb = r.point(0, 200, COUL_B, 0.12)
        h, v = r.pas(4, 400, 1, 50)
        # 2e relecture -ql du 22/11 : à 34 pt sur fond noir ; le pas est petit (0,39 × 0,29) : « + 50 » à droite
        # de la flèche verticale (sous la droite qui monte), « 1 jour » plus bas, sous la flèche horizontale
        # 3e relecture -ql : « + 50 » chevauchait la droite : son haut au niveau de la flèche horizontale ;
        # « 1 jour » sous la flèche, calé à droite, son haut à 300 (sous la droite de bout en bout)
        p50 = etiquette("+ 50", 34, COUL_A).next_to(v, RIGHT, buff=0.08)
        p50.shift(UP * (h.get_center()[1] + 0.02 - p50.get_top()[1]))
        j1 = etiquette("1 jour", 34, INCONNUE).align_to(h, RIGHT)
        j1.shift(UP * (r.p(0, 300)[1] - j1.get_top()[1]))
        l1 = self.lf("La droite donne aussi", 2.95)
        self.poser_gestes(l1, "La droite donne aussi", {1: lambda: [Indicate(d, color=JAUNE_TITRE)]})
        l2 = self.lf("l'expression.", 2.3, 40, JAUNE_TITRE)
        self.dit(l2, "l'expression.")
        l3 = self.lf("Elle coupe l'axe vertical", 1.45)
        self.poser_gestes(l3, "Elle coupe l'axe vertical", {4: lambda: [Indicate(r.ay, color=JAUNE_TITRE,
                                                                                  scale_factor=1.0)]})
        l4 = self.lf("à 200 : b = 200.", 0.8, b=(1, 3, 5))
        self.poser_gestes(l4, "à 200 : b vaut 200.", {1: lambda: [GrowFromCenter(pb), Flash(pb, color=COUL_B)]})
        l5 = self.lf("Un jour de plus,", -0.05)
        self.poser_gestes(l5, "Un jour de plus,", {1: lambda: [GrowArrow(h), FadeIn(j1)]})
        l6 = self.lf("50 abonnés de plus :", -0.7, a=(0,))
        self.poser_gestes(l6, "50 abonnés de plus :", {0: lambda: [GrowArrow(v), FadeIn(p50, scale=1.3)]})
        l7 = self.lf("a = 50.", -1.35, a=(0, 2))
        self.dit(l7, "a vaut 50.")
        e = col(X("f(x) = 50x + 200", 56), a=(5,), b=(7, 8)).move_to(P(0, 2.6)).align_to(P(-0.3, 0), LEFT)
        self.au("Donc", FadeOut(VGroup(l1, l2)), rt=0.25)
        self.dire_eq(e, "f de x égale 50 x plus 200.", echelle=1.15)
        self.play(Create(self.cadre_ok(e, 0.14)), run_time=0.3)
        l8 = self.lf("On le lit, sans calculer.", -2.15, 36, CIEL)
        self.dit(l8, "On le lit, sans calculer.")
        self.insister(e, 1.05, 0.2)
        self.verifier(r, "04-expression", figure=[j1, p50], lignes=[d])
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse A) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -0.9  # 2e relecture -ql du 22/11 : le repère plus à gauche, la place pour « Mets pause » à droite
        r = Repere(P(-6.2, -2.4), 0.85, 0.85, (0, 5.6), (0, 5.7), xt=range(1, 6), xl=range(1, 6), yt=range(1, 6),
                   yl=range(1, 6), nom_x="x", nom_y="y")
        d = r.droite(-1, 4, 0, 4)
        p4 = r.point(0, 4, COUL_B, 0.12)
        h, v = r.pas(1, 3, 1, -1)
        m1 = etiquette("− 1", 34, COUL_A).next_to(v, RIGHT, buff=0.1)

        def avant(sc):
            sc.lq("Cette droite coupe", "Cette droite coupe", {0: lambda: [FadeIn(r), Create(d)]})
            sc.lq("l'axe vertical à 4,", "l'axe vertical à 4,", {5: lambda: [GrowFromCenter(p4)]}, b=(5,))
            sc.lq("descend d'un carreau", "et descend d'un carreau",
                  {0: lambda: [Indicate(d, color=JAUNE_TITRE)]})
            sc.lq("à chaque pas.", "à chaque pas vers la droite.")
            sc.lq("Son expression ?", "Quelle est son expression ?")

        def apres(sc):
            sc.monter_reponse(0)
            sc.ph_g(0, "Réponse A :", "Réponse A :", premier=True)
            sc.ph_g(1, "b = 4.", "b vaut 4,", {2: lambda: [Flash(p4, color=COUL_B, line_length=0.25)]}, b=(0, 2))
            sc.au("descend de 1", GrowArrow(h), rt=0.25)
            sc.play(GrowArrow(v), FadeIn(m1), run_time=0.25)
            sc.ph_g(2, "a = −1.", "a vaut moins 1.", a=(0, 2, 3))
            sc.ph_g(3, "Donc −x + 4.", "Donc moins x plus 4.", a=(1,), b=(3, 4))
            sc.verifier(r, "05r-reponse", figure=[m1], lignes=[d])
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Cette droite coupe", "l'axe vertical à 4,",
                                                            "descend d'un carreau", "à chaque pas.", "Son expression ?"],
                            [X("−x + 4", 34), X("x + 4", 34), X("4x − 1", 34)], 0,
                            ["Réponse A :", "b = 4.", "a = −1.", "Donc −x + 4."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def repere_defi(self):
        return Repere(P(-5.75, -2.6), 1.0, 0.7, (0, 4.6), (0, 7.5), xt=range(1, 5), xl=range(1, 5), yt=range(1, 8),
                      yl=range(1, 8), nom_x="x", nom_y="y")

    def ecran_defi(self):
        self.ecran("06-defi")
        r = self.repere_defi()
        d = r.droite(-2, 6, 0, 3)
        x0 = -0.6
        tit = T("À toi de jouer !", 52, JAUNE_TITRE).move_to(P(0, 2.95)).align_to(P(x0, 0), LEFT)
        self.au("À toi", Write(tit), rt=0.5)
        self.au("graphique", FadeIn(r), Create(d), rt=0.4)
        l1 = self.lf("Lis deux choses :", 1.95, x0=x0)
        self.dit(l1, "Sur ce graphique, lis deux choses.")
        p1 = pastille("1", CIEL, 0.3).move_to(P(x0 + 0.3, 1.0))
        e1 = self.lf("l'antécédent de 0 ;", 1.0, x0=x0 + 0.8)
        self.poser_gestes(e1, "Un : l'antécédent de 0.", {0: lambda: [FadeIn(p1, scale=1.3)]})
        p2 = pastille("2", CIEL, 0.3).move_to(P(x0 + 0.3, 0.1))
        e2 = self.lf("l'expression", 0.1, x0=x0 + 0.8)
        self.poser_gestes(e2, "Deux : l'expression", {0: lambda: [FadeIn(p2, scale=1.3)]})
        e2b = self.lf("de la droite.", -0.55, x0=x0 + 0.8)
        self.dit(e2b, "de la droite.")
        # 2e relecture -ql du 22/11 : la version longue sur DEUX lignes à 36 pt
        pz1 = T("Mets pause,", 36, ORANGE_RETENUE).move_to(P(0, -1.55)).align_to(P(x0, 0), LEFT)
        pz2 = T("et cherche !", 36, ORANGE_RETENUE).next_to(pz1, DOWN, buff=0.1).align_to(P(x0, 0), LEFT)
        pz = VGroup(pz1, pz2)
        self.au("Mets pause", Write(pz1), rt=0.4)
        self.au("et cherche", Write(pz2), rt=0.4)
        self.verifier(r, "06-defi", lignes=[d])
        self.defi = dict(r=r, d=d, tit=tit, autres=VGroup(l1, p1, e1, p2, e2, e2b, pz))
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        dd = self.defi
        r, d = dd["r"], dd["d"]
        self.dire("06b-correction")
        x0 = -0.6
        tit = T("Correction", 52, JAUNE_TITRE).move_to(dd["tit"]).align_to(dd["tit"], LEFT)
        self.au("Correction", ReplacementTransform(dd["tit"], tit), FadeOut(dd["autres"]), rt=0.45)
        p3 = r.point(3, 0, VERT_OK, 0.13)
        c3 = Circle(radius=0.27, stroke_color=VERT_OK, stroke_width=4).move_to(r.lx[3])
        p6 = r.point(0, 6, COUL_B, 0.13)
        h, v = r.pas(0, 6, 1, -2)
        m2 = etiquette("− 2", 34, COUL_A).next_to(v, RIGHT, buff=0.1)
        p1 = pastille("1", CIEL, 0.3).move_to(P(x0 + 0.3, 2.05))
        c1 = self.lf("Axe horizontal à 3.", 2.05, x0=x0 + 0.8, bleu=(3,))
        self.poser_gestes(c1, "l'axe horizontal à 3.",
                          {0: lambda: [FadeIn(p1, scale=1.3)],
                           3: lambda: [GrowFromCenter(p3), Create(c3), Flash(p3, color=VERT_OK, line_length=0.22)]})
        c2 = self.lf("L'antécédent de 0 est 3.", 1.4, 38, x0=x0 + 0.8, jaune=(2,), vert=(6,))
        self.dit(c2, "L'antécédent de 0 est 3.")
        p2 = pastille("2", CIEL, 0.3).move_to(P(x0 + 0.3, 0.5))
        c4 = self.lf("Axe vertical à 6,", 0.5, x0=x0 + 0.8, b=(3,))
        self.poser_gestes(c4, "l'axe vertical à 6,",
                          {0: lambda: [FadeIn(p2, scale=1.3)],
                           3: lambda: [GrowFromCenter(p6), Flash(p6, color=COUL_B, line_length=0.22)]})
        c5 = self.lf("donc b = 6.", -0.15, x0=x0 + 0.8, b=(1, 3))
        self.dit(c5, "donc b vaut 6.")
        c6 = self.lf("Un pas à droite,", -0.9, x0=x0)
        self.poser_gestes(c6, "Un pas à droite,", {1: lambda: [GrowArrow(h)]})
        c7 = self.lf("deux vers le bas : a = −2.", -1.55, 36, x0=x0, a=(5, 7, 8))
        self.poser_gestes(c7, "deux vers le bas : a vaut moins 2.", {0: lambda: [GrowArrow(v), FadeIn(m2)]})
        e = col(X("f(x) = −2x + 6", 52), a=(5, 6), b=(8, 9)).move_to(P(0, -2.45)).align_to(P(x0, 0), LEFT)
        self.dire_eq(e, "f de x égale moins 2 x plus 6.", echelle=1.15)
        self.play(Create(self.cadre_ok(e, 0.14)), run_time=0.3)
        self.verifier(r, "06b-correction", figure=[m2], lignes=[d])
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP, buff=0.5)
        r = Repere(P(-5.95, -2.55), 0.55, 0.55, (0, 6.6), (0, 7.4), xt=range(1, 7), xl=(2, 4, 6),
                   yt=range(1, 8), yl=(2, 4, 6), nom_x="x", nom_y="y")
        d = r.droite(0.75, 1.5, 0, 6)
        i1, i2 = r.image(4, 4.5)
        a1, a2 = r.antecedent(6, 6, VERT_OK)
        pb = r.point(0, 1.5, COUL_B, 0.12)
        h, v = r.pas(2, 3, 1, 0.75)
        self.play(Write(tit), FadeIn(r), Create(d), run_time=0.6)
        x0, fs = -1.75, 38
        y = [2.35, 1.75, 0.95, 0.35, -0.45, -1.05, -1.85, -2.45]

        def ok(e):
            return [Create(self.coche(VERT_OK, 0.24).move_to(P(x0 - 0.45, e.get_y())))]

        l0 = self.lf("Image : on part", y[0], fs, x0=x0, jaune=(0,))
        self.poser_gestes(l0, "image, on part", {0: lambda: ok(l0), 3: lambda: [Create(i1)]})
        l1 = self.lf("de l'axe horizontal.", y[1], fs, x0=x0)
        self.poser_gestes(l1, "de l'axe horizontal.", {3: lambda: [Create(i2)]})
        l2 = self.lf("Antécédent : on part", y[2], fs, x0=x0, vert=(0,))
        self.poser_gestes(l2, "antécédent, on part", {0: lambda: ok(l2), 3: lambda: [Create(a1)]})
        l3 = self.lf("de l'axe vertical.", y[3], fs, x0=x0)
        self.poser_gestes(l3, "de l'axe vertical.", {3: lambda: [Create(a2)]})
        l4 = self.lf("b : là où elle coupe", y[4], fs, x0=x0, b=(0,))
        self.poser_gestes(l4, "b, là où elle coupe", {0: lambda: ok(l4) + [GrowFromCenter(pb)]})
        l5 = self.lf("l'axe vertical ;", y[5], fs, x0=x0)
        self.poser_gestes(l5, "l'axe vertical ;", {3: lambda: [Flash(pb, color=COUL_B, line_length=0.22)]})
        l6 = self.lf("a : ce qu'elle monte", y[6], fs, x0=x0, a=(0,))
        self.poser_gestes(l6, "a, ce qu'elle monte", {0: lambda: ok(l6), 6: lambda: [GrowArrow(h), GrowArrow(v)]})
        l7 = self.lf("pour un pas vers la droite.", y[7], fs, x0=x0)
        self.poser_gestes(l7, "pour un pas vers la droite.", {2: lambda: [Indicate(h, color=JAUNE_TITRE)]})
        self.verifier(r, "07-finale", lignes=[d])
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_community()
        self.ecran_image()
        self.ecran_antecedent()
        self.ecran_question1()
        self.ecran_expression()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="08-abonne")
