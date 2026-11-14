# passe_longueur_ce2.py
# Passe finale de la série LONGUEURS CE2 (14/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME), copie de
# passe_contenance_ce2.py : temps des chapitres et des questions relevés dans l'AUDIO des mp4
# (passe_relatifs.mesurer), questions lues dans les voix validées. Le manifeste a des modifications
# non commitées d'autres sessions : on relit la copie de travail et on ajoute ou remplace SEULEMENT nos entrées.
# Unités du CE2 : km, m, dm, cm, mm ; pas de virgule. Pas de fiche CE2 : le coach.
#
#   python manim/passe_longueur_ce2.py temps [slug]  → manim/sorties/ce2/maths/longueur/temps.json
#   python manim/passe_longueur_ce2.py voir           → affiche les entrées sans rien écrire
#   python manim/passe_longueur_ce2.py manifeste      → ajoute ou remplace les entrées ce2-longueur-<slug>[-short]
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402
from passe_decimaux import question, chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "ce2" / "maths" / "longueur"
VOIX = RACINE / "manim" / "voix"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
NOTION = "longueur"
# Des vidéos CE2 servent aussi au CM1 en révision (convertir, comparer, mesurer, estimer) : liens `aussi`.
AUSSI_CM1 = {"relations": "longueur_convertir", "comparer": "longueur_comparer", "mesurer": "longueur_mesurer",
             "estimer": "longueur_estimer"}
COACH = "https://www.eleveai.fr/coach/serie?classe=ce2&matiere=maths&notion=longueur&microId={micro}&display=simple"
NOM_CEINT = {"blanche": "Ceinture blanche", "jaune": "Ceinture jaune", "orange": "Ceinture orange", "bleue": "Ceinture bleue"}

# Dates : 31/01, 02, 04, 06, 08, 10, 12, 14/02/2027 (manifeste relu le 14/11 : une seule vidéo ces jours-là ;
# le 24-30/01 et le 16-24/02 ont déjà trois vidéos les jours pairs : solides CM1, longueurs CM1).
EP = [
 dict(n=1, slug="unites", micro="ce2_longueur_unites", nom="Les unités de longueur", date="2027-01-31", ceinture="blanche",
      titre="Avec quelle unité mesurer ?",
      intro="Samuel est menuisier : il fabrique des tables et des étagères en bois. Avant de couper une planche, il la mesure. Mais avec quelle unité ?",
      points=["l'unité de longueur : le mètre (m)",
              "pour les petites longueurs : le décimètre (dm), le centimètre (cm), le millimètre (mm)",
              "pour les grandes distances : le kilomètre (km)",
              "ranger les unités : mm, cm, dm, m, km",
              "le piège : m, c'est le mètre ; mm, c'est le millimètre"],
      defi="une table, le trajet jusqu'à la scierie, un clou : quelle unité pour chacun ?",
      chap={"00-garde": "Avec quelle unité ?", "02-metre": "Le mètre", "03-petites": "Les petites longueurs",
            "04-kilometre": "Le kilomètre", "05-question": "Question 1", "06-ranger": "Ranger les unités",
            "07-piege": "Le piège", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["longueur", "unités de longueur", "mètre", "centimètre", "kilomètre", "menuisier", "bois"],
      centres=["art-design"],
      s_titre="Ma queue mesure 10 kilomètres, tu paries ?",
      s_accroche="Je mesure ma queue. Elle fait 10… kilomètres ? Je suis le plus long margouillat du monde ! Hé… 10 kilomètres, c'est plus long qu'une ville entière.",
      s_toi="la plus petite unité, c'est le mètre, le centimètre ou le millimètre ?",
      s_tags=["longueur", "unités", "margouillat", "kilomètre"], s_centres=["animaux", "jeux-defis"]),
 dict(n=2, slug="relations", micro="ce2_longueur_relations", nom="Mètre, décimètre, centimètre", date="2027-02-02", ceinture="jaune",
      titre="1 mètre, c'est combien de centimètres ?",
      intro="Nina est entraîneuse d'athlétisme. Ses élèves sautent dans le sable et courent sur la piste. Nina mesure tout : en mètres, en centimètres, et même en kilomètres.",
      points=["1 m = 100 cm (centi veut dire cent)",
              "1 m = 10 dm et 1 dm = 10 cm",
              "1 cm = 10 mm",
              "1 km = 1000 m (kilo veut dire mille)",
              "le piège : 1 m, ce n'est pas 10 cm"],
      defi="Sami saute 1 mètre et 30 centimètres : combien de centimètres en tout ?",
      chap={"00-garde": "Combien de centimètres ?", "02-metre-cm": "1 m = 100 cm", "03-metre-dm": "1 m = 10 dm",
            "04-cm-mm": "1 cm = 10 mm", "05-question": "Question 1", "06-km": "1 km = 1000 m",
            "07-piege": "Le piège", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["longueur", "conversion", "mètre", "centimètre", "décimètre", "athlétisme", "saut en longueur"],
      centres=["sport"],
      s_titre="100 cm de ficelle, c'est trop ? Tu paries ?",
      s_accroche="Je voulais 1 mètre de ficelle pour mon cerf-volant. Le vendeur m'en donne 100 centimètres. 100 ? C'est beaucoup trop ! Je mesure…",
      s_toi="combien de mètres dans 1 kilomètre ?",
      s_tags=["longueur", "mètre", "centimètre", "cerf-volant"], s_centres=["jeux-defis"]),
 dict(n=3, slug="mesurer", micro="ce2_longueur_mesurer", nom="Mesurer avec une règle", date="2027-02-04", ceinture="jaune",
      titre="Où poser la règle pour mesurer ?",
      intro="Clara est astronome : elle observe les étoiles. Sur sa carte du ciel, elle relie les étoiles par des segments. Pour que sa carte soit juste, elle mesure chaque segment avec sa règle.",
      points=["poser le 0 sur le début du segment",
              "lire le nombre sous l'autre bout",
              "les millimètres : 5 cm et 4 mm",
              "le piège : le segment commence sur le 2 ; on compte de 2 à 9",
              "tracer un segment de 8 cm"],
      defi="un segment qui commence sur le 0 et s'arrête 3 petits traits après le 4 : combien mesure-t-il ?",
      chap={"00-garde": "Où poser la règle ?", "02-zero": "Le 0 au début", "03-lire": "Lire la mesure",
            "04-mm": "Les millimètres", "05-question": "Question 1", "06-piege": "Le piège",
            "07-tracer": "Tracer un segment", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["longueur", "mesurer", "règle graduée", "segment", "millimètre", "astronome", "étoiles"],
      centres=["espace"],
      s_titre="Ma banane fait 12 cm, tu paries ?",
      s_accroche="Je mesure ma banane. Le bout tombe sur le 12 : ma banane fait 12 centimètres ! Oups… elle commençait sur le 2, pas sur le 0.",
      s_toi="un crayon va du 0 au 9 sur la règle. Combien mesure-t-il ?",
      s_tags=["longueur", "règle", "mesurer", "banane"], s_centres=["cuisine", "jeux-defis"]),
 dict(n=4, slug="comparer", micro="ce2_longueur_comparer", nom="Comparer des longueurs", date="2027-02-06", ceinture="orange",
      titre="1 m ou 90 cm : qui est le plus long ?",
      intro="Lina est biologiste marine : elle étudie les animaux de la mer. Aujourd'hui, elle mesure une tortue de 1 mètre et un petit requin de 90 centimètres. Qui est le plus long ?",
      points=["deux unités : d'abord la même unité, 1 m = 100 cm",
              "puis on compare les nombres : 100 > 90",
              "même unité : on compare directement (250 cm et 180 cm)",
              "le piège : 90 est plus grand que 1, mais 90 cm est plus court que 1 m"],
      defi="ranger du plus court au plus long : une algue de 2 m, un poisson de 150 cm, une méduse de 30 cm.",
      chap={"00-garde": "Qui est le plus long ?", "02-meme-unite": "La même unité", "03-comparer": "Comparer",
            "04-direct": "Déjà la même unité", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["longueur", "comparer des longueurs", "mètre", "centimètre", "biologiste marine", "tortue", "requin"],
      centres=["animaux"],
      s_titre="1 dm contre 9 cm : le plus long, tu paries ?", s_ceinture="jaune",
      s_accroche="Mon copain le gecko mesure 1 décimètre. Moi, 9 centimètres. 9 est plus grand que 1 : c'est moi le plus long ! Hé, attends…",
      s_toi="qui est le plus long, 2 mètres ou 150 centimètres ?",
      s_tags=["longueur", "comparer", "gecko", "décimètre"], s_centres=["animaux", "jeux-defis"]),
 dict(n=5, slug="choisir_unite", micro="ce2_longueur_choisir_unite", nom="Choisir la bonne unité", date="2027-02-08", ceinture="jaune",
      titre="Pourquoi trois unités différentes ?",
      intro="Karim est pilote d'avion. Son avion mesure 40 mètres de long. Il vole 900 kilomètres jusqu'à une autre ville. Et son stylo mesure 14 centimètres. Pourquoi trois unités différentes ?",
      points=["on choisit l'unité qui donne un nombre simple à dire",
              "les grandes distances : le kilomètre (900 km, pas 900 000 m)",
              "une pièce ou un avion : le mètre ; un objet dans la main : le centimètre ; une chose fine : le millimètre",
              "le piège : une porte de 2 cm ? Le nombre est juste, l'unité est fausse"],
      defi="une valise, le trajet entre deux villes, l'épaisseur d'un billet d'avion : quelle unité ?",
      chap={"00-garde": "Trois unités ?", "02-regle": "Un nombre simple", "03-grand": "Les grandes distances",
            "04-repere": "Des repères", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["longueur", "unités de longueur", "kilomètre", "centimètre", "pilote", "avion"],
      centres=["transports"],
      s_titre="Mamie habite à 3 millions de cm, tu paries ?",
      s_accroche="Je vais chez Mamie. Elle habite à 3 millions de centimètres ! Je n'arrive même pas à l'écrire. Trop de zéros…",
      s_toi="avec quelle unité mesures-tu ta gomme ?",
      s_tags=["longueur", "kilomètre", "unité", "Mamie"], s_centres=["transports", "jeux-defis"]),
 dict(n=6, slug="estimer", micro="ce2_longueur_estimer", nom="Estimer une longueur", date="2027-02-10", ceinture="jaune",
      titre="Mesurer sans règle, c'est possible ?",
      intro="Élodie est paysagiste : elle crée des jardins. Elle n'a pas toujours son mètre ruban. Alors elle estime : elle compare à des longueurs qu'elle connaît par cœur.",
      points=["des repères : un doigt environ 1 cm, une main environ 1 dm, un grand pas environ 1 m",
              "6 grands pas : une allée d'environ 6 m",
              "une porte : environ 2 m ; un quart d'heure de marche : environ 1 km",
              "le piège : un doigt de 1 m de large ? Impossible !"],
      defi="un banc de 10 largeurs de main : environ combien mesure-t-il ?",
      chap={"00-garde": "Sans règle ?", "02-reperes": "Des repères", "03-pas": "Les grands pas",
            "04-porte": "Une porte, une marche", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["longueur", "estimer", "ordre de grandeur", "mètre", "paysagiste", "jardin"],
      centres=["nature-ecologie"],
      s_titre="Un mur mesuré avec ma queue, tu paries ?", s_ceinture="jaune",
      s_accroche="Combien mesure mon mur ? Pas de règle… Je le mesure avec ma queue ! Elle fait 10 centimètres. Je la pose une fois, deux fois… 10 fois.",
      s_toi="environ combien mesure la hauteur d'une porte ?",
      s_tags=["longueur", "estimer", "mur", "margouillat"], s_centres=["jeux-defis"]),
 dict(n=7, slug="probleme", micro="ce2_longueur_probleme", nom="Un problème de longueurs", date="2027-02-12", ceinture="orange",
      titre="3 m et 250 cm : quelle longueur en tout ?",
      intro="Jules est technicien de concert : il installe les lumières et les haut-parleurs. Pour brancher une enceinte, il met bout à bout un câble de 3 mètres et un câble de 250 centimètres. Quelle longueur en tout ?",
      points=["d'abord la même unité : 3 m = 300 cm",
              "additionner : 300 + 250 = 550 cm, soit 5 m et 50 cm",
              "le piège : 3 + 250 = 253 ne veut rien dire",
              "deux étapes : 65 + 45 = 110, puis 200 − 110 = 90 cm"],
      defi="trois câbles bout à bout : 1 m, 50 cm et encore 1 m. Quelle longueur en tout, en centimètres ?",
      chap={"00-garde": "Quelle longueur en tout ?", "02-convertir": "D'abord convertir", "03-additionner": "Additionner",
            "04-piege": "Le piège", "05-question": "Question 1", "06-deux-etapes": "Deux étapes",
            "06b-calcul": "Le calcul", "07-question": "Question 2", "08-defi": "À toi de jouer",
            "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
      tags=["longueur", "problème", "mètre", "centimètre", "technicien", "concert", "câble"],
      centres=["musique"],
      s_titre="1 m + 50 cm = 51 cm, tu paries ?", s_ceinture="jaune",
      s_accroche="J'attache deux cordes pour faire une grande corde à sauter : 1 mètre, et 50 centimètres. 1 plus 50 : 51 ! C'est tout petit…",
      s_toi="2 mètres de ruban et 30 centimètres, combien de centimètres en tout ?",
      s_tags=["longueur", "problème", "corde à sauter", "conversion"], s_centres=["sport", "jeux-defis"]),
 dict(n=8, slug="defi", micro="ce2_longueur_defi", nom="Un défi de longueurs", date="2027-02-14", ceinture="bleue",
      titre="12 cm, 120 mm, 1 dm et 2 cm : qui a raison ?",
      intro="Maya est pâtissière. Autour de chaque gâteau, elle met un ruban. Ses trois apprentis mesurent le même ruban : 12 centimètres, 120 millimètres, 1 décimètre et 2 centimètres. Qui a raison ?",
      points=["tout en centimètres : 120 mm = 12 cm",
              "1 dm et 2 cm = 10 + 2 = 12 cm : les trois ont raison",
              "1 m = 100 cm : 4 morceaux de 25 cm",
              "le piège : 120 mm, ce n'est pas 120 cm",
              "2 m de ruban, 50 cm par gâteau : 4 gâteaux"],
      defi="1 m de ruban, 40 cm puis 35 cm : en reste-t-il assez pour un gâteau de 30 cm ?",
      chap={"00-garde": "Qui a raison ?", "02-mm": "Les millimètres", "03-dm": "Le décimètre",
            "04-question": "Question 1", "05-ruban": "Un nouveau défi", "05b-calcul": "Le calcul",
            "06-piege": "Le piège", "07-question": "Question 2", "08-defi": "À toi de jouer",
            "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
      tags=["longueur", "défi", "conversion", "millimètre", "décimètre", "pâtissière", "gâteau"],
      centres=["cuisine"],
      s_titre="6 dm, 60 cm, 600 mm : qui a raison ?", s_ceinture="orange",
      s_accroche="Trois amis mesurent mon skate. Le premier dit 6 décimètres. Le deuxième, 60 centimètres. Le troisième, 600 millimètres. Ils se disputent !",
      s_toi="1 mètre, c'est combien de décimètres ?",
      s_tags=["longueur", "défi", "skate", "qui a raison"], s_centres=["sport", "jeux-defis"]),
]

COMMUNS = ["longueur", "mesure", "maths", "CE2", "primaire", "cycle 2", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EP:
        n, slug = e["n"], e["slug"]
        ident = f"ce2-longueur-{slug.replace('_', '-')}"
        if ident not in temps:
            continue
        dos = f"ce2/maths/longueur/{n:02d}-{slug.replace('_', '-')}"
        nom = f"eleveai-maths-{ident}"
        coach = COACH.format(micro=e["micro"])
        voix = json.loads((VOIX / f"{ident}.json").read_text(encoding="utf-8"))
        t = temps[ident]
        titre = f"{e['titre']} — {e['nom']} — épisode {n} · Maths CE2"
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += (f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 {NOM_CEINT[e['ceinture']]}.\n"
                f"Un défi en fin de vidéo, avec sa correction : {e['defi']}")
        acc += f"\n\nPour s'entraîner :\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n🔢 Épisode {n} de la série Longueurs d'EleveAI, en CE2."
        qs = [dict(t=mmss(t["clips"][c]), **question(voix, c)) for c in voix if c.endswith("-question")]
        out.append({
            "id": ident, "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": e["micro"], "classe": "ce2",
            "ceinture": e["ceinture"], "serie": "Maths CE2", "type": "longue", "fichier": f"{dos}/{nom}.mp4",
            "miniature": f"{dos}/{nom}.png", "titre": titre, "accroche": acc,
            "chapitres": chapitres(e["chap"], t["clips"], t["duree"]),
            "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
        if e["slug"] in AUSSI_CM1:  # la même vidéo sert aussi une micro CM1 (révision)
            out[-1]["aussi"] = [{"classe": "cm1", "notionId": "longueur", "microId": AUSSI_CM1[e["slug"]]}]
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
                 "Fait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #longueur #ce2 #primaire")
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
            out[-1]["aussi"] = [{"classe": "cm1", "notionId": "longueur", "microId": AUSSI_CM1[e["slug"]]}]
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
                nom = f"ce2-longueur-{e['slug'].replace('_', '-')}{suf}"
                mp4 = SERIE / f"{e['n']:02d}-{e['slug'].replace('_', '-')}" / f"eleveai-maths-{nom}.mp4"
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
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-longueur-ce2.json"
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
