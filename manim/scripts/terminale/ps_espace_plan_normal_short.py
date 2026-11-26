# ps_espace_plan_normal_short.py
# EleveAI — Maths Tle spé — short « la normale est déjà écrite dans l'équation » (9:16),
# ceinture VERTE. Micro du coach : ps_espace_plan_normal.
# Paysage jumeau : ps_espace_plan_normal.py (HD livré).
#
# ⭐ UNE SEULE IDÉE : les trois coefficients de l'équation SONT les coordonnées d'un
# vecteur normal — avec leurs signes, et sans aucun calcul.
#
#   · 00-accroche   : « tu as l'équation ? tu as déjà la normale », sans calcul ;
#   · 01-idee       : ⭐⭐ LES TROIS COEFFICIENTS TOMBENT DE L'ÉQUATION dans le triplet.
#                     C'est la seule animation qui porte la leçon : les chiffres ne sont
#                     pas recopiés, ils DESCENDENT. Et le terme constant reste en haut ;
#   · 02/02b        : question-pause (B : 3 ; −1 ; 2), 3 s ;
#   · 03-commentaire: x − 4y + z − 9 = 0 — ⛔ la réponse (1 ; −4 ; 1) n'est NI dite NI
#                     affichée ;
#   · 04-abonne     : la fin commune.
#
# Voix : manim/voix/terminale-ps-espace-plan-normal-short.json, calée par
# ps_espace_plan_normal_short_marques.json (203 marques).
# Découpage : manim/poste2/DECOUPAGE-shorts-ps-espace.md, section E11.
#
# Mesure (⛔ AVANT tout rendu) : python -X utf8 manim/poste2/mesure-shorts-ps-espace.py E11
# Avant rendu : python -X utf8 manim/poste2/verifier-avant-rendu.py manim/scripts/terminale/ps_espace_plan_normal_short.py PsEspacePlanNormalShort
# Dry run : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render --dry_run -r 1080,1920 manim/scripts/terminale/ps_espace_plan_normal_short.py PsEspacePlanNormalShort
# Planche : PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/terminale/ps_espace_plan_normal_short.py PsEspacePlanNormalShort -o eleveai-maths-terminale-ps-espace-plan-normal-short --media_dir manim/scripts/terminale/media-ps-espace-plan-normal-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np  # noqa: E402

from espace_commun_short import *  # noqa: E402,F403

# ── LES DONNÉES, REFAITES à l'import ────────────────────────────────────────
EQ1 = (2, -1, 3, -5)                 # 2x − y + 3z − 5 = 0
N1 = EQ1[:3]
EQQ = (3, -1, 2, 4)                  # la question : 3x − y + 2z + 4 = 0
NQ = EQQ[:3]
BONNE = 1                            # B — tirage des shorts : A C B C B A
LEURRE_A = (3, 1, 2)                 # le signe moins perdu
LEURRE_C = (0, 0, 4)                 # le terme constant pris pour une coordonnée
EQD = (1, -4, 1, -9)                 # le défi de l'écran 03

assert N1 == (2, -1, 3), N1
assert NQ == (3, -1, 2), NQ
# ⭐ LA PROPRIÉTÉ, REFAITE ET PAS AFFIRMÉE : n est bien normal au plan, c'est-à-dire
# orthogonal à DEUX vecteurs non colinéaires du plan. On en fabrique deux à partir de
# trois points du plan, et on vérifie les deux produits scalaires — exactement ce que
# l'épisode 8 dit qu'il faut faire.
def _trois_points(a, b, c, d):
    """Trois points non alignés du plan ax + by + cz + d = 0."""
    pts = []
    for e1, e2 in ((1.0, 0.0), (0.0, 1.0), (1.0, 1.0)):
        if c != 0:
            pts.append(np.array([e1, e2, -(a * e1 + b * e2 + d) / c]))
        elif b != 0:
            pts.append(np.array([e1, -(a * e1 + c * e2 + d) / b, e2]))
        else:
            pts.append(np.array([-(b * e1 + c * e2 + d) / a, e1, e2]))
    return pts


for _eq in (EQ1, EQQ, EQD):
    _n = np.array(_eq[:3], dtype=float)
    _p, _q, _r = _trois_points(*_eq)
    _u, _v = _q - _p, _r - _p
    assert np.linalg.norm(np.cross(_u, _v)) > 1e-9, _eq      # deux directions du plan
    assert abs(float(_n @ _u)) < 1e-9 and abs(float(_n @ _v)) < 1e-9, _eq
# ⛔ Les deux leurres sont RÉFUTÉS, pas seulement différents : A n'est pas colinéaire à
# la vraie normale (le signe change la direction), et C non plus.
for _leurre in (LEURRE_A, LEURRE_C):
    assert np.linalg.norm(np.cross(np.array(NQ, float), np.array(_leurre, float))) > 1e-9, _leurre
assert len({NQ, LEURRE_A, LEURRE_C}) == 3
# ⭐ Le défi : la normale est (1 ; −4 ; 1). Ni dite, ni affichée.
assert EQD[:3] == (1, -4, 1)


def trip0(e, t3, fs=28, color=WHITE, par=False):
    """Un triplet dont les ZÉROS sont hors audit, et EUX SEULS.

    ⛔ Les six voix du produit scalaire disent « zéro » EN LETTRES (« C : zéro, zéro,
    4 »), là où celles de la géométrie écrivaient « 0 ». L'audit cherche le CHIFFRE et
    sort `AUDIT-ABSENT « 0 »`. ⛔ Pas de `sans_audit` sur le triplet entier : le « 4 »
    de (0 ; 0 ; 4) est dit, et c'est lui que l'audit doit surveiller."""
    g = e.trip(t3, fs, color, par=par)
    for v, m in zip(t3, g.nb):
        if v == 0:
            e.sans_audit(m)
    return g


def equation(e, eq, fs=28, color=WHITE):
    """L'équation d'un plan, montée JETON PAR JETON et ADRESSABLE.

    ⭐⭐ C'est la pièce qui porte la leçon de ce short : il faut pouvoir prendre LE
    coefficient de x, LE coefficient de y, LE coefficient de z — et les faire tomber.
    `g.coef[i]` les rend, `g.cte` rend le terme constant, `g.zero` le « 0 » de droite.
    ⛔ Le « 0 » est un jeton À PART et pas « = 0 » : `eq_mots` n'exempte de l'audit que
    les jetons qui COMMENCENT par un zéro, et la voix dit « égale zéro » en lettres.
    Collé au « = », le zéro serait sorti en `AUDIT-ABSENT`.
    ⚠️ Et les coefficients portent leur SIGNE, parce que c'est tout le sujet : le jeton
    du y est « − y » et non « y », si bien que ce qui tombe dans le triplet est « −1 »."""
    a, b, c, d = eq
    jx = f"{e.nombre(a)}x" if abs(a) != 1 else ("x" if a == 1 else "−x")
    jy = f"{'−' if b < 0 else '+'} {abs(b) if abs(b) != 1 else ''}y".replace("  ", " ")
    jz = f"{'−' if c < 0 else '+'} {abs(c) if abs(c) != 1 else ''}z".replace("  ", " ")
    jd = f"{'−' if d < 0 else '+'} {abs(d)}"
    jetons = [jx, jy, jz, jd, "=", "0"]
    g = e.eq_mots(jetons, fs, color)
    _aligner_lignes_de_base(e, jetons, g, fs)
    g.coef, g.cte, g.zero = [g[0], g[1], g[2]], g[3], g[5]
    return g


def _aligner_lignes_de_base(e, jetons, g, fs):
    """Remet les jetons d'une équation sur UNE SEULE ligne de base.

    ⛔⛔ VU AU GROS PLAN DU 26/11, ET PAR RIEN D'AUTRE. Dans « 2x − y + 3z − 5 = 0 »,
    le moins de « − y » avait son milieu 21 px (0,087 d'unité) AU-DESSUS de celui de
    « − 5 » et du « + ». À l'écran il ne se lit plus comme un signe mais comme un
    macron posé sur le y.

    ⭐ LA CAUSE EST DANS `eq_mots`, QUI EST GELÉ : il fait `arrange(RIGHT)`, et
    `arrange` aligne les CENTRES DE BOÎTE. Le jeton « − y » descend sous la ligne de
    base (la jambe du y) et « − 5 » n'y descend pas : centrer les deux boîtes soulève
    la première tout entière. ⭐⭐ Le contre-exemple le prouve et ferme le diagnostic :
    dans « x − 4y + z − 9 = 0 » l'écart tombe à 6 px, parce que le « 4 » remonte AUSSI
    le haut de la boîte. Le défaut n'existe donc que pour un coefficient **unité**
    devant une lettre à descendante — c'est-à-dire exactement « − y », le jeton dont ce
    short a besoin.

    ⭐ LA MESURE, plutôt qu'un décalage deviné : on rend chaque jeton SUIVI d'une cale
    « 0g » dans un seul `Text`, donc sur une seule ligne de base. La boîte de cette
    sonde a les mêmes extrêmes pour tous les jetons (la capitale du zéro, la
    descendante du g), donc son centre est à un écart FIXE de la ligne de base. L'écart
    entre le centre du jeton et celui de sa sonde est ce qu'il faut lui rendre.
    Relevé à 28 px : « 2x » +0,043 · « − y » **−0,044** · « + 3z » +0,040 ·
    « − 5 » +0,038 · « = » +0,021 · « 0 » +0,040. Le seul négatif est le coupable, et
    l'écart « − y » / « − 5 » vaut 0,081 — les 21 px mesurés à l'image.

    ⛔ La correction vit ICI et pas dans le socle : `espace_commun_short.py` est gelé,
    un rendu le lit à l'import, et le toucher changerait ce qu'une autre session rend.
    """
    for j, mob in zip(jetons, g):
        sonde = e.t(j + "0g", fs, larg=None)
        n = len([c for c in j if not c.isspace()])
        if len(sonde) != n + 2:        # ⛔ l'indexage des glyphes n'est pas celui qu'on croit
            continue                   #    → on ne bouge rien plutôt que de bouger au hasard
        ecart = float(VGroup(*sonde[:n]).get_center()[1] - sonde.get_center()[1])
        mob.shift(UP * ecart)
    return g


def pieces(e):
    """BÂTIT et POSITIONNE les six écrans, sans rien jouer."""
    p = {}
    # ⚠️ 36 px : « Vecteur normal » fait 4,11 à 38 px pour 3,90 offerts.
    titre, badge = e.entete_blocs("Vecteur normal", fs=36)

    # ── 00 : tu l'as déjà ───────────────────────────────────────────────────
    a1 = e.blocs_phrase("Tu as l'équation d'un plan ?", 1.85, 26)
    # ⛔ « Alors » : sans lui, l'écran enchaînait « Tu as l'équation d'un plan ? » sur
    # « tu as déjà son vecteur normal » — une minuscule après un point d'interrogation.
    # La voix dit « Alors tu as déjà… » : le mot manquait à l'écran, pas à l'oreille.
    a2 = e.blocs_phrase("Alors tu as déjà son vecteur normal", 0.70, 26, C_REGARD)
    # ⛔ `larg=3,60` : la borne d'un bloc encadré que `insister` fait battre de 5 % est
    # 2 × 2,115 / 1,05 − 0,28 = 3,75.
    a3 = e.blocs_phrase("sans aucun calcul", -1.10, 36, VERT_OK, larg=3.60)
    cadre3 = SurroundingRectangle(a3, color=VERT_OK, buff=0.16, stroke_width=3)
    p["00-accroche"] = [("titre", titre), ("badge", badge), ("l'équation", a1),
                        ("déjà la normale", a2), ("sans calcul", VGroup(a3, cadre3))]

    # ── 01 : les coefficients TOMBENT de l'équation ─────────────────────────
    # ⛔⛔ L'ORDRE DE CET ÉCRAN EST CELUI DE LA VOIX, ET IL A FALLU LE REFAIRE. Le
    # premier jet posait l'équation en haut et la règle dessous : l'équation était donc
    # ancrée à « 2 x moins y plus 3 z… » (offset 96) et la règle à « avec leurs signes »
    # (offset 78), c'est-à-dire EN ARRIÈRE. `BORDS=1` ne voit pas ça ; le dry run l'a
    # crié — `RETARD 01-idee pos 78 : 6,53 s`. La règle vient d'abord, puisque la voix
    # la dit d'abord.
    ph0 = e.blocs_phrase("les coordonnées d'un vecteur normal", 2.10, 22)
    ph1 = e.blocs_phrase("avec leurs signes", 1.45, 24, C_REGARD)
    eq = equation(e, EQ1, 30)
    e.pose(eq, 0.75)
    # ⭐ La cible de la chute : le triplet de la normale, encadré en vert.
    nvec = VGroup(e.vec("n", 32, VERT_OK), trip0(e, N1, 32, VERT_OK, par=True)
                  ).arrange(RIGHT, buff=0.20)
    e.pose(nvec, -0.45)
    cadre_n = SurroundingRectangle(nvec, color=VERT_OK, buff=0.14, stroke_width=3)
    # ⛔⛔ LA PHRASE AVAIT PERDU SA TÊTE, ET SEUL LE GROS PLAN DU 26/11 L'A VU. L'écran
    # affichait « Le terme constant, lui, n'en fait pas partie » puis, en gris, « pas
    # comment il est orienté » : la queue d'une phrase dont le milieu n'est jamais
    # écrit. La voix, elle, dit tout — « … n'en fait pas partie : IL DIT SEULEMENT OÙ
    # LE PLAN SE PLACE, pas comment il est orienté ». Lu seul, l'écran était du
    # charabia. On écrit la clause entière, mot pour mot.
    # ⚠️ Elle fait TROIS lignes à 22 px (1,033 de haut) là où il y en avait deux
    # (0,664), et il a fallu remonter les deux blocs : mesuré, « la normale » finit à
    # −0,793 et la boîte de Ti-Margo commence à −2,92. À −1,49 et −2,30, le premier
    # bloc laisse 0,35 au-dessus de lui et le second garde les 0,108 de garde que
    # l'ancienne mise en page avait sous elle.
    ph2 = e.blocs_phrase("Le terme constant, lui, n'en fait pas partie", -1.37, 22,
                         C_PIEGE)
    ph3 = e.blocs_phrase("il dit seulement où le plan se place, "
                         "pas comment il est orienté", -2.30, 22, GREY_A)
    p["01-idee"] = [("titre", titre), ("badge", badge), ("les coordonnées", ph0),
                    ("les signes", ph1), ("équation", eq),
                    ("la normale", VGroup(nvec, cadre_n)),
                    ("le terme constant", ph2), ("orienté", ph3)]

    # ── 02 / 02b : la question-pause ────────────────────────────────────────
    fsq, fsc = 26, 26
    eqq = equation(e, EQQ, fsq)
    # ⛔ « Un vecteur normal au plan » NE TIENT PAS SUR UNE LIGNE : 4,89 d'unité à 26 px
    # pour 3,90 offerts. Posé tel quel dans la question, c'est le GROUPE entier qui est
    # réduit — l'équation, qui tenait pourtant largement, tombait à **20,7 px obtenus**.
    # ⭐ C'est le piège le plus discret de ce cadre : une seule ligne trop large rapetisse
    # tout ce qui est à côté d'elle. On coupe donc la phrase AVANT, par `lignes()`, qui
    # mesure.
    q_lignes = [*e.lignes("Un vecteur normal au plan", fsq)[0], eqq]
    # ⛔⛔ LES COEFFICIENTS NE SONT PAS COLORÉS PENDANT LA PAUSE. Les colorer, c'est
    # donner la réponse : toute la question est de savoir LESQUELS on lit et avec quels
    # signes. Ils ne se soulignent qu'en 02b.
    # ⚠️ LA BONNE RÉPONSE EST LA PLUS LONGUE D'UN GLYPHE, ET ON NE TOUCHE PAS. Mesuré à
    # l'écran : « (3 ; 1 ; 2) » et « (0 ; 0 ; 4) » font 11 caractères, « (3 ; −1 ; 2) »
    # en fait 12. L'écart est le SIGNE MOINS — c'est-à-dire exactement ce que ce short
    # enseigne, et ce que le leurre A a perdu. Le retirer supprimerait la leçon pour un
    # caractère. C'est la décision déjà prise sur l'épisode 3 de la série, et pour la
    # même raison.
    choix = [trip0(e, t, fsc, par=True) for t in (LEURRE_A, NQ, LEURRE_C)]
    tete, q, cartes, pause, rebours = e.q_tete(q_lignes, choix, fs_q=fsq, fs_c=fsc)
    p["02-question"] = [("titre", titre), ("badge", badge), ("tête", tete),
                        ("rebours", rebours), ("question", q), ("cartes", cartes),
                        ("pause", pause)]

    bas = float(cartes.get_bottom()[1])
    # ⚠️ « avec leurs signes » va AU-DESSUS de l'équation, dans la place que les deux
    # lignes de question libèrent — et non dessous : sous l'équation il ne reste que
    # 0,44 avant les cartes.
    lus = e.blocs_phrase("avec leurs signes", float(eqq.get_top()[1]) + 0.50, 24, VERT_OK)
    # ⚠️ « A : le signe moins perdu » et non « a perdu le signe moins » : à 22 px la
    # seconde fait 3,95 pour 3,90 offerts et passe sur DEUX lignes, à 0,05 de la
    # correction suivante. C'est d'ailleurs la formule du découpage.
    la = e.blocs_phrase("A : le signe moins perdu", bas - 0.40, 22, C_PIEGE)
    # ⚠️ « C : le terme constant » et non « a pris le terme constant » : à 22 px la
    # phrase entière fait 4,0 et passe sur deux lignes, et il n'y a que 1,20 sous les
    # cartes pour DEUX corrections.
    # ⚠️ 0,86 et non 0,90 : réaligner les jetons de l'équation sur leur ligne de base
    # (voir `_aligner_lignes_de_base`) change sa boîte de quelques centièmes, et
    # `q_tete` descend les cartes d'autant. À 0,90 le bas de cette correction tombait à
    # −2,876 pour une boîte de Ti-Margo qui monte à −2,92 : six millièmes sous le seuil
    # de la mesure. ⭐ Un correctif de typographie déplace la page entière — c'est la
    # mesure de la série qui l'a rattrapé, pas la relecture.
    lc = e.blocs_phrase("C : le terme constant", bas - 0.86, 22, C_PIEGE)
    # ⛔ Le bloc enregistré ici est l'ÉQUATION SEULE, pas le groupe de question : sur cet
    # écran les deux lignes de texte sont effacées, et mesurer le groupe entier ferait
    # croire à un chevauchement de 0,32 avec une ligne qui n'est plus là.
    p["02b-reponse"] = [("titre", titre), ("badge", badge), ("équation", eqq),
                        ("cartes", cartes), ("les signes", lus),
                        ("leurre A", la), ("leurre C", lc)]

    # ── 03 : la question en commentaire ─────────────────────────────────────
    et = e.pose(e.t("À toi !", 38, JAUNE_TITRE, larg=None), 3.50)
    # ⛔ L'ORDRE EST CELUI DE LA VOIX : elle dit « Quel est un vecteur normal au plan
    # d'équation x moins 4 y… », donc la QUESTION d'abord et l'équation ensuite. Le
    # premier jet montrait l'équation puis la question, et `verifier-avant-rendu.py` l'a
    # dit en une ligne : la seconde ancre revenait **5,05 s en arrière**.
    dq = e.pose(VGroup(*e.lignes("Un vecteur normal au plan", 28)[0]
                       ).arrange(DOWN, buff=0.12), 1.95)
    eqd = equation(e, EQD, 28, C_REGARD)
    e.pose(eqd, 0.85)
    appel = e.appel_blocs(-1.00)
    p["03-commentaire"] = [("à toi", et), ("question", dq), ("équation", eqd),
                           ("appel", appel)]
    return p


class PsEspacePlanNormalShort(ShortEspace):
    fichier_marques = "ps_espace_plan_normal_short_marques.json"
    nom_voix = "terminale-ps-espace-plan-normal-short"

    def construct(self):
        p = self.par_nom(pieces(self))
        titre, badge = p["00-accroche"]["titre"], p["00-accroche"]["badge"]

        # ── 00 : l'accroche ─────────────────────────────────────────────────
        self.margo_bas()
        self.add(titre, badge)
        self.dire("00-accroche")
        a = p["00-accroche"]
        self.jouer_phrase(a["l'équation"], "Tu as l'équation d'un plan ?")
        self.jouer_phrase(a["déjà la normale"], "Alors tu as déjà son vecteur normal")
        self.au_mot("sans aucun calcul")
        self.play(FadeIn(a["sans calcul"][0], scale=1.2),
                  Create(a["sans calcul"][1]), run_time=0.45)
        self.insister(a["sans calcul"], 1.05)
        self.attendre_voix(marge=0.25)

        # ── 01 : la chute des coefficients ──────────────────────────────────
        self.dire("01-idee")
        i = p["01-idee"]
        self.play(FadeOut(VGroup(a["l'équation"], a["déjà la normale"],
                                 a["sans calcul"])), run_time=0.25)
        eq = i["équation"]
        self.jouer_phrase(i["les coordonnées"], "les coordonnées d'un vecteur normal")
        self.jouer_phrase(i["les signes"], "avec leurs signes")
        # ⛔⛔ L'ÉQUATION S'ÉCRIT JETON PAR JETON, À MESURE QUE LA VOIX LA DIT. Posée
        # d'un bloc à `au_fin("2 x moins y plus 3 z moins 5 égale zéro")`, elle paraît
        # quand la voix a FINI de la dire : son « 2x » arrive alors **2,96 s** après son
        # propre mot (mesuré au dry run, le plus gros TARD du script). C'est le prix
        # connu de `au_fin` — mais ici on n'a pas à le payer, puisque la voix énonce les
        # jetons l'un après l'autre et qu'`eq_mots` les rend adressables.
        # ⚠️ Les cinq extraits sont uniques dans le clip (« 2 x », « moins y », « plus
        # 3 z », « moins 5 », « égale zéro ») — le garde-fou `_ambigu` du socle le
        # dirait dans le journal sinon.
        for extrait, jeton in (("2 x", eq[0]), ("moins y", eq[1]), ("plus 3 z", eq[2]),
                               ("moins 5", eq[3])):
            self.au_fin(extrait)
            self.play(FadeIn(jeton, shift=UP * 0.06), run_time=0.2)
        # ⚠️ `au_fin` ET NON `au_mot` : il n'y a PAS de marque à l'offset de « égale »
        # (la suivante est 6 caractères plus loin, sur « zéro »), donc `au_mot` prendrait
        # silencieusement la marque d'AVANT et le « = 0 » paraîtrait en avance.
        # `verifier-avant-rendu.py` le dit, et c'est le piège qu'il a été écrit pour
        # attraper. `au_fin` vise la dernière marque DANS l'extrait : celle de « zéro ».
        # ⚠️⚠️ ET IL CONTINUE DE LE SIGNALER APRÈS LE CORRECTIF — c'est un FAUX POSITIF
        # propre à `au_fin`, pas un défaut qui resterait. Son test « y a-t-il une marque
        # à l'offset ? » porte sur le DÉBUT de l'extrait, que `au_fin` n'utilise jamais.
        # Vérifié en recalculant les deux instants plutôt qu'en le croyant : `au_mot`
        # prendrait 10,461 s, `au_fin` prend **11,156 s** (la marque de l'offset 151, la
        # seule dans [145 ; 155[). Et le dry run le confirme de son côté : 0 RETARD, 0
        # AUDIT-AVANCE sur ce clip.
        self.au_fin("égale zéro")
        self.play(FadeIn(VGroup(eq[4], eq[5]), shift=UP * 0.06), run_time=0.2)
        # ⭐⭐ LA CHUTE, ET C'EST LA SEULE ANIMATION QUI PORTE LA LEÇON DE CE SHORT.
        # Les trois nombres du triplet ne paraissent pas : ce sont les coefficients de
        # l'équation qui DESCENDENT à leur place. ⛔ Un `FadeIn` du triplet dirait « voici
        # la normale » ; la chute dit « c'est la MÊME chose, écrite plus bas ».
        # ⚠️ On transforme une COPIE : l'équation doit rester entière à l'écran, puisque
        # l'écran suivant montre que le terme constant, lui, n'est pas descendu.
        nvec, cadre_n = i["la normale"]
        cible = nvec[1].nb
        # ⛔⛔ LES PARENTHÈSES ET LES POINTS-VIRGULES DOIVENT ÊTRE AMENÉS À PART.
        # Vu à la planche : seuls les trois NOMBRES tombent de l'équation, et le reste du
        # triplet n'était jamais ajouté à la scène — l'écran affichait « n⃗  2  −1  3 »,
        # trois nombres alignés sans notation. `ReplacementTransform` ne met en scène que
        # sa cible ; le décor du triplet, lui, n'a pas de source d'où tomber.
        decor = VGroup(*[m for m in nvec[1].get_family()
                         if isinstance(m, Text)
                         and getattr(m, "original_text", "") in ("(", ")", ";")])
        self.au_fin("a donc pour vecteur normal 2, moins 1, 3")
        self.play(*[c.animate.set_color(VERT_OK) for c in eq.coef], run_time=0.3)
        self.play(FadeIn(nvec[0], shift=UP * 0.1), FadeIn(decor),
                  *[ReplacementTransform(eq.coef[k].copy(), cible[k])
                    for k in range(3)], run_time=0.8)
        self.play(Create(cadre_n), run_time=0.3)
        # ⭐ Le terme constant reste EN HAUT, et il devient rouge AVEC la phrase qui le
        # nomme — pas dans un `play` à part. ⛔ Mesuré : glissé entre les deux, ce `play`
        # de 0,30 s coûtait son temps au budget du clip et la phrase suivante arrivait
        # en retard sur son propre mot (`RETARD 01-idee pos 198 : 0,46 s`). C'est
        # exactement ce que l'argument `avec=` de `jouer_phrase` existe pour éviter.
        self.jouer_phrase(i["le terme constant"],
                          "Le terme constant, lui, n'en fait pas partie",
                          avec=[eq.cte.animate.set_color(C_PIEGE)])
        self.jouer_phrase(i["orienté"],
                          "il dit seulement où le plan se place, "
                          "pas comment il est orienté")
        self.attendre_voix(marge=0.3)

        # ── 02 : la question-pause ──────────────────────────────────────────
        self.dire("02-question")
        t0 = self.renderer.time
        qq = p["02-question"]
        self.play(FadeOut(VGroup(eq, i["les coordonnées"], i["les signes"], i["la normale"],
                                 i["le terme constant"], i["orienté"])), run_time=0.3)
        self.au_mot("Question")
        self.play(FadeIn(qq["tête"], shift=DOWN * 0.12), run_time=0.3)
        # ⛔⛔ `question[1]` N'EST PAS L'ÉQUATION. « Un vecteur normal au plan » ne tient
        # pas sur une ligne, donc `lignes()` en rend DEUX, et le groupe de question a
        # trois enfants : deux lignes de texte puis l'équation. Le premier jet montrait
        # `[0]` puis `[1]` — c'est-à-dire la deuxième ligne de texte à la place de
        # l'équation, et **l'équation n'était jamais affichée** sur l'écran de question.
        # ⭐ Vu à la planche, et par rien d'autre : un bloc jamais joué garde une boîte
        # parfaitement valide pour la mesure (défaut « cinq morceaux construits, quatre
        # joués » de l'épisode 8). On prend donc par le BOUT, jamais par l'index.
        self.au_mot("Quel est un vecteur normal")
        self.play(FadeIn(VGroup(*qq["question"][:-1]), shift=UP * 0.08), run_time=0.35)
        # ⭐ JETON PAR JETON ICI AUSSI, et pour la même raison qu'à l'écran 01 : posée
        # d'un bloc, l'équation paraît quand la voix a fini de la dire, et son « 3x »
        # arrive **2,94 s** après son propre mot. Les cinq extraits sont uniques dans ce
        # clip, qui pourtant répète « 3 » et « 2 » dans les cartes — vérifié par
        # `--ancres`, et le garde-fou `_ambigu` du socle crierait sinon.
        eqq_j = qq["question"][-1]
        for extrait, jeton in (("3 x", eqq_j[0]), ("moins y", eqq_j[1]),
                               ("plus 2 z", eqq_j[2]), ("plus 4", eqq_j[3])):
            self.au_fin(extrait)
            self.play(FadeIn(jeton, shift=UP * 0.06), run_time=0.2)
        self.au_fin("égale zéro")
        self.play(FadeIn(VGroup(eqq_j[4], eqq_j[5]), shift=UP * 0.06), run_time=0.2)
        self.q_montrer_choix(qq["cartes"])
        self.q_pause(qq["pause"], qq["rebours"], "02-question", t0, BONNE)

        # ── 02b : la réponse ────────────────────────────────────────────────
        self.dire("02b-reponse")
        r = p["02b-reponse"]
        cartes = qq["cartes"]
        eqq = qq["question"][-1]
        ok = self.q_reponse(cartes, BONNE, qq["pause"], qq["rebours"])
        # ⛔ On efface TOUTES les lignes de texte de la question (il y en a deux),
        # pas seulement la première — sinon « au plan » reste sous « avec leurs
        # signes » et les deux se superposent. Vu à la planche.
        self.play(FadeOut(qq["tête"]),
                  FadeOut(VGroup(*qq["question"][:-1])), run_time=0.25)
        # ⭐ LES TROIS COEFFICIENTS SE RE-SOULIGNENT, AVEC LEURS SIGNES — et c'est
        # maintenant seulement, parce que les colorer pendant la pause aurait donné la
        # réponse.
        self.au_fin("les trois coefficients avec leurs signes : 3, moins 1 et 2")
        self.play(*[c.animate.set_color(VERT_OK) for c in eqq.coef], run_time=0.4)
        self.play(FadeIn(r["les signes"], shift=UP * 0.06), run_time=0.3)
        self.au_mot("a perdu le signe moins")
        self.play(FadeIn(r["leurre A"], shift=UP * 0.06),
                  Indicate(cartes[0], color=C_PIEGE, scale_factor=1.04), run_time=0.4)
        self.au_mot("a pris le terme constant")
        self.play(FadeIn(r["leurre C"], shift=UP * 0.06),
                  Indicate(cartes[2], color=C_PIEGE, scale_factor=1.04), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 03 : la question en commentaire ─────────────────────────────────
        self.dire("03-commentaire")
        c = p["03-commentaire"]
        self.play(FadeOut(VGroup(cartes, eqq, r["les signes"], r["leurre A"],
                                 r["leurre C"], ok, titre, badge)), run_time=0.3)
        self.au_mot("À toi")
        self.play(FadeIn(c["à toi"], shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Quel est un vecteur normal")
        self.play(FadeIn(c["question"], shift=UP * 0.08), run_time=0.35)
        self.au_fin("x moins 4 y plus z moins 9 égale zéro")
        self.play(FadeIn(c["équation"], shift=UP * 0.08), run_time=0.4)
        self.jouer_appel(c["appel"])
        self.attendre_voix(marge=0.5)

        # ── 04 : la fin ─────────────────────────────────────────────────────
        self.fin_short("04-abonne", [c["à toi"], c["question"], c["équation"],
                                     c["appel"]])
