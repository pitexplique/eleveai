# ident_reconnaitre_short.py
# EleveAI — Maths 4e — série IDENTITÉS REMARQUABLES, épisode 02, le SHORT ceinture JAUNE
# « 49 × 51 de tête » : 49 = 50 − 1 et 51 = 50 + 1, les mêmes termes avec des signes contraires :
# la forme (a − b)(a + b), qui donne 50² − 1 = 2 499.
#   · 1 question-pause (3 s) : laquelle a la même forme ? bonne réponse C ((x − 3)(x + 3)) ;
#   · fin : « Écris 29 × 31 avec la même forme », réponse en commentaire ((30 − 1)(30 + 1)),
#     puis la fin commune (manim/fin_commune.py).
# Micro : litteral_identite_reconnaitre. Centres : argent-budget (le calcul de tête du comptable).
# Code couleur : x bleu ; la 3e forme (mêmes termes, signes contraires) en violet ; juste vert.
# Voix : manim/voix/4e-identites-reconnaitre-short.json (validée) ;
# marques : ident_reconnaitre_short_marques.json.
# Écran commentaire : dessiné ici, au mot (ecran_commentaire de fin_commune fait apparaître toute la
# question d'un coup, avant que la voix ne dise 29 et 31) ; les deux lignes « Réponds en / commentaire ! »
# viennent de fin_commune.appel_commentaire, et Ti-Margo n'y est pas (règle du 17/11).
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/ident_reconnaitre_short.py IdentReconnaitreShort4e --media_dir manim/scripts/4e/media-ident-02s-audit
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/ident_reconnaitre_short.py IdentReconnaitreShort4e -o eleveai-maths-4e-identites-reconnaitre-short --media_dir manim/scripts/4e/media-ident-02s
# Sortie : manim/sorties/4e/maths/identites/02-reconnaitre/eleveai-maths-4e-identites-reconnaitre-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402
from distrib_simple_short import DistribSimpleShort4e, horloge  # noqa: E402
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

PAROLE["²"] = "carré"

TROIS = "#a78bfa"   # la 3e forme (comme la paysage)
A_C = JAUNE_TITRE   # le terme a (50)
B_C = CIEL          # le terme b (1)
PLUS_C = "#7dd3fc"
MOINS_C = "#f472b6"


class IdentReconnaitreShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-identites-reconnaitre-short"
    fichier_marques = "ident_reconnaitre_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"

    l = DistribSimpleShort4e.l

    def _disposer_q(self, question, choix, phrase):
        """Les cartes à 85 %, la réponse ne descend pas sur Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(0.85).next_to(q, DOWN, buff=0.14).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        ph.arrange(DOWN, buff=0.1).next_to(cartes, DOWN, buff=0.12).set_x(0)
        for c in cartes:  # le cadre reprend 3,7 de large : le choix juste garde sa taille près de la coche
            c[0].stretch_to_fit_width(3.7)
            c[1].align_to(c[0].get_left() + RIGHT * 0.2, LEFT)
        return tete, q, cartes, pause, rebours, ph

    def monter_reponse(self, bonne, haut_max=-2.75):
        """Les deux mauvaises cartes s'effacent, la bonne monte à la place de A : la phrase de réponse,
        en lignes courtes, a la place d'être grande, jamais sous y −2,75 (Ti-Margo). (facto_verifier_short)"""
        cartes, ph = self.cartes_q, self.ph_q
        b = cartes[bonne]
        ok = self.mobjects[-1]  # la coche, posée juste avant autres_r
        d = cartes[0].get_center() - b.get_center()
        anims = [FadeOut(cartes[j]) for j in range(3) if j != bonne]
        if bonne != 0:
            anims.append(b.animate.shift(d))
            if ok is not b and ok not in b.get_family():
                anims.append(ok.animate.shift(d))
        self.play(*anims, run_time=0.2)
        haut = cartes[0].get_bottom()[1] - 0.2
        ph.arrange(DOWN, buff=0.16)
        k = min(0.5 / max(l.height for l in ph), 3.7 / ph.width, (haut - haut_max) / ph.height)
        ph.scale(k).next_to(P(0, haut), DOWN, buff=0).set_x(0)

    def eq_dans_q(self, i, s, phrase, n=1, fs=None, lettres="xytn", couleur=WHITE):
        """Comme le module commun, mais la ligne ne dépasse jamais 3,8 de large (marge de 3 %)."""
        ref = self.q_q[i]
        e = Eq(s, fs or 34, couleur=couleur, lettres=lettres)
        e.scale_to_fit_height(ref.height)
        if e.width > 3.8:
            e.scale_to_fit_width(3.8)
        e.move_to(ref)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase, n)
        return e

    def q(self, s, y, fs=56, c=WHITE, lettres="x", largeur=3.6):
        """Une ligne d'expression : Eq, bornée en largeur."""
        e = Eq(s, fs, c, lettres=lettres)
        if e.width > largeur:
            e.scale_to_fit_width(largeur)
        return e.move_to(P(0, y))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("49 × 51 de tête", self.ceinture)
        titre.sans_synchro = True
        for f_ in titre.get_family():  # posé APRÈS que la voix a dit 49 et 51 (aucune avance)
            f_._pas_audit = True
            f_.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        e0 = self.q("49 × 51", 1.45, 84, largeur=3.5)
        self.dire_eq(e0, "49 fois 51.")
        self.add(titre)  # le titre porte 49 et 51 : posé juste après que la voix les a dits (add : la synchro par morceaux le retarderait)
        l1 = self.l("De tête,", 0.45, 42, CIEL)
        self.dit(l1, "De tête,")
        l2 = self.l("en 3 secondes.", -0.08, 42, CIEL)
        cadran, aig = horloge(0.36)
        VGroup(cadran, aig).move_to(P(0, -0.98))
        aig.shift(cadran[0].get_center() - aig.get_start())
        self.dit(l2, "en 3 secondes.", avec=[FadeIn(cadran, scale=0.6), FadeIn(aig)])
        self.play(Rotate(aig, -TAU, about_point=cadran[0].get_center()), run_time=0.8, rate_func=linear)
        l3 = self.l("Impossible ?", -1.85, 50, JAUNE_TITRE)
        self.dit(l3, "Impossible ?")
        l4 = self.l("Regarde bien ces deux nombres.", -2.45, 32)
        self.dit(l4, "Regarde bien ces deux nombres.",
                 avec=[Circumscribe(e0.atomes[0], color=A_C, buff=0.08), Circumscribe(e0.atomes[2], color=A_C, buff=0.08)])
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : le secret ──
        self.dire("01-secret")
        a = self.q("49 = 50 − 1", 1.85, 52)
        self.dire_eq(a, "49, c'est 50 moins 1.")
        b = self.q("51 = 50 + 1", 1.2, 52)
        self.dire_eq(b, "51, c'est 50 plus 1.")
        b.shift(RIGHT * (a.egal.get_center()[0] - b.egal.get_center()[0]))
        m1 = self.l("Les mêmes termes,", 0.4, 36)
        self.dit(m1, "Les mêmes termes,", avec=[a.atomes[2].animate.set_color(A_C), b.atomes[2].animate.set_color(A_C),
                                               a.atomes[4].animate.set_color(B_C), b.atomes[4].animate.set_color(B_C)])
        m2 = self.l("avec des signes contraires :", -0.12, 34)
        self.dit(m2, "avec des signes contraires :", avec=[a.atomes[3].animate.set_color(MOINS_C), b.atomes[3].animate.set_color(PLUS_C)])
        self.play(Indicate(VGroup(a.atomes[3], b.atomes[3]), color=TROIS, scale_factor=1.4), run_time=0.4)
        m3 = self.l("c'est la forme", -0.75, 36, TROIS)
        self.dit(m3, "c'est la forme")
        f = self.q("(a − b)(a + b)", -1.35, 52, lettres="")
        f.atomes[2].set_color(MOINS_C)
        f.atomes[7].set_color(PLUS_C)
        self.dire_eq(f, "a moins b, fois a plus b.")
        self.play(Create(SurroundingRectangle(f, color=TROIS, buff=0.12, stroke_width=4, corner_radius=0.08)), run_time=0.25)
        r = self.q("50² − 1 = 2 499", -2.25, 46, largeur=3.6)
        self.dire_eq(r, "Elle donne 50 au carré moins 1 : 2 499.")
        fin = VGroup(*r.atomes[-3:])
        self.play(fin.animate.set_color(VERT_OK), run_time=0.2)
        self.insister(fin, 1.15, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Laquelle a", "Laquelle a", lettres="", fs=34)
            sc.eq_dans_q(0, "la même forme ?", "la même forme ?", lettres="", fs=34, couleur=JAUNE_TITRE)

        def apres(sc):
            sc.monter_reponse(2)
            sc.ph_eq(0, "Réponse C :", "Réponse C :", premier=True)
            sc.ph_eq(1, "(x − 3)(x + 3).", "x moins 3, fois x plus 3.", lettres="x")
            sc.ph_eq(2, "Les mêmes termes, avec", "Les mêmes termes, avec")
            sc.ph_eq(3, "des signes contraires.", "des signes contraires.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Laquelle a", "la même forme ?"],
                            [Eq("(x + 3)²", 34), Eq("(x − 3)²", 34), Eq("(x − 3)(x + 3)", 34)], 2,
                            ["Réponse C :", "(x − 3)(x + 3).", "Les mêmes termes, avec", "des signes contraires."],
                            avant_q=avant, autres_r=apres)

        # ── 02 : la question en commentaire (sans Ti-Margo, règle du 17/11) ──
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.3)
        self.remove(*self.mobjects)
        self.dire("02-question")
        t = self.l("À toi.", 2.6, 52, JAUNE_TITRE)
        self.dit(t, "À toi.")
        q1 = self.q("Écris 29 × 31", 1.45, 48, lettres="", largeur=3.9)
        self.dire_eq(q1, "Écris 29 fois 31")
        q2 = self.l("avec la même forme.", 0.8, 40)
        self.dit(q2, "avec la même forme.")
        moule = VGroup(*[T(s, 54, TROIS, audit=False) for s in ("(", "…", "−", "…", ")", "(", "…", "+", "…", ")")])
        moule.arrange(RIGHT, buff=0.08).scale_to_fit_width(3.4).move_to(P(0, 0.05))
        self.play(FadeIn(moule, shift=UP * 0.1), run_time=0.3)
        appel_commentaire(self, y=-1.0)
        self.attendre_voix(marge=0.6)

        # ── 03 : la fin commune ──
        ecran_fin(self, "short", voix="03-abonne")
