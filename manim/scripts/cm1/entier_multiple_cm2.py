# entier_multiple_cm2.py
# EleveAI — Maths CM2 — série « Nombres entiers », épisode A5′ : LES CRITÈRES DE DIVISIBILITÉ
# (micro entier_multiple, notion nombre_entier), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo — série `cm1-entier`, épisode `multiple-cm2`.
# Décor et métier : Hugo, PÂTISSIER (centres : cuisine, jeux-defis).
#
# ⛔⛔ CM2 SEUL, et c'est TOUT L'OBJET de cet épisode (Frédéric, 21/11, commit d4c1606f2) :
#    « les critères de divisibilité par 3 et par 9 sont une MÉTHODE que le CM1 n'a pas, pas une
#    magnitude de plus. Une notion qui déborde est une notion neuve. »
#    Donc PAS d'alias `aussi`, et **2 lignes `notion_ressources`, toutes deux au CM2**.
#    Le CM1 a son propre épisode, `cm1-entier-multiple` (Awa, fleuriste), lui aussi sans `aussi`.
#
# Mapping micro → écrans : 02 (rappel : diviser un grand nombre est long), 03 (le critère de 3 :
# la somme des chiffres), 05 (le critère de 9), 07 (les multiples qui se lisent à la FIN : 25),
# questions 04 (la somme des chiffres de 51 408, C), 06 (59 130 est-il un multiple de 9, B),
# 08 (lequel est un multiple de 25, C), défi 09 (1 743 macarons par boîtes de 5 : reste-t-il ?).
#
# Voix : manim/voix/cm2-entier-multiple.json (validée par Frédéric le 21/11, Julie, débit −6,
# commit 830810afc) ; marques : entier_cm2_multiple_marques.json (16 écrans, 0 sans marque).
# ⭐ Les dix nombres à espace de cette voix portent TOUS une marque à leur propre offset :
#    `au_mot()` tombe juste partout, AUCUN `au_t()` n'est nécessaire ici (relevé par `entiers-voix`).
#
# ⛔ `hugo()` est défini ICI et non dans `entier_commun.py` : les six épisodes du lot A sont rendus
#    et importent ce commun — on ne touche pas au source d'une dépendance de scripts déjà rendus.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/entier_multiple_cm2.py EntierMultipleCM2
# python -m manim render -qh --disable_caching manim/scripts/cm1/entier_multiple_cm2.py EntierMultipleCM2 -o eleveai-maths-cm2-entier-multiple --media_dir manim/scripts/cm1/media-ent-a5p
# Sortie : manim/sorties/cm2/maths/entiers/01-multiple/eleveai-maths-cm2-entier-multiple.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from entier_commun import *  # noqa: E402,F403

SOMME_C = "#fbbf24"          # la somme des chiffres (le critère de 3 et de 9)
OUI_C = VERT_OK              # oui, c'est un multiple
NON_C = ROUGE_ERREUR         # non
FIN_C = "#38bdf8"            # ce qui se lit à la FIN du nombre
MACARON = "#f9a8d4"          # les macarons d'Hugo


def hugo(s=1.0):
    """A5′ — Hugo, pâtissier : veste blanche et toque.
    ⛔ Défini ici, pas dans le commun : les six épisodes du lot A sont déjà rendus."""
    p = personne(peau="#c68642", tenue="#f8fafc", cheveux="#1f2937", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    toque = VGroup(
        Rectangle(width=r * 1.9, height=r * 0.3, fill_color="#f1f5f9", fill_opacity=1,
                  stroke_color="#cbd5e1", stroke_width=2).move_to(c + UP * r * 0.95),
        Ellipse(width=r * 2.1, height=r * 1.0, fill_color="#f8fafc", fill_opacity=1,
                stroke_color="#cbd5e1", stroke_width=2).move_to(c + UP * r * 1.45))
    p.add(toque)
    return p


def macaron(s=1.0, couleur=MACARON):
    """Un macaron : deux coques et sa ganache."""
    h = 0.12 * s
    haut = Arc(radius=0.17 * s, start_angle=0, angle=PI, fill_color=couleur, fill_opacity=1,
               stroke_width=0).shift(UP * h * 0.5)
    bas = Arc(radius=0.17 * s, start_angle=PI, angle=PI, fill_color=couleur, fill_opacity=1,
              stroke_width=0).shift(DOWN * h * 0.5)
    gan = Rectangle(width=0.32 * s, height=h * 0.7, fill_color="#92400e", fill_opacity=1,
                    stroke_width=0)
    return VGroup(haut, bas, gan)


def boite_macarons(n=5, s=1.0, couleur=OUI_C, cols=5):
    """Une boîte d'Hugo : n macarons dedans."""
    ms = VGroup(*[macaron(s) for _ in range(n)]).arrange_in_grid(cols=cols, buff=0.08 * s)
    bo = RoundedRectangle(width=ms.width + 0.22 * s, height=ms.height + 0.22 * s,
                          corner_radius=0.07 * s, fill_color=couleur, fill_opacity=0.14,
                          stroke_color=couleur, stroke_width=3).move_to(ms)
    g = VGroup(bo, ms)
    g.boite, g.macarons = bo, ms
    return hors_audit(g)


def somme_chiffres(valeur, fs=40, couleur=WHITE, coul_somme=SOMME_C, buff=0.18):
    """« 5 + 1 + 4 + 0 + 8 = 18 » : la somme des chiffres, terme à terme.
    .termes (les chiffres), .plus (les signes), .egal, .total — chacun posé à SON mot."""
    ch = [c for c in str(valeur) if c.isdigit()]
    g, tt, pp = VGroup(), [], []
    for k, d in enumerate(ch):
        if k:
            s = Text("+", font_size=fs, color=GRAY_B, weight=BOLD)
            pp.append(s)
            g.add(s)
        t = Text(d, font_size=fs, color=couleur, weight=BOLD)
        tt.append(t)
        g.add(t)
    eg = Text("=", font_size=fs, color=GRAY_B, weight=BOLD)
    tot = Text(str(sum(int(d) for d in ch)), font_size=int(fs * 1.15), color=coul_somme, weight=BOLD)
    g.add(eg, tot)
    g.arrange(RIGHT, buff=buff)
    g.termes, g.plus, g.egal, g.total = VGroup(*tt), VGroup(*pp), eg, tot
    return hors_audit(g)


def fins_possibles(fins=("00", "25", "50", "75"), s=1.0, couleur=FIN_C, fs=32):
    """Les quatre fins d'un multiple de 25, dans des cases. .cases, .txts."""
    cs, ts = VGroup(), VGroup()
    for f in fins:
        c = RoundedRectangle(width=0.92 * s, height=0.68 * s, corner_radius=0.08 * s,
                             fill_color=CASE, fill_opacity=0.9, stroke_color=couleur, stroke_width=3)
        t = Text(f, font_size=int(fs * s), color=couleur, weight=BOLD).move_to(c)
        cs.add(c)
        ts.add(t)
    g = VGroup(*[VGroup(c, t) for c, t in zip(cs, ts)]).arrange(RIGHT, buff=0.18 * s)
    g.cases, g.txts = cs, ts
    return hors_audit(g)


class EntierMultipleCM2Base(PaysageEntierCM1):
    nom_voix = "cm2-entier-multiple"
    fichier_marques = "entier_cm2_multiple_marques.json"
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les critères de divisibilité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Les critères de divisibilité")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.ligne([(nb(51408), JAUNE_TITRE), ("est-il un multiple", WHITE)], 36, buff=0.22)
        q1 = self.ligne([("de 3,", JAUNE_TITRE), ("sans poser la division ?", WHITE)], 36, buff=0.22)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        bo = VGroup(boite_macarons(5, 0.9), boite_macarons(5, 0.9), boite_macarons(5, 0.9))
        bo.arrange(DOWN, buff=0.2).move_to(P(4.6, 0.35))
        self.au_mot("51 408 est-il")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(bo, scale=1.06), run_time=0.45)
        self.au_mot("de 3, sans poser")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Hugo, pâtissier ────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = hugo(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Hugo")
        nom = self.t("Hugo", 42, "#60a5fa").next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est pâtissier")
        met = self.bloc(["pâtissier"], 26, "#60a5fa").next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XP = 0.2
        self.au_mot("Il range ses macarons")
        l0 = self.bloc(["Il range ses macarons"], 34)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        # ⛔ `col()` écrit dans la colonne de DROITE : les boîtes restent SOUS le texte.
        bo = VGroup(*[boite_macarons(5, 0.95) for _ in range(3)]).arrange(RIGHT, buff=0.3)
        bo.move_to(P(2.3, -1.3))
        self.au_mot("par boîtes")
        l1 = self.ligne([("par boîtes,", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l1, 1.4, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(bo, shift=UP * 0.25, lag_ratio=0.25),
                  run_time=0.7)
        self.au_mot("sans qu'il en reste")
        l2 = self.t("sans qu'il en reste un seul.", 34, VERT_OK)
        self.col(l2, 0.6, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 02 : rappel — diviser un grand nombre, c'est long ───────────────────
    def ecran_rappel(self):
        self.ecran("02-rappel")
        XP = 0.35
        self.au_mot("Un multiple de 3")
        l0 = self.bloc(["Un multiple de 3,"], 34, JAUNE_TITRE)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("c'est 3 fois")
        l1 = self.t("c'est 3 fois", 34)
        self.col(l1, 1.55, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("un nombre entier")
        l2 = self.t("un nombre entier.", 34, VERT_OK)
        self.col(l2, 0.85, XP)
        # ⛔ BORD mesuré au dry run : à fs=28 cette ligne faisait 7,5 unités et partait à x = −7,5
        #    (marge de 3 % : −6,68). On la rétrécit à 5,2 unités, cadrées dans la colonne de gauche.
        table = hors_audit(Text("3 × 1 = 3    3 × 2 = 6    3 × 3 = 9    …",
                                font_size=28, color=VERT_OK, weight=BOLD))
        table.scale_to_fit_width(5.2).move_to(P(-3.4, 1.9))
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(table, scale=1.04), run_time=0.6)
        self.au_mot("Mais sur un grand nombre")
        l3 = self.bloc(["Mais sur un grand nombre,"], 34)
        self.col(l3, 0.0, XP)
        pose = hors_audit(VGroup(
            Text(nb(51408), font_size=38, color=WHITE, weight=BOLD),
            Text("÷ 3 = ?", font_size=34, color=GRAY_B, weight=BOLD)).arrange(RIGHT, buff=0.25))
        pose.move_to(P(-3.3, 0.3))
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(pose, shift=UP * 0.1), run_time=0.6)
        self.au_mot("diviser est long")
        l4 = self.t("diviser est long.", 36, ROUGE_ERREUR)
        self.col(l4, -0.85, XP)
        # ⛔ Un emoji dans un Text Manim ne se rend PAS (REGLES.md) : vu à l'image, le ⏳ avait
        #    disparu et il ne restait que les points. Le sablier est DESSINÉ.
        verre = VGroup(Triangle(fill_color=ROUGE_ERREUR, fill_opacity=0.35, stroke_color=ROUGE_ERREUR,
                                stroke_width=3).scale(0.22),
                       Triangle(fill_color=ROUGE_ERREUR, fill_opacity=0.35, stroke_color=ROUGE_ERREUR,
                                stroke_width=3).scale(0.22).rotate(PI))
        verre[0].next_to(verre[1], DOWN, buff=0)
        pts = VGroup(*[Dot(radius=0.05, color=ROUGE_ERREUR) for _ in range(3)]).arrange(RIGHT, buff=0.16)
        sablier = hors_audit(VGroup(verre, pts).arrange(RIGHT, buff=0.3))
        sablier.next_to(pose, DOWN, buff=0.5)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(sablier, shift=UP * 0.1),
                  Wiggle(pose), run_time=0.9)
        self.attendre_voix()

    # ── 03 : le critère de 3 — on additionne les chiffres ───────────────────
    def ecran_critere3(self):
        self.ecran("03-critere3")
        XP = 0.35
        self.au_mot("L'astuce")
        l0 = self.bloc(["L'astuce :"], 36, JAUNE_TITRE)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        s = somme_chiffres(51408, fs=38).move_to(P(-3.3, 1.5))
        self.au_mot("on additionne les chiffres")
        l1 = self.bloc(["on additionne", "les chiffres."], 34)
        self.col(l1, 1.4, XP)
        self.play(FadeIn(l1, shift=UP * 0.1),
                  FadeIn(VGroup(s.termes, s.plus), lag_ratio=0.12), run_time=0.9)
        self.au_mot("Si la somme est")
        l2 = self.t("Si la somme est", 34)
        self.col(l2, 0.2, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(VGroup(s.egal, s.total), scale=1.15),
                  run_time=0.6)
        self.au_mot("un multiple de 3")
        l3 = self.ligne([("un multiple de 3,", SOMME_C)], 34, buff=0.18)
        self.col(l3, -0.55, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), Circumscribe(s.total, color=SOMME_C, buff=0.08),
                  run_time=0.8)
        self.au_mot("le nombre l'est aussi")
        l4 = self.t("le nombre l'est aussi.", 36, OUI_C)
        self.col(l4, -1.3, XP)
        preuve = hors_audit(Text("18 = 3 × 6", font_size=30, color=OUI_C, weight=BOLD))
        preuve.next_to(s, DOWN, buff=0.55)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(preuve, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        # la figure donne les chiffres à additionner, pas leur somme
        s = somme_chiffres(51408, fs=34)
        fig = VGroup(s.termes, s.plus, hors_audit(Text("= ?", font_size=34, color=GRAY_B, weight=BOLD))
                     .next_to(s.termes[-1], RIGHT, buff=0.25))
        fig.move_to(P(-3.6, 1.6))

        def autres_q(sc):
            sc.play(FadeIn(fig, lag_ratio=0.1), run_time=0.5)

        def apres(sc):
            sc.play(Indicate(fig[2], color=SOMME_C, scale_factor=1.15), run_time=0.4)

        self.question_gauche("04-question", "04b-reponse",
                             ["Dans " + nb(51408) + ",", "quelle est la somme", "des chiffres ?"],
                             [self.choix("24"), self.choix("17"), self.choix("18")], 2,
                             ["5 plus 1 plus 4", "plus 0 plus 8 donne 18.",
                              "Et 18 est un multiple de 3."],
                             -0.75, mot_q="Dans 51 408", autres_q=autres_q, autres_r=apres)

    # ── 05 : le critère de 9 — la même astuce ───────────────────────────────
    def ecran_critere9(self):
        self.ecran("05-critere9")
        XP = 0.35
        self.au_mot("Même astuce pour 9")
        l0 = self.bloc(["Même astuce pour 9."], 36, JAUNE_TITRE)
        self.col(l0, 2.3, XP)
        s = somme_chiffres(59130, fs=38).move_to(P(-3.3, 1.5))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(s, lag_ratio=0.06), run_time=0.9)
        self.au_mot("Si la somme des chiffres")
        l1 = self.bloc(["Si la somme des chiffres"], 34)
        self.col(l1, 1.2, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("est un multiple de 9")
        l2 = self.ligne([("est un multiple de 9,", SOMME_C)], 34, buff=0.18)
        self.col(l2, 0.4, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), Circumscribe(s.total, color=SOMME_C, buff=0.08),
                  run_time=0.8)
        self.au_mot("le nombre l'est aussi")
        l3 = self.t("le nombre l'est aussi.", 36, OUI_C)
        self.col(l3, -0.45, XP)
        preuve = hors_audit(Text("18 = 9 × 2", font_size=30, color=OUI_C, weight=BOLD))
        preuve.next_to(s, DOWN, buff=0.55)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(preuve, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        fig = somme_chiffres(59130, fs=34).move_to(P(-3.6, 1.6))

        def autres_q(sc):
            sc.play(FadeIn(fig, lag_ratio=0.08), run_time=0.5)

        def apres(sc):
            sc.play(Indicate(fig.total, color=OUI_C, scale_factor=1.2), run_time=0.4)

        self.question_gauche("06-question", "06b-reponse",
                             ["La somme des chiffres", "de " + nb(59130) + " vaut 18.",
                              "Est-ce un multiple de 9 ?"],
                             [self.choix("non"), self.choix("oui"),
                              self.choix("on ne peut pas savoir")], 1,
                             ["18 est un multiple de 9.", "Donc " + nb(59130),
                              "est un multiple de 9."],
                             -0.75, mot_q="La somme des chiffres", autres_q=autres_q, autres_r=apres)

    # ── 07 : d'autres multiples se lisent à la FIN ──────────────────────────
    def ecran_fins(self):
        self.ecran("07-fins")
        XP = 0.35
        self.au_mot("D'autres multiples")
        l0 = self.bloc(["D'autres multiples"], 34, JAUNE_TITRE)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("se lisent à la fin")
        l1 = self.ligne([("se lisent à la", WHITE), ("FIN.", FIN_C)], 34, buff=0.2)
        self.col(l1, 1.55, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Un multiple de 25")
        l2 = self.ligne([("Un multiple de 25", WHITE)], 34, buff=0.18)
        self.col(l2, 0.7, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        g = fins_possibles(s=1.15).move_to(P(-3.3, 1.3))
        # ⚠️ RETARD de 0,39 s : la synchro automatique retient déjà « Un multiple de 25 » jusqu'à
        #    SON « 25 » (3,98 s), qui est AUSSI la marque de « 25 finit par » — l'`au_mot` posé
        #    ensuite arrive donc toujours trop tard. La ligne suivante se cale seule.
        l3 = self.t("finit par", 34, FIN_C)
        self.col(l3, -0.1, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(g.cases, lag_ratio=0.12), run_time=0.7)
        for mot, t in zip(("00,", "25, 50", "50 ou", "75."), g.txts):
            self.au_mot(mot)
            self.play(FadeIn(t, scale=1.15), run_time=0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (réponse C) ─────────────────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        fig = fins_possibles(s=1.0).move_to(P(-3.6, 1.6))
        lab = hors_audit(Text("les fins d'un multiple de 25", font_size=24, color=FIN_C, weight=BOLD))
        lab.next_to(fig, DOWN, buff=0.35)
        tout = VGroup(fig, lab)

        def autres_q(sc):
            sc.play(FadeIn(tout), run_time=0.45)

        def apres(sc):
            sc.play(Indicate(fig.cases[2], color=OUI_C, scale_factor=1.15), run_time=0.4)

        self.question_gauche("08-question", "08b-reponse",
                             ["Lequel est", "un multiple de 25 ?"],
                             [self.choix(nb(858445)), self.choix(nb(858152)),
                              self.choix(nb(858250))], 2,
                             ["Un multiple de 25 finit", "par 00, 25, 50 ou 75.",
                              "Seul " + nb(858250), "finit par 50."],
                             -0.75, mot_q="Lequel est", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi (1 743 macarons par boîtes de 5) ───────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Hugo a 1 743")
        l0 = self.ligne([("Hugo a", WHITE), (nb(1743), JAUNE_TITRE)], 36, buff=0.22)
        l0.move_to(P(-0.1, 2.3))
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 743 macarons")
        l1 = self.t("macarons,", 36).move_to(P(-0.1, 1.65))
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        # ⛔ on NE montre PAS le groupement : il est la réponse. Une seule boîte de 5.
        # ⛔ Vu à l'image : posée SOUS la boîte, l'étiquette arrivait à la hauteur de la question et
        #    la touchait (« une boîte de 5Reste-t-il »). Elle passe AU-DESSUS.
        bo = boite_macarons(5, 1.3, couleur=JAUNE_TITRE).move_to(P(-4.2, -0.2))
        lab = hors_audit(Text("une boîte de 5", font_size=26, color=JAUNE_TITRE, weight=BOLD))
        lab.next_to(bo, UP, buff=0.3)
        # ⛔ AUDIT-AVANCE de 0,51 s : le « 5 » partait sur « en boîtes de ». Chaque morceau son mot.
        self.au_mot("en boîtes de")
        l2 = self.ligne([("en boîtes de", WHITE), ("5.", JAUNE_TITRE)], 36, buff=0.2)
        l2.move_to(P(1.6, 0.5))
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(VGroup(bo, lab), scale=1.06), run_time=0.45)
        self.au_mot("5. Reste-t-il")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Reste-t-il des macarons")
        q = self.t("Reste-t-il des macarons ?", 40, ORANGE_RETENUE).move_to(P(1.1, -0.95))
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(bo), run_time=0.8)
        self.pause_defi(y=-2.3)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        XP = 0.35
        self.au_mot("Un multiple de 5")
        l0 = self.bloc(["Un multiple de 5"], 36)
        self.col(l0, 2.0, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        g = fins_possibles(("0", "5"), s=1.3, couleur=OUI_C, fs=36).move_to(P(-3.4, 1.9))
        # ⚠️ même piège qu'en 07-fins : « Un multiple de 5 » est déjà retenu jusqu'à son « 5 ».
        l1 = self.t("finit par", 34, FIN_C)
        self.col(l1, 1.2, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(g, lag_ratio=0.15), run_time=0.7)
        self.au_mot("0 ou par 5.")
        l2 = self.ligne([("0", OUI_C), ("ou par", WHITE), ("5.", OUI_C)], 36, buff=0.2)
        self.col(l2, 0.45, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        n = hors_audit(Text(nb(1743), font_size=56, color=WHITE, weight=BOLD))
        n.move_to(P(-3.4, 0.3))
        cadre = hors_audit(SurroundingRectangle(n[-1], color=NON_C, buff=0.06, stroke_width=5,
                                                corner_radius=0.06))
        self.au_mot("1 743 finit")
        l3 = self.ligne([(nb(1743), WHITE), ("finit par", WHITE), ("3 :", NON_C)], 34, buff=0.18)
        self.col(l3, -0.35, XP)
        # ⛔ MESURÉ au dry run du 22/11 : poser la ligne ENTIÈRE ici écrivait le « 3 » 0,07 s avant
        #    qu'il soit dit (AUDIT-AVANCE ; la tolérance est 0 s, Frédéric le 24/10). Le chiffre
        #    attend donc son propre mot, « par 3 : » (7,62 s) — 1,93 s après « 1 743 », donc aucun
        #    risque de RETARD, et la dernière ligne garde sa synchro automatique.
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(l3[1], shift=UP * 0.1),
                  FadeIn(n, scale=1.08), run_time=0.6)
        self.au_mot("par 3 :")
        self.play(FadeIn(l3[2], scale=1.12), run_time=0.35)
        # ⚠️ idem : la ligne précédente est retenue jusqu'à son « 3 : », l'`au_mot` suivant serait
        #    en retard de 0,58 s. La dernière ligne se cale sur ses propres mots.
        l4 = self.t("il en reste.", 38, NON_C)
        self.col(l4, -1.2, XP)
        self.play(FadeIn(l4, shift=UP * 0.1), Create(cadre), run_time=0.7)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        # ⚠️ `finale_gauche` centre la figure en x = −4,6 : au-delà de ~3,6 unités de large, BORD.
        haut = somme_chiffres(51408, fs=24, buff=0.1)
        bas = fins_possibles(s=0.7)
        fig = VGroup(haut, bas).arrange(DOWN, buff=0.55)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour 3 et pour 9,", "on additionne les chiffres."),
            ("Pour 5, 25 et 100,", "on regarde la fin.")], fs=30)
        self.add(fig)
        self.au_mot("Pour 3 et pour 9")
        self.montrer_ligne(lignes[0], Indicate(haut.total, color=SOMME_C, scale_factor=1.2))
        self.au_mot("Pour 5, 25 et 100")
        self.montrer_ligne(lignes[1], Indicate(bas.cases, color=FIN_C, scale_factor=1.08))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_rappel()
        self.ecran_critere3()
        self.ecran_question1()
        self.ecran_critere9()
        self.ecran_question2()
        self.ecran_fins()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class EntierMultipleCM2(EntierMultipleCM2Base):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
