# facto_verifier_short.py
# EleveAI — Maths 4e — série FACTORISATION, épisode 03, le SHORT ceinture ORANGE
# « Tu le crois ? » : le copain écrit 4x + 20 = 4(x + 20). On développe : 4x + 80, c'est faux ;
# la bonne réponse est 4(x + 5).
#   · 1 question-pause (3 s) : la factorisation juste de 3x − 21, bonne réponse C (3(x − 7)) ;
#   · fin : 6x + 42 = 6(x + 7), juste ou faux ? réponse en commentaire, fin du 05/11.
# Micro : litteral_factoriser_verifier.
# Voix : manim/voix/4e-facto-verifier-short.json (validée le 11/11, débit −6) ;
# marques : facto_verifier_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/facto_verifier_short.py FactoVerifierShort4e --media_dir manim/scripts/4e/media-facto-03s-audit
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/facto_verifier_short.py FactoVerifierShort4e -o eleveai-maths-4e-facto-verifier-short --media_dir manim/scripts/4e/media-facto-03-short
# Sortie : manim/sorties/4e/maths/factorisation/03-verifier/eleveai-maths-4e-facto-verifier-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402
from distrib_simple_short import DistribSimpleShort4e  # noqa: E402

FACTEUR = OPERATION  # le facteur commun, et ses flèches


def fleche(a, b, angle=-1.5, couleur=None):
    """Du facteur vers un terme de la parenthèse, par-dessus."""
    return CurvedArrow(a.get_top() + UP * 0.07, b.get_top() + UP * 0.08, angle=angle, color=couleur or FACTEUR,
                       stroke_width=4, tip_length=0.13)


def croix(r=0.2, c=None):
    return VGroup(Line(P(-r, -r), P(r, r)), Line(P(-r, r), P(r, -r))).set_stroke(c or PIEGE, 8)


class FactoVerifierShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-facto-verifier-short"
    fichier_marques = "facto_verifier_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

    l = DistribSimpleShort4e.l
    fin_05_11 = DistribSimpleShort4e.fin_05_11  # la fin du 05/11, telle quelle

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
        """13/11 : les deux mauvaises cartes s'effacent, la bonne monte à la place de A : la phrase de
        réponse (coupée en lignes courtes) a la place d'être grande, jamais sous y -2,75 (Ti-Margo)."""
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

    def appel_commentaire(self, y=-2.2):
        """« Réponds en commentaire ! » sur deux lignes, à la taille de ses voisins."""
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.tx("Réponds en", 38, VERT_OK, True), self.tx("commentaire !", 38, VERT_OK, True)).arrange(DOWN, buff=0.12)
        if appel.width > 3.6:
            appel.scale_to_fit_width(3.6)
        appel.move_to(P(0, y))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.08, 0.25)
        self.attendre_voix(marge=1.0)
        return appel

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

    def q(self, s, y, fs=56, c=WHITE, lettres="x", largeur=3.5):
        """Une ligne mot + expression : Eq (E colle parfois le mot au nombre), bornée."""
        e = Eq(s, fs, c, lettres=lettres)
        if e.width > largeur:
            e.scale_to_fit_width(largeur)
        return e.move_to(P(0, y))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Tu le crois ?", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : la copie du copain ──
        self.dire("00-accroche")
        l1 = self.l("Ton copain écrit :", 1.85, 40, CIEL)
        self.dit(l1, "Ton copain écrit :", avec=[FadeIn(titre)])
        e1 = self.q("4x + 20", 0.95, 66)
        e2 = self.q("= 4(x + 20)", 0.05, 66)
        e2.atomes[1].set_color(FACTEUR)
        copie = DashedVMobject(RoundedRectangle(width=3.8, height=2.0, corner_radius=0.12, color=CIEL, stroke_width=3),
                               num_dashes=48).move_to(P(0, 0.5))
        self.dire_eq(e1, "4 x plus 20", avec=[Create(copie)])
        self.dire_eq(e2, "égale 4 fois, entre parenthèses, x plus 20.")
        l2 = self.l("Tu le crois ?", -1.1, 54, JAUNE_TITRE)
        l2.scale_to_fit_width(min(l2.width, 3.4))
        ok = self.coche(VERT_OK, 0.24).move_to(P(-0.75, -2.05))
        non = croix().move_to(P(0.75, -2.05))
        self.dit(l2, "Tu le crois ?", avec=[Create(ok), Create(non)])
        self.insister(l2, 1.1, 0.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : le secret : on développe ──
        self.dire("01-secret")
        s1 = self.l("Le secret pour", 2.05, 40, CIEL)
        s1b = self.l("en être sûr :", 1.55, 40, CIEL)
        e = self.q("4(x + 20)", -0.12, 58).sans_audit()
        e.atomes[0].set_color(FACTEUR)
        self.dit(s1, "Le secret pour", avec=[FadeIn(e, shift=UP * 0.15)])
        self.dit(s1b, "en être sûr :")
        s2 = self.l("on développe.", 0.95, 46, JAUNE_TITRE)
        s2.scale_to_fit_width(min(s2.width, 3.4))
        self.dit(s2, "on développe.")
        self.insister(s2, 1.1, 0.15)
        f1, f2 = fleche(e.atomes[0], e.atomes[2], -1.6), fleche(e.atomes[0], e.atomes[4], -1.2)
        a = self.q("4 × x = 4x", -0.8, 38)
        a.atomes[0].set_color(FACTEUR)
        self.dire_eq(a, "4 fois x : 4 x.", avec=[Create(f1)])
        b = self.q("4 × 20 = 80", -1.25, 38)
        b.atomes[0].set_color(FACTEUR)
        self.dire_eq(b, "4 fois 20 : 80.", avec=[Create(f2)])
        # 13/11 : « On trouve 4x + 80. » coupé en deux lignes (plafonné par la largeur, il rapetissait)
        c0 = self.l("On trouve", -1.7, 38)
        self.dit(c0, "On trouve")
        c = self.q("4x + 80.", -2.25, 44)
        self.dire_eq(c, "4 x plus 80.", echelle=1.0)
        self.play(c.atomes[-2].animate.set_color(PIEGE), b.atomes[-1].animate.set_color(PIEGE), run_time=0.2)
        fx = self.l("C'est faux !", -2.75, 38, PIEGE)
        ba = self.barrer(e, sw=7)
        self.dit(fx, "C'est faux !", avec=[Create(ba)])
        self.play(FadeOut(VGroup(a, b, c0, c, fx)), run_time=0.3)
        # 13/11 : « La bonne réponse : » sur deux lignes, à sa taille
        r1 = self.l("La bonne", -0.82, 44, CIEL)
        self.dit(r1, "La bonne")
        r1b = self.l("réponse :", -1.42, 44, CIEL)
        self.dit(r1b, "réponse :")
        r = self.q("4(x + 5)", -2.3, 64)
        r.atomes[0].set_color(FACTEUR)
        r.atomes[4].set_color(VERT_OK)
        self.dire_eq(r, "4 fois, entre parenthèses, x plus 5.")
        self.play(Create(self.cadre_ok(r, 0.2)), run_time=0.2)
        self.insister(r, 1.1, 0.15)
        self.attendre_voix(marge=1.2)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Laquelle est juste", "Laquelle est juste", lettres="", fs=34)
            sc.eq_dans_q(0, "pour 3x − 21 ?", "pour 3 x moins 21 ?", lettres="x", fs=34, couleur=JAUNE_TITRE)

        def apres(sc):
            sc.monter_reponse(2)
            sc.ph_eq(0, "Réponse C :", "Réponse C :", premier=True)
            sc.ph_eq(1, "3(x − 7).", "3 fois, entre parenthèses, x moins 7.", lettres="x")
            sc.ph_eq(2, "On développe :", "On développe :")
            sc.ph_eq(3, "3x − 21.", "3 x moins 21.", lettres="x")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Laquelle est juste", "pour 3x − 21 ?"],
                            [Eq("3(x − 21)", 34), Eq("3(x + 7)", 34), Eq("3(x − 7)", 34)], 2,
                            ["Réponse C :", "3(x − 7).", "On développe :", "3x − 21."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        t = self.l("À toi.", 1.85, 46, CIEL)
        self.dit(t, "À toi.")
        q1 = self.q("6x + 42", 1.0, 64)
        self.dire_eq(q1, "6 x plus 42")
        q2 = self.q("= 6(x + 7)", 0.1, 64)
        q2.atomes[1].set_color(FACTEUR)
        self.dire_eq(q2, "égale 6 fois, entre parenthèses, x plus 7")
        j = self.l("juste ou faux ?", -0.85, 46, JAUNE_TITRE)
        j.scale_to_fit_width(min(j.width, 3.4))
        self.dit(j, "juste ou faux ?")
        self.insister(j, 1.1, 0.15)
        self.appel_commentaire(-1.95)

        # ── 03 : la fin du 05/11 ──
        self.fin_05_11("03-abonne", [x for x in self.mobjects if x is not margo])
