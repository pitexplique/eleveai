# volume_defi.py
# EleveAI — Maths 6e — série « Volume et solides », épisode V5 : DÉFIS SUR LES VOLUMES
# (micro volume_defi), notion volume_solide.
# Paysage 16:9, CEINTURE BLEUE, avec voix (manim/voix/6e-volume-defi.json, validée le 15/11, Julie, débit −6).
# Short jumeau : film Ti Margo (48 glaçons, bac 6 × 4 : 2 bacs : réponse C).
# Métier : Clara, PÂTISSIÈRE-CHOCOLATIÈRE (boîtes de chocolats en pavé droit) ; centre : cuisine.
# Mapping micro → écrans : volume_defi → 02 (une couche puis les couches : 4 × 3 = 12, × 2 = 24),
# 03 (ce qui manque : 12 + 5 = 17, 24 − 17 = 7), 04 (le nombre de couches : 36 ÷ 12 = 3), 06 (piège :
# cm² au lieu de cm³) ; questions 05 (fond 5 × 2, 30 chocolats → 3 couches, rép. B) et 07 (cube d'arête
# 4 cm → 64 cm³, rép. A) ; défi 08 (rouge 6 × 2 × 2 = 24, bleue 3 × 3 × 3 = 27 : la bleue, 3 de plus).
# Chocolats : Empilement (solides_cm1_commun), opaques, posés couche par couche (une couche du dessus est
# dessinée après celle du dessous) ; la boîte = Empilement.boite (pointillés).
# Audit : bash <notes>/outils/dry.sh volume_defi VolumeDefi6e
# HD : bash <notes>/outils/hd.sh volume_defi VolumeDefi6e eleveai-maths-6e-volume-defi manim/sorties/6e/maths/volume/05-defi
# Sortie : manim/sorties/6e/maths/volume/05-defi/eleveai-maths-6e-volume-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_6e_commun import *  # noqa: E402,F403

CHOCO = "#a0522d"      # un chocolat
TRAIT_CH = "#2a1206"
BOITE_C = "#f9a8d4"    # la boîte (pointillés roses)
ROUGE_B = "#ef4444"
BLEU_B = "#3b82f6"
COUCHE_C = "#38bdf8"   # le mot « couche »


def dans(ref, positions, couleur=CHOCO, trait=TRAIT_CH):
    """Un Empilement de `positions` posé dans le repère de l'Empilement `ref` (même e, même origine)."""
    emp = Empilement(positions, e=ref.e, couleur=couleur, trait=trait)
    emp.shift(ref._dec - emp._dec)
    emp._dec = ref._dec
    return emp


def couche(ref, L, Pr, y, couleur=CHOCO):
    """La couche n° y (0 = le fond) d'une boîte L × Pr."""
    return dans(ref, [(x, y, z) for x in range(L) for z in range(Pr)], couleur)


def cotes_boite(ref, L, H, Pr, textes=("", "", ""), fs=26, couleur=LONG_C):
    """Les trois cotes d'un pavé : longueur (devant, en bas), largeur (fuyante, à droite), hauteur (à gauche)."""
    c1 = fleche_cote(ref.pp((0, 0, 0)) + DOWN * 0.22, ref.pp((L, 0, 0)) + DOWN * 0.22, textes[0], fs, couleur, DOWN, 0.08)
    c2 = fleche_cote(ref.pp((L, 0, 0)) + P(0.22, -0.1), ref.pp((L, 0, Pr)) + P(0.22, -0.1), textes[1], fs, couleur,
                     RIGHT, 0.08)
    c3 = fleche_cote(ref.pp((0, 0, 0)) + LEFT * 0.22, ref.pp((0, H, 0)) + LEFT * 0.22, textes[2], fs, couleur, LEFT,
                     0.08)
    for c in (c1, c2, c3):
        hors_audit(c)
    return c1, c2, c3


class VolumeDefiBase(PaysageVolume6e):
    nom_voix = "6e-volume-defi"
    fichier_marques = "volume_defi_marques.json"

    def calc(self, pieces, x, y, ex, fs=32, buff=0.15):
        """Un calcul écrit au fil de la voix : chaque morceau (UN nombre) à SON extrait (qui
        commence par ce nombre). pieces : (texte, couleur)."""
        lg = self.ligne(pieces, fs, buff=buff)
        gauche(lg, x, y)
        self.aux_extraits(lg, ex)
        return lg

    def poser(self, emp, shift=DOWN * 0.3, run_time=0.45, lag=0.04, avec=()):
        """Les chocolats d'une couche se posent un par un (dans l'ordre de dessin)."""
        self.play(LaggedStart(*[FadeIn(c, shift=shift) for c in emp], lag_ratio=lag), *avec, run_time=run_time)
        self.add(emp)

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les volumes", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis sur les volumes")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        ref = Empilement(pave_cubes(3, 2, 2), e=0.75, centre=P(4.1, 0.6))
        boite = ref.boite(3, 2, 2, BOITE_C, 4)
        bas = couche(ref, 3, 2, 0)
        haut = dans(ref, [(x, 1, 1) for x in range(3)])
        manque = VGroup(*[ref.fantome((x, 1, 0), JAUNE_TITRE, 4) for x in range(3)])
        self.au_mot("Sauras-tu retrouver un volume")
        q = self.bloc(["Sauras-tu retrouver un volume,", "ou ce qui manque ?"], 36, JAUNE_TITRE)
        gauche(q, -6.2, 0.6)
        self.play(FadeIn(q[0], shift=UP * 0.1), Create(boite), run_time=0.45)
        self.poser(bas, run_time=0.4)
        self.poser(haut, run_time=0.3)
        self.au_mot("ou ce qui manque")
        self.play(FadeIn(q[1], shift=UP * 0.1), Create(manque), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        cp = clara(1.0).move_to(P(-5.1, 0.3))
        self.au_mot("Voici Clara")
        nom = self.t("Clara", 40, BLEU_CALCUL).next_to(cp, UP, buff=0.2)
        self.play(FadeIn(cp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est pâtissière")
        met = self.bloc(["pâtissière et", "chocolatière"], 26, BLEU_CALCUL).next_to(cp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        un = Empilement([(0, 0, 0)], e=1.0, centre=P(-2.1, 1.3), couleur=CHOCO, trait=TRAIT_CH)
        self.au_mot("Elle range ses chocolats")
        self.play(FadeIn(un, scale=0.5), run_time=0.35)
        self.au_mot("en forme de petits cubes")
        l1 = self.bloc(["en forme de", "petits cubes"], 28).next_to(un, DOWN, buff=0.3)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(un, color="#fbbf24", scale_factor=1.1), run_time=0.4)
        ref = Empilement(pave_cubes(4, 2, 3), e=0.6, centre=P(2.6, 1.0))
        boite = ref.boite(4, 2, 3, BOITE_C, 4)
        self.au_mot("dans des boîtes en pavé droit")
        l2 = self.t("des boîtes en pavé droit", 28).move_to(P(2.6, -0.55))
        self.play(Create(boite), FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        c0, c1 = couche(ref, 4, 3, 0), couche(ref, 4, 3, 1)
        self.poser(c0, run_time=0.4, lag=0.03)
        self.poser(c1, run_time=0.4, lag=0.03)
        self.au_mot("combien de chocolats il faut")
        q = self.t("Combien de chocolats faut-il ?", 36, JAUNE_TITRE).move_to(P(-1.0, -2.6))
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 02 : une couche, puis les couches ───────────────────────────────────
    def ecran_boite(self):
        self.ecran("02-boite")
        self.au_mot("Première boîte")
        tit = self.t("Première boîte", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        ref = Empilement(pave_cubes(4, 2, 3), e=0.65, centre=P(-4.4, 0.6))
        boite = ref.boite(4, 2, 3, BOITE_C, 4)
        self.play(Write(tit), Create(boite), run_time=0.5)
        c1, c2, c3 = cotes_boite(ref, 4, 2, 3, ("4", "3", "2"))
        x = -2.0
        dims = self.ligne([("4 de long,", WHITE), ("3 de large,", WHITE), ("2 de haut.", WHITE)], 30, buff=0.2)
        gauche(dims, x, 2.1)
        self.aux_extraits([VGroup(dims[0], c1), VGroup(dims[1], c2), VGroup(dims[2], c3)],
                          ["4 chocolats de long", "3 de large", "2 de haut"])
        k0, k1 = couche(ref, 4, 3, 0), couche(ref, 4, 3, 1)
        self.au_mot("Une couche")
        u = self.t("Une couche :", 32, COUCHE_C)
        gauche(u, x, 1.0)
        self.poser(k0, run_time=0.4, lag=0.03, avec=[FadeIn(u, shift=UP * 0.1)])
        self.calc([("4", BLEU_D), ("× 3", BLEU_D), ("= 12 chocolats.", BLEU_D)], u.get_right()[0] + 0.2, 1.0,
                  ex=["4 fois 3", "3, 12", "12 chocolats. Deux"])
        self.au_mot("Deux couches")
        d = self.t("Deux couches :", 32, COUCHE_C)
        gauche(d, x, 0.1)
        self.poser(k1, run_time=0.4, lag=0.03, avec=[FadeIn(d, shift=UP * 0.1)])
        lg = self.calc([("12", BLEU_D), ("× 2", BLEU_D), ("= 24 chocolats.", VERT_OK)], d.get_right()[0] + 0.2, 0.1,
                       ex=["12 fois 2", "2, 24", "24 chocolats"])
        self.insister(lg[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 03 : ce qui manque ──────────────────────────────────────────────────
    POSES2 = [(x, 1, 2) for x in range(4)] + [(0, 1, 1)]   # les 5 chocolats de la 2e couche

    def ecran_manque(self):
        self.ecran("03-manque")
        self.au_mot("Deuxième boîte")
        tit = self.t("Deuxième boîte, la même.", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        ref = Empilement(pave_cubes(4, 2, 3), e=0.65, centre=P(-4.4, 0.6))
        boite = ref.boite(4, 2, 3, BOITE_C, 4)
        cotes = cotes_boite(ref, 4, 2, 3, ("4", "3", "2"))
        self.play(Write(tit), Create(boite), FadeIn(VGroup(*cotes)), run_time=0.5)
        x = -2.0
        k0 = couche(ref, 4, 3, 0)
        self.au_mot("Clara a rempli")
        l1 = self.t("Première couche remplie,", 30, COUCHE_C)
        gauche(l1, x, 2.1)
        self.poser(k0, run_time=0.45, lag=0.03, avec=[FadeIn(l1, shift=UP * 0.1)])
        p5 = dans(ref, self.POSES2)
        l2 = self.t("5 chocolats sur la deuxième.", 30, COUCHE_C)
        gauche(l2, x, 1.4)
        self.au_mot("5 chocolats")
        self.poser(p5, run_time=0.45, lag=0.15, avec=[FadeIn(l2, shift=UP * 0.1)])
        self.au_mot("Elle en a posé")
        po = self.t("Posés :", 32)
        gauche(po, x, 0.5)
        self.play(FadeIn(po), Indicate(VGroup(k0, p5), color="#fbbf24", scale_factor=1.03), run_time=0.35)
        self.calc([("12", BLEU_D), ("+ 5", BLEU_D), ("= 17.", BLEU_D)], po.get_right()[0] + 0.2, 0.5,
                  ex=["12 plus", "5, 17", "17. Il"])
        manque = [(x_, 1, z) for x_ in range(4) for z in range(3) if (x_, 1, z) not in self.POSES2]
        fant = VGroup(*[ref.fantome(q, JAUNE_TITRE, 4) for q in sorted(manque, key=lambda q: (-q[2], q[0]))])
        self.au_mot("Il en manque")
        mq = self.t("Il en manque :", 32, JAUNE_TITRE)
        gauche(mq, x, -0.4)
        self.play(FadeIn(mq), LaggedStart(*[Create(f) for f in fant], lag_ratio=0.1), run_time=0.35)
        lg = self.calc([("24", BLEU_D), ("− 17", BLEU_D), ("= 7 chocolats.", VERT_OK)], mq.get_right()[0] + 0.2, -0.4,
                       ex=["24 moins", "17, 7", "7 chocolats"])
        self.insister(lg[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : le nombre de couches ───────────────────────────────────────────
    def ecran_hauteur(self):
        self.ecran("04-hauteur")
        self.au_mot("Troisième boîte")
        tit = self.t("Troisième boîte", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.4)
        ref = Empilement(pave_cubes(4, 3, 3), e=0.68, centre=P(-4.3, 0.3))
        x = -1.9
        self.au_mot("Clara a 36")
        l0 = self.t("Clara a 36 chocolats.", 32)
        gauche(l0, x, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        k = [couche(ref, 4, 3, y) for y in range(3)]
        c1, c2, c3 = cotes_boite(ref, 4, 3, 3, ("4", "3", "3"))
        self.au_mot("Le fond fait")
        f0 = self.t("Le fond :", 30, COUCHE_C)
        gauche(f0, x, 1.4)
        self.poser(k[0], run_time=0.4, lag=0.03, avec=[FadeIn(f0, shift=UP * 0.1)])
        fl = self.ligne([("4", WHITE), ("sur 3,", WHITE), ("soit 12 par couche.", COUCHE_C)], 30, buff=0.15)
        gauche(fl, f0.get_right()[0] + 0.2, 1.4)
        self.aux_extraits([VGroup(fl[0], c1), VGroup(fl[1], c2), fl[2]], ["4 sur 3", "3 : 12", "12 chocolats par"])
        self.au_mot("Combien de couches")
        q = self.t("Combien de couches ?", 34, JAUNE_TITRE)
        gauche(q, x, 0.6)
        qm = self.t("?", 60, JAUNE_TITRE).move_to(ref.pp((2, 2.0, 1.5)))
        self.play(FadeIn(q, shift=UP * 0.1), FadeIn(qm, scale=1.4), run_time=0.35)
        lg = self.calc([("36", BLEU_D), ("÷ 12", BLEU_D), ("= 3 couches.", VERT_OK)], x, -0.2,
                       ex=["36 divisé", "12, 3", "3 couches. La"], fs=34)
        self.play(FadeOut(qm), LaggedStart(*[FadeIn(c, shift=DOWN * 0.5) for c in list(k[1]) + list(k[2])],
                                           lag_ratio=0.02), run_time=0.35)
        self.add(k[1], k[2])
        self.au_mot("La boîte doit avoir")
        l4 = self.t("La boîte doit avoir 3 chocolats de haut.", 30, VERT_OK)
        gauche(l4, x, -1.2)
        boite = ref.boite(4, 3, 3, BOITE_C, 4)
        self.play(FadeIn(l4, shift=UP * 0.1), GrowFromCenter(c3), Create(boite), run_time=0.4)
        self.insister(lg[2], 1.12, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        ref = Empilement(pave_cubes(5, 3, 2), e=0.5, centre=P(-3.6, 1.5))
        k = [couche(ref, 5, 2, y) for y in range(3)]
        c1, c2, _ = cotes_boite(ref, 5, 3, 2, ("5", "2", ""))

        def autres_q(sc):
            sc.play(FadeIn(k[0], shift=UP * 0.2), FadeIn(c1), FadeIn(c2), run_time=0.35)

        def apres(sc):
            l0 = sc.rep_bas(0, [("Une couche :", COUCHE_C), "5", "× 2", "= 10 chocolats."], fs=32, y0=-1.3, pas=0.58,
                            buff=0.15)
            sc.au_mot("Une couche")
            sc.play(FadeIn(l0[0], shift=UP * 0.08), Indicate(k[0], color="#fbbf24", scale_factor=1.05), run_time=0.3)
            sc.aux_extraits(l0[1:], ["5 fois 2", "2, 10", "10 chocolats. 30"])
            l1 = sc.rep_bas(1, ["30", "÷ 10", "= 3 couches."], fs=32, y0=-1.3, pas=0.58, buff=0.15)
            sc.aux_extraits(l1, ["30 divisé", "10, 3", "3 couches. 10"])
            sc.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for c in list(k[1]) + list(k[2])], lag_ratio=0.02),
                    run_time=0.3)
            sc.add(k[1], k[2])
            l2 = sc.rep_bas(2, [("10, c'est le nombre de chocolats", ORANGE_RETENUE)], fs=32, y0=-1.3, pas=0.58)
            sc.aux_extraits(l2, ["10, c'est le nombre"])
            l3 = sc.rep_bas(3, [("d'une couche.", ORANGE_RETENUE)], fs=32, y0=-1.3, pas=0.58)
            sc.au_mot("d'une couche")
            sc.play(FadeIn(l3, shift=UP * 0.08), Indicate(k[0], color=ORANGE_RETENUE, scale_factor=1.05), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Un fond de 5 sur 2,", "30 chocolats.", "Combien de couches ?"],
                            [self.choix("10 couches"), self.choix("3 couches"), self.choix("6 couches")], 1,
                            ["Une couche : 5 × 2 = 10 chocolats.", "30 ÷ 10 = 3 couches.",
                             "10, c'est le nombre de chocolats", "d'une couche."],
                            mot_q="Une boîte a un fond", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention au piège")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        ref = Empilement(pave_cubes(4, 2, 3), e=0.7, centre=P(-4.5, 0.5))
        bt = VGroup(ref.boite(4, 2, 3, BOITE_C, 4), couche(ref, 4, 3, 0), couche(ref, 4, 3, 1))
        self.play(Write(tit), FadeIn(bt), run_time=0.45)
        x = -1.6
        el = visage(personne(peau="#e0ac69", tenue="#2563eb", cheveux="#111827", s=0.6)).move_to(P(-0.9, 0.9))
        self.au_mot("Un élève écrit")
        l0 = self.t("Un élève écrit :", 32)
        gauche(l0, x, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(el, shift=UP * 0.2), run_time=0.35)
        bu = RoundedRectangle(width=2.8, height=1.0, corner_radius=0.2, fill_color=WHITE, fill_opacity=1, stroke_width=0)
        bu.move_to(P(1.6, 1.1))
        n24 = Text("24", font_size=44, color=BLACK, weight=BOLD)
        u2 = Text("cm²", font_size=44, color=BLACK, weight=BOLD)
        ecrit = VGroup(n24, u2).arrange(RIGHT, buff=0.2).move_to(bu)
        self.au_mot("24 centimètres carrés")
        self.play(FadeIn(bu, scale=0.8), FadeIn(ecrit), run_time=0.35)
        self.au_mot("Le nombre est juste")
        l1 = self.t("Le nombre est juste,", 32, VERT_OK)
        gauche(l1, x, -0.3)
        ok = Circle(radius=0.42, color=VERT_OK, stroke_width=6).move_to(n24)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(ok), run_time=0.35)
        self.au_mot("mais l'unité est fausse")
        l2 = self.t("mais l'unité est fausse.", 32, ROUGE_ERREUR)
        gauche(l2, x, -0.95)
        xx = Cross(u2, stroke_color=ROUGE_ERREUR, stroke_width=8)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(xx), run_time=0.35)
        self.au_mot("Un volume a le petit 3")
        l3 = self.t("Un volume a le petit 3 :", 32)
        gauche(l3, x, -1.75)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("24 centimètres cubes")
        g = self.gros("24 cm³", couleur=VERT_OK, fs=46)
        gauche(g, x, -2.75)
        self.play(FadeIn(g, scale=1.2), run_time=0.35)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        ref = Empilement(pave_cubes(4, 4, 4), e=0.38, centre=P(-3.6, 1.55))
        k = [couche(ref, 4, 4, y, VOL_C) for y in range(4)]
        c1 = fleche_cote(ref.pp((0, 0, 0)) + DOWN * 0.2, ref.pp((4, 0, 0)) + DOWN * 0.2, "4 cm", 26, LONG_C, DOWN, 0.08)
        hors_audit(c1)

        def autres_q(sc):
            sc.play(*[FadeIn(c) for c in k], FadeIn(c1), run_time=0.35)
            for c in k:
                sc.add(c)

        def apres(sc):
            kw = dict(fs=30, y0=-1.15, pas=0.52, buff=0.14)
            l0 = sc.rep_bas(0, [("Une couche :", COUCHE_C), "4", "× 4", "= 16."], **kw)
            sc.au_mot("Une couche")
            sc.play(FadeIn(l0[0], shift=UP * 0.08), *[c.animate.set_opacity(0.15) for c in k[1:]], run_time=0.3)
            sc.aux_extraits(l0[1:], ["4 fois 4", "4, 16", "16. 4"])
            l1 = sc.rep_bas(1, ["4 couches :", "16", "× 4", "= 64 cm³."], **kw)
            sc.aux_extraits(l1[:1], ["4 couches"])
            sc.play(*[c.animate.set_opacity(1) for c in k[1:]], run_time=0.25)
            sc.aux_extraits(l1[1:], ["16 fois", "4, 64", "64 centimètres"])
            l2 = sc.rep_bas(2, [("16, c'est une seule couche.", ORANGE_RETENUE)], **kw)
            sc.aux_extraits(l2, ["16, c'est une"])
            l3 = sc.rep_bas(3, [("12, c'est", ORANGE_RETENUE), ("4", ORANGE_RETENUE), ("+ 4", ORANGE_RETENUE),
                                ("+ 4 :", ORANGE_RETENUE)], **kw)
            sc.aux_extraits(l3, ["12, c'est", "4 plus 4 plus 4", "4 plus 4 :", "4 : on"])
            l4 = sc.rep_bas(4, [("on a additionné.", ORANGE_RETENUE)], **kw)
            sc.au_mot("on a additionné")
            sc.play(FadeIn(l4, shift=UP * 0.08), run_time=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Un cube a une arête", "de 4 cm.", "Quel est son volume ?"],
                            [self.choix("64 cm³"), self.choix("16 cm³"), self.choix("12 cm³")], 0,
                            ["Une couche : 4 × 4 = 16.", "4 couches : 16 × 4 = 64 cm³.", "16, c'est une seule couche.",
                             "12, c'est 4 + 4 + 4 :", "on a additionné."],
                            mot_q="Un cube a une arête", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def boites(self, e, cr, cb):
        rouge = Empilement(pave_cubes(6, 2, 2), e=e, centre=cr, couleur=ROUGE_B, trait="#450a0a")
        bleue = Empilement(pave_cubes(3, 3, 3), e=e, centre=cb, couleur=BLEU_B, trait="#172554")
        return rouge, bleue

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        rouge, bleue = self.boites(0.5, P(-4.1, 0.9), P(2.0, 0.9))
        cp = clara(0.75).move_to(P(4.6, 0.9))
        self.au_mot("Clara a deux boîtes")
        l0 = self.t("Clara a deux boîtes.", 32)
        gauche(l0, -6.0, 2.3)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(cp, shift=UP * 0.2), run_time=0.35)
        lr = self.ligne([("Boîte rouge :", ROUGE_B), ("6", WHITE), ("sur 2", WHITE), ("sur 2.", WHITE)], 28, buff=0.14)
        gauche(lr, -6.0, -0.45)
        self.au_mot("La boîte rouge")
        self.play(FadeIn(lr[0], shift=UP * 0.1), FadeIn(rouge, scale=0.7), run_time=0.35)
        self.aux_extraits(lr[1:], ["6 sur 2", "2 sur 2", "2. La"])
        lb = self.ligne([("Boîte bleue :", BLEU_B), ("3", WHITE), ("sur 3", WHITE), ("sur 3.", WHITE)], 28, buff=0.14)
        gauche(lb, 0.2, -0.45)
        self.au_mot("La boîte bleue")
        self.play(FadeIn(lb[0], shift=UP * 0.1), FadeIn(bleue, scale=0.7), run_time=0.35)
        self.aux_extraits(lb[1:], ["3 sur 3 sur", "3 sur 3.", "3. Laquelle"])
        self.au_mot("Laquelle contient le plus")
        q = self.bloc(["Laquelle contient le plus de chocolats,", "et combien de plus ?"], 32, JAUNE_TITRE)
        gauche(q, -6.0, -1.65)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, -6.0, -2.95)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        rouge, bleue = self.boites(0.45, P(-4.7, 1.6), P(-4.7, -0.85))
        self.add(rouge, bleue)
        x, fs = -2.6, 30
        self.au_mot("La rouge")
        r0 = self.t("Rouge :", fs, ROUGE_B)
        gauche(r0, x, 1.6)
        self.play(FadeIn(r0), Indicate(rouge, color="#fca5a5", scale_factor=1.04), run_time=0.3)
        self.calc([("6", BLEU_D), ("× 2", BLEU_D), ("= 12 ;", BLEU_D), ("× 2", BLEU_D), ("= 24 chocolats.", ROUGE_B)],
                  r0.get_right()[0] + 0.2, 1.6, ex=["6 fois 2", "2, 12", "12 ; fois", "2, 24", "24 chocolats"], fs=fs)
        self.au_mot("La bleue :")
        b0 = self.t("Bleue :", fs, BLEU_B)
        gauche(b0, x, -0.85)
        self.play(FadeIn(b0), Indicate(bleue, color="#93c5fd", scale_factor=1.04), run_time=0.3)
        self.calc([("3", BLEU_D), ("× 3", BLEU_D), ("= 9 ;", BLEU_D), ("× 3", BLEU_D), ("= 27 chocolats.", "#60a5fa")],
                  b0.get_right()[0] + 0.2, -0.85, ex=["3 fois 3", "3, 9", "9 ; fois", "3, 27", "27 chocolats"], fs=fs)
        self.au_mot("La bleue en contient le plus")
        l2 = self.t("La bleue en contient le plus :", 30, VERT_OK)
        gauche(l2, -6.2, -2.2)
        cad = SurroundingRectangle(bleue, color=VERT_OK, buff=0.1, stroke_width=6)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(cad), run_time=0.35)
        lg = self.calc([("27", BLEU_D), ("− 24", BLEU_D), ("= 3 chocolats de plus.", VERT_OK)], -6.2, -2.9,
                       ex=["27 moins", "24, 3", "3 chocolats de plus"], fs=34)
        self.insister(lg[2], 1.1, 0.25)
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        ref = Empilement(pave_cubes(4, 2, 3), e=0.6)
        fig = VGroup(ref.boite(4, 2, 3, BOITE_C, 4), couche(ref, 4, 3, 0), couche(ref, 4, 3, 1))
        lignes = self.finale_gauche(fig, textes=[
            ("Un défi, étape par étape :", "une couche, puis les couches."),
            ("Ce qui manque : une soustraction ;", "les couches : une division."),
            ("On vérifie l'unité :", "le petit 3.")], fs=30, x_fig=-4.9, xl=-2.6)
        for f in lignes.get_family():
            f.sans_synchro = True
        hors_audit(lignes)
        self.add(fig)
        self.au_mot("Un défi se résout")
        self.montrer_ligne(lignes[0])
        self.au_mot("Ce qui manque se trouve")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et on vérifie l'unité")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_boite()
        self.ecran_manque()
        self.ecran_hauteur()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class VolumeDefi6e(VolumeDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "bleue"
