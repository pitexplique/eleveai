# affine_probleme_short.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 08, le SHORT ceinture VERTE (animation Manim)
# « Quelle appli choisir ? » : deux applis de trottinette. A : 1 € pour débloquer, puis 20 centimes la minute
# (f(x) = 0,2x + 1) ; B : 30 centimes la minute (g(x) = 0,3x). 5 min : A 2 €, B 1,50 € ; 20 min : A 5 €, B 6 € ;
# les deux droites se croisent (en 10 minutes, 3 €).
# Écrans (clés de manim/voix/3e-affine-probleme-short.json) :
#   00-accroche : la trottinette et les deux applis, « Laquelle est la moins chère ? »
#   01-image    : le repère minutes / euros (droite A bleue, droite B orange), 5 min puis 20 min, le croisement
#   01q / 01r   : QUESTION (3 s) : au bout de combien de minutes le même prix ? réponse C (10 minutes)
#   02-question : écran commentaire SANS Ti-Margo : un trajet de 30 minutes (réponse : A, 7 €)
#   03-abonne   : fin commune (manim/fin_commune.py)
# Lettre de la question : 01q → C.
# Métier de la paysage : Manon, directrice de cinéma.
# Code couleur : x bleu ; a orange ; b violet ; droite A (f) bleue, droite B (g) orange ; croisement jaune ; juste vert.
# Contrôles ajoutés (AUDIT=1) : CHEVAUCHE (texte sur le repère, une droite ou Ti-Margo), PETIT (< 32 pt effectifs),
# RETRECI (ligne réduite pour tenir).
# Voix : manim/voix/3e-affine-probleme-short.json (validée) ; marques : affine_probleme_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/3e/affine_probleme_short.py AffineProblemeShort3e --media_dir manim/scripts/3e/media-affine-08s-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/affine_probleme_short.py AffineProblemeShort3e -o eleveai-maths-3e-affine-probleme-short --media_dir manim/scripts/3e/media-affine-08s
# Sortie : manim/sorties/3e/maths/fonctions-affines/08-probleme/eleveai-maths-3e-affine-probleme-short.mp4

import os
import re
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
from ident_factoriser_short import IdentFactoriserShort3e  # noqa: E402
from affine_expression import Repere  # noqa: E402
from affine_ordonnee_origine import fleche_lecture  # noqa: E402
from affine_probleme import (CROIX, DROITE_F, DROITE_G, _Controle, colf, etiq, lecture_image,  # noqa: E402
                             teinte)
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

PAROLE["0"] = "0"
PAROLE["€"] = "euros"


def trottinette(s=1.0, couleur="#22c55e"):
    """Une trottinette électrique : plateau, deux roues, colonne, guidon, batterie."""
    roues = VGroup(*[VGroup(Circle(radius=0.24, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                                   stroke_width=5),
                            Dot(radius=0.06, color="#9ca3af")).move_to(P(x, 0)) for x in (-0.85, 0.85)])
    plateau = RoundedRectangle(width=1.55, height=0.16, corner_radius=0.07, fill_color=couleur, fill_opacity=1,
                               stroke_width=0).move_to(P(-0.05, 0.22))
    colonne = Line(P(0.85, 0.05), P(0.62, 1.55), color="#e5e7eb", stroke_width=8)
    guidon = Line(P(0.4, 1.58), P(0.9, 1.52), color="#e5e7eb", stroke_width=8)
    batt = RoundedRectangle(width=0.5, height=0.12, corner_radius=0.05, fill_color="#facc15", fill_opacity=1,
                            stroke_width=0).move_to(P(-0.1, 0.36))
    return VGroup(colonne, guidon, plateau, batt, roues).scale(s)


def appli(couleur, lettre, h=0.95):
    """L'icône d'une appli : un carré arrondi de la couleur de sa droite, sa lettre."""
    c = RoundedRectangle(width=h, height=h, corner_radius=0.2, fill_color=couleur, fill_opacity=1,
                         stroke_color=WHITE, stroke_width=3)
    t = T(lettre, 48, WHITE, audit=False, gras=True).move_to(c)
    return VGroup(c, t)


class AffineProblemeShort3e(_Controle, IdentFactoriserShort3e):
    nom_voix = "3e-affine-probleme-short"
    fichier_marques = "affine_probleme_short_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "verte"

    def l2(self, s, y, fs=40, c=WHITE, lettres="x", maxw=3.9):
        """Une ligne centrée, composée à la plus grande taille ≤ fs qui tient (jamais sous 32 : signalé)."""
        e = E(s, fs, c, lettres=lettres)
        if e.width > maxw:
            fs2 = int(fs * maxw / e.width)
            if fs2 < 32 and os.environ.get("AUDIT") == "1":
                print(f"RETRECI « {s} » {fs2} pt", flush=True)
            e = E(s, max(fs2, 32), c, lettres=lettres)
            if e.width > maxw:
                e.scale_to_fit_width(maxw)
        return e.move_to(P(0, y))

    def _plan_eq(self, e, debut, fin, sauf=()):
        """Celui du module commun, mais « € » se cale sur « euro » OU « euros » (la voix dit « 1 euro »)."""
        voix, cur = self._texte_voix, debut
        plan = []
        for a in e.atomes:
            if any(a is x for x in sauf):
                continue
            mot = PAROLE.get(a.original_text, a.original_text)
            motif = r"euros?" if a.original_text == "€" else re.escape(mot)
            m = re.compile(r"(?<![\w,])" + motif + r"(?![\w])", re.I).search(voix, cur, fin)
            if m is None:
                plan.append((None, a))
            else:
                plan.append((m.start(), a))
                cur = m.end()
        lots = []
        for pos, a in plan:
            if pos is not None:
                lots.append([pos, [a]])
            elif a.original_text in ")],.:;?!" and lots:
                lots[-1][1].append(a)
            else:
                lots.append([None, [a]])
        for k in range(len(lots) - 2, -1, -1):
            if lots[k][0] is None:
                lots[k + 1][1] = lots[k][1] + lots[k + 1][1]
                lots[k][1] = []
        lots = [lot for lot in lots if lot[1] and lot[0] is not None]
        if os.environ.get("AUDIT") == "1":
            poses = [a for _, at in lots for a in at]
            for a in e.atomes:
                if not any(a is b for b in poses) and not any(a is b for b in sauf):
                    print(f"PERDU « {e.s} » : {a.original_text}", flush=True)
        return lots

    def _disposer_q(self, question, choix, phrase):
        """Énoncé à ~40 pt, cartes larges de 3,85 (lettre 34 pt, choix 38 pt), « Mets pause, et choisis ! »
        sur deux lignes à 36 pt : tout reste au-dessus de Ti-Margo (y > −2,85)."""
        tete, q, cartes, pause, rebours, ph = IdentDevelopperShort4e._disposer_q(self, question, choix, phrase)
        if len(q.submobjects):
            tq = [f for f in q[0].get_family() if isinstance(f, Text)]
            q.scale(37 / tq[0].font_size)
            if q.width > 3.9:
                q.scale_to_fit_width(3.9)
            q.next_to(tete, DOWN, buff=0.08).set_x(0)
        larg = 3.9
        for c in cartes:
            cadre, dedans = c[0], c[1]
            lettre, corps = dedans[0], dedans[1]
            tl = [f for f in lettre.get_family() if isinstance(f, Text)]
            if tl:
                lettre.scale(33 / tl[0].font_size)
            tc = [f for f in corps.get_family() if isinstance(f, Text)]
            if tc:
                corps.scale(37 / tc[0].font_size)
            corps.next_to(lettre, RIGHT, buff=0.25)
            corps.shift(UP * (lettre.get_center()[1] - corps.get_center()[1]))
            if dedans.width > larg - 1.15:
                dedans.scale_to_fit_width(larg - 1.15)
            cadre.stretch_to_fit_width(larg)
            cadre.stretch_to_fit_height(max(0.6, dedans.height + 0.1))
            cadre.move_to(P(0, cadre.get_y()))
            dedans.next_to(cadre.get_left(), RIGHT, buff=0.18).set_y(cadre.get_y())
        cartes.arrange(DOWN, buff=0.08).next_to(q if len(q.submobjects) else tete, DOWN, buff=0.12).set_x(0)
        coul = [f for f in pause.get_family() if isinstance(f, Text)]
        coul = coul[0].get_color() if coul else ORANGE_RETENUE
        pause = VGroup(T("Mets pause,", 33, coul, audit=False), T("et choisis !", 33, coul, audit=False))
        for f in pause.get_family():  # 2e relecture -ql : sans ça, la phrase n'apparaissait pas
            f.sans_synchro = True
        pause.arrange(DOWN, buff=0.04).next_to(cartes, DOWN, buff=0.08).set_x(0)
        ph.arrange(DOWN, buff=0.12).next_to(cartes, DOWN, buff=0.15).set_x(0)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE tete {tete.get_bottom()[1]:.2f} q {q.get_bottom()[1] if len(q) else 0:.2f} "
                  f"{self._fs(q):.0f} pt ; cartes {cartes.get_bottom()[1]:.2f} {self._fs(cartes[0][1][1]):.0f} pt ; "
                  f"pause y[{pause.get_bottom()[1]:.2f}, {pause.get_top()[1]:.2f}] {self._fs(pause):.0f} pt "
                  f"(bas ≥ −2,45)", flush=True)
        self._tete_q = tete
        return tete, q, cartes, pause, rebours, ph

    @staticmethod
    def _fs(m):
        for f in m.get_family():
            if isinstance(f, Text) and getattr(f, "original_text", "").strip():
                return f.font_size
        return 36.0

    def place_reponse(self):
        """Après le ✓, les cartes ET l'énoncé s'effacent : la réponse prend toute la colonne, à 36 pt et plus."""
        cartes, ph = self.cartes_q, self.ph_q
        haut = self._tete_q.get_bottom()[1] - 0.3
        self.play(FadeOut(cartes), FadeOut(self.mobjects[-1]), FadeOut(self.q_q), run_time=0.25)
        ph.arrange(DOWN, buff=0.2)
        k = min(0.62 / max(l.height for l in ph), 3.9 / ph.width, (haut + 2.8) / ph.height)
        ph.scale(k).next_to(P(0, haut), DOWN, buff=0).set_x(0)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Quelle appli ?", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        self.zone(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        tr = trottinette(0.8).move_to(P(0, 1.45))
        aa = appli(DROITE_F, "A", 0.85).move_to(P(-1.6, 1.5))
        ab = appli(DROITE_G, "B", 0.85).move_to(P(1.6, 1.5))
        self.zone(tr, aa, ab)
        l1 = self.l2("Deux applis", 0.2, 44)
        self.poser_gestes(l1, "Deux applis", {0: lambda: [FadeIn(titre)], 1: lambda: [FadeIn(aa, scale=0.6),
                                                                                     FadeIn(ab, scale=0.6)]})
        l2 = self.l2("de trottinette.", -0.36, 40)
        self.poser_gestes(l2, "de trottinette.", {1: lambda: [FadeIn(tr, shift=RIGHT * 0.5)]})
        # 2e relecture -ql : la 2e ligne sortait plus petite : les deux à la même taille
        l4 = self.l2("la moins chère ?", -1.53, 42, JAUNE_TITRE)
        l3 = self.l2("Laquelle est", -0.98, 42, JAUNE_TITRE)
        l3.scale(self._fs(l4) / self._fs(l3)).move_to(P(0, -0.98))
        if os.environ.get("AUDIT") == "1":
            print(f"TAILLE 00 « Laquelle est » {self._fs(l3):.1f} pt / « la moins chère ? » {self._fs(l4):.1f} pt",
                  flush=True)
        self.dit(l3, "Laquelle est")
        self.dit(l4, "la moins chère ?")
        l5 = self.l2("Ça dépend", -2.1, 40, CIEL)
        self.dit(l5, "Ça dépend")
        l6 = self.l2("de ton trajet !", -2.6, 38, CIEL)
        self.dit(l6, "de ton trajet !")
        self.play(tr.animate.shift(RIGHT * 0.25), run_time=0.3)
        self.insister(l6, 1.06, 0.15)
        self.attendre_voix(marge=0.3)
        self.play(FadeOut(VGroup(l1, l2, l3, l4, l5, l6, tr, aa, ab)), run_time=0.25)

        # ── 01 : le repère, 5 minutes, 20 minutes, le croisement ──
        self.dire("01-image")
        haut = badge.get_bottom()[1] - 0.3
        uy = 0.24
        o_y = haut - 0.45 - 7 * uy
        # 2e relecture -ql : avant la question, seulement 0, 5 et 20 en x (10 et 15 laissaient lire le croisement)
        # 3e relecture -ql : « minutes » tombait sur la grille → « min » à droite de la flèche, hors grille
        R = Repere(P(-1.7, o_y), 0.115, uy, (0, 21), (0, 7), xlab=(5, 20), ylab=(2, 4, 6),
                   xticks=(5, 20), yticks=(1, 2, 3, 4, 5, 6, 7), nom_x="min", nom_y="euros")
        R.nx.next_to(R.ax.get_end(), RIGHT, buff=0.07)
        R.ny.next_to(R.ay.get_end(), RIGHT, buff=0.12).align_to(R.ay.get_end(), UP)
        if os.environ.get("AUDIT") == "1":
            print(f"REPERE largeur {R.width:.2f} / {config.frame_width:.2f}, haut {R.get_top()[1]:.2f}, "
                  f"badge {badge.get_bottom()[1]:.2f}, bas {R.get_bottom()[1]:.2f}", flush=True)
        dA = R.droite(0.2, 1, 0, 20, couleur=DROITE_F)
        dB = R.droite(0.3, 0, 0, 20, couleur=DROITE_G)
        eA = etiq("A", DROITE_F, 30).next_to(R.p(20, 5), RIGHT, buff=0.08).shift(DOWN * 0.08)
        eB = etiq("B", DROITE_G, 30).next_to(R.p(20, 6), RIGHT, buff=0.08)
        self.zone(R, dA, dB, eA, eB)
        ys = [-0.86, -1.44, -2.02, -2.6]
        a1 = self.l2("Appli A : 1 €", ys[0], 40)
        teinte(a1, DROITE_F, 0, 1)
        pA = R.point(0, 1, "#a78bfa", 0.09)
        self.zone(pA)
        self.poser_gestes(a1, "Appli A : 1 euro", {0: lambda: [FadeIn(R)], 3: lambda: [GrowFromCenter(pA)]})
        a2 = self.l2("pour débloquer,", ys[1], 42)
        self.dit(a2, "pour débloquer,")
        a3 = self.l2("puis 20 centimes", ys[2], 42)
        self.dit(a3, "puis 20 centimes")
        a4 = self.l2("la minute.", ys[3], 42)
        self.poser_gestes(a4, "la minute.", {1: lambda: [Create(dA), FadeIn(eA)]}, rt=0.3)
        self.play(FadeOut(VGroup(a1, a2, a3, a4)), run_time=0.2)
        b1 = self.l2("Appli B :", ys[0], 40)
        teinte(b1, DROITE_G, 0, 1)
        self.dit(b1, "Appli B :")
        b2 = self.l2("30 centimes", ys[1], 42)
        self.dit(b2, "30 centimes")
        b3 = self.l2("la minute,", ys[2], 42)
        self.poser_gestes(b3, "la minute,", {1: lambda: [Create(dB), FadeIn(eB)]}, rt=0.3)
        b4 = self.l2("sans frais.", ys[3], 42)
        self.dit(b4, "sans frais.")
        self.play(FadeOut(VGroup(b1, b2, b3, b4)), run_time=0.2)
        # 5 minutes
        p5A, p5B = R.point(5, 2, DROITE_F, 0.08), R.point(5, 1.5, DROITE_G, 0.08)
        l5A, l5B = lecture_image(R, 5, 2), lecture_image(R, 5, 1.5)
        self.zone(p5A, p5B, l5A, l5B)
        c1 = self.l2("5 minutes :", ys[0], 40)
        teinte(c1, INCONNUE, 0)
        self.dit(c1, "5 minutes :")
        c2 = self.l2("A coûte 2 €,", ys[1], 42)
        teinte(c2, DROITE_F, 0)
        self.poser_gestes(c2, "A coûte 2 euros,", {2: lambda: [Create(l5A), GrowFromCenter(p5A)]})
        c3 = self.l2("B coûte 1 € 50.", ys[2], 42)
        teinte(c3, DROITE_G, 0)
        self.poser_gestes(c3, "B coûte 1 euro 50.", {2: lambda: [Create(l5B), GrowFromCenter(p5B)]})
        c4 = self.l2("B gagne.", ys[3], 40, VERT_OK)
        self.poser_gestes(c4, "B gagne.", {1: lambda: [Indicate(p5B, color=VERT_OK, scale_factor=2.2)]})
        self.play(FadeOut(VGroup(c1, c2, c3, c4, l5A, l5B)), run_time=0.2)
        # 20 minutes
        p20A, p20B = R.point(20, 5, DROITE_F, 0.08), R.point(20, 6, DROITE_G, 0.08)
        l20A, l20B = lecture_image(R, 20, 5), lecture_image(R, 20, 6)
        self.zone(p20A, p20B, l20A, l20B)
        d1 = self.l2("20 minutes :", ys[0], 40)
        teinte(d1, INCONNUE, 0)
        self.dit(d1, "20 minutes :")
        d2 = self.l2("A coûte 5 €,", ys[1], 42)
        teinte(d2, DROITE_F, 0)
        self.poser_gestes(d2, "A coûte 5 euros,", {2: lambda: [Create(l20A), GrowFromCenter(p20A)]})
        d3 = self.l2("B coûte 6 €.", ys[2], 42)
        teinte(d3, DROITE_G, 0)
        self.poser_gestes(d3, "B coûte 6 euros.", {2: lambda: [Create(l20B), GrowFromCenter(p20B)]})
        d4 = self.l2("A gagne !", ys[3], 40, VERT_OK)
        self.poser_gestes(d4, "A gagne !", {1: lambda: [Indicate(p20A, color=VERT_OK, scale_factor=2.2)]})
        # « se croisent » : les droites s'allument, le croisement n'est PAS marqué (c'est la question)
        self.au("Les deux droites", FadeOut(VGroup(d1, d2, d3, d4, l20A, l20B, p5A, p5B, p20A, p20B)), rt=0.2)
        e1 = self.l2("Les deux droites", ys[1], 40)
        self.dit(e1, "Les deux droites")
        e2 = self.l2("se croisent !", ys[2], 44, CROIX)
        self.poser_gestes(e2, "se croisent.", {0: lambda: [Indicate(VGroup(dA, dB), color=CROIX, scale_factor=1.0)]},
                          rt=0.3)
        self.insister(e2, 1.06, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)
        self._zones = [badge]

        # ── 01q : la question-pause (3 s), réponse C ──
        def apres(sc):
            sc.place_reponse()
            sc.ph_eq(0, "Réponse C :", "Réponse C :", premier=True)
            r1 = sc.ph_eq(1, "0,2x + 1 = 0,3x", "0,2 x plus 1 égale 0,3 x.", lettres="x")
            r2 = sc.ph_eq(2, "Donc 0,1x = 1 :", "Donc 0,1 x égale 1 :", lettres="x")
            r3 = sc.ph_eq(3, "x = 10.", "x vaut 10.", lettres="x")
            # le repère revient (avec 10 et 15), le point (10 ; 3) et ses pointillés apparaissent
            ph0 = sc.ph_q[0]
            uy2 = 0.19
            oy2 = ph0.get_bottom()[1] - 0.15 - 7 * uy2 - 0.4
            R2 = Repere(P(-1.7, oy2), 0.115, uy2, (0, 21), (0, 7), xlab=(5, 10, 15, 20), ylab=(2, 4, 6),
                        xticks=(5, 10, 15, 20), yticks=(1, 2, 3, 4, 5, 6, 7), nom_x="min", nom_y="euros")
            R2.nx.next_to(R2.ax.get_end(), RIGHT, buff=0.07)
            R2.ny.next_to(R2.ay.get_end(), RIGHT, buff=0.12).align_to(R2.ay.get_end(), UP)
            dA2 = R2.droite(0.2, 1, 0, 20, couleur=DROITE_F)
            dB2 = R2.droite(0.3, 0, 0, 20, couleur=DROITE_G)
            eA2 = etiq("A", DROITE_F, 30).next_to(R2.p(20, 5), RIGHT, buff=0.08).shift(DOWN * 0.08)
            eB2 = etiq("B", DROITE_G, 30).next_to(R2.p(20, 6), RIGHT, buff=0.08)
            pc = Dot(R2.p(10, 3), radius=0.1, color=CROIX).set_z_index(7)
            fx = fleche_lecture(R2.p(10, 3), R2.p(10, 0), CROIX).set_z_index(2)
            fy = fleche_lecture(R2.p(10, 3), R2.p(0, 3), CROIX).set_z_index(2)
            sc.zone(R2, dA2, dB2, eA2, eB2, pc, fx, fy)
            sc.au("Pour 10", FadeOut(VGroup(r1, r2, r3)), FadeIn(R2), Create(dA2), Create(dB2), FadeIn(eA2),
                  FadeIn(eB2), rt=0.3)
            f1 = sc.l2("10 minutes, 3 €", -1.68, 36, VERT_OK)
            teinte(f1, INCONNUE, 0)
            sc.poser_gestes(f1, "10 minutes, 3 euros", {0: lambda: [GrowFromCenter(pc), Create(fx)],
                                                         3: lambda: [Create(fy), Flash(pc, color=CROIX, line_length=0.2)]})
            f2 = sc.l2("des deux côtés.", -2.18, 36, VERT_OK)
            sc.dit(f2, "des deux côtés.")
            if os.environ.get("AUDIT") == "1":
                print(f"MISE-EN-PAGE 01r repère y[{R2.get_bottom()[1]:.2f}, {R2.get_top()[1]:.2f}] "
                      f"x[{R2.get_left()[0]:.2f}, {eA2.get_right()[0]:.2f}] ; réponse 0 bas {ph0.get_bottom()[1]:.2f} ; "
                      f"lignes {sc._fs(f1):.0f}/{sc._fs(f2):.0f} pt, bas {f2.get_bottom()[1]:.2f}, "
                      f"x[{f2.get_left()[0]:.2f}, {f2.get_right()[0]:.2f}] ", flush=True)
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Au bout de…", "coûtent pareil ?"],
                            [T("5 min", 34), T("20 min", 34), T("10 min", 34)], 2,
                            ["Réponse C :", "0,2x + 1 = 0,3x", "Donc 0,1x = 1 :", "x = 10."],
                            autres_r=apres, mot_q="Au bout de")

        # ── 02 : la question en commentaire, SANS Ti-Margo (17/11), puis la fin commune ──
        self.dire("02-question")
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        self._zones = []
        tit = T("À toi !", 56, JAUNE_TITRE).move_to(P(-0.75, 2.7))
        tr2 = trottinette(0.5).next_to(tit, RIGHT, buff=0.3)
        self.zone(tr2)
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1), FadeIn(tr2, shift=RIGHT * 0.3), rt=0.35)
        q1 = self.l2("Pour un trajet", 1.85, 44)
        self.dit(q1, "Pour un trajet")
        q2 = self.l2("de 30 minutes,", 1.3, 48)
        teinte(q2, INCONNUE, 1)
        self.dit(q2, "de 30 minutes,")
        q3 = self.l2("quelle appli", 0.6, 44, CIEL)
        self.dit(q3, "quelle appli")
        q4 = self.l2("choisis-tu,", 0.05, 44, CIEL)
        self.dit(q4, "choisis-tu,")
        q5 = self.l2("et combien", -0.55, 44, CIEL)
        self.dit(q5, "et combien")
        q6 = self.l2("paies-tu ?", -1.1, 44, CIEL)
        self.dit(q6, "paies-tu ?")
        appel_commentaire(self, y=-1.95)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="03-abonne")
