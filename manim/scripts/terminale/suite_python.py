# suite_python.py
# EleveAI — Maths Terminale (spé) — paysage « Programmer les termes d'une suite »
# (16:9), ceinture VERTE. Série SUITES du lycée, épisode 42 (le dernier).
# Micro du coach : python_suite (notion algorithmique_python) :
# lib/tutor-v4/questionBank/terminale-spe/maths/algorithmique-python.bank.ts.
#
# Ce que demande le coach → écran :
#   · exécuter « u = a / for i in range(K): / u = … » et donner u à la fin
#     (py_suite_fixed_1 : 2uₙ + 1 → 23 ; fixed_2 : uₙ + 3 → 17 ;
#      fixed_3 : 2uₙ → 24 ; fixed_5 : uₙ + 2 → 11)        → 03, 04, 05 (B), 09 ;
#   · « u = 2*u + 1 fait passer de uₙ à uₙ₊₁ » (fixed_4) : la nouvelle valeur
#     écrase l'ancienne                                           → 03, 10 ;
#   · le RANG du terme obtenu : « u = 17, c'est u₄ » (fixed_2)    → 06, 08 (A) ;
#   · le piège du print : dans la boucle = tous les termes, après = le dernier,
#     et i ne compte que les tours                                → 07.
# Clé de voix → écran :
#   00-garde (l'éditeur et la boucle qui tourne) · 01 Naïs, chercheuse en IA :
#   l'erreur part de 20 000, × 0,8 puis + 1 200, la courbe descend par paliers ·
#   02 à la main : 17 200, 14 960, 13 168 · 03 les trois lignes de Python, et la
#   case u qu'on écrase · 04 le tableau de trace (tour i, calcul, u), ligne du
#   code surlignée · 05/05b question (B : 24) · 06 la règle du rang : range(n)
#   fait n tours, sortie = uₙ · 07 le piège : print DANS / APRÈS la boucle, et i
#   n'est pas le terme · 08/08b question (A : u₄) · 09/09b défi (0,5uₙ + 4 : 9 ;
#   8,5 ; 8,25 = u₃) · 10 « Ce que tu as appris » · 11 fin.
# Code couleur (module commun) : bleu = les termes u, orange = ce qui change au
# tour courant, vert = juste, rouge = piège ; violet = le compteur i.
# ⛔ Pas de LaTeX. ⛔ Tout l'écran est à la VIRGULE française (0,8 ; 8,25) SAUF
#   le bloc de code Python, qui garde le POINT (0.8, 0.5) : c'est voulu.
# ⚠️ 0,8 × 20 000 + 1 200 donne 17200.0, 14960.0, 13168.0 EXACTS en flottants
#   (vérifié ci-dessous) : aucun 5488.000000000001 ne peut apparaître. Au-delà
#   de u₃ les flottants dérivent : la courbe de l'écran 01 est un DESSIN, sans
#   nombre.
# Voix : manim/voix/terminale-suite-python.json (débit −6), calée mot à mot par
# suite_python_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/terminale/suite_python.py SuitePythonTle -o eleveai-maths-terminale-suite-python --media_dir manim/scripts/terminale/media-suite-python
# Sortie : manim/sorties/terminale/maths/suites/42-python/

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_algorithme import (FONCTION, FOND_CODE, MOT_CLE, RANG, OutilsAlgo,  # noqa: E402
                              Programme, fleche_boucle, reseau)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402
from suite_limite_calculer import OutilsCalcul  # noqa: E402
from suite_limite_operations import VerifMargo  # noqa: E402


# ── les affirmations de la voix, vérifiées en Python ───────────────────────

def boucle(u0, tours, f):
    """Ce que fait vraiment `u = u0 ; for i in range(tours): u = f(u)`."""
    u, vus = u0, [u0]
    for _ in range(tours):
        u = f(u)
        vus.append(u)
    return vus


ERR = boucle(20000.0, 3, lambda u: 0.8 * u + 1200)
assert [repr(x) for x in ERR] == ["20000.0", "17200.0", "14960.0", "13168.0"]   # 02, 04 : exacts
assert boucle(3, 3, lambda u: 2 * u) == [3, 6, 12, 24]                   # 05 : B (24)
assert boucle(5, 4, lambda u: u + 3) == [5, 8, 11, 14, 17]               # 08 : A (u₄ = 17)
DEFI = boucle(10.0, 3, lambda u: 0.5 * u + 4)
assert [repr(x) for x in DEFI] == ["10.0", "9.0", "8.5", "8.25"]          # 09b : 9 ; 8,5 ; 8,25
assert len(range(3)) == 3 and len(range(4)) == 4                          # 06 : range(n) fait n tours

CODE = ["u = 20000", "for i in range(3):", "    u = 0.8 * u + 1200"]
PEAU, PULL, CHEVEUX = "#e0ac69", "#0e7490", "#1f2937"


# ── les dessins de l'épisode ───────────────────────────────────────────────

def nais(s=1.0):
    """Naïs, chercheuse en IA : cheveux longs, blouse bleu canard, un badge."""
    cheveux = VGroup(Sector(radius=0.31, angle=PI, start_angle=0, fill_color=CHEVEUX, fill_opacity=1,
                            stroke_width=0).move_to(P(0, 1.17)),
                     *[RoundedRectangle(width=0.16, height=0.62, corner_radius=0.07, fill_color=CHEVEUX,
                                        fill_opacity=1, stroke_width=0).move_to(P(x, 0.85))
                       for x in (-0.3, 0.3)])
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=PULL, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    badge = VGroup(Circle(radius=0.1, fill_color=WHITE, fill_opacity=1, stroke_width=0),
                   Circle(radius=0.045, fill_color=TERME, fill_opacity=1, stroke_width=0)).move_to(P(0.24, 0.36))
    return VGroup(corps, cheveux, tete, badge).scale(s)


def escalier(nu, valeurs, couleur=TERME, sw=5):
    """La courbe d'erreur en PALIERS dans le repère nu : un palier par tour,
    qui descend. Un DESSIN (aucun nombre à l'écran) : au-delà de u₃ les
    flottants dérivent, on ne les affiche jamais."""
    pts = []
    for k, v in enumerate(valeurs):
        pts += [nu.G(k, v), nu.G(k + 1, v)]
        if k + 1 < len(valeurs):
            pts.append(nu.G(k + 1, valeurs[k + 1]))
    return VMobject(stroke_color=couleur, stroke_width=sw).set_points_as_corners(pts)


def case_memoire(largeur=2.3, hauteur=0.95, couleur=TERME):
    """LA case u : une seule, celle qu'on écrase à chaque tour."""
    return RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.14, stroke_color=couleur,
                            stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1)


class Tableau3(VGroup):
    """Le tableau de trace : trois colonnes (tour i, calcul, u) et n lignes.
    Le cadre et la grille arrivent d'un bloc (une figure qu'on LIT) ; les
    cellules se posent ensuite, ligne par ligne, par la scène.
    self.xc[j] : le centre de la colonne j ; self.yc[k] : le milieu de la ligne
    k (k = 0 : l'en-tête) ; self.bande(k) : le surlignage d'UNE ligne."""

    def __init__(self, larg, h, n, centre, couleur=GREY_B, **kw):
        super().__init__(**kw)
        self.larg, self.h = list(larg), h
        L = sum(larg)
        bords = [-L / 2]
        for w in larg:
            bords.append(bords[-1] + w)
        self.xc = [(bords[j] + bords[j + 1]) / 2 for j in range(3)]
        self.yc = [(n - 2 * k) * h / 2 for k in range(n + 1)]
        self.fond = Rectangle(width=L, height=(n + 1) * h, stroke_color=couleur, stroke_width=3,
                              fill_color=FOND_CARTE, fill_opacity=1)
        self.grille = VGroup(*[Line(P(bords[j], self.yc[0] + h / 2), P(bords[j], self.yc[-1] - h / 2),
                                    stroke_color=couleur, stroke_width=2) for j in (1, 2)],
                             *[Line(P(-L / 2, self.yc[k] - h / 2), P(L / 2, self.yc[k] - h / 2),
                                    stroke_color=couleur, stroke_width=2 if k else 3) for k in range(n)])
        self.add(self.fond, self.grille)
        self.centre = np.array(centre, dtype=float)   # le fond était centré sur l'origine
        self.move_to(centre)

    def pos(self, j, k):
        """Le centre de la cellule (colonne j, ligne k), tableau placé."""
        return P(self.xc[j], self.yc[k]) + self.centre

    def bande(self, k, couleur=RAISON, op=0.2):
        r = Rectangle(width=self.fond.width - 0.08, height=self.h * 0.94, fill_color=couleur, fill_opacity=op,
                      stroke_width=0)
        return r.move_to(P(self.fond.get_center()[0], self.pos(0, k)[1]))


class SuitePythonTle(VerifMargo, AuditMilliers, OutilsAlgo, OutilsCalcul, PaysageSuites):
    fichier_marques = "suite_python_marques.json"
    nom_voix = "terminale-suite-python"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "verte"
    largeur_bouton = 8.0
    hauteur_bouton = 0.7
    buff_boutons = 0.10
    place_coche = 1.2
    y_tete_question = 3.25

    # ── les outils de l'épisode ────────────────────────────────────────────

    def bouton(self, lettre, corps, largeur, fs):
        """Le bouton du module (indices agrandis), marge intérieure ≥ 20 px."""
        if isinstance(corps, str):
            corps = self.t(corps, fs, WHITE, 1e9)
        b = super().bouton(lettre, corps, largeur, fs)
        cadre, ligne = b
        h = max(self.hauteur_bouton, ligne.height + 0.22)
        if cadre.height < h:
            cadre.stretch_to_fit_height(h)
            ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return b

    def ligne(self, morceaux, y, x=None, fs=40, avec=(), larg=None, avec_k=None, rt=0.25):
        """Une ligne de texte en morceaux, chaque morceau à sa voix."""
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k)

    def programme(self, lignes, fs, centre, numeros=None, violet=None):
        """Le bloc de code (police Consolas, indentation exacte), le compteur i
        en violet. ⛔ Le code garde le POINT décimal : c'est du Python."""
        prog = Programme(lignes, fs=fs, numeros=numeros).move_to(centre)
        for k, a, b in (violet or []):
            prog.glyphes(k, a, b).set_color(RANG)
        return prog

    def sortie(self, valeurs, fs=28, couleur=JUSTE, largeur=None):
        """La console : ce que le programme AFFICHE, une valeur par ligne.
        Les valeurs ont déjà été dites et calculées (écrans 02 et 04) : ce bloc
        est une figure qu'on LIT, il n'est pas audité."""
        lignes = VGroup(*[Text(f"> {v}", font="Consolas", font_size=fs, color=couleur) for v in valeurs])
        for m in lignes:
            m._pas_audit = True
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        fond = RoundedRectangle(width=max(largeur or 0, lignes.width + 0.6), height=lignes.height + 0.42,
                                corner_radius=0.1, fill_color="#020617", fill_opacity=1, stroke_color=GREY_B,
                                stroke_width=2.5)
        lignes.move_to(fond).align_to(fond.get_left() + RIGHT * 0.3, LEFT)
        g = VGroup(fond, lignes)
        g.lignes = lignes
        return g

    def tourner(self, mob, vitesse=1.1):
        """Le dessin tourne tout seul (la boucle qui tourne)."""
        mob.add_updater(lambda m, dt: m.rotate(vitesse * dt))
        return mob

    def question_prog(self, cle, prog, etapes, groupes, choix, bonne, **kw):
        """Une question-pause dont l'énoncé commence par un bloc de code :
        le code se tape au fil de la voix (etapes : [(ligne, extrait), …]),
        puis les lignes de texte, chacune à sa voix."""
        liste = [(prog, None)] + [(g, None) for g in groupes]

        def dessin():
            for k, ex in etapes:
                self.suivre(ex)
                debut = [FadeIn(prog.cadre)] if k == 0 else []
                self.play(*debut, FadeIn(prog.lignes[k], shift=RIGHT * 0.1), run_time=0.3)
            for g in groupes:
                self.montrer(g, rt=0.22)
            liste.clear()
        q = self.poser_question(cle, liste, choix, bonne, dessin=dessin, **kw)
        q.prog, q.groupes = prog, groupes
        return q

    def apres_question(self, q, bonne, ok, y=2.5):
        """L'énoncé s'en va, la bonne réponse monte en haut : la correction a
        toute la place (et rien de l'écran précédent ne traîne)."""
        self.play(FadeOut(q.tete), FadeOut(q.prog.cadre), FadeOut(q.prog.lignes),
                  *[FadeOut(g) for g in q.groupes],
                  *[FadeOut(q.cartes[j]) for j in range(3) if j != bonne],
                  VGroup(q.cartes[bonne], ok).animate.move_to(P(0, y)), run_time=0.4)

    # ── 00 : la garde : l'éditeur et la boucle qui tourne ──────────────────

    def ecran_garde(self):
        def dessin():
            prog = self.programme(CODE, 24, P(-1.95, -0.8), violet=[(1, 4, 5)])
            fl = self.tourner(fleche_boucle(0.52).move_to(P(2.2, -0.8)))
            self.play(FadeIn(prog.cadre), FadeIn(prog.lignes), run_time=0.5)
            self.play(FadeIn(fl, scale=0.6), run_time=0.4)
        self.garde("Programmer les termes d'une suite",
                   [("Comment faire calculer u₃", "Comment faire"),
                    ("par une boucle Python ?", "par une boucle", JAUNE_TITRE)],
                   dessin=dessin, extrait_titre="Programmer")

    # ── 01 : Naïs, chercheuse en IA : l'erreur qui descend par paliers ─────

    def anims_case(self, lg, i, arc=False):
        """Les animations qui posent la case i (cadre, nombre, nom) et, au
        besoin, l'arc du tour qui vient de la case précédente."""
        a = [FadeIn(lg.cases[i][0], scale=0.8), FadeIn(lg.cases[i][1], scale=1.4)]
        if len(lg.noms) > i:
            a.append(FadeIn(lg.noms[i], shift=UP * 0.08))
        if arc and i:
            a.append(Create(self.arc_tour(lg, i - 1, cote=UP, creux=0.28)))
        return a

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = nais(0.8).move_to(P(-5.85, 2.3))
        nom = self.t("Naïs", 38, JAUNE_TITRE).move_to(P(-4.6, 2.78))
        met = VGroup(self.t("chercheuse en", 26, TERME, 3.6),
                     self.t("intelligence artificielle", 26, TERME, 3.6)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        met.move_to(P(0, 2.05)).align_to(P(-5.3, 0), LEFT)
        self.au_mot("Naïs")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        self.au_mot("chercheuse")
        self.play(FadeIn(met[0], shift=UP * 0.08), FadeIn(met[1], shift=UP * 0.08), run_time=0.4)
        res = reseau(0.9).move_to(P(-0.5, 2.4))
        self.au_mot("entraîne")
        self.play(FadeIn(res.liens), LaggedStart(*[GrowFromCenter(r) for r in res.ronds], lag_ratio=0.08),
                  run_time=0.7)
        # la carte de l'erreur : le repère, puis l'escalier qui descend
        cad = self.carte(5.6, 2.9, P(3.5, 1.75), GREY_B)
        nu = NuageTermes((0, 9.0), (5000, 21000), P(1.35, 0.85), P(5.75, 2.45), nom_u="erreur", fs=22)
        esc = escalier(nu, ERR + [11734.4, 10587.52, 9670.016, 8936.0128])
        depart = VGroup(Dot(nu.G(0, 20000), radius=0.085, color=TERME),
                        DashedLine(nu.G(0, 20000), nu.G(9, 20000), color=GREY_B, stroke_width=2, dash_length=0.1))
        x0 = -6.2
        self.ligne([("Au départ, l'erreur vaut", WHITE, "Au départ"), ("20 000", TERME, "20 000"),
                    ("points.", WHITE, "points")], -0.45, x=x0, fs=40,
                   avec_k={0: [FadeIn(cad), Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u)],
                           1: [GrowFromCenter(depart[0]), Create(depart[1])]}, rt=0.45)
        self.ligne([("À chaque passage, elle est multipliée par", WHITE, "À chaque passage"),
                    ("0,8", RAISON, "0,8")], -1.25, x=x0, fs=40, avec_k={1: [Create(esc)]}, rt=1.5)
        # ⚠️ ligne courte : plus bas que y = −2, un texte qui dépasse x = 5,4 touche Ti-Margo
        self.ligne([("mais", WHITE, "mais il reste"), ("1 200", RAISON, "1 200"),
                    ("points restent toujours.", WHITE, "qu'on ne peut")], -2.05, x=x0, fs=40)
        f = self.ligne([("uₙ₊₁ =", TERME, "u indice n plus 1"), ("0,8", RAISON, "0,8"), ("uₙ", TERME, None),
                        ("+ 1 200", RAISON, "1 200")], -3.0, x=x0, fs=48)
        self.play(FadeIn(self.encadre(f, TERME, 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 02 : à la main, trois fois le même calcul ──────────────────────────

    def ecran_main(self):
        self.nouvel_ecran("02-main")
        self.titre("À la main, c'est long", JAUNE_TITRE, 46, extrait="À la main")
        x0 = -6.2
        lg = LigneTermes(["20 000", "17 200", "14 960", "13 168"], centre=P(-0.3, -2.25), pas=2.4, largeur=2.05,
                         hauteur=0.78, fs=32, noms=["u₀", "u₁", "u₂", "u₃"])
        lignes = [("u₁ =", "u indice 1", "20 000", "17 200", 1.75),
                  ("u₂ =", "u indice 2", "17 200", "14 960", 0.9),
                  ("u₃ =", "u indice 3", "14 960", "13 168", 0.05)]
        for k, (tete, ex_tete, avant, apres, y) in enumerate(lignes):
            avec_k = {5: self.anims_case(lg, k + 1, arc=True)}
            if k == 0:
                avec_k[2] = self.anims_case(lg, 0)
            self.ligne([(tete, TERME, ex_tete), ("0,8 ×", RAISON, "0,8"), (avant, WHITE, avant),
                        ("+ 1 200", RAISON, "1 200"), ("=", WHITE, None), (apres, JUSTE, apres)],
                       y, x=x0, fs=40, avec_k=avec_k, rt=0.35)
        self.play(Indicate(lg.cases[3], color=JUSTE, scale_factor=1.08), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 03 : les trois lignes de Python, et la case u qu'on écrase ─────────

    def ecran_code(self):
        self.nouvel_ecran("03-code")
        self.titre("Trois lignes de Python", JAUNE_TITRE, 46, extrait="trois lignes")
        prog = self.programme(CODE, 32, P(-3.3, 1.15), numeros=["1", "2", "3"], violet=[(1, 4, 5)])
        # LA case u : une seule, celle qu'on écrase à chaque tour
        case = case_memoire().move_to(P(4.3, 2.3))
        lab_u = self.t("u", 34, TERME, audit=False).next_to(case, UP, buff=0.12)
        val = self.t("20 000", 36, WHITE).move_to(case)
        self.play(FadeIn(prog.cadre), run_time=0.3)   # ⚠️ le cadre AVANT les glyphes : son fond les recouvrirait
        # le nombre attend le NOMBRE dit (« u égale » puis « 20 000 ») : 0 s d'avance
        self.taper(prog, 0, [("u =", "u égale", (case, lab_u)), ("20000", "20 000", (val,))])
        self.taper(prog, 1, [("for i in", "pour i dans"), ("range", "range de"), ("(3):", "3")])
        self.taper(prog, 2, [("u =", "décalée"), ("0.8 * u", "0,8"), ("+ 1200", "1 200")])
        x0 = -6.2
        seule = self.t("une seule case", 30, RAISON).move_to(P(4.3, 1.0))
        g = self.ligne([("u ne garde pas tous les termes :", WHITE, "u ne garde")], -0.8, x=x0, fs=42,
                       avec=[FadeIn(seule, shift=UP * 0.1)], rt=0.4)
        g[0][0].set_color(TERME)                       # le « u » de la phrase, en bleu
        fl = self.tourner(fleche_boucle(0.5).move_to(P(4.3, 0.2)))
        croix = self.barrer(val, PIEGE, 0.06)
        ecrasee = self.t("écrasée !", 32, PIEGE).move_to(P(4.3, 1.55))
        e1 = self.ligne([("à chaque tour, la nouvelle valeur", WHITE, "À chaque tour")], -1.55, x=x0, fs=42,
                        avec=[FadeIn(fl, scale=0.6)], rt=0.45)
        e2 = self.ligne([("ÉCRASE", PIEGE, "ÉCRASE"), ("l'ancienne.", WHITE, "l'ancienne")], -2.3, x=x0, fs=42,
                        avec_k={0: [Create(croix), case.animate.set_stroke(RAISON, 5),
                                    FadeIn(ecrasee, shift=UP * 0.12)],
                                1: [FadeOut(val, shift=DOWN * 0.5), FadeOut(croix, shift=DOWN * 0.5)]}, rt=0.45)
        self.play(FadeIn(self.encadre(VGroup(e1, e2), PIEGE, 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.6)
        fl.clear_updaters()

    # ── 04 : le tableau de trace, synchronisé avec la ligne surlignée ──────

    def ecran_trace(self):
        self.nouvel_ecran("04-trace")
        self.titre("Déroulons la boucle", JAUNE_TITRE, 46, extrait="Déroulons")
        prog = self.programme(CODE, 22, P(-4.35, 1.3), violet=[(1, 4, 5)])
        tab = Tableau3((1.05, 3.5, 1.5), 0.62, 3, P(1.6, 1.3))   # 1re colonne large : « tour i » ne touche pas le trait
        ent = VGroup(*[self.t(txt, 22, coul, audit=False).move_to(tab.pos(j, 0))
                       for j, (txt, coul) in enumerate((("tour i", RANG), ("calcul", GREY_A), ("u", TERME)))])
        self.play(FadeIn(prog.cadre), FadeIn(prog.lignes), FadeIn(tab), FadeIn(ent), run_time=0.6)
        barre = self.surligner(prog, 0, TERME)
        bande = None
        cellules = []
        for k, (avant, apres) in enumerate(zip(ERR[:3], ERR[1:])):
            calc = Text(f"0,8 × {fr(avant)} + 1 200", font_size=22, color=GREY_A)
            calc._pas_audit = True                      # reprise de la ligne 3 du code, pas un résultat
            calc.move_to(tab.pos(1, k + 1))
            tour = self.t(str(k), 28, RANG).move_to(tab.pos(0, k + 1))
            res = self.t(fr(apres), 28, TERME).move_to(tab.pos(2, k + 1))
            cellules.append(res)
            # un seul tour est surligné à la fois : la bande SE DÉPLACE dans la même animation
            nouvelle = tab.bande(k + 1)
            self.suivre("Tour")
            self.suivre(str(k))                         # le numéro du tour est dit APRÈS le mot « tour »
            # ⛔ la bande EN PREMIER dans le play : au-dessus du tableau, sous les nombres
            #    (un bring_to_back la glisserait DERRIÈRE le fond opaque du tableau)
            if bande is None:
                bande = nouvelle
                glisse = FadeIn(bande)
            else:
                glisse = Transform(bande, nouvelle)
            self.play(glisse, FadeIn(tour, scale=1.3), FadeIn(calc, shift=RIGHT * 0.1),
                      Transform(barre, prog.barre(1, RAISON)), run_time=0.4)
            self.suivre(fr(apres))
            self.play(FadeIn(res, scale=1.3), Transform(barre, prog.barre(2, TERME)), run_time=0.35)
        cadre_fin = SurroundingRectangle(cellules[2], color=JUSTE, buff=0.12, stroke_width=4, corner_radius=0.06)
        fin = self.ligne([("Trois tours :", JAUNE_TITRE, "Trois tours"), ("u vaut", WHITE, "u vaut"),
                          ("13 168", JUSTE, "13 168"), (", c'est", WHITE, "c'est"), ("u₃", JUSTE, "u indice 3")],
                         -1.0, x=-6.2, fs=46,
                         avec_k={2: [Create(cadre_fin), cellules[2].animate.set_color(JUSTE),
                                     FadeOut(bande), FadeOut(barre)]}, rt=0.4)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : question-pause n° 1 → B (u = 3 doublé 3 fois : 24) ────────────

    def ecran_question1(self):
        prog = self.programme(["u = 3", "for i in range(3):", "    u = 2 * u"], 24, ORIGIN, violet=[(1, 4, 5)])
        g = self.construire([("À la fin,", WHITE, "À la fin"), ("u", TERME, None), ("vaut :", WHITE, "vaut")], 40)
        q = self.question_prog("05-question", prog,
                               [(0, "u égale 3"), (1, "une boucle de 3 tours"), (2, "u égale 2 fois u")],
                               [g], ["12", "24", "48"], 1, largeur=4.6, fs=32)
        self.dire("05b-reponse")
        ok = self.q_reponse(q, 1)
        self.apres_question(q, 1, ok)
        lg = LigneTermes(["3", "6", "12", "24"], centre=P(0, 0.55), pas=2.3, largeur=1.5, hauteur=0.82, fs=36,
                         noms=["u₀", "u₁", "u₂", "u₃"])
        self.au_mot("On double")
        for i, v in enumerate(lg.valeurs):
            self.suivre(v)
            self.play(*self.anims_case(lg, i, arc=True), run_time=0.3)
        fin = self.ligne([("u vaut", WHITE, "u vaut"), ("24", JUSTE, "24"), (", c'est-à-dire", WHITE, "c'est-à-dire"),
                          ("u₃.", JUSTE, "u indice 3")], -1.5, fs=46,
                         avec_k={1: self.allumer_cases(lg, [3], JUSTE)}, rt=0.4)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 06 : la règle du rang : range(n) fait n tours, sortie = uₙ ─────────

    def ecran_rang(self):
        self.nouvel_ecran("06-rang")
        self.titre("La règle du rang", JAUNE_TITRE, 46, extrait="règle du rang")
        x0 = -6.2
        lg = LigneTermes(["", "", "", ""], centre=P(0, 0.85), largeur=1.5, hauteur=0.85, fs=36,
                         noms=["u₀", "u₁", "u₂", "uₙ"], xs=[-4.3, -2.3, -0.3, 2.9])
        pts = self.t("…", 44, GREY_A, audit=False).move_to(P(1.25, 0.85))
        arcs = VGroup(*[self.arc_tour(lg, i, cote=UP, creux=0.3) for i in range(3)])
        mesure = DoubleArrow(P(-4.3, -0.6), P(2.9, -0.6), buff=0, color=RAISON, stroke_width=4, tip_length=0.18)
        lab = self.t("n tours", 30, RAISON, audit=False).move_to(P(-0.7, -1.05))
        self.ligne([("range(n)", FONCTION, "range de n"), ("fait exactement", WHITE, "fait exactement"),
                    ("n tours.", RAISON, "n tours")], 2.2, x=x0, fs=44,
                   avec_k={2: [FadeIn(lg), FadeIn(pts), LaggedStart(*[Create(a) for a in arcs], lag_ratio=0.2),
                               GrowFromCenter(mesure), FadeIn(lab)]}, rt=0.9)
        sortie = self.ligne([("On part de", WHITE, "si on part"), ("u₀", TERME, "u indice 0"),
                             (": à la sortie,", WHITE, "à la sortie"), ("u vaut", WHITE, "u vaut"),
                             ("uₙ.", JUSTE, "u indice n")], -1.9, x=x0, fs=44,
                            avec_k={1: [Indicate(lg.cases[0], color=TERME, scale_factor=1.12)],
                                    4: self.allumer_cases(lg, [3], JUSTE)}, rt=0.4)
        self.play(FadeIn(self.encadre(sortie, JUSTE, 0.16)), run_time=0.3)
        for x, ex, texte in ((-5.0, "Pas u", "uₙ₋₁"), (-0.2, "pas u", "uₙ₊₁")):
            g = self.construire([("pas", GREY_A, ex), (texte, PIEGE, None)], 42, 1e9)
            g.move_to(P(0, -2.95)).align_to(P(x, 0), LEFT)
            # un seul trait fin, à mi-hauteur : la croix du module rendait uₙ₋₁ illisible
            self.montrer(g, avec=[Create(self.rayer(g[1], PIEGE))], rt=0.35)
        self.attendre_voix(marge=0.6)

    # ── 07 : le piège : print DANS / APRÈS la boucle, et i n'est pas le terme ──

    def ecran_piege(self):
        self.nouvel_ecran("07-piege")
        tit = self.t("Voilà le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        dans = self.programme(CODE + ["    print(u)"], 26, P(-3.4, 0.9), violet=[(1, 4, 5)])
        apres = self.programme(CODE + ["print(u)"], 26, P(1.9, 0.9), violet=[(1, 4, 5)])
        dans.glyphes(3, 4, 12).set_color(JUSTE)
        apres.glyphes(3, 0, 8).set_color(PIEGE)
        l_dans = self.t("print DANS la boucle", 28, JUSTE).move_to(P(-3.4, 2.45))
        l_apres = self.t("print APRÈS la boucle", 28, PIEGE).move_to(P(1.9, 2.45))
        c_dans = self.sortie(["17200.0", "14960.0", "13168.0"], 24).move_to(P(-3.4, -1.45))
        c_apres = self.sortie(["13168.0"], 24).move_to(P(1.9, -1.0))
        s_dans = self.t("les trois termes", 26, JUSTE).move_to(P(-3.4, -2.55))
        s_apres = VGroup(self.t("une seule valeur :", 26, PIEGE),
                         self.t("le dernier terme", 26, PIEGE)).arrange(DOWN, buff=0.12).move_to(P(1.9, -2.0))
        xg = dans.glyphes(2, 4, 5).get_left()[0] - 0.08
        guide = DashedLine(P(xg, dans.ycentre(2) + 0.24), P(xg, dans.ycentre(3) - 0.24), color=RAISON,
                           stroke_width=3, dash_length=0.08)
        self.suivre("tous les termes")
        self.play(FadeIn(l_dans, shift=DOWN * 0.1), FadeIn(dans.cadre),
                  FadeIn(VGroup(*dans.lignes[:3])), run_time=0.5)
        self.suivre("DANS la boucle")
        self.play(FadeIn(dans.lignes[3], shift=RIGHT * 0.12), FadeIn(c_dans, shift=UP * 0.1),
                  FadeIn(s_dans, shift=UP * 0.1), run_time=0.5)
        self.suivre("décalé")
        self.play(Create(guide), run_time=0.45)
        self.suivre("après la boucle")
        self.play(FadeIn(l_apres, shift=DOWN * 0.1), FadeIn(apres.cadre), FadeIn(apres.lignes), run_time=0.5)
        self.suivre("une seule valeur")
        self.play(FadeIn(c_apres, shift=UP * 0.1), FadeIn(s_apres[0], shift=UP * 0.1),
                  Indicate(apres.lignes[3], color=PIEGE, scale_factor=1.15), run_time=0.5)
        self.suivre("le dernier terme")
        self.play(FadeIn(s_apres[1], shift=UP * 0.1), Indicate(c_apres.lignes, color=PIEGE, scale_factor=1.1),
                  run_time=0.5)
        # ligne courte : sous y = −2, un texte qui dépasse x = 5,4 touche Ti-Margo
        self.ligne([("Et", WHITE, "Et la variable"), ("i", RANG, None),
                    ("ne compte que les tours :", WHITE, "ne sert qu'à"),
                    ("pas le terme.", PIEGE, "ce n'est pas")], -3.1, x=-6.2, fs=34, rt=0.4)
        self.attendre_voix(marge=0.6)

    # ── 08 : question-pause n° 2 → A (u = 17 après 4 tours, c'est u₄) ──────

    def ecran_question2(self):
        prog = self.programme(["u = 5", "for i in range(4):", "    u = u + 3"], 24, ORIGIN, violet=[(1, 4, 5)])
        g1 = self.construire([("À la fin,", WHITE, "À la fin"), ("u", TERME, None), ("vaut", WHITE, "vaut"),
                              ("17 :", JUSTE, "17"), ("que représente", WHITE, "que représente"),
                              ("u", TERME, None), ("?", WHITE, None)], 36)
        q = self.question_prog("08-question", prog,
                               [(0, "u égale 5"), (1, "une boucle de 4 tours"), (2, "u égale u plus 3")],
                               [g1],
                               [self.choix([("u₄", "u indice 4")], 34), self.choix([("u₃", "u indice 3")], 34),
                                self.choix([("la raison de la suite", "la raison")], 34)],
                               0, largeur=6.4, fs=32)
        self.dire("08b-reponse")
        ok = self.q_reponse(q, 0)
        self.apres_question(q, 0, ok)
        lg = LigneTermes(["5", "", "", "", "17"], centre=P(0, 0.5), pas=2.0, largeur=1.35, hauteur=0.82, fs=34,
                         noms=["u₀", "u₁", "u₂", "u₃", "u₄"])
        self.suivre("5")
        self.play(*self.anims_case(lg, 0), run_time=0.3)
        self.suivre("4 fois")
        self.play(LaggedStart(*[AnimationGroup(FadeIn(lg.cases[i][0], scale=0.8),
                                               FadeIn(lg.noms[i], shift=UP * 0.08),
                                               Create(self.arc_tour(lg, i - 1, cote=UP, creux=0.26)))
                                for i in range(1, 5)], lag_ratio=0.25), run_time=0.55)
        fin = self.ligne([("On arrive à", WHITE, "on arrive"), ("u₄", JUSTE, "u indice 4"),
                          (", qui vaut", WHITE, "qui vaut"), ("17.", JUSTE, "17")], -1.6, fs=46,
                         avec_k={3: [FadeIn(lg.cases[4][1], scale=1.4), *self.allumer_cases(lg, [4], JUSTE)]},
                         rt=0.4)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi : u = 10, 0,5 u + 4, trois tours ──────────────────────

    CODE_DEFI = ["u = 10", "for i in range(3):", "    u = 0.5 * u + 4"]

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        x0 = -6.2
        prog = self.programme(self.CODE_DEFI, 34, P(-3.3, 1.5), violet=[(1, 4, 5)])
        perso = nais(0.75).move_to(P(4.1, 2.25))
        fl = self.tourner(fleche_boucle(0.52).move_to(P(4.1, 0.55)))
        self.play(FadeIn(prog.cadre), FadeIn(perso, shift=UP * 0.15), run_time=0.35)   # le cadre AVANT les glyphes
        self.taper(prog, 0, [("u =", "u égale"), ("10", "10")])
        self.taper(prog, 1, [("for i in", "une boucle"), ("range(3):", "3", (fl,))])
        self.taper(prog, 2, [("u =", "qui fait"), ("0.5 * u", "0,5"), ("+ 4", "plus 4")])
        self.ligne([("D'abord :", JAUNE_TITRE, "Première étape"), ("que vaut", WHITE, "que vaut"),
                    ("u", TERME, None), ("à la fin ?", WHITE, "à la fin")], -0.75, x=x0, fs=42)
        self.ligne([("Ensuite :", JAUNE_TITRE, "Deuxième étape"),
                    ("quel terme de la suite est-ce ?", WHITE, "quel terme")], -1.6, x=x0, fs=42)
        self.defi_pause(-2.7, x=-1.8)
        self._defi = (tit, fl)

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, fl = self._defi
        fl.clear_updaters()
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        autres = [m for m in self.mobjects if m is not tit and m is not self._margo]
        self.play(*[FadeOut(m) for m in autres], ReplacementTransform(tit, cor), run_time=0.4)
        self.remove(*autres)
        prog = self.programme(self.CODE_DEFI, 24, P(-4.1, 1.3), violet=[(1, 4, 5)])
        tab = Tableau3((1.05, 2.5, 1.3), 0.62, 3, P(1.1, 1.3))
        ent = VGroup(*[self.t(txt, 22, coul, audit=False).move_to(tab.pos(j, 0))
                       for j, (txt, coul) in enumerate((("tour i", RANG), ("calcul", GREY_A), ("u", TERME)))])
        self.play(FadeIn(prog.cadre), FadeIn(prog.lignes), FadeIn(tab), FadeIn(ent), run_time=0.5)
        barre = self.surligner(prog, 0, TERME)
        bande, derniere = None, None
        for k, (avant, apres) in enumerate(zip(DEFI[:3], DEFI[1:])):
            nouvelle = tab.bande(k + 1)
            tour = self.t(str(k), 28, RANG).move_to(tab.pos(0, k + 1))
            self.suivre("Tour")
            self.suivre(str(k))                         # le numéro du tour est dit APRÈS le mot « tour »
            # la bande EN PREMIER : au-dessus du tableau, sous les nombres (voir l'écran 04)
            if bande is None:
                bande = nouvelle
                glisse = FadeIn(bande)
            else:
                glisse = Transform(bande, nouvelle)
            self.play(glisse, FadeIn(tour, scale=1.3), Transform(barre, prog.barre(1, RAISON)), run_time=0.35)
            calc = self.construire([("0,5 ×", RAISON, "0,5"), (fr(avant), WHITE, fr(avant)),
                                    ("+ 4", RAISON, "plus 4")], 22, 1e9).move_to(tab.pos(1, k + 1))
            self.montrer(calc, rt=0.25, rt_mid=0.2)
            derniere = self.t(fr(apres), 28, TERME).move_to(tab.pos(2, k + 1))
            self.suivre(fr(apres))
            self.play(FadeIn(derniere, scale=1.3), Transform(barre, prog.barre(2, TERME)), run_time=0.3)
        cadre_fin = SurroundingRectangle(derniere, color=JUSTE, buff=0.1, stroke_width=4, corner_radius=0.06)
        f1 = self.ligne([("À la fin,", WHITE, "À la fin"), ("u vaut", WHITE, "u vaut"), ("8,25.", JUSTE, "8,25")],
                        -0.95, x=-6.2, fs=46,
                        avec_k={2: [Create(cadre_fin), derniere.animate.set_color(JUSTE), FadeOut(bande),
                                    FadeOut(barre)]}, rt=0.4)
        self.play(FadeIn(self.encadre(f1, JUSTE, 0.15)), run_time=0.3)
        f2 = self.ligne([("3 tours depuis", WHITE, "3 tours"), ("u₀", TERME, "u indice 0"),
                         (": c'est", WHITE, "c'est"), ("u₃.", JUSTE, "u indice 3")], -2.15, x=-6.2, fs=44)
        self.play(FadeIn(self.encadre(f2, JUSTE, 0.15)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        J = JAUNE_TITRE
        points = [[[("Une relation de récurrence tient en", WHITE, "Une relation")],
                   [("une seule ligne,", J, "une seule ligne"),
                    ("à l'intérieur de la boucle :", WHITE, "à l'intérieur")],
                   [("la nouvelle valeur", WHITE, "la nouvelle valeur"), ("écrase", PIEGE, "écrase"),
                    ("l'ancienne.", WHITE, "l'ancienne")]],
                  [[("range(n)", FONCTION, "range de n"), ("fait", WHITE, "fait"), ("n tours :", RAISON, "n tours")],
                   [("en partant de", WHITE, "en partant"), ("u₀", TERME, "u indice 0"),
                    (", on obtient", WHITE, "on obtient"), ("uₙ.", JUSTE, "u indice n")]],
                  [[("Pour voir tous les termes,", WHITE, "pour voir"), ("le print", FONCTION, "le print")],
                   [("se met DANS la boucle.", WHITE, "se met")]]]
        self.nouvel_ecran("10-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, J).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        blocs = []
        for pt in points:
            lignes = VGroup(*[self.construire(l, 40, 1e9) for l in pt]).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
            blocs.append(VGroup(self.coche(), lignes).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        if tout.width > 11.0:
            tout.scale_to_fit_width(11.0)
        if tout.height > 5.8:
            tout.scale_to_fit_height(5.8)
        tout.move_to(P(-0.4, -0.5))
        for bloc in blocs:
            for k, l in enumerate(bloc[1]):
                self.montrer(l, rt=0.3, avec_k={0: [Create(bloc[0])]} if k == 0 else None)
        self.attendre_voix(marge=0.8)

    def construct(self):
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_main, self.ecran_code, self.ecran_trace,
                  self.ecran_question1, self.ecran_rang, self.ecran_piege, self.ecran_question2, self.ecran_defi,
                  self.ecran_correction, self.ecran_appris, lambda: self.fin("11-abonne")]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (e == self.ecran_correction and "9" in choix.split(",")):
                e()
