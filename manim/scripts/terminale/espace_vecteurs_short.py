# espace_vecteurs_short.py
# EleveAI — Maths Tle spé — short « arrivée moins départ » (9:16), ceinture VERTE.
# Micro du coach : espace_vecteurs. Paysage jumeau : espace_vecteurs.py (HD livré).
#
# ⭐ UNE SEULE IDÉE, celle de l'épisode : le vecteur A B se calcule en UNE soustraction,
# coordonnée par coordonnée. ⛔ Un short ne résume pas son épisode — il en prend une idée.
#
#   · 00-accroche   : le titre, l'échelle des ceintures, « arrivée moins départ » ;
#   · 01-idee       : A (1 ; 0 ; 0) et B (1 ; 0 ; 2) dans le repère cavalière, le vecteur
#                     A B vertical, et les trois soustractions ;
#   · 02/02b        : question-pause (B : 2 ; 0 ; 0), 3 s ;
#   · 03-commentaire: A (2 ; 1 ; 4) et B (2 ; 5 ; 4) — ⛔ la réponse (0 ; 4 ; 0) n'est NI
#                     dite NI affichée : c'est l'appel au commentaire ;
#   · 04-abonne     : la fin commune.
#
# Voix : manim/voix/terminale-espace-vecteurs-short.json (débit −6, aux DEUX étapes),
# calée par espace_vecteurs_short_marques.json.
# Mesure (⛔ AVANT tout rendu) : python -X utf8 manim/scripts/terminale/espace_mesure_short.py E1
# Dry run : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render --dry_run -r 1080,1920 manim/scripts/terminale/espace_vecteurs_short.py EspaceVecteursShort
# Planche : PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/terminale/espace_vecteurs_short.py EspaceVecteursShort -o eleveai-maths-terminale-espace-vecteurs-short --media_dir manim/scripts/terminale/media-espace-vecteurs-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from espace_commun_short import *  # noqa: E402,F403
from espace3d import C_POINT, C_REGARD, C_VECTEUR  # noqa: E402

# ── LES DONNÉES, une seule fois, et vérifiées à l'import ────────────────────
# ⭐ Elles sont au niveau du MODULE parce que `pieces()` et `construct()` les
# partagent : la cote de Ravi (épisode 10) a coûté un tour entier parce qu'un chiffre
# était recopié dans deux fichiers et corrigé dans un seul.
A1, B1 = (1, 0, 0), (1, 0, 2)          # l'exemple de l'écran 01
AB1 = tuple(b - a for a, b in zip(A1, B1))
AQ, BQ = (3, 1, 0), (5, 1, 0)          # la question
ABQ = tuple(b - a for a, b in zip(AQ, BQ))
BONNE = 1                              # B — tirage des shorts (VOIX-espace-terminale.md)
LEURRES = (tuple(a + b for a, b in zip(AQ, BQ)),      # A : la SOMME
           tuple(a - b for a, b in zip(AQ, BQ)))      # C : départ − arrivée = le vecteur B A
assert AB1 == (0, 0, 2), AB1
assert ABQ == (2, 0, 0), ABQ
assert LEURRES == ((8, 2, 0), (-2, 0, 0)), LEURRES
assert len({ABQ, LEURRES[0], LEURRES[1]}) == 3        # les trois choix s'excluent


def pieces(e):
    """BÂTIT et POSITIONNE les six écrans. ⛔ Ne joue rien : `construct()` animera ces
    objets-là, et `espace_mesure_short.py` mesurera les mêmes. Deux copies d'une seule
    vérité divergent dès qu'on en touche une (épisode 10)."""
    p = {}
    titre, badge = e.entete_blocs("Vecteurs")

    # ── 00 : l'accroche ─────────────────────────────────────────────────────
    a1 = e.blocs_phrase("Un vecteur dans l'espace, c'est trois nombres.", 1.55, 30)
    a2 = e.blocs_phrase("Et pour les trouver, un seul geste :", 0.35, 28)
    # ⚠️ SUR DEUX LIGNES, et c'est mesuré : d'une seule ligne, « arrivée moins départ »
    # fait 5,28 de large pour 3,90 offerts, donc 36 px demandés → **26,6 px obtenus**.
    a3 = e.blocs_phrase("arrivée moins départ", -0.95, 36, C_REGARD)
    cadre = SurroundingRectangle(a3, color=C_REGARD, buff=0.16, stroke_width=3)
    p["00-accroche"] = [("titre", titre), ("badge", badge), ("accroche 1", a1),
                        ("accroche 2", a2), ("arrivée moins départ", VGroup(a3, cadre))]

    # ── 01 : la figure et les trois soustractions ───────────────────────────
    # ⚠️ Le repère est posé HAUT : le bas de l'écran porte le calcul, et la boîte de
    # Ti-Margo monte à −2,92 en 9:16 (mesuré — en paysage elle s'arrêtait à −2,15).
    r, axes = e.repere(o=(0.0, 0.0), u=0.46, portee=3)
    pA = r.point(*A1, nom="A", couleur=C_POINT, decal=DL, fs=26)
    pB = r.point(*B1, nom="B", couleur=C_POINT, decal=UR, fs=26)
    e.sans_audit(pA)                 # « A » et « B » sont des NOMS, pas des nombres
    e.sans_audit(pB)
    # ⛔⛔ LE VECTEUR N'EST PAS ÉTIQUETÉ SUR LA FIGURE, et c'est mesuré, pas choisi.
    # Premier jet : « A B⃗ » posé à gauche du milieu (le côté où le vecteur ne va pas,
    # recette de l'épisode 7). Vu au GROS PLAN ×2 sur le `-ql`, et confirmé au centième
    # par `espace_mesure_short.py` : le mot est à **0,010** du fût du vecteur, et sa
    # propre flèche de notation le croise. En 9:16 le repère fait 1,9 de haut : entre
    # l'axe des z à gauche (0,46) et l'axe des y à droite, il n'y a aucune bande libre
    # de 0,75 pour ce mot-là.
    # ⭐ Le remède est celui de l'écran 09b de l'épisode 8 : quand la grille ne trouve
    # rien, ON N'ÉTIQUETTE PAS — c'est la COULEUR qui relie. La flèche est bleue, et le
    # « A B⃗ 0 ; 0 ; 2 » du bas de l'écran est bleu lui aussi.
    vAB = r.vecteur(A1, B1, couleur=C_VECTEUR, sw=6)
    fig = VGroup(axes, pA, pB, vAB)
    # ⛔ LA FIGURE SE POSE PAR SON GROUPE, APRÈS COUP. Bâtie autour de l'origine du
    # repère, elle montait à 2,70 et CHEVAUCHAIT l'échelle des ceintures de 0,22 — vu
    # par la mesure, pas à l'œil. On la déplace entière : les points, le vecteur et son
    # étiquette suivent, puisqu'ils sont déjà placés les uns par rapport aux autres.
    # ⚠️ 1,36 et u = 0,46 sont MESURÉS : à u = 0,52 la figure fait 2,36 de haut et son
    # sommet monte à 2,70, donc 0,22 DANS l'échelle des ceintures (qui descend à 2,48).
    fig.move_to(P(-0.35, 1.30))
    cA = e.pose(VGroup(e.t("A", 26, C_POINT, larg=None), e.trip(A1, 26, C_POINT)).arrange(RIGHT, buff=0.16), 0.02)
    cB = e.pose(VGroup(e.t("B", 26, C_POINT, larg=None), e.trip(B1, 26, C_POINT)).arrange(RIGHT, buff=0.16), -0.50)
    calc = e.blocs_phrase("1 moins 1 fait 0, 0 moins 0 fait 0, et 2 moins 0 fait 2.",
                          -1.42, 24, GREY_A)
    res = e.pose(VGroup(e.vec("A B", 28, C_VECTEUR), e.trip(AB1, 30, VERT_OK)).arrange(RIGHT, buff=0.22), -2.45)
    cadre_res = SurroundingRectangle(res, color=VERT_OK, buff=0.12, stroke_width=3)
    p["01-idee"] = [("titre", titre), ("badge", badge), ("figure", fig),
                    ("A", cA), ("B", cB), ("calcul", calc),
                    ("résultat", VGroup(res, cadre_res))]

    # ── 02 / 02b : la question-pause ────────────────────────────────────────
    # ⭐ Les POLICES viennent d'un BALAYAGE hors rendu (fsq de 30 à 22 × fsc de 30 à 22) :
    # 26/24 est le plus grand couple qui garde toute police au-dessus de 22 px ET le bas
    # de « Mets pause » au-dessus de −2,87. ⛔ Rien d'autre ne le voit.
    fsq, fsc = 26, 24
    q_lignes = [e.t(f"A ({' ; '.join(map(e.nombre, AQ))})", fsq, C_REGARD, larg=None),
                e.t(f"B ({' ; '.join(map(e.nombre, BQ))})", fsq, C_REGARD, larg=None),
                e.t("Coordonnées", fsq, larg=None),
                e.vexpr("du vecteur A B ?", ("A B",), fsq)]
    # ⛔⛔ LES CARTES PORTENT DES `trip()`, PAS DES CHAÎNES. Mesuré au dry run : avec
    # un simple texte, la carte A « 8 ; 2 ; 0 » affichait son « 2 » **0,63 s avant** que
    # la voix le dise (AUDIT-AVANCE). `q_montrer_choix` ne retarde le corps d'un choix
    # que s'il porte un `.nb` — c'est le cas d'un `trip()`, et c'est le défaut de
    # l'épisode 8 (« une carte de choix qui porte un nombre s'affiche quand il est dit »).
    choix = [e.trip(t, fsc, WHITE) for t in (LEURRES[0], ABQ, LEURRES[1])]
    tete, q, cartes, pause, rebours = e.q_tete(q_lignes, choix, fs_q=fsq, fs_c=fsc)
    p["02-question"] = [("tête", tete), ("rebours", rebours), ("question", q),
                        ("cartes", cartes), ("pause", pause),
                        ("titre", titre), ("badge", badge)]
    # l'écran de réponse : ⚠️ il HÉRITE de la question (défaut n° 1 de l'épisode 3, et
    # quatre récidives). Ce qui reste : la tête, la question et les trois cartes. On
    # efface les deux premières et on écrit SOUS les cartes.
    # ⛔⛔ TOUT CE QUI SUIT EST AU-DESSUS DES CARTES, et ce n'est pas un choix de
    # style. Premier jet : la correction sous les cartes, donc « La réponse A, c'est la
    # somme. » à −2,93 — DANS la boîte de Ti-Margo — et 0,28 de chevauchement avec les
    # cartes. En 9:16 il n'y a pas de « sous les cartes » : la place libérée par la tête
    # et la question est la SEULE place disponible (mesurée : de 2,38 à 0,30).
    haut = float(cartes.get_top()[1])
    rep = e.blocs_phrase("5 moins 3 fait 2, 1 moins 1 fait 0, 0 moins 0 fait 0.",
                         haut + 1.90, 26, GREY_A)
    som = e.blocs_phrase("La réponse A, c'est la somme.", haut + 0.62, 26, "#dc2626")
    p["02b-reponse"] = [("calcul de la réponse", rep), ("cartes", cartes),
                        ("la somme", som), ("titre", titre), ("badge", badge)]

    # ── 03 : la question en commentaire ─────────────────────────────────────
    et = e.pose(e.t("À toi !", 38, JAUNE_TITRE, larg=None), 3.50)
    d1 = e.pose(VGroup(e.t("A", 30, C_REGARD, larg=None), e.trip((2, 1, 4), 30, C_REGARD)).arrange(RIGHT, buff=0.18), 1.95)
    d2 = e.pose(VGroup(e.t("B", 30, C_REGARD, larg=None), e.trip((2, 5, 4), 30, C_REGARD)).arrange(RIGHT, buff=0.18), 1.25)
    dq = e.pose(VGroup(e.t("Que vaut", 32, larg=None), e.vec("A B", 32, C_VECTEUR),
                       e.t("?", 32, larg=None)).arrange(RIGHT, buff=0.18), 0.10)
    appel = e.appel_blocs(-1.25)
    p["03-commentaire"] = [("à toi", et), ("donnée A", d1), ("donnée B", d2),
                           ("question", dq), ("appel", appel)]
    return p


class EspaceVecteursShort(ShortEspace):
    fichier_marques = "espace_vecteurs_short_marques.json"
    nom_voix = "terminale-espace-vecteurs-short"

    def construct(self):
        p = pieces(self)
        titre, badge = p["00-accroche"][0][1], p["00-accroche"][1][1]

        # ── 00 : l'accroche ─────────────────────────────────────────────────
        # ⛔ LE TITRE EST AJOUTÉ AVANT LA VOIX, il n'est pas écrit pendant. Mesuré :
        # `Write(titre)` de 0,5 s puis la première ligne de la phrase, qui commence au
        # caractère 0 de la voix, donnait **RETARD 00-accroche pos 0 : 0,50 s** — la
        # ligne arrivait une demi-seconde après son propre mot. Et on ne peut pas écrire
        # le titre AVANT `dire` sans coller une demi-seconde de silence en tête d'un
        # short, là où se joue toute la rétention. C'est le gabarit de
        # `convexite_defi_short.py`, et c'est le bon.
        self.margo_bas()
        self.add(titre, badge)
        self.dire("00-accroche")
        a1, a2, a3g = p["00-accroche"][2][1], p["00-accroche"][3][1], p["00-accroche"][4][1]
        self.jouer_phrase(a1, "Un vecteur dans l'espace, c'est trois nombres.")
        self.jouer_phrase(a2, "Et pour les trouver, un seul geste :")
        self.au_mot("arrivée moins départ")
        self.play(FadeIn(a3g[0], scale=1.2), Create(a3g[1]), run_time=0.45)
        self.insister(a3g, 1.07)
        self.attendre_voix(marge=0.25)

        # ── 01 : la figure et les trois soustractions ───────────────────────
        self.dire("01-idee")
        fig, cA, cB = p["01-idee"][2][1], p["01-idee"][3][1], p["01-idee"][4][1]
        calc, resg = p["01-idee"][5][1], p["01-idee"][6][1]
        self.play(FadeOut(VGroup(a1, a2, a3g)), run_time=0.25)
        axes, pA, pB, vAB = fig
        self.play(Create(axes), run_time=0.4)
        self.au_fin("A a pour coordonnées 1, 0, 0")
        self.play(FadeIn(pA, scale=1.3), FadeIn(cA), run_time=0.35)
        self.au_fin("B a pour coordonnées 1, 0, 2")
        self.play(FadeIn(pB, scale=1.3), FadeIn(cB), run_time=0.35)
        self.au_mot("on soustrait")
        self.play(GrowArrow(vAB[0]), run_time=0.45)
        self.jouer_phrase(calc, "1 moins 1 fait 0, 0 moins 0 fait 0, et 2 moins 0 fait 2.")
        self.au_fin("Donc A B a pour coordonnées 0, 0, 2")
        self.play(FadeIn(resg[0], shift=UP * 0.1), Create(resg[1]), run_time=0.4)
        self.insister(resg, 1.06)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question-pause ──────────────────────────────────────────
        self.dire("02-question")
        t0 = self.renderer.time
        tete, rebours, q, cartes, pause = (x[1] for x in p["02-question"][:5])
        self.play(FadeOut(VGroup(fig, cA, cB, calc, resg)), run_time=0.3)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.12), run_time=0.3)
        self.au_fin("A a pour coordonnées 3, 1, 0")
        self.play(FadeIn(q[0], shift=UP * 0.08), run_time=0.25)
        self.au_fin("B a pour coordonnées 5, 1, 0")
        self.play(FadeIn(q[1], shift=UP * 0.08), run_time=0.25)
        self.au_mot("Coordonnées du vecteur")
        self.play(FadeIn(q[2:], shift=UP * 0.08), run_time=0.3)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "02-question", t0, BONNE)

        # ── 02b : la réponse ────────────────────────────────────────────────
        self.dire("02b-reponse")
        rep, som = p["02b-reponse"][0][1], p["02b-reponse"][2][1]
        ok = self.q_reponse(cartes, BONNE, pause, rebours)
        self.play(FadeOut(VGroup(tete, q)), run_time=0.25)
        self.jouer_phrase(rep, "5 moins 3 fait 2, 1 moins 1 fait 0, 0 moins 0 fait 0.")
        self.jouer_phrase(som, "La réponse A, c'est la somme.")
        self.play(Indicate(cartes[0], color="#dc2626", scale_factor=1.05), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 03 : la question en commentaire ─────────────────────────────────
        self.dire("03-commentaire")
        et, d1, d2, dq, appel = (x[1] for x in p["03-commentaire"])
        self.play(FadeOut(VGroup(cartes, rep, som, ok, titre, badge)), run_time=0.3)
        self.au_mot("À toi")
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        self.au_fin("A a pour coordonnées 2, 1, 4")
        self.play(FadeIn(d1, shift=UP * 0.08), run_time=0.3)
        self.au_fin("B a pour coordonnées 2, 5, 4")
        self.play(FadeIn(d2, shift=UP * 0.08), run_time=0.3)
        self.au_mot("Que vaut")
        self.play(FadeIn(dq, scale=1.1), run_time=0.35)
        self.jouer_appel(appel)
        self.attendre_voix(marge=0.5)

        # ── 04 : la fin ─────────────────────────────────────────────────────
        self.fin_short("04-abonne", [et, d1, d2, dq, appel])
