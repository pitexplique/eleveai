import { maths4eQuestionBank } from "@/lib/tutor-v4/questionBank/4e/maths/index";
import { maths3eQuestionBank } from "@/lib/tutor-v4/questionBank/3e/maths/index";
import { mathsTerminaleSpeQuestionBank } from "@/lib/tutor-v4/questionBank/terminale-spe/maths/index";
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// characters KaTeX has no glyph for in math mode -> render as "tofu" boxes
const BAD = /[«»œŒæ…“”‘’–—€£°²³]/;

function mathSegments(s: string): string[] {
  const segs: string[] = [];
  // display math first
  const tmp = s.replace(/\$\$([\s\S]*?)\$\$/g, (_, m) => {
    segs.push(m);
    return " ";
  });
  // then inline
  const re = /\$([^$]+)\$/g;
  let mt: RegExpExecArray | null;
  while ((mt = re.exec(tmp))) segs.push(mt[1]);
  return segs;
}

const hits = new Map<string, { id: string; field: string; seg: string }>();

function check(level: string, id: string, field: string, value: unknown) {
  if (typeof value !== "string" || !value.includes("$")) return;
  for (const seg of mathSegments(value)) {
    const m = seg.match(BAD);
    if (m) {
      const key = `${level}|${id}|${field}|${m[0]}`;
      if (!hits.has(key)) hits.set(key, { id: `${level} ${id}`, field, seg });
    }
  }
}

function checkGen(level: string, id: string, g: any) {
  check(level, id, "text", g.text);
  check(level, id, "explanation", g.explanation);
  g.choices?.forEach((c: string, i: number) => check(level, id, `choices[${i}]`, c));
}

function scan(level: string, bank: TutorBankItemV4[]) {
  for (const item of bank) {
    if (item.kind === "fixed") {
      check(level, item.id, "text", item.text);
      check(level, item.id, "explanation", item.explanation);
      check(level, item.id, "hint", (item as any).hint);
      item.choices?.forEach((c, i) => check(level, item.id, `choices[${i}]`, c));
    } else if (item.kind === "template") {
      check(level, item.id, "hint", (item as any).hint);
      for (let i = 0; i < 40; i++) {
        try {
          checkGen(level, item.id, item.generate());
        } catch {
          break;
        }
      }
    }
  }
}

scan("4e", maths4eQuestionBank as TutorBankItemV4[]);
scan("3e", maths3eQuestionBank as TutorBankItemV4[]);
scan("Tspe", mathsTerminaleSpeQuestionBank as TutorBankItemV4[]);

console.log(`Found ${hits.size} math segments with non-math glyphs.\n`);
for (const h of hits.values()) {
  console.log(`${h.id} :: ${h.field}`);
  console.log(`   $${h.seg.slice(0, 160)}$`);
}
