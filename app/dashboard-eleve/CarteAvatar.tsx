"use client";

// « Mon avatar » dans le tableau de bord (31/10/2026). Ses élèves voulaient une
// photo de profil ; Frédéric ne veut rien de téléversé : on choisit une icône
// (ses passions d'abord, puis animaux et personnages) et une couleur.

import { useEffect, useState } from "react";
import { useEleve } from "@/context/EleveContext";
import AvatarRond from "@/components/AvatarRond";
import { AVATARS, COULEURS_AVATAR, lireAvatarTexte } from "@/lib/avatars";
import { chargerAvatar, chargerPassions, enregistrerAvatar } from "@/lib/passions";
import { libellePassion } from "@/lib/videos/centres-interet";

export default function CarteAvatar() {
  const { eleve } = useEleve();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [passions, setPassions] = useState<string[]>([]);
  const [ouvert, setOuvert] = useState(false);
  const [emoji, setEmoji] = useState("🐢");
  const [couleur, setCouleur] = useState("bleu");

  useEffect(() => {
    chargerAvatar(eleve).then((a) => {
      setAvatar(a);
      const l = lireAvatarTexte(a);
      if (l) {
        setEmoji(l.emoji);
        setCouleur(l.couleur);
      }
    });
    chargerPassions(eleve).then((p) => setPassions(p ?? []));
  }, [eleve]);

  // Ses passions en tête de la galerie, sans doublon.
  const icones = [...new Set([...passions.map((p) => libellePassion(p).emoji), ...AVATARS])];

  async function valider() {
    const a = `${emoji}|${couleur}`;
    await enregistrerAvatar(eleve, a);
    setAvatar(a);
    setOuvert(false);
    window.dispatchEvent(new Event("eleveai-avatar")); // l'en-tête se met à jour
  }

  return (
    <div className="mt-6 rounded-[2rem] border border-sky-200 bg-white p-6 shadow-xl">
      <div className="flex flex-wrap items-center gap-4">
        {avatar ? <AvatarRond avatar={avatar} taille="l" /> : <span className="text-5xl">🙂</span>}
        <div>
          <h2 className="text-xl font-black text-slate-900">Mon avatar</h2>
          <p className="text-sm font-semibold text-slate-500">Choisis ton image : pas besoin de photo.</p>
        </div>
        <button
          onClick={() => setOuvert(!ouvert)}
          className="ml-auto rounded-full bg-sky-600 px-5 py-3 text-sm font-black text-white shadow hover:bg-sky-500"
        >
          {avatar ? "✏️ Changer" : "Choisir mon avatar"}
        </button>
      </div>

      {ouvert && (
        <div className="mt-5 space-y-4">
          <div className="flex items-center gap-4">
            <AvatarRond avatar={`${emoji}|${couleur}`} taille="l" />
            <div className="flex flex-wrap gap-2">
              {Object.entries(COULEURS_AVATAR).map(([nom, classe]) => (
                <button
                  key={nom}
                  onClick={() => setCouleur(nom)}
                  title={nom}
                  className={`h-10 w-10 rounded-full ${classe} ${couleur === nom ? "ring-4 ring-sky-500" : "ring-1 ring-slate-300"}`}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-12">
            {icones.map((e) => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                className={`flex aspect-square items-center justify-center rounded-2xl text-3xl ${
                  emoji === e ? "bg-sky-100 ring-4 ring-sky-400" : "bg-slate-50 hover:bg-slate-100"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
          <button
            onClick={valider}
            className="rounded-2xl bg-emerald-500 px-6 py-3 text-lg font-black text-white shadow hover:bg-emerald-600"
          >
            C&apos;est mon avatar !
          </button>
        </div>
      )}
    </div>
  );
}
