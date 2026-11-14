# solides_patron.py
# EleveAI — Maths CE2 — série « Solides et espace », épisode 04 : LE PATRON DU CUBE
# (micro ce2_solide_patron, notion solides), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE.
# Vidéo COMMUNE : sert aussi au CM1 (`aussi`).
# Short jumeau : film Ti Margo (6 carrés en ligne = un tunnel ; la croix fait un vrai dé, réponse B).
# Décor et métier : Théo, DESIGNER D'EMBALLAGES (centre : art-design).
# Mapping micro → écrans : 02 (le patron : découper, plier), 03 (6 carrés pareils), 04 (pliage : fond,
# 4 côtés, couvercle), 06 (piège : 6 carrés en bloc ne ferment pas), questions 05 (6 carrés, rép. B)
# et 07 (la croix, rép. A ; la ligne = un tunnel), défi 08 (le carré oublié : place 2).
# Pliage en 3D : Patron (solides_ce2_commun), couché sur la table puis plié carré par carré.
# Voix : manim/voix/ce2-solides-patron.json (validée le 14/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/solides_patron.py SolidesPatronCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/solides_patron.py SolidesPatronCE2 -o eleveai-maths-ce2-solides-patron --media_dir manim/scripts/ce2/media-sol-04
# Sortie : manim/sorties/ce2/maths/solides/04-patron/eleveai-maths-ce2-solides-patron.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_ce2_commun import *  # noqa: E402,F403

FOND = "#38bdf8"
COTE = "#a3e635"
COUV = "#f472b6"
TOUT90 = {"g": 90, "d": 90, "av": 90, "ar": 90, "couv": 90}


class SolidesPatronBase(PaysageSolidesCE2):
    nom_voix = "ce2-solides-patron"
    fichier_marques = "solides_patron_marques.json"

    def plier_tout(self, pa, run_time=2.4):
        self.play(pa.plier(tilt=0, run_time=0.8))
        self.play(pa.plier({k: 90 for k in pa.angles if k != pa.racine and k != "couv"}, run_time=run_time * 0.6))
        if "couv" in pa.angles:
            self.play(pa.plier({"couv": 90}, run_time=run_time * 0.4))

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le patron du cube", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le patron du cube")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        q = self.bloc(["Comment un carton à plat", "devient-il un cube ?"], 40)
        q.move_to(P(0, 0.6)).align_to(P(-6.2, 0), LEFT)
        pa = Patron("croix", e=0.62, centre=P(3.8, 0.7))
        self.au_mot("Comment")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(pa), run_time=0.5)
        self.plier_tout(pa, 2.0)
        self.attendre_voix(marge=0.6)

    def ecran_situation(self):
        self.ecran("01-situation")
        tp = theo(1.0).move_to(P(-5.3, 0.2))
        self.au_mot("Voici Théo")
        nom = self.t("Théo", 42, BLEU_CALCUL).next_to(tp, UP, buff=0.2)
        self.play(FadeIn(tp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("designer d'emballages")
        met = self.bloc(["designer", "d'emballages"], 28, BLEU_CALCUL).next_to(tp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        boites = VGroup(pave(1.2, 0.8, 0.7, e=0.9, couleur="#ef4444"), cube(e=0.8, couleur="#22c55e"),
                        pave(0.6, 1.3, 0.5, e=0.9, couleur="#3b82f6")).arrange(RIGHT, buff=0.4, aligned_edge=DOWN) \
            .move_to(P(-1.2, 1.9))
        self.au_mot("les boîtes")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.2) for b in boites], lag_ratio=0.2), run_time=0.7)
        self.au_mot("en forme de cube")
        c = cube(e=1.3, centre=P(3.8, 1.8), couleur=CARTON, couleur_trait="#fef3c7")
        self.play(FadeIn(c, scale=0.6), run_time=0.4)
        carton = Rectangle(width=5.4, height=3.3, fill_color="#92400e", fill_opacity=0.45, stroke_width=0) \
            .move_to(P(0.9, -1.3))
        pa = Patron("croix", e=0.62, centre=P(0.9, -1.3))
        self.au_mot("à plat")
        self.play(FadeIn(carton), Create(pa), run_time=0.9)
        self.attendre_voix()

    # ── 02 : le patron ──────────────────────────────────────────────────────
    def ecran_patron(self):
        self.ecran("02-patron")
        pa = Patron("croix", e=0.75, centre=P(-3.4, 0.6))
        self.add(pa)
        self.au_mot("s'appelle un patron")
        tit = self.t("Un patron", 48, JAUNE_TITRE)
        gauche(tit, 0.6, 2.6)
        self.play(Write(tit), Indicate(pa, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.6)
        l1 = self.t("On le découpe,", 32)
        gauche(l1, 0.6, 1.5)
        bord = VGroup(*[pa.contour_carre(k, WHITE, 6) for k in pa.cel])
        self.au_mot("On le découpe")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(bord), run_time=0.7)
        self.remove(bord)
        l2 = self.t("on le plie le long des traits,", 30)
        gauche(l2, 0.6, 0.75)
        ch = pa.charnieres()
        self.au_mot("on le plie")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(ch), run_time=0.6)
        l3 = self.t("il se referme en cube.", 32, VERT_OK)
        gauche(l3, 0.6, 0.0)
        self.au_mot("il se referme en cube")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeOut(ch), run_time=0.35)
        self.plier_tout(pa, 2.2)
        self.attendre_voix()

    # ── 03 : 6 carrés pareils ───────────────────────────────────────────────
    def ecran_six(self):
        self.ecran("03-six")
        pa = Patron("croix", e=0.8, centre=P(-3.4, 0.4))
        self.add(pa)
        c = cube(e=0.9, centre=P(-0.9, 2.5), couleur=CARTON, couleur_trait="#fef3c7")
        self.au_mot("Le cube a 6 faces")
        l0 = self.t("Le cube a 6 faces.", 36)
        gauche(l0, 0.2, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(c), run_time=0.4)
        self.au_mot("Le patron a donc 6 carrés")
        l1 = self.bloc(["Le patron a donc 6 carrés,", "tous pareils :"], 32, VERT_OK)
        gauche(l1, 0.2, 0.9)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        ordre = ["couv", "ar", "g", "fond", "d", "av"]
        objs = [pa.contour_carre(k, JAUNE_TITRE, 8) for k in ordre]
        self.compter(objs, ["1, 2", "2, 3", "3, 4", "4, 5", "5, 6", "6."],
                     numeros=[pa.centre_carre(k) for k in ordre], fs=40, couleur="#1e293b")
        self.attendre_voix()

    # ── 04 : le pliage ──────────────────────────────────────────────────────
    def ecran_plier(self):
        self.ecran("04-plier")
        pa = Patron("croix", e=0.9, centre=P(-3.2, 0.7))
        self.add(pa)
        self.au_mot("Regarde")
        self.play(pa.plier(tilt=0, run_time=0.9))
        self.au_mot("Le carré du milieu sera le fond")
        l0 = self.t("Le carré du milieu : le fond", 30, FOND)
        gauche(l0, 0.3, 2.4)
        pa.couleurs["fond"] = FOND
        f = pa.piece("fond")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(f), run_time=0.4)
        self.remove(f)
        pa.maj()
        self.au_mot("Les 4 carrés autour se relèvent")
        l1 = self.bloc(["Les 4 carrés autour", "se relèvent :", "ce sont les côtés."], 30, COTE)
        gauche(l1, 0.3, 1.2)
        pa.couleurs.update({k: COTE for k in ("g", "d", "av", "ar")})
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.play(pa.plier({"g": 90, "d": 90, "av": 90, "ar": 90}, run_time=1.2))
        self.au_mot("Le dernier carré se rabat dessus")
        l2 = self.bloc(["Le dernier carré", "se rabat dessus :", "c'est le couvercle."], 30, COUV)
        gauche(l2, 0.3, -0.75)
        pa.couleurs["couv"] = COUV
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.play(pa.plier({"couv": 90}, run_time=1.3))
        self.play(Indicate(pa, color=VERT_OK, scale_factor=1.05), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = cube(e=1.4, centre=P(-4.2, 1.2), couleur=CARTON, couleur_trait="#fef3c7")

        def autres_q(sc):
            sc.play(FadeIn(c, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, ["Un carré pour chaque face :"], fs=32)
            sc.au_mot("Un carré pour chaque face")
            sc.play(FadeIn(lg), run_time=0.3)
            lg2 = sc.rep_bas(1, ["le cube a", "6 faces,", "donc", "6 carrés."], fs=32, buff=0.2)
            sc.au_mot("le cube a")
            sc.play(FadeIn(lg2[0]), run_time=0.25)
            sc.aux_extraits([lg2[1]], ["6 faces"])
            sc.au_mot("donc")
            sc.play(FadeIn(lg2[2]), run_time=0.2)
            sc.aux_extraits([lg2[3]], ["6 carrés"])
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Combien de carrés faut-il", "dans le patron d'un cube ?"],
                            [self.choix("4 carrés"), self.choix("6 carrés"), self.choix("8 carrés")], 1,
                            ["Un carré pour chaque face :", "le cube a 6 faces, donc 6 carrés."],
                            mot_q="Combien de carrés", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (6 carrés en bloc) ────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("6 carrés ne suffisent pas")
        l0 = self.t("6 carrés ne suffisent pas toujours.", 34)
        gauche(l0, -6.2, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        pa = Patron("bloc", e=0.9, centre=P(-3.4, 0.0))
        l1 = self.ligne([("en bloc :", JAUNE_TITRE), ("2 rangées de 3", JAUNE_TITRE)], 32, buff=0.2)
        gauche(l1, 0.6, 1.2)
        self.au_mot("en bloc")
        self.play(FadeIn(pa), FadeIn(l1[0]), run_time=0.4)
        self.aux_extraits([l1[1]], ["2 rangées de 3"])
        self.au_mot("On plie")
        self.play(pa.plier({"a": 90, "c": 90, "e": 90}, tilt=0, run_time=0.9))
        l2 = self.bloc(["Deux carrés arrivent", "au même endroit,"], 32, ROUGE_ERREUR)
        gauche(l2, 0.6, 0.2)
        self.au_mot("deux carrés arrivent")
        self.play(FadeIn(l2[0], shift=UP * 0.1), pa.plier({"d": 90, "f": 90}, run_time=0.8))
        dbl = VGroup(pa.contour_carre("a", ROUGE_ERREUR, 9), pa.contour_carre("d", ROUGE_ERREUR, 9))
        self.au_mot("au même endroit")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(dbl), run_time=0.4)
        self.au_mot("un côté reste ouvert")
        l3 = self.t("et un côté reste ouvert.", 32, ROUGE_ERREUR)
        gauche(l3, 0.6, -0.85)
        # le dessus : le carré qui manque, en pointillés rouges
        haut = [pa._proj(np.array(p, dtype=float)) for p in ((1, 1, 0), (2, 1, 0), (2, 1, 1), (1, 1, 1))]
        trou = DashedVMobject(Polygon(*haut, stroke_color=ROUGE_ERREUR, stroke_width=7), num_dashes=20)
        self.play(FadeIn(l3, shift=UP * 0.1), Create(trou), run_time=0.5)
        self.au_mot("Ce n'est pas un patron")
        g = self.t("Ce n'est pas un patron du cube.", 32, ROUGE_ERREUR)
        gauche(g, -1.0, -2.0)
        self.play(FadeIn(g, scale=1.1), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        nets = VGroup()
        for nom, lettre, pos in (("croix", "A", P(-5.4, 1.4)), ("ligne", "B", P(-2.6, 2.3)), ("bloc", "C", P(-2.6, 0.6))):
            n = patron_plat(nom, 0.38, pos)
            le = Text(lettre, font_size=30, color=BLEU_CALCUL, weight=BOLD).next_to(n, LEFT, buff=0.15)
            nets.add(VGroup(n, le))

        def autres_q(sc):
            sc.play(*[FadeIn(n) for n in nets], run_time=0.4)

        def apres(sc):
            sc.play(Indicate(nets[0], color=VERT_OK), run_time=0.4)
            lg = sc.rep_bas(0, ["La croix se referme bien."], fs=30)
            sc.au_mot("La croix se referme")
            sc.play(FadeIn(lg), run_time=0.3)
            lg2 = sc.rep_bas(1, ["Les 6 carrés en ligne s'enroulent comme un tunnel :"], fs=30)
            sc.aux_extraits([lg2[0]], ["6 carrés en ligne"])
            tun = Patron("ligne", e=0.5, centre=P(-2.2, 1.6), sens=-1)
            sc.play(FadeOut(nets[1]), FadeIn(tun), run_time=0.3)
            sc.play(tun.plier({k: 90 for k in tun.angles if k != "fond"}, run_time=1.4))
            lg3 = sc.rep_bas(2, ["le dessus et le dessous restent ouverts."], fs=30)
            sc.au_mot("le dessus et le dessous")
            sc.play(FadeIn(lg3), run_time=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Lequel de ces dessins", "se replie en cube ?"],
                            [self.choix("la croix"), self.choix("les 6 carrés en ligne"),
                             self.choix("les 2 rangées de 3")], 0,
                            ["La croix se referme bien.", "Les 6 carrés en ligne s'enroulent comme un tunnel :",
                             "le dessus et le dessous restent ouverts."],
                            mot_q="Lequel", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    PLACES = {"1": (0, 2), "2": (1, 3), "3": (2, 0)}

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        pa = Patron("croix", e=0.7, centre=P(-4.2, 0.3), caches={"couv"})
        self.au_mot("Théo a dessiné la croix")
        l0 = self.bloc(["Théo a dessiné la croix,", "mais il a oublié un carré :"], 34)
        gauche(l0, -1.4, 2.1)
        self.play(FadeIn(pa), FadeIn(l0[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("il a oublié un carré")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("il n'en a que", WHITE), ("5.", WHITE)], 34, buff=0.2)
        gauche(l1, -1.4, 0.95)
        self.aux_extraits(l1, ["il n'en a que", "5. Où"])
        self.au_mot("Où faut-il ajouter")
        q0 = self.t("Où faut-il ajouter le sixième :", 34, JAUNE_TITRE)
        gauche(q0, -1.4, 0.0)
        self.play(FadeIn(q0, shift=UP * 0.1), run_time=0.35)
        q1 = self.ligne([("à la place", JAUNE_TITRE), ("1,", JAUNE_TITRE), ("2", JAUNE_TITRE), ("ou 3 ?", JAUNE_TITRE)], 34,
                        buff=0.2)
        gauche(q1, -1.4, -0.7)
        pl = [pa.place(c, n) for n, c in self.PLACES.items()]
        self.aux_extraits([q1[0]] + [VGroup(q1[k + 1], pl[k]) for k in range(3)], ["à la place", "1, 2", "2 ou", "3 ?"])
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, -1.4, -1.6)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        pa = Patron("croix", e=0.8, centre=P(-3.8, 0.1), caches={"couv"})
        self.add(pa)
        self.au_mot("On plie")
        l0 = self.t("On plie : le fond, puis les côtés.", 28)
        gauche(l0, 0.2, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), pa.plier(tilt=0, run_time=0.7))
        self.play(pa.plier({"g": 90, "d": 90, "av": 90, "ar": 90}, run_time=1.4))
        self.au_mot("Il manque le couvercle")
        l1 = self.t("Il manque le couvercle !", 34, ROUGE_ERREUR)
        gauche(l1, 0.2, 1.3)
        haut = [pa._proj(np.array(p, dtype=float)) for p in ((1, 1, 1), (2, 1, 1), (2, 1, 2), (1, 1, 2))]
        trou = DashedVMobject(Polygon(*haut, stroke_color=ROUGE_ERREUR, stroke_width=7), num_dashes=20)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(trou), run_time=0.5)
        self.au_mot("c'est la place 2")
        l2 = self.bloc(["Il se rabat sur le dessus :", "c'est la place 2."], 34, VERT_OK)
        gauche(l2, 0.2, 0.15)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        # à plat : la place 2, puis tout se replie avec le couvercle
        self.play(FadeOut(trou), pa.plier({"g": 0, "d": 0, "av": 0, "ar": 0}, tilt=-90, run_time=0.4))
        p2 = pa.place(self.PLACES["2"], None, VERT_OK)
        self.play(Create(p2), run_time=0.15)
        pa.caches.discard("couv")
        pa.maj()
        self.remove(p2)
        l3 = self.t("Avec 6 carrés, la boîte est fermée.", 28, VERT_OK)
        gauche(l3, -1.4, -2.1)
        self.aux_extraits([l3], ["Avec 6"])
        self.play(pa.plier(tilt=0, run_time=0.6))
        self.play(pa.plier(TOUT90, run_time=1.5))
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        pa = Patron("croix", e=0.55)
        lignes = self.finale_gauche(pa, textes=[
            ("Un patron, c'est le solide", "déplié à plat."),
            ("Le patron d'un cube a 6 carrés pareils.",),
            ("Pliés, ils doivent se refermer", "sans trou.")], fs=30, x_fig=-4.9, xl=-2.4)
        pa.recaler()
        self.add(pa)
        self.au_mot("Un patron")
        self.montrer_ligne(lignes[0])
        self.au_mot("Le patron d'un cube")
        self.montrer_ligne(lignes[1])
        self.au_mot("une fois pliés")
        self.montrer_ligne(lignes[2])
        self.play(pa.plier(tilt=0, run_time=0.6))
        self.play(pa.plier(TOUT90, run_time=1.5))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_patron()
        self.ecran_six()
        self.ecran_plier()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class SolidesPatronCE2(SolidesPatronBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "orange"
