# espace_position_relative.py
# EleveAI — Maths Tle spé — paysage « Positions relatives dans l'espace » (16:9),
# ceinture VERTE. Micro du coach : espace_position_relative (notion geometrie_espace).
# Épisode 5 sur 12. Centre : transports (liste fermée lib/videos/centres-interet.ts,
# tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde      : titre, « jamais se rencontrer » / « sans être parallèles » ;
#   · 01-situation  : la route qui passe sous le pont — deux tracés non coplanaires ;
#   · 02-idee       : droite et plan, la méthode mécanique → 2t = 0, un seul point ;
#   · 03-theoreme   : trois cas, et trois seulement ;
#   · 04/04b        : question-pause n° 1 (on obtient 3 = 0 → réponse A, parallèle) ;
#   · 05-appliquer  : deux plans, P et P′ = 2P → strictement parallèles ;
#   · 06-piege      : deux droites — pas de point commun ≠ parallèles ;
#   · 07/07b        : question-pause n° 2 (aucun point commun + directeurs non
#                     colinéaires → réponse C, non coplanaires) ;
#   · 08-rediger    : la méthode annoncée, et le mot exact ;
#   · 09/09b        : le défi — d (t ; 1+t ; 2−t) et P : x + y + 2z + 1 = 0 ;
#   · 10-finale     : « Ce que tu as appris » ;
#   · 11-abonne     : eleveai.fr + « Abonne-toi ! ».
#
# ⭐ Le socle d'écran est dans manim/poste2/espace_ecrans.py. DEUX outils y ont été
#   corrigés POUR cet épisode, et la correction est là-bas, pas ici :
#     · `q_tete(..., largeur, xl)` — mesuré hors rendu : une carte de 4,1 posée à
#       x = 2,2 n'offre que 2,20 à son texte, et un choix de QUATRE lignes y tombe à
#       14,6 px quelle que soit la police demandée. La voix de cet épisode dit « la
#       droite est parallèle au plan, sans aucun point commun » : 56 caractères qu'on
#       ne raccourcit pas. Avec `largeur=6.0, xl=0.6`, les trois choix tiennent à
#       26 px SANS aucune réduction — le plus lisible des cinq épisodes ;
#     · `fr(v)` — `str(2.5)` écrivait « 2.5 », avec un POINT, et cet épisode est le
#       premier de la série à afficher un décimal (« x + y + z + 2,5 = 0 »).
#   Les figures sont dans manim/poste2/espace3d.py. ⛔ Une correction d'outil se fait
#   LÀ-BAS, jamais recopiée dans un épisode.
# ⚠️ Couleurs : C_DROITE (ambre-orangé) = la première droite, C_VECTEUR2 (rose) = la
#   seconde, C_PLAN = un plan. La fiche de voix annonçait « bleu = la droite » ; la
#   convention de la BOÎTE (une couleur par rôle du 1ᵉʳ au 12ᵉ épisode, cf. l'en-tête de
#   espace3d.py) l'emporte, parce que l'épisode 3 a déjà montré une droite en orangé.
# ⛔ Les pièges de la série : manim/REPRISE-espace-terminale.md — en particulier
#   « Ce que l'épisode 3 a appris » et « Ce que l'épisode 4 a confirmé ». Et les 43 de
#   manim/REPRISE-entiers-cm1-6e.md.
# ⚠️ Bonne réponse : 04 → A, 07 → C (tirage graine 2211, table dans VOIX-espace-terminale.md).
#
# Voix : manim/voix/terminale-espace-position-relative.json (débit −6, Julie).
# Audit : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -qh \
#   --disable_caching manim/scripts/terminale/espace_position_relative.py \
#   EspacePositionRelativeTerminale \
#   --media_dir manim/scripts/terminale/media-espace-position --dry_run

import sys
from pathlib import Path

# ⚠️ DEUX chemins : manim/poste2/ pour le socle et les figures, manim/ pour la charte.
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "poste2"))
sys.path.insert(1, str(Path(__file__).resolve().parents[2]))

from manim import *  # noqa: E402,F403

from espace3d import (C_AXE, C_DROITE, C_PIEGE, C_PLAN, C_REGARD,  # noqa: E402
                      C_VECTEUR2, plan_dessine, platitude)
from charte import *  # noqa: E402,F401,F403
from espace_ecrans import (P, EcransEspace, equation_plan, ligne_param,  # noqa: E402
                           pastille_pause)

# ── les objets dits par la voix, revérifiés ICI, à l'exécution ─────────────
# 02 : la droite d et le plan P de l'écran « idée »
A02, U02 = (1, 0, -1), (1, 2, 1)              # d : x = 1 + t, y = 2t, z = −1 + t
P02 = (1, 1, -1, -2)                           # P : x + y − z − 2 = 0
# 05 : les deux plans
P05, Q05 = (1, 1, 1, -1), (2, 2, 2, 5)         # P : …− 1 = 0   P′ : 2x + 2y + 2z + 5 = 0
Q05D = (1, 1, 1, 2.5)                          # P′ divisé par 2
# 06 : les deux droites non coplanaires (la route et le pont, en coordonnées)
A06, U06 = (0, 0.7, 0), (1, 0, 0)              # la route : au sol, PARALLÈLE à l'axe des x
B06, V06 = (1.4, 0, 1.5), (0, 1, 0)            # le pont : au-dessus, en profondeur
# 09 : le défi
A09, U09 = (0, 1, 2), (1, 1, -1)               # d : x = t, y = 1 + t, z = 2 − t
P09 = (1, 1, 2, 1)                             # P : x + y + 2z + 1 = 0


def vaut(plan, m):
    """a x + b y + c z + d, évalué au point m : ZÉRO si et seulement si m est dans le plan."""
    return plan[0] * m[0] + plan[1] * m[1] + plan[2] * m[2] + plan[3]


def apres_subst(plan, a, u):
    """Ce que devient a x + b y + c z + d quand on y remplace la droite (a, u) :
    rend (constante, coefficient de t). ⭐ C'est TOUTE la leçon de l'épisode en deux
    nombres : le coefficient de t décide des trois cas."""
    return (vaut(plan, a),
            plan[0] * u[0] + plan[1] * u[1] + plan[2] * u[2])


# 02 : il reste 2t = 0, donc t = 0, et le point commun est (1 ; 0 ; −1)
assert apres_subst(P02, A02, U02) == (0, 2)
assert vaut(P02, A02) == 0                     # t = 0 donne bien A02 lui-même
# 05 : P′ est 2 × P sur les coefficients, mais PAS sur le terme constant
assert Q05[:3] == tuple(2 * c for c in P05[:3])
assert Q05D == (P05[0], P05[1], P05[2], Q05[3] / 2)
assert Q05D[3] != P05[3]                       # 2,5 ≠ −1 : les plans ne sont pas confondus
# 06 : les deux droites n'ont aucun point commun et leurs directeurs ne sont pas colinéaires
assert U06 != V06 and all(U06[i] * V06[j] == U06[j] * V06[i]
                          for i in range(3) for j in range(3)) is False
# ⭐⭐ 09b, LE CŒUR DE LA CORRECTION, et le seul endroit où un signe peut tout casser :
# les t s'éliminent (coefficient NUL), et les constantes font 6.
assert apres_subst(P09, A09, U09) == (6, 0)
# et le détail que la voix énumère : 1 + 4 + 1 = 6, c'est-à-dire 0 + 1 + 2×2 + 1
assert A09[0] + A09[1] + 2 * A09[2] + P09[3] == 6
assert U09[0] + U09[1] + 2 * U09[2] == 0       # t + t − 2t = 0
# les écritures, telles qu'elles seront à l'écran
assert equation_plan(*P02) == "x + y − z − 2 = 0"
assert equation_plan(*P09) == "x + y + 2z + 1 = 0"
assert equation_plan(*Q05D) == "x + y + z + 2,5 = 0"       # ⛔ une VIRGULE, pas un point
assert [ligne_param(n, A09[i], U09[i]) for i, n in enumerate("xyz")] == \
    ["x = t", "y = 1 + t", "z = 2 − t"]

# ⛔⛔ VU SEULEMENT À L'IMAGE, PUIS MESURÉ : DEUX DES PLANS DE CET ÉPISODE NE PEUVENT
# PAS ÊTRE PROJETÉS. `platitude(n)` (dans espace3d.py) donne l'angle entre la normale
# du plan et la direction que la cavalière écrase. Sous ~12°, le morceau se dessine
# comme une lame ; à 0°, comme un trait. Ici :
#   · 02 (1 ; 1 ; −1) → 26,9° : un vrai morceau de plan, on le projette ✅
#   · 06 (0 ; 0 ; 1)  → 14,9° : le sol, on le projette ✅
#   · 05 (1 ; 1 ; 1) et (2 ; 2 ; 2) → 9,0° : deux LAMES de 0,13 d'épaisseur ⛔
#   · 09 (1 ; 1 ; 2)  → 0,4° : un TRAIT de 0,01 ⛔⛔
# ⭐ Les deux derniers passent donc par `plan_dessine` : un parallélogramme à plat,
# hors repère, comme dans un manuel. ⛔ Et l'assertion ci-dessous est là pour que la
# prochaine session ne « répare » pas ça en remettant r.plan().
assert platitude(P02[:3]) > 12 and platitude((0, 0, 1)) > 12
assert platitude(P05[:3]) < 12 and platitude(P09[:3]) < 2


def route_et_pont(s=1.0):
    """LA ROUTE QUI PASSE SOUS LE PONT, en cavalière — la figure de tout l'épisode.

    ⭐ Deux rubans : la ROUTE s'enfonce (direction y, elle monte vers la droite comme
    toute fuite), le PONT la coupe à l'HORIZONTALE (direction x) et passe au-dessus.
    Vus d'en haut ils se croisent ; dans l'espace ils ne se touchent jamais et ne sont
    pas parallèles. C'est exactement « non coplanaires », et c'est la seule image de
    l'épisode qu'un élève retient.
    ⛔ Dessinée, jamais un emoji : le glyphe 🌉 ne se rend pas (carré « tofu », piège
    n° 2 de l'épisode 1).

    ⛔⛔ LA PREMIÈRE VERSION AVAIT LES DEUX RÔLES INVERSÉS, ET ÇA NE S'EST VU QU'AU
    GROS PLAN (recadrage ×3 — la leçon neuve de l'épisode 4). Le tablier filait en
    PROFONDEUR : comme toute direction de fuite se projette à 35° vers le haut, le
    pont montait en pente et on lisait une RAMPE DE SKATE, pas un pont. Et la route,
    posée en largeur, se réduisait à un trait. ⭐ La règle qu'il faut retenir : dans
    cette cavalière, ce qui doit paraître HORIZONTAL se dessine selon x, et ce qui
    doit paraître S'ÉLOIGNER se dessine selon y. Un pont est horizontal, une route
    s'éloigne.

    ⚠️ L'ordre d'empilement EST l'information : la route d'abord, les piles ensuite, le
    tablier du pont en DERNIER — c'est lui qui doit masquer la route au croisement. Posé
    avant, on lit deux rubans qui se coupent, c'est-à-dire le contraire de la leçon.
    ⚠️ Et les piles sont à x = ±1,45, donc HORS de la chaussée (x de −0,55 à 0,55) :
    mesuré, le pied d'une pile se projette en x ≈ −1,32 quand le bord de la route, à la
    même profondeur, est à −0,43. Dans la première version elles étaient plantées DANS
    la route, ce qui disait que les deux tracés se touchent.

    ⛔⛔ TROISIÈME VERSION, ET LE DÉFAUT ÉTAIT LE PLUS GRAVE DES TROIS : à la deuxième,
    LA ROUTE NE PASSAIT PAS SOUS LE PONT. Le tablier était à z = 1,3 (projeté à
    y ≈ 1,06 ; 1,29) et la route s'arrêtait à y = 2,6 (projetée à 0,75) : les deux
    rubans ne se chevauchaient NULLE PART à l'image, alors que « vue d'en haut, les
    deux tracés se croisent » est la phrase que l'écran doit montrer. Mesuré et
    corrigé : tablier à z = 0,58 (bande 0,65–0,88), route allongée jusqu'à y = 3,6
    (jusqu'à 1,03) — elle entre sous le tablier, disparaît derrière lui, et RESSORT
    de l'autre côté. ⚠️ Et c'est l'ordre d'empilement qui fait l'occultation : le
    tablier est posé en dernier."""
    f = (0.41, 0.287)            # la fuite de la maison (35°), comme espace3d.FUITE à u = 1

    def c(x, y, z):
        return P(x + y * f[0], z + y * f[1])

    route = Polygon(c(-0.55, -1.4, 0), c(0.55, -1.4, 0), c(0.55, 3.6, 0), c(-0.55, 3.6, 0),
                    fill_color="#334155", fill_opacity=1, stroke_color=C_AXE, stroke_width=2)
    piles = VGroup(*[Line(c(x, y, 0), c(x, y, 0.58), stroke_width=9, color="#94a3b8")
                     for x, y in ((-1.45, 0.32), (1.45, 0.32), (-1.45, 0.98), (1.45, 0.98))])
    tablier = Polygon(c(-1.9, 0.25, 0.58), c(1.9, 0.25, 0.58), c(1.9, 1.05, 0.58),
                      c(-1.9, 1.05, 0.58), fill_color="#475569", fill_opacity=1,
                      stroke_color=C_AXE, stroke_width=2)
    # la tranche du tablier, côté spectateur : sans elle le pont est une feuille de papier
    tranche = Polygon(c(-1.9, 0.25, 0.58), c(1.9, 0.25, 0.58), c(1.9, 0.25, 0.47),
                      c(-1.9, 0.25, 0.47), fill_color="#1e293b", fill_opacity=1,
                      stroke_color=C_AXE, stroke_width=2)
    # les deux TRACÉS : l'axe de la route, l'axe du pont. Ce sont eux, les deux droites.
    axe_route = Line(c(0, -1.45, 0.01), c(0, 3.65, 0.01), stroke_width=6, color=C_DROITE)
    axe_pont = Line(c(-2.1, 0.65, 0.59), c(2.1, 0.65, 0.59), stroke_width=6, color=C_VECTEUR2)
    return VGroup(route, axe_route, piles, tranche, tablier, axe_pont).scale(s)


class EspacePositionRelativeBase(EcransEspace):
    fichier_marques = "espace_position_relative_marques.json"
    nom_voix = "terminale-espace-position-relative"

    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = self.echelle().align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Positions relatives", 50, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Positions relatives")
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        # ⚠️ MESURÉ hors rendu : « ne jamais se rencontrer » fait 6,34 à 38, donc avec sa
        # pastille le bloc fait 6,8 — centré, il s'arrête à x = 3,4, à l'écart de
        # Ti-Margo dont la boîte commence à 4,87 quand il est à scale 0,8.
        fs = 38
        promesses = (("ne jamais se rencontrer", C_DROITE, "ne jamais se rencontrer"),
                     ("sans être parallèles", C_PIEGE, "sans être parallèles"))
        lignes = VGroup()
        for txt, coul, _ in promesses:
            lignes.add(VGroup(Dot(radius=0.08, color=coul), self.t(txt, fs, coul))
                       .arrange(RIGHT, buff=0.26))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        lignes.move_to(P(0, 0.95))
        for b, (_, _, extrait) in zip(lignes, promesses):
            self.au_mot(extrait)
            self.play(FadeIn(b, shift=RIGHT * 0.15), run_time=0.5)
        # ⛔⛔ VU À L'IMAGE, et c'est le défaut n° 3 de l'épisode 1 REFAIT : posé à
        # y = −1,55, ce bloc de DEUX lignes descend à −1,95 et les ceintures s'écrivent
        # PAR-DESSUS. La note disait « la bande libre est y ≈ −2,0 » — c'était vrai pour
        # UNE ligne (l'épisode 4 en pose une à −1,6). Pour deux, il faut remonter à
        # −1,15, et c'est l'échelle qu'il faut mesurer, pas la phrase.
        fin = VGroup(self.t("et à cela, le plan", 32, VERT_OK),
                     self.t("ne nous avait pas préparés", 32, VERT_OK))
        fin.arrange(DOWN, buff=0.12).move_to(P(-0.9, -1.15))
        self.au_mot("le plan ne nous avait pas préparés")
        self.play(FadeIn(fin, shift=UP * 0.12), run_time=0.7)
        self.attendre_voix(marge=0.8)

    # ── 01 : la route et le pont ───────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("une route qui passe sous un pont")
        pont = route_et_pont(1.25).move_to(P(-3.6, 0.95))
        self.play(FadeIn(pont, shift=UP * 0.2), run_time=0.8)
        fs = 28
        self.au_mot("Vue d'en haut")
        vue = self.col(VGroup(self.t("vue d'en haut :", fs, C_REGARD),
                              self.t("les deux tracés se croisent", fs, C_REGARD))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 2.50)
        self.play(FadeIn(vue, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("ils ne se rencontrent jamais")
        jam = self.col(VGroup(self.t("dans l'espace :", fs, WHITE),
                              self.t("ils ne se rencontrent jamais", fs, WHITE))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 1.55)
        self.play(FadeIn(jam, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("ils ne sont pas parallèles non plus")
        par = self.col(VGroup(self.t("et pas parallèles", fs, C_PIEGE),
                              self.t("non plus", fs, C_PIEGE))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.60)
        self.play(FadeIn(par, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("cette situation n'existe pas")
        plan2 = self.col(VGroup(self.croix(r=0.13),
                                VGroup(self.t("dans le plan,", fs, GREY_A),
                                       self.t("cela n'existe pas", fs, GREY_A))
                                .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                         .arrange(RIGHT, buff=0.22), -0.45)
        self.play(FadeIn(plan2, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("c'est la plus fréquente")
        freq = self.col(VGroup(self.coche(VERT_OK, 0.15),
                               VGroup(self.t("dans l'espace,", fs, VERT_OK),
                                      self.t("c'est la plus fréquente", fs, VERT_OK))
                               .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                        .arrange(RIGHT, buff=0.22), -1.50)
        self.play(FadeIn(freq, shift=RIGHT * 0.12), run_time=0.6)
        # ⭐ La CONCLUSION va à GAUCHE, sous la figure, en grand : le bas de la colonne
        # de droite est réservé aux lignes courtes (défaut n° 4 de l'épisode 3).
        self.au_mot("ne sont pas coplanaires")
        nc = self.gauche(self.t("non coplanaires", 40, C_PIEGE), -2.00, xmax=1.6)
        cad = SurroundingRectangle(nc, color=C_PIEGE, buff=0.16, stroke_width=3)
        # ⛔ On pose le GROUPE texte + cadre : gauche() borne le TEXTE, pas le cadre
        # (défaut neuf de l'épisode 4, et il frappe des deux côtés).
        self.gauche(VGroup(nc, cad), -2.00, xmax=1.6)
        self.play(FadeIn(nc, scale=1.12), Create(cad), run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 02 : droite et plan, la méthode mécanique ──────────────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        self.au_mot("Commençons par une droite et un plan")
        # ⚠️ Titre COURT exprès : « Droite et plan » fait 4,0 de large, donc x ∈ [−2,0 ;
        # 2,0]. Un titre long (7,2) descendrait à y = 3,1 par-dessus le haut de la
        # colonne de droite, qui commence à x = 2,2.
        titre = self.t("Droite et plan", 48, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        self.au_mot("purement mécanique")
        meca = self.gauche(self.t("purement mécanique", 30, C_REGARD), 2.45, xmax=1.6)
        self.play(FadeIn(meca, shift=RIGHT * 0.1), run_time=0.45)

        # ⚠️ Repère MESURÉ : le point commun est (1 ; 0 ; −1), donc SOUS l'origine. Avec
        # o = (−4,4 ; −0,9), u = 0,45 et un morceau de plan de demi 1,2, le bas de la
        # figure tombe à −2,11 — au-dessus de la conclusion posée à −2,80.
        r, ax = self.repere(o=(-4.4, -0.9), u=0.45, portee=3)
        self.play(Create(ax), run_time=0.4)

        self.au_mot("Prenons la droite d")
        dr = self.sans_audit(r.droite(A02, U02, -0.6, 1.4, nom="d", couleur=C_DROITE, sw=5,
                                      decal=UR))
        syst = self.systeme([ligne_param(n, A02[i], U02[i]) for i, n in enumerate("xyz")],
                            30, c_acc=C_DROITE)
        self.col(syst, 2.05)
        self.play(Create(dr), run_time=0.6)
        # ⭐⭐ au_fin et non au_mot : une ligne qui finit par un nombre se pose à
        # l'instant de CE nombre (35 des 40 AUDIT-AVANCE de l'épisode 3).
        for i, extrait in enumerate(("x égale 1 plus t", "y égale 2 t", "z égale moins 1 plus t")):
            self.au_fin(extrait)
            self.play(FadeIn(syst.eq[i], shift=RIGHT * 0.12),
                      *([Create(syst.acc)] if i == 0 else []), run_time=0.4)

        self.au_fin("x plus y moins z moins 2 égale zéro")
        plan = r.plan(P02[:3], d=P02[3], centre=A02, demi=1.2, couleur=C_PLAN, op=0.24)
        eqP = self.col(VGroup(self.t("P :", 30, C_PLAN),
                              self.eq_plan(*P02, fs=28, color=C_PLAN))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 0.90)
        self.play(FadeIn(plan[0]), FadeIn(eqP, shift=RIGHT * 0.12), run_time=0.8)

        fs = 28
        self.au_mot("Les constantes donnent")
        cst = self.col(self.t("les constantes", fs, GREY_A), 0.05)
        self.play(FadeIn(cst, shift=RIGHT * 0.1), run_time=0.4)
        self.au_fin("1 plus 1 moins 2")
        cst2 = self.col(self.eq_zero("1 + 1 − 2", fs, WHITE), -0.45)
        self.play(FadeIn(cst2, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Les termes en t donnent")
        trm = self.col(self.t("les termes en t", fs, GREY_A), -1.05)
        self.play(FadeIn(trm, shift=RIGHT * 0.1), run_time=0.4)
        self.au_fin("t plus 2 t moins t")
        trm2 = self.col(self.t("t + 2t − t  =  2t", fs, C_REGARD), -1.50)
        self.play(FadeIn(trm2, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("Il reste 2 t égale zéro")
        reste = self.col(self.eq_zero("2t", 34, C_REGARD), -2.15)
        self.play(FadeIn(reste, scale=1.1), run_time=0.5)
        # ⚠️ sans_audit ASSUMÉ : la voix dit « donc t vaut ZÉRO » en lettres, et l'écran
        # écrit « t = 0 », qui est la seule écriture juste d'une valeur de paramètre
        # (même raison qu'à l'écran 00 de l'épisode 3).
        # ⚠️ au_fin aussi, même si ce texte est hors audit : la ligne FINIT par un
        # nombre, donc posée à son premier mot elle montre « 0 » avant que la voix dise
        # « zéro ». Hors audit, aucun instrument ne l'aurait dit.
        self.au_fin("donc t vaut zéro")
        tz = self.sans_audit(self.col(self.t("donc t = 0", 32, VERT_OK), -2.80))
        self.play(FadeIn(tz, scale=1.12), run_time=0.5)

        self.au_fin("1, 0, moins 1")
        pi = self.sans_audit(r.point(*A02, couleur=VERT_OK, r=0.1))
        concl = self.gauche(VGroup(self.t("un seul point commun :", 30, VERT_OK),
                                   self.trip(A02, 30, VERT_OK)).arrange(RIGHT, buff=0.25),
                            -2.80, xmax=1.6)
        self.play(FadeIn(pi, scale=1.4), FadeIn(concl, shift=RIGHT * 0.12), run_time=0.7)
        self.play(Flash(pi[0], color=VERT_OK, line_length=0.24), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 03 : trois cas, et trois seulement ─────────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.au_mot("Trois cas")
        titre = self.t("Trois cas, et trois seulement", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        fs = 30
        # ⭐ Un tableau de trois cas se lit en RANGÉES sur toute la largeur, pas en
        # colonne de droite : chaque rangée est « ce qu'on obtient → ce qu'on conclut ».
        # Recette éprouvée de l'écran 10 de l'épisode 4 : on arrange, on borne la
        # largeur à 10,6 et on centre en x = −0,75, à l'écart de Ti-Margo (x ≥ 5,54).
        cas = []
        # ① une solution unique
        c1 = VGroup(self.t("une solution unique", fs, WHITE))
        # ② aucune solution, du type 3 = 0
        e2 = self.eq_zero("3", fs, C_REGARD)
        c2 = VGroup(self.t("aucune solution,", fs, WHITE),
                    VGroup(self.t("du type", fs, GREY_A), e2).arrange(RIGHT, buff=0.18))
        c2.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        # ③ vraie pour tout t, du type 0 = 0
        e3 = self.eq_zero("0", fs, C_PLAN)
        # ⚠️ sans_audit sur le PREMIER membre aussi : la voix dit « du type ZÉRO égale
        # zéro », les deux en lettres. eq_zero ne sort de l'audit que le second.
        self.sans_audit(e3.membre)
        c3 = VGroup(self.t("vraie pour tout t,", fs, WHITE),
                    VGroup(self.t("du type", fs, GREY_A), e3).arrange(RIGHT, buff=0.18))
        c3.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        concl = (self.t("sécants : un point commun", fs, VERT_OK),
                 self.t("strictement parallèle", fs, C_REGARD),
                 self.t("contenue dans le plan", fs, C_PLAN))
        for k, (gauche_, droite_) in enumerate(zip((c1, c2, c3), concl), start=1):
            cas.append(VGroup(self.pastille(k), gauche_, self.t("→", fs, GREY_B), droite_)
                       .arrange(RIGHT, buff=0.32, aligned_edge=UP))
        rangees = VGroup(*cas).arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        if rangees.width > 10.6:
            rangees.scale_to_fit_width(10.6)
        rangees.move_to(P(-0.75, 0.15))
        # ⛔⛔ MESURÉ AU DRY RUN : poser la rangée ② d'un bloc met son « 3 » à l'écran
        # **1,93 s** avant que la voix le dise — parce que la voix dit « si elle n'a
        # aucune solution, DU TYPE 3 ÉGALE ZÉRO, la droite est… » : le « du type » est
        # une incise, pas le début de la rangée. Chaque sous-ligne « du type … » attend
        # donc sa propre incise, en au_fin (c'est l'équation qui finit par le nombre).
        # ⭐ Rangée ① n'a pas d'incise : la voix ne donne pas de type pour ce cas-là.
        self.au_mot("a une solution unique")
        self.play(FadeIn(cas[0][0], scale=1.3), FadeIn(cas[0][1], shift=RIGHT * 0.15),
                  run_time=0.5)
        self.au_mot("ils sont sécants")
        self.play(FadeIn(cas[0][2]), FadeIn(cas[0][3], shift=RIGHT * 0.15), run_time=0.5)

        self.au_mot("n'a aucune solution")
        self.play(FadeIn(cas[1][0], scale=1.3), FadeIn(c2[0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_fin("du type 3 égale zéro")
        self.play(FadeIn(c2[1], shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("strictement parallèle au plan")
        self.play(FadeIn(cas[1][2]), FadeIn(cas[1][3], shift=RIGHT * 0.15), run_time=0.5)

        self.au_mot("elle est vraie pour tout t")
        self.play(FadeIn(cas[2][0], scale=1.3), FadeIn(c3[0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("du type zéro égale zéro")
        self.play(FadeIn(c3[1], shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("contenue dans le plan")
        self.play(FadeIn(cas[2][2]), FadeIn(cas[2][3], shift=RIGHT * 0.15), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 (bonne réponse : A) ────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("04-question")
        self.au_mot("Question !")
        # ⛔ AUCUNE figure : un plan et une droite dessinés DONNERAIENT la réponse.
        # La donnée de l'écran, c'est le résultat du calcul, et il est au centre gauche.
        # ⚠️ xmax = 0,2 et non 1,6 : les cartes de cet écran font 6,0 de large et
        # commencent à x = 0,6 (voir q_tete dans le socle).
        fs = 30
        intro = VGroup(self.t("on remplace la droite", fs, WHITE),
                       self.t("dans l'équation du plan,", fs, WHITE),
                       self.t("et on obtient :", fs, WHITE))
        intro.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.gauche(intro, 1.95, xmax=0.2)
        trois = self.eq_zero("3", 60, C_REGARD)
        cad = SurroundingRectangle(trois, color=C_REGARD, buff=0.24, stroke_width=3)
        # ⚠️ 0,45 et non 0,05 : l'écran 04b écrit QUATRE blocs sous ce cadre, et la
        # place a été comptée du bas vers le haut (marge −3,573), pas à vue.
        self.gauche(VGroup(trois, cad), 0.45, xmax=0.2)
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Que conclut-on ?"],
            [self.choix3("la droite est parallèle", "au plan, sans aucun", "point commun", fs=26),
             self.choix2("la droite est contenue", "dans le plan", fs=26),
             self.choix2("la droite coupe le plan", "en un point", fs=26)],
            largeur=6.0, xl=0.6)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("On remplace la droite")
        self.play(FadeIn(intro[0], shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("dans l'équation du plan")
        self.play(FadeIn(intro[1:], shift=RIGHT * 0.1), run_time=0.45)
        self.au_fin("on obtient 3 égale zéro")
        self.play(FadeIn(trois, scale=1.15), Create(cad), run_time=0.6)
        self.au_mot("Que conclut-on ?")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "A")
        self.mem_q1 = (cartes, pause, rebours)

    def ecran_reponse1(self):
        cartes, pause, rebours = self.mem_q1
        self.dire("04b-reponse")
        # ⛔ On passe pause ET rebours : sans eux, « Mets pause, et choisis ! » et le
        # compte à rebours restent affichés par-dessus toute l'explication (défaut n° 1
        # de l'épisode 1).
        self.q_reponse(cartes, 0, pause, rebours)
        fs = 28
        # ⭐⭐ LES QUATRE BLOCS DE CET ÉCRAN SONT COMPTÉS DU BAS VERS LE HAUT, pas posés
        # à vue : la marge de 3 % s'arrête à −3,573, les largeurs et les hauteurs ont
        # été mesurées hors rendu, et la première version mettait le dernier bloc à
        # −3,60 — un BORD que le dry run a signalé, et qu'aucun œil n'aurait vu sur une
        # planche à trois colonnes.
        # ⚠️ Et la largeur offerte ici n'est que de 6,7 (de −6,5 à xmax = 0,2, parce
        # que les cartes de cet épisode commencent à x = 0,6) : « aucun point de la
        # droite n'est dans le plan » fait 8,27 à 28, donc DEUX lignes.
        self.au_mot("elle est fausse pour toutes les valeurs de t")
        l1 = self.gauche(VGroup(self.croix(r=0.14),
                                self.t("fausse pour toutes les valeurs de t", 26, C_PIEGE))
                         .arrange(RIGHT, buff=0.22), -0.55, xmax=0.2)
        self.play(FadeIn(l1, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("aucun point de la droite n'est dans le plan")
        l2 = VGroup(self.t("aucun point de la droite", fs, WHITE),
                    self.t("n'est dans le plan", fs, WHITE))
        l2.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        self.gauche(l2, -1.30, xmax=0.2)
        self.play(FadeIn(l2, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("donc strictement parallèle au plan")
        concl = self.gauche(self.t("strictement parallèle au plan", 34, VERT_OK), -2.20,
                            xmax=0.2)
        self.play(FadeIn(concl, scale=1.1), run_time=0.7)
        # ⚠️ sans_audit sur les DEUX membres : la voix dit « zéro égale zéro », les deux
        # en lettres (même raison qu'à l'écran 03).
        # ⚠️ Et une SEULE ligne : à trois blocs au-dessus, un bloc de deux lignes ne
        # tient plus au-dessus de la marge. Le cas « 0 = 0 » est de toute façon déjà
        # enseigné en entier à l'écran 03, rangée ③.
        self.au_mot("Si on avait obtenu zéro égale zéro")
        z = self.eq_zero("0", fs, C_PLAN)
        self.sans_audit(z.membre)
        si = VGroup(VGroup(self.t("si", fs, GREY_A), z, self.t(":", fs, GREY_A))
                    .arrange(RIGHT, buff=0.16),
                    self.t("entièrement dans le plan", fs, C_PLAN))
        si.arrange(RIGHT, buff=0.24)
        self.gauche(si, -2.95, xmax=0.2)
        self.play(FadeIn(si[0], shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("la droite serait entièrement dans le plan")
        self.play(FadeIn(si[1], shift=RIGHT * 0.12), run_time=0.55)
        self.attendre_voix(marge=0.5)

    # ── 05 : deux plans ────────────────────────────────────────────────────

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        self.au_mot("Appliquons maintenant à deux plans")
        titre = self.t("Deux plans", 48, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        # ⛔⛔ VU À L'IMAGE, PUIS MESURÉ — PAS DE REPÈRE SUR CET ÉCRAN. La normale des
        # deux plans est (1 ; 1 ; 1) : `platitude` la donne à 9,0° du noyau de la
        # cavalière, donc le morceau projeté fait 0,13 d'épaisseur. À la planche, les
        # deux plans étaient deux LAMES qu'on prenait pour des feuilles de papier
        # posées de champ — et aucun contrôle ne l'avait dit (rien ne sort du cadre,
        # tous les nombres sont dits à l'heure).
        # ⭐ On les DESSINE à plat, comme un manuel : deux parallélogrammes décalés.
        # C'est la figure que l'élève doit garder en tête de « deux plans parallèles »,
        # et elle ne prétend pas dire OÙ ils sont dans un repère — d'où l'absence
        # d'axes, exigée par le mode d'emploi de `plan_dessine`.
        fs = 28
        self.au_fin("x plus y plus z moins 1 égale zéro")
        plan1 = plan_dessine(2.9, 1.1, couleur=C_PLAN, nom="P", op=0.30).move_to(P(-3.7, 0.95))
        b1 = self.col(VGroup(self.t("P :", 30, C_PLAN),
                             self.eq_plan(*P05, fs=fs, color=C_PLAN))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 2.50)
        self.play(FadeIn(plan1), FadeIn(b1, shift=RIGHT * 0.12), run_time=0.8)
        self.au_fin("2 x plus 2 y plus 2 z plus 5 égale zéro")
        # ⚠️ 1,35 d'écart vertical : les deux parallélogrammes ont 1,1 de profondeur,
        # ils ne se touchent donc pas, et la flèche de la normale tient entre les deux.
        plan2 = plan_dessine(2.9, 1.1, couleur=C_VECTEUR2, nom="P′", op=0.30,
                             decal=DR).move_to(P(-3.7, -0.40))
        b2 = self.col(VGroup(self.t("P′ :", 30, C_VECTEUR2),
                             self.eq_plan(*Q05, fs=fs, color=C_VECTEUR2))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 1.55)
        self.play(FadeIn(plan2), FadeIn(b2, shift=RIGHT * 0.12), run_time=0.8)

        self.au_mot("exactement le double")
        # ⭐ La normale commune, en pointillé : c'est ELLE que « les mêmes coefficients »
        # veut dire, et c'est ce qui fait que les deux plans sont parallèles.
        nrm = DashedLine(P(-3.7, -0.40), P(-3.7, 0.95), dash_length=0.12).set_stroke(GREY_B, 4)
        self.play(Create(nrm), run_time=0.5)
        dbl = self.col(VGroup(self.t("les coefficients", fs, C_REGARD),
                              self.t("sont le double", fs, C_REGARD))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.60)
        self.play(FadeIn(dbl, shift=RIGHT * 0.12), run_time=0.55)
        self.au_mot("les deux plans sont parallèles")
        par = self.col(VGroup(self.coche(VERT_OK, 0.15), self.t("parallèles", 32, VERT_OK))
                       .arrange(RIGHT, buff=0.22), -0.15)
        self.play(FadeIn(par, scale=1.12), run_time=0.55)
        self.au_mot("Sont-ils confondus ?")
        conf = self.col(self.t("confondus ?", 32, JAUNE_TITRE), -0.80)
        self.play(FadeIn(conf, shift=RIGHT * 0.1), run_time=0.45)
        self.au_fin("x plus y plus z plus 2,5 égale zéro")
        # ⛔ C'est ICI que `fr()` du socle gagne sa place : sans elle, l'écran afficherait
        # « x + y + z + 2.5 = 0 », avec un POINT, dans un cours français.
        div = self.col(VGroup(self.t("÷ 2 :", fs, GREY_A),
                              self.eq_plan(*Q05D, fs=fs, color=WHITE))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.1), -1.55)
        self.play(FadeIn(div, shift=RIGHT * 0.12), run_time=0.6)
        # ⛔⛔ au_fin ET NON au_mot, ET C'EST UN DÉFAUT QUI SE CACHAIT DERRIÈRE UN
        # AUDIT-TARD DE 24,46 s. L'audit compare chaque nombre à sa PREMIÈRE occurrence
        # dans le clip : le « 1 » de « 2,5 ≠ −1 » était rattaché au « moins 1 » de
        # l'équation de P, dite 24 s plus tôt, donc signalé « en retard ». La vraie
        # mesure est sur SA propre occurrence (« et non moins 1 », à la fin du clip) :
        # posé au premier mot « et », le « −1 » était à l'écran 0,8 s avant d'être dit.
        # ⭐ C'est le cinquième cas de ce genre dans la série, et il ne se trouve qu'en
        # relisant à la main les plus gros TARD.
        self.au_fin("et non moins 1")
        # ⚠️ Court et étroit : sous y = −1,95, col() rétrécit à 3,1 tout ce qui dépasse
        # x = 5,3 pour protéger Ti-Margo. « 2,5 ≠ −1 » fait 1,9, il passe.
        neq = self.col(self.t(f"{self.nombre(2.5)} ≠ {self.nombre(-1)}", 38, C_PIEGE), -2.40)
        self.play(FadeIn(neq, scale=1.15), run_time=0.4)

        # ⭐ PAS de au_mot ici, et c'est le remède du piège n° 6 des entiers : « ce n'est
        # pas le même plan » est dit 0,45 s après la fin de « et non moins 1 », donc
        # sous le garde-fou de 0,6 s. On ENCHAÎNE — la synchro de la ligne suivante la
        # cale toute seule, et rappeler au_mot ne ferait que produire un RETARD.
        pas = self.gauche(self.t("ce n'est pas le même plan", 30, C_PIEGE), -2.15, xmax=1.6)
        self.play(FadeIn(pas, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Ils sont donc strictement parallèles")
        fin = self.t("strictement parallèles", 38, VERT_OK)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.15, stroke_width=3)
        self.gauche(VGroup(fin, cad), -2.95, xmax=1.6)
        self.play(FadeIn(fin, scale=1.1), Create(cad), run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège — deux droites ───────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("Voilà le piège")
        # ⛔ Le glyphe ⚠ ne se rend pas : on DESSINE le triangle (défaut n° 2 de E1).
        bang = VGroup(Triangle(fill_color=C_PIEGE, fill_opacity=0.18, stroke_color=C_PIEGE,
                               stroke_width=4).scale(0.33),
                      Text("!", font_size=30, color=C_PIEGE, weight=BOLD).shift(DOWN * 0.05))
        titre = VGroup(bang, self.t("Pas de point commun ≠ parallèles", 40, C_PIEGE))
        titre.arrange(RIGHT, buff=0.3).to_edge(UP, buff=0.5)
        self.au_mot("pas de point commun ne veut pas dire parallèles")
        self.play(Write(titre[1]), FadeIn(titre[0], scale=1.4), run_time=0.9)

        # La route et le pont, en coordonnées : deux droites non coplanaires.
        # ⛔ VU À L'IMAGE : d passait par l'ORIGINE avec le directeur (1 ; 0 ; 0), donc
        # elle se confondait trait pour trait avec l'axe des x — on lisait un axe, pas
        # une droite. Elle passe maintenant par (0 ; 0,7 ; 0) : même direction, même
        # leçon, et elle se détache de l'axe.
        r, ax = self.repere(o=(-5.0, -0.9), u=0.5, portee=3)
        # ⚠️ decal=DOWN et t1 = 2,2 : VU AU GROS PLAN, le nom « d » posé en DR au bout
        # de la droite tombait à 0,20 du nom de l'axe x. Mesuré après correction : 0,59.
        d1 = self.sans_audit(r.droite(A06, U06, -0.3, 2.2, nom="d", couleur=C_DROITE, sw=5,
                                      decal=DOWN))
        # ⛔ VU AU GROS PLAN : à z = 0,9 la seconde droite passait à 0,10 du nom de
        # l'axe y et le coupait. À z = 1,5 elle est 0,35 au-dessus — et, accessoirement,
        # on voit enfin qu'elle est AU-DESSUS du plan, ce qui est tout le propos.
        d2 = self.sans_audit(r.droite(B06, V06, -0.5, 2.2, nom="d′", couleur=C_VECTEUR2, sw=5,
                                      decal=UR))
        self.play(Create(ax), run_time=0.4)
        self.play(Create(d1), Create(d2), run_time=0.8)

        fs = 28
        self.au_mot("en deux temps")
        tps = self.col(self.t("la méthode en deux temps", fs, JAUNE_TITRE), 2.50)
        self.play(FadeIn(tps, shift=RIGHT * 0.1), run_time=0.45)
        self.au_mot("on regarde les vecteurs directeurs")
        un = self.col(VGroup(self.pastille(1), self.t("les directeurs", fs, WHITE))
                      .arrange(RIGHT, buff=0.24), 1.80)
        self.play(FadeIn(un, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("s'ils sont colinéaires")
        col1 = self.col(VGroup(self.t("colinéaires →", fs, GREY_A),
                               self.t("parallèles", 30, VERT_OK))
                        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 1.05)
        self.play(FadeIn(col1, shift=RIGHT * 0.12), run_time=0.55)
        self.au_mot("et même confondues")
        conf = self.col(VGroup(self.t("confondues si elles", 26, GREY_A),
                               self.t("ont un point commun", 26, GREY_A))
                        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.25)
        self.play(FadeIn(conf, shift=RIGHT * 0.1), run_time=0.55)
        self.au_mot("en résolvant le système")
        deux = self.col(VGroup(self.pastille(2), self.t("sinon, le système", fs, WHITE))
                        .arrange(RIGHT, buff=0.24), -0.50)
        self.play(FadeIn(deux, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("les droites sont sécantes")
        sec = self.col(VGroup(self.t("une solution →", fs, GREY_A),
                              self.t("sécantes", 30, VERT_OK))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -1.25)
        self.play(FadeIn(sec, shift=RIGHT * 0.12), run_time=0.55)
        self.au_mot("ne sont pas coplanaires")
        ncp = self.col(VGroup(self.t("aucune →", fs, GREY_A),
                              self.t("non coplanaires", 30, C_PIEGE))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -2.05)
        self.play(FadeIn(ncp, shift=RIGHT * 0.12), run_time=0.55)

        # ⭐ Le plan qui contient d mais PAS d′ : c'est la phrase « aucun plan ne les
        # contient toutes les deux », montrée au lieu d'être affirmée.
        self.au_mot("aucun plan ne les contient toutes les deux")
        # ⚠️ Le sol (0 ; 0 ; 1) est à 14,9° du noyau : LUI se projette bien (0,34
        # d'épaisseur), c'est le seul vrai morceau de plan de cet épisode.
        # ⚠️ Centré en (1,3 ; 1,3) avec demi = 2,0, il va de −0,7 à 3,3 dans les deux
        # directions, donc d (en y = 0,7) est DEDANS, à 1,4 du bord. À demi = 1,7
        # centré en (1,4 ; 1,4) elle tombait sur l'arête et se lisait comme le bord.
        sol = r.plan((0, 0, 1), d=0, centre=(1.3, 1.3, 0), demi=2.0, couleur=C_PLAN, op=0.20)
        bas = VGroup(self.t("aucun plan ne les contient", 30, C_PIEGE),
                     self.t("toutes les deux", 30, C_PIEGE))
        bas.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        self.gauche(bas, -2.80, xmax=1.6)
        self.play(FadeIn(sol[0]), FadeIn(bas, shift=UP * 0.1), run_time=0.9)
        # ⭐ d est DANS le plan : ré-ajoutée, elle repasse au premier plan. Sans ça,
        # l'aplat du sol la recouvre et on ne voit plus qu'une droite sur les deux.
        self.add(d1, d2)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 (bonne réponse : C) ────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("07-question")
        self.au_mot("Question !")
        # ⛔ AUCUNE figure : dessiner deux droites non coplanaires donnerait la réponse.
        # ⚠️ gauche() CENTRE en hauteur (piège n° 19 des entiers) : un bloc de QUATRE
        # lignes posé à y = 1,65 monte à 2,40 et descend à 0,90 — dans la marge.
        fs = 30
        intro = VGroup(self.t("deux droites de l'espace", fs, WHITE),
                       self.t("n'ont aucun point commun,", fs, WHITE),
                       self.t("et leurs vecteurs directeurs", fs, C_REGARD),
                       self.t("ne sont pas colinéaires", fs, C_REGARD))
        intro.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.gauche(intro, 1.65, xmax=0.2)
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Que peut-on dire ?"],
            [self.t("elles sont parallèles", 28), self.t("c'est impossible", 28),
             self.choix2("elles ne sont pas", "coplanaires", fs=28)],
            largeur=6.0, xl=0.6)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Deux droites de l'espace n'ont aucun point commun")
        self.play(FadeIn(intro[:2], shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("leurs vecteurs directeurs ne sont pas colinéaires")
        self.play(FadeIn(intro[2:], shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("Que peut-on dire ?")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "C")
        self.mem_q2 = (cartes, pause, rebours)

    def ecran_reponse2(self):
        cartes, pause, rebours = self.mem_q2
        self.dire("07b-reponse")
        self.q_reponse(cartes, 2, pause, rebours)
        fs = 28
        # ⭐ Comme en 04b : quatre blocs, mesurés hors rendu, comptés du bas vers le
        # haut. La largeur offerte est 6,7 — d'où 26 puis 24 pour les deux premiers.
        self.au_mot("des vecteurs directeurs colinéaires")
        l1 = self.gauche(self.t("parallèles  ⟹  directeurs colinéaires", 26, GREY_A),
                         -0.10, xmax=0.2)
        self.play(FadeIn(l1, shift=RIGHT * 0.12), run_time=0.55)
        self.au_mot("l'énoncé dit exactement le contraire")
        l2 = self.gauche(VGroup(self.croix(r=0.14),
                                self.t("l'énoncé dit exactement le contraire", 24, C_PIEGE))
                         .arrange(RIGHT, buff=0.22), -0.85, xmax=0.2)
        self.play(FadeIn(l2, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("c'est la route et le pont")
        l3 = VGroup(self.t("c'est la route et le pont :", fs, C_REGARD),
                    self.t("le cas le plus courant dans l'espace", fs, C_REGARD))
        l3.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        self.gauche(l3, -1.70, xmax=0.2)
        self.play(FadeIn(l3[0], shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("le cas le plus courant dans l'espace")
        self.play(FadeIn(l3[1], shift=RIGHT * 0.12), run_time=0.5)
        # ⚠️ MESURÉ par verifier-avant-rendu : la voix dit « qu'aucun », en un seul mot,
        # donc il n'y a AUCUNE marque à l'offset de « aucun » — la première est sur
        # « plan ». Un extrait qui commence à « aucun » prendrait silencieusement la
        # marque d'avant (17,69 s au lieu de 17,9x) : c'est le piège n° 4 du lot A.
        self.au_mot("plan ne peut les contenir toutes les deux")
        # ⚠️ 28 et non 32 : à 32 ce bloc fait 7,11 de large, donc gauche() le rétrécirait
        # à 6,7 — et c'est la CONCLUSION de l'écran, elle ne doit pas être son plus
        # petit texte (défaut n° 4 de l'épisode 3).
        fin = VGroup(self.t("aucun plan ne peut les contenir", 28, VERT_OK),
                     self.t("toutes les deux", 28, VERT_OK))
        fin.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(fin, cad), -2.90, xmax=0.2)
        self.play(FadeIn(fin, scale=1.08), Create(cad), run_time=0.75)
        self.attendre_voix(marge=0.5)

    # ── 08 : la méthode annoncée, et le mot exact ──────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        self.au_mot("Au bac, annonce la méthode")
        titre = self.t("Au bac : annonce la méthode", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        # ⚠️ hauteur 3,8 et centre −0,30 : le cadre descend à −2,20, au-dessus du bloc
        # posé dessous, qui s'arrête lui-même à −3,30 (marge : −3,573).
        copie = RoundedRectangle(width=10.2, height=3.8, corner_radius=0.18, stroke_color=GREY_B,
                                 stroke_width=3, fill_color="#0b1220",
                                 fill_opacity=1).move_to(P(-0.6, -0.30))
        marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
                     copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2,
                     color=ROUGE_ERREUR)
        self.play(Create(copie), Create(marge), run_time=0.6)
        fs = 26
        un = VGroup(self.pastille(1), VGroup(
            self.t("droite et plan : je remplace la paramétrique", fs, C_REGARD),
            self.t("puis je conclus selon le nombre de solutions en t", fs)).arrange(
                DOWN, aligned_edge=LEFT, buff=0.1))
        deux = VGroup(self.pastille(2), VGroup(
            self.t("deux plans : je compare les coefficients,", fs, C_PLAN),
            self.t("puis je teste un point", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.1))
        trois = VGroup(self.pastille(3), VGroup(
            self.t("deux droites : je compare les directeurs,", fs, C_VECTEUR2),
            self.t("puis je résous le système", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.1))
        for g in (un, deux, trois):
            g.arrange(RIGHT, buff=0.3, aligned_edge=UP)
        lignes = VGroup(un, deux, trois).arrange(DOWN, aligned_edge=LEFT, buff=0.30)
        # ⛔ VU AU GROS PLAN : à 9,1 le « t » final de « …solutions en t » SORTAIT de la
        # copie par la droite. La place réelle se compte : la copie va jusqu'à x = 4,5,
        # le texte commence après la marge rouge à −4,65, il reste donc 9,15 — et
        # 9,1 n'en laissait que 0,05, c'est-à-dire rien. 8,6 laisse 0,55.
        if lignes.width > 8.6:
            lignes.scale_to_fit_width(8.6)
        lignes.move_to(copie.get_center()).align_to(marge.get_center() + RIGHT * 0.3, LEFT)
        self.au_mot("Pour une droite et un plan")
        self.play(FadeIn(un[0], scale=1.3), FadeIn(un[1][0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("puis je conclus selon le nombre de solutions en t")
        self.play(FadeIn(un[1][1], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("Pour deux plans")
        self.play(FadeIn(deux[0], scale=1.3), FadeIn(deux[1][0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("puis je teste un point")
        self.play(FadeIn(deux[1][1], shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("Pour deux droites")
        self.play(FadeIn(trois[0], scale=1.3), FadeIn(trois[1][0], shift=RIGHT * 0.15),
                  run_time=0.5)
        self.au_mot("puis je résous le système")
        self.play(FadeIn(trois[1][1], shift=RIGHT * 0.15), run_time=0.45)
        # ⚠️ Deux lignes et non une : « sécants, strictement parallèles, confondus, ou
        # non coplanaires » fait 11,3 d'un seul tenant à 26, au-delà de la marge (13,36
        # de large en tout, mais le cadre et son buff mordent).
        self.au_mot("avec le mot exact")
        mot = VGroup(self.t("le mot exact : sécants, strictement parallèles,", fs, C_REGARD),
                     self.t("confondus, ou non coplanaires", fs, C_REGARD))
        mot.arrange(DOWN, buff=0.1).next_to(copie, DOWN, buff=0.26)
        cad = SurroundingRectangle(mot, color=C_REGARD, buff=0.12, stroke_width=3)
        self.play(FadeIn(mot, shift=UP * 0.1), Create(cad), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi ───────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-defi")
        self.au_mot("À toi de jouer")
        tete = VGroup(pastille_pause(0.38), self.t("À toi de jouer !", 42, ORANGE_RETENUE))
        tete.arrange(RIGHT, buff=0.25).to_edge(UP, buff=0.5)
        self.play(FadeIn(tete, shift=DOWN * 0.12), run_time=0.5)
        # ⛔⛔ PAS DE REPÈRE ICI NON PLUS, ET LA RAISON EST MESURÉE : la normale de P est
        # (1 ; 1 ; 2), et `platitude` la donne à **0,4°** du noyau de la cavalière — ce
        # plan-là se projette exactement sur une DROITE (0,01 d'épaisseur). À la
        # planche, « le plan P » était un trait bleu qu'on prenait pour une seconde
        # droite. ⭐ Le plan de cet écran arrive donc en 09b, dessiné à plat, au moment
        # où il est la RÉPONSE — ce qui respecte aussi la règle « le dessin porte la
        # donnée, jamais la réponse ».
        # ⭐ La DROITE, elle, se projette très bien : c'est une donnée de l'exercice, et
        # la voir seule ne répond à rien. Le repère est posé en haut à gauche, là où
        # le schéma de la correction viendra prendre sa place.
        r, ax = self.repere(o=(-4.3, 0.55), u=0.45, portee=3)
        # ⚠️ t0 = −0,1 : VU AU GROS PLAN, à −0,4 la droite démarrait SUR l'axe des z et
        # on ne savait plus lequel des deux traits était quoi.
        dr = self.sans_audit(r.droite(A09, U09, -0.1, 2.2, nom="d", couleur=C_DROITE, sw=5,
                                      decal=UR))
        self.play(Create(ax), run_time=0.4)
        syst = self.systeme([ligne_param(n, A09[i], U09[i]) for i, n in enumerate("xyz")],
                            32, c_acc=C_DROITE)
        self.col(syst, 2.20)
        self.au_fin("x égale t")
        self.play(Create(syst.acc), FadeIn(syst.eq[0], shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("y égale 1 plus t")
        self.play(FadeIn(syst.eq[1], shift=RIGHT * 0.12), run_time=0.4)
        self.au_fin("z égale 2 moins t")
        self.play(FadeIn(syst.eq[2], shift=RIGHT * 0.12), Create(dr), run_time=0.5)
        self.au_fin("x plus y plus 2 z plus 1 égale zéro")
        eqP = self.col(VGroup(self.t("P :", 32, C_PLAN),
                              self.eq_plan(*P09, fs=30, color=C_PLAN))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 0.85)
        self.play(FadeIn(eqP, shift=RIGHT * 0.12), run_time=0.7)
        self.au_mot("Quelle est leur position relative ?")
        cons = self.col(VGroup(self.t("quelle est leur", 30, ORANGE_RETENUE),
                               self.t("position relative ?", 30, ORANGE_RETENUE))
                        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -0.35)
        self.play(FadeIn(cons, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("Mets pause, et cherche")
        pause = self.col(self.t("Mets pause, et cherche !", 30, ORANGE_RETENUE), -1.35)
        rebours = self.rebours_sous(pause)
        self.play(FadeIn(pause, scale=0.85), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.mem_defi = (ax, dr, cons, pause, rebours)

    def ecran_correction(self):
        ax, dr, cons, pause, rebours = self.mem_defi
        # ⛔ Piège de l'épisode 3 : l'écran de correction HÉRITE de l'écran de défi.
        # Ce qui s'efface : la consigne et la pause. Ce qui RESTE : le système de d et
        # l'équation de P, qui sont les données de l'exercice.
        self.play(FadeOut(cons), FadeOut(pause), FadeOut(rebours), run_time=0.3)
        self.dire("09b-correction")
        fs = 28
        # ⭐ La substitution est une LIGNE LONGUE : elle va à gauche, sous la figure,
        # d'un seul morceau (piège n° 28 des entiers — un calcul ne se coupe pas entre
        # les deux colonnes).
        # ⭐ La substitution est une LIGNE LONGUE : elle va à gauche, d'un seul morceau
        # (piège n° 28 des entiers — un calcul ne se coupe pas entre les deux colonnes).
        self.au_fin("plus 2 fois 2 moins t, plus 1")
        subst = self.gauche(self.t("t + (1 + t) + 2 × (2 − t) + 1", 32, WHITE), -0.30, xmax=1.6)
        self.play(FadeIn(subst, shift=RIGHT * 0.12), run_time=0.6)

        # ⛔⛔ VU À LA PLANCHE : « les termes en t » s'écrivait PAR-DESSUS l'équation de
        # P. L'écran de correction HÉRITE du défi — et ici l'héritage descend jusqu'à
        # y = 0,45 (le bloc « P : … » est à 0,85 et fait deux lignes). La colonne de
        # droite ne commence donc qu'à 0,30, et les quatre blocs ci-dessous ont été
        # comptés depuis là, hauteur par hauteur, pas posés à vue.
        t12 = self.col(VGroup(self.t("les termes en t", fs, GREY_A),
                              self.t("t + t − 2t", 32, C_REGARD))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.12), -0.12)
        self.au_mot("les termes en t")
        self.play(FadeIn(t12[0], shift=RIGHT * 0.1), run_time=0.4)
        self.au_fin("t, plus t, moins 2 t")
        self.play(FadeIn(t12[1], shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Ils s'éliminent")
        t3 = self.col(VGroup(self.t("ils s'éliminent :", 28, C_REGARD),
                             self.t("plus de t du tout", 28, C_REGARD))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -1.12)
        self.play(FadeIn(t3, scale=1.08), run_time=0.55)
        self.au_fin("1, plus 4, plus 1, c'est-à-dire 6")
        c2 = self.col(self.t("1 + 4 + 1  =  6", 30, WHITE), -1.88)
        self.play(FadeIn(c2, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("L'équation devient 6 égale zéro")
        # ⚠️ 2,2 + 3,0 = 5,2 à droite, donc sous 5,3 : col() ne rétrécit pas, même en
        # descendant sous y = −1,95 (le garde-fou qui protège Ti-Margo).
        six = self.col(VGroup(self.eq_zero("6", 40, C_PIEGE),
                              self.t("faux pour tout t", 26, C_PIEGE))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.1), -2.71)
        self.play(FadeIn(six[0], scale=1.15), run_time=0.5)
        self.au_mot("ce qui est faux quelle que soit la valeur de t")
        self.play(FadeIn(six[1], shift=UP * 0.1), run_time=0.45)

        # ⭐⭐ LA FIGURE N'ARRIVE QU'ICI, ET ELLE EST LA RÉPONSE : un plan dessiné à
        # plat, une droite parallèle au-dessus. C'est l'image des manuels, et c'est la
        # seule possible pour ce plan-là (0,4° du noyau : projeté, il serait un trait).
        self.au_mot("la droite d est strictement parallèle au plan P")
        schema = VGroup(plan_dessine(3.0, 1.1, couleur=C_PLAN, nom="P", op=0.26, decal=DR),
                        VGroup(Line(P(-1.25, 0), P(1.75, 0), stroke_width=6, color=C_DROITE),
                               self.t("d", 28, C_DROITE).move_to(P(2.05, 0.02))))
        schema[1].next_to(schema[0], UP, buff=0.52)
        schema.move_to(P(-3.7, 1.45))
        concl = self.gauche(self.t("d est strictement parallèle à P", 32, VERT_OK), -1.25,
                            xmax=1.6)
        self.play(FadeOut(ax), FadeOut(dr), FadeIn(schema, shift=UP * 0.1), run_time=0.8)
        self.play(FadeIn(concl, scale=1.08), run_time=0.6)
        # ⭐ Le SIGNAL, c'est la phrase que l'élève doit retenir de tout l'épisode.
        self.au_mot("ce sont les t qui disparaissent")
        sig = self.gauche(self.t("les t qui disparaissent annoncent le parallélisme", 26,
                                 C_REGARD), -2.10, xmax=1.6)
        self.play(FadeIn(sig, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(tit), run_time=0.7)
        fs = 32
        faits = (
            (("droite et plan :", C_PLAN), ("on remplace et on lit l'équation en t", WHITE),
             "on remplace et on lit l'équation en t"),
            (("deux plans :", C_VECTEUR2), ("on compare les coefficients, puis un point", WHITE),
             "on compare les coefficients"),
            (("deux droites :", C_DROITE), ("ne jamais se croiser sans être parallèles", VERT_OK),
             "ne jamais se croiser sans être parallèles"),
        )
        blocs = []
        for (g, cg), (d, cd), _ in faits:
            blocs.append(VGroup(self.t(g, fs, cg), self.t(d, fs, cd)).arrange(RIGHT, buff=0.22))
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP)
                          for b in blocs])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        # ⚠️ 10,6 de large, centré en x = −0,75 : le bloc s'arrête à 4,55, à l'écart de
        # Ti-Margo à scale 0,65 (boîte à partir de x = 5,30).
        if lignes.width > 10.6:
            lignes.scale_to_fit_width(10.6)
        lignes.move_to(P(-0.75, 0.15))
        for i, (_, _, extrait) in enumerate(faits):
            self.au_mot(extrait)
            self.play(Create(lignes[i][0]), FadeIn(blocs[i][0], shift=RIGHT * 0.2), run_time=0.45)
            self.play(FadeIn(blocs[i][1], shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.8)

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_idee()
        self.ecran_theoreme()
        self.ecran_question1()
        self.ecran_reponse1()
        self.ecran_appliquer()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_reponse2()
        self.ecran_rediger()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.page_abonnement()


class EspacePositionRelativeTerminale(EspacePositionRelativeBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
