# prop_fois_plus.py
# EleveAI — Maths CM1 — série « Proportionnalité » CM, lot CM-A, épisode 02 :
# FOIS PLUS (micro du coach : prop_fois_plus), CM1 SEUL, AVEC VOIX. Paysage
# 16:9, CEINTURE VERTE (la paysage complète du niveau : situation, schéma de
# billes, × 2 puis × 3, le piège « 3 fois plus ≠ 3 de plus », 2 questions-
# pauses, défi corrigé). Short jumeau : prop_fois_plus_short.py (blanche, la Lune).
# ⭐ Méthode travaillée : « n fois plus » = on MULTIPLIE les deux quantités par
# le même nombre ; elle se VOIT sur le schéma de billes (une salade = un rond,
# une rangée = une ligne de ronds ; 3 fois plus de rangées = le bloc recopié
# 3 fois). ⛔ Pas de produit en croix ; « × » écrit, la voix dit « fois ».
# ⭐ Leurres : 1. ajouter au lieu de multiplier (question 1 : 9 = 4 + 5 ;
# question 2 : 13 = 10 + 3 ; piège : 15 = 12 + 3) ; 3. mauvais nombre
# (question 1 : 24 = 4 × 6 ; question 2 : 12 = 10 + 2).
#
# Décor et métier : NATURE-ÉCOLOGIE, Fatou, MARAÎCHÈRE : ses rangées de
# salades, puis ses ruches (défi). Centres d'intérêt : nature-ecologie.
# Donnée réelle (WebSearch, 01/11/2026) : « 2 ruches donnent 20 kilos de miel
# en un an » (10 kg par ruche) : FranceAgriMer, fiche filière apiculture 2026 :
# rendement moyen 15,2 kg par ruche en 2024 (22,5 kg en 2023, 14 kg en 2021),
# 12 kg par ruche dans les ruchers de moins de 50 ruches (le cas d'une
# maraîchère). 10 kg est un ordre de grandeur bas mais réaliste : voix gardée.
#
# Micro → écrans : situation (01), les billes (02), 2 fois plus (03), 3 fois
# plus (04), QUESTION 1 (05), le piège (06), QUESTION 2 (07), défi (08) et
# correction (08b), ce que tu as appris (09), fin (10).
#
# Voix : manim/voix/cm1-prop-fois-plus.json (validée par Frédéric le 01/11,
# débit −10), WAV dans public/sons/cm1-prop-fois-plus/ ; marques mot à mot :
# manim/scripts/cm1/prop_fois_plus_marques.json (scripts/marques_dump.ps1 puis
# scripts/cues2marques.py).
# Outils : ../6e/prop_commun.py + manim/canvas_proportion.py (Billes), non modifiés.
# Ajouté ICI : fatou() (chapeau de paille), salade(), ruche(), rangs() (le
# schéma de billes en rangées, posé au mot) et ligne_rep() bornée (prop_tableau).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/prop_fois_plus.py PropFoisPlusCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/prop_fois_plus.py PropFoisPlusCM1 -o eleveai-maths-cm1-prop-fois-plus --media_dir manim/scripts/cm1/media-prop-fois-plus
# Sortie : manim/sorties/cm1/maths/proportionnalite/02-fois-plus/eleveai-maths-cm1-prop-fois-plus.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

SALADE = "#4ade80"
SALADE_F = "#15803d"
TOMATE = "#ef4444"
MIEL = "#f59e0b"
GRAINE = "#d6a35c"
TERRE = "#78350f"

# le schéma de billes : 6 ronds par rangée, les rangées l'une sous l'autre
ECART = 0.58
X0 = -3.9   # le centre du premier rond de chaque rangée (place pour « 2 rangées » à gauche)
Y0 = 2.0    # la première rangée


def fatou(s=1.0):
    """Fatou, maraîchère : tenue verte, chapeau de paille."""
    p = personne(peau="#8d5524", tenue="#15803d", cheveux="#1f2937", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 3.4, height=r * 0.55, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.55)
    calotte = AnnularSector(inner_radius=0, outer_radius=r * 0.95, angle=PI, start_angle=0, fill_color="#eab308",
                            fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.95)
    ruban = Rectangle(width=r * 1.9, height=r * 0.18, fill_color="#dc2626", fill_opacity=1,
                      stroke_width=0).move_to(c + UP * r * 0.7)
    p.add(bord, calotte, ruban)
    return p


def salade(r=0.24):
    """Une salade vue de dessus : feuilles vert clair, cœur plus foncé."""
    f = VGroup(*[Circle(radius=r * 0.62, fill_color=SALADE, fill_opacity=1, stroke_color=SALADE_F, stroke_width=2)
                 .move_to(P(r * 0.42 * np.cos(a), r * 0.42 * np.sin(a))) for a in np.linspace(0, TAU, 5, endpoint=False)])
    coeur = Circle(radius=r * 0.4, fill_color="#86efac", fill_opacity=1, stroke_color=SALADE_F, stroke_width=2)
    return VGroup(f, coeur)


def ruche(s=1.0):
    """Une ruche en paille (trois boudins empilés) et sa petite porte."""
    etages = VGroup(*[RoundedRectangle(width=(0.9 - 0.18 * k) * s, height=0.26 * s, corner_radius=0.12 * s,
                                       fill_color=MIEL, fill_opacity=1, stroke_color="#92400e", stroke_width=3)
                      .move_to(P(0, (0.13 + 0.24 * k) * s)) for k in range(3)])
    porte = Ellipse(width=0.22 * s, height=0.14 * s, fill_color="#1f2937", fill_opacity=1,
                    stroke_width=0).move_to(P(0, 0.12 * s))
    pied = Rectangle(width=1.0 * s, height=0.06 * s, fill_color="#92400e", fill_opacity=1,
                     stroke_width=0).move_to(P(0, -0.02 * s))
    return VGroup(pied, etages, porte)


def rangs(n, par=6, couleur=SALADE, x0=X0, y0=Y0, ecart=ECART, r=0.2):
    """n rangées de `par` ronds (le schéma de billes, Billes du module, en
    rangées). .rangees[k] : la k-ième rangée."""
    bi = Billes(par, n, r=r, ecart=ecart, couleur=couleur)
    bi.shift(P(x0, y0) - bi.billes[0][0].get_center())
    return bi


def cadre_rangs(bi, k0, k1, couleur=AMBRE):
    """Un cadre autour des rangées k0 à k1 (comprises)."""
    return SurroundingRectangle(VGroup(*bi.rangees[k0:k1 + 1]), color=couleur, buff=0.1, corner_radius=0.12,
                                stroke_width=4)


class PropFoisPlusBase(PaysageProp):
    nom_voix = "cm1-prop-fois-plus"
    fichier_marques = "prop_fois_plus_marques.json"
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_commun, à la taille de la ligne remplacée et bornée à
        droite (BORD_X), comme prop_tableau.py."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def serrer(self, lg, droite=5.85):
        """Une ligne qu'on va AGRANDIR (insister) garde de la marge à droite."""
        g = lg.get_left()[0]
        if lg.get_right()[0] > droite:
            lg.scale_to_fit_width(droite - g).align_to(P(g, 0), LEFT)
        return lg

    def ligne_col(self, morceaux, y, fs=46):
        return self.col(self.ligne(morceaux, fs), y)

    def nom_rangees(self, bi, k, txt, couleur=WHITE, fs=30):
        """« 2 rangées » écrit à GAUCHE de la rangée k du schéma."""
        return self.t(txt, fs, couleur).next_to(bi.rangees[k], LEFT, buff=0.35)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Fois plus", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Fois plus")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        bi = rangs(3, x0=-3.6, y0=1.0)
        sal = VGroup(*[salade().move_to(b) for row in bi.billes for b in row])
        q = self.ligne([("3 fois plus de rangées :", WHITE)], 40)
        self.serrer(self.col(q, 0.75, xl=0.4), 5.6)
        self.au_mot("3 fois plus")
        self.play(LaggedStart(*[FadeIn(s, scale=0.5) for s in sal], lag_ratio=0.04), FadeIn(q, shift=RIGHT * 0.2),
                  run_time=0.9)
        self.au_mot("combien")
        q2 = self.t("combien de salades ?", 44, ORANGE_RETENUE)
        self.serrer(self.col(q2, -0.1, xl=0.4), 5.6)
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.4)
        self.insister(q2, 1.15, 0.25, about=q2.get_left())
        self.attendre_voix(marge=0.6)

    # ── 01 : Fatou, maraîchère, et sa rangée de 6 salades ──────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = fatou(1.0).move_to(P(-5.0, -0.5))
        sol = RoundedRectangle(width=4.0, height=0.8, corner_radius=0.2, fill_color=TERRE, fill_opacity=1,
                               stroke_width=0).move_to(P(-3.3 + 2.5 * ECART, -1.2))
        bi = rangs(1, x0=-3.3, y0=-1.2)
        sal = VGroup(*[salade().move_to(b) for b in bi.rangees[0]])
        self.au_mot("Voici Fatou")
        nom = self.t("Fatou", 42, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("maraîchère")
        met = self.t("maraîchère", 34, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.5)
        self.au_mot("légumes")
        l0 = self.bloc(["Elle fait pousser", "des légumes."], 40)
        self.col(l0, 2.2)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), FadeIn(sol, shift=UP * 0.2), run_time=0.5)
        self.au_mot("1 rangée")
        l1 = self.ligne([("1 rangée", WHITE), ("→", WHITE), ("6 salades", SALADE)], 46)
        self.col(l1, 0.2)
        self.serrer(l1)
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), FadeIn(l1[1]), run_time=0.4)
        self.au_mot("6 salades")
        self.play(FadeIn(l1[2], scale=1.3), LaggedStart(*[GrowFromCenter(s) for s in sal], lag_ratio=0.15),
                  run_time=1.0)
        self.insister(l1[2], 1.15, 0.25, about=l1[2].get_left())
        self.attendre_voix()

    # ── 02 : on dessine chaque salade par un rond ───────────────────────────
    def ecran_billes(self):
        self.ecran("02-billes")
        bi = rangs(1)
        sal = VGroup(*[salade().move_to(b) for b in bi.rangees[0]])
        self.add(sal)
        self.au_mot("On dessine")
        l0 = self.bloc(["une salade = un rond"], 46)
        self.col(l0, 2.0)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("par un rond")
        self.play(LaggedStart(*[Transform(s, b) for s, b in zip(sal, bi.rangees[0])], lag_ratio=0.12), run_time=1.2)
        self.au_mot("1 rangée")
        nom = self.nom_rangees(bi, 0, "1 rangée")
        l1 = self.ligne([("1 rangée :", WHITE), ("6 ronds", SALADE)], 48)
        self.col(l1, 0.6)
        self.play(FadeIn(nom, shift=RIGHT * 0.2), FadeIn(l1[0], shift=RIGHT * 0.2), Create(cadre_rangs(bi, 0, 0)),
                  run_time=0.5)
        self.au_mot("6 ronds")
        nums = VGroup(*[self.t(str(k + 1), 24, WHITE).next_to(b, UP, buff=0.12) for k, b in enumerate(bi.rangees[0])])
        for n in nums[:-1]:
            n._pas_audit = n.sans_synchro = True  # on compte les ronds : 1, 2… jusqu'à 6
        self.play(FadeIn(l1[1], scale=1.3), LaggedStart(*[FadeIn(n) for n in nums], lag_ratio=0.1), run_time=0.8)
        self.attendre_voix()

    # ── 03 : 2 rangées, 2 fois plus de salades ──────────────────────────────
    def ecran_deux(self):
        self.ecran("03-deux")
        bi = rangs(2)
        self.add(bi.rangees[0], self.nom_rangees(bi, 0, "1 rangée"))
        l6 = self.ligne([("1 rangée → 6", WHITE)], 40)
        l6._pas_audit = l6.sans_synchro = True  # rappel de l'écran d'avant
        self.add(self.col(l6, 2.9))
        self.au_mot("2 rangées")
        nom2 = self.nom_rangees(bi, 1, "2 rangées", AMBRE)
        self.play(TransformFromCopy(bi.rangees[0], bi.rangees[1]), FadeIn(nom2, shift=RIGHT * 0.2), run_time=0.7)
        l1 = self.ligne([("2 fois plus", AMBRE), ("de rangées", WHITE)], 42)
        self.col(l1, 1.9)
        self.au_mot("2 fois plus de rangées")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Create(cadre_rangs(bi, 0, 0)), Create(cadre_rangs(bi, 1, 1)),
                  run_time=0.5)
        l2 = self.ligne([("2 fois plus", AMBRE), ("de salades", SALADE)], 42)
        self.col(l2, 1.0)
        self.au_mot("Donc 2 fois plus")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(bi, color=AMBRE, scale_factor=1.05), run_time=0.6)
        lg = self.ligne([("6 ×", WHITE), ("2", AMBRE), ("=", WHITE), ("12 salades", VERT_OK)], 48)
        self.col(lg, -0.3)
        self.serrer(lg)
        self.au_mot("6 fois")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("2, égale")
        self.play(FadeIn(lg[1], scale=1.3), FadeIn(lg[2]), run_time=0.3)
        self.au_mot("12 salades")
        self.play(FadeIn(lg[3], scale=1.3), run_time=0.4)
        self.insister(lg[3], 1.15, 0.25, about=lg[3].get_left())
        self.attendre_voix()

    # ── 04 : 3 fois plus de rangées : 6 rangées, 36 salades ─────────────────
    def ecran_trois(self):
        self.ecran("04-trois")
        bi = rangs(6)
        c01 = cadre_rangs(bi, 0, 1)
        self.add(bi.rangees[0], bi.rangees[1], c01)
        l12 = self.ligne([("2 rangées → 12", WHITE)], 40)
        l12._pas_audit = l12.sans_synchro = True  # rappel de l'écran d'avant
        self.add(self.col(l12, 2.9))
        self.au_mot("3 fois plus de rangées")
        l1 = self.ligne([("3 fois plus", AMBRE), ("de rangées", WHITE)], 42)
        self.col(l1, 1.9)
        c23, c45 = cadre_rangs(bi, 2, 3), cadre_rangs(bi, 4, 5)
        self.play(FadeIn(l1, shift=RIGHT * 0.2),
                  TransformFromCopy(VGroup(bi.rangees[0], bi.rangees[1], c01), VGroup(bi.rangees[2], bi.rangees[3], c23)),
                  run_time=0.4)
        self.play(TransformFromCopy(VGroup(bi.rangees[0], bi.rangees[1], c01), VGroup(bi.rangees[4], bi.rangees[5], c45)),
                  run_time=0.4)
        self.au_mot("6 rangées")
        nom6 = self.nom_rangees(bi, 5, "6 rangées", AMBRE)
        fois = VGroup(*[self.t(s, 30, AMBRE).next_to(c, LEFT, buff=0.3) for s, c in
                        (("1 fois", c01), ("2 fois", c23), ("3 fois", c45))])
        for f in fois:
            f._pas_audit = f.sans_synchro = True  # on compte les blocs recopiés
        self.play(FadeIn(nom6.next_to(c45, DOWN, buff=0.15).align_to(c45, LEFT), shift=UP * 0.2),
                  LaggedStart(*[FadeIn(f, shift=RIGHT * 0.2) for f in fois], lag_ratio=0.3), run_time=0.8)
        l2 = self.ligne([("3 fois plus", AMBRE), ("de salades", SALADE)], 42)
        self.col(l2, 1.0)
        self.au_mot("Elle aura")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        lg = self.ligne([("12 ×", WHITE), ("3", AMBRE), ("=", WHITE), ("36 salades", VERT_OK)], 48)
        self.col(lg, -0.3)
        self.serrer(lg)
        self.au_mot("12 fois")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.2), Indicate(c01, color=AMBRE), run_time=0.35)
        self.au_mot("3, égale")
        self.play(FadeIn(lg[1], scale=1.3), FadeIn(lg[2]), run_time=0.3)
        self.au_mot("36 salades")
        self.play(FadeIn(lg[3], scale=1.3), Indicate(VGroup(*bi.rangees), color=VERT_OK, scale_factor=1.04), run_time=0.6)
        self.insister(lg[3], 1.15, 0.25, about=lg[3].get_left())
        self.attendre_voix()

    # ── 05 : QUESTION 1 (1 sachet = 4 graines ; 5 sachets ?) ────────────────
    def sachet(self):
        """Un sachet de graines (papier kraft, 4 graines dessinées dessus)."""
        s = RoundedRectangle(width=1.1, height=1.4, corner_radius=0.1, fill_color="#fde68a", fill_opacity=1,
                             stroke_color="#92400e", stroke_width=4)
        haut = Rectangle(width=1.1, height=0.2, fill_color="#92400e", fill_opacity=1, stroke_width=0)
        haut.align_to(s, UP)
        fleur_s = VGroup(*[Circle(radius=0.14, fill_color=TOMATE, fill_opacity=1, stroke_width=0)
                           .move_to(P(0.13 * np.cos(a), 0.13 * np.sin(a))) for a in np.linspace(0, TAU, 5, endpoint=False)],
                         Dot(radius=0.07, color="#fde047")).move_to(s.get_center() + UP * 0.05)
        return VGroup(s, haut, fleur_s)

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        sac = self.sachet().move_to(P(-3.3, 1.4))
        self.add(sac)
        bi = rangs(5, par=4, couleur=GRAINE, x0=-4.2, y0=1.9, ecart=0.62)
        noms = VGroup(*[self.t(f"sachet {k + 1}", 26, GRAINE).next_to(bi.rangees[k], LEFT, buff=0.3) for k in range(5)])
        for n in noms[:-1]:
            n._pas_audit = n.sans_synchro = True  # on compte les sachets jusqu'à 5

        def apres(sc):
            l0 = sc.ligne_rep(0, ["5 fois plus", "de graines :"])
            l1 = sc.ligne_rep(1, ["4 ×", "5 =", "20 graines."])
            sc.au_mot("5 sachets")
            sc.play(FadeOut(sac), run_time=0.25)
            sc.play(LaggedStart(*[AnimationGroup(FadeIn(r, shift=RIGHT * 0.2), FadeIn(n)) for r, n in
                                  zip(bi.rangees, noms)], lag_ratio=0.2), run_time=1.0)
            sc.au_mot("Donc 5 fois plus")
            sc.play(FadeIn(l0, shift=UP * 0.15), run_time=0.3)
            sc.au_mot("4 fois")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("5, égale")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("20 graines")
            sc.play(FadeIn(l1[2], scale=1.3), Indicate(bi, color=VERT_OK, scale_factor=1.04), run_time=0.5)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["1 sachet : 4 graines.", "Combien de graines", "dans 5 sachets ?"],
                            [self.t("9 graines", 34), self.t("20 graines", 34), self.t("24 graines", 34)], 1,
                            ["5 fois plus de graines :", "4 × 5 = 20 graines."], mot_q="1 sachet", autres_r=apres)

    # ── 06 : le piège : 3 fois plus, ce n'est pas 3 de plus ─────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 48, ROUGE_ERREUR).move_to(P(0, 3.1))
        self.play(Write(tit), run_time=0.5)
        self.au_mot("3 fois plus, ce")
        a = self.tampon("3 fois plus", VERT_OK, 42)
        b = self.tampon("3 de plus", ROUGE_ERREUR, 42)
        neq = self.t("≠", 64, WHITE)
        g = VGroup(a, neq, b).arrange(RIGHT, buff=0.4).move_to(P(0, 2.0))
        self.play(FadeIn(a, scale=1.3), run_time=0.35)
        self.au_mot("pas 3 de plus")
        self.play(FadeIn(neq), FadeIn(b, scale=1.3), run_time=0.4)
        bi = rangs(6, y0=0.85, ecart=0.5, r=0.17)
        c01 = cadre_rangs(bi, 0, 1)
        self.au_mot("2 rangées")
        nom = self.t("2 rangées", 30).next_to(c01, LEFT, buff=0.3)
        self.play(FadeIn(VGroup(bi.rangees[0], bi.rangees[1]), shift=DOWN * 0.2), Create(c01), FadeIn(nom), run_time=0.5)
        self.au_mot("12 salades")
        l12 = self.ligne_col([("2 rangées :", WHITE), ("12 salades", SALADE)], 0.65, fs=40)
        l12[0]._pas_audit = l12[0].sans_synchro = True
        self.play(FadeIn(l12, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("3 fois plus de rangées")
        c23, c45 = cadre_rangs(bi, 2, 3), cadre_rangs(bi, 4, 5)
        src = VGroup(bi.rangees[0], bi.rangees[1], c01)
        self.play(TransformFromCopy(src, VGroup(bi.rangees[2], bi.rangees[3], c23)), run_time=0.5)
        self.play(TransformFromCopy(src, VGroup(bi.rangees[4], bi.rangees[5], c45)), run_time=0.5)
        ok = self.ligne_col([("12 × 3 =", WHITE), ("36", VERT_OK)], -0.35, fs=48)
        ok[0]._pas_audit = ok[0].sans_synchro = True  # rappel : 12 salades (écrit), 3 fois plus (écrit)
        self.au_mot("36 salades")
        self.play(FadeIn(ok[0], shift=RIGHT * 0.2), FadeIn(ok[1], scale=1.3), run_time=0.4)
        coche = self.coche(VERT_OK, 0.3).next_to(ok, RIGHT, buff=0.3)
        self.play(Create(coche), run_time=0.3)
        faux = self.ligne_col([("12 + 3 =", ROUGE_ERREUR), ("15", ROUGE_ERREUR)], -1.35, fs=48)
        faux[0]._pas_audit = faux[0].sans_synchro = True  # « 3 de plus » : le leurre, dit plus haut
        self.au_mot("pas 15")
        self.play(FadeIn(faux, shift=RIGHT * 0.2), run_time=0.35)
        self.play(Create(croix(faux, sw=7)), Indicate(b, color=ROUGE_ERREUR), run_time=0.45)
        self.insister(ok, 1.15, 0.25, about=ok.get_left())
        self.attendre_voix()

    # ── 07 : QUESTION 2 (2 rangées = 10 pieds ; 3 fois plus de rangées ?) ───
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bi = rangs(6, par=5, couleur=TOMATE, x0=-4.1, y0=2.0, ecart=0.6, r=0.2)
        c01, c23, c45 = cadre_rangs(bi, 0, 1), cadre_rangs(bi, 2, 3), cadre_rangs(bi, 4, 5)
        src = VGroup(bi.rangees[0], bi.rangees[1], c01)
        self.add(src)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["3 fois plus", "de pieds :"])
            l1 = sc.ligne_rep(1, ["10 ×", "3 =", "30 pieds."])
            sc.au_mot("3 fois plus de rangées")
            sc.play(TransformFromCopy(src, VGroup(bi.rangees[2], bi.rangees[3], c23)), run_time=0.45)
            sc.play(TransformFromCopy(src, VGroup(bi.rangees[4], bi.rangees[5], c45)), run_time=0.45)
            sc.au_mot("donc 3 fois plus")
            sc.play(FadeIn(l0, shift=UP * 0.15), run_time=0.3)
            sc.au_mot("10 fois")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), Indicate(c01, color=AMBRE), run_time=0.3)
            sc.au_mot("3, égale")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("30 pieds")
            sc.play(FadeIn(l1[2], scale=1.3), Indicate(bi, color=VERT_OK, scale_factor=1.04), run_time=0.5)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["2 rangées : 10 pieds", "de tomates.", "3 fois plus de rangées : ?"],
                            [self.t("13 pieds", 34), self.t("30 pieds", 34), self.t("12 pieds", 34)], 1,
                            ["3 fois plus de pieds :", "10 × 3 = 30 pieds."], mot_q="2 rangées", autres_r=apres)

    # ── 08 : défi : les ruches de Fatou ─────────────────────────────────────
    def ruches(self, n, y, x0=-5.4, s=0.62, pas=1.05, dy=0.8):
        """n ruches, par paires DEBOUT (une paire = les 2 ruches du départ,
        l'une sur l'autre, encadrée) ; y : la ruche du haut."""
        rs = VGroup(*[ruche(s) for _ in range(n)])
        for k, r in enumerate(rs):
            r.move_to(P(x0 + (k // 2) * pas, y - (k % 2) * dy))
        return rs

    def paires(self, rs, couleur=AMBRE):
        return VGroup(*[SurroundingRectangle(VGroup(rs[k], rs[k + 1]), color=couleur, buff=0.1, corner_radius=0.12,
                                             stroke_width=4) for k in range(0, len(rs), 2)])

    def lignes_defi(self):
        l0 = self.ligne([("2 ruches", WHITE), ("→", WHITE), ("20 kg", MIEL)], 46)
        l1 = self.ligne([("4 ruches", WHITE), ("→", WHITE), ("?", ORANGE_RETENUE)], 46)
        l2 = self.ligne([("10 ruches", WHITE), ("→", WHITE), ("?", ORANGE_RETENUE)], 46)
        for lg, y in zip((l0, l1, l2), (1.9, 0.6, -0.4)):
            self.col(lg, y, xl=1.2)
        return l0, l1, l2

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        rs = VGroup(ruche(1.0).move_to(P(-4.4, 1.2)), ruche(1.0).move_to(P(-3.0, 1.2)))
        self.au_mot("des ruches")
        self.play(LaggedStart(*[FadeIn(r, shift=UP * 0.3) for r in rs], lag_ratio=0.3), run_time=0.7)
        l0, l1, l2 = self.lignes_defi()
        self.au_mot("2 ruches")
        self.play(FadeIn(l0[0], shift=RIGHT * 0.2), FadeIn(l0[1]), run_time=0.35)
        self.au_mot("20 kilos")
        an = self.t("en un an", 30, MIEL).next_to(l0, DOWN, buff=0.12).align_to(l0, RIGHT)
        self.play(FadeIn(l0[2], scale=1.3), run_time=0.35)
        self.au_mot("en un an")
        self.play(FadeIn(an), run_time=0.2)
        self.au_mot("4 ruches")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("10 ruches")
        for m in l2:
            m.sans_synchro = True  # « 10 » n'a pas de marque à lui (cue « Et 10 ») : posé au mot
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.3)
        self.pause_defi(y=-1.3)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.5)
        r4 = self.ruches(4, 2.0)
        r10 = self.ruches(10, -0.5)
        p4, p10 = self.paires(r4), self.paires(r10)
        self.au_mot("4 ruches")
        self.play(LaggedStart(*[FadeIn(r, shift=UP * 0.2) for r in r4], lag_ratio=0.15), run_time=0.45)
        l1 = self.ligne([("2 fois plus", AMBRE)], 40)
        self.col(l1, 2.0, xl=1.2)
        self.au_mot("2 fois plus")
        self.play(Create(p4), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.35)
        lg1 = self.ligne([("20 ×", WHITE), ("2", AMBRE), ("=", WHITE), ("40 kg", VERT_OK)], 46)
        self.col(lg1, 1.2, xl=1.2)
        lg1[0].sans_synchro = lg1[1].sans_synchro = True  # posés au mot « 20 fois 2 »
        self.au_mot("20 fois 2")
        self.play(FadeIn(lg1[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("2, égale")
        self.play(FadeIn(lg1[1], scale=1.3), FadeIn(lg1[2]), run_time=0.3)
        self.au_mot("40 kilos")
        self.play(FadeIn(lg1[3], scale=1.3), run_time=0.4)
        self.au_mot("10 ruches")
        self.play(LaggedStart(*[FadeIn(r, shift=UP * 0.2) for r in r10], lag_ratio=0.08), run_time=0.5)
        l2 = self.ligne([("5 fois plus", AMBRE)], 40)
        self.col(l2, -0.5, xl=1.2)
        self.au_mot("5 fois plus")
        self.play(LaggedStart(*[Create(p) for p in p10], lag_ratio=0.2), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        lg2 = self.ligne([("20 ×", WHITE), ("5", AMBRE), ("=", WHITE), ("100 kg", VERT_OK)], 46)
        self.col(lg2, -1.3, xl=1.2)
        lg2[0].sans_synchro = lg2[1].sans_synchro = True  # posés au mot « 20 fois 5 »
        self.au_mot("20 fois 5")
        self.play(FadeIn(lg2[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("5, égale")
        self.play(FadeIn(lg2[1], scale=1.3), FadeIn(lg2[2]), run_time=0.3)
        self.au_mot("100 kilos")
        self.play(FadeIn(lg2[3], scale=1.3), run_time=0.4)
        self.insister(lg2[3], 1.2, 0.25, about=lg2[3].get_left())
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        bi = rangs(6, r=0.17, ecart=0.5)
        fig = VGroup(bi, cadre_rangs(bi, 0, 1), cadre_rangs(bi, 2, 3), cadre_rangs(bi, 4, 5))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Une quantité est 3 fois plus grande :", "l'autre est aussi 3 fois plus grande."),
            ("On multiplie les deux", "par le même nombre."),
            ("3 fois plus,", "ce n'est pas 3 de plus !")], fs=38)
        self.au_mot("Quand une")
        self.montrer_ligne(lignes[0], Indicate(fig[1:], color=AMBRE))
        self.au_mot("On multiplie")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et 3 fois plus")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_billes()
        self.ecran_deux()
        self.ecran_trois()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropFoisPlusCM1(PropFoisPlusBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
