# passe_graphiques_1re.py
# Passe finale de la série GRAPHIQUES (automatismes de 1re, 24/11/2026) : 4 paysages + 1 short (croissance).
# 01 appartenance et 02 variations existent aussi en STMG (même vidéo, seule la garde change : entrées
# « plus_tard », pour le site et le coach). Copie simplifiée de passe_evolutions_lycee.py.
# Temps des chapitres et des questions relevés dans l'AUDIO des mp4 (passe_distributivite.mesurer).
# Le manifeste a des modifications non commitées d'autres sessions : on relit la copie de travail et on
# ajoute seulement nos entrées <classe>-graph-<slug>[-short].
#
#   python manim/passe_graphiques_1re.py temps      → manim/sorties/premiere/maths/graphiques/temps-graphiques.json
#   python manim/passe_graphiques_1re.py voir       → affiche les entrées sans rien écrire
#   python manim/passe_graphiques_1re.py manifeste  → ajoute ou remplace nos entrées
#   python manim/passe_graphiques_1re.py coupes     → les valeurs de COUPE_PAR_VIDEO (LecteurVideo.tsx)
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_distributivite import mesurer, mmss  # noqa: E402
from passe_decimaux import chapitres, chap0  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SORTIES / "premiere" / "maths" / "graphiques" / "temps-graphiques.json"
SCRIPTS = RACINE / "manim" / "scripts" / "premiere"
SERIE = {"premiere": ("1re", "Maths 1re"), "stmg": ("STMG", "Maths STMG")}


def fiche(classe, notion):
    return f"https://www.eleveai.fr/fiches-exercices/maths/{classe}/{notion.replace('_', '-')}"


def coach(classe, notion, micro):
    return f"https://www.eleveai.fr/coach/serie?classe={classe}&matiere=maths&notion={notion}&microId={micro}&display=simple"


def Q(c, q, ch, r, x):
    return (c, q, ch, r, x)


EPS = [
    dict(num="01", slug="appartenance", micro="auto_fct_appartenance_courbe", notion="auto_lecture_graphique",
         classes=["premiere", "stmg"], date="2027-07-19", ceinture="jaune", centres=["jeux-video"],
         titre="Ce point est-il sur la courbe ? Le test de l'équation, sans rien tracer",
         intro="Dans un jeu vidéo, un personnage saute le long de la courbe y = −x² + 4x. Une pièce d'or flotte au point (3 ; 3) : va-t-il l'attraper ? La développeuse de jeux fait ce test pour chaque saut, l'architecte pour une arche, l'ingénieur pour un pont.",
         puces=["on remplace x par l'abscisse du point : −3² + 4 × 3 = 3",
                "on compare à l'ordonnée : 3 = 3, le point est sur la courbe",
                "la règle : un point est sur la courbe si ses coordonnées vérifient l'équation",
                "le piège : −(−1)² = −1, le carré passe avant le signe moins",
                "l'équation donne aussi les points qui manquent : le point d'abscisse 2 est (2 ; 4)"],
         defi="le point (4 ; 0) est-il sur la courbe ? et quelle est l'ordonnée du point d'abscisse 5 ?",
         chap={"00-garde": "Une pièce sur le saut", "01-situation": "Une pièce sur le saut",
               "02-question-du-jour": "La question du jour", "03-remplacer": "On remplace x",
               "04-comparer": "On compare à l'ordonnée", "05-regle": "La règle", "06-question": "Question 1",
               "07-piege": "Le piège du carré", "08-coordonnees": "Trouver un point", "09-question": "Question 2",
               "10-defi": "À toi de jouer", "10b-correction": "Correction", "11-finale": "Ce que tu as appris"},
         qs=[Q("06-question", "Le point (1 ; 4) est-il sur la courbe y = −x² + 4x ?",
               ["oui", "non, on trouve 3", "non, on trouve 5"], 1,
               "−1² + 4 × 1 = −1 + 4 = 3, et pas 4 : le point est au-dessus de la courbe."),
             Q("09-question", "Sur y = 2x² − 3, quel est le point d'abscisse −1 ?",
               ["(−1 ; −1)", "(−1 ; −5)", "(−1 ; 1)"], 0,
               "2 × 1 − 3 = −1. B oublie le carré, C met au carré 2 × (−1).")],
         tags=["point sur une courbe", "équation de courbe", "appartenance", "coordonnées", "fonction", "jeu vidéo"]),
    dict(num="02", slug="variations", micro="auto_fct_variations_graphique", notion="auto_resolution_graphique",
         classes=["premiere", "stmg"], date="2027-07-20", ceinture="jaune", centres=["sport"],
         titre="Le tableau de variations : le lire sur une courbe, sans se tromper d'axe",
         intro="Une coureuse de trail enregistre son altitude sur 10 km : la courbe monte, descend, puis remonte. L'entraîneur, la géomètre, le data analyst du sport résument ce genre de courbe en un seul tableau.",
         puces=["on parcourt la courbe de gauche à droite : croissante, décroissante, croissante",
                "première ligne : les bornes et les x où la courbe change de sens (0, 4, 7, 10)",
                "deuxième ligne : les flèches, et les valeurs au bout (200, 800, 300, 500)",
                "maximum 800 m atteint en 4, minimum 200 m atteint en 0",
                "le piège : les intervalles se lisent sur les x, jamais sur les y"],
         defi="une courbe part de 3 en 0, descend jusqu'à −2 en 2, puis monte jusqu'à 4 en 5 : dresse son tableau de variations.",
         chap={"00-garde": "Un trail de 10 km", "01-situation": "Un trail de 10 km",
               "02-question-du-jour": "La question du jour", "03-parcourir": "De gauche à droite",
               "04-tableau": "Le tableau de variations", "05-extremums": "Maximum et minimum",
               "06-question": "Question 1", "07-piege": "Le piège : x ou y ?", "08-question": "Question 2",
               "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[Q("06-question", "Sur quel intervalle la fonction est-elle décroissante ?",
               ["de 0 à 4", "de 300 à 800", "de 4 à 7"], 2,
               "Entre 4 et 7 km, la courbe descend. A, c'est la montée ; B donne des altitudes : les intervalles se lisent sur les x."),
             Q("08-question", "f vaut 2 en −3, monte jusqu'à 6 en 1, puis descend jusqu'à −1 en 4. Quel est le maximum ?",
               ["4, atteint en −1", "6, atteint en 1", "1, atteint en 6"], 1,
               "Le maximum se lit en haut des flèches : 6, atteint en 1. A lit la dernière colonne, C inverse les deux lignes.")],
         tags=["tableau de variations", "croissante", "décroissante", "maximum", "minimum", "lecture graphique", "trail"]),
    dict(num="03", slug="croissance", micro="auto_fct_lire_croissance", notion="auto_resolution_graphique",
         classes=["premiere"], date="2027-07-21", ceinture="orange", centres=["reseaux-sociaux", "sciences"],
         scentres=["sciences"],
         titre="Ça monte, mais comment ? Croissance constante, qui accélère, qui ralentit",
         intro="Trois créateurs lancent leur chaîne vidéo le même jour. Six mois plus tard, les trois courbes d'abonnés montent, mais elles ne racontent pas la même histoire. Le community manager, la data analyst, l'épidémiologiste lisent ces courbes : elles annoncent la suite.",
         puces=["on compare les hausses sur des intervalles de même largeur (ici, un mois)",
                "hausses égales (+ 100 chaque mois) : une droite, la croissance est constante",
                "hausses qui grandissent (le nombre double) : la croissance accélère",
                "hausses qui rétrécissent (300, 150, 80, 40) : ça ralentit, mais ça monte encore",
                "le temps de doublement reste le même alors que les hausses s'envolent"],
         defi="500 vues après 1 h, 1 000 après 2 h, 2 000 après 3 h : combien après 5 h ? la croissance accélère-t-elle ?",
         chap={"00-garde": "Trois chaînes vidéo", "01-situation": "Trois chaînes vidéo",
               "02-question-du-jour": "La question du jour", "03-methode": "Comparer les hausses",
               "04-constant": "Croissance constante", "05-accelere": "La croissance accélère",
               "06-question": "Question 1", "07-piege": "Ralentir, ce n'est pas baisser",
               "08-doublement": "Le temps de doublement", "09-question": "Question 2",
               "10-defi": "À toi de jouer", "10b-correction": "Correction", "11-finale": "Ce que tu as appris"},
         qs=[Q("06-question", "Chez Sarah, les hausses sont 300, 150, 80, 40. Sa croissance :",
               ["ralentit", "accélère", "est constante"], 0,
               "Sarah gagne des abonnés chaque mois, mais de moins en moins : la croissance ralentit."),
             Q("09-question", "Des bactéries passent de 1 000 à 2 000 en 3 h et doublent à ce rythme. Combien sont-elles après 9 h ?",
               ["4 000", "6 000", "8 000"], 2,
               "En 9 h, 3 doublements : 1 000, 2 000, 4 000, 8 000. A ajoute 1 000 à chaque fois, B multiplie 2 000 par 3.")],
         tags=["croissance", "accélération", "ralentissement", "doublement", "lecture graphique", "abonnés", "bactéries"],
         short=dict(st="Une courbe qui s'aplatit : est-ce qu'elle baisse ? 🔍",
                    sq=Q("02-question", "Les hausses sont 10, 20, 40, 80. La croissance :",
                         ["ralentit", "est constante", "accélère"], 2, "Les hausses grandissent : la croissance accélère."),
                    sa="Une courbe qui s'aplatit : est-ce qu'elle baisse ? Non ! Les hausses rétrécissent, 300, 150, 80, 40, mais on monte toujours.\nLa croissance ralentit.",
                    stoi="1 000 bactéries doublent chaque heure. Combien après 4 heures ? Réponds en commentaire !",
                    stags=["croissance", "ralentir", "courbe"])),
    dict(num="04", slug="histogramme", micro="auto_stat_lire_histogramme", notion="auto_lire_statistiques",
         classes=["premiere"], date="2027-07-22", ceinture="jaune", centres=["transports"],
         titre="Lire un histogramme : classes, effectifs, fréquences",
         intro="Un lycée veut décaler l'heure d'entrée en cours. Il demande à 50 élèves leur temps de trajet. L'urbaniste, la responsable des transports, le statisticien lisent les réponses sur un histogramme.",
         puces=["les temps sont rangés par classes : [0 ; 10[, [10 ; 20[… une barre par classe, sans trou",
                "la hauteur d'une barre donne l'effectif : 17 élèves mettent entre 10 et 20 minutes",
                "[10 ; 20[ : 10 compris, 20 non compris",
                "fréquence = effectif de la classe ÷ effectif total : 17 ÷ 50 = 0,34, soit 34 %",
                "le piège : l'effectif total n'est pas le nombre de barres ; 8 + 17 + 12 + 9 + 4 = 50"],
         defi="quelle est la classe la plus représentée ? quelle part des élèves met entre 20 et 30 minutes ?",
         chap={"00-garde": "50 temps de trajet", "01-situation": "50 temps de trajet",
               "02-question-du-jour": "La question du jour", "03-classes": "Les classes",
               "04-effectif": "Hauteur = effectif", "05-bornes": "Les bornes d'une classe",
               "06-question": "Question 1", "07-frequence": "La fréquence", "08-piege": "Le piège de l'effectif total",
               "09-question": "Question 2", "10-defi": "À toi de jouer", "10b-correction": "Correction",
               "11-finale": "Ce que tu as appris"},
         qs=[Q("06-question", "Combien d'élèves mettent moins de 20 minutes ?", ["17", "25", "20"], 1,
               "Les deux premières barres : 8 + 17 = 25. A ne prend qu'une barre, C lit la borne 20."),
             Q("09-question", "Quelle part des élèves met au moins 30 minutes ?", ["26 %", "13 %", "9 %"], 0,
               "Les deux dernières barres : 9 + 4 = 13 ; 13 ÷ 50 = 0,26 = 26 %. B oublie de diviser par 50, C ne prend qu'une barre.")],
         tags=["histogramme", "effectif", "fréquence", "classes", "statistiques", "temps de trajet"]),
]

COMMUNS = ["lecture graphique", "fonctions", "automatismes", "maths", "lycée", "EleveAI"]
HASHTAGS = {"premiere": "#1re #automatismes", "stmg": "#stmg #lycee"}


def dossier(e, classe):
    return f"{classe}/maths/graphiques/{e['num']}-{e['slug']}"


def ident(e, classe, short=False):
    return f"{classe}-graph-{e['slug']}" + ("-short" if short else "")


def mp4(e, classe, short=False):
    return SORTIES / dossier(e, classe) / f"eleveai-maths-{ident(e, classe, short)}.mp4"


def variantes(e):
    """(classe, short) de chaque mp4 de l'épisode."""
    out = [(c, False) for c in e["classes"]]
    if "short" in e:
        out.append(("premiere", True))
    return out


def voix(e, short=False):
    return f"lycee-graph-{e['slug']}" + ("-short" if short else "")


def script(e, short=False):
    return f"graph_lycee_{e['slug']}" + ("_short" if short else "")


def lire_temps():
    if not TEMPS.exists():
        raise SystemExit(f"Fichier des temps absent : {TEMPS}\nLance d'abord : python manim/passe_graphiques_1re.py temps")
    return json.loads(TEMPS.read_text(encoding="utf-8"))


def entrees():
    temps = lire_temps()
    manque = [ident(e, c, s) for e in EPS for c, s in variantes(e) if ident(e, c, s) not in temps]
    if manque:
        raise SystemExit("Pas de temps pour : " + ", ".join(manque))
    out = []
    for e in EPS:
        for classe in e["classes"]:
            lib, serie = SERIE[classe]
            notion, micro = e["notion"], e["micro"]
            fi = fiche(classe, notion)
            ide = ident(e, classe)
            dos = dossier(e, classe)
            nom = f"eleveai-maths-{ide}"
            prio = classe == "premiere"
            tp = temps[ide]
            t = tp["clips"]
            exos = "les exercices corrigés" + (" (automatismes de 1re)" if classe == "stmg" else "")
            acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["puces"])
            acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture {e['ceinture']}.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
            acc += f"\n\nPour s'entraîner :\n• {exos} : {fi}\n• la série du coach sur cette compétence : {coach(classe, notion, micro)}"
            acc += f"\n\n📈 Épisode {int(e['num'])} de la série Graphiques : les automatismes de l'épreuve anticipée de maths."
            titre = f"{e['titre']} · {serie}"
            qs = [{"t": mmss(t[k]), "question": q, "choix": ch, "reponse": r, "explication": x} for k, q, ch, r, x in e["qs"]]
            longue = {"id": ide}
            if prio:
                longue.update({"pas_avant": e["date"], "prioritaire": True})
            longue.update({
                "notionId": notion, "microId": micro, "classe": classe, "ceinture": e["ceinture"], "serie": serie,
                "type": "longue", "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png", "titre": titre,
                "accroche": acc, "chapitres": chap0(chapitres(e["chap"], t, tp["duree"])), "fiche": fi,
                "tags": e["tags"] + COMMUNS[:3] + [lib] + COMMUNS[3:], "questions": qs, "centres": e["centres"],
            })
            if not prio:
                longue["plus_tard"] = True
            out.append(longue)
            if "short" in e and classe == "premiere":
                sh = e["short"]
                ts = temps[f"{ide}-short"]["clips"]
                k, q, ch, r, x = sh["sq"]
                sacc = sh["sa"] + f"\n\nVoix de synthèse.\n🥋 Ceinture blanche : la version 100 % visuelle.\n👉 À toi : {sh['stoi']}"
                sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach(classe, notion, micro)}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #fonctions {HASHTAGS[classe]}"
                out.append({
                    "id": f"{ide}-short", "pas_avant": e["date"], "prioritaire": True,
                    "notionId": notion, "microId": micro, "classe": classe, "ceinture": "blanche", "serie": serie,
                    "type": "short", "renvoie_vers": ide, "fichier": f"{dos}/{nom}-short.mp4",
                    "miniature": f"{dos}/{nom}-short.png", "titre": f"{sh['st']} — {lib} #Shorts", "accroche": sacc,
                    "tags": sh["stags"] + ["lecture graphique", "maths", lib, "lycée", "EleveAI", "ceinture blanche", "Shorts"],
                    "questions": [{"t": mmss(ts[k]), "question": q, "choix": ch, "reponse": r, "explication": x}],
                    "centres": e.get("scentres", e["centres"]),
                })
            for v in out[-2:]:
                if len(v["titre"]) > 100:
                    print(f"TITRE TROP LONG ({len(v['titre'])}) : {v['titre']}", file=sys.stderr)
    return out


def coupes():
    """COUPE_PAR_VIDEO (components/LecteurVideo.tsx), comme passe_evolutions_lycee.coupes."""
    temps = lire_temps()
    res = {}
    for e in EPS:
        for classe, s in variantes(e):
            nom = ident(e, classe, s)
            if nom not in temps:
                continue
            vx = json.loads((RACINE / "manim" / "voix" / f"{voix(e, s)}.json").read_text(encoding="utf-8"))
            cle = [k for k in vx if k.endswith("abonne")][0]
            texte = vx[cle]
            marques = json.loads((SCRIPTS / f"{script(e, s)}_marques.json").read_text(encoding="utf-8"))[cle]
            debut = temps[nom]["clips"][cle]
            duree = float(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                                          "stream=duration", "-of", "csv=p=0", str(mp4(e, classe, s))],
                                         capture_output=True, text=True).stdout.strip())

            def instant(mot):
                return dict(marques)[texte.index(mot)]

            if s:
                t = debut + instant("Mets")
                res[nom] = round(duree - t + 0.03, 2)
            else:
                t_et = instant("Et si")
                avant = [m for c, m in marques if m < t_et][-1]
                t = debut + (avant + t_et) / 2
                res[nom] = round(duree - t, 1)
            print(nom, "durée vidéo", round(duree, 2), "coupe à", round(t, 2), "→", res[nom])
    return res


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        res = json.loads(TEMPS.read_text(encoding="utf-8")) if TEMPS.exists() else {}
        for e in EPS:
            for classe, s in variantes(e):
                f = mp4(e, classe, s)
                if not f.exists():
                    continue
                clips, duree = mesurer(voix(e, s), f)
                res[ident(e, classe, s)] = {"duree": duree, "clips": clips}
                print(ident(e, classe, s), duree, "fin", clips[list(clips)[-1]])
        if not res:
            raise SystemExit("Aucun mp4 trouvé : rien à mesurer.")
        TEMPS.parent.mkdir(parents=True, exist_ok=True)
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "coupes":
        print(json.dumps(coupes(), ensure_ascii=False))
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-graphiques-1re.json"
        shutil.copy(MANIFESTE, sauve)
        texte = MANIFESTE.open(encoding="utf-8", newline="").read()
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
