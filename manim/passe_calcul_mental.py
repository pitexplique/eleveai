# passe_calcul_mental.py
# Passe finale de la série CALCUL MENTAL 6e (12/11/2026) : les 12 entrées du manifeste.
# Calquée sur passe_decimaux.py : temps des chapitres et des questions relevés dans l'AUDIO des mp4
# (passe_relatifs.mesurer), questions lues dans les voix validées. Le manifeste a des modifications
# non commitées d'autres sessions : on relit la copie de travail et on ajoute seulement.
#
#   python manim/passe_calcul_mental.py temps     → manim/sorties/6e/maths/calcul-mental/temps.json
#   python manim/passe_calcul_mental.py voir      → affiche les entrées sans rien écrire
#   python manim/passe_calcul_mental.py manifeste → ajoute ou remplace les 12 entrées 6e-mental-<slug>[-short]
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402
from passe_decimaux import question, chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "6e" / "maths" / "calcul-mental"
VOIX = RACINE / "manim" / "voix"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
NOTION = "entier_calcul_mental"
FICHE = "https://www.eleveai.fr/fiches-cours/maths/6e/entier-calcul-mental"
EXOS = "https://www.eleveai.fr/fiches-exercices/maths/6e/entier-calcul-mental"
COACH = "https://www.eleveai.fr/coach/serie?classe=6e&matiere=maths&notion=entier_calcul_mental&microId={micro}&display=simple"

EP = [
 dict(n=1, slug="addition", micro="entier_addition_mentale", nom="Ajouter de tête", date="2026-12-14",
      titre="56 + 8 sans poser l'opération ?",
      intro="Enzo est arbitre de basket. Pendant le match, il compte les points de tête : les Bleus ont 56 points et marquent encore 8 points. Combien en tout ?",
      points=["passer par la dizaine : 56 + 4, puis + 4", "ajouter un nombre rond", "ajouter les dizaines, puis les unités",
              "le piège : bien passer la dizaine"],
      defi="les Bleus ont 78 points et en marquent 15, les Rouges ont 92 points : qui gagne ?",
      chap={"00-garde": "56 + 8 sans poser", "02-dizaine": "Passer par la dizaine", "03-rond": "Ajouter un nombre rond",
            "04-question": "Question 1", "05-decomposer": "Dizaines, puis unités", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
      tags=["calcul mental", "addition de tête", "passer la dizaine", "arbitre", "basket"], centres=["sport"],
      s_titre="38 + 5 = 313 billes, tu paries ?",
      s_accroche="J'ai 38 billes, j'en gagne 5. 8 + 5 = 13... je colle le 3 et le 13 : 313 billes ! Ça ne colle pas.",
      s_toi="combien font 67 + 6 ?", s_tags=["addition", "billes", "passer la dizaine"], s_centres=["jeux-defis"]),
 dict(n=2, slug="soustraction", micro="entier_soustraction_mentale", nom="Soustraire de tête", date="2026-12-15",
      titre="121 − 38 de tête : comment rendre la monnaie ?",
      intro="Chloé tient un magasin de vélos. Toute la journée, elle rend la monnaie de tête.",
      points=["compléter jusqu'au nombre rond : de 36 à 40, puis à 100", "enlever les dizaines, puis les unités",
              "arrondir, puis corriger dans le bon sens", "le piège : corriger à l'envers"],
      defi="un vélo à 162 € avec une remise de 19 € : quel est le nouveau prix ?",
      chap={"00-garde": "121 − 38 de tête", "02-complement": "Compléter jusqu'à 100", "03-question": "Question 1",
            "04-dizaines": "Dizaines, puis unités", "05-arrondir": "Arrondir, puis corriger", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
      tags=["calcul mental", "soustraction de tête", "rendre la monnaie", "commerçante", "vélo"], centres=["argent-budget"],
      s_titre="100 € − 36 € : on me rend 74 €, tu paries ?",
      s_accroche="J'achète un skate à 36 euros avec un billet de 100 euros. Le vendeur va me rendre 74 euros ! Il compte : de 36 à 40, puis de 40 à 100...",
      s_toi="un livre coûte 58 €, tu paies avec 100 € : combien on te rend ?", s_tags=["soustraction", "monnaie", "skate"], s_centres=["argent-budget"]),
 dict(n=3, slug="multiplication", micro="entier_multiplication_mentale", nom="Multiplier de tête", date="2026-12-16",
      titre="18 × 5 en 3 secondes ?",
      intro="Hugo est DJ. Pour une fête, il prépare 18 morceaux de 5 minutes. Combien de minutes de musique ?",
      points=["× 5, c'est × 10, puis la moitié", "× 11 : 10 fois, plus encore une fois", "le piège : oublier la moitié",
              "vérifier avec un nombre rond"],
      defi="la fête dure 120 minutes, Hugo a 22 morceaux de 5 minutes : a-t-il assez de musique ?",
      chap={"00-garde": "18 × 5 en 3 secondes", "02-fois5": "× 5 = × 10, puis la moitié", "03-question": "Question 1",
            "04-fois11": "× 11", "05-piege": "Le piège", "06-question": "Question 2", "07-defi": "À toi de jouer",
            "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["calcul mental", "multiplication de tête", "fois 5", "fois 11", "DJ", "musique"], centres=["musique"],
      s_titre="16 paquets de 5 bonbons = 160, tu paries ?",
      s_accroche="J'ai 16 paquets de 5 bonbons. 16 × 10 = 160, donc 160 bonbons ! Mais un paquet n'a que 5 bonbons : la moitié de 10.",
      s_toi="combien font 28 × 5 ?", s_tags=["multiplication", "bonbons", "fois 5"], s_centres=["jeux-defis"]),
 dict(n=4, slug="division", micro="entier_division_mentale", nom="Diviser de tête", date="2026-12-17",
      titre="56 ÷ 8 sans poser la division ?",
      intro="Maëlys est soigneuse au zoo. Ce matin, elle a 56 poissons pour 8 manchots. Combien de poissons pour chaque manchot ?",
      points=["lire la table à l'envers : 7 × 8 = 56", "couper en morceaux de la table : 96 = 80 + 16",
              "vérifier par une multiplication", "÷ 10 : chaque chiffre descend d'une colonne"],
      defi="72 carottes pour 6 girafes, 3 mangées le matin : combien en reste-t-il à chacune pour le soir ?",
      chap={"00-garde": "56 ÷ 8 sans poser", "02-table": "La table à l'envers", "03-question": "Question 1",
            "04-decomposer": "Couper en morceaux", "05-verifier": "Vérifier", "06-question": "Question 2",
            "07-dix": "Diviser par 10", "08-piege": "Le piège", "09-defi": "À toi de jouer", "09b-correction": "Correction",
            "10-finale": "Ce que tu as appris"},
      tags=["calcul mental", "division de tête", "tables", "partage", "soigneuse", "zoo"], centres=["animaux"],
      s_titre="36 biscuits pour 4 : 32 chacun, tu paries ?",
      s_accroche="Je partage 36 biscuits entre 4 copains. Divisé par 4... j'enlève 4 : 32 biscuits chacun !",
      s_toi="42 cerises pour 6 copains : combien chacun ?", s_tags=["division", "partage", "biscuits"], s_centres=["cuisine"]),
 dict(n=5, slug="astuces", micro="entier_strategie_mentale", nom="Les astuces du calcul mental", date="2026-12-18",
      titre="99 + 47 en 2 secondes ?",
      intro="Jade est cheffe cuisinière. Avant de calculer, elle regarde les nombres : un nombre rond est-il tout près ?",
      points=["le double : ajouter le nombre à lui-même", "le quart : la moitié de la moitié",
              "regrouper pour faire 100", "arrondir, puis corriger : 99 + 47 = 100 + 47 − 1"],
      defi="trois paniers à 48 €, 99 € et 52 € : combien paie-t-elle ?",
      chap={"00-garde": "99 + 47 en 2 secondes", "02-double": "Le double", "03-quart": "Le quart", "04-question": "Question 1",
            "05-regrouper": "Regrouper pour faire 100", "06-arrondir": "Arrondir, puis corriger", "07-piege": "Le piège",
            "08-question": "Question 2", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["calcul mental", "astuces", "double", "quart", "cuisinière", "cuisine"], centres=["cuisine"],
      s_titre="Le double de 125 g = 1 250 g, tu paries ?",
      s_accroche="Ma recette demande 125 grammes de beurre. Je la double : 1 250 grammes ! Le double, c'est 125 + 125...",
      s_toi="quel est le double de 375 ?", s_tags=["double", "recette", "beurre"], s_centres=["cuisine"]),
 dict(n=6, slug="defi", micro="entier_calcul_mental_defi", nom="Le grand défi du calcul mental", date="2026-12-19",
      titre="Sauras-tu tout calculer de tête ?",
      intro="Nathan est développeur de jeux vidéo. Dans son jeu, le héros gagne des pièces et achète des objets : Nathan vérifie chaque calcul de tête.",
      points=["lire le problème et choisir l'opération", "couper le calcul en étapes faciles",
              "regrouper les nombres", "vérifier avec un ordre de grandeur"],
      defi="le héros a 100 pièces, il achète 4 flèches à 5 pièces et une armure à 38 pièces : combien lui reste-t-il ?",
      chap={"00-garde": "Le grand défi", "02-somme": "Une somme", "03-groupes": "Des groupes", "04-question": "Question 1",
            "05-ordre": "L'ordre de grandeur", "06-horaire": "Un horaire", "07-question": "Question 2",
            "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
      tags=["calcul mental", "problèmes", "ordre de grandeur", "développeur", "jeux vidéo"], centres=["jeux-video"],
      s_titre="49 € + 52 € = 911 €, tu paries ?",
      s_accroche="J'achète un jeu à 49 euros et une manette à 52 euros. 49 + 52... 911 euros ! Le vendeur éclate de rire.",
      s_toi="combien font 98 + 103 ?", s_tags=["ordre de grandeur", "jeu vidéo", "manette"], s_centres=["jeux-video"]),
]

COMMUNS = ["calcul mental", "maths", "6e", "collège", "cycle 3", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EP:
        n, slug = e["n"], e["slug"]
        dos = f"6e/maths/calcul-mental/{n:02d}-{slug}"
        nom = f"eleveai-maths-6e-mental-{slug}"
        ident = f"6e-mental-{slug}"
        coach = COACH.format(micro=e["micro"])
        voix = json.loads((VOIX / f"{ident}.json").read_text(encoding="utf-8"))
        t = temps[ident]
        titre = f"{e['titre']} — {e['nom']} — épisode {n} · Maths 6e"
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture verte.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
        acc += f"\n\nPour s'entraîner :\n• la fiche de cours : {FICHE}\n• les exercices corrigés : {EXOS}\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n🔢 Épisode {n} sur 6 de la série Calcul mental d'EleveAI, en 6e."
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
                nom = f"6e-mental-{e['slug']}{suf}"
                mp4 = SERIE / f"{e['n']:02d}-{e['slug']}" / f"eleveai-maths-{nom}.mp4"
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-calcul-mental.json"
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
