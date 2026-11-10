# distrib_reduire_short.py
# EleveAI — Maths 4e — série DISTRIBUTIVITÉ, épisode 03, le SHORT ceinture ORANGE
# « Le tri des chaussettes » : 3x + 5 + 2x + 1, ça ne fait pas 11x. On range comme des
# chaussettes : les bleues (les termes en x, bleus comme x) dans un tiroir, les rouges
# (les nombres) dans l'autre : 5x + 6.
#   · 1 question-pause (3 s) : 2(x + 3) + x, bonne réponse A (3x + 6) ;
#   · fin : 4(x + 1) + 2x, réponse en commentaire, fin du 05/11.
# Micro : litteral_distributivite_reduire.
# Voix : manim/voix/4e-distrib-reduire-short.json (validée) ; marques : distrib_reduire_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/distrib_reduire_short.py DistribReduireShort4e
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/distrib_reduire_short.py DistribReduireShort4e -o eleveai-maths-4e-distrib-reduire-short --media_dir manim/scripts/4e/media-dist-03-short
# Sortie : manim/sorties/4e/maths/distributivite/03-reduire/eleveai-maths-4e-distrib-reduire-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402

BLEUE = "#2563eb"  # les chaussettes bleues : les termes en x
ROUGE = "#dc2626"  # les chaussettes rouges : les nombres
ROUGE_TXT = "#f87171"
FOND = "#0b1220"


def chaussette(couleur, s, fs=26):
    """Une chaussette (tige, pied, revers blanc) qui porte un terme."""
    tige = RoundedRectangle(width=0.5, height=0.7, corner_radius=0.08, fill_color=couleur, fill_opacity=1,
                            stroke_width=0).move_to(P(0, 0.1))
    pied = RoundedRectangle(width=0.78, height=0.3, corner_radius=0.13, fill_color=couleur, fill_opacity=1,
                            stroke_width=0).move_to(P(0.14, -0.25))
    revers = Rectangle(width=0.5, height=0.12, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.42))
    txt = T(s, fs, WHITE, audit=False, gras=True).move_to(P(0, 0.08))
    g = VGroup(tige, pied, revers, txt)
    g.txt = txt
    return g


def tiroir(couleur, w=1.85, h=1.2):
    """Un tiroir de commode : la façade et sa poignée."""
    caisse = RoundedRectangle(width=w, height=h, corner_radius=0.1, stroke_color=couleur, stroke_width=4,
                              fill_color=FOND, fill_opacity=1)
    poignee = RoundedRectangle(width=0.5, height=0.1, corner_radius=0.05, fill_color="#94a3b8", fill_opacity=1,
                               stroke_width=0).next_to(caisse, DOWN, buff=-0.17)
    g = VGroup(caisse, poignee)
    g.caisse = caisse
    return g


class DistribReduireShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-distrib-reduire-short"
    fichier_marques = "distrib_reduire_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

    def l(self, s, y, fs=32, c=WHITE, lettres=""):
        e = E(s, fs, c, lettres=lettres)
        if e.width > 3.95:
            e.scale_to_fit_width(3.95)
        return e.move_to(P(0, y))

    def _disposer_q(self, question, choix, phrase):
        """Deux lignes de réponse : les cartes restent à 85 %, la réponse ne descend pas sur Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.16).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        ph.arrange(DOWN, buff=0.1).next_to(cartes, DOWN, buff=0.12).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le tri des chaussettes", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : 3x + 5 + 2x + 1, ça fait 11x ? ──
        self.dire("00-accroche")
        e0 = self.l("3x + 5 + 2x + 1", 1.55, 56, lettres="x")
        self.dire_eq(e0, "3 x plus 5, plus 2 x plus 1.", avec=[FadeIn(titre)])
        l1 = self.l("Ça fait 11x ?", 0.5, 50, PIEGE)
        self.dit(l1, "Ça fait 11 x ?")
        onze = VGroup(l1.atomes[2], l1.atomes[3])
        non = self.l("Non !", -0.65, 72, PIEGE)
        ba = self.barrer(onze, sw=8)
        self.dit(non, "Non !", avec=[Create(ba)])
        self.insister(non, 1.2, 0.15)
        reg = self.l("Regarde.", -1.75, 44, CIEL)
        self.dit(reg, "Regarde.")
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : le tri : les bleues avec les bleues, les rouges avec les rouges ──
        self.dire("01-tri")
        s0 = VGroup(self.l("On range comme", 2.05, 38, CIEL), self.l("des chaussettes :", 1.55, 38, CIEL))
        termes = [("3x", BLEUE), ("5", ROUGE), ("2x", BLEUE), ("1", ROUGE)]
        socks = VGroup(*[chaussette(c, s) for s, c in termes]).arrange(RIGHT, buff=0.18).move_to(P(0, 0.7))
        self.dit(s0[0], "On range comme")
        self.dit(s0[1], "des chaussettes :",
                 avec=[LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in socks], lag_ratio=0.15)])
        tb = tiroir(BLEU_CALCUL).move_to(P(-1.0, -1.75))
        tr = tiroir(ROUGE).move_to(P(1.0, -1.75))
        lr = self.l("les rouges avec les rouges,", -0.3, 30, ROUGE_TXT)
        self.dit(lr, "les rouges avec les rouges,", avec=[FadeIn(tb), FadeIn(tr)])
        self.bring_to_front(socks)
        self.play(socks[1].animate.scale(0.8).move_to(tr.caisse.get_center() + P(-0.42, 0.05)),
                  socks[3].animate.scale(0.8).move_to(tr.caisse.get_center() + P(0.42, 0.05)), run_time=0.6)
        lb = self.l("les bleues avec les bleues.", -0.75, 30, CIEL)
        self.dit(lb, "les bleues avec les bleues.")
        self.play(socks[0].animate.scale(0.8).move_to(tb.caisse.get_center() + P(-0.42, 0.05)),
                  socks[2].animate.scale(0.8).move_to(tb.caisse.get_center() + P(0.42, 0.05)), run_time=0.6)
        # les calculs prennent la place des phrases
        self.au("Les x", FadeOut(VGroup(s0, lr, lb)), rt=0.2)
        cx = self.l("Les x : 3x + 2x = 5x", 1.75, 36, lettres="x")
        self.dit(cx, "Les x : 3 x plus 2 x, 5 x.", avec=[Circumscribe(tb, color=BLEU_CALCUL, run_time=0.5)])
        cn = self.l("Les nombres : 5 + 1 = 6", 1.05, 36)
        for k in (3, 5, 7):
            cn.atomes[k].set_color(ROUGE_TXT)
        self.dit(cn, "Les nombres : 5 plus 1, 6.", avec=[Circumscribe(tr, color=ROUGE, run_time=0.5)])
        r = self.l("Résultat : 5x + 6", 0.05, 44, VERT_OK)
        self.dit(r, "Résultat : 5 x plus 6.")
        cr = self.cadre_ok(r, 0.12)
        self.play(Create(cr), run_time=0.15)
        self.insister(VGroup(*r.atomes[2:]), 1.15, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Que donne", "Que donne", lettres="", fs=34)
            sc.eq_dans_q(0, "2(x + 3) + x ?", "2 fois, entre parenthèses, x plus 3, plus x ?", lettres="x", fs=34,
                         couleur=JAUNE_TITRE)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : 3x + 6", "Réponse A : 3 x plus 6", lettres="x", premier=True)
            sc.ph_eq(1, "2x + 6 + x = 3x + 6", "2 x plus 6, plus x : 3 x plus 6.", lettres="x")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Que donne", "2(x + 3) + x ?"],
                            [Eq("3x + 6", 34), Eq("2x + 6", 34), Eq("9x", 34)], 0,
                            ["Réponse A : 3x + 6", "2x + 6 + x = 3x + 6"],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        t = self.l("À toi.", 1.85, 46, CIEL)
        self.dit(t, "À toi.")
        u = self.l("Développe et réduis", 1.05, 38)
        self.dit(u, "Développe et réduis")
        q = self.l("4(x + 1) + 2x", 0.2, 56, lettres="x")
        q.atomes[0].set_color(OPERATION)
        self.dire_eq(q, "4 fois, entre parenthèses, x plus 1, plus 2 x.")
        tb = tiroir(BLEU_CALCUL, 1.5, 0.8).move_to(P(-0.85, -0.95))
        tr = tiroir(ROUGE, 1.5, 0.8).move_to(P(0.85, -0.95))
        ib = T("?", 40, BLEU_CALCUL, audit=False).move_to(tb.caisse)
        ir = T("?", 40, ROUGE_TXT, audit=False).move_to(tr.caisse)
        self.play(FadeIn(tb, shift=UP * 0.2), FadeIn(tr, shift=UP * 0.2), FadeIn(ib), FadeIn(ir), run_time=0.3)
        self.appel_commentaire(-2.0)

        # ── 03 : la fin du 05/11 ──
        self.fin_05_11("03-abonne", [x for x in self.mobjects if x is not margo])

    def fin_05_11(self, voix, a_effacer):
        """La fin du 05/11 : ce que dit la voix est écrit, « Un pouce · La cloche » en plus."""
        self.dire(voix)
        entraine = self.tx("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.5))
        site = self.tx("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.55))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.tx("Abonne-toi !", 42, VERT_OK).move_to(P(0, 0.1))
        poignee = self.tx("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -0.72))
        g1 = self.tx("Un pouce", 26)
        p = self.tx("·", 26, "#94a3b8")
        g2 = self.tx("La cloche", 26)
        VGroup(g1, p, g2).arrange(RIGHT, buff=0.16).move_to(P(0, -1.95))
        g2.align_to(g1, UP)
        self.play(FadeOut(Group(*a_effacer)), run_time=0.25)
        self.play(Write(entraine), run_time=0.35)
        self.au("éleveai", GrowFromCenter(site), Create(cadre), rt=0.4)
        self.au("pouce", FadeIn(g1, scale=1.3), rt=0.22)
        self.au("abonne-toi", FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), rt=0.3)
        self.au("cloche", FadeIn(p), FadeIn(g2, scale=1.3), rt=0.22)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25), run_time=0.45)
        self.attendre_voix(marge=1.0)
