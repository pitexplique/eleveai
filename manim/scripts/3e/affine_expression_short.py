# affine_expression_short.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 05, le SHORT ceinture VERTE (animation Manim)
# « Retrouve la fonction » : f(2) = 9 et f(5) = 18 suffisent. Les images gagnent 9, les x gagnent 3 : a = 3 ;
# 3 × 2 + b = 9 : b = 3 ; f(x) = 3x + 3, vérifié à 5 : 15 + 3 = 18.
# Écrans (clés de manim/voix/3e-affine-expression-short.json) :
#   00-accroche : le repère, deux points, une droite ; 01-image : le calcul de a puis de b, la vérification ;
#   01q / 01r : la question-pause (3 s), réponse B (2x + 4) ;
#   02-question : « f(1) = 2 et f(4) = −7 » en commentaire (réponse −3x + 5), puis la fin commune (03-abonne).
# Lettre de la question : B. Métier de la série : Awa, technicienne en environnement (la paysage).
# Code couleur : x bleu ; a orange ; b violet (point sur l'axe vertical) ; juste vert ; droite de f bleue.
# Voix : manim/voix/3e-affine-expression-short.json (validée) ; marques : affine_expression_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/3e/affine_expression_short.py AffineExpressionShort3e --media_dir manim/scripts/3e/media-affine-05s-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/affine_expression_short.py AffineExpressionShort3e -o eleveai-maths-3e-affine-expression-short --media_dir manim/scripts/3e/media-affine-05s
# Sortie : manim/sorties/3e/maths/fonctions-affines/05-expression/eleveai-maths-3e-affine-expression-short.mp4

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS 4e et ses outils communs
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from ident_developper import X  # noqa: E402
from ident_factoriser_short import IdentFactoriserShort3e  # noqa: E402
from affine_expression import COUL_A, COUL_B, ORANGE_RETENUE, VERT_OK, Controle, Repere, teinte  # noqa: E402
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

PAROLE["0"] = "0"  # la voix écrit « f de 0 » en chiffres


class AffineExpressionShort3e(Controle, IdentFactoriserShort3e):
    nom_voix = "3e-affine-expression-short"
    fichier_marques = "affine_expression_short_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "verte"

    @staticmethod
    def _fs(m):
        """La taille effective (pt) du premier texte de m."""
        for f in m.get_family():
            if isinstance(f, Text) and getattr(f, "original_text", "").strip():
                return f.font_size
        return 36.0

    def _disposer_q(self, question, choix, phrase):
        """2e relecture -ql (22/11), modèle affine_reconnaitre_short : énoncé en deux lignes à 36 pt, cartes
        tassées (0,58 de haut) à 36 pt, « Mets pause, » / « et choisis ! » à 33 pt en ORANGE (l'ancienne
        couleur était celle d'un texte noir : la phrase était invisible), sous les cartes, bas ≥ −2,45
        (Ti-Margo centré en bas, haut −2,92)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        self._phrases_q = list(phrase)
        if len(q.submobjects):
            q.scale(36 / self._fs(q))
            if q.width > 3.9:
                q.scale_to_fit_width(3.9)
            q.next_to(tete, DOWN, buff=0.1).set_x(0)
        for c in cartes:
            cadre, dedans = c[0], c[1]
            g = dedans.get_left()[0]
            lettre, corps = dedans[0], dedans[1]
            corps.scale(36 / self._fs(corps))
            lettre.scale(36 / self._fs(lettre)).align_to(P(g, 0), LEFT).set_y(corps.get_y())
            corps.next_to(lettre, RIGHT, buff=0.22)
            cadre.stretch_to_fit_height(0.58)
            dedans.set_y(cadre.get_y())
        cartes.arrange(DOWN, buff=0.08).next_to(q if len(q.submobjects) else tete, DOWN, buff=0.15).set_x(0)
        neuf = VGroup(T("Mets pause,", 33, ORANGE_RETENUE, audit=False),
                      T("et choisis !", 33, ORANGE_RETENUE, audit=False)).arrange(DOWN, buff=0.04)
        for f in neuf.get_family():
            f.sans_synchro = True
        neuf.next_to(cartes, DOWN, buff=0.12).set_x(0)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE tete {tete.get_top()[1]:.2f}/{tete.get_bottom()[1]:.2f} q {q.get_top()[1]:.2f}/"
                  f"{q.get_bottom()[1]:.2f} {self._fs(q):.0f} pt ; cartes {cartes.get_top()[1]:.2f}/"
                  f"{cartes.get_bottom()[1]:.2f} larg {cartes.width:.2f} {self._fs(cartes[0][1][1]):.0f} pt ; pause "
                  f"bas {neuf.get_bottom()[1]:.2f} larg {neuf.width:.2f} {self._fs(neuf):.0f} pt ; margo "
                  f"{self._haut_margo():.2f}", flush=True)
        return tete, q, cartes, neuf, rebours, ph

    def _haut_margo(self):
        m = [x for x in self.mobjects if type(x).__name__.startswith("Mascotte")]
        return m[0].get_top()[1] if m else -3.0

    def place_reponse(self):
        """Les cartes s'effacent, la réponse prend leur place en lignes courtes à 36 pt (des X neufs, jamais
        ramenés à une largeur), au-dessus de Ti-Margo."""
        cartes, ph = self.cartes_q, self.ph_q
        haut = self.q_haut  # l'énoncé s'efface aussi : la réponse le redit (f(0) = b = 4)
        self.play(FadeOut(cartes), FadeOut(self.mobjects[-1]), FadeOut(self.q_lignes), run_time=0.25)
        rep = VGroup(*[X(s, 36, VERT_OK) for s in self._phrases_q]).arrange(DOWN, buff=0.24)
        rep.next_to(P(0, haut), DOWN, buff=0).set_x(0)
        self._rep_x = list(rep)
        for l, r in zip(ph, rep):
            l.move_to(r)
        if os.environ.get("AUDIT") == "1":
            print(f"TAILLE-REPONSE {self._fs(rep):.0f} pt haut={haut:.2f} bas={rep.get_bottom()[1]:.2f} "
                  f"(margo {self._haut_margo():.2f}) larg={rep.width:.2f}", flush=True)

    def ph_eq(self, i, s, phrase, n=1, lettres="", couleur=None, premier=False, avec=()):
        """La ligne i de la réponse, à 36 pt, posée au mot."""
        e = self._rep_x[i]
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        self.dire_eq(e, phrase, n=n, echelle=1.0, rt=0.16, sauf=sauf, avec=avec)
        return e

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Retrouve f(x)", self.ceinture)
        titre.sans_synchro = True
        titre._commun = True
        badge._commun = True
        self.add(badge)
        garder = [badge, titre, margo]

        # le repère : sous l'échelle des ceintures, il reste de l'accroche au calcul
        # (≈ 85 % de la largeur ; les textes passent DESSOUS, à 0,4 au moins des graduations)
        haut = badge.get_bottom()[1] - 0.25
        uy = 0.088
        o_y = haut - 0.4 - 20 * uy
        R = Repere(P(-1.5, o_y), 0.5, uy, (0, 6), (0, 20), xlab=range(1, 7), ylab=(5, 10, 15, 20),
                   nom_x="x", nom_y="f(x)", nom_x_pos="dessus")
        R.ny.next_to(R.ay.get_end(), RIGHT, buff=0.12).align_to(R.ay.get_end(), UP)
        if os.environ.get("AUDIT") == "1":
            print(f"ECART-ECHELLE {badge.get_bottom()[1] - R.get_top()[1]:.2f} ; bas du repère {R.get_bottom()[1]:.2f}",
                  flush=True)
        pa, pb = R.point(2, 9), R.point(5, 18)
        d = R.droite(3, 3, 0, 5.6)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(FadeIn(titre), FadeIn(R), run_time=0.1)
        l1 = self.l("Deux nombres,", -1.05, 46)
        self.poser_gestes(l1, "Deux nombres,", {0: lambda: [FadeIn(pa, scale=2)], 1: lambda: [FadeIn(pb, scale=2)]})
        l2 = self.l("toute une fonction", -1.62, 38)
        self.dit(l2, "toute une fonction")
        l2b = self.l("affine.", -2.12, 40)
        self.poser_gestes(l2b, "affine.", {0: lambda: [Create(d)]})
        l3 = self.l("Tu me crois ?", -2.68, 44, JAUNE_TITRE)
        self.dit(l3, "Tu me crois ?")
        self.insister(l3, 1.04, 0.15)
        self.attendre_voix(marge=0.3)
        self.play(FadeOut(VGroup(l1, l2, l2b, l3)), FadeOut(d), run_time=0.25)

        # ── 01 : a, puis b, puis la vérification ──
        self.dire("01-image")
        ea = X("f(2) = 9", 44).move_to(P(0, -1.1))
        eb = X("f(5) = 18", 44).move_to(P(0, -1.72))
        la, lb = R.lecture(2, 9), R.lecture(5, 18)
        self.poser_gestes(ea, "f de 2 égale 9,", {5: lambda: [Create(la), Indicate(pa, scale_factor=1.8)]},
                          echelle=1.15)
        self.poser_gestes(eb, "f de 5 égale 18.", {5: lambda: [Create(lb), Indicate(pb, scale_factor=1.8)]},
                          echelle=1.15)
        fv, lv = R.pas_v(5, 9, 18, "+ 9", fs=32, cote=RIGHT)
        fh, lh = R.pas_h(2, 5, 9, "+ 3", fs=32, cote=DOWN)
        e1 = self.lx("9 ÷ 3 : a = 3.", -2.42, 46)
        teinte(e1, orange=[0, 4, 6])
        self.poser_gestes(e1, "Les images gagnent 9, les x gagnent 3 : a vaut 3.",
                          {0: lambda: [FadeOut(VGroup(la, lb)), GrowArrow(fv), FadeIn(lv)],
                           2: lambda: [GrowArrow(fh), FadeIn(lh)]}, echelle=1.15)
        self.play(Create(self.cadre_ok(VGroup(*e1.atomes[4:7]), 0.08)), run_time=0.25)
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in garder and m not in (R, pa, pb, fv, lv)])),
                  run_time=0.25)
        e2 = self.lx("3 × 2 + b = 9", -1.1, 46)
        teinte(e2, orange=[0], violet=[4])
        la2 = R.lecture(2, 9)
        self.poser_gestes(e2, "Puis 3 fois 2, plus b, égale 9 :", {6: lambda: [Create(la2)]}, echelle=1.15)
        p0 = R.point(0, 3, COUL_B, r=0.12)
        e3 = self.lx("b = 3.", -1.75, 48, COUL_B)
        self.poser_gestes(e3, "b vaut 3.", {2: lambda: [FadeIn(p0, scale=2.5)]}, echelle=1.15)
        d2 = R.droite(3, 3, 0, 5.6)
        e4 = self.lx("f(x) = 3x + 3", -2.42, 50)
        teinte(e4, orange=[5], violet=[8])
        self.poser_gestes(e4, "f de x égale 3 x plus 3.", {5: lambda: [Create(d2)]}, echelle=1.15)
        cad = self.cadre_ok(e4, 0.1)
        self.play(Create(cad), run_time=0.25)
        e5 = self.lx("15 + 3 = 18 !", -1.4, 52, VERT_OK)
        lb2 = R.lecture(5, 18)
        self.au("On vérifie", FadeOut(VGroup(e2, e3, la2)), rt=0.25)
        self.poser_gestes(e5, "15 plus 3, 18 !", {4: lambda: [Create(lb2), Indicate(pb, scale_factor=1.8)]},
                          echelle=1.15)
        self.insister(e5, 1.06, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s), réponse B ──
        def avant(sc):
            sc.q_haut = sc.q_q.get_top()[1]
            q1 = sc.eq_dans_q(0, "f(0) = 4 et", "f de 0 égale 4, et", lettres="x", fs=34, couleur=JAUNE_TITRE)
            q2 = sc.eq_dans_q(0, "f(1) = 6.", "f de 1 égale 6.", lettres="x", fs=34, couleur=JAUNE_TITRE)
            sc.q_lignes = VGroup(q1, q2)

        def apres(sc):
            sc.place_reponse()
            sc.ph_eq(0, "Réponse B :", "Réponse B :", premier=True)
            sc.ph_eq(1, "f(0) = b = 4.", "f de 0, c'est b : 4.")
            sc.ph_eq(2, "De 0 à 1,", "De 0 à 1,")
            sc.ph_eq(3, "f gagne 2 :", "f gagne 2 :")
            sc.ph_eq(4, "a = 2.", "a vaut 2.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["f(0) = 4 et", "f(1) = 6."],
                            [Eq("4x + 6", 34), Eq("2x + 4", 34), Eq("6x + 4", 34)], 1,
                            ["Réponse B :", "f(0) = b = 4.", "De 0 à 1,", "f gagne 2 :", "a = 2."],
                            avant_q=avant, autres_r=apres)

        # ── 02 : la question en commentaire, SANS Ti-Margo (17/11), puis la fin commune ──
        self.dire("02-question")
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        tit = T("À toi !", 52, JAUNE_TITRE).move_to(P(0, 2.85))
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1), rt=0.35)
        q1 = self.lx("f(1) = 2", 2.0, 58)
        self.dire_eq(q1, "f de 1 égale 2,", echelle=1.15)
        q2 = self.lx("f(4) = −7", 1.2, 58)
        self.dire_eq(q2, "f de 4 égale moins 7.", echelle=1.15)
        q3 = self.l("Quelle est", 0.45, 42, CIEL)
        self.dit(q3, "Quelle est")
        q4 = self.l("l'expression", -0.1, 42, CIEL)
        self.dit(q4, "l'expression")
        q5 = self.l("de f ?", -0.65, 42, CIEL)
        self.dit(q5, "de f ?")
        appel_commentaire(self, y=-1.65)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="03-abonne")
