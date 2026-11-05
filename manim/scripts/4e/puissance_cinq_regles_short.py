# puissance_cinq_regles_short.py
# EleveAI — Maths 1re (résumé commun 1re + STMG) — série PUISSANCES, épisode 13,
# le SHORT ceinture BLANCHE « 2³ × 2⁴ = 4⁷ ? ».
#   · le titre EST la question : 2³ × 2⁴ = 4⁷ ?, très lisible dès la 1re seconde ;
#   · EN HAUT, l'image : les 7 facteurs 2, en jetons, qui se rangent en une seule
#     rangée ; une barre « 128 » face à une barre énorme « 16 384 » ;
#   · EN BAS, au même instant, les maths se remplissent (base BLEUE, exposant
#     ORANGE, juste VERT, piège ROUGE) ;
#   · 1 question-pause (3 s) : 5² × 5³ → 25⁵ / 5⁵ / 5⁶ ;
#   · fin : 3⁴ × 3⁵ écrit, question en commentaire, puis la fin standard.
# Micro du coach : auto_num_puissances. Centres : jeux-defis.
#
# ⛔ Le titre (la question de la vidéo) est posé d'un bloc à 0 s, à la demande de
# la commande de l'épisode (image à 1 s) : la voix le lit aussitôt après, et la
# feuille du dessous écrit chaque morceau AU MOT.
#
# Voix : manim/voix/1re-puissance-cinq-regles-short.json (validée), débit −6 ;
# WAV : public/sons/1re-puissance-cinq-regles-short/ ; marques :
# puissance_cinq_regles_short_marques.json (marques_dump + conversion PAR PAIRES).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/puissance_cinq_regles_short.py PuissanceCinqReglesShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/puissance_cinq_regles_short.py PuissanceCinqReglesShort -o eleveai-maths-premiere-puissance-cinq-regles-short --media_dir manim/scripts/4e/media-puiss-13-short
# Sortie : manim/sorties/premiere/maths/puissances/13-cinq-regles/eleveai-maths-premiere-puissance-cinq-regles-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "6e"))

from prop_commun import *  # noqa: E402,F403

sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from puissance_notation_scientifique import OutilsNotation, ligne_base, pied, puiss, sans_audit  # noqa: E402
from puissance_notation_scientifique import T as T_paysage  # noqa: E402
from puissance_produit_quotient import barre  # noqa: E402
from puissance_cinq_regles import ldb, sur_base  # noqa: E402

BASE_C = BLEU_CALCUL
EXPO_C = ORANGE_RETENUE
PIEGE = ROUGE_ERREUR
CIEL = "#93c5fd"
ENCRE = "#0f172a"
FS_L = 23                     # les lignes du calcul, UNE seule taille
YL = (-0.2, -0.68, -1.16, -1.64, -2.12, -2.6)
YB_REP = (-1.1, -1.5, -1.9, -2.3)  # les lignes de base de la réponse
FS_REP = 23


def T(s, fs=34, c=WHITE, audit=True, largeur=3.8):
    t = T_paysage(s, fs, c, audit)
    if t.width > largeur:
        t.scale_to_fit_width(largeur)
    return t


def op(s, fs=FS_L, c=WHITE):
    return T(s, fs * 0.9, c, audit=False)


def jeton(b=2, r=0.2, c=BASE_C):
    d = Circle(radius=r, fill_color=c, fill_opacity=0.95, stroke_color=CIEL, stroke_width=2)
    return VGroup(d, T(str(b), r * 110, WHITE, audit=False).move_to(d))


def stylo(s=1.0):
    corps = Rectangle(width=0.16, height=1.0, fill_color="#1d4ed8", fill_opacity=1, stroke_width=0)
    pointe = Polygon(P(-0.08, -0.5), P(0.08, -0.5), P(0, -0.72), fill_color=ENCRE, fill_opacity=1, stroke_width=0)
    return VGroup(corps, pointe).rotate(-0.6).scale(s)


class PuissanceCinqReglesShort(OutilsNotation, ShortProp):
    nom_voix = "1re-puissance-cinq-regles-short"
    fichier_marques = "puissance_cinq_regles_short_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """« Question ! » et le compte à rebours reculent vers la gauche (3 %) ;
        cartes réduites : les 4 lignes de la réponse tiennent au-dessus de Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = rebours.get_right()[0] - 1.9
        if d > 0:
            tete.shift(LEFT * d)
            rebours.shift(LEFT * d)
        cartes.scale(0.8).next_to(q, DOWN, buff=0.18).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.18).set_x(0)
        ph.arrange(DOWN, buff=0.12).next_to(cartes, DOWN, buff=0.16).set_x(0)
        self.y0_rep = cartes.get_bottom()[1] - 0.42
        return tete, q, cartes, pause, rebours, ph

    def y_rep(self, i):
        return self.y0_rep - 0.42 * i

    def rep_txt(self, i, morceaux):
        """La ligne i de la réponse, sur sa ligne de base, TOUJOURS à FS_REP."""
        lg = ligne_base(VGroup(*[T(m, FS_REP, VERT_OK) for m in morceaux]).arrange(RIGHT, buff=0.12))
        lg.set_x(0)
        lg.shift(UP * (self.y_rep(i) - pied(lg[0])))
        if lg.width > 4.05:
            print(f"LARGE réponse {morceaux} : {lg.width:.2f}", flush=True)
        return lg

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

    def poser_idx(self, t, plan, rt=0.2, avec=None):
        s = t.original_text
        bornes = [a for a, _ in plan] + [len(s)]
        k, pieces = 0, []
        for a, b in zip(bornes[:-1], bornes[1:]):
            n = sum(1 for c in s[a:b] if not c.isspace())
            pieces.append(VGroup(*t.submobjects[k:k + n]))
            k += n
        for j, ((_, ex), pc) in enumerate(zip(plan, pieces)):
            self.au(ex, FadeIn(pc, shift=UP * 0.1), *((avec or {}).get(j, [])), rt=rt)
        return pieces

    def carte(self, haut=0.25, bas=-2.85):
        return RoundedRectangle(width=4.15, height=haut - bas, corner_radius=0.18, fill_color="#0b1220",
                                fill_opacity=1, stroke_color="#334155", stroke_width=2).move_to(P(0, (haut + bas) / 2))

    def rangee_facteurs(self, n, y, base=2):
        """« 2 × 2 × 2 » : .f (facteurs) .x (signes) ; données posées au mot."""
        items, f, x = [], VGroup(), VGroup()
        for k in range(n):
            if k:
                s = op("×")
                items.append(s)
                x.add(s)
            t = T(str(base), FS_L, BASE_C, audit=False)
            items.append(t)
            f.add(t)
        g = VGroup(*items).arrange(RIGHT, buff=0.11)
        for s in x:
            s.set_y(f[0].get_y())
        g.f, g.x = f, x
        return g

    def construct(self):
        margo = self.margo_bas()
        _, badge = self.entete_short("x", self.ceinture)
        self.add(badge)
        # ── le titre : la question de la vidéo, lisible dès la 1re seconde ──
        fs_t = 54
        t1, tx, t2, te, t3, tq = (puiss(2, 3, fs=fs_t, audit=False), T("×", fs_t * 0.8, audit=False),
                                  puiss(2, 4, fs=fs_t, audit=False), T("=", fs_t * 0.8, audit=False),
                                  puiss(4, 7, fs=fs_t, audit=False), T("?", fs_t, JAUNE_TITRE, audit=False))
        titre = ldb(t1, tx, t2, te, t3, tq, buff=0.14)
        if titre.width > 4.1:
            titre.scale_to_fit_width(4.1)
        sur_base(titre, 3.22, x=0)
        sans_audit(titre)
        self.add(titre)
        garder = [badge, titre, margo]

        # ── 00 : la feuille à signer ──
        self.dire("00-accroche")
        feuille = RoundedRectangle(width=3.85, height=2.5, corner_radius=0.12, fill_color="#f1f5f9", fill_opacity=1,
                                   stroke_color="#94a3b8", stroke_width=2).move_to(P(0, 1.0))
        fs_f = 48
        kw = dict(fs=fs_f, cb="#1d4ed8", ce="#c2410c")  # lisibles sur le papier clair
        a, x, b, e, c = (puiss(2, 3, **kw), T("×", fs_f * 0.8, ENCRE, audit=False), puiss(2, 4, **kw),
                         T("=", fs_f * 0.8, ENCRE, audit=False), puiss(4, 7, **kw))
        sur_base(ldb(a, x, b, e, c, buff=0.14), 1.35, x=0)
        sig = DashedLine(P(-1.5, 0.3), P(1.5, 0.3), color="#475569", stroke_width=3, dash_length=0.1)
        st = stylo(0.8).move_to(P(1.45, 0.72))
        self.au("2 puissance", FadeIn(feuille), FadeIn(a.base, scale=1.3), rt=0.2)
        self.au("3 fois", FadeIn(a.expo, scale=1.6), rt=0.2)
        self.au("fois", FadeIn(x), rt=0.15)
        self.au("2 puissance", FadeIn(b.base, scale=1.3), rt=0.15)
        self.au("4,", FadeIn(b.expo, scale=1.6), rt=0.2)
        self.au("égale", FadeIn(e), rt=0.2)
        self.au("4 puissance", FadeIn(c.base, scale=1.4), rt=0.2)
        self.au("7.", FadeIn(c.expo, scale=1.8), rt=0.2)
        self.insister(c, 1.2, 0.2)
        tu = T("Tu signes ?", 46, EXPO_C).move_to(P(0, -1.1))
        self.au("Tu signes", FadeIn(tu, scale=0.8), FadeIn(sig), FadeIn(st, shift=UP * 0.3), rt=0.3)
        self.play(st.animate.shift(LEFT * 2.2 + DOWN * 0.08), run_time=0.45)
        self.attendre_voix(marge=0.25)
        self.vider(garder)

        # ── 01 : les 7 facteurs : la rangée, les barres, les maths en bas ──
        self.dire("01-facteurs")
        carte = self.carte()
        Xj = [-1.72 + 0.47 * k for k in range(3)] + [-0.38 + 0.47 * k + 0.0 for k in range(4)]
        X_fin = [-1.41 + 0.47 * k for k in range(7)]
        jets = VGroup(*[jeton().move_to(P(X, 2.0)) for X in Xj])
        def lig(*ms, y):
            g = ldb(*ms, buff=0.13)
            sur_base(g, y)
            g.shift(RIGHT * (-1.88 - g.get_left()[0]))
            return g
        l1p, l1e, l1f = puiss(2, 3, fs=FS_L, audit=False), op("="), self.rangee_facteurs(3, 0)
        lig(l1p, l1e, l1f, y=YL[0])
        l2p, l2e, l2f = puiss(2, 4, fs=FS_L, audit=False), op("="), self.rangee_facteurs(4, 0)
        lig(l2p, l2e, l2f, y=YL[1])
        self.au("Écris", FadeIn(carte), FadeIn(l1p), FadeIn(l1e), rt=0.3)
        for k, ex in enumerate(("2 fois", "2 fois", "2,")):
            self.au(ex, FadeIn(l1f.f[k], scale=1.3), FadeIn(jets[k], scale=0.5), rt=0.15)
            if k < 2:
                self.au("fois", FadeIn(l1f.x[k]), rt=0.1)
        self.au("puis", FadeIn(l2p), FadeIn(l2e), rt=0.15)
        for k, ex in enumerate(("2 fois", "2 fois", "2 fois", "2.")):
            self.au(ex, FadeIn(l2f.f[k], scale=1.3), FadeIn(jets[3 + k], scale=0.5), rt=0.15)
            if k < 3:
                self.au("fois", FadeIn(l2f.x[k]), rt=0.1)
        # les 7 jetons se rangent en UNE rangée, encadrée
        sept = T("7 facteurs :", FS_L, EXPO_C, audit=False)
        p7, e7, n128 = puiss(2, 7, fs=FS_L), op("="), T("128", FS_L, VERT_OK)
        lig(sept, p7, e7, n128, y=YL[2])
        cad = RoundedRectangle(width=3.5, height=0.55, corner_radius=0.12, stroke_color=EXPO_C, stroke_width=3).move_to(P(0, 2.0))
        self.au("Sept", *[j.animate.move_to(P(xf, 2.0)) for j, xf in zip(jets, X_fin)], FadeIn(sept, shift=RIGHT * 0.1), rt=0.5)
        self.play(Create(cad), run_time=0.2)
        self.au("2 puissance", FadeIn(p7.base, scale=1.3), rt=0.2)
        self.au("7,", FadeIn(p7.expo, scale=1.6), rt=0.2)
        b128 = Rectangle(width=0.05, height=0.34, fill_color=VERT_OK, fill_opacity=1, stroke_width=0)
        b128.move_to(P(-1.97, 1.25))
        lab128 = T("128", 28, VERT_OK).next_to(b128, RIGHT, buff=0.1)
        self.au("128.", FadeIn(e7), FadeIn(n128, scale=1.3), FadeIn(b128), FadeIn(lab128, shift=LEFT * 0.1), rt=0.3)
        self.insister(lab128, 1.2, 0.15)
        p47, e47, nb = puiss(4, 7, fs=FS_L), op("="), T("16 384", FS_L, PIEGE, audit=False)
        lig(p47, e47, nb, y=YL[3])
        self.au("4 puissance", FadeIn(p47.base, scale=1.3), rt=0.2)
        self.au("7 ?", FadeIn(p47.expo, scale=1.6), rt=0.2)
        bar = Rectangle(width=0.05, height=0.42, fill_color=PIEGE, fill_opacity=1, stroke_width=0)
        bar.move_to(P(-1.97, 0.7))
        grande = Rectangle(width=3.94, height=0.42, fill_color=PIEGE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.7))
        lab = T("16 384", 28, WHITE, audit=False).move_to(P(0, 0.7))
        self.au("16", FadeIn(e47), FadeIn(nb, scale=1.2), Transform(bar, grande), FadeIn(lab), rt=0.5)
        self.insister(VGroup(bar, lab), 1.02, 0.15)
        trop = T("Beaucoup trop !", FS_L, PIEGE)
        trop.shift(UP * (YL[4] - pied(trop)) + RIGHT * (-1.88 - trop.get_left()[0]))
        self.au("Beaucoup", FadeIn(trop, scale=0.8), Create(barre(t3, PIEGE, 7)), rt=0.3)
        fin = T("La base ne change pas.", FS_L, VERT_OK)
        fin.shift(UP * (YL[5] - pied(fin)) + RIGHT * (-1.88 - fin.get_left()[0]))
        self.au("La base", FadeIn(fin, shift=UP * 0.1), rt=0.3)
        self.insister(fin, 1.05, 0.2)
        self.attendre_voix(marge=0.3)
        self.vider(garder + [m for m in self.mobjects if isinstance(m, Line) and m.get_y() > 2.8])

        # ── 01q : la question-pause (3 s) : 5² × 5³ ? ──
        choix = [puiss(25, 5, fs=38), puiss(5, 5, fs=38), puiss(5, 6, fs=38)]
        plans = [[("25 puissance", [choix[0].base]), ("5.", [choix[0].expo])],
                 [("5 puissance", [choix[1].base]), ("5.", [choix[1].expo])],
                 [("5 puissance", [choix[2].base]), ("6.", [choix[2].expo])]]

        def avant(sc, q):
            sc.poser_idx(q[0], [(0, "5 puissance"), (1, "2 fois"), (3, "fois"), (5, "5 puissance"), (6, "3 ?")])

        def apres(sc):
            pre = T("Réponse B :", FS_REP, VERT_OK)
            p = puiss(5, 5, fs=FS_REP, cb=VERT_OK, ce=VERT_OK)
            pt = T(".", FS_REP, VERT_OK)
            VGroup(pre, p).arrange(RIGHT, buff=0.12)
            p.shift(UP * (pied(pre) - p.base.get_bottom()[1]))
            pt.next_to(p.expo, RIGHT, buff=0.03)
            pt.shift(UP * (pied(pre) - pt.get_bottom()[1]))
            lg = VGroup(pre, p, pt).set_x(0)
            lg.shift(UP * (sc.y_rep(0) - pied(pre)))
            sc.au("B :", FadeIn(pre, shift=UP * 0.1), rt=0.2)
            sc.au("5 puissance", FadeIn(p.base, shift=UP * 0.1), rt=0.2)
            sc.au("5.", FadeIn(p.expo, pt, shift=UP * 0.1), rt=0.2)
            sc.pieges(0, 2)
            l1 = sc.rep_txt(1, ["On garde la base,"])
            sc.au("On garde", FadeIn(l1, shift=UP * 0.1), rt=0.25)
            l2 = sc.rep_txt(2, ["on additionne les"])
            sc.au("on additionne", FadeIn(l2, shift=UP * 0.1), rt=0.25)
            l3 = sc.rep_txt(3, ["exposants :", "2 +", "3."])
            sc.au("exposants", FadeIn(l3[0], shift=UP * 0.1), rt=0.2)
            sc.au("2 plus", FadeIn(l3[1], shift=UP * 0.1), rt=0.2)
            sc.au("3.", FadeIn(l3[2], shift=UP * 0.1), rt=0.2)

        self.qpause("01q-question", "01r-reponse", ["5² × 5³ ?"], choix, plans, 1,
                    ["Réponse B : 5⁵.", "On garde la base,", "on additionne les", "exposants : 2 + 3."],
                    avant=avant, apres=apres)
        self.vider(garder + [m for m in self.mobjects if isinstance(m, Line) and m.get_y() > 2.8])

        # ── 02 : la question en commentaire : 3⁴ × 3⁵ ──
        self.dire("02-question")
        carte = self.carte()
        J4 = VGroup(*[jeton(3, 0.17, c=BASE_C).move_to(P(-1.88 + 0.38 * k, 1.25)) for k in range(4)])
        J5 = VGroup(*[jeton(3, 0.17, c=BASE_C).move_to(P(0.28 + 0.38 * k, 1.25)) for k in range(5)])
        fs_q = 60
        a, x, b = puiss(3, 4, fs=fs_q), T("×", fs_q * 0.8, audit=False), puiss(3, 5, fs=fs_q)
        sur_base(ldb(a, x, b, buff=0.2), -0.75, x=0)
        self.au("Et 3", FadeIn(carte), rt=0.2)
        self.au("3 puissance", FadeIn(a.base, scale=1.3), rt=0.15)
        self.au("4 fois", FadeIn(a.expo, scale=1.6), LaggedStart(*[FadeIn(j, scale=0.5) for j in J4], lag_ratio=0.2), rt=0.3)
        self.au("fois", FadeIn(x), rt=0.15)
        self.au("3 puissance", FadeIn(b.base, scale=1.3), rt=0.2)
        self.au("5,", FadeIn(b.expo, scale=1.6), LaggedStart(*[FadeIn(j, scale=0.5) for j in J5], lag_ratio=0.2), rt=0.3)
        l = T("ça s'écrit comment ?", 25, EXPO_C).move_to(P(0, -1.65))
        self.au("ça s'écrit", FadeIn(l, shift=UP * 0.1), rt=0.3)
        self.insister(l, 1.08, 0.15)
        appel = T("Réponds en commentaire !", 30, VERT_OK)
        appel.scale_to_fit_width(min(appel.width, 3.7)).move_to(P(0, -2.45))
        self.au("Réponds", FadeIn(appel, scale=0.7), rt=0.35)
        self.insister(appel, 1.06, 0.25)
        self.attendre_voix(marge=1.0)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])
