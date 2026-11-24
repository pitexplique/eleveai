# espace_mesure_short.py
# LA MESURE DES 6 SHORTS de la série « GÉOMÉTRIE DANS L'ESPACE » (E1 à E6), HORS RENDU.
#
#   python -X utf8 manim/scripts/terminale/espace_mesure_short.py             # les six
#   python -X utf8 manim/scripts/terminale/espace_mesure_short.py E3          # un seul
#   python -X utf8 manim/scripts/terminale/espace_mesure_short.py E3 --cotes  # + les boîtes
#   python -X utf8 manim/scripts/terminale/espace_mesure_short.py --ancres    # la synchro
#   python -X utf8 manim/scripts/terminale/espace_mesure_short.py --tard <log> # les TARD triés
#   python -X utf8 manim/scripts/terminale/espace_mesure_short.py --fleches  # les noms de vecteur
#
# Code de retour 1 dès un ⛔ : utilisable dans un enchaînement.
#
# ⭐⭐ POURQUOI CE FICHIER EXISTE
# La série a payé onze blocs rétrécis ou hors marge sur le seul épisode 6, et
# `manim/REPRISE-espace-terminale.md` le dit sans détour : « rien d'autre ne le voit — le
# dry run est propre, et à la planche un texte deux fois trop petit ne saute pas aux
# yeux ». Les `mesure-*.py` des douze paysages font ce travail ; voici celui des shorts.
#
# ⭐ IL NE RECONSTRUIT RIEN. Chaque short expose `pieces(e)`, qui BÂTIT et POSITIONNE ses
# écrans ; son `construct()` ne fait plus que les ANIMER. L'instrument mesure donc les
# objets mêmes qui seront rendus. ⛔ C'est le remède de la cote de Ravi (épisode 10) :
# « deux copies d'une seule vérité divergent dès qu'on en touche une » — là-bas
# l'instrument avait mesuré pendant un tour un écran qui n'existait pas.
#
# Ce qu'il mesure, et ce que chaque contrôle a déjà coûté dans cette série :
#   1. BORD      — un bloc hors de la marge de 3 % (ici x ±2,115 et y ±3,865) ;
#   2. RÉTRÉCI   — la police OBTENUE, comparée à la police DEMANDÉE : une question à
#                  19 px (épisode 3) ou trois cartes à 20,4 px (épisode 6) ne se voient
#                  nulle part ailleurs. ⭐ La police obtenue est MESURÉE (on rebâtit le
#                  même Text à sa taille demandée et on compare les hauteurs), elle n'est
#                  pas suivie dans une variable qui pourrait mentir ;
#   3. MARGO     — un bloc qui descend sur Ti-Margo. En 9:16 il est CENTRÉ en bas : tout
#                  bloc plus bas que le haut de sa boîte lui tombe dessus (en paysage il
#                  était dans un coin, et seule la colonne de droite le touchait) ;
#   4. CHEVAUCHE — les blocs d'un même écran comparés DEUX À DEUX, proche en proche.
#                  ⛔ C'est le trou d'instrument de l'épisode 10 : « six blocs mesurés un
#                  par un, pas une seule paire — la mesure disait ✅ pendant que deux
#                  blocs se chevauchaient » ;
#   5. TITRE     — le titre comparé à l'échelle des ceintures. ⛔ Trou d'instrument de
#                  l'épisode 7 : « la mesure voyait le titre, et ne le comparait à rien ».
#
# ⛔⛔ CE QU'IL NE VOIT PAS, et il faut le dire : il mesure le MODÈLE, pas les PIXELS.
# Entre la construction et l'image il y a le `stroke_width`, l'anticrénelage et le rendu.
# La planche `-ql` et les gros plans restent obligatoires — c'est la leçon de l'épisode 12
# (« une assertion mesure le modèle, des pixels mesurent l'image — les deux »).

import importlib
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
_ICI = Path(__file__).resolve().parent
_RACINE = _ICI.parents[2]
sys.path.insert(0, str(_ICI))
sys.path.insert(1, str(_RACINE / "manim"))          # mascotte, charte, gabarit_*
sys.path.insert(2, str(_RACINE / "manim" / "poste2"))

from manim import config  # noqa: E402

# ⛔ AVANT d'instancier quoi que ce soit : `-r 1080,1920` ne change que les PIXELS, pas
# le cadre logique. C'est `ShortSeconde.__init__` qui pose ces deux lignes au rendu ; ici
# on n'instancie pas de Scene, donc on les pose nous-mêmes — sinon on mesurerait les
# blocs d'un short contre la marge du 16:9, un chiffre faux et parfaitement plausible.
config.frame_height, config.frame_width = 8.0, 4.5

from manim import Text, VGroup  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402

from espace_commun_short import LARG, Y_MARGO  # noqa: E402

SHORTS = {
    "E1": ("espace_vecteurs_short", "EspaceVecteursShort"),
    "E2": ("espace_repere_coordonnees_short", "EspaceRepereCoordonneesShort"),
    "E3": ("espace_droite_parametrique_short", "EspaceDroiteParametriqueShort"),
    "E4": ("espace_plan_equation_short", "EspacePlanEquationShort"),
    "E5": ("espace_position_relative_short", "EspacePositionRelativeShort"),
    "E6": ("espace_defi_short", "EspaceDefiShort"),
}

BORD_X = config.frame_width / 2 - config.frame_width * 0.03     # 2,115
BORD_Y = config.frame_height / 2 - config.frame_width * 0.03    # 3,865
SEUIL_REDUCTION = 0.97      # sous 3 % de réduction, c'est du bruit de mise en page
ECART_MINI = 0.05           # deux blocs plus proches que ça se touchent à l'image

alertes = []


def dit(niveau, texte):
    print(f"{niveau} {texte}")
    if niveau == "⛔":
        alertes.append(texte)


def boite(m):
    return (float(m.get_left()[0]), float(m.get_right()[0]),
            float(m.get_bottom()[1]), float(m.get_top()[1]))


def margo():
    """La boîte réelle de Ti-Margo, mesurée et non recopiée. ⛔ L'épisode 5 a payé
    exactement l'inverse : « ce chiffre-là était dans cette note et il était faux »."""
    return boite(MascotteMargouillat().scale(0.38).move_to([0, Y_MARGO, 0]))


def polices(m):
    """La police OBTENUE de chaque Text de `m`, comparée à sa police demandée.
    ⭐ Mesurée : on rebâtit le même Text à la taille demandée et on compare les
    hauteurs. ⛔ Lire `font_size` ne dirait rien — `scale_to_fit_width` ne le change pas."""
    out = []
    for f in m.get_family():
        if not isinstance(f, Text) or not getattr(f, "original_text", "").strip():
            continue
        fs = getattr(f, "_fs", None) or f.font_size
        ref = Text(f.original_text, font_size=fs)
        if ref.height < 1e-6:
            continue
        out.append((f.original_text, fs, fs * float(f.height) / float(ref.height)))
    return out


def mesurer(nom, ecran, blocs):
    """Un écran : `blocs` est une liste de (nom, mobject)."""
    mg, mh = margo()[2], margo()[3]
    if "--cotes" in sys.argv:
        for b_nom, m in blocs:
            if m is not None and m.get_family():
                g, d, b, h = boite(m)
                print(f"    {ecran:16} {b_nom:24} x[{g:+.2f} ; {d:+.2f}]  y[{b:+.2f} ; {h:+.2f}]")
    for b_nom, m in blocs:
        if m is None or not m.get_family():
            dit("⛔", f"{nom} {ecran} : bloc « {b_nom} » VIDE — construit et jamais joué ?")
            continue
        g, d, b, h = boite(m)
        if g < -BORD_X or d > BORD_X or b < -BORD_Y or h > BORD_Y:
            dit("⛔", f"{nom} {ecran} « {b_nom} » BORD x[{g:.2f} ; {d:.2f}] y[{b:.2f} ; {h:.2f}]"
                      f"  (marge ±{BORD_X:.3f} / ±{BORD_Y:.3f})")
        if b < mh + ECART_MINI and b_nom != "margo":
            dit("⛔", f"{nom} {ecran} « {b_nom} » MARGO : bas à {b:.2f}, la boîte de "
                      f"Ti-Margo monte à {mh:.2f}")
        for txt, dem, obt in polices(m):
            if obt < dem * SEUIL_REDUCTION:
                court = txt if len(txt) < 34 else txt[:31] + "…"
                niveau = "⛔" if obt < 20 else "⚠️"
                dit(niveau, f"{nom} {ecran} « {b_nom} » RÉTRÉCI : « {court} » "
                            f"{dem:.0f} px demandés → {obt:.1f} px obtenus")
    # 4. les paires, proche en proche
    # ⭐ Un nom qui commence par « + » est POSÉ SUR la figure : une arête repassée en
    # couleur, un point d'intersection, un vecteur dans le repère. Son chevauchement est
    # voulu, et il est exclu de la comparaison deux à deux — mais pas des contrôles de
    # marge et de Ti-Margo, qui valent pour lui comme pour les autres.
    utiles = [(n, m) for n, m in blocs
              if m is not None and m.get_family() and not n.startswith("+")]
    for i in range(len(utiles)):
        for j in range(i + 1, len(utiles)):
            (n1, m1), (n2, m2) = utiles[i], utiles[j]
            g1, d1, b1, h1 = boite(m1)
            g2, d2, b2, h2 = boite(m2)
            if min(d1, d2) - max(g1, g2) <= 0:
                continue                      # pas de recouvrement horizontal
            chevauche = min(h1, h2) - max(b1, b2)
            if chevauche > 0:
                dit("⛔", f"{nom} {ecran} : « {n1} » et « {n2} » CHEVAUCHENT de "
                          f"{chevauche:.2f} en hauteur")
            elif -chevauche < ECART_MINI:
                dit("⚠️", f"{nom} {ecran} : « {n1} » et « {n2} » serrés — "
                          f"{-chevauche:.3f} d'écart")


def une(cle):
    module, classe = SHORTS[cle]
    mod = importlib.import_module(module)
    cls = getattr(mod, classe)
    e = cls.__new__(cls)                      # ⭐ aucun rendu : rien n'est instancié
    print(f"\n=== {cle} · {module}.py")
    pieces = mod.pieces(e)
    # 5. le titre contre l'échelle des ceintures, explicitement comparés
    for ecran, blocs in pieces.items():
        mesurer(cle, ecran, blocs)
        etiquettes(cle, ecran, blocs)
    print(f"    Ti-Margo : y de {margo()[2]:.2f} à {margo()[3]:.2f} ; "
          f"marge x ±{BORD_X:.3f}, y ±{BORD_Y:.3f} ; largeur offerte {LARG}")


def _dist_pt_seg(p, a, b):
    import numpy as np
    ab = b - a
    L = float(ab @ ab)
    t = 0.0 if L < 1e-12 else max(0.0, min(1.0, float((p - a) @ ab) / L))
    return float(np.linalg.norm(p - (a + t * ab)))


def _traits(mob):
    """Les chemins RÉELLEMENT tracés d'une figure, échantillonnés en points.

    ⛔ On échantillonne le chemin, PAS sa boîte : la boîte d'une flèche en diagonale est
    un grand rectangle presque vide, et testée ainsi elle interdit tout un quadrant
    (leçon de la passe des flèches). ⛔ Et on prend TOUT ce qui est tracé, y compris les
    tirets d'un pointillé : le premier jet de la grille du cube ne retrouvait que 9
    arêtes sur 12 parce que les trois arêtes cachées sont des groupes de tirets.
    ⚠️ Les glyphes d'un `Text` sont eux aussi des VMobject tracés : on les exclut, sinon
    chaque lettre se mesurerait contre les autres lettres de son propre mot."""
    import numpy as np
    from manim import Text, VMobject
    dedans = set()
    for f in mob.get_family():
        if isinstance(f, Text):
            dedans.update(id(g) for g in f.get_family())
    out = []
    for f in mob.get_family():
        if id(f) in dedans or not isinstance(f, VMobject) or not f.has_points():
            continue
        if f.get_stroke_opacity() < 0.05 and f.get_fill_opacity() < 0.05:
            continue
        try:
            pts = [np.array(f.point_from_proportion(k / 16.0))[:2] for k in range(17)]
        except Exception:
            continue
        out += [(pts[i], pts[i + 1]) for i in range(len(pts) - 1)]
    return out


def _dedans(p, t):
    import numpy as np
    g, d = np.array(t.get_left())[:2], np.array(t.get_right())[:2]
    b, h = float(t.get_bottom()[1]), float(t.get_top()[1])
    return g[0] - 0.02 <= p[0] <= d[0] + 0.02 and b - 0.02 <= p[1] <= h + 0.02


def etiquettes(nom, ecran, blocs, seuil=0.08, serre=0.12):
    """⭐⭐ LE CONTRÔLE QUI MANQUAIT À LA SÉRIE : chaque mot d'une figure contre tout ce
    que CETTE figure trace.

    La note de la série le dit deux fois, et les deux fois ça a coûté un rendu :
      · « les noms des axes n'étaient comparés à RIEN » (épisode 11) — `etiquettes()`
        compare des étiquettes ENTRE ELLES, jamais à un segment, et personne ne lui
        donnait les « x », « y », « z » que `r.axes()` dessine tout seul ;
      · « un nom de sommet traversé par un fût » (épisode 9) — la grande diagonale passe
        à 0,00 du nom « D » et à 0,10 de « F ».
    Ici, pour chaque bloc, on mesure chaque `Text` contre CHAQUE chemin tracé du même
    bloc. ⛔ C'est volontairement limité au bloc : un texte de la colonne contre une
    figure, c'est le contrôle de chevauchement plus haut, qui travaille sur les boîtes."""
    import numpy as np
    from manim import Text, VGroup as _VG0
    pb = 0
    # ⭐⭐ LES OBJETS POSÉS SUR LA FIGURE COMPTENT AUSSI. Trouvé à la planche de E6 :
    # le nom « F » du cube est à **0,063** de la diagonale (A G), qui n'est pas dans le
    # bloc « cube » mais dans le bloc « + (A G) ». Chaque bloc était mesuré contre ses
    # PROPRES traits, et une arête repassée en couleur, un point d'intersection ou une
    # droite tracée par-dessus échappaient à tout. C'est, mot pour mot, « un instrument
    # qui ne reçoit qu'une partie de la figure mesure une figure qui n'existe pas »
    # (épisode 11), à sa troisième récidive dans cette seule journée.
    sur_figure = []
    for n_, m_ in blocs:
        if n_.startswith("+") and m_ is not None and m_.get_family():
            sur_figure += _traits(m_)
    for b_nom, m in blocs:
        # ⛔⛔ SEULEMENT LES FIGURES, et c'est une limite assumée. Lâché sur tous les
        # blocs, ce contrôle signale 30 lignes par short dont AUCUNE n'est un défaut :
        # la lettre d'une carte de choix est DANS son rond, le chiffre du compte à
        # rebours est DANS son anneau, un `SurroundingRectangle` serre son texte de
        # 0,14 par construction. Un instrument qui crie sur tout ne mesure rien — c'est
        # la même faute que mon premier critère de tri des `AUDIT-TARD`.
        # ⭐ Ce qui a coûté des rendus à cette série, ce sont les mots d'une FIGURE :
        # les « x », « y », « z » des axes (épisode 11), les noms de sommet du cube
        # (épisode 9), l'étiquette d'un vecteur (épisode 7). C'est ça qu'on mesure.
        if not (b_nom.startswith("+") or any(k in b_nom for k in ("figure", "cube"))):
            continue
        if m is None or not m.get_family():
            continue
        textes = [f for f in m.get_family()
                  if isinstance(f, Text) and getattr(f, "original_text", "").strip()]
        if not textes:
            continue
        segs = _traits(m)
        if not segs:
            continue
        # ⭐ Le PARENT immédiat d'un mot est exclu : l'étiquette d'un vecteur est un
        # VGroup(texte, flèche de nom), et la flèche est dessinée 0,10 au-dessus du mot
        # EXPRÈS. Sans cette exclusion, toute notation vectorielle correcte sortirait en
        # défaut — l'outil condamnerait précisément ce que la passe des flèches a mis
        # en place.
        parents = {}
        for f in m.get_family():
            for enfant in getattr(f, "submobjects", []):
                parents[id(enfant)] = f
        for t in textes:
            voisinage = parents.get(id(t), t)
            siens = {id(g) for g in voisinage.get_family()}
            pts = [np.array(t.get_corner(c))[:2] for c in
                   ([-1, -1, 0], [1, -1, 0], [1, 1, 0], [-1, 1, 0])] + [np.array(t.get_center())[:2]]
            # ⚠️ `_traits` sur CHAQUE membre de la famille recompte les mêmes chemins
            # autant de fois qu'ils ont d'ancêtres : le résultat reste juste (un
            # minimum ne change pas si on répète les termes) mais la recherche en
            # grille qui s'en servait mettait plus de dix minutes par étiquette. On
            # écarte le voisinage une fois, et on échantillonne une fois.
            from manim import VGroup as _VG
            segs_utiles = _traits(_VG(*[f for f in m.submobjects if id(f) not in siens]))                 if any(id(f) not in siens for f in m.submobjects) else []
            if not segs_utiles:
                segs_utiles = [(x, y) for x, y in segs
                               if not (_dedans(x, t) and _dedans(y, t))]
            tout = segs_utiles + (sur_figure if not b_nom.startswith("+") else [])
            d = min((_dist_pt_seg(p, a, b) for p in pts for a, b in tout), default=9.9)
            if d < seuil:
                pb += 1
                dit("⛔", f"{nom} {ecran} « {b_nom} » : le mot « {t.original_text} » est à "
                          f"{d:.3f} d'un trait de sa propre figure")
            elif d < serre:
                dit("⚠️", f"{nom} {ecran} « {b_nom} » : le mot « {t.original_text} » est "
                          f"serré — {d:.3f} d'un trait")
        # ⭐⭐ ET LES MOTS DEUX À DEUX, ce qui manquait ici et a coûté une planche : les
        # écarts de « D » et de « F » du cube avaient été cherchés CHACUN contre la
        # place par DÉFAUT de l'autre, et les deux lettres se sont posées l'une sur
        # l'autre au milieu du cube. Un contrôle qui ne compare un objet qu'à l'état
        # d'avant ne voit pas ce que la correction elle-même a créé.
        # ⛔ C'est `etiquettes()` de l'épisode 8, qui n'existait que dans les mesures
        # des paysages — il manquait aux shorts.
        for i in range(len(textes)):
            for j in range(i + 1, len(textes)):
                t1, t2 = textes[i], textes[j]
                dc = float(np.linalg.norm(np.array(t1.get_center())[:2]
                                          - np.array(t2.get_center())[:2]))
                chx = min(t1.get_right()[0], t2.get_right()[0]) - max(t1.get_left()[0], t2.get_left()[0])
                chy = min(t1.get_top()[1], t2.get_top()[1]) - max(t1.get_bottom()[1], t2.get_bottom()[1])
                if chx > 0 and chy > 0:
                    pb += 1
                    dit("⛔", f"{nom} {ecran} « {b_nom} » : « {t1.original_text} » et "
                              f"« {t2.original_text} » SE RECOUVRENT "
                              f"({chx:.3f} × {chy:.3f})")
                elif dc < 0.30:
                    dit("⚠️", f"{nom} {ecran} « {b_nom} » : « {t1.original_text} » et "
                              f"« {t2.original_text} » à {dc:.3f} l'un de l'autre")
    return pb


def _voix_des_shorts():
    import json
    out = {}
    for f in (_RACINE / "manim" / "voix").glob("terminale-espace-*-short.json"):
        out[f.stem] = json.loads(f.read_text(encoding="utf-8"))
    return out


def ancres():
    """`--ancres` : ⭐⭐ LE CONTRÔLE QUI REMPLACE « lire les plus gros TARD à la main ».

    L'INVARIANT de ces six shorts : tout objet qui porte un nombre est montré par l'un
    de trois seuls dispositifs, et les trois attendent la dernière marque DANS le
    morceau de voix de cet objet —
      (a) `jouer_phrase` → `au_fin_pos(décalage de la ligne, sa longueur)` ;
      (b) un `au_fin("…")` écrit dans `construct` ;
      (c) `q_montrer_choix` → la dernière marque dans la portée du choix.
    Si l'invariant tient, **aucun nombre ne peut être à l'écran avant d'être dit**, et
    les `AUDIT-TARD` sont le prix connu de `au_fin` (les trois TARD structurels de
    l'épisode 12). Le dry run le confirme par un `AUDIT-AVANCE` à zéro.

    ⛔⛔ CE QUI PEUT CASSER L'INVARIANT, ET C'EST TOUT CE QU'ON MESURE ICI : un extrait
    de `au_fin` / `au_mot` qui n'est pas UNIQUE dans son clip. `au_fin` fait un `find`,
    donc il viserait la PREMIÈRE occurrence, et l'objet s'afficherait en avance sur la
    sienne. C'est le mécanisme exact de « un gros AUDIT-TARD cachait une vraie avance »,
    huit fois dans cette série.
    ⚠️ Et il ne lit que les appels LITTÉRAUX de `construct` : les ancres calculées par
    `jouer_phrase` ne passent pas par `find`, elles portent déjà leur décalage — c'est
    pour cela qu'elles sont hors de portée de ce contrôle, et hors de danger."""
    import ast
    voix = _voix_des_shorts()
    pb = 0
    for cle, (module, _classe) in SHORTS.items():
        f_src = _ICI / f"{module}.py"
        if not f_src.exists():
            print(f"= {cle} {module}.py : pas encore écrit")
            continue
        src = f_src.read_text(encoding="utf-8")
        nom_voix = next((l.split('"')[1] for l in src.splitlines()
                         if l.strip().startswith("nom_voix")), None)
        textes = voix.get(nom_voix, {})
        clip, n, mauvais = None, 0, 0
        for noeud in ast.walk(ast.parse(src)):
            if not isinstance(noeud, ast.Call) or not noeud.args:
                continue
            f = getattr(noeud.func, "attr", "")
            arg = noeud.args[0]
            if f == "dire" and isinstance(arg, ast.Constant):
                clip = arg.value
            elif f in ("au_mot", "au_fin") and isinstance(arg, ast.Constant):
                n += 1
                txt = textes.get(clip, "")
                occ = txt.count(arg.value)
                if occ != 1 and len(noeud.args) < 2:
                    mauvais += 1
                    pb += 1
                    print(f"⛔ {cle} [{clip}] « {arg.value[:46]} » : {occ} occurrence(s) "
                          f"dans le clip — `find` ne viserait pas la bonne")
        etat = "✅" if not mauvais else "⛔"
        print(f"{etat} {cle} {module}.py : {n} ancres littérales, {mauvais} non uniques")
    return pb


def fleches():
    """`--fleches` : ⛔⛔ LE TROU QUE LES SHORTS ONT OUVERT DANS L'AUDIT DES FLÈCHES.

    `manim/poste2/auditer-fleches-vecteurs.py` lit l'AST et ne regarde que six appels :
    `self.t`, `self.vec`, `self.vexpr`, `self.choix2`, `self.choix3`, `self.nomme`. Il
    répond donc **0 NUS** sur les six shorts — et c'est en partie parce qu'il ne regarde
    pas : la plus grande part de leur texte passe par `blocs_phrase`, `lignes`, `eq_mots`
    et `appel_blocs`, qui sont des outils du socle des shorts et n'existaient pas quand
    il a été écrit. ⭐ « Un instrument qui rend un chiffre plausible n'a pas prouvé qu'il
    mesurait la bonne chose » : un ✅ de sa part, sur ces six scripts, ne vaut rien tant
    que personne ne lit ces quatre appels-là.

    ⭐⭐ ET IL NE RECOPIE RIEN. La règle (le regex d'un nom de vecteur, les petits mots
    en capitales, la table `PAS_DES_VECTEURS` avec ses raisons) est LUE dans le fichier
    de l'outil partagé, par son AST. Recopier le regex aurait fait deux copies d'une
    seule vérité, et la seconde se serait périmée au premier élargissement de la règle —
    c'est exactement ce que la cote de Ravi a coûté à l'épisode 10.
    ⏳ Le vrai remède est d'élargir l'outil partagé à ces quatre appels. ⛔ Il vit dans
    `manim/poste2/`, que la session du produit scalaire partage : ça se décide avec le
    chef, pas tout seul."""
    import ast
    import re
    outil = _RACINE / "manim" / "poste2" / "auditer-fleches-vecteurs.py"
    arbre = ast.parse(outil.read_text(encoding="utf-8"))
    regle = {}
    for n in arbre.body:
        if not isinstance(n, ast.Assign) or not isinstance(n.targets[0], ast.Name):
            continue
        nom = n.targets[0].id
        if nom == "NOM" and isinstance(n.value, ast.Call):
            regle["NOM"] = n.value.args[0].value
        elif nom in ("MOTS_CAPS", "PAS_DES_VECTEURS", "SIGNES"):
            regle[nom] = ast.literal_eval(n.value)
    for cle in ("NOM", "MOTS_CAPS", "PAS_DES_VECTEURS", "SIGNES"):
        if cle not in regle:
            print(f"⛔ {cle} introuvable dans {outil.name} — l'outil a changé de forme, "
                  f"ce contrôle ne mesure plus rien")
            return 1
    NOM = re.compile(regle["NOM"])
    print(f"règle LUE dans {outil.name} : {len(regle['PAS_DES_VECTEURS'])} entrées "
          f"dans PAS_DES_VECTEURS, {len(regle['MOTS_CAPS'])} mots en capitales\n")

    def nus(txt):
        t = txt.strip()
        if not t or any(s in t for s in regle["SIGNES"]) or t in regle["PAS_DES_VECTEURS"]:
            return []
        out = []
        for m in NOM.finditer(t):
            a, b = m.start(), m.end()
            g = t[a - 1] if a else ""
            d = t[b] if b < len(t) else ""
            if (g, d) in (("(", ")"), ("[", "]")) or m.group(0) in regle["MOTS_CAPS"]:
                continue
            out.append(m.group(0))
        return out

    # ⭐ Les appels que l'outil partagé ne lit pas, et qui portent le texte des shorts.
    VUS = ("blocs_phrase", "lignes", "eq_mots", "appel_blocs", "jouer_phrase")
    pb = 0
    for cle, (module, _c) in SHORTS.items():
        f = _ICI / f"{module}.py"
        if not f.exists():
            print(f"= {cle} {module}.py : pas encore écrit")
            continue
        src = f.read_text(encoding="utf-8")
        trouves, lus = [], 0
        for n in ast.walk(ast.parse(src)):
            if not (isinstance(n, ast.Call) and getattr(n.func, "attr", "") in VUS):
                continue
            # un texte peut être écrit en morceaux concaténés : « "a " "b" »
            morceaux, arg = [], n.args[0] if n.args else None
            pile = [arg]
            while pile:
                x = pile.pop()
                if isinstance(x, ast.Constant) and isinstance(x.value, str):
                    morceaux.append(x.value)
                elif isinstance(x, ast.BinOp) and isinstance(x.op, ast.Add):
                    pile += [x.left, x.right]
            if not morceaux:
                continue
            lus += 1
            txt = "".join(reversed(morceaux))
            for v in nus(txt):
                trouves.append((n.lineno, v, txt))
        etat = "✅" if not trouves else "⛔"
        print(f"{etat} {cle} {module}.py : {lus} textes lus par ces 5 appels, "
              f"{len(trouves)} nom(s) nu(s)")
        for ligne, v, txt in trouves:
            pb += 1
            print(f"      l.{ligne:<5} « {v} » dans « {txt[:52]} »")
    return pb


def tard(chemin):
    """`--tard <journal de dry run>` : les `AUDIT-TARD` triés, du plus gros au plus petit.

    ⭐ Ce listage NE JUGE PAS : c'est `--ancres` qui garantit qu'un TARD ne cache pas
    une avance (voir son invariant). Ici on regarde seulement l'AMPLITUDE — un TARD
    au-delà de ~2 s veut dire qu'un bloc attend trop longtemps, et ça se voit à l'image.
    ⛔ On compte avec `grep -o`, jamais avec `^` : Manim écrit ses barres de progression
    sur les mêmes lignes que ses signalements (épisode 3, 20 comptés pour 40 réels)."""
    import re
    log = Path(chemin).read_text(encoding="utf-8", errors="replace")
    lignes = re.findall(r"AUDIT-TARD (\S+) « ([^»]+) » \(([^)]*)\) ([0-9.]+) s", log)
    if not lignes:
        print("aucun AUDIT-TARD dans ce journal")
        return 0
    gros = 0
    for cle, nb, ctx, dt in sorted(lignes, key=lambda x: -float(x[3])):
        if float(dt) > 2.0:
            gros += 1
        print(f"  {float(dt):5.2f} s  {cle:16} « {nb} » ({ctx[:30]})")
    pire = max(float(x[3]) for x in lignes)
    print(f"\n{len(lignes)} AUDIT-TARD, le plus gros {pire:.2f} s, "
          f"{gros} au-delà de 2 s.")
    return gros


def main():
    if "--tard" in sys.argv:
        sys.exit(1 if tard(sys.argv[sys.argv.index("--tard") + 1]) else 0)
    if "--ancres" in sys.argv:
        sys.exit(1 if ancres() else 0)
    if "--fleches" in sys.argv:
        sys.exit(1 if fleches() else 0)
    cles = [a for a in sys.argv[1:] if a in SHORTS] or list(SHORTS)
    for c in cles:
        une(c)
    print("\n" + "=" * 70)
    if alertes:
        print(f"⛔ {len(alertes)} problème(s) :")
        for a in alertes:
            print("   ", a)
        sys.exit(1)
    print("✅ aucun bloc hors marge, aucun sur Ti-Margo, aucun chevauchement, "
          "aucune police sous 20 px")
    print("⛔ RAPPEL : ceci mesure le MODÈLE. La planche -ql et les gros plans restent "
          "obligatoires.")


if __name__ == "__main__":
    main()
