"use client";

type ToggleChipProps = {
  label: string;
  icon?: React.ReactNode;
  checked: boolean;
  onChange: (value: boolean) => void;
  hint?: string;
  tone?: "emerald" | "violet" | "sky";
};

export default function ToggleChip({
  label,
  icon,
  checked,
  onChange,
  hint,
  tone = "sky",
}: ToggleChipProps) {
  const toneClasses: Record<NonNullable<ToggleChipProps["tone"]>, string> = {
    emerald: checked
      ? "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200"
      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100",
    violet: checked
      ? "bg-violet-100 text-violet-800 border-violet-200 hover:bg-violet-200"
      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100",
    sky: checked
      ? "bg-sky-100 text-sky-800 border-sky-200 hover:bg-sky-200"
      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100",
  };

  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      title={hint}
      aria-pressed={checked}
      className={[
        "inline-flex items-center gap-2 px-3 py-1 rounded-full",
        "text-[11px] font-semibold border transition",
        "focus:outline-none focus:ring-2 focus:ring-sky-300",
        toneClasses[tone],
      ].join(" ")}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
      <span className="font-mono">{checked ? "ON" : "OFF"}</span>
    </button>
  );
}
