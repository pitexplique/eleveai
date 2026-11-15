# 5e_volume_defi.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode V8 : DÉFIS SUR LES VOLUMES
# (micro volume_defi, notion volume_solide), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : 5e-volume-defi-short (le bidon sous la gouttière, 30 × 20 × 10 = 6 000 cm³ = 6 L).
# Décor et métier : Jonas, INSTALLATEUR DE RÉCUPÉRATEURS D'EAU DE PLUIE (centres nature-ecologie, meteo-climat) ;
# la seule mention de La Réunion de la série (écran 01).
# Mapping micro → écrans : 02 (la cuve cylindre : 3,14 × 1 × 1 × 2 = 6,28 m³ = 6 280 L), 03 (le jardin :
# 6 280 ÷ 150, un peu plus de 41 : 41 jours), 04 (méthode : la formule, la conversion, la vraie question),
# 06 (piège : la même unité avant de multiplier ; convertir à la fin), questions 05 (A : 2 × 1 000 = 2 000 L) et
# 07 (C : 50 × 40 × 30 = 60 000 cm³ = 60 L), défi 08 (40 mm = 0,04 m ; 60 × 0,04 = 2,4 m³ = 2 400 L ;
# la cuve de 2 000 L déborde de 400 L).
# Fiche : lib/fiches/maths-5e-volumes.tsx.
# Voix : manim/voix/5e-volume-defi.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_volume_defi_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py volume-defi).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_volume_defi.py VolumeDefi5e
# Sortie finale : manim/sorties/5e/maths/volume/08-volume-defi/eleveai-maths-5e-volume-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

CUVE = dict(corps="#22c55e", dessus="#86efac", bord="#14532d")   # la cuve (plastique vert)
EAU_C = "#38bdf8"                                                # l'eau, la pluie
MUR_C, MUR_B = "#fef3c7", "#92400e"                              # le mur de la maison
TOLE_C, TOLE_B = "#dc2626", "#7f1d1d"                            # le toit en tôle
GOUTT_C = "#94a3b8"                                              # la gouttière et la descente
TERRE_C, TERRE_B = "#92400e", "#451a03"                          # la terre du jardin


# ── les dessins de l'épisode ─────────────────────────────────────────────────

def goutte(p, s=0.1, couleur=EAU_C):
    """Une goutte de pluie (pointe en haut), centrée sur le point p."""
    rond = Circle(radius=s, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(p)
    pointe = Polygon(p + P(-s * 0.92, s * 0.38), p + P(s * 0.92, s * 0.38), p + P(0, s * 2.3), fill_color=couleur,
                     fill_opacity=1, stroke_width=0)
    return VGroup(rond, pointe)


def pluie(x0, x1, y0, y1, n=12, s=0.09, graine=3):
    """Des gouttes semées dans le rectangle [x0, x1] × [y0, y1] (en quinconce, un peu de hasard)."""
    import random
    rnd = random.Random(graine)
    g = VGroup()
    cols = max(2, int(round(n / 2)))
    for k in range(n):
        i, j = k % cols, k // cols
        x = x0 + (x1 - x0) * (i + 0.5 + (0.5 if j % 2 else 0) * 0.9) / (cols + 0.5) + rnd.uniform(-0.05, 0.05)
        y = y1 - (y1 - y0) * (j + 0.5) / max(1, (n + cols - 1) // cols) + rnd.uniform(-0.08, 0.08)
        g.add(goutte(P(x, y), s))
    return g


def maison(x, y, l=1.9, h=1.4, th=0.75):
    """La maison vue de face, côté gouttière : (x, y) = le coin bas-gauche du mur. Toit en tôle (trapèze),
    gouttière sous le bord du toit, descente à droite. Attributs : .mur .toit .gouttiere .descente .bout (le bas
    de la descente) .x_desc"""
    mur = Polygon(P(x, y), P(x + l, y), P(x + l, y + h), P(x, y + h), fill_color=MUR_C, fill_opacity=1,
                  stroke_color=MUR_B, stroke_width=4)
    toit = Polygon(P(x - 0.3, y + h), P(x + l + 0.3, y + h), P(x + l - 0.15, y + h + th), P(x + 0.15, y + h + th),
                   fill_color=TOLE_C, fill_opacity=1, stroke_color=TOLE_B, stroke_width=4)
    ondes = VGroup(*[Line(P(x + 0.05 + k * (l + 0.1) / 7, y + h + 0.04), P(x + 0.2 + k * (l - 0.2) / 7, y + h + th - 0.04))
                     for k in range(1, 7)]).set_stroke(TOLE_B, 2)
    porte = Rectangle(width=0.42, height=0.8, fill_color="#92400e", fill_opacity=1, stroke_width=0)
    porte.move_to(P(x + 0.5, y + 0.4))
    fen = Rectangle(width=0.55, height=0.42, fill_color="#7dd3fc", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    fen.move_to(P(x + l - 0.55, y + h * 0.58))
    x_desc = x + l + 0.75
    gouttiere = Rectangle(width=l + 1.15, height=0.1, fill_color=GOUTT_C, fill_opacity=1, stroke_color="#334155",
                          stroke_width=2).move_to(P(x - 0.3 + (l + 1.15) / 2, y + h - 0.05))
    v = VGroup(mur, porte, fen, toit, ondes, gouttiere)
    v.mur, v.toit, v.gouttiere, v.x_desc, v.y_gout = mur, toit, gouttiere, x_desc, y + h - 0.05
    return v


def descente(m, y_bas):
    """Le tuyau de descente : du bout de la gouttière jusqu'à y_bas (le haut de la cuve)."""
    return Rectangle(width=0.1, height=m.y_gout - y_bas, fill_color=GOUTT_C, fill_opacity=1, stroke_color="#334155",
                     stroke_width=2).move_to(P(m.x_desc, (m.y_gout + y_bas) / 2))


def jardin(x0, x1, y, n=5, graine=5):
    """Le jardin : une bande de terre, des plantes (tige + feuilles + fleur)."""
    import random
    rnd = random.Random(graine)
    terre = Polygon(P(x0, y - 0.22), P(x1, y - 0.22), P(x1, y + 0.05), P(x0, y + 0.05), fill_color=TERRE_C,
                    fill_opacity=1, stroke_color=TERRE_B, stroke_width=3)
    plantes = VGroup()
    coul = ["#f472b6", "#facc15", "#fb7185", "#c084fc", "#f8fafc"]
    for k in range(n):
        px = x0 + (x1 - x0) * (k + 0.5) / n
        ht = 0.45 + 0.25 * rnd.random()
        tige = Line(P(px, y), P(px, y + ht), color="#15803d", stroke_width=5)
        f1 = Ellipse(width=0.26, height=0.12, fill_color="#22c55e", fill_opacity=1, stroke_width=0).rotate(0.5)
        f1.move_to(P(px + 0.11, y + ht * 0.45))
        f2 = Ellipse(width=0.26, height=0.12, fill_color="#22c55e", fill_opacity=1, stroke_width=0).rotate(-0.5)
        f2.move_to(P(px - 0.11, y + ht * 0.6))
        fl = Circle(radius=0.09, fill_color=coul[k % len(coul)], fill_opacity=1, stroke_width=0).move_to(P(px, y + ht))
        plantes.add(VGroup(tige, f1, f2, fl))
    v = VGroup(terre, plantes)
    v.terre, v.plantes = terre, plantes
    return v


def cuve(r, h, u, o):
    return cylindre(r, h, u, o, **CUVE)


class VolumeDefi5e(Paysage5e):
    nom_voix = "5e-volume-defi"
    fichier_marques = "5e_volume_defi_marques.json"
    ceinture = "bleue"

    def etiquette(self, s, fs=28, couleur=WHITE):
        """Une étiquette sur cartouche, posée sur un dessin, hors audit (le nombre est dit dans la colonne)."""
        t = self.t(s, fs, couleur)
        hors_audit(t)
        return sur_fond(t)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les volumes", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis sur les volumes")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien d'eau de pluie", "peut-on garder ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        c = cuve(1, 1.6, 0.62, P(3.7, -0.75))
        gt = pluie(2.9, 4.5, 0.75, 1.75, n=8, s=0.08)
        self.au_mot("Combien d'eau")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(c, scale=0.8), run_time=0.5)
        self.au_mot("peut-on garder")
        self.play(FadeIn(q[1], shift=UP * 0.2), LaggedStart(*[FadeIn(g, shift=DOWN * 0.3) for g in gt],
                                                            lag_ratio=0.08), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Jonas, installateur de récupérateurs d'eau de pluie ────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        jo = jonas(1.0).move_to(P(-5.3, 0.15))
        self.au_mot("Voici Jonas")
        nom = self.t("Jonas", 40, BLEU_CALCUL).next_to(jo, UP, buff=0.25)
        self.play(FadeIn(jo, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("récupérateurs d'eau de pluie")
        met = self.bloc(["récupérateurs", "d'eau de pluie"], 26, BLEU_CALCUL).next_to(jo, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("À La Réunion")
        lr = self.t("À La Réunion,", 34, "#fbbf24").move_to(P(-0.2, 3.0))
        self.play(FadeIn(lr, shift=DOWN * 0.1), run_time=0.4)
        sol = -1.55
        m = maison(-3.55, sol, l=1.8, h=1.3, th=0.7)
        c = cuve(1, 2, 0.42, P(m.x_desc, sol))
        d = descente(m, sol + 2 * 0.42 + 0.06)
        gt = pluie(-3.7, -1.6, 0.85, 1.85, n=10, s=0.08)
        l1 = self.bloc(["Beaucoup de", "maisons gardent", "l'eau du toit"], 32)
        self.col(l1, 1.95, 2.3)
        self.au_mot("beaucoup de maisons")
        self.play(FadeIn(m, shift=UP * 0.2), FadeIn(c, shift=UP * 0.2), FadeIn(d), FadeIn(l1[0], shift=UP * 0.1),
                  FadeIn(l1[1][:7], shift=UP * 0.1), run_time=0.5)
        self.au_mot("gardent l'eau du toit")
        self.play(FadeIn(l1[1][7:], shift=UP * 0.1), FadeIn(l1[2], shift=UP * 0.1), LaggedStart(*[FadeIn(g, shift=DOWN * 0.3) for g in gt],
                                                             lag_ratio=0.06), run_time=0.6)
        self.play(Indicate(m.gouttiere, color=EAU_C, scale_factor=1.04), Indicate(c, color=EAU_C, scale_factor=1.05),
                  run_time=0.5)
        j = jardin(-0.2, 1.9, sol, n=5)
        l2 = self.bloc(["pour arroser", "le jardin."], 32, "#4ade80")
        self.col(l2, 0.05, 2.3)
        self.au_mot("pour arroser le jardin")
        self.play(FadeIn(j, shift=UP * 0.15), FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        qm = self.t("?", 40, JAUNE_TITRE)
        hors_audit(qm)
        sur_fond(qm).move_to(P(m.x_desc, sol + 0.42))
        l3 = self.bloc(["Jonas doit choisir", "la bonne cuve."], 34, JAUNE_TITRE)
        self.col(l3, -1.15, 2.3)
        self.au_mot("choisir la bonne cuve")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(qm, scale=1.3), Indicate(c, color=JAUNE_TITRE, scale_factor=1.06),
                  run_time=0.5)
        self.attendre_voix()

    # ── 02 : la cuve cylindre (3,14 × 1 × 1 × 2 = 6,28 m³ = 6 280 L) ────────
    def cuve_cylindre(self):
        """La cuve de l'écran 02 : r = 1 m, h = 2 m (1 unité = 1 m), à gauche."""
        u, o = 1.15, P(-3.9, -2.0)
        c = cuve(1, 2, u, o)
        haut = o + P(0, 2 * u)
        c.rayon = Line(haut, haut + P(u, 0), color=BASE_C, stroke_width=7)
        c.centre = Dot(haut, radius=0.06, color=BASE_C)
        c.hauteur = Line(o + P(u + 0.3, 0), o + P(u + 0.3, 2 * u), color=HAUTEUR_C, stroke_width=7)
        c.c_r = cote(c.rayon, "1 m", UP, fs=28, couleur=BASE_C, audit=False, buff=0.3, fond=True)
        c.c_h = cote(c.hauteur, "2 m", RIGHT, fs=28, couleur=HAUTEUR_C, audit=False, buff=0.15)
        c.milieu = o + P(0, u)
        return c

    def ecran_cuve(self):
        self.ecran("02-cuve")
        c = self.cuve_cylindre()
        l0 = self.t("Un cylindre :", 38, JAUNE_TITRE)
        self.col(l0, 2.75)
        self.au_mot("un cylindre")
        self.play(FadeIn(c, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.5)
        l1 = self.ligne([("1 m", BASE_C), ("de rayon,", BASE_C)], 36)
        self.col(l1, 2.1)
        l1b = self.ligne([("2 m", HAUTEUR_C), ("de haut.", HAUTEUR_C)], 36)
        self.col(l1b, 1.5)
        self.au_mot("cylindre : 1")
        self.play(Create(c.rayon), FadeIn(c.centre), FadeIn(c.c_r), FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("de rayon")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("rayon, 2")
        self.play(Create(c.hauteur), FadeIn(c.c_h), FadeIn(l1b[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("de haut")
        self.play(FadeIn(l1b[1], shift=UP * 0.1), run_time=0.25)
        l2 = self.t("Son volume :", 36, WHITE)
        self.col(l2, 0.8)
        self.au_mot("Son volume")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("3,14", BLEU_D), ("× 1", BASE_C), ("× 1", BASE_C), ("× 2", HAUTEUR_C)], 42, buff=0.3)
        self.col(l3, 0.1)
        self.au_mot("3,14")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 1")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(c.rayon, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.3)
        self.au_mot("fois 1", 2)
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("fois 2")
        self.play(FadeIn(l3[3], shift=UP * 0.1), Indicate(c.hauteur, color=JAUNE_TITRE, scale_factor=1.05),
                  run_time=0.3)
        l4 = self.t("= 6,28 m³", 42, VERT_OK)
        self.col(l4, -0.6)
        e628 = self.etiquette("6,28 m³", 30).move_to(c.milieu)
        self.au_mot("6,28 mètres cubes")
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(e628, scale=1.2), run_time=0.4)
        l5 = self.t("En litres :", 36, WHITE)
        self.col(l5, -1.4)
        self.au_mot("En litres")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        res = self.gros("6 280 L", fs=42)
        res.next_to(l5, RIGHT, buff=0.3)
        self.au_mot("6 280 litres")
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : le jardin (6 280 ÷ 150 : un peu plus de 41 ; 41 jours) ─────────
    def ecran_jardin(self):
        self.ecran("03-jardin")
        sol = -1.95
        c = cuve(1, 2, 0.85, P(-5.2, sol))
        e = self.etiquette("6 280 L", 22).move_to(P(-5.2, sol + 0.85))
        tuyau = Line(P(-4.35, sol + 0.25), P(-3.9, sol + 0.25), color=GOUTT_C, stroke_width=9)
        j = jardin(-3.9, -1.6, sol, n=5)
        self.add(c, e, tuyau, j)
        l1 = self.t("Le jardin boit", 36, "#4ade80")
        self.col(l1, 2.6)
        self.au_mot("Le jardin boit")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(j.plantes, color=EAU_C, scale_factor=1.08), run_time=0.4)
        l2 = self.ligne([("150 L", BLEU_D), ("par jour.", BLEU_D)], 36)
        self.col(l2, 1.9)
        gj = VGroup(*[goutte(P(-3.67 + 0.46 * k, sol + 1.15), 0.09) for k in range(5)])
        self.au_mot("boit 150")
        self.play(FadeIn(l2[0], shift=UP * 0.1), LaggedStart(*[FadeIn(g, shift=DOWN * 0.25) for g in gj],
                                                             lag_ratio=0.1), run_time=0.5)
        self.au_mot("par jour")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("6 280", BLEU_D), ("÷ 150 :", BLEU_D)], 40, buff=0.2)
        self.col(l3, 1.0)
        self.au_mot("6 280")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(e, color=JAUNE_TITRE, scale_factor=1.1), run_time=0.35)
        self.au_mot("divisé par 150")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        l4 = self.t("un peu plus de 41.", 36, VERT_OK)
        self.col(l4, 0.2)
        self.au_mot("un peu plus de 41")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        # un calendrier de 41 cases : un jour d'arrosage par case (10 par rangée)
        cases = VGroup(*[Square(0.3, fill_color="#334155", fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
                         for _ in range(41)])
        for k, s in enumerate(cases):
            s.move_to(P(-5.75 + 0.37 * (k % 10), 1.85 - 0.37 * (k // 10)))
        bande = Rectangle(width=3.76, height=0.3, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0)
        bande.move_to(P(-5.75 + 0.37 * 4.5, 2.27))
        anneaux = VGroup(*[RoundedRectangle(width=0.1, height=0.28, corner_radius=0.05, fill_color=GRAY_B,
                                            fill_opacity=1, stroke_width=0).move_to(P(xx, 2.42)) for xx in (-5.1, -3.0)])
        cal = VGroup(bande, anneaux, cases)
        res = self.gros("41 jours", fs=44)
        self.col(res, -0.85)
        self.au_mot("La cuve pleine")
        self.play(FadeIn(cal), run_time=0.3)
        self.play(LaggedStart(*[s.animate.set_fill("#4ade80") for s in cases], lag_ratio=0.03), run_time=1.0)
        self.au_mot("pendant 41 jours")
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        self.au_mot("La méthode d'un défi")
        l0 = self.t("La méthode d'un défi :", 40, JAUNE_TITRE)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        x = -4.3
        ic1 = cuve(1, 1.6, 0.34, P(-5.35, 1.25))
        b1 = self.bloc(["On calcule le volume", "avec la bonne formule."], 36, WHITE)
        gauche(b1, x, 1.75)
        self.au_mot("on calcule le volume")
        self.play(FadeIn(b1[0], shift=UP * 0.1), FadeIn(ic1, scale=0.9), run_time=0.35)
        self.au_mot("avec la bonne formule")
        self.play(FadeIn(b1[1], shift=UP * 0.1), run_time=0.35)
        ic2 = Arrow(P(-5.85, 0.25), P(-4.85, 0.25), color=BLEU_D, stroke_width=8, buff=0,
                    max_tip_length_to_length_ratio=0.35)
        b2 = self.bloc(["On le convertit dans", "l'unité de la question."], 36, BLEU_D)
        gauche(b2, x, 0.25)
        self.au_mot("On le convertit")
        self.play(FadeIn(b2[0], shift=UP * 0.1), GrowArrow(ic2), run_time=0.35)
        self.au_mot("l'unité de la question")
        self.play(FadeIn(b2[1], shift=UP * 0.1), run_time=0.35)
        ic3 = self.coche(VERT_OK, 0.3).move_to(P(-5.35, -1.25))
        b3 = self.bloc(["Puis on répond", "à la vraie question."], 36, VERT_OK)
        gauche(b3, x, -1.25)
        self.au_mot("Puis on répond")
        self.play(FadeIn(b3[0], shift=UP * 0.1), FadeIn(ic3, scale=1.2), run_time=0.35)
        self.au_mot("à la vraie question")
        self.play(FadeIn(b3[1], shift=UP * 0.1), run_time=0.35)
        self.insister(b3, 1.05, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = cuve(1, 1.5, 0.95, P(-3.7, 0.45))
        e2 = self.etiquette("2 m³", 32).move_to(P(-3.7, 0.45 + 0.75 * 0.95))

        def avant(sc):
            sc.play(FadeIn(c), FadeIn(e2), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Une cuve contient 2 m³.", "Combien de litres ?"],
                             [self.choix("2 000 L"), self.choix("200 L"), self.choix("20 000 L")], 0,
                             ["1 m³ = 1 000 L.", "2 × 1 000 = 2 000 L."],
                             -0.45, couper={0: ("1 m³", "= 1 000 L."), 1: ("2 ×", "1 000", "= 2 000 L.")},
                             mot_q="Une cuve", avant_q=avant)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        pv = pave(5, 4, 3, 0.5, P(-5.9, -0.9))
        q = pv.pt
        aretes = VGroup(Line(q(0, 0, 0), q(5, 0, 0)), Line(q(5, 0, 0), q(5, 4, 0)), Line(q(0, 0, 0), q(0, 0, 3)))
        aretes.set_stroke(JAUNE_TITRE, 9)
        self.add(pv)
        x = -0.4
        l1 = self.bloc(["Toutes les longueurs", "dans la même unité", "avant de multiplier."], 36, JAUNE_TITRE)
        self.col(l1, 1.5, x)
        self.au_mot("Toutes les longueurs")
        self.play(FadeIn(l1[0], shift=UP * 0.1), LaggedStart(*[Create(a) for a in aretes], lag_ratio=0.3),
                  run_time=0.6)
        self.au_mot("dans la même unité")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(aretes, color=WHITE, scale_factor=1.03), run_time=0.4)
        self.au_mot("avant de multiplier")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.35)
        l2 = self.bloc(["Et à la fin,", "on convertit dans", "l'unité demandée."], 36, VERT_OK)
        self.col(l2, -0.95, x)
        self.au_mot("Et à la fin")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("on convertit")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(pv, color=VERT_OK, scale_factor=1.03), run_time=0.4)
        self.au_mot("l'unité demandée")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.35)
        self.insister(l2, 1.05, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.44
        pv = pave(5, 4, 3, u, P(-5.0, 0.55))
        q = pv.pt
        c50 = cote(Line(q(0, 0, 0), q(5, 0, 0)), "50 cm", DOWN, fs=26, couleur=BASE_C, audit=False, buff=0.12)
        c30 = cote(Line(q(0, 0, 0), q(0, 0, 3)), "30 cm", LEFT, fs=26, couleur=HAUTEUR_C, audit=False, buff=0.12)
        c40 = cote(Line(q(5, 0, 0), q(5, 4, 0)), "40 cm", RIGHT, fs=26, couleur=BASE_C, audit=False, buff=0.12)
        c40.shift(DOWN * 0.12)

        def avant(sc):
            sc.play(FadeIn(pv), FadeIn(c50), FadeIn(c30), FadeIn(c40), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Une cuve en pavé :", "50 cm, 40 cm et 30 cm.", "Combien de litres ?"],
                             [self.choix("600 L"), self.choix("6 L"), self.choix("60 L")], 2,
                             ["50 × 40 × 30", "= 60 000 cm³.", "1 L = 1 000 cm³ :", "60 L."],
                             -0.45, couper={0: ("50 ×", "40 ×", "30"), 2: ("1 L", "= 1 000 cm³ :")},
                             sans_audit=(1,),  # « 60 000 » : l'audit colle les milliers (faux ABSENT), la ligne reste au mot
                             mot_q="Une cuve", avant_q=avant)

    # ── 08 : le défi (le toit, la pluie, la cuve de 2 000 L) ────────────────
    def decor_defi(self):
        """La maison (toit de 60 m²) et sa cuve de 2 000 L, à gauche ; les gouttes au-dessus du toit."""
        sol = -1.75
        m = maison(-6.0, sol, l=2.1, h=1.6, th=0.85)
        u = 0.62
        c = cuve(1, 2, u, P(m.x_desc, sol))
        d = descente(m, sol + 2 * u + 0.08)
        gt = pluie(-6.0, -3.85, 0.95, 2.25, n=12, s=0.085)
        return m, c, d, gt, u, sol

    def pause_defi(self, y=-2.4, marge=2.0, x=-2.4):
        """« Mets pause, et cherche ! » à gauche (x = −2,4), sous les dessins : plus à droite, son « ! » touchait
        Ti Margo (comme dans 5e_volume_pave.py)."""
        self.au_mot("Mets pause")
        p = gauche(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), x, y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        m, c, d, gt, u, sol = self.decor_defi()
        x = -0.6
        l1 = self.ligne([("Un toit mesure", WHITE), ("60 m².", TOLE_C)], 34)
        self.col(l1, 2.2, x)
        e60 = self.etiquette("60 m²", 26).move_to(m.toit.get_center() + UP * 0.05)
        self.au_mot("Un toit mesure")
        self.play(FadeIn(m, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("60 mètres carrés")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(e60, scale=1.2), run_time=0.35)
        l2 = self.ligne([("Il tombe", WHITE), ("40 mm", EAU_C), ("de pluie.", EAU_C)], 34)
        self.col(l2, 1.5, x)
        c40 = self.t("40 mm", 28, EAU_C)
        hors_audit(c40)
        c40.next_to(gt, RIGHT, buff=0.25)
        self.au_mot("Il tombe")
        self.play(FadeIn(l2[0], shift=UP * 0.1), LaggedStart(*[FadeIn(g, shift=DOWN * 0.3) for g in gt],
                                                             lag_ratio=0.05), run_time=0.5)
        self.au_mot("tombe 40")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(c40), run_time=0.35)
        self.au_mot("de pluie")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.bloc(["Toute l'eau va dans", "une cuve de 2 000 L."], 34, WHITE)
        self.col(l3, 0.55, x)
        e2000 = self.etiquette("2 000 L", 24).move_to(P(m.x_desc, sol + u))
        self.au_mot("Toute l'eau va dans")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(d), FadeIn(c, shift=UP * 0.2), run_time=0.4)
        self.au_mot("une cuve de 2 000 litres")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(e2000, scale=1.2), run_time=0.35)
        l4 = self.bloc(["La cuve déborde-t-elle ?", "De combien ?"], 36, JAUNE_TITRE)
        self.col(l4, -0.95, x)
        self.au_mot("La cuve déborde-t-elle")
        self.play(FadeIn(l4[0], shift=UP * 0.1), Indicate(c, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.4)
        self.au_mot("De combien")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        m, c, d, gt, u, sol = self.decor_defi()
        e60 = self.etiquette("60 m²", 26).move_to(m.toit.get_center() + UP * 0.05)
        e2000 = self.etiquette("2 000 L", 24).move_to(P(m.x_desc, sol + u))
        self.add(m, d, c, e60, e2000)
        x = -0.6
        l1 = self.ligne([("40 mm,", EAU_C), ("c'est 0,04 m.", VERT_OK)], 36, buff=0.2)
        self.col(l1, 2.2, x)
        self.au_mot("40 millimètres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(gt), run_time=0.35)
        self.au_mot("c'est 0,04")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        l2 = self.t("Le volume d'eau :", 34, WHITE)
        self.col(l2, 1.5, x)
        self.au_mot("Le volume d'eau")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("60", BLEU_D), ("× 0,04", BLEU_D), ("= 2,4 m³,", VERT_OK)], 38, buff=0.2)
        self.col(l3, 0.8, x)
        self.au_mot("60 fois")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(e60, color=JAUNE_TITRE, scale_factor=1.1), run_time=0.3)
        self.au_mot("0,04,")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2,4 mètres cubes")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        l4 = self.t("soit 2 400 L.", 38, VERT_OK)
        self.col(l4, 0.1, x)
        self.au_mot("soit 2 400 litres")
        self.play(FadeIn(l4, shift=UP * 0.1), LaggedStart(*[g.animate.shift(DOWN * 0.35).set_opacity(0) for g in gt],
                                                          lag_ratio=0.04), run_time=0.6)
        l5 = self.ligne([("La cuve fait", WHITE), ("2 000 L :", WHITE)], 34)
        self.col(l5, -0.6, x)
        self.au_mot("La cuve fait")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2 000 litres")
        self.play(FadeIn(l5[1], shift=UP * 0.1), Indicate(e2000, color=JAUNE_TITRE, scale_factor=1.1), run_time=0.3)
        res = self.gros("Elle déborde de 400 L.", fs=40)
        self.col(res, -1.5, x)
        haut = P(m.x_desc, sol + 2 * u)
        flots = VGroup(*[goutte(haut + P(dx, 0.05), 0.085) for dx in (-0.7, -0.62, 0.62, 0.7)])
        e400 = self.t("400 L", 28, ROUGE_ERREUR)
        hors_audit(e400)
        e400.next_to(haut, RIGHT, buff=0.75).shift(UP * 0.2)
        self.au_mot("elle déborde de 400 litres")
        self.play(FadeIn(res, scale=1.2), FadeIn(e400, scale=1.2),
                  LaggedStart(*[f.animate.shift(DOWN * 0.6) for f in flots], lag_ratio=0.1), run_time=0.6)
        self.insister(res, 1.06, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        c = cuve(1, 2, 0.75, ORIGIN)
        gt = pluie(-0.8, 0.8, 1.85, 2.6, n=6, s=0.08)
        fig = VGroup(c, gt)
        lignes = self.finale_gauche(fig, textes=[
            ("Dans un défi de volume :", "on met tout dans la même unité,"),
            ("on applique la formule,", "puis on convertit."),
            ("1 m³ = 1 000 L.",)], fs=32)
        self.add(fig)
        self.au_mot("Dans un défi de volume")
        self.montrer_ligne(lignes[0], Indicate(fig, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("on applique la formule")
        self.montrer_ligne(lignes[1])
        self.au_mot("1 mètre cube égale 1 000 litres")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_cuve()
        self.ecran_jardin()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
