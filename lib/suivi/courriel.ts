// Le compte rendu hebdomadaire envoyé au parent (06/11/2026). Fonction pure : elle
// compose le courriel à partir des rapports, sans base ni envoi, donc elle se teste.
// ⛔ Aucune offre ni prix dedans : ce courriel rend compte, il ne vend pas.
import type { CompteSemaine, RapportEnfant } from "./types";

const SITE = "https://www.eleveai.fr";

function echap(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const pluriel = (n: number, mot: string) => `${n} ${mot}${n > 1 ? "s" : ""}`;

function resumeSemaine(s: CompteSemaine): string {
  const morceaux = [pluriel(s.jours, "jour"), pluriel(s.seances, "séance"), pluriel(s.questions, "question")];
  if (s.minutes) morceaux.push(pluriel(s.minutes, "minute"));
  const reussite = s.questions ? `, ${Math.round((s.justes / s.questions) * 100)} % de réponses justes` : "";
  return `${morceaux.join(", ")}${reussite}`;
}

function comparaison(r: RapportEnfant): string {
  const ecart = r.semaine.questions - r.semainePrecedente.questions;
  if (!r.semainePrecedente.questions || ecart === 0) return "";
  return ecart > 0
    ? `C'est ${pluriel(ecart, "question")} de plus que la semaine d'avant.`
    : `C'est ${pluriel(-ecart, "question")} de moins que la semaine d'avant.`;
}

const justes = (n: number) => (n > 1 ? "justes" : "juste");

function blocHtml(r: RapportEnfant): string {
  const titre = `${echap(r.prenom)}${r.classe ? `, ${echap(r.classe)}` : ""}`;
  const actif = r.semaine.seances > 0;
  return `<h2 style="font-size:20px;margin:24px 0 8px">${titre}</h2>
${r.alertes.map((a) => `<p style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:10px 12px;margin:8px 0;font-weight:700;color:#78350f">${echap(a)}</p>`).join("\n")}
<p style="margin:8px 0">${actif ? `<strong>Cette semaine :</strong> ${echap(resumeSemaine(r.semaine))}. ${echap(comparaison(r))}` : `<strong>Cette semaine :</strong> aucune séance au coach, en étant connecté.`}</p>
${r.aRevoir.length ? `<p style="margin:16px 0 4px;font-weight:700">À revoir</p>
<ul style="margin:0;padding-left:20px">${r.aRevoir
    .map(
      (m) =>
        `<li style="margin:4px 0">${echap(m.libelle)} (${m.justes} ${justes(m.justes)} sur ${m.reponses})${m.href ? ` : <a href="${echap(SITE + m.href)}" style="color:#0369a1">le retravailler</a>` : ""}</li>`,
    )
    .join("")}</ul>` : ""}
${r.acquises.length ? `<p style="margin:16px 0 4px;font-weight:700">Acquis récemment${r.nbAcquises > r.acquises.length ? ` (${r.nbAcquises} points en tout)` : ""}</p>
<ul style="margin:0;padding-left:20px">${r.acquises.map((m) => `<li style="margin:4px 0">${echap(m.libelle)}</li>`).join("")}</ul>` : ""}`;
}

function blocTexte(r: RapportEnfant): string {
  const lignes = [`${r.prenom}${r.classe ? `, ${r.classe}` : ""}`, ...r.alertes];
  lignes.push(
    r.semaine.seances
      ? `Cette semaine : ${resumeSemaine(r.semaine)}. ${comparaison(r)}`.trim()
      : "Cette semaine : aucune séance au coach, en étant connecté.",
  );
  if (r.aRevoir.length) {
    lignes.push("À revoir :");
    for (const m of r.aRevoir) {
      lignes.push(`- ${m.libelle} (${m.justes} ${justes(m.justes)} sur ${m.reponses})${m.href ? ` : ${SITE}${m.href}` : ""}`);
    }
  }
  if (r.acquises.length) {
    lignes.push("Acquis récemment :");
    for (const m of r.acquises) lignes.push(`- ${m.libelle}`);
  }
  return lignes.join("\n");
}

export function composerCompteRendu(rapports: RapportEnfant[], lienArret: string) {
  const [premier] = rapports;
  const sujet =
    rapports.length === 1
      ? premier.semaine.seances
        ? `La semaine de ${premier.prenom} : ${pluriel(premier.semaine.jours, "jour")} de travail`
        : `La semaine de ${premier.prenom} : pas de travail au coach`
      : `La semaine de ${rapports.map((r) => r.prenom).join(", ").replace(/, ([^,]*)$/, " et $1")}`;

  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;line-height:1.6;font-size:15px">
<p style="margin:0">Bonjour,</p>
<p style="margin:8px 0">Voici le compte rendu de la semaine.</p>
${rapports.map(blocHtml).join("\n")}
<p style="margin:24px 0"><a href="${SITE}/suivi" style="display:inline-block;background:#0369a1;color:#fff;text-decoration:none;font-weight:700;padding:10px 20px;border-radius:9999px">Voir tout le suivi</a></p>
<hr style="margin:24px 0;border:none;border-top:1px solid #e2e8f0"/>
<p style="font-size:12px;color:#64748b;line-height:1.5">Seul le travail fait en étant connecté apparaît ici. Vous recevez ce courriel car vous avez pris le suivi famille d'EleveAI. <a href="${echap(lienArret)}" style="color:#0369a1">Ne plus recevoir ce compte rendu</a></p>
</div>`;

  const texte = `Bonjour,

Voici le compte rendu de la semaine.

${rapports.map(blocTexte).join("\n\n")}

Voir tout le suivi : ${SITE}/suivi

Seul le travail fait en étant connecté apparaît ici.
Ne plus recevoir ce compte rendu : ${lienArret}`;

  return { sujet, html, texte };
}
