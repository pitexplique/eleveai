# prop_lycee_evo_diminution.py
# EleveAI — Maths 1re et STMG (automatismes, épreuve anticipée SANS calculatrice)
# série « Évolutions en pourcentage », épisode COMMUN 08 : LE COEFFICIENT D'UNE
# BAISSE (micro du coach : auto_evo_diminution).
# Paysage, CEINTURE JAUNE (le short jumeau : prop_lycee_evo_diminution_short.py).
# Deux sous-classes : PropLyceeEvoDiminutionPremiere (« Maths 1re — EleveAI ») et
# PropLyceeEvoDiminutionStmg (« Maths STMG — EleveAI », garde seule, GARDE_SEULE=1,
# puis collage avec frac_cm_commun.py coller).
# ⭐ Méthode : − t % = 100 % − t % → × (1 − t ÷ 100) ; ce qui compte, c'est ce qui RESTE.
# ⭐ Le dessin : la BARRE DE 100 % (bleue) dont un MORCEAU est retiré (rouge, il
# s'en va) ; l'accolade de ce qui reste ; la flèche « × 0,7 ».
# ⭐ Fil rouge (erreurs) : − 30 % ≠ × 0,3 (piège 07 : on ne garderait que 30 %) ;
# question 1 A = 0,4 et C = 0,6 (on garde 40 % ou 60 %) ; question 2 A = 10 € (on
# garde 25 %), B = 15 € (on enlève 25 € au lieu de 25 %).
# Décor et métiers : MODE (les soldes : vendeur, cliente), NATURE-ÉCOLOGIE
# (ingénieure : − 15 % d'énergie ; agriculteur : − 10 % de récolte).
# Chiffres inventés (vie courante), pas de source.
# Écrans : 00 garde · 01 situation (les soldes) · 02 question du jour · 03 la barre
# 70 % · 04 le coefficient 0,7 · 05 la règle · 06 QUESTION 1 (B) · 07 le piège ·
# 08 QUESTION 2 (C) · 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
# Voix : manim/voix/lycee-evo-diminution.json (« go » de Frédéric le 23/11, débit −10) ;
# WAV : public/sons/lycee-evo-diminution/ ; marques : prop_lycee_evo_diminution_marques.json.
# Outils (non modifiés) : la base PropPourcentageCoefficientBase de l'épisode 4e 35,
# fin_commune.ecran_fin.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_evo_diminution.py PropLyceeEvoDiminutionPremiere
# Brouillon : python -m manim render -ql --disable_caching manim/scripts/premiere/prop_lycee_evo_diminution.py PropLyceeEvoDiminutionPremiere -o eleveai-maths-premiere-evo-diminution --media_dir manim/scripts/premiere/media-prop-lycee-evo-diminution
# Garde STMG seule : GARDE_SEULE=1 … PropLyceeEvoDiminutionStmg -o garde-stmg-evo-diminution

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
BOUT = "#fb923c"       # (orange : les taux)
RETIRE = "#ef4444"     # le morceau retiré par la baisse (rouge)
VIDE = "#1e293b"       # la place laissée vide
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


def manteau(s=1.0, couleur="#7c3aed"):
    """Un manteau sur un cintre : deux pans, deux manches, des boutons."""
    cintre = VGroup(Line(P(-0.7, 1.0), P(0, 1.3), color=GREY_B, stroke_width=5),
                    Line(P(0, 1.3), P(0.7, 1.0), color=GREY_B, stroke_width=5),
                    Arc(radius=0.12, start_angle=0, angle=PI, color=GREY_B, stroke_width=5).move_to(P(0, 1.45)))
    corps = Polygon(P(-0.7, 1.0), P(0.7, 1.0), P(0.85, -1.0), P(-0.85, -1.0), fill_color=couleur, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=2)
    m1 = Polygon(P(-0.7, 1.0), P(-1.1, -0.6), P(-0.85, -0.65), P(-0.6, 0.4), fill_color=couleur, fill_opacity=1,
                 stroke_color=WHITE, stroke_width=2)
    m2 = m1.copy().flip(UP).move_to(P(0.86, 0.18))
    col = Polygon(P(-0.3, 1.0), P(0, 0.55), P(0.3, 1.0), fill_color="#111827", fill_opacity=1, stroke_width=0)
    bt = VGroup(*[Dot(P(0.0, 0.3 - 0.35 * i), radius=0.06, color=JAUNE_TITRE) for i in range(3)])
    return VGroup(cintre, m1, m2, corps, col, bt).scale(s)


def batiment(s=1.0):
    """Un bâtiment à fenêtres et un petit éclair (l'énergie)."""
    mur = Rectangle(width=1.1, height=1.5, fill_color="#64748b", fill_opacity=1, stroke_width=0)
    fen = VGroup(*[Square(0.2, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
                   .move_to(P(-0.25 + 0.5 * (i % 2), 0.45 - 0.4 * (i // 2))) for i in range(6)])
    eclair = Polygon(P(0.75, 0.8), P(0.55, 0.3), P(0.72, 0.3), P(0.58, -0.15), P(0.95, 0.42), P(0.78, 0.42),
                     P(0.92, 0.8), fill_color=AMBRE, fill_opacity=1, stroke_width=0)
    return VGroup(mur, fen, eclair).scale(s)


def champ(s=1.0):
    """Un champ : des sillons verts sous un soleil."""
    sol = Polygon(P(-0.9, -0.5), P(0.9, -0.5), P(0.6, 0.2), P(-0.6, 0.2), fill_color="#65a30d", fill_opacity=1,
                  stroke_width=0)
    sillons = VGroup(*[Line(P(-0.45 + 0.3 * i, 0.2), P(-0.7 + 0.47 * i, -0.5), color="#365314", stroke_width=4)
                       for i in range(4)])
    soleil = Circle(radius=0.22, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0).move_to(P(0.55, 0.65))
    return VGroup(sol, sillons, soleil).scale(s)


def telephone(s=1.0):
    """Un téléphone et le triangle « lecture » d'un abonnement (vidéo, musique)."""
    corps = RoundedRectangle(width=0.9, height=1.6, corner_radius=0.14, fill_color="#111827", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=4)
    ecran = RoundedRectangle(width=0.72, height=1.25, corner_radius=0.06, fill_color="#1d4ed8", fill_opacity=1,
                             stroke_width=0)
    lec = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.18).rotate(-PI / 2)
    return VGroup(corps, ecran, lec).scale(s)


def retire(b, k, couleur=RETIRE):
    """La baisse : les k derniers morceaux de 10 % (k peut être décimal).
    Renvoie (trou, morceau) : le trou sombre qui reste dans la barre et le
    morceau rouge, posé à sa place, qu'on fait partir."""
    w = b.lm * k
    x1 = b.morceaux[-1].get_right()[0]
    trou = Rectangle(width=w, height=b.hh, fill_color=VIDE, fill_opacity=1, stroke_width=0)
    trou.move_to(P(x1 - w / 2, b.morceaux[0].get_y()))
    m = Rectangle(width=w, height=b.hh, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    return trou, m.move_to(trou)


def reste(b, k):
    """Ce qui reste de la barre après une baisse de k morceaux (pour l'accolade)."""
    w = b.lm * (10 - k)
    x0 = b.morceaux[0].get_left()[0]
    return Rectangle(width=w, height=b.hh, stroke_width=0, fill_opacity=0).move_to(P(x0 + w / 2, b.morceaux[0].get_y()))


class PropLyceeEvoDiminutionBase(PropPourcentageCoefficientBase):
    nom_voix = "lycee-evo-diminution"
    fichier_marques = "prop_lycee_evo_diminution_marques.json"
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

    def partir(self, trou, m, mot=None, dx=0.5, dy=0.85, avec=()):
        """Au mot : le morceau retiré s'allume en rouge, puis s'en va (et pâlit) ; le trou reste."""
        if mot:
            self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
        self.play(FadeIn(trou), FadeIn(m), *avec, run_time=0.25)  # m après trou : dessiné au-dessus
        self.play(m.animate.shift(RIGHT * dx + UP * dy).set_opacity(0.55), run_time=0.45)

    @staticmethod
    def deja_retire(b, k, dx=0.35, dy=0.6):
        """Une barre DÉJÀ baissée (sans animation) : le trou, et le morceau rouge à côté."""
        trou, m = retire(b, k)
        m.shift(RIGHT * dx + UP * dy).set_opacity(0.55)
        return VGroup(trou, m)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le coefficient d'une baisse", self.identite, self.ceinture, y_ech=-2.45)
        sans(titre)
        sans(ident)
        sans(ech)
        self.au_mot("Traduire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        b = barre_pleine(4.0, 0.7, centre=P(-3.7, 0.1))
        trou, m = retire(b, 0.5)
        self.play(FadeIn(b, shift=UP * 0.2), run_time=0.4)
        L = self.lc([("− 5 %", RETIRE), ("= × ?", AMBRE)], 0.1, fs=60, xl=0.0)
        self.au_mot("Moins 5")
        self.play(FadeIn(L[0], shift=RIGHT * 0.15), FadeIn(trou), FadeIn(m), run_time=0.3)
        self.play(m.animate.shift(RIGHT * 0.4 + UP * 0.7).set_opacity(0.55), run_time=0.4)
        self.jouer(VGroup(L[1]), ["multiplier"])
        self.play(Circumscribe(L, color=AMBRE, buff=0.12), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation : les soldes (− 30 %), et ailleurs (− 15 %, − 10 %) ─
    def ecran_situation(self):
        self.ecran("01-situation")
        sol = self.tampon("SOLDES", RETIRE, 40).move_to(P(-4.2, 2.6))
        self.montre("soldes", FadeIn(sol, scale=1.3), rt=0.4)
        mt = manteau(0.9).move_to(P(-5.45, 0.45))
        self.montre("manteau", FadeIn(mt, shift=DOWN * 0.2), rt=0.4)
        et = boite_prix("80 €", WHITE, 44).move_to(P(-2.85, 1.05))
        self.montre("80 €", FadeIn(et, scale=1.3), rt=0.35)
        p30 = self.tampon("− 30 %", RETIRE, 42).move_to(P(-2.85, -0.15))
        self.montre("30 %", FadeIn(p30, scale=1.3), rt=0.4)
        self.insister(p30, 1.15, 0.2)
        q = sans(boite_prix("? €", VERT_OK, 40)).move_to(P(-2.85, -1.45))
        fl = Arrow(p30.get_bottom(), q.get_top(), buff=0.1, color=AMBRE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.3)
        self.montre("changer l'étiquette", Wiggle(et, scale_value=1.12, rotation_angle=0.05), rt=0.6)
        self.montre("ce qu'elle paiera", GrowArrow(fl), FadeIn(q, scale=1.2), rt=0.45)
        h = self.lc([("La même baisse sert ailleurs :", GREY_B)], 2.55, fs=32, xl=0.0)
        self.jouer(h, ["La même baisse"])
        for y, ic, nom, pct, legende, mots in (
                (1.25, batiment(0.75), "ingénieure :", "− 15 %", "consommation",
                 ["ingénieure", "15 %", "consommation"]),
                (-0.85, champ(0.85), "agriculteur :", "− 10 %", "récolte", ["agriculteur", "récolte", "10 %"])):
            ic.move_to(P(0.75, y - 0.2))
            L = self.lc([(nom, WHITE), (pct, RETIRE)], y, fs=34, xl=1.7)
            L2 = self.lc([(legende, GREY_B)], y - 0.6, fs=30, xl=1.7)
            ordre = VGroup(L[0], L[1], L2[0]) if mots[1].endswith("%") and mots[2] == "consommation"                 else VGroup(L[0], L2[0], L[1])  # « sa récolte baisser de 10 % » : récolte avant 10 %
            self.jouer(ordre, mots, {0: [FadeIn(ic, scale=0.8)]})
        self.attendre_voix()

    # ── 02 : la question du jour ────────────────────────────────────────────
    def ecran_question_du_jour(self):
        self.ecran("02-question-du-jour")
        pa = sans(boite_prix("80 €", WHITE, 44)).move_to(P(-3.6, 0.9))
        p30 = sans(gras("− 30 %", 34, RETIRE)).next_to(pa, UP, buff=0.3)
        self.play(FadeIn(pa), FadeIn(p30), run_time=0.4)
        pb = sans(boite_prix("? €", VERT_OK, 44)).move_to(P(2.6, 0.9))
        fl = Arrow(pa.get_right(), pb.get_left(), buff=0.2, color=AMBRE, stroke_width=7,
                   max_tip_length_to_length_ratio=0.12)
        n = self.t("Quel prix sur l'étiquette ?", 34, VERT_OK).move_to(P(2.6, -0.25))
        self.montre("Quel prix", GrowArrow(fl), FadeIn(pb, scale=1.3), FadeIn(n, shift=UP * 0.1), rt=0.5)
        q = self.t("en un seul calcul ?", 44, ORANGE_RETENUE).move_to(P(-0.4, -1.5))
        self.montre("un seul calcul", FadeIn(q, scale=1.2), rt=0.45)
        self.play(Circumscribe(q, color=AMBRE, buff=0.12), Indicate(fl, color=AMBRE), run_time=0.8)
        self.attendre_voix()

    # ── 03 : la barre de 100 % ; on retire 30 % ; il reste 70 % ──────────────
    def ecran_barre(self):
        self.ecran("03-barre")
        dep = self.t("Le prix de départ", 34, GREY_B).move_to(P(-4.3, 2.3))
        self.montre("prix de départ", FadeIn(dep, shift=DOWN * 0.1), rt=0.4)
        b = barre_pleine(5.6, 0.85, centre=P(-3.1, 1.0))
        cent = gras("100 %", 36, ENCRE).move_to(P(-4.0, 1.0))
        self.montre("une barre", FadeIn(b, shift=UP * 0.2), rt=0.4)
        self.montre("100 %", FadeIn(cent, scale=1.3), rt=0.35)
        trou, m = retire(b, 3)
        t30 = gras("− 30 %", 32, RETIRE).move_to(m.get_center() + P(0.5, 1.6))
        self.partir(trou, m, "On retire", avec=[FadeIn(t30, scale=1.3)])
        L1 = self.lc([("100 % −", BLEU_C), ("30 %", RETIRE)], 0.9, fs=48, xl=self.XC)
        self.jouer(L1, ["100 % moins", None])
        a70, t70 = self.accolade(reste(b, 3), "70 %", VERT_OK, DOWN, fs=40)
        L2 = self.lc([("=", WHITE), ("70 %", VERT_OK)], -0.2, fs=56, xl=self.XC)
        self.jouer(L2, ["soit 70", None], {1: [GrowFromCenter(a70), FadeIn(t70, scale=1.3)]})
        self.play(Create(self.cadre(L2[1])), run_time=0.3)
        self.insister(L2[1], 1.2, 0.2)
        self.attendre_voix()

    # ── 04 : 70 % = 0,7 ; 80 × 0,7 = 56 € ───────────────────────────────────
    def ecran_coefficient(self):
        self.ecran("04-coefficient")
        b = barre_pleine(4.2, 0.65, centre=P(-4.0, 1.75))
        r = self.deja_retire(b, 3)
        a, t = self.accolade(reste(b, 3), "70 %", VERT_OK, DOWN, fs=32)
        self.play(FadeIn(b), FadeIn(r), run_time=0.3)
        L1 = self.lc([("70 %", VERT_OK), ("= 0,7", AMBRE)], 1.85, fs=54, xl=0.6)
        self.jouer(L1, ["70 %", "0,7"], {0: [GrowFromCenter(a), FadeIn(t, scale=1.3)]})
        self.insister(L1[1], 1.2, 0.2)
        L2 = self.lc([("− 30 %", RETIRE), ("→ × 0,7", AMBRE)], 0.75, fs=46, xl=0.6)
        self.jouer(L2, ["Baisser de 30", ("0,7", 2)])
        pa, pb, arr, lab = self.prix_ligne("80 €", "56 €", "× 0,7", y=-1.4, xa=-5.0, xb=-0.6)
        self.montre("80 fois", FadeIn(pa, shift=RIGHT * 0.2), rt=0.4)
        self.montre(("0,7", 3), GrowArrow(arr), FadeIn(lab, scale=1.3), rt=0.45)
        self.montre("56", FadeIn(pb, scale=1.3), rt=0.4)
        self.play(Create(self.cadre(pb)), Circumscribe(lab, color=VERT_OK, buff=0.1), run_time=0.5)
        self.attendre_voix()

    # ── 05 : la règle : − t % → × (1 − t ÷ 100) ; un coefficient < 1 ────────
    def ecran_regle(self):
        self.ecran("05-regle")
        self.titre_haut("La règle", "La règle")
        F = self.ligne([("− t %", RETIRE), ("→", WHITE), ("× (1 − t", AMBRE), ("÷ 100)", AMBRE)], 50, buff=0.22)
        F.move_to(P(-0.3, 1.95))
        self.jouer(F, ["baisser de t", None, "multiplier par 1", "sur 100"])
        self.play(Create(SurroundingRectangle(F, color=AMBRE, buff=0.2, corner_radius=0.12, stroke_width=4)),
                  run_time=0.4)
        for y, k, a, b_, mots in ((0.6, 1.5, "− 15 %", "→ × 0,85", ["Moins 15", "0,85"]),
                                  (-0.45, 1, "− 10 %", "→ × 0,9", ["Moins 10", "0,9"])):
            mb = barre_pleine(2.4, 0.45, centre=P(-4.9, y))
            r = self.deja_retire(mb, k, 0.25, 0.35)
            L = self.lc([(a, RETIRE), (b_, AMBRE)], y, fs=42, xl=-1.3)
            self.jouer(L, mots, {0: [FadeIn(mb), FadeIn(r)]})
        L3 = self.lc([("Coefficient d'une baisse", WHITE), ("< 1", VERT_OK)], -1.6, fs=40, xl=-3.2, droite=5.0)
        self.jouer(L3, ["Le coefficient", "plus petit que 1"])
        self.play(Create(self.cadre(L3[1])), run_time=0.3)
        self.insister(L3[1], 1.25, 0.2)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (− 4 % → × 0,96 : B) ────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = barre_pleine(4.2, 0.65, centre=P(-3.9, 1.9))

        def avant(sc):
            sc.play(FadeIn(b, shift=UP * 0.2), run_time=0.4)

        def apres(sc):
            trou, m = retire(b, 0.4)
            a, t = sc.accolade(reste(b, 0.4), "96 %", VERT_OK, DOWN, fs=30)
            l0 = sc.ligne_rep(0, ["100 % − 4 %", "= 96 %", "= 0,96."])
            l1 = sc.ligne_rep(1, ["A, C :", "on ne garde"])
            l2 = sc.ligne_rep(2, ["que 40 %", "ou 60 %."])
            sc.partir(trou, m, "100 % moins", 0.3, 0.6, avec=[FadeIn(l0[0], shift=UP * 0.15)])
            sc.montre("égale 96", FadeIn(l0[1], scale=1.3), GrowFromCenter(a), FadeIn(t, scale=1.3), rt=0.4)
            sc.montre("0,96", FadeIn(l0[2], scale=1.3), rt=0.35)
            sc.montre("A et C", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(0)),
                      Create(sc.barrer_choix(2)), rt=0.35)
            sc.montre("ne gardent", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("40 %", FadeIn(l2[0], shift=UP * 0.15), rt=0.3)
            sc.montre("60 %", FadeIn(l2[1], shift=UP * 0.15), rt=0.3)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Baisser de 4 %,", "c'est multiplier par :"],
                            [self.t("0,4", 36), self.t("0,96", 36), self.t("0,6", 36)], 1,
                            ["100 % − 4 % = 96 % = 0,96.", "A, C : on ne garde", "que 40 % ou 60 %."],
                            mot_q="Baisser", avant_q=avant, autres_r=apres)

    # ── 07 : le piège : − 30 % ≠ × 0,3 ; ce qui compte, c'est ce qui reste ──
    def ecran_piege(self):
        self.ecran("07-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        xl = 0.3
        L1 = self.lc([("− 30 %", RETIRE), ("≠", ROUGE_ERREUR), ("× 0,3", ROUGE_ERREUR)], 2.05, fs=46, xl=xl)
        self.jouer(L1, ["Moins 30", "ce n'est pas", "0,3"])
        self.play(Create(self.barrer(L1[2])), run_time=0.3)
        b1 = barre_pleine(4.0, 0.6, centre=P(-4.2, 1.1))
        tr1, m1 = retire(b1, 7)
        a1, t1 = self.accolade(reste(b1, 7), "30 %", FAUX, DOWN, fs=30)
        L2 = self.lc([("× 0,3 :", ROUGE_ERREUR), ("on garde 30 %", FAUX)], 1.0, fs=40, xl=xl)
        self.au_mot("Fois 0,3")
        self.play(FadeIn(b1, shift=UP * 0.2), FadeIn(L2[0], shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("que 30")
        self.play(FadeIn(L2[1], shift=RIGHT * 0.15), FadeIn(tr1), FadeIn(m1), GrowFromCenter(a1),
                  FadeIn(t1, scale=1.3), run_time=0.35)
        self.play(m1.animate.shift(UP * 0.75).set_opacity(0.45), run_time=0.4)
        L2b = self.lc([("= une baisse de 70 % !", FAUX)], 0.3, fs=40, xl=xl)
        self.jouer(L2b, ["une baisse de 70"])
        b2 = barre_pleine(4.0, 0.6, centre=P(-4.2, -1.1))
        tr2, m2 = retire(b2, 3)
        a2, t2 = self.accolade(reste(b2, 3), "ce qui reste", VERT_OK, DOWN, fs=30)
        L3 = self.lc([("Ce qui compte :", WHITE)], -0.9, fs=44, xl=xl)
        L3b = self.lc([("ce qui reste !", VERT_OK)], -1.6, fs=48, xl=xl + 0.6, droite=5.2)
        self.au_mot("Ce qui compte")
        self.play(FadeIn(b2, shift=UP * 0.2), FadeIn(L3[0], shift=RIGHT * 0.15), FadeIn(tr2), FadeIn(m2),
                  run_time=0.35)
        self.play(m2.animate.shift(UP * 0.6 + RIGHT * 0.3).set_opacity(0.45), run_time=0.35)
        self.au_mot("ce qui reste")
        self.play(FadeIn(L3b, scale=1.2), GrowFromCenter(a2), FadeIn(t2, scale=1.2), run_time=0.4)
        self.play(Circumscribe(reste(b2, 3), color=VERT_OK, buff=0.06), run_time=0.6)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (abonnement 40 €, − 25 % : C) ───────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        tel = telephone(1.0).move_to(P(-4.9, 2.0))

        def avant(sc):
            sc.play(FadeIn(tel, shift=UP * 0.2), run_time=0.4)

        def apres(sc):
            pa, pb, arr, lab = sc.prix_ligne("40 €", "30 €", "× 0,75", y=0.25, xa=-5.3, xb=-1.5)
            sans(pa)  # le prix de la question (redit plus loin dans « 40 fois 0,75 »)
            l0 = sc.ligne_rep(0, ["− 25 % :", "× 0,75 ;"])
            l1 = sc.ligne_rep(1, ["40 × 0,75", "= 30 €."])
            l2 = sc.ligne_rep(2, ["A : 25 % ;", "B : − 25 €."])
            sc.montre("Moins 25", FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("0,75", FadeIn(l0[1], scale=1.3), rt=0.35)
            sc.montre("40 fois", FadeIn(l1[0], shift=UP * 0.15), FadeIn(pa, shift=RIGHT * 0.2), GrowArrow(arr),
                      FadeIn(lab, scale=1.3), rt=0.4)
            sc.montre("égale 30", FadeIn(l1[1], scale=1.3), FadeIn(pb, scale=1.3), rt=0.4)
            sc.montre("A garde", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.35)
            sc.montre("B enlève", FadeIn(l2[1], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.35)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Un abonnement à 40 €", "baisse de 25 %.", "Combien coûte-t-il ?"],
                            [self.t("10 €", 34), self.t("15 €", 34), self.t("30 €", 34)], 2,
                            ["− 25 % : × 0,75 ;", "40 × 0,75 = 30 €.", "A : 25 % ; B : − 25 €."],
                            mot_q="Un abonnement", avant_q=avant, autres_r=apres)

    # ── 09 : défi : − 18 % ; × 0,92 ─────────────────────────────────────────
    def deux_barres(self):
        b1 = barre_pleine(4.0, 0.6, centre=P(-4.0, 1.4))
        b2 = barre_pleine(4.0, 0.6, centre=P(-4.0, -0.5))
        return b1, b2

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        b1, b2 = self.deux_barres()
        r1 = self.deja_retire(b1, 1.8, 0.3, 0.6)
        xl = 0.9
        L1 = self.lc([("− 18 %", RETIRE), ("= × ?", AMBRE)], 1.4, fs=50, xl=xl)
        self.jouer(L1, ["18 %", None], {0: [FadeIn(b1, shift=UP * 0.2), FadeIn(r1)]})
        q2 = sans(gras("?", 44, AMBRE)).next_to(b2, RIGHT, buff=0.3)
        L2 = self.lc([("× 0,92", AMBRE), ("= ?", AMBRE)], -0.5, fs=50, xl=xl)
        self.jouer(L2, ["0,92", None], {0: [FadeIn(b2, shift=UP * 0.2), FadeIn(q2)]})
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = sans(self.t("Correction", 50, JAUNE_TITRE)).move_to(P(-0.4, 3.1))
        b1, b2 = self.deux_barres()
        r1 = self.deja_retire(b1, 1.8, 0.3, 0.6)
        self.add(tit, b1, r1, b2)  # posés d'un coup : la voix commence tout de suite
        a1, t1 = self.accolade(reste(b1, 1.8), "82 %", VERT_OK, DOWN, fs=30)
        a2, t2 = self.accolade(reste(b2, 0.8), "92 %", VERT_OK, DOWN, fs=30)
        tr2, m2 = retire(b2, 0.8)
        xl = 0.1
        L1 = self.lc([("− 18 % :", RETIRE), ("reste 82 %", VERT_OK), ("→ × 0,82", AMBRE)], 1.4, fs=46, xl=xl)
        L1[2].shift(RIGHT * 0.12)  # HD 23/11 : ligne réduite, le cadre collait au voisin
        self.jouer(L1, ["Moins 18", "reste 82", "0,82"], {1: [GrowFromCenter(a1), FadeIn(t1, scale=1.3)]})
        self.play(Create(self.cadre(L1[2])), run_time=0.3)
        L2 = self.lc([("× 0,92 :", AMBRE), ("reste 92 %", VERT_OK), ("→ − 8 %", RETIRE)], -0.5, fs=46, xl=xl)
        L2[2].shift(RIGHT * 0.12)
        self.jouer(VGroup(L2[0], L2[1]), ["Fois 0,92", "reste 92"], {1: [GrowFromCenter(a2), FadeIn(t2, scale=1.3)]})
        self.partir(tr2, m2, "baisse de 8", 0.25, 0.6, avec=[FadeIn(L2[2], scale=1.3)])
        self.play(Create(self.cadre(L2[2], RETIRE)), run_time=0.3)
        self.insister(L2[2], 1.15, 0.2)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        b = barre_pleine(3.6, 0.6, centre=P(-4.3, 0.3))
        r = self.deja_retire(b, 3, 0.3, 0.55)
        lab = sans(gras("× 0,7", 34, AMBRE)).next_to(VGroup(b, r), UP, buff=0.2)
        fig = VGroup(b, r, lab)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Baisser de t % :", "× (1 − t ÷ 100)."),
            ("− 30 % : × 0,7.",),
            ("Coefficient < 1 : baisse ;", "coefficient > 1 : hausse.")], fs=36)
        self.au_mot("Baisser de t")
        self.montrer_ligne(lignes[0], Indicate(r[1], color=WHITE, scale_factor=1.3))
        self.au_mot("Moins 30")
        self.montrer_ligne(lignes[1], Circumscribe(lab, color=VERT_OK, buff=0.1))
        self.au_mot("Un coefficient")
        self.montrer_ligne(lignes[2])
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


class PropLyceeEvoDiminutionPremiere(PropLyceeEvoDiminutionBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"


class PropLyceeEvoDiminutionStmg(PropLyceeEvoDiminutionBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
