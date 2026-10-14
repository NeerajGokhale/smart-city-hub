import Icon from "../icons/Icon.jsx";

export function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-ink-mid mb-1.5 tracking-wide">{label}</label>
      {children}
    </div>
  );
}

export const inputCls =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-ink-hi focus:border-cyan/60 focus:bg-white/[0.06] transition placeholder:text-ink-lo";

export function Btn({ children, onClick, variant = "primary", className = "", type = "button", disabled }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-gradient-to-r from-[#00c8d6] to-cyan text-[#03151a] hover:brightness-110 shadow-[0_0_20px_rgba(0,245,255,0.25)]",
    violet: "bg-gradient-to-r from-[#7c3aed] to-violet text-white hover:brightness-110 shadow-[0_0_20px_rgba(139,92,246,0.25)]",
    ghost: "bg-white/[0.04] border border-white/10 text-ink-hi hover:bg-white/[0.08]",
    danger: "bg-rose/10 border border-rose/30 text-[#f9748a] hover:bg-rose/20",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base + " " + variants[variant] + " " + className}>
      {children}
    </button>
  );
}

export function Pill({ children, color, className = "" }) {
  return (
    <span
      className={"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium " + className}
      style={{ color, background: color + "1a", border: "1px solid " + color + "40" }}
    >
      {children}
    </span>
  );
}

export function Empty({ icon, title, message }) {
  return (
    <div className="glass rounded-2xl py-14 px-6 text-center flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 text-ink-mid">
        <Icon name={icon} size={22} />
      </div>
      <p className="font-display text-ink-hi">{title}</p>
      <p className="text-sm text-ink-mid max-w-sm">{message}</p>
    </div>
  );
}
