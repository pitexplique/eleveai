# affine_calcul_image_short.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 04, le SHORT ceinture JAUNE (animation Manim).
# « Sous l'eau » : à 40 m, la pression est-elle 4 fois plus forte qu'à 10 m ? p(x) = 0,1x + 1 :
# p(10) = 1 + 1 = 2 bars, p(40) = 4 + 1 = 5 bars, pas 8 : une fonction affine n'est pas proportionnelle.
# Écrans (clés de manim/voix/3e-affine-calcul-image-short.json) :
#   00-accroche : la mer graduée, un plongeur à 10 m et un à 40 m, « 4 fois plus qu'à 10 mètres ? »
#   01-image : p(x) = 0,1x + 1, 1 + 1 = 2 bars, 4 + 1 = 5 bars, « Pas 8 ! », affine : pas proportionnelle
#   01q-question / 01r-reponse : la question-pause (3 s), p(50) ? → A (6) ; B (5) oublie le + 1
#   02-question : l'écran commentaire SANS Ti-Margo, « à quelle profondeur la pression vaut-elle 3,5 bars ? »
#                 (réponse : 25 m)
#   03-abonne : la fin commune (manim/fin_commune.py)
# Lettre juste : 01q → A. Métier : Samir, moniteur de plongée (la paysage).
# Code couleur : x bleu ; a orange ; b violet ; juste vert ; piège rouge.
# Voix : manim/voix/3e-affine-calcul-image-short.json (validée) ; marques : affine_calcul_image_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/3e/affine_calcul_image_short.py AffineCalculImageShort3e --media_dir manim/scripts/3e/media-affine-04s-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/affine_calcul_image_short.py AffineCalculImageShort3e -o eleveai-maths-3e-affine-calcul-image-short --media_dir manim/scripts/3e/media-affine-04s
# Sortie : manim/sorties/3e/maths/fonctions-affines/04-calcul-image/eleveai-maths-3e-affine-calcul-image-short.mp4

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS 4e et ses outils communs
sys.path.insert(0, str(ICI.parent / "seconde"))
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from ident_developper import X  # noqa: E402
from ident_factoriser_short import IdentFactoriserShort3e  # noqa: E402
from affine_calcul_image import A_COUL, B_COUL, Mer, Plongeur, bleus, fonction  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402,F401
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

PAROLE["0"] = "0"


class AffineCalculImageShort3e(IdentFactoriserShort3e):
    nom_voix = "3e-affine-calcul-image-short"
    fichier_marques = "affine_calcul_image_short_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "jaune"

    def lb(self, e, y, maxw=4.05):
        """Une ligne centrée en y, bornée à maxw (signale si elle rétrécit)."""
        if e.width > maxw:
            print(f"RETRECI « {e.s} » {e.width:.2f} > {maxw:.2f} (× {maxw / e.width:.2f})", flush=True)
            e.scale_to_fit_width(maxw)
        return e.move_to(P(0, y))

    @staticmethod
    def _fs(m):
        """La taille effective (font_size × échelle) du premier texte de m."""
        for f in m.get_family():
            if isinstance(f, Text) and getattr(f, "original_text", "").strip():
                return f.font_size
        return 36.0

    def _disposer_q(self, question, choix, phrase):
        """2e relecture -ql (22/11) : énoncé à 38 pt (deux lignes), cartes tassées (contenu à 38 pt), puis
        « Mets pause, » / « et choisis ! » sur DEUX lignes à 33 pt, bas ≥ −2,45 (Ti-Margo : haut −2,92)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        dy = 1.95 - tete.get_y()
        tete.shift(UP * dy)
        rebours.shift(UP * dy)
        for ligne in q:
            ligne.scale(38 / self._fs(ligne))
            if ligne.width > 4.0:
                print(f"RETRECI énoncé × {4.0 / ligne.width:.2f}", flush=True)
                ligne.scale_to_fit_width(4.0)
        q.arrange(DOWN, buff=0.08).next_to(tete, DOWN, buff=0.14).set_x(0)
        for c in cartes:
            cadre, dedans = c[0], c[1]
            dedans.scale(38 / self._fs(dedans[1]), about_point=dedans.get_left())
            cadre.stretch_to_fit_height(max(0.54, dedans.height + 0.06))
        # la coche se pose à 0,33 du bord droit : le nombre en reste à plus de 0,95 (sinon il rétrécit)
        larg = max(2.3, max(c[1].get_right()[0] - c[0].get_left()[0] for c in cartes) + 1.1)
        for c in cartes:
            c[0].stretch_to_fit_width(larg, about_edge=LEFT)
            c[1].set_y(c[0].get_y())
        cartes.arrange(DOWN, buff=0.08, aligned_edge=LEFT).next_to(q, DOWN, buff=0.14).set_x(0)
        neuf = VGroup(T("Mets pause,", 33, ORANGE_RETENUE, audit=False),
                      T("et choisis !", 33, ORANGE_RETENUE, audit=False)).arrange(DOWN, buff=0.04)
        for f in neuf.get_family():
            f.sans_synchro = True
        neuf.next_to(cartes, DOWN, buff=0.1).set_x(0)
        ph.next_to(cartes, DOWN, buff=0.15).set_x(0)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE badge bas {self._badge.get_bottom()[1]:.2f} tete {tete.get_top()[1]:.2f}/"
                  f"{tete.get_bottom()[1]:.2f} q {q.get_top()[1]:.2f}/{q.get_bottom()[1]:.2f} "
                  f"({self._fs(q[0]):.0f} pt) cartes {cartes.get_top()[1]:.2f}/{cartes.get_bottom()[1]:.2f} "
                  f"({self._fs(cartes[0][1][1]):.0f} pt) pause bas {neuf.get_bottom()[1]:.2f} "
                  f"({self._fs(neuf):.0f} pt) ; Ti-Margo haut {self._margo.get_top()[1]:.2f}", flush=True)
        return tete, q, cartes, neuf, rebours, ph

    @staticmethod
    def etiquette_bars(s, plongeur):
        """« 2 bars » / « 5 bars » à 32 pt, sur un petit cadre noir semi-opaque (lisible sur l'eau ET sur le
        sable beige), à droite du plongeur."""
        t = T(s, 32, VERT_OK, audit=False)
        fond = RoundedRectangle(width=t.width + 0.14, height=t.height + 0.1, corner_radius=0.06, stroke_width=0,
                                fill_color="#0b1220", fill_opacity=0.8).move_to(t)
        return VGroup(fond, t).next_to(plongeur, RIGHT, buff=0.08)

    def place_reponse(self):
        """2e relecture -ql : après le ✓, les cartes s'effacent et la réponse prend leur place, à 36 pt
        EFFECTIFS. Les lignes repères sont refaites en X à 36 pt : ph_eq y cale ses E par la largeur."""
        cartes, ph = self.cartes_q, self.ph_q
        haut = cartes[0].get_top()[1] - 0.05
        self.play(FadeOut(cartes), FadeOut(self.mobjects[-1]), run_time=0.25)
        ph.submobjects = [X(l.original_text, 36, audit=False) for l in ph.submobjects]
        ph.arrange(DOWN, buff=0.18)
        if ph.width > 4.1:
            print(f"RETRECI réponse × {4.1 / ph.width:.2f}", flush=True)
            ph.scale_to_fit_width(4.1)
        ph.next_to(P(0, haut), DOWN, buff=0).set_x(0)
        if os.environ.get("AUDIT") == "1":
            print(f"TAILLE-REPONSE {self._fs(ph[0]):.0f} pt, haut {ph.get_top()[1]:.2f}, bas "
                  f"{ph.get_bottom()[1]:.2f}, largeur {ph.width:.2f}", flush=True)

    def ligne_qi(self, s, phrase, fonc=False, couleur=JAUNE_TITRE):
        """Dans avant_q : la première ligne de question qui reste devient une expression, posée au mot."""
        ref = self.q_q[0]
        e = fonction(s, 34) if fonc else X(s, 34, couleur)
        e.scale_to_fit_height(ref.height).move_to(ref)
        if e.width > 3.8:
            e.scale_to_fit_width(3.8)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase)
        return e

    def construct(self):
        margo = self._margo = self.margo_bas()
        titre, badge = self.entete_short("Sous l'eau", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        self._badge = badge
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : 4 fois plus forte ? ──
        self.dire("00-accroche")
        # relecture -ql : la mer à ~85 % de la largeur (graduations comprises), la formule au-dessus
        mer = Mer(x0=-0.93, x1=2.05, y_surf=1.5, k=0.049, dmax=40, fs=28)  # 3e relecture : k 0,045, « 0 m … 40 m » collés ; 4e : 0,049, « 1 + 1 » touchait le sable
        mer.remove(mer.nom)
        p10 = Plongeur(0.45).move_to(mer.place(10, -0.6))
        p40 = Plongeur(0.45).move_to(mer.place(40, -0.6))
        p40.remove(p40.bulles)
        q40 = T("?", 40, JAUNE_TITRE, audit=False, gras=True).next_to(p40, RIGHT, buff=0.12)
        l1 = self.lb(X("À 40 mètres :", 46), -1.0)
        self.poser_gestes(l1, "À 40 mètres", {0: lambda: [FadeIn(titre), FadeIn(mer)],
                                               1: lambda: [FadeIn(p40, shift=DOWN * 0.3)]})
        l2 = self.lb(X("4 fois plus forte", 46), -1.62)
        self.poser_gestes(l2, "4 fois plus forte", {0: lambda: [FadeIn(q40, scale=1.3)]})
        l3 = self.lb(X("qu'à 10 mètres ?", 46, JAUNE_TITRE), -2.24)
        self.poser_gestes(l3, "qu'à 10 mètres ?", {3: lambda: [FadeIn(p10, shift=DOWN * 0.3)]})
        self.insister(VGroup(l2, l3), 1.04, 0.15)
        self.attendre_voix(marge=0.3)
        self.play(FadeOut(VGroup(l1, l2, l3, q40)), run_time=0.25)

        # ── 01 : p(10) = 2, p(40) = 5, pas 8 ──
        self.dire("01-image")
        e = self.lb(fonction("p(x) = 0,1x + 1", 48), 1.95)
        self.dire_eq(e, "p de x égale 0,1 x plus 1.", echelle=1.15)
        c1 = self.lb(X("1 + 1 = 2 bars", 46), -1.12)
        c1.atomes[2].set_color(B_COUL)
        for a in c1.atomes[4:]:
            a.set_color(VERT_OK)
        self.au("À 10 mètres", Indicate(p10, color=JAUNE_TITRE, scale_factor=1.3), rt=0.4)
        self.dire_eq(c1, "1, plus 1 : 2 bars.", echelle=1.15)
        b2 = self.etiquette_bars("2 bars", p10)
        self.play(FadeIn(b2), run_time=0.15)
        c2 = self.lb(X("4 + 1 = 5 bars", 46), -1.64)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE mer bas {mer.get_bottom()[1]:.2f} ; c1 haut {c1.get_top()[1]:.2f} ; "
                  f"c1 bas {c1.get_bottom()[1]:.2f} c2 haut {c2.get_top()[1]:.2f}", flush=True)
        c2.atomes[2].set_color(B_COUL)
        for a in c2.atomes[4:]:
            a.set_color(VERT_OK)
        self.au("À 40 mètres", Indicate(p40, color=JAUNE_TITRE, scale_factor=1.3), rt=0.4)
        self.dire_eq(c2, "4, plus 1 : 5 bars.", echelle=1.15)
        b5 = self.etiquette_bars("5 bars", p40)
        self.play(FadeIn(b5), run_time=0.15)
        # 2e relecture -ql : « Pas 8 ! » mordait sur « 5 bars » : au milieu de l'écart entre « 2 bars » et
        # « 5 bars », à 36 pt, apparition et Wiggle sans grossir (du jour des deux côtés à chaque image)
        pas8 = X("Pas 8 !", 36, PIEGE)
        fond8 = RoundedRectangle(width=pas8.width + 0.24, height=pas8.height + 0.16, corner_radius=0.08,
                                 stroke_color=PIEGE, stroke_width=3, fill_color="#0b1220", fill_opacity=0.92)
        fond8.move_to(P(1.0, (b2.get_bottom()[1] + b5.get_top()[1]) / 2))
        pas8.move_to(fond8)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE pas8 : {b2.get_bottom()[1] - fond8.get_top()[1]:.2f} sous « 2 bars », "
                  f"{fond8.get_bottom()[1] - b5.get_top()[1]:.2f} au-dessus de « 5 bars » "
                  f"({self._fs(pas8):.0f} pt), droite {fond8.get_right()[0]:.2f} ; étiquettes "
                  f"{self._fs(b2):.0f} pt, droite {max(b2.get_right()[0], b5.get_right()[0]):.2f}, à "
                  f"{b2.get_left()[0] - p10.get_right()[0]:.2f} / {b5.get_left()[0] - p40.get_right()[0]:.2f} "
                  f"des plongeurs", flush=True)
        self.dire_eq(pas8, "Pas 8 !", avec=[FadeIn(fond8)], echelle=1.0)
        self.play(Wiggle(VGroup(fond8, pas8), scale_value=1.0, rotation_angle=0.03 * TAU), run_time=0.4)
        f1 = self.lb(X("Affine : pas", 40, CIEL), -2.16)
        self.dire_eq(f1, "affine n'est pas", echelle=1.0)
        f2 = self.lb(X("proportionnelle.", 40, CIEL), -2.6)  # 3e relecture : à 44, il touchait le bord droit
        self.dire_eq(f2, "proportionnelle.", echelle=1.0)
        self.insister(VGroup(f1, f2), 1.04, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.ligne_qi("p(x) = 0,1x + 1", "Avec p de x égale 0,1 x plus 1,", fonc=True)
            e2 = sc.ligne_qi("p(50) = ?", "combien vaut p de 50 ?")
            bleus(e2, 2)

        def apres(sc):
            sc.place_reponse()
            sc.ph_eq(0, "Réponse A :", "Réponse A :", premier=True)
            sc.ph_eq(1, "0,1 × 50 = 5.", "0,1 fois 50, c'est 5.")
            sc.ph_eq(2, "Plus 1 : 6 bars.", "Plus 1 : 6 bars.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["p(x) = 0,1x + 1", "p(50) = ?"],
                            [X("6", 34), X("5", 34), X("51", 34)], 0,
                            ["Réponse A :", "0,1 × 50 = 5.", "Plus 1 : 6 bars."],
                            avant_q=avant, autres_r=apres)

        # ── 02 : la question en commentaire, SANS Ti-Margo, puis la fin commune ──
        self.dire("02-question")
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        tit = T("À toi !", 52, JAUNE_TITRE).move_to(P(-0.75, 2.6))
        pl = Plongeur(0.55).next_to(tit, RIGHT, buff=0.5)
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1), FadeIn(pl, shift=DOWN * 0.2), rt=0.35)
        q1 = self.lb(X("À quelle", 44), 1.75)
        self.dit(q1, "À quelle")
        q2 = self.lb(X("profondeur", 44), 1.15)
        self.dit(q2, "profondeur")
        q3 = self.lb(X("la pression", 44), 0.55)
        self.dit(q3, "la pression")
        q4 = self.lb(X("vaut-elle", 44), -0.05)
        self.dit(q4, "vaut-elle")
        q5 = self.lb(X("3,5 bars ?", 60, JAUNE_TITRE), -0.8)
        self.dire_eq(q5, "3,5 bars ?", echelle=1.15)
        appel_commentaire(self, y=-1.85)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="03-abonne")
