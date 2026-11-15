# 5e_volume_prisme.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode V4 : LE VOLUME DU PRISME DROIT
# (micro volume_prisme, notion volume_solide), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : 5e-volume-prisme-short (la tente gonflable, 2 × 1 ÷ 2 = 1 m², × 3 = 3 m³).
# Décor et métier : Maïa, FABRICANTE DE TENTES (tentes de randonnée ; centres sport, transports).
# Mapping micro → écrans : 02 (la tente vue de face : un triangle de 2 m sur 1,5 m ; 2 × 1,5 ÷ 2 = 1,5 m²),
# 03 (le triangle se répète sur les 3 m de la tente : 1,5 × 3 = 4,5 m³), 04 (méthode : V = aire de la base
# × hauteur du prisme ; ici la hauteur du prisme = la longueur de la tente), 06 (piège : le ÷ 2 du triangle ;
# hauteur du triangle ≠ hauteur du prisme), questions 05 (C : 15 × 8 = 120 cm³) et 07 (B : 6 × 4 ÷ 2 = 12,
# × 10 = 120 cm³), défi 08 (2,4 × 1,5 ÷ 2 = 1,8 m² ; × 3 = 5,4 m³ ; 3 campeurs de 1,5 m³).
# Fiche : lib/fiches/maths-5e-volumes.tsx.
# Voix : manim/voix/5e-volume-prisme.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_volume_prisme_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py volume-prisme).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_volume_prisme.py VolumePrisme5e
# Sortie finale : manim/sorties/5e/maths/volume/04-volume-prisme/eleveai-maths-5e-volume-prisme.mp4
# Couleurs : la base (côté du bas du triangle) bleue, la hauteur du triangle verte, la LONGUEUR du prisme
# (= la hauteur du prisme) fuchsia : deux « hauteurs », deux couleurs, jamais confondues.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403
from aire_volume_5e_commun import FUITE  # noqa: E402

LONG_C = "#e879f9"                         # la longueur du prisme (sa « hauteur »)
TRANCHE_C = ("#fdba74", "#fb923c")         # les tranches (le triangle qui se répète)
SAC_C, SAC_B = "#22c55e", "#14532d"        # les sacs de couchage

_N = np.array([FUITE[1], -FUITE[0], 0.0]) / np.hypot(*FUITE)   # perpendiculaire à la fuyante, vers le bas-droite


def tente(base, haut, longueur, u, o, sw=4):
    """La tente : un prisme droit couché, le triangle (base `base`, hauteur `haut`, sommet au milieu) DE FACE, qui
    fuit en profondeur sur `longueur`. o = le coin avant-bas-gauche. Attributs : .prisme .avant .pans .A .B .C .H
    .base (bleue) .hh (hauteur verte, pointillée) .eq .long (la longueur, fuchsia) .pt .u"""
    xs = base / 2
    v = prisme_tri(base, haut, xs, longueur, u, o, sw=sw)
    q = v.pt
    f = VGroup(v)
    f.prisme, f.avant, f.pans, f.pt, f.u = v, v.avant, v.pans, q, u
    f.A, f.B, f.C, f.H = q(0, 0, 0), q(base, 0, 0), q(xs, 0, haut), q(xs, 0, 0)
    f.base = Line(f.A, f.B, color=BASE_C, stroke_width=9)
    f.hh = DashedLine(f.C, f.H, color=HAUTEUR_C, stroke_width=6, dash_length=0.12)
    f.eq = equerre(f.H, RIGHT, UP, 0.2, HAUTEUR_C)
    f.long = Line(f.B, q(base, longueur, 0), color=LONG_C, stroke_width=9)
    f.base_l, f.haut_l, f.longueur = base, haut, longueur
    return f


def cote_long(f, s, fs=28, d=0.14):
    """La mesure de la longueur, posée contre l'arête fuyante du bas (en bas à droite), hors audit."""
    t = hors_audit(Text(s, font_size=fs, color=LONG_C, weight=BOLD))
    k = d + 0.5 * (abs(_N[0]) * t.width + abs(_N[1]) * t.height)
    return t.move_to(f.long.get_center() + _N * k)


def cote_haut(f, s, fs=28, dx=0.34):
    """La hauteur du triangle mesurée À GAUCHE de la tente (trait vert, deux taquets, un pointillé de rappel
    au sommet) : l'étiquette ne touche aucun trait de la figure. Hors audit."""
    x, y0, y1 = f.A[0] - dx, f.A[1], f.C[1]
    tr = Line(P(x, y0), P(x, y1), color=HAUTEUR_C, stroke_width=5)
    taq = VGroup(Line(P(x - 0.09, y0), P(x + 0.09, y0)), Line(P(x - 0.09, y1), P(x + 0.09, y1))).set_stroke(
        HAUTEUR_C, 5)
    rappel = DashedLine(P(x, y1), f.C, color=GRAY_B, stroke_width=2.5, dash_length=0.08)
    t = hors_audit(Text(s, font_size=fs, color=HAUTEUR_C, weight=BOLD)).next_to(tr, LEFT, buff=0.12)
    return VGroup(rappel, tr, taq, t)


def tranches(f, n=6):
    """n copies du triangle de face, À LEUR PLACE de départ (derrière la face), et le décalage de chacune
    jusqu'à sa tranche ; rangées de la plus lointaine à la plus proche (l'ordre d'empilement)."""
    o = f.pt(0, 0, 0)
    cs, decs = [], []
    for k in range(n, 0, -1):
        c = f.avant.copy().set_fill(TRANCHE_C[k % 2], 1)
        cs.append(c)
        decs.append(f.pt(0, f.longueur * k / n, 0) - o)
    return cs, decs


def sac(w=0.95, h=0.36):
    s = RoundedRectangle(width=w, height=h, corner_radius=h / 2, fill_color=SAC_C, fill_opacity=1, stroke_color=SAC_B,
                         stroke_width=3)
    oreiller = RoundedRectangle(width=h * 0.8, height=h * 0.7, corner_radius=0.08, fill_color="#f8fafc",
                                fill_opacity=1, stroke_width=0).move_to(s.get_left() + RIGHT * h * 0.55)
    return VGroup(s, oreiller)


class VolumePrisme5e(Paysage5e):
    nom_voix = "5e-volume-prisme"
    fichier_marques = "5e_volume_prisme_marques.json"
    ceinture = "verte"

    U, O = 1.25, P(-4.85, -1.55)   # la tente des écrans 02 → 04

    def etiquette(self, s, fs=28, couleur=WHITE):
        """Une étiquette sur cartouche posée sur la figure, hors audit (« 1,5 m² » : m², un exposant)."""
        return sur_fond(m2(s, fs, couleur))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le volume du prisme droit", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le volume du prisme droit")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment mesurer", "l'air d'une tente ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        f = tente(2, 1.5, 3, 0.8, P(2.4, -0.55))
        self.au_mot("Comment mesurer")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(f.prisme, scale=0.8), run_time=0.5)
        self.au_mot("l'air d'une tente")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(f.prisme, color=JAUNE_TITRE, scale_factor=1.05),
                  run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Maïa, fabricante de tentes ─────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ma = maia(1.0).move_to(P(-5.25, 0.1))
        self.au_mot("Voici Maïa")
        nom = self.t("Maïa", 40, BLEU_CALCUL).next_to(ma, UP, buff=0.25)
        self.play(FadeIn(ma, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("des tentes de randonnée")
        met = self.bloc(["des tentes", "de randonnée"], 28, BLEU_CALCUL).next_to(ma, DOWN, buff=0.15)
        f = tente(2, 1.5, 3, 0.95, P(-2.85, -0.95))
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(f.prisme, shift=UP * 0.2), run_time=0.5)
        l1 = self.t("Légère,", 36, WHITE)
        self.col(l1, 2.0, 2.0)
        self.au_mot("Une tente doit être légère")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        l2 = self.bloc(["mais assez grande", "pour dormir."], 36, WHITE)
        self.col(l2, 0.95, 2.0)
        self.au_mot("mais assez grande")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("pour dormir")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.bloc(["Combien d'air", "y a-t-il dedans ?"], 38, JAUNE_TITRE)
        self.col(l3, -0.55, 2.0)
        self.au_mot("Combien d'air")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(f.prisme, color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.45)
        self.au_mot("y a-t-il dedans")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 02 : la base, un triangle (2 × 1,5 ÷ 2 = 1,5 m²) ────────────────────
    def ecran_base(self):
        self.ecran("02-base")
        f = tente(2, 1.5, 3, self.U, self.O)
        l0 = self.t("La tente : un prisme droit.", 34, WHITE)
        self.col(l0, 2.6)
        self.au_mot("La tente est un prisme droit")
        self.play(FadeIn(f.prisme, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.5)
        l1 = self.ligne([("Vue de face :", JAUNE_TITRE), ("un triangle", TRI_C)], 36, buff=0.2)
        self.col(l1, 1.85)
        self.au_mot("Vue de face")
        self.play(FadeIn(l1[0], shift=UP * 0.1), f.pans.animate.set_opacity(0.3), run_time=0.45)
        self.au_mot("c'est un triangle")
        bord = f.avant.copy().set_fill(opacity=0).set_stroke(JAUNE_TITRE, 8)
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(bord), run_time=0.35)
        l2 = self.ligne([("2 m", BASE_C), ("de base,", BASE_C)], 36)
        self.col(l2, 1.1)
        c2 = cote(f.base, "2 m", DOWN, fs=30, couleur=BASE_C, audit=False)
        self.au_mot("2 mètres")
        self.play(Create(f.base), FadeIn(c2), FadeIn(l2[0], shift=UP * 0.1), FadeOut(bord), run_time=0.35)
        self.au_mot("de base")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        l3 = self.ligne([("1,5 m", HAUTEUR_C), ("de hauteur.", HAUTEUR_C)], 36)
        self.col(l3, 0.4)
        ch = cote_haut(f, "1,5 m", 30)
        self.au_mot("1,5")
        self.play(Create(f.hh), FadeIn(f.eq), FadeIn(ch), FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("de hauteur")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        l4 = self.ligne([("Son aire :", WHITE), ("2 × 1,5", BLEU_D)], 38, buff=0.25)
        self.col(l4, -0.4)
        self.au_mot("Son aire")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2 fois 1,5")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.35)
        l5 = self.ligne([("÷ 2", BLEU_D), ("= 1,5 m²", VERT_OK)], 44, buff=0.3)
        self.col(l5, -1.3)
        self.au_mot("divisé par 2")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1,5 mètre carré")
        self.play(FadeIn(l5[1], scale=1.2), run_time=0.4)
        self.insister(l5[1], 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : le triangle se répète (1,5 × 3 = 4,5 m³) ───────────────────────
    def ecran_empiler(self):
        self.ecran("03-empiler")
        f = tente(2, 1.5, 3, self.U, self.O)
        e15 = self.etiquette("1,5 m²", 30).move_to(centre_de(f.A, f.B, f.C))
        cs, decs = tranches(f, 6)
        self.add(*cs)
        self.add(f.avant, f.base, e15)
        l0 = self.bloc(["Ce triangle se répète", "sur toute la longueur"], 36, TRI_C)
        self.col(l0, 2.35)
        self.au_mot("Ce triangle se répète")
        self.play(FadeIn(l0[0], shift=UP * 0.1), Indicate(f.avant, color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.45)
        self.au_mot("sur toute la longueur")
        self.play(FadeIn(l0[1], shift=UP * 0.1),
                  LaggedStart(*[c.animate.shift(d) for c, d in zip(cs[::-1], decs[::-1])], lag_ratio=0.2),
                  run_time=0.8)
        l1 = self.ligne([("de la tente :", LONG_C), ("3 m.", LONG_C)], 36, buff=0.2)
        self.col(l1, 1.25)
        c3 = cote_long(f, "3 m", 30)
        f.pans.set_opacity(1)
        self.add(f.pans)
        self.bring_to_back(f.pans)
        self.au_mot("de la tente")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 mètres")
        self.play(FadeIn(f.pans), *[FadeOut(c) for c in cs], Create(f.long), FadeIn(c3), FadeIn(l1[1], shift=UP * 0.1),
                  run_time=0.6)
        l2 = self.ligne([("Volume :", WHITE), ("1,5 × 3", BLEU_D)], 38, buff=0.25)
        self.col(l2, 0.25)
        self.au_mot("Volume")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1,5 fois 3")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(f.long, color=JAUNE_TITRE, scale_factor=1.03),
                  run_time=0.4)
        res = self.gros("4,5 m³", fs=42)
        self.col(res, -0.8)
        self.au_mot("4,5 mètres cubes")
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        f = tente(2, 1.5, 3, self.U, self.O)
        eb = self.etiquette("base", 30, WHITE).move_to(centre_de(f.A, f.B, f.C))
        self.add(f.prisme, f.long)
        self.au_mot("La méthode")
        l0 = self.t("La méthode :", 38, JAUNE_TITRE)
        self.col(l0, 2.65, 0.7)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.t("Volume du prisme droit", 34, WHITE)
        self.col(l1, 1.9, 0.7)
        self.au_mot("volume du prisme droit")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("=", WHITE), ("aire de la base", TRI_C)], 34, buff=0.2)
        self.col(l2, 1.25, 1.1)
        self.au_mot("égale aire de la base")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(eb, scale=1.2),
                  Indicate(f.avant, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.45)
        l3 = self.ligne([("×", WHITE), ("hauteur du prisme", LONG_C)], 34, buff=0.2)
        self.col(l3, 0.6, 1.1)
        self.au_mot("fois la hauteur du prisme")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(f.long, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.45)
        cadre = SurroundingRectangle(VGroup(l1, l2, l3), color=JAUNE_TITRE, buff=0.18, corner_radius=0.12,
                                     stroke_width=4)
        self.play(Create(cadre), run_time=0.4)
        l4 = self.bloc(["Ici, la hauteur du prisme,", "c'est la longueur", "de la tente."], 34, LONG_C)
        self.col(l4, -0.75)
        self.au_mot("Ici, la hauteur du prisme")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        lg = self.t("longueur", 28, LONG_C)
        sur_fond(lg)
        lg.move_to(cote_long(f, "longueur", 28).get_center())
        self.au_mot("c'est la longueur")
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(lg, scale=1.2), run_time=0.35)
        self.au_mot("de la tente")
        self.play(FadeIn(l4[2], shift=UP * 0.1), Indicate(f.long, color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = tente(4, 3, 6, 0.42, P(-5.3, 0.45))
        e15 = self.etiquette("15 cm²", 26).move_to(centre_de(f.A, f.B, f.C))
        c8 = cote_long(f, "8 cm", 28)

        def avant_q(sc):
            sc.play(FadeIn(f.prisme), FadeIn(e15), FadeIn(f.long), FadeIn(c8), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Aire de base : 15 cm²,", "hauteur 8 cm.", "Quel est son volume ?"],
                             [self.choix("23 cm³"), self.choix("60 cm³"), self.choix("120 cm³")], 2,
                             ["15 × 8 = 120 cm³.", "23 : l'addition.", "60 : ÷ 2 en trop."],
                             -0.3, couper={0: ("15 × 8", "= 120 cm³."), 1: ("23 :", "l'addition."), 2: ("60 :", "÷ 2 en trop.")},
                             mot_q="Un prisme", avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        f = tente(2, 1.5, 3, 0.95, P(-6.0, -0.85))
        self.add(f.prisme, f.base)
        x = -2.3
        l1 = self.t("La base est un triangle :", 34, TRI_C)
        self.col(l1, 2.15, x)
        self.au_mot("Quand la base est un triangle")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(f.avant, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.4)
        l2 = self.t("on calcule d'abord son aire,", 34, WHITE)
        self.col(l2, 1.5, x)
        self.au_mot("on calcule d'abord son aire")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("sans oublier le", JAUNE_TITRE), ("÷ 2.", JAUNE_TITRE)], 36, buff=0.2)
        self.col(l3, 0.85, x)
        self.au_mot("sans oublier le")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("divisé par 2")
        self.play(FadeIn(l3[1], scale=1.3), run_time=0.3)
        self.insister(l3[1], 1.25, 0.2)
        l4 = self.t("On ne confond pas", 34, WHITE)
        self.col(l4, -0.15, x)
        self.au_mot("on ne confond pas")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        l5 = self.t("la hauteur du triangle", 34, HAUTEUR_C)
        self.col(l5, -0.8, x)
        self.au_mot("la hauteur du triangle")
        self.play(FadeIn(l5, shift=UP * 0.1), Create(f.hh), FadeIn(f.eq), run_time=0.4)
        self.play(Indicate(f.hh, color=HAUTEUR_C, scale_factor=1.06), run_time=0.35)
        l6 = self.t("avec la hauteur du prisme.", 34, LONG_C)
        self.col(l6, -1.45, x)
        self.au_mot("avec la hauteur du prisme")
        self.play(FadeIn(l6, shift=UP * 0.1), Create(f.long), run_time=0.4)
        self.play(Indicate(f.long, color=LONG_C, scale_factor=1.06), run_time=0.35)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = tente(6, 4, 10, 0.3, P(-5.1, 0.5))
        c6 = cote(f.base, "6 cm", DOWN, fs=26, couleur=BASE_C, audit=False, buff=0.12)
        ch = cote_haut(f, "4 cm", 26, dx=0.3)
        c10 = cote_long(f, "10 cm", 26)

        def avant_q(sc):
            sc.play(FadeIn(f.prisme), FadeIn(f.base), FadeIn(f.hh), FadeIn(f.eq), FadeIn(f.long), FadeIn(c6),
                    FadeIn(ch), FadeIn(c10), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Base 6 cm, hauteur 4 cm,", "le prisme mesure 10 cm.", "Quel est son volume ?"],
                             [self.choix("240 cm³"), self.choix("120 cm³"), self.choix("20 cm³")], 1,
                             ["Le triangle : 6 × 4 ÷ 2", "= 12 cm².", "× 10 = 120 cm³.", "240 : l'oubli du ÷ 2."],
                             -0.3, couper={0: ("Le triangle :", "6 × 4", "÷ 2"), 2: ("× 10", "= 120 cm³."),
                                           3: ("240 :", "l'oubli du", "÷ 2.")},
                             mot_q="Un prisme droit", avant_q=avant_q)

    # ── 08 : le défi (la grande tente) ──────────────────────────────────────
    def tente_defi(self):
        return tente(2.4, 1.5, 3, 1.05, P(-4.95, -1.2))

    def cotes_defi(self, f):
        return (cote(f.base, "2,4 m", DOWN, fs=28, couleur=BASE_C, audit=False),
                cote_haut(f, "1,5 m", 28), cote_long(f, "3 m", 28))

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        f = self.tente_defi()
        c24, ch, c3 = self.cotes_defi(f)
        x = -0.6
        l0 = self.t("Une grande tente :", 34, WHITE)
        self.col(l0, 2.25, x)
        self.au_mot("Une grande tente")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(f.prisme, shift=UP * 0.2), run_time=0.45)
        l1 = self.ligne([("un triangle de base", TRI_C), ("2,4 m", BASE_C)], 34)
        self.col(l1, 1.6, x)
        self.au_mot("un triangle de base")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(f.avant, color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.35)
        self.au_mot("2,4 mètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(f.base), FadeIn(c24), run_time=0.35)
        l2 = self.ligne([("et de hauteur", HAUTEUR_C), ("1,5 m,", HAUTEUR_C)], 34)
        self.col(l2, 0.95, x)
        self.au_mot("et de hauteur 1,5")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(f.hh), FadeIn(f.eq), FadeIn(ch), run_time=0.3)
        l3 = self.ligne([("sur 3 m", LONG_C), ("de long.", LONG_C)], 34)
        self.col(l3, 0.3, x)
        self.au_mot("sur 3")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Create(f.long), FadeIn(c3), run_time=0.3)
        self.au_mot("de long")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        l4 = self.ligne([("Chaque campeur :", SAC_C), ("1,5 m³.", SAC_C)], 34)
        self.col(l4, -0.35, x)
        self.au_mot("Chaque campeur")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1,5 mètre cube")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        l5 = self.t("Combien de campeurs ?", 36, JAUNE_TITRE)
        self.col(l5, -1.05, x)
        self.au_mot("Combien de campeurs")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        f = self.tente_defi()
        c24, ch, c3 = self.cotes_defi(f)
        self.add(f.prisme, f.base, f.hh, f.eq, f.long, c24, ch, c3)
        x = -0.6
        l1 = self.ligne([("Le triangle :", TRI_C), ("2,4 × 1,5", BLEU_D)], 34, buff=0.2)
        self.col(l1, 2.25, x)
        self.au_mot("Le triangle")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(f.avant, color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.35)
        self.au_mot("2,4 fois 1,5")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("= 3,6", VERT_OK), ("÷ 2", BLEU_D), ("= 1,8 m²", VERT_OK)], 34, buff=0.25)
        self.col(l2, 1.6, x)
        self.au_mot("1,5, 3,6")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("divisé par 2")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1,8 mètre carré")
        e18 = self.etiquette("1,8 m²", 28).move_to(centre_de(f.A, f.B, f.C) + DOWN * 0.08)
        self.play(FadeIn(l2[2], shift=UP * 0.1), FadeOut(f.hh), FadeOut(f.eq), FadeIn(e18, scale=1.2), run_time=0.35)
        l3 = self.ligne([("Volume :", WHITE), ("1,8 × 3", BLEU_D), ("= 5,4 m³", VERT_OK)], 34, buff=0.2)
        self.col(l3, 0.95, x)
        self.au_mot("Le volume")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1,8 fois 3")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(f.long, color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.3)
        self.au_mot("5,4 mètres cubes")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("3 campeurs :", WHITE), ("4,5,", BLEU_D), ("ça passe.", VERT_OK)], 34, buff=0.2)
        self.col(l4, 0.3, x)
        self.au_mot("3 campeurs")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("ont besoin de 4,5")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("ça passe")
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.3)
        l5 = self.ligne([("4 campeurs :", WHITE), ("6,", BLEU_D), ("trop.", ROUGE_ERREUR)], 34, buff=0.2)
        self.col(l5, -0.35, x)
        self.au_mot("4 campeurs")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de 6")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("trop")
        self.play(FadeIn(l5[2], scale=1.2), run_time=0.3)
        res = self.gros("Donc 3 campeurs.", fs=42)
        self.col(res, -1.3, x)
        sacs = VGroup(*[sac() for _ in range(3)]).arrange(RIGHT, buff=0.18).move_to(P(-3.6, -2.75))
        self.au_mot("Donc 3 campeurs")
        self.play(FadeIn(res, scale=1.2), LaggedStart(*[FadeIn(s, shift=DOWN * 0.15) for s in sacs], lag_ratio=0.2),
                  run_time=0.6)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        f = tente(2, 1.5, 3, 0.85, ORIGIN)
        fig = VGroup(f.prisme, f.hh, f.long)
        lignes = self.finale_gauche(fig, textes=[
            ("Volume du prisme droit :", "aire de la base", "× hauteur du prisme."),
            ("Si la base est un triangle,", "on n'oublie pas", "de diviser par 2.")], fs=32)
        self.add(fig)
        self.au_mot("Volume du prisme droit")
        self.montrer_ligne(lignes[0], Indicate(fig, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("Si la base est un triangle")
        self.montrer_ligne(lignes[1], Indicate(f.avant, color=JAUNE_TITRE, scale_factor=1.06))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_base()
        self.ecran_empiler()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
