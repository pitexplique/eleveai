# solides_defi.py
# EleveAI — Maths CM1 — série « Solides et espace », épisode 03 : DÉFI, LES CUBES CACHÉS
# (micro solide_defi, notion solides), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Va plus loin que le défi CE2 (la lampe en fil de fer : vidéo CE2 par `aussi`).
# Short jumeau : film Ti Margo (la pyramide de caisses : réponse A).
# Décor et métier : Ilan, CRÉATEUR DE DÉCORS DE JEUX VIDÉO (centres : jeux-video, construction).
# Mapping micro → écrans : 02 (escalier : colonne par colonne), 03 (cubes cachés), 04 (pavé : étage par
# étage), 06 (piège : compter seulement ce qu'on voit), questions 05 (2 × 2 × 2 = 8, rép. A) et 07
# (mur 4 × 3 = 12, rép. B), défi 08 (maison 4 × 3 × 2 = 24, posés 10, il en manque 14).
# Cubes : Empilement (solides_cm1_commun), opaques, dessinés du fond vers l'avant.
# Voix : manim/voix/cm1-solides-defi.json (validée le 14/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/solides_defi.py SolidesDefiCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/solides_defi.py SolidesDefiCM1 -o eleveai-maths-cm1-solides-defi --media_dir manim/scripts/cm1/media-sol-03
# Sortie : manim/sorties/cm1/maths/solides/03-defi/eleveai-maths-cm1-solides-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_cm1_commun import *  # noqa: E402,F403

ESC = [(0, 0, 0), (0, 1, 0), (0, 2, 0), (1, 0, 0), (1, 1, 0), (2, 0, 0)]
CACHE_C = ORANGE_RETENUE
HAUT_C = "#38bdf8"


def caches(pos):
    """Les cubes qu'on ne voit pas du tout : ni devant, ni dessus, ni à droite."""
    s = set(pos)
    return [(x, y, z) for x, y, z in pos if (x, y, z - 1) in s and (x, y + 1, z) in s and (x + 1, y, z) in s]


def etage(emp, y):
    return VGroup(*[c for q, c in emp.cubes.items() if q[1] == y])


class SolidesDefiBase(PaysageSolidesCM1):
    nom_voix = "cm1-solides-defi"
    fichier_marques = "solides_defi_marques.json"

    def reveler(self, emp, run_time=0.6, op=0.18):
        """Les cubes vus deviennent transparents, les cachés passent en orange."""
        cc = caches(list(emp.cubes))
        anims = []
        for q, c in emp.cubes.items():
            if q in cc:
                anims.append(c.animate.set_fill(CACHE_C, 1))
            else:
                anims.append(c.animate.set_fill(opacity=op))
        self.play(*anims, run_time=run_time)
        return cc

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi : les cubes cachés", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Un défi sur les solides")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        emp = Empilement(pave_cubes(3, 2, 2), e=0.75, centre=P(3.9, 0.6))
        self.au_mot("Des cubes empilés")
        l0 = self.t("Des cubes empilés :", 40)
        gauche(l0, -6.2, 1.1)
        self.play(FadeIn(l0, shift=UP * 0.1), LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in emp], lag_ratio=0.06),
                  run_time=0.9)
        self.add(emp)
        self.au_mot("combien en vois-tu")
        l1 = self.t("combien en vois-tu…", 40, JAUNE_TITRE)
        gauche(l1, -6.2, 0.3)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("et combien en caches-tu")
        l2 = self.t("et combien sont cachés ?", 40, CACHE_C)
        gauche(l2, -6.2, -0.5)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.reveler(emp)
        self.attendre_voix(marge=0.6)

    def ecran_situation(self):
        self.ecran("01-situation")
        ip = ilan(1.0).move_to(P(-4.9, 0.2))
        self.au_mot("Voici Ilan")
        nom = self.t("Ilan", 42, BLEU_CALCUL).next_to(ip, UP, buff=0.2)
        self.play(FadeIn(ip, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("décors de jeux vidéo")
        met = self.bloc(["créateur de décors", "de jeux vidéo"], 26, BLEU_CALCUL).next_to(ip, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        ecran = RoundedRectangle(width=8.2, height=4.4, corner_radius=0.2, fill_color="#0b1220", fill_opacity=1,
                                 stroke_color="#64748b", stroke_width=8).move_to(P(1.6, 0.6))
        sol = Rectangle(width=8.0, height=0.25, fill_color="#16a34a", fill_opacity=1, stroke_width=0) \
            .move_to(P(1.6, -1.2))
        self.au_mot("des blocs en forme de cube")
        bloc = Empilement([(0, 0, 0)], e=0.7, centre=P(1.6, 0.7))
        self.play(FadeIn(ecran), FadeIn(sol), FadeIn(bloc, scale=0.5), run_time=0.5)
        dec = [(Empilement(ESC, e=0.42, couleur="#a3a3a3"), "des escaliers", -1.2),
               (Empilement(pave_cubes(4, 3, 1), e=0.36, couleur="#b45309"), "des murs", 1.6),
               (Empilement(pave_cubes(3, 2, 2), e=0.42, couleur="#2563eb"), "et des maisons", 4.3)]
        self.play(FadeOut(bloc), run_time=0.2)
        for emp, mot, x in dec:
            emp.move_to(P(x, 0)).align_to(P(0, -1.07), DOWN)
            self.au_mot(mot)
            self.play(FadeIn(emp, shift=DOWN * 0.3), run_time=0.4)
        self.au_mot("Combien de cubes lui faut-il")
        q = self.t("Combien de cubes lui faut-il ?", 38, JAUNE_TITRE).move_to(P(1.0, -2.6))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : l'escalier ─────────────────────────────────────────────────────
    def ecran_escalier(self):
        self.ecran("02-escalier")
        emp = Empilement(ESC, e=1.0, centre=P(-3.8, 0.4), couleur="#a3a3a3")
        self.au_mot("Premier décor")
        tit = self.t("Premier décor : un escalier", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), FadeIn(emp), run_time=0.5)
        cols = [[q for q in ESC if q[0] == k] for k in range(3)]
        labs = VGroup()
        for k, (n, ex) in enumerate((("3", ("Une colonne de 3", 1, 0.85)), ("2", ("une de 2", 1, 0.3)), ("1", ("une de 1", 1, 0.3)))):
            lab = Text(n, font_size=40, color=JAUNE_TITRE, weight=BOLD).move_to(emp.pp((k + 0.5, -0.45, 0)))
            labs.add(lab)
            surl = VGroup(*[SurroundingRectangle(emp.cubes[q], color=JAUNE_TITRE, buff=0.02, stroke_width=5)
                            for q in cols[k]])
            self.aux_extraits([VGroup(lab, surl)], [ex])
            self.play(FadeOut(surl), run_time=0.15)
        self.au_mot("chaque cube du haut est posé")
        l1 = self.bloc(["Chaque cube du haut", "est posé sur un cube", "du dessous."], 30, ORANGE_RETENUE)
        gauche(l1, 0.6, 1.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.play(*[Indicate(emp.cubes[q], color=ORANGE_RETENUE, scale_factor=1.06) for q in ((0, 0, 0), (0, 1, 0), (1, 0, 0))],
                  run_time=0.6)
        self.au_mot("colonne par colonne")
        l2 = self.t("Colonne par colonne :", 32)
        gauche(l2, 0.6, -0.1)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        s1 = self.ligne([("3 + 2", BLEU_D), ("= 5", BLEU_D)], 36, buff=0.18)
        gauche(s1, 0.9, -0.85)
        self.aux_extraits(s1, ["3 plus 2", "5. Plus"])
        s2 = self.ligne([("5", BLEU_D), ("+ 1", BLEU_D), ("= 6 cubes", VERT_OK)], 36, buff=0.18)
        hors_audit(s2[0])
        hors_audit(s2[1])  # « Plus 1 » : l'audit le prend pour le « 1 » de « une de 1 »
        gauche(s2, 0.9, -1.6)
        self.add(s2[0])
        self.aux_extraits(s2[1:], ["Plus 1", "6 cubes"])
        self.insister(s2, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : les cubes cachés ───────────────────────────────────────────────
    def ecran_cache(self):
        self.ecran("03-cache")
        pos = pave_cubes(3, 2, 2)
        emp = Empilement(pos, e=1.1, centre=P(-3.4, 0.2))
        self.au_mot("Sur un dessin")
        l0 = self.t("Sur un dessin, on ne voit pas tous les cubes.", 32)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(emp), FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Ceux du dessous et ceux du fond")
        l1 = self.bloc(["Ceux du dessous et du fond", "sont cachés."], 30, CACHE_C)
        gauche(l1, 0.3, 1.2)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.25)
        self.au_mot("sont cachés")
        self.reveler(emp, 0.5)
        self.au_mot("Ils sont là quand même")
        g = self.bloc(["Ils sont là quand même :", "il faut les compter !"], 34, VERT_OK)
        gauche(g, 0.6, -0.8)
        self.play(FadeIn(g[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("il faut les compter")
        self.play(FadeIn(g[1], scale=1.1), run_time=0.35)
        self.attendre_voix()

    # ── 04 : étage par étage ────────────────────────────────────────────────
    def ecran_etages(self):
        self.ecran("04-etages")
        emp = Empilement(pave_cubes(3, 2, 2), e=1.0, centre=P(-3.6, -0.2), couleur="#2563eb")
        self.au_mot("Deuxième décor")
        tit = self.t("Deuxième décor : un pavé droit", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), FadeIn(emp), run_time=0.5)
        x = 0.4
        dims = self.ligne([("3 de long,", WHITE), ("2 de large,", WHITE), ("2 de haut", WHITE)], 28, buff=0.2)
        gauche(dims, 0.0, 2.1)
        self.aux_extraits(dims, ["3 cubes de long", "2 de large", "2 de haut"])
        self.au_mot("étage par étage")
        l1 = self.t("Étage par étage :", 32)
        gauche(l1, x, 1.2)
        haut = etage(emp, 1)
        self.play(FadeIn(l1, shift=UP * 0.1), haut.animate.shift(UP * 1.3), run_time=0.6)
        s1 = self.ligne([("Un étage :", HAUT_C), ("3 × 2", BLEU_D), ("= 6 cubes", BLEU_D)], 32, buff=0.2)
        gauche(s1, x, 0.4)
        self.au_mot("Un étage")
        self.play(FadeIn(s1[0]), Indicate(haut, color=HAUT_C, scale_factor=1.04), run_time=0.4)
        self.aux_extraits(s1[1:], ["3 fois 2", "6 cubes"])
        s2 = self.ligne([("2 étages :", HAUT_C), ("6 + 6", BLEU_D), ("= 12 cubes", VERT_OK)], 32, buff=0.2)
        gauche(s2, x, -0.4)
        self.aux_extraits(s2, ["2 étages", "6 plus 6", "12 cubes"])
        self.play(haut.animate.shift(DOWN * 1.3), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        emp = Empilement(pave_cubes(2, 2, 2), e=0.95, centre=P(-4.4, 1.2), couleur="#a855f7")

        def autres_q(sc):
            sc.play(FadeIn(emp, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            h = etage(emp, 1)
            lg = sc.rep_bas(0, ["Un étage :", "2 × 2", "= 4."], fs=32, buff=0.2, y0=-1.4, pas=0.6)
            sc.au_mot("Un étage")
            sc.play(FadeIn(lg[0]), h.animate.shift(UP * 0.9), run_time=0.35)
            sc.aux_extraits(lg[1:], ["2 fois 2", "4. Deux"])
            lg2 = sc.rep_bas(1, ["Deux étages :", "4 + 4", "= 8 petits cubes."], fs=32, buff=0.2, y0=-1.4, pas=0.6)
            sc.au_mot("Deux étages")
            sc.play(FadeIn(lg2[0]), h.animate.shift(DOWN * 0.9), run_time=0.35)
            sc.aux_extraits(lg2[1:], ["4 plus 4", "8 petits cubes"])
            lg3 = sc.rep_bas(2, [("4, c'est un seul étage !", ORANGE_RETENUE)], fs=32, y0=-1.4, pas=0.6)
            sc.aux_extraits([lg3[0]], [("4, c'est", 1)])
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Un grand cube de petits cubes :", "2 en longueur, 2 en largeur,", "2 en hauteur.",
                             "Combien de petits cubes ?"],
                            [self.choix("8 cubes"), self.choix("6 cubes"), self.choix("4 cubes")], 0,
                            ["Un étage : 2 × 2 = 4.", "Deux étages : 4 + 4 = 8 petits cubes.",
                             "4, c'est un seul étage !"],
                            mot_q="Un grand cube", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        emp = Empilement(pave_cubes(3, 2, 2), e=1.0, centre=P(-3.6, -0.2), couleur="#a855f7")
        self.au_mot("Si tu comptes seulement")
        l0 = self.bloc(["Si tu comptes seulement", "les cubes que tu vois,"], 32)
        gauche(l0, 0.4, 1.8)
        self.play(FadeIn(emp), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("tu en oublies")
        l1 = self.t("tu en oublies !", 34, ROUGE_ERREUR)
        gauche(l1, 0.4, 0.75)
        self.play(FadeIn(l1, scale=1.1), run_time=0.3)
        self.reveler(emp, 0.6)
        self.au_mot("Compte étage par étage")
        l2 = self.bloc(["Compte étage par étage,", "ou colonne par colonne."], 32, VERT_OK)
        gauche(l2, 0.4, -0.6)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("ou colonne par colonne")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        emp = Empilement(pave_cubes(4, 3, 1), e=0.62, centre=P(-4.3, 1.3), couleur="#b45309")

        def autres_q(sc):
            sc.play(FadeIn(emp, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, ["3 rangées de 4 cubes :", "3 × 4", "= 12 cubes."], fs=32, buff=0.2, y0=-1.4, pas=0.6)
            rang = [VGroup(*[c for q, c in emp.cubes.items() if q[1] == y]) for y in range(3)]
            sc.aux_extraits([VGroup(lg[0], *[SurroundingRectangle(r, color=JAUNE_TITRE, buff=0.03) for r in rang])],
                            ["3 rangées de 4"])
            sc.aux_extraits(lg[1:], ["3 fois 4", "12 cubes"])
            lg2 = sc.rep_bas(1, [("7, c'est 4 + 3 : on a additionné", ORANGE_RETENUE)], fs=30, y0=-1.4, pas=0.6)
            sc.aux_extraits([lg2[0]], [("7, c'est", 1)])
            lg3 = sc.rep_bas(2, [("au lieu de compter les rangées.", ORANGE_RETENUE)], fs=30, y0=-1.4, pas=0.6)
            sc.au_mot("au lieu de compter")
            sc.play(FadeIn(lg3), run_time=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Un mur : 4 cubes de long,", "3 cubes de haut,", "1 cube d'épaisseur.",
                             "Combien de cubes ?"],
                            [self.choix("7 cubes"), self.choix("12 cubes"), self.choix("10 cubes")], 1,
                            ["3 rangées de 4 cubes : 3 × 4 = 12 cubes.", "7, c'est 4 + 3 : on a additionné",
                             "au lieu de compter les rangées."],
                            mot_q="Ilan construit un mur", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    POSES = [q for q in pave_cubes(4, 1, 3) if q not in ((2, 0, 0), (3, 0, 0))]

    def maison(self, e, centre):
        emp = Empilement(self.POSES, e=e, centre=centre, couleur="#16a34a")
        ref = Empilement(pave_cubes(4, 2, 3), e=e, centre=centre)
        emp.shift(ref.pp((0, 0, 0)) - emp.pp((0, 0, 0)))
        emp._dec = ref._dec
        return emp, ref.boite(4, 2, 3, JAUNE_TITRE, 4)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        emp, boite = self.maison(0.85, P(-4.0, 0.4))
        self.au_mot("Ilan veut une maison")
        l0 = self.bloc(["Ilan veut une maison en pavé droit :"], 30)
        gauche(l0, -1.6, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(boite), run_time=0.5)
        dims = self.ligne([("4 de long,", WHITE), ("3 de large,", WHITE), ("2 de haut.", WHITE)], 32, buff=0.2)
        gauche(dims, -1.6, 1.5)
        self.aux_extraits(dims, ["4 cubes de long", "3 de large", "2 de haut"])
        l1 = self.ligne([("Il a déjà posé", WHITE), ("10 cubes.", WHITE)], 32, buff=0.2)
        gauche(l1, -1.6, 0.7)
        self.au_mot("Il a déjà posé")
        self.play(FadeIn(l1[0]), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in emp], lag_ratio=0.05),
                  run_time=0.7)
        self.add(emp)
        self.aux_extraits([l1[1]], ["10 cubes"])
        self.au_mot("Combien lui en manque-t-il")
        q = self.t("Combien lui en manque-t-il ?", 36, JAUNE_TITRE)
        gauche(q, -1.6, -0.2)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, -1.6, -1.3)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        emp, boite = self.maison(0.8, P(-4.4, 0.3))
        self.add(boite, emp)
        x = -1.6
        s1 = self.ligne([("Un étage :", HAUT_C), ("4 × 3", BLEU_D), ("= 12 cubes.", BLEU_D)], 32, buff=0.2)
        gauche(s1, x, 2.2)
        self.au_mot("Un étage")
        self.play(FadeIn(s1[0]), run_time=0.25)
        self.aux_extraits(s1[1:], ["4 fois 3", "12 cubes. 2"])
        s2 = self.ligne([("2 étages :", HAUT_C), ("12 + 12", BLEU_D), ("= 24 cubes.", BLEU_D)], 32, buff=0.2)
        gauche(s2, x, 1.4)
        self.aux_extraits(s2, ["2 étages", "12 plus 12", "24 cubes"])
        s3 = self.ligne([("Il en a posé", WHITE), ("10 :", WHITE), ("24 − 10", BLEU_D), ("= 14.", BLEU_D)], 32, buff=0.2)
        gauche(s3, x, 0.6)
        self.au_mot("Il en a posé")
        self.play(FadeIn(s3[0]), Indicate(emp, color=WHITE, scale_factor=1.03), run_time=0.35)
        self.aux_extraits(s3[1:], ["10 : 24", "24 moins 10", "14. Il"])
        self.au_mot("Il lui manque 14 cubes")
        g = self.gros("Il lui manque 14 cubes.", couleur=VERT_OK, fs=38)
        gauche(g, x, -0.6)
        self.play(FadeIn(g, scale=1.2), run_time=0.3)
        self.insister(g, 1.08, 0.25)
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        emp = Empilement(pave_cubes(3, 2, 2), e=0.7)
        lignes = self.finale_gauche(emp, textes=[
            ("Dans un empilement, des cubes sont", "cachés : ils comptent aussi."),
            ("On compte étage par étage,", "ou colonne par colonne."),
            ("Un défi : une étape après l'autre.",)], fs=30, x_fig=-4.9, xl=-2.5)
        self.add(emp)
        self.au_mot("Dans un empilement")
        self.montrer_ligne(lignes[0])
        self.au_mot("On compte étage par étage")
        self.montrer_ligne(lignes[1])
        self.au_mot("Un défi, c'est une étape")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_escalier()
        self.ecran_cache()
        self.ecran_etages()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class SolidesDefiCM1(SolidesDefiBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "bleue"
