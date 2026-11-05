# puissance_enchainer_short.py
# EleveAI — Maths 2de — série PUISSANCES, épisode 10 « enchaîner », le SHORT
# ceinture BLANCHE « La check-list » : (2³)² × 2⁴ ÷ 2⁷ = 2³ = 8.
#   · EN HAUT, l'image : un avion sur la piste et trois balises 1, 2, 3 ; à
#     chaque étape l'avion roule jusqu'à sa balise, qui s'allume ; au « 8 ! »
#     il décolle ;
#   · EN BAS, au même instant, une ligne par étape (même numéro que la
#     balise) : (2³)² = 2⁶, puis 2⁶ × 2⁴ = 2¹⁰, puis 2¹⁰ ÷ 2⁷ = 2³ = 8
#     (base BLEUE, exposant ORANGE, résultat VERT) ;
#   · 1 question-pause (3 s) : (10²)³ ÷ 10⁵ → 1 / 10 / 100 ;
#   · fin : (3⁴)² ÷ 3⁸ en commentaire, puis la fin standard.
# Micro du coach : 2de puiss_expression_composee. Centres : transports, avions.
#
# Voix : manim/voix/2de-puissance-enchainer-short.json (validée), débit −6 ;
# WAV : public/sons/2de-puissance-enchainer-short/ ; marques :
# puissance_enchainer_short_marques.json (marques_dump + conversion PAR PAIRES).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/puissance_enchainer_short.py PuissanceEnchainerShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/puissance_enchainer_short.py PuissanceEnchainerShort -o eleveai-maths-seconde-puissance-enchainer-short --media_dir manim/scripts/4e/media-puiss-10-short
# Sortie : manim/sorties/seconde/maths/puissances/10-enchainer/eleveai-maths-seconde-puissance-enchainer-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "6e"))

from prop_commun import *  # noqa: E402,F403

sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from puissance_notation_scientifique import OutilsNotation, puiss, sans_audit  # noqa: E402
from puissance_notation_scientifique import T as T_paysage  # noqa: E402
from puissance_produit_quotient import rangee  # noqa: E402
from puissance_enchainer import avion, ppar  # noqa: E402

BASE_C = BLEU_CALCUL
EXPO_C = ORANGE_RETENUE
CIEL = "#93c5fd"
Y_PISTE = 0.72
XB = [-0.55, 0.45, 1.45]      # les balises 1, 2, 3 sur la piste
YL = [-0.2, -0.95, -1.7, -2.45]  # les lignes du calcul dans la carte
XD = -1.62                    # les numéros des lignes (comme les balises)


def T(s, fs=34, c=WHITE, audit=True, largeur=3.8):
    t = T_paysage(s, fs, c, audit)
    if t.width > largeur:
        t.scale_to_fit_width(largeur)
    return t


def eg(fs=40):
    return T("=", fs, WHITE, audit=False)


class PuissanceEnchainerShort(OutilsNotation, ShortProp):
    nom_voix = "2de-puissance-enchainer-short"
    fichier_marques = "puissance_enchainer_short_marques.json"
    identite = "Maths 2de — EleveAI"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """« Question ! » et le compte à rebours reculent vers la gauche (3 %)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = rebours.get_right()[0] - 1.9
        if d > 0:
            tete.shift(LEFT * d)
            rebours.shift(LEFT * d)
        return tete, q, cartes, pause, rebours, ph

    def fin_short(self, voix, a_effacer):
        """La fin du 19/10 (celle des shorts des épisodes précédents)."""
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

    def poser_idx(self, t, plan, rt=0.25):
        s = t.original_text
        bornes = [a for a, _ in plan] + [len(s)]
        k, pieces = 0, []
        for a, b in zip(bornes[:-1], bornes[1:]):
            n = sum(1 for c in s[a:b] if not c.isspace())
            pieces.append(VGroup(*t.submobjects[k:k + n]))
            k += n
        for (_, ex), pc in zip(plan, pieces):
            self.au(ex, FadeIn(pc, shift=UP * 0.12), rt=rt)

    def carte(self, haut=0.32, bas=-2.95):
        return RoundedRectangle(width=4.15, height=haut - bas, corner_radius=0.18, fill_color="#0b1220",
                                fill_opacity=1, stroke_color="#334155", stroke_width=2).move_to(P(0, (haut + bas) / 2))

    def balise(self, k):
        """Une balise de piste : un mât, un panneau numéroté."""
        mat = Line(P(0, 0), P(0, 0.42), color="#94a3b8", stroke_width=3)
        pan = RoundedRectangle(width=0.36, height=0.32, corner_radius=0.06, fill_color="#1e293b", fill_opacity=1,
                               stroke_color=CIEL, stroke_width=2).move_to(P(0, 0.55))
        n = T(str(k), 22, WHITE, audit=False).move_to(pan)
        g = VGroup(mat, pan, n).move_to(P(XB[k - 1], Y_PISTE + 0.36))
        g.pan, g.n = pan, n
        return g

    def disque(self, k, y):
        d = Circle(radius=0.17, fill_color="#1e293b", fill_opacity=1, stroke_color=JAUNE_TITRE, stroke_width=2)
        n = T(str(k), 20, JAUNE_TITRE, audit=False)
        g = VGroup(d, n).move_to(P(XD, y))
        n.move_to(d)
        return g

    def ligne_calc(self, *ms, y, buff=0.14):
        """Une ligne du calcul, bornée à 85 % de la carte (en comptant le
        numéro à gauche) et centrée à droite du numéro."""
        g = rangee(*ms, buff=buff)
        if g.width > 2.85:
            g.scale_to_fit_width(2.85)
        g.move_to(P(0.3, y))
        ref = next((m.base.get_y() for m in ms if hasattr(m, "base")), g.get_y())
        g.shift(UP * (y - ref))
        return g

    def rouler(self, av, k, b, rt=0.5):
        """L'avion roule jusqu'à la balise k, qui s'allume."""
        self.play(av.animate.set_x(XB[k - 1] - 0.62), b.pan.animate.set_stroke(VERT_OK, width=4)
                  .set_fill("#052e16", 1), run_time=rt)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("La check-list", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : une expression géante → une seule puissance ──
        self.dire("00-accroche")
        piste = Line(P(-2.0, Y_PISTE), P(2.0, Y_PISTE), color="#64748b", stroke_width=6)
        tirets = DashedLine(P(-1.85, Y_PISTE), P(1.85, Y_PISTE), color=WHITE, stroke_width=1.5, dash_length=0.12)
        bal = [self.balise(k) for k in (1, 2, 3)]
        av = avion(0.36)
        av.next_to(piste, UP, buff=0).set_x(-1.4)
        carte = self.carte()
        self.au("Une expression", Write(titre), FadeIn(piste), FadeIn(tirets), FadeIn(av, shift=RIGHT * 0.3),
                FadeIn(carte), rt=0.5)

        def bloc(s=0.3, expo=None):
            b = RoundedRectangle(width=s, height=s, corner_radius=s * 0.15, fill_color=BASE_C, fill_opacity=0.85,
                                 stroke_width=0)
            e = (RoundedRectangle(width=s * 0.42, height=s * 0.42, corner_radius=s * 0.08, fill_color=EXPO_C,
                                  fill_opacity=1, stroke_width=0) if expo is None
                 else T(expo, 34 * s / 0.5, EXPO_C, audit=False))
            e.next_to(b, UR, buff=0.03).shift(DOWN * s * 0.25)
            return VGroup(b, e)

        sym = lambda s: T(s, 34, WHITE, audit=False)  # noqa: E731
        row = VGroup(sym("("), bloc(), sym(")"), bloc(), sym("×"), bloc(), sym("÷"), bloc(), sym("×"),
                     bloc()).arrange(RIGHT, buff=0.12)
        if row.width > 3.4:
            row.scale_to_fit_width(3.4)
        row.move_to(P(0, -0.75))
        self.au("géante", LaggedStart(*[FadeIn(m, shift=DOWN * 0.15) for m in row], lag_ratio=0.1), rt=0.8)
        seul = bloc(0.75, expo="?").move_to(P(0, -1.75))
        self.au("Une seule", TransformFromCopy(row, seul), rt=0.7)
        self.au("Prêt", LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in bal], lag_ratio=0.2),
                Indicate(seul[1], color=EXPO_C, scale_factor=1.5), rt=0.5)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(row), FadeOut(seul), run_time=0.3)

        # ── 01 : une étape par ligne ; l'avion roule de balise en balise ──
        self.dire("01-etapes")
        a = ppar(2, 3, 2, fs=48)
        sans_audit(a.out)  # « au carré » : le ² de l'exposant extérieur
        r1 = puiss(2, 6, fs=48)
        L1 = self.ligne_calc(a, eg(), r1, y=YL[0])
        d1 = self.disque(1, YL[0])
        self.au("2 puissance", FadeIn(a.lp), FadeIn(a.p.base, scale=1.3), FadeIn(d1, scale=1.3), rt=0.3)
        self.au("3,", FadeIn(a.p.expo, scale=1.6), rt=0.25)
        self.au("carré", FadeIn(a.rp), FadeIn(a.out, scale=1.8), rt=0.3)
        self.au("2 puissance", FadeIn(L1[1]), FadeIn(r1.base, scale=1.3), rt=0.3)
        self.au("6.", FadeIn(r1.expo, scale=1.6), rt=0.3)
        self.rouler(av, 1, bal[0])
        m2 = sans_audit(puiss(2, 6, fs=48))
        x2 = T("×", 38, audit=False)
        b2, r2 = puiss(2, 4, fs=48), puiss(2, 10, fs=48)
        L2 = self.ligne_calc(m2, x2, b2, eg(), r2, y=YL[1])
        d2 = self.disque(2, YL[1])
        self.au("Fois", TransformFromCopy(r1, m2), FadeIn(x2), FadeIn(d2, scale=1.3), rt=0.4)
        self.au("2 puissance", FadeIn(b2.base, scale=1.3), rt=0.25)
        self.au("4 :", FadeIn(b2.expo, scale=1.6), rt=0.25)
        self.au("2 puissance", FadeIn(L2[3]), FadeIn(r2.base, scale=1.3), rt=0.25)
        self.au("10.", FadeIn(r2.expo, scale=1.6), rt=0.3)
        self.rouler(av, 2, bal[1])
        m3 = sans_audit(puiss(2, 10, fs=48))
        x3 = T("÷", 38, audit=False)
        c3, r3 = puiss(2, 7, fs=48), puiss(2, 3, fs=48)
        L3 = self.ligne_calc(m3, x3, c3, eg(), r3, y=YL[2])
        d3 = self.disque(3, YL[2])
        self.au("Divisé", TransformFromCopy(r2, m3), FadeIn(x3), FadeIn(d3, scale=1.3), rt=0.4)
        self.au("2 puissance", FadeIn(c3.base, scale=1.3), rt=0.25)
        self.au("7 :", FadeIn(c3.expo, scale=1.6), rt=0.25)
        self.au("2 puissance", FadeIn(L3[3]), FadeIn(r3.base, scale=1.3), rt=0.25)
        self.au("3.", FadeIn(r3.expo, scale=1.6), rt=0.3)
        self.rouler(av, 3, bal[2])
        m4 = sans_audit(puiss(2, 3, fs=48))
        n8 = T("8", 56, VERT_OK)
        L4 = self.ligne_calc(m4, eg(), n8, y=YL[3])
        self.au("8 !", TransformFromCopy(r3, m4), FadeIn(L4[1]), FadeIn(n8, scale=1.5), rt=0.4)
        cad = SurroundingRectangle(L4, color=VERT_OK, buff=0.1, corner_radius=0.08)
        self.play(Create(cad), av.animate.shift(RIGHT * 0.55 + UP * 1.0).rotate(0.3), run_time=0.7)
        self.insister(n8, 1.4, 0.2)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) : (10²)³ ÷ 10⁵ ? ──
        choix = [T("1", 34), T("10", 34), T("100", 34)]
        plans = [[("1.", [choix[0]])], [("10.", [choix[1]])], [("100.", [choix[2]])]]

        def avant(sc, q):
            sc.poser_idx(q[0], [(0, "10 puissance"), (3, "2,"), (4, "cube"), (7, "divisé"), (9, "10 puissance"),
                                (11, "5 ?")])

        def apres(sc):
            # « Réponse B : 10. » : portée par la carte B allumée (la place de
            # Ti-Margo reste libre sous les trois lignes du calcul)
            sc.au("10.", sc.cartes_q[1].animate.scale(1.06), rt=0.2)
            sc.play(sc.cartes_q[1].animate.scale(1 / 1.06), run_time=0.2)
            sc.pieges(0, 2)
            l1 = sc.rep_ligne(0, ["2 ×", "3 =", "6."])
            for m, ex in zip(l1, ["2 fois", "3,", "6."]):
                sc.au(ex, FadeIn(m, shift=UP * 0.12), rt=0.22)
            l2 = sc.rep_ligne(1, ["Puis", "6 −", "5 =", "1."])
            for m, ex in zip(l2, ["Puis", "6 moins", "5,", "1."]):
                sc.au(ex, FadeIn(m, shift=UP * 0.12), rt=0.22)
            l3 = sc.rep_ligne(2, ["10", "¹ =", "10."])
            l3[1].next_to(l3[0], RIGHT, buff=0.03).align_to(l3[0], UP)
            l3[2].next_to(l3[1], RIGHT, buff=0.14)
            l3[2].align_to(l3[0], DOWN)
            l3.move_to(sc.ph_q[2])
            for m, ex in zip(l3, ["10 puissance", "1 :", "10."]):
                sc.au(ex, FadeIn(m, shift=UP * 0.12), rt=0.22)
            sc.insister(l3[2], 1.25, 0.2)

        self.qpause("01q-question", "01r-reponse", ["(10²)³ ÷ 10⁵ ?"], choix, plans, 1,
                    ["2 × 3 = 6.", "Puis 6 − 5 = 1.", "10¹ = 10."], avant=avant, apres=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire : (3⁴)² ÷ 3⁸ ──
        self.dire("02-question")
        piste2 = piste.copy()
        tirets2 = tirets.copy()
        av2 = avion(0.36)
        av2.next_to(piste2, UP, buff=0).set_x(-1.4)
        bal2 = [self.balise(k) for k in (1, 2, 3)]
        carte = self.carte()
        a = ppar(3, 4, 2, fs=52)
        sans_audit(a.out)
        x = T("÷", 40, audit=False)
        b = puiss(3, 8, fs=52)
        lq = self.ligne_calc(a, x, b, y=-0.35)
        self.au("Et 3", FadeIn(piste2), FadeIn(tirets2), *[FadeIn(bb) for bb in bal2], FadeIn(av2, shift=RIGHT * 0.3),
                FadeIn(carte), rt=0.3)
        self.au("3 puissance", FadeIn(a.lp), FadeIn(a.p.base, scale=1.3), rt=0.3)
        self.au("4,", FadeIn(a.p.expo, scale=1.6), rt=0.25)
        self.au("carré", FadeIn(a.rp), FadeIn(a.out, scale=1.8), rt=0.3)
        self.au("divisé", FadeIn(x), rt=0.25)
        self.au("3 puissance", FadeIn(b.base, scale=1.3), rt=0.25)
        self.au("8 ?", FadeIn(b.expo, scale=1.6), rt=0.3)
        fo = puiss(3, "?", fs=64, audit=False)
        lr = self.ligne_calc(T("=", 48, audit=False), fo, y=-1.35)
        self.play(FadeIn(lr, scale=1.2), run_time=0.35)
        self.insister(fo.expo, 1.6, 0.2)
        self.au("Réponds")
        appel = T("Réponds en commentaire !", 30, VERT_OK)
        appel.scale_to_fit_width(min(appel.width, 3.4)).move_to(P(0, -2.4))  # 85 % de la carte
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.0)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])
