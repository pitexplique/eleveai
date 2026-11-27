# -*- coding: utf-8 -*-
# manim/poste2/mesure-continuite-tvi.py
# LES COTES DES QUESTIONS-PAUSES DES 5 ÉPISODES, MESURÉES SANS RENDRE.
#
#   python -X utf8 manim/poste2/mesure-continuite-tvi.py
#
# ⭐⭐ POURQUOI. Le dry run regarde les bords, la planche regarde la dernière image.
# Ni l'un ni l'autre ne voit qu'un bloc a été RÉTRÉCI : `col()` et `carte_choix`
# réduisent en silence, et un texte deux fois trop petit ne « saute » pas aux yeux sur
# une vignette à quatre colonnes. C'est le défaut n° 4 de l'épisode 1 de la série
# espace (« des cartes à 10 px »), et il a traversé trois épisodes avant d'être vu.
#
# ⛔ Les textes ne sont PAS recopiés ici : ils sont importés des épisodes
# (`Q04` / `Q07`). Une liste tenue à la main à côté de la vraie, c'est l'accident
# déjà arrivé trois fois dans ce dépôt.
#
# Ce qu'il mesure, question par question :
#   · la POLICE RÉELLE de chaque carte après la réduction de `carte_choix` ;
#   · le bas du bloc de cartes et le bas de « Mets pause » — qui doivent rester
#     AU-DESSUS de −2,15, sinon ils s'écrivent sur la tête de Ti-Margo
#     (sa boîte : x ∈ [5,54 ; 6,66], y ∈ [−3,55 ; −2,15] à scale 0,5) ;
#   · le hors-marge de 3 % (|x| ≤ 6,68, |y| ≤ 3,57) ;
#   · le RÉTRÉCISSEMENT de l'énoncé par `col()`.
#
# Le critère : aucune ligne « ⛔ ».

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403

from analyse_ecrans import EcransAnalyse  # noqa: E402

MARGE_X, MARGE_Y = 6.68, 3.57
# La boîte de Ti-Margo, à scale 0,5 : c'est un RECTANGLE, et il est tout à droite.
MARGO_X0, MARGO_X1, MARGO_BAS, MARGO_HAUT = 5.54, 6.66, -3.55, -2.15
POLICE_MINI = 19.0          # mesuré sur la série espace : en dessous, illisible au mobile

EPISODES = ["tvi_appliquer", "continuite_reconnaitre", "tvi_unicite",
            "tvi_rediger", "tvi_defi"]

E = EcransAnalyse.__new__(EcransAnalyse)
ennuis = []


def police_reelle(carte, fs_demande):
    """La police EFFECTIVE d'une carte, après la réduction de `carte_choix`.

    ⭐ `carte_choix` réduit le GROUPE rond + lettre + corps par `scale_to_fit_width`,
    et le rond ne rétrécit pas de bon cœur : la police demandée ne dit donc rien de la
    police obtenue. On la retrouve par la HAUTEUR d'une ligne, comparée à la hauteur
    d'un texte témoin de même contenu à la police demandée."""
    # ⛔⛔ `corps[0]` N'EST PAS la première ligne quand la carte n'en a qu'une : les
    # sous-objets d'un `Text` sont ses GLYPHES. La première version mesurait donc la
    # hauteur d'un « s » et annonçait 12,1 px pour une carte parfaitement lisible.
    # Un instrument qui crie à tort est pire que pas d'instrument : on teste le TYPE.
    corps = carte[1][1]
    ligne = corps
    if corps.submobjects and isinstance(corps.submobjects[0], Text):
        ligne = corps.submobjects[0]
    temoin = Text(getattr(ligne, "original_text", "Ag"), font_size=fs_demande)
    if temoin.height < 1e-6:
        return fs_demande
    return fs_demande * float(ligne.height) / float(temoin.height)


def mesurer(nom_ep, cle, enonce, choix, kwargs, bonne):
    fs = kwargs.get("fs_choix", 28)
    # ⚠️ Un choix peut tenir sur UNE ligne : `carte_choix` accepte alors la chaîne nue.
    # C'est le cas des ensembles (« sur ]0 ; +∞[ ») — les couper en deux les rendrait
    # illisibles. La mesure doit construire la carte comme l'épisode la construit.
    def corps(c):
        if len(c) == 1:
            return c[0]
        if len(c) == 2:
            return EcransAnalyse.choix2(E, *c, fs)
        return EcransAnalyse.choix3(E, *c, fs)

    cartes_txt = [corps(c) for c in choix]
    fs_e = kwargs.get("fs_enonce", 32)
    q = [EcransAnalyse.t(E, s, fs_e) for s in enonce]
    larg = kwargs.get("largeur", 4.1)
    xl = kwargs.get("xl", 2.2)
    temoins = [x.copy() for x in q]
    tete, qb, cartes, pause, rebours = EcransAnalyse.q_tete(
        E, q, cartes_txt, largeur=larg, xl=xl)

    print(f"\n  {nom_ep} · {cle}  (largeur {larg}, xl {xl}, bonne {bonne})")
    for i, (c, L) in enumerate(zip(cartes, "ABC")):
        p = police_reelle(c, fs)
        etat = "⛔" if p < POLICE_MINI else "  "
        if p < POLICE_MINI:
            ennuis.append(f"{nom_ep} {cle} carte {L} : police réelle {p:.1f} px")
        print(f"   {etat} carte {L} : police demandée {fs}, réelle {p:.1f} px, "
              f"largeur {c.width:.2f}")

    for i, (av, ap) in enumerate(zip(temoins, qb)):
        if ap.width < av.width - 0.01:
            r = 100 * (1 - ap.width / av.width)
            ennuis.append(f"{nom_ep} {cle} énoncé l.{i + 1} : RÉTRÉCI de {r:.0f} %")
            print(f"   ⛔ énoncé ligne {i + 1} RÉTRÉCI de {r:.0f} % par col() "
                  f"({av.width:.2f} → {ap.width:.2f})")

    # ⛔⛔ TI-MARGO EST UNE BOÎTE, PAS UNE LIGNE — et la première version de cette
    # mesure l'avait oublié. Elle criait dès qu'un bloc descendait sous −2,15, sans
    # regarder OÙ il descendait : « Mets pause, et choisis ! » posé à x = 2,2 peut très
    # bien descendre à −2,8 sans jamais approcher la mascotte, qui vit tout à droite.
    # Un seuil qui ignore une dimension sonne à tort, et un instrument qui sonne à tort
    # ne se lit plus. On teste donc l'INTERSECTION des deux rectangles.
    for nom, mob in (("cartes", cartes), ("pause", pause)):
        g, d = float(mob.get_left()[0]), float(mob.get_right()[0])
        b_, h_ = float(mob.get_bottom()[1]), float(mob.get_top()[1])
        touche = (d > MARGO_X0 and g < MARGO_X1 and b_ < MARGO_HAUT and h_ > MARGO_BAS)
        etat = "⛔" if touche else "  "
        if touche:
            ennuis.append(f"{nom_ep} {cle} : « {nom} » recouvre Ti-Margo "
                          f"(x jusqu'à {d:.2f}, bas {b_:.2f})")
        print(f"   {etat} {nom} : bas {b_:.2f}, droite {d:.2f}"
              f"   (Ti-Margo : x ⩾ {MARGO_X0}, y ⩽ {MARGO_HAUT})")

    for nom, mob in (("tête", tete), ("énoncé", qb), ("cartes", cartes),
                     ("pause", pause), ("rebours", rebours)):
        g, d = float(mob.get_left()[0]), float(mob.get_right()[0])
        b, h = float(mob.get_bottom()[1]), float(mob.get_top()[1])
        if g < -MARGE_X or d > MARGE_X or b < -MARGE_Y or h > MARGE_Y:
            ennuis.append(f"{nom_ep} {cle} : {nom} HORS MARGE "
                          f"x[{g:.2f} ; {d:.2f}] y[{b:.2f} ; {h:.2f}]")
            print(f"   ⛔ {nom} HORS MARGE x[{g:.2f} ; {d:.2f}] y[{b:.2f} ; {h:.2f}]")


for nom_ep in EPISODES:
    try:
        mod = __import__(nom_ep)
    except ModuleNotFoundError:
        print(f"\n  ⏳ {nom_ep} : pas encore écrit")
        continue
    for cle in ("Q04", "Q07"):
        donnees = getattr(mod, cle, None)
        if donnees is None:
            print(f"\n  ⏳ {nom_ep} · {cle} : pas de bloc de question exporté")
            ennuis.append(f"{nom_ep} {cle} : non exporté, donc non mesuré")
            continue
        enonce, choix, kwargs, bonne = donnees
        mesurer(nom_ep, cle[1:], enonce, choix, kwargs, bonne)

print(f"\n{len(ennuis)} ennui(s).")
for e in ennuis:
    print("  ⛔ " + e)
print("⚠️ Cette mesure ne regarde QUE les questions-pauses. Les figures, les colonnes "
      "de calcul et les chevauchements d'un écran à l'autre se voient à la planche.")
sys.exit(1 if ennuis else 0)
