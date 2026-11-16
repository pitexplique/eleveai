# duree_commun.py
# EleveAI — Maths CP → 6e — série « Durées » (16/11/2026, thème GRANDEURS ET MESURES).
# Le dessin commun à toutes les classes (pur dessin : manim + charte, aucune scène, aucune voix) :
#   - horloge(...)         l'horloge à aiguilles (cadran crème, mêmes couleurs que le coach : petite aiguille
#                          BLEUE = les heures, grande aiguille ROUGE = les minutes, trotteuse orange en option)
#   - regler / tourner     poser ou faire tourner les aiguilles (la petite avance AVEC la grande, comme en vrai)
#   - frise(...)           la frise du temps (jalons « 9 h 40 », « 10 h ») et ses bonds (« + 20 min »)
#   - ecran_digital(...)   l'heure d'un réveil / d'un écran (« 15:45 »)
#   - tableau_hms(...)     le tableau h | min | s
#   - hm(h, m)             « 9 h 40 », « 10 h », « 0 h 05 »
# Importé par cp/, ce1/, ce2/, cm1/duree_cm1_commun.py, cm2/, 6e/ : ne rien y casser sans relire ces scènes.
# Test visuel : python -m manim render -ql -s manim/scripts/cp/duree_commun.py TestHorlogeFrise --media_dir %TEMP%/duree-test

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/

import numpy as np  # noqa: E402
from manim import *  # noqa: E402,F403

from charte import *  # noqa: E402,F403

# ── Couleurs (celles du canvas du coach `lib/canvas/DureeCanvas.tsx`, palette 0) ─────────────
CADRAN = "#fefce8"       # le cadran crème
LUNETTE = "#1e293b"      # le tour de l'horloge
LUNETTE_B = "#facc15"    # le liseré doré
CHIFFRES = "#0f172a"     # les nombres du cadran
AIG_H = "#2563eb"        # petite aiguille : les HEURES (bleue)
AIG_M = "#ef4444"        # grande aiguille : les MINUTES (rouge)
AIG_S = ORANGE_RETENUE   # trotteuse : les secondes
MIN_TXT = "#64748b"      # les minutes écrites autour (5, 10, … 55)
FRISE = "#e2e8f0"        # le trait de la frise
BOND = ORANGE_RETENUE    # les bonds sur la frise
BOND2 = BLEU_CALCUL      # un second type de bond (les heures pleines)


def P(x, y):
    return np.array([x, y, 0.0])


def hm(h, m=0, zero_h=False):
    """« 9 h 40 », « 10 h », « 11 h 05 ». Les minutes s'écrivent sur 2 chiffres."""
    if m == 0 and not zero_h:
        return f"{h} h"
    return f"{h} h {m:02d}"


def duree_txt(minutes):
    """Une durée en minutes → « 1 h 35 min », « 20 min », « 2 h »."""
    h, m = divmod(int(minutes), 60)
    if h and m:
        return f"{h} h {m} min"
    if h:
        return f"{h} h"
    return f"{m} min"


def _angle(fraction_tour):
    """Angle Manim (radians, sens trigo) d'une aiguille qui a fait `fraction_tour` tour depuis 12 h."""
    return PI / 2 - TAU * fraction_tour


def _aiguille(longueur, largeur, couleur, queue=0.18):
    """Une aiguille effilée (losange allongé), pointe vers le HAUT, pivot en (0, 0)."""
    pts = [P(0, longueur), P(largeur / 2, longueur * 0.12), P(largeur * 0.32, -longueur * queue),
           P(-largeur * 0.32, -longueur * queue), P(-largeur / 2, longueur * 0.12)]
    return Polygon(*pts, fill_color=couleur, fill_opacity=1, stroke_color=couleur, stroke_width=1.5)


def horloge(r=1.6, h=12, m=0, s=None, nombres=True, minutes_ecrites=False, graduations=True,
            avec_secondes=False):
    """L'horloge à aiguilles, centrée en ORIGIN, rayon r.
    nombres : 1 à 12 sur le cadran ; minutes_ecrites : 5, 10 … 55 en petit autour (CE2 et +) ;
    graduations : les 60 petits traits (gros trait toutes les 5 minutes) ;
    avec_secondes : une trotteuse orange (CM2, 6e).
    Attributs : .centre(), .r, .aig_h, .aig_m, .aig_s (ou None), .nums (dict 1..12), .mins (dict 5..55),
    .heure = (h, m, s) courante. regler(hg, h, m, s) la remet à l'heure, tourner(hg, h, m) l'anime."""
    g = VGroup()
    lunette = Circle(radius=r * 1.09, fill_color=LUNETTE, fill_opacity=1, stroke_color=LUNETTE_B, stroke_width=5)
    cadran = Circle(radius=r, fill_color=CADRAN, fill_opacity=1, stroke_color="#cbd5e1", stroke_width=2)
    g.add(lunette, cadran)
    traits = VGroup()
    if graduations:
        for k in range(60):
            a = _angle(k / 60)
            gros = k % 5 == 0
            l1 = r * (0.86 if gros else 0.92)
            traits.add(Line(P(np.cos(a) * l1, np.sin(a) * l1), P(np.cos(a) * r * 0.97, np.sin(a) * r * 0.97),
                            color=CHIFFRES, stroke_width=4 if gros else 1.6))
    g.add(traits)
    nums = {}
    vg_nums = VGroup()
    if nombres:
        for k in range(1, 13):
            a = _angle(k / 12)
            t = Text(str(k), font_size=int(30 * r / 1.6), color=CHIFFRES, weight=BOLD)
            t.move_to(P(np.cos(a) * r * 0.70, np.sin(a) * r * 0.70))
            nums[k] = t
            vg_nums.add(t)
    g.add(vg_nums)
    mins = {}
    vg_mins = VGroup()
    if minutes_ecrites:
        for k in range(1, 12):
            a = _angle(k / 12)
            t = Text(str(5 * k), font_size=int(17 * r / 1.6), color=WHITE, weight=BOLD)
            t.move_to(P(np.cos(a) * r * 1.21, np.sin(a) * r * 1.21))
            mins[5 * k] = t
            vg_mins.add(t)
        t0 = Text("0", font_size=int(17 * r / 1.6), color=WHITE, weight=BOLD).move_to(P(0, r * 1.21))
        mins[0] = t0
        vg_mins.add(t0)
    g.add(vg_mins)
    aig_h = _aiguille(r * 0.50, r * 0.13, AIG_H)
    aig_m = _aiguille(r * 0.80, r * 0.09, AIG_M)
    aig_s = None
    g.add(aig_h, aig_m)
    if avec_secondes:
        aig_s = Line(P(0, -r * 0.15), P(0, r * 0.86), color=AIG_S, stroke_width=2.5)
        g.add(aig_s)
    pivot = VGroup(Circle(radius=r * 0.065, fill_color=CHIFFRES, fill_opacity=1, stroke_width=0),
                   Circle(radius=r * 0.03, fill_color=LUNETTE_B, fill_opacity=1, stroke_width=0))
    g.add(pivot)
    g.r, g.lunette, g.cadran, g.traits = r, lunette, cadran, traits
    g.aig_h, g.aig_m, g.aig_s, g.pivot = aig_h, aig_m, aig_s, pivot
    g.nums, g.mins, g.vg_nums, g.vg_mins = nums, mins, vg_nums, vg_mins
    g.centre = lambda: g.cadran.get_center()
    g.echelle = lambda: g.cadran.width / (2 * r)
    g.heure = (12, 0, 0)
    g._ang = {"h": PI / 2, "m": PI / 2, "s": PI / 2}  # angles actuels (aiguilles dessinées vers le haut)
    regler(g, h, m, s or 0)
    return g


def _angles_de(h, m, s=0):
    tot_s = ((h % 12) * 3600 + m * 60 + s)
    return {"h": _angle(tot_s / 43200), "m": _angle((m * 60 + s) / 3600), "s": _angle(s / 60)}


def regler(hg, h, m=0, s=0):
    """Met l'horloge hg à h:m:s, sans animation."""
    cible = _angles_de(h, m, s)
    c = hg.centre()
    for cle, aig in (("h", hg.aig_h), ("m", hg.aig_m), ("s", hg.aig_s)):
        if aig is None:
            continue
        aig.rotate(cible[cle] - hg._ang[cle], about_point=c)
        hg._ang[cle] = cible[cle]
    hg.heure = (h, m, s)
    return hg


def tourner(hg, h, m=0, s=0, run_time=1.5, sens_horaire=True):
    """Animation : les aiguilles tournent de l'heure actuelle jusqu'à h:m:s, la petite avec la grande.
    Toujours dans le sens des aiguilles d'une montre (on avance dans le temps)."""
    h0, m0, s0 = hg.heure
    t0 = (h0 % 12) * 3600 + m0 * 60 + s0
    t1 = (h % 12) * 3600 + m * 60 + s
    if sens_horaire and t1 < t0:
        t1 += 43200
    if (h % 24) >= 12 and (h0 % 24) < 12 and t1 - t0 < 1:
        t1 += 43200 if t1 <= t0 else 0
    debut = dict(hg._ang)
    c = hg.centre()

    def maj(mob, alpha):
        t = t0 + (t1 - t0) * alpha
        cible = {"h": _angle(t / 43200), "m": _angle((t % 3600) / 3600), "s": _angle((t % 60) / 60)}
        for cle, aig in (("h", hg.aig_h), ("m", hg.aig_m), ("s", hg.aig_s)):
            if aig is None:
                continue
            # angle « déroulé » pour éviter un saut de 2π
            delta = -TAU * ((t - t0) / {"h": 43200, "m": 3600, "s": 60}[cle])
            voulu = debut[cle] + delta
            aig.rotate(voulu - hg._ang[cle], about_point=c)
            hg._ang[cle] = voulu
        return mob

    anim = UpdateFromAlphaFunc(hg, maj, run_time=run_time, rate_func=smooth)
    hg.heure = (h, m, s)
    return anim


def secteur_minutes(hg, m0, m1, couleur=BOND, opacite=0.35):
    """Le morceau de cadran balayé par la grande aiguille de m0 à m1 minutes (pour MONTRER une durée)."""
    a0 = _angle(m0 / 60)
    a1 = _angle(m1 / 60)
    s = AnnularSector(inner_radius=0, outer_radius=hg.cadran.width / 2 * 0.95, angle=a1 - a0, start_angle=a0,
                      fill_color=couleur, fill_opacity=opacite, stroke_width=0)
    s.shift(hg.centre())
    return s


def ecran_digital(texte="15:45", larg=2.4, fs=54, couleur="#22d3ee"):
    """L'écran d'un réveil ou d'un tableau d'affichage : fond noir bleuté, chiffres lumineux."""
    corps = RoundedRectangle(width=larg, height=fs / 54 * 1.0, corner_radius=0.14, fill_color="#0b1220",
                             fill_opacity=1, stroke_color="#475569", stroke_width=4)
    t = Text(texte, font="Consolas", font_size=fs, color=couleur, weight=BOLD).move_to(corps)
    g = VGroup(corps, t)
    g.corps, g.txt = corps, t
    return g


def frise(t_debut, t_fin, larg=10.0, jalons=None, fs=26, y_txt=-0.42, couleur=FRISE):
    """La frise du temps de t_debut à t_fin (en MINUTES depuis 0 h), longueur larg, centrée en ORIGIN.
    jalons : liste de minutes à marquer (par défaut le début, la fin et les heures pleines entre les deux).
    f.x(t) = l'abscisse de l'instant t ; f.jalon[t] = (trait, texte) ; f.bond(t0, t1, …) = un bond dessiné.
    L'échelle est RÉGULIÈRE (1 h prend toujours la même place) sauf si on passe `reguliere=False` via jalons."""
    if jalons is None:
        jalons = [t_debut] + [60 * k for k in range(t_debut // 60 + 1, t_fin // 60 + 1) if 60 * k < t_fin] + [t_fin]
    g = VGroup()
    ligne = Arrow(P(-larg / 2 - 0.3, 0), P(larg / 2 + 0.55, 0), buff=0, color=couleur, stroke_width=5,
                  max_tip_length_to_length_ratio=0.03, tip_length=0.25)
    g.add(ligne)
    ech = larg / max(t_fin - t_debut, 1)
    g.x = lambda t: g.ligne.get_start()[0] + 0.3 + (t - t_debut) * ech * g.ligne.width / (larg + 0.85)
    g.y = lambda: g.ligne.get_center()[1]
    g.ligne = ligne
    g.jalon = {}
    for t in jalons:
        trait = Line(P(0, 0.2), P(0, -0.2), color=couleur, stroke_width=5)
        trait.move_to(P(-larg / 2 + (t - t_debut) * ech, 0))
        h, m = divmod(t % 1440, 60)
        txt = Text(hm(h, m), font_size=fs, color=WHITE, weight=BOLD).next_to(trait, DOWN, buff=0.18)
        g.add(trait, txt)
        g.jalon[t] = (trait, txt)
    return g


def bond(f, t0, t1, texte=None, couleur=BOND, hauteur=None, fs=26, dessous=False):
    """Un bond en arc au-dessus de la frise f, de l'instant t0 à t1, avec son texte (« + 20 min »)."""
    xa, xb = f.x(t0), f.x(t1)
    y = f.y()
    corde = max(abs(xb - xa), 0.05)
    if hauteur is None:
        hauteur = min(0.95, 0.3 + 0.12 * corde)   # flèche (hauteur de l'arc) en unités Manim
    hauteur = min(hauteur, corde / 2)
    sgn = -1 if dessous else 1
    angle = 4 * np.arctan(2 * hauteur / corde)
    arc = ArcBetweenPoints(P(xa, y + sgn * 0.12), P(xb, y + sgn * 0.12), angle=-sgn * angle,
                           color=couleur, stroke_width=6)
    pointe = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.11)
    pointe.rotate(-PI / 2 if not dessous else PI / 2).move_to(P(xb - 0.03, y + sgn * 0.2))
    g = VGroup(arc, pointe)
    if texte is None:
        texte = "+ " + duree_txt(t1 - t0)
    t = Text(texte, font_size=fs, color=couleur, weight=BOLD)
    t.next_to(arc, UP if not dessous else DOWN, buff=0.1)
    g.add(t)
    g.arc, g.pointe, g.txt = arc, pointe, t
    return g


def tableau_hms(valeurs=("", "", ""), entetes=("h", "min", "s"), cw=1.45, ch=0.7, fs=30, couleurs=None):
    """Le tableau h | min | s : une ligne d'en-têtes, une ligne de valeurs. t.case(i) = centre de la case i."""
    g = VGroup()
    cases = []
    couleurs = couleurs or (AIG_H, AIG_M, AIG_S)
    for i, (e, v) in enumerate(zip(entetes, valeurs)):
        x = (i - (len(entetes) - 1) / 2) * cw
        hc = Rectangle(width=cw, height=ch, fill_color=couleurs[i % len(couleurs)], fill_opacity=0.9,
                       stroke_color=WHITE, stroke_width=2).move_to(P(x, ch / 2))
        bc = Rectangle(width=cw, height=ch * 1.15, fill_color="#0f172a", fill_opacity=1, stroke_color=WHITE,
                       stroke_width=2).move_to(P(x, -ch * 1.15 / 2))
        te = Text(e, font_size=fs, color=WHITE, weight=BOLD).move_to(hc)
        g.add(hc, bc, te)
        if v != "":
            g.add(Text(str(v), font_size=fs + 4, color=WHITE, weight=BOLD).move_to(bc))
        cases.append(bc)
    g.cases = cases
    g.case = lambda i: g.cases[i].get_center()
    return g


# ── Test visuel (image fixe, -ql -s) ─────────────────────────────────────────────────────────────
class TestHorlogeFrise(Scene):
    def construct(self):
        h1 = horloge(1.45, 9, 40).move_to(P(-4.6, 1.7))
        h2 = horloge(1.45, 11, 15, minutes_ecrites=True, avec_secondes=True).move_to(P(4.6, 1.7))
        regler(h2, 11, 15, 30)
        e = ecran_digital("15:45").move_to(P(0, 2.2))
        f = frise(9 * 60 + 40, 11 * 60 + 15, larg=10).move_to(P(0, -1.6))
        b1 = bond(f, 580, 600)
        b2 = bond(f, 600, 660, couleur=BOND2)
        b3 = bond(f, 660, 675)
        tb = tableau_hms(("1", "35", "0"), cw=1.1, ch=0.5, fs=24).move_to(P(0, 0.6)).scale(0.8)
        self.add(h1, h2, e, f, b1, b2, b3, tb)
