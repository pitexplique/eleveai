# ps_espace_norme_distance_short.py
# EleveAI — Maths Tle spé — short « la racine ne se distribue pas » (9:16), ceinture
# VERTE. Micro du coach : ps_espace_norme_distance.
# Paysage jumeau : ps_espace_norme_distance.py (HD livré).
#
# ⭐ UNE SEULE IDÉE : on n'additionne pas deux longueurs perpendiculaires, on passe par
# les carrés.
#
#   · 00-accroche   : dix kilomètres à plat, un de dénivelé, et « onze » barré ;
#   · 01-idee       : le profil du coureur — ⭐ la hauteur fait EXACTEMENT un dixième de
#                     la base — puis 100 + 1 = 101 et √101 ≈ 10,05 ;
#   · 02/02b        : question-pause (B : 5), 3 s ;
#   · 03-commentaire: u (2 ; 3 ; 6) — ⛔ la réponse (7) n'est NI dite NI affichée ;
#   · 04-abonne     : la fin commune.
#
# ⛔⛔ CET ÉPISODE EST CELUI QUI EXIGE UN VRAI RADICAL, ET C'EST MESURÉ SUR IMAGE.
# Le glyphe √ (U+221A) se rend — mais il n'a AUCUNE BARRE. Écrit tel quel, l'énoncé de la
# question se lirait « (√3²) + 4² », c'est-à-dire exactement la faute que ce short
# combat : l'écran contredirait la voix. `EcransEspace.racine` trace la barre, et son
# critère d'emprunt est vérifié (elle n'utilise que `self.t`, ni `super()`, ni `col()`,
# ni `gauche()`). Le socle des shorts ne l'a pas dans son bloc d'emprunts et il est GELÉ :
# on l'emprunte donc ICI, en une ligne.
# ⭐ Vérifié sur une image d'essai avant d'écrire un écran : « ² » se rend, « ‖ », « ≈ »
# et « − » aussi, la barre de `racine()` se trace bien au-dessus de « 3² + 4² ». ⛔ Et
# « ⟂ » (U+22A5) NE SE REND PAS — il sort en carré de tofu « 27C2 ». Il n'est pas employé.
#
# Voix : manim/voix/terminale-ps-espace-norme-distance-short.json, calée par
# ps_espace_norme_distance_short_marques.json (153 marques).
# Découpage : manim/poste2/DECOUPAGE-shorts-ps-espace.md, section E9.
#
# Mesure (⛔ AVANT tout rendu) : python -X utf8 manim/poste2/mesure-shorts-ps-espace.py E9
# Avant rendu : python -X utf8 manim/poste2/verifier-avant-rendu.py manim/scripts/terminale/ps_espace_norme_distance_short.py PsEspaceNormeDistanceShort
# Dry run : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render --dry_run -r 1080,1920 manim/scripts/terminale/ps_espace_norme_distance_short.py PsEspaceNormeDistanceShort
# Planche : PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/terminale/ps_espace_norme_distance_short.py PsEspaceNormeDistanceShort -o eleveai-maths-terminale-ps-espace-norme-distance-short --media_dir manim/scripts/terminale/media-ps-espace-norme-distance-short

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from espace_commun_short import *  # noqa: E402,F403
from espace3d import pente  # noqa: E402

# ── LES DONNÉES, REFAITES à l'import ────────────────────────────────────────
PLAT, DENIVELE = 10, 1
CARRES = PLAT ** 2 + DENIVELE ** 2                  # 101
REELLE = math.sqrt(CARRES)                          # ≈ 10,0499
BONNE = 1                                           # B — tirage des shorts : A C B C B A
A_Q, B_Q, C_Q = 3, 4, 5                             # la question : √(3² + 4²)
NORME_DEFI = (2, 3, 6)                              # le défi de l'écran 03

assert CARRES == 101, CARRES
# ⭐ « un peu plus de dix » : la voix le dit, et on le REFAIT. Si la pente changeait, la
# phrase deviendrait fausse et cette ligne tomberait.
assert 10.0 < REELLE < 10.1, REELLE
assert round(REELLE, 2) == 10.05, REELLE
# ⛔ L'erreur que le short combat, chiffrée : additionner les deux longueurs donne 11,
# soit presque un kilomètre de trop — et la vraie distance ne dépasse le plat que de 5 cm
# par kilomètre.
assert PLAT + DENIVELE == 11 and abs(REELLE - 11) > 0.9
assert A_Q ** 2 + B_Q ** 2 == C_Q ** 2 == 25, (A_Q, B_Q, C_Q)
assert math.isqrt(25) == 5
# ⭐ Les trois cartes nomment chacune une faute PRÉCISE, et chacune est refaite ici :
assert A_Q + B_Q == 7                               # A : la racine distribuée
assert A_Q ** 2 + B_Q ** 2 == 25                    # C : la racine oubliée
assert len({7, 5, 25}) == 3                         # trois nombres distincts
# ⭐ Le défi : la norme vaut 7, et elle n'est NI dite NI affichée.
assert math.isqrt(sum(x * x for x in NORME_DEFI)) == 7


def pieces(e):
    """BÂTIT et POSITIONNE les six écrans, sans rien jouer."""
    p = {}
    # ⚠️ 30 px : « Norme et distance » fait 4,90 à 38 px pour 3,90 offerts — il serait
    # réduit à 30,2 px en silence. On le demande donc à 30.
    titre, badge = e.entete_blocs("Norme et distance", fs=30)

    # ── 00 : dix, un, et « onze » qui ne marche pas ─────────────────────────
    # ⭐ LES NOMBRES SONT ÉCRITS EN LETTRES, comme la voix les dit. Écrire « 10 km » ici
    # ferait sortir `AUDIT-ABSENT « 10 »` — la voix dit « dix kilomètres » — et il
    # faudrait exempter. Les lettres sont à la fois la bonne écriture et le bon audit.
    # ⚠️ 26 et 24 px, et c'est la mesure : à 28 px les deux phrases dépassent les 3,90
    # offerts et se coupent en deux lignes chacune — les deux blocs passent à 0,82 et
    # 0,70 de haut et finissent à 0,04 l'un de l'autre.
    a1 = e.blocs_phrase("Dix kilomètres à plat", 1.95, 26)
    a2 = e.blocs_phrase("un kilomètre de dénivelé", 1.15, 24)
    a3t = e.blocs_phrase("Onze kilomètres parcourus ?", 0.0, 24, C_PIEGE, larg=3.40)
    a3 = e.pose(VGroup(e.croix(), a3t).arrange(RIGHT, buff=0.14), -0.75)
    # ⛔ `larg=3,60` : un bloc ENCADRÉ qui remplit la largeur sort du cadre pendant le
    # battement de `insister` — (3,90 + 0,28) × 1,05 / 2 = 2,19 pour une marge à 2,115.
    a4 = e.blocs_phrase("Non.", -1.95, 40, VERT_OK, larg=3.60)
    cadre4 = SurroundingRectangle(a4, color=VERT_OK, buff=0.16, stroke_width=3)
    p["00-accroche"] = [("titre", titre), ("badge", badge), ("à plat", a1),
                        ("dénivelé", a2), ("onze barré", a3),
                        ("non", VGroup(a4, cadre4))]

    # ── 01 : le profil du coureur, à l'échelle ──────────────────────────────
    # ⭐⭐ `pente()` DESSINE LA HAUTEUR À EXACTEMENT UN DIXIÈME DE LA BASE, et son module
    # le vérifie par assertion. C'est TOUTE la leçon : l'hypoténuse se superpose presque
    # au sol, donc « le dénivelé change presque rien à la distance ». Un schéma exagéré
    # ferait dire à l'écran le contraire de la voix — c'est le défaut du « 3-4-5 » faux
    # de 13 % de l'épisode 9.
    # ⚠️ 0,85 d'échelle : la figure fait 4,00 de large, donc ±2,00 — dans la marge de
    # ±2,115, mais il ne resterait rien pour écrire « 1 km » au-dessus de la montée. À
    # 0,85 elle fait 3,40 et la place existe.
    fig = pente(s=0.85).move_to(P(0, 1.55))
    sol, montee, trajet, _angle = fig
    # ⚠️ `sans_audit` sur les deux cotes : la voix de ce clip dit « une distance au sol et
    # une hauteur », jamais « 10 » ni « 1 ». Ce sont des cotes de FIGURE, qu'on LIT.
    c_plat = e.sans_audit(e.t("10 km", 22, GREY_A, larg=None)).next_to(sol, DOWN, buff=0.20)
    c_den = e.sans_audit(e.t("1 km", 22, C_REGARD, larg=None)).next_to(montee, UP, buff=0.22)
    figure = VGroup(fig, c_plat, c_den)
    # ⚠️ 0,35 : à 0,55 ce bloc passait à 0,012 de la figure. L'écart minimal de la
    # série est 0,05, et 0,012 se lit « collé » à l'image.
    ph1 = e.blocs_phrase("on passe par les carrés", 0.35, 26, C_REGARD)
    # ⛔ « Cent plus un fait cent un » : TOUT est dit en lettres dans ce clip, donc tous
    # les jetons sortent de l'audit. `eq_mots` n'exempte que les zéros ; ici c'est la
    # ligne entière, et la raison est écrite plutôt que devinée.
    eq = e.sans_audit(e.eq_mots([str(PLAT ** 2), "+", str(DENIVELE ** 2), "=", str(CARRES)], 28))
    e.pose(eq, -0.40)
    # ⚠️ UN RADICAL EST PLUS HAUT QU'UN TEXTE DE LA MÊME POLICE (la barre déborde de
    # 0,07) : la cote de ce bloc est remesurée, pas recopiée de la ligne d'au-dessus.
    rac = e.sans_audit(VGroup(e.racine(str(CARRES), 32, VERT_OK),
                              e.t("≈ 10,05", 32, VERT_OK, larg=None)
                              ).arrange(RIGHT, buff=0.22))
    e.pose(rac, -1.55)
    cadre_r = SurroundingRectangle(rac, color=VERT_OK, buff=0.14, stroke_width=3)
    ph2 = e.blocs_phrase("presque rien à la distance", -2.50, 22, GREY_A)
    p["01-idee"] = [("titre", titre), ("badge", badge), ("figure", figure),
                    ("les carrés", ph1), ("cent un", eq),
                    ("la racine", VGroup(rac, cadre_r)), ("presque rien", ph2)]

    # ── 02 / 02b : la question-pause ────────────────────────────────────────
    fsq, fsc = 28, 26
    # ⛔⛔ LA QUESTION PORTE UN VRAI RADICAL, BARRE COMPRISE. C'est l'écran qui ne peut
    # pas s'écrire avec le glyphe nu : « √3² + 4² » se lit « (√3²) + 4² ».
    q_rac = e.racine(e.t(f"{A_Q}² + {B_Q}²", fsq, larg=None), fsq)
    q_lignes = [VGroup(e.t("Que vaut", fsq, larg=None), q_rac,
                       e.t("?", fsq, larg=None)).arrange(RIGHT, buff=0.18)]
    # ⭐ Chaque carte porte un `.nb` : sans lui, `q_montrer_choix` pose le corps quatre
    # caractères après « A : », c'est-à-dire juste AVANT que la voix dise le nombre.
    cartes_txt = []
    for v in (A_Q + B_Q, C_Q, C_Q ** 2):
        t = e.t(e.nombre(v), fsc, larg=None)
        t.nb = [t]
        cartes_txt.append(t)
    tete, q, cartes, pause, rebours = e.q_tete(q_lignes, cartes_txt, fs_q=fsq, fs_c=fsc)
    p["02-question"] = [("titre", titre), ("badge", badge), ("tête", tete),
                        ("rebours", rebours), ("question", q), ("cartes", cartes),
                        ("pause", pause)]

    haut, bas = float(cartes.get_top()[1]), float(cartes.get_bottom()[1])
    r1 = e.eq_mots([str(A_Q ** 2), "+", str(B_Q ** 2), "=", str(C_Q ** 2)], 28)
    # ⚠️ 0,90 et 0,38 au-dessus des cartes, et les deux cotes viennent du bas : les
    # cartes de ce short sont petites (2,18 de haut en tout) et montent donc à +1,14,
    # alors que l'échelle des ceintures descend à +2,48. Il reste 1,29 pour deux blocs
    # de 0,29 et 0,63 — à +1,20 le premier mordait sur l'échelle.
    e.pose(r1, haut + 0.90)
    r2 = VGroup(e.racine(str(C_Q ** 2), 30, VERT_OK),
                e.t(f"= {C_Q}", 30, VERT_OK, larg=None)).arrange(RIGHT, buff=0.20)
    e.pose(r2, haut + 0.38)
    cadre_r2 = SurroundingRectangle(r2, color=VERT_OK, buff=0.12, stroke_width=3)
    la = e.blocs_phrase("A : distribue la racine", bas - 0.32, 22, C_PIEGE)
    lc = e.blocs_phrase("C : oublié de prendre la racine", bas - 1.00, 22, C_PIEGE)
    p["02b-reponse"] = [("titre", titre), ("badge", badge), ("cartes", cartes),
                        ("les carrés", r1), ("la racine", VGroup(r2, cadre_r2)),
                        ("leurre A", la), ("leurre C", lc)]

    # ── 03 : la question en commentaire ─────────────────────────────────────
    et = e.pose(e.t("À toi !", 38, JAUNE_TITRE, larg=None), 3.50)
    d1 = e.pose(VGroup(e.vec("u", 30, C_REGARD),
                       e.trip(NORME_DEFI, 30, C_REGARD, par=True)).arrange(RIGHT, buff=0.18), 1.80)
    # ⛔⛔ « ‖u⃗‖ » ET PAS « sa norme » : la notation de la norme EST ce qu'on demande, et
    # `vexpr` met la flèche sur le « u » — sans elle, « ‖u‖ » parle d'un nombre.
    dq = e.pose(e.vexpr("‖u‖ = ?", ("u",), 34), 0.45)
    appel = e.appel_blocs(-1.25)
    p["03-commentaire"] = [("à toi", et), ("donnée u", d1), ("question", dq),
                           ("appel", appel)]
    return p


class PsEspaceNormeDistanceShort(ShortEspace):
    fichier_marques = "ps_espace_norme_distance_short_marques.json"
    nom_voix = "terminale-ps-espace-norme-distance-short"

    # ⛔ L'EMPRUNT QUI MANQUE AU SOCLE GELÉ. Voir l'en-tête : sans la barre, l'écran de
    # question de ce short porterait la faute qu'il interroge.
    racine = EcransEspace.racine

    def construct(self):
        p = self.par_nom(pieces(self))
        titre, badge = p["00-accroche"]["titre"], p["00-accroche"]["badge"]

        # ── 00 : l'accroche ─────────────────────────────────────────────────
        self.margo_bas()
        self.add(titre, badge)
        self.dire("00-accroche")
        a = p["00-accroche"]
        self.jouer_phrase(a["à plat"], "Dix kilomètres à plat")
        self.jouer_phrase(a["dénivelé"], "un kilomètre de dénivelé")
        self.au_mot("Onze kilomètres parcourus")
        self.play(FadeIn(a["onze barré"], shift=UP * 0.08), run_time=0.35)
        self.au_mot("Non.")
        self.play(FadeIn(a["non"][0], scale=1.2), Create(a["non"][1]), run_time=0.45)
        self.insister(a["non"], 1.05)
        self.attendre_voix(marge=0.25)

        # ── 01 : le profil, les carrés, la racine ───────────────────────────
        self.dire("01-idee")
        i = p["01-idee"]
        self.play(FadeOut(VGroup(a["à plat"], a["dénivelé"], a["onze barré"], a["non"])),
                  run_time=0.25)
        fig, c_plat, c_den = i["figure"]
        sol, montee, trajet, angle = fig
        self.au_mot("une distance au sol")
        self.play(Create(sol), FadeIn(c_plat), run_time=0.4)
        self.au_mot("et une hauteur")
        self.play(Create(montee), FadeIn(c_den), Create(angle), run_time=0.4)
        # ⭐ `avec=` : la figure paraît EN MÊME TEMPS que sa légende. Mise en file, son
        # `run_time` s'ajoute au budget du clip et la phrase suivante arrive en RETARD
        # (0,83 s sur E4, 0,59 s sur E6).
        self.jouer_phrase(i["les carrés"], "on passe par les carrés",
                          avec=[Create(trajet)])
        self.au_fin("Cent plus un fait cent un")
        self.play(FadeIn(i["cent un"], shift=UP * 0.08), run_time=0.35)
        self.au_mot("un peu plus de dix")
        self.play(FadeIn(i["la racine"][0], shift=UP * 0.08),
                  Create(i["la racine"][1]), run_time=0.4)
        self.jouer_phrase(i["presque rien"], "presque rien à la distance")
        self.attendre_voix(marge=0.3)

        # ── 02 : la question-pause ──────────────────────────────────────────
        self.dire("02-question")
        t0 = self.renderer.time
        qq = p["02-question"]
        self.play(FadeOut(VGroup(i["figure"], i["les carrés"], i["cent un"],
                                 i["la racine"], i["presque rien"])), run_time=0.3)
        self.au_mot("Question")
        self.play(FadeIn(qq["tête"], shift=DOWN * 0.12), run_time=0.3)
        self.au_fin("racine de 3 au carré plus 4 au carré")
        self.play(FadeIn(qq["question"], shift=UP * 0.08), run_time=0.35)
        self.q_montrer_choix(qq["cartes"])
        self.q_pause(qq["pause"], qq["rebours"], "02-question", t0, BONNE)

        # ── 02b : la réponse ────────────────────────────────────────────────
        self.dire("02b-reponse")
        r = p["02b-reponse"]
        cartes = qq["cartes"]
        ok = self.q_reponse(cartes, BONNE, qq["pause"], qq["rebours"])
        self.play(FadeOut(VGroup(qq["tête"], qq["question"])), run_time=0.25)
        self.au_fin("Les carrés font 9 et 16, leur somme fait 25")
        self.play(FadeIn(r["les carrés"], shift=UP * 0.08), run_time=0.35)
        self.au_fin("racine de 25 fait 5")
        self.play(FadeIn(r["la racine"][0], shift=UP * 0.08),
                  Create(r["la racine"][1]), run_time=0.4)
        self.au_mot("distribue la racine")
        self.play(FadeIn(r["leurre A"], shift=UP * 0.06),
                  Indicate(cartes[0], color=C_PIEGE, scale_factor=1.04), run_time=0.4)
        self.au_mot("oublié de prendre la racine")
        self.play(FadeIn(r["leurre C"], shift=UP * 0.06),
                  Indicate(cartes[2], color=C_PIEGE, scale_factor=1.04), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 03 : la question en commentaire ─────────────────────────────────
        self.dire("03-commentaire")
        c = p["03-commentaire"]
        self.play(FadeOut(VGroup(cartes, r["les carrés"], r["la racine"], r["leurre A"],
                                 r["leurre C"], ok, titre, badge)), run_time=0.3)
        self.au_mot("À toi")
        self.play(FadeIn(c["à toi"], shift=DOWN * 0.1), run_time=0.35)
        self.au_fin("u a pour coordonnées 2, 3, 6")
        self.play(FadeIn(c["donnée u"], shift=UP * 0.08), run_time=0.3)
        self.au_mot("Que vaut sa norme")
        self.play(FadeIn(c["question"], scale=1.1), run_time=0.35)
        self.jouer_appel(c["appel"])
        self.attendre_voix(marge=0.5)

        # ── 04 : la fin ─────────────────────────────────────────────────────
        self.fin_short("04-abonne", [c["à toi"], c["donnée u"], c["question"],
                                     c["appel"]])
