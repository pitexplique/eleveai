# suite_expo_prolonger.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « La fonction
# exponentielle prolonge la suite géométrique » (16:9), ceinture VERTE.
# Série SUITES du lycée, épisode 39.
# Micro du coach : expo_fct_prolonger_suite (notion expo_fonction_lecture) :
# lib/tutor-v4/questionBank/premiere/maths/fonction-exponentielle.bank.ts
# (fixed_1, tpl_1 : « la fonction prolonge la suite », « la courbe passe
# exactement par tous les points », « elle ne coïncide qu'en x = 0 » = le leurre).
#
# Ce que demande le coach → écran :
#   · la suite ne donne des valeurs qu'aux rangs ENTIERS (tpl_1, cas 2)    → 02, 08 (A) ;
#   · la courbe de f passe EXACTEMENT par les points de la suite
#     (fixed_1, tpl_1 cas 1 et 3 ; leurres « au-dessus », « qu'en x = 0 ») → 04, 05 (B) ;
#   · ce que la fonction ajoute : les rangs non entiers (tpl_1 cas 2)      → 06, 08b ;
#   · le piège de la ligne droite (relier les points à la règle)           → 07 ;
#   · une situation concrète : la datation au carbone 14                   → 01, 03, 09 défi.
# Clé de voix → écran :
#   00-garde (les 4 points de la suite, puis la courbe qui remplit les trous)
#   · 01 Fanta, archéologue : l'os dans la fouille, la jauge de carbone 14 qui
#   tombe de 100 % à 50 %, 25 %, 12,5 % · 02 la suite : uₙ = 100 × 0,5ⁿ, raison
#   0,5, les rangs 0, 1, 2, 3 seulement · 03 le problème : l'os à 35,4 %, entre
#   deux rangs, la suite n'a rien à dire · 04 la fonction f(x) = 100 × 0,5ˣ : les
#   points, puis la courbe · 05/05b question (B : elle passe exactement par tous
#   les points ; f(0) = 100, f(1) = 50, f(2) = 25) · 06 f(1,5) ≈ 35,4 → 8 595 ans,
#   les piquets et le fil tendu · 07 le piège : la corde droite donne 37,5 %, la
#   courbe passe EN DESSOUS · 08/08b question (A : le pourcentage au bout de
#   1,5 période) · 09/09b défi : 14 325 ans → 2,5 périodes → ≈ 17,7 %
#   · 10 « Ce que tu as appris » · 11 fin.
# Code couleur (module commun) : bleu = les termes uₙ, orange = la raison 0,5 et
# les exposants, vert = juste (la fonction, la courbe), rouge = le piège.
# ⛔ Pas de LaTeX. Voix : manim/voix/premiere-suite-expo-prolonger.json (débit −6),
# calée mot à mot par suite_expo_prolonger_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_expo_prolonger.py SuiteExpoProlonger1re -o eleveai-maths-premiere-suite-expo-prolonger --media_dir manim/scripts/premiere/media-suite-expo-prolonger
# Sortie : manim/sorties/premiere/maths/suites/39-expo-prolonger/

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "terminale"))

from suites_commun import *  # noqa: E402,F403
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (« 5 730 » dit « 5 730 »)
from suite_limite_calculer import OutilsCalcul  # noqa: E402
from suite_limite_operations import VerifMargo  # noqa: E402

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
F = lambda x: 100 * 0.5 ** x                                            # noqa: E731
assert [F(n) for n in range(4)] == [100, 50, 25, 12.5]                   # 01, 02 : les 4 termes
assert round(F(1.5), 1) == 35.4 and 1.5 * 5730 == 8595                  # 06 : l'os de Fanta
assert (50 + 25) / 2 == 37.5 and F(1.5) < 37.5                          # 07 : la corde est AU-DESSUS
assert 14325 / 5730 == 2.5 and round(F(2.5), 1) == 17.7                 # 09b : le défi
assert F(0) == 100 and F(1) == 50 and F(2) == 25                        # 05b : la courbe passe par les points

PEAU, CHEVEUX = "#8d5524", "#2b1b12"
KAKI, CHAPEAU = "#8a8c5b", "#c2a76a"
TERRE = ("#5b3a1a", "#7c5329", "#a07a46")
IVOIRE = "#f1f5f9"
BOIS = "#92400e"
PIQUET = "#d4a373"            # les piquets : un bois CLAIR, lisible sur le fond noir


# ── les dessins de l'épisode ───────────────────────────────────────────────

def fanta(s=1.0):
    """Fanta, archéologue : chapeau de brousse, chemise kaki, carnet de fouille."""
    corps = RoundedRectangle(width=0.98, height=1.18, corner_radius=0.26, fill_color=KAKI, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.1))
    poche = Rectangle(width=0.26, height=0.2, fill_color="#6b6d44", fill_opacity=1, stroke_width=0).move_to(
        P(-0.26, 0.32))
    col = Polygon(P(-0.16, 0.68), P(0.16, 0.68), P(0, 0.4), fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    tresses = VGroup(*[Circle(radius=0.1, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0)
                       .move_to(P(x, 0.98)) for x in (-0.28, 0.28)])
    bord = Ellipse(width=0.92, height=0.22, fill_color=CHAPEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.2))
    calotte = RoundedRectangle(width=0.46, height=0.28, corner_radius=0.12, fill_color=CHAPEAU, fill_opacity=1,
                               stroke_width=0).move_to(P(0, 1.33))
    ruban = Rectangle(width=0.46, height=0.07, fill_color="#8a6a3b", fill_opacity=1, stroke_width=0).move_to(
        P(0, 1.22))
    carnet = VGroup(RoundedRectangle(width=0.4, height=0.5, corner_radius=0.05, fill_color="#fde68a",
                                     fill_opacity=1, stroke_color=GREY_B, stroke_width=2),
                    *[Line(P(-0.13, y), P(0.13, y), stroke_color=GREY_B, stroke_width=1.5)
                      for y in (0.12, 0.0, -0.12)]).move_to(P(0.52, 0.1)).rotate(-0.12)
    bras = Line(P(0.3, 0.42), P(0.46, 0.08), stroke_color=KAKI, stroke_width=15)
    return VGroup(corps, poche, col, tresses, tete, bord, ruban, calotte, bras, carnet).scale(s)


def truelle(s=1.0):
    """Le pictogramme du métier : la truelle et le pinceau de l'archéologue."""
    lame = Polygon(P(-0.19, 0.1), P(0.19, 0.1), P(0, -0.42), fill_color="#cbd5e1", fill_opacity=1,
                   stroke_color=GREY_B, stroke_width=2)
    manche = RoundedRectangle(width=0.11, height=0.38, corner_radius=0.05, fill_color=BOIS, fill_opacity=1,
                              stroke_width=0).move_to(P(0, 0.31))
    tr = VGroup(lame, manche)
    pinc = VGroup(RoundedRectangle(width=0.1, height=0.4, corner_radius=0.04, fill_color=BOIS, fill_opacity=1,
                                   stroke_width=0).move_to(P(0, 0.26)),
                  RoundedRectangle(width=0.17, height=0.1, corner_radius=0.03, fill_color="#94a3b8",
                                   fill_opacity=1, stroke_width=0).move_to(P(0, 0.04)),
                  Polygon(P(-0.09, 0.0), P(0.09, 0.0), P(0.06, -0.3), P(-0.06, -0.3), fill_color="#fcd34d",
                          fill_opacity=1, stroke_width=0))
    return VGroup(tr, pinc.move_to(P(0.42, 0.0))).scale(s)


def os_fossile(s=1.0, couleur=IVOIRE):
    """Un os, schématique : la barre et ses quatre têtes."""
    barre = RoundedRectangle(width=0.86, height=0.2, corner_radius=0.1, fill_color=couleur, fill_opacity=1,
                             stroke_width=0)
    tetes = VGroup(*[Circle(radius=0.13, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                     for x in (-0.44, 0.44) for y in (0.1, -0.1)])
    return VGroup(barre, tetes).scale(s)


def fouille(largeur=3.0, s=1.0):
    """La fouille : trois couches de terre et un carroyage en pointillés."""
    couches = VGroup(*[Rectangle(width=largeur, height=0.42, fill_color=c, fill_opacity=1, stroke_width=0)
                       .move_to(P(0, -0.42 * k)) for k, c in enumerate(TERRE)])
    grille = VGroup(*[DashedLine(P(x, 0.21), P(x, -1.05), color="#d6c7a1", stroke_width=1.6, dash_length=0.07)
                      for x in (-largeur / 6, largeur / 6)])
    return VGroup(couches, grille).scale(s)


def jauge(frac, centre, h=2.0, w=0.5, couleur=TERME):
    """La jauge de carbone 14 : le cadre et la part qui reste (frac de 0 à 1)."""
    cadre = RoundedRectangle(width=w, height=h, corner_radius=0.1, stroke_color=GREY_B, stroke_width=3,
                             fill_color=FOND_CARTE, fill_opacity=1).move_to(centre)
    hi = max(0.02, (h - 0.12) * frac)
    plein = RoundedRectangle(width=w - 0.14, height=hi, corner_radius=min(0.06, hi / 2), fill_color=couleur,
                             fill_opacity=1, stroke_width=0)
    plein.move_to(cadre.get_bottom() + UP * (hi / 2 + 0.06))
    return VGroup(cadre, plein)


def piquet(h=0.42, couleur=BOIS):
    """Un piquet planté : la tige et sa pointe."""
    tige = Rectangle(width=0.1, height=h, fill_color=couleur, fill_opacity=1, stroke_width=0)
    pointe = Polygon(P(-0.05, -h / 2), P(0.05, -h / 2), P(0, -h / 2 - 0.1), fill_color=couleur, fill_opacity=1,
                     stroke_width=0)
    return VGroup(tige, pointe)


def regle(s=1.0):
    """Une règle graduée (le mauvais outil du piège)."""
    corps = RoundedRectangle(width=1.7, height=0.3, corner_radius=0.06, fill_color="#fde68a", fill_opacity=1,
                             stroke_color="#b45309", stroke_width=2)
    traits = VGroup(*[Line(P(x, 0.15), P(x, 0.02), stroke_color="#b45309", stroke_width=2)
                      for x in (-0.6, -0.3, 0.0, 0.3, 0.6)])
    return VGroup(corps, traits).scale(s)


class OutilsExpo:
    """Les outils de l'épisode, partagés par la paysage et le short : une ligne
    qui mêle texte et puissance à exposant décimal, le nuage, la courbe de f."""

    def mixte(self, parts, y, x=None, fs=46, larg=None, avec_k=None):
        """parts = [("t", morceaux) | ("p", base, exposant, couleur, extrait_base,
        extrait_exposant)] : chaque morceau (et chaque exposant) à sa voix."""
        blocs = []
        for p in parts:
            if p[0] == "t":
                blocs.append(("t", self.construire(p[1], fs, 1e9)))
            else:
                blocs.append(("p", puissance(p[1], p[2], fs, p[3], p[3]), p[4], p[5]))
        g = VGroup(*[b[1] for b in blocs]).arrange(RIGHT, buff=self.espace(fs))
        larg = larg or self.largeur_texte
        if g.width > larg:
            g.scale_to_fit_width(larg)
        g.move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        for k, b in enumerate(blocs):
            extra = (avec_k or {}).get(k, ())
            if b[0] == "t":
                self.montrer(b[1], avec=extra, rt=0.25)
            else:
                self.suivre(b[2])
                self.play(FadeIn(b[1][0], shift=UP * 0.1), run_time=0.22)
                self.suivre(b[3])
                self.play(FadeIn(b[1][1], scale=1.4), *extra, run_time=0.22)
        return g

    def question_lignes(self, cle, groupes, choix, bonne, **kw):
        """poser_question, chaque ligne de la question en morceaux, à sa voix."""
        liste = [(g, None) for g in groupes]

        def dessin():
            for g in groupes:
                self.montrer(g, rt=0.22)
            liste.clear()
        return self.poser_question(cle, liste, choix, bonne, dessin=dessin, **kw)

    def nuage(self, nr, ur, bg, hd, nom_u="uₙ", fs=24):
        """Le nuage de la série, avec le « n » AU-DESSUS du bout de l'axe (à
        droite, il mordait sur la zone de Ti-Margo)."""
        nu = NuageTermes(nr, ur, bg, hd, nom_u=nom_u, fs=fs)
        nu.lab_n.next_to(nu.ax_n.get_end(), UP, buff=0.05).shift(LEFT * 0.1)
        return nu

    def axes(self, nu, extra=()):
        return [Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), *extra]

    def courbe(self, nu, n0, n1, couleur=JUSTE, sw=4.5, f=None):
        f = f or (lambda t: 100 * 0.5 ** t)
        return ParametricFunction(lambda t: nu.G(t, f(t)), t_range=[n0, n1, 0.02], color=couleur, stroke_width=sw)

    def points_suite(self, nu, rangs=(0, 1, 2, 3), couleur=TERME, r=0.095, f=None):
        f = f or (lambda t: 100 * 0.5 ** t)
        return VGroup(*[nu.point(n, f(n), couleur, r) for n in rangs])

    def repere(self, nu, rangs=(1, 2, 3), cent=True):
        """Les graduations du nuage (données du repère, non auditées)."""
        g = VGroup(*[nu.graduation_n(n, str(n), 22) for n in rangs])
        if cent:
            y = nu.G(0, 100)[1]
            x = nu.ax_u.get_center()[0]
            tr = Line(P(x - 0.08, y), P(x + 0.08, y), stroke_width=2.5, color=GREY_B)
            g.add(VGroup(tr, self.t("100", 22, GREY_A, audit=False).next_to(tr, LEFT, buff=0.08)))
        return g

    def rappel(self, lg):
        """Une ligne de termes DÉJÀ dite : ses nombres sortent de l'audit."""
        for c in lg.cases:
            c[1]._pas_audit = True
        for n in lg.noms:
            n._pas_audit = True
        return lg

    def pointille(self, nu, n, v, couleur=JUSTE):
        """Les deux pointillés qui mènent du rang n à la valeur v sur la courbe."""
        bas, pt = nu.G(n, 0), nu.G(n, v)
        gauche = P(nu.ax_u.get_center()[0], pt[1])
        return VGroup(DashedLine(bas, pt, color=couleur, stroke_width=3, dash_length=0.09),
                      DashedLine(gauche, pt, color=couleur, stroke_width=3, dash_length=0.09))


class SuiteExpoProlonger1re(AuditMilliers, VerifMargo, OutilsExpo, OutilsCalcul, PaysageSuites):
    fichier_marques = "suite_expo_prolonger_marques.json"
    nom_voix = "premiere-suite-expo-prolonger"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"
    largeur_bouton = 9.0
    hauteur_bouton = 0.66
    buff_boutons = 0.12
    place_coche = 1.1
    y_tete_question = 3.18     # le compte à rebours doit rester sous y = 3,57

    X0 = -6.3                      # la marge gauche des lignes de texte

    # ── les outils de l'épisode ────────────────────────────────────────────

    def bouton(self, lettre, corps, largeur, fs):
        """Le bouton du module, avec une marge intérieure d'au moins 20 px."""
        if isinstance(corps, str):
            corps = self.t(corps, fs, WHITE, 1e9)
        b = super().bouton(lettre, corps, largeur, fs)
        cadre, ligne = b
        h = max(self.hauteur_bouton, ligne.height + 0.22)
        if cadre.height < h:
            cadre.stretch_to_fit_height(h)
            ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return b

    def ligne(self, morceaux, y, x=None, fs=38, avec=(), larg=None, avec_k=None, rt=0.25):
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k)

    # ── 00 : la garde : les 4 points, puis la courbe qui remplit les trous ──

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Suite géométrique et fonction exponentielle", 54, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Suite géométrique")
        self.play(Write(tit), run_time=0.8)
        ident = self.t(self.identite, 26, GREY_A, audit=False).move_to(P(0, 2.5))   # « 1re » : pas un nombre dit
        self.au_mot("fonction")
        self.play(FadeIn(ident), run_time=0.3)
        nu = self.nuage((0, 3.5), (0, 118), P(-3.3, -2.45), P(2.9, 0.55))
        pts = self.points_suite(nu)
        cb = self.courbe(nu, 0, 3.45)
        qm = self.t("?", 46, RAISON, audit=False).move_to(nu.G(1.5, 35.4) + UP * 0.5 + LEFT * 0.12)
        self.au_mot("exponentielle")
        self.play(*self.axes(nu, [FadeIn(self.repere(nu))]), run_time=0.5)
        self.ligne([("Comment calculer une valeur", WHITE, "Comment")], 1.85, x=-5.6, fs=40,
                   avec_k={0: [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.18)]}, rt=0.9)
        self.ligne([("entre deux termes", WHITE, "entre deux"), ("d'une suite ?", JAUNE_TITRE, "d'une suite")],
                   1.15, x=-5.6, fs=40, avec_k={1: [Create(cb), FadeIn(qm, scale=0.6)]}, rt=1.0)
        self.play(Indicate(qm, color=RAISON, scale_factor=1.3), run_time=0.5)
        self.attendre_voix(marge=0.9)

    # ── 01 : Fanta, archéologue : l'os, la jauge, les quatre pourcentages ──

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = fanta(0.85).move_to(P(-5.3, 2.0))
        nom = self.t("Fanta", 40, JAUNE_TITRE).move_to(P(-5.3, 0.75))
        metier = self.t("archéologue", 32, TERME).move_to(P(-5.3, 0.25))
        self.au_mot("Fanta")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        pic = truelle(1.0).move_to(P(-3.3, 2.1))
        self.au_mot("archéologue")
        self.play(FadeIn(metier, shift=UP * 0.1), FadeIn(pic, shift=UP * 0.15), run_time=0.45)
        self.ligne([("elle date les objets", WHITE, "elle date"), ("qu'on sort de terre.", WHITE, "qu'on sort")],
                   -0.5, x=self.X0, fs=38)
        # la fouille, l'os, la jauge de carbone 14
        fo = fouille(3.2).move_to(P(1.5, 2.1))
        o = os_fossile(1.25).move_to(P(1.2, 1.95)).rotate(-0.2)
        lab = self.t("carbone 14", 26, GREY_A).move_to(P(4.9, 3.05))
        self.j = jauge(1.0, P(4.9, 1.85), h=1.9)
        self.ligne([("Dans un os, il y a du", WHITE, "Dans un os"), ("carbone", TERME, "carbone"),
                    ("14,", TERME, "14,")], -1.25, x=self.X0, fs=38,
                   avec_k={0: [FadeIn(fo, shift=DOWN * 0.15), FadeIn(o, scale=0.7)],
                           2: [FadeIn(lab), FadeIn(self.j, shift=UP * 0.2)]}, rt=0.5)
        self.ligne([("il en disparaît", WHITE, "il en disparaît"), ("la moitié", RAISON, "la moitié"),
                    ("tous les 5 730 ans.", WHITE, "5 730")], -2.0, x=self.X0, fs=34)
        # les quatre pourcentages : la case se remplit, la jauge tombe
        lg = LigneTermes(["100 %", "50 %", "25 %", "12,5 %"], centre=P(-0.6, -2.78), pas=2.4, largeur=1.9,
                         hauteur=0.7, fs=32, noms=["départ", "1 période", "2 périodes", "3 périodes"], fs_noms=18)
        for n in lg.noms:
            n.set_opacity(0)
        self.add(lg.noms)
        for k, (ex, frac) in enumerate(zip(("100 %", "50 %", "25 %", "12,5 %"), (1.0, 0.5, 0.25, 0.125))):
            self.suivre(ex)
            lg.noms[k].set_opacity(1)
            self.montrer_case(lg, k, run_time=0.3)
            self.play(Transform(self.j, jauge(frac, P(4.9, 1.85), h=1.9)), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 02 : la suite géométrique : raison 0,5, et SEULEMENT les rangs entiers ──

    def cases_quatre(self, y=2.0, pas=2.6, largeur=2.0, fs=36, noms=None, x=-0.4):
        """La rangée des quatre pourcentages (un rappel : nombres déjà dits)."""
        lg = LigneTermes(["100 %", "50 %", "25 %", "12,5 %"], centre=P(x, y), pas=pas, largeur=largeur,
                         hauteur=0.8, fs=fs, noms=noms, fs_noms=22)
        return self.rappel(lg)

    def ecran_suite(self):
        self.nouvel_ecran("02-suite")
        lg = self.cases_quatre(y=1.62)
        self.au_mot("Ces valeurs")
        self.play(FadeIn(lg.cases, shift=UP * 0.15), run_time=0.45)
        self.titre("Une suite géométrique", JAUNE_TITRE, 46, extrait="une suite géométrique")
        sauts = VGroup(*[lg.saut(i, "× 0,5", cote=UP, couleur=RAISON, fs=28, creux=0.2) for i in range(3)])
        self.au_mot("0,5")                      # le mot « 0,5 » lui-même, pas « raison »
        self.play(LaggedStart(*[AnimationGroup(Create(s[0]), FadeIn(s[1], scale=1.3), lag_ratio=0.5)
                                for s in sauts], lag_ratio=0.35), run_time=1.3)
        self.ligne([("uₙ =", TERME, "u indice n"), ("100", WHITE, "100"), ("× 0,5ⁿ", RAISON, "0,5 puissance")],
                   -0.05, fs=52)
        self.ligne([("Mais attention :", GREY_A, "Mais attention"), ("n", TERME, "n est"),
                    ("est un nombre de périodes", WHITE, "un nombre"), ("ENTIER.", JAUNE_TITRE, "ENTIER")],
                   -1.3, x=self.X0, fs=38)
        self.ligne([("Cette suite ne répond", WHITE, "Cette suite"), ("qu'aux rangs :", JAUNE_TITRE, "qu'aux rangs")],
                   -2.45, x=self.X0, fs=40)
        rangs = VGroup()
        for k, (r, ex) in enumerate((("0", "0,"), ("1", "1,"), ("2", "2,"), ("3", "3."))):
            tr = self.t(r, 34, TERME).next_to(lg.cases[k], DOWN, buff=0.22)
            rangs.add(tr)
            self.suivre(ex)
            self.play(FadeIn(tr, scale=1.5), Flash(tr, color=TERME, line_length=0.1, num_lines=8), run_time=0.25)
        self.play(Indicate(rangs, color=TERME, scale_factor=1.15), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 03 : l'os à 35,4 % : entre deux rangs, la suite n'a rien à dire ────

    def ecran_probleme(self):
        self.nouvel_ecran("03-probleme")
        self.titre("L'os de Fanta", JAUNE_TITRE, 46, extrait="Or l'os")
        o = os_fossile(1.2).move_to(P(4.9, 2.5)).rotate(-0.2)
        jg = jauge(0.354, P(6.05, 2.2), h=1.5, w=0.44, couleur=JAUNE_TITRE)
        self.ligne([("Or l'os contient environ", WHITE, "contient environ"), ("35,4 %", JAUNE_TITRE, "35,4")],
                   2.3, x=self.X0, fs=36,
                   avec_k={0: [FadeIn(o, scale=0.7)], 1: [FadeIn(jg, shift=UP * 0.2)]}, rt=0.45)
        self.ligne([("de carbone", WHITE, "de carbone"), ("14.", WHITE, "14.")], 1.62, x=self.X0, fs=36)
        lg = self.cases_quatre(y=-2.4, pas=2.8, largeur=2.0, fs=34, x=-0.9)
        self.ligne([("Ce n'est", WHITE, "Ce n'est"), ("ni 50 %,", TERME, "ni 50"), ("ni 25 %.", TERME, "ni 25")],
                   0.92, x=self.X0, fs=36, avec_k={1: [FadeIn(lg.cases, shift=UP * 0.12)],
                                                   2: [Indicate(lg.cases[1], color=TERME, scale_factor=1.12),
                                                       Indicate(lg.cases[2], color=TERME, scale_factor=1.12)]},
                   rt=0.45)
        # le trou entre les rangs 1 et 2 : une case vide, en pointillés
        xt = (lg.cases[1][0].get_center()[0] + lg.cases[2][0].get_center()[0]) / 2
        trou = DashedVMobject(RoundedRectangle(width=0.72, height=0.8, corner_radius=0.1, stroke_color=JAUNE_TITRE,
                                               stroke_width=3).move_to(P(xt, -2.4)), num_dashes=18)
        val = self.t("35,4 %", 32, JAUNE_TITRE).move_to(P(xt, -1.55))
        val._pas_audit = True
        fl = Arrow(P(xt, -1.8), P(xt, -1.98), buff=0, color=JAUNE_TITRE, stroke_width=4, tip_length=0.14)
        self.ligne([("Il est entre", WHITE, "Il est entre"), ("une période", TERME, "une période")],
                   0.24, x=self.X0, fs=36, avec_k={1: [Create(trou)]}, rt=0.5)
        self.ligne([("et deux périodes.", TERME, "et deux")], -0.4, x=self.X0, fs=36,
                   avec_k={0: [FadeIn(val, scale=1.3), GrowArrow(fl)]}, rt=0.5)
        qm = self.t("?", 40, PIEGE, audit=False).move_to(P(xt, -2.4))
        self.ligne([("Et là,", WHITE, "Et là"), ("la suite n'a rien à dire.", PIEGE, "la suite n'a rien")],
                   -1.08, x=self.X0, fs=36, avec_k={1: [FadeIn(qm, scale=0.6)]}, rt=0.5)
        self.play(Indicate(qm, color=PIEGE, scale_factor=1.3), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 04 : Fanta change d'outil : la fonction, les points, puis la courbe ──

    def ecran_fonction(self):
        self.nouvel_ecran("04-fonction")
        self.titre("Fanta change d'outil", JAUNE_TITRE, 46, extrait="Alors Fanta")
        nu = self.nuage((0, 3.5), (0, 118), P(2.2, -2.35), P(4.6, 0.9))
        pts = self.points_suite(nu)
        cb = self.courbe(nu, 0, 3.45)
        self.ligne([("Elle prend la fonction :", WHITE, "Elle prend")], 2.25, x=self.X0, fs=40)
        self.ligne([("f(x) =", JUSTE, "f de x"), ("100", WHITE, "100"), ("× 0,5ˣ", RAISON, "0,5 puissance")],
                   1.35, x=self.X0, fs=52)
        self.ligne([("Elle accepte tous les nombres", WHITE, "accepte tous")], 0.45, x=self.X0, fs=36)
        self.ligne([("positifs :", WHITE, "les nombres"), ("1 ;", TERME, "1 ;"), ("1,5 ;", JUSTE, "1,5"),
                    ("2,5 …", JUSTE, "2,5")], -0.4, x=self.X0, fs=42)
        self.ligne([("On place d'abord", WHITE, "On place"), ("les points de la suite,", TERME, "les points")],
                   -1.45, x=self.X0, fs=36,
                   avec_k={0: self.axes(nu, [FadeIn(self.repere(nu))]),
                           1: [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.18)]}, rt=0.7)
        self.ligne([("puis on trace", WHITE, "puis on trace"), ("la courbe de f.", JUSTE, "la courbe")],
                   -2.5, x=self.X0, fs=38, avec_k={1: [Create(cb)]}, rt=1.0)
        self.attendre_voix(marge=0.5)

    # ── 05 : question-pause n° 1 → B (la courbe passe par tous les points) ──

    def ecran_question1(self):
        g1 = self.construire([("Que fait cette courbe", WHITE, "Que fait")], 36)
        g2 = self.construire([("par rapport aux points", WHITE, "par rapport"),
                              ("de la suite ?", WHITE, "de la suite")], 36)
        cA = self.choix_lignes([[("elle passe sous", "elle passe sous")],
                                [("tous les points", "tous les points")]], 32)
        cB = self.choix_lignes([[("elle passe exactement", "elle passe exactement")],
                                [("par tous les points", "par tous")]], 32)
        cC = self.choix_lignes([[("elle ne touche les points", "elle ne touche")],
                                [("qu'en x =", "qu'en"), ("0", "égale 0")]], 32)
        q = self.question_lignes("05-question", [g1, g2], [cA, cB, cC], 1, fs=32)
        self.dire("05b-reponse")
        ok = self.q_reponse(q, 1)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), FadeOut(g1), FadeOut(g2),
                  VGroup(q.cartes[1], ok).animate.move_to(P(0, 2.55)), run_time=0.35)
        nu = self.nuage((0, 3.5), (0, 118), P(1.9, -2.4), P(4.6, 0.8))
        pts = self.points_suite(nu)
        cb = self.courbe(nu, 0, 3.45)
        self.ligne([("À chaque rang entier,", JAUNE_TITRE, "À chaque rang")], 1.45, x=self.X0, fs=40)
        self.ligne([("la fonction donne", WHITE, "la fonction donne"), ("la même valeur", JUSTE, "la même valeur"),
                    ("que la suite :", TERME, "que la suite")], 0.6, x=self.X0, fs=38,
                   avec_k={0: self.axes(nu, [FadeIn(self.repere(nu))]),
                           2: [LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.15), Create(cb)]}, rt=0.7)
        for k, (f_, v, ex_f, ex_v, y) in enumerate(((0, "100", "f de 0", "100,", -0.4),
                                                    (1, "50", "f de 1", "50,", -1.3),
                                                    (2, "25", "f de 2", "25.", -2.2))):
            g = self.ligne([(f"f({f_}) =", JUSTE, ex_f), (v, TERME, ex_v)], y, x=self.X0, fs=42,
                           avec_k={1: [Flash(pts[k], color=JUSTE, line_length=0.16, num_lines=10),
                                       Indicate(pts[k], color=JUSTE, scale_factor=1.6)]}, rt=0.4)
            self.add(g)
        self.attendre_voix(marge=0.5)

    # ── 06 : f(1,5) ≈ 35,4 : les piquets et le fil tendu ───────────────────

    def ecran_prolonge(self):
        self.nouvel_ecran("06-prolonge")
        self.titre("Ce que la fonction ajoute", JAUNE_TITRE, 46, extrait="ce qu'elle ajoute")
        nu = self.nuage((0, 3.5), (0, 118), P(2.6, -1.75), P(5.0, 1.05), fs=22)
        pts = self.points_suite(nu, r=0.085)
        cb = self.courbe(nu, 0, 3.45)
        piq = VGroup(*[piquet(0.34, PIQUET).next_to(d, DOWN, buff=0.02) for d in pts])
        self.play(*self.axes(nu, [FadeIn(self.repere(nu, cent=False)),
                                  LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.12), Create(cb)]),
                  run_time=0.9)
        self.mixte([("t", [("f(1,5) =", JUSTE, "f de 1,5"), ("100 ×", WHITE, "100 fois")]),
                    ("p", "0,5", "1,5", RAISON, "0,5 puissance", "1,5,"),
                    ("t", [("≈ 35,4", JUSTE, "environ 35,4")])], 2.35, x=self.X0, fs=44)
        d15 = nu.point(1.5, 35.4, JUSTE, 0.11)
        po = self.pointille(nu, 1.5, 35.4)
        oo = os_fossile(0.8).move_to(nu.G(1.5, 35.4) + RIGHT * 0.55 + UP * 0.3).rotate(-0.25)
        self.ligne([("C'est l'os de Fanta.", WHITE, "C'est l'os")], 1.55, x=self.X0, fs=36,
                   avec_k={0: [Create(po), GrowFromCenter(d15), FadeIn(oo, scale=0.6)]}, rt=0.6)
        self.ligne([("1,5 période,", TERME, "1,5 période"), ("c'est 1,5 ×", WHITE, "c'est 1,5"),
                    ("5 730,", WHITE, "5 730,")], 0.85, x=self.X0, fs=34)
        self.ligne([("donc 8 595 ans.", JUSTE, "donc 8 595")], 0.2, x=self.X0, fs=34)
        self.ligne([("La fonction exponentielle", JUSTE, "la fonction exponentielle")], -0.55, x=self.X0, fs=34)
        self.ligne([("PROLONGE", JAUNE_TITRE, "PROLONGE"), ("la suite.", TERME, "la suite")],
                   -1.2, x=self.X0, fs=34)
        self.ligne([("Les points sont des", TERME, "les points"), ("piquets,", PIQUET, "piquets")],
                   -1.9, x=self.X0, fs=34,
                   avec_k={1: [LaggedStart(*[FadeIn(p, shift=UP * 0.1) for p in piq], lag_ratio=0.15)]}, rt=0.6)
        self.ligne([("la courbe est le fil tendu", JUSTE, "la courbe est")], -2.55, x=self.X0, fs=34)
        self.ligne([("qui existe partout entre eux.", JUSTE, "qui existe")], -3.2, x=self.X0, fs=34,
                   avec_k={0: [Indicate(cb, color=JUSTE, scale_factor=1.04)]}, rt=0.8)
        self.attendre_voix(marge=0.5)

    # ── 07 : le piège : la corde droite donne 37,5 %, la courbe passe dessous ──

    def ecran_piege(self):
        self.nouvel_ecran("07-piege")
        self.titre("Voilà le piège !", PIEGE, 46, extrait="piège")
        nu = self.nuage((0.8, 2.2), (17, 57), P(1.9, -2.3), P(4.7, 1.7), nom_u="%", fs=22)
        nu.add(nu.graduation_n(1, "1", 22), nu.graduation_n(2, "2", 22))
        p1, p2 = nu.point(1, 50, TERME, 0.1), nu.point(2, 25, TERME, 0.1)
        corde = Line(nu.G(1, 50), nu.G(2, 25), color=PIEGE, stroke_width=5)
        cb = self.courbe(nu, 1, 2, JUSTE, 5)
        dm = nu.point(1.5, 37.5, PIEGE, 0.1)
        lm = self.t("37,5 %", 28, PIEGE).next_to(dm, UR, buff=0.08)
        dv = nu.point(1.5, 35.355, JUSTE, 0.1)
        lv = self.t("35,4 %", 28, JUSTE).next_to(dv, DL, buff=0.06)
        ecart = DoubleArrow(nu.G(1.5, 37.5), nu.G(1.5, 35.355), buff=0.02, color=JAUNE_TITRE, stroke_width=4,
                            tip_length=0.12)
        rg = regle(0.85).move_to(P(3.9, -3.05)).rotate(-0.2)
        self.ligne([("Pour aller de", WHITE, "Pour aller"), ("50 %", TERME, "50 %"), ("à", WHITE, None),
                    ("25 %,", TERME, "25 %"), ], 2.5, x=self.X0, fs=34,
                   avec_k={1: self.axes(nu, [FadeIn(g) for g in nu[4:]]) + [GrowFromCenter(p1)],
                           3: [GrowFromCenter(p2)]}, rt=0.45)
        self.ligne([("on est tenté de tirer", WHITE, "on est tenté")], 1.93, x=self.X0, fs=34)
        self.ligne([("une ligne droite.", PIEGE, "une ligne")], 1.36, x=self.X0, fs=34,
                   avec_k={0: [Create(corde)]}, rt=0.6)
        self.ligne([("À mi-chemin, cette droite", WHITE, "À mi-chemin")], 0.79, x=self.X0, fs=34)
        self.ligne([("donne", WHITE, "donne"), ("37,5 %.", PIEGE, "37,5")], 0.22, x=self.X0, fs=34,
                   avec_k={1: [GrowFromCenter(dm), FadeIn(lm, scale=1.3)]}, rt=0.5)
        self.ligne([("Mais la vraie valeur", WHITE, "Mais la vraie")], -0.35, x=self.X0, fs=34)
        self.ligne([("est environ", WHITE, "est environ"), ("35,4 %.", JUSTE, "35,4 %")], -0.92, x=self.X0, fs=34,
                   avec_k={1: [GrowFromCenter(dv), FadeIn(lv, scale=1.3)]}, rt=0.5)
        self.ligne([("La courbe n'est pas une droite :", WHITE, "La courbe de")], -1.5, x=self.X0, fs=30,
                   avec_k={0: [Create(cb)]}, rt=0.8)
        self.ligne([("elle passe", WHITE, "elle passe"), ("EN DESSOUS", JUSTE, "EN DESSOUS"),
                    ("du segment.", PIEGE, "du segment")], -2.05, x=self.X0, fs=30,
                   avec_k={1: [GrowFromCenter(ecart)]}, rt=0.5)
        self.ligne([("Relier les points à la règle", WHITE, "Relier les points")], -2.6, x=self.X0, fs=30,
                   avec_k={0: [FadeIn(rg, shift=UP * 0.15)]}, rt=0.5)
        fin = self.ligne([("donne un âge faux.", PIEGE, "donne un âge")], -3.18, x=self.X0, fs=30,
                         avec_k={0: [Create(self.barrer(rg))]}, rt=0.5)
        self.play(Indicate(fin[0], color=PIEGE, scale_factor=1.08), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 08 : question-pause n° 2 → A (le pourcentage au bout de 1,5 période) ──

    def ecran_question2(self):
        g1 = self.construire([("Que peut calculer la fonction,", WHITE, "Que peut")], 36)
        g2 = self.construire([("que la suite ne peut pas calculer ?", WHITE, "que la suite")], 36)
        cA = self.choix_lignes([[("le pourcentage", "le pourcentage")],
                                [("au bout de", "au bout"), ("1,5 période", "1,5")]], 32)
        cB = self.choix_lignes([[("le pourcentage", "le pourcentage")],
                                [("au bout de", "au bout"), ("3 périodes", "3 période")]], 32)
        cC = self.choix_lignes([[("la somme de tous", "la somme")],
                                [("les pourcentages", "les pourcentages")]], 32)
        q = self.question_lignes("08-question", [g1, g2], [cA, cB, cC], 0, fs=32)
        self.dire("08b-reponse")
        ok = self.q_reponse(q, 0)
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), FadeOut(g1), FadeOut(g2),
                  VGroup(q.cartes[0], ok).animate.move_to(P(0, 2.55)), run_time=0.35)
        # l'axe des rangs : les entiers (bleu) ; entre eux, ce que la fonction ajoute (vert)
        y_ax = 0.5
        ax = Arrow(P(-4.8, y_ax), P(4.9, y_ax), buff=0, stroke_width=2.5, color=GREY_B, tip_length=0.16,
                   max_tip_length_to_length_ratio=0.1)
        X = lambda r: -4.3 + r * 2.7                                                     # noqa: E731
        ent = VGroup()
        for r in range(4):
            tr = Line(P(X(r), y_ax - 0.18), P(X(r), y_ax + 0.18), stroke_width=4, color=TERME)
            ent.add(VGroup(tr, Dot(P(X(r), y_ax), radius=0.1, color=TERME),
                           self.t(str(r), 28, TERME, audit=False).next_to(tr, DOWN, buff=0.14)))
        bande = VGroup(*[Line(P(X(r) + 0.12, y_ax), P(X(r + 1) - 0.12, y_ax), stroke_width=7, color=JUSTE)
                         for r in range(3)])
        milieux = VGroup(*[Dot(P(X(r + 0.5), y_ax), radius=0.09, color=JUSTE) for r in range(3)])
        dec = VGroup(*[self.t(x, 24, JUSTE, audit=False).next_to(milieux[k], UP, buff=0.16)
                       for k, x in enumerate(("0,5", "1,5", "2,5"))])
        self.ligne([("Les rangs entiers :", TERME, "Les rangs entiers"),
                    ("la suite les donne aussi.", WHITE, "la suite les donne")], 1.5, x=self.X0, fs=38,
                   avec_k={0: [GrowArrow(ax)],
                           1: [LaggedStart(*[FadeIn(e, scale=0.7) for e in ent], lag_ratio=0.12)]}, rt=0.6)
        self.ligne([("Ce que la fonction ajoute :", JUSTE, "Ce que la fonction")], -1.2, x=self.X0, fs=40)
        self.ligne([("tous les rangs", JUSTE, "ce sont les rangs"),
                    ("qui ne sont pas entiers.", JAUNE_TITRE, "qui ne sont pas")], -2.1, x=self.X0, fs=40,
                   avec_k={0: [LaggedStart(*[Create(b) for b in bande], lag_ratio=0.15)],
                           1: [LaggedStart(*[GrowFromCenter(d) for d in milieux], lag_ratio=0.15), FadeIn(dec)]},
                   rt=0.7)
        self.attendre_voix(marge=0.5)

    # ── 09 : le défi : un os de 14 325 ans ─────────────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        fo = fouille(2.6).move_to(P(4.9, 1.95))
        o = os_fossile(1.2).move_to(P(4.6, 1.8)).rotate(0.15)
        self.ligne([("Fanta reçoit un os", WHITE, "Fanta reçoit")], 2.1, x=self.X0, fs=38,
                   avec_k={0: [FadeIn(fo, shift=DOWN * 0.15), FadeIn(o, scale=0.7)]}, rt=0.5)
        self.ligne([("daté de", WHITE, "daté de"), ("14 325 ans.", JAUNE_TITRE, "14 325")], 1.4, x=self.X0, fs=38)
        self.ligne([("Première étape :", RAISON, "Première étape"),
                    ("combien de périodes", WHITE, "combien de")], 0.5, x=self.X0, fs=38)
        self.ligne([("de 5 730 ans cela fait-il ?", WHITE, "de 5 730")], -0.15, x=self.X0, fs=38)
        self.ligne([("Deuxième étape :", RAISON, "Deuxième étape"),
                    ("quel pourcentage", WHITE, "quel pourcentage")], -1.1, x=self.X0, fs=38)
        self.ligne([("de carbone 14 reste-t-il ?", WHITE, "de carbone 14")], -1.75, x=self.X0, fs=38)
        self.defi_pause(-2.75, x=-1.6)
        self._tit_defi = tit

    def ecran_correction(self):
        self.dire("09b-correction")
        tit = self._tit_defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        autres = [m for m in self.mobjects if m is not tit and m is not self._margo]
        self.play(*[FadeOut(m) for m in autres], ReplacementTransform(tit, cor), run_time=0.4)
        self.remove(*autres)
        nu = self.nuage((0, 3.5), (0, 118), P(2.6, -2.3), P(4.7, 1.0), fs=22)
        pts = self.points_suite(nu, r=0.085)
        cb = self.courbe(nu, 0, 3.45)
        self.play(*self.axes(nu, [FadeIn(self.repere(nu, cent=False)),
                                  LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.1), Create(cb)]),
                  run_time=0.8)
        self.ligne([("14 325", TERME, "14 325"), ("÷", WHITE, "divisé"), ("5 730", RAISON, "par 5 730"),
                    ("= 2,5", JUSTE, "égale 2,5")], 2.15, x=self.X0, fs=48)
        self.ligne([("Il s'est écoulé", WHITE, "il s'est écoulé"), ("2,5 périodes.", TERME, "2,5 périodes")],
                   1.3, x=self.X0, fs=36)
        self.mixte([("t", [("f(2,5) =", JUSTE, "f de 2,5"), ("100 ×", WHITE, "100 fois")]),
                    ("p", "0,5", "2,5", RAISON, "0,5 puissance", "2,5,"),
                    ("t", [("≈ 17,7", JUSTE, "environ 17,7")])], 0.5, x=self.X0, fs=44)
        d25 = nu.point(2.5, 17.7, JUSTE, 0.11)
        po = self.pointille(nu, 2.5, 17.7)
        f1 = self.ligne([("Il reste environ", WHITE, "Il reste environ"), ("17,7 %", JUSTE, "17,7 %")],
                        -0.5, x=self.X0, fs=36, avec_k={1: [Create(po), GrowFromCenter(d25)]}, rt=0.5)
        f2 = self.ligne([("de carbone 14.", WHITE, "de carbone 14.")], -1.1, x=self.X0, fs=36)
        self.play(FadeIn(self.encadre(VGroup(f1, f2), JUSTE, 0.16)), run_time=0.3)
        self.ligne([("La suite, seule,", TERME, "La suite, seule")], -1.9, x=self.X0, fs=34)
        self.ligne([("n'aurait pas pu répondre :", PIEGE, "n'aurait jamais")], -2.5, x=self.X0, fs=34)
        self.ligne([("2,5 n'est pas un rang entier.", PIEGE, "2,5 n'est pas")], -3.1, x=self.X0, fs=34)
        self.attendre_voix(marge=0.5)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        J, W = JAUNE_TITRE, WHITE
        points = [([self.construire([("Une suite géométrique ne donne des", W, None)], 40, 1e9),
                    self.construire([("valeurs", W, None), ("qu'aux rangs entiers.", J, None)], 40, 1e9)],
                   ["Une suite", "valeurs qu'aux"]),
                  ([self.construire([("La fonction exponentielle", JUSTE, None), ("la prolonge :", W, None)],
                                    40, 1e9),
                    self.construire([("sa courbe passe par tous les points,", W, None)], 40, 1e9),
                    self.construire([("et donne aussi", W, None), ("les valeurs entre eux.", JUSTE, None)],
                                    40, 1e9)],
                   ["La fonction exponentielle", "sa courbe", "et elle donne"]),
                  ([self.construire([("Entre deux points, la courbe passe", W, None)], 40, 1e9),
                    self.construire([("en dessous de la ligne droite.", J, None)], 40, 1e9)],
                   ["Et entre deux", "en dessous"])]
        self.finale(points, cle="10-finale")

    def construct(self):
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_suite, self.ecran_probleme,
                  self.ecran_fonction, self.ecran_question1, self.ecran_prolonge, self.ecran_piege,
                  self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_appris,
                  lambda: self.fin("11-abonne")]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (e == self.ecran_correction and "9" in choix.split(",")):
                e()
