# puissance_zero_negatif_short.py
# EleveAI — Maths 4e — série PUISSANCES, épisode 04 « zéro et négatif », le
# SHORT ceinture BLANCHE « L'escalier des puissances » : a⁰ = 1, pas 0.
#   · ACCROCHE : « 2026⁰ » en grand, = ? ; « ce n'est pas 0 » (0 rouge barré) ;
#   · EN HAUT, l'image : Ti-Margo descend un escalier de trois marches, chaque
#     marche porte sa valeur (9, 3, 1, en VERT) ;
#   · EN BAS, au même instant, juste sous chaque marche : 3², 3¹, 3⁰ (base
#     BLEUE, exposant ORANGE), « = 9 », « = 3 », « = 1 », et une flèche
#     « ÷ 3 » d'une marche à l'autre ;
#   · 1 question-pause (3 s) : 2026⁰ → 0 / 1 / 2026 ;
#   · fin : 1 000 000⁰, réponse en commentaire (⛔ jamais 0⁰), puis la fin
#     standard.
# Micro du coach : 4e puissance_exposant_negatif (la puissance zéro).
# Centres d'intérêt : jeux-defis.
#
# Voix : manim/voix/4e-puissance-zero-negatif-short.json (validée), débit −6 ;
# WAV : public/sons/4e-puissance-zero-negatif-short/ ; marques :
# manim/scripts/4e/puissance_zero_negatif_short_marques.json
# (marques_dump.ps1 + cues2marques.py, relues : aucun mot répété fusionné à
# tort).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/puissance_zero_negatif_short.py PuissanceZeroNegatifShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/puissance_zero_negatif_short.py PuissanceZeroNegatifShort -o eleveai-maths-4e-puissance-zero-negatif-short --media_dir manim/scripts/4e/media-puiss-04-short
# Sortie : manim/sorties/4e/maths/puissances/04-zero-negatif/eleveai-maths-4e-puissance-zero-negatif-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "6e"))

from prop_commun import *  # noqa: E402,F403
from mascotte import MascotteMargouillat  # noqa: E402

sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

EXPO_C = ORANGE_RETENUE
ROUGE_P = "#ef4444"
CIEL = "#93c5fd"
XS = (-1.35, 0.0, 1.35)        # les trois marches, et leurs colonnes en bas
Y_SOL = 0.1                   # le pied de l'escalier
HAUTS = (1.55, 1.1, 0.65)     # le dessus de chaque marche
Y_P, Y_V = -0.95, -1.62        # en bas : la puissance, puis « = valeur »


def tx(s, fs=34, couleur=WHITE, gras=False, audit=True):
    """Un texte posé AU MOT par le script (pas d'attente automatique)."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD if gras else NORMAL)
    t.sans_synchro = True
    if not audit:
        t._pas_audit = True
    if t.width > 3.9:
        t.scale_to_fit_width(3.9)
    return t


def puissance(base, exp, fs=64, audit=True, cb=BLEU_CALCUL):
    """La base en BLEU, l'exposant en ORANGE, petit et haut (pas de LaTeX)."""
    b = tx(str(base), fs, cb, True, audit)
    e = tx(str(exp), int(fs * 0.55), EXPO_C, True, audit)
    e.next_to(b, RIGHT, buff=0.04).align_to(b, UP).shift(UP * 0.16 * fs / 64)
    g = VGroup(b, e)
    g.base, g.exp = b, e
    return g


def marche(k):
    """La marche k : un bloc de pierre (de Y_SOL au dessus HAUTS[k])."""
    w = 1.35
    h = HAUTS[k] - Y_SOL
    bloc = Rectangle(width=w, height=h, fill_color="#475569", fill_opacity=1, stroke_color="#94a3b8",
                     stroke_width=2).move_to(P(XS[k], Y_SOL + h / 2))
    dessus = Line(P(XS[k] - w / 2, HAUTS[k]), P(XS[k] + w / 2, HAUTS[k]), color="#e2e8f0", stroke_width=5)
    return VGroup(bloc, dessus)


class PuissanceZeroNegatifShort(ShortProp):
    nom_voix = "4e-puissance-zero-negatif-short"
    fichier_marques = "puissance_zero_negatif_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    def au(self, extrait, *anims, n=1, rt=0.35):
        self.au_mot(extrait, n)
        if anims:
            self.play(*anims, run_time=rt)

    def _disposer_q(self, question, choix, phrase):
        """« Question ! » et le compte à rebours reculent vers la gauche (3 %)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = rebours.get_right()[0] - 1.9
        if d > 0:
            tete.shift(LEFT * d)
            rebours.shift(LEFT * d)
        return tete, q, cartes, pause, rebours, ph

    def appel_commentaire(self, y):
        self.au_mot("Réponds en commentaire")
        appel = self.borne(tx("Réponds en commentaire !", 32, VERT_OK, True), 0.95).move_to(P(0, y))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.0)
        return appel

    def fin_short(self, voix, a_effacer):
        """La fin du 19/10 (celle des shorts de l'épisode 01 et 03)."""
        self.dire(voix)
        entraine = tx("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.2))
        site = tx("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.25))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = tx("Abonne-toi !", 42, VERT_OK).move_to(P(0, -0.2))
        poignee = tx("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -1.05))
        self.play(FadeOut(Group(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)

    def carte(self):
        return RoundedRectangle(width=4.05, height=2.75, corner_radius=0.18, fill_color="#0b1220", fill_opacity=1,
                                stroke_color="#334155", stroke_width=2).move_to(P(0, -1.43))

    def sur_marche(self, k):
        """La place de Ti-Margo debout sur la marche k."""
        return P(XS[k] - 0.15, HAUTS[k] + self.petit.height / 2 + 0.02)

    def sauter(self, k, *avec, rt=0.5):
        """Ti-Margo saute sur la marche k (un petit arc)."""
        cible = self.sur_marche(k)
        self.play(self.petit.animate(path_arc=-PI * 0.6).move_to(cible), *avec, run_time=rt)

    def fleche(self, k):
        """La flèche « ÷ 3 » sous les valeurs, de la colonne k à la suivante."""
        y = Y_V - 0.3
        f = CurvedArrow(P(XS[k] + 0.2, y), P(XS[k + 1] - 0.2, y), angle=PI * 0.55, color=CIEL, stroke_width=4,
                        tip_length=0.15)
        lab = tx("÷ 3", 28, CIEL, True).move_to(P((XS[k] + XS[k + 1]) / 2, f.get_bottom()[1] - 0.22))
        return VGroup(f, lab)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("L'escalier des puissances", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : 2026⁰ en grand ──
        self.dire("00-accroche")
        p = puissance(2026, 0, 78).move_to(P(-0.1, 1.05))
        self.au("2026 puissance", Write(titre), FadeIn(p.base, scale=1.1), rt=0.45)
        eg = VGroup(tx("=", 80), tx("?", 90, EXPO_C, True)).arrange(RIGHT, buff=0.3).move_to(P(0, -0.25))
        self.au("0. Ça", FadeIn(p.exp, scale=1.8), rt=0.35)
        self.insister(p.exp, 1.6, 0.2)
        cb = tx("Ça fait combien ?", 36, WHITE, True).move_to(P(0, -1.25))
        self.au("Ça fait", FadeIn(eg, scale=1.2), FadeIn(cb, shift=UP * 0.15), rt=0.4)
        ind = tx("Un indice :", 32, CIEL).move_to(P(0, -1.95))
        self.au("Un indice", FadeIn(ind, shift=UP * 0.15), rt=0.3)
        pas = VGroup(tx("ce n'est pas", 34), tx("0", 40, ROUGE_P, True), tx("!", 34)).arrange(RIGHT, buff=0.18)
        pas.move_to(P(0, -2.55))
        self.au("ce n'est", FadeIn(pas[0], shift=UP * 0.15), rt=0.3)
        self.au("0.", FadeIn(pas[1], scale=1.4), FadeIn(pas[2]), n=2, rt=0.3)
        barre = Line(pas[1].get_corner(DL) + P(-0.06, -0.04), pas[1].get_corner(UR) + P(0.06, 0.04), color=WHITE,
                     stroke_width=6)
        self.play(Create(barre), Indicate(eg[1], color=EXPO_C, scale_factor=1.3), run_time=0.35)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 01 : l'escalier : 3² = 9, 3¹ = 3, 3⁰ = 1 ──
        self.dire("01-escalier")
        marches = VGroup(*[marche(k) for k in range(3)])
        carte = self.carte()
        self.petit = MascotteMargouillat().scale(0.2)
        self.petit.move_to(self.sur_marche(0))
        self.au("Descends", LaggedStart(*[FadeIn(m, shift=UP * 0.2) for m in marches], lag_ratio=0.3),
                FadeIn(carte), rt=0.6)
        self.play(FadeIn(self.petit, shift=DOWN * 0.3), run_time=0.3)
        ent = VGroup(tx("Les puissances de", 24), tx("3", 24, BLEU_CALCUL, True)).arrange(RIGHT, buff=0.12)
        ent.move_to(P(0, -0.3))
        self.au("des puissances", FadeIn(ent[0], shift=UP * 0.12), rt=0.3)
        self.au("3. 3 puis", FadeIn(ent[1], scale=1.3), rt=0.3)
        vals, pw, eqs, curs = [], [], [], []
        mots = (("2 : 9", "9."), ("1 : 3", "3. À"), ("0 : 3", "1 !"))
        for k, (mot_e, mot_v) in enumerate(mots):
            pk = puissance(3, 2 - k, 60).move_to(P(XS[k], Y_P))
            ek = VGroup(tx("=", 36), tx(str([9, 3, 1][k]), 40, VERT_OK, True)).arrange(RIGHT, buff=0.14)
            ek.move_to(P(XS[k], Y_V))
            vk = tx(str([9, 3, 1][k]), 30, VERT_OK, True).move_to(P(XS[k], (Y_SOL + HAUTS[k]) / 2))
            pw.append(pk)
            eqs.append(ek)
            vals.append(vk)
            self.au_mot("3 puissance", k + 1)
            if k:
                self.sauter(k, FadeIn(pk.base, scale=1.3))
            else:
                self.play(FadeIn(pk.base, scale=1.3), run_time=0.35)
            if k == 2:
                self.au(mot_e, FadeIn(pk.exp, scale=1.6), rt=0.3)
                fl = self.fleche(1)
                self.au("3 divisé", Create(fl[0]), rt=0.3)
                self.au("3, 1", FadeIn(fl[1], shift=UP * 0.1), rt=0.25)
            else:
                self.au(mot_e, FadeIn(pk.exp, scale=1.6), rt=0.3)
            self.au(mot_v, FadeIn(vk, scale=1.4), FadeIn(ek, shift=UP * 0.12), rt=0.35)
            if k == 1:
                self.au("À chaque", LaggedStart(*[Indicate(m[1], color=CIEL, scale_factor=1.04) for m in marches],
                                                 lag_ratio=0.3), rt=0.6)
                self.bring_to_front(*vals[:2])  # les valeurs restent DEVANT les marches
                fl0 = self.fleche(0)
                self.au("on divise", Create(fl0[0]), rt=0.3)
                self.au("3. 3 puis", FadeIn(fl0[1], shift=UP * 0.1), n=2, rt=0.25)
        self.play(VGroup(vals[2], eqs[2]).animate.scale(1.5), run_time=0.3)
        self.play(VGroup(vals[2], eqs[2]).animate.scale(1 / 1.5), Flash(vals[2], color=VERT_OK, line_length=0.18),
                  run_time=0.3)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) : 2026⁰ ? ──
        self.question_pause("01q-question", "01r-reponse", ["Alors, 2026 puissance 0 ?"],
                            [self.t("0", 30), self.t("1", 30), self.t("2026", 30)], 1,
                            ["Réponse B : 1.", "La dernière marche :", "2026 ÷ 2026 = 1"],
                            mot_q="Alors", autres_r=self._rep_q)
        self.vider(garder)

        # ── 02 : la question en commentaire : 1 000 000⁰ ──
        self.dire("02-question")
        marches = VGroup(*[marche(k) for k in range(3)])
        self.petit = MascotteMargouillat().scale(0.2).move_to(self.sur_marche(2))
        q = tx("?", 30, EXPO_C, True).move_to(P(XS[2], (Y_SOL + HAUTS[2]) / 2))
        et = tx("Et", 40).move_to(P(0, -0.35))
        pm = puissance("1 000 000", 0, 44, audit=False).move_to(P(-0.1, -1.15))
        self.au("Et 1", FadeIn(marches, shift=UP * 0.2), FadeIn(self.petit), FadeIn(et, shift=UP * 0.12),
                FadeIn(pm.base, scale=1.05), rt=0.45)
        self.au("0 ?", FadeIn(pm.exp, scale=1.8), FadeIn(q, scale=1.5), rt=0.35)
        self.insister(pm.exp, 1.6, 0.2)
        self.appel_commentaire(-2.2)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])

    def _rep_q(self, sc):
        """La réponse au mot : la dernière marche, 2026 ÷ 2026 = 1."""
        sc.rep(0)
        sc.rep(1)
        lg = sc.ligne_rep(2, ["2026 ÷", "2026 =", "1"])
        for m, (mot, n) in zip(lg, [("2026 par", 1), (" 2026 :", 1), ("1.", 2)]):
            sc.au_mot(mot, n)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.insister(lg[2], 1.5, 0.2)
        sc.rep_fini()
