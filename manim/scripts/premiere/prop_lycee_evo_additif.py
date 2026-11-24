# prop_lycee_evo_additif.py
# EleveAI — Maths 1re et STMG (automatismes, épreuve anticipée SANS calculatrice)
# série « Évolutions en pourcentage », épisode COMMUN 07 : LE COEFFICIENT
# MULTIPLICATEUR D'UNE HAUSSE (micro du coach : auto_evo_additif_multiplicatif).
# Paysage, CEINTURE JAUNE (le short jumeau : prop_lycee_evo_additif_short.py).
# Deux sous-classes : PropLyceeEvoAdditifPremiere (« Maths 1re — EleveAI ») et
# PropLyceeEvoAdditifStmg (« Maths STMG — EleveAI », garde seule, GARDE_SEULE=1,
# puis collage avec frac_cm_commun.py coller).
# ⭐ Méthode : + t % = 100 % + t % → × (1 + t ÷ 100) ; un seul calcul.
# ⭐ Le dessin : la BARRE DE 100 % (bleue) et le BOUT ajouté (orange) ; la flèche
# « × 1,02 » de l'ancienne valeur vers la nouvelle.
# ⭐ Fil rouge (erreurs) : + 5 % ≠ × 1,5 (piège 07) ; question 1 A = × 7, B = × 0,07
# (la hausse seule) ; question 2 B = × 1,3 (+ 30 %), C = + 3 € (on ajoute le taux).
# Décor et métiers : ARGENT-BUDGET (le Smic) : gestionnaire de paie, commerçant,
# économiste. Source : Smic horaire brut 11,65 € → 11,88 € au 1er novembre 2024,
# + 2 % (service-public.fr).
# Écrans : 00 garde · 01 situation (le Smic) · 02 question du jour · 03 la barre
# 102 % · 04 le coefficient 1,02 · 05 la règle · 06 QUESTION 1 (C) · 07 le piège ·
# 08 QUESTION 2 (A) · 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
# Voix : manim/voix/lycee-evo-additif.json (« go » de Frédéric le 23/11, débit −10) ;
# WAV : public/sons/lycee-evo-additif/ ; marques : prop_lycee_evo_additif_marques.json.
# Outils (non modifiés) : la base PropPourcentageCoefficientBase de l'épisode 4e 35,
# fin_commune.ecran_fin.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_evo_additif.py PropLyceeEvoAdditifPremiere
# Brouillon : python -m manim render -ql --disable_caching manim/scripts/premiere/prop_lycee_evo_additif.py PropLyceeEvoAdditifPremiere -o eleveai-maths-premiere-evo-additif --media_dir manim/scripts/premiere/media-prop-lycee-evo-additif
# Garde STMG seule : GARDE_SEULE=1 … PropLyceeEvoAdditifStmg -o garde-stmg-evo-additif

import os
import sys
from pathlib import Path
import importlib.util

_ICI = Path(__file__).resolve().parent


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_p35 = _charger("prop_pourcentage_coefficient_4e", _ICI.parents[0] / "4e" / "prop_pourcentage_coefficient.py")
from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, couleurs, personne, P…)

sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

from fin_commune import ecran_fin  # noqa: E402

PropPourcentageCoefficientBase = _p35.PropPourcentageCoefficientBase
BarreCent, boite_prix = _p35.BarreCent, _p35.boite_prix
gras, sans = _p35.gras, _p35.sans

BLEU_C = "#38bdf8"     # les 100 % de départ (bleu)
BOUT = "#fb923c"       # le bout ajouté par la hausse (orange)
FAUX = "#ef4444"
PAPIER = "#f8fafc"
ENCRE = "#0f172a"


def barre_pleine(largeur=6.0, h=0.75, centre=ORIGIN):
    """La barre de 100 %, toute bleue (10 morceaux de 10 %)."""
    b = BarreCent("", largeur=largeur, h=h, centre=centre)
    for m in b.morceaux:
        m.set_fill(BLEU_C, 1)
    return b


def bout(b, k, couleur=BOUT):
    """Le bout ajouté au bout de la barre : k morceaux de 10 % (2 % → k = 0,2)."""
    return Rectangle(width=b.lm * k, height=b.hh, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                     stroke_width=1.5).next_to(b.bp.piste, RIGHT, buff=0.04)


def bulletin(s=1.0):
    """Un bulletin de paie stylisé (sans texte) : feuille blanche, lignes grises."""
    f = RoundedRectangle(width=1.0, height=1.3, corner_radius=0.08, fill_color=PAPIER, fill_opacity=1,
                         stroke_width=0)
    lignes = VGroup(*[Line(P(-0.35, 0.4 - 0.2 * i), P(0.35 if i % 2 else 0.15, 0.4 - 0.2 * i), color="#94a3b8",
                           stroke_width=4) for i in range(5)])
    euro = Circle(radius=0.15, fill_color=VERT_OK, fill_opacity=1, stroke_width=0).move_to(P(0.28, -0.45))
    return VGroup(f, lignes, euro).scale(s)


def etiquette(s=1.0, couleur=JAUNE_TITRE):
    """Une étiquette de prix (sans texte) : un pentagone percé."""
    corps = Polygon(P(-0.6, 0.3), P(0.35, 0.3), P(0.65, 0), P(0.35, -0.3), P(-0.6, -0.3), fill_color=couleur,
                    fill_opacity=1, stroke_width=0)
    trou = Circle(radius=0.07, fill_color=BLACK, fill_opacity=1, stroke_width=0).move_to(P(0.38, 0))
    traits = VGroup(*[Line(P(-0.45, 0.1 - 0.2 * i), P(0.1, 0.1 - 0.2 * i), color=ENCRE, stroke_width=4)
                      for i in range(2)])
    return VGroup(corps, trou, traits).scale(s)


def courbe(s=1.0):
    """Une petite courbe qui monte, sur deux axes (l'indice de l'économiste)."""
    ax = VGroup(Line(P(-0.6, -0.45), P(0.65, -0.45), color=GREY_B, stroke_width=4),
                Line(P(-0.6, -0.45), P(-0.6, 0.55), color=GREY_B, stroke_width=4))
    c = VMobject(color=VERT_OK, stroke_width=6).set_points_smoothly(
        [P(-0.5, -0.3), P(-0.2, -0.15), P(0.05, -0.2), P(0.3, 0.1), P(0.55, 0.4)])
    return VGroup(ax, c).scale(s)


class PropLyceeEvoAdditifBase(PropPourcentageCoefficientBase):
    nom_voix = "lycee-evo-additif"
    fichier_marques = "prop_lycee_evo_additif_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"
    XB = -2.9
    XC = 1.3

    @staticmethod
    def cadre(m, couleur=VERT_OK):
        """HD du 23/11 : à buff 0,08 (cadre du 4e), le « = » et le « % » touchaient le trait."""
        return SurroundingRectangle(m, color=couleur, buff=0.14, corner_radius=0.1, stroke_width=4)

    def source(self, lignes):
        """La source, discrète, en bas à gauche (lue, jamais dite)."""
        s = VGroup(*[Text(x, font_size=16, color=GREY_B) for x in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.06)
        for x in s:
            x._bloc = True
        s._bloc = True
        return sans(s).to_corner(DL, buff=0.45)

    def lc(self, morceaux, y, fs=40, xl=1.3, droite=6.2):
        """La ligne de la colonne de droite (celle de la base), morceaux un peu plus
        espacés (au brouillon, « 5 %= » se touchaient)."""
        lg = self.col(self.ligne(morceaux, fs, buff=0.32), y, xl)
        if lg.get_right()[0] > droite:
            lg.scale_to_fit_width(droite - xl).align_to(P(xl, 0), LEFT)
        return lg

    def dire(self, nom, dossier=None):
        """Le début de chaque clé de voix, pour les chapitres (lu dans le log)."""
        print(f"CLE {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier) if dossier is not None else super().dire(nom)

    # la phrase de réponse des questions-pauses en 34, à GAUCHE sous la figure
    # (comme l'épisode 02 « formes » : à droite, elle butait sur Ti-Margo)
    Y_PH = -1.0

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph2 = VGroup(*[self.t(x, 34, VERT_OK) for x in phrase]).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        if ph2.width > 6.3:
            ph2.scale_to_fit_width(6.3)
        ph2.align_to(P(-6.15, 0), LEFT).align_to(P(0, self.Y_PH), UP)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def ligne_rep(self, i, morceaux, fs=34):
        ref = self.ph_q[i]
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs, buff=0.24)
        if lg.width > 6.3:
            lg.scale_to_fit_width(6.3)
        return lg.move_to(ref).align_to(ref, LEFT)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le coefficient multiplicateur", self.identite, self.ceinture, y_ech=-2.45)
        sans(ident)
        sans(ech)
        self.au_mot("Le coefficient")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        b = barre_pleine(4.0, 0.7, centre=P(-3.7, 0.25))
        bt = bout(b, 0.5)
        self.play(FadeIn(b, shift=UP * 0.2), run_time=0.4)
        L = self.lc([("+ 5 %", BOUT), ("= × ?", AMBRE)], 0.25, fs=60, xl=0.0)
        self.jouer(L, ["5 %", "multiplier"], {0: [FadeIn(bt, shift=LEFT * 0.2)]})
        self.play(Circumscribe(L, color=AMBRE, buff=0.12), Indicate(bt, color=WHITE, scale_factor=1.6), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation : le Smic du 1er novembre 2024 (+ 2 %) ─────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        carte = RoundedRectangle(width=5.4, height=3.7, corner_radius=0.2, fill_color="#111827", fill_opacity=1,
                                 stroke_color=GREY_B, stroke_width=3).move_to(P(-3.45, 0.65))
        ent = sans(self.t("Bulletin de paie", 26, GREY_B)).move_to(P(-3.45, 2.2))
        self.play(FadeIn(carte), FadeIn(ent), run_time=0.4)
        d = self.t("1er novembre 2024", 34, WHITE).move_to(P(-3.45, 1.55))
        self.montre("1er novembre", FadeIn(d, shift=DOWN * 0.1), rt=0.4)
        sm = self.t("Smic horaire brut", 36, JAUNE_TITRE).move_to(P(-3.45, 0.85))
        self.montre("Smic", FadeIn(sm, shift=RIGHT * 0.15), rt=0.4)
        a = gras("11,65 €", 36, WHITE).move_to(P(-5.05, 0.0))
        b = gras("11,88 €", 36, VERT_OK).move_to(P(-1.85, 0.0))
        fl = Arrow(a.get_right(), b.get_left(), buff=0.15, color=AMBRE, stroke_width=6,
                   max_tip_length_to_length_ratio=0.25)
        self.montre("11,65", FadeIn(a, scale=1.3), rt=0.35)
        self.montre("11,88", GrowArrow(fl), FadeIn(b, scale=1.3), rt=0.4)
        p = self.tampon("+ 2 %", BOUT, 40).move_to(P(-3.45, -0.8))
        self.montre("2 %", FadeIn(p, scale=1.3), rt=0.4)
        self.insister(p, 1.15, 0.2)
        xi, xt = 0.85, 1.65
        for y, ic, nom, mot in ((1.75, bulletin(0.8), "gestionnaire de paie", "gestionnaire"),
                                (0.45, etiquette(0.85), "commerçant", "commerçant"),
                                (-0.85, courbe(0.85), "économiste", "économiste")):
            ic.move_to(P(xi, y))
            t = self.t(nom, 30, WHITE).move_to(P(0, y)).align_to(P(xt, 0), LEFT)
            self.montre(mot, FadeIn(ic, scale=0.8), FadeIn(t, shift=RIGHT * 0.15), rt=0.4)
        src = self.source(["Source : service-public.fr — Smic horaire brut : 11,65 € → 11,88 €",
                           "au 1er novembre 2024 (+ 2 %)."])
        self.play(FadeIn(src), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la question du jour ────────────────────────────────────────────
    def ecran_question_du_jour(self):
        self.ecran("02-question-du-jour")
        pa = boite_prix("11,65 €", WHITE, 44).move_to(P(-3.6, 0.9))
        pb = boite_prix("? €", VERT_OK, 44).move_to(P(2.6, 0.9))
        fl = Arrow(pa.get_right(), pb.get_left(), buff=0.2, color=AMBRE, stroke_width=7,
                   max_tip_length_to_length_ratio=0.12)
        self.montre("11,65", FadeIn(pa, shift=RIGHT * 0.2), rt=0.4)
        n = self.t("le nouveau Smic", 32, VERT_OK).next_to(pb, DOWN, buff=0.25)
        self.montre("nouveau Smic", GrowArrow(fl), FadeIn(pb, scale=1.3), FadeIn(n, shift=UP * 0.1), rt=0.5)
        q = self.t("en un seul calcul ?", 44, ORANGE_RETENUE).move_to(P(-0.4, -1.1))
        self.montre("un seul calcul", FadeIn(q, scale=1.2), rt=0.45)
        self.play(Circumscribe(q, color=AMBRE, buff=0.12), Indicate(fl, color=AMBRE), run_time=0.8)
        self.attendre_voix()

    # ── 03 : la barre de 100 % et son bout de 2 % : 102 % ───────────────────
    def ecran_barre(self):
        self.ecran("03-barre")
        pa = boite_prix("11,65 €", WHITE, 38).move_to(P(-3.3, 2.6))
        self.montre("11,65", FadeIn(pa, shift=DOWN * 0.15), rt=0.4)
        b = barre_pleine(5.6, 0.85, centre=P(-3.3, 1.0))
        cent = gras("100 %", 36, ENCRE).move_to(b.bp.piste)
        self.montre("une barre", FadeIn(b, shift=UP * 0.2), rt=0.4)
        self.montre("100 %", FadeIn(cent, scale=1.3), rt=0.35)
        bt = bout(b, 0.2)
        t2 = gras("+ 2 %", 34, BOUT).move_to(P(bt.get_x() + 0.3, 2.35))
        fl2 = Arrow(t2.get_bottom(), bt.get_top(), buff=0.08, color=BOUT, stroke_width=5,
                    max_tip_length_to_length_ratio=0.3)
        self.montre("ajoute 2 %", FadeIn(bt, shift=LEFT * 0.3), FadeIn(t2, scale=1.3), GrowArrow(fl2), rt=0.45)
        self.play(Indicate(bt, color=WHITE, scale_factor=1.8), run_time=0.5)
        L1 = self.lc([("100 % +", BLEU_C), ("2 %", BOUT)], 1.0, fs=48, xl=self.XC)
        self.jouer(L1, ["100 % plus", None])
        a102, t102 = self.accolade(VGroup(b.bp.piste, bt), "102 %", VERT_OK, DOWN, fs=40)
        L2 = self.lc([("=", WHITE), ("102 %", VERT_OK)], -0.1, fs=56, xl=self.XC)
        self.jouer(L2, ["soit 102", None], {1: [GrowFromCenter(a102), FadeIn(t102, scale=1.3)]})
        self.play(Create(self.cadre(L2[1])), run_time=0.3)
        self.insister(L2[1], 1.2, 0.2)
        self.attendre_voix()

    # ── 04 : 102 % = 1,02 ; 11,65 × 1,02 ≈ 11,88 € ─────────────────────────
    def ecran_coefficient(self):
        self.ecran("04-coefficient")
        b = barre_pleine(4.2, 0.65, centre=P(-4.0, 1.75))
        bt = bout(b, 0.2)
        a, t = self.accolade(VGroup(b.bp.piste, bt), "102 %", VERT_OK, DOWN, fs=32)
        self.play(FadeIn(b), FadeIn(bt), run_time=0.3)
        L1 = self.lc([("102 %", VERT_OK), ("= 1,02", AMBRE)], 1.85, fs=54, xl=0.6)
        self.jouer(L1, ["102 %", "1,02"], {0: [GrowFromCenter(a), FadeIn(t, scale=1.3)]})
        self.insister(L1[1], 1.2, 0.2)
        L2 = self.lc([("+ 2 %", BOUT), ("→ × 1,02", AMBRE)], 0.75, fs=46, xl=0.6)
        self.jouer(L2, ["Augmenter de 2", ("1,02", 2)])
        pa, pb, arr, lab = self.prix_ligne("11,65 €", "≈ 11,88 €", "× 1,02", y=-1.4, xa=-5.0, xb=-0.2)
        self.montre("11,65 fois", FadeIn(pa, shift=RIGHT * 0.2), rt=0.4)
        self.montre(("1,02", 3), GrowArrow(arr), FadeIn(lab, scale=1.3), rt=0.45)
        self.montre("11,88", FadeIn(pb, scale=1.3), rt=0.4)
        self.play(Create(self.cadre(pb)), Circumscribe(lab, color=VERT_OK, buff=0.1), run_time=0.5)
        self.attendre_voix()

    # ── 05 : la règle : + t % → × (1 + t ÷ 100) ─────────────────────────────
    def ecran_regle(self):
        self.ecran("05-regle")
        self.titre_haut("La règle", "La règle")
        F = self.ligne([("+ t %", BOUT), ("→", WHITE), ("× (1 + t", AMBRE), ("÷ 100)", AMBRE)], 50, buff=0.22)
        F.move_to(P(-0.3, 1.95))
        self.jouer(F, ["augmenter de t", None, "multiplier par 1", "sur 100"])
        self.play(Create(SurroundingRectangle(F, color=AMBRE, buff=0.2, corner_radius=0.12, stroke_width=4)),
                  run_time=0.4)
        for y, k, a, b_, mots in ((0.55, 0.5, "+ 5 %", "→ × 1,05", ["Plus 5 %", "1,05"]),
                                  (-0.55, 3, "+ 30 %", "→ × 1,3", ["Plus 30", "1,3"]),
                                  (-1.65, 10, "+ 100 %", "→ × 2", ["Plus 100", "fois 2"])):
            mb = barre_pleine(2.0, 0.45, centre=P(-5.1, y))
            bb = bout(mb, k)
            L = self.lc([(a, BOUT), (b_, AMBRE)], y, fs=42, xl=-1.5)
            self.jouer(L, mots, {0: [FadeIn(mb), FadeIn(bb, shift=LEFT * 0.2)]})
        self.attendre_voix()

    # ── 06 : QUESTION 1 (+ 7 % → × 1,07 : C) ────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = barre_pleine(4.2, 0.65, centre=P(-3.9, 1.9))

        def avant(sc):
            sc.play(FadeIn(b, shift=UP * 0.2), run_time=0.4)

        def apres(sc):
            bt = bout(b, 0.7)
            a, t = sc.accolade(VGroup(b.bp.piste, bt), "107 %", VERT_OK, DOWN, fs=30)
            l0 = sc.ligne_rep(0, ["100 % + 7 %", "= 107 %", "= 1,07."])
            l1 = sc.ligne_rep(1, ["A :", "7 fois plus grand ;"])
            l2 = sc.ligne_rep(2, ["B :", "la hausse seule."])
            sc.montre("100 % plus", FadeIn(l0[0], shift=UP * 0.15), FadeIn(bt, shift=LEFT * 0.2), rt=0.4)
            sc.montre("égale 107", FadeIn(l0[1], scale=1.3), GrowFromCenter(a), FadeIn(t, scale=1.3), rt=0.4)
            sc.montre("soit 1,07", FadeIn(l0[2], scale=1.3), rt=0.35)
            sc.montre("A rend", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.35)
            sc.montre("7 fois", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("et B", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.35)
            sc.montre("que la hausse", FadeIn(l2[1], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Augmenter de 7 %,", "c'est multiplier par :"],
                            [self.t("7", 36), self.t("0,07", 36), self.t("1,07", 36)], 2,
                            ["100 % + 7 % = 107 % = 1,07.", "A : 7 fois plus grand ;", "B : la hausse seule."],
                            mot_q="Augmenter", avant_q=avant, autres_r=apres)

    # ── 07 : le piège : + 5 % ≠ × 1,5 ───────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        b1 = barre_pleine(3.4, 0.6, centre=P(-4.5, 1.55))
        bt1 = bout(b1, 5, FAUX)
        b2 = barre_pleine(3.4, 0.6, centre=P(-4.5, -0.7))
        bt2 = bout(b2, 0.5, VERT_OK)
        xl = 0.5
        L1 = self.lc([("+ 5 %", BOUT), ("≠", ROUGE_ERREUR), ("× 1,5", ROUGE_ERREUR)], 2.0, fs=46, xl=xl)
        self.jouer(L1, ["Plus 5 %", "ce n'est pas", "1,5"])
        self.play(Create(self.barrer(L1[2])), run_time=0.3)
        a1, t1 = self.accolade(VGroup(b1.bp.piste, bt1), "150 %", FAUX, DOWN, fs=30)
        L2 = self.lc([("× 1,5 =", ROUGE_ERREUR), ("150 %", FAUX), ("→ + 50 %", FAUX)], 1.0, fs=42, xl=xl)
        self.jouer(L2, [("1,5", 2), "150 %", "plus 50"],
                   {0: [FadeIn(b1, shift=UP * 0.2)], 1: [FadeIn(bt1, shift=LEFT * 0.3), GrowFromCenter(a1),
                                                         FadeIn(t1, scale=1.3)]})
        a2, t2 = self.accolade(VGroup(b2.bp.piste, bt2), "105 %", VERT_OK, DOWN, fs=30)
        L3 = self.lc([("+ 5 % =", BOUT), ("105 %", VERT_OK), ("→ × 1,05", VERT_OK)], -0.7, fs=42, xl=xl)
        self.jouer(L3, [("Plus 5 %", 2), "105 %", "1,05"],
                   {0: [FadeIn(b2, shift=UP * 0.2)], 1: [FadeIn(bt2, shift=LEFT * 0.2), GrowFromCenter(a2),
                                                         FadeIn(t2, scale=1.3)]})
        self.play(Create(self.cadre(L3[2])), Indicate(bt2, color=WHITE, scale_factor=2.0), run_time=0.5)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (loyer 600 €, + 3 % : A) ────────────────────────────
    @staticmethod
    def maison(s=1.0):
        mur = Rectangle(width=1.4, height=1.0, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
        toit = Polygon(P(-0.85, 0.5), P(0, 1.15), P(0.85, 0.5), fill_color="#b91c1c", fill_opacity=1, stroke_width=0)
        porte = Rectangle(width=0.32, height=0.55, fill_color="#92400e", fill_opacity=1,
                          stroke_width=0).move_to(P(0.3, -0.22))
        fen = Square(0.3, fill_color=BLEU_C, fill_opacity=1, stroke_width=0).move_to(P(-0.3, 0.1))
        return VGroup(mur, toit, porte, fen).scale(s)

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        m = self.maison(1.0).move_to(P(-4.9, 2.15))

        def avant(sc):
            sc.play(FadeIn(m, shift=UP * 0.2), run_time=0.4)

        def apres(sc):
            pa, pb, arr, lab = sc.prix_ligne("600 €", "618 €", "× 1,03", y=0.25, xa=-5.3, xb=-1.3)
            sans(pa)  # le loyer de la question (la réponse ne le redit pas)
            l0 = sc.ligne_rep(0, ["+ 3 % :", "× 1,03", "→ 618 €."])
            l1 = sc.ligne_rep(1, ["B :", "+ 30 % ;"])
            l2 = sc.ligne_rep(2, ["C :", "+ 3 € seulement."])
            sc.montre("3 %, c'est", FadeIn(l0[0], shift=UP * 0.15), FadeIn(pa, shift=RIGHT * 0.2), rt=0.4)
            sc.montre("1,03", FadeIn(l0[1], scale=1.3), GrowArrow(arr), FadeIn(lab, scale=1.3), rt=0.4)
            sc.montre("618", FadeIn(l0[2], scale=1.3), FadeIn(pb, scale=1.3), rt=0.4)
            sc.montre("B augmente", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.35)
            sc.montre("30 %", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("et C", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.35)
            sc.montre("que 3", FadeIn(l2[1], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Un loyer de 600 €, + 3 %.", "Quel calcul donne", "le nouveau loyer ?"],
                            [self.t("600 × 1,03", 34), self.t("600 × 1,3", 34), self.t("600 + 3", 34)], 0,
                            ["+ 3 % : × 1,03 → 618 €.", "B : + 30 % ;", "C : + 3 € seulement."],
                            mot_q="Un loyer", avant_q=avant, autres_r=apres)

    # ── 09 : défi : + 12 % ; + 0,5 % ────────────────────────────────────────
    def deux_barres(self):
        b1 = barre_pleine(4.0, 0.6, centre=P(-4.0, 1.4))
        b2 = barre_pleine(4.0, 0.6, centre=P(-4.0, -0.5))
        return b1, bout(b1, 1.2), b2, bout(b2, 0.05)

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        b1, bt1, b2, bt2 = self.deux_barres()
        xl = 0.9
        L1 = self.lc([("+ 12 %", BOUT), ("= × ?", AMBRE)], 1.4, fs=50, xl=xl)
        self.jouer(L1, ["12 %", None], {0: [FadeIn(b1, shift=UP * 0.2), FadeIn(bt1, shift=LEFT * 0.2)]})
        L2 = self.lc([("+ 0,5 %", BOUT), ("= × ?", AMBRE)], -0.5, fs=50, xl=xl)
        self.jouer(L2, ["0,5 %", None], {0: [FadeIn(b2, shift=UP * 0.2), FadeIn(bt2, shift=LEFT * 0.2)]})
        self.play(Indicate(bt2, color=WHITE, scale_factor=3.0), run_time=0.6)
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = sans(self.t("Correction", 50, JAUNE_TITRE)).move_to(P(-0.4, 3.1))
        b1, bt1, b2, bt2 = self.deux_barres()
        self.add(tit, b1, bt1, b2, bt2)  # posés d'un coup : la voix commence tout de suite
        a1, t1 = self.accolade(VGroup(b1.bp.piste, bt1), "112 %", VERT_OK, DOWN, fs=30)
        a2, t2 = self.accolade(VGroup(b2.bp.piste, bt2), "100,5 %", VERT_OK, DOWN, fs=30)
        xl = 0.1
        L1 = self.lc([("+ 12 % :", BOUT), ("112 %", VERT_OK), ("→ × 1,12", AMBRE)], 1.4, fs=46, xl=xl)
        L1[2].shift(RIGHT * 0.18)  # le cadre ne touche pas le pourcentage
        self.jouer(L1, ["Plus 12", "112 %", "1,12"], {1: [GrowFromCenter(a1), FadeIn(t1, scale=1.3)]})
        self.play(Create(self.cadre(L1[2])), run_time=0.3)
        L2 = self.lc([("+ 0,5 % :", BOUT), ("100,5 %", VERT_OK), ("→ × 1,005", AMBRE)], -0.5, fs=46, xl=xl)
        L2[2].shift(RIGHT * 0.18)  # le cadre ne touche pas le pourcentage
        self.jouer(L2, ["Plus 0,5", "100,5", "1,005"], {1: [GrowFromCenter(a2), FadeIn(t2, scale=1.3)]})
        self.play(Create(self.cadre(L2[2])), run_time=0.3)
        self.insister(L2[2], 1.15, 0.2)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        b = barre_pleine(3.6, 0.6, centre=P(-4.3, 0.3))
        bt = bout(b, 0.2)
        lab = sans(gras("× 1,02", 34, AMBRE)).next_to(VGroup(b, bt), UP, buff=0.2)
        fig = VGroup(b, bt, lab)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Augmenter de t % :", "on multiplie par 1 + t ÷ 100."),
            ("+ 2 % : × 1,02 ;", "+ 50 % : × 1,5."),
            ("Un seul calcul, sans calculer", "la hausse à part.")], fs=36)
        self.au_mot("Augmenter de t")
        self.montrer_ligne(lignes[0], Indicate(bt, color=WHITE, scale_factor=2.0))
        self.au_mot("Plus 2")
        self.montrer_ligne(lignes[1])
        self.au_mot("Un seul calcul")
        self.montrer_ligne(lignes[2], Circumscribe(lab, color=VERT_OK, buff=0.1))
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_question_du_jour, self.ecran_barre,
                  self.ecran_coefficient, self.ecran_regle, self.ecran_question1, self.ecran_piege,
                  self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde STMG seule (voir l'en-tête)
            ecrans[0]()
            return
        for e in ecrans:
            e()
        ecran_fin(self, "paysage", voix="11-abonne")


class PropLyceeEvoAdditifPremiere(PropLyceeEvoAdditifBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"


class PropLyceeEvoAdditifStmg(PropLyceeEvoAdditifBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
