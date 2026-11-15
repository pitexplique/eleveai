# 5e_conversion_decimal.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode C1 : CONVERTIR UNE LONGUEUR, UNE MASSE
# OU UNE CONTENANCE (micro conversion_decimal, notion grandeur_conversion), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : 5e-conversion-decimal-short (la recette de Ti Margo, 1,5 × 1 000 = 1 500 g).
# Décor et métier : Samir, PHARMACIEN (une ordonnance, une balance de précision ; centres corps-sante, sciences).
# Mapping micro → écrans : 02 (1 g = 1 000 mg ; 0,5 × 1 000 = 500 mg, la virgule avance de 3 rangs),
# 03 (2,4 kg = 2 400 g ; 3,5 km = 3 500 m ; 0,75 L = 75 cL, dans le tableau), 04 (méthode : unité de départ,
# unité d'arrivée ; plus petite → on multiplie ; plus grande → on divise), 06 (piège : le sens ; 2,4 kg ≠ 0,0024 g),
# questions 05 (B : 1,8 × 1 000 = 1 800 g) et 07 (A : 0,6 × 100 = 60 cL), défi 08 (0,15 L = 150 mL ; 0,02 kg = 20 g).
# Fiche : lib/fiches/maths-5e-conversions.tsx.
# Voix : manim/voix/5e-conversion-decimal.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_conversion_decimal_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py conversion-decimal).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_conversion_decimal.py ConversionDecimal5e
#   (AUDIT-ABSENT « 1000 », « 2400 », « 3500 », « 1800 » : faux positifs connus, l'audit cherche le nombre
#   sans son espace des milliers ; chacun est posé au mot exact.)
# Sortie finale : manim/sorties/5e/maths/conversion/01-decimal/eleveai-maths-5e-conversion-decimal.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

TETE_C = "#1e3a8a"                     # l'en-tête du tableau de conversion
CASE_C = "#0f172a"                     # ses cases
DEPART_C, ARRIVEE_C = "#15803d", "#b45309"
ZERO_C = ORANGE_RETENUE                # les zéros ajoutés
EAU_C = "#38bdf8"                      # l'eau
SUCRE_C = "#f1f5f9"                    # le sucre
JUS_C = "#fb923c"                      # le jus de la bouteille
SAC_C, SAC_B = "#f5deb3", "#a16207"    # le sac de farine
PLUS_C, MOINS_C = VERT_OK, "#fb923c"   # vers plus petit (on multiplie), vers plus grand (on divise)


# ── le tableau de conversion ────────────────────────────────────────────────
def tab_conv(cols, cw=1.0, ch=0.55, cl=0.72, lignes=1, fs=26, fs_c=None):
    """Le tableau : une ligne d'en-têtes (les unités) et `lignes` lignes de cases.
    t.tete[u] (le rectangle), t.nom[u] (le texte, hors audit) ; t.case(u, r) le centre d'une case ;
    t.bord(u, r) le point où se pose une virgule, juste à droite du chiffre de la colonne u."""
    g = VGroup()
    g.tete, g.nom, g.cases = {}, {}, {}
    n = len(cols)
    k = min([1.0] + [(cw - 0.1) / Text(u, font_size=fs, weight=BOLD).width for u in cols])
    for i, u in enumerate(cols):
        x = (i - (n - 1) / 2) * cw
        hc = Rectangle(width=cw, height=ch, fill_color=TETE_C, fill_opacity=1, stroke_color=WHITE,
                       stroke_width=2).move_to(P(x, ch / 2))
        t = hors_audit(Text(u, font_size=fs * k, color=WHITE, weight=BOLD).move_to(hc))
        g.add(hc)
        g.tete[u], g.nom[u] = hc, t
        for r in range(lignes):
            bc = Rectangle(width=cw, height=cl, fill_color=CASE_C, fill_opacity=1, stroke_color=WHITE,
                           stroke_width=2).move_to(P(x, -cl / 2 - r * cl))
            g.add(bc)
            g.cases[(u, r)] = bc
    for u in cols:
        g.add(g.nom[u])
    g.cl, g.fs_c = cl, fs_c or int(52 * cl / 0.72)
    g.case = lambda u, r=0: g.cases[(u, r)].get_center()
    g.bord = lambda u, r=0: g.cases[(u, r)].get_right() + DOWN * cl * 0.28
    return g


def poser_tab(t, x, y_tete):
    """Place le tableau : son en-tête centré en (x, y_tete)."""
    u0 = list(t.tete)[0]
    t.shift(P(x, y_tete) - P(t.get_x(), t.tete[u0].get_y()))
    return t


def chiffre(t, u, s, r=0, couleur=WHITE):
    """Un chiffre dans la case (u, r) (hors audit : le nombre est écrit en clair à côté)."""
    return hors_audit(Text(s, font_size=t.fs_c, color=couleur, weight=BOLD).move_to(t.case(u, r)))


def virgule(t, u, r=0):
    """La virgule (rouge), posée à droite du chiffre de la colonne u."""
    p = t.bord(u, r)
    s = t.cl / 0.72
    v = VGroup(Dot(p, radius=0.085 * s, color=ROUGE_ERREUR),
               Line(p, p + DOWN * 0.17 * s + LEFT * 0.07 * s, color=ROUGE_ERREUR, stroke_width=7))
    return v


# ── les objets de la pharmacie ─────────────────────────────────────────────
def balance_ph(s=1.0, ecran="", cage=True):
    """La balance de précision de Samir : socle, plateau, écran ; une cage de verre si `cage`.
    .aff (l'écran), .txt (le texte affiché), .plateau ; ecran_de(b, s) fait un nouveau texte à sa taille."""
    socle = RoundedRectangle(width=2.6 * s, height=0.62 * s, corner_radius=0.1 * s, fill_color="#e2e8f0",
                             fill_opacity=1, stroke_color="#475569", stroke_width=3)
    aff = RoundedRectangle(width=1.75 * s, height=0.42 * s, corner_radius=0.06 * s, fill_color="#052e16",
                           fill_opacity=1, stroke_color=VERT_OK, stroke_width=2).move_to(socle)
    pied = Rectangle(width=0.2 * s, height=0.22 * s, fill_color="#94a3b8", fill_opacity=1,
                     stroke_width=0).next_to(socle, UP, buff=0)
    plateau = RoundedRectangle(width=1.5 * s, height=0.11 * s, corner_radius=0.04 * s, fill_color="#cbd5e1",
                               fill_opacity=1, stroke_color="#64748b", stroke_width=2).next_to(pied, UP, buff=0)
    g = VGroup(socle, aff, pied, plateau)
    if cage:
        verre = RoundedRectangle(width=2.3 * s, height=1.55 * s, corner_radius=0.08 * s, fill_color="#bae6fd",
                                 fill_opacity=0.10, stroke_color="#e0f2fe", stroke_width=3).next_to(socle, UP, buff=0)
        g.add(verre)
    g.aff, g.plateau, g.s = aff, plateau, s
    g.txt = ecran_de(g, ecran)
    g.add(g.txt)
    return g


def ecran_de(b, s, fs=30):
    t = hors_audit(Text(s or " ", font_size=fs * b.s, color=VERT_OK, weight=BOLD))
    if t.width > b.aff.width - 0.16:
        t.scale_to_fit_width(b.aff.width - 0.16)
    return t.move_to(b.aff)


def ordonnance(l=1.9, h=2.1):
    """Une ordonnance : une feuille blanche, la croix verte, quelques lignes."""
    f = RoundedRectangle(width=l, height=h, corner_radius=0.08, fill_color="#f8fafc", fill_opacity=1,
                         stroke_color="#94a3b8", stroke_width=3)
    c = f.get_corner(UL) + P(0.32, -0.32)
    croix = VGroup(Rectangle(width=0.34, height=0.11), Rectangle(width=0.11, height=0.34))
    croix.set_fill("#16a34a", 1).set_stroke(width=0).move_to(c)
    traits = VGroup(*[Line(f.get_left() + P(0.25, y), f.get_left() + P(l - 0.25 - (0.5 if k % 2 else 0), y),
                           color="#cbd5e1", stroke_width=4)
                      for k, y in enumerate([-0.55, -0.75])]).shift(UP * (f.get_y() + 0.45))
    g = VGroup(f, croix, traits)
    g.feuille = f
    return g


def sac(l=1.3, h=1.45, couleur=SAC_C, bord=SAC_B):
    """Un sac (farine, sucre), noué en haut."""
    corps = RoundedRectangle(width=l, height=h, corner_radius=0.22, fill_color=couleur, fill_opacity=1,
                             stroke_color=bord, stroke_width=4)
    haut = corps.get_top()
    col = Polygon(haut + P(-l * 0.3, -0.02), haut + P(l * 0.3, -0.02), haut + P(l * 0.14, 0.22),
                  haut + P(-l * 0.14, 0.22), fill_color=couleur, fill_opacity=1, stroke_color=bord, stroke_width=4)
    lien = Line(haut + P(-l * 0.17, 0.12), haut + P(l * 0.17, 0.12), color=bord, stroke_width=6)
    g = VGroup(col, corps, lien)
    g.corps = corps
    return g


def bouteille(h=2.1, couleur=JUS_C, niveau=0.8):
    """Une bouteille de jus (le corps, l'épaule, le goulot, le bouchon)."""
    l = h * 0.36
    corps = RoundedRectangle(width=l, height=h * 0.62, corner_radius=0.08, fill_color="#bae6fd", fill_opacity=0.14,
                             stroke_color="#e0f2fe", stroke_width=4)
    jus = Rectangle(width=l - 0.08, height=h * 0.62 * niveau, fill_color=couleur, fill_opacity=0.95,
                    stroke_width=0).align_to(corps, DOWN).shift(UP * 0.04)
    b = corps.get_top()
    epaule = Polygon(b + P(-l / 2, 0), b + P(l / 2, 0), b + P(l * 0.2, h * 0.16), b + P(-l * 0.2, h * 0.16),
                     fill_color="#bae6fd", fill_opacity=0.14, stroke_color="#e0f2fe", stroke_width=4)
    goulot = Rectangle(width=l * 0.4, height=h * 0.12, fill_color="#bae6fd", fill_opacity=0.14,
                       stroke_color="#e0f2fe", stroke_width=4).next_to(epaule, UP, buff=0)
    bouchon = Rectangle(width=l * 0.48, height=h * 0.07, fill_color="#dc2626", fill_opacity=1,
                        stroke_width=0).next_to(goulot, UP, buff=0)
    g = VGroup(jus, corps, epaule, goulot, bouchon)
    g.corps = corps
    return g


def verre_doseur(h=1.9, niveau=0.45, couleur=EAU_C, graduations=True):
    """Un verre doseur : un gobelet évasé, gradué, une anse, de l'eau au niveau donné."""
    lb, lh = h * 0.62, h * 0.8
    A, B, C, D = P(-lb / 2, -h / 2), P(lb / 2, -h / 2), P(lh / 2, h / 2), P(-lh / 2, h / 2)
    y = -h / 2 + h * niveau
    x = lambda yy: lb / 2 + (lh - lb) / 2 * (yy + h / 2) / h  # noqa: E731
    eau = Polygon(A, B, P(x(y), y), P(-x(y), y), fill_color=couleur, fill_opacity=0.85, stroke_width=0)
    verre = Polygon(A, B, C, D, fill_color="#bae6fd", fill_opacity=0.12, stroke_color="#e0f2fe", stroke_width=4)
    anse = Arc(radius=h * 0.24, start_angle=-PI / 2, angle=PI, arc_center=P(x(0.0) + 0.02, 0.05),
               color="#e0f2fe", stroke_width=6)
    g = VGroup(eau, verre, anse)
    if graduations:
        for k in range(1, 5):
            yy = -h / 2 + h * k / 5
            g.add(Line(P(-x(yy) + 0.04, yy), P(-x(yy) + 0.3, yy), color="#e0f2fe", stroke_width=3))
    g.verre = verre
    return g


def bol(l=1.0):
    """Un bol de sucre (une coupe et son petit tas blanc)."""
    import numpy as _np
    pts_t = [P(l * 0.4 * _np.cos(a), l * 0.22 * _np.sin(a)) for a in _np.linspace(0, PI, 24)]
    tas = Polygon(*pts_t, fill_color=SUCRE_C, fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
    pts_c = [P(l / 2 * _np.cos(a), l * 0.38 * _np.sin(a)) for a in _np.linspace(PI, 2 * PI, 28)]
    coupe = Polygon(*pts_c, fill_color="#c084fc", fill_opacity=1, stroke_color="#6b21a8", stroke_width=4)
    g = VGroup(tas, coupe)
    g.shift(UP * (l * 0.38))
    return g


def regle(l=1.6):
    r = Rectangle(width=l, height=0.36, fill_color="#fde68a", fill_opacity=1, stroke_color="#b45309", stroke_width=3)
    traits = VGroup(*[Line(r.get_corner(UL) + P(0.12 + k * (l - 0.24) / 10, 0),
                           r.get_corner(UL) + P(0.12 + k * (l - 0.24) / 10, -(0.17 if k % 5 == 0 else 0.1)),
                           color="#1f2937", stroke_width=2.5) for k in range(11)])
    return VGroup(r, traits)


def poids(l=0.95):
    """Un poids de balance en fonte, avec sa poignée."""
    corps = Polygon(P(-l / 2, 0), P(l / 2, 0), P(l * 0.36, l * 0.62), P(-l * 0.36, l * 0.62), fill_color="#64748b",
                    fill_opacity=1, stroke_color="#1e293b", stroke_width=4)
    anse = Arc(radius=l * 0.2, start_angle=0, angle=PI, arc_center=P(0, l * 0.62), color="#1e293b", stroke_width=7)
    return VGroup(anse, corps)


class ConversionDecimal5e(Paysage5e):
    nom_voix = "5e-conversion-decimal"
    fichier_marques = "5e_conversion_decimal_marques.json"
    ceinture = "jaune"

    def chiffres(self, t, morceaux, r=0, couleur=WHITE):
        return VGroup(*[chiffre(t, u, s, r, couleur) for u, s in morceaux])

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Convertir une longueur, une masse ou une contenance", self.identite,
                                       self.ceinture, y_ech=-2.45)
        self.au_mot("Convertir")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        r = regle(1.6).move_to(P(1.9, 0.15))
        p = poids(1.0).move_to(P(3.85, 0.3))
        b = bouteille(1.7).move_to(P(5.55, 0.35))
        self.au_mot("longueur")
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.4)
        self.au_mot("masse")
        self.play(FadeIn(p, shift=UP * 0.2), run_time=0.4)
        self.au_mot("contenance")
        self.play(FadeIn(b, shift=UP * 0.2), run_time=0.4)
        q = self.bloc(["Comment changer d'unité", "sans se tromper ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("Comment")
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.5)
        self.au_mot("sans se tromper")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(VGroup(r, p, b), color=JAUNE_TITRE, scale_factor=1.06),
                  run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Samir, pharmacien ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        sa = samir(1.0).move_to(P(-5.45, 0.1))
        self.au_mot("Voici Samir")
        nom = self.t("Samir", 40, BLEU_CALCUL).next_to(sa, UP, buff=0.25)
        self.play(FadeIn(sa, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("pharmacien")
        met = self.t("pharmacien", 28, BLEU_CALCUL).next_to(sa, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        o = ordonnance().move_to(P(-2.75, 1.5))
        l1 = self.ligne([("Ordonnance :", WHITE), ("0,5 g", BLEU_D)], 36)
        self.col(l1, 2.35)
        self.au_mot("ordonnance")
        self.play(FadeIn(o, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        d5 = hors_audit(Text("0,5 g", font_size=40, color="#1d4ed8", weight=BOLD)).move_to(o.feuille.get_center()
                                                                                         + DOWN * 0.45)
        self.au_mot("0,5")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(d5, scale=1.2), run_time=0.4)
        b = balance_ph(0.95, cage=False).move_to(P(-2.75, -1.4))
        l2 = self.ligne([("Sa balance affiche", WHITE), ("des mg.", BLEU_D)], 34)
        self.col(l2, 1.35)
        self.au_mot("balance")
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(l2[0], shift=UP * 0.1), run_time=0.45)
        mg = ecran_de(b, "mg")
        self.au_mot("milligrammes")
        self.play(FadeIn(l2[1], shift=UP * 0.1), ReplacementTransform(b.txt, mg), run_time=0.4)
        l3 = self.bloc(["Une erreur, et", "le médicament est faux."], 36, ROUGE_ERREUR)
        self.col(l3, 0.0)
        self.au_mot("Une erreur")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("le médicament")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(b, color=ROUGE_ERREUR, scale_factor=1.04), run_time=0.45)
        self.attendre_voix()

    # ── 02 : 1 g = 1 000 mg ; 0,5 × 1 000 = 500 mg ───────────────────────────
    def ecran_masse(self):
        self.ecran("02-masse")
        t = tab_conv(["g", "dg", "cg", "mg"], cw=1.1, ch=0.6, cl=0.8, lignes=2, fs=30)
        poser_tab(t, -3.85, 1.75)
        b = balance_ph(0.8, "mg", cage=False).move_to(P(-3.85, -2.2))
        self.add(t, b)
        l1 = self.ligne([("1 g", BLEU_D), ("= 1 000 mg", VERT_OK)], 40, buff=0.25)
        self.col(l1, 2.45)
        u1 = chiffre(t, "g", "1", 0, BLEU_D)
        self.au_mot("1 gramme")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(u1, scale=1.2), run_time=0.35)
        z1 = self.chiffres(t, [("dg", "0"), ("cg", "0"), ("mg", "0")], 0, ZERO_C)
        self.au_mot("1 000")
        self.play(FadeIn(l1[1], shift=UP * 0.1), LaggedStart(*[FadeIn(z, scale=1.3) for z in z1], lag_ratio=0.2),
                  run_time=0.5)
        l2 = self.bloc(["Le mg est plus petit :", "il en faut plus."], 34)
        self.col(l2, 1.4)
        self.au_mot("Le milligramme")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(VGroup(t.tete["mg"], t.nom["mg"]), color=JAUNE_TITRE,
                                                           scale_factor=1.12), run_time=0.45)
        self.au_mot("il en faut plus")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("0,5", BLEU_D), ("× 1 000", BLEU_D)], 40, buff=0.25)
        self.col(l3, 0.2)
        d = self.chiffres(t, [("g", "0"), ("dg", "5")], 1, BLEU_D)
        v = virgule(t, "g", 1)
        self.au_mot("0,5")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(d, scale=1.2), FadeIn(v), run_time=0.4)
        fl = CurvedArrow(t.tete["g"].get_top() + UP * 0.08, t.tete["mg"].get_top() + UP * 0.08, angle=-PI / 3.2,
                         color=JAUNE_TITRE, stroke_width=6)
        e1000 = hors_audit(Text("× 1 000", font_size=30, color=JAUNE_TITRE, weight=BOLD))
        e1000.next_to(fl, UP, buff=0.08)
        z2 = self.chiffres(t, [("cg", "0"), ("mg", "0")], 1, ZERO_C)
        self.au_mot("fois 1 000")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(fl), FadeIn(e1000), run_time=0.3)
        self.play(v.animate.shift(t.bord("mg", 1) - t.bord("g", 1)),
                  LaggedStart(*[FadeIn(z, scale=1.3) for z in z2], lag_ratio=0.4), run_time=0.4)
        res = self.gros("500 mg", fs=46)
        self.col(res, -0.85)
        cadre = SurroundingRectangle(VGroup(t.cases[("dg", 1)], t.cases[("mg", 1)]), color=VERT_OK, buff=0.03,
                                     stroke_width=6)
        e500 = ecran_de(b, "500 mg")
        self.au_mot("500")
        self.play(FadeIn(res, scale=1.2), Create(cadre), d[0].animate.set_opacity(0.3), FadeOut(v),
                  ReplacementTransform(b.txt, e500), run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : les autres unités (kg, km, L) ──────────────────────────────────
    def ecran_autres(self):
        self.ecran("03-autres")
        tit = self.t("C'est pareil pour les autres unités.", 36, JAUNE_TITRE)
        gauche(tit, -6.2, 2.95)
        ta = poser_tab(tab_conv(["kg", "hg", "dag", "g"], cw=0.95, ch=0.45, cl=0.62, fs=26), -3.9, 1.86)
        tb = poser_tab(tab_conv(["km", "hm", "dam", "m"], cw=0.95, ch=0.45, cl=0.62, fs=26), -3.9, 0.06)
        tc = poser_tab(tab_conv(["L", "dL", "cL"], cw=0.95, ch=0.45, cl=0.62, fs=26), -4.375, -1.74)
        self.au_mot("C'est pareil")
        self.play(FadeIn(tit, shift=UP * 0.1), LaggedStart(*[FadeIn(x, shift=UP * 0.15) for x in (ta, tb, tc)],
                                                            lag_ratio=0.25), run_time=0.9)
        lignes = [
            (ta, [("kg", "2"), ("hg", "4")], "kg", "g", [("dag", "0"), ("g", "0")], "2,4 kg", "= 2 400 g",
             1.55, "2,4", "égale", "2 400"),
            (tb, [("km", "3"), ("hm", "5")], "km", "m", [("dam", "0"), ("m", "0")], "3,5 km", "= 3 500 m",
             -0.25, "3,5", "égale", "3 500"),
            (tc, [("L", "0"), ("dL", "7"), ("cL", "5")], "L", "cL", [], "0,75 L", "= 75 cL",
             -2.05, "0,75", "égale", "75 centilitres"),
        ]
        for k, (t, ds, u0, u1, zs, s1, s2, y, m1, meg, m2_) in enumerate(lignes):
            lg = self.ligne([(s1, BLEU_D), (s2, VERT_OK)], 40, buff=0.25)
            self.col(lg, y)
            d = self.chiffres(t, ds, 0, BLEU_D)
            v = virgule(t, u0)
            self.au_mot(m1)
            self.play(FadeIn(lg[0], shift=UP * 0.1), FadeIn(d, scale=1.2), FadeIn(v), run_time=0.4)
            self.au_mot(meg, k + 1)
            self.play(v.animate.shift(t.bord(u1) - t.bord(u0)), run_time=0.5)
            z = self.chiffres(t, zs, 0, ZERO_C)
            anims = [FadeIn(lg[1], shift=UP * 0.1), FadeOut(v)]
            if zs:
                anims.append(LaggedStart(*[FadeIn(x, scale=1.3) for x in z], lag_ratio=0.25))
            else:
                anims.append(d[0].animate.set_opacity(0.3))
            self.au_mot(m2_)
            self.play(*anims, run_time=0.45)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        self.au_mot("La méthode")
        tit = self.t("La méthode :", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("On repère l'unité de départ", WHITE), ("et l'unité d'arrivée.", WHITE)], 34)
        gauche(l1, -6.0, 2.3)
        t = poser_tab(tab_conv(["km", "hm", "dam", "m", "dm", "cm", "mm"], cw=1.2, ch=0.62, lignes=0, fs=30),
                      -0.6, 1.2)
        self.au_mot("on repère")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(t, shift=UP * 0.1), run_time=0.45)
        ld = self.t("départ", 30, VERT_OK).next_to(t.tete["m"], DOWN, buff=0.18)
        self.au_mot("départ")
        self.play(t.tete["m"].animate.set_fill(DEPART_C), FadeIn(ld, shift=UP * 0.1), run_time=0.4)
        la = self.t("arrivée", 30, ORANGE_RETENUE).next_to(t.tete["cm"], DOWN, buff=0.18)
        self.au_mot("d'arrivée")
        self.play(FadeIn(l1[1], shift=UP * 0.1), t.tete["cm"].animate.set_fill(ARRIVEE_C),
                  FadeIn(la, shift=UP * 0.1), run_time=0.4)
        fd = Arrow(P(-6.1, -0.2), P(-3.5, -0.2), buff=0, color=PLUS_C, stroke_width=9,
                   max_tip_length_to_length_ratio=0.18)
        bd = self.bloc(["Vers une unité plus petite,", "le nombre grandit :", "on multiplie."], 32)
        bd[2].set_color(PLUS_C)
        bd.align_to(P(-6.1, 0), LEFT).align_to(P(0, -0.55), UP)
        self.au_mot("Vers une unité plus petite")
        self.play(GrowArrow(fd), FadeIn(bd[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("le nombre grandit")
        self.play(FadeIn(bd[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("on multiplie")
        self.play(FadeIn(bd[2], scale=1.15), run_time=0.35)
        fg = Arrow(P(3.0, -0.2), P(0.4, -0.2), buff=0, color=MOINS_C, stroke_width=9,
                   max_tip_length_to_length_ratio=0.18)
        bg = self.bloc(["Vers une unité plus grande,", "il diminue :", "on divise."], 32)
        bg[2].set_color(MOINS_C)
        bg.align_to(P(0.4, 0), LEFT).align_to(P(0, -0.55), UP)
        self.au_mot("Vers une unité plus grande")
        self.play(GrowArrow(fg), FadeIn(bg[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("il diminue")
        self.play(FadeIn(bg[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("on divise")
        self.play(FadeIn(bg[2], scale=1.15), run_time=0.35)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = balance_ph(0.95, "? g", cage=False).move_to(P(-3.7, 0.05))
        s = sac(1.75, 1.4).next_to(b.plateau, UP, buff=0.02)
        e = hors_audit(Text("1,8 kg", font_size=32, color="#78350f", weight=BOLD)).move_to(s.corps)

        def avant_q(sc):
            sc.play(FadeIn(b), FadeIn(s), FadeIn(e), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["1,8 kg,", "c'est combien", "de grammes ?"],
                             [self.choix("18 g"), self.choix("1 800 g"), self.choix("180 g")], 1,
                             ["1 kg = 1 000 g.", "1,8 × 1 000", "= 1 800 g."],
                             -0.45, couper={0: ("1 kg", "= 1 000 g."), 1: ("1,8", "× 1 000")},
                             mot_q="1,8", avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        l1 = self.t("Se tromper de sens.", 38, JAUNE_TITRE)
        gauche(l1, -6.2, 2.1)
        t = poser_tab(tab_conv(["kg", "hg", "dag", "g"], cw=1.0, ch=0.55, lignes=0, fs=28), 3.55, 2.2)
        fr = Arrow(P(5.3, 1.45), P(1.8, 1.45), buff=0, color=ROUGE_ERREUR, stroke_width=8,
                   max_tip_length_to_length_ratio=0.15)
        c = fr.get_center()
        croix = VGroup(Line(c + P(-0.22, -0.22), c + P(0.22, 0.22)), Line(c + P(-0.22, 0.22), c + P(0.22, -0.22)))
        croix.set_stroke(ROUGE_ERREUR, 9).shift(UP * 0.02)
        self.au_mot("Se tromper de sens")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(t, shift=UP * 0.1), GrowArrow(fr), run_time=0.5)
        self.play(Create(croix), run_time=0.3)
        fv = Arrow(P(1.8, 0.7), P(5.3, 0.7), buff=0, color=VERT_OK, stroke_width=8,
                   max_tip_length_to_length_ratio=0.15)
        l2 = self.bloc(["Vers une plus petite unité,", "le nombre devient plus grand."], 34, VERT_OK)
        gauche(l2, -6.2, 0.95)
        self.au_mot("Vers une plus petite")
        self.play(FadeIn(l2[0], shift=UP * 0.1), GrowArrow(fv), run_time=0.45)
        self.au_mot("le nombre devient")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("2,4 kg", BLEU_D), ("ne peuvent pas faire", WHITE)], 38, buff=0.22)
        gauche(l3, -6.2, -0.75)
        l3b = self.t("0,0024 g.", 46, ROUGE_ERREUR)
        gauche(l3b, -6.0, -1.6)
        l3.add(l3b)
        s = sac(1.8, 1.55).move_to(P(3.4, -1.15))
        e = hors_audit(Text("2,4 kg", font_size=34, color="#78350f", weight=BOLD)).move_to(s.corps)
        self.au_mot("2,4 kilos")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(s, shift=UP * 0.2), FadeIn(e), run_time=0.45)
        self.au_mot("ne peuvent pas faire")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("0,0024")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.35)
        barre = Line(l3[2].get_corner(DL) + P(-0.05, 0.05), l3[2].get_corner(UR) + P(0.05, -0.05),
                     color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(barre), Indicate(s, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bt = bouteille(2.3, JUS_C, 0.78).move_to(P(-4.7, 1.25))
        e = hors_audit(Text("0,6 L", font_size=32, color=WHITE, weight=BOLD))
        sur_fond(e).move_to(bt.corps.get_center() + DOWN * 0.15)
        vd = verre_doseur(1.7, 0.0).move_to(P(-2.55, 0.95))
        qm = hors_audit(Text("? cL", font_size=34, color=JAUNE_TITRE, weight=BOLD)).next_to(vd, UP, buff=0.15)

        def avant_q(sc):
            sc.play(FadeIn(bt), FadeIn(e), FadeIn(vd), FadeIn(qm), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["0,6 L,", "c'est combien", "de centilitres ?"],
                             [self.choix("60 cL"), self.choix("6 cL"), self.choix("600 cL")], 0,
                             ["1 L = 100 cL.", "0,6 × 100 = 60 cL."],
                             -0.45, couper={0: ("1 L", "= 100 cL."), 1: ("0,6", "× 100", "= 60 cL.")},
                             mot_q="0,6", avant_q=avant_q)

    # ── 08 : le défi (le sirop) ─────────────────────────────────────────────
    def figures_sirop(self):
        vd = verre_doseur(1.9, 0.4).move_to(P(-5.2, 0.55))
        b = balance_ph(0.9, cage=False).move_to(P(-2.75, -0.15))
        bo = bol(1.05).next_to(b.plateau, UP, buff=0.0)
        return vd, b, bo

    def etiq_verre(self, vd, s):
        e = hors_audit(Text(s, font_size=30, color=WHITE, weight=BOLD))
        return sur_fond(e).next_to(vd, DOWN, buff=0.2)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        vd, b, bo = self.figures_sirop()
        x = -0.6
        l0 = self.t("Samir prépare un sirop.", 34, WHITE)
        self.col(l0, 2.2, x)
        self.au_mot("Samir prépare")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(vd, shift=UP * 0.2), FadeIn(b, shift=UP * 0.2),
                  FadeIn(bo, shift=UP * 0.2), run_time=0.5)
        l1 = self.ligne([("Il mesure", WHITE), ("0,15 L", EAU_C), ("d'eau", EAU_C)], 34)
        self.col(l1, 1.5, x)
        self.au_mot("Il mesure")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        e15 = self.etiq_verre(vd, "0,15 L")
        self.au_mot("0,15")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(e15, scale=1.2), run_time=0.35)
        self.au_mot("d'eau")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("et 0,02 kg", SUCRE_C), ("de sucre.", SUCRE_C)], 34)
        self.col(l2, 0.8, x)
        e02 = ecran_de(b, "0,02 kg")
        self.au_mot("0,02")
        self.play(FadeIn(l2[0], shift=UP * 0.1), ReplacementTransform(b.txt, e02), run_time=0.35)
        self.au_mot("de sucre")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.t("Combien de mL d'eau ?", 34, JAUNE_TITRE)
        self.col(l3, 0.05, x)
        self.au_mot("Combien de millilitres")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(vd, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.4)
        l4 = self.t("Combien de g de sucre ?", 34, JAUNE_TITRE)
        self.col(l4, -0.65, x)
        self.au_mot("Combien de grammes")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(bo, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.4)
        self.au_mot("Mets pause")
        p = self.col(self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE), -1.5, x)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        vd, b, bo = self.figures_sirop()
        e15 = self.etiq_verre(vd, "0,15 L")
        e02 = ecran_de(b, "0,02 kg")
        b.remove(b.txt)
        self.add(vd, b, bo, e15, e02)
        x = -0.6
        l1 = self.ligne([("1 L", EAU_C), ("= 1 000 mL :", WHITE)], 36, buff=0.22)
        self.col(l1, 2.2, x)
        self.au_mot("1 litre")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 000")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("0,15", EAU_C), ("× 1 000", BLEU_D), ("= 150 mL", VERT_OK)], 38, buff=0.22)
        self.col(l2, 1.45, x)
        self.au_mot("0,15")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 1 000")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        e150 = self.etiq_verre(vd, "150 mL")
        self.au_mot("150")
        self.play(FadeIn(l2[2], scale=1.15), ReplacementTransform(e15, e150), run_time=0.4)
        self.play(Indicate(vd, color=VERT_OK, scale_factor=1.05), run_time=0.4)
        l3 = self.ligne([("1 kg", SUCRE_C), ("= 1 000 g :", WHITE)], 36, buff=0.22)
        self.col(l3, 0.5, x)
        self.au_mot("1 kilo")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 000 grammes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("0,02", SUCRE_C), ("× 1 000", BLEU_D), ("= 20 g", VERT_OK)], 38, buff=0.22)
        self.col(l4, -0.25, x)
        self.au_mot("0,02")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 1 000", 2)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        e20 = ecran_de(b, "20 g")
        self.au_mot("20 grammes")
        self.play(FadeIn(l4[2], scale=1.15), ReplacementTransform(e02, e20), run_time=0.4)
        self.play(Indicate(bo, color=VERT_OK, scale_factor=1.08), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        cases = VGroup(*[Rectangle(width=1.25, height=0.62, fill_color=TETE_C, fill_opacity=1, stroke_color=WHITE,
                                   stroke_width=2) for _ in range(3)]).arrange(DOWN, buff=0.55)
        noms = VGroup(*[hors_audit(Text(u, font_size=32, color=WHITE, weight=BOLD)).move_to(c)
                        for u, c in zip(["kg", "g", "mg"], cases)])
        fb = Arrow(cases[0].get_left() + LEFT * 0.35, cases[2].get_left() + LEFT * 0.35, buff=0, color=PLUS_C,
                   stroke_width=8, max_tip_length_to_length_ratio=0.12)
        fh = Arrow(cases[2].get_right() + RIGHT * 0.35, cases[0].get_right() + RIGHT * 0.35, buff=0,
                   color=MOINS_C, stroke_width=8, max_tip_length_to_length_ratio=0.12)
        fig = VGroup(cases, noms, fb, fh)
        lignes = self.finale_gauche(fig, textes=[
            ("Convertir, c'est écrire la même", "quantité avec une autre unité."),
            ("Vers plus petit,", "on multiplie."),
            ("Vers plus grand,", "on divise."),
            ("Par 10, 100", "ou 1 000.")], fs=30)
        self.add(fig)
        self.au_mot("Convertir, c'est")
        self.montrer_ligne(lignes[0])
        self.au_mot("Vers plus petit")
        self.montrer_ligne(lignes[1], Indicate(fb, color=JAUNE_TITRE, scale_factor=1.06))
        self.au_mot("Vers plus grand")
        self.montrer_ligne(lignes[2], Indicate(fh, color=JAUNE_TITRE, scale_factor=1.06))
        self.au_mot("Par 10")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_masse()
        self.ecran_autres()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
