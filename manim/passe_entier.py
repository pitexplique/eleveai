# passe_entier.py
# Passe finale de la série NOMBRES ENTIERS, du CM1 à la 6e (21/11/2026, poste 2) — copie de
# passe_masse.py : temps des chapitres et des questions relevés dans l'AUDIO des mp4
# (passe_relatifs.mesurer), questions lues dans les voix validées. Le manifeste a des modifications
# non commitées d'autres sessions : on relit la copie de travail et on ajoute ou remplace SEULEMENT
# nos entrées (<classe>-entier-<slug>[-short]).
#
# ⛔ LOT A (CM1) : une seule vidéo par micro, servie AUSSI au CM2 (mécanisme `aussi`). Les microId du
#    CM1 et du CM2 sont IDENTIQUES sous la notion `nombre_entier` : l'alias porte donc la CLASSE.
# ⛔ `6e-entier-lire-ecrire` n'est PAS produit : l'ancienne vidéo `6e-entier-nombre` le couvre.
#
#   python manim/passe_entier.py temps [id]   → manim/sorties/<classe>/maths/entiers/temps.json
#   python manim/passe_entier.py voir         → affiche les entrées sans rien écrire
#   python manim/passe_entier.py manifeste    → ajoute ou remplace les entrées
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402
from passe_decimaux import question, chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
VOIX = RACINE / "manim" / "voix"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
COACH = "https://www.eleveai.fr/coach/serie?classe={classe}&matiere=maths&notion={notion}&microId={micro}&display=simple"
NOM_CEINT = {"blanche": "Ceinture blanche", "jaune": "Ceinture jaune", "orange": "Ceinture orange",
             "verte": "Ceinture verte", "bleue": "Ceinture bleue", "marron": "Ceinture marron", "noire": "Ceinture noire"}
CYCLE = {"cm1": "cycle 3", "cm2": "cycle 3", "6e": "cycle 3"}
NIVEAU = {"cm1": "primaire", "cm2": "primaire", "6e": "collège"}

# Dates : après la dernière de la file (12/06/2027 le 21/11) ; ⛔ 3 shorts par jour au plus,
# relire la file (max `pas_avant` du manifeste) avant d'en ajouter.
EP = [
 dict(classe="cm1", n=1, slug="lire", notion="nombre_entier", micro="entier_lire",
      nom="Lire les grands nombres", date="2027-06-13", ceinture="verte",
      titre="« Douze mille trente » : combien de zéros ?",
      intro="Diego est cartographe : il dessine les cartes et écrit l'altitude de chaque sommet. "
            "Pour ne pas se tromper d'un zéro, il range les chiffres par classes de trois.",
      points=["un grand nombre se range par classes de trois chiffres (mille, unités)",
              "le zéro garde la place vide : « douze mille trente » s'écrit 12 030",
              "le CHIFFRE des dizaines n'est pas le NOMBRE de dizaines (29 404 → 2 940 dizaines)",
              "et au CM2 : une classe de plus, les millions"],
      defi="écrire « quarante mille huit » en chiffres : combien de zéros ?",
      chap={"00-garde": "Combien de zéros ?", "01-situation": "Diego, cartographe",
            "02-classes": "Les classes de trois chiffres", "03-zero": "Le zéro garde la place",
            "04-question": "Question 1", "05-chiffre-nombre": "Chiffre ou nombre de dizaines ?",
            "06-question": "Question 2", "07-cm2": "Et au CM2 : les millions", "08-question": "Question 3",
            "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["nombres entiers", "lire un grand nombre", "écrire en chiffres", "classes de trois chiffres",
            "tableau de numération", "le zéro", "cartographe", "altitude"],
      centres=["histoire-geographie"],
      aussi=[{"classe": "cm2", "notionId": "nombre_entier", "microId": "entier_lire"}],
      s_titre="« Huit mille neuf » : où va le neuf ?", s_ceinture="blanche",
      s_accroche="Mon copain écrit « huit mille neuf » sur le tableau… et il pose 8 900. Son neuf est "
                 "tombé dans les centaines ! Deux zéros gardent la place : 8 009.",
      s_toi="écris « soixante mille quarante » en chiffres.",
      s_tags=["nombres entiers", "écrire en chiffres", "le zéro", "tableau de numération"],
      s_centres=["histoire-geographie", "jeux-defis"]),
 dict(classe="cm1", n=2, slug="comparer", notion="nombre_entier", micro="entier_comparer",
      nom="Comparer des grands nombres", date="2027-06-14", ceinture="verte",
      titre="9 876 ou 10 234 : lequel est le plus grand ?",
      intro="Malik est bibliothécaire : il range les livres du plus petit numéro au plus grand. "
            "Pour comparer deux nombres, il compte d'abord les chiffres.",
      points=["d'abord on compte les chiffres : plus de chiffres, c'est plus grand",
              "même nombre de chiffres : on compare de gauche à droite, jusqu'au premier qui diffère",
              "le piège : 9 876 commence par 9, mais 10 234 a un chiffre de plus",
              "et au CM2 : la même règle, classe par classe, jusqu'aux millions"],
      defi="trois classes ont ramassé 386 378, 389 358 et 389 378 bouchons : qui gagne ?",
      chap={"00-garde": "Lequel est le plus grand ?", "01-situation": "Malik, bibliothécaire",
            "02-compter": "On compte les chiffres", "03-colonne": "De gauche à droite",
            "04-question": "Question 1", "05-piege": "Le piège", "06-question": "Question 2",
            "07-cm2": "Et au CM2 : les millions", "08-question": "Question 3",
            "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["nombres entiers", "comparer des nombres", "ordre croissant", "plus grand que",
            "signes < et >", "ranger des nombres", "bibliothécaire"],
      centres=["jeux-defis", "histoire-geographie"],
      aussi=[{"classe": "cm2", "notionId": "nombre_entier", "microId": "entier_comparer"}],
      s_titre="987 ou 1 002 : il commence par 9, donc il gagne ?", s_ceinture="blanche",
      s_accroche="Mon copain dit que 987 est plus grand que 1 002, parce qu'il commence par 9. "
                 "On compte les chiffres : trois contre quatre. Quatre chiffres battent trois chiffres.",
      s_toi="range 4 410, 4 140 et 4 190 du plus petit au plus grand.",
      s_tags=["nombres entiers", "comparer", "plus grand", "compter les chiffres"],
      s_centres=["jeux-defis", "histoire-geographie"]),
 dict(classe="cm1", n=3, slug="decomposer", notion="nombre_entier", micro="entier_decomposer",
      nom="Décomposer un nombre", date="2027-06-15", ceinture="verte",
      titre="7 306 : que vaut chaque chiffre ?",
      intro="Thomas est imprimeur. Ses affiches arrivent par paquets : mille, cent, dix, ou à "
            "l'unité. Chaque chiffre d'un nombre marche pareil : il vaut selon sa colonne.",
      points=["chaque chiffre vaut selon sa colonne : dans 4 582, le 5 vaut 500",
              "un rang vide ne s'écrit pas : 7 306 = 7 000 + 300 + 6",
              "composer, c'est l'inverse : 20 000 + 400 + 9 = 20 409",
              "l'ordre des termes ne change rien : chaque nombre va dans sa colonne",
              "et au CM2 : on décompose des nombres bien plus grands"],
      defi="trouver l'erreur dans 12 405 = 10 000 + 2 000 + 400 + 50.",
      chap={"00-garde": "Que vaut chaque chiffre ?", "01-situation": "Thomas, imprimeur",
            "02-valeur": "Chaque chiffre vaut selon sa colonne", "03-zero": "Un rang vide ne s'écrit pas",
            "04-question": "Question 1", "05-composer": "Composer, l'inverse",
            "06-question": "Question 2", "07-cm2": "Et au CM2", "08-question": "Question 3",
            "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["nombres entiers", "décomposer un nombre", "composer un nombre", "valeur d'un chiffre",
            "tableau de numération", "unités dizaines centaines", "imprimeur"],
      centres=["art-design", "technologie-ia"],
      aussi=[{"classe": "cm2", "notionId": "nombre_entier", "microId": "entier_decomposer"}],
      s_titre="Le dernier chiffre de 12 405 vaut 50 ou 5 ?", s_ceinture="blanche",
      s_accroche="Ma copine décompose 12 405 et écrit 10 000 + 2 000 + 400 + 50. Mais le dernier "
                 "chiffre est tout à droite, dans les unités : il vaut 5, pas 50.",
      s_toi="décompose 70 804.",
      s_tags=["nombres entiers", "décomposer", "valeur d'un chiffre", "unités"],
      s_centres=["art-design", "jeux-defis"]),
 dict(classe="cm1", n=4, slug="arrondir", notion="nombre_entier", micro="entier_arrondir",
      nom="Arrondir un nombre", date="2027-06-16", ceinture="verte",
      titre="4 682 à la centaine : 4 600 ou 4 700 ?",
      intro="Léna est météorologue. Pour annoncer la pluie, elle ne dit pas 4 682 millimètres : "
            "elle donne un nombre simple à retenir, le plus proche.",
      points=["on encadre d'abord : 4 682 est entre 4 600 et 4 700",
              "puis on regarde le chiffre juste à droite du rang visé",
              "de 0 à 4 on garde, de 5 à 9 on monte au rang suivant",
              "arrondir, ce n'est pas couper : 4 682 à la centaine donne 4 700",
              "et au CM2 : on arrondit jusqu'au million"],
      defi="arrondir 86 246 personnes au millier près.",
      chap={"00-garde": "4 600 ou 4 700 ?", "01-situation": "Léna, météorologue",
            "02-encadrer": "D'abord, on encadre", "03-regle": "Le chiffre juste à droite",
            "04-question": "Question 1", "05-piege": "Arrondir n'est pas couper",
            "06-question": "Question 2", "07-cm2": "Et au CM2", "08-question": "Question 3",
            "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["nombres entiers", "arrondir un nombre", "arrondi à la centaine", "arrondi au millier",
            "encadrer un nombre", "chiffre des dizaines", "météorologue"],
      centres=["meteo-climat", "sciences"],
      aussi=[{"classe": "cm2", "notionId": "nombre_entier", "microId": "entier_arrondir"}],
      s_titre="4 682 à la centaine : 4 600 ou 4 700 ?", s_ceinture="blanche",
      s_accroche="Ma copine arrondit 4 682 à la centaine et coupe la fin : 4 600. Mais 4 682 est "
                 "tout près de 4 700 : arrondir, c'est choisir le plus proche, pas couper.",
      s_toi="arrondis 23 249 au millier près.",
      s_tags=["nombres entiers", "arrondir", "arrondi à la centaine", "le plus proche"],
      s_centres=["meteo-climat", "jeux-defis"]),
 # ⛔⛔ CM1 SEUL : PAS de `aussi` (Frédéric, 21/11, commit d4c1606f2 — « une notion qui déborde est
 #    une notion neuve »). Cet épisode fait donc 2 lignes `notion_ressources`, toutes deux au CM1,
 #    et aucune au CM2 : le CM2 a son propre épisode, `cm2-entier-multiple`.
 #    ⚠️ 15 écrans, et pas de chapitre `07-cm2` : le numéro 07 reste volontairement libre.
 dict(classe="cm1", n=5, slug="multiple", notion="nombre_entier", micro="entier_multiple",
      nom="Les multiples", date="2027-06-17", ceinture="verte",
      titre="42 est-il un multiple de 6 ?",
      intro="Awa est fleuriste. Elle compte ses roses par paquets de 10, sans qu'il en reste "
            "un seul. Un multiple, c'est exactement ça : des paquets pleins.",
      points=["un multiple de 6, c'est 6 fois un nombre entier : 6 fois 7 donne 42",
              "c'est aussi des paquets pleins, sans le moindre reste",
              "pour 2, 10 et 100, le dernier chiffre suffit",
              "un multiple de 10 finit par zéro",
              "un voisin du multiple (63, 65, 67) n'est pas un multiple"],
      defi="trouver le total qui remplit des ballotins de 7 sans reste : 62, 63 ou 64.",
      chap={"00-garde": "42, multiple de 6 ?", "01-situation": "Awa, fleuriste",
            "02-definition": "6 fois un nombre entier", "03-sans-reste": "Des paquets pleins",
            "04-question": "Question 1", "05-dernier-chiffre": "Le dernier chiffre suffit",
            "06-question": "Question 2", "08-question": "Question 3",
            "09-defi": "À toi de jouer", "09b-correction": "Correction",
            "10-finale": "Ce que tu as appris"},
      tags=["nombres entiers", "les multiples", "multiple de 10", "table de multiplication",
            "paquets pleins", "sans reste", "fleuriste"],
      centres=["nature-ecologie", "art-design"],
      s_titre="35 billes, paquets de 4 : ça tombe juste ?", s_ceinture="blanche",
      s_accroche="Ma copine range 35 billes par paquets de 4 et dit que ça tombe juste. On compte "
                 "4, 8, 12… 32 : huit paquets pleins, et il en reste 3.",
      s_toi="combien de paquets de 6 avec 54 billes ?",
      s_tags=["nombres entiers", "multiples", "table de 4", "il reste combien"],
      s_centres=["jeux-defis", "nature-ecologie"]),
 # ⛔ CEINTURE BLEUE en paysage (la seule du lot A, avec B5 en 6e) ; le short reste BLANC.
 dict(classe="cm1", n=6, slug="defi", notion="nombre_entier", micro="entier_defi",
      nom="Le défi des nombres", date="2027-06-18", ceinture="bleue",
      titre="Qui se cache entre 3 900 et 4 000 ?",
      intro="Sarah est factrice. Sur sa tournée, le numéro d'une maison est effacé. Elle le "
            "retrouve comme un détective : un indice après l'autre, jusqu'à ce qu'il n'en reste qu'un.",
      points=["on applique les indices un par un, et on vérifie à la fin",
              "un multiple de 10 finit par zéro",
              "le chiffre d'un rang élimine tous les autres candidats",
              "pour le plus grand nombre, on range du plus grand chiffre au plus petit",
              "un nombre ne commence jamais par zéro : il perdrait un chiffre",
              "et au CM2 : juste après 6 999 999 vient 7 000 000"],
      defi="95 bandes dessinées rangées par 4 : combien en reste-t-il ?",
      chap={"00-garde": "Qui se cache entre 3 900 et 4 000 ?", "01-situation": "Sarah, factrice",
            "02-indices": "Les indices, un par un", "03-dernier-indice": "Le dernier indice tranche",
            "04-question": "Question 1", "05-etiquettes": "Quatre étiquettes",
            "06-question": "Question 2", "07-cm2": "Et au CM2", "08-question": "Question 3",
            "09-defi": "À toi de jouer", "09b-correction": "Correction",
            "10-finale": "Ce que tu as appris"},
      tags=["nombres entiers", "nombre mystère", "défi de numération", "multiple de 10",
            "le plus grand nombre", "jamais zéro devant", "factrice"],
      centres=["transports", "jeux-defis"],
      aussi=[{"classe": "cm2", "notionId": "nombre_entier", "microId": "entier_defi"}],
      s_titre="Le plus grand nombre avec 7, 4, 1 et 0 ?", s_ceinture="blanche",
      s_accroche="Mon copain cherche le plus grand code à quatre chiffres avec 7, 4, 1 et 0, et "
                 "tape 0 741. Le zéro devant fait perdre un chiffre : il ne reste que 741.",
      s_toi="le plus petit nombre de quatre chiffres avec 0, 5, 3 et 8 ?",
      s_tags=["nombres entiers", "le plus grand nombre", "zéro devant", "défi"],
      s_centres=["jeux-defis", "technologie-ia"]),
 # ── LOT B : la 6e, notion `entier_nombre`. ⛔ PAS de `aussi` : la 6e a sa propre notion, donc
 #    2 lignes `notion_ressources` par épisode (la paysage et le short), en 6e seulement.
 #    ⛔ `entier_lire_ecrire` n'est pas produit : l'ancienne vidéo `6e-entier-nombre` le couvre.
 dict(classe="6e", n=1, slug="rang", notion="entier_nombre", micro="entier_rang",
      nom="Les rangs d'un nombre", date="2027-06-20", ceinture="verte",
      titre="Dans 5 482, quel est le chiffre des dizaines ?",
      intro="Inès est contrôleuse aérienne : sur son écran, chaque altitude doit être lue au bon "
            "rang. Un chiffre lu une colonne trop loin, et l'avion n'est plus à la même hauteur.",
      points=["les rangs se lisent de DROITE à gauche : unités, dizaines, centaines, unités de mille",
              "donner le chiffre d'un rang, et donner le rang d'un chiffre",
              "un zéro est un chiffre comme un autre : il occupe un rang, lui aussi",
              "au-delà de mille, on continue : dizaines de mille, puis centaines de mille"],
      defi="un avion vole à 5 102 mètres : donner le chiffre des dizaines, puis celui des centaines.",
      chap={"00-garde": "Quel est le chiffre des dizaines ?",
            "01-situation": "Inès, contrôleuse aérienne",
            "02-rangs": "Les rangs, de droite à gauche", "03-exemple": "Les quatre rangs de 5 482",
            "04-question": "Question 1", "05-zero": "Un zéro occupe un rang",
            "06-question": "Question 2", "07-grands": "Au-delà de mille", "08-question": "Question 3",
            "09-defi": "À toi de jouer", "09b-correction": "Correction",
            "10-finale": "Ce que tu as appris"},
      tags=["nombres entiers", "rang d'un chiffre", "chiffre des dizaines", "tableau de numération",
            "unités dizaines centaines", "de droite à gauche", "contrôleuse aérienne", "altitude"],
      centres=["transports", "technologie-ia"],
      s_titre="7 305 : le chiffre des dizaines, le 3 ou le 0 ?", s_ceinture="blanche",
      s_accroche="Mon copain cherche le chiffre des dizaines de 7 305 et pointe le 3 : il a compté "
                 "de gauche à droite. Les rangs se comptent en partant de la droite : 5 unités, "
                 "puis 0 dizaine.",
      s_toi="dans 9 261, quel est le chiffre des unités de mille ?",
      s_tags=["nombres entiers", "rang d'un chiffre", "dizaines", "de droite à gauche"],
      s_centres=["transports", "jeux-defis"]),
 # ⚠️ B2 `entier_comparer` saute son tour : sa voix `09b-correction` dit « 6 032 a 3 centaines »,
 #    ce qui est FAUX (6 032 a 0 centaine et 3 dizaines, et c'est bien le rang des dizaines qui
 #    décide entre 6 022, 6 023, 6 024 et 6 032). Un seul clip à refaire. La date **21/06/2027**
 #    lui reste réservée : ⛔ ne pas la prendre pour un autre épisode.
 dict(classe="6e", n=3, slug="encadrer", notion="entier_nombre", micro="entier_encadrer",
      nom="Encadrer un nombre entier", date="2027-06-22", ceinture="verte",
      titre="Entre quelles centaines se trouve 582 ?",
      intro="Clara est guide de haute montagne. Avant de partir, elle situe chaque sommet entre "
            "deux altitudes rondes : un sommet rangé entre deux repères ronds se lit d'un coup d'œil.",
      points=["encadrer, c'est serrer le nombre entre les deux nombres ronds les plus proches",
              "582 est entre 500 et 600 : on écrit l'encadrement 500 < 582 < 600",
              "le RANG change l'encadrement : à la dizaine près, 9 614 est entre 9 610 et 9 620",
              "les bornes d'une dizaine finissent par un zéro, celles d'un millier par trois",
              "encadrer aide à arrondir : 47 est entre 40 et 50, et plus proche de 50"],
      defi="un compteur affiche 26 896 kilomètres : l'encadrer entre deux dizaines consécutives.",
      chap={"00-garde": "Entre quelles centaines ?", "01-situation": "Clara, guide de haute montagne",
            "02-definition": "Encadrer, c'est serrer", "03-exemple": "582 entre 500 et 600",
            "04-question": "Question 1", "05-rang": "Le rang change l'encadrement",
            "06-question": "Question 2", "07-arrondi": "Encadrer aide à arrondir",
            "08-question": "Question 3", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["nombres entiers", "encadrer un nombre", "dizaine juste avant", "nombres ronds",
            "droite graduée", "arrondir", "guide de haute montagne", "altitude"],
      centres=["sport", "nature-ecologie"],
      s_titre="752 entre deux dizaines : 750 ou 751 ?", s_ceinture="blanche",
      s_accroche="Ma copine encadre 752 entre deux dizaines et écrit 751 et 761 : elle a pris les "
                 "voisins du nombre. Une dizaine finit toujours par zéro : c'est 750 et 760.",
      s_toi="encadre 7 755 entre deux centaines consécutives.",
      s_tags=["nombres entiers", "encadrer", "dizaines", "nombres ronds"],
      s_centres=["sport", "jeux-defis"]),
]

COMMUNS = ["nombres entiers", "numération", "maths"]


def dossier(e):
    return f"{e['classe']}/maths/entiers/{e['n']:02d}-{e['slug']}"


def temps_de(classe):
    p = SORTIES / classe / "maths" / "entiers" / "temps.json"
    return p, (json.loads(p.read_text(encoding="utf-8")) if p.exists() else {})


def entrees():
    out = []
    for e in EP:
        cl, n, slug = e["classe"], e["n"], e["slug"]
        ident = f"{cl}-entier-{slug}"
        _, temps = temps_de(cl)
        if ident not in temps:
            continue
        CL = cl.upper() if cl != "6e" else "6e"
        communs = COMMUNS + [CL, NIVEAU[cl], CYCLE[cl], "CRPE", "EleveAI"]
        dos = dossier(e)
        nom = f"eleveai-maths-{ident}"
        notion = e["notion"]
        coach = COACH.format(classe=cl, micro=e["micro"], notion=notion)
        voix = json.loads((VOIX / f"{ident}.json").read_text(encoding="utf-8"))
        t = temps[ident]
        titre = f"{e['titre']} — {e['nom']} — épisode {n} · Maths {CL}"
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += (f"\n\n⏸ 3 questions-pauses : mets pause, et choisis !\n🥋 {NOM_CEINT[e['ceinture']]}.\n"
                f"Un défi en fin de vidéo, avec sa correction : {e['defi']}")
        acc += f"\n\nPour s'entraîner :\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n🔢 Épisode {n} de la série Nombres entiers d'EleveAI, en {CL}."
        qs = [dict(t=mmss(t["clips"][c]), **question(voix, c)) for c in voix if c.endswith("-question")]
        out.append({
            "id": ident, "pas_avant": e["date"], "prioritaire": True, "notionId": notion, "microId": e["micro"],
            "classe": cl, "ceinture": e["ceinture"], "serie": f"Maths {CL}", "type": "longue",
            "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png", "titre": titre, "accroche": acc,
            "chapitres": chapitres(e["chap"], t["clips"], t["duree"]),
            "tags": list(dict.fromkeys(e["tags"] + communs)), "questions": qs, "centres": e["centres"],
        })
        if e.get("aussi"):  # la même vidéo sert aussi la même micro au CM2
            out[-1]["aussi"] = e["aussi"]
        if f"{ident}-short" not in temps:
            continue
        sv = json.loads((VOIX / f"{ident}-short.json").read_text(encoding="utf-8"))
        ts = temps[f"{ident}-short"]
        stitre = f"{e['s_titre']} #maths #{cl}"
        sc = e.get("s_ceinture", "blanche")
        sacc = e["s_accroche"] + (f"\n\nDessin animé, voix de synthèse.\n🥋 {NOM_CEINT[sc]}"
                                  + (" : pour découvrir." if sc == "blanche" else ".")
                                  + f"\n👉 À toi : {e['s_toi']} Réponds en commentaire !")
        sacc += (f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach}\n\n"
                 f"Fait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #nombres #{cl} #{NIVEAU[cl]}")
        out.append({
            "id": f"{ident}-short", "pas_avant": e["date"], "prioritaire": True, "notionId": notion,
            "microId": e["micro"], "classe": cl, "ceinture": sc, "serie": f"Maths {CL}", "type": "short",
            "renvoie_vers": ident, "fichier": f"{dos}/{nom}-short.mp4",
            "miniature": f"{dos}/{nom}-short-miniature.png", "titre": stitre, "accroche": sacc,
            "tags": list(dict.fromkeys(e["s_tags"] + ["Ti Margo", "dessin animé", NOM_CEINT[sc].lower()]
                                       + communs + ["Shorts"])),
            "questions": [dict(t=mmss(ts["clips"][c]), **question(sv, c)) for c in sv if c.endswith("-question")],
            "centres": e["s_centres"],
        })
        if e.get("aussi"):
            out[-1]["aussi"] = e["aussi"]
        for x in (titre, stitre):
            if len(x) > 100:
                print(f"TITRE TROP LONG ({len(x)}) : {x}", file=sys.stderr)
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        filtre = sys.argv[2] if len(sys.argv) > 2 else ""
        for e in EP:
            ident = f"{e['classe']}-entier-{e['slug']}"
            if filtre and filtre != ident:
                continue
            p, res = temps_de(e["classe"])
            for suf in ("", "-short"):
                nom = f"{ident}{suf}"
                mp4 = SORTIES / dossier(e) / f"eleveai-maths-{nom}.mp4"
                if not mp4.exists():
                    print("pas encore :", nom)
                    continue
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-entier.json"
        shutil.copy(MANIFESTE, sauve)
        texte = MANIFESTE.read_text(encoding="utf-8")
        data = json.loads(texte)
        neuves = entrees()
        ids = {n["id"] for n in neuves}
        avant = len(data["videos"])
        for v in data["videos"]:
            if v["id"] in ids and v.get("url"):
                raise SystemExit("déjà publiée : " + v["id"])
        data["videos"] = [v for v in data["videos"] if v["id"] not in ids] + neuves
        sortie = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
        MANIFESTE.write_text(sortie, encoding="utf-8", newline="\n" if "\r\n" not in texte else "\r\n")
        print("manifeste :", avant, "→", len(data["videos"]), "sauvegarde", sauve)


if __name__ == "__main__":
    main()
