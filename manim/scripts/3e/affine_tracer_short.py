# affine_tracer_short.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 07, le SHORT ceinture JAUNE
# « Tracer une droite » : une droite traverse toute la feuille, et pourtant deux calculs suffisent.
# f(x) = 3x − 2 : f(0) = −2 → (0 ; −2) ; f(2) = 6 − 2 = 4 → (2 ; 4) ; la règle relie et prolonge ;
# un troisième point (1 ; 1) seulement pour vérifier.
# Écrans (clé de voix → écran) :
#   00-accroche   la feuille de Yanis traversée par une droite : « Combien de calculs pour la tracer ? Deux. »
#   01-image      le repère (≈ 85 % de la largeur), les deux points posés au mot, la règle, le 3e point ;
#   01q / 01r     QUESTION (3 s) : f(x) = 2x + 1, quels deux points ? → réponse A ((0 ; 1) et (1 ; 3)) ;
#                 cartes sur DEUX lignes (« (0 ; 1) » / « et (1 ; 3) ») pour rester ≥ 32 pt ;
#   02-question   écran commentaire (sans Ti-Margo) : quels deux points pour tracer f(x) = −x + 5 ?
#                 (réponse attendue : (0 ; 5) et (5 ; 0), par exemple) ;
#   03-abonne     fin commune (manim/fin_commune.py).
# Question : 01q → A (la lettre que dit la voix).
# Métier : Yanis, boulanger (la paysage). Animation Manim (pas de dessin animé).
# Code couleur : x bleu ; a orange ; b violet ; droite de f bleue ; juste vert ; piège rouge.
# Voix : manim/voix/3e-affine-tracer-short.json (validée) ; marques : affine_tracer_short_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/3e/affine_tracer_short.py AffineTracerShort3e --media_dir manim/scripts/3e/media-affine-07s-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/affine_tracer_short.py AffineTracerShort3e -o eleveai-maths-3e-affine-tracer-short --media_dir manim/scripts/3e/media-affine-07s
# Sortie : manim/sorties/3e/maths/fonctions-affines/07-tracer/eleveai-maths-3e-affine-tracer-short.mp4

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS 4e et ses outils communs
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E  # noqa: E402
from ident_developper import X  # noqa: E402
from ident_developper_short import IdentDevelopperShort4e  # noqa: E402
from affine_coeff_directeur import COEF, DROITE_F, ORDO, teinter  # noqa: E402
from affine_coeff_directeur_short import AffineCoeffDirecteurShort3e  # noqa: E402
from affine_tracer import FOND, Regle, _AuditRepere  # noqa: E402
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

PAROLE["0"] = "0"


class Feuille(VGroup):
    """Une feuille de cahier à petits carreaux, la marge rouge."""

    def __init__(self, w=3.8, h=2.4, **kw):
        super().__init__(**kw)
        self.fond = RoundedRectangle(width=w, height=h, corner_radius=0.06, fill_color="#f8fafc", fill_opacity=1,
                                     stroke_color="#cbd5e1", stroke_width=2)
        car = VGroup()
        u = 0.2
        k = 1
        while k * u < w - 0.02:
            car.add(Line(P(-w / 2 + k * u, -h / 2 + 0.02), P(-w / 2 + k * u, h / 2 - 0.02)))
            k += 1
        k = 1
        while k * u < h - 0.02:
            car.add(Line(P(-w / 2 + 0.02, -h / 2 + k * u), P(w / 2 - 0.02, -h / 2 + k * u)))
            k += 1
        car.set_stroke("#bfdbfe", 1.2)
        marge = Line(P(-w / 2 + 0.5, -h / 2 + 0.02), P(-w / 2 + 0.5, h / 2 - 0.02), color="#f87171", stroke_width=2)
        self.add(self.fond, car, marge)


class AffineTracerShort3e(_AuditRepere, AffineCoeffDirecteurShort3e):
    ZONE_MARGO = (-0.55, 0.55, -4.0, -2.9)
    nom_voix = "3e-affine-tracer-short"
    fichier_marques = "affine_tracer_short_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "jaune"

    def l(self, s, y, fs=40, c=WHITE, lettres=""):
        e = E(s, fs, c, lettres=lettres)
        if e.width > 3.95:
            print(f"RETRECI « {s} » {e.width:.2f} > 3.95", flush=True)
            e.scale_to_fit_width(3.95)
        return e.move_to(P(0, y))

    def lf(self, s, y, fs=46, a=(), b=()):
        e = self.l(s, y, fs, lettres="x")
        teinter(e, {**{i: COEF for i in a}, **{i: ORDO for i in b}})
        return e

    def etiq(self, s, point, dirn, fs=32, buff=0.12):
        e = E(s, fs, WHITE, lettres="")
        e.next_to(point, dirn, buff=buff)
        for a in e.atomes:
            a._etiquette = True
        fond = RoundedRectangle(width=e.width + 0.14, height=e.height + 0.1, corner_radius=0.06, stroke_width=0,
                                fill_color=FOND, fill_opacity=1).move_to(e)
        fond.set_z_index(1)  # 22/11 (2e passe) : opaque, et le texte au-dessus de son fond
        e.set_z_index(2)
        return e, fond

    def _disposer_q(self, question, choix, phrase):
        """Énoncé sur une ligne (40 pt), cartes larges de 3,9 au contenu sur DEUX lignes (« (0 ; 1) » puis
        « et (1 ; 3) »), 34 pt tassés jusqu'à 32 au plus bas ; « Mets pause, / et choisis ! » en deux lignes à 32 pt,
        bas ≥ −2,45 : au-dessus de Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = IdentDevelopperShort4e._disposer_q(self, question, choix, phrase)
        haut = 2.22
        tete.shift(UP * (haut - tete.get_top()[1]))
        rebours.shift(UP * (tete.get_y() - rebours.get_y()))
        if len(q.submobjects):
            q.scale(T("f(x) = 2x + 1", 40, audit=False).height / q[0].height)
            if q.width > 3.9:
                q.scale_to_fit_width(3.9)
            q.next_to(tete, DOWN, buff=0.06).set_x(0)
        larg = 3.9
        pause = VGroup(T("Mets pause,", 32, ORANGE_RETENUE, audit=False),
                       T("et choisis !", 32, ORANGE_RETENUE, audit=False)).arrange(DOWN, buff=0.02)
        for f in pause.get_family():
            f.sans_synchro = True

        def poser(fs):
            for c in cartes:
                cadre, lettre, corps = c[0], c[1][0], c[1][1]
                lettre.scale(max(fs, 32) / self._fs(lettre))
                # 22/11 (2e passe) : la taille par la police (par la hauteur, les parenthèses la faisaient tomber à 28)
                corps.scale(fs / self._fs(corps))
                at = corps.atomes
                if len(at) > 5:
                    bas = VGroup(*at[5:])
                    bas.next_to(VGroup(*at[0:5]), DOWN, buff=0.02).align_to(at[0], LEFT)
                cadre.stretch_to_fit_width(larg)
                cadre.stretch_to_fit_height(corps.height + 0.06)
                cadre.move_to(P(0, cadre.get_y()))
                lettre.next_to(cadre.get_left(), RIGHT, buff=0.16).set_y(cadre.get_y())
                corps.next_to(lettre, RIGHT, buff=0.2).set_y(cadre.get_y())
            cartes.arrange(DOWN, buff=0.02).next_to(q if len(q.submobjects) else tete, DOWN, buff=0.04).set_x(0)
            pause.next_to(cartes, DOWN, buff=0.03).set_x(0)

        # « Mets pause, / et choisis ! » à 32 pt sur deux lignes, bas ≥ −2,45 (Ti-Margo : haut −2,92) :
        # les cartes se tassent s'il le faut, leur contenu jamais sous 32 pt
        fs = 34
        poser(fs)
        while pause.get_bottom()[1] < -2.43 and fs > 32:
            fs = max(32, fs - 0.25)
            poser(fs)
        ph.next_to(cartes, DOWN, buff=0.15).set_x(0)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE tete {tete.get_top()[1]:.2f}/{tete.get_bottom()[1]:.2f} q {q.get_bottom()[1]:.2f} "
                  f"cartes {cartes.get_top()[1]:.2f}/{cartes.get_bottom()[1]:.2f} ({self._fs(cartes[0][1][1]):.0f} pt, "
                  f"lettre {self._fs(cartes[0][1][0]):.0f} pt) pause {self._fs(pause):.0f} pt bas "
                  f"{pause.get_bottom()[1]:.2f} x[{pause.get_left()[0]:.2f},{pause.get_right()[0]:.2f}] "
                  f"corps {max(c[1][1].get_right()[0] for c in cartes):.2f} limite "
                  f"{cartes[0][0].get_right()[0] - 0.95:.2f}", flush=True)
        return tete, q, cartes, pause, rebours, ph

    def eq_q(self, s, phrase, a=(), b=()):
        """Dans avant_q : la ligne restante de la question, en expression colorée, posée au mot."""
        ref = self.q_q[0]
        e = X(s, 34)
        teinter(e, {**{i: COEF for i in a}, **{i: ORDO for i in b}})
        e.scale_to_fit_height(ref.height).move_to(ref)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase)
        return e

    def place_reponse(self):
        """Les cartes s'effacent, la réponse prend leur place ; ph_gestes la réécrit à 36 pt."""
        cartes, ph = self.cartes_q, self.ph_q
        haut = cartes[0].get_top()[1] - 0.05
        self.play(FadeOut(cartes), FadeOut(self.mobjects[-1]), run_time=0.25)
        ph.arrange(DOWN, buff=0.22)
        ph.scale(T("Réponse A :", 36, audit=False).height / ph[0].height)
        ph.next_to(P(0, haut), DOWN, buff=0).set_x(0)
        self._rep36 = True

    def ph_gestes(self, i, s, phrase, gestes, premier=False):
        """La ligne i de la réponse, à 36 pt EFFECTIFS, centrée sur sa place."""
        if not getattr(self, "_rep36", False):
            return super().ph_gestes(i, s, phrase, gestes, premier)
        ref = self.ph_q[i]
        e = X(s, 36, VERT_OK)
        if e.width > 3.95:
            e.scale_to_fit_width(3.95)
        e.move_to(ref)
        if os.environ.get("AUDIT") == "1":
            print(f"REPONSE « {s} » {self._fs(e):.0f} pt x[{e.get_left()[0]:.2f},{e.get_right()[0]:.2f}] "
                  f"bas {e.get_bottom()[1]:.2f}", flush=True)
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        return self.poser_gestes(e, phrase, gestes, rt=0.16, sauf=sauf)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Tracer une droite", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]
        if os.environ.get("AUDIT") == "1":
            print(f"BAS-ECHELLE {badge.get_bottom()[1]:.2f}", flush=True)

        # ── 00 : l'accroche : une droite qui traverse toute la feuille ──
        self.dire("00-accroche")
        fe = Feuille(3.8, 2.0).move_to(P(0, 1.15))
        trav = Line(fe.fond.get_corner(DL) + P(0.55, 0.12), fe.fond.get_corner(UR) + P(-0.12, -0.12),
                    color=DROITE_F, stroke_width=6)
        self.au("Une droite", FadeIn(titre), FadeIn(fe, scale=0.9), rt=0.4)
        self.au("traverse", Create(trav), rt=0.8)
        l1 = self.l("Combien de", -0.25, 44)
        self.dit(l1, "Combien de")
        l2 = self.l("calculs pour", -0.85, 44)
        self.poser_gestes(l2, "calculs pour", {0: lambda: [Indicate(trav, color=JAUNE_TITRE)]})
        l3 = self.l("la tracer ?", -1.45, 44)
        self.dit(l3, "la tracer ?")
        l4 = self.l("Deux", -2.05, 52, JAUNE_TITRE)
        self.dit(l4, "Deux")
        l5 = self.l("seulement.", -2.6, 44, JAUNE_TITRE)
        self.dit(l5, "seulement.")
        self.insister(VGroup(l4, l5), 1.06, 0.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : deux points, une règle ──
        self.dire("01-image")
        r = self.rep((-1, 3), (-3, 5), 0.8, 0.33, (-0.95, 0.1), gx=(-1, 1, 2, 3), gy=(-2, 2, 4),
                     grille=(1, 1))
        nx = T("x", 32, CIEL, audit=False).next_to(r.ax.get_end(), UP, buff=0.1).align_to(r.ax.get_end(), RIGHT)
        # à gauche de la flèche : à droite, il touchait l'étiquette « (2 ; 4) »
        ny = T("y", 32, CIEL, audit=False).next_to(r.ay.get_end(), LEFT, buff=0.12)
        r.noms.add(nx, ny)
        for f in VGroup(nx, ny).get_family():
            f._grad = True
        pA, pB = r.p(0, -2), r.p(2, 4)
        A, B = r.point(0, -2, WHITE, r=0.1), r.point(2, 4, WHITE, r=0.1)
        # 4e relecture -ql : le point (0 ; −2) mordait sur la graduation « −2 » : elle s'écarte vers la gauche
        g2 = [g for g in r.get_family() if isinstance(g, Text) and g.text in ("−2", "-2")
              and abs(g.get_y() - pA[1]) < 0.08 and g.get_x() < pA[0]]
        for g in g2:
            g.shift(LEFT * 0.1)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE graduation −2 : {len(g2)} trouvée(s), écart au point "
                  f"{(A.get_left()[0] - g2[0].get_right()[0]) if g2 else -1:.2f}", flush=True)
        # 22/11 (2e passe) : hors des axes et de la droite : « (2 ; 4) » au-dessus à gauche du point (en haut de la
        # grille, à droite de l'axe), « (0 ; −2) » en bas à droite, sous la droite, loin de la graduation « −2 »
        # 3e relecture -ql : graduations 2 et 4 (5 / 3 / 1 étaient irrégulières, « 5 » sous « (2 ; 4) ») ;
        # « (0 ; −2) » à DROITE du point (en bas à droite, il touchait « f(x) = 3x − 2 »)
        eA, fA = self.etiq("(0 ; −2)", A, RIGHT, buff=0.14)
        eA.shift(DOWN * 0.12)  # sous la droite qui part du point vers le haut
        eB, fB = self.etiq("(2 ; 4)", B, UL, buff=0.08)  # à droite, il touchait le bord du short
        for e_, f_ in ((eA, fA), (eB, fB)):
            f_.move_to(e_)
        d = self.trait(r.droite(3, -2))
        regle = Regle(pA, pB, ext=0.45, h=0.26)
        C = r.point(1, 1, VERT_OK, r=0.1)
        okC = self.coche(VERT_OK, 0.18).next_to(C, DR, buff=0.04)
        ya, yb, yc = -1.35, -1.95, -2.55
        f = self.lf("f(x) = 3x − 2", ya, 42, a=(5,), b=(7, 8))
        self.poser_gestes(f, "f de x égale 3 x moins 2.", {0: lambda: [FadeIn(r)]}, echelle=1.15)
        b1 = self.lf("f(0) = −2", yb, 44)
        teinter(b1, {2: INCONNUE})
        self.poser_gestes(b1, "f de 0 égale moins 2.",
                          {2: lambda: [FadeIn(fA), FadeIn(VGroup(*eA.atomes[0:2]))],
                           5: lambda: [FadeIn(VGroup(*eA.atomes[2:4]))],
                           6: lambda: [FadeIn(A, scale=2), FadeIn(VGroup(*eA.atomes[4:]))]}, echelle=1.15)
        c1 = self.lf("f(2) = 6 − 2 = 4", yc, 34)
        teinter(c1, {2: INCONNUE, 9: VERT_OK})
        self.poser_gestes(c1, "f de 2 égale 6 moins 2 : 4.",
                          {2: lambda: [FadeIn(fB), FadeIn(VGroup(*eB.atomes[0:2]))],
                           9: lambda: [FadeIn(B, scale=2), FadeIn(VGroup(*eB.atomes[2:]))]}, echelle=1.15)
        self.au("Deux points", FadeOut(VGroup(b1, c1)), Flash(A, color=JAUNE_TITRE, line_length=0.15),
                Flash(B, color=JAUNE_TITRE, line_length=0.15), rt=0.3)
        b2 = self.l("Deux points,", yb, 44)
        self.dit(b2, "Deux points,")
        c2 = self.l("une règle :", yc, 44)
        self.poser_gestes(c2, "une règle :", {1: lambda: [FadeIn(regle, shift=regle.nrm * 0.4)]})
        self.au("tracée", Create(d), rt=0.6)
        self.play(FadeOut(regle), run_time=0.2)
        self.au("Un troisième", FadeOut(VGroup(b2, c2)), rt=0.2)
        b3 = self.l("Un troisième", yb, 42)
        self.poser_gestes(b3, "Un troisième point ?", {1: lambda: [FadeIn(C, scale=2)]})
        c3 = self.l("point ?", yc, 44)
        self.dit(c3, "point ?")
        self.au("Seulement", FadeOut(VGroup(b3, c3)), rt=0.2)
        b4 = self.l("Seulement", yb, 44, VERT_OK)
        self.dit(b4, "Seulement")
        c4 = self.l("pour vérifier.", yc, 42, VERT_OK)
        self.poser_gestes(c4, "pour vérifier.", {1: lambda: [Create(okC)]})
        self.insister(c4, 1.05, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_q("f(x) = 2x + 1", "f de x égale 2 x plus 1,", a=(5,), b=(7, 8))

        def apres(sc):
            sc.place_reponse()
            sc.ph_gestes(0, "Réponse A :", "Réponse A :", {}, premier=True)
            sc.ph_gestes(1, "f(0) = 1,", "f de 0 égale 1,", {})
            sc.ph_gestes(2, "f(1) = 2 + 1 = 3.", "et f de 1 égale 2 plus 1 : 3.", {})
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["f(x) = 2x + 1"],
                            [X("(0 ; 1) et (1 ; 3)", 34), X("(0 ; 2) et (1 ; 1)", 34), X("(1 ; 1) et (2 ; 2)", 34)],
                            0, ["Réponse A :", "f(0) = 1,", "f(1) = 2 + 1 = 3."],
                            avant_q=avant, autres_r=apres)

        # ── 02 : la question en commentaire, SANS Ti-Margo (17/11), puis la fin commune ──
        self.dire("02-question")
        self._audit_place()
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        tit = T("À toi !", 52, JAUNE_TITRE).move_to(P(0, 2.7))
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1), rt=0.35)
        q1 = self.l("Quels deux", 1.75, 44)
        self.dit(q1, "Quels deux")
        q2 = self.l("points ?", 1.15, 44)
        self.dit(q2, "points choisis-tu")
        q3 = self.l("Pour tracer", 0.4, 44)
        self.dit(q3, "pour tracer")
        q4 = self.lf("f(x) = −x + 5", -0.3, 40, a=(5,), b=(7, 8))
        self.dire_eq(q4, "f de x égale moins x plus 5 ?", echelle=1.15)
        appel_commentaire(self, y=-1.55)
        self.attendre_voix(marge=0.6)
        self._audit_place()
        ecran_fin(self, "short", voix="03-abonne")
