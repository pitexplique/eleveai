# prop_lycee_appliquer_short.py
# EleveAI — Maths 1re ET STMG — short jumeau de l'épisode COMMUN 03 « Appliquer
# un pourcentage » (micro auto_prop_appliquer, notion auto_proportion).
# CEINTURE BLANCHE (règle du short blanc, REGLES.md), sans identité de classe :
# rendu UNE fois, copié sous les deux noms (premiere et stmg).
# Il AMUSE : « 8 % de 50, sans calculatrice, en une seconde ! »
#   · l'image qui bouge : « 8 % de 50 », puis les DEUX NOMBRES ÉCHANGENT LEUR
#     PLACE (arcs) → « 50 % de 8 » ; 50 % = la moitié : 8 billes, la moitié
#     s'allume → 4 ;
#   · 1 question-pause (3 s) : 12 % de 25 → 25 % de 12 = le quart de 12 = 3
#     (B = 13 = 25 − 12 ; C = 0,3 : la virgule) ; à la réponse,
#     12 billes en 4 paquets de 3, un paquet s'allume ;
#   · fin : combien font 4 % de 75 ? (3) en commentaire.
# Centre d'intérêt : jeux-defis. Chiffres : un calcul pur, pas de source.
#
# Voix : manim/voix/lycee-prop-appliquer-short.json (validée par Frédéric le
# 02/11, débit −10) ; WAV : public/sons/lycee-prop-appliquer-short/ ;
# marques : manim/scripts/premiere/prop_lycee_appliquer_short_marques.json.
# Outils (non modifiés) : prop_commun.py (ShortProp), canvas_proportion.py.
# Ajouté ICI : calculatrice(), chrono(), billes().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/prop_lycee_appliquer_short.py PropLyceeAppliquerShort
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/prop_lycee_appliquer_short.py PropLyceeAppliquerShort -o eleveai-maths-premiere-prop-appliquer-short --media_dir manim/scripts/premiere/media-prop-lycee-appliquer-short
# Sorties : manim/sorties/premiere/maths/proportionnalite/03-appliquer/eleveai-maths-premiere-prop-appliquer-short.mp4
#           manim/sorties/stmg/maths/proportionnalite/03-appliquer/eleveai-maths-stmg-prop-appliquer-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403

EAU = "#38bdf8"
ALLUME = "#22c55e"
ETEINT = "#334155"


def pas_audit(m):
    """Décor ou donnée redite : sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def calculatrice(s=1.0):
    """Une calculatrice (sans chiffres) : boîtier, écran, 12 touches."""
    corps = RoundedRectangle(width=1.0, height=1.4, corner_radius=0.12, fill_color="#475569", fill_opacity=1,
                             stroke_width=0)
    ecran = Rectangle(width=0.76, height=0.3, fill_color="#a7f3d0", fill_opacity=1, stroke_width=0).move_to(P(0, 0.42))
    touches = VGroup(*[RoundedRectangle(width=0.17, height=0.15, corner_radius=0.03, fill_color="#e2e8f0",
                                        fill_opacity=1, stroke_width=0).move_to(P(-0.27 + 0.18 * i, 0.05 - 0.2 * j))
                       for i in range(4) for j in range(3)])
    return VGroup(corps, ecran, touches).scale(s)


def chrono(s=1.0):
    """Un chronomètre (sans chiffres) : cadran, bouton, aiguille."""
    c = Circle(radius=0.55, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8", stroke_width=6)
    b = RoundedRectangle(width=0.22, height=0.18, corner_radius=0.04, fill_color="#94a3b8", fill_opacity=1,
                         stroke_width=0).next_to(c, UP, buff=0)
    a = Line(ORIGIN, P(0.25, 0.3), color=ROUGE_ERREUR, stroke_width=6)
    return VGroup(b, c, a, Dot(ORIGIN, radius=0.05, color=NUIT)).scale(s)


def billes(paquets, par_paquet, r=0.13, ecart=0.34, entre=0.25):
    """Des billes rangées en paquets côte à côte (un paquet = une colonne)."""
    g = VGroup()
    for p in range(paquets):
        col = VGroup(*[Circle(radius=r, fill_color=ETEINT, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
                       for _ in range(par_paquet)]).arrange(DOWN, buff=ecart - 2 * r)
        g.add(col)
    return g.arrange(RIGHT, buff=entre)


class PropLyceeAppliquerShort(ShortProp):
    nom_voix = "lycee-prop-appliquer-short"
    fichier_marques = "prop_lycee_appliquer_short_marques.json"
    ceinture = "blanche"

    def _rep_q(self, sc):
        l0 = sc.ligne_rep(0, ["12 % de 25", "= 25 % de 12 :"])
        l1 = sc.ligne_rep(1, ["le quart de 12", "= 3."])
        bl = billes(4, 3).move_to(P(0, -1.0))  # à la place des cartes B et C (éteintes)
        sc.au_mot("12 % de 25")
        sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("25 % de 12")
        sc.play(FadeIn(l0[1], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("le quart")
        sc.play(FadeIn(l1[0], shift=UP * 0.12), FadeOut(sc.cartes_q[1]), FadeOut(sc.cartes_q[2]), FadeIn(bl, scale=0.8),
                run_time=0.35)
        sc.play(*[b.animate.set_fill(ALLUME, 1) for b in bl[0]], Circumscribe(bl[0], color=ALLUME, buff=0.08),
                run_time=0.5)
        sc.au_mot("égale 3")
        sc.play(FadeIn(l1[1], scale=1.3), Indicate(bl[0], color=ALLUME), run_time=0.4)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("8 % de 50", self.ceinture)
        pas_audit(titre)
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche : 8 % de 50, sans calculatrice, en une seconde ──
        self.dire("00-accroche")
        L1 = self.ligne([("8", EAU), ("%", EAU), ("de", WHITE), ("50", JAUNE_TITRE), ("?", AMBRE)], 64, buff=0.32)
        L1.move_to(P(0, 1.9))
        self.au_mot("Combien")
        self.play(Write(titre), run_time=0.5)
        self.au_mot("8 %")
        self.play(FadeIn(VGroup(L1[0], L1[1]), scale=1.3), run_time=0.35)
        self.au_mot("de 50")
        self.play(FadeIn(VGroup(L1[2], L1[3]), shift=RIGHT * 0.15), FadeIn(L1[4], scale=1.4), run_time=0.35)
        ca = calculatrice(1.1).move_to(P(-1.0, 0.1))
        cr = Line(ca.get_corner(UL) + P(-0.1, 0.1), ca.get_corner(DR) + P(0.1, -0.1), color=ROUGE_ERREUR,
                  stroke_width=10)
        self.au_mot("Sans calculatrice")
        self.play(FadeIn(ca, scale=0.8), run_time=0.35)
        self.play(Create(cr), run_time=0.3)
        ch = chrono(1.0).move_to(P(1.1, 0.1))
        self.au_mot("une seconde")
        self.play(FadeIn(ch, scale=0.8), Rotate(ch[2], angle=-TAU, about_point=ch[1].get_center()), run_time=0.8)
        self.attendre_voix(marge=0.2)

        # ── 01 : les deux nombres échangent leur place ; 50 % = la moitié ──
        self.dire("01-image")
        astuce = self.t("L'astuce :", 38, AMBRE).move_to(P(0, 1.95))
        self.au_mot("L'astuce")
        self.play(FadeOut(VGroup(ca, cr, ch)), FadeOut(L1[4]), FadeIn(astuce, shift=DOWN * 0.1),
                  VGroup(*L1[:4]).animate.move_to(P(0, 1.2)), run_time=0.45)
        egal = self.t("c'est pareil que", 32, WHITE).move_to(P(0, 0.45))
        self.au_mot("c'est pareil")
        self.play(FadeIn(egal, shift=DOWN * 0.1), run_time=0.35)
        L2 = self.ligne([("50", JAUNE_TITRE), ("%", EAU), ("de", WHITE), ("8", EAU)], 64, buff=0.32).move_to(P(0, -0.3))
        n8, n50 = L1[0].copy(), L1[3].copy()
        self.add(n8, n50)
        self.au_mot("que 50")
        self.play(n50.animate(path_arc=PI * 0.8).move_to(L2[0]), n8.animate(path_arc=PI * 0.8).move_to(L2[3]),
                  run_time=1.0)
        self.play(FadeIn(VGroup(L2[1], L2[2]), shift=UP * 0.1), run_time=0.3)
        self.insister(VGroup(n50, L2[1], L2[2], n8), 1.12)
        L3 = self.ligne([("50 % =", EAU), ("la moitié", ALLUME)], 40).move_to(P(0, -1.1))
        bl = billes(2, 4, r=0.16, ecart=0.42, entre=0.2).rotate(PI / 2).move_to(P(-1.1, -2.0))
        self.au_mot("Et 50")
        self.play(FadeIn(L3[0], shift=RIGHT * 0.12), FadeIn(bl, scale=0.8), run_time=0.35)
        self.au_mot("la moitié")
        self.play(FadeIn(L3[1], shift=RIGHT * 0.12), *[b.animate.set_fill(ALLUME, 1) for b in bl[0]], run_time=0.4)
        r4 = self.ligne([("=", WHITE), ("4 !", ALLUME)], 54).next_to(bl, RIGHT, buff=0.4)
        self.au_mot("4 !")
        self.play(FadeIn(r4, scale=1.3), Circumscribe(bl[0], color=ALLUME, buff=0.08), run_time=0.45)
        self.insister(r4[1], 1.2)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 02 : la question-pause (3 s) : 12 % de 25 ──
        self.question_pause("02-question", "02b-reponse", ["Combien font", "12 % de 25 ?"],
                            [self.t("3", 34), self.t("13", 34), self.t("0,3", 34)], 0,
                            ["12 % de 25 = 25 % de 12 :", "le quart de 12 = 3."], mot_q="Combien font",
                            autres_r=self._rep_q)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question en commentaire : 4 % de 75 ──
        self.dire("03-commentaire")
        a = self.t("À toi :", 40, AMBRE).move_to(P(0, 1.9))
        self.au_mot("À toi")
        self.play(FadeIn(a, shift=DOWN * 0.1), run_time=0.3)
        L = self.ligne([("4 %", EAU), ("de", WHITE), ("75", JAUNE_TITRE), ("= ?", AMBRE)], 56, buff=0.3)
        L.scale_to_fit_width(min(L.width, 3.7)).move_to(P(0, 0.8))
        self.au_mot("4 %")
        self.play(FadeIn(L[0], scale=1.3), run_time=0.3)
        self.au_mot("de 75")
        self.play(FadeIn(VGroup(L[1], L[2]), shift=RIGHT * 0.12), FadeIn(L[3], scale=1.3), run_time=0.35)
        fl = CurvedDoubleArrow(L[0].get_bottom() + DOWN * 0.15, L[2].get_bottom() + DOWN * 0.15, angle=PI * 0.6,
                               color=AMBRE, stroke_width=5, tip_length=0.18)
        self.play(Create(fl), run_time=0.5)
        self.insister(L[3], 1.3)
        self.appel_commentaire(y=-1.0)
