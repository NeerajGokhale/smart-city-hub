import Icon from "../icons/Icon.jsx";
import { Btn, Pill } from "../ui/Primitives.jsx";
import IsometricCity from "./IsometricCity.jsx";
import StatCard from "./StatCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useData } from "../../context/DataContext.jsx";
import { SEVERITY_CFG } from "../../data/constants";

const FEATURES = [
  { icon: "list", title: "Report & track issues", desc: "Flag potholes, outages, sanitation problems and more, then follow each one from Reported to Resolved.", color: "#00f5ff" },
  { icon: "siren", title: "Emergency alerts", desc: "Live, severity-coded broadcasts from the city keep every citizen informed the moment something changes.", color: "#f43f5e" },
  { icon: "grid", title: "Admin issue tracker", desc: "A real-time kanban board lets city staff triage, filter and move issues through resolution.", color: "#8b5cf6" },
  { icon: "star", title: "Resolution feedback", desc: "Once an issue is resolved, citizens can rate how it was handled — building accountability over time.", color: "#f59e0b" },
  { icon: "recycle", title: "Waste schedules", desc: "Search collection days and waste types by zone, always current and easy to scan.", color: "#22e0a0" },
  { icon: "map", title: "Facility directory", desc: "Locate the nearest hospital, park, school, police station or evacuation center in seconds.", color: "#00f5ff" },
];

const CITIZEN_STEPS = [
  { title: "Sign in as a citizen", desc: "Create a free account or sign in to start reporting and tracking issues near you." },
  { title: "Report what you see", desc: "Submit a title, category and description — you'll get a tracking ID instantly." },
  { title: "Follow the fix", desc: "Watch your issue move from Reported to In Progress to Resolved in real time." },
  { title: "Rate the resolution", desc: "Once resolved, leave a 1-to-5 star rating on how the issue was handled." },
];

const ADMIN_STEPS = [
  { title: "Sign in as administrator", desc: "Use your pre-provisioned city credentials to reach the command center." },
  { title: "Triage on the board", desc: "Search, filter and drag issues across Reported, In Progress and Resolved." },
  { title: "Keep citizens informed", desc: "Compose and publish severity-coded alerts the moment something needs attention." },
  { title: "Watch the trends", desc: "Review category and resolution analytics to plan resources ahead of time." },
];

export default function HomeView({ setView }) {
  const { session } = useAuth();
  const { issues, facilities, alerts, publicStats } = useData();
  const resolved = publicStats.resolved;
  const activeAlerts = alerts.filter((a) => a.active).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  function primaryCta() {
    if (!session) setView("auth");
    else if (session.role === "citizen") setView("citizen");
    else setView("admin");
  }

  return (
    <div>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fadeInUp">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 mb-6 text-xs text-ink-mid">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulseDot"></span>
              Live civic operations network
            </div>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] text-ink-hi mb-5">
              Your city,<br />coordinated in real time.
            </h1>
            <p className="text-ink-mid text-base leading-relaxed mb-8 max-w-md">
              Report civic issues, track collection schedules, find nearby facilities, and stay ahead of
              emergency alerts — one connected hub for citizens and city administrators.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Btn onClick={primaryCta}>
                {session ? "Open dashboard" : "Get started"} <Icon name="arrow-right" size={15} />
              </Btn>
              {!session && (
                <Btn variant="ghost" onClick={() => setView("auth")}>
                  Sign in
                </Btn>
              )}
            </div>
          </div>
          <div className="glass rounded-3xl p-2 glow-violet">
            <IsometricCity />
          </div>
        </div>
      </section>

      {/* LIVE STATS */}
      {session && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon="list" label="Issues logged to date" value={issues.length} color="#00f5ff" />
            <StatCard icon="check" label="Issues resolved" value={resolved} color="#22e0a0" />
            <StatCard icon="map" label="Public facilities mapped" value={facilities.length} color="#8b5cf6" />
            <StatCard icon="alert" label="Active alerts right now" value={activeAlerts.length} color="#f59e0b" />
          </div>
        </section>
      )}

      {/* LIVE ALERTS PREVIEW */}
      {activeAlerts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="font-display text-2xl text-ink-hi mb-1">Right now in the city</h2>
          <p className="text-sm text-ink-mid mb-6">Current broadcasts, visible to every signed-in citizen.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeAlerts.slice(0, 3).map((a) => {
              const cfg = SEVERITY_CFG[a.severity];
              return (
                <div key={a.id} className="glass rounded-2xl p-5 hover-lift">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: cfg.color, background: cfg.bg }}>
                      <Icon name={a.severity === "Critical" ? "siren" : "alert"} size={15} />
                    </div>
                    <Pill color={cfg.color}>{cfg.label}</Pill>
                  </div>
                  <h4 className="font-display text-[15px] text-ink-hi mb-1.5">{a.title}</h4>
                  <p className="text-sm text-ink-mid leading-relaxed">{a.message}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* FEATURES */}
      {session?.role !== "admin" && (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="font-display text-2xl text-ink-hi mb-1">Everything the city needs, in one place</h2>
        <p className="text-sm text-ink-mid mb-8 max-w-lg">Built around the eight core modules of the Smart City Hub specification.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div key={i} className="glass rounded-2xl p-6 hover-lift">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ color: f.color, background: f.color + "1a" }}>
                <Icon name={f.icon} size={19} />
              </div>
              <h3 className="font-display text-[15px] text-ink-hi mb-1.5">{f.title}</h3>
              <p className="text-sm text-ink-mid leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="font-display text-2xl text-ink-hi mb-1">How it works</h2>
        <p className="text-sm text-ink-mid mb-8 max-w-lg">The same hub, tailored to two very different jobs.</p>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan/10 text-cyan"><Icon name="user" size={16} /></div>
              <h3 className="font-display text-[15px] text-ink-hi">For citizens</h3>
            </div>
            <ol className="space-y-5">
              {CITIZEN_STEPS.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-6 h-6 rounded-full bg-cyan/10 text-cyan text-xs font-medium flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-ink-hi">{s.title}</p>
                    <p className="text-xs text-ink-mid mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="glass rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-violet/10 text-violet"><Icon name="shield" size={16} /></div>
              <h3 className="font-display text-[15px] text-ink-hi">For administrators</h3>
            </div>
            <ol className="space-y-5">
              {ADMIN_STEPS.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-6 h-6 rounded-full bg-violet/10 text-violet text-xs font-medium flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-ink-hi">{s.title}</p>
                    <p className="text-xs text-ink-mid mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      {!session && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <div className="glass rounded-3xl p-8 sm:p-12 text-center glow-cyan relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, #00f5ff, transparent 60%)" }}></div>
            <h2 className="font-display text-2xl sm:text-3xl text-ink-hi mb-3 relative">Ready to get involved?</h2>
            <p className="text-sm text-ink-mid mb-7 max-w-md mx-auto relative">
              Sign in as a citizen to report your first issue, or as an administrator to open the command center.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 relative">
              <Btn onClick={() => setView("auth")}>Sign in <Icon name="arrow-right" size={15} /></Btn>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
