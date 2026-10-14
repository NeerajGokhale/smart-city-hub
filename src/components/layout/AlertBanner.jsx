import { useMemo, useState } from "react";
import Icon from "../icons/Icon.jsx";
import { Pill } from "../ui/Primitives.jsx";
import { useData } from "../../context/DataContext.jsx";
import { SEVERITY_CFG } from "../../data/constants";

export default function AlertBanner() {
  const { alerts } = useData();
  const [dismissed, setDismissed] = useState([]);
  const active = useMemo(
    () =>
      alerts
        .filter((a) => a.active && !dismissed.includes(a.id))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [alerts, dismissed]
  );
  const [idx, setIdx] = useState(0);
  const safeIdx = active.length ? idx % active.length : 0;

  if (active.length === 0) return null;
  const a = active[safeIdx];
  const cfg = SEVERITY_CFG[a.severity];

  return (
    <div className={"sticky top-16 z-[90] w-full glass-strong border-b border-white/5 " + (a.severity === "Critical" ? "animate-criticalPulse" : "")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3">
        <div
          className={"w-7 h-7 rounded-lg flex items-center justify-center shrink-0 " + (a.severity === "Critical" ? "animate-pulseDot" : "")}
          style={{ color: cfg.color, background: cfg.bg }}
        >
          <Icon name={a.severity === "Critical" ? "siren" : "alert"} size={15} />
        </div>
        <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
          <Pill color={cfg.color}>{cfg.label}</Pill>
          <p className="text-sm text-ink-hi truncate">
            <span className="font-medium">{a.title}</span>
            <span className="text-ink-mid hidden sm:inline"> — {a.message}</span>
          </p>
        </div>
        {active.length > 1 && (
          <div className="hidden sm:flex items-center gap-1 shrink-0 text-xs text-ink-lo">
            {active.map((_, i) => (
              <span key={i} className={"w-1.5 h-1.5 rounded-full " + (i === safeIdx ? "bg-cyan" : "bg-white/15")}></span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-1 shrink-0">
          {active.length > 1 && (
            <button onClick={() => setIdx((safeIdx + 1) % active.length)} className="p-1.5 rounded-lg hover:bg-white/10 text-ink-mid">
              <Icon name="chevron" size={15} />
            </button>
          )}
          <button onClick={() => setDismissed((prev) => [...prev, a.id])} className="p-1.5 rounded-lg hover:bg-white/10 text-ink-mid">
            <Icon name="x" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
