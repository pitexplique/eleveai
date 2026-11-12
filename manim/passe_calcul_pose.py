# passe_calcul_pose.py
# Passe finale de la série CALCUL POSÉ 6e (12/11/2026) : les 10 entrées du manifeste.
# Calquée sur passe_decimaux.py : temps des chapitres et des questions relevés dans l'AUDIO des mp4
# (passe_relatifs.mesurer), questions lues dans les voix validées. Le manifeste a des modifications
# non commitées d'autres sessions : on relit la copie de travail et on ajoute seulement.
#
#   python manim/passe_calcul_pose.py temps     → manim/sorties/6e/maths/calcul-pose/temps.json
#   python manim/passe_calcul_pose.py voir      → affiche les entrées sans rien écrire
#   python manim/passe_calcul_pose.py manifeste → ajoute ou remplace les 10 entrées 6e-calcul-pose-<slug>[-short]
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402
from passe_decimaux import question, chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "6e" / "maths" / "calcul-pose"
VOIX = RACINE / "manim" / "voix"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
NOTION = "entier_calcul_pose"
FICHE = "https://www.eleveai.fr/fiches-cours/maths/6e/entier-calcul-pose"
EXOS = "https://www.eleveai.fr/fiches-exercices/maths/6e/entier-calcul-pose"
COACH = "https://www.eleveai.fr/coach/serie?classe=6e&matiere=maths&notion=entier_calcul_pose&microId={micro}&display=simple"

EP = [
 dict(n=1, slug="addition", micro="entier_addition_posee", nom="L'addition posée", date="2026-12-17",
      titre="475 € + 286 € : pourquoi une retenue ?",
      intro="Nadia est comptable. Ce mois-ci, elle a payé 475 euros d'électricité et 286 euros d'internet. Combien en tout ?",
      points=["aligner les chiffres à droite : unités sous unités", "commencer par les unités",
              "la retenue : 5 + 6 = 11, j'écris 1 et je retiens 1", "le piège : commencer par la gauche"],
      defi="trois factures de 348 €, 275 € et 96 € : combien en tout ?",
      chap={"00-garde": "Pourquoi une retenue ?", "02-aligner": "Aligner les chiffres", "03-pose": "Poser l'addition",
            "04-retenue": "La retenue", "05-question": "Question 1", "06-piege": "Le piège", "07-question": "Question 2",
            "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
      tags=["addition posée", "retenue", "calcul posé", "comptable", "factures"], centres=["argent-budget"],
      s_titre="47 billes + 38 : j'en ai 75, tu paries ?",
      s_accroche="J'ai 47 billes, mon copain m'en donne 38. 7 + 8 = 15, j'écris 5... et j'oublie la retenue. 75 billes ? Ça ne colle pas !",
      s_toi="combien font 56 + 27 ?", s_tags=["addition", "retenue oubliée", "billes"], s_centres=["jeux-defis"]),
 dict(n=2, slug="soustraction", micro="entier_soustraction_posee", nom="La soustraction posée", date="2026-12-18",
      titre="632 m − 458 m : comment faire 2 − 8 ?",
      intro="Hugo est guide de montagne. Son groupe doit monter 632 mètres jusqu'au sommet. Il en a déjà monté 458. Combien reste-t-il ?",
      points=["le grand nombre en haut, aligné à droite", "2 − 8, impossible : je casse une dizaine",
              "on vérifie avec une addition", "le piège du zéro : 503 − 128"],
      defi="1 000 m de montée : 375 m le matin, 268 m l'après-midi. Combien reste-t-il ?",
      chap={"00-garde": "Comment faire 2 − 8 ?", "02-sens": "C'est une soustraction", "03-pose": "Je casse une dizaine",
            "04-verifier": "On vérifie", "05-question": "Question 1", "06-piege": "Le piège du zéro",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["soustraction posée", "casser une dizaine", "emprunt", "calcul posé", "guide de montagne", "randonnée"],
      centres=["sport", "nature-ecologie"],
      s_titre="52 coquillages − 17 : il m'en reste 45, tu paries ?",
      s_accroche="J'avais 52 coquillages, j'en donne 17. Pour les unités, 7 − 2... Je retire le petit du grand ! 45 coquillages ? Je vérifie...",
      s_toi="combien font 73 − 48 ?", s_tags=["soustraction", "coquillages", "vérifier"], s_centres=["nature-ecologie"]),
 dict(n=3, slug="multiplication", micro="entier_multiplication_posee", nom="La multiplication posée", date="2026-12-19",
      titre="36 × 24 : pourquoi écrire un zéro ?",
      intro="Théo est agriculteur. Il plante 267 salades par rangée, sur 4 rangées. Puis 24 rangées de 36 plants de tomates. Combien de plants ?",
      points=["multiplier chiffre par chiffre, en commençant par les unités", "la retenue s'ajoute après le produit",
              "deux lignes : pour les dizaines, on écrit d'abord un zéro", "le piège : sans le zéro, 216 au lieu de 864"],
      defi="45 rangées de 28 pots de fleurs : combien de pots ?",
      chap={"00-garde": "Pourquoi écrire un zéro ?", "02-pose": "Poser 267 × 4", "03-question": "Question 1",
            "04-champ": "Deux chiffres en bas", "05-lignes": "Les deux lignes", "07-piege": "Le piège du zéro",
            "08-question": "Question 2", "09-defi": "À toi de jouer", "09b-correction": "Correction",
            "10-finale": "Ce que tu as appris"},
      tags=["multiplication posée", "retenue", "zéro", "calcul posé", "agriculteur", "plantations"],
      centres=["nature-ecologie", "cuisine"],
      s_titre="23 boîtes de 12 œufs : j'en ai 69, tu paries ?",
      s_accroche="23 boîtes de 12 œufs. 23 × 2 = 46, 23 × 1 = 23, et 46 + 23 = 69. Mais 20 boîtes de 10 œufs, c'est déjà 200 œufs...",
      s_toi="combien font 21 × 13 ?", s_tags=["multiplication", "zéro oublié", "œufs"], s_centres=["cuisine"]),
 dict(n=4, slug="division", micro="entier_division_posee", nom="La division posée", date="2026-12-20",
      titre="157 colis, camionnettes de 6 : que veut dire le reste ?",
      intro="Maëlle est logisticienne. Elle a 58 colis et une camionnette en transporte 7. Combien de camionnettes pleines ? Et que veut dire le reste ?",
      points=["combien de fois 7 rentre dans 58 : les tables", "58 = 7 × 8 + 2 : le quotient et le reste",
              "la potence : 157 ÷ 6, on abaisse le chiffre suivant", "le reste a un sens : une camionnette de plus",
              "on vérifie : 6 × 26 + 1 = 157"],
      defi="245 bouteilles d'eau dans des cartons de 8 : combien de cartons pleins, et combien de bouteilles restent ?",
      chap={"00-garde": "Que veut dire le reste ?", "02-tables": "Avec les tables", "03-reste": "Le quotient et le reste",
            "04-question": "Question 1", "05-potence": "La potence", "06-etapes": "J'abaisse le chiffre suivant",
            "07-sens": "Le sens du reste", "08-verif": "On vérifie", "09-question": "Question 2",
            "10-defi": "À toi de jouer", "10b-correction": "Correction", "11-finale": "Ce que tu as appris"},
      tags=["division posée", "potence", "quotient", "reste", "division euclidienne", "logisticienne", "livraisons"],
      centres=["transports", "jeux-defis"],
      s_titre="50 cartes à 6 joueurs : il m'en reste 8, tu paries ?",
      s_accroche="Je distribue 50 cartes à 6 joueurs : 6 × 7 = 42, chacun en a 7, il m'en reste 8. Mais avec 8 cartes, je peux encore en donner à tout le monde...",
      s_toi="45 billes pour 7 copains. Combien pour chacun, et combien en reste-t-il ?",
      s_tags=["division", "reste", "cartes"], s_centres=["jeux-defis"]),
 dict(n=5, slug="verifier", micro="entier_calcul_verifier", nom="Vérifier un calcul posé", date="2026-12-21",
      titre="386 + 247 = 533 ? Comment savoir si c'est juste",
      intro="Zoé est réalisatrice de dessins animés : chaque seconde contient 24 images. Elle fait beaucoup de calculs, et elle les vérifie toujours.",
      points=["l'ordre de grandeur : 390 + 250 = 640, donc 533 est trop loin", "l'opération inverse : 354 + 358 = 712, pas 702",
              "une division se vérifie par une multiplication : 34 × 4 = 136", "les deux méthodes ensemble"],
      defi="un dessin animé de 3 minutes, 24 images par seconde : combien d'images à dessiner ?",
      chap={"00-garde": "Comment savoir si c'est juste ?", "02-ordre": "L'ordre de grandeur", "03-question": "Question 1",
            "04-inverse": "L'opération inverse", "05-division": "Vérifier une division", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["vérifier un calcul", "ordre de grandeur", "opération inverse", "calcul posé", "réalisatrice", "dessin animé"],
      centres=["cinema-series", "jeux-defis"],
      s_titre="615 − 278 = 347 : je suis sûr de moi, tu paries ?",
      s_accroche="J'ai posé 615 − 278 et trouvé 347. Je suis sûr de moi ! Je vérifie avec une addition : 347 + 278 = 625...",
      s_toi="un ami trouve 403 − 156 = 357. Quel est le bon résultat ?",
      s_tags=["vérifier", "soustraction", "addition"], s_centres=["jeux-defis"]),
]

COMMUNS = ["calcul posé", "maths", "6e", "collège", "cycle 3", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EP:
        n, slug = e["n"], e["slug"]
        dos = f"6e/maths/calcul-pose/{n:02d}-{slug}"
        nom = f"eleveai-maths-6e-calcul-pose-{slug}"
        ident = f"6e-calcul-pose-{slug}"
        coach = COACH.format(micro=e["micro"])
        voix = json.loads((VOIX / f"{ident}.json").read_text(encoding="utf-8"))
        t = temps[ident]
        titre = f"{e['titre']} — {e['nom']} — épisode {n} · Maths 6e"
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture verte.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
        acc += f"\n\nPour s'entraîner :\n• la fiche de cours : {FICHE}\n• les exercices corrigés : {EXOS}\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n🔢 Épisode {n} sur 5 de la série Calcul posé d'EleveAI, en 6e."
        qs = [dict(t=mmss(t["clips"][c]), **question(voix, c)) for c in voix if c.endswith("-question")]
        out.append({
            "id": ident, "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": e["micro"], "classe": "6e",
            "ceinture": "verte", "serie": "Maths 6e", "type": "longue", "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png",
            "titre": titre, "accroche": acc, "chapitres": chapitres(e["chap"], t["clips"], t["duree"]),
            "fiche": FICHE, "fiche_exercices": EXOS, "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
        sv = json.loads((VOIX / f"{ident}-short.json").read_text(encoding="utf-8"))
        ts = temps[f"{ident}-short"]
        stitre = f"{e['s_titre']} #maths #6e"
        sacc = e["s_accroche"] + f"\n\nDessin animé, voix de synthèse.\n🥋 Ceinture jaune : une règle ou un calcul.\n👉 À toi : {e['s_toi']} Réponds en commentaire !"
        sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #calcul #6e #collège"
        out.append({
            "id": f"{ident}-short", "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": e["micro"],
            "classe": "6e", "ceinture": "jaune", "serie": "Maths 6e", "type": "short", "renvoie_vers": ident,
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short-miniature.png",
            "titre": stitre, "accroche": sacc,
            "tags": e["s_tags"] + ["Ti Margo", "dessin animé", "ceinture jaune"] + COMMUNS + ["Shorts"],
            "questions": [dict(t=mmss(ts["clips"][c]), **question(sv, c)) for c in sv if c.endswith("-question")],
            "centres": e["s_centres"],
        })
        for x in (titre, stitre):
            if len(x) > 100:
                print(f"TITRE TROP LONG ({len(x)}) : {x}", file=sys.stderr)
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        res = {}
        for e in EP:
            for suf in ("", "-short"):
                nom = f"6e-calcul-pose-{e['slug']}{suf}"
                mp4 = SERIE / f"{e['n']:02d}-{e['slug']}" / f"eleveai-maths-{nom}.mp4"
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-calcul-pose.json"
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
