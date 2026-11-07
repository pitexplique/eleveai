# div_diviseurs.py
# EleveAI — Maths 4e — série « Divisibilité et nombres premiers », épisode 05 : LISTER LES DIVISEURS.
# PILOTE de la série. Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : div_lister_diviseurs.
# Décor et métier : Rose, paysagiste. Centres : nature-ecologie.
# Écrans : garde (00) ; les rosiers (01) ; les paires (02) ; les nombres se croisent (03) ;
# la liste (04) ; QUESTION 1 (04q) ; le piège (05) ; QUESTION 2 (05q) ; défi (06) et
# correction (06b) ; ce que tu as appris (07) ; fin (08).
# Voix : manim/voix/4e-div-diviseurs.json ; marques : div_diviseurs_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/div_diviseurs.py DivDiviseurs4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/div_diviseurs.py DivDiviseurs4e -o eleveai-maths-4e-div-diviseurs --media_dir manim/scripts/4e/media-div-05
# Sortie : manim/sorties/4e/maths/divisibilite/05-diviseurs/eleveai-maths-4e-div-diviseurs.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from div_commun import *  # noqa: E402,F403


class DivDiviseurs4e(PaysageDiv):
    nom_voix = "4e-div-diviseurs"
    fichier_marques = "div_diviseurs_marques.json"
    ceinture = "orange"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lister tous les diviseurs", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Lister", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        m = massif(4, 9, pas=0.3, centre=P(-4.4, 0.3))
        l1 = self.lg("Comment n'en oublier", 2.0, 0.75, 46, maxw=8)
        self.dit(l1, "Comment n'en oublier", avec=[LaggedStart(*[FadeIn(f, scale=0.4) for f in m], lag_ratio=0.02)])
        l2 = self.lg("aucun ?", 2.0, -0.1, 54, JAUNE_TITRE, maxw=8)
        self.dit(l2, "aucun ?")
        self.insister(l2, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les rosiers de Rose ────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = rose_paysagiste().move_to(P(-5.9, 2.35))
        tas = en_vrac(36, -5.2, -1.2, -2.6, 1.0)
        self.dit(self.lg("Rose est paysagiste :", 3.2, 3.0, 40, CIEL), "Rose est paysagiste :", avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.lg("elle dessine des jardins.", 3.2, 2.35, 36), "elle dessine des jardins.")
        self.dit(self.lg("Elle veut planter 36 rosiers", 3.2, 1.5, 36), "Elle veut planter 36 rosiers",
                 avec=[LaggedStart(*[FadeIn(f, scale=0.4) for f in tas], lag_ratio=0.03)])
        self.dit(self.lg("en rectangle,", 3.2, 0.9, 36), "en rectangle,")
        self.dit(self.lg("avec des rangées", 3.2, 0.3, 36), "avec des rangées",
                 avec=[Transform(tas, massif(4, 9, pas=0.42, r=0.13, centre=P(-3.2, -0.8)), run_time=1.0)])
        self.dit(self.lg("toutes pareilles.", 3.2, -0.3, 36), "toutes pareilles.")
        q1 = self.lg("Quelles rangées", 3.2, -1.3, 44, JAUNE_TITRE)
        self.dit(q1, "Quelles rangées")
        q2 = self.lg("peut-elle faire ?", 3.2, -2.0, 44, JAUNE_TITRE)
        self.dit(q2, "peut-elle faire ?")
        self.insister(VGroup(q1, q2), 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : chaque rectangle, une paire ────────────────────────────────────
    def ecran_paires(self):
        self.ecran("02-paires")
        self.dit(self.lg("Chaque rectangle, c'est une paire de diviseurs.", 0, 3.15, 40, JAUNE_TITRE, maxw=12),
                 "Chaque rectangle, c'est une paire de diviseurs.")
        poses = [((1, 36), P(0, 2.2), P(0, 1.6), 0.3),
                 ((2, 18), P(-3.6, -0.5), P(-3.6, -1.6), 0.26),
                 ((3, 12), P(0.9, -0.5), P(0.9, -1.6), 0.26),
                 ((4, 9), P(4.6, -0.5), P(4.6, -1.6), 0.26)]
        for (a, b), cm, ce, pas in poses:
            m = massif(a, b, pas=pas, r=0.09, centre=cm)
            e = colorer_paire(F(f"{a} × {b}", 46)).move_to(ce)
            self.dire_eq(e, f"{a} rangée{'s' if a > 1 else ''} de {b}.", echelle=1.2,
                         avec=[LaggedStart(*[FadeIn(f, scale=0.4) for f in m], lag_ratio=0.01)])
        self.attendre_voix(marge=0.8)

    # ── 03 : les deux nombres se croisent ───────────────────────────────────
    def ecran_croiser(self):
        self.ecran("03-croiser")
        tab = self.table_paires([(1, 36), (2, 18), (3, 12), (4, 9)])
        self.play(FadeIn(tab), run_time=0.3)
        y5, y6 = 2.45 - 4 * 0.72, 2.45 - 5 * 0.72
        self.dit(self.lg("Et 5 rangées ?", 3.3, 2.95, 42, CIEL), "Et 5 rangées ?",
                 avec=[FadeIn(T("5", 46, PETIT, audit=False).move_to(P(-4.6, y5)))])
        e = F("36 ÷ 5 : il reste 1.", 40).move_to(P(3.3, 2.2))
        self.dire_eq(e, "36 divisé par 5 : il reste 1.", echelle=1.1)
        non = self.lg("Non.", 3.3, 1.45, 44, PIEGE)
        croix = T("✗", 46, PIEGE, audit=False).move_to(P(-2.8, y5))
        self.dit(non, "Non.", avec=[FadeIn(croix, scale=1.5)])
        six = VGroup(T("6", 46, PETIT, audit=False).move_to(P(-4.6, y6)),
                     T("×", 40, WHITE, audit=False).move_to(P(-3.7, y6)),
                     T("6", 46, GRAND, audit=False).move_to(P(-2.8, y6)))
        carre = massif(6, 6, pas=0.27, r=0.09, centre=P(3.3, -1.3))
        self.dit(self.lg("6 rangées de 6 :", 3.3, 0.65, 38), "6 rangées de 6 :",
                 avec=[FadeIn(six), LaggedStart(*[FadeIn(f, scale=0.4) for f in carre], lag_ratio=0.01)])
        self.dit(self.lg("c'est un carré.", 3.3, 0.05, 38, VERT_OK), "c'est un carré.",
                 avec=[Create(SurroundingRectangle(carre, color=VERT_OK, buff=0.12, stroke_width=3))])
        f1 = Arrow(P(-5.25, 2.45), P(-5.25, y6), color=PETIT, buff=0, stroke_width=6, max_tip_length_to_length_ratio=0.06)
        f2 = Arrow(P(-2.1, y6), P(-2.1, 2.45), color=GRAND, buff=0, stroke_width=6, max_tip_length_to_length_ratio=0.06)
        self.dit(self.lg("Les deux nombres se croisent :", -2.3, -2.85, 38, maxw=7.4), "Les deux nombres se croisent :",
                 avec=[GrowArrow(f1), GrowArrow(f2)])
        stop = self.lg("on s'arrête.", 3.3, -2.85, 40, JAUNE_TITRE, maxw=3.2)
        self.dit(stop, "on s'arrête.", avec=[Circumscribe(six, color=VERT_OK)])
        self.insister(stop, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 04 : la liste ───────────────────────────────────────────────────────
    def ecran_liste(self):
        self.ecran("04-liste")
        self.dit(self.lg("Les diviseurs de 36 :", 0, 3.2, 44, CIEL, maxw=10), "Les diviseurs de 36 :")
        nb = [1, 2, 3, 4, 6, 9, 12, 18, 36]
        e = self.liste(nb, 0.55)
        self.dire_eq(e, "1, 2, 3, 4, 6, 9, 12, 18, 36", echelle=1.4)
        neuf = self.lg("Neuf diviseurs.", 0, -0.75, 46, JAUNE_TITRE)
        self.dit(neuf, "Neuf diviseurs.")
        self.insister(neuf, 1.15, 0.2)
        ar = self.arcs(e, nb, [(1, 36), (2, 18), (3, 12), (4, 9), (6, 6)])
        self.dit(self.lg("On les a trouvés par paires :", 0, -1.7, 38), "On les a trouvés par paires :",
                 avec=[LaggedStart(*[Create(a) for a in ar], lag_ratio=0.25, run_time=1.2)])
        self.dit(self.lg("aucun n'a été oublié.", 0, -2.4, 40, VERT_OK), "aucun n'a été oublié.")
        self.attendre_voix(marge=0.8)

    # ── 04q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        fig = massif(4, 9, pas=0.42, r=0.13, centre=P(-3.4, 0.0))
        cad = Text("36 rosiers", font_size=30, color=CIEL)
        cad.sans_synchro = True
        cad.next_to(fig, UP, buff=0.3)

        def avant(sc):
            sc.eq_dans_q(0, "Lequel n'est pas", "Lequel n'est pas", lettres="")
            sc.eq_dans_q(0, "un diviseur de 36 ?", "un diviseur de 36 ?", lettres="")
            sc.play(LaggedStart(*[FadeIn(f, scale=0.4) for f in fig], lag_ratio=0.01), FadeIn(cad), run_time=0.4)

        def apres(sc):
            sc.reponse(("Réponse B : 8.", "Réponse B : 8."),
                       ("36 ÷ 8 : 4, et il reste 4.", "36 divisé par 8 : 4, et il reste 4."),
                       ("Les autres tombent juste :", "Les autres tombent juste :"),
                       ("3 × 12, 4 × 9.", "3 fois 12, 4 fois 9."))

        self.question_pause("04q-question", "04r-reponse", ["Lequel n'est pas", "un diviseur de 36 ?"],
                            [E("12", 40, lettres=""), E("8", 40, lettres=""), E("9", 40, lettres="")], 1,
                            ["Réponse B : 8.", "36 ÷ 8 : 4, et il reste 4.", "Les autres tombent juste :", "3 × 12, 4 × 9."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.dit(self.lg("Le piège : chercher au hasard.", 0, 3.15, 42, PIEGE, maxw=11.5), "Le piège : chercher au hasard.")
        trouves = [("2", P(-5.0, 1.9)), ("3", P(-3.2, 2.2)), ("6", P(-4.2, 1.0))]
        e = self.lg("On trouve 2, 3, 6…", 3.3, 2.1, 38)
        bulles = [VGroup(Circle(radius=0.42, color=VERT_OK, stroke_width=4), T(s, 44, VERT_OK, audit=False)).move_to(p) for s, p in trouves]
        for b in bulles:
            b[1].move_to(b[0])
        self.dit(e, "On trouve 2, 3, 6…", avec=[LaggedStart(*[FadeIn(b, scale=0.5) for b in bulles], lag_ratio=0.3)])
        oublis = [("18", P(-2.0, 1.25)), ("36", P(-1.2, 2.25))]
        fant = []
        for s, p in oublis:
            c = DashedVMobject(Circle(radius=0.48, color=PIEGE, stroke_width=4), num_dashes=16)
            fant.append(VGroup(c.move_to(p), T(s, 40, PIEGE, audit=False).move_to(p).set_opacity(0.55)))
        self.dit(self.lg("et on oublie 18 ou 36.", 3.3, 1.4, 38, PIEGE), "et on oublie 18 ou 36.",
                 avec=[FadeIn(f, scale=1.3) for f in fant])
        self.dit(self.lg("Et n'oublie jamais 1 et le nombre lui-même :", 0, -0.2, 38, CIEL, maxw=12),
                 "Et n'oublie jamais 1 et le nombre lui-même :")
        c1 = RoundedRectangle(width=1.6, height=1.15, corner_radius=0.14, stroke_color=VERT_OK, stroke_width=4,
                              fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-1.6, -1.35))
        c2 = c1.copy().move_to(P(1.6, -1.35))
        n1 = T("1", 56, VERT_OK, audit=False).move_to(c1)
        n2 = T("36", 56, VERT_OK, audit=False).move_to(c2)
        self.dit(self.lg("tout nombre plus grand que 1", 0, -2.45, 36, maxw=11), "tout nombre plus grand que 1",
                 avec=[FadeIn(c1), FadeIn(n1, scale=1.4), FadeIn(c2), FadeIn(n2, scale=1.4)])
        self.dit(self.lg("a ces deux diviseurs.", 0, -3.0, 36, VERT_OK, maxw=11), "a ces deux diviseurs.")
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        m1 = massif(1, 10, pas=0.42, r=0.13, centre=P(-3.4, 1.0))
        m2 = massif(2, 5, pas=0.42, r=0.13, centre=P(-3.4, -0.6))
        cad = Text("10 rosiers", font_size=30, color=CIEL)
        cad.sans_synchro = True
        cad.next_to(m1, UP, buff=0.35)

        def avant(sc):
            sc.eq_dans_q(0, "Combien de diviseurs", "Combien de diviseurs", lettres="")
            sc.eq_dans_q(0, "a 10 ?", "a 10 ?", lettres="")
            sc.play(FadeIn(m1), FadeIn(m2), FadeIn(cad), run_time=0.4)

        def apres(sc):
            sc.reponse(("Réponse C : 4.", "Réponse C : 4."),
                       ("1 × 10, et 2 × 5.", "1 fois 10, et 2 fois 5."),
                       ("Donc 1, 2, 5 et 10.", "Donc 1, 2, 5 et 10."))

        self.question_pause("05q-question", "05r-reponse", ["Combien de diviseurs", "a 10 ?"],
                            [E("2", 40, lettres=""), E("3", 40, lettres=""), E("4", 40, lettres="")], 2,
                            ["Réponse C : 4.", "1 × 10, et 2 × 5.", "Donc 1, 2, 5 et 10."], avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        p = rose_paysagiste().move_to(P(-5.6, 0.9))
        tas = en_vrac(28, -4.6, -0.8, -0.9, 1.9, c=TULIPE, graine=8)
        self.dit(self.lg("Rose a maintenant 28 tulipes.", 3.2, 1.4, 38), "Rose a maintenant 28 tulipes.",
                 avec=[FadeIn(p), LaggedStart(*[FadeIn(f, scale=0.4) for f in tas], lag_ratio=0.03)])
        q1 = self.lg("Liste tous les diviseurs", 3.2, 0.35, 42, JAUNE_TITRE, maxw=5.6)
        self.dit(q1, "Liste tous les diviseurs")
        q2 = self.lg("de 28.", 3.2, -0.35, 48, JAUNE_TITRE)
        self.dit(q2, "de 28.")
        self.insister(VGroup(q1, q2), 1.1, 0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.9))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.15))), rt=0.25)
        for k, (a, b) in enumerate([(1, 28), (2, 14), (4, 7)]):
            e = colorer_paire(F(f"{a} × {b}", 50)).move_to(P(-3.6, 2.15 - 0.8 * k))
            self.dire_eq(e, f"{a} fois {b}", echelle=1.2)
        self.dit(self.lg("3, 5 et 6", 3.2, 2.15, 44, PIEGE), "3, 5 et 6")
        self.dit(self.lg("ne tombent pas juste.", 3.2, 1.45, 38, PIEGE), "ne tombent pas juste.")
        self.dit(self.lg("Les diviseurs de 28 :", 0, -0.3, 40, CIEL, maxw=10), "Les diviseurs de 28 :")
        nb = [1, 2, 4, 7, 14, 28]
        e = self.liste(nb, -1.35, fs=58)
        self.dire_eq(e, "1, 2, 4, 7, 14, 28", echelle=1.4)
        six = self.lg("Six diviseurs.", 0, -2.55, 46, VERT_OK)
        self.dit(six, "Six diviseurs.")
        self.play(Create(self.cadre_ok(six, 0.16)), run_time=0.2)
        self.attendre_voix(marge=1.0)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        self.XL = -1.5
        fig = VGroup(massif(4, 9, pas=0.27, r=0.09), colorer_paire(F("4 × 9", 40).sans_audit()))
        fig[1].next_to(fig[0], DOWN, buff=0.3)
        lignes = self.finale_colonne([["On cherche les diviseurs par paires,", "en partant de 1."],
                                      ["On s'arrête quand", "les deux nombres se croisent."],
                                      ["1 et le nombre lui-même", "sont toujours des diviseurs."]], fs=40, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_paires()
        self.ecran_croiser()
        self.ecran_liste()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
