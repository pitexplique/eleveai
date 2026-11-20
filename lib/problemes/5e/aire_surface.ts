// Énigmes à projeter — 5e, notion aire_surface (aire du triangle, du
// parallélogramme, du disque, figures composées). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const etiq = (x: number, y: number, t: string, c: string = C.craie, taille = 24) =>
  `<text x="${x}" y="${y}" fill="${c}" font-size="${taille}" text-anchor="middle">${t}</text>`;

// Voile triangulaire : 50 px par m, base 4 m, hauteur (le mât) 6 m.
const voile = () => `<svg viewBox="0 0 480 420" role="img" aria-label="La voile triangulaire d'un bateau : base 4 m, hauteur 6 m">
  <path d="M160 25 L160 340" stroke="${C.craie}" stroke-width="5"/>
  <path d="M165 40 L365 340 L165 340 Z" fill="${C.bleu}" fill-opacity=".2" stroke="${C.bleu}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M100 350 L420 350 L380 395 L140 395 Z" fill="${C.jaune}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>
  ${etiq(265, 335, "4 m", C.craie)}
  ${etiq(120, 200, "6 m", C.craie)}
  <path d="M165 320 L185 320 L185 340" stroke="${C.craie}" stroke-width="2" fill="none"/>
  ${etiq(390, 120, "aire : ?", C.rose, 28)}
  </svg>`;

// Parcelle : 10 px par m, base 30 m, hauteur 12 m.
const parcelle = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une parcelle en parallélogramme : base 30 m, hauteur 12 m">
  <path d="M60 300 L360 300 L420 180 L120 180 Z" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M120 180 L120 300" stroke="${C.rose}" stroke-width="3" stroke-dasharray="7 6"/>
  <path d="M120 285 L135 285 L135 300" stroke="${C.rose}" stroke-width="2" fill="none"/>
  ${etiq(210, 330, "30 m")}${etiq(155, 248, "12 m", C.rose)}
  ${etiq(240, 390, "aire : ?", C.rose, 28)}
  </svg>`;

// Pizza : rayon 15 cm, 8 px par cm.
const pizza = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une pizza ronde de 15 cm de rayon">
  <circle cx="240" cy="200" r="120" fill="${C.jaune}" fill-opacity=".3" stroke="${C.jaune}" stroke-width="6"/>
  <circle cx="200" cy="150" r="14" fill="${C.rose}" fill-opacity=".6"/><circle cx="290" cy="170" r="14" fill="${C.rose}" fill-opacity=".6"/>
  <circle cx="230" cy="260" r="14" fill="${C.rose}" fill-opacity=".6"/><circle cx="170" cy="220" r="14" fill="${C.rose}" fill-opacity=".6"/>
  <path d="M240 200 L360 200" stroke="${C.craie}" stroke-width="4"/><circle cx="240" cy="200" r="5" fill="${C.craie}"/>
  ${etiq(300, 190, "15 cm")}
  ${etiq(240, 375, "π ≈ 3,14 · aire : ?", C.rose, 26)}
  </svg>`;

// Pignon : 35 px par m. Carré de 6 m, triangle de hauteur 4 m.
const pignon = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Le mur de pignon d'une maison : un carré de 6 m surmonté d'un triangle de 4 m de haut">
  <path d="M135 190 L345 190 L345 400 L135 400 Z" fill="${C.bleu}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4"/>
  <path d="M135 190 L240 50 L345 190" fill="${C.rose}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M240 50 L240 190" stroke="${C.rose}" stroke-width="3" stroke-dasharray="7 6"/>
  <rect x="210" y="320" width="60" height="80" fill="none" stroke="${C.pale}" stroke-width="3"/>
  ${etiq(240, 230, "6 m")}${etiq(385, 300, "6 m")}${etiq(270, 130, "4 m", C.rose)}
  ${etiq(415, 120, "à peindre :", C.craie, 22)}${etiq(415, 150, "? m²", C.craie, 22)}
  </svg>`;

// 35 px par cm : base 8 cm (280), côté 5 cm (175), hauteur 4 cm (140).
const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un parallélogramme : côtés 8 cm et 5 cm, hauteur 4 cm">
  <path d="M50 320 L330 320 L435 180 L155 180 Z" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M155 180 L155 320" stroke="${C.rose}" stroke-width="3" stroke-dasharray="7 6"/>
  <path d="M155 305 L170 305 L170 320" stroke="${C.rose}" stroke-width="2" fill="none"/>
  ${etiq(190, 350, "8 cm")}${etiq(80, 245, "5 cm", C.bleu)}${etiq(185, 255, "4 cm", C.rose)}
  ${etiq(240, 100, "« 8 × 5 = 40 cm² »", C.rose, 30)}
  </svg>`;

// Pizzas : 6 px par cm. Deux de 20 cm de diamètre, une de 30 cm.
const pizzas = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux pizzas de 20 cm de diamètre et une pizza de 30 cm de diamètre">
  <circle cx="95" cy="140" r="60" fill="${C.jaune}" fill-opacity=".3" stroke="${C.jaune}" stroke-width="5"/>
  <circle cx="95" cy="290" r="60" fill="${C.jaune}" fill-opacity=".3" stroke="${C.jaune}" stroke-width="5"/>
  ${etiq(95, 146, "20 cm")}${etiq(95, 296, "20 cm")}
  <text x="190" y="225" fill="${C.craie}" font-size="40" text-anchor="middle">ou</text>
  <circle cx="340" cy="215" r="90" fill="${C.rose}" fill-opacity=".2" stroke="${C.rose}" stroke-width="5"/>
  <path d="M250 215 L430 215" stroke="${C.craie}" stroke-width="3"/>
  ${etiq(340, 205, "30 cm")}
  ${etiq(240, 395, "diamètres, au bon rapport", C.pale, 20)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "aire_surface",
  titre: "Énigmes sur les aires",
  description: "Aires en 5e : voile triangulaire, parcelle en parallélogramme, aire d'une pizza, mur de pignon à peindre, piège du parallélogramme, deux petites pizzas ou une grande. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · Sur le bateau",
      titre: "La voile triangulaire",
      question: `La voile d'un bateau est un triangle.<br>Sa base mesure <b>4 m</b> et sa hauteur <b>6 m</b>.<br><br><b>Quelle est son aire ?</b>`,
      reponse: `Aire d'un triangle : base × hauteur ÷ 2.<br>4 × 6 ÷ 2 = <span class="big">12 m²</span>.`,
      consigne: "Quelle est l'aire de la voile, en m² ?",
      verification: { type: "courte", attendus: ["12"], unite: "m²" },
      dessin: voile(),
    },
    {
      tag: "Énigme 2 · Le terrain",
      titre: "La parcelle",
      question: `Une parcelle a la forme d'un parallélogramme.<br>Sa base mesure <b>30 m</b> et sa hauteur <b>12 m</b>.<br><br><b>Quelle est son aire ?</b>`,
      reponse: `Aire d'un parallélogramme : base × hauteur.<br>30 × 12 = <span class="big">360 m²</span>.`,
      consigne: "Quelle est l'aire de la parcelle, en m² ?",
      verification: { type: "courte", attendus: ["360"], unite: "m²" },
      dessin: parcelle(),
    },
    {
      tag: "Énigme 3 · À la pizzeria",
      titre: "L'aire de la pizza",
      question: `Une pizza ronde a un <b>rayon de 15 cm</b>.<br><br><b>Quelle est son aire</b>, à peu près ? (On prend π ≈ 3,14.)`,
      reponse: `Aire d'un disque : π × rayon × rayon.<br>3,14 × 15 × 15 = 3,14 × 225 = 706,5. Environ <span class="big">707 cm²</span>.`,
      consigne: "Quelle est l'aire de la pizza, à peu près ?",
      verification: { type: "qcm", choix: ["≈ 94 cm²", "≈ 471 cm²", "≈ 707 cm²"], bonne: 2 },
      dessin: pizza(),
    },
    {
      tag: "Énigme 4 · Les travaux",
      titre: "Le mur à peindre",
      question: `Le mur du pignon d'une maison est un <b>carré de 6 m</b> de côté, surmonté d'un <b>triangle</b> de <b>4 m</b> de haut.<br><br><b>Quelle est l'aire du mur ?</b> (On oublie la porte.)`,
      reponse: `Carré : 6 × 6 = 36 m². Triangle : 6 × 4 ÷ 2 = 12 m².<br>36 + 12 = <span class="big">48 m²</span>.`,
      consigne: "Quelle est l'aire du mur, en m² ?",
      verification: { type: "courte", attendus: ["48"], unite: "m²" },
      dessin: pignon(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le calcul de Lou",
      sorte: "piege",
      question: `Un parallélogramme a des côtés de <b>8 cm</b> et <b>5 cm</b>. Sa hauteur sur le côté de 8 cm est <b>4 cm</b>.<br>Lou calcule : 8 × 5 = 40 cm².<br><br><b>A-t-elle raison ?</b> Quelle est l'aire ?`,
      reponse: `Non ! On multiplie la base par la <b>hauteur</b>, pas par l'autre côté.<br>8 × 4 = <span class="big">32 cm²</span>.`,
      consigne: "Quelle est l'aire du parallélogramme, en cm² ?",
      verification: { type: "courte", attendus: ["32"], unite: "cm²" },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Deux petites ou une grande ?",
      sorte: "defi",
      question: `Au même prix, on a le choix : <b>deux pizzas de 20 cm</b> de diamètre, ou <b>une pizza de 30 cm</b>.<br><br><b>Où y a-t-il le plus de pizza ?</b>`,
      reponse: `Petites : rayon 10 cm, 2 × 3,14 × 10 × 10 = 628 cm². Grande : rayon 15 cm, 3,14 × 15 × 15 = 706,5 cm².<br>C'est <span class="big">la grande</span> qui a le plus de pizza !`,
      consigne: "Où y a-t-il le plus de pizza ?",
      verification: { type: "qcm", choix: ["La grande", "Les deux petites", "C'est pareil"], bonne: 0 },
      dessin: pizzas(),
    },
  ],
};

export default problemes;
