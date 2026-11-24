# espace_repere_coordonnees_short.py
# EleveAI — Maths Tle spé — short « que des zéros et des uns » (9:16), ceinture VERTE.
# Micro du coach : espace_repere_coordonnees. Paysage jumeau : espace_repere_coordonnees.py.
#
# ⭐ UNE SEULE IDÉE : choisir le repère (A ; A B, A D, A E) remplace un dessin difficile
# par des zéros et des uns. ⛔ Un short ne résume pas son épisode.
#
#   · 00-accroche   : « que des zéros et des uns », à une condition ;
#   · 01-idee       : le cube, les trois directions depuis A, et les cinq triplets ;
#   · 02/02b        : question-pause (C : 0 ; 1 ; 1, le sommet H), 3 s. ⚠️ Le titre et
#                     l'échelle des ceintures CÈDENT LA PLACE au cube, qui remonte : la
#                     question dit « dans le cube », donc il faut le voir, et en 9:16 la
#                     colonne est pleine de la tête de question jusqu'à « Mets pause »
#                     (mesuré). Un cube rétréci ne marche pas : ses huit noms tombent
#                     sous 12 px ;
#   · 03-commentaire: le sommet F — ⛔ sa réponse (1 ; 0 ; 1) n'est ni dite ni affichée ;
#   · 04-abonne     : la fin commune.
#
# Voix : manim/voix/terminale-espace-repere-coordonnees-short.json (débit −6).
# Mesure : python -X utf8 manim/scripts/terminale/espace_mesure_short.py E2
# Dry run : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render --dry_run -qh -r 1080,1920 manim/scripts/terminale/espace_repere_coordonnees_short.py EspaceRepereCoordonneesShort
# Planche : PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/terminale/espace_repere_coordonnees_short.py EspaceRepereCoordonneesShort -o eleveai-maths-terminale-espace-repere-coordonnees-short --media_dir manim/scripts/terminale/media-espace-repere-coordonnees-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from espace_commun_short import *  # noqa: E402,F403

# ── LES DONNÉES, au niveau du module, vérifiées à l'import ──────────────────
S = ShortEspace.CUBE_SOMMETS
DITS = ("A", "B", "D", "E", "G")            # les cinq sommets que la voix énumère
BONNE = 2                                   # C — tirage des shorts (B C A C A B)
CHOIX = (S["C"], S["E"], S["H"])            # A : le sommet C, B : E, C : H (la bonne)
U_CUBE, Y_CUBE, Y_CUBE_Q = 1.10, 1.22, 2.74
assert CHOIX[BONNE] == S["H"] == (0, 1, 1)
assert len(set(CHOIX)) == 3                                   # les trois choix s'excluent
assert S["F"] == (1, 0, 1)                                    # la réponse du défi
# ⭐ H = D + A E : un pas vers D, un pas vers le haut, aucun vers B. C'est le raisonnement
# que la voix tient en 02b, recalculé ici et non recopié.
assert S["H"] == tuple(d + e for d, e in zip(S["D"], S["E"]))
assert S["C"] == tuple(b + d for b, d in zip(S["B"], S["D"]))  # le leurre A, resté au sol


def pieces(e):
    """BÂTIT et POSITIONNE les six écrans, sans rien jouer."""
    p = {}
    titre, badge = e.entete_blocs("Coordonnées")

    # ── 00 : l'accroche ─────────────────────────────────────────────────────
    # ⚠️ 1,20 et non 1,35 : à 1,35 ce bloc de quatre lignes monte à 2,58 et mord de 0,10
    # dans l'échelle des ceintures (qui descend à 2,48). Vu par la mesure, pas à l'œil.
    a1 = e.blocs_phrase("Dans un cube, les coordonnées des huit sommets ne contiennent "
                        "que des zéros et des uns.", 1.12, 28)
    a2 = e.blocs_phrase("À une seule condition :", -0.60, 28, GREY_A)
    a3 = e.blocs_phrase("bien choisir le repère", -1.70, 34, C_REGARD)
    cadre = SurroundingRectangle(a3, color=C_REGARD, buff=0.16, stroke_width=3)
    p["00-accroche"] = [("titre", titre), ("badge", badge), ("accroche", a1),
                        ("condition", a2), ("le repère", VGroup(a3, cadre))]

    # ── 01 : le cube, les trois directions, les cinq triplets ───────────────
    _r, cube, base, cubeg = e.cube_place(U_CUBE, Y_CUBE, ecarte=e.ECARTE_CUBE, base=True)
    liste = VGroup(*[VGroup(e.t(s, 22, C_REGARD if s in ("A", "G") else C_POINT, larg=None),
                            e.trip(S[s], 22, C_POINT)).arrange(RIGHT, buff=0.16)
                     for s in DITS]).arrange(DOWN, buff=0.10, aligned_edge=LEFT)
    liste = e.pose(liste, -1.52)
    p["01-idee"] = [("titre", titre), ("badge", badge), ("cube", cubeg),
                    ("les cinq triplets", liste)]

    # ── 02 / 02b : la question-pause ────────────────────────────────────────
    # ⭐ Les cotes viennent d'un balayage hors rendu : le cube remonté à 2,60, la tête de
    # question à 1,05, et 24/24 pour la question et les cartes. ⛔ À 26 px pour les
    # cartes, « Mets pause » tombe à −2,89, soit DANS la boîte de Ti-Margo (−2,92).
    fsq, fsc = 24, 22
    # ⭐ Le cube de l'écran de question est le MÊME objet, déplacé : on mesure sa copie à
    # la position finale, et `construct` l'y anime. Une seconde constante aurait divergé
    # de la première au premier réglage (la cote de Ravi, épisode 10).
    cube_q = cubeg.copy().move_to(P(0, Y_CUBE_Q))
    q_lignes, _ = e.lignes("Dans ce cube, coordonnées du sommet H ?", fsq)
    choix = [e.trip(t, fsc, WHITE) for t in CHOIX]
    tete, q, cartes, pause, rebours = e.q_tete(q_lignes, choix, fs_q=fsq, fs_c=fsc,
                                               y_tete=1.38)
    p["02-question"] = [("cube remonté", cube_q), ("tête", tete), ("rebours", rebours),
                        ("question", q), ("cartes", cartes), ("pause", pause)]
    # ⚠️ L'écran de réponse HÉRITE : la tête et la question s'effacent, les cartes
    # restent. En 9:16 la place libérée au-dessus des cartes est la SEULE disponible —
    # sous elles, il n'y a que Ti-Margo (défaut mesuré sur E1).
    # ⛔⛔ LA CORRECTION SE JOUE SUR LE CUBE, PAS EN TEXTE. Premier jet : deux blocs de
    # texte au-dessus des cartes. Mesuré : il n'y a que 1,68 de libre entre la tête
    # effacée et le haut des cartes, et les deux blocs en demandent 1,82 — ils se
    # chevauchaient de 0,22, et le second mordait les cartes de 0,09. En 9:16 on ne
    # gagne pas 0,14 par une cote : on change de moyen. ⭐ Et le moyen est meilleur :
    # « aucun pas vers B, un pas vers D, un pas vers le haut » se MONTRE sur les deux
    # arêtes [A D] et [D H], qui sont justement le chemin dont la voix parle.
    _rq = e.cube_place(U_CUBE, Y_CUBE_Q, ecarte=e.ECARTE_CUBE)[0]
    chemin = VGroup(e.arete(_rq, "A", "D"), e.arete(_rq, "D", "H"))
    haut = float(cartes.get_top()[1])
    err = e.blocs_phrase("Le triplet 1, 1, 0, c'est le sommet C.", haut + 0.62, 24, "#dc2626")
    p["02b-reponse"] = [("cube remonté", cube_q), ("+ le chemin de A à H", chemin),
                        ("cartes", cartes), ("le leurre", err)]

    # ── 03 : la question en commentaire ─────────────────────────────────────
    et = e.pose(e.t("À toi !", 38, JAUNE_TITRE, larg=None), 3.50)
    # ⚠️ LE MÊME u QUE LES AUTRES ÉCRANS : `ECARTE_CUBE` est un écart ABSOLU, mesuré à
    # u = 1,10. À u = 0,92 le même écart remet « F » à 0,057 d'une arête (mesuré). Une
    # cote d'écart est relative à son u — leçon de l'épisode 12, repayée ici.
    _r3, _c3, _b3, cube3 = e.cube_place(U_CUBE, 1.52, ecarte=e.ECARTE_CUBE)
    dq = e.blocs_phrase("quelles sont les coordonnées du sommet F ?", -0.85, 28, C_REGARD)
    appel = e.appel_blocs(-2.30)
    p["03-commentaire"] = [("à toi", et), ("cube", cube3), ("question", dq),
                           ("appel", appel)]
    return p


class EspaceRepereCoordonneesShort(ShortEspace):
    fichier_marques = "espace_repere_coordonnees_short_marques.json"
    nom_voix = "terminale-espace-repere-coordonnees-short"

    def construct(self):
        p = pieces(self)
        titre, badge = p["00-accroche"][0][1], p["00-accroche"][1][1]
        a1, a2, a3g = p["00-accroche"][2][1], p["00-accroche"][3][1], p["00-accroche"][4][1]

        # ── 00 ──────────────────────────────────────────────────────────────
        # ⛔ Le titre est AJOUTÉ avant la voix : écrit pendant, son `Write` de 0,5 s met
        # la première ligne de la phrase 0,50 s en retard sur son propre mot (mesuré E1).
        self.margo_bas()
        self.add(titre, badge)
        self.dire("00-accroche")
        self.jouer_phrase(a1, "Dans un cube, les coordonnées des huit sommets ne "
                              "contiennent que des zéros et des uns.")
        self.jouer_phrase(a2, "À une seule condition :")
        self.au_mot("bien choisir le repère")
        self.play(FadeIn(a3g[0], scale=1.15), Create(a3g[1]), run_time=0.45)
        self.insister(a3g, 1.06)
        self.attendre_voix(marge=0.25)

        # ── 01 ──────────────────────────────────────────────────────────────
        self.dire("01-idee")
        cubeg, liste = p["01-idee"][2][1], p["01-idee"][3][1]
        cube, base = cubeg[0], cubeg[1]
        self.play(FadeOut(VGroup(a1, a2, a3g)), run_time=0.25)
        self.au_mot("Prends le cube")
        self.play(Create(cube), run_time=0.9)
        self.au_mot("A comme origine")
        self.play(Indicate(cube[len(cube) - 8], color=C_REGARD, scale_factor=1.6), run_time=0.4)
        self.au_mot("comme directions")
        self.play(LaggedStart(*[GrowArrow(v[0]) for v in base], lag_ratio=0.25), run_time=0.8)
        # ⭐ Chaque triplet attend que la voix ait FINI de le dire : posé à son premier
        # chiffre, son dernier nombre serait à l'écran avant d'être prononcé — c'est la
        # cause des 35 AUDIT-AVANCE de l'épisode 3.
        ANCRES = {"A": "A a pour coordonnées 0, 0, 0", "B": "B : 1, 0, 0",
                  "D": "D : 0, 1, 0", "E": "E : 0, 0, 1", "G": "1, 1, 1"}
        for s, ligne in zip(DITS, liste):
            self.au_fin(ANCRES[s])
            self.play(FadeIn(ligne, shift=RIGHT * 0.1), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 02 ──────────────────────────────────────────────────────────────
        self.dire("02-question")
        t0 = self.renderer.time
        _cq, tete, rebours, q, cartes, pause = (x[1] for x in p["02-question"])
        # ⚠️ LE TITRE ET L'ÉCHELLE SORTENT ICI, et le cube remonte. Mesuré : avec eux, la
        # colonne va de 2,42 à −2,85 et elle est pleine — pas de place pour le cube que
        # la question réclame. Un écran de question appartient à sa question.
        self.play(FadeOut(VGroup(titre, badge, base, liste)),
                  cubeg[0].animate.move_to(P(0, Y_CUBE_Q)), run_time=0.6)
        # ⛔ PAS D'ANCRE SUR « Question » ICI. La voix le dit au caractère 0 du clip, et
        # la transition ci-dessus prend 0,6 s : mesuré au dry run, « RETARD 02-question
        # « Question » : 0,50 s ». C'est le remède du piège n° 6 des entiers — on ne
        # pose pas d'ancre, on enchaîne, et le `play` précédent cale la ligne tout seul.
        self.play(FadeIn(tete, shift=DOWN * 0.12), run_time=0.3)
        self.au_mot("Dans ce cube")
        self.play(FadeIn(q, shift=UP * 0.08), run_time=0.35)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "02-question", t0, BONNE)

        # ── 02b ─────────────────────────────────────────────────────────────
        self.dire("02b-reponse")
        chemin, err = p["02b-reponse"][1][1], p["02b-reponse"][3][1]
        ok = self.q_reponse(cartes, BONNE, pause, rebours)
        self.play(FadeOut(VGroup(tete, q)), run_time=0.25)
        self.au_mot("un pas vers D")
        self.play(Create(chemin[0]), run_time=0.4)
        self.au_mot("un pas vers le haut")
        self.play(Create(chemin[1]), run_time=0.4)
        self.jouer_phrase(err, "Le triplet 1, 1, 0, c'est le sommet C.")
        self.play(Indicate(cartes[0], color="#dc2626", scale_factor=1.05), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 03 ──────────────────────────────────────────────────────────────
        self.dire("03-commentaire")
        et, cube3, dq, appel = (x[1] for x in p["03-commentaire"])
        self.play(FadeOut(VGroup(cartes, chemin, err, ok, cube)), run_time=0.3)
        self.au_mot("À toi")
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Dans le même cube")
        self.play(Create(cube3), run_time=0.7)
        self.jouer_phrase(dq, "quelles sont les coordonnées du sommet F ?")
        self.jouer_appel(appel)
        self.attendre_voix(marge=0.5)

        # ── 04 ──────────────────────────────────────────────────────────────
        self.fin_short("04-abonne", [et, cube3, dq, appel])
