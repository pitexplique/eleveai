# distrib_reconnaitre_short.py
# EleveAI — Maths 4e — série DISTRIBUTIVITÉ, épisode 04, le SHORT ceinture JAUNE
# « Le caissier du cinéma » : 2 amis, chacun une place à 3 euros et un pop-corn à 4 euros.
# Le caissier tape 2 × 3 + 4 = 10 euros : un seul pop-corn est compté (l'autre grisé, barré).
# Il fallait 2 × (3 + 4) = 2 × 7 = 14 euros : la parenthèse en fait un produit.
#   · 1 question-pause (3 s) : 5(x + 1), bonne réponse C (un produit) ;
#   · fin : « 3x + 2 : produit ou somme ? » en commentaire, fin du 05/11.
# Micro : litteral_distributivite_reconnaitre.
# Voix : manim/voix/4e-distrib-reconnaitre-short.json ; marques : distrib_reconnaitre_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/distrib_reconnaitre_short.py DistribReconnaitreShort4e
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/distrib_reconnaitre_short.py DistribReconnaitreShort4e -o eleveai-maths-4e-distrib-reconnaitre-short --media_dir manim/scripts/4e/media-dist-04-short
# Sortie : manim/sorties/4e/maths/distributivite/04-reconnaitre/eleveai-maths-4e-distrib-reconnaitre-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402
from frac_lotc_commun import personne  # noqa: E402

GRIS = "#94a3b8"
TICKET = "#facc15"


def ticket(s=1.0):
    """Une place de cinéma : un ticket jaune, deux encoches, un pointillé."""
    r = RoundedRectangle(width=0.56, height=0.34, corner_radius=0.05, fill_color=TICKET, fill_opacity=1, stroke_width=0)
    enc = VGroup(*[Circle(radius=0.06, fill_color=BLACK, fill_opacity=1, stroke_width=0).move_to(P(x, 0))
                   for x in (-0.28, 0.28)])
    pt = DashedLine(P(0.12, 0.15), P(0.12, -0.15), color="#92400e", stroke_width=2, dash_length=0.04)
    etoile = Star(5, outer_radius=0.08, fill_color="#92400e", fill_opacity=1, stroke_width=0).move_to(P(-0.07, 0))
    return VGroup(r, enc, pt, etoile).scale(s)


def popcorn(s=1.0):
    """Un pot de pop-corn rayé rouge et blanc."""
    pot = Polygon(P(-0.24, 0.12), P(0.24, 0.12), P(0.17, -0.3), P(-0.17, -0.3), fill_color=WHITE, fill_opacity=1,
                  stroke_width=0)
    raies = VGroup(*[Polygon(P(x - 0.04, 0.12), P(x + 0.04, 0.12), P(x * 0.72 + 0.03, -0.3), P(x * 0.72 - 0.03, -0.3),
                             fill_color="#dc2626", fill_opacity=1, stroke_width=0) for x in (-0.16, 0, 0.16)])
    grains = VGroup(*[Circle(radius=0.075, fill_color="#fef3c7", fill_opacity=1, stroke_color="#f59e0b", stroke_width=1.5)
                      .move_to(P(x, y)) for x, y in ((-0.16, 0.17), (-0.05, 0.22), (0.07, 0.2), (0.17, 0.16), (0.0, 0.3), (-0.1, 0.3), (0.11, 0.29))])
    return VGroup(pot, raies, grains).scale(s)


class DistribReconnaitreShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-distrib-reconnaitre-short"
    fichier_marques = "distrib_reconnaitre_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"

    def l(self, s, y, fs=32, c=WHITE, lettres="", maxw=3.95):
        e = E(s, fs, c, lettres=lettres)
        if e.width > maxw:
            e.scale_to_fit_width(maxw)
        return e.move_to(P(0, y))

    def petit(self, s, x, y, fs=22, c=WHITE):
        """Une étiquette sous 30 : composée à 30 puis réduite (la police mange les espaces)."""
        return E(s, 30, c, lettres="").scale(fs / 30).move_to(P(x, y))

    def _disposer_q(self, question, choix, phrase):
        """Trois lignes de réponse : les cartes restent à 85 %, la réponse ne descend pas sur Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.16).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        ph.arrange(DOWN, buff=0.1).next_to(cartes, DOWN, buff=0.12).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le caissier du cinéma", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : 2 amis au cinéma ──
        self.dire("00-accroche")
        amis = VGroup(personne(peau="#c68642", tenue="#7c3aed", cheveux="#1f2937", s=0.4),
                      personne(peau="#f1c27d", tenue="#0d9488", cheveux="#78350f", longs=True, s=0.4))
        amis[0].move_to(P(-1.05, 1.2))
        amis[1].move_to(P(1.05, 1.2))
        l1 = self.l("2 amis au cinéma.", 1.95, 38, CIEL)
        self.dit(l1, "2 amis au cinéma.", avec=[FadeIn(titre)])
        self.play(LaggedStart(*[FadeIn(a, shift=UP * 0.2) for a in amis], lag_ratio=0.3), run_time=0.4)
        tk = VGroup(ticket().move_to(P(-1.5, 0.28)), ticket().move_to(P(0.6, 0.28)))
        pc = VGroup(popcorn().move_to(P(-0.62, 0.3)), popcorn().move_to(P(1.48, 0.3)))
        p3 = self.petit("3 euros", -1.5, -0.3)
        p3b = self.petit("3 euros", 0.6, -0.3)
        p3b.sans_audit()
        self.au("une place", LaggedStart(*[FadeIn(t, shift=DOWN * 0.15) for t in tk], lag_ratio=0.3), rt=0.4)
        self.dit(p3, "3 euros", avec=[FadeIn(p3b)])
        p4 = self.petit("4 euros", -0.62, -0.6)
        p4b = self.petit("4 euros", 1.48, -0.6)
        p4b.sans_audit()
        self.au("un pop-corn", LaggedStart(*[FadeIn(p, shift=DOWN * 0.15) for p in pc], lag_ratio=0.3), rt=0.4)
        self.dit(p4, "4 euros", avec=[FadeIn(p4b)])
        lc = self.l("Le caissier tape :", -1.12, 30, CIEL)
        caisse = RoundedRectangle(width=3.4, height=0.78, corner_radius=0.1, fill_color="#0f172a", fill_opacity=1,
                                  stroke_color=GRIS, stroke_width=3).move_to(P(0, -1.78))
        self.dit(lc, "Le caissier tape", avec=[FadeIn(caisse)])
        c0 = self.l("2 × 3 + 4", -1.78, 44)
        self.dire_eq(c0, "2 fois 3 plus 4.", echelle=1.15)
        q = self.l("Il a raison ?", -2.5, 34, JAUNE_TITRE)
        self.dit(q, "Il a raison ?")
        self.insister(q, 1.1, 0.18)
        self.attendre_voix(marge=0.3)

        # ── 01 : le calcul du caissier, puis le bon ──
        self.dire("01-calcul")
        caisse2 = RoundedRectangle(width=3.95, height=1.12, corner_radius=0.1, fill_color="#0f172a", fill_opacity=1,
                                   stroke_color=GRIS, stroke_width=3).move_to(P(0, -1.38))
        self.play(FadeOut(VGroup(lc, q, c0)), ReplacementTransform(caisse, caisse2), run_time=0.3)
        a = self.l("2 × 3 + 4 = 6 + 4", -1.13, 36, maxw=3.5)
        self.dire_eq(a, "2 fois 3 plus 4 : 6 plus 4", echelle=1.1)
        b = self.l("= 10 euros", -1.64, 36, maxw=3.5)
        self.dire_eq(b, "10 euros", echelle=1.1)
        croix = VGroup(Line(P(-0.25, -0.3), P(0.25, 0.3)), Line(P(-0.25, 0.3), P(0.25, -0.3))).set_stroke(PIEGE, 7)
        croix.move_to(pc[1])
        u1 = self.l("Un seul pop-corn", -2.15, 30, PIEGE)
        self.dit(u1, "Un seul pop-corn", avec=[pc[1].animate.set_opacity(0.25), p4b.animate.set_opacity(0.25), Create(croix)])
        u2 = self.l("est payé !", -2.55, 30, PIEGE)
        self.dit(u2, "est payé !")
        self.insister(pc[0], 1.3, 0.15)
        # le bon calcul
        boites = VGroup(*[DashedVMobject(SurroundingRectangle(VGroup(t, p), buff=0.08, color=CIEL, stroke_width=3,
                                                              corner_radius=0.08), num_dashes=36)
                          for t, p, e3, e4 in zip(tk, pc, (p3, p3b), (p4, p4b))])
        self.au("Il faut", FadeOut(VGroup(a, b, u1, u2, croix)), pc[1].animate.set_opacity(1), p4b.animate.set_opacity(1),
                rt=0.3)
        c = self.l("2 × (3 + 4)", -1.13, 40, maxw=3.5)
        self.poser_avec(c, "2 fois, entre parenthèses, 3 plus 4", {2: lambda: [Create(boites)]})
        d = self.l("= 2 × 7 = 14 euros", -1.64, 36, maxw=3.5)
        for k in (5, 6):
            d.atomes[k].set_color(VERT_OK)
        self.dire_eq(d, "2 fois 7, 14 euros", echelle=1.1)
        self.play(caisse2.animate.set_stroke(VERT_OK, width=5), run_time=0.2)
        self.insister(d.atomes[5], 1.3, 0.15)
        par = VGroup(c.atomes[2], c.atomes[6])
        v1 = self.l("La parenthèse change tout :", -2.15, 30, JAUNE_TITRE)
        self.dit(v1, "La parenthèse change tout :", avec=[par.animate.set_color(JAUNE_TITRE).scale(1.25)])
        self.play(par.animate.scale(1 / 1.25), run_time=0.15)
        v2 = self.l("c'est un produit.", -2.55, 32, CIEL)
        self.dit(v2, "c'est un produit.")
        self.insister(v2.atomes[-2], 1.25, 0.15)
        self.attendre_voix(marge=1.2)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "5(x + 1),", "5 fois, entre parenthèses, x plus 1,", lettres="x", fs=34, couleur=JAUNE_TITRE)
            sc.eq_dans_q(0, "c'est quoi ?", "c'est quoi ?", lettres="", fs=34)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : un produit.", "Réponse C : un produit.", premier=True)
            sc.ph_eq(1, "La dernière opération", "La dernière opération")
            sc.ph_eq(2, "est la multiplication par 5.", "est la multiplication par 5.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["5(x + 1),", "c'est quoi ?"],
                            ["une somme", "une différence", "un produit"], 2,
                            ["Réponse C : un produit.", "La dernière opération", "est la multiplication par 5."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        t = self.l("À toi.", 1.75, 46, CIEL)
        self.dit(t, "À toi.")
        q = self.l("3x + 2 :", 0.8, 64, lettres="x")
        self.dire_eq(q, "3 x plus 2 :")
        u = self.l("produit ou somme ?", -0.15, 40, JAUNE_TITRE)
        self.dit(u, "produit ou somme ?")
        self.insister(q.atomes[2], 1.4, 0.15)
        deco = VGroup(ticket(0.9), popcorn(0.9)).arrange(RIGHT, buff=0.3).move_to(P(0, -1.05))
        self.play(FadeIn(deco, shift=UP * 0.15), run_time=0.25)
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
