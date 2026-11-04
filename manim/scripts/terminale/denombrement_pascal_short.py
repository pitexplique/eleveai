# denombrement_pascal_short.py
# EleveAI — Maths Tle spé — short « Le triangle de Pascal » (9:16), ceinture
# BLANCHE. Paysage jumelle : denombrement_pascal.py (micro denombrement_pascal).
#   · 00 : un triangle de nombres cache un dessin secret ;
#   · 01 : EN HAUT le triangle des nombres qui se construit par additions
#          (flèches des deux voisins), EN BAS les mêmes cases qui se posent ;
#   · 02 : question-pause « quelle ligne après 1, 4, 6, 4, 1 ? » (A), 3 s ;
#   · 03 : on colorie les impairs (en haut ET en bas), le bas file jusqu'à
#          32 lignes : le triangle de Sierpinski ; Rosa, designer textile, et
#          son foulard ;
#   · 04 : somme de la ligne 1, 5, 10, 10, 5, 1 ? (32, NON affichée) ;
#   · 05 : « Entraîne-toi sur eleveai.fr ».
# Code couleur du lot : orange = sans ordre / combinaison (ici : impair),
# jaune = les flèches d'addition, vert = résultat juste.
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
#
# Voix : manim/voix/terminale-denombrement-pascal-short.json (débit −6),
# calée par denombrement_pascal_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/denombrement_pascal_short.py DenombrementPascalShort -o eleveai-maths-terminale-denombrement-pascal-short --media_dir manim/scripts/terminale/media-denombrement-pascal-short
# Sortie : manim/sorties/terminale/maths/probabilites/denombrement-pascal/

import math
import os
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from denombrement_pascal import personne  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

C = math.comb
assert [C(5, k) for k in range(6)] == [1, 5, 10, 10, 5, 1] and sum(C(5, k) for k in range(6)) == 32
assert 1 + 4 == 5 and 4 + 6 == 10

LARGEUR_MAX = 4.0
FOND_CARTE = "#0b1220"
IMPAIR = ORANGE_RETENUE
FLECHE = JAUNE_TITRE


class OutilsShort(AuditSynchro, MotsCales, Short6e):
    """Les outils des shorts du lot (denombrement_defi_short.py s'en sert)."""

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

    def trouver(self, extrait, n=1, depuis=0):
        i = depuis - 1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix {self._cle_voix}")
        return i

    def au_mot(self, extrait, n=1):
        self.au_pos(self.trouver(extrait, n))

    def au_nb(self, contexte, nb, n=1):
        i = self.trouver(contexte, n)
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
            self.wait(max(reste, 0) + 0.07)

    def reveler(self, morceaux, depuis, run_time=0.12, avec=None):
        """Chaque Text apparaît quand la voix dit son nombre (avec[k] en même temps)."""
        i = depuis
        for k, m in enumerate(morceaux):
            nb = m.original_text.strip(" ,.:")
            j = self._texte_voix.find(nb, i)
            assert j >= 0, (nb, self._cle_voix)
            self.au_pos(j)
            extra = [FadeIn(avec[k], scale=1.4)] if avec else []
            self.play(FadeIn(m, shift=UP * 0.06), *extra, run_time=run_time)
            i = j + len(nb)
        return i

    def morceaux(self, texte, fs=26, color=WHITE):
        return VGroup(*[Text(m, font_size=fs, color=color) for m in texte.split()]).arrange(RIGHT, buff=0.1)

    def carte(self, lettre, corps, largeur=3.7, fs=24):
        rond = Circle(radius=0.17, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        l._pas_audit = True
        c = corps if isinstance(corps, Mobject) else self.morceaux(corps, fs)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.2)
        if ligne.width > largeur - 0.3:
            ligne.scale_to_fit_width(largeur - 0.3)
        cadre = RoundedRectangle(width=largeur, height=0.48, corner_radius=0.12, stroke_color=BLEU_CALCUL,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.15, LEFT)
        return VGroup(cadre, ligne)

    def montrer_cartes(self, cartes):
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            assert i >= 0
            self.au_pos(i)
            corps = c[1][1]
            if getattr(corps, "_bloc", False):
                self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.1), run_time=0.2)
                chiffres = [m for m in corps.get_family() if isinstance(m, Text)
                            and any(ch.isdigit() for ch in m.original_text)]
                self.au_pos(max(voix.find(m.original_text.strip(" ,."), i + 3) for m in chiffres))
                self.play(FadeIn(corps, scale=1.2), run_time=0.2)
                continue
            mots = [m for m in corps if not any(ch.isdigit() for ch in m.original_text)]
            chiffres = [m for m in corps if m not in mots]
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.1), *[FadeIn(m) for m in mots], run_time=0.2)
            self.reveler(chiffres, i + 3, run_time=0.1)

    def bonne_reponse(self, cartes, bonne, pause, rebours):
        b = cartes[bonne]
        self.play(b[0].animate.set_stroke(VERT_OK, width=6).set_fill("#052e16", 1),
                  b[1][0][0].animate.set_fill(VERT_OK),
                  *[cartes[j].animate.set_opacity(0.3) for j in range(3) if j != bonne],
                  FadeOut(pause), FadeOut(rebours), run_time=0.25)
        ok = self.coche(VERT_OK, 0.16).move_to(b[0].get_right() + LEFT * 0.28)
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

    def entete(self, titre):
        self.margo_bas()
        tt = self.t(titre, 34, JAUNE_TITRE).move_to(P(0, 3.5))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.95))
        self.add(tt, badge)
        return tt, badge


def pos_haut(n, k, dx=0.56, dy=0.4, y0=2.4):
    return P((k - n / 2) * dx, y0 - n * dy)


def pos_bas(n, k, dx=0.5, dy=0.44, y0=-0.5):
    return P((k - n / 2) * dx, y0 - n * dy)


def foulard(motif, cote=1.5):
    """Un foulard (carré posé sur la pointe, un nœud) avec le motif imprimé."""
    tissu = Square(cote, fill_color="#FFF7ED", fill_opacity=1, stroke_color="#FDBA74", stroke_width=3).rotate(PI / 4)
    m = motif.copy().scale_to_fit_width(cote * 0.95).move_to(tissu.get_center() + DOWN * 0.08)
    noeud = VGroup(Circle(radius=0.09, fill_color="#FDBA74", fill_opacity=1, stroke_width=0),
                   Line(P(0, 0), P(-0.25, -0.35), color="#FDBA74", stroke_width=5),
                   Line(P(0, 0), P(0.25, -0.35), color="#FDBA74", stroke_width=5)).move_to(tissu.get_top() + DOWN * 0.1)
    return VGroup(tissu, m, noeud)


class DenombrementPascalShort(OutilsShort):
    fichier_marques = "denombrement_pascal_short_marques.json"
    nom_voix = "terminale-denombrement-pascal-short"

    def cellule(self, n, k, impair_colore=False, r=0.19):
        v = C(n, k)
        c = IMPAIR if (impair_colore and v % 2) else "#334155"
        return Circle(radius=r, fill_color=c, fill_opacity=1, stroke_color=GREY_B, stroke_width=1.5).move_to(pos_bas(n, k))

    def construct(self):
        titre, badge = self.entete("Le triangle de Pascal")

        # ── 00 : un dessin secret ──
        self.dire("00-accroche")
        contour_h = Polygon(pos_haut(0, 0) + UP * 0.35, pos_haut(5, 0) + P(-0.45, -0.25), pos_haut(5, 5) + P(0.45, -0.25),
                            stroke_color=GREY_C, stroke_width=2).set_fill(opacity=0)
        self.au_mot("triangle de nombres")
        self.play(Create(contour_h), run_time=0.6)
        contour_b = Polygon(pos_bas(0, 0) + UP * 0.35, pos_bas(5, 0) + P(-0.4, -0.3), pos_bas(5, 5) + P(0.4, -0.3),
                            stroke_color=GREY_C, stroke_width=2).set_fill(opacity=0)
        secret = self.t("?", 90, IMPAIR).move_to(contour_b.get_center() + DOWN * 0.2)
        self.au_mot("dessin secret")
        self.play(Create(contour_b), FadeIn(secret, scale=2), run_time=0.5)
        self.au_mot("Tu le vois")
        vois = self.t("Tu le vois ?", 30, JAUNE_TITRE).move_to(P(0, -0.05))
        self.play(FadeIn(vois, shift=UP * 0.1), Indicate(secret, color=IMPAIR, scale_factor=1.3), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : le triangle se construit (en haut) ; les cases (en bas) ──
        self.dire("01-image")
        nums = {(n, k): Text(str(C(n, k)), font_size=26).move_to(pos_haut(n, k)) for n in range(6) for k in range(n + 1)}
        cells = {(n, k): self.cellule(n, k) for n in range(5) for k in range(n + 1)}
        bords = [(n, k) for n in range(5) for k in (0, n)]
        bords = list(dict.fromkeys(bords))
        self.au_nb("Des", "1")
        self.play(FadeOut(secret), FadeOut(vois), FadeOut(contour_h), FadeOut(contour_b),
                  LaggedStart(*[AnimationGroup(FadeIn(nums[c], scale=1.4), FadeIn(cells[c], scale=1.4)) for c in bords],
                              lag_ratio=0.1), run_time=0.9)
        self.au_mot("Chaque nombre")
        reg = self.t("somme des deux du dessus", 26, FLECHE).move_to(P(0, -0.05))
        self.play(FadeIn(reg, shift=UP * 0.1), run_time=0.35)
        i = self.trouver("dessus.")
        prec = None
        for n in (2, 3, 4):
            for k in range(n + 1):
                nb = str(C(n, k))
                j = self._texte_voix.find(nb, i)
                self.au_pos(j)
                i = j + len(nb)
                if k in (0, n):
                    continue
                fl = VGroup(*[Arrow(nums[(n - 1, kk)].get_center(), nums[(n, k)].get_center(), buff=0.13,
                                    color=FLECHE, stroke_width=3, max_tip_length_to_length_ratio=0.35)
                              for kk in (k - 1, k)])
                vieux = [FadeOut(prec)] if prec is not None else []
                self.play(GrowArrow(fl[0]), GrowArrow(fl[1]), FadeIn(nums[(n, k)], scale=1.5),
                          FadeIn(cells[(n, k)], scale=1.5), *vieux, run_time=0.15)
                prec = fl
        self.play(FadeOut(prec), run_time=0.2)
        self.attendre_voix(marge=0.2)

        # ── 02 : question-pause : la ligne d'après ──
        self.dire("02-question")
        t0 = self.renderer.time
        self.au_mot("Question")
        tete = VGroup(pastille_pause(0.3), self.t("Question !", 32, ORANGE_RETENUE)).arrange(RIGHT, buff=0.18)
        rebours = CompteARebours(3, r=0.24, fs=26)
        VGroup(tete, rebours).arrange(RIGHT, buff=0.35).move_to(P(0, -0.32))
        self.play(FadeOut(VGroup(*cells.values())), FadeOut(reg), FadeIn(tete, shift=DOWN * 0.15), run_time=0.4)
        q1 = self.t("Quelle ligne vient après", 26).move_to(P(0, -0.72))
        q2 = self.morceaux("1, 4, 6, 4, 1 ?", 26).move_to(P(0, -1.06))
        self.au_mot("Quelle ligne")
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.3)
        self.reveler(list(q2)[:5], self.trouver("après"), avec=None)
        self.play(FadeIn(q2[5]), *[Indicate(nums[(4, k)], color=JAUNE_TITRE) for k in range(5)], run_time=0.4)
        choix = ["1, 5, 10, 10, 5, 1", "1, 5, 11, 11, 5, 1", "1, 4, 10, 10, 4, 1"]
        cartes = VGroup(*[self.carte(l, c) for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.08).move_to(P(0, -2.17))
        self.montrer_cartes(cartes)
        pause = self.t("Mets pause, et choisis !", 26, ORANGE_RETENUE).move_to(P(0, 0.12))
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.35)
        self.attendre_voix(marge=0.1)
        rebours.jouer(self)
        print(f"QUESTION 02-question t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse=0", flush=True)

        # ── 02b : la réponse : la ligne 5 se construit en haut ──
        self.dire("02b-reponse")
        ok = self.bonne_reponse(cartes, 0, pause, rebours)
        for k in range(6):
            nums[(5, k)].set_color(VERT_OK)
        for (a, b, k, txt, nb) in [(0, 1, 1, "1 plus 4", "5"), (1, 2, 2, "4 plus 6", "10")]:
            self.au_mot(txt)
            fl = VGroup(*[Arrow(nums[(4, kk)].get_center(), nums[(5, k)].get_center(), buff=0.13, color=FLECHE,
                                stroke_width=3, max_tip_length_to_length_ratio=0.35) for kk in (a, b)])
            self.play(GrowArrow(fl[0]), GrowArrow(fl[1]), run_time=0.25)
            self.au_nb(txt, nb)
            extra = [FadeIn(nums[(5, 0)], scale=1.4)] if k == 1 else []
            self.play(FadeIn(nums[(5, k)], scale=1.6), FadeOut(fl), *extra, run_time=0.3)
        self.au_mot("symétrique")
        axe = DashedLine(P(0, 2.7), P(0, 0.15), color=GREY_B, stroke_width=2, dash_length=0.08)
        self.play(Create(axe), *[FadeIn(nums[(5, k)], shift=LEFT * 0.4) for k in (3, 4, 5)], run_time=0.5)
        self.play(FadeOut(axe), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 03 : on colorie les impairs, 32 lignes : Sierpinski ; Rosa ──
        self.dire("03-surprise")
        self.au_mot("colorie")
        self.play(FadeOut(VGroup(tete, q1, q2, cartes, ok)), run_time=0.3)
        impairs = [nums[c] for c in nums if C(*c) % 2]
        ronds = VGroup(*[Circle(radius=0.17, fill_color=IMPAIR, fill_opacity=0.85, stroke_width=0).move_to(m)
                         for m in impairs])
        self.add(ronds)
        self.bring_to_front(*nums.values())
        self.play(FadeIn(ronds, scale=1.4), run_time=0.5)
        # le bas : 32 lignes, une case par impair
        c = 0.088
        y0 = -0.38

        def cel(n, k):
            return Square(c * 0.92, fill_color=IMPAIR, fill_opacity=1, stroke_width=0).move_to(
                P((k - n / 2) * c, y0 - c / 2 - n * c * 0.87))

        rangs = [VGroup(*[cel(n, k) for k in range(n + 1) if C(n, k) % 2]) for n in range(32)]
        motif = VGroup(*rangs)
        self.au_mot("32 lignes")
        compte = self.t("32 lignes", 24, GREY_A).move_to(P(-1.25, -0.6))
        self.play(FadeIn(compte), LaggedStart(*[FadeIn(r) for r in rangs], lag_ratio=0.35), run_time=2.0)
        self.au_mot("Surprise")
        def yr(n):
            return y0 - c / 2 - n * c * 0.87

        def trou(n0, h, xc):
            return Polygon(P(xc - (h - 1) * c / 2 - 0.03, yr(n0) + 0.05), P(xc + (h - 1) * c / 2 + 0.03, yr(n0) + 0.05),
                           P(xc, yr(n0 + h - 1) - 0.05), stroke_color=JAUNE_TITRE, stroke_width=3).set_fill(opacity=0)

        grand = trou(16, 16, 0)
        self.au_mot("troué de triangles")
        self.play(Create(grand), run_time=0.5)
        self.au_mot("eux-mêmes")
        petits = VGroup(trou(8, 8, 0), trou(24, 8, -8 * c), trou(24, 8, 8 * c))
        self.play(LaggedStart(*[Create(p) for p in petits], lag_ratio=0.2), run_time=0.6)
        trou2, trou3, trou = petits, VGroup(), grand
        self.au_mot("Sierpinski")
        nom = self.t("le triangle de Sierpinski !", 28, VERT_OK, largeur=3.6).move_to(P(0, -0.05))
        self.play(FadeIn(nom, scale=1.2), FadeOut(VGroup(trou, trou2, trou3)), FadeOut(compte), run_time=0.5)
        self.insister(nom, 1.1)
        self.au_mot("Voici Rosa")
        haut = VGroup(*nums.values(), ronds)
        rosa = personne(peau="#e0ac69", habit="#F472B6", cheveux="#4a2c17", s=0.6, longs=True).move_to(P(-1.35, 1.75))
        n1 = self.t("Rosa", 30, "#F472B6").move_to(P(-1.35, 0.85))
        self.play(FadeOut(haut), FadeIn(rosa, shift=UP * 0.15), FadeIn(n1), run_time=0.5)
        self.au_mot("designer textile")
        n2 = self.t("designer textile", 24, largeur=1.9).move_to(P(-1.1, 0.45))
        self.play(FadeIn(n2, shift=UP * 0.08), run_time=0.35)
        self.au_mot("ce motif")
        fo = foulard(motif, 1.45).move_to(P(1.0, 1.6))
        self.play(FadeIn(fo[0]), FadeIn(fo[2]), TransformFromCopy(motif, fo[1]), run_time=1.0)
        self.au_mot("foulards")
        self.play(Rotate(fo, 0.12, rate_func=there_and_back), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 04 : à toi : la somme de la ligne 5 (32, non affichée) ──
        self.dire("04-commentaire")
        self.au_mot("À toi")
        toi = self.t("À toi !", 34, JAUNE_TITRE).move_to(P(0, -0.05))
        self.play(FadeOut(nom), FadeIn(toi, scale=1.2), motif.animate.set_opacity(0.25), run_time=0.4)
        self.au_mot("la somme")
        s1 = self.t("Somme de la ligne", 26).move_to(P(0, -0.7))
        self.play(FadeIn(s1, shift=UP * 0.1), run_time=0.3)
        lg = self.morceaux("1 + 5 + 10 + 10 + 5 + 1 = ?", 28, ORANGE_RETENUE)
        lg.scale_to_fit_width(min(lg.width, 3.8)).move_to(P(0, -1.25))
        chiffres = [m for m in lg if any(ch.isdigit() for ch in m.original_text)]
        signes = [m for m in lg if m not in chiffres]
        i = self.trouver("ligne 1") + len("ligne ")
        for m in chiffres:
            nb = m.original_text
            j = self._texte_voix.find(nb, i)
            self.au_pos(j)
            k = list(lg).index(m)
            extra = [FadeIn(lg[k - 1])] if k > 0 else []
            self.play(FadeIn(m, shift=UP * 0.06), *extra, run_time=0.1)
            i = j + len(nb)
        self.play(FadeIn(lg[-2]), FadeIn(lg[-1], scale=1.5), run_time=0.3)
        self.au_mot("Réponds en commentaire")
        appel = self.t("Réponds en commentaire !", 30, VERT_OK, largeur=3.9).move_to(P(0, -1.95))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.06)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne", [titre, badge, rosa, n1, n2, fo, motif, toi, s1, lg, appel])
