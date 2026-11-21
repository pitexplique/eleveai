# entier_multiple.py
# EleveAI — Maths CM1 — série « Nombres entiers », épisode A5 : LES MULTIPLES
# (micro entier_multiple, notion nombre_entier), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo — série `cm1-entier`.
# Décor et métier : Awa, FLEURISTE (centres : nature-ecologie, art-design).
#
# ⛔⛔ CM1 SEUL — l'exception de la série (Frédéric, 21/11, commit d4c1606f2) :
#    PAS d'écran `07-cm2`, PAS d'alias `aussi`. « Les critères de divisibilité par 3 et par 9 sont
#    une MÉTHODE que le CM1 n'a pas, pas une magnitude de plus : une notion qui déborde est une
#    notion neuve. » Le CM2 a son propre épisode, `cm2-entier-multiple` (Hugo, pâtissier).
#    ⚠️ 15 écrans, et le numéro 07 reste VOLONTAIREMENT libre : renuméroter changerait les clés,
#    donc les noms des WAV déjà produits.
#
# Mapping micro → écrans : 02 (un multiple de k, c'est k fois un entier), 03 (des paquets pleins,
# sans reste), 05 (pour 2, 10 et 100 le dernier chiffre suffit),
# questions 04 (multiple de 9, A), 06 (multiple de 10, B), 08 (lequel n'est PAS multiple de 7, A),
# défi 09 (des ballotins de 7 : 62, 63 ou 64 ?).
#
# Voix : manim/voix/cm1-entier-multiple.json (validée le 21/11, Julie, débit −6) ;
# marques : entier_cm1_multiple_marques.json (python manim/scripts/cm1/entier_marques.py cm1:multiple).
# ⭐ AUCUN nombre à espace sans marque dans cette voix (INVENTAIRE § 6bis) : pas de `au_t()` ici.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/entier_multiple.py EntierMultipleCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/entier_multiple.py EntierMultipleCM1 -o eleveai-maths-cm1-entier-multiple --media_dir manim/scripts/cm1/media-ent-a5
# Sortie : manim/sorties/cm1/maths/entiers/05-multiple/eleveai-maths-cm1-entier-multiple.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from entier_commun import *  # noqa: E402,F403

MULT_C = VERT_OK            # un multiple : le paquet plein
RESTE_C = ROUGE_ERREUR      # ce qui reste en trop
ROSE_C = "#f472b6"          # les roses d'Awa
COEUR_C = "#fde047"         # le cœur de la fleur
CHOCO_C = "#92400e"         # les chocolats du défi


# ── Les roses d'Awa ─────────────────────────────────────────────────────────────────────────────
def rose(s=1.0):
    """Une rose : cinq pétales autour d'un cœur. Le jeton qu'on compte par paquets."""
    r = 0.075 * s
    petales = VGroup(*[Circle(radius=r, fill_color=ROSE_C, fill_opacity=1, stroke_width=0)
                       .shift(P(1.15 * r * np.cos(a), 1.15 * r * np.sin(a)))
                       for a in (PI / 2, PI / 2 + 2 * PI / 5, PI / 2 + 4 * PI / 5,
                                 PI / 2 + 6 * PI / 5, PI / 2 + 8 * PI / 5)])
    coeur = Circle(radius=r * 0.62, fill_color=COEUR_C, fill_opacity=1, stroke_width=0)
    return VGroup(petales, coeur)


def paquet_roses(n=6, s=1.0, cols=3, couleur=MULT_C):
    """Un paquet d'Awa : n roses dans une boîte. .fleurs (les roses), .boite (le cadre)."""
    fl = VGroup(*[rose(s) for _ in range(n)]).arrange_in_grid(cols=cols, buff=0.07 * s)
    bo = RoundedRectangle(width=fl.width + 0.2 * s, height=fl.height + 0.2 * s,
                          corner_radius=0.07 * s, fill_color=couleur, fill_opacity=0.14,
                          stroke_color=couleur, stroke_width=3).move_to(fl)
    g = VGroup(bo, fl)
    g.fleurs, g.boite = fl, bo
    return hors_audit(g)


def rangee_paquets(nb_paquets, par_paquet, s=1.0, buff=0.16, cols=3, en_grille=None):
    """Les paquets côte à côte. .fleurs (toutes les roses), .boites (tous les cadres) : on peut
    faire arriver les roses D'ABORD, puis les boîtes qui les groupent (« 42 roses font 7 paquets »).
    ⛔ BORD mesuré au dry run : 7 paquets EN LIGNE font 7,4 unités (marge de 3 % : x ≥ −6,68).
       `en_grille=4` les range sur deux rangs — 4,7 unités."""
    ps = [paquet_roses(par_paquet, s, cols) for _ in range(nb_paquets)]
    g = VGroup(*ps)
    if en_grille:
        g.arrange_in_grid(cols=en_grille, buff=buff * s)
    else:
        g.arrange(RIGHT, buff=buff * s)
    g.boites = VGroup(*[p.boite for p in ps])
    g.fleurs = VGroup(*[p.fleurs for p in ps])
    g.paquets = VGroup(*ps)
    return hors_audit(g)


# ── La bande des multiples (la table de k, en ligne) ────────────────────────────────────────────
def bande_multiples(k, n, s=1.0, couleur=MULT_C, fs=26, fs_mult=18):
    """La table de k en ligne : n cases (k×1 … k×n), le multiplicateur écrit sous chaque case.
    Les VALEURS ne sont pas ajoutées au groupe : on les fait arriver au mot qui les dit.
      .cases    les n cases vides
      .mults    les « ×1 … ×n » sous les cases
      .valeurs  les n nombres, déjà posés DANS leur case (à ajouter soi-même)
      .tete     l'étiquette « × k » posée à gauche de la bande (à ajouter soi-même)"""
    larg, haut = 0.80 * s, 0.68 * s
    cases = VGroup(*[RoundedRectangle(width=larg, height=haut, corner_radius=0.07 * s,
                                      fill_color=CASE, fill_opacity=0.9, stroke_color=couleur,
                                      stroke_width=3) for _ in range(n)])
    cases.arrange(RIGHT, buff=0.10 * s)
    mults = VGroup()
    valeurs = VGroup()
    for i in range(n):
        m = Text(f"×{i + 1}", font_size=int(fs_mult * s), color=GRAY_B, weight=BOLD)
        m.next_to(cases[i], DOWN, buff=0.12 * s)
        mults.add(m)
        v = Text(nb(k * (i + 1)), font_size=int(fs * s), color=WHITE, weight=BOLD)
        kk = min(1.0, (larg - 0.14 * s) / max(v.width, 0.01))
        v.scale(kk).move_to(cases[i])
        valeurs.add(v)
    tete = Text(f"× {k}", font_size=int(32 * s), color=couleur, weight=BOLD)
    g = VGroup(cases, mults)

    def recaler():
        """⛔ Vu seulement À L'IMAGE sur le `-ql` du 21/11 : `.valeurs` et `.tete` ne sont PAS dans
        le groupe (on les fait arriver au mot qui les dit), donc un `move_to()` sur la bande les
        laissait sur place — les sept nombres s'écrivaient SOUS la bande, par-dessus le texte et
        par-dessus les cartes de choix, sur trois écrans. Le dry run ne voyait rien.
        ⭐ À appeler APRÈS chaque déplacement de la bande."""
        for i, v in enumerate(valeurs):
            v.move_to(cases[i])
        tete.next_to(cases, LEFT, buff=0.28 * s)
        return g

    recaler()
    g.recaler = recaler
    g.cases, g.mults, g.valeurs, g.tete = cases, mults, valeurs, tete
    hors_audit(cases)
    hors_audit(mults)
    hors_audit(tete)
    for v in valeurs:
        hors_audit(v)
    return g


def nombre_dernier_chiffre(valeur, s=1.0, fs=34, couleur=ZERO_C):
    """Un nombre dont le DERNIER chiffre est encadré et coloré (le critère de 2, 10, 100).
    .cadre : le rectangle autour du dernier chiffre (à ajouter quand la voix le dit)."""
    t = Text(nb(valeur), font_size=int(fs * s), color=WHITE, weight=BOLD)
    t[-1].set_color(couleur)
    g = VGroup(t)

    def cadre_ici():
        """⛔ Vu seulement À L'IMAGE sur le `-ql` du 21/11 : un `SurroundingRectangle` construit à la
        création reste où il est né — les trois cadres se dessinaient loin des nombres, par-dessus
        « finit par zéro. ». Il se construit maintenant à la position DU MOMENT."""
        return hors_audit(SurroundingRectangle(t[-1], color=couleur, buff=0.05, stroke_width=4,
                                               corner_radius=0.05))

    g.txt, g.cadre_ici = t, cadre_ici
    return hors_audit(g)


def cases_mystere(n=4, s=1.0, couleur=ZERO_C):
    """« ? ? ? ▢ » : n cases, la DERNIÈRE mise en avant — regarde le dernier chiffre.
    Sert de figure aux questions sur le critère, sans rien révéler de la réponse."""
    cs = VGroup()
    for i in range(n):
        der = i == n - 1
        c = RoundedRectangle(width=0.62 * s, height=0.78 * s, corner_radius=0.07 * s,
                             fill_color=CASE, fill_opacity=0.9,
                             stroke_color=couleur if der else GRAY_B, stroke_width=5 if der else 3)
        q = Text("?", font_size=int(30 * s), color=couleur if der else GRAY_B, weight=BOLD)
        q.move_to(c)
        cs.add(VGroup(c, q))
    cs.arrange(RIGHT, buff=0.12 * s)
    lab = Text("le dernier chiffre", font_size=int(22 * s), color=couleur, weight=BOLD)
    lab.next_to(cs[-1], DOWN, buff=0.3 * s)
    fl = Arrow(lab.get_top() + UP * 0.03, cs[-1].get_bottom() + DOWN * 0.03, color=couleur,
               stroke_width=4, max_tip_length_to_length_ratio=0.35, buff=0)
    return hors_audit(VGroup(cs, fl, lab))


# ── Les ballotins du défi ───────────────────────────────────────────────────────────────────────
def ballotin(n=7, s=1.0, plein=True, cols=4):
    """Un ballotin de n chocolats (défi). Vert s'il est plein."""
    c = MULT_C if plein else RESTE_C
    ch = VGroup(*[Circle(radius=0.06 * s, fill_color=CHOCO_C, fill_opacity=1,
                         stroke_color="#d97706", stroke_width=1.5) for _ in range(n)])
    ch.arrange_in_grid(cols=cols, buff=0.045 * s)
    bo = RoundedRectangle(width=ch.width + 0.14 * s, height=ch.height + 0.14 * s,
                          corner_radius=0.05 * s, fill_color=c, fill_opacity=0.16,
                          stroke_color=c, stroke_width=2.5).move_to(ch)
    return hors_audit(VGroup(bo, ch))


def essai_ballotins(total, par, s=1.0):
    """Une ligne du corrigé : « 62 → [8 boîtes pleines] + 6 chocolats qui restent ».
    .pleins, .reste, .verdict (le ✓ vert ou le texte du reste)."""
    n, r = divmod(total, par)
    etiq = Text(nb(total), font_size=int(30 * s), color=WHITE, weight=BOLD)
    boites = VGroup(*[Rectangle(width=0.3 * s, height=0.34 * s, fill_color=MULT_C, fill_opacity=0.3,
                                stroke_color=MULT_C, stroke_width=2.5) for _ in range(n)])
    boites.arrange(RIGHT, buff=0.075 * s)
    rest = VGroup(*[Circle(radius=0.055 * s, fill_color=CHOCO_C, fill_opacity=1,
                           stroke_color=RESTE_C, stroke_width=2) for _ in range(r)])
    if r:
        rest.arrange(RIGHT, buff=0.055 * s)
    if r:
        verdict = Text(f"il reste {r}", font_size=int(22 * s), color=RESTE_C, weight=BOLD)
    else:
        verdict = Text("✓ aucun reste", font_size=int(22 * s), color=MULT_C, weight=BOLD)
    g = VGroup(etiq, boites, *( [rest] if r else [] ), verdict).arrange(RIGHT, buff=0.26 * s)
    g.etiq, g.boites, g.reste, g.verdict = etiq, boites, rest, verdict
    return hors_audit(g)


class EntierMultipleBase(PaysageEntierCM1):
    nom_voix = "cm1-entier-multiple"
    fichier_marques = "entier_cm1_multiple_marques.json"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les multiples", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les multiples")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.ligne([(nb(42), JAUNE_TITRE), ("est-il un multiple", WHITE)], 38, buff=0.2)
        q1 = self.ligne([("de", WHITE), ("6 ?", JAUNE_TITRE)], 38, buff=0.25)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        # la question porte sur 42 : la figure montre bien SEPT paquets de 6 (42 roses),
        # pas trois — un enfant qui compte doit retrouver le nombre de l'énoncé.
        pq = rangee_paquets(7, 6, 0.62, buff=0.14, cols=3, en_grille=4).move_to(P(4.3, 0.3))
        self.au_mot("42 est-il")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(pq, scale=1.06), run_time=0.4)
        self.au_mot("de 6 ?")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Awa, fleuriste ─────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = awa(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Awa")
        nom = self.t("Awa", 42, "#60a5fa").next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est fleuriste")
        met = self.bloc(["fleuriste"], 26, "#60a5fa").next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XP = 0.2
        self.au_mot("Elle compte ses roses")
        l0 = self.bloc(["Elle compte ses roses"], 34)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        # ⛔ `col()` écrit dans la colonne de DROITE : la rangée de paquets reste SOUS le texte,
        #    pas dedans (piège n° 1 de la série, payé sur A3).
        pq = rangee_paquets(3, 10, 0.86, cols=5).move_to(P(2.3, -1.3))
        self.au_mot("par paquets de 10")
        l1 = self.ligne([("par paquets de 10,", JAUNE_TITRE)], 34, buff=0.2)
        l2 = self.t("sans qu'il en reste.", 34, VERT_OK)
        self.col(l1, 1.35, XP)
        self.col(l2, 0.6, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(pq, shift=UP * 0.25, lag_ratio=0.25),
                  run_time=0.6)
        self.au_mot("sans qu'il en reste")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 02 : un multiple de 6, c'est 6 fois un nombre entier ────────────────
    def ecran_definition(self):
        self.ecran("02-definition")
        XP = 0.35
        b = bande_multiples(6, 7, s=0.8)
        fig = VGroup(b, b.tete)
        fig.move_to(P(-3.3, 1.35))
        b.recaler()
        self.au_mot("Un multiple de 6")
        l0 = self.bloc(["Un multiple de 6,"], 34, JAUNE_TITRE)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(fig, scale=1.05), run_time=0.55)
        self.au_mot("c'est 6 fois")
        l1 = self.t("c'est 6 fois", 34)
        self.col(l1, 1.5, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("un nombre entier")
        l2 = self.t("un nombre entier.", 34, VERT_OK)
        self.col(l2, 0.8, XP)
        # les six premières valeurs seulement : 42 n'est pas encore dit (0 s d'avance)
        six = VGroup(*b.valeurs[:6])
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(six, lag_ratio=0.18), run_time=0.8)
        self.au_mot("6 fois 7")
        l3 = self.ligne([("6 fois 7", WHITE), ("donne", GRAY_B)], 36, buff=0.2)
        self.col(l3, -0.1, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(b.mults[6], color=MULT_C, scale_factor=1.3),
                  run_time=0.6)
        self.au_mot("42.")
        r = self.t(nb(42), 48, MULT_C)
        self.col(r, -0.95, XP)
        self.play(FadeIn(b.valeurs[6], scale=1.2), FadeIn(r, shift=UP * 0.1), run_time=0.5)
        self.play(Circumscribe(b.cases[6], color=MULT_C, buff=0.03), run_time=0.6)
        self.attendre_voix()

    # ── 03 : un multiple, c'est aussi des paquets pleins ────────────────────
    def ecran_sans_reste(self):
        self.ecran("03-sans-reste")
        XP = 0.35
        self.au_mot("Un multiple, c'est aussi")
        l0 = self.bloc(["Un multiple, c'est aussi"], 34, JAUNE_TITRE)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("des paquets pleins")
        l1 = self.t("des paquets pleins.", 34, VERT_OK)
        self.col(l1, 1.55, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        pq = rangee_paquets(7, 6, 0.8, buff=0.16, cols=3, en_grille=4).move_to(P(-3.3, 1.15))
        self.au_mot("42 roses font")
        l2 = self.ligne([(nb(42), JAUNE_TITRE), ("roses font", WHITE)], 34, buff=0.2)
        self.col(l2, 0.6, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(pq.fleurs, lag_ratio=0.03), run_time=1.0)
        self.au_mot("7 paquets")
        l3 = self.ligne([("7 paquets", MULT_C), ("de 6,", WHITE)], 34, buff=0.2)
        self.col(l3, -0.15, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), Create(pq.boites, lag_ratio=0.18), run_time=1.0)
        self.au_mot("sans reste")
        l4 = self.t("sans reste.", 38, VERT_OK)
        self.col(l4, -0.95, XP)
        rien = hors_audit(Text("0 rose en trop", font_size=26, color=MULT_C, weight=BOLD))
        rien.next_to(pq, DOWN, buff=0.4)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(rien, shift=UP * 0.08), run_time=0.5)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = bande_multiples(9, 7, s=0.74)
        fig = VGroup(b, b.tete).move_to(P(-3.6, 1.5))
        b.recaler()

        def autres_q(sc):
            sc.play(FadeIn(fig), run_time=0.4)

        def apres(sc):
            # la table ne se remplit qu'À LA RÉPONSE : la figure de la question ne la donne pas
            sc.play(FadeIn(VGroup(*b.valeurs), lag_ratio=0.12), run_time=0.7)
            sc.play(Circumscribe(b.cases[6], color=MULT_C, buff=0.03), run_time=0.5)

        self.question_gauche("04-question", "04b-reponse",
                             ["Quel nombre est", "un multiple de 9 ?"],
                             [self.choix("63"), self.choix("67"), self.choix("65")], 0,
                             ["9 fois 7 donne 63.", "Ni 65 ni 67 n'est", "dans la table de 9."],
                             -0.75, mot_q="Quel nombre est", autres_q=autres_q, autres_r=apres)

    # ── 05 : pour 2, 10 et 100, le dernier chiffre suffit ───────────────────
    def ecran_dernier_chiffre(self):
        self.ecran("05-dernier-chiffre")
        XP = 0.35
        self.au_mot("Pour 2, 10 et 100")
        l0 = self.bloc(["Pour 2, 10 et 100,"], 34, JAUNE_TITRE)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("le dernier chiffre suffit")
        l1 = self.ligne([("le dernier chiffre", WHITE), ("suffit.", VERT_OK)], 34, buff=0.2)
        self.col(l1, 1.5, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        # ⚠️ les trois nombres de la figure ne sont PAS ceux de la question 06 (4 925 / 4 960 /
        #    4 911) : la figure montre le critère, elle ne répond pas à la question qui suit.
        exemples = [nombre_dernier_chiffre(v, s=1.0) for v in (40, 180, 2500)]
        col_ex = VGroup(*exemples).arrange(DOWN, aligned_edge=RIGHT, buff=0.42)
        col_ex.move_to(P(-3.6, 1.1))
        self.au_mot("Un multiple de 10")
        l2 = self.t("Un multiple de 10", 34)
        self.col(l2, 0.5, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(col_ex, scale=1.04), run_time=0.45)
        # ⚠️ RETARD de 0,59 s au dry run, et la cause n'était PAS la durée du fondu : la synchro
        #    automatique retient déjà « Un multiple de 10 » jusqu'à SON dernier mot (« 10 », 5,18 s),
        #    donc un `au_mot("10 finit par zéro")` posé ensuite arrivait toujours trop tard.
        #    La ligne suivante n'en demande plus : sa propre synchro la cale sur « zéro ».
        l3 = self.t("finit par zéro.", 36, ZERO_C)
        self.col(l3, -0.35, XP)
        cadres = [e.cadre_ici() for e in exemples]
        self.play(FadeIn(l3, shift=UP * 0.1),
                  *[Create(c) for c in cadres], run_time=0.4)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        fig = cases_mystere(4, s=1.05).move_to(P(-3.6, 1.4))

        def autres_q(sc):
            sc.play(FadeIn(fig), run_time=0.4)

        def apres(sc):
            sc.play(Indicate(fig[0][-1], color=ZERO_C, scale_factor=1.15), run_time=0.4)

        self.question_gauche("06-question", "06b-reponse",
                             ["Lequel est", "un multiple de 10 ?"],
                             [self.choix(nb(4925)), self.choix(nb(4960)), self.choix(nb(4911))], 1,
                             ["Un multiple de 10", "finit par zéro.",
                              "Seul " + nb(4960) + " finit par zéro."],
                             -0.75, mot_q="Lequel est", autres_q=autres_q, autres_r=apres)

    # ── 08 : QUESTION 3 (réponse A) ─────────────────────────────────────────
    # ⛔ Il n'y a PAS d'écran 07 dans cet épisode (le « Et au CM2 » est retiré, décision du 21/11) :
    #    le numéro 07 reste libre pour ne pas renommer les WAV déjà produits.
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        b = bande_multiples(7, 8, s=0.70)
        fig = VGroup(b, b.tete).move_to(P(-3.6, 1.5))
        b.recaler()

        def autres_q(sc):
            sc.play(FadeIn(fig), run_time=0.4)

        def apres(sc):
            sc.play(FadeIn(VGroup(*b.valeurs), lag_ratio=0.1), run_time=0.7)
            sc.play(Indicate(b.cases[3], color=MULT_C, scale_factor=1.12),
                    Indicate(b.cases[7], color=MULT_C, scale_factor=1.12), run_time=0.5)

        self.question_gauche("08-question", "08b-reponse",
                             ["Quel nombre n'est pas", "un multiple de 7 ?"],
                             [self.choix("24"), self.choix("28"), self.choix("56")], 0,
                             ["7 fois 4 donne 28,", "7 fois 8 donne 56.",
                              "24 n'est pas dans", "la table de 7."],
                             -0.75, mot_q="Quel nombre n'est pas", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi (les ballotins du chocolatier) ─────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Un chocolatier")
        l0 = self.t("Un chocolatier remplit", 34).move_to(P(-0.1, 2.3))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        # ⛔ AUDIT-AVANCE de 0,67 s au dry run : la ligne entière arrivait sur son PREMIER mot, donc
        #    le « 7 » s'écrivait avant d'être dit. Chaque morceau attend SON mot (piège n° 4).
        self.au_mot("des ballotins de")
        l1 = self.ligne([("des ballotins de", WHITE), ("7.", JAUNE_TITRE)], 34, buff=0.2)
        l1.move_to(P(-0.1, 1.6))
        bal = ballotin(7, 1.3).move_to(P(-4.3, 0.1))
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("7.")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(bal, scale=1.08), run_time=0.45)
        self.au_mot("Quel total donne")
        q0 = self.t("Quel total donne", 36, ORANGE_RETENUE).move_to(P(1.2, 0.5))
        self.play(FadeIn(q0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("des ballotins pleins")
        q1 = self.t("des ballotins PLEINS ?", 36, ORANGE_RETENUE).move_to(P(1.2, -0.25))
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.4)
        cartes = VGroup(*[etiquette_chiffre(nb(v), s=1.55, couleur=JAUNE_TITRE, fs=34)
                          for v in (62, 63, 64)])
        for c in cartes:
            c.carte.stretch_to_fit_width(1.45)
            c.txt.move_to(c.carte)
        cartes.arrange(RIGHT, buff=0.55).move_to(P(-0.1, -1.4))
        for mot, c in zip(("62,", "63", "64"), cartes):
            self.au_mot(mot)
            self.play(FadeIn(hors_audit(c), scale=1.1), run_time=0.35)
        self.pause_defi(y=-2.45)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        XP = 0.35
        self.au_mot("7 fois 9")
        l0 = self.ligne([("7 fois 9 donne", WHITE)], 36, buff=0.2)
        self.col(l0, 1.85, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        # ⛔ BORD mesuré au dry run : à l'échelle 1 la ligne de 62 (8 boîtes + 6 restes + le verdict)
        #    partait à x = −6,9 (marge de 3 % : −6,68). Les trois lignes sont bâties ENSEMBLE, à
        #    l'échelle 0,82, alignées à gauche et calées sur x = −6,3.
        e63 = essai_ballotins(63, 7, 0.82)
        e62 = essai_ballotins(62, 7, 0.82)
        e64 = essai_ballotins(64, 7, 0.82)
        trois = VGroup(e63, e62, e64).arrange(DOWN, aligned_edge=LEFT, buff=0.95)
        trois.move_to(P(0, 0.35)).align_to(P(-6.3, 0), LEFT)
        self.au_mot("63.")
        r = self.t(nb(63), 48, MULT_C)
        self.col(r, 1.0, XP)
        self.play(FadeIn(r, shift=UP * 0.1), FadeIn(e63, scale=1.05), run_time=0.7)
        self.au_mot("Avec 62")
        l1 = self.ligne([("Avec", WHITE), ("62", RESTE_C)], 34, buff=0.18)
        self.col(l1, 0.15, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(e62, shift=UP * 0.08), run_time=0.6)
        self.au_mot("64, il reste")
        l2 = self.ligne([("ou", WHITE), ("64,", RESTE_C)], 34, buff=0.18)
        self.col(l2, -0.6, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(e64, shift=UP * 0.08), run_time=0.6)
        self.au_mot("des chocolats")
        l3 = self.t("il reste des chocolats.", 34, RESTE_C)
        self.col(l3, -1.4, XP)
        self.play(FadeIn(l3, shift=UP * 0.1),
                  Indicate(VGroup(e62.reste, e64.reste), color=RESTE_C, scale_factor=1.2),
                  run_time=0.8)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        # ⚠️ `finale_gauche` centre la figure en x = −4,6 : au-delà de ~3,6 unités de large, BORD.
        b = bande_multiples(6, 5, s=0.56)
        for v in b.valeurs:
            b.add(v)
        pq = rangee_paquets(3, 6, 0.5, buff=0.12, cols=3)
        fig = VGroup(b, pq).arrange(DOWN, buff=0.5)
        lignes = self.finale_gauche(fig, textes=[
            ("Un multiple est", "un résultat de la table."),
            ("Des paquets pleins,", "sans reste.")], fs=32)
        self.add(fig)
        self.au_mot("Un multiple est")
        self.montrer_ligne(lignes[0], Indicate(b.cases, color=MULT_C, scale_factor=1.05))
        self.au_mot("Des paquets pleins")
        self.montrer_ligne(lignes[1], Indicate(pq.boites, color=MULT_C, scale_factor=1.06))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_definition()
        self.ecran_sans_reste()
        self.ecran_question1()
        self.ecran_dernier_chiffre()
        self.ecran_question2()
        # ⛔ pas d'écran 07-cm2 : cet épisode est CM1 SEUL (Frédéric, 21/11).
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class EntierMultipleCM1(EntierMultipleBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
