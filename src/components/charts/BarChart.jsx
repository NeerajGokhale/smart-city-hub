export default function BarChart({ data, height = 200 }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="w-full">
      <div className="flex items-end gap-4 sm:gap-6" style={{ height }}>
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
            <span className="text-sm font-display text-ink-hi">{d.value}</span>
            <div
              className="w-full max-w-[46px] rounded-t-lg transition-all duration-500"
              style={{
                height: (d.value / max) * 100 + "%",
                minHeight: d.value > 0 ? "6px" : "0px",
                background: "linear-gradient(180deg, " + d.color + ", " + d.color + "33)",
                boxShadow: "0 0 16px " + d.color + "55",
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 sm:gap-6 mt-2">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center text-xs text-ink-mid truncate">
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
}
