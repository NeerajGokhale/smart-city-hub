import Icon from "../icons/Icon.jsx";

export default function Modal({ open, onClose, title, children, maxW = "max-w-lg" }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className={"relative glass-strong rounded-2xl w-full " + maxW + " max-h-[88vh] overflow-y-auto no-scrollbar animate-fadeIn glow-cyan"}>
        <div className="sticky top-0 glass-strong flex items-center justify-between px-6 py-4 border-b border-white/5 z-10">
          <h3 className="font-display text-lg text-ink-hi">{title}</h3>
          <button onClick={onClose} className="text-ink-mid hover:text-white transition p-1.5 rounded-lg hover:bg-white/5">
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
