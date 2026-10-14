import Icon from "../icons/Icon.jsx";

export default function StatCard({ icon, label, value, color }) {
  return (
    <div className="glass rounded-2xl p-5 hover-lift">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ color, background: color + "1a" }}>
        <Icon name={icon} size={17} />
      </div>
      <p className="font-display text-2xl text-ink-hi">{value}</p>
      <p className="text-xs text-ink-mid mt-1">{label}</p>
    </div>
  );
}
