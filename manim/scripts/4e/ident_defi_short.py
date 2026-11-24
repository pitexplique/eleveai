# ident_defi_short.py
# EleveAI — Maths 4e — série IDENTITÉS REMARQUABLES, épisode 05, le SHORT ceinture ORANGE
# « Faux ! » : (2 + 8)² est-il égal à 2² + 8² ? À gauche 10² = 100, à droite 4 + 64 = 68 :
# il manque 32, les deux bandes orange du carré découpé (le double produit 2 × 2 × 8).
#   · 1 question-pause (3 s) : (x + 8)², bonne réponse B (x² + 16x + 64) ;
#   · fin : « Combien vaut (1 + 9)² − 1² − 9² ? » en commentaire (réponse 18 = 2 × 1 × 9),
#     puis la fin commune (fin_commune.ecran_fin).
# Micro : litteral_identite_defi (tous les écrans). Centres : technologie-ia, sciences.
# Carré découpé : a² bleu, bandes ORANGE (le double produit), b² violet ; x bleu.
# Voix : manim/voix/4e-identites-defi-short.json (validée) ; marques : ident_defi_short_marques.json.
# ⚠️ L'écran commentaire est DESSINÉ ici (fin_commune : « un script qui dessine sa propre question
# n'appelle que appel_commentaire() ») : ecran_commentaire() affiche toute la question d'un bloc,
# et (1 + 9)² − 1² − 9² serait apparu avant que la voix dise ses nombres (0 s d'avance).
# Comme ecran_commentaire : titre en haut, question au milieu, PAS de Ti-Margo (règle du 17/11).
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/ident_defi_short.py IdentDefiShort4e --media_dir manim/scripts/4e/media-ident-05s-audit
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/ident_defi_short.py IdentDefiShort4e -o eleveai-maths-4e-identites-defi-short --media_dir manim/scripts/4e/media-ident-05s
# Sortie : manim/sorties/4e/maths/identites/05-defi/eleveai-maths-4e-identites-defi-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402
from equation_resoudre_distributivite import BLEU_BLOC  # noqa: E402
from distrib_simple_short import DistribSimpleShort4e  # noqa: E402
from fin_commune import appel_commentaire, ecran_fin  # noqa: E402

PAROLE["²"] = "carré"

BANDE = OPERATION
CARRE_A = BLEU_BLOC
CARRE_B = "#7c3aed"
COUL = [CARRE_A, BANDE, BANDE, CARRE_B]


class Carre(VGroup):
    """Le carré découpé de côté a + b : .cases = [a², bande (droite), bande (bas), b²] ; côtés hors audit."""

    def __init__(self, a, b, coin, cotes=("2", "8"), fs_cote=26, lettres="", **kw):
        super().__init__(**kw)
        x0, y0 = coin

        def r(w, h, cx, cy):
            return Rectangle(width=w, height=h, stroke_color=WHITE, stroke_width=3, fill_opacity=0).move_to(P(cx, cy))

        self.cases = VGroup(r(a, a, x0 + a / 2, y0 - a / 2), r(b, a, x0 + a + b / 2, y0 - a / 2),
                            r(a, b, x0 + a / 2, y0 - a - b / 2), r(b, b, x0 + a + b / 2, y0 - a - b / 2))
        ca, cb = cotes
        self.haut = VGroup(E(ca, fs_cote, lettres=lettres, audit=False).move_to(P(x0 + a / 2, y0 + 0.2)),
                           E(cb, fs_cote, lettres=lettres, audit=False).move_to(P(x0 + a + b / 2, y0 + 0.2)))
        g1 = E(ca, fs_cote, lettres=lettres, audit=False)
        g2 = E(cb, fs_cote, lettres=lettres, audit=False)
        g1.move_to(P(x0 - 0.1 - g1.width / 2, y0 - a / 2))
        g2.move_to(P(x0 - 0.1 - g2.width / 2, y0 - a - b / 2))
        self.gauche = VGroup(g1, g2)
        self.add(self.cases, self.haut, self.gauche)

    def remplir(self, i, op=0.75):
        return self.cases[i].animate.set_fill(COUL[i], op)

    def bandes(self):
        return VGroup(self.cases[1], self.cases[2])

    def dans(self, i, s, fs=24, lettres="", audit=False):
        e = E(s, fs, lettres=lettres, audit=audit)
        c = self.cases[i]
        k = min(1.0, c.width * 0.8 / e.width, c.height * 0.8 / e.height)
        return e.scale(k).move_to(c)


class IdentDefiShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-identites-defi-short"
    fichier_marques = "ident_defi_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

    l = DistribSimpleShort4e.l

    def le(self, s, y, fs=40, c=WHITE, lettres="x", maxw=3.8):
        """Une expression centrée, bornée à maxw (marge de 3 %)."""
        e = E(s, fs, c, lettres=lettres)
        if e.width > maxw:
            e.scale_to_fit_width(maxw)
        return e.move_to(P(0, y))

    def dit_avec(self, e, phrase, gestes, n=1, rt=0.12):
        """Comme dit (sans zoom), mais l'atome i joue en plus ses animations gestes[i]()."""
        debut = -1
        for _ in range(n):
            debut = self._texte_voix.find(phrase, debut + 1)
        if debut < 0:
            raise ValueError(f"« {phrase} » absent de la voix {self._cle_voix}")
        lots = self._plan_eq(e, debut, debut + len(phrase))
        for k, (pos, atomes) in enumerate(lots):
            self._attendre_pos(pos)
            d = rt
            if k + 1 < len(lots):
                gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                d = max(0.08, min(rt, gap - 0.01))
            ex = []
            for a in atomes:
                f = gestes.get(e.atomes.index(a))
                if f:
                    ex += f()
            self.play(*[FadeIn(a) for a in atomes], *ex, run_time=max(d, 0.18) if ex else d)

    def _disposer_q(self, question, choix, phrase):
        """Cartes à 85 %, élargies : le choix juste garde sa taille à côté de la coche."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(0.85).next_to(q, DOWN, buff=0.14).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        for c in cartes:
            dx = c[1].get_left()[0] - c[0].get_left()[0]
            c[0].stretch_to_fit_width(3.5)
            c[0].set_x(0)
            c[1].shift(RIGHT * (c[0].get_left()[0] + dx - c[1].get_left()[0]))
        ph.arrange(DOWN, buff=0.08).next_to(cartes, DOWN, buff=0.1).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def place_reponse(self):
        """22/11 (modèle : ident_choisir_short.py) : après le ✓, les cartes s'effacent et la réponse,
        en lignes courtes, prend leur place, plus grande."""
        cartes, ph = self.cartes_q, self.ph_q
        haut = cartes[0].get_top()[1] - 0.05
        self.play(FadeOut(cartes), FadeOut(self.mobjects[-1]), run_time=0.25)
        ph.arrange(DOWN, buff=0.16)
        k = min(0.52 / max(l.height for l in ph), 3.8 / ph.width, (haut + 2.75) / ph.height)
        ph.scale(k).next_to(P(0, haut), DOWN, buff=0).set_x(0)

    def eq_dans_q(self, i, s, phrase, n=1, fs=None, lettres="xytn", couleur=WHITE):
        """Comme le module commun, mais la ligne ne dépasse jamais 3,8 de large (marge de 3 %)."""
        ref = self.q_q[i]
        e = E(s, fs or 34, couleur=couleur, lettres=lettres)
        e.scale_to_fit_height(ref.height)
        if e.width > 3.8:
            e.scale_to_fit_width(3.8)
        e.move_to(ref)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase, n)
        return e

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Faux !", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : (2 + 8)² = 2² + 8² ? ──
        self.dire("00-accroche")
        e0 = self.le("(2 + 8)²", 1.6, 72, lettres="")
        grand = Square(1.5, stroke_color=WHITE, stroke_width=4).move_to(P(-1.05, -1.42))
        self.dire_eq(e0, "2 plus 8, au carré.", avec=[FadeIn(titre)])
        self.play(Create(grand), run_time=0.3)
        l1 = self.l("Est-ce égal à", 0.72, 40, CIEL)
        self.dit(l1, "Est-ce égal à")
        e1 = self.le("2² + 8² ?", -0.05, 64, lettres="")
        p2 = Square(0.3, stroke_color=WHITE, stroke_width=3, fill_color=CARRE_A, fill_opacity=0.8)
        p8 = Square(1.2, stroke_color=WHITE, stroke_width=3, fill_color=CARRE_B, fill_opacity=0.8)
        VGroup(p2, p8).arrange(RIGHT, buff=0.5, aligned_edge=DOWN).move_to(P(1.0, 0)).align_to(grand, DOWN)
        plus = T("+", 34, WHITE, audit=False).move_to(P((p2.get_right()[0] + p8.get_left()[0]) / 2, p2.get_y()))
        self.poser_avec(e1, "2 au carré plus 8 au carré ?", {1: lambda: [FadeIn(p2, scale=0.6)],
                                                              2: lambda: [FadeIn(plus)],
                                                              4: lambda: [FadeIn(p8, scale=0.6)]})
        l2 = self.l("Vérifions !", -2.5, 46, JAUNE_TITRE)
        self.dit(l2, "Vérifions !")
        self.insister(l2, 1.1, 0.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : vérifier : 100 et 68, il manque 32 ──
        self.dire("01-verifier")
        h1 = self.l("À gauche :", 2.02, 34, CIEL)
        self.dit(h1, "À gauche :")
        g1a = self.le("2 + 8 = 10,", 1.5, 46, lettres="", maxw=3.8)
        self.dire_eq(g1a, "2 plus 8, 10,", echelle=1.15)
        g1b = self.le("10² = 100", 0.94, 46, lettres="", maxw=3.8)
        self.dire_eq(g1b, "et 10 au carré, 100.", echelle=1.15)
        c = Carre(0.3, 1.2, (-1.78, -0.8), cotes=("2", "8"), fs_cote=26)
        self.play(Create(c.cases), FadeIn(c.haut), FadeIn(c.gauche), run_time=0.4)
        h2 = self.l("À droite :", 0.44, 34, CIEL)
        self.dit(h2, "À droite :")
        g2 = self.le("4 + 64 = 68", -0.05, 46, lettres="", maxw=3.8)
        i4 = c.dans(0, "4", 22, audit=True)
        i64 = c.dans(3, "64", 32, audit=True)
        self.poser_avec(g2, "4 plus 64, 68.", {0: lambda: [c.remplir(0), FadeIn(i4)],
                                               2: lambda: [c.remplir(3), FadeIn(i64)]})
        xc, lc = 0.93, 2.2  # la colonne à droite du carré : de -0,17 à 2,03
        m1 = self.le("Il manque", -0.66, 32, JAUNE_TITRE, lettres="", maxw=lc).set_x(xc)
        m2 = self.le("32 :", -1.12, 44, JAUNE_TITRE, lettres="", maxw=lc).set_x(xc)
        self.dit(m1, "Il manque")
        self.dit_avec(m2, "32 :", {0: lambda: [c.remplir(1), c.remplir(2)]})
        d1 = self.le("le double", -1.6, 32, BANDE, lettres="", maxw=lc).set_x(xc)
        self.dit(d1, "le double")
        d2 = self.le("produit,", -2.08, 32, BANDE, lettres="", maxw=lc).set_x(xc)
        self.dit(d2, "produit,")
        self.play(Circumscribe(c.bandes(), color=BANDE, buff=0.04), run_time=0.45)
        d3 = self.le("2 × 2 × 8", -2.55, 34, BANDE, lettres="", maxw=lc).set_x(xc)
        self.dire_eq(d3, "2 fois 2 fois 8.", echelle=1.1)
        self.play(Wiggle(c.bandes()), run_time=0.5)
        self.vider(garder)
        fa = self.le("(a + b)²", 1.55, 66, lettres="ab")
        neq = T("≠", 70, PIEGE, gras=True, audit=False).move_to(P(0, 0.72))
        fb = self.le("a² + b² !", -0.1, 66, lettres="ab")
        cab = Carre(0.85, 0.45, (-0.55, -0.85), cotes=("a", "b"), fs_cote=24, lettres="ab")
        self.dire_eq(fa, "a plus b, au carré,", avec=[Create(cab.cases), FadeIn(cab.haut), FadeIn(cab.gauche)])
        self.au("ce n'est pas", FadeIn(neq, scale=1.5), rt=0.3)
        self.dit_avec(fb, "a au carré plus b au carré !", {1: lambda: [cab.remplir(0)], 4: lambda: [cab.remplir(3)]})
        self.play(cab.remplir(1), cab.remplir(2), run_time=0.3)
        self.play(Wiggle(cab.bandes()), run_time=0.5)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Et avec x :", "Et avec x :", lettres="x", fs=34)
            sc.eq_dans_q(0, "(x + 8)² ?", "x plus 8, au carré ?", lettres="x", fs=34, couleur=JAUNE_TITRE)

        def apres(sc):
            sc.place_reponse()
            sc.ph_eq(0, "Réponse B :", "Réponse B :", premier=True)
            sc.ph_eq(1, "x² + 16x + 64.", "x au carré plus 16 x plus 64.", lettres="x")
            sc.ph_eq(2, "Le double produit :", "Le double produit :")
            sc.ph_eq(3, "2 × x × 8.", "2 fois x fois 8.", lettres="x")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Et avec x :", "(x + 8)² ?"],
                            [Eq("x² + 64", 34), Eq("x² + 16x + 64", 34), Eq("x² + 8x + 64", 34)], 1,
                            ["Réponse B :", "x² + 16x + 64.", "Le double produit :", "2 × x × 8."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire (dessinée ; sans Ti-Margo, règle du 17/11) ──
        self.dire("02-question")
        self.play(*[FadeOut(m) for m in list(self.mobjects)], run_time=0.25)
        self.remove(*list(self.mobjects))
        tit = T("À toi.", 52, JAUNE_TITRE).move_to(P(0, 2.6))
        self.au("À toi.", FadeIn(tit, shift=DOWN * 0.1), rt=0.35)
        q1 = self.l("Combien vaut", 1.45, 44)
        self.dit(q1, "Combien vaut")
        q2 = self.le("(1 + 9)²", 0.55, 62, lettres="", maxw=3.8)
        self.dire_eq(q2, "1 plus 9, au carré,", echelle=1.1)
        q3 = self.le("− 1² − 9² ?", -0.4, 60, lettres="", maxw=3.8)
        self.dire_eq(q3, "moins 1 au carré, moins 9 au carré ?", echelle=1.1)
        appel_commentaire(self, y=-1.55)
        self.attendre_voix(marge=0.6)

        # ── 03 : la fin commune ──
        ecran_fin(self, "short", voix="03-abonne")
