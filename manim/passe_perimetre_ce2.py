# passe_perimetre_ce2.py
# Passe finale de la série PÉRIMÈTRE CE2 (13/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) : les entrées
# du manifeste (paysage + short Ti Margo par épisode). Calquée sur passe_calcul_pose.py : temps des
# chapitres et des questions relevés dans l'AUDIO des mp4 (passe_relatifs.mesurer), questions lues
# dans les voix validées. Le manifeste a des modifications non commitées d'autres sessions : on relit
# la copie de travail et on ajoute ou remplace SEULEMENT nos entrées.
# Vidéos COMMUNES au CE2 et au CM1 (la session CM1 les relie par `aussi`). Pas de fiche CE2 : le coach.
#
#   python manim/passe_perimetre_ce2.py temps [slug]  → manim/sorties/ce2/maths/perimetre/temps.json
#   python manim/passe_perimetre_ce2.py voir           → affiche les entrées sans rien écrire
#   python manim/passe_perimetre_ce2.py manifeste      → ajoute ou remplace les entrées ce2-perimetre-<slug>[-short]
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402
from passe_decimaux import question, chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "ce2" / "maths" / "perimetre"
VOIX = RACINE / "manim" / "voix"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
NOTION = "perimetre"
COACH = "https://www.eleveai.fr/coach/serie?classe=ce2&matiere=maths&notion=perimetre&microId={micro}&display=simple"
NOM_CEINT = {"blanche": "Ceinture blanche", "jaune": "Ceinture jaune", "orange": "Ceinture orange", "bleue": "Ceinture bleue"}

# Dates : après le 24/12 (04 et 05 ajoutés le 14/11 : 30/12 et 01/01, jours libres), au plus 2 paysages et 5 vidéos par jour (manifeste relu le 13/11).
EP = [
 dict(n=1, slug="comprendre", micro="ce2_perimetre_comprendre", nom="Le périmètre", date="2026-12-25", ceinture="blanche",
      titre="Combien de clôture pour faire le tour d'un jardin ?",
      intro="Léo est paysagiste. Il doit poser une clôture tout autour d'un jardin de 8 mètres sur 5 mètres. Combien de mètres de clôture doit-il acheter ?",
      points=["faire le tour : on suit le bord, côté après côté, jusqu'au départ",
              "ajouter les côtés : 8 + 5 + 8 + 5 = 26 m",
              "le périmètre, c'est le bord, pas l'intérieur",
              "le piège : n'oublier aucun côté"],
      defi="l'enclos à moutons d'Inès a 5 côtés de 3, 4, 2, 5 et 6 mètres : combien de grillage ?",
      chap={"00-garde": "Combien de clôture ?", "02-tour": "Faire le tour", "03-calcul": "Ajouter les côtés",
            "04-bord": "Le bord, pas l'intérieur", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["périmètre", "faire le tour", "ajouter les côtés", "paysagiste", "jardin", "clôture"],
      centres=["nature-ecologie", "animaux"],
      s_titre="Le tour du bac à sable : 9 m, tu paries ?",
      s_accroche="Je fais le tour du bac à sable : 6 mètres, 3 mètres… et hop, je coupe par le milieu ! 9 mètres ? Couper par le milieu, ce n'est pas faire le tour…",
      s_toi="mon carnet est un carré de 9 cm de côté. Quel est son périmètre ?",
      s_tags=["périmètre", "bac à sable", "faire le tour"], s_centres=["jeux-defis"]),
 dict(n=2, slug="polygone", micro="ce2_perimetre_polygone", nom="Le périmètre d'un polygone", date="2026-12-27", ceinture="jaune",
      titre="6 côtés : comment n'en oublier aucun ?",
      intro="Sofia est jardinière. Son potager a une drôle de forme : il a six côtés. Elle veut poser une bordure en bois tout autour. Combien de mètres ?",
      points=["compter les côtés d'abord : un point sur chacun",
              "faire le tour : 6 + 2 + 3 + 3 + 3 + 5 = 22 m",
              "sur un quadrillage : compter les côtés de carreaux, 14 cm",
              "le piège : 9 carreaux, ce n'est pas le périmètre"],
      defi="un parterre de fleurs à 6 côtés égaux de 3 mètres : combien de bordure ?",
      chap={"00-garde": "Ne jamais oublier un côté", "02-compter": "Compter les côtés", "03-calcul": "Faire le tour",
            "04-question": "Question 1", "05-quadrillage": "Sur un quadrillage", "06-piege": "Le piège des carreaux",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["périmètre", "polygone", "quadrillage", "compter les côtés", "jardinière", "potager"],
      centres=["nature-ecologie"],
      s_titre="La guirlande de ma cabane : 13 m, tu paries ?",
      s_accroche="J'entoure ma cabane d'une guirlande. Le sol, 4 mètres. Le mur, 3. Le toit, 3 et 3. 13 mètres ? Oh non, il manque un bout de guirlande…",
      s_toi="un triangle a des côtés de 5, 6 et 7 cm. Quel est son périmètre ?",
      s_tags=["périmètre", "polygone", "guirlande", "côté oublié"], s_centres=["jeux-defis"]),
 dict(n=3, slug="comparer", micro="ce2_perimetre_comparer", nom="Comparer des périmètres", date="2026-12-29", ceinture="orange",
      titre="Rectangle ou triangle : quel tour est plus long ?",
      intro="Malik organise des courses pour les enfants. Il hésite entre deux parcours : le tour du terrain rouge, ou le tour du terrain bleu. Lequel est le plus long ?",
      points=["calculer les deux tours : 120 m et 130 m",
              "le plus long tour peut avoir moins de côtés",
              "le piège : un carré de 5 m et un rectangle de 9 m sur 1 m ont le même tour",
              "sans règle : déplier les tours sur une ligne, au compas"],
      defi="ranger 3 parcours du plus court au plus long : un carré de 30 m, un rectangle de 50 m sur 20 m, un triangle de 40, 40 et 30 m.",
      chap={"00-garde": "Quel tour est le plus long ?", "02-rouge": "Le tour rouge", "03-bleu": "Le tour bleu",
            "04-question": "Question 1", "05-piege": "Le piège : même tour", "06-compas": "Sans règle : le compas",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["périmètre", "comparer des périmètres", "compas", "reporter des longueurs", "organisateur", "course"],
      centres=["sport"],
      s_titre="La table la plus petite a le plus petit tour, tu paries ?",
      s_accroche="Course autour des tables ! Je prends la table longue et fine : elle a l'air plus petite. Mon copain prend la table carrée. Qui fait le plus long tour ?",
      s_toi="un triangle de 6 pas de côté, ou un carré de 4 pas de côté : lequel a le plus long tour ?",
      s_tags=["périmètre", "comparer", "course", "tables"], s_centres=["sport", "jeux-defis"]),
 dict(n=4, slug="rectangle", micro="ce2_perimetre_rectangle", nom="Le rectangle et le carré", date="2026-12-30", ceinture="orange",
      titre="Combien de galon pour le tour d'un coussin ?",
      intro="Kenza est couturière. Elle coud un galon tout autour d'un coussin rectangulaire de 40 centimètres sur 30 centimètres. Combien de centimètres de galon lui faut-il ?",
      points=["un rectangle : deux longueurs pareilles, deux largeurs pareilles",
              "faire le tour : 40 + 30 + 40 + 30 = 140 cm",
              "autre façon : 40 + 40 = 80, 30 + 30 = 60, 80 + 60 = 140",
              "le piège : 8 × 3, ce n'est pas le tour",
              "le carré : 4 côtés égaux, le côté fois 4"],
      defi="Kenza a 150 cm de galon et borde un coussin de 40 cm sur 25 cm : combien lui en reste-t-il ?",
      chap={"00-garde": "Le tour sans se tromper", "02-cotes": "Longueurs et largeurs", "03-calcul": "Faire le tour",
            "04-doubler": "Autre façon", "05-question": "Question 1", "06-piege": "Le piège : multiplier",
            "07-carre": "Et le carré ?", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["périmètre", "périmètre du rectangle", "périmètre du carré", "longueur", "largeur", "couturière", "galon"],
      centres=["mode", "art-design"],
      s_titre="Le tour du potager = 10 × 2, tu paries ?", s_ceinture="jaune",
      s_accroche="Je pose une bordure autour du potager de Mamie : 10 mètres de long, 2 mètres de large. 10 fois 2, 20 : j'achète 20 mètres ! Oh non, il manque un grand morceau…",
      s_toi="un potager carré de 7 mètres de côté. Combien de bordure pour en faire le tour ?",
      s_tags=["périmètre", "rectangle", "potager", "multiplier n'est pas faire le tour"], s_centres=["nature-ecologie", "jeux-defis"]),
 dict(n=5, slug="defi", micro="ce2_perimetre_defi", nom="Un défi de périmètre", date="2027-01-01", ceinture="bleue",
      titre="Une porte, des cages collées : que devient le tour ?",
      intro="Zoé est soigneuse dans un refuge pour animaux. Elle construit un enclos rectangulaire de 12 mètres sur 5 mètres pour les tortues, avec une porte de 2 mètres. Combien de mètres de grillage doit-elle acheter ?",
      points=["tout le tour d'abord : 12 + 5 + 12 + 5 = 34 m",
              "puis on enlève la porte : 34 − 2 = 32 m",
              "deux cages collées : le côté collé est dedans, 6 côtés de 3 m = 18 m",
              "le piège : 12 + 12 = 24, c'est trop !"],
      defi="deux enclos carrés de 4 m collés, avec une porte de 1 m : combien de grillage ?",
      chap={"00-garde": "Une porte, des cages collées", "02-tour": "Tout le tour", "03-porte": "On enlève la porte",
            "04-question": "Question 1", "05-colles": "Des cages collées", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["périmètre", "problème", "figures collées", "porte", "soigneuse", "refuge", "animaux"],
      centres=["animaux", "jeux-defis"],
      s_titre="16 m de scotch pour ma scène, tu paries ?", s_ceinture="orange",
      s_accroche="Je colle deux tapis carrés de 2 mètres pour faire une scène de danse, et je mets du scotch lumineux autour de chaque tapis : 16 mètres ! Mais au milieu, ça ne brille pour personne…",
      s_toi="trois tapis carrés de 1 mètre, collés en ligne. Combien de scotch pour le tour ?",
      s_tags=["périmètre", "figures collées", "scène", "danse"], s_centres=["musique", "jeux-defis"]),
]

COMMUNS = ["périmètre", "maths", "CE2", "CM1", "primaire", "cycle 2", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EP:
        n, slug = e["n"], e["slug"]
        ident = f"ce2-perimetre-{slug}"
        if ident not in temps:
            continue
        dos = f"ce2/maths/perimetre/{n:02d}-{slug}"
        nom = f"eleveai-maths-{ident}"
        coach = COACH.format(micro=e["micro"])
        voix = json.loads((VOIX / f"{ident}.json").read_text(encoding="utf-8"))
        t = temps[ident]
        titre = f"{e['titre']} — {e['nom']} — épisode {n} · Maths CE2"
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += (f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 {NOM_CEINT[e['ceinture']]}.\n"
                f"Un défi en fin de vidéo, avec sa correction : {e['defi']}")
        acc += f"\n\nPour s'entraîner :\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n🔢 Épisode {n} de la série Périmètre d'EleveAI, en CE2 (et pour revoir au CM1)."
        qs = [dict(t=mmss(t["clips"][c]), **question(voix, c)) for c in voix if c.endswith("-question")]
        out.append({
            "id": ident, "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": e["micro"], "classe": "ce2",
            "ceinture": e["ceinture"], "serie": "Maths CE2", "type": "longue", "fichier": f"{dos}/{nom}.mp4",
            "miniature": f"{dos}/{nom}.png", "titre": titre, "accroche": acc,
            "chapitres": chapitres(e["chap"], t["clips"], t["duree"]),
            "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
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
                 "Fait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #périmètre #ce2 #primaire")
        out.append({
            "id": f"{ident}-short", "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": e["micro"],
            "classe": "ce2", "ceinture": sc, "serie": "Maths CE2", "type": "short", "renvoie_vers": ident,
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
                nom = f"ce2-perimetre-{e['slug']}{suf}"
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
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-perimetre-ce2.json"
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
