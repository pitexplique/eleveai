# affine_graphique_short.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 06, le SHORT ceinture ORANGE (animation Manim).
# « Forfait internet » : 20 gigas, 2 par jour ; la droite part de 20 et descend de 2 par jour ; elle touche l'axe
# horizontal à 10 : le forfait est vide au bout de 10 jours.
# Écrans (clés de manim/voix/3e-affine-graphique-short.json) :
#   00-accroche   le repère jours / gigas, la droite qui descend, le téléphone et sa jauge
#   01-image      20 gigas (point violet sur l'axe vertical), − 2 par jour (le pas), vide à 10 jours
#   01q / 01r     QUESTION (3 s) : combien reste-t-il après 4 jours ? → C (12 gigas) ; lecture en pointillés
#                 axe horizontal → droite → axe vertical
#   02-question   l'écran commentaire SANS Ti-Margo : 30 gigas, 2 par jour, vide au bout de combien de jours ?
#                 (réponse : 15 jours)
#   03-abonne     la fin commune (manim/fin_commune.py)
# Lettre juste : 01q → C. Métier de la paysage : Clara, community manager.
# Code couleur : x bleu ; a (− 2 par jour) orange ; b (20 gigas) violet ; droite bleue ; juste vert.
# Voix : manim/voix/3e-affine-graphique-short.json (validée) ; marques : affine_graphique_short_marques.json.
# Contrôle : AUDIT=1 imprime aussi « CHEVAUCHE » (texte sur le repère ou sur Ti-Margo, étiquette sur la droite).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/3e/affine_graphique_short.py AffineGraphiqueShort3e --media_dir manim/scripts/3e/media-affine-06s-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/affine_graphique_short.py AffineGraphiqueShort3e -o eleveai-maths-3e-affine-graphique-short --media_dir manim/scripts/3e/media-affine-06s
# Sortie : manim/sorties/3e/maths/fonctions-affines/06-graphique/eleveai-maths-3e-affine-graphique-short.mp4

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
from ident_developper_short import IdentDevelopperShort4e  # noqa: E402
from ident_factoriser_short import IdentFactoriserShort3e  # noqa: E402
from affine_graphique import COUL_A, COUL_B, GRAD, Repere, col, taille, AffineGraphique3e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402,F401
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

PAROLE["0"] = "0"


def telephone_data(s=1.0):
    """Un téléphone et sa jauge de données (4 barres, les deux du bas encore pleines)."""
    coque = RoundedRectangle(width=0.62, height=1.05, corner_radius=0.1, fill_color="#0f172a", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3)
    ecran = RoundedRectangle(width=0.5, height=0.85, corner_radius=0.06, fill_color="#1e293b", fill_opacity=1,
                             stroke_width=0).move_to(coque)
    barres = VGroup(*[RoundedRectangle(width=0.34, height=0.13, corner_radius=0.03, stroke_color="#38bdf8",
                                       stroke_width=2, fill_color="#38bdf8", fill_opacity=1 if k < 2 else 0)
                      for k in range(4)]).arrange(UP, buff=0.05).move_to(ecran)
    g = VGroup(coque, ecran, barres).scale(s)
    g.barres = barres
    return g


class AffineGraphiqueShort3e(IdentFactoriserShort3e):
    nom_voix = "3e-affine-graphique-short"
    fichier_marques = "affine_graphique_short_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "orange"

    verifier = AffineGraphique3e.verifier

    def lb(self, s, y, fs=36, c=WHITE, maxw=3.95, x=0.0, **cols):
        """Une ligne centrée en (x, y), bornée à maxw (signale si elle rétrécit), colorée par indices."""
        e = X(s, fs, c)
        if e.width > maxw:
            print(f"RETRECI « {s} » {e.width:.2f} > {maxw:.2f} (× {maxw / e.width:.2f})", flush=True)
            e.scale_to_fit_width(maxw)
        return col(e.move_to(P(x, y)), **cols)

    def repere(self, oy=-0.8, uy=0.124, yl=(4, 8, 12, 16, 20)):
        """Le repère jours / gigas (2e relecture -ql du 22/11) : le quadrillage passe de 2,4 à 3,4 de large
        (≈ 85 % de l'écran avec les nombres) ; « jours » SOUS la ligne des nombres (à droite du quadrillage, il
        touchait la fin de la droite), « gigas » au-dessus."""
        return Repere(P(-1.5, oy), 0.33, uy, (0, 10.6), (0, 21.2), xt=range(1, 11), xl=(2, 4, 6, 8, 10),
                      yt=range(2, 21, 2), yl=yl, nom_x="jours", nom_y="gigas", nx_sous=1.45)

    def _disposer_q(self, question, choix, phrase):
        """2e relecture -ql du 22/11 : l'énoncé remplace « Question ! » en haut (le repère reste grand dessous),
        cartes à 34 pt tassées, « Mets pause, / et choisis ! » sur deux lignes à 33 pt, bas ≥ −2,45 (Ti-Margo,
        centré en bas, a son haut à −2,92), le compte à rebours à 0,4 à leur droite."""
        tete, q, cartes, pause, rebours, ph = IdentDevelopperShort4e._disposer_q(self, question, choix, phrase)
        tete.move_to(P(0, 3.45))
        self._tete = tete
        if len(q.submobjects):
            q.scale(36 / taille(q[0]))
            q.move_to(P(0, 3.45))
        larg = 3.85
        for c in cartes:
            cadre, dedans = c[0], c[1]
            cadre.stretch_to_fit_width(larg)
            cadre.move_to(P(0, cadre.get_y()))
            dedans.scale(34 / taille(dedans[1]))
            dedans.next_to(cadre.get_left(), RIGHT, buff=0.15)
            cadre.stretch_to_fit_height(dedans.height + 0.1)
            dedans.set_y(cadre.get_y())
        cartes.arrange(DOWN, buff=0.06).next_to(P(0, self.haut_cartes), DOWN, buff=0).set_x(0)
        pause = VGroup(T("Mets pause,", 33, ORANGE_RETENUE, audit=False),
                       T("et choisis !", 33, ORANGE_RETENUE, audit=False)).arrange(DOWN, buff=0.04)
        for f in pause.get_family():
            f.sans_synchro = True
        pause.next_to(cartes, DOWN, buff=0.08).set_x(-0.4)
        rebours.next_to(pause, RIGHT, buff=0.35)
        ph.arrange(DOWN, buff=0.12).next_to(cartes, DOWN, buff=0.15).set_x(0)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE énoncé {taille(q):.0f} pt bas {q.get_bottom()[1]:.2f} ; cartes {taille(cartes[0][1][1]):.0f}"
                  f" pt {cartes.get_top()[1]:.2f} → {cartes.get_bottom()[1]:.2f} ; pause {taille(pause):.0f} pt bas "
                  f"{pause.get_bottom()[1]:.2f} (≥ −2,9) x {pause.get_left()[0]:.2f} → {pause.get_right()[0]:.2f} ; "
                  f"rebours x {rebours.get_left()[0]:.2f} → {rebours.get_right()[0]:.2f}", flush=True)
        return tete, q, cartes, pause, rebours, ph

    def place_reponse(self):
        """Après le ✓, les cartes s'effacent ; la réponse prend leur place, à 36 pt (2e relecture -ql du 22/11)."""
        cartes, ph = self.cartes_q, self.ph_q
        haut = cartes[0].get_top()[1] - 0.05
        self.play(FadeOut(cartes), FadeOut(self.mobjects[-1]), run_time=0.25)
        ph.scale(36 / taille(ph[0]))
        ph.arrange(DOWN, buff=0.18).next_to(P(0, haut), DOWN, buff=0).set_x(0)
        if os.environ.get("AUDIT") == "1":
            print(f"TAILLE-REPONSE {taille(ph[0]):.0f} pt, bas {ph.get_bottom()[1]:.2f}, largeur {ph.width:.2f}",
                  flush=True)

    def lq(self, s, phrase, gestes=None, couleur=WHITE, **cols):
        """Dans avant_q : la première ligne restante de la question, posée au mot."""
        ref = self.q_q[0]
        e = col(X(s, 34, couleur), **cols)
        e.scale_to_fit_height(ref.height).move_to(ref)
        self.q_q.remove(ref)
        return self.poser_gestes(e, phrase, gestes or {}, echelle=1.15, rt=0.2)

    def ph_g(self, i, s, phrase, gestes=None, premier=False, **cols):
        """La ligne i de la réponse (verte), posée au mot, avec ses gestes sur la figure."""
        ref = self.ph_q[i]
        e = col(X(s, 30, VERT_OK), **cols)
        e.scale_to_fit_width(ref.width).move_to(ref)
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        return self.poser_gestes(e, phrase, gestes or {}, rt=0.16, sauf=sauf)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Forfait internet", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        ys = [-2.02, -2.52]
        xt = 0.42  # 2e relecture -ql du 22/11 : le téléphone HORS du repère, à gauche des lignes (décalées)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        r = self.repere()
        d = r.droite(-2, 20, 0, 10)
        tel = telephone_data(0.85).move_to(P(-1.68, (ys[0] + ys[1]) / 2))
        l1 = self.lb("Ce graphique", ys[0], 38)
        self.poser_gestes(l1, "Ce graphique", {0: lambda: [FadeIn(titre), FadeIn(r)]}, rt=0.3)
        l2 = self.lb("sait quand", ys[1], 38)
        self.poser_gestes(l2, "sait quand", {0: lambda: [Create(d)]}, rt=0.3)
        self.play(FadeOut(VGroup(l1, l2)), run_time=0.15)
        l3 = self.lb("ton forfait", ys[0], 38, maxw=2.9, x=xt)
        self.poser_gestes(l3, "ton forfait", {1: lambda: [FadeIn(tel, shift=DOWN * 0.2)]})
        l4 = self.lb("sera vide.", ys[1], 40, JAUNE_TITRE, maxw=2.9, x=xt)
        self.poser_gestes(l4, "sera vide.", {1: lambda: [tel.barres.animate.set_fill(opacity=0)]})
        self.insister(l4, 1.08, 0.15)
        self.verifier(r, "00-accroche", lignes=[d])
        self.attendre_voix(marge=0.3)
        self.play(FadeOut(VGroup(l3, l4)), run_time=0.25)

        # ── 01 : 20 gigas, − 2 par jour, vide à 10 jours ──
        self.dire("01-image")
        p20 = r.point(0, 20, COUL_B, 0.1)
        h, v = r.pas(0, 20, 1, -2)
        p10 = r.point(10, 0, VERT_OK, 0.11)
        c10 = Circle(radius=0.22, stroke_color=VERT_OK, stroke_width=4).move_to(r.lx[10])
        a2 = self.lb("20 gigas,", ys[0], 40, maxw=2.9, x=xt, b=(0,))
        self.poser_gestes(a2, "20 gigas.", {0: lambda: [GrowFromCenter(p20), Flash(p20, color=COUL_B)]})
        a3 = self.lb("2 par jour.", ys[1], 40, maxw=2.9, x=xt, a=(0,))
        self.poser_gestes(a3, "Tu en utilises 2 par jour.", {0: lambda: [tel.barres[1].animate.set_fill(opacity=0)]})
        self.play(FadeOut(VGroup(a2, a3, tel)), run_time=0.25)
        b1 = self.lb("Part de 20,", ys[0], 38, b=(2,))
        self.poser_gestes(b1, "La droite part de 20,", {2: lambda: [Indicate(p20, color=COUL_B, scale_factor=1.8)]})
        b2 = self.lb("descend de 2", ys[1], 38, a=(2,))
        self.poser_gestes(b2, "et descend de 2", {0: lambda: [GrowArrow(h)], 2: lambda: [GrowArrow(v)]})
        self.au("chaque jour", Indicate(VGroup(h, v), color=JAUNE_TITRE, scale_factor=1.0), rt=0.4)
        self.play(FadeOut(VGroup(b1, b2)), run_time=0.25)
        c1 = self.lb("Touche à 10 :", ys[0], 38, vert=(2,))
        self.poser_gestes(c1, "Elle touche l'axe horizontal à 10 :",
                          {0: lambda: [Indicate(r.ax, color=JAUNE_TITRE, scale_factor=1.0)],
                           2: lambda: [GrowFromCenter(p10), Create(c10)]})
        c2 = self.lb("Vide à 10 jours.", ys[1], 36, JAUNE_TITRE, vert=(2,))
        self.dit(c2, "vide au bout de 10 jours.")
        self.play(Create(self.cadre_ok(c2, 0.1)), run_time=0.3)
        self.insister(c2, 1.04, 0.15)
        self.verifier(r, "01-image", lignes=[d])
        self.attendre_voix(marge=1.0)

        # ── 01q : la question-pause (3 s) : le repère reste grand, un peu plus plat, sous l'énoncé ──
        # plus plat (la place des cartes et de « Mets pause » au-dessus de Ti-Margo) : nombres 4, 12, 20 (pas de 8)
        # 3e relecture -ql : à 0,0685 le repère était écrasé (« 20 12 4 » collés) : 0,08, la phrase de pause
        # finit juste au-dessus de Ti-Margo (haut −2,92)
        r2 = self.repere(oy=0.86, uy=0.08, yl=(4, 12, 20))
        d2 = r2.droite(-2, 20, 0, 10)
        if os.environ.get("AUDIT") == "1":
            for nom, rr in (("accroche", r), ("question", r2)):
                print(f"GEO repère {nom} x {rr.get_left()[0]:.2f} → {rr.get_right()[0]:.2f} ; y {rr.get_bottom()[1]:.2f}"
                      f" → {rr.get_top()[1]:.2f} ; quadrillage {rr.grille.width:.2f} × {rr.grille.height:.2f} ; "
                      f"jours bas {rr.nx.get_bottom()[1]:.2f} ; écart des nombres y "
                      f"{rr.ly[12].get_bottom()[1] - rr.ly[4].get_top()[1]:.2f} ; ceinture bas {badge.get_bottom()[1]:.2f}",
                      flush=True)
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in (r, d, margo)])),
                  ReplacementTransform(r, r2), ReplacementTransform(d, d2), run_time=0.45)
        r, d = r2, d2
        self.haut_cartes = r.nx.get_bottom()[1] - 0.1
        f1, f2 = r.image(4, 12)
        pt = r.point(4, 12, JAUNE_TITRE, 0.1)
        c4 = Circle(radius=0.2, stroke_color=INCONNUE, stroke_width=4).move_to(r.lx[4])

        def avant(sc):
            tete = sc._tete
            sc.lq("Après 4 jours ?", "combien reste-t-il après 4 jours ?",
                  {0: lambda: [FadeOut(tete)], 1: lambda: [Create(c4)]}, couleur=JAUNE_TITRE, bleu=(1,))

        def apres(sc):
            sc.place_reponse()
            sc.ph_g(0, "Réponse C :", "Réponse C :", premier=True)
            sc.ph_g(1, "4 × 2 = 8,", "4 jours, 2 gigas par jour, 8 gigas utilisés.",
                    {0: lambda: [Create(f1), GrowFromCenter(pt)]}, bleu=(0,), a=(2,))
            sc.ph_g(2, "20 − 8 = 12.", "20 moins 8 : 12 gigas.",
                    {0: lambda: [Indicate(r.ly[20], color=COUL_B, scale_factor=1.4)],
                     4: lambda: [Create(f2), r.ly[12].animate.set_color(VERT_OK).scale(1.2)]}, b=(0,))
            sc.verifier(r, "01r-reponse", lignes=[d])
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Après 4 jours ?"],
                            [X("8 gigas", 34), X("16 gigas", 34), X("12 gigas", 34)], 2,
                            ["Réponse C :", "4 × 2 = 8,", "20 − 8 = 12."],
                            avant_q=avant, autres_r=apres)

        # ── 02 : la question en commentaire, SANS Ti-Margo, puis la fin commune ──
        self.dire("02-question")
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        tit = T("À toi !", 52, JAUNE_TITRE).move_to(P(-0.45, 2.6))
        tl = telephone_data(0.8).next_to(tit, RIGHT, buff=0.35)
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1), FadeIn(tl, shift=DOWN * 0.2), rt=0.35)
        q1 = self.lb("Avec 30 gigas,", 1.8, 38, b=(1,))
        self.dit(q1, "Avec 30 gigas,")
        q2 = self.lb("et 2 par jour,", 1.2, 40, a=(1,))
        self.dit(q2, "et 2 gigas par jour,")
        q3 = self.lb("au bout de", 0.6, 40)
        self.dit(q3, "au bout de")
        q4 = self.lb("combien", 0.0, 40)
        self.dit(q4, "combien")
        q4b = self.lb("de jours", -0.6, 40)
        self.dit(q4b, "de jours")
        q5 = self.lb("est-il vide ?", -1.25, 44, JAUNE_TITRE)
        self.dit(q5, "le forfait est-il vide ?")
        appel_commentaire(self, y=-2.1)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="03-abonne")
