import type { MicroSkill, StudentStyle, TutorMode, TutorQuestion } from "@/lib/tutor/types";

type Variant = {
  text: string;
  format: "short" | "qcm";
  choices?: string[];
  expected: string[];
  hint?: string;
};

function qcmIfDys(style: StudentStyle, variant: Variant): Variant {
  if (style !== "dys" || variant.format === "qcm") return variant;
  return {
    ...variant,
    format: "qcm",
  };
}

function variantsForMicro(microId: string, style: StudentStyle): Variant[] {
  const dys = style === "dys";

  switch (microId) {
    case "decimal_compare":
      return [
        qcmIfDys(style, {
          text: "Quel nombre est le plus grand : 0,7 ou 0,65 ?",
          format: dys ? "qcm" : "short",
          choices: dys ? ["0,7", "0,65", "ils sont égaux"] : undefined,
          expected: ["0,7", "0.7"],
          hint: "Compare d'abord les dixièmes."
        }),
        qcmIfDys(style, {
          text: "Quel nombre est le plus petit : 0,4 ou 0,8 ?",
          format: dys ? "qcm" : "short",
          choices: dys ? ["0,4", "0,8", "ils sont égaux"] : undefined,
          expected: ["0,4", "0.4"],
          hint: "0,4 a moins de dixièmes."
        }),
      ];

    case "decimal_write":
      return [
        qcmIfDys(style, {
          text: "Écris en décimal : 7/10",
          format: dys ? "qcm" : "short",
          choices: dys ? ["0,7", "7,0", "0,07"] : undefined,
          expected: ["0,7", "0.7", "0,70", "0.70"],
          hint: "7 dixièmes = 0,7."
        }),
        qcmIfDys(style, {
          text: "Écris en décimal : 1/2",
          format: dys ? "qcm" : "short",
          choices: dys ? ["0,5", "0,2", "0,1"] : undefined,
          expected: ["0,5", "0.5", "2/4"],
          hint: "Une moitié = 0,5."
        }),
      ];

    case "fraction_read":
      return [
        qcmIfDys(style, {
          text: "Quelle fraction représente 1 part sur 4 parts égales ?",
          format: dys ? "qcm" : "short",
          choices: dys ? ["1/2", "1/4", "4/1"] : undefined,
          expected: ["1/4", "1 / 4", "0,25", "0.25"],
          hint: "Une part sur quatre."
        }),
        qcmIfDys(style, {
          text: "Quelle fraction représente la moitié ?",
          format: dys ? "qcm" : "short",
          choices: dys ? ["1/2", "1/3", "2/5"] : undefined,
          expected: ["1/2", "2/4", "0,5", "0.5"],
          hint: "La moitié = deux parts égales."
        }),
      ];

    case "fraction_compare":
      return [
        {
          text: "Compare 3/5 et 4/5 : lequel est le plus grand ?",
          format: "short",
          expected: ["4/5", "4 / 5", "4/5 est plus grand", "4/5 > 3/5"],
          hint: "Même dénominateur : compare les numérateurs."
        },
        {
          text: "Compare 1/4 et 1/2 : lequel est le plus grand ?",
          format: "short",
          expected: ["1/2", "1 / 2", "1/2 est plus grand", "1/2 > 1/4", "0,5", "0.5"],
          hint: "Une moitié est plus grande qu'un quart."
        },
      ];

    case "fraction_quantity":
      return [
        qcmIfDys(style, {
          text: "La moitié de 10, c'est combien ?",
          format: dys ? "qcm" : "short",
          choices: dys ? ["2", "5", "10"] : undefined,
          expected: ["5"],
          hint: "Partage 10 en 2 parts égales."
        }),
        qcmIfDys(style, {
          text: "Le quart de 8, c'est combien ?",
          format: dys ? "qcm" : "short",
          choices: dys ? ["2", "4", "8"] : undefined,
          expected: ["2"],
          hint: "Partage 8 en 4 parts égales."
        }),
      ];

    case "prop_table":
      return [
        {
          text: "Dans un tableau de proportionnalité, si 2 cahiers coûtent 4 €, combien coûtent 4 cahiers ?",
          format: "short",
          expected: ["8", "8€", "8 €"],
          hint: "Si on double le nombre de cahiers, on double le prix."
        }
      ];

    case "prop_unit":
      return [
        {
          text: "3 bonbons coûtent 6 €. Combien coûte 1 bonbon ?",
          format: "short",
          expected: ["2", "2€", "2 €"],
          hint: "Passe d'abord à l'unité."
        }
      ];

    case "prop_direct":
      return [
        {
          text: "4 cahiers coûtent 8 €. Combien coûtent 2 cahiers ?",
          format: "short",
          expected: ["4", "4€", "4 €"],
          hint: "Si on divise par 2 le nombre de cahiers, on divise aussi le prix par 2."
        }
      ];

    case "perim_square":
      return [
        {
          text: "Quel est le périmètre d’un carré de côté 5 cm ?",
          format: "short",
          expected: ["20", "20cm", "20 cm"],
          hint: "Le périmètre d’un carré = 4 × côté."
        }
      ];

    case "perim_rectangle":
      return [
        {
          text: "Un rectangle mesure 3 cm sur 7 cm. Quel est son périmètre ?",
          format: "short",
          expected: ["20", "20cm", "20 cm"],
          hint: "2 × longueur + 2 × largeur."
        }
      ];

    case "area_rectangle":
      return [
        {
          text: "Quelle est l’aire d’un rectangle de 4 cm sur 3 cm ?",
          format: "short",
          expected: ["12", "12 cm²", "12 cm2", "12cm²", "12cm2"],
          hint: "Aire = longueur × largeur."
        }
      ];

    case "area_square":
      return [
        {
          text: "Quelle est l’aire d’un carré de côté 5 cm ?",
          format: "short",
          expected: ["25", "25 cm²", "25 cm2", "25cm²", "25cm2"],
          hint: "Aire du carré = côté × côté."
        }
      ];

    case "angle_right":
      return [
        qcmIfDys(style, {
          text: "Un angle droit mesure combien de degrés ?",
          format: dys ? "qcm" : "short",
          choices: dys ? ["45", "90", "180"] : undefined,
          expected: ["90", "90°"],
          hint: "L’angle droit correspond au coin d’un carré."
        })
      ];

    case "angle_compare":
      return [
        qcmIfDys(style, {
          text: "Quel angle est le plus grand : 30° ou 80° ?",
          format: dys ? "qcm" : "short",
          choices: dys ? ["30°", "80°", "ils sont égaux"] : undefined,
          expected: ["80", "80°"],
          hint: "Compare simplement les nombres."
        })
      ];

    default:
      return [
        {
          text: `Question courte sur ${microId}.`,
          format: "short",
          expected: ["ok"],
          hint: "Décris une première étape."
        }
      ];
  }
}

export function buildQuestion(args: {
  micro: MicroSkill;
  notionId: string;
  style: StudentStyle;
  mode: TutorMode;
  recentQuestionIds: string[];
}): TutorQuestion {
  const variants = variantsForMicro(args.micro.id, args.style);

  let selectedIndex = 0;
  for (let i = 0; i < variants.length; i++) {
    const candidateId = `${args.micro.id}-${i}`;
    if (!args.recentQuestionIds.includes(candidateId)) {
      selectedIndex = i;
      break;
    }
  }

  const selected = variants[selectedIndex];
  const hint = args.mode === "coaching" ? selected.hint : undefined;

  return {
    id: `${args.micro.id}-${selectedIndex}`,
    notionId: args.notionId,
    microId: args.micro.id,
    text: selected.text,
    format: selected.format,
    choices: selected.choices,
    expected: selected.expected,
    hint,
  };
}