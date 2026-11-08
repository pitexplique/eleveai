# passe_puissances_5e.py
# Passe finale de la série CARRÉ ET CUBE 5e (notion puissance_simple, 08/11/2026) : les 10 entrées
# du manifeste. Même machinerie que `passe_relatifs.py` : les temps des chapitres et des questions
# sont relevés dans l'AUDIO de chaque mp4 (corrélation avec les WAV des clips), jamais estimés.
# Le manifeste a des modifications non commitées d'autres sessions : on sauvegarde, on lit, puis on
# écrit dans une étape séparée, en AJOUTANT seulement nos 10 entrées.
# Pas de fiche de cours ni d'exercices pour cette notion (08/11) : les liens mènent au coach.
#
#   python manim/passe_puissances_5e.py temps     → manim/sorties/5e/maths/puissance-simple/temps.json
#   python manim/passe_puissances_5e.py manifeste → ajoute ou remplace les 10 entrées 5e-puissance-*
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from passe_relatifs import mesurer, mmss  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "5e" / "maths" / "puissance-simple"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
PAS_AVANT = "2026-12-01"  # date de prudence : rien sur YouTube sans son ordre
NOTION = "puissance_simple"


def coach(micro):
    return f"https://www.eleveai.fr/coach/serie?classe=5e&matiere=maths&notion={NOTION}&microId={micro}&display=simple"


EPS = [
    dict(num="01", slug="notation", micro="puissance_simple_notation", n=1, ceinture="blanche", sc="blanche", centres=["jeux-video", "jeux-defis"],
         titre="5², ce n'est pas 5 × 2 — Le carré et le cube — épisode 1 · Maths 5e",
         intro="Lucas est créateur de jeux vidéo. Il dessine un héros sur une grille de 5 pixels sur 5 : combien de pixels ? Puis il construit un coffre de 3 blocs sur 3 sur 3. Deux écritures pour aller vite : le carré et le cube.",
         puces=["5 × 5 s'écrit 5² et se lit « 5 au carré »", "3 × 3 × 3 s'écrit 3³ et se lit « 3 au cube »", "l'exposant compte les facteurs : 5² n'est pas 5 × 2, x² n'est pas x + x"],
         defi="écrire 6 × 6 avec un exposant, puis 2³ sous forme de produit.",
         chap={"01-situation": "Lucas, créateur de jeux vidéo", "02-carre": "Le carré", "03-cube": "Le cube", "03q-question": "Question 1", "04-exposant": "L'exposant", "05-piege": "Le piège", "05q-question": "Question 2", "06-defi": "À toi de jouer", "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Comment écrire 7 × 7 ?", ["7²", "7 × 2", "2²"], 0, "Le 7 est multiplié par lui-même : 7 × 7 = 7²."),
             ("05q-question", "Quel produit est égal à 4³ ?", ["4 × 3", "4 × 4 × 4", "3 × 3 × 3 × 3"], 1, "Avec l'exposant 3, le 4 est écrit trois fois.")],
         tags=["carré", "cube", "exposant", "notation puissance", "au carré", "au cube", "pixels", "créateur de jeux vidéo"],
         st="3 au cube, ça fait 9 ? Tu paries que c'est faux ? #maths #5e",
         sq=("02q-question", "Combien vaut 2³ ?", ["6", "8", "9"], 1, "2 × 2 × 2 = 8, pas 2 × 3."),
         sa="Ti Margo pose des dés : 3 rangées de 3, c'est 3², 9 dés. Mais un cube a une hauteur : 3 couches de 9, 27 dés.\n3³ = 3 × 3 × 3 = 27 : le carré et le cube, empilés sous tes yeux.",
         stoi="combien de dés pour un cube de 4 dés de côté ? Écris-le avec un exposant. Réponds en commentaire !",
         stags=["dés", "cube", "carré"]),
    dict(num="02", slug="valeurs", micro="puissance_simple_valeurs", n=2, ceinture="blanche", sc="blanche", centres=["cuisine"],
         titre="Les carrés de 0 à 12, et l'astuce pour ne plus les oublier — épisode 2 · Maths 5e",
         intro="Karim est chef pâtissier. Il range ses macarons en carrés : 1 sur 1, 2 sur 2… jusqu'à 12 sur 12. Combien de macarons sur chaque plaque ? Les carrés de 0 à 12, une astuce pour les vérifier, et les cubes à connaître.",
         puces=["les carrés de 0 à 12 : 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144", "l'astuce de la bordure : on ajoute les nombres impairs", "2³ = 8, 3³ = 27, 10³ = 1 000 : avec 10, l'exposant compte les zéros"],
         defi="11², 12², et le nombre dont le carré vaut 64.",
         chap={"01-situation": "Karim, chef pâtissier", "02-petits": "Les carrés de 1 à 6", "03-grands": "Les carrés de 7 à 12", "04-astuce": "L'astuce de la bordure", "04q-question": "Question 1", "05-cubes": "Trois cubes à connaître", "06-piege": "Le piège", "06q-question": "Question 2", "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
         qs=[("04q-question", "Combien vaut 7² ?", ["14", "49", "77"], 1, "7 × 7 = 49 ; 14, c'est 7 × 2 : le piège."),
             ("06q-question", "Quel nombre, au carré, donne 81 ?", ["8", "9", "27"], 1, "9 × 9 = 81.")],
         tags=["carrés de 0 à 12", "tables des carrés", "cube", "10 au cube", "calcul mental", "macarons", "chef pâtissier"],
         st="12 au carré sans calculatrice : tu paries que tu le connais ? #maths #5e",
         sq=("02q-question", "Combien vaut 9² ?", ["18", "81", "99"], 1, "9 × 9 = 81, pas 9 × 2."),
         sa="Ti Margo pose des dalles en carré : 3 sur 3, 4 sur 4, 5 sur 5. Son astuce : une bordure pour passer au carré suivant.\n25 + 11 = 36, 36 + 13 = 49… jusqu'à 12² = 144 dalles.",
         stoi="combien font 11² ? Réponds en commentaire !",
         stags=["dalles", "carrés", "calcul mental"]),
    dict(num="03", slug="ecrire", micro="puissance_simple_ecrire", n=3, ceinture="jaune", sc="jaune", centres=["musique", "art-design"],
         titre="64 est un carré… et un cube ! Écrire un nombre avec un exposant — épisode 3 · Maths 5e",
         intro="Sarah est éclairagiste : elle installe les lumières des concerts. Avec 64 projecteurs, peut-elle faire un carré parfait ? Et ranger 64 boîtiers dans une caisse en cube ? Écrire un nombre comme un carré ou comme un cube.",
         puces=["64 = 8 × 8 = 8² et 64 = 4 × 4 × 4 = 4³", "avec 10, on compte les zéros : 100 = 10², 1 000 = 10³", "le piège : 64 n'est pas 32² ; 50 est entre 7² et 8², ce n'est pas un carré"],
         defi="écrire 81 comme un carré, 27 comme un cube, et 1 000 avec un exposant.",
         chap={"01-situation": "Sarah, éclairagiste", "02-carre": "64, un carré", "03-cube": "64, un cube", "03q-question": "Question 1", "04-dix": "Avec 10, on compte les zéros", "05-piege": "Le piège", "05q-question": "Question 2", "06-defi": "À toi de jouer", "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Comment écrire 125 avec un exposant ?", ["5²", "5³", "25²"], 1, "5 × 5 = 25, puis 25 × 5 = 125 : 125 = 5³."),
             ("05q-question", "50 est-il un carré ?", ["Oui, 25²", "Non, il est entre 7² et 8²", "Oui, 5²"], 1, "7² = 49 et 8² = 64 : 50 est entre les deux.")],
         tags=["écrire avec un exposant", "carré parfait", "cube", "puissance de 10", "projecteurs", "concert", "éclairagiste"],
         st="64 lanternes : tu paries que j'en fais un carré, et aussi un cube ? #maths #5e",
         sq=("02q-question", "100 égale…", ["50²", "10²", "10³"], 1, "10 × 10 = 100 : deux zéros, exposant 2."),
         sa="Ti Margo a 64 lanternes. D'abord un carré : 8 rangées de 8, 64 = 8². Puis un cube : 4 sur 4, et 4 étages, 64 = 4³.\nUn même nombre, deux écritures avec un exposant.",
         stoi="écris 49 comme un carré, et 27 comme un cube. Réponds en commentaire !",
         stags=["lanternes", "carré", "cube"]),
    dict(num="04", slug="calculer", micro="puissance_simple_calculer", n=4, ceinture="jaune", sc="jaune", centres=["animaux", "nature-ecologie"],
         titre="3 + 4², ça ne fait pas 49 — Calculer avec des carrés et des cubes — épisode 4 · Maths 5e",
         intro="Inès est soigneuse dans un zoo. Elle prépare deux enclos carrés pour des tortues, de 6 m et de 4 m de côté : quelle surface couvrir de paille ? Un calcul avec des carrés, et la règle qui dit par où commencer.",
         puces=["6² + 4² = 36 + 16 = 52", "la puissance passe en premier : 3 + 4² = 3 + 16 = 19", "le carré ne porte que sur le nombre juste avant : 2 × 5² = 50, pas 100"],
         defi="4 + 3³ et 3 × 2².",
         chap={"01-situation": "Inès, soigneuse dans un zoo", "02-somme": "Deux enclos carrés", "03-priorite": "La puissance d'abord", "03q-question": "Question 1", "04-produit": "Avec une multiplication", "05-piege": "Le piège", "05q-question": "Question 2", "06-defi": "À toi de jouer", "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Combien vaut 2 + 5² ?", ["49", "27", "12"], 1, "D'abord 5² = 25, puis 2 + 25 = 27."),
             ("05q-question", "Combien vaut 10² − 6² ?", ["16", "64", "4"], 1, "100 − 36 = 64 ; ce n'est pas 4².")],
         tags=["priorités opératoires", "calculer avec des puissances", "carré", "cube", "aire d'un carré", "zoo", "soigneuse animalière"],
         st="2 + 3² = 25 : tu paries que j'ai gagné la peluche ? #maths #5e",
         sq=("02q-question", "Combien vaut 2 × 5² ?", ["100", "50", "20"], 1, "5² = 25, puis 2 × 25 = 50."),
         sa="Au stand de la fête foraine, Ti Margo répond 25 à 2 + 3². Raté : le carré passe d'abord, 2 + 9 = 11.\nDeuxième essai, 2 × 3² = 18 : la peluche est à lui ?",
         stoi="combien font 10² − 2³ ? Réponds en commentaire !",
         stags=["fête foraine", "priorités opératoires", "carré"]),
    dict(num="05", slug="litteral", micro="puissance_simple_litteral", n=5, ceinture="jaune", sc="jaune", centres=["espace", "sciences"],
         titre="3x² avec x = 2, ça ne fait pas 36 — Une lettre au carré — épisode 5 · Maths 5e",
         intro="Clara est ingénieure spatiale. Les panneaux solaires de son satellite sont carrés : si le côté mesure c mètres, l'aire est c². Et si c vaut 3 ? Remplacer une lettre par un nombre dans une expression avec un carré ou un cube.",
         puces=["on remplace la lettre par sa valeur : c² = 3² = 9", "puis la puissance d'abord : x² + 5 = 16 + 5 = 21 pour x = 4", "le carré ne porte que sur la lettre : 3x² = 12 pour x = 2, pas 36"],
         defi="x² − 1 pour x = 10, et a³ + 1 pour a = 3.",
         chap={"01-situation": "Clara, ingénieure spatiale", "02-remplacer": "Remplacer la lettre", "03-somme": "Une autre formule", "03q-question": "Question 1", "04-cube": "Le volume d'un cube", "05-piege": "Le piège", "05q-question": "Question 2", "06-defi": "À toi de jouer", "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Si x = 5, combien vaut x² ?", ["10", "25", "7"], 1, "5 × 5 = 25 ; 10, c'est 5 × 2 : le piège."),
             ("05q-question", "Si a = 3, combien vaut 2a² ?", ["36", "12", "18"], 2, "3² = 9, puis 2 × 9 = 18.")],
         tags=["expression littérale", "substituer", "lettre au carré", "x au carré", "aire et volume", "satellite", "ingénieure spatiale"],
         st="Ma machine : x entre, x² + 1 sort. Avec 3, tu paries qu'elle sort 7 ? #maths #5e",
         sq=("02q-question", "Je mets 5. Que sort la machine ?", ["11", "26", "36"], 1, "5² = 25, plus 1 : 26."),
         sa="Ti Margo a construit une machine : tu mets x, elle sort x² + 1. Avec 3 : 3² = 9, plus 1, 10. Pas 7 !\nRemplacer la lettre, puis le carré d'abord.",
         stoi="si x vaut 10, combien vaut 2 × x² ? Réponds en commentaire !",
         stags=["machine", "expression littérale", "x au carré"]),
]

COMMUNS = ["puissances", "carré et cube", "maths", "5e", "collège", "cycle 4", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EPS:
        slug, rep = e["slug"], f"{e['num']}-{e['slug']}"
        dos = f"5e/maths/puissance-simple/{rep}"
        nom = f"eleveai-maths-5e-puissance-{slug}"
        t = temps[f"5e-puissance-{slug}"]["clips"]
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["puces"])
        acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture {e['ceinture']}.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
        acc += f"\n\nPour s'entraîner, la série du coach sur cette compétence : {coach(e['micro'])}"
        acc += f"\n\n🔢 Épisode {e['n']} sur 5 de la série Carré et cube d'EleveAI, en 5e (nouveau programme 2026)."
        chap = [["00:00", e["chap"][next(iter(e["chap"]))]]] + [[mmss(t[c]), lib] for c, lib in list(e["chap"].items())[1:]]
        qs = [{"t": mmss(t[c]), "question": q, "choix": ch, "reponse": r, "explication": x} for c, q, ch, r, x in e["qs"]]
        out.append({
            "id": f"5e-puissance-{slug}", "pas_avant": PAS_AVANT, "notionId": NOTION, "microId": e["micro"], "classe": "5e",
            "ceinture": e["ceinture"], "serie": "Maths 5e", "type": "longue", "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png",
            "titre": e["titre"], "accroche": acc, "chapitres": chap,
            "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
        ts = temps[f"5e-puissance-{slug}-short"]["clips"]
        c, q, ch, r, x = e["sq"]
        sacc = e["sa"] + f"\n\nFilm d'animation 3D, voix de synthèse.\n🥋 Ceinture {e['sc']}.\n👉 À toi : {e['stoi']}"
        sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach(e['micro'])}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #puissances #5e #collège"
        out.append({
            "id": f"5e-puissance-{slug}-short", "pas_avant": PAS_AVANT, "notionId": NOTION, "microId": e["micro"], "classe": "5e",
            "ceinture": e["sc"], "serie": "Maths 5e", "type": "short", "renvoie_vers": f"5e-puissance-{slug}",
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short-miniature.png",
            "titre": e["st"], "accroche": sacc, "tags": e["stags"] + ["Ti Margo", "dessin animé", "film d'animation 3D"] + COMMUNS + ["Shorts"],
            "questions": [{"t": mmss(ts[c]), "question": q, "choix": ch, "reponse": r, "explication": x}], "centres": e["centres"],
        })
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        res = {}
        for e in EPS:
            for suf in ("", "-short"):
                nom = f"5e-puissance-{e['slug']}{suf}"
                mp4 = SERIE / f"{e['num']}-{e['slug']}" / f"eleveai-maths-{nom}.mp4"
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-puissances-5e.json"
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
