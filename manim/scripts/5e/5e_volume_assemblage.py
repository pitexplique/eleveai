# 5e_volume_assemblage.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode V6 : LE VOLUME D'UN ASSEMBLAGE
# (micro volume_assemblage, notion volume_solide), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : 5e-volume-assemblage-short (le château de sable, 40 + 10 = 50 dm³).
# Décor et métier : Chloé, PÂTISSIÈRE (gâteaux à étages ; centres cuisine, jeux-defis).
# Mapping micro → écrans : 02 (additionner : un pavé de 40 cm³ + un prisme de 30 cm³ collé dessus = 70 cm³),
# 03 (enlever : un pavé de 80 cm³ creusé d'un trou cubique de 8 cm³ : 80 − 8 = 72 cm³), 04 (méthode : découper,
# calculer chaque volume, additionner ou enlever ce qui est creusé), 06 (piège : des volumes, jamais des longueurs ;
# la même unité avant d'additionner), questions 05 (B : 8 + 20 = 28 cm³) et 07 (C : 60 − 15 = 45 cm³),
# défi 08 (20 × 20 × 6 = 2 400 ; 10 × 10 × 6 = 600 ; 3 000 cm³ = 3 litres de pâte).
# Fiche : lib/fiches/maths-5e-volumes.tsx.
# Voix : manim/voix/5e-volume-assemblage.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_volume_assemblage_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py volume-assemblage).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_volume_assemblage.py VolumeAssemblage5e
# Sortie finale : manim/sorties/5e/maths/volume/06-volume-assemblage/eleveai-maths-5e-volume-assemblage.mp4

import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403
from aire_volume_5e_commun import FUITE  # noqa: E402

# la génoise (le pavé) et le glaçage (le prisme) ; le trou, en sombre
GEN = dict(face="#f2c879", dessus="#f8dfa6", cote="#d4a24c", bord="#7c4a1e")
GEN_T = "#f2c879"
ROSE = dict(face="#f9a8d4", cote="#ec4899", dessus="#fbcfe8", bord="#831843")
ROSE_T = "#f9a8d4"
MENTHE = dict(face="#86efac", dessus="#bbf7d0", cote="#22c55e", bord="#14532d")   # le 2e morceau (question 1)
MENTHE_T = "#86efac"
CHOCO = dict(face="#b07a4f", dessus="#c8966b", cote="#8a5a35", bord="#3b2314")    # l'étage du haut (défi)
CHOCO_T = "#d6a77a"
TROU_FOND, TROU_COTE, TROU_T = "#2a170b", "#4a2c17", "#fdba74"
_SEP = re.compile(r"(?<=\d)[   ](\d{3})(?!\d)")  # « 2 400 » dans la voix


def prisme_vu(base, haut, x_sommet, longueur, u, o, couleurs=ROSE, sw=4):
    """Le prisme du commun, sans son pan gauche quand il est caché (la cavalière voit de la droite : le pan gauche
    n'est visible que si x_sommet × fuite_y > haut × fuite_x ; sinon le commun le peint PAR-DESSUS le pan droit)."""
    v = prisme_tri(base, haut, x_sommet, longueur, u, o, face=couleurs["face"], cote=couleurs["cote"],
                   dessus=couleurs["dessus"], bord=couleurs["bord"], sw=sw)
    if x_sommet * FUITE[1] <= haut * FUITE[0]:
        v.pans.remove(v.pans[1])
    return v


def pave_c(l, p, h, u, o, couleurs=GEN, sw=4):
    return pave(l, p, h, u, o, face=couleurs["face"], dessus=couleurs["dessus"], cote=couleurs["cote"],
                bord=couleurs["bord"], sw=sw)


def trou(pv, x0, y0, w, d, h):
    """Le trou creusé par le dessus du pavé pv (ouverture w × d au point (x0, y0), assez profond pour qu'on n'en
    voie pas le fond) : à travers l'ouverture, la paroi du fond et la paroi de gauche, en sombre."""
    A, B = pv.pt(x0, y0, h), pv.pt(x0 + w, y0, h)
    C, D = pv.pt(x0 + w, y0 + d, h), pv.pt(x0, y0 + d, h)
    E = P(D[0], A[1])
    fond = Polygon(D, C, B, E, fill_color=TROU_FOND, fill_opacity=1, stroke_width=0)
    gauche_ = Polygon(A, D, E, fill_color=TROU_COTE, fill_opacity=1, stroke_width=0)
    bord = Polygon(A, B, C, D, stroke_color=pv.face.get_stroke_color(), stroke_width=4, fill_opacity=0)
    g = VGroup(fond, gauche_, bord)
    g.A, g.B, g.C, g.D = A, B, C, D
    return g


class VolumeAssemblage5e(Paysage5e):
    nom_voix = "5e-volume-assemblage"
    fichier_marques = "5e_volume_assemblage_marques.json"
    ceinture = "bleue"
    XL = 0.3   # la colonne de droite commence plus à gauche (les figures s'arrêtent à x = −1,5)

    # ── outils propres à l'épisode (repris de 5e_volume_unite.py) ───────────
    def col(self, mob, y, xl=None):
        """col() de la base, mais qui DIT quand elle rétrécit une ligne (elle le fait en silence)."""
        w = mob.width
        r = super().col(mob, y, xl)
        if os.environ.get("BORDS") == "1" and r.width < w - 0.01:
            print(f"SERRE {getattr(self, '_cle_voix', '?')} {w:.2f} -> {r.width:.2f}", flush=True)
        return r

    def _auditer(self, avant, t0):
        """L'audit cherche « 2400 » dans une voix qui dit « 2 400 » : la voix relue avec ses milliers collés
        (« 2 400 » → « 2400 » + une espace après : même longueur, donc mêmes marques)."""
        v = getattr(self, "_texte_voix", "") or ""
        self._texte_voix = _SEP.sub(lambda m: m.group(1) + " ", v)
        try:
            super()._auditer(avant, t0)
        finally:
            self._texte_voix = v

    # ── les gâteaux ─────────────────────────────────────────────────────────
    def gateau_etage(self, u, o):
        """Le gâteau de l'écran 02 : un pavé 5 × 4 × 2 (40) et, collé dessus, un prisme (base 5, haut 3, long 4 : 30)."""
        b = pave_c(5, 4, 2, u, o)
        t = prisme_vu(5, 3, 2.5, 4, u, b.pt(0, 0, 2))
        g = VGroup(b, t)
        g.bas, g.haut = b, t
        return g

    def gateau_creuse(self, u, o):
        """Le gâteau de l'écran 03 : un pavé 5 × 4 × 4 (80), creusé au milieu d'un trou cubique 2 × 2 × 2 (8)."""
        b = pave_c(5, 4, 4, u, o)
        tr = trou(b, 1.5, 1, 2, 2, 4)
        g = VGroup(b, tr)
        g.bas, g.trou = b, tr
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le volume d'un assemblage", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le volume d'un assemblage")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment mesurer un solide", "fait de plusieurs morceaux ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        g = self.gateau_etage(0.34, P(2.6, -0.75))
        self.au_mot("Comment mesurer un solide")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(g.bas, scale=0.9), run_time=0.5)
        self.au_mot("fait de plusieurs morceaux")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(g.haut, shift=DOWN * 0.4), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Chloé, pâtissière ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ch = chloe5(1.0).move_to(P(-5.25, 0.1))
        self.au_mot("Voici Chloé")
        nom = self.t("Chloé", 40, BLEU_CALCUL).next_to(ch, UP, buff=0.25)
        self.play(FadeIn(ch, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("pâtissière")
        met = self.t("pâtissière", 30, BLEU_CALCUL).next_to(ch, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        g = self.gateau_etage(0.36, P(-2.9, -0.6))
        self.au_mot("des gâteaux à étages")
        l1 = self.t("des gâteaux à étages", 34, ROSE_T)
        self.col(l1, 2.3, 0.9)
        self.play(FadeIn(g.bas, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        self.play(FadeIn(g.haut, shift=DOWN * 0.4), run_time=0.4)
        self.au_mot("juste assez de pâte")
        l2 = self.bloc(["Préparer juste", "assez de pâte"], 34, GEN_T)
        self.col(l2, 1.0, 0.9)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("connaître le volume")
        l3 = self.bloc(["Connaître le volume", "de chaque gâteau"], 36, JAUNE_TITRE)
        self.col(l3, -0.55, 0.9)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("de chaque gâteau")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(g.bas, color=JAUNE_TITRE, scale_factor=1.04),
                  Indicate(g.haut, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.45)
        self.attendre_voix()

    # ── 02 : on colle, on additionne (40 + 30 = 70) ─────────────────────────
    def ecran_additionner(self):
        self.ecran("02-additionner")
        u, o = 0.55, P(-5.7, -1.7)
        g = self.gateau_etage(u, o)
        b, t = g.bas, g.haut
        l0 = self.t("Deux morceaux :", 36, JAUNE_TITRE)
        self.col(l0, 2.6)
        self.au_mot("deux morceaux")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("Un pavé :", GEN_T), ("40 cm³", BLEU_D)], 36, buff=0.2)
        self.col(l1, 1.75)
        self.au_mot("un pavé")
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        e40 = sur_fond(m2("40 cm³", 30, WHITE)).move_to(b.face)
        self.au_mot("40 centimètres cubes")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(e40, scale=1.2), run_time=0.35)
        l2 = self.t("Collé dessus :", 36, ROSE_T)
        self.col(l2, 0.95)
        self.au_mot("collé dessus")
        t.shift(UP * 0.9)
        self.play(FadeIn(t), FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("un prisme :", ROSE_T), ("30 cm³", BLEU_D)], 36, buff=0.2)
        self.col(l3, 0.25)
        self.au_mot("un prisme")
        self.play(t.animate.shift(DOWN * 0.9), FadeIn(l3[0], shift=UP * 0.1), run_time=0.45)
        A, B, C = t.avant.get_vertices()[:3]
        e30 = sur_fond(m2("30 cm³", 28, WHITE)).move_to(centre_de(A, B, C) + DOWN * 0.05)
        self.au_mot("30 centimètres cubes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(e30, scale=1.2), run_time=0.35)
        l4 = self.ligne([("Volume total :", JAUNE_TITRE), ("40 + 30", BLEU_D)], 38, buff=0.25)
        self.col(l4, -0.6)
        self.au_mot("Volume total")
        self.play(FadeIn(l4[0], shift=UP * 0.1), Indicate(b, color=JAUNE_TITRE, scale_factor=1.03),
                  Indicate(t, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.4)
        self.au_mot("40 plus 30")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("70 cm³", fs=48)
        self.col(res, -1.6)
        self.au_mot("70 centimètres cubes")
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : on creuse, on enlève (80 − 8 = 72) ─────────────────────────────
    def ecran_enlever(self):
        self.ecran("03-enlever")
        u, o = 0.5, P(-5.6, -2.2)
        g = self.gateau_creuse(u, o)
        b, tr = g.bas, g.trou
        l1 = self.ligne([("Un pavé :", GEN_T), ("80 cm³", BLEU_D)], 36, buff=0.2)
        self.col(l1, 2.6)
        self.au_mot("un pavé")
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        e80 = sur_fond(m2("80 cm³", 30, WHITE)).move_to(b.face)
        self.au_mot("80 centimètres cubes")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(e80, scale=1.2), run_time=0.35)
        l2 = self.t("Chloé creuse au milieu", 36, WHITE)
        self.col(l2, 1.8)
        self.au_mot("Chloé creuse au milieu")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        # le cube enlevé : sorti du trou, au-dessus du gâteau
        cube = pave_c(2, 2, 2, u, b.pt(1.5, 1, 4) + UP * 1.0)
        l3 = self.ligne([("un trou cubique", TROU_T), ("de 8 cm³", BLEU_D)], 34, buff=0.2)
        self.col(l3, 1.05)
        self.au_mot("un trou cubique")
        self.play(FadeIn(tr), FadeIn(cube, shift=UP * 0.8), FadeIn(l3[0], shift=UP * 0.1), run_time=0.6)
        e8 = sur_fond(m2("8 cm³", 28, WHITE)).next_to(cube, LEFT, buff=0.25)
        self.au_mot("8 centimètres cubes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(e8, scale=1.2), run_time=0.35)
        l4 = self.t("pour la crème.", 32, "#fde68a")
        self.col(l4, 0.4)
        self.au_mot("pour la crème")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        l5 = self.ligne([("Il reste :", JAUNE_TITRE), ("80 − 8", BLEU_D)], 38, buff=0.25)
        self.col(l5, -0.5)
        self.au_mot("Il reste")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("80 moins 8")
        self.play(FadeIn(l5[1], shift=UP * 0.1), FadeOut(VGroup(cube, e8), shift=UP * 0.5), run_time=0.5)
        res = self.gros("72 cm³", fs=48)
        self.col(res, -1.5)
        self.au_mot("72 centimètres cubes")
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        u, xl = 0.4, -2.6
        g1 = self.gateau_etage(u, P(-6.0, 0.35))
        g2 = self.gateau_creuse(u, P(-6.0, -2.6))
        self.add(g1, g2)
        self.au_mot("La méthode")
        l0 = self.t("La méthode :", 38, JAUNE_TITRE)
        self.col(l0, 2.75, xl)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.bloc(["On découpe le solide", "en morceaux simples."], 34)
        self.col(l1, 1.65, xl)
        self.au_mot("on découpe le solide")
        self.play(FadeIn(l1[0], shift=UP * 0.1), g1.haut.animate.shift(UP * 0.35), run_time=0.45)
        self.au_mot("en morceaux simples")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("On calcule le volume", BLEU_D), ("de chacun.", BLEU_D)], 34, buff=0.18)
        self.col(l2, 0.45, xl)
        self.au_mot("On calcule le volume")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        A, B, C = g1.haut.avant.get_vertices()[:3]
        e1 = sur_fond(m2("40", 28, WHITE)).move_to(g1.bas.face)
        e2 = sur_fond(m2("30", 26, WHITE)).move_to(centre_de(A, B, C))
        e3 = sur_fond(m2("80", 28, WHITE)).move_to(g2.bas.face)
        self.au_mot("de chacun")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(e1, scale=1.2), FadeIn(e2, scale=1.2), FadeIn(e3, scale=1.2),
                  run_time=0.45)
        l3 = self.bloc(["Puis on additionne…", "ou on enlève ce qui est creusé."], 36, VERT_OK)
        self.col(l3, -0.8, xl)
        self.au_mot("Puis on additionne")
        self.play(FadeIn(l3[0], shift=UP * 0.1), g1.haut.animate.shift(DOWN * 0.35), e2.animate.shift(DOWN * 0.35),
                  run_time=0.45)
        self.au_mot("ou on enlève")
        self.play(FadeIn(l3[1][:10], shift=UP * 0.1), run_time=0.3)
        self.au_mot("ce qui est creusé")
        self.play(FadeIn(l3[1][10:], shift=UP * 0.1), Indicate(g2.trou, color=TROU_T, scale_factor=1.2), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u, o = 0.5, P(-5.6, 0.75)
        pv = pave_c(5, 2, 2, u, o)
        cu = pave_c(2, 2, 2, u, pv.pt(5, 0, 0), MENTHE)
        e20 = sur_fond(m2("20 cm³", 26, WHITE)).move_to(pv.face)
        e8 = sur_fond(m2("8 cm³", 26, WHITE)).move_to(cu.face)

        def avant_q(sc):
            sc.play(FadeIn(pv), FadeIn(cu), FadeIn(e20), FadeIn(e8), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un cube de 8 cm³,", "un pavé de 20 cm³.", "Quel est son volume ?"],
                             [self.choix("160 cm³"), self.choix("28 cm³"), self.choix("12 cm³")], 1,
                             ["On colle :", "on additionne.", "8 + 20 = 28 cm³."],
                             -0.2, couper={2: ("8 + 20", "= 28 cm³.")},
                             mot_q="d'un cube de 8", avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        u = 0.42
        pv = pave_c(4, 3, 2, u, P(-6.1, 0.55))
        l1 = self.bloc(["On additionne des volumes,", "jamais des longueurs."], 36, VERT_OK)
        gauche(l1, -2.7, 1.25)
        self.au_mot("On additionne des volumes")
        self.play(FadeIn(pv, scale=0.9), FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        arete = Line(pv.pt(0, 0, 0), pv.pt(4, 0, 0), color=ROUGE_ERREUR, stroke_width=10)
        croix = Cross(Square(0.4), stroke_color=ROUGE_ERREUR, stroke_width=8).next_to(arete, DOWN, buff=0.15)
        self.au_mot("jamais des longueurs")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(arete), FadeIn(croix, scale=1.3), run_time=0.45)
        p1 = pave_c(2, 2, 2, u, P(-6.1, -2.0))
        p2 = pave_c(2, 2, 2, u, P(-4.8, -2.0), MENTHE)
        c1 = m2("cm³", 28, WHITE).next_to(p1, UP, buff=0.12)
        c2 = m2("cm³", 28, WHITE).next_to(p2, UP, buff=0.12)
        l2 = self.bloc(["Les volumes doivent être", "dans la même unité", "avant d'additionner."], 36, JAUNE_TITRE)
        gauche(l2, -2.7, -1.25)
        self.au_mot("Et les volumes")
        self.play(FadeIn(p1, scale=0.9), FadeIn(p2, scale=0.9), FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("dans la même unité")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(c1, scale=1.2), FadeIn(c2, scale=1.2), run_time=0.4)
        self.au_mot("avant d'additionner")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.35)
        self.insister(l2, 1.05, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u, o = 0.5, P(-5.7, 0.2)
        pv = pave_c(5, 3, 4, u, o)
        tr = trou(pv, 1.5, 0.6, 2, 1.8, 4)
        e60 = sur_fond(m2("60 cm³", 26, WHITE)).move_to(pv.face)
        e15 = sur_fond(m2("15 cm³", 26, TROU_T)).next_to(pv, RIGHT, buff=0.3).align_to(tr, UP)
        fl = Arrow(e15.get_left(), tr.C + LEFT * 0.15, buff=0.12, color=TROU_T, stroke_width=5,
                   max_tip_length_to_length_ratio=0.25)

        def avant_q(sc):
            sc.play(FadeIn(pv), FadeIn(tr), FadeIn(e60), FadeIn(e15), GrowArrow(fl), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un pavé de 60 cm³.", "On creuse 15 cm³.", "Quel volume reste-t-il ?"],
                             [self.choix("75 cm³"), self.choix("4 cm³"), self.choix("45 cm³")], 2,
                             ["On creuse :", "on enlève.", "60 − 15 = 45 cm³."],
                             -0.6, couper={2: ("60 − 15", "= 45 cm³.")},
                             mot_q="Un pavé", avant_q=avant_q)

    # ── 08 : le défi (le gâteau à deux étages) ──────────────────────────────
    def etages(self):
        """En bas : un pavé 20 × 20 × 6 ; en haut, centré : un pavé 10 × 10 × 6 (u par centimètre)."""
        u, o = 0.15, P(-5.45, -1.55)
        b = pave_c(20, 20, 6, u, o)
        h = pave_c(10, 10, 6, u, b.pt(5, 5, 6), CHOCO)
        return b, h, u

    def cote_fuyante(self, a, b, s, fs=26, couleur=WHITE, haut=0.35):
        """La mesure d'une arête fuyante (de a vers b, qui monte vers la droite), posée à GAUCHE de son milieu,
        un peu plus haut : jamais sur le dessus du pavé (l'étage du haut y est posé), hors audit."""
        t = Text(s, font_size=fs, color=couleur, weight=BOLD)
        hors_audit(t)
        return t.next_to((a + b) / 2 + UP * haut, LEFT, buff=0.05)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        b, h, u = self.etages()
        x = -0.6
        l0 = self.t("Un gâteau à deux étages :", 34, WHITE)
        self.col(l0, 2.3, x)
        self.au_mot("un gâteau à deux étages")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("En bas :", GEN_T), ("20 cm sur 20,", GEN_T)], 32, buff=0.2)
        self.col(l1, 1.6, x)
        l1b = self.ligne([("et 6 cm", GEN_T), ("de haut.", GEN_T)], 32, buff=0.2)
        self.col(l1b, 1.12, x + 0.4)
        c20 = cote(Line(b.pt(0, 0, 0), b.pt(20, 0, 0)), "20 cm", DOWN, fs=26, couleur=GEN_T, audit=False)
        c20b = self.cote_fuyante(b.pt(0, 0, 6), b.pt(0, 20, 6), "20 cm", 26, GEN_T)
        c6 = cote(Line(b.pt(0, 0, 0), b.pt(0, 0, 6)), "6 cm", LEFT, fs=26, couleur=GEN_T, audit=False, buff=0.12)
        self.au_mot("En bas")
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("un pavé de 20 centimètres sur 20")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c20), FadeIn(c20b), run_time=0.35)
        self.au_mot("et 6 centimètres")
        self.play(FadeIn(l1b[0], shift=UP * 0.1), FadeIn(c6), run_time=0.3)
        self.au_mot("de haut")
        self.play(FadeIn(l1b[1], shift=UP * 0.1), run_time=0.25)
        l2 = self.ligne([("En haut :", CHOCO_T), ("10 cm sur 10,", CHOCO_T)], 32, buff=0.2)
        self.col(l2, 0.42, x)
        l2b = self.ligne([("et 6 cm", CHOCO_T), ("de haut.", CHOCO_T)], 32, buff=0.2)
        self.col(l2b, -0.06, x + 0.4)
        c10 = cote(Line(h.pt(0, 10, 6), h.pt(10, 10, 6)), "10 cm", UP, fs=26, couleur=CHOCO_T, audit=False,
                   buff=0.1)
        c6h = cote(Line(h.pt(10, 10, 0), h.pt(10, 10, 6)), "6 cm", RIGHT, fs=24, couleur=CHOCO_T, audit=False,
                   buff=0.12, fond=True)
        self.au_mot("En haut")
        self.play(FadeIn(h, shift=DOWN * 0.3), FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("un pavé de 10 centimètres sur 10")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(c10), run_time=0.35)
        self.au_mot("et 6 centimètres", 2)
        self.play(FadeIn(l2b[0], shift=UP * 0.1), FadeIn(c6h), run_time=0.3)
        self.au_mot("de haut", 2)
        self.play(FadeIn(l2b[1], shift=UP * 0.1), run_time=0.25)
        l3 = self.t("Quel est le volume du gâteau ?", 32, JAUNE_TITRE)
        self.col(l3, -0.76, x)
        self.au_mot("Quel est le volume du gâteau")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        l4 = self.t("Combien de litres de pâte ?", 32, JAUNE_TITRE)
        self.col(l4, -1.24, x)
        self.au_mot("combien de litres de pâte")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        l5 = self.ligne([("1 litre,", BLEU_D), ("c'est 1 000 cm³.", BLEU_D)], 32, buff=0.18)
        l5.move_to(P(-3.7, -2.75))
        f5 = BackgroundRectangle(l5, color=BLACK, fill_opacity=0.72, buff=0.12)
        self.au_mot("1 litre")
        self.play(FadeIn(f5), FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est 1 000 centimètres")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b, h, u = self.etages()
        self.add(b, h)
        x = -0.6
        l1 = self.ligne([("En bas :", GEN_T), ("20 × 20", BLEU_D), ("× 6", BLEU_D)], 34, buff=0.2)
        self.col(l1, 2.2, x)
        self.au_mot("En bas")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(b, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.35)
        self.au_mot("20 fois 20")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 6")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l1b = self.ligne([("= 2 400 cm³", VERT_OK)], 34)
        self.col(l1b, 1.55, 0.9)
        e24 = sur_fond(m2("2 400", 26, WHITE)).move_to(b.face)
        self.au_mot("2 400 centimètres cubes")
        self.play(FadeIn(l1b, shift=UP * 0.1), FadeIn(e24), run_time=0.3)
        l2 = self.ligne([("En haut :", CHOCO_T), ("10 × 10", BLEU_D), ("× 6", BLEU_D), ("= 600", VERT_OK)], 34,
                        buff=0.2)
        self.col(l2, 0.8, x)
        self.au_mot("En haut")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(h, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.35)
        self.au_mot("10 fois 10")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 6", 2)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("6, 600")
        e6 = sur_fond(m2("600", 24, WHITE)).move_to(h.face)
        self.play(FadeIn(l2[3], shift=UP * 0.1), FadeIn(e6), run_time=0.3)
        l3 = self.ligne([("En tout :", JAUNE_TITRE), ("3 000 cm³", VERT_OK)], 36, buff=0.2)
        self.col(l3, 0.05, x)
        self.au_mot("En tout")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 000 centimètres cubes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("C'est 3 litres de pâte.", fs=40)
        self.col(res, -0.95, x)
        self.au_mot("C'est 3 litres de pâte")
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.insister(res, 1.06, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        g1 = self.gateau_etage(0.3, ORIGIN)
        g2 = self.gateau_creuse(0.3, ORIGIN)
        fig = VGroup(g1, g2).arrange(DOWN, buff=0.5)
        lignes = self.finale_gauche(fig, textes=[
            ("Un assemblage se découpe", "en solides simples."),
            ("On additionne", "leurs volumes."),
            ("Et si on a creusé, on enlève", "le volume du trou.")], fs=32)
        self.add(fig)
        self.au_mot("Un assemblage se découpe")
        self.montrer_ligne(lignes[0], Indicate(fig, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("On additionne")
        self.montrer_ligne(lignes[1], Indicate(g1, color=JAUNE_TITRE, scale_factor=1.05))
        self.au_mot("Et si on a creusé")
        self.montrer_ligne(lignes[2], Indicate(g2.trou, color=TROU_T, scale_factor=1.2))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_additionner()
        self.ecran_enlever()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
