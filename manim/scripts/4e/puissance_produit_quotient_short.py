# puissance_produit_quotient_short.py
# EleveAI — Maths 2de — série PUISSANCES, épisode 08 « produit et quotient »,
# le SHORT ceinture BLANCHE « La clé secrète » : 2³ × 2⁴ = 2⁷.
#   · EN HAUT, l'image : une clé secrète et ses cases de bits (0 / 1) qui
#     défilent ; 3 cases BLEUES, puis 4 cases ORANGE ajoutées au bout ;
#   · EN BAS, au même instant, juste sous chaque groupe de cases : 2³ (sous
#     les 3 cases), × 2⁴ (sous les 4 cases), puis 2³ × 2⁴ = 2³⁺⁴ = 2⁷ = 128
#     (base BLEUE, exposant ORANGE, résultat VERT) ;
#   · 1 question-pause (3 s) : 2⁵ × 2⁵ → 2¹⁰ / 4¹⁰ / 2²⁵ ;
#   · fin : la clé de 128 bits (128 petites cases), réponse en commentaire,
#     puis la fin standard.
# Micro du coach : 2de puiss_produit_quotient. Centres : technologie-ia.
#
# Voix : manim/voix/2de-puissance-produit-quotient-short.json (validée),
# débit −6 ; WAV : public/sons/2de-puissance-produit-quotient-short/ ;
# marques : puissance_produit_quotient_short_marques.json (marques_dump +
# cues2marques, relues : aucun mot répété perdu).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/puissance_produit_quotient_short.py PuissanceProduitQuotientShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/puissance_produit_quotient_short.py PuissanceProduitQuotientShort -o eleveai-maths-seconde-puissance-produit-quotient-short --media_dir manim/scripts/4e/media-puiss-08-short
# Sortie : manim/sorties/seconde/maths/puissances/08-produit-quotient/eleveai-maths-seconde-puissance-produit-quotient-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "6e"))

from prop_commun import *  # noqa: E402,F403

sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from puissance_notation_scientifique import OutilsNotation, puiss  # noqa: E402
from puissance_notation_scientifique import T as T_paysage  # noqa: E402
from puissance_produit_quotient import OR, case_bit, cle, expo2, rangee  # noqa: E402

BASE_C = BLEU_CALCUL
EXPO_C = ORANGE_RETENUE
CIEL = "#93c5fd"
W = 0.5                      # largeur d'une case de bit
XS = [-1.75 + W / 2 + W * j + (0.16 if j >= 3 else 0) for j in range(7)]
Y_BITS = 1.15


def T(s, fs=34, c=WHITE, audit=True, largeur=3.8):
    t = T_paysage(s, fs, c, audit)
    if t.width > largeur:
        t.scale_to_fit_width(largeur)
    return t


class PuissanceProduitQuotientShort(OutilsNotation, ShortProp):
    nom_voix = "2de-puissance-produit-quotient-short"
    fichier_marques = "puissance_produit_quotient_short_marques.json"
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
        """La fin du 19/10 (celle des shorts des épisodes 01 à 05)."""
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

    def carte(self, haut=0.55, bas=-2.95):
        return RoundedRectangle(width=4.15, height=haut - bas, corner_radius=0.18, fill_color="#0b1220",
                                fill_opacity=1, stroke_color="#334155", stroke_width=2).move_to(P(0, (haut + bas) / 2))

    def cases(self):
        cs = [case_bit(v, BASE_C if j < 3 else EXPO_C, w=W - 0.06) for j, v in enumerate((1, 0, 1, 0, 1, 1, 0))]
        for j, c in enumerate(cs):
            c.cadre.stretch_to_fit_height(0.6)
            c.bit.scale(0.8)
            c.move_to(P(XS[j], Y_BITS))
        return cs

    def melanger(self, cases, fois=2, rt=0.16):
        import random
        rd = random.Random(len(cases) * 5 + fois)
        for _ in range(fois):
            anims = []
            for c in cases:
                if rd.random() < 0.4:
                    continue
                v = "1" if c.bit.original_text == "0" else "0"
                nb = T(v, 32, WHITE, audit=False).move_to(c.cadre)
                anims.append(Transform(c.bit, nb))
                c.bit.original_text = v
            if anims:
                self.play(*anims, run_time=rt)

    def rep_puiss(self, i, prefixe, b, e):
        """La ligne i de la réponse : « Réponse A : » + bᵉ COMPOSÉ, en vert."""
        ref = self.ph_q[i]
        pre = T(prefixe, 26, VERT_OK)
        p = puiss(b, e, fs=32, cb=VERT_OK, ce=VERT_OK)
        pt = T(".", 26, VERT_OK)
        lg = VGroup(pre, p, pt).arrange(RIGHT, buff=0.12)
        p.base.align_to(pre, DOWN)
        p.expo.next_to(p.base, UR, buff=0.03).shift(DOWN * 0.2)
        pt.next_to(p.base, RIGHT, buff=0.04 + p.expo.width).align_to(pre, DOWN)
        lg.move_to(ref)
        lg.pre, lg.p, lg.pt = pre, p, pt
        return lg

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("La clé secrète", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : une clé de 3 bits, puis 4 bits de plus ──
        self.dire("00-accroche")
        k = cle(0.55).move_to(P(0, 1.95))
        cs = self.cases()
        l3 = T("3 bits", 24, BASE_C).move_to(P(XS[1], Y_BITS - 0.55))
        l4 = T("4 bits", 24, EXPO_C).move_to(P((XS[3] + XS[6]) / 2, Y_BITS - 0.55))
        self.au("Une clé", Write(titre), FadeIn(k, shift=RIGHT * 0.3), rt=0.45)
        self.au("secrète", Indicate(k, color=OR, scale_factor=1.2), rt=0.4)
        self.au("3 bits", LaggedStart(*[FadeIn(c, shift=DOWN * 0.15) for c in cs[:3]], lag_ratio=0.25),
                FadeIn(l3), rt=0.5)
        self.melanger(cs[:3], 2)
        self.au("4 bits", LaggedStart(*[FadeIn(c, shift=LEFT * 0.25) for c in cs[3:]], lag_ratio=0.2),
                FadeIn(l4), rt=0.55)
        self.melanger(cs, 2)
        q1 = T("Combien de clés", 34).move_to(P(0, -0.3))
        q2 = T("possibles ?", 34).move_to(P(0, -0.9))
        gros = T("?", 110, EXPO_C, audit=False).move_to(P(0, -2.0))
        self.au("Combien", FadeIn(q1, shift=UP * 0.12), rt=0.3)
        self.au("possibles", FadeIn(q2, shift=UP * 0.12), FadeIn(gros, scale=1.6), rt=0.35)
        self.insister(gros, 1.3, 0.2)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(q1, q2, gros, l4, *cs[3:])), run_time=0.3)

        # ── 01 : 2³ sous les 3 cases, × 2⁴ sous les 4 cases, puis 2⁷ ──
        self.dire("01-bits")
        carte = self.carte(0.3, -2.9)
        cs4 = self.cases()[3:]
        p3 = puiss(2, 3, fs=56).move_to(P(XS[1], -0.15))
        fois = T("×", 44)
        p4 = puiss(2, 4, fs=56)
        g4 = VGroup(fois, p4).arrange(RIGHT, buff=0.18).move_to(P((XS[3] + XS[6]) / 2, -0.15))
        fois.set_y(p4.base.get_y())
        f3 = Arrow(P(XS[1], Y_BITS - 0.75), P(XS[1], 0.3), buff=0, color=BASE_C, stroke_width=4,
                   max_tip_length_to_length_ratio=0.3)
        f4 = Arrow(P(g4.get_x(), Y_BITS - 0.75), P(g4.get_x(), 0.3), buff=0, color=EXPO_C, stroke_width=4,
                   max_tip_length_to_length_ratio=0.3)
        n8 = T("8 clés", 26, VERT_OK).next_to(p3, DOWN, buff=0.15)
        self.au("3 bits", FadeIn(carte), Indicate(VGroup(*cs[:3]), color=BASE_C, scale_factor=1.1), rt=0.4)
        self.au("2 puissance", GrowArrow(f3), FadeIn(p3.base, scale=1.3), rt=0.3)
        self.au("3,", FadeIn(p3.expo, scale=1.6), rt=0.25)
        self.au("8 clés", FadeIn(n8, shift=UP * 0.12), rt=0.3)
        self.au("4 bits", LaggedStart(*[FadeIn(c, shift=LEFT * 0.25) for c in cs4], lag_ratio=0.2), FadeIn(l4), rt=0.5)
        self.au("fois", GrowArrow(f4), FadeIn(fois, scale=1.3), rt=0.3)
        self.au("2 puissance", FadeIn(p4.base, scale=1.3), rt=0.25)
        self.au("4.", FadeIn(p4.expo, scale=1.6), rt=0.25)
        self.melanger(list(cs[:3]) + list(cs4), 1)
        a, b = puiss(2, 3, fs=52), puiss(2, 4, fs=52)
        x2 = T("×", 40)
        r = expo2(2, "3", "+4", fs=52)
        e1 = T("=", 40, WHITE, audit=False)
        lc = rangee(a, x2, b, e1, r, buff=0.16)
        if lc.width > 3.4:  # 85 % de la carte (4,15)
            lc.scale_to_fit_width(3.4)
        lc.move_to(P(0, -1.35))
        self.au("2 puissance", FadeIn(a.base, scale=1.3), rt=0.25)
        self.au("3 fois", FadeIn(a.expo, scale=1.6), FadeIn(x2), rt=0.25)
        self.au("2 puissance", FadeIn(b.base, scale=1.3), rt=0.25)
        self.au("4 :", FadeIn(b.expo, scale=1.6), rt=0.25)
        self.au("on additionne", FadeIn(e1), FadeIn(r.base, scale=1.3), TransformFromCopy(a.expo, r.e1), rt=0.4)
        self.au("exposants", TransformFromCopy(b.expo, r.e2), rt=0.4)
        self.insister(r.expo, 1.5, 0.2)
        p7 = puiss(2, 7, fs=56)
        n128 = T("128", 50, VERT_OK)
        ld = rangee(T("=", 40, WHITE, audit=False), p7, T("=", 40, WHITE, audit=False), n128,
                    T("clés", 32, VERT_OK), buff=0.16)
        ld[4].next_to(n128, RIGHT, buff=0.2).align_to(n128, DOWN)
        if ld.width > 3.3:  # avec son cadre : 85 % de la carte
            ld.scale_to_fit_width(3.3)
        ld.move_to(P(0, -2.3))
        self.au("2 puissance", FadeIn(ld[0]), FadeIn(p7.base, scale=1.3),
                LaggedStart(*[Indicate(c, color=WHITE, scale_factor=1.15) for c in list(cs[:3]) + list(cs4)],
                            lag_ratio=0.1), rt=0.6)
        self.au("7,", FadeIn(p7.expo, scale=1.6), rt=0.25)
        self.au("128", FadeIn(ld[2]), FadeIn(n128, scale=1.4), rt=0.3)
        self.au("clés", FadeIn(ld[4], shift=LEFT * 0.1), rt=0.25)
        self.play(Create(SurroundingRectangle(ld, color=VERT_OK, buff=0.1, corner_radius=0.08)),
                  run_time=0.3)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) : 2⁵ × 2⁵ ? ──
        choix = [puiss(2, 10, fs=34), puiss(4, 10, fs=34), puiss(2, 25, fs=34)]
        plans = [[("2 puissance", [choix[0].base]), ("10.", [choix[0].expo])],
                 [("4 puissance", [choix[1].base]), ("10.", [choix[1].expo])],
                 [("2 puissance", [choix[2].base]), ("25.", [choix[2].expo])]]

        def avant(sc, q):
            sc.poser_idx(q[0], [(0, "2 puissance"), (1, "5 fois"), (5, "2 puissance"), (6, "5 ?")])

        def apres(sc):
            l0 = sc.rep_puiss(0, "Réponse A :", 2, 10)
            sc.au("A :", FadeIn(l0.pre, shift=UP * 0.12), rt=0.25)
            sc.au("2 puissance", FadeIn(l0.p.base, shift=UP * 0.12), rt=0.25)
            sc.au("10.", FadeIn(l0.p.expo, l0.pt, shift=UP * 0.12), rt=0.25)
            sc.pieges(1, 2)
            l1 = sc.rep_ligne(1, ["La base reste", "2 :"])
            for m, ex in zip(l1, ["La base", "2 :"]):
                sc.au(ex, FadeIn(m, shift=UP * 0.12), rt=0.22)
            l2 = sc.rep_ligne(2, ["5 +", "5 =", "10 ;", "1 024 clés."])
            for m, ex in zip(l2, ["5 plus", "5,", "10.", "1 024"]):
                sc.au(ex, FadeIn(m, shift=UP * 0.12), rt=0.22)
            sc.insister(l2[3], 1.2, 0.2)

        self.qpause("01q-question", "01r-reponse", ["2⁵ × 2⁵ ?"], choix, plans, 0,
                    ["Réponse A : 2¹⁰.", "La base reste 2 :", "5 + 5 = 10 ; 1 024 clés."], avant=avant, apres=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire : une clé de 128 bits ──
        self.dire("02-question")
        grille = VGroup(*[Square(side_length=0.17, stroke_color=CIEL, stroke_width=1.2, fill_color="#1e3a8a",
                                 fill_opacity=0.8) for _ in range(128)]).arrange_in_grid(8, 16, buff=0.045)
        grille.move_to(P(0, 1.2))
        carte = self.carte(0.3, -2.9)
        l1 = VGroup(T("Une clé de", 30), T("128 bits :", 30, EXPO_C)).arrange(RIGHT, buff=0.15)
        if l1.width > 3.6:
            l1.scale_to_fit_width(3.6)
        l1.move_to(P(0, -0.1))
        l2 = T("combien de clés ?", 30).move_to(P(0, -0.65))
        self.au("Et une", FadeIn(carte), FadeIn(l1[0], shift=UP * 0.1), rt=0.4)
        self.au("128 bits", FadeIn(l1[1], scale=1.2), LaggedStart(*[FadeIn(c, scale=0.3) for c in grille],
                                                                   lag_ratio=0.01), rt=1.0)
        self.au("combien", FadeIn(l2, shift=UP * 0.1), rt=0.3)
        l3 = T("Écris-le avec une puissance", 28, CIEL).move_to(P(0, -1.25))
        fo = puiss(2, "?", fs=60, audit=False).move_to(P(0, -1.95))
        self.au("Écris-le", FadeIn(l3, shift=UP * 0.1), rt=0.35)
        self.au("puissance", FadeIn(fo, scale=1.3), rt=0.35)
        self.insister(fo.expo, 1.6, 0.2)
        self.au("réponds")
        appel = self.borne(T("Réponds en commentaire !", 30, VERT_OK), 0.95).move_to(P(0, -2.6))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.0)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])
