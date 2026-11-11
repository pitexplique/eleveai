# suite_defi.py
# EleveAI — Maths Terminale (spé) — paysage « Suites : un exercice de bac »
# (16:9), ceinture BLEUE (le défi). Série SUITES du lycée, épisode 32.
# Micro du coach : suite_defi (notion suite_numerique) :
# lib/tutor-v4/questionBank/terminale-spe/maths/suites.bank.ts + suites-renfort.ts.
#
# Ce que demande le coach → écran :
#   · la relation uₙ₊₁ = a uₙ + b d'une situation (genDefiChaine, situationAffine) → 01, 03 ;
#   · vₙ = uₙ − ℓ géométrique, sa raison, v₀ (genDefiChaine q = 1, 2, H_BAC)       → 05 ;
#   · la forme explicite uₙ = ℓ + v₀ × aⁿ (genAffineExpl : piège « oublier ℓ »)   → 06 (A) ;
#   · la limite : 0 < a < 1, aⁿ → 0 (genDefiChaine q = 3)                         → 07 ;
#   · le seuil : calculatrice ou logarithme (genDefiChaine q = 4, seuilGeo)       → 08, 09 (C) ;
#   · le point fixe ℓ = a ℓ + b (fixed_3, fixed_4, h1, pointFixe)                  → 10-piege ;
#   · l'enchaînement complet (chaine5)                                           → 11 défi + correction.
# Clé de voix → écran :
#   00-garde (le nuage des abonnés qui monte et se tasse sous un plafond) · 01 Lina,
#   data analyst : la plateforme de séries, 4 000 abonnés, − 10 % qui partent,
#   + 600 qui arrivent, la jauge « 5 500 ? » · 02 l'énoncé : les 5 questions en
#   blocs qui s'allument un à un · 03 le modèle (bloc 1) : la machine × 0,9 puis
#   + 600, u₀ = 4 000, u₁ = 4 200 · 04/04b question (B : ni arithmétique ni
#   géométrique) · 05 la suite auxiliaire (bloc 2) : la ligne u, la ligne v,
#   « − 6 000 » d'une case à l'autre, « × 0,9 » dans la ligne v · 06/06b question
#   (A : uₙ = 6 000 − 2 000 × 0,9ⁿ) · 07 la limite (bloc 4) : le nuage sous le
#   plafond 6 000, les écarts orange qui rétrécissent · 08 le seuil (bloc 5) :
#   le trait 5 500, u₁₃ dessous, u₁₄ dessus · 09/09b question (C : le sens de
#   l'inégalité change) · 10 le piège : ni 4 000 ni 600, le point fixe ·
#   11/11b défi (le cinéma, 300 cartes, − 20 %, + 100) : les étapes en blocs ·
#   12 « Ce que tu as appris » · 13 fin.
# Code couleur (module commun) : bleu = termes uₙ, violet = la suite auxiliaire
# vₙ, orange = la raison et les écarts, vert = juste, rouge = piège.
# ⛔ Pas de LaTeX. Voix : manim/voix/terminale-suite-defi.json (débit −6),
# calée mot à mot par suite_defi_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/terminale/suite_defi.py SuiteDefiTle -o eleveai-maths-terminale-suite-defi --media_dir manim/scripts/terminale/media-suite-defi
# Sortie : manim/sorties/terminale/maths/suites/32-defi/

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
U = [4000.0]
for _ in range(40):
    U.append(0.9 * U[-1] + 600)
assert abs(U[1] - 4200) < 1e-9 and abs(0.9 * 4000 - 3600) < 1e-9          # u₁ = 3 600 + 600
assert all(abs(U[n] - (6000 - 2000 * 0.9 ** n)) < 1e-6 for n in range(40))  # uₙ = 6 000 − 2 000 × 0,9ⁿ
assert abs(0.9 * 6000 + 600 - 6000) < 1e-9 and 600 - 6000 == -5400 and 4000 - 6000 == -2000
assert round(U[13], 1) == 5491.6 and round(U[14], 1) == 5542.5              # le seuil 5 500
assert U[13] < 5500 < U[14] and 0.9 ** 13 > 0.25 > 0.9 ** 14
assert abs(math.log(0.25) / math.log(0.9) - 13.16) < 0.005 and math.log(0.9) < 0
C = [300.0]
for _ in range(40):
    C.append(0.8 * C[-1] + 100)
assert all(abs(C[n] - (500 - 200 * 0.8 ** n)) < 1e-6 for n in range(40))   # le défi
assert abs(0.8 * 500 + 100 - 500) < 1e-9 and 100 - 500 == -400 and 300 - 500 == -200

PEAU, PULL, VIOLET = "#8d5524", "#0D9488", "#C084FC"
INDICES = set("₀₁₂₃₄₅₆₇₈₉₊₋ₖₙₚ")
_GL = {}


def avance_morceaux(scene, textes):
    """L'audit des morceaux (construire ne passe pas par Text) : un nombre
    montré doit avoir été dit AVANT le curseur de la voix."""
    if os.environ.get("AUDIT") != "1":
        return
    serrer = lambda s: re.sub(r"(?<=\d)\s(?=\d{3}(?!\d))", "", s)  # noqa: E731  « 4 000 » → « 4000 »
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


def lina(s=1.0):
    """Lina, data analyst : cheveux en chignon, pull vert d'eau, l'ordinateur et sa courbe."""
    tete = Circle(radius=0.3, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    cheveux = Sector(radius=0.33, angle=PI, start_angle=0, fill_color="#111827", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.24))
    chignon = Circle(radius=0.14, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(0, 1.5))
    corps = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.3, fill_color=PULL, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    ecran = RoundedRectangle(width=0.95, height=0.62, corner_radius=0.05, fill_color="#0f172a", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2).move_to(P(0.62, -0.25))
    courbe = VMobject(stroke_color=JUSTE, stroke_width=3).set_points_smoothly(
        [P(0.24, -0.45), P(0.45, -0.3), P(0.65, -0.18), P(0.85, -0.12), P(1.0, -0.1)])
    clavier = Polygon(P(0.1, -0.58), P(1.14, -0.58), P(1.26, -0.72), P(-0.02, -0.72), fill_color=GREY_B,
                      fill_opacity=1, stroke_width=0)
    return VGroup(corps, tete, cheveux, chignon, ecran, courbe, clavier).scale(s)


def abonne(s=1.0, couleur=TERME):
    """Un abonné : une tête et des épaules."""
    t = Circle(radius=0.12, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, 0.2))
    b = Sector(radius=0.2, angle=PI, start_angle=0, fill_color=couleur, fill_opacity=1, stroke_width=0)
    b.move_to(P(0, -0.04))
    return VGroup(t, b).scale(s)


def plateforme(s=1.0):
    """L'écran de la plateforme de séries : le cadre, le bouton lecture, le pied."""
    cadre = RoundedRectangle(width=2.6, height=1.6, corner_radius=0.1, fill_color="#111827", fill_opacity=1,
                             stroke_color=GREY_A, stroke_width=4)
    lecture = Triangle(fill_color=PIEGE, fill_opacity=1, stroke_width=0).scale(0.28).rotate(-PI / 2)
    pied = Line(P(0, -0.8), P(0, -1.05), stroke_color=GREY_A, stroke_width=6)
    socle = Line(P(-0.45, -1.07), P(0.45, -1.07), stroke_color=GREY_A, stroke_width=6)
    return VGroup(cadre, lecture, pied, socle).scale(s)


def cinema(s=1.0):
    """Le cinéma : la toile, le rideau, trois rangées de fauteuils."""
    toile = Rectangle(width=2.6, height=1.15, fill_color="#e2e8f0", fill_opacity=0.9, stroke_width=0)
    rideau = VGroup(*[Rectangle(width=0.22, height=1.35, fill_color=PIEGE, fill_opacity=1, stroke_width=0)
                      .next_to(toile, d, buff=0) for d in (LEFT, RIGHT)])
    sieges = VGroup(*[RoundedRectangle(width=0.3, height=0.24, corner_radius=0.06, fill_color="#7f1d1d",
                                       fill_opacity=1, stroke_width=0).move_to(P(-1.05 + 0.42 * i, -0.95 - 0.34 * r))
                      for r in range(3) for i in range(6)])
    return VGroup(toile, rideau, sieges).scale(s)


def calculatrice(s=1.0):
    boite = RoundedRectangle(width=0.8, height=1.1, corner_radius=0.08, fill_color=GREY_D, fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2)
    ecran = Rectangle(width=0.62, height=0.26, fill_color="#bbf7d0", fill_opacity=1, stroke_width=0)
    ecran.move_to(boite.get_top() + DOWN * 0.24)
    touches = VGroup(*[Square(0.12, fill_color=GREY_B, fill_opacity=1, stroke_width=0)
                       .move_to(P(-0.22 + 0.22 * i, -0.08 - 0.2 * r)) for r in range(3) for i in range(3)])
    return VGroup(boite, ecran, touches).scale(s)


ETAPES = ("Modèle", "Suite v", "Formule", "Limite", "Seuil")


class SuiteDefiTle(PaysageSuites):
    fichier_marques = "suite_defi_marques.json"
    nom_voix = "terminale-suite-defi"
    identite = "Maths Tle — EleveAI"
    ceinture = "bleue"
    largeur_bouton = 9.4
    hauteur_bouton = 0.74
    place_coche = 1.4

    # ── outils de l'épisode (ceux des ép. 28 à 31) ─────────────────────────

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

    def montrer(self, g, avec=(), rt=0.25, avec_k=None):
        """Chaque morceau quand la voix dit son extrait (None : avec le précédent) ;
        avec_k = {k: [animations]} : jouées avec le morceau k."""
        avec_k = avec_k or {}
        paquet = []

        def jouer(fin=()):
            avance_morceaux(self, [g.textes[k] for k in paquet if hasattr(g, "textes")])
            anims = [FadeIn(g[k], shift=UP * 0.1) for k in paquet]
            for k in paquet:
                anims += list(avec_k.get(k, ()))
            self.play(*anims, *fin, run_time=rt if fin else 0.22)
        for k, ex in enumerate(g.extraits):
            if ex is not None and paquet:
                jouer()
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(k)
        jouer(list(avec) or [Wait(0.01)])
        return g

    def ligne(self, morceaux, y, x=None, fs=40, avec=(), larg=None, avec_k=None, rt=0.25):
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k)

    def choix(self, pieces, fs=36):
        """Le corps d'un bouton en morceaux [(texte, extrait), …] : chaque
        morceau quand la voix le dit (q_montrer_choix → montrer_liste)."""
        g = self.construire([(m, WHITE, ex) for m, ex in pieces], fs, 1e9)
        g.nombres, g.seps = list(g), [VMobject() for _ in g[1:]]
        return g

    def montrer_liste(self, g, extraits=None, run_time=0.18):
        return super().montrer_liste(g, extraits or getattr(g, "extraits", None), run_time)

    def question_lignes(self, cle, groupes, choix, bonne, **kw):
        """poser_question, chaque ligne de la question en morceaux (construire),
        chaque morceau à sa voix."""
        liste = [(g, None) for g in groupes]

        def dessin():
            for g in groupes:
                self.montrer(g, rt=0.22)
            liste.clear()                     # poser_question ne les remontre pas
        return self.poser_question(cle, liste, choix, bonne, dessin=dessin, **kw)

    def rayer(self, mob, couleur=PIEGE):
        """Barré d'UN trait fin, à mi-hauteur : le texte reste lisible dessous."""
        y = mob.get_center()[1]
        return Line(P(mob.get_left()[0] - 0.08, y), P(mob.get_right()[0] + 0.08, y)).set_stroke(couleur, 4)

    def gauche(self, m, y, x=-6.2):
        return m.move_to(P(0, y)).align_to(P(x, 0), LEFT)

    def case(self, texte, couleur=TERME, l=1.5, h=0.74, fs=36, audit=True):
        """Une case (cadre à marge intérieure ≥ 20 px) et son texte."""
        tx = self.t(texte, fs, WHITE, audit=audit)
        l = max(l, tx.width + 0.4)
        cadre = RoundedRectangle(width=l, height=max(h, tx.height + 0.34), corner_radius=0.12, stroke_color=couleur,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        return VGroup(cadre, tx.move_to(cadre))

    def etiquette(self, texte, couleur, fs=30, audit=True):
        """Une étiquette encadrée (marge intérieure 0,2 ≈ 27 px)."""
        tx = self.t(texte, fs, couleur, audit=audit)
        cadre = SurroundingRectangle(tx, color=couleur, buff=0.2, stroke_width=3, corner_radius=0.1)
        cadre.set_fill(FOND_CARTE, 1)
        return VGroup(cadre, tx)

    # ── le bandeau des cinq étapes (03 à 08) ───────────────────────────────

    def bandeau(self, actif, extrait):
        """Les cinq étapes en blocs, en haut : les faites en vert, puis celle du
        jour s'allume (contour jaune épais) quand la voix dit « Question … »."""
        blocs = VGroup()
        for i, nom in enumerate(ETAPES):
            tx = self.t(f"{i + 1} · {nom}", 26, WHITE if i <= actif else GREY_B, audit=False)
            cadre = RoundedRectangle(width=2.4, height=0.62, corner_radius=0.12, fill_color=FOND_CARTE,
                                     fill_opacity=1, stroke_width=3,
                                     stroke_color=JUSTE if i < actif else (JAUNE_TITRE if i == actif else GREY_D))
            if i == actif:
                cadre.set_stroke(width=7)
            blocs.add(VGroup(cadre, tx.move_to(cadre)))
        blocs.arrange(RIGHT, buff=0.15).move_to(P(0, 3.2))
        self.play(FadeIn(blocs), run_time=0.3)          # « Question … » ouvre la voix : allumé d'emblée
        self.insister(blocs[actif], 1.1)
        self._bandeau = blocs
        return blocs

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def nuage_garde(self):
        """Les abonnés mois après mois : le nuage monte, puis se tasse sous un
        plafond ; les écarts orange au plafond rétrécissent."""
        nu = NuageTermes((0, 20.5), (3700, 6250), P(-5.6, -1.62), P(3.9, -1.08), fs=24)
        plaf = DashedLine(nu.G(0, 6000), nu.G(20.5, 6000), color=RAISON, stroke_width=4, dash_length=0.12)
        pts = [nu.point(n, U[n], r=0.065) for n in range(21)]
        ecarts = [Line(nu.G(n, U[n]) + UP * 0.07, nu.G(n, 6000), color=RAISON, stroke_width=5)
                  for n in (0, 4, 8, 12, 16)]
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), run_time=0.35)
        self.play(LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.15), run_time=1.4)
        self.play(Create(plaf), run_time=0.4)
        self.play(LaggedStart(*[Create(e) for e in ecarts], lag_ratio=0.3), run_time=0.9)

    def ecran_garde(self):
        self.garde("Suites",
                   [("un exercice de bac", "un exercice", TERME),
                    ("Une plateforme perd des abonnés chaque mois,", "Une plateforme"),
                    ("et en gagne d'autres.", "et en gagne"),
                    ("Combien en aura-t-elle sur le long terme ?", "Combien")],
                   dessin=self.nuage_garde, extrait_titre="Suites")

    # ── 01 : Lina et la plateforme de séries ───────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = lina(1.05).move_to(P(-5.0, 1.75))
        nom = self.t("Lina", 42, JAUNE_TITRE).next_to(perso, DOWN, buff=0.25)
        metier = self.t("data analyst", 32, TERME).next_to(nom, DOWN, buff=0.1)
        self.au_mot("Lina")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        self.au_mot("data analyst")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.35)
        ecr = plateforme(1.05).move_to(P(-0.4, 1.35))
        lab = self.t("plateforme de séries", 30, GREY_A).next_to(ecr, DOWN, buff=0.15)
        self.au_mot("plateforme")
        self.play(FadeIn(ecr, shift=UP * 0.15), run_time=0.4)
        self.au_mot("séries")
        self.play(FadeIn(lab), Indicate(ecr[1], color=PIEGE, scale_factor=1.3), run_time=0.35)
        X = 4.25
        compteur = self.t("4 000", 54).move_to(P(X, 1.85))
        ab = self.t("abonnés", 32, TERME).next_to(compteur, DOWN, buff=0.12)
        mc = self.t("ce mois-ci", 28, GREY_A).next_to(ab, DOWN, buff=0.08)
        foule = VGroup(*[abonne(0.9) for _ in range(8)]).arrange(RIGHT, buff=0.06).move_to(P(X, 3.0))
        self.suivre("4 000")
        self.play(GrowFromCenter(compteur), LaggedStart(*[FadeIn(a, shift=DOWN * 0.15) for a in foule],
                                                        lag_ratio=0.1), run_time=0.5)
        self.au_mot("abonnés")
        self.play(FadeIn(ab, shift=UP * 0.08), run_time=0.25)
        self.au_mot("ce mois-ci")
        self.play(FadeIn(mc, shift=UP * 0.08), run_time=0.25)
        # EN BAS : ceux qui partent (orange, à gauche) et ceux qui arrivent (verts, à droite)
        y = -1.15
        sortie = Arrow(P(-1.9, y), P(-3.9, y), buff=0, color=RAISON, stroke_width=6, tip_length=0.22)
        partent = self.construire([("− 10 %", RAISON, "10 %"), ("partent", RAISON, "partent")], 36)
        partent.next_to(sortie, DOWN, buff=0.18)
        entree = Arrow(P(4.4, y), P(1.3, y), buff=0, color=JUSTE, stroke_width=6, tip_length=0.22)
        arrivent = self.construire([("+ 600", JUSTE, "600"), ("arrivent", JUSTE, "arrivent")], 36)
        arrivent.next_to(entree, DOWN, buff=0.18)
        self.au_mot("Chaque mois")
        quitte = VGroup(*[abonne(0.9, RAISON).move_to(P(-1.6, y + 0.35)) for _ in range(3)])
        self.montrer(partent, avec_k={0: [GrowArrow(sortie), FadeIn(quitte)]})
        self.play(*[a.animate.move_to(P(-2.4 - 0.65 * k, y + 0.35)) for k, a in enumerate(quitte)],
                  Indicate(partent, color=RAISON, scale_factor=1.08), run_time=0.6)
        viennent = VGroup(*[abonne(0.9, JUSTE).move_to(P(4.7, y + 0.35)) for _ in range(3)])
        self.montrer(arrivent, avec_k={0: [GrowArrow(entree), FadeIn(viennent)]})
        self.play(*[a.animate.move_to(P(2.0 + 0.65 * k, y + 0.35)) for k, a in enumerate(viennent)],
                  Indicate(arrivent, color=JUSTE, scale_factor=1.08), run_time=0.6)
        # la question de la directrice, morceau par morceau
        q = self.construire([("Dépasser un jour", WHITE, "dépassera"), ("5 500 abonnés ?", JAUNE_TITRE, "5 500"),
                             ("Et quand ?", JAUNE_TITRE, "et quand")], 38, 10.6)
        q.move_to(P(-0.5, -2.75))
        self.au_mot("Sa directrice")
        self.play(Indicate(ecr, color=WHITE, scale_factor=1.05), run_time=0.4)
        self.montrer(q)
        self.insister(q[1:], 1.1)
        self.attendre_voix(marge=0.5)

    # ── 02 : l'énoncé : cinq questions en blocs qui s'allument ─────────────

    def ecran_enonce(self):
        self.nouvel_ecran("02-enonce")
        self.titre("L'énoncé", JAUNE_TITRE, 46, extrait="L'énoncé")
        self.ligne([("On note", WHITE, "On note"), ("uₙ", TERME, None), ("le nombre d'abonnés au mois n,", WHITE,
                                                                         "le nombre"),
                    ("à partir de", GREY_A, "à partir"), ("n = 0", GREY_A, "0")], 2.35, fs=34)
        rangs = [[("Justifie que", WHITE, "justifie"), ("uₙ₊₁ =", TERME, "u indice n plus 1"), ("0,9 uₙ", TERME, "0,9"),
                  ("+ 600", TERME, "600")],
                 [("vₙ = uₙ", VIOLET, "v indice n"), ("− 6 000,", VIOLET, "6 000"),
                  ("montre que v est géométrique", WHITE, "montre")],
                 [("Exprime", WHITE, "exprime"), ("uₙ", TERME, None)],
                 [("Trouve la limite", WHITE, "trouve la limite")],
                 [("Trouve le mois où l'on dépasse", WHITE, "trouve le mois"), ("5 500 abonnés", JAUNE_TITRE, "5 500")]]
        mots = ("Un :", "Deux :", "Trois :", "Quatre :", "Cinq :")
        cartes = []
        for k, (r, mot) in enumerate(zip(rangs, mots)):
            y = 1.45 - 0.9 * k
            cadre = RoundedRectangle(width=11.8, height=0.74, corner_radius=0.14, stroke_color=GREY_D, stroke_width=3,
                                     fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-0.4, y))
            rond = Circle(radius=0.25, fill_color=TERME, fill_opacity=1, stroke_width=0)
            rond.move_to(cadre.get_left() + RIGHT * 0.5)
            num = self.t(str(k + 1), 30, WHITE, audit=False).move_to(rond)
            g = self.construire(r, 31, cadre.get_right()[0] - rond.get_right()[0] - 0.55)
            g.move_to(P(0, y)).align_to(rond.get_right() + RIGHT * 0.3, LEFT)
            self.au_mot(mot)
            cadre.set_stroke(JAUNE_TITRE, width=6)
            anims = [FadeIn(cadre), GrowFromCenter(rond), FadeIn(num)]
            if cartes:
                anims.append(cartes[-1].animate.set_stroke(TERME, width=3))
            self.play(*anims, run_time=0.3)
            self.montrer(g, rt=0.22)
            cartes.append(cadre)
        self.play(cartes[-1].animate.set_stroke(TERME, width=3), run_time=0.3)
        self.attendre_voix(marge=0.5)

    # ── 03 : question 1, le modèle (bloc 1) ────────────────────────────────

    def ecran_modele(self):
        self.nouvel_ecran("03-modele")
        self.bandeau(0, "Question un")
        self.ligne([("Perdre", WHITE, "Perdre"), ("10 %", RAISON, "10 %"), ("= multiplier par", WHITE, "multiplier"),
                    ("0,9", RAISON, "0,9")], 2.2, fs=38)
        # la machine : uₙ → × 0,9 (ils partent) → + 600 (ils arrivent) → uₙ₊₁
        y = 0.95
        ca, cb = self.case("uₙ", TERME, fs=38).move_to(P(-4.6, y)), self.case("uₙ₊₁", TERME, fs=38).move_to(P(2.4, y))
        rond = Circle(radius=0.16, color=GREY_B, stroke_width=3).move_to(P(-1.1, y))
        f1 = Arrow(ca.get_right(), rond.get_left(), buff=0.12, color=RAISON, stroke_width=5)
        f2 = Arrow(rond.get_right(), cb.get_left(), buff=0.12, color=RAISON, stroke_width=5)
        e1 = self.t("× 0,9", 34, RAISON, audit=False).next_to(f1, UP, buff=0.12)
        e2 = self.t("+ 600", 34, RAISON).next_to(f2, UP, buff=0.12)
        i1 = VGroup(*[abonne(0.7, RAISON) for _ in range(2)]).arrange(RIGHT, buff=0.05).next_to(f1, DOWN, buff=0.1)
        i2 = VGroup(*[abonne(0.7, JUSTE) for _ in range(2)]).arrange(RIGHT, buff=0.05).next_to(f2, DOWN, buff=0.1)
        bille = Dot(f1.get_start(), radius=0.08, color=TERME)
        self.play(FadeIn(ca), FadeIn(cb), FadeIn(rond), GrowArrow(f1), FadeIn(e1, scale=1.3), FadeIn(i1),
                  MoveAlongPath(bille, Line(f1.get_start(), f1.get_end())), run_time=0.45)
        self.suivre("600")
        self.play(GrowArrow(f2), FadeIn(e2, scale=1.3), FadeIn(i2),
                  MoveAlongPath(bille, Line(f2.get_start(), f2.get_end())), run_time=0.45)
        self.play(FadeOut(bille, scale=2), Indicate(cb, color=TERME), run_time=0.3)
        l1 = self.ligne([("Donc", GREY_A, "Donc"), ("u₀ =", TERME, "u indice 0"), ("4 000,", WHITE, "4 000"),
                         ("et", GREY_A, "et u")], -0.2, x=-6.2, fs=40)
        l2 = self.ligne([("uₙ₊₁ =", TERME, None), ("0,9 uₙ", TERME, "0,9"), ("+ 600", TERME, "600")],
                        -0.2, x=l1.get_right()[0] + 0.4, fs=40)
        cad = self.encadre(l2, JAUNE_TITRE, 0.16)
        self.play(Create(cad), run_time=0.3)
        self.ligne([("Par exemple :", GREY_A, "Par exemple"), ("u₁ =", TERME, "u indice 1"), ("3 600", WHITE, "3 600"),
                    ("+ 600", WHITE, "600"), ("= 4 200", JUSTE, "4 200")], -1.2, x=-6.2, fs=38,
                   avec_k={0: [FadeIn(self._lg_ex())]})
        self.play(FadeIn(self._lg.cases[1][0], scale=0.8), FadeIn(self._lg.cases[1][1], scale=1.4),
                  FadeIn(self._lg.noms[1]), run_time=0.3)
        s = self._lg.saut(0, "× 0,9 puis + 600", cote=UP, fs=26, creux=0.12)
        s[1]._pas_audit = True                         # déjà dits : redessinés sur la flèche
        self.play(Create(s[0]), FadeIn(s[1], scale=1.2), run_time=0.4)
        self.attendre_voix(marge=0.6)

    def _lg_ex(self):
        """La ligne des termes de l'exemple : u₀ (déjà dit) montré d'emblée, u₁ ensuite."""
        lg = LigneTermes(["4 000", "4 200"], xs=(-4.0, -0.6), centre=P(0, -2.78), largeur=1.6, hauteur=0.74, fs=36,
                         noms=["u₀", "u₁"], fs_noms=28)
        lg.cases[0][1]._pas_audit = True
        self._lg = lg
        return VGroup(lg.cases[0], lg.noms[0])

    # ── 04 : question-pause n° 1 → B (ni arithmétique ni géométrique) ──────

    def ecran_question1(self):
        g = self.construire([("La suite", WHITE, "La suite"), ("u", TERME, None), ("est :", WHITE, None)], 40)
        q = self.question_lignes("04-question", [g],
                                 [self.choix([("géométrique", "géométrique"), ("de raison 0,9", "0,9")]),
                                  self.choix([("ni arithmétique", "ni arithmétique"), ("ni géométrique", "ni géo")]),
                                  self.choix([("arithmétique", "arithmétique"), ("de raison 600", "600")])], 1)
        self.dire("04b-reponse")
        ok = self.q_reponse(q, 1)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), run_time=0.25)
        self.play(VGroup(q.cartes[1], ok).animate.move_to(q.cartes[0]), run_time=0.35)
        y = q.cartes[0].get_center()[1]
        self.ligne([("On multiplie par", WHITE, "On multiplie"), ("0,9", RAISON, "0,9"), ("puis on ajoute", WHITE, "puis"),
                    ("600", RAISON, "600")], y - 1.05, fs=40)
        self.ligne([("ni l'un ni l'autre seul", JAUNE_TITRE, "ni l'un")], y - 1.85, fs=40)
        # la suite auxiliaire en cases : une ligne u (bleue), une ligne v (violette) dessous
        lu = VGroup(*[self.case(u(k), TERME, l=1.2, fs=32) for k in range(3)]).arrange(RIGHT, buff=0.35)
        lv = VGroup(*[DashedVMobject(self.case(" ", VIOLET, l=1.2)[0], num_dashes=22) for _ in range(3)])
        lv.arrange(RIGHT, buff=0.35)
        VGroup(lu, lv).arrange(DOWN, buff=0.3).move_to(P(2.6, y - 3.25))
        txt = self.t("D'où la suite auxiliaire", 40, VIOLET).move_to(P(-3.3, y - 3.25))
        self.au_mot("D'où")
        self.play(FadeIn(txt, shift=UP * 0.1), LaggedStart(*[FadeIn(c) for c in lu], lag_ratio=0.2), run_time=0.45)
        self.play(LaggedStart(*[Create(c) for c in lv], lag_ratio=0.25), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 05 : question 2, la suite auxiliaire (bloc 2) ──────────────────────

    def sous_egal(self, g, ref):
        """Aligne le « = » (1er morceau) de g sous le « = » qui finit le morceau ref."""
        g.shift(RIGHT * (ref[-1].get_center()[0] - g[0].get_center()[0]))
        return g

    def ecran_auxiliaire(self):
        self.nouvel_ecran("05-auxiliaire")
        self.bandeau(1, "Question deux")
        # à droite : la ligne u (bleue) et la ligne v (violette), « − 6 000 » de l'une à l'autre
        XA, XB, YU, YV = 2.65, 4.85, 1.55, -0.3
        cu = [self.case(m, TERME, l=1.5, fs=36).move_to(P(x, YU)) for m, x in (("uₙ", XA), ("uₙ₊₁", XB))]
        cv = [self.case(m, VIOLET, l=1.5, fs=36).move_to(P(x, YV)) for m, x in (("vₙ", XA), ("vₙ₊₁", XB))]
        desc = [Arrow(c.get_bottom(), d.get_top(), buff=0.08, color=GREY_B, stroke_width=4) for c, d in zip(cu, cv)]
        moins = [self.t("− 6 000", 24, GREY_A).next_to(f, RIGHT, buff=0.08) for f in desc]
        hu = Arrow(cu[0].get_right(), cu[1].get_left(), buff=0.08, color=RAISON, stroke_width=4)
        lhu = self.t("× 0,9 + 600", 26, RAISON).next_to(hu, UP, buff=0.42)
        hv = Arrow(cv[0].get_right(), cv[1].get_left(), buff=0.08, color=RAISON, stroke_width=5)
        lhv = self.t("× 0,9", 30, RAISON).next_to(hv, DOWN, buff=0.42)
        x0 = -6.2
        l1 = self.construire([("vₙ₊₁ =", VIOLET, "v indice n plus 1"), ("uₙ₊₁", TERME, "u indice n plus 1"),
                              ("− 6 000", WHITE, "6 000")], 38)
        self.gauche(l1, 2.25, x0)
        self.montrer(l1, avec_k={0: [FadeIn(c) for c in cu + cv],
                                 2: [GrowArrow(f) for f in desc] + [FadeIn(m) for m in moins]})
        l2 = self.construire([("=", WHITE, "égale"), ("0,9 uₙ", TERME, "0,9"), ("+ 600", TERME, "600"),
                              ("− 6 000", WHITE, "6 000")], 38)
        self.sous_egal(self.gauche(l2, 1.5, x0), l1[0])
        self.montrer(l2, avec_k={2: [GrowArrow(hu), FadeIn(lhu, scale=1.2)]})
        l3 = self.construire([("=", WHITE, "égale"), ("0,9 uₙ", TERME, "0,9"), ("− 5 400", WHITE, "5 400")], 38)
        self.sous_egal(self.gauche(l3, 0.75, x0), l1[0])
        self.montrer(l3)
        l4 = self.construire([("=", WHITE, "égale"), ("0,9", RAISON, "0,9"), ("×", WHITE, "fois"),
                              ("(uₙ − 6 000)", VIOLET, "6 000")], 38)
        self.sous_egal(self.gauche(l4, 0.0, x0), l1[0])
        self.montrer(l4, avec_k={3: [Indicate(cv[0], color=VIOLET, scale_factor=1.15)]})
        l5 = self.construire([("Donc", GREY_A, "Donc"), ("vₙ₊₁ =", VIOLET, "v indice n plus 1"), ("0,9 vₙ", VIOLET, "0,9"),
                              (":", WHITE, None)], 38)
        self.gauche(l5, -1.3, x0)
        self.montrer(l5, avec_k={2: [GrowArrow(hv), FadeIn(lhv, scale=1.3)]})
        l5b = self.construire([("la suite v est géométrique", JUSTE, "la suite v"), ("de raison 0,9", JUSTE, "0,9")], 38)
        self.gauche(l5b, -2.05, x0 + 0.2)
        self.montrer(l5b)
        cad = self.encadre(l5b, JUSTE, 0.14)
        self.play(Create(cad), Indicate(lhv, color=RAISON, scale_factor=1.25), run_time=0.4)
        l6 = self.construire([("Et", GREY_A, "Et v"), ("v₀ =", VIOLET, None), ("4 000", WHITE, "4 000"),
                              ("− 6 000", WHITE, "6 000"), ("= −2 000", VIOLET, "2 000")], 40)
        self.gauche(l6, -2.95, x0)
        self.montrer(l6)
        self.insister(l6[4], 1.2)
        self.attendre_voix(marge=0.6)

    # ── 06 : question-pause n° 2 → A (uₙ = 6 000 − 2 000 × 0,9ⁿ) ───────────

    def ecran_question2(self):
        g = self.construire([("On en déduit,", WHITE, "On en déduit"), ("pour tout entier naturel n :", WHITE,
                                                                       "pour tout")], 38)
        q = self.question_lignes(
            "06-question", [g],
            [self.choix([("uₙ =", "u indice n"), ("6 000", "6 000"), ("− 2 000", "2 000"), ("× 0,9ⁿ", "0,9")]),
             self.choix([("uₙ =", "u indice n"), ("−2 000", "2 000"), ("× 0,9ⁿ", "0,9")]),
             self.choix([("uₙ =", "u indice n"), ("4 000", "4 000"), ("+ 6 000", "6 000"), ("× 0,9ⁿ", "0,9")])], 0)
        self.dire("06b-reponse")
        ok = self.q_reponse(q, 0)
        y = q.cartes[0].get_center()[1]
        l1 = self.construire([("vₙ =", VIOLET, "v indice n"), ("−2 000", VIOLET, "2 000"), ("× 0,9ⁿ", VIOLET, "0,9")], 40)
        self.gauche(l1, y - 1.1, -6.0)
        cv = self.case("vₙ", VIOLET, l=1.5, fs=36).move_to(P(5.0, y - 1.1))
        cu = self.case("uₙ", TERME, l=1.5, fs=36).move_to(P(5.0, y - 2.75))
        mont = Arrow(cv.get_bottom(), cu.get_top(), buff=0.08, color=JUSTE, stroke_width=5)
        plus = self.t("+ 6 000", 34, JUSTE).next_to(mont, LEFT, buff=0.15)
        self.montrer(l1, avec_k={0: [FadeIn(cv, scale=0.9), FadeOut(q.cartes[1]), FadeOut(q.cartes[2])]})
        l2 = self.construire([("et", GREY_A, "et u"), ("uₙ =", TERME, None), ("vₙ", VIOLET, "v indice n plus"),
                              ("+ 6 000", JUSTE, "6 000")], 40)
        self.gauche(l2, y - 1.95, -6.0)
        self.montrer(l2, avec_k={1: [FadeIn(cu, scale=0.9)], 3: [GrowArrow(mont), FadeIn(plus, scale=1.3)]})
        l3 = self.construire([("On n'oublie pas d'ajouter", JAUNE_TITRE, "on n'oublie"), ("6 000 !", JAUNE_TITRE, "6 000")],
                             40)
        self.gauche(l3, y - 3.0, -6.0)
        self.montrer(l3)
        self.play(Indicate(plus, color=JUSTE, scale_factor=1.25), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 07 : question 4, la limite (bloc 4) : le nuage sous le plafond ─────

    def ecran_limite(self):
        self.nouvel_ecran("07-limite")
        self.bandeau(3, "Question quatre")
        nu = NuageTermes((0, 31), (3800, 6350), P(1.5, -1.85), P(5.9, 2.0), fs=26)
        for n in (10, 20, 30):
            nu.add(nu.graduation_n(n, str(n), 22))
        plaf = DashedLine(nu.G(0, 6000), nu.G(31, 6000), color=GREY_B, stroke_width=4, dash_length=0.12)
        l6000 = self.t("6 000", 26, JUSTE).next_to(plaf, UP, buff=0.12).align_to(plaf, RIGHT)
        pts = [nu.point(n, U[n], r=0.07) for n in range(31)]
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                  *[FadeIn(g) for g in nu[4:]], Create(plaf),
                  LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.1), run_time=0.6)
        x0 = -6.2
        self.ligne([("0,9", RAISON, "0,9"), ("est entre", WHITE, "est entre"), ("0", WHITE, "0"), ("et 1", WHITE, "1")],
                   1.6, x=x0, fs=40)
        # l'écart au plafond (orange) : il part du 1er point et rétrécit en avançant
        def ecart(n):
            return Line(nu.G(n, U[n]) + UP * 0.08, nu.G(n, 6000), color=RAISON, stroke_width=7)
        e = ecart(0)
        le = self.t("écart", 28, RAISON).next_to(e, RIGHT, buff=0.12)
        self.ligne([("donc", GREY_A, "donc"), ("0,9ⁿ", RAISON, "0,9"), ("→ 0", WHITE, "tend vers 0")], 0.6, x=x0, fs=42,
                   avec_k={1: [Create(e), FadeIn(le)]})
        self.play(FadeOut(le), run_time=0.15)
        for n in (5, 12, 20, 30):
            self.play(Transform(e, ecart(n)), run_time=0.15, rate_func=linear)
        l3 = self.construire([("et", GREY_A, "et u"), ("uₙ", TERME, None), ("→ 6 000", JUSTE, "6 000"),
                              ("abonnés", JUSTE, "abonnés")], 44)
        self.gauche(l3, -0.75, x0)
        VGroup(*l3[1:]).shift(RIGHT * 0.25)             # de l'air entre « et » et le cadre
        self.montrer(l3, avec_k={2: [plaf.animate.set_color(JUSTE), FadeIn(l6000, scale=1.3)]})
        cad = self.encadre(VGroup(*l3[1:]), JUSTE, 0.16)
        self.play(Create(cad), Indicate(VGroup(*pts[18:]), color=JUSTE, scale_factor=1.4), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 08 : question 5, le seuil 5 500 (bloc 5) ───────────────────────────

    def ecran_seuil(self):
        self.nouvel_ecran("08-seuil")
        self.bandeau(4, "Question cinq")
        x0 = -6.2
        nu = NuageTermes((10, 16.5), (5200, 5700), P(1.3, -2.0), P(5.6, 1.3), fs=26)
        g13, g14 = nu.graduation_n(13, "13", 24), nu.graduation_n(14, "14", 24)
        seuil = DashedLine(nu.G(10, 5500), nu.G(16.5, 5500), color=PIEGE, stroke_width=4, dash_length=0.12)
        l55 = self.t("5 500", 26, PIEGE).next_to(seuil, LEFT, buff=0.12)
        pts = {n: nu.point(n, U[n], r=0.09) for n in range(10, 17)}
        self.ligne([("Le plus petit n tel que", WHITE, "le plus petit"), ("uₙ >", TERME, "u indice n"),
                    ("5 500", JAUNE_TITRE, "5 500")], 2.2, x=x0, fs=38,
                   avec_k={0: [Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u)],
                           2: [Create(seuil), FadeIn(l55, scale=1.2)]})
        self.ligne([("2 000", WHITE, "2 000"), ("× 0,9ⁿ", RAISON, "0,9"), ("< 500", WHITE, "500")], 1.4, x=x0, fs=40)
        self.ligne([("soit", GREY_A, "soit"), ("0,9ⁿ", RAISON, "0,9"), ("< 0,25", WHITE, "0,25")], 0.6, x=x0, fs=40)
        calc = calculatrice(0.75).move_to(P(-5.85, -0.85))
        self.au_mot("À la calculatrice")
        self.play(FadeIn(calc, shift=UP * 0.1),
                  LaggedStart(*[GrowFromCenter(pts[n]) for n in range(10, 13)], lag_ratio=0.3), run_time=0.6)
        x1 = -5.2
        self.ligne([("u₁₃ ≈", TERME, "u indice 13"), ("5 491,6", PIEGE, "5 491,6")], -0.5, x=x1, fs=40,
                   avec_k={0: [GrowFromCenter(pts[13]), FadeIn(g13)]})
        self.play(pts[13].animate.set_color(PIEGE), Indicate(pts[13], color=PIEGE, scale_factor=1.8), run_time=0.4)
        self.ligne([("u₁₄ ≈", TERME, "u indice 14"), ("5 542,5", JUSTE, "5 542,5")], -1.3, x=x1, fs=40,
                   avec_k={0: [GrowFromCenter(pts[14]), FadeIn(g14)]})
        self.play(pts[14].animate.set_color(JUSTE), Flash(pts[14], color=JUSTE, line_length=0.15), run_time=0.4)
        fin = self.ligne([("C'est au mois", JUSTE, "C'est au mois"), ("14", JUSTE, "14")], -2.4, x=x0, fs=44,
                         avec_k={1: [GrowFromCenter(pts[15]), GrowFromCenter(pts[16])]})
        cad = self.encadre(fin, JUSTE, 0.16)
        rang = DashedLine(nu.G(14, 5200), nu.G(14, 5680), color=JUSTE, stroke_width=3, dash_length=0.08)
        self.play(Create(cad), Create(rang), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 09 : question-pause n° 3 → C (le sens de l'inégalité change) ───────

    def ecran_question3(self):
        g1 = self.construire([("Une élève résout", WHITE, "Une élève"), ("0,9ⁿ", RAISON, "0,9"),
                              ("< 0,25", WHITE, "0,25")], 40)
        g2 = self.construire([("avec le logarithme.", WHITE, "avec le"), ("Elle obtient :", WHITE, "Elle obtient")], 38)
        q = self.question_lignes(
            "09-question", [g1, g2],
            [self.choix([("n <", "n inférieur"), ("13,16", "13,16"), ("environ", "environ")]),
             self.choix([("n =", "n égale"), ("0,25", "0,25")]),
             self.choix([("n >", "n supérieur"), ("13,16", "13,16"), ("environ", "environ")])], 2)
        self.dire("09b-reponse")
        ok = self.q_reponse(q, 2)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), run_time=0.25)
        self.play(VGroup(q.cartes[2], ok).animate.move_to(q.cartes[0]), run_time=0.35)
        y = q.cartes[0].get_center()[1]
        x0 = -6.0
        # le dessin : le signe « < » qui se retourne en « > »
        self.ligne([("ln(0,9)", RAISON, "0,9"), ("est négatif", PIEGE, "négatif")], y - 1.0, x=x0, fs=40)
        self.ligne([("en divisant par lui,", WHITE, "en divisant")], y - 1.75, x=x0, fs=38)
        # le signe « < » se retourne en « > », au bout de la phrase qui le dit
        lc = self.construire([("le sens", PIEGE, "le sens"), ("de l'inégalité change :", PIEGE, "de l'inégalité")], 38)
        self.gauche(lc, y - 2.5, x0)
        pp = self.t("<", 60, PIEGE, audit=False).next_to(lc, RIGHT, buff=0.4)
        pg = self.t(">", 60, JUSTE, audit=False).move_to(pp)
        self.montrer(lc, avec_k={0: [FadeIn(pp, scale=1.4)]})
        self.au_mot("change")
        self.play(Rotate(pp, PI, run_time=0.5))
        self.play(ReplacementTransform(pp, pg), run_time=0.3)
        self.ligne([("n > 13,16", JUSTE, "13,16"), ("environ,", JUSTE, "environ"), ("donc", GREY_A, "donc"),
                    ("n = 14", JUSTE, "14")], y - 3.35, x=x0, fs=40)
        self.attendre_voix(marge=0.6)

    # ── 10 : le piège : ni 4 000, ni 600, mais le point fixe ───────────────

    def ecran_piege(self):
        self.nouvel_ecran("10-piege")
        tit = self.t("Le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        self.ligne([("La limite n'est ni…", WHITE, "La limite")], 2.15, fs=40)
        cartes = []
        for x, nb, legende, ex in ((-3.0, "4 000", "le premier terme", "le premier"),
                                   (3.0, "600", "ce qu'on ajoute", "ce qu'on")):
            n = self.t(nb, 54, TERME)
            l = self.t(legende, 32, GREY_A)
            g = VGroup(n, l).arrange(DOWN, buff=0.15)
            cadre = RoundedRectangle(width=g.width + 0.7, height=g.height + 0.5, corner_radius=0.14,
                                     stroke_color=GREY_B, stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
            cadre.move_to(P(x, 0.75))
            g.move_to(cadre)
            self.suivre(nb)
            self.play(FadeIn(cadre), FadeIn(n, scale=1.3), run_time=0.3)
            self.au_mot(ex)
            self.play(FadeIn(l, shift=UP * 0.08), run_time=0.25)
            self.play(Create(self.rayer(n)), cadre.animate.set_stroke(PIEGE), run_time=0.35)
            cartes.append(cadre)
        self.ligne([("C'est le point fixe :", JAUNE_TITRE, "C'est le point fixe")], -0.75, fs=42)
        fx = self.ligne([("0,9", RAISON, "0,9"), ("× 6 000", WHITE, "6 000"), ("+ 600", RAISON, "600"),
                         ("= 6 000", JUSTE, "égale 6 000")], -1.65, fs=42)
        cad = self.encadre(fx, JUSTE, 0.16)
        # la machine : 6 000 entre, 6 000 ressort : le nombre ne bouge plus
        ya = -2.98
        ca = self.case("6 000", TERME, l=1.6, fs=34, audit=False).move_to(P(-2.6, ya))
        cb = self.case("6 000", JUSTE, l=1.6, fs=34, audit=False).move_to(P(1.4, ya))
        f = Arrow(ca.get_right(), cb.get_left(), buff=0.12, color=RAISON, stroke_width=5)
        lf = self.t("× 0,9 + 600", 28, RAISON, audit=False).next_to(f, UP, buff=0.08)
        bille = Dot(f.get_start(), radius=0.08, color=TERME)
        self.play(Create(cad), FadeIn(ca), run_time=0.35)
        self.play(GrowArrow(f), FadeIn(lf), MoveAlongPath(bille, Line(f.get_start(), f.get_end())), run_time=0.5)
        self.play(FadeOut(bille, scale=2), FadeIn(cb, scale=1.2), run_time=0.3)
        self.play(Indicate(ca, color=JUSTE, scale_factor=1.1), Indicate(cb, color=JUSTE, scale_factor=1.1), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 11 : le défi : le cinéma et ses cartes d'abonnement ────────────────

    def carte_abo(self, couleur=TERME):
        return RoundedRectangle(width=0.36, height=0.25, corner_radius=0.05, fill_color=couleur, fill_opacity=1,
                                stroke_color=WHITE, stroke_width=1.5)

    def ecran_defi(self):
        self.nouvel_ecran("11-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        x0 = -6.2
        cin = cinema(0.65).move_to(P(5.45, 0.95))
        paquet = VGroup(*[self.carte_abo() for _ in range(6)]).arrange(RIGHT, buff=0.06).move_to(P(5.3, -0.72))
        self.ligne([("Un cinéma :", WHITE, "Un cinéma"), ("300 cartes", TERME, "300"), ("au mois", WHITE, "au mois"),
                    ("0", WHITE, "0")], 2.2, x=x0, fs=36,
                   avec_k={0: [FadeIn(cin, shift=UP * 0.15)], 1: [LaggedStart(*[FadeIn(c) for c in paquet],
                                                                              lag_ratio=0.15)]})
        partent = paquet[:2]
        neuves = VGroup(*[self.carte_abo(JUSTE) for _ in range(2)]).arrange(RIGHT, buff=0.06).move_to(P(5.3, -1.4))
        self.ligne([("Chaque mois :", WHITE, "Chaque mois"), ("− 20 %", RAISON, "20 %"),
                    ("non renouvelées,", WHITE, "ne sont pas")], 1.4, x=x0, fs=36,
                   avec_k={1: [partent.animate.set_fill(RAISON)]})
        self.play(partent.animate.shift(DOWN * 0.3).set_opacity(0.2), run_time=0.45)
        self.ligne([("+ 100", JUSTE, "100"), ("nouvelles vendues", WHITE, "nouvelles")], 0.6, x=x0, fs=36,
                   avec_k={0: [FadeIn(neuves, shift=UP * 0.3)]})
        self.ligne([("Avec", WHITE, "Avec"), ("vₙ = uₙ", VIOLET, "v indice n"), ("− 500,", VIOLET, "500")], -0.4, x=x0,
                   fs=38)
        self.ligne([("exprime", WHITE, "exprime"), ("uₙ,", TERME, None), ("puis trouve sa limite", WHITE, "puis trouve")],
                   -1.2, x=x0, fs=38)
        self.defi_pause(-2.35, x=-1.2)
        self._defi = (tit, cin, paquet, neuves)

    def ecran_correction(self):
        self.dire("11b-correction")
        tit = self._defi[0]
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        autres = [m for m in self.mobjects if m is not tit and m is not self._margo]
        self.play(*[FadeOut(m) for m in autres], ReplacementTransform(tit, cor), run_time=0.4)
        self.remove(*autres)
        noms = ("1 · Modèle", "2 · Suite v", "3 · Formule", "4 · Limite")
        ys = (1.95, 0.75, -0.75, -1.95)
        blocs = []
        for nom, y in zip(noms, ys):
            c = RoundedRectangle(width=3.0, height=0.7, corner_radius=0.12, stroke_color=GREY_D, stroke_width=3,
                                 fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-4.75, y))
            blocs.append(VGroup(c, self.t(nom, 28, WHITE, audit=False).move_to(c)))
        self.play(*[FadeIn(b[0]) for b in blocs], run_time=0.3)
        x1 = -2.95

        def allumer(k):
            anims = [blocs[k][0].animate.set_stroke(JAUNE_TITRE, width=6), FadeIn(blocs[k][1], scale=1.15)]
            if k:
                anims.append(blocs[k - 1][0].animate.set_stroke(JUSTE, width=4))
            return anims
        lignes = [
            [("uₙ₊₁ =", TERME, "u indice n plus 1"), ("0,8 uₙ", TERME, "0,8"), ("+ 100", TERME, "100")],
            [("vₙ₊₁ =", VIOLET, "Alors v"), ("0,8 uₙ", WHITE, "0,8"), ("− 400", WHITE, "400"), ("= 0,8 vₙ", VIOLET, "0,8 v")],
            [("uₙ =", TERME, "Donc u"), ("500", WHITE, "500"), ("− 200", WHITE, "200"), ("× 0,8ⁿ", RAISON, "0,8")],
            [("0,8ⁿ", RAISON, "0,8"), ("→ 0 :", WHITE, "tend vers 0"), ("la limite est", JUSTE, "la limite"),
             ("500", JUSTE, "500")]]
        for k, (l, y) in enumerate(zip(lignes, ys)):
            g = self.ligne(l, y, x=x1, fs=40, avec_k={0: allumer(k)})
            if k == 1:
                self.ligne([("v₀ =", VIOLET, "v indice 0"), ("−200", VIOLET, "200")], y - 0.72, x=x1, fs=40)
        cad = self.encadre(VGroup(*g[2:]), JUSTE, 0.16)
        self.play(Create(cad), blocs[3][0].animate.set_stroke(JUSTE, width=4), run_time=0.4)
        self.insister(VGroup(*g[2:], cad), 1.1)
        self.attendre_voix(marge=0.6)

    # ── 12 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        """« Ce que tu as appris » (titre EN HAUT ET CENTRÉ), chaque ligne en morceaux."""
        J = JAUNE_TITRE
        points = [[[("Pour", WHITE, "Pour"), ("uₙ₊₁ =", J, "u indice n plus 1"), ("a uₙ", J, "a u"), ("+ b :", J, "plus b")],
                   [("vₙ = uₙ", VIOLET, "v indice n"), ("− ℓ", VIOLET, "moins le point"),
                    ("(ℓ : le point fixe)", GREY_A, None)],
                   [("est géométrique de raison a,", WHITE, "est géométrique")],
                   [("puis", WHITE, "puis"), ("uₙ = vₙ + ℓ", TERME, "u indice n égale v")]],
                  [[("Si", WHITE, "Si a"), ("0 < a", J, "0"), ("< 1 :", J, "1"), ("la limite est ℓ", JUSTE, "la limite")]],
                  [[("Pour un seuil :", J, "Pour un seuil"), ("calculatrice ou logarithme", WHITE, "calculatrice")]]]
        self.nouvel_ecran("12-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, J).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        blocs = []
        for pt in points:
            lignes = VGroup(*[self.construire(l, 38, 1e9) for l in pt]).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
            blocs.append(VGroup(self.coche(), lignes).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if tout.width > 11.4:
            tout.scale_to_fit_width(11.4)
        if tout.height > 5.6:
            tout.scale_to_fit_height(5.6)
        tout.move_to(P(-0.8, -0.35))
        for bloc in blocs:
            for k, l in enumerate(bloc[1]):
                self.montrer(l, rt=0.3, avec_k={0: [Create(bloc[0])]} if k == 0 else None)
        self.attendre_voix(marge=0.8)

    def construct(self):
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_enonce, self.ecran_modele, self.ecran_question1,
                  self.ecran_auxiliaire, self.ecran_question2, self.ecran_limite, self.ecran_seuil,
                  self.ecran_question3, self.ecran_piege, self.ecran_defi, self.ecran_correction, self.ecran_appris,
                  lambda: self.fin("13-abonne")]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (e == self.ecran_correction and "11" in choix.split(",")):
                e()
