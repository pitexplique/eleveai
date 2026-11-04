# puissance_comparer_short.py
# EleveAI — Maths 4e — série PUISSANCES, épisode 06 « comparer », le SHORT
# ceinture BLANCHE « Le duel des puissances » : l'exposant décide d'abord.
#   · EN HAUT, le duel sur un ring : « 9 × 10⁵ » contre « 2 × 10⁶ », deux
#     jauges-boxeurs (le gant au sommet) qui montent à l'échelle ;
#   · EN BAS, AU MÊME INSTANT, sous chaque boxeur : le nombre en entier
#     (900 000 sous la jauge de gauche, 2 000 000 sous celle de droite), puis
#     « l'exposant décide d'abord : 6 bat 5 » (le gant de droite frappe) ;
#   · 1 question-pause (3 s) : 7 × 10² contre 1 × 10³ ;
#   · fin : 9,9 × 10⁻⁴ contre 1 × 10⁻³, réponse en commentaire, puis la fin
#     standard.
# Micro du coach : 4e puissance_comparer. Centres d'intérêt : sport, jeux-defis.
#
# Voix : manim/voix/4e-puissance-comparer-short.json (validée), débit −6 ;
# WAV : public/sons/4e-puissance-comparer-short/ ; marques :
# manim/scripts/4e/puissance_comparer_short_marques.json (marques_dump.ps1,
# puis conversion PAR PAIRES des cues doublées : aucun mot répété perdu).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/puissance_comparer_short.py PuissanceComparerShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/puissance_comparer_short.py PuissanceComparerShort -o eleveai-maths-4e-puissance-comparer-short --media_dir manim/scripts/4e/media-puiss-06-short
# Sortie : manim/sorties/4e/maths/puissances/06-comparer/eleveai-maths-4e-puissance-comparer-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "6e"))
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from puissance_notation_scientifique import OutilsNotation, ligne_base, notation, sans_audit  # noqa: E402
from puissance_notation_scientifique import T as T_paysage  # noqa: E402

EXPO_C = ORANGE_RETENUE
PIEGE = ROUGE_ERREUR
CIEL = "#93c5fd"
ROSE = "#f472b6"
XG, XD = -1.1, 1.1      # les deux boxeurs, et leurs colonnes en bas
Y0 = 0.25               # le sol du ring
K = 0.5                 # hauteur de jauge pour 1 000 000
Y_N = 2.0               # les deux nombres en notation scientifique


def T(s, fs=34, c=WHITE, audit=True, largeur=3.9):
    """Le texte de la paysage, borné à la largeur du cadre étroit (3 %)."""
    t = T_paysage(s, fs, c, audit)
    if t.width > largeur:
        t.scale_to_fit_width(largeur)
    return t


def jauge(x, h, couleur):
    """Un boxeur-jauge : la barre (hauteur h) et le gant posé dessus."""
    barre = Rectangle(width=0.62, height=h, fill_color=couleur, fill_opacity=0.85, stroke_width=0)
    barre.next_to(P(x, Y0), UP, buff=0)
    gant = VGroup(RoundedRectangle(width=0.5, height=0.36, corner_radius=0.15, fill_color=couleur, fill_opacity=1,
                                   stroke_color=WHITE, stroke_width=2))
    gant.next_to(barre, UP, buff=0.03)
    g = VGroup(barre, gant)
    g.barre, g.gant = barre, gant
    return g


def ring():
    """Le sol du ring et deux cordes, derrière les boxeurs."""
    sol = Line(P(-1.95, Y0), P(1.95, Y0), color=WHITE, stroke_width=4)
    cordes = VGroup(*[Line(P(-1.95, y), P(1.95, y), color=GREY_B, stroke_width=2, stroke_opacity=0.55)
                      for y in (Y0 + 0.55, Y0 + 1.05)])
    poteaux = VGroup(*[Line(P(x, Y0), P(x, Y0 + 1.25), color=GREY_B, stroke_width=5) for x in (-1.95, 1.95)])
    return VGroup(cordes, poteaux, sol)


class PuissanceComparerShort(OutilsNotation, ShortProp):
    nom_voix = "4e-puissance-comparer-short"
    fichier_marques = "puissance_comparer_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """« Question ! » et le compte à rebours reculent vers la gauche (3 %)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = rebours.get_right()[0] - 1.9
        if d > 0:
            tete.shift(LEFT * d)
            rebours.shift(LEFT * d)
        # la question (une ligne de notations) juste sous « Question ! », les cartes dessous
        q.move_to(P(0, tete.get_bottom()[1] - 0.45))
        cartes.scale(0.82).next_to(P(0, q.get_y() - 0.35), DOWN, buff=0).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.18).set_x(0)
        ph.arrange(DOWN, buff=0.2).next_to(cartes, DOWN, buff=0.18).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def fin_short(self, voix, a_effacer):
        """La fin du 19/10 (celle des shorts des épisodes 01 à 05)."""
        self.dire(voix)
        entraine = T("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.2))
        site = T("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.25))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = T("Abonne-toi !", 42, VERT_OK).move_to(P(0, -0.2))
        poignee = T("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -1.05))
        self.play(FadeOut(Group(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au("éleveai", GrowFromCenter(site), Create(cadre), rt=0.5)
        self.au("abonne-toi", FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), rt=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)

    def carte(self, haut=0.0, bas=-2.95):
        return RoundedRectangle(width=4.15, height=haut - bas, corner_radius=0.18, fill_color="#0b1220",
                                fill_opacity=1, stroke_color="#334155", stroke_width=2).move_to(P(0, (haut + bas) / 2))

    def poser_nota(self, n, mot_m, mot_e, moins=False):
        """Pose m × 10ᵉ morceau par morceau, au curseur de la voix."""
        self.au(mot_m, FadeIn(n.m, scale=1.3), FadeIn(n.x), rt=0.3)
        self.au("10 puissance", FadeIn(n.p.base, scale=1.3), rt=0.3)
        if moins:
            self.au("moins", FadeIn(n.p.moins, scale=1.6), rt=0.25)
            self.au(mot_e, FadeIn(n.p.chif, scale=1.6), rt=0.3)
        else:
            self.au(mot_e, FadeIn(n.p.expo, scale=1.6), rt=0.3)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le duel des puissances", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : le duel 9 × 10⁵ contre 2 × 10⁶ ──
        self.dire("00-accroche")
        rg = ring()
        n1 = notation("9", "5", fs=38).move_to(P(XG, Y_N))
        n2 = notation("2", "6", fs=38).move_to(P(XD, Y_N))
        vs = T("VS", 26, JAUNE_TITRE, audit=False).move_to(P(0, Y_N - 0.5))
        self.au("9 fois", Write(titre), FadeIn(rg), FadeIn(n1.m, scale=1.3), FadeIn(n1.x), rt=0.45)
        self.au("10 puissance", FadeIn(n1.p.base, scale=1.3), rt=0.3)
        self.au("5,", FadeIn(n1.p.expo, scale=1.6), rt=0.3)
        self.au("contre", FadeIn(vs, scale=1.5), rt=0.3)
        self.poser_nota(n2, "2 fois", "6.")
        qg = T("Qui gagne ?", 44, EXPO_C).move_to(P(0, -0.45))
        self.au("Qui gagne", FadeIn(qg, scale=1.2), rt=0.35)
        pas = T("Pas celui que tu crois.", 30).move_to(P(0, -1.3))
        neuf = SurroundingRectangle(n1.m, color=PIEGE, buff=0.08, corner_radius=0.08)
        self.au("Pas celui", FadeIn(pas, shift=UP * 0.12), Create(neuf), rt=0.35)
        self.insister(n1.m, 1.5, 0.2)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(qg), FadeOut(pas), FadeOut(neuf), run_time=0.3)
        duel = [rg, n1, n2, vs]

        # ── 01 : en bas, au même instant : en entier, puis 6 bat 5 ──
        self.dire("01-duel")
        carte = self.carte()
        ent = T("Écrits en entier :", 26, CIEL).move_to(P(0, -0.35))
        self.au("Écrits", FadeIn(carte), FadeIn(ent, shift=DOWN * 0.1), rt=0.4)
        j1, j2 = jauge(XG, 0.9 * K, ROSE), jauge(XD, 2.0 * K, CIEL)
        e1 = T("900 000", 25, ROSE, audit=False).move_to(P(XG, -0.95))
        e2 = T("2 000 000", 25, CIEL, audit=False).move_to(P(XD, -0.95))
        for j, e, mot, rt in ((j1, e1, "900 000", 0.5), (j2, e2, "2 000 000", 0.8)):
            self.au(mot, GrowFromEdge(j.barre, DOWN), FadeIn(j.gant, shift=UP * 0.2), FadeIn(e, shift=DOWN * 0.15), rt=rt)
        dec = T("L'exposant décide d'abord :", 26).move_to(P(0, -1.6))
        self.au("L'exposant", FadeIn(dec, shift=UP * 0.1), Indicate(n1.p.expo, color=EXPO_C, scale_factor=1.8),
                Indicate(n2.p.expo, color=EXPO_C, scale_factor=1.8), rt=0.5)
        bat = ligne_base(VGroup(T("6", 56, VERT_OK), T("bat", 36), T("5", 56, PIEGE)).arrange(RIGHT, buff=0.3))
        bat[1].align_to(bat[0], DOWN)
        bat.move_to(P(0, -2.35))
        self.au("6 bat", FadeIn(bat[0], scale=1.5), FadeIn(bat[1]), n2.p.expo.animate.set_color(VERT_OK), rt=0.3)
        self.play(j2.gant.animate.shift(LEFT * 0.75), run_time=0.15)
        self.au("5.", FadeIn(bat[2], scale=1.3), j2.gant.animate.shift(RIGHT * 0.75),
                j1.animate.set_opacity(0.35), Wiggle(n1.p.expo), rt=0.35)
        self.insister(bat[0], 1.5, 0.2)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) : 7 × 10² contre 1 × 10³ ──
        choix = [notation("7", "2", fs=30), notation("1", "3", fs=30), T("égalité", 30)]
        plans = [[("7 fois", [choix[0].m, choix[0].x]), ("10 puissance", [choix[0].p.base]), ("2.", [choix[0].p.expo])],
                 [("1 fois", [choix[1].m, choix[1].x]), ("10 puissance", [choix[1].p.base]), ("3.", [choix[1].p.expo])],
                 [("égalité", [choix[2]])]]
        q1, q2 = notation("7", "2", fs=34), notation("1", "3", fs=34)
        qm = T("?", 34, EXPO_C, audit=False)

        def avant(sc, q):
            y0 = q[0].get_y()
            ligne = VGroup(q1, q[0], q2, qm).arrange(RIGHT, buff=0.2)
            ligne_base(ligne)
            if ligne.width > 3.9:
                ligne.scale_to_fit_width(3.9)
            ligne.move_to(P(0, y0))
            sc.poser_nota(q1, "7 fois", "2,")
            sc.au("contre", FadeIn(q[0], shift=UP * 0.12), rt=0.25)
            sc.poser_nota(q2, "1 fois", "3 ?")
            sc.play(FadeIn(qm, scale=1.4), run_time=0.2)

        def apres(sc):
            sc.pieges(0, 2)
            l1 = sans_audit(sc.rep_ligne(0, ["1 000", "contre", "700."]))
            for m, mot in zip(l1, ("1 000", "contre", "700")):
                sc.au(mot, FadeIn(m, shift=UP * 0.12), rt=0.25)
            l2 = sc.rep_ligne(1, ["L'exposant", "3"])
            l2.add(*sc.rep_ligne(2, ["bat l'exposant", "2."]))
            sc.au("L'exposant", FadeIn(l2[0], shift=UP * 0.12), rt=0.25)
            sc.au("3 bat", FadeIn(l2[1], scale=1.3), Indicate(choix[1].p.expo, color=VERT_OK, scale_factor=1.8), rt=0.3)
            sc.au("bat l'exposant", FadeIn(l2[2], shift=UP * 0.12), rt=0.25)
            sc.au("2.", FadeIn(l2[3], scale=1.3), Indicate(choix[0].p.expo, color=PIEGE, scale_factor=1.6), rt=0.3)
            sc.insister(l2[1], 1.5, 0.2)

        self.qpause("01q-question", "01r-reponse", ["contre"], choix, plans, 1,
                    ["1 000 contre 700.", "L'exposant 3", "bat l'exposant 2."], avant=avant, apres=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire : 9,9 × 10⁻⁴ contre 1 × 10⁻³ ──
        self.dire("02-question")
        rg = ring()
        m1 = notation("9,9", "−4", fs=30).move_to(P(-1.0, Y_N))
        m2 = notation("1", "−3", fs=30).move_to(P(XD, Y_N))
        vs = T("VS", 26, JAUNE_TITRE, audit=False).move_to(P(0, Y_N - 0.5))
        self.au("9,9 fois", FadeIn(rg), FadeIn(m1.m, scale=1.3), FadeIn(m1.x), rt=0.4)
        self.au("10 puissance", FadeIn(m1.p.base, scale=1.3), rt=0.3)
        self.au("moins", FadeIn(m1.p.moins, scale=1.6), rt=0.25)
        self.au("4,", FadeIn(m1.p.chif, scale=1.6), rt=0.3)
        self.au("contre", FadeIn(vs, scale=1.5), rt=0.3)
        self.poser_nota(m2, "1 fois", "3 :", moins=True)
        js = [jauge(x, 0.75, GREY_B) for x in (XG, XD)]
        qs = [T("?", 40, EXPO_C, audit=False).move_to(j.barre) for j in js]
        carte = self.carte()
        lq = VGroup(T("Lequel est", 32), T("le plus grand ?", 32)).arrange(DOWN, buff=0.1).move_to(P(0, -0.75))
        self.au("lequel", FadeIn(carte), FadeIn(lq, shift=UP * 0.12),
                *[GrowFromEdge(j.barre, DOWN) for j in js], *[FadeIn(j.gant) for j in js], rt=0.45)
        self.play(*[FadeIn(q, scale=1.5) for q in qs], run_time=0.3)
        self.appel_commentaire(-2.05)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])

    def appel_commentaire(self, y):
        self.au("Réponds en commentaire")
        appel = self.borne(T("Réponds en commentaire !", 32, VERT_OK), 0.95).move_to(P(0, y))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.0)
        return appel
