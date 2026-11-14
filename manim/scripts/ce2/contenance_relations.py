# contenance_relations.py
# EleveAI — Maths CE2 — série « Contenance », épisode 02 : 1 L = 10 dL = 100 cL
# (micro ce2_contenance_relations, notion contenance), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : film Ti Margo (« Un seul verre suffit ? », réponse B).
# Décor et métier : Amina, CHIMISTE dans un laboratoire (centre : sciences).
# Mapping micro → écrans : 02 (10 pots de 1 dL remplissent 1 L), 03 (100 cL = 1 L), 04 (1 dL = 10 cL),
# 06 (piège : 1 L ≠ 10 cL), 07 (plusieurs litres : 2 L = 20 dL = 200 cL),
# questions 05 (dL dans 1 L, A) et 08 (3 L en cL, C), défi 09 (1 L + 5 dL = 15 dL).
# Voix : manim/voix/ce2-contenance-relations.json (validée le 14/11, Julie, débit −6) ;
# marques : contenance_relations_marques.json (python manim/scripts/ce2/perimetre_marques.py contenance:relations).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/contenance_relations.py ContenanceRelationsCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/contenance_relations.py ContenanceRelationsCE2 -o eleveai-maths-ce2-contenance-relations --media_dir manim/scripts/ce2/media-cont-02
# Sortie : manim/sorties/ce2/maths/contenance/02-relations/eleveai-maths-ce2-contenance-relations.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_ce2_commun import *  # noqa: E402,F403

LABO = "#a78bfa"   # le liquide du laboratoire (violet)


def flacon(n=10, h=2.8, larg=1.3, couleur=LABO, graduer=True, plein=False):
    """Un grand flacon de 1 L gradué en n parts ; f.parts[i] = la i-ème tranche de liquide (du bas),
    DANS le groupe (elle suit le flacon) mais transparente si plein=False : la montrer avec verser(p)."""
    corps = RoundedRectangle(width=larg, height=h, corner_radius=0.14, fill_opacity=0, stroke_color=VERRE,
                             stroke_width=5)
    m = 0.07
    hh = (h - 2 * m) / n
    parts = VGroup(*[Rectangle(width=larg - 2 * m, height=hh, fill_color=couleur, fill_opacity=0.9, stroke_width=0)
                     .move_to(corps.get_bottom() + UP * (m + hh * (i + 0.5))) for i in range(n)])
    if not plein:
        parts.set_fill(opacity=0)
    g = VGroup(parts, corps)
    if graduer:
        g.add(VGroup(*[Line(corps.get_left() + RIGHT * 0.02, corps.get_left() + RIGHT * 0.28, color=VERRE,
                            stroke_width=2).set_y(corps.get_bottom()[1] + m + hh * i) for i in range(1, n)]))
    col_ = Rectangle(width=larg * 0.38, height=0.32, fill_opacity=0, stroke_color=VERRE, stroke_width=5)
    col_.next_to(corps, UP, buff=0)
    bou = Rectangle(width=larg * 0.44, height=0.14, fill_color=BOUCHON, fill_opacity=1, stroke_width=0)
    bou.next_to(col_, UP, buff=0)
    g.add(col_, bou)
    g.parts, g.corps = parts, corps
    return g


def verser(p):
    return p.animate.set_fill(opacity=0.9)


def petit_pot(h=0.55, larg=0.5, couleur=LABO):
    return recipient("pot", h, larg, 0.8, couleur)


class ContenanceRelationsBase(PaysageContenanceCE2):
    nom_voix = "ce2-contenance-relations"
    fichier_marques = "contenance_relations_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Litre, décilitre, centilitre", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Litre, décilitre et centilitre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de petits verres", "pour remplir 1 litre ?"], 38, JAUNE_TITRE, buff=0.22)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        f = flacon(10, 2.2, 1.0, EAU, False, True).move_to(P(3.6, 0.5))
        ve = recipient("verre", 0.7, 0.55, 0.8, EAU).move_to(P(5.0, -0.4))
        self.au_mot("Combien de petits verres")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(ve, scale=1.1), run_time=0.35)
        self.au_mot("remplir 1 litre")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(f, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Amina, chimiste ────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = amina(0.95).move_to(P(-5.0, 0.2))
        self.au_mot("Voici Amina")
        nom = self.t("Amina", 42, LABO).next_to(pe, UP, buff=0.3)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est chimiste")
        met = self.t("chimiste", 28, LABO).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("dans un laboratoire")
        l0 = self.t("Des expériences au laboratoire.", 30, GRAY_B)
        self.col(l0, 2.6, -2.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        f = flacon().move_to(P(-1.8, -0.3))
        po = petit_pot().move_to(P(0.2, -1.3))
        l1 = self.ligne([("Un grand flacon de", WHITE), ("1 L", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l1, 1.4, 1.2)
        self.au_mot("grand flacon de 1 litre")
        self.play(FadeIn(f, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        l2 = self.ligne([("un petit pot de", WHITE), ("1 dL", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l2, 0.6, 1.2)
        self.au_mot("petit pot de 1 décilitre")
        self.play(FadeIn(po, shift=UP * 0.2), FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Combien de fois")
        q = self.bloc(["Combien de fois", "doit-elle verser ?"], 38, JAUNE_TITRE)
        self.col(q, -0.8, 1.2)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(po), run_time=0.5)
        self.attendre_voix()

    # ── 02 : 10 pots de 1 dL ────────────────────────────────────────────────
    def ecran_dl(self):
        self.ecran("02-dl")
        f = flacon().move_to(P(-3.4, -0.2))
        po = petit_pot().move_to(P(-1.4, 1.9))
        ef = contenance(f, "1 L", 32)
        self.add(f, po, ef)
        self.au_mot("Elle verse")
        l0 = self.t("Elle verse, et elle compte :", 34, JAUNE_TITRE)
        self.col(l0, 2.6, 0.3)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        nums = VGroup(*[self.t(str(k + 1), 40, BLEU_D) for k in range(10)]).arrange(RIGHT, buff=0.32)
        self.col(nums, 1.5, 0.3)
        extraits = ["compte : 1"] + [f"{k}, {k + 1}" for k in range(1, 10)]
        for k in range(10):
            self.au_mot(extraits[k])
            self.play(FadeIn(nums[k], scale=1.3), verser(f.parts[k]),
                      po.animate.rotate(-0.5 if k % 2 == 0 else 0.5), run_time=0.22)
        self.au_mot("Le flacon est plein")
        l1 = self.t("Le flacon est plein !", 38, VERT_OK)
        self.col(l1, 0.5, 0.3)
        self.play(FadeIn(l1, scale=1.1), Indicate(f, color=VERT_OK, scale_factor=1.04), run_time=0.45)
        res = self.ligne([("10 dL", BLEU_D), ("= 1 L", VERT_OK)], 60, buff=0.35)
        self.col(res, -0.9, 0.3)
        self.au_mot("10 décilitres")
        self.play(FadeIn(res[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est 1 litre")
        self.play(FadeIn(res[1], shift=UP * 0.1), run_time=0.3)
        self.insister(res, 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : 100 pots de 1 cL ───────────────────────────────────────────────
    def ecran_cl(self):
        self.ecran("03-cl")
        f = flacon(100, graduer=False).move_to(P(-4.4, -0.2))
        ef = contenance(f, "1 L", 32)
        self.add(f, ef)
        mini = petit_pot(0.3, 0.28)
        mini.move_to(P(-2.6, 1.9))
        self.au_mot("tout petit pot de 1 centilitre")
        l0 = self.ligne([("Un tout petit pot de", WHITE), ("1 cL", JAUNE_TITRE), ("?", WHITE)], 34, buff=0.2)
        self.col(l0, 2.6, -1.0)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(mini, scale=1.4), run_time=0.4)
        self.au_mot("beaucoup plus")
        l1 = self.t("Il en faut beaucoup plus :", 34)
        self.col(l1, 1.8, -1.0)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        grille = VGroup(*[Square(0.2, fill_color=LABO, fill_opacity=0.9, stroke_color=WHITE, stroke_width=1)
                          for _ in range(100)]).arrange_in_grid(10, 10, buff=0.06)
        grille.move_to(P(-0.2, -0.6))
        self.au_mot("plus : 100")
        cent = self.t("100 !", 64, ORANGE_RETENUE).move_to(P(3.4, 0.4))
        self.play(FadeIn(cent, scale=1.3), LaggedStart(*[FadeIn(c, scale=1.5) for c in grille], lag_ratio=0.02),
                  LaggedStart(*[verser(p) for p in f.parts], lag_ratio=0.02), run_time=0.9)
        res = self.ligne([("100 cL", BLEU_D), ("= 1 L", VERT_OK)], 56, buff=0.35)
        self.col(res, -1.0, 2.1)
        self.au_mot("100 centilitres")
        self.play(FadeIn(res[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est 1 litre")
        self.play(FadeIn(res[1], shift=UP * 0.1), Indicate(f, color=VERT_OK, scale_factor=1.04), run_time=0.4)
        self.attendre_voix()

    # ── 04 : 1 dL = 10 cL ───────────────────────────────────────────────────
    def ecran_dl_cl(self):
        self.ecran("04-dl-cl")
        # une barre de 1 L en 10 décilitres ; le 1er décilitre se découpe en 10 centilitres
        W, H = 9.0, 0.9
        barre = VGroup(*[Rectangle(width=W / 10, height=H, fill_color=LABO, fill_opacity=0.35 + 0.05 * (k % 2),
                                   stroke_color=WHITE, stroke_width=2) for k in range(10)]).arrange(RIGHT, buff=0)
        barre.move_to(P(-0.6, 1.4))
        lab = hors_audit(self.t("1 L", 36, JAUNE_TITRE).next_to(barre, LEFT, buff=0.25))
        l0 = self.ligne([("10 dL", BLEU_D), ("= 1 L", VERT_OK)], 40, buff=0.3)
        gauche(l0, -6.2, 3.0)
        self.au_mot("10 décilitres")
        self.play(FadeIn(l0[0], shift=UP * 0.1), LaggedStart(*[FadeIn(b) for b in barre], lag_ratio=0.05),
                  run_time=0.4)
        self.au_mot("font 1 litre")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(lab), run_time=0.15)
        self.au_mot("100 centilitres")
        l1 = self.ligne([("100 cL", BLEU_D), ("= 1 L", VERT_OK)], 40, buff=0.3)
        gauche(l1, 0.6, 3.0)
        hors_audit(l1[1])  # « = 1 L » : le 1 est dit juste avant (« font 1 litre »)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.12)
        un = barre[0]
        zoom = VGroup(*[Rectangle(width=0.55, height=H, fill_color=LABO, fill_opacity=0.8, stroke_color=WHITE,
                                  stroke_width=1.5) for _ in range(10)]).arrange(RIGHT, buff=0).move_to(P(-0.6, -0.9))
        traits = VGroup(DashedLine(un.get_corner(DL), zoom.get_corner(UL), color=GRAY_B),
                        DashedLine(un.get_corner(DR), zoom.get_corner(UR), color=GRAY_B))
        self.au_mot("dans 1")
        ld = self.t("1 dL", 34, JAUNE_TITRE).next_to(un, UP, buff=0.15)
        hors_audit(ld)  # « 1 » déjà dit (« font 1 litre ») : l'audit prendrait le premier ; posé à « dans 1 »
        self.play(FadeIn(ld), run_time=0.15)
        self.play(Indicate(un, color=ORANGE_RETENUE), Create(traits), run_time=0.4)
        self.au_mot("il y a 10 centilitres")
        self.play(LaggedStart(*[FadeIn(z, scale=1.3) for z in zoom], lag_ratio=0.08), run_time=0.7)
        res = self.ligne([("1 dL", BLEU_D), ("= 10 cL", VERT_OK)], 56, buff=0.35).move_to(P(-0.6, -2.4))
        hors_audit(res[0])  # le « 1 » de « dans 1 décilitre », déjà écrit au-dessus de la barre
        self.play(FadeIn(res, scale=1.1), run_time=0.35)
        self.insister(res, 1.12, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = flacon(10, 2.2, 1.0, LABO, True, True).move_to(P(-3.8, 1.4))

        def autres_q(sc):
            sc.play(FadeIn(f), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(f, color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("05-question", "05b-reponse",
                             ["Combien y a-t-il", "de décilitres dans 1 litre ?"],
                             [self.choix("10 dL"), self.choix("100 dL"), self.choix("1 dL")], 0,
                             ["Déci veut dire dix :", "1 L = 10 dL."],
                             -0.75, mot_q="Combien y a-t-il", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Un élève écrit")
        l0 = self.t("Un élève écrit :", 34)
        gauche(l0, -6.0, 1.95)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        fx = self.ligne([("1 L", WHITE), ("= 10 cL", ROUGE_ERREUR)], 54, buff=0.3)
        gauche(fx, -5.6, 1.05)
        self.au_mot("1 litre")
        self.play(FadeIn(fx[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("égale 10 centilitres")
        self.play(FadeIn(fx[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Faux")
        croix = Cross(fx, stroke_color=ROUGE_ERREUR, stroke_width=6, scale_factor=1.1)
        fa = self.t("Faux !", 46, ROUGE_ERREUR).next_to(fx, RIGHT, buff=0.6)
        self.play(Create(croix), FadeIn(fa, scale=1.3), run_time=0.4)
        self.au_mot("Il a confondu")
        l1 = self.ligne([("Il a confondu", WHITE), ("dL", ORANGE_RETENUE), ("et", WHITE), ("cL.", ORANGE_RETENUE)],
                        34, buff=0.2)
        gauche(l1, -6.0, -0.05)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        b1 = self.ligne([("1 L", BLEU_D), ("= 10 dL", VERT_OK)], 48, buff=0.3)
        b2 = self.ligne([("1 L", BLEU_D), ("= 100 cL", VERT_OK)], 48, buff=0.3)
        gauche(b1, -5.6, -1.15)
        gauche(b2, 0.4, -1.15)
        hors_audit(b2[0])
        hors_audit(b1[1])  # « 10 » déjà dit (« 10 centilitres ») : l'audit prendrait le premier ; posé à son extrait
        self.aux_extraits([b1[0], b1[1], VGroup(b2[0], b2[1])],
                          [("1 litre", 2), "c'est 10 décilitres", ("c'est 100 centilitres", 1, 0.25)])
        self.insister(VGroup(b1, b2), 1.08, 0.25)
        self.attendre_voix()

    # ── 07 : plusieurs litres ───────────────────────────────────────────────
    def ecran_plusieurs(self):
        self.ecran("07-plusieurs")
        self.au_mot("Avec plusieurs litres")
        l0 = self.t("Avec plusieurs litres, on répète.", 36, JAUNE_TITRE)
        gauche(l0, -6.2, 2.9)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        fs_ = VGroup(flacon(10, 2.0, 0.95, EAU, plein=True), flacon(10, 2.0, 0.95, EAU, plein=True))
        fs_.arrange(RIGHT, buff=0.35)
        fs_.move_to(P(-4.4, -0.4))
        d = self.ligne([("2 L", BLEU_D), ("= 2 × 10", BLEU_D), ("= 20 dL", VERT_OK)], 46, buff=0.25)
        gauche(d, -1.6, 1.2)
        self.au_mot("2 litres")
        e2 = self.t("2 L", 40, JAUNE_TITRE).next_to(fs_, DOWN, buff=0.25)
        self.play(FadeIn(fs_, shift=UP * 0.2), FadeIn(e2), FadeIn(d[0], shift=UP * 0.1), run_time=0.3)
        c = self.ligne([("ou 2 ×", BLEU_D), ("100", BLEU_D), ("= 200 cL", VERT_OK)], 46, buff=0.26)
        gauche(c, -1.6, -0.6)
        c[1:].shift(RIGHT * 0.12)  # « × » et « 100 » se collaient
        hors_audit(c[0])  # « 2 » redit : l'audit prendrait le premier (« 2 litres ») ; posé à « Ou 2 »
        self.aux_extraits([d[1], d[2], c[0], c[1], c[2]],
                          [("2 fois 10", 1, 0.3), "20 décilitres", "Ou 2", ("2 fois 100", 1, 0.3), "200 centilitres"])
        self.insister(VGroup(d[2], c[2]), 1.1, 0.25)
        self.attendre_voix()

    def aux_extraits(self, morceaux, extraits, run_time=0.18):
        """Chaque morceau à SON extrait de la voix (comme perimetre_ce2_commun)."""
        for m, ex in zip(morceaux, extraits):
            for f in m.get_family():
                f.sans_synchro = True
            ex = list(ex) if isinstance(ex, (tuple, list)) else [ex]
            ex, n, delai = (ex + [1, 0.0][len(ex) - 1:])[:3]
            self.au_mot(ex, n)
            self.wait(0.07 + delai)
            self.play(FadeIn(m, shift=UP * 0.08), run_time=run_time)

    # ── 08 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bi = recipient("bidon", 1.9, 1.4, 0.8, EAU).move_to(P(-3.8, 1.4))

        def autres_q(sc):
            sc.play(FadeIn(bi), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(bi, color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("08-question", "08b-reponse",
                             ["Amina a un bidon de 3 L.", "Combien de centilitres ?"],
                             [self.choix("30 cL"), self.choix("3 cL"), self.choix("300 cL")], 2,
                             ["1 L = 100 cL.", "3 L : 3 × 100", "= 300 cL."],
                             -0.75, couper={1: ("3 L :", "3 × 100")}, mot_q="Amina a un bidon",
                             autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        b = recipient("bouteille", 2.0, 0.85, 0.85, LABO).move_to(P(-4.6, 0.1))
        p5 = VGroup(*[petit_pot(0.45, 0.42) for _ in range(5)]).arrange(RIGHT, buff=0.15).move_to(P(-1.6, -0.7))
        l0 = self.ligne([("Amina verse", WHITE), ("1 L,", JAUNE_TITRE)], 34, buff=0.2)
        gauche(l0, 0.4, 1.9)
        self.au_mot("verse 1 litre")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(b, shift=UP * 0.2), FadeIn(contenance(b, "1 L", 28)),
                  run_time=0.4)
        l1 = self.ligne([("puis encore", WHITE), ("5 dL.", JAUNE_TITRE)], 34, buff=0.2)
        gauche(l1, 0.4, 1.2)
        self.au_mot("encore 5 décilitres")
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[FadeIn(p, scale=1.2) for p in p5], lag_ratio=0.1),
                  run_time=0.5)
        self.au_mot("Combien de décilitres")
        q = self.bloc(["Combien de décilitres", "en tout ?"], 38, JAUNE_TITRE)
        gauche(q, 0.4, 0.0)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(p5), run_time=0.5)
        self.pause_defi(y=-2.2)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        dix = VGroup(*[petit_pot(0.45, 0.42) for _ in range(10)]).arrange(RIGHT, buff=0.12).move_to(P(-2.4, 1.6))
        cinq = VGroup(*[petit_pot(0.45, 0.42, ORANGE_RETENUE) for _ in range(5)]).arrange(RIGHT, buff=0.12)
        cinq.next_to(dix, RIGHT, buff=0.4)
        l0 = self.ligne([("1 L", BLEU_D), ("= 10 dL", VERT_OK)], 44, buff=0.3)
        gauche(l0, -5.8, 0.3)
        self.au_mot("1 litre")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est 10 décilitres")
        self.play(FadeIn(l0[1], shift=UP * 0.1), LaggedStart(*[FadeIn(p) for p in dix], lag_ratio=0.04), run_time=0.5)
        l1 = self.ligne([("10", BLEU_D), ("+ 5", BLEU_D), ("= 15", VERT_OK)], 48, buff=0.25)
        gauche(l1, -5.8, -0.8)
        self.aux_extraits(l1, ["10 plus", ("plus 5", 1, 0.4), ("5, 15", 1, 0.6)])
        self.play(FadeIn(cinq), run_time=0.3)
        res = self.ligne([("15 dL", VERT_OK), ("dans le flacon.", WHITE)], 46, buff=0.25)
        gauche(res, -5.8, -2.0)
        self.au_mot("Il y a 15 décilitres")
        self.play(FadeIn(res[0], scale=1.1), run_time=0.3)
        self.au_mot("dans le flacon")
        self.play(FadeIn(res[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        fig = flacon(10, 2.2, 1.0, LABO, True, True)
        lignes = self.finale_gauche(fig, textes=[
            ("1 L = 10 dL", "= 100 cL."),
            ("Et 1 dL", "= 10 cL."),
            ("Déci veut dire dix,", "centi veut dire cent.")], fs=34)
        self.add(fig)
        self.au_mot("1 litre, c'est 10")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("1 décilitre, c'est 10")
        self.montrer_ligne(lignes[1])
        self.au_mot("Déci veut dire dix")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_dl()
        self.ecran_cl()
        self.ecran_dl_cl()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_plusieurs()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class ContenanceRelationsCE2(ContenanceRelationsBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
