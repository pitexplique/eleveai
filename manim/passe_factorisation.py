# passe_factorisation.py
# Passe finale de la série FACTORISATION 4e (13/11/2026) : les 10 entrées du manifeste.
# Calquée sur passe_distributivite.py (shorts Manim, pas de dessin animé en 4e) et
# passe_calcul_mental.py (dates une paire par jour, prioritaire). Les temps des chapitres et des
# questions sont relevés dans l'AUDIO des mp4 (passe_distributivite.mesurer), jamais estimés ;
# un chapitre de moins de 10 s est fondu dans le précédent (passe_decimaux.chapitres).
# Le manifeste a des modifications non commitées d'autres sessions : on relit la copie de travail
# et on ajoute seulement.
#
#   python manim/passe_factorisation.py temps     → manim/sorties/4e/maths/factorisation/temps.json
#   python manim/passe_factorisation.py voir      → affiche les entrées sans rien écrire
#   python manim/passe_factorisation.py manifeste → ajoute ou remplace les 10 entrées 4e-facto-<slug>[-short]
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_distributivite import mesurer, mmss  # noqa: E402
from passe_decimaux import chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "4e" / "maths" / "factorisation"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
NOTION = "litteral_factorisation"
COURS = "https://www.eleveai.fr/fiches-cours/maths/4e/litteral-factorisation"
EXOS = "https://www.eleveai.fr/fiches-exercices/maths/4e/litteral-factorisation"


def coach(micro):
    return f"https://www.eleveai.fr/coach/serie?classe=4e&matiere=maths&notion={NOTION}&microId={micro}&display=simple"


EPS = [
    dict(num="01", slug="commun", n=1, micro="litteral_facteur_commun", date="2026-12-20", ceinture="jaune", sc="jaune",
         centres=["transports"], scentres=["jeux-defis"],
         titre="5x + 10 : qu'est-ce qui se répète ? — Le facteur commun — épisode 1 · Maths 4e",
         intro="Inès est logisticienne. Ce matin, 5 camions partent de l'entrepôt : dans chacun, x palettes de riz et 2 palettes d'eau. En tout : 5x + 10. Qu'est-ce qui se répète dans cette somme ?",
         puces=["écrire chaque terme comme un produit : 5x = 5 × x, 10 = 5 × 2", "le facteur commun : le 5 revient dans chaque terme",
                "une lettre aussi peut être commune : x² + 7x", "le piège : prendre le premier nombre qu'on voit (6x + 9 : c'est 3, pas 6)",
                "pour être commun, il faut être dans CHAQUE terme : dans 3x + 5, x n'est pas commun"],
         defi="trouve le facteur commun de 10x + 15.",
         chap={"00-garde": "Voir ce qui se répète", "01-logisticienne": "Inès, logisticienne", "02-produits": "Chaque terme en produit",
               "03-lettre": "Une lettre en commun", "03q-question": "Question 1", "04-piege": "Le piège", "05-absent": "Dans chaque terme",
               "05q-question": "Question 2", "06-defi": "À toi de jouer", "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Dans 7x + 14, quel est le facteur commun ?", ["7", "14", "x"], 0, "7x, c'est 7 × x, et 14, c'est 7 × 2."),
             ("05q-question", "Dans y² + 3y, quel est le facteur commun ?", ["3", "y", "y²"], 1, "y², c'est y × y, et 3y, c'est 3 × y. Le 3 n'est pas dans y².")],
         tags=["facteur commun", "factorisation", "factoriser", "calcul littéral", "logisticienne", "camions"],
         st="14, 21 et 35 : le nombre caché en 5 secondes ? 🔍 — 4e #Shorts",
         sq=("01q-question", "Dans 5x + 15, quel est le facteur commun ?", ["5", "15", "x"], 0, "5x, c'est 5 × x, et 15, c'est 5 × 3."),
         sa="14, 21 et 35. Un même nombre se cache dans les trois. 14 = 7 × 2, 21 = 7 × 3, 35 = 7 × 5 : le 7 est leur facteur commun.\nEt avec une lettre, ça marche aussi.",
         stoi="quel est le facteur commun de 15x + 35 ? Réponds en commentaire !",
         stags=["nombre caché", "facteur commun", "tables de multiplication"]),
    dict(num="02", slug="simple", n=2, micro="litteral_factoriser_simple", date="2026-12-21", ceinture="jaune", sc="jaune",
         centres=["technologie-ia"], scentres=["jeux-defis"],
         titre="9 × 37 + 9 × 63 de tête — Factoriser — épisode 2 · Maths 4e",
         intro="Maya est développeuse. Son programme doit calculer 9 × 37 + 9 × 63 : deux multiplications. Maya repère le facteur commun et écrit 9 × (37 + 63) = 9 × 100 = 900. Une seule multiplication, et de tête !",
         puces=["factoriser 3x + 21 : le facteur commun 3 sort devant, 3(x + 7)", "factoriser, c'est transformer une somme en produit : le chemin inverse de développer",
                "avec un moins : 2x − 18 = 2(x − 9)", "le piège : 6x + 6 = 6(x + 1), sans oublier le 1",
                "une lettre en facteur : x² + 5x = x(x + 5)"],
         defi="factorise 7x − 56.",
         chap={"00-garde": "Une somme en produit", "01-developpeuse": "Maya, développeuse", "02-methode": "La méthode",
               "03-produit": "Factoriser, développer", "03q-question": "Question 1", "04-moins": "Avec un moins", "05-piege": "Le piège du 1",
               "06-lettre": "Une lettre en facteur", "06q-question": "Question 2", "07-defi": "À toi de jouer", "07b-correction": "Correction",
               "08-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Factorise 5x + 35.", ["5(x + 35)", "x(5 + 35)", "5(x + 7)"], 2, "35, c'est 5 × 7 : dans la parenthèse, on écrit 7, pas 35."),
             ("06q-question", "Factorise y² + 8y.", ["y(y + 8)", "y(y + 8y)", "8(y² + y)"], 0, "Le y sort devant : dans la parenthèse, il reste y et 8.")],
         tags=["factoriser", "factorisation", "facteur commun", "calcul littéral", "développeuse", "programmation"],
         st="17 × 6 + 17 × 4 de tête, sans poser : le raccourci ⚡ — 4e #Shorts",
         sq=("01q-question", "Factorise 3x + 15.", ["3(x + 15)", "x(3 + 15)", "3(x + 5)"], 2, "15, c'est 3 × 5."),
         sa="17 × 6 + 17 × 4, de tête, sans poser l'opération. Le raccourci : le 17 est dans les deux produits. On le sort devant : 17 × (6 + 4) = 17 × 10 = 170.\nC'est ça, factoriser.",
         stoi="calcule de tête 23 × 7 + 23 × 3. Réponds en commentaire !",
         stags=["calcul mental", "raccourci", "factoriser", "de tête"]),
    dict(num="03", slug="verifier", n=3, micro="litteral_factoriser_verifier", date="2026-12-22", ceinture="orange", sc="orange",
         centres=["jeux-video"], scentres=["jeux-defis"],
         titre="6(x + 30) = 6x + 30 ? — Vérifier une factorisation — épisode 3 · Maths 4e",
         intro="Tom est game designer. Dans son jeu, un niveau rapporte 6 points par étoile, plus 30 points de bonus : 6x + 30. Tom simplifie sa formule en 6(x + 30). Avant de publier son jeu, il vérifie.",
         puces=["pour vérifier une factorisation, on développe : 6(x + 30) donne 6x + 180, c'est faux", "la bonne formule : 30 = 6 × 5, donc 6(x + 5)",
                "l'erreur de signe : 4x − 12 n'est pas 4(x + 3)", "avec une lettre en facteur : x² + 9x n'est pas x(x + 9x)"],
         defi="5x + 45 = 5(x + 45) : juste ou faux ?",
         chap={"00-garde": "Être sûr de soi", "01-designer": "Tom, game designer", "02-developper": "On développe",
               "03-corriger": "La bonne formule", "03q-question": "Question 1", "04-signe": "L'erreur de signe", "05-lettre": "Avec une lettre",
               "05q-question": "Question 2", "06-defi": "À toi de jouer", "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "8x + 40 = 8(x + 5). Est-ce juste ?", ["oui", "non, c'est 8(x + 40)", "non, c'est 8x(1 + 5)"], 0, "8 × x = 8x, et 8 × 5 = 40 : on retrouve 8x + 40."),
             ("05q-question", "Léo factorise 9x − 27 en 9(x + 3). A-t-il raison ?", ["oui", "non", "on ne peut pas savoir"], 1, "9(x + 3) donne 9x + 27 : le moins a disparu, il fallait 9(x − 3).")],
         tags=["vérifier une factorisation", "développer pour vérifier", "factorisation", "calcul littéral", "game designer", "jeu vidéo"],
         st="4x + 20 = 4(x + 20) : ton copain a raison ? 🤔 — 4e #Shorts",
         sq=("01q-question", "Laquelle est juste pour 3x − 21 ?", ["3(x − 21)", "3(x + 7)", "3(x − 7)"], 2, "On développe : 3(x − 7) = 3x − 21."),
         sa="Ton copain écrit : 4x + 20 = 4(x + 20). Tu le crois ? Le secret pour en être sûr : on développe. 4 × x = 4x, 4 × 20 = 80 : on trouve 4x + 80, c'est faux !\nLa bonne réponse : 4(x + 5).",
         stoi="6x + 42 = 6(x + 7) : juste ou faux ? Réponds en commentaire !",
         stags=["vérifier", "développer", "erreur", "factorisation"]),
    dict(num="04", slug="maximum", n=4, micro="litteral_factorisation_defi", date="2026-12-23", ceinture="orange", sc="orange",
         centres=["nature-ecologie", "art-design"], scentres=["jeux-defis"],
         titre="2x² + 6x = 2x(x + 3) — Factoriser au maximum — épisode 4 · Maths 4e",
         intro="Camille est paysagiste. Elle dessine une terrasse rectangulaire en deux parties, d'aires 2x² et 6x. Quelle largeur ont-elles en commun ? Pour la trouver, on sort tout ce qui est commun.",
         puces=["chaque terme en produit : 2x² = 2 × x × x, 6x = 2 × 3 × x", "le nombre ET la lettre sortent : 2x² + 6x = 2x(x + 3)",
                "on vérifie en développant", "le piège : s'arrêter trop tôt, 12x + 18 = 2(6x + 9) n'est pas fini",
                "c'est fini quand les termes de la parenthèse n'ont plus rien en commun"],
         defi="factorise au maximum 3x² + 12x.",
         chap={"00-garde": "Tout sortir", "01-paysagiste": "Camille, paysagiste", "02-nombre-lettre": "Un nombre et une lettre",
               "03-sortir": "On sort 2x", "03q-question": "Question 1", "04-pas-fini": "Le piège : s'arrêter trop tôt", "05-fini": "Quand est-ce fini ?",
               "05q-question": "Question 2", "06-defi": "À toi de jouer", "06b-correction": "Correction", "07-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Factorise au maximum 5x² + 10x.", ["5(x² + 2x)", "5x(x + 2)", "x(5x + 10)"], 1, "A et C sont justes, mais pas finies : il reste un facteur commun dans la parenthèse."),
             ("05q-question", "Quel est le plus grand facteur commun de 8x + 20 ?", ["2", "8", "4"], 2, "8x = 4 × 2x et 20 = 4 × 5 : 2x et 5 n'ont plus rien en commun.")],
         tags=["factoriser au maximum", "plus grand facteur commun", "factorisation", "calcul littéral", "paysagiste", "aire d'un rectangle"],
         st="4x² + 8x : beaucoup s'arrêtent trop tôt. Et toi ? 🎯 — 4e #Shorts",
         sq=("01q-question", "Factorise au maximum 6x² + 9x.", ["3(2x² + 3x)", "x(6x + 9)", "3x(2x + 3)"], 2, "Le 3 et le x sortent tous les deux."),
         sa="Factorise 4x² + 8x. Beaucoup d'élèves s'arrêtent trop tôt. Le secret : on sort tout ce qui est commun. Le plus grand nombre : 4. La lettre : x. Donc 4x² + 8x = 4x(x + 2).",
         stoi="factorise au maximum 10x² + 15x. Réponds en commentaire !",
         stags=["factoriser au maximum", "tout sortir", "factorisation"]),
    dict(num="05", slug="defi", n=5, micro="litteral_factorisation_defi", date="2026-12-24", ceinture="verte", sc="orange",
         centres=["football", "argent-budget"], scentres=["jeux-defis"],
         titre="8x + 96 = 8(x + 12) — Défis de factorisation — épisode 5 · Maths 4e",
         intro="Malik est comptable dans un club de football. Le club achète 8 tenues : un maillot à x euros et un short à 12 euros. Le prix total : 8x + 96. Malik veut l'écrire comme un produit. Trois défis : un vrai problème, les erreurs, un facteur négatif.",
         puces=["un problème : 8x + 96 = 8(x + 12), 8 tenues fois le prix d'une tenue", "corriger les erreurs : 7x + 7 n'est pas 7x, c'est 7(x + 1)",
                "le défi des champions : un nombre négatif en facteur, −4x − 20 = −4(x + 5)"],
         defi="9 jardinières de x fraisiers et 5 plants de menthe : écris le total, puis factorise-le.",
         chap={"00-garde": "Trois défis", "01-comptable": "Malik, comptable d'un club de foot", "02-factoriser": "Le prix en produit",
               "02q-question": "Question 1", "03-erreurs": "Corrige les erreurs", "04-negatif": "Un facteur négatif",
               "04q-question": "Question 2", "05-defi": "À toi de jouer", "05b-correction": "Correction", "06-finale": "Ce que tu as appris"},
         qs=[("02q-question", "6 équipes de x filles et 4 garçons : 6x + 24 élèves. Sa forme factorisée ?", ["6(x + 24)", "6(x + 4)", "x(6 + 24)"], 1, "6 équipes, de x + 4 élèves."),
             ("04q-question", "Mets −3 en facteur dans −3x + 12.", ["−3(x − 4)", "−3(x + 4)", "3(x − 4)"], 0, "−3 × (−4) = +12.")],
         tags=["factorisation", "problème", "erreurs de factorisation", "facteur négatif", "calcul littéral", "comptable", "football"],
         st="x² + 6x = x(x + 6x) : tu vois l'erreur cachée ? 🕵️ — 4e #Shorts",
         sq=("01q-question", "Mets −2 en facteur dans −2x − 10.", ["−2(x − 5)", "−2(x + 5)", "2(x + 5)"], 1, "−2 × 5 = −10."),
         sa="Un élève écrit au tableau : x² + 6x = x(x + 6x). Il s'est trompé. On développe : x × x = x², x × 6x = 6x² : faux ! Le x est sorti, il ne reste que 6 : x(x + 6).",
         stoi="factorise 4x² + 4x. Réponds en commentaire !",
         stags=["erreur cachée", "factorisation", "développer pour vérifier"]),
]

COMMUNS = ["maths", "4e", "collège", "cycle 4", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EPS:
        slug, rep = e["slug"], f"{e['num']}-{e['slug']}"
        dos = f"4e/maths/factorisation/{rep}"
        nom = f"eleveai-maths-4e-facto-{slug}"
        ident = f"4e-facto-{slug}"
        micro = e["micro"]
        tp = temps[ident]
        t = tp["clips"]
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["puces"])
        acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture {e['ceinture']}.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
        acc += f"\n\nPour s'entraîner :\n• la fiche de cours : {COURS}\n• les exercices corrigés : {EXOS}\n• la série du coach sur cette compétence : {coach(micro)}"
        acc += f"\n\n🔢 Épisode {e['n']} sur 5 de la série Factorisation d'EleveAI, en 4e."
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
        sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach(micro)}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #factorisation #4e #collège"
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
        res = {}
        for e in EPS:
            for suf in ("", "-short"):
                nom = f"4e-facto-{e['slug']}{suf}"
                mp4 = SERIE / f"{e['num']}-{e['slug']}" / f"eleveai-maths-{nom}.mp4"
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-factorisation.json"
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
