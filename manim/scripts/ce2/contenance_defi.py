# contenance_defi.py
# EleveAI — Maths CE2 — série « Contenance », épisode 05 : défi de contenances (plusieurs étapes)
# (micro ce2_contenance_defi, notion contenance), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : film Ti Margo (« Qui a raison ? », réponse C).
# Décor et métier : Yanis, MÉCANICIEN dans un garage (centre : transports).
# Mapping micro → écrans : 02 (répéter : 3 × 50 cL), 03 (convertir et ajouter : 200 + 150 = 350 cL),
# 04 (comparer et chercher ce qui manque : 400 − 350 = 50 cL), 06 (piège : 150 cL ≠ 15 L ; 150 cL = 1 L et 50 cL),
# 08 (défi : 5 L − 2 L − 150 cL), questions 05 (ce qui manque, B) et 07 (le 4e verre, A).
# Voix : manim/voix/ce2-contenance-defi.json (validée le 14/11, Julie, débit −6) ;
# marques : contenance_defi_marques.json (python manim/scripts/ce2/perimetre_marques.py contenance:defi).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/contenance_defi.py ContenanceDefiCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/contenance_defi.py ContenanceDefiCE2 -o eleveai-maths-ce2-contenance-defi --media_dir manim/scripts/ce2/media-cont-05
# Sortie : manim/sorties/ce2/maths/contenance/05-defi/eleveai-maths-ce2-contenance-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_ce2_commun import *  # noqa: E402,F403

GARAGE = "#60a5fa"


def voiture(s=1.0, couleur="#dc2626"):
    caisse = RoundedRectangle(width=2.4 * s, height=0.55 * s, corner_radius=0.15 * s, fill_color=couleur,
                              fill_opacity=1, stroke_width=0)
    toit = Polygon(P(-0.7 * s, 0), P(0.55 * s, 0), P(0.3 * s, 0.45 * s), P(-0.45 * s, 0.45 * s),
                   fill_color=couleur, fill_opacity=1, stroke_width=0).next_to(caisse, UP, buff=0)
    vitre = Polygon(P(-0.55 * s, 0.05 * s), P(0.42 * s, 0.05 * s), P(0.24 * s, 0.38 * s), P(-0.38 * s, 0.38 * s),
                    fill_color="#bae6fd", fill_opacity=0.9, stroke_width=0).move_to(toit).shift(DOWN * 0.02 * s)
    roues = VGroup(*[Circle(radius=0.26 * s, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                            stroke_width=3).move_to(caisse.get_bottom() + P(dx * s, 0)) for dx in (-0.7, 0.7)])
    return VGroup(caisse, toit, vitre, roues)


def bidon_huile(h=1.6, larg=1.2):
    return recipient("bidon", h, larg, 0.85, HUILE)


def bout50(couleur=HUILE):
    return recipient("bouteille", 1.0, 0.5, 0.85, couleur)


def barre(cl, couleur, W=0.016, H=0.75, opac=0.85):
    """Une barre horizontale de longueur proportionnelle à cl (W unités par centilitre)."""
    return Rectangle(width=W * cl, height=H, fill_color=couleur, fill_opacity=opac, stroke_color=WHITE,
                     stroke_width=2)


class ContenanceDefiBase(PaysageContenanceCE2):
    nom_voix = "ce2-contenance-defi"
    fichier_marques = "contenance_defi_marques.json"
    ceinture = "bleue"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un défi de contenances", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Un défi de contenances")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Assez d'huile", "pour le moteur ?"], 40, JAUNE_TITRE, buff=0.22)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        vo = voiture(1.0).move_to(P(3.6, 0.0))
        bi = bidon_huile(1.1, 0.9).move_to(P(4.4, 1.3))
        self.au_mot("Assez d'huile")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(bi, scale=1.1), run_time=0.35)
        self.au_mot("pour le moteur")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(vo, shift=LEFT * 0.4), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 01 : Yanis, mécanicien ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = yanis(0.95).move_to(P(-5.0, 0.2))
        self.au_mot("Voici Yanis")
        nom = self.t("Yanis", 42, GARAGE).next_to(pe, UP, buff=0.45)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est mécanicien")
        met = self.t("mécanicien", 26, GARAGE).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        vo = voiture(0.9).move_to(P(-2.2, 1.9))
        self.au_mot("il répare des voitures")
        l0 = hors_audit(self.t("Il répare des voitures.", 30, GRAY_B))
        self.col(l0, 2.6, 0.9)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(vo, shift=LEFT * 0.5), run_time=0.4)
        l1 = self.ligne([("Le moteur a besoin de", WHITE), ("4 L", JAUNE_TITRE), ("d'huile.", WHITE)], 32, buff=0.18)
        self.col(l1, 1.8, 0.9)
        self.au_mot("Le moteur")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(vo), run_time=0.35)
        self.au_mot("4 litres")
        self.play(FadeIn(l1[1:], shift=UP * 0.1), run_time=0.3)
        bi = bidon_huile(1.3, 1.0).move_to(P(-2.8, -1.2))
        bs = VGroup(*[bout50() for _ in range(3)]).arrange(RIGHT, buff=0.55).move_to(P(-0.7, -1.35))
        l2 = self.ligne([("Yanis a un bidon de", WHITE), ("2 L", JAUNE_TITRE)], 32, buff=0.18)
        self.col(l2, 1.0, 0.9)
        self.au_mot("Yanis a un bidon")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(bi, shift=UP * 0.2), run_time=0.35)
        self.au_mot("2 litres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(contenance(bi, "2 L", 26)), run_time=0.3)
        l3 = self.ligne([("et", WHITE), ("3", JAUNE_TITRE), ("bouteilles de", WHITE), ("50 cL.", JAUNE_TITRE)],
                        32, buff=0.18)
        self.col(l3, 0.25, 0.9)
        self.au_mot("3 bouteilles")
        self.play(FadeIn(l3[:3], shift=UP * 0.1),
                  LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in bs], lag_ratio=0.15), run_time=0.45)
        self.au_mot("50 centilitres")
        self.play(FadeIn(l3[3], shift=UP * 0.1),
                  FadeIn(VGroup(*[contenance(b, "50 cL", 20) for b in bs])), run_time=0.3)
        self.au_mot("Est-ce assez")
        q = self.t("Est-ce assez ?", 42, JAUNE_TITRE)
        self.col(q, -0.75, 0.9)
        self.play(FadeIn(q, scale=1.1), Wiggle(VGroup(bi, bs)), run_time=0.5)
        self.attendre_voix()

    # ── 02 : les bouteilles ─────────────────────────────────────────────────
    def ecran_bouteilles(self):
        self.ecran("02-bouteilles")
        bs = VGroup(*[bout50() for _ in range(3)]).arrange(RIGHT, buff=0.7).scale(1.3).move_to(P(-3.8, 0.3))  # étiquettes séparées
        ets = VGroup(*[contenance(b, "50 cL", 28) for b in bs])
        self.add(bs, ets)
        self.au_mot("D'abord, les bouteilles")
        l0 = self.t("D'abord, les bouteilles :", 38, JAUNE_TITRE)
        self.col(l0, 2.3, -0.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("3 × 50", BLEU_D), ("= 150 cL", VERT_OK)], 56, buff=0.3)
        self.col(l1, 0.8, -0.4)
        self.aux_extraits([l1[0]], ["3 fois 50"])
        self.play(LaggedStart(*[Indicate(b, color=JAUNE_TITRE) for b in bs], lag_ratio=0.2), run_time=0.6)
        self.aux_extraits([l1[1]], ["150 centilitres"])
        self.insister(l1[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 03 : le bidon, et le total ──────────────────────────────────────────
    def ecran_bidon(self):
        self.ecran("03-bidon")
        self.au_mot("Puis le bidon")
        l0 = self.t("Puis le bidon :", 38, JAUNE_TITRE)
        gauche(l0, -6.2, 2.9)
        bi = bidon_huile(1.3, 1.0).move_to(P(4.8, 1.9))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(bi, shift=UP * 0.2), run_time=0.35)
        l1 = self.ligne([("2 L", BLEU_D), ("= 200 cL", VERT_OK)], 48, buff=0.3)
        gauche(l1, -5.8, 1.9)
        self.aux_extraits([l1[0], l1[1]], ["2 litres", "200 centilitres"])
        b200 = barre(200, HUILE)
        b150 = barre(150, ORANGE_RETENUE)
        tot = VGroup(b200, b150).arrange(RIGHT, buff=0).move_to(P(-0.6, -0.2))
        e200 = hors_audit(self.t("200 cL", 28, WHITE).move_to(b200))
        e150 = hors_audit(self.t("150 cL", 28, WHITE).move_to(b150))
        self.play(FadeIn(b200), FadeIn(e200), run_time=0.3)
        self.au_mot("En tout")
        l2 = self.t("En tout :", 38, JAUNE_TITRE)
        gauche(l2, -6.2, 0.9)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("200", BLEU_D), ("+ 150", BLEU_D), ("= 350 cL", VERT_OK)], 52, buff=0.25)
        gauche(l3, -5.8, -1.5)
        self.aux_extraits([l3[0]], ["200 plus"])
        self.aux_extraits([l3[1]], ["150, 350"])
        self.play(FadeIn(b150), FadeIn(e150), run_time=0.3)
        self.aux_extraits([l3[2]], ["350 centilitres"])
        accol = BraceLabel(tot, "350 cL", label_constructor=Text, font_size=30, buff=0.1)
        hors_audit(accol)
        accol.label.set_color(VERT_OK)
        self.play(FadeIn(accol), run_time=0.3)
        self.insister(l3[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : assez ? ce qui manque ──────────────────────────────────────────
    def ecran_comparer(self):
        self.ecran("04-comparer")
        l0 = self.ligne([("Le moteur :", WHITE), ("4 L", BLEU_D), ("= 400 cL", VERT_OK)], 40, buff=0.22)
        gauche(l0, -6.2, 2.9)
        self.au_mot("Le moteur")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.aux_extraits([l0[1], l0[2]], ["4 litres", "400 centilitres"])
        X0 = -5.4
        b400 = barre(400, GRAY_D, opac=0.6).align_to(P(X0, 0), LEFT).set_y(1.3)
        b350 = barre(350, HUILE).align_to(P(X0, 0), LEFT).set_y(0.3)
        e400 = hors_audit(self.t("besoin : 400 cL", 26, WHITE).move_to(b400))
        e350 = hors_audit(self.t("Yanis a : 350 cL", 26, BLACK).move_to(b350))
        self.play(FadeIn(b400), FadeIn(e400), run_time=0.3)
        l1 = self.ligne([("350", BLEU_D), ("c'est moins que", WHITE), ("400 :", BLEU_D)], 38, buff=0.2)
        gauche(l1, -6.2, -0.75)
        hors_audit(l1[2])
        self.aux_extraits([l1[0]], ["350, c'est moins"])
        self.play(FadeIn(b350), FadeIn(e350), run_time=0.3)
        self.aux_extraits([l1[1:]], ["moins que 400"])
        self.au_mot("ce n'est pas assez")
        pa = self.t("pas assez !", 40, ROUGE_ERREUR).next_to(l1, RIGHT, buff=0.3)
        self.play(FadeIn(pa, scale=1.2), run_time=0.3)
        manque = Rectangle(width=0.016 * 50, height=0.75, fill_color=ROUGE_ERREUR, fill_opacity=0.5,
                           stroke_color=ROUGE_ERREUR, stroke_width=3).next_to(b350, RIGHT, buff=0)
        l2 = self.ligne([("Il manque", WHITE), ("400 − 350", BLEU_D), ("= 50 cL", ROUGE_ERREUR)], 40, buff=0.22)
        gauche(l2, -6.2, -1.75)
        hors_audit(l2[1])
        self.aux_extraits([l2[0], l2[1]], ["Il manque", ("400 moins", 1, 0.0)])
        self.aux_extraits([l2[2]], ["50 centilitres"])
        self.play(GrowFromEdge(manque, LEFT), run_time=0.35)
        self.au_mot("Une bouteille de plus")
        res = self.t("Une bouteille de plus !", 40, VERT_OK)
        gauche(res, -6.2, -2.7)
        b = bout50().next_to(manque, RIGHT, buff=0.35)
        self.play(FadeIn(res, scale=1.1), FadeIn(b, shift=LEFT * 0.3), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = rangee_recipients([recipient("bouteille", 1.6, 0.7, 0.85, EAU),
                               recipient("bouteille", 1.6, 0.7, 0.85, EAU),
                               recipient("bouteille", 0.8, 0.5, 0.85, EAU)], 0.35).move_to(P(-3.8, 1.5))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g[2], color=VERT_OK, scale_factor=1.1), run_time=0.2)

        self.question_gauche("05-question", "05b-reponse",
                             ["Il faut 3 L de liquide.", "Yanis a 2 bouteilles de 1 L", "et une de 50 cL.",
                              "Combien lui manque-t-il ?"],
                             [self.choix("1 L"), self.choix("50 cL"), self.choix("2 L")], 1,
                             ["2 bouteilles de 1 L : 200 cL.", "Plus 50 : 250.", "300 − 250 = 50.",
                              "Il manque 50 cL."],
                             -0.75, sans_audit=(3,), mot_q="Une voiture a besoin", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        fx = self.ligne([("150 cL", WHITE), ("= 15 L", ROUGE_ERREUR)], 54, buff=0.3)
        gauche(fx, -5.6, 1.8)
        self.aux_extraits([fx[0]], ["150 centilitres, ce"])
        self.aux_extraits([fx[1]], [("15 litres", 1, 0.0)])
        croix = Cross(fx[1], stroke_color=ROUGE_ERREUR, stroke_width=6, scale_factor=1.1)
        fa = self.t("Faux !", 46, ROUGE_ERREUR).next_to(fx, RIGHT, buff=0.6)
        self.play(Create(croix), FadeIn(fa, scale=1.3), run_time=0.4)
        l1 = self.ligne([("100 cL", BLEU_D), ("= 1 L", VERT_OK)], 46, buff=0.3)
        gauche(l1, -5.6, 0.5)
        self.aux_extraits([l1[0], l1[1]], ["100 centilitres font", ("1 litre :", 1, 0.0)])
        un = recipient("bouteille", 2.0, 0.85, 0.85, HUILE)
        de = recipient("bouteille", 1.0, 0.6, 0.85, HUILE)
        g = rangee_recipients([un, de], 0.5).move_to(P(3.8, -0.2))
        eu, ed = contenance(un, "1 L", 28), contenance(de, "50 cL", 28)
        res = self.ligne([("150 cL", BLEU_D), ("= 1 L", VERT_OK), ("et 50 cL", VERT_OK)], 46, buff=0.25)
        gauche(res, -5.6, -1.2)
        for m in res:
            hors_audit(m)
        self.aux_extraits([res[0]], [("150 centilitres, c'est", 1, 0.0)])
        self.aux_extraits([res[1]], [("1 litre et", 1, 0.0)])
        self.play(FadeIn(un, shift=UP * 0.2), FadeIn(eu), run_time=0.3)
        self.aux_extraits([res[2]], ["50 centilitres."])
        self.play(FadeIn(de, shift=UP * 0.2), FadeIn(ed), run_time=0.3)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = rangee_recipients([recipient("bouteille", 1.8, 0.8, 0.85, EAU)]
                              + [recipient("verre", 0.7, 0.5, 0.8, EAU) for _ in range(3)]
                              + [recipient("verre", 0.7, 0.5, 0.0, EAU)], 0.25)
        g.move_to(P(-3.8, 1.5))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g[4], color=VERT_OK, scale_factor=1.15), run_time=0.2)

        self.question_gauche("07-question", "07b-reponse",
                             ["Une bouteille de 1 L.", "Il remplit 3 verres de 25 cL.",
                              "Peut-il en remplir un quatrième ?"],
                             [self.choix("oui, tout juste"), self.choix("non, il manque 25 cL"),
                              self.choix("oui, et il en reste 25")], 0,
                             ["3 × 25 = 75 cL.", "100 − 75 = 25 : il reste 25 cL.", "Le quatrième verre",
                              "se remplit tout juste !"],
                             -0.75, couper={1: ("100 − 75 = 25 :", "il reste 25 cL.")}, sans_audit=(1,),
                             mot_q="Yanis a une bouteille", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        bi = bidon_huile(1.8, 1.4).move_to(P(-4.6, 0.4))
        l0 = self.ligne([("Un bidon de", WHITE), ("5 L", JAUNE_TITRE), ("d'huile.", WHITE)], 34, buff=0.2)
        gauche(l0, -2.4, 2.0)
        self.au_mot("un bidon de 5 litres")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(bi, shift=UP * 0.2), FadeIn(contenance(bi, "5 L", 28)),
                  run_time=0.4)
        l1 = self.ligne([("Il verse", WHITE), ("2 L", JAUNE_TITRE), ("dans une voiture,", WHITE)], 34, buff=0.2)
        gauche(l1, -2.4, 1.25)
        self.au_mot("Il en verse 2 litres")
        vo = voiture(0.5).next_to(l1, RIGHT, buff=0.3)  # après « voiture, » (la recouvrait)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(vo, shift=LEFT * 0.3), run_time=0.4)
        l2 = self.ligne([("puis", WHITE), ("150 cL", JAUNE_TITRE), ("dans une moto.", WHITE)], 34, buff=0.2)
        gauche(l2, -2.4, 0.5)
        self.au_mot("puis 150 centilitres")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Combien en reste-t-il")
        q = self.t("Combien en reste-t-il ?", 40, JAUNE_TITRE)
        gauche(q, -2.4, -0.5)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(bi), run_time=0.5)
        self.pause_defi(y=-2.2)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        a = self.ligne([("5 L", BLEU_D), ("= 500 cL", VERT_OK)], 40, buff=0.25)
        b = self.ligne([("2 L", BLEU_D), ("= 200 cL", VERT_OK)], 40, buff=0.25)
        gauche(a, -6.0, 2.1)
        gauche(b, -1.0, 2.1)
        self.aux_extraits([a[0], a[1], b[0], b[1]], ["5 litres", "500 centilitres", "2 litres", "200 centilitres"])
        c1 = self.ligne([("500 − 200", BLEU_D), ("= 300", VERT_OK)], 44, buff=0.25)
        c2 = self.ligne([("300 − 150", BLEU_D), ("= 150", VERT_OK)], 44, buff=0.25)
        gauche(c1, -6.0, 1.0)
        gauche(c2, -6.0, 0.0)
        for m in (c1[0], c2[0]):
            hors_audit(m)
        self.aux_extraits([c1[0], c1[1], c2[0], c2[1]],
                          ["500 moins", "300. 300", ("300 moins", 1, 0.0), ("150, 150", 1, 0.3)])
        res = self.ligne([("Il reste", WHITE), ("150 cL", VERT_OK), (":", WHITE)], 44, buff=0.22)
        res2 = self.ligne([("1 L", VERT_OK), ("et 50 cL.", VERT_OK)], 44, buff=0.22)
        gauche(res, -6.0, -1.2)
        gauche(res2, -6.0, -2.1)
        hors_audit(res[1])
        self.aux_extraits([res[0], VGroup(res[1], res[2]), res2[0], res2[1]],
                          ["Il reste", ("150 centilitres :", 1), "1 litre et", ("50 centilitres.", 1)])
        un = recipient("bouteille", 1.8, 0.8, 0.85, HUILE)
        de = recipient("bouteille", 0.9, 0.55, 0.85, HUILE)
        g = rangee_recipients([un, de], 0.4).move_to(P(4.0, -1.2))
        self.play(FadeIn(g, shift=UP * 0.2), run_time=0.35)
        self.insister(VGroup(res, res2), 1.06, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = bidon_huile(1.6, 1.2)
        lignes = self.finale_gauche(fig, textes=[
            ("Tout dans la même unité,", "souvent en centilitres."),
            ("On calcule", "étape par étape."),
            ("100 centilitres", "font 1 litre.")], fs=34)
        self.add(fig)
        self.au_mot("on met tout dans la même unité")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("On calcule étape")
        self.montrer_ligne(lignes[1])
        self.au_mot("100 centilitres font")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_bouteilles()
        self.ecran_bidon()
        self.ecran_comparer()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class ContenanceDefiCE2(ContenanceDefiBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "bleue"
