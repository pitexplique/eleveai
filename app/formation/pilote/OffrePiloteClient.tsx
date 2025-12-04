"use client";

import { useState } from "react";

type ModeTarif = "fixe" | "mixte";

export default function OffrePiloteClient() {
  const [password, setPassword] = useState("");
  const [accesOK, setAccesOK] = useState(false);
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  // Simulation de coût
  const [nbEleves, setNbEleves] = useState(350);
  const [nbProfs, setNbProfs] = useState(30);
  const [modeTarif, setModeTarif] = useState<ModeTarif>("fixe");
  const [plafondMensuel, setPlafondMensuel] = useState(150); // plafond IA choisi par le chef d’établissement

  // Paramètres (à ajuster librement plus tard)
  const COUT_PAR_ELEVE_AN = 5; // 5 € / élève / an en mode fixe (ordre de grandeur)
  const BASE_MENSUEL_MIXTE = 99; // abonnement établissement / mois (ordre de grandeur)
  const VARIABLE_PAR_ELEVE_MOIS = 0.25; // part variable par élève / mois

  let coutMensuelEstime = 0;
  let coutAnnuelEstime = 0;
  let coutParEleve = 0;
  let coutParProf = 0;

  if (modeTarif === "fixe") {
    coutAnnuelEstime = nbEleves * COUT_PAR_ELEVE_AN;
    coutMensuelEstime = coutAnnuelEstime / 12;
  } else {
    const variableMensuel = nbEleves * VARIABLE_PAR_ELEVE_MOIS;
    coutMensuelEstime = BASE_MENSUEL_MIXTE + variableMensuel;
    coutAnnuelEstime = coutMensuelEstime * 12;
  }

  if (nbEleves > 0) {
    coutParEleve = coutAnnuelEstime / nbEleves;
  }
  if (nbProfs > 0) {
    coutParProf = coutAnnuelEstime / nbProfs;
  }

  // Application du plafond (comme sur la Platform OpenAI : max monthly spend)
  const coutMensuelFacture = Math.min(coutMensuelEstime, plafondMensuel);
  const coutAnnuelFacture = coutMensuelFacture * 12;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    setLoading(true);

    try {
      const res = await fetch("/api/check-pilote-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setErreur("Erreur technique. Réessaie dans un instant.");
        setAccesOK(false);
        return;
      }

      const data = await res.json();

      if (data.ok) {
        setAccesOK(true);
        setErreur("");
      } else {
        setErreur("Mot de passe incorrect.");
        setAccesOK(false);
      }
    } catch (err) {
      console.error(err);
      setErreur("Impossible de vérifier le mot de passe (problème réseau ?).");
      setAccesOK(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* En-tête */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 text-xs font-semibold text-emerald-300 border border-slate-700">
            <span>🔒</span>
            <span>Accès réservé – Offre Pilote & Formation EleveAI</span>
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-300">
            Espace confidentiel – Chefs d’établissement
          </h1>
          <p className="text-sm sm:text-base text-slate-200/80 max-w-2xl">
            Cet espace présente l&apos;offre EleveAI pour les{" "}
            <span className="font-semibold">établissements pilotes</span> :
            accompagnement, formations IA et mise en place de vos espaces
            EleveAI (profs, élèves, vie scolaire). Il est réservé aux équipes
            de direction et ne doit pas être diffusé publiquement.
          </p>
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 text-[11px] font-medium text-sky-200 border border-slate-700">
            <span>🧠</span>
            <span>
              Cette offre applique les programmes{" "}
              <span className="font-semibold">Eduscol</span> et s&apos;appuie
              sur les <span className="font-semibold">neurosciences</span> de
              l&apos;apprentissage.
            </span>
          </p>
        </header>

        {/* Si pas encore accès : formulaire mot de passe */}
        {!accesOK && (
          <section className="bg-slate-900/80 border border-slate-700 rounded-2xl shadow-lg shadow-black/40 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-50">
              Saisir le mot de passe
            </h2>
            <p className="text-sm text-slate-300">
              Le lien vers cette page et le mot de passe vous ont été transmis
              par email. Si ce n&apos;est pas le cas, vous pouvez contacter{" "}
              <span className="font-semibold text-emerald-300">
                Frédéric – EleveAI
              </span>{" "}
              pour obtenir un accès.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-600 bg-slate-950/70 rounded-lg px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                placeholder="••••••••"
              />
              {erreur && (
                <p className="text-xs text-red-400 mt-1">{erreur}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-semibold hover:bg-emerald-400 transition disabled:opacity-60"
              >
                {loading ? "Vérification..." : "✅ Valider l'accès"}
              </button>
            </form>

            <p className="text-[11px] text-slate-400 pt-2">
              Pour des raisons de confidentialité, merci de ne pas transmettre
              ce mot de passe à des personnes extérieures à votre établissement.
            </p>
          </section>
        )}

        {/* Contenu confidentiel une fois le bon mot de passe entré */}
        {accesOK && (
          <section className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl shadow-xl shadow-black/50 p-6 sm:p-7 space-y-6">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-[11px] font-semibold text-emerald-300 border border-emerald-500/40">
              <span>✅</span>
              <span>Accès confirmé – Document confidentiel EleveAI</span>
            </p>

            <h2 className="text-2xl font-bold text-emerald-300">
              Programme de formation & accompagnement – Établissement Pilote
              EleveAI
            </h2>

            <p className="text-sm text-slate-200/90">
              Ce document présente la proposition EleveAI pour un{" "}
              <span className="font-semibold">
                accompagnement structuré de votre établissement
              </span>{" "}
              autour de l&apos;intelligence artificielle : pédagogie, prévention
              de la triche, formations des équipes et mise en place d&apos;espaces
              IA sécurisés pour les enseignants, les élèves et la vie scolaire.
            </p>

            {/* 1. Projet d'établissement */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-200">
                1. Intégrer l&apos;IA dans votre projet d&apos;établissement
              </h3>
              <p className="text-sm text-slate-200/80">
                Nous vous accompagnons pour inscrire l&apos;IA dans une{" "}
                <span className="font-semibold">
                  dynamique globale d&apos;établissement
                </span>{" "}
                : projet d&apos;établissement, plan numérique, axes pédagogiques,
                innovation.
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-200/80 space-y-1">
                <li>Clarifier les objectifs pédagogiques liés à l&apos;IA.</li>
                <li>
                  Identifier les niveaux, disciplines et équipes prioritaires.
                </li>
                <li>
                  Donner un cadre rassurant aux enseignants, aux élèves et aux
                  parents.
                </li>
              </ul>
            </div>

            {/* 2. Charte anti-triche */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-200">
                2. Charte IA & anti-triche
              </h3>
              <p className="text-sm text-slate-200/80">
                Co-construction d&apos;une{" "}
                <span className="font-semibold">
                  charte simple et opérationnelle
                </span>{" "}
                sur l&apos;usage de l&apos;IA :
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-200/80 space-y-1">
                <li>
                  Définir ce qui est autorisé ou interdit (DM, exposés, oraux…).
                </li>
                <li>
                  Sécuriser les évaluations écrites (brevet, bac blanc,
                  contrôles).
                </li>
                <li>
                  Aider les équipes à reconnaître une copie générée par IA et à
                  réagir de façon pédagogique.
                </li>
              </ul>
            </div>

            {/* 3. Formation des équipes */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-200">
                3. Formation des équipes pédagogiques
              </h3>
              <p className="text-sm text-slate-200/80">
                Des sessions de formation modulables pour :
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-200/80 space-y-1">
                <li>Enseignants (toutes disciplines et niveaux).</li>
                <li>
                  Équipe de direction, vie scolaire, professeurs documentalistes.
                </li>
                <li>
                  Référents numériques / coordinateurs de projets pédagogiques.
                </li>
              </ul>
              <p className="text-sm text-slate-200/80">
                Objectif : rendre l&apos;IA{" "}
                <span className="font-semibold">
                  utile, maîtrisée et éthique
                </span>{" "}
                dans le quotidien de l&apos;établissement.
              </p>
            </div>

            {/* 4. Espaces IA pédagogiques */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-200">
                4. Mise en place d&apos;espaces IA pédagogiques
              </h3>
              <p className="text-sm text-slate-200/80">
                Construction avec vos équipes de :
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-200/80 space-y-1">
                <li>Un espace IA élèves (révisions, remédiation, projets).</li>
                <li>
                  Un espace IA enseignants (préparation, mutualisation,
                  prompts).
                </li>
                <li>
                  Une bibliothèque de prompts adaptée à vos niveaux, matières et
                  profils d&apos;élèves (y compris adaptations DYS).
                </li>
              </ul>
            </div>

            {/* 5. Accompagnement 3 à 6 mois */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-200">
                5. Accompagnement sur 3 ou 6 mois
              </h3>
              <p className="text-sm text-slate-200/80">
                Un suivi régulier pour ancrer les usages :
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-200/80 space-y-1">
                <li>1 à 2 réunions de suivi par mois.</li>
                <li>Analyse des besoins et des retours des équipes.</li>
                <li>
                  Ajustement progressif des pratiques et des outils proposés aux
                  enseignants et aux élèves.
                </li>
              </ul>
            </div>

            {/* 6. Format des formations */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-200">
                6. Format des formations & modalités pratiques
              </h3>
              <p className="text-sm text-slate-200/80">
                Les formats peuvent être adaptés à votre réalité d&apos;établissement :
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-200/80 space-y-1">
                <li>
                  Demi-journées ou journées complètes en présentiel (sur place ou
                  à distance selon le contexte).
                </li>
                <li>
                  Sessions thématiques : découverte de l&apos;IA, prompts pour les
                  profs, sécurité / plagiat, usages élèves.
                </li>
                <li>
                  Ateliers pratiques par discipline (maths, français, langues,
                  enseignement scientifique…).
                </li>
              </ul>
            </div>

            {/* 7. Projet éducatif, social et solidaire */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-200">
                7. Un projet éducatif, social et solidaire
              </h3>
              <p className="text-sm text-slate-200/80">
                EleveAI n’est pas uniquement un outil pédagogique. C’est aussi un{" "}
                <span className="font-semibold">
                  projet réunionnais à impact social
                </span>{" "}
                qui vise à former et à intégrer des jeunes dans les métiers du
                numérique et de l&apos;intelligence artificielle éducative.
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-200/80 space-y-1">
                <li>
                  Impliquer progressivement des jeunes dans la programmation, la
                  création de contenus et le design pédagogique.
                </li>
                <li>
                  Développer des compétences locales en IA éducative à La Réunion.
                </li>
                <li>
                  Construire des partenariats avec les établissements qui le
                  souhaitent (ateliers, projets, découverte des métiers).
                </li>
              </ul>
              <p className="text-sm text-slate-200/80">
                EleveAI se positionne ainsi comme une structure à vocation{" "}
                <span className="font-semibold">
                  économique, sociale et solidaire
                </span>{" "}
                : une partie des revenus est réinvestie dans la pédagogie, la
                formation et l&apos;insertion professionnelle des jeunes sur le
                territoire.
              </p>
            </div>

            {/* 8. Simulation de coût avec plafond mensuel */}
            <div className="space-y-3 rounded-2xl border border-emerald-500/40 bg-slate-950/40 p-4 sm:p-5">
              <h3 className="text-lg font-semibold text-emerald-200">
                8. Simulation indicative pour votre établissement
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Cette simulation est{" "}
                <span className="font-semibold">indicative</span> et non
                contractuelle. Elle permet de visualiser un ordre de grandeur à
                partir d&apos;un coût par élève ou d&apos;un abonnement
                établissement + part variable. Vous pouvez également définir un{" "}
                <span className="font-semibold">
                  plafond mensuel de facturation IA
                </span>{" "}
                pour sécuriser votre budget, comme sur la plateforme OpenAI.
              </p>

              {/* Formulaire de paramètres */}
              <div className="grid gap-4 sm:grid-cols-4 text-sm">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-200">
                    Nombre d&apos;élèves
                  </label>
                  <input
                    type="number"
                    min={50}
                    className="w-full rounded-lg border border-slate-600 bg-slate-950/70 px-3 py-1.5 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                    value={nbEleves}
                    onChange={(e) =>
                      setNbEleves(Number(e.target.value) || 0)
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-200">
                    Nombre de professeurs
                  </label>
                  <input
                    type="number"
                    min={5}
                    className="w-full rounded-lg border border-slate-600 bg-slate-950/70 px-3 py-1.5 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                    value={nbProfs}
                    onChange={(e) =>
                      setNbProfs(Number(e.target.value) || 0)
                    }
                  />
                </div>

                <div className="space-y-1">
                  <span className="block text-xs font-medium text-slate-200">
                    Mode de tarification
                  </span>
                  <div className="flex flex-col gap-1">
                    <label className="inline-flex items-center gap-2 text-xs text-slate-200">
                      <input
                        type="radio"
                        name="modeTarif"
                        value="fixe"
                        checked={modeTarif === "fixe"}
                        onChange={() => setModeTarif("fixe")}
                      />
                      <span>Forfait fixe par élève (ex. 5 € / an)</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs text-slate-200">
                      <input
                        type="radio"
                        name="modeTarif"
                        value="mixte"
                        checked={modeTarif === "mixte"}
                        onChange={() => setModeTarif("mixte")}
                      />
                      <span>
                        Abonnement établissement + part variable (avance API)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-200">
                    Plafond IA mensuel (€)
                  </label>
                  <input
                    type="number"
                    min={50}
                    className="w-full rounded-lg border border-slate-600 bg-slate-950/70 px-3 py-1.5 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                    value={plafondMensuel}
                    onChange={(e) =>
                      setPlafondMensuel(Number(e.target.value) || 0)
                    }
                  />
                  <p className="text-[11px] text-slate-400">
                    Montant maximal que vous acceptez d&apos;investir par mois
                    en IA. La facturation ne dépassera jamais ce plafond.
                  </p>
                </div>
              </div>

              {/* Résultats de la simulation */}
              <div className="mt-3 grid gap-3 sm:grid-cols-2 text-sm">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-emerald-200 uppercase">
                    Consommation IA estimée (équivalent coût)
                  </p>
                  <p className="text-sm text-slate-100">
                    💶 Estimation :{" "}
                    <span className="font-semibold text-emerald-300">
                      {coutMensuelEstime.toFixed(0)} € / mois
                    </span>{" "}
                    (
                    <span className="font-semibold text-emerald-300">
                      {coutAnnuelEstime.toFixed(0)} € / an
                    </span>
                    )
                  </p>
                  <p className="text-xs text-slate-400">
                    Cette estimation correspond à un usage pédagogique régulier
                    des enseignants et des élèves.
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-emerald-200 uppercase">
                    Plafond & facturation réelle
                  </p>
                  <p className="text-sm text-slate-100">
                    🔐 Plafond IA choisi :{" "}
                    <span className="font-semibold text-emerald-300">
                      {plafondMensuel.toFixed(0)} € / mois
                    </span>
                    <br />
                    📌 Facturation simulée :{" "}
                    <span className="font-semibold text-emerald-300">
                      {coutMensuelFacture.toFixed(0)} € / mois
                    </span>{" "}
                    (
                    <span className="font-semibold text-emerald-300">
                      {coutAnnuelFacture.toFixed(0)} € / an
                    </span>
                    )
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Si la consommation estimée dépasse le plafond, vous restez
                    facturé au maximum au montant du plafond. EleveAI ajuste les
                    usages pour rester dans l&apos;enveloppe décidée.
                  </p>
                </div>
              </div>

              {/* Par élève / par prof */}
              <div className="mt-2 grid gap-3 sm:grid-cols-2 text-sm">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-emerald-200 uppercase">
                    Répartition par élève / professeur (estimation)
                  </p>
                  <p className="text-sm text-slate-100">
                    👨‍🎓 ≈{" "}
                    <span className="font-semibold text-emerald-300">
                      {Number.isFinite(coutParEleve)
                        ? coutParEleve.toFixed(2)
                        : "–"}{" "}
                      € / élève / an
                    </span>
                    <br />
                    👨‍🏫 ≈{" "}
                    <span className="font-semibold text-emerald-300">
                      {Number.isFinite(coutParProf)
                        ? coutParProf.toFixed(2)
                        : "–"}{" "}
                      € / prof / an
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* 9. Proposition de licences & tarifs EleveAI */}
            <div className="space-y-3 rounded-2xl border border-slate-700 bg-slate-950/50 p-4 sm:p-5">
              <h3 className="text-lg font-semibold text-emerald-200">
                9. Proposition de licences & tarifs EleveAI pour votre collège
              </h3>
              <p className="text-sm text-slate-200/80">
                Au-delà de la simulation, EleveAI propose des{" "}
                <span className="font-semibold">
                  licences simples et lisibles
                </span>{" "}
                pour un établissement scolaire. Les montants ci-dessous sont
                donnés à titre indicatif pour un collège classique et peuvent
                être ajustés en fonction de la taille de l&apos;établissement ou
                d&apos;un projet plus large.
              </p>

              <div className="grid gap-3 sm:grid-cols-3 text-sm">
                <div className="space-y-1 rounded-xl border border-emerald-500/50 bg-emerald-500/5 p-3">
                  <p className="text-[11px] font-semibold uppercase text-emerald-300">
                    Licence Pilote
                  </p>
                  <p className="text-slate-50 font-semibold">
                    1 490 € / an <span className="text-xs text-slate-300">(année 1)</span>
                  </p>
                  <p className="text-xs text-slate-300">
                    Puis 1 950 € / an à partir de la 2ᵉ année.
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-slate-200">
                    <li>• Tous les élèves et tous les personnels</li>
                    <li>• Tableau de bord direction (élèves / profs / admin)</li>
                    <li>• Accompagnement renforcé – établissement vitrine</li>
                  </ul>
                </div>

                <div className="space-y-1 rounded-xl border border-slate-700 bg-slate-950/80 p-3">
                  <p className="text-[11px] font-semibold uppercase text-slate-200">
                    Licence Collège Standard
                  </p>
                  <p className="text-slate-50 font-semibold">1 950 € / an</p>
                  <p className="text-xs text-slate-300">
                    Adapté à un collège de taille moyenne.
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-slate-200">
                    <li>• ~80 000 requêtes IA / mois</li>
                    <li>• Accès élèves, enseignants, vie scolaire, admin</li>
                    <li>• Suivi d&apos;usage et garde-fous Eduscol</li>
                  </ul>
                </div>

                <div className="space-y-1 rounded-xl border border-violet-500/50 bg-violet-500/10 p-3">
                  <p className="text-[11px] font-semibold uppercase text-violet-200">
                    Licence Collège Premium
                  </p>
                  <p className="text-slate-50 font-semibold">2 490 € / an</p>
                  <p className="text-xs text-slate-300">
                    Pour un usage large au cœur du projet d&apos;établissement.
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-slate-200">
                    <li>• Requêtes 150 000 requêtes IA (usage scolaire)</li>
                    <li>• Formations IA pour les équipes (1–2 / an)</li>
                    <li>• Accès élèves, enseignants, vie scolaire, admin</li>
                  </ul>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Ces montants peuvent être discutés dans le cadre de votre
                conseil d&apos;administration. La simulation ci-dessus vous aide
                à visualiser un ordre de grandeur par élève et par professeur ;
                les licences Pilote / Standard / Premium permettent ensuite de
                fixer un budget annuel clair et maîtrisé.
              </p>
            </div>

            {/* CTA contact */}
            <div className="pt-4 border-t border-slate-700 mt-4">
              <p className="text-sm text-slate-200/90 mb-2">
                Pour recevoir un devis détaillé ou échanger sur
                l&apos;adaptation de ce dispositif à votre établissement, vous
                pouvez répondre au mail qui vous a transmis ce lien ou écrire à :
              </p>
              <p className="text-sm font-semibold text-emerald-300">
                Frederic.Lacoste [at] ac-reunion.fr
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
