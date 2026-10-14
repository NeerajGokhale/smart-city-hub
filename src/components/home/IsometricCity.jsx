const BUILDINGS = [
  { x: 60, y: 230, w: 60, h: 90, c: "#0d1626" },
  { x: 130, y: 200, w: 60, h: 120, c: "#0e1a2c" },
  { x: 200, y: 245, w: 60, h: 75, c: "#0d1626" },
  { x: 300, y: 190, w: 65, h: 130, c: "#0e1a2c" },
  { x: 375, y: 235, w: 55, h: 85, c: "#0d1626" },
  { x: 440, y: 210, w: 60, h: 110, c: "#0e1a2c" },
  { x: 520, y: 250, w: 55, h: 70, c: "#0d1626" },
];

const NODES = [
  { x: 90, y: 225 }, { x: 160, y: 195 }, { x: 230, y: 240 }, { x: 330, y: 185 },
  { x: 400, y: 230 }, { x: 470, y: 205 }, { x: 550, y: 245 }, { x: 250, y: 120 }, { x: 420, y: 100 },
];

export default function IsometricCity() {
  return (
    <svg viewBox="0 0 620 360" className="w-full h-full">
      <defs>
        <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="620" height="360" fill="url(#skyFade)" />

      <g opacity="0.18" stroke="#00f5ff" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={"h" + i} x1={20 + i * 70} y1="330" x2={20 + i * 70 - 140} y2="150" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={"v" + i}
            x1="0"
            y1={330 - i * 30}
            x2="620"
            y2={330 - i * 30 - 30}
            className="animate-drift"
            style={{ strokeDasharray: "4 8" }}
          />
        ))}
      </g>

      {BUILDINGS.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c} stroke="rgba(0,245,255,0.25)" strokeWidth="1" />
          <rect x={b.x} y={b.y} width={b.w} height="4" fill="url(#bGlow)" />
          {Array.from({ length: Math.floor(b.h / 18) }).map((_, r) => (
            <g key={r}>
              {[0, 1, 2].map(
                (c) =>
                  (r + c) % 3 !== 0 && (
                    <rect
                      key={c}
                      x={b.x + 8 + c * ((b.w - 16) / 3)}
                      y={b.y + 10 + r * 18}
                      width={(b.w - 16) / 3 - 6}
                      height="8"
                      fill={(r * 3 + c + i) % 5 === 0 ? "#8b5cf6" : "#00f5ff"}
                      opacity={0.35 + ((r + c) % 3) * 0.15}
                    />
                  )
              )}
            </g>
          ))}
        </g>
      ))}

      {NODES.map((n, i) => (
        <g key={i} className="animate-floatY" style={{ animationDelay: i * 0.4 + "s" }}>
          <circle cx={n.x} cy={n.y} r="10" fill="#00f5ff" opacity="0.08" />
          <circle cx={n.x} cy={n.y} r="3.4" fill={i % 3 === 0 ? "#8b5cf6" : "#00f5ff"} className="animate-pulseDot" style={{ animationDelay: i * 0.3 + "s" }} />
        </g>
      ))}

      <g stroke="#00f5ff" strokeOpacity="0.22" strokeWidth="1">
        <path d="M90,225 L250,120 L420,100" fill="none" />
        <path d="M160,195 L330,185 L470,205" fill="none" />
      </g>
    </svg>
  );
}
