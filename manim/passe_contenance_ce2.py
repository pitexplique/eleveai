# passe_contenance_ce2.py
# Passe finale de la série CONTENANCE CE2 (14/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME), copie de
# passe_perimetre_ce2.py : temps des chapitres et des questions relevés dans l'AUDIO des mp4
# (passe_relatifs.mesurer), questions lues dans les voix validées. Le manifeste a des modifications
# non commitées d'autres sessions : on relit la copie de travail et on ajoute ou remplace SEULEMENT nos entrées.
# Unités du CE2 : L, dL, cL. Pas de fiche CE2 : le coach.
#
#   python manim/passe_contenance_ce2.py temps [slug]  → manim/sorties/ce2/maths/contenance/temps.json
#   python manim/passe_contenance_ce2.py voir           → affiche les entrées sans rien écrire
#   python manim/passe_contenance_ce2.py manifeste      → ajoute ou remplace les entrées ce2-contenance-<slug>[-short]
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402
from passe_decimaux import question, chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "ce2" / "maths" / "contenance"
VOIX = RACINE / "manim" / "voix"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
NOTION = "contenance"
# CE2 02 relations et 03 comparer servent aussi au CM1 (convertir, comparer) : liens `aussi` du coach.
AUSSI_CM1 = {"relations": "contenance_convertir", "comparer": "contenance_comparer"}
COACH = "https://www.eleveai.fr/coach/serie?classe=ce2&matiere=maths&notion=contenance&microId={micro}&display=simple"
NOM_CEINT = {"blanche": "Ceinture blanche", "jaune": "Ceinture jaune", "orange": "Ceinture orange", "bleue": "Ceinture bleue"}

# Dates : 15, 17, 19, 21, 23/01/2027 (manifeste relu le 14/11 : une seule vidéo ces jours-là).
EP = [
 dict(n=1, slug="unites", micro="ce2_contenance_unites", nom="Les unités de contenance", date="2027-01-15", ceinture="blanche",
      titre="Avec quoi mesurer un liquide ?",
      intro="Lucas est chef cuisinier. Pour sa soupe, il verse de l'eau, du lait et de la crème. Pour ne pas se tromper, il mesure. Mais avec quelle unité ?",
      points=["la contenance : ce qu'un récipient contient quand il est plein",
              "une longueur en mètres, une contenance en litres (L)",
              "pour les petites quantités : le décilitre (dL) et le centilitre (cL)",
              "le piège : on ne mesure pas un liquide avec une règle"],
      defi="une marmite, un verre, une cuillère : quelle unité pour chacun ?",
      chap={"00-garde": "Avec quoi mesurer ?", "02-contenance": "La contenance", "03-litre": "Le litre",
            "04-dl-cl": "Décilitre et centilitre", "05-question": "Question 1", "06-ranger": "Du plus grand au plus petit",
            "07-piege": "Le piège", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["contenance", "litre", "décilitre", "centilitre", "unités de contenance", "cuisinier", "cuisine"],
      centres=["cuisine"],
      s_titre="20 cm de limonade, tu paries ?",
      s_accroche="J'ai fait de la limonade. Combien j'en ai ? Je sors ma règle : 20 centimètres de limonade ! Hé… une règle mesure des longueurs, pas des liquides.",
      s_toi="la plus petite unité, c'est le litre, le décilitre ou le centilitre ?",
      s_tags=["contenance", "litre", "limonade", "règle"], s_centres=["cuisine", "jeux-defis"]),
 dict(n=2, slug="relations", micro="ce2_contenance_relations", nom="Litre, décilitre, centilitre", date="2027-01-17", ceinture="jaune",
      titre="Combien de verres pour 1 litre ?",
      intro="Amina est chimiste. Dans son laboratoire, elle doit remplir un grand flacon de 1 litre avec un petit pot de 1 décilitre. Combien de fois doit-elle verser ?",
      points=["10 pots de 1 dL remplissent 1 L : 1 L = 10 dL",
              "100 pots de 1 cL : 1 L = 100 cL",
              "1 dL = 10 cL",
              "le piège : 1 L, ce n'est pas 10 cL",
              "plusieurs litres : 2 L = 20 dL = 200 cL"],
      defi="Amina verse 1 L, puis encore 5 dL : combien de décilitres en tout ?",
      chap={"00-garde": "Combien de petits verres ?", "02-dl": "10 décilitres", "03-cl": "100 centilitres",
            "04-dl-cl": "1 dL = 10 cL", "05-question": "Question 1", "06-piege": "Le piège",
            "07-plusieurs": "Plusieurs litres", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["contenance", "litre", "décilitre", "centilitre", "conversion", "chimiste", "laboratoire"],
      centres=["sciences"],
      s_titre="Un seul verre pour remplir 1 litre, tu paries ?",
      s_accroche="Je remplis ma bouteille de 1 litre avec mon petit verre de 1 décilitre. Un seul verre suffit, non ? Raté… je verse, et je compte !",
      s_toi="combien de cuillères de 1 centilitre pour remplir 1 litre ?",
      s_tags=["contenance", "décilitre", "verre", "bouteille"], s_centres=["sciences", "jeux-defis"]),
 dict(n=3, slug="comparer", micro="ce2_contenance_comparer", nom="Comparer des contenances", date="2027-01-19", ceinture="orange",
      titre="5 dL ou 75 cL : qui a le plus d'eau ?",
      intro="Théo est entraîneur de football. Avant le match, ses joueurs remplissent leurs gourdes. Kevin a une gourde de 5 décilitres, Maya une bouteille de 75 centilitres. Qui emporte le plus d'eau ?",
      points=["même unité : on compare les nombres (60 cL > 40 cL)",
              "deux unités : d'abord la même unité, 5 dL = 50 cL",
              "le piège : 75 est plus grand que 1, mais 1 L = 100 cL",
              "la forme ne dit pas la contenance : bouteille fine ou saladier, même quantité"],
      defi="ranger 1 L, 8 dL et 90 cL de la plus petite à la plus grande.",
      chap={"00-garde": "Qui emporte le plus ?", "02-meme-unite": "La même unité", "03-convertir": "Deux unités",
            "04-question": "Question 1", "05-forme": "Le piège de la forme", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["contenance", "comparer des contenances", "décilitre", "centilitre", "entraîneur", "football", "gourde"],
      centres=["sport"],
      s_titre="Le jus a baissé, il en a perdu ? Tu paries ?", s_ceinture="jaune",
      s_accroche="Mon copain verse son jus de sa bouteille haute dans un saladier. Regarde : le jus a baissé ! Il en a perdu ? Il n'a rien bu, rien renversé…",
      s_toi="qui contient le plus, 5 décilitres ou 40 centilitres ?",
      s_tags=["contenance", "comparer", "saladier", "forme"], s_centres=["cuisine", "jeux-defis"]),
 dict(n=4, slug="probleme", micro="ce2_contenance_probleme", nom="Un problème de contenances", date="2027-01-21", ceinture="orange",
      titre="Combien reste-t-il dans l'arrosoir ?",
      intro="Mélissa est horticultrice : elle fait pousser des fleurs dans une serre. Son arrosoir contient 5 litres. Elle arrose deux plants, avec 80 centilitres chacun. Combien de centilitres reste-t-il ?",
      points=["d'abord la même unité : 5 L = 500 cL",
              "ajouter ce qu'on verse : 80 + 80 = 160 cL",
              "enlever : 500 − 160 = 340 cL",
              "le piège : 2 L + 50 cL, ce n'est pas 52",
              "répéter : 4 L avec un pichet de 50 cL, 8 pichets"],
      defi="remplir un bac de 4 L avec un pichet de 50 cL : combien de pichets ?",
      chap={"00-garde": "Combien reste-t-il ?", "02-convertir": "La même unité", "03-verse": "Ce qu'elle verse",
            "04-reste": "Ce qui reste", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["contenance", "problème", "centilitre", "litre", "horticultrice", "serre", "arrosoir"],
      centres=["nature-ecologie"],
      s_titre="2 litres moins 50 centilitres, tu paries ?", s_ceinture="jaune",
      s_accroche="Mon arrosoir contient 2 litres. J'arrose mes 3 plantes, 50 centilitres chacune. Il reste… 2 moins 50 ? Impossible ! La même unité d'abord…",
      s_toi="un seau de 3 litres. Tu verses 4 verres de 25 centilitres. Combien de centilitres reste-t-il ?",
      s_tags=["contenance", "problème", "arrosoir", "plantes"], s_centres=["nature-ecologie", "jeux-defis"]),
 dict(n=5, slug="defi", micro="ce2_contenance_defi", nom="Un défi de contenances", date="2027-01-23", ceinture="bleue",
      titre="Assez d'huile pour le moteur ?",
      intro="Yanis est mécanicien. Le moteur d'une voiture a besoin de 4 litres d'huile. Yanis a un bidon de 2 litres et 3 bouteilles de 50 centilitres. Est-ce assez ?",
      points=["répéter : 3 × 50 = 150 cL",
              "convertir et ajouter : 2 L = 200 cL, 200 + 150 = 350 cL",
              "comparer : 350 cL, c'est moins que 400 cL ; il manque 50 cL",
              "le piège : 150 cL, ce n'est pas 15 L ; c'est 1 L et 50 cL"],
      defi="un bidon de 5 L : 2 L pour une voiture, 150 cL pour une moto. Combien en reste-t-il ?",
      chap={"00-garde": "Assez d'huile ?", "02-bouteilles": "Les bouteilles", "03-bidon": "Le bidon, et le total",
            "04-comparer": "Assez ?", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["contenance", "défi", "problème", "centilitre", "litre", "mécanicien", "garage", "voiture"],
      centres=["transports"],
      s_titre="50 cL, 5 dL ou un demi-litre : qui a raison ?", s_ceinture="orange",
      s_accroche="Mes trois amis se disputent pour la même bouteille. Léa dit 50 centilitres, Kevin 5 décilitres, Maya un demi-litre. Il y en a forcément deux qui se trompent ?",
      s_toi="1 litre et 5 décilitres, ça fait combien de centilitres ?",
      s_tags=["contenance", "défi", "demi-litre", "qui a raison"], s_centres=["jeux-defis"]),
]

COMMUNS = ["contenance", "litre", "maths", "CE2", "primaire", "cycle 2", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EP:
        n, slug = e["n"], e["slug"]
        ident = f"ce2-contenance-{slug}"
        if ident not in temps:
            continue
        dos = f"ce2/maths/contenance/{n:02d}-{slug}"
        nom = f"eleveai-maths-{ident}"
        coach = COACH.format(micro=e["micro"])
        voix = json.loads((VOIX / f"{ident}.json").read_text(encoding="utf-8"))
        t = temps[ident]
        titre = f"{e['titre']} — {e['nom']} — épisode {n} · Maths CE2"
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += (f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 {NOM_CEINT[e['ceinture']]}.\n"
                f"Un défi en fin de vidéo, avec sa correction : {e['defi']}")
        acc += f"\n\nPour s'entraîner :\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n🔢 Épisode {n} de la série Contenance d'EleveAI, en CE2."
        qs = [dict(t=mmss(t["clips"][c]), **question(voix, c)) for c in voix if c.endswith("-question")]
        out.append({
            "id": ident, "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": e["micro"], "classe": "ce2",
            "ceinture": e["ceinture"], "serie": "Maths CE2", "type": "longue", "fichier": f"{dos}/{nom}.mp4",
            "miniature": f"{dos}/{nom}.png", "titre": titre, "accroche": acc,
            "chapitres": chapitres(e["chap"], t["clips"], t["duree"]),
            "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
        if e["slug"] in AUSSI_CM1:  # la même vidéo sert aussi une micro CM1 (révision)
            out[-1]["aussi"] = [{"classe": "cm1", "notionId": "contenance", "microId": AUSSI_CM1[e["slug"]]}]
        if f"{ident}-short" not in temps:
            continue
        sv = json.loads((VOIX / f"{ident}-short.json").read_text(encoding="utf-8"))
        ts = temps[f"{ident}-short"]
        stitre = f"{e['s_titre']} #maths #ce2"
        sc = e.get("s_ceinture", "blanche")
        sacc = e["s_accroche"] + (f"\n\nDessin animé, voix de synthèse.\n🥋 {NOM_CEINT[sc]}"
                                  + (" : pour découvrir." if sc == "blanche" else ".")
                                  + f"\n👉 À toi : {e['s_toi']} Réponds en commentaire !")
        sacc += (f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach}\n\n"
                 "Fait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #contenance #ce2 #primaire")
        out.append({
            "id": f"{ident}-short", "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": e["micro"],
            "classe": "ce2", "ceinture": sc, "serie": "Maths CE2", "type": "short", "renvoie_vers": ident,
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short-miniature.png",
            "titre": stitre, "accroche": sacc,
            "tags": e["s_tags"] + ["Ti Margo", "dessin animé", NOM_CEINT[sc].lower()] + COMMUNS + ["Shorts"],
            "questions": [dict(t=mmss(ts["clips"][c]), **question(sv, c)) for c in sv if c.endswith("-question")],
            "centres": e["s_centres"],
        })
        if e["slug"] in AUSSI_CM1:
            out[-1]["aussi"] = [{"classe": "cm1", "notionId": "contenance", "microId": AUSSI_CM1[e["slug"]]}]
        for x in (titre, stitre):
            if len(x) > 100:
                print(f"TITRE TROP LONG ({len(x)}) : {x}", file=sys.stderr)
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        filtre = sys.argv[2] if len(sys.argv) > 2 else ""
        res = json.loads(TEMPS.read_text(encoding="utf-8")) if TEMPS.exists() else {}
        for e in EP:
            if filtre and filtre != e["slug"]:
                continue
            for suf in ("", "-short"):
                nom = f"ce2-contenance-{e['slug']}{suf}"
                mp4 = SERIE / f"{e['n']:02d}-{e['slug']}" / f"eleveai-maths-{nom}.mp4"
                if not mp4.exists():
                    print("pas encore :", nom)
                    continue
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-contenance-ce2.json"
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
