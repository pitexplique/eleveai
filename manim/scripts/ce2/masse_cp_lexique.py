# masse_cp_lexique.py
# EleveAI — Maths CP — série « Masses » (CP → CM2), ÉPISODE CP 01 : lourd ou léger ?
# (micro cp_masse_lexique, notion masse_contenance), AVEC VOIX. Paysage 16:9, CEINTURE BLANCHE.
# Short jumeau : film Ti Margo (le gros ballon de plage, la petite bille en fer).
# Décor et métier : Awa, DÉMÉNAGEUSE (centres : métiers, maison).
# Mapping micro → écrans : 02 (lourd / léger : carton de livres, oreiller), 03 (soupeser : une main par objet),
# 04 question (plume / dictionnaire), 05 piège (gros ne veut pas dire lourd : ballon, bille, balance),
# 06 question (ballon / bille), 07 défi (oreiller, carton, chaise), 07b correction, 08 ce que tu as appris.
# Voix : manim/voix/cp-masse-lexique.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:lexique:cp
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_cp_lexique.py MasseLexiqueCP
# python -m manim render -qh --disable_caching manim/scripts/ce2/masse_cp_lexique.py MasseLexiqueCP -o eleveai-maths-cp-masse-lexique --media_dir manim/scripts/ce2/media-mas-cp01
# Sortie : manim/sorties/cp/maths/masse/01-lexique/eleveai-maths-cp-masse-lexique.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from masse_commun import *  # noqa: E402,F403

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["cp-masse-lexique"]
Q1, Q2 = EP["questions"]


def court(s):
    return s[0].upper() + s[1:]


def fleche(debut, fin, couleur):
    return Arrow(debut, fin, color=couleur, stroke_width=8, buff=0, max_tip_length_to_length_ratio=0.3)


class MasseLexiqueBase(PaysageMasse):
    nom_voix = "cp-masse-lexique"
    fichier_marques = "masse_cp_lexique_marques.json"
    ceinture = "blanche"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lourd ou léger ?", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Lourd ou léger")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Le plus lourd :", 40, JAUNE_TITRE)
        q1 = self.t("un carton de livres,", 40, JAUNE_TITRE)
        q2 = self.t("ou un oreiller ?", 40, JAUNE_TITRE)
        q = VGroup(q0, q1, q2).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        ca = VGroup(carton("livres", 0.85)).move_to(P(2.6, 0.35))
        o = oreiller(0.85).move_to(P(4.9, 0.35))
        self.au_mot("Qu'est-ce qui est le plus lourd")
        self.play(FadeIn(q0, shift=UP * 0.2), run_time=0.35)
        self.au_mot("un carton de livres")
        self.play(FadeIn(q1, shift=UP * 0.2), FadeIn(ca, scale=1.1), run_time=0.35)
        self.au_mot("ou un oreiller")
        self.play(FadeIn(q2, shift=UP * 0.2), FadeIn(o, scale=1.1), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Awa, déménageuse ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = awa(0.95).move_to(P(-5.0, 0.2))
        nom = self.t("Awa", 42, "#fb923c").next_to(pe, UP, buff=0.4)
        self.au_mot("Voici Awa")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est déménageuse")
        met = self.t("déménageuse", 30, "#fb923c").next_to(pe, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Toute la journée")
        l0 = self.bloc(["Toute la journée,", "elle porte des cartons."], 34, GRAY_B)
        self.col(l0, 2.5, -2.6)
        cartons = VGroup(carton(None, 0.8), carton(None, 0.6, "#d6a565"), carton(None, 0.7, "#b07a3c"))
        cartons.arrange(RIGHT, buff=0.35, aligned_edge=DOWN).move_to(P(0.8, -0.4))
        self.play(FadeIn(l0, shift=UP * 0.1), LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in cartons],
                                                        lag_ratio=0.3), run_time=0.6)
        self.au_mot("Certains sont lourds")
        l1 = self.t("Certains sont lourds.", 36, LOURD)
        gauche(l1, -2.6, -2.1)
        self.play(FadeIn(l1, shift=UP * 0.1), cartons[0].animate.shift(DOWN * 0.12), run_time=0.4)
        self.au_mot("D'autres sont légers")
        l2 = self.t("D'autres sont légers.", 36, LEGER)
        gauche(l2, -2.6, -2.85)
        self.play(FadeIn(l2, shift=UP * 0.1), cartons[1].animate.shift(UP * 0.25), run_time=0.4)
        self.attendre_voix()

    # ── 02 : lourd, léger ───────────────────────────────────────────────────
    def ecran_lourd_leger(self):
        self.ecran("02-lourd-leger")
        # à gauche : le carton de livres, porté avec peine
        ca = carton("livres", 1.4).move_to(P(-4.2, 0.95))
        l0 = self.t("Un carton de livres", 34).move_to(P(-4.2, 2.6))
        self.au_mot("Un carton de livres")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(ca, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("avec peine")
        self.play(ca.animate.shift(DOWN * 0.35), Wiggle(ca, scale_value=1.04), run_time=0.6)
        self.au_mot("Il est lourd")
        fl = fleche(P(-4.2, -0.35), P(-4.2, -1.45), LOURD)
        lo = self.t("lourd", 56, LOURD).move_to(P(-4.2, -2.1))
        self.play(GrowArrow(fl), FadeIn(lo, scale=1.3), run_time=0.45)
        # à droite : l'oreiller, soulevé d'un doigt
        o = oreiller(1.4).move_to(P(2.2, 0.6))
        l1 = self.t("Un oreiller", 34).move_to(P(2.2, 2.6))
        self.au_mot("Un oreiller")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(o, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("d'un doigt")
        self.play(o.animate.shift(UP * 0.5), run_time=0.5)
        self.au_mot("Il est léger")
        fl2 = fleche(P(2.2, -1.45), P(2.2, -0.35), LEGER)
        le = self.t("léger", 56, LEGER).move_to(P(2.2, -2.1))
        self.play(GrowArrow(fl2), FadeIn(le, scale=1.3), run_time=0.45)
        self.attendre_voix()

    # ── 03 : soupeser ───────────────────────────────────────────────────────
    def ecran_soupeser(self):
        self.ecran("03-soupeser")
        self.au_mot("on soupèse")
        tit = self.t("On soupèse !", 48, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.4)
        mg = main_ouverte(1.1).move_to(P(-2.6, -0.6))
        md = main_ouverte(1.1, miroir=True).move_to(P(2.0, -0.6))
        ca = carton("livres", 0.75)
        ca.move_to(mg.paume.get_top(), aligned_edge=DOWN)
        o = oreiller(0.75)
        o.move_to(md.paume.get_top(), aligned_edge=DOWN)
        self.au_mot("On prend un objet")
        l0 = self.t("Un objet dans chaque main.", 34).move_to(P(0, 2.1))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(mg, shift=UP * 0.3), FadeIn(md, shift=UP * 0.3), run_time=0.45)
        self.play(FadeIn(ca, shift=DOWN * 0.3), FadeIn(o, shift=DOWN * 0.3), run_time=0.4)
        res = self.ligne([("La main qui descend", VERT_OK), ("tient le plus lourd.", VERT_OK)], 34, buff=0.2)
        res.move_to(P(-0.3, -3.0))
        self.au_mot("La main qui descend")
        self.play(VGroup(mg, ca).animate.shift(DOWN * 0.7), VGroup(md, o).animate.shift(UP * 0.5),
                  FadeIn(res[0], shift=UP * 0.1), run_time=0.8)
        fl = fleche(P(-4.4, 0.2), P(-4.4, -1.3), LOURD)
        self.play(GrowArrow(fl), run_time=0.3)
        self.au_mot("tient le plus lourd")
        self.play(FadeIn(res[1], scale=1.1), Indicate(ca, color=LOURD, scale_factor=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (plume / dictionnaire) ──────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        fig = VGroup(plume(1.3), dictionnaire(1.4)).arrange(RIGHT, buff=0.8).move_to(P(-3.9, 1.55))

        def autres_q(sc):
            sc.play(FadeIn(fig), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(fig[0], color=VERT_OK, scale_factor=1.15), run_time=0.25)

        self.question_gauche("04-question", "04b-reponse",
                             ["Le plus léger :", "une plume,", "ou un dictionnaire ?"],
                             [self.choix(court(c)) for c in Q1["choix"]], Q1["reponse"],
                             ["La plume est légère :", "on la sent à peine", "dans la main."],
                             -0.75, mot_q="Qu'est-ce qui est le plus léger", autres_q=autres_q, autres_r=apres)

    # ── 05 : le piège : gros ne veut pas dire lourd ─────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Attention")
        tit = self.t("Attention :", 44, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("gros ne veut pas dire lourd")
        t2 = self.t("gros ne veut pas dire lourd !", 44, JAUNE_TITRE).next_to(tit, RIGHT, buff=0.25)
        self.play(FadeIn(t2, shift=UP * 0.1), run_time=0.4)
        b = Balance(5.6).move_to(P(-0.4, -0.2))
        ba = ballon_plage(0.62)
        bi = bille_fer(1.3)
        b.poser(ba, "g")
        b.poser(bi, "d")
        self.add(b)
        self.au_mot("Un gros ballon de plage")
        e1 = self.t("gros ballon", 32, WHITE).move_to(b.sous("g"))
        self.play(FadeIn(ba, shift=DOWN * 0.3), FadeIn(e1), run_time=0.4)
        self.au_mot("est léger")
        l1 = self.t("léger", 44, LEGER).next_to(e1, DOWN, buff=0.15)
        self.play(FadeIn(l1, scale=1.2), run_time=0.3)
        self.au_mot("Une petite bille en fer")
        e2 = self.t("petite bille", 32, WHITE).move_to(b.sous("d"))
        self.play(FadeIn(bi, shift=DOWN * 0.3), FadeIn(e2), run_time=0.4)
        basculer(self, b, -0.6, [ba, e1, l1], [bi, e2], run_time=0.8)
        self.au_mot("est lourde")
        l2 = self.t("lourde", 44, LOURD).next_to(e2, DOWN, buff=0.15)
        self.play(FadeIn(l2, scale=1.2), Indicate(bi, color=LOURD, scale_factor=1.4), run_time=0.45)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (ballon / bille) ────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        fig = VGroup(ballon_plage(0.85), bille_fer(1.7)).arrange(RIGHT, buff=1.2).move_to(P(-3.9, 1.55))

        def autres_q(sc):
            sc.play(FadeIn(fig), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(fig[1], color=VERT_OK, scale_factor=1.4), run_time=0.25)

        self.question_gauche("06-question", "06b-reponse",
                             ["Un gros ballon de plage,", "une petite bille en fer.", "Lequel est le plus lourd ?"],
                             [self.choix(court(c)) for c in Q2["choix"]], Q2["reponse"],
                             ["La bille est petite,", "mais elle est en fer.", "Elle est plus lourde",
                              "que le ballon."],
                             -0.75, mot_q="Un gros ballon de plage", autres_q=autres_q, autres_r=apres)

    # ── 07 : le défi (oreiller, carton, chaise) ─────────────────────────────
    def trois(self):
        return VGroup(oreiller(0.9), carton("livres", 0.9), chaise(1.05)).arrange(RIGHT, buff=1.3, aligned_edge=DOWN)

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = self.trois().move_to(P(-1.6, 0.9))
        self.au_mot("Awa a un oreiller")
        ets = VGroup(*[self.t(s, 30, GRAY_B).next_to(o, DOWN, buff=0.25) for o, s in
                       zip(g, ["un oreiller", "un carton", "une chaise"])])
        ets.align_to(P(0, ets[0].get_y()), UP)
        for o, e, ex in zip(g, ets, ["un oreiller", "un carton de livres", "une chaise"]):
            self.au_mot(ex)
            self.play(FadeIn(o, shift=DOWN * 0.2), FadeIn(e), run_time=0.3)
        self.au_mot("Lequel est le plus léger")
        q = self.t("Lequel est le plus léger ?", 42, JAUNE_TITRE).move_to(P(-0.6, -1.55))
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(g), run_time=0.5)
        self.pause_defi(y=-2.55)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.trois().move_to(P(-1.6, 1.0))
        self.add(g)
        self.au_mot("L'oreiller est le plus léger")
        cad = SurroundingRectangle(g[0], color=VERT_OK, buff=0.2, corner_radius=0.15, stroke_width=6)
        l0 = self.t("L'oreiller est le plus léger.", 40, VERT_OK).move_to(P(-0.6, -0.9))
        self.play(Create(cad), g[0].animate.shift(UP * 0.3), FadeIn(l0, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Le carton et la chaise")
        l1 = self.t("Le carton et la chaise sont plus lourds.", 36, WHITE).move_to(P(-0.6, -1.9))
        self.play(FadeIn(l1, shift=UP * 0.1), g[1:].animate.shift(DOWN * 0.12), run_time=0.45)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        mg = main_ouverte(0.8)
        md = main_ouverte(0.8, miroir=True)
        mains = VGroup(mg, md).arrange(RIGHT, buff=0.5)
        mg.shift(DOWN * 0.3)
        md.shift(UP * 0.2)
        fig = VGroup(mains, carton(None, 0.5).move_to(mg.paume.get_top(), aligned_edge=DOWN),
                     oreiller(0.5).move_to(md.paume.get_top(), aligned_edge=DOWN))
        lignes = self.finale_gauche(fig, textes=[
            ("Lourd ou léger :", "on soupèse avec ses mains."),
            ("Un gros objet", "n'est pas toujours lourd.")], fs=36)
        self.add(fig)
        self.au_mot("Lourd ou léger")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Et un gros objet")
        self.montrer_ligne(lignes[1])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_lourd_leger()
        self.ecran_soupeser()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class MasseLexiqueCP(MasseLexiqueBase):
    identite = "Maths CP — EleveAI"
    ceinture = "blanche"
