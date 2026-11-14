# contenance_comparer.py
# EleveAI — Maths CE2 — série « Contenance », épisode 03 : comparer des contenances
# (micro ce2_contenance_comparer, notion contenance), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE.
# Short jumeau : film Ti Margo (le saladier, réponse B).
# Décor et métier : Théo, ENTRAÎNEUR DE FOOTBALL, les gourdes avant le match (centre : sport).
# Mapping micro → écrans : 02 (même unité : 40 cL et 60 cL), 03 (deux unités : 5 dL = 50 cL < 75 cL),
# 05 (piège de la forme : bouteille fine → saladier), 07 (défi : ranger 1 L, 8 dL, 90 cL),
# questions 04 (1 L ou 75 cL, A) et 06 (1 L dans un seau large, B).
# Voix : manim/voix/ce2-contenance-comparer.json (validée le 14/11, Julie, débit −6) ;
# marques : contenance_comparer_marques.json (python manim/scripts/ce2/perimetre_marques.py contenance:comparer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/contenance_comparer.py ContenanceComparerCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/contenance_comparer.py ContenanceComparerCE2 -o eleveai-maths-ce2-contenance-comparer --media_dir manim/scripts/ce2/media-cont-03
# Sortie : manim/sorties/ce2/maths/contenance/03-comparer/eleveai-maths-ce2-contenance-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_ce2_commun import *  # noqa: E402,F403

H_L = 2.0  # hauteur du corps d'une bouteille de 1 L
SPORT = "#22c55e"


def bouteille(cl, couleur=EAU, larg=0.85):
    return recipient("bouteille", H_L * cl / 100, larg, 0.85, couleur)


def gourde(cl, couleur=EAU, larg=0.8):
    return recipient("gourde", H_L * cl / 100, larg, 0.85, couleur)


def bol(larg=3.0, h=1.0, niveau=0.45, couleur=EAU):
    """Un saladier (bol) large et bas : demi-ellipse ouverte vers le HAUT, et son liquide au fond."""
    a = larg / 2
    pts = [P(a * np.cos(t), h * np.sin(t)) for t in np.linspace(PI, 2 * PI, 40)]
    corps = VMobject(stroke_color=VERRE, stroke_width=5).set_points_smoothly(pts)
    haut = Line(P(-a, 0), P(a, 0), color=VERRE, stroke_width=2, stroke_opacity=0.5)
    y0 = -h + h * niveau
    t0 = np.arcsin(y0 / h)  # dans [-PI/2, 0]
    arc = [P(a * np.cos(t), h * np.sin(t)) for t in np.linspace(PI - t0, 2 * PI + t0, 40)]
    liq = Polygon(*arc, fill_color=couleur, fill_opacity=0.9, stroke_width=0).scale(0.96)
    liq.align_to(corps, DOWN).shift(UP * 0.04)
    g = VGroup(liq, corps, haut)
    g.liquide, g.corps = liq, corps
    return g


def ballon(r=0.32):
    b = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#111827", stroke_width=2)
    pe = RegularPolygon(5, fill_color="#111827", fill_opacity=1, stroke_width=0).scale(r * 0.38).move_to(b)
    return VGroup(b, pe)


class ContenanceComparerBase(PaysageContenanceCE2):
    nom_voix = "ce2-contenance-comparer"
    fichier_marques = "contenance_comparer_marques.json"
    ceinture = "orange"

    def aux_extraits(self, morceaux, extraits, run_time=0.18):
        """Chaque morceau à SON extrait de la voix (comme contenance_relations)."""
        for m, ex in zip(morceaux, extraits):
            for f in m.get_family():
                f.sans_synchro = True
            ex = list(ex) if isinstance(ex, (tuple, list)) else [ex]
            ex, n, delai = (ex + [1, 0.0][len(ex) - 1:])[:3]
            self.au_mot(ex, n)
            self.wait(0.07 + delai)
            self.play(FadeIn(m, shift=UP * 0.08), run_time=run_time)

    def kevin_maya(self, pos, k=1.0):
        a, b = gourde(50), bouteille(75, EAU, 0.8)
        return rangee_recipients([a, b], 0.9).scale(k).move_to(pos)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des contenances", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer des contenances")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Qui emporte le plus d'eau :", 38, JAUNE_TITRE)
        q1 = self.ligne([("5 dL", JAUNE_TITRE), ("ou 75 cL ?", JAUNE_TITRE)], 38, buff=0.2)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        g = self.kevin_maya(P(4.0, 0.35), 0.9)
        self.au_mot("Qui emporte le plus")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(g, scale=1.1), run_time=0.35)
        self.au_mot("5 décilitres")
        self.play(FadeIn(q1[0], shift=UP * 0.2), run_time=0.25)
        self.au_mot("ou 75")
        self.play(FadeIn(q1[1], shift=UP * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Théo, entraîneur de football ───────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = theo(0.95).move_to(P(-5.0, 0.2))
        self.au_mot("Voici Théo")
        nom = self.t("Théo", 42, SPORT).next_to(pe, UP, buff=0.4)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("entraîneur de football")
        met = self.bloc(["entraîneur", "de football"], 26, SPORT).next_to(pe, DOWN, buff=0.12)
        ba = ballon().next_to(pe, RIGHT, buff=0.15).align_to(pe, DOWN)
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(ba, shift=LEFT * 0.4), run_time=0.4)
        self.au_mot("Avant le match")
        l0 = self.bloc(["Avant le match, les joueurs", "remplissent leurs gourdes."], 30, GRAY_B)
        self.col(l0, 2.6, -2.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        a, b = gourde(50), bouteille(75, EAU, 0.8)
        a.move_to(P(-2.0, 0)).align_to(P(0, -1.6), DOWN)
        b.move_to(P(-0.4, 0)).align_to(P(0, -1.6), DOWN)
        vider(a)
        vider(b)
        na = self.t("Kevin", 28, BLEU_D).next_to(a, UP, buff=0.5)
        nb = self.t("Maya", 28, BLEU_D).next_to(b, UP, buff=0.5)
        l1 = self.ligne([("Kevin :", BLEU_D), ("une gourde de", WHITE), ("5 dL", JAUNE_TITRE)], 32, buff=0.18)
        self.col(l1, 1.2, 1.0)
        self.au_mot("Kevin a une gourde")
        self.play(FadeIn(l1[:2], shift=UP * 0.1), FadeIn(a, shift=UP * 0.2), FadeIn(na), run_time=0.4)
        self.au_mot("5 décilitres")
        self.play(FadeIn(l1[2], shift=UP * 0.1), remplir(a, 0.5), FadeIn(contenance(a, "5 dL", 28)), run_time=0.5)
        l2 = self.ligne([("Maya :", BLEU_D), ("une bouteille de", WHITE), ("75 cL", JAUNE_TITRE)], 32, buff=0.18)
        self.col(l2, 0.45, 1.0)
        self.au_mot("Maya, une bouteille")
        self.play(FadeIn(l2[:2], shift=UP * 0.1), FadeIn(b, shift=UP * 0.2), FadeIn(nb), run_time=0.4)
        self.au_mot("75 centilitres")
        self.play(FadeIn(l2[2], shift=UP * 0.1), remplir(b, 0.5), FadeIn(contenance(b, "75 cL", 28)), run_time=0.5)
        self.au_mot("Qui emporte le plus")
        q = self.t("Qui emporte le plus d'eau ?", 38, JAUNE_TITRE)
        self.col(q, -0.7, 1.0)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(VGroup(a, b)), run_time=0.5)
        self.attendre_voix()

    # ── 02 : même unité ─────────────────────────────────────────────────────
    def ecran_meme_unite(self):
        self.ecran("02-meme-unite")
        a, b = gourde(40, EAU), gourde(60, "#facc15")
        rangee_recipients([a, b], 1.0).move_to(P(-3.6, 0.2))
        self.au_mot("la même unité")
        l0 = self.t("Même unité : c'est facile !", 36, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("gourde de 40")
        self.play(FadeIn(a, shift=UP * 0.2), FadeIn(contenance(a, "40 cL", audit=True)), run_time=0.35)
        self.au_mot("autre de 60")
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(contenance(b, "60 cL", audit=True)), run_time=0.35)
        l1 = self.ligne([("60", BLEU_D), ("est plus grand que", WHITE), ("40", BLEU_D)], 38, buff=0.2)
        self.col(l1, 1.1)
        self.au_mot("centilitres : 60")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("est plus grand")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("que 40")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("La gourde de 60")
        l2 = self.ligne([("La gourde de", WHITE), ("60 cL", VERT_OK)], 36, buff=0.2)
        self.col(l2, -0.1)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("contient le plus")
        res = self.gros("contient le plus.", fs=46)
        self.col(res, -1.0)
        self.play(FadeIn(res, scale=1.2), Indicate(b, color=VERT_OK, scale_factor=1.08), run_time=0.5)
        self.attendre_voix()

    # ── 03 : deux unités : d'abord la même unité ────────────────────────────
    def ecran_convertir(self):
        self.ecran("03-convertir")
        g = self.kevin_maya(P(-4.0, 0.3))
        a, b = g
        ea, eb = contenance(a, "5 dL"), contenance(b, "75 cL")
        na = self.t("Kevin", 26, BLEU_D).next_to(a, UP, buff=0.2)
        nb = self.t("Maya", 26, BLEU_D).next_to(b, UP, buff=0.2)
        self.add(g, ea, eb, na, nb)
        XP = -0.6
        self.au_mot("deux unités différentes")
        l0 = self.t("Deux unités différentes :", 34, JAUNE_TITRE)
        self.col(l0, 2.7, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("d'abord la même unité")
        l1 = self.t("d'abord la même unité.", 34, ORANGE_RETENUE)
        self.col(l1, 2.05, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("1 dL", BLEU_D), ("= 10 cL", VERT_OK)], 42, buff=0.3)
        self.col(l2, 1.2, XP)
        self.au_mot("1 décilitre")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est 10")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("Donc 5 dL", BLEU_D), ("= 5 × 10", BLEU_D), ("= 50 cL", VERT_OK)], 42, buff=0.25)
        self.col(l3, 0.3, XP)
        self.au_mot("Donc 5 décilitres")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(ea, color=JAUNE_TITRE), run_time=0.3)
        self.au_mot("5 fois 10")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("50 centilitres")
        e50 = hors_audit(Text("50 cL", font_size=28, color=VERT_OK, weight=BOLD).move_to(ea))
        self.play(FadeIn(l3[2], shift=UP * 0.1), Transform(ea, e50), run_time=0.4)
        l4 = self.ligne([("On compare", WHITE), ("50", BLEU_D), ("et", WHITE), ("75", BLEU_D)], 34, buff=0.18)
        self.col(l4, -0.6, XP)
        self.au_mot("On compare 50")
        self.play(FadeIn(l4[:2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("et 75")
        self.play(FadeIn(l4[2:], shift=UP * 0.1), run_time=0.25)
        l5 = self.ligne([("75", VERT_OK), ("est plus grand.", WHITE)], 34, buff=0.2)
        self.col(l5, -1.35, XP)
        self.au_mot("75 est plus grand")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Maya emporte le plus")
        res = self.gros("Maya emporte le plus d'eau !", fs=42)
        self.col(res, -2.3, XP)
        self.play(FadeIn(res, scale=1.1), Indicate(b, color=VERT_OK, scale_factor=1.08), run_time=0.5)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = rangee_recipients([bouteille(100, EAU, 0.75), bouteille(75, EAU, 0.75)], 0.6).move_to(P(-3.8, 1.5))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g[0], color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("04-question", "04b-reponse",
                             ["Qu'est-ce qui contient le plus :", "1 litre, ou 75 centilitres ?"],
                             [self.choix("1 L"), self.choix("75 cL"), self.choix("c'est pareil")], 0,
                             ["1 L = 100 cL :", "100 est plus grand que 75.", "75 est plus grand que 1,",
                              "mais pas les mêmes unités !"],
                             -0.75, mot_q="Qu'est-ce qui contient", autres_q=autres_q, autres_r=apres)

    # ── 05 : le piège de la forme ───────────────────────────────────────────
    def ecran_forme(self):
        self.ecran("05-forme")
        self.au_mot("autre piège")
        tit = self.t("Attention au piège : la forme !", 44, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.4)
        bo = recipient("bouteille", 2.6, 0.6, 0.85, EAU).move_to(P(-4.6, 0.3))
        sa = vider(bol(3.0, 1.0, 0.45).move_to(P(-1.2, -1.6)))
        l1 = self.bloc(["une bouteille", "haute et fine"], 30, BLEU_D).next_to(bo, DOWN, buff=0.25)
        self.au_mot("haute et fine")
        self.play(FadeIn(bo, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        l2 = self.bloc(["un saladier", "large et bas"], 30, BLEU_D).next_to(sa, DOWN, buff=0.2)
        self.au_mot("large et bas")
        self.play(FadeIn(sa, shift=UP * 0.2), FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        bo.save_state()
        self.play(bo.animate.rotate(-1.9).move_to(P(-1.6, 0.6)), FadeOut(l1), run_time=0.3)
        self.play(bo.liquide.animate.stretch(0.02, 1, about_edge=LEFT), remplir(sa, 0.4), run_time=0.4)
        XP = 1.2
        self.au_mot("paraît basse")
        l3 = self.t("L'eau paraît basse...", 34)
        self.col(l3, 1.6, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), Restore(bo), run_time=0.4)
        bo.liquide.set_opacity(0)
        self.play(Indicate(sa.liquide, color=ORANGE_RETENUE), run_time=0.35)
        self.au_mot("il n'y a pas moins")
        l4 = self.bloc(["mais il n'y a pas moins d'eau :", "la même quantité !"], 30, VERT_OK)
        self.col(l4, 0.6, XP)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        self.au_mot("La forme ne dit pas")
        res = self.bloc(["La forme ne dit pas", "la contenance."], 38, JAUNE_TITRE)
        self.col(res, -0.9, XP)
        self.play(FadeIn(res, scale=1.1), run_time=0.45)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        se = seau(2.6, 1.1, 0.25).move_to(P(-3.6, 1.6))

        def autres_q(sc):
            sc.play(FadeIn(se), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(se, color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("06-question", "06b-reponse",
                             ["On verse 1 L d'eau", "dans un seau très large.", "L'eau monte à peine.",
                              "Combien d'eau dans le seau ?"],
                             [self.choix("moins de 1 L"), self.choix("1 L"), self.choix("plus de 1 L")], 1,
                             ["Rien ajouté, rien enlevé :", "il y a toujours 1 L.", "Le seau est large : l'eau",
                              "monte moins haut."],
                             -0.75, mot_q="On verse 1 litre", autres_q=autres_q, autres_r=apres)

    # ── 07 : le défi (ranger 3 bouteilles) ──────────────────────────────────
    def trois(self):
        rs = [bouteille(100, EAU, 0.7), bouteille(80, "#facc15", 0.7), bouteille(90, ROSE, 0.7)]
        return rangee_recipients(rs, 0.7)

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = self.trois().move_to(P(-3.8, 0.4))
        self.au_mot("range trois bouteilles")
        l0 = self.t("Théo range trois bouteilles,", 34)
        gauche(l0, -1.3, 2.0)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(g, shift=UP * 0.2), run_time=0.4)
        self.au_mot("à la plus grande")
        l1 = self.bloc(["de la plus petite", "à la plus grande :"], 32, GRAY_B)
        gauche(l1, -1.3, 1.0)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        labs = ["1 L", "8 dL", "90 cL"]
        for r, s, ex in zip(g, labs, ["grande : 1 litre", "8 décilitres", "90 centilitres"]):
            self.au_mot(ex)
            self.play(FadeIn(contenance(r, s, 28, audit=True), scale=1.2), run_time=0.25)
        self.au_mot("Dans quel ordre")
        q = self.t("Dans quel ordre ?", 40, JAUNE_TITRE)
        gauche(q, -1.3, -0.4)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(g), run_time=0.5)
        self.pause_defi(y=-2.2)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.trois().move_to(P(-3.8, 0.9))
        ets = VGroup(*[contenance(r, s, 28) for r, s in zip(g, ["1 L", "8 dL", "90 cL"])])
        self.add(g, ets)
        XP = -1.2
        self.au_mot("tout en centilitres")
        l0 = self.t("On met tout en centilitres :", 34, ORANGE_RETENUE)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        a = self.ligne([("1 L", BLEU_D), ("= 100 cL", VERT_OK)], 40, buff=0.3)
        b = self.ligne([("8 dL", BLEU_D), ("= 80 cL", VERT_OK)], 40, buff=0.3)
        self.col(a, 1.4, XP)
        self.col(b, 0.6, XP)
        self.aux_extraits([a[0], a[1], b[0], b[1]],
                          ["1 litre", "100 centilitres", "8 décilitres", "80 centilitres"])
        self.play(Transform(ets[0], hors_audit(Text("100 cL", font_size=28, color=VERT_OK, weight=BOLD)
                                                .move_to(ets[0]))),
                  Transform(ets[1], hors_audit(Text("80 cL", font_size=28, color=VERT_OK, weight=BOLD)
                                               .move_to(ets[1]))), run_time=0.4)
        self.au_mot("Du plus petit au plus grand")
        l1 = self.t("Du plus petit au plus grand :", 34, JAUNE_TITRE)
        self.col(l1, -0.4, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        # les bouteilles se rangent : 8 dL, 90 cL, 1 L
        cible = VGroup(VGroup(g[1], ets[1]), VGroup(g[2], ets[2]), VGroup(g[0], ets[0]))
        xs = [g[0].get_x(), g[1].get_x(), g[2].get_x()]
        self.play(*[c.animate.set_x(x) for c, x in zip(cible, xs)], run_time=0.6)
        ordre = self.ligne([("8 dL", VERT_OK), ("<", WHITE), ("90 cL", VERT_OK), ("<", WHITE), ("1 L", VERT_OK)],
                           44, buff=0.25)
        self.col(ordre, -1.4, XP)
        for m in ordre:
            hors_audit(m)  # nombres redits (déjà dits plus haut) : posés à leur extrait
        self.aux_extraits([ordre[0], VGroup(ordre[1], ordre[2]), VGroup(ordre[3], ordre[4])],
                          [("grand : 8", 1, 0.2), ("puis 90", 1, 0.2), ("puis 1", 1, 0.2)])
        self.insister(ordre, 1.1, 0.25)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        fig = rangee_recipients([gourde(50), bouteille(75, EAU, 0.8)], 0.8)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour comparer :", "d'abord la même unité,"),
            ("puis on compare", "les nombres."),
            ("La forme ne dit pas", "combien il contient.")], fs=34)
        self.add(fig)
        self.au_mot("Pour comparer des contenances")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("puis on compare")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et la forme")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_meme_unite()
        self.ecran_convertir()
        self.ecran_question1()
        self.ecran_forme()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class ContenanceComparerCE2(ContenanceComparerBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "orange"
