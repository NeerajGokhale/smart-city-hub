import { useState } from "react";
import Icon from "../icons/Icon.jsx";
import { Btn } from "../ui/Primitives.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function TopNav({ view, setView }) {
  const { session, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [{ id: "home", label: "Home", icon: "home" }];
  if (session && session.role === "citizen") tabs.push({ id: "citizen", label: "Citizen Portal", icon: "user" });
  if (session && session.role === "admin") tabs.push({ id: "admin", label: "Admin Command Center", icon: "shield" });

  return (
    <div className="sticky top-0 z-[95] glass-strong border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <button onClick={() => setView("home")} className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-violet flex items-center justify-center shadow-[0_0_18px_rgba(0,245,255,0.35)]">
            <Icon name="zap" size={16} className="text-[#050505]" />
          </div>
          <span className="font-display font-semibold text-[15px] tracking-tight hidden sm:block">Smart City Hub</span>
        </button>

        <div className="hidden md:flex items-center gap-1 glass rounded-xl p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={
                "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition " +
                (view === t.id ? "bg-white/[0.09] text-cyan" : "text-ink-mid hover:text-white")
              }
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {!session ? (
            <Btn onClick={() => setView("auth")} className="!py-2 !px-3.5 text-xs sm:text-sm">
              Sign in
            </Btn>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col items-end leading-tight">
                <span className="text-xs font-medium text-ink-hi">{session.name}</span>
                <span className="text-[10px] text-ink-lo uppercase tracking-wider">{session.role}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan">
                <Icon name={session.role === "admin" ? "shield" : "user"} size={14} />
              </div>
              <button
                onClick={() => { logout(); setView("home"); }}
                className="p-2 rounded-lg hover:bg-white/[0.08] text-ink-mid hover:text-[#f9748a] transition"
              >
                <Icon name="logout" size={16} />
              </button>
            </div>
          )}
          <button className="md:hidden p-2 rounded-lg hover:bg-white/5" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name="menu" size={18} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-3 flex flex-col gap-1 animate-fadeIn">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setView(t.id); setMenuOpen(false); }}
              className={
                "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-left " +
                (view === t.id ? "bg-white/[0.08] text-cyan" : "text-ink-mid")
              }
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
