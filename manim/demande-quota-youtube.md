# Demande d'augmentation du quota de l'API YouTube

Préparée le 01/11/2026. Elle sert à passer de 5 à 15 vidéos publiées par jour
avec `scripts/publier-youtube.mjs`.

**Le formulaire** : https://support.google.com/youtube/contact/yt_api_form
(« YouTube API Services – Audit and Quota Extension Form »). Ouvre-le avec le
compte **academienumerique@gmail.com**, propriétaire du projet Google Cloud.

Le formulaire est en anglais, donc les réponses à coller aussi : les équipes de
Google les lisent en anglais. Sous chaque réponse, une ligne en français
explique ce qu'elle dit.

Réponds **exactement** comme ci-dessous à « Internal use only ». Un outil
interne, qui ne publie que sur ta propre chaîne, se fait accepter bien plus
facilement.

---

## 1. Contact

| Champ | À mettre |
|---|---|
| Name | Frédéric Lacoste |
| Email | academienumerique@gmail.com |
| Organization / Company | EleveAI |
| Website | https://www.eleveai.fr |
| Country | France (La Réunion) |

## 2. Le client de l'API

| Champ | À mettre |
|---|---|
| Google Cloud project number | 103036242119 |
| Project ID | formationstatistiques |
| OAuth client | « publier-youtube » (Desktop app). Copie l'ID client depuis Google Auth Platform → Clients, sans le secret. |
| YouTube channel | https://www.youtube.com/@eleveai974 |
| API used | YouTube Data API v3 |

## 3. Who uses your API client?

> **Internal use only.** The API client is a command-line script run by the
> channel owner (me) on my own computer. It only uploads videos to my own
> channel @eleveai974. No third-party user ever signs in, and no YouTube data
> is shown to anyone else.

*Outil interne : seul toi l'utilises, et seulement pour ta chaîne.*

## 4. Describe your API client and how it uses the YouTube API

> EleveAI (www.eleveai.fr) is a free educational website for French-speaking
> students, from primary school to the end of high school. I am a mathematics
> teacher in La Réunion (France). I produce short animated math lessons with
> Manim: for each skill of the curriculum, one landscape lesson (3 to 6 min)
> and one Short.
>
> My script `publier-youtube.mjs` reads a local manifest (title, description,
> chapters, tags, thumbnail, playlist for each video) and, for each video:
>
> 1. uploads the video file (videos.insert, resumable upload);
> 2. sets its custom thumbnail (thumbnails.set);
> 3. adds it to the channel playlist (playlistItems.insert);
> 4. reads the channel's own uploads (channels.list, playlistItems.list,
>    videos.list with fileDetails) to avoid uploading a video twice;
> 5. when a lesson is remade, sets the old version to "unlisted"
>    (videos.update), so the links already given to students keep working.
>
> It publishes the long lesson before its Short, so the Short's description can
> link to the full lesson. Nothing else is done with the data: no analytics,
> no storage of other users' data, no display to third parties.

*Ce que fait le script, étape par étape, et le fait qu'il ne touche qu'à ta
chaîne.*

## 5. How much quota do you need, and why?

> **Requested: 30,000 units per day** (current: 10,000).
>
> One video costs about 1,715 units: videos.insert 1,600 + thumbnails.set 50 +
> playlistItems.insert 50 + about 15 units of read calls. With 10,000 units I
> can publish only 5 videos a day.
>
> I already have more than 700 finished lessons waiting (landscape lessons and
> Shorts, all grades), and I produce new ones every day. At 5 per day, the
> backlog alone would take about five months to publish. 30,000 units allow
> about 15 uploads a day, which matches my production. Students use these
> videos in class and at home, so the delay directly affects them.

*Ce que tu demandes (30 000 unités, soit environ 15 vidéos par jour) et
pourquoi : plus de 700 vidéos prêtes et pas encore en ligne, et de nouvelles
chaque jour.*

## 6. Data handling, if the form asks

| Question | Réponse |
|---|---|
| Do you store YouTube data? | Only the IDs of my own uploaded videos, in a local file, to link each Short to its lesson and avoid duplicates. |
| Do you display YouTube data to users? | No. |
| Do you use YouTube data for ads or analytics? | No. |
| Privacy policy | https://www.eleveai.fr/politique-confidentialite |
| Terms of service | https://www.eleveai.fr/cgu |

## 7. Demonstration, if the form asks for one

Google accepte une courte vidéo d'écran, non répertoriée sur ta chaîne, qui
montre la commande en action :
```
node scripts/publier-youtube.mjs --du-jour --dry-run
```
puis un envoi réel, et la vidéo qui apparaît dans Studio. Une minute suffit.
On pourra l'enregistrer ensemble si Google la demande.

---

## Ce qui peut bloquer, et quoi faire

- **L'application OAuth n'est pas validée.** Pour un usage interne, ce n'est
  normalement pas un obstacle. Si Google demande une vérification, on la fera :
  il faudra une page d'accueil et une politique de confidentialité qui
  mentionnent l'usage de YouTube.
- **La politique de confidentialité ne parle pas de YouTube.** Si Google le
  signale, on y ajoutera un paragraphe court (« ce site publie ses vidéos sur
  YouTube ; voir les conditions d'utilisation de YouTube et les règles de
  confidentialité de Google »).
- **Le délai.** La réponse arrive par e-mail, en général en une à trois
  semaines. Pendant ce temps, on continue à 5 vidéos par jour avec `--du-jour`.
