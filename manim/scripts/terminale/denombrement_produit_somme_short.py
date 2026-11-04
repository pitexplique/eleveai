# denombrement_produit_somme_short.py
# EleveAI — Maths Tle spé — short « Dénombrer : 60 tenues » (9:16), ceinture
# BLANCHE. Paysage jumelle : denombrement_produit_somme.py (micro
# denombrement_produit_somme).
#   · 00 : EN HAUT la penderie : 5 t-shirts, 3 pantalons, 4 paires de baskets ;
#          « 2 mois ? » ;
#   · 01 : Yanis, styliste ; EN BAS l'arbre des tenues pousse (5, puis 15,
#          puis 60 chemins) ; EN HAUT le mannequin porte la tenue du chemin
#          allumé, EN MÊME TEMPS ; 5 × 3 × 4 = 60 ; le calendrier de 2 mois se
#          remplit, une tenue par jour ;
#   · 02 : question-pause (2 casquettes ou aucune : 60 × 3 = 180 → B),
#          compte à rebours 3 s ; la réponse : 3 choix, les 180 jours (presque
#          6 mois) qui s'allument ;
#   · 03 : 7 t-shirts, 3 shorts, 2 paires de sandales (42, NON affiché) ;
#          réponds en commentaire ;
#   · 04 : « Entraîne-toi sur eleveai.fr ».
# Code couleur de la paysage : bleu = « et », on multiplie ; vert = résultat.
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
#
# Voix : manim/voix/terminale-denombrement-produit-somme-short.json (débit −6),
# calée par denombrement_produit_somme_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/denombrement_produit_somme_short.py DenombrementProduitSommeShort -o eleveai-maths-terminale-denombrement-produit-somme-short --media_dir manim/scripts/terminale/media-denombrement-produit-somme-short
# Sortie : manim/sorties/terminale/maths/probabilites/denombrement-produit-somme/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from denombrement_reconnaitre import PEAUX, personne  # noqa: E402
from denombrement_reconnaitre_short import FOND_CARTE, ShortBase  # noqa: E402
from proba_bin_defi import P  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402

assert 5 * 3 == 15 and 5 * 3 * 4 == 60 and 60 * 3 == 180
assert 7 * 3 * 2 == 42  # la question en commentaire (non affichée)

ET = BLEU_CALCUL
HAUTS = ["#38BDF8", "#4ADE80", "#FB923C", "#A78BFA", "#F472B6"]
BAS = ["#60A5FA", "#A8A29E", "#E7E5E4"]
PIEDS = ["#F8FAFC", "#64748B", "#FACC15", "#22D3EE"]


def tshirt(c, s=1.0):
    pts = [(-0.5, 0.35), (-0.2, 0.45), (0.2, 0.45), (0.5, 0.35), (0.62, 0.1), (0.38, 0.0), (0.33, -0.45),
           (-0.33, -0.45), (-0.38, 0.0), (-0.62, 0.1)]
    return Polygon(*[P(x, y) for x, y in pts], fill_color=c, fill_opacity=1, stroke_width=0).scale(s)


def pantalon(c, s=1.0):
    pts = [(-0.32, 0.45), (0.32, 0.45), (0.36, -0.5), (0.08, -0.5), (0.0, 0.05), (-0.08, -0.5), (-0.36, -0.5)]
    return Polygon(*[P(x, y) for x, y in pts], fill_color=c, fill_opacity=1, stroke_width=0).scale(s)


def basket(c, s=1.0):
    corps = Polygon(P(-0.3, 0.1), P(0.05, 0.1), P(0.3, -0.02), P(0.32, -0.12), P(-0.3, -0.12), fill_color=c,
                    fill_opacity=1, stroke_color=GREY_B, stroke_width=1.5)
    semelle = Rectangle(width=0.64, height=0.05, fill_color=GREY_D, fill_opacity=1, stroke_width=0)
    semelle.move_to(P(0.01, -0.145))
    return VGroup(corps, semelle).scale(s)


def casquette(c, s=1.0):
    dome = Sector(radius=0.28, angle=PI, fill_color=c, fill_opacity=1, stroke_width=0)
    visiere = Rectangle(width=0.32, height=0.06, fill_color=c, fill_opacity=1, stroke_width=0)
    visiere.next_to(dome, RIGHT, buff=-0.05).align_to(dome, DOWN)
    return VGroup(dome, visiere).scale(s)


def mannequin(h, b, p, s=1.0):
    """Le modèle de Yanis : tête, t-shirt (h), pantalon (b), baskets (p)."""
    tete = Circle(radius=0.2, fill_color=PEAUX[0], fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    haut = tshirt(h, 0.9).move_to(P(0, 0.48))
    bas = pantalon(b, 0.95).move_to(P(0, -0.32))
    pieds = VGroup(basket(p, 0.55).move_to(P(-0.17, -0.86)).flip(), basket(p, 0.55).move_to(P(0.17, -0.86)))
    return VGroup(bas, haut, tete, pieds).scale(s)


class DenombrementProduitSommeShort(ShortBase):
    fichier_marques = "denombrement_produit_somme_short_marques.json"
    nom_voix = "terminale-denombrement-produit-somme-short"

    def habiller(self, mq, h, b, p):
        """Le mannequin change de tenue (une animation)."""
        return [mq[1].animate.set_fill(HAUTS[h]), mq[0].animate.set_fill(BAS[b]),
                *[x[0].animate.set_fill(PIEDS[p]) for x in mq[3]]]

    def calendrier(self, mois, cote=0.1, gap=0.02, par_ligne=3):
        blocs = VGroup()
        for _ in range(mois):
            cases = VGroup(*[Square(cote, fill_color=GREY_D, fill_opacity=0.5, stroke_width=0) for _ in range(30)])
            cases.arrange_in_grid(5, 6, buff=gap)
            cadre = SurroundingRectangle(cases, color=GREY_B, buff=0.05, stroke_width=1.5)
            blocs.add(VGroup(cadre, cases))
        blocs.arrange_in_grid((mois + par_ligne - 1) // par_ligne, min(mois, par_ligne), buff=0.15)
        return blocs

    def construct(self):
        titre, badge = self.entete("Dénombrer : les tenues")

        # ── 00 : la penderie ──
        self.dire("00-accroche")
        rangs = [VGroup(*[tshirt(c, 0.42) for c in HAUTS]).arrange(RIGHT, buff=0.08),
                 VGroup(*[pantalon(c, 0.42) for c in BAS]).arrange(RIGHT, buff=0.18),
                 VGroup(*[basket(c, 0.6) for c in PIEDS]).arrange(RIGHT, buff=0.12)]
        nombres = ["5 t-shirts", "3 pantalons", "4 paires"]
        etiq = []
        for k, (r, y) in enumerate(zip(rangs, (2.3, 1.6, 0.95))):
            r.move_to(P(0.5, y))
            lab = self.t(nombres[k].split()[0], 30, WHITE).move_to(P(-1.75, y))
            etiq.append(lab)
            self.au_mot(nombres[k])
            self.play(FadeIn(lab, scale=1.3), LaggedStart(*[FadeIn(x, shift=DOWN * 0.1) for x in r], lag_ratio=0.1),
                      run_time=0.45)
        q = VGroup(self.t("Une tenue différente", 30, BLEU_CALCUL), self.t("chaque jour", 30, BLEU_CALCUL))
        q.arrange(DOWN, buff=0.08).move_to(P(0, -0.3))
        self.au_mot("t'habiller différemment")
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        cal = self.calendrier(2, 0.17, 0.035, 2).move_to(P(0, -1.75))
        deux = self.t("pendant 2 mois ?", 32, ORANGE_RETENUE).move_to(P(0, -2.75))
        self.au_nb("pendant", "2")
        self.play(FadeIn(cal, scale=1.1), FadeIn(deux, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 01 : Yanis, l'arbre des tenues et le mannequin, synchrones ──
        self.dire("01-image")
        mq = mannequin(HAUTS[0], BAS[0], PIEDS[0], 0.85).move_to(P(-1.35, 1.62))
        self.au_mot("Voici Yanis")
        pend = VGroup(*rangs)
        self.play(FadeOut(VGroup(q, cal, deux, *etiq)), pend.animate.scale(0.8).move_to(P(0.85, 1.6)),
                  FadeIn(mq, shift=UP * 0.15), run_time=0.5)
        nom = self.t("Yanis, styliste", 24, BLEU_CALCUL).move_to(P(-0.85, 0.42))
        self.au_mot("styliste")
        self.play(FadeIn(nom, shift=UP * 0.1), run_time=0.3)
        # l'arbre, de haut en bas
        racine = P(0, -0.3)
        n1 = [P(-1.6 + 0.8 * i, -1.0) for i in range(5)]
        n2 = [P(p[0] + 0.26 * (j - 1), -1.8) for p in n1 for j in range(3)]
        n3 = [P(p[0] + 0.065 * (m - 1.5), -2.75) for p in n2 for m in range(4)]
        e1 = VGroup(*[Line(racine, q_, color=HAUTS[i], stroke_width=4) for i, q_ in enumerate(n1)])
        e2 = VGroup(*[Line(n1[k // 3], q_, color=BAS[k % 3], stroke_width=2.5) for k, q_ in enumerate(n2)])
        e3 = VGroup(*[Line(n2[k // 4], q_, color=PIEDS[k % 4], stroke_width=1.3) for k, q_ in enumerate(n3)])
        self.au_mot("l'arbre des tenues")
        self.play(FadeIn(Dot(racine, radius=0.07)), run_time=0.25)
        calc = VGroup(self.t("5", 34, ET), self.t("×", 34, ET), self.t("3", 34, ET), self.t("=", 34, ET),
                      self.t("15", 34, ET)).arrange(RIGHT, buff=0.12).move_to(P(0.6, 0.0))
        self.au_mot("5 t-shirts")
        self.play(LaggedStart(*[Create(e) for e in e1], lag_ratio=0.15), FadeIn(calc[0], scale=1.3), run_time=0.5)
        self.au_mot("3 pantalons")
        self.play(LaggedStart(*[Create(e) for e in e2], lag_ratio=0.04), FadeIn(calc[1:3], scale=1.2),
                  *self.habiller(mq, 1, 1, 0), run_time=0.6)
        self.au_nb("3 pantalons", "15")
        self.play(FadeIn(calc[3:], scale=1.3), run_time=0.25)
        fin = VGroup(self.t("5", 34, ET), self.t("×", 34, ET), self.t("3", 34, ET), self.t("×", 34, ET),
                     self.t("4", 34, ET), self.t("=", 34, VERT_OK), self.t("60", 38, VERT_OK))
        fin.arrange(RIGHT, buff=0.1).scale_to_fit_width(2.35).move_to(P(0.6, 0.0))
        for x in fin[:3]:
            x._pas_audit = True  # recopie de 5 × 3
        self.au_mot("4 paires")
        self.play(LaggedStart(*[Create(e) for e in e3], lag_ratio=0.01), ReplacementTransform(calc[:3], fin[:3]),
                  FadeOut(calc[3:]), FadeIn(fin[3:5], scale=1.2), *self.habiller(mq, 2, 2, 2), run_time=0.7)
        self.au_mot("60 tenues")
        self.play(FadeIn(fin[5:], scale=1.3), run_time=0.25)
        # un chemin allumé = la tenue du mannequin
        chemins = [(0, 0, 0), (3, 1, 2), (4, 2, 1), (1, 2, 3)]
        lum = None
        for h, b, p in chemins:
            k2, k3 = h * 3 + b, (h * 3 + b) * 4 + p
            ch = VMobject(stroke_color=WHITE, stroke_width=6).set_points_as_corners([racine, n1[h], n2[k2], n3[k3]])
            anims = [Create(ch)] + self.habiller(mq, h, b, p)
            if lum is not None:
                anims.append(FadeOut(lum))
            self.play(*anims, run_time=0.35)
            lum = ch
        self.au_mot("60 jours")
        cal = self.calendrier(2, 0.13, 0.028, 2).move_to(P(0.85, 1.6))
        self.play(FadeOut(pend), FadeIn(cal), FadeOut(lum), run_time=0.3)
        jours = [c for blk in cal for c in blk[1]]
        couleurs = [PIEDS[k % 4] if k % 3 else HAUTS[k % 5] for k in range(60)]
        self.play(LaggedStart(*[c.animate.set_fill(couleurs[k], 1) for k, c in enumerate(jours)], lag_ratio=0.03),
                  run_time=0.7)
        deux_mois = self.t("2 mois !", 30, VERT_OK).next_to(cal, DOWN, buff=0.12)
        self.au_nb("jours, ", "2")
        self.play(FadeIn(deux_mois, scale=1.3), run_time=0.3)
        self.insister(fin[5:], 1.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : question-pause : 2 casquettes, ou aucune ──
        self.dire("02-question")
        arbre = VGroup(e1, e2, e3)
        self.play(FadeOut(VGroup(arbre, fin, cal, deux_mois, nom)), *[m.animate.set_opacity(0) for m in self.mobjects
                                                                      if isinstance(m, Dot)], run_time=0.3)
        caps = VGroup(casquette(ORANGE_RETENUE, 0.9), casquette(VIOLET_ACCENT, 0.9)).arrange(RIGHT, buff=0.35)
        caps.move_to(P(0.75, 1.9))
        aucune = VGroup(casquette(GREY_B, 0.9).set_opacity(0.4))
        aucune.add(Line(aucune[0].get_corner(DL), aucune[0].get_corner(UR), color=ROUGE_ERREUR, stroke_width=4))
        aucune.move_to(P(0.75, 1.1))
        t0, tete, rebours, q, cartes, pause = self.question(
            0.47, ["2 casquettes, ou aucune :", "combien de tenues ?"], ["120", "180", "62"], 1, "02-question")
        self.au_mot("2 casquettes")
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in caps], lag_ratio=0.3), FadeIn(q[0][:12]),
                  run_time=0.45)
        self.au_mot("aucune")
        self.play(FadeIn(aucune, scale=1.2), FadeIn(q[0][12:]), run_time=0.35)
        self.au_mot("Combien de tenues")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)
        self.montrer_choix(cartes)
        self.pause_rebours(pause, rebours, "02-question", t0, 1)

        # ── 02b : 3 choix : 60 × 3 = 180, presque 6 mois ──
        self.dire("02b-reponse")
        okq = self.reponse(cartes, 1, pause, rebours)
        n1c = self.t("1", 26, ORANGE_RETENUE).next_to(caps[0], DOWN, buff=0.08)
        n2c = self.t("2", 26, VIOLET_ACCENT).next_to(caps[1], DOWN, buff=0.08)
        rien = self.t("rien", 26, GREY_A).next_to(aucune, RIGHT, buff=0.2)
        tete_mq = mq[2]
        chap1 = casquette(ORANGE_RETENUE, 0.6).next_to(tete_mq, UP, buff=-0.14)
        chap2 = casquette(VIOLET_ACCENT, 0.6).next_to(tete_mq, UP, buff=-0.14)
        self.au_nb("Casquette", "1")
        self.play(FadeIn(n1c, scale=1.3), Indicate(caps[0]), FadeIn(chap1, shift=DOWN * 0.2), run_time=0.3)
        self.au_nb("casquette", "2")
        self.play(FadeIn(n2c, scale=1.3), Indicate(caps[1]), ReplacementTransform(chap1, chap2), run_time=0.3)
        self.au_mot("ou rien")
        self.play(FadeIn(rien, scale=1.3), FadeOut(chap2, shift=UP * 0.2), run_time=0.3)
        trois = self.t("3 choix", 30, ET).move_to(P(-1.2, 0.35))
        self.au_mot("3 choix")
        self.play(FadeOut(VGroup(tete, q, cartes, okq)), FadeIn(trois, scale=1.1), run_time=0.3)
        calc = VGroup(self.t("60", 36), self.t("×", 36, ET), self.t("3", 36, ET), self.t("=", 36, VERT_OK),
                      self.t("180", 40, VERT_OK)).arrange(RIGHT, buff=0.14).move_to(P(0, -0.2))
        self.au_mot("60 fois")
        self.play(FadeIn(calc[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("60 fois", "3")
        self.play(FadeIn(calc[1:3], scale=1.2), run_time=0.25)
        self.au_mot("180 tenues")
        self.play(FadeIn(calc[3:], scale=1.3), run_time=0.3)
        cal6 = self.calendrier(6, 0.1, 0.022, 3).move_to(P(0, -1.6))
        jours = [c for blk in cal6 for c in blk[1]]
        cols = HAUTS + PIEDS
        self.play(FadeIn(cal6), run_time=0.25)
        self.play(LaggedStart(*[c.animate.set_fill(cols[k % 9], 1) for k, c in enumerate(jours)], lag_ratio=0.012),
                  run_time=1.6)
        six = self.t("presque 6 mois !", 30, VERT_OK).move_to(P(0, -2.75))
        self.au_nb("Presque", "6")
        self.play(FadeIn(six, scale=1.3), run_time=0.3)
        self.insister(six, 1.12)
        self.attendre_voix(marge=0.2)

        # ── 03 : à toi ──
        self.dire("03-commentaire")
        self.au_mot("À toi")
        toi = self.t("À toi !", 40, JAUNE_TITRE).move_to(P(0, 2.15))
        self.play(FadeOut(VGroup(mq, caps, aucune, n1c, n2c, rien, trois, calc, cal6, six)),
                  FadeIn(toi, scale=1.2), run_time=0.45)
        lignes = [("7 t-shirts", "7 t-shirts", VGroup(*[tshirt(HAUTS[k % 5], 0.3) for k in range(7)])),
                  ("3 shorts", "3 shorts", VGroup(*[pantalon(BAS[k], 0.3).stretch(0.55, 1) for k in range(3)])),
                  ("2 paires", "2 paires de sandales", VGroup(*[basket(PIEDS[k + 2], 0.45) for k in range(2)]))]
        objs = []
        for k, (m, tx, ic) in enumerate(lignes):
            y = 1.25 - 0.85 * k
            ic.arrange(RIGHT, buff=0.06).move_to(P(0, y + 0.15))
            lab = self.t(tx, 28).move_to(P(0, y - 0.25))
            self.au_mot(m)
            self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in ic], lag_ratio=0.08), FadeIn(lab), run_time=0.4)
            objs += [ic, lab]
        cq = self.t("Combien de tenues ?", 32, ORANGE_RETENUE).move_to(P(0, -1.3))
        self.au_mot("Combien de tenues")
        self.play(FadeIn(cq, scale=1.2), run_time=0.35)
        appel = self.t("Réponds en commentaire !", 30, VERT_OK, largeur=3.7).move_to(P(0, -2.3))
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 04 : la fin ──
        self.fin_short("04-abonne", [titre, badge, toi, cq, appel, *objs])
