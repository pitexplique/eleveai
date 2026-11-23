# espace_defi_short.py
# EleveAI — Maths Tle spé — short « ne conclus jamais sur le dessin » (9:16),
# ceinture VERTE. Micro du coach : espace_defi. Paysage jumeau : espace_defi.py (HD livré).
#
# ⭐ UNE SEULE IDÉE : deux droites peuvent se couper SUR LA FIGURE et ne jamais se
# rencontrer dans l'espace. ⛔ Un short ne résume pas son épisode.
#
#   · 00-accroche   : l'annonce, et le piège nommé ;
#   · 01-idee       : le cube, (A C) au sol, (E B) qui descend, et le point qu'on CROIT
#                     voir — puis les deux raisons : aucun point commun, aucun plan ;
#   · 02/02b        : question-pause (B : rien du tout), 3 s ;
#   · 03-commentaire: (A G) et (B H) — ⛔ la réponse (elles se coupent au centre du cube)
#                     n'est ni dite ni affichée ;
#   · 04-abonne     : la fin commune.
#
# ⭐⭐ LA FIGURE N'EST PAS CHOISIE À VUE, ELLE EST MESURÉE. (A C) et (E B) se coupent à
# l'écran aux paramètres 0,589 et 0,831 — tous deux dans ]0 ; 1[, donc le croisement
# apparent tombe BIEN sur les deux segments tracés. Et elles ne sont pas coplanaires :
# le déterminant de (A⃗C, E⃗B, A⃗E) vaut −1. Les deux faits sont des assertions d'import :
# si la cavalière changeait, l'écran casserait au lieu de mentir.
# ⛔ Les paires choisies à vue ratent : (A G) et (B H) se coupent VRAIMENT (au centre du
# cube), et (A G) et (B D) ne se croisent même pas à l'écran (épisode 6).
#
# Voix : manim/voix/terminale-espace-defi-short.json (débit −6).
# Mesure : python -X utf8 manim/scripts/terminale/espace_mesure_short.py E6
# Dry run : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render --dry_run -qh -r 1080,1920 manim/scripts/terminale/espace_defi_short.py EspaceDefiShort
# Planche : PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/terminale/espace_defi_short.py EspaceDefiShort -o eleveai-maths-terminale-espace-defi-short --media_dir manim/scripts/terminale/media-espace-defi-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np  # noqa: E402

from espace_commun_short import *  # noqa: E402,F403

# ── LES DONNÉES, vérifiées à l'import ───────────────────────────────────────
S = ShortEspace.CUBE_SOMMETS
U_CUBE, Y_CUBE = 1.10, 1.15
BONNE = 1                                    # B — tirage des shorts (B C A C A B)
CHOIX = ("sécantes", "rien du tout", "parallèles")
assert CHOIX[BONNE] == "rien du tout"
assert len(set(CHOIX)) == 3                  # « rien » exclut les deux affirmations


def _croisement():
    """Les deux paramètres du croisement APPARENT de (A C) et (E B) en cavalière.
    ⭐ Calculé dans le plan de la page, en résolvant le système 2 × 2 — on ne regarde pas
    si « ça se croise », on le mesure."""
    pr = lambda p: np.array([p[0] + FUITE[0] * p[1], p[2] + FUITE[1] * p[1]])  # noqa: E731
    a, c = pr(S["A"]), pr(S["C"])
    ee, b = pr(S["E"]), pr(S["B"])
    M = np.array([c - a, -(b - ee)]).T
    t, s = np.linalg.solve(M, ee - a)
    return float(t), float(s)


T_AC, S_EB = _croisement()
# ⛔ Le croisement doit tomber SUR les deux segments, sinon la figure ne montre pas ce
# que la voix annonce.
assert 0.05 < T_AC < 0.95 and 0.05 < S_EB < 0.95, (T_AC, S_EB)
# ⛔ Et les deux droites ne doivent PAS être coplanaires : det(A⃗C, E⃗B, A⃗E) ≠ 0.
_AC = np.array(S["C"]) - np.array(S["A"])
_EB = np.array(S["B"]) - np.array(S["E"])
_AE = np.array(S["E"]) - np.array(S["A"])
assert abs(float(np.linalg.det(np.array([_AC, _EB, _AE])))) > 0.5
# ⭐ Et le défi de l'écran 03, recalculé : (A G) et (B H) se coupent, elles, au CENTRE du
# cube — c'est la réponse, et elle n'est ni dite ni affichée.
assert all(abs(0.5 - x) < 1e-12 for x in (0.5, 0.5, 0.5))
assert tuple((np.array(S["A"]) + np.array(S["G"])) / 2) == (0.5, 0.5, 0.5)
assert tuple((np.array(S["B"]) + np.array(S["H"])) / 2) == (0.5, 0.5, 0.5)


def pieces(e):
    """BÂTIT et POSITIONNE les six écrans, sans rien jouer."""
    p = {}
    titre, badge = e.entete_blocs("Perspective")

    # ── 00 : l'accroche ─────────────────────────────────────────────────────
    a1 = e.blocs_phrase("Deux droites qui se croisent sur le dessin, et qui ne se "
                        "rencontrent jamais.", 1.10, 28)
    a2 = e.blocs_phrase("Ne conclus jamais sur une figure.", -1.20, 32, C_PIEGE)
    cadre = SurroundingRectangle(a2, color=C_PIEGE, buff=0.16, stroke_width=3)
    p["00-accroche"] = [("titre", titre), ("badge", badge), ("accroche", a1),
                        ("le piège", VGroup(a2, cadre))]

    # ── 01 : le cube, les deux droites, et le point qu'on croit voir ────────
    # ⚠️ L'écart des noms est celui des DEUX DIAGONALES : avec (A C) et (E B) tracées, la
    # grille ne laisse plus que 6 positions libres à « D », et la plus proche s'éloigne
    # à 0,538 du sommet. Un écart mesuré sur une autre figure ne vaut pas ici.
    r, cube, _vs, cubeg = e.cube_place(U_CUBE, Y_CUBE, ecarte=e.ECARTE_CUBE_DIAG)
    ac = e.arete(r, "A", "C", couleur=C_REGARD, sw=6)
    eb = e.arete(r, "E", "B", couleur=C_VECTEUR2, sw=6)
    pt = np.array(r.pt(*S["A"])) + T_AC * (np.array(r.pt(*S["C"])) - np.array(r.pt(*S["A"])))
    croix = Dot(pt, radius=0.085, color=C_PIEGE)
    ph1 = e.blocs_phrase("les deux traits se coupent.", -0.75, 26, C_PIEGE)
    ph2 = e.blocs_phrase("aucun point commun, et aucun plan ne les contient toutes les "
                         "deux.", -1.95, 24, GREY_A)
    p["01-idee"] = [("titre", titre), ("badge", badge), ("cube", cubeg),
                    ("+ (A C)", ac), ("+ (E B)", eb), ("+ le point", croix),
                    ("les traits se coupent", ph1), ("les deux raisons", ph2)]

    # ── 02 / 02b : la question-pause ────────────────────────────────────────
    # ⭐ 28/26 vient d'un balayage hors rendu. ⛔⛔ ET LES TROIS CHOIX SONT EN UN MOT,
    # ce qui est une cote et non un style : avec « qu'elles sont sécantes » sur deux
    # lignes, le bloc des cartes descend à −2,28 et « Mets pause » tombe à **−3,20**,
    # c'est-à-dire DANS la boîte de Ti-Margo (qui monte à −2,92 en 9:16). C'est le piège
    # de l'épisode 6 (« ajouter une ligne à un choix rapetisse les trois cartes ») dans
    # un cadre deux fois plus étroit : ici il ne rapetisse pas, il fait SORTIR par le bas.
    # ⛔⛔ ET LE CUBE NE RESTE PAS SUR L'ÉCRAN DE QUESTION. Premier jet : il remontait
    # en haut, comme dans le short de l'épisode 2. Mesuré : il prend 2,18 de hauteur, et
    # « Mets pause » tombait alors à **−3,25** — très largement dans la boîte de
    # Ti-Margo (−2,92). Réduire les polices à 24/24 n'a rendu que 0,34 sur les 0,38
    # manquants : il n'y avait pas de réglage.
    # ⭐ Et en cherchant la cote, j'ai vu que la question n'a PAS besoin du cube : elle
    # est générale (« deux droites semblent se croiser en perspective »), le cube n'était
    # qu'une illustration. C'est la leçon de l'épisode 10 à l'envers — une correction
    # peut déplacer le défaut, mais ici elle a montré que l'objet était en trop.
    fsq, fsc = 26, 28
    q_lignes, _ = e.lignes("Deux droites semblent se croiser en perspective. "
                           "Que conclure ?", fsq)
    tete, q, cartes, pause, rebours = e.q_tete(q_lignes, list(CHOIX), fs_q=fsq, fs_c=fsc)
    p["02-question"] = [("titre", titre), ("badge", badge), ("tête", tete),
                        ("rebours", rebours), ("question", q), ("cartes", cartes),
                        ("pause", pause)]
    haut = float(cartes.get_top()[1])
    r1 = e.blocs_phrase("Une perspective écrase une direction", haut + 1.00, 26, GREY_A)
    p["02b-reponse"] = [("titre", titre), ("badge", badge), ("cartes", cartes),
                        ("la cause", r1)]

    # ── 03 : la question en commentaire ─────────────────────────────────────
    et = e.pose(e.t("À toi !", 38, JAUNE_TITRE, larg=None), 3.50)
    # ⚠️ LE MÊME u QUE L'ÉCRAN 01, et ce n'est pas de la paresse : `ECARTE_CUBE_DIAG`
    # est un écart ABSOLU, mesuré à u = 1,10. À u = 0,92 le même écart remet « D » à
    # 0,064 d'une arête — mesuré par `espace_mesure_short.py`. Une cote d'écart est
    # relative à son u (leçon de l'épisode 12), et la plus simple des réponses est de
    # ne pas changer de u.
    r3, cube3, _v3, cube3g = e.cube_place(U_CUBE, 1.55, ecarte=e.ECARTE_CUBE_DIAG)
    ag = e.arete(r3, "A", "G", couleur=C_REGARD, sw=5)
    bh = e.arete(r3, "B", "H", couleur=C_VECTEUR2, sw=5)
    # ⛔⛔ « (A G) » ET « (B H) », AVEC LEURS PARENTHÈSES, et ce n'est pas cosmétique.
    # Ce sont des DROITES, pas des vecteurs : « A G » nu, à l'écran d'une terminale, se
    # lit comme un vecteur, et dans un short dont toute la leçon est de distinguer ce
    # qu'on voit de ce qu'on démontre, ce serait une faute de notation. C'est la
    # convention tranchée par la passe des flèches (épisode 8 : « (A G) » la droite,
    # « (BDE) » le plan, « A G⃗ » le vecteur).
    # ⭐ ET C'EST `--fleches` DE `espace_mesure_short.py` QUI L'A VU, pas
    # `auditer-fleches-vecteurs.py` : celui-ci ne lit pas `blocs_phrase`, il répondait
    # « 0 NUS » sur ce script sans l'avoir regardé.
    # ⚠️ Donc cette ligne ne passe plus par `blocs_phrase` (qui recopie la voix mot pour
    # mot) : elle est coupée à la main, et son ancre est posée explicitement.
    dq = e.pose(VGroup(*e.lignes("les droites (A G) et (B H)", 28, color=C_REGARD)[0],
                       *e.lignes("ont-elles un point commun ?", 28, color=C_REGARD)[0]
                       ).arrange(DOWN, buff=0.12), -0.95)
    appel = e.appel_blocs(-2.35)
    p["03-commentaire"] = [("à toi", et), ("cube", cube3g), ("+ (A G)", ag),
                           ("+ (B H)", bh), ("question", dq), ("appel", appel)]
    return p


class EspaceDefiShort(ShortEspace):
    fichier_marques = "espace_defi_short_marques.json"
    nom_voix = "terminale-espace-defi-short"

    def construct(self):
        p = pieces(self)
        titre, badge = p["00-accroche"][0][1], p["00-accroche"][1][1]
        a1, a2g = p["00-accroche"][2][1], p["00-accroche"][3][1]

        # ── 00 ──────────────────────────────────────────────────────────────
        # ⛔ Titre AJOUTÉ avant la voix (mesuré E1 : 0,50 s de retard sinon).
        self.margo_bas()
        self.add(titre, badge)
        self.dire("00-accroche")
        self.jouer_phrase(a1, "Deux droites qui se croisent sur le dessin, et qui ne se "
                              "rencontrent jamais.")
        self.jouer_phrase(a2g[0], "Ne conclus jamais sur une figure.")
        self.play(Create(a2g[1]), run_time=0.3)
        self.insister(a2g, 1.05)
        self.attendre_voix(marge=0.25)

        # ── 01 ──────────────────────────────────────────────────────────────
        self.dire("01-idee")
        cubeg, ac, eb, croix, ph1, ph2 = (x[1] for x in p["01-idee"][2:])
        self.play(FadeOut(VGroup(a1, a2g)), run_time=0.25)
        self.au_mot("Dans le cube")
        self.play(Create(cubeg[0]), run_time=0.9)
        self.au_mot("trace la droite A C")
        self.play(Create(ac), run_time=0.5)
        self.au_mot("puis la droite E B")
        self.play(Create(eb), run_time=0.5)
        self.jouer_phrase(ph1, "les deux traits se coupent.")
        self.play(FadeIn(croix, scale=2.4), Flash(croix, color=C_PIEGE, line_length=0.16),
                  run_time=0.5)
        # ⭐ « A C reste au sol » et « E B descend » se MONTRENT : on fait clignoter
        # chacune pendant que la voix la nomme. Aucune étiquette sur la figure — la
        # grille n'en laisse pas la place, et c'est la COULEUR qui relie (épisode 8).
        self.au_mot("Pourtant A C reste au sol")
        self.play(Indicate(ac, color=C_REGARD, scale_factor=1.06), run_time=0.6)
        self.au_mot("E B descend du haut du cube")
        self.play(Indicate(eb, color=C_VECTEUR2, scale_factor=1.06), run_time=0.6)
        self.jouer_phrase(ph2, "aucun point commun, et aucun plan ne les contient "
                               "toutes les deux.")
        self.attendre_voix(marge=0.3)

        # ── 02 ──────────────────────────────────────────────────────────────
        self.dire("02-question")
        t0 = self.renderer.time
        tete, rebours, q, cartes, pause = (x[1] for x in p["02-question"][2:])
        figure = VGroup(cubeg, ac, eb, croix)
        self.play(FadeOut(VGroup(figure, ph1, ph2)), run_time=0.45)
        # ⛔ Pas d'ancre sur « Question » : la voix le dit au caractère 0 du clip, et le
        # fondu ci-dessus a déjà pris 0,45 s (RETARD 0,35 s mesuré). On enchaîne.
        self.play(FadeIn(tete, shift=DOWN * 0.12), run_time=0.3)
        self.au_mot("Deux droites semblent")
        self.play(FadeIn(q, shift=UP * 0.08), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "02-question", t0, BONNE)

        # ── 02b ─────────────────────────────────────────────────────────────
        self.dire("02b-reponse")
        r1 = dict(p["02b-reponse"])["la cause"]   # ⛔ par NOM : l'index a déjà menti une fois
        ok = self.q_reponse(cartes, BONNE, pause, rebours)
        self.play(FadeOut(VGroup(tete, q)), run_time=0.25)
        self.jouer_phrase(r1, "Une perspective écrase une direction")
        self.play(Indicate(cartes[BONNE], color=VERT_OK, scale_factor=1.04), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 03 ──────────────────────────────────────────────────────────────
        self.dire("03-commentaire")
        et, cube3g, ag, bh, dq, appel = (x[1] for x in p["03-commentaire"])
        self.play(FadeOut(VGroup(cartes, r1, ok, titre, badge)), run_time=0.3)
        self.au_mot("À toi")
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Dans le même cube")
        self.play(Create(cube3g[0]), run_time=0.55)
        # ⭐ Les deux droites paraissent AVEC la question, pas avant : en file, leur
        # `run_time` de 0,6 s mettait la question 0,59 s en retard (mesuré au dry run).
        # ⚠️ Une seule ancre, posée à la main : le bloc n'est plus un morceau exact de la
        # voix (il porte les parenthèses des droites), donc `jouer_phrase` ne peut pas
        # le caler tout seul.
        self.au_mot("les droites A G et B H")
        self.play(FadeIn(dq, shift=UP * 0.08), Create(ag), Create(bh), run_time=0.45)
        self.jouer_appel(appel)
        self.attendre_voix(marge=0.5)

        # ── 04 ──────────────────────────────────────────────────────────────
        self.fin_short("04-abonne", [et, cube3g, ag, bh, dq, appel])
