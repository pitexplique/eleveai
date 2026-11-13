# suite_algorithme.py
# EleveAI — Maths 1re spé (programme 2026) — paysage « Suites et Python : lire
# un programme » (16:9), ceinture VERTE. Série SUITES, épisode 20.
# Micro du coach : suite_algorithme (lib/tutor-v4/questionBank/premiere-spe/maths/
# suites.bank.ts + suites-renfort.ts : « python » (genAlgoFor, genAlgoWhile),
# « algoTerme », « algoQuelleSuite », « algoCompleter »).
#
# Ce que demande le coach → écran :
#   · lire « u = 3 / for i in range(K): u = … / print(u) » (même écriture
#     que le coach, sur une ligne)                                 → 02, 05-question ;
#   · range(K) fait K tours ; range(a, b) fait b − a tours        → 03, 09-question ;
#   · la 1re ligne donne u₀, la boucle donne uₙ₊₁ (quelle suite ?) → 03-range ;
#   · suivre u tour après tour, le terme affiché (u₄)              → 04-tours ;
#   · while : répéter TANT QUE la condition est vraie, n compte    → 06, 07, 10 ;
#   · le piège : print(n) affiche un RANG, pas une valeur          → 08-piege.
# Clé de voix → écran :
#   00-garde (l'éditeur, la boucle qui tourne) · 01 Maxime, développeur (IA) :
#   version 0 = 3 h, × 2 puis + 1 h · 02 le programme, ligne à ligne, et sa
#   lecture en français · 03 range(4) : 4 tours ; u₀ = 3, uₙ₊₁ = 2uₙ + 1 ·
#   04 3, 7, 15, 31, 63 → affiche 63 = u₄ · 05/05b question (C : −1) ·
#   06 la boucle while · 07 les barres 3 → 127, le seuil 100, 5 tours ·
#   08 le piège : n, pas u · 09/09b question (B : u₅) · 10/10b défi (1, 3, 9,
#   27, 81 → 4) · 11 « Ce que tu as appris » · 12 fin.
# Code couleur (module commun) : bleu = u (les termes), orange = les tours et
# le passage d'un terme au suivant, vert = juste, rouge = piège ; violet = le
# RANG n (comme les ép. 17 et 18). Le code : police Consolas (REGLES.md, 20/10),
# mots-clés roses, range et print jaunes.
# Voix : manim/voix/premiere-spe-suite-algorithme.json (débit −6), calée mot à
# mot par suite_algorithme_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_algorithme.py SuiteAlgorithme1reSpe -o eleveai-maths-premiere-spe-suite-algorithme --media_dir manim/scripts/premiere/media-suite-algorithme
# Sortie : manim/sorties/premiere-spe/maths/suites/20-algorithme/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import EXPOSANTS, OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter import SuiteGeoInterpreter1re as _E16  # noqa: E402  (ép. 16 : calc, boutons_ligne)


# ── les affirmations de la voix, vérifiées en Python ───────────────────────

def boucle_for(u, debut, fin, f):
    vus = [u]
    for _ in range(debut, fin):
        u = f(u)
        vus.append(u)
    return vus


def boucle_while(u, seuil, f):
    vus, n = [u], 0
    while u < seuil:
        u = f(u)
        n = n + 1
        vus.append(u)
    return vus, n


assert boucle_for(3, 0, 4, lambda u: 2 * u + 1) == [3, 7, 15, 31, 63]           # 04 : affiche 63 = u₄
assert boucle_for(5, 0, 3, lambda u: u - 2) == [5, 3, 1, -1]                      # question 1 : C (−1)
assert len(range(2, 7)) == 5 and boucle_for(3, 2, 7, lambda u: 2 * u + 1)[-1] == boucle_for(3, 0, 5, lambda u: 2 * u + 1)[-1]  # question 2 : B (u₅)
assert boucle_while(3, 100, lambda u: 2 * u + 1) == ([3, 7, 15, 31, 63, 127], 5)  # 07 : affiche 5
assert boucle_while(1, 50, lambda u: 3 * u) == ([1, 3, 9, 27, 81], 4)             # défi : 4

RANG = "#A855F7"                       # le rang n (violet, comme les ép. 17-18)
MOT_CLE, FONCTION = "#F472B6", "#FDE68A"  # for, in, while (rose) ; range, print (jaune)
FOND_CODE = "#0F172A"
PEAU, PULL, CHEVEUX = "#c68642", "#0F766E", "#2b1a0e"


def couleurs_code(ligne):
    """La couleur de chaque caractère VISIBLE d'une ligne de code (les espaces
    ne sont pas des glyphes de Text)."""
    cols = []
    for m in re.finditer(r"[A-Za-z_]+|\d+|\S", ligne):
        tok = m.group()
        c = WHITE
        if tok in ("for", "in", "while"):
            c = MOT_CLE
        elif tok in ("range", "print"):
            c = FONCTION
        elif tok == "u":
            c = TERME
        elif tok == "n":
            c = RANG
        cols += [c] * len(tok)
    return cols


class Programme(VGroup):
    """Un programme Python dans une fenêtre d'éditeur : police Consolas,
    l'indentation EXACTE (chaque ligne est écrite derrière un « M » caché qui
    fixe la marge et la ligne de base, puis retiré), numéros de ligne en gris
    (numeros : un texte par ligne, "" = pas de numéro).
    self.lignes[k] : la ligne k (Text) ; self.glyphes(k, a, b) : les glyphes des
    caractères a à b ; self.yc[k] : le milieu de la ligne k ; self.barre(k)."""

    def __init__(self, lignes, fs=42, interligne=1.5, numeros=None, largeur=None, pad=0.32, gouttiere=0.62, **kw):
        super().__init__(**kw)
        self.textes = list(lignes)
        m = Text("M", font="Consolas", font_size=fs)
        self.cw, self.lh = m.width, m.height * interligne * 1.25
        self.lignes, self.nums, self.yc, self._num_de = VGroup(), VGroup(), [], []
        x_code = 0.0
        if numeros:
            x_code = gouttiere * fs / 42
        for k, L in enumerate(lignes):
            t = Text("M" + L, font="Consolas", font_size=fs)
            for g, c in zip(t[1:], couleurs_code(L)):
                g.set_color(c)
            t.shift(P(x_code, -k * self.lh) - t[0].get_corner(DL))
            self.yc.append(t[0].get_center()[1])
            t.remove(t[0])
            t._pas_audit = True
            self.lignes.add(t)
            if numeros and numeros[k]:
                nm = Text(numeros[k], font="Consolas", font_size=int(fs * 0.85), color=GREY_B)
                nm.move_to(P(0.2 * fs / 42, self.yc[k]))
                nm._pas_audit = True
                self.nums.add(nm)
                self._num_de.append(nm)
            else:
                self._num_de.append(None)
        corps = VGroup(self.lignes, self.nums)
        gauche = min(corps.get_left()[0], 0) - pad
        droite = max(corps.get_right()[0] + pad, gauche + (largeur or 0))
        haut_, bas_ = self.yc[0] + self.lh / 2 + 0.5, self.yc[-1] - self.lh / 2 - 0.2
        self.fond = RoundedRectangle(width=droite - gauche, height=haut_ - bas_, corner_radius=0.14,
                                     fill_color=FOND_CODE, fill_opacity=1, stroke_color=GREY_B, stroke_width=3)
        self.fond.move_to(P((gauche + droite) / 2, (haut_ + bas_) / 2))
        haut = self.fond.get_top()[1]
        self.pastilles = VGroup(*[Dot(P(self.fond.get_left()[0] + 0.26 + 0.24 * j, haut - 0.2), radius=0.06, color=c)
                               for j, c in enumerate(("#F87171", "#FBBF24", "#4ADE80"))])
        self.sep = Line(P(self.fond.get_left()[0], haut - 0.4), P(self.fond.get_right()[0], haut - 0.4),
                        stroke_color=GREY_D, stroke_width=2)
        self.cadre = VGroup(self.fond, self.pastilles, self.sep)
        self.ancres = VGroup(*[Dot(P(0, y), radius=0.001, fill_opacity=0, stroke_width=0) for y in self.yc])
        self.add(self.cadre, self.nums, self.lignes, self.ancres)

    def glyphes(self, k, a=0, b=None):
        """Les glyphes des caractères a à b (indices dans la chaîne, espaces compris)."""
        L = self.textes[k]
        b = len(L) if b is None else b
        i0, i1 = len(L[:a].replace(" ", "")), len(L[:b].replace(" ", ""))
        return VGroup(*self.lignes[k][i0:i1])

    def ycentre(self, k):
        """Le milieu de la ligne k, où que soit la fenêtre (ancre invisible)."""
        return self.ancres[k].get_center()[1]

    def barre(self, k, couleur=TERME, opacite=0.22):
        """Un surlignage de la ligne k (toute la largeur de la fenêtre)."""
        r = Rectangle(width=self.fond.width - 0.16, height=self.lh * 0.92, fill_color=couleur, fill_opacity=opacite,
                      stroke_width=0)
        return r.move_to(P(self.fond.get_center()[0], self.ycentre(k)))


# ── les dessins de l'épisode ────────────────────────────────────────────────

def maxime(s=1.0):
    """Maxime, développeur : cheveux courts, sweat vert, un casque-micro."""
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    cheveux = Sector(radius=0.29, angle=PI, start_angle=0, fill_color=CHEVEUX, fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.17))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=PULL, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    lunettes = VGroup(*[Circle(radius=0.075, stroke_color="#E2E8F0", stroke_width=3).move_to(P(x, 0.98))
                        for x in (-0.1, 0.1)])
    return VGroup(corps, tete, cheveux, lunettes).scale(s)


def reseau(s=1.0):
    """Un réseau de neurones : 3 couches de ronds reliés (l'IA qu'on entraîne)."""
    couches = [[0.55, 0, -0.55], [0.8, 0.27, -0.27, -0.8], [0.3, -0.3]]
    xs = (-1.0, 0.0, 1.0)
    ronds = [[Circle(radius=0.12, fill_color=TERME, fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to(P(x, y))
              for y in c] for x, c in zip(xs, couches)]
    liens = VGroup(*[Line(a.get_center(), b.get_center(), stroke_color=GREY_B, stroke_width=1.6, stroke_opacity=0.7)
                     for c1, c2 in zip(ronds, ronds[1:]) for a in c1 for b in c2])
    g = VGroup(liens, VGroup(*[r for c in ronds for r in c])).scale(s)
    g.liens, g.ronds = liens, g[1]
    return g


def ordinateur(s=1.0, barres=True):
    """Un ordinateur portable ; à l'écran, des lignes de code (barres de couleur)."""
    ecran = RoundedRectangle(width=2.2, height=1.4, corner_radius=0.1, fill_color=FOND_CODE, fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=4)
    base = Polygon(P(-1.35, -0.78), P(1.35, -0.78), P(1.55, -0.98), P(-1.55, -0.98), fill_color=GREY_D,
                   fill_opacity=1, stroke_width=0)
    g = VGroup(base, ecran)
    if barres:
        lignes = VGroup()
        for k, (dx, w, c) in enumerate(((0, 0.6, TERME), (0, 1.3, MOT_CLE), (0.3, 0.9, TERME), (0, 0.7, FONCTION))):
            lignes.add(RoundedRectangle(width=w, height=0.12, corner_radius=0.05, fill_color=c, fill_opacity=1,
                                        stroke_width=0).move_to(P(-0.85 + dx + w / 2, 0.42 - 0.27 * k)))
        g.add(lignes)
        g.lignes = lignes
    return g.scale(s)


def fleche_boucle(r=0.45, couleur=RAISON, sw=6):
    """La flèche qui tourne en rond (une boucle)."""
    arc = Arc(radius=r, start_angle=PI / 2, angle=-1.7 * PI, color=couleur, stroke_width=sw)
    bout = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.11 * r / 0.45)
    fin = arc.point_from_proportion(1)
    d = fin - arc.point_from_proportion(0.97)
    bout.rotate(np.arctan2(d[1], d[0]) - PI / 2).move_to(fin)
    return VGroup(arc, bout)


class OutilsAlgo:
    """Les outils de l'épisode (paysage ET short) : le programme qui s'écrit
    au fil de la voix, la ligne surlignée, l'écran de sortie (la console)."""

    def taper(self, prog, k, etapes, run_time=0.22, avec=(), num=None):
        """Écrit la ligne k morceau par morceau : etapes = [(fin, extrait), …] :
        les caractères jusqu'à la fin du texte `fin` apparaissent quand la voix
        dit `extrait` (None : tout de suite). Le reste de la ligne à la fin."""
        L, a = prog.textes[k], 0
        etapes = [e if len(e) > 2 else (e[0], e[1], ()) for e in etapes]
        nm = prog._num_de[k] if k < len(prog._num_de) else None
        if nm is not None and num:  # « Ligne 2 » : son numéro, au mot dit
            self.suivre(num)
            self.play(FadeIn(nm, scale=1.4), run_time=0.25)
            nm = None
        for j, (fin, ex, extra) in enumerate(etapes):
            b = L.index(fin, a) + len(fin)
            if ex:
                self.suivre(ex)
            g = prog.glyphes(k, a, b)
            anims = [FadeIn(g, shift=RIGHT * 0.08)] if len(g) else []
            anims += [FadeIn(m, shift=UP * 0.08) for m in extra]
            if j == 0 and nm is not None:
                anims.append(FadeIn(nm))
            self.play(*anims, *(avec if j == 0 else ()), run_time=run_time)
            a = b
        if a < len(L.rstrip()):
            self.play(FadeIn(prog.glyphes(k, a), shift=RIGHT * 0.08), run_time=run_time)

    def surligner(self, prog, k, couleur=TERME, ancien=None, run_time=0.25):
        """La ligne k se surligne (l'ancien surlignage glisse jusqu'à elle)."""
        b = prog.barre(k, couleur)
        if ancien is not None:
            self.play(Transform(ancien, b), run_time=run_time)
            return ancien
        self.bring_to_back(b)
        self.play(FadeIn(b), run_time=run_time)
        self.add(prog.cadre)
        self.bring_to_back(prog.cadre)
        return b

    def console(self, texte, fs=40, couleur=JUSTE, largeur=None):
        """L'écran de sortie : « > 63 » dans une petite fenêtre noire."""
        inv = Text(">", font="Consolas", font_size=fs, color=GREY_B)
        val = Text(texte, font="Consolas", font_size=fs, color=couleur)
        ligne = VGroup(inv, val).arrange(RIGHT, buff=0.2)
        fond = RoundedRectangle(width=max(largeur or 0, ligne.width + 0.6), height=ligne.height + 0.42,
                                corner_radius=0.1, fill_color="#020617", fill_opacity=1, stroke_color=GREY_B,
                                stroke_width=2.5)
        ligne.move_to(fond).align_to(fond.get_left() + RIGHT * 0.3, LEFT)
        g = VGroup(fond, ligne)
        g.valeur, g.invite = val, inv
        return g

    def ligne(self, morceaux, fs=44):
        """La ligne de l'ép. 12, SANS ligatures (« afficher » : le « ffi » de la
        police ne fait qu'un glyphe et décalait les couleurs)."""
        texte = ""
        for m in morceaux:
            texte += ("" if not texte or m[0][0] in EXPOSANTS else " ") + m[0]
        tx = Text(texte, font_size=fs, color=WHITE, disable_ligatures=True)
        tx._pas_audit = True
        avec_espaces = len(tx) == len(texte)  # sans ligatures, les espaces sont des glyphes
        if not avec_espaces:
            texte = texte.replace(" ", "")
        k, parts = 0, []
        for j, m in enumerate(morceaux):
            if avec_espaces and j > 0 and m[0][0] not in EXPOSANTS:
                k += 1
            mt = m[0] if avec_espaces else m[0].replace(" ", "")
            n = len(mt)
            g = VGroup(*tx[k:k + n])
            g.set_color(m[1])
            for sous, coul in (m[3] if len(m) > 3 and m[3] else {}).items():
                ss = sous if avec_espaces else sous.replace(" ", "")
                i = mt.find(ss)
                VGroup(*tx[k + i:k + i + len(ss)]).set_color(coul)
            g.original_text = m[0]
            parts.append(g)
            k += n
        assert k == len(tx), (k, len(tx), [m[0] for m in morceaux])
        return tx, parts

    def a_garder(self, garder):
        """Les objets de la scène qui appartiennent à `garder` (le programme est
        entré dans la scène glyphe par glyphe : ses morceaux restent aussi)."""
        ids = {id(f) for g in garder for f in g.get_family()}
        return [m for m in self.mobjects if id(m) in ids or (m.submobjects and all(id(x) in ids for x in m.submobjects))]

    def arc_tour(self, lg, i, couleur=RAISON, creux=0.3, cote=UP, sw=4):
        """La flèche d'un tour de boucle, de la case i à la case i + 1."""
        a, b = lg.cases[i][0], lg.cases[i + 1][0]
        bord = (lambda m: m.get_top()) if np.allclose(cote, UP) else (lambda m: m.get_bottom())
        d, f = bord(a) + 0.08 * cote, bord(b) + 0.08 * cote
        angle = 4 * np.arctan(2 * creux / max(np.linalg.norm(f - d), 0.1)) * (-1 if np.allclose(cote, UP) else 1)
        return CurvedArrow(d, f, angle=angle, color=couleur, stroke_width=sw, tip_length=0.16)

    def suivre_tours(self, lg, extraits, prog=None, k=None, a=0, b=None, cote=UP, creux=0.3, run_time=0.3):
        """u tour après tour : chaque case quand la voix dit son nombre ; à chaque
        tour, la flèche saute ET la ligne de la boucle s'allume (en même temps)."""
        fls = []
        for i, ex in enumerate(extraits):
            self.suivre(ex)
            anims = [FadeIn(lg.cases[i][0], scale=0.8), FadeIn(lg.cases[i][1], scale=1.4)]
            if len(lg.noms) > i:
                anims.append(FadeIn(lg.noms[i], shift=UP * 0.08))
            if i > 0:
                fl = self.arc_tour(lg, i - 1, cote=cote, creux=creux)
                fls.append(fl)
                anims.append(Create(fl))
                if prog is not None:
                    anims.append(Indicate(prog.glyphes(k, a, b), color=RAISON, scale_factor=1.12))
            self.play(*anims, run_time=run_time)
        return fls


class SuiteAlgorithme1reSpe(AuditMilliers, OutilsAlgo, OutilsEp12, OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_algorithme_marques.json"
    nom_voix = "premiere-spe-suite-algorithme"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "verte"
    calc = _E16.calc
    boutons_ligne = _E16.boutons_ligne

    PROG = ["u = 3", "for i in range(4): u = 2*u + 1", "print(u)"]
    WHILE = ["u = 3", "n = 0", "while u < 100:", "    u = 2*u + 1", "    n = n + 1", "print(n)"]

    def nouvel_ecran(self, cle, margo=0.5, garder=()):
        """Comme le module commun (l'ancien écran s'efface AVANT le nouveau),
        mais `garder` reste en place (le programme qu'on lit)."""
        r = self.dire(cle)
        garder = self.a_garder(garder)
        self._effacer_ancien(garder)
        self.remove(*[m for m in self.mobjects if m not in garder])
        self.add_mascotte(margo)
        return r

    def programme_for(self, lignes=None, fs=44, y=1.35, x=0.0):
        p = Programme(lignes or self.PROG, fs=fs, numeros=["1", "2", "3"])
        return p.move_to(P(x, y))

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def dessin_garde(self):
        """L'ordinateur : les lignes de code s'écrivent, la boucle tourne."""
        o = ordinateur(0.78).move_to(P(-1.3, -0.95))
        bo = fleche_boucle(0.42).move_to(P(0.8, -0.85))
        self.play(FadeIn(o[:2], shift=UP * 0.1), run_time=0.35)
        self.play(LaggedStart(*[GrowFromEdge(l, LEFT) for l in o.lignes], lag_ratio=0.3), run_time=0.7)
        self.play(Create(bo), run_time=0.4)
        self.play(Rotate(bo, -2 * PI), Indicate(o.lignes[1], color=RAISON), run_time=0.8)

    def ecran_garde(self):
        self.garde("Suites et Python",
                   [("lire un programme", "lire un programme", TERME),
                    ("Que calcule cette boucle,", "Que calcule"),
                    ("et quel terme affiche-t-elle ?", "quel terme")],
                   dessin=self.dessin_garde)

    # ── 01 : Maxime, développeur ───────────────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -4.9
        pers = maxime(1.05).move_to(P(x, 1.95))
        nom = self.t("Maxime", 44, JAUNE_TITRE).move_to(P(x, 0.8))
        met = self.t("développeur", 32, TERME).move_to(P(x, 0.15))
        self.au_mot("Maxime")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("développeur")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.3)
        ia = reseau(1.15).move_to(P(0.0, 2.0))
        lab = self.t("une intelligence artificielle", 30, GREY_A).next_to(ia, DOWN, buff=0.22)
        self.au_mot("entraîne")
        self.play(FadeIn(ia.ronds, scale=0.6), Create(ia.liens), run_time=0.6)
        self.au_mot("une intelligence")
        self.play(FadeIn(lab, shift=UP * 0.1), LaggedStart(*[Indicate(r, color=RAISON) for r in ia.ronds],
                                                           lag_ratio=0.08), run_time=0.7)
        # les heures de calcul : une barre par version
        base, k, x0 = 0.35, 0.3, 3.75
        b0 = Rectangle(width=0.6, height=3 * k, fill_color=TERME, fill_opacity=1, stroke_width=0)
        b0.move_to(P(x0, base), aligned_edge=DOWN)
        h0 = self.t("3 h", 32, TERME).next_to(b0, UP, buff=0.12)
        self.calc([("Version 0 :", WHITE, "0 de son"), ("3 heures", TERME, "3 heures"), ("de calcul", WHITE, None)],
                  -0.6, centre=-1.6, fs=40, larg=11, avec_morceau={1: [GrowFromEdge(b0, DOWN), FadeIn(h0)]})
        b1 = Rectangle(width=0.6, height=6 * k, fill_color=TERME, fill_opacity=1, stroke_width=0)
        b1.move_to(P(x0 + 1.6, base), aligned_edge=DOWN)
        b1h = Rectangle(width=0.6, height=1 * k, fill_color=RAISON, fill_opacity=1, stroke_width=0)
        b1h.next_to(b1, UP, buff=0)
        x2 = self.t("× 2", 32, RAISON, audit=False).move_to(P(x0 + 0.8, base + 0.45))
        p1 = self.t("+ 1 h", 32, RAISON).next_to(b1h, UP, buff=0.12)
        self.calc([("Nouvelle version :", WHITE, "Pour chaque nouvelle"), ("le temps × 2,", RAISON, "le temps double")],
                  -1.4, centre=-1.6, fs=40, larg=11, avec_morceau={1: [TransformFromCopy(b0, b1)]})
        self.calc([("puis + 1 h de tests", RAISON, "1 heure")], -2.1, centre=-1.6, fs=40, larg=11,
                  avec_morceau={0: [GrowFromEdge(b1h, DOWN), FadeIn(p1)]})
        self.play(FadeIn(x2), run_time=0.2)
        o = ordinateur(0.6).move_to(P(4.5, -1.45))
        self.calc([("Pour prévoir :", WHITE, "Pour prévoir"), ("un programme Python", JAUNE_TITRE, "un programme Python")],
                  -2.9, centre=-0.6, fs=40, larg=10.4, avec_morceau={1: [FadeIn(o, shift=UP * 0.1)]})
        self.play(LaggedStart(*[Indicate(l, color=WHITE) for l in o.lignes], lag_ratio=0.2), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 02 : le programme, ligne à ligne, et sa lecture ────────────────────

    def ecran_programme(self):
        self.nouvel_ecran("02-programme")
        tit = self.titre("Le programme", JAUNE_TITRE, 46, extrait="Voici le programme", y=3.25)
        prog = self.programme_for()
        self.play(FadeIn(prog.cadre), run_time=0.3)
        fs, xg = 36, -6.1
        t1, p1 = self.ligne([("u prend la valeur", WHITE, None, {"u": TERME}), ("3", TERME)], fs)
        t2, p2 = self.ligne([("pour i allant de", WHITE), ("0", RAISON), ("à", WHITE), ("3,", RAISON),
                             ("u prend la valeur", WHITE, None, {"u": TERME}), ("2u", WHITE, None, {"u": TERME}),
                             ("+ 1", WHITE)], fs)
        t3, p3 = self.ligne([("afficher", WHITE), ("u", TERME)], fs)
        for t, y in ((t1, -0.55), (t2, -1.4), (t3, -2.25)):
            if t.width > 11.6:
                t.scale_to_fit_width(11.6)
            t.move_to(P(0, y)).align_to(P(xg, 0), LEFT)
        self.taper(prog, 0, [("u =", "u prend", [p1[0]]), ("3", "3", [p1[1]])], num="Ligne 1")
        self.taper(prog, 1, [("for i in range(4):", "pour i allant", [p2[0]]), ("", "0", [p2[1]]),
                             ("", "à 3", [p2[2], p2[3]]), ("u =", "u prend", [p2[4]]), ("2*u", "2 u", [p2[5]]),
                             ("+ 1", "plus 1", [p2[6]])], num="Ligne 2")
        self.taper(prog, 2, [("print(u)", "afficher", list(p3))], num="Ligne 3")
        self.attendre_voix(marge=0.5)
        self._prog, self._tit = prog, tit

    # ── 03 : range(4) fait 4 tours ; la suite calculée ─────────────────────

    def ecran_range(self):
        prog, tit = self._prog, self._tit
        self.nouvel_ecran("03-range", garder=(prog, tit))
        g_rng, g_corps, g_u0 = prog.glyphes(1, 9, 17), prog.glyphes(1, 19), prog.glyphes(0)
        boucles = VGroup(*[fleche_boucle(0.26, sw=5) for _ in range(4)]).arrange(RIGHT, buff=0.3).move_to(P(4.15, -0.4))
        a = self.calc([("range(4)", FONCTION, "range de 4"), ("donne", WHITE, "donne"), ("i = 0,", WHITE, "0"),
                       ("1,", WHITE, "1"), ("2", WHITE, "2"), ("et 3", WHITE, "et 3")], -0.45, centre=-1.85, fs=40,
                      larg=8.2, avec_morceau={0: [Indicate(g_rng, color=FONCTION, scale_factor=1.15)],
                                              2: [Create(boucles[0])], 3: [Create(boucles[1])],
                                              4: [Create(boucles[2])], 5: [Create(boucles[3])]})
        q = self.t("4 tours", 40, RAISON).next_to(boucles, DOWN, buff=0.25)
        self.au_mot("4 tours")
        self.play(FadeIn(q, scale=1.3), LaggedStart(*[Rotate(b, -2 * PI) for b in boucles], lag_ratio=0.2),
                  run_time=0.8)
        self.calc([("Chaque tour :", WHITE, "Chaque tour"), ("uₙ", TERME, "u indice n à"), ("→", RAISON, None),
                   ("uₙ₊₁", TERME, "u indice n plus 1")], -1.55, centre=-1.6, fs=44, larg=8,
                  avec_morceau={0: [Indicate(g_corps, color=RAISON, scale_factor=1.12)]})
        c = self.calc([("La suite :", JAUNE_TITRE, "calcule la suite"), ("u₀ =", TERME, "u indice 0"), ("3", WHITE, "3"),
                       ("et", WHITE, "et"), ("uₙ₊₁ =", TERME, "u indice n plus 1 égale"),
                       ("2uₙ", WHITE, "2 u indice n", {"uₙ": TERME}), ("+ 1", WHITE, "plus 1")], -2.7, centre=-0.7,
                      fs=46, larg=10.6, avec_morceau={1: [Indicate(g_u0, color=TERME, scale_factor=1.15)],
                                                      4: [Indicate(g_corps, color=TERME, scale_factor=1.12)]})
        self.play(c[0].animate.shift(LEFT * 0.3), Create(self.encadre(VGroup(*c[1:]), JUSTE, 0.16)), run_time=0.35)
        self.attendre_voix(marge=0.5)

    # ── 04 : tour après tour : 3, 7, 15, 31, 63 → u₄ ───────────────────────

    def ecran_tours(self):
        prog, tit = self._prog, self._tit
        self.nouvel_ecran("04-tours", garder=(prog, tit))
        vals = ["3", "7", "15", "31", "63"]
        lg = LigneTermes(vals, centre=P(-0.8, -1.2), pas=2.2, largeur=1.3, hauteur=0.85, fs=44,
                         noms=[u(k) for k in range(5)], fs_noms=34)
        self.au_mot("Suivons u")
        self.play(Indicate(prog.glyphes(0), color=TERME, scale_factor=1.15), run_time=0.4)
        self.suivre_tours(lg, vals, prog, 1, 19)
        aff = self.calc([("Le programme affiche", WHITE, "Le programme affiche")], -2.7, centre=-3.4, fs=40, larg=6.6)
        co = self.console("63", 44).next_to(aff, RIGHT, buff=0.35)
        self.suivre("63")
        self.play(FadeIn(co, scale=1.2), Indicate(prog.glyphes(2), color=FONCTION, scale_factor=1.15), run_time=0.35)
        eg = self.calc([("= u₄", TERME, "u indice 4")], -2.7, x=co.get_right()[0] + 0.3, fs=44, larg=3)
        self.play(*self.allumer_cases(lg, [4]), Indicate(lg.noms[4], color=JUSTE, scale_factor=1.3), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 05 : question-pause n° 1 : u = 5, 3 tours de u − 2 → C (−1) ────────

    def ecran_question1(self):
        cartes = self.boutons_ligne(["1", "3", "−1"], y=-1.3)
        prog = Programme(["u = 5", "for i in range(3): u = u - 2", "print(u)"], fs=40).move_to(P(0, 1.45))
        qa = self.t("Qu'affiche le programme ?", 44).move_to(P(0, -0.3))

        def e1():
            self.au_mot("On change")
            self.play(FadeIn(prog.cadre), run_time=0.3)
            self.taper(prog, 0, [("u =", "u prend"), ("5", "5")])
            self.taper(prog, 1, [("for i in range(3):", "pour i allant"), ("u =", "u prend"), ("u - 2", "u moins 2")])
            self.taper(prog, 2, [("print(u)", "Qu'affiche", [qa])])

        q = self.question_libre("05-question", [e1], cartes, P(0, -2.45))
        self.dire("05b-reponse")
        self.au_mot("Réponse C")
        self.q_reponse(q, 2)
        lg = LigneTermes(["5", "3", "1", "−1"], centre=P(0.6, -2.45), pas=1.9, largeur=1.15, hauteur=0.8, fs=42)
        self.calc([("3 tours :", RAISON, "3 tours")], -2.45, centre=-4.3, fs=42, larg=3)
        self.suivre_tours(lg, ["5", "3", "1", "moins 1"], prog, 1, 19, cote=DOWN, creux=0.22)
        self.play(*self.allumer_cases(lg, [3]), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 06 : la boucle « tant que » (while) ────────────────────────────────

    def ecran_while(self):
        self.nouvel_ecran("06-while")
        self.calc([("À partir de quelle version", WHITE, "à partir de quelle version")], 3.12, centre=0, fs=40, larg=12)
        self.calc([("le calcul dépasse-t-il", WHITE, "le calcul dépasse"), ("100 heures ?", TERME, "100")], 2.48,
                  centre=0, fs=40, larg=12)
        prog = Programme(self.WHILE, fs=44).move_to(P(-3.58, -0.45))
        xg = prog.glyphes(3)[0].get_left()[0] - 0.3
        guide = DashedLine(P(xg, prog.ycentre(3) + 0.3), P(xg, prog.ycentre(4) - 0.3), color=RAISON,
                           stroke_width=3, dash_length=0.08)
        fs, x0, dx = 36, -0.22, 0.45
        tr = [self.ligne(m, fs) for m in (
            [("u prend la valeur", WHITE, None, {"u": TERME}), ("3", TERME)],
            [("n prend la valeur", WHITE, None, {"n": RANG}), ("0", RANG)],
            [("tant que", MOT_CLE), ("u <", WHITE, None, {"u": TERME}), ("100 :", WHITE)],
            [("u prend la valeur", WHITE, None, {"u": TERME}), ("2u", WHITE, None, {"u": TERME}), ("+ 1", WHITE)],
            [("n prend la valeur", WHITE, None, {"n": RANG}), ("n + 1", WHITE, None, {"n": RANG})],
            [("afficher", WHITE), ("n", RANG)])]
        for k, (t, _) in enumerate(tr):
            t.move_to(P(0, prog.ycentre(k))).align_to(P(x0 + (dx if k in (3, 4) else 0), 0), LEFT)
        acc = Line(P(x0 + 0.25, prog.ycentre(3) + 0.28), P(x0 + 0.25, prog.ycentre(4) - 0.28), color=RAISON,
                   stroke_width=4)
        self.au_mot("Il écrit")
        self.play(FadeIn(prog.cadre), run_time=0.3)
        p = [x[1] for x in tr]
        self.taper(prog, 0, [("u =", "u prend", [p[0][0]]), ("3", "3", [p[0][1]])])
        self.taper(prog, 1, [("n =", "n prend", [p[1][0]]), ("0", "0", [p[1][1]])])
        self.taper(prog, 2, [("while u <", "Tant que u", [p[2][0], p[2][1]]), ("100:", "100", [p[2][2]])])
        self.taper(prog, 3, [("u =", "u prend", [p[3][0]]), ("2*u", "2 u", [p[3][1]]), ("+ 1", "plus 1", [p[3][2]])],
                   avec=[Create(guide), Create(acc)])
        self.taper(prog, 4, [("n =", "n prend", [p[4][0]]), ("n + 1", "n plus 1", [p[4][1]])])
        self.taper(prog, 5, [("print(n)", "afficher n", list(p[5]))])
        self.play(Indicate(VGroup(prog.lignes[3], prog.lignes[4]), color=RAISON, scale_factor=1.06), run_time=0.5)
        self.attendre_voix(marge=0.5)
        self._while = prog

    # ── 07 et 10b : le suivi de la boucle en barres, le seuil ──────────────

    def suivi_while(self, prog, vals, seuil, x0=-0.9, y_haut=2.95, pas=0.56, lmax=4.2):
        """Les valeurs de u en barres (une par tour) ; le seuil en pointillés ; les
        tours comptés ; « Le programme affiche n » (+ la console)."""
        k = lmax / max(vals)
        ys = [y_haut - i * pas for i in range(len(vals))]
        bars = [Rectangle(width=max(k * v, 0.07), height=0.4, fill_color=TERME, fill_opacity=1, stroke_width=0)
                .move_to(P(x0, y), aligned_edge=LEFT) for v, y in zip(vals, ys)]
        labs = [self.t(fr(v), 32, WHITE).next_to(b, RIGHT, buff=0.14) for v, b in zip(vals, bars)]
        fls = [CurvedArrow(P(x0 - 0.3, ys[i] - 0.02), P(x0 - 0.3, ys[i + 1] + 0.02), angle=PI * 0.8, color=GREY_B,
                           stroke_width=4.5, tip_length=0.16) for i in range(len(vals) - 1)]
        corps = VGroup(prog.lignes[3], prog.lignes[4])
        for i, v in enumerate(vals):
            self.suivre(fr(v))
            anims = [GrowFromEdge(bars[i], LEFT), FadeIn(labs[i], shift=RIGHT * 0.1)]
            if i > 0:
                anims += [Create(fls[i - 1]), Indicate(corps, color=RAISON, scale_factor=1.06)]
            self.play(*anims, run_time=0.22)
        xs = x0 + k * seuil
        ligne_s = DashedLine(P(xs, ys[0] + 0.38), P(xs, ys[-1] - 0.3), color=RAISON, stroke_width=3, dash_length=0.1)
        lab_s = self.t(fr(seuil), 30, RAISON).next_to(ligne_s, UP, buff=0.08)
        n = len(vals) - 1
        self.calc([(fr(vals[-1]), PIEGE, fr(vals[-1])), ("n'est plus <", WHITE, "n'est plus"), (fr(seuil), WHITE, fr(seuil)),
                   (": la boucle s'arrête", WHITE, "la boucle s'arrête"), ("après", WHITE, "après"),
                   (f"{n} tours", RAISON, f"{n} tours")], -0.95, centre=-0.5, fs=38, larg=11.6,
                  avec_morceau={0: [bars[-1].animate.set_fill(PIEGE), labs[-1].animate.set_color(PIEGE)],
                                2: [Create(ligne_s), FadeIn(lab_s)],
                                5: [LaggedStart(*[f.animate.set_color(RAISON) for f in fls], lag_ratio=0.5)]})
        aff = self.calc([("Le programme affiche", WHITE, "Le programme affiche")], -1.9, centre=-3.3, fs=40, larg=6.6)
        co = self.console(str(n), 44, RANG).next_to(aff, RIGHT, buff=0.35)
        self.suivre(str(n))
        self.play(FadeIn(co, scale=1.2), Indicate(prog.lignes[5], color=FONCTION, scale_factor=1.15), run_time=0.35)
        return co

    def ecran_while_tours(self):
        prog = self._while
        self.nouvel_ecran("07-while-tours", garder=(prog,))
        self.play(prog.animate.scale(0.74).to_corner(UL, buff=0.45), run_time=0.45)
        self.suivi_while(prog, [3, 7, 15, 31, 63, 127], 100, y_haut=2.75)
        self.attendre_voix(marge=0.5)

    # ── 08 : le piège : print(n) affiche un RANG ───────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("08-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège", y=3.2)
        pr = Programme(["print(n)"], fs=60).move_to(P(-4.4, 1.75))
        self.calc([("Ce programme affiche", WHITE, "Ce programme affiche"), ("n,", RANG, "n, pas"), ("pas", WHITE, None),
                   ("u", TERME, None)], 1.75, x=-1.8, fs=46, larg=7.7, avec_morceau={0: [FadeIn(pr)]})
        self.play(Indicate(pr.glyphes(0, 6, 7), color=RANG, scale_factor=1.6), run_time=0.45)
        rg = self.calc([("un rang :", RANG, "un rang"), ("5", JUSTE, "5")], 0.2, centre=-3.2, fs=50, larg=5.6)
        self.play(Create(self.encadre(rg, JUSTE, 0.22)), run_time=0.3)
        va = self.calc([("une valeur :", TERME, "pas une valeur"), ("127", WHITE, "127")], 0.2, centre=2.0, fs=50,
                       larg=5.6)
        self.play(Create(self.croix(va.get_right() + RIGHT * 0.65, 0.3)), va.animate.set_opacity(0.55), run_time=0.35)
        c = self.calc([("Version", WHITE, "C'est à la version"), ("5", RANG, "5"), (": le calcul dépasse", WHITE,
                       "que le calcul"), ("100 heures", TERME, "100")], -1.6, centre=-0.4, fs=44, larg=11.6)
        self.play(Create(self.encadre(c, JUSTE, 0.18)), run_time=0.35)
        self.attendre_voix(marge=0.5)

    # ── 09 : question-pause n° 2 : range(2, 7) → B (u₅) ────────────────────

    def ecran_question2(self):
        corps = [self.morceaux([(f"u{c}", TERME, n)], fs=64) for c, n in (("₆", "6"), ("₅", "5"), ("₇", "7"))]
        cartes = VGroup(*[self.bouton(L, c, 3.3, 52) for L, c in zip("ABC", corps)])
        for c, dx in zip(cartes, (-3.6, 0, 3.6)):
            c.move_to(P(dx, -1.3))
        prog = Programme(["u = 3", "for i in range(2, 7): u = 2*u + 1", "print(u)"], fs=40).move_to(P(0, 1.45))
        qa = self.t("Quel terme de la suite le programme affiche-t-il ?", 40).move_to(P(0, -0.3))

        def e1():
            self.play(FadeIn(prog.cadre), run_time=0.3)
            self.taper(prog, 0, [("u =", "u prend"), ("3", "3")])
            self.taper(prog, 1, [("for i in range(2, 7):", "pour i allant"), ("u =", "u prend"), ("2*u", "2 u"),
                                 ("+ 1", "plus 1")])
            self.taper(prog, 2, [("print(u)", "Quel terme", [qa])])

        q = self.question_libre("09-question", [e1], cartes, P(0, -2.45))
        self.dire("09b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        boucles = VGroup(*[fleche_boucle(0.2, sw=4) for _ in range(5)]).arrange(RIGHT, buff=0.22).move_to(P(2.9, -2.3))
        self.calc([("i va de", WHITE, "i va de"), ("2", RAISON, "2"), ("à", WHITE, None), ("6", RAISON, "6"), (":", WHITE, None),
                   ("5 tours", RAISON, "5 tours")], -2.3, centre=-2.6, fs=42, larg=6.4,
                  avec_morceau={0: [Indicate(prog.glyphes(1, 9, 20), color=FONCTION, scale_factor=1.12)],
                                5: [LaggedStart(*[Create(b) for b in boucles], lag_ratio=0.25)]})
        c = self.calc([("On part de", WHITE, "On part de"), ("u₀,", TERME, "u indice 0"), ("on avance de", WHITE, "et on avance"),
                       ("5 rangs :", RAISON, "5 rangs"), ("u₅", JUSTE, "u indice 5")], -3.05, centre=-1.0, fs=40, larg=10.2)
        self.play(c[-1].animate.scale(1.55, about_edge=LEFT).shift(RIGHT * 0.16), run_time=0.25)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.12)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 10 : le défi : tant que u < 50, u = 3u ─────────────────────────────

    DEFI = ["u = 1", "n = 0", "while u < 50:", "    u = 3*u", "    n = n + 1", "print(n)"]

    def ecran_defi(self):
        self.nouvel_ecran("10-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.2)
        prog = Programme(self.DEFI, fs=44, largeur=5.6).move_to(P(-3.4, -0.1))
        qa = self.paragraphe(["Qu'affiche", "le programme ?"], 44, y=1.25, buff=0.14)
        qa.move_to(P(3.3, 1.25))
        co = self.console("?", 50, RAISON, largeur=1.8).move_to(P(3.3, -0.25))
        self.au_mot("u prend")
        self.play(FadeIn(prog.cadre), run_time=0.25)
        self.taper(prog, 0, [("u =", None), ("1", "1")])
        self.taper(prog, 1, [("n =", "n prend"), ("0", "0")])
        self.taper(prog, 2, [("while u <", "Tant que u"), ("50:", "50")])
        self.taper(prog, 3, [("u =", "u prend"), ("3*u", "3 u")])
        self.taper(prog, 4, [("n =", "n prend"), ("n + 1", "n plus 1")])
        self.taper(prog, 5, [("print(n)", "afficher n")])
        self.au_mot("Qu'affiche")
        self.play(FadeIn(qa, shift=UP * 0.1), FadeIn(co, scale=1.2), run_time=0.35)
        self.play(Indicate(co.valeur, color=RAISON, scale_factor=1.4), run_time=0.4)
        self.defi_pause(-3.05, x=-0.6)
        self._defi = (tit, prog, [qa, co])

    def ecran_correction(self):
        self.dire("10b-correction")
        tit, prog, efface = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), *[FadeOut(m) for m in efface],
                  prog.animate.scale(0.68).to_corner(UL, buff=0.45).shift(DOWN * 0.68), run_time=0.45)
        self.remove(*efface)
        self.suivi_while(prog, [1, 3, 9, 27, 81], 50, x0=-0.4, y_haut=1.9, pas=0.5, lmax=4.4)
        self.calc([("c'est le premier rang", WHITE, "c'est le premier rang"), ("n", RANG, None), ("où", WHITE, None),
                   ("uₙ", TERME, "u indice n"), ("dépasse", WHITE, "dépasse"), ("50", JUSTE, "50")], -2.85, centre=-1.0,
                  fs=40, larg=10)
        self.attendre_voix(marge=0.6)

    # ── 11 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 40
        tc = lambda s, d: Text(s, font_size=fs, color=WHITE, t2c=d)  # noqa: E731
        p1 = [tc("La première ligne donne u₀ ;", {"u₀": TERME}),
              tc("la ligne de la boucle donne", {}),
              tc("le passage au terme suivant.", {"le passage au terme suivant": RAISON})]
        p2 = [tc("range(K) fait K tours.", {"range(K)": FONCTION, "K tours": RAISON})]
        p3 = [tc("Une boucle tant que s'arrête dès que la condition", {"tant que": MOT_CLE}),
              tc("devient fausse : son compteur donne un rang.", {"un rang": RANG})]
        for l in p1 + p2 + p3:
            l._pas_audit = True
        self.finale([(p1, ["La première ligne", "la ligne de la boucle", "le passage"]), (p2, ["range de K"]),
                     (p3, ["Une boucle tant que", "devient fausse"])], cle="11-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_programme()
        self.ecran_range()
        self.ecran_tours()
        self.ecran_question1()
        self.ecran_while()
        self.ecran_while_tours()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("12-abonne")
