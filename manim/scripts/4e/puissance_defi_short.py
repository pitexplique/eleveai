# puissance_defi_short.py
# EleveAI — Maths 4e — série PUISSANCES, épisode 11 « défi », le SHORT ceinture
# BLANCHE « Le centime qui double » : 1 000 € tout de suite, ou 1 centime doublé
# 20 fois ?
#   · EN HAUT, une balance : la liasse de 1 000 € à gauche, à droite une pile de
#     pièces de 1 centime qui grandit (le fléau bascule quand le centime gagne) ;
#   · EN BAS, AU MÊME INSTANT : 2, 4, 8, puis 2²⁰ et le compteur de centimes qui
#     monte jusqu'à 1 048 576 ;
#   · 1 question-pause (3 s) : 1 centime doublé 10 fois ? (2¹⁰ = 1 024) ;
#   · fin : « Et doublé 30 fois… », réponse en commentaire, puis la fin standard.
# Micro du coach : 4e puissance_defi. Centres d'intérêt : argent-budget, jeux-defis.
#
# Voix : manim/voix/4e-puissance-defi-short.json (validée), débit −6 ; WAV :
# public/sons/4e-puissance-defi-short/ ; marques : puissance_defi_short_marques.json
# (marques_dump.ps1, puis conversion PAR PAIRES des cues doublées).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/puissance_defi_short.py PuissanceDefiShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/puissance_defi_short.py PuissanceDefiShort -o eleveai-maths-4e-puissance-defi-short --media_dir manim/scripts/4e/media-puiss-11-short
# Sortie : manim/sorties/4e/maths/puissances/11-defi/eleveai-maths-4e-puissance-defi-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "6e"))
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from puissance_calcul import T as T_paysage, puiss, sans_audit  # noqa: E402,F401
from puissance_notation_scientifique import OutilsNotation  # noqa: E402
from puissance_defi import rangee, poser, pied, ligne_base  # noqa: E402,F401

EXPO_C = ORANGE_RETENUE
PIEGE = ROUGE_ERREUR
CUIVRE = "#f59e0b"
BILLET = "#22c55e"
PIV = P(0, 0.72)        # l'axe de la balance
BRAS = 1.35             # la demi-longueur du fléau
Y_PLATEAU = 1.0
DY = 0.06               # l'épaisseur d'une pièce dans la pile
A_G, A_D = 0.2, -0.22   # les inclinaisons : penché à gauche (liasse), à droite (pile)
YB_REP = [-1.45, -1.9, -2.35, -2.8]  # les lignes de base de la réponse


def T(s, fs=34, c=WHITE, audit=True, largeur=3.9):
    """Le texte de la paysage, borné à la largeur du cadre étroit (3 %)."""
    t = T_paysage(s, fs, c, audit)
    if t.width > largeur:
        t.scale_to_fit_width(largeur)
    return t


def piece():
    return Ellipse(width=0.62, height=0.2, fill_color=CUIVRE, fill_opacity=1, stroke_color="#fde68a", stroke_width=2)


def liasse():
    """La liasse de 1 000 € : trois billets empilés et le montant écrit dessus."""
    g = VGroup()
    for k in range(3):
        b = RoundedRectangle(width=1.22, height=0.56, corner_radius=0.05, fill_color="#14532d", fill_opacity=1,
                             stroke_color=BILLET, stroke_width=2).shift(UP * 0.05 * k + RIGHT * 0.02 * k)
        g.add(b)
    m = T("1 000 €", 18, WHITE, False).move_to(g[-1])
    g.add(m)
    return g


class Balance(VGroup):
    """Une balance à plateaux posés sur le fléau : .fleau .pg .pd (plateaux, et ce
    qu'ils portent). basculer(a) renvoie les animations (fléau, plateaux qui suivent)."""

    def __init__(self, a=0.0):
        super().__init__()
        self.a = 0.0
        self.pied_b = Polygon(P(-0.42, 0.14), P(0.42, 0.14), P(0.07, PIV[1]), P(-0.07, PIV[1]), fill_color="#475569",
                              fill_opacity=1, stroke_width=0)
        self.fleau = Line(P(-BRAS, PIV[1]), P(BRAS, PIV[1]), color=GREY_A, stroke_width=7)
        self.axe = Dot(PIV, radius=0.08, color=GREY_A)
        self.pg, self.pd = self._plateau(-BRAS), self._plateau(BRAS)
        self.add(self.pied_b, self.fleau, self.pg, self.pd, self.axe)
        if a:
            self.fleau.rotate(a, about_point=PIV)
            d = BRAS * np.sin(a)
            self.pg.shift(DOWN * d)
            self.pd.shift(UP * d)
            self.a = a

    def _plateau(self, x):
        tige = Line(P(x, PIV[1]), P(x, Y_PLATEAU), color=GREY_B, stroke_width=4)
        pl = RoundedRectangle(width=1.34, height=0.07, corner_radius=0.03, fill_color=GREY_A, fill_opacity=1,
                              stroke_width=0).move_to(P(x, Y_PLATEAU))
        g = VGroup(tige, pl)
        g.pl = pl
        return g

    def basculer(self, a):
        da = a - self.a
        d = BRAS * (np.sin(a) - np.sin(self.a))
        self.a = a
        return [Rotate(self.fleau, da, about_point=PIV), self.pg.animate.shift(DOWN * d), self.pd.animate.shift(UP * d)]

    def haut_pile(self):
        """L'ordonnée où poser le centre de la pièce suivante."""
        return self.pd.pl.get_top()[1] + 0.1 + DY * (len(self.pd) - 2)

    def nouvelle_piece(self, dy_suite=0.0):
        return piece().move_to(P(BRAS, self.haut_pile() + dy_suite))


class PuissanceDefiShort(OutilsNotation, ShortProp):
    nom_voix = "4e-puissance-defi-short"
    fichier_marques = "puissance_defi_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """« Question ! » et le compte à rebours reculent vers la gauche (3 %)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = rebours.get_right()[0] - 1.9
        if d > 0:
            tete.shift(LEFT * d)
            rebours.shift(LEFT * d)
        VGroup(tete, rebours).scale(0.92).set_x(0)
        q.scale_to_fit_width(3.8).move_to(P(0, tete.get_bottom()[1] - 0.3))
        for c in cartes:  # des boutons moins hauts, le texte plus près de sa lettre
            c[0].stretch_to_fit_height(0.68).stretch_to_fit_width(3.85)
            c[1][1].next_to(c[1][0], RIGHT, buff=0.12)
            c[1].set_y(c[0].get_y()).align_to(c[0].get_left() + RIGHT * 0.2, LEFT)
        cartes.arrange(DOWN, buff=0.08).next_to(P(0, q.get_bottom()[1] - 0.1), DOWN, buff=0).set_x(0)
        pause.scale_to_fit_width(3.8).next_to(cartes, DOWN, buff=0.2).set_x(0)
        ph.arrange(DOWN, buff=0.12).next_to(cartes, DOWN, buff=0.16).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def carte(self, haut=0.04, bas=-3.02):
        return RoundedRectangle(width=4.15, height=haut - bas, corner_radius=0.18, fill_color="#0b1220",
                                fill_opacity=1, stroke_color="#334155", stroke_width=2).move_to(P(0, (haut + bas) / 2))

    def fin_short(self, voix, a_effacer):
        """La fin du 19/10 (celle des shorts des épisodes 01 à 07)."""
        self.dire(voix)
        entraine = T("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.2))
        site = T("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.25))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = T("Abonne-toi !", 42, VERT_OK).move_to(P(0, -0.2))
        poignee = T("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -1.05))
        self.play(FadeOut(Group(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au("éleveai", GrowFromCenter(site), Create(cadre), rt=0.5)
        self.au("abonne-toi", FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), rt=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)

    def centre(self, g, yb):
        """Une ligne centrée, sur la ligne de base yb."""
        poser(g, 0, yb)
        return g.set_x(0)

    def ajouter_pieces(self, bal, n, *autres, rt=0.25):
        """n pièces qui tombent sur le plateau de droite (la pile grandit)."""
        neuves = []
        for k in range(n):
            neuves.append(bal.nouvelle_piece(DY * k))
        self.play(*[FadeIn(c, shift=DOWN * 0.2) for c in neuves], *autres, run_time=rt)
        bal.pd.add(*neuves)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le centime qui double", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : la balance vide, 1 000 € contre 1 centime ──
        self.dire("00-accroche")
        bal = Balance()
        carte = self.carte()
        self.au("Tu préfères", Write(titre), FadeIn(bal), FadeIn(carte), rt=0.3)
        l0 = self.centre(T("Tu préfères", 31), -0.45)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.2)
        l1 = self.centre(T("1 000 €", 31, BILLET), -0.92)
        lz = liasse().next_to(bal.pg.pl, UP, buff=0.02)
        self.au("1 000 euros", FadeIn(l1, scale=1.2), FadeIn(lz, shift=DOWN * 0.3), rt=0.3)
        bal.pg.add(lz)
        self.play(*bal.basculer(A_G), run_time=0.2)
        l2a = self.centre(T("tout de suite,", 31), -1.39)
        l2b = self.centre(T("ou", 31, EXPO_C), -1.86)
        l2 = VGroup(l2a, l2b)
        self.au("tout de", FadeIn(l2a, shift=RIGHT * 0.1), rt=0.25)
        self.au("ou 1", FadeIn(l2b, scale=1.3), rt=0.12)
        l3 = self.centre(T("1 centime", 31, CUIVRE), -2.33)
        self.au("1 centime", FadeIn(l3, scale=1.2), rt=0.25)
        bal.pd.add(sans_audit(bal.nouvelle_piece()))
        self.play(FadeIn(bal.pd[-1], shift=DOWN * 0.3), run_time=0.15)
        l4 = self.centre(T("doublé 20 fois ?", 31, EXPO_C), -2.8)
        self.au("doublé", FadeIn(l4[:6], shift=UP * 0.1), rt=0.2)
        self.au("20 fois", FadeIn(l4[6:], scale=1.2), rt=0.25)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(l0, l1, l2, l3, l4)), run_time=0.2)

        # ── 01 : doublé : 2, 4, 8 : la pile grandit, ça ne ressemble à rien ──
        self.dire("01-doubler")
        fs = 30
        def rang(mot, nb, yb):
            a, b = T(mot, fs), T(nb, fs, EXPO_C)
            g = rangee(a, b, buff=0.2)
            poser(g, -1.72, yb)
            return g
        d0 = self.centre(T("1 centime.", fs, CUIVRE), -0.45)
        d1, d2, d3 = rang("Doublé :", "2", -0.92), rang("Encore :", "4", -1.39), rang("Encore :", "8", -1.86)
        for r in (d2, d3):
            r[1].align_to(d1[1], LEFT)
        self.au("1 centime", FadeIn(d0, shift=UP * 0.1), Indicate(bal.pd[-1], color=WHITE, scale_factor=1.3), rt=0.4)
        self.au("Doublé", FadeIn(d1[0], shift=RIGHT * 0.1), rt=0.25)
        self.au("2.", FadeIn(d1[1], scale=1.4), rt=0.15)
        self.ajouter_pieces(bal, 1, rt=0.15)
        self.au("Encore", FadeIn(d2[0], shift=RIGHT * 0.1), rt=0.25)
        fleches = VGroup()
        for a, b in ((d1, d2), (d2, d3)):
            fl = CurvedArrow(a[1].get_right() + RIGHT * 0.12, b[1].get_right() + RIGHT * 0.12, angle=-PI * 0.75, color=EXPO_C,
                             stroke_width=3, tip_length=0.11)
            lb = T("× 2", 26, EXPO_C, False).next_to(fl, RIGHT, buff=0.06)
            fleches.add(VGroup(fl, lb))
        self.au("4.", FadeIn(d2[1], scale=1.4), Create(fleches[0][0]), FadeIn(fleches[0][1]), rt=0.15)
        self.ajouter_pieces(bal, 2, rt=0.15)
        self.au("Encore", FadeIn(d3[0], shift=RIGHT * 0.1), rt=0.25)
        self.au("8.", FadeIn(d3[1], scale=1.4), Create(fleches[1][0]), FadeIn(fleches[1][1]), rt=0.15)
        self.ajouter_pieces(bal, 4, rt=0.15)
        d4 = self.centre(T("Ça ne ressemble", fs), -2.33)
        d5 = self.centre(T("à rien.", fs), -2.8)
        self.au("Ça ne", FadeIn(d4, shift=UP * 0.1), rt=0.3)
        self.au("à rien", FadeIn(d5, shift=UP * 0.1), rt=0.25)
        self.play(Indicate(lz, color=BILLET, scale_factor=1.06), run_time=0.4)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) : 1 centime doublé 10 fois ? ──
        choix = [T("20 centimes", 21), T("100 centimes", 21), T("1 024 centimes", 21)]
        plans = [[(s, [c])] for s, c in zip(("20 centimes", "100 centimes", "1 024 centimes"), choix)]

        def avant(sc, q):
            sc.poser_mots(q[0], [("1 centime", "1 centime"), ("doublé", "doublé"), ("10 fois", "10 fois")])

        def apres(sc):
            r0 = T("Réponse C :", 30, VERT_OK)
            p = puiss(2, 10, fs=30)
            eg = T("=", 30, VERT_OK, False)
            rangee(r0, p, eg, buff=0.2)
            eg.set_y(p.base.get_y())
            sc.centre(VGroup(r0, p, eg), YB_REP[0])
            sc.au("C :", FadeIn(r0, shift=UP * 0.12), rt=0.2)
            sc.pieges(0, 1)
            r1b = T("1 024 centimes.", 30, VERT_OK)
            sc.centre(r1b, YB_REP[1])
            sc.au("2 puissance", FadeIn(p.base, scale=1.3), rt=0.25)
            sc.au("10, 1", FadeIn(p.expo, scale=1.5), rt=0.2)
            sc.au("1 024", FadeIn(eg), FadeIn(r1b, shift=RIGHT * 0.12), rt=0.3)
            r2 = sc.centre(T("Seulement 10 euros", 30), YB_REP[2])
            r3 = sc.centre(T("et 24 centimes.", 30), YB_REP[3])
            sc.poser_mots(r2, [("Seulement", "Seulement"), ("10 euros", "10 euros")])
            sc.poser_mots(r3, [("et", "et 24"), ("24 centimes", "24 centimes")])
            sc.insister(r1b, 1.1, 0.2)

        self.qpause("01q-question", "01r-reponse", ["1 centime doublé 10 fois ?"], choix, plans, 2,
                    ["Réponse C :", "2", "Seulement", "et 24"], avant=avant, apres=apres)
        self.vider(garder)

        # ── 02 : doublé 20 fois : la pile monte, le compteur monte, le fléau bascule ──
        self.dire("02-vingt")
        bal = Balance(A_G)
        lz = liasse().next_to(bal.pg.pl, UP, buff=0.02)
        bal.pg.add(lz)
        for k in range(8):
            bal.pd.add(bal.nouvelle_piece())
        carte = self.carte()
        self.play(FadeIn(bal), FadeIn(carte), run_time=0.2)
        l0 = self.centre(T("Mais doublé 20 fois :", 24, EXPO_C), -0.5)
        self.au("Mais", FadeIn(l0[:10], shift=UP * 0.1), rt=0.25)
        self.au("20 fois", FadeIn(l0[10:], scale=1.15), rt=0.2)
        p = puiss(2, 20, fs=24)
        fin_n = T("1 048 576", 24, CUIVRE)
        cent = self.centre(T("centimes.", 24, CUIVRE), -1.68)
        eg20 = T("=", 24, CUIVRE, False)
        rangee(p, eg20, fin_n, buff=0.18)
        eg20.set_y(p.base.get_y())
        self.centre(VGroup(p, eg20, fin_n), -1.14)
        lf = VGroup(fin_n, cent)
        cpt = T("8", 24, CUIVRE, False).move_to(fin_n)
        self.play(FadeIn(cpt), run_time=0.05)
        vals = [2 ** k for k in range(4, 20)]
        n_av = 7

        def tic(vs, jusque):
            dt = max(0.034, (self.t_mot(jusque) - 0.05) / len(vs))
            for v in vs:
                i = vals.index(v)
                cpt.become(T(f"{v:,}".replace(",", " "), 24, CUIVRE, False).move_to(fin_n))
                c = bal.nouvelle_piece()
                a_new = A_G + (A_D - A_G) * (i + 1) / len(vals)
                self.play(FadeIn(c, shift=DOWN * 0.08), *bal.basculer(a_new), run_time=dt)
                bal.pd.add(c)

        tic(vals[:n_av], "2 puissance")
        self.au("2 puissance", FadeIn(p.base, scale=1.3), rt=0.1)
        tic(vals[n_av:n_av + 3], "20, 1")
        self.au("20, 1", FadeIn(p.expo, scale=1.5), rt=0.1)
        tic(vals[n_av + 3:], "1 048")
        self.au("1 048", FadeOut(cpt, run_time=0.01), FadeIn(eg20), FadeIn(fin_n, scale=1.1), rt=0.15)
        self.au("centimes", FadeIn(cent, shift=LEFT * 0.1), rt=0.25)
        l3 = self.centre(T("Plus de 10 000 euros !", 24, VERT_OK), -2.24)
        self.au("Plus de", FadeIn(l3, scale=1.1), rt=0.3)
        l4 = self.centre(T("Le centime gagne.", 24, VERT_OK), -2.78)
        self.au("Le centime", FadeIn(l4, shift=UP * 0.1), Flash(P(BRAS, bal.haut_pile()), color=CUIVRE, line_length=0.25), rt=0.35)
        self.insister(l4, 1.08, 0.2)
        self.attendre_voix(marge=0.3)
        self.play(FadeOut(VGroup(l0, p, eg20, lf, l3, l4)), run_time=0.2)

        # ── 03 : la question en commentaire ──
        self.dire("03-question")
        e0 = self.centre(T("Et doublé 30 fois…", 28, EXPO_C), -0.55)
        self.au("Et doublé", FadeIn(e0[:8], shift=UP * 0.1), rt=0.25)
        self.au("30 fois", FadeIn(e0[8:], scale=1.2), rt=0.25)
        qm = T("?", 72, EXPO_C, False).move_to(P(0.1, 1.85))
        self.play(FadeIn(qm, scale=1.6), run_time=0.2)
        e1 = self.centre(T("ça fait combien", 28), -1.08)
        e2 = self.centre(T("d'euros ?", 28), -1.58)
        self.au("ça fait", FadeIn(e1, shift=UP * 0.1), rt=0.3)
        self.au("d'euros", FadeIn(e2, shift=UP * 0.1), rt=0.3)
        self.au("Réponds en commentaire")
        a1 = self.centre(T("Réponds en", 28, VERT_OK), -2.22)
        a2 = self.centre(T("commentaire !", 28, VERT_OK), -2.72)
        appel = VGroup(a1, a2)
        self.play(FadeIn(appel, scale=0.8), run_time=0.35)
        self.insister(appel, 1.06, 0.25)
        self.attendre_voix(marge=1.0)

        # ── 04 : la fin standard ──
        self.fin_short("04-abonne", [m for m in self.mobjects if m is not margo])
