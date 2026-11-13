# suite_limite_defi.py
# EleveAI — Maths Terminale (spé) — paysage « Limites de suites : un exercice
# de bac » (16:9), ceinture BLEUE (le défi). Série SUITES du lycée, épisode 38.
# Micro du coach : limite_suite_defi (notion limite_suite) :
# lib/tutor-v4/questionBank/terminale-spe/maths/limites-suites.bank.ts + limites-suites-renfort.ts.
#
# Ce que demande le coach → écran :
#   · l'enchaînement de bac : majorer par récurrence, le sens de variation,
#     le théorème de convergence monotone (fixed_3), puis ℓ = f(ℓ)            → 02, 03, 05, 07 ;
#   · l'hérédité : la propriété se transmet                                  → 03, 04 (C) ;
#   · le théorème donne la convergence, pas la valeur (tcm)                  → 06 (B) ;
#   · l'équation de la limite ℓ = aℓ + b (fixed_1, fixed_2, fixed_4, genDefiLim) → 07 ;
#   · ℓ = f(ℓ) ne prouve pas la convergence (open_1, genDefiConclure)        → 08, 09 (A), 11 ;
#   · ℓ = √(ℓ + 12) (genDefiEq, forme racine)                                → 10, 10b.
# Clé de voix → écran :
#   00-garde (deux destins depuis 200 tortues : se stabiliser ou disparaître) ·
#   01 Maïa, biologiste marine : la réserve, 200 tortues, − 25 %, + 100 jeunes ·
#   02 l'énoncé en 4 blocs · 03 question un : la récurrence (les dominos) ·
#   04/04b question (C : N = 400 ; la propriété se transmet) · 05 question deux :
#   uₙ₊₁ − uₙ = 0,25 × (400 − uₙ) ≥ 0 (les écarts orange au plafond) · 06/06b
#   question (B : un réel ℓ ; il faut le calculer) · 07 questions trois et
#   quatre : ℓ = 0,75ℓ + 100 → 400 · 08 le piège : uₙ₊₁ = 1,5uₙ − 200 →
#   200 ; 100 ; −50… → −∞ · 09/09b question (A : raison 1,5 ; les écarts qui
#   grandissent) · 10/10b défi uₙ₊₁ = √(uₙ + 12), ℓ = 4 · 11 « Ce que tu as
#   appris » · 12 fin.
# Code couleur (module commun) : bleu = uₙ, orange = la borne 400 et les écarts,
# vert = juste (la limite), rouge = piège.
# ⛔ Pas de LaTeX. Voix : manim/voix/terminale-suite-limite-defi.json (débit −6),
# calée mot à mot par suite_limite_defi_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …  (BORDS=1 : MARGO aussi)
# python -m manim render -qh --disable_caching manim/scripts/terminale/suite_limite_defi.py SuiteLimiteDefiTle -o eleveai-maths-terminale-suite-limite-defi --media_dir manim/scripts/terminale/media-suite-limite-defi
# Sortie : manim/sorties/terminale/maths/suites/38-limite-defi/

import math
import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_limite_calculer import OutilsCalcul  # noqa: E402
from suite_limite_interpreter import calculatrice, glyphes  # noqa: E402
from suite_limite_operations import VerifMargo  # noqa: E402


def recurrente(u0, f, nb=60):
    v = [u0]
    for _ in range(nb):
        v.append(f(v[-1]))
    return v


# ── les affirmations de la voix, vérifiées ──────────────────────────────────
U = recurrente(200, lambda x: 0.75 * x + 100)                               # 01, 02 : les tortues de Maïa
assert U[0] == 200 and 200 <= 400 and abs(0.75 * 400 - 300) < 1e-12        # 03 : initialisation ; 0,75 × 400 = 300
assert abs(0.75 * 400 + 100 - 400) < 1e-12                                  # 04 : N = 400
assert all(U[n] <= 400 and U[n] <= U[n + 1] for n in range(59))             # 03, 05 : majorée, croissante
assert all(abs((U[n + 1] - U[n]) - 0.25 * (400 - U[n])) < 1e-9 for n in range(59))   # 05 : 0,25 × (400 − uₙ)
assert abs(U[59] - 400) < 1e-3 and abs(0.25 * 400 - 100) < 1e-12            # 07 : ℓ = 400
assert 200 - 0.25 * 200 + 100 == 250 and 200 / 25 == 8 and 250 / 25 == 10   # 01 : 8 tortues dessinées, puis 10
W = recurrente(200, lambda x: 1.5 * x - 200, 8)                             # 08 : le piège
assert W[:3] == [200, 100, -50] and abs(1.5 * 400 - 200 - 400) < 1e-12
assert all(abs(W[n] - 400 - (-200 * 1.5 ** n)) < 1e-9 for n in range(8))   # 09b : uₙ − 400 = −200 × 1,5ⁿ
assert W[7] < -3000                                                         # → −∞
D = recurrente(0, lambda x: math.sqrt(x + 12))                              # 10 : le défi
assert all(D[n] <= D[n + 1] <= 4 for n in range(59)) and D[5] < 4 and abs(D[59] - 4) < 1e-9
assert 4 * 4 - 4 - 12 == 0 and 9 + 3 - 12 == 0 and math.sqrt(4 + 12) == 4   # 10b : 4 et −3, ℓ = 4
G = [400 - 200 * 0.75 ** n for n in range(13)]                              # 00 : se stabiliser
assert all(abs(G[n] - U[n]) < 1e-9 for n in range(13))

PEAU = "#a16207"
MER, MER2 = "#0c4a6e", "#38bdf8"
CARAPACE, CARAPACE2 = "#15803d", "#4ade80"
ETAPES = ("Majorer", "Sens", "Converger", "Limite")


# ── les dessins de l'épisode ───────────────────────────────────────────────

def maia(s=1.0):
    """Maïa, biologiste marine : chignon, combinaison de plongée, un masque sur le front."""
    chignon = Circle(radius=0.14, fill_color="#1c1917", fill_opacity=1, stroke_width=0).move_to(P(0, 1.36))
    cheveux = Sector(radius=0.3, angle=PI, start_angle=0, fill_color="#1c1917", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.18))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    masque = RoundedRectangle(width=0.44, height=0.13, corner_radius=0.05, fill_color=MER2, fill_opacity=1,
                              stroke_color="#0f172a", stroke_width=1.5).move_to(P(0, 1.2))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#0f172a", fill_opacity=1,
                             stroke_color=MER2, stroke_width=3).move_to(P(0, 0.12))
    bande = Rectangle(width=0.9, height=0.12, fill_color=MER2, fill_opacity=1, stroke_width=0).move_to(P(0, 0.25))
    return VGroup(corps, bande, chignon, cheveux, tete, masque).scale(s)


def tortue(s=1.0, couleur=CARAPACE, bord=CARAPACE2):
    """Une tortue de mer vue de dessus : carapace, tête, quatre nageoires (tête à droite)."""
    nag = VGroup(*[Ellipse(width=0.3, height=0.13, fill_color=bord, fill_opacity=1, stroke_width=0)
                   .rotate(a).move_to(P(x, y)) for x, y, a in ((0.2, 0.2, 0.6), (0.2, -0.2, -0.6),
                                                                (-0.24, 0.15, -0.5), (-0.24, -0.15, 0.5))])
    tete = Circle(radius=0.09, fill_color=bord, fill_opacity=1, stroke_width=0).move_to(P(0.36, 0))
    cara = Ellipse(width=0.56, height=0.42, fill_color=couleur, fill_opacity=1, stroke_color=bord, stroke_width=2)
    motif = VGroup(Line(P(-0.15, 0), P(0.15, 0)), Line(P(0, -0.13), P(0, 0.13))).set_stroke(bord, 1.5)
    return VGroup(nag, tete, cara, motif).scale(s)


class Domino(VGroup):
    """Un domino debout et son nom dessous (non audité : c'est un dessin)."""

    def __init__(self, nom, x, y=0.0, h=1.3, w=0.32, fs=26, **kw):
        super().__init__(**kw)
        self.bloc = RoundedRectangle(width=w, height=h, corner_radius=0.06, fill_color=TERME, fill_opacity=1,
                                     stroke_color=WHITE, stroke_width=2).move_to(P(x, y))
        self.nom = Text(nom, font_size=fs, color=GREY_A).next_to(self.bloc, DOWN, buff=0.14)
        self.nom._pas_audit = True
        self.add(self.bloc, self.nom)

    def tomber(self, angle=0.27):
        """Il penche vers la droite sur son voisin, et passe au vert."""
        return Rotate(self.bloc, -angle, about_point=self.bloc.get_corner(DR)), self.bloc.animate.set_fill(JUSTE)


class CadreAvecTexte:
    """Les boutons A / B / C : chaque bouton arrive ENTIER (cadre, lettre et tout
    son texte d'un coup) au début de sa lecture : jamais un cadre vide ou à moitié."""

    def q_montrer_choix(self, cartes):
        for c, L in zip(cartes, "ABC"):
            self.suivre(f"{L} : ")
            ex = [e for e in getattr(c[1][1], "extraits", []) if e]
            if ex:                        # le curseur suit la voix…
                self.suivre(ex[0])
            self.play(FadeIn(c, shift=RIGHT * 0.12), run_time=0.25)   # …mais le bouton arrive ENTIER
            for e in ex[1:]:
                self.suivre(e)


class SuiteLimiteDefiTle(CadreAvecTexte, VerifMargo, OutilsCalcul, PaysageSuites):
    fichier_marques = "suite_limite_defi_marques.json"
    nom_voix = "terminale-suite-limite-defi"
    identite = "Maths Tle — EleveAI"
    ceinture = "bleue"
    largeur_bouton = 9.4
    hauteur_bouton = 0.72
    buff_boutons = 0.12
    place_coche = 1.2
    y_tete_question = 3.2

    def bouton(self, lettre, corps, largeur, fs):
        """Le bouton du module (indices agrandis), marge intérieure ≥ 20 px autour du texte."""
        if isinstance(corps, str):
            corps = self.t(corps, fs, WHITE, 1e9)
        b = super().bouton(lettre, corps, largeur, fs)
        cadre, ligne = b
        h = max(self.hauteur_bouton, ligne.height + 0.36)
        if cadre.height < h:
            cadre.stretch_to_fit_height(h)
            ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return b

    def ligne(self, morceaux, y, x=-6.2, fs=40, avec=(), larg=None, avec_k=None, rt=0.25):
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
            liste.clear()
        return self.poser_question(cle, liste, choix, bonne, dessin=dessin, **kw)

    def axes(self, nu, extra=()):
        return [Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), *extra]

    def trait_u(self, nu, v, couleur=JUSTE, texte=None, fs=28, buff=0.14, dessus=None):
        """Un trait pointillé à la hauteur v ; son nombre à GAUCHE de l'axe (texte) ;
        dessus : au-dessus du bout du trait, avec un écart net (hors des points et du pointillé)."""
        y = nu.G(nu.na, v)[1]
        tr = DashedLine(P(nu.ax_u.get_center()[0], y), P(nu.X1 + 0.1, y), color=couleur, stroke_width=3.5,
                        dash_length=0.1)
        g = VGroup(tr)
        if texte:
            g.add(self.t(texte, fs, couleur, audit=False).next_to(tr, LEFT, buff=buff))
        if dessus:
            g.add(self.t(dessus, fs, couleur, audit=False).next_to(tr, UP, buff=0.36).align_to(tr, RIGHT))
        return g

    def montrer_trait(self, tr):
        return [Create(tr[0]), *[FadeIn(m, shift=LEFT * 0.1) for m in tr[1:]]]

    def points(self, nu, valeurs, couleur=TERME, r=0.075, n0=0):
        return VGroup(*[nu.point(n0 + n, v, couleur, r) for n, v in enumerate(valeurs)])

    def pousser(self, pts, lag=0.1):
        return LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=lag)

    def graduer(self, nu, ns, fs=24):
        for n in ns:
            nu.add(nu.graduation_n(n, str(n), fs))
        return [FadeIn(g) for g in nu[4:]]

    def nuage_tortues(self, nb=13, bg=P(2.4, -2.45), hd=P(4.85, 2.05)):
        """Le nuage des tortues (uₙ de 0 à 450)."""
        nu = NuageTermes((0, nb), (0, 450), bg, hd, fs=26)
        grads = self.graduer(nu, (5, 10))
        return nu, grads

    # ── le bandeau des quatre questions de l'énoncé (03, 05, 07) ───────────

    def bandeau(self, actif):
        """Les quatre questions en blocs, en haut : les faites en vert, celle du jour
        en jaune épais, quand la voix dit « Question … »."""
        blocs = VGroup()
        for i, nom in enumerate(ETAPES):
            tx = self.t(f"{i + 1} · {nom}", 28, WHITE if i <= actif else GREY_B, audit=False)
            cadre = RoundedRectangle(width=2.95, height=0.64, corner_radius=0.12, fill_color=FOND_CARTE,
                                     fill_opacity=1, stroke_width=3,
                                     stroke_color=JUSTE if i < actif else (JAUNE_TITRE if i == actif else GREY_D))
            if i == actif:
                cadre.set_stroke(width=7)
            blocs.add(VGroup(cadre, tx.move_to(cadre)))
        blocs.arrange(RIGHT, buff=0.15).move_to(P(-0.25, 3.2))
        self.play(FadeIn(blocs), run_time=0.3)
        self.insister(blocs[actif], 1.08)
        self._bandeau = blocs
        return blocs

    def allumer_etape(self, k):
        """L'étape k s'allume (jaune), la précédente passe au vert."""
        b = self._bandeau
        return [b[k][0].animate.set_stroke(JAUNE_TITRE, width=7), b[k][1].animate.set_color(WHITE),
                b[k - 1][0].animate.set_stroke(JUSTE, width=3)]

    # ── 00 : la garde : deux destins depuis 200 tortues ────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Limites de suites", 64, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Limites")
        self.play(Write(tit), run_time=0.7)
        y = tit.get_bottom()[1] - 0.55
        nu = NuageTermes((0, 12.6), (-650, 470), P(-3.9, -1.95), P(2.4, 0.15), fs=24)
        bleus = self.points(nu, G[:13])
        rouges = self.points(nu, W[1:4], PIEGE, n0=1)
        lim = DashedLine(nu.G(0, 400), nu.G(12.4, 400), color=JUSTE, stroke_width=3.5, dash_length=0.1)
        qm = self.t("?", 40, JUSTE, audit=False).next_to(lim, RIGHT, buff=0.15)
        chute = Arrow(nu.G(3.4, -330), nu.G(3.4, -640), buff=0, color=PIEGE, stroke_width=5, tip_length=0.16)
        self.ligne([("un exercice de bac", TERME, "un exercice")], y, x=None, fs=40)
        self.ligne([("Une population de", WHITE, "Une population"), ("tortues", TERME, "tortues")], y - 0.66,
                   x=None, fs=40, avec_k={1: self.axes(nu, [GrowFromCenter(bleus[0])])}, rt=0.5)
        self.ligne([("va-t-elle", WHITE, "va-t-elle"), ("se stabiliser,", JUSTE, "se stabiliser"),
                    ("ou disparaître ?", PIEGE, "disparaître")], y - 1.32, x=None, fs=40,
                   avec_k={1: [self.pousser(bleus[1:]), Create(lim), FadeIn(qm, scale=1.4)],
                           2: [self.pousser(rouges, 0.3), GrowArrow(chute)]}, rt=0.8)
        ident = self.t(self.identite, 22, GREY_A).move_to(P(5.0, -0.66))
        self.play(FadeIn(ident), run_time=0.3)
        self.attendre_voix(marge=0.9)

    # ── 01 : Maïa, biologiste marine : la réserve ──────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = maia(0.85).move_to(P(-4.5, 2.35))
        nom = self.t("Maïa", 40, JAUNE_TITRE).next_to(perso, DOWN, buff=0.15)
        metier = self.t("biologiste marine", 30, TERME).next_to(nom, DOWN, buff=0.1)
        self.au_mot("Maïa")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        self.au_mot("biologiste marine")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.3)
        cad = self.carte(7.4, 3.35, P(2.65, 1.72), GREY_B).set_fill(MER, 1)
        place = [P(-0.4 + 0.85 * (k % 5), 2.62 if k < 5 else 1.62) for k in range(10)]
        tortues = [tortue(0.8).move_to(place[k]) for k in (0, 1, 2, 5, 6, 7, 3, 4)]   # 8 tortues = 200 (une pour 25)
        self.au_mot("une réserve")
        self.play(FadeIn(cad), run_time=0.3)
        x0 = -6.2
        self.ligne([("La réserve :", WHITE, None), ("200 tortues.", TERME, "200")], -0.45, x=x0, fs=38,
                   avec_k={1: [LaggedStart(*[FadeIn(t, scale=0.6) for t in tortues], lag_ratio=0.12)]}, rt=0.6)
        sortie = Arrow(P(3.7, 2.62), P(5.85, 2.62), buff=0, color=RAISON, stroke_width=6, tip_length=0.2)
        moins = self.t("− 25 %", 30, RAISON).next_to(sortie, DOWN, buff=0.12)
        partent = tortues[6:]
        self.ligne([("Chaque année,", WHITE, "Chaque année"), ("25 %", RAISON, "25 %"),
                    ("quittent la zone,", WHITE, "quittent")], -1.1, x=x0, fs=38,
                   avec_k={1: [GrowArrow(sortie), FadeIn(moins, scale=1.3),
                               *[t[2].animate.set_fill(RAISON) for t in partent]],
                           2: [*[t.animate.move_to(P(5.4, 2.62)).set_opacity(0) for t in partent]]}, rt=0.8)
        self.remove(*partent)
        entree = Arrow(P(5.85, 1.0), P(3.7, 1.0), buff=0, color=JUSTE, stroke_width=6, tip_length=0.2)
        plus = self.t("+ 100", 30, JUSTE).next_to(entree, UP, buff=0.12)
        bebes = [tortue(0.62, "#65a30d", "#bef264").move_to(P(3.9 + 0.65 * k, 0.48)) for k in range(4)]
        self.ligne([("et", WHITE, None), ("100 jeunes tortues", JUSTE, "100 jeunes"), ("arrivent.", WHITE, "arrivent")],
                   -1.75, x=x0, fs=38,
                   avec_k={1: [GrowArrow(entree), FadeIn(plus, scale=1.3), *[FadeIn(b) for b in bebes]],
                           2: [*[b.animate.move_to(place[k]) for b, k in zip(bebes, (3, 4, 8, 9))]]}, rt=0.9)
        self.ligne([("Combien de tortues", JAUNE_TITRE, "combien de tortues"),
                    ("sur le long terme ?", JAUNE_TITRE, "sur le long")], -2.6, x=x0, fs=40)
        self.attendre_voix(marge=0.5)

    # ── 02 : l'énoncé : quatre questions en blocs qui s'allument ───────────

    def ecran_enonce(self):
        self.nouvel_ecran("02-enonce")
        self.titre("L'énoncé", JAUNE_TITRE, 46, extrait="L'énoncé")
        self.ligne([("On note", WHITE, "On note"), ("uₙ", TERME, None), ("le nombre de tortues l'année n,", WHITE,
                                                                         "le nombre")], 2.42, x=None, fs=38)
        self.ligne([("à partir de", GREY_A, "à partir"), ("n = 0 :", GREY_A, "égale 0")], 1.86, x=None, fs=38)
        rec = self.ligne([("u₀ =", TERME, "u indice 0"), ("200", WHITE, "égale 200"), ("et", GREY_A, None),
                          ("uₙ₊₁ =", TERME, "u indice n plus 1"), ("0,75uₙ", WHITE, "0,75"), ("+ 100", RAISON, "plus 100")],
                         1.1, x=None, fs=42)
        self.play(Create(self.encadre(rec, JAUNE_TITRE, 0.18)), run_time=0.3)
        rangs = [[("Démontre par récurrence que", WHITE, "démontre"), ("uₙ ≤ 400", TERME, "à 400")],
                 [("Montre que la suite est", WHITE, "montre"), ("croissante", TERME, "croissante")],
                 [("Déduis-en qu'elle", WHITE, "déduis-en"), ("converge", JUSTE, "converge")],
                 [("Calcule sa", WHITE, "calcule"), ("limite", JUSTE, "limite")]]
        mots = ("Un :", "Deux :", "Trois :", "Quatre :")
        cartes = []
        for k, (r, mot) in enumerate(zip(rangs, mots)):
            y = 0.0 - 0.86 * k
            cadre = RoundedRectangle(width=10.6, height=0.72, corner_radius=0.14, stroke_color=GREY_D, stroke_width=3,
                                     fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-0.95, y))
            rond = Circle(radius=0.25, fill_color=TERME, fill_opacity=1, stroke_width=0)
            rond.move_to(cadre.get_left() + RIGHT * 0.5)
            num = self.t(str(k + 1), 30, WHITE, audit=False).move_to(rond)
            g = self.construire(r, 36, cadre.get_right()[0] - rond.get_right()[0] - 0.55)
            g.move_to(P(0, y)).align_to(rond.get_right() + RIGHT * 0.3, LEFT)
            g.set_z_index(2)                       # le texte par-dessus son cadre (ils arrivent ensemble)
            num.set_z_index(3)
            rond.set_z_index(2)
            self.au_mot(mot)                       # le cadre arrive AVEC son texte (jamais vide)
            cadre.set_stroke(JAUNE_TITRE, width=6)
            anims = [FadeIn(cadre), GrowFromCenter(rond), FadeIn(num)]
            if cartes:
                anims.append(cartes[-1].animate.set_stroke(TERME, width=3))
            self.montrer(g, rt=0.3, avec_k={0: anims})
            cartes.append(cadre)
        self.play(cartes[-1].animate.set_stroke(TERME, width=3), run_time=0.3)
        self.attendre_voix(marge=0.5)

    # ── 03 : question un : la récurrence (les dominos) ─────────────────────

    def dominos(self, y=0.1):
        noms = ("u₀", "u₁", "uₖ", "uₖ₊₁")
        xs = (1.8, 2.55, 3.85, 4.75)
        ds = [Domino(nm, x, y, fs=28) for nm, x in zip(noms, xs)]
        pts = self.t("…", 40, GREY_A, audit=False).move_to(P(3.2, y))
        return ds, pts

    def ecran_recurrence(self):
        self.nouvel_ecran("03-recurrence")
        self.au_mot("Question un")
        self.bandeau(0)
        ds, pts = self.dominos()
        fs, x0 = 36, -6.2
        self.ligne([("Initialisation :", JAUNE_TITRE, "Initialisation"), ("u₀ =", TERME, "u indice 0"),
                    ("200,", WHITE, "égale 200"), ("et 200", WHITE, "et 200"), ("≤ 400.", JUSTE, "à 400")], 2.2, fs=fs,
                   avec_k={0: [*[FadeIn(d, shift=UP * 0.1) for d in ds], FadeIn(pts)],
                           4: [ds[0].bloc.animate.set_fill(JUSTE), Indicate(ds[0].bloc, color=JUSTE)]}, rt=0.5)
        self.ligne([("Hérédité :", JAUNE_TITRE, "Hérédité"), ("supposons", WHITE, "supposons"),
                    ("uₖ ≤ 400", TERME, "à 400")], 1.56, fs=fs, avec_k={2: [Indicate(ds[2].bloc, color=TERME)]})
        self.ligne([("pour un entier naturel k.", WHITE, "pour un entier")], 0.92, fs=fs)
        self.ligne([("Alors", WHITE, "Alors"), ("0,75uₖ", WHITE, "0,75"), ("≤ 300,", RAISON, "à 300")], 0.28, fs=fs)
        self.ligne([("puis", WHITE, "puis"), ("0,75uₖ", WHITE, "0,75"), ("+ 100", RAISON, "plus 100"),
                    ("≤ 400 :", WHITE, "à 400")], -0.36, fs=fs)
        f6 = self.ligne([("uₖ₊₁", JUSTE, "u indice k plus 1"), ("≤ 400.", JUSTE, "à 400")], -1.0, fs=fs,
                        avec_k={1: [*ds[2].tomber(), ds[3].bloc.animate.set_fill(JUSTE)]}, rt=0.5)
        self.play(FadeIn(self.encadre(f6, JUSTE, 0.14)), run_time=0.25)
        self.ligne([("Conclusion :", JAUNE_TITRE, "Conclusion"), ("pour tout entier naturel", WHITE, "pour tout"),
                    ("n,", TERME, None)], -1.84, fs=fs)
        fin = self.ligne([("uₙ", JUSTE, "u indice n"), ("≤ 400.", JUSTE, "à 400")], -2.5, fs=40,
                         avec_k={1: [*ds[0].tomber(), *ds[1].tomber(), ds[1].bloc.animate.set_fill(JUSTE)]}, rt=0.6)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 → C (N = 400) ─────────────────────────────

    def ecran_question1(self):
        g1 = self.construire([("Dans l'hérédité, on suppose", WHITE, "Dans l'hérédité"),
                              ("uₖ ≤ 400,", TERME, "à 400")], 40)
        g2 = self.construire([("et on obtient", WHITE, "et on obtient"), ("uₖ₊₁ ≤ N.", TERME, "u indice k plus 1")], 40)
        g3 = self.construire([("Que vaut", JAUNE_TITRE, "Que vaut"), ("N ?", RAISON, None)], 40)
        ch = [self.choix([(v, v)], 52) for v in ("300", "500", "400")]
        q = self.question_lignes("04-question", [g1, g2, g3], ch, 2, fs=48, largeur=3.85, en_ligne=True)
        self.dire("04b-reponse")
        ok = self.q_reponse(q, 2)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), FadeOut(q.question), FadeOut(q.tete), run_time=0.2)
        c = self.construire([("0,75 ×", WHITE, "0,75 fois"), ("400", WHITE, "400"), ("+ 100", RAISON, "plus 100"),
                             ("= 300 + 100", WHITE, "égale 300"), ("= 400", JUSTE, "égale 400")], 48)
        c[4].shift(RIGHT * 0.3)                 # l'espace avant le cadre : le cadre ne touche pas « 100 »
        c.move_to(P(0, 2.4))
        self.montrer(c)
        self.play(FadeIn(self.encadre(c[4], JUSTE, 0.2)), run_time=0.25)
        dk = Domino("uₖ", -2.75, -1.75, h=1.5, w=0.38, fs=32)
        dk1 = Domino("uₖ₊₁", -1.45, -1.75, h=1.5, w=0.38, fs=32)
        self.play(FadeIn(dk), FadeIn(dk1), run_time=0.3)
        self.ligne([("la propriété se transmet.", JUSTE, "la propriété")], 1.4, x=None, fs=42,
                   avec_k={0: [*dk.tomber(0.36), dk1.bloc.animate.set_fill(JUSTE)]}, rt=0.6)
        self.attendre_voix(marge=0.6)

    # ── 05 : question deux : la suite est croissante ───────────────────────

    def ecran_croissante(self):
        self.nouvel_ecran("05-croissante")
        self.au_mot("Question deux")
        self.bandeau(1)
        nu, grads = self.nuage_tortues(bg=P(2.85, -2.45), hd=P(4.85, 2.05))
        pts = self.points(nu, U[:13])
        plaf = self.trait_u(nu, 400, RAISON, "400")
        ecarts = VGroup(*[Line(nu.G(n, U[n]) + UP * 0.11, nu.G(n, 400) + DOWN * 0.11, color=RAISON, stroke_width=4)
                          for n in (1, 3)])          # arrêtés sous le pointillé, loin de l'axe et de « 400 »
        fs = 40
        self.ligne([("uₙ₊₁ − uₙ", TERME, "u indice n plus 1 moins"), ("= −0,25uₙ", WHITE, "égale moins 0,25"),
                    ("+ 100", WHITE, "plus 100")], 2.1, fs=fs, avec_k={0: self.axes(nu, grads + [self.pousser(pts, 0.06)])},
                   rt=0.6)
        self.ligne([("= 0,25 ×", WHITE, "égale 0,25"), ("(400 − uₙ)", RAISON, "400 moins")], 1.35, fs=fs,
                   avec_k={1: [*self.montrer_trait(plaf), LaggedStart(*[Create(e) for e in ecarts], lag_ratio=0.2)]},
                   rt=0.6)
        self.ligne([("Comme", WHITE, "Comme"), ("uₙ ≤ 400,", TERME, "à 400")], 0.4, fs=fs)
        self.ligne([("cette différence", WHITE, "cette différence")], -0.3, fs=fs)
        self.ligne([("est", WHITE, None), ("positive :", JUSTE, "positive")], -0.98,
                   fs=fs, avec_k={1: [Indicate(ecarts, color=JUSTE, scale_factor=1.15)]}, rt=0.5)
        fin = self.ligne([("la suite est", WHITE, "la suite est"), ("croissante.", JUSTE, "croissante")], -1.95, fs=44,
                         avec_k={1: [Indicate(pts, color=TERME, scale_factor=1.3)]}, rt=0.5)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.18)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 06 : question-pause n° 2 → B (un réel ℓ) ───────────────────────────

    def ecran_question2(self):
        g1 = self.construire([("La suite est", WHITE, None), ("croissante", TERME, "croissante"),
                              ("et majorée par", RAISON, "majorée"), ("400.", RAISON, "400")], 38)
        g2 = self.construire([("Le théorème de convergence monotone", WHITE, "Le théorème")], 38)
        g3 = self.construire([("permet d'affirmer :", WHITE, "permet")], 38)
        cA = self.choix([("elle converge vers", "elle converge"), ("400", "400")], 38)
        cB = self.choix([("elle converge vers un réel", "elle converge"), ("ℓ", None)], 38)
        cC = self.choix([("elle tend vers +∞", "elle tend")], 38)
        q = self.question_lignes("06-question", [g1, g2, g3], [cA, cB, cC], 1, fs=38)
        self.dire("06b-reponse")
        ok = self.q_reponse(q, 1)
        bon = VGroup(q.cartes[1], ok)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), FadeOut(q.question), FadeOut(q.tete), run_time=0.25)
        self.play(bon.animate.scale(0.9).move_to(P(0, 2.55)), run_time=0.3)
        calc = calculatrice(1.5).move_to(P(4.6, -0.9))
        qm = self.t("ℓ = ?", 40, JUSTE, audit=False).next_to(calc, UP, buff=0.3)
        x0 = -6.2
        self.ligne([("Elle converge,", JUSTE, "Elle converge")], 1.15, x=x0, fs=40)
        self.ligne([("mais le théorème ne donne pas", WHITE, "mais le théorème")], 0.4, x=x0, fs=40)
        self.ligne([("la valeur de", WHITE, "la valeur"), ("ℓ :", PIEGE, None)], -0.35, x=x0, fs=40,
                   avec_k={0: [FadeIn(qm, scale=1.3)]})
        fin = self.ligne([("il faut la calculer.", JAUNE_TITRE, "il faut")], -1.3, x=x0, fs=44,
                         avec_k={0: [FadeIn(calc, shift=UP * 0.2)]}, rt=0.4)
        self.play(Indicate(calc, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 07 : questions trois et quatre : converger, puis ℓ = 400 ───────────

    def ecran_limite(self):
        self.nouvel_ecran("07-limite")
        self.au_mot("Questions trois")
        self.bandeau(2)
        nu, grads = self.nuage_tortues(nb=16)
        pts = self.points(nu, U[:17])
        plaf = self.trait_u(nu, 400, RAISON, "400")
        lim = self.trait_u(nu, 400, JUSTE, dessus="ℓ = 400")
        self.play(*self.axes(nu, grads), *self.montrer_trait(plaf), self.pousser(pts, 0.05), run_time=0.8)
        fs = 40
        self.ligne([("Croissante et majorée :", WHITE, "Croissante")], 2.2, fs=40)
        self.ligne([("la suite converge", WHITE, "la suite converge")], 1.53, fs=40,
                   avec_k={0: [Indicate(pts[8:], color=JUSTE, scale_factor=1.3)]}, rt=0.5)
        self.ligne([("vers un réel", WHITE, "vers un réel"), ("ℓ,", JUSTE, None)], 0.86, fs=40)
        self.ligne([("et", GREY_A, "et l"), ("ℓ =", JUSTE, None), ("0,75ℓ", WHITE, "0,75"), ("+ 100.", WHITE, "plus 100")],
                   0.02, fs=46, avec_k={0: self.allumer_etape(3)})
        self.ligne([("Donc", GREY_A, "Donc"), ("0,25ℓ =", WHITE, "0,25"), ("100,", WHITE, "100")], -0.82, fs=46)
        fin = self.ligne([("et", GREY_A, "et l égale"), ("ℓ = 400", JUSTE, "400"), ("tortues.", JUSTE, "tortues")],
                         -1.8, fs=50, avec_k={1: [FadeOut(plaf), *self.montrer_trait(lim)]}, rt=0.5)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.2)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 08 : le piège : uₙ₊₁ = 1,5uₙ − 200, même ℓ = 400, mais → −∞ ─────────

    def ecran_piege(self):
        self.nouvel_ecran("08-piege")
        tit = self.t("Voilà le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        nu = NuageTermes((0, 4.4), (-700, 480), P(3.0, -2.5), P(4.85, 2.25), fs=26)
        grads = []
        rouges = self.points(nu, W[:5], PIEGE)
        l400 = self.trait_u(nu, 400, JUSTE, "400")
        tt = tortue(0.8).move_to(P(4.4, 1.2))
        fs = 36
        self.ligne([("Résoudre", WHITE, "Résoudre"), ("ℓ = f(ℓ)", JAUNE_TITRE, "l égale f"), ("ne suffit pas.", PIEGE,
                                                                                         "ne suffit")], 2.3, fs=fs,
                   avec_k={0: self.axes(nu, grads + [FadeIn(tt)])})
        self.ligne([("Avec", WHITE, "Avec"), ("uₙ₊₁ =", TERME, "u indice n plus 1"), ("1,5uₙ", WHITE, "1,5"),
                    ("− 200,", RAISON, "moins 200")], 1.55, fs=fs)
        self.ligne([("on trouve aussi", WHITE, "on trouve"), ("ℓ =", JUSTE, "l égale"), ("400.", JUSTE, "400")], 0.8,
                   fs=fs, avec_k={2: self.montrer_trait(l400)})
        self.ligne([("Mais en partant de", WHITE, "Mais en partant"), ("200 :", TERME, "de 200")], 0.0, fs=fs,
                   avec_k={1: [GrowFromCenter(rouges[0])]})
        self.ligne([("200 ;", TERME, "200"), ("100 ;", TERME, "100"), ("−50…", PIEGE, "50")], -0.8, fs=44,
                   avec_k={1: [GrowFromCenter(rouges[1])], 2: [GrowFromCenter(rouges[2])]})
        self.ligne([("La suite tend vers", WHITE, "La suite tend"), ("−∞ :", PIEGE, "moins l'infini")], -1.65, fs=fs,
                   avec_k={1: [self.pousser(rouges[3:], 0.3)]}, rt=0.5)
        self.ligne([("les tortues disparaissent.", PIEGE, "les tortues")], -2.4, fs=fs,
                   avec_k={0: [tt.animate.set_opacity(0).scale(0.4)]}, rt=0.6)
        self.attendre_voix(marge=0.6)

    # ── 09 : question-pause n° 3 → A (raison 1,5) ──────────────────────────

    def ecran_question3(self):
        g1 = self.construire([("Avec", WHITE, "Avec"), ("u₀ =", TERME, "u indice 0"), ("200", TERME, "égale 200"),
                              ("et", WHITE, None), ("uₙ₊₁ =", TERME, "u indice n plus 1"), ("1,5uₙ", TERME, "1,5"),
                              ("− 200,", TERME, "moins 200")], 40)
        g2 = self.construire([("la suite", WHITE, "la suite"), ("uₙ −", RAISON, "u indice n moins"),
                              ("400", RAISON, "400")], 40)
        g3 = self.construire([("est géométrique de raison :", WHITE, "est géométrique")], 40)
        ch = [self.choix([(v, e)], 52) for v, e in (("1,5", "1,5"), ("−200", "200"), ("0,5", "0,5"))]
        q = self.question_lignes("09-question", [g1, g2, g3], ch, 0, fs=48, largeur=3.85, en_ligne=True)
        self.dire("09b-reponse")
        ok = self.q_reponse(q, 0)
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), FadeOut(q.question), FadeOut(q.tete), run_time=0.2)
        f = self.ligne([("uₙ −", RAISON, "u indice n moins"), ("400", RAISON, "400"), ("= −200", WHITE, "égale moins 200"),
                        ("× 1,5ⁿ", RAISON, "1,5 puissance")], 2.4, x=None, fs=48)
        # les écarts à 400 : 200, 300, 450, 675 : ils grandissent (× 1,5)
        base = -3.05
        barres = VGroup(*[Rectangle(width=0.55, height=200 * 1.5 ** k * 0.0024, fill_color=RAISON, fill_opacity=1,
                                    stroke_width=0).move_to(P(1.6 + 0.85 * k, 0)).align_to(P(0, base), DOWN)
                          for k in range(4)])
        sol = Line(P(1.15, base), P(4.65, base), stroke_color=GREY_B, stroke_width=3)
        leg = VGroup(self.t("l'écart à 400", 30, GREY_A, audit=False),
                     self.t("× 1,5 chaque année", 30, RAISON, audit=False)).arrange(DOWN, aligned_edge=RIGHT, buff=0.12)
        leg.next_to(sol, LEFT, buff=0.3).align_to(P(0, base + 0.05), DOWN)
        self.ligne([("1,5 >", JAUNE_TITRE, "1,5 est plus"), ("1 :", JAUNE_TITRE, "que 1")], 1.25, x=-1.8, fs=42,
                   avec_k={0: [FadeIn(sol), FadeIn(leg), LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres], lag_ratio=0.25)]},
                   rt=0.6)
        self.ligne([("donc la suite tend vers", WHITE, "donc la suite"), ("−∞.", PIEGE, "moins l'infini")], 0.45,
                   x=-1.8, fs=40)
        self.attendre_voix(marge=0.6)

    # ── 10 : le défi : u₀ = 0, uₙ₊₁ = √(uₙ + 12) ───────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("10-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        nu = NuageTermes((0, 10.5), (0, 5.4), P(2.5, -2.5), P(4.85, 2.25), fs=26)
        grads = self.graduer(nu, (5, 10))
        pts = self.points(nu, D[:5])
        qm = self.t("?", 48, JUSTE, audit=False).move_to(nu.G(8, 2.6))
        self.ligne([("Soit", WHITE, "Soit u"), ("u₀ =", TERME, None), ("0", WHITE, "égale 0"),
                    ("et, pour tout", WHITE, "et, pour")], 2.2, fs=40,
                   avec_k={2: self.axes(nu, grads + [GrowFromCenter(pts[0])])})
        self.ligne([("entier naturel", WHITE, "entier naturel"), ("n :", TERME, None)], 1.55, fs=40)
        self.ligne([("uₙ₊₁ =", TERME, "u indice n plus 1"), ("√(uₙ", WHITE, "racine"), ("+ 12)", RAISON, "plus 12")],
                   0.7, fs=48, avec_k={2: [self.pousser(pts[1:], 0.25)]}, rt=0.7)
        self.ligne([("On admet :", GREY_A, "On admet"), ("elle converge", WHITE, "la suite converge")], -0.2, fs=40)
        self.ligne([("vers un réel", WHITE, "vers un réel"), ("ℓ positif.", JUSTE, "positif")], -0.85, fs=40,
                   avec_k={1: [FadeIn(qm, scale=1.4)]})
        self.ligne([("Quelle équation vérifie ℓ ?", JAUNE_TITRE, "Quelle équation")], -1.65, fs=40)
        self.ligne([("Que vaut ℓ ?", JAUNE_TITRE, "Que vaut")], -2.3, fs=40)
        self.defi_pause(-3.05, x=-2.2)
        self._defi = (tit, nu, pts, qm)

    def ecran_correction(self):
        self.dire("10b-correction")
        tit, nu, pts, qm = self._defi
        garder = {id(x) for m in (tit, nu, pts, self._margo) for x in m.get_family()}
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        autres = [m for m in self.mobjects if id(m) not in garder]
        self.play(*[FadeOut(m) for m in autres], ReplacementTransform(tit, cor), run_time=0.4)
        self.remove(*autres)
        suite = self.points(nu, D[5:11], n0=5)
        l4 = self.trait_u(nu, 4, JUSTE, dessus="ℓ = 4")
        fs = 40
        self.ligne([("On passe à la limite :", WHITE, "On passe")], 2.25, fs=fs,
                   avec_k={0: [self.pousser(suite, 0.12)]}, rt=0.7)
        self.ligne([("ℓ =", JUSTE, "l égale"), ("√(ℓ", WHITE, "racine"), ("+ 12)", WHITE, "plus 12")], 1.5, fs=46)
        self.ligne([("On élève au carré :", GREY_A, "On élève")], 0.8, fs=fs)
        self.ligne([("ℓ² =", JUSTE, "l au carré égale"), ("ℓ + 12,", WHITE, "l plus 12")], 0.15, fs=44)
        self.ligne([("soit", GREY_A, "soit"), ("ℓ² − ℓ −", WHITE, "l au carré moins"), ("12", WHITE, "12"),
                    ("= 0.", WHITE, "égale 0")], -0.55, fs=44)
        sol = self.ligne([("Les solutions :", GREY_A, "Les solutions"), ("4", JUSTE, "4"), ("et", WHITE, None),
                          ("−3.", PIEGE, "moins 3")], -1.3, fs=fs)
        fin = self.ligne([("Comme ℓ est positif,", WHITE, "Comme l"), ("ℓ = 4.", JUSTE, "l égale 4")], -2.3, fs=42,
                         avec_k={0: [Create(self.rayer(sol[3]))], 1: self.montrer_trait(l4)}, rt=0.5)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.22)), run_time=0.3)   # une vraie marge intérieure
        self.attendre_voix(marge=0.6)

    # ── 11 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        def base(l):
            """La ligne de base : le bas d'une lettre sans jambage (a, e, n, o…), sinon le bas de la ligne."""
            gl = [m for morceau in l for m in morceau]
            car = glyphes(" ".join(l.textes))
            k = next((i for i, c in enumerate(car) if c in "acemnorsuvwxz0123456789"), None)
            return gl[k].get_bottom()[1] if k is not None else l.get_bottom()[1]
        J = JAUNE_TITRE
        points = [[[("Au bac :", J, "Au bac"), ("on borne la suite par récurrence,", WHITE, "on borne")],
                   [("on étudie son sens de variation,", WHITE, "on étudie")],
                   [("le théorème de convergence monotone", WHITE, "le théorème")],
                   [("donne la convergence,", JUSTE, "donne la convergence")],
                   [("puis", WHITE, "puis"), ("ℓ = f(ℓ)", J, "l égale"), ("donne la limite.", JUSTE, "donne la limite")]],
                  [[("Mais", PIEGE, "Mais"), ("ℓ = f(ℓ), seul,", J, "l égale f de l, seul")],
                   [("ne prouve jamais la convergence.", PIEGE, "ne prouve")]]]
        self.nouvel_ecran("11-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, J).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        blocs = []
        for pt in points:
            lignes = VGroup(*[self.construire(l, 42, 1e9) for l in pt]).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
            for k, l in enumerate(lignes):      # même pas entre les lignes de base
                if k:
                    l.shift(UP * (base(lignes[0]) - 0.66 * k - base(l)))
            blocs.append(VGroup(self.coche(), lignes).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if tout.width > 11.0:
            tout.scale_to_fit_width(11.0)
        if tout.height > 6.0:
            tout.scale_to_fit_height(6.0)
        tout.move_to(P(-0.4, -0.45))
        for bloc in blocs:
            for k, l in enumerate(bloc[1]):
                self.montrer(l, rt=0.3, avec_k={0: [Create(bloc[0])]} if k == 0 else None)
        self.attendre_voix(marge=0.8)

    def construct(self):
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_enonce, self.ecran_recurrence,
                  self.ecran_question1, self.ecran_croissante, self.ecran_question2, self.ecran_limite,
                  self.ecran_piege, self.ecran_question3, self.ecran_defi, self.ecran_correction,
                  self.ecran_appris, lambda: self.fin("12-abonne")]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (e == self.ecran_correction and "10" in choix.split(",")):
                e()
