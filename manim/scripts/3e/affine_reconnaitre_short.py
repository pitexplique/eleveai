# affine_reconnaitre_short.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 01, le SHORT ceinture JAUNE
# « Le carré qui disparaît » : f(x) = (x + 1)² − x² a l'air compliquée ; on développe, les x² s'annulent,
# il reste 2x + 1 : f est affine.
# Écrans (clés de manim/voix/3e-affine-reconnaitre-short.json) :
#   00-accroche   une courbe embrouillée qui devient droite : « Et si elle était affine ? »
#   01-image      (x + 1)² − x² = x² + 2x + 1 − x² = 2x + 1, les x² barrés, « f est affine ! »
#   01q / 01r     QUESTION (3 s) : laquelle est linéaire ? réponse B (5x)
#   02-question   écran commentaire SANS Ti-Margo : f(x) = 3(x + 2) − 6, linéaire ou affine ? (réponse : 3x,
#                 linéaire, donc affine aussi)
#   03-abonne     la fin commune (manim/fin_commune.py)
# Lettre de la question : 01q → B.
# Métier : Maya, monteuse vidéo (la paysage). Code couleur : x bleu, juste vert, piège rouge, droite bleue.
# Voix : manim/voix/3e-affine-reconnaitre-short.json (validée) ; marques : affine_reconnaitre_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/3e/affine_reconnaitre_short.py AffineReconnaitreShort3e --media_dir manim/scripts/3e/media-affine-01s-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/affine_reconnaitre_short.py AffineReconnaitreShort3e -o eleveai-maths-3e-affine-reconnaitre-short --media_dir manim/scripts/3e/media-affine-01s
# Sortie : manim/sorties/3e/maths/fonctions-affines/01-reconnaitre/eleveai-maths-3e-affine-reconnaitre-short.mp4

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS 4e et ses outils communs
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from ident_factoriser_short import IdentFactoriserShort3e  # noqa: E402
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402
from ident_developper import A2, AB, B2, croix  # noqa: E402
from equation_defi import E  # noqa: E402
from affine_reconnaitre import Repere  # noqa: E402

LARGEUR = 3.6  # relecture -ql du 22/11 : au moins 30 px de marge sur 540 (le cadre fait 4,5 de large)


class CarreDecoupe(VGroup):
    """Le carré (x + 1)² découpé : .grand (x², bleu), .bandes (deux x × 1, orange), .coin (1 × 1, violet),
    .cotes (x et 1 en haut et à gauche, données de figure). Coin haut gauche en tl."""

    def __init__(self, sx=1.0, s1=0.36, tl=ORIGIN, **kw):
        super().__init__(**kw)
        x0, y0 = tl[0], tl[1]

        def rect(w, h, c, cx, cy, op):
            return Rectangle(width=w, height=h, fill_color=c, fill_opacity=op, stroke_color=WHITE,
                             stroke_width=3).move_to(P(cx, cy))

        self.grand = rect(sx, sx, A2, x0 + sx / 2, y0 - sx / 2, 0.8)
        self.bandes = VGroup(rect(s1, sx, AB, x0 + sx + s1 / 2, y0 - sx / 2, 0.85),
                             rect(sx, s1, AB, x0 + sx / 2, y0 - sx - s1 / 2, 0.85))
        self.coin = rect(s1, s1, B2, x0 + sx + s1 / 2, y0 - sx - s1 / 2, 0.9)
        self.cotes = VGroup(
            T("x", 30, INCONNUE, audit=False).move_to(P(x0 + sx / 2, y0 + 0.2)),
            T("1", 30, CIEL, audit=False).move_to(P(x0 + sx + s1 / 2, y0 + 0.2)),
            T("x", 30, INCONNUE, audit=False).move_to(P(x0 - 0.2, y0 - sx / 2)),
            T("1", 30, CIEL, audit=False).move_to(P(x0 - 0.2, y0 - sx - s1 / 2)))
        self.noms = VGroup(T("x²", 30, WHITE, audit=False).move_to(self.grand))
        self.add(self.grand, self.bandes, self.coin, self.cotes, self.noms)

    def forme_l(self):
        return VGroup(self.bandes, self.coin)

PAROLE["²"] = "carré"
PAROLE["0"] = "0"  # relatif_commun le fait dire « zéro » : ici la voix dit « 0 »


class AffineReconnaitreShort3e(IdentFactoriserShort3e):
    nom_voix = "3e-affine-reconnaitre-short"
    fichier_marques = "affine_reconnaitre_short_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "jaune"

    def play(self, *a, **k):
        """AUDIT=1 : signale un texte à moins de 30 px (0,25) du bord gauche ou droit (MARGE …)."""
        r = super().play(*a, **k)
        if os.environ.get("AUDIT") == "1":
            vus = self.__dict__.setdefault("_marges_vues", set())
            for m in self.mobjects:
                for t in m.get_family():
                    if isinstance(t, Text) and t.get_fill_opacity() > 0.05 and id(t) not in vus:
                        if getattr(self, "_cle_voix", "") == "03-abonne":
                            continue  # la fin commune (fin_commune.py) est figée : on n'y touche pas
                        if t.get_left()[0] < -2.0 or t.get_right()[0] > 2.0:
                            vus.add(id(t))
                            print(f"MARGE {getattr(self, '_cle_voix', '?')} « {t.original_text[:30]} » "
                                  f"x[{t.get_left()[0]:.2f}, {t.get_right()[0]:.2f}]", flush=True)
        return r

    def l(self, s, y, fs=32, c=WHITE, lettres=""):
        """La ligne du short, bornée à LARGEUR (et non 3,95) : 30 px de marge au moins."""
        e = E(s, fs, c, lettres=lettres)
        if e.width > LARGEUR:
            e.scale_to_fit_width(LARGEUR)
        return e.move_to(P(0, y))

    def c(self, s, y, fs=44, couleur=WHITE):
        """Une ligne de calcul (x bleu), au plus LARGEUR de large, centrée."""
        e = E(s, fs, couleur, lettres="x")
        if e.width > LARGEUR:
            e.scale_to_fit_width(LARGEUR)
        return e.move_to(P(0, y))

    def _disposer_q(self, question, choix, phrase):
        """« Mets pause, et choisis ! » borné à LARGEUR (il touchait les 30 px de marge)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        # -ql 22/11 (2e passe) : la phrase était sur une ligne, trop petite : deux lignes à 34 pt, sous des
        # cartes tassées (0,62 de haut), le tout au-dessus de Ti-Margo (haut −2,92).
        haut = cartes.get_top()[1]
        for c in cartes:
            c[0].stretch_to_fit_height(0.62)
            c[1].set_y(c[0].get_y())
        cartes.arrange(DOWN, buff=0.1, aligned_edge=LEFT)
        cartes.shift(UP * (haut - cartes.get_top()[1]))
        neuf = VGroup(T("Mets pause,", 34, ORANGE_RETENUE, audit=False),
                      T("et choisis !", 34, ORANGE_RETENUE, audit=False)).arrange(DOWN, buff=0.06)
        for f in neuf.get_family():
            f.sans_synchro = True
        neuf.next_to(cartes, DOWN, buff=0.15).set_x(0)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE cartes {cartes.get_top()[1]:.2f}/{cartes.get_bottom()[1]:.2f} "
                  f"pause bas {neuf.get_bottom()[1]:.2f} (Ti-Margo −2,92)", flush=True)
        return tete, q, cartes, neuf, rebours, ph

    def reponse_repere(self):
        """Comme place_reponse, mais la réponse plus compacte, et un petit repère dessous : la droite y = 5x
        passe par l'origine (posée au mot « l'origine » par le script)."""
        cartes, ph = self.cartes_q, self.ph_q
        # -ql 22/11 : la question s'efface aussi (la réponse la redit) : la place gagnée va au repère
        haut = self.q_q.get_top()[1] - 0.05
        ph.arrange(DOWN, buff=0.08)
        k = min(0.46 / max(l.height for l in ph), LARGEUR / ph.width)  # 22/11 : réponse à ~36 pt
        ph.scale(k).next_to(P(0, haut), DOWN, buff=0).set_x(0)
        # -ql 22/11 : Ti-Margo couvrait les graduations « 1 », « 2 » : l'axe remonte, ses nombres restent à plus
        # de 0,3 au-dessus de lui (haut de sa boîte : y = −2,92) ; en y, seulement 5 et 15 (10 était serré).
        bas = -2.2
        # 3e relecture -ql 22/11 : le repère était minuscule (2,4 × 0,9, « 10 » absent) : plus large, plus haut,
        # graduations 5 et 10 (la droite s'arrête à (2 ; 10))
        h = max(0.9, ph.get_bottom()[1] - 0.5 - bas)
        r = Repere(3, 10, 1, 5, 3.1, h, P(-1.45, bas), nom_x="x", nom_y="y", ys=[5, 10])
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE repère h {h:.2f} réponse bas {ph.get_bottom()[1]:.2f}", flush=True)
        d = r.droite(lambda x: 5 * x, 0, 2, INCONNUE)  # coupée à 10, le haut du repère
        oo = Dot(r.p(0, 0), radius=0.09, color=VERT_OK)
        self.play(FadeOut(cartes), FadeOut(self.mobjects[-1]), FadeOut(self.q_q), FadeIn(r), run_time=0.25)
        if os.environ.get("AUDIT") == "1":
            ecart = r.get_bottom()[1] - (-2.918)
            if ecart < 0.3 or r.get_top()[1] > ph.get_bottom()[1] - 0.1:
                print(f"MARGO repère : {ecart:.2f} au-dessus de Ti-Margo, haut {r.get_top()[1]:.2f}, "
                      f"bas de la réponse {ph.get_bottom()[1]:.2f}", flush=True)
        return r, d, oo

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le carré qui disparaît", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : une courbe embrouillée… et si elle était droite ? ──
        self.dire("00-accroche")
        l1 = self.l("Cette fonction a l'air", 1.75, 42)
        pts = [P(-1.5, -0.9), P(-1.0, 0.6), P(-0.5, -0.5), P(0.0, 0.9), P(0.4, -0.7), P(0.9, 0.5), P(1.5, -0.2)]
        embrouille = VMobject(stroke_color=PIEGE, stroke_width=7).set_points_smoothly(pts).shift(DOWN * 0.15)
        droite = Line(P(-1.5, -0.95), P(1.5, 0.75), color=INCONNUE, stroke_width=8).shift(DOWN * 0.15)
        self.dit(l1, "Cette fonction a l'air", avec=[FadeIn(titre), Create(embrouille)])
        l2 = self.l("compliquée.", 1.15, 48, PIEGE)
        self.dit(l2, "compliquée.")
        self.play(Wiggle(embrouille), run_time=0.45)
        l3 = self.l("Et si elle était", -1.45, 42)
        self.dit(l3, "Et si elle était")
        l4 = self.l("affine ?", -2.15, 56, VERT_OK)
        self.dit(l4, "affine ?", avec=[ReplacementTransform(embrouille, droite)])
        self.insister(l4, 1.08, 0.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : on développe, les x² s'annulent, il reste 2x + 1 ──
        self.dire("01-image")
        # Relecture -ql du 22/11 : le carré (x + 1)² est DESSINÉ sous les calculs (la moitié basse était vide),
        # son x² s'efface quand les x² s'annulent, il reste la forme en L = 2x + 1.
        cq = CarreDecoupe(1.0, 0.36, P(-1.5, -1.2))
        e1 = self.c("f(x) = (x + 1)² − x²", 1.75, 44)
        self.poser_gestes(e1, "f de x égale x plus 1, au carré, moins x au carré.",
                          {10: lambda: [FadeIn(cq, scale=0.85)]}, echelle=1.1)
        l1 = self.c("On développe :", 1.15, 36, CIEL)
        self.dit(l1, "On développe :")
        e2 = self.c("= x² + 2x + 1 − x²", 0.55, 44)
        self.poser_gestes(e2, "x au carré plus 2 x plus 1, moins x au carré.",
                          {1: lambda: [Indicate(cq.grand, color=JAUNE_TITRE, scale_factor=1.06)],
                           5: lambda: [Indicate(cq.bandes, color=JAUNE_TITRE, scale_factor=1.06)],
                           7: lambda: [Indicate(cq.coin, color=JAUNE_TITRE, scale_factor=1.2)]}, echelle=1.1)
        b1 = self.barrer(VGroup(*e2.atomes[1:3]))
        b2 = self.barrer(VGroup(*e2.atomes[8:11]))
        xg = croix(cq.grand, PIEGE, 0.36)
        l2 = self.c("Les x² s'annulent.", -0.02, 36, PIEGE)
        self.poser_gestes(l2, "Les x au carré s'annulent.", {5: lambda: [Create(b1), Create(b2), Create(xg)]})
        self.play(FadeOut(VGroup(cq.grand, cq.noms, xg, cq.cotes[0], cq.cotes[2])), run_time=0.35)
        e3 = self.c("Il reste 2x + 1 :", -0.6, 44, VERT_OK)
        self.poser_gestes(e3, "Il reste 2 x plus 1 :",
                          {2: lambda: [Indicate(cq.forme_l(), color=VERT_OK, scale_factor=1.08)]}, echelle=1.1)
        lv = VGroup(T("f est", 32, VERT_OK, gras=True), T("affine !", 32, VERT_OK, gras=True)).arrange(DOWN, buff=0.08)
        v = VGroup(SurroundingRectangle(lv, color=VERT_OK, buff=0.14, corner_radius=0.1, stroke_width=4), lv)
        gauche = cq.coin.get_right()[0] + 0.3
        if v.width > 2.0 - gauche:
            v.scale_to_fit_width(2.0 - gauche)
        v.move_to(P((gauche + 2.0) / 2, cq.get_center()[1]))
        self.au("f est affine", FadeIn(v, scale=1.3), rt=0.35)
        self.insister(v, 1.06, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def apres(sc):
            r, d, oo = sc.reponse_repere()
            sc.ph_eq(0, "Réponse B :", "Réponse B :", premier=True)
            sc.ph_eq(1, "5x = 5x + 0", "5 x, c'est 5 x plus 0.", lettres="x")
            sc.ph_eq(2, "Sa droite passe", "Sa droite passe")
            sc.ph_eq(3, "par l'origine.", "par l'origine.")
            sc.play(GrowFromCenter(oo), Create(d), run_time=0.5)
            sc.play(Flash(oo, color=VERT_OK, line_length=0.15), run_time=0.35)
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Laquelle est linéaire ?"],
                            [Eq("5x + 1", 34), Eq("5x", 34), Eq("x²", 34)], 1,
                            ["Réponse B :", "5x = 5x + 0", "Sa droite passe", "par l'origine."],
                            autres_r=apres)

        # ── 02 : la question en commentaire, SANS Ti-Margo (17/11), puis la fin commune ──
        self.dire("02-question")
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        tit = T("À toi !", 52, JAUNE_TITRE).move_to(P(0, 2.6))
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1), rt=0.35)
        q1 = self.lx("f(x) = 3(x + 2) − 6", 1.45, 56)
        self.dire_eq(q1, "f de x égale 3 fois la parenthèse x plus 2, moins 6.", echelle=1.15)
        q2 = self.l("Linéaire ou affine ?", 0.45, 46, JAUNE_TITRE)
        self.dit(q2, "Linéaire ou affine ?")
        appel_commentaire(self, y=-1.0, fs=36)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="03-abonne")
