# proba2_faux_positifs.py
# EleveAI — Maths 2de — série « Probabilités », épisode 12 : les FAUX POSITIFS
# (micro : proba_faux_positifs), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba2_faux_positifs_short.py (ceinture orange).
# Fin de la partie « probabilités conditionnelles » de la seconde.
#
# Le fil : le portique de sécurité de l'aéroport. 1 % des bagages contiennent
# un objet interdit ; le portique sonne pour 99 % d'entre eux et pour 5 % des
# autres. P(S) = 0,0594 ; parmi les alertes, environ 1 sur 6 est vraie.
#
# Écrans : 00 garde · 01 la situation (tapis, portique, un bagage interdit
# puis un bagage normal qui sonnent) · 02 l'ARBRE I / Ī → S / S̄ construit
# branche par branche · 03 P(S) : les deux chemins vers S s'allument, leurs
# produits au bout · 04 il sonne : les deux chemins, puis le chemin I → S seul,
# 0,0099 sur 0,0594, environ 1 sur 6 · 05 pourquoi : la grille des bagages,
# 5 % des normaux s'allument · 06 le piège P_I(S) / P_S(I) · 07 défi
# (10 000 bagages) · 07b correction (594, dont 99) · 08 ce que tu as appris ·
# 09 fin (« Entraîne-toi sur eleveai.fr », « Abonne-toi ! @eleveai974 »).
#
# ⭐ Canvas du coach repris : arbre_proba (lib/canvas/ArbreProbabilitesCanvas.tsx,
# fabriqué par arbre() de la banque probabilites-conditionnelles.bank.ts) :
# carte blanche, titre « I : … · S : … » en haut, point de départ sombre,
# branches gris ardoise #475569, probabilités DÉCIMALES en bleu #2563eb au
# milieu des branches, étiquettes I, Ī, S, S̄ (nœud intérieur au-dessus /
# au-dessous, feuille à droite). Le chemin calculé s'allume (orange / violet).
# ⛔ PAS D'ÉCART : les branches S̄ restent SANS nombre (la voix ne les dit pas).
#
# Voix : manim/voix/seconde-proba-faux-positifs.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_faux_positifs.py Proba2FauxPositifs -o eleveai-maths-seconde-proba-faux-positifs --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/12-faux-positifs/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# Les couleurs du canvas du coach.
ENCRE = "#0F172A"         # slate-900 : départ, étiquettes
BRANCHE = "#475569"       # slate-600 : les branches
PROBA = "#2563EB"         # blue-600 : les probabilités des branches
BORD_CARTE = "#E2E8F0"    # slate-200
CHEMIN = "#F59E0B"        # le chemin I → S (orange)
CHEMIN2 = "#7C3AED"       # le chemin Ī → S (violet)
ETEINT = 0.2
# Les dessins.
GRIS_PORT = "#94A3B8"
VOYANT_OFF = "#475569"
TAPIS = "#334155"
VALISE = "#64748B"        # un bagage normal
VALISE_I = "#DC2626"      # un bagage à objet interdit


class NotionSeconde12(Notion6e):
    identite = "Maths 2de — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── l'écriture : indices et barres, en Text (repris de terminale) ───────────

def formule(segments, fs=40, couleur=WHITE):
    """Une écriture en Text sur UNE ligne de base. `segments` : (genre, texte[,
    couleur]) ; genre « n » normal, « b » barré (Ī), « i » indice, « ib » indice barré."""
    segs = [(s[0], s[1], s[2] if len(s) > 2 else couleur) for s in segments]
    principal = "".join(t for g, t, _ in segs if g in ("n", "b"))
    T = Text(principal, font_size=fs)
    sans_blanc = [c for c in principal if c != " "]
    assert len(T) == len(sans_blanc), "ligature dans la formule"
    ref = [k for k, c in enumerate(sans_blanc) if c.isupper()]
    base = T[ref[0]].get_bottom()[1] if ref else T.get_bottom()[1]
    haut = T[ref[0]].get_top()[1] if ref else T.get_top()[1]
    groupe, k, decal, dernier = VGroup(), 0, 0.0, None
    ecart = fs / 48 * 0.04
    for g, t, c in segs:
        if g in ("n", "b"):
            n = len(t.replace(" ", ""))
            seg = VGroup(*T[k:k + n]).set_color(c)
            seg.shift(RIGHT * decal)
            k += n
            if g == "b":
                barre = Line(seg.get_left(), seg.get_right(), stroke_width=fs / 14, color=c)
                barre.move_to(P(seg.get_center()[0], haut + fs / 48 * 0.12))
                seg = VGroup(seg, barre)
            if len(seg):
                dernier = seg
            groupe.add(seg)
        else:
            petit = Text(t, font_size=int(fs * 0.62), color=c)
            x0 = (dernier.get_right()[0] if dernier is not None else T.get_left()[0]) + ecart
            petit.move_to(P(x0 + petit.width / 2, base - fs / 48 * 0.15 + petit.height / 2))
            seg = petit
            if g == "ib":
                barre = Line(petit.get_left(), petit.get_right(), stroke_width=fs / 20, color=c)
                barre.next_to(petit, UP, buff=fs / 48 * 0.05)
                seg = VGroup(petit, barre)
            decal += petit.width + 2 * ecart
            dernier = seg
            groupe.add(seg)
    return groupe


def lettre(l, barre=False, fs=40, couleur=WHITE):
    return formule([("b" if barre else "n", l, couleur)], fs)


def ecrit(s, fs=40, couleur=WHITE):
    """« P_I(S) » → formule() : « _ » met en indice le caractère suivant, « ~ » le barre."""
    segs, courant, i = [], "", 0
    while i < len(s):
        c = s[i]
        if c in "_~":
            if courant:
                segs.append(("n", courant))
                courant = ""
            indice = c == "_"
            if indice:
                i += 1
            barre = s[i] == "~"
            if barre:
                i += 1
            segs.append((("i" if indice else "") + ("b" if barre else "") or "n", s[i]))
        else:
            courant += c
        i += 1
    if courant:
        segs.append(("n", courant))
    return formule(segs, fs, couleur)


# ── les dessins : portique, tapis, valise ───────────────────────────────────

def portique(s=1.0):
    """Le portique : deux montants, une traverse, un voyant (index 3)."""
    g = Rectangle(width=0.16, height=1.6, fill_color=GRIS_PORT, fill_opacity=1, stroke_color=WHITE,
                  stroke_width=2).move_to(P(-0.75, 0))
    d = g.copy().move_to(P(0.75, 0))
    tr = Rectangle(width=1.66, height=0.26, fill_color=GRIS_PORT, fill_opacity=1, stroke_color=WHITE,
                   stroke_width=2).move_to(P(0, 0.9))
    voyant = Circle(radius=0.17, fill_color=VOYANT_OFF, fill_opacity=1, stroke_color=WHITE,
                    stroke_width=2).move_to(P(0, 1.25))
    return VGroup(g, d, tr, voyant).scale(s)


def ondes(centre, color=ROUGE_ERREUR, r=0.3):
    """Les arcs du « bip » de part et d'autre du voyant."""
    g = VGroup()
    for k in (1, 2):
        for sens in (0, PI):
            g.add(Arc(radius=r * k, start_angle=sens - 0.6, angle=1.2, color=color,
                      stroke_width=4).move_arc_center_to(centre))
    return g


def tapis(larg=6.0):
    bande = RoundedRectangle(width=larg, height=0.24, corner_radius=0.12, fill_color=TAPIS, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    rouleaux = VGroup(*[Circle(radius=0.08, stroke_color=WHITE, stroke_width=2, fill_color=TAPIS, fill_opacity=1)
                        .move_to(P(x, 0)) for x in np.linspace(-larg / 2 + 0.2, larg / 2 - 0.2, 9)])
    return VGroup(bande, rouleaux)


def valise(interdit=False, s=1.0):
    """Un bagage : corps arrondi, poignée, deux sangles. L'interdit est rouge
    et porte un « ! » blanc."""
    coul = VALISE_I if interdit else VALISE
    corps = RoundedRectangle(width=0.9, height=0.62, corner_radius=0.1, fill_color=coul, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    poignee = RoundedRectangle(width=0.36, height=0.2, corner_radius=0.06, stroke_color=WHITE,
                               stroke_width=3).move_to(corps.get_top() + UP * 0.07)
    poignee.set_fill(opacity=0)
    sangles = VGroup(*[Line(P(x, -0.31), P(x, 0.31), color=WHITE, stroke_width=2, stroke_opacity=0.6)
                       for x in (-0.24, 0.24)])
    g = VGroup(poignee, corps, sangles)   # la poignée DERRIÈRE le corps
    if interdit:
        g.add(Text("!", font_size=30, color=WHITE, weight=BOLD).move_to(corps))
    return g.scale(s)


# ── l'ARBRE pondéré du coach (arbre_proba) : I / Ī, puis S / S̄ ──────────────

FEUILLES = [("I", "S"), ("I", "nS"), ("nI", "S"), ("nI", "nS")]
VALEURS = {("I",): "0,01", ("I", "S"): "0,99", ("nI",): "0,99", ("nI", "S"): "0,05"}


class ArbreIS(VGroup):
    """La carte blanche du coach : départ, puis I / Ī, puis S / S̄.
    Un nœud = un préfixe (tuple) ; la branche d'un préfixe va de son parent à lui.
    Seuls la carte et son titre sont dans le groupe à la création : la scène fait
    apparaître les morceaux un à un (self.depart, self.branches[pre], self.lab[pre],
    self.nombre(pre))."""

    def __init__(self, dx=2.0, pas=0.95, fs=34, fs_p=26, centre=ORIGIN,
                 titre="I : objet interdit · S : sonne", fs_titre=22, valeurs=None):
        super().__init__()
        self.fs_p = fs_p
        self.valeurs = valeurs or VALEURS
        pos = {(): P(0, 0)}
        g = pas * 0.25
        for k, f in enumerate(FEUILLES):
            pos[f] = P(2 * dx, (1.5 - k) * pas + (g if k < 2 else -g))
        for a in ("I", "nI"):
            pos[(a,)] = P(dx, (pos[(a, "S")][1] + pos[(a, "nS")][1]) / 2)
        self.pos = pos
        self.depart = Dot(P(0, 0), radius=0.08, color=ENCRE)
        self.branches, self.lab, self.nombres = {}, {}, {}
        for pre, pt in pos.items():
            if not pre:
                continue
            self.branches[pre] = Line(pos[pre[:-1]], pt, color=BRANCHE, stroke_width=4)
            nom = pre[-1]
            mot = lettre(nom[-1], nom.startswith("n"), fs, ENCRE)
            if len(pre) == 1:
                # I au-dessus du nœud ; Ī au-dessous (au-dessus, la branche qui
                # arrive du départ le traverserait), un peu à gauche des branches.
                if nom == "I":
                    mot.next_to(pt, UP, buff=0.14).shift(LEFT * 0.15)
                else:
                    mot.next_to(pt, DOWN, buff=0.14).shift(LEFT * 0.15)
            else:
                mot.next_to(pt, RIGHT, buff=0.18)
            self.lab[pre] = mot
        essai = VGroup(*[self._nombre(pre, v) for pre, v in self.valeurs.items()])
        tout = VGroup(self.depart, *self.branches.values(), *self.lab.values(), essai)
        haut_titre = 0.5 if titre else 0.0
        self.carte = RoundedRectangle(width=tout.width + 0.7, height=tout.height + 0.45 + haut_titre,
                                      corner_radius=0.2, fill_color=WHITE, fill_opacity=1,
                                      stroke_color=BORD_CARTE, stroke_width=2)
        self.carte.move_to(tout).shift(UP * haut_titre / 2)
        self.titre = Text(titre, font_size=fs_titre, color=ENCRE, weight=BOLD) if titre else VGroup()
        if titre:
            if self.titre.width > self.carte.width - 0.3:
                self.titre.scale_to_fit_width(self.carte.width - 0.3)
            self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        self.add(self.carte, self.titre)
        self._tout = VGroup(self.depart, *self.branches.values(), *self.lab.values())
        dec = centre - self.carte.get_center()
        self.shift(dec)
        self._tout.shift(dec)
        self._dec = dec

    def _nombre(self, pre, texte):
        """La probabilité d'une branche, en bleu, à côté de son milieu (au-dessus
        si la branche monte, dessous si elle descend)."""
        t = Text(texte, font_size=self.fs_p, color=PROBA, weight=BOLD)
        br = self.branches[pre]
        u, v = br.get_start(), br.get_end()
        d = v - u
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if (n[1] < 0) == (v[1] >= u[1]):
            n = -n
        demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
        t.move_to((u + v) / 2 + n * (demi + 0.06))
        return t

    def nombre(self, pre):
        t = self._nombre(pre, self.valeurs[pre])
        self.nombres[pre] = t
        return t

    def complet(self, nombres=True):
        """Tout l'arbre posé d'un coup (rappel des écrans précédents)."""
        self.add(self._tout)
        if nombres:
            self.add(*[self.nombre(pre) for pre in self.valeurs])
        return self

    def point(self, pre):
        return self.branches[pre].get_end() if pre else self.depart.get_center()

    @staticmethod
    def chemin(f):
        return [f[:1], f]

    def etat(self, allumes=(), couleurs=None, op=ETEINT, rien=False):
        """Allume les branches `allumes` (couleurs : {pré: couleur}) ; estompe le reste."""
        couleurs = couleurs or {}
        allumes = set(allumes)
        anims = []
        for pre, br in self.branches.items():
            if rien:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=1))
            elif pre in allumes:
                anims.append(br.animate.set_stroke(couleurs.get(pre, CHEMIN), 10, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
        for dico in (self.lab, self.nombres):
            for pre, m in dico.items():
                on = rien or pre in allumes
                anims.append(m.animate.set_opacity(1 if on else op + 0.1))
        return anims


DEUX = {("I",): CHEMIN, ("I", "S"): CHEMIN, ("nI",): CHEMIN2, ("nI", "S"): CHEMIN2}


# ── la vidéo ────────────────────────────────────────────────────────────────

C_ARBRE = P(-3.95, -0.3)   # le centre de la carte de l'arbre
X_D = 0.85                 # le bord gauche de la zone de droite (calculs)


class Proba2FauxPositifs(NotionSeconde12):
    nom_voix = "seconde-proba-faux-positifs"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.2):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m, font_size, c)
                        for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.35, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return Line(mob.get_corner(DL) + P(-0.08, -0.04), mob.get_corner(UR) + P(0.08, 0.04),
                    stroke_width=sw, color=color)

    def gauche(self, mob, y, x0=X_D):
        return mob.move_to(P(x0 + mob.width / 2, y))

    def arbre(self, nombres=True):
        return ArbreIS(centre=C_ARBRE).complet(nombres)

    def au_bout(self, a, f, texte, color, fs=30):
        """Le produit écrit au bout du chemin f, à droite de la carte."""
        m = self.t(texte, fs, color)
        return m.move_to(P(a.carte.get_right()[0] + 0.2 + m.width / 2, a.point(f)[1]))

    def bip(self, port, color=ROUGE_ERREUR, run_time=0.35):
        """Le voyant s'allume et les ondes partent."""
        v = port[3]
        o = ondes(v.get_center(), color, r=0.28 * port.height / 1.95)
        self.play(v.animate.set_fill(color), FadeIn(o, scale=0.5), run_time=run_time)
        return o

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les faux positifs", 58, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        tp = tapis(5.0).move_to(P(-0.6, -1.05))
        port = portique(1.0).move_to(P(-0.6, 0.0))
        v = valise(False, 0.8).move_to(P(-2.6, -0.65))
        self.play(FadeIn(tp), FadeIn(port), FadeIn(v), run_time=0.5)
        self.au_mot("quand un test")
        self.play(v.animate.move_to(P(-0.6, -0.65)), run_time=0.7)
        self.bip(port)
        q = self.t("?", 72, ORANGE_RETENUE).move_to(P(1.4, 0.2))
        self.play(FadeIn(q, scale=0.5), run_time=0.3)
        self.insister(q, 0.25)
        self.attendre_voix(marge=1.0)

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("À l'aéroport")
        tp = tapis(6.2).move_to(P(-3.6, -1.35))
        port = portique(1.35).move_to(P(-3.6, -0.05))
        self.play(FadeIn(tp), FadeIn(port, shift=UP * 0.2), run_time=0.6)
        x_av, x_port, x_ap = -6.1, -3.6, -1.15
        y_v = -0.95
        self.au_mot("1 %")
        l1 = self.ligne([("1 %", JAUNE_TITRE), ("des bagages :", WHITE)], 34, 0.2)
        l1b = self.ligne([("objet interdit", VALISE_I)], 34)
        self.gauche(l1, 1.6)
        self.gauche(l1b, 0.95, X_D + 0.4)
        vi = valise(True, 0.85).move_to(P(x_av, y_v))
        self.play(FadeIn(l1, shift=RIGHT * 0.2), FadeIn(vi, shift=RIGHT * 0.3), run_time=0.5)
        self.play(FadeIn(l1b, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Le portique sonne")
        self.play(vi.animate.move_to(P(x_port, y_v)), run_time=0.6)
        o1 = self.bip(port)
        self.au_mot("99 %")
        l2 = self.ligne([("sonne pour", WHITE), ("99 %", JAUNE_TITRE)], 34, 0.2)
        l2b = self.t("d'entre eux", 30, GREY_B)
        self.gauche(l2, 0.05)
        self.gauche(l2b, -0.55, X_D + 0.4)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), FadeIn(l2b, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(l2[1], 0.3, 1.4)
        self.play(vi.animate.move_to(P(x_ap, y_v)), FadeOut(o1), port[3].animate.set_fill(VOYANT_OFF),
                  run_time=0.5)
        self.au_mot("mais aussi")
        vn = valise(False, 0.85).move_to(P(x_av, y_v))
        self.play(FadeIn(vn, shift=RIGHT * 0.3), FadeOut(vi), run_time=0.4)
        self.play(vn.animate.move_to(P(x_port, y_v)), run_time=0.6)
        self.au_mot("5 %")
        o2 = self.bip(port, ORANGE_RETENUE)
        l3 = self.ligne([("et pour", WHITE), ("5 %", JAUNE_TITRE), ("des autres", WHITE)], 34, 0.2)
        self.gauche(l3, -1.35)
        l3b = self.t("sans objet interdit", 30, GREY_B)
        self.gauche(l3b, -1.95, X_D + 0.4)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.play(FadeIn(l3b, shift=RIGHT * 0.2), run_time=0.3)
        self.insister(l3[1], 0.3, 1.4)
        self.attendre_voix()
        self.remove(o2)

    # ── 02 : l'arbre, branche par branche ───────────────────────────────────

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-arbre")
        self.titre_ecran("L'arbre")
        a = ArbreIS(centre=C_ARBRE)
        port = portique(1.1).move_to(P(3.2, 0.3))
        self.play(FadeIn(a.carte), FadeIn(a.titre), FadeIn(a.depart, scale=0.5), FadeIn(port), run_time=0.5)
        self.au_mot("I, objet interdit")
        vi = valise(True, 0.8).move_to(P(3.2, -0.45))
        self.play(Create(a.branches[("I",)]), FadeIn(vi, shift=UP * 0.2), run_time=0.4)
        self.play(FadeIn(a.lab[("I",)], scale=0.6), run_time=0.25)
        self.au_mot("0,01")
        n = a.nombre(("I",))
        self.play(FadeIn(n, scale=0.5), run_time=0.35)
        self.insister(n, 0.25, 1.4)
        self.au_mot("puis S, sonne")
        self.play(Create(a.branches[("I", "S")]), Create(a.branches[("I", "nS")]), run_time=0.4)
        self.play(FadeIn(a.lab[("I", "S")], shift=LEFT * 0.1), FadeIn(a.lab[("I", "nS")], shift=LEFT * 0.1),
                  run_time=0.3)
        o = self.bip(port)
        self.au_mot("sonne, 0,99")
        n = a.nombre(("I", "S"))
        self.play(FadeIn(n, scale=0.5), Indicate(a.lab[("I", "S")], color=CHEMIN), run_time=0.45)
        self.insister(n, 0.25, 1.4)
        self.au_mot("I barre")
        vn = valise(False, 0.8).move_to(vi)
        self.play(Create(a.branches[("nI",)]), FadeOut(vi), FadeIn(vn), FadeOut(o),
                  port[3].animate.set_fill(VOYANT_OFF), run_time=0.4)
        self.play(FadeIn(a.lab[("nI",)], scale=0.6), run_time=0.25)
        self.au_mot("barre, 0,99")
        n = a.nombre(("nI",))
        self.play(FadeIn(n, scale=0.5), run_time=0.35)
        self.insister(n, 0.25, 1.4)
        self.au_mot("puis S, 0,05")
        self.play(Create(a.branches[("nI", "S")]), Create(a.branches[("nI", "nS")]), run_time=0.4)
        self.play(FadeIn(a.lab[("nI", "S")], shift=LEFT * 0.1), FadeIn(a.lab[("nI", "nS")], shift=LEFT * 0.1),
                  run_time=0.3)
        n = a.nombre(("nI", "S"))
        self.play(FadeIn(n, scale=0.5), run_time=0.3)
        self.bip(port, ORANGE_RETENUE)
        self.insister(n, 0.25, 1.4)
        self.attendre_voix()

    # ── 03 : P(S) : les deux chemins vers S ─────────────────────────────────

    def ecran_sonne(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-sonne")
        self.titre_ecran("Le portique sonne")
        a = self.arbre()
        self.add(a)
        fs = 38
        self.au_mot("P de S")
        ps = self.ligne([("P(S)", BLEU_CALCUL), ("=", WHITE)], fs, 0.2)
        self.gauche(ps, 1.45)
        self.play(FadeIn(ps, shift=RIGHT * 0.2), run_time=0.4)
        f, g = ("I", "S"), ("nI", "S")
        self.au_mot("0,01 fois 0,99")
        self.play(*a.etat(a.chemin(f), DEUX), run_time=0.5)
        p1 = self.ligne([("0,01", WHITE), ("×", CHEMIN), ("0,99", WHITE)], fs, 0.18)
        p1.next_to(ps, RIGHT, buff=0.22)
        self.play(TransformFromCopy(a.nombres[("I",)], p1[0]), FadeIn(p1[1]),
                  TransformFromCopy(a.nombres[f], p1[2]), run_time=0.6)
        self.au_mot("plus 0,99 fois 0,05")
        self.play(*a.etat(a.chemin(f) + a.chemin(g), DEUX), run_time=0.5)
        p2 = self.ligne([("+", WHITE), ("0,99", WHITE), ("×", CHEMIN2), ("0,05", WHITE)], fs, 0.18)
        p2.next_to(p1, DOWN, buff=0.35).align_to(p1, LEFT).shift(LEFT * (p2[0].width + 0.18))
        self.play(FadeIn(p2[0]), TransformFromCopy(a.nombres[("nI",)], p2[1]), FadeIn(p2[2]),
                  TransformFromCopy(a.nombres[g], p2[3]), run_time=0.6)
        self.au_mot("0,0099 plus")
        r1 = self.ligne([("=", WHITE), ("0,0099", CHEMIN)], fs, 0.2)
        r1.next_to(p2, DOWN, buff=0.35).align_to(ps[1], LEFT)
        b1 = self.au_bout(a, f, "0,0099", CHEMIN)
        self.play(FadeIn(r1, shift=RIGHT * 0.2), FadeIn(b1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("plus 0,0495")
        r2 = self.ligne([("+", WHITE), ("0,0495", CHEMIN2)], fs, 0.2).next_to(r1, RIGHT, buff=0.2)
        b2 = self.au_bout(a, g, "0,0495", CHEMIN2)
        self.play(FadeIn(r2, shift=RIGHT * 0.2), FadeIn(b2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot(": 0,0594")
        r3 = self.ligne([("=", WHITE), ("0,0594", VERT_OK)], fs + 4, 0.2)
        r3.next_to(r1, DOWN, buff=0.4).align_to(ps[1], LEFT)
        self.play(FadeIn(r3, shift=RIGHT * 0.2), run_time=0.4)
        cad = SurroundingRectangle(r3[1], color=VERT_OK, buff=0.12)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(r3[1], cad), 0.3)
        self.attendre_voix()

    # ── 04 : il sonne : vraiment interdit ? ─────────────────────────────────

    def ecran_question(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-question")
        self.titre_ecran("Il sonne : vraiment interdit ?")
        a = self.arbre()
        f, g = ("I", "S"), ("nI", "S")
        b1 = self.au_bout(a, f, "0,0099", CHEMIN)
        b2 = self.au_bout(a, g, "0,0495", CHEMIN2)
        self.add(a, b1, b2)
        port = portique(0.75).move_to(P(X_D + 0.75, 1.55))
        self.au_mot("Le portique sonne")
        self.play(FadeIn(port), *a.etat(a.chemin(f) + a.chemin(g), DEUX), run_time=0.5)
        self.bip(port)
        self.au_mot("vraiment un objet interdit")
        q = self.ligne([("objet interdit", VALISE_I), ("?", ORANGE_RETENUE)], 38, 0.2)
        q[1].scale(1.4)
        q.next_to(port, RIGHT, buff=0.5)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Sur 0,0594")
        x_f = X_D + 1.6
        den = self.t("0,0594", 40, WHITE)
        barre = Line(LEFT * 0.95, RIGHT * 0.95, color=WHITE, stroke_width=4).move_to(P(x_f, -0.1))
        den.next_to(barre, DOWN, buff=0.15)
        self.play(Create(barre), FadeIn(den, shift=UP * 0.2), Indicate(b1, color=CHEMIN), Indicate(b2, color=CHEMIN2),
                  run_time=0.6)
        self.au_mot("seulement 0,0099")
        num = self.t("0,0099", 40, CHEMIN).next_to(barre, UP, buff=0.15)
        self.play(*a.etat(a.chemin(f), DEUX), b2.animate.set_opacity(ETEINT + 0.1), run_time=0.5)
        self.play(TransformFromCopy(b1, num), run_time=0.5)
        self.insister(num, 0.3, 1.3)
        self.au_mot("Environ 1 sur 6")
        res = self.ligne([("≈", WHITE), ("1 sur 6", VERT_OK)], 44, 0.25).next_to(barre, RIGHT, buff=0.35)
        self.play(FadeIn(res, shift=RIGHT * 0.2), run_time=0.4)
        cad = SurroundingRectangle(res[1], color=VERT_OK, buff=0.12)
        self.play(Create(cad), run_time=0.3)
        # Six alertes : une seule vraie.
        six = VGroup(*[valise(k == 0, 0.5) for k in range(6)]).arrange(RIGHT, buff=0.18)
        six.move_to(P(X_D + six.width / 2, -1.95))
        self.play(LaggedStart(*[FadeIn(v, shift=UP * 0.2) for v in six], lag_ratio=0.12), run_time=0.7)
        self.play(Indicate(six[0], color=VALISE_I, scale_factor=1.4), run_time=0.5)
        self.attendre_voix()

    # ── 05 : pourquoi si peu ? ──────────────────────────────────────────────

    def ecran_pourquoi(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-pourquoi")
        self.titre_ecran("Pourquoi si peu ?")
        a = self.arbre()
        self.add(a)
        # La grille des bagages : un seul à objet interdit, tous les autres normaux.
        grille = VGroup(*[valise(k == 33, 0.36) for k in range(100)])
        grille.arrange_in_grid(rows=10, cols=10, buff=(0.1, 0.13)).move_to(P(2.75, -0.35))
        self.au_mot("les bagages sans objet interdit")
        self.play(*a.etat([("nI",)], {("nI",): CHEMIN2}), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(v, scale=0.6) for v in grille], lag_ratio=0.01), run_time=1.0)
        self.au_mot("très nombreux")
        normaux = VGroup(*[v for k, v in enumerate(grille) if k != 33])
        self.play(Indicate(normaux, color=CHEMIN2, scale_factor=1.05), run_time=0.7)
        self.insister(a.nombres[("nI",)], 0.3, 1.5)
        self.au_mot("même 5 %")
        self.play(*a.etat(a.chemin(("nI", "S")), DEUX), run_time=0.5)
        cinq = self.t("5 %", 44, ORANGE_RETENUE).move_to(P(5.95, 0.9))
        allumees = [grille[k] for k in (7, 26, 48, 71, 89)]
        self.play(FadeIn(cinq, scale=0.5), *[v[1].animate.set_fill(ORANGE_RETENUE) for v in allumees], run_time=0.5)
        self.play(*[Flash(v, color=ORANGE_RETENUE, line_length=0.15) for v in allumees], run_time=0.5)
        self.au_mot("fausses alertes")
        fa = VGroup(self.t("fausses", 30, ORANGE_RETENUE), self.t("alertes", 30, ORANGE_RETENUE)).arrange(DOWN, buff=0.08)
        fa.next_to(cinq, DOWN, buff=0.3)
        self.play(FadeIn(fa, shift=UP * 0.15), run_time=0.4)
        self.play(Indicate(grille[33], color=VALISE_I, scale_factor=1.6), run_time=0.6)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        a = self.arbre()
        self.add(a)
        f = ("I", "S")
        self.au_mot("99 fois sur 100")
        faux = VGroup(self.t("Il sonne :", 36, ROUGE_ERREUR),
                      self.t("99 fois sur 100 ?", 36, ROUGE_ERREUR)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.gauche(faux, 1.45)
        self.play(FadeIn(faux, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("quand il sonne")
        self.play(Create(self.barrer(faux)), run_time=0.35)
        self.au_mot("99 %, c'est")
        self.play(*a.etat(a.chemin(f), DEUX), run_time=0.5)
        bon = self.ligne([("99 %", CHEMIN), ("=", WHITE)], 42, 0.22)
        self.gauche(bon, -0.2)
        self.play(FadeIn(bon, shift=RIGHT * 0.2), Indicate(a.nombres[f], color=CHEMIN, scale_factor=1.5), run_time=0.5)
        self.au_mot("P indice I de S")
        pis = ecrit("P_I(S)", 48, VERT_OK).next_to(bon, RIGHT, buff=0.25)
        self.play(TransformFromCopy(a.nombres[f], pis), run_time=0.5)
        ok = self.coche(taille=0.24).next_to(pis, RIGHT, buff=0.3)
        self.play(Create(ok), run_time=0.3)
        self.au_mot("pas P indice S de I")
        non = VGroup(self.t("pas", 40, ORANGE_RETENUE), ecrit("P_S(I)", 48, ORANGE_RETENUE)).arrange(RIGHT, buff=0.25)
        non.next_to(bon, DOWN, buff=0.6).align_to(bon, LEFT)
        self.play(FadeIn(non, shift=RIGHT * 0.2), run_time=0.45)
        self.insister(non[1], 0.3)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre()
        a.scale(0.88).shift(UP * 0.3)   # la chute « Mets pause » passe dessous
        self.play(FadeIn(a), run_time=0.5)
        self.au_mot("Sur 10 000 bagages")
        pile = VGroup(*[valise(False, 0.42) for _ in range(12)]).arrange_in_grid(rows=3, cols=4, buff=(0.1, 0.12))
        pile.move_to(P(X_D + 0.4 + pile.width / 2, 1.35))
        n = self.t("10 000 bagages", 40, JAUNE_TITRE).next_to(pile, DOWN, buff=0.3).align_to(pile, LEFT)
        self.play(LaggedStart(*[FadeIn(v, shift=DOWN * 0.2) for v in pile], lag_ratio=0.05),
                  FadeIn(n, shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("combien font sonner")
        port = portique(0.7).move_to(P(X_D + 1.1, -1.15))
        q = VGroup(self.t("combien", 40, WHITE), self.t("sonnent ?", 40, ORANGE_RETENUE))
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.15).next_to(port, RIGHT, buff=0.4)
        self.play(FadeIn(port), FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.bip(port)
        self.insister(q[1], 0.3, 1.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        a = self.arbre()
        f, g = ("I", "S"), ("nI", "S")
        self.add(a)
        self.play(*a.etat(a.chemin(f) + a.chemin(g), DEUX), run_time=0.5)
        fs = 40
        self.au_mot("0,0594 fois")
        l1 = self.ligne([("0,0594", VERT_OK), ("×", WHITE), ("10 000", JAUNE_TITRE)], fs, 0.2)
        self.gauche(l1, 1.3)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("594 bagages")
        l2 = self.ligne([("=", WHITE), ("594", VERT_OK), ("bagages", WHITE)], fs + 4, 0.22)
        self.gauche(l2, 0.25)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.45)
        cad = SurroundingRectangle(l2[1], color=VERT_OK, buff=0.12)
        self.play(Create(cad), run_time=0.3)
        port = portique(0.6).move_to(P(X_D + 0.6, -2.3))
        self.play(FadeIn(port), run_time=0.3)
        self.bip(port)
        self.au_mot("Dont seulement 99")
        self.play(*a.etat(a.chemin(f), DEUX), run_time=0.5)
        l3 = self.ligne([("dont", WHITE), ("99", CHEMIN), (": objet interdit", VALISE_I)], fs - 2, 0.22)
        self.gauche(l3, -0.95)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.45)
        self.insister(l3[1], 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 40
        l1 = self.ligne([("Sonner à tort :", WHITE), ("un faux positif", ORANGE_RETENUE)], fs, 0.2)
        l2 = VGroup(ecrit("P_I(S)", 48, CHEMIN), self.t("n'est pas", fs, WHITE),
                    ecrit("P_S(I)", 48, ORANGE_RETENUE)).arrange(RIGHT, buff=0.25)
        l3 = VGroup(self.t("Événement rare :", fs, VALISE_I),
                    self.t("la plupart des alertes sont fausses", fs, WHITE)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 10.6:
            lignes.scale_to_fit_width(10.6)
        lignes.move_to(P(-0.7, 0.75))
        for mot, l in zip(["Un test peut sonner", "P indice I de S n'est pas", "Quand l'événement est rare"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
        self.au_mot("Bravo")
        bravo = VGroup(self.t("Bravo, tu as fini", 38, VERT_OK),
                       self.t("les probabilités conditionnelles de seconde !", 34, VERT_OK)).arrange(DOWN, buff=0.15)
        bravo.move_to(P(-0.7, -2.55))
        self.play(Write(bravo), run_time=1.2)
        self.insister(bravo[0], 0.3, 1.2)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_arbre()
        self.ecran_sonne()
        self.ecran_question()
        self.ecran_pourquoi()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
