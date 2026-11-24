# affine_defi_short.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 09, le SHORT ceinture BLEUE (animation Manim)
# « Tour de magie » : pense à un nombre, × 4, + 12, ÷ 4, − ton nombre : tu trouves 3 ! Pourquoi ?
# (4x + 12) ÷ 4 = x + 3, puis − x : il reste 3. Une fonction affine avec a = 0 : une fonction constante.
# Écrans (clés de manim/voix/3e-affine-defi-short.json) :
#   00-accroche : le chapeau de magicien ; 01-image : le programme en étapes, à droite de chaque étape son
#   expression (4x, 4x + 12, x + 3, 3), puis « affine avec a = 0 : fonction constante » ;
#   01q / 01r : la question-pause (3 s), réponse B (5) ;
#   02-question : « invente un programme qui donne toujours 7 » en commentaire, puis la fin commune (03-abonne).
# Lettre de la question : B. Métier de la série : Jade, cheffe de chantier (la paysage).
# Code couleur : x bleu ; a orange ; b violet ; juste vert.
# Voix : manim/voix/3e-affine-defi-short.json (validée) ; marques : affine_defi_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/3e/affine_defi_short.py AffineDefiShort3e --media_dir manim/scripts/3e/media-affine-09s-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/affine_defi_short.py AffineDefiShort3e -o eleveai-maths-3e-affine-defi-short --media_dir manim/scripts/3e/media-affine-09s
# Sortie : manim/sorties/3e/maths/fonctions-affines/09-defi/eleveai-maths-3e-affine-defi-short.mp4

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
from ident_factoriser_short import IdentFactoriserShort3e  # noqa: E402
from affine_expression import COUL_A  # noqa: E402
from affine_defi import BOITE, verifier  # noqa: E402
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

PAROLE["0"] = "0"  # la voix écrit « a égale 0 » en chiffres

NOIR_CHAPEAU = "#111827"
RUBAN = "#dc2626"


def chapeau(s=1.0, centre=ORIGIN):
    """Le chapeau haut-de-forme du magicien, sa baguette et deux étoiles."""
    c = np.array(centre, dtype=float)
    corps = Rectangle(width=1.25, height=1.15, fill_color=NOIR_CHAPEAU, fill_opacity=1, stroke_color="#64748b",
                      stroke_width=3).move_to(c + UP * 0.62)
    ruban = Rectangle(width=1.25, height=0.22, fill_color=RUBAN, fill_opacity=1, stroke_width=0).move_to(
        c + UP * 0.2)
    bord = RoundedRectangle(width=2.0, height=0.2, corner_radius=0.08, fill_color=NOIR_CHAPEAU, fill_opacity=1,
                            stroke_color="#64748b", stroke_width=3).move_to(c)
    baguette = Line(c + P(0.55, -0.45), c + P(1.45, 0.75), color=WHITE, stroke_width=7)
    bout = Line(c + P(1.33, 0.59), c + P(1.45, 0.75), color=NOIR_CHAPEAU, stroke_width=7)
    etoiles = VGroup(Star(5, outer_radius=0.2, color=JAUNE_TITRE, fill_opacity=1).move_to(c + P(1.6, 1.05)),
                     Star(5, outer_radius=0.13, color=JAUNE_TITRE, fill_opacity=1).move_to(c + P(-1.25, 1.15)))
    return VGroup(corps, ruban, bord, baguette, bout, etoiles).scale(s, about_point=c)


class AffineDefiShort3e(IdentFactoriserShort3e):
    nom_voix = "3e-affine-defi-short"
    fichier_marques = "affine_defi_short_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "bleue"

    def ln(self, s, y, fs=40, c=WHITE, lettres="x", x=0.0, maxw=3.95):
        e = E(s, fs, c, lettres=lettres)
        if e.width > maxw:
            print(f"RETRECI « {s} » {e.width:.2f} > {maxw:.2f}", flush=True)
            e.scale_to_fit_width(maxw)
        return e.move_to(P(x, y))

    @staticmethod
    def _fs(m):
        """La taille effective (font_size × échelle) du premier texte de m."""
        for f in m.get_family():
            if isinstance(f, Text) and getattr(f, "original_text", "").strip():
                return f.font_size
        return 36.0

    def _disposer_q(self, question, choix, phrase):
        """2e relecture -ql (22/11) : trois lignes de question à 36 pt, cartes tassées (0,52 de haut) et toutes
        à 36 pt (« ton nombre » sortait à ~26), « Mets pause, » / « et choisis ! » en DEUX lignes à 32 pt sous
        les cartes, le tout au-dessus de Ti-Margo (bas ≥ −2,4 ; haut de Ti-Margo −2,92).
        Modèle : _disposer_q d'affine_reconnaitre_short.py."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        if len(q.submobjects) > 1:
            for ligne in q:
                ligne.scale(36 / self._fs(ligne))
            if q.width > 3.95:
                q.scale_to_fit_width(3.95)
            q.arrange(DOWN, buff=0.08).next_to(tete, DOWN, buff=0.1).set_x(0)
        # 3e relecture -ql : « ton nombre » touchait le bord droit de sa carte : son contenu s'ajuste (marge 0,22)
        larg = 3.9
        for c in cartes:
            c[1].scale(36 / self._fs(c[1][1]), about_point=c[1].get_left())
            if c[1].width > larg - 0.34:  # la coche grossit la carte : pas plus large que 3,9
                c[1].scale((larg - 0.34) / c[1].width, about_point=c[1].get_left())
        for c in cartes:
            cadre, dedans = c[0], c[1]
            cadre.stretch_to_fit_height(0.52)
            cadre.stretch_to_fit_width(larg)
            dedans.set_y(cadre.get_y())
            dedans.shift(RIGHT * (cadre.get_left()[0] + 0.12 - dedans.get_left()[0]))
        cartes.arrange(DOWN, buff=0.07, aligned_edge=LEFT).next_to(q, DOWN, buff=0.1).set_x(0)
        neuf = VGroup(T("Mets pause,", 32, ORANGE_RETENUE, audit=False),  # 3e relecture : orange, comme la série
                      T("et choisis !", 32, ORANGE_RETENUE, audit=False)).arrange(DOWN, buff=0.04)
        for f in neuf.get_family():
            f.sans_synchro = True
        neuf.next_to(cartes, DOWN, buff=0.1).set_x(0)
        ph.next_to(cartes, DOWN, buff=0.15).set_x(0)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE tete {tete.get_top()[1]:.2f}/{tete.get_bottom()[1]:.2f} q {q.get_top()[1]:.2f}/"
                  f"{q.get_bottom()[1]:.2f} ({self._fs(q[0]):.0f} pt) cartes {cartes.get_top()[1]:.2f}/"
                  f"{cartes.get_bottom()[1]:.2f} ({min(self._fs(c[1][1]) for c in cartes):.0f} pt, "
                  f"{cartes.get_left()[0]:.2f}→{cartes.get_right()[0]:.2f}) pause bas {neuf.get_bottom()[1]:.2f} "
                  f"({self._fs(neuf):.0f} pt) (Ti-Margo −2,92)", flush=True)
        return tete, q, cartes, neuf, rebours, ph

    def place_reponse(self):
        """Après le ✓, les cartes s'effacent et la réponse prend leur place, à ~40 pt."""
        cartes, ph = self.cartes_q, self.ph_q
        haut = cartes[0].get_top()[1] - 0.05
        self.play(FadeOut(cartes), FadeOut(self.mobjects[-1]), run_time=0.25)
        for l in ph:  # chaque ligne à 38 pt (au plus la largeur du cadre)
            s0 = getattr(l, "original_text", None)
            if s0:
                ref = T(s0, 38, audit=False)
                l.scale(min(ref.height / l.height, 3.95 / l.width))
        ph.arrange(DOWN, buff=0.16)
        k = min(1.0, (haut + 2.45) / ph.height)  # au-dessus de Ti-Margo (haut −2,92)
        ph.scale(k).next_to(P(0, haut), DOWN, buff=0).set_x(0)
        if os.environ.get("AUDIT") == "1":
            print(f"REPONSE {self._cle_voix} k={k:.2f} {self._fs(ph[0]):.0f} pt, bas {ph.get_bottom()[1]:.2f}",
                  flush=True)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Tour de magie", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        ch = chapeau(0.85, P(-0.15, 0.75))
        self.play(FadeIn(titre), run_time=0.1)
        l1 = self.ln("Pense à", -0.4, 46)
        self.poser_gestes(l1, "Pense à", {0: lambda: [FadeIn(ch, shift=UP * 0.3)]})
        l1b = self.ln("un nombre.", -1.1, 46)
        self.dit(l1b, "un nombre.")
        l2 = self.ln("Je vais deviner", -1.85, 36)
        self.poser_gestes(l2, "Je vais deviner", {2: lambda: [Wiggle(ch[3:])]})
        l3 = self.ln("ton résultat !", -2.5, 40, JAUNE_TITRE)
        self.dit(l3, "ton résultat.")
        self.insister(l3, 1.06, 0.15)
        verifier(self, [ch], "00-accroche", exclure=[badge])
        self.attendre_voix(marge=0.3)
        self.play(FadeOut(VGroup(l1, l1b, l2, l3, ch)), run_time=0.25)

        # ── 01 : le programme en étapes, puis la réduction ──
        self.dire("01-image")
        xb, wb, xv = -1.25, 1.6, 0.9  # 3e relecture : 1,45, « + 12 » touchait le cadre
        ys = (1.95, 1.25, 0.55, -0.15, -0.85)
        boites = []
        for y in ys:
            boites.append(RoundedRectangle(width=wb, height=0.56, corner_radius=0.12, fill_color=BOITE,
                                           fill_opacity=1, stroke_color=CIEL, stroke_width=3).move_to(P(xb, y)))
        depart = T("?", 40, JAUNE_TITRE, audit=False, gras=True).move_to(boites[0])
        fl = [Arrow(boites[k].get_bottom(), boites[k + 1].get_top(), buff=0.02, stroke_width=4, tip_length=0.1,
                    max_tip_length_to_length_ratio=0.6, color=CIEL) for k in range(4)]
        self.play(FadeIn(boites[0]), FadeIn(depart), run_time=0.1)
        etapes = (("× 4", "Multiplie-le par 4."), ("+ 12", "Ajoute 12."), ("÷ 4", "Divise par 4."))
        et = []
        for k, (s, ph) in enumerate(etapes):
            e = self.ln(s, ys[k + 1], 38, WHITE, lettres="", x=xb, maxw=wb - 0.2)
            e.atomes[0].set_color(COUL_A)
            self.dit(e, ph, avec=[FadeIn(boites[k + 1]), GrowArrow(fl[k])])
            et.append(e)
        moins_x = X("− x", 38, audit=False).move_to(boites[4])
        moins_x.atomes[0].set_color(COUL_A)
        self.au("Enlève ton nombre", FadeIn(boites[4]), GrowArrow(fl[3]), FadeIn(moins_x, scale=1.2), rt=0.3)
        et.append(moins_x)
        tr = self.ln("Tu trouves 3 !", -1.65, 40, JAUNE_TITRE)
        self.dit(tr, "Tu trouves 3 !")
        self.insister(tr, 1.08, 0.15)
        vx = T("x", 40, INCONNUE, audit=False).move_to(P(xv, ys[0]))
        self.au("Pourquoi", FadeIn(vx, scale=1.3), Indicate(boites[0], color=JAUNE_TITRE, scale_factor=1.05), rt=0.3)
        v1 = X("4x", 36).move_to(P(xv, ys[1]))
        v2 = X("4x + 12", 36).move_to(P(xv, ys[2]))
        self.poser_gestes(v2, "4 x plus 12,", {0: lambda: [FadeIn(v1.atomes[0], scale=1.15)],
                                               1: lambda: [FadeIn(v1.atomes[1], scale=1.15)]}, echelle=1.15)
        self.au("divisé par 4", Indicate(boites[3], color=JAUNE_TITRE, scale_factor=1.05), rt=0.3)
        v3 = X("x + 3", 38).move_to(P(xv, ys[3]))
        self.dire_eq(v3, "c'est x plus 3.", echelle=1.15)
        self.au("Moins x", Indicate(boites[4], color=JAUNE_TITRE, scale_factor=1.05), rt=0.3)
        v4 = X("3", 48, VERT_OK).move_to(P(xv, ys[4]))
        self.dire_eq(v4, "il reste 3.", echelle=1.3)
        self.play(Create(self.cadre_ok(v4, 0.08)), run_time=0.25)
        c1 = self.ln("Affine, a = 0 :", -1.65, 38)
        c1.atomes[2].set_color(COUL_A)
        self.au("C'est une fonction", FadeOut(tr), rt=0.2)
        self.dit(c1, "fonction affine avec a égale 0 :")
        c2 = self.ln("constante !", -2.35, 48, VERT_OK)
        self.dit(c2, "une fonction constante.")
        self.insister(c2, 1.06, 0.15)
        verifier(self, [VGroup(*boites), VGroup(*fl)], "01-image", exclure=[depart, badge, *et])
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s), réponse B ──
        def avant(sc):
            sc.eq_dans_q(0, "× 2, + 10, ÷ 2,", "multiplie par 2, ajoute 10, divise par 2,", lettres="", fs=40)
            sc.eq_dans_q(0, "− ton nombre.", "enlève ton nombre.", lettres="", fs=40)

        def apres(sc):
            sc.place_reponse()
            sc.ph_eq(0, "Réponse B :", "Réponse B :", premier=True)
            sc.ph_eq(1, "(2x + 10) ÷ 2", "2 x plus 10, divisé par 2,", lettres="x")
            sc.ph_eq(2, "= x + 5", "c'est x plus 5.", lettres="x")
            sc.ph_eq(3, "− x : 5.", "Moins x : il reste 5.", lettres="x")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["× 2, + 10, ÷ 2,", "− ton nombre.", "Que trouves-tu ?"],
                            [Eq("10", 34), Eq("5", 34), Eq("ton nombre", 34, lettres="")], 1,
                            ["Réponse B :", "(2x + 10) ÷ 2", "= x + 5", "− x : 5."],
                            avant_q=avant, autres_r=apres)
        verifier(self, [], "01r-reponse", exclure=[badge])

        # ── 02 : la question en commentaire, SANS Ti-Margo (17/11), puis la fin commune ──
        self.dire("02-question")
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        tit = T("À toi !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1), rt=0.35)
        q1 = self.ln("Invente un", 2.1, 44, lettres="")
        self.dit(q1, "Invente un")
        q1b = self.ln("programme", 1.5, 44, lettres="")
        self.dit(q1b, "programme")
        q2 = self.ln("de calcul", 0.9, 44, lettres="")
        self.dit(q2, "de calcul")
        q2b = self.ln("qui donne", 0.3, 44, lettres="")
        self.dit(q2b, "qui donne")
        q3 = self.ln("toujours 7 !", -0.4, 48, JAUNE_TITRE, lettres="")
        self.dire_eq(q3, "toujours 7.", echelle=1.15)
        ch2 = chapeau(0.6, P(-0.1, -2.95))
        self.play(FadeIn(ch2, shift=UP * 0.2), run_time=0.3)
        appel_commentaire(self, y=-1.5)  # 22/11 : « Réponds en » touchait « toujours 7 ! »
        verifier(self, [ch2], "02-question")
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="03-abonne")
