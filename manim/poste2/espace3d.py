# manim/poste2/espace3d.py
# EleveAI — LA BOÎTE À OUTILS « GÉOMÉTRIE DANS L'ESPACE », terminale spé (22/11/2026).
#
# POURQUOI CE FICHIER EXISTE, ET POURQUOI IL EST DANS LE DÉPÔT. Les 12 épisodes
# de la série « espace » (6 micros de `geometrie_espace` + 6 de
# `produit_scalaire_espace`) dessinent tous les mêmes objets : un repère, des
# points, des vecteurs, des droites, des morceaux de plan, un cube, un
# tétraèdre. Écrire ça douze fois, c'est douze occasions de se tromper.
# ⛔ Et un outil écrit hors du dépôt meurt avec sa session : toute la boîte à
# outils de la série des Masses a disparu comme ça. Celui-ci est versionné.
#
# ⭐⭐ LA DÉCISION QUI TIENT TOUT : PAS DE `ThreeDScene`, DE LA CAVALIÈRE 2D.
# Mesuré avant de choisir, pas supposé :
#   · il n'existe AUCUNE scène 3D dans le dépôt — pas un `ThreeDScene`, pas un
#     `ThreeDAxes`, pas un `set_camera_orientation`. Toute la production est 2D ;
#   · la maison dessine pourtant déjà des solides, en CAVALIÈRE, depuis la 5e :
#     `point3(o, u, x, y, z)` et `FUITE` dans
#     `manim/scripts/5e/aire_volume_5e_commun.py`, repris en 4e et en 3e ;
#   · le coach montre la MÊME projection : `lib/canvas/Repere3dCanvas.tsx` est
#     une cavalière. Un élève qui voit la vidéo puis la question du coach
#     retrouve exactement le même dessin. C'est l'argument décisif ;
#   · et le verrou de rendu HD est unique sur la machine : un premier rendu 3D
#     « pour voir » bloquerait tout le monde pour un temps inconnu.
# ⚠️ Une seule différence assumée avec le coach : l'angle de fuite est de 35°
# ici (convention de la maison depuis la 5e) et de 30° dans le composant React.
# Les deux sont des cavalières correctes ; on ne touche ni l'une ni l'autre.
#
# ⭐ CE QUE MANIM SAIT FAIRE ET QUE LE CANVAS DU COACH NE SAIT PAS, et dont il
# faut donc se servir ici : de VRAIES flèches (un vecteur est une flèche, pas
# un segment), des surfaces TEINTÉES (un morceau de plan se remplit, il ne se
# contente pas d'être un quadrilatère tracé), et des arêtes cachées en
# pointillé propre.
#
# ⛔⛔ LES TROIS PIÈGES DE CADRE, PAYÉS SUR LA SÉRIE DES ENTIERS :
#   1. Les figures vont dans la colonne de GAUCHE (x ≈ −3,4) ; `col()` écrit à
#      DROITE. Marge de 3 % : x ∈ [−6,68 ; 6,68], y ∈ [−3,573 ; 3,573].
#   2. Sur un écran de QUESTION, toute la figure doit finir AU-DESSUS de
#      `haut` = −0,75 : la phrase de réponse s'écrit là, et une figure qui
#      descend plus bas s'imprime par-dessus.
#   3. Un mobjet construit AVANT un `move_to()` du groupe ne suit pas le
#      groupe. Tout ce que rendent ces fonctions est un `VGroup` unique :
#      déplacez le groupe, jamais ses morceaux.
# ⚠️ `BORDS=1` ne voit que ce qui sort du CADRE. Il ne voit pas une étiquette
# qui en recouvre une autre : ça, seule l'image.
#
# POUR VOIR LA BOÎTE : planche de contrôle, toutes les primitives d'un coup,
#   PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql --disable_caching \
#     manim/poste2/espace3d.py PlancheEspace3D --media_dir manim/poste2/media-espace3d

import math

import numpy as np
from manim import *  # noqa: F401,F403

# ── La projection cavalière, à l'identique de la maison (5e → 4e → 3e) ───────
FUITE = (0.5 * math.cos(math.radians(35)), 0.5 * math.sin(math.radians(35)))


def point3(o, u, x, y, z):
    """Le point (x en largeur, y en profondeur, z en hauteur), o = l'origine du repère,
    u = l'unité en unités Manim. ⭐ La MÊME formule que `aire_volume_5e_commun.point3`."""
    return np.array(o, dtype=float) + np.array(
        [(x + y * FUITE[0]) * u, (z + y * FUITE[1]) * u, 0.0]
    )


# ── Les couleurs, et ce qu'elles veulent dire dans TOUTE la série ───────────
# ⭐ Une couleur par rôle, la même du premier au douzième épisode : un élève qui
# a vu un épisode reconnaît les suivants. Reprend la charte (bleu = calcul,
# vert = juste, rouge = piège, ambre = ce qu'on regarde).
C_AXE = "#94a3b8"        # les axes et leurs noms : du décor, jamais la leçon
# ⛔⛔ VU SEULEMENT À L'IMAGE (22/11/2026) : la première version mettait les
# points et les arêtes en "#0f172a" — l'ardoise des banques du coach, où le fond
# est BLANC. Sur la planche, dont le fond est sombre comme celui de la série,
# le cube et le tétraèdre étaient INVISIBLES : on ne voyait que la diagonale
# ambre et deux lettres flottantes. Aucun audit, aucun `BORDS=1` ne le dit —
# rien ne sort du cadre, tout est simplement de la couleur du fond.
# ⭐ La série est sur fond sombre : la couleur par défaut d'un trait est CLAIRE.
# Sur un fond clair (une planche d'impression), passer `couleur="#0f172a"`.
C_POINT = "#e2e8f0"      # un point donné, une arête : clair, sur fond sombre
C_REGARD = "#f59e0b"     # ce que la question regarde en ce moment (ambre)
C_VECTEUR = "#2563eb"    # un vecteur (bleu : c'est un calcul)
C_VECTEUR2 = "#db2777"   # le second vecteur, quand il y en a deux
C_PLAN = "#38bdf8"       # un morceau de plan
C_NORMALE = "#16a34a"    # un vecteur normal, une hauteur, une perpendiculaire
C_DROITE = "#f97316"     # une droite
C_PIEGE = "#dc2626"      # ce qui est faux
C_FANTOME = "#cbd5e1"    # les traits de construction (pointillés)


def fleche_de_nom(mob, couleur=C_VECTEUR, fs=26, ecart=0.10):
    """LA FLÈCHE DESSINÉE AU-DESSUS D'UN NOM DE VECTEUR — « u⃗ », « AB⃗ ».

    ⛔⛔ LE CARACTÈRE COMBINANT U+20D7 NE SE REND PAS. Mesuré le 22/11/2026 sur une
    image avant d'écrire quoi que ce soit : « u⃗ » sort en carré « tofu » avec
    « 20D7 » écrit dedans, exactement comme le glyphe ⚠ de l'épisode 1. La flèche d'un
    vecteur se DESSINE, comme on dessine le triangle du panneau d'avertissement.

    ⭐ UNE SEULE IMPLÉMENTATION POUR LES DEUX CÔTÉS : les étiquettes de FIGURE
    (`Repere3D.vecteur`, ici) et les textes d'ÉCRAN (`EcransEspace.vec` et `.vexpr`,
    dans `espace_ecrans.py`, qui délègue à celle-ci). Deux copies auraient divergé au
    premier réglage d'épaisseur.
    ⚠️ Elle déborde de `ecart` + son épaisseur au-dessus du texte : tout bloc qui en
    contient une est plus HAUT qu'avant, et ses cotes se remesurent."""
    return Arrow(mob.get_corner(UL) + UP * ecart + LEFT * 0.03,
                 mob.get_corner(UR) + UP * ecart + RIGHT * 0.05,
                 buff=0, stroke_width=max(2.0, fs / 14), color=couleur,
                 max_tip_length_to_length_ratio=0.24, tip_length=0.09 + fs / 500)


class Repere3D:
    """UN REPÈRE DE L'ESPACE EN CAVALIÈRE, et tout ce qu'on accroche dessus.

    `o` : l'origine en coordonnées Manim. `u` : la longueur d'une unité.
    `portee` : jusqu'où vont les axes (en unités du repère), un entier.

    ⭐ On fabrique le repère UNE fois par écran et on lui demande ses objets :
    `r.axes()`, `r.point(…)`, `r.vecteur(…)`, `r.plan(…)`, `r.droite(…)`.
    Chacun rend un `VGroup` indépendant, qu'on anime quand la voix le dit.

    ⛔ `r.pt(x, y, z)` rend une POSITION, pas un objet : c'est ce qu'on passe à
    `move_to()`. Ne jamais le confondre avec `r.point(…)`, qui dessine.
    """

    def __init__(self, o=ORIGIN, u=0.62, portee=4):
        self.o = np.array(o, dtype=float)
        self.u = float(u)
        self.portee = int(portee)

    # ── les positions ────────────────────────────────────────────────────────
    def pt(self, x, y, z):
        return point3(self.o, self.u, x, y, z)

    def largeur_a(self, x, y, z):
        """L'abscisse Manim du point (x, y, z) — pour vérifier un bord à la main."""
        return float(self.pt(x, y, z)[0])

    # ── les axes ─────────────────────────────────────────────────────────────
    def axes(self, noms=("x", "y", "z"), couleur=C_AXE, fs=22, sw=3):
        """Les trois axes fléchés et leurs noms.
        ⚠️ Le nom d'un axe est posé AU BOUT, décalé vers l'extérieur : c'est le
        seul endroit où il ne tombe sur aucun point de la figure. Si une figure
        va jusqu'au bout d'un axe, allonger `portee` plutôt que bouger le nom."""
        L = self.portee
        bouts = [(L, 0, 0), (0, L, 0), (0, 0, L)]
        g = VGroup()
        for (bx, by, bz), nom in zip(bouts, noms):
            fin = self.pt(bx, by, bz)
            fleche = Arrow(self.pt(0, 0, 0), fin, buff=0, stroke_width=sw,
                           max_tip_length_to_length_ratio=0.06, color=couleur)
            t = Text(nom, font_size=fs, color=couleur, slant=ITALIC)
            direction = fin - self.pt(0, 0, 0)
            direction = direction / max(1e-9, np.linalg.norm(direction))
            t.move_to(fin + direction * 0.3)
            g.add(fleche, t)
        return g

    # ── les points ───────────────────────────────────────────────────────────
    def point(self, x, y, z, nom=None, couleur=C_POINT, r=0.075, fs=26,
              decal=UR, escalier=False, fs_nom=None):
        """Un point, son nom, et (si `escalier`) le chemin pointillé qui montre
        d'où sortent ses trois coordonnées : on avance en x, puis en y, puis on
        monte en z.
        ⭐ L'escalier EST la leçon des micros `espace_repere_coordonnees` et
        `ps_espace_norme_distance` : il montre les trois arêtes dont on fait la
        somme des carrés. ⛔ Mais il encombre : ne le demander que là où il sert.
        ⚠️ `decal` place le nom. Deux points proches ont besoin de deux `decal`
        différents, et ça ne se vérifie qu'à l'image."""
        p = self.pt(x, y, z)
        g = VGroup(Dot(p, radius=r, color=couleur))
        if nom:
            t = Text(nom, font_size=fs_nom or fs, color=couleur, weight=BOLD)
            t.move_to(p + np.array([decal[0], decal[1], 0.0]) * 0.28)
            g.add(t)
            g.nom = t
        if escalier:
            a, b, c = self.pt(x, 0, 0), self.pt(x, y, 0), p
            trace = VGroup(
                DashedLine(self.pt(0, 0, 0), a, dash_length=0.09),
                DashedLine(a, b, dash_length=0.09),
                DashedLine(b, c, dash_length=0.09),
            ).set_stroke(C_FANTOME, 3)
            g.add(trace)
            g.escalier = trace
        g.p = p
        return g

    # ── les vecteurs ─────────────────────────────────────────────────────────
    def vecteur(self, depart, arrivee, nom=None, couleur=C_VECTEUR, sw=6, fs=26,
                decal=UR, fleche_nom=True):
        """UNE VRAIE FLÈCHE de `depart` à `arrivee`, deux triplets (x, y, z).
        ⭐ C'est ce que le canvas du coach ne sait pas faire : là-bas un vecteur
        est un segment. Ici il a une pointe, donc un SENS — et le sens est la
        moitié de la notion.

        ⭐⭐ `fleche_nom=True` (le DÉFAUT depuis le 22/11/2026) : l'étiquette porte
        elle aussi sa flèche de vecteur. Auparavant une figure montrait une flèche et
        l'appelait « u » — une lettre nue, qui à l'écran d'une terminale désigne un
        NOMBRE. Mesuré ce jour-là sur les sept scripts de la série : **8 étiquettes
        nues**, dont 6 dans `espace_vecteurs`, l'épisode qui parle des vecteurs.
        ⚠️ `g.nom` est donc maintenant le GROUPE (texte + flèche), pas le seul texte :
        un `FadeIn(g.nom)` montre les deux, et un `next_to` se cale sur l'ensemble."""
        a, b = self.pt(*depart), self.pt(*arrivee)
        fleche = Arrow(a, b, buff=0, stroke_width=sw, color=couleur,
                       max_tip_length_to_length_ratio=0.12)
        g = VGroup(fleche)
        if nom:
            t = Text(nom, font_size=fs, color=couleur, weight=BOLD)
            milieu = (a + b) / 2
            t.move_to(milieu + np.array([decal[0], decal[1], 0.0]) * 0.32)
            etq = VGroup(t, fleche_de_nom(t, couleur, fs)) if fleche_nom else VGroup(t)
            g.add(etq)
            g.nom, g.texte_nom = etq, t
        g.fleche, g.a, g.b = fleche, a, b
        return g

    # ── les droites ──────────────────────────────────────────────────────────
    def droite(self, a, u, t0=-1.5, t1=2.5, nom=None, couleur=C_DROITE, sw=5,
               fs=26, decal=UR, pointille=False):
        """La droite passant par `a` (triplet) et de vecteur directeur `u`
        (triplet), tracée pour t de `t0` à `t1`.
        ⛔ Une droite ne se dessine jamais en entier, et c'est tant mieux :
        montrer un MORCEAU est exactement ce que dit la représentation
        paramétrique — on part d'un point et on avance de t fois le vecteur."""
        p0 = self.pt(*[a[i] + t0 * u[i] for i in range(3)])
        p1 = self.pt(*[a[i] + t1 * u[i] for i in range(3)])
        trait = (DashedLine(p0, p1, dash_length=0.12) if pointille else Line(p0, p1))
        trait.set_stroke(couleur, sw)
        g = VGroup(trait)
        if nom:
            t = Text(nom, font_size=fs, color=couleur, weight=BOLD, slant=ITALIC)
            t.move_to(p1 + np.array([decal[0], decal[1], 0.0]) * 0.3)
            g.add(t)
            g.nom = t
        g.trait, g.p0, g.p1 = trait, p0, p1
        return g

    # ── les plans ────────────────────────────────────────────────────────────
    def plan(self, normale, d=0.0, centre=(0, 0, 0), demi=2.0, nom=None,
             couleur=C_PLAN, op=0.30, sw=3, fs=26, decal=UR):
        """UN MORCEAU DU PLAN d'équation ax + by + cz + d = 0, `normale` = (a, b, c).

        ⭐ TEINTÉ, et c'est voulu : un plan qui n'est qu'un quadrilatère tracé se
        lit comme un cadre posé dans le vide. Avec un aplat à 30 %, on voit une
        surface — et on voit ce qui passe derrière.
        ⛔ Ce n'est qu'un MORCEAU. La voix doit le dire une fois par épisode,
        sinon l'élève croit qu'un plan s'arrête.

        `centre` : le morceau est posé en face de ce point (projeté dessus s'il
        n'y est pas) — sinon il part à l'autre bout du cadre. `demi` : sa
        demi-largeur, en unités du repère."""
        n = np.array(normale, dtype=float)
        n2 = float(n @ n)
        if n2 < 1e-12:
            raise ValueError("plan() : le vecteur normal est nul")
        c = np.array(centre, dtype=float)
        c = c - ((n @ c) + d) / n2 * n            # le projeté de `centre` sur le plan
        # Deux directions du plan : le produit vectoriel avec la base la moins
        # alignée avec n ne tombe jamais sur le vecteur nul.
        axe = min(range(3), key=lambda i: abs(n[i]))
        e = np.zeros(3)
        e[axe] = 1.0
        u1 = np.cross(n, e)
        u1 = u1 / np.linalg.norm(u1) * demi
        u2 = np.cross(n, u1)
        u2 = u2 / np.linalg.norm(u2) * demi
        coins = [c + u1 + u2, c - u1 + u2, c - u1 - u2, c + u1 - u2]
        poly = Polygon(*[self.pt(*k) for k in coins], fill_color=couleur,
                       fill_opacity=op, stroke_color=couleur, stroke_width=sw)
        g = VGroup(poly)
        if nom:
            t = Text(nom, font_size=fs, color=couleur, weight=BOLD, slant=ITALIC)
            # ⚠️ VU À L'IMAGE : posé sur `coins[0]`, le nom du plan tombait sur
            # le nom de l'axe y — les deux se lisaient « ᵖy ». Le nom va sur le
            # coin le plus à DROITE, c'est-à-dire le plus loin des axes, qui
            # partent tous de l'origine et montent vers la gauche et le haut.
            coin = max(coins, key=lambda k: float(self.pt(*k)[0]))
            t.move_to(self.pt(*coin) + np.array([decal[0], decal[1], 0.0]) * 0.3)
            g.add(t)
            g.nom = t
        g.poly, g.coins, g.centre_plan = poly, coins, c
        return g

    # ── les solides ──────────────────────────────────────────────────────────
    def cube(self, cote=3, o=(0, 0, 0), noms="ABCDEFGH", couleur=C_POINT,
             rouges=(), sw=4, fs=24, op=0.0, face=C_PLAN):
        """LE CUBE ABCDEFGH, base ABCD et dessus EFGH (E au-dessus de A).
        ⭐ C'est la convention des manuels et celle des feuilles d'exercices de
        terminale du dépôt : le repère (A ; AB, AD, AE). On garde ce nommage
        dans les douze épisodes.
        `rouges` : les sommets que la question regarde (en ambre).
        Les trois arêtes cachées (celles qui partent de D) sont en pointillé."""
        ox, oy, oz = o
        k = cote
        P3 = {
            "A": (ox, oy, oz), "B": (ox + k, oy, oz), "C": (ox + k, oy + k, oz),
            "D": (ox, oy + k, oz), "E": (ox, oy, oz + k), "F": (ox + k, oy, oz + k),
            "G": (ox + k, oy + k, oz + k), "H": (ox, oy + k, oz + k),
        }
        nom_de = dict(zip("ABCDEFGH", noms))
        vues = [("A", "B"), ("B", "C"), ("E", "F"), ("F", "G"), ("G", "H"),
                ("A", "E"), ("B", "F"), ("C", "G")]
        cachees = [("A", "D"), ("D", "C"), ("D", "H")]
        g = VGroup()
        if op > 0:
            for q in (("A", "B", "F", "E"), ("B", "C", "G", "F"), ("E", "F", "G", "H")):
                g.add(Polygon(*[self.pt(*P3[s]) for s in q], fill_color=face,
                              fill_opacity=op, stroke_width=0))
        for s1, s2 in vues:
            g.add(Line(self.pt(*P3[s1]), self.pt(*P3[s2])).set_stroke(couleur, sw))
        for s1, s2 in cachees:
            g.add(DashedLine(self.pt(*P3[s1]), self.pt(*P3[s2]),
                             dash_length=0.1).set_stroke(couleur, sw * 0.6))
        # Les noms : vers l'extérieur du cube, sommet par sommet. Mesuré à
        # l'image sur la planche — ⛔ ne pas « simplifier » en un seul décalage.
        # ⚠️ VU À L'IMAGE : « F » posé en DR tombait DANS le cube, sous G.
        # F est le coin avant-haut-droit, donc sur le bord : son nom va à DROITE.
        # ⭐ D reste à gauche : en cavalière, D se projette À L'INTÉRIEUR du
        # carré avant (c'est la convention des manuels, pas un défaut) ; c'est
        # pour ça que les trois arêtes qui en partent sont en pointillé.
        decal = {"A": DL, "B": DR, "C": RIGHT, "D": LEFT, "E": UL, "F": RIGHT,
                 "G": UR, "H": UP}
        for s, xyz in P3.items():
            c = C_REGARD if s in rouges else couleur
            t = Text(nom_de[s], font_size=fs, color=c, weight=BOLD)
            t.move_to(self.pt(*xyz) + np.array([decal[s][0], decal[s][1], 0.0]) * 0.26)
            g.add(t)
        g.P3, g.sommet = P3, lambda s: self.pt(*P3[s])
        return g

    def tetraedre(self, sommets, noms=("O", "A", "B", "C"), couleur=C_POINT,
                  sw=4, fs=24, op=0.18, face=C_PLAN):
        """Un tétraèdre : quatre points (triplets), six arêtes, une face teintée.
        Le premier sommet est celui d'où partent les vecteurs ; il est en ambre."""
        P3 = [np.array(s, dtype=float) for s in sommets]
        g = VGroup()
        if op > 0:
            g.add(Polygon(*[self.pt(*P3[i]) for i in (0, 1, 2)], fill_color=face,
                          fill_opacity=op, stroke_width=0))
        for i, j in ((0, 1), (0, 2), (0, 3), (1, 2), (1, 3)):
            g.add(Line(self.pt(*P3[i]), self.pt(*P3[j])).set_stroke(couleur, sw))
        g.add(DashedLine(self.pt(*P3[2]), self.pt(*P3[3]), dash_length=0.1)
              .set_stroke(couleur, sw * 0.6))
        decal = (DL, DR, RIGHT, UP)   # ⚠️ le 3e sommet fuit : son nom va à DROITE
        for i, s in enumerate(P3):
            c = C_REGARD if i == 0 else couleur
            t = Text(noms[i], font_size=fs, color=c, weight=BOLD)
            t.move_to(self.pt(*s) + np.array([decal[i][0], decal[i][1], 0.0]) * 0.26)
            g.add(t)
        g.P3 = P3
        return g

    # ── les marques de l'espace ──────────────────────────────────────────────
    def angle_droit(self, sommet, vers1, vers2, taille=0.3, couleur=C_NORMALE, sw=4):
        """Le petit carré de l'angle droit, au sommet, entre deux directions.
        ⚠️⚠️ EN CAVALIÈRE, UN ANGLE DROIT N'EST PAS DROIT À L'ÉCRAN. Ce carré est
        donc une CONVENTION qui dit « ici, c'est 90° dans l'espace », pas une
        mesure qu'on lit. La voix doit le dire la première fois qu'il apparaît,
        sinon l'élève croit pouvoir lire les angles sur le dessin — et c'est
        exactement l'erreur que la perspective fabrique."""
        s = self.pt(*sommet)
        d1 = self.pt(*vers1) - s
        d2 = self.pt(*vers2) - s
        d1 = d1 / max(1e-9, np.linalg.norm(d1)) * taille
        d2 = d2 / max(1e-9, np.linalg.norm(d2)) * taille
        return VGroup(Line(s + d1, s + d1 + d2), Line(s + d2, s + d1 + d2)).set_stroke(couleur, sw)

    def perpendiculaire(self, depuis, plan_normale, longueur=1.0, couleur=C_NORMALE, sw=5):
        """Le trait pointillé qui descend d'un point vers un plan, dans la
        direction de la normale. ⛔ On l'ARRÊTE avant le plan quand le pied est
        la réponse cherchée : montrer PAR OÙ ça descend, pas OÙ ça tombe."""
        n = np.array(plan_normale, dtype=float)
        n = n / max(1e-9, np.linalg.norm(n))
        a = np.array(depuis, dtype=float)
        b = a - n * longueur
        return DashedLine(self.pt(*a), self.pt(*b), dash_length=0.1).set_stroke(couleur, sw)


# ⛔⛔ LE NOYAU DE LA CAVALIÈRE — UN PLAN PEUT SE PROJETER SUR UNE DROITE (22/11/2026)
#
# La projection envoie (x, y, z) sur (x + 0,41 y ; z + 0,287 y). Elle écrase donc
# EXACTEMENT une direction, celle qui va sur (0 ; 0) :
NOYAU = np.array([-FUITE[0], 1.0, -FUITE[1]])      # ≈ (−0,41 ; 1 ; −0,287)
#
# ⭐⭐ Tout plan qui CONTIENT cette direction se dessine comme une LAME, et un plan qui
# la contient exactement se dessine comme un TRAIT. Mesuré sur l'épisode 5, où deux
# écrans étaient touchés et où rien ne l'avait dit — ni l'audit, ni BORDS, ni
# verifier-avant-rendu : la figure est dans le cadre, elle est simplement plate.
#
#   normale du plan   angle de la normale au noyau   épaisseur projetée   lisible ?
#   (1 ; 1 ; −1)              26,9°                       0,40             ✅
#   (0 ; 0 ; 1)               14,9°                       0,34             ✅
#   (1 ; 1 ; 1)                9,0°                       0,13             ⛔ une lame
#   (1 ; 1 ; 2)                0,4°                       0,01             ⛔⛔ un trait
#
# ⚠️ Et on ne choisit PAS l'équation : c'est la voix qui la dicte. Agrandir `demi`
# n'arrange rien (l'épaisseur grandit comme la longueur, la lame reste une lame), et
# le choix de u1/u2 n'y change rien non plus — la projection d'un plan ne dépend que
# du plan. ⭐ Le remède est de ne pas projeter : on DESSINE le plan à plat
# (`plan_dessine` ci-dessous), comme un manuel le fait.
#
# ⭐ À appeler AVANT de poser un morceau de plan dans un écran :
def platitude(normale):
    """L'angle, en degrés, entre la normale du plan et le noyau de la projection.
    Au-dessus de ~12° le morceau se lit comme une surface ; en dessous, c'est une
    lame, et il faut `plan_dessine` à la place."""
    n = np.array(normale, dtype=float)
    cos = abs(float(n @ NOYAU)) / (np.linalg.norm(n) * np.linalg.norm(NOYAU))
    return math.degrees(math.asin(min(1.0, cos)))


def plan_dessine(largeur=2.8, profondeur=1.05, cisaille=0.55, couleur=C_PLAN, nom=None,
                 op=0.26, sw=4, fs=26, decal=UR):
    """UN PLAN DESSINÉ À PLAT — un parallélogramme sur la page, PAS une projection.

    ⭐ C'est la figure des manuels, et c'est le seul recours quand `platitude()` dit
    que le vrai plan se projetterait sur une lame (voir le bloc ci-dessus). Elle ne
    ment pas : elle ne prétend pas montrer OÙ est le plan dans le repère, elle montre
    CE QU'EST un plan — et c'est précisément ce que demandent les écrans « deux plans
    parallèles » et « droite parallèle à un plan ».
    ⛔ Donc : jamais dans un repère. Un parallélogramme posé à côté d'axes se lirait
    comme un morceau de plan DU repère, et il serait faux."""
    l, p = largeur / 2.0, profondeur / 2.0
    coins = [np.array([-l - cisaille, -p, 0.0]), np.array([l - cisaille, -p, 0.0]),
             np.array([l + cisaille, p, 0.0]), np.array([-l + cisaille, p, 0.0])]
    poly = Polygon(*coins, fill_color=couleur, fill_opacity=op, stroke_color=couleur,
                   stroke_width=sw)
    g = VGroup(poly)
    if nom:
        t = Text(nom, font_size=fs, color=couleur, weight=BOLD, slant=ITALIC)
        t.move_to(coins[2] + np.array([decal[0], decal[1], 0.0]) * 0.28)
        g.add(t)
        g.nom = t
    g.poly, g.coins = poly, coins
    return g


def mesure_cadre(*groupes):
    """Les bords (x_min, x_max, y_min, y_max) de ce qu'on vient de poser.
    ⭐ À appeler AVANT de rendre, sur toute figure large : la marge de 3 % est
    x ∈ [−6,68 ; 6,68] et y ∈ [−3,573 ; 3,573], et sur un écran de QUESTION la
    figure doit finir au-dessus de y = −0,75."""
    g = VGroup(*groupes)
    return (float(g.get_left()[0]), float(g.get_right()[0]),
            float(g.get_bottom()[1]), float(g.get_top()[1]))


class PlancheEspace3D(Scene):
    """LA PLANCHE DE CONTRÔLE : toutes les primitives, d'un coup, en une image.
    ⭐ Elle existe pour qu'on REGARDE la boîte à outils au lieu de la relire.
    C'est la leçon la plus chère de la série des entiers : la moitié des défauts
    n'étaient visibles qu'à l'image.
    Rendu : ... -ql ... manim/poste2/espace3d.py PlancheEspace3D
    """

    # ⭐ Une grille mesurée, pas « à peu près ». Chaque panneau tient dans
    # 3,45 × 2,6 ; une primitive qui va jusqu'à (3 ; 3 ; 3) avec u = 0,36 occupe
    # 1,53 en largeur et 1,39 en hauteur depuis l'origine de son repère.
    # ⛔ La première version posait les panneaux à vue : la rangée du haut
    # tombait sur les étiquettes de celle du bas.
    COLONNES = (-6.25, -2.80, 0.65, 4.10)
    RANGEES = (0.95, -2.55)          # l'origine du repère de chaque rangée
    U, PORTEE = 0.36, 3

    def construct(self):
        self.camera.background_color = "#0f172a"
        titre = Text("espace3d.py — la boîte à outils de la série « espace »",
                     font_size=26, color="#e2e8f0", weight=BOLD)
        titre.to_edge(UP, buff=0.18)
        self.add(titre)

        def repere(col, rangee):
            return Repere3D(o=np.array([self.COLONNES[col], self.RANGEES[rangee], 0.0]),
                            u=self.U, portee=self.PORTEE)

        def etiquette(txt, col, rangee):
            t = Text(txt, font_size=17, color="#94a3b8")
            # ⚠️ −0,80 et non −0,45 : les noms des sommets du bas d'un cube
            # descendent de 0,26 sous l'origine, et mordaient sur la légende.
            t.move_to(np.array([self.COLONNES[col] + 0.85, self.RANGEES[rangee] - 0.80, 0.0]))
            return t

        # ── rangée du haut ──────────────────────────────────────────────────
        r1 = repere(0, 0)
        self.add(r1.axes(), r1.point(3, 2, 3, "M", couleur=C_REGARD, escalier=True),
                 etiquette("point + escalier", 0, 0))

        r2 = repere(1, 0)
        self.add(r2.axes(),
                 r2.vecteur((0, 0, 0), (3, 1, 2), "u", couleur=C_VECTEUR),
                 r2.vecteur((0, 0, 0), (1, 3, 1), "v", couleur=C_VECTEUR2, decal=DR),
                 etiquette("deux vecteurs (flèches)", 1, 0))

        # ⚠️ Le nom du plan tombait sur le nom de l'axe y : il est posé sur le
        # coin du morceau le plus éloigné des axes, donc décalé vers le haut.
        r3 = repere(2, 0)
        self.add(r3.axes(),
                 r3.plan((0, 0, 1), 0, centre=(1.6, 1.6, 0), demi=1.5, nom="P", decal=UR),
                 r3.vecteur((1.6, 1.6, 0), (1.6, 1.6, 2.6), "n", couleur=C_NORMALE),
                 r3.angle_droit((1.6, 1.6, 0), (3.2, 1.6, 0), (1.6, 1.6, 2)),
                 etiquette("plan teinté + normale", 2, 0))

        r4 = repere(3, 0)
        self.add(r4.axes(),
                 r4.plan((0, 0, 1), 0, centre=(1.6, 1.6, 0), demi=1.5, nom="P", decal=UR),
                 r4.droite((1.6, 1.6, 0), (1, 0.4, 1.3), -1.2, 1.2, nom="d"),
                 etiquette("droite et plan", 3, 0))

        # ── rangée du bas ───────────────────────────────────────────────────
        r5 = repere(0, 1)
        cube = r5.cube(cote=3, rouges=("A", "G"))
        self.add(cube,
                 Line(cube.sommet("A"), cube.sommet("G")).set_stroke(C_REGARD, 5),
                 etiquette("cube + grande diagonale", 0, 1))

        r6 = repere(1, 1)
        self.add(r6.tetraedre([(0, 0, 0), (3, 0, 0), (0, 3, 0), (0, 0, 3)]),
                 etiquette("tétraèdre", 1, 1))

        r7 = repere(2, 1)
        self.add(r7.plan((0, 0, 1), 0, centre=(1.6, 1.6, 0), demi=1.5, nom="P", decal=DR),
                 r7.point(1.6, 1.6, 2.8, "M", couleur=C_REGARD),
                 r7.perpendiculaire((1.6, 1.6, 2.8), (0, 0, 1), longueur=1.4),
                 etiquette("distance : PAR OÙ, pas OÙ", 2, 1))

        # Une droite seule, avec son point de base : la micro « paramétrique ».
        r8 = repere(3, 1)
        self.add(r8.axes(),
                 r8.droite((0.6, 0.6, 0.4), (1, 0.6, 0.8), -0.5, 2.6, nom="d"),
                 r8.point(0.6, 0.6, 0.4, "A", couleur=C_REGARD, decal=DR),
                 etiquette("droite : un point, un sens", 3, 1))

        self.wait(0.1)
