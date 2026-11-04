# puissance_notation_scientifique_short.py
# EleveAI — Maths 4e — série PUISSANCES, épisode 05 « notation scientifique »,
# le SHORT ceinture BLANCHE « 8 milliards en une ligne ».
#   · EN HAUT, l'image : la planète, puis la foule de silhouettes qui se
#     multiplie ; plus tard le globule rouge ; enfin la Terre ;
#   · EN BAS, au même instant : « 8 000 000 000 », ses 9 zéros comptés (1…9,
#     ORANGE) qui S'ENVOLENT dans l'exposant → 8 × 10⁹ (10 en BLEU) ;
#     puis 0,000 007 et la virgule qui saute 6 rangs → 7 × 10⁻⁶ ;
#   · 1 question-pause (3 s) : 3 millions → 3 × 10⁶ / 3 × 10³ / 30 × 10⁵ ;
#   · fin : la masse de la Terre, « 6 suivi de 24 zéros » (jamais écrit en
#     entier), réponse en commentaire, puis la fin standard.
# Micro du coach : 4e puissance_notation_scientifique.
# Centres d'intérêt : espace, corps-sante.
#
# Voix : manim/voix/4e-puissance-notation-scientifique-short.json (validée),
# débit −6 ; WAV : public/sons/4e-puissance-notation-scientifique-short/ ;
# marques : puissance_notation_scientifique_short_marques.json (marques_dump
# + cues2marques, relues : aucun mot répété perdu).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/puissance_notation_scientifique_short.py PuissanceNotationScientifiqueShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/puissance_notation_scientifique_short.py PuissanceNotationScientifiqueShort -o eleveai-maths-4e-puissance-notation-scientifique-short --media_dir manim/scripts/4e/media-puiss-05-short
# Sortie : manim/sorties/4e/maths/puissances/05-notation-scientifique/eleveai-maths-4e-puissance-notation-scientifique-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "6e"))

from prop_commun import *  # noqa: E402,F403

sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from puissance_notation_scientifique import OutilsNotation, Rangee, globule, ligne_base, notation, silhouette  # noqa: E402
from puissance_notation_scientifique import T as T_paysage  # noqa: E402

EXPO_C = ORANGE_RETENUE
CIEL = "#93c5fd"


def T(s, fs=34, c=WHITE, audit=True, largeur=3.6):
    """Le texte de la paysage, borné à la largeur du cadre étroit (3 %)."""
    t = T_paysage(s, fs, c, audit)
    if t.width > largeur:
        t.scale_to_fit_width(largeur)
    return t


def planete(r=0.7):
    """La Terre, schématique : un disque bleu, trois continents verts."""
    mer = Circle(radius=r, fill_color="#1d4ed8", fill_opacity=1, stroke_color="#93c5fd", stroke_width=3)
    terres = VGroup(*[Ellipse(width=r * w, height=r * h, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
                      .rotate(a).move_to(mer.get_center() + P(r * x, r * y))
                      for w, h, a, x, y in ((0.7, 1.0, 0.3, -0.35, 0.25), (0.55, 0.8, -0.2, 0.35, -0.2),
                                            (0.9, 0.45, 0.1, 0.25, 0.5))])
    return VGroup(mer, terres)


class PuissanceNotationScientifiqueShort(OutilsNotation, ShortProp):
    nom_voix = "4e-puissance-notation-scientifique-short"
    fichier_marques = "puissance_notation_scientifique_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """« Question ! » et le compte à rebours reculent vers la gauche (3 %)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = rebours.get_right()[0] - 1.9
        if d > 0:
            tete.shift(LEFT * d)
            rebours.shift(LEFT * d)
        return tete, q, cartes, pause, rebours, ph

    def fin_short(self, voix, a_effacer):
        """La fin du 19/10 (celle des shorts des épisodes 01, 03 et 04)."""
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

    def carte(self, haut=0.55, bas=-2.95):
        return RoundedRectangle(width=4.15, height=haut - bas, corner_radius=0.18, fill_color="#0b1220",
                                fill_opacity=1, stroke_color="#334155", stroke_width=2).move_to(P(0, (haut + bas) / 2))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("La notation scientifique", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : 8 milliards d'humains, et tous ces zéros ──
        self.dire("00-accroche")
        terre = planete(0.62).move_to(P(-0.95, 1.4))
        carte = self.carte()
        nb = T("8 000 000 000", 38, WHITE, audit=False).move_to(P(0, -0.3))
        zeros = VGroup(*nb[1:])
        hum = T("d'humains", 30, CIEL).next_to(terre, RIGHT, buff=0.25)
        self.au("8 milliards", Write(titre), FadeIn(terre, scale=0.6), FadeIn(carte), FadeIn(nb, scale=1.1), rt=0.5)
        self.au("d'humains", FadeIn(hum, shift=LEFT * 0.15), Rotate(terre[1], angle=0.4, about_point=terre.get_center()),
                rt=0.4)
        q1 = T("Comment l'écrire", 30).move_to(P(0, -0.95))
        q2 = ligne_base(VGroup(T("sans aligner les", 30), T("zéros ?", 30, EXPO_C)).arrange(RIGHT, buff=0.15))
        q2.scale_to_fit_width(min(q2.width, 3.9)).move_to(P(0, -1.5))
        self.au("Comment", FadeIn(q1, shift=UP * 0.15), rt=0.3)
        self.au("sans", FadeIn(q2[0], shift=UP * 0.15), rt=0.3)
        self.au("zéros", FadeIn(q2[1], scale=1.3), zeros.animate.set_color(EXPO_C), rt=0.35)
        self.play(LaggedStart(*[Indicate(z, color=EXPO_C, scale_factor=1.4) for z in zeros], lag_ratio=0.1),
                  run_time=0.8)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(q1), FadeOut(q2), FadeOut(hum), run_time=0.3)

        # ── 01 : la foule qui se multiplie ; les 9 zéros s'envolent → 8 × 10⁹ ──
        self.dire("01-humains")
        foule = VGroup(*[silhouette(s=1.2) for _ in range(30)]).arrange_in_grid(3, 10, buff=(0.12, 0.08))
        foule.scale_to_fit_width(3.4).move_to(P(0, 1.42))
        mil = T("8 milliards :", 28, CIEL).move_to(P(0, 0.25))
        self.au("8 milliards", FadeOut(terre, scale=0.4), FadeIn(mil, shift=DOWN * 0.1),
                LaggedStart(*[FadeIn(f, scale=0.2) for f in foule], lag_ratio=0.03), rt=0.9)
        self.au("8 suivi", nb[0].animate.set_color(VERT_OK), Indicate(nb[0], color=VERT_OK, scale_factor=1.4), rt=0.35)
        cpt = VGroup(*[T(str(k + 1), 20, EXPO_C, audit=False).next_to(z, DOWN, buff=0.12) for k, z in enumerate(zeros)])
        self.play(LaggedStart(*[FadeIn(c, scale=1.5) for c in cpt[:8]], lag_ratio=0.25), run_time=0.45)
        neuf = T("9 zéros", 30, EXPO_C).move_to(P(0, -1.15))
        self.au("9", FadeIn(cpt[8], scale=1.5), FadeIn(neuf, shift=UP * 0.12), rt=0.3)
        self.insister(neuf, 1.3, 0.2)
        res = notation("8", "9", fs=80)
        res.m.set_color(VERT_OK)
        res.move_to(P(0, -2.1))
        self.au("8 fois", FadeIn(res.m, scale=1.3), FadeIn(res.x), rt=0.35)
        self.au("10 puissance", FadeIn(res.p.base, scale=1.3), rt=0.3)
        vol = VGroup(*[z.copy() for z in zeros])
        self.add(vol)
        self.au("9.", *[Transform(z, res.p.expo.copy(), path_arc=-PI * 0.4) for z in vol],
                zeros.animate.set_opacity(0.3), FadeOut(cpt), rt=0.7)
        self.remove(vol)
        self.add(res.p.expo)
        self.insister(res.p.expo, 1.6, 0.25)
        self.play(Create(SurroundingRectangle(res, color=VERT_OK, buff=0.12, corner_radius=0.1)), run_time=0.3)
        self.attendre_voix(marge=0.5)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) : 3 millions ? ──
        choix = [notation("3", "6", fs=30), notation("3", "3", fs=30), notation("30", "5", fs=30)]
        plans = [[("3 fois", [c.m, c.x]), ("10 puissance", [c.p.base]), (e, [c.p.expo])]
                 for c, e in ((choix[0], "6."), (choix[1], "3."))]
        plans.append([("30 fois", [choix[2].m, choix[2].x]), ("10 puissance", [choix[2].p.base]),
                      ("5.", [choix[2].p.expo])])

        def avant(sc, q):
            sc.poser_mots(q[0], [("Et 3", "Et 3"), ("millions", "millions")])

        def apres(sc):
            l0 = sc.rep_nota(0, "Réponse A :", "3", "6")
            sc.au("A :", FadeIn(l0.pre, shift=UP * 0.12), rt=0.25)
            sc.au("3 fois", FadeIn(l0.nt.m, l0.nt.x, shift=UP * 0.12), rt=0.25)
            sc.au("10 puissance", FadeIn(l0.nt.p.base, shift=UP * 0.12), rt=0.25)
            sc.au("6.", FadeIn(l0.nt.p.expo, l0.pt, shift=UP * 0.12), rt=0.25)
            sc.pieges(1, 2)
            l1 = sc.rep_ligne(1, ["Un 3 suivi", "de 6", "zéros."])
            sc.au("3 suivi", FadeIn(l1[0], shift=UP * 0.12), rt=0.25)
            sc.au("6", FadeIn(l1[1], shift=UP * 0.12), rt=0.25)
            sc.au("zéros", FadeIn(l1[2], shift=UP * 0.12), rt=0.25)
            sc.insister(l1, 1.15, 0.2)

        self.qpause("01q-question", "01r-reponse", ["Et 3 millions ?"], choix, plans, 0,
                    ["Réponse A : 3 × 10⁶.", "Un 3 suivi de 6 zéros."], avant=avant, apres=apres)
        self.vider(garder)

        # ── 02 : le minuscule : le globule rouge, 0,000 007 → 7 × 10⁻⁶ ──
        self.dire("02-petit")
        carte = self.carte()
        et = T("Et le minuscule ?", 28, CIEL).move_to(P(0, 0.3))
        self.au("Et le", FadeIn(carte), FadeIn(et, shift=DOWN * 0.1), rt=0.4)
        glo = globule(0.55).move_to(P(-1.15, 1.4))
        lg = VGroup(T("Un globule", 28), T("rouge :", 28)).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        lg.next_to(glo, RIGHT, buff=0.3)
        self.au("Un globule", FadeIn(glo, scale=0.2), FadeIn(lg[0], shift=LEFT * 0.1), rt=0.45)
        self.au("rouge", FadeIn(lg[1], shift=LEFT * 0.1), Indicate(glo, color=WHITE, scale_factor=1.15), rt=0.35)
        rg = Rangee("0000007", 0, fs=52, groupes=(3,), y=-1.0)
        rg.shift(RIGHT * (-rg.ch.get_center()[0]))
        mt = T("mètre", 28).next_to(rg.ch, DOWN, buff=0.15).align_to(rg.ch, RIGHT)
        self.au("0,000", FadeIn(rg.ch[:4], shift=DOWN * 0.1), FadeIn(rg.virg), rt=0.35)
        self.au("007", FadeIn(rg.ch[4:], shift=DOWN * 0.1), rt=0.3)
        self.au("mètre", FadeIn(mt, shift=UP * 0.1), rt=0.25)
        for k in range(5):
            self.saut(rg, k, k + 1, k + 1, rt=0.22, fs_c=22)
        res = notation("7", "−6", fs=62)
        res.m.set_color(VERT_OK)
        res.move_to(P(0, -2.35))
        self.au("7 fois", FadeIn(res.m, scale=1.3), FadeIn(res.x), rg.ch[6].animate.set_color(VERT_OK), rt=0.35)
        self.au("10 puissance", FadeIn(res.p.base, scale=1.3), rt=0.3)
        self.au("moins")
        s6 = self.saut(rg, 5, 6, None, rt=0.22, avec=[FadeIn(res.p.moins, scale=1.8)])
        six = T("6", 30, EXPO_C).next_to(s6[0], UP, buff=0.04)
        self.au("6.", FadeIn(six, scale=1.6), rt=0.25)
        self.play(ReplacementTransform(six.copy(), res.p.chif), rg.ch[:6].animate.set_opacity(0.3), run_time=0.35)
        self.insister(res.p.expo, 1.5, 0.2)
        self.play(Create(SurroundingRectangle(res, color=VERT_OK, buff=0.12, corner_radius=0.1)), run_time=0.3)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 03 : la question en commentaire : la masse de la Terre ──
        self.dire("03-question")
        tour = T("À ton tour :", 30, JAUNE_TITRE).move_to(P(0, 2.1))
        terre = planete(0.5).move_to(P(-1.0, 1.25))
        kg = T("? kg", 34, EXPO_C, audit=False).next_to(terre, RIGHT, buff=0.35)
        carte = self.carte(0.5, -2.95)
        self.au("À ton", FadeIn(tour, shift=DOWN * 0.1), FadeIn(carte), rt=0.35)
        l1 = T("La Terre pèse environ", 28).move_to(P(0, 0.15))
        self.au("la Terre", FadeIn(terre, scale=0.5), FadeIn(l1, shift=UP * 0.1), rt=0.4)
        l2 = VGroup(T("6", 36, VERT_OK), T("suivi de", 28), T("24", 36, EXPO_C), T("zéros", 28, EXPO_C))
        ligne_base(l2.arrange(RIGHT, buff=0.13)).move_to(P(0, -0.5))
        if l2.width > 3.6:
            l2.scale_to_fit_width(3.6)
        for m in (l2[1], l2[3]):
            m.align_to(l2[0], DOWN)
        self.au("6 suivi", FadeIn(l2[0], scale=1.3), FadeIn(l2[1], shift=RIGHT * 0.1), rt=0.3)
        self.au("24", FadeIn(l2[2], scale=1.4), rt=0.3)
        self.au("zéros", FadeIn(l2[3], shift=LEFT * 0.1), rt=0.25)
        l3 = T("kilogrammes.", 30).move_to(P(0, -1.05))
        self.au("kilogrammes", FadeIn(l3, shift=UP * 0.1), FadeIn(kg, scale=1.3), rt=0.3)
        l4 = VGroup(T("Écris-le en notation", 26), T("scientifique.", 26)).arrange(DOWN, buff=0.12).move_to(P(0, -1.7))
        fo = notation("6", "?", fs=52, audit=False)
        fo.p.expo.set_color(EXPO_C)
        fo.move_to(P(0, -2.5))
        self.au("Écris-le", FadeIn(l4[0], shift=UP * 0.1), rt=0.35)
        self.au("scientifique", FadeIn(l4[1], shift=UP * 0.1), FadeIn(fo, scale=1.2), rt=0.4)
        self.insister(fo.p.expo, 1.6, 0.2)
        self.au("Réponds en commentaire")
        appel = self.borne(T("Réponds en commentaire !", 30, VERT_OK), 0.95).move_to(P(0, 2.1))
        self.play(FadeOut(tour, shift=UP * 0.1), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.0)

        # ── 04 : la fin standard ──
        self.fin_short("04-abonne", [m for m in self.mobjects if m is not margo])
