# passe_suites.py
# Passe finale de la série SUITES du lycée (11/11/2026) : entrées du manifeste, AU FIL DE L'EAU
# (chaque épisode en place 2 jours avant sa date). Copie adaptée de `passe_distributivite.py`,
# dont on IMPORTE la mesure : les temps des chapitres et des questions sont relevés dans l'AUDIO
# des mp4 (corrélation avec les WAV des clips), jamais estimés.
# Calendrier validé par Frédéric le 11/11 : épisode k → paysage le 17/11 + 2(k − 1) jours, short le
# lendemain ; `prioritaire: true` partout ; le short a `renvoie_vers` = sa paysage. Les 4 vidéos
# communes (05, 13, 18, 19) portent `aussi` vers la micro de la classe du dessus.
# ⛔ Le manifeste porte parfois des modifs non commitées d'autres sessions : on sauvegarde, on lit,
# on ajoute ou remplace NOS entrées seulement, on réécrit.
#
#   python manim/passe_suites.py temps [filtre]   → temps-suites.json (dans manim/sorties/)
#   python manim/passe_suites.py manifeste        → ajoute ou remplace les entrées premiere-suite-*…
import json
import shutil
import sys
import tempfile
from datetime import date, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_distributivite import mesurer, mmss  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SORTIES / "temps-suites.json"
DEBUT = date(2026, 11, 17)
SERIE = {"premiere": "Maths 1re", "premiere-spe": "Maths 1re spé", "terminale": "Maths Tle spé"}
CLASSE_COACH = {"premiere": "premiere", "premiere-spe": "premiere-spe", "terminale": "terminale-spe"}
NOM_CLASSE = {"premiere": "1re", "premiere-spe": "1re spé", "terminale": "Tle spé"}
COMMUNS = {"premiere": ["maths", "1re", "suites", "lycée", "EleveAI"],
           "premiere-spe": ["maths", "1re spé", "spé maths", "suites", "lycée", "EleveAI"],
           "terminale": ["maths", "terminale", "spé maths", "suites", "bac", "lycée", "EleveAI"]}
EXOS = {"lin_suite_arithmetique": "https://www.eleveai.fr/fiches-exercices/maths/premiere/lin-suite-arithmetique",
        "expo_suite_geometrique": "https://www.eleveai.fr/fiches-exercices/maths/premiere/expo-suite-geometrique"}


def coach(classe, notion, micro):
    return (f"https://www.eleveai.fr/coach/serie?classe={CLASSE_COACH[classe]}&matiere=maths"
            f"&notion={notion}&microId={micro}&display=simple")


def dossier(e):
    return f"{e['classe']}/maths/suites/{e['num']}-{e['slug']}"


def nom_voix(e):
    return f"{e['classe']}-suite-{e['slug']}"


# ───── Les contenus (ajoutés au fil de l'eau) ─────
# chap : clé du clip de voix → titre du chapitre (le 1er est posé à 00:00).
# qs / sq : (clé du clip « …-question », question, choix, réponse 0/1/2, explication).
EPS = [
    dict(num="01", slug="arith-reconnaitre", classe="premiere", notion="lin_suite_arithmetique", micro="lin_suite_reconnaitre",
         ceinture="verte", sc="blanche", centres=["nature-ecologie", "construction"], scentres=["course-trail", "sport"],
         titre="40, 70, 100, 130 : toujours le même pas ? — Reconnaître une suite arithmétique — épisode 1 · Maths 1re",
         intro="Lucas est agriculteur : il plante des haies d'arbres autour de ses champs. 40 arbres la première année, puis 30 de plus chaque année : 40, 70, 100, 130. Comment savoir qu'une liste de nombres avance toujours du même pas ?",
         puces=["l'écart entre deux termes qui se suivent : 70 − 40 = 30, 100 − 70 = 30…", "suite arithmétique : on ajoute toujours le même nombre, la raison r", "la raison peut être négative : le silo qui perd 60 tonnes par semaine", "un motif de carreaux en croix qui grandit de 4 à chaque étape", "le piège : 2, 4, 8, 16, les écarts changent, ce n'est pas arithmétique"],
         defi="12 ; 9,5 ; 7 ; 4,5 : est-elle arithmétique ? Si oui, quelle est sa raison ?",
         chap={"00-garde": "Suite arithmétique : la reconnaître", "01-situation": "Lucas, agriculteur : la haie", "02-ecarts": "L'écart entre deux termes", "03-definition": "La raison", "04-question": "Question 1", "05-negative": "Une raison négative : le silo", "06-motif": "Un motif en croix", "07-piege": "Le piège", "08-question": "Question 2", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("04-question", "Laquelle de ces listes est arithmétique ?", ["3 ; 6 ; 12 ; 24", "5 ; 8 ; 12 ; 17", "20 ; 17 ; 14 ; 11"], 2, "On enlève 3 à chaque fois : c'est une suite arithmétique de raison −3."),
             ("08-question", "Les termes d'une suite sont 7 ; 11 ; 15 ; 19. Sa raison est :", ["4", "−4", "7"], 0, "11 − 7 = 4 : on calcule toujours un terme moins celui d'avant, pas l'inverse.")],
         tags=["suite arithmétique", "reconnaître une suite arithmétique", "raison", "écart", "agriculteur", "haie"],
         st="10, 13, 16, 19 : tu repères le pas en 3 secondes ? 🏃‍♀️ — 1re #Shorts",
         sq=("03-question", "Laquelle avance toujours du même pas ?", ["2 ; 4 ; 8 ; 16", "50 ; 45 ; 40 ; 35", "1 ; 4 ; 9 ; 16"], 1, "On enlève 5 à chaque fois : la raison est −5."),
         sa="Inès prépare un marathon : chaque semaine, elle court 3 kilomètres de plus. 10, 13, 16, 19 kilomètres : le pas est toujours le même, + 3. C'est une suite arithmétique, de raison 3.",
         stoi="combien de kilomètres Inès courra-t-elle la 10e semaine ?", srep="37 km : 10 + 9 × 3.",
         stags=["marathon", "course à pied", "suite arithmétique", "raison"]),
    dict(num="02", slug="arith-recurrence", classe="premiere", notion="lin_suite_arithmetique", micro="lin_suite_recurrence",
         ceinture="verte", sc="blanche", centres=["musique"], scentres=["cuisine"],
         titre="uₙ₊₁ = uₙ + 300 : passer au terme suivant — La relation de récurrence — épisode 2 · Maths 1re",
         intro="Léna est programmatrice d'un festival de musique. La première édition accueille 1 200 spectateurs, et elle en prévoit 300 de plus chaque année. Combien de place réserver pour les éditions suivantes ? On passe d'un terme au suivant, et même on revient en arrière.",
         puces=["la notation uₙ : le nombre de spectateurs de l'édition n", "la relation de récurrence : uₙ₊₁ = uₙ + 300", "on déroule pas à pas : u₁, u₂, u₃…", "remonter le temps : pour reculer d'un rang, on fait l'opération inverse", "le piège : uₙ = uₙ₊₁ + 300, la relation écrite à l'envers"],
         defi="t₁ = 7,5 et tₙ₊₁ = tₙ + 2,5 : calcule t₄, pas à pas.",
         chap={"00-garde": "La relation de récurrence", "01-situation": "Léna et son festival", "02-notation": "La notation uₙ", "03-relation": "uₙ₊₁ = uₙ + 300", "04-question": "Question 1", "05-derouler": "On déroule pas à pas", "06-precedent": "Remonter le temps", "07-question": "Question 2", "08-piege": "Le piège", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("04-question", "Une chorale perd 15 choristes chaque année. vₙ est le nombre de choristes après n années. Quelle relation traduit cette situation ?", ["vₙ₊₁ = vₙ − 15", "vₙ₊₁ = 15 × vₙ", "vₙ = vₙ₊₁ − 15"], 0, "Perdre 15, c'est retirer 15 au terme actuel pour obtenir le terme suivant."),
             ("07-question", "Une suite vérifie wₙ₊₁ = wₙ − 4 et w₆ = 50. Combien vaut w₅ ?", ["46", "54", "42"], 1, "Pour reculer d'un rang, on fait l'opération inverse : 50 + 4 = 54.")],
         tags=["relation de récurrence", "suite arithmétique", "terme suivant", "terme précédent", "festival", "programmatrice"],
         st="u₁₀ = 600 : tu remontes le temps d'une suite ? 🚚 — 1re #Shorts",
         sq=("03-question", "u₁₀ = 600 (on ajoute 35 chaque semaine). Combien vaut u₉ ?", ["635", "565", "35"], 1, "On recule d'un rang : 600 − 35 = 565."),
         sa="Un food truck sert chaque semaine 35 repas de plus que la semaine d'avant : uₙ₊₁ = uₙ + 35. Pour reculer d'une semaine, on retire 35.",
         stoi="u₀ = 250. Combien vaut u₄ ?", srep="390 : 250 + 4 × 35.",
         stags=["food truck", "relation de récurrence", "remonter le temps", "suite arithmétique"]),
    dict(num="03", slug="arith-notation", classe="premiere", notion="lin_suite_arithmetique", micro="lin_suite_notation",
         ceinture="verte", sc="blanche", centres=["espace", "sciences"], scentres=["reseaux-sociaux"],
         titre="u(n), uₙ : que veut dire ce petit n ? — La notation des suites — épisode 3 · Maths 1re",
         intro="Nadia est ingénieure dans une agence spatiale : elle suit une constellation de satellites. 600 en orbite en 2026, 120 de plus chaque année. Avant une réunion, elle contrôle un rapport rempli de notations : u(n), uₙ, u(n + 1)…",
         puces=["u(n) et uₙ : deux écritures du même terme", "le n est un rang : on compte les années depuis 2026", "le premier terme : u₀ ou u₁, il faut regarder", "u(n + 1), le terme suivant : on remplace n par n + 1", "le piège : uₙ n'est pas u × n"],
         defi="les termes de w commencent à w₀ : quel est l'indice du 25e terme ? Combien de termes de w₀ à w₄₀ ?",
         chap={"00-garde": "Suites : la notation", "01-situation": "Nadia et les satellites", "02-deux-notations": "u(n) et uₙ : le même terme", "03-rang": "Le n est un rang", "04-question": "Question 1", "05-position": "Le premier terme : u₀ ou u₁", "06-n-plus-1": "u(n + 1), le terme suivant", "07-question": "Question 2", "08-piege": "Le piège : uₙ n'est pas u × n", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("04-question", "Dans le rapport, comment s'écrit le nombre de satellites en 2034 ?", ["u₈", "u₂₀₃₄", "u₉"], 0, "2034 − 2026 = 8 : c'est le terme de rang 8."),
             ("07-question", "Une suite v est définie par v(n) = 5 + 3n. Que vaut v(n + 1) ?", ["6 + 3n", "8 + 3n", "5 + 4n"], 1, "On remplace n par n + 1 : 5 + 3n + 3 = 8 + 3n.")],
         tags=["notation des suites", "u indice n", "rang", "terme suivant", "satellites", "ingénieure spatiale"],
         st="2031, c'est u₂₀₃₁ ? Le piège de l'année 📱 — 1re #Shorts",
         sq=("03-question", "Comment s'écrit le nombre d'abonnés en 2031 ?", ["u₂₀₃₁", "u₆", "u₇"], 1, "2031 − 2025 = 6 : c'est u₆."),
         sa="Un compte de vulgarisation scientifique gagne des abonnés chaque année. u(n) est le nombre d'abonnés en 2025 + n : u(0) correspond à 2025. Le n est un rang : on compte les années depuis 2025.",
         stoi="une suite commence à u₀. Quel est l'indice de son 50e terme ?", srep="49 : le 50e terme est u₄₉.",
         stags=["abonnés", "notation", "rang", "u indice n"]),
    dict(num="04", slug="arith-terme-rang", classe="premiere", notion="lin_suite_arithmetique", micro="lin_suite_terme_rang",
         ceinture="verte", sc="blanche", centres=["construction", "jeux-defis"], scentres=["velo"],
         titre="Le 20e terme sans calculer les autres — Calculer un terme lointain — épisode 4 · Maths 1re",
         intro="Hugo est carreleur. Autour de bacs à plantes carrés, il pose des bordures : 8 carreaux à l'étape 1, 12 à l'étape 2, 16 à l'étape 3. Le plus grand bac est l'étape 20 : combien de carreaux commander, sans tout calculer ?",
         puces=["la raison : 4 carreaux de plus à chaque étape", "compter les pas : de l'étape 1 à l'étape 20, 19 pas", "les formules : uₙ = u₀ + n × r, uₙ = u₁ + (n − 1) × r, uₙ = uₚ + (n − p) × r", "u₂₀ = 8 + 19 × 4 = 84 carreaux", "le piège : 8 + 20 × 4, un pas de trop"],
         defi="1 carré : 4 allumettes, 2 carrés : 7, 3 carrés : 10. Combien d'allumettes pour 50 carrés ?",
         chap={"00-garde": "Calculer un terme lointain", "01-situation": "Hugo, carreleur : le carré bordé", "02-raison": "La raison : 4 carreaux de plus", "03-compter-pas": "Compter les pas : 19 pas", "04-formules": "Les trois formules", "05-question": "Question 1", "06-autre-terme": "Depuis un autre terme", "07-piege": "Le piège : un pas de trop", "08-question": "Question 2", "09-defi": "À toi de jouer : les allumettes", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("05-question", "Une suite arithmétique de raison 5 commence à u₁ = 12. Combien vaut u₁₀ ?", ["62", "67", "57"], 2, "De u₁ à u₁₀, il y a 9 pas : 12 + 9 × 5 = 57."),
             ("08-question", "Une suite arithmétique vérifie v₄ = 30, et sa raison est −2. Combien vaut v₁₂ ?", ["14", "46", "6"], 0, "De v₄ à v₁₂, il y a 8 pas : 30 + 8 × (−2) = 14.")],
         tags=["terme général", "suite arithmétique", "calculer un terme", "compter les pas", "carreleur", "motif"],
         st="La 10e semaine : 10 pas ou 9 ? 🚴‍♀️ — 1re #Shorts",
         sq=("03-question", "Chloé roule 20 km la 1re semaine, puis 5 km de plus chaque semaine. Combien de kilomètres roule-t-elle la 10e semaine ?", ["70", "75", "65"], 2, "20 + 9 × 5 = 65 : de la semaine 1 à la semaine 10, il y a 9 pas."),
         sa="Chloé prépare une course à vélo : 20 kilomètres la 1re semaine, puis 5 de plus chaque semaine. u₁ = 20. De la semaine 1 à la semaine 10, il y a 9 pas, pas 10.",
         stoi="combien de kilomètres Chloé roulera-t-elle la 30e semaine ?", srep="165 km : 20 + 29 × 5.",
         stags=["vélo", "terme lointain", "compter les pas", "suite arithmétique"]),
]
AUSSI = {}  # num → [{"classe", "notionId", "microId"}] pour les 4 vidéos communes


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EPS:
        if nom_voix(e) not in temps:
            print("⏭ pas encore mesuré :", e["num"], e["slug"])
            continue
        k = int(e["num"])
        jour = DEBUT + timedelta(days=2 * (k - 1))
        t = temps[nom_voix(e)]["clips"]
        # ⛔ YouTube refuse TOUS les chapitres s'il y en a un de moins de 10 s : on réunit un chapitre
        # trop court avec le suivant (« garde · situation »).
        bruts = [[0.0, e["chap"][next(iter(e["chap"]))]]] + [[t[c], lib] for c, lib in list(e["chap"].items())[1:]]
        chap = [bruts[0]]
        for deb, lib in bruts[1:]:
            if deb - chap[-1][0] < 10:
                chap[-1][1] += " · " + lib
            else:
                chap.append([deb, lib])
        if temps[nom_voix(e)]["duree"] - chap[-1][0] < 10:
            raise SystemExit(f"dernier chapitre de moins de 10 s : {e['slug']}")
        chap = [[mmss(d), lib] for d, lib in chap]
        cl, nom = e["classe"], f"eleveai-maths-{e['classe']}-suite-{e['slug']}"
        dos, lien = dossier(e), coach(e["classe"], e["notion"], e["micro"])
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["puces"])
        acc += f"\n\n⏸ {len(e['qs'])} questions-pauses : mets pause, et choisis !\n🥋 Ceinture {e['ceinture']}.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
        acc += "\n\nPour s'entraîner :"
        if e["notion"] in EXOS:
            acc += f"\n• les exercices corrigés : {EXOS[e['notion']]}"
        acc += f"\n• la série du coach sur cette compétence : {lien}"
        acc += f"\n\n📈 Épisode {k} sur 38 de la série Suites d'EleveAI, de la 1re à la terminale."
        qs = [{"t": mmss(t[c]), "question": q, "choix": ch, "reponse": r, "explication": x} for c, q, ch, r, x in e["qs"]]
        base = {"notionId": e["notion"], "microId": e["micro"], "classe": cl, "serie": SERIE[cl], "prioritaire": True}
        p = {"id": f"{cl}-suite-{e['slug']}", **base, "pas_avant": jour.isoformat(), "ceinture": e["ceinture"], "type": "longue",
             "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png", "titre": e["titre"], "accroche": acc,
             "chapitres": chap, "tags": e["tags"] + COMMUNS[cl], "questions": qs, "centres": e["centres"]}
        if e["notion"] in EXOS:
            p["fiche_exercices"] = EXOS[e["notion"]]
        if e["num"] in AUSSI:
            p["aussi"] = AUSSI[e["num"]]
        out.append(p)
        tsh = temps[nom_voix(e) + "-short"]["clips"]
        c, q, ch, r, x = e["sq"]
        sacc = e["sa"] + f"\n\n🥋 Ceinture {e['sc']} : la version 100 % visuelle.\n👉 À toi : {e['stoi']} Ta réponse en commentaire !"
        sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {lien}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #suites #{NOM_CLASSE[cl].replace(' ', '')} #lycée"
        s = {"id": f"{cl}-suite-{e['slug']}-short", **base, "pas_avant": (jour + timedelta(days=1)).isoformat(), "ceinture": e["sc"],
             "type": "short", "renvoie_vers": p["id"], "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short.png",
             "titre": e["st"], "accroche": sacc, "tags": e["stags"] + COMMUNS[cl] + [f"ceinture {e['sc']}", "Shorts"],
             "questions": [{"t": mmss(tsh[c]), "question": q, "choix": ch, "reponse": r, "explication": x}], "centres": e["scentres"]}
        if e["num"] in AUSSI:
            s["aussi"] = AUSSI[e["num"]]
        out.append(s)
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        filtre = sys.argv[2] if len(sys.argv) > 2 else ""
        res = json.loads(TEMPS.read_text(encoding="utf-8")) if TEMPS.exists() else {}
        for e in EPS:
            for suf in ("", "-short"):
                nom = nom_voix(e) + suf
                if filtre not in nom:
                    continue
                mp4 = SORTIES / dossier(e) / f"eleveai-maths-{nom}.mp4"
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, {c: mmss(v) for c, v in clips.items() if "question" in c})
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-suites.json"
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
