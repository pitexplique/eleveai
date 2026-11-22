# affine_coeff_directeur_short.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 02, le SHORT ceinture ORANGE
# « La batterie qui baisse » : la batterie perd 4 % par heure ; f(x) = −4x + 100 ; le coefficient directeur,
# c'est −4 : à chaque heure, la droite descend de 4 (la loupe : 1 pas →, 4 ↓). Le signe moins, c'est la baisse.
# Écrans (clé de voix → écran) :
#   00-accroche   le téléphone, « Ta batterie perd 4 % par heure », où se cache le coefficient directeur ?
#   01-image      le repère (heures, batterie), f(x) = −4x + 100, a = −4, la loupe, le signe moins ;
#   01q / 01r     QUESTION (3 s) : la plante de 5 cm qui grandit de 2 cm par semaine → réponse A (2) ;
#   02-question   écran commentaire (sans Ti-Margo) : au bout de combien d'heures la batterie est-elle vide ?
#                 (réponse 25 h) ;
#   03-abonne     fin commune (manim/fin_commune.py).
# Question : 01q → A (la lettre que dit la voix).
# Métier : Inès, développeuse de jeux vidéo (la paysage) : son téléphone. Animation Manim (pas de dessin animé).
# Code couleur : x bleu ; a orange ; b violet ; droite de f bleue ; juste vert ; piège rouge.
# Voix : manim/voix/3e-affine-coeff-directeur-short.json (validée) ; marques : affine_coeff_directeur_short_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/3e/affine_coeff_directeur_short.py AffineCoeffDirecteurShort3e --media_dir manim/scripts/3e/media-affine-02s-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/affine_coeff_directeur_short.py AffineCoeffDirecteurShort3e -o eleveai-maths-3e-affine-coeff-directeur-short --media_dir manim/scripts/3e/media-affine-02s
# Sortie : manim/sorties/3e/maths/fonctions-affines/02-coeff-directeur/eleveai-maths-3e-affine-coeff-directeur-short.mp4

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
from affine_coeff_directeur import (COEF, DROITE_F, ORDO, Loupe, Repere, Telephone,  # noqa: E402
                                    _AuditPlace, teinter)
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

PAROLE["cm"] = "centimètres"
PAROLE["0"] = "0"


def plante(s=1.0):
    """Une plante en pot : .pot, .tige, .feuilles ; .pousser(k) : la tige plus haute de k."""
    pot = Polygon(P(-0.3, 0), P(0.3, 0), P(0.22, -0.42), P(-0.22, -0.42), fill_color="#b45309", fill_opacity=1,
                  stroke_width=0)
    tige = Line(P(0, 0), P(0, 0.55), color="#22c55e", stroke_width=6)
    f1 = Ellipse(width=0.18, height=0.42, fill_color="#22c55e", fill_opacity=1, stroke_width=0).rotate(0.7)
    f2 = f1.copy().rotate(-1.4)
    feuilles = VGroup(f1.move_to(P(-0.12, 0.5)), f2.move_to(P(0.12, 0.62)))
    g = VGroup(pot, tige, feuilles).scale(s)
    g.pot, g.tige, g.feuilles = pot, tige, feuilles
    return g


class AffineCoeffDirecteurShort3e(_AuditPlace, IdentFactoriserShort3e):
    ZONE_MARGO = (-0.55, 0.55, -4.0, -2.9)
    nom_voix = "3e-affine-coeff-directeur-short"
    fichier_marques = "affine_coeff_directeur_short_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "orange"

    def _disposer_q(self, question, choix, phrase):
        """Relecture -ql du 22/11 : énoncé à 36-38 pt sur toute la largeur ; cartes étroites à droite (0,58 de
        haut), la plante et « Mets pause ! » (36 pt, sur deux lignes) à leur gauche : rien sur Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = IdentFactoriserShort3e._disposer_q(self, question, choix, phrase)
        dy = 1.95 - tete.get_y()
        tete.shift(UP * dy)
        rebours.shift(UP * dy)
        k = T(question[0], 38, audit=False).height / q[0].height
        for ligne in q:
            ligne.scale(k)
            if ligne.width > 4.1:
                ligne.scale_to_fit_width(4.1)
        q.arrange(DOWN, buff=0.08).next_to(tete, DOWN, buff=0.15).set_x(0)
        larg = 1.3  # 22/11 : cartes courtes (2, 5, 7), à droite ; la plante à gauche (4e relecture : 1,55 → 1,3)
        for c in cartes:
            cadre, dedans = c[0], c[1]
            cadre.stretch_to_fit_width(larg)
            cadre.stretch_to_fit_height(0.6)
            dedans.scale(0.46 / dedans.height)  # 4e relecture : 0,52 → 0,46, le « 2 » grossi à la réponse débordait
            dedans.next_to(cadre.get_left(), RIGHT, buff=0.18)
            dedans.set_y(cadre.get_y())
        neuf = VGroup(T("Mets pause,", 32, ORANGE_RETENUE, audit=False), T("et choisis !", 32, ORANGE_RETENUE, audit=False))
        neuf.arrange(DOWN, buff=0.08)
        for t in neuf:
            t.sans_synchro = True
        # 22/11 : « Mets pause, et choisis ! » (32 pt, 2 lignes) ne tient pas à côté des cartes : centré sous
        # l'énoncé, puis les cartes à droite, la plante à leur gauche.
        # 3e relecture -ql 22/11 : la carte C descendait à −3,46, collée à Ti-Margo : les cartes montent juste
        # sous l'énoncé, à droite ; « Mets pause, et choisis ! » à leur gauche, la plante dessous.
        cartes.arrange(DOWN, buff=0.06).next_to(q, DOWN, buff=0.18).align_to(P(2.0, 0), RIGHT)
        # 4e relecture -ql : « Mets pause, » mordait sur la carte A : cartes plus étroites, phrase collée à gauche,
        # et jamais à moins de 0,12 des cartes.
        neuf.arrange(DOWN, buff=0.04).align_to(cartes, UP).align_to(P(-2.08, 0), LEFT)
        if neuf.get_right()[0] > cartes.get_left()[0] - 0.12:
            neuf.scale_to_fit_width(cartes.get_left()[0] - 0.12 + 2.08).align_to(P(-2.08, 0), LEFT)
        self._bande = (neuf.get_bottom()[1] - 0.1, cartes.get_bottom()[1])  # la plante sous la phrase
        self._q_aff = []
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE badge bas {self._badge.get_bottom()[1]:.2f} tete {tete.get_top()[1]:.2f}/"
                  f"{tete.get_bottom()[1]:.2f} q {q.get_top()[1]:.2f}/{q.get_bottom()[1]:.2f} cartes "
                  f"{cartes.get_top()[1]:.2f}/{cartes.get_bottom()[1]:.2f} pause bas {neuf.get_bottom()[1]:.2f} "
                  f"q {self._fs(q[0]):.0f} pt cartes {self._fs(cartes[0][1]):.0f} pt pause {self._fs(neuf[0]):.0f} pt "
                  f"x[{neuf.get_left()[0]:.2f}, {neuf.get_right()[0]:.2f}] cartes x ≥ {cartes.get_left()[0]:.2f}", flush=True)
        return tete, q, cartes, neuf, rebours, ph

    def lignes_q(self, specs):
        """Dans avant_q : toutes les lignes de la question, posées au mot (i, texte, phrase, gestes)."""
        refs = list(self.q_q)
        for r in refs:
            self.q_q.remove(r)
        for i, s, phrase, gestes in specs:
            ref = refs[i]
            e = E(s, 34, lettres="")
            e.scale_to_fit_height(ref.height)
            if e.width > 4.1:
                e.scale_to_fit_width(4.1)
            e.move_to(ref)
            self._q_aff.append(e)
            self.poser_gestes(e, phrase, gestes, echelle=1.15, rt=0.2)

    def place_reponse(self):
        """Après le ✓ : l'énoncé, les cartes et la coche s'effacent ; la plante monte à gauche, « Réponse A : »
        à sa droite, la réponse en lignes courtes à 36 pt dessous."""
        cartes, ph, pl = self.cartes_q, self.ph_q, self._plante
        vieux = [cartes, self.mobjects[-1], *self._q_aff, *self.q_q.submobjects]
        y0 = 0.85
        self.play(*[FadeOut(m) for m in vieux], pl.animate.move_to(P(-1.55, y0)), run_time=0.3)
        ph.scale(36 / self._fs(ph[0]))
        ph[0].move_to(P(0, y0)).align_to(P(-0.95, 0), LEFT)
        reste = VGroup(*ph[1:]).arrange(DOWN, buff=0.2)  # 3e relecture : 0,14, les lignes se touchaient
        reste.next_to(P(0, y0 - 0.55), DOWN, buff=0).set_x(0)
        if os.environ.get("AUDIT") == "1":
            print(f"REPONSE taille {self._fs(ph[0]):.0f} pt, bas {ph.get_bottom()[1]:.2f}, "
                  f"largeur {max(l.width for l in ph[1:]):.2f}, plante haut {pl.get_top()[1]:.2f}", flush=True)

    def ph_gestes(self, i, s, phrase, gestes, premier=False):
        """La ligne i de la réponse, posée au mot, avec ses gestes sur la figure."""
        ref = self.ph_q[i]
        e = X(s, 30, VERT_OK)
        e.scale_to_fit_height(ref.height).move_to(ref)
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        return self.poser_gestes(e, phrase, gestes, rt=0.16, sauf=sauf)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("La batterie qui baisse", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        self._badge = badge
        garder = [badge, titre, margo]
        if os.environ.get("AUDIT") == "1":
            print(f"BAS-ECHELLE {badge.get_bottom()[1]:.2f}", flush=True)

        # ── 00 : l'accroche : la batterie qui perd 4 % par heure ──
        self.dire("00-accroche")
        tel = Telephone(1.6, 1.0).move_to(P(0, 1.15))
        l1 = self.l("Ta batterie perd", -0.15, 44)
        self.poser_gestes(l1, "Ta batterie perd", {0: lambda: [FadeIn(titre), FadeIn(tel, scale=0.9)]}, rt=0.3)
        l2 = self.l("4 % par heure.", -0.78, 48)
        teinter(l2, {0: COEF})
        self.poser_gestes(l2, "4 % par heure.", {0: lambda: [tel.vers(0.85)]})
        l3 = self.l("Où se cache le", -1.5, 42, JAUNE_TITRE)
        self.dit(l3, "Où se cache le")
        l4 = self.l("coefficient", -2.05, 42, JAUNE_TITRE)
        self.dit(l4, "coefficient")
        l5 = self.l("directeur ?", -2.58, 42, JAUNE_TITRE)
        self.dit(l5, "directeur ?")
        self.insister(VGroup(l4, l5), 1.04, 0.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : la droite qui descend ; a = −4 ; la loupe ──
        self.dire("01-image")
        r = Repere((0, 20), (0, 100), 0.14, 0.021, (-1.1, -0.6), gx=(5, 10), gy=(20, 40, 60, 80, 100),
                   nom_x="heures", grille=(5, 20))
        nom_y = T("batterie", 32, CIEL, audit=False).next_to(r.ay.get_end(), RIGHT, buff=0.12)
        depart = r.point(0, 100, ORDO)
        df = r.droite(-4, 100, 0, 15)
        lp = Loupe(P(1.15, 1.12), 1.2, 1.0, 0.2, -4, couleur=DROITE_F)
        vis = lp.viseur(r.p(3, 88), r=0.14)
        lab4 = T("−4", 32, COEF).next_to(lp, DOWN, buff=0.06).set_x(lp.v.get_x())  # 3e relecture : il mordait sur le cadre
        ya, yb, yc = -1.46, -2.02, -2.58
        a1 = self.l("Pleine : 100 %.", ya, 42)
        teinter(a1, {2: ORDO})
        self.poser_gestes(a1, "Batterie pleine : 100 %.", {0: lambda: [FadeIn(r), FadeIn(nom_y)],
                                                            2: lambda: [FadeIn(depart, scale=1.6)]})
        b = self.lx("f(x) = −4x + 100", yb, 50)
        teinter(b, {9: ORDO})
        self.poser_gestes(b, "f de x égale moins 4 x plus 100.", {9: lambda: [Create(df)]}, echelle=1.15)
        self.au("Le coefficient", FadeOut(a1), rt=0.2)
        a2 = self.l("Le coefficient", ya, 42, COEF)
        self.dit(a2, "Le coefficient")
        c1 = self.l("directeur : −4", yc, 42, COEF)
        self.poser_gestes(c1, "directeur, c'est moins 4.",
                          {3: lambda: [*[x.animate.set_color(COEF) for x in b.atomes[5:7]],
                                       Circumscribe(VGroup(*b.atomes[5:7]), color=COEF, buff=0.06)]})
        self.au("Chaque heure", FadeOut(a2), FadeOut(c1), rt=0.2)
        a3 = self.l("Chaque heure :", ya, 42)
        self.poser_gestes(a3, "Chaque heure,", {0: lambda: [Create(vis), FadeIn(lp)], 1: lambda: [GrowArrow(lp.h)]})
        c2 = self.l("descend de 4.", yc, 42)
        teinter(c2, {2: COEF})
        self.poser_gestes(c2, "la droite descend de 4.", {2: lambda: [GrowArrow(lp.v), FadeIn(lab4)]})
        self.au("Le signe moins", FadeOut(a3), FadeOut(c2), rt=0.2)
        a4 = self.l("Le signe moins,", ya, 42, PIEGE)
        self.poser_gestes(a4, "Le signe moins,", {2: lambda: [Indicate(b.atomes[5], color=PIEGE, scale_factor=1.6)]})
        c3 = self.l("c'est la baisse.", yc, 42, JAUNE_TITRE)
        self.poser_gestes(c3, "c'est la baisse.", {4: lambda: [Indicate(df, color=JAUNE_TITRE)]})
        self.insister(c3, 1.06, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) : la plante ──
        pl = plante(0.95)
        self._plante = pl

        def pousser():
            t = pl.tige
            return [t.animate.put_start_and_end_on(t.get_start(), t.get_end() + UP * 0.35),
                    pl.feuilles.animate.shift(UP * 0.35)]

        def avant(sc):
            haut, bas = sc._bande
            pl.move_to(P(-1.2, (haut + bas) / 2))
            sc.lignes_q([(0, "Plante : 5 cm,", "Une plante mesure 5 centimètres,",
                          {0: lambda: [FadeIn(pl, shift=UP * 0.2)]}),
                         (1, "grandit de 2 cm", "et grandit de 2 centimètres", {}),
                         (2, "par semaine.", "par semaine.", {}),
                         (3, "Combien vaut a ?", "Combien vaut a ?", {})])

        def apres(sc):
            sc.place_reponse()
            sc.ph_gestes(0, "Réponse A :", "Réponse A :", {}, premier=True)
            sc.ph_gestes(1, "a, c'est ce qui", "a, c'est ce qui", {})
            sc.ph_gestes(2, "change chaque", "change chaque", {})
            sc.ph_gestes(3, "semaine : 2 cm.", "semaine : 2 centimètres.", {2: pousser})
            sc.ph_gestes(4, "Le 5, c'est", "Le 5, c'est", {1: lambda: [Indicate(pl.pot, color=ORDO, scale_factor=1.2)]})
            sc.ph_gestes(5, "le départ.", "le départ.", {})
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Plante : 5 cm,", "grandit de 2 cm", "par semaine.",
                                                            "Combien vaut a ?"],
                            [Eq("2", 34), Eq("5", 34), Eq("7", 34)], 0,
                            ["Réponse A :", "a, c'est ce qui", "change chaque", "semaine : 2 cm.", "Le 5, c'est",
                             "le départ."],
                            avant_q=avant, autres_r=apres)

        # ── 02 : la question en commentaire, SANS Ti-Margo (17/11), puis la fin commune ──
        self.dire("02-question")
        self._audit_place()
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        tit = T("À toi !", 52, JAUNE_TITRE).move_to(P(0, 2.6))
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1), rt=0.35)
        for s, y, c in (("Au bout", 1.75, WHITE), ("de combien", 1.15, WHITE), ("d'heures", 0.55, WHITE),
                        ("la batterie", -0.05, WHITE), ("est-elle vide ?", -0.65, JAUNE_TITRE)):
            self.dit(self.l(s, y, 40, c), s)
        rap = self.lx("f(x) = −4x + 100", -1.4, 40)
        rap.sans_audit()
        teinter(rap, {5: COEF, 6: COEF, 9: ORDO})
        self.play(FadeIn(rap), run_time=0.3)
        appel_commentaire(self, y=-2.3)
        self.attendre_voix(marge=0.6)
        self._audit_place()
        ecran_fin(self, "short", voix="03-abonne")
