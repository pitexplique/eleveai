# entier_encadrer.py
# EleveAI — Maths 6e — série « Nombres entiers », épisode B3 : ENCADRER UN NOMBRE ENTIER
# (micro entier_encadrer, notion entier_nombre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (« 752 entre deux dizaines », réponse A) — série `6e-entier`.
# Décor et métier : Clara, GUIDE DE HAUTE MONTAGNE (centres : sport, nature-ecologie).
#
# Mapping micro → écrans : 02 (encadrer = serrer entre deux nombres ronds), 03 (582 entre 500 et
# 600), 05 (le RANG change l'encadrement : 9 614 à la dizaine près), 07 (encadrer aide à arrondir),
# questions 04 (47 entre deux dizaines, B), 06 (9 614 entre deux dizaines, A),
# 08 (5 280 entre deux milliers, B), défi 09 (un compteur à 26 896 km).
# ⛔ Lot B : PAS de `aussi`, la 6e a sa propre notion → 2 lignes `notion_ressources`, en 6e.
#
# Voix : manim/voix/6e-entier-encadrer.json (validée le 21/11, Julie, débit −6) ;
# marques : manim/scripts/cm1/entier_6e_encadrer_marques.json (entier_marques.py 6e:encadrer).
# ⚠️ 5 nombres à espace SANS marque (inventaire § 6bis). Quatre sont dans des CHOIX, posés par
#    `question_gauche` qui ne passe pas par `au_mot` : sans effet. Le cinquième, « 9 620 » de
#    l'écran 05, est relevé sur l'ÉNERGIE du WAV (fenêtre 10 ms, seuil 14 % — la fenêtre de 20 ms
#    ne sépare pas les mots de ce clip) : il est dit à **7,53 s**, d'où `au_t(7.53)`.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/entier_encadrer.py EntierEncadrer6e
# python -m manim render -qh --disable_caching manim/scripts/6e/entier_encadrer.py EntierEncadrer6e -o eleveai-maths-6e-entier-encadrer --media_dir manim/scripts/6e/media-ent-b3
# Sortie : manim/sorties/6e/maths/entiers/03-encadrer/eleveai-maths-6e-entier-encadrer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from entier_commun import *  # noqa: E402,F403

DOSSIER_MARQUES = Path(__file__).resolve().parents[1] / "cm1"

AVANT = BLEU_D          # la borne d'avant, toujours bleue
APRES = "#34d399"       # la borne d'après, toujours verte d'eau
DEDANS = JAUNE_TITRE    # le nombre encadré


def montagne(s=1.0, avec_sommet=True):
    """Le relief de Clara : deux cimes, le ciel, et un point sur le sommet (DANS le groupe, pour
    qu'il suive la carte quand l'appelant la déplace — le piège payé sur A1)."""
    cadre = RoundedRectangle(width=3.4 * s, height=2.5 * s, corner_radius=0.1 * s, fill_color="#0b1f38",
                             fill_opacity=0.9, stroke_color="#60a5fa", stroke_width=3)
    sol = cadre.get_center() + DOWN * 0.85 * s
    m2 = Polygon(sol + P(-0.2 * s, 0), sol + P(0.7 * s, 1.0 * s), sol + P(1.5 * s, 0),
                 fill_color="#1e3a5f", fill_opacity=1, stroke_color="#93c5fd", stroke_width=2)
    m1 = Polygon(sol + P(-1.45 * s, 0), sol + P(-0.4 * s, 1.5 * s), sol + P(0.5 * s, 0),
                 fill_color="#334155", fill_opacity=1, stroke_color="#cbd5e1", stroke_width=2)
    neige = Polygon(sol + P(-0.72 * s, 1.05 * s), sol + P(-0.4 * s, 1.5 * s), sol + P(-0.08 * s, 1.05 * s),
                    fill_color="#f8fafc", fill_opacity=1, stroke_width=0)
    g = VGroup(cadre, m2, m1, neige)
    if avec_sommet:
        pt = VectorizedPoint(sol + P(-0.4 * s, 1.5 * s))
        g.add(pt)
        g.sommet = pt
    g.cadre = cadre
    return hors_audit(g)


def compteur_velo(valeur, s=1.0, couleur=JAUNE_TITRE):
    """Le compteur du vélo : un boîtier, les chiffres dedans, « km » dessous."""
    boite = RoundedRectangle(width=2.9 * s, height=1.25 * s, corner_radius=0.16 * s, fill_color="#111827",
                             fill_opacity=1, stroke_color="#64748b", stroke_width=4)
    ecran = RoundedRectangle(width=2.6 * s, height=0.8 * s, corner_radius=0.08 * s, fill_color="#0b2b20",
                             fill_opacity=1, stroke_color="#065f46", stroke_width=2).move_to(boite)
    t = Text(nb(valeur), font_size=int(46 * s), color=couleur, weight=BOLD).move_to(ecran)
    km = Text("km", font_size=int(22 * s), color="#94a3b8", weight=BOLD).next_to(boite, DOWN, buff=0.12)
    g = VGroup(boite, ecran, t, km)
    g.ecran, g.txt = ecran, t
    return hors_audit(g)


def serrer(droite, v1, v2, y=0.95, couleur=ORANGE_RETENUE):
    """Les deux flèches qui SERRENT le nombre, l'une venant de chaque borne."""
    a = Arrow(droite.x(v1) + UP * y, droite.x(v1) + UP * y + RIGHT * 1.1, color=couleur, stroke_width=6,
              max_tip_length_to_length_ratio=0.2, buff=0)
    b = Arrow(droite.x(v2) + UP * y, droite.x(v2) + UP * y + LEFT * 1.1, color=couleur, stroke_width=6,
              max_tip_length_to_length_ratio=0.2, buff=0)
    return hors_audit(VGroup(a, b))


class EntierEncadrerBase(PaysageEntier6e):
    nom_voix = "6e-entier-encadrer"
    fichier_marques = str(DOSSIER_MARQUES / "entier_6e_encadrer_marques.json")
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Encadrer un nombre entier", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Encadrer un nombre entier")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Entre quelles centaines", 38)
        q1 = self.ligne([("se trouve", WHITE), ("582 ?", DEDANS)], 38, buff=0.22)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        mt = montagne(0.78, avec_sommet=False).move_to(P(4.1, 0.35))
        self.au_mot("Entre quelles centaines")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(mt, scale=1.08), run_time=0.4)
        self.au_mot("se trouve 582")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Clara, guide de haute montagne ─────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = clara(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Clara")
        nom = self.t("Clara", 42, "#f87171").next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est guide de haute montagne")
        met = self.bloc(["guide de", "haute montagne"], 26, "#f87171").next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        XP = 0.2
        self.au_mot("Avant de partir")
        l0 = self.t("Avant de partir,", 34)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        # ⚠️ Le relief est posé SOUS la colonne de texte : dans la colonne, les étiquettes
        #    d'altitude tomberaient sur les phrases (le piège payé sur A1).
        mt = montagne(0.86).move_to(P(3.9, -1.3))
        self.au_mot("elle situe chaque sommet")
        l1 = self.ligne([("elle situe", WHITE), ("chaque sommet", DEDANS)], 34, buff=0.2)
        self.col(l1, 1.55, XP)
        pt = Dot(mt.sommet.get_center(), radius=0.09, color=DEDANS)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(mt, scale=1.05), FadeIn(pt, scale=2.0), run_time=0.5)
        self.au_mot("entre deux altitudes rondes")
        l2 = self.bloc(["entre deux", "altitudes rondes."], 34, APRES)
        self.col(l2, 0.75, XP)
        # les deux altitudes rondes, en pointillé de part et d'autre du sommet
        h = mt.sommet.get_center()[1]
        traits = VGroup(*[DashedLine(P(mt.cadre.get_left()[0] + 0.1, y), P(mt.cadre.get_right()[0] - 0.1, y),
                                     color=c, stroke_width=3, dash_length=0.1)
                          for y, c in ((h + 0.22, APRES), (h - 0.3, AVANT))])
        self.play(FadeIn(l2, shift=UP * 0.1), Create(hors_audit(traits)), run_time=0.6)
        self.attendre_voix()

    # ── 02 : encadrer, c'est serrer entre deux nombres ronds ────────────────
    def ecran_definition(self):
        self.ecran("02-definition")
        XP = 0.35
        self.au_mot("Encadrer, c'est trouver")
        l0 = self.bloc(["Encadrer,", "c'est trouver"], 36, JAUNE_TITRE)
        self.col(l0, 2.4, XP)
        # ⚠️ Dry run du 21/11 : à larg=5,4 centrée en −3,4, l'étiquette « ◀ rond » de la borne
        #    gauche partait à x = −6,8 — au-delà de la marge de 3 % (−6,68) : 2 BORD. La droite
        #    rétrécit et se recentre, et les étiquettes perdent leurs chevrons.
        d = Droite(0, 10, n=10, larg=4.8).move_to(P(-3.0, 0.3))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(d, scale=1.04), run_time=0.5)
        self.au_mot("les deux nombres ronds")
        l1 = self.bloc(["les deux", "nombres ronds"], 36, APRES)
        self.col(l1, 1.1, XP)
        bornes = VGroup(d.nombre(0, "rond", fs=26, couleur=AVANT), d.nombre(10, "rond", fs=26, couleur=APRES))
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(hors_audit(bornes), shift=UP * 0.1), run_time=0.55)
        self.au_mot("qui serrent le nombre")
        l2 = self.bloc(["qui serrent", "le nombre"], 36)
        self.col(l2, -0.2, XP)
        rep = repere(d, 6.2, "le nombre", couleur=DEDANS, fs=26)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(hors_audit(rep), scale=1.1), run_time=0.55)
        self.au_mot("au plus près")
        l3 = self.t("au plus près.", 40, ORANGE_RETENUE)
        self.col(l3, -1.35, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(serrer(d, 0, 10, y=0.95)), run_time=0.6)
        self.attendre_voix()

    # ── 03 : 582 entre 500 et 600 ───────────────────────────────────────────
    def ecran_exemple(self):
        self.ecran("03-exemple")
        self.au_mot("Pour 582")
        tit = self.ligne([("Pour", WHITE), ("582 :", DEDANS)], 40, buff=0.22)
        gauche(tit, -6.2, 3.15)
        d = Droite(500, 600, n=10, larg=7.0).move_to(P(-0.1, 0.8))
        self.play(FadeIn(tit, shift=UP * 0.1), FadeIn(d, scale=1.04), run_time=0.4)
        self.au_mot("500 est juste avant")
        b1 = d.nombre(500, nb(500), fs=34, couleur=AVANT)
        l1 = self.t("500 est juste avant,", 34, AVANT).move_to(P(-3.3, -1.25))
        self.play(FadeIn(hors_audit(b1), shift=UP * 0.1), FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("600 est juste après")
        b2 = d.nombre(600, nb(600), fs=34, couleur=APRES)
        l2 = self.t("600 est juste après.", 34, APRES).move_to(P(3.1, -1.25))
        self.play(FadeIn(hors_audit(b2), shift=UP * 0.1), FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        self.au_mot("On écrit l'encadrement")
        l3 = self.t("On écrit l'encadrement :", 34).move_to(P(-0.1, -2.05))
        rep = repere(d, 582, nb(582), couleur=DEDANS, fs=34)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(hors_audit(rep), scale=1.1), run_time=0.55)
        enc = self.ligne([(nb(500), AVANT), ("<", GRAY_B), (nb(582), DEDANS), ("<", GRAY_B), (nb(600), APRES)],
                         44, buff=0.26)
        enc.move_to(P(-0.1, -2.95))
        self.au_mot("500, puis 582")
        self.play(FadeIn(enc[0], scale=1.1), FadeIn(enc[1]), FadeIn(enc[2], scale=1.1), run_time=0.5)
        self.au_mot("puis 600")
        self.play(FadeIn(enc[3]), FadeIn(enc[4], scale=1.1), run_time=0.45)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def figure_q1(self):
        return hors_audit(Text("47", font_size=96, color=DEDANS, weight=BOLD)).move_to(P(-3.6, 1.5))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g, scale=1.1), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g, color=APRES, scale_factor=1.15), run_time=0.3)

        self.question_gauche("04-question", "04b-reponse",
                             ["Entre quelles dizaines", "consécutives", "se trouve 47 ?"],
                             [self.choix("47 et 48"), self.choix("40 et 50"), self.choix("30 et 40")], 1,
                             ["40 est la dizaine", "juste avant,", "50 la dizaine", "juste après."],
                             -0.75, mot_q="Entre quelles dizaines", autres_q=autres_q, autres_r=apres)

    # ── 05 : le RANG change l'encadrement ───────────────────────────────────
    def ecran_rang(self):
        self.ecran("05-rang")
        self.au_mot("Le rang change l'encadrement")
        tit = self.ligne([("Le rang", ORANGE_RETENUE), ("change l'encadrement.", WHITE)], 40, buff=0.22)
        gauche(tit, -6.2, 3.15)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.4)
        self.au_mot("À la dizaine près")
        l0 = self.t("À la dizaine près :", 38, ORANGE_RETENUE).move_to(P(-0.1, 2.3))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        d = Droite(9610, 9620, n=10, larg=7.0).move_to(P(-0.1, 0.5))
        self.au_mot("9 614 est entre")
        rep = repere(d, 9614, nb(9614), couleur=DEDANS, fs=36)
        self.play(FadeIn(d, scale=1.04), FadeIn(hors_audit(rep), scale=1.1), run_time=0.55)
        self.au_mot("9 610")
        b1 = d.nombre(9610, nb(9610), fs=34, couleur=AVANT)
        self.play(FadeIn(hors_audit(b1), shift=UP * 0.1), run_time=0.45)
        # ⚠️ « 9 620 » n'a PAS de marque dans cette voix : instant relevé sur l'énergie du WAV
        #    (fenêtre 10 ms, seuil 14 %) — il commence à 7,53 s.
        self.au_t(7.53)
        b2 = d.nombre(9620, nb(9620), fs=34, couleur=APRES)
        self.play(FadeIn(hors_audit(b2), shift=UP * 0.1),
                  FadeIn(serrer(d, 9610, 9620, y=1.25)), run_time=0.6)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        return hors_audit(Text(nb(9614), font_size=72, color=DEDANS, weight=BOLD)).move_to(P(-3.6, 1.5))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g, scale=1.1), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g, color=APRES, scale_factor=1.12), run_time=0.3)

        self.question_gauche("06-question", "06b-reponse",
                             ["Encadre " + nb(9614), "entre deux dizaines", "consécutives."],
                             [self.choix(nb(9610) + " et " + nb(9620)),
                              self.choix(nb(9611) + " et " + nb(9621)),
                              self.choix(nb(9600) + " et " + nb(9610))], 0,
                             ["Les dizaines", "finissent par zéro.", "Juste avant : " + nb(9610) + ".",
                              "Juste après : " + nb(9620) + "."],
                             -0.75, mot_q="Encadre 9 614", autres_q=autres_q, autres_r=apres)

    # ── 07 : encadrer aide à arrondir ───────────────────────────────────────
    def ecran_arrondi(self):
        self.ecran("07-arrondi")
        self.au_mot("Encadrer aide à arrondir")
        tit = self.ligne([("Encadrer", WHITE), ("aide à arrondir.", APRES)], 40, buff=0.22)
        gauche(tit, -6.2, 3.15)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.4)
        d = Droite(40, 50, n=10, larg=7.0).move_to(P(-0.1, 0.6))
        self.au_mot("47 est entre")
        rep = repere(d, 47, "47", couleur=DEDANS, fs=38)
        self.play(FadeIn(d, scale=1.04), FadeIn(hors_audit(rep), scale=1.1), run_time=0.55)
        self.au_mot("entre 40")
        b1 = d.nombre(40, "40", fs=34, couleur=AVANT)
        self.play(FadeIn(hors_audit(b1), shift=UP * 0.1), run_time=0.4)
        self.au_mot("et 50")
        b2 = d.nombre(50, "50", fs=34, couleur=APRES)
        self.play(FadeIn(hors_audit(b2), shift=UP * 0.1),
                  Create(milieu(d, 40, 50)), run_time=0.45)
        # ⛔ « plus proche » suit « 50 » de 0,10 s : un `au_mot` de plus serait TOUJOURS en retard
        #    (le piège n° 6, payé sur A5 et A6). La ligne se cale toute seule.
        l1 = self.t("et plus proche de 50.", 38, APRES).move_to(P(-0.1, -1.7))
        fl = hors_audit(Arrow(d.x(47) + DOWN * 0.95, d.x(50) + DOWN * 0.95, color=APRES, stroke_width=6,
                              max_tip_length_to_length_ratio=0.18, buff=0))
        self.play(FadeIn(l1, shift=UP * 0.1), GrowArrow(fl), run_time=0.6)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (réponse B) ─────────────────────────────────────────
    def figure_q3(self):
        return hors_audit(Text(nb(5280), font_size=80, color=DEDANS, weight=BOLD)).move_to(P(-3.6, 1.5))

    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q3()

        def autres_q(sc):
            sc.play(FadeIn(g, scale=1.1), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g, color=APRES, scale_factor=1.12), run_time=0.3)

        self.question_gauche("08-question", "08b-reponse",
                             ["Entre quels milliers", "consécutifs", "se trouve " + nb(5280) + " ?"],
                             [self.choix(nb(5200) + " et " + nb(5300)),
                              self.choix(nb(5000) + " et " + nb(6000)),
                              self.choix(nb(4000) + " et " + nb(5000))], 1,
                             ["Les milliers finissent", "par trois zéros.", nb(5280) + " est entre",
                              nb(5000) + " et " + nb(6000) + "."],
                             -0.75, mot_q="Entre quels milliers", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Un compteur affiche")
        l0 = self.t("Un compteur affiche", 36).move_to(P(-0.1, 2.2))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("26 896 kilomètres")
        cpt = compteur_velo(26896, 1.15).move_to(P(-0.1, 0.9))
        l1 = self.t(nb(26896) + " kilomètres.", 36, DEDANS).move_to(P(-0.1, -0.35))
        self.play(FadeIn(cpt, scale=1.06), FadeIn(l1, shift=UP * 0.1), run_time=0.6)
        self.au_mot("Encadre-le entre deux dizaines")
        q = self.bloc(["Encadre-le entre", "deux dizaines consécutives."], 36, ORANGE_RETENUE)
        q.move_to(P(-0.1, -1.55))
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(cpt.txt), run_time=0.7)
        self.pause_defi(y=-2.6)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        d = Droite(26890, 26900, n=10, larg=7.0).move_to(P(-0.1, 1.0))
        rep = repere(d, 26896, nb(26896), couleur=DEDANS, fs=36)
        self.add(d, hors_audit(rep))
        self.au_mot("La dizaine juste avant")
        l0 = self.t("La dizaine juste avant", 36, AVANT).move_to(P(-0.1, -0.8))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        self.au_mot("26 890")
        b1 = d.nombre(26890, nb(26890), fs=34, couleur=AVANT)
        r1 = self.t("est " + nb(26890) + ".", 40, AVANT).move_to(P(-0.1, -1.6))
        self.play(FadeIn(hors_audit(b1), shift=UP * 0.1), FadeIn(r1, scale=1.1), run_time=0.55)
        # ⚠️ VU À L'IMAGE sur le -ql : « Juste après : » à x = −3,3 et « 26 900. » à x = +1,3
        #    laissaient un trou de 4,6 unités entre les deux morceaux d'UNE MÊME phrase, qui se
        #    lisaient comme deux fragments. Ils forment maintenant une seule ligne, posée en deux
        #    temps — chaque morceau à son mot, sans changer un mot de ce que dit la voix.
        ligne_ap = self.ligne([("Juste après :", APRES), (nb(26900) + ".", APRES)], 40, buff=0.3)
        ligne_ap.move_to(P(-0.1, -2.45))
        self.au_mot("Juste après")
        self.play(FadeIn(ligne_ap[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("26 900")
        b2 = d.nombre(26900, nb(26900), fs=34, couleur=APRES)
        self.play(FadeIn(hors_audit(b2), shift=UP * 0.1), FadeIn(ligne_ap[1], scale=1.1),
                  FadeIn(serrer(d, 26890, 26900, y=1.25)), run_time=0.6)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        # ⚠️ `finale_gauche` centre la figure en x = −4,6 : au-delà de ~3,6 unités de large, BORD.
        d = Droite(0, 10, n=5, larg=2.5)
        fig = VGroup(d, hors_audit(d.nombre(0, "rond", fs=20, couleur=AVANT)),
                     hors_audit(d.nombre(10, "rond", fs=20, couleur=APRES)),
                     hors_audit(repere(d, 6.5, "n", couleur=DEDANS, fs=24)))
        lignes = self.finale_gauche(fig, textes=[
            ("Encadrer, c'est serrer le nombre", "entre deux nombres ronds du même rang.")], fs=30)
        self.add(fig)
        self.au_mot("Encadrer, c'est serrer")
        self.montrer_ligne(lignes[0], Indicate(d, scale_factor=1.06))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_definition()
        self.ecran_exemple()
        self.ecran_question1()
        self.ecran_rang()
        self.ecran_question2()
        self.ecran_arrondi()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class EntierEncadrer6e(EntierEncadrerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
