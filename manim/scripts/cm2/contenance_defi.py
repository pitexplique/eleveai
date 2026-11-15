# contenance_defi.py
# EleveAI — Maths CM2 — série « Contenance », épisode 04 : RÉSOUDRE UN DÉFI DE CONTENANCES
# (micro contenance_defi, notion contenance), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : cm2-contenance-defi-short (cocktail 2,5 L dans un pichet de 2 L, réponse C).
# Décor et métier : Manon, ORGANISATRICE DE MARATHON (centres : sport, santé).
# Le CM2, un cran au-dessus du CM1 : un problème en ÉTAPES (quantité totale, même unité, partage),
# des décimaux (1,5 L = 150 cL, 4,5 L + 6 L = 10,5 L), et l'arrondi « une bouteille de plus ».
# Mapping micro → écrans : 02 (les trois étapes), 03 (120 gobelets de 25 cL : 4 gobelets = 1 L, 30 L),
# 04 (bouteilles de 1,5 L : 2 bouteilles = 3 L, 20 bouteilles), 06 (piège : 31 L → 21 bouteilles),
# questions 05 (1,5 L en gobelets de 25 cL : A, 6 gobelets) et 07 (18 L − 40 gobelets de 20 cL : C, 10 L),
# défi 08 (glacière : 6 × 75 cL + 4 × 1,5 L = 10,5 L).
# Voix : manim/voix/cm2-contenance-defi.json (validée le 15/11, Julie, débit −6) ;
# marques : contenance_defi_marques.json (python manim/scripts/cm2/aire_marques_cm2.py contenance:defi).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/contenance_defi.py ContenanceDefiCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/contenance_defi.py ContenanceDefiCM2 -o eleveai-maths-cm2-contenance-defi --media_dir manim/scripts/cm2/media-contenance-04
# Sortie : manim/sorties/cm2/maths/contenance/04-defi/eleveai-maths-cm2-contenance-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_cm2_commun import *  # noqa: E402,F403

GLACE = "#0ea5e9"    # la glacière (bleu vif)


def gobelet(h=0.7, niveau=0.8, couleur=EAU):
    """Un gobelet du ravitaillement : un verre évasé, rempli d'eau."""
    return recipient("verre", h, h * 0.78, niveau, couleur)


def bouteille(h=1.2, niveau=0.85, couleur=EAU):
    return recipient("bouteille", h, h * 0.45, niveau, couleur)


def coureur(tenue, s=1.0):
    """Un petit coureur (dossard blanc sur le maillot)."""
    p = personne(peau="#e0ac69", tenue=tenue, cheveux="#1f2937", s=1.0)
    p.scale_to_fit_height(1.0 * s)
    d = Rectangle(width=p.width * 0.3, height=p.height * 0.12, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    d.move_to(p.get_center() + DOWN * p.height * 0.12)
    p.add(d)
    return p


def glaciere(larg=3.4, h=1.3):
    """La glacière : une caisse bleue à couvercle blanc et poignée (devant les bouteilles)."""
    caisse = RoundedRectangle(width=larg, height=h, corner_radius=0.15, fill_color=GLACE, fill_opacity=1,
                              stroke_color="#0369a1", stroke_width=4)
    bande = Rectangle(width=larg - 0.06, height=0.22, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    bande.align_to(caisse, UP).shift(DOWN * 0.03)
    poignee = RoundedRectangle(width=larg * 0.3, height=0.16, corner_radius=0.06, fill_color="#0369a1",
                               fill_opacity=1, stroke_width=0).move_to(caisse.get_center() + DOWN * 0.1)
    return VGroup(caisse, bande, poignee)


def figure_glaciere():
    """La glacière et ses 10 bouteilles : 6 petites (75 cL) à gauche, 4 grandes (1,5 L) à droite.
    Renvoie (glacière, petites, grandes) ; les bouteilles dépassent du haut de la caisse."""
    gl = glaciere(5.6, 1.2).set_z_index(1)
    pt = VGroup(*[bouteille(0.8, 0.85, EAU) for _ in range(6)]).arrange(RIGHT, buff=0.08, aligned_edge=DOWN)
    gr = VGroup(*[bouteille(1.2, 0.85, ANANAS) for _ in range(4)]).arrange(RIGHT, buff=0.08, aligned_edge=DOWN)
    VGroup(pt, gr).arrange(RIGHT, buff=0.3, aligned_edge=DOWN)
    VGroup(pt, gr).move_to(gl.get_center()).align_to(gl, DOWN).shift(UP * 0.55)
    return gl, pt, gr


def libre(m):
    """Une étiquette qui redit des nombres déjà dits (« 4 × 25 cL ») : hors audit ET hors synchro."""
    hors_audit(m)
    for f in m.get_family():
        f.sans_synchro = True
    return m


def etiquette(morceaux, fs=24, couleur=JAUNE_TITRE):
    """Une étiquette qui redit des nombres déjà dits, en morceaux séparés (« 4 × », « 25 cL ») :
    chaque morceau hors audit et hors synchro (un texte mêlé perd son drapeau à la découpe)."""
    g = VGroup(*[libre(Text(m, font_size=fs, color=couleur, weight=BOLD)) for m in morceaux]).arrange(RIGHT, buff=0.14)
    aligner_base(g)
    return g


def mini_tableau():
    return tableau_unites(larg=0.55, haut=0.42, fs=20)


class ContenanceDefiCM2(PaysageContenanceCM2):
    nom_voix = "cm2-contenance-defi"
    fichier_marques = "contenance_defi_marques.json"
    ceinture = "bleue"

    # Haut de Ti-Margo (coin bas droit) : la carte C reste au-dessus, avec une marge.
    _Q_BAS_MIN = -2.12

    def _disposer_q(self, question, choix, phrase):
        """Énoncés de 4 lignes (Q1 et Q2) : la carte C descendait sur Ti-Margo. L'énoncé est un peu
        resserré (interligne, 94 %), les cartes aussi, et cartes + pause remontent sous l'énoncé."""
        r = super()._disposer_q(question, choix, phrase)
        tete, q, cartes, pause, rebours, ph = r
        if self._ph_couper:
            phrase_reguliere(ph, self._ph_couper)
        if cartes.get_bottom()[1] < self._Q_BAS_MIN:
            haut_cartes = cartes.get_top()[1]
            ecart_pause = pause.get_top()[1] - cartes.get_bottom()[1]
            coin = q.get_corner(UL)
            x0 = cartes.get_left()[0]
            cartes.arrange(DOWN, buff=0.09).align_to(P(x0, 0), LEFT)
            h0 = q.height
            for k in (0.94, 0.92, 0.90, 0.88):  # le moins resserré qui suffit
                q.scale(k * h0 / q.height).arrange(DOWN, aligned_edge=LEFT, buff=0.11 * k / 0.94)
                q.move_to(coin, aligned_edge=UL)
                cartes.shift(UP * (q.get_bottom()[1] - 0.13 - cartes.get_top()[1]))
                if cartes.get_bottom()[1] >= self._Q_BAS_MIN:
                    break
            pause.shift(UP * (cartes.get_bottom()[1] + ecart_pause - pause.get_top()[1]))
            print(f"Q-CARTES haut {haut_cartes:.2f} → {cartes.get_top()[1]:.2f}, bas {cartes.get_bottom()[1]:.2f}")
        return r

    def pause_defi(self, y=-1.45, marge=2.0, xl=0.4):
        """« Mets pause, et cherche ! » en 34, entier, dans la colonne du défi, au-dessus de Ti-Margo."""
        self.au_mot("Mets pause")
        p = self.col(self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE), y, xl)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi de contenances", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défi de contenances")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de bouteilles", "pour tout un marathon ?"], 38, JAUNE_TITRE)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        bs = VGroup(*[bouteille(1.5) for _ in range(3)]).arrange(RIGHT, buff=0.2, aligned_edge=DOWN)
        gs = VGroup(*[gobelet(0.6) for _ in range(4)]).arrange_in_grid(2, 2, buff=0.15)
        fig = VGroup(bs, gs).arrange(RIGHT, buff=0.45, aligned_edge=DOWN).move_to(P(3.5, 0.35))
        self.au_mot("Combien de bouteilles")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(fig, scale=1.1), run_time=0.4)
        self.au_mot("tout un marathon")
        self.play(FadeIn(q[1], shift=UP * 0.2), Wiggle(bs), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Manon, organisatrice de marathon ───────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        XL = 0.9
        pe = manon(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Manon")
        nom = self.t("Manon", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("organise un marathon")
        met = self.bloc(["organisatrice", "de marathon"], 26, JAUNE_TITRE).next_to(pe, DOWN, buff=0.12)
        for m in met:
            m.set_x(pe.get_x())
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        l0 = self.t("Au ravitaillement :", 34)
        self.col(l0, 2.45, XL)
        self.au_mot("Au ravitaillement")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        cs = VGroup(*[coureur(c, 0.95) for c in ("#ef4444", "#2563eb", "#a855f7", "#f97316", "#14b8a6")])
        cs.arrange(RIGHT, buff=0.12).move_to(P(-1.9, 1.7))
        l1 = self.ligne([("servir", WHITE), ("120 coureurs.", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l1, 1.8, XL)
        self.au_mot("doit servir")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("120 coureurs")
        self.play(FadeIn(l1[1], shift=UP * 0.1), LaggedStart(*[FadeIn(c, shift=LEFT * 0.3) for c in cs],
                                                              lag_ratio=0.15), run_time=0.5)
        gb = gobelet(0.8).move_to(P(-2.9, -0.55))
        bt = bouteille(1.6).move_to(P(-1.1, -0.35)).align_to(gb, DOWN)
        l2 = self.ligne([("Chacun :", WHITE), ("un gobelet", WHITE)], 34, buff=0.2)
        self.col(l2, 1.1, XL)
        l2.add(self.t("de 25 cL.", 34, JAUNE_TITRE).next_to(l2, DOWN, buff=0.14).align_to(l2, LEFT))
        self.au_mot("Chacun")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("un gobelet")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(gb, shift=UP * 0.2), run_time=0.3)
        self.au_mot("25 centilitres")
        self.play(FadeIn(l2[2], shift=UP * 0.1), FadeIn(contenance(gb, "25 cL", 26)), run_time=0.3)
        l3 = self.ligne([("Les bouteilles :", WHITE), ("1,5 L.", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l3, -0.15, XL)
        self.au_mot("Les bouteilles")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(bt, shift=UP * 0.2), run_time=0.3)
        self.au_mot("font 1,5 litre")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(contenance(bt, "1,5 L", 26)), run_time=0.3)
        q = self.bloc(["Combien de bouteilles", "faut-il ?"], 38, JAUNE_TITRE)
        self.col(q, -1.2, XL)
        self.au_mot("Combien de bouteilles")
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("faut-il")
        self.play(FadeIn(q[1], shift=UP * 0.15), Wiggle(bt), run_time=0.5)
        self.attendre_voix()

    # ── 02 : un défi se résout en étapes ────────────────────────────────────
    def ecran_etapes(self):
        self.ecran("02-etapes")
        tit = self.ligne([("Un défi se résout", JAUNE_TITRE), ("en étapes.", JAUNE_TITRE)], 42, buff=0.22)
        tit.move_to(P(0, 2.95))
        # même ligne d'écriture : le bas du « e » de « en » sur le bas du « n » de « Un » (le p descend)
        tit[1].shift(UP * (tit[0][1].get_bottom()[1] - tit[1][0].get_bottom()[1]))
        self.au_mot("Un défi se résout")
        self.play(FadeIn(tit[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en étapes")
        self.play(FadeIn(tit[1], shift=UP * 0.1), run_time=0.3)
        XI, XT = -4.6, -2.6
        icones = [
            VGroup(*[gobelet(0.5) for _ in range(6)]).arrange(RIGHT, buff=0.08),
            mini_tableau(),
            VGroup(*[bouteille(0.95) for _ in range(4)]).arrange(RIGHT, buff=0.12, aligned_edge=DOWN),
        ]
        textes = ["la quantité totale", "la même unité", "le nombre de bouteilles"]
        couleurs = [BLEU_D, VERT_OK, ORANGE_RETENUE]
        for k, (ic, tx, co) in enumerate(zip(icones, textes, couleurs)):
            y = 1.55 - 1.45 * k
            ic.move_to(P(XI, y))
            et = self.t(f"Étape {k + 1} :", 38, co)
            lt = self.t(tx, 38)
            lg = VGroup(et, lt).arrange(RIGHT, buff=0.25)
            aligner_base(lg)
            gauche(lg, XT, y)
            self.au_mot(f"Étape {k + 1}")
            self.play(FadeIn(et, shift=UP * 0.1), FadeIn(ic, shift=UP * 0.2), run_time=0.3)
            self.au_mot(tx)
            self.play(FadeIn(lt, shift=UP * 0.1), Indicate(ic, color=co, scale_factor=1.06), run_time=0.4)
        self.attendre_voix()

    # ── 03 : étape 1, la quantité totale (30 L) ─────────────────────────────
    def ecran_total(self):
        self.ecran("03-total")
        XL = 0.5
        quatre = VGroup(*[gobelet(0.7) for _ in range(4)]).arrange(RIGHT, buff=0.12).move_to(P(-4.6, 1.85))
        fl = Arrow(P(-3.15, 1.85), P(-2.35, 1.85), color=VERRE, stroke_width=5, buff=0,
                   max_tip_length_to_length_ratio=0.35)
        un = bouteille(1.25).move_to(P(-1.7, 1.95)).align_to(quatre, DOWN)
        l0 = self.ligne([("120 gobelets", BLEU_D), ("de 25 cL", JAUNE_TITRE)], 40, buff=0.25)
        self.col(l0, 2.5, XL)
        self.au_mot("120 gobelets")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("25 centilitres")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.25)
        l1 = self.ligne([("4 gobelets", BLEU_D), ("= 100 cL", VERT_OK)], 40, buff=0.25)
        self.col(l1, 1.75, XL)
        self.au_mot("4 gobelets")
        self.play(FadeIn(l1[0], shift=UP * 0.1), LaggedStart(*[FadeIn(g, shift=UP * 0.15) for g in quatre],
                                                              lag_ratio=0.15),
                  FadeIn(etiquette(["4", "×", "25 cL"]).next_to(quatre, DOWN, buff=0.18)), run_time=0.45)
        self.au_mot("100 centilitres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        l1b = self.t("= 1 L", 40, VERT_OK)
        l1b.next_to(l1, DOWN, buff=0.25).align_to(l1[1], LEFT)
        self.au_mot("1 litre")
        self.play(FadeIn(l1b, shift=UP * 0.1), GrowArrow(fl), FadeIn(un, shift=LEFT * 0.2),
                  FadeIn(contenance(un, "1 L", 24)), run_time=0.25)
        l2 = self.pile([("120 gobelets", BLEU_D), ("= 30 × 4 gobelets", WHITE)], 38, buff=0.18)
        self.col(l2, -0.35, XL)
        bs = VGroup(*[bouteille(0.62) for _ in range(30)]).arrange_in_grid(3, 10, buff=(0.14, 0.12))
        bs.move_to(P(-3.6, -1.15))
        self.au_mot("litre. 120 gobelets")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("30 fois 4 gobelets")
        self.play(FadeIn(l2[1], shift=UP * 0.1), LaggedStart(*[FadeIn(b, scale=1.4) for b in bs], lag_ratio=0.03),
                  run_time=0.8)
        res = self.gros("30 L d'eau", fs=48)
        hors_audit(res[1])  # posé au mot
        self.col(res, -1.75, XL)
        e30 = contenance(bs, "30 L", 26)
        self.au_mot("30 litres d'eau")
        self.play(FadeIn(res, scale=1.2), FadeIn(e30), run_time=0.35)
        self.play(Indicate(bs, color=VERT_OK, scale_factor=1.04), run_time=0.5)
        self.attendre_voix()

    # ── 04 : étapes 2 et 3, les bouteilles (20 bouteilles) ──────────────────
    def ecran_bouteilles(self):
        self.ecran("04-bouteilles")
        XL = 0.6
        b1 = bouteille(1.4).move_to(P(-5.2, 1.7))
        b2 = VGroup(bouteille(1.4), bouteille(1.4)).arrange(RIGHT, buff=0.15, aligned_edge=DOWN)
        b2.move_to(P(-2.9, 1.7)).align_to(b1, DOWN)
        c2 = SurroundingRectangle(b2, color=ORANGE_RETENUE, buff=0.12, corner_radius=0.1)
        l0 = self.ligne([("Une bouteille", BLEU_D), ("= 1,5 L", VERT_OK)], 40, buff=0.25)
        self.col(l0, 2.3, XL)
        self.au_mot("Une bouteille")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(b1, shift=UP * 0.2), run_time=0.3)
        self.au_mot("1,5 litre")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(contenance(b1, "1,5 L", 26)), run_time=0.25)
        l1 = self.ligne([("2 bouteilles", BLEU_D), ("= 3 L", VERT_OK)], 40, buff=0.25)
        self.col(l1, 1.5, XL)
        self.au_mot("2 bouteilles")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(b2, shift=UP * 0.2), Create(c2), run_time=0.35)
        self.au_mot("3 litres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(contenance(c2, "3 L", 26, buff=0.12)), run_time=0.25)
        l2 = self.ligne([("Pour", WHITE), ("30 L :", JAUNE_TITRE)], 40, buff=0.2)
        self.col(l2, 0.55, XL)
        self.au_mot("Pour 30 litres")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.25)
        l3 = self.t("10 × 2 bouteilles", 40)
        self.col(l3, -0.25, XL)
        paires = VGroup(*[VGroup(bouteille(0.72), bouteille(0.72)).arrange(RIGHT, buff=0.06, aligned_edge=DOWN)
                          for _ in range(10)]).arrange_in_grid(2, 5, buff=(0.32, 0.3))
        paires.move_to(P(-3.6, -1.15))
        cadres = VGroup(*[SurroundingRectangle(p, color=ORANGE_RETENUE, buff=0.06, corner_radius=0.06,
                                               stroke_width=3) for p in paires])
        self.au_mot("10 fois 2 bouteilles")
        self.play(FadeIn(l3, shift=UP * 0.1), LaggedStart(*[FadeIn(VGroup(p, c), scale=1.3)
                                                             for p, c in zip(paires, cadres)], lag_ratio=0.08),
                  run_time=0.6)
        res = self.gros("20 bouteilles", fs=48)
        hors_audit(res[1])  # posé au mot
        self.col(res, -1.3, XL)
        self.au_mot("2 bouteilles, 20 bouteilles")
        self.play(FadeIn(res, scale=1.2), Indicate(paires, color=VERT_OK, scale_factor=1.03), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = bouteille(1.7)
        gs = VGroup(*[gobelet(0.6) for _ in range(3)]).arrange(RIGHT, buff=0.12)
        qm = hors_audit(Text("?", font_size=40, color=ORANGE_RETENUE, weight=BOLD))
        gs2 = VGroup(gs, qm).arrange(RIGHT, buff=0.15)
        g = VGroup(b, gs2).arrange(RIGHT, buff=0.5, aligned_edge=DOWN).move_to(P(-3.8, 1.55))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        self.question_gauche("05-question", "05b-reponse",
                             ["Une bouteille de 1,5 L", "remplit des gobelets", "de 25 cL.", "Combien de gobelets ?"],
                             [self.choix("6 gobelets"), self.choix("4 gobelets"), self.choix("60 gobelets")], 0,
                             ["1,5 L = 150 cL.", "150 ÷ 25 = 6,", "car 6 × 25 = 150.", "6 gobelets."],
                             -0.75, sans_audit=(3,),
                             couper={0: ("1,5 L", "= 150 cL."), 1: ("150 ÷ 25", "= 6,"), 2: ("car 6 × 25", "= 150.")},
                             mot_q="Une bouteille", autres_q=autres_q)

    # ── 06 : le piège (31 L : une bouteille de plus) ────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        XL = 0.4
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        vingt = VGroup(*[bouteille(0.8) for _ in range(20)]).arrange_in_grid(2, 10, buff=(0.12, 0.3))
        vingt.move_to(P(-3.7, 0.9))
        l0 = self.bloc(["Quand il manque un peu,", "on prend une bouteille", "de plus !"], 34, ORANGE_RETENUE)
        self.col(l0, 1.72, XL)
        self.au_mot("Quand il manque")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("une bouteille de plus")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(l0[2], shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("Pour", WHITE), ("31 L", JAUNE_TITRE), ("d'eau :", WHITE)], 38, buff=0.2)
        self.col(l1, 0.38, XL)
        self.au_mot("31 litres d'eau")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("20 bouteilles", BLEU_D), ("→ 30 L,", WHITE)], 38, buff=0.2)
        self.col(l2, -0.37, XL)
        self.au_mot("20 bouteilles")
        self.play(FadeIn(l2[0], shift=UP * 0.1), LaggedStart(*[FadeIn(b, shift=UP * 0.1) for b in vingt],
                                                              lag_ratio=0.04), run_time=0.6)
        e30 = hors_audit(Text("30 L", font_size=30, color=JAUNE_TITRE, weight=BOLD)).next_to(vingt, DOWN, buff=0.2)
        c20 = SurroundingRectangle(vingt, color=VERRE, buff=0.12, corner_radius=0.1, stroke_width=3)
        e30.next_to(c20, DOWN, buff=0.15)
        self.au_mot("donnent 30 litres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(c20), FadeIn(e30), run_time=0.3)
        l3 = self.t("ce n'est pas assez !", 38, ROUGE_ERREUR)
        self.col(l3, -1.12, XL)
        manque = VGroup(DashedVMobject(RoundedRectangle(width=0.6, height=1.0, corner_radius=0.08,
                                                        color=ROUGE_ERREUR, stroke_width=3), num_dashes=18),
                        hors_audit(Text("?", font_size=32, color=ROUGE_ERREUR, weight=BOLD)))
        manque.move_to(P(-3.7, -2.0))
        self.au_mot("pas assez")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(manque, scale=1.2), run_time=0.3)
        b21 = bouteille(0.8).move_to(manque)
        c21 = SurroundingRectangle(b21, color=ORANGE_RETENUE, buff=0.1, corner_radius=0.08)
        res = self.gros("Il en faut 21.", couleur=ORANGE_RETENUE, fs=44)
        hors_audit(res[1])  # posé au mot
        self.col(res, -2.02, XL)
        self.au_mot("en faut 21")
        self.play(FadeIn(res, scale=1.15), FadeOut(manque), FadeIn(b21, shift=DOWN * 0.2), Create(c21), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bd = recipient("bidon", 1.8, 1.4, 0.8, JUS)
        gs = VGroup(*[gobelet(0.55, 0.8, JUS) for _ in range(4)]).arrange_in_grid(2, 2, buff=0.12)
        g = VGroup(bd, gs).arrange(RIGHT, buff=0.6, aligned_edge=DOWN).move_to(P(-3.8, 1.45))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Manon a 18 L de jus.", "Elle sert 40 gobelets", "de 20 cL.",
                              "Combien de L reste-t-il ?"],
                             [self.choix("17,2 L"), self.choix("8 L"), self.choix("10 L")], 2,
                             ["40 × 20 = 800 cL,", "c'est 8 L.", "18 − 8 :", "il reste 10 L."],
                             -0.75, couper={0: ("40 × 20", "= 800 cL,")},
                             mot_q="Manon a 18", autres_q=autres_q)

    # ── 08 : le défi (la glacière) ──────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        gl, pt, gr = figure_glaciere()
        VGroup(pt, gr, gl).move_to(P(-3.4, 0.3))
        XL = 0.4
        l0 = self.t("Une glacière contient", 36)
        self.col(l0, 2.25, XL)
        self.au_mot("Une glacière contient")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(gl, shift=UP * 0.2), run_time=0.35)
        l1 = self.ligne([("6 bouteilles", JAUNE_TITRE), ("de 75 cL", JAUNE_TITRE)], 36, buff=0.2)
        self.col(l1, 1.5, XL)
        self.au_mot("6 bouteilles")
        self.play(FadeIn(l1[0], shift=UP * 0.1), LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in pt],
                                                              lag_ratio=0.12), run_time=0.45)
        self.au_mot("75 centilitres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(contenance(pt, "75 cL", 26).next_to(gl, DOWN, buff=0.2)
                                                       .set_x(pt.get_x())), run_time=0.3)
        l2 = self.ligne([("et 4 bouteilles", JAUNE_TITRE), ("de 1,5 L.", JAUNE_TITRE)], 36, buff=0.2)
        self.col(l2, 0.75, XL)
        self.au_mot("et 4 bouteilles")
        self.play(FadeIn(l2[0], shift=UP * 0.1), LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in gr],
                                                              lag_ratio=0.12), run_time=0.4)
        self.au_mot("1,5 litre")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(contenance(gr, "1,5 L", 26).next_to(gl, DOWN, buff=0.2)
                                                       .set_x(gr.get_x())), run_time=0.3)
        q = self.bloc(["Combien de litres", "en tout ?"], 38, JAUNE_TITRE)
        self.col(q, -0.45, XL)
        self.au_mot("Combien de litres")
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en tout")
        self.play(FadeIn(q[1], shift=UP * 0.1), Wiggle(gl), run_time=0.5)
        self.pause_defi()

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        gl, pt, gr = figure_glaciere()
        VGroup(pt, gr, gl).move_to(P(-3.4, 0.9))
        self.add(pt, gr, gl)
        XL = 0.4
        l1 = self.ligne([("6 × 75", BLEU_D), ("= 450 cL", VERT_OK)], 42, buff=0.3)
        self.col(l1, 2.2, XL)
        self.au_mot("Correction. 6")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(pt, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.3)
        self.au_mot("450 centilitres")
        e450 = hors_audit(Text("450 cL", font_size=28, color=VERT_OK, weight=BOLD))
        e450.next_to(gl, DOWN, buff=0.2).set_x(pt.get_x())
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(e450), run_time=0.3)
        l1b = self.t("= 4,5 L", 42, VERT_OK)
        l1b.next_to(l1, DOWN, buff=0.25).align_to(l1[1], LEFT)
        self.au_mot("4,5 litres")
        e45 = hors_audit(Text("4,5 L", font_size=28, color=VERT_OK, weight=BOLD)).move_to(e450)
        self.play(FadeIn(l1b, shift=UP * 0.1), Transform(e450, e45), run_time=0.35)
        l2 = self.ligne([("4 × 1,5", BLEU_D), ("= 6 L", VERT_OK)], 42, buff=0.3)
        self.col(l2, 0.55, XL)
        self.au_mot("4 fois 1,5")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(gr, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.3)
        self.au_mot("6 litres")
        e6 = hors_audit(Text("6 L", font_size=28, color=VERT_OK, weight=BOLD))
        e6.next_to(gl, DOWN, buff=0.2).set_x(gr.get_x())
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(e6), run_time=0.3)
        l3 = self.ligne([("4,5 + 6", WHITE), ("= 10,5 L", VERT_OK)], 42, buff=0.3)
        self.col(l3, -0.3, XL)
        self.au_mot("4,5 plus 6")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("10,5 litres")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("10,5 L en tout", fs=44)
        hors_audit(res[1])  # 10,5 vient d'être dit
        res.move_to(P(-3.4, -2.0))
        self.au_mot("en tout")
        self.play(FadeIn(res, scale=1.2), Indicate(VGroup(pt, gr, gl), color=VERT_OK, scale_factor=1.03),
                  run_time=0.5)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        gs = VGroup(*[gobelet(0.5) for _ in range(4)]).arrange(RIGHT, buff=0.1)
        bs = VGroup(*[bouteille(1.0) for _ in range(4)]).arrange(RIGHT, buff=0.15, aligned_edge=DOWN)
        fig = VGroup(gs, mini_tableau(), bs).arrange(DOWN, buff=0.45)
        lignes = self.finale_gauche(fig, textes=[
            ("Un défi se fait en étapes :",),
            ("la quantité totale,",),
            ("la même unité,",),
            ("puis le partage.",),
            ("S'il manque un peu :", "une bouteille de plus !")], fs=32)
        self.add(fig)
        self.au_mot("Un défi")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("la quantité totale")
        self.montrer_ligne(lignes[1], Indicate(gs, scale_factor=1.08))
        self.au_mot("la même unité")
        self.montrer_ligne(lignes[2], Indicate(fig[1], scale_factor=1.08))
        self.au_mot("puis le partage")
        self.montrer_ligne(lignes[3], Indicate(bs, scale_factor=1.08))
        self.au_mot("s'il manque")
        self.montrer_ligne(lignes[4])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_etapes()
        self.ecran_total()
        self.ecran_bouteilles()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
