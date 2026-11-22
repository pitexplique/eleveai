# passe_identites.py
# Passe finale de la série IDENTITÉS REMARQUABLES 4e (22/11/2026) : les 10 entrées du manifeste.
# Copie de passe_factorisation.py (shorts Manim, pas de dessin animé en 4e ; une paire par jour, prioritaire).
# Les temps des chapitres et des questions sont relevés dans l'AUDIO des mp4 (passe_distributivite.mesurer),
# jamais estimés ; un chapitre de moins de 10 s est fondu dans le précédent (passe_decimaux.chapitres).
# Le manifeste a des modifications non commitées d'autres sessions : on relit la copie de travail et on
# ajoute seulement nos 10 entrées 4e-identites-<slug>[-short].
#
#   python manim/passe_identites.py temps     → manim/sorties/4e/maths/identites/temps.json
#   python manim/passe_identites.py voir      → affiche les entrées sans rien écrire
#   python manim/passe_identites.py manifeste → ajoute ou remplace les 10 entrées
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_distributivite import mesurer, mmss  # noqa: E402
from passe_decimaux import chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "4e" / "maths" / "identites"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
NOTION = "litteral_identite_remarquable"
COURS = "https://www.eleveai.fr/fiches-cours/maths/4e/litteral-identite-remarquable"
EXOS = "https://www.eleveai.fr/fiches-exercices/maths/4e/litteral-identite-remarquable"


def coach(micro):
    return f"https://www.eleveai.fr/coach/serie?classe=4e&matiere=maths&notion={NOTION}&microId={micro}&display=simple"


EPS = [
    dict(num="01", slug="lier", n=1, micro="litteral_identite_lier_distributivite", date="2027-06-25", ceinture="jaune", sc="jaune",
         centres=["art-design", "histoire-geographie"], scentres=["jeux-defis"],
         titre="(x + 4)² : d'où vient la formule ? — Identités remarquables — épisode 1 · Maths 4e",
         intro="Nadia est architecte. Une cliente a une terrasse carrée de x mètres de côté, et veut l'agrandir de 4 mètres dans chaque sens. Quelle est la nouvelle aire ? Un carré découpé va nous montrer d'où vient la formule.",
         puces=["(x + 4)², c'est (x + 4) × (x + 4) : une expression multipliée par elle-même",
                "la terrasse découpée : le carré x², deux bandes de 4x, le coin 16",
                "c'est exactement la double distributivité : 4 produits, 4 morceaux",
                "on réduit : (x + 4)² = x² + 8x + 16, les deux bandes forment le double produit",
                "le piège : (x + 4)² ≠ x² + 16, on a oublié les bandes",
                "avec des lettres : (a + b)² = a² + 2ab + b²"],
         defi="développe (x + 6)².",
         chap={"00-garde": "Le carré d'une somme", "01-architecte": "Nadia, architecte", "02-carre": "Côté fois côté",
               "02q-question": "Question 1", "03-decoupe": "La terrasse découpée", "04-distributivite": "La double distributivité",
               "05-reduire": "Réduire : le double produit", "05b-verifier": "On vérifie pour x = 1", "06-piege": "Le piège",
               "06q-question": "Question 2", "07-formule": "Avec des lettres : (a + b)²", "08-defi": "À toi de jouer",
               "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
         qs=[("02q-question", "Que veut dire (x + 5)² ?", ["(x + 5) × 2", "(x + 5) × (x + 5)", "x² + 25"], 1,
              "Le carré, c'est l'expression multipliée par elle-même."),
             ("06q-question", "Développe (x + 2)².", ["x² + 4", "x² + 2x + 4", "x² + 4x + 4"], 2,
              "Les deux bandes valent 2x chacune : 4x en tout.")],
         tags=["identités remarquables", "carré d'une somme", "double distributivité", "double produit", "développer",
               "calcul littéral", "architecte", "aire d'un carré"],
         st="(x + 5)² = x² + 25 ? Faux ! Il manque deux bandes 🔍 — 4e #Shorts",
         sq=("01q-question", "(x + 1)², ça fait combien ?", ["x² + 2x + 1", "x² + 1", "x² + x + 1"], 0,
             "Deux bandes de x : 2x."),
         sa="Un carré de côté x. On allonge chaque côté de 5. Son aire gagne seulement 25 ? Non : il y a aussi deux bandes de 5x, qu'on oublie souvent.\n(x + 5)² = x² + 10x + 25.",
         stoi="développe (x + 7)². Réponds en commentaire !",
         stags=["carré d'une somme", "identités remarquables", "double produit"]),
    dict(num="02", slug="reconnaitre", n=2, micro="litteral_identite_reconnaitre", date="2027-06-26", ceinture="jaune", sc="jaune",
         centres=["argent-budget", "transports"], scentres=["jeux-defis"],
         titre="49 × 51 de tête : les 3 formes — Identités remarquables — épisode 2 · Maths 4e",
         intro="Karim est comptable dans un magasin de vélos. Il doit calculer 49 × 51, sans calculatrice. Il trouve tout de suite : 2 499. Son secret ? Il a reconnu une forme.",
         puces=["les trois formes : (a + b)², (a − b)², (a + b)(a − b)",
                "deux parenthèses identiques avec un plus : (a + b)²",
                "avec un moins : (a − b)²",
                "les mêmes termes avec des signes contraires : (a + b)(a − b) ; 49 × 51 = (50 − 1)(50 + 1) = 2 499",
                "le piège : (x + 3)(x + 5) n'est aucune des trois formes, on fait la double distributivité"],
         defi="donne la forme de (3x + 1)², (y − 5)(y + 5) et (10 − x)².",
         chap={"00-garde": "Les trois formes", "01-comptable": "Karim, comptable", "02-trois": "Trois formes à reconnaître",
               "03-somme": "Le carré d'une somme", "04-difference": "Le carré d'une différence", "04q-question": "Question 1",
               "05-produit": "Somme fois différence", "06-piege": "Le piège", "06q-question": "Question 2",
               "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
         qs=[("04q-question", "Quelle est la forme de (x − 6)² ?", ["(a − b)²", "(a + b)²", "(a + b)(a − b)"], 0,
              "Deux parenthèses identiques avec un moins."),
             ("06q-question", "Laquelle est une identité remarquable ?", ["(x + 4)(x + 2)", "(x + 4)(2x − 4)", "(x − 4)(x + 4)"], 2,
              "Les mêmes termes, x et 4, avec des signes contraires.")],
         tags=["identités remarquables", "reconnaître une identité", "calcul mental", "49 × 51", "calcul littéral",
               "comptable", "vélos"],
         st="49 × 51 de tête en 3 secondes ? Vrai ! Le secret 🧠 — 4e #Shorts",
         sq=("01q-question", "Laquelle a la même forme que 49 × 51 ?", ["(x + 3)²", "(x − 3)²", "(x − 3)(x + 3)"], 2,
             "Les mêmes termes, avec des signes contraires."),
         sa="49 × 51 de tête, en 3 secondes ? 49 = 50 − 1, 51 = 50 + 1 : les mêmes termes avec des signes contraires. C'est la forme (a − b)(a + b) : 50² − 1 = 2 499.",
         stoi="écris 29 × 31 avec la même forme. Réponds en commentaire !",
         stags=["calcul mental", "identités remarquables", "astuce de calcul"]),
    dict(num="03", slug="developper", n=3, micro="litteral_identite_developper", date="2027-06-27", ceinture="orange", sc="orange",
         centres=["nature-ecologie", "art-design"], scentres=["jeux-defis"],
         titre="Développer (a + b)² en une ligne — Identités remarquables — épisode 3 · Maths 4e",
         intro="Lina est paysagiste. Dans un jardin public, elle construit un bassin carré de x mètres de côté, entouré d'une allée de 1 mètre. Le grand carré a pour côté x + 2. Quelle est l'aire de l'allée ?",
         puces=["on repère a et b, puis on écrit les trois termes : a², 2ab, b²",
                "(x + 2)² − x² : l'aire de l'allée vaut 4x + 4",
                "(a − b)² : le double produit est négatif, le dernier terme positif",
                "avec un coefficient : (2x + 3)², le carré de 2x, c'est 4x²",
                "(a + b)(a − b) = a² − b² ne garde que deux termes"],
         defi="l'allée fait 2 m de large : quelle est son aire ?",
         chap={"00-garde": "Développer avec une identité", "01-paysagiste": "Lina, paysagiste", "02-somme": "a², 2ab, b²",
               "03-allee": "L'aire de l'allée", "03q-question": "Question 1", "04-difference": "Le carré d'une différence",
               "05-coefficient": "Avec un coefficient", "05b-produit": "Somme fois différence", "05q-question": "Question 2",
               "06-defi": "À toi de jouer", "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Développe (x + 10)².", ["x² + 100", "x² + 10x + 100", "x² + 20x + 100"], 2,
              "Le double produit : 2 × x × 10 = 20x."),
             ("05q-question", "Développe (x + 9)(x − 9).", ["x² − 18x − 81", "x² − 81", "x² + 81"], 1,
              "(a + b)(a − b) = a² − b² : x² − 81.")],
         tags=["identités remarquables", "développer", "carré d'une différence", "double produit", "calcul littéral",
               "paysagiste", "aire d'une allée"],
         st="(2x + 3)² = 2x² + … ? Faux ! Le carré piégé 🔍 — 4e #Shorts",
         sq=("01q-question", "(5x)², ça fait combien ?", ["5x²", "25x²", "10x"], 1, "5x × 5x : 5 × 5, et x × x."),
         sa="(2x + 3)². Ça commence par 2x² ? Attention au piège ! a vaut 2x : a² = 2x × 2x = 4x². 2ab = 2 × 2x × 3 = 12x. b² = 9.\n(2x + 3)² = 4x² + 12x + 9.",
         stoi="développe (3x − 2)². Réponds en commentaire !",
         stags=["carré d'une somme", "identités remarquables", "piège"]),
    dict(num="04", slug="choisir", n=4, micro="litteral_identite_choisir", date="2027-06-28", ceinture="orange", sc="orange",
         centres=["art-design"], scentres=["jeux-defis"],
         titre="Identité ou double distributivité ? — Identités remarquables — épisode 4 · Maths 4e",
         intro="Emma est styliste. Pour un défilé, elle découpe une nappe carrée de côté x + 5 et un foulard rectangulaire de x + 5 sur x − 2. Quelle est l'aire de chaque pièce ? Pas la même méthode pour les deux !",
         puces=["avant de développer, on regarde les parenthèses",
                "identiques : un carré, (x + 5)² = x² + 10x + 25",
                "les mêmes termes avec des signes contraires : a² − b²",
                "sinon : la double distributivité, qui marche toujours",
                "le piège : forcer une identité ; mais (x + 3)(3 + x), c'est bien un carré"],
         defi="choisis la méthode, puis développe (x − 3)(x + 8) et (x − 3)(x + 3).",
         chap={"00-garde": "Choisir la bonne méthode", "01-styliste": "Emma, styliste", "02-nappe": "La nappe : un carré",
               "03-foulard": "Le foulard : la double distributivité", "03q-question": "Question 1", "04-methode": "La méthode",
               "05-piege": "Le piège", "05q-question": "Question 2", "06-defi": "À toi de jouer",
               "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Pour (x − 7)(x + 7), quelle méthode est la plus rapide ?",
              ["l'identité (a − b)(a + b)", "l'identité (a − b)²", "aucune identité ne marche"], 0,
              "Les mêmes termes, avec des signes contraires : x² − 49."),
             ("05q-question", "Développe (4 + x)(x + 4).", ["x² + 16", "x² + 4x + 16", "x² + 8x + 16"], 2,
              "4 + x et x + 4, c'est pareil : c'est (x + 4)².")],
         tags=["identités remarquables", "double distributivité", "choisir une méthode", "développer", "calcul littéral",
               "styliste", "couture"],
         st="(x + 6)(x − 6) : 4 produits ? Il y a plus rapide ⚡ — 4e #Shorts",
         sq=("01q-question", "Et pour (x + 6)(x − 1) ?", ["la double distributivité", "l'identité (a + b)²", "l'identité (a + b)(a − b)"], 0,
             "6 et 1 sont différents : pas d'identité."),
         sa="(x + 6)(x − 6). Tu sors les quatre produits ? Les mêmes termes avec des signes contraires : l'identité donne tout de suite x² − 36. Avec les quatre produits, 6x et −6x s'annulent : même résultat, en plus long.",
         stoi="développe (x − 10)(x + 10). Réponds en commentaire !",
         stags=["identités remarquables", "astuce", "double distributivité"]),
    dict(num="05", slug="defi", n=5, micro="litteral_identite_defi", date="2027-06-29", ceinture="verte", sc="orange",
         centres=["technologie-ia", "sciences"], scentres=["jeux-defis"],
         titre="(x + 5)² = x² + 25 ? Faux ! — Identités remarquables — épisode 5 · Maths 4e",
         intro="Aya est ingénieure en intelligence artificielle. Elle apprend à un correcteur automatique à repérer les erreurs des élèves. Sur une copie : (x + 5)² = x² + 25. Comment le correcteur sait-il que c'est faux ?",
         puces=["tester avec un nombre : si les deux côtés diffèrent, l'égalité est fausse",
                "l'erreur n° 1 : oublier le double produit",
                "l'erreur n° 2 : dans (a − b)², le dernier terme reste positif",
                "l'erreur n° 3 : (x − 2)² n'est pas x² − 4",
                "le carré de 2x, c'est 4x²"],
         defi="trouve l'erreur dans (2x + 1)² = 2x² + 4x + 1.",
         chap={"00-garde": "Les erreurs des identités", "01-ingenieure": "Aya, ingénieure en IA", "02-test": "Tester avec un nombre",
               "03-erreur1": "Erreur 1 : le double produit", "03q-question": "Question 1", "04-erreur2": "Erreur 2 : le signe",
               "05-erreur3": "Erreur 3", "05q-question": "Question 2", "06-defi": "Défi : trouve l'erreur",
               "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Quelle égalité est juste ?", ["(x + 9)² = x² + 81", "(x + 9)² = x² + 9x + 81", "(x + 9)² = x² + 18x + 81"], 2,
              "Le double produit : 2 × x × 9 = 18x."),
             ("05q-question", "Une copie dit : (x − 2)² = x² − 4. Le correcteur teste x = 5. Que trouve-t-il ?",
              ["9 à gauche, 9 à droite : c'est juste", "9 à gauche, 21 à droite : c'est faux", "21 à gauche, 9 à droite : c'est faux"], 1,
              "(5 − 2)² = 9 et 5² − 4 = 21 : c'est faux.")],
         tags=["identités remarquables", "erreurs fréquentes", "vérifier un calcul", "double produit", "calcul littéral",
               "ingénieure", "intelligence artificielle"],
         st="(2 + 8)² = 2² + 8² ? Faux ! Vérifions 🔍 — 4e #Shorts",
         sq=("01q-question", "Et avec x : (x + 8)² ?", ["x² + 64", "x² + 16x + 64", "x² + 8x + 64"], 1,
             "Le double produit : 2 × x × 8."),
         sa="(2 + 8)², est-ce égal à 2² + 8² ? À gauche : 10² = 100. À droite : 4 + 64 = 68. Il manque 32 : le double produit, 2 × 2 × 8.\n(a + b)², ce n'est pas a² + b² !",
         stoi="combien vaut (1 + 9)² − 1² − 9² ? Réponds en commentaire !",
         stags=["erreur fréquente", "identités remarquables", "double produit"]),
]

COMMUNS = ["maths", "4e", "collège", "cycle 4", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EPS:
        slug, rep = e["slug"], f"{e['num']}-{e['slug']}"
        dos = f"4e/maths/identites/{rep}"
        nom = f"eleveai-maths-4e-identites-{slug}"
        ident = f"4e-identites-{slug}"
        micro = e["micro"]
        tp = temps[ident]
        t = tp["clips"]
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["puces"])
        acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture {e['ceinture']}.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
        acc += f"\n\nPour s'entraîner :\n• la fiche de cours : {COURS}\n• les exercices corrigés : {EXOS}\n• la série du coach sur cette compétence : {coach(micro)}"
        acc += f"\n\n🔢 Épisode {e['n']} sur 5 de la série Identités remarquables d'EleveAI, en 4e."
        qs = [{"t": mmss(t[c]), "question": q, "choix": ch, "reponse": r, "explication": x} for c, q, ch, r, x in e["qs"]]
        out.append({
            "id": ident, "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": micro, "classe": "4e",
            "ceinture": e["ceinture"], "serie": "Maths 4e", "type": "longue", "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png",
            "titre": e["titre"], "accroche": acc, "chapitres": chapitres(e["chap"], t, tp["duree"]), "fiche": COURS, "fiche_exercices": EXOS,
            "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
        ts = temps[f"{ident}-short"]["clips"]
        c, q, ch, r, x = e["sq"]
        sacc = e["sa"] + f"\n\nVoix de synthèse.\n🥋 Ceinture {e['sc']}.\n👉 À toi : {e['stoi']}"
        sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach(micro)}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #identitesremarquables #4e #collège"
        out.append({
            "id": f"{ident}-short", "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": micro, "classe": "4e",
            "ceinture": e["sc"], "serie": "Maths 4e", "type": "short", "renvoie_vers": ident,
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short.png",
            "titre": e["st"], "accroche": sacc, "tags": e["stags"] + ["calcul littéral"] + COMMUNS + [f"ceinture {e['sc']}", "Shorts"],
            "questions": [{"t": mmss(ts[c]), "question": q, "choix": ch, "reponse": r, "explication": x}], "centres": e["scentres"],
        })
        for tt in (e["titre"], e["st"]):
            if len(tt) > 100:
                print(f"TITRE TROP LONG ({len(tt)}) : {tt}", file=sys.stderr)
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        res = json.loads(TEMPS.read_text(encoding="utf-8")) if TEMPS.exists() else {}
        filtre = sys.argv[2] if len(sys.argv) > 2 else ""
        for e in EPS:
            for suf in ("", "-short"):
                nom = f"4e-identites-{e['slug']}{suf}"
                mp4 = SERIE / f"{e['num']}-{e['slug']}" / f"eleveai-maths-{nom}.mp4"
                if filtre not in nom or not mp4.exists():
                    continue
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-identites.json"
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
