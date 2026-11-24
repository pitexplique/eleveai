# ident_factoriser_short.py
# EleveAI — Maths 3e — série IDENTITÉS REMARQUABLES, épisode 07, le SHORT ceinture ORANGE
# « Le carré troué » : un carré de côté x moins un carré 3 × 3 (l'arbre) : x² − 9. On coupe une bande, on la
# tourne, on la colle : un rectangle (x − 3) sur (x + 3). Donc x² − 9 = (x − 3)(x + 3).
#   · 1 question-pause (3 s) : x² − 100, bonne réponse B ((x − 10)(x + 10)) ;
#   · fin : écran commentaire « Factorise 9x² − 1 » (réponse (3x − 1)(3x + 1)), puis la fin commune.
# Micro : litteral_identite (3e, notion litteral_calcul). Métier : Inès, carreleuse (la paysage).
# Centres : art-design, jeux-defis.
# Voix : manim/voix/3e-identites-factoriser-short.json (validée) ; marques : ident_factoriser_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/3e/ident_factoriser_short.py IdentFactoriserShort3e --media_dir manim/scripts/3e/media-ident-07s-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/ident_factoriser_short.py IdentFactoriserShort3e -o eleveai-maths-3e-identites-factoriser-short --media_dir manim/scripts/3e/media-ident-07s
# Sortie : manim/sorties/3e/maths/expression-litterale/07-factoriser-identite/eleveai-maths-3e-identites-factoriser-short.mp4

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS 4e et ses outils communs
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from ident_developper import X  # noqa: E402
from ident_developper_short import IdentDevelopperShort4e  # noqa: E402
from ident_factoriser import Terrasse, cote  # noqa: E402
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

PAROLE["²"] = "carré"


class IdentFactoriserShort3e(IdentDevelopperShort4e):
    nom_voix = "3e-identites-factoriser-short"
    fichier_marques = "ident_factoriser_short_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "orange"

    def _plan_eq(self, e, debut, fin, sauf=()):
        """Comme le module commun, mais signale (AUDIT) un atome qui ne serait jamais posé."""
        lots = super()._plan_eq(e, debut, fin, sauf)
        if os.environ.get("AUDIT") == "1":
            poses = [a for _, at in lots for a in at]
            for a in e.atomes:
                if not any(a is b for b in poses) and not any(a is b for b in sauf):
                    print(f"PERDU « {e.s} » : {a.original_text}", flush=True)
        return lots

    def _disposer_q(self, question, choix, phrase):
        """Relecture -ql du 22/11 : l'énoncé et les cartes étaient minuscules. Énoncé à ~44, cartes larges
        de 3,85 (× 1,08 au ✓ : toujours dans le cadre), choix à la plus grande taille qui tient."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        if len(q.submobjects):
            h = T("Et x² − 100 ?", 46, audit=False).height
            q.scale(h / q.height)
            if q.width > 3.9:
                q.scale_to_fit_width(3.9)
            q.next_to(tete, DOWN, buff=0.35).set_x(0)
        larg = 3.85
        for c in cartes:
            cadre, dedans = c[0], c[1]
            cadre.stretch_to_fit_width(larg)
            cadre.move_to(P(0, cadre.get_y()))
            dedans.next_to(cadre.get_left(), RIGHT, buff=0.15)
            k = min(1.9, (larg - 1.0 - 0.15) / dedans.width)
            dedans.scale(k, about_point=dedans.get_left())
            cadre.stretch_to_fit_height(dedans.height + 0.3)
            dedans.set_y(cadre.get_y())
        cartes.arrange(DOWN, buff=0.2).next_to(q if len(q.submobjects) else tete, DOWN, buff=0.35).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.2).set_x(0)
        ph.arrange(DOWN, buff=0.12).next_to(cartes, DOWN, buff=0.15).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def place_reponse(self):
        """Comme ident_choisir_short : après le ✓, les cartes s'effacent et la réponse prend leur place."""
        cartes, ph = self.cartes_q, self.ph_q
        haut = cartes[0].get_top()[1] - 0.05
        self.play(FadeOut(cartes), FadeOut(self.mobjects[-1]), run_time=0.25)
        ph.arrange(DOWN, buff=0.2)
        k = min(0.55 / max(l.height for l in ph), 3.8 / ph.width, (haut + 2.75) / ph.height)
        ph.scale(k).next_to(P(0, haut), DOWN, buff=0).set_x(0)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le carré troué", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : un carré troué devient-il un rectangle ? ──
        # Relecture -ql du 22/11 : la figure plus grande et plus bas ; elle RESTE d'un écran à l'autre
        # (plus de fondu au noir entre l'accroche et l'image).
        self.dire("00-accroche")
        t = Terrasse(2.8, 1.05, P(-1.925, 1.2))
        self.au("Un carré troué", FadeIn(titre), FadeIn(VGroup(t.trou, t.grande, t.petite, t.arbre), scale=0.9),
                rt=0.4)
        l1 = self.l("Tu peux en faire", -2.05, 44)
        self.dit(l1, "Tu peux en faire")
        l2 = self.l("un rectangle ?", -2.62, 44, JAUNE_TITRE)
        self.dit(l2, "un rectangle ?")
        self.insister(l2, 1.04, 0.15)
        self.attendre_voix(marge=0.3)
        self.play(FadeOut(VGroup(l1, l2)), run_time=0.25)

        # ── 01 : couper, tourner, coller : le rectangle ──
        self.dire("01-image")
        k = t.coins()
        fx, lx = cote(k["tl"], k["tr"], "x", UP, fs=40, audit=True, d=0.2)
        f3a, l3a = cote(t.trou.get_corner(DL), t.trou.get_corner(DR), "3", DOWN, fs=40, audit=True, d=0.2)
        f3b, l3b = cote(t.trou.get_corner(DR), t.trou.get_corner(UR), "3", RIGHT, fs=40, audit=True, d=0.18)
        if os.environ.get("AUDIT") == "1":
            print(f"ECART-ECHELLE {badge.get_bottom()[1] - lx.get_top()[1]:.2f}", flush=True)
        self.au("Un carré", Indicate(VGroup(t.grande, t.petite), color=JAUNE_TITRE, scale_factor=1.03), rt=0.35)
        self.dire_eq(lx, "côté x,", avec=[GrowFromCenter(fx)], echelle=1.2)
        self.au("moins un carré", Indicate(VGroup(t.trou, t.arbre), color=JAUNE_TITRE, scale_factor=1.1), rt=0.35)
        self.dire_eq(l3a, "de 3 sur", avec=[GrowFromCenter(f3a)], echelle=1.2)
        self.dire_eq(l3b, "sur 3 :", avec=[GrowFromCenter(f3b)], echelle=1.2)
        e0 = X("x² − 9", 50).move_to(t.grande)
        fond0 = RoundedRectangle(width=e0.width + 0.3, height=e0.height + 0.22, corner_radius=0.1, stroke_width=0,
                                 fill_color="#0b1220", fill_opacity=0.88).move_to(e0)
        self.dire_eq(e0, "x au carré moins 9.", avec=[FadeIn(fond0)], echelle=1.15)
        coupe = DashedLine(k["cut"] + LEFT * 0.12, k["cut"] + RIGHT * (t.S - t.b + 0.12), dash_length=0.1,
                           color=JAUNE_TITRE, stroke_width=5)
        self.au("Je coupe", Create(coupe), FadeOut(VGroup(e0, fond0)), rt=0.3)
        self.au("une bande", *t.colorer(), FadeOut(coupe), FadeOut(VGroup(f3a, l3a, f3b, l3b)), rt=0.3)
        self.play(t.petite.animate.shift(DOWN * 0.15), run_time=0.25)
        self.au("tourne")
        t.tourner(self, 0.5)
        self.au("colle")
        self.play(t.petite.animate.move_to(t.cible), FadeOut(VGroup(t.trou, t.arbre)), run_time=0.6)
        cadre = t.contour_rect()
        self.au("Un rectangle", Create(cadre), rt=0.35)
        g = t.grande
        fh = DoubleArrow(g.get_corner(UL) + P(0.24, -0.08), g.get_corner(DL) + P(0.24, 0.08), buff=0, stroke_width=4,
                         tip_length=0.14, max_tip_length_to_length_ratio=0.2, color=WHITE)
        lh = X("x − 3", 42, WHITE).next_to(fh, RIGHT, buff=0.16)
        fond = RoundedRectangle(width=lh.width + 0.24, height=lh.height + 0.18, corner_radius=0.08, stroke_width=0,
                                fill_color="#0b1220", fill_opacity=0.9).move_to(lh)
        self.dire_eq(lh, "x moins 3 sur", avec=[GrowFromCenter(fh), FadeIn(fond)], echelle=1.15)
        fw, lw = cote(cadre.get_corner(DL), cadre.get_corner(DR), "x + 3", DOWN, fs=42, audit=True, d=0.2)
        self.dire_eq(lw, "x plus 3.", avec=[GrowFromCenter(fw)], echelle=1.15)
        f1 = self.lx("x² − 9 =", -1.72, 56)
        self.dire_eq(f1, "x au carré moins 9 égale", echelle=1.15)
        f2 = self.lx("(x − 3)(x + 3)", -2.42, 56, VERT_OK)
        f2.scale_to_fit_width(min(f2.width, 3.7)).move_to(P(0, -2.42))
        for a in f2.atomes:
            if a.original_text == "x":
                a.set_color(INCONNUE)
        self.dire_eq(f2, "x moins 3, fois x plus 3.", echelle=1.15)
        res = VGroup(f1, f2)
        self.play(Create(self.cadre_ok(res, 0.1)), run_time=0.3)
        self.insister(res, 1.03, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Et x² − 100 ?", "Et x au carré moins 100 ?", lettres="x", fs=34, couleur=JAUNE_TITRE)

        def apres(sc):
            sc.place_reponse()
            sc.ph_eq(0, "Réponse B :", "Réponse B :", premier=True)
            sc.ph_eq(1, "100 = 10².", "100, c'est 10 au carré.")
            sc.ph_eq(2, "(x − 10)(x + 10).", "Donc x moins 10, fois x plus 10.", lettres="x")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Et x² − 100 ?"],
                            [Eq("(x − 50)(x + 50)", 34), Eq("(x − 10)(x + 10)", 34), Eq("(x − 10)²", 34)], 1,
                            ["Réponse B :", "100 = 10².", "(x − 10)(x + 10)."],
                            avant_q=avant, autres_r=apres)

        # ── 02 : la question en commentaire, SANS Ti-Margo (17/11), puis la fin commune ──
        self.dire("02-question")
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        tit = T("À toi !", 52, JAUNE_TITRE).move_to(P(0, 2.6))
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1), rt=0.35)
        q1 = self.l("Factorise", 1.45, 46)
        self.dit(q1, "Factorise")
        q2 = self.lx("9x² − 1", 0.55, 66)
        self.dire_eq(q2, "9 x au carré moins 1.", echelle=1.15)
        appel_commentaire(self, y=-1.0)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="03-abonne")
