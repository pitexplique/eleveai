# solides_decrire.py
# EleveAI — Maths CE2 — série « Solides et espace », épisode 02 : FACES, ARÊTES, SOMMETS
# (micro ce2_solide_decrire, notion solides), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Vidéo COMMUNE : sert aussi au CM1 (`aussi`).
# Short jumeau : film Ti Margo (les gommettes sur les coins du dé : 4, puis 8 ; réponse C).
# Décor et métier : Hugo, LOGISTICIEN (étiquettes = faces, scotch = arêtes, coins en carton = sommets ;
# centres : transports, argent-budget).
# Mapping micro → écrans : 02 (les 6 faces), 03 (les 12 arêtes : 4 + 4 + 4), 04 (les 8 sommets),
# 06 (piège arêtes / sommets), 07 (arêtes cachées en pointillés), questions 05 (sommets du pavé,
# rép. B) et 08 (arêtes du pavé, rép. C), défi 09 (pyramide à base carrée : 5, 8, 5).
# Voix : manim/voix/ce2-solides-decrire.json (validée le 14/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/solides_decrire.py SolidesDecrireCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/solides_decrire.py SolidesDecrireCE2 -o eleveai-maths-ce2-solides-decrire --media_dir manim/scripts/ce2/media-sol-02
# Sortie : manim/sorties/ce2/maths/solides/02-decrire/eleveai-maths-ce2-solides-decrire.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_ce2_commun import *  # noqa: E402,F403

HAUT = [(2, 3), (3, 7), (6, 7), (2, 6)]
BAS = [(0, 1), (1, 5), (4, 5), (0, 4)]
MONTENT = [(0, 3), (1, 2), (5, 6), (4, 7)]
S_HAUT = [3, 2, 6, 7]
S_BAS = [0, 1, 5, 4]


def colis(e=1.0, centre=ORIGIN, L=1.0, h=1.0, p=1.0):
    return pave(L, h, p, e=e, centre=centre, couleur=CARTON, couleur_trait="#fef3c7")


def icone_etiquette(s=1.0):
    return VGroup(RoundedRectangle(width=0.7 * s, height=0.45 * s, corner_radius=0.06 * s, fill_color=WHITE,
                                   fill_opacity=1, stroke_color=FACE_C, stroke_width=3),
                  *[Line(P(-0.22 * s, y * s), P(0.22 * s, y * s), color="#94a3b8", stroke_width=2) for y in (0.07, -0.07)])


def icone_scotch(s=1.0):
    return VGroup(Circle(radius=0.28 * s, fill_color=ARETE_C, fill_opacity=1, stroke_width=0),
                  Circle(radius=0.13 * s, fill_color=BLACK, fill_opacity=1, stroke_width=0),
                  Rectangle(width=0.45 * s, height=0.12 * s, fill_color=ARETE_C, fill_opacity=1, stroke_width=0)
                  .shift(P(0.35 * s, -0.22 * s)))


def icone_coin(s=1.0):
    return Polygon(P(0, 0), P(0.5 * s, 0), P(0.5 * s, 0.12 * s), P(0.12 * s, 0.12 * s), P(0.12 * s, 0.5 * s),
                   P(0, 0.5 * s), fill_color=SOMMET_C, fill_opacity=1, stroke_width=0)


class SolidesDecrireBase(PaysageSolidesCE2):
    nom_voix = "ce2-solides-decrire"
    fichier_marques = "solides_decrire_marques.json"

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Décrire un solide", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Décrire un solide")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        c = colis(1.9, P(3.6, 0.5))
        mots = VGroup(self.t("Faces,", 40, FACE_C), self.t("arêtes,", 40, ARETE_C), self.t("sommets :", 40, SOMMET_C)) \
            .arrange(RIGHT, buff=0.3)
        gauche(mots, -6.2, 1.0)
        self.au_mot("Faces")
        self.play(FadeIn(c), FadeIn(mots[0]), FadeIn(c.face(0, FACE_C, 0.5)), run_time=0.4)
        self.au_mot("arêtes")
        self.play(FadeIn(mots[1]), Create(c.arete_ab(2, 3)), run_time=0.35)
        self.au_mot("sommets")
        self.play(FadeIn(mots[2]), FadeIn(c.sommet(2)), run_time=0.35)
        self.au_mot("comment les compter")
        q = self.t("comment les compter ?", 40)
        gauche(q, -6.2, 0.2)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.6)

    def ecran_situation(self):
        self.ecran("01-situation")
        hp = hugo(1.0).move_to(P(-5.3, 0.3))
        self.au_mot("Voici Hugo")
        nom = self.t("Hugo", 42, BLEU_CALCUL).next_to(hp, UP, buff=0.2)
        self.play(FadeIn(hp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("logisticien")
        met = self.t("logisticien", 30, BLEU_CALCUL).next_to(hp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        cam = VGroup(RoundedRectangle(width=3.2, height=1.4, corner_radius=0.1, fill_color="#1d4ed8", fill_opacity=1,
                                      stroke_width=0),
                     RoundedRectangle(width=1.1, height=1.0, corner_radius=0.1, fill_color="#60a5fa", fill_opacity=1,
                                      stroke_width=0).shift(P(2.15, -0.2)),
                     *[Circle(radius=0.25, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                              stroke_width=3).shift(P(x, -0.8)) for x in (-1.0, 0.8, 2.2)]).move_to(P(3.6, 1.9))
        self.au_mot("qui partent en camion")
        self.play(FadeIn(cam, shift=LEFT * 0.5), run_time=0.45)
        c = colis(1.7, P(-1.5, 0.3))
        self.au_mot("Ce colis est un cube")
        self.play(FadeIn(c, shift=DOWN * 0.2), run_time=0.4)
        ics = [(icone_etiquette(1.3), "des étiquettes", FACE_C, "coller des étiquettes"),
               (icone_scotch(1.3), "du scotch", ARETE_C, "du scotch"),
               (icone_coin(1.3), "les coins", SOMMET_C, "protéger les coins")]
        for k, (ic, txt, col, mot) in enumerate(ics):
            ic.move_to(P(1.3, 0.2 - 0.95 * k))
            t = self.t(txt, 30, col).next_to(ic, RIGHT, buff=0.3)
            self.au_mot(mot)
            self.play(FadeIn(ic, scale=0.6), FadeIn(t, shift=LEFT * 0.1), run_time=0.35)
        self.au_mot("Combien de chaque")
        q = self.t("Combien de chaque ?", 38, JAUNE_TITRE).move_to(P(0, -2.6))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : les faces ──────────────────────────────────────────────────────
    def ecran_faces(self):
        self.ecran("02-faces")
        c = colis(2.4, P(-3.6, 0.3))
        self.add(c)
        self.au_mot("Une face")
        l0 = self.bloc(["Une face,", "c'est une surface plate."], 34, FACE_C)
        gauche(l0, 0.3, 2.55)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(c.face(0, FACE_C, 0.55)), run_time=0.45)
        noms = [("devant", 0, "devant"), ("derrière", 1, "derrière"), ("à gauche", 4, "à gauche"),
                ("à droite", 5, "à droite"), ("dessus", 3, "dessus"), ("dessous", 2, "dessous")]
        liste = VGroup()
        surl = VGroup()
        for k, (txt, f, mot) in enumerate(noms):
            et = VGroup(icone_etiquette(0.6), self.t(txt, 30)).arrange(RIGHT, buff=0.2)
            gauche(et, 1.0 + 2.8 * (k // 3), 1.2 - 0.75 * (k % 3))
            liste.add(et)
            fa = c.face(f, "#facc15", 0.6)
            self.au_mot(mot)
            self.play(FadeIn(et, shift=LEFT * 0.1), FadeIn(fa), *[FadeOut(x) for x in surl], run_time=0.3)
            surl = VGroup(fa)
        self.play(FadeOut(surl), run_time=0.2)
        nums = [self.t(str(k + 1), 32, JAUNE_TITRE).next_to(et, LEFT, buff=0.15) for k, et in enumerate(liste)]
        self.aux_extraits(nums, ["1, 2", "2, 3", "3, 4", "4, 5", "5, 6", "6. Le"])
        self.au_mot("Le cube a 6 faces")
        g = self.gros("Le cube a 6 faces.", couleur=FACE_C, fs=36)
        gauche(g, 0.6, -1.4)
        self.play(FadeIn(g, scale=1.2), run_time=0.2)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    def compter_aretes(self, c, groupes, y0, x=0.4, fs=36):
        """4 en haut, 4 en bas (8), 4 qui montent (12) : chaque groupe s'allume avec son morceau."""
        lg1 = self.ligne([("4", ARETE_C), ("en haut", ARETE_C)], fs, buff=0.2)
        gauche(lg1, x, y0)
        self.aux_extraits([lg1[0]], ["4 arêtes"])
        self.play(*[Create(c.arete_ab(a, b)) for a, b in groupes[0]], run_time=0.4)
        self.aux_extraits([lg1[1]], ["en haut"])
        lg2 = self.ligne([("+ 4", ARETE_C), ("en bas", ARETE_C), ("= 8", BLEU_D)], fs, buff=0.2)
        gauche(lg2, x, y0 - 0.75)
        self.aux_extraits(lg2[:2], ["4 en bas", "en bas"])
        self.play(*[Create(c.arete_ab(a, b)) for a, b in groupes[1]], run_time=0.4)
        self.aux_extraits([lg2[2]], ["8. Et"])
        lg3 = self.ligne([("+ 4", ARETE_C), ("qui montent", ARETE_C), ("= 12", BLEU_D)], fs, buff=0.2)
        gauche(lg3, x, y0 - 1.5)
        self.aux_extraits(lg3[:2], ["4 qui montent", "qui montent"])
        self.play(*[Create(c.arete_ab(a, b)) for a, b in groupes[2]], run_time=0.4)
        self.aux_extraits([lg3[2]], ["12. Le"])

    # ── 03 : les arêtes ─────────────────────────────────────────────────────
    def ecran_aretes(self):
        self.ecran("03-aretes")
        c = colis(2.4, P(-3.6, 0.3))
        self.add(c)
        self.au_mot("Une arête")
        l0 = self.bloc(["Une arête, c'est un trait :", "là où deux faces se touchent."], 28, ARETE_C)
        gauche(l0, 0.3, 2.55)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("là où deux faces")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        f1, f2 = c.face(0, FACE_C, 0.5), c.face(5, "#a78bfa", 0.5)
        a = c.arete_ab(1, 2, ARETE_C, 12)
        self.play(FadeIn(f1), FadeIn(f2), run_time=0.35)
        self.play(Create(a), FadeOut(f1), FadeOut(f2), run_time=0.45)
        self.au_mot("du scotch")
        sc = icone_scotch(1.2).move_to(P(-0.6, 2.2))
        self.play(FadeIn(sc, scale=0.6), FadeOut(a), run_time=0.35)
        self.compter_aretes(c, (HAUT, BAS, MONTENT), 1.1)
        self.au_mot("Le cube a 12 arêtes")
        g = self.gros("Le cube a 12 arêtes.", couleur=ARETE_C, fs=36)
        gauche(g, 0.4, -1.65)
        self.play(FadeIn(g, scale=1.2), run_time=0.2)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : les sommets ────────────────────────────────────────────────────
    def ecran_sommets(self):
        self.ecran("04-sommets")
        c = colis(2.4, P(-3.6, 0.3))
        self.add(c)
        self.au_mot("Un sommet")
        l0 = self.bloc(["Un sommet, c'est un coin :", "là où les arêtes se rejoignent."], 28, SOMMET_C)
        gauche(l0, 0.3, 2.55)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("là où les arêtes")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("se rejoignent")
        tr = VGroup(c.arete_ab(2, 3, ARETE_C, 9), c.arete_ab(2, 6, ARETE_C, 9), c.arete_ab(1, 2, ARETE_C, 9))
        self.play(Create(tr), run_time=0.4)
        self.play(FadeIn(c.sommet(2, r=0.15)), FadeOut(tr), run_time=0.35)
        self.au_mot("un coin en carton")
        ic = icone_coin(1.2).move_to(P(-0.6, 2.2))
        self.play(FadeIn(ic, scale=0.6), run_time=0.3)
        lg1 = self.ligne([("4", SOMMET_C), ("en haut", SOMMET_C)], 36, buff=0.2)
        gauche(lg1, 0.4, 1.1)
        self.aux_extraits(lg1, ["4 en haut", "en haut"])
        self.play(LaggedStart(*[FadeIn(c.sommet(i, r=0.15), scale=1.5) for i in S_HAUT],
                                           lag_ratio=0.2), run_time=0.7)
        lg2 = self.ligne([("+ 4", SOMMET_C), ("en bas", SOMMET_C), ("= 8", BLEU_D)], 36, buff=0.2)
        gauche(lg2, 0.4, 0.35)
        self.aux_extraits(lg2[:2], ["4 en bas", "en bas"])
        self.play(LaggedStart(*[FadeIn(c.sommet(i, r=0.15), scale=1.5) for i in S_BAS], lag_ratio=0.2),
                  run_time=0.7)
        self.aux_extraits([lg2[2]], ["8. Le"])
        g = self.gros("Le cube a 8 sommets.", couleur=SOMMET_C, fs=32)
        gauche(g, 0.1, -0.8)
        self.aux_extraits([g], [("8 sommets", 1, 0.15)])
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = colis(1.4, P(-4.2, 1.2), L=1.7, h=0.9, p=1.0)

        def autres_q(sc):
            sc.play(FadeIn(c, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, ["Comme le cube :"], fs=32)
            sc.au_mot("Comme le cube")
            sc.play(FadeIn(lg), run_time=0.3)
            lg2 = sc.rep_bas(1, [("4 coins en haut", SOMMET_C), ("+ 4 coins en bas", SOMMET_C), "= 8 sommets."],
                             fs=32, buff=0.26)
            sc.aux_extraits([lg2[0]], ["4 coins en haut"])
            sc.play(*[FadeIn(c.sommet(i)) for i in S_HAUT], run_time=0.3)
            sc.aux_extraits([lg2[1]], ["4 coins en bas"])
            sc.play(*[FadeIn(c.sommet(i)) for i in S_BAS], run_time=0.3)
            sc.aux_extraits([lg2[2]], ["8 sommets."])
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Hugo prépare un colis en pavé droit.", "Combien a-t-il de sommets ?"],
                            [self.choix("6 sommets"), self.choix("8 sommets"), self.choix("12 sommets")], 1,
                            ["Comme le cube :", "4 coins en haut + 4 coins en bas = 8 sommets."],
                            mot_q="Hugo prépare", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Ne confonds pas")
        l0 = self.t("Ne confonds pas les arêtes et les sommets.", 34)
        gauche(l0, -6.2, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        c1 = colis(1.7, P(-4.0, 0.0))
        c2 = colis(1.7, P(1.6, 0.0))
        self.play(FadeIn(c1), FadeIn(c2), run_time=0.3)
        self.au_mot("Les sommets, ce sont les coins")
        t1 = self.t("Les sommets : les coins", 30, SOMMET_C).move_to(P(-4.0, -1.6))
        self.play(FadeIn(t1), LaggedStart(*[FadeIn(c1.sommet(i, r=0.13), scale=1.5) for i in range(8)],
                                           lag_ratio=0.1), run_time=0.8)
        n1 = self.t("8", 44, SOMMET_C).next_to(t1, DOWN, buff=0.2)
        self.aux_extraits([n1], ["8. Les"])
        self.au_mot("Les arêtes, ce sont les traits")
        t2 = self.t("Les arêtes : les traits", 30, ARETE_C).move_to(P(1.6, -1.6))
        self.play(FadeIn(t2), LaggedStart(*[Create(c2.arete_ab(a, b, sw=8)) for a, b in HAUT + BAS + MONTENT],
                                           lag_ratio=0.08), run_time=1.0)
        n2 = self.t("12", 44, ARETE_C).next_to(t2, DOWN, buff=0.2)
        self.aux_extraits([n2], ["12. Si"])
        self.au_mot("Si tu trouves 8 arêtes")
        l3 = self.t("8 arêtes ? Tu as compté les coins !", 30, ROUGE_ERREUR).move_to(P(-0.8, -3.05))
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(c1, color=ROUGE_ERREUR, scale_factor=1.05), run_time=0.5)
        self.attendre_voix()

    # ── 07 : les arêtes cachées ─────────────────────────────────────────────
    def ecran_cache(self):
        self.ecran("07-cache")
        c = colis(2.6, P(-3.4, 0.2))
        self.au_mot("Sur un dessin")
        l0 = self.t("Sur un dessin, on ne voit pas tout.", 34)
        gauche(l0, -6.2, 2.9)
        self.play(FadeIn(c.fonds), FadeIn(c.vues), FadeIn(l0, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Les arêtes cachées")
        l1 = self.bloc(["Les arêtes cachées, derrière,", "sont tracées en pointillés."], 30, ARETE_C)
        gauche(l1, -0.4, 1.3)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("en pointillés")
        cach = VGroup(*[c.arete_ab(a, b, ARETE_C, 10) for a, b in ((4, 5), (4, 7), (0, 4))])
        self.play(Create(c.cachees), Create(cach), run_time=0.9)
        self.au_mot("Elles comptent aussi")
        g = self.gros("Elles comptent aussi !", couleur=ARETE_C, fs=34)
        gauche(g, -0.4, -0.6)
        self.play(FadeIn(g, scale=1.2), Indicate(cach, color=ARETE_C), run_time=0.5)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = colis(1.4, P(-4.2, 1.2), L=1.7, h=0.9, p=1.0)

        def autres_q(sc):
            sc.play(FadeIn(c, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, [("4 en haut", ARETE_C), ("+ 4 en bas", ARETE_C)], fs=30, buff=0.22)
            lg1 = sc.rep_bas(1, [("+ 4 qui montent", ARETE_C), "= 12 arêtes."], fs=30, buff=0.22)
            sc.aux_extraits([lg[0]], ["4 en haut"])
            sc.play(*[Create(c.arete_ab(a, b, sw=8)) for a, b in HAUT], run_time=0.3)
            sc.aux_extraits([lg[1]], ["4 en bas"])
            sc.play(*[Create(c.arete_ab(a, b, sw=8)) for a, b in BAS], run_time=0.3)
            sc.aux_extraits([lg1[0]], ["4 qui montent"])
            sc.play(*[Create(c.arete_ab(a, b, sw=8)) for a, b in MONTENT], run_time=0.3)
            sc.aux_extraits([lg1[1]], ["12 arêtes."])
            lg2 = sc.rep_bas(2, [("8, ce sont les sommets.", SOMMET_C)], fs=30)
            sc.aux_extraits([lg2[0]], ["8, ce sont"])
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Combien d'arêtes", "a un pavé droit ?"],
                            [self.choix("8 arêtes"), self.choix("6 arêtes"), self.choix("12 arêtes")], 2,
                            ["4 en haut + 4 en bas + 4 qui montent = 12 arêtes.", "8, ce sont les sommets."],
                            mot_q="Combien d'arêtes", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def colis_pyr(self, e=1.2, centre=ORIGIN):
        return pyramide(4, 1.3, 1.4, e=e, centre=centre, couleur=CARTON, couleur_trait="#fef3c7")

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        py = self.colis_pyr(1.6, P(-4.2, 0.6))
        self.au_mot("Hugo prépare un colis")
        l0 = self.bloc(["Hugo prépare un colis", "en forme de pyramide", "à base carrée."], 34)
        gauche(l0, -1.4, 1.6)
        self.play(FadeIn(py, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Combien a-t-elle")
        q = self.bloc(["Combien a-t-elle de faces,", "d'arêtes et de sommets ?"], 36, JAUNE_TITRE)
        gauche(q, -1.4, -0.6)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, -1.4, -2.0)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        py = self.colis_pyr(1.3, P(-5.0, 0.3))
        self.add(py)
        x = -3.7
        cats = [
            ("Les faces :", FACE_C, "Les faces", [("le carré du dessous", "le carré du dessous"),
                                                  ("+ 4 triangles", "4 triangles"), ("= 5 faces.", "5 faces.")],
             [lambda: [FadeIn(py.face(0, FACE_C, 0.5))],
              lambda: [FadeIn(py.face(k, "#facc15", 0.45)) for k in range(1, 5)], lambda: []]),
            ("Les arêtes :", ARETE_C, "Les arêtes", [("4 autour de la base", "4 autour de la base"),
                                                     ("+ 4 qui montent", "4 qui montent"), ("= 8 arêtes.", "8 arêtes.")],
             [lambda: [Create(py.arete_ab(i, (i + 1) % 4, sw=8)) for i in range(4)],
              lambda: [Create(py.arete_ab(i, 4, sw=8)) for i in range(4)], lambda: []]),
            ("Les sommets :", SOMMET_C, "Les sommets", [("4 coins en bas", "4 coins en bas"),
                                                        ("+ la pointe", "et la pointe"), ("= 5 sommets.", "5 sommets.")],
             [lambda: [FadeIn(py.sommet(i, r=0.13)) for i in range(4)],
              lambda: [FadeIn(py.sommet(4, r=0.15), scale=1.5)], lambda: []]),
        ]
        for k, (titre, col, mot, morceaux, gestes) in enumerate(cats):
            t = self.t(titre, 32, col)
            gauche(t, x, 2.15 - 1.45 * k)
            self.au_mot(mot)
            self.play(FadeIn(t, shift=UP * 0.08), run_time=0.25)
            lg = self.ligne([(m, VERT_OK if i == 2 else col) for i, (m, _) in enumerate(morceaux)], 28, buff=0.2)
            gauche(lg, x + 0.4, 1.5 - 1.45 * k)
            for i, (m, ex) in enumerate(morceaux):
                self.aux_extraits([lg[i]], [ex])
                g = gestes[i]()
                if g:
                    self.play(*g, run_time=0.35)
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        c = colis(1.8)
        c.add(c.face(0, FACE_C, 0.45), c.arete_ab(2, 3, ARETE_C, 9), c.sommet(1, r=0.13))
        lignes = self.finale_gauche(c, textes=[
            ("Une face est plate.",),
            ("Une arête est un trait,", "là où deux faces se touchent."),
            ("Un sommet est un coin.",),
            ("Cube et pavé droit : 6 faces,", "12 arêtes et 8 sommets.")], fs=30, x_fig=-4.7, xl=-2.4)
        self.add(c)
        self.au_mot("Une face est plate")
        self.montrer_ligne(lignes[0])
        self.au_mot("Une arête est un trait")
        self.montrer_ligne(lignes[1])
        self.au_mot("Un sommet est un coin")
        self.montrer_ligne(lignes[2])
        self.au_mot("Le cube et le pavé droit")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_faces()
        self.ecran_aretes()
        self.ecran_sommets()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_cache()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class SolidesDecrireCE2(SolidesDecrireBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
