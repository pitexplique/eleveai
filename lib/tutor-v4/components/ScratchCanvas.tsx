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
  set_variable: "bg-red-500 text-white",
  change_variable: "bg-red-500 text-white",
  if: "bg-orange-600 text-white",
  ask: "bg-purple-600 text-white",
  pen: "bg-emerald-500 text-white",
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
    case "set_variable":
      return `mettre ${block.variable} à ${block.value}`;
    case "change_variable":
      return `ajouter ${block.value} à ${block.variable}`;
    case "if":
      return `si ${block.condition}`;
    case "ask":
      return `demander ${block.text ?? ""}`;
    case "pen":
      return block.text ?? "stylo en position d’écriture";
  }
}

function Block({ block, depth = 0 }: { block: ScratchBlockData; depth?: number }) {
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
    </div>
  );
}

export default function ScratchCanvas({ canvas }: Props) {
  if (canvas.kind !== "scratch") return null;

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {canvas.title ? (
        <div className="mb-3 text-center text-sm font-black text-slate-800">
          {canvas.title}
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