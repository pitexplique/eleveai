# suite_limite_interpreter.py
# EleveAI — Maths Terminale (spé) — paysage « Limite d'une suite : l'interpréter »
# (16:9), ceinture VERTE. Série SUITES du lycée, épisode 33.
# Micro du coach : limite_suite_interpreter (notion limite_suite) :
# lib/tutor-v4/questionBank/terminale-spe/maths/limites-suites.bank.ts + limites-suites-renfort.ts.
#
# Ce que demande le coach → écran :
#   · « tend vers 5 » = les termes se rapprochent de 5 (fixed_1, tpl_1, h1)     → 02, 04 (A) ;
#   · la définition par les intervalles ouverts (genLimDef, DEF_CONV)          → 03, 04 (A) ;
#   · le rang à partir duquel l'écart est petit (genLimRang)                   → 05 ;
#   · le tableau de la calculatrice : la limite n'est pas le dernier terme
#     affiché (genLimTableau)                                                  → 06-piege ;
#   · tendre vers +∞ : ]A ; +∞[ (fixed_2, h2, DEF_PINF), pas de limite (T_AUC)  → 07 ;
#   · une situation (capital, plat qui refroidit, parachutiste : genLimPhrase) → 01, 08 (C), 09 défi ;
#   · lire sur un nuage : les points se rapprochent de y = L (h4, genLimNuage)  → 02, 03, 07, 09b.
# Clé de voix → écran :
#   00-garde (le nuage qui monte vers 55, la bande autour de 55 qui se resserre)
#   · 01 Kévin, moniteur de parachutisme : l'élève qui saute, la jauge de vitesse
#   qui monte vite puis de moins en moins vers la vitesse limite · 02 le modèle
#   uₙ = 55 − 55 × 0,8ⁿ, la barre 0,8ⁿ qui fond, le nuage sous 55 · 03 la
#   définition : la bande ]54 ; 56[, les points qui y entrent et n'en sortent plus
#   · 04/04b question (A) · 05 le rang : écarts 1,24 (n = 17) et 0,99 (n = 18) ·
#   06 le piège : 3,2 ; 3,02 ; 3,002 sur la droite qui file vers 3 · 07 +∞ : le
#   seuil A qui monte, les points qui passent au-dessus ; puis −1, 1, −1… sans
#   limite · 08/08b question (C : +∞) et les piles de pièces · 09/09b défi du
#   chocolat (20 °C) · 10 « Ce que tu as appris » · 11 fin.
# Code couleur (module commun) : bleu = termes uₙ, orange = la bande, les écarts
# et la raison, vert = juste, rouge = piège.
# ⛔ Pas de LaTeX. Voix : manim/voix/terminale-suite-limite-interpreter.json
# (débit −6), calée mot à mot par suite_limite_interpreter_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/terminale/suite_limite_interpreter.py SuiteLimiteInterpreterTle -o eleveai-maths-terminale-suite-limite-interpreter --media_dir manim/scripts/terminale/media-suite-limite-interpreter
# Sortie : manim/sorties/terminale/maths/suites/33-limite-interpreter/

import math
import os
import re
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
V = [55 - 55 * 0.8 ** n for n in range(60)]                       # la vitesse (m/s)
assert all(v < 55 for v in V) and V[0] == 0                        # jamais 55 : la réponse A
assert round(55 * 0.8 ** 17, 2) == 1.24 and round(55 * 0.8 ** 18, 2) == 0.99
assert 55 * 0.8 ** 17 > 1 > 55 * 0.8 ** 18                         # à partir de 18 s
assert all(54 < V[n] < 56 for n in range(18, 60)) and not 54 < V[17] < 56
T = {k: 3 + 2 / k for k in (10, 100, 1000)}
assert [round(T[k], 3) for k in (10, 100, 1000)] == [3.2, 3.02, 3.002]
assert 1.05 > 1 and 500 * 1.05 ** 200 > 1e6                         # la réponse C : +∞
CHOCO = [20 + 60 * 0.9 ** n for n in range(80)]
assert CHOCO[0] == 80 and all(c > 20 for c in CHOCO) and CHOCO[79] - 20 < 0.02   # le défi : 20

PEAU, COMBI, CIEL = "#c68642", "#F97316", "#38BDF8"
INDICES = set("₀₁₂₃₄₅₆₇₈₉₊₋ₖₙₚ")
_GL = {}


def avance_morceaux(scene, textes):
    """L'audit des morceaux (construire ne passe pas par Text) : un nombre
    montré doit avoir été dit AVANT le curseur de la voix."""
    if os.environ.get("AUDIT") != "1":
        return
    serrer = lambda s: re.sub(r"(?<=\d)\s(?=\d{3}(?!\d))", "", s)  # noqa: E731  « 1 000 » → « 1000 »
    voix = serrer(scene._texte_voix)
    cur = len(serrer(scene._texte_voix[:getattr(scene, "_curseur", 0)]))
    for tx in textes:
        for nb in re.findall(r"\d+(?:,\d+)?", serrer(tx.replace("−", ""))):
            motif = r"(?<![\d,])" + re.escape(nb) + r"(?![\d]|,\d)"
            occ = [m.start() for m in re.finditer(motif, voix)]
            if not occ:
                print(f"AUDIT-ABSENT-M {scene._cle_voix} « {nb} » ({tx})", flush=True)
            elif min(occ) >= cur:
                print(f"AUDIT-AVANCE-M {scene._cle_voix} « {nb} » ({tx})", flush=True)


def nb_glyphes(mot):
    """Le nombre de glyphes d'un mot (« fi », « ffi », « fl » : une ligature)."""
    if mot not in _GL:
        _GL[mot] = len(Text(mot, font_size=30))
    return _GL[mot]


def glyphes(texte):
    """Les caractères de chaque glyphe ('?' pour les glyphes d'une ligature)."""
    out = []
    for mot in texte.split():
        n = nb_glyphes(mot)
        out += list(mot) if n == len(mot) else ["?"] * n
    return out


def grossir_indices(t, texte, k=1.3):
    """Les indices Unicode (police de secours) sortent trop petits : chacun × k,
    et la suite de la ligne glisse d'autant (les espaces restent égales)."""
    car = glyphes(texte)
    gl = t.submobjects
    if len(gl) != len(car):
        return t
    for i, c in enumerate(car):
        if c in INDICES:
            w = gl[i].width
            gl[i].scale(k, about_edge=LEFT)
            d = gl[i].width - w
            for j in range(i + 1, len(gl)):
                gl[j].shift(RIGHT * d)
    return t


class OutilsLimite:
    """Les outils des épisodes 28 à 32 (une ligne = un seul Text en morceaux)."""

    def t(self, texte, fs=36, color=WHITE, larg=None, audit=True):
        """Comme le module commun, avec les indices agrandis (× 1,3)."""
        t = grossir_indices(Text(texte, font_size=fs, color=color), texte)
        larg = larg or self.largeur_texte
        if t.width > larg:
            t.scale_to_fit_width(larg)
        if not audit:
            t._pas_audit = True
        return t

    def construire(self, morceaux, fs=40, larg=None):
        """UNE ligne = UN seul Text (espaces régulières, même ligne de base),
        coupé en morceaux colorés [(texte, couleur, extrait), …]."""
        tout = self.t(" ".join(m for m, _, _ in morceaux), fs, WHITE, larg)
        g, i = VGroup(), 0
        for m, c, _ in morceaux:
            n = len(glyphes(m))
            g.add(VGroup(*tout.submobjects[i:i + n]).set_color(c))
            i += n
        g.extraits = [ex for _, _, ex in morceaux]
        g.textes = [m for m, _, _ in morceaux]
        return g

    def montrer(self, g, avec=(), rt=0.25, avec_k=None, rt_mid=0.22):
        """Chaque morceau quand la voix dit son extrait (None : avec le précédent) ;
        avec_k = {k: [animations]} : jouées avec le morceau k."""
        avec_k = avec_k or {}
        paquet = []

        def jouer(fin=()):
            avance_morceaux(self, [g.textes[k] for k in paquet if hasattr(g, "textes")])
            anims = [FadeIn(g[k], shift=UP * 0.1) for k in paquet]
            for k in paquet:
                anims += list(avec_k.get(k, ()))
            self.play(*anims, *fin, run_time=rt if fin else rt_mid)
        for k, ex in enumerate(g.extraits):
            if ex is not None and paquet:
                jouer()
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(k)
        jouer(list(avec) or [Wait(0.01)])
        return g

    def choix(self, pieces, fs=36):
        """Le corps d'un bouton en morceaux [(texte, extrait), …] : chaque
        morceau quand la voix le dit (q_montrer_choix → montrer_liste)."""
        g = self.construire([(m, WHITE, ex) for m, ex in pieces], fs, 1e9)
        g.nombres, g.seps = list(g), [VMobject() for _ in g[1:]]
        return g

    def choix_lignes(self, lignes, fs=36):
        """Un corps de bouton sur plusieurs lignes (chaque morceau à sa voix)."""
        gs = [self.construire([(m, WHITE, ex) for m, ex in l], fs, 1e9) for l in lignes]
        g = VGroup(*gs).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        g.nombres = [m for a in gs for m in a]
        g.extraits = [e for a in gs for e in a.extraits]
        g.seps = [VMobject() for _ in g.nombres[1:]]
        return g

    def montrer_liste(self, g, extraits=None, run_time=0.18):
        return super().montrer_liste(g, extraits or getattr(g, "extraits", None), run_time)

    def rayer(self, mob, couleur=PIEGE):
        """Barré d'UN trait fin, à mi-hauteur : le texte reste lisible dessous."""
        y = mob.get_center()[1]
        return Line(P(mob.get_left()[0] - 0.08, y), P(mob.get_right()[0] + 0.08, y)).set_stroke(couleur, 4)

    def gauche(self, m, y, x=-6.2):
        return m.move_to(P(0, y)).align_to(P(x, 0), LEFT)


# ── les dessins de l'épisode ───────────────────────────────────────────────

def kevin(s=1.0):
    """Kévin, moniteur de parachutisme : casque, lunettes, combinaison orange, altimètre."""
    tete = Circle(radius=0.28, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    casque = Sector(radius=0.31, angle=PI, start_angle=0, fill_color=WHITE, fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.17))
    lunettes = RoundedRectangle(width=0.46, height=0.12, corner_radius=0.05, fill_color=CIEL, fill_opacity=1,
                                stroke_color="#0f172a", stroke_width=1.5).move_to(P(0, 1.03))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.26, fill_color=COMBI, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    sac = RoundedRectangle(width=0.22, height=0.75, corner_radius=0.08, fill_color="#334155", fill_opacity=1,
                           stroke_width=0).move_to(P(-0.55, 0.2))
    sangle = Line(P(-0.45, 0.6), P(0.35, -0.25), stroke_color="#334155", stroke_width=5)
    alti = VGroup(Circle(radius=0.1, fill_color=WHITE, fill_opacity=1, stroke_color="#334155", stroke_width=2),
                  Line(P(0, 0), P(0.06, 0.05), stroke_color=PIEGE, stroke_width=2)).move_to(P(0.5, -0.05))
    return VGroup(sac, corps, sangle, alti, tete, casque, lunettes).scale(s)


def avion(s=1.0):
    """Un petit avion de saut, vu de profil, porte ouverte."""
    corps = RoundedRectangle(width=1.9, height=0.42, corner_radius=0.2, fill_color=GREY_A, fill_opacity=1,
                             stroke_width=0)
    nez = Circle(radius=0.08, fill_color=GREY_C, fill_opacity=1, stroke_width=0).move_to(P(0.98, 0))
    aile = Polygon(P(-0.2, 0.05), P(0.35, 0.05), P(0.05, -0.55), P(-0.35, -0.55), fill_color=GREY_B,
                   fill_opacity=1, stroke_width=0)
    queue = Polygon(P(-0.95, 0.1), P(-0.7, 0.1), P(-0.95, 0.6), fill_color=GREY_B, fill_opacity=1, stroke_width=0)
    porte = Rectangle(width=0.22, height=0.28, fill_color="#0f172a", fill_opacity=1, stroke_width=0).move_to(P(-0.45, 0))
    hublots = VGroup(*[Circle(radius=0.05, fill_color=CIEL, fill_opacity=1, stroke_width=0).move_to(P(x, 0.06))
                       for x in (0.05, 0.3, 0.55)])
    return VGroup(queue, corps, aile, porte, hublots, nez).scale(s)


def sauteur(s=1.0):
    """Le parachutiste en chute libre, bras et jambes écartés (vu de face)."""
    tete = Circle(radius=0.11, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.25))
    corps = RoundedRectangle(width=0.2, height=0.34, corner_radius=0.08, fill_color=CIEL, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.0))
    membres = VGroup(*[Line(P(sx * 0.08, y0), P(sx * 0.32, y1)) for sx in (-1, 1)
                       for (y0, y1) in ((0.1, 0.28), (-0.15, -0.38))]).set_stroke(CIEL, 6)
    return VGroup(membres, corps, tete).scale(s)


def calculatrice(s=1.0):
    boite = RoundedRectangle(width=0.8, height=1.1, corner_radius=0.08, fill_color=GREY_D, fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2)
    ecran = Rectangle(width=0.62, height=0.26, fill_color="#bbf7d0", fill_opacity=1, stroke_width=0)
    ecran.move_to(boite.get_top() + DOWN * 0.24)
    touches = VGroup(*[Square(0.12, fill_color=GREY_B, fill_opacity=1, stroke_width=0)
                       .move_to(P(-0.22 + 0.22 * i, -0.08 - 0.2 * r)) for r in range(3) for i in range(3)])
    return VGroup(boite, ecran, touches).scale(s)


def tasse(s=1.0):
    """La tasse de chocolat (marron) et trois volutes de vapeur (g[-1])."""
    bol = Polygon(P(-0.55, 0.35), P(0.55, 0.35), P(0.42, -0.4), P(-0.42, -0.4), fill_color=WHITE, fill_opacity=1,
                  stroke_width=0)
    choco = Ellipse(width=1.08, height=0.2, fill_color="#7c2d12", fill_opacity=1, stroke_width=0).move_to(P(0, 0.35))
    anse = Arc(radius=0.2, start_angle=-PI / 2, angle=PI, stroke_color=WHITE, stroke_width=7).move_to(P(0.6, 0.0))
    soucoupe = Ellipse(width=1.5, height=0.2, fill_color=GREY_B, fill_opacity=1, stroke_width=0).move_to(P(0, -0.45))
    vapeur = VGroup(*[VMobject(stroke_color=GREY_A, stroke_width=4).set_points_smoothly(
        [P(x, 0.55), P(x + 0.08, 0.75), P(x - 0.06, 0.95), P(x + 0.05, 1.15)]) for x in (-0.25, 0.0, 0.25)])
    return VGroup(soucoupe, anse, bol, choco, vapeur).scale(s)


def piles(hauteurs, x0=0.0, y0=0.0, pas=0.62, ep=0.13):
    """Des piles de pièces (une pile par hauteur), de gauche à droite."""
    g = VGroup()
    for k, h in enumerate(hauteurs):
        pile = VGroup(*[Ellipse(width=0.5, height=0.16, fill_color="#EAB308", fill_opacity=1, stroke_color="#854d0e",
                                stroke_width=1.5).move_to(P(x0 + k * pas, y0 + ep * j)) for j in range(h)])
        g.add(pile)
    return g


class SuiteLimiteInterpreterTle(OutilsLimite, PaysageSuites):
    fichier_marques = "suite_limite_interpreter_marques.json"
    nom_voix = "terminale-suite-limite-interpreter"
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
    largeur_bouton = 10.6
    hauteur_bouton = 0.74
    place_coche = 1.2

    def bouton(self, lettre, corps, largeur, fs):
        """Le bouton du module, avec une marge intérieure d'au moins 20 px autour du texte."""
        b = super().bouton(lettre, corps, largeur, fs)
        cadre, ligne = b
        h = max(self.hauteur_bouton, ligne.height + 0.4)
        if cadre.height < h:
            cadre.stretch_to_fit_height(h)
            ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return b

    def ligne(self, morceaux, y, x=None, fs=40, avec=(), larg=None, avec_k=None, rt=0.25):
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k)

    def question_lignes(self, cle, groupes, choix, bonne, **kw):
        """poser_question, chaque ligne de la question en morceaux, chaque morceau à sa voix."""
        liste = [(g, None) for g in groupes]

        def dessin():
            for g in groupes:
                self.montrer(g, rt=0.22)
            liste.clear()                     # poser_question ne les remontre pas
        return self.poser_question(cle, liste, choix, bonne, dessin=dessin, **kw)

    def poser_axes(self, nu, grads=(), fs=22, rt=0.35, extra=()):
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                  *[FadeIn(nu.graduation_n(n, str(n), fs)) for n in grads], *extra, run_time=rt)

    def trait_u(self, nu, v, couleur=GREY_B, texte=None, fs=24, audit=False, x1=None):
        """Un trait horizontal pointillé à la hauteur v (et son nombre, à gauche de l'axe)."""
        y = nu.G(nu.na, v)[1]
        tr = DashedLine(P(nu.ax_u.get_center()[0], y), P(x1 if x1 is not None else nu.X1 + 0.1, y), color=couleur,
                        stroke_width=3.5, dash_length=0.1)
        g = VGroup(tr)
        if texte:
            g.add(self.t(texte, fs, couleur, audit=audit).next_to(tr, LEFT, buff=0.12))
        return g

    # ── 00 : la garde : le nuage qui monte vers 55, la bande qui se resserre ──

    def bande(self, nu, bas, haut, n0=None, n1=None, couleur=RAISON, op=0.18):
        a, b = nu.G(nu.na if n0 is None else n0, bas), nu.G(nu.nb if n1 is None else n1, haut)
        r = Rectangle(width=b[0] - a[0], height=b[1] - a[1], stroke_color=couleur, stroke_width=2,
                      fill_color=couleur, fill_opacity=op)
        return r.move_to((a + b) / 2)

    def nuage_garde(self):
        nu = NuageTermes((0, 20.5), (0, 62), P(-5.3, -1.75), P(3.4, 0.45), fs=24)
        pts = [nu.point(n, V[n], r=0.065) for n in range(21)]
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), run_time=0.35)
        self.play(LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.15), run_time=1.3)
        b = self.bande(nu, 40, 62, op=0.15)
        self.play(FadeIn(b), run_time=0.3)
        for bas, haut in ((48, 60), (51, 58.5), (53, 57)):     # la bande se resserre autour de 55
            self.play(Transform(b, self.bande(nu, bas, haut, op=0.15)), run_time=0.45)
            n0 = next(n for n in range(21) if V[n] > bas)
            self.play(*[d.animate.set_color(JUSTE) for d in pts[n0:]], run_time=0.2)

    def ecran_garde(self):
        self.garde("Limite d'une suite",
                   [("Que veut dire, vraiment,", "Que veut dire"),
                    ("« la suite tend vers 55 » ?", "55")],
                   dessin=self.nuage_garde, extrait_titre="Limite d'une suite")

    # ── 01 : Kévin, l'élève qui saute, la jauge de vitesse ─────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = kevin(1.05).move_to(P(-4.85, 1.55))
        nom = self.t("Kévin", 42, JAUNE_TITRE).next_to(perso, DOWN, buff=0.25)
        metier = VGroup(self.t("moniteur de", 32, TERME), self.t("parachutisme", 32, TERME))
        metier.arrange(DOWN, buff=0.08).next_to(nom, DOWN, buff=0.12)
        self.au_mot("Kévin")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        av = avion(1.0).move_to(P(-3.0, 2.85))
        self.au_mot("moniteur")
        self.play(FadeIn(metier, shift=UP * 0.1), FadeIn(av, shift=RIGHT * 0.4), run_time=0.45)
        # la jauge de vitesse : elle monte vite, puis de moins en moins
        XJ, YB, H = 3.3, -1.25, 3.4
        tube = RoundedRectangle(width=0.7, height=H + 0.1, corner_radius=0.15, stroke_color=GREY_B, stroke_width=3)
        tube.move_to(P(XJ, YB + H / 2))
        lv = self.t("vitesse", 30, TERME).next_to(tube, DOWN, buff=0.15)
        n_t = ValueTracker(0.0)

        def remplir():
            h = max(H * (1 - 0.8 ** n_t.get_value()), 0.02)
            return Rectangle(width=0.5, height=h, stroke_width=0, fill_color=TERME, fill_opacity=1).move_to(
                P(XJ, YB + h / 2))
        jauge = always_redraw(remplir)
        sa = sauteur(1.6).move_to(av[3].get_center())
        self.au_mot("saute")
        self.add(sa)
        self.play(av.animate.shift(RIGHT * 2.2), sa.animate.move_to(P(-0.6, 1.6)), FadeIn(tube), FadeIn(lv),
                  run_time=0.6)
        self.add(jauge)
        self.au_mot("augmente vite")
        self.play(n_t.animate.set_value(4), sa.animate.move_to(P(-0.6, 0.2)), FadeOut(av, shift=RIGHT * 1.5),
                  run_time=0.9, rate_func=linear)
        self.au_mot("de moins en moins")
        self.play(n_t.animate.set_value(9), sa.animate.move_to(P(-0.6, -0.6)), run_time=1.6, rate_func=linear)
        lim = DashedLine(P(XJ - 0.6, YB + H), P(XJ + 0.6, YB + H), color=JUSTE, stroke_width=4, dash_length=0.1)
        llim = VGroup(self.t("vitesse", 30, JUSTE), self.t("limite", 30, JUSTE)).arrange(DOWN, buff=0.06)
        llim.next_to(lim, RIGHT, buff=0.2)
        self.au_mot("vitesse limite")
        self.play(Create(lim), FadeIn(llim, shift=LEFT * 0.1), n_t.animate.set_value(14), run_time=0.8)
        q1 = self.construire([("Au bout de combien de secondes", WHITE, "au bout")], 40).move_to(P(-0.6, -2.45))
        q2 = self.construire([("est-elle presque atteinte ?", JAUNE_TITRE, "presque")], 40).move_to(P(-0.6, -3.1))
        self.montrer(q1)
        self.montrer(q2, avec_k={0: [n_t.animate.set_value(20)]})
        self.insister(q2, 1.08)
        self.attendre_voix(marge=0.5)
        jauge.clear_updaters()

    # ── 02 : le modèle : 0,8ⁿ fond, les points se rapprochent de 55 ────────

    def ecran_modele(self):
        self.nouvel_ecran("02-modele")
        x0 = -6.2
        nu = NuageTermes((0, 16.5), (0, 64), P(2.45, -2.2), P(5.8, 2.25), fs=26)
        for n in (5, 10, 15):
            nu.add(nu.graduation_n(n, str(n), 22))
        self.ligne([("On modélise", WHITE, "On modélise"), ("la vitesse", TERME, "la vitesse"),
                    ("(en m/s)", GREY_A, "mètres par seconde")], 2.75, x=x0, fs=36, larg=7.4)
        self.ligne([("après", WHITE, "après n"), ("n", TERME, None), ("secondes,", WHITE, None),
                    ("n entier naturel :", GREY_A, "entier naturel")], 2.05, x=x0, fs=36, larg=7.4)
        l55 = self.trait_u(nu, 55, GREY_B, "55", 24)
        pts = [nu.point(n, V[n], r=0.075) for n in range(17)]
        f = self.construire([("uₙ =", TERME, "u indice n"), ("55", WHITE, "55"), ("− 55", WHITE, "moins 55"),
                             ("×", WHITE, None), ("0,8ⁿ", RAISON, "0,8")], 48)
        self.gauche(f, 1.05, x0 + 0.2)
        self.montrer(f, avec_k={0: [Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                                    *[FadeIn(g) for g in nu[4:]]],
                                1: [Create(l55)],
                                4: [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.12)]})
        cad = self.encadre(f, JAUNE_TITRE, 0.18)
        self.play(Create(cad), run_time=0.3)

        # l'écart à 55 (orange) vaut 55 × 0,8ⁿ : il fond quand n grandit
        def ecart(n):
            return Line(nu.G(n, V[n]) + UP * 0.08, nu.G(n, 55), color=RAISON, stroke_width=7)
        e = ecart(0)
        self.ligne([("0,8ⁿ", RAISON, "0,8"), ("devient aussi petit qu'on veut", WHITE, "devient")], -0.1, x=x0, fs=38,
                   larg=7.4, avec_k={1: [Create(e)]})
        for n in (2, 4, 7, 10, 14):
            self.play(Transform(e, ecart(n)), run_time=0.22, rate_func=linear)
        self.ligne([("Donc", GREY_A, "Donc"), ("uₙ", TERME, None), ("se rapproche de", WHITE, "se rapproche"),
                    ("55", JUSTE, "55")], -1.15, x=x0, fs=40, larg=7.5,
                   avec_k={3: [l55.animate.set_color(JUSTE), Indicate(VGroup(*pts[10:]), color=JUSTE, scale_factor=1.4)]})
        fin = self.ligne([("la suite converge vers", JUSTE, "la suite converge"), ("55", JUSTE, "55")], -2.2,
                         x=x0 + 0.2, fs=44, larg=7.3)
        self.play(Create(self.encadre(fin, JUSTE, 0.16)), *[d.animate.set_color(JUSTE) for d in pts[10:]], run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 03 : la définition : la bande ]54 ; 56[ ────────────────────────────

    def ecran_definition(self):
        self.nouvel_ecran("03-definition")
        self.titre("La définition", JAUNE_TITRE, 46, extrait="La définition")
        self.ligne([("Tout intervalle ouvert contenant", WHITE, "tout intervalle"), ("55", RAISON, "55")], 2.3, fs=38)
        self.ligne([("contient TOUS les termes", WHITE, "contient"), ("uₙ,", TERME, "u indice n")], 1.65, fs=38)
        self.ligne([("à partir d'un certain rang.", JAUNE_TITRE, "à partir")], 1.0, fs=38)
        nu = NuageTermes((8.5, 32.5), (47, 57.2), P(-4.6, -2.95), P(3.6, -0.05), fs=24)
        for n in (10, 15, 20, 25, 30):
            nu.add(nu.graduation_n(n, str(n), 22))
        b = self.bande(nu, 54, 56, n0=8.5, n1=32.5)
        t54 = self.t("54", 26, RAISON).next_to(nu.G(8.5, 54), LEFT, buff=0.15)
        t56 = self.t("56", 26, RAISON).next_to(nu.G(8.5, 56), LEFT, buff=0.15)
        pts = {n: nu.point(n, V[n], r=0.075) for n in range(9, 33)}
        self.au_mot("Par exemple")
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                  *[FadeIn(g) for g in nu[4:]], run_time=0.35)
        self.play(LaggedStart(*[GrowFromCenter(pts[n]) for n in range(9, 25)], lag_ratio=0.1), run_time=0.9)
        self.suivre("54")
        self.play(FadeIn(b), FadeIn(t54, scale=1.3), run_time=0.3)
        self.suivre("56")
        self.play(FadeIn(t56, scale=1.3), Indicate(b, color=RAISON, scale_factor=1.03), run_time=0.35)
        rang = DashedLine(nu.G(17.5, 47), nu.G(17.5, 58.6), color=JAUNE_TITRE, stroke_width=3, dash_length=0.1)
        lr = self.t("un certain rang", 28, JAUNE_TITRE).next_to(rang, RIGHT, buff=0.15).align_to(rang, UP)
        self.au_mot("à partir", 2)
        self.play(Create(rang), FadeIn(lr), *[pts[n].animate.set_color(PIEGE) for n in range(9, 18)], run_time=0.4)
        self.play(*[pts[n].animate.set_color(JUSTE) for n in range(18, 25)], run_time=0.3)
        self.au_mot("plus aucun terme")
        self.play(LaggedStart(*[GrowFromCenter(pts[n].set_color(JUSTE)) for n in range(25, 33)], lag_ratio=0.15),
                  run_time=1.0)
        self.play(Indicate(VGroup(*[pts[n] for n in range(18, 33)]), color=JUSTE, scale_factor=1.3), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 → A (la définition) ───────────────────────

    def ecran_question1(self):
        g = self.construire([("« La suite converge vers", WHITE, "La suite converge"), ("55 »", TERME, "55"),
                             ("signifie :", WHITE, "signifie")], 40)
        q = self.question_lignes(
            "04-question", [g],
            [self.choix_lignes([[("tout intervalle ouvert", "tout intervalle"), ("contenant 55", "55")],
                                [("contient tous les termes", "contient")],
                                [("à partir d'un certain rang", "à partir")]], 38),
             self.choix([("uₙ = 55", "55"), ("à partir d'un certain rang", "à partir")], 38),
             self.choix([("uₙ < 55", "55"), ("pour tout n", "pour tout")], 38)], 0, largeur=11.0, fs=38)
        self.dire("04b-reponse")
        ok = self.q_reponse(q, 0)
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), FadeOut(q.question),
                  VGroup(q.cartes[0], ok).animate.move_to(P(0, 1.75)), run_time=0.3)
        x0 = -6.2
        nu = NuageTermes((0, 16.5), (0, 64), P(2.6, -2.75), P(5.6, 0.05), fs=24)
        l55 = self.trait_u(nu, 55, JUSTE, "55", 24)
        pts = [nu.point(n, V[n], r=0.07) for n in range(17)]
        self.ligne([("Les termes peuvent ne jamais valoir", WHITE, "Les termes"), ("55", PIEGE, "55")], 0.1, x=x0,
                   fs=38, larg=8.2, avec_k={0: [Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                                                 LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.1)],
                                            1: [Create(l55)]})
        self.ligne([("ils s'en approchent", WHITE, "ils s'en"), ("autant qu'on veut,", RAISON, "autant")], -0.75,
                   x=x0, fs=38, larg=8.2)
        b = self.bande(nu, 52.5, 57.5, op=0.2, couleur=JUSTE)
        self.ligne([("et ils y restent.", JUSTE, "et ils y")], -1.6, x=x0, fs=40,
                   avec_k={0: [FadeIn(b), *[d.animate.set_color(JUSTE) for d in pts[10:]]]})
        self.attendre_voix(marge=0.6)

    # ── 05 : le rang : l'écart passe sous 1 m/s à n = 18 ──────────────────

    def ecran_rang(self):
        self.nouvel_ecran("05-rang")
        x0 = -6.2
        nu = NuageTermes((13, 20.6), (51.5, 55.6), P(2.35, -2.0), P(5.8, 2.0), fs=26)
        g17, g18 = nu.graduation_n(17, "17", 24), nu.graduation_n(18, "18", 24)
        g17[1].shift(LEFT * 0.08)
        g18[1].shift(RIGHT * 0.08)
        l55 = self.trait_u(nu, 55, GREY_B, "55", 24)
        l54 = self.trait_u(nu, 54, RAISON, "54", 24)
        pts = {n: nu.point(n, V[n], r=0.085) for n in range(13, 21)}
        self.ligne([("Au bout de combien de secondes", WHITE, "Au bout")], 2.85, x=x0, fs=38, larg=7.4)
        self.ligne([("est-il à moins de", WHITE, "est-il"), ("1 m/s", RAISON, "1 mètre"), ("de 55 ?", WHITE, "55")],
                   2.15, x=x0, fs=38, larg=7.4,
                   avec_k={2: [Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), Create(l55)]})
        self.ligne([("On veut", WHITE, "On veut"), ("55 × 0,8ⁿ", RAISON, "55 fois 0,8"), ("< 1", WHITE, "inférieur à 1")],
                   1.2, x=x0, fs=42, avec_k={2: [Create(l54)]})
        calc = calculatrice(0.75).move_to(P(-5.8, -0.55))
        self.au_mot("À la calculatrice")
        self.play(FadeIn(calc, shift=UP * 0.1),
                  LaggedStart(*[GrowFromCenter(pts[n]) for n in range(13, 17)], lag_ratio=0.2), run_time=0.6)
        x1 = -5.1

        def ecart(n, c):
            return Line(nu.G(n, V[n]), nu.G(n, 55), color=c, stroke_width=6)
        e17, e18 = ecart(17, PIEGE), ecart(18, JUSTE)
        self.ligne([("n = 17 :", WHITE, "n égale 17"), ("écart ≈ 1,24", PIEGE, "1,24")], 0.05, x=x1, fs=40,
                   avec_k={0: [GrowFromCenter(pts[17].set_color(PIEGE)), FadeIn(g17)], 1: [Create(e17)]})
        self.ligne([("n = 18 :", WHITE, "n égale 18"), ("écart ≈ 0,99", JUSTE, "0,99")], -0.8, x=x1, fs=40,
                   avec_k={0: [GrowFromCenter(pts[18].set_color(JUSTE)), FadeIn(g18)], 1: [Create(e18)]})
        self.play(Flash(pts[18], color=JUSTE, line_length=0.15), run_time=0.4)
        f1 = self.ligne([("À partir de 18 secondes,", JUSTE, "18 secondes")], -1.85, x=x0 + 0.2, fs=40,
                        avec_k={0: [LaggedStart(*[GrowFromCenter(pts[n].set_color(JUSTE)) for n in range(19, 21)],
                                                lag_ratio=0.25)]})
        f2 = self.ligne([("presque à sa vitesse limite", JUSTE, "presque")], -2.6, x=x0 + 0.2, fs=40)
        self.play(Create(self.encadre(VGroup(f1, f2), JUSTE, 0.16)), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège : la limite n'est pas le dernier terme affiché ───────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        tit = self.t("Voilà le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        self.ligne([("La limite n'est pas", WHITE, "La limite"), ("le dernier terme affiché.", PIEGE, "le dernier")],
                   2.25, fs=40)
        self.ligne([("Pour", WHITE, "Pour u"), ("uₙ =", TERME, None), ("3", WHITE, "égale 3"), ("+ 2/n,", WHITE, "2 sur n"),
                    ("avec n ≥ 1", GREY_A, "égal à 1")], 1.4, fs=40)
        # la calculatrice (à gauche) et la droite qui file vers 3 (à droite)
        calc = calculatrice(0.8).move_to(P(-6.0, -0.25))
        carte = self.carte(4.0, 2.1, P(-3.4, -0.25))
        xa, xb, yd = 0.9, 5.9, -0.25
        X = lambda v: xa + (v - 2.96) / (3.26 - 2.96) * (xb - xa)  # noqa: E731
        droite = Line(P(xa - 0.2, yd), P(xb, yd), stroke_color=GREY_B, stroke_width=3)
        tr3 = Line(P(X(3), yd - 0.12), P(X(3), yd + 0.12), stroke_color=GREY_A, stroke_width=3)
        tr32 = Line(P(X(3.2), yd - 0.12), P(X(3.2), yd + 0.12), stroke_color=GREY_A, stroke_width=3)
        l32 = self.t("3,2", 26, GREY_A, audit=False).next_to(tr32, DOWN, buff=0.12)
        self.au_mot("une calculatrice")
        self.play(FadeIn(calc, shift=UP * 0.1), FadeIn(carte), Create(droite), FadeIn(tr32), FadeIn(tr3), run_time=0.4)
        lignes = []
        for k, (nom, val, ex_n, ex_v) in enumerate((("u₁₀ =", "3,2", "u indice 10", "3,2"),
                                                     ("u₁₀₀ =", "3,02", "u indice 100", "3,02"),
                                                     ("u₁₀₀₀ =", "3,002", "u indice 1 000", "3,002"))):
            g = self.construire([(nom, TERME, ex_n), (val, WHITE, ex_v)], 38)
            g.move_to(P(-3.4, 0.45 - 0.7 * k))
            d = Dot(P(X(T[10 ** (k + 1)]), yd), radius=0.09, color=TERME)
            self.montrer(g, avec_k={1: [GrowFromCenter(d)] + ([FadeIn(l32)] if k == 0 else [])})
            lignes.append((g, d))
        # les points se tassent vers 3, sans jamais l'atteindre
        fl = Arrow(P(X(3.12), yd + 0.55), P(X(3.0) + 0.05, yd + 0.55), buff=0, color=JUSTE, stroke_width=5,
                   tip_length=0.2)
        self.play(GrowArrow(fl), run_time=0.4)
        bar = self.rayer(lignes[2][0][1])
        l3 = self.t("3", 40, JUSTE, audit=False).next_to(tr3, DOWN, buff=0.12)
        fin = self.construire([("La limite n'est pas", WHITE, "La limite n'est pas 3"), ("3,002 :", PIEGE, ",002"),
                               ("c'est", WHITE, "c'est"), ("3", JUSTE, None)], 42)
        fin.move_to(P(-0.4, -2.0))
        self.montrer(fin, avec_k={1: [Create(bar), lignes[2][0][1].animate.set_color(PIEGE)],
                                  2: [FadeIn(l3, scale=1.3), tr3.animate.set_color(JUSTE), Flash(tr3, color=JUSTE)]})
        self.ligne([("la valeur dont les termes se rapprochent", JUSTE, "la valeur")], -2.8, x=None, fs=36)
        self.attendre_voix(marge=0.6)

    # ── 07 : tendre vers +∞ : le seuil A qui monte ; puis −1, 1, −1… ──────

    def ecran_infini(self):
        self.nouvel_ecran("07-infini")
        self.titre("Tendre vers +∞", JAUNE_TITRE, 46, extrait="Et tendre")
        x0 = -6.2
        W = [1.2 * n + 2.0 * math.sin(1.9 * n) + 2 for n in range(15)]
        rang = lambda A: next(N for N in range(16) if all(w > A for w in W[N:]))  # noqa: E731
        nu = NuageTermes((0, 14.6), (0, 23), P(2.75, -0.75), P(5.8, 2.3), fs=24)
        pts = [nu.point(n, W[n], r=0.07) for n in range(15)]
        A = ValueTracker(6.0)
        trA = always_redraw(lambda: DashedLine(P(nu.ax_u.get_center()[0], nu.G(0, A.get_value())[1]),
                                               P(nu.X1 + 0.1, nu.G(0, A.get_value())[1]), color=RAISON,
                                               stroke_width=4, dash_length=0.1))
        lA = always_redraw(lambda: self.t("A", 30, RAISON, audit=False).next_to(
            P(nu.ax_u.get_center()[0], nu.G(0, A.get_value())[1]), LEFT, buff=0.15))

        def colorer(_):
            N = rang(A.get_value())
            for n, d in enumerate(pts):
                d.set_color(JUSTE if n >= N else TERME)
        self.ligne([("Pour tout nombre", WHITE, "Pour tout"), ("A,", RAISON, None)], 2.2, x=x0, fs=38,
                   avec_k={0: [Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                               LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.08)],
                           1: [Create(trA), FadeIn(lA)]})
        self.add(trA, lA)
        self.ligne([("]A ; +∞[", RAISON, "l'intervalle"), ("contient tous les termes", WHITE, "contient")], 1.45,
                   x=x0, fs=36, larg=8.1)
        self.ligne([("à partir d'un certain rang :", WHITE, "à partir")], 0.7, x=x0, fs=38,
                   avec=[UpdateFromFunc(VGroup(*pts), colorer)])
        colorer(None)
        self.ligne([("les termes finissent par dépasser", WHITE, "les termes finissent"), ("A", RAISON, None)], -0.05,
                   x=x0, fs=36, larg=7.6)
        self.play(A.animate.set_value(13.0), UpdateFromFunc(VGroup(*pts), colorer), run_time=1.0)
        self.ligne([("et ne redescendent plus en dessous.", JUSTE, "et ne redescendent")], -0.8, x=x0, fs=36,
                   larg=7.6, avec=[A.animate.set_value(17.5), UpdateFromFunc(VGroup(*pts), colorer)], rt=1.0)
        # la suite qui saute sans cesse : −1, 1, −1, 1…
        nu2 = NuageTermes((0, 10.6), (-1.6, 1.6), P(2.75, -3.1), P(5.0, -1.45), fs=22)
        h1, hm1 = self.trait_u(nu2, 1, PIEGE, "1", 22, x1=nu2.X1), self.trait_u(nu2, -1, PIEGE, "−1", 22, x1=nu2.X1)
        p2 = [nu2.point(n, (-1) ** n, PIEGE, r=0.07).set_opacity(0) for n in range(11)]
        self.add(*p2)
        bille = Dot(p2[0].get_center(), radius=0.1, color=PIEGE)
        bille.t = 0.0

        def sauter(m, dt):
            """La bille saute de point en point (0,35 s par saut) ; chaque point s'allume à son passage."""
            m.t = min(m.t + dt / 0.35, 10.0)
            k = int(m.t)
            a, f = p2[k].get_center(), p2[min(k + 1, 10)].get_center()
            x = m.t - k
            m.move_to(a + (f - a) * x + UP * 0.25 * math.sin(PI * x))
            for j in range(k + 1):
                p2[j].set_opacity(1)
        self.ligne([("Une suite qui saute sans cesse", WHITE, "Une suite qui saute")], -1.75, x=x0, fs=36,
                   avec_k={0: [Create(nu2.ax_n), Create(nu2.ax_u), FadeIn(nu2.lab_n), FadeIn(nu2.lab_u),
                               FadeIn(bille)]})
        bille.add_updater(sauter)
        self.ligne([("entre", WHITE, "entre"), ("−1", PIEGE, "moins 1"), ("et", WHITE, None), ("1 :", PIEGE, "et 1"),
                    ("aucune limite", PIEGE, "aucune limite")], -2.5, x=x0, fs=36,
                   avec_k={1: [Create(hm1)], 3: [Create(h1)]})
        self.play(*[Indicate(d, color=PIEGE, scale_factor=1.4) for d in p2], run_time=0.5)
        self.attendre_voix(marge=0.6)
        if bille.t < 9.9:
            self.wait((10.0 - bille.t) * 0.35)
        bille.clear_updaters()
        trA.clear_updaters()
        lA.clear_updaters()

    # ── 08 : question-pause n° 2 → C (le capital tend vers +∞) ─────────────

    def ecran_question2(self):
        g1 = self.construire([("Un capital placé vaut, après", WHITE, "Un capital"), ("n", TERME, None),
                              ("années :", WHITE, None)], 38)
        g2 = self.construire([("uₙ =", TERME, "u indice n"), ("500 ×", WHITE, "500"), ("1,05ⁿ", RAISON, "1,05")], 44)
        g3 = self.construire([("Sur le long terme, la suite va :", WHITE, "Sur le long")], 38)
        q = self.question_lignes(
            "08-question", [g1, g2, g3],
            [self.choix([("converger", "converger"), ("vers 500", "500")], 36),
             self.choix([("n'avoir aucune limite", "n'avoir")], 36),
             self.choix([("tendre vers +∞", "tendre")], 36)], 2)
        self.dire("08b-reponse")
        ok = self.q_reponse(q, 2)
        y = q.question[1].get_center()[1]
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), FadeOut(q.question[1:]),
                  VGroup(q.cartes[2], ok).animate.move_to(P(0, y)), run_time=0.3)
        x0 = -6.2
        pi = piles([1, 2, 3, 5, 8, 13], x0=1.1, y0=-2.75, pas=0.7, ep=0.17)
        fl = Arrow(P(5.0, -0.4), P(5.0, 0.6), buff=0, color=JUSTE, stroke_width=6, tip_length=0.22)
        self.ligne([("1,05", RAISON, "1,05"), ("> 1", WHITE, "plus grand que 1")], y - 1.05, x=x0, fs=42,
                   avec_k={0: [LaggedStart(*[FadeIn(p, shift=UP * 0.1) for p in pi[:3]], lag_ratio=0.3)]})
        self.ligne([("donc", GREY_A, "donc"), ("1,05ⁿ", RAISON, "1,05"), ("dépasse tout nombre", WHITE, "dépasse")],
                   y - 1.95, x=x0, fs=42, avec_k={2: [LaggedStart(*[FadeIn(p, shift=UP * 0.1) for p in pi[3:]],
                                                                   lag_ratio=0.3), GrowArrow(fl)]})
        fin = self.ligne([("uₙ", TERME, "u indice n"), ("→ +∞", JUSTE, "tend vers plus")], y - 3.0, x=x0 + 0.2, fs=46)
        self.play(Create(self.encadre(fin, JUSTE, 0.16)), Indicate(pi[-1], color=JUSTE, scale_factor=1.1), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi : la tasse de chocolat qui refroidit ──────────────────

    def fumer(self, ta):
        """La vapeur ondule doucement au-dessus de la tasse."""
        ta.t = 0.0
        v0 = ta[-1].copy()

        def maj(m, dt):
            m.t += dt
            for k, (v, w) in enumerate(zip(m[-1], v0)):
                v.become(w.copy().shift(UP * 0.06 * math.sin(2.5 * m.t + k)).set_stroke(
                    opacity=0.45 + 0.4 * math.sin(1.7 * m.t + k) ** 2))
        ta.add_updater(maj)

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        x0 = -6.2
        ta = tasse(1.35).move_to(P(4.4, 0.6))
        self.ligne([("Une tasse de chocolat refroidit.", WHITE, "Une tasse")], 2.2, x=x0, fs=38,
                   avec_k={0: [FadeIn(ta, shift=UP * 0.15)]})
        self.fumer(ta)
        self.ligne([("Sa température, en degrés,", WHITE, "Sa température")], 1.45, x=x0, fs=38)
        self.ligne([("après", WHITE, "après n"), ("n", TERME, None), ("minutes :", WHITE, None)], 0.75, x=x0, fs=38)
        self.ligne([("uₙ =", TERME, "est u"), ("20 +", WHITE, "20"), ("60 ×", WHITE, "60"), ("0,9ⁿ", RAISON, "0,9")],
                   -0.15, x=x0 + 0.2, fs=48)
        self.ligne([("Vers quelle valeur tend-elle ?", JAUNE_TITRE, "Vers quelle")], -1.05, x=x0, fs=38)
        self.ligne([("Que représente cette valeur ?", JAUNE_TITRE, "Et que")], -1.75, x=x0, fs=38)
        self.defi_pause(-2.75, x=-1.2)
        self._defi = (tit, ta)

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, ta = self._defi
        ta.clear_updaters()
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        autres = [m for m in self.mobjects if m is not tit and m is not self._margo]
        self.play(*[FadeOut(m) for m in autres], ReplacementTransform(tit, cor), run_time=0.4)
        self.remove(*autres)
        x0 = -6.2
        nu = NuageTermes((0, 30.6), (0, 88), P(2.95, -1.85), P(5.8, 2.3), fs=24)
        for n in (10, 20, 30):
            nu.add(nu.graduation_n(n, str(n), 22))
        pts = [nu.point(n, CHOCO[n], r=0.065) for n in range(31)]
        l20 = self.trait_u(nu, 20, JUSTE, "20", 24)
        self.ligne([("0,9", RAISON, "0,9 est"), ("est entre", WHITE, "entre"), ("0 et 1,", WHITE, "0 et 1")], 2.25, x=x0,
                   fs=38, avec_k={0: [Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                                      *[FadeIn(g) for g in nu[4:]]]})
        self.ligne([("donc", GREY_A, "donc"), ("0,9ⁿ → 0,", RAISON, "tend vers 0")], 1.5, x=x0, fs=38,
                   avec_k={1: [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.06)]})
        self.ligne([("et", GREY_A, "et 60"), ("60 × 0,9ⁿ", RAISON, None), ("aussi.", WHITE, "aussi")], 0.75, x=x0, fs=38)
        fin = self.ligne([("La suite converge vers", JUSTE, "La suite converge"), ("20", JUSTE, "20")], -0.2,
                         x=x0 + 0.2, fs=42, avec_k={1: [Create(l20)]})
        self.play(Create(self.encadre(fin, JUSTE, 0.16)), run_time=0.3)
        self.ligne([("c'est la température de la pièce", JAUNE_TITRE, "c'est la température")], -1.15, x=x0, fs=36,
                   larg=7.9, avec_k={0: [Indicate(VGroup(*pts[15:]), color=JUSTE, scale_factor=1.4)]})
        self.ligne([("Le chocolat ne descend jamais", WHITE, "Le chocolat")], -1.95, x=x0, fs=38)
        self.ligne([("sous 20 °C :", WHITE, "20 degrés"), ("il s'en approche.", JUSTE, "il s'en approche")], -2.7,
                   x=x0, fs=38, avec_k={1: [Indicate(l20, color=JUSTE, scale_factor=1.05)]})
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        def base(l):
            """La ligne de base : le bas d'une lettre sans jambage (a, e, n, o…)."""
            gl = [m for morceau in l for m in morceau]
            car = glyphes(" ".join(l.textes))
            k = next(i for i, c in enumerate(car) if c in "acemnorsuvwxz")
            return gl[k].get_bottom()[1]
        """« Ce que tu as appris » (titre EN HAUT ET CENTRÉ), chaque ligne en morceaux."""
        J = JAUNE_TITRE
        points = [[[("Une suite converge vers", WHITE, "Une suite converge"), ("ℓ", J, None)],
                   [("si tout intervalle ouvert", WHITE, "si tout"), ("contenant", WHITE, "contenant"), ("ℓ", J, None)],
                   [("contient tous ses termes", WHITE, "contient tous")],
                   [("à partir d'un certain rang.", WHITE, "à partir")]],
                  [[("Elle tend vers", WHITE, "Elle tend"), ("+∞", J, "plus l'infini"), ("si ses termes", WHITE, "si ses")],
                   [("finissent par dépasser tout nombre.", WHITE, "finissent")]],
                  [[("La limite n'est pas", WHITE, "la limite"), ("le dernier terme calculé.", PIEGE, "le dernier")]]]
        self.nouvel_ecran("10-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, J).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        blocs = []
        for pt in points:
            lignes = VGroup(*[self.construire(l, 42, 1e9) for l in pt]).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
            # même pas entre les lignes de base (« ℓ » est plus haut que les autres lettres)
            for k, l in enumerate(lignes):
                if k:
                    l.shift(UP * (base(lignes[0]) - 0.62 * k - base(l)))
            blocs.append(VGroup(self.coche(), lignes).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if tout.width > 11.0:
            tout.scale_to_fit_width(11.0)
        if tout.height > 5.6:
            tout.scale_to_fit_height(5.6)
        tout.move_to(P(-0.8, -0.25))
        for bloc in blocs:
            for k, l in enumerate(bloc[1]):
                self.montrer(l, rt=0.3, avec_k={0: [Create(bloc[0])]} if k == 0 else None)
        self.attendre_voix(marge=0.8)

    def construct(self):
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_modele, self.ecran_definition,
                  self.ecran_question1, self.ecran_rang, self.ecran_piege, self.ecran_infini, self.ecran_question2,
                  self.ecran_defi, self.ecran_correction, self.ecran_appris, lambda: self.fin("11-abonne")]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (e == self.ecran_correction and "9" in choix.split(",")):
                e()
