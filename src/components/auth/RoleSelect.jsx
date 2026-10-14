import Icon from "../icons/Icon.jsx";

export default function RoleSelect({ onPick }) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl text-ink-hi mb-2">Sign in to Smart City Hub</h1>
        <p className="text-sm text-ink-mid">Choose how you'd like to continue.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <button
          onClick={() => onPick("citizen")}
          className="group glass rounded-2xl p-7 text-left hover-lift"
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-cyan/10 text-cyan">
            <Icon name="user" size={22} />
          </div>
          <h3 className="font-display text-lg text-ink-hi mb-1.5">I'm a Citizen</h3>
          <p className="text-sm text-ink-mid leading-relaxed mb-4">
            Report civic issues, track their status, rate resolutions, and browse city services.
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm text-cyan font-medium">
            Continue as citizen <Icon name="arrow-right" size={14} className="group-hover:translate-x-0.5 transition" />
          </span>
        </button>

        <button
          onClick={() => onPick("admin")}
          className="group glass rounded-2xl p-7 text-left hover-lift"
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-violet/10 text-violet">
            <Icon name="shield" size={22} />
          </div>
          <h3 className="font-display text-lg text-ink-hi mb-1.5">I'm a City Administrator</h3>
          <p className="text-sm text-ink-mid leading-relaxed mb-4">
            Triage issues on the command board, publish alerts, and manage schedules & facilities.
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm text-violet font-medium">
            Continue as admin <Icon name="arrow-right" size={14} className="group-hover:translate-x-0.5 transition" />
          </span>
        </button>
      </div>
    </div>
  );
}
