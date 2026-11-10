# distrib_defi_short.py
# EleveAI — Maths 4e — série DISTRIBUTIVITÉ, épisode 05, le SHORT ceinture ORANGE
# « Le prix rond » : 3 jeux vidéo à 19,99 euros, de tête. 19,99 = 20 − 0,01 :
# 60 − 0,03 = 59,97 euros.
#   · 1 question-pause (3 s) : 5 livres à 9,99 euros, bonne réponse C (49,95 euros) ;
#   · fin : 4 places de concert à 24,99 euros, réponse en commentaire, fin du 05/11.
# Micro : litteral_distributivite_defi.
# Voix : manim/voix/4e-distrib-defi-short.json (validée) ; marques : distrib_defi_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/distrib_defi_short.py DistribDefiShort4e --media_dir manim/scripts/4e/media-dist-05-audit
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/distrib_defi_short.py DistribDefiShort4e -o eleveai-maths-4e-distrib-defi-short --media_dir manim/scripts/4e/media-dist-05-short
# Sortie : manim/sorties/4e/maths/distributivite/05-defi/eleveai-maths-4e-distrib-defi-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402

PAROLE["²"] = "carré"

ROND = BLEU_CALCUL  # le prix rond
CENTIME = OPERATION  # le 0,01 qu'on retire


def boitier(c="#7c3aed", s=1.0):
    """Un boîtier de jeu vidéo : la jaquette, une manette dessinée dessus."""
    fond = RoundedRectangle(width=0.78, height=1.0, corner_radius=0.06, fill_color="#0f172a", fill_opacity=1,
                            stroke_color=c, stroke_width=4)
    jaq = RoundedRectangle(width=0.62, height=0.62, corner_radius=0.05, fill_color=c, fill_opacity=1, stroke_width=0).shift(UP * 0.08)
    man = RoundedRectangle(width=0.4, height=0.18, corner_radius=0.08, fill_color=WHITE, fill_opacity=0.9, stroke_width=0).move_to(jaq)
    bt = VGroup(Dot(radius=0.025, color=c).move_to(man.get_center() + RIGHT * 0.1),
                Dot(radius=0.025, color=c).move_to(man.get_center() + LEFT * 0.1))
    bande = Rectangle(width=0.62, height=0.12, fill_color="#334155", fill_opacity=1, stroke_width=0).move_to(fond.get_bottom() + UP * 0.15)
    return VGroup(fond, jaq, man, bt, bande).scale(s)


def billet(s=1.0):
    """Une place de concert : le billet et sa note de musique."""
    b = RoundedRectangle(width=0.82, height=0.5, corner_radius=0.06, fill_color="#f59e0b", fill_opacity=1,
                         stroke_color="#78350f", stroke_width=2)
    trait = DashedLine(b.get_top() + RIGHT * 0.2 + DOWN * 0.04, b.get_bottom() + RIGHT * 0.2 + UP * 0.04, color="#78350f", stroke_width=2)
    tete = Ellipse(width=0.14, height=0.1, fill_color="#1e293b", fill_opacity=1, stroke_width=0).move_to(b.get_center() + P(-0.14, -0.08))
    hampe = Line(tete.get_right() + DOWN * 0.01, tete.get_right() + UP * 0.22, color="#1e293b", stroke_width=3)
    return VGroup(b, trait, tete, hampe).scale(s)


def horloge(rayon=0.3):
    cadran = Circle(radius=rayon, color=JAUNE_TITRE, stroke_width=4)
    bouton = Rectangle(width=0.12, height=0.09, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    bouton.next_to(cadran, UP, buff=0.02)
    aiguille = Line(ORIGIN, UP * rayon * 0.78, color=WHITE, stroke_width=5)
    return VGroup(cadran, bouton), aiguille


class DistribDefiShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-distrib-defi-short"
    fichier_marques = "distrib_defi_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

    def l(self, s, y, fs=32, c=WHITE, lettres=""):
        e = E(s, fs, c, lettres=lettres)
        if e.width > 3.95:
            e.scale_to_fit_width(3.95)
        return e.move_to(P(0, y))

    def _disposer_q(self, question, choix, phrase):
        """Trois lignes de réponse : les cartes restent à 85 %, la réponse ne descend pas sur Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.16).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        ph.arrange(DOWN, buff=0.1).next_to(cartes, DOWN, buff=0.12).set_x(0)
        for c in cartes:  # le cadre reprend 3,7 de large : le choix juste garde sa taille près de la coche
            c[0].stretch_to_fit_width(3.7)
            c[1].align_to(c[0].get_left() + RIGHT * 0.2, LEFT)
        return tete, q, cartes, pause, rebours, ph

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le prix rond", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : 3 jeux vidéo à 19,99 euros ──
        self.dire("00-accroche")
        couleurs = ("#7c3aed", "#0891b2", "#dc2626")
        jeux = VGroup(*[boitier(c) for c in couleurs]).arrange(RIGHT, buff=0.28).move_to(P(0, 1.0))
        l1 = self.l("3 jeux vidéo", 1.95, 44)
        self.poser_avec(l1, "3 jeux vidéo", {0: lambda: [FadeIn(titre), LaggedStart(*[FadeIn(j, shift=DOWN * 0.3) for j in jeux], lag_ratio=0.2)]})
        l2 = self.l("à 19,99 euros.", 0.0, 46, JAUNE_TITRE)
        l2.scale_to_fit_width(min(l2.width, 3.4))
        self.dit(l2, "à 19,99 euros.")
        self.insister(l2, 3.85 / l2.width if l2.width > 3.4 else 1.12, 0.15)
        l3 = self.l("Combien en tout,", -0.65, 40, CIEL)
        self.dit(l3, "Combien en tout,")
        l3b = self.l("de tête ?", -1.2, 40, CIEL)
        self.dit(l3b, "de tête ?")
        l4 = self.l("Tu as 5 secondes.", -1.75, 40, JAUNE_TITRE)
        cadran, aig = horloge(0.24)
        VGroup(cadran, aig).move_to(P(0, -2.34))
        aig.shift(cadran[0].get_center() - aig.get_start())
        self.dit(l4, "Tu as 5 secondes.")
        self.play(FadeIn(cadran, scale=0.6), FadeIn(aig), run_time=0.2)
        self.play(Rotate(aig, -TAU, about_point=cadran[0].get_center()), run_time=1.0, rate_func=linear)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : l'astuce : 19,99 = 20 − 0,01 ──
        self.dire("01-astuce")
        jeux2 = VGroup(*[boitier(c, 0.8) for c in couleurs]).arrange(RIGHT, buff=0.24).move_to(P(0, 1.05))
        a = self.l("19,99 = 20 − 0,01", 1.95, 46)
        a.atomes[2].set_color(ROND)
        a.atomes[4].set_color(CENTIME)
        self.dire_eq(a, "19,99, c'est 20 moins 0,01.", avec=[FadeIn(jeux2)])
        b = self.l("3 × 20 = 60", 0.05, 42)
        b.atomes[2].set_color(ROND)
        self.dire_eq(b, "3 fois 20 : 60.", avec=[Circumscribe(jeux2, color=ROND, buff=0.08)])
        c = self.l("3 × 0,01 = 0,03", -0.62, 42)
        c.atomes[2].set_color(CENTIME)
        self.dire_eq(c, "3 fois 0,01 : 0,03.")
        d = self.l("60 − 0,03", -1.4, 46, VERT_OK)
        self.dire_eq(d, "60 moins 0,03")
        d2 = self.l("= 59,97 euros", -2.05, 46, VERT_OK)
        d2.scale_to_fit_width(min(d2.width, 3.4))
        self.dire_eq(d2, "59,97 euros.")
        self.play(Create(self.cadre_ok(VGroup(d, d2), 0.12)), run_time=0.15)
        self.insister(d2, 3.85 / d2.width if d2.width > 3.5 else 1.1, 0.15)
        self.attendre_voix(marge=1.2)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Et 5 livres", "Et 5 livres", lettres="", fs=34)
            sc.eq_dans_q(0, "à 9,99 euros ?", "à 9,99 euros ?", lettres="", fs=34, couleur=JAUNE_TITRE)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : 49,95 euros.", "Réponse C : 49,95 euros.", premier=True)
            sc.ph_eq(1, "5 × 10 = 50", "5 fois 10 : 50.")
            sc.ph_eq(2, "− 5 × 0,01 = − 0,05", "Moins 5 fois 0,01 : moins 0,05.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Et 5 livres", "à 9,99 euros ?"],
                            [Eq("45,99 euros", 34, lettres=""), Eq("50,05 euros", 34, lettres=""), Eq("49,95 euros", 34, lettres="")], 2,
                            ["Réponse C : 49,95 euros.", "5 × 10 = 50", "− 5 × 0,01 = − 0,05"],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        t = self.l("À toi.", 1.95, 46, CIEL)
        self.dit(t, "À toi.")
        billets = VGroup(*[billet() for _ in range(4)]).arrange(RIGHT, buff=0.14).move_to(P(0, 0.45))
        q = self.l("4 places de concert", 1.2, 40)
        self.poser_avec(q, "4 places de concert", {0: lambda: [LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in billets], lag_ratio=0.15)]})
        u = self.l("à 24,99 euros.", -0.4, 44, JAUNE_TITRE)
        u.scale_to_fit_width(min(u.width, 3.4))
        self.dit(u, "à 24,99 euros.")
        self.insister(u, 3.85 / u.width if u.width > 3.4 else 1.12, 0.15)
        v = self.l("Combien en tout ?", -1.15, 38, CIEL)
        self.dit(v, "Combien en tout ?")
        self.appel_commentaire(-2.05)

        # ── 03 : la fin du 05/11 ──
        self.fin_05_11("03-abonne", [x for x in self.mobjects if x is not margo])

    def appel_commentaire(self, y=-2.2):
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.tx("Réponds en", 44, VERT_OK, True), self.tx("commentaire !", 44, VERT_OK, True)).arrange(DOWN, buff=0.12)
        if appel.width > 3.6:
            appel.scale_to_fit_width(3.6)
        appel.move_to(P(0, y))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.08, 0.25)
        self.attendre_voix(marge=1.0)
        return appel

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
