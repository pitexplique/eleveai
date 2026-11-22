# ident_choisir_short.py
# EleveAI — Maths 4e — série IDENTITÉS REMARQUABLES, épisode 04, le SHORT ceinture ORANGE
# « Le bon outil » : (x + 6)(x − 6). Tu sors les quatre produits ? Il y a plus rapide : les mêmes termes
# avec des signes contraires, l'identité donne tout de suite x² − 36 ; les quatre produits donnent la même
# chose en plus long (6x et −6x s'annulent, barrés).
#   · 1 question-pause (3 s) : (x + 6)(x − 1), bonne réponse A (la double distributivité) ;
#   · fin : développe (x − 10)(x + 10), réponse en commentaire (x² − 100), puis la fin commune
#     (manim/fin_commune.py : ecran_commentaire, ecran_fin).
# Micro : litteral_identite_choisir. Métier : Emma, styliste (la paysage). Centres : art-design (mode).
# Voix : manim/voix/4e-identites-choisir-short.json (validée) ; marques : ident_choisir_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/ident_choisir_short.py IdentChoisirShort4e --media_dir manim/scripts/4e/media-ident-04s-audit
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/ident_choisir_short.py IdentChoisirShort4e -o eleveai-maths-4e-identites-choisir-short --media_dir manim/scripts/4e/media-ident-04s
# Sortie : manim/sorties/4e/maths/identites/04-choisir/eleveai-maths-4e-identites-choisir-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402
from distrib_simple_short import DistribSimpleShort4e  # noqa: E402
from facto_verifier_short import FactoVerifierShort4e  # noqa: E402  (monter_reponse, eq_dans_q, q)
from fin_commune import ecran_commentaire, ecran_fin  # noqa: E402

PAROLE["²"] = "carré"

BANDE = OPERATION  # les flèches de la double distributivité


def fleche(a, b, angle=-1.3, bas=False, couleur=None):
    """Une flèche de la double distributivité, par-dessus ou par en dessous."""
    if bas:
        return CurvedArrow(a.get_bottom() + DOWN * 0.06, b.get_bottom() + DOWN * 0.08, angle=-angle,
                           color=couleur or BANDE, stroke_width=4, tip_length=0.12)
    return CurvedArrow(a.get_top() + UP * 0.06, b.get_top() + UP * 0.08, angle=angle, color=couleur or BANDE,
                       stroke_width=4, tip_length=0.12)


def quatre_fleches(e):
    """Les quatre flèches de (a + b)(c + d) : atomes 1 et 3 vers 6 et (7, 8)."""
    a, b, c, d = e.atomes[1], VGroup(e.atomes[2], e.atomes[3]), e.atomes[6], VGroup(e.atomes[7], e.atomes[8])
    return VGroup(fleche(a, c, -1.2), fleche(a, d, -1.0), fleche(b, c, -1.2, bas=True), fleche(b, d, -1.0, bas=True))


class IdentChoisirShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-identites-choisir-short"
    fichier_marques = "ident_choisir_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

    l = DistribSimpleShort4e.l
    def _disposer_q(self, question, choix, phrase):
        """Comme le short 03 de la factorisation : cartes à 85 %, larges de 3,7, la réponse au-dessus de Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(0.85).next_to(q, DOWN, buff=0.14).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        ph.arrange(DOWN, buff=0.1).next_to(cartes, DOWN, buff=0.12).set_x(0)
        for c in cartes:
            c[0].stretch_to_fit_width(3.7)
            c[1].align_to(c[0].get_left() + RIGHT * 0.2, LEFT)
        return tete, q, cartes, pause, rebours, ph

    monter_reponse = FactoVerifierShort4e.monter_reponse
    eq_dans_q = FactoVerifierShort4e.eq_dans_q
    q = FactoVerifierShort4e.q

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le bon outil", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : les quatre produits ? ──
        self.dire("00-accroche")
        e0 = self.q("(x + 6)(x − 6)", 1.45, 62, largeur=3.6)
        self.dire_eq(e0, "x plus 6, fois x moins 6.", avec=[FadeIn(titre)])
        f0 = quatre_fleches(e0)
        l1 = self.l("Tu sors les", 0.15, 42)
        l1b = self.l("quatre produits ?", -0.4, 42, CIEL)
        self.dit(l1, "Tu sors les")
        self.dit(l1b, "quatre produits ?", avec=[LaggedStart(*[Create(f) for f in f0], lag_ratio=0.25)])
        l2 = self.l("Il y a", -1.3, 48, JAUNE_TITRE)
        l2b = self.l("plus rapide.", -1.9, 48, JAUNE_TITRE)
        l2b.scale_to_fit_width(min(l2b.width, 3.5))
        self.dit(l2, "Il y a", avec=[f0.animate.set_opacity(0.35)])
        self.dit(l2b, "plus rapide.")
        self.insister(VGroup(l2, l2b), 1.1, 0.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : le raccourci : l'identité ──
        self.dire("01-raccourci")
        e = self.q("(x + 6)(x − 6)", 1.85, 52, largeur=3.4).sans_audit()
        self.play(FadeIn(e, shift=UP * 0.15), run_time=0.3)
        m1 = self.l("Les mêmes termes, x et 6,", 1.1, 36, lettres="x")
        self.dit_avec(m1, "Les mêmes termes, x et 6,",
                      {idx(m1, "x"): [Circumscribe(VGroup(e.atomes[1], e.atomes[6]), color=JAUNE_TITRE, buff=0.06)],
                       idx(m1, "6"): [Circumscribe(VGroup(e.atomes[3], e.atomes[8]), color=JAUNE_TITRE, buff=0.06)]})
        m2 = self.l("avec des signes contraires.", 0.55, 36)
        self.dit(m2, "avec des signes contraires.",
                 avec=[e.atomes[2].animate.set_color(VERT_OK), e.atomes[7].animate.set_color(PIEGE)])
        self.play(Indicate(VGroup(e.atomes[2], e.atomes[7]), scale_factor=1.5), run_time=0.4)
        m3 = self.l("L'identité donne", -0.1, 40, CIEL)
        self.dit(m3, "L'identité donne")
        m3b = self.l("tout de suite", -0.6, 40, CIEL)
        self.dit(m3b, "tout de suite")
        r = self.q("x² − 36", -1.45, 66, VERT_OK)
        r.atomes[0].set_color(INCONNUE)
        self.dire_eq(r, "x au carré moins 36.", echelle=1.15)
        cr = self.cadre_ok(r, 0.16)
        self.play(Create(cr), run_time=0.2)
        self.insister(VGroup(r, cr), 1.1, 0.15)
        # les quatre produits : même résultat, en plus long
        bloc = VGroup(r, cr)
        l4 = self.l("Les quatre produits ?", 0.2, 40, CIEL)
        f = quatre_fleches(e)
        self.dit(l4, "Les quatre produits ?", rt=0.3,
                 avec=[FadeOut(VGroup(m1, m2, m3, m3b)), bloc.animate.scale(0.75).move_to(P(0, 0.9))])
        self.play(LaggedStart(*[Create(x) for x in f], lag_ratio=0.2), run_time=0.5)
        p1 = Eq("x²", 46, audit=False)
        p2 = Eq("+ 6x", 46)
        p3 = Eq("− 6x", 46)
        p4 = Eq("− 36", 46, audit=False)
        ligne = VGroup(p1, p2, p3, p4).arrange(RIGHT, buff=0.2)
        if ligne.width > 3.8:
            ligne.scale_to_fit_width(3.8)
        ligne.move_to(P(0, -0.5))
        self.play(FadeIn(p1), FadeIn(p4), run_time=0.25)
        self.dire_eq(p2, "6 x et", echelle=1.2)
        self.dire_eq(p3, "moins 6 x", echelle=1.2)
        l5 = self.l("s'annulent :", -1.2, 40, PIEGE)
        self.dit(l5, "s'annulent :", avec=[Create(self.barrer(p2)), Create(self.barrer(p3))])
        l6 = self.l("même résultat,", -1.75, 40)
        self.dit(l6, "même résultat,", avec=[Circumscribe(VGroup(p1, p4), color=VERT_OK, buff=0.08)])
        l7 = self.l("en plus long.", -2.28, 40, JAUNE_TITRE)
        self.dit(l7, "en plus long.")
        self.insister(l7, 1.1, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Et pour (x + 6)(x − 1) ?", "Et pour x plus 6, fois x moins 1 ?", lettres="x", fs=34,
                         couleur=JAUNE_TITRE)

        def apres(sc):
            sc.monter_reponse(0)
            sc.ph_eq(0, "Réponse A : la double", "Réponse A : la double", premier=True)
            sc.ph_eq(1, "distributivité.", "distributivité.")
            sc.ph_eq(2, "6 et 1 sont différents :", "6 et 1 sont différents :")
            sc.ph_eq(3, "pas d'identité.", "pas d'identité.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Et pour (x + 6)(x − 1) ?"],
                            [Eq("double distributivité", 34, lettres=""), Eq("(a + b)²", 34, lettres=""),
                             Eq("(a + b)(a − b)", 34, lettres="")], 0,
                            ["Réponse A : la double", "distributivité.", "6 et 1 sont différents :", "pas d'identité."],
                            avant_q=avant, autres_r=apres)

        # ── 02 : la question en commentaire, puis la fin commune ──
        # « Développe » en titre, à son mot ; le calcul attend que la voix dise 10 (synchro par mots)
        ecran_commentaire(self, ["(x − 10)(x + 10)"], voix="02-question", titre="Développe")
        ecran_fin(self, "short", voix="03-abonne")

    def dit_avec(self, e, phrase, gestes, n=1, rt=0.12):
        """Comme dit (sans zoom), mais l'atome i joue en plus les animations gestes[i]."""
        debut = -1
        for _ in range(n):
            debut = self._texte_voix.find(phrase, debut + 1)
        lots = self._plan_eq(e, debut, debut + len(phrase))
        for k, (pos, atomes) in enumerate(lots):
            self._attendre_pos(pos)
            d = rt
            if k + 1 < len(lots):
                gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                d = max(0.08, min(rt, gap - 0.01))
            ex = []
            for a in atomes:
                ex += gestes.get(e.atomes.index(a), [])
            self.play(*[FadeIn(a) for a in atomes], *ex, run_time=max(d, 0.25) if ex else d)
        return e


def idx(e, s, k=1):
    """L'indice du k-ième atome de texte s dans e."""
    n = 0
    for i, a in enumerate(e.atomes):
        if a.original_text == s:
            n += 1
            if n == k:
                return i
    raise ValueError(f"{s} absent de {e.s}")
