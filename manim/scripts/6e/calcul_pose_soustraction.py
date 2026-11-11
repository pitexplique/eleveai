# calcul_pose_soustraction.py
# EleveAI — Maths 6e — série « Calcul posé », épisode 02 : LA SOUSTRACTION POSÉE
# (micro entier_soustraction_posee, notion entier_calcul_pose), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/calcul-pose.js, épisode soustraction).
# Décor et métier : Hugo, GUIDE DE MONTAGNE (matrice métiers ; centres : sport, nature-ecologie).
# Méthode : « je casse une dizaine » (le chiffre barré, le nouveau écrit au-dessus, un petit 1 devant).
# Écrans : garde (00), situation (01), sens (02), poser (03), vérifier (04), QUESTION 1 (05),
# piège du zéro (06), QUESTION 2 (07), défi (08) et correction (08b), appris (09), fin (10).
# Voix : manim/voix/6e-calcul-pose-soustraction.json ; marques : calcul_pose_soustraction_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/calcul_pose_soustraction.py CalculPoseSoustraction6e
# python -m manim render -qh --disable_caching manim/scripts/6e/calcul_pose_soustraction.py CalculPoseSoustraction6e -o eleveai-maths-6e-calcul-pose-soustraction --media_dir manim/scripts/6e/media-cp-02
# Sortie : manim/sorties/6e/maths/calcul-pose/02-soustraction/eleveai-maths-6e-calcul-pose-soustraction.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from calcul_pose_commun import *  # noqa: E402,F403


def hugo(s=1.0):
    """Hugo, guide de montagne : veste orange, bonnet rouge à pompon."""
    p = visage(personne(peau="#e0ac69", tenue="#ea580c", cheveux="#78350f", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    bonnet = AnnularSector(inner_radius=0, outer_radius=r * 1.06, angle=PI, start_angle=0, fill_color="#dc2626",
                           fill_opacity=1, stroke_width=0).move_to(c + P(0, r * 0.62))
    bord = RoundedRectangle(width=r * 2.2, height=r * 0.34, corner_radius=r * 0.12, fill_color="#f8fafc",
                            fill_opacity=1, stroke_width=0).move_to(c + P(0, r * 0.38))
    pompon = Circle(radius=r * 0.22, fill_color="#f8fafc", fill_opacity=1, stroke_width=0).move_to(c + P(0, r * 1.22))
    p.add(bonnet, bord, pompon)
    return p


def montagne(g=(-2.2, -2.1), d=(4.2, -2.1), h=(1.0, 1.7)):
    """Une montagne : flancs gris, neige au sommet, drapeau. Renvoie (groupe, sommet, point(t))
    où point(t) est le point du flanc gauche à la fraction t de la montée."""
    G, D, H = P(*g), P(*d), P(*h)
    flanc = Polygon(G, D, H, fill_color="#64748b", fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
    k = 0.28
    neige = Polygon(H, H + (G - H) * k, H + (G - H) * k * 0.7 + (D - H) * k * 0.3 + DOWN * 0.08,
                    H + (D - H) * k, fill_color="#f8fafc", fill_opacity=1, stroke_width=0)
    mat = Line(H, H + UP * 0.75, color="#e2e8f0", stroke_width=5)
    drap = Polygon(H + UP * 0.75, H + UP * 0.45, H + UP * 0.6 + RIGHT * 0.45, fill_color="#ef4444",
                   fill_opacity=1, stroke_width=0)
    point = lambda t: G + (H - G) * t  # noqa: E731
    return VGroup(flanc, neige, mat, drap), H, point


class CalculPoseSoustractionBase(PaysageCalculPose):
    nom_voix = "6e-calcul-pose-soustraction"
    fichier_marques = "calcul_pose_soustraction_marques.json"

    def _disposer_q(self, question, choix, phrase):
        """Le compte à rebours n'est pas un nombre dit : hors synchro."""
        r = super()._disposer_q(question, choix, phrase)
        for f in r[4].get_family():
            f.sans_synchro = True
        return r

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La soustraction posée", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("La soustraction")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Que faire quand le chiffre", "du haut est trop petit ?"], 40)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        cases = VGroup()
        for i in range(3):
            for x in (2.5, 3.2):
                cases.add(DashedVMobject(Square(0.58, stroke_color=WHITE, stroke_width=3), num_dashes=16)
                          .move_to(P(x, 1.1 - 0.78 * i - (0.15 if i == 2 else 0))))
        moins = Text(MOINS, font_size=56, color=WHITE, weight=BOLD).move_to(P(1.8, 0.32))
        barre = Line(P(1.55, -0.2), P(3.6, -0.2), color=WHITE, stroke_width=5)
        haut = Text("2", font_size=44, color=BLEU_D, weight=BOLD).move_to(cases[1])
        bas = Text("8", font_size=44, color=BLEU_D, weight=BOLD).move_to(cases[3])
        hors_audit(VGroup(haut, bas))
        point = Text("?", font_size=52, color=ROUGE_ERREUR, weight=BOLD).move_to(cases[5])
        self.au_mot("Que faire")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(cases), FadeIn(moins), Create(barre), FadeIn(haut), FadeIn(bas),
                  run_time=0.3)
        self.au_mot("trop petit")
        self.play(FadeIn(point, scale=2), Indicate(haut, color=ROUGE_ERREUR, scale_factor=1.6), run_time=0.5)
        self.play(Wiggle(point), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Hugo, guide de montagne ────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        hg = hugo(1.05).move_to(P(-5.2, -0.2))
        self.au_mot("Voici Hugo")
        nom = self.t("Hugo", 42, BLEU_CALCUL).next_to(hg, UP, buff=0.2)
        self.play(FadeIn(hg, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("guide de montagne")
        met = self.bloc(["guide de", "montagne"], 30).set_color(BLEU_CALCUL).next_to(hg, DOWN, buff=0.15)
        mont, sommet, point = montagne()
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(mont, shift=UP * 0.3), run_time=0.45)
        l1 = self.ligne([("Sommet :", WHITE), ("632 m", ROSE_D)], 36, buff=0.18).next_to(sommet, RIGHT, buff=0.55) \
            .shift(UP * 0.55)
        self.au_mot("le sommet")
        self.play(FadeIn(l1[0], shift=LEFT * 0.1), Flash(sommet + UP * 0.6, color=ROSE_D), run_time=0.45)
        self.au_mot("632 mètres")
        self.play(FadeIn(l1[1], scale=1.2), run_time=0.3)
        pt = point(458 / 632)
        chemin = DashedLine(point(0), pt, color=AMBRE_D, stroke_width=7, dash_length=0.14)
        groupe = Dot(pt, radius=0.13, color=AMBRE_D)
        l2 = self.ligne([("Déjà :", WHITE), ("458 m", AMBRE_D)], 36, buff=0.18).next_to(pt, LEFT, buff=0.3)
        self.au_mot("déjà monté")
        self.play(Create(chemin), FadeIn(groupe, scale=2), FadeIn(l2[0], shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("458 mètres")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.3)
        self.au_mot("Combien")
        reste = DashedLine(pt, sommet, color=JAUNE_TITRE, stroke_width=7, dash_length=0.14)
        qm = self.t("?", 48, JAUNE_TITRE).next_to(reste.get_center(), LEFT, buff=0.25)
        q = self.t("Combien reste-t-il ?", 44, JAUNE_TITRE).move_to(P(1.0, -2.85))
        self.play(Create(reste), FadeIn(qm, scale=1.5), FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 02 : c'est une soustraction ─────────────────────────────────────────
    def ecran_sens(self):
        self.ecran("02-sens")
        self.au_mot("Combien reste-t-il")
        l0 = self.ligne([("Combien reste-t-il ?", JAUNE_TITRE), ("→ une soustraction.", WHITE)], 38, buff=0.25)
        l0.move_to(P(0, 3.0))
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est une soustraction")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        po = Pose(["632", "458"], signe=MOINS, origine=P(-3.0, 1.0), pas=0.95, hl=1.15, fs=72)
        self.au_mot("632 moins")
        l1 = self.ligne([("632", ROSE_D), (MOINS, WHITE), ("458", AMBRE_D)], 44, buff=0.2)
        gauche(l1, -0.6, 1.6)
        self.play(FadeIn(l1[0], scale=1.2), FadeIn(l1[1]), run_time=0.3)
        self.au_mot("458. On")
        self.play(FadeIn(l1[2], scale=1.2), run_time=0.3)
        self.au_mot("grand nombre en haut")
        l2 = self.t("Le grand nombre en haut,", 36, ROSE_D)
        gauche(l2, -0.6, 0.5)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(po.ligne(0), shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("on aligne")
        l3 = self.t("aligné à droite.", 36, AMBRE_D)
        gauche(l3, -0.6, -0.2)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(po.ligne(1), shift=DOWN * 0.2), FadeIn(po.signe),
                  Create(po.barre), run_time=0.4)
        cols = VGroup(*[po.colonne(r, 0, 1) for r in (0, 1, 2)])
        ents = VGroup(*[po.entete(r) for r in (0, 1, 2)])
        self.play(LaggedStart(*[Create(c) for c in cols], lag_ratio=0.25), FadeIn(ents), run_time=0.7)
        self.attendre_voix()

    # ── 03 : poser 632 − 458 ────────────────────────────────────────────────
    def ecran_pose(self):
        self.ecran("03-pose")
        po = Pose(["632", "458"], signe=MOINS, origine=P(-3.0, 1.2), pas=0.95, hl=1.15, fs=72)
        hauts = {r: po.chiffre(0, r) for r in (0, 1, 2)}
        self.add(*hauts.values(), po.ligne(1), po.signe, po.barre, *[po.entete(r) for r in (0, 1, 2)])
        x0 = -0.6
        bloc = VGroup()

        def ecrire(morceaux, mot, y, fs=34, autres=()):
            lg = self.ligne(morceaux, fs, buff=0.2)
            gauche(lg, x0, y)
            self.au_mot(mot)
            self.play(FadeIn(lg, shift=UP * 0.1), *autres, run_time=0.25)
            bloc.add(lg)
            return lg

        # unités
        cad = po.colonne(0)
        ecrire([("Unités :", BLEU_D), ("2 " + MOINS + " 8,", WHITE), ("impossible.", ROUGE_ERREUR)], "Unités", 2.3,
               autres=[Create(cad)])
        b3, n2 = po.barrer(hauts[1]), po.dessus(1, "2")
        ecrire([("Je casse une dizaine du 3 :", ORANGE_RETENUE)], "Je casse une dizaine", 1.6,
               autres=[Create(b3)])
        ecrire([("il reste 2 dizaines,", AMBRE_D)], "il reste 2", 0.9, autres=[FadeIn(n2, scale=1.8)])
        u1 = po.devant(0)
        ecrire([("et j'ai 12 unités.", BLEU_D)], "j'ai 12 unités", 0.2, autres=[FadeIn(u1, scale=1.8)])
        l4 = ecrire([("12 " + MOINS + " 8 =", WHITE)], "12 moins 8", -0.5)
        r4 = self.t("4.", 34, VERT_OK).next_to(l4, RIGHT, buff=0.2)
        self.au_mot("4. Dizaines")
        self.play(FadeIn(r4, scale=1.3), FadeIn(po.res(0, 4), scale=1.6), run_time=0.3)
        bloc.add(r4)
        # dizaines
        vieux, bloc = bloc, VGroup()
        cad1, cad = cad, po.colonne(1)
        ecrire([("Dizaines :", AMBRE_D), ("2 " + MOINS + " 5,", WHITE), ("impossible.", ROUGE_ERREUR)], "Dizaines", 2.3,
               autres=[FadeOut(vieux), FadeOut(cad1), Create(cad)])
        b6, n5 = po.barrer(hauts[2]), po.dessus(2, "5")
        ecrire([("Je casse une centaine du 6 :", ORANGE_RETENUE)], "Je casse une centaine", 1.6,
               autres=[Create(b6)])
        ecrire([("il reste 5 centaines,", ROSE_D)], "il reste 5", 0.9, autres=[FadeIn(n5, scale=1.8)])
        d1 = po.devant(1, haut=True)
        ecrire([("et j'ai 12 dizaines.", AMBRE_D)], "j'ai 12 dizaines", 0.2, autres=[FadeIn(d1, scale=1.8)])
        l4 = ecrire([("12 " + MOINS + " 5 =", WHITE)], "12 moins 5", -0.5)
        r4 = self.t("7.", 34, VERT_OK).next_to(l4, RIGHT, buff=0.2)
        self.au_mot("7. Centaines")
        self.play(FadeIn(r4, scale=1.3), FadeIn(po.res(1, 7), scale=1.6), run_time=0.3)
        # centaines
        cad1, cad = cad, po.colonne(2)
        l6 = ecrire([("Centaines :", ROSE_D), ("5 " + MOINS + " 4 =", WHITE)], "Centaines", -1.2,
                    autres=[FadeOut(cad1), Create(cad)])
        r6 = self.t("1.", 34, VERT_OK).next_to(l6, RIGHT, buff=0.2)
        self.au_mot("1. Il reste")
        self.play(FadeIn(r6, scale=1.3), FadeIn(po.res(2, 1), scale=1.6), FadeOut(cad), run_time=0.25)
        self.au_mot("Il reste 174")
        l5 = self.t("Il reste :", 38)
        gauche(l5, x0, -2.4)
        g = self.gros("174 m", fs=56).next_to(l5, RIGHT, buff=0.35)
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(g, scale=1.3), run_time=0.4)
        self.insister(g, 1.2, 0.25)
        self.attendre_voix()

    # ── 04 : vérifier avec une addition ─────────────────────────────────────
    def ecran_verifier(self):
        self.ecran("04-verifier")
        self.au_mot("On vérifie")
        tit = self.t("On vérifie avec une addition :", 42, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.4)
        po = Pose(["174", "458"], origine=P(-2.6, 1.5), pas=0.95, hl=1.15, fs=72)
        self.au_mot("174 plus")
        l1 = self.ligne([("174", VERT_OK), ("+", WHITE)], 44, buff=0.2)
        gauche(l1, 0.6, 1.5)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(po.ligne(0), shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("458, ça")
        l2 = self.t("458", 44, AMBRE_D).next_to(l1, RIGHT, buff=0.2)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(po.ligne(1), shift=DOWN * 0.2), FadeIn(po.signe),
                  Create(po.barre), run_time=0.35)
        self.au_mot("ça fait 632")
        res = VGroup(po.res(0, 2, ROSE_D), po.res(1, 3, ROSE_D), po.res(2, 6, ROSE_D), po.ret(1, 1), po.ret(2, 1))
        l3 = self.t("= 632", 44, ROSE_D).next_to(l2, RIGHT, buff=0.2)
        self.play(LaggedStart(*[FadeIn(m, scale=1.5) for m in res], lag_ratio=0.15), FadeIn(l3, scale=1.2),
                  run_time=0.6)
        self.au_mot("C'est juste")
        ok = self.t("C'est juste !", 46, VERT_OK)
        gauche(ok, 0.6, 0.1)
        ch = self.coche(taille=0.5).next_to(ok, RIGHT, buff=0.3)
        self.play(FadeIn(ok, scale=1.2), Create(ch), run_time=0.45)
        self.play(Indicate(l3, color=ROSE_D, scale_factor=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        po = Pose(["81", "46"], signe=MOINS, origine=P(-3.6, 1.6), pas=0.7, fs=60, hl=0.95)
        h8 = po.chiffre(0, 1)

        def autres_q(sc):
            sc.play(FadeIn(h8), FadeIn(po.chiffre(0, 0)), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre),
                    run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, ["1 " + MOINS + " 6, impossible :", "je casse une dizaine."])
            sc.au_mot("1 moins 6")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("je casse")
            sc.play(FadeIn(lg[1], shift=UP * 0.1), Create(po.barrer(h8)), FadeIn(po.dessus(1, "7"), scale=1.8),
                    FadeIn(po.devant(0), scale=1.8), run_time=0.35)
            lg2 = sc.rep_bas(1, ["11 " + MOINS + " 6 = 5,", "7 " + MOINS + " 4 = 3."])
            sc.au_mot("11 moins")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), FadeIn(po.res(0, 5), scale=1.6), run_time=0.3)
            sc.au_mot("7 moins 4")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), FadeIn(po.res(1, 3), scale=1.6), run_time=0.3)
            lg3 = sc.rep_bas(2, ["Ça fait 35."])
            sc.au_mot("Ça fait 35")
            sc.play(FadeIn(lg3[0], scale=1.2), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Combien font 81 " + MOINS + " 46 ?"],
                            [self.t("35", 36), self.t("45", 36), self.t("25", 36)], 0,
                            ["1 − 6, impossible : je casse une dizaine.", "11 − 6 = 5, 7 − 4 = 3.", "Ça fait 35."],
                            mot_q="Combien", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège du zéro ───────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège du zéro !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.1)
        self.play(Write(tit), run_time=0.35)
        po = Pose(["503", "128"], signe=MOINS, origine=P(-3.7, 0.6), pas=0.85, fs=64, hl=1.05)
        hauts = {r: po.chiffre(0, r) for r in (0, 1, 2)}
        l0 = self.ligne([("Montée :", WHITE), ("503 m,", ROSE_D)], 34, buff=0.16)
        gauche(l0, -6.2, 2.3)
        self.au_mot("la montée")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("503 mètres")
        self.play(FadeIn(l0[1], scale=1.2), FadeIn(VGroup(*hauts.values()), shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("128. Unités")
        l0b = self.ligne([("déjà :", WHITE), ("128 m.", AMBRE_D)], 34, buff=0.16).next_to(l0, RIGHT, buff=0.25)
        self.play(FadeIn(l0b, shift=UP * 0.1), FadeIn(po.ligne(1), shift=DOWN * 0.2), FadeIn(po.signe),
                  Create(po.barre), run_time=0.35)
        x0 = -2.8

        def ecrire(morceaux, mot, y, fs=32, autres=()):
            lg = self.ligne(morceaux, fs, buff=0.18)
            gauche(lg, x0, y)
            self.au_mot(mot)
            self.play(FadeIn(lg, shift=UP * 0.1), *autres, run_time=0.35)
            return lg

        cad = po.colonne(0)
        ecrire([("Unités :", BLEU_D), ("3 " + MOINS + " 8,", WHITE), ("impossible.", ROUGE_ERREUR)], "Unités", 1.5,
               autres=[Create(cad)])
        zero = Circle(radius=0.42, color=ROUGE_ERREUR, stroke_width=6).move_to(hauts[1])
        ecrire([("0 dizaine :", AMBRE_D), ("rien à casser !", ROUGE_ERREUR)], "il y a 0 dizaine", 0.85,
               autres=[Create(zero)])
        b5, n4, n10 = po.barrer(hauts[2]), po.dessus(2, "4"), po.dessus(1, "10")
        ecrire([("Je casse une centaine :", ORANGE_RETENUE), ("10 dizaines.", AMBRE_D)], "je casse une centaine", 0.2,
               autres=[FadeOut(zero), Create(b5), FadeIn(n4, scale=1.8), Create(po.barrer(hauts[1])),
                       FadeIn(n10, scale=1.8)])
        n9 = po.dessus(1, "9")
        b10 = po.barrer(n10)
        u1 = po.devant(0)
        ecrire([("Puis une dizaine :", ORANGE_RETENUE), ("13 unités.", BLEU_D)], "Puis je casse", -0.45,
               autres=[Create(b10), FadeIn(u1, scale=1.8)])
        self.play(VGroup(n10, b10).animate.shift(UP * 0.38).set_opacity(0.55), FadeIn(n9, scale=1.8), run_time=0.35)
        ecrire([("Il reste", WHITE), ("4 centaines", ROSE_D), ("et", WHITE), ("9 dizaines.", AMBRE_D)],
               "Il reste 4", -1.1, autres=[Indicate(VGroup(n4, n9), color=ORANGE_RETENUE, scale_factor=1.5)])
        lc = self.ligne([("13 " + MOINS + " 8 = 5,", BLEU_D), ("9 " + MOINS + " 2 = 7,", AMBRE_D),
                         ("4 " + MOINS + " 1 = 3.", ROSE_D)], 32, buff=0.3)
        gauche(lc, x0, -1.75)
        for k, (mot, r, v) in enumerate((("13 moins 8", 0, 5), ("9 moins 2", 1, 7), ("4 moins 1", 2, 3))):
            self.au_mot(mot)
            self.play(FadeIn(lc[k], shift=UP * 0.1), FadeIn(po.res(r, v), scale=1.6),
                      *([FadeOut(cad)] if k == 0 else []), run_time=0.3)
        self.au_mot("Il reste 375")
        l5 = self.t("Il reste :", 36)
        gauche(l5, x0, -2.65)
        g = self.gros("375 m", fs=50).next_to(l5, RIGHT, buff=0.3)
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(g, scale=1.3), run_time=0.4)
        self.insister(g, 1.15, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        po = Pose(["400", "135"], signe=MOINS, origine=P(-3.4, 1.6), pas=0.7, fs=60, hl=0.95)
        hauts = {r: po.chiffre(0, r) for r in (0, 1, 2)}

        def autres_q(sc):
            sc.play(FadeIn(VGroup(*hauts.values())), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre),
                    run_time=0.35)

        def apres(sc):
            bas = lambda i, m: sc.rep_bas(i, m, y0=-1.25, pas=0.6)  # noqa: E731
            lg = bas(0, ["Je casse une centaine,", "puis une dizaine."])
            sc.au_mot("Je casse une centaine")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), Create(po.barrer(hauts[2])), FadeIn(po.dessus(2, "3"), scale=1.8),
                    run_time=0.3)
            sc.au_mot("puis une dizaine")
            sc.play(FadeIn(lg[1], shift=UP * 0.1), Create(po.barrer(hauts[1])), FadeIn(po.dessus(1, "9"), scale=1.8),
                    FadeIn(po.devant(0), scale=1.8), run_time=0.3)
            lg2 = bas(1, ["10 unités, 9 dizaines,", "3 centaines."])
            sc.au_mot("J'ai 10")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("3 centaines")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), run_time=0.3)
            lg3 = bas(2, ["10 " + MOINS + " 5 = 5,", "9 " + MOINS + " 3 = 6,", "3 " + MOINS + " 1 = 2."])
            for k, (mot, r, v) in enumerate((("10 moins 5", 0, 5), ("9 moins 3", 1, 6), ("3 moins 1", 2, 2))):
                sc.au_mot(mot)
                sc.play(FadeIn(lg3[k], shift=UP * 0.1), FadeIn(po.res(r, v), scale=1.6), run_time=0.3)
            lg4 = bas(3, ["Ça fait 265."])
            sc.au_mot("Ça fait 265")
            sc.play(FadeIn(lg4[0], scale=1.2), run_time=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["Combien font 400 " + MOINS + " 135 ?"],
                            [self.t("335", 36), self.t("265", 36), self.t("275", 36)], 1,
                            ["Je casse une centaine, puis une dizaine.", "10 unités, 9 dizaines, 3 centaines.",
                             "10 − 5 = 5, 9 − 3 = 6, 3 − 1 = 2.", "Ça fait 265."],
                            mot_q="Combien", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        hg = hugo(0.8).move_to(P(-5.3, 0.5))
        mont, sommet, point = montagne(g=(1.6, -1.5), d=(6.2, -1.5), h=(3.9, 1.6))
        self.au_mot("Une randonnée")
        l0 = self.ligne([("Montée :", WHITE), ("1 000 m", ROSE_D)], 38, buff=0.18)
        hors_audit(l0[1])  # « 1 000 » : l'audit coupe le nombre à l'espace ; posé au mot
        gauche(l0, -3.9, 2.0)
        self.play(FadeIn(hg, shift=UP * 0.2), FadeIn(mont, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1),
                  run_time=0.3)
        self.au_mot("375 mètres")
        l1 = self.ligne([("Le matin :", WHITE), ("375 m", AMBRE_D)], 38, buff=0.18)
        gauche(l1, -3.9, 1.2)
        p1 = point(375 / 1000)
        c1 = Line(point(0), p1, color=AMBRE_D, stroke_width=8)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(c1), run_time=0.35)
        self.au_mot("268 mètres")
        l2 = self.ligne([("L'après-midi :", WHITE), ("268 m", BLEU_D)], 38, buff=0.18)
        gauche(l2, -3.9, 0.4)
        c2 = Line(p1, point(643 / 1000), color=BLEU_D, stroke_width=8)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(c2), run_time=0.35)
        self.au_mot("Combien")
        q = self.t("Combien reste-t-il ?", 42, JAUNE_TITRE).move_to(P(-1.2, -0.9))
        self.play(FadeIn(q, shift=UP * 0.1), Flash(sommet + UP * 0.6, color=JAUNE_TITRE), run_time=0.45)
        self.pause_defi(y=-2.3)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        pa = Pose(["375", "268"], origine=P(-3.6, 1.9), pas=0.66, fs=54, hl=0.8)
        pb = Pose(["1000", "643"], signe=MOINS, origine=P(2.6, 1.9), pas=0.66, fs=54, hl=0.8)
        self.au_mot("375 plus")
        la = self.ligne([("Montés :", WHITE), ("375 + 268 =", WHITE)], 36, buff=0.2)
        gauche(la, -6.0, -1.3)
        self.play(FadeIn(la, shift=UP * 0.1), FadeIn(pa.ligne(0)), FadeIn(pa.ligne(1)), FadeIn(pa.signe),
                  Create(pa.barre), run_time=0.4)
        self.au_mot("643 mètres")
        ra = self.t("643 m.", 36, VERT_OK).next_to(la, RIGHT, buff=0.2)
        self.play(FadeIn(ra, scale=1.2), FadeIn(VGroup(pa.res(0, 3), pa.res(1, 4), pa.res(2, 6), pa.ret(1, 1),
                                                         pa.ret(2, 1)), scale=1.3), run_time=0.4)
        self.au_mot("Il reste")
        lb = self.ligne([("Il reste :", WHITE), ("1 000", WHITE), (MOINS + " 643 =", WHITE)], 36, buff=0.2)
        hors_audit(lb[1])
        gauche(lb, -6.0, -2.0)
        self.play(FadeIn(lb, shift=UP * 0.1), FadeIn(pb.ligne(0)), FadeIn(pb.ligne(1)), FadeIn(pb.signe),
                  Create(pb.barre), run_time=0.4)
        self.au_mot("357 mètres")
        g = self.gros("357 m", fs=48).next_to(lb, RIGHT, buff=0.3)
        self.play(FadeIn(g, scale=1.3), FadeIn(VGroup(pb.res(0, 7), pb.res(1, 5), pb.res(2, 3)), scale=1.3),
                  run_time=0.4)
        self.insister(g, 1.15, 0.25)
        self.au_mot("On vérifie")
        lc = self.ligne([("On vérifie :", JAUNE_TITRE), ("357 + 643 =", WHITE), ("1 000.", VERT_OK)], 36, buff=0.2)
        hors_audit(lc[2])
        gauche(lc, -6.0, -2.85)
        self.play(FadeIn(lc[0], shift=UP * 0.1), FadeIn(lc[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("ça fait 1 000")
        self.play(FadeIn(lc[2], scale=1.2), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        po = Pose(["632", "458"], signe=MOINS, origine=P(-3.6, 0.9), pas=0.78, fs=62, hl=1.0)
        h3, h6 = po.chiffre(0, 1), po.chiffre(0, 2)
        casse = VGroup(po.barrer(h3), po.barrer(h6), po.dessus(1, "2"), po.dessus(2, "5"), po.devant(0),
                       po.devant(1, haut=True))
        fig = VGroup(po, po.chiffre(0, 0), h3, h6, po.ligne(1), po.res(2, 1), po.res(1, 7), po.res(0, 4), casse)
        lignes = self.finale_gauche(fig, textes=[
            ("On pose le grand nombre", "en haut."),
            ("Chiffre du haut trop petit :", "on casse une dizaine", "ou une centaine."),
            ("On vérifie", "avec une addition.")], fs=36)
        self.add(fig)
        self.au_mot("On pose")
        self.montrer_ligne(lignes[0], Indicate(VGroup(fig[1], fig[2], fig[3]), color=ROSE_D, scale_factor=1.15))
        self.au_mot("Si le chiffre")
        self.montrer_ligne(lignes[1], Indicate(casse, color=ORANGE_RETENUE, scale_factor=1.5))
        self.au_mot("On vérifie")
        self.montrer_ligne(lignes[2], Indicate(VGroup(fig[5], fig[6], fig[7]), color=VERT_OK, scale_factor=1.3))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_sens()
        self.ecran_pose()
        self.ecran_verifier()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class CalculPoseSoustraction6e(CalculPoseSoustractionBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
