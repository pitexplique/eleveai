# espace_position_relative_short.py
# EleveAI — Maths Tle spé — short « une solution, aucune, ou toutes » (9:16),
# ceinture VERTE. Micro du coach : espace_position_relative.
# Paysage jumeau : espace_position_relative.py (HD livré).
#
# ⭐ UNE SEULE IDÉE : droite et plan, on remplace, et c'est l'équation en t qui donne la
# position. ⛔ Un short ne résume pas son épisode.
#
#   · 00-accroche   : une droite qui coupe un plan, dans le repère cavalière ;
#   · 01-idee       : les trois cas, en trois rangées — ce qu'il reste, et la conclusion ;
#   · 02/02b        : question-pause (A : contenue dans le plan), 3 s ;
#   · 03-commentaire: d et P à tester — ⛔ la réponse (contenue) n'est ni dite ni affichée ;
#   · 04-abonne     : la fin commune.
#
# ⭐ LE PLAN DE L'ÉCRAN 00 EST LE SOL : `platitude((0 ; 0 ; 1))` = 14,9°, au-dessus du
# seuil de 12° sous lequel un morceau de plan se projette comme une LAME (le NOYAU de la
# cavalière, `espace3d.py`). Contrôlé par une assertion d'import.
#
# Voix : manim/voix/terminale-espace-position-relative-short.json (débit −6).
# Mesure : python -X utf8 manim/scripts/terminale/espace_mesure_short.py E5
# Dry run : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render --dry_run -qh -r 1080,1920 manim/scripts/terminale/espace_position_relative_short.py EspacePositionRelativeShort
# Planche : PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/terminale/espace_position_relative_short.py EspacePositionRelativeShort -o eleveai-maths-terminale-espace-position-relative-short --media_dir manim/scripts/terminale/media-espace-position-relative-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from espace_commun_short import *  # noqa: E402,F403

# ── LES DONNÉES, vérifiées à l'import ───────────────────────────────────────
NORMALE_SOL = (0, 0, 1)
# La droite de l'écran 00 : elle coupe le sol en un point, et c'est le cas « sécante ».
A00, U00 = (0.4, 0.4, 1.2), (0.4, 0.5, -1.4)
BONNE = 0                                    # A — tirage des shorts (B C A C A B)
# ⭐ Les trois cas, et leur reste en t. Ce sont les trois seules possibilités, et c'est
# ce qui rend les trois choix exclusifs : UNE racine, ZÉRO racine, TOUTES.
CAS = (("2t", "=", "0", "la droite coupe le plan", VERT_OK),
       ("3", "=", "0", "strictement parallèle", C_PLAN),
       ("0", "=", "0", "contenue dans le plan", C_REGARD))
CHOIX_T = ("contenue dans le plan", "sécante au plan", "strictement parallèle")
assert CHOIX_T[BONNE] == "contenue dans le plan"
assert len(set(CHOIX_T)) == 3
assert platitude(NORMALE_SOL) > 12.0, platitude(NORMALE_SOL)
# ⛔ La droite de l'écran 00 doit VRAIMENT couper le sol, et entre t = 0 et t = 1 — sinon
# la figure montrerait autre chose que ce que la légende annonce.
_t = -A00[2] / U00[2]
assert 0.0 < _t < 1.0, _t
# ⭐ Le défi de l'écran 03, recalculé : d : x = 1 + t, y = t, z = 2t dans
# P : x + y − z − 1 = 0 donne (1 + t) + t − 2t − 1 = 0, vrai pour TOUT t.
assert all(abs((1 + t) + t - 2 * t - 1) < 1e-12 for t in (-3.0, 0.0, 1.5, 7.0))


def pieces(e):
    """BÂTIT et POSITIONNE les six écrans, sans rien jouer."""
    p = {}
    titre, badge = e.entete_blocs("Droite et plan")

    # ── 00 : une droite qui coupe un plan ───────────────────────────────────
    a1 = e.blocs_phrase("Une droite et un plan dans l'espace : trois positions, et une "
                        "seule ligne de calcul.", 1.32, 28)
    r, axes = e.repere(o=(0.0, 0.0), u=0.46, portee=3)
    sol = r.plan(NORMALE_SOL, d=0.0, centre=(1, 1, 0), demi=1.05, couleur=C_PLAN, op=0.28)
    dte = r.droite(A00, U00, t0=-0.15, t1=1.25, couleur=C_DROITE, sw=5)
    inter = Dot(r.pt(*[A00[i] + _t * U00[i] for i in range(3)]), radius=0.08, color=C_REGARD)
    fig = VGroup(axes, sol, dte, inter)
    fig.move_to(P(0.0, -0.85))
    p["00-accroche"] = [("titre", titre), ("badge", badge), ("accroche", a1),
                        ("figure", fig)]

    # ── 01 : les trois cas, en trois rangées ────────────────────────────────
    # ⭐ Une rangée = « ce qu'il reste » à gauche, la conclusion à droite, et la COULEUR
    # relie les deux. ⛔ Les zéros passent par `eq_mots` : la voix dit « zéro » en
    # lettres et l'écran écrit le chiffre — sans ça, trois `AUDIT-ABSENT « 0 »`.
    # ⛔⛔ UNE RANGÉE EST EMPILÉE, PAS ALIGNÉE, et c'est une cote. Premier jet : le reste
    # en t, une flèche, puis la conclusion, tout sur une ligne — 5,30 de large pour 3,90
    # offerts, donc les trois conclusions tombaient à **16,5 px** et les équations à
    # 21,0. C'est le défaut n° 4 de l'épisode 1 dans un cadre deux fois plus étroit : en
    # 9:16 on n'aligne pas trois objets, on les empile. La flèche a disparu avec la
    # ligne ; c'est la COULEUR qui relie le reste à sa conclusion (remède de l'écran 09b
    # de l'épisode 8, « quand il n'y a pas de place, c'est la couleur qui relie »).
    rangees = VGroup()
    for g1, g2, g3, concl, coul in CAS:
        eq = e.eq_mots([g1, g2, g3], 28, coul)
        txt = e.t(concl, 22, coul, larg=None)
        rangees.add(VGroup(eq, txt).arrange(DOWN, buff=0.08))
    rangees.arrange(DOWN, buff=0.30)
    rangees = e.pose(rangees, -0.75)
    ph = e.blocs_phrase("on remplace x, y et z de la droite dans l'équation du plan, et "
                        "on lit ce qu'il reste.", 1.60, 24, GREY_A)
    p["01-idee"] = [("titre", titre), ("badge", badge), ("le geste", ph),
                    ("les trois cas", rangees)]

    # ── 02 / 02b : la question-pause ────────────────────────────────────────
    # ⭐ 26/22 vient d'un balayage hors rendu. ⛔ Les trois choix tiennent sur DEUX
    # lignes chacun, et c'est la contrainte qui décide : un choix d'une seule ligne de
    # 21 caractères tombe à 16,9 px dans une carte de 3,95 (mesuré), c'est-à-dire sous
    # le seuil de lisibilité d'un téléphone — le défaut n° 4 de l'épisode 1.
    fsq, fsc = 26, 22
    q_lignes, _ = e.lignes("Après substitution, il reste 0 = 0. La droite est :", fsq)
    for m in q_lignes:
        if "0" in m.original_text:
            e.sans_audit(m)   # « zéro » est dit en lettres, l'écran écrit le chiffre
    # ⭐ Les libellés viennent de CHOIX_T, la constante du module : deux copies d'une
    # seule vérité divergent dès qu'on en touche une (la cote de Ravi, épisode 10).
    choix = [e.choix2(*c.split(" ", 1), fs=fsc) for c in CHOIX_T]
    tete, q, cartes, pause, rebours = e.q_tete(q_lignes, choix, fs_q=fsq, fs_c=fsc)
    p["02-question"] = [("titre", titre), ("badge", badge), ("tête", tete),
                        ("rebours", rebours), ("question", q), ("cartes", cartes),
                        ("pause", pause)]
    haut = float(cartes.get_top()[1])
    r1 = e.blocs_phrase("tous les points de la droite sont dans le plan.",
                        haut + 0.95, 24, VERT_OK)
    p["02b-reponse"] = [("titre", titre), ("badge", badge), ("cartes", cartes),
                        ("la raison", r1)]

    # ── 03 : la question en commentaire ─────────────────────────────────────
    from espace_ecrans import equation_plan, ligne_param
    et = e.pose(e.t("À toi !", 38, JAUNE_TITRE, larg=None), 3.50)
    syst = e.pose(VGroup(*[e.t(s, 26, C_DROITE, larg=None) for s in (
        "d : " + ligne_param("x", 1, 1), ligne_param("y", 0, 1), ligne_param("z", 0, 2))]
    ).arrange(DOWN, buff=0.12, aligned_edge=LEFT), 1.80)
    # ⚠️ Par `eq_mots` et non par `t` : le « 0 » de « = 0 » sortait en AUDIT-ABSENT (la
    # voix dit « égale zéro »), et un `sans_audit` sur toute la ligne aurait aussi
    # exempté le « 1 » — le seul nombre que l'audit doit surveiller ici.
    _eqp = "P : " + equation_plan(1, 1, -1, -1)
    pl = e.pose(e.eq_mots([_eqp[:-1].rstrip(), "0"], 26, C_PLAN), 0.35)
    dq = e.blocs_phrase("Position relative ?", -0.70, 32, C_REGARD)
    appel = e.appel_blocs(-2.05)
    p["03-commentaire"] = [("à toi", et), ("la droite", syst), ("le plan", pl),
                           ("question", dq), ("appel", appel)]
    return p


class EspacePositionRelativeShort(ShortEspace):
    fichier_marques = "espace_position_relative_short_marques.json"
    nom_voix = "terminale-espace-position-relative-short"

    def construct(self):
        p = pieces(self)
        titre, badge = p["00-accroche"][0][1], p["00-accroche"][1][1]
        a1, fig = p["00-accroche"][2][1], p["00-accroche"][3][1]

        # ── 00 ──────────────────────────────────────────────────────────────
        # ⛔ Titre AJOUTÉ avant la voix (mesuré E1 : 0,50 s de retard sinon).
        self.margo_bas()
        self.add(titre, badge)
        self.dire("00-accroche")
        self.jouer_phrase(a1, "Une droite et un plan dans l'espace : trois positions, "
                              "et une seule ligne de calcul.")
        axes, sol, dte, inter = fig
        self.play(Create(axes), run_time=0.4)
        self.play(FadeIn(sol, scale=0.85), run_time=0.5)
        self.play(Create(dte), run_time=0.5)
        self.play(FadeIn(inter, scale=2.2), Flash(inter, color=C_REGARD, line_length=0.14),
                  run_time=0.5)
        self.attendre_voix(marge=0.25)

        # ── 01 ──────────────────────────────────────────────────────────────
        self.dire("01-idee")
        ph, rangees = p["01-idee"][2][1], p["01-idee"][3][1]
        self.play(FadeOut(VGroup(a1, fig)), run_time=0.25)
        self.jouer_phrase(ph, "on remplace x, y et z de la droite dans l'équation du "
                              "plan, et on lit ce qu'il reste.")
        # ⭐ Chaque rangée arrive quand la voix a FINI de dire son reste : « comme 2 t
        # égale zéro » posé à son premier mot mettrait le « 0 » à l'écran avant d'être
        # dit (piège n° 6 des entiers).
        for rangee, extrait, mot in zip(
                rangees,
                ("comme 2 t égale zéro", "comme 3 égale zéro", "Toutes, zéro égale zéro"),
                ("la droite coupe le plan", "strictement parallèle", "contenue dans le plan")):
            self.au_fin(extrait)
            self.play(FadeIn(rangee[0], shift=RIGHT * 0.1), run_time=0.3)
            self.au_mot(mot)
            self.play(FadeIn(rangee[1], shift=UP * 0.08), run_time=0.35)
        self.attendre_voix(marge=0.3)

        # ── 02 ──────────────────────────────────────────────────────────────
        self.dire("02-question")
        t0 = self.renderer.time
        tete, rebours, q, cartes, pause = (x[1] for x in p["02-question"][2:])
        self.play(FadeOut(VGroup(ph, rangees)), run_time=0.3)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.12), run_time=0.3)
        self.au_mot("Après substitution")
        self.play(FadeIn(q, shift=UP * 0.08), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "02-question", t0, BONNE)

        # ── 02b ─────────────────────────────────────────────────────────────
        self.dire("02b-reponse")
        r1 = p["02b-reponse"][3][1]
        ok = self.q_reponse(cartes, BONNE, pause, rebours)
        self.play(FadeOut(VGroup(tete, q)), run_time=0.25)
        self.jouer_phrase(r1, "tous les points de la droite sont dans le plan.")
        self.attendre_voix(marge=0.3)

        # ── 03 ──────────────────────────────────────────────────────────────
        self.dire("03-commentaire")
        et, syst, pl, dq, appel = (x[1] for x in p["03-commentaire"])
        self.play(FadeOut(VGroup(cartes, r1, ok, titre, badge)), run_time=0.3)
        self.au_mot("À toi")
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        for ligne, extrait in zip(syst, ("x égale 1 plus t", "y égale t", "z égale 2 t")):
            self.au_fin(extrait)
            self.play(FadeIn(ligne, shift=RIGHT * 0.1), run_time=0.3)
        self.au_fin("x plus y moins z moins 1 égale zéro")
        self.play(FadeIn(pl, shift=UP * 0.08), run_time=0.35)
        self.jouer_phrase(dq, "Position relative ?")
        self.jouer_appel(appel)
        self.attendre_voix(marge=0.5)

        # ── 04 ──────────────────────────────────────────────────────────────
        self.fin_short("04-abonne", [et, syst, pl, dq, appel])
