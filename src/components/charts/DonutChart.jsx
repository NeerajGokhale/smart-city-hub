export default function DonutChart({ data, size = 200 }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = size / 2 - 18;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const segments = data.reduce((acc, d) => {
    const prevEnd = acc.length ? acc[acc.length - 1].end : 0;
    const len = (d.value / total) * circumference;
    acc.push({ ...d, len, start: prevEnd, end: prevEnd + len });
    return acc;
  }, []);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={"0 0 " + size + " " + size}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="20" />
        {segments.map((d, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={d.color}
            strokeWidth="20"
            strokeDasharray={d.len + " " + (circumference - d.len)}
            strokeDashoffset={-d.start}
            transform={"rotate(-90 " + cx + " " + cy + ")"}
            strokeLinecap="butt"
            style={{ filter: "drop-shadow(0 0 6px " + d.color + "66)", transition: "stroke-dashoffset .6s ease" }}
          />
        ))}
        <text x={cx} y={cy - 2} textAnchor="middle" fontSize="26" fontFamily="Space Grotesk" fill="#eaf1fb" fontWeight="600">
          {total}
        </text>
        <text x={cx} y={cy + 18} textAnchor="middle" fontSize="10" fill="#a6b0c3">
          TOTAL ISSUES
        </text>
      </svg>
      <div className="grid grid-cols-2 gap-x-5 gap-y-2 mt-4 w-full">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color, boxShadow: "0 0 6px " + d.color }}></span>
            <span className="text-ink-mid truncate">{d.label}</span>
            <span className="text-ink-hi font-medium ml-auto">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
