# passe_solides_cm1.py
# Passe finale de la série SOLIDES ET ESPACE CM1 (14/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) : les entrées
# du manifeste (paysage + short Ti Margo par épisode). Copie de passe_solides_ce2.py (classe cm1) : temps des
# chapitres et des questions relevés dans l'AUDIO des mp4, questions lues dans les voix validées. Le manifeste
# a des modifications non commitées d'autres sessions : on relit la copie de travail et on ajoute ou remplace
# SEULEMENT nos entrées. Le reste du CM1 (reconnaître, faces/arêtes/sommets, faces) : vidéos CE2 par `aussi`.
#
#   python manim/passe_solides_cm1.py temps [slug]  → manim/sorties/cm1/maths/solides/temps.json
#   python manim/passe_solides_cm1.py voir           → affiche les entrées sans rien écrire
#   python manim/passe_solides_cm1.py manifeste      → ajoute ou remplace les entrées cm1-solides-<slug>[-short]
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402
from passe_decimaux import question, chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "cm1" / "maths" / "solides"
VOIX = RACINE / "manim" / "voix"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
NOTION = "solide"  # la notion CM1 du coach s'appelle « solide » (CE2 : « solides »)
COACH = "https://www.eleveai.fr/coach/serie?classe=cm1&matiere=maths&notion=solide&microId={micro}&display=simple"
NOM_CEINT = {"blanche": "Ceinture blanche", "verte": "Ceinture verte", "jaune": "Ceinture jaune", "orange": "Ceinture orange", "bleue": "Ceinture bleue"}

# Dates : 26, 28 et 30/01/2027 (manifeste relu le 14/11 : 1 paysage ces jours-là, donc libres).
EP = [
 dict(n=1, slug="prisme", micro="solide_prisme", nom="Le prisme droit", date="2027-01-26", ceinture="verte",
      titre="Le prisme droit : faces, sommets, arêtes sans se tromper",
      intro="Sacha est guide de montagne. Ce soir, son groupe dort sous la tente. Sa forme n'est ni un cube, ni une pyramide : c'est un prisme droit. Comment compter ses faces, ses sommets et ses arêtes ?",
      points=["deux bases pareilles, l'une en face de l'autre (ici deux triangles)",
              "autour, des faces rectangulaires : autant que de côtés de la base",
              "faces = côtés + 2 ; sommets = 2 × côtés ; arêtes = 3 × côtés",
              "le piège : la pyramide a une seule base et une pointe",
              "le patron de la tente : 3 rectangles en bande et 2 triangles"],
      defi="un écrou en prisme à base hexagonale : combien de sommets et d'arêtes ?",
      chap={"00-garde": "Comment tout compter ?", "02-bases": "Les deux bases", "03-laterales": "Les rectangles autour",
            "04-compter": "Faces, sommets, arêtes", "05-question": "Question 1", "06-piege": "Prisme ou pyramide ?",
            "07-patron": "Le patron de la tente", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["prisme droit", "solides", "faces", "arêtes", "sommets", "patron", "tente", "guide de montagne"],
      centres=["sport", "nature-ecologie"],
      s_titre="Ma tente est une pyramide, tu paries ?", s_ceinture="jaune",
      s_accroche="J'ai monté ma tente. Une vraie pyramide ! Bon… elle n'a pas de pointe. Elle a une longue arête, tout en haut.",
      s_toi="combien d'arêtes a ma tente ?",
      s_tags=["prisme", "pyramide", "tente", "camping"], s_centres=["nature-ecologie"]),
 dict(n=2, slug="patron", micro="solide_patron", nom="Reconnaître un patron", date="2027-01-28", ceinture="verte",
      titre="Quel dessin à plat devient quel solide ? Les patrons",
      intro="Rose est créatrice de jeux de société. Pour son nouveau jeu, elle fabrique un dé, des pions et une boîte en carton. Chaque pièce commence par un patron : quel dessin à plat devient quel solide ?",
      points=["le cube a 11 patrons, pas seulement la croix",
              "vérifier un patron : on plie dans sa tête, un carré après l'autre",
              "pavé : 6 rectangles ; pyramide : un carré et 4 triangles ; cylindre : 2 disques et un rectangle",
              "le dé : deux faces opposées font 7 et ne se touchent jamais sur le patron"],
      defi="le patron d'un dé avec 1, 2 et 3 : quels nombres dans les trois cases vides ?",
      chap={"00-garde": "Quel dessin, quel solide ?", "02-autres-cube": "Les 11 patrons du cube",
            "03-plier": "Plier dans sa tête", "04-solides": "Chaque solide a son patron", "05-question": "Question 1",
            "06-de": "Le dé : faces opposées", "07-piege": "Le piège", "08-question": "Question 2",
            "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["patron", "solides", "cube", "dé", "pyramide", "cylindre", "pavé droit", "jeux de société"],
      centres=["jeux-defis", "art-design"],
      s_titre="Le 1 à côté du 6 sur mon dé, tu paries ?", s_ceinture="jaune",
      s_accroche="Je fabrique mon dé. J'écris les nombres au hasard : 1 ici, 6 juste à côté… Hé ! Sur un vrai dé, ils sont face à face !",
      s_toi="sur un vrai dé, quelle face est en face du 1 ?",
      s_tags=["dé", "patron", "faces opposées", "cube"], s_centres=["jeux-defis"]),
 dict(n=3, slug="defi", micro="solide_defi", nom="Défi : les cubes cachés", date="2027-01-30", ceinture="bleue",
      titre="Des cubes empilés : combien sont cachés ? Un défi",
      intro="Ilan crée des décors de jeux vidéo avec des blocs en forme de cube : escaliers, murs, maisons. Combien de cubes lui faut-il, quand certains sont cachés ?",
      points=["un escalier : on compte colonne par colonne",
              "sur un dessin, les cubes du dessous et du fond sont cachés : ils comptent aussi",
              "un pavé de cubes : on compte étage par étage (3 × 2 = 6, puis 6 + 6 = 12)",
              "le piège : additionner au lieu de compter les rangées"],
      defi="une maison de 4 × 3 × 2 cubes, 10 déjà posés : combien en manque-t-il ?",
      chap={"00-garde": "Combien de cubes cachés ?", "02-escalier": "L'escalier", "03-cache": "Les cubes cachés",
            "04-etages": "Étage par étage", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["cubes", "solides", "empilement", "pavé droit", "défi", "jeux vidéo", "dénombrer"],
      centres=["jeux-video", "construction"],
      s_titre="4 caisses en tout dans ma pyramide, tu paries ?", s_ceinture="orange",
      s_accroche="J'empile des caisses en pyramide. En haut, 1 caisse. Je regarde d'en haut… je vois 4 caisses. Donc 4 caisses en tout ! Vraiment ?",
      s_toi="une pyramide de caisses avec 3 × 3 en bas, 2 × 2 au milieu et 1 en haut : combien de caisses ?",
      s_tags=["cubes", "empilement", "caisses", "pyramide"], s_centres=["construction"]),
]

COMMUNS = ["solides", "géométrie dans l'espace", "maths", "CM1", "primaire", "cycle 3", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EP:
        n, slug = e["n"], e["slug"]
        ident = f"cm1-solides-{slug}"
        if ident not in temps:
            continue
        dos = f"cm1/maths/solides/{n:02d}-{slug}"
        nom = f"eleveai-maths-{ident}"
        coach = COACH.format(micro=e["micro"])
        voix = json.loads((VOIX / f"{ident}.json").read_text(encoding="utf-8"))
        t = temps[ident]
        titre = f"{e['titre']} — {e['nom']} — épisode {n} · Maths CM1"
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += (f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 {NOM_CEINT[e['ceinture']]}.\n"
                f"Un défi en fin de vidéo, avec sa correction : {e['defi']}")
        acc += f"\n\nPour s'entraîner :\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n🔢 Épisode {n} de la série Solides et espace d'EleveAI, en CM1."
        qs = [dict(t=mmss(t["clips"][c]), **question(voix, c)) for c in voix if c.endswith("-question")]
        out.append({
            "id": ident, "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": e["micro"], "classe": "cm1",
            "ceinture": e["ceinture"], "serie": "Maths CM1", "type": "longue", "fichier": f"{dos}/{nom}.mp4",
            "miniature": f"{dos}/{nom}.png", "titre": titre, "accroche": acc,
            "chapitres": chapitres(e["chap"], t["clips"], t["duree"]),
            "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
        if f"{ident}-short" not in temps:
            continue
        sv = json.loads((VOIX / f"{ident}-short.json").read_text(encoding="utf-8"))
        ts = temps[f"{ident}-short"]
        stitre = f"{e['s_titre']} #maths #cm1"
        sc = e.get("s_ceinture", "blanche")
        sacc = e["s_accroche"] + (f"\n\nDessin animé, voix de synthèse.\n🥋 {NOM_CEINT[sc]}"
                                  + (" : pour découvrir." if sc == "blanche" else ".")
                                  + f"\n👉 À toi : {e['s_toi']} Réponds en commentaire !")
        sacc += (f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach}\n\n"
                 "Fait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #solides #cm1 #primaire")
        out.append({
            "id": f"{ident}-short", "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": e["micro"],
            "classe": "cm1", "ceinture": sc, "serie": "Maths CM1", "type": "short", "renvoie_vers": ident,
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short-miniature.png",
            "titre": stitre, "accroche": sacc,
            "tags": e["s_tags"] + ["Ti Margo", "dessin animé", NOM_CEINT[sc].lower()] + COMMUNS + ["Shorts"],
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
        filtre = sys.argv[2] if len(sys.argv) > 2 else ""
        res = json.loads(TEMPS.read_text(encoding="utf-8")) if TEMPS.exists() else {}
        for e in EP:
            if filtre and filtre != e["slug"]:
                continue
            for suf in ("", "-short"):
                nom = f"cm1-solides-{e['slug']}{suf}"
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
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-solides-cm1.json"
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
