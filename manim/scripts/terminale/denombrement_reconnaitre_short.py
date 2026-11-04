# denombrement_reconnaitre_short.py
# EleveAI — Maths Tle spé — short « Dénombrer : l'ADN, 4 lettres » (9:16),
# ceinture BLANCHE. Paysage jumelle : denombrement_reconnaitre.py (micro
# denombrement_reconnaitre).
#   · 00 : EN HAUT la double hélice qui se dessine ; EN BAS les 4 lettres
#          A, C, G, T ;
#   · 01 : Lina, biologiste moléculaire ; l'hélice lue par mots de 3 lettres
#          (crochets) ; EN BAS : A C G ≠ G C A (l'ordre compte, bleu), A A A
#          (on peut répéter, violet) ;
#   · 02 : question-pause (mots de 2 lettres : 16 → C), compte à rebours 3 s ;
#          la réponse : la grille 4 × 4 des 16 mots qui se remplit ; la
#          diagonale AA, CC, GG, TT barrée : 12 sans répétition ;
#   · 03 : la surprise : 4³ = 64 codons, les 64 cases qui jaillissent ; la
#          chaîne des 20 acides aminés ; 16 < 20 < 64 en barres ;
#   · 04 : « 3 lettres toutes différentes ? » (24, NON affiché) ; réponds en
#          commentaire ;
#   · 05 : « Entraîne-toi sur eleveai.fr ».
# Code couleur de la paysage : bleu = l'ordre compte, violet = la répétition,
# vert = résultat juste, rouge = piège. Les 4 bases : A rose, C cyan, G jaune,
# T violet clair.
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
#
# Voix : manim/voix/terminale-denombrement-reconnaitre-short.json (débit −6),
# calée par denombrement_reconnaitre_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/denombrement_reconnaitre_short.py DenombrementReconnaitreShort -o eleveai-maths-terminale-denombrement-reconnaitre-short --media_dir manim/scripts/terminale/media-denombrement-reconnaitre-short
# Sortie : manim/sorties/terminale/maths/probabilites/denombrement-reconnaitre/

import math
import os
import sys
from itertools import product
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P, puissance  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from denombrement_reconnaitre import PEAUX, personne  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

assert 4 * 4 == 16 and 4 * 3 == 12 and 4 ** 3 == 64 and 16 < 20 < 64
assert math.perm(4, 3) == 24  # la question en commentaire (non affichée)

LARGEUR_MAX = 4.0
FOND_CARTE = "#0b1220"
BASES = {"A": "#F472B6", "C": "#22D3EE", "G": "#FACC15", "T": "#C4B5FD"}
ORDRE, REPET = BLEU_CALCUL, VIOLET_ACCENT


def tuile(lettre, cote=0.5, fs=30):
    c = BASES[lettre]
    r = RoundedRectangle(width=cote, height=cote, corner_radius=0.07, fill_color=c, fill_opacity=0.25,
                         stroke_color=c, stroke_width=3)
    return VGroup(r, Text(lettre, font_size=fs, color=c, weight=BOLD).move_to(r))


def mot(lettres, cote=0.5, fs=30, buff=0.06):
    return VGroup(*[tuile(l, cote, fs) for l in lettres]).arrange(RIGHT, buff=buff)


def helice(x0=-1.9, x1=1.9, y=1.55, amp=0.42, tours=2.0, sequence="ACGTTGCAAGCTGATC"):
    """La double hélice : deux brins (sinusoïdes) et les barreaux colorés."""
    k = 2 * PI * tours / (x1 - x0)
    b1 = FunctionGraph(lambda x: y + amp * math.sin(k * (x - x0)), x_range=[x0, x1], color=GREY_B, stroke_width=4)
    b2 = FunctionGraph(lambda x: y - amp * math.sin(k * (x - x0)), x_range=[x0, x1], color=GREY_B, stroke_width=4)
    n = len(sequence)
    barreaux = VGroup()
    for i, l in enumerate(sequence):
        x = x0 + (i + 0.5) * (x1 - x0) / n
        h = amp * math.sin(k * (x - x0))
        barreaux.add(Line(P(x, y + h), P(x, y - h), color=BASES[l], stroke_width=5))
    return VGroup(barreaux, b1, b2)


class ShortBase(AuditSynchro, MotsCales, Short6e):
    """Les outils des deux shorts de mon lot (reconnaitre, produit-somme)."""
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, audit=True):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        if not audit:
            t._pas_audit = True
        return t

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def ip(self, extrait, n=1, depuis=0):
        i = depuis - 1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        return i

    def au_mot(self, extrait, n=1):
        self.au_pos(self.ip(extrait, n))

    def au_nb(self, contexte, nb, n=1):
        i = self.ip(contexte, n)
        j = self._texte_voix.find(nb, i)
        assert j >= 0, (contexte, nb)
        self.au_pos(j)

    def au_pos(self, i):
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > -0.02:
            self.wait(max(reste, 0) + 0.07)  # + 1 image : jamais une image d'avance

    def entete(self, titre):
        self.margo_bas()
        tit = self.t(titre, 34, JAUNE_TITRE).move_to(P(0, 3.5))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.95))
        self.add(tit, badge)
        return tit, badge

    def carte(self, lettre, corps, largeur=3.4, fs=26):
        rond = Circle(radius=0.17, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.22)
        cadre = RoundedRectangle(width=largeur, height=0.46, corner_radius=0.12, stroke_color=BLEU_CALCUL,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.18, LEFT)
        return VGroup(cadre, ligne)

    def question(self, y_tete, q_lignes, choix, bonne, cle):
        """L'écran « Question ! » du short : tête + rebours 3 s, la question,
        les 3 cartes (chacune à sa lettre, son nombre à son nombre)."""
        t0 = self.renderer.time
        tete = VGroup(pastille_pause(0.3), self.t("Question !", 32, ORANGE_RETENUE)).arrange(RIGHT, buff=0.18)
        rebours = CompteARebours(3, r=0.24, fs=26)
        VGroup(tete, rebours).arrange(RIGHT, buff=0.35).move_to(P(0, y_tete))
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.15), run_time=0.35)
        q = VGroup(*[self.t(x, 26) for x in q_lignes]).arrange(DOWN, buff=0.1).next_to(tete, DOWN, buff=0.22)
        q.set_x(0)
        cartes = VGroup(*[self.carte(l, c) for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.1)
        cartes.next_to(q, DOWN, buff=0.22).set_x(0)
        pause = self.t("Mets pause, et choisis !", 28, ORANGE_RETENUE).next_to(cartes, DOWN, buff=0.2).set_x(0)
        return t0, tete, rebours, q, cartes, pause

    def montrer_choix(self, cartes):
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.1), run_time=0.2)
            self.au_pos(i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.1), run_time=0.2)

    def pause_rebours(self, pause, rebours, cle, t0, bonne):
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.35)
        self.attendre_voix(marge=0.1)
        rebours.jouer(self)
        print(f"QUESTION {cle} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)

    def reponse(self, cartes, bonne, pause, rebours):
        b = cartes[bonne]
        self.play(b[0].animate.set_stroke(VERT_OK, width=6).set_fill("#052e16", 1), b[1][0][0].animate.set_fill(VERT_OK),
                  *[cartes[j].animate.set_opacity(0.3) for j in range(3) if j != bonne], FadeOut(pause),
                  FadeOut(rebours), run_time=0.25)
        ok = self.coche(VERT_OK, 0.16).move_to(b[0].get_right() + LEFT * 0.3)
        self.play(b.animate.scale(1.12), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.12), ok.animate.scale(1 / 1.12, about_point=b.get_center()), run_time=0.25)
        return ok

    def fin_short(self, voix, a_effacer):
        self.dire(voix)
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.4))
        site = self.t("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.45))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 42, VERT_OK).move_to(P(0, 0.0))
        poignee = self.t("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -0.85))
        self.play(FadeOut(VGroup(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)


class DenombrementReconnaitreShort(ShortBase):
    fichier_marques = "denombrement_reconnaitre_short_marques.json"
    nom_voix = "terminale-denombrement-reconnaitre-short"

    def cellule(self, a, b, cote=0.55, fs=22):
        r = RoundedRectangle(width=cote, height=cote * 0.8, corner_radius=0.06, fill_color=FOND_CARTE, fill_opacity=1,
                             stroke_color=GREY_D, stroke_width=2)
        lt = VGroup(Text(a, font_size=fs, color=BASES[a], weight=BOLD), Text(b, font_size=fs, color=BASES[b],
                                                                            weight=BOLD)).arrange(RIGHT, buff=0.03)
        return VGroup(r, lt.move_to(r))

    def construct(self):
        titre, badge = self.entete("Dénombrer : l'ADN")

        # ── 00 : la double hélice, les 4 lettres ──
        self.dire("00-accroche")
        hel = helice(y=1.55, amp=0.42)
        self.au_mot("Ton ADN")
        self.play(Create(hel[1]), Create(hel[2]), run_time=0.7)
        self.play(LaggedStart(*[Create(b) for b in hel[0]], lag_ratio=0.08), run_time=0.6)
        l4 = self.t("4 lettres", 34, WHITE).move_to(P(0, 0.4))
        self.au_mot("4 lettres")
        self.play(FadeIn(l4, scale=1.2), run_time=0.3)
        quatre = mot("ACGT", 0.75, 40, 0.2).move_to(P(0, -0.55))
        v = self._texte_voix
        dep = v.find("lettres :")
        for k, L in enumerate("ACGT"):
            dep = v.find(L, dep)
            self.au_pos(dep)
            self.play(FadeIn(quatre[k], scale=1.4), Indicate(VGroup(*[b for b, x in zip(hel[0], "ACGTTGCAAGCTGATC")
                                                                               if x == L]), scale_factor=1.1),
                      run_time=0.25)
        q = VGroup(self.t("Comment écrire", 32, BLEU_CALCUL), self.t("tout un être vivant ?", 32, BLEU_CALCUL))
        q.arrange(DOWN, buff=0.1).move_to(P(0, -1.9))
        self.au_mot("comment écrire")
        self.play(FadeIn(q, scale=1.15), run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 01 : Lina lit l'ADN par mots de 3 lettres ──
        self.dire("01-image")
        lina = personne(VERT_OK, PEAUX[2], "#3b2412", 0.5, longs=True).move_to(P(-1.55, 2.1))
        nom = self.t("Lina", 30, BLEU_CALCUL).move_to(P(0, 2.3)).align_to(P(-0.95, 0), LEFT)
        met = self.t("biologiste moléculaire", 22, largeur=2.95).move_to(P(0, 1.9)).align_to(P(-0.95, 0), LEFT)
        hel2 = helice(y=1.2, amp=0.3, sequence="ACGGCAAAATGCTTA")
        self.au_mot("Lina")
        self.play(FadeOut(q), FadeOut(quatre), FadeOut(l4), Transform(hel, hel2), FadeIn(lina, shift=UP * 0.15),
                  FadeIn(nom, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("biologiste")
        self.play(FadeIn(met, shift=RIGHT * 0.1), run_time=0.3)
        crochets = VGroup()
        for c in range(5):
            x0, x1 = -1.9 + c * 3.8 / 5 + 0.05, -1.9 + (c + 1) * 3.8 / 5 - 0.05
            crochets.add(VGroup(Line(P(x0, 0.78), P(x1, 0.78)), Line(P(x0, 0.78), P(x0, 0.86)),
                                Line(P(x1, 0.78), P(x1, 0.86))).set_stroke(ORDRE, 3))
        self.au_mot("mots de 3 lettres")
        self.play(LaggedStart(*[Create(c) for c in crochets], lag_ratio=0.2), run_time=0.6)
        codons = self.t("les codons", 30, ORDRE).move_to(P(0, 0.35))
        self.au_mot("les codons")
        self.play(FadeIn(codons, shift=UP * 0.1), run_time=0.3)
        acg, gca = mot("ACG", 0.48, 28, 0.04), mot("GCA", 0.48, 28, 0.04)
        dif = self.t("≠", 44, ROUGE_ERREUR)
        VGroup(acg, dif, gca).arrange(RIGHT, buff=0.2).move_to(P(0, -0.55))
        lo = self.t("l'ordre compte", 28, ORDRE).move_to(P(0, -1.2))
        self.au_mot("L'ordre compte")
        self.play(FadeIn(lo, shift=UP * 0.1), run_time=0.3)
        self.au_mot("A C G")
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in acg], lag_ratio=0.25), run_time=0.45)
        self.au_mot("G C A")
        self.play(FadeIn(dif, scale=1.4), LaggedStart(*[FadeIn(x, scale=1.3) for x in gca], lag_ratio=0.25),
                  run_time=0.45)
        aaa = mot("AAA", 0.55, 30).move_to(P(0, -2.05))
        lr = self.t("on peut répéter", 28, REPET).move_to(P(0, -2.7))
        self.au_mot("on peut répéter")
        self.play(FadeIn(lr, shift=UP * 0.1), run_time=0.3)
        self.au_mot("A A A")
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in aaa], lag_ratio=0.25), run_time=0.45)
        ok = self.coche(VERT_OK, 0.16).next_to(aaa, RIGHT, buff=0.25)
        self.au_mot("existe")
        self.play(Create(ok), run_time=0.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : question-pause : les mots de 2 lettres ──
        self.dire("02-question")
        bas = VGroup(codons, acg, dif, gca, lo, aaa, lr, ok)
        self.play(FadeOut(bas), run_time=0.3)
        t0, tete, rebours, q, cartes, pause = self.question(
            0.45, ["Mots de 2 lettres avec A, C, G, T ?"], ["8", "12", "16"], 2, "02-question")
        self.au_nb("mots de", "2")
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.35)
        self.montrer_choix(cartes)
        self.pause_rebours(pause, rebours, "02-question", t0, 2)

        # ── 02b : la grille des 16 mots ──
        self.dire("02b-reponse")
        okq = self.reponse(cartes, 2, pause, rebours)
        self.wait(0.3)
        cote, pas = 0.55, 0.62
        xs = [-0.55 + pas * j for j in range(4)]
        ys = [-0.75 - pas * 0.8 * i for i in range(4)]
        lignes = VGroup(*[tuile(L, 0.42, 24).move_to(P(-1.35, ys[i])) for i, L in enumerate("ACGT")])
        cols = VGroup(*[tuile(L, 0.42, 24).move_to(P(xs[j], -0.15)) for j, L in enumerate("ACGT")])
        cells = VGroup(*[self.cellule(a, b, cote).move_to(P(xs[j], ys[i]))
                         for i, a in enumerate("ACGT") for j, b in enumerate("ACGT")])
        calc = VGroup(self.t("4", 36, ORDRE), self.t("×", 36, ORDRE), self.t("4", 36, ORDRE),
                      self.t("=", 36, VERT_OK), self.t("16", 40, VERT_OK)).arrange(RIGHT, buff=0.15)
        calc.move_to(P(0, 0.45))
        self.au_mot("4 choix")
        self.play(FadeOut(VGroup(tete, q, cartes, okq)), run_time=0.25)
        self.play(FadeIn(calc[0], scale=1.3), LaggedStart(*[FadeIn(x, shift=RIGHT * 0.1) for x in lignes],
                                                          lag_ratio=0.15), run_time=0.45)
        self.au_nb("première lettre, ", "4")
        self.play(FadeIn(calc[1]), FadeIn(calc[2], scale=1.3),
                  LaggedStart(*[FadeIn(x, shift=DOWN * 0.1) for x in cols], lag_ratio=0.15), run_time=0.45)
        self.au_mot("4 fois 4")
        self.play(LaggedStart(*[FadeIn(c, scale=1.5) for c in cells], lag_ratio=0.06), run_time=0.9)
        self.au_nb("4 fois 4, ", "16")
        self.play(FadeIn(calc[3:], scale=1.3), run_time=0.3)
        self.insister(calc[4], 1.4)
        diag = VGroup(*[cells[5 * i] for i in range(4)])
        croix = VGroup(*[Cross(c, stroke_color=ROUGE_ERREUR, stroke_width=4) for c in diag])
        s12 = self.t("12 sans répétition", 26, ROUGE_ERREUR).move_to(P(0.25, -2.8))
        self.au_nb("16. ", "12")
        self.play(Create(croix), diag.animate.set_opacity(0.35), FadeIn(s12, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 03 : la surprise : 64 codons pour 20 acides aminés ──
        self.dire("03-surprise")
        self.au_mot("Et en 3")
        self.play(FadeOut(VGroup(lignes, cols, cells, croix, calc, s12)), run_time=0.3)
        p43 = puissance("4", "3", 46, ORDRE)
        res = VGroup(p43, self.t("=", 40, VERT_OK), self.t("64 codons", 40, VERT_OK)).arrange(RIGHT, buff=0.18)
        res.scale_to_fit_width(min(res.width, 3.7)).move_to(P(0, 0.3))
        self.au_mot("4 puissance")
        self.play(FadeIn(p43[0], scale=1.3), run_time=0.25)
        self.au_nb("puissance", "3")
        self.play(FadeIn(p43[1], scale=1.5), run_time=0.25)
        rng = np.random.default_rng(2)
        mini = VGroup()
        for i in range(64):
            trois = VGroup(*[Rectangle(width=0.075, height=0.2, fill_color=BASES["ACGT"[int(rng.integers(4))]],
                                       fill_opacity=1, stroke_width=0) for _ in range(3)]).arrange(RIGHT, buff=0.02)
            fond = RoundedRectangle(width=0.36, height=0.28, corner_radius=0.04, fill_color=FOND_CARTE,
                                    fill_opacity=1, stroke_color=GREY_D, stroke_width=1)
            mini.add(VGroup(fond, trois.move_to(fond)))
        mini.arrange_in_grid(8, 8, buff=(0.07, 0.04)).move_to(P(0, -1.35))
        self.au_mot("64 codons")
        self.play(FadeIn(res[1:], scale=1.3), LaggedStart(*[FadeIn(m, scale=2.0) for m in mini], lag_ratio=0.015),
                  run_time=1.2)
        self.insister(res, 1.12)
        # en haut : la chaîne des 20 acides aminés, puis 16 < 20 < 64
        perles = VGroup(*[Circle(radius=0.075, fill_color=[BLEU_CALCUL, VERT_OK, ORANGE_RETENUE, VIOLET_ACCENT,
                                                           "#F472B6"][k % 5], fill_opacity=1, stroke_width=0)
                          for k in range(20)])
        for k, b in enumerate(perles):
            b.move_to(P(-1.75 + k * 0.184, 2.2 + 0.1 * math.sin(k * 0.9)))
        fil = VMobject(stroke_color=GREY_B, stroke_width=2).set_points_smoothly([b.get_center() for b in perles])
        aa = self.t("20 acides aminés", 28, WHITE).move_to(P(0, 1.78))
        self.au_mot("Or la cellule")
        self.play(FadeOut(VGroup(hel, crochets, lina, nom, met)), run_time=0.35)
        self.au_mot("20 acides")
        self.play(Create(fil), LaggedStart(*[FadeIn(b, scale=1.5) for b in perles], lag_ratio=0.05),
                  FadeIn(aa), run_time=0.8)
        x0, u = -1.15, 3.0 / 64
        b16 = Rectangle(width=16 * u, height=0.26, fill_color=ROUGE_ERREUR, fill_opacity=0.85, stroke_width=0)
        b16.move_to(P(x0 + 8 * u, 1.3))
        b64 = Rectangle(width=64 * u, height=0.26, fill_color=VERT_OK, fill_opacity=0.85, stroke_width=0)
        b64.move_to(P(x0 + 32 * u, 0.88))
        n16 = self.t("16", 24, ROUGE_ERREUR).next_to(b16, LEFT, buff=0.12)
        n64 = self.t("64", 24, VERT_OK).next_to(b64, LEFT, buff=0.12)
        seuil = DashedLine(P(x0 + 20 * u, 1.5), P(x0 + 20 * u, 0.7), color=WHITE, stroke_width=2, dash_length=0.06)
        peu = self.t("trop peu", 22, ROUGE_ERREUR).next_to(b16, RIGHT, buff=0.4)
        self.au_mot("16 mots")
        self.play(FadeOut(res), GrowFromEdge(b16, LEFT), FadeIn(n16), Create(seuil), run_time=0.4)
        self.au_mot("trop peu")
        self.play(FadeIn(peu, shift=LEFT * 0.1), run_time=0.25)
        self.au_nb("trop peu. ", "64")
        assez = self.t("assez !", 22, BLACK).move_to(b64).align_to(b64, RIGHT).shift(LEFT * 0.1)
        self.play(GrowFromEdge(b64, LEFT), FadeIn(n64), run_time=0.45)
        self.au_mot("c'est assez")
        self.play(FadeIn(assez), run_time=0.25)
        vie = VGroup(self.t("La vie a choisi", 28, VERT_OK), self.t("les mots de 3 lettres !", 28, VERT_OK))
        vie.arrange(DOWN, buff=0.1).scale_to_fit_width(3.3).move_to(P(0, -1.35))
        fond = SurroundingRectangle(vie, color=VERT_OK, buff=0.18, stroke_width=3).set_fill(BLACK, 0.92)
        self.au_mot("La vie a choisi")
        self.play(mini.animate.set_opacity(0.35), FadeIn(fond), FadeIn(vie[0], scale=1.2), run_time=0.4)
        self.au_nb("les mots de", "3")
        self.play(FadeIn(vie[1], scale=1.2), run_time=0.3)
        self.insister(VGroup(fond, vie), 1.06)
        self.attendre_voix(marge=0.2)

        # ── 04 : à toi : 3 lettres toutes différentes ──
        self.dire("04-commentaire")
        self.au_mot("À toi")
        toi = self.t("À toi !", 40, JAUNE_TITRE).move_to(P(0, 2.1))
        self.play(FadeOut(VGroup(perles, fil, aa, b16, b64, n16, n64, seuil, peu, assez, mini, fond, vie)),
                  FadeIn(toi, scale=1.2), run_time=0.45)
        boites = VGroup(*[RoundedRectangle(width=0.7, height=0.7, corner_radius=0.1, stroke_color=ORDRE,
                                           stroke_width=4) for _ in range(3)]).arrange(RIGHT, buff=0.18)
        boites.move_to(P(0, 1.05))
        inter = VGroup(*[self.t("?", 36, ORANGE_RETENUE).move_to(b) for b in boites])
        l3 = self.t("mots de 3 lettres", 30).move_to(P(0, 0.25))
        self.au_nb("mots de", "3")
        self.play(FadeIn(boites, scale=1.2), FadeIn(inter), FadeIn(l3, shift=UP * 0.1), run_time=0.45)
        quatre = mot("ACGT", 0.55, 30, 0.15).move_to(P(0, -0.5))
        self.au_mot("avec A")
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in quatre], lag_ratio=0.15), run_time=0.5)
        dif = VGroup(self.t("les 3 lettres", 28, ORANGE_RETENUE),
                     self.t("toutes différentes ?", 28, ORANGE_RETENUE, largeur=3.7))
        dif.arrange(DOWN, buff=0.1).move_to(P(0, -1.45))
        self.au_nb("si les", "3")
        self.play(FadeIn(dif, scale=1.15), run_time=0.4)
        self.insister(dif, 1.08)
        appel = self.t("Réponds en commentaire !", 30, VERT_OK, largeur=3.7).move_to(P(0, -2.5))
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne", [titre, badge, toi, boites, inter, l3, quatre, dif, appel])
