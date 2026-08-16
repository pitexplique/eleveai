
import { loadKnowledgeCpMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeCpMaths";
import { loadKnowledgeCe1Maths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeCe1Maths";
import { loadKnowledgeCe2Maths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeCe2Maths";
import { loadKnowledgeCm1Maths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeCm1Maths";
import { loadKnowledgeCm2Maths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeCm2Maths";
import { loadKnowledge6eMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledge6eMaths";
import { loadKnowledge5eMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledge5eMaths";
import { loadKnowledge4eMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledge4eMaths";
import { loadKnowledge3eMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledge3eMaths";
import { loadKnowledgeSecondeMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeSecondeMaths";
import { loadKnowledgePremiereMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgePremiereMaths";
import { loadKnowledgeStmgMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeStmgMaths";
import { loadKnowledgePremiereSpeMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgePremiereSpeMaths";
import { loadKnowledgeTerminaleSpeMaths} from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeTerminaleSpeMaths";
import { loadKnowledgeAdulteMaths } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeAdulteMaths";
import { loadKnowledgeCpFrancais } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeCpFrancais";
import { loadKnowledgeA1English } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeA1English";
import { loadKnowledgeA2English } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeA2English";
import { loadKnowledgeB1English } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeB1English";
import { loadKnowledgeB2English } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeB2English";
import { loadKnowledgeEco4e } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeEco4e";
import { loadKnowledgeA1Espagnol } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeA1Espagnol";
import { loadKnowledgeA2Espagnol } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeA2Espagnol";
import { loadKnowledgeB1Espagnol } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeB1Espagnol";
import { loadKnowledgeB2Espagnol } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeB2Espagnol";
import { loadKnowledgeCe1Francais } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeCe1Francais";
import { loadKnowledgeCe2Francais } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeCe2Francais";
import { loadKnowledgeCm1Francais } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeCm1Francais";
import { loadKnowledgeCm2Francais } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeCm2Francais";
import { loadKnowledge6eFrancais } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledge6eFrancais";
import { loadKnowledge5eFrancais } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledge5eFrancais";
import { loadKnowledge4eFrancais } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledge4eFrancais";
import { loadKnowledge3eFrancais } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledge3eFrancais";
import { loadKnowledgeSecondeFrancais } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeSecondeFrancais";
import { loadKnowledgeA1Ia } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeA1Ia";
import { loadKnowledgeA2Ia } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeA2Ia";
import { loadKnowledgeB1Ia } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeB1Ia";
import { loadKnowledgeB2Ia } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeB2Ia";
import { loadKnowledgeC1Ia } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgeC1Ia";
import { loadKnowledgePixCollegeIa } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgePixCollegeIa";
import { loadKnowledgePixLyceeIa } from "@/lib/tutor-v4/knowledge/loaders/loadKnowledgePixLyceeIa";

import type { KnowledgePack } from "@/lib/tutor-v4/types";

export async function loadKnowledgeV4(
  classe: string,
  matiere: string
): Promise<KnowledgePack> {

  if (classe === "cp" && matiere === "maths") {
    return loadKnowledgeCpMaths() as KnowledgePack;
  }

  if (classe === "ce1" && matiere === "maths") {
    return loadKnowledgeCe1Maths() as KnowledgePack;
  }

  if (classe === "ce2" && matiere === "maths") {
    return loadKnowledgeCe2Maths() as KnowledgePack;
  }

  if (classe === "cm1" && matiere === "maths") {
    return loadKnowledgeCm1Maths() as KnowledgePack;
  }
    if (classe === "cm2" && matiere === "maths") {
    return loadKnowledgeCm2Maths() as KnowledgePack;
  }
  if (classe === "6e" && matiere === "maths") {
    return loadKnowledge6eMaths() as KnowledgePack;
  }

  if (classe === "5e" && matiere === "maths") {
    return loadKnowledge5eMaths() as KnowledgePack;
  }

  if (classe === "4e" && matiere === "maths") {
    return loadKnowledge4eMaths() as KnowledgePack;
  }

  if (classe === "3e" && matiere === "maths") {
    return loadKnowledge3eMaths() as KnowledgePack;
  }

  if (classe === "seconde" && matiere === "maths") {
    return loadKnowledgeSecondeMaths() as KnowledgePack;
  }
  if (classe === "seconde" && matiere === "francais") {
    return loadKnowledgeSecondeFrancais() as KnowledgePack;
  }
  if (classe === "premiere" && matiere === "maths") {
    return loadKnowledgePremiereMaths() as KnowledgePack;
  }
  if (classe === "premiere-spe" && matiere === "maths") {
    return loadKnowledgePremiereSpeMaths() as KnowledgePack;
  }
  if (classe === "stmg" && matiere === "maths") {
    return loadKnowledgeStmgMaths() as KnowledgePack;
  }
    if (classe === "terminale-spe" && matiere === "maths") {
    return loadKnowledgeTerminaleSpeMaths() as KnowledgePack;
  }

  if (classe === "adulte" && matiere === "maths") {
    return loadKnowledgeAdulteMaths() as KnowledgePack;
  }

  if (classe === "cp"  && matiere === "francais") return loadKnowledgeCpFrancais()  as KnowledgePack;
  if (classe === "ce1" && matiere === "francais") return loadKnowledgeCe1Francais() as KnowledgePack;
  if (classe === "ce2" && matiere === "francais") return loadKnowledgeCe2Francais() as KnowledgePack;
  if (classe === "cm1" && matiere === "francais") return loadKnowledgeCm1Francais() as KnowledgePack;
  if (classe === "cm2" && matiere === "francais") return loadKnowledgeCm2Francais() as KnowledgePack;
  if (classe === "6e" && matiere === "francais") return loadKnowledge6eFrancais() as KnowledgePack;
  if (classe === "5e" && matiere === "francais") return loadKnowledge5eFrancais() as KnowledgePack;
  if (classe === "4e" && matiere === "francais") return loadKnowledge4eFrancais() as KnowledgePack;
  if (classe === "3e" && matiere === "francais") return loadKnowledge3eFrancais() as KnowledgePack;

  if (classe === "a1" && matiere === "english-maths") return loadKnowledgeA1English() as KnowledgePack;
  if (classe === "a2" && matiere === "english-maths") return loadKnowledgeA2English() as KnowledgePack;
  if (classe === "b1" && matiere === "english-maths") return loadKnowledgeB1English() as KnowledgePack;
  if (classe === "b2" && matiere === "english-maths") return loadKnowledgeB2English() as KnowledgePack;

  if (classe === "eco-college" && matiere === "economie") return loadKnowledgeEco4e() as KnowledgePack;

  if (classe === "a1" && matiere === "espagnol") return loadKnowledgeA1Espagnol() as KnowledgePack;
  if (classe === "a2" && matiere === "espagnol") return loadKnowledgeA2Espagnol() as KnowledgePack;
  if (classe === "b1" && matiere === "espagnol") return loadKnowledgeB1Espagnol() as KnowledgePack;
  if (classe === "b2" && matiere === "espagnol") return loadKnowledgeB2Espagnol() as KnowledgePack;

  if (classe === "a1" && matiere === "ia") return loadKnowledgeA1Ia() as KnowledgePack;
  if (classe === "a2" && matiere === "ia") return loadKnowledgeA2Ia() as KnowledgePack;
  if (classe === "b1" && matiere === "ia") return loadKnowledgeB1Ia() as KnowledgePack;
  if (classe === "b2" && matiere === "ia") return loadKnowledgeB2Ia() as KnowledgePack;
  if (classe === "c1" && matiere === "ia") return loadKnowledgeC1Ia() as KnowledgePack;

  if (classe === "pix-college" && matiere === "ia") return loadKnowledgePixCollegeIa() as KnowledgePack;
  if (classe === "pix-lycee" && matiere === "ia") return loadKnowledgePixLyceeIa() as KnowledgePack;

  throw new Error(`Knowledge V4 introuvable pour ${classe}/${matiere}`);
}
