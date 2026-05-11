// lib/tutor-v4/components/ScratchCanvas.tsx
"use client";

import type { ScratchCanvasData, ScratchBlockData } from "@/lib/tutor-v4/types";

type Props = {
  canvas: ScratchCanvasData;
};

const colors: Record<string, string> = {
  event: "bg-yellow-400 text-slate-900",
  move: "bg-blue-500 text-white",
  turn: "bg-blue-500 text-white",
  repeat: "bg-orange-500 text-white",
  say: "bg-purple-500 text-white",
  ask: "bg-purple-600 text-white",
  answer: "bg-sky-500 text-white",
  set_variable: "bg-red-500 text-white",
  change_variable: "bg-red-500 text-white",
  operator: "bg-lime-500 text-slate-900",
  if: "bg-orange-600 text-white",
  if_else: "bg-orange-600 text-white",
  pen: "bg-emerald-500 text-white",
  wait: "bg-purple-400 text-white",
};

function label(block: ScratchBlockData) {
  switch (block.type) {
    case "event":
      return block.text ?? "🟩 quand drapeau vert cliqué";

    case "move":
      return `avancer de ${block.value}`;

    case "turn":
      return `tourner de ${block.value}°`;

    case "repeat":
      return `répéter ${block.times} fois`;

    case "say":
      return `dire ${block.text ?? ""}`;

    case "ask":
      return `demander ${block.text ?? ""} et attendre`;

    case "answer":
      return "réponse";

    case "set_variable":
      return `mettre ${block.variable} à ${block.value}`;

    case "change_variable":
      return `ajouter ${block.value} à ${block.variable}`;

    case "operator":
      return block.text ?? `${block.left ?? ""} ${block.operator ?? ""} ${block.right ?? ""}`;

    case "if":
      return `si ${block.condition}`;

    case "if_else":
      return `si ${block.condition} sinon`;

    case "pen":
      return block.text ?? "stylo en position d’écriture";

    case "wait":
      return `attendre ${block.value ?? 1} seconde(s)`;

    default:
      return "bloc Scratch";
  }
}

function Block({
  block,
  depth = 0,
}: {
  block: ScratchBlockData;
  depth?: number;
}) {
  return (
    <div className="space-y-1" style={{ marginLeft: depth * 14 }}>
      <div
        className={[
          "w-fit rounded-xl px-3 py-2 text-sm font-black shadow-sm",
          colors[block.type] ?? "bg-slate-500 text-white",
        ].join(" ")}
      >
        {label(block)}
      </div>

      {block.children?.length ? (
        <div className="border-l-4 border-slate-300 pl-2">
          {block.children.map((child, i) => (
            <Block key={i} block={child} depth={depth + 1} />
          ))}
        </div>
      ) : null}

      {block.elseChildren?.length ? (
        <div className="ml-4 space-y-1 border-l-4 border-orange-300 pl-2">
          <div className="w-fit rounded-xl bg-orange-300 px-3 py-1 text-xs font-black text-slate-900">
            sinon
          </div>
          {block.elseChildren.map((child, i) => (
            <Block key={i} block={child} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ScratchCanvas({ canvas }: Props) {
  if (canvas.kind !== "scratch") return null;

  return (
    <div className="mx-auto w-full max-w-[380px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {canvas.title ? (
        <div className="mb-3 text-center text-sm font-black text-slate-800">
          {canvas.title}
        </div>
      ) : null}

      {canvas.description ? (
        <div className="mb-3 rounded-xl bg-slate-50 p-2 text-center text-xs font-semibold text-slate-600">
          {canvas.description}
        </div>
      ) : null}

      <div className="space-y-2">
        {canvas.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </div>
  );
}