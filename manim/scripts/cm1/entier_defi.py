# entier_defi.py
# EleveAI — Maths CM1 (+ CM2 par `aussi`) — série « Nombres entiers », épisode A6 : LE DÉFI DES
# NOMBRES (micro entier_defi, notion nombre_entier), AVEC VOIX. Paysage 16:9, ⛔ CEINTURE BLEUE.
# Short jumeau : film Ti Margo — série `cm1-entier`, ceinture BLANCHE.
# Décor et métier : Sarah, FACTRICE (centres : transports, jeux-defis).
#
# ⛔ La ceinture BLEUE est propre à cet épisode et à B5 (`6e-entier-defi`) : le défi est le cran
#    au-dessus de la paysage verte du niveau. Les cinq autres épisodes du lot A restent VERTS.
# ⛔ L'écran 07-cm2 RESTE ici (décision de Frédéric du 21/11, « Oui, garde-le ») : seul
#    `entier_multiple` en est privé.
#
# Mapping micro → écrans : 02 (les indices, un par un), 03 (le dernier indice tranche),
# 05 (quatre étiquettes : le plus grand nombre), 07 (« Et au CM2 » : juste après 6 999 999),
# questions 04 (le nombre mystère à 6 090, B), 06 (le plus petit avec 0, 6, 8, 3 — C),
# 08 (l'écart de 49 493 à 50 000, B), défi 09 (95 BD par 4 : combien en reste-t-il ?).
#
# Voix : manim/voix/cm1-entier-defi.json (validée le 21/11, Julie, débit −6) ;
# marques : entier_cm1_defi_marques.json (python manim/scripts/cm1/entier_marques.py cm1:defi).
# ⚠️ UN nombre à espace sans marque dans cette voix : « 6 100 » de l'écran 04-question
#    (INVENTAIRE § 6bis) — il est dans la LIGNE DE QUESTION, posée par `question_gauche`, qui ne
#    passe pas par `au_mot` : aucun `au_t()` n'est nécessaire ici.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/entier_defi.py EntierDefiCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/entier_defi.py EntierDefiCM1 -o eleveai-maths-cm1-entier-defi --media_dir manim/scripts/cm1/media-ent-a6
# Sortie : manim/sorties/cm1/maths/entiers/06-defi/eleveai-maths-cm1-entier-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from entier_commun import *  # noqa: E402,F403

INDICE_C = JAUNE_TITRE       # un indice qu'on applique
TROUVE_C = VERT_OK           # le nombre qui survit à tous les indices
ECARTE_C = ROUGE_ERREUR      # ce que l'indice élimine
MUR_C = "#64748b"            # le mur de la maison
TOIT_C = "#b91c1c"           # son toit


def maison(numero="?", s=1.0, couleur=INDICE_C):
    """La maison de la tournée de Sarah, avec son numéro (effacé au début).
    .plaque (le numéro) : on le remplace quand le défi est résolu."""
    mur = Rectangle(width=1.5 * s, height=1.25 * s, fill_color=MUR_C, fill_opacity=0.35,
                    stroke_color=MUR_C, stroke_width=4)
    toit = Polygon(mur.get_corner(UL) + LEFT * 0.17 * s, mur.get_corner(UR) + RIGHT * 0.17 * s,
                   mur.get_top() + UP * 0.62 * s, fill_color=TOIT_C, fill_opacity=0.8,
                   stroke_color=TOIT_C, stroke_width=4)
    porte = Rectangle(width=0.4 * s, height=0.58 * s, fill_color="#78350f", fill_opacity=0.9,
                      stroke_width=0).next_to(mur.get_bottom(), UP, buff=0).shift(LEFT * 0.34 * s)
    cadre = RoundedRectangle(width=0.78 * s, height=0.44 * s, corner_radius=0.06 * s,
                             fill_color="#f8fafc", fill_opacity=0.95, stroke_color=couleur,
                             stroke_width=3).move_to(mur.get_center() + P(0.34 * s, 0.14 * s))
    plaque = Text(str(numero), font_size=int(26 * s), color="#0f172a", weight=BOLD)
    k = min(1.0, (cadre.width - 0.14 * s) / max(plaque.width, 0.01))
    plaque.scale(k).move_to(cadre)
    g = VGroup(mur, toit, porte, cadre, plaque)
    g.plaque, g.cadre, g.mur = plaque, cadre, mur

    def ecrire_numero(txt, coul=TROUVE_C):
        """Le numéro retrouvé, à la place du « ? » — construit à la position DU MOMENT."""
        t = Text(str(txt), font_size=int(26 * s), color=coul, weight=BOLD)
        kk = min(1.0, (cadre.width - 0.14 * s) / max(t.width, 0.01))
        return hors_audit(t.scale(kk).move_to(cadre))

    g.ecrire_numero = ecrire_numero
    return hors_audit(g)


def enveloppe(s=1.0, couleur="#fef3c7"):
    """Une lettre de la tournée."""
    c = Rectangle(width=0.78 * s, height=0.52 * s, fill_color=couleur, fill_opacity=1,
                  stroke_color="#92400e", stroke_width=3)
    pli = VGroup(Line(c.get_corner(UL), c.get_bottom() + UP * 0.03 * s, color="#92400e", stroke_width=3),
                 Line(c.get_corner(UR), c.get_bottom() + UP * 0.03 * s, color="#92400e", stroke_width=3))
    return hors_audit(VGroup(c, pli))


def etiquettes(chiffres, s=1.0, buff=0.26, couleur=INDICE_C):
    """La rangée d'étiquettes-chiffres du défi (⚠️ jamais zéro devant, c'est le piège de la micro).
    .cartes : les étiquettes, dans l'ordre donné."""
    g = VGroup(*[etiquette_chiffre(d, s=s, couleur=couleur) for d in chiffres])
    g.arrange(RIGHT, buff=buff * s)
    g.cartes = VGroup(*g.submobjects)
    return hors_audit(g)


def barre_ecart(a, b, larg=5.0, s=1.0, couleur=INDICE_C):
    """L'écart jusqu'au nombre rond : une barre de a à b, le trou en orange.
    .gauche / .droite (les bornes écrites), .trou (le segment manquant)."""
    pleine = Rectangle(width=larg, height=0.42 * s, fill_color=couleur, fill_opacity=0.28,
                       stroke_color=couleur, stroke_width=3)
    trou = Rectangle(width=larg * 0.17, height=0.42 * s, fill_color=ORANGE_RETENUE, fill_opacity=0.5,
                     stroke_color=ORANGE_RETENUE, stroke_width=3)
    trou.align_to(pleine, RIGHT).align_to(pleine, UP)
    # ⛔ Vu à l'image sur le `-ql` : les deux étiquettes, posées de part et d'autre du trou, se
    #    touchaient presque et aucune ne disait OÙ était le trou. « 49 493 » marque maintenant la
    #    partie pleine (sous son milieu), « 50 000 » le bout de la barre, et un « ? » occupe le trou.
    g_lab = Text(nb(a), font_size=int(26 * s), color=WHITE, weight=BOLD)
    d_lab = Text(nb(b), font_size=int(26 * s), color=VERT_OK, weight=BOLD)
    plein = Rectangle(width=larg - trou.width, height=0.42 * s).align_to(pleine, LEFT).align_to(pleine, UP)
    g_lab.next_to(plein, DOWN, buff=0.26 * s)
    d_lab.next_to(pleine.get_right(), DOWN, buff=0.26 * s).shift(RIGHT * 0.1 * s)
    qm = Text("?", font_size=int(30 * s), color=ORANGE_RETENUE, weight=BOLD).move_to(trou)
    g = VGroup(pleine, trou, qm, g_lab, d_lab)
    g.pleine, g.trou, g.gauche, g.droite, g.qm = pleine, trou, g_lab, d_lab, qm
    return hors_audit(g)


class EntierDefiBase(PaysageEntierCM1):
    nom_voix = "cm1-entier-defi"
    fichier_marques = "entier_cm1_defi_marques.json"
    ceinture = "bleue"

    # ── 00 : page de garde (⛔ ceinture BLEUE) ──────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le défi des nombres", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le défi des nombres")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.ligne([("Un nombre mystère", JAUNE_TITRE), ("se cache", WHITE)], 36, buff=0.22)
        q1 = self.ligne([("entre", WHITE), (nb(3900), JAUNE_TITRE), ("et", WHITE),
                         (nb(4000), JAUNE_TITRE)], 36, buff=0.22)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        mai = maison("?", 1.15).move_to(P(4.3, 0.45))
        self.au_mot("Un nombre mystère")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(mai, scale=1.06), run_time=0.45)
        self.au_mot("entre 3 900 et")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Sarah, factrice ────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = sarah(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Sarah")
        nom = self.t("Sarah", 42, "#60a5fa").next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est factrice")
        met = self.bloc(["factrice"], 26, "#60a5fa").next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XP = 0.2
        self.au_mot("Un numéro de maison")
        l0 = self.bloc(["Un numéro de maison"], 34)
        self.col(l0, 2.3, XP)
        # ⛔ `col()` écrit dans la colonne de DROITE : la maison reste SOUS le texte, pas dedans.
        mai = maison("?", 1.1).move_to(P(2.6, -1.25))
        lettres = VGroup(*[enveloppe(0.9) for _ in range(3)]).arrange(RIGHT, buff=0.18)
        lettres.next_to(mai, LEFT, buff=0.55)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(mai, scale=1.05), run_time=0.5)
        self.au_mot("est effacé")
        l1 = self.ligne([("est effacé :", ROUGE_ERREUR)], 34, buff=0.2)
        self.col(l1, 1.5, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(mai.cadre, color=ROUGE_ERREUR, scale_factor=1.2),
                  run_time=0.6)
        self.au_mot("elle doit le retrouver")
        l2 = self.t("elle doit le retrouver.", 34, VERT_OK)
        self.col(l2, 0.7, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(lettres, shift=RIGHT * 0.2, lag_ratio=0.2),
                  run_time=0.7)
        self.attendre_voix()

    # ── 02 : les indices, un par un ─────────────────────────────────────────
    def droite_mystere(self, y=1.35, larg=5.0):
        """La droite 3 900 → 4 000, ses deux bornes écrites. ⛔ larg = 5,0 : à 6,0 l'étiquette de
        gauche partait à x = −6,85 (marge de 3 % : −6,68), mesuré au dry run."""
        d = Droite(3900, 4000, n=10, larg=larg).move_to(P(-3.5, y))
        g = VGroup(d, d.nombre(3900, fs=26), d.nombre(4000, fs=26, couleur=JAUNE_TITRE))
        g.d = d
        return g

    def ecran_indices(self):
        self.ecran("02-indices")
        XP = 0.35
        g = self.droite_mystere()
        self.au_mot("On garde les nombres")
        l0 = self.bloc(["On garde les nombres"], 34, JAUNE_TITRE)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("entre 3 900 et")
        l1 = self.ligne([("entre", WHITE), (nb(3900), JAUNE_TITRE), ("et", WHITE),
                         (nb(4000), JAUNE_TITRE)], 34, buff=0.18)
        self.col(l1, 1.55, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(g, scale=1.04), run_time=0.6)
        self.au_mot("Multiple de 10")
        l2 = self.ligne([("Multiple de 10 :", WHITE)], 34, buff=0.18)
        self.col(l2, 0.7, XP)
        # chaque graduation EST un multiple de 10 : on les allume une à une
        pts = VGroup(*[hors_audit(Dot(g.d.x(3900 + 10 * k), radius=0.085, color=TROUVE_C))
                       for k in range(1, 10)])
        # ⚠️ RETARD de 0,66 s au dry run : la synchro automatique retient déjà « Multiple de 10 : »
        #    jusqu'à SON dernier mot (« 10 », 5,06 s) ; les points posés ensuite en 0,9 s faisaient
        #    dépasser le mot suivant. Les deux arrivent maintenant ENSEMBLE, en 0,6 s.
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(pts, lag_ratio=0.12), run_time=0.6)
        self.au_mot("il finit par zéro")
        l3 = self.t("il finit par zéro.", 36, ZERO_C)
        self.col(l3, -0.2, XP)
        zeros = hors_audit(Text(nb(3910) + "   " + nb(3920) + "   " + nb(3930) + "   …",
                                font_size=26, color=ZERO_C, weight=BOLD))
        zeros.next_to(g, DOWN, buff=0.75)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(zeros, shift=UP * 0.08), run_time=0.5)
        self.attendre_voix()

    # ── 03 : le dernier indice tranche ──────────────────────────────────────
    def ecran_dernier_indice(self):
        self.ecran("03-dernier-indice")
        XP = 0.35
        g = self.droite_mystere()
        self.add(g)
        pts = VGroup(*[hors_audit(Dot(g.d.x(3900 + 10 * k), radius=0.085, color=GRAY_B))
                       for k in range(1, 10)])
        self.add(pts)
        self.au_mot("Son chiffre des dizaines")
        l0 = self.bloc(["Son chiffre des dizaines"], 34, JAUNE_TITRE)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        # ⛔ AUDIT-AVANCE de 0,10 s au dry run : la ligne entière partait sur « est », donc le « 2 »
        #    commençait son fondu avant d'être dit. Chaque morceau attend SON mot (piège n° 4).
        self.au_mot("est 2.")
        l1 = self.ligne([("est", WHITE), ("2.", INDICE_C)], 36, buff=0.18)
        self.col(l1, 1.55, XP)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("2. Un seul")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Un seul nombre convient")
        l2 = self.t("Un seul nombre convient :", 34)
        self.col(l2, 0.7, XP)
        rep = repere(g.d, 3920, nb(3920), couleur=TROUVE_C, fs=30)
        self.play(FadeIn(l2, shift=UP * 0.1),
                  *[p.animate.set_color(ECARTE_C).scale(0.6) for k, p in enumerate(pts) if k != 1],
                  run_time=0.7)
        self.au_mot("3 920.")
        r = self.t(nb(3920), 50, TROUVE_C)
        self.col(r, -0.25, XP)
        self.play(FadeIn(r, shift=UP * 0.1), FadeIn(rep, scale=1.15), run_time=0.6)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        d = Droite(6000, 6100, n=10, larg=4.4).move_to(P(-3.6, 1.6))
        fig = VGroup(d, d.nombre(6000, fs=23), d.nombre(6100, fs=23, couleur=JAUNE_TITRE))

        def autres_q(sc):
            sc.play(FadeIn(fig), run_time=0.4)

        def apres(sc):
            sc.play(FadeIn(hors_audit(repere(d, 6090, nb(6090), couleur=VERT_OK, fs=26)), scale=1.1),
                    run_time=0.45)

        self.question_gauche("04-question", "04b-reponse",
                             ["Je suis entre " + nb(6000) + " et " + nb(6100) + ",",
                              "multiple de 10,", "et mes dizaines valent 9."],
                             [self.choix(nb(6095)), self.choix(nb(6090)), self.choix(nb(6009))], 1,
                             ["Multiple de 10 :", "il finit par zéro.", "Avec 9 dizaines,",
                              "c'est " + nb(6090) + "."],
                             -0.75, mot_q="Je suis entre", autres_q=autres_q, autres_r=apres)

    # ── 05 : quatre étiquettes, le plus grand nombre ────────────────────────
    def ecran_etiquettes(self):
        self.ecran("05-etiquettes")
        XP = 0.35
        self.au_mot("Autre défi")
        l0 = self.bloc(["Autre défi :"], 34, JAUNE_TITRE)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        melange = etiquettes((6, 2, 7, 9), s=1.0).move_to(P(-3.5, 1.7))
        self.au_mot("quatre étiquettes")
        l1 = self.t("quatre étiquettes.", 34)
        self.col(l1, 1.55, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        for mot, c in zip(("6,", "2,", "7 et", "9."), melange.cartes):
            self.au_mot(mot)
            self.play(FadeIn(c, scale=1.12), run_time=0.3)
        self.au_mot("Pour le plus grand")
        l2 = self.bloc(["Pour le plus grand", "nombre,"], 34)
        self.col(l2, 0.65, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        self.au_mot("on range du plus grand")
        l3 = self.ligne([("on range du plus grand", WHITE)], 34, buff=0.18)
        self.col(l3, -0.5, XP)
        range_ = etiquettes((9, 7, 6, 2), s=1.0, couleur=TROUVE_C).move_to(P(-3.5, 0.0))
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(range_, shift=DOWN * 0.25, lag_ratio=0.15), run_time=0.8)
        self.au_mot("au plus petit")
        l4 = self.t("au plus petit.", 34, VERT_OK)
        self.col(l4, -1.25, XP)
        res = hors_audit(Text(nb(9762), font_size=44, color=TROUVE_C, weight=BOLD))
        res.next_to(range_, DOWN, buff=0.5)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(res, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        fig = etiquettes((0, 6, 8, 3), s=0.95).move_to(P(-3.6, 1.6))

        def autres_q(sc):
            sc.play(FadeIn(fig, lag_ratio=0.12), run_time=0.5)

        def apres(sc):
            sc.play(Indicate(fig.cartes[0], color=ROUGE_ERREUR, scale_factor=1.15), run_time=0.4)

        self.question_gauche("06-question", "06b-reponse",
                             ["Avec 0, 6, 8 et 3,", "quel est le plus petit",
                              "nombre de quatre chiffres ?"],
                             [self.choix(nb(3086)), self.choix("368"), self.choix(nb(3068))], 2,
                             ["Un nombre ne commence", "pas par zéro.", "On met 3, puis 0,",
                              "puis 6, puis 8."],
                             -0.75, mot_q="Avec 0, 6, 8 et 3", autres_q=autres_q, autres_r=apres)

    # ── 07 : « Et au CM2 » : les défis montent aux millions ─────────────────
    # ⛔ Gardé sur décision de Frédéric le 21/11 (« Oui, garde-le »).
    def ecran_cm2(self):
        self.ecran("07-cm2")
        self.au_mot("Et au CM2")
        tit = self.ligne([("Et au CM2,", CLASSE_MILLION), ("les défis montent aux millions", WHITE)],
                         36, buff=0.25)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit[0]), run_time=0.3)
        self.au_mot("les défis montent")
        self.play(FadeIn(tit[1], shift=UP * 0.1), run_time=0.35)
        g = tableau_classes(("millions", "mille", "unités"), larg=0.74, h=0.68, fs_ent=16, fs_ban=15)
        g.move_to(P(-0.1, 1.2))
        self.au_mot("Juste après")
        l0 = self.t("Juste après", 36)
        l0.move_to(P(-0.1, -0.7))
        self.play(FadeIn(g, scale=1.04), FadeIn(l0, shift=UP * 0.1), run_time=0.55)
        self.au_mot("6 999 999 vient")
        ch = g.poser("6999999", couleur=WHITE)
        a = hors_audit(Text(nb(6999999), font_size=46, color=JAUNE_TITRE, weight=BOLD))
        fl = hors_audit(Text("→", font_size=46, color=GRAY_B, weight=BOLD))
        b = hors_audit(Text(nb(7000000), font_size=46, color=TROUVE_C, weight=BOLD))
        ligne = VGroup(a, fl, b).arrange(RIGHT, buff=0.45).move_to(P(-0.1, -1.75))
        self.play(FadeIn(ch, scale=1.12), FadeIn(a, shift=UP * 0.1), run_time=0.7)
        self.au_mot("7 000 000.")
        ch2 = g.poser("7000000", couleur=TROUVE_C)
        self.play(FadeIn(fl), FadeIn(b, shift=UP * 0.1), run_time=0.4)
        self.play(FadeOut(ch), FadeIn(ch2, scale=1.12), run_time=0.6)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (réponse B) ─────────────────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        fig = barre_ecart(49493, 50000, larg=4.3, s=0.95).move_to(P(-3.6, 1.6))

        def autres_q(sc):
            sc.play(FadeIn(fig), run_time=0.45)

        def apres(sc):
            sc.play(Indicate(fig.trou, color=ORANGE_RETENUE, scale_factor=1.12), run_time=0.4)

        self.question_gauche("08-question", "08b-reponse",
                             ["Une usine a fait " + nb(49493), "bouteilles. Combien en",
                              "manque-t-il pour " + nb(50000) + " ?"],
                             [self.choix("607"), self.choix("507"), self.choix("407")], 1,
                             [nb(49493) + " plus 7", "donne " + nb(49500) + ".",
                              "Puis 500 de plus :", "507 en tout."],
                             -0.75, mot_q="Une usine a fait", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi (95 bandes dessinées, 4 par étagère) ───────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Une bibliothécaire")
        l0 = self.t("Une bibliothécaire a", 34).move_to(P(-0.1, 2.3))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("95 bandes dessinées")
        l1 = self.ligne([(nb(95), JAUNE_TITRE), ("bandes dessinées,", WHITE)], 34, buff=0.2)
        l1.move_to(P(-0.1, 1.6))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        # ⛔ on NE montre PAS le groupement : il est la réponse. Une seule étagère de 4 livres.
        etag = VGroup(*[Rectangle(width=0.22, height=0.72, fill_color=c, fill_opacity=0.85,
                                  stroke_color="#1f2937", stroke_width=2)
                        for c in ("#f59e0b", "#38bdf8", "#4ade80", "#f472b6")])
        etag.arrange(RIGHT, buff=0.07)
        planche = Line(etag.get_left() + DOWN * 0.42 + LEFT * 0.12,
                       etag.get_right() + DOWN * 0.42 + RIGHT * 0.12, color="#92400e", stroke_width=8)
        lab = Text("4 par étagère", font_size=26, color=JAUNE_TITRE, weight=BOLD)
        lab.next_to(planche, DOWN, buff=0.22)
        fig = hors_audit(VGroup(etag, planche, lab)).move_to(P(-4.2, 0.0))
        self.au_mot("4 par étagère")
        l2 = self.ligne([("4 par étagère.", JAUNE_TITRE)], 34, buff=0.2)
        l2.move_to(P(1.6, 0.4))
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(fig, scale=1.06), run_time=0.7)
        self.au_mot("Combien en reste")
        q = self.t("Combien en reste-t-il ?", 40, ORANGE_RETENUE).move_to(P(1.1, -0.9))
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(fig), run_time=0.8)
        self.pause_defi(y=-2.3)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        XP = 0.35
        # ⛔ 23 paquets EN LIGNE déborderaient : la grille fait 8 colonnes (piège mesuré sur A5).
        pq = paquets(95, 4, s=0.72, couleur=TROUVE_C, couleur_reste=ECARTE_C, par_ligne=8)
        pq.move_to(P(-3.4, 1.35))
        self.au_mot("4 fois 23 donne")
        l0 = self.ligne([("4 fois 23 donne", WHITE)], 36, buff=0.18)
        self.col(l0, 2.0, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pq.pleins, lag_ratio=0.05), run_time=1.0)
        self.au_mot("92. 95 moins")
        l1 = self.t(nb(92) + ".", 46, TROUVE_C)
        self.col(l1, 1.2, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("95 moins 92")
        l2 = self.ligne([(nb(95), WHITE), ("moins", GRAY_B), (nb(92), WHITE), (":", GRAY_B)],
                        34, buff=0.18)
        self.col(l2, 0.4, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("il reste 3")
        l3 = self.ligne([("il reste", WHITE), ("3", ECARTE_C)], 38, buff=0.18)
        self.col(l3, -0.4, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(pq.reste, scale=1.2), run_time=0.6)
        # ⚠️ RETARD de 0,60 s au dry run : la synchro automatique retient déjà « il reste 3 » jusqu'à
        #    SON « 3 » (7,94 s) — un `au_mot` posé ensuite arrive toujours trop tard. La ligne
        #    suivante se cale seule sur ses propres mots.
        l4 = self.t("bandes dessinées.", 34, ECARTE_C)
        self.col(l4, -1.15, XP)
        self.play(FadeIn(l4, shift=UP * 0.1),
                  Circumscribe(pq.reste, color=ECARTE_C, buff=0.08), run_time=0.8)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        # ⚠️ `finale_gauche` centre la figure en x = −4,6 : au-delà de ~3,6 unités de large, BORD.
        haut = etiquettes((9, 7, 6, 2), s=0.62, buff=0.18, couleur=TROUVE_C)
        bas = maison(nb(3920), 0.85)
        fig = VGroup(haut, bas).arrange(DOWN, buff=0.45)
        lignes = self.finale_gauche(fig, textes=[
            ("Dans un défi, on applique", "les indices un par un."),
            ("Et on vérifie", "à la fin.")], fs=32)
        self.add(fig)
        self.au_mot("Dans un défi")
        self.montrer_ligne(lignes[0], Indicate(haut.cartes, color=INDICE_C, scale_factor=1.06))
        self.au_mot("Et on vérifie")
        self.montrer_ligne(lignes[1], Indicate(bas.cadre, color=TROUVE_C, scale_factor=1.15))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_indices()
        self.ecran_dernier_indice()
        self.ecran_question1()
        self.ecran_etiquettes()
        self.ecran_question2()
        self.ecran_cm2()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class EntierDefiCM1(EntierDefiBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "bleue"
