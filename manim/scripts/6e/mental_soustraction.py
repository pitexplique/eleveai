# mental_soustraction.py
# EleveAI — Maths 6e — série « Calcul mental », épisode 02 : SOUSTRAIRE DE TÊTE
# (micro entier_soustraction_mentale, notion entier_calcul_mental), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE. Short jumeau : film Ti Margo (prototypes/ti-margo/films/mental-soustraction.js).
# Décor et métier : Chloé, COMMERÇANTE, magasin de vélos (centres : argent-budget, velo).
# Micro → écrans : compléter jusqu'au nombre rond (02, question 03), enlever les dizaines puis
# les unités (04), arrondir puis corriger (05), le piège du mauvais sens (06, question 07),
# défi (08), appris (09).
# Voix : manim/voix/6e-mental-soustraction.json (Julie, débit −6) ; marques : mental_soustraction_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/mental_soustraction.py MentalSoustraction6e
# python -m manim render -qh --disable_caching manim/scripts/6e/mental_soustraction.py MentalSoustraction6e -o eleveai-maths-6e-mental-soustraction --media_dir manim/scripts/6e/media-men-02
# Sortie : manim/sorties/6e/maths/calcul-mental/02-soustraction/eleveai-maths-6e-mental-soustraction.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from mental_commun import *  # noqa: E402,F403

MOINS = "−"
BILLET = "#86efac"


def chloe(s=1.0):
    """Chloé, commerçante : tablier du magasin, clé à molette."""
    p = visage(personne(peau="#f1c27d", tenue="#7c3aed", cheveux="#b45309", longs=True, s=s))
    c = p.corps
    tab = Polygon(*[c.get_center() + P(x * s, y * s) for x, y in ((-0.4, 0.35), (0.4, 0.35), (0.55, -0.9), (-0.55, -0.9))],
                  fill_color="#f97316", fill_opacity=1, stroke_width=0)
    poche = RoundedRectangle(width=0.5 * s, height=0.3 * s, corner_radius=0.05 * s, fill_color="#ea580c", fill_opacity=1,
                             stroke_width=0).move_to(c.get_center() + DOWN * 0.45 * s)
    p.add(tab, poche)
    return p


def velo(s=1.0, couleur="#22d3ee"):
    r = 0.42 * s
    g1 = Circle(radius=r, color=WHITE, stroke_width=5).move_to(P(-0.62 * s, 0))
    g2 = Circle(radius=r, color=WHITE, stroke_width=5).move_to(P(0.62 * s, 0))
    a, b, c, d = P(-0.62 * s, 0), P(-0.05 * s, 0), P(0.42 * s, 0.55 * s), P(-0.25 * s, 0.55 * s)
    cadre = VGroup(Line(a, d, color=couleur, stroke_width=7), Line(d, c, color=couleur, stroke_width=7),
                   Line(c, b, color=couleur, stroke_width=7), Line(b, a, color=couleur, stroke_width=7),
                   Line(d, b, color=couleur, stroke_width=7), Line(c, P(0.62 * s, 0), color=couleur, stroke_width=7))
    selle = Line(d + P(-0.15 * s, 0.12 * s), d + P(0.15 * s, 0.12 * s), color=WHITE, stroke_width=8)
    guidon = Line(c + P(0, 0), c + P(0.12 * s, 0.22 * s), color=WHITE, stroke_width=6)
    return VGroup(g1, g2, cadre, selle, guidon)


def billet(txt="100 €", s=1.0):
    b = RoundedRectangle(width=1.9 * s, height=0.95 * s, corner_radius=0.08 * s, fill_color=BILLET, fill_opacity=1,
                         stroke_color="#15803d", stroke_width=4)
    t = Text(txt, font_size=int(36 * s), color="#14532d", weight=BOLD).move_to(b)
    g = VGroup(b, t)
    g.texte = t
    return g


def casque(s=1.0):
    dome = AnnularSector(inner_radius=0, outer_radius=0.55 * s, angle=PI, start_angle=0, fill_color="#ef4444",
                         fill_opacity=1, stroke_width=0)
    fentes = VGroup(*[Line(P(x * s, 0.12 * s), P(x * s * 1.25, 0.42 * s), color="#7f1d1d", stroke_width=5)
                      for x in (-0.2, 0, 0.2)])
    visiere = Line(P(-0.6 * s, 0), P(0.65 * s, 0), color="#111827", stroke_width=8)
    return VGroup(dome, fentes, visiere)


class MentalSoustractionBase(PaysageMental):
    nom_voix = "6e-mental-soustraction"
    fichier_marques = "mental_soustraction_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Soustraire de tête", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Soustraire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Comment")
        q = self.bloc(["Comment calculer", "sans poser l'opération ?"], 40).move_to(P(-3.0, 0.45))
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.35)
        self.au_mot("121 moins")
        calc = self.ligne([("121 " + MOINS, JAUNE_TITRE), ("38 = ?", JAUNE_TITRE)], 66, buff=0.42).move_to(P(3.4, 0.45))
        self.play(FadeIn(calc[0], scale=1.3), run_time=0.3)
        self.au_mot("38 sans")
        self.play(FadeIn(calc[1], scale=1.3), run_time=0.3)
        self.au_mot("sans poser")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.35)
        self.play(Indicate(calc, color=JAUNE_TITRE, scale_factor=1.15), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Chloé, magasin de vélos ────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ch = chloe(1.05).move_to(P(-4.6, 0.1))
        self.au_mot("Voici Chloé")
        nom = self.t("Chloé", 42, BLEU_CALCUL).next_to(ch, UP, buff=0.2)
        self.play(FadeIn(ch, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle tient")
        met = self.t("commerçante", 30, BLEU_CALCUL).next_to(ch, DOWN, buff=0.18)
        v1 = velo(1.1).move_to(P(0.2, 0.4))
        v2 = velo(1.1, "#f472b6").move_to(P(3.2, 0.4))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("magasin de vélos")
        enseigne = self.t("Magasin de vélos", 44, JAUNE_TITRE).move_to(P(1.7, 2.4))
        self.play(FadeIn(enseigne, shift=DOWN * 0.2), FadeIn(v1, shift=RIGHT * 0.5), FadeIn(v2, shift=LEFT * 0.5),
                  run_time=0.5)
        self.au_mot("elle rend la monnaie")
        l = self.t("Elle rend la monnaie de tête.", 38)
        self.col(l, -1.4, xl=-2.4)
        b = billet("€", 0.8).move_to(P(4.6, -1.4))
        self.play(FadeIn(l, shift=UP * 0.1), FadeIn(b, shift=UP * 0.3), run_time=0.4)
        self.attendre_voix()

    # ── 02 : compléter jusqu'au nombre rond ─────────────────────────────────
    def ecran_complement(self):
        self.ecran("02-complement")
        ca = casque(0.8).move_to(P(-5.6, 2.75))
        self.au_mot("un casque")
        l0 = self.ligne([("Un casque à", WHITE), ("36 €.", AMBRE_D)], 36, buff=0.18)
        self.col(l0, 2.75, xl=-4.6)
        self.play(FadeIn(ca, shift=DOWN * 0.2), FadeIn(l0[0]), run_time=0.35)
        self.au_mot("36 euros")
        self.play(FadeIn(l0[1], scale=1.2), run_time=0.3)
        b = billet("100 €", 0.85).move_to(P(4.6, 2.75))
        l1 = self.t("Il paie avec", 36).next_to(b, LEFT, buff=0.3)
        self.au_mot("Il paie")
        self.play(FadeIn(l1), run_time=0.3)
        self.au_mot("billet de 100")
        self.play(FadeIn(b, shift=LEFT * 0.4), run_time=0.3)
        bd = Bonds(36, 100, x0=-5.4, x1=4.4, y=0.55, fs=38)
        self.au_mot("Chloé complète")
        self.play(Create(bd.trait), run_time=0.35)
        t36, t40, t100 = bd.tic(36), bd.tic(40, ROND), bd.tic(100, ROND)
        t36[1].shift(LEFT * 0.14); t40[1].shift(RIGHT * 0.14)  # 36 et 40 aérés
        b1, b2 = bd.bond(36, 40, "+ 4"), bd.bond(40, 100, "+ 60", ROSE_D)
        self.au_mot("de 36")
        self.play(Create(t36[0]), FadeIn(t36[1]), run_time=0.25)
        self.au_mot("à 40")
        self.play(Create(t40[0]), FadeIn(t40[1]), run_time=0.25)
        self.au_mot("il manque 4")
        self.play(Create(b1.fleche), FadeIn(b1.etiquette, scale=1.3), run_time=0.4)
        self.au_mot("De 40 à 100")
        self.au_mot("100, il")
        self.play(Create(t100[0]), FadeIn(t100[1]), run_time=0.25)
        self.au_mot("il manque 60")
        self.play(Create(b2.fleche), FadeIn(b2.etiquette, scale=1.3), run_time=0.45)
        self.etapes(bd, [("4 +", "4 plus 60"), ("60 :", "60 : elle"), ("elle rend 64 €.", "elle rend 64")], -1.15,
                    couleurs=[AMBRE_D, ROSE_D, VERT_OK])
        self.etapes(bd, [("100 " + MOINS, "100 moins"), ("36", "36, ça"), ("= 64", "64.")], -1.9)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        bd = Bonds(45, 100, x0=-5.9, x1=-0.9, y=0.4, fs=30)

        def autres_q(sc):
            sc.play(Create(bd.trait), run_time=0.3)

        def apres(sc):
            lg0 = sc.ligne_rep(0, ["De 45", "à 50,", "il manque 5."])
            t45, t50, b1 = bd.tic(45), bd.tic(50, ROND), bd.bond(45, 50, "+ 5")
            t45[1].shift(LEFT * 0.12); t50[1].shift(RIGHT * 0.12)  # 45 et 50 aérés
            sc.au_mot("De 45")
            sc.play(FadeIn(lg0[0], shift=UP * 0.1), Create(t45[0]), FadeIn(t45[1]), run_time=0.25)
            sc.au_mot("à 50")
            sc.play(FadeIn(lg0[1], shift=UP * 0.1), Create(t50[0]), FadeIn(t50[1]), run_time=0.25)
            sc.au_mot("il manque 5")
            sc.play(FadeIn(lg0[2], shift=UP * 0.1), Create(b1.fleche), FadeIn(b1.etiquette), run_time=0.3)
            lg1 = sc.ligne_rep(1, ["De 50", "à 100,", "il manque 50."])
            t100, b2 = bd.tic(100, ROND), bd.bond(50, 100, "+ 50", ROSE_D)
            sc.au_mot("De 50")
            sc.play(FadeIn(lg1[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("à 100")
            sc.play(FadeIn(lg1[1], shift=UP * 0.1), Create(t100[0]), FadeIn(t100[1]), run_time=0.25)
            sc.au_mot("il manque 50")
            sc.play(FadeIn(lg1[2], shift=UP * 0.1), Create(b2.fleche), FadeIn(b2.etiquette), run_time=0.3)
            lg2 = sc.ligne_rep(2, ["5 + 50 :", "55."])
            sc.au_mot("5 plus 50")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("55")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), run_time=0.25)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse", ["Combien font 100 " + MOINS + " 45 ?"],
                            [self.t("65", 36), self.t("55", 36), self.t("45", 36)], 1,
                            ["De 45 à 50, il manque 5.", "De 50 à 100, il manque 50.", "5 + 50 : 55."], mot_q="Combien",
                            autres_q=autres_q, autres_r=apres)

    # ── 04 : les dizaines, puis les unités ──────────────────────────────────
    def ecran_dizaines(self):
        self.ecran("04-dizaines")
        l0 = self.ligne([("Stock :", WHITE), ("96 sonnettes.", WHITE)], 38, buff=0.18)
        self.col(l0, 2.85, xl=-5.6)
        bd = Bonds(69, 96, x0=-5.0, x1=4.2, y=0.35, fs=38)
        t96 = bd.tic(96)
        self.au_mot("Dans le stock")
        self.play(FadeIn(l0[0], shift=UP * 0.1), Create(bd.trait), run_time=0.3)
        self.au_mot("96 sonnettes")
        self.play(FadeIn(l0[1], shift=UP * 0.1), Create(t96[0]), FadeIn(t96[1]), run_time=0.3)
        self.ligne_mots([("Chloé en vend", WHITE), ("27.", AMBRE_D)], ["Chloé en vend", "27."], 2.85, fs=38, xl=1.0)
        b1, t76 = bd.bond(96, 76, MOINS + " 20", ROSE_D), bd.tic(76)
        self.etapes(bd, [("Les dizaines :", "les dizaines"), ("96 " + MOINS, "96 moins"), ("20", "20, ça"),
                         ("= 76.", "76. Puis")], -1.15, couleurs=[ROSE_D, WHITE, WHITE, VERT_OK],
                    gestes={2: [Create(b1.fleche), FadeIn(b1.etiquette, scale=1.3)], 3: [Create(t76[0]), FadeIn(t76[1])]})
        b2, t69 = bd.bond(76, 69, MOINS + " 7"), bd.tic(69, VERT_OK)
        self.etapes(bd, [("Les unités :", "les unités"), ("76 " + MOINS, "76 moins"), ("7", "7, ça"), ("= 69.", "69. Il")],
                    -1.85, couleurs=[AMBRE_D, WHITE, WHITE, VERT_OK],
                    gestes={2: [Create(b2.fleche), FadeIn(b2.etiquette, scale=1.3)], 3: [Create(t69[0]), FadeIn(t69[1])]})
        self.au_mot("Il reste 69")
        g = self.gros("69 sonnettes", fs=44).move_to(P(2.6, -2.6))
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 05 : arrondir, puis corriger ────────────────────────────────────────
    def ecran_arrondir(self):
        self.ecran("05-arrondir")
        tit = self.t("Plus fort : arrondir, puis corriger", 44, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au_mot("Plus fort")
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.25)
        self.ligne_mots([("121", WHITE), ("vélos,", WHITE)], ["121", "vélos"], 2.2, fs=36, xl=-5.6)
        self.ligne_mots([("38", AMBRE_D), ("sont vendus.", WHITE)], ["38 sont", "sont vendus"], 2.2, fs=36, xl=-2.7)
        l2 = self.ligne([("38", AMBRE_D), ("≈", WHITE), ("40", ROND)], 40, buff=0.2)
        self.col(l2, 2.2, xl=1.6)
        self.au_mot("38, c'est")
        self.play(FadeIn(l2[0]), FadeIn(l2[1]), run_time=0.25)
        self.au_mot("40. 121")
        self.play(FadeIn(l2[2], scale=1.3), run_time=0.3)
        bd = Bonds(81, 121, x0=-5.0, x1=4.2, y=0.15, fs=38)
        self.play(Create(bd.trait), run_time=0.3)
        t121, b1, t81 = bd.tic(121), bd.bond(121, 81, MOINS + " 40", ROSE_D), bd.tic(81)
        self.etapes(bd, [("121 " + MOINS, "121 moins"), ("40", "40, ça"), ("= 81.", "81. Mais")], -1.15,
                    gestes={0: [Create(t121[0]), FadeIn(t121[1])], 1: [Create(b1.fleche), FadeIn(b1.etiquette, scale=1.3)],
                            2: [Create(t81[0]), FadeIn(t81[1])]})
        self.au_mot("enlevé 2 de trop")
        l3 = self.ligne([("J'ai enlevé", WHITE), ("2 de trop", ORANGE_RETENUE), ("→ je les rajoute :", WHITE)], 34, buff=0.16)
        self.col(l3, -1.85, xl=-5.6)
        self.play(FadeIn(l3[0]), FadeIn(l3[1], scale=1.2), run_time=0.35)
        self.au_mot("Elle les rajoute")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        t83, b2 = bd.tic(83, VERT_OK), bd.bond(81, 83, "+ 2", VERT_OK, haut=0.55)
        t83[1].shift(RIGHT * 0.5)  # 83 à droite de son trait, loin de 81
        self.etapes(bd, [("81 +", "81 plus"), ("2", "2, ça"), ("= 83.", "83 vélos")], -2.55,
                    gestes={1: [Create(b2.fleche), FadeIn(b2.etiquette, scale=1.3)], 2: [Create(t83[0]), FadeIn(t83[1])]})
        self.attendre_voix()

    # ── 06 : le piège du mauvais sens ───────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Le piège")
        tit = self.t("Le piège : corriger dans le mauvais sens", 44, ROUGE_ERREUR).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.45)
        self.au_mot("81 moins 2")
        f = self.ligne([("81 " + MOINS + " 2", WHITE), ("= 79", ROUGE_ERREUR)], 56, buff=0.25).move_to(P(-2.6, 1.5))
        self.play(FadeIn(f[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("79")
        self.play(FadeIn(f[1], scale=1.2), run_time=0.3)
        self.au_mot("faux")
        tf = self.tampon("Faux !", ROUGE_ERREUR, 44).next_to(f, RIGHT, buff=0.5)
        self.play(Create(self.barrer(f)), FadeIn(tf, scale=1.3), run_time=0.4)
        self.au_mot("On a enlevé trop")
        l1 = self.t("On a enlevé trop,", 42, ORANGE_RETENUE)
        self.col(l1, -0.2, xl=-5.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("alors on rajoute")
        l2 = self.t("alors on rajoute !", 42, VERT_OK)
        self.col(l2, -1.1, xl=-5.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.insister(l2, 1.15, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bd = Bonds(55, 85, x0=-5.9, x1=-0.9, y=0.4, fs=30)

        def autres_q(sc):
            sc.play(Create(bd.trait), run_time=0.3)

        def apres(sc):
            t85, b1, t55 = bd.tic(85), bd.bond(85, 55, MOINS + " 30", ROSE_D, fs=28), bd.tic(55)
            lg0 = sc.ligne_rep(0, ["85 " + MOINS, "30", "= 55."])
            sc.au_mot("85 moins")
            sc.play(FadeIn(lg0[0], shift=UP * 0.1), Create(t85[0]), FadeIn(t85[1]), run_time=0.25)
            sc.au_mot("30, ça")
            sc.play(FadeIn(lg0[1], shift=UP * 0.1), Create(b1.fleche), FadeIn(b1.etiquette), run_time=0.25)
            sc.au_mot("55. On")
            sc.play(FadeIn(lg0[2], shift=UP * 0.1), Create(t55[0]), FadeIn(t55[1]), run_time=0.25)
            lg1 = sc.ligne_rep(1, ["On a enlevé 1 de trop :"])
            sc.au_mot("On a enlevé 1")
            sc.play(FadeIn(lg1[0], shift=UP * 0.1), run_time=0.25)
            lg2 = sc.ligne_rep(2, ["on le rajoute.", "56."])
            b2, t56 = bd.bond(55, 56, "+ 1", VERT_OK, fs=26, haut=0.45), bd.tic(56, VERT_OK, fs=26)
            t56[1].shift(RIGHT * 0.3 + DOWN * 0.3)
            hors_audit(b2)  # « + 1 » : le 1 de trop, déjà dit
            sc.au_mot("on le rajoute")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), Create(b2.fleche), FadeIn(b2.etiquette), run_time=0.3)
            sc.au_mot("56")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), Create(t56[0]), FadeIn(t56[1]), run_time=0.25)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["Combien font 85 " + MOINS + " 29 ?"],
                            [self.t("54", 36), self.t("64", 36), self.t("56", 36)], 2,
                            ["85 − 30 = 55.", "On a enlevé 1 de trop :", "on le rajoute. 56."], mot_q="Combien",
                            autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        v = velo(1.6).move_to(P(-4.0, 1.0))
        self.au_mot("Un vélo")
        self.play(FadeIn(v, shift=RIGHT * 0.5), run_time=0.35)
        self.au_mot("162 euros")
        prix = self.gros("162 €", AMBRE_D, fs=54).move_to(P(-4.0, -0.6))
        self.play(FadeIn(prix, scale=1.3), run_time=0.35)
        self.au_mot("une remise")
        l1 = self.ligne([("Remise :", WHITE), (MOINS + " 19 €", ROSE_D)], 44, buff=0.2)
        self.col(l1, 1.3, xl=0.4)
        self.play(FadeIn(l1[0]), run_time=0.25)
        self.au_mot("19 euros")
        self.play(FadeIn(l1[1], scale=1.3), run_time=0.3)
        self.au_mot("Quel est")
        q = self.t("Quel est le nouveau prix ?", 42, JAUNE_TITRE)
        self.col(q, 0.2, xl=0.4)
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(v), run_time=0.5)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        self.au_mot("19, c'est presque 20")
        l0 = self.ligne([("19", ROSE_D), ("≈", WHITE), ("20", ROND)], 42, buff=0.2)
        self.col(l0, 2.3, xl=-5.6)
        self.play(FadeIn(l0[0]), FadeIn(l0[1]), run_time=0.25)
        self.au_mot("20. 162")
        self.play(FadeIn(l0[2], scale=1.3), run_time=0.3)
        bd = Bonds(142, 162, x0=-5.0, x1=4.2, y=0.6, fs=38)
        self.play(Create(bd.trait), run_time=0.25)
        t162, b1, t142 = bd.tic(162), bd.bond(162, 142, MOINS + " 20", ROSE_D), bd.tic(142)
        t142[1].shift(LEFT * 0.22)  # 142 et 143 aérés
        self.etapes(bd, [("162 " + MOINS, "162 moins"), ("20", "20, ça"), ("= 142.", "142. On")], -0.7,
                    gestes={0: [Create(t162[0]), FadeIn(t162[1])], 1: [Create(b1.fleche), FadeIn(b1.etiquette, scale=1.3)],
                            2: [Create(t142[0]), FadeIn(t142[1])]})
        self.au_mot("On a enlevé 1")
        l2 = self.ligne([("J'ai enlevé", WHITE), ("1 de trop :", ORANGE_RETENUE)], 36, buff=0.16)
        self.col(l2, -1.4, xl=-5.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        b2, t143 = bd.bond(142, 143, "+ 1", VERT_OK, haut=0.5), bd.tic(143, VERT_OK)
        t143[1].shift(RIGHT * 0.62)  # 143 à droite de son trait, loin de 142
        self.etapes(bd, [("142 +", "142 plus"), ("1", "1, ça"), ("= 143.", "143. Le")], -2.1,
                    gestes={1: [Create(b2.fleche), FadeIn(b2.etiquette, scale=1.3)], 2: [Create(t143[0]), FadeIn(t143[1])]})
        self.au_mot("Le vélo coûte")
        g = self.gros("143 €", fs=52).move_to(P(3.2, -1.8))
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.insister(g, 1.12, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        bd = Bonds(36, 100, x0=0, x1=4.6, y=0, fs=34)
        t36, t40, t100 = bd.tic(36), bd.tic(40, ROND), bd.tic(100, ROND)
        t36[1].shift(LEFT * 0.08); t40[1].shift(RIGHT * 0.12 + DOWN * 0.4)  # 40 une ligne sous 36
        fig = VGroup(bd, t36, t40, t100, bd.bond(36, 40, "+ 4"), bd.bond(40, 100, "+ 60", ROSE_D), bd.rond(t100))
        hors_audit(fig)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Pour rendre la monnaie, on complète", "jusqu'au nombre rond."),
            ("On enlève les dizaines,", "puis les unités."),
            ("Si on arrondit, on corrige", "dans le bon sens.")], fs=34)
        self.au_mot("Pour rendre")
        self.montrer_ligne(lignes[0], Indicate(fig[6], color=ROND, scale_factor=1.3))
        self.au_mot("On enlève")
        self.montrer_ligne(lignes[1])
        self.au_mot("Si on arrondit")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_complement()
        self.ecran_question1()
        self.ecran_dizaines()
        self.ecran_arrondir()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class MentalSoustraction6e(MentalSoustractionBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
