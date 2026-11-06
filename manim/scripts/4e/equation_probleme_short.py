# equation_probleme_short.py
# EleveAI — Maths 4e — série ÉQUATIONS, épisode 08, le SHORT ceinture BLANCHE
# « Le tour de magie » : EN HAUT le magicien, sa baguette, le chapeau d'où sort un lapin et la
# bulle de TA pensée ; EN BAS, au même instant, les consignes puis le calcul. La bulle se
# dévoile : le ? devient 5, puis x, puis l'équation entière, et ce n'est plus de la magie.
#   · 1 question-pause (3 s) : une amie double son nombre, retire 3, et trouve 11 ;
#   · fin : × 4, + 5, 29 : quel est mon nombre ? réponse en commentaire, fin du 05/11.
# Micro : equation_probleme. Centres : nature-ecologie (ceux de l'épisode).
#
# Le chrono de la question dure vraiment 3 s : question_pause attend la fin de la voix,
# puis joue 3 fois 1,00 s. Aucun silence à insérer, aucun WAV dérivé.
# Voix : manim/voix/4e-equation-probleme-short.json (validée, débit −6) ;
# marques : equation_probleme_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/equation_probleme_short.py EquationProblemeShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/equation_probleme_short.py EquationProblemeShort -o eleveai-maths-4e-equation-probleme-short --media_dir manim/scripts/4e/media-eq-08-short
# Sortie : manim/sorties/4e/maths/equations/08-probleme/eleveai-maths-4e-equation-probleme-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402

VIOLET = "#7c3aed"
OR = "#fbbf24"


def haut_de_forme(s=1.0):
    """Le chapeau du magicien, posé sur son bord."""
    cyl = Rectangle(width=0.72, height=0.62, fill_color="#312e81", fill_opacity=1, stroke_color="#c7d2fe", stroke_width=3).move_to(P(0, 0.31))
    ruban = Rectangle(width=0.72, height=0.14, fill_color="#dc2626", fill_opacity=1, stroke_width=0).move_to(P(0, 0.08))
    bord = RoundedRectangle(width=1.08, height=0.13, corner_radius=0.05, fill_color="#312e81", fill_opacity=1, stroke_color="#c7d2fe", stroke_width=3).move_to(P(0, -0.04))
    return VGroup(cyl, ruban, bord).scale(s)


def lapin(s=1.0):
    """Le lapin qui sort du chapeau, très content de lui."""
    tete = Circle(radius=0.27, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    o1 = Ellipse(width=0.17, height=0.56, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(-0.14, 0.45)).rotate(0.15)
    o2 = Ellipse(width=0.17, height=0.56, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0.14, 0.45)).rotate(-0.15)
    r1 = Ellipse(width=0.07, height=0.34, fill_color="#f9a8d4", fill_opacity=1, stroke_width=0).move_to(o1)
    r2 = Ellipse(width=0.07, height=0.34, fill_color="#f9a8d4", fill_opacity=1, stroke_width=0).move_to(o2)
    y1 = Dot(P(-0.1, 0.05), radius=0.04, color="#0f172a")
    y2 = Dot(P(0.1, 0.05), radius=0.04, color="#0f172a")
    nez = Dot(P(0, -0.06), radius=0.035, color="#ec4899")
    sourire = ArcBetweenPoints(P(-0.09, -0.12), P(0.09, -0.12), angle=PI * 0.7, color="#0f172a", stroke_width=3)
    return VGroup(o1, o2, r1, r2, tete, y1, y2, nez, sourire).scale(s)


def magicien(s=0.5):
    """Le magicien : personnage, haut-de-forme, nœud papillon doré."""
    p = personne(peau="#c68642", tenue="#4c1d95", cheveux="#1f2937", s=s)
    h = haut_de_forme(s * 1.15).move_to(p.tete.get_top() + UP * 0.22 * s)
    noeud = VGroup(Polygon(P(-0.16, 0.08), P(-0.16, -0.08), P(0, 0), fill_color=OR, fill_opacity=1, stroke_width=0),
                   Polygon(P(0.16, 0.08), P(0.16, -0.08), P(0, 0), fill_color=OR, fill_opacity=1, stroke_width=0)).scale(s * 1.6)
    noeud.move_to(p.tete.get_bottom() + DOWN * 0.04)
    return VGroup(p, h, noeud)


def baguette(a, b):
    """La baguette : noire à bouts blancs ne se verrait pas sur le fond, elle est claire."""
    return VGroup(Line(a, b, color="#e5e7eb", stroke_width=7), Line(b + (a - b) * 0.18, b, color=OR, stroke_width=7))


class Bulle(VGroup):
    """La bulle de ta pensée : une ellipse et ses deux petites bulles."""

    def __init__(self, w=1.6, h=1.1, **kw):
        super().__init__(**kw)
        self.corps = Ellipse(width=w, height=h, fill_color="#1e1b4b", fill_opacity=1, stroke_color="#c7d2fe", stroke_width=4)
        b1 = Circle(radius=0.09, fill_color="#1e1b4b", fill_opacity=1, stroke_color="#c7d2fe", stroke_width=3).move_to(P(-w * 0.26, -h / 2 - 0.09))
        b2 = Circle(radius=0.05, fill_color="#1e1b4b", fill_opacity=1, stroke_color="#c7d2fe", stroke_width=3).move_to(P(-w * 0.32, -h / 2 - 0.25))
        self.add(b2, b1, self.corps)


def etoiles(o, r=0.75, n=7):
    """Les étoiles d'un tour réussi : renvoie (groupe, animations d'envol)."""
    g, anims = VGroup(), []
    for k in range(n):
        a = TAU * k / n + 0.3
        s = Star(5, outer_radius=0.09, inner_radius=0.04, fill_color=OR, fill_opacity=1, stroke_width=0).move_to(o)
        g.add(s)
        anims.append(s.animate.shift(np.array([np.cos(a), np.sin(a), 0.0]) * r).set_opacity(0))
    return g, anims


class EquationProblemeShort(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-equation-probleme-short"
    fichier_marques = "equation_probleme_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    def l(self, s, y, fs=32, c=WHITE, lettres=""):
        e = E(s, fs, c, lettres=lettres)
        if e.width > 3.95:
            e.scale_to_fit_width(3.95)
        return e.move_to(P(0, y))

    def _disposer_q(self, question, choix, phrase):
        """Les cartes reprennent toute la largeur : Ti-Margo est loin, le texte reste grand."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(1 / 0.85).next_to(q, DOWN, buff=0.2).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        ph.arrange(DOWN, buff=0.14).next_to(cartes, DOWN, buff=0.14).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def decor(self, avec_lapin=False):
        """Le magicien, sa baguette, le chapeau et la bulle : renvoyés, non ajoutés."""
        m = magicien(0.5).move_to(P(-1.55, 1.3))
        a = m[0].get_right() + P(-0.02, -0.05)
        w = baguette(a, a + P(0.72, 0.42))
        b = Bulle(1.55, 1.08).move_to(P(0.2, 1.62))
        q = T("?", 70, JAUNE_TITRE, audit=False, gras=True).move_to(b.corps)
        h = haut_de_forme(0.95).move_to(P(1.5, 0.84))
        la = lapin(0.95).move_to(P(1.5, 0.72)).set_opacity(0)
        return m, w, b, q, h, la

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le tour de magie", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : le lapin sort du chapeau avec le 5 ──
        self.dire("00-accroche")
        m, w, b, q, h, la = self.decor()
        self.add(la)
        l0 = self.l("Je vais deviner ton nombre.", 0.2, 32, CIEL)
        self.dit(l0, "Je vais deviner ton nombre.", avec=[FadeIn(titre), FadeIn(m, shift=UP * 0.2), FadeIn(w), FadeIn(h)])
        self.add(h)
        self.play(Rotate(w, 0.5, about_point=w[0].get_start()), run_time=0.2)
        self.play(Rotate(w, -0.5, about_point=w[0].get_start()), run_time=0.2)
        l1 = self.l("Pense à un nombre.", -0.3, 32)
        self.dit(l1, "Pense à un nombre.", avec=[FadeIn(b, scale=0.5), FadeIn(q, scale=0.5)])
        self.play(Rotate(q, TAU), run_time=0.4)
        l2 = self.l("Multiplie-le par 3.", -0.86, 32)
        self.dit(l2, "Multiplie-le par 3.")
        self.play(q.animate.scale(1.3), run_time=0.14)
        self.play(q.animate.scale(1 / 1.3), run_time=0.14)
        l3 = self.l("Ajoute 2.", -1.42, 32)
        self.dit(l3, "Ajoute 2.")
        self.play(q.animate.scale(1.3), run_time=0.14)
        self.play(q.animate.scale(1 / 1.3), run_time=0.14)
        l4 = self.l("Tu trouves 17 ?", -2.02, 44, JAUNE_TITRE)
        self.dit(l4, "Tu trouves 17 ?")
        self.insister(l4.atomes[2], 1.25, 0.15)
        l5 = self.l("Alors tu avais pensé à 5 !", -2.66, 34, VERT_OK)
        self.dit(l5, "Alors tu avais pensé à", rt=0.1)
        cinq = T("5", 80, VERT_OK, audit=False, gras=True).move_to(b.corps)
        g, env = etoiles(P(1.45, 1.25), 0.5)
        self.au("5 !", FadeIn(l5.atomes[-2], scale=1.6), FadeIn(l5.atomes[-1]),
                la.animate.move_to(P(1.5, 1.52)).set_opacity(1),
                Rotate(w, -0.75, about_point=w[0].get_start()),
                ReplacementTransform(q, cinq), rt=0.28)
        self.add(g)
        self.play(*env, Flash(cinq, color=OR, line_length=0.22, flash_radius=0.68), run_time=0.45)
        self.remove(g)
        self.attendre_voix(marge=0.25)

        # ── 01 : le secret : la bulle se dévoile en équation ──
        self.dire("01-secret")
        tout = VGroup(l0, l1, l2, l3, l4, l5)
        m0 = self.l("Ce n'est pas de la magie.", 0.24, 34, JAUNE_TITRE)
        b2 = Bulle(4.15, 1.4).move_to(P(0, 1.42))
        q2 = T("?", 70, JAUNE_TITRE, audit=False, gras=True).move_to(b2.corps)
        self.dit(m0, "Ce n'est pas de la magie.", avec=[FadeOut(tout)])
        self.play(la.animate.move_to(P(1.5, 0.72)).set_opacity(0), run_time=0.2)
        self.play(FadeOut(VGroup(m, w, h)), ReplacementTransform(b, b2), ReplacementTransform(cinq, q2), run_time=0.3)
        self.remove(la)
        n = self.l("Ton nombre, c'est x.", -0.24, 36, lettres="x")
        self.dit(n, "Ton nombre, c'est x.")
        e0 = E("3x + 2 = 17", 40).move_to(P(0, 1.42))
        XE = e0.egal.get_x()
        xq = T("x", 70, INCONNUE, audit=False, gras=True).move_to(b2.corps)
        self.play(ReplacementTransform(q2, xq), run_time=0.16)
        self.dire_eq(e0, "3 x plus 2 égale 17", avec=[FadeOut(xq)])
        self.play(e0.egal.animate.set_color(EGAL), run_time=0.06)
        o1 = self.l("On soustrait 2 :", -0.74, 30, OPERATION)
        self.dit(o1, "On soustrait 2 :")
        e1 = E("3x = 15", 46).mis_sur_egal(XE, -1.32)
        self.dire_eq(e1, "3 x égale 15")
        o2 = self.l("On divise par 3 :", -1.85, 30, OPERATION)
        self.dit(o2, "On divise par 3 :")
        e2 = E("x = 5", 48, VERT_OK, inconnue=VERT_OK).mis_sur_egal(XE, -2.55)
        self.dire_eq(e2, "x égale 5")
        self.play(Create(self.cadre_ok(e2, 0.12)), run_time=0.15)
        self.insister(e2, 1.1, 0.16)
        self.attendre_voix(marge=2.4)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Une amie double son nombre,", "Une amie double son nombre,", lettres="", fs=34)
            sc.eq_dans_q(0, "retire 3, et trouve 11.", "retire 3, et trouve 11.", lettres="", fs=34)
            sc.eq_dans_q(0, "Quel est son nombre ?", "Quel est son nombre ?", lettres="", fs=34, couleur=JAUNE_TITRE)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 2 × 7 = 14", "Réponse B : 2 fois 7, 14", premier=True)
            ref = sc.ph_q[1]
            e = E("14 − 3 = 11", 30, VERT_OK, lettres="")
            e.scale_to_fit_width(ref.width).move_to(ref)
            sc.play(FadeIn(e.atomes[0]), run_time=0.06)
            sc.dire_eq(e, "Moins 3, 11", echelle=1.0, rt=0.16, sauf=[e.atomes[0]])
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Une amie double son nombre,", "retire 3, et trouve 11.", "Quel est son nombre ?"],
                            [Eq("4", 34, lettres=""), Eq("7", 34, lettres=""), Eq("14", 34, lettres="")], 1,
                            ["Réponse B : 2 × 7 = 14", "14 − 3 = 11"], avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        m, w, b, q, h, la = self.decor()
        la.move_to(P(1.5, 1.52)).set_opacity(1)
        self.add(la)
        d = self.l("À toi de deviner le mien.", 0.2, 34, CIEL)
        self.dit(d, "À toi de deviner le mien.", avec=[FadeIn(m), FadeIn(w), FadeIn(h), FadeIn(b), FadeIn(q)])
        self.add(h)
        self.dit(self.l("Je le multiplie par 4,", -0.36, 34), "Je le multiplie par 4,")
        self.dit(self.l("j'ajoute 5,", -0.92, 34), "j'ajoute 5,")
        self.dit(self.l("et je trouve 29.", -1.48, 34), "et je trouve 29.")
        qn = self.l("Quel est mon nombre ?", -2.04, 38, JAUNE_TITRE)
        self.dit(qn, "Quel est mon nombre ?")
        self.play(Rotate(q, TAU), run_time=0.35)
        self.appel_commentaire(-2.66)

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
